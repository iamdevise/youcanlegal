import { createClient } from '@supabase/supabase-js';

// POST /api/apply — the only server-side endpoint.
//
// 1. blocks bots (honeypot + basic per-IP rate limit)
// 2. validates every field server-side with the same rules as the form
// 3. inserts the row into `applications` using the PUBLIC anon key
//    (RLS already allows public INSERT and nothing else)
// 4. emails the admin via Resend
//
// No service_role key is ever used or required. The email step is best-effort:
// if Resend fails, the application is still saved and the applicant still
// sees a success message; the failure is only logged.

const DEFAULT_NOTIFY_EMAIL = 'polystaradmin@gmail.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RESEND_SENDER = 'onboarding@resend.dev';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateBuckets = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateBuckets.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateBuckets.set(ip, hits);
  // Opportunistic cleanup so the map cannot grow without bound.
  if (rateBuckets.size > 500) {
    for (const [key, value] of rateBuckets) {
      if (!value.some((t) => now - t < RATE_WINDOW_MS)) rateBuckets.delete(key);
    }
  }
  return false;
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function str(value) {
  return typeof value === 'string' ? value.trim() : '';
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

function validate(body) {
  const errors = [];
  const program = str(body.program);
  const citizenship = str(body.citizenship);
  const residenceCountry = str(body.residence_country);
  const fullName = str(body.full_name);
  const email = str(body.email);
  const whatsapp = str(body.whatsapp);
  const applicantType = str(body.applicant_type);
  const age = Number(body.age);
  const livesInPassportCountry = body.lives_in_passport_country === true || body.lives_in_passport_country === 'true';

  if (!program) errors.push('program is required');
  if (!citizenship) errors.push('citizenship is required');
  if (!livesInPassportCountry && !residenceCountry) errors.push('residence country is required');
  if (fullName.length < 2 || fullName.length > 120) errors.push('full name is required');
  if (!Number.isInteger(age) || age < 16 || age > 70) errors.push('age must be between 16 and 70');
  if (!EMAIL_RE.test(email)) errors.push('a valid email is required');
  if (whatsapp.length < 5 || whatsapp.length > 40) errors.push('a WhatsApp number is required');
  if (applicantType !== 'myself' && applicantType !== 'agency') errors.push('applicant type is invalid');

  const consents = body.consents || {};
  if (!consents.fees || !consents.service || !consents.contact) errors.push('all consents are required');

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    row: {
      program,
      citizenship,
      lives_in_passport_country: livesInPassportCountry,
      residence_country: livesInPassportCountry ? citizenship : residenceCountry,
      full_name: fullName,
      age,
      email,
      whatsapp,
      applicant_type: applicantType,
    },
  };
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function waLink(whatsapp) {
  const digits = String(whatsapp || '').replace(/[^\d]/g, '');
  return digits ? `https://wa.me/${digits}` : '';
}

function emailBody(row) {
  const wa = waLink(row.whatsapp);
  const rows = [
    ['Program', row.program],
    ['Citizenship', row.citizenship],
    ['Lives in passport country', row.lives_in_passport_country ? 'Yes' : 'No'],
    ['Country of residence', row.residence_country],
    ['Full name', row.full_name],
    ['Age', row.age],
    ['Email', row.email],
    ['WhatsApp', row.whatsapp],
    ['Applicant type', row.applicant_type === 'agency' ? 'Agency (represents clients)' : 'Myself'],
    ['Received', new Date().toUTCString()],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;font-weight:600;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join('');
  const waCell = wa
    ? `<tr><td style="padding:6px 14px 6px 0;font-weight:600">WhatsApp link</td><td style="padding:6px 0"><a href="${escapeHtml(wa)}">${escapeHtml(
        wa
      )}</a></td></tr>`
    : '';

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n') + (wa ? `\nWhatsApp link: ${wa}` : '');

  return {
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#181818">
      <h2 style="margin:0 0 12px">New application</h2>
      <table style="border-collapse:collapse">${htmlRows}${waCell}</table>
    </div>`,
    text,
  };
}

async function resolveNotifyEmail(supabase) {
  const fallback = str(process.env.NOTIFY_EMAIL) || DEFAULT_NOTIFY_EMAIL;
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'notification_email').maybeSingle();
    const value = str(data?.value);
    return value || fallback;
  } catch {
    return fallback;
  }
}

async function sendEmail(row) {
  const apiKey = str(process.env.RESEND_API_KEY);
  if (!apiKey) {
    console.warn('[apply] RESEND_API_KEY is not set — application saved, email skipped.');
    return false;
  }
  const { html, text } = emailBody(row);
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_SENDER,
      to: [row.__notifyEmail],
      subject: `New application: ${row.full_name} (${row.program})`,
      html,
      text,
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request body' });
  }

  // Honeypot: a real applicant never fills this hidden field.
  if (str(body.company_website)) {
    return res.status(200).json({ ok: true, saved: true, emailed: false });
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({ ok: false, error: 'Too many applications from this connection. Please try again later.' });
  }

  const validation = validate(body);
  if (!validation.ok) {
    return res.status(400).json({ ok: false, error: validation.errors.join('; ') });
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.error('[apply] Supabase public env vars are missing; cannot save the application.');
    return res.status(500).json({ ok: false, error: 'Service is not configured. Please try again later.' });
  }

  const supabase = createClient(url, anonKey);
  const row = validation.row;

  const { error: insertError } = await supabase.from('applications').insert(row);
  if (insertError) {
    console.error('[apply] Supabase insert failed:', insertError.message);
    return res.status(500).json({ ok: false, error: 'We could not save your application. Please try again.' });
  }

  // The application is saved — from here on, every failure is non-fatal.
  let emailed = false;
  try {
    row.__notifyEmail = await resolveNotifyEmail(supabase);
    emailed = await sendEmail(row);
  } catch (err) {
    console.error('[apply] Email notification failed (application was saved):', err?.message || err);
  }

  return res.status(200).json({ ok: true, saved: true, emailed });
}

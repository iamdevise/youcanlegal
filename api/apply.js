import { createClient } from '@supabase/supabase-js';

// POST /api/apply  — submit an application (the only server-side endpoint).
// GET  /api/apply?health=1 — deployment check (booleans only, never secrets).
//
// Flow:
//   1. blocks bots (honeypot + per-IP rate limit)
//   2. validates every field server-side with the same rules as the form
//   3. tries to save the row into `applications` (public anon key + RLS)
//   4. tries to email the admin via Resend
//   5. success for the user when EITHER the row was saved OR the email went out
//      — an application is never lost just because one channel failed
//
// Error responses carry a machine-readable `code`:
//   INVALID_INPUT | RATE_LIMITED | NOT_CONFIGURED | SAVE_FAILED | EMAIL_FAILED
//
// Note on the rate limit: it lives in memory, so it is per serverless instance
// and resets on cold start — it is a bot guard, not a quota. Raised to 10 per
// 10 minutes so it does not block testers.

const DEFAULT_NOTIFY_EMAIL = 'polystaradmin@gmail.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 10;
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
  // 1. site_settings.notification_email (admin editable)
  // 2. NOTIFY_EMAIL env var
  // 3. default
  const fallback = str(process.env.NOTIFY_EMAIL) || DEFAULT_NOTIFY_EMAIL;
  if (!supabase) return { email: fallback, source: 'default' };
  try {
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'notification_email').maybeSingle();
    const value = str(data?.value);
    if (value) return { email: value, source: 'site_settings' };
  } catch {
    /* fall through */
  }
  return { email: str(process.env.NOTIFY_EMAIL) || DEFAULT_NOTIFY_EMAIL, source: process.env.NOTIFY_EMAIL ? 'env' : 'default' };
}

async function sendEmail(row, notifyEmail) {
  const apiKey = str(process.env.RESEND_API_KEY);
  if (!apiKey) return false; // caller decides whether this is fatal
  const sender = str(process.env.RESEND_FROM) || 'onboarding@resend.dev';
  const { html, text } = emailBody(row);
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [notifyEmail],
      reply_to: row.email,
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
  // ---- health check -------------------------------------------------------
  // Booleans only — never echo any secret or address value.
  if (req.method === 'GET') {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    if (url.searchParams.get('health') === '1') {
      const supabaseConfigured = Boolean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) &&
        Boolean(process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY);
      const notifyEmail = str(process.env.NOTIFY_EMAIL);
      return res.status(200).json({
        ok: true,
        supabaseConfigured,
        resendConfigured: Boolean(str(process.env.RESEND_API_KEY)),
        // 'env' = NOTIFY_EMAIL set, 'default' = the built-in testing address
        notifyEmailSource: notifyEmail ? 'env' : 'default',
      });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed', code: 'INVALID_INPUT' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed', code: 'INVALID_INPUT' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body', code: 'INVALID_INPUT' });
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request body', code: 'INVALID_INPUT' });
  }

  // Honeypot: a real applicant never fills this hidden field.
  if (str(body.company_website)) {
    return res.status(200).json({ ok: true, saved: true, emailed: false });
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({
      ok: false,
      code: 'RATE_LIMITED',
      error: 'Too many applications from this connection. Please try again in a few minutes.',
    });
  }

  const validation = validate(body);
  if (!validation.ok) {
    return res.status(400).json({ ok: false, code: 'INVALID_INPUT', error: validation.errors.join('; ') });
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.error('[apply] Supabase public env vars are missing; cannot save the application.');
    return res.status(500).json({
      ok: false,
      code: 'NOT_CONFIGURED',
      error: 'Service is not configured. Please try again later.',
    });
  }

  const supabase = createClient(url, anonKey);
  const row = validation.row;

  // ---- try BOTH channels; the user succeeds when either one works --------
  const { email: notifyEmail } = await resolveNotifyEmail(supabase);

  let saved = false;
  let saveError = null;
  try {
    const { error: insertError } = await supabase.from('applications').insert(row);
    if (insertError) throw new Error(insertError.message);
    saved = true;
  } catch (err) {
    saveError = err?.message || String(err);
    console.error('[apply] Supabase insert failed:', saveError);
  }

  let emailed = false;
  let emailError = null;
  try {
    emailed = await sendEmail(row, notifyEmail);
  } catch (err) {
    emailError = err?.message || String(err);
    console.error('[apply] Resend email failed (status/body above):', emailError);
  }
  if (!emailed && !saveError && emailError === null) {
    // RESEND_API_KEY missing — not an error worth failing the request over.
    console.warn('[apply] RESEND_API_KEY is not set — application saved, email skipped.');
  }

  if (!saved && !emailed) {
    return res.status(500).json({
      ok: false,
      code: 'SAVE_FAILED',
      error: 'We could not save your application. Please try again, or contact us on WhatsApp or Telegram.',
    });
  }

  // At least one channel worked. If exactly one did, flag it for the logs.
  if (!saved) console.error('[apply] Saved=false but email delivered — application exists only in the admin inbox.');
  if (!emailed && saveError === null) console.warn('[apply] Email skipped (not configured); application saved to the database.');

  return res.status(200).json({ ok: true, saved, emailed });
}

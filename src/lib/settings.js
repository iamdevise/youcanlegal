import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// ---------------------------------------------------------------------------
// Site settings — stored in the Supabase `site_settings` table (key/value).
// Public SELECT is allowed by RLS (the website reads it); only the admin can
// write. Every key here has a sane default so the public site renders even
// before the SQL migration has been applied or the admin saved anything.
// ---------------------------------------------------------------------------

export const ADMIN_EMAIL = 'polystaradmin@gmail.com';

export const SETTINGS_DEFAULTS = {
  telegram_url: '',
  whatsapp_url: '',
  whatsapp_number: '',
  instagram_url: 'https://www.instagram.com/you_can_legal',
  facebook_url: 'https://www.facebook.com/youcanlegal/',
  tiktok_url: 'https://www.tiktok.com/@you_can_legal',
  youtube_url: 'https://www.youtube.com/@youcanlegal',
  linkedin_url: 'https://www.linkedin.com/company/you-can-legal/',
  contact_email: 'hello@youcan.legal',
  contact_phone: '',
  notification_email: 'polystaradmin@gmail.com',
};

// Field metadata drives the admin Settings form. Telegram / WhatsApp live in the
// Chat contacts section instead (see lib/chatContacts.js).
export const SETTINGS_FIELDS = [
  // Telegram and WhatsApp are no longer single values here — they are managed as
  // a list in the admin's "Chat contacts" section (table `chat_contacts`).
  { key: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/…', type: 'url' },
  { key: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/…', type: 'url' },
  { key: 'tiktok_url', label: 'TikTok', placeholder: 'https://tiktok.com/@…', type: 'url' },
  { key: 'youtube_url', label: 'YouTube', placeholder: 'https://youtube.com/@…', type: 'url' },
  { key: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/…', type: 'url' },
  // Clear about which email is which — one is shown on the site, the other
  // only receives the application notifications.
  {
    key: 'contact_email',
    label: "Contact email shown on the website (used in 'please contact us at')",
    placeholder: 'hello@youcan.legal',
    type: 'email',
  },
  { key: 'contact_phone', label: 'Public contact phone', placeholder: '+48 000 000 000', type: 'text' },
  { key: 'notification_email', label: 'Send applications to (notification email)', placeholder: 'polystaradmin@gmail.com', type: 'email' },
];

let cache = null;
let inflight = null;

/** Normalise a settings object coming from the DB into the full key set. */
export function withDefaults(rowMap) {
  const out = { ...SETTINGS_DEFAULTS };
  if (rowMap) {
    for (const key of Object.keys(SETTINGS_DEFAULTS)) {
      const value = rowMap[key];
      if (typeof value === 'string' && value.trim() !== '') out[key] = value.trim();
    }
  }
  return out;
}

/** Read all public settings once per page load (cached in memory). */
export function fetchSiteSettings(force = false) {
  if (!force && cache) return Promise.resolve(cache);
  if (!force && inflight) return inflight;
  if (!supabase) return Promise.resolve(SETTINGS_DEFAULTS);

  inflight = supabase
    .from('site_settings')
    .select('key,value')
    .then(({ data, error }) => {
      inflight = null;
      if (error || !data) return cache || SETTINGS_DEFAULTS;
      const map = {};
      for (const row of data) map[row.key] = row.value;
      cache = withDefaults(map);
      return cache;
    })
    .catch(() => {
      inflight = null;
      return cache || SETTINGS_DEFAULTS;
    });

  return inflight;
}

/** Clear the in-memory cache (used by the admin after saving). */
export function invalidateSiteSettings() {
  cache = null;
}

/** Public-site hook: settings with defaults, refreshed once on mount. */
export function useSiteSettings() {
  const [settings, setSettings] = useState(cache || SETTINGS_DEFAULTS);

  useEffect(() => {
    let alive = true;
    fetchSiteSettings().then((s) => {
      if (alive) setSettings(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  return settings;
}

// NOTE: the old whatsappHref()/chatHref() helpers are gone. WhatsApp and
// Telegram now come from the `chat_contacts` list via lib/chatContacts.js, which
// also handles picking one contact per visitor.

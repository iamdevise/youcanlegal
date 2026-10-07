import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { fetchSiteSettings } from './settings';

// ---------------------------------------------------------------------------
// Chat contacts — the WhatsApp numbers and Telegram links the owner manages in
// /admin (table `chat_contacts`). RLS lets the public site read only the rows
// where `active = true`, so everything here works with the anon key.
//
// The same list drives the floating chat button, the footer and any other
// "chat with us" link on the site, so they never drift apart.
// ---------------------------------------------------------------------------

export const CHAT_TYPES = ['whatsapp', 'telegram'];

export const CHAT_TYPE_LABELS = { whatsapp: 'WhatsApp', telegram: 'Telegram' };

/** WhatsApp: accept a number in any format or a wa.me link, return a wa.me URL. */
export function normalizeWhatsApp(input) {
  const raw = String(input || '').trim();
  if (!raw) return '';
  if (/^https?:\/\/(www\.)?wa\.me\//i.test(raw)) {
    const digits = raw.replace(/^[^0-9]*/, '').replace(/[^0-9]/g, '');
    return digits ? `https://wa.me/${digits}` : '';
  }
  if (/^https?:\/\/(www\.)?api\.whatsapp\.com\/send/i.test(raw)) {
    const match = raw.match(/phone=([0-9]+)/i);
    return match ? `https://wa.me/${match[1]}` : '';
  }
  const digits = raw.replace(/[^0-9]/g, '');
  if (digits.length < 6 || digits.length > 15) return '';
  return `https://wa.me/${digits}`;
}

/** Telegram: accept a t.me link, a https://telegram.me link or an @username. */
export function normalizeTelegram(input) {
  const raw = String(input || '').trim();
  if (!raw) return '';
  if (/^https?:\/\/(www\.)?(t\.me|telegram\.me)\//i.test(raw)) {
    const path = raw.replace(/^https?:\/\/(www\.)?(t\.me|telegram\.me)\//i, '').split(/[?#]/)[0].replace(/\/+$/, '');
    return path ? `https://t.me/${path}` : '';
  }
  if (/^https?:\/\//i.test(raw)) return '';
  const username = raw.replace(/^@/, '').trim();
  return /^[A-Za-z0-9_]{4,64}$/.test(username) ? `https://t.me/${username}` : '';
}

/** Normalise a value for its type; '' means "not valid". */
export function normalizeContactValue(type, input) {
  return type === 'telegram' ? normalizeTelegram(input) : normalizeWhatsApp(input);
}

/** A friendly label for a stored value, used as the admin list title. */
export function contactDisplayValue(type, value) {
  if (type === 'telegram') return value.replace(/^https?:\/\/t\.me\//i, '@');
  return value.replace(/^https?:\/\/wa\.me\//i, '+');
}

let cache = null;
let inflight = null;

/** Read the active chat contacts once per page load (cached in memory). */
export function fetchChatContacts(force = false) {
  if (!force && cache) return Promise.resolve(cache);
  if (!force && inflight) return inflight;
  if (!supabase) return Promise.resolve([]);

  inflight = supabase
    .from('chat_contacts')
    .select('id,type,label,value,sort_order,active')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
    .then(({ data, error }) => {
      inflight = null;
      if (error || !data) return cache || [];
      cache = data;
      return cache;
    })
    .catch(() => {
      inflight = null;
      return cache || [];
    });

  return inflight;
}

/** Clear the in-memory cache (used after the admin saves). */
export function invalidateChatContacts() {
  cache = null;
}

/** Public-site hook: the active chat contacts, refreshed once on mount. */
export function useChatContacts() {
  const [contacts, setContacts] = useState(cache || []);
  useEffect(() => {
    let alive = true;
    fetchChatContacts().then((rows) => {
      if (alive) setContacts(rows);
    });
    return () => {
      alive = false;
    };
  }, []);
  return contacts;
}

/** Which chat types currently have at least one active contact. */
export function availableTypes(contacts) {
  return CHAT_TYPES.filter((type) => contacts.some((c) => c.type === type));
}

const SESSION_KEY = (type) => `ycl_chat_contact_${type}`;

/**
 * Choose the contact to send this visitor to.
 * One contact is picked at random, then remembered in sessionStorage so the same
 * visitor keeps the same agent for the whole session. If the remembered contact
 * is gone or was disabled, another one is picked.
 */
export function pickContact(contacts, type) {
  const pool = contacts.filter((c) => c.type === type && c.value);
  if (pool.length === 0) return null;

  let remembered = '';
  try {
    remembered = window.sessionStorage.getItem(SESSION_KEY(type)) || '';
  } catch {
    remembered = '';
  }

  const match = remembered && pool.find((c) => c.id === remembered);
  if (match) return match;

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  try {
    window.sessionStorage.setItem(SESSION_KEY(type), chosen.id);
  } catch {
    /* private mode — the choice just will not persist */
  }
  return chosen;
}

// ---------------------------------------------------------------------------
// Round-robin agent assignment (admin switch, default OFF).
//
// When the switch is on AND the chosen type has 2+ active agents, the server
// function assign_chat_contact() hands out the least-assigned agent and bumps
// its counter. One visitor keeps the same agent: the assignment is remembered
// in localStorage per type for 30 days, and refreshing or tapping again never
// consumes another slot. Any failure falls back to pickContact() so chat never
// breaks. Assignment happens on click, never on render.
// ---------------------------------------------------------------------------

const RR_KEY = (type) => `ycl_rr_agent_${type}`;
const RR_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function readRememberedAssignment(type) {
  try {
    const raw = window.localStorage.getItem(RR_KEY(type));
    if (!raw) return null;
    const { id, at } = JSON.parse(raw);
    if (!id || !at || Date.now() - at > RR_TTL_MS) return null;
    return id;
  } catch {
    return null;
  }
}

function rememberAssignment(type, id) {
  try {
    window.localStorage.setItem(RR_KEY(type), JSON.stringify({ id, at: Date.now() }));
  } catch {
    /* private mode — the assignment just will not persist */
  }
}

async function roundRobinEnabled() {
  try {
    const settings = await fetchSiteSettings();
    return settings?.chat_round_robin === 'on';
  } catch {
    return false;
  }
}

/**
 * Resolve the contact to send this visitor to for `type`.
 * - round-robin off (default) or a single agent → today's pickContact() behaviour
 * - round-robin on and 2+ agents → remembered assignment first, then the
 *   server-side assign_chat_contact() RPC, remembered for 30 days
 * Always falls back to pickContact() when anything fails.
 */
export async function resolveContact(contacts, type) {
  const pool = contacts.filter((c) => c.type === type && c.value);
  if (pool.length === 0) return null;
  try {
    if (pool.length >= 2 && (await roundRobinEnabled())) {
      const remembered = readRememberedAssignment(type);
      const match = remembered && pool.find((c) => c.id === remembered);
      if (match) return match;

      if (supabase) {
        const { data, error } = await supabase.rpc('assign_chat_contact', { p_type: type });
        if (!error && data && data.length > 0) {
          const assigned = data[0];
          // Trust the server only if the contact it returned is really active.
          const stillActive = pool.find((c) => c.id === assigned.id);
          if (stillActive) {
            rememberAssignment(type, assigned.id);
            return stillActive;
          }
        }
      }
    }
  } catch {
    /* fall through to the classic behaviour */
  }
  return pickContact(contacts, type);
}

/**
 * Open a chat URL without losing it to a mobile popup blocker: the window is
 * opened synchronously on click, then pointed at the (async-resolved) URL.
 */
export function openChatWindow(url) {
  const win = window.open('', '_blank');
  if (win) {
    try {
      win.opener = null;
    } catch {
      /* some browsers block opener changes on cross-origin windows */
    }
    win.location = url;
  } else {
    window.location.assign(url);
  }
}

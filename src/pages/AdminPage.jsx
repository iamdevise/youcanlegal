import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, LogOut, RefreshCw, Search, Trash2, X } from 'lucide-react';
import { ArrowDown, ArrowUp, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ADMIN_EMAIL, SETTINGS_DEFAULTS, SETTINGS_FIELDS, fetchSiteSettings, invalidateSiteSettings } from '../lib/settings';
import {
  CHAT_TYPE_LABELS,
  availableTypes,
  contactDisplayValue,
  invalidateChatContacts,
  normalizeContactValue,
} from '../lib/chatContacts';

// /admin — Supabase Auth protected. Only ADMIN_EMAIL can read/write anything;
// the same rule is enforced in the database by RLS, so hiding the route is
// never the protection. The link is deliberately absent from public navigation.

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const TABS = [
  { id: 'applications', label: 'Applications' },
  { id: 'chat', label: 'Chat contacts' },
  { id: 'settings', label: 'Settings' },
  { id: 'activity', label: 'Activity log' },
];

const EMPTY_CONTACT = { type: 'whatsapp', label: '', value: '' };

function fmt(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return Number.isNaN(d.getTime()) ? dateString : d.toLocaleString();
}

function csvCell(value) {
  const s = value == null ? '' : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);

  const [tab, setTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [activity, setActivity] = useState([]);
  const [settings, setSettings] = useState({ ...SETTINGS_DEFAULTS });
  const [contacts, setContacts] = useState([]);
  const [contactDraft, setContactDraft] = useState(EMPTY_CONTACT);
  const [roundRobin, setRoundRobin] = useState(false);
  const [rrSaving, setRrSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [detailId, setDetailId] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');

  const email = session?.user?.email || '';
  const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const db = supabase;

  // ---------------------------------------------------------------- auth ---
  useEffect(() => {
    if (!db) {
      setAuthReady(true);
      return undefined;
    }
    let alive = true;
    db.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data?.session || null);
      setAuthReady(true);
    });
    const { data: sub } = db.auth.onAuthStateChange((_event, next) => {
      if (alive) setSession(next || null);
    });
    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [db]);

  const logActivity = useCallback(
    async (action, details = {}) => {
      if (!db || !isAdmin) return;
      try {
        await db.from('admin_activity').insert({ admin_email: email, action, details });
      } catch {
        /* the log must never break the action itself */
      }
    },
    [db, email, isAdmin]
  );

  const loadAll = useCallback(async () => {
    if (!db) return;
    setLoading(true);
    setError('');
    try {
      const [appsRes, activityRes, contactsRes] = await Promise.all([
        db.from('applications').select('*').order('created_at', { ascending: false }),
        db.from('admin_activity').select('*').order('created_at', { ascending: false }).limit(200),
        // The admin policy also exposes disabled rows, so the panel can list them.
        db.from('chat_contacts').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: true }),
      ]);
      if (appsRes.error) throw appsRes.error;
      setApplications(appsRes.data || []);
      setActivity(activityRes.data || []);
      setContacts(contactsRes.error ? [] : contactsRes.data || []);
      const rrRes = await db.from('site_settings').select('value').eq('key', 'chat_round_robin').maybeSingle();
      setRoundRobin(!rrRes.error && rrRes.data?.value === 'on');
      const fresh = await fetchSiteSettings(true);
      setSettings(fresh);
    } catch (err) {
      setError(err?.message || 'Could not load admin data.');
    } finally {
      setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin, loadAll]);

  const signIn = async (event) => {
    event.preventDefault();
    if (!db) return;
    setAuthBusy(true);
    setAuthError('');
    const { data, error: signInError } = await db.auth.signInWithPassword({
      email: credentials.email.trim(),
      password: credentials.password,
    });
    setAuthBusy(false);
    if (signInError) {
      setAuthError(signInError.message);
      return;
    }
    if (data?.user?.email && data.user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setAuthError('This account is not allowed to access the admin area.');
      await db.auth.signOut();
      return;
    }
    setCredentials({ email: '', password: '' });
    try {
      await db.from('admin_activity').insert({ admin_email: data.user.email, action: 'login', details: {} });
    } catch {
      /* ignore */
    }
  };

  const signOut = async () => {
    if (!db) return;
    await logActivity('logout', {});
    await db.auth.signOut();
    setApplications([]);
    setActivity([]);
  };

  // --------------------------------------------------------- applications ---
  const programs = useMemo(() => {
    const set = new Set(applications.map((a) => a.program).filter(Boolean));
    return Array.from(set).sort();
  }, [applications]);

  const newCount = useMemo(() => applications.filter((a) => (a.status || 'new') === 'new').length, [applications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((a) => {
      if (programFilter !== 'all' && a.program !== programFilter) return false;
      if (statusFilter !== 'all' && (a.status || 'new') !== statusFilter) return false;
      if (!q) return true;
      return [a.full_name, a.email, a.whatsapp, a.citizenship, a.program]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [applications, query, programFilter, statusFilter]);

  const detail = detailId ? applications.find((a) => a.id === detailId) || null : null;

  const openDetail = (app) => {
    setDetailId(app.id);
    setNoteDraft(app.admin_notes || '');
  };

  const changeStatus = async (app, status) => {
    if (!db) return;
    const { error: updateError } = await db
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', app.id);
    if (updateError) {
      setNotice(`Could not update status: ${updateError.message}`);
      return;
    }
    setApplications((list) => list.map((a) => (a.id === app.id ? { ...a, status } : a)));
    setNotice(`Status updated to “${status}”.`);
    await logActivity('status_change', { id: app.id, name: app.full_name, from: app.status || 'new', to: status });
  };

  const saveNotes = async (app) => {
    if (!db) return;
    const { error: updateError } = await db
      .from('applications')
      .update({ admin_notes: noteDraft, updated_at: new Date().toISOString() })
      .eq('id', app.id);
    if (updateError) {
      setNotice(`Could not save notes: ${updateError.message}`);
      return;
    }
    setApplications((list) => list.map((a) => (a.id === app.id ? { ...a, admin_notes: noteDraft } : a)));
    setNotice('Notes saved.');
    await logActivity('notes_update', { id: app.id, name: app.full_name });
  };

  const removeApplication = async (app) => {
    if (!db) return;
    if (!window.confirm(`Delete the application from ${app.full_name}? This cannot be undone.`)) return;
    const { error: deleteError } = await db.from('applications').delete().eq('id', app.id);
    if (deleteError) {
      setNotice(`Could not delete: ${deleteError.message}`);
      return;
    }
    setApplications((list) => list.filter((a) => a.id !== app.id));
    setDetailId(null);
    setNotice('Application deleted.');
    await logActivity('delete', { id: app.id, name: app.full_name, email: app.email });
  };

  const exportCsv = async () => {
    const header = ['created_at', 'program', 'status', 'full_name', 'age', 'email', 'whatsapp', 'citizenship', 'residence_country', 'lives_in_passport_country', 'applicant_type', 'admin_notes'];
    const lines = [header.join(',')].concat(
      filtered.map((a) => header.map((key) => csvCell(a[key])).join(','))
    );
    const blob = new Blob([`\uFEFF${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setNotice(`Exported ${filtered.length} application(s).`);
    await logActivity('export', { count: filtered.length, program: programFilter, status: statusFilter });
  };

  // ------------------------------------------------------------- settings ---
  const saveSettings = async (event) => {
    event.preventDefault();
    if (!db) return;
    const rows = SETTINGS_FIELDS.map((f) => ({ key: f.key, value: settings[f.key] || '', updated_at: new Date().toISOString() }));
    const { error: upsertError } = await db.from('site_settings').upsert(rows, { onConflict: 'key' });
    if (upsertError) {
      setNotice(`Could not save settings: ${upsertError.message}`);
      return;
    }
    invalidateSiteSettings();
    setNotice('Settings saved. The public site will show them on the next page load.');
    await logActivity('settings_update', { keys: SETTINGS_FIELDS.map((f) => f.key) });
  };

  // --------------------------------------------------------- chat contacts ---
  // Any number of WhatsApp numbers and Telegram links. Each change is recorded
  // in admin_activity. Values are normalised before they are stored:
  //   WhatsApp  →  https://wa.me/<digits>
  //   Telegram  →  https://t.me/<username>
  const addContact = async (event) => {
    event.preventDefault();
    if (!db) return;
    const value = normalizeContactValue(contactDraft.type, contactDraft.value);
    if (!value) {
      setNotice(
        contactDraft.type === 'whatsapp'
          ? 'That does not look like a phone number. Use a number with country code, e.g. +254 700 000 000, or a wa.me link.'
          : 'That does not look like a Telegram link. Use a t.me link or an @username.'
      );
      return;
    }
    const nextOrder = contacts.length ? Math.max(...contacts.map((c) => c.sort_order || 0)) + 1 : 0;
    const { data, error: insertError } = await db
      .from('chat_contacts')
      .insert({
        type: contactDraft.type,
        label: contactDraft.label.trim() || CHAT_TYPE_LABELS[contactDraft.type],
        value,
        sort_order: nextOrder,
        active: true,
      })
      .select()
      .single();
    if (insertError) {
      setNotice(`Could not add the contact: ${insertError.message}`);
      return;
    }
    setContacts((list) => [...list, data]);
    setContactDraft(EMPTY_CONTACT);
    invalidateChatContacts();
    setNotice(`Added ${CHAT_TYPE_LABELS[data.type]} contact.`);
    await logActivity('chat_contact_add', { type: data.type, value });
  };

  const patchContact = async (id, patch, action, details) => {
    if (!db) return;
    const { error: updateError } = await db.from('chat_contacts').update(patch).eq('id', id);
    if (updateError) {
      setNotice(`Could not update the contact: ${updateError.message}`);
      return;
    }
    setContacts((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    invalidateChatContacts();
    if (action) await logActivity(action, details || patch);
  };

  const deleteContact = async (contact) => {
    if (!db) return;
    if (!window.confirm(`Delete the ${CHAT_TYPE_LABELS[contact.type]} contact ${contactDisplayValue(contact.type, contact.value)}?`)) return;
    const { error: deleteError } = await db.from('chat_contacts').delete().eq('id', contact.id);
    if (deleteError) {
      setNotice(`Could not delete the contact: ${deleteError.message}`);
      return;
    }
    setContacts((list) => list.filter((c) => c.id !== contact.id));
    invalidateChatContacts();
    setNotice('Contact deleted.');
    await logActivity('chat_contact_delete', { type: contact.type, value: contact.value });
  };

  /** Move a contact up or down by swapping sort_order with its neighbour. */
  const moveContact = async (contact, direction) => {
    const sameType = contacts.filter((c) => c.type === contact.type);
    const index = sameType.findIndex((c) => c.id === contact.id);
    const swapWith = sameType[index + direction];
    if (!swapWith) return;
    await patchContact(contact.id, { sort_order: swapWith.sort_order }, 'chat_contact_reorder', {
      type: contact.type,
      moved: contact.value,
      past: swapWith.value,
    });
    await patchContact(swapWith.id, { sort_order: contact.sort_order });
    await loadAll();
  };

  // -------------------------------------------------- round-robin controls ---
  const saveRoundRobin = async (next) => {
    if (!db) return;
    setRrSaving(true);
    try {
      const { error } = await db
        .from('site_settings')
        .upsert({ key: 'chat_round_robin', value: next ? 'on' : 'off' }, { onConflict: 'key' });
      if (error) {
        setNotice(`Could not save the round-robin switch: ${error.message}`);
        return;
      }
      setRoundRobin(next);
      invalidateSiteSettings();
      setNotice(next ? 'Round-robin is on. Visitors are shared equally between active agents.' : 'Round-robin is off. Visitors get a random agent again.');
      await logActivity('chat_round_robin', { enabled: next });
    } finally {
      setRrSaving(false);
    }
  };

  const resetAssignments = async () => {
    if (!db) return;
    if (!window.confirm('Reset the assignment counters of every agent back to 0?')) return;
    const { error } = await db.from('chat_contacts').update({ assigned_count: 0, last_assigned_at: null }).neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) {
      setNotice(`Could not reset the counters: ${error.message}`);
      return;
    }
    setContacts((list) => list.map((c) => ({ ...c, assigned_count: 0, last_assigned_at: null })));
    setNotice('Assignment counters reset to 0.');
    await logActivity('chat_round_robin_reset', {});
  };

  // ----------------------------------------------------------------- views ---
  if (!authReady) {
    return (
      <div className="admin-page">
        <div className="admin-shell">
          <p className="admin-muted">Loading…</p>
        </div>
      </div>
    );
  }

  if (!db) {
    return (
      <div className="admin-page">
        <div className="admin-shell">
          <h1 className="admin-title">Admin</h1>
          <div className="admin-alert error">Supabase is not configured for this deployment.</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="admin-page">
        <div className="admin-shell admin-shell--narrow">
          <h1 className="admin-title">Admin sign in</h1>
          <p className="admin-muted">Sign in with the administrator email and password.</p>
          {authError && <div className="admin-alert error">{authError}</div>}
          <form onSubmit={signIn} className="admin-login">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={credentials.email}
              onChange={(e) => setCredentials((c) => ({ ...c, email: e.target.value }))}
              required
            />
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) => setCredentials((c) => ({ ...c, password: e.target.value }))}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={authBusy}>
              {authBusy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="admin-shell admin-shell--narrow">
          <h1 className="admin-title">No access</h1>
          <div className="admin-alert error">
            The account <strong>{email}</strong> is not allowed to access the admin area.
          </div>
          <button type="button" className="btn btn-outline" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-title">Admin</h1>
            <p className="admin-muted">Signed in as {email}</p>
          </div>
          <div className="admin-topbar-actions">
            <button type="button" className="admin-ghost-btn" onClick={loadAll} disabled={loading}>
              <RefreshCw size={16} /> {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <button type="button" className="admin-ghost-btn" onClick={signOut}>
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>

        <nav className="admin-tabs" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`admin-tab${tab === t.id ? ' is-active' : ''}`}
              aria-current={tab === t.id ? 'page' : undefined}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.id === 'applications' && newCount > 0 && <span className="admin-badge">{newCount}</span>}
            </button>
          ))}
        </nav>

        {notice && (
          <div className="admin-alert info" role="status">
            {notice}
            <button type="button" className="admin-alert-close" onClick={() => setNotice('')} aria-label="Dismiss">
              <X size={15} />
            </button>
          </div>
        )}
        {error && <div className="admin-alert error">{error}</div>}

        {tab === 'applications' && (
          <section className="admin-card">
            <div className="admin-filters">
              <div className="admin-search">
                <Search size={16} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search name, email, WhatsApp…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search applications"
                />
              </div>
              <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)} aria-label="Filter by program">
                <option value="all">All programs</option>
                {programs.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
                <option value="all">All statuses</option>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button type="button" className="admin-ghost-btn" onClick={exportCsv} disabled={filtered.length === 0}>
                <Download size={16} /> Export CSV
              </button>
            </div>

            <p className="admin-muted">
              {filtered.length} of {applications.length} application(s) · {newCount} new
            </p>

            <div className="admin-list">
              {filtered.length === 0 && <p className="admin-empty">No applications match these filters.</p>}
              {filtered.map((a) => (
                <button type="button" className="admin-row" key={a.id} onClick={() => openDetail(a)}>
                  <span className="admin-row-main">
                    <strong>{a.full_name}</strong>
                    <span className="admin-row-sub">
                      {a.program} · age {a.age} · {a.email}
                    </span>
                  </span>
                  <span className={`admin-status admin-status--${a.status || 'new'}`}>{a.status || 'new'}</span>
                  <span className="admin-row-date">{fmt(a.created_at)}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {tab === 'chat' && (
          <section className="admin-card">
            <h2 className="admin-h2">Chat contacts</h2>
            <p className="admin-muted">
              Every WhatsApp number and Telegram link you add here feeds the floating chat button, the footer and the forms&apos; chat links. Disabled
              contacts stay hidden from the site.
            </p>

            {/* Live status: which types can visitors actually reach? */}
            <p className="admin-chat-status" data-testid="chat-status">
              <strong>WhatsApp: {contacts.filter((c) => c.type === 'whatsapp' && c.active).length} active</strong>
              {' · '}
              <strong>Telegram: {contacts.filter((c) => c.type === 'telegram' && c.active).length} active</strong>
              {availableTypes(contacts.filter((c) => c.active)).length === 1 && (
                <> — visitors will only see {CHAT_TYPE_LABELS[availableTypes(contacts.filter((c) => c.active))[0]]}. Add a contact of the other type to let
                them choose.</>
              )}
              {availableTypes(contacts.filter((c) => c.active)).length === 0 && <> — visitors see no chat button at all. Add a contact to enable chat.</>}
            </p>

            {/* Round-robin switch, default OFF */}
            <label className="admin-switch-row">
              <input
                type="checkbox"
                checked={roundRobin}
                disabled={rrSaving}
                onChange={(e) => saveRoundRobin(e.target.checked)}
              />
              <span>Share visitors equally between agents (round-robin)</span>
            </label>
            <p className="admin-muted admin-switch-help">
              Works separately for WhatsApp and Telegram. Only active when a type has 2 or more active agents.
            </p>
            {roundRobin && (
              <>
                {['whatsapp', 'telegram'].map((type) => {
                  const count = contacts.filter((c) => c.type === type && c.active).length;
                  return count > 0 && count < 2 ? (
                    <p className="admin-warning" key={type}>
                      Round-robin is on, but {CHAT_TYPE_LABELS[type]} has only {count} active agent{count === 1 ? '' : 's'} — visitors on{' '}
                      {CHAT_TYPE_LABELS[type]} go straight to that agent.
                    </p>
                  ) : null;
                })}
                <button type="button" className="admin-ghost-btn" onClick={resetAssignments}>
                  Reset counts
                </button>
              </>
            )}

            <form className="admin-form-grid admin-form-grid--contact" onSubmit={addContact}>
              <label className="admin-field">
                <span>Type</span>
                <select
                  value={contactDraft.type}
                  onChange={(e) => setContactDraft((d) => ({ ...d, type: e.target.value }))}
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telegram">Telegram</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Label (optional)</span>
                <input
                  type="text"
                  value={contactDraft.label}
                  placeholder={contactDraft.type === 'whatsapp' ? 'English support' : 'Telegram support'}
                  onChange={(e) => setContactDraft((d) => ({ ...d, label: e.target.value }))}
                />
              </label>
              <label className="admin-field admin-field--wide">
                <span>{contactDraft.type === 'whatsapp' ? 'Number or wa.me link' : 't.me link or @username'}</span>
                <input
                  type="text"
                  value={contactDraft.value}
                  placeholder={contactDraft.type === 'whatsapp' ? '+254 700 000 000' : '@youcanlegal'}
                  onChange={(e) => setContactDraft((d) => ({ ...d, value: e.target.value }))}
                />
              </label>
              <div className="admin-actions">
                <button type="submit" className="btn-apply btn-apply--compact">
                  <Plus size={18} aria-hidden="true" /> Add contact
                </button>
              </div>
            </form>

            {contacts.length === 0 ? (
              <p className="admin-empty">No chat contacts yet. Add your first WhatsApp number or Telegram link above.</p>
            ) : (
              ['whatsapp', 'telegram'].map((type) => {
                const group = contacts.filter((c) => c.type === type);
                if (group.length === 0) return null;
                return (
                  <div className="admin-contact-group" key={type}>
                    <h3 className="admin-h3">{CHAT_TYPE_LABELS[type]}</h3>
                    <div className="admin-list">
                      {group.map((c, i) => (
                        <div className={`admin-contact-row${c.active ? '' : ' is-off'}`} key={c.id}>
                          <span className="admin-contact-main">
                            <strong>{c.label || CHAT_TYPE_LABELS[type]}</strong>
                            <span className="admin-row-sub">
                              {contactDisplayValue(c.type, c.value)} · {c.assigned_count || 0} assigned
                            </span>
                          </span>
                          <span className={`admin-status ${c.active ? 'admin-status--approved' : 'admin-status--rejected'}`}>
                            {c.active ? 'active' : 'disabled'}
                          </span>
                          <span className="admin-contact-tools">
                            <button
                              type="button"
                              className="admin-ghost-btn"
                              aria-label="Move up"
                              disabled={i === 0}
                              onClick={() => moveContact(c, -1)}
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              type="button"
                              className="admin-ghost-btn"
                              aria-label="Move down"
                              disabled={i === group.length - 1}
                              onClick={() => moveContact(c, 1)}
                            >
                              <ArrowDown size={16} />
                            </button>
                            <button
                              type="button"
                              className="admin-ghost-btn"
                              onClick={() =>
                                patchContact(c.id, { active: !c.active }, 'chat_contact_toggle', {
                                  type: c.type,
                                  value: c.value,
                                  active: !c.active,
                                })
                              }
                            >
                              {c.active ? 'Disable' : 'Enable'}
                            </button>
                            <button
                              type="button"
                              className="admin-ghost-btn admin-ghost-btn--danger"
                              aria-label="Delete contact"
                              onClick={() => deleteContact(c)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </section>
        )}

        {tab === 'settings' && (
          <section className="admin-card">
            <h2 className="admin-h2">Social and contact links</h2>
            <p className="admin-muted">Empty links are hidden on the public site. Applications are emailed to the notification email.</p>
            <form className="admin-form-grid" onSubmit={saveSettings}>
              {SETTINGS_FIELDS.map((f) => (
                <label key={f.key} className={f.key === 'notification_email' ? 'admin-field admin-field--wide' : 'admin-field'}>
                  <span>{f.label}</span>
                  <input
                    type={f.type === 'url' ? 'text' : f.type}
                    value={settings[f.key] || ''}
                    placeholder={f.placeholder}
                    onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                  />
                </label>
              ))}
              <div className="admin-actions">
                <button type="submit" className="btn btn-primary">
                  Save settings
                </button>
              </div>
            </form>
          </section>
        )}

        {tab === 'activity' && (
          <section className="admin-card">
            <h2 className="admin-h2">Activity log</h2>
            <p className="admin-muted">Logins, settings changes, status changes, deletions and exports.</p>
            <ul className="admin-activity">
              {activity.length === 0 && <li className="admin-empty">No activity recorded yet.</li>}
              {activity.map((entry) => (
                <li key={entry.id}>
                  <div className="admin-activity-top">
                    <strong>{entry.action}</strong>
                    <span>{fmt(entry.created_at)}</span>
                  </div>
                  <div className="admin-activity-detail">
                    {entry.admin_email}
                    {entry.details && Object.keys(entry.details).length > 0 ? ` — ${JSON.stringify(entry.details)}` : ''}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {detail && (
        <div className="modal-overlay" onClick={() => setDetailId(null)} role="presentation">
          <div className="admin-detail" role="dialog" aria-modal="true" aria-label="Application detail" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Close" onClick={() => setDetailId(null)}>
              <X size={20} />
            </button>
            <h2 className="admin-h2">{detail.full_name}</h2>
            <dl className="admin-dl">
              <div><dt>Received</dt><dd>{fmt(detail.created_at)}</dd></div>
              <div><dt>Program</dt><dd>{detail.program}</dd></div>
              <div><dt>Status</dt><dd>{detail.status || 'new'}</dd></div>
              <div><dt>Citizenship</dt><dd>{detail.citizenship}</dd></div>
              <div><dt>Lives in passport country</dt><dd>{detail.lives_in_passport_country ? 'Yes' : 'No'}</dd></div>
              <div><dt>Country of residence</dt><dd>{detail.residence_country || '—'}</dd></div>
              <div><dt>Age</dt><dd>{detail.age}</dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${detail.email}`}>{detail.email}</a></dd></div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={`https://wa.me/${String(detail.whatsapp || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer">
                    {detail.whatsapp}
                  </a>
                </dd>
              </div>
              <div><dt>Applicant type</dt><dd>{detail.applicant_type}</dd></div>
            </dl>

            <div className="admin-field">
              <span>Status</span>
              <div className="admin-status-row">
                {STATUSES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={`admin-status-btn${(detail.status || 'new') === s.value ? ' is-active' : ''}`}
                    onClick={() => changeStatus(detail, s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="admin-field">
              <span>Notes</span>
              <textarea rows={4} value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} placeholder="Internal notes (not visible to the applicant)" />
            </label>

            <div className="admin-actions">
              <button type="button" className="btn btn-primary" onClick={() => saveNotes(detail)}>
                Save notes
              </button>
              <button type="button" className="admin-danger-btn" onClick={() => removeApplication(detail)}>
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

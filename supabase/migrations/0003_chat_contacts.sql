-- ============================================================
-- YOU CAN LEGAL — 0003 chat contacts
--
-- Lets the owner keep any number of WhatsApp numbers and Telegram links and
-- enable / disable / reorder them from /admin.
--
--   * chat_contacts        — the list
--   * RLS: the public site may read ONLY rows where active = true.
--          Insert / update / delete is limited to the admin account.
--   * The old single-value settings (whatsapp_url, whatsapp_number,
--     telegram_url) are migrated into rows once, but only if not empty.
--
-- Safe to run more than once.
-- ============================================================

-- ---------------------------------------------------------------- table
create table if not exists public.chat_contacts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('whatsapp', 'telegram')),
  label text,
  value text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.chat_contacts enable row level security;

-- ---------------------------------------------------------------- policies
-- The public site reads only the contacts that are switched on. The admin can
-- read everything (including disabled rows) so the panel can list them.
drop policy if exists "public can read active chat contacts" on public.chat_contacts;
create policy "public can read active chat contacts"
  on public.chat_contacts for select to anon, authenticated
  using (active = true);

drop policy if exists "admin can read chat contacts" on public.chat_contacts;
create policy "admin can read chat contacts"
  on public.chat_contacts for select to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can insert chat contacts" on public.chat_contacts;
create policy "admin can insert chat contacts"
  on public.chat_contacts for insert to authenticated
  with check (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can update chat contacts" on public.chat_contacts;
create policy "admin can update chat contacts"
  on public.chat_contacts for update to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com')
  with check (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can delete chat contacts" on public.chat_contacts;
create policy "admin can delete chat contacts"
  on public.chat_contacts for delete to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

create index if not exists chat_contacts_active_idx
  on public.chat_contacts (active, type, sort_order);

-- ------------------------------------------------- one-off data migration
-- Copy the old single-value settings into rows. Each insert is guarded so that
-- running this file twice cannot create duplicates.

-- WhatsApp: a stored wa.me link wins over a stored number.
insert into public.chat_contacts (type, label, value, sort_order, active)
select 'whatsapp', 'WhatsApp', s.value, 0, true
from public.site_settings s
where s.key = 'whatsapp_url'
  and trim(coalesce(s.value, '')) <> ''
  and not exists (
    select 1 from public.chat_contacts c
    where c.type = 'whatsapp' and c.value = s.value
  );

-- WhatsApp number → https://wa.me/<digits>, only when no wa.me link was stored.
insert into public.chat_contacts (type, label, value, sort_order, active)
select
  'whatsapp',
  'WhatsApp',
  'https://wa.me/' || regexp_replace(s.value, '[^0-9]', '', 'g'),
  1,
  true
from public.site_settings s
where s.key = 'whatsapp_number'
  and trim(coalesce(s.value, '')) <> ''
  and regexp_replace(s.value, '[^0-9]', '', 'g') <> ''
  and not exists (
    select 1 from public.site_settings u
    where u.key = 'whatsapp_url' and trim(coalesce(u.value, '')) <> ''
  )
  and not exists (
    select 1 from public.chat_contacts c
    where c.type = 'whatsapp'
      and c.value = 'https://wa.me/' || regexp_replace(s.value, '[^0-9]', '', 'g')
  );

-- Telegram link or @username.
insert into public.chat_contacts (type, label, value, sort_order, active)
select
  'telegram',
  'Telegram',
  case
    when s.value like 'http%' then s.value
    when s.value like '@%' then 'https://t.me/' || substring(s.value from 2)
    else 'https://t.me/' || s.value
  end,
  0,
  true
from public.site_settings s
where s.key = 'telegram_url'
  and trim(coalesce(s.value, '')) <> ''
  and not exists (
    select 1 from public.chat_contacts c
    where c.type = 'telegram'
      and c.value = case
        when s.value like 'http%' then s.value
        when s.value like '@%' then 'https://t.me/' || substring(s.value from 2)
        else 'https://t.me/' || s.value
      end
  );

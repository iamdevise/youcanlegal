-- ============================================================
-- YOU CAN LEGAL — 0002 admin
--
-- Adds the admin section backing store:
--   * site_settings   — public site content managed from /admin
--   * admin_activity  — audit log of admin actions
--   * applications    — admin-only read/update/delete + admin_notes
--
-- The only admin is the Supabase Auth user with this email:
--   polystaradmin@gmail.com
-- The public INSERT-only rule for `applications` is NOT weakened.
--
-- Safe to run more than once.
-- ============================================================

-- ------------------------------------------------------------
-- 1. applications — admin columns + admin-only access
-- ------------------------------------------------------------

alter table public.applications add column if not exists admin_notes text;
alter table public.applications add column if not exists updated_at timestamptz not null default now();

-- status must stay one of: new | contacted | approved | rejected
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'applications_status_check'
  ) then
    alter table public.applications
      add constraint applications_status_check
      check (status in ('new', 'contacted', 'approved', 'rejected'));
  end if;
end $$;

-- Keep the existing "public can submit applications" INSERT policy exactly as it is.
drop policy if exists "public can submit applications" on public.applications;
create policy "public can submit applications"
  on public.applications for insert
  to anon, authenticated
  with check (true);

-- Admin-only read / update / delete. Anonymous visitors still cannot read anything.
drop policy if exists "admin can read applications" on public.applications;
create policy "admin can read applications"
  on public.applications for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can update applications" on public.applications;
create policy "admin can update applications"
  on public.applications for update
  to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com')
  with check (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can delete applications" on public.applications;
create policy "admin can delete applications"
  on public.applications for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

-- ------------------------------------------------------------
-- 2. site_settings — public read, admin write
-- ------------------------------------------------------------

create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- The public website reads these (footer, contact section, floating chat button).
drop policy if exists "public can read site settings" on public.site_settings;
create policy "public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "admin can insert site settings" on public.site_settings;
create policy "admin can insert site settings"
  on public.site_settings for insert
  to authenticated
  with check (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can update site settings" on public.site_settings;
create policy "admin can update site settings"
  on public.site_settings for update
  to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com')
  with check (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can delete site settings" on public.site_settings;
create policy "admin can delete site settings"
  on public.site_settings for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

-- Defaults. The notification email can be changed later from /admin → Settings.
insert into public.site_settings (key, value) values
  ('telegram_url', ''),
  ('whatsapp_url', ''),
  ('whatsapp_number', ''),
  ('instagram_url', 'https://www.instagram.com/you_can_legal'),
  ('facebook_url', 'https://www.facebook.com/youcanlegal/'),
  ('tiktok_url', 'https://www.tiktok.com/@you_can_legal'),
  ('youtube_url', 'https://www.youtube.com/@youcanlegal'),
  ('linkedin_url', 'https://www.linkedin.com/company/you-can-legal/'),
  ('contact_email', 'hello@youcan.legal'),
  ('contact_phone', ''),
  ('notification_email', 'polystaradmin@gmail.com')
on conflict (key) do nothing;

-- ------------------------------------------------------------
-- 3. admin_activity — audit log, admin only
-- ------------------------------------------------------------

create table if not exists public.admin_activity (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  admin_email text,
  action text not null,
  details jsonb not null default '{}'::jsonb
);

alter table public.admin_activity enable row level security;

drop policy if exists "admin can read activity" on public.admin_activity;
create policy "admin can read activity"
  on public.admin_activity for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

drop policy if exists "admin can write activity" on public.admin_activity;
create policy "admin can write activity"
  on public.admin_activity for insert
  to authenticated
  with check (auth.jwt() ->> 'email' = 'polystaradmin@gmail.com');

create index if not exists admin_activity_created_at_idx on public.admin_activity (created_at desc);

-- ------------------------------------------------------------
-- 4. helpful index for the admin list (search by name / email)
-- ------------------------------------------------------------

create index if not exists applications_status_idx on public.applications (status);

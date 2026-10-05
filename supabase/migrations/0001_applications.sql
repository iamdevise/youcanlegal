-- ============================================================
-- YOU CAN LEGAL — applications table
-- Public INSERT (application form), private read (admin only).
-- ============================================================

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  program text not null,
  citizenship text not null,
  lives_in_passport_country boolean not null default true,
  residence_country text,
  full_name text not null,
  age int not null check (age between 16 and 70),
  email text not null,
  whatsapp text not null,
  applicant_type text not null check (applicant_type in ('myself', 'agency')),
  status text not null default 'new'
);

-- Row Level Security: enable
alter table public.applications enable row level security;

-- Public visitors may INSERT applications (the website form), but never read/update/delete.
create policy "public can submit applications"
  on public.applications for insert
  to anon, authenticated
  with check (true);

-- No SELECT/UPDATE/DELETE policies for anon/authenticated:
-- all reads happen through the Supabase Dashboard (service role bypasses RLS)
-- or a future authenticated admin panel.

-- Index for the admin listing (newest first)
create index if not exists applications_created_at_idx on public.applications (created_at desc);

-- Optional: simple rate-limit hygiene — reject obvious duplicates submitted within 1 minute
-- (kept intentionally permissive to avoid blocking genuine applicants)

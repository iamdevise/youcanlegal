-- ============================================================
-- YOU CAN LEGAL — 0004 chat round-robin
--
-- Round-robin agent assignment for the chat contacts, default OFF.
--
--   * chat_contacts gets assigned_count / last_assigned_at bookkeeping.
--   * site_settings gets the 'chat_round_robin' switch ('off' by default),
--     writable only by the admin like every other setting.
--   * public.assign_chat_contact(p_type) is a SECURITY DEFINER function the
--     public site may call: it hands out the active contact of that type with
--     the lowest assigned_count (ties: oldest last_assigned_at, then
--     sort_order), locks the row so two simultaneous visitors never get the
--     same slot, increments the counter and returns the contact. It returns
--     no row unless the switch is 'on'.
--
-- Safe to run more than once.
-- ============================================================

-- ---------------------------------------------------------------- bookkeeping
alter table public.chat_contacts
  add column if not exists assigned_count int not null default 0,
  add column if not exists last_assigned_at timestamptz;

-- ---------------------------------------------------------------- the switch
insert into public.site_settings (key, value)
values ('chat_round_robin', 'off')
on conflict (key) do nothing;

-- The existing admin policies on site_settings (select for everyone,
-- write for polystaradmin@gmail.com only) already cover the new key, because
-- they are table-wide — no extra policy is needed.

-- ---------------------------------------------------------------- the function
create or replace function public.assign_chat_contact(p_type text)
returns table (id uuid, type text, label text, value text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_enabled text;
  v_row chat_contacts%rowtype;
begin
  -- Only ever hand out contacts when the admin switched round-robin on.
  select value into v_enabled from site_settings where key = 'chat_round_robin';
  if coalesce(v_enabled, 'off') <> 'on' then
    return;
  end if;

  -- The type must be one the table allows (whatsapp / telegram).
  if p_type not in ('whatsapp', 'telegram') then
    return;
  end if;

  -- Advisory lock per type: two simultaneous visitors can never take the same
  -- slot (the transaction lock below already guards, this keeps it airtight
  -- across the whole statement).
  perform pg_advisory_xact_lock(hashtext('assign_chat_contact:' || p_type));

  select c.*
    into v_row
    from chat_contacts c
   where c.active = true
     and c.type = p_type
     and coalesce(c.value, '') <> ''
   order by c.assigned_count asc,
            c.last_assigned_at asc nulls first,
            c.sort_order asc,
            c.created_at asc
   limit 1
   for update skip locked;

  if not found then
    return;
  end if;

  update chat_contacts
     set assigned_count = assigned_count + 1,
         last_assigned_at = now()
   where id = v_row.id;

  return query select v_row.id, v_row.type, v_row.label, v_row.value;
end;
$$;

-- The public site (anon key) may call it — and nothing else on this table.
grant execute on function public.assign_chat_contact(text) to anon, authenticated;
revoke execute on function public.assign_chat_contact(text) from public;

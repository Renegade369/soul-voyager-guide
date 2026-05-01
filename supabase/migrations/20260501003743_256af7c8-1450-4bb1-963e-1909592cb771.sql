create table public.soul_discovery_sessions (
  id uuid primary key default gen_random_uuid(),
  email text,
  name text,
  messages jsonb not null default '[]'::jsonb,
  reflection text,
  status text not null default 'in_progress',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.soul_discovery_sessions enable row level security;

-- Anyone may create an intake session (anonymous seekers welcome)
create policy "anyone can create discovery sessions"
on public.soul_discovery_sessions for insert
to anon, authenticated
with check (true);

-- Anyone may update their own session by id (id is the secret handle, returned only to client)
create policy "anyone can update discovery sessions"
on public.soul_discovery_sessions for update
to anon, authenticated
using (true)
with check (true);

create index soul_discovery_sessions_created_at_idx
  on public.soul_discovery_sessions (created_at desc);

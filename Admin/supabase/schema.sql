-- Schema de "Saved Searches" (to-do 70, Admin/TODO.md). Corrido a mano en el SQL Editor de
-- Supabase el 2026-09-27 — este archivo es la copia de respaldo/referencia, no se ejecuta
-- automáticamente. Si hace falta recrear todo desde cero en un proyecto Supabase nuevo, correr
-- este archivo completo tal cual en el SQL Editor.

drop table if exists saved_searches cascade;

create table saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  state jsonb not null,
  state_hash text not null,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  last_opened_at timestamptz not null default now(),
  unique (user_id, state_hash)
);

alter table saved_searches enable row level security;

create policy "select own searches" on saved_searches
  for select using (auth.uid() = user_id);

create policy "insert own searches" on saved_searches
  for insert with check (auth.uid() = user_id);

create policy "update own searches" on saved_searches
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "delete own searches" on saved_searches
  for delete using (auth.uid() = user_id);

-- Guarda o actualiza una búsqueda: si ya existe la misma combinación (mismo state_hash),
-- solo le actualiza el estado y la fecha de apertura, SIN tocar is_favorite.
create or replace function save_search(p_state jsonb, p_state_hash text)
returns saved_searches
language plpgsql
security definer
set search_path = public
as $$
declare
  result saved_searches;
begin
  insert into saved_searches (user_id, state, state_hash)
  values (auth.uid(), p_state, p_state_hash)
  on conflict (user_id, state_hash)
  do update set state = excluded.state, last_opened_at = now()
  returning * into result;
  return result;
end;
$$;

-- RLS define QUÉ FILAS puede ver cada rol, pero Postgres exige además el permiso de tabla más
-- básico antes de eso — sin este GRANT, hasta un usuario logueado se encuentra con
-- "permission denied for table saved_searches" (encontrado en vivo, 2026-09-27).
grant select, insert, update, delete on public.saved_searches to authenticated;
grant execute on function save_search(jsonb, text) to authenticated;

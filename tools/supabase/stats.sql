-- stats(): el puente para ver cómo se usa Mi Cuenta sin entrar al panel de Supabase. Devuelve SOLO números y fechas: ningún email
-- ni dato de una persona, porque la llama la clave pública (cualquiera que la tenga puede llamarla). La lee tools/supabase/stats.mjs.
-- Se pega una sola vez en Supabase → SQL Editor → Create a new snippet → Run.

create or replace function public.stats()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'usuarios',        (select count(*) from auth.users),
    'ultimo_login',    (select max(last_sign_in_at) from auth.users),
    'busquedas',       (select count(*) from public.saved_searches),
    'favoritas',       (select count(*) from public.saved_searches where is_favorite),
    'ultima_busqueda', (select max(last_opened_at) from public.saved_searches),
    -- Por día, los últimos 180: altas de usuarios y búsquedas nuevas. Solo cantidades.
    'por_dia', (
      select coalesce(json_agg(json_build_object('dia', d.dia, 'usuarios_nuevos', d.u, 'busquedas_nuevas', d.b) order by d.dia), '[]'::json)
      from (
        select dia::date as dia,
               (select count(*) from auth.users where created_at::date = dia::date) as u,
               (select count(*) from public.saved_searches where created_at::date = dia::date) as b
        from generate_series(current_date - 179, current_date, interval '1 day') as dia
      ) d
    )
  );
$$;

grant execute on function public.stats() to anon;

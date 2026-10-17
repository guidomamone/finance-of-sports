-- ping(): una consulta real a la base para que Supabase no pause el proyecto (plan gratis: se pausa tras 7 días sin uso).
-- La llama cada 3 días el Worker de tools/supabase/ping-worker.mjs. Toca la tabla de verdad (no un `select 'ok'` suelto) pero no
-- devuelve nada de ella: un visitante sin sesión que la llame recibe 'ok' y nada más.
-- Se pega una sola vez en Supabase → SQL Editor → Run.

create or replace function public.ping()
returns text
language plpgsql
security definer
set search_path = public
as $$
begin
  perform 1 from public.saved_searches limit 1;
  return 'ok';
end;
$$;

grant execute on function public.ping() to anon;

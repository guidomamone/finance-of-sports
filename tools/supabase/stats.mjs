// Cómo se usa Mi Cuenta, sin entrar al panel de Supabase: llama a stats() (tools/supabase/stats.sql) y a ping() con la clave pública
// de Admin/api-keys/supabase.env. Solo lee: no escribe nada ni en la base ni en el repo.
//   node tools/supabase/stats.mjs
//   node tools/supabase/stats.mjs --json <archivo>   además escribe stats() tal cual en <archivo> (para el dashboard de usuarios y visitas)

import { readFileSync, writeFileSync } from 'node:fs';

const iJson = process.argv.indexOf('--json');
const salidaJson = iJson > 0 ? process.argv[iJson + 1] : null;

const env = Object.fromEntries(
  readFileSync(new URL('../../Admin/api-keys/supabase.env', import.meta.url), 'utf8')
    .split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]),
);

async function rpc(nombre) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/${nombre}`, {
    method: 'POST',
    headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
    body: '{}',
    signal: AbortSignal.timeout(15000),
  });
  const texto = await res.text();
  if (!res.ok) throw new Error(`${nombre}: ${res.status} ${texto.slice(0, 200)}`);
  return JSON.parse(texto);
}

const fecha = (iso) => (iso ? iso.slice(0, 16).replace('T', ' ') + ' UTC' : 'nunca');

let ping;
try {
  ping = await rpc('ping');
} catch (err) {
  console.log(`\nMI CUENTA (Supabase): no contesta (${err.message}).`);
  console.log('  Si el proyecto se pausó: supabase.com → el proyecto → Restore. El ping del Worker fos-supabase-ping debería evitarlo.\n');
  process.exit(1);
}
try {
  const s = await rpc('stats');
  console.log(`\nMI CUENTA (Supabase): proyecto ${ping === 'ok' ? 'prendido' : `contesta raro (${ping})`}`);
  console.log(`  usuarios: ${s.usuarios} · último inicio de sesión: ${fecha(s.ultimo_login)}`);
  console.log(`  búsquedas guardadas: ${s.busquedas} (${s.favoritas} favoritas) · la última: ${fecha(s.ultima_busqueda)}\n`);
  if (salidaJson) writeFileSync(salidaJson, JSON.stringify({ ...s, leido: new Date().toISOString() }, null, 1));
} catch (err) {
  console.log(`\nMI CUENTA (Supabase): el proyecto contesta, pero stats() falló (${err.message.slice(0, 120)}).`);
  console.log('  Si dice 404, falta pegar tools/supabase/stats.sql en el SQL Editor.\n');
  process.exitCode = 1;
}

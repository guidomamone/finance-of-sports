#!/usr/bin/env node
// ============================================================================
// tools/dashboard-usuarios.mjs — los datos del dashboard de usuarios y visitas, el artifact de Claude
// https://claude.ai/artifact/7kPta8U7BxyiGRKAyayHhA. GRATIS: solo lee (Supabase y Cloudflare, con las claves de Admin/api-keys/).
//
// Corre tools/supabase/stats.mjs --json y tools/cloudflare-visitas.mjs --json y parte lo que escriben en un archivo por dataset del
// dashboard, en Generados/dashboard-usuarios/ (no se trackea; netlify.toml borra Generados/ del deploy):
//   mi-cuenta-resumen.json   [{usuarios, busquedas, favoritas, ultimo_login, ultima_busqueda}]     dataset mi_cuenta_resumen
//   mi-cuenta-por-dia.json   [{dia, usuarios_nuevos, busquedas_nuevas}], 180 días                 dataset mi_cuenta_por_dia
//   visitas-por-dia.json     [{dia, visitas, paginas_vistas}], 180 días                           dataset visitas_por_dia
//   visitas-por-pais.json    [{pais, visitas}], últimos 30 días                                   dataset visitas_por_pais
// Además mira el Worker de Cloudflare fos-supabase-ping (llama a ping() cada 3 días para que Supabase no pause el proyecto): cuántas
// corridas tuvo en los últimos 7 días y con cuántos errores. Sin corridas o con errores imprime ALERTA.
//
// PARA ACTUALIZAR EL DASHBOARD, una sesión de Claude: (1) corre esta tool; (2) sube cada archivo como asset del artifact (Artifact,
// `asset: true`); (3) hace `update` de `datasets/<id>` con el `url` nuevo en `source.url`, `source.name` y `updated: {at, by}`.
// Lo hace la tarea programada semanal fos-auditoria-semanal.
//
// USO: node tools/dashboard-usuarios.mjs        sale con 1 si una de las dos tools falló o el Worker está en ALERTA
// ============================================================================
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = resolve(ROOT, 'Generados', 'dashboard-usuarios');
mkdirSync(OUT, { recursive: true });
let falla = false;

function crudo(tool, archivo) {
  const destino = resolve(OUT, archivo);
  try {
    execFileSync(process.execPath, [resolve(ROOT, tool), '--json', destino], { cwd: ROOT, stdio: ['ignore', 'ignore', 'pipe'], timeout: 90_000 });
    return JSON.parse(readFileSync(destino, 'utf8'));
  } catch (e) {
    console.log(`FALLA ${tool}: ${String(e.stderr || e.message).trim().split('\n')[0]}`);
    falla = true;
    return null;
  }
}
const escribir = (nombre, filas) => { writeFileSync(resolve(OUT, nombre), JSON.stringify(filas)); console.log(`  ${nombre}: ${filas.length} filas`); };

const s = crudo('tools/supabase/stats.mjs', '_crudo-supabase.json');
if (s) {
  const { usuarios, busquedas, favoritas, ultimo_login, ultima_busqueda } = s;
  console.log(`Mi Cuenta: ${usuarios} usuarios, ${busquedas} búsquedas guardadas (${favoritas} favoritas)`);
  escribir('mi-cuenta-resumen.json', [{ usuarios, busquedas, favoritas, ultimo_login, ultima_busqueda }]);
  escribir('mi-cuenta-por-dia.json', s.por_dia || []);
}
const c = crudo('tools/cloudflare-visitas.mjs', '_crudo-cloudflare.json');
if (c) {
  const semana = c.por_dia.slice(-7).reduce((t, d) => t + (d.visitas || 0), 0);
  console.log(`Visitas: ${semana} en los últimos 7 días (Cloudflare muestrea de a 10)`);
  escribir('visitas-por-dia.json', c.por_dia);
  escribir('visitas-por-pais.json', c.por_pais);
}

// El Worker fos-supabase-ping, por la API GraphQL de Cloudflare (el mismo token de Web Analytics alcanza: "Account Analytics: Read").
try {
  const env = Object.fromEntries(readFileSync(resolve(ROOT, 'Admin/api-keys/cloudflare.env'), 'utf8')
    .split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]));
  const desde = new Date(Date.now() - 7 * 864e5).toISOString();
  const query = `query($a: String!, $d: Time!) { viewer { accounts(filter: {accountTag: $a}) {
    workersInvocationsAdaptive(limit: 200, filter: {datetime_geq: $d, scriptName: "fos-supabase-ping"}, orderBy: [datetimeHour_ASC]) {
      sum { requests errors } dimensions { datetimeHour status } } } } }`;
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { a: env.CLOUDFLARE_ACCOUNT_ID, d: desde } }),
    signal: AbortSignal.timeout(30000),
  });
  const j = await res.json();
  if (!res.ok || j.errors?.length) throw new Error(`${res.status} ${JSON.stringify(j.errors || j).slice(0, 200)}`);
  const filas = j.data.viewer.accounts[0].workersInvocationsAdaptive;
  const corridas = filas.reduce((t, f) => t + f.sum.requests, 0);
  const errores = filas.reduce((t, f) => t + f.sum.errors, 0);
  const ultima = filas.length ? filas[filas.length - 1].dimensions.datetimeHour.slice(0, 16).replace('T', ' ') + ' UTC' : 'ninguna';
  const alerta = corridas === 0 || errores > 0;
  console.log(`${alerta ? 'ALERTA ' : ''}Worker fos-supabase-ping: ${corridas} corridas en 7 días, ${errores} errores, la última ${ultima}`
    + (alerta ? ' (corre cada 3 días: sin corridas o con errores, Supabase se puede pausar; mirá Cloudflare → fos-supabase-ping → Logs)' : ''));
  if (alerta) falla = true;
} catch (e) {
  console.log(`FALLA Worker fos-supabase-ping: no se pudo leer de Cloudflare (${e.message})`);
  falla = true;
}

console.log(`Archivos en ${OUT.replace(ROOT + '/', '')}/`);
process.exit(falla ? 1 : 0);

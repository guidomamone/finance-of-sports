// ============================================================================
// tools/carpetas-clubes.mjs — la ÚNICA regla de "¿a qué club del sitio corresponde esta carpeta de Clubes/<País>/<Club>/?".
// La usan tools/onboard.mjs (--quien, --dry-run, y con eso inventario-transcripciones.mjs y pipeline.mjs), tools/alta-club.mjs y
// tools/audit.js (que falla con P1 si la regla deja de ser inequívoca).
//
// POR QUÉ EXISTE (2026-09-30): onboard.mjs adivinaba el club comparando el NOMBRE de la carpeta con el nombre de cada club de
// data/clubs.js, por substring y sin mirar el país. Resultado medido:
//   - 17 clubes que YA están en el sitio (Racing, Almagro, Newell's, Botafogo, Gent, U. de Chile...) no se reconocían ("Racing"
//     matchea Racing Club y Genk; "Nacional" matchea Internacional y Atlético Nacional), así que el registro contaba como pendientes
//     PDFs de años ya cargados y daba "205 clubes nuevos" cuando eran 141;
//   - el pipeline, al no reconocer el club, caía a un plan B que leía mal el año (Nacional "2023-24" -> 2023, piloto C).
// Pedido de Guido: "estas cosas no pueden pasar". Por eso la regla vive en UN lugar y audit.js la vigila.
//
// LA REGLA, en orden:
//   1. CITA: algún data/<id>-data.js menciona la carpeta ("Clubes/<País>/<Club>/") como fuente -> ese club. Es un dato escrito por
//      quien cargó el club, no una adivinanza. Si la citan DOS clubes distintos, es ambigua: no se resuelve (y audit.js da P1, salvo
//      las carpetas de agregados que empiezan con "_", como "_J.League", que por diseño alimentan varios clubes).
//   2. NOMBRE, solo dentro del mismo país: el nombre normalizado de la carpeta es IGUAL (no "contiene") al displayName o al name de un
//      club de data/clubs.js cuyo `country` es el del país de la carpeta. El país de cada carpeta de Clubes/ se deduce de las citas del
//      paso 1 (si "Clubes/Argentina/Boca/" la cita un club con country 'AR', "Argentina" es 'AR'); un país sin ningún club cargado no
//      tiene candidatos y todo lo de ahí es club nuevo, que es lo correcto.
//   3. Nada de lo anterior -> club NUEVO (no está en el sitio). No se adivina.
//
// USO:
//   import { clubDeCarpeta } from './carpetas-clubes.mjs';
//   clubDeCarpeta('Argentina', 'Racing')   -> { clubId: 'racing', via: 'cita', fuente: 'data/racing-data.js' }
//   clubDeCarpeta('Portugal', 'Nacional')  -> { clubId: null, via: 'nuevo' }
//   node tools/carpetas-clubes.mjs            imprime el mapa completo y las carpetas ambiguas
//   node tools/carpetas-clubes.mjs --json
// ============================================================================

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

let cache = null;
function cargar() {
  if (cache) return cache;
  const sandbox = { console: { log() {}, warn() {}, error() {} }, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx, { filename: 'data/clubs.js' });
  const clubs = vm.runInContext('clubs', ctx);
  // 1. citas: "<País>/<Club>" -> Set(clubId)
  const citas = {};
  for (const f of readdirSync(resolve(ROOT, 'data')).filter((x) => x.endsWith('-data.js'))) {
    const id = f.replace(/-data\.js$/, '');
    const txt = readFileSync(resolve(ROOT, 'data', f), 'utf8');
    for (const m of txt.matchAll(/Clubes\/([^/\n`'"]+)\/([^/\n`'"]+)\//g)) (citas[`${m[1]}/${m[2]}`] ??= new Set()).add(id);
  }
  // País de cada carpeta de país, deducido de las citas (solo si es inequívoco).
  const paisVotos = {};
  for (const [k, ids] of Object.entries(citas)) {
    const pais = k.split('/')[0];
    for (const id of ids) if (clubs[id]?.country) (paisVotos[pais] ??= new Set()).add(clubs[id].country);
  }
  const iso = {}; for (const [p, s] of Object.entries(paisVotos)) if (s.size === 1) iso[p] = [...s][0];
  cache = { clubs, citas, iso };
  return cache;
}

export function clubDeCarpeta(paisCarpeta, clubCarpeta) {
  const { clubs, citas, iso } = cargar();
  const k = `${paisCarpeta}/${clubCarpeta}`;
  const c = citas[k];
  if (c && c.size === 1) { const id = [...c][0]; return { clubId: id, via: 'cita', fuente: `data/${id}-data.js` }; }
  if (c && c.size > 1) return { clubId: null, via: 'ambigua', ids: [...c], fuente: `la citan ${[...c].map((i) => `data/${i}-data.js`).join(', ')}` };
  const pais = iso[paisCarpeta];
  if (pais) {
    const t = norm(clubCarpeta);
    const m = Object.entries(clubs).filter(([, cl]) => cl.country === pais && [cl.displayName, cl.name].filter(Boolean).some((n) => norm(n) === t)).map(([id]) => id);
    if (m.length === 1) return { clubId: m[0], via: 'nombre', fuente: `nombre igual a un club de ${pais} en data/clubs.js` };
    if (m.length > 1) return { clubId: null, via: 'ambigua', ids: m, fuente: `nombre igual a ${m.length} clubes de ${pais}` };
  }
  return { clubId: null, via: 'nuevo' };
}

// Para una ruta cualquiera debajo de Clubes/ (PDF, .md o carpeta).
export function clubDeRuta(ruta) {
  const m = String(ruta).replace(/\\/g, '/').match(/(?:^|\/)Clubes\/([^/]+)\/([^/]+)/);
  return m ? { pais: m[1], carpeta: m[2], ...clubDeCarpeta(m[1], m[2]) } : { clubId: null, via: 'fuera-de-Clubes' };
}

// Todas las carpetas de Clubes/<País>/<Club>/ con su resolución (para audit.js y el CLI).
export function todasLasCarpetas() {
  const out = [];
  const base = resolve(ROOT, 'Clubes');
  if (!existsSync(base)) return out;
  for (const p of readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const c of readdirSync(resolve(base, p.name), { withFileTypes: true }).filter((d) => d.isDirectory())) out.push({ pais: p.name, carpeta: c.name, ...clubDeCarpeta(p.name, c.name) });
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const todas = todasLasCarpetas();
  // (Versión 438) salir recién cuando terminó de escribir: con process.exit() inmediato, por un pipe se perdía todo lo que pasaba de
  // 64 KB y audit.js daba P1 'carpetas-clubes-fallo' (JSON cortado en 65.536 bytes cuando la lista llegó a ~68 KB, 2026-10-03)
  if (process.argv.includes('--json')) { process.stdout.write(JSON.stringify(todas, null, 1) + '\n', () => process.exit(0)); }
  else {
  const by = {}; for (const t of todas) (by[t.via] ??= []).push(t);
  console.log(`${todas.length} carpetas de club en Clubes/: ${Object.entries(by).map(([k, v]) => `${k} ${v.length}`).join(' · ')}`);
  for (const t of [...(by.ambigua || []), ...(by.nombre || [])]) console.log(`  ${t.via.padEnd(8)} ${t.pais}/${t.carpeta} -> ${t.clubId || t.ids?.join(', ')}  (${t.fuente})`);
}
}

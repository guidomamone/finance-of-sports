// tools/pruebas-de-tool.mjs — QUÉ PRUEBAS CORRESPONDEN A LO QUE CAMBIÓ: de una lista de archivos de tools/ (o tools/hooks/), las pruebas (`probar-*.mjs` y `prueba-escribir.mjs`) que los ejercitan.
// POR QUÉ. `audit.js` pide correr todas las pruebas cada 14 días (`prueba-sin-correr`): una prueba rota por un cambio de hoy aparecía recién cuando vencía el plazo, con varios cambios encima. Con esto
// `cerrar-tool.mjs` corre, antes de medir, las pruebas de lo que tocó la sesión.
// CÓMO. Dos pasos. 1) Lo afectado: los archivos cambiados y, hacia arriba, todos los que los IMPORTAN (directa o indirectamente): cambiar un módulo afecta a las tools que lo usan. 2) Una prueba corresponde
// si es uno de los afectados, si se llama `probar-<archivo>.mjs` con un cambiado, o si NOMBRA entre comillas a uno de los afectados (`'caja-deuda.mjs'`, `'tools/caja-deuda.mjs'`: así llaman las pruebas a las tools
// que corren como comando). La mención no se propaga (una tool que invoca a otra como comando no la hace "importarla"): propagar menciones lleva a que cualquier cambio corra todas las pruebas.
// USO (módulo): import { pruebasDe } from './pruebas-de-tool.mjs'; pruebasDe(['patron.mjs']) → [{ ruta: 'tools/probar-patron.mjs', por: 'patron.mjs' }]    ·  CLI: node tools/pruebas-de-tool.mjs a.mjs b.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const RAIZ = resolve(import.meta.dirname, '..');
const ES_PRUEBA = /^(probar-.+|prueba-escribir)\.mjs$/;
const IMPORTA = /(?:from\s+|import\(\s*|require\(\s*)['"]\.{1,2}\/(?:hooks\/)?([\w.-]+\.(?:mjs|js))['"]/g; // ./x.mjs, ../x.mjs, ../hooks/x.mjs
const MENCIONA = /['"`/]([\w.-]+\.(?:mjs|js))['"`]/g; // 'x.mjs', 'tools/x.mjs', "tools/hooks/x.mjs"

export function pruebasDe(cambiadas, raiz = RAIZ) {
  const rutaDe = {}; // nombre -> ruta relativa (los de tools/hooks no pisan a los de tools/)
  for (const d of ['tools/hooks', 'tools']) { const abs = resolve(raiz, d); if (existsSync(abs)) for (const f of readdirSync(abs)) if (/\.(mjs|js)$/.test(f)) rutaDe[f] = `${d}/${f}`; }
  const importadoPor = {}; const menciona = {}; // nombre -> quiénes lo importan / nombres que un archivo menciona entre comillas
  for (const [f, ruta] of Object.entries(rutaDe)) {
    const txt = readFileSync(resolve(raiz, ruta), 'utf8');
    for (const m of txt.matchAll(IMPORTA)) if (m[1] !== f && rutaDe[m[1]]) (importadoPor[m[1]] ||= new Set()).add(f);
    if (ES_PRUEBA.test(f)) menciona[f] = new Set([...txt.matchAll(MENCIONA)].map((m) => m[1]).filter((n) => n !== f && rutaDe[n]));
  }
  const origen = new Map(); // afectado -> el cambiado del que viene
  const pila = [];
  for (const c of cambiadas) if (rutaDe[c]) { origen.set(c, c); pila.push(c); }
  while (pila.length) { const f = pila.pop(); for (const u of importadoPor[f] || []) if (!origen.has(u)) { origen.set(u, origen.get(f)); pila.push(u); } }
  const out = new Map();
  for (const f of Object.keys(rutaDe)) {
    if (!ES_PRUEBA.test(f) || f === 'probar-todas.mjs') continue;
    const por = origen.get(f) ?? [...(menciona[f] || [])].map((n) => origen.get(n)).find(Boolean) ?? cambiadas.find((c) => f === `probar-${c.replace(/\.(mjs|js)$/, '')}.mjs`);
    if (por) out.set(f, por);
  }
  return [...out].map(([f, por]) => ({ ruta: rutaDe[f], por })).sort((a, b) => a.ruta.localeCompare(b.ruta));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const nombres = process.argv.slice(2).map((a) => a.replace(/^tools\/(hooks\/)?/, ''));
  if (!nombres.length) { console.error('Uso: node tools/pruebas-de-tool.mjs <archivo de tools/> [...]'); process.exit(1); }
  const r = pruebasDe(nombres);
  console.log(r.length ? r.map((x) => `${x.ruta}  (por ${x.por})`).join('\n') : 'ninguna prueba nombra esos archivos');
}

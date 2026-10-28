#!/usr/bin/env node
// ============================================================================
// tools/validar-contexto.mjs — ¿tools/contexto-manual.json tiene la FORMA que espera tools/estadio-sponsor.mjs?
//
// QUÉ. Lee el archivo y dice, una línea por problema (club, año y qué falta o está mal):
//   - que el JSON se pueda leer;
//   - que cada club exista en data/clubs.js y cada año sea de 4 dígitos;
//   - por año, los campos que estén: `estadio`, `marca` y `sponsor` texto no vacío; `capacidad` entero positivo;
//   - `fuente` no vacía cuando hay estadio, capacidad, marca o sponsor (sin fuente estadio-sponsor.mjs no la usa);
//   - `sin-fuente.sponsor`: { legacy: true, texto } o { buscado, por, intentos } con `intentos` no vacío y cada intento con `clase`,
//     `donde` y `resultado` ∈ hallado | sin-dato | inaccesible; `sin-fuente.estadio|capacidad|marca`, el texto de dónde se buscó.
// Solo la forma: si el registro de búsqueda alcanza (tres clases, una ancla) lo dice la compuerta (tools/sponsor-busqueda.js, que no acepta
// «hallado»: un intento que halló el sponsor se escribe como `sponsor`). Un campo ausente no es problema: lo da Wikipedia.
//
// USO: node tools/validar-contexto.mjs [--archivo <ruta>]   (sale con 0 si no hay problemas y con 1 si hay; solo lee)
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const iArch = process.argv.indexOf('--archivo'); // otro archivo con la misma forma (para probar la tool)
const MANUAL = iArch > 0 && process.argv[iArch + 1] ? resolve(process.argv[iArch + 1]) : resolve(ROOT, 'tools', 'contexto-manual.json');
const RESULTADOS = ['hallado', 'sin-dato', 'inaccesible'];
const CAMPOS = new Set(['estadio', 'capacidad', 'sponsor', 'marca', 'fuente', 'fuentes', 'sin-fuente', 'temporada', 'nota']);

if (!existsSync(MANUAL)) { console.error(`no existe ${MANUAL}`); process.exit(1); }
let manual;
try { manual = JSON.parse(readFileSync(MANUAL, 'utf8')); } catch (e) { console.error(`${MANUAL} ilegible: ${e.message}`); process.exit(1); }
// data/clubs.js declara `const clubs = {...}` (como lo leen ejercicios-nuevos.mjs y otras)
const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s);
vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
const CLUBS = vm.runInContext('clubs', ctx);

const problemas = [];
const mal = (club, anio, que) => problemas.push(`${club}${anio ? ` ${anio}` : ''}: ${que}`);
const texto = (v) => typeof v === 'string' && v.trim() !== '';

for (const [club, anios] of Object.entries(manual)) {
  if (club.startsWith('_')) continue;
  if (!CLUBS[club]) mal(club, null, 'el club no está en data/clubs.js');
  if (!anios || typeof anios !== 'object' || Array.isArray(anios)) { mal(club, null, 'no es un objeto { "<año>": {...} }'); continue; }
  for (const [anio, r] of Object.entries(anios)) {
    if (!/^\d{4}$/.test(anio)) mal(club, anio, 'el año no es de 4 dígitos');
    if (!r || typeof r !== 'object' || Array.isArray(r)) { mal(club, anio, 'no es un objeto'); continue; }
    if (!Object.keys(r).length) { mal(club, anio, 'entrada vacía'); continue; }
    for (const k of Object.keys(r)) if (!CAMPOS.has(k)) mal(club, anio, `campo desconocido «${k}» (${[...CAMPOS].join(', ')})`);
    for (const k of ['estadio', 'marca', 'sponsor']) if (k in r && !texto(r[k])) mal(club, anio, `«${k}» vacío o no es texto`);
    if ('capacidad' in r && !(Number.isInteger(r.capacidad) && r.capacidad > 0)) mal(club, anio, `«capacidad» no es un entero positivo (${JSON.stringify(r.capacidad)})`);
    const datos = ['estadio', 'capacidad', 'marca', 'sponsor'].filter((k) => k in r);
    if (datos.length && !texto(r.fuente)) mal(club, anio, `falta «fuente» (hay ${datos.join(', ')})`);
    if ('fuente' in r && !texto(r.fuente)) mal(club, anio, '«fuente» vacía');
    if ('fuentes' in r && (typeof r.fuentes !== 'object' || Array.isArray(r.fuentes) || Object.values(r.fuentes).some((v) => !texto(v)))) mal(club, anio, '«fuentes» no es { campo: url } con textos no vacíos');
    const sf = r['sin-fuente'];
    if (sf === undefined) continue;
    if (!sf || typeof sf !== 'object' || Array.isArray(sf)) { mal(club, anio, '«sin-fuente» no es un objeto { campo: ... }'); continue; }
    for (const [k, v] of Object.entries(sf)) {
      if (k in r) mal(club, anio, `sin-fuente.${k} con «${k}» cargado (uno de los dos sobra)`);
      if (k === 'sponsor') {
        if (!v || typeof v !== 'object' || Array.isArray(v)) { mal(club, anio, 'sin-fuente.sponsor es un texto suelto: hace falta { buscado, por, intentos }'); continue; }
        if (v.legacy === true) { if (!texto(v.texto)) mal(club, anio, 'sin-fuente.sponsor legacy sin «texto»'); continue; }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(v.buscado || ''))) mal(club, anio, 'sin-fuente.sponsor sin «buscado» (AAAA-MM-DD)');
        if (!texto(v.por)) mal(club, anio, 'sin-fuente.sponsor sin «por»');
        if (!Array.isArray(v.intentos) || !v.intentos.length) { mal(club, anio, 'sin-fuente.sponsor sin «intentos»'); continue; }
        v.intentos.forEach((x, i) => {
          if (!x || typeof x !== 'object') { mal(club, anio, `sin-fuente.sponsor intento ${i + 1} no es un objeto`); return; }
          for (const c of ['clase', 'donde']) if (!texto(x[c])) mal(club, anio, `sin-fuente.sponsor intento ${i + 1} sin «${c}»`);
          if (!RESULTADOS.includes(x.resultado)) mal(club, anio, `sin-fuente.sponsor intento ${i + 1}: resultado «${x.resultado}» (${RESULTADOS.join(' | ')})`);
        });
      } else if (['estadio', 'capacidad', 'marca'].includes(k)) { if (!texto(v)) mal(club, anio, `sin-fuente.${k} sin el texto de dónde se buscó`); }
      else mal(club, anio, `sin-fuente.${k}: campo desconocido (estadio, capacidad, sponsor, marca)`);
    }
  }
}

for (const p of problemas) console.log(p);
const nClubes = Object.keys(manual).filter((k) => !k.startsWith('_')).length;
const nombre = relative(ROOT, MANUAL);
console.log(problemas.length ? `\n${problemas.length} problema(s) en ${nombre} (${nClubes} clubes).` : `${nombre}: sin problemas (${nClubes} clubes).`);
process.exit(problemas.length ? 1 : 0);

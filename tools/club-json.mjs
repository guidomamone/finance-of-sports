// ============================================================================
// tools/club-json.mjs — leer y escribir el JSON FUENTE de un club. `data/<país>/<id>.json` es lo que se edita; el
// `data/<país>/<id>-data.js` que carga el sitio se GENERA de ahí cada vez que se escribe (tools/json-datos.mjs, `generarJs`).
//
// USO (las tools que cargan datos):
//   import { leerJsonClub, modificarClub, escribirClub } from './club-json.mjs';
//   modificarClub(id, (c) => { c.datos.revenueLinesByYear[2025] = [...]; c.sources[sid] = {...}; });
//     c = { id, datos, sources, gestiones, miembros } con los NOMBRES de siempre (rawLabel, amountNative, fiscalYearMeta…): se convierte a JSON,
//     se valida contra el esquema (una escritura que no valida no se escribe), se guarda el JSON y se regenera el JS. Devuelve las rutas escritas.
//   leerJsonClub(id)  -> el JSON ya parseado        rutaJson(id)  -> 'data/<país>/<id>.json'
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
import { aJson, deJson, generarJs, validar, categoriasDelSitio, referenciasExternas } from './json-datos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const { rutaData } = require('./data-clubes.js');

export const rutaJson = (id, opts) => rutaData(id, opts).replace(/-data\.js$/, '.json');

// JSON legible y con diffs chicos: lo que entra en una línea de hasta 150 caracteres va en una línea (una fila de ingresos, un renglón de la meta), el resto se abre.
export function serializar(v, sangria = '') {
  const plano = JSON.stringify(v);
  if (plano === undefined) return 'null';
  if (plano.length <= 150 || v === null || typeof v !== 'object') return plano;
  const dentro = sangria + '  ';
  if (Array.isArray(v)) return `[\n${v.map((x) => dentro + serializar(x, dentro)).join(',\n')}\n${sangria}]`;
  return `{\n${Object.entries(v).map(([k, x]) => `${dentro}${JSON.stringify(k)}: ${serializar(x, dentro)}`).join(',\n')}\n${sangria}}`;
}

export function leerJsonClub(id, opts) {
  const f = resolve(ROOT, rutaJson(id, opts));
  if (!existsSync(f)) throw new Error(`${rutaJson(id, opts)}: no existe el JSON del club`);
  return JSON.parse(readFileSync(f, 'utf8'));
}

// Escribe el JSON (ya armado) y regenera el JS. Valida antes: nada se escribe si el esquema no cierra.
export function escribirClub(id, j, opts) {
  const v = validar(j, { categorias: categoriasDelSitio(), externos: referenciasExternas() });
  if (v.errores.length) throw new Error(`${rutaJson(id, opts)}: el JSON no valida contra el esquema:\n  ${v.errores.slice(0, 8).join('\n  ')}`);
  const rj = rutaJson(id, opts); const rd = rutaData(id, opts);
  mkdirSync(dirname(resolve(ROOT, rj)), { recursive: true });
  writeFileSync(resolve(ROOT, rj), serializar(j) + '\n');
  writeFileSync(resolve(ROOT, rd), generarJs(j, { ruta: rj }));
  return [rj, rd];
}

// Devuelve [rutaJson, rutaData]; `.cambio` dice si algo cambió de verdad (si no, no se escribe nada, ni siquiera `exported_at`).
export function modificarClub(id, fn, opts) {
  const j = leerJsonClub(id, opts);
  const c = deJson(j);
  fn(c);
  const igual = aJson(c, { exportadoEn: j.exported_at });
  const rutas = [rutaJson(id, opts), rutaData(id, opts)];
  if (serializar(igual) === serializar(j)) { rutas.cambio = false; return rutas; }
  const w = escribirClub(id, aJson(c, { exportadoEn: new Date().toISOString().slice(0, 10) }), opts);
  w.cambio = true;
  return w;
}

// El esqueleto de un club nuevo (tools/alta-club.mjs): sin ejercicios, con las estructuras vacías. `ficha` es la entrada de data/clubs.js del club
// (id, name, displayName, country, reportingCurrency, fiscalYearStart, sport): el alta la acaba de escribir y esta corrida todavía no la relee.
export function crearClub(id, ficha, opts) {
  const c = { id, datos: { revenueLinesByYear: {}, expenseLinesByYear: {}, fiscalYearMeta: {}, presupuestoOverlayByYear: {}, pasesData: [], resultadosData: {}, titulosData: [] }, sources: {}, gestiones: {}, miembros: { [id]: null } };
  return escribirClub(id, aJson(c, { exportadoEn: new Date().toISOString().slice(0, 10), ficha }), opts);
}

// tools/deporte-club.mjs — el DEPORTE de un club del sitio (de `sport` en data/clubs.js) y las categorías que su taxonomía admite
// (SPORT_TAXONOMIES de data/category-map.js), para que Jev, Claude y las compuertas de carga sepan de qué deporte es el rubro.
// Gemela de tools/pais-club.mjs (el país). Gratis: solo lee archivos de data/. El valor es el id interno del sitio ('futbol', 'rugby'), no el
// del JSON ('football', 'rugby_union'). No decide nada: filtra la lista de categorías y desempata ejemplos.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import vm from 'node:vm';
import { clubDeRuta } from './carpetas-clubes.mjs';

const ROOT = resolve(import.meta.dirname, '..');

let _clubs = null; let _tax = null; let _deportes = null;
function clubs() {
  if (_clubs) return _clubs;
  _clubs = new Map();
  for (const l of readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8').split('\n')) {
    const id = l.match(/\bid:'([^']+)'/); const s = l.match(/\bsport:'([a-z0-9_]+)'/);
    if (id && s) _clubs.set(id[1], s[1]);
  }
  return _clubs;
}
// { id, name, active } de SPORTS en data/leagues.js
export function deportes() {
  if (_deportes) return _deportes;
  const src = readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8');
  const a = src.indexOf('const SPORTS = ['); const bloque = src.slice(a, src.indexOf('];', a));
  _deportes = [...bloque.matchAll(/\{\s*id:'([a-z0-9_]+)'[^}]*?name:'([^']*)'[^}]*?active:(true|false)/g)].map((m) => ({ id: m[1], name: m[2], active: m[3] === 'true' }));
  return _deportes;
}
export const deportesActivos = () => deportes().filter((d) => d.active).map((d) => d.id);
export const nombreDeporte = (id) => (deportes().find((d) => d.id === id)?.name || id).toLowerCase();

// El deporte declarado en la ficha del club (data/clubs.js), o null si el club no está.
export function deporteDeClub(clubId) { return clubs().get(clubId) || null; }
// El deporte que el REGISTRO DE ALTAS (Admin/registros/altas-club.jsonl, lo escribe alta-club.mjs) calculó para la carpeta de un documento: ficha, liga o menciones del .md.
// null si la carpeta no está en el registro, no trae `sport` (nadie lo calculó) o lo dejó en pregunta (`origen: 'pregunta'`, valor null). Nunca se supone fútbol.
let _altas = null;
function altas() {
  if (_altas) return _altas;
  _altas = new Map(); const f = resolve(ROOT, 'Admin', 'registros', 'altas-club.jsonl');
  if (existsSync(f)) for (const l of readFileSync(f, 'utf8').split('\n')) { if (!l.trim()) continue; try { const e = JSON.parse(l); _altas.set(e.carpeta, e); } catch { /* línea rota */ } }
  return _altas;
}
export function deporteDeCarpeta(ruta) {
  if (!ruta) return null;
  const carpeta = String(ruta).split('/').slice(0, 3).join('/') + '/';
  return altas().get(carpeta)?.sport?.valor || null;
}
// El deporte de un documento, SIN default: la ficha del club (data/clubs.js) -> el registro de altas de su carpeta -> null. Quien recibe null se detiene y pide el deporte
// (correr `node tools/alta-club.mjs --todos --solo "<país>/<club>"`, gratis), no categoriza como fútbol.
export function resolverDeporte({ club = null, pdf = null } = {}) { return deporteDeClub(club) || deporteDeCarpeta(pdf) || null; }
// Olvida lo leído de data/clubs.js y del registro de altas: después de correr alta-club en el mismo proceso (lote.mjs), el deporte recién calculado tiene que verse.
export function olvidarDeportes() { _clubs = null; _altas = null; }
// El deporte de un documento por su ruta (Clubes/<País>/<Club>/<archivo>): la ficha del club o el registro de altas. null si nadie lo calculó.
export function deporteDePdf(pdf) { return resolverDeporte({ club: clubDeRuta(pdf).clubId, pdf }); }
// El deporte tal como va en la frase de un prompt de lectura («clubes de fútbol», «el negocio del rugby»): el nombre del deporte, o «deporte» si no se sabe cuál es (nunca se supone fútbol).
export const deporteEnFrase = (deporte) => (deporte ? nombreDeporte(deporte) : 'deporte');
export const MENSAJE_SIN_DEPORTE = (quien) => `${quien} no tiene deporte: ni ficha en data/clubs.js ni deporte en el registro de altas. Correr node tools/alta-club.mjs --todos --solo "<país>/<club>" (gratis)`;

// SPORT_TAXONOMIES de data/category-map.js: { futbol: { version, revenue: {sub: genérica}, expense: {...} }, ... }
function taxonomias() {
  if (_tax) return _tax;
  const ctx = vm.createContext({});
  vm.runInContext(readFileSync(resolve(ROOT, 'data', 'category-map.js'), 'utf8'), ctx, { filename: 'data/category-map.js' });
  _tax = vm.runInContext('SPORT_TAXONOMIES', ctx);
  return _tax;
}
// Los ids de las categorías GENÉRICAS (capa del 248): se pueden nombrar en una frase de regla sin ser subcategorías de un deporte.
export function genericasIds() {
  const ctx = vm.createContext({}); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'category-map.js'), 'utf8'), ctx, { filename: 'data/category-map.js' });
  return new Set(vm.runInContext('[...GENERIC_REVENUE_CATEGORIES, ...GENERIC_EXPENSE_CATEGORIES].map((g) => g.id)', ctx));
}
export function deportesConTaxonomia() { return Object.keys(taxonomias()); }
// Las subcategorías que admite el deporte: { revenue: Set, expense: Set, todas: Set (ingreso + gasto), version } o null si no tiene taxonomía.
// `todas` es la unión: hay ejemplos cargados con una categoría del otro lado (exceptional_items en un ingreso de Racing) que siguen siendo válidos.
const _cats = new Map();
export function categoriasDeDeporte(deporte) {
  if (_cats.has(deporte)) return _cats.get(deporte);
  const t = taxonomias()[deporte]; let r = null;
  if (t) { const revenue = new Set(Object.keys(t.revenue || {})); const expense = new Set(Object.keys(t.expense || {})); r = { revenue, expense, todas: new Set([...revenue, ...expense]), version: t.version }; }
  _cats.set(deporte, r); return r;
}
// Las subcategorías de un deporte CON su rótulo y su comentario (el criterio curado de cada una), leídas de las listas que SPORT_TAXONOMIES[deporte].lists nombra en
// data/category-map.js (REVENUE_CATEGORIES para el fútbol, RUGBY_REVENUE_CATEGORIES para el rugby...): { revenue: { id: { label, desc } }, expense: {...} } en el orden de la
// lista, o null si el deporte no tiene taxonomía. `desc` sin la marca «(Versión N…)». Es el formato que ya leían jev-categorizar.mjs y categorizar-claude.mjs.
const _leidas = new Map();
export function leerCategorias(deporte) {
  if (_leidas.has(deporte)) return _leidas.get(deporte);
  const t = taxonomias()[deporte]; let r = null;
  if (t) {
    const src = readFileSync(resolve(ROOT, 'data', 'category-map.js'), 'utf8');
    const lists = t.lists || { revenue: ['REVENUE_CATEGORIES', 'REVENUE_CATEGORY_LABELS'], expense: ['EXPENSE_CATEGORIES', 'EXPENSE_CATEGORY_LABELS'] };
    const block = (name) => { const a = src.indexOf(`const ${name} = [`); return src.slice(a, src.indexOf('];', a)); };
    const labels = (name) => { const a = src.indexOf(`const ${name} = {`); const b = src.slice(a, src.indexOf('};', a)); return Object.fromEntries([...b.matchAll(/^\s*([a-z_]+):\s*'([^']*)'/gm)].map((m) => [m[1], m[2]])); };
    r = {};
    for (const side of ['revenue', 'expense']) {
      const [arr, lab] = lists[side]; const L = labels(lab); const out = {};
      for (const m of block(arr).matchAll(/^\s*'([a-z_]+)',?\s*(?:\/\/\s*(.*))?$/gm)) out[m[1]] = { label: L[m[1]] || m[1], desc: (m[2] || '').replace(/\(Versión \d+[^)]*\)/g, '').replace(/\s+/g, ' ').trim() };
      for (const k of Object.keys(t[side] || {})) if (!(k in out)) out[k] = { label: L[k] || k, desc: '' }; // en la taxonomía pero no en la lista: va igual
      r[side] = out;
    }
  }
  _leidas.set(deporte, r); return r;
}
// El bolsón «sin desglosar por la fuente» del deporte: { revenue, expense } (ids de subcategoría), o null si el deporte no tiene taxonomía o no declara bolsón.
export function bolsonDeDeporte(deporte) { const l = taxonomias()[deporte]?.lump; return l ? { revenue: l.revenue, expense: l.expense } : null; }
// La subcategoría de gasto de los sueldos del primer equipo (la que la taxonomía mapea a la genérica `first_team_staff`): wages_squad en fútbol, squad_wages en rugby. null si no hay.
export function categoriaDeSueldos(deporte) { const e = taxonomias()[deporte]?.expense; return e ? (Object.keys(e).find((k) => e[k] === 'first_team_staff') || null) : null; }
// 1 = mismo deporte, 0 = otro (o no se sabe). Desempata ejemplos como afinidad() de pais-club.mjs, pero va ANTES que el país.
export function afinidadDeporte(clubA, clubB) {
  const a = deporteDeClub(clubA); const b = deporteDeClub(clubB);
  return a && b && a === b ? 1 : 0;
}

// ---------------------------------------------------------------------------------------------------------
// CEROS POR DEPORTE. UNA tabla de lo que un año no debería tener en 0, por deporte. La leen cargar.mjs (aviso de «categorías en 0» y reintento, preguntas de
// perfil, ajustes cero-real) y verificar.mjs (de qué lado es cada categoría en 0). Antes eran tres listas sueltas (CATS_CERO, el chequeo de tres categorías y LADO_CERO).
//   nombre   como lo nombra el aviso y los ajustes `cero-real`.
//   cats     las subcategorías del deporte que cuentan (si alguna tiene monto, el 0 no es tal).
//   lado     'ingreso' | 'gasto': se revisa SIEMPRE que ese lado no esté sin desglosar (las que no pueden ser 0: el 0 es casi seguro un desglose perdido).
//   perfil   las que dependen de qué es el club: { campo, catsIng, catsGas, pregunta(nombreDelClub) }; si el perfil del club (tools/perfil-clubes.mjs) no dice que lo tiene,
//            el 0 es real y la pregunta va a la cola.
// Una clave por cada deporte con taxonomía: [] es «vacía a propósito» (sin medición de qué da 0 en ese deporte: no se avisa, no se reintenta y no se pregunta el perfil);
// un deporte sin clave es un hallazgo (`node tools/deporte-club.mjs`, que corre audit.js). El fútbol se midió sobre los años cargados (salarios del plantel nunca da 0,
// televisión 2 %, estadio 1 %; cuotas sociales 46 % y otras secciones 63-68 % de ceros reales).
export const CEROS_POR_DEPORTE = {
  futbol: [
    { nombre: 'Salarios del plantel', cats: ['wages_squad'], lado: 'gasto' },
    { nombre: 'Televisión', cats: ['broadcasting'], lado: 'ingreso' },
    { nombre: 'Estadio', cats: ['matchday_competition', 'stadium_other', 'season_tickets'], lado: 'ingreso' },
    { nombre: 'Cuotas sociales', perfil: { campo: 'socios', catsIng: ['member_dues'], catsGas: [], pregunta: (club) => `¿${club} tiene socios que le pagan una cuota (cuotas sociales, mensalidades, sócio-torcedor, membresía)?` } },
    { nombre: 'Otras secciones deportivas', perfil: { campo: 'otrosDeportes', catsIng: ['other_sports', 'youth_football', 'womens_football'], catsGas: ['youth_other_sports_expense'], pregunta: (club) => `¿${club} tiene otros deportes (básquet, vóley, futsal...) con ingresos o gastos en sus estados financieros?` } },
  ],
  rugby: [],
};
// La tabla del deporte, con `cats` completo en cada entrada; null si el deporte no tiene clave.
export function cerosDeDeporte(deporte) {
  const t = CEROS_POR_DEPORTE[deporte]; if (!t) return null;
  return t.map((e) => ({ ...e, cats: e.cats || [...e.perfil.catsIng, ...e.perfil.catsGas] }));
}

// CLI: el chequeo que corre audit.js. Código 1 y líneas «ERROR …» si un deporte activo (o con taxonomía) no tiene taxonomía o no tiene clave en CEROS_POR_DEPORTE.
if (import.meta.url === `file://${process.argv[1]}`) {
  const errores = [];
  for (const d of new Set([...deportesActivos(), ...deportesConTaxonomia(), ...Object.keys(CEROS_POR_DEPORTE)])) {
    const activo = deportesActivos().includes(d);
    if (activo && !categoriasDeDeporte(d)) errores.push(`el deporte activo «${d}» no tiene taxonomía en SPORT_TAXONOMIES (data/category-map.js)`);
    if ((activo || categoriasDeDeporte(d)) && !CEROS_POR_DEPORTE[d]) errores.push(`el deporte «${d}» no tiene clave en CEROS_POR_DEPORTE (tools/deporte-club.mjs): [] si la vacía es a propósito`);
    const t = categoriasDeDeporte(d);
    for (const e of cerosDeDeporte(d) || []) for (const c of e.cats) if (t && !t.todas.has(c)) errores.push(`CEROS_POR_DEPORTE.${d}: «${e.nombre}» nombra «${c}», que no es una subcategoría de ${d}`);
  }
  console.log(`deportes con taxonomía: ${deportesConTaxonomia().join(', ')}; activos: ${deportesActivos().join(', ')}; tablas de ceros: ${Object.keys(CEROS_POR_DEPORTE).join(', ')}`);
  for (const m of errores) console.log(`  ERROR ${m}`);
  process.exit(errores.length ? 1 : 0);
}

// tools/deporte-club.mjs — el DEPORTE de un club del sitio (de `sport` en data/clubs.js) y las categorías que su taxonomía admite
// (SPORT_TAXONOMIES de data/category-map.js), para que Jev, Claude y las compuertas de carga sepan de qué deporte es el rubro (to-do 339).
// Gemela de tools/pais-club.mjs (el país). Gratis: solo lee archivos de data/. El valor es el id interno del sitio ('futbol', 'rugby'), no el
// del JSON ('football', 'rugby_union'). No decide nada: filtra la lista de categorías y desempata ejemplos.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
export const DEPORTE_POR_DEFECTO = 'futbol'; // solo para un club que NO está en data/clubs.js (todavía no tiene ficha); un club con ficha usa la suya

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
// Para quien necesita un deporte sí o sí y el club todavía no tiene ficha (un alta en curso).
export const deporteODefecto = (clubId) => deporteDeClub(clubId) || DEPORTE_POR_DEFECTO;

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
// ¿Esta categoría existe en la taxonomía del deporte del club? Sin taxonomía del deporte, no (nunca se asume que sí).
export function categoriaValidaParaClub(clubId, categoria) {
  const c = categoriasDeDeporte(deporteODefecto(clubId)); return Boolean(c && c.todas.has(categoria));
}
// 1 = mismo deporte, 0 = otro (o no se sabe). Desempata ejemplos como afinidad() de pais-club.mjs, pero va ANTES que el país.
export function afinidadDeporte(clubA, clubB) {
  const a = deporteDeClub(clubA); const b = deporteDeClub(clubB);
  return a && b && a === b ? 1 : 0;
}

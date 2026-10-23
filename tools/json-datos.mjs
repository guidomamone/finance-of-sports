// ============================================================================
// tools/json-datos.mjs — LOS DATOS DE UN CLUB COMO JSON CON ESQUEMA.
// El esquema, con sus dos ejemplos reales y las cuatro decisiones: Admin/mediciones/245-esquema.md.
//
// La biblioteca de los datos de un club: el JSON `data/<país>/<id>.json` es la FUENTE y `data/<país>/<id>-data.js` se GENERA de ahí
// (`generarJs`); el sitio sigue cargando el JS. Las herramientas que la usan:
//   node tools/generar-data.mjs        JSON -> JS de todos los clubes (o --club; --check avisa si algún JS quedó viejo)
//   node tools/validar-esquema-json.mjs  valida los JSON contra el esquema
//   node tools/ida-y-vuelta.mjs        JSON -> JS (generarJs) -> se evalúa y se compara con el JS que está en disco, objeto por objeto
//   node tools/exportar-json.mjs       JS -> JSON: la migración de una sola vez (fase 2); ya no es el camino de trabajo
// Las tools que cargan datos (cargar, caja-deuda, dentro-de-otro, alta-club) leen y escriben el JSON con `leerJsonClub`/`modificarClub` de tools/club-json.mjs.
//
// QUÉ CONTIENE UN data/<país>/<id>-data.js (medido en los 313): revenueLinesByYear, expenseLinesByYear, fiscalYearMeta, presupuestoOverlayByYear,
// pasesData, resultadosData, titulosData, window.CLUB_GENERIC_DATA[id], `sources` (las fuentes del club), gestionesByClub[id] (a veces),
// memberCountByClub[id] (casi siempre) y, en 5 clubes, presupuestoSupuestos/Financiero/InversionesByYear y finanzasYears/finanzasGestiones.
// El nombre de cada campo pasa a inglés y snake_case con el diccionario fijo de abajo (un solo lugar, de ida y de vuelta). Lo editorial de 3 clubes
// (resultadosData, titulosData, finanzas*) y los supuestos del presupuesto de 5 se copian sin traducir sus claves internas (`legacy_extras`).
// Una clave que el diccionario no conoce es un error (nunca se descarta ni se adivina): el exportador lo dice y la ida y vuelta lo mide.
// ============================================================================
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { archivosData } from './data-clubes.js';

const ROOT = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const { cierreEjercicio } = require('./cierre-ejercicio.js');

export const SCHEMA_VERSION = '2.0';
// (el diccionario completo vive acá abajo; el generador del JSON Schema, tools/generar-schema-json.mjs, lee estas listas para no duplicarlas)
export const UNIT = { scale: 1000000, label: 'millions of currency' };
// Valores de `disclosure` que usan hoy las líneas de los 313 clubes (lista cerrada, igual que las categorías: un valor nuevo se agrega acá y en el schema a propósito).
export const DISCLOSURE = ['aggregate', 'aggregated', 'aggregated_residual', 'detailed', 'estimated', 'lump', 'not_disclosed', 'partial', 'summary'];

// ---------------------------------------------------------------- diccionario (campo de hoy <-> campo del JSON)
// to-do 248 (esquema 2.0): la categoría de cada línea es la SUBCATEGORÍA del deporte (`subcategory`, la que eligen el pipeline y la cola); `category`
// es la genérica, que no viene del data file: la deriva aJson de data/category-map.js (genericCategoryOf) y validar exige que el par coincida.
const LINEA = { rawLabel: 'label', normalizedCategory: 'subcategory', amountNative: 'amount', disclosureLevel: 'disclosure', items: 'items' };
const FUENTE = { id: 'id', clubId: 'club_id', title: 'title', type: 'type', reliability: 'reliability', url: 'url', publicNote: 'public_note' };
const GESTION = { nombre: 'name', firstYear: 'first_year', lastYear: 'last_year' };
const SIN_DESGLOSE = { renglon: 'line', lado: 'side', importe: 'amount', motivo: 'reason' };
const INCLUIDO = { en: 'in', posible: 'possible', por: 'by' };
const FINANCIERO = { profitOnPlayerSales: 'profit_on_player_sales', assetSales: 'asset_sales', netInterest: 'net_interest', tax: 'tax', grossDebt: 'gross_debt', cash: 'cash', staffCost: 'staff_cost' };
const TOTALES = { officialTotalRevenue: 'revenue', officialTotalExpenses: 'expenses', officialPAT: 'net_result' };
const FX = { fxRef: 'ref', fx: 'rate', fxSource: 'source' };
const META_DIRECTA = { currency: 'currency', sourceId: 'source_id', reportType: 'report_type', gestionId: 'management_id' };
const META_ADJ = { extraRows: 'extra_rows', sinDesglose: 'no_breakdown', incluidoEn: 'included_in' };
const OVERLAY = { currency: 'currency', sourceId: 'source_id', revenueLines: 'revenue', expenseLines: 'expenses' };
// Lo editorial de pocos clubes (extras del JSON): el nombre del bloque y de cada clave pasa a inglés; los textos quedan en español.
const EXTRAS = { presupuestoSupuestosByYear: 'budget_assumptions', presupuestoFinancieroByYear: 'budget_financial', presupuestoInversionesByYear: 'budget_investments', finanzasYears: 'finance_years', finanzasGestiones: 'finance_managements' };
// Claves de los bloques de texto libre (resultados, títulos y extras): un solo diccionario, de ida y de vuelta. Una clave que no está queda como está
// (los apellidos de las gestiones de `results` son datos, no claves del esquema).
const CLAVES_LIBRES = { titulosLocales: 'local_titles', titulosInternacionales: 'international_titles', mejorResultadoLibertadores: 'best_libertadores_result', anio: 'year', competencia: 'competition', resultado: 'result', gestion: 'management', docLabel: 'doc_label', isResult: 'is_result', formato: 'format' };
const CLUB = { id: 'id', name: 'name', displayName: 'display_name', country: 'country', reportingCurrency: 'reporting_currency', fiscalYearStart: 'fiscal_year_start', sport: 'sport', predecessorId: 'predecessor_id' };
// El deporte: id interno del sitio (data/leagues.js, SPORTS) -> valor del JSON, en inglés. `club.taxonomy` es la versión del mapa de ese deporte.
const DEPORTE = { futbol: 'football', basquet: 'basketball', rugby: 'rugby_union', nfl: 'american_football', f1: 'formula_1', tenis: 'tennis', cricket: 'cricket', otro: 'other' };

const inv = (d) => Object.fromEntries(Object.entries(d).map(([a, b]) => [b, a]));
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
class ErrorDeEsquema extends Error {}
const falla = (m) => { throw new ErrorDeEsquema(m); };

// traduce un objeto con un diccionario; una clave que no está es un error
function mapear(o, dic, donde) {
  const out = {};
  for (const [k, v] of Object.entries(o)) { if (!has(dic, k)) falla(`${donde}: clave desconocida "${k}"`); out[dic[k]] = v; }
  return out;
}
// una línea al JSON: la genérica va antes de la subcategoría. Sin genérica (subcategoría que el deporte no tiene) es un error.
const linea = (l, donde, lado, deporte) => {
  const m = mapear(l, LINEA, donde); const tax = taxonomia(); const out = {};
  const gen = has(m, 'subcategory') ? tax.genericCategoryOf(deporte, lado, m.subcategory) : null;
  if (has(m, 'subcategory') && !gen) falla(`${donde}: la subcategoría "${m.subcategory}" no tiene genérica en data/category-map.js (deporte ${deporte})`);
  for (const [k, v] of Object.entries(m)) { if (k === 'subcategory') out.category = gen; out[k] = v; }
  return out;
};
const sinTraducir = (v) => JSON.parse(JSON.stringify(v));
// traduce las CLAVES de un valor libre (recursivo) con un diccionario; los valores no se tocan
const traducirClaves = (v, dic) => Array.isArray(v) ? v.map((x) => traducirClaves(x, dic)) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [has(dic, k) ? dic[k] : k, traducirClaves(x, dic)])) : v;

// ---------------------------------------------------------------- leer los datos actuales
let _sitio = null;
function sitio() {
  if (_sitio) return _sitio;
  const sb = { console, window: {} }; sb.window.window = sb.window; const ctx = vm.createContext(sb);
  for (const rel of ['data/clubs.js']) vm.runInContext(readFileSync(resolve(ROOT, rel), 'utf8'), ctx, { filename: rel });
  _sitio = { clubs: vm.runInContext('clubs', ctx) };
  return _sitio;
}
export function clubes() { return sitio().clubs; }

// data/category-map.js: subcategorías, genéricas y el mapa por deporte. Una sola lectura por proceso.
let _tax = null;
export function taxonomia() {
  if (_tax) return _tax;
  const ctx = vm.createContext({ window: {} }); vm.runInContext(readFileSync(resolve(ROOT, 'data/category-map.js'), 'utf8'), ctx, { filename: 'data/category-map.js' });
  _tax = vm.runInContext('({ revenue: REVENUE_CATEGORIES, expense: EXPENSE_CATEGORIES, genericas: { revenue: GENERIC_REVENUE_CATEGORIES, expense: GENERIC_EXPENSE_CATEGORIES }, deportes: SPORT_TAXONOMIES, genericCategoryOf })', ctx);
  return _tax;
}

// Las subcategorías de UN deporte, para las tools que categorizan (Jev, Claude, la cola): { version, lump: { revenue, expense }, revenue: { <sub>: { label,
// description, generic } }, expense: { ... } }. `description` es el comentario de la subcategoría en data/category-map.js (la primera oración, como la
// leía jev-categorizar.mjs); `deporte` es el id interno ('futbol', 'rugby'), el de data/clubs.js. null si el deporte no tiene taxonomía.
export function categoriasDeDeporte(deporte) {
  const t = taxonomia().deportes[deporte || 'futbol']; if (!t) return null;
  const src = readFileSync(resolve(ROOT, 'data/category-map.js'), 'utf8');
  const bloque = (nombre, abre, cierra) => { const a = src.indexOf(`const ${nombre} = ${abre}`); if (a < 0) falla(`data/category-map.js: falta ${nombre}`); return src.slice(a, src.indexOf(cierra, a)); };
  const lado = (l) => {
    const [lista, rotulos] = t.lists[l];
    const lab = Object.fromEntries([...bloque(rotulos, '{', '};').matchAll(/^\s*([a-z_]+):\s*'([^']*)'/gm)].map((m) => [m[1], m[2]]));
    const out = {};
    for (const m of bloque(lista, '[', '];').matchAll(/^\s*'([a-z_]+)',?\s*(?:\/\/\s*(.*))?$/gm)) {
      const c = (m[2] || '').replace(/\s+/g, ' ').trim();
      out[m[1]] = { label: lab[m[1]] || m[1], description: c.split(/(?<=[.!?])\s/)[0].slice(0, 220), generic: t[l][m[1]] || null };
    }
    return out;
  };
  return { version: t.version, lump: { ...t.lump }, revenue: lado('revenue'), expense: lado('expense') };
}

// Corre UN data file en un entorno limpio (sources, gestionesByClub y memberCountByClub vacíos) y devuelve lo que ese archivo define.
export function leerClub(rel) {
  const sb = { console, window: {}, sources: {}, gestionesByClub: {}, memberCountByClub: {} }; sb.window.window = sb.window; const ctx = vm.createContext(sb);
  vm.runInContext(readFileSync(resolve(ROOT, rel), 'utf8'), ctx, { filename: rel });
  const ids = Object.keys(sb.window.CLUB_GENERIC_DATA);
  if (ids.length !== 1) falla(`${rel}: define ${ids.length} clubes, se esperaba 1`);
  const id = ids[0];
  return { id, rel, datos: sb.window.CLUB_GENERIC_DATA[id], sources: sb.sources, gestiones: sb.gestionesByClub, miembros: sb.memberCountByClub };
}
export const todosLosArchivos = () => archivosData();

// El bloque `club` del JSON desde la ficha de data/clubs.js: los nombres en inglés, el deporte con su nombre del JSON y `taxonomy`, la versión del mapa
// de ese deporte. Lo usan aJson y tools/generar-data.mjs (--identidad y --check), para que no haya dos copias de esta traducción.
export function clubDeFicha(id, ficha) {
  const club = ficha ? Object.fromEntries(Object.entries(CLUB).filter(([k]) => has(ficha, k)).map(([k, n]) => [n, ficha[k]])) : { id };
  const deporte = (ficha && ficha.sport) || 'futbol';
  if (!has(DEPORTE, deporte)) falla(`${id}: deporte "${deporte}" sin nombre en el JSON (DEPORTE de tools/json-datos.mjs)`);
  if (!taxonomia().deportes[deporte]) falla(`${id}: el deporte "${deporte}" no tiene taxonomía en data/category-map.js (SPORT_TAXONOMIES)`);
  if (has(club, 'sport')) club.sport = DEPORTE[deporte];
  club.taxonomy = taxonomia().deportes[deporte].version;
  return club;
}

// ---------------------------------------------------------------- JS actual -> JSON
export function aJson(c, { exportadoEn = new Date().toISOString().slice(0, 10), ficha: fichaDada = null } = {}) {
  const { id, datos: d } = c; const ficha = fichaDada || clubes()[id] || null;
  for (const k of Object.keys(d)) if (!['revenueLinesByYear', 'expenseLinesByYear', 'fiscalYearMeta', 'presupuestoOverlayByYear', 'pasesData', 'resultadosData', 'titulosData', ...Object.keys(EXTRAS)].includes(k)) falla(`${id}: CLUB_GENERIC_DATA trae "${k}", que el esquema no conoce`);
  const j = { schema_version: SCHEMA_VERSION, exported_at: exportadoEn, unit: { ...UNIT } };
  j.club = clubDeFicha(id, ficha);
  const deporte = (ficha && ficha.sport) || 'futbol';
  j.sources = Object.entries(c.sources).map(([sid, s]) => { if (s.id !== sid) falla(`${id}: la fuente "${sid}" tiene id "${s.id}"`); return mapear(s, FUENTE, `${id} fuente ${sid}`); });
  if (has(c.gestiones, id)) j.management = Object.entries(c.gestiones[id]).map(([gid, g]) => ({ id: gid, ...mapear(g, GESTION, `${id} gestión ${gid}`) }));
  if (has(c.miembros, id)) j.members = c.miembros[id];
  const anios = new Set([...Object.keys(d.revenueLinesByYear), ...Object.keys(d.expenseLinesByYear), ...Object.keys(d.fiscalYearMeta)].map(Number));
  j.years = [...anios].sort((a, b) => a - b).map((y) => {
    const o = { fiscal_year: y }; const m = d.fiscalYearMeta[y];
    o.period_end = cierreEjercicio(m, ficha, y);
    // period_months (opcional, aditivo): solo en un ejercicio que no es de 12 meses y se cargó como año (tramo corto de transición sin hueco,
    // Admin/CONVENCIONES-DATOS.md). Sin el campo, el ejercicio es de 12 meses. Uno de menos de 12 queda fuera del ranking por año, la mediana y las variaciones.
    if (m && has(m, 'periodMonths')) o.period_months = m.periodMonths;
    if (m) {
      for (const k of Object.keys(m)) if (k !== 'periodMonths' && !has(META_DIRECTA, k) && !has(FINANCIERO, k) && !has(TOTALES, k) && !has(FX, k) && !has(META_ADJ, k)) falla(`${id} ${y}: fiscalYearMeta trae "${k}", que el esquema no conoce`);
      for (const [k, n] of Object.entries(META_DIRECTA)) if (has(m, k)) o[n] = m[k];
      const fx = {}; for (const [k, n] of Object.entries(FX)) if (has(m, k)) fx[n] = m[k]; if (Object.keys(fx).length) o.fx = fx;
    }
    if (has(d.revenueLinesByYear, y)) o.revenue = d.revenueLinesByYear[y].map((l, i) => linea(l, `${id} ${y} ingresos[${i}]`, 'revenue', deporte));
    if (has(d.expenseLinesByYear, y)) o.expenses = d.expenseLinesByYear[y].map((l, i) => linea(l, `${id} ${y} gastos[${i}]`, 'expense', deporte));
    if (m) {
      const fin = {}; for (const [k, n] of Object.entries(FINANCIERO)) if (has(m, k)) fin[n] = m[k]; if (Object.keys(fin).length) o.financial = fin;
      const tot = {}; for (const [k, n] of Object.entries(TOTALES)) if (has(m, k)) tot[n] = m[k]; if (Object.keys(tot).length) o.official_totals = tot;
      const adj = {};
      if (has(m, 'extraRows')) adj.extra_rows = m.extraRows.map((r, i) => mapear(r, { label: 'label', value: 'amount' }, `${id} ${y} extraRows[${i}]`));
      if (has(m, 'sinDesglose')) adj.no_breakdown = m.sinDesglose.map((r, i) => mapear(r, SIN_DESGLOSE, `${id} ${y} sinDesglose[${i}]`));
      if (has(m, 'incluidoEn')) adj.included_in = Object.fromEntries(Object.entries(m.incluidoEn).map(([cat, v]) => [cat, v !== null && typeof v === 'object' ? mapear(v, INCLUIDO, `${id} ${y} incluidoEn.${cat}`) : v]));
      if (Object.keys(adj).length) o.adjustments = adj;
    }
    return o;
  });
  if (has(d, 'presupuestoOverlayByYear')) j.budget_overlay = Object.fromEntries(Object.entries(d.presupuestoOverlayByYear).map(([y, ov]) => {
    const o = {}; for (const [k, v] of Object.entries(ov)) {
      if (has(OVERLAY, k)) o[OVERLAY[k]] = k === 'revenueLines' || k === 'expenseLines' ? v.map((l, i) => linea(l, `${id} presupuesto ${y} ${k}[${i}]`, k === 'revenueLines' ? 'revenue' : 'expense', deporte)) : v;
      else if (has(FX, k)) (o.fx ||= {})[FX[k]] = v; else falla(`${id} presupuesto ${y}: clave desconocida "${k}"`);
    } return [y, o];
  }));
  const libre = (x) => traducirClaves(sinTraducir(x), CLAVES_LIBRES);
  j.squad_transfers = libre(d.pasesData); j.results = libre(d.resultadosData); j.titles = libre(d.titulosData);
  const ex = Object.fromEntries(Object.entries(EXTRAS).filter(([k]) => has(d, k)).map(([k, n]) => [n, libre(d[k])])); if (Object.keys(ex).length) j.extras = ex;
  // nada de lo que el JSON guarda puede perderse al serializar (NaN, Infinity y undefined se vuelven null o desaparecen)
  const malo = buscarNoSerializable(j, ''); if (malo) falla(`${id}: valor no serializable en ${malo}`);
  return j;
}
function buscarNoSerializable(v, ruta) {
  if (typeof v === 'number') return Number.isFinite(v) && !Object.is(v, -0) ? null : ruta + ` (${Object.is(v, -0) ? '-0' : v})`;
  if (v === undefined || typeof v === 'function' || typeof v === 'symbol' || typeof v === 'bigint') return ruta + ` (${typeof v})`;
  if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { const r = buscarNoSerializable(x, `${ruta}/${k}`); if (r) return r; }
  return null;
}

// ---------------------------------------------------------------- JSON -> objetos de hoy (la vuelta)
export function deJson(j) {
  const id = j.club.id; const d = {}; const s = {};
  d.revenueLinesByYear = {}; d.expenseLinesByYear = {}; d.fiscalYearMeta = {};
  const rev = inv(LINEA);
  const lin = (l) => Object.fromEntries(Object.entries(l).filter(([k]) => k !== 'category').map(([k, v]) => [rev[k], v]));   // la genérica no va al data file
  for (const y of j.years) {
    if (has(y, 'revenue')) d.revenueLinesByYear[y.fiscal_year] = y.revenue.map(lin);
    if (has(y, 'expenses')) d.expenseLinesByYear[y.fiscal_year] = y.expenses.map(lin);
    const hay = ['period_months', 'currency', 'source_id', 'report_type', 'management_id', 'fx', 'financial', 'official_totals', 'adjustments'].some((k) => has(y, k));
    if (!hay) continue;
    const m = {};
    if (has(y, 'period_months')) m.periodMonths = y.period_months;
    for (const [k, n] of Object.entries(META_DIRECTA)) if (has(y, n)) m[k] = y[n];
    if (y.fx) for (const [k, n] of Object.entries(FX)) if (has(y.fx, n)) m[k] = y.fx[n];
    if (y.financial) for (const [k, n] of Object.entries(FINANCIERO)) if (has(y.financial, n)) m[k] = y.financial[n];
    if (y.official_totals) for (const [k, n] of Object.entries(TOTALES)) if (has(y.official_totals, n)) m[k] = y.official_totals[n];
    if (y.adjustments) {
      const a = y.adjustments;
      if (a.extra_rows) m.extraRows = a.extra_rows.map((r) => ({ label: r.label, value: r.amount }));
      if (a.no_breakdown) m.sinDesglose = a.no_breakdown.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [inv(SIN_DESGLOSE)[k], v])));
      if (a.included_in) m.incluidoEn = Object.fromEntries(Object.entries(a.included_in).map(([cat, v]) => [cat, v !== null && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [inv(INCLUIDO)[k], x])) : v]));
    }
    d.fiscalYearMeta[y.fiscal_year] = m;
  }
  if (has(j, 'budget_overlay')) d.presupuestoOverlayByYear = Object.fromEntries(Object.entries(j.budget_overlay).map(([y, ov]) => {
    const o = {}; for (const [k, v] of Object.entries(ov)) { if (k === 'fx') for (const [a, b] of Object.entries(FX)) { if (has(v, b)) o[a] = v[b]; } else { const kk = inv(OVERLAY)[k]; o[kk] = Array.isArray(v) && (k === 'revenue' || k === 'expenses') ? v.map(lin) : v; } } return [y, o];
  }));
  const libre = (x) => traducirClaves(x, inv(CLAVES_LIBRES));
  if (has(j, 'squad_transfers')) d.pasesData = libre(j.squad_transfers); if (has(j, 'results')) d.resultadosData = libre(j.results); if (has(j, 'titles')) d.titulosData = libre(j.titles);
  if (j.extras) for (const [n, v] of Object.entries(j.extras)) d[inv(EXTRAS)[n]] = libre(v);
  for (const f of j.sources) s[f.id] = Object.fromEntries(Object.entries(f).map(([k, v]) => [inv(FUENTE)[k], v]));
  const gestiones = j.management ? { [id]: Object.fromEntries(j.management.map((g) => [g.id, Object.fromEntries(Object.entries(g).filter(([k]) => k !== 'id').map(([k, v]) => [inv(GESTION)[k], v]))])) } : {};
  const miembros = has(j, 'members') ? { [id]: j.members } : {};
  return { id, datos: d, sources: s, gestiones, miembros };
}

// ---------------------------------------------------------------- JSON -> texto de un data file (prototipo de la fase 2)
const ident = (id) => id.replace(/-([a-z0-9])/g, (m, c) => c.toUpperCase()).replace(/[^A-Za-z0-9_]/g, '');
const js = (v) => JSON.stringify(v);
export function generarJs(j, { ruta = null } = {}) {
  const c = deJson(j); const p = ident(c.id); const d = c.datos;
  const porAnio = (o) => `{\n${Object.entries(o).map(([y, arr]) => `  ${y}: ${Array.isArray(arr) ? `[\n${arr.map((l) => `    ${js(l)},`).join('\n')}\n  ]` : js(arr)},`).join('\n')}\n}`;
  let t = `// GENERADO desde ${ruta || `data/<país>/${c.id}.json`} por tools/generar-data.mjs: no editar a mano (se edita el JSON).\n`;
  t += `const ${p}RevenueLinesByYear = ${porAnio(d.revenueLinesByYear)};\n\nconst ${p}ExpenseLinesByYear = ${porAnio(d.expenseLinesByYear)};\n\n`;
  t += `const ${p}FiscalYearMeta = {\n${Object.entries(d.fiscalYearMeta).map(([y, m]) => `  ${y}: ${js(m)},`).join('\n')}\n};\n\n`;
  if (has(d, 'presupuestoOverlayByYear')) t += `const ${p}PresupuestoOverlayByYear = ${js(d.presupuestoOverlayByYear)};\n\n`;
  t += `const ${p}PasesData = ${js(d.pasesData)};\nconst ${p}ResultadosData = ${js(d.resultadosData)};\nconst ${p}TitulosData = ${js(d.titulosData)};\n\n`;
  t += `window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};\nwindow.CLUB_GENERIC_DATA[${js(c.id)}] = {\n  revenueLinesByYear: ${p}RevenueLinesByYear, expenseLinesByYear: ${p}ExpenseLinesByYear,\n  fiscalYearMeta: ${p}FiscalYearMeta, pasesData: ${p}PasesData,\n  resultadosData: ${p}ResultadosData, titulosData: ${p}TitulosData,\n`;
  if (has(d, 'presupuestoOverlayByYear')) t += `  presupuestoOverlayByYear: ${p}PresupuestoOverlayByYear,\n`;
  for (const k of Object.keys(EXTRAS)) if (has(d, k)) t += `  ${k}: ${js(d[k])},\n`;
  t += `};\n\nObject.assign(sources, ${js(c.sources)});\n`;
  if (Object.keys(c.gestiones).length) t += `\ngestionesByClub[${js(c.id)}] = ${js(c.gestiones[c.id])};\n`;
  if (Object.keys(c.miembros).length) t += `\nmemberCountByClub[${js(c.id)}] = ${js(c.miembros[c.id])};\n`;
  return t;
}
// El texto generado se evalúa en un entorno limpio, igual que leerClub, y devuelve lo mismo que leerClub.
export function evaluarJs(texto, id) {
  const sb = { console, window: {}, sources: {}, gestionesByClub: {}, memberCountByClub: {} }; sb.window.window = sb.window; const ctx = vm.createContext(sb);
  vm.runInContext(texto, ctx, { filename: `generado:${id}` });
  return { id, datos: sb.window.CLUB_GENERIC_DATA[id], sources: sb.sources, gestiones: sb.gestionesByClub, miembros: sb.memberCountByClub };
}

// ---------------------------------------------------------------- comparar dos clubes leídos (estricto: -0, null y ausente se distinguen; el orden de las claves no cuenta)
function canon(v) {
  if (v === undefined) return '"__undefined__"';
  if (typeof v === 'number') return Object.is(v, -0) ? '"__-0__"' : String(v);
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(canon).join(',')}]`;
  return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${canon(v[k])}`).join(',')}}`;
}
export function diferencias(a, b) {
  const out = []; const ra = { datos: a.datos, sources: a.sources, gestiones: a.gestiones, miembros: a.miembros }; const rb = { datos: b.datos, sources: b.sources, gestiones: b.gestiones, miembros: b.miembros };
  (function rec(x, y, ruta) {
    if (canon(x) === canon(y)) return;
    const objs = x && y && typeof x === 'object' && typeof y === 'object' && Array.isArray(x) === Array.isArray(y);
    if (!objs) { out.push({ ruta, antes: canon(x).slice(0, 120), despues: canon(y).slice(0, 120) }); return; }
    const ks = new Set([...Object.keys(x), ...Object.keys(y)]);
    for (const k of ks) rec(x[k], y[k], `${ruta}/${k}`);
  })(ra, rb, '');
  return out;
}

// ---------------------------------------------------------------- el validador del esquema
const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;
const ES_NUM = (x) => typeof x === 'number' && Number.isFinite(x);
const itemsOk = (a) => Array.isArray(a) && a.every((x) => Array.isArray(x) && (x.length === 2 || x.length === 3) && typeof x[0] === 'string' && ES_NUM(x[1]) && (x.length === 2 || itemsOk(x[2])));
export function validar(j, { categorias = null, externos = null } = {}) {
  const e = []; const avisos = []; const err = (r, m) => e.push(`${r}: ${m}`); const aviso = (r, m) => avisos.push(`${r}: ${m}`);
  const claves = (o, permitidas, r, obligatorias = []) => { if (!o || typeof o !== 'object' || Array.isArray(o)) { err(r, 'tiene que ser un objeto'); return false; } for (const k of Object.keys(o)) if (!permitidas.includes(k)) err(r, `clave "${k}" que el esquema no conoce`); for (const k of obligatorias) if (!has(o, k)) err(r, `falta "${k}"`); return true; };
  if (!claves(j, ['schema_version', 'exported_at', 'unit', 'club', 'sources', 'management', 'members', 'years', 'budget_overlay', 'squad_transfers', 'results', 'titles', 'extras'], '', ['schema_version', 'exported_at', 'unit', 'club', 'sources', 'years'])) return { errores: e, avisos };
  if (j.schema_version !== SCHEMA_VERSION) err('schema_version', `vale ${j.schema_version}, se esperaba ${SCHEMA_VERSION}`);
  if (!FECHA_RE.test(j.exported_at || '')) err('exported_at', 'tiene que ser AAAA-MM-DD');
  if (claves(j.unit, ['scale', 'label'], 'unit', ['scale', 'label']) && j.unit.scale !== UNIT.scale) err('unit.scale', `vale ${j.unit.scale}, se esperaba ${UNIT.scale}`);
  if (claves(j.club, [...Object.values(CLUB), 'taxonomy'], 'club', ['id', 'taxonomy'])) { if (!/^[a-z0-9][a-z0-9-]*$/.test(j.club.id || '')) err('club.id', 'id con formato raro'); if (has(j.club, 'country') && !/^[A-Z]{2}$/.test(j.club.country)) err('club.country', 'tiene que ser un código de 2 letras en mayúsculas'); if (has(j.club, 'reporting_currency') && !/^[A-Z]{3}$/.test(j.club.reporting_currency)) err('club.reporting_currency', 'ISO 4217'); }
  const fuentes = new Set(); (Array.isArray(j.sources) ? j.sources : (err('sources', 'tiene que ser una lista'), [])).forEach((s, i) => { const r = `sources[${i}]`; if (!claves(s, Object.values(FUENTE), r, ['id', 'club_id', 'title', 'type', 'reliability'])) return; if (fuentes.has(s.id)) err(r, `id repetido ${s.id}`); fuentes.add(s.id); for (const k of ['id', 'title', 'type', 'reliability']) if (typeof s[k] !== 'string' || !s[k]) err(r, `"${k}" tiene que ser un texto`); });
  const gest = new Set(); if (has(j, 'management')) (Array.isArray(j.management) ? j.management : []).forEach((g, i) => { const r = `management[${i}]`; claves(g, ['id', ...Object.values(GESTION)], r, ['id', 'name', 'first_year', 'last_year']); gest.add(g.id); });
  if (has(j, 'members') && j.members !== null && !ES_NUM(j.members)) err('members', 'número o null');
  // el deporte del club (valor del JSON -> id interno) y su taxonomía: club.taxonomy tiene que ser la versión vigente del mapa
  const deporte = (j.club && has(j.club, 'sport')) ? inv(DEPORTE)[j.club.sport] : 'futbol';
  if (j.club && has(j.club, 'sport') && !deporte) err('club.sport', `deporte "${j.club.sport}" desconocido (${Object.values(DEPORTE).join(', ')})`);
  if (categorias && categorias.deportes && deporte) { const t = categorias.deportes[deporte]; if (!t) err('club.sport', `el deporte "${j.club.sport}" no tiene taxonomía en data/category-map.js`); else if (j.club && j.club.taxonomy !== t.version) err('club.taxonomy', `vale "${j.club.taxonomy}", la vigente es "${t.version}" (se corre tools/migrar-v2.mjs)`); }
  const lineas = (arr, r, lado) => { if (!Array.isArray(arr)) return err(r, 'tiene que ser una lista'); arr.forEach((l, i) => { const rr = `${r}[${i}]`; if (!claves(l, ['category', ...Object.values(LINEA)], rr, ['label', 'category', 'subcategory', 'amount'])) return; if (typeof l.label !== 'string') err(rr, 'label tiene que ser un texto'); if (has(l, 'disclosure') && !DISCLOSURE.includes(l.disclosure)) err(rr, `disclosure "${l.disclosure}" desconocido`); if (!ES_NUM(l.amount)) err(rr, 'amount tiene que ser un número finito'); const tDep = categorias && categorias.deportes && deporte ? categorias.deportes[deporte] : null; if (categorias && !(tDep ? (has(tDep.revenue, l.subcategory) || has(tDep.expense, l.subcategory)) : [...categorias.revenue, ...categorias.expense].includes(l.subcategory))) err(rr, `subcategoría "${l.subcategory}" que no está en la taxonomía de ${deporte || 'futbol'} (data/category-map.js)`); else if (categorias && categorias.genericCategoryOf && deporte) { const g = categorias.genericCategoryOf(deporte, lado, l.subcategory); if (l.category !== g) err(rr, `category "${l.category}" no es la genérica de "${l.subcategory}" (${lado}): es "${g}" (data/category-map.js)`); } /* una categoría del otro lado (exceptional_items en ingresos, regla de CONVENCIONES-DATOS; el costo de las camisetas de Atlético Mineiro) NO es un aviso acá: la vigila audit.js (categoria-cruzada) con su lista revisada en tools/audit-ignore.json */ if (has(l, 'items') && !itemsOk(l.items)) err(rr, 'items tiene que ser una lista de [texto, número] o [texto, número, subitems]'); }); };
  const anios = new Set();
  (Array.isArray(j.years) ? j.years : (err('years', 'tiene que ser una lista'), [])).forEach((y, i) => {
    const r = `years[${y && y.fiscal_year}]`; if (!claves(y, ['fiscal_year', 'period_end', 'period_months', 'currency', 'fx', 'source_id', 'report_type', 'management_id', 'revenue', 'expenses', 'financial', 'official_totals', 'adjustments'], r, ['fiscal_year', 'period_end'])) return;
    if (!Number.isInteger(y.fiscal_year)) err(r, 'fiscal_year entero'); if (anios.has(y.fiscal_year)) err(r, 'año repetido'); anios.add(y.fiscal_year);
    if (i && j.years[i - 1].fiscal_year >= y.fiscal_year) err(r, 'los años tienen que ir ordenados');
    if (!FECHA_RE.test(y.period_end || '')) err(r, 'period_end AAAA-MM-DD');
    if (has(y, 'period_months') && !(Number.isInteger(y.period_months) && y.period_months >= 1 && y.period_months <= 36 && y.period_months !== 12)) err(r, `period_months "${y.period_months}": entero de 1 a 36 y distinto de 12 (sin el campo, el ejercicio es de 12 meses)`);
    if (has(y, 'currency') && !/^[A-Z]{3}$/.test(y.currency || '')) err(r, `currency "${y.currency}" no es ISO 4217`);
    if (has(y, 'fx')) claves(y.fx, Object.values(FX), `${r}.fx`);
    if (y.source_id != null && !fuentes.has(y.source_id) && !(externos && externos.fuentes.has(y.source_id))) aviso(r, `source_id "${y.source_id}" no está en sources[] ni en el registro de fuentes de data/clubs.js`);
    if (has(y, 'management_id') && y.management_id !== null && !gest.has(y.management_id)) { if (!(externos && (externos.gestiones.get(j.club.id) || new Set()).has(y.management_id))) aviso(r, `management_id "${y.management_id}" no está en management[] ni en data/gestiones/ (el id de una gestión es su \"corto\" en minúsculas)`); }
    if (has(y, 'revenue')) lineas(y.revenue, `${r}.revenue`, 'revenue'); if (has(y, 'expenses')) lineas(y.expenses, `${r}.expenses`, 'expense');
    if (has(y, 'financial') && claves(y.financial, Object.values(FINANCIERO), `${r}.financial`)) for (const [k, v] of Object.entries(y.financial)) if (v !== null && !ES_NUM(v)) err(`${r}.financial`, `${k} número o null`);
    if (has(y, 'official_totals') && claves(y.official_totals, Object.values(TOTALES), `${r}.official_totals`)) for (const [k, v] of Object.entries(y.official_totals)) if (v !== null && !ES_NUM(v)) err(`${r}.official_totals`, `${k} número o null`);
    if (has(y, 'adjustments') && claves(y.adjustments, Object.values(META_ADJ), `${r}.adjustments`)) {
      const a = y.adjustments;
      if (has(a, 'extra_rows')) (Array.isArray(a.extra_rows) ? a.extra_rows : (err(`${r}.adjustments.extra_rows`, 'tiene que ser una lista'), [])).forEach((x, i) => { const rr = `${r}.adjustments.extra_rows[${i}]`; if (claves(x, ['label', 'amount'], rr, ['label', 'amount'])) { if (typeof x.label !== 'string') err(rr, 'label tiene que ser un texto'); if (x.amount !== null && !ES_NUM(x.amount)) err(rr, 'amount número o null'); } });
      if (has(a, 'no_breakdown')) (Array.isArray(a.no_breakdown) ? a.no_breakdown : (err(`${r}.adjustments.no_breakdown`, 'tiene que ser una lista'), [])).forEach((x, i) => { const rr = `${r}.adjustments.no_breakdown[${i}]`; if (claves(x, Object.values(SIN_DESGLOSE), rr, Object.values(SIN_DESGLOSE))) { for (const k of ['line', 'side', 'reason']) if (typeof x[k] !== 'string') err(rr, `${k} tiene que ser un texto`); if (!ES_NUM(x.amount)) err(rr, 'amount tiene que ser un número finito'); } });
      if (has(a, 'included_in') && claves(a.included_in, Object.keys(a.included_in), `${r}.adjustments.included_in`)) for (const [cat, v] of Object.entries(a.included_in)) { const rr = `${r}.adjustments.included_in.${cat}`; if (typeof v === 'string') continue; if (claves(v, Object.values(INCLUIDO), rr, ['in'])) { if (typeof v.in !== 'string') err(rr, 'in tiene que ser un texto'); if (has(v, 'possible') && typeof v.possible !== 'boolean') err(rr, 'possible tiene que ser true o false'); if (has(v, 'by') && typeof v.by !== 'string') err(rr, 'by tiene que ser un texto'); } }
    }
  });
  if (has(j, 'extras')) claves(j.extras, Object.values(EXTRAS), 'extras');
  if (has(j, 'budget_overlay') && claves(j.budget_overlay, Object.keys(j.budget_overlay), 'budget_overlay')) for (const [y, o] of Object.entries(j.budget_overlay)) { claves(o, [...Object.values(OVERLAY), 'fx'], `budget_overlay.${y}`); if (o.revenue) lineas(o.revenue, `budget_overlay.${y}.revenue`, 'revenue'); if (o.expenses) lineas(o.expenses, `budget_overlay.${y}.expenses`, 'expense'); }
  return { errores: e, avisos };
}
// Las referencias que NO viven en el data file del club: las fuentes registradas en data/clubs.js (`const sources`) y las gestiones de
// data/gestiones/<país>.js (CLUB_GESTIONES[club]; el id de una gestión es su `corto` en minúsculas y sin tildes).
export function referenciasExternas() {
  const sb = { console, window: {} }; sb.window.window = sb.window; const ctx = vm.createContext(sb);
  vm.runInContext(readFileSync(resolve(ROOT, 'data/clubs.js'), 'utf8'), ctx);
  const fuentes = new Set(Object.keys(vm.runInContext('typeof sources !== "undefined" ? sources : {}', ctx)));
  const g = { console, window: {} }; g.window.window = g.window; const gc = vm.createContext(g);
  for (const f of readdirSync(resolve(ROOT, 'data/gestiones'))) if (f.endsWith('.js')) vm.runInContext(readFileSync(resolve(ROOT, 'data/gestiones', f), 'utf8'), gc);
  const norm = (t) => String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const gestiones = new Map(Object.entries(g.window.CLUB_GESTIONES || {}).map(([club, lista]) => [club, new Set(lista.map((x) => norm(x.corto || x.nombre)))]));
  return { fuentes, gestiones };
}
export function categoriasDelSitio() { return taxonomia(); }
export { ErrorDeEsquema };
export const CAMPOS = { LINEA, FUENTE, GESTION, SIN_DESGLOSE, INCLUIDO, FINANCIERO, TOTALES, FX, META_DIRECTA, META_ADJ, OVERLAY, EXTRAS, CLUB, CLAVES_LIBRES, DEPORTE };

// El paquete que se publica (Frictionless, tools/exportar-paquete.mjs) lleva SOLO lo financiero: sin el contenido editorial de
// pocos clubes (resultados, títulos, pases) ni los `extras`. Es una copia; el JSON completo de cada club no pierde nada.
export function soloFinanciero(j) {
  const { squad_transfers, results, titles, extras, ...resto } = j;
  return resto;
}

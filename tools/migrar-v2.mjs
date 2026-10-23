#!/usr/bin/env node
// ============================================================================
// tools/migrar-v2.mjs — la migración de una sola vez de los JSON de club del esquema 1.0 al 2.0 (Admin/mediciones/248-plan.md, sección 4).
// Cada línea: `category` (v1) pasa a `subcategory`, sin tocarla, y se le agrega la genérica (`category`) de data/category-map.js (genericCategoryOf).
// En `club`: `sport` con su nombre del JSON ("futbol" -> "football") y `taxonomy` (la versión del mapa). Ningún importe se toca.
//
// QUÉ CHEQUEA ANTES DE ESCRIBIR (si falla uno solo, no escribe ningún archivo):
//   1. el -data.js que sale del JSON nuevo es IDÉNTICO, byte por byte, al que está en disco (el sitio no puede cambiar);
//   2. la huella de importes del JSON nuevo (cada línea y cada item: club, año, lado, posición, rótulo, subcategoría, importe) es la misma que la del viejo;
//   3. la capa genérica cierra contra la vieja: por club-ejercicio-lado, la suma por genérica da el total del lado; y la cascada armada con los bloques
//      de las genéricas (ingresos + operating, + exceptional + non_cash, + financial) da el ebitda, el resultado operativo y el pat del motor real
//      (computeYearGeneric de js/finanzas-calc.js, corrido en un vm con los data files, como audit.js);
//   + el JSON nuevo valida contra el esquema 2.0 y es la forma canónica (aJson(deJson(nuevo)) da el mismo texto), que es lo que escriben las tools.
// El chequeo 4 del plan son las tools de siempre, después de escribir: ida-y-vuelta, validar-esquema-json, audit.js, generate-rankings --check.
// Un JSON que ya está en 2.0 se deja como está (idempotente: se puede volver a correr en la principal después de mergear una rama vieja).
//
// USO: node tools/migrar-v2.mjs                       ensayo: corre los chequeos y dice qué escribiría
//      node tools/migrar-v2.mjs --escribir            migra (solo si todos los chequeos dan bien)
//      node tools/migrar-v2.mjs --huella <archivo>    escribe la huella de importes de los JSON como están (v1 o v2), para comparar antes y después
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import vm from 'node:vm';
import { aJson, deJson, generarJs, validar, categoriasDelSitio, referenciasExternas, clubDeFicha, clubes, SCHEMA_VERSION } from './json-datos.mjs';
import { serializar } from './club-json.mjs';
import { archivosData } from './data-clubes.js';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
const escribir = A.includes('--escribir'); const huellaA = flag('--huella');
const TAX = categoriasDelSitio();

const jsons = [];
for (const d of readdirSync(resolve(ROOT, 'data'), { withFileTypes: true })) {
  if (!d.isDirectory() || !/^[a-z]{2}$/.test(d.name)) continue;
  for (const f of readdirSync(resolve(ROOT, 'data', d.name)).sort()) if (f.endsWith('.json')) jsons.push({ id: f.replace(/\.json$/, ''), rj: `data/${d.name}/${f}`, rd: `data/${d.name}/${f.replace(/\.json$/, '')}-data.js` });
}

// ---- la huella: cada línea y cada item, en orden, con la subcategoría (category en v1, subcategory en v2) y el importe tal cual
function huella(j) {
  const out = []; const sub = (l) => (j.schema_version === '1.0' ? l.category : l.subcategory);
  const items = (pre, its) => (its || []).forEach((x, i) => { out.push(`${pre}.${i}\t${x[0]}\t${x[1]}`); if (x[2]) items(`${pre}.${i}`, x[2]); });
  const lineas = (pre, arr) => (arr || []).forEach((l, i) => { out.push(`${pre}[${i}]\t${l.label}\t${sub(l)}\t${l.amount}\t${l.disclosure ?? ''}`); items(`${pre}[${i}]`, l.items); });
  for (const y of j.years) { lineas(`${j.club.id} ${y.fiscal_year} ingreso`, y.revenue); lineas(`${j.club.id} ${y.fiscal_year} gasto`, y.expenses); }
  for (const [y, o] of Object.entries(j.budget_overlay || {})) { lineas(`${j.club.id} presupuesto ${y} ingreso`, o.revenue); lineas(`${j.club.id} presupuesto ${y} gasto`, o.expenses); }
  return out;
}
if (huellaA) {
  const todo = jsons.flatMap(({ rj }) => huella(JSON.parse(readFileSync(resolve(ROOT, rj), 'utf8'))));
  const dest = resolve(ROOT, huellaA); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, todo.join('\n') + '\n');
  console.log(`huella de ${jsons.length} clubes, ${todo.length} renglones -> ${huellaA}`);
  process.exit(0);
}

// ---- v1 -> v2
const DEPORTE_JSON_A_INTERNO = { football: 'futbol', basketball: 'basquet', rugby_union: 'rugby', american_football: 'nfl', formula_1: 'f1', tennis: 'tenis', cricket: 'cricket', other: 'otro' };
function aV2(j) {
  const deporte = (j.club && j.club.sport) ? (DEPORTE_JSON_A_INTERNO[j.club.sport] || j.club.sport) : 'futbol';
  const linea = (l, lado, donde) => {
    const gen = TAX.genericCategoryOf(deporte, lado, l.category);
    if (!gen) throw new Error(`${donde}: "${l.category}" no tiene genérica`);
    const o = {}; for (const [k, v] of Object.entries(l)) { if (k === 'category') { o.category = gen; o.subcategory = v; } else o[k] = v; } return o;
  };
  const n = {};
  for (const [k, v] of Object.entries(j)) {
    if (k === 'schema_version') n[k] = SCHEMA_VERSION;
    else if (k === 'club') n.club = { ...clubDeFicha(v.id, { ...Object.fromEntries(Object.entries(v).map(([a, b]) => [{ display_name: 'displayName', reporting_currency: 'reportingCurrency', fiscal_year_start: 'fiscalYearStart' }[a] || a, b])), ...(v.sport ? { sport: deporte } : {}) }) };
    else if (k === 'years') n.years = v.map((y) => Object.fromEntries(Object.entries(y).map(([a, b]) => [a, a === 'revenue' || a === 'expenses' ? b.map((l, i) => linea(l, a === 'revenue' ? 'revenue' : 'expense', `${j.club.id} ${y.fiscal_year} ${a}[${i}]`)) : b])));
    else if (k === 'budget_overlay') n.budget_overlay = Object.fromEntries(Object.entries(v).map(([y, o]) => [y, Object.fromEntries(Object.entries(o).map(([a, b]) => [a, a === 'revenue' || a === 'expenses' ? b.map((l, i) => linea(l, a === 'revenue' ? 'revenue' : 'expense', `${j.club.id} presupuesto ${y} ${a}[${i}]`)) : b]))]));
    else n[k] = v;
  }
  return n;
}

// ---- el motor real, para el chequeo 3
function motor() {
  // el global del contexto es su propio `window`, igual que loadEngine() de audit.js: el motor lee CLUB_GENERIC_DATA sin el prefijo
  const sb = { console }; sb.window = sb; sb.globalThis = sb; const ctx = vm.createContext(sb);
  vm.runInContext('var FX_RATE = 1450; var currentCurrency = "USD"; var simplifyFormat = true;', ctx);
  const files = ['data/clubs.js', 'data/category-map.js', 'data/currency-map.js', 'data/sources-view.js', 'data/club-leagues.js', 'data/site-labels.js',
    ...readdirSync(resolve(ROOT, 'data/club-leagues')).filter((f) => f.endsWith('.js')).sort().map((f) => 'data/club-leagues/' + f), ...archivosData(), 'js/finanzas-calc.js'];
  for (const rel of files) vm.runInContext(readFileSync(resolve(ROOT, rel), 'utf8'), ctx, { filename: rel });
  return vm.runInContext('({ computeYearGeneric })', ctx);
}

const bloque = { revenue: new Map(TAX.genericas.revenue.map((g) => [g.id, g.block])), expense: new Map(TAX.genericas.expense.map((g) => [g.id, g.block])) };
const cerca = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));
const categorias = TAX; const externos = referenciasExternas();
const api = motor();
const fallas = []; const aEscribir = []; let yaV2 = 0; let anios = 0;
for (const { id, rj, rd } of jsons) {
  const j = JSON.parse(readFileSync(resolve(ROOT, rj), 'utf8'));
  if (j.schema_version === SCHEMA_VERSION) { yaV2++; continue; }
  if (j.schema_version !== '1.0') { fallas.push(`${rj}: schema_version "${j.schema_version}"`); continue; }
  let n; try { n = aV2(j); } catch (e) { fallas.push(`${rj}: ${e.message}`); continue; }
  const v = validar(n, { categorias, externos }); if (v.errores.length) { fallas.push(`${rj}: no valida: ${v.errores.slice(0, 3).join(' | ')}`); continue; }
  // 1. el data file, byte por byte
  const actual = existsSync(resolve(ROOT, rd)) ? readFileSync(resolve(ROOT, rd), 'utf8') : null;
  if (generarJs(n, { ruta: rj }) !== actual) { fallas.push(`${rd}: el data file que sale del JSON nuevo no es idéntico al de disco`); continue; }
  // forma canónica: lo que escribirían las tools
  if (serializar(aJson(deJson(n), { exportadoEn: n.exported_at, ficha: clubes()[id] })) !== serializar(n)) { fallas.push(`${rj}: aJson(deJson(nuevo)) no da el mismo JSON (¿club desfasado de data/clubs.js?)`); continue; }
  // 2. la huella de importes
  const h1 = huella(j).join('\n'), h2 = huella(n).join('\n');
  if (h1 !== h2) { fallas.push(`${rj}: la huella de importes cambió`); continue; }
  // 3. la capa genérica contra la vieja y contra el motor
  for (const y of n.years) {
    anios++;
    for (const [lado, arr] of [['revenue', y.revenue || []], ['expense', y.expenses || []]]) {
      const total = arr.reduce((s, l) => s + l.amount, 0); const porGen = new Map();
      for (const l of arr) porGen.set(l.category, (porGen.get(l.category) || 0) + l.amount);
      const suma = [...porGen.values()].reduce((s, x) => s + x, 0);
      if (!cerca(suma, total)) fallas.push(`${id} ${y.fiscal_year} ${lado}: las genéricas suman ${suma} y el lado ${total}`);
    }
    const c = api.computeYearGeneric(id, y.fiscal_year); if (!c) { fallas.push(`${id} ${y.fiscal_year}: el motor no devuelve el ejercicio`); continue; }
    const rev = (y.revenue || []).reduce((s, l) => s + l.amount, 0);
    const blq = (b) => (y.expenses || []).filter((l) => bloque.expense.get(l.category) === b).reduce((s, l) => s + l.amount, 0);
    const f = y.financial || {};
    const ebitda = rev + blq('operating'); const op = ebitda + blq('exceptional') + blq('non_cash');
    const pat = op + (f.profit_on_player_sales || 0) + (f.asset_sales || 0) + (f.net_interest || 0) + (f.tax || 0);
    for (const [nom, a, b] of [['ebitda', ebitda, c.ebitda], ['resultado operativo', op, c.operatingProfit], ['pat', pat, c.pat]]) if (!cerca(a, b)) fallas.push(`${id} ${y.fiscal_year}: ${nom} por bloques ${a} y el motor ${b}`);
  }
  aEscribir.push([rj, n]);
}

console.log(`${jsons.length} JSON: ${aEscribir.length} para migrar a ${SCHEMA_VERSION}, ${yaV2} ya en ${SCHEMA_VERSION}; ${anios} ejercicios chequeados contra el motor`);
if (fallas.length) { console.log(`${fallas.length} falla(s); no se escribe nada:`); for (const x of fallas.slice(0, 40)) console.log(`  ${x}`); process.exit(1); }
console.log('chequeos 1 (data file idéntico), 2 (huella) y 3 (genéricas y cascada contra el motor): bien');
if (!escribir) { console.log('ensayo: no se escribió nada (--escribir para migrar)'); process.exit(0); }
for (const [rj, n] of aEscribir) writeFileSync(resolve(ROOT, rj), serializar(n) + '\n');
console.log(`escritos ${aEscribir.length} JSON`);

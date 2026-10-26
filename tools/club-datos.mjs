// tools/club-datos.mjs — las líneas de un año de un club, de su JSON público (data/<país>/<clubId>.json): etiqueta, categoría, subcategoría e importe, con el total de cada subcategoría y los totales oficiales. Solo lee.
// POR QUÉ. Para mirar un año cargado (qué quedó en cada categoría, si falta una línea de sueldos) se armaba un script suelto en el scratchpad cada vez; esto lo reemplaza.
// USO: node tools/fos.mjs club-datos <clubId> <año> [gastos|ingresos|todo]    (default: todo)
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const [clubId, anio, cual = 'todo'] = process.argv.slice(2);
if (!clubId || !/^\d{4}$/.test(anio || '') || !['gastos', 'ingresos', 'todo'].includes(cual)) { console.error('Uso: node tools/fos.mjs club-datos <clubId> <año> [gastos|ingresos|todo]'); process.exit(1); }
const ruta = join(ROOT, 'data', clubId.split('-').pop(), `${clubId}.json`);
if (!existsSync(ruta)) { console.error(`No existe ${ruta.slice(ROOT.length + 1)}: el clubId es <slug>-<iso2> (por ejemplo alianzafc-co).`); process.exit(1); }
const y = (JSON.parse(readFileSync(ruta, 'utf8')).years || []).find((x) => String(x.fiscal_year) === anio);
if (!y) { console.error(`${clubId} no tiene el año ${anio}.`); process.exit(1); }
const n = (v) => (typeof v === 'number' ? v.toLocaleString('es-AR', { maximumFractionDigits: 3 }) : String(v));
console.log(`${clubId} ${anio} · ${y.currency || ''} millones · fuente ${y.source_id || '?'} · ${y.report_type || '?'} · cierre ${y.period_end || '?'}`);
for (const [titulo, clave, mostrar] of [['INGRESOS', 'revenue', cual !== 'gastos'], ['GASTOS', 'expenses', cual !== 'ingresos']]) {
  if (!mostrar) continue; const L = y[clave] || []; const por = new Map();
  console.log(`\n${titulo} (${L.length} líneas)`);
  for (const l of L) { console.log(`  ${String(l.label).slice(0, 52).padEnd(52)} ${String(l.subcategory || l.category).padEnd(34)} ${n(l.amount).padStart(12)}${l.disclosure && l.disclosure !== 'aggregated' ? `  [${l.disclosure}]` : ''}`); por.set(l.subcategory || l.category, (por.get(l.subcategory || l.category) || 0) + (l.amount || 0)); }
  console.log(`  — por subcategoría: ${[...por].sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).map(([k, v]) => `${k} ${n(v)}`).join(' · ')}`);
}
if (y.official_totals) console.log(`\nTotales oficiales: ${JSON.stringify(y.official_totals)}`);

// Medición del TODO 371: la compuerta de plausibilidad del costo de personal de `caja-deuda.mjs --personal` (PERSONAL_MIN_SOBRE_INGRESOS = 15 %)
// contra TODOS los staffCost cargados en el sitio. Un staffCost ya cargado cuyo cociente sobre los ingresos del año da menos que el umbral es un
// valor que la compuerta habría rechazado: o el dato cargado está mal, o la compuerta rechaza un club real (falso rechazo).
// USO: node Admin/mediciones/371-compuerta-personal.mjs        (gratis, no escribe nada)
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { loadSite } from '../../tools/datos-sitio.mjs';

const ROOT = resolve(import.meta.dirname, '..', '..');
const UMBRAL = Number((readFileSync(resolve(ROOT, 'tools/caja-deuda.mjs'), 'utf8').match(/PERSONAL_MIN_SOBRE_INGRESOS = ([\d.]+)/) || [])[1]);
const { generic } = loadSite();
const filas = [];
for (const [id, club] of Object.entries(generic)) {
  for (const [anio, m] of Object.entries(club.fiscalYearMeta || {})) {
    if (m.staffCost == null) continue;
    const ingresos = (club.revenueLinesByYear?.[anio] || []).reduce((s, l) => s + Math.max(0, l.amountNative || 0), 0);
    filas.push({ id, anio, staff: m.staffCost, ingresos, ratio: ingresos > 0 ? m.staffCost / ingresos : null });
  }
}
const conRatio = filas.filter((f) => f.ratio != null);
const bajo = conRatio.filter((f) => f.ratio < UMBRAL);
const ratios = conRatio.map((f) => f.ratio).sort((a, b) => a - b);
const q = (p) => ratios[Math.min(ratios.length - 1, Math.floor(p * ratios.length))];
console.log(`umbral ${UMBRAL * 100} % · staffCost cargados: ${filas.length} (con ingresos: ${conRatio.length}, sin ingresos: ${filas.length - conRatio.length})`);
console.log(`cociente personal/ingresos: mínimo ${(ratios[0] * 100).toFixed(1)} % · p5 ${(q(0.05) * 100).toFixed(1)} % · mediana ${(q(0.5) * 100).toFixed(1)} % · máximo ${(ratios.at(-1) * 100).toFixed(1)} %`);
console.log(`la compuerta rechazaría ${bajo.length} de ${conRatio.length}:`);
for (const f of bajo) console.log(`  ${f.id} ${f.anio}: personal ${f.staff} · ingresos ${f.ingresos.toFixed(3)} · ${(f.ratio * 100).toFixed(1)} %`);
// Como solo hay pocos staffCost, una segunda vara: los sueldos YA cargados (wages_squad) sobre los ingresos de todos los club-años. El personal
// real es al menos eso: si muchos clubes reales tienen wages_squad/ingresos bajo el umbral, la compuerta los rechazaría aunque la cifra fuera la buena.
const sueldos = [];
for (const [id, club] of Object.entries(generic)) {
  for (const anio of Object.keys(club.expenseLinesByYear || {})) {
    const ingresos = (club.revenueLinesByYear?.[anio] || []).reduce((s, l) => s + Math.max(0, l.amountNative || 0), 0);
    const w = (club.expenseLinesByYear[anio] || []).filter((l) => l.normalizedCategory === 'wages_squad').reduce((s, l) => s + Math.abs(l.amountNative || 0), 0);
    if (ingresos > 0 && w > 0) sueldos.push({ id, anio, ratio: w / ingresos });
  }
}
const sb = sueldos.filter((f) => f.ratio < UMBRAL);
const sr = sueldos.map((f) => f.ratio).sort((a, b) => a - b);
console.log(`\nvara 2 — wages_squad / ingresos en ${sueldos.length} club-años con sueldos cargados: p5 ${(sr[Math.floor(0.05 * sr.length)] * 100).toFixed(1)} % · mediana ${(sr[Math.floor(0.5 * sr.length)] * 100).toFixed(1)} %; bajo el umbral: ${sb.length} (${(100 * sb.length / sueldos.length).toFixed(1)} %)`);
const porPais = {}; for (const f of sb) { const k = f.id.slice(-2); porPais[k] = (porPais[k] || 0) + 1; }
console.log(`  por país de los que quedan bajo el umbral: ${JSON.stringify(porPais)}`);
for (const f of sb.slice(0, 12)) console.log(`  ${f.id} ${f.anio}: ${(f.ratio * 100).toFixed(1)} %`);
const entre = conRatio.filter((f) => f.ratio >= UMBRAL && f.ratio < UMBRAL * 1.5);
console.log(`\ncerca del umbral (entre ${UMBRAL * 100} % y ${UMBRAL * 150} %): ${entre.length}`);
for (const f of entre.slice(0, 15)) console.log(`  ${f.id} ${f.anio}: ${(f.ratio * 100).toFixed(1)} %`);

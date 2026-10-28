// scratch: para cada par de años (Y, Y+1) con ingresos distintos, ¿la diferencia es exactamente una fila de alguno de los dos .filas.json?
import { readFileSync, existsSync } from 'node:fs';
const club = process.argv[2];
const pares = JSON.parse(process.argv[3]); // [[2015, 75082.377, 72453.712], ...] (año, ingresos en el doc Y, ingresos de Y en el doc Y+1) en millones
const num = (s) => { if (s == null) return null; const neg = /^\(.*\)$/.test(String(s).trim()); const v = Number(String(s).replace(/[()\s]/g, '').replace(/\./g, '').replace(',', '.')); return Number.isFinite(v) ? (neg ? -v : v) : null; };
const filas = (y) => { const f = `/Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports/Generados/Colombia/${club}/siis-estado-${y}.filas.json`; return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')).filas : []; };
for (const [y, a, b] of pares) {
  const dif = Math.abs(a - b) * 1000; // miles de pesos
  const hallazgos = [];
  for (const yy of [y, y + 1]) for (const f of filas(yy)) for (const col of ['actual', 'anterior']) { const v = num(f[col]); if (v != null && Math.abs(Math.abs(v) - dif) < 1.5) hallazgos.push(`${f.etiqueta} [${f.lado}/${f.tipo}] en el doc ${yy} (${col === 'actual' ? yy : yy - 1}) = ${f[col]}`); }
  console.log(`${y}/${y + 1}: diferencia ${Math.round(dif).toLocaleString('es-AR')} miles → ${hallazgos.length ? hallazgos.join(' · ') : 'NINGUNA FILA coincide'}`);
}

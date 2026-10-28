// tools/diferencia-de-fila.mjs — ¿la diferencia entre los ingresos de dos documentos es EXACTAMENTE una fila de alguno de los dos? (la decisión «presentación distinta» de verificar-cierre.mjs)
// POR QUÉ. Dos documentos del mismo año (el del año, y la columna «año anterior» del siguiente) pueden dar ingresos distintos porque uno presenta una fila y el otro la netea:
//   · una fila de GASTO (Olympiacos 2020, Cuiabá 2022: bruto contra neto), o
//   · una fila de lado `otro` (Atlético Nacional: «Otras ganancias (pérdidas)»), que una comparación suma a los ingresos y la otra no. Para esta, la fila tiene que estar en los DOS documentos con
//     el MISMO importe del año comparado: si solo está en uno, o con otro importe, es otra cosa (una reexpresión) y la pregunta se abre.
// Una reexpresión de verdad (la diferencia no es una fila) no coincide con ninguna y sigue abriendo la pregunta. Las filas de TOTAL no cuentan (UC 2009, Juventus 2005).
// ENTRADA: dif (> 0, en las unidades de las filas ya llevadas a la misma escala del importe: se prueba en unidades, miles y millones) · filasA / filasB (las .filas.json) · colA / colB ('actual' o 'anterior': la columna
// de cada documento que trae el año comparado). SALIDA: { f, otroLado? } con la fila que explica la diferencia, o null.
// USO: import { filaQueExplica } from './diferencia-de-fila.mjs'.  Prueba: node tools/probar-diferencia-de-fila.mjs
export const TOT = /^\s*(?:total|totale|σύνολο|συνολο|subtotal|sub-total|ingresos de actividades|receita l)/i;

export function parseNum(s) {
  if (s == null) return null;
  if (typeof s === 'number') return s;
  const t = String(s).trim(); const neg = /^\(.*\)$/.test(t) || /^-/.test(t);
  const v = Number(t.replace(/[()\s-]/g, '').replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(v) ? (neg ? -v : v) : null;
}
const ESCALAS = [1e6, 1e3, 1];
const iguales = (v, dif, e) => v && Math.abs(v / e - dif) <= Math.max(2e-6, dif * 1e-7);
const igualesEntre = (a, b) => a != null && b != null && Math.abs(a - b) <= Math.max(1e-6, Math.abs(a) * 1e-7);
const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

export function filaQueExplica({ dif, filasA, filasB, colA, colB, parse = parseNum }) {
  if (!(dif > 0)) return null;
  const abs = (f, col) => Math.abs(parse(f[col]) ?? 0);
  // 1. una fila de gasto (que no sea un total) de cualquiera de los dos documentos, con su importe en cualquiera de las dos columnas
  for (const f of [...filasA, ...filasB]) {
    if (f.lado !== 'gasto' || TOT.test(f.etiqueta || '')) continue;
    for (const col of ['actual', 'anterior']) if (ESCALAS.some((e) => iguales(abs(f, col), dif, e))) return { f, col };
  }
  // 2. una fila de lado `otro`: la misma etiqueta en los dos documentos, con el mismo importe del año comparado en cada uno, y ese importe es la diferencia
  for (const f of filasA) {
    if (f.lado !== 'otro' || TOT.test(f.etiqueta || '')) continue;
    const g = filasB.find((x) => x.lado === 'otro' && norm(x.etiqueta) === norm(f.etiqueta));
    if (!g) continue;
    const va = parse(f[colA]), vb = parse(g[colB]);
    if (!igualesEntre(va, vb)) continue;
    if (ESCALAS.some((e) => iguales(Math.abs(va), dif, e))) return { f, col: colA, otroLado: true };
  }
  return null;
}

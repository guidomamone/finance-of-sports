#!/usr/bin/env node
// tools/reexpresion.mjs — `fos reexpresion "<Club>" [desde hasta]`: por cada par de años vecinos de un club de SIIS (Y, Y+1), qué rubros difieren entre el corte de Y y la columna «año anterior» de Y+1 (miles de pesos),
// si el resultado del año coincide, y de qué es el par: REEXPRESIÓN (SIIS cambió cifras de verdad), FILA (las cifras de SIIS son las mismas y hay una fila de lado `otro`, idéntica en los dos estados, que una comparación
// de ingresos cuenta en un documento y en el otro no: la diferencia que verificar abre como `anio-vecino` es exactamente esa fila; es la regla de diferencia-de-fila.mjs) o sin diferencias.
// Solo lee los siis-estado-AAAA.json y los .filas.json; no escribe nada ni llama a ninguna API. Una diferencia de hasta 5 miles en un rubro se cuenta como redondeo (se muestra igual).
// POR QUÉ. Contestar los casos `anio-vecino` de la cola pedía dos scripts sueltos (Prototyping/defectos-463/reexpresion.mjs y diff-fila.mjs) y mirar a mano que el resultado no cambiara.
// USO: node tools/fos.mjs reexpresion "<Club>" [desde hasta]     Prueba: node tools/probar-reexpresion.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { parseNum } from './diferencia-de-fila.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REDONDEO = 5; // miles
const num = (v) => { const x = Number(v); return Number.isFinite(x) ? x : null; };

// regA / regB: los registros de resultado integral de SIIS del año Y (corte) y del año Y+1 (corteAnterior); filasA / filasB: sus .filas.json
export function analizarPar(regA, regB, filasA = [], filasB = []) {
  const difs = [];
  for (const k of Object.keys(regA)) { const x = num(regA[k]?.corte), z = num(regB[k]?.corteAnterior); if (x != null && z != null && x !== z) difs.push({ rubro: k, antes: x, despues: z, redondeo: Math.abs(z - x) <= REDONDEO }); }
  const resultadoCoincide = num(regA.gananciaPerdida?.corte) != null && num(regB.gananciaPerdida?.corteAnterior) != null ? num(regA.gananciaPerdida.corte) === num(regB.gananciaPerdida.corteAnterior) : null;
  // una fila de lado `otro`, con importe, que está en los dos estados con el mismo importe del año Y (actual en el de Y, anterior en el de Y+1)
  const otroFila = filasA.filter((f) => f.lado === 'otro' && f.tipo === 'renglon').map((f) => { const g = filasB.find((x) => x.lado === 'otro' && x.etiqueta === f.etiqueta); const a = parseNum(f.actual), b = g ? parseNum(g.anterior) : null; return a && b != null && a === b ? { etiqueta: f.etiqueta, importe: f.actual } : null; }).find(Boolean) || null;
  const material = difs.filter((d) => !d.redondeo);
  const tipo = material.length ? 'reexpresion' : otroFila ? 'fila' : difs.length ? 'redondeo' : 'sin-diferencias';
  return { difs, resultadoCoincide, otroFila, tipo };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [club, desde, hasta] = process.argv.slice(2);
  if (!club) { console.error('Uso: node tools/fos.mjs reexpresion "<Club>" [desde hasta]'); process.exit(1); }
  const cfg = JSON.parse(readFileSync(join(ROOT, 'tools/siis-clubes.json'), 'utf8'));
  const dir = join(ROOT, 'Clubes', cfg.pais, club), gen = join(ROOT, 'Generados', cfg.pais, club);
  if (!existsSync(dir)) { console.error(`No existe ${dir}`); process.exit(1); }
  const reg = (y) => { const f = join(dir, `siis-estado-${y}.json`); if (!existsSync(f)) return null; const j = JSON.parse(readFileSync(f, 'utf8')); return (j.siis_resultadointegral || j).resultado?.registros || null; };
  const filas = (y) => { try { return JSON.parse(readFileSync(join(gen, `siis-estado-${y}.filas.json`), 'utf8')).filas || []; } catch { return []; } };
  const anios = readdirSync(dir).map((f) => Number((f.match(/^siis-estado-(\d{4})\.json$/) || [])[1])).filter(Boolean);
  const lo = Number(desde) || Math.min(...anios), hi = Number(hasta) || Math.max(...anios);
  for (let y = lo; y < hi; y++) {
    const a = reg(y), b = reg(y + 1); if (!a || !b) continue;
    const r = analizarPar(a, b, filas(y), filas(y + 1));
    const veredicto = { reexpresion: 'REEXPRESIÓN (SIIS cambió cifras del año)', fila: `FILA «${r.otroFila?.etiqueta}» (otro, ${r.otroFila?.importe}), idéntica en los dos estados: las cifras de SIIS son las mismas; si verificar abre este par, la diferencia es esa fila (una comparación la cuenta como ingreso y la otra no)`, redondeo: 'solo redondeo', 'sin-diferencias': 'sin diferencias' }[r.tipo];
    console.log(`${y}/${y + 1}: ${veredicto} · resultado del año ${r.resultadoCoincide === null ? '?' : r.resultadoCoincide ? 'coincide' : 'DIFIERE'}${r.difs.length ? `\n    rubros que difieren (miles): ${r.difs.map((d) => `${d.rubro} ${d.antes}→${d.despues} (${d.despues - d.antes}${d.redondeo ? ', redondeo' : ''})`).join(' · ')}` : ''}`);
  }
}

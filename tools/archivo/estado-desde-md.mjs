#!/usr/bin/env node
// ============================================================================
// tools/estado-desde-md.mjs — ARMAR A MANO las filas del estado de resultados desde una tabla del .md (no es una etapa del pipeline).
//
// POR QUÉ (2026-10-08, decisión de Guido): para documentos viejos que el pipeline no resuelve y no justifican cambiar un script (Lazio
// 2011-12: la extracción trajo solo los subtotales del estado y verificar caía a las notas en miles). Reemplaza las filas del .filas.json
// por las del estado leídas del .md entre dos líneas, y saca las notas (notas_ingresos/notas_gastos). Gratis, sin IA.
//
// CÓMO LEE: cada fila de tabla con importe; el lado sale de la POSICIÓN en el estado (ingresos hasta "TOTALE RICAVI", gastos hasta "RISULTATO
// OPERATIVO", financiero hasta "RISULTATO PRIMA DELLE IMPOSTE", impuesto hasta "UTILE"); una fila con número de nota es subtotal solo si
// la sigue una fila de detalle; los "di cui" no entran; en la página de dos columnas de importes toma la que tenga valor. Hecho para el
// formato de Lazio: revisar la salida (imprime cada fila) antes de verificar, y agregar los ajustes `fila` que saquen los totales que se
// cuentan además de sus filas (to-do 167).
//
// USO: node tools/estado-desde-md.mjs <.filas.json> <.md> <línea desde> <línea hasta> <bloque pág. 1> <bloque pág. 2>
// ============================================================================
import { readFileSync, writeFileSync } from 'node:fs';
const [fFilas, fMd, desde, hasta, b1, b2] = process.argv.slice(2);
const F = JSON.parse(readFileSync(fFilas, 'utf8')); const L = readFileSync(fMd, 'utf8').split('\n');
const filas = []; let lado = 'ingreso'; let bloque = b1; let vistoTCO = false;
for (let i = Number(desde); i <= Number(hasta); i++) {
  const t = L[i - 1] || ''; if (/^--- pág/.test(t)) { bloque = b2; continue; }
  if (!t.startsWith('|') || /^\|\s*-{3}/.test(t)) continue;
  const c = t.split('|').slice(1, -1).map((x) => x.trim()); const label = c[0].replace(/\*\*/g, '').trim();
  if (!label || /^nota$/i.test(c[1]) || /^-?\s*di cui/i.test(label)) continue;
  const nums = c.slice(2).map((x) => x.replace(/\*\*/g, '').trim());
  const actual = c.length >= 5 ? (nums[0] || nums[1]) : nums[0]; const anterior = nums[nums.length - 1];
  if (!actual && !anterior) continue;
  let tipo = c[1] ? 'subtotal' : 'renglon';
  if (/^TOTALE (RICAVI|COSTI OPERATIVI)/.test(label)) { tipo = 'total'; if (/COSTI/.test(label)) { if (vistoTCO) continue; vistoTCO = true; } }
  else if (/^Totale /.test(label)) tipo = 'subtotal';
  if (/^(RISULTATO|UTILE)/.test(label)) tipo = 'resultado';
  const l = tipo === 'resultado' ? 'resultado' : lado;
  filas.push({ bloque, linea: i, etiqueta: label, actual: actual || '0', anterior: anterior || '0', tipo, lado: l, detalla_a: null });
  if (/^TOTALE RICAVI/.test(label)) lado = 'gasto';
  if (/^RISULTATO OPERATIVO/.test(label)) lado = 'financiero';
  if (/^RISULTATO PRIMA DELLE IMPOSTE/.test(label)) lado = 'impuesto';
}
// una fila con número de nota es subtotal solo si la siguiente es una fila de detalle (renglón); si no, es un renglón
for (let k = 0; k < filas.length; k++) if (filas[k].tipo === 'subtotal' && !/^Totale /.test(filas[k].etiqueta)) { const sig = filas[k + 1]; if (!sig || sig.tipo !== 'renglon') filas[k].tipo = 'renglon'; }
const antes = F.filas.length; F.filas = filas; F.ubicacion.notas_ingresos = []; F.ubicacion.notas_gastos = [];
F.observaciones = (F.observaciones || '') + ` [Claude 2026-10-08, decisión de Guido (documento viejo, a mano): las filas del estado se armaron desde el .md L${desde}-L${hasta} (la extracción no trajo las sub-filas); sin las notas.]`;
writeFileSync(fFilas, JSON.stringify(F, null, 1)); console.log('filas', antes, '->', filas.length); for (const f of filas) console.log(' ', f.linea, f.tipo.padEnd(9), f.lado.padEnd(10), f.etiqueta.slice(0, 50).padEnd(50), f.actual);

#!/usr/bin/env node
// ============================================================================
// tools/ingresos-en-una-linea.mjs — `fos ingresos-en-una-linea`: los ejercicios cargados cuyos ingresos son UNA sola línea sin desglosar (`lump_football_operations`)
//
// POR QUÉ. En esos ejercicios la línea puede ser un margen ya neto de costos («Bruttofortjeneste» danés, «Brutomarge» belga) o la facturación entera («Omzet», «Turnover»), y el sitio
// la muestra igual como «ingresos». Punto 454: una nota por ejercicio, según el caso. Esta tool lista cada uno con su rótulo y su importe, para clasificarlos.
//
// USO: node tools/ingresos-en-una-linea.mjs [--pais dk]      una línea por ejercicio: club, año, rótulo del documento, importe y cuántas líneas tiene el año siguiente
// ============================================================================
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const pais = A.includes('--pais') ? A[A.indexOf('--pais') + 1] : null;
const { cargarSitio } = await import('./cargar.mjs');
const F = createRequire(import.meta.url)(resolve(ROOT, 'tools', 'cambio-formato.js'));
const sitio = cargarSitio();
const filas = [];
for (const [id, g] of Object.entries(sitio.generic)) {
  if (pais && !id.endsWith(`-${pais}`)) continue;
  const por = g.revenueLinesByYear || {};
  for (const y of Object.keys(por).map(Number).sort()) {
    if (!(por[y].length === 1 && F.esLump(por[y][0]))) continue;
    const sig = por[y + 1];
    filas.push(`${id}\t${y}\t${por[y][0].rawLabel.slice(0, 60)}\t${por[y][0].amountNative}\t${sig ? `${sig.length} línea(s) en ${y + 1}` : `sin ${y + 1}`}`);
  }
}
console.log(`${filas.length} ejercicio(s) con los ingresos en una sola línea\nclub\taño\trótulo del documento\timporte (millones)\taño siguiente`);
console.log(filas.join('\n'));

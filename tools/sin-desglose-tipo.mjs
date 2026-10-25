#!/usr/bin/env node
// ============================================================================
// tools/sin-desglose-tipo.mjs — `fos sin-desglose-tipo`: completa `fiscalYearMeta.sinDesglose` (JSON: `adjustments.no_breakdown`) de los años ya cargados (puntos 447, 454 y 452).
//
// POR QUÉ. La pantalla marca «s/d» (sin desglose) donde un documento junta en UNA línea lo que otros años abren, y explica el caso en la tarjeta «Notas sobre este club». Para eso cada línea sin
// desglosar (`lump_*`) tiene que estar en `sinDesglose` con su `tipo` (`kind`: margen bruto, ventas totales, costo de ventas, otra: tools/tipo-sin-desglose.js). cargar-ejercicio.mjs ya lo anota al cargar
// un año; esta tool completa lo anterior: agrega la línea que falte y el tipo que falte. No toca importes ni categorías.
//
// USO: node tools/sin-desglose-tipo.mjs [--pais xx] [--escribir]     ensayo por defecto: cuántas líneas agregaría y cuántos tipos pondría, por país
// ============================================================================
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { modificarClub, leerJsonClub } from './club-json.mjs';
import { deJson } from './json-datos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const { tipoSinDesglose } = createRequire(import.meta.url)('./tipo-sin-desglose.js');
const A = process.argv.slice(2);
const pais = A.includes('--pais') ? A[A.indexOf('--pais') + 1] : null;
const escribir = A.includes('--escribir');
const esIngreso = (lado) => /^(revenue|ingreso)$/.test(lado);
const r6 = (n) => Number(n.toFixed(6));

// Cuántas líneas agregaría y cuántos tipos pondría en el club `c` (formato del sitio: rawLabel, fiscalYearMeta…); con `aplicar`, lo hace.
function completar(c, aplicar) {
  let agrega = 0, tipea = 0;
  for (const y of Object.keys(c.datos.fiscalYearMeta || {})) {
    const meta = c.datos.fiscalYearMeta[y];
    for (const [lado, lineas] of [['revenue', (c.datos.revenueLinesByYear || {})[y] || []], ['expense', (c.datos.expenseLinesByYear || {})[y] || []]]) {
      for (const l of lineas) {
        if (!/^lump_/.test(l.normalizedCategory || '')) continue;
        const tipo = tipoSinDesglose(l.rawLabel, lado === 'revenue' ? 'revenue' : 'expenses');
        const e = (meta.sinDesglose || []).find((x) => x.renglon === l.rawLabel && esIngreso(x.lado) === (lado === 'revenue'));
        if (!e) { agrega++; if (aplicar) (meta.sinDesglose ||= []).push({ renglon: l.rawLabel, lado, importe: r6(Math.abs(l.amountNative ?? 0)), motivo: 'el documento no desglosa este renglón', tipo }); }
        else if (!e.tipo) { tipea++; if (aplicar) e.tipo = tipo; }
      }
    }
  }
  return { agrega, tipea };
}

const resumen = {}; let clubes = 0;
for (const iso of readdirSync(resolve(ROOT, 'data'), { withFileTypes: true }).filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name)).map((d) => d.name)) {
  if (pais && iso !== pais) continue;
  for (const id of readdirSync(resolve(ROOT, 'data', iso)).filter((x) => x.endsWith('.json')).map((f) => f.replace(/\.json$/, ''))) {
    let r;
    if (escribir) modificarClub(id, (c) => { r = completar(c, true); });
    else r = completar(deJson(leerJsonClub(id)), false);
    if (r.agrega || r.tipea) { clubes++; const p = (resumen[iso] ||= { agrega: 0, tipea: 0 }); p.agrega += r.agrega; p.tipea += r.tipea; }
  }
}
console.log(`${escribir ? 'Escrito' : 'Ensayo'}: ${clubes} clubes con algo por completar`);
for (const [iso, x] of Object.entries(resumen).sort()) console.log(`  ${iso}: ${x.agrega} líneas agregadas, ${x.tipea} tipos`);

#!/usr/bin/env node
// ============================================================================
// tools/ingreso-base.mjs — `fos ingreso-base`: pone en cada ejercicio cargado `revenue_basis` (JSON; `baseIngreso` en el data file) y, donde el documento
// no imprime los ingresos y se reconstruyeron con una identidad suya, `revenue_derivation` (punto 455; inventario en Admin/mediciones/455-ingresos-con-margen-bruto.md).
//
// QUÉ MARCA. full: ingresos abiertos por línea (aunque una línea quede sin desglosar). sales_total: una sola línea que es todo el ingreso (ventas totales).
// gross_margin: el documento imprime solo el margen bruto (ya neto de costos) y eso es lo cargado. revenue_derivation {method: margin_plus_costs, sources}:
// el esquema belga abreviado imprime el margen bruto (código 9900) y a veces compras y servicios (60, 61 o 60/61); ingreso = margen + 60/61 (tools/ingreso-derivado.js).
// Se reconoce un ejercicio reconstruido cuando el ingreso cargado es EXACTAMENTE esa suma en el documento del año, o la carga lo rotuló «implícito en la Brutomarge»;
// entonces NO es de margen bruto aunque el documento lo sea.
//
// NO TOCA importes, líneas ni categorías: solo agrega los dos campos. Idempotente: un campo que ya está queda como está.
// USO: node tools/ingreso-base.mjs [--pais xx] [--escribir]     ensayo por defecto: cuántos ejercicios de cada base y cuáles son de margen o reconstruidos
// ============================================================================
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { modificarClub, leerJsonClub } from './club-json.mjs';
import { deJson } from './json-datos.mjs';

const { baseDeIngreso } = createRequire(import.meta.url)('./ingreso-derivado.js');
const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const pais = A.includes('--pais') ? A[A.indexOf('--pais') + 1] : null;
const escribir = A.includes('--escribir');

// La base de un ejercicio y, si corresponde, su derivación. `c` es el club en el formato del sitio (deJson).
export function baseDelEjercicio(c, y) {
  const meta = (c.datos.fiscalYearMeta || {})[y]; if (!meta) return null;
  const lineas = (c.datos.revenueLinesByYear || {})[y] || []; if (!lineas.length) return null;
  const fuente = c.sources[meta.sourceId];
  return baseDeIngreso({ lineas, sinDesglose: meta.sinDesglose, documento: fuente && fuente.documento, totalRevenue: meta.officialTotalRevenue, sourceId: meta.sourceId });
}

function completar(c, aplicar) {
  const r = { full: 0, sales_total: 0, gross_margin: 0, derivadas: [], margen: [], sinMeta: 0, sinMetaAnios: [], yaEstaba: 0 };
  for (const y of Object.keys(c.datos.revenueLinesByYear || {})) {
    const b = baseDelEjercicio(c, y);
    if (!b) { r.sinMeta++; r.sinMetaAnios.push(y); continue; }
    r[b.base]++;
    if (b.derivacion) r.derivadas.push(y);
    if (b.base === 'gross_margin') r.margen.push(y);
    const meta = c.datos.fiscalYearMeta[y];
    // un año ya marcado se deja, salvo que ahora se reconozca reconstruido y no lleve su derivación (la regla de ingreso-derivado.js se afina con los casos)
    if (meta.baseIngreso) { r.yaEstaba++; if (aplicar && b.derivacion && !meta.derivacionIngreso) meta.derivacionIngreso = b.derivacion; continue; }
    if (aplicar) { meta.baseIngreso = b.base; if (b.derivacion) meta.derivacionIngreso = b.derivacion; }
  }
  return r;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const tot = { full: 0, sales_total: 0, gross_margin: 0, sinMeta: 0, yaEstaba: 0 }; const margen = {}, derivadas = {};
  for (const iso of readdirSync(resolve(ROOT, 'data'), { withFileTypes: true }).filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name)).map((d) => d.name)) {
    if (pais && iso !== pais) continue;
    for (const id of readdirSync(resolve(ROOT, 'data', iso)).filter((x) => x.endsWith('.json')).map((f) => f.replace(/\.json$/, ''))) {
      let r;
      if (escribir) modificarClub(id, (c) => { r = completar(c, true); });
      else r = completar(deJson(leerJsonClub(id)), false);
      for (const k of Object.keys(tot)) tot[k] += r[k];
      if (r.sinMetaAnios.length) console.log(`  sin meta o sin ingresos: ${id} ${r.sinMetaAnios.join(', ')}`);
      if (r.margen.length) margen[id] = r.margen;
      if (r.derivadas.length) derivadas[id] = r.derivadas;
    }
  }
  console.log(`${escribir ? 'Escrito' : 'Ensayo'}: full ${tot.full} · sales_total ${tot.sales_total} · gross_margin ${tot.gross_margin} · sin meta ${tot.sinMeta} · ya marcados ${tot.yaEstaba}`);
  console.log(`Reconstruidos (revenue_derivation): ${Object.values(derivadas).flat().length}`);
  for (const [id, ys] of Object.entries(derivadas)) console.log(`  ${id}: ${ys.join(', ')}`);
  console.log(`De margen bruto: ${Object.values(margen).flat().length}`);
  for (const [id, ys] of Object.entries(margen)) console.log(`  ${id}: ${ys.join(', ')}`);
}

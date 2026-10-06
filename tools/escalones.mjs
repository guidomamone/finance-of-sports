#!/usr/bin/env node
// ============================================================================
// tools/escalones.mjs — EN QUÉ ESCALÓN SALIÓ CADA DATO (to-do 140(h), Versión 525, aprobado por Guido el 2026-10-05). Gratis, sin IA.
//
// POR QUÉ (Admin/Archive/auditoria-pipeline-2026-10-02.md, "propuesta transversal"): sin un conteo por escalón no se puede ver qué escalón no se
// usa nunca o cuál carga con todo. Junta lo que el pipeline ya deja en Generados/:
//   ETAPA 4  `.validacion.json` → `fuentes`: con qué se confirmó cada PÁGINA (texto propio del PDF, Gemini, Claude).
//   ETAPA 8  `.carga.json` → `_escalon` de cada línea (categoría) y `procedencia` (Versión 525): de dónde salió el año, el cierre, el
//            perímetro, la moneda, el tipo de cambio y la liga (el texto que arma alta-club.mjs, más lo que cargar.mjs decide encima).
// Una propuesta de carga anterior a la Versión 525 no tiene `procedencia`: --rehacer-procedencia la completa con alta-club.mjs (gratis),
// escribiendo SOLO ese campo (no cambia `generado`, que lote.mjs usa para saber si la propuesta está al día).
//
// USO:
//   node tools/escalones.mjs                       (o node tools/estado.mjs --escalones)
//   node tools/escalones.mjs --rehacer-procedencia completa `procedencia` donde falta y después muestra el conteo
// ============================================================================

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const archivos = walk(resolve(ROOT, 'Generados'));
const leer = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };
const sumar = (m, k, n = 1) => m.set(k, (m.get(k) || 0) + n);
const imprimir = (titulo, m) => { console.log(`\n${titulo}`); for (const [k, n] of [...m].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(6)}  ${k}`); };

// El texto de procedencia agrupado por su forma, sin los datos del caso (fechas, montos, comillas, lo que va entre paréntesis).
const forma = (t) => String(t || 'sin dato').replace(/\([^()]*\)/g, '').replace(/\([^()]*\)/g, '').replace(/"[^"]*"/g, '"…"').replace(/\d[\d.,/-]*/g, 'N')
  .split(/;|:(?=\s)/)[0].replace(/\s+/g, ' ').trim().slice(0, 90);

const cargas = archivos.filter((p) => p.endsWith('.carga.json'));
if (process.argv.includes('--rehacer-procedencia')) {
  let n = 0;
  for (const p of cargas) {
    const c = leer(p); if (!c || c.procedencia || !c.pdf || !existsSync(resolve(ROOT, c.pdf))) continue;
    const r = spawnSync('node', [resolve(ROOT, 'tools/alta-club.mjs'), c.pdf], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    let a; try { a = JSON.parse(r.stdout.slice(r.stdout.indexOf('{'))); } catch { continue; }
    if (!a?.ejercicio?.campos) continue;
    c.procedencia = Object.fromEntries(a.ejercicio.campos.map((x) => [x.campo, { valor: x.valor ?? null, fuente: x.fuente || null, estado: x.estado || null }]));
    c.procedencia._rehecha = 'tools/escalones.mjs --rehacer-procedencia (alta-club.mjs; sin lo que cargar.mjs decide encima del perímetro)';
    writeFileSync(p, JSON.stringify(c, null, 1)); n++;
    if (n % 25 === 0) process.stdout.write(`  ${n}\r`);
  }
  console.log(`procedencia completada en ${n} propuesta(s) de carga`);
}

// ETAPA 4
const e4 = new Map(); let docs4 = 0; let conf = 0; let noConf = 0;
for (const p of archivos.filter((x) => x.endsWith('.validacion.json'))) {
  const v = leer(p); if (!v) continue; docs4++;
  for (const f of Object.values(v.fuentes || {})) sumar(e4, String(f));
  conf += typeof v.confirmados === 'number' ? v.confirmados : (v.confirmados || []).length; noConf += (v.noConfirmados || []).length;
}
console.log(`ETAPAS 4 Y 8: EN QUÉ ESCALÓN SALIÓ CADA DATO (Generados/: ${docs4} validaciones, ${cargas.length} propuestas de carga)`);
imprimir(`ETAPA 4 · con qué se confirmó cada página (${conf} números confirmados, ${noConf} sin confirmar)`, e4);

// ETAPA 8
const cat = new Map(); const catF = new Map(); const campos = new Map(); let sinProc = 0;
for (const p of cargas) {
  const c = leer(p); if (!c) continue;
  for (const l of [...(c.ejercicio?.revenueLines || []), ...(c.ejercicio?.expenseLines || [])]) { sumar(cat, `escalón ${l._escalon ?? '?'}`); if (l._fuenteCat) sumar(catF, forma(l._fuenteCat)); }
  if (!c.procedencia) { sinProc++; continue; }
  for (const [k, v] of Object.entries(c.procedencia)) {
    if (k.startsWith('_') || k === 'sourceId' || k === 'reportType') continue;
    if (!campos.has(k)) campos.set(k, new Map());
    sumar(campos.get(k), `${v.estado && v.estado !== 'ok' ? `[${v.estado}] ` : ''}${forma(v.fuente)}`);
  }
}
imprimir('ETAPA 7-8 · categoría de cada línea (`_escalon` de cargar.mjs: 0 precedente del club, ajuste o respuesta de Guido · 1 Jev con confianza · 2 Claude, o una categoría rechazada que va a "otros" · materialidad)', cat);
  if (catF.size) imprimir('ETAPA 7-8 · el motivo de cada categoría (`_fuenteCat`, desde la Versión 525)', catF);
for (const [k, m] of campos) imprimir(`ETAPA 8 · ${k}`, m);
if (sinProc) console.log(`\n${sinProc} propuesta(s) de carga sin \`procedencia\` (anteriores a la Versión 525): node tools/escalones.mjs --rehacer-procedencia`);

#!/usr/bin/env node
// ============================================================================
// tools/duraciones-mediciones.mjs — cuánto tarda cada medidor de `medir-pipeline`, por nivel de lote.
//
// POR QUÉ. Una medición de un cambio a una tool compartida tarda de 6 a 12 minutos y no se sabía en cuál medidor se iba el tiempo. `medir-pipeline.mjs` guarda los segundos de cada corrida de un medidor
// en `Admin/mediciones/pipeline/<clave>/listo`; `Admin/registros/mediciones-pipeline.jsonl` dice qué clave fue de qué medidor, nivel, antes o después. Esto los une y los ordena. Solo lee.
//
// USO:
//   node tools/duraciones-mediciones.mjs              una línea por medidor y nivel: corridas, máximo y mediana (de más lento a más rápido)
//   node tools/duraciones-mediciones.mjs --medidor escribir   solo ese medidor
// Una medición corre cada medidor dos veces (antes y después), así que el tiempo de una medición es el doble de la suma de los medidores del plan (`node tools/medir-pipeline.mjs --ensayo` los dice).
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const solo = A.includes('--medidor') ? A[A.indexOf('--medidor') + 1] : null;
const reg = resolve(ROOT, 'Admin/registros/mediciones-pipeline.jsonl');
if (!existsSync(reg)) { console.error('No hay Admin/registros/mediciones-pipeline.jsonl'); process.exit(1); }
const por = {};
for (const l of readFileSync(reg, 'utf8').split('\n').filter(Boolean)) {
  let j; try { j = JSON.parse(l); } catch { continue; }
  for (const m of j.medidores || []) {
    if (solo && m.medidor !== solo) continue;
    for (const lado of ['antes', 'despues']) {
      const d = m[lado]; if (!d) continue;
      const f = resolve(ROOT, String(d).replace(/\/salida$/, ''), 'listo'); if (!existsSync(f)) continue;
      let s; try { s = JSON.parse(readFileSync(f, 'utf8')).segundos; } catch { continue; }
      if (typeof s === 'number') (por[`${m.medidor} · ${m.nivel}`] ||= []).push(s);
    }
  }
}
const filas = Object.entries(por).map(([k, v]) => { v.sort((a, b) => a - b); return { k, n: v.length, max: v[v.length - 1], mediana: v[Math.floor(v.length / 2)] }; }).sort((a, b) => b.mediana - a.mediana);
if (!filas.length) { console.log('Sin duraciones guardadas para ese filtro.'); process.exit(0); }
console.log('medidor · nivel'.padEnd(32), 'corridas  máximo  mediana');
for (const f of filas) console.log(f.k.padEnd(32), String(f.n).padStart(8), `${String(f.max).padStart(6)} s`, `${String(f.mediana).padStart(6)} s`);

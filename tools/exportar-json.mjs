#!/usr/bin/env node
// ============================================================================
// tools/exportar-json.mjs — Lee data/<país>/*-data.js y escribe UN JSON por club con el esquema de Admin/mediciones/245-esquema.md.
// Fase 2: es la MIGRACIÓN de una sola vez (JS -> JSON fuente en data/<país>/<id>.json). Desde que el JSON es la fuente ya no se usa: leería un JS
// generado. Default: escribe en data/<país>/<id>.json (--salida <carpeta> para mirar sin tocar data/).
//
// USO:
//   node tools/exportar-json.mjs                       los 313 clubes
//   node tools/exportar-json.mjs --club mirassol       uno
//   node tools/exportar-json.mjs --salida <carpeta>    otra carpeta de salida
//   node tools/exportar-json.mjs --fecha 2026-10-20    el exported_at (default hoy)
// ============================================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { todosLosArchivos, leerClub, aJson } from './json-datos.mjs';
import { serializar } from './club-json.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
const salida = resolve(flag('--salida') || resolve(ROOT, 'data'));
const solo = flag('--club'); const fecha = flag('--fecha') || new Date().toISOString().slice(0, 10);
let ok = 0, mal = 0, bytes = 0;
for (const rel of todosLosArchivos()) {
  const id = rel.split('/').pop().replace(/-data\.js$/, ''); if (solo && id !== solo) continue;
  try {
    const j = aJson(leerClub(rel), { exportadoEn: fecha }); const pais = rel.split('/')[1];
    const dest = resolve(salida, pais, `${id}.json`); mkdirSync(dirname(dest), { recursive: true });
    const txt = serializar(j) + '\n'; writeFileSync(dest, txt); bytes += txt.length; ok++;
  } catch (e) { mal++; console.log(`  ${rel}: ${e.message}`); }
}
console.log(`${ok} clubes exportados a ${salida} (${(bytes / 1e6).toFixed(1)} MB)${mal ? `; ${mal} con error` : ''}`);
process.exit(mal ? 1 : 0);

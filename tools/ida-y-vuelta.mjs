#!/usr/bin/env node
// ============================================================================
// tools/ida-y-vuelta.mjs — La prueba: data/<país>/*-data.js -> JSON (aJson, pasando por texto como en un archivo) -> validar ->
// JS generado (generarJs) -> se evalúa en un entorno limpio -> se compara, objeto por objeto, con el JS actual. Estricto: -0, null y clave ausente
// se distinguen; el orden de las claves no cuenta. Solo lectura: no escribe nada (con --escribir deja el JS generado en una carpeta para mirarlo).
//
// USO: node tools/ida-y-vuelta.mjs [--club <id>] [--detalle] [--escribir <carpeta>]
// ============================================================================
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { todosLosArchivos, leerClub, aJson, generarJs, evaluarJs, diferencias, validar, categoriasDelSitio, referenciasExternas } from './json-datos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
const solo = flag('--club'); const detalle = A.includes('--detalle'); const destino = flag('--escribir');
const categorias = categoriasDelSitio(); const externos = referenciasExternas();
let n = 0, iguales = 0, conAvisos = 0; const avisados = []; const distintos = []; const sinExportar = []; const noValidan = []; let lineas = 0, anios = 0;
for (const rel of todosLosArchivos()) {
  const id = rel.split('/').pop().replace(/-data\.js$/, ''); if (solo && id !== solo) continue; n++;
  let orig; try { orig = leerClub(rel); } catch (e) { sinExportar.push([id, `no se pudo leer: ${e.message}`]); continue; }
  // Con el JSON en disco (fase 2) se prueba EL ARCHIVO; sin él, la exportación del JS (fase 1).
  const rj = rel.replace(/-data\.js$/, '.json');
  let j; try { j = existsSync(resolve(ROOT, rj)) ? JSON.parse(readFileSync(resolve(ROOT, rj), 'utf8')) : JSON.parse(JSON.stringify(aJson(orig, { exportadoEn: '2026-10-20' }))); } catch (e) { sinExportar.push([id, e.message]); continue; }
  for (const y of j.years) { anios++; lineas += (y.revenue || []).length + (y.expenses || []).length; }
  const v = validar(j, { categorias, externos }); if (v.errores.length) noValidan.push([id, v.errores]); if (v.avisos.length) { conAvisos++; avisados.push([id, v.avisos]); }
  let vuelta; try { const txt = generarJs(j); if (destino) { mkdirSync(resolve(destino), { recursive: true }); writeFileSync(resolve(destino, `${id}-data.js`), txt); } vuelta = evaluarJs(txt, id); } catch (e) { distintos.push([id, [{ ruta: '(generar/evaluar)', antes: '', despues: e.message }]]); continue; }
  const d = diferencias(orig, vuelta); if (d.length) distintos.push([id, d]); else iguales++;
}
console.log(`${n} clubes · ${anios} ejercicios · ${lineas} líneas`);
console.log(`ida y vuelta idéntica: ${iguales} · distinta: ${distintos.length} · no se pudo exportar: ${sinExportar.length} · el JSON no valida: ${noValidan.length} · con avisos (valida, pero con algo raro): ${conAvisos}`);
for (const [id, m] of sinExportar.slice(0, 30)) console.log(`  SIN EXPORTAR ${id}: ${m}`);
for (const [id, m] of avisados.slice(0, 30)) console.log(`  AVISO ${id}: ${m.slice(0, 3).join(' | ')}${m.length > 3 ? ` (+${m.length - 3})` : ''}`);
for (const [id, m] of noValidan.slice(0, 30)) console.log(`  NO VALIDA ${id}: ${m.slice(0, 3).join(' | ')}${m.length > 3 ? ` (+${m.length - 3})` : ''}`);
for (const [id, d] of distintos.slice(0, detalle ? 200 : 30)) { console.log(`  DISTINTO ${id}: ${d.length} diferencia(s)`); for (const x of d.slice(0, detalle ? 10 : 3)) console.log(`     ${x.ruta}: ${x.antes}  ->  ${x.despues}`); }
process.exit(distintos.length || sinExportar.length || noValidan.length ? 1 : 0);

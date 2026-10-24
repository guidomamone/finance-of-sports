#!/usr/bin/env node
// ============================================================================
// tools/calibrar-cola.mjs — `fos calibrar-cola`: CUÁNTO ACIERTA UNA RESPUESTA DE LA COLA, según su seguridad, medido con una segunda revisión independiente
//
// POR QUÉ. Cada respuesta de la cola lleva `seguridad` (alta, media, baja) y `causa`, pero nadie sabe cuántas de las «alta» son de verdad altas. Una muestra de respuestas se vuelve a mirar
// con otro revisor que no ve la respuesta original; el registro (Admin/registros/calibracion-cola.jsonl) guarda si coincidió. Con eso `fos calibrar-cola` da el acierto por (motivo, seguridad), y se puede
// recalibrar: qué respuestas pueden salir solas, cuáles piden mirada. Solo lee la cola y escribe su propio registro; no toca datos.
//
// USO
//   node tools/calibrar-cola.mjs                        tabla: por motivo y seguridad, cuántas respuestas hay, cuántas se volvieron a medir y cuántas coincidieron
//   node tools/calibrar-cola.mjs --muestra N [--motivo m] [--seguridad s] [--semilla k]   N respuestas sin segunda revisión, al azar (determinista con --semilla), con md y evidencia, para un revisor que NO ve la decisión original
//   node tools/calibrar-cola.mjs --registrar <id> <aceptar|corregir> [--valor "…"] [--por "quién"] [--nota "…"]   anota la segunda revisión de una respuesta y si coincidió con la original
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { validar } from './registro-esquema.js';

const ROOT = resolve(import.meta.dirname, '..');
const COLA = resolve(ROOT, 'Admin/registros/cola-revision.jsonl');
const REGISTRO = resolve(ROOT, 'Admin/registros/calibracion-cola.jsonl');
const REAL = ['aceptar', 'corregir', 'descartar', 'preguntar-club'];
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
const jsonl = (f) => (existsSync(f) ? readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);

const casos = new Map(); const resp = new Map();
for (const r of jsonl(COLA)) { if (r.tipo === 'caso') casos.set(r.id, r); else if (r.tipo === 'respuesta' && REAL.includes(r.decision) && r.seguridad) resp.set(r.id, r); }
const rechequeos = new Map(); for (const r of jsonl(REGISTRO)) rechequeos.set(r.id, r); // el último por id

if (A.includes('--registrar')) {
  const i = A.indexOf('--registrar'); const id = A[i + 1]; const decision = A[i + 2];
  const c = casos.get(id); const o = resp.get(id);
  if (!c || !o) { console.error(`El caso ${id} no tiene una respuesta con seguridad en la cola.`); process.exit(1); }
  if (!['aceptar', 'corregir'].includes(decision)) { console.error('La segunda revisión es aceptar o corregir (--valor "…").'); process.exit(1); }
  if (decision === 'corregir' && !flag('--valor')) { console.error('corregir necesita --valor.'); process.exit(1); }
  const coincide = o.decision === decision && (decision === 'aceptar' || String(o.valor) === String(flag('--valor')));
  const linea = { esquema: 1, id, ts: new Date().toISOString(), motivo: c.motivo, seguridad: o.seguridad, causa: o.causa ?? null, original: o.decision, valor_original: o.valor ?? null, segunda: decision, valor_segunda: flag('--valor'), coincide, por: flag('--por') || 'sesion', ...(flag('--nota') ? { nota: flag('--nota') } : {}) };
  const fuera = validar('calibracion-cola', linea);
  if (fuera.length) { console.error(`No cumple el esquema (${fuera.join('; ')}); no se anotó.`); process.exit(1); }
  appendFileSync(REGISTRO, JSON.stringify(linea) + '\n');
  console.log(`${id} (${c.motivo}, seguridad ${o.seguridad}): ${coincide ? 'coincide' : 'NO coincide'} (original ${o.decision}${o.valor ? ` ${o.valor}` : ''}, segunda ${decision}${flag('--valor') ? ` ${flag('--valor')}` : ''}).`);
  process.exit(0);
}

if (A.includes('--muestra')) {
  const n = Number(flag('--muestra')) || 10; let semilla = Number(flag('--semilla')) || 1;
  const azar = () => { semilla = (semilla * 1664525 + 1013904223) % 4294967296; return semilla / 4294967296; };
  const pool = [...resp.values()].filter((r) => !rechequeos.has(r.id) && casos.has(r.id) && (!flag('--motivo') || casos.get(r.id).motivo === flag('--motivo')) && (!flag('--seguridad') || r.seguridad === flag('--seguridad')));
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(azar() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  for (const r of pool.slice(0, n)) { const c = casos.get(r.id); console.log(JSON.stringify({ id: r.id, md: c.md, motivo: c.motivo, detalle: c.detalle, pregunta: c.que, propuesta_del_sistema: c.propuesta ?? c.cierrePropuesto ?? null, evidencia_original: r.evidencia ?? null })); }
  console.error(`${Math.min(n, pool.length)} de ${pool.length} respuestas sin segunda revisión.`);
  process.exit(0);
}

// tabla
const fila = new Map();
for (const r of resp.values()) {
  const c = casos.get(r.id); if (!c) continue; const k = `${c.motivo}|${r.seguridad}`;
  const f = fila.get(k) || { motivo: c.motivo, seguridad: r.seguridad, n: 0, medidas: 0, coinciden: 0 };
  f.n++; const m = rechequeos.get(r.id); if (m) { f.medidas++; if (m.coincide) f.coinciden++; }
  fila.set(k, f);
}
const orden = { alta: 0, media: 1, baja: 2 };
console.log(`RESPUESTAS DE LA COLA CON SEGURIDAD: ${resp.size} · con segunda revisión: ${[...rechequeos.values()].length}\n`);
console.log('motivo'.padEnd(22), 'seg.'.padEnd(6), 'resp.'.padStart(6), 'medidas'.padStart(8), 'coinciden'.padStart(10), 'acierto'.padStart(8));
for (const f of [...fila.values()].sort((a, b) => a.motivo.localeCompare(b.motivo) || orden[a.seguridad] - orden[b.seguridad])) {
  console.log(f.motivo.padEnd(22), f.seguridad.padEnd(6), String(f.n).padStart(6), String(f.medidas).padStart(8), String(f.coinciden).padStart(10), (f.medidas ? `${Math.round((100 * f.coinciden) / f.medidas)}%` : '-').padStart(8));
}
console.log('\nCon pocas medidas el porcentaje no dice nada: 20 a 30 por celda, como mínimo. Muestra: node tools/calibrar-cola.mjs --muestra 20 --motivo <m> --seguridad <s>');

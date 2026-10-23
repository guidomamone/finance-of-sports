#!/usr/bin/env node
// ============================================================================
// tools/gasto.mjs — cuánta plata de API se gastó, en qué motor, en qué día y en qué documento. GRATIS: solo lee logs, no llama a nada.
//
// Por qué existe: el objetivo del pipeline es "barato en dólares de API", y hasta ahora no había una forma de mirar
// el gasto sin sumar a mano los `resultados.jsonl`. Sin este número no se puede comparar un piloto contra otro ("¿el flujo nuevo
// cuesta menos por documento?") ni detectar plata tirada.
//
// De dónde sale cada número:
//   - Admin/registros/api/mistral.jsonl, Admin/registros/api/gemini.jsonl, Admin/registros/api/claude-api.jsonl: una línea por llamada
//     con `costUsd`. OJO: cuando la llamada la hace tools/resolver-inventario.mjs, el `pdf` de esos logs es un archivo temporal
//     (`/var/folders/.../lote0.pdf`, las páginas recortadas), así que NO sirve para saber de qué documento era. Por eso:
//   - Admin/registros/transcripciones-verificaciones.jsonl: el resolver deja ahí `costoUsd` POR DOCUMENTO (lo que gastó validándolo).
//     Es la fuente del gasto por documento de la fase de validación. La transcripción inicial de Mistral sí trae la ruta real.
//   - Jev no registra costo (solo tokens en los backtests); se informa aparte como "sin registro".
//
// PLATA TIRADA que detecta (bloque "Pagado sin .md"): transcripciones de Mistral registradas cuyo `.md` ya no existe en disco.
// Encontrado el 2026-09-30: 21 PDFs (River, AEK, Olympiacos), US$ 4,52, transcriptos el 27-28/09 y nunca commiteados; el registro los
// mostraba como `sin-md` y el pipeline los habría vuelto a pagar sin avisar. (Los `-mistral-test.md` y `.mistral-redo.md` de los tests se
// ignoran: tienen otro nombre a propósito.)
//
// USO:
//   node tools/gasto.mjs                    resumen por motor y por día, top documentos, pagado sin .md
//   node tools/gasto.mjs --desde 2026-09-30 solo lo gastado desde esa fecha (UTC), para medir un piloto
//   node tools/gasto.mjs --lista Admin/mi-piloto.txt   gasto por documento de los PDFs de esa lista (una ruta por línea)
//   node tools/gasto.mjs --sesion fos-pipeline   solo lo gastado por esa sesión (la carpeta del worktree; tools/sesion.mjs la marca en cada línea de los logs de API)
//   node tools/gasto.mjs --json             todo en JSON
// POR SESIÓN: cada llamada nueva lleva `sesion`; lo anterior a la marca figura como «(sin marca)». Así la Auditora controla el presupuesto de cada sesión sin sumar a mano.
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const desde = flagVal('--desde');
const listaPath = flagVal('--lista');
const sesionSel = flagVal('--sesion');
const JSON_OUT = args.includes('--json');

const readJsonl = (rel) => {
  const p = resolve(root, rel);
  if (!existsSync(p)) return [];
  return readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
};
const enRango = (r) => (!desde || String(r.ts || '') >= desde) && (!sesionSel || (r.sesion || '(sin marca)') === sesionSel);
const usd = (n) => `$${n.toFixed(2)}`;

// ---------------------------------------------------------------- por motor y por día
const motores = { mistral: 'Admin/registros/api/mistral.jsonl', gemini: 'Admin/registros/api/gemini.jsonl', 'claude-api': 'Admin/registros/api/claude-api.jsonl' };
const porMotor = {}; const porDia = {}; const porSesion = {};
for (const [motor, rel] of Object.entries(motores)) {
  for (const r of readJsonl(rel).filter(enRango)) {
    const c = Number(r.costUsd) || 0;
    porMotor[motor] ??= { llamadas: 0, usd: 0, paginas: 0 };
    porMotor[motor].llamadas++; porMotor[motor].usd += c; porMotor[motor].paginas += Number(r.pagesProcessed) || 0;
    const ses = r.sesion || '(sin marca)'; porSesion[ses] ??= { llamadas: 0, usd: 0 }; porSesion[ses].llamadas++; porSesion[ses].usd += c;
    const dia = String(r.ts || '').slice(0, 10) || 'sin fecha';
    porDia[dia] ??= {}; porDia[dia][motor] = (porDia[dia][motor] || 0) + c;
  }
}

// ---------------------------------------------------------------- disparador de HALLAZGOS: el paso A2 del perímetro
// Admin/HALLAZGOS-pipeline.md, «Achicar el texto del paso A2»: se retoma si A2 pasa del 15% del gasto de API. Esa condición la mira esta tool
// (el denominador es todo lo registrado en el rango pedido, los tres motores; la tarea es `perimetro-a2`, sin las corridas de medición).
const TECHO_A2 = 0.15;
const usdA2 = readJsonl(motores['claude-api']).filter(enRango).filter((r) => r.tarea === 'perimetro-a2').reduce((a, r) => a + (Number(r.costUsd) || 0), 0);

// ---------------------------------------------------------------- por documento
// Transcripción inicial (Mistral con ruta real) + validación (costoUsd del resolver, último registro por .md y todos los intentos sumados).
const porDoc = {};
const doc = (pdf) => (porDoc[pdf] ??= { transcripcion: 0, validacion: 0, intentosValidacion: 0 });
for (const r of readJsonl(motores.mistral).filter(enRango)) {
  if (!r.pdf || r.pdf.startsWith('/')) continue; // temporales del resolver: ya están en costoUsd de la verificación
  doc(r.pdf).transcripcion += Number(r.costUsd) || 0;
}
// OJO: la misma validación aparece más de una vez en el historial — después de categorizar, el pipeline vuelve a escribir el registro
// con el campo `jev` agregado, copiando `costoUsd` y `method` (medido: Botafogo 2025 figuraba con $2,71 en "2 intentos" cuando se pagó
// $1,35 una sola vez). Se cuenta una sola vez cada par (md, método, costo).
// OJO 2: cuando el resolver transcribe un PDF sin .md (Mistral con la ruta REAL, no un temporal), ese costo entra también en el
// `costoUsd` de la validación (el resolver suma todo lo que gastó en el documento). Se descuenta de la validación la transcripción de
// Mistral de ese PDF hecha entre la validación anterior y esta (medido en el piloto C: Groningen figuraba $0,14 + $0,14 con un solo
// Mistral de $0,14 y 0 páginas a Claude).
const mistralPorPdf = {};
for (const r of readJsonl(motores.mistral)) if (r.pdf && !r.pdf.startsWith('/')) (mistralPorPdf[r.pdf] ??= []).push({ ts: String(r.ts), usd: Number(r.costUsd) || 0 });
const ultimaVerif = {};
const yaContado = new Set();
for (const v of readJsonl('Admin/registros/transcripciones-verificaciones.jsonl')) {
  if (!v.md) continue;
  const pdf = v.md.replace(/\.md$/, '.pdf');
  const desde = ultimaVerif[pdf] || ''; ultimaVerif[pdf] = String(v.ts);
  if (!v.costoUsd || !enRango(v)) continue;
  const clave = `${v.md}|${v.method}|${v.costoUsd}`;
  if (yaContado.has(clave)) continue; yaContado.add(clave);
  const adentro = (mistralPorPdf[pdf] || []).filter((m) => m.ts > desde && m.ts <= String(v.ts)).reduce((a, m) => a + m.usd, 0);
  const d = doc(pdf);
  d.validacion += Math.max(0, (Number(v.costoUsd) || 0) - adentro); d.intentosValidacion++;
}

// ---------------------------------------------------------------- pagado sin .md
const pagadoSinMd = [];
const vistos = new Set();
for (const r of readJsonl(motores.mistral)) {
  if (!r.md || r.md.startsWith('/') || /-mistral-test\.md$|\.mistral-redo\.md$|\.t-[^/]*\.md$/.test(r.md)) continue;
  if (vistos.has(r.md)) continue; vistos.add(r.md);
  if (!existsSync(resolve(root, r.md))) pagadoSinMd.push({ md: r.md, fecha: String(r.ts).slice(0, 10), usd: Number(r.costUsd) || 0 });
}

// ---------------------------------------------------------------- salida
let docsSel = Object.entries(porDoc);
if (listaPath) {
  const lista = new Set(readFileSync(resolve(root, listaPath), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')));
  docsSel = docsSel.filter(([pdf]) => lista.has(pdf));
}
const total = Object.values(porMotor).reduce((a, m) => a + m.usd, 0);
// process.exit antes de vaciar stdout cortaba el JSON a los 64 KB en un pipe: se sale cuando la escritura terminó.
const a2 = { usd: usdA2, parteDelGasto: total > 0 ? usdA2 / total : 0, techo: TECHO_A2, retomar: total > 0 && usdA2 / total > TECHO_A2 };
if (JSON_OUT) { await new Promise((fin) => process.stdout.write(JSON.stringify({ desde, sesion: sesionSel, a2, porMotor, porSesion, porDia, porDoc: Object.fromEntries(docsSel), pagadoSinMd }, null, 1) + '\n', fin)); process.exit(0); }

console.log(`Gasto registrado${desde ? ` desde ${desde}` : ''}${sesionSel ? ` de la sesión ${sesionSel}` : ''}: ${usd(total)} (Jev: sin registro de costo)`);
for (const [m, v] of Object.entries(porMotor)) console.log(`  ${m.padEnd(11)} ${usd(v.usd).padStart(9)}  ${v.llamadas} llamadas${v.paginas ? `, ${v.paginas} páginas` : ''}`);
console.log(`  Paso A2 del perímetro: ${usd(a2.usd)}, ${(a2.parteDelGasto * 100).toFixed(1)}% del gasto de API (techo ${TECHO_A2 * 100}%)${a2.retomar ? ' -> PASÓ EL TECHO: retomar «Achicar el texto del paso A2» en Admin/HALLAZGOS-pipeline.md' : ''}`);
console.log('\nPor sesión:');
for (const [s, v] of Object.entries(porSesion).sort((x, y) => y[1].usd - x[1].usd)) console.log(`  ${s.padEnd(22)} ${usd(v.usd).padStart(9)}  ${v.llamadas} llamadas`);
console.log('\nPor día:');
for (const [d, v] of Object.entries(porDia).sort()) console.log(`  ${d}  ${usd(Object.values(v).reduce((a, x) => a + x, 0)).padStart(8)}   ${Object.entries(v).map(([m, x]) => `${m} ${usd(x)}`).join(' · ')}`);
const conGasto = docsSel.map(([pdf, d]) => ({ pdf, ...d, total: d.transcripcion + d.validacion })).filter((d) => d.total > 0).sort((a, b) => b.total - a.total);
if (conGasto.length) {
  const t = conGasto.reduce((a, d) => a + d.total, 0);
  console.log(`\nPor documento (${conGasto.length} documentos, ${usd(t)}, promedio ${usd(t / conGasto.length)}):`);
  for (const d of (listaPath ? conGasto : conGasto.slice(0, 15))) console.log(`  ${usd(d.total).padStart(7)}  (transcr. ${usd(d.transcripcion)}, valid. ${usd(d.validacion)}${d.intentosValidacion > 1 ? ` en ${d.intentosValidacion} intentos` : ''})  ${d.pdf}`);
}
if (pagadoSinMd.length) {
  console.log(`\nPagado sin .md en disco (${pagadoSinMd.length} transcripciones, ${usd(pagadoSinMd.reduce((a, x) => a + x.usd, 0))}): se volverían a pagar.`);
  for (const p of pagadoSinMd.slice(0, 25)) console.log(`  ${p.fecha}  ${usd(p.usd)}  ${p.md}`);
}

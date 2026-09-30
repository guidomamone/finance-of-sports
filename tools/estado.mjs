#!/usr/bin/env node
// ============================================================================
// tools/estado.mjs — EL tablero del inventario: dónde está cada PDF, qué le falta, con qué comando se avanza y cuánto cuesta. Gratis.
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30: "tenemos demasiados estados abiertos y me marea. Pasame un código para que la terminal
// pueda hacer esa consulta siempre que quiera"). Los estados vienen de Admin/transcripciones-estado.jsonl (lo escribe
// tools/inventario-transcripciones.mjs) y de los archivos derivados de Generados/ (huellas de la categorización, tools/huellas.mjs).
//
// USO:
//   node tools/estado.mjs                 lee el registro tal como está (instantáneo) y dice de cuándo es
//   node tools/estado.mjs --actualizar    regenera el registro antes (~1 minuto, sin API)
//   node tools/estado.mjs --dir Clubes/Brasil    solo una carpeta
// ============================================================================

import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { jevAlDia, categoriasAlDia } from './huellas.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const dir = flagVal('--dir');
const regPath = resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl');

if (args.includes('--actualizar') || !existsSync(regPath)) {
  process.stdout.write('Regenerando el registro (sin API)... ');
  spawnSync('node', [resolve(ROOT, 'tools/inventario-transcripciones.mjs')], { cwd: ROOT, stdio: 'ignore' });
  console.log('listo.');
}
const R = readFileSync(regPath, 'utf8').trim().split('\n').map((l) => JSON.parse(l)).filter((e) => !dir || e.pdf.startsWith(dir.replace(/\/$/, '') + '/'));
const edad = Math.round((Date.now() - statSync(regPath).mtimeMs) / 60000);

// Cada estado: qué significa, qué le falta, con qué se avanza y cuánto cuesta por PDF (medido en los pilotos C y D, 2026-09-30).
const ESTADOS = [
  ['cargado', 'En el sitio', 'Nada.', '—', 0],
  ['sin-md', 'Solo PDF, sin transcripción', 'Transcribir (Mistral) y validar.', 'pipeline.mjs --ejecutar', 0.20],
  ['pendiente-segunda-voz', 'Escaneo transcripto, sin validar (no hay texto del PDF para comparar gratis)', 'Segunda voz (Gemini; Claude donde difieran) solo en páginas con números.', 'pipeline.mjs --ejecutar', 0.15],
  ['revisar', 'El chequeo gratis encontró cifras del .md distintas del texto del PDF', 'Resolver: rehace con Mistral si hace falta y paga Claude solo en las páginas dudosas.', 'pipeline.mjs --ejecutar', 0.10],
  ['reintentar', 'Un motor falló por crédito, red o límite', 'Volver a correr (lo retoma solo).', 'pipeline.mjs --ejecutar', 0.10],
  ['sin-tablas', 'El .md no tiene tablas', 'Rehacer con Mistral (una vez).', 'pipeline.mjs --ejecutar', 0.10],
  ['sin-verificar', 'El .md cambió después de validarse', 'Revalidar (gratis si no aparecen dudas).', 'inventario-transcripciones.mjs --verificar', 0],
  ['listo', 'Validado, sin preparar', 'Sacar la lista de rubros (gratis).', 'pipeline.mjs --ejecutar --solo-preparar', 0],
  ['sin-rubros', 'Validado, sin estado de resultados (memoria, acta, informe del auditor, solo notas)', 'Nada: queda como fuente.', '—', 0],
  ['listo-para-jev', 'Validado y con la lista de rubros', 'Categorizar (Jev y Claude) y cargar (etapa 6).', 'pipeline.mjs --ejecutar', 0.04],
  ['no-es-pdf', 'El archivo no es un PDF o está cortado', 'Volver a bajarlo (el link está en fuentes/<País>/<Club>.md).', 'a mano', 0],
];
const clave = (e) => (e.cargado ? 'cargado' : e.jev === 'listo-para-jev' || e.jev === 'sin-rubros' ? e.jev : e.estado);
const cuenta = {}; for (const e of R) cuenta[clave(e)] = (cuenta[clave(e)] || 0) + 1;

console.log(`\nINVENTARIO${dir ? ` (${dir})` : ''}: ${R.length} PDFs · registro de hace ${edad} min${edad > 60 ? ' (node tools/estado.mjs --actualizar para rehacerlo)' : ''}\n`);
let total = 0;
const w = Math.max(...ESTADOS.map((x) => x[1].length));
for (const [k, nombre, falta, cmd, usd] of ESTADOS) {
  const n = cuenta[k] || 0; if (!n) continue;
  const costo = usd ? `~US$ ${Math.round(n * usd)}` : usd === 0 && k !== 'cargado' && k !== 'sin-rubros' ? 'gratis' : '';
  if (usd) total += n * usd;
  console.log(`${String(n).padStart(5)}  ${nombre.padEnd(w)}  ${costo.padEnd(10)}\n       falta: ${falta}${cmd !== '—' ? `  [${cmd}]` : ''}`);
}
const otros = Object.keys(cuenta).filter((k) => !ESTADOS.some((x) => x[0] === k));
for (const k of otros) console.log(`${String(cuenta[k]).padStart(5)}  (estado sin describir: ${k})`);
console.log(`\n       Costo estimado para llevar todo hasta "categorizado": ~US$ ${Math.round(total)} (API; sesión de Claude: 0 tokens)`);

// Detalle de los que tienen rubros: qué les falta para poder cargarse.
const L = R.filter((e) => !e.cargado && e.jev === 'listo-para-jev');
if (L.length) {
  const f = { cat: 0, jev: 0, enSitio: 0, nuevo: 0, noAnual: 0, nombre: 0, reserva: 0 };
  for (const e of L) {
    const md = resolve(ROOT, e.md);
    if (categoriasAlDia(md)) f.cat++; else if (jevAlDia(md)) f.jev++;
    clubDeRuta(e.pdf).clubId ? f.enSitio++ : f.nuevo++;
    if (e.periodo && e.periodo.tipo !== 'anual') f.noAnual++;
    if (e.periodo?.nombreNoCoincide) f.nombre++;
    if ((e.reserva || []).length) f.reserva++;
  }
  console.log(`\nLOS ${L.length} CON RUBROS (listo-para-jev):`);
  console.log(`  categorización al día: ${f.cat} (solo Jev: ${f.jev}; sin categorizar o desactualizada: ${L.length - f.cat - f.jev})`);
  console.log(`  club ya en el sitio: ${f.enSitio} · club nuevo (necesita alta): ${f.nuevo}`);
  console.log(`  no anuales (trimestral, semestral...; no se cargan como ejercicio): ${f.noAnual} · nombre del archivo con otra fecha que el contenido: ${f.nombre}`);
  console.log(`  con páginas "con reserva" (cerrar con sumas al cargar): ${f.reserva}`);
}
// Altas de clubes nuevos.
const altas = resolve(ROOT, 'Admin', 'altas-club.jsonl');
if (existsSync(altas)) {
  const A = readFileSync(altas, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const c = {}; for (const a of A) c[a.estado] = (c[a.estado] || 0) + 1;
  console.log(`\nALTAS DE CLUBES NUEVOS (Admin/altas-club.jsonl): ${Object.entries(c).map(([k, v]) => `${k} ${v}`).join(' · ')}   [node tools/alta-club.mjs --todos]`);
}
console.log('\nCARGA AL SITIO (etapa 6): todavía no existe; ver Admin/HANDOFF-pipeline.md.\n');

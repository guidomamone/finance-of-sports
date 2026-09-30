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

// ETAPAS del proyecto, EN ORDEN (pedido de Guido, 2026-09-30: "que me dé una imagen comprehensive, ordenada según la secuencia del
// proyecto, con las categorías en 0 también; no es un waterfall, así que en distintas tablas según el proceso"). Cada fila: clave del
// registro, qué significa, qué le falta, con qué se avanza, US$ por PDF (medido en los pilotos C y D, 2026-09-30).
const ETAPAS = [
  ['1. CONSEGUIR EL PDF (el sourcing no pasa por este registro: acá solo aparecen los PDFs que llegaron rotos)', [
    ['no-es-pdf', 'El archivo no es un PDF o está cortado', 'Volver a bajarlo (el link está en fuentes/<País>/<Club>.md).', 'a mano', 0],
  ]],
  ['2. TRANSCRIBIR', [
    ['sin-md', 'Solo PDF, sin transcripción', 'Transcribir (Mistral) y validar.', 'pipeline.mjs --ejecutar', 0.20],
    ['sin-tablas', 'Transcripción vieja sin tablas', 'Rehacer con Mistral (una vez).', 'pipeline.mjs --ejecutar', 0.10],
  ]],
  ['3. VALIDAR LOS NÚMEROS', [
    ['sin-verificar', 'El .md cambió después de validarse', 'Revalidar (gratis si no aparecen dudas).', 'inventario-transcripciones.mjs --verificar --estado sin-verificar', 0],
    ['pendiente-segunda-voz', 'Escaneo sin validar (no hay texto del PDF para comparar gratis)', 'Segunda voz (Gemini; Claude donde difieran) solo en páginas con números.', 'pipeline.mjs --ejecutar', 0.15],
    ['revisar', 'El chequeo gratis encontró cifras distintas del texto del PDF', 'Resolver: Claude solo en las páginas dudosas.', 'pipeline.mjs --ejecutar', 0.10],
    ['reintentar', 'Un motor falló por crédito, red o límite', 'Volver a correr (lo retoma solo).', 'pipeline.mjs --ejecutar', 0.10],
  ]],
  ['4. PREPARAR (lista de rubros)', [
    ['listo', 'Validado, sin preparar', 'Sacar la lista de rubros (gratis).', 'pipeline.mjs --ejecutar --solo-preparar --max-paginas 0', 0],
    ['sin-rubros', 'Validado, sin estado de resultados (memoria, acta, auditor, solo notas)', 'Nada: queda como fuente.', '—', 0],
  ]],
  ['5. CATEGORIZAR (Jev y Claude)', [
    ['cat-falta', 'Con rubros, sin categorizar o con la categorización desactualizada', 'Jev y Claude por API.', 'pipeline.mjs --ejecutar', 0.04],
    ['cat-solo-jev', 'Con rubros, solo Jev (falta Claude)', 'Claude por API en lo que Jev dejó < 0,90.', 'pipeline.mjs --ejecutar', 0.03],
    ['cat-ok', 'Con rubros y categorización al día', 'Cargar (etapa 6).', 'tools/cargar.mjs (en construcción)', 0],
  ]],
  ['7. EN EL SITIO', [
    ['cargado', 'Ejercicio cargado', 'Nada.', '—', 0],
  ]],
];
const clave = (e) => {
  if (e.cargado) return 'cargado';
  if (e.jev === 'sin-rubros') return 'sin-rubros';
  if (e.jev === 'listo-para-jev') { const md = resolve(ROOT, e.md); return categoriasAlDia(md) ? 'cat-ok' : jevAlDia(md) ? 'cat-solo-jev' : 'cat-falta'; }
  return e.estado;
};
const cuenta = {}; for (const e of R) cuenta[clave(e)] = (cuenta[clave(e)] || 0) + 1;

console.log(`\nINVENTARIO${dir ? ` (${dir})` : ''}: ${R.length} PDFs · registro de hace ${edad} min${edad > 60 ? ' (node tools/estado.mjs --actualizar para rehacerlo)' : ''}`);
console.log('(Si hay un proceso del pipeline corriendo, esto es una foto a mitad de camino.)');
let total = 0;
const w = Math.max(...ETAPAS.flatMap(([, f]) => f.map((x) => x[1].length)));
const conocidas = new Set(ETAPAS.flatMap(([, f]) => f.map((x) => x[0])));
const imprimirEtapa = ([etapa, filas]) => {
  const sub = filas.reduce((a, x) => a + (cuenta[x[0]] || 0), 0);
  console.log(`\n${etapa}  (${sub} PDFs)`);
  for (const [k, nombre, falta, cmd, usd] of filas) {
    const n = cuenta[k] || 0;
    const costo = n && usd ? `~US$ ${Math.round(n * usd)}` : n && !usd && !['cargado', 'sin-rubros', 'cat-ok'].includes(k) ? 'gratis' : '';
    if (n && usd) total += n * usd;
    console.log(`  ${String(n).padStart(5)}  ${nombre.padEnd(w)}  ${costo.padEnd(10)}${n ? `  falta: ${falta}${cmd !== '—' ? `  [${cmd}]` : ''}` : ''}`);
  }
};
// La etapa 7 (en el sitio) se imprime al final, después de la 6 (cargar), que no es una lista de estados sino lo que les falta.
ETAPAS.filter(([e]) => !e.startsWith('7')).forEach(imprimirEtapa);
for (const k of Object.keys(cuenta).filter((k) => !conocidas.has(k))) console.log(`  ${String(cuenta[k]).padStart(5)}  (estado sin describir: ${k})`);
console.log(`\n  Costo estimado para llevar todo hasta "categorizado": ~US$ ${Math.round(total)} (API; sesión de Claude: 0 tokens)`);

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
  console.log(`\n6. CARGAR (etapa 6) — qué les falta a los ${L.length} con rubros:`);
  console.log(`  club ya en el sitio: ${f.enSitio} · club nuevo (necesita alta): ${f.nuevo}`);
  console.log(`  no anuales (trimestral, semestral...; no se cargan como ejercicio): ${f.noAnual} · nombre del archivo con otra fecha que el contenido: ${f.nombre}`);
  console.log(`  con páginas "con reserva" (cerrar con sumas al cargar): ${f.reserva}`);
}
// Altas de clubes nuevos.
const altas = resolve(ROOT, 'Admin', 'altas-club.jsonl');
if (existsSync(altas)) {
  const A = readFileSync(altas, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const c = {}; for (const a of A) c[a.estado] = (c[a.estado] || 0) + 1;
  console.log(`\n6b. ALTA DE CLUBES NUEVOS (Admin/altas-club.jsonl): ${Object.entries(c).map(([k, v]) => `${k} ${v}`).join(' · ')}   [node tools/alta-club.mjs --todos]`);
}
console.log('  La etapa 6 (tools/cargar.mjs) está en construcción: ver Admin/HANDOFF-pipeline.md.');
ETAPAS.filter(([e]) => e.startsWith('7')).forEach(imprimirEtapa);
console.log('');

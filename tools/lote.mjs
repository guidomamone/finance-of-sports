#!/usr/bin/env node
// ============================================================================
// tools/lote.mjs — EL PROCESO NUEVO de punta a punta sobre un LOTE CHICO (5 PDFs), para ir refinando y viendo dónde hace falta la cola humana.
//
// POR QUÉ (Versión 324; pedido de Guido el 2026-10-01: "la idea es hacer 5 PDFs juntos e ir refinando y viendo dónde se necesita cola humana;
// vos me podés decir 'revisar tal cosa en el PDF y tal otra en el md' y yo abro el PDF por mi cuenta o la transcripción; arrancar por los
// clubes para los cuales ya tenemos transcripción pero no están cargados"). El proceso entero, con riesgos y mitigaciones etapa por etapa,
// está en Admin/HANDOFF-pipeline.md, "El proceso nuevo".
//
// LAS ETAPAS QUE CORRE (las 1 conseguir y 2 transcribir ya están hechas para los documentos del lote: se eligen PDFs con .md):
//   3  localizar.mjs        qué bloques son el estado de resultados y sus notas                      IA, ~US$ 0,05
//   4  validar-bloques.mjs  cada número de esos bloques contra el PDF (texto propio o Gemini)         gratis / ~US$ 0,003 por página escaneada
//   5  extraer.mjs          las filas tal cual, con escala por bloque y la columna del año anterior   IA, ~US$ 0,05-0,10
//   6  verificar.mjs        chequeos gratis; lo que no cierra va a la cola; deja el .rubros.json     gratis
//   7  categorización de siempre: glosar-rubros.mjs, jev-categorizar.mjs, categorizar-claude.mjs (con precedente, familia y memoria)  ~US$ 0,03
//   8  cargar.mjs --desde-verificacion   PROPUESTA (no escribe el sitio): qué cargaría y por qué frena                gratis
// Un documento que va a la cola en la 6 sigue igual hasta la 8 (para ver todo lo que le falta de una vez), pero la 8 lo frena.
//
// POR DEFECTO ES UN ENSAYO: no llama a ninguna API, dice qué haría y cuánto costaría. --ejecutar lo corre. Cada etapa guarda su resultado en
// Generados/ y no se repite (--rehacer para forzar las de IA): cortar con Control+C y volver a correr sigue donde quedó.
//
// AL TERMINAR: un resumen por documento (en qué etapa quedó y por qué) y la cola humana con qué mirar en el PDF y en el .md
// (node tools/cola.mjs). Las respuestas de Guido se toman en la próxima corrida del mismo lote.
//
// USO:
//   node tools/lote.mjs --lista Admin/lote-01.txt                 ensayo con costo
//   caffeinate -i node tools/lote.mjs --lista Admin/lote-01.txt --ejecutar
// ============================================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { localizar } from './localizar.mjs';
import { validar } from './validar-bloques.mjs';
import { extraer } from './extraer.mjs';
import { pendientes } from './cola.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { verificar } = await import('./verificar.mjs');
const { loadSite } = await import('./proponer-carga.mjs');
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const LISTA = flag('--lista'); const EJECUTAR = ARGS.includes('--ejecutar'); const REHACER = ARGS.includes('--rehacer');
if (!LISTA) { console.error('Uso: node tools/lote.mjs --lista <archivo> [--ejecutar] [--rehacer]'); process.exit(1); }
const docs = readFileSync(resolve(ROOT, LISTA), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
if (docs.length > 10) console.log(`OJO: ${docs.length} documentos. El proceso nuevo se refina de a 5 (pedido de Guido).`);
const leerRegistro = () => readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
let registro = leerRegistro();
const node = (tool, argv) => spawnSync('node', [resolve(ROOT, tool), ...argv], { cwd: ROOT, stdio: 'inherit' });

let usd = 0; const estado = {};
console.log(`\n=== Etapas 3-5: localizar, validar, extraer (${EJECUTAR ? 'DE VERDAD' : 'ENSAYO, sin API'}) ===`);
for (const pdf of docs) {
  const e = registro.find((x) => x.pdf === pdf);
  if (!e?.md) { estado[pdf] = 'sin transcripción (etapa 2)'; console.log(`  ${pdf}: sin .md`); continue; }
  const L = await localizar(pdf, { registro, ejecutar: EJECUTAR, rehacer: REHACER });
  if (L.ensayo) { usd += L.usd + 0.07; console.log(`  ${pdf}: localizar ~US$ ${L.usd.toFixed(3)} + extraer ~US$ 0,07 (estimado)`); continue; }
  if (L.error) { estado[pdf] = `localizar: ${L.error}`; continue; }
  usd += L.costo;
  if (L.datos.sin_estado) { estado[pdf] = 'sin estado de resultados (queda como fuente)'; continue; }
  const V = await validar(pdf, { registro, ejecutar: true, rehacer: REHACER }); usd += V.costo || 0;
  const X = await extraer(pdf, { registro, ejecutar: true, rehacer: REHACER }); usd += X.costo || 0;
  if (X.error) { estado[pdf] = `extraer: ${X.error}`; continue; }
  estado[pdf] = 'extraído';
  console.log(`  ${pdf}: estado ${L.datos.estado.join(',')} · ${V.datos?.modo || '?'} · ${X.datos.filas.length} filas · US$ ${usd.toFixed(2)} acumulado`);
}
if (!EJECUTAR) { console.log(`\nENSAYO: ~US$ ${usd.toFixed(2)} para localizar y extraer ${docs.length} documento(s), más ~US$ 0,03 c/u de categorización y la validación de páginas escaneadas (~US$ 0,003 por página). Agregá --ejecutar.`); process.exit(0); }

console.log('\n=== Etapa 6: verificar (gratis) ===');
const sitio = loadSite();
for (const pdf of docs.filter((d) => estado[d] === 'extraído')) {
  const r = verificar(pdf, { registro, sitio, escribirRubros: true });
  estado[pdf] = r.error ? `verificar: ${r.error}` : r.estado === 'ok' ? 'verificado' : `verificado con ${r.cola.length} caso(s) en la cola`;
  if (!r.error) for (const c of r.chequeos) console.log(`  ${pdf.split('/').slice(2).join('/')}: ${c.ok === true ? 'ok' : c.ok === false ? 'NO' : '-'} ${c.nombre}: ${c.detalle}`);
}

console.log('\n=== Etapa 7: categorizar (Jev y Claude, con precedente y memoria) ===');
const conRubros = docs.filter((d) => String(estado[d]).startsWith('verificado'));
if (conRubros.length) {
  writeFileSync(resolve(ROOT, 'Admin', '.lote-lista-actual.txt'), conRubros.join('\n') + '\n');
  node('tools/inventario-transcripciones.mjs', []); registro = leerRegistro();
  node('tools/glosar-rubros.mjs', ['--listos', '--lista', 'Admin/.lote-lista-actual.txt']);
  node('tools/jev-categorizar.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/.lote-lista-actual.txt']);
  node('tools/categorizar-claude.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/.lote-lista-actual.txt']);
  console.log('\n=== Etapa 8: cargar (PROPUESTA, no escribe el sitio) ===');
  node('tools/cargar.mjs', ['--lista', 'Admin/.lote-lista-actual.txt', '--desde-verificacion']);
}

console.log('\n=== RESUMEN DEL LOTE ===');
for (const pdf of docs) console.log(`  ${String(estado[pdf] || '?').padEnd(42)} ${pdf}`);
const cola = pendientes().filter((c) => docs.includes(c.pdf));
console.log(`\nGastado: US$ ${usd.toFixed(2)} (más la categorización: node tools/gasto.mjs). Cola humana de este lote: ${cola.length} caso(s) -> node tools/cola.mjs`);

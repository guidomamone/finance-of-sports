#!/usr/bin/env node
// ============================================================================
// tools/pipeline.mjs — EL comando único, de punta a punta (pedido de Guido, 2026-09-29):
//
//     node tools/pipeline.mjs --ejecutar
//
// QUÉ HACE HOY (Versión 529): la ETAPA 2 del proceso nuevo (Admin/PIPELINE.md): transcribir y validar. Busca los PDFs de Clubes/ que
// todavía no tienen un .md validado —sin .md, o con uno que nadie confirmó— y los lleva hasta "listo". De ahí en adelante sigue el lote
// (tools/lote.mjs: localizar, validar bloques, extraer, verificar, categorizar, proponer la carga) y tools/cargar.mjs escribe el sitio.
//
//   ¿DE QUÉ CLUB ES?  tools/carpetas-clubes.mjs (vía inventario-transcripciones.mjs): con eso el registro sabe qué ejercicio ya está cargado.
//   TRANSCRIBIR       Sin .md -> Mistral OCR transcribe el documento ENTERO (queda como documentación, decisión de Guido). Un .md viejo SIN
//                     TABLAS se rehace con Mistral una sola vez (`sin-tablas`, control "sin tablas" más abajo). PDFs dañados o con imágenes
//                     gigantes: tools/reparar-pdf.mjs.
//   VALIDAR           (tools/resolver-inventario.mjs) SOLO páginas con números que los chequeos gratis no respaldan:
//                       a. tools/paginas-con-numeros.mjs descarta la prosa (58% de páginas elegidas, 99,7% de los importes cubiertos);
//                       b. tools/chequeos-gratis.mjs valida gratis cada página con el texto del PDF, las sumas de sus tablas, la columna
//                          del año anterior ya cargada y el balance (163/163 errores reales siguen yendo a pagar; ~49% de ahorro);
//                       c. lo que queda `dudosa`: PDF con texto -> Claude solo esas páginas; escaneo -> Gemini (página por página si
//                          rechaza por RECITATION) y Claude como desempate, en lotes de hasta 8 páginas; voto entre voces, cuarta voz,
//                          aritmética, y "reserva" como último recurso.
//                     Fallos por crédito/límite: espera y reintenta el mismo motor; tras 3 seguidos corta la corrida (`reintentar`).
//   MARCAR            registro Admin/transcripciones-estado.jsonl (se regenera solo); historial en Admin/transcripciones-verificaciones.jsonl.
// (Hasta la Versión 528 hacía además la preparación para Jev y la categorización con Jev y Claude: ver "PROCESO VIEJO, RETIRADO".)
//
// COSTO medido (piloto C, 10 PDFs): ~US$ 0,20 por documento; PDF con texto US$ 0,08-0,18 (casi todo Mistral); escaneo US$ 0,13-0,21;
// un escaneo malo (Real Madrid 2005) ~US$ 1. `node tools/gasto.mjs --lista <lista>` da el costo real de una corrida.
//
// NO toca los ejercicios que ya están cargados en el sitio. Se puede cortar con Control+C (en Mac, la tecla control, no command) y volver
// a correr: sigue donde quedó. Cerrar la pestaña de la terminal NO corta los procesos.
// Toma una MUESTRA repartida por tamaño (--limit) y deja para el final los documentos de más de 100 páginas (--max-paginas).
//
// USO:
//   node tools/pipeline.mjs                          # ENSAYO: qué haría y cuánto costaría (no llama a ninguna API)
//   node tools/pipeline.mjs --ejecutar               # de verdad, 50 documentos
//   node tools/pipeline.mjs --ejecutar --limit 200   # más documentos (--limit 0 = todos)
//   node tools/pipeline.mjs --ejecutar --dir Clubes/Chile --concurrencia 4
//   node tools/pipeline.mjs --ejecutar --lista Admin/mi-lista.txt
//   node tools/pipeline.mjs --ejecutar --max-paginas 0       # incluye los documentos de más de 100 páginas (caros)
//   (--sin-jev, --solo-preparar y --repreparar se aceptan pero no hacen nada desde la Versión 529: ver "PROCESO VIEJO, RETIRADO" abajo)
//   node tools/pipeline.mjs --resumen                # solo el estado actual del inventario, sin correr nada
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resumenAltas } from './altas-registro.mjs';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const EXECUTE = args.includes('--ejecutar');
const SUMMARY_ONLY = args.includes('--resumen');
const limit = flagVal('--limit') !== null ? Number(flagVal('--limit')) : 50;
const dirFilter = flagVal('--dir');
const listFile = flagVal('--lista');
const concurrency = flagVal('--concurrencia') || '4';
// Tope de páginas por documento (0 = sin tope). Un informe anual de 230 páginas (Borussia Dortmund) cuesta unas 10 veces
// más que un balance de 25 y se lleva el tiempo de toda la corrida: por defecto quedan para el final, listados aparte.
// --solo-preparar también implica sin etapa 5: su promesa es "sin API". BUG encontrado el 2026-09-30 (Versión 321): solo filtraba QUÉ documentos
// se tomaban, pero después de prepararlos la etapa 5 corría igual y mandaba a Jev y a Claude todo lo re-preparado.
// PROCESO VIEJO, RETIRADO (Versión 529, to-do 142(c), aprobado por Guido el 2026-10-05): esta tool hacía además la preparación para Jev
// (prepare-onboarding.mjs, la lista de rubros, la marca listo-para-jev / sin-rubros) y la categorización con Jev y Claude. El proceso nuevo
// cargó 6 clubes enteros sin eso: la lista de rubros y la marca las pone verificar.mjs (etapa 6) y la categorización es la etapa 7 del lote.
// La preparación vieja además era una trampa: verificar.mjs no pisa una marca listo-para-jev ya puesta, así que su lista de rubros vieja
// quedaba como la buena. Queda SOLO la etapa 2 (transcribir y validar) y, de la preparación, el control de calidad "sin tablas".
const maxPages = flagVal('--max-paginas') !== null ? Number(flagVal('--max-paginas')) : 100;

const statePath = resolve(root, 'Admin', 'transcripciones-estado.jsonl');
const verifPath = resolve(root, 'Admin', 'transcripciones-verificaciones.jsonl');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
const sha1 = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');
const node = (script, argv, opts = {}) => spawnSync('node', [resolve(root, script), ...argv], { cwd: root, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024, ...opts });

function refreshLedger() {
  process.stdout.write('Actualizando el registro de transcripciones (qué está cargado, qué tiene .md, en qué estado)... ');
  const r = node('tools/inventario-transcripciones.mjs', [], { stdio: ['ignore', 'pipe', 'inherit'] });
  if (r.status !== 0) { console.error('FALLÓ\n' + (r.stderr || r.stdout)); process.exit(1); }
  console.log('listo.');
  return readJsonl(statePath);
}

// Altas de clubes nuevos (Admin/altas-club.jsonl, lo escribe tools/alta-club.mjs por script: qué club está listo para darse de alta,
// cuál tiene preguntas y cuál espera datos). Se muestra junto al inventario para que una sesión nueva lo vea sin acordarse de nada.
function printAltas() {
  try {
    const a = resumenAltas();
    if (a.total) console.log(`\nAltas de clubes nuevos (Admin/altas-club.jsonl, ${String(a.fecha).slice(0, 10)}): ${Object.entries(a.porEstado).map(([k, v]) => `${k} ${v}`).join(' · ')}${a.listos.length ? `\n  listos para alta: ${a.listos.map((l) => l.clubId).join(', ')}` : ''}\n  (recalcular: node tools/alta-club.mjs --todos)`);
  } catch (err) { console.log(`\n(no pude leer el registro de altas: ${err.message})`); }
}

function printSummary(ledger, title) {
  const notLoaded = ledger.filter((e) => !e.cargado);
  const by = {};
  for (const e of notLoaded) { const k = e.jev || e.estado; by[k] = (by[k] || 0) + 1; }
  console.log(`\n${title}: ${ledger.length} PDFs en Clubes/, ${ledger.length - notLoaded.length} ya cargados en el sitio, ${notLoaded.length} a trabajar:`);
  for (const [k, v] of Object.entries(by).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(5)}  ${k}`);
}

let ledger = refreshLedger();
if (SUMMARY_ONLY) { printSummary(ledger, 'Estado del inventario'); printAltas(); process.exit(0); }

// ---- selección: lo que no está cargado y todavía no llegó al final del camino
const listSet = listFile ? new Set(readFileSync(resolve(root, listFile), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))) : null;
const inScope = (e) => (!dirFilter || e.pdf.startsWith(dirFilter.replace(/\/$/, '') + '/')) && (!listSet || listSet.has(e.pdf));
const needsResolve = (e) => ['sin-md', 'sin-tablas', 'revisar', 'pendiente-segunda-voz', 'sin-verificar', 'reintentar'].includes(e.estado);
// Validado y todavía sin pasar por verificar.mjs: el único control que queda de la preparación vieja es "sin tablas" (abajo).
const sinPasarPorElLote = (e) => e.estado === 'listo' && !e.jev;
// Páginas por PDF, con caché (pdfinfo sobre ~3.000 PDFs tardaría medio minuto en cada corrida).
const cachePath = resolve(root, 'Admin', '.paginas-cache.json');
let pageCache = {}; try { pageCache = JSON.parse(readFileSync(cachePath, 'utf8')); } catch { /* sin caché */ }
function pagesOf(pdf) {
  const st = statSync(resolve(root, pdf)); const key = `${st.size}:${Math.round(st.mtimeMs)}`;
  if (pageCache[pdf]?.k === key) return pageCache[pdf].n;
  let n = 0;
  try { n = Number((execFileSync('pdfinfo', [resolve(root, pdf)], { maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString('latin1').match(/^Pages:\s+(\d+)/m) || [])[1]) || 0; } catch { n = 0; }
  pageCache[pdf] = { k: key, n };
  return n;
}
let selected = ledger.filter((e) => !e.cargado && inScope(e) && needsResolve(e));
for (const e of selected) e.paginas = pagesOf(e.pdf);
try { writeFileSync(cachePath, JSON.stringify(pageCache)); } catch { /* la caché es opcional */ }
selected.sort((a, b) => a.paginas - b.paginas); // los chicos primero: resultados rápidos y baratos
const grandes = maxPages > 0 ? selected.filter((e) => e.paginas > maxPages) : [];
if (grandes.length) selected = selected.filter((e) => e.paginas <= maxPages);
const total = selected.length;
// Un lote con --limit toma una muestra REPARTIDA de todos los tamaños (de 1 a 100 págs.), no los N más chicos: así un lote de 50
// sirve para detectar bugs en todo tipo de documento y el costo estimado es representativo. --orden chicos-primero cambia eso.
if (limit > 0 && selected.length > limit) {
  selected = flagVal('--orden') === 'chicos-primero'
    ? selected.slice(0, limit)
    : Array.from({ length: limit }, (_, i) => selected[Math.floor((i * selected.length) / limit)]);
}
if (grandes.length) console.log(`\n${grandes.length} documento(s) de más de ${maxPages} páginas quedan para el final (usá --max-paginas 0 para incluirlos): ${grandes.slice(0, 4).map((e) => `${e.pdf.split('/').slice(-2).join('/')} (${e.paginas} pág.)`).join(', ')}${grandes.length > 4 ? ', ...' : ''}`);
const toResolve = selected.filter(needsResolve);
// CONTROL "SIN TABLAS" (lo único que queda de la preparación vieja, Versión 529): una transcripción vieja (no de Mistral) de 2+ páginas con
// menos de 5 renglones de tabla no sirve para sacar filas (etiquetas e importes en bloques separados): se marca `sin-tablas` y la corrida
// siguiente la rehace con Mistral (una sola vez: formatoIntentado). Gratis. Corre sobre TODOS los validados que todavía no pasaron por el
// lote (no entra en la selección ni en --limit: si no, ~660 validados le quitaban lugar a lo que hay que transcribir).
function chequearTablas(led) {
  let n = 0;
  for (const e of led.filter((x) => !x.cargado && inScope(x) && sinPasarPorElLote(x))) {
    const mdAbs = resolve(root, e.md); if (!existsSync(mdAbs)) continue;
    const mdTablas = readFileSync(mdAbs, 'utf8').split('\n').filter((l) => l.startsWith('|')).length;
    if (mdTablas >= 5 || String(e.motor).startsWith('mistral') || pagesOf(e.pdf) < 2) continue;
    const prevEv = [...readJsonl(verifPath)].reverse().find((v) => v.md === e.md && v.mdSha1 === sha1(mdAbs)) || {};
    if (prevEv.formatoIntentado) continue;
    appendFileSync(verifPath, JSON.stringify({ ...prevEv, ts: new Date().toISOString(), md: e.md, mdSha1: sha1(mdAbs), status: 'sin-tablas', detail: 'el .md no tiene tablas: se rehace con Mistral en la próxima corrida', formatoIntentado: true }) + '\n');
    n++;
  }
  return n;
}

console.log(`\n${total} documento(s) para transcribir/validar en el alcance pedido; esta corrida toma ${selected.length}.`);
if (!selected.length && !EXECUTE) { printSummary(ledger, 'Nada para transcribir'); process.exit(0); }

// ---- ensayo o ejecución
const tmpList = resolve(root, 'Admin', '.pipeline-lista-actual.txt');
const selectedPdfs = new Set(selected.map((e) => e.pdf));
if (toResolve.length) {
  writeFileSync(tmpList, toResolve.map((e) => e.pdf).join('\n') + '\n');
  if (!EXECUTE) {
    const dry = node('tools/resolver-inventario.mjs', ['--lista', 'Admin/.pipeline-lista-actual.txt'], { stdio: ['ignore', 'pipe', 'ignore'] });
    console.log('\n' + (dry.stdout || '').split('\n').filter((l) => /^\s+\d+ docs|TOTAL|ENSAYO/.test(l)).join('\n'));
    console.log('\nEs un ENSAYO: no se llamó a ninguna API. Agregá --ejecutar para correrlo de verdad.');
    process.exit(0);
  }
  console.log(`\n=== Etapa 2 (Admin/PIPELINE.md): transcribir y validar ${toResolve.length} documento(s) (concurrencia ${concurrency}) ===\n`);
  node('tools/resolver-inventario.mjs', ['--lista', 'Admin/.pipeline-lista-actual.txt', '--ejecutar', '--concurrencia', concurrency], { stdio: 'inherit' });
  ledger = refreshLedger();
}
const nSinTablas = chequearTablas(ledger);
if (nSinTablas) console.log(`\n${nSinTablas} transcripción(es) vieja(s) sin tablas: se rehacen con Mistral en la próxima corrida (estado sin-tablas).`);

// ---- resumen final
ledger = refreshLedger();
const mine = ledger.filter((e) => selectedPdfs.has(e.pdf));
const tally = {};
for (const e of mine) { const k = e.jev || e.estado; tally[k] = (tally[k] || 0) + 1; }
console.log(`\nRESULTADO de esta corrida (${mine.length} documentos): ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(' | ')}`);
const conReserva = mine.filter((e) => (e.reserva || []).length);
if (conReserva.length) console.log(`  ${conReserva.length} con "reserva" (páginas que solo validó Claude; cerrar con sum-check al onboardear): ver "reserva" en Admin/transcripciones-estado.jsonl`);
for (const e of mine.filter((x) => !['listo', 'listo-para-jev', 'sin-rubros'].includes(x.jev || x.estado))) console.log(`  - ${e.estado.toUpperCase()}  ${e.pdf}\n      ${(e.detalle || '').slice(0, 200)}`);
printSummary(ledger, 'Inventario completo');
printAltas();

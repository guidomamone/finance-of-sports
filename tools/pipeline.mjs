#!/usr/bin/env node
// ============================================================================
// tools/pipeline.mjs — la ETAPA 2 (transcribir y validar); Antes era el comando único de punta a punta
//:
//
//     node tools/pipeline.mjs --ejecutar
//
// QUÉ HACE HOY: la ETAPA 2 del proceso nuevo (Admin/PIPELINE.md): transcribir y validar. Busca los PDFs de Clubes/ que
// todavía no tienen un .md validado —sin .md, o con uno que nadie confirmó— y los lleva hasta "listo". De ahí en adelante sigue el lote
// (tools/lote.mjs: localizar, validar bloques, extraer, verificar, categorizar, proponer la carga) y tools/cargar.mjs escribe el sitio.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «pipeline.mjs».
//
// USO:
//   node tools/pipeline.mjs                          # ENSAYO: qué haría y cuánto costaría (no llama a ninguna API)
//   node tools/pipeline.mjs --ejecutar               # de verdad, 50 documentos
//   node tools/pipeline.mjs --ejecutar --limit 200   # más documentos (--limit 0 = todos)
//   node tools/pipeline.mjs --ejecutar --dir Clubes/Chile --concurrencia 4
//   node tools/pipeline.mjs --ejecutar --lista Admin/mi-lista.txt
//   node tools/pipeline.mjs --ejecutar --max-paginas 0       # incluye los documentos de más de 100 páginas (caros)
//   (--sin-jev, --solo-preparar y --repreparar se aceptan pero no hacen nada: ver "PROCESO VIEJO, RETIRADO" abajo)
//   node tools/pipeline.mjs --resumen                # solo el estado actual del inventario, sin correr nada
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resumenAltas } from './altas-registro.mjs';
import { derivado } from './rutas.mjs';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const EXECUTE = args.includes('--ejecutar');
const SUMMARY_ONLY = args.includes('--resumen');
const limit = flagVal('--limit') !== null ? Number(flagVal('--limit')) : 50;
const dirFilter = flagVal('--dir');
const listFile = flagVal('--lista');
// CANDADO: un solo proceso a la vez escribiendo el registro, también en el ensayo (refreshLedger lo reescribe). Ver tools/candado.mjs.
const { tomarCandado } = await import('./candado.mjs');
tomarCandado('pipeline.mjs', { lista: listFile || dirFilter || null, modo: EXECUTE ? '--ejecutar' : 'ensayo' });
const concurrency = flagVal('--concurrencia') || '4';
// Tope de páginas por documento (0 = sin tope). Un informe anual de 230 páginas (Borussia Dortmund) cuesta unas 10 veces
// más que un balance de 25 y se lleva el tiempo de toda la corrida: por defecto quedan para el final, listados aparte.
// PROCESO VIEJO, RETIRADO (aprobado por Guido): esta tool hacía además la preparación para Jev
// (prepare-onboarding.mjs, la lista de rubros, la marca listo-para-jev / sin-rubros) y la categorización con Jev y Claude. El proceso nuevo
// cargó 6 clubes enteros sin eso: la lista de rubros y la marca las pone verificar.mjs (etapa 6) y la categorización es la etapa 7 del lote.
// La preparación vieja además era una trampa: verificar.mjs no pisa una marca listo-para-jev ya puesta, así que su lista de rubros vieja
// quedaba como la buena. Queda SOLO la etapa 2 (transcribir y validar) y, de la preparación, el control de calidad "sin tablas".
const maxPages = flagVal('--max-paginas') !== null ? Number(flagVal('--max-paginas')) : 100;

const statePath = resolve(root, 'Admin', 'registros', 'transcripciones-estado.jsonl');
const verifPath = resolve(root, 'Admin', 'registros', 'transcripciones-verificaciones.jsonl');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
const sha1 = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');
const node = (script, argv, opts = {}) => spawnSync('node', [resolve(root, script), ...argv], { cwd: root, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024, ...opts });

function refreshLedger() {
  process.stdout.write('Actualizando el registro de transcripciones (qué está cargado, qué tiene .md, en qué estado)... ');
  // con --lista o --dir, solo esos PDFs (inventario --solo: ~1 s en vez de ~1 min; las demás líneas quedan como estaban).
  const alcance = listFile || dirFilter;
  const r = node('tools/inventario-transcripciones.mjs', alcance ? ['--solo', alcance] : [], { stdio: ['ignore', 'pipe', 'inherit'] });
  if (r.status !== 0) { console.error('FALLÓ\n' + (r.stderr || r.stdout)); process.exit(1); }
  console.log('listo.');
  return readJsonl(statePath);
}

// Altas de clubes nuevos (Admin/registros/altas-club.jsonl, lo escribe tools/alta-club.mjs por script: qué club está listo para darse de alta,
// cuál tiene preguntas y cuál espera datos). Se muestra junto al inventario para que una sesión nueva lo vea sin acordarse de nada.
function printAltas() {
  try {
    const a = resumenAltas();
    if (a.total) console.log(`\nAltas de clubes nuevos (Admin/registros/altas-club.jsonl, ${String(a.fecha).slice(0, 10)}): ${Object.entries(a.porEstado).map(([k, v]) => `${k} ${v}`).join(' · ')}${a.listos.length ? `\n  listos para alta: ${a.listos.map((l) => l.clubId).join(', ')}` : ''}\n  (recalcular: node tools/alta-club.mjs --todos)`);
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
// "Sin pasar por el lote" = sin .verificacion.json, no "sin la marca de Jev": la preparación vieja
// dejó "listo-para-jev" o "sin-rubros" en casi todos los .md viejos y con `!e.jev` el control no marcaba ninguno (OH Leuven 2022, Llaneros
// 2022; medido: 0 marcados, contra 238 con esta regla). Un .md que ya pasó por verificar no se rehace (OH Leuven 2019 y 2021 cierran por
// sus códigos NBB sin tablas).
const sinPasarPorElLote = (e) => e.estado === 'listo' && !(e.md && existsSync(resolve(root, derivado(e.md, '.verificacion.json', { crear: false }))));
// Páginas por PDF, con caché (pdfinfo sobre ~3.000 PDFs tardaría medio minuto en cada corrida).
const cachePath = resolve(root, 'Admin', 'registros', '.paginas-cache.json');
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
// CONTROL "SIN TABLAS" (lo único que queda de la preparación vieja): una transcripción vieja (no de Mistral) de 2+ páginas con
// menos de 5 renglones de tabla no sirve para sacar filas (etiquetas e importes en bloques separados): se marca `sin-tablas` y la corrida
// siguiente la rehace con Mistral (una sola vez: formatoIntentado). Gratis. Corre sobre TODOS los validados que todavía no pasaron por el
// lote (no entra en la selección ni en --limit: si no, ~660 validados le quitaban lugar a lo que hay que transcribir).
// La parte que solo lee: qué documentos marcaría el control (con su registro de verificación previo). El ensayo la usa para
// cotizar el rehacer con Mistral antes de la corrida real, que es la que escribe la marca.
function candidatosSinTablas(led) {
  const out = [];
  for (const e of led.filter((x) => !x.cargado && inScope(x) && sinPasarPorElLote(x))) {
    const mdAbs = resolve(root, e.md); if (!existsSync(mdAbs)) continue;
    const mdTablas = readFileSync(mdAbs, 'utf8').split('\n').filter((l) => l.startsWith('|')).length;
    if (mdTablas >= 5 || String(e.motor).startsWith('mistral') || pagesOf(e.pdf) < 2) continue;
    const prevEv = [...readJsonl(verifPath)].reverse().find((v) => v.md === e.md && v.mdSha1 === sha1(mdAbs)) || {};
    if (prevEv.formatoIntentado) continue;
    out.push({ e, mdAbs, prevEv });
  }
  return out;
}
function chequearTablas(led) {
  const cands = candidatosSinTablas(led);
  for (const { e, mdAbs, prevEv } of cands) {
    appendFileSync(verifPath, JSON.stringify({ ...prevEv, ts: new Date().toISOString(), md: e.md, mdSha1: sha1(mdAbs), status: 'sin-tablas', detail: 'el .md no tiene tablas: se rehace con Mistral en la próxima corrida', formatoIntentado: true }) + '\n');
  }
  return cands.length;
}
// Ensayo: cotiza con el mismo ensayo de resolver-inventario (dryRunDoc ya cuenta el rehacer con Mistral de un .md sin tablas).
function ensayoSinTablas(led) {
  const cands = candidatosSinTablas(led);
  if (!cands.length) return;
  const lista = resolve(root, 'Admin', 'registros', '.pipeline-lista-sin-tablas.txt');
  writeFileSync(lista, cands.map((c) => c.e.pdf).join('\n') + '\n');
  const dry = node('tools/resolver-inventario.mjs', ['--lista', 'Admin/registros/.pipeline-lista-sin-tablas.txt', '--estado', 'listo'], { stdio: ['ignore', 'pipe', 'ignore'] });
  const total = ((dry.stdout || '').match(/TOTAL ~\$([\d.]+)/) || [])[1];
  console.log(`\n${cands.length} transcripción(es) vieja(s) ya validada(s) sin tablas: la corrida real las marca y las rehace con Mistral${total ? ` (~US$ ${total} más, ya contado el rehacer)` : ''}:`);
  for (const [pais, k] of Object.entries(cands.reduce((a, c) => { const p = c.e.pdf.split('/')[1]; a[p] = (a[p] || 0) + 1; return a; }, {}))) console.log(`  ${String(k).padStart(4)}  ${pais}`);
}

console.log(`\n${total} documento(s) para transcribir/validar en el alcance pedido; esta corrida toma ${selected.length}.`);
if (!selected.length && !EXECUTE) { ensayoSinTablas(ledger); printSummary(ledger, 'Nada para transcribir'); process.exit(0); }

// ---- ensayo o ejecución
const tmpList = resolve(root, 'Admin', 'registros', '.pipeline-lista-actual.txt');
const selectedPdfs = new Set(selected.map((e) => e.pdf));
if (toResolve.length) {
  writeFileSync(tmpList, toResolve.map((e) => e.pdf).join('\n') + '\n');
  if (!EXECUTE) {
    const dry = node('tools/resolver-inventario.mjs', ['--lista', 'Admin/registros/.pipeline-lista-actual.txt'], { stdio: ['ignore', 'pipe', 'ignore'] });
    console.log('\n' + (dry.stdout || '').split('\n').filter((l) => /^\s+\d+ docs|TOTAL|ENSAYO/.test(l)).join('\n'));
    ensayoSinTablas(ledger);
    console.log('\nEnsayo terminado, no se gastó nada. Para correrlo: agregá --ejecutar.');
    process.exit(0);
  }
  console.log(`\n=== Transcribir y validar ${toResolve.length} documento(s) (etapa 2, de a ${concurrency} en paralelo) ===\n`);
  node('tools/resolver-inventario.mjs', ['--lista', 'Admin/registros/.pipeline-lista-actual.txt', '--ejecutar', '--concurrencia', concurrency], { stdio: 'inherit' });
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
if (conReserva.length) console.log(`  ${conReserva.length} con "reserva" (páginas que solo validó Claude; cerrar con sum-check al onboardear): ver "reserva" en Admin/registros/transcripciones-estado.jsonl`);
for (const e of mine.filter((x) => !['listo', 'listo-para-jev', 'sin-rubros'].includes(x.jev || x.estado))) console.log(`  - ${e.estado.toUpperCase()}  ${e.pdf}\n      ${(e.detalle || '').slice(0, 200)}`);
printSummary(ledger, 'Inventario completo');
printAltas();

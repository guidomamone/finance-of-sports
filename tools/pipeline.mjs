#!/usr/bin/env node
// ============================================================================
// tools/pipeline.mjs — EL comando único, de punta a punta (pedido de Guido, 2026-09-29):
//
//     node tools/pipeline.mjs --ejecutar
//
// VISIÓN (Guido, 2026-09-30): que este comando termine llevando un PDF desde la transcripción hasta el club CARGADO en el sitio, por sí
// solo, siempre que el club ya exista y no aparezcan rubros nuevos que necesiten criterio de una sesión de Claude. Hoy llega hasta la
// categorización con Jev (etapas 1-5). Las etapas 6-7 (cargar y publicar) están en construcción: ver tools/proponer-carga.mjs, que por
// ahora solo MIDE si la carga automática es viable y no escribe nada del sitio.
//
// Busca los PDFs de Clubes/ que todavía no tienen un .md LISTO para Jev —ya sea porque no tienen ningún .md, o porque tienen uno que
// nadie confirmó— y a cada uno lo lleva por todo el camino. Cada etapa está hecha por una herramienta propia (cada una explicada en su cabecera):
//
//   0. ¿DE QUÉ CLUB ES? (tools/carpetas-clubes.mjs, vía onboard.mjs) la cita en data/<id>-data.js, y si no, nombre IGUAL dentro del mismo
//                      país; si no, club nuevo. Una sola regla en todo el proyecto, vigilada por audit.js (P1 si una carpeta es ambigua).
//                      Con ella el registro sabe qué ejercicio ya está cargado (antes 11 carpetas caían en un club equivocado).
//   1. TRANSCRIBIR     Sin .md -> Mistral OCR transcribe el documento ENTERO (queda como documentación, decisión de Guido). Un .md SIN
//                      TABLAS se rehace con Mistral una sola vez (`sin-tablas`). PDFs dañados o con imágenes gigantes: tools/reparar-pdf.mjs.
//   2. VALIDAR         (tools/resolver-inventario.mjs) SOLO páginas con números que los chequeos gratis no respaldan:
//                        a. tools/paginas-con-numeros.mjs descarta la prosa (58% de páginas elegidas, 99,7% de los importes cubiertos);
//                        b. tools/chequeos-gratis.mjs valida gratis cada página con el texto del PDF, las sumas de sus tablas, la columna
//                           del año anterior ya cargada y el balance (163/163 errores reales siguen yendo a pagar; ~49% de ahorro);
//                        c. lo que queda `dudosa`: PDF con texto -> Claude solo esas páginas; escaneo -> Gemini (página por página si
//                           rechaza por RECITATION) y Claude como desempate, en lotes de hasta 8 páginas (un lote cortado por max_tokens
//                           se parte en mitades); voto entre voces, cuarta voz, aritmética, y "reserva" como último recurso.
//                      Fallos por crédito/límite: espera y reintenta el mismo motor; tras 3 seguidos corta la corrida (`reintentar`).
//   3. PREPARAR        (tools/prepare-onboarding.mjs + tools/filas-rubro.mjs) tablas, sumas contra totales impresos, columna de importes
//                      (no la de notas), filas que no son rubros descartadas, lado ingreso/gasto por estructura -> `<md>.rubros.json`.
//                      Desde la Versión 321 la lista son las filas que va a CARGAR la etapa 6 (seleccionarFilas() de proponer-carga.mjs,
//                      que abre cada renglón del estado en su nota) más esos renglones; la lista vieja queda solo si la selección falla.
//                      `listo-para-jev` si hay un estado de resultados con >= 5 rubros; si no `sin-rubros` (el .md validado queda como fuente).
//   4. MARCAR          registro Admin/transcripciones-estado.jsonl (se regenera solo); historial en Admin/transcripciones-verificaciones.jsonl.
//   5. CATEGORIZAR     SOLO los documentos de esta corrida (--lista a cada tool). Escalones: (0) precedente del mismo club, gratis;
//                      (1) Jev >= 0,90 (tools/jev-categorizar.mjs, con glosa en español de tools/glosar-rubros.mjs); (2) el resto a
//                      Claude por API, una llamada por documento con las líneas ya cargadas del club (tools/categorizar-claude.mjs),
//                      se acepta >= 0,80. Backtest: 80% automático con 94,5% de acierto; piloto C: 82%. -> `<md>.categorias.json`.
//                      Cada archivo guarda la HUELLA de su entrada (tools/huellas.mjs): si la lista de rubros cambia, se rehace solo.
//   6. CARGAR          (PENDIENTE, to-do 108 y 112) escribir el ejercicio en data/<club>-data.js; para un club nuevo, el alta
//                      (tools/alta-club.mjs, registro Admin/altas-club.jsonl) va en el mismo commit. Piezas listas: proponer-carga.mjs
//                      (qué filas, tabla por ancla), categorias.json, alta-club.mjs. Faltan: excluir `no_es_rubro`, detectar lado
//                      contradictorio y totales con su desglose abajo (cerrar sumas antes de escribir), informes trimestrales.
//   7. PUBLICAR        (PENDIENTE) commit local; el push lo hace Guido.
//
// COSTO medido (piloto C, 10 PDFs): ~US$ 0,20 por documento; PDF con texto US$ 0,08-0,18 (casi todo Mistral); escaneo US$ 0,13-0,21;
// un escaneo malo (Real Madrid 2005) ~US$ 1. `node tools/gasto.mjs --lista <lista>` da el costo real de una corrida.
//
// LO QUE NO HACE, a propósito: categorizar rubros por su cuenta con Claude en la sesión. Eso es de Jev; lo dudoso se deriva.
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
//   node tools/pipeline.mjs --ejecutar --solo-preparar --repreparar --limit 0   # rehace SIN API la lista de rubros de los ya listos
//   node tools/pipeline.mjs --ejecutar --sin-jev            # sin la etapa final de Jev
//   node tools/pipeline.mjs --resumen                # solo el estado actual del inventario, sin correr nada
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve, basename, dirname } from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { numeroDe, filasSuma, noEsRubro, ladosPorEstructura, columnaDeImportes } from './filas-rubro.mjs';
import { jevAlDia, categoriasAlDia } from './huellas.mjs';
import { resumenAltas } from './altas-registro.mjs';
// Vocabulario multi-idioma (Versión 314): título de estado de resultados, flujo/patrimonio, palabras de ingreso/gasto, totales y la
// normalización del texto viven en tools/vocabulario.mjs (29 idiomas). Acá solo queda la lógica de la etapa 3.
import { derivado, ubicar } from './rutas.mjs';
import { normalizar, TITULO_RESULTADOS_RE, FLUJO_O_PATRIMONIO_RE, INGRESOS_TABLA_RE, GASTOS_RE, esTotal } from './vocabulario.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
// La selección de filas de la etapa 6 (Versión 321, ver la etapa 3 más abajo). proponer-carga.mjs lee process.argv al importarse (--tabla,
// --limit, --club... son flags SUYOS): se le pasa un argv limpio, mismo truco que tools/cargar.mjs.
const argvPipeline = process.argv; process.argv = process.argv.slice(0, 2);
const { seleccionarFilas, loadSite } = await import('./proponer-carga.mjs');
process.argv = argvPipeline;

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
const NO_JEV = args.includes('--sin-jev') || args.includes('--solo-preparar'); // no categorizar con Jev al final
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
const REPREPARE = args.includes('--repreparar'); // rehace la lista de rubros de documentos que ya la tenían (gratis, sin API)
const needsPrepare = (e) => e.estado === 'listo' && (!e.jev || (REPREPARE && ['listo-para-jev', 'sin-rubros'].includes(e.jev)));
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
const ONLY_PREPARE = args.includes('--solo-preparar'); // solo la preparación gratis para Jev, sin transcribir ni validar (sin API)
// Documentos ya preparados cuya categorización falta o quedó desactualizada (huellas, tools/huellas.mjs): también son trabajo de la
// corrida (etapa 5), si no, un documento preparado en una corrida cortada no se categorizaba nunca.
const needsCategorize = (e) => !NO_JEV && e.jev === 'listo-para-jev' && (!jevAlDia(resolve(root, e.md)) || !categoriasAlDia(resolve(root, e.md)));
let selected = ledger.filter((e) => !e.cargado && inScope(e) && (ONLY_PREPARE ? needsPrepare(e) : (needsResolve(e) || needsPrepare(e) || needsCategorize(e))));
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
const toPrepare = selected.filter(needsPrepare);
const toCategorize = selected.filter((e) => !needsResolve(e) && !needsPrepare(e));
console.log(`\n${total} documento(s) sin la marca final en el alcance pedido; esta corrida toma ${selected.length}: ${toResolve.length} a transcribir/validar, ${toPrepare.length} ya validados que solo faltan preparar para Jev y ${toCategorize.length} ya preparados que solo faltan categorizar.`);
if (!selected.length) { printSummary(ledger, 'Nada para hacer'); process.exit(0); }

// ---- ensayo o ejecución
const tmpList = resolve(root, 'Admin', '.pipeline-lista-actual.txt');
writeFileSync(tmpList, selected.map((e) => e.pdf).join('\n') + '\n');
if (toResolve.length) {
  writeFileSync(tmpList, toResolve.map((e) => e.pdf).join('\n') + '\n');
  if (!EXECUTE) {
    const dry = node('tools/resolver-inventario.mjs', ['--lista', 'Admin/.pipeline-lista-actual.txt'], { stdio: ['ignore', 'pipe', 'ignore'] });
    console.log('\n' + (dry.stdout || '').split('\n').filter((l) => /^\s+\d+ docs|TOTAL|ENSAYO/.test(l)).join('\n'));
    console.log('\nEs un ENSAYO: no se llamó a ninguna API. Agregá --ejecutar para correrlo de verdad.');
    process.exit(0);
  }
  console.log(`\n=== Etapas 1-2: transcribir y validar ${toResolve.length} documento(s) (concurrencia ${concurrency}) ===\n`);
  node('tools/resolver-inventario.mjs', ['--lista', 'Admin/.pipeline-lista-actual.txt', '--ejecutar', '--concurrencia', concurrency], { stdio: 'inherit' });
  ledger = refreshLedger();
} else if (!EXECUTE) {
  console.log(`\nEs un ENSAYO: faltaría la preparación gratis para Jev (sin API)${toCategorize.length ? ` y categorizar ${toCategorize.length} documento(s) (Jev + Claude por API, ~US$ 0,015-0,04 cada uno)` : ''}. Agregá --ejecutar para correrlo.`);
  process.exit(0);
}

// ---- Etapa 3-4: preparar para Jev (todo gratis)
const selectedPdfs = new Set(selected.map((e) => e.pdf));
const ready = ledger.filter((e) => selectedPdfs.has(e.pdf) && needsPrepare(e)); // (con --repreparar incluye los que ya tenían su lista de rubros)
console.log(`\n=== Etapas 3-4: preparar ${ready.length} documento(s) listos para Jev (sin API) ===`);

function clubAndYear(pdf) {
  // Reusa lo que ya resuelve tools/onboard.mjs (club por carpeta contra data/clubs.js, año por el nombre, con su corrección
  // de fechas ISO). Un club ambiguo o nuevo cae a una etiqueta provisoria: para la lista de rubros no importa.
  const r = node('tools/onboard.mjs', [pdf, '--dry-run'], { stdio: ['ignore', 'pipe', 'ignore'] });
  const m = (r.stdout || '').match(/prepare-onboarding\.mjs (\S+) (\d{4}) /);
  if (m) return { club: m[1], year: m[2] };
  const folder = basename(dirname(pdf)).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  // MISMA regla de año que guessYear() de tools/onboard.mjs (mantenerlas iguales): fecha ISO -> su año; rango "2023-24" / "2019-2020" ->
  // el año de CIERRE; si no, el único año de 4 dígitos. BUG REAL del piloto C: acá se tomaba el PRIMER año, y "relatorio-contas-2023-24"
  // de Nacional (club ambiguo para onboard.mjs: coincide con Internacional y Atlético Nacional) quedó como ejercicio 2023 en vez de 2024.
  const f = basename(pdf);
  const iso = f.match(/(?<!\d)(\d{4})[-_](0[1-9]|1[0-2])[-_](0[1-9]|[12]\d|3[01])(?!\d)/);
  let year = iso ? iso[1] : null;
  if (!year) { const r = f.match(/(\d{4})[-_](\d{2,4})(?!\d)/); if (r) { const end = r[2].length === 4 ? Number(r[2]) : Number(r[1].slice(0, 2) + r[2]); if (r[2].length === 4 || end === Number(r[1]) + 1) year = String(end); } }
  if (!year) { const y = f.match(/(20\d{2}|19\d{2})/); year = y ? y[1] : '0'; }
  return { club: folder, year };
}

// Lado de una tabla (ingreso o gasto) por las palabras de su título y sus columnas (INGRESOS / GASTOS de tools/vocabulario.mjs). Si aparecen
// las dos familias (o ninguna) no se adivina: queda sin lado. Saber el lado sube mucho el acierto de Jev (69,5% -> 74,2% en el backtest).
const SIDE_REV = INGRESOS_TABLA_RE; // sin las palabras que solo dicen el lado de una FILA (subvenciones, "sales"): ver INGRESOS_FILA
const SIDE_EXP = GASTOS_RE;
const norm = normalizar;
function sideOfTable(t) {
  const h = norm(`${t.section || ''} ${(t.columns || []).join(' ')}`);
  const r = SIDE_REV.test(h); const x = SIDE_EXP.test(h);
  return r && !x ? 'revenue' : x && !r ? 'expense' : null;
}
// ¿La tabla es (parte de) un ESTADO DE RESULTADOS / de recursos y gastos? Sin al menos una así, el documento no es un estado
// financiero con rubros que categorizar (actas, memorias narrativas, certificaciones): un acta del Aris colaba 16 "rubros".
// Los títulos (en 29 idiomas, con sus formas gramaticales) son TITULO_RESULTADOS de tools/vocabulario.mjs.
const STATEMENT_RE = TITULO_RESULTADOS_RE;
const isStatement = (t) => STATEMENT_RE.test(norm(`${t.section || ''} ${(t.columns || []).join(' ')}`));
// Total/subtotal al comienzo ("Total ingresos", "Sum driftsinntekter", "Итого") o al final ("Tržby celkem", "Indtægter i alt").
const isTotal = esTotal;
const hasNumber = (vals) => vals.some((v) => /\d/.test(String(v)));
let nDescartadas = 0; let nJev = 0; let nSin = 0; let nFail = 0; let nSinTablas = 0; let nSeleccion = 0; let nSeleccionFalla = 0;
// Los data files del sitio (para la escala por plausibilidad de la selección: los ingresos que el club ya tiene cargados en otros años).
// Se cargan UNA vez y solo si hay algo que preparar (son ~160 archivos por vm).
const sitio = ready.length ? loadSite() : null;
for (const e of ready) {
  const mdAbs = resolve(root, e.md);
  // Un .md SIN TABLAS no sirve para sacar rubros (etiquetas e importes en bloques separados): se manda a rehacer con Mistral (una sola vez).
  const mdTablas = readFileSync(mdAbs, 'utf8').split('\n').filter((l) => l.startsWith('|')).length;
  const prevEv = [...readJsonl(verifPath)].reverse().find((v) => v.md === e.md && v.mdSha1 === sha1(mdAbs)) || {};
  // Con --repreparar NO se crean marcas `sin-tablas` nuevas: esa opción es para rehacer GRATIS las listas de rubros de lo ya preparado, y
  // en la regeneración del 2026-09-30 marcó 296 documentos que la corrida siguiente habría mandado a Mistral sin que nadie lo pidiera.
  if (!REPREPARE && mdTablas < 5 && pagesOf(e.pdf) >= 2 && !String(e.motor).startsWith('mistral') && !prevEv.formatoIntentado) {
    appendFileSync(verifPath, JSON.stringify({ ...prevEv, ts: new Date().toISOString(), md: e.md, mdSha1: sha1(mdAbs), status: 'sin-tablas', detail: 'el .md no tiene tablas: se rehace con Mistral en la próxima corrida' }) + '\n');
    nSinTablas++; continue;
  }
  const { club, year } = clubAndYear(e.pdf);
  const out = derivado(mdAbs, '.briefing.json');
  const r = node('tools/prepare-onboarding.mjs', [club, year, mdAbs, '--out', out], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0 || !existsSync(out)) { nFail++; console.log(`  ! ${e.pdf}: prepare-onboarding.mjs falló (${(r.stderr || r.stdout || '').trim().split('\n').pop()?.slice(0, 120)})`); continue; }
  const b = JSON.parse(readFileSync(out, 'utf8'));
  const rubros = [];
  // Versión 312 (piloto D, Baník Ostrava 1997): el título del estado ("VÝKAZ ZISKŮ A ZTRÁT") puede estar en el TEXTO de la página, fuera de
  // la tabla, y la sección de la tabla terminar siendo otra cosa (la dirección del club). Una tabla relevante en una página cuyo texto
  // (sin contar las filas de tabla) tiene el título de un estado de resultados cuenta como estado de resultados.
  const paginasConTitulo = new Set();
  { const mdTxt = readFileSync(mdAbs, 'utf8'); const marks = [...mdTxt.matchAll(/^--- pág\. (\d+) ---/gm)];
    marks.forEach((m, i) => { const body = mdTxt.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : mdTxt.length).split('\n')
        // Solo líneas que parecen TÍTULOS (cortas, fuera de tablas): en la prosa aparece "resultado" en cualquier nota ("se reconoce en
        // resultados") y convertiría toda tabla de esa página en estado de resultados.
        .filter((l) => !l.startsWith('|') && l.trim().length > 0 && l.replace(/[#*_ ]/g, '').length <= 60);
      if (body.some((l) => STATEMENT_RE.test(norm(l.replace(/[#*_]/g, '')).trim()))) paginasConTitulo.add(Number(m[1])); }); }
  // Y además la tabla tiene que tener filas de resultados (>= 3 etiquetas con palabras de ingresos/gastos, `filasDeResultados` de
  // extract-table-rows.mjs): el balance puede estar en la misma página que el título.
  const porTitulo = (t) => paginasConTitulo.has(t.page) && t.filasDeResultados;
  const esEstado = (t) => (t.likelyRelevant && isStatement(t)) || porTitulo(t);
  const hasStatement = (b.tables || []).some(esEstado);
  // Estados de FLUJO DE EFECTIVO y de CAMBIOS EN EL PATRIMONIO: no tienen rubros de ingresos/gastos para el sitio, pero sus filas dicen
  // "resultado", "ingresos", "amortizaciones" y pasaban el filtro de relevancia. En los pilotos C y D eran buena parte de las filas que
  // después Claude marcaba `no_es_rubro` (pagando): Baník 1997 págs. 15 y 18, Polissya pág. 7. Se excluyen por su título/columnas/filas.
  // Títulos de flujo de efectivo / cambios en el patrimonio / saldo inicial: tools/vocabulario.mjs (FLUJO_O_PATRIMONIO_RE).
  const NO_RESULTADOS_RE = FLUJO_O_PATRIMONIO_RE;
  const esFlujoOPatrimonio = (t) => NO_RESULTADOS_RE.test(norm(`${t.section || ''} ${(t.columns || []).join(' ')} ${(t.rows || []).slice(0, 3).map((r) => r.rawLabel).join(' ')}`));
  for (const t of b.tables || []) {
    if (!(t.likelyRelevant || porTitulo(t)) || !hasStatement || esFlujoOPatrimonio(t)) continue;
    const ladoTabla = sideOfTable(t);
    // Columna de importes: la del año del ejercicio si un encabezado lo dice, y si no la primera con números que NO sea la de notas
    // (columnaDeImportes de tools/filas-rubro.mjs, Versión 307). Antes era "la primera con números en el 40% de las filas", que en Alverca y
    // Fluminense era la columna "Notas" (9, 15, "7/8") y rompía los subtotales y el lado. De esa columna salen los subtotales (filas que son la
    // suma de las de arriba) y el lado de cada fila por la estructura de la tabla.
    const rows = t.rows || []; const width = Math.max(0, ...rows.map((r) => (r.values || []).length));
    let col = columnaDeImportes(t.columns, rows, Number(year) || null);
    if (col === null) { col = 0; for (let j = 0; j < width; j++) if (rows.filter((r) => numeroDe((r.values || [])[j] ?? '') !== null).length >= Math.max(3, rows.length * 0.4)) { col = j; break; } }
    const filas = rows.map((r) => ({ label: String(r.rawLabel || ''), v: numeroDe((r.values || [])[col] ?? '') }));
    const sumas = new Set(filasSuma(filas.map((f, i) => ({ ...f, i })).filter((f) => f.v !== null)).map((f) => f.i));
    const lados = ladosPorEstructura(filas);
    rows.forEach((row, i) => {
      if (isTotal(row.rawLabel) || !String(row.rawLabel || '').trim() || !hasNumber(row.values || [])) return;
      if (noEsRubro(row.rawLabel, sumas.has(i))) { nDescartadas++; return; }
      rubros.push({ label: row.rawLabel.trim(), lado: lados[i] || ladoTabla, page: t.page, section: t.section || '', values: row.values, columns: t.columns });
    });
  }
  // ---- LA LISTA DE RUBROS ES LA SELECCIÓN DE LA ETAPA 6 (Versión 321, arreglo 1a del HANDOFF de entonces, hoy en Admin/Archive/HANDOFF-pipeline-hasta-2026-10-01.md; evidencia en Admin/tests/test-cargar.md, 4.1).
  // Hasta acá, `rubros` son las filas de las tablas de ESTADO de resultados (la lista de siempre). Pero la carga (tools/cargar.mjs) no carga
  // esas filas: usa seleccionarFilas() de tools/proponer-carga.mjs, que abre cada renglón del estado en la NOTA que lo desglosa (estrategia
  // ancla-listas). Eran conjuntos distintos: medido el 2026-09-30 sobre 719 documentos, de 17.266 filas categorizadas 4.700 la carga nunca
  // las usaba (se pagaba Jev y Claude por nada) y 3.068 que la carga SÍ usaba nunca se categorizaban (Werder 2024: 3% del dinero de ingresos
  // bien ubicado, porque la nota de "Umsatzerlöse" no estaba en la lista). Ahora se categoriza exactamente lo que se va a cargar:
  //   - cada fila de la selección, con su lado, su página y su sección (el importe en MILLONES de moneda nativa va en `values`, así la
  //     huella de tools/huellas.mjs cambia si cambia el importe);
  //   - y además el RENGLÓN DEL ESTADO de cada nota abierta (`esAncla: true`): si alguna fila de la nota queda sin categoría aceptable,
  //     cargar.mjs carga el renglón entero en su lugar, y para eso el renglón tiene que tener categoría.
  // Se descartan las filas en cero (Resultaatbestemming 0 de PSV: no mueven ningún total y categorizarlas cuesta).
  // Si la selección FALLA (sin tabla de estado reconocida, o sin la columna del ejercicio: 244 de 719 documentos, casi todos ya `sin-rubros`),
  // queda la lista vieja y `seleccion.ok: false` con el motivo: la etapa 6 igual va a frenar por eso, pero el documento no se esconde
  // como "sin estado de resultados" si la lista vieja sí lo encontró.
  let seleccion = { ok: false, motivo: 'no se corrió' };
  try {
    const cr = clubDeRuta(e.pdf);
    const sf = seleccionarFilas({ briefing: b, mdText: readFileSync(mdAbs, 'utf8'), clubData: (cr.clubId && sitio.generic[cr.clubId]) || {}, year: Number(year) });
    seleccion = sf.ok ? { ok: true, filas: sf.raw.length, notasUsadas: sf.extra?.notasUsadas || [] } : { ok: false, motivo: sf.motivo };
    if (sf.ok) {
      const lista = []; const vistas = new Set();
      const add = (r, extra = {}) => {
        const native = Math.round(Number(r.native) * 1e6) / 1e6; if (!native) return;
        const k = `${norm(r.label)}|${r.tside || ''}|${native}`; if (vistas.has(k)) return; vistas.add(k);
        lista.push({ label: String(r.label).trim(), lado: r.tside || null, page: r.page, section: r.section || '', values: [native], ...extra });
      };
      for (const r of sf.raw) {
        add(r, { origen: r.origen || null, ...(r.ancla ? { ancla: r.ancla.label } : {}) });
        if (r.ancla) add({ ...r.ancla, section: r.ancla.section || '' }, { origen: 'renglón del estado abierto en una nota', esAncla: true });
      }
      rubros.length = 0; rubros.push(...lista); nSeleccion++;
    } else nSeleccionFalla++;
  } catch (err) { seleccion = { ok: false, motivo: `seleccionarFilas() falló: ${err.message}` }; nSeleccionFalla++; }
  // La glosa (tools/glosar-rubros.mjs, Gemini) de las etiquetas que ya estaban en la lista anterior se conserva: sin esto, cambiar la lista
  // obliga a glosar el documento entero otra vez.
  try { const prevR = JSON.parse(readFileSync(derivado(mdAbs, '.rubros.json', { crear: false }), 'utf8')); const g = new Map((prevR.rubros || []).filter((r) => r.glosa).map((r) => [r.label, r.glosa])); for (const r of rubros) if (!r.glosa && g.has(r.label)) r.glosa = g.get(r.label); } catch { /* no había lista anterior */ }
  const tie = b.tieOuts || [];
  const closes = tie.filter((x) => x.closes === true).length; const fails = tie.filter((x) => x.closes === false).length;
  const jev = rubros.length >= 5 ? 'listo-para-jev' : 'sin-rubros';
  writeFileSync(derivado(mdAbs, '.rubros.json'), JSON.stringify({
    md: e.md, pdf: e.pdf, club, year: Number(year), numberFormat: b.numberFormat, generatedAt: new Date().toISOString(),
    tieOuts: { cierran: closes, noCierran: fails }, warnings: b.warnings || [], estadoDeResultados: hasStatement, seleccion, ladoConocido: rubros.filter((r) => r.lado).length, rubros,
  }, null, 1));
  // Se conserva todo lo que ya sabíamos de la validación de la transcripción (motor, páginas reemplazadas, reservas...).
  const prev = [...readJsonl(verifPath)].reverse().find((v) => v.md === e.md && v.mdSha1 === sha1(mdAbs)) || {};
  appendFileSync(verifPath, JSON.stringify({ ...prev, ts: new Date().toISOString(), md: e.md, mdSha1: sha1(mdAbs), status: 'listo', jev, rubros: rubros.length, tieOuts: { cierran: closes, noCierran: fails } }) + '\n');
  if (jev === 'listo-para-jev') nJev++; else nSin++;
}
console.log(`  ${nJev} listo-para-jev, ${nSin} sin-rubros; lista = selección de la etapa 6 en ${nSeleccion}${nSeleccionFalla ? `, lista vieja en ${nSeleccionFalla} (la selección falló: ver "seleccion" en su .rubros.json)` : ''} (${nDescartadas} filas descartadas por no ser rubros: subtotales, resultados, números sueltos, metadatos)${nSinTablas ? `, ${nSinTablas} SIN TABLAS (se rehacen con Mistral en la próxima corrida)` : ''}${nFail ? `, ${nFail} con error en prepare-onboarding` : ''}.`);

// ---- Etapa 5: Jev categoriza los rubros de los documentos listo-para-jev (casi gratis: ~$42 por mil millones de tokens)
if (!NO_JEV) {
  // Jev lee el registro para saber qué documentos están `listo-para-jev`: hay que regenerarlo ANTES, si no los documentos preparados en esta
  // misma corrida quedaban sin categorizar hasta la corrida siguiente (bug visto en el piloto de 9 documentos, 2026-09-30).
  ledger = refreshLedger();
  console.log('\n=== Etapa 5: Jev categoriza los rubros (lado y ejemplos parecidos incluidos) ===');
  // Glosa en español de cada rubro (Gemini, ~$0,001 por documento): sin ella la búsqueda de ejemplos parecidos no encuentra nada en idiomas que el sitio no tiene.
  // SOLO los documentos de esta corrida (bug real 2026-09-30, piloto C: la etapa 5 tomaba TODOS los `listo-para-jev` del inventario y
  // categorizar-claude.mjs empezó a mandar 390 documentos a Claude por API; se cortó en 44, US$ 1,90). La lista va a las tres tools.
  const listaJev = resolve(root, 'Admin', '.pipeline-lista-jev.txt');
  writeFileSync(listaJev, selected.map((e) => e.pdf).join('\n') + '\n');
  node('tools/glosar-rubros.mjs', ['--listos', '--lista', 'Admin/.pipeline-lista-jev.txt'], { stdio: 'inherit' });
  node('tools/jev-categorizar.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/.pipeline-lista-jev.txt'], { stdio: 'inherit' });
  // Escalón 2 (Versión 307): lo que Jev deja < 0,90 va a Claude por API, UNA llamada por documento, con las líneas ya cargadas de ese club
  // (sus convenciones) y las filas vecinas. Backtest sobre 3.975 rubros: Jev >= 0,90 sola resuelve 69,4% (94,4% de acierto); sumando
  // Claude >= 0,80 se resuelve 80,2% con 94,5%; el resto queda para revisión (Admin/tests/test-categorizar-claude.md). ~US$ 0,015 por documento.
  // Deja `<md>.categorias.json` (la categoría final de cada rubro y de qué escalón salió: precedente / jev / claude / sin-resolver).
  console.log('\n=== Etapa 5b: Claude por API categoriza lo que Jev no resolvió con confianza ===');
  node('tools/categorizar-claude.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/.pipeline-lista-jev.txt'], { stdio: 'inherit' });
}

// ---- resumen final
ledger = refreshLedger();
const mine = ledger.filter((e) => selectedPdfs.has(e.pdf));
const tally = {};
for (const e of mine) { const k = e.jev || e.estado; tally[k] = (tally[k] || 0) + 1; }
console.log(`\nRESULTADO de esta corrida (${mine.length} documentos): ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(' | ')}`);
const conReserva = mine.filter((e) => (e.reserva || []).length);
if (conReserva.length) console.log(`  ${conReserva.length} con "reserva" (páginas que solo validó Claude; cerrar con sum-check al onboardear): ver "reserva" en Admin/transcripciones-estado.jsonl`);
for (const e of mine.filter((x) => !['listo-para-jev', 'sin-rubros'].includes(x.jev || x.estado))) console.log(`  - ${e.estado.toUpperCase()}  ${e.pdf}\n      ${(e.detalle || '').slice(0, 200)}`);
printSummary(ledger, 'Inventario completo');
printAltas();

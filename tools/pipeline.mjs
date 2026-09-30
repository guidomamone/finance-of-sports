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
// nadie confirmó— y a cada uno lo lleva por todo el camino. Cada etapa está hecha por una herramienta propia (ver Admin/MAPA-DE-TOOLS.md):
//
//   1. TRANSCRIBIR     Sin .md -> Mistral OCR lo transcribe (entrega tablas). Un .md SIN TABLAS (el 82% de los viejos: etiquetas e
//                      importes en bloques separados) se rehace con Mistral una sola vez (estado `sin-tablas`, campo `formatoIntentado`).
//   2. VALIDAR         (tools/resolver-inventario.mjs) PDF con texto: los números de cada página contra el texto del PDF (gratis) y
//                      Claude por API SOLO en las páginas dudosas. Escaneo o texto roto: Gemini como segunda voz, Claude solo en las
//                      páginas que difieren, voto entre voces, cuarta voz (Mistral), aritmética del documento, y Claude con
//                      "reserva" como último recurso. Fallos por crédito/límite: espera y reintenta el mismo motor; tras 3 seguidos
//                      corta la corrida (los documentos quedan en `reintentar`).
//   3. PREPARAR        (tools/prepare-onboarding.mjs) las tablas del .md, el chequeo de sumas contra los totales impresos y la lista de
//                      rubros del documento -> `<md>.rubros.json`. Un documento solo es `listo-para-jev` si tiene un estado de
//                      resultados con >= 5 rubros; si no es `sin-rubros` (actas, memorias narrativas, certificaciones: el .md
//                      validado queda como fuente).
//   4. MARCAR          `listo-para-jev`, `sin-rubros`, `sin-tablas`, `revisar`, `reintentar`, `no-es-pdf` (registro en
//                      Admin/transcripciones-estado.jsonl, que se regenera solo).
//   5. CATEGORIZAR     (tools/jev-categorizar.mjs --listos) Jev, con el lado (ingreso/gasto) de cada tabla y 8 ejemplos parecidos ya
//                      categorizados -> `<md>.jev.json`. Confianza >= 0,90: aceptable (decisión de Guido). Menor: etapa 5b,
//                      (tools/categorizar-claude.mjs --listos) Claude por API con el contexto del club; acepta >= 0,80 ->
//                      `<md>.categorias.json`. Lo que queda por debajo se frena para revisión (no se carga).
//   6. CARGAR          (PENDIENTE, ver Admin/TODO.md to-do 108) escribir el ejercicio en data/<club>-data.js, subir ASSET_V,
//                      regenerar, correr audit.js; si algo falla, revertir. Solo para un club que ya existe y sin decisiones abiertas.
//   7. PUBLICAR        (PENDIENTE) commit local; el push lo hace Guido.
//
// LO QUE NO HACE, a propósito: categorizar rubros por su cuenta con Claude en la sesión. Eso es de Jev; lo dudoso se deriva.
//
// NO toca los ejercicios que ya están cargados en el sitio. Se puede cortar con Ctrl+C y volver a correr: sigue donde quedó.
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
const NO_JEV = args.includes('--sin-jev'); // no categorizar con Jev al final
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

function printSummary(ledger, title) {
  const notLoaded = ledger.filter((e) => !e.cargado);
  const by = {};
  for (const e of notLoaded) { const k = e.jev || e.estado; by[k] = (by[k] || 0) + 1; }
  console.log(`\n${title}: ${ledger.length} PDFs en Clubes/, ${ledger.length - notLoaded.length} ya cargados en el sitio, ${notLoaded.length} a trabajar:`);
  for (const [k, v] of Object.entries(by).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(5)}  ${k}`);
}

let ledger = refreshLedger();
if (SUMMARY_ONLY) { printSummary(ledger, 'Estado del inventario'); process.exit(0); }

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
  const y = basename(pdf).match(/(20\d{2}|19\d{2})/);
  return { club: folder, year: y ? y[1] : '0' };
}

// Lado de una tabla (ingreso o gasto) por las palabras de su título y sus columnas, en varios idiomas. Si aparecen las dos
// familias (o ninguna) no se adivina: queda sin lado. Saber el lado sube mucho el acierto de Jev (69,5% -> 74,2% en el backtest).
const SIDE_REV = /доход|выручк|прибыл|доходи|vynos|trzb|opbrengsten|omzet|収益|収入|수익|매출|收入|ingreso|recurso|recaudac|venta|cuota|income|revenue|turnover|ricavi|proventi|inntekt|driftsinntekt|umsatz|ertr|prihod|produits|opbrengst|omsaetning|indtaegt|receita|rendiment|subsidi|faturamento|εσοδα|gelir|hasilat|przychod|tulot/;
const SIDE_EXP = /расход|затрат|витрат|убыт|naklad|kosten|費用|支出|비용|费用|gasto|egreso|costo|expense|cost of|costi|oneri|kostnad|aufwand|aufwend|rashod|troskov|charges|kosten|despesa|custo|εξοδα|gider|omkostning|udgift|wydatki|koszt|menot/;
const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss');
function sideOfTable(t) {
  const h = norm(`${t.section || ''} ${(t.columns || []).join(' ')}`);
  const r = SIDE_REV.test(h); const x = SIDE_EXP.test(h);
  return r && !x ? 'revenue' : x && !r ? 'expense' : null;
}
// ¿La tabla es (parte de) un ESTADO DE RESULTADOS / de recursos y gastos? Sin al menos una así, el documento no es un estado
// financiero con rubros que categorizar (actas, memorias narrativas, certificaciones): un acta del Aris colaba 16 "rubros".
const STATEMENT_RE = /resultado|cuenta de perdidas|perdidas y ganancias|recursos y gastos|recursos y erogaciones|estado de recursos|income statement|profit and loss|profit or loss|comprehensive income|statement of operations|statement of income|conto economico|resultatregnskap|resultatopgor|resultatenrekening|compte de resultat|gewinn- ?und verlust|guv|erfolgsrechnung|racun dobiti|dobiti i gubitka|demonstracao do resultado|demonstracao de resultado|αποτελεσμα|gelir tablosu|kar zarar|zysk|vysledovka|vykaz zisku|tulos|финансовых результатах|прибылях и убытках|фінансових результатах|прибутки та збитки|vykaz zisku a ztraty|zisku a ztraty|winst-? ?en-? ?verlies|損益計算書|収支計算書|손익계산서|利润表|损益表|^(recursos|gastos|ingresos|egresos|revenues?|expenses|income|expenditure)$|concepto (del )?(ingreso|gasto)|income and expenditure|rendimentos e gastos|rendimentos e perdas|gastos e perdas|demonstracao dos resultados/;
const isStatement = (t) => STATEMENT_RE.test(norm(`${t.section || ''} ${(t.columns || []).join(' ')}`));
const isTotal = (l) => /^\s*\**\s*(total|subtotal|sum\b|suma)/i.test(String(l || '')) || /^\s*\**\s*(totale|totaal|gesamt|ukupno|total\s)/i.test(String(l || ''));
const hasNumber = (vals) => vals.some((v) => /\d/.test(String(v)));
let nDescartadas = 0; let nJev = 0; let nSin = 0; let nFail = 0; let nSinTablas = 0;
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
  const out = mdAbs.replace(/\.md$/, '.briefing.json');
  const r = node('tools/prepare-onboarding.mjs', [club, year, mdAbs, '--out', out], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0 || !existsSync(out)) { nFail++; console.log(`  ! ${e.pdf}: prepare-onboarding.mjs falló (${(r.stderr || r.stdout || '').trim().split('\n').pop()?.slice(0, 120)})`); continue; }
  const b = JSON.parse(readFileSync(out, 'utf8'));
  const rubros = [];
  const hasStatement = (b.tables || []).some((t) => t.likelyRelevant && isStatement(t));
  for (const t of b.tables || []) {
    if (!t.likelyRelevant || !hasStatement) continue;
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
  const tie = b.tieOuts || [];
  const closes = tie.filter((x) => x.closes === true).length; const fails = tie.filter((x) => x.closes === false).length;
  const jev = rubros.length >= 5 ? 'listo-para-jev' : 'sin-rubros';
  writeFileSync(mdAbs.replace(/\.md$/, '.rubros.json'), JSON.stringify({
    md: e.md, pdf: e.pdf, club, year: Number(year), numberFormat: b.numberFormat, generatedAt: new Date().toISOString(),
    tieOuts: { cierran: closes, noCierran: fails }, warnings: b.warnings || [], estadoDeResultados: hasStatement, ladoConocido: rubros.filter((r) => r.lado).length, rubros,
  }, null, 1));
  // Se conserva todo lo que ya sabíamos de la validación de la transcripción (motor, páginas reemplazadas, reservas...).
  const prev = [...readJsonl(verifPath)].reverse().find((v) => v.md === e.md && v.mdSha1 === sha1(mdAbs)) || {};
  appendFileSync(verifPath, JSON.stringify({ ...prev, ts: new Date().toISOString(), md: e.md, mdSha1: sha1(mdAbs), status: 'listo', jev, rubros: rubros.length, tieOuts: { cierran: closes, noCierran: fails } }) + '\n');
  if (jev === 'listo-para-jev') nJev++; else nSin++;
}
console.log(`  ${nJev} listo-para-jev, ${nSin} sin-rubros (${nDescartadas} filas descartadas por no ser rubros: subtotales, resultados, números sueltos, metadatos)${nSinTablas ? `, ${nSinTablas} SIN TABLAS (se rehacen con Mistral en la próxima corrida)` : ''}${nFail ? `, ${nFail} con error en prepare-onboarding` : ''}.`);

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
  // Claude >= 0,80 se resuelve 80,2% con 94,5%; el resto queda para revisión (Admin/test-categorizar-claude.md). ~US$ 0,015 por documento.
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

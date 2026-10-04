#!/usr/bin/env node
// ============================================================================
// tools/inventario-transcripciones.mjs — el REGISTRO de cada transcripción: quién la hizo y si está
// validada para las tools de onboarding.
//
// Por qué existe (pedido de Guido, 2026-09-29): "dejar todo el inventario actual de .md validado para
// onboarding" y "cada transcripción necesita conservar quién la hizo". Antes esa información estaba
// repartida: el motor solo en los logs de cada API (Admin/<motor>/resultados.jsonl), sin marca dentro
// del .md salvo en los escaneos de Mistral, y el estado de verificación en ningún lado.
//
// Cómo guarda la información (a propósito NO se escribe dentro de los .md: hay ~2200, las tools de
// Gemini/Mistral dependen de que ciertas líneas estén al principio, y un registro aparte no se
// desincroniza porque se REGENERA de los logs):
//   Admin/transcripciones-estado.jsonl        -- REGENERABLE. Una línea por PDF con .md: motor que lo
//                                                hizo, modelo, fecha, costo, otras versiones que hay
//                                                (voces), si el ejercicio ya está cargado en el sitio, y
//                                                el estado de validación actual.
//   Admin/transcripciones-verificaciones.jsonl -- HISTORIAL, solo se le agregan líneas. Cada validación
//                                                (método, resultado, hash del .md que se validó).
//                                                Si el .md cambia después, el hash ya no coincide y el
//                                                estado vuelve a "sin-verificar" solo.
//
// ESTADOS de validación:
//   cargado                 el ejercicio ya está en el sitio (verificado a mano en su momento). No se toca.
//   listo                   validado: listo para las tools de onboarding.
//   revisar                 la validación encontró algo (cifra mal leída, transcripción incompleta,
//                           dos versiones que no coinciden): hay que resolverlo antes de onboardear.
//   pendiente-segunda-voz   es un escaneo (no hay texto en el PDF contra qué comparar): necesita una
//                           segunda transcripción independiente (Gemini o Claude por API).
//   sin-md                  el PDF todavía no tiene ninguna transcripción (tools/pipeline.mjs la hace).
//   reintentar              la última corrida de tools/resolver-inventario.mjs no pudo terminar por un
//                           problema de crédito / límite / red (NO por el documento): se retoma sola.
//   sin-verificar           todavía no se corrió ninguna validación.
//
// MÉTODOS de validación (campo "method" de cada verificación):
//   numeros-vs-texto-pdf    tools/verify-numbers.mjs: los números del .md contra el texto interno del PDF.
//   comparacion:<voz>       tools/compare-transcripts.mjs contra otra transcripción independiente.
//
// USO:
//   node tools/inventario-transcripciones.mjs                     # regenera el registro y muestra el resumen
//   node tools/inventario-transcripciones.mjs --verificar         # además corre la validación GRATIS (sin API)
//   node tools/inventario-transcripciones.mjs --verificar --dir Clubes/Brasil --limit 50
//   node tools/inventario-transcripciones.mjs --verificar --estado sin-verificar   # revalida solo los de ese estado
//   node tools/inventario-transcripciones.mjs --listar revisar    # lista los PDFs en ese estado
//   node tools/inventario-transcripciones.mjs --listar pendiente-segunda-voz --dir Clubes/Colombia
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative, dirname, basename } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { verifyNumbers } from './verify-numbers.mjs';
import { derivado } from './rutas.mjs';
import { periodoDe } from './periodo.mjs';
import { ajusteDe } from './ajustes.mjs';
import { ultimaConPaginas, huellasDelTexto, compararPaginas } from './huella-paginas.mjs';
import { etapaDe, ETAPAS_DOC, claveDeEstado, DESCARTADOS } from './etapa-doc.mjs';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const doVerify = args.includes('--verificar');
const listState = flagVal('--listar');
const dirFilter = flagVal('--dir');
const limit = flagVal('--limit') ? Number(flagVal('--limit')) : Infinity;

const statePath = resolve(root, 'Admin', 'transcripciones-estado.jsonl');
const verifPath = resolve(root, 'Admin', 'transcripciones-verificaciones.jsonl');

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
const sha1 = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');

// Sufijos de las OTRAS versiones de un mismo PDF (chequeos, tests): no son el .md canónico.
const VOICE_SUFFIXES = [
  ['.gemini-check', 'gemini-check'], ['.claude-check', 'claude-check'], ['.mistral-redo', 'mistral-redo'],
  ['.t-mistral', 'mistral(test)'], ['.t-gemini', 'gemini(test)'], ['.t-claude', 'claude-api(test)'],
  ['-mistral-test', 'mistral(test-viejo)'],
];

function walkPdfs(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) walkPdfs(full, out);
    else if (/\.pdf$/i.test(e)) out.push(full);
  }
  return out;
}

// Qué ejercicios ya están cargados en el sitio: el mismo criterio que usa tools/onboard.mjs (lo que
// ese comando NO lista como "necesita trabajo" es lo que ya está cargado). Se le pregunta a él en vez
// de duplicar la lógica de resolver club+año, que ya tiene sus casos raros resueltos.
function pendingByOnboard() {
  const r = spawnSync('node', [resolve(root, 'tools/onboard.mjs'), '--all', '--dry-run', '--confirm'], { cwd: root, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024, env: { ...process.env, ONBOARD_IGNORE_BRIEFING: '1' } });
  const set = new Set();
  for (const m of (r.stdout || '').matchAll(/^=== (.+?) ===$/gm)) set.add(m[1]);
  if (set.size === 0) throw new Error('onboard.mjs --dry-run no devolvió ningún documento: no puedo saber qué está cargado');
  return set;
}

// Motor que hizo cada .md canónico: la ÚLTIMA línea (por fecha) de los logs de las 3 APIs cuyo "md"
// es ese archivo. Si un motor re-hizo el archivo (Gemini sobre un escaneo de Mistral), gana el último.
function loadProvenance() {
  const byMd = new Map();
  const sources = [['mistral', 'Admin/mistral/resultados.jsonl'], ['gemini', 'Admin/gemini/resultados.jsonl'], ['claude-api', 'Admin/claude-api/resultados.jsonl']];
  for (const [engine, rel] of sources) {
    for (const r of readJsonl(resolve(root, rel))) {
      if (!r.md) continue;
      const prev = byMd.get(r.md);
      if (!prev || r.ts > prev.ts) byMd.set(r.md, { engine, model: r.model, ts: r.ts, costUsd: r.costUsd ?? null, scannedByMistral: !!r.scanned });
    }
  }
  return byMd;
}

function latestVerifications() {
  const byMd = new Map();
  for (const v of readJsonl(verifPath)) byMd.set(v.md, v); // el archivo está en orden cronológico
  return byMd;
}

function findVoices(pdfAbs) {
  const base = pdfAbs.slice(0, -4);
  const out = [];
  for (const [suf, label] of VOICE_SUFFIXES) { const p = derivado(pdfAbs, suf + '.md', { crear: false }); if (existsSync(p)) out.push({ label, path: relative(root, p) }); }
  return out;
}

function motorFinal(base, verif, sha) {
  // Si la validación que corresponde a ESTE contenido reemplazó páginas con otro motor, el registro lo dice.
  if (!verif || verif.mdSha1 !== sha || !verif.proveniencia) return null;
  const pg = Object.entries(verif.proveniencia.paginas || {});
  if (!pg.length && !verif.proveniencia.base) return null;
  const byEngine = {};
  for (const [n, eng] of pg) (byEngine[eng] ||= []).push(Number(n));
  const partes = Object.entries(byEngine).map(([eng, ns]) => `${eng} (págs. ${ns.sort((a, b) => a - b).join(', ')})`);
  return { motor: [verif.proveniencia.base || base, ...partes].join(' + '), paginasReemplazadas: pg.length, reserva: verif.reserva || [], previo: verif.previo || null };
}

function currentState(entry, verif) {
  if (verif && verif.status === 'no-es-pdf' && !entry.cargado) return { status: 'no-es-pdf', method: verif.method, detail: verif.detail };
  // Un sin-md con costoUsd de Mistral registrado es PLATA PAGADA cuyo .md no está en disco (encontrado 2026-09-30: 25 transcripciones,
  // US$ 5,01, River/AEK/Olympiacos, hechas el 27-28/09 y nunca commiteadas). El estado sigue siendo sin-md (hay que volver a
  // transcribir), pero el detalle lo dice, y `node tools/gasto.mjs` los lista, para que nadie lo pague otra vez sin enterarse.
  if (!entry.tieneMd && !entry.cargado) return { status: 'sin-md', method: null, detail: entry.costoUsd ? `PAGADO SIN .md: Mistral lo transcribió el ${entry.fecha} (US$ ${entry.costoUsd}) y el .md no está en disco; volver a transcribir lo paga de nuevo` : 'todavía no hay ninguna transcripción de este PDF' };
  if (entry.cargado) return { status: 'cargado', method: null, detail: 'el ejercicio ya está en el sitio' };
  if (verif && verif.mdSha1 === entry.mdSha1) return { status: verif.status, method: verif.method, detail: verif.detail };
  // VALIDACIÓN POR PÁGINA (Versión 443, punto 1b.iii del HANDOFF): si el .md cambió pero la última validación "listo" guardó la huella de
  // cada página, se mira QUÉ páginas cambiaron. Ninguna (cambió solo lo de antes de la primera marca, o espacios al final) -> el estado se
  // conserva. Alguna -> "sin-verificar" con la lista: el resolver vuelve a validar solo esas (las demás se reusan). Antes, cualquier cambio
  // dejaba el documento entero sin verificar (Juventus 2021-22: 3 páginas rearmadas, 17 pagadas otra vez).
  const prev = entry.md ? ultimaConPaginas(entry.md) : null;
  if (prev && entry.tieneMd) {
    const { cambiadas } = compararPaginas(prev.paginasSha, huellasDelTexto(readFileSync(resolve(root, entry.md), 'utf8')));
    if (!cambiadas.length) return { status: prev.status, method: prev.method, detail: `${prev.detail} (el .md cambió fuera de las páginas validadas)` };
    return { status: 'sin-verificar', method: null, detail: `el .md cambió después de la última validación en ${cambiadas.length} página(s): ${cambiadas.slice(0, 12).join(', ')}${cambiadas.length > 12 ? '...' : ''} (las demás quedan validadas)` };
  }
  return { status: 'sin-verificar', method: null, detail: verif ? 'el .md cambió después de la última validación' : '' };
}

function runVerification(entry) {
  const pdfAbs = resolve(root, entry.pdf);
  const mdAbs = resolve(root, entry.md);
  // 1) Otra voz independiente que ya exista Y coincida (chequeos de Gemini/Claude): la más fuerte.
  for (const v of entry.voces.filter((x) => /check/.test(x.label) && !/test/.test(x.label))) {
    const r = spawnSync('node', [resolve(root, 'tools/compare-transcripts.mjs'), mdAbs, resolve(root, v.path), '--json'], { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
    try {
      const j = JSON.parse(r.stdout);
      if (j.match) return { status: 'listo', method: `comparacion:${v.label}`, detail: `coincide con ${v.label} (${j.tolerated} filas con columna de más/nota, toleradas)` };
      // no coincide: se sigue con el otro método; si tampoco pasa, queda revisar
      entry._compareFail = `${j.mismatches.length} discrepancia(s) contra ${v.label}`;
    } catch { /* comparación no disponible: se sigue */ }
  }
  // 2) Números contra el texto interno del PDF.
  let vn;
  try { vn = verifyNumbers(pdfAbs, mdAbs); } catch (e) { return { status: 'sin-verificar', method: 'numeros-vs-texto-pdf', detail: `falló la validación: ${e.message}`.slice(0, 200) }; }
  if (vn.verdict === 'ok') return { status: 'listo', method: 'numeros-vs-texto-pdf', detail: `${vn.mdNumbers} números del .md, ${vn.unmatchedCount} sin respaldo en el texto del PDF, cobertura ${(vn.coverage * 100).toFixed(0)}%` };
  if (vn.verdict === 'revisar') return { status: 'revisar', method: 'numeros-vs-texto-pdf', detail: vn.reason + (entry._compareFail ? `; ${entry._compareFail}` : '') };
  return entry._compareFail
    ? { status: 'revisar', method: 'comparacion', detail: entry._compareFail }
    : { status: 'pendiente-segunda-voz', method: 'numeros-vs-texto-pdf', detail: vn.reason };
}

// ---------------------------------------------------------------------------
// Se incluyen TAMBIÉN los PDFs sin ningún .md (estado 'sin-md'): el script único tools/pipeline.mjs los transcribe.
const pdfsAll = walkPdfs(resolve(root, 'Clubes')).sort();
const pending = pendingByOnboard();
const prov = loadProvenance();
const verifs = latestVerifications();

let entries = pdfsAll.map((pdfAbs) => {
  const pdf = relative(root, pdfAbs);
  const md = pdf.replace(/\.pdf$/i, '.md');
  const p = prov.get(md);
  const mdAbs = resolve(root, md);
  const tieneMd = existsSync(mdAbs);
  const head = tieneMd ? readFileSync(mdAbs, 'utf8').slice(0, 1500) : '';
  return {
    pdf, md, tieneMd,
    motor: !tieneMd ? 'ninguno' : p ? p.engine : 'legado',
    modelo: p ? p.model : 'sin registro (anterior a las APIs: subagente de Claude / Tesseract, ver CLAUDE.md)',
    fecha: p ? p.ts.slice(0, 10) : null,
    costoUsd: p ? p.costUsd : null,
    marcaEscaneoMistral: /ESCANEADO, TRANSCRIPTO CON MISTRAL OCR/.test(head),
    discrepanciaResuelta: /DISCREPANCIA MISTRAL\/GEMINI RESUELTA/.test(head),
    voces: findVoices(pdfAbs),
    cargado: !pending.has(pdf),
    mdSha1: tieneMd ? sha1(mdAbs) : null,
    // Versión 314: qué período cubre el documento, leído del CONTENIDO (tools/periodo.mjs): 'anual' (con `anual` = 'calendario' si cierra
    // en diciembre o 'temporada' si no), 'trimestral', 'semestral', 'nueve-meses', 'bimestral', 'intermedio', 'otro' (13, 18 meses...).
    // Un documento no anual NO se carga como ejercicio: queda marcado para juntarlo con los otros períodos cuando lleguen
    // (`node tools/periodo.mjs --grupos`). `nombreNoCoincide` avisa cuando el nombre del archivo dice otra fecha (Galatasaray: el nombre
    // dice cierre anual 31/05/2019 y el contenido es el primer trimestre al 31/08/2019).
    // (Versión 413) el ajuste manual `cierre` (tools/ajustes.mjs) es el escalón 0 del período: de acá lo toman localizar, verificar (año y
    // año vecino) y cargar. Caso: Novorizontino 2022, el contenido daba la fecha de la firma (28/04/2023).
    periodo: tieneMd ? (() => { const aj = ajusteDe(pdf, 'cierre'); if (aj) return { tipo: 'anual', meses: 12, cierre: aj.valor, anual: aj.valor.slice(5) === '12-31' ? 'calendario' : 'temporada', confianza: 'alta', evidencia: `ajuste manual (${aj.fecha}): ${aj.motivo}` }; try { const r = periodoDe(readFileSync(mdAbs, 'utf8'), pdf); return { tipo: r.tipo, meses: r.meses, cierre: r.cierre, anual: r.anual, confianza: r.confianza, nombreNoCoincide: r.nombreNoCoincide || undefined, evidencia: r.evidencia || undefined }; } catch { return null; } })() : null,
  };
});

const scope = entries.filter((e) => !dirFilter || e.pdf.startsWith(dirFilter.replace(/\/$/, '') + '/'));

if (doVerify) {
  // `--estado <x>` (Versión 320): solo los que están en ese estado (ej. sin-verificar); sin él, todos los no listos (revalida también los
  // `revisar` y `pendiente-segunda-voz` ya validados con el mismo contenido: gratis pero lento).
  const soloEstado = flagVal('--estado');
  const todo = scope.filter((e) => e.tieneMd && !e.cargado && currentState(e, verifs.get(e.md)).status !== 'listo' && (!soloEstado || currentState(e, verifs.get(e.md)).status === soloEstado)).slice(0, limit);
  console.log(`Validando ${todo.length} documento(s) sin gastar API...`);
  let i = 0;
  for (const e of todo) {
    i++;
    const res = runVerification(e);
    appendFileSync(verifPath, JSON.stringify({ ts: new Date().toISOString(), md: e.md, mdSha1: e.mdSha1, ...res }) + '\n');
    verifs.set(e.md, { md: e.md, mdSha1: e.mdSha1, ...res });
    if (i % 25 === 0 || i === todo.length) process.stdout.write(`  ${i}/${todo.length}\r`);
  }
  console.log('');
}

entries = entries.map((e) => {
  const s = currentState(e, verifs.get(e.md));
  const { mdSha1, ...rest } = e;
  const mf = motorFinal(e.motor, verifs.get(e.md), e.mdSha1);
  const vv = verifs.get(e.md);
  const jev = vv && vv.mdSha1 === e.mdSha1 && vv.jev ? { jev: vv.jev, rubros: vv.rubros ?? null } : {};
  return { ...rest, ...jev, ...(mf ? { motor: mf.motor, motorOriginal: e.motor, paginasReemplazadas: mf.paginasReemplazadas, reserva: mf.reserva, previo: mf.previo } : {}), estado: s.status, metodo: s.method, detalle: s.detail, mdSha1 };
});
writeFileSync(statePath, entries.map((e) => JSON.stringify(e)).join('\n') + '\n');

if (listState) {
  for (const e of entries.filter((x) => x.estado === listState && (!dirFilter || x.pdf.startsWith(dirFilter.replace(/\/$/, '') + '/')))) console.log(`${e.motor.padEnd(10)} ${e.pdf}\n    ${e.detalle}`);
  process.exit(0);
}

// Resumen
const tally = (arr, key) => arr.reduce((a, e) => ((a[key(e)] = (a[key(e)] || 0) + 1), a), {});
const scopeE = entries.filter((e) => !dirFilter || e.pdf.startsWith(dirFilter.replace(/\/$/, '') + '/'));
console.log(`\n${scopeE.length} PDFs (${scopeE.filter((e) => e.tieneMd).length} con .md)${dirFilter ? ` en ${dirFilter}` : ''}. Registro en Admin/transcripciones-estado.jsonl\n`);
// POR ETAPA (Versión 447, pedido de Guido el 2026-10-04: "que marquen en qué etapa o escalón está"): cada estado del registro con la etapa
// y el escalón del proceso nuevo; los "listo" se abren según lo que dejaron las etapas 3-8 en Generados/. La lógica vive en
// tools/etapa-doc.mjs (Versión 448), la misma que usa el tablero (tools/estado.mjs).
console.log('Por estado (con la etapa y el escalón del proceso, Admin/HANDOFF-pipeline.md):');
for (const [k, v] of Object.entries(tally(scopeE, (e) => e.estado)).sort((a, b) => b[1] - a[1])) {
  if (k !== 'listo') { const nd = scopeE.filter((e) => e.estado === k && !e.cargado && DESCARTADOS.has(e.pdf)).length; console.log(`  ${String(v).padStart(5)}  ${k.padEnd(22)} ${ETAPAS_DOC[claveDeEstado(k)]?.[1] || ''}${nd ? ` (${nd} descartados como fuente)` : ''}`); continue; }
  console.log(`  ${String(v).padStart(5)}  ${'listo'.padEnd(22)} Etapa 2 terminada (transcripción validada); de esos:`);
  for (const [et, n] of Object.entries(tally(scopeE.filter((e) => e.estado === 'listo'), (e) => etapaDe(e).texto)).sort((a, b) => a[0].localeCompare(b[0]))) console.log(`  ${''.padStart(5)}  ${String(n).padStart(22)}  ${et}`);
}
console.log('\nPor motor que hizo el .md (solo lo NO cargado todavía):');
const notLoaded = scopeE.filter((e) => !e.cargado);
const matrix = {};
// (Versión 447) sin la lista de páginas reemplazadas: "mistral + claude-api (págs. 3, 5)" y "(págs. 8)" cuentan juntos (antes ~120 renglones).
const motorCorto = (m) => String(m).replace(/\s*\(págs\.[^)]*\)/g, '');
for (const e of notLoaded) { const m = motorCorto(e.motor); (matrix[m] ||= {})[e.estado] = (matrix[m][e.estado] || 0) + 1; }
for (const [motor, st] of Object.entries(matrix)) console.log(`  ${motor.padEnd(11)} ${Object.entries(st).map(([k, v]) => `${k}: ${v}`).join(' | ')}`);

#!/usr/bin/env node
// ============================================================================
// tools/resolver-inventario.mjs — la fase PAGA que deja cada transcripción del inventario en estado
// "listo" (o explica por qué no puede). Trabaja sobre lo que tools/inventario-transcripciones.mjs
// dejó en revisar / pendiente-segunda-voz / sin-verificar / reintentar.
//
// IDEA CENTRAL (pedido de Guido, "MUST"): Claude NUNCA ve un documento entero si alcanza
// con ver unas páginas. Se detectan primero, gratis, las PÁGINAS con dudas comparando los números de
// cada página:
//   - PDF con texto seleccionable: los números de la página del .md contra los del texto de esa página
//     del PDF (pdftotext). Duda = el .md tiene un número que el PDF no tiene (lectura mal hecha).
//   - Escaneo (no hay texto en el PDF): los números de la página en dos transcripciones independientes
//     (la canónica contra la de Gemini). Duda = los conjuntos difieren.
// Solo esas páginas se mandan a Claude por API (recortadas con qpdf), y la página de Claude reemplaza a
// la canónica cuando corresponde. Una página en la que las tres voces discrepan queda marcada para
// revisión humana, no se adivina.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «resolver-inventario.mjs».
//
// USO:
//   node tools/resolver-inventario.mjs --dir Clubes/Chile                 # ensayo: qué haría y cuánto costaría
//   node tools/resolver-inventario.mjs --dir Clubes/Chile --ejecutar
//   node tools/resolver-inventario.mjs --ejecutar --limit 20 --estado revisar
//   node tools/resolver-inventario.mjs --ejecutar --pdf "Clubes/Chile/X/estados-financieros-2022.pdf"
//   node tools/resolver-inventario.mjs --ejecutar --lista Admin/Archive/pilotos/piloto-d.txt
//   node tools/resolver-inventario.mjs --ejecutar --concurrencia 3 --dir Clubes/Bélgica   # 3 documentos a la vez
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, copyFileSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { resolve, dirname, basename, join, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { AsyncLocalStorage } from 'node:async_hooks';
import { createHash } from 'node:crypto';
import { extractNumbers, verifyNumbers, NUM_RE, norm } from './verify-numbers.mjs';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const EXECUTE = args.includes('--ejecutar');
const dirFilter = flagVal('--dir');
const onlyPdf = flagVal('--pdf');
const listFile = flagVal('--lista'); // archivo con un PDF por línea (# = comentario)
const onlyList = listFile ? new Set(readFileSync(resolve(root, listFile), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))) : null;
const estadoFilter = flagVal('--estado');
const limit = flagVal('--limit') ? Number(flagVal('--limit')) : Infinity;
const concurrency = flagVal('--concurrencia') ? Number(flagVal('--concurrencia')) : 1;

const statePath = resolve(root, 'Admin', 'registros', 'transcripciones-estado.jsonl');
const verifPath = resolve(root, 'Admin', 'registros', 'transcripciones-verificaciones.jsonl');
export const TOOL = { mistral: 'tools/mistral-ocr-transcribe.mjs', gemini: 'tools/gemini-transcribe.mjs', claude: 'tools/claude-api-transcribe.mjs' };
export const LOGDIR = { mistral: 'mistral', gemini: 'gemini', claude: 'claude-api' };
const EST = { mistral: 0.004, gemini: 0.002, claude: 0.02 }; // USD por página, para el ensayo

import { diagnosticar } from './reparar-pdf.mjs';
import { paginasConNumeros } from './paginas-con-numeros.mjs';
import { derivado, ubicar } from './rutas.mjs';
import { chequearPaginas, quien, tablasDe, respaldoSumas, respaldoFilas } from './chequeos-gratis.mjs';
// splitPages vive en huella-paginas.mjs: la huella por página usa el mismo corte.
import { splitPages, huellasDePaginas, huellasDelTexto, ultimaConPaginas, compararPaginas } from './huella-paginas.mjs';
import { readJsonl, pageCount, pdfPageTexts, joinPages, numsOf, sameSet, StopRun, docCost, runCost, callEngine, transcribePages, BIG_DOC_PAGES, voiceByChunks, voiceGeminiPerPage, pageAccepted, textLayerDoubts, voiceDoubts, nl, vote, patchToMajority, settleByArithmetic } from './resolver-inventario-motores.mjs';

// ---------------------------------------------------------------- utilidades
export const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
const sha1 = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');

async function resolveDoc(e0) {
  let e = e0;
  // Un ".pdf" que no es un PDF (una página web HTML guardada con esa extensión, o un archivo cifrado): caso real de la primera
  // corrida del pipeline (Unión Magdalena: HTML de 38 KB; DNCG 2014-15: 2,9 MB de bytes sin cabecera). Reintentar no sirve:
  // se marca y hay que volver a conseguir el documento.
  try {
    const head = readFileSync(resolve(root, e.pdf)).subarray(0, 1024);
    if (!head.includes('%PDF')) {
      const html = /<!DOCTYPE|<html/i.test(head.toString('latin1'));
      return { status: 'no-es-pdf', detail: `el archivo no es un PDF (${html ? 'es una página web HTML guardada como .pdf' : 'no tiene cabecera de PDF, probablemente corrupto o cifrado'}): hay que volver a conseguir el documento`, prov: { base: e.motor, paginas: {} }, reserva: [], sinConsenso: [], parches: [], resolucion: {}, cost: 0 };
    }
  } catch { /* si no se puede leer, sigue y falla más abajo con su propio mensaje */ }
  // PDF con cabecera pero cortado (descarga incompleta, PEC Zwolle 2019-20): qpdf no lo recupera. Se marca igual que un no-es-pdf, con el
  // link de donde volver a bajarlo, en vez de dejarlo en "reintentar" con un error crudo de pdfinfo. (Los dañados recuperables y los de
  // imágenes gigantes los arregla tools/reparar-pdf.mjs adentro de cada motor.)
  const diag = diagnosticar(resolve(root, e.pdf));
  if (diag.estado === 'truncado') return { status: 'no-es-pdf', detail: `PDF truncado: ${diag.motivo}${diag.fuente ? `. Volver a bajarlo: ${diag.fuente}` : ''}`, prov: { base: e.motor, paginas: {} }, reserva: [], sinConsenso: [], parches: [], resolucion: {}, cost: 0 };
  const pdfAbs = resolve(root, e.pdf);
  const mdAbs = resolve(root, e.md);
  const nPages = pageCount(pdfAbs);
  const tag = e.pdf.split('/').slice(-2).join('/');
  const log = (m) => console.log(`    [${tag}] ${m}`);
  const prov = { base: e.motor, paginas: {} };
  const reserva = []; const sinConsenso = []; const parches = []; const resolucion = {};
  let previo = null; let formatoIntentado = false;
  const fin = (status, detail, extra = {}) => ({ status, detail, prov, reserva, sinConsenso, parches, resolucion, formatoIntentado, previo: previo ? relative(root, previo) : null, cost: docCost.getStore().cost, ...extra });
  const retry = (r, what) => fin(r.kind === 'agotado' ? 'reintentar' : 'revisar', `${what}: ${r.text}`);
  // -1) Sin ninguna transcripción todavía (documento nuevo): Mistral la hace, y sigue el camino de siempre.
  if (!existsSync(mdAbs)) {
    log('sin .md: lo transcribe Mistral');
    const r0 = await callEngine('mistral', pdfAbs, '');
    if (!r0.ok) return retry(r0, 'Mistral no pudo transcribir el documento nuevo');
    prov.base = 'mistral';
    e = { ...e, motor: 'mistral' };
  }
  let canon = splitPages(readFileSync(mdAbs, 'utf8'));
  // PÁGINAS QUE NO CAMBIARON: una página con la misma huella que en la última validación "listo"
  // de este .md ya está validada: no se vuelve a mandar a Claude ni a Gemini, y su resolución se conserva. Se recalcula sobre el .md
  // canónico ACTUAL (si arriba se rehace con Mistral, cambian todas y no se reusa nada). Caso: Juventus 2021-22, 17 páginas pagadas dos veces.
  const previaPags = ultimaConPaginas(e.md, { releer: true });
  const reusadas = () => new Set(previaPags ? compararPaginas(previaPags.paginasSha, huellasDePaginas(canon.pages)).iguales : []);
  if (previaPags) for (const n of reusadas()) if (previaPags.resolucion?.[n]) resolucion[n] = previaPags.resolucion[n];
  const backup = () => {
    if (previo) return;
    previo = derivado(mdAbs, `.previo-${e.motor === 'legado' ? 'legado' : e.motor}.md`);
    if (!existsSync(previo)) copyFileSync(mdAbs, previo);
  };
  const setPage = (n, body, engine) => {
    const cur = canon.pages.find((p) => p.n === n);
    if (cur) cur.body = nl(body); else canon.pages.push({ n, body: nl(body) });
    canon.pages.sort((x, y) => x.n - y.n);
    prov.paginas[n] = engine;
  };
  const canonBody = (n) => canon.pages.find((p) => p.n === n)?.body;
  const save = () => { if (Object.keys(prov.paginas).length) writeFileSync(mdAbs, joinPages(canon.pre, canon.pages)); };

  // -0.5) .md SIN TABLAS (visto en el lote de 50: 778 de los 954 .md viejos, 0 líneas con "|"): las etiquetas y los importes quedaron
  // en bloques separados, así que ninguna herramienta puede sacar rubros, sumas ni categorías. Sus números pueden estar bien (la
  // validación contra el PDF los da por buenos) pero no sirven para lo que sigue. Mistral (~$0.004/pág.) entrega tablas: se prueba
  // rehacerlo; si el nuevo tiene tablas, reemplaza al viejo (que queda en .previo-*.md) y sigue el camino normal de validación.
  const tableLines = (t) => t.split('\n').filter((l) => l.startsWith('|')).length;
  if (tableLines(readFileSync(mdAbs, 'utf8')) < 5 && nPages >= 2 && !String(prov.base).startsWith('mistral')) {
    formatoIntentado = true;
    const rf = await callEngine('mistral', pdfAbs, '.mistral-redo');
    if (rf.ok) {
      const nt = readFileSync(rf.path, 'utf8');
      if (tableLines(nt) >= 5) {
        backup();
        copyFileSync(rf.path, mdAbs);
        canon = splitPages(nt);
        prov.base = `${prov.base} -> mistral (re-hecho con tablas)`;
        log(`el .md no tenía tablas: rehecho con Mistral (${tableLines(nt)} filas de tabla)`);
      }
    } else if (rf.kind === 'agotado') return retry(rf, 'no se pudo rehacer con Mistral para obtener tablas');
  }

  // 0) .md sin marcas de página utilizables: se re-hace entero con Mistral (barato) y se sigue.
  if (canon.pages.length < Math.max(1, Math.floor(nPages * 0.5))) {
    log(`el .md tiene ${canon.pages.length} marcas de página para ${nPages} páginas: lo re-hago entero con Mistral`);
    const r = await callEngine('mistral', pdfAbs, '.mistral-redo');
    if (!r.ok) return retry(r, 'no se pudo re-hacer con Mistral');
    backup();
    copyFileSync(r.path, mdAbs);
    canon = splitPages(readFileSync(mdAbs, 'utf8'));
    prov.base = 'mistral (re-hecho)';
  }

  // SOLO PÁGINAS CON NÚMEROS (decisión de Guido: "gemini solo donde hay números, no la prosa"). Mistral transcribe el
  // documento entero (queda como documentación), pero la segunda voz y el desempate de Claude solo tienen trabajo donde hay cifras
  // que pueden terminar en el sitio. tools/paginas-con-numeros.mjs decide cuáles son, gratis, con el propio .md: medido sobre 222
  // ejercicios cargados, elige el 58% de las páginas y cubre el 99,7% de los importes de producción (Admin/mediciones/test-seleccion-paginas.md).
  // Se calcula sobre el .md canónico ACTUAL (puede haber cambiado arriba, al rehacerlo con Mistral) y se recalcula si vuelve a cambiar.
  //
  // CHEQUEOS GRATIS ANTES DE PAGAR: de las páginas con números, las que quedan respaldadas cifra
  // por cifra por el texto del PDF, las sumas de sus tablas, la columna del año anterior ya cargada en producción o el balance, quedan
  // `validada-gratis` y tampoco van a la segunda voz. Solo las `dudosa` se pagan. Medido sobre los 104 documentos que este resolver ya
  // había resuelto (Admin/mediciones/test-chequeos-gratis.md): de las 163 páginas con números que tenían un error real de lectura, las 163 quedan
  // `dudosa` (ninguna se da por buena mal), y el ahorro es ~49% del costo registrado. Los 15 errores que caen en `prosa` son
  // identificadores (INN rusos, números de organización noruegos, sellos) que no llegan al sitio.
  const q = quien(e.pdf);
  const cascada = async () => {
    const r = await chequearPaginas({ pdfPath: pdfAbs, mdText: joinPages(canon.pre, canon.pages), club: q.clubId, year: q.year });
    const reus = reusadas(); // una página sin cambios desde la última validación "listo" no es dudosa
    return { numericas: new Set(r.filter((x) => x.estado !== 'prosa').map((x) => x.pagina)), dudosas: new Set(r.filter((x) => x.estado === 'dudosa' && !reus.has(x.pagina)).map((x) => x.pagina)), validadas: r.filter((x) => x.estado === 'validada-gratis').length };
  };
  let cas = await cascada();
  let numericas = cas.numericas;
  log(`${numericas.size} de ${nPages} páginas con números (${cas.validadas} validadas gratis, ${cas.dudosas.size} dudosas); el resto es prosa y no se valida con una segunda voz`);

  let method = '';
  const vn0 = verifyNumbers(pdfAbs, mdAbs);
  let needScan = vn0.verdict === 'no-aplica';
  let voicePages = null; // null = todo el documento; una lista = solo esas páginas

  // 1) PDF con texto: la verdad está en el propio PDF.
  if (!needScan) {
    const pageTexts = pdfPageTexts(pdfAbs);
    let doubts = textLayerDoubts(pageTexts, canon);
    const withNumbers = pageTexts.filter((t) => numsOf(t).size > 0).length;
    log(`PDF con texto: ${doubts.length} de ${nPages} páginas con dudas`);
    if (doubts.length > 0.5 * withNumbers) {
      // Más de la mitad de las páginas no coinciden con el texto del PDF. ¿El malo es el .md (una transcripción vieja de
      // Tesseract, lo más común) o el texto del PDF (parcialmente roto, caso Cuiaba)? Se prueba con una lectura fresca y
      // barata de Mistral (~$0.004/pág.): si ESA sí coincide con el texto del PDF, el .md era el malo y se lo reemplaza;
      // si tampoco, el que falla es el texto del PDF y se comparan voces. (Antes se asumía siempre lo segundo y se
      // mandaba a Gemini + Claude documentos que Mistral arreglaba por centavos.)
      let fixedByMistral = false;
      if (!String(prov.base).startsWith('mistral')) {
        const rd = await callEngine('mistral', pdfAbs, '.mistral-redo');
        if (rd.ok) {
          const redo = splitPages(readFileSync(rd.path, 'utf8'));
          const dRedo = redo.pages.length >= 0.5 * nPages ? textLayerDoubts(pageTexts, redo) : null;
          if (dRedo && dRedo.length <= 0.5 * withNumbers && dRedo.length < doubts.length) {
            backup();
            copyFileSync(rd.path, mdAbs);
            canon = redo; doubts = dRedo; fixedByMistral = true;
            prov.base = `${prov.base} -> mistral (re-hecho)`;
            log(`el .md era el malo: Mistral lo re-hizo y ahora quedan ${dRedo.length} páginas dudosas`);
          }
        } else if (rd.kind === 'agotado') return retry(rd, 'no se pudo re-hacer con Mistral');
      }
      if (!fixedByMistral) {
        log('tampoco la lectura fresca de Mistral coincide con el texto del PDF: el texto del PDF no es confiable, comparo voces');
        needScan = true;
      } else { cas = await cascada(); numericas = cas.numericas; }
    }
    // La decisión de arriba ("¿más de la mitad no coincide?") se toma con TODAS las dudas, porque mide si el .md o el texto del PDF están
    // rotos en general. Pero a Claude solo van las dudas de páginas con números: una duda en prosa (un "3000" suelto, un número de
    // registro) no cambia nada del sitio. Medido en el piloto: Alverca ~8 de 17 dudas eran prosa; Rio Ave 13 dudas, 1 real.
    const dudasProsa = doubts.filter((n) => !numericas.has(n));
    if (dudasProsa.length) { log(`${dudasProsa.length} duda(s) en páginas de prosa, no se mandan a Claude: ${dudasProsa.join(', ')}`); doubts = doubts.filter((n) => numericas.has(n)); }
    // Y de las dudas en páginas con números, las que la cascada dejó respaldadas (por sumas o balance, aunque el texto del PDF difiera en
    // una cifra tolerada) tampoco se pagan.
    const reus = reusadas(); const dudasReusadas = doubts.filter((n) => reus.has(n));
    if (dudasReusadas.length) { log(`${dudasReusadas.length} duda(s) en páginas sin cambios desde la última validación (${previaPags.ts.slice(0, 10)}), no se mandan a Claude: ${dudasReusadas.join(', ')}`); doubts = doubts.filter((n) => !reus.has(n)); }
    const dudasValidadas = doubts.filter((n) => !cas.dudosas.has(n));
    if (dudasValidadas.length) { log(`${dudasValidadas.length} duda(s) respaldadas por los chequeos gratis, no se mandan a Claude: ${dudasValidadas.join(', ')}`); doubts = doubts.filter((n) => cas.dudosas.has(n)); }
    // Páginas SIN texto en el PDF pero con cifras en el .md (páginas-imagen dentro de un PDF con texto: caso Gent, 10 de 43):
    // no hay contra qué compararlas, así que van al camino de voces, solo esas. (Antes se contaban como "cifras sin respaldo"
    // y por pura coincidencia parecían lecturas mal hechas, mandando el documento ENTERO a Gemini y Claude.)
    const toVoices = pageTexts.map((t, i) => i + 1).filter((n) => cas.dudosas.has(n) && numsOf(pageTexts[n - 1]).size === 0 && numsOf(canonBody(n) || '').size > 0);
    if (!needScan && doubts.length) {
      const r = await transcribePages('claude', pdfAbs, doubts);
      if (!r.ok) return retry(r, 'Claude no pudo transcribir las páginas dudosas');
      backup();
      for (const [n, body] of r.pages) {
        const cSet = numsOf(body); const oldBody = canonBody(n);
        if (pageAccepted(cSet, numsOf(pageTexts[n - 1] || ''))) { setPage(n, body, 'claude-api'); resolucion[n] = 'texto-del-pdf'; }
        else if (oldBody !== undefined && sameSet(cSet, numsOf(oldBody))) { resolucion[n] = 'acuerdo-de-dos-lecturas'; } // el .md viejo y Claude leyeron igual y el texto del PDF difiere: es el texto del PDF
        else { setPage(n, body, 'claude-api'); toVoices.push(n); }
      }
      save();
    }
    if (!needScan) {
      method = `numeros-por-pagina vs texto del PDF + claude-api en ${Object.keys(prov.paginas).length} pág.`;
      if (!toVoices.length) return fin('listo', `${method}; ${withNumbers} págs. con cifras verificadas contra el texto del PDF`, { method });
      voicePages = [...new Set(toVoices)].sort((x, y) => x - y);
      log(`${voicePages.length} página(s) sin texto verificable en el PDF (o en las que Claude discrepa de todo): comparo voces solo en esas`);
      needScan = true;
      method += ' -> ';
    }
  }

  // 2) Escaneo (o texto ilegible): hace falta una segunda voz independiente.
  let voice; let voiceEngine = 'gemini'; let claudeOnly = new Set();
  // Antes: el documento entero (wholeList). Ahora: solo las páginas con números. Si no hay ninguna (una certificación de una carilla,
  // una memoria sin estados), no hay nada que validar con una segunda voz.
  // Escaneo: la cascada no tiene texto del PDF, así que solo valida páginas cuyas cifras cierran TODAS por sumas/balance/producción
  // (tolerancia 0 sin capa de texto); el resto de las páginas con números va a la segunda voz.
  const list = voicePages || [...cas.dudosas].sort((x, y) => x - y);
  if (!list.length) return fin('listo', `${method}${cas.validadas ? `${cas.validadas} páginas con números validadas gratis (sumas/balance/texto del PDF)` : 'sin páginas con números'}: nada que validar con una segunda voz`, { method: method + 'chequeos-gratis' });
  // Si la lista no es el documento entero (lo normal: solo páginas dudosas con números), Gemini recibe SOLO esas
  // páginas recortadas (por tramos). Antes, con una lista chica, se le mandaba el PDF entero y después se comparaban solo esas páginas:
  // se pagaba el documento completo igual.
  const big = list.length > BIG_DOC_PAGES || Boolean(voicePages) || list.length < nPages;
  let g;
  if (big) {
    log(`${voicePages ? 'páginas elegidas' : 'documento largo'} (${list.length} págs.): Gemini por tramos de ${BIG_CHUNK}`);
    const gv = await voiceByChunks('gemini', pdfAbs, list, log);
    g = gv.ok ? { ok: true, voice: gv.voice } : gv;
  } else {
    g = await callEngine('gemini', pdfAbs, '.gemini-check', { extraArgs: ['--timeout', '300'] });
  }
  if (g.ok) {
    voice = g.voice || splitPages(readFileSync(g.path, 'utf8'));
  } else if (g.kind === 'recitation' || g.kind === 'otro') {
    log(`Gemini rechazó el documento (${g.kind}): pruebo página por página (Claude solo en las que Gemini rechace)`);
    const pp = await voiceGeminiPerPage(pdfAbs, list, log);
    if (!pp.ok) return retry(pp, 'Gemini página por página y Claude no pudieron');
    voice = pp.voice; claudeOnly = pp.claudeOnly;
    // Si Gemini rechazó TODAS las páginas, la segunda voz es Claude entero (el flujo de siempre); si aceptó alguna, la voz es Gemini y
    // solo las rechazadas quedan con Claude como única segunda voz (`claudeOnly`).
    voiceEngine = claudeOnly.size === voice.pages.length ? 'claude' : 'gemini';
    if (voiceEngine === 'claude') claudeOnly = new Set();
  } else {
    return fin('reintentar', g.text);
  }
  if (voice.pages.length < Math.floor(list.length * 0.5)) return fin('revisar', `la segunda voz (${voiceEngine}) trae ${voice.pages.length} marcas de página para ${list.length} páginas`);
  const doubts = voiceDoubts(list, canon, voice);
  log(`segunda voz ${voiceEngine}: ${doubts.length} de ${list.length} páginas difieren`);
  const voiceBody = new Map(voice.pages.map((p) => [p.n, p.body]));
  if (doubts.length) {
    backup();
    // Las páginas `claudeOnly` (Gemini las rechazó) ya tienen a Claude como segunda voz: no se le pide un desempate a nadie más.
    const tieList = voiceEngine === 'gemini' ? doubts.filter((n) => !claudeOnly.has(n)) : doubts;
    const tie = tieList.length ? await transcribePages(voiceEngine === 'gemini' ? 'claude' : 'gemini', pdfAbs, tieList) : { ok: true, pages: new Map() };
    if (!tie.ok && (tie.kind === 'agotado' || voiceEngine === 'gemini')) return retry(tie, 'no se pudo desempatar');
    const pageCands = new Map(); const pending = [];
    const apply = (n, cands, idx, how, body) => {
      resolucion[n] = how;
      if (cands[idx].src === 'canónica' && how !== 'parche') { const cur = canon.pages.find((p) => p.n === n); if (cur && prov.paginas[n]) { cur.body = nl(cands[0].body); delete prov.paginas[n]; } return; }
      setPage(n, body ?? cands[idx].body, cands[idx].src);
    };
    // Pasos 0-1: mayoría entre las voces, y si no, parche de dígitos por mayoría (ambos gratis).
    const settleFree = (n, cands) => {
      const v = vote(cands);
      if (v.clean) { apply(n, cands, v.best, 'mayoria'); return true; }
      const p = patchToMajority(cands, v.best);
      if (p) { apply(n, cands, v.best, 'parche', p.body); parches.push(...p.parches.map((x) => `pág. ${n}: ${x}`)); return true; }
      return false;
    };
    for (const n of doubts) {
      const bClaude = claudeOnly.has(n) || voiceEngine === 'claude';
      const A = canonBody(n); const B = voiceBody.get(n); const C = !claudeOnly.has(n) && tie.ok ? tie.pages.get(n) : undefined;
      const names = ['canónica', bClaude ? 'claude-api' : 'gemini', bClaude ? 'gemini' : 'claude-api'];
      const cands = [[A, names[0]], [B, names[1]], [C, names[2]]].filter(([b]) => b !== undefined).map(([body, src]) => ({ body, src }));
      if (cands.length === 3) {
        pageCands.set(n, cands);
        if (!settleFree(n, cands)) pending.push(n);
      } else if (cands.length === 2 && bClaude) {
        // Gemini rechazó también esa página: solo hay dos voces (la canónica y Claude). Primero la aritmética (sumas verticales
        // y horizontales); si decide, gana esa lectura sin reserva. Si no, gana Claude, con reserva.
        const idx2 = A !== undefined ? settleByArithmetic(cands) : null;
        if (idx2 !== null) apply(n, cands, idx2, 'sumas');
        else { setPage(n, B, 'claude-api'); if (A !== undefined) { reserva.push(n); resolucion[n] = 'claude-con-reserva'; } }
      } else {
        sinConsenso.push(n);
      }
    }
    // Paso 2: una CUARTA voz barata (Mistral, ~$0.004/pág.) para las que siguen sin consenso, salvo que el .md base ya sea
    // de Mistral (mismo motor: repetiría el mismo error, no aporta una voz nueva).
    if (pending.length && !String(prov.base).startsWith('mistral')) {
      log(`páginas sin consenso (${pending.join(', ')}): pido una cuarta voz a Mistral`);
      const m = await transcribePages('mistral', pdfAbs, [...pending]);
      if (m.ok) {
        for (const n of [...pending]) {
          const cands = [...pageCands.get(n), { body: m.pages.get(n), src: 'mistral' }];
          pageCands.set(n, cands);
          if (settleFree(n, cands)) pending.splice(pending.indexOf(n), 1);
        }
      } else if (m.kind === 'agotado') return retry(m, 'no se pudo pedir la cuarta voz');
    }
    // Paso 3: la aritmética del documento (gratis).
    for (const n of [...pending]) {
      const cands = pageCands.get(n);
      const idx = settleByArithmetic(cands);
      if (idx !== null) { apply(n, cands, idx, 'sumas'); pending.splice(pending.indexOf(n), 1); }
    }
    // Paso 4: gana Claude, con reserva (cerrar con sum-check al onboardear).
    for (const n of [...pending]) {
      const cands = pageCands.get(n);
      const idx = cands.findIndex((c) => c.src === 'claude-api');
      if (idx >= 0) { apply(n, cands, idx, 'claude-con-reserva'); reserva.push(n); } else sinConsenso.push(n);
    }
    save();
  }
  method += `mayoria-por-pagina (${voiceEngine})`;
  if (sinConsenso.length) return fin('revisar', `${method}; sin consenso entre las voces en las páginas ${sinConsenso.join(', ')}`, { method });
  return fin('listo', `${method}${reserva.length ? `; RESERVA: solo Claude validó las páginas ${reserva.join(', ')} (cerrar con sum-check al onboardear)` : ''}`, { method });
}

// ---------------------------------------------------------------- ensayo (gratis)
function dryRunDoc(e) {
  const pdfAbs = resolve(root, e.pdf);
  const nPages = pageCount(pdfAbs);
  // FRAC_NUM: fracción de páginas con números (medida: 58%, Admin/mediciones/test-seleccion-paginas.md). Solo esas van a la segunda voz; Mistral
  // transcribe todas. Si ya hay .md, se usa la fracción real de ESE documento.
  const FRAC_NUM = 0.58;
  if (!existsSync(resolve(root, e.md))) return { plan: 'sin .md: Mistral + Gemini/Claude en págs. dudosas', nPages, cost: nPages * EST.mistral + nPages * FRAC_NUM * (EST.gemini + 0.6 * 0.25 * EST.claude + 0.15 * EST.claude) };
  const mdText = readFileSync(resolve(root, e.md), 'utf8');
  // LA MISMA CONDICIÓN QUE EL PASO -0.5 DE resolveDoc(): un .md viejo sin tablas (menos de 5
  // renglones "|", 2+ páginas, motor que no es Mistral) se rehace entero con Mistral antes de validar. El ensayo no lo contaba: cotizaba
  // solo la validación del .md viejo. Caso: la corrida de Admin/lotes/sin-tablas-298e.txt (238 documentos), ensayo US$ 7,26 y real
  // US$ 43,09 (Mistral 8.335 páginas, US$ 33,34). La validación del .md nuevo se estima con la del viejo (en esa corrida, 7,26 contra ~10).
  if (mdText.split('\n').filter((l) => l.startsWith('|')).length < 5 && nPages >= 2 && !String(e.motor).startsWith('mistral')) {
    const r = dryRunDoc({ ...e, motor: 'mistral' });
    return { ...r, plan: `sin tablas: se rehace con Mistral (${nPages} pág.); después ${r.plan}`, cost: nPages * EST.mistral + r.cost };
  }
  const canon = splitPages(mdText);
  if (canon.pages.length < Math.max(1, Math.floor(nPages * 0.5))) return { plan: 'rehacer-mistral', nPages, cost: nPages * EST.mistral + nPages * FRAC_NUM * 0.15 * EST.claude };
  const numericas = new Set(paginasConNumeros({ mdText }).paginas);
  const nNum = numericas.size;
  const vn = verifyNumbers(pdfAbs, resolve(root, e.md));
  if (vn.verdict !== 'no-aplica') {
    const pt = pdfPageTexts(pdfAbs);
    const all = textLayerDoubts(pt, canon);
    if (all.length > 0.5 * pt.filter((t) => numsOf(t).size > 0).length) return { plan: 'escaneo: Gemini + Claude en págs. que difieran', nPages, cost: nNum * EST.gemini + nNum * 0.6 * 0.25 * EST.claude };
    const prev = ultimaConPaginas(e.md); const reus = new Set(prev ? compararPaginas(prev.paginasSha, huellasDePaginas(canon.pages)).iguales : []);
    const nr = all.filter((n) => numericas.has(n) && reus.has(n)).length; // sin cambios desde la última validación: no se pagan
    const d = all.filter((n) => numericas.has(n) && !reus.has(n)).length;
    return { plan: `texto: ${d} pág. dudosas (${all.length - d - nr} en prosa${nr ? `, ${nr} sin cambios` : ''}, no se pagan)`, nPages, doubts: d, cost: d * EST.claude };
  }
  return { plan: `escaneo: Gemini + Claude en ${nNum} págs. con números`, nPages, cost: nNum * EST.gemini + nNum * 0.6 * 0.25 * EST.claude };
}

// ---------------------------------------------------------------- main
const ledger = readJsonl(statePath);
if (!ledger.length) { console.error('Falta Admin/registros/transcripciones-estado.jsonl: corré primero node tools/inventario-transcripciones.mjs'); process.exit(1); }
const TODO_STATES = new Set(estadoFilter ? [estadoFilter] : ['sin-md', 'sin-tablas', 'revisar', 'pendiente-segunda-voz', 'sin-verificar', 'reintentar']);
let todo = ledger.filter((e) => !e.cargado && TODO_STATES.has(e.estado)
  && (!dirFilter || e.pdf.startsWith(dirFilter.replace(/\/$/, '') + '/'))
  && (!onlyPdf || e.pdf === onlyPdf)
  && (!onlyList || onlyList.has(e.pdf))).slice(0, limit);

console.log(`${todo.length} documento(s) a resolver${dirFilter ? ` en ${dirFilter}` : ''}. ${EXECUTE ? 'EJECUCIÓN REAL (gasta API)' : 'ENSAYO: no llamo a ninguna API'}\n`);

if (!EXECUTE) {
  let total = 0; const byPlan = {};
  for (const e of todo) {
    let r;
    try { r = dryRunDoc(e); } catch (err) { console.log(`  ?  ${e.pdf}: ${err.message}`); continue; }
    total += r.cost;
    const k = r.plan.startsWith('texto') ? 'texto (Claude solo en págs. dudosas)' : r.plan.startsWith('sin tablas') ? 'sin tablas: se rehace con Mistral y después se valida' : r.plan;
    (byPlan[k] ||= { n: 0, cost: 0, pages: 0 }); byPlan[k].n++; byPlan[k].cost += r.cost; byPlan[k].pages += r.nPages;
    if (todo.length <= 40) console.log(`  ${r.plan.padEnd(46)} ${String(r.nPages).padStart(4)} pág  ~$${r.cost.toFixed(2)}  ${e.pdf}`);
  }
  console.log('\nResumen del ensayo (estimación gruesa):');
  for (const [k, v] of Object.entries(byPlan)) console.log(`  ${String(v.n).padStart(4)} docs  ${String(v.pages).padStart(6)} pág  ~$${v.cost.toFixed(2)}  ${k}`);
  console.log(`  TOTAL ~$${total.toFixed(2)}\nPara ejecutar de verdad, agregá --ejecutar.`);
  process.exit(0);
}

const tally = {};
let done = 0; let stopped = null; let next = 0;

async function worker() {
  while (!stopped) {
    const idx = next++;
    if (idx >= todo.length) return;
    const e = todo[idx];
    console.log(`[${idx + 1}/${todo.length}] ${e.pdf}`);
    let res;
    try {
      res = await docCost.run({ cost: 0 }, () => resolveDoc(e));
    } catch (err) {
      if (err instanceof StopRun) {
        stopped = err.message;
        appendFileSync(verifPath, JSON.stringify({ ts: new Date().toISOString(), md: e.md, mdSha1: existsSync(resolve(root, e.md)) ? sha1(resolve(root, e.md)) : null, status: 'reintentar', method: 'resolver-inventario', detail: err.message }) + '\n');
        return;
      }
      res = { status: 'reintentar', detail: `error inesperado: ${err.message}`.slice(0, 300), prov: { base: e.motor, paginas: {} }, reserva: [], sinConsenso: [], cost: 0 };
    }
    appendFileSync(verifPath, JSON.stringify({
      ts: new Date().toISOString(), md: e.md, mdSha1: existsSync(resolve(root, e.md)) ? sha1(resolve(root, e.md)) : null, status: res.status, method: res.method || 'resolver-inventario', detail: res.detail,
      // la huella de cada página del .md tal como quedó: la próxima validación reusa las que no cambien.
      paginasSha: existsSync(resolve(root, e.md)) ? huellasDelTexto(readFileSync(resolve(root, e.md), 'utf8')) : null,
      proveniencia: res.prov, reserva: res.reserva, sinConsenso: res.sinConsenso, parches: res.parches || [], resolucion: res.resolucion || {}, formatoIntentado: Boolean(res.formatoIntentado), previo: res.previo || null, costoUsd: Number((res.cost || 0).toFixed(4)),
    }) + '\n');
    tally[res.status] = (tally[res.status] || 0) + 1;
    done++;
    console.log(`    -> ${e.pdf.split('/').slice(-2).join('/')}: ${res.status.toUpperCase()}: ${res.detail}  (~$${(res.cost || 0).toFixed(3)})  [${done}/${todo.length} terminados, gasto acumulado ~$${runCost.toFixed(2)}]`);
  }
}

try {
  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));
} finally {
  if (stopped) console.log(`\nCORRIDA DETENIDA: ${stopped}\nLos documentos que faltan siguen en su estado y la próxima corrida los retoma.`);
  console.log(`\nResumen: ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(', ') || 'nada procesado'}. Costo API de esta corrida: ~$${runCost.toFixed(2)}`);
  console.log('Corré node tools/inventario-transcripciones.mjs para regenerar el registro.');
}

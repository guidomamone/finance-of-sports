#!/usr/bin/env node
// ============================================================================
// tools/alta-club.mjs — el ALTA de un club nuevo y los DATOS DE CONTEXTO de un
// ejercicio (tipo de cambio, liga, moneda, cierre), por script, sin tokens de
// sesión. Pedido de Guido: de 3.042 PDFs pendientes, ~2.200 son de
// clubes que todavía no existen en el sitio, y todo lo que es mecánico del alta
// no tiene por qué pasar por Claude.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «alta-club.mjs».
//
// ----------------------------------------------------------------------------
// USO
// ----------------------------------------------------------------------------
//   node tools/alta-club.mjs "Clubes/Grecia/OFI Crete/OFI_FS_2025-06-30.pdf"
//        (default --propuesta: imprime el JSON con cada campo, valor, fuente, estado)
//   node tools/alta-club.mjs "<pdf o md>" --anio 2025
//   node tools/alta-club.mjs "<pdf o md>" --escribir
//   node tools/alta-club.mjs "<doc1>" "<doc2>" ... --resumen
//        (varios documentos: una línea por club con % de campos ok y sus preguntas)
//   node tools/alta-club.mjs ... --anotar-misses
//        (en --propuesta las cachés se leen directo y NO se anota nada en los
//        misses.jsonl de las tools de lookup; con este flag, o con --escribir, se
// ============================================================================

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, basename, extname, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { clubDeCarpeta } from './carpetas-clubes.mjs';
import { deportesActivos } from './deporte-club.mjs'; // deportes activos del catálogo
import { ajusteDe, ajustePerimetroDe } from './ajustes.mjs';
import { leerRegistro, guardarEnRegistro, resumenAltas } from './altas-registro.mjs';
import { MODELO_DEFAULT } from './alta-claude.mjs';
import {  } from './club-json.mjs'; // el JSON es la fuente de cada club
import { paisDe } from './alta-club-tablas.mjs';
import { proponerFx, proponerLiga, escribir } from './alta-club-escribir.mjs';
import { modoInformeBacktest, modoBacktest, deshacerAlta } from './alta-club-backtest.mjs';
import { aplicables, analizarCarpeta, finalizar, cargarSitioCache, correrClaude, modoTodos, imprimirResumen, modoDudas } from './alta-club-registro.mjs';
import { cierreYAnio, monedaDelEjercicio, deporteDelTexto, camposDelClub, tipoDeDocumento, perimetroDelDocumento, contextoYAvisos } from './alta-club-analisis.mjs';
export { sha1, estadoTranscripciones } from './alta-club-registro.mjs';
export { MONEDAS, MESES, MES_ALT } from './alta-club-tablas.mjs';
export { nombreLegal, nombrePortada, nombreBienEscrito, decidirNombre } from './alta-club-lectura.mjs';
export { resumenAltas };

const ROOT = resolve(import.meta.dirname, '..');
export const ARGS = process.argv.slice(2);
export const flagVal = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const ESCRIBIR = ARGS.includes('--escribir');
const RESUMEN = ARGS.includes('--resumen');
export const ANOTAR_MISSES = ARGS.includes('--anotar-misses') || ESCRIBIR;
export const ANIO_FORZADO = flagVal('--anio') ? Number(flagVal('--anio')) : null;
const TODOS = ARGS.includes('--todos');
const DUDAS = ARGS.includes('--dudas');
export const CLAUDE = ARGS.includes('--claude');
const BACKTEST = ARGS.includes('--backtest-claude');
export const FORZAR = ARGS.includes('--forzar');
export const MODELO = flagVal('--modelo') || MODELO_DEFAULT;
export const LIMITE = flagVal('--limit') !== null ? Number(flagVal('--limit')) : null;
export const TOPE_USD = flagVal('--tope-usd') !== null ? Number(flagVal('--tope-usd')) : 1;
const CON_VALOR = new Set(['--anio', '--modelo', '--limit', '--tope-usd', '--solo', '--deshacer']);
const DOCS = ARGS.filter((a, i) => !a.startsWith('--') && !CON_VALOR.has(ARGS[i - 1]));

// ============================================================================
// UTILIDADES
// ============================================================================
// OJO con el `normalize('NFC')` final (bug real encontrado probando este script): NFD
// descompone las sílabas coreanas en jamo sueltos, y sin recomponerlas ni "2024년 12월 31일" ni
// "손익계산서" matcheaban nada. Efecto colateral aceptado: la "й" rusa y la "ї" ucraniana pierden
// su diacrítico (quedan "и"/"і"), así que los patrones de abajo usan raíces sin esas letras.
export function norm(s) {
  return String(s || '').toLowerCase()
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/ı/g, 'i').replace(/ł/g, 'l').replace(/đ/g, 'd')
    .normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
}
export const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '');
const slugGuion = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
export const rel = (p) => relative(ROOT, p);
export const ultimoDia = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
export const pad2 = (n) => String(n).padStart(2, '0');
export const bandera = (iso2) => iso2 ? String.fromCodePoint(...[...iso2.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : null;

export function campo(nombre, valor, fuente, estado = 'ok', extra = {}) {
  return { campo: nombre, valor, fuente, estado, ...extra };
}

export function runNode(script, args) {
  try {
    return { code: 0, out: execFileSync('node', [resolve(ROOT, script), ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'] }) };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') };
  }
}

// ============================================================================
// DATOS DEL SITIO (mismo patrón de `vm` que onboard.mjs / audit.js: se ejecutan
// los archivos reales, nunca se parsean a mano)
// ============================================================================
export function cargarSitio() {
  const sandbox = { console: { log() {}, warn() {}, error() {} }, window: {}, document: { createElement() { return {}; }, head: { appendChild() {} } } };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const run = (relPath) => vm.runInContext(readFileSync(resolve(ROOT, relPath), 'utf8'), ctx, { filename: relPath });
  for (const f of ['data/clubs.js', 'data/currency-map.js', 'data/leagues.js', 'data/club-leagues.js']) run(f);
  for (const f of readdirSync(resolve(ROOT, 'data/club-leagues')).filter((f) => f.endsWith('.js')).sort()) run('data/club-leagues/' + f);
  return vm.runInContext(`({ clubs, CURRENCY_META, FX_CLOSE, FX_PLAUSIBLE_RANGE, COUNTRIES, LEAGUES, CLUB_LEAGUE_BY_YEAR: window.CLUB_LEAGUE_BY_YEAR })`, ctx);
}

// ============================================================================
// EL ANÁLISIS DE UN DOCUMENTO
// ============================================================================
// `ov` (overrides): respuestas que Claude por API ya dio CON CITA VERIFICADA (tools/alta-claude.mjs), para
// volver a correr el análisis con esos valores en lugar de la pregunta. Cada una es { valor, fuente }:
//   ov.cierre 'AAAA-MM-DD' · ov.reportType · ov.perimetro · ov.moneda · ov.sport · ov.name · ov.fx (número)
// Solo se aplican las que DESBLOQUEAN sin decidir nada de producto (ver aplicables() más abajo).
export function analizar(docArg, sitio, ov = {}) {
  // Relativo a donde se corre el comando, o a la raíz del proyecto.
  const abs = existsSync(resolve(process.cwd(), docArg)) ? resolve(process.cwd(), docArg) : resolve(ROOT, docArg);
  const ext = extname(abs).toLowerCase();
  const pdf = ext === '.pdf' ? abs : abs.replace(/\.md$/i, '.pdf');
  const mdPath = ext === '.md' ? abs : abs.replace(/\.pdf$/i, '.md');
  const r = { documento: rel(abs), pdf: existsSync(pdf) ? rel(pdf) : null, md: existsSync(mdPath) ? rel(mdPath) : null, club: {}, campos: [], ejercicio: { campos: [] }, avisos: [] };
  const partes = relative(resolve(ROOT, 'Clubes'), abs).split('/');
  if (partes.length < 3 || partes[0].startsWith('..')) { r.error = 'el documento no está en Clubes/<País>/<Club>/'; return r; }
  // AJUSTES MANUALES de cierre y reportType: escalón 0, ganan sobre la respuesta de Claude por API y sobre lo detectado.
  for (const c of ['cierre', 'reportType']) { const a = r.pdf ? ajusteDe(r.pdf, c) : null; if (a) ov = { ...ov, [c]: { valor: a.valor, fuente: `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${a.autor} ${a.fecha}): ${a.motivo}`, manual: true } }; }
  // Lo mismo para el PERÍMETRO, del documento o de todo el club (ajustePerimetroDe, el mismo escalón 0 que usa cargar.mjs).
  // Caso: lote 14, el ajuste "Bologna -> consolidado" (perimetro-senales.mjs) lo leía cargar.mjs pero no el alta, que volvía a preguntar
  // y bloqueaba --escribir.
  { const a = r.pdf ? ajustePerimetroDe(r.pdf) : null; if (a) ov = { ...ov, perimetro: { valor: a.valor, fuente: `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${a.autor} ${a.fecha}): ${a.motivo}`, manual: true } }; }
  const [paisCarpeta, clubCarpeta] = partes;
  r.carpeta = `Clubes/${paisCarpeta}/${clubCarpeta}/`;
  if (clubCarpeta.startsWith('_')) { r.error = `"${clubCarpeta}" es una carpeta de agregado (empieza con "_"), no un club`; return r; }
  if (!r.md) { r.error = 'no hay .md: transcribir primero (node tools/pipeline.mjs, etapa 2)'; return r; }
  const md = readFileSync(mdPath, 'utf8');
  const mdNorm = norm(md);
  const pais = paisDe(paisCarpeta);

  // ---------------------------------------------------------------- ¿ya existe?
  // UNA sola regla en todo el proyecto: cita en algún
  // data/<país>/<id>-data.js o en su evidencia (Admin/carga-clubes/<id>.md) -> ese club; si no, nombre IGUAL a un club del mismo país; si no, club nuevo.
  // Antes este script tenía su propia versión (mapa de citas + `onboard.mjs --quien` +
  // desempate por país) y onboard.mjs otra distinta: dos reglas que podían dar respuestas distintas
  // para la misma carpeta. Ahora las dos (y audit.js, que vigila que la regla sea inequívoca) usan esta.
  const res = clubDeCarpeta(paisCarpeta, clubCarpeta);
  let existente = null;
  if (res.clubId) existente = { clubId: res.clubId, fuente: `tools/carpetas-clubes.mjs (${res.via}: ${res.fuente})` };
  else if (res.via === 'ambigua') r.avisos.push(`tools/carpetas-clubes.mjs no puede decidir a qué club corresponde ${r.carpeta} (${res.fuente}): se analiza como club nuevo, pero audit.js da P1 hasta que se resuelva.`);
  r.resolucion = { via: res.via, clubId: res.clubId || null, ids: res.ids || undefined };
  r.club = existente ? { existe: true, ...existente } : { existe: false };

  // ---------------------------------------------------------------- año y cierre
  const { nombreArchivo, cierreTxt, nIntermedio, esIntermedio, hermanos, cierresClub, fuentePatronPais, mesCierre, anio, estadoAnio, fuenteAnio, preguntaAnio, cierre, fiscalYearStart, estadoCierre, preguntaCierre, fuenteCierre } = cierreYAnio({ abs, r, md, mdPath, paisCarpeta, clubCarpeta, pais, sitio, ov });

  // ---------------------------------------------------------------- moneda del ejercicio
  let { moneda, estadoMoneda, fuenteMoneda, preguntaMoneda } = monedaDelEjercicio({ r, pais, paisCarpeta, anio, mdNorm });

  // ---------------------------------------------------------------- deporte
  const { nFutbol, otros, deporte, fuenteDeporteClaude } = deporteDelTexto({ mdNorm, clubCarpeta, ov });

  // ---------------------------------------------------------------- campos del club
  camposDelClub({ r, md, pais, paisCarpeta, clubCarpeta, sitio, ov, cierresClub, fiscalYearStart, estadoCierre, preguntaCierre, fuenteCierre, fuentePatronPais, cierreTxt, deporte, nFutbol, otros, fuenteDeporteClaude });

  // ---------------------------------------------------------------- campos del ejercicio
  const clubId = r.club.existe ? r.club.clubId : (r.campos.find((c) => c.campo === 'id') || {}).valor;
  const E = r.ejercicio.campos;
  r.ejercicio.anio = anio; r.ejercicio.cierre = cierre;
  E.push(campo('anio', anio, fuenteAnio, estadoAnio, preguntaAnio ? { pregunta: preguntaAnio } : {}));
  E.push(campo('cierre', cierre, cierre ? `año del ejercicio + mes de cierre (${fuenteCierre})` : null, cierre ? (estadoCierre === 'pregunta' ? 'pregunta' : 'ok') : 'pregunta', cierre ? (preguntaCierre ? { pregunta: preguntaCierre } : {}) : { pregunta: 'No se pudo determinar la fecha de cierre del ejercicio.' }));

  // Tipo de documento
  const { reportType, nomNorm } = tipoDeDocumento({ r, md, mdNorm, nombreArchivo, esIntermedio, nIntermedio, ov, E });

  // Perímetro: qué entidad es "el club"
  perimetroDelDocumento({ r, mdNorm, mdPath, hermanos, anio, nomNorm, nombreArchivo, ov, E });

  // Moneda del ejercicio
  if (ov.moneda && pais && ov.moneda.valor === pais.moneda && estadoMoneda === 'pregunta') { moneda = pais.moneda; estadoMoneda = 'ok'; preguntaMoneda = null; fuenteMoneda = `claude-api con cita verificada: ${ov.moneda.fuente}`; }
  // AJUSTE MANUAL `moneda`: escalón 0 de la pregunta "¿se carga en la moneda legado o se convierte a EUR?". Solo cuando el ejercicio es
  // anterior a la entrada del euro y el valor del ajuste es la moneda legado del país. Caso: Lazio 1998-99, 1999-00 y 2000-01 en liras.
  { const aMon = r.pdf ? ajusteDe(r.pdf, 'moneda') : null;
    if (aMon && pais && pais.legado && anio && anio < pais.legado.desde && aMon.valor === pais.legado.codigo && estadoMoneda === 'pregunta') { moneda = aMon.valor; estadoMoneda = 'ok'; preguntaMoneda = null; fuenteMoneda = `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${aMon.autor} ${aMon.fecha}): ${aMon.motivo}`; } }
  E.push(campo('currency', moneda, fuenteMoneda, estadoMoneda, preguntaMoneda ? { pregunta: preguntaMoneda } : {}));

  // Tipo de cambio
  const fxCampos = proponerFx(md, moneda, cierre, estadoMoneda, reportType, sitio, ov.fx, r.pdf ? ajusteDe(r.pdf, 'fx') : null);
  E.push(...fxCampos);

  // sourceId
  // Si el nombre del archivo ya arranca con el nombre del club ("SlaviaPraha_SL108_2019-06-30",
  // "Genoa-bilancio-..."), esas palabras se sacan para no repetir el club dos veces en el id.
  let tokensArchivo = slugGuion(basename(abs, extname(abs))).split('-').filter(Boolean);
  const baseClub = clubId ? clubId.replace(/-[a-z]{2}$/, '').replace(/-/g, '') : '';
  for (let k = 1; k <= Math.min(4, tokensArchivo.length - 1); k++) {
    if (tokensArchivo.slice(0, k).join('') === baseClub || tokensArchivo.slice(0, k).join('') === slug(clubCarpeta)) { tokensArchivo = tokensArchivo.slice(k); break; }
  }
  const sourceId = clubId ? `${clubId}-${tokensArchivo.join('-')}` : null;
  E.push(campo('sourceId', sourceId, 'clubId + nombre del archivo en slug'));

  // Liga
  E.push(proponerLiga(clubId, r.club.existe ? (sitio.clubs[clubId] || {}).displayName : clubCarpeta, pais, anio, sitio, cierre));

  // DEPORTE DECLARADO, en este orden: la ficha del club (data/clubs.js) -> la liga del club (data/leagues.js tiene `sport`: es un dato, no un supuesto) -> las menciones del .md
  // (la regla de arriba). Pregunta solo si ninguna responde: sin fútbol nombrado, sin otro deporte nombrado y sin ficha ni liga el deporte NO se supone fútbol. Medido sobre Clubes/:
  // 31 de 400 carpetas no nombran el fútbol (los clubes coreanos, estonios, All Boys...); sin mirar la liga y la ficha se frenarían a la cola por nada.
  {
    const iSp = r.campos.findIndex((c) => c.campo === 'sport'); const ligaC = E.find((c) => c.campo === 'liga');
    const deLaFicha = r.club.existe ? (sitio.clubs[clubId] || {}).sport : null;
    const deLaLiga = ligaC && ligaC.valor ? (sitio.LEAGUES[ligaC.valor] || {}).sport : null;
    const decl = deLaFicha ? { v: deLaFicha, f: `la ficha de ${clubId} en data/clubs.js dice ${deLaFicha}` } : deLaLiga ? { v: deLaLiga, f: `la liga ${ligaC.valor} del catálogo (data/leagues.js) es de ${deLaLiga}` } : null;
    if (iSp >= 0 && decl && deportesActivos().includes(decl.v)) r.campos[iSp] = campo('sport', decl.v, decl.f);
    else if (iSp >= 0 && !decl && r.campos[iSp].estado !== 'pregunta' && !fuenteDeporteClaude && nFutbol <= 0) r.campos[iSp] = campo('sport', null, 'ni la ficha, ni la liga, ni el .md nombran un deporte', 'pregunta', { pregunta: '¿De qué deporte es el club? El .md no nombra el fútbol ni ningún otro deporte y todavía no hay ficha ni liga del club en el catálogo.' });
  }

  contextoYAvisos({ r, E, pais, paisCarpeta, sitio, clubId, mesCierre, fuentePatronPais });

  // Resumen
  const todos = [...r.campos, ...E];
  const cnt = (e) => todos.filter((c) => c.estado === e).length;
  r.resumen = { campos: todos.length, ok: cnt('ok'), pregunta: cnt('pregunta'), pendiente: cnt('pendiente'), pctOk: Math.round((100 * cnt('ok')) / todos.length), bloqueaEscribir: cnt('pregunta') > 0 || r.club.existe };
  r.preguntas = todos.filter((c) => c.estado === 'pregunta').map((c) => ({ campo: c.campo, pregunta: c.pregunta }));
  return r;
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  if (flagVal('--deshacer')) return deshacerAlta(flagVal('--deshacer'), { escribir: ESCRIBIR });
  if (BACKTEST) return modoBacktest();
  if (ARGS.includes('--informe-backtest')) return modoInformeBacktest();
  if (DUDAS) return modoDudas();
  if (TODOS) return modoTodos();
  if (RESUMEN && !DOCS.length) return imprimirResumen();
  if (!DOCS.length) {
    console.error('Uso: node tools/alta-club.mjs "<Clubes/País/Club/doc.pdf|.md>" [--anio N] [--escribir] [--claude] [--anotar-misses]\n     node tools/alta-club.mjs --todos [--claude] [--tope-usd 1] [--limit N] [--solo <texto>] [--forzar]\n     node tools/alta-club.mjs --resumen | --dudas | --backtest-claude [--limit 5] [--saltear N]');
    process.exit(1);
  }
  if (ESCRIBIR && DOCS.length > 1) { console.error('--escribir va de a un documento por vez.'); process.exit(1); }
  const sitio = cargarSitioCache();
  const previo = leerRegistro();
  const resultados = []; const entradas = [];
  for (const d of DOCS) {
    const r0 = analizar(d, sitio);
    if (r0.error && !r0.carpeta) { resultados.push(r0); continue; }
    const [, paisCarpeta, clubCarpeta] = (r0.carpeta || '').split('/');
    if (!paisCarpeta || clubCarpeta.startsWith('_')) { resultados.push(r0); continue; }
    // El registro se actualiza SIEMPRE (pedido de Guido: que lo haga el script, no quien lo corre).
    const x = analizarCarpeta(paisCarpeta, clubCarpeta, sitio, previo.get(r0.carpeta), r0.md || r0.documento);
    let entrada = x.entrada;
    if (x.pendienteClaude && CLAUDE) {
      const { resultados: rs } = await correrClaude([x.pendienteClaude]);
      if (rs[0]) entrada = finalizar({ ...x.pendienteClaude, claude: rs[0].claude });
    }
    entradas.push(entrada);
    // Lo que se imprime/escribe es el análisis CON las respuestas verificadas de Claude aplicadas.
    const ov = entrada.claude ? aplicables(entrada.claude.respuestas, r0) : {};
    resultados.push(Object.keys(ov).length ? analizar(r0.documento, sitio, ov) : r0);
  }
  if (entradas.length) guardarEnRegistro(entradas);

  if (RESUMEN) {
    for (const r of resultados) {
      if (r.error) { console.log(`ERROR  ${r.documento}: ${r.error}`); continue; }
      const quien = r.club.existe ? `YA EXISTE (${r.club.clubId})` : (r.campos.find((c) => c.campo === 'id') || {}).valor;
      console.log(`${String(r.resumen.pctOk).padStart(3)}% ok  ${r.resumen.ok}/${r.resumen.campos} (${r.resumen.pregunta} preg, ${r.resumen.pendiente} pend)  ${quien}  <- ${r.documento}`);
      for (const p of r.preguntas) console.log(`         ? ${p.campo}: ${p.pregunta}`);
    }
    return;
  }
  if (!ESCRIBIR) { console.log(JSON.stringify(resultados.length === 1 ? resultados[0] : resultados, null, 2)); return; }

  const r = resultados[0];
  if (r.error) { console.log(JSON.stringify(r, null, 2)); console.error(`\nNo se escribe nada: ${r.error}`); process.exit(1); }
  if (r.club.existe) { console.log(JSON.stringify(r, null, 2)); console.error(`\nNo se escribe nada: el club ya existe (${r.club.clubId}). El alta es solo para clubes nuevos; el ejercicio lo carga la etapa de carga.`); process.exit(1); }
  if (r.resumen.pregunta > 0) {
    console.log(JSON.stringify(r, null, 2));
    console.error(`\nNo se escribe nada: quedan ${r.resumen.pregunta} pregunta(s):`);
    for (const p of r.preguntas) console.error(`  - ${p.campo}: ${p.pregunta}`);
    process.exit(1);
  }
  const res = escribir(r);
  console.log(JSON.stringify({ ...r, escritura: res }, null, 2));
  if (!res.ok) { console.error(`\nAlta REVERTIDA: ${res.motivo}`); process.exit(1); }
  console.error(`\nAlta escrita (${res.escritos.join(', ')}). Auditoría: ${res.audit}. No se commiteó nada.`);
}

// Solo corre como comando: importado (pipeline.mjs --resumen importa resumenAltas) no hace nada.
if (import.meta.url === `file://${process.argv[1]}`) await main();

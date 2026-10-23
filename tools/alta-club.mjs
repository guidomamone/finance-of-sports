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

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync, mkdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname, basename, extname, relative, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { clubDeCarpeta } from './carpetas-clubes.mjs';
import { deportesActivos, deporteDeClub } from './deporte-club.mjs'; // deportes activos del catálogo
import * as EV from './evidencia-club.mjs';
import { ajusteDe, ajustePerimetroDe } from './ajustes.mjs';
import { agregarCaso, casoYRespuesta } from './cola.mjs';
import { huellaEntradas, sha1Archivo, leerRegistro, guardarEnRegistro, resumenAltas, ESTADOS } from './altas-registro.mjs';
import { preguntarAClaude, MODELO_DEFAULT, UMBRAL_CONFIANZA, paginas as paginasDe } from './alta-claude.mjs';
import { archivosData, rutaData } from './data-clubes.js';
import { crearClub } from './club-json.mjs'; // el JSON es la fuente de cada club
import { GENERADORES, queFalla } from './generadores.mjs';
import { derivado } from './rutas.mjs';
import { fechasFinDeMes, cierreDelTexto, cierreDelNombre, anioDelNombre, contar, menciones, fxDeclarado, fechaDeColumna, fechaDeBloque, SERIES_FX, FUENTE_SERIE, fxDeSerie, decidirNombre } from './alta-club-lectura.mjs';
import { paisDe, NOMBRE_PAIS_ES, MONEDAS, MONEDAS_A_LA_PAR, DEPORTES_OTROS, FUTBOL_RE, NO_BALANCE, INTERMEDIO_RE } from './alta-club-tablas.mjs';
export { MONEDAS, MESES, MES_ALT } from './alta-club-tablas.mjs';
export { nombreLegal, nombrePortada, nombreBienEscrito, decidirNombre } from './alta-club-lectura.mjs';
export { resumenAltas };

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flagVal = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const ESCRIBIR = ARGS.includes('--escribir');
const RESUMEN = ARGS.includes('--resumen');
const ANOTAR_MISSES = ARGS.includes('--anotar-misses') || ESCRIBIR;
const ANIO_FORZADO = flagVal('--anio') ? Number(flagVal('--anio')) : null;
const TODOS = ARGS.includes('--todos');
const DUDAS = ARGS.includes('--dudas');
const CLAUDE = ARGS.includes('--claude');
const BACKTEST = ARGS.includes('--backtest-claude');
const FORZAR = ARGS.includes('--forzar');
const MODELO = flagVal('--modelo') || MODELO_DEFAULT;
const LIMITE = flagVal('--limit') !== null ? Number(flagVal('--limit')) : null;
const TOPE_USD = flagVal('--tope-usd') !== null ? Number(flagVal('--tope-usd')) : 1;
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
const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '');
const slugGuion = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const rel = (p) => relative(ROOT, p);
export const ultimoDia = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
export const pad2 = (n) => String(n).padStart(2, '0');
const bandera = (iso2) => iso2 ? String.fromCodePoint(...[...iso2.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : null;

export function campo(nombre, valor, fuente, estado = 'ok', extra = {}) {
  return { campo: nombre, valor, fuente, estado, ...extra };
}

function runNode(script, args) {
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
function cargarSitio() {
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
  const nombreArchivo = basename(abs);
  // ESCALÓN 0: ajuste manual de Guido (tools/ajustes.mjs, campo `anio`) cuando el nombre del archivo dice mal el año.
  const ajAnio = r.pdf ? ajusteDe(r.pdf, 'anio') : null;
  const anioForzado = ANIO_FORZADO || (ajAnio ? Number(ajAnio.valor) : null);
  const anioNombre = anioForzado || anioDelNombre(nombreArchivo);
  const cierreTxt = cierreDelTexto(md);
  const cierreNom = cierreDelNombre(basename(abs, extname(abs)));
  let mesCierre = null; let fuenteCierre = null; let estadoCierre = 'ok'; let preguntaCierre = null;
  // Un estado INTERMEDIO (semestral al 30/6 de un club que cierra el 31/12: Palestino 2018) no dice
  // nada del cierre del ejercicio: en ese caso el mes sale de los demás documentos o del país.
  const nIntermedio = contar(norm(md.slice(0, 20000)), INTERMEDIO_RE);
  const esIntermedio = nIntermedio >= 2 || /semi-annual|semiannual|interim|intermedi|trimestr|quarter|ene-jun/.test(norm(nombreArchivo));
  if (esIntermedio) r.avisos.push(`El documento parece un estado INTERMEDIO (${nIntermedio} señales en el texto): su fecha no se usa para decidir el cierre del ejercicio del club.`);
  if (esIntermedio) { /* se decide abajo, con los demás .md del club o el patrón del país */ }
  else if (cierreNom && cierreTxt && cierreTxt.mes === cierreNom.mes) { mesCierre = cierreNom.mes; fuenteCierre = `nombre del archivo (${cierreNom.fecha}) y contenido del .md (${cierreTxt.n} de ${cierreTxt.total} fechas de fin de mes)`; }
  else if (cierreNom && (!cierreTxt || cierreTxt.share < 0.6)) { mesCierre = cierreNom.mes; fuenteCierre = `nombre del archivo (${cierreNom.fecha})`; }
  else if (cierreTxt && ((cierreTxt.n >= 3 && cierreTxt.share >= 0.6) || (cierreTxt.n >= 2 && cierreTxt.share === 1))) { mesCierre = cierreTxt.mes; fuenteCierre = `contenido del .md (${cierreTxt.n} de ${cierreTxt.total} fechas de fin de mes caen en el mes ${cierreTxt.mes})`; if (cierreNom && cierreNom.mes !== cierreTxt.mes) { estadoCierre = 'pregunta'; preguntaCierre = `El nombre del archivo dice cierre ${cierreNom.fecha}, pero el contenido cierra en el mes ${cierreTxt.mes}. ¿Cuál es el cierre de este ejercicio?`; } }

  // El resto de los .md del club, para ver si el cierre cambió en el tiempo.
  // Sin los documentos que están en documentos-descartados.txt o documentos-parciales.txt (la misma lista que saltea
  // lote.mjs y que `--todos` usa para `faltan-datos`): un documento descartado no es un hermano. Caso: Tondela 2021, el relatório del
  // Clube Desportivo de Tondela (asociación, descartado con ok de Guido) hacía preguntar "dos entidades" aunque el perímetro estuviera fijado.
  const dirClub = resolve(ROOT, 'Clubes', paisCarpeta, clubCarpeta);
  const fueraDeCargaHermanos = new Set(['Admin/registros/documentos-descartados.txt', 'Admin/registros/documentos-parciales.txt']
    .flatMap((f) => (existsSync(resolve(ROOT, f)) ? readFileSync(resolve(ROOT, f), 'utf8').split('\n') : []))
    .map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')).map((d) => d.replace(/\.(pdf|md)$/i, '')));
  const hermanos = [];
  (function walk(d) {
    for (const e of readdirSync(d)) {
      const f = join(d, e);
      if (statSync(f).isDirectory()) { walk(f); continue; }
      if (!/\.md$/i.test(e) || /\.(previo-[a-z]+|gemini-check|claude-check|mistral-redo|t-[a-z]+)\.md$/i.test(e) || /^readme/i.test(e)) continue;
      if (fueraDeCargaHermanos.has(rel(f).replace(/\.md$/i, ''))) continue;
      hermanos.push(f);
    }
  })(dirClub);
  r.mdsCarpeta = hermanos.map(rel).sort();
  const cierresClub = [];
  for (const h of hermanos) {
    if (NO_BALANCE.test(norm(basename(h)))) continue;
    const t = h === mdPath ? md : readFileSync(h, 'utf8');
    if (contar(norm(t.slice(0, 20000)), INTERMEDIO_RE) >= 2) continue;
    const c = cierreDelTexto(t); const cn = cierreDelNombre(basename(h, '.md'));
    const mes = cn ? cn.mes : (c && c.n >= 3 && c.share >= 0.6 ? c.mes : null);
    const anio = anioDelNombre(basename(h)) || (c && c.anio);
    if (mes && anio) cierresClub.push({ archivo: basename(h), mes, anio });
  }
  if (!mesCierre) {
    const porMes = {};
    for (const c of cierresClub) porMes[c.mes] = (porMes[c.mes] || 0) + 1;
    const orden = Object.entries(porMes).sort((a, b) => b[1] - a[1]);
    if (orden.length === 1 || (orden.length && orden[0][1] >= 0.8 * cierresClub.length && cierresClub.length >= 2)) {
      mesCierre = +orden[0][0]; fuenteCierre = `los demás .md del club (${orden[0][1]} de ${cierresClub.length} documentos cierran en el mes ${orden[0][0]}); este documento no alcanza solo`;
    }
  }
  let fuentePatronPais = null;
  if (!mesCierre && pais && pais.iso2) {
    const delPais = Object.values(sitio.clubs).filter((c) => c.country === pais.iso2).map((c) => c.fiscalYearStart);
    const unicos = [...new Set(delPais)];
    if (delPais.length >= 2 && unicos.length === 1) {
      const [mm] = unicos[0].split('-').map(Number);
      mesCierre = mm === 1 ? 12 : mm - 1;
      fuentePatronPais = `patrón del país: los ${delPais.length} clubes de ${pais.iso2} ya cargados arrancan el ${unicos[0]} (el documento no trae fechas de cierre legibles)`;
      fuenteCierre = fuentePatronPais;
    }
  }
  // El año de cierre del contenido, para confirmar el del nombre.
  let anio = anioNombre;
  let estadoAnio = 'ok'; let fuenteAnio = ANIO_FORZADO ? '--anio' : ajAnio ? `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${ajAnio.autor} ${ajAnio.fecha}): ${ajAnio.motivo}` : 'nombre del archivo (misma regla que onboard.mjs --quien)';
  let preguntaAnio = null;
  // Solo se contradice al nombre del archivo con evidencia FUERTE del contenido (3+ fechas de
  // cierre, 60%+ en el mismo mes): un balance que dice una sola vez "31 de dezembro de 2023 e
  // 2024" no alcanza para decir que el archivo está mal nombrado.
  const contenidoFuerte = cierreTxt && cierreTxt.n >= 3 && cierreTxt.share >= 0.6;
  if (cierreTxt && mesCierre && cierreTxt.mes === mesCierre && (contenidoFuerte || !anio)) {
    if (!anio) { anio = cierreTxt.anio; fuenteAnio = 'contenido del .md (año más nuevo con fecha de cierre)'; }
    else if (cierreTxt.anio === anio) fuenteAnio += ', confirmado por las fechas de cierre del .md';
    else if (!anioForzado) {
      const aniosTxt = Object.keys(cierreTxt.porMes).length ? fechasFinDeMes(md).filter((f) => f.mes === mesCierre).map((f) => f.anio) : [];
      // NOMBRE CON DOS AÑOS SEGUIDOS QUE BAJAN ("2017-2016"): es ambiguo.
      // En Goiás es "ejercicio 2017 con su comparativo 2016" (la regla del nombre da 2016, mal: 10 ajustes `anio`); en Suduva
      // "up2021-2020.12.31" es "subido en 2021, ejercicio 2020" (da 2020, bien). Decide el contenido: si el año de las fechas de cierre del
      // .md (con la misma evidencia fuerte de arriba) es uno de los dos del nombre, gana ese. Sin esa evidencia, la regla de siempre. Medido:
      // Goiás 11 de 11 (los 10 del ajuste más balanco-publicado-2024-2023); los demás PDFs no tienen ese patrón y no cambian.
      const par = nombreArchivo.match(/(?<!\d)((?:19|20)\d{2})[-_]((?:19|20)\d{2})(?!\d)/);
      if (par && +par[2] === +par[1] - 1 && [+par[1], +par[2]].includes(anio) && [+par[1], +par[2]].includes(cierreTxt.anio)) { anio = cierreTxt.anio; fuenteAnio = `contenido del .md (el nombre "${par[0]}" es ambiguo; las fechas de cierre del documento son de ${cierreTxt.anio}, ${cierreTxt.n} de ${cierreTxt.total})`; }
      else if (aniosTxt.includes(anio)) fuenteAnio += `, presente en el .md (el año más citado con fecha de cierre es ${cierreTxt.anio})`;
      else { estadoAnio = 'pregunta'; preguntaAnio = `El nombre del archivo sugiere el ejercicio ${anio}, pero las fechas de cierre del documento son de ${cierreTxt.anio}. ¿Qué ejercicio es?`; }
    }
  }
  if (!anio) { estadoAnio = 'pregunta'; preguntaAnio = 'No se pudo determinar el año del ejercicio (ni por el nombre del archivo ni por el contenido). Pasar --anio.'; }
  if (ov.cierre) {
    // Claude leyó la fecha de cierre en el documento y el script verificó la cita: gana sobre el nombre
    // del archivo y sobre el conteo de fechas (que es justo lo que no alcanzó).
    const [yy, mm] = ov.cierre.valor.split('-').map(Number);
    anio = yy; mesCierre = mm; estadoAnio = 'ok'; preguntaAnio = null; estadoCierre = 'ok'; preguntaCierre = null;
    fuenteAnio = fuenteCierre = `${ov.cierre.manual ? '' : 'claude-api con cita verificada: '}${ov.cierre.fuente}`; fuentePatronPais = null;
  }
  const cierre = anio && mesCierre ? `${anio}-${pad2(mesCierre)}-${pad2(ultimoDia(anio, mesCierre))}` : null;
  const fiscalYearStart = mesCierre ? `${pad2(mesCierre === 12 ? 1 : mesCierre + 1)}-01` : null;

  // ---------------------------------------------------------------- moneda del ejercicio
  let moneda = pais ? pais.moneda : null;
  let estadoMoneda = 'ok'; let fuenteMoneda = pais ? `moneda de curso legal de ${paisCarpeta} (${pais.referencia ? 'tabla de referencia ISO, tools/paises-referencia.json' : 'tabla PAISES de alta-club.mjs'})` : null; let preguntaMoneda = null;
  if (!pais) { estadoMoneda = 'pregunta'; preguntaMoneda = `País "${paisCarpeta}" sin entrada en la tabla PAISES de tools/alta-club.mjs: ¿qué ISO2 y qué moneda?`; }
  else if (pais.preguntaMoneda) { estadoMoneda = 'pregunta'; preguntaMoneda = pais.preguntaMoneda; }
  else if (pais.legado && anio && anio < pais.legado.desde) {
    const nLeg = pais.legado.tokens.reduce((s, t) => s + contar(mdNorm, new RegExp(`(?<![a-z])${t.replace(/\./g, '\\.')}(?![a-z])`, 'g')), 0);
    const nAct = menciones(mdNorm, pais.moneda);
    if (nAct >= 5 && nAct > 3 * nLeg) { fuenteMoneda += `; ejercicio ${anio} anterior a ${pais.legado.desde}, pero el documento ya habla en ${pais.moneda} (${nAct} menciones contra ${nLeg} de ${pais.legado.codigo})`; }
    else { estadoMoneda = 'pregunta'; moneda = pais.legado.codigo; preguntaMoneda = `El ejercicio ${anio} es anterior a ${pais.legado.desde}: el documento puede estar en ${pais.legado.codigo} (${nLeg} menciones de la moneda vieja, ${nAct} de ${pais.moneda}). El sitio no tiene ninguna moneda "legado" cargada: ¿se carga en ${pais.legado.codigo} (con su fx a USD de ese cierre) o se convierte a ${pais.moneda} a la paridad fija?`; }
  } else if (moneda && moneda !== 'USD') {
    const nPropia = menciones(mdNorm, moneda);
    const otras = Object.keys(MONEDAS).filter((c) => c !== moneda && c !== 'USD' && !MONEDAS[c].tokens.includes('\\$')).map((c) => [c, menciones(mdNorm, c)]).sort((a, b) => b[1] - a[1]);
    if (nPropia === 0 && otras[0] && otras[0][1] >= 10) { estadoMoneda = 'pregunta'; preguntaMoneda = `El documento no nombra nunca ${moneda} y nombra ${otras[0][0]} ${otras[0][1]} veces: ¿en qué moneda está?`; }
    else if (nPropia === 0) r.avisos.push(`El documento no nombra la moneda (${moneda}) en ningún lado reconocible: se asume la del país.`);
  }

  // ---------------------------------------------------------------- deporte
  // "football" en inglés también es el de la NFL ("National Football League"), y "cricket" aparece
  // en el nombre legal del Genoa ("Genoa Cricket and Football Club"): esas frases no cuentan para
  // ningún lado.
  // Tampoco cuenta "Football Club": los clubes de rugby ingleses se llaman así ("Harlequin Football
  // Club Limited", "Leicester Football Club plc") — bug real de la primera versión.
  const nAmbiguo = contar(mdNorm, /national football league|american football|football club/g);
  const nGenoa = contar(mdNorm, /cricket\s*(and|&|e)\s*football/g);
  const nFutbol = contar(mdNorm, FUTBOL_RE) - nAmbiguo - nGenoa + contar(norm(clubCarpeta), FUTBOL_RE);
  const otros = Object.entries(DEPORTES_OTROS).map(([k, re]) => [k, contar(mdNorm, re) - (k === 'cricket' ? nGenoa : 0) + 3 * contar(norm(clubCarpeta), re)]).sort((a, b) => b[1] - a[1]);
  let deporte = otros[0][1] >= 3 && otros[0][1] >= nFutbol ? otros[0][0] : 'futbol';
  const fuenteDeporteClaude = ov.sport && ov.sport.valor === 'futbol' && deporte !== 'futbol' ? `claude-api con cita verificada: ${ov.sport.fuente}` : null;
  if (fuenteDeporteClaude) deporte = 'futbol';

  // ---------------------------------------------------------------- campos del club
  if (!r.club.existe) {
    const displayName = clubCarpeta.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
    if (displayName !== clubCarpeta) r.avisos.push(`La carpeta "${clubCarpeta}" tiene un paréntesis: se usó "${displayName}" como nombre corto.`);
    // id
    const base = slug(displayName);
    const iso = pais && pais.iso2 ? pais.iso2.toLowerCase() : 'xx';
    const id = `${base}-${iso}`;
    if (!pais || !pais.iso2) r.campos.push(campo('id', id, 'slug del nombre de la carpeta + país', 'pregunta', { pregunta: pais && pais.pregunta ? pais.pregunta : `País "${paisCarpeta}" sin ISO2: ¿qué sufijo lleva el id?` }));
    else if (sitio.clubs[id]) r.campos.push(campo('id', id, 'slug del nombre de la carpeta + país', 'pregunta', { pregunta: `El id '${id}' ya existe en data/clubs.js (${sitio.clubs[id].name}) y ninguna señal dice que sea este club. ¿Es el mismo club (y la carpeta se llama distinto) o hace falta otro id?` }));
    else r.campos.push(campo('id', id, `slug de "${displayName}" + '-${iso}' (convención de clubId, Admin/CONVENCIONES.md Versión 129)`));
    // name
    r.campos.push(decidirNombre(md, displayName, r.carpeta, r.pdf, { ov }));
    r.campos.push(campo('displayName', displayName, 'nombre de la carpeta del club en Clubes/'));
    r.campos.push(campo('country', pais ? pais.iso2 : null, pais ? `carpeta de país "${paisCarpeta}" (${pais.referencia ? 'tabla de referencia ISO, tools/paises-referencia.json' : 'tabla PAISES'})` : null, pais && pais.iso2 ? 'ok' : 'pregunta', pais && pais.iso2 ? {} : { pregunta: pais && pais.pregunta ? pais.pregunta : `País "${paisCarpeta}" sin entrada en la tabla PAISES.` }));
    // reportingCurrency: la de HOY del país (el ejercicio puede tener otra, ver ejercicio.currency)
    const repCur = pais ? pais.moneda : null;
    r.campos.push(campo('reportingCurrency', repCur, pais ? `moneda de curso legal de ${paisCarpeta}` : null, repCur ? 'ok' : 'pregunta', repCur ? {} : { pregunta: (pais && pais.preguntaMoneda) || `¿En qué moneda reporta el club?` }));
    // fiscalYearStart
    const cambios = [...new Set(cierresClub.map((c) => c.mes))];
    if (fiscalYearStart) {
      let valor = fiscalYearStart; let fuente = `cierre del ejercicio: ${fuenteCierre}`; let estado = estadoCierre === 'pregunta' ? 'pregunta' : 'ok'; const extra = {};
      if (estadoCierre === 'pregunta') extra.pregunta = preguntaCierre;
      if (cambios.length > 1) {
        const masReciente = cierresClub.slice().sort((a, b) => b.anio - a.anio)[0];
        const detalle = cambios.map((m) => `mes ${m}: ${cierresClub.filter((c) => c.mes === m).map((c) => c.anio).sort().join(',')}`).join(' / ');
        valor = `${pad2(masReciente.mes === 12 ? 1 : masReciente.mes + 1)}-01`;
        fuente = `el documento más reciente del club (${masReciente.archivo}, cierre mes ${masReciente.mes}): el cierre CAMBIÓ en el tiempo (${detalle}); clubs.js lleva el vigente, criterio de Racing (31/8 hasta 2021, 30/6 después)`;
        r.avisos.push(`El cierre del ejercicio cambió en el tiempo (${detalle}). Los ejercicios con el cierre viejo necesitan su propio fx a SU fecha de cierre.`);
      }
      if (fuentePatronPais && estado === 'ok') extra.nota = 'sale del patrón del país, no del documento';
      r.campos.push(campo('fiscalYearStart', valor, fuente, estado, extra));
    } else {
      r.campos.push(campo('fiscalYearStart', null, 'ni el documento, ni los demás .md del club, ni el patrón del país alcanzan', 'pregunta', { pregunta: `¿En qué fecha cierra el ejercicio de ${displayName}? El .md no trae fechas de cierre suficientes${cierreTxt ? ` (${cierreTxt.total} fecha(s) de fin de mes en todo el texto; la más frecuente, mes ${cierreTxt.mes}, ${cierreTxt.n} vez/veces)` : ' (ninguna fecha de fin de mes reconocible)'}, los demás documentos del club tampoco, y no hay clubes del país ya cargados de los que tomar el patrón.` }));
    }
    // sport
    if (deporte === 'futbol') r.campos.push(campo('sport', 'futbol', fuenteDeporteClaude || `el .md nombra el fútbol ${nFutbol} veces y ningún otro deporte más que eso`));
    else r.campos.push(campo('sport', deporte, `el .md nombra "${deporte}" ${otros[0][1]} veces y el fútbol ${nFutbol}`, 'pregunta', { pregunta: `El documento parece de ${deporte}, no de fútbol. El catálogo de data/leagues.js tiene ese deporte inactivo (o no lo tiene). ¿Se da de alta igual (y con qué liga), o queda fuera del sitio por ahora?` }));
    // brandColor: nunca lo decide el script
    const candidatos = candidatosColor(displayName);
    r.campos.push(campo('brandColor', undefined, candidatos.length ? `tools/brand-color-reference/ (footylogos): ${candidatos.map((c) => `[${c.liga}] ${c.name}: ${c.swatches.slice(0, 4).map((s) => s.hex + ' ' + s.label.replace(/ #.*/, '')).join(', ')}`).join(' | ')}` : 'la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)', 'pendiente', { nota: 'el campo queda AUSENTE (= nadie lo chequeó, P3 club-sin-color-ni-null). La decisión es identidad primero (¿de qué color es la camiseta?, Wikipedia del país) y hex después, club-or-year-onboarding/club-nuevo.md: no la toma un script. NUNCA escribir null sin haberlo mirado.' }));
  }

  // ---------------------------------------------------------------- campos del ejercicio
  const clubId = r.club.existe ? r.club.clubId : (r.campos.find((c) => c.campo === 'id') || {}).valor;
  const E = r.ejercicio.campos;
  r.ejercicio.anio = anio; r.ejercicio.cierre = cierre;
  E.push(campo('anio', anio, fuenteAnio, estadoAnio, preguntaAnio ? { pregunta: preguntaAnio } : {}));
  E.push(campo('cierre', cierre, cierre ? `año del ejercicio + mes de cierre (${fuenteCierre})` : null, cierre ? (estadoCierre === 'pregunta' ? 'pregunta' : 'ok') : 'pregunta', cierre ? (preguntaCierre ? { pregunta: preguntaCierre } : {}) : { pregunta: 'No se pudo determinar la fecha de cierre del ejercicio.' }));

  // Tipo de documento
  const nomNorm = norm(nombreArchivo);
  const STATEMENT = /resultado|recursos y gastos|income statement|profit and loss|profit or loss|comprehensive income|statement of operations|statement of financial position|conto economico|resultatregnskap|resultatopgorelse|resultatenrekening|winst-en-verliesrekening|compte de resultat|gewinn- ?und verlust|erfolgsrechnung|racun dobiti|dobiti i gubitka|demonstrac(ao|oes) d[oe]s? result|demonstracoes (financeiras|contabeis)|balanc[oe]s? patrimon|αποτελεσματ|gelir tablosu|kar veya zarar|finansal durum|vykaz zisku|vysledovka|rozvaha|финансовых результат|бухгалтерск\S* баланс|фінансові результати|фінансовии результат|фінансовии стан|сукупнии дохід|손익계산서|재무상태표|利润表|资产负债表|損益計算書|balance sheet|estado de situacion|estados? de resultados|stato patrimoniale|jahresabschluss|jaarrekening|jaarcijfers|aarsregnskap|arsregnskap|arsrapport|aarsrapport|bilancio|bilanco|financijsko izvjesce|financni izkaz/;
  const esPresupuesto = /presupuesto|orcamento|budget|previsional/.test(nomNorm);
  // Un informe de auditoría o una memoria NOMBRAN los estados contables sin traerlos: además de la
  // palabra, hacen falta filas con números: filas de tabla Markdown con 2+ celdas numéricas, o
  // (transcripciones viejas, sin tablas Markdown) líneas con 2+ montos con separador de miles.
  const lineasMd = md.split('\n');
  const filasPipe = lineasMd.filter((l) => l.trim().startsWith('|') && (l.match(/\|\s*\(?-?\s*\d[\d.,\s]*\)?\s*(?=\|)/g) || []).length >= 2).length;
  const filasMontos = lineasMd.filter((l) => (l.match(/(?<![\d.,])\(?-?\d{1,3}(?:[.,   ]\d{3})+(?:[.,]\d{1,2})?\)?(?![\d])/g) || []).length >= 2).length;
  const filasNumericas = Math.max(filasPipe, filasMontos);
  // ESCALÓN 1 del estado contable: un estado de resultados CORTO de una sola columna (un monto por fila) no llega a las 10 filas
  // con 2+ montos. Vale si la PRIMERA PÁGINA trae el título de un estado de resultados y un PERÍODO impreso de 12 meses ("01/01/2019 a
  // 31/12/2019"), con al menos 5 filas con un monto. Un informe del auditor nombra el estado pero no imprime ese encabezado de período.
  // Casos: Remo dre-2019/2023/2024 y Ferroviária 2013-b a 2018 (DRE del sistema contable), que preguntaban reportType y se fijaban a mano.
  const estadoCorto = (() => {
    if (filasNumericas >= 10) return false;
    const pag1 = md.split(/^--- pág\. 2 ---$/m)[0].replace(/<br\s*\/?>/gi, ' ');
    if (!/demonstra[cç][aã]o\s+d[oe]s?\s+resultados?|estado\s+de\s+resultados|income\s+statement|profit\s+and\s+loss|conto\s+economico/i.test(pag1)) return false;
    // el ejercicio anual: un período impreso de 12 meses, o el nombre del estado anual en portugués ("... do Exercício", Remo 2023 y 2024:
    // "Demonstração do Resultado do Exercício / Em 31 de Dezembro de 2023", sin período "de-a")
    const per = pag1.match(/(\d{2})\/(\d{2})\/(\d{4})\s*(?:a|até|al|to|-)\s*(\d{2})\/(\d{2})\/(\d{4})/i);
    const anual = (per && (Number(per[6]) - Number(per[3])) * 12 + Number(per[5]) - Number(per[2]) + 1 === 12) || /demonstra[cç][aã]o\s+do\s+resultado\s+do\s+exerc[ií]cio/i.test(pag1);
    const conMonto = lineasMd.filter((l) => /(?<![\d.,])\(?-?\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?\)?(?![\d])/.test(l)).length;
    return anual && conMonto >= 5;
  })();
  const tieneEstado = (STATEMENT.test(mdNorm) || STATEMENT.test(nomNorm)) && (filasNumericas >= 10 || estadoCorto);
  let reportType = 'official_balance_sheet'; let estadoRT = 'ok'; let fuenteRT = estadoCorto ? 'escalón 1: estado de resultados corto de una columna, con título y período de 12 meses en la primera página' : 'el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo'; let preguntaRT = null;
  if (esPresupuesto) { reportType = 'official_budget'; estadoRT = 'pregunta'; fuenteRT = 'nombre del archivo'; preguntaRT = 'El documento parece un PRESUPUESTO: se carga como official_budget y el tipo de cambio es la premisa del propio presupuesto (document_assumption), no un cierre. ¿Confirmar que es un presupuesto y cuál es su premisa de tipo de cambio?'; }
  else if (esIntermedio) { estadoRT = 'pregunta'; fuenteRT = `el documento parece un estado intermedio (${nIntermedio} señales en el texto: semestral, seis meses, interim...)`; preguntaRT = 'El documento parece un estado financiero INTERMEDIO, no el anual: el sitio carga ejercicios completos. ¿Es así (y hay que buscar el anual), o es el anual de un ejercicio corto?'; }
  else if (NO_BALANCE.test(nomNorm)) { estadoRT = 'pregunta'; fuenteRT = 'nombre del archivo'; preguntaRT = `El nombre del archivo ("${nombreArchivo}") sugiere que no es un estado contable anual (acta, informe intermedio, memoria, dictamen...). ¿Trae un estado de resultados anual cargable, o es un documento de contexto?`; }
  else if (!tieneEstado) { estadoRT = 'pregunta'; fuenteRT = filasNumericas < 10 ? `el .md casi no tiene tablas con números (${filasNumericas} filas numéricas): parece un informe/dictamen que nombra los estados sin traerlos` : 'el .md no tiene ninguna palabra de estado contable reconocible'; preguntaRT = '¿El documento trae un estado de resultados (o de recursos y gastos) anual cargable, o hay que buscar los estados en otro documento del club?'; }
  // ESCALÓN 2: la pregunta "¿trae un estado de resultados?" (no hay palabras de estado que reconozca
  // STATEMENT, o casi no hay tablas) la contesta la VERIFICACIÓN del propio documento: si cerró con el resultado impreso (etapa 6), el
  // documento trae un estado de resultados anual. Solo esa pregunta: presupuesto, intermedio y nombre de archivo siguen preguntando (un
  // intermedio también cierra). Casos: 59 ajustes `reportType` estonios (majandusaasta aruanne con tulemiaruanne, palabras que STATEMENT no
  // conoce), Go Ahead Eagles (Países Bajos).
  if (estadoRT === 'pregunta' && !esPresupuesto && !esIntermedio && !NO_BALANCE.test(nomNorm) && !tieneEstado && r.md) {
    const pv = resolve(ROOT, derivado(r.md, '.verificacion.json', { crear: false }));
    const V = existsSync(pv) ? (() => { try { return JSON.parse(readFileSync(pv, 'utf8')); } catch { return null; } })() : null;
    const res = (V?.chequeos || []).find((c) => c.nombre === 'resultado del ejercicio');
    if (res?.ok === true) { estadoRT = 'ok'; preguntaRT = null; fuenteRT = `escalón 2: la verificación del documento cerró con el resultado impreso (${String(res.detalle || '').slice(0, 120)})`; }
  }
  if (ov.reportType) { reportType = ov.reportType.valor; estadoRT = 'ok'; preguntaRT = null; fuenteRT = `${ov.reportType.manual ? '' : 'claude-api con cita verificada: '}${ov.reportType.fuente}`; }
  E.push(campo('reportType', reportType, fuenteRT, estadoRT, preguntaRT ? { pregunta: preguntaRT } : {}));

  // Perímetro: qué entidad es "el club"
  const CONSOL = /consolidad|consolidated|consolidato|geconsolideerd|konsolid|konzern|konsern|koncern|консолид|консолідов|ενοποιημεν|연결재무|合并|group accounts|consolide/g;
  const INDIV = /individual|separate financial statements|company only|standalone|stand-alone|enkelvoudig|selskapsregnskap|morselskap|einzelabschluss|η εταιρεια|bireysel|individuais|separado|별도재무|отдельн|bilancio d.esercizio|jahresabschluss der/g;
  const nCons = contar(mdNorm, CONSOL); const nInd = contar(mdNorm, INDIV);
  // Dos entidades distintas en la carpeta para el mismo año (por los nombres de archivo)
  const ENTIDAD_TOK = new Set(['fli', 'as', 'asa', 'invest', 'fotballinvest', 'holding', 'group', 'groupe', 'plc', 'saf', 'associacao', 'clube', 'sad', 'spa', 'idrettslag', 'fotballklubb', 'consolidato', 'consolidado', 'consolidated', 'individual', 'konzern', 'club']);
  const toks = (f) => new Set(norm(basename(f, '.md')).split(/[^a-z0-9]+/).filter((t) => t && !/^\d+$/.test(t)));
  const esteToks = toks(mdPath);
  const mismoAnio = hermanos.filter((h) => h !== mdPath && anioDelNombre(basename(h)) === anio);
  const otraEntidad = mismoAnio.find((h) => { const t = toks(h); const dif = [...t].filter((x) => !esteToks.has(x)).concat([...esteToks].filter((x) => !t.has(x))); return dif.some((x) => ENTIDAD_TOK.has(x)); });
  let estadoPer = 'ok'; let valorPer = 'individual'; let fuentePer = `el .md no presenta estados consolidados (${nCons} menciones de "consolidado")`; let preguntaPer = null;
  const sugerencia = 'Criterio usado hasta ahora (Boca, Racing, Panathinaikos): la entidad INDIVIDUAL del club, no el grupo, porque el consolidado puede sumar negocio de subsidiarias no futbolístico — pero hay excepciones (el fútbol en una subsidiaria, una SAD/SAF que es la que juega).';
  if (otraEntidad) {
    estadoPer = 'pregunta'; valorPer = null; fuentePer = `la carpeta tiene otro documento del mismo ejercicio de otra entidad: ${basename(otraEntidad)}`;
    preguntaPer = `En ${r.carpeta} hay documentos del ejercicio ${anio} de dos entidades distintas ("${basename(mdPath)}" y "${basename(otraEntidad)}"). ¿Cuál es "el club" para el sitio (asociación vs sociedad anónima, individual vs consolidado)? ${sugerencia}`;
  } else if (/individual|enkelvoudig|separate|individuais|einzel|standalone|company-only/.test(nomNorm)) {
    fuentePer = `el nombre del archivo dice que son los estados individuales ("${nombreArchivo}"), y no hay un consolidado del mismo ejercicio en la carpeta${nCons ? ` (el .md menciona el consolidado ${nCons} veces, como referencia)` : ''}`;
  } else if (nCons >= 3) {
    estadoPer = 'pregunta'; valorPer = null;
    fuentePer = `el .md menciona estados consolidados ${nCons} veces${nInd ? ` y los individuales ${nInd}` : ''}`;
    preguntaPer = nInd >= 2
      ? `El documento trae estados CONSOLIDADOS y también individuales/de la sociedad (${nCons} vs ${nInd} menciones). ¿Qué columna se carga? ${sugerencia}`
      : `El documento parece ser solo del GRUPO consolidado (${nCons} menciones, ninguna de estados individuales). ¿El grupo es "el club", o hay que buscar los estados individuales de la sociedad que juega? ${sugerencia}`;
  }
  // Con dos entidades en la carpeta el perímetro solo no alcanza (hay que elegir cuál es el club), salvo que el ajuste sea manual y el NOMBRE
  // de este documento diga ese mismo perímetro (Parma 2023: ajuste individual y "...-individual.pdf"; el "...-consolidato.pdf" del mismo
  // año sigue preguntando).
  const perDelNombre = /consolidat/.test(nomNorm) ? 'consolidado' : /individual|separat|einzel|enkelvoudig/.test(nomNorm) ? 'individual' : null;
  const ajusteCoincide = ov.perimetro?.manual && otraEntidad && perDelNombre === ov.perimetro.valor;
  if (ov.perimetro && (!otraEntidad || ajusteCoincide)) { valorPer = ov.perimetro.valor; estadoPer = 'ok'; preguntaPer = null; fuentePer = ov.perimetro.manual ? ov.perimetro.fuente : `claude-api con cita verificada: ${ov.perimetro.fuente}`; }
  E.push(campo('perimetro', valorPer, fuentePer, estadoPer, { ...(preguntaPer ? { pregunta: preguntaPer } : {}), ...(otraEntidad ? { dosEntidades: basename(otraEntidad) } : {}) }));

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

  // Contexto que el alta necesita escribir aparte (país/moneda nuevos)
  r.contexto = {
    paisNuevo: pais && pais.iso2 && !sitio.COUNTRIES[pais.iso2] ? { iso2: pais.iso2, name: NOMBRE_PAIS_ES[pais.iso2] || paisCarpeta, en: pais.en, flag: bandera(pais.iso2), region: pais.region } : null,
    monedaNueva: pais && pais.moneda && !sitio.CURRENCY_META[pais.moneda] && MONEDAS[pais.moneda] ? { codigo: pais.moneda, scale: MONEDAS[pais.moneda].scale, rango: MONEDAS[pais.moneda].rango } : null,
  };
  if (r.contexto.paisNuevo) r.avisos.push(`País nuevo para el sitio (${pais.iso2}): --escribir agrega su entrada en COUNTRIES (data/leagues.js) y su nombre en data/lang/en.js.`);
  if (r.contexto.monedaNueva) r.avisos.push(`Moneda nueva para el sitio (${pais.moneda}): --escribir agrega CURRENCY_META (scale ${MONEDAS[pais.moneda].scale}) y FX_PLAUSIBLE_RANGE [${MONEDAS[pais.moneda].rango.join(', ')}] en data/currency-map.js.`);

  // Cruces que no bloquean pero conviene ver.
  const perCampo = E.find((c) => c.campo === 'perimetro');
  const nameCampo = r.campos.find((c) => c.campo === 'name');
  if (perCampo && perCampo.estado === 'pregunta' && nameCampo) nameCampo.nota = `${nameCampo.nota ? nameCampo.nota + '. ' : ''}OJO: depende de la respuesta de perímetro (qué entidad es el club)`;
  if (mesCierre && pais && pais.iso2) {
    const fysPropio = `${pad2(mesCierre === 12 ? 1 : mesCierre + 1)}-01`;
    if (r.club.existe && sitio.clubs[clubId] && sitio.clubs[clubId].fiscalYearStart !== fysPropio) {
      r.avisos.push(`El documento cierra en el mes ${mesCierre} (ejercicio desde el ${fysPropio}) pero data/clubs.js dice fiscalYearStart '${sitio.clubs[clubId].fiscalYearStart}' para ${clubId}: o el cierre del club cambió (como Racing) o el documento no es lo que parece.`);
    }
    const delPais = [...new Set(Object.values(sitio.clubs).filter((c) => c.country === pais.iso2).map((c) => c.fiscalYearStart))];
    if (!r.club.existe && delPais.length === 1 && delPais[0] !== fysPropio && !fuentePatronPais) {
      r.avisos.push(`Todos los clubes de ${pais.iso2} ya cargados arrancan el ejercicio el ${delPais[0]} y este documento dice ${fysPropio}: no es un error necesariamente (Almagro, FC Midtjylland), pero vale mirarlo.`);
    }
  }

  // Resumen
  const todos = [...r.campos, ...E];
  const cnt = (e) => todos.filter((c) => c.estado === e).length;
  r.resumen = { campos: todos.length, ok: cnt('ok'), pregunta: cnt('pregunta'), pendiente: cnt('pendiente'), pctOk: Math.round((100 * cnt('ok')) / todos.length), bloqueaEscribir: cnt('pregunta') > 0 || r.club.existe };
  r.preguntas = todos.filter((c) => c.estado === 'pregunta').map((c) => ({ campo: c.campo, pregunta: c.pregunta }));
  return r;
}

function candidatosColor(displayName) {
  const dir = resolve(ROOT, 'tools/brand-color-reference');
  if (!existsSync(dir)) return [];
  const q = norm(displayName).replace(/[^a-z0-9]+/g, ' ').trim();
  const out = [];
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const c of d.clubs || []) {
      const n = norm(c.name).replace(/[^a-z0-9]+/g, ' ').trim();
      if (n.includes(q) || norm(c.slug.replace(/-/g, ' ')).includes(q)) out.push({ liga: f.replace('.json', ''), ...c });
    }
  }
  if (ANOTAR_MISSES) runNode('tools/lookup-brand-color.js', [displayName, '--json']);
  return out;
}

function proponerFx(md, moneda, cierre, estadoMoneda, reportType, sitio, ovFx = null, ajFx = null) {
  const out = [];
  // ESCALÓN 0: ajuste manual de Guido (tools/ajustes.mjs, campo `fx`, en moneda por 1 USD).
  if (ajFx && isFinite(Number(String(ajFx.valor).replace(',', '.')))) {
    out.push(campo('fx', Number(String(ajFx.valor).replace(',', '.')), `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${ajFx.autor} ${ajFx.fecha}): ${ajFx.motivo}`, 'ok', { fxSource: 'manual' }));
    return out;
  }
  if (ovFx && moneda && moneda !== 'USD' && estadoMoneda !== 'pregunta' && reportType !== 'official_budget') {
    out.push(campo('fx', Number(ovFx.valor), `declarado por el documento (regla #0), leído por claude-api con cita verificada: ${ovFx.fuente}`, 'ok', { fxSource: 'document_close' }));
    return out;
  }
  if (!moneda || estadoMoneda === 'pregunta') {
    out.push(campo('fx', null, 'depende de la moneda del ejercicio, que es una pregunta abierta', 'pendiente'));
    return out;
  }
  if (moneda === 'USD') {
    out.push(campo('fx', null, 'el ejercicio está en USD: no hay nada que convertir (fx-ausente para USD es P2, ver audit.js)', 'ok'));
    return out;
  }
  if (!cierre) { out.push(campo('fx', null, 'sin fecha de cierre no hay tipo de cambio de cierre', 'pendiente')); return out; }
  const serie = fxDeSerie(moneda, cierre);
  const mercado = serie.fx || (sitio.FX_CLOSE[`${moneda}@${cierre}`] || {}).fx || null;
  const dec = fxDeclarado(md, moneda, mercado, cierre);
  if (reportType === 'official_budget') {
    out.push(campo('fx', dec.grupos && dec.grupos.length ? dec.grupos.map((g) => g.valor) : null, 'presupuesto: el tipo de cambio es la PREMISA que declara el propio documento (fxSource document_assumption)', 'pregunta', { pregunta: 'Presupuesto: ¿qué tipo de cambio asume el documento? (si declara dos puntos, se promedian — club-data-mapping/referencia/fx.md, regla 3)' }));
    return out;
  }
  if (dec.grupos && dec.grupos.length) {
    const grupos = dec.grupos;
    const deCierre = grupos.filter((g) => g.items.some((i) => i.cierre));
    // VARIOS VALORES EN UNA TABLA: gana la columna con la fecha MÁS NUEVA. Caso real, UC 2025, línea 797:
    // "Dólar Estadounidense 907,13 996,48" debajo de "Conversiones a pesos chilenos 31-12-2025 31-12-2024": gana 907,13. Solo se usa si hay
    // más de un valor (con uno solo no cambia nada) y solo si la fila y el encabezado se corresponden uno a uno (ver fechaDeColumna); si no,
    // sigue como antes y termina en la pregunta (cola). Ver la medición en Admin/CHANGELOG.md.
    const conFecha = grupos.length > 1 ? grupos.flatMap((g) => g.items.map((i) => ({ g, f: fechaDeColumna(md, i) || fechaDeBloque(md, i) }))).filter((x) => x.f) : [];
    const fechas = [...new Set(conFecha.map((x) => x.f))].sort();
    const masNueva = fechas.length >= 2 ? conFecha.filter((x) => x.f === fechas[fechas.length - 1]) : [];
    const porFecha = masNueva.length && new Set(masNueva.map((x) => x.g)).size === 1 ? masNueva[0] : null;
    const elegido = grupos.length === 1 ? grupos[0] : porFecha ? porFecha.g : (deCierre.length === 1 ? deCierre[0] : null);
    const detalle = grupos.map((g) => `${g.valor} (línea ${g.items[0].linea}: "${g.items[0].texto}")`).join(' | ');
    if (elegido && !MONEDAS_A_LA_PAR.has(moneda)) {
      out.push(campo('fx', elegido.valor, `declarado por el documento, línea ${elegido.items[0].linea}: "${elegido.items[0].texto}"${grupos.length > 1 ? ` (elegido entre ${grupos.length} valores ${porFecha ? `por ser el de la fecha más nueva de la tabla, ${porFecha.f}` : 'por ser el de cierre'})` : ''}`, 'ok', { fxSource: 'document_close', nota: mercado ? `mercado ese día: ${mercado}` : undefined }));
    } else {
      out.push(campo('fx', grupos.map((g) => g.valor), `el documento declara ${grupos.length === 1 ? 'un tipo de cambio' : grupos.length + ' valores de tipo de cambio'} a USD: ${detalle}`, 'pregunta', {
        pregunta: MONEDAS_A_LA_PAR.has(moneda)
          ? `El documento declara un tipo de cambio con el dólar (${detalle}). En ${moneda} el número solo no dice el sentido: el sitio guarda "${moneda} por 1 USD" (~${MONEDAS[moneda].rango.join('-')}); si el documento escribió "USD por 1 ${moneda}" hay que invertirlo. ¿Cuál es el de CIERRE y en qué sentido está?`
          : `El documento declara varios tipos de cambio a USD (${detalle}). Regla #0: gana el de CIERRE que declara el documento. ¿Cuál es?`,
      }));
    }
    return out;
  }
  if (dec.lineasConMencion > 0) {
    // Menciona tipo de cambio y dólar con números, pero ninguno plausible (casi siempre un cuadro
    // de sensibilidad o de exposición en moneda extranjera, sin la cotización). No es un criterio:
    // es un dato a confirmar en el documento antes de la carga. Se propone igual la cotización de
    // mercado (abajo), marcada como provisoria.
    out.push(campo('fx', null, `el .md menciona tipo de cambio y dólar con números en ${dec.lineasConMencion} línea(s), pero ninguno es una cotización plausible${dec.descartadas?.length ? ` (descartadas por traer en su frase otra fecha que la del cierre: ${dec.descartadas.map((d) => `${d.valor}, línea ${d.linea}, ${d.fechas.join('/')}`).join('; ')})` : ''}`, 'pendiente', { nota: 'Regla #0: antes de cargar, confirmar en el documento que NO declara su propio tipo de cambio de cierre; si lo declara, gana ese sobre el de mercado de abajo' }));
  }
  const key = `${moneda}@${cierre}`;
  if (sitio.FX_CLOSE[key]) {
    out.push(campo('fxRef', key, `el documento no declara tipo de cambio; FX_CLOSE ya tiene ${key} = ${sitio.FX_CLOSE[key].fx} (${sitio.FX_CLOSE[key].label})`));
    return out;
  }
  if (serie.fx) {
    const label = serie.exacto ? `${FUENTE_SERIE[moneda]} al ${serie.fecha}` : `${FUENTE_SERIE[moneda]}, última rueda hábil antes del cierre (${serie.fecha}, ${cierre} no es día hábil)`;
    out.push(campo('fxRef', key, `el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): ${serie.fx}. --escribir agrega '${key}' a FX_CLOSE`, 'ok', { fxClose: { fx: serie.fx, source: 'market_close', label } }));
    if (ANOTAR_MISSES) runNode('tools/lookup-fx-close.js', [cierre, '--currency', moneda, '--json']);
    return out;
  }
  if (ANOTAR_MISSES) runNode('tools/lookup-fx-close.js', [cierre, '--currency', moneda, '--json']);
  out.push(campo('fxRef', key, `el documento no declara tipo de cambio y no hay cotización cacheada (${serie.error})`, 'pendiente', { nota: `falta el dato de mercado, no un criterio: correr node tools/fetch-fx-reference.mjs para ${moneda} (o cargar ${key} en FX_CLOSE con su fuente oficial) antes de la etapa de carga` }));
  return out;
}

// Palabras genéricas de nombre de club que no identifican al club (pedido de Guido: "AC Milan y Milan son lo mismo, ídem
// OFI Crete y OFI"): se sacan de los dos lados antes de comparar por palabras.
const GENERICAS = new Set(['fc', 'ac', 'sc', 'cf', 'afc', 'cfc', 'sk', 'fk', 'nk', 'hnk', 'gnk', 'pfc', 'nfc', 'bk', 'if', 'il', 'ik', 'ssc', 'us', 'as', 'ss', 'cd', 'ud', 'sd', 'ca', 'club', 'calcio', 'fotball', 'fotbal', 'futebol', 'football', 'fussball', 'tj', 'jk', 'spor', 'kulubu', 'sv', 'vfb', 'vfl', 'tsv', 'fsv', 'rsc', 'kv', 'kaa', 'kvc', 'krc', 'sport', 'de', 'the', 'and', 'a', 's', 'as']);
// Los nombres de lista de Wikipedia que alias.json da como el MISMO club (normalizados como en proponerLiga)
let ALIAS = null;
const aliasDe = (iso, clubId) => {
  if (!clubId) return [];
  if (!ALIAS) { try { ALIAS = JSON.parse(readFileSync(resolve(ROOT, 'tools/club-league-reference/alias.json'), 'utf8')); } catch { ALIAS = {}; } }
  return Object.entries(ALIAS[iso] || {}).filter(([, a]) => a && a.clubId === clubId).map(([x]) => norm(x).replace(/[^a-z0-9]+/g, ' ').trim());
};
function proponerLiga(clubId, nombre, pais, anio, sitio, cierre = null) {
  if (!pais || !pais.iso2 || !anio) return campo('liga', null, 'sin país o sin año', 'pendiente');
  const fila = (sitio.CLUB_LEAGUE_BY_YEAR[clubId] || {})[anio];
  if (fila !== undefined && fila !== null) return campo('liga', fila, `data/club-leagues/${pais.iso2.toLowerCase()}.js ya tiene la fila`);
  const iso = pais.iso2.toLowerCase();
  const cachePath = resolve(ROOT, 'tools/club-league-reference', `${iso}.json`);
  if (ANOTAR_MISSES) runNode('tools/lookup-club-league.js', [nombre, '--pais', iso, '--anio', String(anio), '--json']);
  if (!existsSync(cachePath)) return campo('liga', null, `sin caché de rosters para ${iso} (tools/club-league-reference/${iso}.json)`, 'pendiente', { nota: 'la fila se escribe en null (= nadie lo verificó, P3 liga-sin-verificar); para resolverla: resolve-wikipedia-season-page.mjs + fetch-club-league-reference.mjs (club-or-year-onboarding/club-nuevo.md (liga))' });
  const data = JSON.parse(readFileSync(cachePath, 'utf8'));
  const q = norm(nombre).replace(/[^a-z0-9]+/g, ' ').trim();
  const exactos = []; const parciales = [];
  // QUÉ TEMPORADA: la caché guarda una temporada partida ("2020–21") bajo el año en que TERMINA. La regla del sitio es "la
  // categoría al CIERRE del ejercicio": un ejercicio que cierra entre septiembre y
  // diciembre en una liga partida está jugando la temporada que empezó ese año -> clave anio + 1. Era "entre julio y diciembre": julio y agosto
  // son el FIN de la temporada (Burnley cierra el 31/7), como en faltantes-liga, estadio-sponsor, listas-lote y ligas-sin-verificar (mes >= 9). Con >= 7 la liga salía de la temporada
  // siguiente y estadio-sponsor la usaba con la anterior (Burnley 2022 "2021–22 EFL Championship", 2023 "2022–23 Premier League"). Medido: las 8 filas cargadas que cierran en jul-ago coinciden con >= 9. Antes se buscaba siempre `anio` y a un
  // club que cierra en diciembre (Atalanta 2020, Sassuolo 2021, Genoa 2022, Thun 2019, los rusos) le tocaba la temporada ANTERIOR.
  const mesCierre = cierre ? Number(String(cierre).slice(5, 7)) : null;
  const temporadaDe = (years) => {
    const partida = Object.values(years).some((e) => /\d{4}\s*[–\-\/]\s*\d{2,4}/.test(String(e.wikipediaPage || '')));
    return partida && mesCierre && mesCierre >= 9 ? String(Number(anio) + 1) : String(anio);
  };
  const sinGen = (x) => x.split(' ').filter((t) => t && !GENERICAS.has(t));
  for (const [leagueId, years] of Object.entries(data.leagues || {})) {
    const e = years[temporadaDe(years)];
    if (!e) continue;
    for (const c of e.clubs) {
      const n = norm(c).replace(/[^a-z0-9]+/g, ' ').trim();
      // Por PALABRAS, no por substring: "ael larissa" contiene "aris" como texto (bug real de la
      // primera versión, proponía a AEL Larissa como Aris).
      const tn = sinGen(n); const tq = sinGen(q);
      if (!tn.length || !tq.length) continue;
      // un alias confirmado del club en tools/club-league-reference/alias.json vale como el nombre
      // exacto: "Oud-Heverlee Leuven" = OH Leuven, "RWDM47" = RWDM (los mismos alias que ya usan faltantes-liga y ligas-sin-verificar)
      if (n === q || aliasDe(iso, clubId).includes(n)) exactos.push({ leagueId, club: c, page: e.wikipediaPage });
      else if (tn.every((t) => tq.includes(t)) || tq.every((t) => tn.includes(t))) parciales.push({ leagueId, club: c, page: e.wikipediaPage });
    }
  }
  const enCatalogo = (id) => Object.keys(sitio.LEAGUES).find((k) => k.toLowerCase() === id.toLowerCase());
  if (exactos.length === 1) {
    const cat = enCatalogo(exactos[0].leagueId);
    if (cat) return campo('liga', cat, `roster cacheado de "${exactos[0].page}" (tools/club-league-reference/${iso}.json), coincidencia exacta "${exactos[0].club}"`);
    // `pendiente`, no `pregunta`: agregar una liga al catálogo es UNA decisión de
    // Guido por liga, no por club, y no cambia si el alta es correcta. Con la caché de rosters creciendo
    // (it, kr...), dejarlo como `pregunta` hacía que MÁS datos dieran MENOS clubes listos (21 carpetas
    // frenadas solo por esto). La fila se escribe en `null` (= "nadie lo verificó", P3) y la pregunta
    // queda en `nota` para cuando se decida el catálogo.
    return campo('liga', null, `el roster "${exactos[0].page}" lo ubica en '${exactos[0].leagueId}', que NO está en el catálogo de data/leagues.js`, 'pendiente', { nota: `fila en null hasta decidir: el club jugó ${anio} en '${exactos[0].leagueId}' (${exactos[0].page}), liga que no está en el catálogo. Propuesta de la entrada del catálogo: node tools/catalogo-liga.mjs --liga ${exactos[0].leagueId} (la liga de un deporte activo la aprueba la Auditora; activar un deporte, Guido)` });
  }
  // Una coincidencia parcial ÚNICA en toda la temporada del país ("AC Milan" / "Milan", "OFI Crete" / "OFI") vale como exacta
  // (confirmado por Guido para esos casos). Si hay más de una, sigue pendiente de confirmación.
  // AVISO (Auditora 5): el resultado no cambia, pero la fuente empieza con «NO EXACTA»: una coincidencia por palabras puede ser otro club con un
  // nombre parecido (RAAL La Louvière / «La Louvière Centre», otra sociedad; Lierse SK / Lierse Kempenzonen). Medido sobre las altas de hoy: 63
  // asignaciones salieron por acá sin ser exactas ni alias; casi todas son el mismo club con otro largo de nombre (Roma / AS Roma).
  if (!exactos.length && parciales.length === 1) {
    const p1 = parciales[0]; const cat = enCatalogo(p1.leagueId);
    if (cat) return campo('liga', cat, `NO EXACTA, confirmar en la página del club: roster cacheado de "${p1.page}" (tools/club-league-reference/${iso}.json), coincidencia única por palabras "${p1.club}" = "${nombre}" (si es el mismo club, agregarlo a alias.json)`);
  }
  if (exactos.length + parciales.length > 0) {
    const todos = [...exactos, ...parciales];
    // Mismo criterio: `pendiente` con la fila en null. El script no confirma homónimos por su cuenta
    // ("OFI Crete" contra "OFI"), pero tampoco hace falta frenar el alta por eso: null es la verdad.
    return campo('liga', null, `coincidencia NO exacta en los rosters cacheados: ${todos.map((t) => `"${t.club}" en ${t.page}`).join(' | ')}`, 'pendiente', { nota: `fila en null hasta confirmar: ¿"${nombre}" es ${todos.map((t) => `"${t.club}" (${t.leagueId}, ${t.page})`).join(' o ')}?` });
  }
  const cacheados = Object.entries(data.leagues || {}).filter(([, y]) => y[String(anio)]).map(([l]) => l);
  return campo('liga', null, cacheados.length ? `no aparece en los rosters cacheados de ${anio} (${cacheados.join(', ')}): puede haber jugado otra división` : `no hay ninguna liga-temporada de ${iso} ${anio} cacheada`, 'pendiente', { nota: 'la fila se escribe en null (= nadie lo verificó); bajar el roster con fetch-club-league-reference.mjs (club-or-year-onboarding/club-nuevo.md (liga))' });
}

// ============================================================================
// ESCRITURA (--escribir)
// ============================================================================
// `extra`: archivos de fuera de data/ que también se revierten (la evidencia del club, Admin/carga-clubes/<id>.md; si no existía, se borra).
function snapshot(extra = []) {
  const archivos = new Map();
  const add = (p) => { if (existsSync(p) && statSync(p).isFile()) archivos.set(p, readFileSync(p)); };
  (function walk(d) { for (const e of readdirSync(d)) { const f = join(d, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, 'data'));
  for (const e of readdirSync(resolve(ROOT, 'fuentes'))) if (e.endsWith('.html')) add(resolve(ROOT, 'fuentes', e));
  for (const d of ['club', 'liga', 'og']) if (existsSync(resolve(ROOT, d))) (function walk(x) { for (const e of readdirSync(x)) { const f = join(x, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, d)); // las páginas de club y de liga y sus imágenes
  for (const f of ['index.html', 'fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', ...extra]) add(resolve(ROOT, f));
  return archivos;
}
function revertir(snap, extra = []) {
  const actual = snapshot(extra);
  let restaurados = 0; let borrados = 0;
  for (const [p, buf] of snap) if (!actual.has(p) || !actual.get(p).equals(buf)) { writeFileSync(p, buf); restaurados++; }
  for (const p of actual.keys()) if (!snap.has(p)) { unlinkSync(p); borrados++; }
  return { restaurados, borrados };
}

// Inserta `texto` antes del primer `cierre` (regex de línea) que sigue a `apertura`.
function insertarAntes(contenido, apertura, cierre, texto, archivo) {
  const i = contenido.indexOf(apertura);
  if (i < 0) throw new Error(`${archivo}: no encontré "${apertura}"`);
  const resto = contenido.slice(i);
  const m = resto.match(cierre);
  if (!m) throw new Error(`${archivo}: no encontré el cierre del bloque "${apertura}"`);
  const pos = i + m.index;
  return contenido.slice(0, pos) + texto + contenido.slice(pos);
}

function jsStr(s) { return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`; }

function escribir(r) {
  const val = (n) => (r.campos.find((c) => c.campo === n) || {}).valor;
  if (!val('sport')) throw new Error('el alta no tiene deporte (sport): no se supone fútbol, se pregunta (to-do 339)');
  const eVal = (n) => (r.ejercicio.campos.find((c) => c.campo === n) || {});
  const id = val('id');
  const hoy = new Date().toISOString().slice(0, 10);
  const escritos = [];
  // data/ se publica y no lleva comentarios: lo que el alta dice de dónde salió cada cosa va a la evidencia del club
  const evExtra = [EV.rutaRel(id)];
  const snap = snapshot(evExtra);
  let ev = EV.leer(id);
  try {
    // 1. data/clubs.js
    const clubsPath = resolve(ROOT, 'data/clubs.js');
    let clubsJs = readFileSync(clubsPath, 'utf8');
    if (new RegExp(`['"]?${id}['"]?\\s*:\\s*\\{\\s*id:`).test(clubsJs)) throw new Error(`data/clubs.js ya tiene '${id}'`);
    const campos = [`id:${jsStr(id)}`, `name:${jsStr(val('name'))}`, `displayName:${jsStr(val('displayName'))}`, `country:${jsStr(val('country'))}`, `reportingCurrency:${jsStr(val('reportingCurrency'))}`, `fiscalYearStart:${jsStr(val('fiscalYearStart'))}`, `sport:${jsStr(val('sport'))}`];
    const linea = `  ${jsStr(id)}: { ${campos.join(', ')} },\n`;
    ev = EV.agregarCabecera(ev, [`${val('displayName')}: alta por tools/alta-club.mjs (${hoy}) desde ${r.documento}. brandColor AUSENTE a propósito`,
      '(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).']);
    clubsJs = insertarAntes(clubsJs, 'const clubs = {', /^\};$/m, linea, 'data/clubs.js');
    writeFileSync(clubsPath, clubsJs); escritos.push('data/clubs.js');

    // 2. data/<país>/<id>-data.js (esqueleto)
    const v = id.replace(/[^a-z0-9]/g, '');
    const dataPath = resolve(ROOT, rutaData(id, { pais: val('country') }));
    if (existsSync(dataPath)) throw new Error(`ya existe ${rutaData(id, { pais: val('country') })}`);
    const metaProp = {};
    for (const c of r.ejercicio.campos) {
      if (c.campo === 'currency') metaProp.currency = c.valor;
      if (c.campo === 'fx' && c.valor != null && c.fxSource) { metaProp.fx = c.valor; metaProp.fxSource = c.fxSource; }
      if (c.campo === 'fxRef') metaProp.fxRef = c.valor;
      if (c.campo === 'sourceId') metaProp.sourceId = c.valor;
      if (c.campo === 'reportType') metaProp.reportType = c.valor;
    }
    const fuentesCampo = [...r.campos, ...r.ejercicio.campos].map((c) => `  ${c.campo.padEnd(18)} ${c.estado.padEnd(9)} ${c.valor === undefined ? '(ausente)' : JSON.stringify(c.valor)} — ${String(c.fuente || '').slice(0, 150)}`);
    ev = EV.agregarCabecera(ev, [
      `${rutaData(id, { pais: val('country') })} — ${val('name')} (${NOMBRE_PAIS_ES[val('country')] || val('country')}).`,
      `ALTA POR SCRIPT (tools/alta-club.mjs, ${hoy}), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file`,
      'nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.',
      '',
      `Documento que originó el alta: ${r.documento}`,
      '',
      'De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):',
      ...fuentesCampo,
      '',
      `FISCAL YEAR META PROPUESTO para ${r.ejercicio.anio} (NO registrado: un ejercicio con meta y`,
      'sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):',
      `  ${r.ejercicio.anio}: ${JSON.stringify(metaProp)}`]);
    // el esqueleto es el JSON del club (la fuente) y de ahí sale su data file
    const ficha = { id, name: val('name'), displayName: val('displayName'), country: val('country'), reportingCurrency: val('reportingCurrency'), fiscalYearStart: val('fiscalYearStart'), sport: val('sport') };
    escritos.push(...crearClub(id, ficha, { pais: val('country') }));

    // 3. data/club-leagues/<iso2>.js
    const iso = val('country').toLowerCase();
    const liga = eVal('liga');
    const anio = r.ejercicio.anio;
    const ligaPath = resolve(ROOT, 'data/club-leagues', `${iso}.js`);
    const filaLiga = `  ${jsStr(id)}: { ${anio}: ${liga.valor ? jsStr(liga.valor) : 'null'} },\n`;
    ev = EV.agregarTexto(ev, anio, 'Liga', [`alta-club.mjs (${hoy}): ${liga.valor || 'null'}, ${liga.valor ? `verificado contra ${liga.fuente}` : `SIN VERIFICAR (${liga.fuente})`}.`]);
    if (existsSync(ligaPath)) {
      const txt = readFileSync(ligaPath, 'utf8');
      // Si el club YA tiene su línea (a mano, con otros años), el año se agrega a ESA línea o, si ya está, no se escribe nada: una segunda línea del mismo id pisa la primera
      // entera (Object.assign) y el club queda con un solo año. Caso: bathrugby-gb, la línea 2021 a 2025 quedó pisada por una de solo 2021.
      const enLinea = new RegExp(`^(\\s*(?:'${id}'|"${id}"|${id})\\s*:\\s*\\{)([^}]*)(\\},?)\\s*$`, 'm');
      const ya = txt.match(enLinea);
      if (ya) {
        if (new RegExp(`\\b${anio}\\s*:`).test(ya[2])) { /* el año ya está en la línea: no se toca */ }
        else writeFileSync(ligaPath, txt.replace(enLinea, `$1${ya[2].replace(/\s+$/, '')}, ${anio}: ${liga.valor ? jsStr(liga.valor) : 'null'} $3`));
      } else writeFileSync(ligaPath, insertarAntes(txt, 'Object.assign(window.CLUB_LEAGUE_BY_YEAR, {', /^\}\);$/m, filaLiga, `data/club-leagues/${iso}.js`));
    } else {
      // sin cabecera de comentario; las reglas de estos archivos están en data/club-leagues.js
      writeFileSync(ligaPath, `window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
${filaLiga}});
`);
    }
    escritos.push(`data/club-leagues/${iso}.js`);

    // 4. País nuevo
    if (r.contexto.paisNuevo) {
      const p = r.contexto.paisNuevo;
      const lp = resolve(ROOT, 'data/leagues.js');
      const lj = readFileSync(lp, 'utf8');
      const pad = `${p.iso2}: `;
      writeFileSync(lp, insertarAntes(lj, 'const COUNTRIES = {', /^\};$/m, `  ${pad}{ name:${jsStr(p.name)}, key:'country.${p.iso2}', flag:'${p.flag}', region:'${p.region}' },\n`, 'data/leagues.js'));
      escritos.push('data/leagues.js');
      const ep = resolve(ROOT, 'data/lang/en.js');
      const ej = readFileSync(ep, 'utf8');
      const ancla = ej.match(/^\s*"country\.[A-Z]{2}": "[^"]*",\n/m);
      if (ancla && !ej.includes(`"country.${p.iso2}"`)) {
        const pos = ej.indexOf(ancla[0]) + ancla[0].length;
        writeFileSync(ep, ej.slice(0, pos) + `  "country.${p.iso2}": ${JSON.stringify(p.en)},\n` + ej.slice(pos));
        escritos.push('data/lang/en.js');
      }
    }
    // 5. Moneda nueva
    const cmPath = resolve(ROOT, 'data/currency-map.js');
    let cm = readFileSync(cmPath, 'utf8'); let cmTocado = false;
    if (r.contexto.monedaNueva) {
      const m = r.contexto.monedaNueva;
      cm = insertarAntes(cm, 'const CURRENCY_META = {', /^\};$/m, `  ${m.codigo}: { scale: ${m.scale}, unitSuffix: '${m.scale === 1000 ? 'mil M' : 'M'}' },\n`, 'data/currency-map.js');
      cm = insertarAntes(cm, 'const FX_PLAUSIBLE_RANGE = {', /^\};$/m, `  ${m.codigo}: [${m.rango.join(', ')}],\n`, 'data/currency-map.js');
      cmTocado = true;
    }
    // 6. FX de mercado nuevo
    const fxc = r.ejercicio.campos.find((c) => c.campo === 'fxRef' && c.fxClose && c.estado === 'ok');
    if (fxc && !cm.includes(`'${fxc.valor}':`)) {
      cm = insertarAntes(cm, 'const FX_CLOSE = {', /^\};$/m, `  '${fxc.valor}': { fx: ${fxc.fxClose.fx}, source: 'market_close', label: ${jsStr(fxc.fxClose.label)} },\n`, 'data/currency-map.js');
      cmTocado = true;
    }
    if (cmTocado) { writeFileSync(cmPath, cm); escritos.push('data/currency-map.js'); }
    escritos.push(EV.guardar(id, ev));

    // 7. ASSET_V (CLAUDE.md, "Gotchas de tooling"; audit.js lo exige como P1 `asset-v-sin-subir`
    // apenas cambia algo de data/): se sube la constante Y cada `?v=` literal de index.html, las
    // dos cosas juntas (subir una sola es peor que ninguna). Si index.html ya tiene un ASSET_V
    // distinto al del último commit (otra alta u otro cambio sin commitear ya lo subió), no se toca.
    const idxPath = resolve(ROOT, 'index.html');
    const idx = readFileSync(idxPath, 'utf8');
    const actual = (idx.match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1];
    let enHead = null;
    try { enHead = (execFileSync('git', ['show', 'HEAD:index.html'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1]; } catch { enHead = null; }
    if (actual && (enHead === null || enHead === actual)) {
      const nuevo = /^\d+$/.test(actual) ? String(Number(actual) + 1) : `${actual}a`;
      const esc = actual.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const idxNuevo = idx.replace(`window.ASSET_V = '${actual}'`, `window.ASSET_V = '${nuevo}'`).replace(new RegExp(`\\?v=${esc}(?=["'])`, 'g'), `?v=${nuevo}`);
      writeFileSync(idxPath, idxNuevo); escritos.push(`index.html (ASSET_V ${actual} -> ${nuevo})`);
    }

    // 8. Generadores + auditoría
    // la misma lista que cargar.mjs (tools/generadores.mjs): sin faltantes-liga y estimar, toda alta se revertía por 2 P1
    const gens = GENERADORES.filter((g) => existsSync(resolve(ROOT, g)));
    const salidaGen = [];
    for (const g of gens) {
      const res = runNode(g, []);
      salidaGen.push({ generador: g, codigo: res.code });
      if (res.code !== 0) throw new Error(`${g} falló (código ${res.code}): ${res.out.slice(-600)}`);
    }
    const audit = runNode('tools/audit.js', ['--quiet']);
    const linea0 = (audit.out.match(/P0 \d+ · P1 \d+[^\n]*/) || [''])[0];
    if (audit.code !== 0) {
      const rv = revertir(snap, evExtra);
      const falla = queFalla(audit.out);
      return { ok: false, motivo: `node tools/audit.js dio P0/P1 (${linea0}${falla.length ? `: ${falla.join(', ')}` : ''}); se revirtió todo (${rv.restaurados} archivos restaurados, ${rv.borrados} borrados)`, audit: audit.out.slice(-3000), escritos };
    }
    return { ok: true, escritos, generadores: salidaGen, audit: linea0 };
  } catch (e) {
    const rv = revertir(snap, evExtra);
    return { ok: false, motivo: `${e.message} — se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, escritos };
  }
}

// ============================================================================
// PREGUNTAS PARA CLAUDE (tools/alta-claude.mjs): cuáles van, y qué se hace con la respuesta
// ============================================================================
// Campo de alta-club.mjs -> tipo de pregunta de alta-claude.mjs. Las de cierre (anio, cierre,
// fiscalYearStart) se juntan en UNA sola pregunta: son la misma fecha vista de tres lados.
const TIPO_DE_CAMPO = { perimetro: 'perimetro', reportType: 'reportType', anio: 'cierre', cierre: 'cierre', fiscalYearStart: 'cierre', currency: 'moneda', fx: 'fx', sport: 'sport', name: 'name' };

// ¿Esta pregunta se responde LEYENDO el documento (va a Claude, y si Claude no puede, es candidata a
// preguntarle al club), o es una decisión de PRODUCTO (id heredado a renombrar, país Escocia, liga fuera
// del catálogo, Panamá USD/PAB, dos entidades en la carpeta: las decide Guido, no un club)?
function clasePregunta(c, r) {
  const pais = paisDe((r.carpeta || '').split('/')[1]);
  if (!TIPO_DE_CAMPO[c.campo]) return 'producto';
  if (c.campo === 'perimetro' && c.dosEntidades) return 'producto';
  if (c.campo === 'currency' && pais && pais.preguntaMoneda) return 'producto';
  if (c.campo === 'fx' && /presupuesto/i.test(c.pregunta || '')) return 'producto'; // premisa de un presupuesto: otra pregunta
  return 'documento';
}

function preguntasParaClaude(r) {
  const porTipo = new Map();
  const todos = [...r.campos, ...r.ejercicio.campos];
  for (const c of todos) {
    const esNombre = c.campo === 'name' && c.estado === 'pendiente';
    if (c.estado !== 'pregunta' && !esNombre) continue;
    if (!esNombre && clasePregunta(c, r) !== 'documento') continue;
    const tipo = TIPO_DE_CAMPO[c.campo];
    const texto = esNombre ? `¿Cuál es el nombre legal completo de la entidad que emite estos estados (el script no lo encontró; candidato: "${c.valor}")?` : c.pregunta;
    const x = porTipo.get(tipo) || { id: tipo, tipo, textos: [], campos: [], contexto: [] };
    if (!x.textos.includes(texto)) x.textos.push(texto);
    x.campos.push(c.campo);
    if (c.fuente) x.contexto.push(`${c.campo}: ${String(c.fuente).slice(0, 300)}`);
    porTipo.set(tipo, x);
  }
  const moneda = (r.ejercicio.campos.find((c) => c.campo === 'currency') || {}).valor;
  return [...porTipo.values()].map((x) => ({
    id: x.id, tipo: x.tipo, campos: x.campos, texto: x.textos.join(' / '), contexto: x.contexto.join(' | '),
    ctxFx: x.tipo === 'fx' && MONEDAS[moneda] ? { moneda, rango: MONEDAS[moneda].rango, aLaPar: MONEDAS_A_LA_PAR.has(moneda) } : undefined,
  }));
}

// De las respuestas verificadas, cuáles se APLICAN (desbloquean sin decidir nada de producto).
// Una respuesta verificada que no desbloquea (el documento es un intermedio; el club es de rugby; la
// moneda es la vieja, anterior al euro) queda guardada con su cita al lado de la pregunta, que sigue abierta.
function aplicables(respuestas, r) {
  const ov = {};
  const pais = paisDe((r.carpeta || '').split('/')[1]);
  for (const x of respuestas || []) {
    if (!x.resuelta) continue;
    const c0 = (x.citas || [])[0] || {};
    const fuente = `pág. ${c0.pagina}: "${String(c0.texto || '').slice(0, 160)}" (confianza ${x.confianza})`;
    const v = { valor: x.valor, fuente };
    if (x.tipo === 'cierre') ov.cierre = v;
    else if (x.tipo === 'reportType' && ['official_balance_sheet', 'official_budget'].includes(x.valor)) ov.reportType = v;
    else if (x.tipo === 'perimetro' && x.valor !== 'otra_entidad') ov.perimetro = v;
    else if (x.tipo === 'moneda' && pais && x.valor === pais.moneda) ov.moneda = v;
    else if (x.tipo === 'sport' && x.valor === 'futbol') ov.sport = v;
    // Nombre en alfabeto no latino (griego, cirílico, hangul): verificado, pero NO se aplica. Los clubes
    // cargados usan la transliteración latina ("Panathinaikos Athlitikos Omilos P.A.E."; en el backtest
    // Claude devolvió el griego impreso, bien leído pero con otra convención) y una transliteración no se
    // puede verificar contra el documento. Queda en el registro, con su cita, para quien complete `name`.
    else if (x.tipo === 'name' && !/[^\u0000-\u024F\u1E00-\u1EFF\s]/.test(x.valor)) ov.name = v;
    else if (x.tipo === 'fx') ov.fx = v;
  }
  return ov;
}

// ============================================================================
// EL REGISTRO (Admin/registros/altas-club.jsonl, ver tools/altas-registro.mjs)
// ============================================================================
const sha1 = (x) => createHash('sha1').update(x).digest('hex');
let _estadoTransc = null;
function estadoTranscripciones() {
  if (_estadoTransc) return _estadoTransc;
  _estadoTransc = new Map();
  const p = resolve(ROOT, 'Admin/registros/transcripciones-estado.jsonl');
  if (existsSync(p)) for (const l of readFileSync(p, 'utf8').split('\n')) { try { const e = JSON.parse(l); if (e.md) _estadoTransc.set(e.md, e.estado); } catch { /* */ } }
  return _estadoTransc;
}

function mdsDeCarpeta(paisCarpeta, clubCarpeta) {
  const dir = resolve(ROOT, 'Clubes', paisCarpeta, clubCarpeta);
  const out = [];
  if (!existsSync(dir)) return out;
  (function walk(d) {
    for (const e of readdirSync(d)) {
      const f = join(d, e);
      if (statSync(f).isDirectory()) { walk(f); continue; }
      if (!/\.md$/i.test(e) || /\.(previo-[a-z]+|gemini-check|claude-check|mistral-redo|t-[a-z]+)\.md$/i.test(e) || /^readme/i.test(e)) continue;
      out.push(rel(f));
    }
  })(dir);
  return out.sort();
}

// Orden de preferencia del documento BASE de una carpeta (mismo criterio que la prueba de
// Admin/mediciones/test-alta-club.md, ahora por script): primero los que son un estado contable anual por el
// nombre (no presupuesto/acta/intermedio), después los de transcripción `listo`/`cargado` antes que los
// `revisar`/`pendiente-segunda-voz`, y dentro de eso el ejercicio más reciente.
function candidatosBase(mds) {
  const est = estadoTranscripciones();
  const rango = (m) => ({ listo: 0, cargado: 0, 'sin-verificar': 1 }[est.get(m)] ?? 2);
  return mds.map((m) => ({ m, nb: NO_BALANCE.test(norm(basename(m))) ? 1 : 0, rk: rango(m), y: anioDelNombre(basename(m)) || 0 }))
    .sort((a, b) => a.nb - b.nb || a.rk - b.rk || b.y - a.y || a.m.localeCompare(b.m)).map((x) => x.m);
}

function huellaCarpeta(paisCarpeta, clubCarpeta, mds, docForzado) {
  const pais = paisDe(paisCarpeta) || {};
  const iso = (pais.iso2 || 'xx').toLowerCase();
  const archivos = [...mds, 'data/clubs.js', 'data/currency-map.js', 'data/leagues.js', `data/club-leagues/${iso}.js`, `tools/club-league-reference/${iso}.json`, 'tools/alta-club.mjs', 'tools/alta-claude.mjs', 'tools/carpetas-clubes.mjs'];
  if (pais.moneda && SERIES_FX[pais.moneda]) archivos.push(`tools/fx-reference/${SERIES_FX[pais.moneda]}`);
  const res = clubDeCarpeta(paisCarpeta, clubCarpeta);
  const est = estadoTranscripciones();
  return huellaEntradas({ archivos, extra: { resolucion: [res.via, res.clubId || null], docForzado: docForzado || null, anioForzado: ANIO_FORZADO, transcripcion: mds.map((m) => est.get(m) || null) } });
}

// Una entrada del registro a partir del análisis (ya con las respuestas de Claude aplicadas).
function armarEntrada({ paisCarpeta, clubCarpeta, r, huella, detalle, claude, probados, error }) {
  const carpeta = `Clubes/${paisCarpeta}/${clubCarpeta}/`;
  const base = { carpeta, pais: paisCarpeta, club: clubCarpeta, fecha: new Date().toISOString(), huella, entradas: detalle };
  if (error || !r) return { ...base, clubId: null, estado: 'faltan-datos', documento: null, detalle: error || 'sin análisis', preguntas: [], pendientes: [], resueltas: [], claude: null };
  if (r.error) return { ...base, clubId: null, estado: 'faltan-datos', documento: r.documento, detalle: r.error, preguntas: [], pendientes: [], resueltas: [], claude: null };
  const todos = [...r.campos, ...r.ejercicio.campos];
  const clubId = r.club.existe ? r.club.clubId : (r.campos.find((c) => c.campo === 'id') || {}).valor;
  const respPorTipo = new Map(((claude && claude.respuestas) || []).map((x) => [x.tipo, x]));
  const preguntas = todos.filter((c) => c.estado === 'pregunta').map((c) => {
    const clase = clasePregunta(c, r);
    const x = clase === 'documento' ? respPorTipo.get(TIPO_DE_CAMPO[c.campo]) : null;
    return {
      campo: c.campo, clase, pregunta: c.pregunta,
      claude: x ? { valor: x.valor, respuesta: x.respuesta, confianza: x.confianza, verificada: x.resuelta, motivoNoResuelta: x.motivoNoResuelta, citas: x.citas } : null,
      // Candidata a Admin/dudas-por-club.md (preguntarle al CLUB): solo si es de lectura del documento y
      // Claude ya la leyó y no la pudo sostener con una cita. Si Claude la contestó con cita pero la
      // respuesta no desbloquea (intermedio, otro deporte, moneda vieja), no hay nada que preguntarle al
      // club: la decisión es de Guido (usar otro documento, ¿entra ese deporte?, ¿se convierte?).
      candidataDudas: clase === 'documento' && !!x && !x.resuelta,
    };
  });
  const fxOk = todos.some((c) => (c.campo === 'fx' || c.campo === 'fxRef') && c.estado === 'ok');
  const faltaFx = !fxOk && !preguntas.some((p) => p.campo === 'fx' || p.campo === 'currency');
  const pendientes = todos.filter((c) => c.estado === 'pendiente').map((c) => ({ campo: c.campo, fuente: String(c.fuente || '').slice(0, 240), bloquea: (c.campo === 'fx' || c.campo === 'fxRef') && faltaFx }));
  const resueltas = todos.filter((c) => /^claude-api/.test(String(c.fuente || '')) && c.estado === 'ok').map((c) => {
    const x = respPorTipo.get(TIPO_DE_CAMPO[c.campo]) || {};
    return { campo: c.campo, valor: c.valor, fuente: 'claude-api', modelo: claude && claude.modelo, confianza: x.confianza, respuesta: x.respuesta, citas: (x.citas || []).map(({ pagina, texto }) => ({ pagina, texto })) };
  });
  // El deporte que el alta calculó, para el registro: lo leen Jev, Claude y la cola de un club que todavía no tiene ficha (tools/deporte-club.mjs, deporteDeCarpeta).
  // `origen` dice de dónde salió (ficha, liga, menciones del .md o claude); `pregunta` = se preguntó y nadie contestó (valor null). Una entrada sin `sport` = nadie lo calculó.
  const spC = r.campos.find((c) => c.campo === 'sport');
  const sport = r.club.existe ? { valor: deporteDeClub(clubId), origen: 'ficha' }
    : !spC ? undefined
    : spC.estado === 'pregunta' ? { valor: null, origen: 'pregunta' }
    : { valor: spC.valor ?? null, origen: /^la ficha/.test(spC.fuente) ? 'ficha' : /^la liga/.test(spC.fuente) ? 'liga' : /^claude-api/.test(spC.fuente) ? 'claude' : 'menciones' };
  let estado;
  if (r.club.existe) estado = 'existe';
  else if (preguntas.length) estado = 'con-preguntas';
  else if (faltaFx) estado = 'faltan-datos';
  else estado = 'listo-para-alta';
  return {
    ...base, clubId, estado, ...(sport ? { sport } : {}), documento: r.documento, anio: r.ejercicio.anio, cierre: r.ejercicio.cierre,
    detalle: estado === 'faltan-datos' ? 'sin tipo de cambio para el cierre: ni declarado por el documento, ni en FX_CLOSE, ni en tools/fx-reference/ (correr fetch-fx-reference.mjs)' : undefined,
    documentosProbados: probados && probados.length > 1 ? probados : undefined,
    resumen: { ok: r.resumen.ok, pregunta: r.resumen.pregunta, pendiente: r.resumen.pendiente },
    preguntas, pendientes, resueltas,
    claude: claude ? { preguntasHuella: claude.preguntasHuella, fecha: claude.fecha, modelo: claude.modelo, costUsd: claude.costUsd, paginasEnviadas: claude.paginasEnviadas, entero: claude.entero, error: claude.error, respuestas: claude.respuestas } : null,
  };
}

// Analiza una carpeta: elige el documento base (o usa el forzado), consulta/reusa a Claude, arma la entrada.
// Devuelve { entrada, pendienteClaude } — `pendienteClaude` es la tarea a mandar a Claude si hace falta
// (se corren todas juntas después, con concurrencia y tope de gasto).
function analizarCarpeta(paisCarpeta, clubCarpeta, sitio, previo, docForzado = null) {
  const mds = mdsDeCarpeta(paisCarpeta, clubCarpeta);
  const { huella, detalle } = huellaCarpeta(paisCarpeta, clubCarpeta, mds, docForzado);
  const ctxBase = { paisCarpeta, clubCarpeta, huella, detalle };
  if (!mds.length && !docForzado) return { entrada: armarEntrada({ ...ctxBase, error: 'la carpeta no tiene ningún .md: falta transcribir (tools/pipeline.mjs / mistral-ocr-transcribe.mjs)' }) };
  let r = null; const probados = [];
  const orden = docForzado ? [docForzado] : candidatosBase(mds).slice(0, 4);
  for (const m of orden) {
    const x = analizar(m, sitio);
    probados.push(x.documento);
    if (!r) r = x;
    // Un documento que no sirve de base (no es un balance anual, o no se le puede sacar el ejercicio)
    // se cambia por el siguiente candidato: "usar otro documento de la misma carpeta" era la respuesta
    // más frecuente a esas preguntas en la prueba de Admin/mediciones/test-alta-club.md.
    const malBase = x.error || (x.preguntas || []).some((p) => ['reportType', 'anio', 'cierre', 'fiscalYearStart'].includes(p.campo));
    if (!malBase) { r = x; break; }
  }
  if (r.error || r.club.existe) return { entrada: armarEntrada({ ...ctxBase, r, probados }) };
  const pregs = preguntasParaClaude(r);
  const mdSha = sha1Archivo(r.md);
  const preguntasHuella = sha1(JSON.stringify({ mdSha, pregs: pregs.map((p) => [p.tipo, p.texto]), MODELO }));
  // Respuestas de Claude reusables si se hicieron sobre el MISMO .md y las MISMAS preguntas (y modelo).
  // Un cambio del prompt de alta-claude.mjs NO las invalida solo (costaría volver a pagar todo): para
  // rehacerlas, --forzar-claude.
  // BUG REAL: una corrida que no reusaba las respuestas (otra versión de las preguntas, o un recálculo de otra sesión) escribía
  // la entrada SIN el campo `claude`, y las respuestas ya pagadas se perdían del registro (quedaron 12 de 36; se recuperaron de git). Ahora
  // las respuestas anteriores viajan siempre en `claudeAnterior` hasta que una corrida con --claude las reemplace, y se reusan desde ahí si
  // la huella de las preguntas coincide.
  const anterior = (previo && (previo.claude || previo.claudeAnterior)) || null;
  let claude = anterior && anterior.preguntasHuella === preguntasHuella && !anterior.error && !ARGS.includes('--forzar-claude') ? anterior : null;
  if (claude || !pregs.length) return { entrada: finalizar({ ...ctxBase, r, probados, claude }), sinClaude: false };
  const e0 = armarEntrada({ ...ctxBase, r, probados });
  return { entrada: anterior ? { ...e0, claudeAnterior: anterior } : e0, pendienteClaude: { ...ctxBase, r, probados, pregs, preguntasHuella } };
}

// Con las respuestas de Claude (nuevas o reusadas): vuelve a analizar el documento con lo que desbloquea.
function finalizar({ paisCarpeta, clubCarpeta, huella, detalle, r, probados, claude }) {
  let r2 = r;
  if (claude && claude.respuestas) {
    const ov = aplicables(claude.respuestas, r);
    if (Object.keys(ov).length) r2 = analizar(r.documento, cargarSitioCache(), ov);
  }
  return armarEntrada({ paisCarpeta, clubCarpeta, r: r2, huella, detalle, claude, probados });
}

let _sitio = null;
function cargarSitioCache() { return (_sitio ??= cargarSitio()); }

async function correrClaude(tareas) {
  // Tope de gasto con concurrencia: cada trabajador reserva el costo estimado de su llamada ANTES de
  // hacerla (bug de la primera corrida: con 4 en paralelo y el chequeo solo contra lo ya gastado, un tope
  // de US$ 1,45 terminó en US$ 1,72).
  let gastado = 0; let hechas = 0; let enCurso = 0; const out = [];
  const estimado = () => (hechas ? gastado / hechas : 0.09);
  const cola = [...tareas];
  async function trabajador() {
    while (cola.length) {
      if (gastado + (enCurso + 1) * estimado() > TOPE_USD) return;
      const t = cola.shift(); enCurso++;
      const moneda = (t.r.ejercicio.campos.find((c) => c.campo === 'currency') || {}).valor;
      const res = await preguntarAClaude({ md: readFileSync(resolve(ROOT, t.r.md), 'utf8'), preguntas: t.pregs, modelo: MODELO,
        ctx: { carpeta: `${t.paisCarpeta}/${t.clubCarpeta}`, documento: basename(t.r.documento), pais: t.paisCarpeta, anio: t.r.ejercicio.anio, moneda } });
      gastado += res.costUsd || 0; hechas++; enCurso--;
      const claude = { preguntasHuella: t.preguntasHuella, fecha: new Date().toISOString(), modelo: res.model || MODELO, costUsd: Number((res.costUsd || 0).toFixed(5)), paginasEnviadas: res.paginasEnviadas, entero: res.entero, error: res.error, respuestas: res.respuestas };
      out.push({ t, claude });
      console.error(`  claude ${hechas}/${tareas.length} ${t.paisCarpeta}/${t.clubCarpeta}: ${res.respuestas.filter((x) => x.resuelta).length}/${t.pregs.length} resueltas, $${(res.costUsd || 0).toFixed(4)} (acumulado $${gastado.toFixed(3)})${res.error ? ' ERROR ' + res.error.slice(0, 120) : ''}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, trabajador));
  if (cola.length) console.error(`  Tope de gasto (--tope-usd ${TOPE_USD}) alcanzado: ${cola.length} carpetas quedaron sin preguntar.`);
  return { resultados: out, gastado };
}

// ============================================================================
// MODOS DE LA LÍNEA DE COMANDOS
// ============================================================================
async function modoTodos() {
  const sitio = cargarSitioCache();
  const { todasLasCarpetas } = await import('./carpetas-clubes.mjs');
  let carpetas = todasLasCarpetas().filter((c) => c.via === 'nuevo' && !c.carpeta.startsWith('_'));
  const solo = flagVal('--solo');
  if (solo) carpetas = carpetas.filter((c) => `${c.pais}/${c.carpeta}`.includes(solo));
  const previo = leerRegistro();
  // SIN DOCUMENTO QUE SIRVA. Athens Kallithea (su único documento es el balance del municipio, descartado) y Catania
  // (su único documento está en una de las dos listas) salían "listo-para-alta". Escalón antes de la huella, con UNA compuerta: TODOS los .md de la carpeta
  // están en Admin/registros/documentos-descartados.txt o documentos-parciales.txt (la misma lectura que cargar-lote.mjs, 232 j). Si
  // pasa, la carpeta no se analiza y queda `faltan-datos` con la lista (no se borra: un parcial espera el otro tramo). Una carpeta con
  // ALGÚN documento en esas listas (Atromitos, 1 de 24) no cambia. La huella guardada lleva el prefijo `sin-doc-util:` para que, si un
  // documento sale de la lista, la corrida siguiente no la dé por "sin cambios" y la analice.
  const leerLineas = (f) => (existsSync(resolve(ROOT, f)) ? readFileSync(resolve(ROOT, f), 'utf8').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')) : []);
  const fueraDeCarga = new Set([...leerLineas('Admin/registros/documentos-descartados.txt'), ...leerLineas('Admin/registros/documentos-parciales.txt')].map((d) => d.replace(/\.(pdf|md)$/i, '')));
  const nuevas = []; const tareas = []; let sinCambio = 0;
  for (const c of carpetas) {
    const k = `Clubes/${c.pais}/${c.carpeta}/`;
    const p = previo.get(k);
    const mds = mdsDeCarpeta(c.pais, c.carpeta);
    const { huella, detalle: entradas } = huellaCarpeta(c.pais, c.carpeta, mds, null);
    if (mds.length && mds.every((m) => fueraDeCarga.has(m.replace(/\.md$/i, '')))) {
      if (p && p.huella === `sin-doc-util:${huella}` && !FORZAR) { sinCambio++; continue; }
      nuevas.push({ carpeta: k, pais: c.pais, club: c.carpeta, fecha: new Date().toISOString(), huella: `sin-doc-util:${huella}`, entradas, clubId: null, estado: 'faltan-datos', documento: null, detalle: `todos sus documentos están descartados o son parciales (Admin/registros/documentos-descartados.txt / documentos-parciales.txt): ${mds.join('; ')}`, preguntas: [], pendientes: [], resueltas: [], claude: null });
      continue;
    }
    // Sin cambios de huella: la línea sigue valiendo. Solo se rehace si se pide Claude y a esa carpeta
    // todavía le quedan preguntas de documento sin preguntar.
    const faltaClaude = CLAUDE && p && (p.preguntas || []).some((q) => q.clase === 'documento' && !q.claude) || (CLAUDE && p && (p.pendientes || []).some((q) => q.campo === 'name') && !p.claude);
    if (p && p.huella === huella && !FORZAR && !faltaClaude) { sinCambio++; continue; }
    const x = analizarCarpeta(c.pais, c.carpeta, sitio, p);
    if (x.pendienteClaude && CLAUDE) tareas.push(x.pendienteClaude);
    nuevas.push(x.entrada);
  }
  // Las de Claude, en tanda (con tope de gasto) y después se rehace su entrada con lo que desbloquea.
  if (tareas.length) {
    // Primero las carpetas que Claude puede dejar LISTAS: sin preguntas de producto (que Claude no
    // desbloquea) y con menos preguntas. Con tope de gasto, así rinde más cada dólar.
    const prodCount = (t) => [...t.r.campos, ...t.r.ejercicio.campos].filter((c) => c.estado === 'pregunta' && clasePregunta(c, t.r) === 'producto').length;
    // Las que solo tienen `name` pendiente (no bloquea) van al final.
    const soloNombre = (t) => (t.pregs.every((p) => p.tipo === 'name') ? 1 : 0);
    tareas.sort((a, b) => soloNombre(a) - soloNombre(b) || prodCount(a) - prodCount(b) || a.pregs.length - b.pregs.length || a.r.carpeta.localeCompare(b.r.carpeta));
    const lim = LIMITE !== null ? tareas.slice(0, LIMITE) : tareas;
    console.error(`Claude: ${lim.length} carpetas con preguntas de documento (modelo ${MODELO}, tope US$ ${TOPE_USD}).`);
    const { resultados, gastado } = await correrClaude(lim);
    for (const { t, claude } of resultados) {
      const e = finalizar({ ...t, claude });
      const i = nuevas.findIndex((n) => n.carpeta === e.carpeta);
      nuevas[i] = e;
    }
    console.error(`Claude: gastado US$ ${gastado.toFixed(3)}.`);
  }
  // YA DADAS DE ALTA. Una carpeta deja de ser `nuevo` cuando su club entra al sitio, y
  // desde ahí este bucle no la mira: su línea vieja ("listo-para-alta" del día del ensayo) quedaba congelada y el resumen del pipeline
  // seguía ofreciendo dar de alta a Atalanta, Inter, Lazio... (25 líneas así al medirlo, 21 italianas y 4 de Brasil). Escalón nuevo,
  // gratis y sin analizar nada: si la carpeta ya resuelve a un club del sitio, su línea pasa a `existe` con ese clubId. Las demás no cambian.
  const yaEnSitio = todasLasCarpetas().filter((c) => c.via !== 'nuevo' && c.clubId && !c.carpeta.startsWith('_') && (!solo || `${c.pais}/${c.carpeta}`.includes(solo)));
  let pasanAExiste = 0;
  for (const c of yaEnSitio) {
    const p = previo.get(`Clubes/${c.pais}/${c.carpeta}/`);
    if (!p || p.estado === 'existe') continue;
    nuevas.push({ ...p, clubId: c.clubId, estado: 'existe', detalle: `el club ya está en el sitio (${c.clubId}, ${c.via}: ${c.fuente || ''}); la línea anterior era "${p.estado}"`, fecha: new Date().toISOString() });
    pasanAExiste++;
  }
  guardarEnRegistro(nuevas);
  console.log(`${carpetas.length} carpetas de club nuevo: ${nuevas.length - pasanAExiste} recalculadas, ${sinCambio} sin cambios de huella.${pasanAExiste ? ` ${pasanAExiste} carpeta(s) de clubes ya dados de alta pasan a "existe".` : ''}`);
  imprimirResumen();
}

function imprimirResumen() {
  const s = resumenAltas();
  console.log(`\nAdmin/registros/altas-club.jsonl: ${s.total} carpetas — ${ESTADOS.map((e) => `${e} ${s.porEstado[e] || 0}`).join(' · ')}`);
  console.log(`Preguntas abiertas por campo: ${Object.entries(s.preguntasPorCampo).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', ') || 'ninguna'}`);
  console.log(`Campos resueltos por Claude con cita verificada: ${s.resueltasPorClaude}`);
  if (s.listos.length) {
    console.log(`\nListos para alta (${s.listos.length}):`);
    for (const l of s.listos) console.log(`  ${String(l.clubId).padEnd(26)} ${l.documento}`);
  }
}

// Candidatas a Admin/dudas-por-club.md: preguntas de LECTURA del documento que Claude leyó y no pudo
// sostener con una cita (o dijo que el documento no lo dice). NO se escriben en dudas-por-club.md: la
// lista es para que Guido decida. Con qué páginas se revisaron, para no volver a leerlas.
function modoDudas() {
  const reg = leerRegistro();
  let n = 0; let sinPreguntar = 0; let producto = 0;
  for (const e of [...reg.values()].sort((a, b) => a.carpeta.localeCompare(b.carpeta))) {
    for (const q of e.preguntas || []) {
      if (q.clase === 'producto') { producto++; continue; }
      if (!q.claude) { sinPreguntar++; continue; }
      if (!q.candidataDudas) continue;
      n++;
      console.log(`\n${e.carpeta}  (${e.clubId}, documento ${e.documento})`);
      console.log(`  ? ${q.campo}: ${q.pregunta}`);
      console.log(`    Claude (${e.claude && e.claude.modelo}): ${q.claude.valor || '(sin valor)'} — ${q.claude.respuesta || ''} [confianza ${q.claude.confianza}; ${q.claude.motivoNoResuelta}]`);
      for (const c of q.claude.citas || []) console.log(`      cita pág. ${c.pagina} ${c.ok ? 'VERIFICADA' : 'NO verificada (' + c.motivo + ')'}: "${String(c.texto).slice(0, 160)}"`);
      console.log(`    Páginas revisadas: ${e.claude && e.claude.entero ? 'el documento entero' : (e.claude && e.claude.paginasEnviadas || []).join(', ')}`);
    }
  }
  console.log(`\n${n} preguntas candidatas a Admin/dudas-por-club.md (NO se escribieron: decide Guido). Además: ${sinPreguntar} de documento todavía sin preguntar a Claude (correr --todos --claude) y ${producto} de producto (las decide Guido, no un club).`);
}

// ============================================================================
// BACKTEST: las mismas preguntas a clubes que YA están en el sitio, contra lo cargado
// ============================================================================
function cargarDatosSitio() {
  const sandbox = { console: { log() {}, warn() {}, error() {} } }; sandbox.window = sandbox; sandbox.globalThis = sandbox;
  sandbox.document = { createElement() { return {}; }, head: { appendChild() {} } };
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/club-leagues.js', ...archivosData()];
  for (const f of files) { try { vm.runInContext(readFileSync(resolve(ROOT, f), 'utf8'), ctx, { filename: f }); } catch { /* un archivo roto no frena el backtest */ } }
  return vm.runInContext('({ clubs, sources, generic: window.CLUB_GENERIC_DATA || {} })', ctx);
}

// Perímetro "verdadero" de lo cargado: no hay un campo, está en la nota de la fuente o en la cabecera
// del data file. Heurística por palabras; lo que no se puede decidir queda "?" y no cuenta para el acierto.
function perimetroCargado(nota) {
  const t = norm(nota || '');
  const cons = /consolidad|consolidated|koncern|konzern|konsern|grupo consolidado|group accounts|\bgrupo\b/.test(t);
  const ind = /individual|moderselskab|morselskap|no el grupo|no del grupo|no consolidad|separate|company only|sociedad (anonima )?deportiva sola|la sociedad|einzelabschluss|enkelvoudig/.test(t);
  if (cons && !/no del koncern|no el koncern|no el consolidado|no del consolidado|no del grupo|no el grupo/.test(t) && !ind) return 'consolidado';
  if (ind && !cons) return 'individual';
  if (/no del koncern|no el koncern|no el consolidado|no del consolidado|no del grupo|no el grupo/.test(t)) return 'individual';
  if (cons && ind) return '?';
  return 'individual?'; // sin mención: casi siempre un club-asociación sin grupo (una sola entidad)
}

// Perímetro revisado A MANO donde la heurística de palabras de perimetroCargado() se equivoca (leyendo la
// cabecera del data file y la nota de la fuente):
//   fckobenhavn-dk 2024: la nota dice "distinta de la holding consolidada PARKEN (no cargada)": se cargó la
//     entidad de fútbol sola, que NO consolida ("der ikke udarbejdet koncernregnskab") -> individual.
//   osijek-hr 2025: se cargó el informe COMBINADO (NK Osijek s.d.d. + FM 20 d.o.o. + la escuela) -> grupo.
const VERDAD_MANUAL = { 'fckobenhavn-dk|2024': { perimetro: 'individual' }, 'osijek-hr|2025': { perimetro: 'consolidado' } };
// la nota interna de la fuente vive en la evidencia del club, "## Fuentes" / "### <sourceId>"; `src.note` solo si quedara alguna vieja
const notaFuente = (src) => `${src.title || ''} ${src.label || ''} ${src.note || (src.clubId && src.id ? EV.textoDeFuente(EV.leer(src.clubId), src.id) : '')}`;
// Lo cargado en el sitio para ese club-año, en el mismo formato que las respuestas de Claude.
function verdadCargada(club, meta, y, nota) {
  const [mm] = String(club.fiscalYearStart || '07-01').split('-').map(Number);
  const mesCierre = mm === 1 ? 12 : mm - 1; // convención del sitio: el año del ejercicio es el de CIERRE
  return {
    perimetro: perimetroCargado(nota), reportType: meta.reportType,
    cierre: `${y}-${pad2(mesCierre)}-${pad2(ultimoDia(y, mesCierre))}`,
    moneda: meta.currency || club.reportingCurrency, name: club.name,
  };
}
// Nombre: sin mayúsculas, acentos, espacios ni puntuación ("Cruzados SADP" = "Cruzados S.A.D.P."), y vale
// que uno contenga al otro ("Club Atlético Vélez Sarsfield Asociación Civil" contiene al del sitio).
// Perímetro: "individual?" (la fuente no dice nada: club de una sola entidad) cuenta como individual; "?" no cuenta.
function aciertoBacktest(tipo, valor, v) {
  if (tipo === 'name') { const a = norm(valor).replace(/[^a-z0-9]+/g, ''); const b = norm(v).replace(/[^a-z0-9]+/g, ''); return !!a && (a === b || a.includes(b) || b.includes(a)); }
  if (tipo === 'perimetro') return v === '?' ? null : valor === v.replace('?', '');
  return valor === v;
}

// Recalcula el acierto de todo Admin/mediciones/backtests/altas-claude/backtest.jsonl con la verdad ACTUAL (gratis, sin API):
// así un arreglo de la heurística de la verdad no obliga a volver a pagar las llamadas.
function modoInformeBacktest() {
  const datos = cargarDatosSitio();
  const p = resolve(ROOT, 'Admin/mediciones/backtests/altas-claude/backtest.jsonl');
  const filas = readFileSync(p, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const vistos = new Map(); for (const f of filas) vistos.set(`${f.md}|${f.modelo}`, f); // la última corrida de cada documento
  const por = {}; let citas = 0; let citasOk = 0; let costo = 0; const malas = [];
  for (const f of vistos.values()) {
    costo += f.costUsd || 0;
    const club = datos.clubs[f.clubId]; const meta = datos.generic[f.clubId].fiscalYearMeta[f.anio];
    const v = { ...verdadCargada(club, meta, f.anio, notaFuente((datos.sources || {})[meta.sourceId] || {})), ...(VERDAD_MANUAL[`${f.clubId}|${f.anio}`] || {}) };
    for (const x of f.filas) {
      const a = aciertoBacktest(x.tipo, x.valor, v[x.tipo]);
      const t = (por[x.tipo] ??= { n: 0, resueltas: 0, resueltasBien: 0, resueltasSinVerdad: 0, abiertas: 0, abiertasBien: 0 });
      t.n++;
      if (x.resuelta) { t.resueltas++; if (a === true) t.resueltasBien++; else if (a === null) t.resueltasSinVerdad++; else malas.push(`${f.clubId} ${f.anio} ${x.tipo}: claude=${JSON.stringify(x.valor)} cargado=${JSON.stringify(v[x.tipo])}`); }
      else { t.abiertas++; if (a) t.abiertasBien++; }
      for (const c of x.citas || []) { citas++; if (c.ok) citasOk++; }
    }
  }
  console.log(`Backtest: ${vistos.size} club-años, US$ ${costo.toFixed(3)} (US$ ${(costo / vistos.size).toFixed(4)} por club-año). Citas verificadas: ${citasOk}/${citas}.`);
  let R = 0; let RB = 0; let N = 0;
  for (const [k, t] of Object.entries(por)) {
    R += t.resueltas; RB += t.resueltasBien; N += t.n;
    console.log(`  ${k.padEnd(11)} resueltas ${t.resueltas}/${t.n}; de esas bien ${t.resueltasBien}/${t.resueltas - t.resueltasSinVerdad}${t.resueltasSinVerdad ? ` (+${t.resueltasSinVerdad} sin verdad)` : ''}; abiertas ${t.abiertas} (${t.abiertasBien} habrían estado bien)`);
  }
  console.log(`  TOTAL      resueltas ${R}/${N}; bien ${RB}`);
  if (malas.length) { console.log('Resueltas que NO coinciden con lo cargado (revisar a mano: puede estar mal Claude o la vara):'); for (const m of malas) console.log('  ' + m); }
}

async function modoBacktest() {
  const datos = cargarDatosSitio();
  const est = estadoTranscripciones();
  const { clubDeRuta } = await import('./carpetas-clubes.mjs');
  const cand = [];
  for (const [md, estado] of est) {
    if (estado !== 'cargado') continue;
    const abs = resolve(ROOT, md); if (!existsSync(abs)) continue;
    const cr = clubDeRuta(md); if (!cr.clubId) continue;
    const club = datos.clubs[cr.clubId]; const g = datos.generic[cr.clubId]; if (!club || !g) continue;
    const y = anioDelNombre(basename(md)); const meta = y && g.fiscalYearMeta && g.fiscalYearMeta[y]; if (!meta || !meta.reportType) continue;
    const tam = statSync(abs).size; if (tam < 8000 || tam > 600000) continue;
    const txt = readFileSync(abs, 'utf8'); if (paginasDe(txt).length < 3) continue;
    const src = (datos.sources || {})[meta.sourceId] || {};
    // Qué documentos cita la fuente de ese año: el .md tiene que ser ESE (no otro documento del mismo año).
    const citaDoc = JSON.stringify(src).includes(basename(md, '.md')) || JSON.stringify(src).includes(basename(md).replace(/\.md$/, '.pdf'));
    cand.push({ md, clubId: cr.clubId, country: club.country, y, meta, club, nota: notaFuente(src), citaDoc, tam });
  }
  // Uno por país (el de sourceId que cita el documento, si hay), orden estable por sha1 para no elegir a mano.
  const porPais = new Map();
  for (const c of cand.sort((a, b) => (b.citaDoc - a.citaDoc) || sha1(a.md).localeCompare(sha1(b.md)))) if (!porPais.has(c.country)) porPais.set(c.country, c);
  const saltear = Number(flagVal('--saltear') || 0);
  const sel = [...porPais.values()].sort((a, b) => sha1(a.md).localeCompare(sha1(b.md))).slice(saltear, saltear + (LIMITE ?? 5));
  const outDir = resolve(ROOT, 'Admin/mediciones/backtests/altas-claude'); mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'backtest.jsonl');
  let costo = 0;
  for (const c of sel) {
    if (costo >= TOPE_USD) { console.error(`Tope de gasto alcanzado (US$ ${TOPE_USD}).`); break; }
    const verdad = verdadCargada(c.club, c.meta, c.y, c.nota);
    const pregs = [
      { id: 'perimetro', tipo: 'perimetro', texto: '¿Qué estados carga el sitio como "el club": los individuales o los consolidados?' },
      { id: 'reportType', tipo: 'reportType', texto: '¿Qué tipo de documento es?' },
      { id: 'cierre', tipo: 'cierre', texto: '¿Cuál es la fecha de cierre del ejercicio que presenta el documento?' },
      { id: 'moneda', tipo: 'moneda', texto: '¿En qué moneda están expresados los importes?' },
      { id: 'name', tipo: 'name', texto: '¿Cuál es el nombre legal completo de la entidad que emite los estados?' },
    ];
    const res = await preguntarAClaude({ md: readFileSync(resolve(ROOT, c.md), 'utf8'), preguntas: pregs, modelo: MODELO, tarea: 'alta-club-backtest', ctx: { carpeta: dirname(c.md).replace(/^Clubes\//, ''), documento: basename(c.md), pais: c.country } });
    costo += res.costUsd || 0;
    const filas = res.respuestas.map((x) => {
      const v = verdad[x.tipo];
      const acierto = aciertoBacktest(x.tipo, x.valor, v);
      return { tipo: x.tipo, valor: x.valor, verdad: v, acierto, resuelta: x.resuelta, confianza: x.confianza, motivoNoResuelta: x.motivoNoResuelta, citas: x.citas.map((q) => ({ pagina: q.pagina, ok: q.ok, motivo: q.motivo, texto: q.texto.slice(0, 160) })) };
    });
    appendFileSync(outPath, JSON.stringify({ ts: new Date().toISOString(), md: c.md, clubId: c.clubId, anio: c.y, modelo: res.model || MODELO, costUsd: res.costUsd, paginasEnviadas: res.paginasEnviadas, entero: res.entero, error: res.error, filas }) + '\n');
    console.log(`${c.clubId} ${c.y} (${c.md}) $${(res.costUsd || 0).toFixed(4)}${res.error ? ' ERROR ' + res.error : ''}`);
    for (const f of filas) console.log(`   ${f.tipo.padEnd(10)} ${f.resuelta ? 'RESUELTA ' : 'abierta  '} ${f.acierto === null ? '  ?' : f.acierto ? ' ok' : 'MAL'}  claude=${JSON.stringify(f.valor)} cargado=${JSON.stringify(f.verdad)}${f.resuelta ? '' : '  (' + f.motivoNoResuelta + ')'}`);
  }
  console.log(`\nCosto de esta corrida: US$ ${costo.toFixed(3)}. Detalle en Admin/mediciones/backtests/altas-claude/backtest.jsonl (se agrega, no se pisa).`);
}

// ============================================================================
// --deshacer <clubId> [--escribir] — deshace un alta ESCRITA y no commiteada. Una carga a mano que fallaba (cargar.mjs se revertía solo, el alta no) dejaba
// el alta en el árbol y había que revertirla a mano con git checkout y borrando los archivos nuevos, tres veces. Sin --escribir es un ENSAYO que dice qué haría.
//   - SOLO si el alta no está commiteada (el id no está en data/clubs.js de HEAD): lo commiteado se revierte con git.
//   - Lo que escribió el alta Y SE EDITA A MANO se deshace por líneas, sin pisar el resto del archivo: la entrada del club en data/clubs.js y sus líneas en data/club-leagues/*.js.
//   - Lo propio del club (data/<país>/<id>*, fuentes/<id>.html, la evidencia Admin/carga-clubes/<id>.md, sus páginas club/ y og/) se borra si no está commiteado.
//   - Lo puramente GENERADO (fuentes.html, y index.html solo si su diff son líneas de ASSET_V, sitemap.xml, club/, liga/, og/, rankings, club-index, ESTADO-clubes...) vuelve a HEAD con git checkout: se regenera.
//   - Cualquier OTRO archivo modificado (data/leagues.js, data/currency-map.js, idiomas, un país nuevo...) NO se toca y se lista como «revisar a mano»: puede traer ediciones a mano.
// ============================================================================
function deshacerAlta(clubId, { escribir }) {
  const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
  const clubsPath = resolve(ROOT, 'data/clubs.js'); const clubsTxt = readFileSync(clubsPath, 'utf8');
  const lineaClub = new RegExp(`^\\s*['"]?${clubId}['"]?\\s*:\\s*\\{[^\\n]*\\},?[ \\t]*\\n`, 'm');
  if (!lineaClub.test(clubsTxt)) { console.error(`${clubId}: no está en data/clubs.js`); process.exit(1); }
  let enHead = ''; try { enHead = git(['show', 'HEAD:data/clubs.js']); } catch { /* sin HEAD */ }
  if (new RegExp(`['"]?${clubId}['"]?\\s*:\\s*\\{\\s*id:`).test(enHead)) { console.error(`${clubId} ya está commiteado en data/clubs.js: se revierte con git, no con --deshacer`); process.exit(1); }
  const acciones = []; const aMano = [];
  acciones.push({ txt: 'quitar su entrada de data/clubs.js', f: () => writeFileSync(clubsPath, clubsTxt.replace(lineaClub, '')) });
  // sus líneas en data/club-leagues/*.js
  for (const f of readdirSync(resolve(ROOT, 'data/club-leagues')).filter((x) => x.endsWith('.js'))) {
    const abs = resolve(ROOT, 'data/club-leagues', f); const t = readFileSync(abs, 'utf8'); const re = new RegExp(`^\\s*['"]?${clubId}['"]?\\s*:\\s*\\{[^\\n]*\\},?[ \\t]*\\n`, 'gm');
    if (re.test(t)) acciones.push({ txt: `quitar sus líneas de data/club-leagues/${f}`, f: () => writeFileSync(abs, t.replace(new RegExp(re.source, 'gm'), '')) });
  }
  // el estado del árbol en el sitio y lo generado
  const porc = git(['status', '--porcelain', '-uall', '--', 'data', 'index.html', 'fuentes', 'club', 'liga', 'og', 'fuentes.html', 'sitemap.xml', 'Admin/carga-clubes', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', 'Admin/sourcing']).split('\n').filter(Boolean).map((l) => ({ est: l.slice(0, 2), f: l.slice(3).replace(/^"|"$/g, '') }));
  const GENERADO = (f) => ['fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', 'data/club-index.js', 'data/sponsors.js', 'Admin/sourcing/pendientes.md'].includes(f)
    || /^(club|liga|og)\//.test(f) || /^fuentes\//.test(f) || /^data\/(rankings|faltantes|estimados|entidades)\//.test(f);
  const propio = (f) => f.includes(`/${clubId}.`) || f.includes(`/${clubId}-`) || f.includes(`/${clubId}/`) || f.endsWith(`/${clubId}`);
  const borrar = []; const restaurar = [];
  for (const { est, f } of porc) {
    if (f === 'data/clubs.js' || /^data\/club-leagues\//.test(f)) continue; // ya van por líneas
    if (f === 'Admin/registros/altas-club.jsonl') continue; // el registro de altas lo recalcula alta-club --todos --solo (se dice abajo)
    if (est === '??' && propio(f)) { borrar.push(f); continue; }
    if (est === '??' && GENERADO(f)) { borrar.push(f); continue; } // una página nueva generada (de otro club también: se regenera)
    // index.html NO es solo generado: lleva el código de la pantalla, que se edita a mano. Vuelve a HEAD solo si su diff son únicamente líneas de ASSET_V (la constante y los ?v=).
    if (f === 'index.html') {
      const lineas = git(['diff', '-U0', '--', 'index.html']).split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
      if (lineas.every((l) => /ASSET_V|\?v=/.test(l))) restaurar.push(f); else aMano.push('M index.html (trae más que ASSET_V: ediciones de pantalla; restaurá a mano solo las líneas de ASSET_V)');
      continue;
    }
    if (est !== '??' && GENERADO(f)) { restaurar.push(f); continue; }
    if (est !== '??' && propio(f)) { restaurar.push(f); continue; }
    aMano.push(`${est.trim() || '??'} ${f}`);
  }
  if (borrar.length) acciones.push({ txt: `borrar ${borrar.length} archivo(s) nuevos (del club o generados)`, f: () => { for (const f of borrar) { try { unlinkSync(resolve(ROOT, f)); } catch { /* ya no está */ } } } });
  if (restaurar.length) acciones.push({ txt: `volver a HEAD ${restaurar.length} archivo(s) generados o del club`, f: () => git(['checkout', '-q', '--', ...restaurar]) });
  console.log(`${escribir ? 'DESHACER' : 'ENSAYO de deshacer'} el alta de ${clubId}:`);
  for (const a of acciones) console.log(`  - ${a.txt}`);
  if (borrar.length) console.log(`    nuevos: ${borrar.slice(0, 12).join(', ')}${borrar.length > 12 ? `, … (+${borrar.length - 12})` : ''}`);
  if (restaurar.length) console.log(`    a HEAD: ${restaurar.slice(0, 12).join(', ')}${restaurar.length > 12 ? `, … (+${restaurar.length - 12})` : ''}`);
  if (aMano.length) console.log(`  REVISAR A MANO (no se tocan; pueden traer ediciones a mano): ${aMano.join(' | ')}`);
  console.log('  Después: node tools/alta-club.mjs --todos --solo "<país>/<club>" recalcula su línea del registro de altas (Admin/registros/altas-club.jsonl).');
  if (!escribir) { console.log('  Agregá --escribir para hacerlo.'); return; }
  for (const a of acciones) a.f();
  console.log('Hecho.' + (aMano.length ? ' Quedan los archivos de «revisar a mano».' : ''));
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

#!/usr/bin/env node
// ============================================================================
// tools/cargar.mjs: ETAPA 8 del pipeline (ver Admin/PIPELINE.md): cargar en el sitio el ejercicio de UN documento ya categorizado.
//
//     node tools/cargar.mjs "Clubes/Países Bajos/PSV/PSV-Jaarverslag-2019-2020.pdf"            # propuesta (default): no escribe el sitio
//     node tools/cargar.mjs "<pdf>" --escribir                                                  # escribe, audita y revierte si algo falla
//
// POR QUÉ EXISTE (pedido de Guido): el pipeline (tools/pipeline.mjs) llevaba un PDF hasta la
// categorización de sus rubros (etapa 5, `<md>.categorias.json`) y ahí se cortaba: el ejercicio lo cargaba a mano una sesión de Claude. Esta
// herramienta es el paso que faltaba, SOLO para el caso fácil que decidió Guido: un AÑO NUEVO de un club que YA existe en el sitio (el alta de
// clubes nuevos es tools/alta-club.mjs y este script no la encadena: si el club no existe, frena). Quien sí encadena el alta y hace un commit
// por año es tools/cargar-lote.mjs (lo que corre `lote.mjs --cargar`), que llama a este script para cada documento. Todo lo que requiera criterio se FRENA con el motivo escrito; no se
// inventa nada. Sin tokens de sesión y sin ninguna API: lee lo que dejaron las etapas anteriores y archivos locales.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «cargar.mjs».
//
// ----------------------------------------------------------------------------
// USO
// ----------------------------------------------------------------------------
//   node tools/cargar.mjs "<pdf>"                         propuesta en JSON (qué escribiría y por qué frena)
//        OJO: la propuesta no toca el sitio (data/*.js), pero SÍ escribe, a propósito: en Admin/registros/cola-revision.jsonl (las preguntas de
//        categoría para Guido, y cierra las ya contestadas para otro año del club), en Admin/registros/categorias-aprendidas.jsonl (copia como
//        precedente del club las respuestas que Guido ya dio en la cola). Así le hace preguntas el
//        lote a Guido (lote.mjs, etapa 8). Un ensayo de una sesión deja esos cambios en git status: revisarlos antes de commitear.
//   node tools/cargar.mjs "<pdf>" --escribir              escribe si no frena; revierte si audit.js da P0/P1
//   node tools/cargar.mjs --lista Admin/mi-lista.txt      una línea por documento (carga / frena y por qué)
//   node tools/cargar.mjs --lista <x> --salida <x.jsonl>  además deja la propuesta completa de cada uno
//   node tools/cargar.mjs --lista <x> --comparar <raíz de otro checkout>
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync, appendFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import { punteroReglasPais } from './docs-reglas.mjs';
import vm from 'node:vm';
import { archivosData } from './data-clubes.js';
import {  } from './club-json.mjs'; // el JSON es la fuente de cada club
import { validacionAlDia } from './cache-al-dia.mjs';
import { compuertaContexto, escribir, comparar, cambiadosEnGit, lineaGitAdd } from './cargar-escribir.mjs';
import { faseTotales, faseIxbrl, faseFxYLiga, faseEjercicio } from './cargar-ejercicio.mjs';
import { faseCeros, faseSinCategoria, faseSignos } from './cargar-ceros.mjs';
import { faseCategorias } from './cargar-categorias.mjs';
import { faseRegistro, faseClubYAnio, faseFilas } from './cargar-inicio.mjs';
import { exigirMedida } from './exigir-medida.mjs';
export { publicarCambios, compuertaContexto, escribir, snapshot, revertir, runNode } from './cargar-escribir.mjs';

// Los módulos que se reusan leen process.argv al importarse (alta-club.mjs: --escribir activa ANOTAR_MISSES y --anio fuerza el año;
// proponer-carga.mjs: --tabla, --limit, --club...). Las opciones de ESTE comando no son las de ellos: se les pasa un argv limpio.
const ARGS = process.argv.slice(2);
process.argv = process.argv.slice(0, 2);
export const { analizar } = await import('./alta-club.mjs');
export const { categoriasAlDia, huellaVerificar } = await import('./huellas.mjs');
export const { precedenteFamilia } = await import('./categorizar-claude.mjs');
export const { clubDeRuta } = await import('./carpetas-clubes.mjs');
export const { derivado } = await import('./rutas.mjs');
export const { marcarClub } = await import('./dentro-de-otro.mjs'); // "Posiblemente dentro de otro rubro", ver escribir()
const EV = await import('./evidencia-club.mjs'); // la evidencia de carga va a Admin/carga-clubes/<clubId>.md, no a data/
export const { agregarCaso, casoYRespuesta, respuestaPorDetalle, cerrarResueltoPorClub, respuestasDonde, cerrarPerfilSabido, pendientes } = await import('./cola.mjs');
const agregarCasoCola = agregarCaso; // proponer() usa su propio agregarCaso (puede no escribir)
export const { guardarPerfil, perfilVigente, perfilCercano, anioDeDoc, VENTANA_PERFIL } = await import('./perfil-clubes.mjs');
export const { ajusteDe, ajustesDe, ajustePerimetroDe, ceroRealDelClub } = await import('./ajustes.mjs');
export const { cierrePorVecinos } = await import('./cierre-vecinos.mjs');
export const { esLineaJunta } = await import('./partir-amortizacion.mjs');
export const { datosCategoria } = await import('./datos-cola.mjs');
export const { VERSION_AMPLIADO } = await import('./indice-bloques.mjs');
export const { ARCHIVO: ARCHIVO_APRENDIDAS, padreDe } = await import('./memoria-categorias.mjs');
export const { padreEnClub, padreEnDoc, mismoPadre, contextoFila, sinMarca } = await import('./padres-filas.mjs'); // en qué nota está cada fila
// Nombres en castellano de las categorías (los de data/category-map.js), para que la pregunta de la cola diga "Administración y gastos
// generales" y no "admin_general_expense".
export const NOMBRE_CAT = (() => { try { const t = readFileSync(resolve(import.meta.dirname, '..', 'data', 'category-map.js'), 'utf8'); const o = {}; for (const b of t.match(/_CATEGORY_LABELS = \{[\s\S]*?\n\};/g) || []) for (const m of b.matchAll(/^\s*(\w+): '([^']+)'/gm)) o[m[1]] = m[2]; return o; } catch { return {}; } })();
export const { periodoDe, xhtmlHermano } = await import('./periodo.mjs');
export const { categoriasDeDeporte, cerosDeDeporte, bolsonDeDeporte } = await import('./deporte-club.mjs'); // las categorías de un deporte
export const { normalizar, claveFamilia, TOTAL_RE, TOTAL_INGRESOS_RE, RESULTADO_EJERCICIO_RE, IMPUESTOS_RE, GASTOS_RE, FINANCIERO_RE, IMPUESTO_GANANCIAS_RE, IMPUESTO_SOLO_RE } = await import('./vocabulario.mjs');

const ROOT = resolve(import.meta.dirname, '..');
const flagVal = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
export const ESCRIBIR = ARGS.includes('--escribir');
exigirMedida('cargar.mjs', { si: ESCRIBIR, argv: ARGS }); // no se escriben datos reales con una tool del pipeline cambiada y sin medir (tools/exigir-medida.mjs)
// --reemplazar: rehace con el script un ejercicio YA cargado (UC 2022-2024, cargados a mano:
// "Servicios de Seguridad" dentro de gastos de administración). "Ya cargado", "la fuente ya existe" y "sin .categorias.json" (Jev y Claude
// nunca corrieron sobre años cargados a mano) pasan de frenar a aviso; todo lo demás frena igual (en particular, una fila sin categoría). Al
// escribir, borra los bloques del año y escribe los nuevos, y CONSERVA lo que el script no genera: grossDebt/cash/staffCost (si el script no los trae),
// gestionId, la fuente existente y los `items` de una línea (nombres de jugadores vendidos) por etiqueta.
export const REEMPLAZAR = ARGS.includes('--reemplazar');
const LISTA = flagVal('--lista');
const SALIDA = flagVal('--salida');
const COMPARAR = flagVal('--comparar');
const JSON_OUT = ARGS.includes('--json');
export const MAX_SIN_CAT = flagVal('--max-sin-categoria') !== null ? Number(flagVal('--max-sin-categoria')) : 0.05;
export const UMBRAL_CLAUDE = flagVal('--umbral-claude') !== null ? Number(flagVal('--umbral-claude')) : 0.8;
// LAS FILAS SALEN DE LA VERIFICACIÓN: Generados/.../<doc>.verificacion.json (localizar -> validar -> extraer -> verificar), y
// solo si quedó en estado 'ok' (sin casos pendientes en la cola humana). Había otro camino, sin --desde-verificacion: la
// selección de filas por palabras de proponer-carga.mjs (seleccionarFilas + briefingFor, que corría prepare-onboarding.mjs). Ningún proceso
// lo usaba (el lote y cargar-lote siempre pasan el flag) y se sacó con el ok de Guido; proponer-carga.mjs está en tools/archivo/.
// El flag se sigue aceptando y no cambia nada.
const CON_VALOR = new Set(['--lista', '--salida', '--comparar', '--max-sin-categoria', '--umbral-claude']);
const DOCS = ARGS.filter((a, i) => !a.startsWith('--') && !CON_VALOR.has(ARGS[i - 1]));
const TOL = 0.01; // la de audit.js checkTieOuts(): |calculado - oficial| >= 0,01 es P0 `no-cierra`
export const HOY = new Date().toISOString().slice(0, 10);
export const norm = normalizar;
export const r6 = (x) => (x === null || x === undefined ? x : Number(Number(x).toFixed(6)));

// ============================================================================
// DATOS DEL SITIO (mismo método de `vm` que audit.js / alta-club.mjs: se ejecutan los archivos reales, nunca se parsean a mano)
// ============================================================================
export function cargarSitio(root = ROOT) {
  const sandbox = { console: { log() {}, warn() {}, error() {} } }; sandbox.window = sandbox; sandbox.globalThis = sandbox;
  sandbox.document = { createElement() { return {}; }, head: { appendChild() {} } };
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', 'data/leagues.js', 'data/club-leagues.js',
    ...readdirSync(resolve(root, 'data/club-leagues')).filter((f) => f.endsWith('.js')).sort().map((f) => 'data/club-leagues/' + f),
    ...archivosData(),
    // quién condujo cada club: data/gestiones/<país>.js
    ...(existsSync(resolve(root, 'data/gestiones')) ? readdirSync(resolve(root, 'data/gestiones')).filter((f) => f.endsWith('.js')).sort().map((f) => 'data/gestiones/' + f) : [])];
  for (const f of files) vm.runInContext(readFileSync(resolve(root, f), 'utf8'), ctx, { filename: f });
  return vm.runInContext('({ clubs, sources, CURRENCY_META, FX_CLOSE, FX_PLAUSIBLE_RANGE, COUNTRIES, LEAGUES, CLUB_LEAGUE_BY_YEAR: window.CLUB_LEAGUE_BY_YEAR, generic: window.CLUB_GENERIC_DATA || {}, gestiones: window.CLUB_GESTIONES || {} })', ctx);
}
// el lado de una categoría sale de la taxonomía del deporte del club (ladoDeCat, dentro de proponer), no de una lista global de fútbol

function leerRegistro(root = ROOT) {
  const p = resolve(root, 'Admin', 'registros', 'transcripciones-estado.jsonl');
  return existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
}
export function quien(pdf) {
  try { return JSON.parse(execFileSync('node', [resolve(ROOT, 'tools/quien.mjs'), '--quien', pdf], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); } catch { return {}; }
}

// ============================================================================
// VOCABULARIO PROPIO DE ESTA ETAPA (candidato a mudarse a tools/vocabulario.mjs si otra tool lo necesita)
// ============================================================================
// Resultado financiero (FINANCIERO_RE) e impuesto a las ganancias (IMPUESTO_GANANCIAS_RE, IMPUESTO_SOLO_RE): viven en tools/vocabulario.mjs desde la
// porque la selección de filas de proponer-carga.mjs también los usa (no abre esos renglones en una nota).
// Resultado ANTES de impuestos y operativo (solo para mostrar en la propuesta y ayudar a quien revise).
const ANTES_IMPUESTOS_RE = /(before tax|before taxation|vor steuern|antes de(l)? impuesto|antes do imposto|antes dos impostos|antes de impuestos|for skat|foer skat|fore skatt|voor belasting|ante imposte|avant impot|до налогообложения|prije oporezivanja|pred zdanenim|vergi oncesi)/;
const PERDIDA_RE = /(loss|verlust|fehlbetrag|perdida|prejuizo|deficit|underskud|tap\b|verlies|perdita|gubitak|ztrata|убыток|збиток|zarar)/;

// ============================================================================
// PERÍMETRO HEREDADO: para un club que YA existe, la pregunta "¿individual o consolidado?" ya la contestó quien cargó sus otros años. Si todos
// sus años cargados dicen lo mismo (heurística de palabras sobre la nota de la fuente y la cabecera del data file, la misma idea que
// perimetroCargado() de alta-club.mjs) y el documento nuevo tiene ese perímetro, se hereda con aviso. Si no, frena.
// ============================================================================
function perimetroDeTexto(t) {
  t = norm(t || '');
  const cons = /consolidad|consolidated|koncern|konzern|konsern|group accounts|\bgrupo\b|\bgroup\b/.test(t);
  const neg = /no (del|el) (koncern|consolidado|grupo)|not consolidated|no consolida/.test(t);
  const ind = /individual|moderselskab|morselskap|separate|company only|einzelabschluss|enkelvoudig/.test(t);
  if (neg) return 'individual';
  if (cons && !ind) return 'consolidado';
  if (ind && !cons) return 'individual';
  return cons && ind ? '?' : 'individual?';
}
export function perimetroHeredado(sitio, clubId) {
  const cd = sitio.generic[clubId] || {};
  // la cabecera del club (antes, el comentario del principio del data file) y la nota de cada fuente viven en su evidencia
  const header = EV.cabeceraDe(clubId).slice(0, 6000);
  const porAnio = {};
  for (const [y, m] of Object.entries(cd.fiscalYearMeta || {})) { const s = sitio.sources[m.sourceId] || {}; porAnio[y] = perimetroDeTexto(`${s.title || ''} ${s.note || (s.id ? EV.textoDeFuente(EV.leer(clubId), s.id) : '')}`); }
  const vals = new Set(Object.values(porAnio).map((v) => v.replace('?', '')));
  const cab = perimetroDeTexto(header);
  return { porAnio, cabecera: cab, unico: vals.size === 1 ? [...vals][0] : null };
}
// El perímetro del año YA CARGADO más cercano a `year` (a igual distancia, el posterior: es el formato vigente). Diseño aprobado
// por Guido: un club puede cambiar de perímetro (UC: individual hasta 2021, consolidado desde 2022), así que se hereda del vecino, no de
// "todos los años iguales" (con 2021 individual cargado, UC 2025 frenaba aunque 2022-2024 eran consolidados).
export function perimetroCercano(her, year) {
  const ys = Object.keys(her.porAnio).map(Number).filter((y) => y !== Number(year));
  if (!ys.length || !year) return null;
  ys.sort((a, b) => Math.abs(a - year) - Math.abs(b - year) || b - a);
  return { anio: ys[0], perimetro: String(her.porAnio[ys[0]]).replace('?', '') };
}

// ============================================================================
// LA PROPUESTA
// ============================================================================
// ESCALERA DE "NO ES RUBRO": una fila VERIFICADA con lado que la IA (escalón 2) marcó "no es
// rubro" se EXCLUYE primero (escalón 0, como siempre); si la carga no cierra (tie-out), se prueba INCLUIRLA (escalón 1: va a la cola para su
// categoría) y gana solo si con ella la carga cierra. La compuerta es la de siempre (el tie-out). Caso: Fortaleza 2017 (notas como estado),
// Claude dio "no es rubro" con 0,85 a "Total Ingresos actividades ordinarias" 5.319,891 (pág. 14, L543): sin ella los ingresos sumaban 0,006.
const frenaTieOut = (P) => (P.frena || []).some((f) => String(f.etapa).startsWith('tie-out'));
const noRubroVerificadas = (P) => (P.filas || []).filter((f) => f.destino === 'excluida' && f.cat === 'no_es_rubro' && f.escalon === 2 && String(f.origen || '').startsWith('verificacion') && f.ladoDoc);
// RESPUESTA DE LA COLA DEL OTRO LADO. Una respuesta con una categoría del otro lado que la fila en el documento
// (Nacional 2024 "Correções relativas a períodos anteriores", ingreso 229.792 en L793, contestada exceptional_items, que es de gastos) iba al
// otro lado CAMBIANDO su efecto: un ingreso de 0,229792 quedaba como gasto de −0,229792 y el resultado no cerraba por el doble. Segunda
// pasada, solo si la primera no cierra el resultado: esas filas se mudan como el ajuste `categoria` (sin cambiar su efecto: el ingreso queda
// como gasto de +0,229792). COMPUERTA: con la mudanza, el resultado cierra contra el impreso exacto; si no, queda la primera pasada. Cuando la
// primera ya cierra, no se prueba: ahí el lado del documento era el equivocado y la respuesta lo corrige (Tondela 2020-21, Chaves 2022-23,
// Cuiabá 2024). Así sobran los ajustes `categoria` de Nacional 2024 y 2025, Académica 2023, Benfica 2006-07 y Sporting 2001-2006.
const respuestasDelOtroLado = (P) => (P.filas || []).filter((f) => f.ladoContradictorio && f.fuenteCat === 'respuesta de Guido en la cola');
const cierraResultado = (P) => !frenaTieOut(P) && P.totales?.verificacion?.pat === 'impreso';
export async function proponerConEscalera(pdfArg, opts = {}) {
  let P0 = await proponer(pdfArg, opts);
  if (frenaTieOut(P0) && respuestasDelOtroLado(P0).length) {
    const Pv = await proponer(pdfArg, { ...opts, voltearRespuestas: true, escribirCola: false });
    const nombres = respuestasDelOtroLado(P0).map((f) => `"${f.label}" (${f.cat})`).join(', ');
    if (cierraResultado(Pv)) { for (const c of Pv.casosPendientes || []) agregarCaso(c); Pv.avisos.push(`respuesta de la cola del otro lado: ${nombres} se mudan sin cambiar su efecto y el resultado cierra con el impreso (to-do 237 f)`); P0 = Pv; }
    else P0.avisos.push(`respuesta de la cola del otro lado probada sin cambiar el efecto (${nombres}): tampoco cierra el resultado; queda como estaba`);
  }
  if (!frenaTieOut(P0) || !noRubroVerificadas(P0).length) return P0;
  const P1 = await proponer(pdfArg, { ...opts, incluirNoRubro: true, escribirCola: false });
  const nombres = noRubroVerificadas(P0).map((f) => `"${f.label}"`).join(', ');
  if (frenaTieOut(P1)) { P0.avisos.push(`escalón 1 de "no es rubro" probado (incluir ${nombres}): tampoco cierra; queda excluida`); return P0; }
  for (const c of P1.casosPendientes || []) agregarCaso(c);
  P1.avisos.push(`escalón 1 de "no es rubro": excluir ${nombres} no cerraba; incluida, la carga cierra (su categoría va a la cola)`);
  return P1;
}
// POR QUÉ UN DOCUMENTO NO ESTÁ `listo-para-jev`. El texto viejo ("no está listo-para-jev (estado listo, jev -)")
// hablaba del proceso viejo y no decía la causa. En el proceso nuevo la marca la pone avisarRegistro() de verificar.mjs, y SOLO cuando corre
// dentro del lote, la etapa 6 cerró y la etapa 4 no dejó números sin confirmar en los bloques que se cargan. Acá se dice cuál de esas falta,
// con lo que ya está en disco (gratis). El conteo de la etapa 4 es de TODOS los bloques (avisarRegistro filtra por los que se cargan y por
// los ajustes `confirmado`): por eso dice "hasta".
export function porQueNoListo(e) {
  if (!e.md || !existsSync(resolve(ROOT, e.md))) return 'no hay .md (etapa 2 del pipeline)';
  const leer = (suf) => { const p = resolve(ROOT, derivado(e.md, suf, { crear: false })); try { return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null; } catch { return null; } };
  const V = leer('.verificacion.json');
  if (!V) return 'la etapa 6 (sumas, verificar.mjs) no corrió todavía sobre este .md: correr el lote';
  if (V.estado !== 'ok') return `la etapa 6 (sumas) no cerró: ${(V.cola || []).length} caso(s) en la cola humana (node tools/cola.mjs)`;
  const val = leer('.validacion.json');
  if (!val) return 'la etapa 6 cerró, pero no hay .validacion.json (etapa 4): correr el lote';
  // Misma condición que avisarRegistro(): una validación anterior al .md es de otra versión del .md (UC 2009: .md del 04/10, validación del 01/10).
  if (!validacionAlDia(e.md)) return 'la etapa 6 cerró, pero la etapa 4 (validar-bloques.mjs) es de una versión anterior del .md: correr el lote'; // misma compuerta que lote.mjs: huella del .md, o fecha si no la tiene
  const nc = (val.noConfirmados || []).length;
  if (nc) return `la etapa 6 cerró, pero la etapa 4 dejó hasta ${nc} número(s) sin confirmar (${derivado(e.md, '.validacion.json', { crear: false })}, "noConfirmados"; ver to-do 160)`;
  // el lote ya corrió y puso la marca, pero es «sin-rubros» (verificar.mjs, avisarRegistro): menos de 5 rubros y las sumas no cerraron contra el resultado impreso. Correr el lote no la cambia.
  if (e.jev === 'sin-rubros') return `la etapa 6 cerró y la etapa 4 no deja números sin confirmar, pero el registro lo marca «sin-rubros»: ${e.rubros ?? '?'} rubro(s) leídos (menos de 5) y las sumas no cerraron contra el resultado impreso. Correr el lote de nuevo no lo cambia: revisar las filas del estado de resultados (.filas.json) o la extracción`;
  return 'la etapa 6 cerró y la etapa 4 no deja números sin confirmar, pero el registro no se actualizó: correr el lote (la marca solo la pone el lote, ver to-do 160)';
}
export async function proponer(pdfArg, { sitio, registro, incluirNoRubro = false, escribirCola = true, voltearRespuestas = false } = {}) {
  // escribirCola false: el intento del escalón 1 no escribe casos en la cola; los deja en P.casosPendientes (se escriben si gana).
  const casosPendientes = [];
  const agregarCaso = (c) => (escribirCola ? agregarCasoCola(c) : casosPendientes.push(c));
  sitio ??= cargarSitio(); registro ??= leerRegistro();
  const pdf = relative(ROOT, resolve(ROOT, pdfArg));
  const P = { pdf, generado: new Date().toISOString(), frena: [], avisos: [], ejercicio: null };
  const frena = (etapa, motivo) => P.frena.push({ etapa, motivo });
  // FRENO QUE CORTA EL ANÁLISIS: los frenos de abajo que no pueden seguir sin un dato (sin club, sin .md, sin
  // verificación...) devuelven la propuesta ahí mismo, y lo que viene después (categorías, socios, gestión, tie-out) NO se calculó. Sin esta
  // marca el lote mostraba "es un alta" como si fuera lo único que faltaba: en el lote 15 se dieron las 5 altas y recién ahí aparecieron 64
  // preguntas de categoría, socios y gestión. `cortadoEn` es la etapa del freno que cortó; el RESULTADO de lote.mjs avisa con eso.
  const corta = (etapa, motivo) => { frena(etapa, motivo); P.cortadoEn = etapa; return P; };

  const ctx = { P, frena, corta, agregarCaso, casosPendientes, sitio, registro, pdf, incluirNoRubro, voltearRespuestas };
  // ---- 1. registro
  { const s = faseRegistro(ctx); if (s === P) return P; Object.assign(ctx, s); }

  // ---- 2. club y año
  { const s = faseClubYAnio(ctx); if (s === P) return P; Object.assign(ctx, s); }

  // ---- 3. filas y montos
  { const s = faseFilas(ctx); if (s === P) return P; Object.assign(ctx, s); }

  // ---- 4. categoría de cada fila
  { const s = faseCategorias(ctx); if (s === P) return P; Object.assign(ctx, s); }

  { const s = faseCeros(ctx); if (s === P) return P; Object.assign(ctx, s); }
  { const s = faseSinCategoria(ctx); if (s === P) return P; Object.assign(ctx, s); }

  // ---- 5. signos
  { const s = faseSignos(ctx); if (s === P) return P; Object.assign(ctx, s); }

  // ---- 6. totales y tie-out
  { const s = faseTotales(ctx); if (s === P) return P; Object.assign(ctx, s); }

  if (faseIxbrl(ctx) === P) return P;

  // ---- 7. fx, liga, sourceId
  { const s = faseFxYLiga(ctx); if (s === P) return P; Object.assign(ctx, s); }

  // ---- 8. fiscalYearMeta
  if (faseEjercicio(ctx) === P) return P;
  const { rev, exp, metaFilas, filas } = ctx;
  Object.defineProperty(P, 'casosPendientes', { value: casosPendientes, enumerable: false }); // no va al .carga.json
  P.resumen = { carga: P.frena.length === 0, motivos: P.frena.length, lineasIngreso: rev.length, lineasGasto: exp.length, metaFilas: metaFilas.length, excluidas: filas.filter((f) => f.destino === 'excluida').length };
  return P;
}

// ============================================================================

// ============================================================================
// CLI
// ============================================================================
async function main() {
  const docs = LISTA ? readFileSync(resolve(ROOT, LISTA), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : DOCS;
  if (!docs.length) { console.error('Uso: node tools/cargar.mjs "<pdf>" [--escribir]  |  --lista <archivo> [--salida x.jsonl] [--comparar <raíz>] (ver la cabecera)'); process.exit(1); }
  if (ESCRIBIR && docs.length > 1) { console.error('--escribir va de a un documento por vez.'); process.exit(1); }
  // CANDADO: con --escribir, un solo proceso a la vez escribiendo el registro y el sitio (tools/candado.mjs). La propuesta no lo
  // toma: el lote la corre como hija mientras tiene el candado.
  if (ESCRIBIR) { const { tomarCandado } = await import('./candado.mjs'); tomarCandado('cargar.mjs', { lista: docs[0], modo: '--escribir' }); }
  const antesDeEscribir = ESCRIBIR ? cambiadosEnGit() : null;
  const sitio = cargarSitio(); const registro = leerRegistro();
  const prod = COMPARAR ? cargarSitio(resolve(COMPARAR)) : null;
  const salidas = [];
  for (const d of docs) {
    let P;
    try { P = await proponerConEscalera(d, { sitio, registro }); } catch (err) { P = { pdf: d, frena: [{ etapa: 'error', motivo: err.stack?.split('\n').slice(0, 3).join(' | ') }], avisos: [] }; }
    if (prod) P.comparacion = comparar(P, prod);
    salidas.push(P);
    if (SALIDA) appendFileSync(resolve(ROOT, SALIDA), JSON.stringify(P) + '\n');
    // Con --lista (lo que usa lote.mjs) se imprime SIEMPRE el resumen, aunque la lista tenga un solo documento, y la propuesta completa va a
    // Generados/.../<doc>.carga.json. Antes un lote de un documento imprimía el JSON entero en la terminal (~400 líneas;
    // pedido de Guido: "solo el resumen"). El JSON completo en pantalla queda para un documento suelto sin --lista, o con --json.
    if (LISTA && P.md) { try { writeFileSync(resolve(ROOT, derivado(P.md, '.carga.json')), JSON.stringify(P, null, 1)); } catch { /* sin .md */ } }
    if ((docs.length > 1 || LISTA) && !JSON_OUT) {
      const c = P.comparacion;
      console.log(`${P.frena.length ? 'FRENA ' : 'CARGA '} ${P.clubId || '?'} ${P.year || '?'}  <- ${d}`);
      for (const f of P.frena) console.log(`         [${f.etapa}] ${String(f.motivo).slice(0, 260)}`);
      for (const a of P.avisos || []) console.log(`         aviso: ${String(a).slice(0, 260)}`);
      if (LISTA && P.md) console.log(`         detalle: ${derivado(P.md, '.carga.json', { crear: false })}`);
      if (c && !c.sinProduccion) console.log(`         vs producción: ingresos ${c.prop.revenue} / ${c.prod.revenue}; gastos ${c.prop.expenses} / ${c.prod.expenses}; PAT ${c.prop.officialPAT} / ${c.prod.officialPAT}; dinero bien ubicado ${c.dineroIngresosBien} / ${c.dineroGastosBien}; fx ${c.fxIgual}; liga ${c.ligaIgual}`);
    }
  }
  // ÚLTIMA CORRIDA EN LISTA (pedido de Guido: ver en el tablero por qué frena la etapa 6, por grupo de países): un resumen por
  // documento en Admin/registros/cargar-ultimo.jsonl (se PISA en cada corrida con --lista; no con un documento suelto ni con --comparar, que es un
  // backtest en otro checkout). Lo lee tools/estado.mjs. La propuesta completa sigue yendo a --salida si se la pide.
  if (LISTA && !COMPARAR) {
    const resumen = salidas.map((P) => ({ pdf: P.pdf, clubId: P.clubId || null, year: P.year || null, carga: !P.frena.length, motivos: [...new Set(P.frena.map((f) => f.etapa.replace(/:.*/, '')))], primero: P.frena[0]?.motivo?.slice(0, 200) || null }));
    writeFileSync(resolve(ROOT, 'Admin', 'registros', 'cargar-ultimo.jsonl'), resumen.map((x) => JSON.stringify({ ts: new Date().toISOString(), lista: LISTA, ...x })).join('\n') + '\n');
    console.log(`\n${resumen.filter((x) => x.carga).length} de ${resumen.length} cargarían. Resumen en Admin/registros/cargar-ultimo.jsonl (lo muestra node tools/estado.mjs).`);
  }
  if (docs.length === 1 && !LISTA && punteroReglasPais(salidas[0]?.clubId)) console.error(punteroReglasPais(salidas[0].clubId)); // por stderr: el JSON de stdout lo leen otras tools
  if ((docs.length === 1 && !LISTA) || JSON_OUT) console.log(JSON.stringify(docs.length === 1 ? salidas[0] : salidas, null, 1));
  if (ESCRIBIR) {
    const P = salidas[0];
    if (P.frena.length) { console.error(`\nNo se escribe nada: ${P.frena.length} motivo(s) para frenar.`); process.exit(1); }
    if (!compuertaContexto(P)) process.exit(1);
    const r = escribir(P);
    console.error(r.ok ? `\nEscrito (${r.escritos.join(', ')}). Auditoría: ${r.audit}. No se commiteó nada.` : `\nREVERTIDO: ${r.motivo}\n${r.audit || ''}`);
    if (r.ok) console.error(lineaGitAdd(antesDeEscribir, cambiadosEnGit()));
    process.exit(r.ok ? 0 : 1);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) await main();

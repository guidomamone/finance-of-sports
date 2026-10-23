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
// ----------------------------------------------------------------------------
// QUÉ HACE, EN ORDEN (cada paso puede FRENAR; la propuesta junta TODOS los motivos, no solo el primero, para que una sesión vea de una vez
// qué falta)
// ----------------------------------------------------------------------------
//  1. REGISTRO (Admin/registros/transcripciones-estado.jsonl, lo arma tools/inventario-transcripciones.mjs):
//       - el PDF tiene que estar `listo-para-jev` (transcripto, validado y con su lista de rubros) y NO `cargado`;
//       - `periodo.tipo` tiene que ser 'anual' y `periodo.nombreNoCoincide` falso (tools/periodo.mjs): un trimestral o un documento cuyo
//         nombre dice otro cierre que el contenido no se carga como ejercicio (se junta con los otros períodos, `periodo.mjs --grupos`);
//       - el `.categorias.json` tiene que estar AL DÍA con su lista de rubros y su `.jev.json` (tools/huellas.mjs): si la lista cambió
//         después de categorizar, las categorías son de otra lista.
//  2. CLUB Y AÑO: el club sale de tools/carpetas-clubes.mjs (la única regla del proyecto) y tiene que existir; el año, del mismo análisis
//     que usa el alta (`analizar()` de tools/alta-club.mjs: nombre del archivo confirmado por las fechas de cierre del contenido) y de
//     `quien.mjs --quien` (el que usa el registro): si no coinciden, frena. Si el club ya tiene ese año en su fiscalYearMeta, frena.
//  3. FILAS Y MONTOS: las de la verificación (Generados/.../<doc>.verificacion.json, etapa 6), con el signo y el lado que decidió
//     verificar.mjs. Había además una selección por palabras (proponer-carga.mjs, archivada).
//     Todo en MILLONES de moneda nativa (convención del sitio, club-data-mapping/referencia/fx.md).
//  4. CATEGORÍA DE CADA FILA: la del `.categorias.json` del pipeline (escalón 0 precedente del club, 1 Jev >= 0,90, 2 Claude >= 0,80). Si
//     la fila no está en esa lista (antes la etapa 3 del pipeline y la selección de filas de acá NO elegían las mismas filas:
//     Admin/mediciones/test-cargar.md 4.1; desde la 321 la etapa 3 prepara exactamente esta selección, así que esto pasa solo con listas viejas),
//     se prueba el precedente del mismo club, exacto o por familia de etiquetas (precedenteFamilia(), gratis). Lo que queda sin categoría o con confianza baja
//     NO se carga; si eso es más del --max-sin-categoria (default 5%) del dinero de su lado, frena.
//       - `no_es_rubro` no se carga como línea. Los resultados financieros (intereses, diferencias de cambio, participaciones) y el impuesto
//         a las ganancias NUNCA son una línea (club-data-mapping §2): van a `netInterest` / `tax` del fiscalYearMeta.
//       - Una categoría de un lado en una fila que la estructura del documento pone del otro lado se marca `ladoContradictorio` (aviso).
//  5. SIGNOS: el sitio guarda ingresos en positivo y gastos en NEGATIVO (computeYearGeneric() suma todo). Si el documento imprime los
//     gastos en positivo (la mayoría de sus filas de gasto sin signo), se invierten; si ya los imprime negativos, quedan como están (así
//     una reversión impresa en positivo dentro de los gastos queda positiva).
//  6. TOTALES Y TIE-OUT (club-data-mapping §6, "precisión antes que velocidad"): se buscan en el documento (tablas preparadas de
//     proponer-carga, año del ejercicio) un total impreso igual a la suma de las líneas de ingresos, otro igual a la de gastos (sin
//     `exceptional_items`: es lo que compara audit.js, |expenses + nonCash|) y el resultado del ejercicio igual a ingresos + gastos +
//     netInterest + tax. Un total que solo cierra por redondeo no frena: se agrega la línea "Diferencia de redondeo"
//     por la diferencia (other_income / other_expenses, ver L852) y el aviso lo dice. Sin total de ingresos que cierre, frena. Gastos o resultado impresos que no
//     cierran, frena; que no se encuentran, quedan en null con aviso (el sitio acepta un club-año con solo el total de ingresos, decisión
//     de Guido).
//  7. TIPO DE CAMBIO, LIGA, REPORTTYPE, SOURCEID: los mismos campos que calcula el alta (`analizar()` de tools/alta-club.mjs): fx declarado
//     por el documento (regla #0) -> `fx` + `fxSource:'document_close'`; si no, `fxRef` a FX_CLOSE (y si la cotización sale de la serie
//     local de tools/fx-reference/, --escribir la agrega a FX_CLOSE); sin cotización, frena. La liga del año con la regla "categoría al
//     cierre" de proponerLiga(); sin dato, la fila se escribe en `null` (= nadie lo verificó, P3). Una `pregunta` del alta sobre el año, el
//     cierre, la moneda, el tipo de documento o el fx FRENA. El perímetro (individual/consolidado) se HEREDA de los años ya cargados del
//     club cuando el documento es del mismo tipo (ver perimetroHeredado()); si no se puede, frena.
//  8. fiscalYearMeta: currency, fx/fxSource o fxRef, sourceId, reportType, gestionId null (club-data-mapping §7: no se inventa una
//     gestión), profitOnPlayerSales 0 y assetSales 0 (van como líneas si el documento las trae en el estado), netInterest y tax (de las
//     filas del paso 4), grossDebt y cash en null (los completa después `caja-deuda.mjs --club`: "sin dato no es cero"), y los tres official*.
//  9. `sources`: la entrada nueva, SIN `note` ni publicNote (la nota interna, con la ruta del .md que cita carpetas-clubes.mjs, va a
//     "## Fuentes" de Admin/carga-clubes/<club>.md; audit.js checkFuentesPublicas: las salvedades públicas las deriva sourceCaveats() de los campos). Y una línea en
//     Admin/sourcing/<País>/<Club>.md si ese archivo existe.
//
// --escribir (solo si no quedó NINGÚN motivo para frenar, y si el ejercicio tiene estadio y sponsor: compuertaContexto()): escribe el año en el JSON del club (data/<país>/<club>.json: ingresos, gastos, meta y la fuente) y regenera su data/<país>/<club>-data.js,
// la fila de liga en data/club-leagues/<iso2>.js, la cotización de mercado nueva en FX_CLOSE si hace falta, la línea de fuentes/, sube
// ASSET_V (la constante Y cada `?v=` literal de index.html, salvo que ya esté subido respecto de HEAD), corre los 4 generadores y
// `node tools/audit.js --quiet`. Si la auditoría da algún P0/P1, o cualquier paso falla, RESTAURA cada archivo tocado y borra lo creado
// (mismo mecanismo que alta-club.mjs). Este script solo NO commitea (el commit por año lo hace tools/cargar-lote.mjs). No toca `.claude/skills/`, `Admin/TODO.md` ni `CHANGELOG.md`.
//
// ----------------------------------------------------------------------------
// MEDIDO (informe completo en Admin/mediciones/test-cargar.md)
// ----------------------------------------------------------------------------
// Backtest de 18 ejercicios ya cargados (8 países, año borrado en un worktree y reconstruido con las etapas 3-5 reales): 1 carga (Alianza
// Lima 2023, idéntico a producción, audit.js 0 P0/P1 al escribir) y 17 frenan, TODOS con algo mal en la propuesta o un dato faltante: el
// tie-out no dejó pasar ningún número falso. Lo que más frena viene de etapas anteriores: la lista de rubros de la etapa 3 no es la misma
// selección que usa la carga, la escala se elige por tabla, entran tablas de balance / bienes de uso / presupuesto, y la categorización
// deja < 0,80 filas grandes y genéricas. Con --umbral-claude 0.7, PSV 2019-20 (año nuevo) carga y cierra exacto contra su resultado.
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
//        BACKTEST: compara cada propuesta contra el MISMO ejercicio cargado en otro checkout (producción). Se corre en un worktree donde se
//        BORRÓ ese año del data file (si no, frena por "ya cargado") y se rehicieron las etapas 3-5 del pipeline sobre esos documentos.
//        Mide totales (ingresos / gastos / resultado), % del dinero en la categoría correcta, fx y liga. Ver Admin/mediciones/test-cargar.md.
//   Extras: --max-sin-categoria 0.05, --umbral-claude 0.8, --json (con --lista: JSON en vez de una línea)
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync, appendFileSync } from 'node:fs';
import { resolve, relative, join, basename, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { archivosData, rutaData } from './data-clubes.js';
import { modificarClub, rutaJson } from './club-json.mjs'; // el JSON es la fuente de cada club
import { TOCA_UNA_CARGA } from './rutas.mjs';
import { parseNumber } from './datos-sitio.mjs';
import { validacionAlDia } from './cache-al-dia.mjs';
import { GENERADORES, queFalla } from './generadores.mjs';
import { COBERTURA_PERDIDAS_RE } from './vocabulario.mjs';
import { combinar as combinarEntidades } from './suma-entidades.mjs';
import { leerResultadoIxbrl, chequearIxbrl, xhtmlDelMismoEmisor } from './ixbrl-resultado.mjs';

// Los módulos que se reusan leen process.argv al importarse (alta-club.mjs: --escribir activa ANOTAR_MISSES y --anio fuerza el año;
// proponer-carga.mjs: --tabla, --limit, --club...). Las opciones de ESTE comando no son las de ellos: se les pasa un argv limpio.
const ARGS = process.argv.slice(2);
process.argv = process.argv.slice(0, 2);
const { analizar } = await import('./alta-club.mjs');
const { categoriasAlDia, huellaVerificar } = await import('./huellas.mjs');
const { precedenteFamilia } = await import('./categorizar-claude.mjs');
const { clubDeRuta } = await import('./carpetas-clubes.mjs');
const { derivado } = await import('./rutas.mjs');
const { marcarClub } = await import('./dentro-de-otro.mjs'); // "Posiblemente dentro de otro rubro", ver escribir()
const EV = await import('./evidencia-club.mjs'); // la evidencia de carga va a Admin/carga-clubes/<clubId>.md, no a data/
const { agregarCaso, casoYRespuesta, respuestaPorDetalle, cerrarResueltoPorClub, respuestasDonde, cerrarPerfilSabido, pendientes } = await import('./cola.mjs');
const agregarCasoCola = agregarCaso; // proponer() usa su propio agregarCaso (puede no escribir)
const { guardarPerfil, perfilVigente, perfilCercano, anioDeDoc, VENTANA_PERFIL } = await import('./perfil-clubes.mjs');
const { ajusteDe, ajustesDe, ajustePerimetroDe, ceroRealDelClub } = await import('./ajustes.mjs');
const { cierrePorVecinos } = await import('./cierre-vecinos.mjs');
const { VERSION_AMPLIADO } = await import('./indice-bloques.mjs');
const { ARCHIVO: ARCHIVO_APRENDIDAS, padreDe } = await import('./memoria-categorias.mjs');
const { padreEnClub, padreEnDoc, mismoPadre, contextoFila, sinMarca } = await import('./padres-filas.mjs'); // en qué nota está cada fila
// Nombres en castellano de las categorías (los de data/category-map.js), para que la pregunta de la cola diga "Administración y gastos
// generales" y no "admin_general_expense".
const NOMBRE_CAT = (() => { try { const t = readFileSync(resolve(import.meta.dirname, '..', 'data', 'category-map.js'), 'utf8'); const o = {}; for (const b of t.match(/_CATEGORY_LABELS = \{[\s\S]*?\n\};/g) || []) for (const m of b.matchAll(/^\s*(\w+): '([^']+)'/gm)) o[m[1]] = m[2]; return o; } catch { return {}; } })();
const { periodoDe, xhtmlHermano } = await import('./periodo.mjs');
const { categoriasDeDeporte, cerosDeDeporte, bolsonDeDeporte } = await import('./deporte-club.mjs'); // las categorías de un deporte
const { normalizar, claveFamilia, TOTAL_RE, TOTAL_INGRESOS_RE, RESULTADO_EJERCICIO_RE, IMPUESTOS_RE, GASTOS_RE, FINANCIERO_RE, IMPUESTO_GANANCIAS_RE, IMPUESTO_SOLO_RE } = await import('./vocabulario.mjs');

const ROOT = resolve(import.meta.dirname, '..');
const flagVal = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const ESCRIBIR = ARGS.includes('--escribir');
// --reemplazar: rehace con el script un ejercicio YA cargado (UC 2022-2024, cargados a mano:
// "Servicios de Seguridad" dentro de gastos de administración). "Ya cargado", "la fuente ya existe" y "sin .categorias.json" (Jev y Claude
// nunca corrieron sobre años cargados a mano) pasan de frenar a aviso; todo lo demás frena igual (en particular, una fila sin categoría). Al
// escribir, borra los bloques del año y escribe los nuevos, y CONSERVA lo que el script no genera: grossDebt/cash/staffCost (si el script no los trae),
// gestionId, la fuente existente y los `items` de una línea (nombres de jugadores vendidos) por etiqueta.
const REEMPLAZAR = ARGS.includes('--reemplazar');
const LISTA = flagVal('--lista');
const SALIDA = flagVal('--salida');
const COMPARAR = flagVal('--comparar');
const JSON_OUT = ARGS.includes('--json');
const MAX_SIN_CAT = flagVal('--max-sin-categoria') !== null ? Number(flagVal('--max-sin-categoria')) : 0.05;
const UMBRAL_CLAUDE = flagVal('--umbral-claude') !== null ? Number(flagVal('--umbral-claude')) : 0.8;
// LAS FILAS SALEN DE LA VERIFICACIÓN: Generados/.../<doc>.verificacion.json (localizar -> validar -> extraer -> verificar), y
// solo si quedó en estado 'ok' (sin casos pendientes en la cola humana). Había otro camino, sin --desde-verificacion: la
// selección de filas por palabras de proponer-carga.mjs (seleccionarFilas + briefingFor, que corría prepare-onboarding.mjs). Ningún proceso
// lo usaba (el lote y cargar-lote siempre pasan el flag) y se sacó con el ok de Guido; proponer-carga.mjs está en tools/archivo/.
// El flag se sigue aceptando y no cambia nada.
const CON_VALOR = new Set(['--lista', '--salida', '--comparar', '--max-sin-categoria', '--umbral-claude']);
const DOCS = ARGS.filter((a, i) => !a.startsWith('--') && !CON_VALOR.has(ARGS[i - 1]));
const TOL = 0.01; // la de audit.js checkTieOuts(): |calculado - oficial| >= 0,01 es P0 `no-cierra`
const HOY = new Date().toISOString().slice(0, 10);
const norm = normalizar;
const r6 = (x) => (x === null || x === undefined ? x : Number(Number(x).toFixed(6)));

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
function quien(pdf) {
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
function porQueNoListo(e) {
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

  // ---- 1. registro
  const e = registro.find((x) => x.pdf === pdf);
  if (!e) { return corta('registro', 'el PDF no está en Admin/registros/transcripciones-estado.jsonl (correr tools/inventario-transcripciones.mjs)'); }
  P.md = e.md;
  const reemplaza = REEMPLAZAR && e.cargado;
  if (e.cargado && !REEMPLAZAR) frena('registro', 'el registro dice que el ejercicio ya está cargado en el sitio');
  if (reemplaza) P.avisos.push('--reemplazar: rehace un ejercicio ya cargado');
  // Los frenos que dependen de "no es un reemplazo" quedan marcados: si más abajo data/ dice que el año ya está cargado (escalón 1 de
  // --reemplazar, ver "¿ESTÁ CARGADO?"), se sacan.
  const frenosSinReemplazo = [];
  if (e.jev !== 'listo-para-jev' && !reemplaza) { frena('registro', `todavía no se puede categorizar: ${porQueNoListo(e)}`); frenosSinReemplazo.push(P.frena.at(-1)); }
  P.reemplaza = reemplaza;
  // El período se recalcula con tools/periodo.mjs sobre el .md actual: el del registro puede ser de una versión anterior de periodo.mjs
  // (el arreglo de las temporadas "2009-10" cambió 165 marcas `nombreNoCoincide`). Si difiere del registro, se avisa.
  let per = e.periodo || null;
  // con ajuste manual `cierre`, el período del registro ya es el del ajuste (inventario-transcripciones.mjs): no se recalcula.
  if (!ajusteDe(pdf, 'cierre')) try { const mdT = readFileSync(resolve(ROOT, e.md), 'utf8'); const vivo = periodoDe(mdT, basename(pdf), { xhtml: xhtmlHermano(resolve(ROOT, e.md), mdT) }); if (per && (vivo.tipo !== per.tipo || !!vivo.nombreNoCoincide !== !!per.nombreNoCoincide)) P.avisos.push(`el período del registro (${per.tipo}${per.nombreNoCoincide ? ', nombre no coincide' : ''}) está desactualizado: tools/periodo.mjs hoy dice ${vivo.tipo}${vivo.nombreNoCoincide ? ', nombre no coincide' : ''} (regenerar el registro)`); per = vivo; } catch { /* sin .md: frena abajo */ }
  // Sin fecha de cierre: se deduce de los documentos vecinos del club, con aviso. Si no se puede, sigue
  // como antes (frena más abajo por período o por año).
  if (per && !per.cierre) { const cv = cierrePorVecinos(pdf, registro); if (cv) { per = { ...per, cierre: cv.cierre, cierreDeducido: true }; P.avisos.push(`fecha de cierre ${cv.cierre} ${cv.evidencia}`); } }
  P.periodo = per;
  if (!per) frena('periodo', 'el registro no tiene `periodo` (tools/periodo.mjs) para este documento');
  else {
    // PRIMER EJERCICIO DE UNA SOCIEDAD NUEVA (decisión de Guido; Admin/CONVENCIONES-DATOS.md, "Balances parciales"). Un período
    // de menos de 12 meses es parcial (falta el otro tramo) SALVO que no haya otro tramo: la sociedad no existía antes, y como la liga no se
    // juega todos los meses, el período contiene la temporada entera. UNA compuerta, del propio documento: la columna del año anterior no tiene
    // ningún importe distinto de cero (o no existe) en las filas extraídas. Casos: Kifisia 2022 (09/08/2021 – 30/06/2022, sin columna) y Volos
    // 2019 (24/07/2018 – 30/06/2019, plantilla griega con la columna 2017-2018 toda en 0,00) se cargan; Atalanta 2022 (semestral, 147 importes
    // del año anterior) sigue parcial. Se carga con una publicNote en la fuente.
    // (decisión de Guido: "cargarlo como el año del cierre, con su nota") también MÁS de 12 meses: el primer ejercicio
    // de una sociedad constituida antes de la temporada (Anderlecht 2011, 24-02-2010 a 30-06-2011, 16 meses; RAAL La Louvière 2018, 14;
    // Sint-Truiden 2013, 15; Zulte Waregem 2012, 17). Misma compuerta: sin importes del año anterior. Los importes van tal cual (sin
    // prorratear: el fútbol arranca con la temporada; Anderlecht 2011 vendió 39,1 M y 2012, de 12 meses, 67,9 M).
    let primero = null;
    // también de 12 meses redondeados cuando el período no es anual (Lierse SK 2019: 09-07-2018 a 30-06-2019, 11,7 meses): la
    // compuerta es la misma (sin importes del año anterior); un período 'anual' no entra acá.
    if (per.tipo !== 'anual' && per.meses && e.md) {
      const fp = resolve(ROOT, derivado(e.md, '.filas.json', { crear: false }));
      const fs = existsSync(fp) ? (JSON.parse(readFileSync(fp, 'utf8')).filas || []) : [];
      if (fs.length && fs.every((x) => x.anterior == null || String(x.anterior).trim() === '' || parseNumber(x.anterior) === 0)) primero = { meses: per.meses, inicio: per.inicio || null, cierre: per.cierre || null };
    }
    // EJERCICIO DE TRANSICIÓN POR CAMBIO DE CIERRE. Cuando el club
    // pasa el cierre de julio a junio, el ejercicio de 11 meses contiene la temporada entera y no hay otro tramo que buscar. UNA compuerta, la
    // "cadena de cierres" con los otros documentos del club (registro): el cierre anterior + los meses del período = este cierre, Y el
    // siguiente cierra 12 meses después (se comparan año y mes). Benfica 2007-08: 2007-07-31 + 11 = 2008-06; el siguiente, 2009-06. Un
    // semestral no pasa (el siguiente cierra 6 meses después) y un tramo suelto tampoco (no encadena). Se carga con nota pública, como el
    // primer ejercicio.
    let transicion = null;
    // (votación 2 a 1: Admin/CONVENCIONES-DATOS.md) También el ejercicio de MÁS de 12 meses por cambio de cierre, que trae
    // importes del año anterior (no es un primer ejercicio): se carga como el año del cierre, sin tope de meses. UNA compuerta, la contigüidad
    // con el anterior: el cierre anterior + los meses del período = este cierre. El "siguiente cierra 12 meses después" es solo para los de
    // menos de 12 (descarta el semestral); un período largo no tiene ese riesgo. Casos: Westerlo 2015 (18 meses), Aston Villa 2023-24 (13).
    if (!primero && per.tipo !== 'anual' && per.meses && per.meses !== 12 && per.cierre) {
      const ym = (f, d) => { const [y, m] = String(f).split('-').map(Number); const t = y * 12 + (m - 1) + d; return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, '0')}`; };
      const cierres = registro.filter((x) => x.pdf !== pdf && dirname(x.pdf) === dirname(pdf) && x.periodo?.tipo === 'anual' && x.periodo?.cierre).map((x) => ({ pdf: x.pdf, ym: String(x.periodo.cierre).slice(0, 7), cierre: x.periodo.cierre }));
      const ant = cierres.find((c) => c.ym === ym(per.cierre, -per.meses)); const sig = cierres.find((c) => c.ym === ym(per.cierre, 12));
      const diaDespues = (f) => { const d = new Date(`${f}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); };
      // TRAMO CORTO DE TRANSICIÓN SIN HUECO (votación 2 a 1 y Guido: C, Admin/CONVENCIONES-DATOS.md). Para uno de menos de 12 meses, además de
      // (a) el anterior termina donde empieza el tramo y (b) el siguiente cierra 12 meses después, (c) ningún anual conocido lo contiene: un cierre
      // anual estrictamente entre el del anterior y el del siguiente se superpone con el tramo (un semestral dentro de un ejercicio cuyo anual
      // existe: Juve Stabia, Estrela da Amadora). Pasa: se carga como el año del cierre con `periodMonths` y su nota. No pasa: es parcial y se
      // registra solo en documentos-parciales.txt con lo que falta (abajo), sin caso en la cola. Casos: Fiorentina 2020 y Genoa 2024 (pasan), Parma 2020 (falla a).
      // (otro documento del MISMO cierre, una memoria o el consolidado del mismo ejercicio, no cuenta: es este ejercicio, no uno que lo contenga)
      const contiene = per.meses < 12 ? cierres.filter((c) => c.ym > ym(per.cierre, -per.meses) && c.ym < ym(per.cierre, 12) && c.ym !== String(per.cierre).slice(0, 7)) : [];
      if (ant && (sig || per.meses > 12) && !contiene.length) transicion = { meses: per.meses, inicio: per.inicio || diaDespues(ant.cierre), cierre: per.cierre, anterior: ant.cierre, siguiente: sig?.cierre || null };
      else if (per.meses < 12) P.tramoFalta = [!ant && `el ejercicio anterior, con cierre en ${ym(per.cierre, -per.meses)}`, !sig && `el siguiente, con cierre en ${ym(per.cierre, 12)}`, contiene.length && `que ningún anual lo contenga (lo contiene ${contiene.map((c) => basename(c.pdf)).join(', ')})`].filter(Boolean);
    }
    if (transicion) { P.transicion = transicion; P.avisos.push(`ejercicio de transición por cambio de cierre (${per.meses} meses al ${per.cierre}): encadena con el cierre anterior ${transicion.anterior}${transicion.siguiente ? ` y el siguiente ${transicion.siguiente}` : ''}; se carga como el año, con nota pública (to-do 237 ab)`); }
    else if (primero) { P.primerEjercicio = primero; P.avisos.push(`primer ejercicio de la sociedad (${per.meses} meses${per.inicio ? `, desde ${per.inicio}` : ''}): la columna del año anterior no tiene importes; se carga como el año, con nota pública`); }
    else if (P.tramoFalta) {
      const linea = `${pdf} # cubre ${per.inicio || '?'} a ${per.cierre} (${per.meses} meses) # falta: ${P.tramoFalta.join('; ')} # cargar.mjs, ${HOY}; tramo corto que no encadena (CONVENCIONES-DATOS, tramo corto)`;
      const fp = resolve(ROOT, 'Admin', 'registros', 'documentos-parciales.txt');
      const ya = existsSync(fp) && readFileSync(fp, 'utf8').split('\n').some((l) => l.replace(/\s+#.*$/, '').trim() === pdf);
      // también en el ensayo (sin --escribir): cargar-lote.mjs ensaya primero y un documento frenado no llega a --escribir. Es idempotente (una línea por documento).
      if (!ya) appendFileSync(fp, linea + '\n');
      frena('periodo', `tramo corto de ${per.meses} meses al ${per.cierre} que no encadena sin hueco: falta ${P.tramoFalta.join('; ')}. Es parcial: ${ya ? 'ya estaba' : 'quedó registrado'} en Admin/registros/documentos-parciales.txt (sin caso en la cola)`);
    }
    else if (per.tipo !== 'anual') frena('periodo',`el documento cubre un período ${per.tipo}${per.meses ? ` de ${per.meses} meses` : ''}${per.cierre ? ` al ${per.cierre}` : ''}: no se carga como ejercicio (juntarlo con los otros períodos: node tools/periodo.mjs --grupos)`);
    if (per.nombreNoCoincide) frena('periodo', `el nombre del archivo dice otro cierre que el contenido (${per.cierre || '?'}): confirmar qué ejercicio es antes de cargarlo`);
  }
  if (!e.md || !existsSync(resolve(ROOT, e.md))) { return corta('registro', 'no hay .md en disco'); }
  const mdAbs = resolve(ROOT, e.md);
  const catPath = resolve(ROOT, derivado(e.md, '.categorias.json', { crear: false }));
  const AVISO_SIN_CAT = 'sin .categorias.json (año cargado a mano): cada fila sale de la escalera de categorías; una fila sin categoría frena igual';
  if (!existsSync(catPath)) { if (P.reemplaza) P.avisos.push(AVISO_SIN_CAT); else { frena('categorizacion', 'no hay .categorias.json (etapa 5 del pipeline: jev-categorizar.mjs + categorizar-claude.mjs --listos)'); frenosSinReemplazo.push(P.frena.at(-1)); } }
  else if (!categoriasAlDia(mdAbs)) frena('categorizacion', 'el .categorias.json NO está al día con su .rubros.json / .jev.json (huellas, tools/huellas.mjs): hay que volver a correr la etapa 5');

  // ---- 2. club y año
  const cr = clubDeRuta(pdf);
  const MSG_ALTA = 'el club no existe en el sitio: es un alta (tools/alta-club.mjs), fuera del alcance de esta etapa';
  // CLUB NUEVO EN EL ENSAYO: antes se cortaba acá y el ensayo de cargar-lote.mjs contaba el año como "se escribiría con alta"
  // sin haber mirado ningún freno de abajo (categorías en la cola, perfil, tie-outs, fx, fuente). Caso: lote 67 (Grecia), el ensayo prometía
  // 21 años y --escribir no escribió ninguno (alta hecha y revertida 5 veces). Ahora, SOLO sin --escribir y con la ficha del alta completa
  // (id, país, moneda e inicio del ejercicio sin preguntas, de analizar()), se anota el freno `club` y se sigue con un CLUB PROVISIONAL
  // armado de esa ficha, sin ejercicios cargados: los frenos de abajo se evalúan igual que para un club existente. Con --escribir nunca se
  // usa (sigue cortando): lo que se escribe no cambia. Una carpeta ambigua o una ficha con preguntas cortan como siempre.
  let provisional = null;
  if (!cr.clubId) {
    if (cr.via === 'ambigua') return corta('club', `la carpeta es ambigua (${cr.fuente})`);
    if (ESCRIBIR) return corta('club', MSG_ALTA);
    const a0 = analizar(pdf, sitio);
    const v = (n) => a0.campos.find((c) => c.campo === n) || {};
    const faltan = ['id', 'country', 'reportingCurrency', 'fiscalYearStart', 'sport'].filter((n) => v(n).estado === 'pregunta' || v(n).valor == null);
    if (a0.error || faltan.length) return corta('club', `${MSG_ALTA}${a0.error ? ` (${a0.error})` : `; la ficha del alta tiene preguntas en ${faltan.join(', ')}`}`);
    frena('club', `${MSG_ALTA}; el resto se evaluó con un club provisional armado de la ficha del alta (${v('id').valor})`);
    provisional = {
      id: v('id').valor,
      club: { id: v('id').valor, name: v('name').valor, displayName: v('displayName').valor, country: v('country').valor,
        reportingCurrency: v('reportingCurrency').valor, fiscalYearStart: v('fiscalYearStart').valor, sport: v('sport').valor },
      cd: { fiscalYearMeta: {}, revenueLinesByYear: {}, expenseLinesByYear: {} },
    };
  }
  const clubId = cr.clubId || provisional.id; P.clubId = clubId;
  const club = provisional ? provisional.club : sitio.clubs[clubId]; const cd = provisional ? provisional.cd : sitio.generic[clubId];
  if (!club || !cd) { return corta('club', `${clubId} no tiene ${rutaData(clubId)} registrado en CLUB_GENERIC_DATA`); }
  // las categorías válidas son las del deporte del club (SPORT_TAXONOMIES de data/category-map.js); sin deporte o sin taxonomía no se categoriza
  const TX = club.sport ? categoriasDeDeporte(club.sport) : null;
  if (!TX) { return corta('deporte', club.sport ? `el deporte «${club.sport}» de ${clubId} no tiene taxonomía en data/category-map.js (SPORT_TAXONOMIES)` : `${clubId} no declara deporte (sport en data/clubs.js)`); }
  const ladoDeCat = (c) => (TX.revenue.has(c) ? 'revenue' : TX.expense.has(c) ? 'expense' : null);
  // lo que no debería dar 0, y las preguntas de perfil, son los del deporte del club (CEROS_POR_DEPORTE: una sola tabla; [] = ninguno, a propósito)
  const CEROS = cerosDeDeporte(club.sport);
  if (!CEROS) { return corta('deporte', `el deporte «${club.sport}» no tiene clave en CEROS_POR_DEPORTE (tools/deporte-club.mjs): una tabla vacía ([]) o con lo que no puede dar 0`); }
  const alta = analizar(pdf, sitio);
  if (alta.error) { return corta('alta', alta.error); }
  const campo = (n) => alta.ejercicio.campos.find((c) => c.campo === n) || {};
  if (!alta.ejercicio.cierre && per?.cierreDeducido) alta.ejercicio.cierre = per.cierre; // fecha deducida de los vecinos (arriba)
  const year = alta.ejercicio.anio ?? (per?.cierreDeducido ? Number(per.cierre.slice(0, 4)) : null); P.year = year;
  const q = quien(pdf);
  if (q.year && Number(q.year) !== Number(year)) frena('año', `alta-club.mjs dice ejercicio ${year} y quien.mjs --quien (el que usa el registro) dice ${q.year}`);
  if (q.clubId && !q.clubDeCarpeta && q.clubId !== clubId) frena('club', // clubDeCarpeta: sin cita, el id de quien es el nombre de la carpeta
    `carpetas-clubes.mjs dice ${clubId} y quien.mjs --quien dice ${q.clubId}`);
  if (!year) { return corta('año', 'no se pudo determinar el año del ejercicio'); }
  // ¿ESTÁ CARGADO? Escalón 0: el registro (`cargado` de transcripciones-estado.jsonl). Escalón 1:
  // data/ (el repo local, no el sitio deployado) ya tiene el año. El registro queda viejo después de cargar hasta que alguien corre el
  // inventario: con --reemplazar frenaban 21 años griegos ya publicados ("ya tiene el ejercicio cargado").
  if ((cd.fiscalYearMeta || {})[year] && REEMPLAZAR && !P.reemplaza) {
    P.reemplaza = true; P.frena = P.frena.filter((f) => !frenosSinReemplazo.includes(f));
    P.avisos.push('--reemplazar: el registro no lo daba por cargado, pero data/ tiene el año (registro desactualizado: tools/inventario-transcripciones.mjs)');
    if (!existsSync(catPath)) P.avisos.push(AVISO_SIN_CAT);
  }
  if ((cd.fiscalYearMeta || {})[year]) { if (P.reemplaza) P.avisos.push(`${clubId} ${year} ya cargado: se reemplaza`); else frena('año', `${clubId} ya tiene el ejercicio ${year} cargado`); }
  // ajuste manual `no-recargar`: lo publicado de ese año no lo reproduce una corrida nueva y es mejor que ella (Lazio 2012-13, Roma 2021: el
  // desglose de las notas en miles, que el script no abre). `--reemplazar` frena; para recargar de verdad hay que anular el ajuste a conciencia.
  { const nr = ajusteDe(pdf, 'no-recargar'); if (nr && (cd.fiscalYearMeta || {})[year]) frena('no-recargar', `ajuste manual no-recargar (${nr.fecha}): ${nr.motivo}`); }
  for (const n of ['anio', 'cierre', 'currency', 'reportType', 'fx']) { const c = campo(n); if (c.estado === 'pregunta') frena(`alta:${n}`, c.pregunta); }
  if (campo('reportType').valor && campo('reportType').valor !== 'official_balance_sheet') frena('alta:reportType', `reportType ${campo('reportType').valor}: esta etapa solo carga balances anuales`);
  // perímetro
  const perC = campo('perimetro'); const her = perimetroHeredado(sitio, clubId);
  let perimetro = perC.valor;
  const ajPer = ajustePerimetroDe(pdf); // escalón 0: ajuste manual del documento o del club
  if (ajPer) { perimetro = ajPer.valor; P.avisos.push(`perímetro: ${perimetro} (ajuste manual ${ajPer.pdf.endsWith('/') ? 'del club' : 'del documento'}, ${ajPer.fecha}: ${ajPer.motivo})`); }
  else if (perC.estado === 'pregunta') {
    // Qué dice el documento, según la pregunta del alta: solo el grupo consolidado, consolidado + individual, o dos entidades en la carpeta.
    const docTipo = perC.dosEntidades ? 'dos-entidades' : /solo del GRUPO/.test(perC.pregunta || '') ? 'consolidado' : /CONSOLIDADOS y también individuales/.test(perC.pregunta || '') ? 'ambos' : '?';
    const listaAnios = Object.entries(her.porAnio).map(([y, v]) => `${y} ${v}`).join(', ') || 'ninguno';
    // Se hereda SOLO el consolidado: si el club siempre se cargó consolidado y el documento trae el consolidado (solo o junto al
    // individual), es el mismo perímetro. Heredar "individual" de un documento que trae los dos no alcanza: la selección de filas no sabe
    // elegir las columnas individuales (Bayern cargaba las dos, ver Admin/mediciones/test-eleccion-tabla.md).
    const cerc = perimetroCercano(her, year);
    if (cerc?.perimetro === 'consolidado' && (docTipo === 'consolidado' || docTipo === 'ambos')) { perimetro = 'consolidado'; P.avisos.push(`perímetro heredado del año cargado más cercano (${cerc.anio}, consolidado); el documento trae el consolidado${docTipo === 'ambos' ? ' (y también el individual: revisar que no se hayan cargado filas de los dos)' : ''}. Años cargados: ${listaAnios}`); }
    else {
      // No se puede heredar: a la cola como pregunta de sí o no (antes frenaba sin pasar por la cola). La respuesta de Guido gana.
      const prop = cerc?.perimetro && cerc.perimetro !== '' ? cerc.perimetro : 'consolidado';
      const { caso: cq, resp } = casoYRespuesta(pdf, 'cargar', 'perimetro', String(year));
      if (resp && cq && (resp.decision === 'aceptar' || (resp.decision === 'corregir' && resp.valor))) { perimetro = resp.decision === 'aceptar' ? cq.perimetroPropuesto : String(resp.valor).trim(); P.avisos.push(`perímetro: ${perimetro} (respuesta de Guido en la cola)`); }
      else {
        agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'perimetro', detalle: String(year), perimetroPropuesto: prop,
          que: `¿${year} se carga ${prop.toUpperCase()}${cerc ? `, como ${cerc.anio} (el año cargado más cercano)` : ''}?  (por qué: ${perC.pregunta?.slice(0, 220)} Documento: ${docTipo}; años cargados: ${listaAnios})`,
          propuesta: `sí (responder aceptar; si no, corregir --valor individual|consolidado)` });
        frena('perimetro-en-cola', `el perímetro espera respuesta en la cola humana (node tools/cola.mjs); propuesta: ${prop}`);
      }
    }
  }
  if (club.fiscalYearStart && alta.ejercicio.cierre) {
    const mm = Number(alta.ejercicio.cierre.slice(5, 7)); const fys = `${String(mm === 12 ? 1 : mm + 1).padStart(2, '0')}-01`;
    if (fys !== club.fiscalYearStart) P.avisos.push(`el documento cierra ${alta.ejercicio.cierre} (ejercicio desde el ${fys}) y data/clubs.js dice fiscalYearStart ${club.fiscalYearStart}: ¿cambió el cierre del club?`);
  }
  const moneda = campo('currency').valor;
  if (moneda && club.reportingCurrency && moneda !== club.reportingCurrency && ajusteDe(pdf, 'moneda')?.valor !== moneda) frena('moneda', `el ejercicio saldría en ${moneda} y el club reporta en ${club.reportingCurrency}`);
  const prevMonedas = new Set(Object.values(cd.fiscalYearMeta || {}).map((m) => m.currency).filter(Boolean));
  if (moneda && prevMonedas.size && !prevMonedas.has(moneda)) P.avisos.push(`los años cargados del club están en ${[...prevMonedas].join('/')} y este en ${moneda}`);

  // ---- 3. filas y montos
  let sf; let notasVerif = []; let ingresosVerif = null; // lo que la verificación dice del estado, para el paso 6b
  {
    const pv = resolve(ROOT, derivado(e.md, '.verificacion.json', { crear: false }));
    if (!existsSync(pv)) { return corta('filas', 'no hay .verificacion.json (correr tools/lote.mjs o verificar.mjs)'); }
    let VV = JSON.parse(readFileSync(pv, 'utf8'));
    // UN EJERCICIO QUE SUMA DOS ENTIDADES: el ajuste `suma-con` junta este documento con el de la otra entidad (tools/suma-entidades.mjs).
    const ajSuma = ajusteDe(pdf, 'suma-con');
    if (ajSuma && VV.estado === 'ok') {
      const S = combinarEntidades(pdf, VV, ajSuma);
      if (S.error) return corta('filas', S.error);
      VV = S.V; P.suma = { nota: S.nota, otra: S.otra.pdf, transferencia: S.T, categorias: S.otra.categorias }; P.avisos.push(`suma de dos entidades: ${S.otra.pdf.split('/').pop()} se suma a este documento; transferencia ${S.T} fuera de ingresos y gastos`);
    }
    notasVerif = VV.notas || []; ingresosVerif = VV.totales?.ingresos ?? null;
    // AVISO, no freno: el caché lo hizo otra versión de verificar.mjs (o de sus reglas). Correr tools/verificar.mjs sobre este PDF (gratis) antes de cargar.
    if (VV.scriptHuella && VV.scriptHuella !== huellaVerificar()) P.avisos.push(`caché viejo: el .verificacion.json es de otra versión de verificar.mjs (sello ${VV.scriptHuella}, hoy ${huellaVerificar()}); correr node tools/verificar.mjs "${pdf}" --rubros (gratis) por si hoy da otra cosa (to-do 298 a3)`);
    if (VV.estado !== 'ok') { return corta('filas', `la verificación tiene ${VV.cola.length} caso(s) pendientes en la cola humana (node tools/cola.mjs)`); }
    P.ajustes = VV.ajustes || null; // ajustes manuales que aplicó verificar.mjs: se escriben como comentario en la meta del año
    // Formato de cada fila: {label, page, section, native, tside, origen}. Ingresos y gastos en positivo (los signos los decide
    // el paso 5 de abajo); financiero e impuesto con su signo impreso y su destino ya decidido por extraer.mjs (no por palabras).
    const raw = [
      // signoFijo: el signo que ya decidió verificar.mjs (positivo = suma a su lado; negativo = lo reduce, como "Feriado Legal
      // −15.597" de UC 2020, una reversión de la provisión de vacaciones dentro de los gastos de administración). El paso 5 lo usa tal cual en
      // vez de adivinarlo por tabla: hasta la 337 se perdía y la fila quedaba sumando gasto (UC 2020 frenaba con 31.194 de diferencia).
      ...VV.lineas.map((l) => ({ label: l.etiqueta, page: l.pagina, section: l.origen, native: Math.abs(l.M), signoFijo: l.M, tside: l.lado === 'ingreso' ? 'revenue' : 'expense', origen: `verificacion (${l.origen})`, ...(l.categoria ? { catAjuste: l.categoria } : {}) })),
      // la cobertura de pérdidas del holding no es interés neto: va como una ganancia dentro de los gastos, categoría exceptional_items (fuera del total de gastos
      // que se compara con el impreso, dentro del resultado), igual que la venta del 20% de Goiás 2023. signoFijo negativo = reduce el gasto.
      // (Auditora 5, Girona 2021-23) un ajuste `fila` del lado financiero con destino profit_on_player_sales («Resultados por enajenaciones», rubro 13 del PGC
      // español) va a profitOnPlayerSales: cuenta en el resultado como el financiero, pero no es interés neto ni una línea de ingreso o de gasto.
      ...VV.financiero.filter((l) => !COBERTURA_PERDIDAS_RE.test(String(l.etiqueta || ''))).map((l) => ({ label: l.etiqueta, page: null, section: 'financiero', native: l.M, tside: null, origen: 'verificacion', destinoForzado: l.destino === 'profit_on_player_sales' ? 'profitOnPlayerSales' : 'netInterest' })),
      ...VV.financiero.filter((l) => COBERTURA_PERDIDAS_RE.test(String(l.etiqueta || ''))).map((l) => ({ label: l.etiqueta, page: null, section: 'financiero', native: Math.abs(l.M), signoFijo: -l.M, tside: 'expense', origen: 'verificacion (cobertura de pérdidas)', catAjuste: 'exceptional_items' })),
      ...VV.impuesto.map((l) => ({ label: l.etiqueta, page: null, section: 'impuesto', native: l.M, tside: null, origen: 'verificacion', destinoForzado: 'tax' })),
    ];
    const totalCands = [VV.totales.ingresos ? { label: 'total de ingresos (verificado)', M: VV.totales.ingresos, page: null, how: 'etiqueta' } : null, VV.totales.gastos ? { label: 'total de gastos (verificado)', M: VV.totales.gastos, page: null, how: 'etiqueta' } : null].filter(Boolean);
    sf = { ok: true, raw, totalCands, docResult: VV.totales.resultadoParaCargar ?? VV.totales.resultadoImpreso, pts: null, extra: { notasUsadas: [] }, refM: null };
  }
  if (!sf.ok) { return corta('filas', sf.motivo); }
  P.seleccion = { filas: sf.raw.length, notasUsadas: sf.extra?.notasUsadas || [], refM: sf.refM };

  // ---- 4. categoría de cada fila
  const cj = existsSync(catPath) ? JSON.parse(readFileSync(catPath, 'utf8')) : { rubros: [] };
  if (P.suma && existsSync(P.suma.categorias)) cj.rubros = [...(cj.rubros || []), ...(JSON.parse(readFileSync(P.suma.categorias, 'utf8')).rubros || [])]; // las del documento propio primero (porEtiqueta toma la primera)
  // Por etiqueta Y lado: la misma etiqueta puede estar de los dos lados en un documento (Fortaleza 2025 "Diversos"). Si el
  // rubro no trae lado, vale solo por etiqueta.
  const porEtiqueta = new Map(); for (const r of cj.rubros || []) { const k = norm(r.label); if (!porEtiqueta.has(k)) porEtiqueta.set(k, r); if (r.lado && !porEtiqueta.has(`${k}|${r.lado}`)) porEtiqueta.set(`${k}|${r.lado}`, r); }
  // Precedente del mismo club (todos sus años cargados; el año que se carga no está, por definición): exacto o por FAMILIA de etiquetas, con
  // la MISMA regla que el escalón 0 de la categorización (precedenteFamilia() de tools/categorizar-claude.mjs, medida en su comentario). Hasta la
  // Acá había una copia propia, solo exacta y solo con lado conocido.
  const lineasClub = [];
  for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const [y, ls] of Object.entries(cd[key] || {})) for (const l of ls || []) if (l.rawLabel && l.normalizedCategory) lineasClub.push({ club: clubId, year: String(y), side, label: l.rawLabel.trim(), cat: l.normalizedCategory, padre: padreEnClub(clubId, String(y), side, l.rawLabel) });
  // Categoría "aceptable" de una etiqueta: la del .categorias.json (escalón 0/1, o Claude >= --umbral-claude) o, si la etiqueta no está en
  // esa lista, el precedente del club.
  // COMPUERTA DEL LADO en toda la escalera de categorización (escalón a de "lo que cerró en la etapa 6 no se vuelve a decidir"):
  // una categoría del OTRO lado que la fila en el documento no se acepta. La fila baja al precedente del club DE SU LADO; si tampoco hay,
  // se propone la genérica de su lado (otros ingresos / otros gastos) con confianza 0, así llega a la cola como pregunta de sí o no, con la
  // clave "etiqueta|lado". Caso: Fortaleza 2025 "Diversos" 1.986 en otros ingresos, que Jev categorizó other_expenses con 0,99.
  const delOtroLado = (cat, lado) => lado && cat && ladoDeCat(cat) && ladoDeCat(cat) !== lado;
  // NO ES RUBRO (escalón c): en una fila VERIFICADA (la etapa 6 la usó para cerrar el
  // resultado), un "no_es_rubro" por debajo del umbral no la excluye en silencio: sigue el mismo camino que una categoría del otro lado
  // (precedente de su lado, o la genérica a la cola). Caso: Fortaleza 2019 "Total Costo de Ventas" 137.713 y 2020 52.995 (Claude, 0,6).
  const catDe = (label, lado, verificada = false, padre = null) => {
    const k = norm(label);
    let c = (lado && porEtiqueta.get(`${k}|${lado}`)) || porEtiqueta.get(k);
    const noRubroDudoso = verificada && lado && c?.categoria === 'no_es_rubro' && (c.escalon === 2 && (incluirNoRubro || (c.confianza ?? 0) < UMBRAL_CLAUDE));
    const rechazada = c && (delOtroLado(c.categoria, lado) || noRubroDudoso) ? c.categoria : null;
    if (c && !rechazada) return { cat: c.categoria || null, conf: c.confianza ?? null, escalon: c.escalon, fuenteCat: 'categorias.json', enLista: true };
    const p = precedenteFamilia(lineasClub, clubId, lado || null, label, { padre }); // con la nota de la fila: cambios A y B
    if (p && !delOtroLado(p.cat, lado) && !(noRubroDudoso && p.cat === 'no_es_rubro')) return { cat: p.cat, conf: 1, escalon: 0, fuenteCat: `precedente del club, ${p.via} (${rechazada ? `categorias.json decía ${rechazada}` : 'la fila no estaba en categorias.json'})`, enLista: true };
    if (rechazada) return { cat: lado === 'revenue' ? 'other_income' : 'other_expenses', conf: 0, escalon: 2, fuenteCat: `categorias.json decía ${rechazada}${noRubroDudoso ? ` con ${c.confianza} (fila verificada: no se excluye sola)` : ', del otro lado que la fila'}: se propone la genérica de su lado`, enLista: true, ladoRechazado: true };
    return { cat: null, fuenteCat: 'la fila no está en categorias.json ni tiene precedente', enLista: false };
  };
  const aceptable = (c) => c.cat && c.cat !== 'no_es_rubro' && ladoDeCat(c.cat) && (c.escalon !== 2 || (c.conf ?? 0) >= UMBRAL_CLAUDE);
  // ANCLA SIN ABRIR: proponer-carga abre un renglón del estado en la nota que lo desglosa, pero la lista de rubros de la etapa 3 del pipeline
  // (y por lo tanto el .categorias.json) solo tiene los renglones de las tablas de ESTADO, no los de las notas. Si alguna fila de una nota
  // abierta queda sin categoría y el renglón del estado que la originó SÍ la tiene, se carga ese renglón entero (menos detalle, pero
  // categorizado) y se avisa. El arreglo de fondo es que la etapa 3 prepare también las filas de las notas que abre el ancla.
  let raw = [];
  const grupos = new Map();
  for (const r of sf.raw) { if (r.ancla) { const k = `${norm(r.ancla.label)}|${r6(r.ancla.native)}`; if (!grupos.has(k)) grupos.set(k, { ancla: r.ancla, hijas: [] }); grupos.get(k).hijas.push(r); } else raw.push(r); }
  const colapsadas = [];
  for (const g of grupos.values()) {
    const faltan = g.hijas.filter((h) => !aceptable(catDe(h.label, h.tside)));
    if (faltan.length && aceptable(catDe(g.ancla.label, g.ancla.tside))) { raw.push({ label: g.ancla.label, page: g.ancla.page, native: g.ancla.native, tside: g.ancla.tside, origen: `estado (ancla sin abrir: ${faltan.length} de ${g.hijas.length} filas de su nota sin categoría)` }); colapsadas.push(g.ancla.label); }
    else raw.push(...g.hijas);
  }
  if (colapsadas.length) P.avisos.push(`${colapsadas.length} renglón(es) del estado cargados SIN abrir su nota, porque la nota no está en la lista de rubros categorizada: ${colapsadas.slice(0, 5).map((l) => `"${l.slice(0, 50)}"`).join('; ')}`);
  // CATEGORÍA DUDOSA -> COLA HUMANA (decisión de Guido: lo que Claude categorizó con menos de 0,80 no se carga solo). Hasta la
  // 330 esas filas quedaban afuera de la carga sin preguntarle a nadie, las sumas dejaban de cerrar y el documento frenaba con un "no cierra"
  // engañoso (UC 2025: "Transporte", "Arriendo de Bienes" y "Provisión No Operacionales" afuera = 322.108 de menos, resultado −407.737 en vez
  // de −729.845). Ahora:
  //   - cada una va a la cola como pregunta de sí o no ("¿'Transporte' va como Administración y gastos generales?") con la categoría propuesta;
  //   - mientras espera, cuenta en las sumas con la categoría propuesta (las sumas no se rompen) y el documento frena con "N filas esperan
  //     categoría", no con "no cierra";
  //   - la respuesta de Guido gana sobre cualquier otra categoría de esa fila (aceptar -> la propuesta; corregir --valor <categoría> -> esa;
  //     descartar -> la fila no se carga), y queda en Admin/registros/categorias-aprendidas.jsonl con confianza 1: los años siguientes del mismo club la
  //     toman como precedente gratis (memoria-categorias.mjs).
  // `clave`: la etiqueta normalizada, o "etiqueta|lado" para la pregunta propia de una fila cuyo lado contradice la respuesta
  // que ya hay para la etiqueta (ver COMPUERTA DEL LADO abajo).
  const respuestaCat = (label, clave = norm(label), padre = null, lado = null, { familia = false, propuesta = null } = {}) => {
    let { caso, resp } = casoYRespuesta(pdf, 'cargar', 'categoria', clave);
    // Si no hay respuesta para ESTE documento, vale la de otro documento del MISMO club con la misma etiqueta ("Otras ganancias
    // (pérdidas)" de UC llegaba a la cola una vez por año, 2010-2014). La carpeta del documento identifica al club.
    // la respuesta de OTRO documento del club vale solo si la fila está en la MISMA nota allá y acá (si no se sabe la
    // nota de alguna de las dos, como antes). Caso: "Serviços de terceiros", contestado para la fila de "Custo com futebol" (Goiás 2024-2025),
    // se aplicaba a 2008-2016, donde está en el bloque administrativo.
    const mismaNota = (c) => { if (!padre || !lado) return true; const otro = padreEnDoc(c.md || c.pdf.replace(/\.pdf$/i, '.md'), lado, label); return otro == null || mismoPadre(otro, padre); };
    // UN `aceptar` DE OTRO DOCUMENTO VALE SOLO CON LA MISMA PROPUESTA. `aceptar` dice "la propuesta de ESE caso está bien", no
    // "esta etiqueta va siempre ahí": si en este documento la fila tiene otra propuesta, la respuesta de allá no decide (sigue la escalera:
    // su propia categoría o la cola con su pregunta). `corregir` nombra la categoría y vale como antes. Casos de daño silencioso: Fortaleza
    // "auxilio de transporte", Goiás "servicos de terceiros", Avaí "viagens e hospedagens", Ferroviária "aluguel".
    // Lo que deja de decidir NO baja a la categoría propia de la fila (eso sería decidir distinto, no menos): pide una segunda mirada. Si el
    // `aceptar` salteado es lo único que había, la fila va a la cola con su propuesta y la nota de lo aceptado allá (`choque`), y no se
    // prueban los escalones A y B. Un `aceptar` del OTRO lado no choca: lo resuelve la clave "etiqueta|lado" (COMPUERTA DEL LADO, abajo).
    // Casos: Gil Vicente 2020-21 "Provisões (aumentos/reduções)" (aceptado other_amortisation en 2022-2024; acá la propuesta es
    // admin_general_expense), Braga 2015-16 "Direitos de formação", Goiás 2014 "(-) Serviços de terceiros".
    const choca = (c, x) => propuesta && x?.decision === 'aceptar' && c.categoriaPropuesta !== propuesta && !(lado && ladoDeCat(c.categoriaPropuesta) && ladoDeCat(c.categoriaPropuesta) !== lado);
    if (!resp) {
      const delClub = (c) => dirname(c.pdf) === dirname(pdf) && mismaNota(c);
      const otra = respuestaPorDetalle('cargar', 'categoria', clave, (c, x) => delClub(c) && !choca(c, x)); if (otra) ({ caso, resp } = otra);
      else { const ch = respuestaPorDetalle('cargar', 'categoria', clave, (c, x) => delClub(c) && choca(c, x)); if (ch) return { choque: ch.caso.categoriaPropuesta, choqueDe: ch.caso.pdf.split('/').pop() }; }
    }
    // ESCALÓN A: la respuesta de otro documento del MISMO club con una etiqueta de la MISMA FAMILIA (mismaFamilia() de
    // tools/vocabulario.mjs: sin la marca de lista "b)", "c)", "-", sin mayúsculas ni acentos). Hasta acá solo valía la etiqueta exacta y la
    // familia solo se usaba con los años ya CARGADOS. Caso: Atalanta 2024 "oneri sociali" volvió a preguntar lo contestado en 2021 como
    // "b) oneri sociali" (2021 no estaba cargado todavía). Compuertas: mismo lado (si la clave lo lleva), misma nota (la fila del otro
    // documento se busca con SU etiqueta) y una sola categoría entre todas las respuestas de la familia; si el club respondió distinto, no decide.
    // SOLO para una fila que iba a la cola (`familia`): lo que el precedente, Jev o Claude ya decidieron con confianza no se pisa (medido: sin
    // esto cambiaban categorías de años cargados, ej. Fortaleza "Auxilio hotelero"). Y familia ESTRICTA: claveFamilia() igual, sin la
    // tolerancia de letras de mismaFamilia() ("materiali" e "immateriali" difieren en 2 letras y son opuestas: Hellas Verona 2020).
    let viaFamilia = null;
    const catDe = ({ caso: c, resp: x }) => (x.decision === 'aceptar' ? c.categoriaPropuesta : x.decision === 'corregir' ? String(x.valor || '').trim() : x.decision === 'descartar' ? '(descartar)' : null);
    if (!resp && familia) {
      const [base, ladoClave] = String(clave).split('|');
      // misma nota, o una fila es el RENGLÓN del estado y la otra su HOJA en la nota que lo abre (Atalanta: 2021 "b) oneri sociali" en el
      // estado; 2024 "oneri sociali", hoja de la nota que abre "b) oneri sociali")
      const mismaNotaDe = (c, et) => { if (!padre || !lado) return true; const otro = padreEnDoc(c.md || c.pdf.replace(/\.pdf$/i, '.md'), lado, et);
        return otro == null || mismoPadre(otro, padre) || (otro === 'estado' && claveFamilia(padre) === claveFamilia(et)) || (padre === 'estado' && claveFamilia(otro) === claveFamilia(base)); };
      const fam = respuestasDonde('cargar', 'categoria', (c) => { const [et, ld] = String(c.detalle).split('|'); return dirname(c.pdf) === dirname(pdf) && ld === ladoClave && et !== base && claveFamilia(et) === claveFamilia(base) && mismaNotaDe(c, et); });
      // compuerta de lado: una categoría del otro lado no vale (Fortaleza 2017 "transporte", gasto, tomaba "transportes", ingreso)
      const cats = new Set(fam.map(catDe).filter(Boolean));
      if (cats.size === 1 && (!lado || [...cats][0] === '(descartar)' || !ladoDeCat([...cats][0]) || ladoDeCat([...cats][0]) === lado)) { const ult = fam.filter((x) => catDe(x)).sort((a, b) => String(b.resp.ts).localeCompare(String(a.resp.ts)))[0]; ({ caso, resp } = ult); viaFamilia = `familia de "${String(caso.detalle).split('|')[0]}" (${caso.pdf.split('/').pop()})`; }
    }
    // ESCALÓN B: la respuesta de OTROS CLUBES DEL MISMO PAÍS, solo para una fila que iba a la cola. Mínimo 1 club
    //: en Grecia solo AEL Larissa había contestado "Κόστος πωλήσεων" y Asteras, Levadiakos y OFI
    // volvieron a preguntarlo. Medido sobre las respuestas existentes: con 2 clubes decide 34 y acierta 34; con 1, decide 59 y acierta 59.
    // Una respuesta que saca la fila (descartar) no decide desde otro club (sacaFila, abajo).
    // Compuertas: misma etiqueta (claveFamilia), mismo lado, mismo CONTEXTO (contextoFila(): la nota que la abre o, en el estado, el renglón
    // título de arriba), respondida en al menos 1 club y todos con la misma categoría. Caso: "c) trattamento di fine rapporto" bajo
    // "per il personale" (wages_squad en varios clubes); "altri costi" no se generaliza porque cada club lo tiene bajo otro título.
    if (!resp && familia && lado) {
      const ctx = contextoFila(P.md, label, lado);
      if (ctx) {
        const [base, ladoClave] = String(clave).split('|'); const fb = claveFamilia(base);
        const clubDe = (p) => String(p).split('/').slice(0, 3).join('/'); const pais = pdf.split('/')[1];
        const otros = respuestasDonde('cargar', 'categoria', (c) => { const [et, ld] = String(c.detalle).split('|'); return c.pdf.split('/')[1] === pais && clubDe(c.pdf) !== clubDe(pdf) && ld === ladoClave && claveFamilia(et) === fb && contextoFila(c.md || c.pdf.replace(/\.pdf$/i, '.md'), et, lado) === ctx; }).filter((x) => catDe(x));
        const clubes = new Set(otros.map((x) => clubDe(x.caso.pdf))); const cats = new Set(otros.map(catDe)); const unica = [...cats][0];
        if (clubes.size >= 1 && cats.size === 1 && (unica === '(descartar)' || !ladoDeCat(unica) || ladoDeCat(unica) === lado)) {
          ({ caso, resp } = otros.sort((a, b) => String(b.resp.ts).localeCompare(String(a.resp.ts)))[0]);
          viaFamilia = `precedente del país: ${clubes.size} clubes (${[...clubes].map((c) => c.split('/')[2]).join(', ')}), ${ctx}`;
        }
      }
    }
    // Y si ESTE documento tenía su propio caso pendiente con esa etiqueta, la respuesta del club ya lo resolvió: se cierra (UC
    // 2013, caso 6c69d0a, seguía en la cola aunque la carga ya usaba la respuesta de 2014).
    // SACAR UNA FILA VALE SOLO PARA SU DOCUMENTO. Una respuesta que saca la fila (`descartar`, o `corregir --valor
    // no_es_rubro`, que la reemplaza desde cola.mjs) decide en el escalón 0 (el caso de ESTE documento) y en ningún otro: si viene de otro
    // documento del club (escalón 1), de la familia (A) o de otros clubes (B), no decide y la fila sigue su camino normal (precedente, Jev, la
    // cola). Caso: diez `descartar` de Novorizontino 2020/2021/2024 con nota "obsoleto: año ya cargado" sacaban "Com pessoal" (wages_squad,
    // −12,08 M en 2022) de 2022, 2023 y 2025; el tie-out frenaba esos años, pero una fila chica o compensada habría pasado.
    const sacaFila = (x) => x && (x.decision === 'descartar' || (x.decision === 'corregir' && String(x.valor || '').trim() === 'no_es_rubro'));
    if (resp && caso && caso.pdf !== pdf && sacaFila(resp)) return null;
    if (resp && caso && caso.pdf !== pdf) cerrarResueltoPorClub(pdf, 'cargar', 'categoria', clave, caso);
    if (!resp || !caso) return null;
    const notaDe = () => [viaFamilia, resp.nota].filter(Boolean).join(' · ') || null;
    if (resp.decision === 'aceptar') return { cat: caso.categoriaPropuesta, nota: notaDe() };
    if (resp.decision === 'corregir' && resp.valor) return { cat: String(resp.valor).trim(), nota: notaDe() };
    if (resp.decision === 'descartar') return { descartar: true };
    return null;
  };
  const aprendidasYa = existsSync(ARCHIVO_APRENDIDAS) ? readFileSync(ARCHIVO_APRENDIDAS, 'utf8') : '';
  // LA MISMA ETIQUETA BAJO DOS RENGLONES. La categoría se decide por etiqueta, y en un estado
  // por función la misma etiqueta cae en dos notas con sentido distinto: PAOK "Αποσβέσεις" en el cuadro de fútbol (amortización de pases) y
  // en los de administración y ventas (bienes y software, 0,2-0,3 M por año), que heredaba player_amortisation; Olympiacos 2025 "Εισφορές
  // κοινωνικής ασφάλισης" en la nota de jugadores y en la de otros empleados. Medido: 227 etiquetas en 81 documentos. UNA compuerta: la
  // etiqueta (del mismo lado) aparece bajo dos o más renglones distintos del documento (el estado cuenta como uno). Para esas filas la
  // categoría por etiqueta (.categorias.json, y el precedente sin contexto, que se arma con lo publicado y puede traer el error) no decide:
  // solo el precedente del club con la MISMA nota; si no hay, a la cola con la clave "etiqueta@renglón" y la categoría por etiqueta como
  // propuesta, así se contesta (o se corrige) una sola de las dos.
  // RENGLÓN DISTINTO = TÍTULO DISTINTO: acá los renglones se separan por su título exacto (sin la marca de nota), no por
  // mismoPadre(), que junta dos títulos con una palabra en común. Olympiacos 2025: "Δαπάνη παροχών ποδοσφαιριστών" (jugadores) y "Δαπάνη
  // παροχών λοιπών εργαζομένων" (otros empleados) comparten "Δαπάνη παροχών" y quedaban como una sola nota, así que "Εισφορές κοινωνικής
  // ασφάλισης" de los otros empleados (1,20 M) heredaba wages_squad sin pregunta. Lo que decide si son distintos de verdad es la compuerta
  // de abajo (dos categorías conocidas y distintas): dos variantes de un mismo título tienen la misma categoría y no preguntan.
  const padresPor = new Map(); const hijasPor = new Map();
  for (const r of raw) {
    const k = `${norm(r.label)}|${r.tside || ''}`; const pd = padreDe(r.origen) || 'estado';
    if (!padresPor.has(k)) padresPor.set(k, []); const ps = padresPor.get(k); if (!ps.some((x) => sinMarca(x) === sinMarca(pd))) ps.push(pd);
    const kh = `${sinMarca(pd)}|${r.tside || ''}`; if (!hijasPor.has(kh)) hijasPor.set(kh, []); hijasPor.get(kh).push(r);
  }
  // "Distintos" = renglones de CATEGORÍA distinta (la del renglón del estado en el .categorias.json): bajo "Gastos de administración" y
  // "Gastos de ventas" (Fortaleza 2017, los dos admin_general_expense) la etiqueta significa lo mismo y no se pregunta; bajo la nota del
  // departamento de fútbol y la de administración (PAOK), no. Medido en prueba-completa + PAOK: sin esto, 9 documentos que cargaban
  // pasaban a la cola con ~60 preguntas (34 solo en Fortaleza 2017). Un renglón sin categoría conocida (un "Total ..." que no está en el
  // .categorias.json) no cuenta: hacen falta dos categorías conocidas y distintas.
  // ESCALERA DE LA CATEGORÍA DEL RENGLÓN. Escalón 0: la del propio renglón (.categorias.json o
  // precedente del club). Escalón 1: si no hay, la de las OTRAS filas que lo abren, si son al menos 2 y todas dicen lo mismo; no cuentan las
  // filas cuya etiqueta también está bajo otro renglón (son las que están en duda). Olympiacos 2025 (pág. 35): los renglones de la nota 6 no
  // están en el .categorias.json (solo las hojas); las otras filas de "jugadores" dan wages_squad y las de "otros empleados",
  // admin_general_expense. Solo propone: la fila en duda sigue yendo a la cola con su clave "etiqueta@renglón".
  const enVarios = (r) => (padresPor.get(`${norm(r.label)}|${r.tside || ''}`) || []).length > 1;
  const catPadre = (pd, lado) => {
    if (pd === 'estado') return 'estado';
    const propia = catDe(pd, lado).cat; if (propia) return propia;
    const cats = (hijasPor.get(`${sinMarca(pd)}|${lado || ''}`) || []).filter((h) => !enVarios(h)).map((h) => catDe(h.label, h.tside).cat);
    const unicas = new Set(cats); return cats.length >= 2 && unicas.size === 1 && cats[0] ? cats[0] : null;
  };
  const repetida = (r) => { const ps = padresPor.get(`${norm(r.label)}|${r.tside || ''}`) || []; return ps.length > 1 && new Set(ps.map((pd) => catPadre(pd, r.tside)).filter(Boolean)).size > 1; };
  const enCola = [];
  const ETIQUETA_GENERICA_RE = /^(?:[a-z]\)|\d+[.)]|[-•])?\s*(?:outros|outras|otros|otras|others|other|altri|altre)\s*(?:\(.*\))?$/;
  const nl0 = (l) => norm(l).trim();
  const filas = raw.map((r) => {
    const f = { label: r.label, page: r.page, native: r.native, ladoDoc: r.tside || null, origen: r.origen, ...(r.signoFijo !== undefined ? { signoFijo: r.signoFijo } : {}), ...catDe(r.label, r.tside, String(r.origen || '').startsWith('verificacion'), padreDe(r.origen)) };
    if (repetida(r)) {
      const pd = padreDe(r.origen) || 'estado';
      const p = precedenteFamilia(lineasClub, clubId, r.tside || null, r.label, { padre: pd });
      if (p?.via === 'exacto-con-contexto' && !delOtroLado(p.cat, r.tside)) Object.assign(f, { cat: p.cat, conf: 1, escalon: 0, fuenteCat: `precedente del club con la misma nota ("${pd}"): la etiqueta está bajo renglones de categoría distinta`, enLista: true });
      else Object.assign(f, { conf: 0, escalon: 2, fuenteCat: `la etiqueta está bajo renglones de categoría distinta; la categoría por etiqueta (${f.cat || 'ninguna'}) no decide para la fila de "${pd}"`, enLista: true, ...(f.cat ? {} : { cat: r.tside === 'revenue' ? 'other_income' : 'other_expenses' }) });
    }
    // COMPUERTA DEL LADO: la respuesta de Guido se aplica solo si su categoría es del MISMO
    // lado que la fila en el documento. Hasta la 373 se aplicaba por etiqueta en todos los años del club: en Fortaleza CEIF, "Auxilio de
    // transporte" es gasto en 2020 y 2023 (nómina) e ingreso en 2021-2024 (de la Dimayor), y "Comisiones" es gasto en 2024 e ingreso en 2025.
    // Si el lado no coincide, la fila sigue por la escalera (y, si no se resuelve, llega a la cola con su propia pregunta).
    // Categoría que trae un ajuste manual (la fila "Diferencia en el documento" de un ajuste `desglose`): escalón 0, gana siempre.
    if (r.catAjuste && ladoDeCat(r.catAjuste) === r.tside) Object.assign(f, { cat: r.catAjuste, conf: 1, escalon: 0, fuenteCat: 'ajuste manual (Admin/registros/ajustes-manuales.jsonl)', enLista: true });
    // AJUSTE MANUAL `categoria`: escalón 0, gana sobre todo, también sobre la compuerta del lado (es una
    // decisión explícita de Guido). Si la categoría es del OTRO lado, la fila se muda sin cambiar su efecto en el resultado: un ingreso de
    // 140 pasa a gasto de +140 (ganancia). Caso: Goiás 2023, la venta del 20% de la Liga Forte União como exceptional_items.
    const ajCat = ajustesDe(pdf).find((a) => a.campo === 'categoria' && norm(a.etiqueta) === norm(r.label) && ladoDeCat(a.valor));
    if (ajCat) {
      Object.assign(f, { cat: ajCat.valor, conf: 1, escalon: 0, fuenteCat: `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${ajCat.fecha}): ${ajCat.motivo}`, enLista: true, ladoRechazado: false });
      if (r.tside && ladoDeCat(ajCat.valor) !== r.tside) { f.signoFijo = f.signoFijo !== undefined ? -f.signoFijo : -Math.abs(f.native); f.ladoDoc = ladoDeCat(ajCat.valor); }
    }
    const claveBase = repetida(r) ? `${norm(r.label)}@${norm(padreDe(r.origen) || 'estado')}` : norm(r.label); // una pregunta por renglón
    let rg = (r.catAjuste || ajCat) ? null : respuestaCat(r.label, claveBase, padreDe(r.origen), r.tside, { familia: !aceptable(f) && !repetida(r), propuesta: f.cat }); let claveCola = claveBase;
    if (!ajCat && ((rg?.cat && r.tside && ladoDeCat(rg.cat) && ladoDeCat(rg.cat) !== r.tside) || (f.ladoRechazado && !rg))) { claveCola = `${claveBase}|${r.tside}`; rg = respuestaCat(r.label, claveCola, padreDe(r.origen), r.tside, { familia: !aceptable(f), propuesta: f.cat }); }
    if (rg?.cat) {
      Object.assign(f, { cat: rg.cat, conf: 1, escalon: 0, fuenteCat: 'respuesta de Guido en la cola', enLista: true, notaGuido: rg.nota });
      const lado = ladoDeCat(rg.cat);
      // segunda pasada de proponerConEscalera: la respuesta del otro lado muda la fila como el ajuste `categoria`
      if (voltearRespuestas && lado && r.tside && lado !== r.tside) { f.signoFijo = f.signoFijo !== undefined ? -f.signoFijo : -Math.abs(f.native); f.ladoDoc = lado; f.fuenteCat += ' (del otro lado: se muda sin cambiar su efecto, to-do 237 f)'; }
      if (lado && !aprendidasYa.includes(`"label":${JSON.stringify(r.label)},"padre":${JSON.stringify(padreDe(r.origen))},"glosa":null,"categoria":${JSON.stringify(rg.cat)},"confianza":1`)) appendFileSync(ARCHIVO_APRENDIDAS, JSON.stringify({ ts: new Date().toISOString(), club: clubId, year: year != null ? String(year) : null, lado, label: r.label, padre: padreDe(r.origen), glosa: null, categoria: rg.cat, confianza: 1, motivo: 'respuesta de Guido en la cola humana (cargar.mjs)', jevDecia: null, jevConf: null, modelo: 'guido', md: e.md }) + '\n');
    }
    if (rg?.choque) Object.assign(f, { conf: 0, escalon: 2, choque: rg.choque, fuenteCat: `${f.fuenteCat}; en ${rg.choqueDe} se aceptó ${rg.choque} con otra propuesta: no decide, segunda mirada (to-do 237 ad)` });
    if (rg?.descartar) { f.destino = 'excluida'; f.fuenteCat = 'Guido la descartó en la cola'; return f; }
    // "OUTROS" CON LA GENÉRICA DE SU LADO. Una etiqueta genérica de lista cerrada (Outros, Outras, Otros, Otras, Others, Other,
    // Altri, Altre; con o sin marca de lista o nota) cuya propuesta es la genérica de su lado (other_income / other_expenses) se carga sin
    // preguntar: no hay otra lectura posible de la fila. En el formato SNC cada nota cierra con "Outros" y eso solo eran 96 preguntas en
    // Portugal; backtest contra la cola: 34 de 34 respuestas de Portugal coinciden. COMPUERTA: el renglón que abre la fila no tiene una
    // categoría conocida distinta de la genérica (catPadre). Los 2 que no coinciden en la cola son justamente eso: Vila Nova 2025 "Outros"
    // de la nota "Despesas gerais e administrativas" (admin_general_expense) y Cremonese 2025 "altri". La etiqueta repetida (bajo dos
    // renglones, clave "outros@renglón") va con la misma regla y la misma compuerta, NO con la categoría del bloque: las 13 respuestas de
    // la cola dicen la genérica, también bajo "Gastos com pessoal" (Académica 2022-23), donde el bloque habría dado wages_squad. Una
    // respuesta de la cola gana igual (va antes).
    const GENERICA = (lado) => (lado === 'revenue' ? 'other_income' : lado === 'expense' ? 'other_expenses' : null);
    if (!rg?.cat && !ajCat && !aceptable(f) && r.tside && f.cat && f.cat === GENERICA(r.tside) && ETIQUETA_GENERICA_RE.test(nl0(r.label))) {
      const cp = catPadre(padreDe(r.origen) || 'estado', r.tside);
      if (!cp || cp === 'estado' || cp === f.cat) Object.assign(f, { conf: 1, escalon: 'generica', fuenteCat: `${f.fuenteCat} · etiqueta genérica con la genérica de su lado (to-do 237 n)` });
    }
    const nl = norm(r.label);
    const verificadaConLado = String(r.origen || '').startsWith('verificacion') && !!r.tside;
    // Una fila que NO está en la lista de rubros de la etapa 3 y de la que el documento no dice el lado: la etapa 3 la descartó como no-rubro
    // (partidas de balance, cuadros de bienes de uso que el ancla abrió por error). No se carga y no cuenta como "sin categoría".
    if (r.destinoForzado) f.destino = r.destinoForzado; // proceso nuevo: financiero / impuesto decididos por extraer.mjs
    else if (!f.enLista && !f.ladoDoc) f.destino = 'no-rubro';
    // Resultado financiero e impuesto a las ganancias: al fiscalYearMeta, salvo que el precedente del club diga otra cosa (su convención).
    // DESTINO POR PALABRAS (escalón b de "lo que cerró en la etapa 6 no se vuelve a decidir"): "impuesto" / "intereses" en la
    // etiqueta mueven a impuesto o financiero solo una fila SIN lado. Una fila que viene de la verificación con lado ya cerró de ese lado.
    // Casos: Fortaleza 2025 "Impuestos" 11.98 (gasto del equipo profesional) iba a impuesto a las ganancias; 2019 "Intereses por mora"
    // 55.745 (otros ingresos) iba a financiero.
    else if (!verificadaConLado && f.escalon !== 0 && (IMPUESTO_GANANCIAS_RE.test(nl) || IMPUESTO_SOLO_RE.test(nl))) f.destino = 'tax';
    else if (!verificadaConLado && f.escalon !== 0 && FINANCIERO_RE.test(nl) && (!f.cat || f.cat === 'no_es_rubro' || ['other_income', 'other_expenses', 'exceptional_items', 'admin_general_expense'].includes(f.cat))) f.destino = 'netInterest';
    else if (f.cat === 'no_es_rubro') f.destino = 'excluida';
    else if (!f.cat || !ladoDeCat(f.cat)) f.destino = 'sin-categoria';
    else if (!aceptable(f)) {
      // a la cola (ver CATEGORÍA DUDOSA arriba); en las sumas cuenta con la categoría propuesta
      const nombre = NOMBRE_CAT[f.cat] || f.cat;
      f.casoCola = ({ pdf, md: e.md, etapa: 'cargar', motivo: 'categoria', detalle: claveCola, categoriaPropuesta: f.cat, pagina: r.page || null,
        que: `¿"${r.label}" (${Math.abs(r.native)} en millones de la moneda del documento) va como "${nombre}"?  (por qué: la categorización le dio ${f.conf ?? '?'} de confianza, menos que el mínimo ${UMBRAL_CLAUDE}${f.choque ? `; en otro año del club se aceptó como "${NOMBRE_CAT[f.choque] || f.choque}"` : ''})`,
        propuesta: `sí (responder aceptar si estás de acuerdo; si no, corregir --valor <categoría> con una de data/category-map.js)` });
      enCola.push(f); f.enCola = true; f.destino = ladoDeCat(f.cat);
    }
    else f.destino = ladoDeCat(f.cat);
    if ((f.destino === 'revenue' || f.destino === 'expense') && f.ladoDoc && f.ladoDoc !== f.destino) f.ladoContradictorio = true;
    return f;
  });
  P.filas = filas;
  // ESCALÓN DE MATERIALIDAD (pedido de Guido: "si lo que queda en duda representa 1% o menos del total, bajalo a
  // 60%; si son muchas dudas distintas y suman más de 1% de su lado, cola"). Después de todos los escalones de la categorización: por lado
  // (ingresos / gastos), si la suma de TODAS las filas en duda de ese lado es como mucho el 1% del total de ese lado (COMPUERTA), las que
  // tienen confianza 0,60 o más se cargan con su categoría y una nota; las de menos de 0,60 siguen a la cola. Si la suma pasa el 1%, todas a
  // la cola, como antes. Medido al proponerlo: en Fortaleza CEIF ningún año lo pasaba (las dudas iban de 3,4% a 99,7% de su lado).
  for (const lado of ['revenue', 'expense']) {
    const total = filas.filter((f) => f.destino === lado).reduce((a, f) => a + Math.abs(f.native || 0), 0);
    const dudas = enCola.filter((f) => f.destino === lado); const enDuda = dudas.reduce((a, f) => a + Math.abs(f.native || 0), 0);
    if (!dudas.length || !total || enDuda > 0.01 * total) continue;
    for (const f of dudas.filter((x) => (x.conf ?? 0) >= 0.6)) {
      enCola.splice(enCola.indexOf(f), 1); f.enCola = false; f.casoCola = null; f.escalon = 'materialidad';
      f.fuenteCat = `${f.fuenteCat} · escalón de materialidad: las dudas de ${lado === 'revenue' ? 'ingresos' : 'gastos'} suman ${(100 * enDuda / total).toFixed(2)}% (≤ 1%) y esta tiene ${f.conf}`;
      P.avisos.push(`materialidad: "${f.label}" va como ${f.cat} con ${f.conf} (las dudas de ${lado === 'revenue' ? 'ingresos' : 'gastos'} suman ${(100 * enDuda / total).toFixed(2)}% de su lado)`);
    }
  }
  for (const f of enCola) if (f.casoCola) agregarCaso(f.casoCola);
  for (const f of filas) delete f.casoCola; // (no va al .carga.json)
  if (enCola.length) frena('categoria-en-cola', `${enCola.length} fila(s) esperan categoría en la cola humana (node tools/cola.mjs): ${enCola.slice(0, 5).map((f) => `"${f.label.slice(0, 40)}" -> ${f.cat} ${f.conf ?? ''}`).join('; ')}`);

  // ---- 4b. CATEGORÍAS EN 0 -> REINTENTO (diseño aprobado por Guido; camino de error, solo con --desde-verificacion). Medido sobre
  // 241 años cargados: salarios del plantel nunca es 0, televisión 2%, estadio 1%: un 0 ahí es un desglose perdido (UC 2025, costo de ventas
  // sin abrir). Cuotas sociales (46% de ceros) y otras secciones deportivas (63-68%) solo cuentan si el perfil del club dice que tiene socios /
  // otros deportes (tools/perfil-clubes.mjs). Si el perfil no lo sabe, la pregunta va a la cola (sí o no) y su respuesta queda en el perfil.
  // Un documento con una línea "sin desglosar por la fuente" no se revisa (ya se sabe que no abre). Un documento ya reintentado
  // (.ubicacion.json con indiceAmpliado) no se vuelve a reintentar: se carga con aviso.
  // INCLUIDO EN: ajustes `incluye` del documento -> fiscalYearMeta.incluidoEn ({ member_dues: 'matchday_competition' }, o
  // { member_dues: { en: 'other_income', posible: true } } si no está confirmado). Lo lee la vista simplificada (js/finanzas-calc.js bucketize).
  const incluidoEn = Object.fromEntries(ajustesDe(pdf).filter((a) => a.campo === 'incluye' && a.valor && a.categoria).map((a) => [a.valor, a.posible ? { en: a.categoria, posible: true } : a.categoria]));
  {
    const conCat = filas.filter((f) => (f.destino === 'revenue' || f.destino === 'expense') && f.cat);
    const suma = (cats) => conCat.filter((f) => cats.includes(f.cat)).reduce((a, f) => a + Math.abs(f.native || 0), 0);
    const yaReintentado = (() => { try { const v = JSON.parse(readFileSync(resolve(ROOT, derivado(e.md, '.ubicacion.json', { crear: false })), 'utf8')).indiceAmpliado; return Number(v === true ? 1 : v || 0) >= VERSION_AMPLIADO; } catch { return false; } })();
    const ceros = [];
    // un año sin ingresos (estado belga abreviado con la Brutomarge negativa, ver el paso 6b) no tiene televisión ni estadio que buscar.
    const sinIngresosNBB = ingresosVerif != null && Math.abs(Number(ingresosVerif)) < 1e-9 && /escalón "códigos NBB"/.test(notasVerif.join(' '));
    // una fila "sin desglosar por la fuente" apaga SOLO los avisos de SU lado: ingresos sin desglosar ->
    // no se revisan televisión, estadio, cuotas sociales ni otros deportes; gastos sin desglosar -> no se revisa sueldos del plantel. Hasta la
    // 404 cualquier fila lump_ apagaba todo. Caso: Fortaleza 2017, "Actividades Deportivas" (ingresos, 4.220,7) sin desglosar apagaba el aviso
    // de sueldos en 0, y los sueldos (nota 21, "Sueldos 705.432") quedaron adentro de "Total Gastos de Administración".
    const lumpIng = conCat.some((f) => f.destino === 'revenue' && /^lump_/.test(f.cat)); const lumpGas = conCat.some((f) => f.destino === 'expense' && /^lump_/.test(f.cat));
    {
      for (const { nombre, cats, lado } of CEROS.filter((x) => x.lado)) if (!(lado === 'gasto' ? lumpGas : (lumpIng || sinIngresosNBB)) && !suma(cats) && !cats.some((c) => incluidoEn[c]) /* un incluye sobre una de las tres del estadio alcanza: el estadio está dentro de otra línea */) ceros.push({ categoria: nombre, lado }); // el lado lo usa verificar.mjs
      // (decisión de Guido: "que cada 5 años se chequee, y ahí se puede ir para atrás y corregir") EL PERFIL POR AÑO:
      // vale el chequeo más cercano dentro de la ventana (tools/perfil-clubes.mjs, perfilVigente); la respuesta de la cola puede venir de
      // CUALQUIER documento del club dentro de la ventana (antes, solo la de este documento: 391 casos para 181 preguntas). Un chequeo nuevo
      // que contradice al más cercano abre una revisión de los años cargados entre los dos (motivo perfil-cambio; no frena).
      const registrarPerfil = (campo, nombre, v, ev, fuente, anioCh) => {
        const ant = perfilCercano(clubId, campo, anioCh, { excepto: anioCh });
        guardarPerfil(clubId, campo, v, ev, fuente, anioCh);
        if (ant && ant.valor !== v) {
          const [a, b] = [Math.min(ant.anio, anioCh), Math.max(ant.anio, anioCh)];
          const entre = Object.keys(cd.fiscalYearMeta || {}).map(Number).filter((y) => y > a && y < b).sort((x, y) => x - y);
          agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'perfil-cambio', detalle: `${clubId}:${campo}:${anioCh}`, anio: anioCh,
            que: `El perfil de ${club.name || clubId} cambió: ${campo === 'socios' ? 'socios' : 'otros deportes'} = ${ant.valor ? 'sí' : 'no'} en ${ant.anio} y ${v ? 'sí' : 'no'} en ${anioCh}. Revisar los años cargados entre los dos (${entre.join(', ') || 'ninguno'}): "${nombre}" en 0 se dio por ${ant.valor ? 'desglose perdido' : 'real'} con el chequeo viejo.`,
            propuesta: 'aceptar si esos años están bien; si no, corregir --valor "<año desde el que cambió>"' });
        }
      };
      const sn = (x) => (/^s[ií]/i.test(String(x)) ? true : /^no/i.test(String(x)) ? false : undefined);
      const respPerfil = (campo, nombre) => {
        const rs = respuestasDonde('cargar', 'perfil', (c) => c.detalle === `${clubId}:${campo}`)
          .map(({ caso, resp }) => ({ caso, resp, v: resp.decision === 'corregir' ? sn(resp.valor) : undefined, anio: caso.anio ?? anioDeDoc(caso.pdf) }))
          .filter((x) => x.v !== undefined && x.anio && Math.abs(x.anio - year) < VENTANA_PERFIL)
          .sort((a, b) => Math.abs(a.anio - year) - Math.abs(b.anio - year) || String(b.resp.ts).localeCompare(String(a.resp.ts)));
        const r = rs[0]; if (!r) return undefined;
        const ya = perfilVigente(clubId, campo, r.anio);
        if (!(ya && ya.anio === r.anio && ya.valor === r.v)) registrarPerfil(campo, nombre, r.v, `respuesta ${r.caso.id} en la cola (${r.resp.nota || 'sin nota'})`, 'guido-cola', r.anio);
        return r.v;
      };
      for (const [campo, nombre, catsIng, catsGas, pregunta] of CEROS.filter((x) => x.perfil).map((x) => [x.perfil.campo, x.nombre, x.perfil.catsIng, x.perfil.catsGas, x.perfil.pregunta(club.name || clubId)])) {
        if (lumpIng || suma(catsIng) || (catsGas.length && suma(catsGas))) continue;
        // ajuste `incluye`: la categoría está dentro de otra línea (el documento las junta): no es un 0 a revisar ni una pregunta.
        if (catsIng.every((c) => incluidoEn[c]) && catsGas.every((c) => incluidoEn[c])) { P.avisos.push(`"${nombre}" da 0 porque está incluida en otra línea (ajuste manual \`incluye\`)`); continue; }
        let tiene = perfilVigente(clubId, campo, year)?.valor; if (tiene === undefined || tiene === null) tiene = respPerfil(campo, nombre);
        // FORMA JURÍDICA: una ΠΑΕ (Ποδοσφαιρική Ανώνυμη Εταιρεία) es por ley una sociedad solo de
        // fútbol, con accionistas y no socios; las 12 griegas contestadas en la cola dieron "no" y "no". UNA compuerta: la forma está en la
        // PORTADA del documento (hasta la pág. 3 del visor), y esa línea es la cita (la portada nombra a quien presenta el balance; no se busca el
        // nombre del club porque está en griego y el del sitio en latín). Solo ΠΑΕ: la SAF brasileña no sirve (Cuiabá y Ferroviária tienen
        // socios) y Italia ya está contestada. Sin la cita, sigue a la cola. Caso: Athens Kallithea (balance del municipio) no la tiene.
        if (tiene === undefined || tiene === null) {
          const cita = citaPAE(readFileSync(resolve(ROOT, e.md), 'utf8'));
          if (cita) {
            const ev = `forma jurídica ΠΑΕ en la portada: ${e.md} L${cita.linea} "${cita.texto}" (cargar.mjs, to-do 232 c)`;
            registrarPerfil(campo, nombre, false, ev, 'forma-juridica', year); tiene = false;
            cerrarPerfilSabido(`${clubId}:${campo}`, `resuelto por la forma jurídica: ${ev}`);
            P.avisos.push(`"${nombre}" en 0: real (${clubId} es una ΠΑΕ, sin ${campo === 'socios' ? 'socios' : 'otros deportes'}; ${e.md} L${cita.linea})`);
          }
        }
        // SAD/SDUQ portuguesa en la portada: el 0 es real en ESTE documento; no se guarda en el perfil del club (ver citaSADpt).
        if ((tiene === undefined || tiene === null) && /^Clubes\/Portugal\//.test(pdf)) {
          const cita = citaSADpt(readFileSync(resolve(ROOT, e.md), 'utf8'));
          if (cita) { tiene = false; P.avisos.push(`"${nombre}" en 0: real en este documento (lo presenta una SAD/SDUQ, solo fútbol profesional: ${e.md} L${cita.linea} "${cita.texto}"; to-do 237 y)`); }
        }
        if (tiene === true) ceros.push({ categoria: nombre });
        else if (tiene === undefined || tiene === null) {
          // UNA pregunta por club, campo y tramo: si otro documento del club ya la tiene abierta dentro de la ventana, no se abre otra.
          const abierta = pendientes().find((c) => c.etapa === 'cargar' && c.motivo === 'perfil' && c.detalle === `${clubId}:${campo}` && c.pdf !== pdf && Math.abs((c.anio ?? anioDeDoc(c.pdf) ?? 0) - year) < VENTANA_PERFIL);
          // NUNCA frena la carga: un caso de perfil se contesta googleando el club (club-or-year-onboarding, «La cola»); mientras tanto el 0 queda con este aviso
          if (abierta) P.avisos.push(`perfil-en-cola (no frena): "${nombre}" da 0 y el perfil del club no dice si tiene ${campo === 'socios' ? 'socios' : 'otros deportes'} en ${year}: la pregunta ya está en la cola por ${abierta.pdf.split('/').pop()} (${abierta.id}) y vale para este año`);
          else {
            const prev = perfilCercano(clubId, campo, year);
            agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'perfil', detalle: `${clubId}:${campo}`, anio: year, que: `${pregunta}  (por qué: en ${year} "${nombre}" da 0; si el club tiene, falta un desglose y se reintenta; si no tiene, el 0 es real. Vale para los años a menos de ${VENTANA_PERFIL} de ${year}.${prev ? ` Último chequeo: ${prev.valor ? 'sí' : 'no'} en ${prev.anio}.` : ''})`, propuesta: 'responder corregir --valor sí | corregir --valor no (o mandar un agente a buscar)' });
            P.avisos.push(`perfil-en-cola (no frena): "${nombre}" da 0 y el perfil del club no dice si tiene ${campo === 'socios' ? 'socios' : 'otros deportes'} en ${year}: pregunta en la cola; se contesta googleando el club y, si el club tiene, se reintenta (node tools/cola.mjs)`);
          }
        }
      }
    }
    // ESCALÓN 0 DEL AVISO: un ajuste manual `cero-real` de Guido para esa categoría dice que el 0 es real (tools/ajustes.mjs).
    for (const c of [...ceros]) { const aj = ajusteDe(pdf, 'cero-real') && ajustesDe(pdf).find((x) => x.campo === 'cero-real' && String(x.valor).toLowerCase() === c.categoria.toLowerCase()); if (aj) { ceros.splice(ceros.indexOf(c), 1); P.avisos.push(`"${c.categoria}" en 0: real, por ajuste manual (${aj.fecha}, ${aj.motivo})`); } }
    // ESCALÓN 0b DEL AVISO: el `cero-real` de esa categoría en OTRO documento del club vale para este
    // año, con UNA compuerta: ningún año cargado del club tiene esa categoría con monto (si alguno la tuvo, el 0 puede ser un desglose perdido
    // y sigue pidiendo reintento). Caso: Tallinna Kalev, "Televisión" en 0 con 7 ajustes, uno por año; 94 ajustes `cero-real` para 36
    // combinaciones de club y categoría.
    const CATS_CERO = Object.fromEntries(CEROS.map((x) => [x.nombre.toLowerCase(), x.cats]));
    const conMontoEnElClub = (cats) => ['revenueLinesByYear', 'expenseLinesByYear'].some((k) => Object.values(cd[k] || {}).some((ls) => (ls || []).some((l) => cats.includes(l.normalizedCategory) && Math.abs(l.amountNative || 0) > 0)));
    for (const c of [...ceros]) {
      const cats = CATS_CERO[c.categoria.toLowerCase()]; if (!cats) continue;
      const aj = ceroRealDelClub(pdf, c.categoria);
      if (aj && !conMontoEnElClub(cats)) { ceros.splice(ceros.indexOf(c), 1); P.avisos.push(`"${c.categoria}" en 0: real, por el ajuste cero-real del club (${aj.pdf.split('/').pop()}, ${aj.fecha}) y ningún año cargado la tiene con monto`); }
    }
    // ESCALÓN 1 DEL AVISO: un ejercicio que cierra dentro de la ventana COVID (period_end del 2020-03-31 al 2021-12-31, regla de
    // Admin/CONVENCIONES-DATOS.md, votación 3 a 0) jugó con partidos suspendidos, a puertas cerradas o con aforo limitado: la taquilla o las
    // entradas en 0 (la fila de ceros cuyas categorías son matchday o abonos; en fútbol, "Estadio") son reales y no piden reintento.
    // Sin cierre conocido queda la regla anterior (el año 2021). Se apaga por documento con el ajuste `covid-omitir`.
    // Casos: AEK 2021, Asteras 2021 (reintento pagado para nada).
    const cierreCovid = alta.ejercicio.cierre || null;
    const enVentanaCovid = cierreCovid ? (cierreCovid >= '2020-03-31' && cierreCovid <= '2021-12-31') : String(year) === '2021';
    if (enVentanaCovid && !ajusteDe(pdf, 'covid-omitir')) {
      const CATS_TAQUILLA = ['matchday_competition', 'season_tickets'];
      for (const c of [...ceros]) if ((CATS_CERO[c.categoria.toLowerCase()] || []).some((x) => CATS_TAQUILLA.includes(x))) { ceros.splice(ceros.indexOf(c), 1); P.avisos.push(`"${c.categoria}" en 0 con cierre ${cierreCovid || `en ${year}`}, dentro de la ventana COVID: real (partidos suspendidos, a puertas cerradas o con aforo limitado)`); }
    }
    if (ceros.length && !yaReintentado) { P.reintentar = ceros; frena('reintento', `categorías en 0 que deberían tener número: ${ceros.map((c) => c.categoria).join(', ')}. Reintento (una vez): node tools/lote.mjs --lista <lista> --ejecutar --reintentar`); }
    else if (ceros.length) P.avisos.push(`categorías en 0 aun después del reintento (se carga así): ${ceros.map((c) => c.categoria).join(', ')}`);
  }
  const suma = (arr) => arr.reduce((a, x) => a + Math.abs(x.native || 0), 0);
  // UNA FILA QUE NADIE MIRÓ. Una fila sin categoría aceptable que pesa menos del tope (MAX_SIN_CAT) es aviso y no se carga.
  // Eso vale para una fila que la categorización MIRÓ y no decidió; no para una que nunca vio: AEK 2024, la verificación abrió las entradas en
  // su nota ("Έσοδα από διεθνείς διοργανώσεις", 1,87 M, pág. 41) después de la etapa 5, el .categorias.json era del día anterior, y la fila
  // se cayó con un aviso (3,2% de los ingresos); solo frenó el tie-out del resultado, sin decir qué fila faltaba. Escalón antes del tope,
  // con UNA compuerta: la fila está impresa en el documento (tiene página), no está en el .categorias.json y nada le dio categoría
  // (precedente, cola, ajuste) -> frena con su nombre. Las "Diferencia de redondeo" de una nota (verificar.mjs, sin página) no entran.
  const nuncaVistas = filas.filter((f) => f.destino === 'sin-categoria' && !f.enLista && !f.cat && f.page != null);
  if (nuncaVistas.length) frena('categorizacion', `${nuncaVistas.length} fila(s) impresa(s) que no están en el .categorias.json (la verificación las abrió después de categorizar): ${nuncaVistas.slice(0, 4).map((f) => `"${f.label.slice(0, 50)}" ${r6(f.native)} (pág. ${f.page})`).join('; ')}. Volver a correr la etapa 5 o categorizarlas en la cola (node tools/cola.mjs --corregir-categoria)`);
  for (const side of ['revenue', 'expense']) {
    const delLado = filas.filter((f) => f.destino === side || ((f.destino === 'sin-categoria' || f.destino === 'confianza-baja') && (f.ladoDoc || ladoDeCat(f.cat) || 'revenue') === side));
    const sin = delLado.filter((f) => f.destino !== side);
    const share = suma(delLado) ? suma(sin) / suma(delLado) : 0;
    if (sin.length) P.avisos.push(`${side === 'revenue' ? 'ingresos' : 'gastos'}: ${sin.length} fila(s) sin categoría aceptable (${(share * 100).toFixed(1)}% del dinero del lado): ${sin.slice(0, 5).map((f) => `"${f.label.slice(0, 50)}" (${f.enLista ? `${f.cat || 'null'} ${f.conf ?? ''}` : 'no está en categorias.json'})`).join('; ')}`);
    if (share > MAX_SIN_CAT) frena('categorizacion', `${(share * 100).toFixed(1)}% del dinero de ${side === 'revenue' ? 'ingresos' : 'gastos'} queda sin categoría aceptable (tope ${(MAX_SIN_CAT * 100).toFixed(0)}%): ${sin.slice(0, 3).map((f) => `"${f.label.slice(0, 40)}" ${r6(f.native)} (${f.enLista ? `${f.cat || 'null'} ${f.conf ?? ''}` : 'no está en categorias.json'})`).join('; ')}`);
  }
  const contra = filas.filter((f) => f.ladoContradictorio);
  if (contra.length) P.avisos.push(`${contra.length} fila(s) con categoría de un lado y el documento del otro: ${contra.slice(0, 4).map((f) => `"${f.label.slice(0, 40)}" -> ${f.cat}`).join('; ')}`);
  const noRubro = filas.filter((f) => f.destino === 'no-rubro');
  if (noRubro.length) P.avisos.push(`${noRubro.length} fila(s) elegidas por proponer-carga que la etapa 3 no tiene como rubro y sin lado (no se cargan): ${noRubro.slice(0, 4).map((f) => `"${f.label.slice(0, 30)}"`).join(', ')}`);

  // ---- 5. signos
  const rev = filas.filter((f) => f.destino === 'revenue'); const exp = filas.filter((f) => f.destino === 'expense');
  // POR TABLA DE ORIGEN, no por documento (bug de la primera versión, PSV 2020): el estado principal imprime "Afschrijving op
  // vergoedingssommen -22.305" con signo y la nota de gastos "Wedstrijdkosten 5.113" sin signo; mirando el documento entero ganaba "sin
  // signo" y la amortización quedaba POSITIVA. Cada tabla decide por la mayoría de SUS filas de gasto (y de ingreso).
  const tablaDe = (f) => String(f.origen || '').replace(/\s*\(ancla.*$/, '');
  const conSigno = new Map(); const revInv = new Map();
  for (const k of new Set(filas.map(tablaDe))) {
    const e2 = exp.filter((f) => tablaDe(f) === k); const r2 = rev.filter((f) => tablaDe(f) === k);
    conSigno.set(k, e2.length ? e2.filter((f) => f.native < 0).length >= e2.length / 2 : true);
    revInv.set(k, r2.length >= 2 && r2.filter((f) => f.native < 0).length > r2.length / 2);
  }
  // Un gasto suelto (una sola fila de gasto en su tabla) no alcanza para decidir: toma lo que diga el resto del documento.
  const expDoc = exp.length ? exp.filter((f) => f.native < 0).length >= exp.length / 2 : true;
  for (const k of conSigno.keys()) if (exp.filter((f) => tablaDe(f) === k).length === 1) conSigno.set(k, expDoc);
  for (const f of rev) f.amountNative = r6(f.signoFijo !== undefined ? f.signoFijo : revInv.get(tablaDe(f)) ? -f.native : f.native);
  const gastosConSigno = expDoc;
  P.signos = { porTabla: Object.fromEntries([...conSigno].map(([k, v]) => [k, v ? 'gastos con signo' : 'gastos sin signo (se invierten)'])) };
  const metaFilas = filas.filter((f) => f.destino === 'netInterest' || f.destino === 'tax');
  const ventaJugadoresFilas = filas.filter((f) => f.destino === 'profitOnPlayerSales'); // ajuste `fila` con destino profit_on_player_sales (Auditora 5)
  // DOS LECTURAS DE SIGNO PARA LOS GASTOS, y la que haga cerrar el resultado impreso gana (si ninguna cierra, se queda la primera y frena):
  //   'por tabla'          la mayoría de las filas de gasto de cada tabla decide si esa tabla imprime los gastos con signo;
  //   'todos negativos'    -|x| para todo gasto. Existe por los estados que MEZCLAN presentaciones en la misma tabla (PSV 2020: "Kostprijs
  //                        van de omzet 3.793" sin signo arriba de "Som der bedrijfslasten" y "Afschrijving op vergoedingssommen -22.305"
  //                        con signo más abajo): ninguna mayoría por tabla acierta las dos.
  // Y dos para el resultado financiero y el impuesto: como sus gastos vecinos, o por las palabras de la etiqueta (gasto/pérdida -> negativo).
  const signoPorPalabras = (f) => (GASTOS_RE.test(norm(f.label)) || /aufwend|expense|cost|charge|gasto|despesa|omkostning|kostnad|udgift|verlust|loss|perdida|negativ/.test(norm(f.label)) || f.destino === 'tax' ? -Math.abs(f.native) : Math.abs(f.native));
  const lecturasGasto = [
    // Cada fila trae el signo que verificó verificar.mjs: un gasto es −M (M negativo = reduce el gasto).
    { nombre: 'signos de la verificación', v: (f) => (f.signoFijo !== undefined ? -f.signoFijo : (conSigno.get(tablaDe(f)) ? f.native : -f.native)) },
    { nombre: 'gastos por tabla', v: (f) => (conSigno.get(tablaDe(f)) ? f.native : -f.native) },
    { nombre: 'gastos todos negativos', v: (f) => -Math.abs(f.native) },
  ];
  const lecturasMeta = [
    { nombre: 'financiero/impuesto como su tabla', v: (f) => ((conSigno.get(tablaDe(f)) ?? gastosConSigno) ? f.native : (f.ladoDoc === 'revenue' ? f.native : -f.native)) },
    { nombre: 'financiero/impuesto por palabras', v: signoPorPalabras },
  ];

  // ---- 6. totales y tie-out
  const revSum = rev.reduce((a, f) => a + f.amountNative, 0);
  const impresos = [];
  // Solo cuentan como "total impreso" los importes de tablas de ESTADO (título o lado de estado de resultados) y de las notas que abrió el
  // ancla: una coincidencia con un número de un cuadro de bienes de uso o del flujo de fondos sería casualidad, no un tie-out.
  const notasUsadas = new Set((sf.extra?.notasUsadas || []).map(String));
  for (const t of sf.pts || []) for (const r of t.nums || []) if (r.M !== null && r.M !== undefined && !t.noPL && (t.isStatement || t.primary || notasUsadas.has(String(t.idx)))) impresos.push({ label: r.label, M: r.M, page: t.page, tabla: t.idx, esSuma: t.sums?.has(r.i), esTotal: TOTAL_RE.test(norm(r.label)) });
  for (const c of sf.totalCands || []) impresos.push({ label: c.label, M: c.M, page: c.page, tabla: c.how, esSuma: c.how === 'suma', esTotal: true });
  const esTotalDe = (x) => x.esSuma || x.esTotal || TOTAL_INGRESOS_RE.test(norm(x.label));
  const unidadMax = Math.max(0, ...(sf.pts || []).map((t) => t.unit || 0));
  const buscar = (objetivo, n, filtro = esTotalDe) => {
    const cands = impresos.filter(filtro).map((x) => ({ ...x, d: Math.abs(Math.abs(x.M) - Math.abs(objetivo)) })).sort((a, b) => a.d - b.d);
    const exacto = cands.find((x) => x.d < TOL);
    const redondeo = !exacto ? cands.find((x) => x.d < Math.max(TOL, 0.0006 * Math.abs(objetivo), 0.5 * n * unidadMax)) : null;
    return { exacto, redondeo };
  };
  // 6a. RESULTADO DEL EJERCICIO primero: ingresos + gastos + netInterest + tax contra el resultado impreso. Es el chequeo más fuerte (un solo
  // número, club-data-mapping §6.2) y el que permite dar por verificado un total de ingresos o de gastos que el documento no imprime.
  const patImpresos = impresos.filter((x) => RESULTADO_EJERCICIO_RE.test(norm(x.label).replace(/^\**\s*(\(?[0-9]{1,2}[a-z]?[.)]|[a-z][.)]|[ivxl]{1,5}[.)]?\s*[-–.])\s*/, '')) && !ANTES_IMPUESTOS_RE.test(norm(x.label)));
  if (sf.docResult !== null && sf.docResult !== undefined) patImpresos.push({ label: 'resultado detectado por proponer-carga', M: sf.docResult, page: null });
  // `extra`: la suma de las filas de redondeo (decisión 3 de Guido, ver lado() más abajo); 0 en la primera búsqueda. `soloG`: fija la lectura
  // de signos de los gastos (la segunda búsqueda no puede cambiarla: las filas de redondeo se calcularon con la primera).
  const buscarPat = (extra = 0, soloG = null) => {
    let meta = null; let cierraPat = null; let lecturaGasto = soloG || lecturasGasto[0];
    busqueda: for (const G of soloG ? [soloG] : lecturasGasto) for (const L of lecturasMeta) {
      const expTodoG = exp.filter((f) => f.origen !== 'redondeo').reduce((a, f) => a + G.v(f), 0);
      const ni = metaFilas.filter((f) => f.destino === 'netInterest').reduce((a, f) => a + L.v(f), 0);
      const tx = metaFilas.filter((f) => f.destino === 'tax').reduce((a, f) => a + L.v(f), 0);
      const ps = ventaJugadoresFilas.reduce((a, f) => a + f.native, 0); // tal cual impreso, con su signo (+8,50 / −0,297)
      const pat = revSum + expTodoG + ni + tx + ps + extra;
      if (!meta) meta = { netInterest: r6(ni), tax: r6(tx), profitOnPlayerSales: r6(ps), pat: r6(pat) };
      for (const x of patImpresos) {
        const impreso = Math.abs(x.M - pat) < TOL ? x.M : (PERDIDA_RE.test(norm(x.label)) && x.M > 0 && Math.abs(-x.M - pat) < TOL) ? -x.M : null;
        if (impreso !== null) { meta = { netInterest: r6(ni), tax: r6(tx), profitOnPlayerSales: r6(ps), pat: r6(pat) }; cierraPat = { lectura: `${G.nombre}; ${L.nombre}`, impreso: x, valor: impreso, L }; lecturaGasto = G; break busqueda; }
      }
    }
    return { meta, cierraPat, lecturaGasto };
  };
  let { meta, cierraPat, lecturaGasto } = buscarPat();
  // ESCALÓN p2: un rótulo financiero ("Intereses") contestado no_es_rubro en la cola con el lado del documento a la vista, que
  // no es una línea de ingreso ni de gasto (club-data-mapping §2: los intereses van al resultado financiero) y que el resultado impreso
  // necesita: si ninguna lectura cerró, las filas así pasan a netInterest con su signo y se vuelve a buscar. Compuerta: cierra el resultado
  // impreso; si no cierra, vuelven a excluidas. Caso: Boyacá Chicó 2025 (Intereses L839 de ingreso y L999 de gasto, mismo rótulo).
  if (!cierraPat && patImpresos.length) {
    const candFin = filas.filter((f) => f.destino === 'excluida' && f.cat === 'no_es_rubro' && f.ladoDoc && FINANCIERO_RE.test(norm(f.label)));
    if (candFin.length) {
      for (const f of candFin) f.destino = 'netInterest';
      metaFilas.push(...candFin);
      const b2 = buscarPat();
      if (b2.cierraPat) { ({ meta, cierraPat, lecturaGasto } = b2); P.avisos.push(`resultado financiero: ${candFin.map((f) => `"${f.label}" ${f.native} (${f.ladoDoc === 'revenue' ? 'ingreso' : 'gasto'})`).join('; ')} contestado no_es_rubro en la cola pasa al resultado financiero: con eso cierra el resultado impreso (to-do 298 p2)`); }
      else { for (const f of candFin) f.destino = 'excluida'; metaFilas.length -= candFin.length; }
    }
  }
  for (const f of exp) f.amountNative = r6(lecturaGasto.v(f));
  P.signos.elegida = cierraPat ? cierraPat.lectura : `${lecturaGasto.nombre} (ninguna lectura cerró el resultado)`;
  const expSinExc = exp.filter((f) => f.cat !== 'exceptional_items').reduce((a, f) => a + f.amountNative, 0);
  const expTodo = exp.reduce((a, f) => a + f.amountNative, 0);
  const T = { revSum: r6(revSum), expSum: r6(expSinExc), officialTotalRevenue: null, officialTotalExpenses: null, officialPAT: null, verificacion: {} };
  if (!meta) meta = { netInterest: 0, tax: 0, profitOnPlayerSales: 0 };
  if (cierraPat) { T.officialPAT = r6(cierraPat.valor); T.patImpreso = { label: cierraPat.impreso.label, pag: cierraPat.impreso.page, M: cierraPat.impreso.M, signos: cierraPat.lectura }; T.verificacion.pat = 'impreso'; }
  else if (patImpresos.length && rev.length) frena('tie-out-resultado', `resultado: ingresos ${r6(revSum)} + gastos ${r6(expTodo)} + netInterest ${meta.netInterest} + tax ${meta.tax}${meta.profitOnPlayerSales ? ` + profitOnPlayerSales ${meta.profitOnPlayerSales}` : ''} = ${r6(revSum + expTodo + meta.netInterest + meta.tax + (meta.profitOnPlayerSales || 0))} no coincide con ningún resultado impreso (${patImpresos.slice(0, 4).map((x) => `"${String(x.label).slice(0, 40)}" ${x.M}`).join('; ')})`);
  else P.avisos.push('no se encontró el resultado del ejercicio impreso: officialPAT queda null (audit.js P2 balance-sin-pat)');
  // 6b. total de ingresos y de gastos: un total IMPRESO igual a la suma de las líneas; si el documento no lo imprime pero el resultado cerró,
  // se usa la suma de las líneas y se marca `por-resultado` (verificado por el resultado, no por un total propio).
  // FILA DE REDONDEO: si la suma de las líneas y el total impreso difieren SOLO por redondeo, se agrega una
  // línea explícita "Diferencia de redondeo" por la diferencia (other_income en ingresos, other_expenses en gastos) y el total oficial es el
  // IMPRESO: el total cierra exacto contra el documento (audit.js exige < 0,01) y la diferencia queda a la vista en vez de escondida. "Solo por
  // redondeo" es estricto: menos de MEDIA UNIDAD de lo impreso por cada fila sumada (n filas en miles -> hasta n x 0,0005 millones). NO la
  // tolerancia de buscar() (que además acepta 0,06% del total): Real Madrid 2005-06 difiere 0,12 millones con filas en miles, y eso no es
  // redondeo (con ~15 filas daría 0,0075), es una fila de más o de menos o un error de lectura: sigue frenando.
  // Se usa solo cuando el resultado del ejercicio NO cerró con la suma: si cerró, la suma ya está verificada (`por-resultado`) y una fila de
  // redondeo lo descuadraría. Después de agregarla se vuelve a buscar el resultado impreso con la diferencia sumada.
  let ajusteRedondeo = 0;
  const lado = (nombre, arr, objetivo, clave, filtro) => {
    if (!arr.length) {
      if (nombre === 'gastos') P.avisos.push('ninguna fila de gastos: officialTotalExpenses queda null (el sitio muestra "sin dato")');
      // INGRESOS 0 DE UN ESTADO BELGA ABREVIADO: el escalón de los códigos NBB leyó el estado (esquema
      // abreviado, la Brutomarge 9900 negativa va como gasto), todos sus totales impresos cierran exacto, no hay ninguna fila de ingresos y el
      // resultado del ejercicio cierra. Entonces el documento no informa ingresos: el total es 0. Caso: Lierse SK 2019-2021 (Omzet 70 vacío,
      // Brutomarge −1.372 / −1.475 / −1.436) y Patro Eisden 2021 (Brutomarge −140.857).
      else if (cierraPat && /escalón "códigos NBB"/.test(notasVerif.join(' ')) && Math.abs(objetivo) < 1e-9 && ingresosVerif != null && Math.abs(Number(ingresosVerif)) < 1e-9) {
        T[clave] = 0; T.verificacion.ingresos = 'por-resultado';
        P.avisos.push('ingresos: el documento (esquema abreviado, códigos NBB) no informa ingresos: el resultado cierra con la Brutomarge negativa como gasto; officialTotalRevenue 0');
      } else frena('tie-out', 'ninguna fila de ingresos con categoría aceptable');
      return;
    }
    const b = buscar(objetivo, arr.length, filtro);
    const soloRedondeo = b.redondeo && Math.abs(Math.abs(b.redondeo.M) - Math.abs(objetivo)) <= Math.max(TOL, 0.5 * arr.length * unidadMax);
    if (!b.exacto && !cierraPat && soloRedondeo) {
      const signo = nombre === 'ingresos' ? 1 : -1; const d = r6(signo * Math.abs(b.redondeo.M) - objetivo);
      arr.push({ label: 'Diferencia de redondeo', cat: nombre === 'ingresos' ? 'other_income' : 'other_expenses', amountNative: d, native: d, destino: nombre === 'ingresos' ? 'revenue' : 'expense', page: b.redondeo.page, origen: 'redondeo', escalon: null, conf: null });
      ajusteRedondeo += d;
      T[clave] = r6(Math.abs(b.redondeo.M)); T[nombre === 'ingresos' ? 'revImpreso' : 'expImpreso'] = { label: b.redondeo.label, pag: b.redondeo.page, M: b.redondeo.M }; T.verificacion[nombre] = 'impreso-con-redondeo';
      P.avisos.push(`${nombre}: las filas suman ${r6(objetivo)} y el total impreso "${String(b.redondeo.label).slice(0, 40)}" (pág. ${b.redondeo.page}) dice ${b.redondeo.M}: se agrega la línea "Diferencia de redondeo" por ${d} (menos de media unidad impresa por fila, ${arr.length - 1} filas)`);
      return;
    }
    if (b.exacto) { T[clave] = r6(Math.abs(b.exacto.M)); T[nombre === 'ingresos' ? 'revImpreso' : 'expImpreso'] = { label: b.exacto.label, pag: b.exacto.page, M: b.exacto.M }; T.verificacion[nombre] = 'impreso'; }
    else if (cierraPat) { T[clave] = r6(Math.abs(objetivo)); T.verificacion[nombre] = 'por-resultado'; P.avisos.push(`${nombre}: ningún total impreso igual a la suma de las líneas (${r6(objetivo)}); queda la suma, verificada por el resultado del ejercicio${b.redondeo ? ` (el impreso "${String(b.redondeo.label).slice(0, 40)}" ${b.redondeo.M} difiere en ${r6(Math.abs(b.redondeo.M) - Math.abs(objetivo))}: redondeo)` : ''}`); }
    else if (b.redondeo) frena('tie-out', `${nombre}: las filas suman ${r6(objetivo)} y el total impreso "${b.redondeo.label}" (pág. ${b.redondeo.page}) dice ${b.redondeo.M}: la diferencia (${r6(Math.abs(b.redondeo.M) - Math.abs(objetivo))}) es mayor que media unidad impresa por fila (${r6(0.5 * arr.length * unidadMax)}), así que no es redondeo: revisar filas y lectura`);
    else frena('tie-out', `${nombre}: las filas suman ${r6(objetivo)} y ningún total impreso del documento coincide (y el resultado del ejercicio tampoco cerró)`);
  };
  // Una sola línea de ingresos "cierra" contra sí misma: solo vale como total si está etiquetada como total.
  lado('ingresos', rev, revSum, 'officialTotalRevenue', (x) => esTotalDe(x) && !(rev.length === 1 && norm(x.label) === norm(rev[0].label) && !x.esTotal));
  lado('gastos', exp, expSinExc, 'officialTotalExpenses', (x) => esTotalDe(x) && !(exp.length === 1 && norm(x.label) === norm(exp[0].label) && !x.esTotal));
  // Con filas de redondeo, el resultado impreso se vuelve a buscar con la diferencia sumada (misma lectura de signos de los gastos).
  if (ajusteRedondeo && !cierraPat && patImpresos.length) {
    const r2 = buscarPat(ajusteRedondeo, lecturaGasto);
    if (r2.cierraPat) {
      cierraPat = r2.cierraPat; meta = r2.meta;
      T.officialPAT = r6(cierraPat.valor); T.patImpreso = { label: cierraPat.impreso.label, pag: cierraPat.impreso.page, M: cierraPat.impreso.M, signos: cierraPat.lectura }; T.verificacion.pat = 'impreso';
      P.frena = P.frena.filter((x) => x.etapa !== 'tie-out-resultado');
      P.avisos.push(`resultado: cierra contra "${String(cierraPat.impreso.label).slice(0, 40)}" contando la(s) fila(s) de redondeo (${r6(ajusteRedondeo)})`);
    }
  }
  P.totales = T;

  // 6c. SEGUNDA LECTURA del resultado, independiente del texto: el `ProfitLoss` etiquetado en el XHTML del que salió este .md (solo el hermano del mismo cierre).
  // Perímetro INDIVIDUAL: si no coincide, FRENA (medido: 9 clubes, 0 falsos frenos). CONSOLIDADO: sigue siendo AVISO y una fila en la cola, hasta que
  // `node tools/medir-ixbrl-consolidado.mjs` diga que se puede decidir (dos años consolidados de clubes distintos, uno con minoritarios). Un hecho ambiguo, de la matriz o que no está nunca frena. Se apaga con el ajuste `ixbrl-omitir`, con su motivo.
  try {
    // el XHTML de donde salió este .md (su hermano, con el encabezado de xhtml-aarsrapport.mjs) o, si el año salió de un PDF, un XHTML de la carpeta del club del MISMO emisor (su identificador está en el .md)
    // y del mismo cierre (lo exige el contexto del hecho): una segunda lectura independiente del PDF (Auditora 5). El perímetro es el de esta carga: sin él, no compara.
    const mdTxt = readFileSync(mdAbs, 'utf8'); const cierreIx = (per && per.cierre) || (alta.ejercicio && alta.ejercicio.cierre);
    const hermano = resolve(ROOT, e.md.replace(/\.md$/, '.xhtml'));
    const xh = existsSync(hermano) && /xhtml-aarsrapport\.mjs/.test(mdTxt.slice(0, 400)) ? hermano : (cierreIx ? xhtmlDelMismoEmisor(dirname(mdAbs), mdTxt) : null);
    if (cierreIx && xh && !ajusteDe(pdf, 'ixbrl-omitir')) {
      const ch = chequearIxbrl(leerResultadoIxbrl(xh, cierreIx, perimetro), { resultadoM: T.officialPAT, ingresosM: T.revSum, perimetro });
      for (const a of ch.avisos) P.avisos.push(`iXBRL: ${a}`);
      if (ch.frena) frena('ixbrl-resultado', `el resultado etiquetado en el XHTML (iXBRL, perímetro individual) no coincide con el cargado: ${ch.caso}. Revisá el signo y la escala del resultado en el .md (${e.md}); si el hecho no es el resultado del ejercicio, ajuste \`ixbrl-omitir\` (\`node tools/ajustes.mjs\`) con su motivo.`);
      else if (ch.caso) agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'ixbrl-resultado', detalle: String(year), que: `El resultado etiquetado en el XHTML (iXBRL) no coincide con el cargado: ${ch.caso}. Mirá la fila del estado de resultados en el .md; si el hecho no es el resultado del ejercicio (perímetro, minoritarios), ajuste \`ixbrl-omitir\` con su motivo.`, propuesta: 'revisar el signo y la escala del resultado en el .md; si el hecho es de otro perímetro, ixbrl-omitir' });
    }
  } catch (err) { P.avisos.push(`iXBRL: no se pudo comparar con el informe XHTML (${err.message})`); }

  // ---- 7. fx, liga, sourceId
  const fxC = campo('fx'); const fxRefC = campo('fxRef');
  const m = { currency: moneda };
  if (fxC.valor != null && fxC.estado === 'ok' && fxC.fxSource) { m.fx = fxC.valor; m.fxSource = fxC.fxSource; }
  else if (fxRefC.valor && fxRefC.estado === 'ok') { m.fxRef = fxRefC.valor; if (fxRefC.fxClose) P.fxCloseNuevo = { key: fxRefC.valor, ...fxRefC.fxClose }; }
  else if (moneda === 'USD') { /* nada que convertir */ }
  else frena('fx', `sin tipo de cambio: ${fxRefC.fuente || fxC.fuente || 'analizar() no devolvió ninguno'}${fxRefC.nota ? ` (${fxRefC.nota})` : ''}`);
  if (fxC.estado === 'pendiente' && fxC.nota) P.avisos.push(`fx: ${fxC.nota}`);
  const sourceId = campo('sourceId').valor;
  if (!sourceId) frena('fuente', 'sin sourceId');
  else if (sitio.sources[sourceId]) { if (P.reemplaza) P.avisos.push(`sources['${sourceId}'] ya existe: se conserva`); else frena('fuente', `sources['${sourceId}'] ya existe`); }
  const ligaC = campo('liga');
  let ligaExistente = ((sitio.CLUB_LEAGUE_BY_YEAR || {})[clubId] || {})[year];
  // una fila existente en null ("nadie lo verificó") no frena una liga verificada nueva: se reemplaza. Caso: Goiás 2009-2011
  // y 2013, cargados con liga null antes de que el roster estuviera en la caché.
  if (ligaExistente === null && ligaC.valor) ligaExistente = undefined;
  P.liga = { valor: ligaExistente !== undefined ? ligaExistente : (ligaC.valor ?? null), fuente: ligaExistente !== undefined ? 'la fila ya existe en data/club-leagues' : ligaC.fuente, estado: ligaExistente !== undefined ? 'existe' : ligaC.estado, nota: ligaC.nota };

  // ---- 8. fiscalYearMeta
  // rawLabel: tal cual el documento (nunca se traduce ni se "prolija", club-data-mapping §0), salvo la referencia a nota del final
  // ("Otros ingresos (Nota 15)", "Renteresultaat (21)"), que en producción no se copia.
  const limpiar = (l) => String(l).replace(/\s*\((nota|notas|note|notes|anexo|annex|nr\.?)?\s*[\d.,\s]+\)\s*$/i, '').replace(/^\**\s*|\s*\**$/g, '').trim();
  for (const f of [...rev, ...exp]) f.label = limpiar(f.label);
  // extraRows: con más de una fila de resultado financiero / impuesto, cada una va como fila propia del "Formato del club" (mismo campo que
  // Alianza Lima 2023, cargada a mano: "Ingresos y gastos financieros, neto" y "Diferencia de cambio, neta" por separado).
  const extraRows = cierraPat && metaFilas.length >= 2 ? metaFilas.map((f) => ({ label: limpiar(f.label), value: r6(cierraPat.L.v(f)) })) : null;
  const disclosure = (f) => (/^nota|lista|cierre|precedente/.test(f.origen || '') ? 'detailed' : 'aggregated');
  // SIN DESGLOSE (pedido de Guido para UC 2025: "la página tiene que decir No declarado sin romper las sumas"). Una línea que va
  // a la categoría "sin desglosar por la fuente" (lump_football_operations / _expense) queda además anotada en fiscalYearMeta.sinDesglose, con
  // el motivo (la nota de Guido en la cola, si la hay). Hoy la página no lee este campo: es la marca para que otra sesión muestre "No
  // declarado" en las categorías que esa línea esconde (UC 2025: los sueldos del plantel están adentro del costo de ventas). Las sumas no
  // cambian: el importe está una sola vez, en la línea.
  const sinDesglose = [...rev, ...exp].filter((f) => { const b = bolsonDeDeporte(club.sport); return b && (f.cat === b.revenue || f.cat === b.expense); }).map((f) => ({ renglon: f.label, lado: f.destino, importe: r6(Math.abs(f.amountNative ?? f.native ?? 0)), motivo: f.notaGuido || 'el documento no desglosa este renglón' }));
  // DE DÓNDE SALIÓ CADA DATO DE LAS ESCALERAS CHICAS: el texto que ya arma
  // alta-club.mjs para cada campo (año, cierre, perímetro, moneda, tipo de cambio, liga), más lo que cargar.mjs decidió encima (perímetro
  // por ajuste, heredado o por la cola). Solo registro: no cambia ninguna decisión. Lo junta `node tools/estado.mjs --escalones`.
  P.procedencia = Object.fromEntries(alta.ejercicio.campos.map((c) => [c.campo, { valor: c.valor ?? null, fuente: c.fuente || null, estado: c.estado || null }]));
  { const avPer = P.avisos.find((x) => /^perímetro(:| heredado)/.test(x));
    if (ajPer) P.procedencia.perimetro = { valor: perimetro, fuente: `ajuste manual (${ajPer.fecha})`, estado: 'ok' };
    else if (avPer) P.procedencia.perimetro = { valor: perimetro, fuente: /heredado/.test(avPer) ? 'heredado del año cargado más cercano' : 'respuesta de Guido en la cola', estado: 'ok' }; }
  P.ejercicio = {
    clubId, year, cierre: alta.ejercicio.cierre, perimetro,
    revenueLines: rev.map((f) => ({ rawLabel: f.label, normalizedCategory: f.cat, amountNative: f.amountNative, disclosureLevel: disclosure(f), _pag: f.page, _escalon: f.escalon, _conf: f.conf, _fuenteCat: f.fuenteCat || null })),
    expenseLines: exp.map((f) => ({ rawLabel: f.label, normalizedCategory: f.cat, amountNative: f.amountNative, disclosureLevel: disclosure(f), _pag: f.page, _escalon: f.escalon, _conf: f.conf, _fuenteCat: f.fuenteCat || null })),
    fiscalYearMeta: { ...m, sourceId, reportType: campo('reportType').valor || 'official_balance_sheet', gestionId: null, profitOnPlayerSales: meta.profitOnPlayerSales || 0, assetSales: 0, netInterest: meta.netInterest, tax: meta.tax, ...(extraRows ? { extraRows } : {}), ...(Object.keys(incluidoEn).length ? { incluidoEn } : {}), ...(sinDesglose.length ? { sinDesglose } : {}), grossDebt: null, cash: null, officialTotalRevenue: T.officialTotalRevenue, officialTotalExpenses: T.officialTotalExpenses, officialPAT: T.officialPAT },
    source: sourceId ? { id: sourceId, clubId, title: `${club.name || club.displayName} — ${basename(pdf, '.pdf')} (ejercicio ${year})`, type: campo('reportType').valor || 'official_balance_sheet', reliability: 'primary', note: `Cargado por tools/cargar.mjs (${HOY}) desde la transcripción ${e.md}; categorías del pipeline (${cj.modelo || 'Jev/Claude'}). Perímetro: ${perimetro || '?'}.` } : null,
  };
  // PRESIDENTES (decisión de Guido: "cuando se hace el alta se pregunta si hay socios, consolidado,
  // etc.; acá debería agregarse lo de presidentes"). Si ninguna gestión confirmada de data/gestiones/<país>.js cubre el cierre de este año,
  // va un caso a la cola (lo contesta el subagente de Guido, como las preguntas de perfil). NO FRENA: el año se carga igual, sin presidente.
  // Un club ya contestado "descartar" (sociedad sin dueño persona) no se vuelve a preguntar; uno contestado "aceptar" que igual quedó sin
  // cubrir este año abre un caso nuevo para el año. La pista: los renglones de la transcripción donde aparece el cargo (el firmante).
  {
    const cierreY = alta.ejercicio.cierre; const gs = (sitio.gestiones || {})[clubId] || [];
    const cubre = gs.some((g) => g.confirmada && ((g.desde && g.desde <= cierreY && (!g.hasta || g.hasta >= cierreY)) || (g.firmo || []).includes(year)));
    const previa = respuestaPorDetalle('cargar', 'gestion', clubId);
    if (cierreY && !cubre && previa?.resp?.decision !== 'descartar') {
      const iso = String(club.country || '').toLowerCase();
      let pistas = [];
      // El nombre del firmante suele ir en el renglón de ARRIBA del cargo ("Paulo Rogério de Carvalho Pinheiro" / "Presidente Executivo",
      // Goiás 2021 L1315-1316); se trae ese renglón y el del cargo, nunca el de abajo (ahí va el número de documento de la persona).
      const limpio = (l) => l.replace(/[|*#]/g, ' ').replace(/\s+/g, ' ').trim();
      try { const L = readFileSync(resolve(ROOT, e.md), 'utf8').split('\n');
        pistas = L.map((l, i) => i).filter((i) => /\b(presidente|presidenta|president|chairman|chairwoman|vorstandsvorsitzende|vorsitzende|voorzitter|formand|predsjednik|πρόεδρος)\b/i.test(L[i]) && L[i].length < 220).slice(-4)
          .map((i) => { const j = [i - 1, i - 2].find((k) => k >= 0 && limpio(L[k])); const arriba = j != null && limpio(L[j]).length <= 80 && !/\d{3}/.test(L[j]) ? `${limpio(L[j])} / ` : ''; return `L${i + 1}: ${arriba}${limpio(L[i]).slice(0, 120)}`; }); } catch { /* sin .md */ }
      agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'gestion', detalle: previa ? `${clubId}:${year}` : clubId,
        que: `¿Quién condujo ${club.name || clubId} en el ejercicio ${year} (cierre ${cierreY})? Ninguna gestión confirmada de data/gestiones/${iso}.js lo cubre. Completar las gestiones del club en ese archivo (formato y regla: Admin/ARQUITECTURA.md, "Gestiones"; el porqué de cada fecha va a Admin/carga-clubes/<club>.md, no al archivo): nombre, corto, cargo 'Presidente' (en una sociedad, el dueño solo si es una persona con nombre), desde (fecha en que ASUMIÓ), hasta (o null), fuente (URL), confirmada:true. Si el país no tiene archivo, crearlo y sumar '${iso}' a PAISES de js/finanzas-anios.js. Una SAF o sociedad anónima sin dueño persona no tiene gestión: responder descartar. Firmantes en la transcripción: ${pistas.length ? pistas.join(' | ') : 'no se encontraron'}. Después: node tools/cola.mjs --responder <id> aceptar.`,
        propuesta: 'completar data/gestiones y responder aceptar (o descartar si el club no tiene presidente persona)' });
      P.avisos.push(`gestión: ningún presidente confirmado cubre ${year} (cierre ${cierreY}); pregunta en la cola (no frena)`);
    }
  }
  Object.defineProperty(P, 'casosPendientes', { value: casosPendientes, enumerable: false }); // no va al .carga.json
  P.resumen = { carga: P.frena.length === 0, motivos: P.frena.length, lineasIngreso: rev.length, lineasGasto: exp.length, metaFilas: metaFilas.length, excluidas: filas.filter((f) => f.destino === 'excluida').length };
  return P;
}

// ============================================================================
// EDICIÓN DE ARCHIVOS JS: se busca el bloque por su apertura y se cierra por conteo de llaves (saltando strings y comentarios), nunca con
// una regex sobre el archivo entero (los data files viejos tenían comentarios con llaves; hay strings con comillas escapadas).
// ============================================================================
function cierreDe(src, abre) {
  let d = 0;
  for (let i = abre; i < src.length; i++) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) return -1; continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 1; if (i <= 0) return -1; continue; }
    if (c === "'" || c === '"' || c === '`') { for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++; continue; }
    if (c === '{' || c === '[') d++;
    else if (c === '}' || c === ']') { d--; if (d === 0) return i; }
  }
  return -1;
}
// LA LIGA DE UN AÑO EN data/club-leagues/<iso>.js, como texto (función pura: la prueba la corre
// sola). Si el club ya tiene ese año: en null se reemplaza; con la misma liga no se toca; con OTRA liga gana la que estaba y vuelve un aviso.
// Antes, un año con liga se agregaba OTRA VEZ dentro del objeto del club cuando quien llamaba no avisaba que "existe": bfo-rusia.mjs arma la
// liga con estado "pendiente", y las reescrituras de los años rusos dejaron 58 claves repetidas en ru.js (limpiadas a mano).
function ligaEnTexto(lt, id, y, val, archivo) {
  const clave = new RegExp(`(^|\\n)\\s*['"]?${id.replace(/[-]/g, '\\-')}['"]?\\s*:\\s*\\{`);
  const mm = lt.match(clave);
  if (!mm) return { texto: insertarEnObjeto(lt, 'Object.assign(window.CLUB_LEAGUE_BY_YEAR, {', `  ${js(id)}: { ${y}: ${val} },\n`, archivo) };
  const abre = lt.indexOf('{', mm.index + mm[0].length - 1); const cierra = cierreDe(lt, abre);
  const dentro = lt.slice(abre + 1, cierra).replace(/\s+$/, '');
  const yaEsta = new RegExp(`(^|[,{\\s])${y}\\s*:\\s*(null|'[^']*'|"[^"]*")`); const m = dentro.match(yaEsta);
  if (m && m[2] === 'null') return { texto: lt.slice(0, abre + 1) + dentro.replace(yaEsta, `$1${y}: ${val}`) + ' ' + lt.slice(cierra) };
  if (m) return { texto: lt, aviso: m[2] === val || val === 'null' ? null : `liga de ${id} ${y}: queda la que ya estaba en ${archivo} (${m[2]}); la carga proponía ${val}` };
  return { texto: lt.slice(0, abre + 1) + dentro + `${dentro.trim() && !dentro.trim().endsWith(',') ? ',' : ''} ${y}: ${val} ` + lt.slice(cierra) };
}
function insertarEnObjeto(src, apertura, texto, archivo) {
  // la apertura se busca al PRINCIPIO de una línea: el esqueleto de alta-club.mjs tenía un comentario que nombraba
  // "Object.assign(sources, {" y la búsqueda caía ahí (caso: Goiás 2021, "no pude cerrar el bloque"). Todas las aperturas son sentencias de primer nivel.
  const a = src.search(new RegExp('^' + apertura.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'm')); if (a < 0) throw new Error(`${archivo}: no encontré "${apertura}"`);
  const abre = src.indexOf('{', a + apertura.length - 1); const cierra = cierreDe(src, abre);
  if (cierra < 0) throw new Error(`${archivo}: no pude cerrar el bloque "${apertura}"`);
  let antes = src.slice(0, cierra); const tras = src.slice(cierra);
  const ult = antes.replace(/\s+$/, '');
  const sinComa = !/[,{]$/.test(ult.replace(/\/\/[^\n]*$/, '').replace(/\s+$/, ''));
  if (sinComa) { const k = ult.replace(/\/\/[^\n]*$/, '').replace(/\s+$/, '').length; antes = antes.slice(0, k) + ',' + antes.slice(k); }
  if (!/\n$/.test(antes)) antes += '\n';
  return antes + texto + tras;
}
const js = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')}'`;
const num = (x) => (x === null || x === undefined ? 'null' : String(r6(x)));

function snapshot(extra = []) {
  const archivos = new Map();
  const add = (p) => { if (existsSync(p) && statSync(p).isFile()) archivos.set(p, readFileSync(p)); };
  (function walk(d) { for (const e of readdirSync(d)) { const f = join(d, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, 'data'));
  for (const e of readdirSync(resolve(ROOT, 'fuentes'))) if (e.endsWith('.html')) add(resolve(ROOT, 'fuentes', e));
  for (const d of ['club', 'liga', 'og']) if (existsSync(resolve(ROOT, d))) (function walk(x) { for (const e of readdirSync(x)) { const f = join(x, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, d)); // las páginas de club y de liga y sus imágenes
  for (const f of ['index.html', 'fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', ...extra]) add(resolve(ROOT, f));
  return archivos;
}
function revertir(snap, extra) {
  const actual = snapshot(extra); let restaurados = 0; let borrados = 0;
  for (const [p, buf] of snap) if (!actual.has(p) || !actual.get(p).equals(buf)) { writeFileSync(p, buf); restaurados++; }
  for (const p of actual.keys()) if (!snap.has(p)) { unlinkSync(p); borrados++; }
  return { restaurados, borrados };
}
function runNode(script, args) {
  try { return { code: 0, out: execFileSync('node', [resolve(ROOT, script), ...args], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'] }) }; }
  catch (e) { return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') }; }
}

// PUBLICAR (sacado de escribir() sin cambios para que lo reuse tools/caja-deuda.mjs): sube ASSET_V, corre los generadores y la
// auditoría; si audit.js da P0/P1, revierte todo lo que cambió desde `snap`. Lanza si un generador falla (quien llama revierte).
export function publicarCambios(snap, extra, escritos) {
  // ASSET_V (mismo criterio que alta-club.mjs: la constante Y cada ?v= literal, salvo que ya esté subido respecto de HEAD)
  const idxPath = resolve(ROOT, 'index.html'); const idx = readFileSync(idxPath, 'utf8');
  const actual = (idx.match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1];
  let enHead = null;
  try { enHead = (execFileSync('git', ['show', 'HEAD:index.html'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1]; } catch { enHead = null; }
  if (actual && (enHead === null || enHead === actual)) {
    const nuevo = /^\d+$/.test(actual) ? String(Number(actual) + 1) : `${actual}a`;
    const esc = actual.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    writeFileSync(idxPath, idx.replace(`window.ASSET_V = '${actual}'`, `window.ASSET_V = '${nuevo}'`).replace(new RegExp(`\\?v=${esc}(?=["'])`, 'g'), `?v=${nuevo}`));
    escritos.push(`index.html (ASSET_V ${actual} -> ${nuevo})`);
  }
  // la url del registro oficial de los informes XHTML que quedaron sin ella (Companies House, Virk): sola, para que nadie tenga que acordarse. No frena: si no la
  // encuentra o el informe no coincide con el archivo local, no escribe nada y el aviso `fuente-xhtml-sin-url` de audit.js queda.
  const urlXhtml = runNode('tools/fuente-url-xhtml.mjs', ['--todos', '--escribir']);
  if (/url escritas/.test(urlXhtml.out)) escritos.push('urls del registro oficial en fuentes XHTML (tools/fuente-url-xhtml.mjs)');
  // la segunda fuente de la liga de lo recién cargado (regla «la liga de un año necesita dos fuentes»): sola, con la url y el título de otro año de la misma liga. No frena: una liga en grupos
  // o sin año de referencia se queda con el aviso `liga-una-fuente` de audit.js y la resuelve una sesión (tools/segunda-fuente-liga.mjs).
  const segFuente = runNode('tools/segunda-fuente-liga.mjs', ['--pendientes', '--escribir']);
  const segN = (segFuente.out.match(/(\d+) guardada\(s\)/) || [])[1];
  if (segN && Number(segN) > 0) escritos.push(`segunda fuente de ${segN} liga(s) (tools/segunda-fuente-liga.mjs --pendientes)`);
  // generadores + auditoría
  for (const g of GENERADORES.filter((g) => existsSync(resolve(ROOT, g)))) { // la lista compartida con alta-club.mjs
    const r = runNode(g, []); if (r.code !== 0) throw new Error(`${g} falló (código ${r.code}): ${r.out.slice(-500)}`);
  }
  const audit = runNode('tools/audit.js', ['--quiet']);
  const linea0 = (audit.out.match(/P0 \d+ · P1 \d+[^\n]*/) || [''])[0];
  if (audit.code !== 0) { const rv = revertir(snap, extra); const falla = queFalla(audit.out); return { ok: false, motivo: `node tools/audit.js dio P0/P1 (${linea0}${falla.length ? `: ${falla.join(', ')}` : ''}); se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, audit: audit.out.slice(-2500), escritos }; }
  return { ok: true, escritos, audit: linea0 };
}
export { snapshot, revertir, runNode };

// COMPUERTA DE ESTADIO Y SPONSOR: un ejercicio nuevo no se escribe sin el estadio y el sponsor de camiseta de
// ese club y año. tools/estadio-sponsor.mjs los lee de la página de temporada de Wikipedia (gratis), los guarda en data/contexto/<iso>.js
// y sale con 1 si falta alguno; lo que falta se completa en tools/contexto-manual.json, con fuente. Función aparte, llamada en un solo
// punto antes de escribir (la compuerta del auditor va al lado).
export function compuertaContexto(P) {
  const E = P.ejercicio; const meta = E?.fiscalYearMeta || {};
  const cierre = meta.cierre || String(meta.fxRef || '').split('@')[1] || null;
  const args = ['--escribir', '--club', E.clubId, '--anio', String(E.year)];
  if (P.liga?.valor) args.push('--liga', P.liga.valor);
  if (cierre && /^\d{4}-\d{2}-\d{2}$/.test(cierre)) args.push('--cierre', cierre.slice(5));
  try { execFileSync('node', [resolve(ROOT, 'tools', 'estadio-sponsor.mjs'), ...args], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); return true; }
  catch (e) {
    console.error(`\nNo se escribe nada: falta el estadio o el sponsor de ${E.clubId} ${E.year} (compuerta del to-do 273).\n${String(e.stdout || '').split('\n').filter((l) => /falta|contexto-manual|sin liga|sin lista/.test(l)).join('\n') || e.message}`);
    return false;
  }
}

export function escribir(P) {
  const E = P.ejercicio; const id = E.clubId; const y = E.year;
  const dataRel = rutaData(id);
  const [paisCarpeta, clubCarpeta] = P.pdf.split('/').slice(1, 3);
  const fuentesMd = `Admin/sourcing/${paisCarpeta}/${clubCarpeta}.md`;
  const extra = existsSync(resolve(ROOT, fuentesMd)) ? [fuentesMd] : [];
  // la evidencia de carga (cabecera del año, nota de cada fila, ajustes, liga) va a Admin/carga-clubes/<clubId>.md: entra en
  // el snapshot para que un P0/P1 de la auditoría también lo revierta (y lo borre si lo creó esta carga).
  const evRel = EV.rutaRel(id);
  const extraRev = [...extra, evRel];
  const snap = snapshot(extraRev); const escritos = [];
  try {
    let ev = EV.leer(id);
    const lineaJ = (l) => ({ rawLabel: l.rawLabel, normalizedCategory: l.normalizedCategory, amountNative: r6(l.amountNative),
      ...(l.disclosureLevel !== undefined ? { disclosureLevel: l.disclosureLevel } : {}), ...(l.items ? { items: l.items.map((it) => [it[0], r6(it[1])]) } : {}) });
    // la nota de cada fila (página y escalón de su categoría) va a la tabla del año en la evidencia, con su número de fila
    const notaFila = (l) => `pág. ${l._pag ?? '?'}, ${['precedente', 'Jev', 'Claude'][l._escalon] ?? '?'}${l._conf != null && l._escalon ? ` ${l._conf}` : ''}`;
    const tabla = (ls) => ls.map((l, i) => ({ fila: i + 1, rawLabel: l.rawLabel, nota: notaFila(l) }));
    // quien arma la propuesta puede decir de dónde salen las filas: `P.herramienta` y `P.origenFilas` (tools/bfo-rusia.mjs: el JSON
    // del fisco ruso, sin proponer-carga ni categorías.json). Sin eso, el texto de siempre.
    const origenFilas = P.origenFilas || `Filas: proponer-carga.mjs (ancla-listas); categorías:\n${derivado(P.md, '.categorias.json', { crear: false })} (escalón de cada fila en la tabla).`;
    const cab = `${y}: cargado por ${P.herramienta || 'tools/cargar.mjs'} (${HOY}) desde ${P.md}. ${origenFilas} Tie-out contra lo impreso: ${P.totales.revImpreso ? `ingresos "${String(P.totales.revImpreso.label).slice(0, 60)}" pág. ${P.totales.revImpreso.pag}` : '-'}${P.totales.expImpreso ? `; gastos "${String(P.totales.expImpreso.label).slice(0, 60)}" pág. ${P.totales.expImpreso.pag}` : ''}${P.totales.patImpreso ? `; resultado "${String(P.totales.patImpreso.label).slice(0, 60)}"` : ''}.`.split('\n');
    // --reemplazar: lo que se conserva del año cargado, y se borran sus bloques (revenue, expense, meta) antes de insertar los nuevos.
    if (P.reemplaza) {
      const viejo = cargarSitio().generic[id] || {};
      const vm0 = (viejo.fiscalYearMeta || {})[y] || {};
      const conItems = [...(viejo.revenueLinesByYear?.[y] || []), ...(viejo.expenseLinesByYear?.[y] || [])].filter((l) => l.items);
      for (const l of [...E.revenueLines, ...E.expenseLines]) { const o = conItems.find((x) => norm(x.rawLabel) === norm(l.rawLabel)); if (o) l.items = o.items; }
      const M0 = E.fiscalYearMeta;
      if (M0.grossDebt == null && vm0.grossDebt != null) M0.grossDebt = vm0.grossDebt;
      if (M0.cash == null && vm0.cash != null) M0.cash = vm0.cash;
      // staffCost, el costo de personal que completa caja-deuda.mjs --personal: también se conserva (se perdía al rehacer
      // Panetolikos 2021-2025 con los sueldos separados).
      if (M0.staffCost == null && vm0.staffCost != null) M0.staffCost = vm0.staffCost;
      if (M0.gestionId == null && vm0.gestionId != null) M0.gestionId = vm0.gestionId;









      // también la evidencia que este script escribió para el año que se reemplaza (su cabecera "cargado por", sus
      // AJUSTE MANUAL, sus notas de meta y liga, y las tablas de filas): se vuelve a escribir abajo con lo de ahora, sin apilarse. Lo que
      // se escribió a mano en ese año no se toca.
      ev = EV.quitarLineas(ev, y, 'Ingresos', [new RegExp(`^${y}: cargado por `), /\.categorias\.json \(escalón (por línea al lado|de cada fila en la tabla)\)/]);
      ev = EV.quitarLineas(ev, y, 'Gastos', [/^tools\/cargar\.mjs \(\d{4}-\d{2}-\d{2}\)$/]);
      ev = EV.quitarLineas(ev, y, 'Meta', [new RegExp(`^${y}: AJUSTE MANUAL \\(`), /^tools\/cargar\.mjs \(\d{4}-\d{2}-\d{2}\)\. grossDebt\/cash/,
        /^incluidoEn: ajuste manual `incluye`/, /^ajuste manual `incluye`: el documento junta/, /^sinDesglose: líneas que el documento no desglosa/]);
      ev = EV.quitarLineas(ev, y, 'Liga', [/^tools\/cargar\.mjs \(\d{4}-\d{2}-\d{2}\): /]);
    }


    ev = EV.agregarTexto(ev, y, 'Ingresos', cab);
    ev = EV.ponerTabla(ev, y, 'Ingresos', tabla(E.revenueLines));
    ev = EV.ponerTabla(ev, y, 'Gastos', tabla(E.expenseLines));
    const M = E.fiscalYearMeta;
    // AJUSTES MANUALES: lo que Guido forzó para este documento queda a la vista en la evidencia del club, en la meta del año.
    const ajTxt = (P.ajustes || []).map((a) => `${y}: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, ${a.autor} ${a.fecha}): ${a.campo}${a.valor ? ` = ${a.valor}` : ''}. ${String(a.motivo).replace(/\n/g, ' ')}`);
    ev = EV.agregarTexto(ev, y, 'Meta', [...ajTxt, `tools/cargar.mjs (${HOY}). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.`,
      ...(M.incluidoEn ? ['incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.'] : []),
      ...(M.sinDesglose ? ['sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.'] : [])]);
    const metaJ = {
      // tramo corto de transición (menos de 12 meses, ver «TRAMO CORTO» en proponer): sus meses, para sacarlo del ranking, la mediana y los Δ
      ...(P.transicion && P.transicion.meses < 12 ? { periodMonths: P.transicion.meses } : {}),
      currency: M.currency, ...(M.fxRef ? { fxRef: M.fxRef } : M.fx != null ? { fx: r6(M.fx), fxSource: M.fxSource } : {}),
      sourceId: M.sourceId, reportType: M.reportType, gestionId: M.gestionId != null ? M.gestionId : null,
      profitOnPlayerSales: r6(M.profitOnPlayerSales || 0), assetSales: 0, netInterest: r6(M.netInterest ?? null), tax: r6(M.tax ?? null),
      ...(M.extraRows ? { extraRows: M.extraRows.map((x) => ({ label: x.label, value: r6(x.value ?? null) })) } : {}),
      ...(M.incluidoEn ? { incluidoEn: M.incluidoEn } : {}),
      ...(M.sinDesglose ? { sinDesglose: M.sinDesglose.map((x) => ({ renglon: x.renglon, lado: x.lado, importe: r6(x.importe), motivo: x.motivo })) } : {}),
      grossDebt: r6(M.grossDebt ?? null), cash: r6(M.cash ?? null), ...(M.staffCost != null ? { staffCost: r6(M.staffCost) } : {}),
      officialTotalRevenue: r6(M.officialTotalRevenue ?? null), officialTotalExpenses: r6(M.officialTotalExpenses ?? null), officialPAT: r6(M.officialPAT ?? null),
    };

    const S = E.source;
    // la nota INTERNA de la fuente va a la evidencia del club, no a un campo `note` de sources{}
    let fuenteNueva = null; let notaASumar = null;
    const dmy = (f) => f.split('-').reverse().join('/');
    const fuenteExistente = P.reemplaza ? cargarSitio().sources?.[S.id] : null;
    {
      const notaPrimero = P.primerEjercicio ? `Primer ejercicio de la sociedad: ${P.primerEjercicio.inicio && P.primerEjercicio.cierre ? `del ${dmy(P.primerEjercicio.inicio)} al ${dmy(P.primerEjercicio.cierre)} ` : ''}(${P.primerEjercicio.meses} meses).`
        : P.transicion && P.transicion.meses < 12 && P.transicion.inicio ? `Ejercicio de transición de ${P.transicion.meses} meses por cambio de la fecha de cierre: del ${dmy(P.transicion.inicio)} al ${dmy(P.transicion.cierre)}. No es comparable con un año de 12 meses.`
        : P.transicion ? `Ejercicio de transición por cambio de fecha de cierre: ${P.transicion.inicio ? `del ${dmy(P.transicion.inicio)} ` : ''}al ${dmy(P.transicion.cierre)} (${P.transicion.meses} meses).` : null;
      // el año salió de un informe XHTML (iXBRL): lo dice el encabezado del .md que escribe xhtml-aarsrapport.mjs. La fuente nace sin url, así que la página de fuentes lo dice con esta frase
      // (el PDF de ancla es la impresión de Chrome, no se publica como si fuera el original; la url del depósito oficial la pone fuente.mjs).
      // (`e` no existe en escribir(P): el .md de la propuesta es P.md; sin él, o ilegible, no hay nota)
      const notaXhtml = (() => { try { return P.md && /xhtml-aarsrapport\.mjs/.test(readFileSync(resolve(ROOT, P.md), 'utf8').slice(0, 400)) ? 'Informe oficial en formato XHTML (iXBRL)' : null; } catch { return null; } })();
      const notaPublica = [notaPrimero, P.suma?.nota, notaXhtml].filter(Boolean).join(' ');
      if (!fuenteExistente) {
        fuenteNueva = { id: S.id, clubId: S.clubId, title: S.title, type: S.type, reliability: S.reliability, ...(notaPublica ? { publicNote: notaPublica } : {}) };
        if (S.note) ev = EV.agregarFuente(ev, S.id, [S.note], 'note (cargar.mjs)');
      // Al recargar con --reemplazar un año cuya fuente ya existe, la fuente se conserva; pero si el año es un primer ejercicio o un tramo de
      // transición y su nota no está, se agrega al final de la nota pública que tenga (sin pisarla). Caso: Atalanta 2022, recargada como tramo
      // de 6 meses, quedaba sin la nota de transición y Onboarding la puso a mano con fuente.mjs --nota.
      } else if (notaPrimero && !String(fuenteExistente.publicNote || '').includes(notaPrimero)) notaASumar = notaPrimero;
    }
    // el club se escribe en su JSON (la fuente) y de ahí se regenera el data file: se convierte a los nombres de siempre, se
    // cambia el año y se valida contra el esquema antes de escribir nada.
    const [rj, rd] = modificarClub(id, (c) => {
      c.datos.revenueLinesByYear[y] = E.revenueLines.map(lineaJ);
      c.datos.expenseLinesByYear[y] = E.expenseLines.map(lineaJ);
      c.datos.fiscalYearMeta[y] = metaJ;
      if (fuenteNueva) c.sources[S.id] = fuenteNueva;
      if (notaASumar && c.sources[S.id]) c.sources[S.id].publicNote = [c.sources[S.id].publicNote, notaASumar].filter(Boolean).join(' ');
    });
    escritos.push(rj, rd);

    // liga
    const iso = String((cargarSitio().clubs[id] || {}).country || '').toLowerCase();
    const ligaPath = resolve(ROOT, 'data/club-leagues', `${iso}.js`);
    if (P.liga.estado !== 'existe') {
      if (!existsSync(ligaPath)) throw new Error(`no existe data/club-leagues/${iso}.js`);
      const r = ligaEnTexto(readFileSync(ligaPath, 'utf8'), id, y, P.liga.valor ? js(P.liga.valor) : 'null', `data/club-leagues/${iso}.js`);
      let lt = r.texto; if (r.aviso) P.avisos.push(r.aviso);
      // de dónde salió la liga: a la evidencia del club, no a data/club-leagues/
      ev = EV.agregarTexto(ev, y, 'Liga', [`tools/cargar.mjs (${HOY}): ${P.liga.valor || 'null'}, ${P.liga.valor ? `verificado contra ${P.liga.fuente}` : `SIN VERIFICAR (${P.liga.fuente})`}.`]);
      writeFileSync(ligaPath, lt); escritos.push(`data/club-leagues/${iso}.js`);
    }
    // cotización de mercado nueva
    if (P.fxCloseNuevo) {
      const cmPath = resolve(ROOT, 'data/currency-map.js'); const cm = readFileSync(cmPath, 'utf8');
      if (!cm.includes(`'${P.fxCloseNuevo.key}':`)) {
        // sin comentario: el `label` ya dice de dónde sale la cotización
        writeFileSync(cmPath, insertarEnObjeto(cm, 'const FX_CLOSE = {', `  '${P.fxCloseNuevo.key}': { fx: ${P.fxCloseNuevo.fx}, source: 'market_close', label: ${js(P.fxCloseNuevo.label)} },\n`, 'data/currency-map.js'));
        escritos.push('data/currency-map.js');
      }
    }
    escritos.push(EV.guardar(id, ev));
    // Admin/sourcing/<País>/<Club>.md (interno, no se publica)
    if (extra.length) { appendFileSync(resolve(ROOT, fuentesMd), `\n- Cargado en el sitio por tools/cargar.mjs (${HOY}): ejercicio ${y} desde \`${P.pdf}\` (sourceId \`${E.source.id}\`).\n`); escritos.push(fuentesMd); }
    // "POSIBLEMENTE DENTRO DE OTRO RUBRO": la misma escalera de tools/dentro-de-otro.mjs, sobre el club
    // entero y con el año recién escrito: el año nuevo nace con sus marcas y un año viejo gana o pierde las suyas si este año le cambia el
    // precedente. Antes de publicar, así un P0/P1 lo revierte todo junto.
    const marcas = marcarClub(id);
    if (marcas.cambio) for (const r of [rutaJson(id), dataRel]) if (!escritos.includes(r)) escritos.push(r);
    if (marcas.antes || marcas.despues) console.log(`"Posiblemente dentro de otro rubro" (tools/dentro-de-otro.mjs): marcas del club ${marcas.antes} → ${marcas.despues}${marcas.lineas.length ? `\n  ${marcas.lineas.join('\n  ')}` : ''}`);
    return publicarCambios(snap, extraRev, escritos);
  } catch (err) {
    const rv = revertir(snap, extraRev);
    return { ok: false, motivo: `${err.message} — se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, escritos };
  }
}

// ============================================================================
// BACKTEST (--comparar <raíz de otro checkout>): la propuesta contra el mismo ejercicio en producción
// ============================================================================
function comparar(P, prod) {
  const cd = prod.generic[P.clubId]; const y = P.year;
  if (!cd || !(cd.fiscalYearMeta || {})[y]) return { sinProduccion: true };
  const pm = cd.fiscalYearMeta[y]; const E = P.ejercicio || { revenueLines: [], expenseLines: [], fiscalYearMeta: {} };
  const porCat = (ls) => { const o = {}; for (const l of ls || []) o[l.normalizedCategory] = (o[l.normalizedCategory] || 0) + Math.abs(l.amountNative); return o; };
  const bien = (prodL, propL) => { const Pc = porCat(prodL); const Q = porCat(propL); const tot = Object.values(Pc).reduce((a, x) => a + x, 0); if (!tot) return null; let m = 0; for (const [c, v] of Object.entries(Pc)) m += Math.min(v, Q[c] || 0); return r6(m / tot); };
  const deMas = (prodL, propL) => { const Pc = porCat(prodL); const Q = porCat(propL); const tot = Object.values(Pc).reduce((a, x) => a + x, 0); if (!tot) return null; let m = 0; for (const [c, v] of Object.entries(Q)) m += Math.max(0, v - (Pc[c] || 0)); return r6(m / tot); };
  const sum = (ls) => (ls || []).reduce((a, l) => a + l.amountNative, 0);
  const cerca = (a, b) => (a == null || b == null ? null : Math.abs(Math.abs(a) - Math.abs(b)) <= Math.max(0.01, 0.005 * Math.abs(b)));
  const prodRev = cd.revenueLinesByYear[y] || []; const prodExp = cd.expenseLinesByYear[y] || [];
  const ligaProd = ((prod.CLUB_LEAGUE_BY_YEAR || {})[P.clubId] || {})[y];
  return {
    prod: { revenue: r6(sum(prodRev)), expenses: r6(sum(prodExp)), officialTotalRevenue: pm.officialTotalRevenue, officialTotalExpenses: pm.officialTotalExpenses, officialPAT: pm.officialPAT, fx: pm.fx ?? null, fxRef: pm.fxRef ?? null, fxSource: pm.fxSource ?? null, netInterest: pm.netInterest, tax: pm.tax, liga: ligaProd ?? null },
    prop: { revenue: r6(sum(E.revenueLines)), expenses: r6(sum(E.expenseLines)), officialTotalRevenue: E.fiscalYearMeta.officialTotalRevenue, officialTotalExpenses: E.fiscalYearMeta.officialTotalExpenses, officialPAT: E.fiscalYearMeta.officialPAT, fx: E.fiscalYearMeta.fx ?? null, fxRef: E.fiscalYearMeta.fxRef ?? null, netInterest: E.fiscalYearMeta.netInterest, tax: E.fiscalYearMeta.tax, liga: P.liga?.valor ?? null },
    ingresosIgual: cerca(sum(E.revenueLines), sum(prodRev)), gastosIgual: cerca(sum(E.expenseLines), sum(prodExp)),
    patIgual: cerca(E.fiscalYearMeta.officialPAT, pm.officialPAT),
    dineroIngresosBien: bien(prodRev, E.revenueLines), dineroGastosBien: bien(prodExp, E.expenseLines),
    dineroIngresosDeMas: deMas(prodRev, E.revenueLines), dineroGastosDeMas: deMas(prodExp, E.expenseLines),
    fxIgual: pm.fxRef ? pm.fxRef === E.fiscalYearMeta.fxRef : pm.fx != null ? (E.fiscalYearMeta.fx != null ? Math.abs(E.fiscalYearMeta.fx / pm.fx - 1) < 0.005 : false) : null,
    ligaIgual: ligaProd === undefined ? null : ligaProd === (P.liga?.valor ?? null),
  };
}

// ΠΑΕ EN LA PORTADA: la primera línea, hasta la pág. 3 del visor, con la forma jurídica griega de sociedad de fútbol.
const PAE_RE = /(?<![\p{L}])(?:Π\.\s?Α\.\s?Ε\.?|ΠΑΕ|ΠΟΔΟΣΦΑΙΡΙΚ\p{L}*\s+ΑΝΩΝΥΜ\p{L}*\s+ΕΤΑΙΡ\p{L}*|Ποδοσφαιρικ\p{L}*\s+Ανώνυμ\p{L}*\s+Εταιρ\p{L}*)(?![\p{L}])/u;
function citaEnPortada(md, re) {
  const L = md.split('\n'); let fin = L.findIndex((l) => /^---\s*p[aá]g\.\s*4\s*---/i.test(l)); if (fin < 0) fin = Math.min(L.length, 200);
  for (let i = 0; i < fin; i++) if (re.test(L[i])) return { linea: i + 1, texto: L[i].replace(/[*#|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) };
  return null;
}
const citaPAE = (md) => citaEnPortada(md, PAE_RE);
// SAD O SDUQ PORTUGUESA EN LA PORTADA: la sociedad desportiva (SAD, SDUQ) que presenta el documento
// participa solo en el fútbol profesional; las cuotas de socios y las otras modalidades son del club, que es otra entidad. A diferencia de
// la ΠΑΕ NO se guarda en el perfil del club: Porto publica años del club (2016-2023, con socios y modalidades) y años de la SAD (2024-2025),
// así que la cita vale para ESE documento ("el 0 es real acá") y un documento del club sigue preguntando. Solo Portugal. Medido sobre los
// 186 .md portugueses: 158 la tienen en la portada; los 28 que no son del club o la asociación (Porto 2016-2023, Rio Ave 2014-15, Feirense,
// Gil Vicente consolidado, Tondela y Vitória del club...) o SAD sin la forma en la portada (Santa Clara, Sporting 1999 y 2009-10), que siguen
// a la cola. Coincide con las 36 respuestas de perfil de Portugal (las 17 "no" son SAD/SDUQ; Porto "sí" por los años del club).
const SAD_PT_RE = /(?<![\p{L}])(?:S\.\s?A\.\s?D\.|SAD|SDUQ|Sociedade\s+An[óo]nima\s+Desportiva|Sociedade\s+Desportiva\s+Unipessoal\s+por\s+Quotas)(?![\p{L}])/u;
const citaSADpt = (md) => citaEnPortada(md, SAD_PT_RE);

// QUÉ TOCÓ UNA CARGA A MANO. AEK 2024 se cargó con `--escribir` y su `Admin/sourcing/Grecia/AEK Athens.md` quedó fuera de
// los commits de esa sesión: la línea "Escrito (...)" lo nombraba, pero sale debajo del JSON entero, separada por comas y sin lo que tocan
// los generadores (fuentes/*.html, ESTADO-clubes.md...) ni los registros (cola, categorías aprendidas). Al final se imprime un `git add`
// listo para pegar con lo que CAMBIÓ en esta corrida dentro de lo que commitea cargar-lote.mjs (TOCA_UNA_CARGA de tools/rutas.mjs): se
// compara `git status` + contenido antes y después, así un archivo que ya estaba modificado antes no entra si la carga no lo tocó. Una
// carpeta con más de 10 archivos cambiados (fuentes/: se regeneran todas las páginas) va como carpeta. Por stderr: cargar-lote.mjs lee el
// JSON de stdout.
function cambiadosEnGit() {
  const { SITIO, ADMIN } = TOCA_UNA_CARGA;
  let out = '';
  try { out = execFileSync('git', ['status', '--porcelain', '-z', '--untracked-files=all', '--', ...SITIO, ...ADMIN], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); } catch { return new Map(); }
  const m = new Map();
  for (const e of out.split('\0').filter(Boolean)) {
    const f = e.slice(3); const p = resolve(ROOT, f);
    m.set(f, existsSync(p) ? createHash('sha1').update(readFileSync(p)).digest('hex') : 'borrado');
  }
  return m;
}
function lineaGitAdd(antes, despues) {
  const tocados = [...despues].filter(([f, h]) => antes.get(f) !== h).map(([f]) => f).sort();
  if (!tocados.length) return 'Archivos que tocó esta carga: ninguno según git.';
  const porCarpeta = new Map();
  for (const f of tocados) { const d = dirname(f); porCarpeta.set(d, [...(porCarpeta.get(d) || []), f]); }
  const rutas = [...porCarpeta].flatMap(([d, fs]) => (fs.length > 10 && d !== '.' ? [`${d}/`] : fs));
  return `\nArchivos que tocó esta carga (${tocados.length}), para el commit:\ngit add -- ${rutas.map((f) => `"${f}"`).join(' ')}`;
}

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

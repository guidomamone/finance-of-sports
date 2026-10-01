#!/usr/bin/env node
// ============================================================================
// tools/cargar.mjs — ETAPA 6 del pipeline: cargar en el sitio el ejercicio de un documento ya categorizado.
//
//     node tools/cargar.mjs "Clubes/Países Bajos/PSV/PSV-Jaarverslag-2019-2020.pdf"            # propuesta (default): no escribe nada
//     node tools/cargar.mjs "<pdf>" --escribir                                                  # escribe, audita y revierte si algo falla
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30, to-do 108 sección 3b y to-do 112): el pipeline (tools/pipeline.mjs) llevaba un PDF hasta la
// categorización de sus rubros (etapa 5, `<md>.categorias.json`) y ahí se cortaba: el ejercicio lo cargaba a mano una sesión de Claude. Esta
// herramienta es el paso que faltaba, SOLO para el caso fácil que decidió Guido: un AÑO NUEVO de un club que YA existe en el sitio (el alta de
// clubes nuevos es tools/alta-club.mjs y todavía no se encadena acá). Todo lo que requiera criterio se FRENA con el motivo escrito; no se
// inventa nada. Sin tokens de sesión y sin ninguna API: lee lo que dejaron las etapas anteriores y archivos locales.
//
// ----------------------------------------------------------------------------
// QUÉ HACE, EN ORDEN (cada paso puede FRENAR; la propuesta junta TODOS los motivos, no solo el primero, para que una sesión vea de una vez
// qué falta)
// ----------------------------------------------------------------------------
//  1. REGISTRO (Admin/transcripciones-estado.jsonl, lo arma tools/inventario-transcripciones.mjs):
//       - el PDF tiene que estar `listo-para-jev` (transcripto, validado y con su lista de rubros) y NO `cargado`;
//       - `periodo.tipo` tiene que ser 'anual' y `periodo.nombreNoCoincide` falso (tools/periodo.mjs): un trimestral o un documento cuyo
//         nombre dice otro cierre que el contenido no se carga como ejercicio (se junta con los otros períodos, `periodo.mjs --grupos`);
//       - el `.categorias.json` tiene que estar AL DÍA con su lista de rubros y su `.jev.json` (tools/huellas.mjs): si la lista cambió
//         después de categorizar, las categorías son de otra lista.
//  2. CLUB Y AÑO: el club sale de tools/carpetas-clubes.mjs (la única regla del proyecto) y tiene que existir; el año, del mismo análisis
//     que usa el alta (`analizar()` de tools/alta-club.mjs: nombre del archivo confirmado por las fechas de cierre del contenido) y de
//     `onboard.mjs --quien` (el que usa el registro): si no coinciden, frena. Si el club ya tiene ese año en su fiscalYearMeta, frena.
//  3. FILAS Y MONTOS: `seleccionarFilas()` de tools/proponer-carga.mjs con la estrategia ganadora del test (ancla-listas: cada línea del
//     estado de resultados se abre en la nota o la lista que la desglosa) y la escala por plausibilidad contra los años ya cargados del club.
//     Todo en MILLONES de moneda nativa (convención del sitio, club-data-mapping §5).
//  4. CATEGORÍA DE CADA FILA: la del `.categorias.json` del pipeline (escalón 0 precedente del club, 1 Jev >= 0,90, 2 Claude >= 0,80). Si
//     la fila no está en esa lista (hasta la Versión 320 la etapa 3 del pipeline y la selección de filas de acá NO elegían las mismas filas:
//     Admin/tests/test-cargar.md 4.1; desde la 321 la etapa 3 prepara exactamente esta selección, así que esto pasa solo con listas viejas),
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
//     netInterest + tax. La tolerancia es la de audit.js (0,01 millones): un total que solo cierra por redondeo también FRENA (audit.js
//     daría P0 `no-cierra`), con la diferencia a la vista. Sin total de ingresos que cierre, frena. Gastos o resultado impresos que no
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
//     filas del paso 4), grossDebt y cash en null (no se leen mecánicamente todavía: "sin dato no es cero"), y los tres official*.
//  9. `sources`: la entrada nueva, con `note` INTERNA (lleva la ruta del .md: es la cita que usa carpetas-clubes.mjs) y SIN publicNote
//     (audit.js checkFuentesPublicas: las salvedades públicas las deriva sourceCaveats() de los campos). Y una línea en
//     fuentes/<País>/<Club>.md si ese archivo existe.
//
// --escribir (solo si no quedó NINGÚN motivo para frenar): inserta el año en las tres estructuras del data/<club>-data.js y en sources{},
// la fila de liga en data/club-leagues/<iso2>.js, la cotización de mercado nueva en FX_CLOSE si hace falta, la línea de fuentes/, sube
// ASSET_V (la constante Y cada `?v=` literal de index.html, salvo que ya esté subido respecto de HEAD), corre los 4 generadores y
// `node tools/audit.js --quiet`. Si la auditoría da algún P0/P1, o cualquier paso falla, RESTAURA cada archivo tocado y borra lo creado
// (mismo mecanismo que alta-club.mjs). No commitea (eso lo decide Guido). No toca `.claude/skills/`, `Admin/TODO.md` ni `CHANGELOG.md`.
//
// ----------------------------------------------------------------------------
// MEDIDO (2026-09-30, informe completo en Admin/tests/test-cargar.md)
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
//   node tools/cargar.mjs "<pdf>" --escribir              escribe si no frena; revierte si audit.js da P0/P1
//   node tools/cargar.mjs --lista Admin/mi-lista.txt      una línea por documento (carga / frena y por qué)
//   node tools/cargar.mjs --lista <x> --salida <x.jsonl>  además deja la propuesta completa de cada uno
//   node tools/cargar.mjs --lista <x> --comparar <raíz de otro checkout>
//        BACKTEST: compara cada propuesta contra el MISMO ejercicio cargado en otro checkout (producción). Se corre en un worktree donde se
//        BORRÓ ese año del data file (si no, frena por "ya cargado") y se rehicieron las etapas 3-5 del pipeline sobre esos documentos.
//        Mide totales (ingresos / gastos / resultado), % del dinero en la categoría correcta, fx y liga. Ver Admin/tests/test-cargar.md.
//   Extras: --max-sin-categoria 0.05, --umbral-claude 0.8, --json (con --lista: JSON en vez de una línea)
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync, appendFileSync } from 'node:fs';
import { resolve, relative, join, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

// Los módulos que se reusan leen process.argv al importarse (alta-club.mjs: --escribir activa ANOTAR_MISSES y --anio fuerza el año;
// proponer-carga.mjs: --tabla, --limit, --club...). Las opciones de ESTE comando no son las de ellos: se les pasa un argv limpio.
const ARGS = process.argv.slice(2);
process.argv = process.argv.slice(0, 2);
const { analizar } = await import('./alta-club.mjs');
const { seleccionarFilas, briefingFor } = await import('./proponer-carga.mjs');
const { categoriasAlDia } = await import('./huellas.mjs');
const { precedenteFamilia } = await import('./categorizar-claude.mjs');
const { clubDeRuta } = await import('./carpetas-clubes.mjs');
const { derivado } = await import('./rutas.mjs');
const { agregarCaso, casoYRespuesta } = await import('./cola.mjs');
const { ARCHIVO: ARCHIVO_APRENDIDAS } = await import('./memoria-categorias.mjs');
// Nombres en castellano de las categorías (los de data/category-map.js), para que la pregunta de la cola diga "Administración y gastos
// generales" y no "admin_general_expense".
const NOMBRE_CAT = (() => { try { const t = readFileSync(resolve(import.meta.dirname, '..', 'data', 'category-map.js'), 'utf8'); const o = {}; for (const b of t.match(/_CATEGORY_LABELS = \{[\s\S]*?\n\};/g) || []) for (const m of b.matchAll(/^\s*(\w+): '([^']+)'/gm)) o[m[1]] = m[2]; return o; } catch { return {}; } })();
const { periodoDe } = await import('./periodo.mjs');
const { normalizar, TOTAL_RE, TOTAL_INGRESOS_RE, RESULTADO_EJERCICIO_RE, IMPUESTOS_RE, GASTOS_RE, FINANCIERO_RE, IMPUESTO_GANANCIAS_RE, IMPUESTO_SOLO_RE } = await import('./vocabulario.mjs');

const ROOT = resolve(import.meta.dirname, '..');
const flagVal = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const ESCRIBIR = ARGS.includes('--escribir');
const LISTA = flagVal('--lista');
const SALIDA = flagVal('--salida');
const COMPARAR = flagVal('--comparar');
const JSON_OUT = ARGS.includes('--json');
const MAX_SIN_CAT = flagVal('--max-sin-categoria') !== null ? Number(flagVal('--max-sin-categoria')) : 0.05;
const UMBRAL_CLAUDE = flagVal('--umbral-claude') !== null ? Number(flagVal('--umbral-claude')) : 0.8;
// --desde-verificacion (Versión 324, proceso nuevo; Admin/HANDOFF-pipeline.md "El proceso nuevo"): las filas salen de
// Generados/.../<doc>.verificacion.json (localizar -> validar -> extraer -> verificar), no de seleccionarFilas() (selección por palabras).
// Solo se usa si la verificación quedó en estado 'ok' (sin casos pendientes en la cola humana). SIN PROBAR DE PUNTA A PUNTA todavía: la
// primera corrida real es el primer lote de 5 documentos (HANDOFF).
const DESDE_VERIFICACION = ARGS.includes('--desde-verificacion');
const CON_VALOR = new Set(['--lista', '--salida', '--comparar', '--max-sin-categoria', '--umbral-claude']);
const DOCS = ARGS.filter((a, i) => !a.startsWith('--') && !CON_VALOR.has(ARGS[i - 1]));
const TOL = 0.01; // la de audit.js checkTieOuts(): |calculado - oficial| >= 0,01 es P0 `no-cierra`
const HOY = new Date().toISOString().slice(0, 10);
const norm = normalizar;
const r6 = (x) => (x === null || x === undefined ? x : Number(Number(x).toFixed(6)));

// ============================================================================
// DATOS DEL SITIO (mismo método de `vm` que audit.js / alta-club.mjs: se ejecutan los archivos reales, nunca se parsean a mano)
// ============================================================================
function cargarSitio(root = ROOT) {
  const sandbox = { console: { log() {}, warn() {}, error() {} } }; sandbox.window = sandbox; sandbox.globalThis = sandbox;
  sandbox.document = { createElement() { return {}; }, head: { appendChild() {} } };
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', 'data/leagues.js', 'data/club-leagues.js',
    ...readdirSync(resolve(root, 'data/club-leagues')).filter((f) => f.endsWith('.js')).sort().map((f) => 'data/club-leagues/' + f),
    ...readdirSync(resolve(root, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f)];
  for (const f of files) vm.runInContext(readFileSync(resolve(root, f), 'utf8'), ctx, { filename: f });
  return vm.runInContext('({ clubs, sources, CURRENCY_META, FX_CLOSE, FX_PLAUSIBLE_RANGE, COUNTRIES, LEAGUES, CLUB_LEAGUE_BY_YEAR: window.CLUB_LEAGUE_BY_YEAR, generic: window.CLUB_GENERIC_DATA || {} })', ctx);
}
function categoriasDelSitio() {
  const src = readFileSync(resolve(ROOT, 'data', 'category-map.js'), 'utf8');
  const block = (name) => { const a = src.indexOf(`const ${name} = [`); return src.slice(a, src.indexOf('];', a)); };
  const ids = (b) => [...b.matchAll(/^\s*'([a-z_]+)',?/gm)].map((m) => m[1]);
  return { revenue: new Set(ids(block('REVENUE_CATEGORIES'))), expense: new Set(ids(block('EXPENSE_CATEGORIES'))) };
}
const CATS = categoriasDelSitio();
const ladoDeCat = (c) => (CATS.revenue.has(c) ? 'revenue' : CATS.expense.has(c) ? 'expense' : null);

function leerRegistro(root = ROOT) {
  const p = resolve(root, 'Admin', 'transcripciones-estado.jsonl');
  return existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
}
function quien(pdf) {
  try { return JSON.parse(execFileSync('node', [resolve(ROOT, 'tools/onboard.mjs'), '--quien', pdf], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); } catch { return {}; }
}

// ============================================================================
// VOCABULARIO PROPIO DE ESTA ETAPA (candidato a mudarse a tools/vocabulario.mjs si otra tool lo necesita)
// ============================================================================
// Resultado financiero (FINANCIERO_RE) e impuesto a las ganancias (IMPUESTO_GANANCIAS_RE, IMPUESTO_SOLO_RE): viven en tools/vocabulario.mjs desde la
// Versión 321, porque la selección de filas de proponer-carga.mjs también los usa (no abre esos renglones en una nota).
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
function perimetroHeredado(sitio, clubId) {
  const cd = sitio.generic[clubId] || {};
  const header = (() => { try { return readFileSync(resolve(ROOT, 'data', `${clubId}-data.js`), 'utf8').slice(0, 6000); } catch { return ''; } })();
  const porAnio = {};
  for (const [y, m] of Object.entries(cd.fiscalYearMeta || {})) { const s = sitio.sources[m.sourceId] || {}; porAnio[y] = perimetroDeTexto(`${s.title || ''} ${s.note || ''}`); }
  const vals = new Set(Object.values(porAnio).map((v) => v.replace('?', '')));
  const cab = perimetroDeTexto(header);
  return { porAnio, cabecera: cab, unico: vals.size === 1 ? [...vals][0] : null };
}

// ============================================================================
// LA PROPUESTA
// ============================================================================
export async function proponer(pdfArg, { sitio, registro } = {}) {
  sitio ??= cargarSitio(); registro ??= leerRegistro();
  const pdf = relative(ROOT, resolve(ROOT, pdfArg));
  const P = { pdf, generado: new Date().toISOString(), frena: [], avisos: [], ejercicio: null };
  const frena = (etapa, motivo) => P.frena.push({ etapa, motivo });

  // ---- 1. registro
  const e = registro.find((x) => x.pdf === pdf);
  if (!e) { frena('registro', 'el PDF no está en Admin/transcripciones-estado.jsonl (correr tools/inventario-transcripciones.mjs)'); return P; }
  P.md = e.md;
  if (e.cargado) frena('registro', 'el registro dice que el ejercicio ya está cargado en el sitio');
  if (e.jev !== 'listo-para-jev') frena('registro', `el documento no está listo-para-jev (estado ${e.estado}, jev ${e.jev || '-'})`);
  // El período se recalcula con tools/periodo.mjs sobre el .md actual: el del registro puede ser de una versión anterior de periodo.mjs
  // (el arreglo de las temporadas "2009-10" del 2026-09-30 cambió 165 marcas `nombreNoCoincide`). Si difiere del registro, se avisa.
  let per = e.periodo || null;
  try { const vivo = periodoDe(readFileSync(resolve(ROOT, e.md), 'utf8'), basename(pdf)); if (per && (vivo.tipo !== per.tipo || !!vivo.nombreNoCoincide !== !!per.nombreNoCoincide)) P.avisos.push(`el período del registro (${per.tipo}${per.nombreNoCoincide ? ', nombre no coincide' : ''}) está desactualizado: tools/periodo.mjs hoy dice ${vivo.tipo}${vivo.nombreNoCoincide ? ', nombre no coincide' : ''} (regenerar el registro)`); per = vivo; } catch { /* sin .md: frena abajo */ }
  P.periodo = per;
  if (!per) frena('periodo', 'el registro no tiene `periodo` (tools/periodo.mjs) para este documento');
  else {
    if (per.tipo !== 'anual') frena('periodo', `el documento cubre un período ${per.tipo}${per.meses ? ` de ${per.meses} meses` : ''}${per.cierre ? ` al ${per.cierre}` : ''}: no se carga como ejercicio (juntarlo con los otros períodos: node tools/periodo.mjs --grupos)`);
    if (per.nombreNoCoincide) frena('periodo', `el nombre del archivo dice otro cierre que el contenido (${per.cierre || '?'}): confirmar qué ejercicio es antes de cargarlo`);
  }
  if (!e.md || !existsSync(resolve(ROOT, e.md))) { frena('registro', 'no hay .md en disco'); return P; }
  const mdAbs = resolve(ROOT, e.md);
  const catPath = resolve(ROOT, derivado(e.md, '.categorias.json', { crear: false }));
  if (!existsSync(catPath)) frena('categorizacion', 'no hay .categorias.json (etapa 5 del pipeline: jev-categorizar.mjs + categorizar-claude.mjs --listos)');
  else if (!categoriasAlDia(mdAbs)) frena('categorizacion', 'el .categorias.json NO está al día con su .rubros.json / .jev.json (huellas, tools/huellas.mjs): hay que volver a correr la etapa 5');

  // ---- 2. club y año
  const cr = clubDeRuta(pdf);
  if (!cr.clubId) { frena('club', cr.via === 'ambigua' ? `la carpeta es ambigua (${cr.fuente})` : 'el club no existe en el sitio: es un alta (tools/alta-club.mjs), fuera del alcance de esta etapa'); return P; }
  const clubId = cr.clubId; P.clubId = clubId;
  const club = sitio.clubs[clubId]; const cd = sitio.generic[clubId];
  if (!club || !cd) { frena('club', `${clubId} no tiene data/${clubId}-data.js registrado en CLUB_GENERIC_DATA`); return P; }
  const alta = analizar(pdf, sitio);
  if (alta.error) { frena('alta', alta.error); return P; }
  const campo = (n) => alta.ejercicio.campos.find((c) => c.campo === n) || {};
  const year = alta.ejercicio.anio; P.year = year;
  const q = quien(pdf);
  if (q.year && Number(q.year) !== Number(year)) frena('año', `alta-club.mjs dice ejercicio ${year} y onboard.mjs --quien (el que usa el registro) dice ${q.year}`);
  if (q.clubId && q.clubId !== clubId) frena('club', `carpetas-clubes.mjs dice ${clubId} y onboard.mjs --quien dice ${q.clubId}`);
  if (!year) { frena('año', 'no se pudo determinar el año del ejercicio'); return P; }
  if ((cd.fiscalYearMeta || {})[year]) frena('año', `${clubId} ya tiene el ejercicio ${year} cargado`);
  for (const n of ['anio', 'cierre', 'currency', 'reportType', 'fx']) { const c = campo(n); if (c.estado === 'pregunta') frena(`alta:${n}`, c.pregunta); }
  if (campo('reportType').valor && campo('reportType').valor !== 'official_balance_sheet') frena('alta:reportType', `reportType ${campo('reportType').valor}: esta etapa solo carga balances anuales`);
  // perímetro
  const perC = campo('perimetro'); const her = perimetroHeredado(sitio, clubId);
  let perimetro = perC.valor;
  if (perC.estado === 'pregunta') {
    // Qué dice el documento, según la pregunta del alta: solo el grupo consolidado, consolidado + individual, o dos entidades en la carpeta.
    const docTipo = perC.dosEntidades ? 'dos-entidades' : /solo del GRUPO/.test(perC.pregunta || '') ? 'consolidado' : /CONSOLIDADOS y también individuales/.test(perC.pregunta || '') ? 'ambos' : '?';
    const listaAnios = Object.entries(her.porAnio).map(([y, v]) => `${y} ${v}`).join(', ') || 'ninguno';
    // Se hereda SOLO el consolidado: si el club siempre se cargó consolidado y el documento trae el consolidado (solo o junto al
    // individual), es el mismo perímetro. Heredar "individual" de un documento que trae los dos no alcanza: la selección de filas no sabe
    // elegir las columnas individuales (Bayern cargaba las dos, ver Admin/tests/test-eleccion-tabla.md).
    if (her.unico === 'consolidado' && (docTipo === 'consolidado' || docTipo === 'ambos')) { perimetro = 'consolidado'; P.avisos.push(`perímetro heredado: los años ya cargados del club son consolidados (${listaAnios}) y el documento trae el consolidado${docTipo === 'ambos' ? ' (y también el individual: revisar que no se hayan cargado filas de los dos)' : ''}`); }
    else frena('alta:perimetro', `${perC.pregunta} [documento: ${docTipo}; años cargados del club: ${listaAnios}; cabecera del data file: ${her.cabecera}]`);
  }
  if (club.fiscalYearStart && alta.ejercicio.cierre) {
    const mm = Number(alta.ejercicio.cierre.slice(5, 7)); const fys = `${String(mm === 12 ? 1 : mm + 1).padStart(2, '0')}-01`;
    if (fys !== club.fiscalYearStart) P.avisos.push(`el documento cierra ${alta.ejercicio.cierre} (ejercicio desde el ${fys}) y data/clubs.js dice fiscalYearStart ${club.fiscalYearStart}: ¿cambió el cierre del club?`);
  }
  const moneda = campo('currency').valor;
  if (moneda && club.reportingCurrency && moneda !== club.reportingCurrency) frena('moneda', `el ejercicio saldría en ${moneda} y el club reporta en ${club.reportingCurrency}`);
  const prevMonedas = new Set(Object.values(cd.fiscalYearMeta || {}).map((m) => m.currency).filter(Boolean));
  if (moneda && prevMonedas.size && !prevMonedas.has(moneda)) P.avisos.push(`los años cargados del club están en ${[...prevMonedas].join('/')} y este en ${moneda}`);

  // ---- 3. filas y montos
  let sf;
  if (DESDE_VERIFICACION) {
    const pv = resolve(ROOT, derivado(e.md, '.verificacion.json', { crear: false }));
    if (!existsSync(pv)) { frena('filas', 'no hay .verificacion.json (correr tools/lote.mjs o verificar.mjs)'); return P; }
    const VV = JSON.parse(readFileSync(pv, 'utf8'));
    if (VV.estado !== 'ok') { frena('filas', `la verificación tiene ${VV.cola.length} caso(s) pendientes en la cola humana (node tools/cola.mjs)`); return P; }
    // Mismo formato que seleccionarFilas(): {label, page, section, native, tside, origen}. Ingresos y gastos en positivo (los signos los decide
    // el paso 5 de abajo); financiero e impuesto con su signo impreso y su destino ya decidido por extraer.mjs (no por palabras).
    const raw = [
      ...VV.lineas.map((l) => ({ label: l.etiqueta, page: l.pagina, section: l.origen, native: Math.abs(l.M), tside: l.lado === 'ingreso' ? 'revenue' : 'expense', origen: `verificacion (${l.origen})` })),
      ...VV.financiero.map((l) => ({ label: l.etiqueta, page: null, section: 'financiero', native: l.M, tside: null, origen: 'verificacion', destinoForzado: 'netInterest' })),
      ...VV.impuesto.map((l) => ({ label: l.etiqueta, page: null, section: 'impuesto', native: l.M, tside: null, origen: 'verificacion', destinoForzado: 'tax' })),
    ];
    const totalCands = [VV.totales.ingresos ? { label: 'total de ingresos (verificado)', M: VV.totales.ingresos, page: null, how: 'etiqueta' } : null, VV.totales.gastos ? { label: 'total de gastos (verificado)', M: VV.totales.gastos, page: null, how: 'etiqueta' } : null].filter(Boolean);
    sf = { ok: true, raw, totalCands, docResult: VV.totales.resultadoImpreso, pts: null, extra: { notasUsadas: [] }, refM: null };
  } else try {
    const briefing = await briefingFor(clubId, year, e.md);
    sf = seleccionarFilas({ briefing, mdText: readFileSync(mdAbs, 'utf8'), clubData: cd, year });
  } catch (err) { frena('filas', `seleccionarFilas() falló: ${err.message}`); return P; }
  if (!sf.ok) { frena('filas', sf.motivo); return P; }
  P.seleccion = { filas: sf.raw.length, notasUsadas: sf.extra?.notasUsadas || [], refM: sf.refM };

  // ---- 4. categoría de cada fila
  const cj = existsSync(catPath) ? JSON.parse(readFileSync(catPath, 'utf8')) : { rubros: [] };
  const porEtiqueta = new Map(); for (const r of cj.rubros || []) { const k = norm(r.label); if (!porEtiqueta.has(k)) porEtiqueta.set(k, r); }
  // Precedente del mismo club (todos sus años cargados; el año que se carga no está, por definición): exacto o por FAMILIA de etiquetas, con
  // la MISMA regla que el escalón 0 de la categorización (precedenteFamilia() de tools/categorizar-claude.mjs, medida en su comentario). Hasta la
  // Versión 320 acá había una copia propia, solo exacta y solo con lado conocido.
  const lineasClub = [];
  for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const [y, ls] of Object.entries(cd[key] || {})) for (const l of ls || []) if (l.rawLabel && l.normalizedCategory) lineasClub.push({ club: clubId, year: String(y), side, label: l.rawLabel.trim(), cat: l.normalizedCategory });
  // Categoría "aceptable" de una etiqueta: la del .categorias.json (escalón 0/1, o Claude >= --umbral-claude) o, si la etiqueta no está en
  // esa lista, el precedente del club.
  const catDe = (label, lado) => {
    const c = porEtiqueta.get(norm(label));
    if (c) return { cat: c.categoria || null, conf: c.confianza ?? null, escalon: c.escalon, fuenteCat: 'categorias.json', enLista: true };
    const p = precedenteFamilia(lineasClub, clubId, lado || null, label);
    if (p) return { cat: p.cat, conf: 1, escalon: 0, fuenteCat: `precedente del club, ${p.via} (la fila no estaba en categorias.json)`, enLista: true };
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
  // CATEGORÍA DUDOSA -> COLA HUMANA (Versión 331, decisión 1 de Guido: lo que Claude categorizó con menos de 0,80 no se carga solo). Hasta la
  // 330 esas filas quedaban afuera de la carga sin preguntarle a nadie, las sumas dejaban de cerrar y el documento frenaba con un "no cierra"
  // engañoso (UC 2025: "Transporte", "Arriendo de Bienes" y "Provisión No Operacionales" afuera = 322.108 de menos, resultado −407.737 en vez
  // de −729.845). Ahora:
  //   - cada una va a la cola como pregunta de sí o no ("¿'Transporte' va como Administración y gastos generales?") con la categoría propuesta;
  //   - mientras espera, cuenta en las sumas con la categoría propuesta (las sumas no se rompen) y el documento frena con "N filas esperan
  //     categoría", no con "no cierra";
  //   - la respuesta de Guido gana sobre cualquier otra categoría de esa fila (aceptar -> la propuesta; corregir --valor <categoría> -> esa;
  //     descartar -> la fila no se carga), y queda en Admin/categorias-aprendidas.jsonl con confianza 1: los años siguientes del mismo club la
  //     toman como precedente gratis (memoria-categorias.mjs).
  const respuestaCat = (label) => {
    const { caso, resp } = casoYRespuesta(pdf, 'cargar', 'categoria', norm(label));
    if (!resp || !caso) return null;
    if (resp.decision === 'aceptar') return { cat: caso.categoriaPropuesta };
    if (resp.decision === 'corregir' && resp.valor) return { cat: String(resp.valor).trim() };
    if (resp.decision === 'descartar') return { descartar: true };
    return null;
  };
  const aprendidasYa = existsSync(ARCHIVO_APRENDIDAS) ? readFileSync(ARCHIVO_APRENDIDAS, 'utf8') : '';
  const enCola = [];
  const filas = raw.map((r) => {
    const f = { label: r.label, page: r.page, native: r.native, ladoDoc: r.tside || null, origen: r.origen, ...catDe(r.label, r.tside) };
    const rg = respuestaCat(r.label);
    if (rg?.cat) {
      Object.assign(f, { cat: rg.cat, conf: 1, escalon: 0, fuenteCat: 'respuesta de Guido en la cola', enLista: true });
      const lado = ladoDeCat(rg.cat);
      if (lado && !aprendidasYa.includes(`"label":${JSON.stringify(r.label)},"glosa":null,"categoria":${JSON.stringify(rg.cat)},"confianza":1`)) appendFileSync(ARCHIVO_APRENDIDAS, JSON.stringify({ ts: new Date().toISOString(), club: clubId, year: year != null ? String(year) : null, lado, label: r.label, glosa: null, categoria: rg.cat, confianza: 1, motivo: 'respuesta de Guido en la cola humana (cargar.mjs)', jevDecia: null, jevConf: null, modelo: 'guido', md: e.md }) + '\n');
    }
    if (rg?.descartar) { f.destino = 'excluida'; f.fuenteCat = 'Guido la descartó en la cola'; return f; }
    const nl = norm(r.label);
    // Una fila que NO está en la lista de rubros de la etapa 3 y de la que el documento no dice el lado: la etapa 3 la descartó como no-rubro
    // (partidas de balance, cuadros de bienes de uso que el ancla abrió por error). No se carga y no cuenta como "sin categoría".
    if (r.destinoForzado) f.destino = r.destinoForzado; // proceso nuevo: financiero / impuesto decididos por extraer.mjs
    else if (!f.enLista && !f.ladoDoc) f.destino = 'no-rubro';
    // Resultado financiero e impuesto a las ganancias: al fiscalYearMeta, salvo que el precedente del club diga otra cosa (su convención).
    else if (f.escalon !== 0 && (IMPUESTO_GANANCIAS_RE.test(nl) || IMPUESTO_SOLO_RE.test(nl))) f.destino = 'tax';
    else if (f.escalon !== 0 && FINANCIERO_RE.test(nl) && (!f.cat || f.cat === 'no_es_rubro' || ['other_income', 'other_expenses', 'exceptional_items', 'admin_general_expense'].includes(f.cat))) f.destino = 'netInterest';
    else if (f.cat === 'no_es_rubro') f.destino = 'excluida';
    else if (!f.cat || !ladoDeCat(f.cat)) f.destino = 'sin-categoria';
    else if (!aceptable(f)) {
      // a la cola (ver CATEGORÍA DUDOSA arriba); en las sumas cuenta con la categoría propuesta
      const nombre = NOMBRE_CAT[f.cat] || f.cat;
      agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'categoria', detalle: nl, categoriaPropuesta: f.cat, pagina: r.page || null,
        que: `¿"${r.label}" (${Math.abs(r.native)} en millones de la moneda del documento) va como "${nombre}"?  (por qué: la categorización le dio ${f.conf ?? '?'} de confianza, menos que el mínimo ${UMBRAL_CLAUDE})`,
        propuesta: `sí (responder aceptar si estás de acuerdo; si no, corregir --valor <categoría> con una de data/category-map.js)` });
      enCola.push(f); f.enCola = true; f.destino = ladoDeCat(f.cat);
    }
    else f.destino = ladoDeCat(f.cat);
    if ((f.destino === 'revenue' || f.destino === 'expense') && f.ladoDoc && f.ladoDoc !== f.destino) f.ladoContradictorio = true;
    return f;
  });
  P.filas = filas;
  if (enCola.length) frena('categoria-en-cola', `${enCola.length} fila(s) esperan categoría en la cola humana (node tools/cola.mjs): ${enCola.slice(0, 5).map((f) => `"${f.label.slice(0, 40)}" -> ${f.cat} ${f.conf ?? ''}`).join('; ')}`);
  const suma = (arr) => arr.reduce((a, x) => a + Math.abs(x.native || 0), 0);
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
  for (const f of rev) f.amountNative = r6(revInv.get(tablaDe(f)) ? -f.native : f.native);
  const gastosConSigno = expDoc;
  P.signos = { porTabla: Object.fromEntries([...conSigno].map(([k, v]) => [k, v ? 'gastos con signo' : 'gastos sin signo (se invierten)'])) };
  const metaFilas = filas.filter((f) => f.destino === 'netInterest' || f.destino === 'tax');
  // DOS LECTURAS DE SIGNO PARA LOS GASTOS, y la que haga cerrar el resultado impreso gana (si ninguna cierra, se queda la primera y frena):
  //   'por tabla'          la mayoría de las filas de gasto de cada tabla decide si esa tabla imprime los gastos con signo;
  //   'todos negativos'    -|x| para todo gasto. Existe por los estados que MEZCLAN presentaciones en la misma tabla (PSV 2020: "Kostprijs
  //                        van de omzet 3.793" sin signo arriba de "Som der bedrijfslasten" y "Afschrijving op vergoedingssommen -22.305"
  //                        con signo más abajo): ninguna mayoría por tabla acierta las dos.
  // Y dos para el resultado financiero y el impuesto: como sus gastos vecinos, o por las palabras de la etiqueta (gasto/pérdida -> negativo).
  const signoPorPalabras = (f) => (GASTOS_RE.test(norm(f.label)) || /aufwend|expense|cost|charge|gasto|despesa|omkostning|kostnad|udgift|verlust|loss|perdida|negativ/.test(norm(f.label)) || f.destino === 'tax' ? -Math.abs(f.native) : Math.abs(f.native));
  const lecturasGasto = [
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
      const pat = revSum + expTodoG + ni + tx + extra;
      if (!meta) meta = { netInterest: r6(ni), tax: r6(tx), pat: r6(pat) };
      for (const x of patImpresos) {
        const impreso = Math.abs(x.M - pat) < TOL ? x.M : (PERDIDA_RE.test(norm(x.label)) && x.M > 0 && Math.abs(-x.M - pat) < TOL) ? -x.M : null;
        if (impreso !== null) { meta = { netInterest: r6(ni), tax: r6(tx), pat: r6(pat) }; cierraPat = { lectura: `${G.nombre}; ${L.nombre}`, impreso: x, valor: impreso, L }; lecturaGasto = G; break busqueda; }
      }
    }
    return { meta, cierraPat, lecturaGasto };
  };
  let { meta, cierraPat, lecturaGasto } = buscarPat();
  for (const f of exp) f.amountNative = r6(lecturaGasto.v(f));
  P.signos.elegida = cierraPat ? cierraPat.lectura : `${lecturaGasto.nombre} (ninguna lectura cerró el resultado)`;
  const expSinExc = exp.filter((f) => f.cat !== 'exceptional_items').reduce((a, f) => a + f.amountNative, 0);
  const expTodo = exp.reduce((a, f) => a + f.amountNative, 0);
  const T = { revSum: r6(revSum), expSum: r6(expSinExc), officialTotalRevenue: null, officialTotalExpenses: null, officialPAT: null, verificacion: {} };
  if (!meta) meta = { netInterest: 0, tax: 0 };
  if (cierraPat) { T.officialPAT = r6(cierraPat.valor); T.patImpreso = { label: cierraPat.impreso.label, pag: cierraPat.impreso.page, M: cierraPat.impreso.M, signos: cierraPat.lectura }; T.verificacion.pat = 'impreso'; }
  else if (patImpresos.length && rev.length) frena('tie-out-resultado', `resultado: ingresos ${r6(revSum)} + gastos ${r6(expTodo)} + netInterest ${meta.netInterest} + tax ${meta.tax} = ${r6(revSum + expTodo + meta.netInterest + meta.tax)} no coincide con ningún resultado impreso (${patImpresos.slice(0, 4).map((x) => `"${String(x.label).slice(0, 40)}" ${x.M}`).join('; ')})`);
  else P.avisos.push('no se encontró el resultado del ejercicio impreso: officialPAT queda null (audit.js P2 balance-sin-pat)');
  // 6b. total de ingresos y de gastos: un total IMPRESO igual a la suma de las líneas; si el documento no lo imprime pero el resultado cerró,
  // se usa la suma de las líneas y se marca `por-resultado` (verificado por el resultado, no por un total propio).
  // FILA DE REDONDEO (decisión 3 de Guido, 2026-09-30): si la suma de las líneas y el total impreso difieren SOLO por redondeo, se agrega una
  // línea explícita "Diferencia de redondeo" por la diferencia (other_income en ingresos, other_expenses en gastos) y el total oficial es el
  // IMPRESO: el total cierra exacto contra el documento (audit.js exige < 0,01) y la diferencia queda a la vista en vez de escondida. "Solo por
  // redondeo" es estricto: menos de MEDIA UNIDAD de lo impreso por cada fila sumada (n filas en miles -> hasta n x 0,0005 millones). NO la
  // tolerancia de buscar() (que además acepta 0,06% del total): Real Madrid 2005-06 difiere 0,12 millones con filas en miles, y eso no es
  // redondeo (con ~15 filas daría 0,0075), es una fila de más o de menos o un error de lectura: sigue frenando.
  // Se usa solo cuando el resultado del ejercicio NO cerró con la suma: si cerró, la suma ya está verificada (`por-resultado`) y una fila de
  // redondeo lo descuadraría. Después de agregarla se vuelve a buscar el resultado impreso con la diferencia sumada.
  let ajusteRedondeo = 0;
  const lado = (nombre, arr, objetivo, clave, filtro) => {
    if (!arr.length) { if (nombre === 'gastos') P.avisos.push('ninguna fila de gastos: officialTotalExpenses queda null (el sitio muestra "sin dato")'); else frena('tie-out', 'ninguna fila de ingresos con categoría aceptable'); return; }
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
  else if (sitio.sources[sourceId]) frena('fuente', `sources['${sourceId}'] ya existe`);
  const ligaC = campo('liga');
  const ligaExistente = ((sitio.CLUB_LEAGUE_BY_YEAR || {})[clubId] || {})[year];
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
  P.ejercicio = {
    clubId, year, cierre: alta.ejercicio.cierre, perimetro,
    revenueLines: rev.map((f) => ({ rawLabel: f.label, normalizedCategory: f.cat, amountNative: f.amountNative, disclosureLevel: disclosure(f), _pag: f.page, _escalon: f.escalon, _conf: f.conf })),
    expenseLines: exp.map((f) => ({ rawLabel: f.label, normalizedCategory: f.cat, amountNative: f.amountNative, disclosureLevel: disclosure(f), _pag: f.page, _escalon: f.escalon, _conf: f.conf })),
    fiscalYearMeta: { ...m, sourceId, reportType: campo('reportType').valor || 'official_balance_sheet', gestionId: null, profitOnPlayerSales: 0, assetSales: 0, netInterest: meta.netInterest, tax: meta.tax, ...(extraRows ? { extraRows } : {}), grossDebt: null, cash: null, officialTotalRevenue: T.officialTotalRevenue, officialTotalExpenses: T.officialTotalExpenses, officialPAT: T.officialPAT },
    source: sourceId ? { id: sourceId, clubId, title: `${club.name || club.displayName} — ${basename(pdf, '.pdf')} (ejercicio ${year})`, type: campo('reportType').valor || 'official_balance_sheet', reliability: 'primary', note: `Cargado por tools/cargar.mjs (${HOY}) desde la transcripción ${e.md}; categorías del pipeline (${cj.modelo || 'Jev/Claude'}). Perímetro: ${perimetro || '?'}.` } : null,
  };
  P.resumen = { carga: P.frena.length === 0, motivos: P.frena.length, lineasIngreso: rev.length, lineasGasto: exp.length, metaFilas: metaFilas.length, excluidas: filas.filter((f) => f.destino === 'excluida').length };
  return P;
}

// ============================================================================
// EDICIÓN DE ARCHIVOS JS: se busca el bloque por su apertura y se cierra por conteo de llaves (saltando strings y comentarios), nunca con
// una regex sobre el archivo entero (los data files tienen comentarios con llaves y strings con comillas escapadas).
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
function insertarEnObjeto(src, apertura, texto, archivo) {
  const a = src.indexOf(apertura); if (a < 0) throw new Error(`${archivo}: no encontré "${apertura}"`);
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

export function escribir(P) {
  const E = P.ejercicio; const id = E.clubId; const y = E.year;
  const dataRel = `data/${id}-data.js`; const dataPath = resolve(ROOT, dataRel);
  const [paisCarpeta, clubCarpeta] = P.pdf.split('/').slice(1, 3);
  const fuentesMd = `fuentes/${paisCarpeta}/${clubCarpeta}.md`;
  const extra = existsSync(resolve(ROOT, fuentesMd)) ? [fuentesMd] : [];
  const snap = snapshot(extra); const escritos = [];
  try {
    let src = readFileSync(dataPath, 'utf8');
    const reg = src.match(/CLUB_GENERIC_DATA(?:\[\s*['"][^'"]+['"]\s*\]|\.[A-Za-z_$][\w$]*)\s*=\s*\{([\s\S]*?)\};/);
    if (!reg) throw new Error(`${dataRel}: no encontré el registro en CLUB_GENERIC_DATA`);
    const varDe = (k) => (reg[1].match(new RegExp(`${k}\\s*:\\s*([A-Za-z_$][\\w$]*)`)) || [])[1];
    const vRev = varDe('revenueLinesByYear'); const vExp = varDe('expenseLinesByYear'); const vMeta = varDe('fiscalYearMeta');
    if (!vRev || !vExp || !vMeta) throw new Error(`${dataRel}: el registro no nombra las tres variables (revenue/expense/meta)`);
    const linea = (l) => `    { rawLabel:${js(l.rawLabel)}, normalizedCategory:${js(l.normalizedCategory)}, amountNative:${num(l.amountNative)}, disclosureLevel:${js(l.disclosureLevel)} }, // pág. ${l._pag ?? '?'}, ${['precedente', 'Jev', 'Claude'][l._escalon] ?? '?'}${l._conf != null && l._escalon ? ` ${l._conf}` : ''}\n`;
    const cab = `  // ${y}: cargado por tools/cargar.mjs (${HOY}) desde ${P.md}. Filas: proponer-carga.mjs (ancla-listas); categorías:\n  // ${derivado(P.md, '.categorias.json', { crear: false })} (escalón por línea al lado). Tie-out contra lo impreso: ${P.totales.revImpreso ? `ingresos "${String(P.totales.revImpreso.label).slice(0, 60)}" pág. ${P.totales.revImpreso.pag}` : '-'}${P.totales.expImpreso ? `; gastos "${String(P.totales.expImpreso.label).slice(0, 60)}" pág. ${P.totales.expImpreso.pag}` : ''}${P.totales.patImpreso ? `; resultado "${String(P.totales.patImpreso.label).slice(0, 60)}"` : ''}.\n`;
    src = insertarEnObjeto(src, `const ${vRev} = {`, `${cab}  ${y}: [\n${E.revenueLines.map(linea).join('')}  ],\n`, dataRel);
    src = insertarEnObjeto(src, `const ${vExp} = {`, `  ${y}: [ // tools/cargar.mjs (${HOY})\n${E.expenseLines.map(linea).join('')}  ],\n`, dataRel);
    const M = E.fiscalYearMeta;
    const fxTxt = M.fxRef ? `fxRef:${js(M.fxRef)}` : M.fx != null ? `fx:${num(M.fx)}, fxSource:${js(M.fxSource)}` : '';
    const metaTxt = `  ${y}: { // tools/cargar.mjs (${HOY}). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.\n    currency:${js(M.currency)}${fxTxt ? ', ' + fxTxt : ''},\n    sourceId:${js(M.sourceId)},\n    reportType:${js(M.reportType)},\n    gestionId:null,\n    profitOnPlayerSales:0, assetSales:0,\n    netInterest:${num(M.netInterest)}, tax:${num(M.tax)},\n${M.extraRows ? `    extraRows: [\n${M.extraRows.map((x) => `      {label:${js(x.label)}, value:${num(x.value)}},\n`).join('')}    ],\n` : ''}    grossDebt:null, cash:null,\n    officialTotalRevenue:${num(M.officialTotalRevenue)}, officialTotalExpenses:${num(M.officialTotalExpenses)}, officialPAT:${num(M.officialPAT)},\n  },\n`;
    src = insertarEnObjeto(src, `const ${vMeta} = {`, metaTxt, dataRel);
    const S = E.source;
    src = insertarEnObjeto(src, 'Object.assign(sources, {', `  ${js(S.id)}: {\n    id:${js(S.id)}, clubId:${js(S.clubId)},\n    title:${js(S.title)},\n    type:${js(S.type)}, reliability:${js(S.reliability)},\n    note:${js(S.note)},\n  },\n`, dataRel);
    writeFileSync(dataPath, src); escritos.push(dataRel);

    // liga
    const iso = String((cargarSitio().clubs[id] || {}).country || '').toLowerCase();
    const ligaPath = resolve(ROOT, 'data/club-leagues', `${iso}.js`);
    if (P.liga.estado !== 'existe') {
      if (!existsSync(ligaPath)) throw new Error(`no existe data/club-leagues/${iso}.js`);
      let lt = readFileSync(ligaPath, 'utf8');
      const val = P.liga.valor ? js(P.liga.valor) : 'null';
      const clave = new RegExp(`(^|\\n)\\s*['"]?${id.replace(/[-]/g, '\\-')}['"]?\\s*:\\s*\\{`);
      const mm = lt.match(clave);
      if (mm) {
        const abre = lt.indexOf('{', mm.index + mm[0].length - 1); const cierra = cierreDe(lt, abre);
        const dentro = lt.slice(abre + 1, cierra).replace(/\s+$/, '');
        lt = lt.slice(0, abre + 1) + dentro + `${dentro.trim() && !dentro.trim().endsWith(',') ? ',' : ''} ${y}: ${val} ` + lt.slice(cierra);
        lt = lt.replace(new RegExp(`(\\n[^\\n]*${id.replace(/[-]/g, '\\-')}[^\\n]*)`), `$1 // ${y}: tools/cargar.mjs ${HOY}, ${P.liga.valor ? `verificado contra ${String(P.liga.fuente).slice(0, 90)}` : 'SIN VERIFICAR'}`);
      } else {
        lt = insertarEnObjeto(lt, 'Object.assign(window.CLUB_LEAGUE_BY_YEAR, {', `  // ${id} ${y} (tools/cargar.mjs, ${HOY}): ${P.liga.valor ? `verificado contra ${P.liga.fuente}` : `SIN VERIFICAR (${P.liga.fuente})`}.\n  ${js(id)}: { ${y}: ${val} },\n`, `data/club-leagues/${iso}.js`);
      }
      writeFileSync(ligaPath, lt); escritos.push(`data/club-leagues/${iso}.js`);
    }
    // cotización de mercado nueva
    if (P.fxCloseNuevo) {
      const cmPath = resolve(ROOT, 'data/currency-map.js'); const cm = readFileSync(cmPath, 'utf8');
      if (!cm.includes(`'${P.fxCloseNuevo.key}':`)) {
        writeFileSync(cmPath, insertarEnObjeto(cm, 'const FX_CLOSE = {', `  '${P.fxCloseNuevo.key}': { fx: ${P.fxCloseNuevo.fx}, source: 'market_close', label: ${js(P.fxCloseNuevo.label)} }, // tools/cargar.mjs ${HOY} (tools/fx-reference/)\n`, 'data/currency-map.js'));
        escritos.push('data/currency-map.js');
      }
    }
    // fuentes/<País>/<Club>.md (interno, no se publica)
    if (extra.length) { appendFileSync(resolve(ROOT, fuentesMd), `\n- Cargado en el sitio por tools/cargar.mjs (${HOY}): ejercicio ${y} desde \`${P.pdf}\` (sourceId \`${E.source.id}\`).\n`); escritos.push(fuentesMd); }
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
    // generadores + auditoría
    for (const g of ['tools/generate-club-index.js', 'tools/generate-fuentes-page.js', 'tools/generate-rankings.js', 'tools/generate-como-corre-stats.js'].filter((g) => existsSync(resolve(ROOT, g)))) {
      const r = runNode(g, []); if (r.code !== 0) throw new Error(`${g} falló (código ${r.code}): ${r.out.slice(-500)}`);
    }
    const audit = runNode('tools/audit.js', ['--quiet']);
    const linea0 = (audit.out.match(/P0 \d+ · P1 \d+[^\n]*/) || [''])[0];
    if (audit.code !== 0) { const rv = revertir(snap, extra); return { ok: false, motivo: `node tools/audit.js dio P0/P1 (${linea0}); se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, audit: audit.out.slice(-2500), escritos }; }
    return { ok: true, escritos, audit: linea0 };
  } catch (err) {
    const rv = revertir(snap, extra);
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

// ============================================================================
// CLI
// ============================================================================
async function main() {
  const docs = LISTA ? readFileSync(resolve(ROOT, LISTA), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : DOCS;
  if (!docs.length) { console.error('Uso: node tools/cargar.mjs "<pdf>" [--escribir]  |  --lista <archivo> [--salida x.jsonl] [--comparar <raíz>] (ver la cabecera)'); process.exit(1); }
  if (ESCRIBIR && docs.length > 1) { console.error('--escribir va de a un documento por vez.'); process.exit(1); }
  const sitio = cargarSitio(); const registro = leerRegistro();
  const prod = COMPARAR ? cargarSitio(resolve(COMPARAR)) : null;
  const salidas = [];
  for (const d of docs) {
    let P;
    try { P = await proponer(d, { sitio, registro }); } catch (err) { P = { pdf: d, frena: [{ etapa: 'error', motivo: err.stack?.split('\n').slice(0, 3).join(' | ') }], avisos: [] }; }
    if (prod) P.comparacion = comparar(P, prod);
    salidas.push(P);
    if (SALIDA) appendFileSync(resolve(ROOT, SALIDA), JSON.stringify(P) + '\n');
    // Con --lista (lo que usa lote.mjs) se imprime SIEMPRE el resumen, aunque la lista tenga un solo documento, y la propuesta completa va a
    // Generados/.../<doc>.carga.json. Hasta la Versión 329 un lote de un documento imprimía el JSON entero en la terminal (~400 líneas;
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
  // ÚLTIMA CORRIDA EN LISTA (Versión 323, pedido de Guido: ver en el tablero por qué frena la etapa 6, por grupo de países): un resumen por
  // documento en Admin/cargar-ultimo.jsonl (se PISA en cada corrida con --lista; no con un documento suelto ni con --comparar, que es un
  // backtest en otro checkout). Lo lee tools/estado.mjs. La propuesta completa sigue yendo a --salida si se la pide.
  if (LISTA && !COMPARAR) {
    const resumen = salidas.map((P) => ({ pdf: P.pdf, clubId: P.clubId || null, year: P.year || null, carga: !P.frena.length, motivos: [...new Set(P.frena.map((f) => f.etapa.replace(/:.*/, '')))], primero: P.frena[0]?.motivo?.slice(0, 200) || null }));
    writeFileSync(resolve(ROOT, 'Admin', 'cargar-ultimo.jsonl'), resumen.map((x) => JSON.stringify({ ts: new Date().toISOString(), lista: LISTA, ...x })).join('\n') + '\n');
    console.log(`\n${resumen.filter((x) => x.carga).length} de ${resumen.length} cargarían. Resumen en Admin/cargar-ultimo.jsonl (lo muestra node tools/estado.mjs).`);
  }
  if ((docs.length === 1 && !LISTA) || JSON_OUT) console.log(JSON.stringify(docs.length === 1 ? salidas[0] : salidas, null, 1));
  if (ESCRIBIR) {
    const P = salidas[0];
    if (P.frena.length) { console.error(`\nNo se escribe nada: ${P.frena.length} motivo(s) para frenar.`); process.exit(1); }
    const r = escribir(P);
    console.error(r.ok ? `\nEscrito (${r.escritos.join(', ')}). Auditoría: ${r.audit}. No se commiteó nada.` : `\nREVERTIDO: ${r.motivo}\n${r.audit || ''}`);
    process.exit(r.ok ? 0 : 1);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) await main();

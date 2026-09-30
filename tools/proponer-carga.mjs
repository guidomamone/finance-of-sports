#!/usr/bin/env node
// ============================================================================
// tools/proponer-carga.mjs — etapa 5 del pipeline, versión 1: MIDE si un script puede reconstruir un ejercicio a partir del
// .md, antes de dejarle escribir nada (to-do 108, decisión de Guido 2026-09-30). No escribe ningún archivo del sitio.
//
//   --backtest   toma los ejercicios YA CARGADOS que tienen su .md, arma "qué habría propuesto el script" usando SOLO lo que
//                había antes (el precedente de categorías sale de los OTROS años del mismo club) y lo compara con lo que hay en
//                producción. Es la única forma honesta de saber qué parte de la carga es mecánica.
//   --pdf <ruta> [--club id]   propone la carga de un documento puntual (imprime la propuesta).
//
// Qué hace, mecánicamente (nada de esto usa IA ni internet):
//   1. Corre tools/prepare-onboarding.mjs sobre el .md (tablas, formato numérico, chequeo de sumas).
//   2. Elige las tablas de estado de resultados (o de recursos y gastos) y, en ellas, la columna del ejercicio.
//   3. Detecta la escala (unidades / miles / millones) por el texto de la página y pasa todo a MILLONES de moneda nativa.
//   4. VERSIÓN 1: cada fila la categoriza Jev (con el lado de la tabla y 8 ejemplos parecidos de otros ejercicios; nunca ejemplos
//      del ejercicio que se está reconstruyendo). Si la confianza es < 0,90 queda "necesita criterio".
//      Escala: por plausibilidad contra los ingresos que ese club ya tiene cargados en otros años (no por palabras).
//   5. Detecta en el documento la fila de total de ingresos y la del resultado del ejercicio.
//   6. Compara contra producción POR CATEGORÍA (los rubros de producción son agrupaciones curadas a mano, no filas literales, así que
//      comparar por texto no sirve): qué porcentaje del dinero de producción quedó en la categoría correcta, en ingresos y en gastos.
//
// USO:
//   node tools/proponer-carga.mjs --backtest [--limit 40] [--club id] [--concurrencia 4] [--mistral-fresco]
//   node tools/proponer-carga.mjs --backtest --mistral-fresco --tabla ancla --cache-jev /ruta/cache.jsonl --etiqueta _ancla
//   node tools/proponer-carga.mjs --pdf "Clubes/Croacia/Dinamo Zagreb/financijsko-izvjesce-2021.pdf"
// Deja el detalle en Admin/tests/test-proponer-carga.jsonl y el resumen en Admin/tests/test-proponer-carga.md.
//
// ELECCIÓN DE LA TABLA (--tabla <estrategia>, test del 2026-09-30, informe completo en Admin/tests/test-eleccion-tabla.md):
//   Un documento trae varias tablas con ingresos: el estado de resultados resumido ("Group turnover 616.580") y la nota que lo abre
//   ("3. Group turnover": taquilla, TV, comercial... que suman 616.580). La versión 1 solo miraba las tablas marcadas `likelyRelevant` por
//   extract-table-rows.mjs, y la nota de Arsenal NO lo estaba: por eso Arsenal/Fulham/Werder/Bayern caían a 0-5% de dinero bien ubicado.
//   Estrategias medidas (ver la sección "estrategias de elección de tabla" más abajo para el detalle de cada una):
//     actual        la de la versión 1: todas las filas de todas las tablas de estado de resultados, sin abrir ninguna nota.
//     ancla         cada línea del estado de resultados (y cada subtotal) se busca en TODO el documento: si hay una tabla cuyas filas
//                   suman exactamente ese importe, se cargan esas filas en vez de la línea resumida (recursivo, hasta 3 niveles).
//     ancla-listas  igual, pero además busca en las listas con viñetas ("- Einnahmen aus dem Spielbetrieb 260,7 Mio. Euro", Bayern).
//     cierre        por lado, la tabla con más filas cuya suma coincide con algún total impreso del documento.
//     precedente    por lado, la tabla cuyas etiquetas más se parecen a los rubros que el club ya tiene cargados en OTROS años.
//   El default (DEFAULT_TABLA, más abajo) es la ganadora del test: ancla-listas. Medido sobre 92 ejercicios cargados con .mistral-redo.md
//   (74 arman propuesta), dinero bien ubicado por categoría, media:
//                     ingresos   gastos   ingresos "de más" (mediana)   ejercicios con <=10% de ingresos bien ubicados
//     actual            54%       55%          53%                          21
//     ancla-listas      64%       55%          20%                          12
//   En el set de 40 de la versión 1: 67% -> 70% ingresos, 60% -> 58% gastos. Arsenal, Fulham y Bayern pasan de 0-7% a 99-100% en ingresos.
//   Otros flags del test: --ancla-solo-principales (primera versión de ancla, peor: 58%/48%), --ventanas-libres (acepta ventanas de 3+ filas
//   que no cierran contra un total impreso: 63%/53%, más filas basura), --sin-mistral-nuevo (no transcribe nada nuevo con --mistral-fresco).
//   PROPONER_DEBUG=1 imprime qué tablas de estado se recorren y cuáles se excluyen por ser balance/flujo/patrimonio.
//   --cache-jev <archivo.jsonl>: guarda cada respuesta de Jev (club|año|lado|etiqueta) para que comparar estrategias no repita llamadas ni
//   meta ruido (Jev no es 100% determinista: sin caché, dos corridas de la MISMA estrategia difieren un par de puntos).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import vm from 'node:vm';
import { filasSuma, ladosPorEstructura, ladoPorPalabras, esResultado, noEsRubro as noEsRubroFR } from './filas-rubro.mjs';
// Vocabulario multi-idioma y normalización (Versión 316): tools/vocabulario.mjs, el mismo de pipeline.mjs / filas-rubro.mjs / extract-table-rows.mjs.
import { derivado, ubicar } from './rutas.mjs';
import { normalizar, TITULO_RESULTADOS_RE, TOTAL_INICIO_RE, TOTAL_INGRESOS_RE, RESULTADO_EJERCICIO_RE, INGRESOS_TABLA_RE, GASTOS_RE, NOTAS_COLUMNA_RE, FLUJO_O_PATRIMONIO_RE, TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE } from './vocabulario.mjs';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const BACKTEST = args.includes('--backtest');
const limit = flagVal('--limit') !== null ? Number(flagVal('--limit')) : 0;
const clubOnly = flagVal('--club');
const FRESH = args.includes('--mistral-fresco'); // usa una transcripción NUEVA de Mistral (con tablas) en vez del .md guardado: lo que produciría el pipeline hoy
const ESCAPE = args.includes('--con-escape'); // le ofrece a Jev la opción no_es_rubro en vez de obligarla a elegir una categoría
const FILTRO_OFF = args.includes('--sin-filtro'); // para medir el efecto del filtro de filas que no son rubros
const SOLO_TOTALES = args.includes('--solo-totales'); // no llama a Jev: solo mide la detección del total de ingresos (iteración barata)
const TAG = flagVal('--etiqueta') || ''; // sufijo de los informes, para no pisar los de otra variante
const TABLAS_VALIDAS = ['actual', 'ancla', 'ancla-listas', 'cierre', 'precedente'];
const DEFAULT_TABLA = 'ancla-listas'; // ganadora del test del 2026-09-30 (Admin/tests/test-eleccion-tabla.md)
const TABLA = flagVal('--tabla') || DEFAULT_TABLA;
if (!TABLAS_VALIDAS.includes(TABLA)) { console.error(`--tabla tiene que ser una de: ${TABLAS_VALIDAS.join(', ')}`); process.exit(1); }
const CACHE_JEV = flagVal('--cache-jev');
const VENTANAS_LIBRES = args.includes('--ventanas-libres'); // ver findExpansion()
// --sin-mistral-nuevo (con --mistral-fresco): usa solo los ejercicios que YA tienen su .mistral-redo.md y no transcribe ninguno nuevo. Sin esto,
// `--mistral-fresco --limit 0` mandaba a Mistral los ~125 documentos que no lo tienen (~5.500 páginas, ~US$ 22).
const SIN_MISTRAL_NUEVO = args.includes('--sin-mistral-nuevo');
const SOLO_PRINCIPALES = args.includes('--ancla-solo-principales'); // ver selectAncla()
const concurrency = Number(flagVal('--concurrencia') || 4);
// Importado como módulo (tools/cargar.mjs, la etapa 6, usa seleccionarFilas() y briefingFor()) no se corre nada: solo como comando.
const IS_MAIN = import.meta.url === `file://${process.argv[1]}`;
if (IS_MAIN && !BACKTEST && !flagVal('--pdf')) { console.error('Uso: node tools/proponer-carga.mjs --backtest [--limit N]   o   --pdf <ruta> [--club id]'); process.exit(1); }

// ---------------------------------------------------------------- datos del sitio
export function loadSite() {
  const sandbox = { console, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...readdirSync(resolve(root, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f)];
  for (const rel of files) vm.runInContext(readFileSync(resolve(root, rel), 'utf8'), ctx, { filename: rel });
  return { generic: vm.runInContext('window.CLUB_GENERIC_DATA', ctx), clubs: vm.runInContext('typeof clubs !== "undefined" ? clubs : null', ctx) };
}

// ---------------------------------------------------------------- utilidades de texto y números
const norm = normalizar;
// Título de estado de resultados, total, total de ingresos y resultado del ejercicio: tools/vocabulario.mjs (29 idiomas).
const STATEMENT_RE = TITULO_RESULTADOS_RE;
const TOTAL_RE = TOTAL_INICIO_RE;
const REV_TOTAL_RE = TOTAL_INGRESOS_RE;
const RESULT_RE = RESULTADO_EJERCICIO_RE;

export function parseNumber(raw) {
  let s = String(raw).trim().replace(/R\$|[$€£¥]/g, '').replace(/^\s*-\s+(?=\()/, '').trim();
  if (!/\d/.test(s)) return null;
  s = s.replace(/(\d)\s+(?=\d)/g, '$1');
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith('-') || s.startsWith('−')) { neg = true; s = s.slice(1); }
  const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
  if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (c !== -1) s = /,\d{3}$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 3) s = s.replace(/\./g, '');
  const n = parseFloat(s.replace(/[^0-9.eE-]/g, ''));
  return Number.isNaN(n) ? null : (neg ? -n : n);
}

// Escala por el texto de la página donde está la tabla (encabezado de la moneda: "in thousands", "€000", "em milhares"...).
function detectScale(text) {
  const t = norm(text);
  if (/\b(millions?|mio\.?|mln|millones|milhoes|mill\.|млн)\b|in millions|\bm€|€ ?m\b/.test(t)) return { unit: 'millones', mult: 1 };
  if (/\b(thousands?|tsd\.?|teur|tusd|t€|tdkk|tnok|tsek|tchf|milhares|tusen|tusind|тыс|тис|tis\.)\b|'000|\(000\)|€ ?000|k€|\b000s?\b|\bmiles\b|en miles|in tausend|tausend eur|tuhat/.test(t)) return { unit: 'miles', mult: 1e-3 };
  return { unit: 'unidades', mult: 1e-6 };
}

function pageText(md, page) {
  const re = /^--- pág\. (\d+) ---[ \t]*\r?\n?/gm; const marks = [...md.matchAll(re)];
  const i = marks.findIndex((m) => Number(m[1]) === page);
  return i < 0 ? '' : md.slice(marks[i].index, i + 1 < marks.length ? marks[i + 1].index : md.length);
}

// Columna del ejercicio: la que dice el año en su encabezado (2024, 2023/24, 2023-24...), y si no, la primera con números.
function yearColumn(table, year) {
  const cols = table.columns || [];
  const y = String(year); const y1 = String(year - 1); const yy = y.slice(2);
  const hit = (h) => new RegExp(`(^|\\D)(${y}|${y1}[-/ ]${yy}|${y1}[-/]${y})(\\D|$)`).test(String(h));
  for (let j = 1; j < cols.length; j++) if (hit(cols[j])) return j - 1;
  const numericCols = [];
  const width = Math.max(0, ...table.rows.map((r) => r.values.length));
  for (let j = 0; j < width; j++) {
    const head = norm(cols[j + 1] || '');
    if (NOTAS_COLUMNA_RE.test(head)) continue; // notas / anexo / código de fila (tools/vocabulario.mjs)
    const nums = table.rows.filter((r) => parseNumber(r.values[j] ?? '') !== null).length;
    if (nums >= Math.max(3, table.rows.length * 0.4)) numericCols.push(j);
  }
  return numericCols.length ? numericCols[0] : null;
}

// ---------------------------------------------------------------- Jev (mismo pedido que tools/jev-categorizar.mjs)
function loadCategories() {
  const src = readFileSync(resolve(root, 'data', 'category-map.js'), 'utf8');
  const block = (name) => { const a = src.indexOf(`const ${name} = [`); return src.slice(a, src.indexOf('];', a)); };
  const labels = (name) => { const a = src.indexOf(`const ${name} = {`); const b = src.slice(a, src.indexOf('};', a)); return Object.fromEntries([...b.matchAll(/^\s*([a-z_]+):\s*'([^']*)'/gm)].map((m) => [m[1], m[2]])); };
  const build = (arr, lab) => { const l = labels(lab); const o = {}; for (const m of block(arr).matchAll(/^\s*'([a-z_]+)',?\s*(?:\/\/\s*(.*))?$/gm)) { const c = (m[2] || '').replace(/\(Versión \d+[^)]*\)/g, '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s/)[0].slice(0, 220); o[m[1]] = [l[m[1]] || m[1], c].filter(Boolean).join(' — '); } return o; };
  return { revenue: build('REVENUE_CATEGORIES', 'REVENUE_CATEGORY_LABELS'), expense: build('EXPENSE_CATEGORIES', 'EXPENSE_CATEGORY_LABELS') };
}
const CATS = loadCategories();
const sideOfCat = (c) => (c in CATS.revenue ? 'revenue' : c in CATS.expense ? 'expense' : null);
let jevKey = null;
const readJevKey = () => (jevKey ??= readFileSync(resolve(root, 'Admin', 'jev', '.env'), 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')).slice(12).trim());
const words = (t) => new Set(norm(t).split(/[^a-z0-9]+/).filter((w) => w.length > 2));

// Caché de respuestas de Jev (--cache-jev): la clave es club|año|lado|etiqueta; los ejemplos dependen solo de eso (el banco excluye el
// ejercicio reconstruido, que queda fijo por club-año), así que la misma clave produce el mismo pedido.
let jevCache = null;
function cacheLoad() {
  if (jevCache) return jevCache; jevCache = new Map();
  if (CACHE_JEV && existsSync(CACHE_JEV)) for (const l of readFileSync(CACHE_JEV, 'utf8').split('\n')) { if (!l) continue; try { const o = JSON.parse(l); jevCache.set(o.k, o.r); } catch {} }
  return jevCache;
}
let jevCalls = 0; let jevHits = 0;
async function askJevCached(key, req) {
  if (!CACHE_JEV) { jevCalls++; return askJev(req); }
  const c = cacheLoad();
  if (c.has(key)) { jevHits++; return c.get(key); }
  jevCalls++; const r = await askJev(req);
  if (!r.error) { c.set(key, r); appendFileSync(CACHE_JEV, JSON.stringify({ k: key, r }) + '\n'); }
  return r;
}

async function askJev({ label, club, side, examples }) {
  const criteria = side ? Object.fromEntries(Object.entries(side === 'revenue' ? CATS.revenue : CATS.expense).map(([k, v]) => [k, `${side === 'revenue' ? 'INGRESO' : 'GASTO'}: ${v}`])) : { ...Object.fromEntries(Object.entries(CATS.revenue).map(([k, v]) => [k, `INGRESO: ${v}`])), ...Object.fromEntries(Object.entries(CATS.expense).map(([k, v]) => [k, `GASTO: ${v}`])) };
  if (ESCAPE) criteria.no_es_rubro = 'NO ES UN RUBRO: subtotal, total, resultado o margen calculado, partida de balance (activo, pasivo, deuda, patrimonio, cuentas por cobrar/pagar), nombre de una persona, nota al pie o texto que no es un ingreso ni un gasto del ejercicio.';
  const ex = examples?.length ? `Ejemplos de rubros parecidos que ya están categorizados en el sitio (los clubes tienen convenciones propias; guiate por ellos):\n${examples.map((x) => `- "${x.label}" (${x.club}) -> ${x.cat}`).join('\n')}\n` : '';
  const state = [`Rubro de un estado financiero de un club de fútbol (${club}).`, ex, `Texto del rubro, tal cual figura en el documento: "${label}"`].filter(Boolean).join('\n');
  const body = { state, model: 'jev-latest', questions: { categoria: { type: 'choice', instructions: 'Elegí la categoría de la lista a la que corresponde este rubro. Si no encaja en ninguna, elegí la más genérica (other_income / other_expenses).', criteria } } };
  for (let a = 0; a < 4; a++) {
    try {
      const r = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${readJevKey()}` }, body: JSON.stringify(body) });
      if (r.ok) { const j = (await r.json()).answers?.categoria; return j ? { choice: j.choice, confidence: j.confidence } : { error: 'sin respuesta' }; }
      if (r.status === 429 || r.status >= 500) { await new Promise((z) => setTimeout(z, 2500 * (a + 1))); continue; }
      return { error: `HTTP ${r.status}` };
    } catch { await new Promise((z) => setTimeout(z, 2000 * (a + 1))); }
  }
  return { error: 'reintentos agotados' };
}

// Banco de ejemplos: todos los rubros ya categorizados, SIN los del ejercicio que se está reconstruyendo (nada de filtrar la respuesta).
function buildBank(generic, excludeClub, excludeYear) {
  const bank = [];
  for (const [club, d] of Object.entries(generic)) for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const [yr, lines] of Object.entries(d[key] || {})) {
    if (club === excludeClub && Number(yr) === Number(excludeYear)) continue;
    for (const l of lines || []) if (l.rawLabel && l.normalizedCategory) bank.push({ label: l.rawLabel.trim(), club, side, cat: l.normalizedCategory, w: words(l.rawLabel) });
  }
  return bank;
}
function retrieve(bank, label, side, k = 8) {
  const qw = words(label); const sc = [];
  for (const b of bank) { if (side && b.side !== side) continue; let i = 0; for (const w of qw) if (b.w.has(w)) i++; if (i) sc.push([i / (qw.size + b.w.size - i), b]); }
  sc.sort((a, b) => b[0] - a[0]); const seen = new Set(); const out = [];
  for (const [, b] of sc) { const key = `${norm(b.label)}|${b.cat}`; if (seen.has(key)) continue; seen.add(key); out.push(b); if (out.length >= k) break; }
  return out;
}

// Lado de una tabla por las palabras de su título y columnas (INGRESOS / GASTOS de tools/vocabulario.mjs, las mismas que tools/pipeline.mjs).
const SIDE_REV = INGRESOS_TABLA_RE; // sin las palabras que solo dicen el lado de una FILA (subvenciones, "sales"): ver INGRESOS_FILA
const SIDE_EXP = GASTOS_RE;
function sideOfTable(t) { const h = norm(`${t.section || ''} ${(t.columns || []).join(' ')}`); const r = SIDE_REV.test(h); const x = SIDE_EXP.test(h); return r && !x ? 'revenue' : x && !r ? 'expense' : null; }

// Escala por PLAUSIBILIDAD: la que deja el mayor importe del estado cerca de los ingresos que el club ya tiene cargados en otros años.
function pickScale(maxAbs, refM, textScale) {
  if (!refM) return textScale;
  const cands = [{ unit: 'unidades', mult: 1e-6 }, { unit: 'miles', mult: 1e-3 }, { unit: 'millones', mult: 1 }];
  const best = cands.map((c) => ({ c, d: Math.abs(Math.log10(Math.max(maxAbs * c.mult, 1e-9) / refM)) })).sort((a, b) => a.d - b.d)[0];
  return best.d <= 0.8 ? best.c : textScale; // dentro de un factor ~6; si nada se acerca, se cae al texto
}

// Filas que son la SUMA de las filas contiguas de arriba (subtotales y totales impresos), sin mirar la etiqueta: es el chequeo de sumas de
// cada tabla usado para ENCONTRAR el total, no para verificarlo. `nums` = [{label, v (crudo, sin escala), i}] en orden de la tabla.
function sumRows(nums) {
  const out = [];
  for (let i = 2; i < nums.length; i++) {
    const v = nums[i].v; if (!v || v <= 0) continue;
    const tol = Math.max(2, Math.abs(v) * 0.0005); let acc = 0;
    for (let k = i - 1; k >= Math.max(0, i - 60); k--) {
      acc += nums[k].v;
      if (i - k >= 2 && Math.abs(acc - v) <= tol) { out.push({ ...nums[i], desde: k, n: i - k }); break; }
    }
  }
  return out;
}

// Filas que NUNCA son un rubro de ingresos/gastos y que antes se le mandaban a Jev igual (medido 2026-09-30 sobre los .jev.json de la corrida
// de 50: 27% de lo que Jev recibía eran etiquetas sin letras — cifras mal partidas como "8.206.844" — a las que asignaba categoría con
// confianza ≥ 0,90; y otro grupo eran subtotales/resultados/partidas de balance/nombres de persona, que no tienen categoría correcta).
const SUBTOTAL_RE = /^\**\s*(\(?[=+\-]\)?\s*)?(ebit|ebitda|gross (profit|margin)|operating (profit|result|income)|resultado (bruto|operacional|antes|financiero|liquido|del ejercicio)|ganancia bruta|lucro (bruto|operacional|antes)|utile|risultato|margen|netto finans|driftsresultat|resultat (for|før|foer)|betriebsergebnis|rohergebnis|ergebnis (vor|nach|der)|bruto resultaat|bedrijfswinst|σύνολο|συνολο|σύνολα|καθαρ[όο]|κέρδη|κερδη|ζημι)/;
function noEsRubro(label, esSuma) {
  if (esSuma) return true;
  const l = norm(label);
  if ((l.match(/[a-z\u0370-\u03ff\u0400-\u04ff\u3040-\u30ff\u4e00-\u9fff\uac00-\ud7af]/g) || []).length < 3) return true; // números, códigos, símbolos
  return SUBTOTAL_RE.test(l);
}

// ---------------------------------------------------------------- estrategias de elección de tabla (--tabla, test del 2026-09-30)
// Todo lo de esta sección es GRATIS (sin API): solo decide QUÉ filas del documento se le mandan a Jev. El detalle de cada estrategia y los
// números medidos están en Admin/tests/test-eleccion-tabla.md; acá, lo necesario para entender el código.

// Secciones que nunca abren un ingreso o un gasto del ejercicio: balance, flujo de fondos, evolución del patrimonio, anexo de bienes de uso,
// deudas por vencimiento. Sin excluirlas, una ventana de filas del flujo de fondos puede sumar por casualidad lo mismo que una línea del
// estado de resultados (sobre todo con importes chicos) y la estrategia "ancla" la tomaba como su detalle.
const NO_PL_RE = /balance sheet|bilanz|balanco patrimonial|balance general|estado de situacion|situacion financiera|financial position|stato patrimoniale|balansregnskap|balanse|aktiva|passiva|cash ?flow|kapitalfluss|flujo de efectivo|flujos de efectivo|fluxo de caixa|flussi di cassa|kontantstrom|changes in equity|eigenkapitalspiegel|patrimonio neto|mutacoes do patrimonio|anlagevermoegen|anlagespiegel|bienes de uso|verbindlichkeitenspiegel|restlaufzeit|fixed assets|intangible assets|creditors|debtors|financial instruments|share capital|leasing commitment|tax on (loss|profit)|deferred tax|taxation|impuesto diferido|imposto diferido|latente steuern|employees|directors.? remuneration/;
// NO_PL_RE solo tenía estas palabras (sobre todo en,de,es,pt,it,no). Encontrado probando tools/cargar.mjs (2026-09-30): el ancla recorría
// el BALANCE de Vejle ("Aktiver" / "Passiver", danés), el flujo de fondos de PSV ("Kasstroomoverzicht", neerlandés: "Uitgaven inzake
// vergoedingssommen" terminaba como un gasto) y el de Dinamo Zagreb ("Izvještaj o novčanim tokovima"). Se suman los títulos de flujo de
// efectivo y de cambios en el patrimonio de tools/vocabulario.mjs (29 idiomas) y, por las FILAS, un balance: una fila "total del activo /
// del pasivo" (TOTAL_ACTIVO / TOTAL_PASIVO del vocabulario) o una fila que es solo "Aktiver", "Passiver", "Activo", "Assets"...
const BALANCE_FILA_RE = /^\**\s*(total\s+)?(aktiver|passiver|aktiva|passiva|activo|pasivo|ativo|passivo|assets|liabilities|activa|passiva|eiendeler|tillgangar)\s*(i alt|ialt|total)?\**\s*$/;
function esNoPL(t, cols, rows) {
  const sec = norm(`${String(t.section || '').split('/').pop()} ${cols.join(' ')}`);
  if (NO_PL_RE.test(sec) || FLUJO_O_PATRIMONIO_RE.test(sec)) return true;
  return (rows || []).some((r) => { const l = norm(String(r.rawLabel || '')); return BALANCE_FILA_RE.test(l) || TOTAL_ACTIVO_RE.test(l) || TOTAL_PASIVO_RE.test(l); });
}
// "davon" / "of which": sub-partida de la fila anterior, ya incluida en ella. Si se cuenta como una fila más, la ventana suma de más.
const DAVON_RE = /^\**\s*[-–]?\s*(davon|hiervon|darunter|of which|thereof|dos quais|das quais|de los cuales|de las cuales|di cui|hvorav|heraf|dont)\b/;
const LETRAS_RE = /[a-zͰ-ϿЀ-ӿ぀-ヿ一-鿿가-힯]/g;
const nLetras = (l) => (norm(l).match(LETRAS_RE) || []).length;

// Columna(s) del ejercicio. BUG que encontró el test (Werder Bremen, HGB): la GuV alemana tiene DOS columnas por año, una para las
// sub-partidas "a) Löhne und Gehälter" y otra para el total de la partida "4. Personalaufwand". yearColumn() tomaba solo la primera, así que
// "1. Umsatzerlöse 115.285.511,47" (que está en la segunda) no existía para el script. Mismo caso en Arsenal: el año 2024 abarca tres
// columnas ("Operations excluding player trading" / "Player trading" / "Total") y la que vale es la última. Regla: el grupo del año va desde
// el encabezado que dice el año hasta el siguiente encabezado con texto; de cada fila se toma el ÚLTIMO valor numérico del grupo.
function yearGroup(table, year) {
  const cols = table.columns || [];
  const y = String(year); const y1 = String(year - 1); const yy = y.slice(2);
  const hit = (h) => new RegExp(`(^|\\D)(${y}|${y1}[-/ ]${yy}|${y1}[-/]${y})(\\D|$)`).test(String(h));
  // Encabezado de VARIOS renglones (Colo-Colo: "01.01.2024 / 31.12.2024 / Nota / M$" vienen como las primeras filas, sin etiqueta): el texto
  // de encabezado de cada columna junta el de `columns` y el de esas filas. Una columna cuyo encabezado dice "Nota" no es de importes.
  const rows = table.rows || [];
  const headRows = []; for (const r of rows.slice(0, 4)) { if (String(r.rawLabel || '').trim()) break; headRows.push(r); }
  const width = Math.max(0, ...rows.map((r) => (r.values || []).length));
  const headOf = (j) => [cols[j + 1] || '', ...headRows.map((r) => (r.values || [])[j] || '')].join(' ');
  const esNota = (j) => /(^|\s)(nota|notas|note|notes|anexo|nr\.?)(\s|$)/i.test(headOf(j));
  for (let j = 1; j < cols.length; j++) if (hit(cols[j]) && !esNota(j - 1)) {
    let end = j + 1; while (end < cols.length && !String(cols[end] || '').trim()) end++;
    return Array.from({ length: end - j }, (_, k) => j - 1 + k).filter((k) => !esNota(k));
  }
  // año en las filas de encabezado: la PRIMERA columna que lo dice. (Se probó la última, pensando en tablas por segmentos "Recaudaciones |
  // Publicidad | ... | Total Grupo": rompía los brasileños "Consolidado 2023 2022 | Controladora 2023 2022", donde producción usa el primero;
  // America Mineiro bajaba de 100% a 47%. Las tablas por segmentos ya se descartan como duplicadas en selectAncla.)
  if (headRows.length) for (let j = 0; j < width; j++) if (hit(headOf(j)) && !esNota(j)) return [j];
  const c = yearColumn(table, year);
  if (c !== null && !esNota(c)) return [c];
  for (let j = 0; j < width; j++) { if (esNota(j)) continue; if (rows.filter((r) => parseNumber((r.values || [])[j] ?? '') !== null).length >= Math.max(3, rows.length * 0.4)) return [j]; }
  return null;
}
function valueIn(row, group) {
  let out = null; for (const j of group) { const v = parseNumber((row.values || [])[j] ?? ''); if (v !== null) out = { v, raw: row.values[j] }; }
  return out;
}
// Resolución de un importe impreso, en millones: "616,580" en miles -> 0,001; "260,7" en millones -> 0,1; "115.285.511,47" -> 0,00000001.
// Sirve para la tolerancia de una suma: n importes redondeados pueden diferir del total impreso hasta n/2 unidades de la última cifra.
function unitOf(v, mult) {
  const dec = Math.abs(v) % 1 === 0 ? 0 : Math.min(2, (String(Math.abs(v)).split('.')[1] || '').length);
  return mult * Math.pow(10, -dec);
}

// Prepara UNA tabla del briefing para las estrategias nuevas: grupo de columnas del año, escala, encabezado-como-fila ("Umsatz | 926,6 |
// Mio. Euro"), etiquetas partidas en dos filas ("Spielerträge, mediale Verwertung und Werbung" + "sowie Transfererträge 102.276": la
// primera no tiene importe y la segunda arranca en minúscula -> es una sola), filas que son suma de las de arriba (filasSuma) y hojas.
function prepTable(t, idx, year, mdText, refM) {
  const group = yearGroup(t, year); if (!group) return null;
  const cols = t.columns || [];
  const rowsIn = [];
  // encabezado-como-fila solo si la segunda celda es un importe ("926,6"), no un año ni un encabezado de moneda ("2024 £'000" se leía 2024)
  const c1 = String(cols[1] ?? '').trim();
  const hv = /^[\s(\-−]*[\d.,' ]+\)?$/.test(c1) && !/^(19|20)\d\d$/.test(c1) ? parseNumber(c1) : null;
  if (hv !== null && nLetras(cols[0] || '') >= 3) rowsIn.push({ rawLabel: cols[0], headerRow: true, headerMio: /mio|mill|\bmn\b/.test(norm(cols.slice(2).join(' '))) });
  for (const r of t.rows || []) rowsIn.push(r);
  const textScale = detectScale(`${t.section || ''} ${cols.join(' ')} ${pageText(mdText, t.page).slice(0, 2500)}`);
  const vals = []; const rows = []; let pend = '';
  for (const r of rowsIn) {
    const got = r.headerRow ? { v: hv } : valueIn(r, group);
    let label = String(r.rawLabel || '').trim();
    if (pend && /^[a-zà-ÿ]/.test(label) && !/^[a-z][.)]\s/.test(label)) label = `${pend} ${label}`; // "a) Löhne" es sub-partida, no continuación // solo minúscula: "(Loss) for the year" NO continúa "Tax on loss"
    pend = !got && nLetras(label) >= 3 ? label : '';
    rows.push({ label, v: got ? got.v : null, headerRow: !!r.headerRow, headerMio: !!r.headerMio });
    if (got && !r.headerMio) vals.push(Math.abs(got.v));
  }
  const sc = pickScale(Math.max(0, ...vals), refM, textScale);
  for (const r of rows) if (r.v !== null) { const mult = r.headerMio ? 1 : sc.mult; r.M = r.v * mult; r.unit = unitOf(r.v, mult); r.unitRaw = unitOf(r.v, 1); r.fixedMult = r.headerMio ? 1 : null; }
  const nums = rows.map((r, i) => ({ ...r, i })).filter((r) => r.v !== null);
  const sums = new Map(filasSuma(nums.filter((r) => !r.headerRow)).map((s) => [s.i, s]));
  const leaves = nums.filter((r) => !sums.has(r.i) && nLetras(r.label) >= 3 && !TOTAL_RE.test(norm(r.label)) && !DAVON_RE.test(norm(r.label)) && !r.headerRow);
  const secText = norm(`${t.section || ''} ${cols.join(' ')}`);
  // noPL mira solo el ÚLTIMO título de la sección: el camino entero ("6. Latente Steuern / II. GuV / 1. Umsatzerlöse", Stuttgart) arrastra
  // títulos de secciones anteriores y descartaba la nota de ingresos.
  return { idx: String(idx), cols, page: t.page, section: t.section || '', mult: sc.mult, textMult: textScale.mult, primary: !!t.likelyRelevant && STATEMENT_RE.test(secText), isStatement: !!t.likelyRelevant && (STATEMENT_RE.test(secText) || !!sideOfTable(t)), noPL: esNoPL(t, cols, t.rows), tside: sideOfTable(t), rows, nums, sums, leaves, unit: Math.max(0, ...nums.map((r) => r.unit || 0)) };
}

// Listas con viñetas como pseudo-tablas (Bayern publica la GuV del Einzelabschluss así: "- Einnahmen aus dem Spielbetrieb 260,7 Mio. Euro",
// con renglones de aclaración entre paréntesis en el medio). Una lista = renglones seguidos (se permiten aclaraciones y renglones en blanco
// en el medio) de la forma "viñeta + texto + número [+ unidad]". La escala sale de la unidad del renglón (Mio./Tsd./TEUR) o, si no dice, del
// texto de la página.
const LIST_RE = /^\s*(?:[-•*·–]|\d{1,2}[.)])\s+(.*?[A-Za-zÀ-ÿͰ-ϿЀ-ӿ].*?)[\s:]+(-?\(?\d[\d.,' ]*\)?)\s*(mio\.?|millionen|mill\.?|millones|million|millions|mn|m|tsd\.?|teur|t€|tusd|mil|miles)?\.?\s*(euro|eur|€|usd|\$|£|gbp|r\$|reais|pesos)?\.?\s*$/i;
function listTables(mdText) {
  const out = []; const pages = mdText.split(/^(?=--- pág\. \d+ ---)/m);
  for (const pg of pages) {
    const page = Number((pg.match(/^--- pág\. (\d+) ---/) || [])[1] || 0);
    const pageScale = detectScale(pg.slice(0, 2500));
    let cur = null; let lastHead = ''; let paren = 0; // aclaraciones de varios renglones: "(Einnahmen aus ... ,\n Freundschaftsspielen, ...)"
    const flush = () => { if (cur && cur.rows.length >= 2) out.push(cur); cur = null; };
    for (const line of pg.split('\n')) {
      const m = line.match(LIST_RE);
      const v = m ? parseNumber(m[2]) : null;
      const abiertos = (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
      if (paren > 0) { paren = Math.max(0, paren + abiertos); continue; } // renglón adentro de una aclaración entre paréntesis
      if (m && v !== null) {
        const u = norm(m[3] || '');
        const mult = /mio|mill|mn|^m$/.test(u) ? 1 : /tsd|teur|t€|tusd|mil|miles/.test(u) ? 1e-3 : pageScale.mult;
        if (!cur) cur = { idx: `lista-p${page}-${out.length}`, page, section: lastHead, isStatement: false, noPL: false, tside: null, rows: [], isList: true };
        cur.rows.push({ label: m[1].replace(/\s*[:–-]\s*$/, '').trim(), v, M: v * mult, unit: unitOf(v, mult), unitRaw: unitOf(v, 1), fixedMult: mult });
      } else if (/^\s*$/.test(line) || /^\s*\(/.test(line) || (cur && /^\s*[a-zà-ÿ]/.test(line)) || (cur && DAVON_RE.test(norm(line.replace(/^\s*[-•*·–]\s*/, ''))))) {
        // (un "- davon von der DFL ...: 102,9 Mio." partido en dos renglones cortaba la lista de Bayern en dos mitades)
        paren = Math.max(0, abiertos);
        continue; // renglón en blanco o aclaración: la lista sigue
      } else { flush(); if (line.trim()) lastHead = line.trim().slice(0, 120); }
    }
    flush();
  }
  for (const t of out) {
    t.nums = t.rows.map((r, i) => ({ ...r, i })); t.sums = new Map(filasSuma(t.nums).map((s) => [s.i, s]));
    t.leaves = t.nums.filter((r) => !t.sums.has(r.i) && nLetras(r.label) >= 3 && !TOTAL_RE.test(norm(r.label)) && !DAVON_RE.test(norm(r.label)));
    t.unit = Math.max(0, ...t.nums.map((r) => r.unit || 0));
  }
  return out;
}

// Lado de una fila suelta del estado de resultados. Orden elegido por el test de lado (455 filas contra producción, ver tools/filas-rubro.mjs
// y Admin/tests/test-eleccion-tabla.md): estructura/posición/palabras (ladosPorEstructura, que ya las combina) > palabras de la etiqueta > lado de
// la tabla. El SIGNO del importe se midió y se descartó (78% de acierto: la peor regla).
function ladoFila(label, M, estructural, tside) {
  return estructural || ladoPorPalabras(label) || tside || null;
}

// Busca, en `pool`, una ventana de filas HOJA contiguas que sume |V| (con la tolerancia de redondeo de n importes impresos).
// ESCALA: la de la nota se DEDUCE del cierre, no se adivina: se prueba la ventana en unidades, miles y millones y vale la que cierra contra el
// ancla. (La escala por plausibilidad de pickScale() sirve para el estado principal, pero en una nota chica elegía mal: los honorarios de
// auditoría de Arsenal, "40 / 157" en £'000, salían en millones porque 197 se parece más a los ingresos del club que 0,197.)
// Solo ventanas "naturales": la tabla entera, o cerrada por una fila de total que vale V. La primera versión aceptaba también ventanas
// sueltas de 3+ filas y en Arsenal "abría" un subtotal en filas del informe de gestión, de impuestos diferidos y de bienes de uso que sumaban
// lo mismo por casualidad (con signos mezclados casi cualquier número se alcanza). Con --ventanas-libres se vuelve a ese comportamiento (medido
// en el informe).
function findExpansion(V, anchorUnit, pool, excluded, depth) {
  let best = null;
  for (const u of pool) {
    if (excluded.has(u.idx) || u.noPL) continue;
    const L = u.leaves; if (L.length < 2) continue;
    const mults = u.isList ? [null] : [...new Set([u.textMult, u.mult])]; // la escala del texto de la página y la plausible; no las tres (más casualidades)
    for (const mm of mults) {
      const Mof = (r) => r.fixedMult !== null && r.fixedMult !== undefined ? r.v * r.fixedMult : r.v * mm;
      const unitOfRow = (r) => r.unitRaw * (r.fixedMult ?? mm);
      for (let s = 0; s < L.length; s++) {
        let acc = 0; let uacc = 0;
        for (let e = s; e < L.length; e++) {
          acc += Mof(L[e]); uacc += unitOfRow(L[e]); const n = e - s + 1; if (n < 2) continue;
          const tol = Math.max(Math.abs(V) * 0.0006, 0.5 * (uacc + (anchorUnit || 0)));
          if (Math.abs(Math.abs(acc) - V) > tol) continue;
          const after = u.nums.find((r) => r.i > L[e].i);
          const conTotal = after && Math.abs(Math.abs(Mof(after)) - V) <= tol;
          const natural = (s === 0 && e === L.length - 1) || conTotal;
          // Signos mezclados (+ y -) solo si hay una fila de total impresa que vale V: una tabla entera con signos mezclados (cifras clave,
          // conciliaciones) llega a casi cualquier número chico.
          const mixto = L.slice(s, e + 1).some((r) => r.v > 0) && L.slice(s, e + 1).some((r) => r.v < 0);
          if (mixto && !conTotal) continue;
          if (!natural && !(VENTANAS_LIBRES && depth === 1 && n >= 3)) continue;
          const score = (natural ? 1000 : 0) + n;
          if (!best || score > best.score) best = { u, rows: L.slice(s, e + 1).map((r) => ({ ...r, M: Mof(r), unit: unitOfRow(r) })), score, natural };
        }
      }
    }
  }
  return best;
}
const VENTA_RE = /disposal|sale\b|sales|venta|venda|transfer|cessao|verkauf|abgang|traspaso/;
let minV = 0; // lo fija selectAncla() para cada documento (materialidad)
function expandRow(row, lado, pool, excluded, used, depth, trail) {
  const V = Math.abs(row.M || 0);
  if (depth > 3 || !V || V < minV) return null;
  const hit = findExpansion(V, row.unit, pool, new Set([...excluded, ...used]), depth);
  if (!hit) return null;
  used.add(hit.u.idx);
  const out = [];
  for (const c of hit.rows) {
    const cl = lado || ladoPorPalabras(c.label); // la hija hereda el lado del ancla (la estructura le gana a las palabras en el test de lado)
    const sub = esResultado(c.label) ? null : expandRow(c, cl, pool, excluded, used, depth + 1, [...trail, hit.u.idx]);
    if (sub) out.push(...sub);
    else out.push({ label: c.label, page: hit.u.page, native: c.M, tside: cl, origen: `nota ${hit.u.idx} (ancla ${trail.join('>')})` });
  }
  return out;
}

// ANCLA: recorre las tablas de estado de resultados. Primero los subtotales (de mayor a menor alcance): si "Group turnover" se abre en una
// nota, sus sumandos del estado ("Turnover including JV", "Share of JV") quedan cubiertos. Después cada fila hoja no cubierta: si se abre, van
// sus hijas; si no, va la fila tal cual (con los mismos filtros de la versión 1). Los subtotales que no se abren se descartan como siempre.
function selectAncla(pts, pool) {
  const raw = []; const used = new Set(); const seen = new Set(); let nExpandidas = 0;
  const push = (r) => { const k = `${norm(r.label)}|${Math.round(r.native * 1e6)}`; if (seen.has(k)) return; seen.add(k); raw.push(r); };
  // QUÉ TABLAS SE RECORREN. Primera versión: solo los estados PRINCIPALES (título de estado de resultados). Medido sobre 92 ejercicios: arreglaba
  // Arsenal/Fulham/Bayern/Sunderland pero rompía Los Andes, Bahia, Colo-Colo 2024, Fluminense, Stuttgart (100% -> 0-20%): en esos documentos
  // el detalle vive en tablas que extract-table-rows.mjs marca relevantes por sus palabras ("Recursos", "Receitas", "Ingresos por...") y el
  // "principal" detectado por título era otra cosa (una tabla de patrimonio, el resultado financiero). Ahora se recorren TODAS las tablas de
  // estado (como la versión 1), las de título de estado primero y después por cantidad de filas; una tabla que ya se usó como detalle de un
  // ancla no se vuelve a cargar. --ancla-solo-principales vuelve a la primera versión (medida en el informe).
  // Continuación de un estado en la página siguiente (Werder: la GuV sigue en la pág. 12 con el título "UNTERNEHMENSREGISTER" y las
  // mismas columnas): cuenta como estado principal.
  for (let k = 1; k < pts.length; k++) if (!pts[k].primary && pts[k - 1].primary && JSON.stringify(pts[k].cols) === JSON.stringify(pts[k - 1].cols) && pts[k].page - pts[k - 1].page <= 1) pts[k].primary = true;
  const primarias = pts.filter((x) => x.primary);
  const base = SOLO_PRINCIPALES && primarias.length ? primarias : pts.filter((x) => x.isStatement || x.primary);
  const estados = base.filter((x) => !x.noPL).sort((a, b) => (b.primary - a.primary) || (b.nums.length - a.nums.length));
  // Materialidad: una línea de menos del 0,5% del importe más grande del estado principal no se abre (con importes chicos, alguna tabla del
  // documento siempre suma lo mismo por casualidad: "Player trading 1.374" de Arsenal se abría en la conciliación de impuestos diferidos).
  minV = estados.length ? 0.005 * Math.max(0, ...estados[0].nums.map((r) => Math.abs(r.M || 0))) : 0;
  if (process.env.PROPONER_DEBUG) console.error('estados:', estados.map((t) => `${t.idx}${t.primary ? '*' : ''}(${t.nums.length})`).join(' '), '| noPL:', pts.filter((t) => t.noPL).map((t) => t.idx).join(','));
  // Importes ya vistos en los estados recorridos (filas, subtotales y detalle abierto). Una tabla de estado SECUNDARIA (sin título de estado
  // de resultados) cuyas filas repiten en su mayoría importes ya vistos es otra vista de lo mismo (Colo-Colo: la nota de segmentos repite
  // ingresos 47.333 y costo de ventas 35.307 del estado principal) y cargarla duplicaba el dinero.
  const vistos = new Set(); const kM = (M) => Math.round(Math.abs(M || 0) * 1000);
  let nDuplicadas = 0;
  for (const t of estados) {
    if (used.has(t.idx)) continue; // ya se usó como detalle de otro estado
    if (!t.primary && t.leaves.length >= 2 && t.leaves.filter((r) => r.M && vistos.has(kM(r.M))).length >= t.leaves.length / 2) { nDuplicadas++; continue; }
    for (const r of t.nums) if (r.M) vistos.add(kM(r.M));
    const lados = ladosPorEstructura(t.rows.map((r) => ({ label: r.label, v: r.v })));
    const covered = new Set();
    const pos = (i) => t.nums.findIndex((r) => r.i === i);
    for (const s of [...t.sums.values()].sort((a, b) => b.n - a.n)) {
      if (covered.has(s.i)) continue;
      const usedAntes = new Set(used);
      const nl = norm(s.label);
      if (RESULT_RE.test(nl) || SUBTOTAL_RE.test(nl) || esResultado(s.label)) continue;
      const lado = ladoFila(s.label, s.M, lados[s.i], t.primary ? null : t.tside);
      const exp = expandRow(s, lado, pool, new Set([t.idx]), used, 1, [t.idx]);
      // Abrir un subtotal tiene que AGREGAR detalle: en Colo-Colo el total de la nota de ingresos (recaudación, publicidad, TV... 6 filas) se
      // "abría" en la tabla de NIIF 15 por momento de reconocimiento (2 filas), que suma lo mismo y no sirve para categorizar.
      if (!exp || exp.length <= s.n) { if (exp) for (const id of [...used]) if (!usedAntes.has(id)) used.delete(id); continue; }
      nExpandidas++;
      // `ancla`: el renglón del estado que se abrió (lo usa tools/cargar.mjs: si la etapa 3 del pipeline categorizó ese renglón y no las
      // filas de su nota, puede volver a cargarlo entero en vez de dejar el detalle sin categoría).
      exp.forEach((x) => { x.ancla ??= { label: s.label, native: s.M, tside: lado, page: t.page }; });
      for (let k = pos(s.i) - s.n; k <= pos(s.i); k++) covered.add(t.nums[k].i);
      exp.forEach(push); exp.forEach((x) => vistos.add(kM(x.native)));
    }
    for (const r of t.nums) {
      if (covered.has(r.i) || t.sums.has(r.i)) continue;
      const label = r.label; const nl = norm(label);
      if (!label || TOTAL_RE.test(nl) || (RESULT_RE.test(nl) && !VENTA_RE.test(nl))) continue;
      if (!FILTRO_OFF && (noEsRubro(label, false) || noEsRubroFR(label, false))) continue;
      // resultado "puro" (Operatives Ergebnis, Gewinn vor Steuern, Operating loss before depreciation...): no es un rubro. Se salvan los que
      // son una venta ("Profit on disposal of players' registrations" es un ingreso en producción).
      if (esResultado(label) && !VENTA_RE.test(nl)) continue;
      // En un estado principal el título ("Profit and Loss Account and Other Comprehensive INCOME") no dice el lado de cada fila: mezcla los dos.
      const lado = ladoFila(label, r.M, lados[r.i], t.primary ? null : t.tside);
      const exp = esResultado(label) ? null : expandRow(r, lado, pool, new Set([t.idx]), used, 1, [t.idx]);
      if (exp) { nExpandidas++; exp.forEach((x) => { x.ancla ??= { label, native: r.M, tside: lado, page: t.page }; }); exp.forEach(push); exp.forEach((x) => vistos.add(kM(x.native))); continue; }
      push({ label, page: t.page, native: r.M, tside: lado, origen: `estado ${t.idx}` });
    }
  }
  return { raw, nExpandidas, nDuplicadas, notasUsadas: [...used] };
}

// CIERRE: por lado, la tabla (fuera de los estados) con más filas hoja cuya suma coincide con un importe impreso del documento (en otra tabla
// o en su propia fila de total). Lo que no cubre esa tabla sale del estado de resultados como en la versión 1.
function selectCierre(pool, statementRaw) {
  const printed = []; for (const u of pool) for (const r of u.nums || []) if (r.M) printed.push({ M: Math.abs(r.M), label: r.label, idx: u.idx, i: r.i });
  const best = { revenue: null, expense: null };
  for (const u of pool) {
    if (u.isStatement || u.noPL || u.leaves.length < 2) continue;
    const S = Math.abs(u.leaves.reduce((a, r) => a + r.M, 0)); if (!S) continue;
    const tol = Math.max(S * 0.0006, 0.5 * (u.leaves.length + 1) * (u.unit || 0));
    const m = printed.find((p) => Math.abs(p.M - S) <= tol && !(p.idx === u.idx && u.leaves.some((l) => l.i === p.i)));
    if (!m) continue;
    const side = ladoFila(m.label, 1, null, null) || u.tside || ladoFila(u.section, 1, null, null);
    if (!side) continue;
    if (!best[side] || u.leaves.length > best[side].leaves.length) best[side] = u;
  }
  const raw = [];
  for (const side of ['revenue', 'expense']) {
    if (best[side]) for (const r of best[side].leaves) raw.push({ label: r.label, page: best[side].page, native: r.M, tside: side, origen: `cierre ${best[side].idx}` });
    else raw.push(...statementRaw.filter((r) => r.tside === side));
  }
  raw.push(...statementRaw.filter((r) => !r.tside));
  return { raw, notasUsadas: [best.revenue?.idx, best.expense?.idx].filter(Boolean) };
}

// PRECEDENTE: por lado, la tabla cuyas etiquetas más se parecen (palabras en común) a los rubros de ese lado que el club tiene cargados en
// OTROS años (nunca el reconstruido). Necesita al menos 2 etiquetas parecidas; si no, ese lado sale del estado de resultados.
function selectPrecedente(pool, statementRaw, clubData, year) {
  const prevLabels = { revenue: new Set(), expense: new Set() };
  for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const [yr, ls] of Object.entries(clubData[key] || {})) if (Number(yr) !== Number(year)) for (const l of ls || []) if (l.rawLabel) prevLabels[side].add(l.rawLabel);
  const jac = (a, b) => { let i = 0; for (const w of a) if (b.has(w)) i++; return i ? i / (a.size + b.size - i) : 0; };
  const best = { revenue: null, expense: null };
  for (const side of ['revenue', 'expense']) {
    const P = [...prevLabels[side]].map(words).filter((w) => w.size);
    for (const u of pool) {
      if (u.noPL || u.leaves.length < 2) continue;
      const lw = u.leaves.map((r) => words(r.label));
      const score = P.filter((p) => lw.some((w) => jac(p, w) >= 0.5)).length;
      if (score >= 2 && (!best[side] || score > best[side].score || (score === best[side].score && u.leaves.length > best[side].u.leaves.length))) best[side] = { u, score };
    }
  }
  const raw = [];
  for (const side of ['revenue', 'expense']) {
    const b = best[side];
    if (b) for (const r of b.u.leaves) { const l = ladoFila(r.label, r.M, null, b.u.tside); if (l && l !== side) continue; raw.push({ label: r.label, page: b.u.page, native: r.M, tside: side, origen: `precedente ${b.u.idx}` }); }
    else raw.push(...statementRaw.filter((r) => r.tside === side));
  }
  raw.push(...statementRaw.filter((r) => !r.tside));
  return { raw, notasUsadas: [best.revenue?.u.idx, best.expense?.u.idx].filter(Boolean) };
}

// ---------------------------------------------------------------- la propuesta
// QUÉ FILAS Y MONTOS (sin Jev ni ninguna API): la parte de propose() que decide qué filas del documento serían los rubros del ejercicio,
// con su importe en MILLONES de moneda nativa y su lado. La usa también tools/cargar.mjs (etapa 6), que pone la categoría desde el
// `.categorias.json` del pipeline en vez de preguntarle a Jev. Devuelve además los candidatos a total impreso (`totalCands`), el total de
// ingresos y el resultado del ejercicio detectados por etiqueta, y las tablas preparadas (`pts`, para buscar subtotales impresos).
export function seleccionarFilas({ briefing, mdText, clubData, year }) {
  const tables = (briefing.tables || []).filter((t) => t.likelyRelevant && (STATEMENT_RE.test(norm(`${t.section || ''} ${(t.columns || []).join(' ')}`)) || sideOfTable(t)));
  if (!tables.length) return { ok: false, motivo: 'sin estado de resultados' };
  const others = Object.entries(clubData.fiscalYearMeta || {}).filter(([y]) => Number(y) !== Number(year)).map(([, m]) => Math.abs(m.officialTotalRevenue || 0)).filter(Boolean).sort((a, b) => a - b);
  const refM = others.length ? others[Math.floor(others.length / 2)] : null;
  let raw = []; let docRevenueTotal = null; let docResult = null;
  const seenLabels = new Set(); const cands = []; const descartadas = [];
  // Versión 1 ("actual"): se corre SIEMPRE, porque de acá salen la detección del total de ingresos y del resultado (iguales para todas las
  // estrategias, así la comparación mide solo la elección de filas).
  for (const t of tables) {
    const j = yearColumn(t, year); if (j === null) continue;
    const textScale = detectScale(`${t.section} ${(t.columns || []).join(' ')} ${pageText(mdText, t.page).slice(0, 2500)}`);
    const vals = t.rows.map((r) => parseNumber(r.values[j] ?? '')).filter((v) => v !== null);
    const sc = pickScale(Math.max(0, ...vals.map(Math.abs)), refM, textScale);
    const tside = sideOfTable(t);
    // tablas "clave | valor | unidad" (portada de cifras clave): el rubro está en el encabezado y no en una fila
    const h0 = norm((t.columns || [])[0] || ''); const hv = parseNumber((t.columns || [])[1] ?? '');
    if (REV_TOTAL_RE.test(h0) && hv !== null) cands.push({ M: hv * (/mio|mill/.test(norm((t.columns || []).join(' '))) ? 1 : sc.mult), label: (t.columns || [])[0], page: t.page, how: 'encabezado', tside });
    const nums = t.rows.map((r, i) => ({ label: String(r.rawLabel || ''), v: parseNumber(r.values[j] ?? ''), i })).filter((x) => x.v !== null);
    const subs = sumRows(nums);
    for (const x of subs) cands.push({ M: x.v * sc.mult, label: x.label, page: t.page, how: 'suma', n: x.n, tside });
    const subIdx = new Set(subs.map((x) => x.i)); // filas que son la suma de las de arriba: subtotales, no rubros
    for (const [ri, r] of t.rows.entries()) {
      const label = String(r.rawLabel || '').trim(); const v = parseNumber(r.values[j] ?? '');
      if (!label || v === null) continue;
      const nl = norm(label); const M = v * sc.mult;
      if (REV_TOTAL_RE.test(nl)) cands.push({ M, label, page: t.page, how: 'etiqueta', tside });
      if (REV_TOTAL_RE.test(nl) && docRevenueTotal === null) docRevenueTotal = M;
      if (TOTAL_RE.test(nl)) continue;
      if (RESULT_RE.test(nl)) { docResult = M; continue; }
      if (!FILTRO_OFF && noEsRubro(label, subIdx.has(ri))) { descartadas.push({ label, why: subIdx.has(ri) ? 'subtotal' : 'no-rubro' }); continue; }
      const key = `${nl}|${Math.round(M * 1e6)}`; if (seenLabels.has(key)) continue; seenLabels.add(key);
      raw.push({ label, page: t.page, native: M, tside, origen: 'actual' });
    }
  }
  let extra = {};
  if (TABLA !== 'actual') {
    const pts = (briefing.tables || []).map((t, i) => prepTable(t, i, year, mdText, refM)).filter(Boolean);
    const pool = TABLA === 'ancla-listas' ? [...pts, ...listTables(mdText)] : pts;
    // filas del estado con el lado por fila (para "cierre" y "precedente", que reemplazan un lado entero)
    const statementRaw = raw.map((r) => ({ ...r, tside: ladoFila(r.label, r.native, null, r.tside) }));
    const sel = TABLA === 'cierre' ? selectCierre(pool, statementRaw) : TABLA === 'precedente' ? selectPrecedente(pool, statementRaw, clubData, year) : selectAncla(pts, pool);
    if (sel.raw.length) raw = sel.raw;
    extra = { nExpandidas: sel.nExpandidas ?? null, nDuplicadas: sel.nDuplicadas ?? null, notasUsadas: sel.notasUsadas, pts };
  }
  if (!raw.length) return { ok: false, motivo: 'no se pudo ubicar la columna del ejercicio' };
  const totalCands = cands.map((c) => ({ ...c, M: Math.round(c.M * 1e4) / 1e4 }));
  return { ok: true, raw, totalCands, docRevenueTotal, docResult, descartadas, refM, extra, pts: extra.pts || null };
}

async function propose({ briefing, mdText, clubData, generic, club, year }) {
  const sf = seleccionarFilas({ briefing, mdText, clubData, year });
  if (!sf.ok) return sf;
  const { raw, totalCands, docRevenueTotal, docResult, descartadas, refM } = sf; const extra = { ...sf.extra }; delete extra.pts;
  // ¿Cierra? La suma de las filas propuestas del lado ingresos (el lado que se le pasa a Jev) coincide (±0,5%) con algún total de ingresos
  // impreso en el documento (fila de total, subtotal que suma las de arriba o encabezado de cifras clave). Mide coherencia interna, sin
  // mirar producción (ver "Trampas de medición" en Admin/HANDOFF-pipeline.md: el total de producción muchas veces no está impreso).
  const revSum = raw.filter((r) => r.tside === 'revenue').reduce((a, r) => a + Math.abs(r.native), 0);
  const cierraIngresos = revSum > 0 && totalCands.some((c) => c.M && Math.abs(Math.abs(c.M) - revSum) <= Math.abs(c.M) * 0.005);
  if (SOLO_TOTALES) return { ok: true, docRevenueTotal, totalCands, refM, nRows: raw.length, nDescartadas: descartadas.length, nSure: 0, cierraIngresos, ...extra, filas: raw.map((r) => [r.label.slice(0, 70), Math.round(r.native * 1e4) / 1e4, r.tside || '', r.origen || '']), byCat: { revenue: {}, expense: {} } };
  const bank = buildBank(generic, club, year);
  const lines = [];
  for (const r of raw) {
    const j = await askJevCached(`${club}|${year}|${r.tside || ''}|${r.label}`, { label: r.label, club, side: r.tside, examples: retrieve(bank, r.label, r.tside) });
    lines.push({ ...r, cat: j.choice || null, conf: j.confidence ?? 0, side: j.choice ? sideOfCat(j.choice) : null, error: j.error });
  }
  const sure = lines.filter((l) => l.cat && l.cat !== 'no_es_rubro' && l.conf >= 0.9);
  const nEscape = lines.filter((l) => l.cat === 'no_es_rubro').length;
  const byCat = { revenue: {}, expense: {} };
  for (const l of sure) byCat[l.side][l.cat] = (byCat[l.side][l.cat] || 0) + Math.abs(l.native);
  return { ok: true, lines, byCat, nDescartadas: descartadas.length, nEscape, docRevenueTotal, docResult, refM, nRows: lines.length, nSure: sure.length, needCriterion: lines.length - sure.length, cierraIngresos, ...extra };
}

// ---------------------------------------------------------------- ejecución de herramientas
function run(script, argv) {
  return new Promise((res) => {
    const c = spawn('node', [resolve(root, script), ...argv], { cwd: root }); let out = '';
    c.stdout.on('data', (d) => { out += d; }); c.stderr.on('data', () => {});
    c.on('close', () => res(out)); c.on('error', () => res(''));
  });
}
export async function briefingFor(club, year, md) {
  const out = resolve(root, derivado(md, '.briefing.json'));
  // El briefing en disco puede ser de antes de que se arreglaran las tools (palabras clave de idiomas, sumas): se rehace si es más viejo que ellas.
  const toolsMtime = Math.max(...['tools/prepare-onboarding.mjs', 'tools/extract-table-rows.mjs', 'tools/sum-check.mjs'].map((f) => statSync(resolve(root, f)).mtimeMs));
  if (!existsSync(out) || statSync(out).mtimeMs < toolsMtime || statSync(out).mtimeMs < statSync(resolve(root, md)).mtimeMs) await run('tools/prepare-onboarding.mjs', [club, String(year), resolve(root, md), '--out', out]);
  return JSON.parse(readFileSync(out, 'utf8'));
}

async function backtest() {
  const site = loadSite();
  const ledger = readFileSync(resolve(root, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  let cands = ledger.filter((e) => e.cargado && e.tieneMd && !e.pdf.includes('memoria') && !e.pdf.includes('presupuesto'));
  const jobs = [];
  await pool(cands, async (e) => {
    const q = JSON.parse((await run('tools/onboard.mjs', ['--quien', e.pdf])) || '{}');
    if (!q.clubId || !q.year || !site.generic[q.clubId]) return;
    const cd = site.generic[q.clubId];
    if (clubOnly && q.clubId !== clubOnly) return;
    if (!cd.revenueLinesByYear?.[q.year] || Object.keys(cd.revenueLinesByYear).length < 2) return; // hace falta el año en producción y al menos otro para el precedente
    jobs.push({ e, club: q.clubId, year: Number(q.year), cd });
  });
  // un mismo ejercicio puede tener varios .md (balance, memoria...): se evalúa cada uno y se queda el mejor
  // muestra al azar (semilla fija) y no los primeros de la lista, que son todos del mismo país
  let seed = 11; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  jobs.sort((a, b) => a.e.pdf.localeCompare(b.e.pdf)).sort(() => rnd() - 0.5);
  const jobsOk = FRESH && SIN_MISTRAL_NUEVO ? jobs.filter((j) => existsSync(resolve(root, derivado(j.e.pdf, '.mistral-redo.md', { crear: false })))) : jobs;
  const jobsSel = limit > 0 ? jobsOk.slice(0, limit) : jobsOk;
  console.log(`${jobsSel.length} documentos de ejercicios ya cargados para reconstruir.`);
  const rows = [];
  await pool(jobsSel, async (j) => {
    const prod = j.cd.fiscalYearMeta?.[j.year] || {};
    let row = { pdf: j.e.pdf, club: j.club, year: j.year };
    try {
      let mdUsed = j.e.md;
      if (FRESH) {
        mdUsed = derivado(j.e.pdf, '.mistral-redo.md');
        if (!existsSync(resolve(root, mdUsed))) await run('tools/mistral-ocr-transcribe.mjs', [resolve(root, j.e.pdf), '--out-suffix', '.mistral-redo']);
        if (!existsSync(resolve(root, mdUsed))) { rows.push({ ...row, motivo: 'Mistral no pudo transcribir' }); return; }
      }
      const b = await briefingFor(j.club, j.year, mdUsed);
      const p = await propose({ briefing: b, mdText: readFileSync(resolve(root, mdUsed), 'utf8'), clubData: j.cd, generic: site.generic, club: j.club, year: j.year });
      row = { ...row, ...p, lines: undefined, totalCands: SOLO_TOTALES ? p.totalCands : undefined };
      if (p.ok) {
        // producción por categoría (importes absolutos, en millones de moneda nativa)
        const prodCat = { revenue: {}, expense: {} };
        for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const l of j.cd[key][j.year] || []) prodCat[side][l.normalizedCategory] = (prodCat[side][l.normalizedCategory] || 0) + Math.abs(l.amountNative);
        const overlap = (side) => { const P = prodCat[side]; const Q = p.byCat[side]; const tot = Object.values(P).reduce((a, x) => a + x, 0); if (!tot) return null; let m = 0; for (const [c, v] of Object.entries(P)) m += Math.min(v, Q[c] || 0); return m / tot; };
        row.prodRevenue = prod.officialTotalRevenue ?? null;
        row.dineroIngresosBienUbicado = overlap('revenue'); row.dineroGastosBienUbicado = overlap('expense');
        // "De más": dinero propuesto (con Jev >= 0,90) que NO está en esa categoría en producción, sobre el total de producción del lado.
        // Sin esta medida, "bien ubicado" premia meter todo: min(producción, propuesta) no castiga cargar el estado resumido Y la nota a la
        // vez, ni el consolidado Y el individual. Una estrategia buena sube "bien ubicado" sin subir "de más".
        const excess = (side) => { const P = prodCat[side]; const Q = p.byCat[side]; const tot = Object.values(P).reduce((a, x) => a + x, 0); if (!tot) return null; let m = 0; for (const [c, v] of Object.entries(Q)) m += Math.max(0, v - (P[c] || 0)); return m / tot; };
        row.dineroIngresosDeMas = excess('revenue'); row.dineroGastosDeMas = excess('expense');
        if (p.lines) row.filas = p.lines.map((l) => [l.label.slice(0, 70), Math.round(l.native * 1e4) / 1e4, l.tside || '', l.cat, Math.round((l.conf || 0) * 100) / 100, l.origen || '']);
        row.docTotalEsOficial = p.docRevenueTotal !== null && row.prodRevenue != null ? Math.abs(Math.abs(p.docRevenueTotal) - Math.abs(row.prodRevenue)) <= Math.max(0.01, Math.abs(row.prodRevenue) * 0.005) : null;
        row.resultadoEsOficial = p.docResult !== null && prod.officialPAT != null ? Math.abs(Math.abs(p.docResult) - Math.abs(prod.officialPAT)) <= Math.max(0.01, Math.abs(prod.officialPAT) * 0.005) : null;
        row.byCat = undefined;
      }
    } catch (err) { row.error = String(err.message).slice(0, 120); }
    rows.push(row);
  });
  report(rows);
}

async function pool(items, worker) {
  let i = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => { while (i < items.length) { const idx = i++; await worker(items[idx], idx); if (idx % 25 === 0) process.stdout.write(`  ${idx}/${items.length}\r`); } }));
}

function report(rows) {
  writeFileSync(resolve(root, 'Admin', 'tests', `test-proponer-carga${TAG}.jsonl`), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
  const ok = rows.filter((r) => r.ok);
  const cnt = (f) => ok.filter(f).length;
  const avg = (k) => { const x = ok.filter((r) => r[k] != null); return x.length ? (100 * x.reduce((a, r) => a + r[k], 0) / x.length).toFixed(0) + '%' : '-'; };
  const med = (k) => { const x = ok.filter((r) => r[k] != null).map((r) => r[k]).sort((a, b) => a - b); return x.length ? (100 * x[Math.floor(x.length / 2)]).toFixed(0) + '%' : '-'; };
  const pct = (n, d) => (d ? `${(100 * n / d).toFixed(0)}%` : '-');
  const L = [];
  L.push('# Test de la etapa 5 (carga por script), versión 1: reconstrucción de ejercicios ya cargados', '');
  L.push(`Generado por \`tools/proponer-carga.mjs --backtest\` el ${new Date().toISOString().slice(0, 10)}. ${rows.length} documentos de ejercicios cargados. Jev categoriza cada fila con ejemplos que NO incluyen el ejercicio reconstruido; solo cuentan las filas con confianza ≥ 0,90.`, '');
  L.push('| Medida | Resultado |', '|---|---|');
  L.push(`| Se pudo armar una propuesta | ${ok.length} de ${rows.length} (${pct(ok.length, rows.length)}) |`);
  L.push(`| El total de ingresos detectado en el documento ES el oficial de producción (±0,5%) | ${cnt((r) => r.docTotalEsOficial)} de ${ok.length} (${pct(cnt((r) => r.docTotalEsOficial), ok.length)}) |`);
  L.push(`| El resultado del ejercicio detectado ES el oficial (±0,5%) | ${cnt((r) => r.resultadoEsOficial)} de ${ok.length} (${pct(cnt((r) => r.resultadoEsOficial), ok.length)}) |`);
  L.push(`| Dinero de INGRESOS de producción que quedó en la categoría correcta (media) | ${avg('dineroIngresosBienUbicado')} |`);
  L.push(`| Dinero de GASTOS de producción que quedó en la categoría correcta (media) | ${avg('dineroGastosBienUbicado')} |`);
  // mediana y no media: un solo ejercicio con la escala equivocada (miles leídos como unidades) da 50.000% y se come el promedio
  L.push(`| Dinero de INGRESOS propuesto DE MÁS (categoría que producción no tiene o por encima de lo que tiene; MEDIANA) | ${med('dineroIngresosDeMas')} |`);
  L.push(`| Dinero de GASTOS propuesto DE MÁS (mediana) | ${med('dineroGastosDeMas')} |`);
  L.push(`| Dinero bien ubicado, MEDIANA (ingresos / gastos) | ${med('dineroIngresosBienUbicado')} / ${med('dineroGastosBienUbicado')} |`);
  L.push(`| Las filas de ingresos propuestas suman un total de ingresos impreso en el documento (±0,5%) | ${cnt((r) => r.cierraIngresos)} de ${ok.length} (${pct(cnt((r) => r.cierraIngresos), ok.length)}) |`);
  L.push(`| Ejercicios con 90% o más del dinero de ingresos bien ubicado / con 10% o menos | ${cnt((r) => r.dineroIngresosBienUbicado >= 0.9)} / ${cnt((r) => r.dineroIngresosBienUbicado != null && r.dineroIngresosBienUbicado <= 0.1)} |`);
  L.push(`| Filas con Jev ≥ 0,90 sobre el total de filas (media) | ${(100 * ok.reduce((a, r) => a + r.nSure / Math.max(1, r.nRows), 0) / Math.max(1, ok.length)).toFixed(0)}% |`);
  L.push(`| Estrategia de tabla / llamadas a Jev (nuevas / de la caché) | ${TABLA} / ${jevCalls} / ${jevHits} |`, '');
  const mot = {}; for (const r of rows.filter((x) => !x.ok)) { const k = r.motivo || r.error || '?'; mot[k] = (mot[k] || 0) + 1; }
  L.push('Sin propuesta, por motivo: ' + (Object.entries(mot).map(([k, v]) => `${k}: ${v}`).join(' | ') || '-'), '');
  writeFileSync(resolve(root, 'Admin', 'tests', `test-proponer-carga${TAG}.md`), L.join('\n') + '\n');
  console.log('\n' + L.slice(4, 20).join('\n'));
}

if (IS_MAIN && BACKTEST) await backtest();
else if (IS_MAIN) {
  const site = loadSite(); const pdf = flagVal('--pdf');
  const q = JSON.parse(await run('tools/onboard.mjs', ['--quien', pdf, ...(flagVal('--club') ? ['--club', flagVal('--club')] : [])]));
  const md = pdf.replace(/\.pdf$/i, '.md'); const cd = site.generic[q.clubId];
  if (!cd) { console.error(`El club ${q.clubId} no tiene data/<club>-data.js: la carga automática solo cubre un año nuevo de un club existente.`); process.exit(2); }
  const b = await briefingFor(q.clubId, q.year, md);
  const p = await propose({ briefing: b, mdText: readFileSync(resolve(root, md), 'utf8'), clubData: cd, generic: site.generic, club: q.clubId, year: q.year });
  console.log(JSON.stringify({ club: q.clubId, year: q.year, ...p, lines: p.lines?.slice(0, 40) }, null, 1));
}

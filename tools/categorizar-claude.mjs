#!/usr/bin/env node
// ============================================================================
// tools/categorizar-claude.mjs — el escalón 2 de la categorización de rubros: lo que Jev no resuelve con
// confianza, se lo pregunta a Claude por API, UNA llamada por documento (club-año) con todos los rubros
// pendientes juntos y el contexto que Jev no puede usar.
//
// Corre en tu terminal, 0 tokens de Claude Code (gasta dólares de API, que es lo aceptado; ver la memoria
// "Scripts y API antes que tokens"). NO escribe nada en data/: solo deja resultados para que otra etapa decida.
//
// ---------------------------------------------------------------------------------------------------------
// LA CATEGORIZACIÓN EN ESCALONES (de más barato a más caro)
//
//   (0) Precedente del mismo club: el mismo texto (normalizado) ya está cargado en otro año del mismo club,
//       del mismo lado (ingreso/gasto), siempre con la misma categoría -> se copia. Gratis, sin API.
//       Es el "tier 0" del to-do 98 (tools/suggest-category-precedent.mjs hace lo mismo como consulta a mano).
//   (1) Jev (tools/jev-categorizar.mjs) con confianza >= 0,90 -> se acepta. Backtest sobre 3.975 rubros ya
//       cargados (Admin/tests/test-jev-resultados_lado_ej_otrosclubes.md): 94,4% de acierto en esa banda, que cubre
//       ~69% de los rubros. Jev cuesta casi nada, pero ve un rubro por vez y sin las convenciones del club.
//   (2) El resto -> Claude (este archivo). Una llamada por documento, con:
//         - la lista de categorías de data/category-map.js con su lado y su descripción completa (el comentario
//           de cada categoría en ese archivo es el criterio curado; se lee de ahí, no se reescribe acá);
//         - un resumen de los criterios del skill club-data-mapping que más errores evitan (sección CRITERIOS);
//         - las líneas YA CARGADAS de ese club en otros años (rawLabel -> normalizedCategory): son las
//           convenciones curadas del club, que es justo donde Jev más falla (Argentina 74%, Brasil 80%);
//         - las filas del mismo documento en orden (vecinas y encabezado de sección), con la categoría ya
//           resuelta por los escalones 0-1 cuando la hay, para que Claude vea la estructura del estado;
//         - para cada rubro pendiente, 6 ejemplos parecidos de OTROS clubes (misma búsqueda por palabras que Jev).
//       Salida en JSON estricto (structured outputs): categoría + confianza + motivo corto, por rubro.
//   (3) Lo que Claude tampoco deja con confianza alta -> se frena (lo resuelve una sesión o va a
//       Admin/dudas-por-club.md). No se inventa.
//
// ---------------------------------------------------------------------------------------------------------
// NÚMEROS MEDIDOS (backtest del 2026-09-30, detalle en Admin/tests/test-categorizar-claude.md)
//   Sobre los 1.217 rubros que Jev deja < 0,90 (de 3.975; 224 club-años), Opus 5.5, esfuerzo low, con contexto del club:
//     - acierto 76,6% (Jev en esos mismos rubros: 57,1%). Por confianza de Claude: >= 0,90 -> 98,5% (132 rubros);
//       0,80-0,90 -> 94,3% (296); 0,60-0,80 -> 75,2% (488); < 0,60 -> 51,8% (301). La confianza SÍ separa.
//     - sistema combinado (precedente aparte): Jev >= 0,90 + Claude >= 0,80 -> 80,2% de los rubros automáticos con 94,5%
//       de acierto (Jev solo: 69,4% con 94,4%); queda 19,8% para revisar. Todo automático sin umbral: 88,9%.
//     - las líneas ya cargadas del club valen ~8 puntos: en la misma muestra de 259 rubros, 81,1% con ellas vs 72,6% sin;
//       y con ellas hay 93 rubros >= 0,80 (94,6%) contra 59 (89,8%).
//     - Sonnet 5.5 en esos 259: 74,9% (vs 81,1% de Opus), 44% más barato; su confianza está peor calibrada.
//   Costo (Opus 5.5): US$ 0,0036 por rubro, mediana US$ 0,015 por club-año (p90 0,039, máx. 0,108); sin thinking a esfuerzo low.
//   OJO: la regla de "gastos accesorios de transferencias -> other_expenses" de CRITERIOS se agregó DESPUÉS del backtest
//   (el error más frecuente fue other_expenses -> player_amortisation, 23 casos, con producción dividida 40/31): no está medida.
//
// ---------------------------------------------------------------------------------------------------------
// MODOS
//
//   --backtest   ¿Cuánto acierta Claude en lo que Jev deja < 0,90? Toma las filas de un backtest de Jev
//                (por defecto Admin/jev/backtest_lado_ej_otrosclubes.jsonl: una línea por rubro único de un club
//                ya cargado, con `truth` = la categoría de producción y `confidence` = la de Jev), se queda con
//                las < 0,90, les asigna el club-año donde aparecen (el ejercicio más reciente del club que tiene
//                ese texto) y manda una llamada por club-año.
//                SIN FUGA DE LA RESPUESTA: del contexto del club se sacan TODAS las líneas de ese mismo club-año
//                y cualquier línea de otro año con el mismo texto que un rubro pendiente (eso lo habría resuelto
//                el escalón 0, así que el caso que llega a Claude es justamente el que NO tiene precedente
//                exacto). Las filas del documento se muestran sin su categoría real; las que Jev resolvió con
//                >= 0,90 van con la categoría DE JEV (no la real), igual que pasaría en producción.
//                Reanudable: los club-años ya respondidos en el .jsonl de salida no se vuelven a pagar.
//   --informe    Solo lee el/los .jsonl del backtest y muestra las tablas (sin API).
//   --listos     Producción: para cada `<md>.jev.json` que dejó jev-categorizar.mjs --listos, aplica el escalón 0,
//                acepta Jev >= 0,90 y manda el resto a Claude. Deja `<md>.categorias.json` al lado.
//
// USO:
//   node tools/categorizar-claude.mjs --backtest --limit 50 --dry-run           # arma los pedidos, estima tokens, no llama
//   node tools/categorizar-claude.mjs --backtest --limit 50                     # calibración: ~50 rubros
//   node tools/categorizar-claude.mjs --backtest --limit 0 --modelo claude-sonnet-5-5
//   node tools/categorizar-claude.mjs --backtest --sin-club --etiqueta _sinclub # variante sin las líneas del club
//   node tools/categorizar-claude.mjs --informe [--etiqueta _x]
//   node tools/categorizar-claude.mjs --listos [--limit 10] [--dry-run] [--lista Admin/mi-piloto.txt]
//   Extras: --modelo (default claude-opus-5-5), --esfuerzo low|medium|high (default low; Haiku no lo usa),
//           --concurrencia 4, --semilla 7, --umbral-jev 0.9, --jev-jsonl <ruta>, --muestra-estratificada N
//
// COSTO: cada llamada queda en Admin/claude-api/resultados.jsonl (mismo archivo que las tools de transcripción,
// lo suma tools/gasto.mjs) con `tarea: "categorizar"`, sin campo `md` a propósito: inventario-transcripciones.mjs
// usa `md` de ese log para saber qué motor hizo cada transcripción, y esto no es una transcripción.
//
// RAW HTTP, sin SDK: mismo criterio que claude-api-transcribe.mjs (el proyecto no tiene package.json a propósito).
// Necesita Admin/claude-api/.env con ANTHROPIC_API_KEY=... (gitignoreado).
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { huellaRubros, huellaJev, categoriasAlDia, leerLista } from './huellas.mjs';
import { resolve } from 'node:path';
import { derivado, ubicar } from './rutas.mjs';
import { registrarAprendidas, lineasAprendidas, MIN_PRECEDENTE, padreDe } from './memoria-categorias.mjs';
import { mismaFamilia } from './vocabulario.mjs';
import { sinMarca, mismoPadre, padreEnClub } from './padres-filas.mjs'; // en qué nota está cada fila cargada (Versión 403)
import { abrirCache } from './respuestas-cache.mjs'; // respuestas ya pagadas (Versión 321) // familia de etiquetas del precedente (Versión 321)
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const envPath = resolve(root, 'Admin', 'claude-api', '.env');
const costLogPath = resolve(root, 'Admin', 'claude-api', 'resultados.jsonl');
const outDir = resolve(root, 'Admin', 'categorizar-claude');

// Precios por millón de tokens (skill claude-api, tabla cacheada 2026-09-25). La escritura de caché cuesta 1,25x la
// entrada y la lectura 0,1x. Los tokens de "thinking" se cobran como salida (vienen dentro de output_tokens).
export const PRICES = {
  'claude-opus-5-5': { in: 4, out: 20 },
  'claude-sonnet-5-5': { in: 2, out: 10 },
  'claude-haiku-4-5': { in: 1, out: 5 },
};
const DEFAULT_MODEL = 'claude-opus-5-5';
const K_EXAMPLES = 6; // ejemplos de otros clubes por rubro pendiente (Jev usaba 8; con el resto del contexto alcanzan menos)
const MAX_CLUB_LINES = 150; // tope de líneas ya cargadas del club que se mandan (Vélez tiene 633; se eligen las más parecidas)

// ---------------------------------------------------------------------------------------------------------
// Categorías: se leen de data/category-map.js (etiqueta + el comentario COMPLETO de cada una, que es el
// criterio curado). Jev recibe solo la primera oración; Claude puede leer el comentario entero.
export function loadCategories() {
  const src = readFileSync(resolve(root, 'data', 'category-map.js'), 'utf8');
  const block = (name) => { const a = src.indexOf(`const ${name} = [`); return src.slice(a, src.indexOf('];', a)); };
  const labels = (name) => { const a = src.indexOf(`const ${name} = {`); const b = src.slice(a, src.indexOf('};', a)); return Object.fromEntries([...b.matchAll(/^\s*([a-z_]+):\s*'([^']*)'/gm)].map((m) => [m[1], m[2]])); };
  const build = (arrName, labName) => {
    const lab = labels(labName); const out = {};
    for (const m of block(arrName).matchAll(/^\s*'([a-z_]+)',?\s*(?:\/\/\s*(.*))?$/gm)) {
      const comment = (m[2] || '').replace(/\(Versión \d+[^)]*\)/g, '').replace(/\s+/g, ' ').trim();
      out[m[1]] = { label: lab[m[1]] || m[1], desc: comment };
    }
    return out;
  };
  return { revenue: build('REVENUE_CATEGORIES', 'REVENUE_CATEGORY_LABELS'), expense: build('EXPENSE_CATEGORIES', 'EXPENSE_CATEGORY_LABELS') };
}
const CATS = loadCategories();
export const sideOf = (cat) => (cat in CATS.revenue ? 'revenue' : cat in CATS.expense ? 'expense' : '?');
const ALL_CATS = [...Object.keys(CATS.revenue), ...Object.keys(CATS.expense)];
const NOT_A_LINE = 'no_es_rubro';

// ---------------------------------------------------------------------------------------------------------
// Datos del sitio: los mismos data/*.js que carga el navegador, en un sandbox de vm (mismo método que jev-categorizar.mjs).
let _data = null;
export function loadClubData() {
  if (_data) return _data;
  const sandbox = { console, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...readdirSync(resolve(root, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f)];
  for (const rel of files) vm.runInContext(readFileSync(resolve(root, rel), 'utf8'), ctx, { filename: rel });
  _data = vm.runInContext('window.CLUB_GENERIC_DATA', ctx);
  return _data;
}
export const norm = (s) => String(s).toLowerCase().replace(/\s+/g, ' ').trim();
const words = (t) => new Set(String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/).filter((w) => w.length > 2));
const jaccard = (a, b) => { let i = 0; for (const w of a) if (b.has(w)) i++; return i ? i / (a.size + b.size - i) : 0; };
const SIDE_KEY = { revenue: 'revenueLinesByYear', expense: 'expenseLinesByYear' };

// Todas las líneas cargadas del sitio, por club: [{club, year, side, label, cat}] (en el orden en que figuran).
export function allLines(data = loadClubData()) {
  const out = [];
  for (const [club, d] of Object.entries(data)) for (const side of ['revenue', 'expense']) {
    for (const [year, lines] of Object.entries(d[SIDE_KEY[side]] || {})) for (const l of lines || []) {
      if (l.rawLabel && l.normalizedCategory) out.push({ club, year: String(year), side, label: l.rawLabel.trim(), cat: l.normalizedCategory, padre: padreEnClub(club, String(year), side, l.rawLabel) });
    }
  }
  return out;
}

// Escalón 0: precedente exacto del mismo club y lado, con una sola categoría en todos los años -> esa categoría.
export function precedente(lines, club, side, label, { excludeYear = null } = {}) {
  const cats = new Set(lines.filter((l) => l.club === club && l.side === side && l.year !== excludeYear && norm(l.label) === norm(label)).map((l) => l.cat));
  return cats.size === 1 ? [...cats][0] : null;
}

// Escalón 0 con FAMILIA DE ETIQUETAS (Versión 321, pedido de Guido: "una familia de palabras similares, como la del PSV con dos S o una"; la regla
// está en mismaFamilia() de tools/vocabulario.mjs). Primero el precedente exacto; si no hay, la familia. Devuelve { cat, via } o null.
// MEDIDO contra producción (7.098 líneas cargadas; para cada línea, el precedente sale de los OTROS años del mismo club):
//   - lado conocido:    exacto 4.782 líneas con 99,9% de acierto; la familia resuelve 110 más con 96,4% (Claude >= 0,80 da 94,5% en su backtest).
//   - lado DESCONOCIDO: antes no había precedente (la fila iba entera a Jev/Claude). Ahora: exacto si todas las coincidencias del club son de UN
//     solo lado (4.732 líneas, 99,7%), y si no, familia SIN tolerar el paréntesis final (60 más, 100%). Con la tolerancia bajaba a 91,9%.
// Siempre del MISMO club y con UNA sola categoría entre todas las coincidencias: si el club la cargó distinto en años distintos, no hay precedente.
// ESCALERA DE LA ETAPA 7 (Versión 343): precedente exacto CON CONTEXTO (misma etiqueta y mismo renglón que desglosa) -> exacto -> familia ->
// Jev >= 0,90 -> Claude >= 0,80 -> cola. Si la misma etiqueta tiene categorías distintas en el club (sin contexto que las separe), `unico`
// devuelve null y se baja al escalón siguiente: el precedente nunca elige entre dos respuestas distintas.
export function precedenteFamilia(lines, club, side, label, { excludeYear = null, padre = null } = {}) {
  const delClub = lines.filter((l) => l.club === club && l.year !== excludeYear && (!side || l.side === side));
  const unico = (arr) => { const cats = new Set(arr.map((l) => l.cat)); const lados = new Set(arr.map((l) => l.side)); return cats.size === 1 && lados.size === 1 ? [...cats][0] : null; };
  const nl = norm(label);
  // (Versión 403, cambios A y B de la auditoría del pipeline) Con el padre (la nota) de la fila:
  //   A  el escalón con contexto compara las etiquetas SIN la marca de nota del final ("(a)", "(1)"): la marca cambia de nota entre años;
  //   B  si la etiqueta tiene precedentes con nota conocida y NINGUNO está en la nota de esta fila, el precedente sin contexto NO decide (la
  //      fila baja a Jev/Claude, que reciben la nota). Caso: Goiás 2014 "Despesa com pessoal" (nota de fútbol) tomaba 2022-2023 (nota
  //      administrativa). Los precedentes sin nota conocida (años cargados antes del proceso nuevo) siguen valiendo como antes.
  if (padre) {
    const ctx = unico(delClub.filter((l) => l.padre && sinMarca(l.label) === sinMarca(label) && mismoPadre(l.padre, padre))); if (ctx) return { cat: ctx, via: 'exacto-con-contexto' };
    const conNota = delClub.filter((l) => l.padre && sinMarca(l.label) === sinMarca(label));
    if (conNota.length && !conNota.some((l) => mismoPadre(l.padre, padre))) return null;
  }
  const ex = unico(delClub.filter((l) => norm(l.label) === nl));
  if (ex) return { cat: ex, via: side ? 'exacto' : 'exacto-sin-lado' };
  const fam = unico(delClub.filter((l) => mismaFamilia(l.label, label, { parentesis: Boolean(side) })));
  return fam ? { cat: fam, via: side ? 'familia' : 'familia-sin-lado' } : null;
}

// Ejemplos de otros clubes (misma búsqueda por palabras en común que usa Jev): un rubro -> hasta K rubros parecidos ya categorizados.
export function makeRetriever(lines) {
  const uniq = new Map();
  for (const l of lines) { const k = `${l.club}|${l.side}|${norm(l.label)}`; const cur = uniq.get(k); if (!cur) uniq.set(k, { ...l, w: words(l.label) }); else if (cur.cat !== l.cat) cur.conflict = true; }
  const bank = [...uniq.values()].filter((x) => !x.conflict);
  return (q, k = K_EXAMPLES) => {
    const qw = words(q.label); const scored = [];
    for (const b of bank) {
      if (b.club === q.club) continue; // el mismo club va aparte (contexto del club), con sus propias exclusiones
      if (q.side && b.side !== q.side) continue;
      const s = jaccard(qw, b.w); if (s > 0) scored.push([s, b]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    const seen = new Set(); const out = [];
    for (const [, b] of scored) { const kk = `${norm(b.label)}|${b.cat}`; if (seen.has(kk)) continue; seen.add(kk); out.push(b); if (out.length >= k) break; }
    return out;
  };
}

// Convenciones del club: sus líneas ya cargadas en OTROS años (texto -> categoría), sin repetir, las más parecidas
// a los rubros pendientes primero, con tope MAX_CLUB_LINES. `excludeLabels` saca los textos que son la respuesta.
export function clubConventions(lines, club, { excludeYear = null, excludeLabels = new Set(), pendingLabels = [] } = {}) {
  const seen = new Map();
  for (const l of lines) {
    if (l.club !== club || l.year === excludeYear || excludeLabels.has(`${l.side}|${norm(l.label)}`)) continue;
    const k = `${l.side}|${norm(l.label)}|${l.cat}`;
    if (!seen.has(k)) seen.set(k, { ...l, years: new Set([l.year]) }); else seen.get(k).years.add(l.year);
  }
  let arr = [...seen.values()];
  if (arr.length > MAX_CLUB_LINES) {
    const pw = pendingLabels.map((p) => words(p));
    arr = arr.map((x) => { const w = words(x.label); return [Math.max(0, ...pw.map((q) => jaccard(q, w))), x]; }).sort((a, b) => b[0] - a[0]).slice(0, MAX_CLUB_LINES).map(([, x]) => x);
  }
  return arr.sort((a, b) => (a.side === b.side ? 0 : a.side === 'revenue' ? -1 : 1));
}

// ---------------------------------------------------------------------------------------------------------
// PROMPT. El sistema es fijo (se cachea); lo variable va en el mensaje del usuario.
const CRITERIOS = `CRITERIOS DEL SITIO (resumen del skill club-data-mapping; si chocan con la convención ya cargada del club, gana la del club):
- El sitio refleja cómo LO PRESENTA CADA CLUB. Las líneas ya cargadas del mismo club en otros años son la convención curada: si un rubro pendiente es el mismo concepto que una de ellas (aunque el texto cambie un poco: abreviaturas, otro orden, un año distinto en el nombre), usá la MISMA categoría, aunque en abstracto elegirías otra.
- Rubros estructuralmente iguales entre clubes tienen categoría propia (cuotas sociales, TV, entradas, sponsors, sueldos del plantel, pases, depreciación). Lo específico de cada club (sede social, alquileres genéricos, salones, hotelería, estacionamiento) va a other_income / other_expenses.
- lump_football_operations(_expense) solo si el club NO desglosa ("Fútbol profesional" como una cifra); nunca para un encabezado con líneas propias debajo.
- stadium_other es CONSERVADOR: solo si el texto nombra el estadio o una parte (palcos, concesiones del estadio). "Alquileres" genérico -> other_income.
- Pases: ventas brutas -> player_sales; costo de COMPRA/ADQUISICIÓN de jugadores y su amortización -> player_amortisation (aunque el club no capitalice). Gastos accesorios de transferencias o préstamos (comisiones, intermediarios, "gastos por transferencias y préstamos", atletas cedidos) -> other_expenses, salvo que la convención del club diga otra cosa.
- Cargas sociales van con el sueldo del sector: plantel profesional/cuerpo técnico -> wages_squad; amateur, juveniles, otros deportes -> youth_other_sports_expense; administración -> admin_general_expense.
- Impuestos, tasas, seguros, ART -> admin_general_expense. Amortización/depreciación de bienes de uso tangibles -> depreciation; amortización de intangibles que no son jugadores (software, concesiones), previsiones -> other_amortisation. Desafectaciones, condonaciones, partidas no recurrentes -> exceptional_items.
- Premios por avance de ronda/participación: competition_bonus solo si el documento los separa de la recaudación; si no, matchday_competition.
- Intereses, diferencias de cambio, resultado financiero, impuesto a las ganancias, subtotales y totales NO son líneas del sitio: respondé ${NOT_A_LINE}.`;

function systemPrompt() {
  const fmt = (side, name) => Object.entries(CATS[side]).map(([k, v]) => `- ${k} [${name}] ${v.label}${v.desc ? ` — ${v.desc}` : ''}`).join('\n');
  return `Categorizás rubros de estados financieros de clubes de fútbol para el sitio financeofsports.com. Cada rubro va a UNA categoría del sitio.

CATEGORÍAS DE INGRESOS:
${fmt('revenue', 'INGRESO')}

CATEGORÍAS DE GASTOS:
${fmt('expense', 'GASTO')}

${CRITERIOS}

CÓMO RESPONDER:
- Una entrada por cada rubro PENDIENTE (los marcados con [#id]), con su id. No categorices las filas sin id: son contexto.
- La categoría tiene que ser del lado que se indica para el rubro (ingreso o gasto), salvo que el texto sea inequívocamente del otro lado; si no es una línea de ingreso o gasto, ${NOT_A_LINE}.
- confianza: tu probabilidad (0 a 1) de que un curador cuidadoso de este sitio, que conoce la convención del club, haya elegido exactamente esa categoría. Reservá >= 0,9 para casos inequívocos o calcados de la convención del club; bajala cuando el texto sea ambiguo entre dos categorías o dependa de una convención que no se ve.
- motivo: una frase corta (máx. 20 palabras), en español, que diga en qué te basaste (p. ej. "igual a 'X' del club en 2021", "vecinas son de fútbol amateur").`;
}

const SIDE_ES = { revenue: 'ingreso', expense: 'gasto' };

// rubros: [{ label, lado: 'revenue'|'expense'|null, section?, glosa?, pendiente: bool, ya?: categoría ya resuelta }]
// Devuelve el texto del mensaje del usuario y el mapa id -> índice de rubro.
function userMessage({ club, year, rubros, conventions, examplesFor }) {
  const out = [];
  out.push(`Club: ${club}${year ? ` — ejercicio ${year}` : ''}.`);
  if (conventions && conventions.length) {
    out.push('', `LÍNEAS YA CARGADAS DE ESTE CLUB EN OTROS EJERCICIOS (su convención curada; texto -> categoría):`);
    for (const c of conventions) out.push(`- [${SIDE_ES[c.side]}] "${c.label}" -> ${c.cat}`);
  } else if (conventions) {
    out.push('', 'Este club no tiene líneas cargadas en otros ejercicios (club nuevo): no hay convención propia que seguir.');
  }
  out.push('', 'FILAS DEL DOCUMENTO, EN ORDEN (las que tienen [#id] son las pendientes; las demás son contexto, con la categoría ya asignada cuando la hay):');
  let lastSection = null; const ids = [];
  rubros.forEach((r, i) => {
    if (r.section && r.section !== lastSection) { out.push(`  ## ${r.section}`); lastSection = r.section; }
    const lado = r.lado ? SIDE_ES[r.lado] : 'lado ?';
    const texto = r.glosa && r.glosa !== r.label ? `"${r.label}" (= ${r.glosa})` : `"${r.label}"`;
    if (r.pendiente) { ids.push(i); out.push(`  [#${ids.length}] (${lado}) ${texto}`); }
    else out.push(`  - (${lado}) ${texto}${r.ya ? ` -> ${r.ya}` : ''}`);
  });
  if (examplesFor) {
    out.push('', 'EJEMPLOS PARECIDOS DE OTROS CLUBES (cada club tiene convenciones propias; orientan, no mandan):');
    ids.forEach((i, n) => {
      const ex = examplesFor(rubros[i]);
      if (ex.length) out.push(`[#${n + 1}] ${ex.map((x) => `"${x.label}" (${x.club}) -> ${x.cat}`).join(' | ')}`);
    });
  }
  out.push('', `Categorizá los ${ids.length} rubros pendientes.`);
  return { text: out.join('\n'), ids };
}

const SCHEMA = {
  type: 'object',
  properties: {
    rubros: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          categoria: { type: 'string', enum: [...ALL_CATS, NOT_A_LINE] },
          confianza: { type: 'number' },
          motivo: { type: 'string' },
        },
        required: ['id', 'categoria', 'confianza', 'motivo'],
        additionalProperties: false,
      },
    },
  },
  required: ['rubros'],
  additionalProperties: false,
};

export function readKey() {
  if (!existsSync(envPath)) throw new Error(`Falta ${envPath} con una línea ANTHROPIC_API_KEY=...`);
  const line = readFileSync(envPath, 'utf8').split('\n').find((l) => l.startsWith('ANTHROPIC_API_KEY='));
  if (!line) throw new Error(`No encontré ANTHROPIC_API_KEY en ${envPath}`);
  return line.slice('ANTHROPIC_API_KEY='.length).trim();
}

// Una llamada a /v1/messages. Sin streaming: la salida es chica (unas decenas de tokens por rubro + el thinking).
// - Opus 5.5 / Sonnet 5.5: thinking adaptativo (no se puede apagar en Opus 5.5) con effort bajo, y `fallbacks: "default"`
//   (recomendado por la skill claude-api: si un clasificador de seguridad rechaza el pedido, lo reintenta otro modelo del
//   lado del servidor; para rubros contables es improbable, pero no cuesta nada tenerlo).
// - Haiku 4.5: sin effort ni thinking (no los acepta así); solo el formato JSON.
async function callClaude({ apiKey, model, effort, system, user, maxTokens = 12000 }) {
  const body = { model, max_tokens: maxTokens, system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }], output_config: { format: { type: 'json_schema', schema: SCHEMA } } };
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' };
  if (model !== 'claude-haiku-4-5') { body.output_config.effort = effort; }
  if (model === 'claude-opus-5-5' || model === 'claude-sonnet-5-5') { body.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; }
  let lastErr = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    let res;
    try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body) }); }
    catch (e) { lastErr = String(e); await sleep(2000 * (attempt + 1)); continue; }
    if (res.ok) {
      const j = await res.json();
      if (j.stop_reason === 'refusal') return { error: `refusal: ${JSON.stringify(j.stop_details)}`, usage: j.usage, model: j.model };
      const text = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
      let parsed = null; try { parsed = JSON.parse(text); } catch { return { error: `JSON inválido (stop=${j.stop_reason}): ${text.slice(0, 200)}`, usage: j.usage, model: j.model }; }
      return { parsed, usage: j.usage, model: j.model, stopReason: j.stop_reason };
    }
    const txt = (await res.text()).slice(0, 400); lastErr = `HTTP ${res.status}: ${txt}`;
    if (res.status === 429 || res.status >= 500) { await sleep(4000 * (attempt + 1)); continue; }
    return { error: lastErr };
  }
  return { error: lastErr || 'reintentos agotados' };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function costOf(model, u = {}) {
  const p = PRICES[model] || PRICES[DEFAULT_MODEL];
  const inTok = (u.input_tokens || 0) + 1.25 * (u.cache_creation_input_tokens || 0) + 0.1 * (u.cache_read_input_tokens || 0);
  return (inTok * p.in + (u.output_tokens || 0) * p.out) / 1e6;
}

// ---------------------------------------------------------------------------------------------------------
// LA FUNCIÓN EXPORTADA. Una llamada por documento.
//   club, year: identificadores (year puede ser null).
//   rubros: filas del documento en orden: { label, lado, section?, glosa?, pendiente (default true), ya? }.
//   opciones: modelo, esfuerzo, contextoClub (true = mandar las líneas ya cargadas del club), excludeYear (no mandar las
//             líneas del club de ese año: en backtest es el mismo club-año; en producción es el año que se está cargando),
//             excludeLabels (Set "lado|texto normalizado" que no se mandan del club), ejemplos (true), apiKey, dryRun.
// Devuelve { resultados: [{ idx, label, lado, categoria, confianza, motivo }], usage, costUsd, model, error?, promptChars }.
export async function categorizarConClaude({ club, year = null, rubros, modelo = DEFAULT_MODEL, esfuerzo = 'low', contextoClub = true, excludeYear = null, excludeLabels = null, ejemplos = true, apiKey = null, dryRun = false, lines = null, retriever = null }) {
  lines ||= allLines();
  const rs = rubros.map((r) => ({ pendiente: true, ...r }));
  const pend = rs.filter((r) => r.pendiente);
  if (!pend.length) return { resultados: [], costUsd: 0 };
  const exclude = excludeLabels || new Set(pend.map((r) => `${r.lado}|${norm(r.label)}`));
  const conventions = contextoClub ? clubConventions(lines, club, { excludeYear: excludeYear ?? (year != null ? String(year) : null), excludeLabels: exclude, pendingLabels: pend.map((r) => r.glosa || r.label) }) : null;
  retriever ||= makeRetriever(lines);
  const examplesFor = ejemplos ? (r) => retriever({ label: r.glosa && r.glosa !== r.label ? `${r.label} ${r.glosa}` : r.label, club, side: r.lado }) : null;
  const system = systemPrompt();
  const { text, ids } = userMessage({ club, year, rubros: rs, conventions, examplesFor });
  if (dryRun) return { resultados: [], costUsd: 0, promptChars: system.length + text.length, userChars: text.length, systemChars: system.length, user: text };
  const t0 = Date.now();
  const r = await callClaude({ apiKey: apiKey || readKey(), model: modelo, effort: esfuerzo, system, user: text });
  const costUsd = costOf(modelo, r.usage);
  appendFileSync(costLogPath, JSON.stringify({ ts: new Date().toISOString(), tarea: 'categorizar', club, year, model: r.model || modelo, promptTokenCount: (r.usage?.input_tokens || 0) + (r.usage?.cache_creation_input_tokens || 0) + (r.usage?.cache_read_input_tokens || 0), cacheReadTokens: r.usage?.cache_read_input_tokens || 0, candidatesTokenCount: r.usage?.output_tokens || 0, costUsd: Number(costUsd.toFixed(6)), elapsedMs: Date.now() - t0, stopReason: r.stopReason || null, rubros: ids.length, error: r.error || undefined }) + '\n');
  if (r.error) return { resultados: [], error: r.error, usage: r.usage, costUsd, model: modelo };
  const byId = new Map((r.parsed.rubros || []).map((x) => [x.id, x]));
  const resultados = ids.map((i, n) => { const x = byId.get(n + 1); return { idx: i, label: rs[i].label, lado: rs[i].lado, categoria: x?.categoria ?? null, confianza: x?.confianza ?? null, motivo: x?.motivo ?? (x ? '' : 'sin respuesta para este id') }; });
  return { resultados, usage: r.usage, costUsd, model: r.model || modelo };
}

// ---------------------------------------------------------------------------------------------------------
function rng(s) { let x = s >>> 0; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);

// Arma los documentos (club-año) del backtest: cada rubro de Jev < umbral se asigna al ejercicio más reciente del club
// que tiene ese texto; las filas del documento son las líneas de ese club-año en el orden del data/*.js.
function buildBacktestDocs(opt) {
  const data = loadClubData(); const lines = allLines(data);
  const jev = readJsonl(resolve(root, opt.jevJsonl)).filter((r) => !r.error);
  const jevBy = new Map(jev.map((r) => [`${r.club}|${r.side}|${norm(r.label)}`, r]));
  const low = jev.filter((r) => r.confidence < opt.umbral);
  const docs = new Map();
  for (const r of low) {
    const ys = [...new Set(lines.filter((l) => l.club === r.club && l.side === r.side && norm(l.label) === norm(r.label)).map((l) => l.year))].sort();
    if (!ys.length) continue;
    const key = `${r.club}|${ys.at(-1)}`;
    if (!docs.has(key)) docs.set(key, { club: r.club, year: ys.at(-1), pend: [] });
    docs.get(key).pend.push(r);
  }
  for (const d of docs.values()) {
    const pendKeys = new Set(d.pend.map((r) => `${r.side}|${norm(r.label)}`));
    const seen = new Set();
    d.rubros = lines.filter((l) => l.club === d.club && l.year === d.year).filter((l) => { const k = `${l.side}|${norm(l.label)}`; if (seen.has(k)) return false; seen.add(k); return true; }).map((l) => {
      const k = `${l.side}|${norm(l.label)}`;
      const j = jevBy.get(`${l.club}|${k}`);
      if (pendKeys.has(k)) return { label: l.label, lado: l.side, pendiente: true, truth: j.truth, jev: j.choice, jevConf: j.confidence };
      // Fila de contexto: si Jev la resolvió con confianza alta, se muestra la categoría DE JEV (lo que habría en producción); si no, sin categoría.
      return { label: l.label, lado: l.side, pendiente: false, ya: j && j.confidence >= opt.umbral ? j.choice : undefined };
    });
    d.excludeLabels = pendKeys;
  }
  return { docs: [...docs.values()], lines, jev };
}

async function backtest(opt) {
  const { docs, lines } = buildBacktestDocs(opt);
  const rnd = rng(opt.seed);
  const order = docs.map((d) => [rnd(), d]).sort((a, b) => a[0] - b[0]).map(([, d]) => d); // orden aleatorio fijo por semilla
  let sel = []; let n = 0;
  for (const d of order) { if (opt.limit > 0 && n >= opt.limit) break; sel.push(d); n += d.pend.length; }
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `backtest${opt.tag}.jsonl`);
  const done = new Set(readJsonl(outPath).filter((r) => r.categoria !== undefined).map((r) => `${r.club}|${r.year}`));
  const todo = sel.filter((d) => !done.has(`${d.club}|${d.year}`));
  console.log(`${docs.length} club-años con rubros de Jev < ${opt.umbral} (${docs.reduce((a, d) => a + d.pend.length, 0)} rubros). Selección: ${sel.length} club-años / ${n} rubros; ya hechos: ${sel.length - todo.length}. Modelo ${opt.modelo}, esfuerzo ${opt.esfuerzo}, contexto del club: ${opt.sinClub ? 'NO' : 'sí'}.`);
  const retriever = makeRetriever(lines);
  if (opt.dry) {
    let chars = 0;
    for (const d of todo) { const r = await categorizarConClaude({ club: d.club, year: d.year, rubros: d.rubros, contextoClub: !opt.sinClub, excludeYear: d.year, excludeLabels: d.excludeLabels, lines, retriever, dryRun: true }); chars += r.userChars; if (d === todo[0]) { console.log(`--- sistema: ${r.systemChars} chars; ejemplo de mensaje (${d.club} ${d.year}) ---\n${r.user}\n---`); } }
    const sys = systemPrompt().length;
    console.log(`Estimación gruesa (4 chars/token): sistema ~${Math.round(sys / 4)} tokens por llamada; usuario ~${Math.round(chars / 4)} tokens en total (${Math.round(chars / 4 / Math.max(1, todo.length))} por llamada).`);
    return;
  }
  const apiKey = readKey(); let cost = 0; let i = 0; let doneN = 0;
  await Promise.all(Array.from({ length: opt.conc }, async () => {
    while (i < todo.length) {
      const d = todo[i++];
      const r = await categorizarConClaude({ club: d.club, year: d.year, rubros: d.rubros, modelo: opt.modelo, esfuerzo: opt.esfuerzo, contextoClub: !opt.sinClub, excludeYear: d.year, excludeLabels: d.excludeLabels, lines, retriever, apiKey });
      cost += r.costUsd || 0; doneN++;
      if (r.error) { console.log(`  ERROR ${d.club} ${d.year}: ${r.error.slice(0, 200)}`); appendFileSync(outPath, JSON.stringify({ club: d.club, year: d.year, error: r.error }) + '\n'); continue; }
      const perRubro = (r.costUsd || 0) / Math.max(1, r.resultados.length);
      for (const x of r.resultados) {
        const src = d.rubros[x.idx];
        appendFileSync(outPath, JSON.stringify({ ts: new Date().toISOString(), club: d.club, year: d.year, side: src.lado, label: src.label, truth: src.truth, jev: src.jev, jevConf: src.jevConf, categoria: x.categoria, confianza: x.confianza, motivo: x.motivo, model: r.model, costUsd: Number(perRubro.toFixed(6)), docRubros: r.resultados.length, docCost: Number((r.costUsd || 0).toFixed(6)), usage: r.usage }) + '\n');
      }
      console.log(`  ${doneN}/${todo.length} ${d.club} ${d.year}: ${r.resultados.length} rubros, ${r.resultados.filter((x) => x.categoria === src0(d, x)).length} aciertos, $${(r.costUsd || 0).toFixed(4)} (acumulado $${cost.toFixed(3)})`);
    }
  }));
  console.log(`\nCosto de esta corrida: $${cost.toFixed(3)}. Resultados en ${outPath.replace(root + '/', '')}.`);
  informe(opt);
}
const src0 = (d, x) => d.rubros[x.idx].truth;

// ---------------------------------------------------------------------------------------------------------
// INFORME: tablas sobre el .jsonl del backtest (sin API). La "verdad" es producción: a veces una convención curada
// discutible; los pares de categorías vecinas de abajo se cuentan aparte como "discrepancia de convención".
const CONVENTION_PAIRS = [
  ['other_income', 'lump_football_operations'], ['admin_general_expense', 'other_expenses'], ['depreciation', 'other_amortisation'],
  ['member_dues', 'season_tickets'], ['matchday_competition', 'competition_bonus'], ['stadium_other', 'other_income'],
  ['sponsorship_commercial', 'other_income'], ['other_amortisation', 'exceptional_items'], ['other_expenses', 'exceptional_items'],
  ['youth_other_sports_expense', 'admin_general_expense'], ['match_organisation_expense', 'admin_general_expense'], ['match_organisation_expense', 'wages_squad'],
  ['other_sports', 'other_income'], ['youth_football', 'player_sales'], ['lump_football_operations_expense', 'other_expenses'],
].map((p) => p.sort().join('~'));
export const isConventionPair = (a, b) => CONVENTION_PAIRS.includes([a, b].sort().join('~'));

function informe(opt) {
  const rows = readJsonl(resolve(outDir, `backtest${opt.tag}.jsonl`)).filter((r) => r.categoria !== undefined && r.truth);
  if (!rows.length) { console.log('Sin filas en el backtest.'); return; }
  const ok = (r) => r.categoria === r.truth;
  const pct = (a, b) => (b ? `${(100 * a / b).toFixed(1)}%` : '-');
  const docs = new Map(); for (const r of rows) docs.set(`${r.club}|${r.year}`, r.docCost || 0);
  const cost = [...docs.values()].reduce((a, b) => a + b, 0);
  console.log(`\n== Backtest Claude${opt.tag ? ` (${opt.tag})` : ''}: ${rows.length} rubros, ${docs.size} club-años, modelo(s) ${[...new Set(rows.map((r) => r.model))].join(', ')} ==`);
  console.log(`Acierto Claude: ${rows.filter(ok).length}/${rows.length} (${pct(rows.filter(ok).length, rows.length)}); Jev en esos mismos rubros: ${rows.filter((r) => r.jev === r.truth).length} (${pct(rows.filter((r) => r.jev === r.truth).length, rows.length)})`);
  console.log(`Costo: $${cost.toFixed(3)} -> $${(cost / rows.length).toFixed(4)} por rubro, $${(cost / docs.size).toFixed(4)} por club-año`);
  for (const [name, lo, hi] of [['>= 0,95', 0.95, 2], ['0,90-0,95', 0.9, 0.95], ['0,80-0,90', 0.8, 0.9], ['0,60-0,80', 0.6, 0.8], ['< 0,60', -1, 0.6]]) {
    const g = rows.filter((r) => r.confianza >= lo && r.confianza < hi); console.log(`  conf ${name}: ${g.length} rubros, ${pct(g.filter(ok).length, g.length)}`);
  }
  for (const [name, lo, hi] of [['Jev 0,70-0,90', 0.7, 0.9], ['Jev 0,50-0,70', 0.5, 0.7], ['Jev < 0,50', 0, 0.5]]) {
    const g = rows.filter((r) => r.jevConf >= lo && r.jevConf < hi); console.log(`  ${name}: ${g.length} rubros, Claude ${pct(g.filter(ok).length, g.length)}, Jev ${pct(g.filter((r) => r.jev === r.truth).length, g.length)}`);
  }
  const bad = rows.filter((r) => !ok(r));
  console.log(`Errores: ${bad.length} (de convención/catch-all: ${bad.filter((r) => isConventionPair(r.categoria, r.truth)).length}; ${NOT_A_LINE}: ${bad.filter((r) => r.categoria === NOT_A_LINE).length}; lado cambiado: ${bad.filter((r) => r.categoria !== NOT_A_LINE && sideOf(r.categoria) !== r.side).length})`);
}

// ---------------------------------------------------------------------------------------------------------
// LISTOS (producción): <md>.jev.json + <md>.rubros.json -> <md>.categorias.json con el escalón que decidió cada rubro.
async function listos(opt) {
  const ledgerPath = resolve(root, 'Admin', 'transcripciones-estado.jsonl');
  const ledger = readJsonl(ledgerPath);
  // Trabajo = documentos con .rubros.json y .jev.json cuyo .categorias.json falta o se hizo sobre otra lista de rubros u otro .jev.json
  // (huellas, ver tools/huellas.mjs). Y si el .jev.json mismo está desactualizado respecto de la lista de rubros, NO se manda a Claude:
  // primero tiene que rehacerlo Jev (bug real 2026-09-30: 44 documentos, US$ 1,90, categorizados con un .jev.json de la lista vieja).
  // `--lista <archivo>`: solo esos PDFs (lo pasa pipeline.mjs, así la etapa 5b toca SOLO los documentos de la corrida).
  const lista = opt.lista ? leerLista(resolve(root, opt.lista)) : null;
  const rubrosDe = (md) => { try { return JSON.parse(readFileSync(resolve(root, derivado(md, '.rubros.json')), 'utf8')); } catch { return null; } };
  const jevDe = (md) => { try { return JSON.parse(readFileSync(resolve(root, derivado(md, '.jev.json')), 'utf8')); } catch { return null; } };
  let docs = ledger.filter((e) => e.md && e.jev === 'listo-para-jev' && (!lista || lista.has(e.pdf)) && !categoriasAlDia(resolve(root, e.md)));
  const jevViejo = docs.filter((e) => { const rj = rubrosDe(e.md); const jj = jevDe(e.md); return !rj || !jj || jj.rubrosHuella !== huellaRubros(rj); });
  docs = docs.filter((e) => !jevViejo.includes(e));
  if (jevViejo.length) console.log(`${jevViejo.length} documento(s) sin .jev.json al día con su lista de rubros: no se mandan a Claude (primero Jev).`);
  docs = [...new Map(docs.map((e) => [e.md, e])).values()];
  if (opt.limit > 0) docs = docs.slice(0, opt.limit);
  console.log(`${docs.length} documento(s) con Jev hecho y sin categorías finales.${opt.dry ? ' (dry-run)' : ''}`);
  // Versión 319: además de lo cargado en el sitio, lo que Claude ya resolvió antes (tools/memoria-categorias.mjs, Admin/categorias-aprendidas.jsonl,
  // confianza >= 0,80): entra como contexto del club y como ejemplos de otros clubes; producción siempre gana sobre lo aprendido.
  const prod = allLines(); const aprendidas = lineasAprendidas({ produccion: prod });
  const lines = [...prod, ...aprendidas]; const retriever = makeRetriever(lines); const apiKey = opt.dry ? null : readKey(); let cost = 0;
  const aprendidasFirmes = aprendidas.filter((l) => l.conf >= MIN_PRECEDENTE);
  if (aprendidas.length) console.log(`Memoria de categorías: ${aprendidas.length} rubros aprendidos de Claude (${aprendidasFirmes.length} usables como precedente del mismo club).`);
  // Memoria de respuestas (Versión 321, tools/respuestas-cache.mjs): lo que Claude ya contestó para este club y lado no se vuelve a mandar.
  // `--sin-cache` pregunta todo de nuevo.
  const cacheClaude = abrirCache('claude'); let nDesdeCache = 0;
  for (const e of docs) {
    const rj = JSON.parse(readFileSync(resolve(root, derivado(e.md, '.rubros.json')), 'utf8'));
    const jj = JSON.parse(readFileSync(resolve(root, derivado(e.md, '.jev.json')), 'utf8'));
    const jevBy = new Map(jj.rubros.map((r) => [norm(r.label), r]));
    const seen = new Set(); const rubros = [];
    for (const r of rj.rubros) {
      if (seen.has(norm(r.label))) continue; seen.add(norm(r.label));
      const j = jevBy.get(norm(r.label));
      // Escalón 0: precedente de lo CARGADO en el sitio; si no hay, de lo que Claude ya resolvió para este club con >= 0,90 (memoria).
      const ey = { excludeYear: rj.year != null ? String(rj.year) : null };
      // Versión 321: con familia de etiquetas y también para filas sin lado (precedenteFamilia(), arriba).
      const padreFila = padreDe(r.section);
      const precProd = precedenteFamilia(prod, rj.club, r.lado || null, r.label, { ...ey, padre: padreFila });
      // El escalón con contexto va primero: una respuesta de la misma etiqueta Y del mismo renglón que desglosa gana sobre el precedente sin
      // contexto. (Versión 403) Con lo cargado Y lo aprendido: lo cargado ahora también sabe su nota (padres-filas.mjs).
      const conCtx = precedenteFamilia([...prod, ...aprendidasFirmes], rj.club, r.lado || null, r.label, { ...ey, padre: padreFila });
      const prec = conCtx?.via === 'exacto-con-contexto' ? conCtx : (precProd || precedenteFamilia(aprendidasFirmes, rj.club, r.lado || null, r.label, { ...ey, padre: padreFila }));
      const base = { label: r.label, lado: r.lado || null, section: r.section, glosa: r.glosa, page: r.page };
      const guardada = opt.sinCache ? null : cacheClaude.get(rj.club, r.lado, r.label);
      if (prec) rubros.push({ ...base, pendiente: false, ya: prec.cat, escalon: 0, precedenteDe: `${precProd ? 'sitio' : 'memoria-claude'}:${prec.via}` });
      else if (j && j.confidence >= opt.umbral) rubros.push({ ...base, pendiente: false, ya: j.choice, escalon: 1, jevConf: j.confidence });
      // Ya preguntado a Claude antes para este club y lado (tools/respuestas-cache.mjs): misma respuesta, sin pagar. Queda como escalón 2.
      else if (guardada) { rubros.push({ ...base, pendiente: false, ya: guardada.categoria, escalon: 2, confCache: guardada.confianza, motivo: guardada.motivo, jev: j?.choice, jevConf: j?.confidence, desdeCache: true }); nDesdeCache++; }
      else rubros.push({ ...base, pendiente: true, jev: j?.choice, jevConf: j?.confidence });
    }
    const r = await categorizarConClaude({ club: rj.club, year: rj.year, rubros, modelo: opt.modelo, esfuerzo: opt.esfuerzo, contextoClub: !opt.sinClub, lines, retriever, apiKey, dryRun: opt.dry });
    if (opt.dry) { console.log(`  ${e.md}: ${rubros.length} rubros (${rubros.filter((x) => x.escalon === 0).length} por precedente, ${rubros.filter((x) => x.escalon === 1).length} por Jev, ${rubros.filter((x) => x.pendiente).length} a Claude; ~${Math.round(r.promptChars / 4 || 0)} tokens)`); continue; }
    cost += r.costUsd || 0;
    const byIdx = new Map((r.resultados || []).map((x) => [x.idx, x]));
    const out = rubros.map((x, i) => (x.pendiente ? { ...x, escalon: 2, categoria: byIdx.get(i)?.categoria ?? null, confianza: byIdx.get(i)?.confianza ?? null, motivo: byIdx.get(i)?.motivo ?? r.error ?? null } : { ...x, categoria: x.ya, confianza: x.escalon === 0 ? 1 : x.escalon === 2 ? x.confCache : x.jevConf }));
    if (!r.error) for (const x of out) if (x.escalon === 2 && !x.desdeCache && x.categoria) cacheClaude.set(rj.club, x.lado, x.label, { categoria: x.categoria, confianza: x.confianza ?? null, motivo: x.motivo || null, modelo: opt.modelo });
    writeFileSync(resolve(root, derivado(e.md, '.categorias.json')), JSON.stringify({ md: e.md, club: rj.club, year: rj.year, generatedAt: new Date().toISOString(), rubrosHuella: huellaRubros(rj), jevHuella: huellaJev(jj), modelo: opt.modelo, costUsd: r.costUsd, error: r.error, rubros: out }, null, 1));
    // Lo que Claude resolvió con confianza >= 0,80 queda en la memoria para la próxima vez (pedido de Guido).
    const aprendidos = r.error ? 0 : registrarAprendidas({ club: rj.club, year: rj.year, md: e.md, modelo: opt.modelo, rubros: out });
    console.log(`  ${e.md}: ${out.length} rubros; Claude ${out.filter((x) => x.escalon === 2).length} ($${(r.costUsd || 0).toFixed(4)})${aprendidos ? `; ${aprendidos} a la memoria` : ''}${r.error ? ` ERROR ${r.error.slice(0, 120)}` : ''}`);
  }
  if (!opt.dry) console.log(`Costo total: $${cost.toFixed(3)}${nDesdeCache ? ` (${nDesdeCache} rubros sin preguntar: ya estaban en Generados/_cache/claude.jsonl)` : ''}`);
}

// ---------------------------------------------------------------------------------------------------------
// CLI (al final del archivo: las constantes de arriba tienen que existir antes de correr)
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const args = process.argv.slice(2);
  const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
  const opt = {
    limit: flagVal('--limit') !== null ? Number(flagVal('--limit')) : 50,
    lista: flagVal('--lista'),
    modelo: flagVal('--modelo') || DEFAULT_MODEL,
    esfuerzo: flagVal('--esfuerzo') || 'low',
    conc: Number(flagVal('--concurrencia') || 4),
    seed: Number(flagVal('--semilla') || 7),
    umbral: Number(flagVal('--umbral-jev') || 0.9),
    jevJsonl: flagVal('--jev-jsonl') || 'Admin/jev/backtest_lado_ej_otrosclubes.jsonl',
    tag: flagVal('--etiqueta') || '',
    sinClub: args.includes('--sin-club'),
    dry: args.includes('--dry-run'),
    sinCache: args.includes('--sin-cache'),
  };
  if (args.includes('--backtest')) await backtest(opt);
  else if (args.includes('--informe')) informe(opt);
  else if (args.includes('--listos')) await listos(opt);
  else { console.error('Uso: --backtest | --informe | --listos (ver la cabecera del archivo)'); process.exit(1); }
}

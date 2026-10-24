#!/usr/bin/env node
// ============================================================================
// tools/categorizar-claude.mjs — el escalón 2 de la categorización de rubros: lo que Jev no resuelve con
// confianza, se lo pregunta a Claude por API, UNA llamada por documento (club-año) con todos los rubros
// pendientes juntos y el contexto que Jev no puede usar.
//
// Corre en tu terminal, 0 tokens de Claude Code (gasta dólares de API, que es lo aceptado; ver la memoria
// "Scripts y API antes que tokens"). NO escribe nada en data/: solo deja resultados para que otra etapa decida.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «categorizar-claude.mjs».
//
// USO:
//   node tools/categorizar-claude.mjs --backtest --limit 50 --dry-run           # arma los pedidos, estima tokens, no llama
//   node tools/categorizar-claude.mjs --backtest --limit 50                     # calibración: ~50 rubros
//   node tools/categorizar-claude.mjs --backtest --limit 0 --modelo claude-sonnet-5-5
//   node tools/categorizar-claude.mjs --backtest --sin-club --etiqueta _sinclub # variante sin las líneas del club
//   node tools/categorizar-claude.mjs --informe [--etiqueta _x]
//   node tools/categorizar-claude.mjs --listos [--limit 10] [--dry-run] [--lista Admin/mi-piloto.txt]
//   node tools/categorizar-claude.mjs --listos --desde-sesion <respuestas.json> SIN API: la sesión contesta los rubros que quedan para Claude (escalón 2).
//       {"pdf":"<pdf>","respuestas":[{"label":"<etiqueta>","categoria":"<categoria>","confianza":0.9,"motivo":"<una frase>"}]}; el --dry-run dice cuántos rubros faltan
//       contestar. Escalones 0 y 1 y la memoria como siempre; deja el mismo <md>.categorias.json (modelo 'sesión (Claude Code)', costo 0) y registra las aprendidas. Si falta un rubro, no escribe nada.
//   Extras: --modelo (default claude-opus-5-5), --esfuerzo low|medium|high (default low; Haiku no lo usa),
//           --concurrencia 4, --semilla 7, --umbral-jev 0.9, --jev-jsonl <ruta>
// ============================================================================

import { enBatch, FACTOR_BATCH, idBatch, respuestaBatch, anotarEnCola } from './claude-batch.mjs';
import { SESION } from './sesion.mjs'; // gasto por sesión
import { deporteDeClub, MENSAJE_SIN_DEPORTE, categoriasDeDeporte, leerCategorias, deportesConTaxonomia, afinidadDeporte, nombreDeporte } from './deporte-club.mjs'; // lista de categorías, criterios y ejemplos del deporte del club
import { afinidad } from './pais-club.mjs'; // ejemplos del mismo país primero, a igual parecido
import { reglasParaPrompt } from './reglas-categoria.mjs'; // las reglas de categoría de CONVENCIONES-DATOS al prompt
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { mismaFamilia } from './vocabulario.mjs';
import { sinMarca, mismoPadre, padreEnClub } from './padres-filas.mjs'; // en qué nota está cada fila cargada
import {  } from './respuestas-cache.mjs'; // respuestas ya pagadas // familia de etiquetas del precedente
import vm from 'node:vm';
import { archivosData } from './data-clubes.js';
import { backtest, informe } from './categorizar-claude-backtest.mjs';
import { listos } from './categorizar-claude-listos.mjs';
export { isConventionPair } from './categorizar-claude-backtest.mjs';

const root = resolve(import.meta.dirname, '..');
const envPath = resolve(root, 'Admin', 'api-keys', 'claude-api.env');
const costLogPath = resolve(root, 'Admin', 'registros', 'api', 'claude-api.jsonl');
const outDir = resolve(root, 'Admin', 'mediciones', 'backtests', 'categorizar-claude');

// Precios por millón de tokens (skill claude-api, tabla cacheada). La escritura de caché cuesta 1,25x la
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
// el lado de una categoría: las del fútbol primero y después las de los otros deportes (un id compartido tiene el mismo lado en todos)
export const sideOf = (cat) => { for (const d of new Set(['futbol', ...deportesConTaxonomia()])) { const c = catsDe(d); if (c && cat in c.revenue) return 'revenue'; if (c && cat in c.expense) return 'expense'; } return '?'; };
const ALL_CATS = [...Object.keys(CATS.revenue), ...Object.keys(CATS.expense)];
// Las categorías de un deporte: las de SU taxonomía, con etiqueta y comentario completo de su propia lista en data/category-map.js (tools/deporte-club.mjs,
// leerCategorias; el fútbol lee REVENUE_CATEGORIES, el rugby RUGBY_REVENUE_CATEGORIES...). Sin taxonomía del deporte: null, nunca la del fútbol.
const _catsDe = new Map();
export function catsDe(deporte) {
  if (_catsDe.has(deporte)) return _catsDe.get(deporte);
  const C = leerCategorias(deporte); let r = null;
  if (C) r = { revenue: C.revenue, expense: C.expense, todas: [...Object.keys(C.revenue), ...Object.keys(C.expense)] };
  _catsDe.set(deporte, r); return r;
}
const NOT_A_LINE = 'no_es_rubro';

// ---------------------------------------------------------------------------------------------------------
// Datos del sitio: los mismos data/*.js que carga el navegador, en un sandbox de vm (mismo método que jev-categorizar.mjs).
let _data = null;
export function loadClubData() {
  if (_data) return _data;
  const sandbox = { console, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...archivosData()];
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

// Escalón 0 con FAMILIA DE ETIQUETAS (pedido de Guido: "una familia de palabras similares, como la del PSV con dos S o una"; la regla
// está en mismaFamilia() de tools/vocabulario.mjs). Primero el precedente exacto; si no hay, la familia. Devuelve { cat, via } o null.
// MEDIDO contra producción (7.098 líneas cargadas; para cada línea, el precedente sale de los OTROS años del mismo club):
//   - lado conocido:    exacto 4.782 líneas con 99,9% de acierto; la familia resuelve 110 más con 96,4% (Claude >= 0,80 da 94,5% en su backtest).
//   - lado DESCONOCIDO: antes no había precedente (la fila iba entera a Jev/Claude). Ahora: exacto si todas las coincidencias del club son de UN
//     solo lado (4.732 líneas, 99,7%), y si no, familia SIN tolerar el paréntesis final (60 más, 100%). Con la tolerancia bajaba a 91,9%.
// Siempre del MISMO club y con UNA sola categoría entre todas las coincidencias: si el club la cargó distinto en años distintos, no hay precedente.
// ESCALERA DE LA ETAPA 7: precedente exacto CON CONTEXTO (misma etiqueta y mismo renglón que desglosa) -> exacto -> familia ->
// Jev >= 0,90 -> Claude >= 0,80 -> cola. Si la misma etiqueta tiene categorías distintas en el club (sin contexto que las separe), `unico`
// devuelve null y se baja al escalón siguiente: el precedente nunca elige entre dos respuestas distintas.
export function precedenteFamilia(lines, club, side, label, { excludeYear = null, padre = null } = {}) {
  const delClub = lines.filter((l) => l.club === club && l.year !== excludeYear && (!side || l.side === side));
  const unico = (arr) => { const cats = new Set(arr.map((l) => l.cat)); const lados = new Set(arr.map((l) => l.side)); return cats.size === 1 && lados.size === 1 ? [...cats][0] : null; };
  const nl = norm(label);
  // (cambios A y B de la auditoría del pipeline) Con el padre (la nota) de la fila:
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
    const qw = words(q.label); const scored = []; const admite = categoriasDeDeporte(q.deporte || deporteDeClub(q.club))?.todas; // solo ejemplos cuya categoría existe en la taxonomía del deporte del club (ingreso + gasto)
    for (const b of bank) {
      if (admite && !admite.has(b.cat)) continue;
      if (b.club === q.club) continue; // el mismo club va aparte (contexto del club), con sus propias exclusiones
      if (q.side && b.side !== q.side) continue;
      const s = jaccard(qw, b.w); if (s > 0) scored.push([s, b]);
    }
    // a igual parecido de palabras: primero los del mismo deporte, después los del mismo país, después los del mismo idioma
    scored.sort((a, b) => (b[0] - a[0] > 1e-12 || a[0] - b[0] > 1e-12) ? b[0] - a[0] : (afinidadDeporte(q.club, b[1].club) - afinidadDeporte(q.club, a[1].club)) || (afinidad(q.club, b[1].club) - afinidad(q.club, a[1].club)));
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

// Las reglas de categoría que salieron de una votación o de una decisión de Guido (líneas «CATEGORÍA (prompt):» de Admin/CONVENCIONES-DATOS.md). Mandan sobre los criterios de arriba.
// las reglas sin deporte van a todos; las marcadas `CATEGORÍA (prompt, <deporte>)`, solo al prompt de ese deporte
const reglasDecididas = (deporte) => { const r = reglasParaPrompt(deporte); return r.length ? `\n\nREGLAS YA DECIDIDAS (votaciones y decisiones de Guido; mandan sobre los criterios de arriba):\n${r.join('\n')}` : ''; };

// Los criterios son del fútbol. Otro deporte recibe solo lo que no depende del deporte (la convención del club y qué no es una línea) hasta que
// alguien escriba los suyos: sin criterios propios el prompt lo dice, no aplica los del fútbol.
function criteriosDe(deporte) {
  if (deporte === 'futbol') return CRITERIOS;
  const l = CRITERIOS.split('\n');
  return [l[0], l[1], l.at(-1), `- Los criterios de categoría de ${nombreDeporte(deporte)} todavía no están escritos: guiate por las categorías de arriba, por las REGLAS YA DECIDIDAS y por las líneas ya cargadas del club.`].join('\n');
}

export function systemPrompt(deporte = 'futbol') {
  const C = catsDe(deporte); if (!C) return null;
  const fmt = (side, name) => Object.entries(C[side]).map(([k, v]) => `- ${k} [${name}] ${v.label}${v.desc ? ` — ${v.desc}` : ''}`).join('\n');
  return `Categorizás rubros de estados financieros de clubes de ${nombreDeporte(deporte)} para el sitio financeofsports.com. Cada rubro va a UNA categoría del sitio.

CATEGORÍAS DE INGRESOS:
${fmt('revenue', 'INGRESO')}

CATEGORÍAS DE GASTOS:
${fmt('expense', 'GASTO')}

${criteriosDe(deporte)}${reglasDecididas(deporte)}

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

const schemaDe = (todas) => ({
  type: 'object',
  properties: {
    rubros: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          categoria: { type: 'string', enum: [...todas, NOT_A_LINE] },
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
});

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
async function callClaude({ apiKey, model, effort, system, user, schema, maxTokens = 12000 }) {
  const body = { model, max_tokens: maxTokens, system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }], output_config: { format: { type: 'json_schema', schema } } };
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' };
  if (model !== 'claude-haiku-4-5') { body.output_config.effort = effort; }
  if (model === 'claude-opus-5-5' || model === 'claude-sonnet-5-5') { body.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; }
  // MODO BATCH (tools/claude-batch.mjs): la respuesta de este pedido, si ya volvió de la Batch API; si no, se anota y queda pendiente.
  if (enBatch()) {
    const id = idBatch(body); const rb = respuestaBatch(id);
    if (rb?.error) return { error: `Batch API: ${rb.error}` };
    if (!rb?.mensaje) { anotarEnCola(id, body, 'categorizar', null); return { pendiente: true }; }
    const j = rb.mensaje;
    if (j.stop_reason === 'refusal') return { error: `refusal: ${JSON.stringify(j.stop_details)}`, usage: j.usage, model: j.model, batch: true };
    const text = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
    let parsed = null; try { parsed = JSON.parse(text); } catch { return { error: `JSON inválido (stop=${j.stop_reason}): ${text.slice(0, 200)}`, usage: j.usage, model: j.model, batch: true }; }
    return { parsed, usage: j.usage, model: j.model, stopReason: j.stop_reason, batch: true };
  }
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
export async function categorizarConClaude({ club, year = null, rubros, modelo = DEFAULT_MODEL, esfuerzo = 'low', contextoClub = true, excludeYear = null, excludeLabels = null, ejemplos = true, apiKey = null, dryRun = false, lines = null, retriever = null, deporte: deporteDado = null }) {
  lines ||= allLines();
  const rs = rubros.map((r) => ({ pendiente: true, ...r }));
  const pend = rs.filter((r) => r.pendiente);
  if (!pend.length) return { resultados: [], costUsd: 0 };
  const exclude = excludeLabels || new Set(pend.map((r) => `${r.lado}|${norm(r.label)}`));
  const conventions = contextoClub ? clubConventions(lines, club, { excludeYear: excludeYear ?? (year != null ? String(year) : null), excludeLabels: exclude, pendingLabels: pend.map((r) => r.glosa || r.label) }) : null;
  retriever ||= makeRetriever(lines);
  // el deporte del documento lo da quien llama (ficha o registro de altas); sin él, el de la ficha del club; sin ninguno no se categoriza (no se supone fútbol)
  const deporte = deporteDado || deporteDeClub(club);
  if (!deporte) return { resultados: [], error: MENSAJE_SIN_DEPORTE(club), costUsd: 0 };
  const examplesFor = ejemplos ? (r) => retriever({ label: r.glosa && r.glosa !== r.label ? `${r.label} ${r.glosa}` : r.label, club, deporte, side: r.lado }) : null;
  const system = systemPrompt(deporte);
  if (!system) return { resultados: [], error: `el deporte «${deporte}» no tiene taxonomía en data/category-map.js (SPORT_TAXONOMIES): no se categoriza`, costUsd: 0 };
  const { text, ids } = userMessage({ club, year, rubros: rs, conventions, examplesFor });
  if (dryRun) return { resultados: [], costUsd: 0, promptChars: system.length + text.length, userChars: text.length, systemChars: system.length, user: text };
  const t0 = Date.now();
  const r = await callClaude({ apiKey: apiKey || readKey(), model: modelo, effort: esfuerzo, system, user: text, schema: schemaDe(catsDe(deporte).todas) });
  if (r.pendiente) return { resultados: [], pendiente: true, costUsd: 0, model: modelo };
  const costUsd = costOf(modelo, r.usage) * (r.batch ? FACTOR_BATCH : 1);
  if (!r.batch) appendFileSync(costLogPath, JSON.stringify({ ts: new Date().toISOString(), sesion: SESION, tarea: 'categorizar', club, year, model: r.model || modelo, promptTokenCount: (r.usage?.input_tokens || 0) + (r.usage?.cache_creation_input_tokens || 0) + (r.usage?.cache_read_input_tokens || 0), cacheReadTokens: r.usage?.cache_read_input_tokens || 0, candidatesTokenCount: r.usage?.output_tokens || 0, costUsd: Number(costUsd.toFixed(6)), elapsedMs: Date.now() - t0, stopReason: r.stopReason || null, rubros: ids.length, error: r.error || undefined }) + '\n');
  if (r.error) return { resultados: [], error: r.error, usage: r.usage, costUsd, model: modelo };
  const byId = new Map((r.parsed.rubros || []).map((x) => [x.id, x]));
  const resultados = ids.map((i, n) => { const x = byId.get(n + 1); return { idx: i, label: rs[i].label, lado: rs[i].lado, categoria: x?.categoria ?? null, confianza: x?.confianza ?? null, motivo: x?.motivo ?? (x ? '' : 'sin respuesta para este id') }; });
  return { resultados, usage: r.usage, costUsd, model: r.model || modelo };
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
    jevJsonl: flagVal('--jev-jsonl') || 'Admin/mediciones/backtests/jev/backtest_lado_ej_otrosclubes.jsonl',
    tag: flagVal('--etiqueta') || '',
    sinClub: args.includes('--sin-club'),
    dry: args.includes('--dry-run'),
    sinCache: args.includes('--sin-cache'),
    desdeSesion: flagVal('--desde-sesion'),
  };
  if (args.includes('--backtest')) await backtest(opt);
  else if (args.includes('--informe')) informe(opt);
  else if (args.includes('--listos')) await listos(opt);
  else { console.error('Uso: --backtest | --informe | --listos (ver la cabecera del archivo)'); process.exit(1); }
}

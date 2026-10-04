// ============================================================================
// tools/alta-claude.mjs — Claude por API contesta las PREGUNTAS DEL ALTA de un club (las que
// tools/alta-club.mjs deja en estado `pregunta`), leyendo el propio documento, y el SCRIPT verifica
// que cada respuesta venga con una CITA TEXTUAL que existe de verdad en esa página del `.md`.
//
// POR QUÉ EXISTE (2026-09-30): de 141 clubes nuevos con `.md`, ~86 quedaban frenados por al menos una
// `pregunta` (perímetro, tipo de documento, cierre, deporte, tipo de cambio). Criterio de Guido: "no
// mandarle a un club algo que se responde leyendo la prosa del propio documento". Muchas de esas
// preguntas se contestan leyendo la portada, la nota de "bases de preparación" o el dictamen del
// auditor, que es trabajo de lectura, no de criterio. Esto lo hace Claude por API (dólares, no tokens
// de sesión) y el script NO le cree: solo da una pregunta por resuelta si
//   1. Claude dice que el documento la responde (`el_documento_lo_responde: true`),
//   2. con confianza >= 0,80 (mismo umbral que categorizar-claude.mjs),
//   3. y TODAS sus citas existen literalmente en la página que dice (espacios, `|`, `*`, `#` y `_`
//      normalizados: una tabla Markdown no puede hacer fallar una cita bien copiada), con al menos una
//      cita de 12+ caracteres. Una cita inventada o de otra página invalida la respuesta entera.
//   4. y pasa el chequeo propio del tipo de pregunta (abajo, CHEQUEOS): el nombre legal tiene que
//      aparecer en la cita; el tipo de cambio tiene que estar impreso en la cita (o su inverso, en
//      monedas casi a la par del dólar); la fecha de cierre tiene que ser un fin de mes; el valor
//      tiene que ser uno de los permitidos.
// Lo que no pasa queda como pregunta abierta y es candidato a `Admin/dudas-por-club.md` (la salida
// `--dudas` de alta-club.mjs lista qué páginas se revisaron, para que Guido decida). Este módulo NO
// escribe en dudas-por-club.md.
//
// QUÉ PREGUNTAS SE MANDAN (tipo -> de qué campos de alta-club.mjs sale):
//   perimetro   <- perimetro                     ¿individual o consolidado? (con el criterio del proyecto)
//   reportType  <- reportType                    ¿estado contable anual, presupuesto, intermedio, no cargable?
//   cierre      <- anio, cierre, fiscalYearStart ¿fecha de cierre del ejercicio que presenta el documento?
//   moneda      <- currency, reportingCurrency   ¿en qué moneda están los importes?
//   fx          <- fx                            ¿qué tipo de cambio de CIERRE a USD declara el documento?
//   sport       <- sport                         ¿de qué deporte es el club?
//   name        <- name (cuando quedó `pendiente`, típico en griego/cirílico/coreano)   nombre legal
// Y qué NO se manda, a propósito: id / country (Escocia, renombrar un id heredado), liga (no está en
// el documento), brandColor. Son decisiones de producto o datos externos, no lectura.
// Hay además respuestas que resuelven el HECHO pero no la pregunta, porque la pregunta tiene una parte
// de producto: un deporte que no es fútbol (¿entra al sitio?) o una moneda anterior al euro (¿se
// convierte?) quedan abiertas aunque Claude conteste bien; se guarda igual lo que dijo, con su cita.
//
// FRAGMENTOS: el `.md` se parte por las marcas de página ("--- pág. N ---", o "## Página N" en las
// transcripciones viejas). Si entero pesa <= 45.000 caracteres va entero; si no, van las 3 primeras
// páginas (portada, índice, nombre legal) + para cada pregunta las 4 páginas con más palabras clave
// de su tema (consolidado/individual, fechas de fin de mes, tipo de cambio, dictamen...), hasta
// ~45.000 caracteres (~12.000 tokens en alfabeto latino). Cada página va con su marca, así Claude
// puede citarla.
//
// MODELO: claude-opus-5-5 (default de la skill claude-api), effort `low` (es lectura, no razonamiento
// largo), salida JSON estricta (`output_config.format` json_schema), system prompt cacheado,
// `fallbacks: "default"`. HTTP sin SDK, como categorizar-claude.mjs. Costo registrado en
// Admin/claude-api/resultados.jsonl con `tarea: "alta-club"` (sin campo `md`, igual que "categorizar":
// inventario-transcripciones.mjs cuenta como "pagado" cualquier línea con `md`).
// Números medidos: ver Admin/tests/test-altas-claude.md.
// ============================================================================

import { readFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readKey, costOf } from './categorizar-claude.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const COST_LOG = resolve(ROOT, 'Admin', 'claude-api', 'resultados.jsonl');
export const MODELO_DEFAULT = 'claude-opus-5-5';
export const UMBRAL_CONFIANZA = 0.8;
const PRESUPUESTO_CHARS = 45000;
const TOPE_PAGINA = 12000;

const norm = (s) => String(s || '').toLowerCase().replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/ı/g, 'i').replace(/ł/g, 'l').replace(/đ/g, 'd').normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');

// ---------------------------------------------------------------------------- páginas
// Devuelve [{ n, texto }]. Sin marcas de página, una sola "página" 0 con todo el documento (la cita se
// verifica entonces contra el documento entero, y así queda dicho en el registro).
const MARCA = /^(?:-{3}\s*p[áa]g(?:ina|\.)?\s*(\d+)\b[^\n]*?-{3}\s*|#{1,4}\s*p[áa]gina\s+(\d+)\b[^\n]*)$/gim;
export function paginas(md) {
  const out = []; let last = null; let m;
  MARCA.lastIndex = 0;
  while ((m = MARCA.exec(md))) {
    if (last) last.texto = md.slice(last.desde, m.index);
    last = { n: Number(m[1] || m[2]), desde: m.index + m[0].length };
    out.push(last);
  }
  if (!out.length) return [{ n: 0, texto: md }];
  last.texto = md.slice(last.desde);
  // Páginas repetidas (una transcripción que marca "pág. 3" dos veces): se juntan.
  const por = new Map();
  for (const p of out) por.set(p.n, (por.get(p.n) ? por.get(p.n) + '\n' : '') + p.texto);
  return [...por.entries()].map(([n, texto]) => ({ n, texto }));
}

// ---------------------------------------------------------------------------- palabras clave por tema
const TEMAS = {
  perimetro: /consolidad|consolidated|consolidato|geconsolideerd|konsolid|konzern|konsern|koncern|консолид|консолідов|ενοποιημεν|연결|合并|individual|separate financial|company only|enkelvoudig|morselskab|moderselskab|morselskap|einzelabschluss|subsidiar|filial|dattersel|tochterges|controlad|participac|basis of preparation|bases de (preparacion|presentacion)|grundlag|group structure|grupo economico/g,
  reportType: /indice|contents|inhoud|indhold|inhalt|sumario|sommario|statement of|estado de|balance|bilan|bilancio|jahresabschluss|aarsrapport|arsredovisning|interim|semestr|trimestr|budget|presupuesto|orcamento|annual report|memoria/g,
  cierre: /(?<![0-9])(28|29|30|31)[ .\/-]|financial year|ejercicio|exercicio|esercizio|geschaftsjahr|regnskabsar|regnskapsar|boekjaar|year ended|periodo|period ended|al 3[01]|em 3[01]/g,
  moneda: /moneda|currency|valuta|wahrung|devise|presentation currency|moneda funcional|functional currency|en miles|thousands|t\.kr|tkr|€|£|\$|₩|₺|грн|руб/g,
  fx: /tipo de cambio|taxa de cambio|exchange rate|wechselkurs|valutakurs|wisselkoers|tasso di cambio|taux de change|kurs|kurz|tecaj|doviz|курс|ισοτιμ|환율|汇率|usd|dollar|dolar/g,
  sport: /football|futbol|futebol|calcio|fodbold|fotball|voetbal|fussball|rugby|cricket|formula|grand prix|nfl|basketball/g,
  name: /independent auditor|auditor.s report|informe de auditor|dictamen|revisionspategning|revisjonsberetning|bestatigungsvermerk|relazione della societa di revisione|controleverklaring|registered|company number|cvr|org\.? ?nr|domicilio|sede|a\/s|s\.a\.|s\.p\.a|gmbh|plc|limited|n\.v\.|asa|a\.s\.|d\.d\.|παε|ооо|тов|пат/g,
};

// Elige las páginas a mandar. `tipos`: los tipos de pregunta de esta llamada.
export function elegirPaginas(md, tipos) {
  const pags = paginas(md);
  const total = pags.reduce((s, p) => s + p.texto.length, 0);
  if (total <= PRESUPUESTO_CHARS) return { pags, elegidas: pags.map((p) => p.n), entero: true };
  const elegidas = new Set(pags.slice(0, 3).map((p) => p.n));
  const tam = (n) => Math.min(TOPE_PAGINA, (pags.find((p) => p.n === n) || { texto: '' }).texto.length);
  let usado = [...elegidas].reduce((s, n) => s + tam(n), 0);
  const normPags = pags.map((p) => ({ n: p.n, t: norm(p.texto) }));
  // Ronda por pregunta: la mejor página de cada tema primero, después la segunda, etc. (así una pregunta
  // con muchas páginas candidatas no se come el presupuesto de las demás).
  const rankings = tipos.map((tipo) => normPags.map((p) => ({ n: p.n, s: (p.t.match(TEMAS[tipo] || /$^/g) || []).length })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 4));
  for (let r = 0; r < 4; r++) {
    for (const rk of rankings) {
      const c = rk[r]; if (!c || elegidas.has(c.n)) continue;
      if (usado + tam(c.n) > PRESUPUESTO_CHARS) continue;
      elegidas.add(c.n); usado += tam(c.n);
    }
  }
  return { pags, elegidas: [...elegidas].sort((a, b) => a - b), entero: false };
}

// ---------------------------------------------------------------------------- verificación de citas
const normCita = (s) => norm(String(s || '').replace(/[|*#_`>]/g, ' ').replace(/[“”«»„]/g, '"').replace(/[‘’]/g, "'").replace(/[‐‑‒–—]/g, '-')).replace(/\s+/g, ' ').trim();
export function citaVerificada(pags, cita) {
  const t = normCita(cita.texto);
  if (t.length < 12) return { ok: false, motivo: 'cita de menos de 12 caracteres' };
  const p = pags.find((x) => x.n === cita.pagina) || (pags.length === 1 && pags[0].n === 0 ? pags[0] : null);
  if (!p) return { ok: false, motivo: `no existe la página ${cita.pagina}` };
  if (normCita(p.texto).includes(t)) return { ok: true };
  // ¿Está en otra página? (se informa, pero NO cuenta: la página es parte de la cita)
  const otra = pags.find((x) => x !== p && normCita(x.texto).includes(t));
  return { ok: false, motivo: otra ? `el texto existe pero en la pág. ${otra.n}, no en la ${cita.pagina}` : 'el texto no existe en el .md' };
}

// Números impresos en un texto, en cualquier formato (1.234,56 / 1,234.56 / 6,2573).
function numeros(s) {
  const out = [];
  for (const m of String(s).matchAll(/\d{1,3}(?:[.,\s]\d{3})*(?:[.,]\d+)?|\d+(?:[.,]\d+)?/g)) {
    let x = m[0].replace(/\s/g, ''); const c = x.lastIndexOf(','); const d = x.lastIndexOf('.');
    if (c !== -1 && d !== -1) x = c > d ? x.replace(/\./g, '').replace(',', '.') : x.replace(/,/g, '');
    else if (c !== -1) x = /,\d{3}$/.test(x) && x.length > 5 ? x.replace(/,/g, '') : x.replace(',', '.');
    const n = parseFloat(x); if (!Number.isNaN(n)) out.push(n);
  }
  return out;
}

// Chequeos propios de cada tipo (además de la cita). Devuelven null si pasa, o el motivo si no.
const VALORES = {
  // "otra_entidad" (agregado tras la primera corrida real: Sarpsborg 08, cuyo documento base es de "Sarpsborg
  // Fotball Invest AS", un vehículo inversor; Claude lo dijo en la prosa pero tuvo que elegir "individual").
  perimetro: ['individual', 'consolidado', 'otra_entidad'],
  reportType: ['official_balance_sheet', 'official_budget', 'interim', 'no_cargable'],
  sport: ['futbol', 'rugby', 'cricket', 'f1', 'nfl', 'basquet', 'otro'],
};
export function chequeoTipo(tipo, valor, citasTexto, ctx = {}) {
  const v = String(valor || '').trim();
  if (!v) return 'sin valor';
  if (VALORES[tipo] && !VALORES[tipo].includes(v)) return `valor fuera de lo permitido (${VALORES[tipo].join('/')})`;
  if (tipo === 'cierre') {
    const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/); if (!m) return 'la fecha no es AAAA-MM-DD';
    const ult = new Date(Date.UTC(+m[1], +m[2], 0)).getUTCDate();
    if (+m[3] !== ult) return 'la fecha de cierre no es un fin de mes';
  }
  if (tipo === 'moneda' && !/^[A-Z]{3}$/.test(v)) return 'la moneda no es un código ISO de 3 letras';
  if (tipo === 'name') {
    const n = normCita(v); if (n.length < 4) return 'nombre demasiado corto';
    if (!citasTexto.some((c) => normCita(c).includes(n))) return 'el nombre no aparece tal cual en ninguna cita';
  }
  if (tipo === 'fx') {
    const x = Number(v.replace(',', '.')); if (!(x > 0)) return 'el tipo de cambio no es un número';
    if (ctx.rango && (x < ctx.rango[0] || x > ctx.rango[1])) return `fuera del rango plausible de ${ctx.moneda} [${ctx.rango.join(', ')}]`;
    const impresos = citasTexto.flatMap(numeros);
    const ok = impresos.some((n) => Math.abs(n / x - 1) < 0.005 || (ctx.aLaPar && Math.abs((1 / n) / x - 1) < 0.005));
    if (!ok) return 'el número no está impreso en la cita (ni su inverso, en monedas casi a la par)';
  }
  return null;
}

// ---------------------------------------------------------------------------- prompt
const SYSTEM = `Sos un lector de estados contables de clubes deportivos para el sitio financeofsports.com. Te paso fragmentos de UN documento (transcripción a Markdown de un PDF, con marcas "--- pág. N ---") y una lista de preguntas. Para cada pregunta devolvé:
- valor: la respuesta normalizada (formato de abajo), o "" si el documento no alcanza para contestarla.
- respuesta: una o dos frases en español con el porqué.
- confianza: 0 a 1. Usá >= 0.8 solo si el documento lo dice de forma explícita, no si lo inferís.
- el_documento_lo_responde: true solo si el texto que te pasé contesta la pregunta.
- citas: 1 o 2 fragmentos COPIADOS LITERALMENTE del documento (carácter por carácter, en el idioma original, sin traducir, sin "..." y sin juntar pedazos de lugares distintos; entre 20 y 200 caracteres), cada uno con el número de página de la marca "--- pág. N ---" bajo la que aparece. Un script verifica que cada cita exista textualmente en esa página: una cita parafraseada, traducida o de otra página invalida tu respuesta. Si no podés citar, dejá citas vacío y el_documento_lo_responde en false.

Formatos de valor por tipo de pregunta:
- perimetro: "individual", "consolidado" u "otra_entidad". Qué estados carga el sitio como "el club". Criterio del proyecto: la entidad INDIVIDUAL del club (la sociedad o asociación que juega), no el grupo, porque el consolidado puede sumar negocios no futbolísticos de subsidiarias. Excepción: si el documento SOLO trae estados consolidados (no hay columna ni estados individuales), el valor es "consolidado"; y si el fútbol profesional está en una subsidiaria, "consolidado". Si el documento es de una sociedad que NO es el club que juega (un vehículo inversor en derechos de jugadores, el dueño del estadio, una holding sin el fútbol), el valor es "otra_entidad". Citá el pasaje que muestra qué estados trae el documento (encabezado de columnas "Koncern / Moderselskab", "Consolidated / Company", título "Estados financieros consolidados", nota de bases de preparación).
- reportType: "official_balance_sheet" (estados contables ANUALES con estado de resultados y/o balance con cifras), "official_budget" (presupuesto), "interim" (intermedio: semestral, trimestral, seis meses), "no_cargable" (dictamen, acta, memoria o informe que no trae los estados con cifras).
- cierre: fecha de cierre del ejercicio que presenta el documento (el más reciente, no el comparativo), "AAAA-MM-DD".
- moneda: código ISO 4217 de la moneda en que están expresados los importes ("EUR", "DEM", "NOK"...).
- fx: el tipo de cambio de CIERRE del ejercicio contra el dólar estadounidense que DECLARA el propio documento, expresado como unidades de la moneda local por 1 USD (ej. "6.5342" para CNY). Si el documento lo imprime al revés (USD por 1 unidad local, típico en EUR/GBP/CHF), invertilo en valor pero citá el número tal como está impreso. Sin tipo de cambio de cierre declarado: "".
- sport: "futbol", "rugby", "cricket", "f1", "nfl", "basquet" u "otro": el deporte principal del club o equipo.
- name: el nombre legal completo de la entidad que emite los estados, con su forma societaria, exactamente como aparece impreso (tiene que aparecer literalmente en tu cita). Si el documento lo imprime también en alfabeto latino (versión en inglés, transliteración impresa), usá esa forma; si solo aparece en otro alfabeto, copialo tal cual.

Contestá TODAS las preguntas, una entrada por id, en el mismo orden.`;

const SCHEMA = {
  type: 'object',
  properties: {
    respuestas: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          valor: { type: 'string' },
          respuesta: { type: 'string' },
          confianza: { type: 'number' },
          el_documento_lo_responde: { type: 'boolean' },
          citas: { type: 'array', items: { type: 'object', properties: { pagina: { type: 'integer' }, texto: { type: 'string' } }, required: ['pagina', 'texto'], additionalProperties: false } },
        },
        required: ['id', 'valor', 'respuesta', 'confianza', 'el_documento_lo_responde', 'citas'],
        additionalProperties: false,
      },
    },
  },
  required: ['respuestas'],
  additionalProperties: false,
};

async function llamar({ apiKey, model, effort, user }) {
  const body = { model, max_tokens: 16000, system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }], output_config: { format: { type: 'json_schema', schema: SCHEMA } } };
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' };
  if (model !== 'claude-haiku-4-5') body.output_config.effort = effort;
  if (model === 'claude-opus-5-5' || model === 'claude-sonnet-5-5') { body.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; }
  let lastErr = null;
  for (let intento = 0; intento < 5; intento++) {
    let res;
    try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body) }); }
    catch (e) { lastErr = String(e); await new Promise((r) => setTimeout(r, 2000 * (intento + 1))); continue; }
    if (res.ok) {
      const j = await res.json();
      if (j.stop_reason === 'refusal') return { error: `refusal: ${JSON.stringify(j.stop_details)}`, usage: j.usage, model: j.model };
      const text = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
      try { return { parsed: JSON.parse(text), usage: j.usage, model: j.model, stopReason: j.stop_reason }; }
      catch { return { error: `JSON inválido (stop=${j.stop_reason}): ${text.slice(0, 200)}`, usage: j.usage, model: j.model }; }
    }
    lastErr = `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`;
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 4000 * (intento + 1))); continue; }
    return { error: lastErr };
  }
  return { error: lastErr || 'reintentos agotados' };
}

// ---------------------------------------------------------------------------- LA FUNCIÓN EXPORTADA
// preguntas: [{ id, tipo, texto, contexto? }]  (id único en la llamada; tipo = una clave de TEMAS)
// ctx: { carpeta, documento, pais, anio, moneda, rango, aLaPar }  (para el encabezado y los chequeos de fx)
// Devuelve { respuestas: [{ id, tipo, valor, respuesta, confianza, citas:[{pagina,texto,ok,motivo}], resuelta, motivoNoResuelta }],
//            paginasEnviadas, entero, costUsd, model, usage, error? }
export async function preguntarAClaude({ md, preguntas, ctx = {}, modelo = MODELO_DEFAULT, esfuerzo = 'low', apiKey = null, dryRun = false, tarea = 'alta-club' }) {
  const tipos = [...new Set(preguntas.map((p) => p.tipo))];
  const { pags, elegidas, entero } = elegirPaginas(md, tipos);
  const cuerpo = pags.filter((p) => elegidas.includes(p.n)).map((p) => `--- pág. ${p.n} ---\n${p.texto.length > TOPE_PAGINA ? p.texto.slice(0, TOPE_PAGINA) + '\n[... página recortada ...]' : p.texto.trim()}`).join('\n\n');
  const user = `Club (carpeta del proyecto): ${ctx.carpeta || '?'} — país: ${ctx.pais || '?'}\nDocumento: ${ctx.documento || '?'}${ctx.anio ? ` (el nombre del archivo sugiere el ejercicio ${ctx.anio})` : ''}\n${entero ? 'Te paso el documento ENTERO.' : `Te paso ${elegidas.length} de ${pags.length} páginas (las primeras y las que tratan cada tema).`}\n\nPREGUNTAS:\n${preguntas.map((p) => `- id "${p.id}" (tipo ${p.tipo}): ${p.texto}${p.contexto ? `\n  Lo que detectó el script: ${p.contexto}` : ''}`).join('\n')}\n\nDOCUMENTO:\n${cuerpo}`;
  if (dryRun) return { respuestas: [], paginasEnviadas: elegidas, entero, chars: user.length + SYSTEM.length, costUsd: 0 };
  const t0 = Date.now();
  const r = await llamar({ apiKey: apiKey || readKey(), model: modelo, effort: esfuerzo, user });
  const costUsd = costOf(modelo, r.usage || {});
  appendFileSync(COST_LOG, JSON.stringify({ ts: new Date().toISOString(), tarea, club: ctx.carpeta || null, year: ctx.anio || null, model: r.model || modelo, promptTokenCount: (r.usage?.input_tokens || 0) + (r.usage?.cache_creation_input_tokens || 0) + (r.usage?.cache_read_input_tokens || 0), cacheReadTokens: r.usage?.cache_read_input_tokens || 0, candidatesTokenCount: r.usage?.output_tokens || 0, costUsd: Number(costUsd.toFixed(6)), elapsedMs: Date.now() - t0, stopReason: r.stopReason || null, preguntas: preguntas.length, error: r.error || undefined }) + '\n');
  if (r.error) return { respuestas: [], paginasEnviadas: elegidas, entero, costUsd, model: modelo, error: r.error };
  const porId = new Map((r.parsed.respuestas || []).map((x) => [x.id, x]));
  const respuestas = preguntas.map((p) => {
    const x = porId.get(p.id);
    if (!x) return { id: p.id, tipo: p.tipo, valor: null, respuesta: null, confianza: 0, citas: [], resuelta: false, motivoNoResuelta: 'Claude no contestó esta pregunta' };
    const citas = (x.citas || []).map((c) => ({ pagina: c.pagina, texto: c.texto, ...citaVerificada(pags, c) }));
    let motivo = null;
    if (!x.el_documento_lo_responde) motivo = 'Claude dice que el documento no la responde';
    else if (!(x.confianza >= UMBRAL_CONFIANZA)) motivo = `confianza ${x.confianza} < ${UMBRAL_CONFIANZA}`;
    else if (!citas.length) motivo = 'sin cita';
    else if (citas.some((c) => !c.ok)) motivo = `cita no verificada: ${citas.filter((c) => !c.ok).map((c) => c.motivo).join('; ')}`;
    else motivo = chequeoTipo(p.tipo, x.valor, citas.map((c) => c.texto), { ...ctx, ...(p.ctxFx || {}) });
    return { id: p.id, tipo: p.tipo, valor: x.valor, respuesta: x.respuesta, confianza: x.confianza, citas, resuelta: !motivo, motivoNoResuelta: motivo };
  });
  return { respuestas, paginasEnviadas: elegidas, entero, costUsd, model: r.model || modelo, usage: r.usage };
}

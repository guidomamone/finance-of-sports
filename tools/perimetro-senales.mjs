// ============================================================================
// tools/perimetro-senales.mjs — PROPUESTA DE PERÍMETRO (individual o consolidado) para un documento, con señales y voto.
//
// POR QUÉ (2026-10-06, lote 14, los 12 clubes italianos nuevos). tools/antes-de-localizar.mjs frena todo documento que trae estados
// consolidados y cuyo club no tiene años cargados, y pide un ajuste `perimetro` sin decir cuál. El detector de alta-club.mjs CUENTA
// MENCIONES de "consolidato": 5 de 12 clubes frenaron por un falso positivo (Torino, Sassuolo, Monza, Napoli, Sampdoria: las menciones
// son del grupo dueño del club, no un estado del club). Y donde el documento trae los dos, nadie le dice a Guido cuál conviene.
//
// DÓNDE SE USA (Versión 561, aprobado por Guido el 2026-10-06): lote.mjs y antes-de-localizar.mjs llaman a fijarPerimetroDeClubes() (abajo)
// antes de la compuerta del perímetro. Medido contra Admin/tests/perimetro-verdad.tsv: 77 bien, 0 mal, 23 sin decidir. Cualquier cambio acá
// se mide otra vez con esa verdad (--verdad ... --jev) y tiene que seguir en 0 mal.
//
// LA ESCALERA (solo propone; lo que no se decide va a la cola humana):
//
//  PASO A (gratis)  ¿Qué estados trae el documento COMO TABLA? Cada fila de tabla con el total de ingresos ("Totale valore della
//                   produzione", "Totale ricavi", "Total revenue"...) se etiqueta con el título más cercano hacia arriba que nombra un
//                   perímetro (CONSOLIDADO: "bilancio consolidato", "conto economico gruppo X"...; INDIVIDUAL: "bilancio d'esercizio",
//                   "separato", "individual"...). Títulos sin perímetro ("Fatti di rilievo...") se saltean.
//                     solo tablas consolidadas, y ningún título individual de estado en el documento → consolidado
//                     solo tablas individuales (o sin etiqueta), y ningún título consolidado de estado     → individual
//                     sin tablas de total de ingresos                                                       → cola
//                     tablas de los dos                                                                     → PASO B
//                     (un título del otro perímetro sin su tabla —por ejemplo la tabla no se reconoció— → cola, no decide)
//  PASO B (voto)    Tres criterios, uno por voto:
//                     C1 (gratis) los ingresos consolidados superan a los individuales en 5% o más, en el año o en el anterior
//                        (las controladas tienen negocio propio: Roma, Lazio). Escala: miles vs unidades se normaliza.
//                     C2 (gratis) el individual crece 15 puntos o más distinto que el consolidado (fusión de controladas: Milan 2023-24)
//                     C3 (Jev)    ¿alguna controlada consolidada hace negocio del fútbol del club (sponsors, medios, merchandising,
//                                 marketing, entradas, estadio)? Se le pasa el texto del área de consolidación / controladas.
//                   2 o 3 votos → consolidado · 0 → individual · 1 → cola.
//
// USO:
//   node tools/perimetro-senales.mjs --verdad Admin/tests/perimetro-verdad.tsv          # ensayo: pasos A y B sin Jev (C3 = "?")
//   node tools/perimetro-senales.mjs --verdad Admin/tests/perimetro-verdad.tsv --jev    # con Jev (~US$ 0,0001 por documento)
//   node tools/perimetro-senales.mjs --lista Admin/lote-NN.txt [--jev]                  # sin verdad: solo la propuesta
//   node tools/perimetro-senales.mjs --md "Clubes/Italia/AC Milan/x.md" --detalle      # un documento, con cada tabla encontrada
// Jev: Admin/jev/.env con JEV_API_KEY=...; respuestas guardadas en Generados/_cache/jev-perimetro.jsonl (no se paga dos veces).
// ============================================================================
import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const USE_JEV = args.includes('--jev');
const DETALLE = args.includes('--detalle');

export const UMBRAL_C1 = 0.05;
export const UMBRAL_C2 = 0.15;

// ---------------------------------------------------------------- PASO A: tablas de total de ingresos y su perímetro
// Total de ingresos, del más preferido al menos (rango 2 = valor de la producción / total revenue; 1 = un subtotal de ricavi).
// Se compara la etiqueta ENTERA (sin el "(A)" del final), no una parte: "TOTAL INCOME TAXES" no es "total income", y "Totale ricavi delle
// vendite e delle prestazioni" es un subtotal (Napoli: 13 M de 275 M), no el total.
const TOTAL_RX = [
  [2, /^(totale valore della produzione|valore della produzione|total (value of )?production|total (operating )?revenues?( and (other )?income)?|total income|turnover)$/i],
  [1, /^(totale ricavi( di esercizio| operativi)?|ricavi totali)$/i],
];
const etiquetaTotal = (s) => s.replace(/\s*\(?\s*\b[a]\s*\)\s*$/i, '').replace(/[:.]\s*$/, '').trim();
// Títulos que nombran un perímetro. "Consolidation"/"consolidamento" (scope of consolidation, area di consolidamento, "companies included
// in the consolidation") NO: es una nota, no un estado. Juventus 2021-22: el anexo de controladas tapaba los estados individuales.
const CONS_RX = /\bconsolidat(ed|[oaie])\b|\bconsolidad[oa]s?\b|\bgruppo\b.*\b(conto economico|stato patrimoniale|bilancio)\b|\b(conto economico|stato patrimoniale|bilancio)\b.*\bgruppo\b|\bgroup\b.*\b(income|statement|accounts)\b/i;
const IND_RX = /bilancio\s+d\s*['’`]?\s*esercizio|\bseparat[oie]\b|individual|separate financial|company only|parent company/i;
// Títulos de estado contable (no de una nota). Dos clases:
//   UN ESTADO ("Conto economico", "Income statement"): hereda el perímetro de la sección que lo contiene, así que la búsqueda SIGUE subiendo
//     (Milan 2023-24: "CONTO ECONOMICO" bajo "SITUAZIONE ECONOMICO-PATRIMONIALE CONSOLIDATA"; Lazio: bajo "PARTE II ... BILANCIO CONSOLIDATO").
//     No hace falta una lista: todo título que no nombra perímetro ni es JUEGO_RX se saltea.
//   EL JUEGO DE ESTADOS ("Financial statements at 30 June 2022", "Bilancio al 31 dicembre 2024") sin perímetro: CORTA la búsqueda como
//     individual. Juventus titula así sus estados individuales, sin decir de quién, después de los consolidados.
const JUEGO_RX = /financial statements|bilancio (al|di esercizio|dell.?esercizio|chiuso|\d{4})|prospetti di bilancio|^\s*bilancio\s*$/i;
const NOTA_RX = /notes? to|explanatory|nota integrativa|note esplicative|annex|allegat|relazione sulla gestione|report on operations|principi|criteri|scope of|area di/i;

// Un título: línea con #, línea entera en negrita, o línea corta suelta entre dos vacías (Inter: "Consolidated financial statements as of
// June 30, 2023" sin #, arriba de la tabla).
const esTitulo = (l, prev = '', next = '') => /^\s*#/.test(l) || /^\s*\*\*[^|]{3,}\*\*\s*$/.test(l)
  || (l.trim().length >= 6 && l.trim().length <= 90 && !l.trim().startsWith('|') && !/[.;:]\s*$/.test(l.trim()) && !prev.trim() && !next.trim());
const limpiar = (s) => s.replace(/[*_`#]/g, '').replace(/\s+/g, ' ').trim();

// Un número de celda: miles con punto o coma ("456.940", "457,243,383"), negativos entre paréntesis. Devuelve null para notas ("8.1"),
// porcentajes y números chicos sin separador (números de nota, de fila).
export function numeroCelda(raw) {
  const s = limpiar(raw).replace(/\s/g, '');
  if (!s || /%$/.test(s)) return null;
  const neg = /^\(.*\)$/.test(s) || /^[-–]/.test(s);
  const t = s.replace(/^[(\-–]+|\)$/g, '');
  let v = null;
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) v = Number(t.replace(/\./g, '').replace(',', '.'));
  else if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) v = Number(t.replace(/,/g, ''));
  else if (/^\d{4,}$/.test(t)) v = Number(t);
  if (v === null || !Number.isFinite(v)) return null;
  return neg ? -v : v;
}

// Perímetro de una línea: el título más cercano hacia arriba que nombra uno. null = ninguno hasta el principio.
function perimetroDeLinea(lineas, i) {
  for (let k = i - 1; k >= 0; k--) {
    const l = lineas[k];
    if (!esTitulo(l, lineas[k - 1], lineas[k + 1])) continue;
    if (CONS_RX.test(l)) return { per: 'consolidado', titulo: `${k + 1}: ${limpiar(l).slice(0, 80)}` };
    if (IND_RX.test(l)) return { per: 'individual', titulo: `${k + 1}: ${limpiar(l).slice(0, 80)}` };
    if (JUEGO_RX.test(l) && !NOTA_RX.test(l)) return { per: 'individual', titulo: `${k + 1}: ${limpiar(l).slice(0, 80)} (juego de estados sin perímetro)` };
  }
  return { per: null, titulo: null };
}

export function tablasDeIngresos(md) {
  const lineas = md.split('\n');
  const out = [];
  lineas.forEach((l, i) => {
    if (!l.trim().startsWith('|')) return;
    const celdas = l.split('|').slice(1, -1);
    if (!celdas.length) return;
    // La etiqueta es la primera celda con una palabra (3 letras): "| E | RATEI E RISCONTI |" no se queda con la "E".
    const etiqueta = limpiar(celdas.find((c) => /[a-zà-ú]{3}/i.test(c)) || '');
    const hit = TOTAL_RX.find(([, rx]) => rx.test(etiquetaTotal(etiqueta)));
    if (!hit) return;
    const nums = celdas.map(numeroCelda).filter((v) => v !== null);
    if (nums.length < 1) return;
    const { per, titulo } = perimetroDeLinea(lineas, i);
    out.push({ linea: i + 1, rango: hit[0], etiqueta: etiqueta.slice(0, 60), actual: nums[0], anterior: nums.length > 1 ? nums[1] : null, per, titulo });
  });
  // Títulos con perímetro y una tabla con números debajo, aunque no se haya reconocido el total de ingresos de esa tabla. Cuenta solo si entre
  // el título y el siguiente (hasta 60 líneas) hay 5 o más filas de tabla con números: Monza 2022 tiene un título "Bilancio consolidato" que es
  // un párrafo sobre el consolidado de Fininvest, sin tabla.
  const conTabla = (k) => {
    let n = 0;
    for (let j = k + 1; j < Math.min(lineas.length, k + 61); j++) {
      const x = lineas[j];
      if (esTitulo(x, lineas[j - 1], lineas[j + 1]) && !x.trim().startsWith('|')) break; // la tabla tiene que ser de ESTE título, no del siguiente
      if (x.trim().startsWith('|') && x.split('|').some((c) => numeroCelda(c) !== null)) n++;
    }
    return n >= 5;
  };
  const titulos = { consolidado: 0, individual: 0 };
  lineas.forEach((l, k) => {
    // No hace falta que diga "conto economico": un resumen con perímetro también prueba que esos números existen (AS Roma 2025: el
    // consolidado solo aparece como "PRINCIPALI DATI ECONOMICI CONSOLIDATI"). Es un freno: solo puede mandar más casos a la cola.
    if (!esTitulo(l, lineas[k - 1], lineas[k + 1]) || NOTA_RX.test(l) || !conTabla(k)) return;
    if (CONS_RX.test(l)) titulos.consolidado++; else if (IND_RX.test(l)) titulos.individual++;
  });
  return { tablas: out, titulos };
}

// El total representativo de un perímetro: el de mejor rango y, entre esos, el valor actual que más se repite (empate: el más grande).
function totalDe(tablas) {
  if (!tablas.length) return null;
  const mejor = Math.max(...tablas.map((t) => t.rango));
  const c = tablas.filter((t) => t.rango === mejor);
  const cuenta = new Map();
  for (const t of c) { const k = Math.abs(t.actual); cuenta.set(k, (cuenta.get(k) || 0) + 1); }
  const elegido = [...cuenta.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0];
  return c.find((t) => Math.abs(t.actual) === elegido);
}

// Lleva b a la escala de a cuando uno está en miles y el otro en unidades (o millones).
function aEscala(a, b) {
  if (!a || !b) return b;
  for (const f of [1, 1000, 1 / 1000, 1e6, 1e-6]) { const r = (b * f) / a; if (r > 0.3 && r < 3) return b * f; }
  return b;
}

// ---------------------------------------------------------------- C3: Jev
const CONTROL_RX = /area di consolidamento|societ[aà] controllat|imprese controllate|controllate|subsidiar|controlled compan/i;
function textoControladas(md) {
  const lineas = md.split('\n');
  const idx = [];
  lineas.forEach((l, i) => { if (CONTROL_RX.test(l) && !l.trim().startsWith('|')) idx.push(i); });
  const partes = []; let largo = 0;
  for (const i of idx) {
    const p = lineas.slice(i, i + 4).join(' ').replace(/\s+/g, ' ').trim();
    if (!p || partes.includes(p)) continue;
    partes.push(p); largo += p.length;
    if (largo > 6000) break;
  }
  return partes.join('\n').slice(0, 6000);
}

let jevKey = null; let jevCache = null;
const CACHE = resolve(ROOT, 'Generados', '_cache', 'jev-perimetro.jsonl');
function cargarCache() {
  if (jevCache) return jevCache;
  jevCache = new Map();
  if (existsSync(CACHE)) for (const l of readFileSync(CACHE, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); jevCache.set(j.clave, j); } catch { /* línea rota: se ignora */ } }
  return jevCache;
}
const PREGUNTA = {
  si: 'Al menos una sociedad controlada que entra en el consolidado hace negocio del fútbol del club: sponsors, derechos de TV o medios, merchandising, marketing o explotación de la marca, venta de entradas, explotación del estadio o del centro deportivo.',
  no: 'Ninguna controlada consolidada hace negocio del fútbol del club (son inmobiliarias sin estadio, financieras, de otra actividad, inactivas o irrelevantes), o el texto no menciona controladas.',
};
async function preguntarJev(texto) {
  const clave = createHash('sha1').update(JSON.stringify([PREGUNTA, texto])).digest('hex');
  const cache = cargarCache();
  if (cache.has(clave)) return { ...cache.get(clave), cache: true };
  if (!jevKey) {
    const env = resolve(ROOT, 'Admin', 'jev', '.env');
    const line = existsSync(env) ? readFileSync(env, 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')) : null;
    if (!line) throw new Error(`Falta ${env} con JEV_API_KEY=...`);
    jevKey = line.slice(12).trim();
  }
  const body = {
    state: `Fragmentos del balance de un club de fútbol que hablan de sus sociedades controladas y del área de consolidación:\n${texto}`,
    model: 'jev-latest',
    questions: { negocio: { type: 'choice', instructions: '¿Alguna controlada consolidada hace negocio del fútbol del club?', criteria: PREGUNTA } },
  };
  for (let intento = 0; intento < 4; intento++) {
    let res;
    try { res = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jevKey}` }, body: JSON.stringify(body) }); }
    catch { await new Promise((r) => setTimeout(r, 2000 * (intento + 1))); continue; }
    if (res.ok) {
      const j = await res.json(); const a = j.answers?.negocio;
      if (!a?.choice) return { error: `respuesta sin answers.negocio: ${JSON.stringify(j).slice(0, 160)}` };
      const r = { clave, choice: a.choice, confidence: a.confidence, tokens: j.usage?.input_tokens ?? 0 };
      mkdirSync(dirname(CACHE), { recursive: true }); appendFileSync(CACHE, JSON.stringify(r) + '\n'); cache.set(clave, r);
      return r;
    }
    const txt = (await res.text()).slice(0, 160);
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 3000 * (intento + 1))); continue; }
    return { error: `HTTP ${res.status}: ${txt}` };
  }
  return { error: 'reintentos agotados' };
}

// ---------------------------------------------------------------- la propuesta de un documento
export async function proponer(mdRel, { jev = false } = {}) {
  const md = readFileSync(resolve(ROOT, mdRel), 'utf8');
  const { tablas, titulos } = tablasDeIngresos(md);
  const cons = tablas.filter((t) => t.per === 'consolidado');
  const ind = tablas.filter((t) => t.per !== 'consolidado'); // sin etiqueta cuenta como individual (el estado de una sola entidad)
  const r = { md: mdRel, tablas, titulos, pasoA: null, c1: null, c2: null, c3: null, propuesta: null, motivo: '' };
  if (!tablas.length) { r.pasoA = 'sin-tablas'; r.motivo = 'no encontré ninguna tabla con el total de ingresos'; return r; }
  if (cons.length && !ind.length) {
    if (titulos.individual) { r.pasoA = 'dudoso'; r.motivo = `solo tablas consolidadas, pero hay ${titulos.individual} título(s) de estado individual sin tabla reconocida`; return r; }
    r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = `solo tablas consolidadas (${cons.length})`; return r;
  }
  if (!cons.length) {
    if (titulos.consolidado) { r.pasoA = 'dudoso'; r.motivo = `solo tablas individuales, pero hay ${titulos.consolidado} título(s) de estado consolidado sin tabla reconocida`; return r; }
    if (/consolidat/i.test(mdRel.split('/').pop())) { r.pasoA = 'dudoso'; r.motivo = 'solo tablas individuales o sin perímetro, pero el nombre del archivo dice consolidado'; return r; }
    r.pasoA = 'solo-individual'; r.propuesta = 'individual'; r.motivo = `solo tablas individuales o sin perímetro (${ind.length}); ningún título de estado consolidado`; return r;
  }
  r.pasoA = 'los-dos';
  const tc = totalDe(cons); const ti = totalDe(ind.filter((t) => t.per === 'individual').length ? ind.filter((t) => t.per === 'individual') : ind);
  const iAct = aEscala(tc.actual, ti.actual); const iAnt = tc.anterior != null && ti.anterior != null ? aEscala(tc.anterior, ti.anterior) : null;
  const dif = (c, i) => (c != null && i ? c / i - 1 : null);
  const d1 = dif(tc.actual, iAct); const d0 = dif(tc.anterior, iAnt);
  // Los mismos números en el año y en el anterior = el mismo estado, visto dos veces (Atalanta y Bologna, que solo publican el consolidado:
  // el resumen de la relazione quedó sin perímetro). Se trata como "solo consolidado", que carga exactamente esos números.
  if (d1 != null && d0 != null && Math.abs(d1) < 0.0001 && Math.abs(d0) < 0.0001) {
    r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = 'las tablas "individuales" tienen los mismos totales que las consolidadas (año y anterior): es el mismo estado';
    return r;
  }
  r.totales = { consolidado: { linea: tc.linea, actual: tc.actual, anterior: tc.anterior }, individual: { linea: ti.linea, actual: ti.actual, anterior: ti.anterior } };
  r.c1 = { voto: [d1, d0].some((d) => d != null && d >= UMBRAL_C1), dif: d1, difAnterior: d0 };
  const crec = (a, b) => (a != null && b ? a / b - 1 : null);
  const gc = crec(tc.actual, tc.anterior); const gi = crec(ti.actual, ti.anterior);
  r.c2 = { voto: gc != null && gi != null && Math.abs(gi - gc) >= UMBRAL_C2, crecConsolidado: gc, crecIndividual: gi };
  if (jev) {
    const texto = textoControladas(md);
    // Sin texto sobre controladas no hay a quién preguntarle: el voto queda sin respuesta (cola), no cuenta como "no".
    if (!texto) r.c3 = { voto: null, motivo: 'el documento no habla de controladas' };
    else { const a = await preguntarJev(texto); r.c3 = a.error ? { voto: null, error: a.error } : { voto: a.choice === 'si', choice: a.choice, confianza: a.confidence, cache: !!a.cache }; }
  } else r.c3 = { voto: null, motivo: 'sin --jev' };
  const votos = [r.c1.voto, r.c2.voto, r.c3.voto];
  const si = votos.filter((v) => v === true).length; const nulos = votos.filter((v) => v === null).length;
  // Un voto sin respuesta (sin --jev, o Jev falló) puede ser un sí: solo se decide si el resultado no depende de él.
  if (si >= 2) { r.propuesta = 'consolidado'; r.motivo = `${si} de 3 criterios`; }
  else if (nulos) { r.motivo = `${si} de 3 criterios y ${nulos} sin respuesta: no alcanza para decidir`; }
  else if (si === 0) { r.propuesta = 'individual'; r.motivo = '0 de 3 criterios'; }
  else { r.motivo = '1 de 3 criterios: a la cola'; }
  return r;
}

// ---------------------------------------------------------------- LA REGLA DEL CLUB (lo que usa el pipeline)
// El ajuste `perimetro` se fija por CLUB (Admin/ajustes-manuales.jsonl), pero la propuesta es por documento. Se miran TODOS los .md del club
// (no solo los de la lista), agrupados por ejercicio (cierre del registro):
//   - de cada ejercicio, qué perímetros HAY: "solo uno" (paso A) o los dos (dos documentos del mismo cierre, o uno con los dos);
//   - los votos: lo que eligió el paso B en los documentos que traen los dos.
// Se fija solo si: los votos coinciden entre sí, y ningún ejercicio tiene SOLO el otro perímetro. Sin votos, vale el perímetro único de
// todos los ejercicios. Si algún ejercicio tiene solo el otro perímetro (un cambio de perímetro en la serie: Parma, individual 2018-2024 y
// solo consolidado 2022 y 2025), NO se fija: frena la compuerta de siempre y Guido decide. Un documento que no decide (cola) no cuenta.
//   ejecutar = true: pregunta a Jev lo que haga falta y ESCRIBE el ajuste del club (autor "perimetro-senales").
//   ejecutar = false (ensayo): sin Jev ni escritura; dice qué fijaría, o que lo decide Jev al ejecutar.
// faltaPerimetro(pdf): la compuerta (antes-de-localizar.mjs) dice que ese documento frena por perímetro; solo se miran esos clubes.
export async function fijarPerimetroDeClubes(pdfs, { registro, ejecutar = false, faltaPerimetro, descartados = new Set() }) {
  const { ajustePerimetroDe, agregarAjuste } = await import('./ajustes.mjs');
  const carpeta = (pdf) => pdf.split('/').slice(0, 3).join('/') + '/';
  const clubes = [...new Set(pdfs.filter((p) => !ajustePerimetroDe(p) && faltaPerimetro(p)).map(carpeta))];
  const out = [];
  for (const c of clubes) {
    const docs = registro.filter((e) => e.pdf.startsWith(c) && e.estado !== 'duplicado' && !descartados.has(e.pdf) && e.md && existsSync(resolve(ROOT, e.md)));
    const props = [];
    for (const e of docs) props.push({ e, r: await proponer(e.md, { jev: ejecutar }) });
    const porCierre = new Map(); const votos = new Map(); let pendJev = 0;
    for (const { e, r } of props) {
      const k = e.periodo?.cierre || e.md;
      const set = porCierre.get(k) || new Set();
      if (r.pasoA === 'solo-individual') set.add('individual');
      else if (r.pasoA === 'solo-consolidado') set.add('consolidado');
      else if (r.pasoA === 'los-dos') { set.add('individual'); set.add('consolidado'); if (r.propuesta) votos.set(e.md, r.propuesta); else if (r.c3?.voto === null) pendJev++; }
      porCierre.set(k, set);
    }
    const valoresVoto = [...new Set(votos.values())];
    const unicos = [...porCierre.entries()].filter(([, s]) => s.size === 1).map(([k, s]) => [k, [...s][0]]);
    const valoresUnicos = [...new Set(unicos.map(([, v]) => v))];
    let valor = null; let porque = '';
    if (valoresVoto.length > 1) porque = `los documentos que traen los dos estados no eligen lo mismo (${[...votos].map(([m, v]) => `${m.split('/').pop()}: ${v}`).join('; ')})`;
    else if (valoresVoto.length === 1 && valoresUnicos.some((v) => v !== valoresVoto[0])) porque = `los votos dan ${valoresVoto[0]}, pero hay ejercicios con solo el otro perímetro (${unicos.filter(([, v]) => v !== valoresVoto[0]).map(([k]) => k).join(', ')})`;
    else if (!valoresVoto.length && valoresUnicos.length > 1) porque = `hay ejercicios con solo individual (${unicos.filter(([, v]) => v === 'individual').map(([k]) => k).join(', ')}) y con solo consolidado (${unicos.filter(([, v]) => v === 'consolidado').map(([k]) => k).join(', ')})`;
    else if (valoresVoto.length === 1) valor = valoresVoto[0];
    else if (valoresUnicos.length === 1) valor = valoresUnicos[0];
    else porque = 'ningún documento del club decide';
    const evidencia = `${votos.size} documento(s) con los dos estados votan ${valoresVoto.join('/') || '—'}; ${unicos.length} ejercicio(s) con un solo perímetro (${valoresUnicos.join('/') || '—'}); ${props.length} documento(s) mirados`;
    if (!valor && pendJev && !ejecutar) { out.push({ carpeta: c, valor: null, pendienteJev: true, detalle: `${porque || 'sin decidir'}; ${pendJev} documento(s) esperan el voto de Jev (se pregunta al ejecutar)` }); continue; }
    if (!valor) { out.push({ carpeta: c, valor: null, detalle: porque }); continue; }
    if (ejecutar) agregarAjuste({ pdf: c, campo: 'perimetro', valor, motivo: `perimetro-senales.mjs: ${evidencia}`, autor: 'perimetro-senales' });
    out.push({ carpeta: c, valor, escrito: ejecutar, detalle: evidencia });
  }
  return out;
}

// ---------------------------------------------------------------- CLI
const pct = (x) => (x == null ? '—' : `${x >= 0 ? '+' : ''}${(x * 100).toFixed(1)}%`);
function linea(r) {
  const b = r.pasoA === 'los-dos'
    ? ` · C1 ${r.c1.voto ? 'sí' : 'no'} (${pct(r.c1.dif)} / ant ${pct(r.c1.difAnterior)}) · C2 ${r.c2.voto ? 'sí' : 'no'} (ind ${pct(r.c2.crecIndividual)} vs cons ${pct(r.c2.crecConsolidado)}) · C3 ${r.c3.voto === null ? '?' : r.c3.voto ? 'sí' : 'no'}${r.c3.confianza != null ? ` (${r.c3.confianza.toFixed(2)})` : ''}${r.c3.error ? ` ERROR ${r.c3.error}` : ''}`
    : '';
  return `${(r.propuesta || 'COLA').padEnd(11)} [${r.pasoA}] ${r.motivo}${b}`;
}

async function main() {
  const verdadF = flagVal('--verdad'); const listaF = flagVal('--lista'); const mdF = flagVal('--md');
  let items = [];
  if (verdadF) items = readFileSync(resolve(ROOT, verdadF), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => { const [md, per] = l.split('\t'); return { md, verdad: per }; });
  else if (listaF) items = readFileSync(resolve(ROOT, listaF), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((p) => ({ md: p.replace(/\.pdf$/i, '.md') }));
  else if (mdF) items = [{ md: mdF }];
  else { console.error('Uso: --verdad <tsv> | --lista <txt> | --md <archivo.md>  [--jev] [--detalle]  (ver la cabecera)'); process.exit(1); }

  const res = { bien: 0, mal: 0, cola: 0 }; const malos = [];
  for (const it of items) {
    if (!existsSync(resolve(ROOT, it.md))) { console.log(`FALTA .md    ${it.md}`); res.cola++; continue; }
    const r = await proponer(it.md, { jev: USE_JEV });
    let marca = '';
    if (it.verdad) {
      if (!r.propuesta) { res.cola++; marca = 'cola'; }
      else if (r.propuesta === it.verdad) { res.bien++; marca = 'ok  '; }
      else { res.mal++; marca = 'MAL '; malos.push(`${it.md}: propuso ${r.propuesta}, verdad ${it.verdad}`); }
    }
    console.log(`${marca ? marca + ' ' : ''}${it.md.replace(/^Clubes\//, '').padEnd(70)} ${linea(r)}`);
    if (DETALLE) for (const t of r.tablas) console.log(`      L${t.linea} ${String(t.per).padEnd(11)} r${t.rango} ${t.etiqueta.padEnd(40)} ${t.actual} | ${t.anterior}   ← ${t.titulo || '(sin título con perímetro)'}`);
  }
  if (items.some((i) => i.verdad)) {
    console.log(`\nRESULTADO: ${res.bien} bien · ${res.mal} MAL · ${res.cola} a la cola  (de ${items.length})`);
    for (const m of malos) console.log('  MAL ' + m);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) main();

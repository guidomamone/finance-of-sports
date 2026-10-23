// ============================================================================
// tools/perimetro-senales.mjs — PROPUESTA DE PERÍMETRO (individual o consolidado) para un documento, con señales y voto.
//
// POR QUÉ (lote 14, los 12 clubes italianos nuevos). tools/antes-de-localizar.mjs frena todo documento que trae estados
// consolidados y cuyo club no tiene años cargados, y pide un ajuste `perimetro` sin decir cuál. El detector de alta-club.mjs CUENTA
// MENCIONES de "consolidato": 5 de 12 clubes frenaron por un falso positivo (Torino, Sassuolo, Monza, Napoli, Sampdoria: las menciones
// son del grupo dueño del club, no un estado del club). Y donde el documento trae los dos, nadie le dice a Guido cuál conviene.
//
// DÓNDE SE USA: lote.mjs y antes-de-localizar.mjs llaman a fijarPerimetroDeClubes() (abajo)
// antes de la compuerta del perímetro. Medido contra Admin/mediciones/perimetro-verdad.tsv: 77 bien, 0 mal, 23 sin decidir. Cualquier cambio acá
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
//                     sin tablas de total de ingresos                                                       → PASO A2
//                     tablas de los dos                                                                     → PASO B
//                     (un título del otro perímetro sin su tabla —por ejemplo la tabla no se reconoció— → cola, no decide)
//  PASO A2 (Claude) El paso A reconoce italiano e inglés. Sin ninguna tabla reconocida (Aris, en griego), Claude ubica el estado de
//                   resultados y vota cinco criterios con peso (título 4, texto del estado 4, auditor 1, grupo 1, portada 1), cada sí con su
//                   línea: 4 o más → consolidado · 0 a 2 → individual · 3 → cola; con columnas o estados de los dos perímetros → cola. Pago: solo con --jev / al ejecutar.
//  PASO A3 (Claude) A2 vio los dos estados sin totales para votar: ¿alguna controlada hace el negocio del fútbol del club?
//                   Con la línea que la nombra; solo "consolidado" decide (cuenta como el voto del documento). Ver pasoA3().
//  PASO B (voto)    Tres criterios, uno por voto:
//                     C1 (gratis) los ingresos consolidados superan a los individuales en 5% o más, en el año o en el anterior
//                        (las controladas tienen negocio propio: Roma, Lazio). Escala: miles vs unidades se normaliza.
//                     C2 (gratis) el individual crece 15 puntos o más distinto que el consolidado (fusión de controladas: Milan 2023-24)
//                     C3 (Jev)    ¿alguna controlada consolidada hace negocio del fútbol del club (sponsors, medios, merchandising,
//                                 marketing, entradas, estadio)? Se le pasa el texto del área de consolidación / controladas.
//                   2 o 3 votos → consolidado · 0 → individual · 1 → cola.
//
// USO:
//   node tools/perimetro-senales.mjs --verdad Admin/mediciones/perimetro-verdad.tsv          # ensayo: pasos A y B sin Jev (C3 = "?")
//   node tools/perimetro-senales.mjs --verdad Admin/mediciones/perimetro-verdad.tsv --jev    # con Jev (~US$ 0,0001 por documento)
//   node tools/perimetro-senales.mjs --lista Admin/lotes/lote-NN.txt [--jev]                  # sin verdad: solo la propuesta
//   node tools/perimetro-senales.mjs --lista Admin/mediciones/perimetro-a2-lista.txt --jev   # medición del paso A2 (clubes con ajuste, otro idioma)
//   node tools/perimetro-senales.mjs --verdad Admin/mediciones/perimetro-a2-verdad-ajustes.tsv --jev [--modelo sonnet]   # A2 contra
//        el ajuste `perimetro` de cada documento; --modelo opus|sonnet: el paso A2 con ese modelo (Sonnet con su propia clave de caché, no pisa las de Opus)
//   node tools/perimetro-senales.mjs --md "Clubes/Italia/AC Milan/x.md" --detalle      # un documento, con cada tabla encontrada
//   node tools/perimetro-senales.mjs --md "Clubes/Grecia/Aris/x.md" --ver-a2           # el texto que recibiría Claude en A2 (gratis)
//   node tools/perimetro-senales.mjs --decidir-clubes <lista de carpetas> --solo-cache   # ensayo de la decisión de perímetro de cada club (gratis)
//   node tools/perimetro-senales.mjs --lista <txt> --exportar-a2 <carpeta>             # los pedidos de A2 sin caché, para contestarlos sin API
//   node tools/perimetro-senales.mjs --auditar-a2 <carpeta>                             # auditoría a posteriori: lo que decidió A2 en corridas reales
//   node tools/perimetro-senales.mjs --lista <txt> --exportar-a3 <carpeta>             # los pedidos de A3, para un subagente
//   node tools/perimetro-senales.mjs --evaluar-a3 <carpeta>                             # la compuerta de A3 sobre <n>.json contra el perímetro fijado
// Jev: Admin/api-keys/jev.env con JEV_API_KEY=...; respuestas guardadas en Generados/_cache/jev-perimetro.jsonl (no se paga dos veces).
// ============================================================================
import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, relative, isAbsolute, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { deporteDePdf, deporteEnFrase } from './deporte-club.mjs'; // «club de fútbol» de los prompts de lectura es el deporte del club

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
// --auditar-a2 y --exportar-a2 escriben en la carpeta que reciben: con `--auditar-a2 Clubes/Grecia/Aris` los pedidos
// quedaron al lado de los PDFs, en lo que se publica. Antes de escribir, la carpeta tiene que estar fuera del repo (scratch) o dentro
// de una carpeta que netlify.toml borra del deploy (`rm -rf X || true`, la misma lectura que checkDeployInterno() de audit.js; así no
// hay una segunda lista que mantener). Si no, frena sin escribir nada.
function carpetaDeTrabajo(flag, ruta) {
  const dir = resolve(ROOT, ruta); const rel = relative(ROOT, dir);
  if (rel.startsWith('..') || isAbsolute(rel)) return dir;
  const toml = existsSync(resolve(ROOT, 'netlify.toml')) ? readFileSync(resolve(ROOT, 'netlify.toml'), 'utf8') : '';
  const borradas = new Set([...toml.matchAll(/rm -rf ([^\n|]+?)\s*\|\|\s*true/g)].flatMap((m) => m[1].trim().split(/\s+/).map((d) => d.replace(/\/$/, ''))));
  if (rel && borradas.has(rel.split(sep)[0])) return dir;
  console.error(`${flag} ${ruta}: esa carpeta se publica en el sitio (netlify.toml no la saca del deploy). Usá una carpeta interna, por ejemplo Admin/mediciones/<nombre>, o una fuera del repo. No se escribió nada.`);
  process.exit(1);
}
const USE_JEV = args.includes('--jev');
// --modelo: el modelo del paso A2 en ESTA corrida, para medir. Opus (sin --modelo) es el de siempre y usa las claves de caché de
// siempre; con otro modelo, la clave incluye el modelo y la respuesta no se mezcla con las de Opus.
const MODELOS_A2 = { opus: 'claude-opus-5-5', sonnet: 'claude-sonnet-5-5' };
const MODELO_A2 = flagVal('--modelo');
if (MODELO_A2 != null && (!MODELOS_A2[MODELO_A2] || !USE_JEV)) { console.error('--modelo opus|sonnet va solo con --jev'); process.exit(1); }
const DETALLE = args.includes('--detalle');
const SOLO_CACHE = args.includes('--solo-cache'); // A2 solo con respuestas guardadas (ver --decidir-clubes)

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

// Títulos con perímetro y una tabla con números debajo, aunque no se haya reconocido el total de ingresos de esa tabla. Cuenta solo si entre
// el título y el siguiente (hasta 60 líneas) hay 5 o más filas de tabla con números: Monza 2022 tiene un título "Bilancio consolidato" que es
// un párrafo sobre el consolidado de Fininvest, sin tabla. Devuelve esas filas (la usa también el paso A2, para mostrarle a Claude la tabla).
function filasConNumeros(lineas, k) {
  const filas = [];
  for (let j = k + 1; j < Math.min(lineas.length, k + 61); j++) {
    const x = lineas[j];
    if (esTitulo(x, lineas[j - 1], lineas[j + 1]) && !x.trim().startsWith('|')) break; // la tabla tiene que ser de ESTE título, no del siguiente
    if (x.trim().startsWith('|') && x.split('|').some((c) => numeroCelda(c) !== null)) filas.push(j);
  }
  return filas;
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
  const conTabla = (k) => filasConNumeros(lineas, k).length >= 5;
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
  const partes = [];
  for (const i of idx) {
    const p = lineas.slice(i, i + 4).join(' ').replace(/\s+/g, ' ').trim();
    if (!p || partes.includes(p)) continue;
    partes.push(p);
  }
  // A Jev van 6000 caracteres; si el documento habla más de sus controladas, se dice cuánto quedó afuera (regla de Admin/PIPELINE.md
  // «Una tool que decide no lee solo una parte del documento»). Lo que se manda no cambia.
  const todo = partes.join('\n');
  return { texto: todo.slice(0, 6000), total: todo.length };
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
async function preguntarJev(texto, deporte) {
  const clave = createHash('sha1').update(JSON.stringify([PREGUNTA, texto])).digest('hex');
  const cache = cargarCache();
  if (cache.has(clave)) return { ...cache.get(clave), cache: true };
  if (!jevKey) {
    const env = resolve(ROOT, 'Admin', 'api-keys', 'jev.env');
    const line = existsSync(env) ? readFileSync(env, 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')) : null;
    if (!line) throw new Error(`Falta ${env} con JEV_API_KEY=...`);
    jevKey = line.slice(12).trim();
  }
  const body = {
    state: `Fragmentos del balance de un club de ${deporteEnFrase(deporte)} que hablan de sus sociedades controladas y del área de consolidación:\n${texto}`,
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

// ---------------------------------------------------------------- PASO A2: Claude, cuando el paso A no reconoce el idioma
// El paso A reconoce títulos y totales en italiano e inglés. En otro idioma (Aris, en griego: "ΕΤΗΣΙΕΣ ΕΝΟΠΟΙΗΜΕΝΕΣ ΟΙΚΟΝΟΜΙΚΕΣ
// ΚΑΤΑΣΤΑΣΕΙΣ" arriba de "I. Κατάσταση Αποτελεσμάτων") no encuentra ninguna tabla. En vez de sumar palabras de cada idioma, una llamada a
// Claude con lo que el documento dice de sí mismo: la portada (primeras líneas), los TÍTULOS con su número de línea y su primer texto y, en
// los que tienen una tabla con números debajo, los primeros renglones de la tabla.
// Claude ubica el estado de resultados y contesta CINCO criterios de sí o no ("¿esto dice que el estado es consolidado?"), cada sí con la
// línea que lo dice. Los criterios no valen lo mismo (PESOS_A2): lo que nombra o describe el estado mismo pesa más que lo que puede hablar de
// otra cosa (el grupo dueño del club, un membrete).
//   titulo   (4) el título del estado, o el título o el texto de introducción de su sección (Aris: "ΕΤΗΣΙΕΣ ΕΝΟΠΟΙΗΜΕΝΕΣ ΟΙΚΟΝΟΜΙΚΕΣ
//                ΚΑΤΑΣΤΑΣΕΙΣ")
//   texto    (4) el texto entre el título y la tabla, o el que explica cómo se presentan las cifras del estado (Rapid Wien: "Die
//                konsolidierte Gewinn- und Verlustrechnung..."; 2019-20, en las explicaciones: "Bei allen Finanzdaten ... konsolidierte")
//   auditor  (1) el informe del auditor es sobre estados consolidados
//   grupo    (1) una sección sobre la estructura del grupo o las controladas que se consolidan (puede ser del grupo dueño: Aris 2021, nota 17)
//   portada  (1) la portada o el encabezado (puede ser un membrete de una sola sociedad: Ferroviária, "CONSOLIDADO")
// COMPUERTA (la misma para todos los criterios): un sí cuenta solo si su línea es una de las que se le mandaron (titulo: un título arriba de
// la tabla del estado, o el texto debajo de uno de esos títulos; texto, auditor y grupo: un texto o título de los mandados; portada: la
// portada). El estado tiene que ser un título con tabla.
//   puntos >= UMBRAL_A2_CONS (4) → consolidado · <= UMBRAL_A2_IND (2) → individual · 3 → cola. Las tres pistas débiles suman 3 como
//   máximo: sin el título o el texto del estado nunca sale consolidado (OB 2021: auditor + grupo, con los pesos 2 y 1 y umbral 3, salía
//   consolidado y es individual). Medido en Admin/mediciones/perimetro-a2-medicion.txt (75 documentos de 15 clubes fuera de Italia): 46 bien,
//   0 errores de A2 (los 2 que no coinciden son de Trabzonspor, donde el ajuste del club está mal).
// Si Claude dice que el documento trae además un estado de resultados del otro perímetro, o que la tabla del estado trae columnas de los
// dos (OB: "Koncern" y "Moderselskab" en la misma tabla) → cola: no hay totales reconocidos para el paso B, y el perímetro del club decide. Los pesos y umbrales se ajustan midiendo (Admin/mediciones/perimetro-a2-*.txt), nunca por un caso suelto.
// Respuestas guardadas en Generados/_cache/claude-perimetro.jsonl (no se paga dos veces). ~US$ 0,02 por documento (Opus, esfuerzo bajo).
export const PESOS_A2 = { titulo: 4, texto: 4, auditor: 1, grupo: 1, portada: 1 };
export const UMBRAL_A2_CONS = 4;
export const UMBRAL_A2_IND = 2;
const CACHE_A2 = resolve(ROOT, 'Generados', '_cache', 'claude-perimetro.jsonl');
let cacheA2 = null;
function titulosDelDocumento(lineas) {
  const out = [];
  lineas.forEach((l, k) => {
    if (!esTitulo(l, lineas[k - 1], lineas[k + 1]) || l.trim().startsWith('|')) return; // "--- pág. N ---" cuenta: Novorizontino 2017 cuelga su tabla de ahí
    const filas = filasConNumeros(lineas, k);
    const tabla = filas.length >= 5
      ? filas.slice(0, 4).map((j) => limpiar(lineas[j].split('|').slice(1, -1).find((c) => /\p{L}{3}/u.test(c)) || '').slice(0, 60)).filter(Boolean)
      : null;
    // El texto debajo del título (tres líneas como máximo, sin imágenes, hasta la tabla o el título siguiente): Rapid 2019-20 dice el perímetro en la
    // introducción de la sección ("Bei allen Finanzdaten handelt es sich ... um die konsolidierte Betrachtung") y el auditor en un párrafo.
    const texto = [];
    for (let j = k + 1; j < Math.min(lineas.length, tabla ? filas[0] : k + 40) && texto.length < 3; j++) {
      if (!lineas[j].trim().startsWith('|') && esTitulo(lineas[j], lineas[j - 1], lineas[j + 1])) break;
      const x = limpiar(lineas[j]); if (x && !lineas[j].trim().startsWith('|') && !/^-+\s*pág/i.test(x) && !/^!\[/.test(x)) texto.push({ linea: j + 1, texto: x.slice(0, 200) });
    }
    out.push({ linea: k + 1, titulo: limpiar(l).slice(0, 100), tabla, texto, inicioTabla: tabla ? filas[0] + 1 : null });
  });
  return out;
}
function portadaDelDocumento(lineas) {
  const out = [];
  for (let k = 0; k < lineas.length && out.length < 15; k++) { const x = limpiar(lineas[k]); if (x && !lineas[k].trim().startsWith('|') && !/^-+\s*pág/i.test(x) && !/^!\[/.test(x)) out.push({ linea: k + 1, texto: x.slice(0, 150) }); }
  return out;
}
const textoA2 = (tit, portada) => `PORTADA (primeras líneas):\n${portada.map((p) => `L${p.linea}: ${p.texto}`).join('\n')}\n\nTÍTULOS:\n`
  + tit.slice(0, 400).map((t) => `L${t.linea}: ${t.titulo}${t.tabla ? `  [tabla: ${t.tabla.join(' / ')}]` : ''}${t.texto.length ? `\n    texto${t.tabla ? ' antes de la tabla' : ''}: ${t.texto.map((x) => `L${x.linea}: ${x.texto}`).join(' | ')}` : ''}`).join('\n');
const CRITERIO = { type: 'object', additionalProperties: false, required: ['si', 'linea'], properties: { si: { type: 'boolean' }, linea: { type: ['integer', 'null'] } } };
const ESQUEMA_A2 = {
  type: 'object', additionalProperties: false, required: ['linea_estado', 'linea_otro_estado', 'columnas_de_los_dos', 'criterios'],
  properties: {
    linea_estado: { type: ['integer', 'null'] }, linea_otro_estado: { type: ['integer', 'null'] }, columnas_de_los_dos: { type: 'boolean' },
    criterios: { type: 'object', additionalProperties: false, required: Object.keys(PESOS_A2), properties: Object.fromEntries(Object.keys(PESOS_A2).map((k) => [k, CRITERIO])) },
  },
};
const sistemaA2 = (deporte) => `Recibís la portada (primeras líneas) y los títulos de un documento contable de un club de ${deporteEnFrase(deporte)} (transcripción a Markdown), en orden, con su número de línea. Debajo de cada título va su primer texto; a los títulos que tienen una tabla con números debajo se les agregan los primeros renglones de esa tabla (y el texto es el que hay entre el título y la tabla).
1. linea_estado: la línea del título del ESTADO DE RESULTADOS (cuenta de pérdidas y ganancias, income statement) del ejercicio; tiene que ser un título con tabla. null si no hay ninguno. No cuentes notas, resúmenes ni tablas de la memoria.
2. linea_otro_estado: si el documento trae además OTRO estado de resultados de distinto perímetro (uno del grupo y otro de la sociedad sola), la línea de su título; si no, null.
3. columnas_de_los_dos: true si la tabla del estado de linea_estado trae columnas de los dos perímetros a la vez (por ejemplo "grupo" y "sociedad", "Koncern" y "Moderselskab", "consolidado" e "individual"); si no, false.
4. criterios: para cada uno, si=true solo si esa parte del documento dice que el estado de linea_estado es CONSOLIDADO (incluye a la sociedad y a sus controladas: el grupo), con la línea exacta que lo dice; si=false (y linea null) si no lo dice o no existe.
   - titulo: el título del estado, o el título o el texto de introducción de su sección (más arriba), dice consolidado / del grupo.
   - texto: el texto entre el título del estado y su tabla, o el texto que explica cómo se presentan las cifras de ese estado, dice consolidado / del grupo.
   - auditor: el informe del auditor (un título o un texto suyo) dice que auditó estados consolidados.
   - grupo: hay una sección sobre la estructura del grupo o las controladas que entran en la consolidación de ESTA sociedad (no la del grupo dueño del que la sociedad es filial).
   - portada: la portada o el encabezado dice consolidado.
   La palabra "consolidado" sola en un membrete de una sola sociedad (un sistema contable que junta sus centros de costo) no prueba un estado consolidado: contala solo en portada.`;
async function pasoA2(mdRel, lineas, { soloCache = false } = {}) {
  const tit = titulosDelDocumento(lineas);
  if (!tit.some((t) => t.tabla)) return { motivo: 'ningún título con tabla' };
  const portada = portadaDelDocumento(lineas);
  const user = textoA2(tit, portada); const SISTEMA_A2 = sistemaA2(deporteDePdf(mdRel.replace(/\.md$/, '.pdf')));
  const clave = createHash('sha1').update(JSON.stringify(MODELO_A2 && MODELO_A2 !== 'opus' ? [SISTEMA_A2, user, MODELOS_A2[MODELO_A2]] : [SISTEMA_A2, user])).digest('hex');
  if (!cacheA2) { cacheA2 = new Map(); if (existsSync(CACHE_A2)) for (const l of readFileSync(CACHE_A2, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); cacheA2.set(j.clave, j); } catch { /* línea rota */ } } }
  let datos = cacheA2.get(clave)?.datos;
  if (!datos && (SOLO_CACHE || soloCache)) return { pendiente: true };
  if (!datos) {
    const { llamarClaude } = await import('./claude-llamada.mjs');
    const r = await llamarClaude({ system: SISTEMA_A2, user, schema: ESQUEMA_A2, tarea: MODELO_A2 && MODELO_A2 !== 'opus' ? `perimetro-a2-medir-${MODELO_A2}` : 'perimetro-a2', pdf: mdRel.replace(/\.md$/, '.pdf'), maxTokens: 2000, ...(MODELO_A2 ? { modelo: MODELOS_A2[MODELO_A2] } : {}) });
    if (r.pendiente) return { pendiente: true }; // modo batch: la respuesta llega en la ola siguiente
    if (r.error) return { error: r.error };
    datos = r.datos;
    mkdirSync(dirname(CACHE_A2), { recursive: true }); appendFileSync(CACHE_A2, JSON.stringify({ clave, md: mdRel, ...(MODELO_A2 && MODELO_A2 !== 'opus' ? { modelo: MODELOS_A2[MODELO_A2] } : {}), datos }) + '\n'); cacheA2.set(clave, { datos });
  }
  // La compuerta.
  const est = tit.find((t) => t.tabla && t.linea === datos.linea_estado);
  if (!est) return { motivo: datos.linea_estado == null ? 'Claude no encontró ningún estado de resultados' : `L${datos.linea_estado} no es un título con tabla` };
  // El otro estado cuenta aunque su tabla no se haya reconocido (FC Groningen 2024-25: el individual de la Beheer B.V. sin tabla marcada).
  const otro = tit.find((t) => t.linea === datos.linea_otro_estado && t.linea !== est.linea);
  const titulosArriba = new Set(tit.filter((t) => t.linea <= est.linea).flatMap((t) => [t.linea, ...(t.linea < est.linea ? t.texto.map((x) => x.linea) : [])]));
  const enviadas = new Set([...tit.map((t) => t.linea), ...tit.flatMap((t) => t.texto.map((x) => x.linea)), ...portada.map((p) => p.linea)]);
  const textos = new Set(tit.flatMap((t) => t.texto.map((x) => x.linea)));
  const valida = { titulo: (l) => titulosArriba.has(l), texto: (l) => textos.has(l), auditor: (l) => enviadas.has(l), grupo: (l) => enviadas.has(l), portada: (l) => portada.some((p) => p.linea === l) };
  const votos = {}; let puntos = 0;
  for (const [k, peso] of Object.entries(PESOS_A2)) {
    const c = datos.criterios?.[k] || {};
    const si = !!c.si && c.linea != null && valida[k](c.linea);
    votos[k] = { si, linea: c.linea ?? null, rechazado: !!c.si && !si };
    if (si) puntos += peso;
  }
  return { estado: est.linea, otro: otro?.linea ?? null, columnasDeLosDos: !!datos.columnas_de_los_dos, votos, puntos };
}

// ---------------------------------------------------------------- PASO A3: qué hacen las controladas
// POR QUÉ: cuando A2 ve los DOS estados (el de la sociedad y el del grupo) pero no hay totales reconocidos para el
// voto del paso B, el club quedaba sin decidir y el lote frenaba. Lotes 93 y 94: 10 documentos; los 8 que se decidieron a mano se
// decidieron con la pregunta de la regla (Admin/CONVENCIONES-DATOS.md, "qué perímetro se carga"): ¿las controladas hacen el negocio del
// fútbol del club? Sí -> consolidado (Viking: Viking Stadion AS, el estadio); no -> individual (Sarpsborg 08: Prozo AS, un comercio aparte).
// A3 le hace a Claude ESA pregunta con las líneas del documento que hablan de controladas (en cualquier idioma, tablas incluidas).
// COMPUERTA: la línea citada está entre las mandadas y nombra a la controlada que da Claude. Si no, o si dice "no_se", no decide (frena
// como antes). Sonnet; caché Generados/_cache/claude-perimetro-a3.jsonl. --exportar-a3 / --evaluar-a3: medir sin API (ver el CLI).
const CONTROL_A3_RX = /controlad|dependiente|filial|subsidi|controllat|consolidament|dochter|groepsmaatschappij|deelneming|consolidatie|tochtergesellschaft|konsolidierungskreis|beteiligung|datterselskap|dattervirksomhed|dotterbolag|konsern|koncern|group compan|consolidation|périmètre|participa/i;
function textoA3(lineas) {
  const usadas = new Set(); const partes = []; let largo = 0;
  for (let i = 0; i < lineas.length && largo < 9000; i++) {
    if (!CONTROL_A3_RX.test(lineas[i])) continue;
    for (let j = i; j < Math.min(lineas.length, i + 4); j++) {
      const t = lineas[j].replace(/\s+/g, ' ').trim();
      if (!t || usadas.has(j + 1)) continue;
      usadas.add(j + 1); const p = `L${j + 1}: ${t.slice(0, 300)}`; partes.push(p); largo += p.length;
    }
  }
  return { texto: partes.join('\n'), lineas: usadas };
}
const ESQUEMA_A3 = {
  type: 'object', additionalProperties: false, required: ['perimetro', 'linea', 'controlada', 'motivo'],
  properties: { perimetro: { type: 'string', enum: ['consolidado', 'individual', 'no_se'] }, linea: { type: ['integer', 'null'] }, controlada: { type: ['string', 'null'] }, motivo: { type: 'string' } },
};
export const sistemaA3 = (deporte) => `Recibís líneas numeradas ("L123: ...") de la memoria de un club de ${deporteEnFrase(deporte)} que publica DOS estados de resultados: el de la sociedad sola y el del grupo (la sociedad y sus controladas). Son las líneas que hablan de controladas, participaciones o consolidación, en cualquier idioma.
La regla para elegir qué estado se carga: si al menos una controlada que entra en el consolidado hace el negocio del fútbol del club (el club profesional, el primer equipo, la academia o el fútbol base del club, el estadio o el centro deportivo del club, sponsors, derechos de TV, merchandising, entradas, hospitality o catering del estadio), "consolidado". Si ninguna lo hace (inmobiliarias sin el estadio, financieras, negocios de otra actividad, sociedades inactivas o en liquidación), "individual". Si la sociedad que presenta es una holding sin operación propia y el fútbol está en una controlada, "consolidado".
Devolvé: perimetro; linea: la línea que nombra a la controlada que decide (si es "consolidado", una que hace el negocio del fútbol; si es "individual", la que muestra qué hace la controlada principal); controlada: su nombre tal como aparece en esa línea; motivo: una oración. Si las líneas no alcanzan para saber qué hacen las controladas, "no_se" con linea y controlada en null.`;
const CACHE_A3 = resolve(ROOT, 'Generados', '_cache', 'claude-perimetro-a3.jsonl');
let cacheA3 = null;
const leerCacheA3 = () => { if (!cacheA3) { cacheA3 = new Map(); if (existsSync(CACHE_A3)) for (const l of readFileSync(CACHE_A3, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); cacheA3.set(j.clave, j); } catch { /* línea rota */ } } } return cacheA3; };
const pedidoA3 = (lineas, deporte) => { const { texto, lineas: mandadas } = textoA3(lineas); return texto ? { user: texto, mandadas, clave: createHash('sha1').update(JSON.stringify([sistemaA3(deporte), texto])).digest('hex') } : null; };
const sinAcentos = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
export function compuertaA3(datos, mandadas, lineas) {
  if (!datos || datos.perimetro === 'no_se') return { motivo: 'Claude no sabe qué hacen las controladas' };
  if (!mandadas.has(datos.linea)) return { motivo: `L${datos.linea} no está entre las líneas mandadas` };
  const nombre = sinAcentos(datos.controlada);
  if (nombre.length < 4 || !sinAcentos(lineas[datos.linea - 1]).includes(nombre)) return { motivo: `L${datos.linea} no nombra a "${datos.controlada}"` };
  // SOLO "consolidado" decide: nombrar una controlada que hace fútbol, con su línea, se comprueba; "ninguna lo hace"
  // no se prueba con fragmentos. Medido con un subagente Sonnet sobre los 10 casos de los lotes 93-94: 6 consolidado bien; el único
  // individual, mal (PEC Zwolle: la Stichting Regio Zwolle United trabaja para el club, L778). Un "individual" frena como antes.
  if (datos.perimetro !== 'consolidado') return { motivo: `A3 dice ${datos.perimetro} ("${datos.controlada}" L${datos.linea}): solo "consolidado" decide` };
  return { perimetro: datos.perimetro, linea: datos.linea, controlada: datos.controlada, motivo: datos.motivo };
}
async function pasoA3(mdRel, lineas, { soloCache = false } = {}) {
  const pdfA3 = mdRel.replace(/\.md$/, '.pdf'); const p = pedidoA3(lineas, deporteDePdf(pdfA3));
  if (!p) return { motivo: 'el documento no habla de controladas' };
  let datos = leerCacheA3().get(p.clave)?.datos;
  if (!datos && (SOLO_CACHE || soloCache)) return { pendiente: true };
  if (!datos) {
    const { llamarClaude } = await import('./claude-llamada.mjs');
    const r = await llamarClaude({ system: sistemaA3(deporteDePdf(pdfA3)), user: p.user, schema: ESQUEMA_A3, tarea: 'perimetro-a3', pdf: pdfA3, maxTokens: 1000, modelo: MODELOS_A2.sonnet });
    if (r.pendiente) return { pendiente: true };
    if (r.error) return { error: r.error };
    datos = r.datos;
    mkdirSync(dirname(CACHE_A3), { recursive: true }); appendFileSync(CACHE_A3, JSON.stringify({ clave: p.clave, md: mdRel, datos }) + '\n'); cacheA3.set(p.clave, { datos });
  }
  return compuertaA3(datos, p.mandadas, lineas);
}

// ---------------------------------------------------------------- la propuesta de un documento
export async function proponer(mdRel, { jev = false, soloCache = false } = {}) {
  const md = readFileSync(resolve(ROOT, mdRel), 'utf8');
  const { tablas, titulos } = tablasDeIngresos(md);
  const cons = tablas.filter((t) => t.per === 'consolidado');
  const ind = tablas.filter((t) => t.per !== 'consolidado'); // sin etiqueta cuenta como individual (el estado de una sola entidad)
  const r = { md: mdRel, tablas, titulos, pasoA: null, c1: null, c2: null, c3: null, propuesta: null, motivo: '' };
  if (!tablas.length) {
    r.pasoA = 'sin-tablas'; r.motivo = 'no encontré ninguna tabla con el total de ingresos';
    // PASO A2 (Claude; pago, así que solo al ejecutar: en el ensayo queda pendiente).
    // `soloCache`: el ensayo usa la respuesta GUARDADA de A2 si la hay (gratis) y dice lo
    // que va a pasar; sin respuesta guardada queda pendiente. Antes el ensayo daba siempre "se decide al ejecutar" y el lote frenaba igual
    // cuando A2 veía los dos estados sin totales para votar (lotes 93 y 94: 10 documentos).
    if (!jev && !soloCache) { r.a2 = { pendiente: true }; return r; }
    const a = await pasoA2(mdRel, md.split('\n'), { soloCache: !jev }); r.a2 = a;
    if (a.pendiente) { r.motivo += '; A2 pendiente de la Batch API'; return r; }
    if (a.error) { r.motivo += `; A2 falló (${a.error})`; return r; }
    if (a.estado == null) { r.motivo += `; A2: ${a.motivo}`; return r; }
    const v = Object.entries(a.votos).map(([k, x]) => `${k} ${x.si ? `sí L${x.linea}` : x.rechazado ? `rechazado L${x.linea}` : 'no'}`).join(', ');
    if (a.otro != null || a.columnasDeLosDos) {
      r.pasoA = 'a2-los-dos'; r.motivo = `A2 (Claude): estado L${a.estado} ${a.otro != null ? `y otro de distinto perímetro L${a.otro}` : 'con columnas de los dos perímetros'}, sin totales reconocidos para votar`;
      // PASO A3: sin totales para votar, qué hacen las controladas. Decide como un voto del paso B.
      const a3 = await pasoA3(mdRel, md.split('\n'), { soloCache: !jev }); r.a3 = a3;
      if (a3.perimetro) { r.propuesta = a3.perimetro; r.motivo += `; A3 (Claude): ${a3.perimetro}, "${a3.controlada}" L${a3.linea} (${a3.motivo})`; }
      else r.motivo += a3.pendiente ? '; A3 pendiente (se pregunta al ejecutar)' : `; A3: ${a3.error || a3.motivo}`;
      return r;
    }
    const base = `A2 (Claude) estado L${a.estado}, ${a.puntos} de 10 puntos (${v})`;
    if (a.puntos >= UMBRAL_A2_CONS) { r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = base; }
    else if (a.puntos <= UMBRAL_A2_IND) { r.pasoA = 'solo-individual'; r.propuesta = 'individual'; r.motivo = base; }
    else r.motivo = `${base}: a la cola`;
    return r;
  }
  if (cons.length && !ind.length) {
    if (titulos.individual) { r.pasoA = 'dudoso'; r.motivo = `solo tablas consolidadas, pero hay ${titulos.individual} título(s) de estado individual sin tabla reconocida`; return r; }
    r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = `solo tablas consolidadas (${cons.length})`; return r;
  }
  if (!cons.length) {
    if (titulos.consolidado) { r.pasoA = 'dudoso'; r.motivo = `solo tablas individuales, pero hay ${titulos.consolidado} título(s) de estado consolidado sin tabla reconocida`; return r; }
    if (/consolidat/i.test(mdRel.split('/').pop())) { r.pasoA = 'dudoso'; r.motivo = 'solo tablas individuales o sin perímetro, pero el nombre del archivo dice consolidado'; return r; }
    r.pasoA = 'solo-individual'; r.propuesta = 'individual'; r.motivo = `solo tablas individuales o sin perímetro (${ind.length}); ningún título de estado consolidado`;
    r.sinTituloDePerimetro = !ind.some((t) => t.per === 'individual'); // ninguna tabla dice "individual": el "individual" es por descarte, no una señal
    return r;
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
    const { texto, total } = textoControladas(md);
    if (total > texto.length) r.recorte = `Jev (c3) recibió ${texto.length} de ${total} caracteres sobre controladas; el resto no se miró`;
    // Sin texto sobre controladas no hay a quién preguntarle: el voto queda sin respuesta (cola), no cuenta como "no".
    if (!texto) r.c3 = { voto: null, motivo: 'el documento no habla de controladas' };
    else { const a = await preguntarJev(texto, deporteDePdf(mdRel.replace(/\.md$/, '.pdf'))); r.c3 = a.error ? { voto: null, error: a.error } : { voto: a.choice === 'si', choice: a.choice, confianza: a.confidence, cache: !!a.cache }; }
  } else r.c3 = { voto: null, motivo: 'sin --jev' };
  const votos = [r.c1.voto, r.c2.voto, r.c3.voto];
  const si = votos.filter((v) => v === true).length; const nulos = votos.filter((v) => v === null).length;
  // Un voto sin respuesta (sin --jev, o Jev falló) puede ser un sí: solo se decide si el resultado no depende de él.
  if (si >= 2) { r.propuesta = 'consolidado'; r.motivo = `${si} de 3 criterios`; }
  else if (nulos) { r.motivo = `${si} de 3 criterios y ${nulos} sin respuesta: no alcanza para decidir`; }
  else if (si === 0) { r.propuesta = 'individual'; r.motivo = '0 de 3 criterios'; }
  else { r.motivo = '1 de 3 criterios: a la cola'; }
  if (r.recorte) r.motivo += `; AVISO (recorte): ${r.recorte}`;
  return r;
}

// ---------------------------------------------------------------- LA REGLA DEL CLUB (lo que usa el pipeline)
// La propuesta es por documento; el ajuste `perimetro` (Admin/registros/ajustes-manuales.jsonl) puede ser del CLUB (la carpeta) o de UN documento.
// Se miran TODOS los .md del club (no solo los de la lista), agrupados por ejercicio (cierre del registro):
//   - de cada ejercicio, qué perímetros HAY: "solo uno" (paso A o A2) o los dos (dos documentos del mismo cierre, o uno con los dos);
//   - los votos: lo que eligió el paso B en los documentos que traen los dos.
// LA REGLA (Admin/CONVENCIONES-DATOS.md, "Perímetro"; es la que Guido aplicó caso por caso: Parma, Fiorentina 2019, Lazio en liras):
//   1. Un ejercicio que se publicó con UN solo perímetro se carga con ese: no hay otro. Si no es el del club, ajuste de cada documento de
//      ese ejercicio (Parma, individual, con 2022 y 2025 solo consolidados).
//   2. El perímetro del CLUB es el de los votos (los ejercicios que traen los dos). Sin votos, el único perímetro de todos los ejercicios.
//   3. Sin votos y con ejercicios de los dos perímetros (Aris: individual en 2019 y 2021, solo consolidado en 2023-2025), no hay perímetro
//      del club: cada documento lleva el suyo.
//   Frena (decide Guido) solo si los votos no coinciden entre sí. Un documento que no decide (cola) no cuenta, y si su ejercicio no tiene
//   otro documento que decida, sigue frenando en la compuerta.
//   ejecutar = true: pregunta a Jev y a Claude lo que haga falta y ESCRIBE los ajustes (autor "perimetro-senales").
//   ejecutar = false (ensayo): sin API ni escritura; dice qué fijaría, o que se decide al ejecutar.
// faltaPerimetro(pdf): la compuerta (antes-de-localizar.mjs) dice que ese documento frena por perímetro; solo se miran esos clubes.
// Devuelve, por club: { carpeta, valor (del club o null), porDocumento: [{ pdf, valor }], escrito, pendienteJev, detalle }.
// LOS AÑOS YA CARGADOS TAMBIÉN SON EVIDENCIA. Burnley (lote 97): 2024 y 2025 están cargados como consolidado (Burnley FC Holdings) y el
// documento 2022-23 trae una sola tabla de ingresos SIN título de perímetro; el paso A la daba por "individual" (por descarte) y fijó `individual` para todo el club. Ahora, si los
// años cargados del club son consolidado (la heurística de perimetroHeredado(): al menos uno, y ninguno individual), un documento cuyo "solo individual" es por descarte (ninguna tabla lo dice) no vota,
// Si hay un título que dice "individual", el documento vota individual como siempre.
let _cargados = null;
async function perimetroCargadoDe(carpeta) {
  try {
    const { clubDeCarpeta } = await import('./carpetas-clubes.mjs'); const { perimetroHeredado, cargarSitio } = await import('./cargar.mjs');
    const [, pais, club] = carpeta.split('/'); const id = clubDeCarpeta(pais, club).clubId; if (!id) return null;
    const sitio = (_cargados ??= cargarSitio()); if (!sitio.generic?.[id]) return null;
    const her = perimetroHeredado(sitio, id); const anios = Object.entries(her.porAnio);
    return anios.some(([, v]) => v === 'consolidado') && anios.every(([, v]) => v === 'consolidado' || v === '?') ? { perimetro: 'consolidado', anios: anios.map(([y]) => y) } : null; // algún año consolidado y ninguno individual ("?" = la nota nombra los dos: Burnley 2024)
  } catch { return null; }
}
export async function fijarPerimetroDeClubes(pdfs, { registro, ejecutar = false, faltaPerimetro, descartados = new Set(), jev = ejecutar }) {
  const { ajustePerimetroDe, agregarAjuste } = await import('./ajustes.mjs');
  const carpeta = (pdf) => pdf.split('/').slice(0, 3).join('/') + '/';
  const clubes = [...new Set(pdfs.filter((p) => !ajustePerimetroDe(p) && faltaPerimetro(p)).map(carpeta))];
  const out = [];
  for (const c of clubes) {
    const docs = registro.filter((e) => e.pdf.startsWith(c) && e.estado !== 'duplicado' && !descartados.has(e.pdf) && e.md && existsSync(resolve(ROOT, e.md)));
    const props = [];
    for (const e of docs) props.push({ e, r: await proponer(e.md, { jev, soloCache: !ejecutar }) });
    // Modo batch (claude-llamada.mjs): si a algún documento del club le falta la respuesta de A2, no se decide el club con los demás (sin
    // batch habrían estado todas): se espera a la ola siguiente.
    if (ejecutar && props.some(({ r }) => r.a2?.pendiente || r.a3?.pendiente)) { out.push({ carpeta: c, valor: null, porDocumento: [], pendienteJev: true, detalle: 'A2 o A3 pendiente de la Batch API: se decide en la ola siguiente' }); continue; }
    const porCierre = new Map(); const votos = new Map(); let pendJev = 0;
    const cargado = await perimetroCargadoDe(c);
    for (const { e, r } of props) {
      const k = e.periodo?.cierre || e.md;
      const set = porCierre.get(k) || new Set();
      if (r.pasoA === 'solo-individual' && r.sinTituloDePerimetro && cargado) { /* sin título de perímetro y la serie cargada es consolidado: no vota (298 o2) */ }
      else if (r.pasoA === 'solo-individual') set.add('individual');
      else if (r.pasoA === 'solo-consolidado') set.add('consolidado');
      else if (r.pasoA === 'los-dos' || r.pasoA === 'a2-los-dos') { set.add('individual'); set.add('consolidado'); if (r.propuesta) votos.set(e.md, r.propuesta); else if (r.c3?.voto === null) pendJev++; } // A3 sin respuesta guardada no cuenta: el ensayo lo da como frenado (conservador)
      else if (r.a2?.pendiente) pendJev++;
      porCierre.set(k, set);
    }
    const valoresVoto = [...new Set(votos.values())];
    const unicos = [...porCierre.entries()].filter(([, s]) => s.size === 1).map(([k, s]) => [k, [...s][0]]);
    const valoresUnicos = [...new Set(unicos.map(([, v]) => v))];
    const evidencia = `${votos.size} documento(s) con los dos estados votan ${valoresVoto.join('/') || '—'}; ${unicos.length} ejercicio(s) con un solo perímetro (${valoresUnicos.join('/') || '—'}); ${props.length} documento(s) mirados`;
    if (valoresVoto.length > 1) { out.push({ carpeta: c, valor: null, porDocumento: [], detalle: `los documentos que traen los dos estados no eligen lo mismo (${[...votos].map(([m, v]) => `${m.split('/').pop()}: ${v}`).join('; ')})` }); continue; }
    // 2. El perímetro del club.
    // el punto 2 de la regla dice "sin ningún ejercicio con los dos": si algún ejercicio trae los dos
    // estados y no votó (Estonia: A2 ve los dos, pero sin total de ingresos reconocido no hay paso B), el perímetro del club NO sale de los
    // ejercicios de un solo estado; queda sin decidir (frena) y esos ejercicios reciben su ajuste propio (punto 1). Antes, Kuressaare,
    // Tallinna Kalev, Narva Trans y FCI Levadia quedaban "individual" por 2019-2020 y hubo que corregirlos a "consolidado" y repagar
    // localizar. Medido con --decidir-clubes --solo-cache: 42 carpetas con ajuste de club idénticas; cambian solo los estonios.
    const conLosDos = [...porCierre.values()].some((x) => x.size === 2);
    const valor = valoresVoto[0] || (!conLosDos && valoresUnicos.length === 1 ? valoresUnicos[0] : null);
    // 1 y 3. Los ejercicios con un solo perímetro distinto del club (o todos, si no hay perímetro del club): ajuste de cada documento.
    const porDocumento = [];
    // Solo los documentos que propusieron ese perímetro: uno del mismo ejercicio que no decidió (Parma 2023 consolidato, sin tablas reconocidas)
    // no recibe un ajuste que no le corresponde; sigue frenando en la compuerta.
    for (const [k, v] of unicos) if (v !== valor) for (const { e } of props.filter(({ e, r }) => (e.periodo?.cierre || e.md) === k && r.propuesta === v)) porDocumento.push({ pdf: e.pdf, valor: v, cierre: k });
    if (!valor && !porDocumento.length && pendJev && !ejecutar) { out.push({ carpeta: c, valor: null, porDocumento, pendienteJev: true, detalle: `${evidencia}; ${pendJev} documento(s) sin respuesta guardada de Claude (A2) o de Jev: se deciden al ejecutar solo si A2 ve un único estado o el voto alcanza; si no, el lote frena` }); continue; }
    if (!valor && !porDocumento.length) { out.push({ carpeta: c, valor: null, porDocumento, detalle: 'ningún documento del club decide' }); continue; }
    // los documentos que decidió el paso A2 (Claude) quedan en la `evidencia` del ajuste ("A2 (Claude): <md>; <md>"), para la
    // auditoría a posteriori (--auditar-a2).
    const a2 = props.filter(({ r }) => r.propuesta && /^A2 \(Claude\)/.test(r.motivo || '')).map(({ e }) => e.md);
    const evA2 = (mds) => (mds.length ? `A2 (Claude): ${mds.join('; ')}` : null);
    if (ejecutar) {
      if (valor) agregarAjuste({ pdf: c, campo: 'perimetro', valor, motivo: `perimetro-senales.mjs: ${evidencia}`, evidencia: evA2(a2.filter((m) => !porDocumento.some((d) => m === d.pdf.replace(/\.pdf$/i, '.md')))), autor: 'perimetro-senales' });
      for (const d of porDocumento) agregarAjuste({ pdf: d.pdf, campo: 'perimetro', valor: d.valor, motivo: `perimetro-senales.mjs: el ejercicio ${d.cierre} se publicó solo ${d.valor}${valor ? ` (el club es ${valor})` : ' (el club no tiene un perímetro único)'}; ${evidencia}`, evidencia: evA2(a2.filter((m) => m === d.pdf.replace(/\.pdf$/i, '.md'))), autor: 'perimetro-senales' });
    }
    out.push({ carpeta: c, valor, porDocumento, escrito: ejecutar, detalle: `${evidencia}${porDocumento.length ? `; por documento: ${porDocumento.map((d) => `${d.pdf.split('/').pop()} ${d.valor}`).join(', ')}` : ''}` });
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
  // --auditar-a2 <carpeta>: la auditoría a posteriori del paso A2. Junta los documentos que decidió A2 en una corrida real (los
  // que nombra la `evidencia` de un ajuste `perimetro` firmado por perimetro-senales) y deja un pedido por documento para un subagente de la
  // sesión, que abre el .md y dice, con cita, si el estado de resultados es del grupo o de la sociedad sola (instruccion.txt). Un error se
  // corrige con un ajuste del documento, y sube el umbral, cambia un peso o agrega un criterio; después se mide otra vez con
  // Admin/mediciones/perimetro-a2-medicion.txt.
  const auditarF = flagVal('--auditar-a2');
  if (auditarF) {
    const { writeFileSync } = await import('node:fs');
    const aj = readFileSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
      .filter((a) => a.campo === 'perimetro' && a.autor === 'perimetro-senales' && !a.anulado && /^A2 \(Claude\): /.test(a.evidencia || ''));
    const pedidos = []; const vistos = new Set();
    for (const a of aj) for (const md of a.evidencia.replace(/^A2 \(Claude\): /, '').split('; ')) {
      if (vistos.has(md) || !existsSync(resolve(ROOT, md))) continue; vistos.add(md);
      pedidos.push({ n: pedidos.length + 1, md, decidido: a.valor, ajuste: a.pdf, fecha: a.fecha });
    }
    const dir = carpetaDeTrabajo('--auditar-a2', auditarF); mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'instruccion.txt'), `Para cada pedido de pedidos.jsonl: abrí el .md (md) con grep/sed por partes, ubicá el estado de resultados del ejercicio y decidí si es CONSOLIDADO (incluye a la sociedad y a sus controladas) o INDIVIDUAL (la sociedad sola). El pipeline decidió "decidido". Escribí <n>.json con {"perimetro": "consolidado"|"individual"|"no sé", "coincide": true|false, "cita": "línea del .md y qué dice", "explicacion": "una o dos oraciones"}. No edites nada del repositorio.`);
    writeFileSync(resolve(dir, 'pedidos.jsonl'), pedidos.map((p) => JSON.stringify(p)).join('\n') + (pedidos.length ? '\n' : ''));
    console.log(`${pedidos.length} documento(s) decididos por A2 para auditar en ${auditarF}${pedidos.length ? ' (instruccion.txt + pedidos.jsonl)' : ''}.`); return;
  }
  // --decidir-clubes <lista de carpetas> [--solo-cache]: ENSAYO de la decisión de perímetro de cada club (la misma de lote.mjs),
  // sin escribir ajustes; con --solo-cache, A2 solo usa respuestas guardadas (lo que falta queda pendiente, no se paga).
  const decidirF = flagVal('--decidir-clubes');
  if (decidirF) {
    const registro = readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
    const carpetas = readFileSync(resolve(ROOT, decidirF), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    const { ajustePerimetroDe } = await import('./ajustes.mjs');
    for (const c of carpetas) {
      const pdfs = registro.filter((x) => x.pdf.startsWith(c)).map((x) => x.pdf);
      const [r] = await fijarPerimetroDeClubes(pdfs, { registro, ejecutar: false, jev: true, faltaPerimetro: () => true });
      const ajuste = ajustePerimetroDe(c)?.valor || '—';
      console.log(`${c.padEnd(48)} club: ${String(r?.valor ?? 'sin decidir').padEnd(12)} ajuste actual: ${String(ajuste).padEnd(12)} por documento: ${(r?.porDocumento || []).map((d) => `${d.pdf.split('/').pop()} ${d.valor}`).join(', ') || '—'}${r?.pendienteJev ? ' (A2 sin caché)' : ''}`);
    }
    return;
  }
  const evaluarA3 = flagVal('--evaluar-a3');
  if (evaluarA3) {
    const dir = resolve(ROOT, evaluarA3); const { ajustePerimetroDe } = await import('./ajustes.mjs');
    const cuenta = { bien: 0, mal: 0, noDecide: 0, sinVerdad: 0 };
    for (const l of readFileSync(resolve(dir, 'pedidos.jsonl'), 'utf8').split('\n')) {
      if (!l.trim()) continue; const p = JSON.parse(l);
      const lineas = readFileSync(resolve(ROOT, p.md), 'utf8').split('\n'); const ped = pedidoA3(lineas, deporteDePdf(p.md.replace(/\.md$/, '.pdf')));
      const f = resolve(dir, `${p.n}.json`); const datos = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
      const c = compuertaA3(datos, ped.mandadas, lineas); const verdad = ajustePerimetroDe(p.md.replace(/\.md$/, '.pdf'))?.valor || null;
      const marca = !c.perimetro ? 'no decide' : !verdad ? 'sin verdad' : c.perimetro === verdad ? 'ok' : 'MAL';
      cuenta[{ 'no decide': 'noDecide', 'sin verdad': 'sinVerdad', ok: 'bien', MAL: 'mal' }[marca]]++;
      console.log(`${marca.padEnd(10)} ${p.md.replace(/^Clubes\//, '').padEnd(64)} A3: ${c.perimetro || '—'}${c.perimetro ? ` ("${c.controlada}" L${c.linea})` : ` (${c.motivo})`} · fijado: ${verdad || '—'}`);
    }
    console.log(`\nA3: ${cuenta.bien} bien, ${cuenta.mal} mal, ${cuenta.noDecide} no decide, ${cuenta.sinVerdad} sin perímetro fijado para comparar`); return;
  }
  const verdadF = flagVal('--verdad'); const listaF = flagVal('--lista'); const mdF = flagVal('--md');
  let items = [];
  if (verdadF) items = readFileSync(resolve(ROOT, verdadF), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => { const [md, per] = l.split('\t'); return { md, verdad: per }; });
  else if (listaF) items = readFileSync(resolve(ROOT, listaF), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((p) => ({ md: p.replace(/\.pdf$/i, '.md') }));
  else if (mdF && args.includes('--ver-a2')) { const L = readFileSync(resolve(ROOT, mdF), 'utf8').split('\n'); console.log(textoA2(titulosDelDocumento(L), portadaDelDocumento(L))); return; } // lo que recibiría Claude en A2, sin llamarlo
  else if (mdF) items = [{ md: mdF }];
  else { console.error('Uso: --verdad <tsv> | --lista <txt> | --md <archivo.md>  [--jev] [--detalle]  (ver la cabecera)'); process.exit(1); }

  // --exportar-a2 <carpeta>: para medir A2 sin API. Por cada documento que pasaría por A2 y no está en caché, escribe <n>.txt con el texto
  // que recibiría Claude y pedidos.jsonl con { n, md, clave }. Las respuestas ({ clave, md, datos } por línea) se agregan a
  // Generados/_cache/claude-perimetro.jsonl y la corrida con --jev las toma de ahí. La instrucción (SISTEMA_A2) va en sistema.txt.
  const exportarF = flagVal('--exportar-a2');
  if (exportarF) {
    const dir = carpetaDeTrabajo('--exportar-a2', exportarF); mkdirSync(dir, { recursive: true });
    const { writeFileSync } = await import('node:fs');
    // los pedidos de un club de otro deporte llevan su propia instrucción: sistema-<deporte>.txt (sistema.txt es la de fútbol, como siempre)
    writeFileSync(resolve(dir, 'sistema.txt'), sistemaA2('futbol'));
    if (!cacheA2) { cacheA2 = new Map(); if (existsSync(CACHE_A2)) for (const l of readFileSync(CACHE_A2, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); cacheA2.set(j.clave, j); } catch { /* línea rota */ } } }
    const pedidos = []; let n = 0;
    for (const it of items) {
      if (!existsSync(resolve(ROOT, it.md))) continue;
      const md = readFileSync(resolve(ROOT, it.md), 'utf8');
      if (tablasDeIngresos(md).tablas.length) continue; // el paso A decide: no pasa por A2
      const L = md.split('\n'); const tit = titulosDelDocumento(L);
      if (!tit.some((t) => t.tabla)) continue;
      const user = textoA2(tit, portadaDelDocumento(L)); const dep = deporteDePdf(it.md.replace(/\.md$/, '.pdf')); const clave = createHash('sha1').update(JSON.stringify([sistemaA2(dep), user])).digest('hex');
      if (cacheA2.has(clave)) continue;
      if (dep !== 'futbol') writeFileSync(resolve(dir, `sistema-${dep || 'sin-deporte'}.txt`), sistemaA2(dep));
      n++; writeFileSync(resolve(dir, `${n}.txt`), user); pedidos.push({ n, md: it.md, clave });
    }
    writeFileSync(resolve(dir, 'pedidos.jsonl'), pedidos.map((x) => JSON.stringify(x)).join('\n') + '\n');
    console.log(`${pedidos.length} pedido(s) en ${exportarF}`); return;
  }
  // --exportar-a3 <carpeta>: los pedidos de A3 de los documentos de la lista donde A2 (guardado) ve los dos
  // estados: <n>.txt con el texto que recibiría Claude, sistema.txt, esquema.json y pedidos.jsonl { n, md, clave }. Las respuestas van en
  // <n>.json (las escribe un subagente). --evaluar-a3 <carpeta>: aplica la compuerta a cada <n>.json y lo compara con el ajuste `perimetro`
  // ya fijado (del documento o del club). No escribe en la caché: es una medición.
  const exportarA3 = flagVal('--exportar-a3');
  if (exportarA3) {
    const dir = carpetaDeTrabajo('--exportar-a3', exportarA3); mkdirSync(dir, { recursive: true });
    const { writeFileSync } = await import('node:fs');
    writeFileSync(resolve(dir, 'sistema.txt'), sistemaA3('futbol')); writeFileSync(resolve(dir, 'esquema.json'), JSON.stringify(ESQUEMA_A3, null, 1));
    const pedidos = [];
    for (const it of items) {
      if (!existsSync(resolve(ROOT, it.md))) continue;
      const r = await proponer(it.md, { soloCache: true });
      if (r.pasoA !== 'a2-los-dos') continue;
      const depA3 = deporteDePdf(it.md.replace(/\.md$/, '.pdf')); const p = pedidoA3(readFileSync(resolve(ROOT, it.md), 'utf8').split('\n'), depA3); if (!p) continue;
      if (depA3 !== 'futbol') writeFileSync(resolve(dir, `sistema-${depA3 || 'sin-deporte'}.txt`), sistemaA3(depA3));
      const n = pedidos.length + 1; writeFileSync(resolve(dir, `${n}.txt`), p.user); pedidos.push({ n, md: it.md, clave: p.clave });
    }
    writeFileSync(resolve(dir, 'pedidos.jsonl'), pedidos.map((x) => JSON.stringify(x)).join('\n') + '\n');
    console.log(`${pedidos.length} pedido(s) de A3 en ${exportarA3}`); return;
  }
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

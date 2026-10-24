// ============================================================================
// tools/perimetro-senales-base.mjs — los ayudantes del perímetro: los argumentos, la lectura de tablas, las controladas, Jev y su caché
// Mudado de tools/perimetro-senales.mjs sin cambiar una línea (salvo `export`); tools/perimetro-senales.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, relative, isAbsolute, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { deporteEnFrase } from './deporte-club.mjs';
import { linea } from './perimetro-senales.mjs';

const ROOT = resolve(import.meta.dirname, '..');

export const args = process.argv.slice(2);
export const flagVal = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
// --auditar-a2 y --exportar-a2 escriben en la carpeta que reciben: con `--auditar-a2 Clubes/Grecia/Aris` los pedidos
// quedaron al lado de los PDFs, en lo que se publica. Antes de escribir, la carpeta tiene que estar fuera del repo (scratch) o dentro
// de una carpeta que netlify.toml borra del deploy (`rm -rf X || true`, la misma lectura que checkDeployInterno() de audit.js; así no
// hay una segunda lista que mantener). Si no, frena sin escribir nada.
export function carpetaDeTrabajo(flag, ruta) {
  const dir = resolve(ROOT, ruta); const rel = relative(ROOT, dir);
  if (rel.startsWith('..') || isAbsolute(rel)) return dir;
  const toml = existsSync(resolve(ROOT, 'netlify.toml')) ? readFileSync(resolve(ROOT, 'netlify.toml'), 'utf8') : '';
  const borradas = new Set([...toml.matchAll(/rm -rf ([^\n|]+?)\s*\|\|\s*true/g)].flatMap((m) => m[1].trim().split(/\s+/).map((d) => d.replace(/\/$/, ''))));
  if (rel && borradas.has(rel.split(sep)[0])) return dir;
  console.error(`${flag} ${ruta}: esa carpeta se publica en el sitio (netlify.toml no la saca del deploy). Usá una carpeta interna, por ejemplo Admin/mediciones/<nombre>, o una fuera del repo. No se escribió nada.`);
  process.exit(1);
}
export const USE_JEV = args.includes('--jev');
// --modelo: el modelo del paso A2 en ESTA corrida, para medir. Opus (sin --modelo) es el de siempre y usa las claves de caché de
// siempre; con otro modelo, la clave incluye el modelo y la respuesta no se mezcla con las de Opus.
export const MODELOS_A2 = { opus: 'claude-opus-5-5', sonnet: 'claude-sonnet-5-5' };
export const MODELO_A2 = flagVal('--modelo');
if (MODELO_A2 != null && (!MODELOS_A2[MODELO_A2] || !USE_JEV)) { console.error('--modelo opus|sonnet va solo con --jev'); process.exit(1); }
export const DETALLE = args.includes('--detalle');
export const SOLO_CACHE = args.includes('--solo-cache'); // A2 solo con respuestas guardadas (ver --decidir-clubes)

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
export const esTitulo = (l, prev = '', next = '') => /^\s*#/.test(l) || /^\s*\*\*[^|]{3,}\*\*\s*$/.test(l)
  || (l.trim().length >= 6 && l.trim().length <= 90 && !l.trim().startsWith('|') && !/[.;:]\s*$/.test(l.trim()) && !prev.trim() && !next.trim());
export const limpiar = (s) => s.replace(/[*_`#]/g, '').replace(/\s+/g, ' ').trim();

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
export function filasConNumeros(lineas, k) {
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
export function totalDe(tablas) {
  if (!tablas.length) return null;
  const mejor = Math.max(...tablas.map((t) => t.rango));
  const c = tablas.filter((t) => t.rango === mejor);
  const cuenta = new Map();
  for (const t of c) { const k = Math.abs(t.actual); cuenta.set(k, (cuenta.get(k) || 0) + 1); }
  const elegido = [...cuenta.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0];
  return c.find((t) => Math.abs(t.actual) === elegido);
}

// Lleva b a la escala de a cuando uno está en miles y el otro en unidades (o millones).
export function aEscala(a, b) {
  if (!a || !b) return b;
  for (const f of [1, 1000, 1 / 1000, 1e6, 1e-6]) { const r = (b * f) / a; if (r > 0.3 && r < 3) return b * f; }
  return b;
}

// ---------------------------------------------------------------- C3: Jev
const CONTROL_RX = /area di consolidamento|societ[aà] controllat|imprese controllate|controllate|subsidiar|controlled compan/i;
export function textoControladas(md) {
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
export async function preguntarJev(texto, deporte) {
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

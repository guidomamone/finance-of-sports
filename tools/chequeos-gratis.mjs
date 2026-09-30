#!/usr/bin/env node
// ============================================================================
// tools/chequeos-gratis.mjs — ¿qué páginas de una transcripción se pueden dar por buenas SIN pagar una API?
//
// QUÉ HACE
//   Recibe un .md transcripto (normalmente el de Mistral) y el PDF del que salió, y clasifica cada página en:
//     - `prosa`           : la página no tiene tablas con cifras y casi no tiene cifras sueltas. No se valida (no hay nada que
//                           cargar al sitio desde ahí).
//     - `validada-gratis` : TODAS las cifras significativas de la página quedaron respaldadas por al menos uno de los cuatro
//                           chequeos gratis de abajo (el campo `chequeo` dice cuáles se usaron).
//     - `dudosa`          : quedó al menos una cifra sin respaldo (o una cifra casi igual a una del texto del PDF, que es la firma
//                           de una lectura mal hecha). SOLO estas páginas deberían ir a Gemini / Claude por API.
//
//   "Cifra significativa" = un número de 4 o más dígitos (umbral `minDigitos`) que no sea un año suelto (1987, 2024), ni parte
//   de una fecha (31.12.2005, 2024-06-30). Los números de página y de nota tienen 1-3 dígitos y quedan afuera solos.
//
// POR QUÉ (decisión de Guido del 2026-09-30)
//   Hasta ahora tools/resolver-inventario.mjs mandaba a Claude/Gemini cualquier página que no coincidiera con el texto del PDF, y
//   en los escaneos, el documento entero a Gemini y las páginas que difieren a Claude — incluidas páginas de prosa. En el HANDOFF
//   (Admin/HANDOFF-pipeline.md, "Qué falta" 2a y 2b) quedó medido que el chequeo contra el texto del PDF marcaba de más (Alverca:
//   ~8 de 17 dudas eran prosa con un "3000" suelto; Rio Ave: 13 de 19 dudas, 1 real) y que la aritmética casi no se usaba. La
//   regla nueva: la validación paga se hace SOLO sobre páginas con números y SOLO si esta cascada gratis no alcanza.
//
// LA CASCADA (por página; cada chequeo "respalda" celdas/cifras, y la página se valida si no queda ninguna sin respaldo)
//   1. texto-pdf   : la cifra está en el texto que el PDF trae adentro (pdftotext -layout, página por página). Se cuenta como
//                    MULTICONJUNTO: si el .md tiene tres veces "8821" y el PDF una sola, dos quedan sin respaldo (caso real de los
//                    formularios belgas, donde los códigos de rubro 8821/8321 aparecen en la misma página y un 3 leído como 8
//                    se "respaldaba" con el otro código). Solo aplica a PDFs con capa de texto real (mismos umbrales que
//                    tools/verify-numbers.mjs: >= 30 cifras y >= 150 caracteres por página en el documento, y que el texto no
//                    sea mojibake — cobertura >= 25%).
//   2. sumas       : dentro de cada tabla Markdown, columna por columna, una celda que es la suma EXACTA (con tolerancia de
//                    redondeo de la unidad impresa, ver `tolSuma`) de >= `minSumandos` celdas contiguas de arriba (o de abajo,
//                    si `sumasHaciaAbajo`) respalda a esa celda y a todos sus sumandos. Una lectura mal hecha de un dígito en un
//                    sumando rompe la suma, así que ese sumando queda sin respaldo. Es la misma idea que filasSuma() de
//                    tools/filas-rubro.mjs, pero con tolerancia de redondeo en vez del 0,05% de allá (con 0,05%, en 1.000.000 se
//                    toleran 500 unidades: un 3 leído como 8 en las centenas pasaba como "cierra").
//   3. produccion  : si el club-año N-1 está cargado en el sitio (data/<club>-data.js, cargado con vm como hace
//                    tools/proponer-carga.mjs), una celda que coincide EXACTO (a la precisión impresa, probando escala en
//                    unidades / miles / millones) con un amountNative o un total oficial de N-1 queda respaldada: es la columna
//                    comparativa del año anterior.
//   4. balance     : en todo el documento, si un "Total activo" es igual a un "Total pasivo + patrimonio" (etiquetas en ~12
//                    idiomas), esas celdas quedan respaldadas en sus páginas.
//
// NÚMEROS MEDIDOS (node tools/chequeos-gratis.mjs --prueba, 2026-09-30; curva completa y cada caso en Admin/test-chequeos-gratis.md)
//   Base: los 104 documentos que el resolver ya resolvió (3.134 páginas, $38,98 registrados). Entrada = lo que el resolver tenía en
//   la mano (previo-mistral 67, previo-legado 21, mistral-redo 15, previo-gemini 1); verdad = el .md corregido de hoy. 178 páginas
//   con un error real de lectura (163 en páginas con números según tools/paginas-con-numeros.mjs; las otras 15 son identificadores
//   en prosa: INN/cuentas bancarias rusas, números de organización noruegos, sellos manuscritos).
//   Con los umbrales por defecto (G2 en la curva):
//     - validada-gratis 750 (23,9%), prosa 1.102 (35,2%), dudosa 1.282 (40,9%).
//     - recall en páginas con números 163/163 (100%); total 163/178 (los 15 escapes son todos `prosa`, ninguno `validada-gratis`).
//     - ahorro aproximado por proporción de páginas: $19,14 de $38,98 (49%); de las 603 páginas que el resolver pagó, 177 no se
//       habrían mandado.
//     - de las 1.282 dudosas, 1.136 son de documentos SIN capa de texto (escaneos): ahí la aritmética rescata muy poco (~25 páginas) y
//       el ahorro sale casi todo de no mandar la prosa. En los documentos con texto quedan 146 dudosas de 1.171 páginas.
//   La propuesta literal ("una tabla que cierra con >= 3 sumandos valida la página") deja pasar 37 páginas con errores reales como
//   buenas (recall 77%): por eso la validación es CELDA POR CELDA, no por tabla.
//   El chequeo 3 (producción N-1) no se pudo medir: ninguno de los 104 documentos tiene su año anterior cargado en el sitio (son
//   ejercicios históricos de clubes cuyo sitio arranca años después). Queda implementado, apagable con usarProduccion:false.
//
// USO
//   node tools/chequeos-gratis.mjs <archivo.md> [--pdf <archivo.pdf>] [--json]   # clasifica las páginas de un documento
//   node tools/chequeos-gratis.mjs --prueba [--detalle]                              # la medición contra los documentos ya resueltos
//   Como módulo:  import { chequearPaginas } from './chequeos-gratis.mjs'
//                 await chequearPaginas({ pdfPath, mdText, club, year }) -> [{ pagina, estado, chequeo, detalle }]
//
// Es 100% gratis: pdftotext y aritmética. No llama a ninguna API.
// ============================================================================

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import vm from 'node:vm';
import { NUM_RE, norm as digitos, THRESHOLDS as VN } from './verify-numbers.mjs';
import { numeroDe, norm as normTxt } from './filas-rubro.mjs';
import { paginasConNumeros } from './paginas-con-numeros.mjs';
import { TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE } from './vocabulario.mjs';

const root = resolve(import.meta.dirname, '..');

// ---------------------------------------------------------------- umbrales
// Los valores por defecto salen de la curva de Admin/test-chequeos-gratis.md: son los que dan recall 100% sobre los errores
// reales en páginas con tablas con el mayor ahorro. Si se cambian, volver a correr `--prueba`.
export const UMBRALES = {
  minDigitos: 4,          // cifras de menos dígitos no se validan (notas, páginas, porcentajes)
  prosa: 'paginas-con-numeros', // quién decide qué es prosa: 'paginas-con-numeros' (tools/paginas-con-numeros.mjs, con vecinas),
                          // 'sin-vecinas' (el mismo sin vecinas) o 'propia' (sin tablas numéricas y <= prosaMax cifras)
  prosaMax: 2,            // solo para prosa 'propia'
  minSumandos: 2,         // una suma cuenta si tiene al menos esta cantidad de sumandos distintos de cero
  tolSuma: 'redondeo',    // 'exacto' (diferencia < media unidad impresa) | 'redondeo' (hasta ceil(n/2) unidades, n = sumandos)
  sumasHaciaAbajo: true,  // también "total arriba, detalle abajo" (Revenue 100 / de lo cual A 60 / B 40)
  maxSinRespaldo: 3,      // cuántas cifras sin respaldo se toleran en una página validada (ver toleranciaSoloConTexto)
  toleranciaSoloConTexto: true, // la tolerancia de arriba solo vale en páginas con texto del PDF: ahí una cifra sin respaldo ya pasó el
                          // filtro de "casi igual a una del PDF", así que es texto de una imagen (sello, logo), no una lectura mala.
                          // En un escaneo no hay contra qué hacer ese filtro y una cifra sin respaldo puede ser justo el error.
  usarProduccion: true,
  usarBalance: true,
};

// ---------------------------------------------------------------- utilidades de páginas y cifras
// Parte un .md en páginas por sus marcas "--- pág. N ---" (mismo formato que usan todos los motores del proyecto).
export function paginasDe(md) {
  const re = /^--- pág\. (\d+) ---[ \t]*\r?\n?/gm;
  const marks = [...md.matchAll(re)];
  return marks.map((m, i) => ({ n: Number(m[1]), body: md.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : md.length) }));
}

// Fechas: se tapan con espacios ANTES de buscar cifras. Sin esto, "31.12.2005" aparece como la cifra "3112" + el año 2005 y
// "2024-06-30" como "2024" + nada — y como en un escaneo ninguna fecha cierra una suma, cada página con una fecha en el
// encabezado quedaba dudosa por culpa de la fecha.
const FECHA_RE = /\b\d{1,2}[./-]\d{1,2}[./-](?:\d{4}|\d{2})\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\.\d{1,2}\.(?=\s*[-–—]|\s*$)/gm;
// Además, miles con espacio y decimales con PUNTO (formato suizo, "5 525.24"): NUM_RE solo acepta decimales con coma después de
// grupos con espacio, así que "5 525.24" salía como "525.24" (52524) y "5525.24" como 552524 — la misma cifra parecía distinta entre dos
// lecturas (falso "error real" en Basel 2011 pág. 17). Se juntan los grupos antes de buscar cifras.
const tapar = (t) => t.replace(FECHA_RE, (m) => ' '.repeat(m.length)).replace(/(^|[^\d.,])(\d{1,3}(?: \d{3})+\.\d{1,2})(?![\d.,])/gm, (m, a, b) => a + b.replace(/ /g, ''));
const esAnio = (raw, d) => d.length === 4 && /^(18|19|20)\d\d$/.test(d) && !/[.,\s]/.test(raw);

// Todas las cifras significativas de un texto, en orden: [{ d: dígitos sin separadores, raw }].
export function cifras(texto, minDigitos = UMBRALES.minDigitos) {
  const out = [];
  for (const m of tapar(texto).matchAll(NUM_RE)) {
    const d = digitos(m[0]);
    if (d.length < minDigitos || esAnio(m[0], d)) continue;
    out.push({ d, raw: m[0] });
  }
  return out;
}

// Tablas Markdown de una página: [{ filas: [[celda, ...]], lineas: [índice de línea] }]. Se toleran filas con distinta
// cantidad de celdas (Mistral a veces corre una celda).
export function tablasDe(body) {
  const lines = body.split('\n');
  const tablas = []; let cur = null;
  lines.forEach((ln, i) => {
    const t = ln.trim();
    if (t.startsWith('|')) {
      if (!cur) { cur = { filas: [] }; tablas.push(cur); }
      if (/^\|\s*:?-{2,}/.test(t)) return; // separador | --- | --- |
      cur.filas.push(t.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
    } else if (t !== '') cur = null;
  });
  return tablas.filter((tb) => tb.filas.length >= 2);
}

// Valor numérico de una celda (o null) y su precisión impresa (1 = enteros, 0.01 = dos decimales). Acepta los guiones
// tipográficos como signo menos ("–25 078 668,29", Basel) y saca el negrita de Mistral.
function valorCelda(c) {
  const s = tapar(String(c).replace(/\*\*/g, '').replace(/[–—−]/g, '-')).trim();
  if (!s || !/\d/.test(s)) return null;
  if (/[a-zA-ZÀ-ɏͰ-ӿ]{2,}/.test(s)) return null; // texto con cifras adentro: no es una celda numérica
  const ms = [...s.matchAll(NUM_RE)];
  if (ms.length !== 1) return null;
  const raw = ms[0][0]; const d = digitos(raw);
  const v = numeroDe(s.replace(/\s*%$/, ''));
  if (v === null) return null;
  const dec = /[.,](\d{1,2})$/.exec(raw) && !/[.,]\d{3}$/.test(raw) ? /[.,](\d{1,2})$/.exec(raw)[1].length : 0;
  return { v, unidad: 10 ** -dec, d };
}

// ---------------------------------------------------------------- chequeo 2: sumas dentro de cada tabla
// Devuelve, por tabla, las celdas respaldadas (clave "t,f,c") y la cantidad de cierres encontrados.
export function respaldoSumas(tablas, U = UMBRALES) {
  const ok = new Set(); let cierres = 0;
  tablas.forEach((tb, ti) => {
    const ncol = Math.max(...tb.filas.map((f) => f.length));
    for (let c = 1; c < ncol; c++) { // la columna 0 es la etiqueta
      const col = [];
      tb.filas.forEach((f, fi) => { const x = valorCelda(f[c] ?? ''); if (x) col.push({ ...x, key: `${ti},${fi},${c}` }); });
      const probar = (seq) => {
        for (let i = 1; i < seq.length; i++) {
          const tot = seq[i]; if (!tot.v) continue;
          let acc = 0; let nz = 0; let unidad = tot.unidad;
          for (let k = i - 1; k >= Math.max(0, i - 60); k--) {
            acc += seq[k].v; if (seq[k].v) nz++; unidad = Math.max(unidad, seq[k].unidad);
            if (nz < U.minSumandos) continue;
            const tol = U.tolSuma === 'exacto' ? unidad * 0.5 : unidad * Math.max(1, Math.ceil(nz / 2));
            if (Math.abs(acc - tot.v) < tol + 1e-9) {
              cierres++; ok.add(tot.key); for (let j = k; j < i; j++) ok.add(seq[j].key);
              break;
            }
          }
        }
      };
      probar(col);
      if (U.sumasHaciaAbajo) probar([...col].reverse());
    }
  });
  return { ok, cierres };
}

// ---------------------------------------------------------------- chequeo 2b: sumas HORIZONTALES (Versión 313)
// Las tablas de movimiento (saldo inicial + altas - bajas = saldo final; notas rusas, IFRS, "movimiento de bienes de uso") hacen la cuenta
// por FILA, no por columna: las sumas de arriba no las ven (Rubin Kazan 2025, 8 de 11 páginas "con reserva" sin ninguna suma vertical que
// cierre). En cada fila con 3 a 7 celdas numéricas se prueba si ALGUNA celda es igual a una combinación con signo (+/-) de TODAS las
// demás. Exige >= 3 celdas y valores de >= 3 dígitos para que una coincidencia por azar sea improbable.
export function respaldoFilas(tablas) {
  const ok = new Set(); let cierres = 0;
  tablas.forEach((tb, ti) => tb.filas.forEach((f, fi) => {
    const cel = []; f.forEach((c, ci) => { if (ci === 0) return; const x = valorCelda(c ?? ''); if (x && x.v !== 0) cel.push({ ...x, key: `${ti},${fi},${ci}` }); });
    if (cel.length < 3 || cel.length > 7 || cel.filter((x) => Math.abs(x.v) >= 100).length < 3) return;
    for (let t = 0; t < cel.length; t++) {
      const otros = cel.filter((_, i) => i !== t);
      const unidad = Math.max(...cel.map((x) => x.unidad));
      let hit = false;
      for (let m = 0; m < (1 << otros.length) && !hit; m++) {
        let acc = 0; otros.forEach((x, i) => { acc += (m >> i) & 1 ? -Math.abs(x.v) : Math.abs(x.v); });
        if (Math.abs(Math.abs(acc) - Math.abs(cel[t].v)) < unidad * Math.max(1, Math.ceil(otros.length / 2)) + 1e-9) hit = true;
      }
      if (hit) { cierres++; cel.forEach((x) => ok.add(x.key)); break; }
    }
  }));
  return { ok, cierres };
}

// ---------------------------------------------------------------- chequeo 4: activo = pasivo + patrimonio (todo el documento)
// Versión 316: las listas de "total del activo" / "total del pasivo" salen de tools/vocabulario.mjs (29 idiomas; antes ~12 a mano acá).
const ACTIVO_RE = TOTAL_ACTIVO_RE;
const PASIVO_RE = TOTAL_PASIVO_RE;
function respaldoBalance(paginas) {
  const act = []; const pas = [];
  paginas.forEach((p) => tablasDe(p.body).forEach((tb, ti) => tb.filas.forEach((f, fi) => {
    const lab = normTxt(String(f[0] || '').replace(/\*\*/g, ''));
    const dest = ACTIVO_RE.test(lab) ? act : PASIVO_RE.test(lab) ? pas : null;
    if (!dest) return;
    f.forEach((c, ci) => { if (ci === 0) return; const x = valorCelda(c); if (x && x.d.length >= 4) dest.push({ n: p.n, key: `${ti},${fi},${ci}`, d: x.d }); });
  })));
  const porPag = new Map();
  const add = (e) => { if (!porPag.has(e.n)) porPag.set(e.n, new Set()); porPag.get(e.n).add(e.key); };
  for (const a of act) for (const b of pas) if (a.d === b.d) { add(a); add(b); }
  return porPag;
}

// ---------------------------------------------------------------- chequeo 3: columna comparativa contra producción
let SITE = null;
export function cargarSitio() {
  if (SITE) return SITE;
  const sandbox = { console: { log() {}, warn() {}, error() {} }, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...readdirSync(resolve(root, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f)];
  for (const rel of files) vm.runInContext(readFileSync(resolve(root, rel), 'utf8'), ctx, { filename: rel });
  SITE = vm.runInContext('window.CLUB_GENERIC_DATA', ctx) || {};
  return SITE;
}
// Importes de producción (en millones de moneda nativa, como los guarda el sitio) del año `y`.
function importesProduccion(club, y) {
  const cd = cargarSitio()[club]; if (!cd) return [];
  const out = [];
  for (const k of ['revenueLinesByYear', 'expenseLinesByYear']) for (const l of cd[k]?.[y] || []) if (l.amountNative) out.push(Math.abs(l.amountNative));
  const m = cd.fiscalYearMeta?.[y] || {};
  for (const k of ['officialTotalRevenue', 'officialTotalExpenses', 'officialPAT']) if (m[k]) out.push(Math.abs(m[k]));
  return out;
}
function respaldoProduccion(tablas, importes) {
  const ok = new Set(); if (!importes.length) return ok;
  tablas.forEach((tb, ti) => tb.filas.forEach((f, fi) => f.forEach((c, ci) => {
    if (ci === 0) return; const x = valorCelda(c); if (!x || x.d.length < 5) return;
    const v = Math.abs(x.v);
    for (const mult of [1e-6, 1e-3, 1]) {
      const tol = x.unidad * mult * 0.5 + 1e-9; // coincidencia a la precisión impresa, ni un dígito de más
      if (importes.some((a) => Math.abs(v * mult - a) < tol)) { ok.add(`${ti},${fi},${ci}`); break; }
    }
  })));
  return ok;
}

// ---------------------------------------------------------------- chequeo 1: texto del PDF
function textoPdfPorPagina(pdfPath) {
  try {
    const buf = execFileSync('pdftotext', ['-layout', pdfPath, '-'], { maxBuffer: 512 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    const parts = buf.toString('utf8').split('\f');
    if (parts.length && parts[parts.length - 1].trim() === '') parts.pop();
    return parts;
  } catch { return []; }
}
function hamming(a, b) { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; }
function unaDeDiferencia(a, b) { // b tiene un dígito más que a
  for (let i = 0; i < b.length; i++) if (b.slice(0, i) + b.slice(i + 1) === a) return true;
  return false;
}
// ¿Es una lectura mal hecha de alguna cifra del PDF? (mismo largo y 1-2 dígitos distintos, o un dígito de más/de menos)
function casiIgual(d, pdfSet) {
  for (const p of pdfSet) {
    if (p === d) continue;
    if (p.length === d.length && hamming(p, d) <= (d.length >= 7 ? 2 : 1) && p.replace(/0/g, '').length >= 2) return p;
    if (Math.abs(p.length - d.length) === 1 && Math.max(p.length, d.length) >= 5) {
      const [s, l] = p.length < d.length ? [p, d] : [d, p];
      if (l !== s + '0' && unaDeDiferencia(s, l)) return p;
    }
  }
  return null;
}

// ¿El documento tiene capa de texto usable? Mismos umbrales que tools/verify-numbers.mjs.
function capaDeTexto(pdfTexts, paginas, U) {
  if (!pdfTexts.length) return { aplica: false, motivo: 'sin texto del PDF' };
  const pdfNums = new Set(); let chars = 0;
  for (const t of pdfTexts) { chars += t.replace(/\s/g, '').length; for (const x of cifras(t, U.minDigitos)) pdfNums.add(x.d); }
  if (pdfNums.size < VN.minPdfNumbers || chars / pdfTexts.length < VN.minCharsPerPage) return { aplica: false, motivo: `escaneo (${pdfNums.size} cifras, ${Math.round(chars / pdfTexts.length)} caracteres/pág.)` };
  const mdNums = new Set(); for (const p of paginas) for (const x of cifras(p.body, U.minDigitos)) mdNums.add(x.d);
  const cob = [...pdfNums].filter((d) => mdNums.has(d)).length / pdfNums.size;
  if (cob < VN.garbledCoverage) return { aplica: false, motivo: `texto del PDF ilegible (cobertura ${(cob * 100).toFixed(0)}%)` };
  return { aplica: true };
}

// ---------------------------------------------------------------- la cascada
// pdfTexts / importes se pueden pasar ya calculados (la prueba los reusa entre configuraciones de umbrales).
export async function chequearPaginas({ pdfPath, mdText, club, year, umbrales = {}, pdfTexts = null, importes = null }) {
  const U = { ...UMBRALES, ...umbrales };
  const paginas = paginasDe(mdText);
  const textos = pdfTexts ?? (pdfPath && existsSync(pdfPath) ? textoPdfPorPagina(pdfPath) : []);
  const capa = capaDeTexto(textos, paginas, U);
  const imp = importes ?? (U.usarProduccion && club && year ? importesProduccion(club, Number(year) - 1) : []);
  const balance = U.usarBalance ? respaldoBalance(paginas) : new Map();
  // Qué páginas son "con números" lo decide tools/paginas-con-numeros.mjs (medido allá contra 222 ejercicios cargados: con vecinas
  // cubre 99% de las páginas útiles). Lo que no selecciona es `prosa` y no se valida.
  const conNumeros = U.prosa === 'propia' ? null : new Set(paginasConNumeros({ mdText, vecinas: U.prosa !== 'sin-vecinas' }).paginas);
  const out = [];

  for (const p of paginas) {
    const tablas = tablasDe(p.body);
    // Cifras de la página con su ubicación: las de tabla llevan "t,f,c" (para que las sumas respalden la CELDA, no el valor).
    const occ = [];
    const enTabla = new Set();
    tablas.forEach((tb, ti) => tb.filas.forEach((f, fi) => f.forEach((c, ci) => {
      for (const x of cifras(c, U.minDigitos)) { occ.push({ d: x.d, key: `${ti},${fi},${ci}`, r: new Set() }); enTabla.add(x.d); }
    })));
    // Cifras fuera de las tablas (prosa de la misma página): se cuentan todas y se descuentan las que ya vinieron de tablas.
    const todas = cifras(p.body, U.minDigitos);
    const cnt = new Map(); for (const o of occ) cnt.set(o.d, (cnt.get(o.d) || 0) + 1);
    for (const x of todas) { if (cnt.get(x.d) > 0) cnt.set(x.d, cnt.get(x.d) - 1); else occ.push({ d: x.d, key: null, r: new Set() }); }
    const celdasNumericas = occ.filter((o) => o.key).length;

    if (conNumeros ? !conNumeros.has(p.n) : (celdasNumericas === 0 && occ.length <= U.prosaMax)) {
      out.push({ pagina: p.n, estado: 'prosa', chequeo: null, detalle: occ.length ? `página sin números de carga, ${occ.length} cifra(s) suelta(s): ${occ.slice(0, 5).map((o) => o.d).join(', ')}` : 'sin cifras' });
      continue;
    }

    // 2. sumas
    const sumas = respaldoSumas(tablas, U);
    for (const o of occ) if (o.key && sumas.ok.has(o.key)) o.r.add('sumas');
    // 3. producción (columna comparativa del año anterior)
    if (imp.length) { const pr = respaldoProduccion(tablas, imp); for (const o of occ) if (o.key && pr.has(o.key)) o.r.add('produccion'); }
    // 4. balance
    const bal = balance.get(p.n); if (bal) for (const o of occ) if (o.key && bal.has(o.key)) o.r.add('balance');
    // 1. texto del PDF, como multiconjunto; primero se asigna a las cifras que nada más respaldó
    let casi = [];
    const pdfT = textos[p.n - 1];
    const pdfCifras = capa.aplica && pdfT ? cifras(pdfT, U.minDigitos) : [];
    if (pdfCifras.length) {
      const disp = new Map(); for (const x of pdfCifras) disp.set(x.d, (disp.get(x.d) || 0) + 1);
      const orden = [...occ.filter((o) => !o.r.size), ...occ.filter((o) => o.r.size)];
      for (const o of orden) if (disp.get(o.d) > 0) { disp.set(o.d, disp.get(o.d) - 1); o.r.add('texto-pdf'); }
      const pdfSet = new Set(pdfCifras.map((x) => x.d));
      casi = occ.filter((o) => !o.r.size).map((o) => [o.d, casiIgual(o.d, pdfSet)]).filter(([, q]) => q);
    }

    const sin = occ.filter((o) => !o.r.size);
    const usados = [...new Set(occ.flatMap((o) => [...o.r]))].sort();
    const tolera = U.toleranciaSoloConTexto && !pdfCifras.length ? 0 : U.maxSinRespaldo;
    if (!casi.length && sin.length <= tolera) {
      out.push({ pagina: p.n, estado: 'validada-gratis', chequeo: [...usados, ...(sin.length ? ['tolerada'] : [])].join('+') || 'sin-cifras-4d', detalle: `${occ.length - sin.length} de ${occ.length} cifras respaldadas${sin.length ? ` (${sin.length} sin respaldo tolerada(s), sin parecido a ninguna del PDF: ${sin.map((o) => o.d).join(', ')})` : ''} (${usados.map((u) => `${u} ${occ.filter((o) => o.r.has(u)).length}`).join(', ')})${sumas.cierres ? `, ${sumas.cierres} sumas cierran` : ''}` });
    } else {
      const why = [];
      if (casi.length) why.push(`${casi.length} cifra(s) casi iguales a una del PDF (lectura mal hecha): ${casi.slice(0, 3).map(([a, b]) => `${a} vs ${b}`).join(', ')}`);
      if (sin.length) why.push(`${sin.length} de ${occ.length} cifras sin respaldo${!capa.aplica ? ` (sin capa de texto: ${capa.motivo})` : !pdfCifras.length ? ' (página sin texto en el PDF)' : ''}: ${sin.slice(0, 5).map((o) => o.d).join(', ')}`);
      out.push({ pagina: p.n, estado: 'dudosa', chequeo: usados.join('+') || null, detalle: why.join('; ') });
    }
  }
  // Páginas del PDF con cifras que el .md no tiene: la transcripción está incompleta ahí.
  const tiene = new Set(paginas.map((p) => p.n));
  if (capa.aplica) textos.forEach((t, i) => { if (!tiene.has(i + 1) && cifras(t, U.minDigitos).length > U.prosaMax) out.push({ pagina: i + 1, estado: 'dudosa', chequeo: null, detalle: 'la página tiene cifras en el PDF y falta en el .md' }); });
  return out.sort((a, b) => a.pagina - b.pagina);
}

// ---------------------------------------------------------------- club y año de un PDF (tools/onboard.mjs --quien)
export function quien(pdfRel) {
  const r = spawnSync('node', [resolve(root, 'tools/onboard.mjs'), '--quien', pdfRel], { cwd: root, encoding: 'utf8' });
  try { return JSON.parse(r.stdout.trim().split('\n').pop()); } catch { return {}; }
}

// ================================================================ --prueba: la medición
// Contra los documentos que tools/resolver-inventario.mjs ya resolvió (último registro por `md` en
// Admin/transcripciones-verificaciones.jsonl con `resolucion` y un `previo` que exista en disco). La entrada de la cascada es lo
// que el resolver tenía en la mano: el `.mistral-redo.md` si el resolver rehízo el .md con Mistral (base "... -> mistral
// (re-hecho)"), si no, el `previo-*.md`. La "verdad" es el .md actual (lo corregido).
//
// ERROR REAL en una página = una cifra de >= 4 dígitos de la entrada que el .md actual no tiene, emparejada con una cifra del
// actual que la entrada no tiene y que es "casi igual" (mismo largo con 1 dígito distinto — 2 si tiene 7+ dígitos —, o un dígito
// de más / de menos en cifras de 5+ dígitos, sin contar un 0 agregado al final, que es formato de decimales). Se descartan los
// años y las fechas. Emparejar así evita el ~70% de páginas "cambiadas" que da comparar los multiconjuntos sin emparejar
// (diferencias de formato: "1 234" vs "1.234,00", celdas partidas, columnas pegadas).
function erroresReales(entrada, actual) {
  const A = cifras(entrada).map((x) => x.d); const B = cifras(actual).map((x) => x.d);
  const resta = (X, Y) => { const c = new Map(); for (const y of Y) c.set(y, (c.get(y) || 0) + 1); return X.filter((x) => (c.get(x) > 0 ? (c.set(x, c.get(x) - 1), false) : true)); };
  const Ua = resta(A, B); const Ub = resta(B, A); const sA = new Set(A); const sB = new Set(B);
  const out = []; const usado = new Set();
  for (const a of Ua) {
    if (sB.has(a)) continue;
    for (let j = 0; j < Ub.length; j++) {
      const b = Ub[j]; if (usado.has(j) || sA.has(b)) continue;
      let ok = false;
      if (a.length === b.length) { const h = hamming(a, b); ok = h >= 1 && h <= (a.length >= 7 ? 2 : 1) && a.replace(/0/g, '').length >= 2; }
      else if (Math.abs(a.length - b.length) === 1) { const [s, l] = a.length < b.length ? [a, b] : [b, a]; ok = l.length >= 5 && l !== s + '0' && unaDeDiferencia(s, l); }
      if (ok) { out.push([a, b]); usado.add(j); break; }
    }
  }
  return out;
}

const CURVA = [
  { nombre: 'A: propuesta literal (tabla que cierra con >=3 sumandos valida la página)', literal: true, minSumandos: 3, maxSinRespaldo: 0 },
  { nombre: 'B: celda por celda, sumandos>=3, tolerancia redondeo', minSumandos: 3, maxSinRespaldo: 0 },
  { nombre: 'C: celda por celda, sumandos>=2, tolerancia redondeo, 0 cifras sin respaldo', maxSinRespaldo: 0 },
  { nombre: 'D: igual que C, tolerancia exacta', tolSuma: 'exacto', maxSinRespaldo: 0 },
  { nombre: 'E: igual que C, sin sumas hacia abajo', sumasHaciaAbajo: false, maxSinRespaldo: 0 },
  { nombre: 'F: igual que C, tolera 1 cifra sin respaldo (solo en páginas con texto del PDF)', maxSinRespaldo: 1 },
  { nombre: 'G: igual que C, tolera 2 cifras sin respaldo (solo en páginas con texto del PDF)', maxSinRespaldo: 2 },
  { nombre: 'G2: igual que C, tolera 3 cifras sin respaldo (solo con texto del PDF) = DEFAULT', maxSinRespaldo: 3 },
  { nombre: 'G4: igual que C, tolera 5 cifras sin respaldo (solo con texto del PDF)', maxSinRespaldo: 5 },
  { nombre: 'G5: igual que C, tolera 10 cifras sin respaldo (solo con texto del PDF)', maxSinRespaldo: 10 },
  { nombre: 'F3: tolera 1 cifra sin respaldo también en escaneos', maxSinRespaldo: 1, toleranciaSoloConTexto: false },
  { nombre: 'G3: tolera 2 cifras sin respaldo también en escaneos', maxSinRespaldo: 2, toleranciaSoloConTexto: false },
  { nombre: 'FK: F + cifras de 5+ dígitos', maxSinRespaldo: 1, minDigitos: 5 },
  { nombre: 'GK: G + cifras de 5+ dígitos', maxSinRespaldo: 2, minDigitos: 5 },
  { nombre: 'H: igual que C, prosa = paginas-con-numeros SIN vecinas', prosa: 'sin-vecinas', maxSinRespaldo: 0 },
  { nombre: 'I: igual que C, prosa propia (sin tablas y <= 2 cifras sueltas)', prosa: 'propia', maxSinRespaldo: 0 },
  { nombre: 'K: igual que C, cifras de 5+ dígitos', minDigitos: 5, maxSinRespaldo: 0 },
  { nombre: 'J: solo texto-pdf (sin sumas/producción/balance)', soloTexto: true, maxSinRespaldo: 0 },
];

// Variante A (la propuesta tal cual): una página con al menos una tabla que cierra con >= 3 sumandos queda validada entera.
async function literal(args) {
  const r = await chequearPaginas(args);
  const paginas = paginasDe(args.mdText);
  return r.map((x) => {
    if (x.estado !== 'dudosa') return x;
    const p = paginas.find((q) => q.n === x.pagina); if (!p) return x;
    const s = respaldoSumas(tablasDe(p.body), { ...UMBRALES, minSumandos: 3 });
    return s.cierres ? { ...x, estado: 'validada-gratis', chequeo: 'sumas (tabla que cierra)' } : x;
  });
}

async function prueba() {
  const detalle = process.argv.includes('--detalle');
  const L = readFileSync(resolve(root, 'Admin/transcripciones-verificaciones.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const ult = new Map(); for (const r of L) if (r.md) ult.set(r.md, r);
  const docs = [];
  for (const r of ult.values()) {
    if (!r.resolucion || !r.previo || !existsSync(resolve(root, r.previo)) || !existsSync(resolve(root, r.md))) continue;
    const base = String(r.proveniencia?.base || '');
    const redo = r.md.replace(/\.md$/, '.mistral-redo.md');
    const entrada = base.includes('re-hecho') && existsSync(resolve(root, redo)) ? redo : r.previo;
    const pdf = r.md.replace(/\.md$/, '.pdf');
    const q = quien(pdf);
    docs.push({ r, entrada, pdf, club: q.clubId, year: q.year, tipoEntrada: entrada === redo ? 'mistral-redo' : (r.previo.match(/previo-(\w+)/) || [])[1] });
  }
  cargarSitio();
  // Precalcular lo caro (pdftotext, importes de producción) una sola vez por documento.
  for (const d of docs) {
    d.mdText = readFileSync(resolve(root, d.entrada), 'utf8');
    d.actual = new Map(paginasDe(readFileSync(resolve(root, d.r.md), 'utf8')).map((p) => [p.n, p.body]));
    d.pdfTexts = existsSync(resolve(root, d.pdf)) ? textoPdfPorPagina(resolve(root, d.pdf)) : [];
    d.importes = d.club && d.year ? importesProduccion(d.club, Number(d.year) - 1) : [];
    d.errores = new Map();
    for (const p of paginasDe(d.mdText)) { const e = erroresReales(p.body, d.actual.get(p.n) ?? ''); if (e.length) d.errores.set(p.n, e); }
    d.nPag = paginasDe(d.mdText).length;
    d.conNumeros = new Set(paginasConNumeros({ mdText: d.mdText }).paginas); // referencia fija para el recall "que importa"
  }
  const totPag = docs.reduce((s, d) => s + d.nPag, 0);
  const totErr = docs.reduce((s, d) => s + d.errores.size, 0);
  const totErrCN = docs.reduce((s, d) => s + [...d.errores.keys()].filter((n) => d.conNumeros.has(n)).length, 0);
  const costo = docs.reduce((s, d) => s + (d.r.costoUsd || 0), 0);
  const conProd = docs.filter((d) => d.importes.length).length;
  console.log(`${docs.length} documentos, ${totPag} páginas (${docs.reduce((s, d) => s + d.conNumeros.size, 0)} con números según paginas-con-numeros), ${totErr} páginas con error real de lectura (${totErrCN} en páginas con números), costo registrado $${costo.toFixed(2)}; ${conProd} documentos con el año N-1 en producción.`);
  console.log(`entradas: ${JSON.stringify(docs.reduce((m, d) => ((m[d.tipoEntrada] = (m[d.tipoEntrada] || 0) + 1), m), {}))}`);

  for (const cfg of CURVA) {
    const um = { ...cfg }; delete um.nombre; delete um.literal; delete um.soloTexto;
    if (cfg.soloTexto) Object.assign(um, { usarProduccion: false, usarBalance: false, minSumandos: 999 });
    const c = { 'validada-gratis': 0, prosa: 0, dudosa: 0 }; const porChequeo = {};
    let errDetectadas = 0; let errDetCN = 0; const escapes = []; let ahorro = 0; let pagadasAntes = 0; let pagadasSaltadas = 0;
    let dudEsc = 0; let dudTxt = 0;
    for (const d of docs) {
      const args = { mdText: d.mdText, pdfTexts: d.pdfTexts, importes: d.importes, umbrales: um };
      const res = cfg.literal ? await literal(args) : await chequearPaginas(args);
      const est = new Map(res.map((x) => [x.pagina, x]));
      for (const x of res) { if (x.estado === 'dudosa') { if (/sin capa de texto/.test(x.detalle)) dudEsc++; else dudTxt++; } c[x.estado]++; if (x.estado === 'validada-gratis') for (const k of x.chequeo.split('+')) porChequeo[k] = (porChequeo[k] || 0) + 1; }
      for (const [n, e] of d.errores) {
        const x = est.get(n);
        if (x && x.estado === 'dudosa') { errDetectadas++; if (d.conNumeros.has(n)) errDetCN++; }
        else escapes.push({ md: d.r.md, pagina: n, estado: x?.estado, chequeo: x?.chequeo, detalle: x?.detalle, errores: e.slice(0, 4), conNumeros: d.conNumeros.has(n), resolucion: d.r.resolucion[n] ?? '(no pagada: cambió por rehacer el .md)' });
      }
      const dud = res.filter((x) => x.estado === 'dudosa').length;
      ahorro += (d.r.costoUsd || 0) * (1 - dud / Math.max(1, res.length));
      for (const n of Object.keys(d.r.resolucion)) { pagadasAntes++; if (est.get(Number(n))?.estado !== 'dudosa') pagadasSaltadas++; }
    }
    const tot = c['validada-gratis'] + c.prosa + c.dudosa;
    console.log(`\n== ${cfg.nombre}`);
    console.log(`  páginas: validada-gratis ${c['validada-gratis']} (${(100 * c['validada-gratis'] / tot).toFixed(1)}%), prosa ${c.prosa} (${(100 * c.prosa / tot).toFixed(1)}%), dudosa ${c.dudosa} (${(100 * c.dudosa / tot).toFixed(1)}%)   [validadas por: ${JSON.stringify(porChequeo)}]`);
    console.log(`  dudosas: ${dudEsc} en documentos sin capa de texto (escaneo / texto roto), ${dudTxt} en documentos con texto`);
    console.log(`  recall en páginas con números: ${errDetCN}/${totErrCN} (${(100 * errDetCN / totErrCN).toFixed(1)}%)`);
    console.log(`  recall de errores reales (total): ${errDetectadas}/${totErr} (${(100 * errDetectadas / totErr).toFixed(1)}%); escapes ${escapes.length} (${escapes.filter((e) => e.estado === 'prosa').length} como prosa, ${escapes.filter((e) => e.estado === 'validada-gratis').length} como validadas)`);
    console.log(`  ahorro aprox. por proporción de páginas: $${ahorro.toFixed(2)} de $${costo.toFixed(2)} (${(100 * ahorro / costo).toFixed(1)}%); páginas que el resolver pagó y la cascada no habría mandado: ${pagadasSaltadas}/${pagadasAntes}`);
    const ver = detalle ? escapes : escapes.slice(0, 12);
    for (const e of ver) console.log(`    ESCAPE${e.conNumeros ? ' (CON NÚMEROS)' : ''} ${e.md} pág. ${e.pagina} [${e.estado}${e.chequeo ? ' / ' + e.chequeo : ''}] errores ${JSON.stringify(e.errores)} resolución=${e.resolucion} -- ${e.detalle}`);
  }
}

// ================================================================ CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.includes('--prueba')) { await prueba(); process.exit(0); }
  const pos = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--pdf');
  if (!pos[0]) { console.error('Uso: node tools/chequeos-gratis.mjs <archivo.md> [--pdf <archivo.pdf>] [--json]  |  --prueba [--detalle]'); process.exit(2); }
  const md = resolve(pos[0]);
  const pi = args.indexOf('--pdf');
  const pdf = pi >= 0 ? resolve(args[pi + 1]) : md.replace(/(\.(previo-\w+|mistral-redo))?\.md$/, '.pdf');
  const q = existsSync(pdf) ? quien(pdf.replace(root + '/', '')) : {};
  const res = await chequearPaginas({ pdfPath: pdf, mdText: readFileSync(md, 'utf8'), club: q.clubId, year: q.year });
  if (args.includes('--json')) console.log(JSON.stringify(res, null, 2));
  else {
    const c = res.reduce((m, x) => ((m[x.estado] = (m[x.estado] || 0) + 1), m), {});
    console.log(`${pos[0]}${q.clubId ? ` (${q.clubId} ${q.year})` : ''}: ${JSON.stringify(c)}`);
    for (const x of res) console.log(`  pág. ${String(x.pagina).padStart(3)}  ${x.estado.padEnd(15)} ${x.chequeo || ''}  ${x.detalle}`);
  }
}

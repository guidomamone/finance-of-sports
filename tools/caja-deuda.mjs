#!/usr/bin/env node
// ============================================================================
// tools/caja-deuda.mjs — CAJA y DEUDA del balance (fiscalYearMeta.cash y .grossDebt), con el club ya publicado (no va en el lote). Gratis
// salvo el escalón 2 (IA). NUNCA FRENA.
//
// POR QUÉ (Versión 352, plan aprobado por Guido el 2026-10-01: "enrich the process para tener caja y debt, pero que no tenerlo NO FRENE").
// cargar.mjs escribía grossDebt y cash en null ("sin dato no es cero"), así que todo año cargado por el script quedaba sin el cuadro "Deuda
// bruta / Caja / Deuda neta" del sitio (UC 2018-2021 y 2025), mientras 289 de los 310 años cargados a mano los tienen.
//
// QUÉ ES CADA COSA (club-data-mapping/referencia/formato-simplificado.md, "grossDebt"). El criterio de "deuda" es POR CLUB: Boca usa "Deudas", River "Préstamos", UC "Otros pasivos
// financieros" (corriente + no corriente), Racing el TOTAL del pasivo. Por eso el primer escalón aprende del propio club; para un club sin
// precedente, el criterio por defecto es DEUDA FINANCIERA (préstamos y obligaciones bancarias/financieras, corriente + no corriente), nunca el
// total del pasivo (ok de Guido, 2026-10-01). Caja: efectivo y equivalentes / caja y bancos / disponibilidades.
//
// LA ESCALERA (Versión 357, rehecha a pedido de Guido: "SIEMPRE ESCALERA, sin reglas una encima de otra"). Cada dato por separado.
//
//   ESCALA   UNA por documento, para todos los escalones: la del estado de resultados de ESE documento, la que hace coincidir sus cifras con
//            los rubros ya cargados en el sitio (factorPorIngresos). Ningún escalón trae su propia escala.
//   ESCALÓN 0  precedente del club: qué filas del balance de otro año del club (con la escala de ESE documento) suman lo cargado; se
//              PROPONEN las filas con las mismas familias de etiqueta en este documento.
//   ESCALÓN 1  vocabulario (vocabulario.mjs CAJA / DEUDA_FINANCIERA): se PROPONEN las filas del balance con esos nombres (una sola por
//              familia). "Ninguna fila" es una propuesta para la deuda (= 0, decisión de Guido) si el balance está completo (tiene su total del
//              pasivo) y el club usa filas de deuda financiera en otros años.
//   ESCALÓN 1b Jev (to-do 233 + 232 t; fijo en --club desde el 2026-10-14, en --medir con --jev): una llamada barata por documento; la caja como opción cerrada entre las
//              filas del balance y la deuda como sí/no por fila. Solo propone filas; decide la misma compuerta. Respuestas en
//              Generados/_cache/jev-caja-deuda.jsonl.
//   ESCALÓN 2  IA (Claude, ~US$ 0,03 por documento, una llamada para caja y deuda, solo si 0 y 1 no pasaron): PROPONE números de línea del
//              balance. Nada más (ni importes, ni escala, ni "no hay").
//   COMPUERTA  la MISMA para los tres: valor = suma de las cifras de las filas propuestas x la escala; y un año vecino tiene que decir lo mismo:
//              el AÑO ANTERIOR CARGADO (las mismas filas, en su columna del año anterior, dan lo cargado) o el DOCUMENTO SIGUIENTE (las mismas
//              familias, en su columna del año anterior, dan este valor). Pasa si al menos uno coincide y ninguno contradice. Si no pasa, el
//              siguiente escalón. Si ninguno pasa: null. Nunca frena. (to-do 223) El DOCUMENTO ANTERIOR (la columna del año anterior de estas
//              filas contra el año en ese documento) también confirma, pero solo a favor: un documento puede reexpresar el año anterior. Y
//              dos números por debajo del piso de la tolerancia (1.500 unidades) coinciden solo si son el mismo número.
//   DOS LECTURAS (to-do 223): cada propuesta se evalúa con las filas como se leen siempre y, si alguna fila (de este documento o de los
//              vecinos) tiene una celda en una columna con forma de nota ("6.8", "6.13"), también sin esa celda. Decide la misma compuerta:
//              pasa una sola lectura → esa; las dos con valores distintos → no decide. Caso: AEK 2019, "| Ταμειακά διαθέσιμα | 6.8 |
//              7.935.425 | 1.650.370 |" se leía 6,8; sin la celda, 7.935.425, que confirma el documento 2020.
//   LEER UNA FILA: el importe en valor absoluto (hay balances que imprimen el pasivo entre paréntesis: Tottenham 2023-24).
// Respuesta de la IA guardada en Generados/<doc>.caja-deuda-ia.json.
// Solo se leen las páginas del BALANCE: las que tienen el título (TITULO_BALANCE) o un total del activo / del pasivo, sin el título del flujo
// de efectivo. La columna es la PRIMERA cifra de la fila que no sea una referencia a nota (un entero de 1-2 dígitos al principio), salvo
// que la tabla tenga una columna de notas antes de esa cifra (Versión 513, columnasDeNotas): entonces la cifra es un importe.
//
// USO:
//   node tools/caja-deuda.mjs --medir [--club <clubId>] [--detalle] [--escalas]                         MEDICIÓN sobre los años ya cargados (ver abajo)
//   node tools/caja-deuda.mjs --medir --ia [--ejecutar]                                       ...con el escalón 2 (sin --ejecutar: ensayo; con: API)
//   node tools/caja-deuda.mjs --medir --jev [--ejecutar]                                      ...con el escalón 1b, Jev (sin --ejecutar: ensayo con cota alta)
//   node tools/caja-deuda.mjs --personal --medir [--ejecutar]                                 el dato "personal" (staffCost) contra Admin/mediciones/personal-verdad.tsv
//   node tools/caja-deuda.mjs --personal --club <id> [--ejecutar] [--escribir]                completarlo en un club publicado
//   node tools/caja-deuda.mjs --personal --ver-candidatos --club <id> --anio <AAAA>           las filas de total que recibiría Jev (gratis)
//   node tools/caja-deuda.mjs --personal --club <id> --partir [--escribir]                    (229) ajustes que separan staffCost de la fila global
//        de gasto; después verificar.mjs + cargar.mjs --reemplazar --escribir por año
//   node tools/caja-deuda.mjs --club <clubId> [--ejecutar] [--escribir]                       COMPLETAR un club ya publicado (ver abajo)
//
// --club (Versión 356, decisión de Guido 2026-10-01: "dos scripts"; caja y deuda NO van en el lote, se completan con el club ya en el sitio):
// recorre los años cargados del club, de más viejo a más nuevo, y lee caja y deuda SOLO donde el sitio tiene null (nunca pisa un valor cargado
// a mano). Corrido después de cargar, el año anterior ya está en el sitio y sirve de compuerta. Un valor que se completa en esta
// misma corrida NO cuenta como cargado para el año siguiente (Versión 502: un error se encadenaba). Sin --ejecutar, el escalón 2 es ensayo (costo estimado). --escribir: lo escribe en
// data/<país>/<club>-data.js (el valor, sin comentario: data/ se publica) y en Admin/carga-clubes/<club>.md una nota de dónde salió cada dato, en la
// meta del año (to-do 209); sube ASSET_V, corre los generadores y audit.js; si da P0/P1, revierte los dos.
//
// --medir: para cada año ya cargado con grossDebt/cash y con transcripción (la fuente nombra el .md), lee el balance como si fuera un año nuevo
// y lo compara con lo cargado a mano. El precedente sale SOLO de los OTROS años del club (nunca del mismo: si no, se aprendería la respuesta).
// Misma escalera y misma compuerta que --club. No escribe nada.
// ============================================================================

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { readdirSync } from 'node:fs';
import { derivado } from './rutas.mjs';
import * as EV from './evidencia-club.mjs';
import { ajusteDe, ajusteClubODoc, ajustePerimetroDe } from './ajustes.mjs';
import { normalizar, claveFamilia, CAJA_RE, DEUDA_FINANCIERA_RE, TITULO_BALANCE_RE, TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE, FLUJO_O_PATRIMONIO_RE, esTotal } from './vocabulario.mjs';
import { archivosData, rutaData } from './data-clubes.js';
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { formaImposible } from './verify-numbers.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const PAG_RE = /^---\s*pág\.\s*(\d+)\s*---/i;
const IMPORTE_RE = /\(?-?\d{1,3}(?:[.,' ]\d{3})+(?:[.,]\d{1,2})?\)?|\(?-?\d+[.,]\d{1,2}\)?|\(?-?\b\d{1,}\b\)?/g;
const FACTORES = [1e-6, 1e-3, 1];
const TOL = (v) => Math.max(0.0015, Math.abs(v) * 1e-4);
// (to-do 223) Dos números por debajo del piso de la tolerancia (0,0015 millones = 1.500 unidades) coinciden solo si son el mismo número: con
// el piso, 6,80 (una nota leída como importe, AEK 2020) "coincidía" con 31,92 (un porcentaje de la fila de ratios del documento siguiente).
const coincide = (a, b) => (Math.max(Math.abs(a), Math.abs(b)) < 0.0015 ? Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b)) * 1e-4 : Math.abs(a - b) <= TOL(b));

function parseNumber(raw) {
  let s = String(raw).trim().replace(/R\$|[$€£¥]/g, '').trim();
  if (!/\d/.test(s)) return null;
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith('-') || s.startsWith('−')) { neg = true; s = s.slice(1); }
  s = s.replace(/(\d)[ '](?=\d{3}\b)/g, '$1');
  const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
  if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (c !== -1) s = /,\d{3}$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 3) s = s.replace(/\./g, '');
  const n = parseFloat(s.replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? null : (neg ? -n : n);
}

// COLUMNAS DE NOTAS de cada tabla markdown (Versión 513, to-do 143): para cada renglón de una tabla, los índices de celda de las columnas
// que son de notas SIN AMBIGÜEDAD: mirando solo las filas con la cantidad de celdas más común de la tabla (una fila despareja corre las
// columnas: Novorizontino 2023 L330), todas sus celdas con número son referencias a nota ("4", "5,6", "18/26", "6; 21") y hay al menos 2.
// El encabezado ("Nota", "Note", "Σημ.") y la fila separadora no cuentan: tienen letras o guiones. Un renglón con otra cantidad de celdas
// no tiene columnas de notas (null) y se lee con la regla de siempre.
// PROBADO Y DESCARTADO (Admin/HALLAZGOS-pipeline.md): "la columna tiene importes, así que la cifra no es nota", con o sin separador de
// miles. Rompía las transcripciones donde la columna "Note" y una de importes quedaron mezcladas (Aalesund 2012, Brann 2025).
function columnasDeNotas(L) {
  const celdasDe = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
  const NOTA = /^\d{1,2}[a-z]?(?:\s*(?:[,;/&]|e|y|og|and)\s*\d{1,2}[a-z]?)*$/u;
  const res = new Map();
  for (let a = 0; a < L.length;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < L.length && L[b].trim().startsWith('|')) b++;
    const rs = L.slice(a, b).map(celdasDe); const freq = new Map(); for (const r of rs) freq.set(r.length, (freq.get(r.length) || 0) + 1);
    const modal = [...freq].sort((x, y) => y[1] - x[1])[0][0]; const parejas = rs.filter((r) => r.length === modal); const cols = [];
    for (let c = 0; c < modal; c++) {
      const vs = parejas.map((r) => r[c] || '').filter((v) => v && !/\p{L}{2,}/u.test(v) && !/^:?-{2,}:?$/.test(v));
      if (vs.length >= 2 && vs.every((v) => NOTA.test(v))) cols.push(c);
    }
    for (let k = a; k < b; k++) res.set(k, rs[k - a].length === modal && cols.length ? cols : null);
    a = b;
  }
  return res;
}

// (to-do 221) COLUMNA DE NOTAS DE VARIOS NIVELES ("6.1", "6.8", "5.4.14"; Grecia: AEK), para SACAR esa celda de la fila (filasDelMd). Más
// estricta que columnasDeNotas() porque acá un error saca un importe: la PRIMERA columna con cifras después de la etiqueta, al menos 2
// valores, todos números de nota con punto o enteros chicos (al menos uno con punto, ninguno con coma) y EN ORDEN creciente bajando por la
// tabla, como se numeran las notas (una columna de importes chicos en millones, "6.8", "12.4", no viene ordenada).
function columnasDeNotasConPunto(L) {
  const celdasDe = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
  const NOTA = /^\d{1,2}(?:\.\d{1,2}){0,3}$/;
  const clave = (v) => v.split('.').map((x) => x.padStart(3, '0')).join('.');
  const res = new Map();
  for (let a = 0; a < L.length;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < L.length && L[b].trim().startsWith('|')) b++;
    const rs = L.slice(a, b).map(celdasDe);
    const col = rs.map((r) => { const iEt = r.findIndex((c) => /\p{L}{3,}/u.test(c)); if (iEt < 0) return null; const k = r.findIndex((c, j) => j > iEt && /\d/.test(c) && !/\p{L}{2,}/u.test(c)); return k < 0 ? null : k; }).filter((k) => k != null);
    const freq = new Map(); for (const k of col) freq.set(k, (freq.get(k) || 0) + 1);
    const c = freq.size ? [...freq].sort((x, y) => y[1] - x[1])[0][0] : null;
    const vs = c == null ? [] : rs.map((r) => (r[c] || '').trim()).filter((v) => v && !/^:?-{2,}:?$/.test(v) && !/\p{L}{2,}/u.test(v));
    const ok = vs.length >= 2 && vs.every((v) => NOTA.test(v)) && vs.some((v) => v.includes('.')) && vs.every((v, k) => k === 0 || clave(v) > clave(vs[k - 1]));
    for (let k = a; k < b; k++) res.set(k, ok ? c : null);
    a = b;
  }
  return res;
}

// (to-do 223) COLUMNA CON FORMA DE NOTA, para la LECTURA B de una fila (escalera()): la primera columna con cifras después de la etiqueta,
// al menos 2 valores, todos números de nota ("6.8", "6.13", enteros chicos) o "-", al menos uno con punto, ninguno con coma. Sin pedir orden
// ni encabezado (AEK 2019 repite "6.9" e imprime "6.13" antes que "6.12"): acá no decide nada, solo arma la otra lectura; decide la compuerta.
function columnasConFormaDeNota(L) {
  const celdasDe = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
  const NOTA = /^\d{1,2}(?:\.\d{1,2}){0,3}$/;
  const res = new Map();
  for (let a = 0; a < L.length;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < L.length && L[b].trim().startsWith('|')) b++;
    const rs = L.slice(a, b).map(celdasDe);
    const col = rs.map((r) => { const iEt = r.findIndex((c) => /\p{L}{3,}/u.test(c)); if (iEt < 0) return null; const k = r.findIndex((c, j) => j > iEt && /\d/.test(c) && !/\p{L}{2,}/u.test(c)); return k < 0 ? null : k; }).filter((k) => k != null);
    const freq = new Map(); for (const k of col) freq.set(k, (freq.get(k) || 0) + 1);
    const c = freq.size ? [...freq].sort((x, y) => y[1] - x[1])[0][0] : null;
    // (to-do 232 x) el ENCABEZADO del bloque (las filas antes del primer separador "| --- |") es un título de columna, nunca una nota: no
    // cuenta para la compuerta. Caso: AEK 2025 (AEK_NOTES_IFRS_2025-06-30_a.md L412) transcribió el título "σημ." como "Α/Υ" (letras
    // separadas por la barra), que no tiene forma de nota; la columna dejaba de reconocerse, la caja se leía 6,9 EUR (la nota "6.9") y
    // 2024 quedaba sin dato porque su documento siguiente no confirmaba la lectura sin la nota.
    const sep = rs.findIndex((r) => r.every((x) => !x || /^:?-{2,}:?$/.test(x)));
    const vs = c == null ? [] : rs.filter((_, q) => q > sep).map((r) => (r[c] || '').trim()).filter((v) => v && v !== '-' && !/^:?-{2,}:?$/.test(v) && !/\p{L}{2,}/u.test(v));
    const ok = vs.length >= 2 && vs.every((v) => NOTA.test(v)) && vs.some((v) => v.includes('.'));
    for (let k = a; k < b; k++) res.set(k, ok ? c : null);
    a = b;
  }
  return res;
}

// (to-do 228) LA NOTA DE UNA FILA DEL BALANCE ("6.15"), para el escalón "la nota de la fila" (escalera()). Busca el título de la nota (un
// encabezado que empieza con ese número) y, en sus tablas con columnas de AÑO (el encabezado trae el año), el TOTAL de cada tabla: la última
// fila que suma las de arriba (se reconoce por los números, no por la palabra "total"; "-" cuenta como 0). Devuelve { linea, valor, anterior,
// totales, numeros } en unidades del documento: valor/anterior = la suma de los totales de las tablas en la columna del año y del anterior;
// numeros = todas las cifras de la nota (para ver si la diferencia con la fila está impresa). null si no la encuentra.
function notaDeFila(L, ref) {
  const esTit = (l) => /^\s*#/.test(l) || /^\s*\*\*[^|]+\*\*\s*$/.test(l);
  const numTit = (l) => (l.replace(/[#*]/g, '').trim().match(/^(\d{1,2}(?:\.\d{1,2}){0,3})[.)]?(?:\s|$)/) || [])[1] || null;
  const ini = L.findIndex((l) => esTit(l) && numTit(l) === ref);
  if (ini < 0) return null;
  let fin = ini + 1; while (fin < L.length && fin - ini < 150 && !(esTit(L[fin]) && numTit(L[fin]) && numTit(L[fin]) !== ref)) fin++;
  const celdas = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
  const num = (c) => { const t = (c || '').trim(); if (!t || /^[-–—]$|^\(\s*\)$/.test(t)) return 0; const v = parseNumber(t); return v == null ? null : Math.abs(v); };
  const totales = []; const numeros = new Set(); let valor = 0; let anterior = 0; let hay = false;
  for (let a = ini + 1; a < fin;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < fin && L[b].trim().startsWith('|')) b++;
    const rs = L.slice(a, b).map(celdas).filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c) || !c));
    for (const r of rs) for (const c of r) { const v = num(c); if (v) numeros.add(v); }
    const enc = rs[0] || []; const anios = enc.map((c, k) => [k, Number(((c.match(/(?:19|20)\d{2}/g) || []).pop()) || 0)]).filter(([, y]) => y);
    // Una columna del año y otra del año ANTERIOR (AEK 2023: la tabla de vencimientos tiene todas las columnas "30/6/2023" y no cuenta).
    const yMax = anios.length ? Math.max(...anios.map(([, y]) => y)) : 0;
    const colAct = anios.find(([, y]) => y === yMax); const colAnt = anios.find(([, y]) => y === yMax - 1);
    if (colAct && colAnt) {
      const [kAct] = colAct; const [kAnt] = colAnt;
      const tot = (k) => { let suma = 0; let n = 0; let t = null; for (const r of rs.slice(1)) { const v = num(r[k]); if (v == null) continue; if (n >= 1 && Math.abs(v - suma) <= 1) { t = v; suma = 0; n = 0; continue; } /* una sola fila arriba también: AEK 2023, "Τοκοχρεωλυτικά δάνεια" y su "Σύνολο" */ suma += v; n++; } return t; };
      const tA = tot(kAct); const tP = tot(kAnt);
      if (tA != null || tP != null) { totales.push(tA ?? 0); valor += tA ?? 0; anterior += tP ?? 0; hay = true; }
    }
    a = b;
  }
  return hay ? { linea: ini + 1, valor, anterior, totales, numeros } : null;
}

// (to-do 224) RENGLÓN DE TEXTO CON CIFRAS ("Caja      1.234 5.678"): lo mismo que /^(.*?\p{L}[^\d(]*?)\s+(CIFRAS)\s*$/u, que se usaba
// directo y era el 95% del tiempo de `--medir` (140 de 146 s): en una línea con una letra DESPUÉS de una tira de cifras con espacios, antes de
// fallar probaba todas las maneras de repartir esos espacios entre "dentro del número" y "separador". Acá se prueban los mismos cortes en el
// mismo orden (el rótulo más corto primero, como el .*? perezoso) y un corte se descarta enseguida si lo que sigue tiene un carácter que no
// puede estar en las cifras; si pasa, la MISMA expresión de las cifras se corre sobre ese pedazo. Devuelve lo mismo que .match().
const CIFRAS_RENGLON = /^([-(]?\d[\d.,' ]*\)?(?:\s+[-(]?\d[\d.,' ]*\)?)*)\s*$/u;
const SOLO_CIFRAS = /^[\d.,'()\-\s]*$/u;
function renglonDeTexto(t) {
  let letra = -1; let corte = -1; // última letra y último dígito o "(": el rótulo (.*?\p{L}[^\d(]*?) termina en una letra seguida de nada de eso
  for (let k = 0; k < t.length; k++) {
    const ch = t[k];
    if (/\s/u.test(ch) && letra > corte) {
      let p = k; while (p < t.length && /\s/u.test(t[p])) p++;
      const resto = t.slice(p);
      if (/^[-(]?\d/u.test(resto) && SOLO_CIFRAS.test(resto)) { const m = resto.match(CIFRAS_RENGLON); if (m) return [t, t.slice(0, k), m[1]]; }
    }
    if (/\p{L}/u.test(ch)) letra = k; else if (/[\d(]/.test(ch)) corte = k;
  }
  return null;
}

// Las filas de la transcripción: etiqueta + cifras (tablas markdown y renglones de texto), con su página y su línea.
// (to-do 232 w) COLUMNAS DE CADA PERÍMETRO EN UNA MISMA TABLA. Olympiacos (perímetro individual) imprime el balance con el grupo y la sociedad
// lado a lado: "| Ενεργητικό | Σημ. | Όμιλος |  | Εταιρεία |  |" y la fila "| Ταμειακά διαθέσιμα | 24 | 16.552.985,49 | 9.109.940,66 |
// 16.455.274,23 | 9.028.002,56 |" (2022, L309): se leía la primera cifra (la del grupo) y los 10 años tuvieron que ir por ajuste `caja` a mano.
// El ENCABEZADO de la tabla (las filas antes del primer separador "| --- |") nombra un perímetro por columna; cada uno abarca su columna y las
// vacías de su derecha. Solo si nombra LOS DOS: devuelve, por línea del bloque, Map(columna -> 'consolidado' | 'individual').
const PER_CONSOLIDADO_RE = /^(?:ομιλοσ|group|the group|consolidated|consolidado|consolidata|consolidato|konzern|gruppo|groupe|grupo)$/;
const PER_INDIVIDUAL_RE = /^(?:εταιρεια|company|the company|separate|parent|parent company|individual|controladora|gesellschaft|societa|societe|sociedad|empresa)$/;
function columnasDePerimetro(L) {
  const celdasDe = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
  const res = new Map();
  for (let a = 0; a < L.length;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < L.length && L[b].trim().startsWith('|')) b++;
    const rs = L.slice(a, b).map(celdasDe);
    const sep = rs.findIndex((r) => r.every((x) => !x || /^:?-{2,}:?$/.test(x)));
    const mapa = new Map();
    for (const r of rs.slice(0, Math.max(0, sep))) {
      let actual = null;
      r.forEach((c, j) => { const n = normalizar(c); if (PER_CONSOLIDADO_RE.test(n)) actual = 'consolidado'; else if (PER_INDIVIDUAL_RE.test(n)) actual = 'individual'; else if (c) actual = null; if (actual && j > 0) mapa.set(j, actual); });
    }
    const vals = new Set(mapa.values());
    if (vals.has('consolidado') && vals.has('individual')) for (let k = a; k < b; k++) res.set(k, mapa);
    a = b;
  }
  return res;
}

export function filasDelMd(md) {
  const L = md.split('\n'); const filas = []; let pagina = 1; const textoPag = new Map();
  const notasAntes = columnasDeNotas(L); const notasPunto = columnasDeNotasConPunto(L); const notasForma = columnasConFormaDeNota(L); const colsPer = columnasDePerimetro(L);
  for (let i = 0; i < L.length; i++) {
    const l = L[i]; const m = l.match(PAG_RE); if (m) { pagina = Number(m[1]); continue; }
    textoPag.set(pagina, (textoPag.get(pagina) || '') + '\n' + l);
    let etiqueta = null; let crudos = []; const segmentos = []; let ixPrim = null; let jPrim = null;
    if (l.trim().startsWith('|')) {
      const celdas = l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
      if (celdas.every((c) => /^:?-{2,}:?$/.test(c) || !c)) continue;
      const iEt = celdas.findIndex((c) => /\p{L}{3,}/u.test(c)); if (iEt < 0) continue;
      // (Versión 424) BALANCE DE DOS LADOS EN UNA FILA: "| Caixa | 4 | 952 | 85 | Empréstimos e financiamentos | 8 | 87 | 79 |". Cada etiqueta
      // con sus cifras es una fila (antes las del pasivo quedaban pegadas a la caja y la deuda no existía como fila). Caso: Novorizontino
      // 2018-2025 (la IA terminaba eligiendo la fila de "Caixa" como deuda porque esa línea dice "Empréstimos").
      // (Versión 430, B2, aprobado por Guido el 2026-10-03) una celda con 1-2 letras y un número ("Γ.9", "C.7", "N4") es una REFERENCIA A
      // NOTA, nunca un importe: se descarta antes de tomar las cifras. Caso: AEL Larissa 2025 "| Δάνεια | Γ.9 | 7.031,22 | 7.500,00 |"
      // (.md L217) se leía como deuda 0,9 y corría la columna del año anterior un lugar (caja 2024 rechazada). La marca C/D de un balancete
      // va DESPUÉS del importe ("1.234 D"), así que no entra acá.
      // (to-do 232 v, escalón aprobado por Guido el 2026-10-14) también una celda que NO PUEDE SER UN IMPORTE en ningún formato: un entero
      // con punto final ("24.") o un número con dos o más puntos y grupos de menos de 3 cifras ("7.1.3", "10.1.1"; un importe con separador
      // de miles siempre tiene grupos de 3). "6.8" o "12.4" NO entran (pueden ser decimales): los sigue resolviendo la lectura B. Casos
      // (lote 71, Grecia): Olympiacos 2017 L306 "| Ταμειακά διαθέσιμα | 24. | 1.820.725,55 |" se leía 24; Aris 2019 L504 "| ... | 7.1.3 |
      // 420.500,00 |" y Atromitos/Kifisia "| ... | 7.2.4 | 46.370,17 |" se leían 7 (la compuerta los rechazaba y el dato quedaba vacío).
      const esRefNota = (c) => /^\p{L}{1,2}\s?\.?\s?\d{1,3}(?:\.\d{1,2})?$/u.test(c) || /^\d{1,3}\.$/.test(c) || /^\d{1,2}(?:\.\d{1,2}){2,3}\.?$/.test(c);
      // (to-do 223) una celda que termina en "%" es un porcentaje, nunca un importe. Caso: AEK 2019, la fila de ratios "| Άμεση ρευστότητα |
      // Ταμειακά διαθέσιμα | 7.935.424,59 | 52,44% |" (L161) daba 52,44 como "año anterior" de la caja, y la compuerta de 2018 la encontraba
      // antes que la fila del balance.
      const esTexto = (c) => /\p{L}{3,}/u.test(c); const esCifra = (c) => /\d/.test(c) && !/\p{L}{2,}/u.test(c) && !esRefNota(c) && !/%\s*$/.test(c);
      for (let j = iEt; j < celdas.length; j++) { if (!esTexto(celdas[j])) continue; let k = j + 1; const cs = []; const ix = []; while (k < celdas.length && !esTexto(celdas[k])) { if (esCifra(celdas[k])) { cs.push(celdas[k]); ix.push(k); } k++; } segmentos.push([celdas[j], cs, ix, j]); j = k - 1; }
      [etiqueta, crudos, ixPrim, jPrim] = segmentos.shift();
    } else {
      const t = l.replace(/\*\*/g, ''); if (!/\p{L}{3,}/u.test(t) || !/\d/.test(t)) continue;
      const mm = t.match(/^(.*?\p{L}[^\d(]*?)\s{2,}([-(\d].*)$/u) || renglonDeTexto(t);
      if (!mm) continue; etiqueta = mm[1].trim(); crudos = (mm[2].match(IMPORTE_RE) || []);
    }
    const todas = [[etiqueta, crudos, ixPrim, jPrim], ...segmentos];
    for (const [et0, cr0, ix0, j0] of todas) { const etiqueta = et0; let crudos = cr0;
    // (to-do 232 ac, aprobado por Guido el 2026-10-14) UNA CIFRA CON FORMA IMPOSIBLE invalida la fila entera (no se saca solo esa celda: correría
    // las columnas y el año anterior se leería como el actual). Forma imposible = dos separadores distintos y el último repetido ("13.950,790,99")
    // o el de miles después del decimal: un error del OCR. Caso: Espanyol 2025 L361, "Efectivo y otros activos líquidos equivalentes
    // 13.950,790,99 | 3.174.782,30" se leía 13.950,79 y la columna del año anterior confirmaba la caja (Jev la eligió bien). La fila de abajo,
    // "Tesorería 13.950.790,99", está bien leída. Medido: 1.960 cifras así en 118 transcripciones.
    if ((cr0 || []).some(formaImposible)) continue;
    let nums = crudos.map(parseNumber).filter((n) => n !== null);
    // Referencia a nota: un entero chico (1-2 dígitos, sin separador) al principio, seguido de más cifras.
    // (Versión 383: un 0 no es un número de nota. Fortaleza 2023 "Caja | 0 | 2.152" se leía 2.152, la columna del año anterior.)
    // (Versión 421) UNA sola referencia a nota, no en bucle: el importe de al lado también puede ser un entero chico (miles). Caso:
    // Novorizontino 2020 "Caixa e equivalentes de caixa | 4 | 85 | 695 |" sacaba el 4 (nota) y el 85 (la caja, en miles) y leía 695 (2019).
    // (Versión 513, to-do 143, aprobado por Guido el 2026-10-05) ESCALERA DE LA LECTURA: escalón 1, si la tabla tiene una COLUMNA DE NOTAS
    // (columnasDeNotas) entre la etiqueta y la primera cifra, esa cifra es un importe: la celda de nota de esta fila está vacía. Escalón 2,
    // sin esa evidencia, la regla de siempre. Caso: Novorizontino 2019 "| Empréstimos |  | 27 | 24 |" (.md L193) descartaba el 27 (2019) y
    // leía el 24 (2018); se publicó deuda 32,32 en vez de 32,323 (la compuerta lo dejó pasar por la tolerancia de redondeo).
    // (to-do 221, escalón aprobado por Guido el 2026-10-13) UNA CELDA DE LA COLUMNA DE NOTAS NO ES UN IMPORTE: si columnasDeNotasConPunto()
    // reconoció la columna, la cifra que cae en ella se saca antes de leer la fila. Caso: AEK 2016 y 2018, la caja se cargaba 6,8 EUR (la nota
    // 6.8) y la compuerta del documento siguiente lo aceptaba porque ese documento tiene la misma columna de notas.
    const colPunto = ix0 ? notasPunto.get(i) : null;
    const sacoNota = colPunto != null && ix0.includes(colPunto);
    if (sacoNota) { const k = ix0.indexOf(colPunto); crudos = crudos.filter((_, q) => q !== k); nums = crudos.map(parseNumber).filter((n) => n !== null); }
    // (to-do 223) LECTURA B: la fila sin la celda que cae en una columna con forma de nota (si la lectura de siempre no la sacó ya).
    const colForma = !sacoNota && ix0 ? notasForma.get(i) : null;
    let lecturaB = null;
    if (colForma != null && ix0.includes(colForma)) {
      const k = ix0.indexOf(colForma); const cb = crudos.filter((_, q) => q !== k).map(parseNumber).filter((n) => n !== null).map(Math.abs);
      if (cb.length) lecturaB = { valor: cb[0], cifras: cb };
    }
    const notaAntes = sacoNota || (ix0 && notasAntes.get(i) && notasAntes.get(i).some((c) => c > j0 && c < ix0[0]));
    if (!notaAntes && nums.length > 1 && Number.isInteger(nums[0]) && Math.abs(nums[0]) >= 1 && Math.abs(nums[0]) < 100 && !/[.,]/.test(String(crudos[0]))) { nums = nums.slice(1); crudos = crudos.slice(1); }
    if (!nums.length) continue;
    nums = nums.map(Math.abs); // LEER UNA FILA: valor absoluto (ver cabecera)
    // (Versión 422) para el DICCIONARIO (vocabulario.mjs, que busca la palabra al principio) la etiqueta va sin el código de cuenta de un
    // balancete ("2.2.01 EMPRESTIMOS...", "29 2201010001 - I-9 SPORTS"): la familia y la etiqueta impresa no cambian. Caso: Novorizontino
    // 2013-2017, "2.2.01 EMPRESTIMOS E FINANCIAMENTOS" no la reconocía el escalón 1 de deuda.
    // (Versión 459) también una numeración de lista al principio ("4)", "a)", "IV.", "12."): Juventus 2005-06 L1967 "4) Due to banks".
    const sinCodigo = etiqueta.replace(/^\s*(?:\d+\s+)?\d+(?:[.\-]\d+)*\s*(?:-\s+)?(?=\p{L})/u, '').replace(/^\s*(?:\d{1,2}|[a-z]|[ivxlc]{1,5})[.)]\s+(?=\p{L})/iu, '');
    const cd = (String(crudos[0] ?? '').match(/\s([CD])\s*$/i) || [])[1]?.toUpperCase() || null; // (Versión 423) marca de balancete
    const codigo = ((etiqueta.match(/^\s*(?:\d{1,4}\s+)?(\d+(?:\.\d+)+|\d{4,})\s/) || [])[1] || '').replace(/\./g, '') || null;
    // (to-do 228) el número de nota de la fila (la celda de la columna de notas, "6.15") y lo que dice su nota.
    const celdaNota = ix0 && (colPunto ?? colForma) != null ? (l.trim().replace(/^\||\|$/g, '').split('|')[colPunto ?? colForma] || '').replace(/\*\*/g, '').trim() : null;
    const nota = celdaNota && /^\d{1,2}(?:\.\d{1,2}){1,3}$/.test(celdaNota) ? notaDeFila(L, celdaNota) : null;
    // (to-do 232 w) con columnas de perímetro: las cifras de cada uno, por separado. UNA compuerta: las cifras de la fila que caen en columnas
    // de perímetro se reparten en dos grupos del mismo largo (lo demás, la nota, no cuenta). conPerimetro() elige la del ajuste `perimetro`.
    let porPerimetro = null; const mp = ix0 ? colsPer.get(i) : null;
    if (mp) { const g = { consolidado: [], individual: [] }; ix0.forEach((k, q) => { const per = mp.get(k); const v = parseNumber(cr0[q]); if (per && v !== null) g[per].push(Math.abs(v)); }); if (g.consolidado.length && g.consolidado.length === g.individual.length) porPerimetro = g; }
    filas.push({ linea: i + 1, pagina, etiqueta, cd, codigo, norm: normalizar(sinCodigo), familia: claveFamilia(etiqueta), valor: nums[0], cifras: nums, ...(lecturaB && lecturaB.valor !== nums[0] ? { lecturaB } : {}), ...(nota ? { nota } : {}), ...(porPerimetro ? { porPerimetro } : {}) });
    }
  }
  // Páginas del balance: título o total del activo/pasivo, y sin el título del flujo de efectivo / cambios en el patrimonio.
  // Dos ajustes PROPIOS de esta tool (no se tocaron las regex compartidas de vocabulario.mjs, que usan otras tools): (1) plurales: UC 2024
  // titula "Estados de Situación Financiera Consolidados" y su total es "TOTAL DE ACTIVOS", que TITULO_BALANCE / TOTAL_ACTIVO no reconocían
  // (la página 7 del visor, el balance, quedaba afuera); (2) un total con muchas palabras de más no es el del balance: "Total Activos Líquidos en
  // Moneda Extranjera" (UC 2024, Nota 25, págs. 46 y 94 del visor) marcaba como balance una nota con la caja partida por moneda.
  // (Versión 452, punto 2 del HANDOFF, aprobado por Guido el 2026-10-04) la exclusión del flujo de efectivo / cambios en el patrimonio mira
  // solo el texto FUERA de las tablas (títulos y renglones sueltos): una FILA con esas palabras no es el título de otro estado. Caso: Juventus
  // 2011-12 pág. 84, "Statement of financial position" con la fila "Cash flow hedge reserve" en el patrimonio: la página quedaba afuera del
  // balance y la deuda de casi todos los años quedaba sin dato.
  const sinTablas = (t) => t.split('\n').filter((l) => !l.trimStart().startsWith('|')).join('\n');
  // El título del balance cuenta como "fuera de la tabla" solo si es un ENCABEZADO (renglón con # o en negrita sola), no una mención en prosa
  // (UC 2015 págs. 50-51, nota de impuestos diferidos: "...se presentan en el estado de situación financiera...").
  // Y CORTO (hasta 70 caracteres sin # ni *): "b. Los movimientos de impuestos diferidos del estado de situación financiera son los siguientes:"
  // (UC 2015 pág. 50) es un encabezado de nota, no el título del balance.
  const encabezados = (t) => t.split('\n').filter((l) => (/^\s*#/.test(l) || /^\s*\*\*[^|]+\*\*\s*$/.test(l)) && l.replace(/[#*]/g, '').trim().length <= 70).join('\n');
  const balance = new Set();
  for (const [p, txt] of textoPag) {
    const n = normalizar(txt.slice(0, 1500));
    const conTotal = filas.some((f) => f.pagina === p && esTotalBalance(f.norm));
    const fuera = normalizar(sinTablas(txt.slice(0, 1500))); const enc = normalizar(encabezados(txt.slice(0, 1500)));
    const tituloFuera = TITULO_BALANCE_RE.test(enc) || TITULO_BALANCE_PLURAL_RE.test(enc);
    // La fila solo deja de excluir si el título del balance está FUERA de la tabla: un índice ("INDICE" con "Estado de Flujo de Efectivo"
    // como fila, UC 2015 págs. 2-3) o una nota con "Saldo inicial" (UC 2015 págs. 37-51) siguen afuera, como antes.
    if ((TITULO_BALANCE_RE.test(n) || TITULO_BALANCE_PLURAL_RE.test(n) || conTotal) && !FLUJO_O_PATRIMONIO_RE.test(tituloFuera ? fuera : n)) balance.add(p);
  }
  // La página siguiente a una del balance también (el pasivo suele seguir), si no es el flujo.
  // (Versión 452) la siguiente: con el mismo criterio (las filas no excluyen si la página trae su propio título de balance fuera de la tabla).
  for (const p of [...balance]) {
    const t = (textoPag.get(p + 1) || '').slice(0, 1500); const fuera = normalizar(sinTablas(t)); const enc = normalizar(encabezados(t));
    const tituloFuera = TITULO_BALANCE_RE.test(enc) || TITULO_BALANCE_PLURAL_RE.test(enc);
    if (textoPag.has(p + 1) && !FLUJO_O_PATRIMONIO_RE.test(tituloFuera ? fuera : normalizar(t))) balance.add(p + 1);
  }
  // (Probado y DESCARTADO en la Versión 352: leer solo el "balance principal", el primer tramo de páginas seguidas: manta corta.)
  for (const f of filas) f.balance = balance.has(f.pagina);
  // PERÍMETRO DE CADA PÁGINA DEL BALANCE (Versión 454, punto 2 del HANDOFF, aprobado por Guido el 2026-10-04): una página con su propio título
  // de balance como encabezado es "consolidado" si el encabezado lo dice, "individual" si no; la página siguiente sin título (el pasivo)
  // hereda el de la anterior. Sin encabezado de balance: null. Lo usa filasCache() para quedarse con el perímetro del ajuste `perimetro`.
  // Caso: Juventus 2020-21, "CONSOLIDATED STATEMENT OF FINANCIAL POSITION" (caja 10.533.461, L1444) y "STATEMENT OF FINANCIAL POSITION"
  // (separado, 10.077.958, L4349; el cargado).
  const perPag = new Map(); let ultimo = null;
  for (const p of [...balance].sort((a, b) => a - b)) {
    const enc = normalizar(encabezados((textoPag.get(p) || '').slice(0, 1500)));
    if (TITULO_BALANCE_RE.test(enc) || TITULO_BALANCE_PLURAL_RE.test(enc)) ultimo = /consolidad|consolidat|konsolid|konzern/.test(enc) ? 'consolidado' : 'individual';
    else if (!balance.has(p - 1)) ultimo = null;
    perPag.set(p, ultimo);
  }
  for (const f of filas) f.perimetro = f.balance ? perPag.get(f.pagina) ?? null : null;
  return filas;
}

const TITULO_BALANCE_PLURAL_RE = /\bestados? (consolidados? )?de situacion|\bbalances? generale?s?\b|\bbalancos? patrimoniai?s?\b|\bbalance sheets?\b|\bstatements? of financial position/u;
const TOTAL_BALANCE_RE = /^[\s*]*(?:\(?[=+-]\)?\s*)?total (?:de |del |do |da |dos |das )?(?:los |las )?(activos?|ativos?|pasivos?|passivos?|assets|liabilities|equity and liabilities)\b/u;
function esTotalBalance(n) {
  if (!(TOTAL_ACTIVO_RE.test(n) || TOTAL_PASIVO_RE.test(n) || TOTAL_BALANCE_RE.test(n))) return false;
  const resto = n.replace(TOTAL_BALANCE_RE, '').replace(TOTAL_ACTIVO_RE, '').replace(TOTAL_PASIVO_RE, '').trim().split(/\s+/).filter(Boolean);
  return resto.length <= 3; // "y patrimonio", "corrientes", "e patrimonio liquido": sí; "liquidos en moneda extranjera": no
}
const dedupe = (fs) => { const vistos = new Set(); return fs.filter((f) => { const k = `${f.familia}|${f.valor}`; if (vistos.has(k)) return false; vistos.add(k); return true; }); };
const r6 = (x) => Math.round(x * 1e6) / 1e6;
const cita = (f) => ({ etiqueta: f.etiqueta, importe: f.valor, anterior: f.cifras.length > 1 ? f.cifras[1] : null, pagina: f.pagina, linea: f.linea });
const filtroDe = (cual) => (cual === 'cash' ? () => true : (f) => !CAJA_RE.test(f.norm));
const TOTAL_PASIVO_PLURAL_RE = /^[\s*]*total (?:de |del )?pasivos?\b/u;

// ================================================================ LA ESCALERA (ver cabecera)

// Qué filas (1 a `max`) del balance de un año del club, con la escala de ESE documento, suman lo cargado. Las familias si hay UNA sola
// combinación (la más chica); si hay varias, ninguna (ambiguo).
export function aprender(filas, valorSitio, factor, { max = 3, filtro = () => true } = {}) {
  if (!factor) return null;
  const cand = dedupe(filas.filter((f) => f.balance && !esTotal(f.etiqueta) && f.valor > 0 && filtro(f))).slice(0, 80);
  for (let k = 1; k <= max; k++) {
    if (k === 3 && cand.length > 45) continue; // combinatoria: con muchas filas, solo 1 y 2
    const hallados = new Map();
    const rec = (desde, elegidas, suma) => {
      if (elegidas.length === k) { if (Math.abs(suma * factor - valorSitio) <= TOL(valorSitio)) { const fams = [...new Set(elegidas.map((f) => f.familia))].sort(); if (fams.length === k) hallados.set(fams.join(' + '), fams); } return; }
      for (let j = desde; j < cand.length; j++) rec(j + 1, [...elegidas, cand[j]], suma + cand[j].valor);
    };
    rec(0, [], 0);
    if (hallados.size === 1) return [...hallados.values()][0];
    if (hallados.size > 1) return null;
  }
  return null;
}
// Las familias que usa el club: las del primer precedente (el año cargado más cercano) que se puede aprender.
export function familiasDelClub(precedentes, cual) {
  for (const p of precedentes) {
    if (!p.valor) continue;
    const familias = aprender(p.filas, p.valor, p.factor, { max: cual === 'cash' ? 2 : 3, filtro: filtroDe(cual) });
    if (familias) return { familias, anio: p.anio };
  }
  return null;
}

// ESCALÓN 0: las filas de este documento con las familias del club.
function propuestaPrecedente(filas, club) {
  if (!club) return null;
  const elegidas = []; for (const fam of club.familias) { const f = filas.find((x) => x.balance && x.familia === fam); if (!f) return null; elegidas.push(f); }
  return { escalon: 0, filas: elegidas, como: `precedente del club (${club.anio}: ${club.familias.join(' + ')})` };
}
// En OTRO documento del club, el total de su nota de efectivo (la tabla con una fila de caja que termina en un total que suma sus filas):
// lo usa la compuerta para la propuesta "partes de la nota" (Versión 383), porque las filas cambian de nombre entre años (Fortaleza 2025:
// "Bancos nacionales" / "Bancos en el exterior"), y el total no. Devuelve [fila del total] o null.
function totalDeNotaDeCaja(filas) {
  for (const f of filas.filter((x) => x.balance && CAJA_RE.test(x.norm) && !esTotal(x.etiqueta))) {
    const i = filas.indexOf(f); let a = i; while (a > 0 && filas[a - 1].linea === filas[a].linea - 1) a--;
    let b = i; while (b < filas.length - 1 && filas[b + 1].linea === filas[b].linea + 1) b++;
    const tabla = filas.slice(a, b + 1); const tot = tabla.find((x) => x.linea > f.linea && esTotal(x.etiqueta));
    const partes = tot ? tabla.filter((x) => x.linea < tot.linea && !esTotal(x.etiqueta)) : [];
    if (tot && partes.length > 1 && Math.abs(partes.reduce((s, x) => s + x.valor, 0) - tot.valor) <= 1) return [tot];
  }
  return null;
}
// ESCALÓN 1: las filas del balance con nombre de caja / deuda financiera (una por familia), o "ninguna fila" de deuda (= 0).
function propuestaVocabulario(filas, cual, club, extraDeuda = []) {
  // (Versión 425) ESCALÓN 0 del diccionario: términos de deuda propios del club (ajuste manual `deuda-incluye`), al principio de la etiqueta.
  const extra = cual === 'deuda' ? extraDeuda.map((t) => normalizar(t)).filter(Boolean) : [];
  const re = { test: (n) => (cual === 'cash' ? CAJA_RE : DEUDA_FINANCIERA_RE).test(n) || extra.some((t) => n.startsWith(t)) };
  // (Versión 423) JERARQUÍA Y LADO, para un balancete por cuenta: (a) una fila hija de otra que también coincide sale (la de arriba ya la
  // suma): hija = su código de cuenta empieza con el de la otra, o, sin códigos, viene pegada abajo (hasta 2 líneas) con el mismo importe;
  // (b) en deuda, una fila con marca D (deudora: activo) no es deuda. Caso: Novorizontino 2016, "2.2.01 EMPRESTIMOS E FINANCIAMENTOS" y
  // "2.2.01.01 EMPRESTIMOS E MUTUOS" (15.965.049 cada una) se sumaban, más "1.2.02.05 CONTRATOS DE MUTUOS 4.000 D" (un préstamo dado).
  const cand = filas.filter((f) => f.balance && re.test(f.norm) && !esTotal(f.etiqueta) && !(cual === 'deuda' && f.cd === 'D'));
  const hija = (f) => cand.some((g) => g !== f && ((g.codigo && f.codigo && f.codigo.length > g.codigo.length && f.codigo.startsWith(g.codigo))
    || (!f.codigo && g.linea < f.linea && f.linea - g.linea <= 2 && g.valor === f.valor)));
  const m = dedupe(cand.filter((f) => !hija(f)));
  // EL TOTAL DE LA NOTA DE DEUDA (Versión 385): si no hay filas de deuda pero sí el TOTAL de una nota de deuda financiera, se propone ese
  // total (misma compuerta). Antes caía en "ninguna fila = 0". Caso: Fortaleza 2018 y 2019, cuya nota es solo "Total Prestamos y Sobregiros
  // Bancarios 4,398 / 794" (2018 L396, 2019 L582): se escribía deuda 0, y la compuerta lo dejaba pasar porque 2017 también es 0.
  if (!m.length && cual === 'deuda') {
    // En cualquier página (no solo las del balance): Fortaleza trae solo notas, y la nota 12 de 2018 no está en una página "de balance".
    const tots = dedupe(filas.filter((f) => esTotal(f.etiqueta) && re.test(f.norm.replace(/^[\s*]*total(es)?\s+(de\s+|del\s+)?/u, ''))));
    if (tots.length === 1) return { escalon: 1, filas: tots, como: `vocabulario: el total de la nota de deuda ("${tots[0].etiqueta}")` };
    if (tots.length > 1) return null;
  }
  if (!m.length) {
    const conTotalPasivo = filas.some((f) => f.balance && esTotalBalance(f.norm) && (TOTAL_PASIVO_RE.test(f.norm) || TOTAL_PASIVO_PLURAL_RE.test(f.norm)));
    if (cual === 'deuda' && conTotalPasivo && club && club.familias.every((fam) => DEUDA_FINANCIERA_RE.test(fam))) return { escalon: 1, ninguna: true, familias: club.familias, filas: [], como: 'vocabulario: ninguna fila de deuda financiera (balance completo) = 0' };
    return null;
  }
  const porFam = new Map(); for (const f of m) porFam.set(f.familia, [...(porFam.get(f.familia) || []), f]);
  // CORRIENTE + NO CORRIENTE DE LA MISMA ETIQUETA (Versión 451, punto 2 del HANDOFF, aprobado por Guido el 2026-10-04): en deuda, una familia
  // con EXACTAMENTE dos filas, una a cada lado del total del pasivo no corriente del mismo balance (a menos de 40 líneas), es la deuda partida
  // en sus dos plazos: se propone la suma. Más de dos (consolidado + separado en el mismo .md) sigue sin decidir. En el documento siguiente la
  // compuerta busca el mismo par (enOtroDoc), no la primera fila de la familia. Caso: Juventus 2006-07, "Loans and other financial liabilities"
  // 17.194.480 (L1656, no corriente) + 1.517.777 (L1663, corriente) = 18.712.257.
  const repetidas = [...porFam.entries()].filter(([, xs]) => xs.length > 1);
  if (repetidas.length) {
    if (cual !== 'deuda') return null; // una familia con dos importes: no hay UNA propuesta
    const pares = repetidas.map(([fam]) => [fam, parCorrienteYNoCorriente(filas, fam)]);
    if (pares.some(([, p]) => !p)) return null;
    const unicas = m.filter((f) => !repetidas.some(([fam]) => fam === f.familia));
    const elegidas = [...unicas, ...pares.flatMap(([, p]) => p)];
    return { escalon: 1, filas: elegidas, como: `vocabulario: ${pares.map(([fam]) => `"${fam}" corriente + no corriente`).join(', ')}`,
      enOtroDoc: (sig) => { const out = []; for (const f of unicas) { const x = sig.find((y) => y.balance && y.familia === f.familia && y.cifras.length > 1); if (!x) return null; out.push(x); } for (const [fam] of pares) { const p = parCorrienteYNoCorriente(sig, fam); if (!p || !p.every((y) => y.cifras.length > 1)) return null; out.push(...p); } return out; } };
  }
  if (cual === 'cash' && m.length > 1) return null;
  // UNA PARTE DE LA NOTA DE EFECTIVO (Versión 383, aprobado por Guido el 2026-10-02): si la fila de caja está en una tabla que termina en un
  // total y las filas de esa tabla suman ese total, se PROPONEN todas esas filas (la caja es una parte, el efectivo es el total). Pasa por la
  // misma compuerta (cada fila conserva su familia, así se busca igual en el documento vecino). Caso: Fortaleza 2024, nota 6: "Bancos 97.365 /
  // Caja 430 / TOTAL 97.795" (L520-522); se proponía "Caja 430" y la compuerta lo dejaba pasar porque el documento 2025 repite la misma fila.
  if (cual === 'cash') {
    const f = m[0]; const i = filas.indexOf(f);
    let a = i; while (a > 0 && filas[a - 1].linea === filas[a].linea - 1) a--;
    let b = i; while (b < filas.length - 1 && filas[b + 1].linea === filas[b].linea + 1) b++;
    const tabla = filas.slice(a, b + 1); const tot = tabla.find((x) => x.linea > f.linea && esTotal(x.etiqueta));
    const partes = tot ? tabla.filter((x) => x.linea < tot.linea && !esTotal(x.etiqueta)) : [];
    if (tot && partes.length > 1 && Math.abs(partes.reduce((s, x) => s + x.valor, 0) - tot.valor) <= 1) return { escalon: 1, filas: partes, enOtroDoc: totalDeNotaDeCaja, como: `vocabulario: "${f.etiqueta}" es una parte de la nota; se proponen sus filas, que suman "${tot.etiqueta}" ${tot.valor}` };
  }
  return { escalon: 1, filas: m, como: 'vocabulario' };
}
// ESCALÓN 2: las líneas que eligió la IA (tienen que ser filas del balance).
function propuestaIA(filas, ia, cual) {
  const lineas = (cual === 'cash' ? ia?.caja : ia?.deuda)?.lineas || []; if (!lineas.length) return null;
  const elegidas = lineas.map((n) => filas.find((f) => f.linea === n && f.balance)); if (elegidas.some((f) => !f)) return null;
  return { escalon: 2, filas: elegidas, como: 'IA' };
}

// ESCALÓN 1b (to-do 233 + 232 t, aprobado por Guido el 2026-10-14): JEV, la IA barata (typesafe.ai, ~US$ 42 por mil millones de tokens), antes
// de la IA cara y sin reglas por idioma (los griegos del lote 71 no tenían vocabulario: todo caía en Claude). Una llamada por documento: la caja
// es una pregunta de opción cerrada entre las filas del balance ("L430: Ταμειακά διαθέσιμα και ισοδύναμα | 6320395 | 7725899", o "ninguna"); la
// deuda, una pregunta sí/no por fila. Como la IA de hoy, solo PROPONE filas (ni importes ni escala) y decide la MISMA compuerta. Sin total del
// balance (esTotal) en la deuda: el vocabulario tampoco los toma.
function propuestaJev(filas, jev, cual) {
  const porLinea = (n) => filas.find((f) => f.linea === n && f.balance);
  if (cual === 'cash') { const n = Number(String(jev.caja || '').replace(/^L/, '')); const f = n ? porLinea(n) : null; return f ? { escalon: '1b', filas: [f], como: `Jev (confianza ${jev.cajaConf ?? '?'})` } : null; }
  const fs = (jev.deuda || []).map(porLinea).filter((f) => f && !esTotal(f.etiqueta));
  return fs.length ? { escalon: '1b', filas: dedupe(fs), como: `Jev (${fs.length} fila(s) de deuda)` } : null;
}
const CACHE_JEV = resolve(ROOT, 'Generados', '_cache', 'jev-caja-deuda.jsonl');
let claveJev = null;
async function jevDe(filas, ejecutar) {
  const bal = dedupe(filas.filter((f) => f.balance)).filter((f, i, xs) => xs.findIndex((g) => g.linea === f.linea) === i).slice(0, 120);
  if (!bal.length) return { error: 'sin filas del balance' };
  const texto = (f) => `${String(f.etiqueta).slice(0, 120)} | ${f.cifras.join(' | ')}`;
  const state = `Filas del balance (estado de situación financiera) de un club de fútbol, tal cual las leyó el sistema (etiqueta | cifras del año | del año anterior):\n${bal.map((f) => `L${f.linea}: ${texto(f)}`).join('\n')}`;
  const questions = {
    caja: { type: 'choice', instructions: '¿Cuál de estas filas es el EFECTIVO Y EQUIVALENTES (caja y bancos, disponibilidades)? Si ninguna, elegí "ninguna".', criteria: { ...Object.fromEntries(bal.map((f) => [`L${f.linea}`, texto(f)])), ninguna: 'Ninguna fila es efectivo y equivalentes' } },
    ...Object.fromEntries(bal.map((f) => [`d${f.linea}`, { type: 'choice', instructions: `¿La fila L${f.linea} ("${String(f.etiqueta).slice(0, 120)}") es DEUDA FINANCIERA: préstamos, créditos bancarios, bonos u obligaciones financieras (corrientes o no corrientes)? No lo son: proveedores, impuestos, sueldos, ingresos diferidos, provisiones, arrendamientos, totales.`, criteria: { si: 'Es deuda financiera', no: 'No es deuda financiera' } }])),
  };
  const body = { state, model: 'jev-latest', questions };
  return pedirJev(body, CACHE_JEV, ejecutar, (a) => (a.caja?.choice ? { caja: a.caja.choice, cajaConf: a.caja.confidence, deuda: bal.filter((f) => a[`d${f.linea}`]?.choice === 'si').map((f) => f.linea) } : null));
}
// UNA LLAMADA A JEV con caché por (cuerpo del pedido) en `archivo`: { datos } | { ensayo, usd } | { error }. `extraer(answers)` arma los datos
// (null = respuesta inválida, no se guarda). Costo estimado del ensayo: el estado una vez por pregunta (cota alta).
const cachesJev = new Map();
async function pedirJev(body, archivo, ejecutar, extraer) {
  const { createHash } = await import('node:crypto');
  const clave = createHash('sha1').update(JSON.stringify(body)).digest('hex');
  if (!cachesJev.has(archivo)) { const m = new Map(); if (existsSync(archivo)) for (const l of readFileSync(archivo, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); m.set(j.clave, j); } catch { /* línea rota */ } } cachesJev.set(archivo, m); }
  const cache = cachesJev.get(archivo);
  if (cache.has(clave)) return { datos: cache.get(clave).datos, cache: true };
  const tokens = Math.ceil(JSON.stringify(body).length / 4) * (1 + Object.keys(body.questions).length);
  if (!ejecutar) return { ensayo: true, usd: tokens * 42e-9 };
  if (!claveJev) { const env = resolve(ROOT, 'Admin', 'api-keys', 'jev.env'); const line = existsSync(env) ? readFileSync(env, 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')) : null; if (!line) return { error: `falta ${env} con JEV_API_KEY=...` }; claveJev = line.slice(12).trim(); }
  for (let intento = 0; intento < 4; intento++) {
    let res;
    try { res = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${claveJev}` }, body: JSON.stringify(body) }); }
    catch { await new Promise((r) => setTimeout(r, 2000 * (intento + 1))); continue; }
    if (res.ok) {
      const j = await res.json(); const datos = extraer(j.answers || {});
      if (!datos) return { error: `Jev sin respuesta: ${JSON.stringify(j).slice(0, 160)}` };
      const usd = (j.usage?.input_tokens ?? tokens) * 42e-9;
      const { mkdirSync, appendFileSync } = await import('node:fs');
      mkdirSync(resolve(ROOT, 'Generados', '_cache'), { recursive: true }); appendFileSync(archivo, JSON.stringify({ clave, datos, usd }) + '\n'); cache.set(clave, { datos });
      return { datos, costo: usd };
    }
    const txt = (await res.text()).slice(0, 160);
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 3000 * (intento + 1))); continue; }
    return { error: `Jev HTTP ${res.status}: ${txt}` };
  }
  return { error: 'Jev: reintentos agotados' };
}

// LA COMPUERTA, la misma para los tres escalones.
// (Versión 418) las cifras del documento SIGUIENTE se pasan a millones con la escala de ESE documento (factorSiguiente), no con la de este;
// si no se conoce (su año no está cargado), la de este, como antes. Caso: Novorizontino 2021 (en miles): caja 0,952 contra 951.927 del 2022
// (en reales), el mismo número.
// (Versión 451) Las dos filas de una familia de deuda, una a cada lado del total del pasivo no corriente del mismo balance; si no son
// exactamente dos así, null.
const TOTAL_NO_CORRIENTE_RE = /^[\s*]*total\s+(de\s+|del\s+)?(non[\s-]?current\s+liabilities|pasivos?\s+no\s+corrientes?|passivo\s+nao\s+circulante|exigivel\s+a\s+longo\s+prazo)/u;
function parCorrienteYNoCorriente(filas, fam) {
  const xs = dedupe(filas.filter((f) => f.balance && f.familia === fam && !esTotal(f.etiqueta) && f.cd !== 'D'));
  if (xs.length !== 2 || xs[1].linea - xs[0].linea > 40) return null;
  const entre = filas.some((f) => f.linea > xs[0].linea && f.linea < xs[1].linea && TOTAL_NO_CORRIENTE_RE.test(f.norm));
  return entre ? xs : null;
}
// LA ESCALA EN LA COMPUERTA (Versión 459, punto 1 del HANDOFF, aprobado por Guido el 2026-10-04). La escala de un documento es una sola (la
// del estado de resultados), pero hay documentos con dos (Juventus 2002-06: posición financiera en €000 y estado en euros; Novorizontino
// balanco-2016: resumen en milhares y balancete en reais). Escalera:
//   ESCALÓN 0  la escala del documento: si la compuerta pasa Y el valor es PLAUSIBLE (entre 1/100 y 100 veces el año cargado más cercano
//              del mismo dato, si lo hay) ──► dato (como antes)
//   ESCALÓN 1  si no pasa o no es plausible: las otras escalas, aplicadas a las filas de la propuesta (y, en el documento siguiente, a sus
//              cifras también); se acepta solo si UNA da ok y plausible
//   nada ──► lo de la escala del documento (como antes)
// Caso: Juventus 2005, "4) Due to banks" 24,973,807: con la escala del documento (miles) daba 24.973,8 millones y el documento siguiente
// (también en miles) lo confirmaba; ahora no es plausible contra 2006 (14,93) y en unidades da 24,973807, el cargado. Medido en los 519
// años de todos los clubes: +5 iguales (Juventus deuda 2005 y 2006, Fluminense 2025 caja y deuda, Mönchengladbach 2024 caja), 0 empeoran.
export function compuerta(prop, ctx) {
  const { factor, referencia = null } = ctx;
  const plausible = (r) => !(referencia > 0) || !(r.valor > 0) || (r.valor / referencia <= 100 && r.valor / referencia >= 0.01);
  const base = evaluar(prop, ctx, null);
  if (base.ok && plausible(base)) return base;
  const alts = FACTORES.filter((x) => x !== factor).map((x) => [x, evaluar(prop, ctx, x)]).filter(([, r]) => r.ok && plausible(r));
  if (alts.length === 1) return { ...alts[0][1], escalaAlternativa: alts[0][0] };
  return base;
}
// La compuerta con UNA escala: la del documento (over null) o una forzada para las filas de la propuesta (over).
function evaluar(prop, { factor, anterior = null, siguiente = null, factorSiguiente = null, cual = null, anteriorDoc = null, factorAnterior = null }, over) {
  if (over == null && !factor) return { ok: false, valor: null, motivo: 'sin escala del documento' };
  const esc = over ?? factor;
  // (Versión 420) LA FAMILIA DE LA FILA: deuda nunca con una fila de caja, caja nunca con una fila de deuda financiera (el mismo filtro que
  // los escalones 0 y 1 aplican al buscar, ahora también para la propuesta de la IA). La comparación con el vecino no lo atrapa: si el error
  // se repite en los dos años, coincide. Caso: Novorizontino 2024 y 2025, la IA propuso "Caixa e equivalentes de caixa" como deuda.
  const otraFamilia = (prop.filas || []).find((f) => (cual === 'deuda' ? CAJA_RE : cual === 'cash' ? DEUDA_FINANCIERA_RE : null)?.test(f.norm || ''));
  if (otraFamilia) return { ok: false, valor: null, motivo: `la fila "${otraFamilia.etiqueta}" es de ${cual === 'deuda' ? 'caja' : 'deuda'}, no de ${cual === 'deuda' ? 'deuda' : 'caja'}` };
  const valor = prop.ninguna ? 0 : r6(prop.filas.reduce((a, f) => a + f.valor, 0) * esc);
  // (aprobado por Guido el 2026-10-14) LA TRAMPA DEL CERO: filas propuestas que suman 0 no prueban nada, porque el vecino también da 0 y
  // "coincide". Casos (medición de Jev en todos los clubes): Köln 2024, Jev propuso una sola fila de deuda en 0 (sitio 37,86 M); Panetolikos
  // 2022, la IA propuso "Δάνεια" + "Τραπεζικά δάνεια" en 0 y se publicó deuda 0, mientras su cuadro de vencimientos (L180) imprime "Δανεισμός
  // 675.223,80". Para todos los escalones: no pasa y la propuesta baja al siguiente. Un 0 de verdad sale solo por "ninguna fila de deuda"
  // (prop.ninguna, escalón 1: balance completo con su total del pasivo y el club sin otras filas de deuda).
  if (!prop.ninguna && valor === 0) return { ok: false, valor, motivo: 'las filas propuestas suman 0 (un cero sale solo por "ninguna fila")' };
  const chequeos = []; // [nombre, coincide, detalle]
  if (anterior != null) {
    if (prop.ninguna) chequeos.push(['año anterior', Math.abs(anterior) <= TOL(0), `cargado ${anterior}`]);
    else if (prop.filas.every((f) => f.cifras.length > 1)) { const prev = r6(prop.filas.reduce((a, f) => a + f.cifras[1], 0) * esc); chequeos.push(['año anterior', coincide(prev, anterior), `${prev} contra ${anterior} cargado`]); }
  }
  // (Versión 385) una fila que no está en las páginas del balance (una nota) se busca también en las notas del documento vecino.
  if (siguiente) {
    if (prop.ninguna) { const fs = siguiente.filter((x) => x.balance && prop.familias.includes(x.familia) && x.cifras.length > 1); chequeos.push(['documento siguiente', fs.every((x) => x.cifras[1] === 0), fs.length ? `${fs.map((x) => x.cifras[1]).join(' + ')} en el siguiente` : 'el siguiente tampoco tiene esas filas']); }
    else { const fs = prop.enOtroDoc ? (prop.enOtroDoc(siguiente) || [null]) : prop.filas.map((f) => siguiente.find((x) => (x.balance || !f.balance) && x.familia === f.familia && x.cifras.length > 1)); if (fs.every(Boolean)) { const prev = r6(fs.reduce((a, x) => a + x.cifras[1], 0) * (factorSiguiente ?? factor)); let okS = coincide(prev, valor); if (!okS && over != null) { const p2 = r6(fs.reduce((a, x) => a + x.cifras[1], 0) * over); okS = coincide(p2, valor); } /* (Versión 459) con una escala forzada, el siguiente también puede ir en esa escala */ chequeos.push(['documento siguiente', okS, `${prev} en el siguiente`]); } }
  }
  // (to-do 223) DOCUMENTO ANTERIOR: la cifra del año anterior de la fila, contra la del año en el documento anterior (la
  // misma fila, la misma lectura). Es el chequeo del documento siguiente, hacia atrás. AEK 2019 leído con la nota ("6.8"): su "año anterior"
  // es 7.935.425 y el documento de 2018 tiene 1.650.370; sin la nota, 1.650.370 contra 1.650.370.
  if (anteriorDoc && !prop.ninguna && prop.filas.every((f) => f.cifras.length > 1)) {
    const fs = prop.enOtroDoc ? (prop.enOtroDoc(anteriorDoc) || [null]) : prop.filas.map((f) => anteriorDoc.find((x) => (x.balance || !f.balance) && x.familia === f.familia));
    if (fs.every(Boolean)) {
      const esteAnt = r6(prop.filas.reduce((a, f) => a + f.cifras[1], 0) * esc); const delAnt = r6(fs.reduce((a, x) => a + x.valor, 0) * (over ?? factorAnterior ?? factor));
      // Solo suma a favor: en contra frenaba valores bien cargados (medido: Novorizontino 2023 reexpresó el año anterior, Tottenham 2025 y
      // Fluminense 2025 cambian de escala entre documentos, Ceará 2025 y Católica 2016 encuentran otra fila).
      if (coincide(esteAnt, delAnt)) chequeos.push(['documento anterior', true, `${esteAnt} en el anterior`]);
    }
  }
  const malos = chequeos.filter((c) => !c[1]); const buenos = chequeos.filter((c) => c[1]);
  if (malos.length) return { ok: false, valor, motivo: `no coincide con ${malos.map((c) => `${c[0]} (${c[2]})`).join(' ni ')}` };
  if (!buenos.length) return { ok: false, valor, motivo: 'ningún año vecino para comparar' };
  return { ok: true, valor, validacion: buenos[0][0] };
}

// La escalera para un dato: cada escalón propone, la compuerta decide, y si no pasa se baja. `ia`: la respuesta de la IA (o null).
// (to-do 228) La propuesta "la nota de la fila": una fila sintética con la suma de los totales de la nota (año y anterior). Solo si la nota
// muestra que la fila es una parte: la fila es uno de sus totales, o la diferencia está impresa en la nota. En el documento vecino se arma
// igual desde la fila de la misma familia que tenga nota.
function propuestaNota(f) {
  const n = f.nota; const v = f.valor;
  if (!n || !(n.valor > v + 1)) return null;
  const parte = n.totales.some((t) => Math.abs(t - v) <= 1) || [...n.numeros].some((x) => Math.abs(x - (n.valor - v)) <= 1);
  if (!parte) return null;
  const sintetica = (x) => ({ ...x, etiqueta: `${x.etiqueta} (nota L${x.nota.linea})`, linea: x.nota.linea, valor: x.nota.valor, cifras: [x.nota.valor, x.nota.anterior], lecturaB: null });
  return { escalon: f.escalon, filas: [sintetica(f)], como: `la nota de la fila "${f.etiqueta}" (L${n.linea}): suma de sus totales ${n.totales.join(' + ')}`,
    enOtroDoc: (doc) => { const x = doc.find((y) => y.balance && y.familia === f.familia && y.nota); return x ? [sintetica(x)] : null; } };
}
const conLecturaB = (f) => (f.lecturaB ? { ...f, valor: f.lecturaB.valor, cifras: f.lecturaB.cifras, lecturaB: null } : f);
export function escalera(filas, cual, { precedentes = [], factor = null, anterior = null, siguiente = null, factorSiguiente = null, ia = null, jev = null, extraDeuda = [], anteriorDoc = null, factorAnterior = null } = {}) {
  const club = familiasDelClub(precedentes, cual);
  // (to-do 233 / 232 t) escalón 1b, Jev, entre el vocabulario y la IA cara: solo si se le pasó su respuesta (--jev).
  const ESC = [0, 1, '1b', 2];
  const propuestas = [propuestaPrecedente(filas, club), propuestaVocabulario(filas, cual, club, extraDeuda), jev ? propuestaJev(filas, jev, cual) : null, ia ? propuestaIA(filas, ia, cual) : null];
  const intentos = [];
  for (let i = 0; i < propuestas.length; i++) {
    const e = ESC[i]; const p = propuestas[i];
    if (!p) { if (i < 2 || (e === '1b' && jev) || (e === 2 && ia)) intentos.push(`escalón ${e}: sin propuesta`); continue; }
    const ctxC = { factor, anterior, siguiente, factorSiguiente, cual, referencia: precedentes[0]?.valor ?? null, anteriorDoc, factorAnterior}; // (Versión 459) el año cargado más cercano, para la plausibilidad
    const c = compuerta(p, ctxC);
    // (to-do 223, A/B medido el 2026-10-13 contra una compuerta con votos, descartada: ver Admin/HALLAZGOS-pipeline.md) DOS LECTURAS: si alguna fila de la propuesta o de los documentos vecinos tiene lectura B (sin la celda con
    // forma de nota), la propuesta se evalúa también con todos los documentos leídos así (AEK 2018: su fila ya sale bien, la del documento
    // siguiente trae la nota). La misma compuerta decide: pasa una sola → esa; las dos con valores distintos → no decide.
    const hayB = (xs) => (xs || []).some((f) => f.lecturaB);
    let elegida = c.ok ? { p, c, ctx: ctxC } : null; let lecturaSinNota = null;
    if (!p.ninguna && (hayB(p.filas) || hayB(siguiente) || hayB(anteriorDoc))) {
      const pB = { ...p, filas: p.filas.map(conLecturaB), como: `${p.como} (sin la celda con forma de nota)` };
      const ctxB = { ...ctxC, siguiente: siguiente && siguiente.map(conLecturaB), anteriorDoc: anteriorDoc && anteriorDoc.map(conLecturaB) };
      if (hayB(p.filas)) lecturaSinNota = { p: pB, ctx: ctxB };
      const cB = compuerta(pB, ctxB);
      if (c.ok && cB.ok && !coincide(c.valor, cB.valor)) { intentos.push(`escalón ${e}: pasan las dos lecturas (${c.valor} y ${cB.valor})`); continue; }
      if (!c.ok && cB.ok) elegida = { p: pB, c: cB, ctx: ctxB };
    }
    // (to-do 228, aprobado por Guido el 2026-10-13) LA NOTA DE LA FILA, en deuda: si la propuesta (la lectura que pasó, o la de siempre si no
    // pasó ninguna) es UNA fila del balance con su nota, y la nota muestra que la fila es solo una parte (la fila es uno de los totales de la
    // nota, o la diferencia con la suma de los totales está impresa en la nota), se propone la suma de los totales de la nota y pasa por la
    // misma compuerta (en el documento vecino, la misma cuenta con su columna del año anterior). Pasa una sola → esa; pasan las dos con
    // valores distintos → no decide (un vacío es mejor que una deuda corta). Caso: AEK 2021, "Μακροπρόθεσμες Δανειακές Υποχρεώσεις"
    // 5.029.327 es solo el largo plazo; la nota 6.15 da 6.038.235 (la parte a menos de un año, 1.008.907, va dentro de "Μακροπρόθεσμες
    // Υποχρεώσεις πληρωτέες στην Επόμενη Χρήση").
    // Sin ninguna lectura que pase, la base es la fila sin la celda de la nota si la tiene (la de siempre leería la nota "6.15" como importe).
    const base = elegida || lecturaSinNota || { p, c, ctx: ctxC };
    if (cual === 'deuda' && !base.p.ninguna && base.p.filas.length === 1 && base.p.filas[0].nota) {
      const pN = propuestaNota(base.p.filas[0]);
      if (pN) {
        const cN = compuerta(pN, base.ctx);
        if (elegida && cN.ok && !coincide(elegida.c.valor, cN.valor)) return { valor: null, escalon: null, como: intentos.concat(`escalón ${e}: la fila "${base.p.filas[0].etiqueta}" (${elegida.c.valor}) y su nota (${cN.valor}) pasan las dos: la nota dice que la fila es solo una parte; no decide`).join('; '), club };
        if (!elegida && cN.ok) elegida = { p: pN, c: cN, ctx: base.ctx };
      }
    }
    if (elegida) return { valor: elegida.c.valor, escalon: e, validacion: elegida.c.validacion, como: elegida.p.como, filas: elegida.p.filas.map(cita), club };
    intentos.push(`escalón ${e} (${c.valor}): ${c.motivo}`);
  }
  return { valor: null, escalon: null, como: intentos.join('; '), club };
}

// ---------------------------------------------------------------- el sitio y los documentos de cada año cargado
function sitio() {
  const sb = { console, window: {} }; sb.window.window = sb.window; const ctx = vm.createContext(sb);
  for (const f of ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...archivosData()]) vm.runInContext(readFileSync(resolve(ROOT, f), 'utf8'), ctx);
  return { G: vm.runInContext('window.CLUB_GENERIC_DATA', ctx), S: vm.runInContext('typeof sources !== "undefined" ? sources : {}', ctx) };
}
// El .md de un año cargado: la ruta que nombra su fuente (220 de los 284 años con deuda/caja la tienen).
// la ruta de la transcripción está en la nota de la fuente, que desde el to-do 209 vive en la evidencia del club (textoFuenteCompleto)
const mdDeFuente = (S, sourceId) => { const m = EV.textoFuenteCompleto(S[sourceId]).match(/Clubes\/[^"`\n]+?\.md/); return m && existsSync(resolve(ROOT, m[0])) ? m[0] : null; };

// Factor del estado de resultados de un documento contra lo cargado (para el escalón 1 en la medición): la escala con la que más rubros de
// ingresos cargados aparecen tal cual entre las cifras del documento.
export function factorPorIngresos(filas, lineas, md = null) { // `md` sin uso (lo pasan los llamados; Versión 456, probado y no adoptado)
  let mejor = null;
  for (const fac of FACTORES) {
    const n = (lineas || []).filter((l) => l.amountNative && filas.some((f) => f.cifras.some((c) => Math.abs(Math.abs(c) * fac - Math.abs(l.amountNative)) <= TOL(l.amountNative)))).length;
    if (n && (!mejor || n > mejor.n)) mejor = { fac, n };
  }
  return mejor?.fac || null;
}

// ---------------------------------------------------------------- ESCALÓN 2: IA
const FACTOR_ESCALA = { unidades: 1e-6, miles: 1e-3, millones: 1 };
const SCHEMA_IA = {
  type: 'object', additionalProperties: false, required: ['escala', 'escala_evidencia', 'caja', 'deuda', 'observaciones'],
  properties: {
    escala: { type: 'string', enum: ['unidades', 'miles', 'millones'] }, escala_evidencia: { type: 'string' },
    caja: { type: 'object', additionalProperties: false, required: ['lineas', 'ninguna'], properties: { lineas: { type: 'array', items: { type: 'integer' } }, ninguna: { type: 'boolean' } } },
    deuda: { type: 'object', additionalProperties: false, required: ['lineas', 'ninguna'], properties: { lineas: { type: 'array', items: { type: 'integer' } }, ninguna: { type: 'boolean' } } },
    observaciones: { type: 'string' },
  },
};
const SYSTEM_IA = `Sos analista de estados financieros de clubes de fútbol. Te paso las páginas del BALANCE (estado de situación patrimonial / financiera) de un documento, con cada línea numerada ("L123: ..."), en cualquier idioma.

Elegí, para la columna del ejercicio pedido (la del cierre más reciente):
- caja.lineas: la o las líneas del EFECTIVO Y EQUIVALENTES (caja y bancos, disponibilidades, caixa e equivalentes, cash and cash equivalents...). Normalmente una sola; nunca un total del activo.
- deuda.lineas: las líneas de DEUDA FINANCIERA según el criterio que te indico abajo. Corriente Y no corriente si aparecen por separado. Nunca un total del pasivo, ni subtotales que ya incluyen otra línea elegida.
- Si el balance está completo y no hay ninguna línea de deuda financiera, deuda.ninguna = true (lo mismo para caja).
- escala del balance (unidades, miles o millones) y en escala_evidencia la frase EXACTA del documento que lo dice ("Miles de pesos", "en miles de reales", "€'000"...), copiada tal cual.
- observaciones: una frase si algo es dudoso. No inventes líneas: si no está, dejá la lista vacía.`;

// Pide a la IA las líneas (una llamada por documento). ejecutar=false: ensayo (tokens y costo estimados).
export async function porIA({ md, mdText, filas, criterioDeuda, ejecutar = false, rehacer = false }) {
  const out = resolve(ROOT, derivado(md, '.caja-deuda-ia.json'));
  if (!rehacer && existsSync(out)) return { datos: JSON.parse(readFileSync(out, 'utf8')), costo: 0, guardado: true };
  const paginas = [...new Set(filas.filter((f) => f.balance).map((f) => f.pagina))];
  if (!paginas.length) return { error: 'sin páginas de balance' };
  const L = mdText.split('\n'); const PAG = /^---\s*pág\.\s*(\d+)\s*---/i; let pag = 1; const lineas = [];
  for (let i = 0; i < L.length; i++) { const m = L[i].match(PAG); if (m) { pag = Number(m[1]); continue; } if (paginas.includes(pag) && L[i].trim()) lineas.push(`L${i + 1}: ${L[i].slice(0, 220)}`); }
  const texto = lineas.join('\n').slice(0, 60000);
  const user = `Documento: ${md.split('/').slice(1).join(' / ')}.\nCriterio de deuda de este club: ${criterioDeuda}\n\nPÁGINAS DEL BALANCE (${paginas.join(', ')} del visor):\n${texto}`;
  const { llamarClaude, tokensDe, usdEstimado } = await import('./claude-llamada.mjs');
  if (!ejecutar) return { ensayo: true, usd: usdEstimado(tokensDe(SYSTEM_IA + user), 400) };
  const r = await llamarClaude({ system: SYSTEM_IA, user, schema: SCHEMA_IA, tarea: 'caja-deuda', pdf: md.replace(/\.md$/, '.pdf'), maxTokens: 2000 });
  if (r.error) return { error: r.error, costo: r.costo || 0 };
  writeFileSync(out, JSON.stringify({ md, generado: new Date().toISOString(), criterioDeuda, ...r.datos }, null, 1));
  return { datos: r.datos, costo: r.costo || 0 };
}

// De la respuesta de la IA a un dato: las cifras salen de las filas del .md (no de la IA), con chequeos y confirmación por año vecino.
// El criterio de deuda que se le pasa a la IA: el del club si hay precedente aprendido, si no el por defecto (club-data-mapping/referencia/formato-simplificado.md, "grossDebt").
export function criterioDeudaDe(familias) {
  return familias.length ? `el que el club usa en otros años: la suma de las líneas "${familias.join('" + "')}" (o sus equivalentes en este documento).`
    : 'DEUDA FINANCIERA: préstamos y obligaciones bancarias o financieras, corriente + no corriente (no el total del pasivo, no las cuentas por pagar comerciales).';
}

// El contexto de un año para la escalera: sus filas, su escala, los precedentes del club (con la escala de cada uno), el año anterior cargado
// y las filas del documento siguiente. `conocidos[cual][anio]` = el valor cargado en el sitio.
function contexto({ d, anios, a, cual, filasDe, conocidos }) {
  const filas = filasDe(a.md);
  const factor = factorPorIngresos(filas, d.revenueLinesByYear?.[a.anio], a.md);
  const precedentes = Object.entries(conocidos[cual]).filter(([y]) => y !== a.anio).sort(([x], [y]) => Math.abs(x - a.anio) - Math.abs(y - a.anio)).slice(0, 3)
    .map(([y, v]) => { const o = anios.find((z) => z.anio === y && z.md); return o ? { anio: y, valor: v, filas: filasDe(o.md), factor: factorPorIngresos(filasDe(o.md), d.revenueLinesByYear?.[y], o.md) } : null; }).filter(Boolean);
  const sig = anios.find((o) => Number(o.anio) === Number(a.anio) + 1 && o.md);
  const ant = anios.find((o) => Number(o.anio) === Number(a.anio) - 1 && o.md);
  return { filas, factor, precedentes, anterior: conocidos[cual][String(Number(a.anio) - 1)] ?? null, siguiente: sig ? filasDe(sig.md) : null,
    anteriorDoc: ant ? filasDe(ant.md) : null, factorAnterior: ant ? factorPorIngresos(filasDe(ant.md), d.revenueLinesByYear?.[ant.anio], ant.md) : null,
    factorSiguiente: sig ? factorPorIngresos(filasDe(sig.md), d.revenueLinesByYear?.[sig.anio], sig.md) : null,
    extraDeuda: String(ajusteClubODoc(a.md.replace(/\.md$/i, '.pdf'), 'deuda-incluye')?.valor || '').split(';').map((t) => t.trim()).filter(Boolean) };
}
const aniosDe = (d, S) => Object.entries(d.fiscalYearMeta || {}).map(([y, m]) => ({ anio: y, m, md: mdDeFuente(S, m.sourceId) })).sort((a, b) => Number(a.anio) - Number(b.anio));
// (Versión 454) con ajuste `perimetro` (del documento o del club) y páginas de balance de ese perímetro en el .md, las filas del balance del
// OTRO perímetro dejan de contar como balance (para todos los escalones y para los precedentes). Sin ajuste, o si el .md no marca ese
// perímetro en ninguna página, como antes.
const conPerimetro = (filas0, md) => {
  const aj = ajustePerimetroDe(md.replace(/\.md$/i, '.pdf'))?.valor;
  // (to-do 232 w) una fila con las cifras de los dos perímetros en columnas: se queda con las del perímetro del club (sin la lectura B, que
  // era sobre la fila entera).
  const filas = aj ? filas0.map((f) => (f.porPerimetro?.[aj] ? { ...f, valor: f.porPerimetro[aj][0], cifras: f.porPerimetro[aj], lecturaB: undefined, perimetroColumna: aj } : f)) : filas0;
  if (!aj || !filas.some((f) => f.balance && f.perimetro === aj)) return filas;
  // Si el .md trae LOS DOS perímetros, solo cuentan las páginas MARCADAS con el del ajuste: las de balance sin marca (resúmenes del balance
  // dentro del informe de gestión, Juventus 2021-22 págs. 19-20 y 36-37, con las cifras consolidadas) también quedan afuera; si no, la
  // compuerta tomaba la primera de esas. Si trae uno solo, solo sale el otro (no hay): las páginas sin encabezado siguen contando (medido:
  // sacarlas en los documentos de un solo perímetro hacía perder Juventus caja 2008 y metía una suma casual en deuda 2015).
  const dos = filas.some((f) => f.balance && f.perimetro && f.perimetro !== aj);
  return filas.map((f) => (f.balance && (dos ? f.perimetro !== aj : f.perimetro && f.perimetro !== aj) ? { ...f, balance: false } : f));
};
const filasCache = () => { const c = new Map(); return (md) => { if (!c.has(md)) c.set(md, conPerimetro(filasDelMd(readFileSync(resolve(ROOT, md), 'utf8')), md)); return c.get(md); }; };

// La IA de un documento (guardada o, con ejecutar, pedida). Devuelve { datos } | { ensayo, usd } | { error }.
async function iaDe(md, filas, club) {
  return porIA({ md, mdText: readFileSync(resolve(ROOT, md), 'utf8'), filas, criterioDeuda: criterioDeudaDe(club?.familias || []), ejecutar: iaDe.ejecutar });
}

async function medir({ club = null, detalle = false, ia = false, jev = false, ejecutar = false, escalas = false } = {}) {
  const { G, S } = sitio(); iaDe.ejecutar = ejecutar;
  const casos = [];
  for (const [clubId, d] of Object.entries(G)) {
    if (club && clubId !== club) continue;
    const anios = aniosDe(d, S).filter((x) => x.md); const filasDe = filasCache();
    // (Versión 456) --escalas: la escala que eligió factorPorIngresos para cada año (para medir cambios de la escala).
    if (escalas) for (const a of anios) console.log(`  escala ${clubId} ${a.anio}: ${factorPorIngresos(filasDe(a.md), d.revenueLinesByYear?.[a.anio], a.md)}`);
    // Cada año se lee como nuevo: los conocidos son lo cargado en el sitio, SIN el propio año (no se aprende la respuesta).
    for (const a of anios) for (const cual of ['grossDebt', 'cash']) {
      const real = a.m[cual]; if (real == null) continue;
      const conocidos = { [cual]: Object.fromEntries(anios.filter((o) => o.anio !== a.anio && o.m[cual] != null).map((o) => [o.anio, o.m[cual]])) };
      const ctx = contexto({ d, anios, a, cual, filasDe, conocidos });
      casos.push({ clubId, anio: a.anio, cual, real, ctx, md: a.md, ...escalera(ctx.filas, cual === 'cash' ? 'cash' : 'deuda', ctx) });
    }
  }
  // Escalón 1b (Jev): solo para lo que quedó null, una llamada (o la respuesta guardada) por documento, de a 6.
  if (jev) {
    const porMd = new Map(); for (const c of casos.filter((x) => x.valor == null)) porMd.set(c.md, [...(porMd.get(c.md) || []), c]);
    let usd = 0; let ensayos = 0; let errores = 0;
    const uno = async ([md, cs]) => {
      const r = await jevDe(cs[0].ctx.filas, ejecutar);
      if (r.ensayo) { usd += r.usd; ensayos++; return; }
      if (r.error) { errores++; return; }
      usd += r.costo || 0;
      for (const c of cs) { c.ctx = { ...c.ctx, jev: r.datos }; Object.assign(c, escalera(c.ctx.filas, c.cual === 'cash' ? 'cash' : 'deuda', c.ctx)); }
    };
    const cola = [...porMd]; await Promise.all(Array.from({ length: 6 }, async () => { while (cola.length) await uno(cola.shift()); }));
    console.log(ensayos ? `\nJEV (ENSAYO): ${ensayos} documentos sin respuesta guardada, ~US$ ${usd.toFixed(3)} (cota alta). Agregá --ejecutar (lo corre Guido).` : `\nJEV: US$ ${usd.toFixed(4)}${errores ? `, ${errores} error(es)` : ''} (las respuestas guardadas no se vuelven a pagar)`);
  }
  // Escalón 2: solo para lo que quedó null, una llamada (o la respuesta guardada) por documento, de a 6.
  if (ia) {
    const porMd = new Map(); for (const c of casos.filter((x) => x.valor == null)) porMd.set(c.md, [...(porMd.get(c.md) || []), c]);
    let usd = 0; let ensayos = 0; let hechos = 0;
    const uno = async ([md, cs]) => {
      const r = await iaDe(md, cs[0].ctx.filas, cs.find((c) => c.cual === 'grossDebt')?.club);
      if (ejecutar && ++hechos % 10 === 0) process.stderr.write(`  IA: ${hechos}/${porMd.size}\n`);
      if (r.ensayo) { usd += r.usd; ensayos++; return; }
      usd += r.costo || 0; if (r.error) return;
      for (const c of cs) Object.assign(c, escalera(c.ctx.filas, c.cual === 'cash' ? 'cash' : 'deuda', { ...c.ctx, ia: r.datos }));
    };
    const cola = [...porMd]; await Promise.all(Array.from({ length: 6 }, async () => { while (cola.length) await uno(cola.shift()); }));
    console.log(ensayos ? `\nIA (ENSAYO): ${ensayos} documentos sin respuesta guardada, ~US$ ${usd.toFixed(2)}. Agregá --ejecutar (lo corre Guido).` : `\nIA: US$ ${usd.toFixed(2)} (las respuestas guardadas no se vuelven a pagar)`);
  }
  for (const c of casos) c.ok = c.valor != null && Math.abs(c.valor - c.real) <= TOL(c.real);
  const res = (xs) => ({ total: xs.length, iguales: xs.filter((x) => x.ok).length, distintos: xs.filter((x) => x.valor != null && !x.ok).length, sinDato: xs.filter((x) => x.valor == null).length });
  for (const cual of ['grossDebt', 'cash']) {
    const xs = casos.filter((c) => c.cual === cual);
    console.log(`\n## ${cual === 'cash' ? 'CAJA' : 'DEUDA'}: ${JSON.stringify(res(xs))}`);
    for (const e of [0, 1, '1b', 2]) console.log(`   escalón ${e}: ${JSON.stringify(res(xs.filter((x) => x.escalon === e)))}`);
    for (const v of ['año anterior', 'documento siguiente', 'documento anterior']) console.log(`   pasó la compuerta por ${v}: ${JSON.stringify(res(xs.filter((x) => x.validacion === v)))}`);
    const mal = xs.filter((x) => x.valor != null && !x.ok);
    if (mal.length) { console.log(`   DISTINTOS de lo cargado (${mal.length}):`); for (const x of mal) console.log(`     ${x.clubId} ${x.anio}: script ${x.valor} (escalón ${x.escalon}, ${x.validacion}, ${x.como}) · sitio ${x.real} · filas: ${x.filas.map((f) => `"${String(f.etiqueta).slice(0, 40)}" ${f.importe} (pág. ${f.pagina}, L${f.linea})`).join(' + ') || '(ninguna)'}`); }
    if (detalle) for (const x of xs.filter((y) => y.valor == null)) console.log(`     sin dato: ${x.clubId} ${x.anio} (sitio ${x.real}): ${x.como}`);
  }
  return casos;
}

// ---------------------------------------------------------------- COMPLETAR UN CLUB PUBLICADO (--club)
function cierreDe(txt, abre) { let n = 0; for (let i = abre; i < txt.length; i++) { if (txt[i] === '{') n++; else if (txt[i] === '}') { n--; if (!n) return i; } } return -1; }
const HOY = new Date().toISOString().slice(0, 10);

export async function completarClub(clubId, { ejecutar = false, escribir = false } = {}) {
  const { G, S } = sitio(); const d = G[clubId]; iaDe.ejecutar = ejecutar;
  if (!d) return { error: `no existe ${clubId} en el sitio` };
  const anios = aniosDe(d, S); const filasDe = filasCache();
  const conocidos = { grossDebt: {}, cash: {} };
  for (const a of anios) for (const k of ['grossDebt', 'cash']) if (a.m[k] != null) conocidos[k][a.anio] = a.m[k];
  const propuestas = []; let usd = 0;
  for (const a of anios) {
    const faltan = ['grossDebt', 'cash'].filter((k) => a.m[k] == null); if (!faltan.length) continue;
    if (!a.md) { for (const k of faltan) propuestas.push({ anio: a.anio, cual: k, valor: null, como: 'la fuente no nombra la transcripción' }); continue; }
    const res = {};
    for (const k of faltan) {
      const ctx = contexto({ d, anios, a, cual: k, filasDe, conocidos });
      // ESCALÓN 0 DE TODO (Versión 419): ajuste manual `caja` (tools/ajustes.mjs), el número TAL CUAL impreso en el documento del año; se pasa
      // a millones con la escala del documento. Gana sobre la escalera y no pasa por la compuerta (es una decisión de Guido). Caso:
      // Novorizontino 2022, el documento dice 721.730 (con aplicaciones de proyectos incentivados) y el 2023 lo reclasificó a 146.924.
      // (Versión 495) lo mismo para la deuda: ajuste manual `deuda`. Caso: Fortaleza CEIF 2021 (295.846, cuadro de instrumentos financieros).
      const aj = ajusteDe(a.md.replace(/\.md$/i, '.pdf'), k === 'cash' ? 'caja' : 'deuda');
      if (aj && ctx.factor) { res[k] = { ctx, valor: r6(Math.abs(parseNumber(aj.valor)) * ctx.factor), escalon: 0, validacion: 'ajuste manual', como: `ajuste manual (${aj.fecha}): ${aj.motivo}`, filas: [] }; continue; }
      res[k] = { ctx, ...escalera(ctx.filas, k === 'cash' ? 'cash' : 'deuda', ctx) };
    }
    // ESCALÓN 1b, Jev (to-do 233 + 232 t; entró el 2026-10-14 tras medirlo en todos los clubes: caja 9 de 9 iguales, deuda 5 de 7 y los 2
    // distintos eran errores del sitio, PAOK 2021 y Panetolikos 2022; US$ 0,11 en total). Antes de la IA cara; sin --ejecutar, ensayo.
    let sinDato = faltan.filter((k) => res[k].valor == null);
    if (sinDato.length) {
      const j = await jevDe(filasDe(a.md), ejecutar);
      if (j.ensayo) { usd += j.usd; for (const k of sinDato) res[k].como += ` · escalón 1b: ensayo (~US$ ${j.usd.toFixed(4)})`; }
      else if (j.error) { for (const k of sinDato) res[k].como += ` · escalón 1b: ${j.error}`; }
      else { usd += j.costo || 0; for (const k of sinDato) { const ctx = { ...res[k].ctx, jev: j.datos }; res[k] = { ctx, ...escalera(ctx.filas, k === 'cash' ? 'cash' : 'deuda', ctx) }; } }
      sinDato = faltan.filter((k) => res[k].valor == null);
    }
    if (sinDato.length) {
      const r = await iaDe(a.md, filasDe(a.md), res.grossDebt?.club);
      if (r.ensayo) { usd += r.usd; for (const k of sinDato) res[k].como += ` · escalón 2: ensayo (~US$ ${r.usd.toFixed(3)})`; }
      else if (r.error) { for (const k of sinDato) res[k].como += ` · escalón 2: ${r.error}`; }
      else { usd += r.costo || 0; for (const k of sinDato) res[k] = { ctx: res[k].ctx, ...escalera(res[k].ctx.filas, k === 'cash' ? 'cash' : 'deuda', { ...res[k].ctx, ia: r.datos }) }; } // ctx ya trae jev
    }
    // (Versión 502, aprobado por Guido el 2026-10-05) un valor completado en esta corrida YA NO cuenta como cargado para el año siguiente: un
    // vecino es lo cargado en el sitio o el documento vecino, nunca una propuesta que nadie confirmó (si no, un error se encadena: Fortaleza
    // 2020-2022, la caja chica de 2020 validaba la de 2021 y esa la de 2022). Antes (Versión 356) sí contaba.
    for (const k of faltan) { const { ctx, ...x } = res[k]; propuestas.push({ anio: a.anio, cual: k, ...x }); }
  }
  for (const p of propuestas) console.log(`  ${p.anio} ${p.cual === 'cash' ? 'caja ' : 'deuda'}: ${p.valor ?? 'null'}  (${p.escalon != null ? `escalón ${p.escalon}, compuerta: ${p.validacion}; ` : ''}${p.como})${(p.filas || []).map((f) => `\n        "${String(f.etiqueta).slice(0, 60)}" ${f.importe} · pág. ${f.pagina} del visor · L${f.linea}`).join('')}`);
  const conValor = propuestas.filter((p) => p.valor != null);
  console.log(`\n${clubId}: ${conValor.length} dato(s) para completar de ${propuestas.length} vacío(s).${!ejecutar && usd ? ` Escalón 2 (IA) en ensayo: ~US$ ${usd.toFixed(2)}; agregá --ejecutar.` : ejecutar ? ` IA: US$ ${usd.toFixed(3)}.` : ''}`);
  if (!escribir || !conValor.length) return { propuestas };
  // ESCRIBIR: solo reemplaza `grossDebt:null` / `cash:null` adentro del bloque del año en <club>FiscalYearMeta; la nota de la fuente va a la
  // evidencia del club (Admin/carga-clubes/<club>.md), que entra en el snapshot para revertirse con el resto.
  const { snapshot, revertir, publicarCambios } = await import('./cargar.mjs');
  const evExtra = [EV.rutaRel(clubId)];
  const dataPath = resolve(ROOT, rutaData(clubId)); const snap = snapshot(evExtra); const escritos = [rutaData(clubId), EV.rutaRel(clubId)];
  try {
    let t = readFileSync(dataPath, 'utf8');
    let ev = EV.leer(clubId);
    const ini = t.search(/const \w+FiscalYearMeta\s*=\s*\{/); if (ini < 0) throw new Error('no encontré <club>FiscalYearMeta');
    for (const anio of [...new Set(conValor.map((p) => p.anio))]) {
      const abreObj = t.indexOf('{', ini); const cierraObj = cierreDe(t, abreObj);
      const m = new RegExp(`\\n(\\s*)['"]?${anio}['"]?\\s*:\\s*\\{`).exec(t.slice(abreObj, cierraObj)); if (!m) throw new Error(`no encontré el año ${anio}`);
      const abre = abreObj + m.index + m[0].length - 1; const cierra = cierreDe(t, abre); let bloque = t.slice(abre, cierra);
      const notas = [];
      for (const p of conValor.filter((x) => x.anio === anio)) {
        const re = new RegExp(`\\b${p.cual}\\s*:\\s*null\\b`); if (!re.test(bloque)) throw new Error(`${anio}: no encontré ${p.cual}:null (¿ya tiene valor?)`);
        bloque = bloque.replace(re, `${p.cual}:${r6(p.valor)}`);
        notas.push(`${p.cual} escalón ${p.escalon} (compuerta: ${p.validacion}): ${p.filas.length ? p.filas.map((f) => `"${String(f.etiqueta).slice(0, 50)}" pág. ${f.pagina}`).join(' + ') : p.como}`);
      }
      ev = EV.agregarTexto(ev, anio, 'Meta', [`tools/caja-deuda.mjs (${HOY}): ${notas.join('; ').replace(/\n/g, ' ')}`]);
      t = t.slice(0, abre) + bloque + t.slice(cierra);
    }
    writeFileSync(dataPath, t);
    EV.guardar(clubId, ev);
    const r = publicarCambios(snap, evExtra, escritos);
    console.log(r.ok ? `Escrito: ${r.escritos.join(', ')} · ${r.audit}` : `NO se escribió: ${r.motivo}`);
    return { propuestas, escrito: r };
  } catch (err) { const rv = revertir(snap, evExtra); console.log(`NO se escribió: ${err.message} (se revirtió: ${rv.restaurados} restaurados)`); return { propuestas, error: err.message }; }
}

// ============================================================================
// EL DATO "PERSONAL" (to-do 229 + 232 s, diseño aprobado por Guido el 2026-10-14): fiscalYearMeta.staffCost, el TOTAL del costo de personal
// del ejercicio (sueldos + cargas sociales + otros beneficios). Interno (el sitio no lo muestra): lo usan cargar.mjs para separar los sueldos
// de una fila global (229) y audit.js para avisar sueldos escondidos (232 s). Modo aparte (--personal), así caja y deuda no se tocan.
//   CANDIDATOS  las filas de TOTAL (esTotal, de vocabulario.mjs, ya multilingüe) de TODAS las tablas de TODOS los documentos del club con
//               el mismo cierre (Volos lo trae en Volos_notes, no en el estado), cada una con su tabla: el texto de arriba, el encabezado y
//               las primeras filas. Sin reglas por idioma.
//   ESCALÓN 1b  Jev elige UNA (opción cerrada, o "ninguna"). Sin IA cara: si no pasa, queda sin dato.
//   COMPUERTA   la cifra impresa x la escala de su documento, distinta de 0, y un vecino que coincide: la fila que Jev eligió en el año
//               SIGUIENTE trae este valor en su columna del año anterior, o staffCost ya cargado del año anterior es la columna del año
//               anterior de esta fila. En contra, cualquiera de los dos. El año ANTERIOR por Jev solo suma a favor (puede reexpresar).
//   Casos: Panetolikos 2022 "Σύνολο" de "Παροχές σε εργαζόμενους" 1.566.222,00 (L1470); Volos 2022 "Σύνολο κόστους μισθοδοσίας
//   περιόδου" 2.262.043,33 (Volos_notes_2022). PAOK no tiene una fila total (Αμοιβές προσωπικού por cuadro de función): sin dato.
// ============================================================================
const CACHE_JEV_P = resolve(ROOT, 'Generados', '_cache', 'jev-personal.jsonl');
function candidatosPersonal(md) {
  const txt = readFileSync(resolve(ROOT, md), 'utf8'); const L = txt.split('\n');
  const porLinea = new Map(filasDelMd(txt).map((f) => [f.linea, f]));
  const celdas = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
  const out = [];
  for (let a = 0; a < L.length;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < L.length && L[b].trim().startsWith('|')) b++;
    const enc = celdas(L[a]).filter((c) => c && !/^:?-+:?$/.test(c) && /\p{L}/u.test(c)).join(' / ');
    const arriba = []; for (let k = a - 1; k >= 0 && arriba.length < 2 && a - k < 6; k--) { const t = L[k].trim(); if (t && !t.startsWith('|') && !/^-+\s*p[aá]g/i.test(t) && !/^!\[/.test(t)) arriba.unshift(t.replace(/[#*>]/g, '').trim().slice(0, 160)); }
    const primeras = []; for (let k = a; k < b && primeras.length < 3; k++) { const f = porLinea.get(k + 1); if (f && !esTotal(f.etiqueta)) primeras.push(String(f.etiqueta).slice(0, 50)); }
    for (let k = a; k < b; k++) {
      const f = porLinea.get(k + 1);
      if (f && esTotal(f.etiqueta) && f.cifras.length) out.push({ md, linea: k + 1, etiqueta: f.etiqueta, cifras: f.cifras, tabla: (celdas(L[a]).find((c) => /\p{L}{3,}/u.test(c)) || '').slice(0, 80), contexto: [arriba.join(' '), enc && `encabezado: ${enc}`, primeras.length && `filas: ${primeras.join(' / ')}`].filter(Boolean).join(' · ').slice(0, 300) });
    }
    a = b;
  }
  return out;
}
async function jevPersonal(cands, ejecutar) {
  if (!cands.length) return { error: 'sin filas de total' };
  const cs = cands.slice(0, 150);
  const criteria = { ...Object.fromEntries(cs.map((c, i) => [`c${i}`, `${c.md.split('/').pop()} L${c.linea}: ${String(c.etiqueta).slice(0, 80)} | ${c.cifras.slice(0, 2).join(' | ')} (${c.contexto})`])), ninguna: 'Ninguna de estas filas es el total del costo de personal del ejercicio' };
  const body = { state: 'Filas de TOTAL de las tablas de los documentos contables de UN ejercicio de un club de fútbol, cada una con su tabla (texto de arriba, encabezado, primeras filas). Cifras: del ejercicio | del anterior.', model: 'jev-latest',
    questions: { personal: { type: 'choice', instructions: '¿Cuál es el TOTAL del costo de personal del ejercicio: sueldos y salarios + cargas sociales + otros beneficios, de todo el personal (jugadores y empleados)? No es: una parte (solo cargas sociales, solo un sector), una provisión, una cantidad de empleados. Si ninguna fila lo es, elegí "ninguna".', criteria } } };
  const r = await pedirJev(body, CACHE_JEV_P, ejecutar, (a) => (a.personal?.choice ? { eleccion: a.personal.choice, conf: a.personal.confidence } : null));
  if (r.datos) { const i = /^c\d+$/.test(r.datos.eleccion) ? Number(r.datos.eleccion.slice(1)) : null; r.fila = i != null ? cs[i] : null; }
  return r;
}
// El cierre de un documento: el de periodo.mjs o, si no lo leyó, el deducido de sus vecinos (cierre-vecinos.mjs, el mismo de cargar.mjs y
// verificar.mjs): Volos_notes_2022 no trae la fecha legible y su total de personal está ahí.
function cierreDeMd(md, reg) { const pdf = md.replace(/\.md$/i, '.pdf'); const e = reg.get(pdf); return e?.periodo?.cierre || cierrePorVecinos(pdf, [...reg.values()])?.cierre || null; }
async function personalDelClub(clubId, d, S, { ejecutar = false, reg }) {
  const anios = aniosDe(d, S).filter((x) => x.md); const filasDe = filasCache();
  const carpeta = (md) => md.split('/').slice(0, 3).join('/') + '/';
  const porAnio = new Map(); let usd = 0; let ensayos = 0;
  for (const a of anios) {
    const cierre = cierreDeMd(a.md, reg);
    const mds = [a.md, ...[...reg.values()].filter((e) => e.md && e.md !== a.md && e.pdf.startsWith(carpeta(a.md)) && cierre && cierreDeMd(e.md, reg) === cierre && existsSync(resolve(ROOT, e.md))).map((e) => e.md)];
    const cands = mds.flatMap(candidatosPersonal);
    const r = await jevPersonal(cands, ejecutar);
    if (r.ensayo) { usd += r.usd; ensayos++; }
    else usd += r.costo || 0;
    const fila = r.fila || null;
    const factor = fila ? (factorPorIngresos(filasDe(fila.md), d.revenueLinesByYear?.[a.anio], fila.md) ?? factorPorIngresos(filasDe(a.md), d.revenueLinesByYear?.[a.anio], a.md)) : null;
    porAnio.set(a.anio, { a, fila, factor, jev: r, ndocs: mds.length, ncands: cands.length });
  }
  const res = [];
  for (const [anio, x] of porAnio) {
    const base = { clubId, anio, real: x.a.m.staffCost ?? null };
    if (!x.fila) { res.push({ ...base, valor: null, como: x.jev.ensayo ? `ensayo Jev (~US$ ${x.jev.usd.toFixed(4)})` : x.jev.error || `Jev: ninguna (${x.ncands} filas de total en ${x.ndocs} doc.)` }); continue; }
    if (!x.factor) { res.push({ ...base, valor: null, como: 'sin escala del documento' }); continue; }
    const valor = r6(x.fila.cifras[0] * x.factor); const ant = x.fila.cifras.length > 1 ? r6(x.fila.cifras[1] * x.factor) : null;
    const cita = `${x.fila.md.split('/').pop()} L${x.fila.linea} "${String(x.fila.etiqueta).slice(0, 50)}"`;
    if (valor === 0) { res.push({ ...base, valor: null, como: `${cita}: suma 0` }); continue; }
    const chequeos = [];
    const sig = porAnio.get(String(Number(anio) + 1)); if (sig?.fila && sig.factor && sig.fila.cifras.length > 1) chequeos.push(['documento siguiente', coincide(r6(sig.fila.cifras[1] * sig.factor), valor)]);
    const prevM = porAnio.get(String(Number(anio) - 1))?.a.m.staffCost; if (prevM != null && ant != null) chequeos.push(['año anterior', coincide(prevM, ant)]);
    const antD = porAnio.get(String(Number(anio) - 1)); if (antD?.fila && antD.factor && ant != null && coincide(r6(antD.fila.cifras[0] * antD.factor), ant)) chequeos.push(['documento anterior', true]);
    const malos = chequeos.filter((c) => !c[1]); const buenos = chequeos.filter((c) => c[1]);
    if (malos.length || !buenos.length) { res.push({ ...base, valor: null, como: `${cita} (${valor}): ${malos.length ? `no coincide con ${malos.map((c) => c[0]).join(' ni ')}` : 'ningún vecino para comparar'}` }); continue; }
    res.push({ ...base, valor, validacion: buenos[0][0], como: `Jev (confianza ${x.jev.datos?.conf ?? '?'}): ${cita}`, fila: x.fila, factor: x.factor, md: x.a.md });
  }
  return { res, usd, ensayos };
}
// PARTIR LA FILA GLOBAL (to-do 229, paso 2, aprobado por Guido el 2026-10-14): lo que se hizo a mano con Volos 2021-2025, como AJUSTES (fila +
// categoria) que después aplica cargar.mjs --reemplazar (el único que escribe filas). UNA compuerta: el año tiene staffCost confirmado por la
// compuerta del vecino, NO tiene ninguna fila wages_squad, y tiene UNA SOLA fila global de gasto (lump_*_expense o admin_general_expense)
// de monto >= staffCost (el resto no queda negativo). Esa fila pasa a valer el resto; una fila nueva = staffCost va a wages_squad con la cita.
// Dos o ninguna fila global: no decide (lo dice). Caso: Panetolikos 2022, "Κόστος πωλήσεων" 5,18 M -> 3,61 M + "Σύνολο — Παροχές σε
// εργαζόμενους" 1,566222 M (wages_squad, Panetolikos_FS_2022 L1471). Volos ya tiene wages_squad (sus ajustes a mano): no se parte.
async function partirFilaGlobal(clubId, d, res, { escribir }) {
  const fmt = (x) => { const [e, c] = Math.abs(x).toFixed(2).split('.'); return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${c}`; };
  const ajustesTxt = readFileSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl'), 'utf8');
  const cmds = [];
  for (const x of res.filter((y) => y.valor != null && (y.real == null || coincide(y.real, y.valor)))) {
    const ls = (d.expenseLinesByYear || {})[x.anio] || [];
    if (ls.some((l) => l.normalizedCategory === 'wages_squad')) { console.log(`  ${x.anio} partir: ya tiene wages_squad; no se parte`); continue; }
    const glob = ls.filter((l) => (/^lump_.*_expense$/.test(l.normalizedCategory) || l.normalizedCategory === 'admin_general_expense') && Math.abs(l.amountNative) >= x.valor);
    if (glob.length !== 1) { console.log(`  ${x.anio} partir: ${glob.length} filas globales de gasto >= staffCost (${x.valor}); no decide`); continue; }
    const g = glob[0]; const pdf = x.md.replace(/\.md$/i, '.pdf');
    const v = (() => { try { return JSON.parse(readFileSync(resolve(ROOT, derivado(x.md, '.verificacion.json', { crear: false })), 'utf8')); } catch { return null; } })();
    const lin = (v?.lineas || []).find((l) => String(l.etiqueta).trim() === String(g.rawLabel).trim())?.linea ?? null;
    const resto = Math.abs(g.amountNative) / x.factor - x.fila.cifras[0];
    const etiq = /\s/.test(String(x.fila.etiqueta).trim()) || !x.fila.tabla ? String(x.fila.etiqueta).trim() : `${String(x.fila.etiqueta).trim()} — ${x.fila.tabla}`;
    const cita = `${x.fila.md.split('/').pop()} L${x.fila.linea}`;
    if (ajustesTxt.includes(`"pdf":${JSON.stringify(pdf)}`) && ajustesTxt.includes(`"etiqueta":${JSON.stringify(etiq)}`)) { console.log(`  ${x.anio} partir: ya tiene los ajustes`); continue; }
    console.log(`  ${x.anio} partir: "${g.rawLabel}" ${fmt(Math.abs(g.amountNative) / x.factor)} -> ${fmt(resto)} + "${etiq}" ${fmt(x.fila.cifras[0])} (wages_squad, ${cita})`);
    const mot = `caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, ${cita}) está dentro de "${g.rawLabel}"`;
    cmds.push([pdf, 'fila', '--valor', fmt(resto), '--etiqueta', `${g.rawLabel} (sin el costo de personal)`, '--lado', 'gasto', '--reemplaza', g.rawLabel, ...(lin ? ['--linea', String(lin)] : []), '--motivo', `${mot}: queda ${fmt(Math.abs(g.amountNative) / x.factor)} - ${fmt(x.fila.cifras[0])}`, '--evidencia', cita]);
    cmds.push([pdf, 'fila', '--valor', fmt(x.fila.cifras[0]), '--etiqueta', etiq, '--lado', 'gasto', ...(lin ? ['--linea', String(lin)] : []), '--motivo', `${mot}: el costo de personal va aparte`, '--evidencia', cita]);
    cmds.push([pdf, 'categoria', '--valor', 'wages_squad', '--etiqueta', etiq, '--motivo', `${mot}: costo de personal -> wages_squad`, '--evidencia', cita]);
  }
  if (!escribir || !cmds.length) { if (cmds.length) console.log(`\n${cmds.length / 3} año(s) para partir. Agregá --escribir (escribe los ajustes; después: node tools/cargar.mjs "<pdf>" --desde-verificacion --reemplazar --escribir por año).`); return; }
  const { execFileSync } = await import('node:child_process');
  for (const c of cmds) execFileSync('node', [resolve(ROOT, 'tools/ajustes.mjs'), '--agregar', ...c, '--autor', 'caja-deuda --personal'], { cwd: ROOT, stdio: 'inherit' });
  console.log(`\nEscritos ${cmds.length} ajustes. Ahora, por año: node tools/cargar.mjs "<pdf>" --desde-verificacion --reemplazar --escribir`);
}
function registroDocs() {
  const m = new Map();
  for (const l of readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').split('\n')) { if (!l.trim()) continue; try { const e = JSON.parse(l); m.set(e.pdf, e); } catch { /* línea rota */ } }
  return m;
}
// --personal --medir: contra la verdad conocida (Admin/mediciones/personal-verdad.tsv: clubId, año, valor en millones, de dónde sale).
async function medirPersonal({ ejecutar = false, club = null }) {
  const { G, S } = sitio(); const reg = registroDocs();
  const verdad = readFileSync(resolve(ROOT, 'Admin', 'mediciones', 'personal-verdad.tsv'), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.split('\t'));
  const clubes = [...new Set(verdad.map((v) => v[0]))].filter((c) => !club || c === club);
  let usd = 0; let ensayos = 0; const t = { iguales: 0, distintos: 0, sinDato: 0 };
  for (const c of clubes) {
    const r = await personalDelClub(c, G[c], S, { ejecutar, reg }); usd += r.usd; ensayos += r.ensayos;
    for (const x of r.res) {
      const v = verdad.find((y) => y[0] === c && y[1] === x.anio); if (!v) continue;
      const real = Number(v[2]); const ok = x.valor != null && coincide(x.valor, real);
      if (x.valor == null) t.sinDato++; else if (ok) t.iguales++; else t.distintos++;
      console.log(`  ${c} ${x.anio}: ${x.valor ?? 'sin dato'} · verdad ${real} ${x.valor == null ? '' : ok ? 'IGUAL' : 'DISTINTO'} · ${x.como}`);
    }
  }
  console.log(`\nPERSONAL: ${JSON.stringify(t)}${ensayos ? ` · JEV (ENSAYO): ${ensayos} pedido(s), ~US$ ${usd.toFixed(3)} (cota alta); agregá --ejecutar` : ` · Jev US$ ${usd.toFixed(4)}`}`);
}
// --personal --club <id> [--ejecutar] [--escribir]: completa staffCost donde el año no lo tiene (nunca pisa uno cargado).
async function completarPersonal(clubId, { ejecutar = false, escribir = false, partir = false }) {
  const { G, S } = sitio(); const d = G[clubId]; if (!d) { console.log(`no existe ${clubId}`); return; }
  const r = await personalDelClub(clubId, d, S, { ejecutar, reg: registroDocs() });
  const nuevos = r.res.filter((x) => x.valor != null && x.real == null);
  for (const x of r.res) console.log(`  ${x.anio} personal: ${x.valor ?? 'null'}${x.real != null ? ` (ya cargado: ${x.real})` : ''}  (${x.validacion ? `compuerta: ${x.validacion}; ` : ''}${x.como})`);
  console.log(`\n${clubId}: ${nuevos.length} dato(s) para completar.${r.ensayos ? ` Jev en ensayo: ~US$ ${r.usd.toFixed(3)}; agregá --ejecutar.` : ''}`);
  if (partir) return partirFilaGlobal(clubId, d, r.res, { escribir });
  if (!escribir || !nuevos.length) return;
  const { snapshot, revertir, publicarCambios } = await import('./cargar.mjs');
  const dataRel = rutaData(clubId); const dataPath = resolve(ROOT, dataRel); const evRel = EV.rutaRel(clubId);
  const snap = snapshot([evRel]); const escritos = [dataRel, evRel];
  try {
    let t = readFileSync(dataPath, 'utf8'); let ev = EV.leer(clubId);
    const abreObj = t.indexOf('FiscalYearMeta = {'); const cierraObj = cierreDe(t, t.indexOf('{', abreObj));
    for (const x of nuevos) {
      const m = new RegExp(`\\n(\\s*)['"]?${x.anio}['"]?\\s*:\\s*\\{`).exec(t.slice(abreObj, cierraObj)); if (!m) throw new Error(`no encontré el año ${x.anio}`);
      const abre = abreObj + m.index + m[0].length - 1; const cierra = cierreDe(t, abre); let bloque = t.slice(abre, cierra);
      if (/\bstaffCost\s*:/.test(bloque)) continue;
      if (!/\bcash\s*:\s*[^,\n]+,/.test(bloque)) throw new Error(`${x.anio}: no encontré cash: para poner staffCost al lado`);
      bloque = bloque.replace(/(\bcash\s*:\s*[^,\n]+,)/, `$1 staffCost:${r6(x.valor)},`);
      ev = EV.agregarTexto(ev, x.anio, 'Meta', [`tools/caja-deuda.mjs --personal (${HOY}): staffCost ${r6(x.valor)} (compuerta: ${x.validacion}): ${x.como}`]);
      t = t.slice(0, abre) + bloque + t.slice(cierra);
    }
    writeFileSync(dataPath, t); EV.guardar(clubId, ev);
    const pr = publicarCambios(snap, [evRel], escritos);
    console.log(pr.ok ? `Escrito: ${pr.escritos.join(', ')} · ${pr.audit}` : `NO se escribió: ${pr.motivo}`);
  } catch (err) { const rv = revertir(snap, [evRel]); console.log(`NO se escribió: ${err.message} (se revirtió: ${rv.restaurados} restaurados)`); }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (A.includes('--personal') && A.includes('--ver-candidatos')) { // lo que recibiría Jev para un año, sin llamarlo
    const { G, S } = sitio(); const reg = registroDocs(); const a = aniosDe(G[flag('--club')], S).find((x) => x.anio === flag('--anio'));
    const cierre = cierreDeMd(a.md, reg); const car = a.md.split('/').slice(0, 3).join('/') + '/';
    const mds = [a.md, ...[...reg.values()].filter((e) => e.md && e.md !== a.md && e.pdf.startsWith(car) && cierre && cierreDeMd(e.md, reg) === cierre && existsSync(resolve(ROOT, e.md))).map((e) => e.md)];
    for (const c of mds.flatMap(candidatosPersonal)) console.log(`${c.md.split('/').pop()} L${c.linea}: ${String(c.etiqueta).slice(0, 60)} | ${c.cifras.slice(0, 2).join(' | ')}  (${c.contexto.slice(0, 120)})`);
    process.exit(0);
  }
  if (A.includes('--personal')) { if (A.includes('--medir')) await medirPersonal({ ejecutar: A.includes('--ejecutar'), club: flag('--club') }); else if (flag('--club')) await completarPersonal(flag('--club'), { ejecutar: A.includes('--ejecutar'), escribir: A.includes('--escribir'), partir: A.includes('--partir') }); process.exit(0); }
  if (A.includes('--medir')) { await medir({ club: flag('--club'), detalle: A.includes('--detalle'), ia: A.includes('--ia'), jev: A.includes('--jev'), escalas: A.includes('--escalas'), ejecutar: A.includes('--ejecutar') }); process.exit(0); }
  if (flag('--club')) { const r = await completarClub(flag('--club'), { ejecutar: A.includes('--ejecutar'), escribir: A.includes('--escribir') }); process.exit(r.error ? 1 : 0); }
  console.error('Uso: node tools/caja-deuda.mjs --club <clubId> [--ejecutar] [--escribir]  |  --medir [--club x] [--ia [--ejecutar]] [--detalle]'); process.exit(1);
}

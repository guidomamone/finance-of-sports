// ============================================================================
// tools/caja-deuda-md.mjs — el parseo del .md de un balance (importes, columnas de notas, filas y totales): lo usa la escalera de caja-deuda.mjs
// Mudado de tools/caja-deuda.mjs sin cambiar una línea (salvo `export`); tools/caja-deuda.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { normalizar, claveFamilia, CAJA_RE, TITULO_BALANCE_RE, TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE, FLUJO_O_PATRIMONIO_RE } from './vocabulario.mjs';
import { formaImposible } from './verify-numbers.mjs';
import { TOL } from './caja-deuda.mjs';

const PAG_RE = /^---\s*pág\.\s*(\d+)\s*---/i;
const IMPORTE_RE = /\(?-?\d{1,3}(?:[.,' ]\d{3})+(?:[.,]\d{1,2})?\)?|\(?-?\d+[.,]\d{1,2}\)?|\(?-?\b\d{1,}\b\)?/g;
const SECCION_PNC_RE = /^(passivo|pasivo)s?\s+(nao\s+corrente|no\s+corriente|nao\s+circulante)s?$|^non[\s-]?current\s+liabilities$|^dividas?\s+(a|de)\s+terceiros\s*[-–]\s*(m\s*\/\s*l(ongo)?|medio\s+e\s+longo|longo)\s+prazo$/u;
const SECCION_PC_RE = /^(passivo|pasivo)s?\s+(corrente|corriente|circulante)s?$|^current\s+liabilities$|^dividas?\s+(a|de)\s+terceiros\s*[-–]\s*curto\s+prazo$/u;
const SECCION_FIN_RE = /^(ativo|activo|assets|capital|patrimonio|equity|fundos proprios)\b/u;
const TOTAL_PASIVO_FIN_RE = /^total\s+(do\s+|del\s+|de\s+)?(passivo|pasivo|liabilities)s?$|^total\s+(do\s+)?capital\s+proprio\s+e\s+(do\s+)?passivo/u;

export const coincide = (a, b) => (Math.max(Math.abs(a), Math.abs(b)) < 0.0015 ? Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b)) * 1e-4 : Math.abs(a - b) <= TOL(b));

export function parseNumber(raw) {
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

// COLUMNAS DE NOTAS de cada tabla markdown: para cada renglón de una tabla, los índices de celda de las columnas
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

// COLUMNA DE NOTAS DE VARIOS NIVELES ("6.1", "6.8", "5.4.14"; Grecia: AEK), para SACAR esa celda de la fila (filasDelMd). Más
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

// COLUMNA CON FORMA DE NOTA, para la LECTURA B de una fila (escalera()): la primera columna con cifras después de la etiqueta,
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
    // el ENCABEZADO del bloque (las filas antes del primer separador "| --- |") es un título de columna, nunca una nota: no
    // cuenta para la compuerta. Caso: AEK 2025 transcribió el título "σημ." como "Α/Υ" (letras
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

// LA NOTA DE UNA FILA DEL BALANCE ("6.15"), para el escalón "la nota de la fila" (escalera()). Busca el título de la nota (un
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

// RENGLÓN DE TEXTO CON CIFRAS ("Caja      1.234 5.678"): lo mismo que /^(.*?\p{L}[^\d(]*?)\s+(CIFRAS)\s*$/u, que se usaba
// directo y era el 95% del tiempo de `--medir` (140 de 146 s): en una línea con una letra DESPUÉS de una tira de cifras con espacios, antes de
// fallar probaba todas las maneras de repartir esos espacios entre "dentro del número" y "separador". Acá se prueban los mismos cortes en el
// mismo orden (el rótulo más corto primero, como el .*? perezoso) y un corte se descarta enseguida si lo que sigue tiene un carácter que no
// puede estar en las cifras; si pasa, la MISMA expresión de las cifras se corre sobre ese pedazo. Devuelve lo mismo que .match().
const CIFRAS_RENGLON = /^([-(]?\d[\d.,' ]*\)?(?:\s+[-(]?\d[\d.,' ]*\)?)*)\s*$/u;
const SOLO_CIFRAS = /^[\d.,'()\-\s]*$/u;
// ETIQUETA Y CIFRAS SEPARADAS POR DOS ESPACIOS, sin regex: era /^(.*?\p{L}[^\d(]*?)\s{2,}([-(\d].*)$/u, que en un
// párrafo largo de prosa retrocede muchísimo (70% del tiempo de la tool: Benfica, 3 de 4,2 s). Misma respuesta: el primer tramo de 2 o más
// espacios seguido de "-", "(" o una cifra, con una letra antes y sin cifra ni "(" entre esa letra y el tramo. Medido sobre los 1.357.940
// renglones fuera de tabla de las 3.454 transcripciones: 0 distintos, 64 s -> 1,9 s.
function partirRenglon(t) {
  const tramos = /\s{2,}(?=[-(\d])/gu; let m; let ultLetra = -1, ultCifra = -1, hasta = 0;
  while ((m = tramos.exec(t))) {
    for (; hasta < m.index; hasta++) { const c = t[hasta]; if (/\p{L}/u.test(c)) ultLetra = hasta; else if (/[\d(]/.test(c)) ultCifra = hasta; }
    if (ultLetra >= 0 && ultLetra > ultCifra) return [t, t.slice(0, m.index), t.slice(m.index + m[0].length)];
  }
  return null;
}
// CIFRAS_RENGLON.test() sin retroceso: la expresión, cuando NO coincide, prueba todas las maneras de repartir los
// espacios entre "dentro del número" y "separador" (56% del tiempo de --medir, 13 de 23,5 s). Este autómata acepta exactamente lo mismo (A
// inicio, B después de "-" o "(", C dentro del número, D después de ")", F espacios); solo si acepta se corre la expresión para sacar las
// cifras, y entonces coincide enseguida. Medido sobre los 199.377 pedazos distintos de las 3.454 transcripciones: 0 distintos, 211 s -> 0,08 s.
function sonCifras(s) {
  const A = 1, B = 2, C = 4, D = 8, F = 16; let st = A;
  for (const ch of s) {
    const esp = /\s/u.test(ch), dig = ch >= '0' && ch <= '9'; let nx = 0;
    if (st & (A | F)) { if (ch === '-' || ch === '(') nx |= B; if (dig) nx |= C; }
    if (st & B) { if (dig) nx |= C; }
    if (st & C) { if (dig || ch === '.' || ch === ',' || ch === "'" || ch === ' ') nx |= C; if (ch === ')') nx |= D; if (esp) nx |= F; }
    if (st & D) { if (esp) nx |= F; }
    if (st & F) { if (esp) nx |= F; }
    st = nx; if (!st) return false;
  }
  return (st & (C | D | F)) !== 0;
}
function renglonDeTexto(t) {
  let letra = -1; let corte = -1; // última letra y último dígito o "(": el rótulo (.*?\p{L}[^\d(]*?) termina en una letra seguida de nada de eso
  for (let k = 0; k < t.length; k++) {
    const ch = t[k];
    if (/\s/u.test(ch) && letra > corte) {
      let p = k; while (p < t.length && /\s/u.test(t[p])) p++;
      const resto = t.slice(p);
      if (/^[-(]?\d/u.test(resto) && SOLO_CIFRAS.test(resto) && sonCifras(resto)) { const m = resto.match(CIFRAS_RENGLON); if (m) return [t, t.slice(0, k), m[1]]; }
    }
    if (/\p{L}/u.test(ch)) letra = k; else if (/[\d(]/.test(ch)) corte = k;
  }
  return null;
}

// Las filas de la transcripción: etiqueta + cifras (tablas markdown y renglones de texto), con su página y su línea.
// COLUMNAS DE CADA PERÍMETRO EN UNA MISMA TABLA. Olympiacos (perímetro individual) imprime el balance con el grupo y la sociedad
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
  // (caja y deuda, mejora 2) LA SECCIÓN DEL PASIVO de cada fila, por los títulos sin cifras de la tabla ("Passivo não corrente:", "Passivo
  // corrente:"): la usa parCorrienteYNoCorriente() cuando el subtotal del no corriente no tiene nombre. Un título de activo o de patrimonio,
  // o el total del pasivo, la cierra. No cambia ninguna lectura: solo agrega `seccion` a la fila.
  let seccion = null;
  // (deuda, mejora 1) EN QUÉ TABLA ESTÁ CADA FILA: un bloque de líneas "|" seguidas es una tabla (`tabla`, un número por documento). Lo usa
  // tablasDelTotal(). No cambia ninguna lectura.
  let tabla = 0; let enTabla = false;
  for (let i = 0; i < L.length; i++) {
    const l = L[i]; const m = l.match(PAG_RE); if (m) { pagina = Number(m[1]); enTabla = false; continue; }
    { const esT = l.trim().startsWith('|'); if (esT && !enTabla) tabla++; enTabla = esT; }
    textoPag.set(pagina, (textoPag.get(pagina) || '') + '\n' + l);
    let etiqueta = null; let crudos = []; const segmentos = []; let ixPrim = null; let jPrim = null;
    if (l.trim().startsWith('|')) {
      const celdas = l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
      if (celdas.every((c) => /^:?-{2,}:?$/.test(c) || !c)) continue;
      const iEt = celdas.findIndex((c) => /\p{L}{3,}/u.test(c)); if (iEt < 0) continue;
      { const t0 = normalizar(celdas[iEt]).replace(/[:*]/g, '').trim(); const sinCifras = celdas.every((c, j) => j === iEt || !/\d/.test(c));
        if (sinCifras && SECCION_PNC_RE.test(t0)) seccion = 'no-corriente';
        else if (sinCifras && SECCION_PC_RE.test(t0)) seccion = 'corriente';
        else if ((sinCifras && SECCION_FIN_RE.test(t0)) || TOTAL_PASIVO_FIN_RE.test(t0)) seccion = null; }
      // BALANCE DE DOS LADOS EN UNA FILA: "| Caixa | 4 | 952 | 85 | Empréstimos e financiamentos | 8 | 87 | 79 |". Cada etiqueta
      // con sus cifras es una fila (antes las del pasivo quedaban pegadas a la caja y la deuda no existía como fila). Caso: Novorizontino
      // 2018-2025 (la IA terminaba eligiendo la fila de "Caixa" como deuda porque esa línea dice "Empréstimos").
      // una celda con 1-2 letras y un número ("Γ.9", "C.7", "N4") es una REFERENCIA A
      // NOTA, nunca un importe: se descarta antes de tomar las cifras. Caso: AEL Larissa 2025 "| Δάνεια | Γ.9 | 7.031,22 | 7.500,00 |"
      // (.md L217) se leía como deuda 0,9 y corría la columna del año anterior un lugar (caja 2024 rechazada). La marca C/D de un balancete
      // va DESPUÉS del importe ("1.234 D"), así que no entra acá.
      // también una celda que NO PUEDE SER UN IMPORTE en ningún formato: un entero
      // con punto final ("24.") o un número con dos o más puntos y grupos de menos de 3 cifras ("7.1.3", "10.1.1"; un importe con separador
      // de miles siempre tiene grupos de 3). "6.8" o "12.4" NO entran (pueden ser decimales): los sigue resolviendo la lectura B. Casos
      // (lote 71, Grecia): Olympiacos 2017 L306 "| Ταμειακά διαθέσιμα | 24. | 1.820.725,55 |" se leía 24; Aris 2019 L504 "| ... | 7.1.3 |
      // 420.500,00 |" y Atromitos/Kifisia "| ... | 7.2.4 | 46.370,17 |" se leían 7 (la compuerta los rechazaba y el dato quedaba vacío).
      // y una LISTA DE NOTAS separada por ";" ("3;8;9;21;", con o sin ";" final): el ";" nunca separa miles ni decimales de un
      // importe. Caso: AVS 2022-23 "| Financiamentos obtidos | 3;8;9;21; | 4.495.141,06 | 2.062.069,19 |" (L352) daba deuda 38.921. También
      // con números de nota con punto: Famalicão 2022-23 "| Caixa e depósitos bancários | 3.7.; 4. | 1 159 543,44 |" (L404) daba
      // caja 3,7. Un "3.7" suelto, sin ";", sigue siendo ambiguo (puede ser un decimal).
      // y un CÓDIGO DE CUENTA NBB belga: un número con barra ("54/58", "631/4", "70/76A"; un importe
      // nunca lleva barra) o pegado a una A/B ("76A", "66B"; la marca C/D de un balancete va separada por un espacio). Caso: Lierse SK 2025 L169
      // "| Liquide middelen |  | 54/58 | 2.984 | 7.287 |" se leía 5.458: la misma caja 0,005458 en Lierse SK, Lokeren-Temse, Lommel SK, Patro
      // Eisden y RWDM. Medido: --medir deuda 168 → 170 iguales (Académico de Viseu 2023-2024), sin distintos nuevos; ensayo de 259 clubes igual
      // salvo Estrela da Amadora 2023 (sigue sin dato).
      const esRefNota = (c) => /^\d{1,4}\/\d{1,4}[AB]?$/.test(c) || /^\d{2,4}[AB]$/.test(c) || /^\p{L}{1,2}\s?\.?\s?\d{1,3}(?:\.\d{1,2})?$/u.test(c) || /^\d{1,3}\.$/.test(c) || /^\d{1,2}(?:\.\d{1,2}){2,3}\.?$/.test(c) || /^\d{1,2}(?:\.\d{1,2})*\.?(?:\s*;\s*\d{1,2}(?:\.\d{1,2})*\.?)+\s*;?$/.test(c);
      // una celda que termina en "%" es un porcentaje, nunca un importe. Caso: AEK 2019, la fila de ratios "| Άμεση ρευστότητα |
      // Ταμειακά διαθέσιμα | 7.935.424,59 | 52,44% |" (L161) daba 52,44 como "año anterior" de la caja, y la compuerta de 2018 la encontraba
      // antes que la fila del balance.
      const esTexto = (c) => /\p{L}{3,}/u.test(c); const esCifra = (c) => /\d/.test(c) && !/\p{L}{2,}/u.test(c) && !esRefNota(c) && !/%\s*$/.test(c);
      for (let j = iEt; j < celdas.length; j++) { if (!esTexto(celdas[j])) continue; let k = j + 1; const cs = []; const ix = []; while (k < celdas.length && !esTexto(celdas[k])) { if (esCifra(celdas[k])) { cs.push(celdas[k]); ix.push(k); } k++; } segmentos.push([celdas[j], cs, ix, j]); j = k - 1; }
      [etiqueta, crudos, ixPrim, jPrim] = segmentos.shift();
    } else {
      const t = l.replace(/\*\*/g, ''); if (!/\p{L}{3,}/u.test(t) || !/\d/.test(t)) continue;
      const mm = partirRenglon(t) || renglonDeTexto(t);
      if (!mm) continue; etiqueta = mm[1].trim(); crudos = (mm[2].match(IMPORTE_RE) || []);
    }
    const todas = [[etiqueta, crudos, ixPrim, jPrim], ...segmentos];
    for (const [et0, cr0, ix0, j0] of todas) { const etiqueta = et0; let crudos = cr0;
    // UNA CIFRA CON FORMA IMPOSIBLE invalida la fila entera (no se saca solo esa celda: correría
    // las columnas y el año anterior se leería como el actual). Forma imposible = dos separadores distintos y el último repetido ("13.950,790,99")
    // o el de miles después del decimal: un error del OCR. Caso: Espanyol 2025 L361, "Efectivo y otros activos líquidos equivalentes
    // 13.950,790,99 | 3.174.782,30" se leía 13.950,79 y la columna del año anterior confirmaba la caja (Jev la eligió bien). La fila de abajo,
    // "Tesorería 13.950.790,99", está bien leída. Medido: 1.960 cifras así en 118 transcripciones.
    if ((cr0 || []).some(formaImposible)) continue;
    let nums = crudos.map(parseNumber).filter((n) => n !== null);
    // Referencia a nota: un entero chico (1-2 dígitos, sin separador) al principio, seguido de más cifras.
    // (un 0 no es un número de nota. Fortaleza 2023 "Caja | 0 | 2.152" se leía 2.152, la columna del año anterior.)
    // UNA sola referencia a nota, no en bucle: el importe de al lado también puede ser un entero chico (miles). Caso:
    // Novorizontino 2020 "Caixa e equivalentes de caixa | 4 | 85 | 695 |" sacaba el 4 (nota) y el 85 (la caja, en miles) y leía 695 (2019).
    // ESCALERA DE LA LECTURA: escalón 1, si la tabla tiene una COLUMNA DE NOTAS
    // (columnasDeNotas) entre la etiqueta y la primera cifra, esa cifra es un importe: la celda de nota de esta fila está vacía. Escalón 2,
    // sin esa evidencia, la regla de siempre. Caso: Novorizontino 2019 "| Empréstimos |  | 27 | 24 |" (.md L193) descartaba el 27 (2019) y
    // leía el 24 (2018); se publicó deuda 32,32 en vez de 32,323 (la compuerta lo dejó pasar por la tolerancia de redondeo).
    // UNA CELDA DE LA COLUMNA DE NOTAS NO ES UN IMPORTE: si columnasDeNotasConPunto()
    // reconoció la columna, la cifra que cae en ella se saca antes de leer la fila. Caso: AEK 2016 y 2018, la caja se cargaba 6,8 EUR (la nota
    // 6.8) y la compuerta del documento siguiente lo aceptaba porque ese documento tiene la misma columna de notas.
    const colPunto = ix0 ? notasPunto.get(i) : null;
    const sacoNota = colPunto != null && ix0.includes(colPunto);
    if (sacoNota) { const k = ix0.indexOf(colPunto); crudos = crudos.filter((_, q) => q !== k); nums = crudos.map(parseNumber).filter((n) => n !== null); }
    // LECTURA B: la fila sin la celda que cae en una columna con forma de nota (si la lectura de siempre no la sacó ya).
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
    // para el DICCIONARIO (vocabulario.mjs, que busca la palabra al principio) la etiqueta va sin el código de cuenta de un
    // balancete ("2.2.01 EMPRESTIMOS...", "29 2201010001 - I-9 SPORTS"): la familia y la etiqueta impresa no cambian. Caso: Novorizontino
    // 2013-2017, "2.2.01 EMPRESTIMOS E FINANCIAMENTOS" no la reconocía el escalón 1 de deuda.
    // también una numeración de lista al principio ("4)", "a)", "IV.", "12."): Juventus 2005-06 L1967 "4) Due to banks".
    // y la numeración italiana "4 bis)", "5-bis)", "15 bis )" (y "ter"), antes que lo de arriba: sin esto
    // "4 bis) Debiti verso banche" quedaba "bis) Debiti verso banche" y el diccionario no la veía. Caso: Genoa 2022 (pág. 8, L304-312).
    const sinCodigo = etiqueta.replace(/^\s*\d{1,2}\s?-?\s?(?:bis|ter)\s?[.)]\s+(?=\p{L})/iu, '').replace(/^\s*(?:\d+\s+)?\d+(?:[.\-]\d+)*\s*(?:-\s+)?(?=\p{L})/u, '').replace(/^\s*(?:\d{1,2}|[a-z]|[ivxlc]{1,5})[.)]\s+(?=\p{L})/iu, '');
    const cd = (String(crudos[0] ?? '').match(/\s([CD])\s*$/i) || [])[1]?.toUpperCase() || null; // marca de balancete
    const codigo = ((etiqueta.match(/^\s*(?:\d{1,4}\s+)?(\d+(?:\.\d+)+|\d{4,})\s/) || [])[1] || '').replace(/\./g, '') || null;
    // el número de nota de la fila (la celda de la columna de notas, "6.15") y lo que dice su nota.
    const celdaNota = ix0 && (colPunto ?? colForma) != null ? (l.trim().replace(/^\||\|$/g, '').split('|')[colPunto ?? colForma] || '').replace(/\*\*/g, '').trim() : null;
    const nota = celdaNota && /^\d{1,2}(?:\.\d{1,2}){1,3}$/.test(celdaNota) ? notaDeFila(L, celdaNota) : null;
    // con columnas de perímetro: las cifras de cada uno, por separado. UNA compuerta: las cifras de la fila que caen en columnas
    // de perímetro se reparten en dos grupos del mismo largo (lo demás, la nota, no cuenta). conPerimetro() elige la del ajuste `perimetro`.
    let porPerimetro = null; const mp = ix0 ? colsPer.get(i) : null;
    if (mp) { const g = { consolidado: [], individual: [] }; ix0.forEach((k, q) => { const per = mp.get(k); const v = parseNumber(cr0[q]); if (per && v !== null) g[per].push(Math.abs(v)); }); if (g.consolidado.length && g.consolidado.length === g.individual.length) porPerimetro = g; }
    filas.push({ linea: i + 1, pagina, etiqueta, cd, codigo, norm: normalizar(sinCodigo), familia: claveFamilia(etiqueta), valor: nums[0], cifras: nums, ...(seccion ? { seccion } : {}), ...(l.trim().startsWith('|') ? { tabla } : {}), ...(lecturaB && lecturaB.valor !== nums[0] ? { lecturaB } : {}), ...(nota ? { nota } : {}), ...(porPerimetro ? { porPerimetro } : {}) });
    }
  }
  // Páginas del balance: título o total del activo/pasivo, y sin el título del flujo de efectivo / cambios en el patrimonio.
  // Dos ajustes PROPIOS de esta tool (no se tocaron las regex compartidas de vocabulario.mjs, que usan otras tools): (1) plurales: UC 2024
  // titula "Estados de Situación Financiera Consolidados" y su total es "TOTAL DE ACTIVOS", que TITULO_BALANCE / TOTAL_ACTIVO no reconocían
  // (la página 7 del visor, el balance, quedaba afuera); (2) un total con muchas palabras de más no es el del balance: "Total Activos Líquidos en
  // Moneda Extranjera" (UC 2024, Nota 25, págs. 46 y 94 del visor) marcaba como balance una nota con la caja partida por moneda.
  // la exclusión del flujo de efectivo / cambios en el patrimonio mira
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
  // la siguiente: con el mismo criterio (las filas no excluyen si la página trae su propio título de balance fuera de la tabla).
  for (const p of [...balance]) {
    const t = (textoPag.get(p + 1) || '').slice(0, 1500); const fuera = normalizar(sinTablas(t)); const enc = normalizar(encabezados(t));
    const tituloFuera = TITULO_BALANCE_RE.test(enc) || TITULO_BALANCE_PLURAL_RE.test(enc);
    if (textoPag.has(p + 1) && !FLUJO_O_PATRIMONIO_RE.test(tituloFuera ? fuera : normalizar(t))) balance.add(p + 1);
  }
  // (Probado y DESCARTADO: leer solo el "balance principal", el primer tramo de páginas seguidas: manta corta.)
  for (const f of filas) f.balance = balance.has(f.pagina);
  // PERÍMETRO DE CADA PÁGINA DEL BALANCE: una página con su propio título
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
export function esTotalBalance(n) {
  if (!(TOTAL_ACTIVO_RE.test(n) || TOTAL_PASIVO_RE.test(n) || TOTAL_BALANCE_RE.test(n))) return false;
  const resto = n.replace(TOTAL_BALANCE_RE, '').replace(TOTAL_ACTIVO_RE, '').replace(TOTAL_PASIVO_RE, '').trim().split(/\s+/).filter(Boolean);
  return resto.length <= 3; // "y patrimonio", "corrientes", "e patrimonio liquido": sí; "liquidos en moneda extranjera": no
}
// (deuda, mejora 1) LAS TABLAS DEL BALANCE PROPIAMENTE DICHO: las que tienen el total del pasivo (deuda) o del activo (caja). Los clubes
// grandes repiten las filas en tablas resumen del informe de gestión, en miles (Porto 2016-17: "Empréstimos Bancários" en L594/L598 y en el
// balance L860/L869; Porto 2015-16: "Caixa e depósitos bancários" 7.392 en L657 contra 7.392.033 en L976).
const ladoDelTotal = (cual) => (cual === 'cash' ? /\b(activos?|ativos?|assets)\b/u : /\b(pasivos?|passivos?|liabilities)\b/u);
// (idea de Guido) LA TABLA RESUMEN DE VARIOS AÑOS ES UN DESGLOSE: si el total del activo / pasivo de una
// tabla aparece, impreso, en la fila del total de una tabla ANTERIOR, y ahí está de la tercera columna en adelante (una serie de varios
// años, no el año ni el año anterior), esa tabla anterior es un resumen del informe de gestión: sus filas no cuentan para caja ni deuda.
// Tolera una unidad de redondeo. Caso: Benfica 2022-23, pág. 37 L939 "TOTAL PASSIVO | 364.619 | 325.917 | 379.606 | 424.718 | 444.617 |
// 19.899" y el balance, pág. 109 L3426 "TOTAL DO PASSIVO | | 444.617 | 424.718"; sus "Empréstimos bancários" y "Empréstimos obrigacionistas"
// se mezclaban con el par "Empréstimos obtidos" del balance y no decidía (2023-24: 483.356 en el resumen, 483.357 en el balance). Desde la
// tercera columna porque en la primera o la segunda coincide también un balance repetido (Benfica 2018-19, L2646 y L2902) o una tabla de
// reexpresión (Botafogo 2025), que no son resúmenes.
export function tablasResumen(filas, cual) {
  const lado = ladoDelTotal(cual);
  const tots = filas.filter((f) => f.balance && esTotalBalance(f.norm) && lado.test(f.norm) && f.tabla != null);
  const out = new Set();
  for (const a of tots) for (const b of tots) if (a.tabla !== b.tabla && a.linea < b.linea && a.cifras.findIndex((c) => Math.abs(c - b.valor) <= 1) >= 2) out.add(a.tabla);
  return out;
}
function tablasDelTotal(filas, cual) {
  const lado = ladoDelTotal(cual); const resumen = tablasResumen(filas, cual);
  // Un total en texto corrido (sin tabla) cuenta como una tabla más ('texto'): Botafogo 2025 trae el balance en texto (pág. 31) y la tabla de
  // reexpresión del año anterior (pág. 44) es la única con tabla; sin esto, quedaba esa.
  return new Set(filas.filter((f) => f.balance && esTotalBalance(f.norm) && lado.test(f.norm) && !resumen.has(f.tabla)).map((f) => f.tabla ?? 'texto'));
}
// Si una familia tiene filas en más de una tabla y una de esas tablas es la ÚNICA del documento con el total, quedan solo las de esa tabla.
// Una familia en una sola tabla, o sin tabla del total, queda igual.
export function soloTablaDelBalance(xs, filas, cual) {
  // UNA sola tabla con el total en el documento: con dos (Botafogo 2025, el balance y la tabla de reexpresión del año anterior, cada una con
  // su "Total do Passivo") no se sabe cuál es el balance del año, y queda como antes.
  const tt = tablasDelTotal(filas, cual); if (tt.size !== 1) return xs;
  const porFam = new Map(); for (const f of xs) porFam.set(f.familia, [...(porFam.get(f.familia) || []), f]);
  const out = [];
  for (const [, fs] of porFam) { const tablas = new Set(fs.map((f) => f.tabla)); const enTotal = fs.filter((f) => tt.has(f.tabla)); out.push(...(tablas.size > 1 && enTotal.length ? enTotal : fs)); }
  return xs.filter((f) => out.includes(f));
}
export const totalDelBalance = (t) => esTotalBalance(t.norm); // "Total dos Ativos Correntes", "Total do Ativo"...
export const dedupe = (fs) => { const vistos = new Set(); return fs.filter((f) => { const k = `${f.familia}|${f.valor}`; if (vistos.has(k)) return false; vistos.add(k); return true; }); };
export const r6 = (x) => Math.round(x * 1e6) / 1e6;
export const cita = (f) => ({ etiqueta: f.etiqueta, importe: f.valor, anterior: f.cifras.length > 1 ? f.cifras[1] : null, pagina: f.pagina, linea: f.linea });
export const filtroDe = (cual) => (cual === 'cash' ? () => true : (f) => !CAJA_RE.test(f.norm));

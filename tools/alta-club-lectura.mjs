// ============================================================================
// tools/alta-club-lectura.mjs — leer un documento: fechas de cierre, tipo de cambio declarado, número de página, nombre legal y portada del club
// Mudado de tools/alta-club.mjs sin cambiar una línea (salvo `export`); tools/alta-club.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { ajusteDe } from './ajustes.mjs';
import { agregarCaso, casoYRespuesta } from './cola.mjs';
import { MONEDAS, MESES, MES_ALT, norm, ultimoDia, pad2, campo } from './alta-club.mjs';
import { normalizarPropuesta, isoDeCarpeta } from './alta-club-nombre-pais.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const FX_PALABRAS = ['tipo de cambio', 'tipos de cambio', 'cotizacion', 'taxa de cambio', 'taxas de cambio', 'ptax', 'cotacao', 'exchange rate', 'rate of exchange', 'rates of exchange', 'tasso di cambio', 'tassi di cambio', 'taux de change', 'wechselkurs', 'devisenkurs', 'stichtagskurs', 'wisselkoers', 'valutakurs', 'kurs ', 'kurz', 'tecaj', 'doviz kuru', 'kuru', 'курс', 'ισοτιμ', '환율', '汇率', 'trm', 'tasa representativa'];
const USD_PALABRAS = ['usd', 'us$', 'u$s', 'dolar', 'dollar', 'доллар', 'долар', 'δολαρ', '달러', '美元', 'dolár', 'dolaru', 'dolara'];
const ANCLAS_FX = ['moneda extranjera', 'foreign currenc', 'moeda estrangeira', 'moedas estrangeiras', 'valuta estera', 'valute estere', 'fremmed valuta', 'fremmede valuta', 'vreemde valuta', 'fremdwahrung', 'devises', 'cizi men', 'иностранн', 'іноземн', 'ξενο νομισμα', 'yabanci para', 'doviz', '외화', '外币', 'cotizacion', 'tipo de cambio', 'taxa de cambio', 'exchange rate'];
const CIERRE_PALABRAS = ['cierre', 'closing', 'fechamento', 'encerramento', 'chiusura', 'stichtag', 'balansdag', 'closing rate', 'year end', 'year-end', 'al 31', 'al 30', 'em 31', 'at 31', 'at 30', 'на 31', 'на конец', 'станом на', 'kapanış', 'donem sonu', 'dönem sonu', '기말', '期末'];
const FORMAS = ['a/s', 'aps', 'asa', 'as', 'ab', 'n\\.v\\.', 'nv', 'b\\.v\\.', 'bv', 'vzw', 'srl', 's\\.a\\.d\\.', 'sad', 's\\.a\\.', 'sa', 'saf', 's\\.p\\.a\\.', 'spa', 's\\.r\\.l\\.', 'gmbh & co\\.? kgaa', 'gmbh', 'ag', 'e\\.v\\.', 'plc', 'ltd\\.?', 'limited', 'a\\.s\\.', 's\\.r\\.o\\.', 'z\\.s\\.', 'd\\.d\\.', 's\\.d\\.d\\.', 'd\\.o\\.o\\.', 'a\\.ş\\.', 'p\\.a\\.e\\.', 'π\\.α\\.ε\\.', 'παε', 'fli', 'inc\\.?', 'co\\., ltd\\.?', 'ltda\\.?', 's\\.a\\.s\\.', 'kgaa', 'oyj', 'ооо', 'ао', 'пао', 'тов', 'пат'];

// ============================================================================
// LECTURA DEL DOCUMENTO
// ============================================================================
// Todas las fechas de fin de mes del texto: {mes, anio, fecha:'YYYY-MM-DD'}.
export function fechasFinDeMes(texto) {
  const t = norm(texto);
  const out = [];
  const push = (d, m, y) => {
    d = +d; m = +m; y = +y;
    if (!(m >= 1 && m <= 12) || y < 1980 || y > 2035) return;
    const ult = ultimoDia(y, m);
    if (d === ult || (m === 2 && d >= 28)) out.push({ mes: m, anio: y, fecha: `${y}-${pad2(m)}-${pad2(ult)}` });
  };
  // "31 de diciembre de 2024", "30 giugno 2024", "31. prosinca 2024.", "31 декабря 2023 г.",
  // y el encabezado típico de un balance comparativo: "Em 31 de dezembro de 2023 e 2024".
  const reNombre = new RegExp(`(?<![0-9])(\\d{1,2})\\.?\\s*(?:de\\s+|del\\s+)?(${MES_ALT})\\.?,?\\s*(?:de\\s+|del\\s+)?(\\d{4})(?:\\s+(?:e|y|and|und|en|et|i|og|ve|и|і|και)\\s+(\\d{4}))?`, 'g');
  for (const m of t.matchAll(reNombre)) { push(m[1], MESES[m[2]], m[3]); if (m[4]) push(m[1], MESES[m[2]], m[4]); }
  // "June 30, 2025"
  const reIngles = new RegExp(`(?<![a-z])(${MES_ALT})\\s+(\\d{1,2}),?\\s+(\\d{4})`, 'g');
  for (const m of t.matchAll(reIngles)) push(m[2], MESES[m[1]], m[3]);
  // "31.12.2024", "31/12/2024", "06/30/2025" (si el 2do número pasa de 12, es mes/día)
  for (const m of t.matchAll(/(?<![\d.,])(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?![\d])/g)) {
    if (+m[2] > 12 && +m[1] <= 12) push(m[2], m[1], m[3]); else push(m[1], m[2], m[3]);
  }
  // ISO y "2024.12.31"
  for (const m of t.matchAll(/(?<![\d])(\d{4})[-./](\d{1,2})[-./](\d{1,2})(?![\d])/g)) push(m[3], m[2], m[1]);
  // CJK: 2024년 12월 31일 / 2024年12月31日
  for (const m of t.matchAll(/(\d{4})\s*[년年]\s*(\d{1,2})\s*[월月]\s*(\d{1,2})\s*[일日]/g)) push(m[3], m[2], m[1]);
  return out;
}

// El mes de cierre y el año del ejercicio que muestra un texto.
export function cierreDelTexto(texto) {
  const fechas = fechasFinDeMes(texto);
  if (!fechas.length) return null;
  const porMes = {};
  for (const f of fechas) porMes[f.mes] = (porMes[f.mes] || 0) + 1;
  const [mesTop, nTop] = Object.entries(porMes).sort((a, b) => b[1] - a[1])[0];
  const share = nTop / fechas.length;
  const porAnio = {};
  for (const f of fechas) if (f.mes === +mesTop) porAnio[f.anio] = (porAnio[f.anio] || 0) + 1;
  const maxN = Math.max(...Object.values(porAnio));
  // El año del ejercicio: el más nuevo que aparece con peso real (un balance cita el
  // año comparativo casi tantas veces como el propio; una fecha posterior suelta —
  // hechos posteriores, la fecha de aprobación— no llega al umbral).
  const anios = Object.entries(porAnio).filter(([, n]) => n >= Math.max(2, 0.3 * maxN)).map(([y]) => +y);
  const anio = anios.length ? Math.max(...anios) : +Object.entries(porAnio).sort((a, b) => b[1] - a[1])[0][0];
  return { mes: +mesTop, n: nTop, total: fechas.length, share, anio, porMes };
}

// La fecha que trae el propio nombre del archivo (OFI_FS_AAAA-MM-DD, Genoa-bilancio-30.06.2024,
// trabzonspor-...-31-05-2021), si es un fin de mes.
export function cierreDelNombre(nombre) {
  const f = fechasFinDeMes(nombre.replace(/_/g, ' '));
  if (f.length) return f[f.length - 1];
  // "ESTADO-DE-SITUACION-FINANCIERA-DICIEMBRE-2022": mes con nombre completo + año, sin día.
  const n = norm(nombre);
  const m = n.match(new RegExp(`(?<![a-z])(${Object.keys(MESES).filter((k) => k.length >= 5).join('|')})[-_ .]+(\\d{4})(?!\\d)`));
  if (m) { const mes = MESES[m[1]]; const y = +m[2]; return { mes, anio: y, fecha: `${y}-${pad2(mes)}-${pad2(ultimoDia(y, mes))}` }; }
  return null;
}

// Misma función que tools/quien.mjs (guessYear): año de CIERRE a partir del nombre.
export function anioDelNombre(filename) {
  const iso = filename.match(/(?<!\d)(\d{4})[-_](0[1-9]|1[0-2])[-_](0[1-9]|[12]\d|3[01])(?!\d)/);
  if (iso) return parseInt(iso[1], 10);
  const dmy = filename.match(/(?<!\d)(0[1-9]|[12]\d|3[01])[-_.](0[1-9]|1[0-2])[-_.](\d{4})(?!\d)/);
  if (dmy) return parseInt(dmy[3], 10);
  const range = filename.match(/(\d{4})[-_](\d{2,4})(?!\d)/);
  if (range) {
    const start = parseInt(range[1], 10);
    if (range[2].length === 4) return parseInt(range[2], 10);
    const endYear = parseInt(range[1].slice(0, 2) + range[2], 10);
    if (endYear === start + 1) return endYear;
  }
  const single = filename.match(/(?<!\d)((?:19|20)\d{2})(?!\d)/);
  return single ? parseInt(single[1], 10) : null;
}

export function contar(texto, re) {
  return (texto.match(re) || []).length;
}

// Cuántas veces el texto nombra cada moneda (por sus tokens).
export function menciones(textoNorm, codigo) {
  const cfg = MONEDAS[codigo];
  if (!cfg) return 0;
  let n = 0;
  for (const tok of cfg.tokens) {
    const esSimbolo = /^[^a-zа-яα-ω]/i.test(tok) || /[^\x00-\x7f]/.test(tok);
    const re = esSimbolo ? new RegExp(tok, 'g') : new RegExp(`(?<![a-z])${tok}(?![a-z])`, 'g');
    n += contar(textoNorm, re);
  }
  return n;
}

// Números de una línea, en cualquier formato (1.234,56 / 1,234.56 / 909,5 / 6.2573).
function numerosDe(linea) {
  const out = [];
  for (const m of linea.matchAll(/(?<![\d.,])\d{1,3}(?:[.,\s]\d{3})*(?:[.,]\d+)?(?![\d])|(?<![\d.,])\d+(?:[.,]\d+)?(?![\d])/g)) {
    const raw = m[0].trim();
    // Un pedazo de fecha ("28.07" de "28.07.2008", "31/12") no es un número.
    const despues = linea.slice(m.index + m[0].length, m.index + m[0].length + 2);
    const antes = linea.slice(Math.max(0, m.index - 2), m.index);
    if (/^[./-]\d/.test(despues) || /\d[./-]$/.test(antes)) continue;
    let s = raw.replace(/\s/g, '');
    const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
    if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
    else if (c !== -1) s = /,\d{3}$/.test(s) && s.length > 5 ? s.replace(/,/g, '') : s.replace(',', '.');
    else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 4) s = s.replace(/\./g, '');
    const n = parseFloat(s);
    if (Number.isNaN(n)) continue;
    // Un año suelto (2021) no es un tipo de cambio.
    if (/^(19|20)\d{2}$/.test(raw)) continue;
    out.push({ n, raw });
  }
  return out;
}

// REGLA #0 de club-data-mapping/referencia/fx.md: ¿el documento declara su propio tipo de cambio a USD?
// COMPUERTA DE FECHA (escalera del tipo de cambio aprobada por Guido): una cotización cuya frase (la línea y sus
// vecinas) trae una fecha completa que NO es la del cierre no es la de cierre: es la de una operación. Se descarta y la escalera sigue (tabla,
// serie oficial). Caso real: Fortaleza CEIF 2025, L534 "El 20 de noviembre del año 2025, se realizó un traslado de dineros ... por USD
// 150.000 a la TRM de $ 3.716,73": se tomaba como declarado; la TRM oficial al 31-12-2025 es 3.757,08. Una cotización SIN fecha en su frase
// pasa como antes (los anexos "TC 41,50" de Racing o River no la traen).
export function fxDeclarado(md, moneda, mercado, cierre = null) {
  const lineas = md.split('\n');
  const cfg = MONEDAS[moneda];
  if (!cfg || moneda === 'USD') return { candidatos: [], lineasConMencion: 0 };
  const [min, max] = cfg.rango;
  const candidatos = [];
  let lineasConMencion = 0; const descartadas = [];
  // El caso típico no es una frase sino un ANEXO: "ACTIVOS Y PASIVOS EN MONEDA EXTRANJERA" con una
  // columna "TC" / "Cambio vigente" y filas "Banco ... U$S 41,50 ..." varias líneas más abajo
  // (Racing Anexo VI, River Anexo V, Newell's Anexo I). Por eso además de la ventana de ±1 línea,
  // cuenta como contexto de tipo de cambio cualquier encabezado de ese tipo en las 40 líneas previas.
  let ancla = -1000;
  for (let i = 0; i < lineas.length; i++) {
    const ln = norm(lineas[i]);
    if (ANCLAS_FX.some((p) => ln.includes(p)) || /(^|[\s|])(tc|t\.c\.|cambio vigente|cambio al cierre)([\s|]|$)/.test(ln)) ancla = i;
    const ventana = norm([lineas[i - 1] || '', lineas[i], lineas[i + 1] || ''].join(' '));
    const tieneUsd = USD_PALABRAS.some((p) => ln.includes(p));
    if (!tieneUsd) continue;
    if (!FX_PALABRAS.some((p) => ventana.includes(p)) && i - ancla > 40) continue;
    // Solo números con parte decimal (un tipo de cambio se imprime "41,50", "6,2573", "1.203,00")
    // y que no sean el número de una nota o un anexo ("(Nota 3)").
    const nums = numerosDe(lineas[i]).filter(({ raw }) => /[.,]\d{1,4}$/.test(raw) && !new RegExp(`(nota|note|notes|anexo|annex|pag|page|punto)\\s*n?[°º.]?\\s*${raw.replace(/[.]/g, '\\.')}`).test(ln));
    // Una mención narrativa sin ningún número ("el préstamo en dólares se convirtió...,
    // la oscilación del tipo de cambio no incidió") no es una declaración de tipo de cambio.
    if (!nums.length) continue;
    lineasConMencion++;
    for (const { n, raw } of nums) {
      if (n < min || n > max) continue;
      // Si hay serie de mercado para ese día, lo que se aleja más de 20% no es un tipo de cambio de cierre.
      if (mercado && Math.abs(n / mercado - 1) > 0.2) continue;
      const fechasFrase = cierre ? fechasDe([lineas[i - 1] || '', lineas[i], lineas[i + 1] || ''].join(' ')) : [];
      if (fechasFrase.length && !fechasFrase.includes(cierre)) { descartadas.push({ valor: n, linea: i + 1, fechas: fechasFrase }); continue; }
      candidatos.push({ valor: n, raw, linea: i + 1, texto: lineas[i].trim().slice(0, 220), cierre: CIERRE_PALABRAS.some((p) => ventana.includes(p)) });
    }
  }
  // Agrupa valores a menos de 0,5% entre sí.
  const grupos = [];
  for (const c of candidatos) {
    const g = grupos.find((x) => Math.abs(x.valor / c.valor - 1) < 0.005);
    if (g) g.items.push(c); else grupos.push({ valor: c.valor, items: [c] });
  }
  return { grupos, lineasConMencion, descartadas };
}

// La fecha de la COLUMNA en la que está la cotización `item` (de fxDeclarado), o null. Estricto a propósito: una versión anterior que
// aceptaba años sueltos y frases se equivocó en 4 de 17 documentos (Fluminense 2022, Argentinos 2019, Racing 2012, San Lorenzo 2015).
//   - la línea de la cotización tiene que ser una FILA DE TABLA: 2+ números con decimales separados por 2+ espacios o por "|" (no una
//     frase como "fue de $18.0012 y $20.7862 al 31 de diciembre de 2025 y 2024");
//   - hasta 8 líneas arriba, la primera línea con 2+ FECHAS COMPLETAS (día, mes y año: 31-12-2025, 31/12/2025, 2025-12-31, "31 de diciembre
//     de 2025") es el encabezado; tiene que tener exactamente tantas fechas como números con decimales tiene la fila, y no repetir fechas;
//   - entonces la k-ésima fecha es la de la k-ésima columna.
const MESES_FX = { enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  // turco (norm() ya pasó ı a i y quitó las diéresis): Beşiktaş "31 Mayıs 2008"
  ocak: 1, subat: 2, mart: 3, nisan: 4, mayis: 5, haziran: 6, temmuz: 7, agustos: 8, eylul: 9, ekim: 10, kasim: 11, aralik: 12 };
function fechasDe(linea) {
  const out = []; const t = norm(linea);
  for (const m of t.matchAll(/\b(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})\b|\b(\d{4})-(\d{2})-(\d{2})\b|\b(\d{1,2}) (?:de )?([a-z]+),? (?:de |del )?(?:ano )?(\d{4})\b/g)) {
    if (m[3]) out.push(`${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`);
    else if (m[4]) out.push(`${m[4]}-${m[5]}-${m[6]}`);
    else if (MESES_FX[m[8]]) out.push(`${m[9]}-${String(MESES_FX[m[8]]).padStart(2, '0')}-${String(m[7]).padStart(2, '0')}`);
  }
  return out;
}
export function fechaDeColumna(md, item) {
  const L = md.split('\n'); const i = item.linea - 1; const fila = L[i] || '';
  const nums = numerosDe(fila).filter(({ raw }) => /[.,]\d{1,4}$/.test(raw));
  const enColumnas = fila.includes('|') || nums.every(({ raw }) => new RegExp(`(\\s{2,}|^)${raw.replace(/[.]/g, '\\.')}(\\s{2,}|$)`).test(fila));
  if (nums.length < 2 || !enColumnas) return null;
  const k = nums.findIndex(({ raw }) => raw === item.raw);
  if (k < 0) return null;
  for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
    const f = fechasDe(L[j]);
    if (f.length >= 2) return f.length === nums.length ? f[k] : null; // una fecha por columna; puede repetirse (importe, tipo y total de cada año bajo la misma fecha)
  }
  return null;
}

// La fecha de un valor que NO está en una tabla con una fecha por columna sino en un bloque: una línea que es solo una fecha ("31.05.2006") y,
// dentro de las 3 siguientes, una tabla. Solo identifica de qué fecha es el valor; quién gana lo sigue decidiendo la regla de la fecha más nueva.
export function fechaDeBloque(md, item) {
  const L = md.split('\n');
  for (let j = item.linea - 2; j >= Math.max(0, item.linea - 62); j--) {
    const t = L[j].trim(); if (!t) continue;
    if (/^[\d./ -]{8,12}$/.test(t) || /^\d{1,2} [^\W\d_]+ \d{4}$/u.test(t)) {
      const f = fechasDe(t);
      if (f.length === 1 && L.slice(j + 1, j + 5).some((x) => x.trimStart().startsWith('|'))) return f[0];
    }
  }
  return null;
}

// Series locales de tools/fx-reference/ (las mismas que lee tools/lookup-fx-close.js).
export const SERIES_FX = { ARS: 'ars-usd.json', BRL: 'brl-usd.json', COP: 'cop-usd.json', NOK: 'nok-usd.json', CZK: 'czk-usd.json', CHF: 'chf-usd.json', TRY: 'try-usd.json', RUB: 'rub-usd.json', UAH: 'uah-usd.json', KRW: 'krw-usd.json', CLP: 'clp-usd.json', EUR: 'eur-usd.json', DKK: 'dkk-usd.json', GBP: 'gbp-usd.json',
  SEK: 'sek-usd.json', PLN: 'pln-usd.json', HRK: 'hrk-usd.json', JPY: 'jpy-usd.json', CNY: 'cny-usd.json', MXN: 'mxn-usd.json', PEN: 'pen-usd.json' };
export const FUENTE_SERIE = { ARS: 'Dólar mayorista BCRA', BRL: 'PTAX de cierre (venda) del Banco Central do Brasil', COP: 'TRM oficial (Banco de la República / Superfinanciera de Colombia)',
  NOK: 'Tipo medio de referencia de Norges Bank', CZK: 'Fixing del Česká národní banka', CHF: 'Noon buying rate de Nueva York (Reserva Federal, H.10)',
  TRY: 'Döviz alış del TCMB', RUB: 'Tipo oficial del Banco de Rusia', UAH: 'Tipo oficial del Banco Nacional de Ucrania', KRW: 'Noon buying rate de Nueva York (Reserva Federal, H.10)', CLP: 'Dólar observado (Banco Central de Chile, publicado por el SII)',
  EUR: 'Tipo de referencia del Banco Central Europeo', DKK: 'Tipo oficial de Danmarks Nationalbank', GBP: 'Tipo spot del Bank of England',
  SEK: 'Tipo medio del Sveriges Riksbank', PLN: 'Tipo medio del Narodowy Bank Polski (tabla A)', HRK: 'Tipo medio de la Hrvatska narodna banka',
  JPY: 'Noon buying rate de Nueva York (Reserva Federal, H.10)', CNY: 'Noon buying rate de Nueva York (Reserva Federal, H.10)', MXN: 'Noon buying rate de Nueva York (Reserva Federal, H.10)',
  PEN: 'Tipo de cambio del BCRP, publicado por el Banco de Pagos Internacionales' };
// Monedas cuya cotización de un cierre es la del PRIMER día con dato POSTERIOR (la serie publica el valor de un día al día siguiente). Mismo
// criterio que `diaCierre: 'siguiente'` en tools/lookup-fx-close.js (verificado para CLP contra los cierres declarados de UC y
// Palestino). Si se agrega otra moneda con esa convención, va en los dos lugares.
const FX_DIA_SIGUIENTE = new Set(['CLP']);
export function fxDeSerie(moneda, fecha) {
  const f = SERIES_FX[moneda];
  if (!f) return { error: `sin serie local para ${moneda} (hoy solo ${Object.keys(SERIES_FX).join(', ')})` };
  const p = resolve(ROOT, 'tools/fx-reference', f);
  if (!existsSync(p)) return { error: `no existe tools/fx-reference/${f}` };
  const data = JSON.parse(readFileSync(p, 'utf8'));
  if (fecha < data.rangeFrom || fecha > data.rangeTo) return { error: `${fecha} fuera del rango bajado (${data.rangeFrom} a ${data.rangeTo})` };
  if (FX_DIA_SIGUIENTE.has(moneda)) {
    const d = new Date(fecha + 'T00:00:00Z');
    for (let i = 0; i < 10; i++) { d.setUTCDate(d.getUTCDate() + 1); const c = d.toISOString().slice(0, 10); if (c in data.series) return { fx: data.series[c], fecha: c, exacto: false }; }
    return { error: 'sin cotización en los 10 días siguientes al cierre' };
  }
  if (fecha in data.series) return { fx: data.series[fecha], fecha, exacto: true };
  const d = new Date(fecha + 'T00:00:00Z');
  for (let i = 0; i < 10; i++) {
    d.setUTCDate(d.getUTCDate() - 1);
    const c = d.toISOString().slice(0, 10);
    if (c in data.series) return { fx: data.series[c], fecha: c, exacto: false };
  }
  return { error: 'sin cotización ni en los 10 días hábiles anteriores' };
}

// Nombre legal: línea con un token del nombre del club + una forma societaria.
export function nombreLegal(md, displayName) {
  // un nombre en plural ("Harlequins") se busca también en singular ("HARLEQUIN FOOTBALL CLUB LIMITED"): sin eso la línea del nombre legal no pasaba
  // el filtro y ganaba una frase del texto ("Harlequins' position as"). Medido en la primera transcripción de 400 carpetas de club: solo cambia Harlequins.
  const base = norm(displayName).split(/[^a-z0-9]+/).filter((t) => t.length >= 4);
  const tokens = [...new Set(base.flatMap((t) => (t.length >= 7 && t.endsWith('s') ? [t, t.slice(0, -1)] : [t])))];
  if (!tokens.length) return null;
  const formas = FORMAS.join('|');
  const re = new RegExp(`([A-Za-zÀ-ÿĀ-žΑ-ωА-я0-9][^\\n|#*]{2,110}?(?<![A-Za-z])(?:${formas}))(?![A-Za-z])`, 'gi');
  const cuenta = {};
  for (const lineaCruda of md.split('\n').slice(0, 4000)) {
    const linea = lineaCruda.replace(/[*_#>|]/g, ' ').replace(/\s+/g, ' ').trim();
    if (linea.length > 300) continue;
    const ln = norm(linea);
    if (!tokens.some((t) => ln.includes(t))) continue;
    for (const m of linea.matchAll(re)) {
      let s = m[1].trim().replace(/^[\d.)\-–:\s]+/, '');
      // Se queda con el tramo que arranca en el primer token del club (o una palabra antes).
      const nl = norm(s);
      const idx = Math.min(...tokens.map((t) => nl.indexOf(t)).filter((x) => x >= 0));
      if (!Number.isFinite(idx)) continue;
      const antes = s.slice(0, idx).trim().split(/\s+/);
      const prefijo = antes.length && antes[antes.length - 1] && antes[antes.length - 1].length <= 12 && /^[A-ZÀ-ÝΑ-ΩА-Я0-9]/.test(antes[antes.length - 1]) ? antes[antes.length - 1] + ' ' : '';
      s = (prefijo + s.slice(idx)).trim();
      if (s.length < 4 || s.length > 90) continue;
      cuenta[s] = (cuenta[s] || 0) + 1;
    }
  }
  const orden = Object.entries(cuenta).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length);
  return orden.length ? { nombre: orden[0][0], veces: orden[0][1], otros: orden.slice(1, 4).map(([k, v]) => `${k} (${v})`) } : null;
}

// NOMBRE DE LA PORTADA. La portada (las primeras líneas del .md, hasta la pág. 3)
// nombra la sociedad que presenta el balance; lo más frecuente del documento entero, no: en un consolidado (y también en un individual, en las
// notas) las controladas aparecen más veces que el club (Hellas Verona 2020: "Hellas Verona Service S.r.l." 9 veces contra 1). Medido en las
// 16 altas italianas: la portada acierta la entidad en las 5 que se corrigieron a mano. Recorte: desde la primera palabra del club hacia atrás,
// mientras sean parte del nombre (abreviaturas "A.S.", "U.S.", palabras con mayúscula), cortando en "di", "of", "bilancio", "organi sociali"...
// (nombreLegal() suma como mucho UNA palabra de adelante: "CALCIO MONZA S.p.A." de "ASSOCIAZIONE CALCIO MONZA S.p.A.").
const CORTA_NOMBRE = new Set(['gruppo', 'group', 'grupo', 'groupe', 'di', 'de', 'del', 'della', 'dello', 'dei', 'degli', 'des', 'du', 'do', 'da', 'dos', 'das', 'of', 'von', 'van', 'der', 'al', 'bilancio', 'relazione', 'organi', 'sociali', 'report', 'annual', 'financial', 'statements', 'informe', 'memoria', 'balance', 'jaarverslag', 'jahresabschluss', 'sulla', 'gestione', 'consolidato', 'esercizio', 'societa', 'company', 'sociedad']);
export function nombrePortada(md, displayName) {
  const tokens = norm(displayName).split(/[^a-z0-9]+/).filter((x) => x.length >= 4); if (!tokens.length) return null;
  const re = new RegExp(`([A-Za-zÀ-ÿĀ-žΑ-ωА-я0-9][^\\n|#*]{2,110}?(?<![A-Za-z])(?:${FORMAS.join('|')}))(?![A-Za-z])`, 'gi');
  const L = md.split('\n'); let fin = L.findIndex((l) => /^---\s*pág\.\s*3\s*---/i.test(l)); if (fin < 0 || fin > 80) fin = Math.min(80, L.length);
  const cands = [];
  for (let i = 0; i < fin; i++) {
    const cruda = L[i]; const linea = cruda.replace(/[*_#>|]/g, ' ').replace(/\s+/g, ' ').trim(); if (!linea || linea.length > 200) continue;
    if (!tokens.some((x) => norm(linea).includes(x))) continue;
    for (const m of linea.matchAll(re)) {
      const pal = m[1].trim().split(/\s+/); const k = pal.findIndex((w) => tokens.some((x) => norm(w).includes(x))); if (k < 0) continue;
      // un conector ("&", "y", "e", "and") entre dos palabras del nombre también es del nombre ("AZUL & BLANCO MILLONARIOS")
      const conector = (j) => j > 0 && /^(&|y|e|and|und|et)$/i.test(pal[j]) && /^[A-ZÀ-ÝΑ-ΩА-Я0-9]/.test(pal[j - 1] || '');
      let ini = k; while (ini > 0 && (conector(ini - 1) || (!CORTA_NOMBRE.has(norm(pal[ini - 1]).replace(/[^a-z]/g, '')) && /^[A-ZÀ-ÝΑ-ΩА-Я0-9]/.test(pal[ini - 1]) && !/[:;,]$/.test(pal[ini - 1])))) ini--;
      const s = pal.slice(ini).join(' ').replace(/^[)\-–:\s]+/, '').trim(); if (s.length >= 4 && s.length <= 90) cands.push({ s, titulo: /^\s*#/.test(cruda), i });
    }
  }
  const c = cands.find((x) => x.titulo) || cands[0]; return c ? c.s : null;
}
// MAYÚSCULAS: un nombre en mayúsculas ("BOLOGNA F.C. 1909 S.P.A.") toma la variante bien escrita que el propio documento use
// para la misma entidad ("Bologna F.C. 1909 S.p.A.", 4 veces); si no hay, se escribe con inicial mayúscula, sin tocar abreviaturas con punto
// y con la forma societaria en su escritura usual (S.p.A., S.r.l.).
const FORMA_BIEN = { 's.p.a.': 'S.p.A.', 'spa': 'S.p.A.', 's.r.l.': 'S.r.l.', 'srl': 'S.r.l.', 's.a.': 'S.A.', 's.a.d.': 'S.A.D.', 'sad': 'S.A.D.', 'gmbh': 'GmbH', 'ag': 'AG', 'e.v.': 'e.V.', 'n.v.': 'N.V.', 'b.v.': 'B.V.', 'plc': 'plc', 'ltd': 'Ltd', 'ltd.': 'Ltd.', 'limited': 'Limited' };
export function nombreBienEscrito(nombre, md) {
  if (!nombre) return nombre;
  const cuerpo = nombre.replace(/\s+\S+$/, ''); if (/[a-zà-ÿ]/.test(cuerpo)) return nombre; // ya tiene minúsculas: se respeta
  const clave = (s) => norm(s).replace(/[^a-z0-9]+/g, '');
  const re = new RegExp(`([A-Za-zÀ-ÿ0-9][^\\n|#*]{2,110}?(?<![A-Za-z])(?:${FORMAS.join('|')}))(?![A-Za-z])`, 'gi');
  const cuenta = {}; for (const l of md.split('\n')) for (const m of l.replace(/[*_#>|]/g, ' ').matchAll(re)) { const s = m[1].trim(); const tail = s.slice(Math.max(0, s.length - nombre.length - 2)).trim(); for (const v of [s, tail]) if (clave(v) === clave(nombre) && /[a-zà-ÿ]/.test(v.replace(/\s+\S+$/, ''))) cuenta[v] = (cuenta[v] || 0) + 1; }
  const mejor = Object.entries(cuenta).sort((a, b) => b[1] - a[1])[0]; if (mejor) return mejor[0];
  return nombre.split(/\s+/).map((w, i, arr) => { const k = w.toLowerCase(); if (i === arr.length - 1 && FORMA_BIEN[k]) return FORMA_BIEN[k]; if (/\./.test(w) || /\d/.test(w)) return w; return w.charAt(0) + w.slice(1).toLowerCase(); }).join(' ');
}

// ESCALERA DEL NOMBRE LEGAL:
//   ESCALÓN 0  ajuste manual `name` (del documento o de la carpeta del club) · respuesta de Guido en la cola ── gana siempre
//   ESCALÓN 1  la portada y lo más frecuente del documento dicen LA MISMA entidad ── se usa, bien escrita
//   ESCALÓN 2  no coinciden, o hay una sola de las dos ── PREGUNTA A LA COLA (el alta es una sola vez por club y se averigua fácil).
//              Medido en los 175 clubes del sitio: cuando no coinciden, lo más frecuente acertaba 13 de 48 (Hellas Verona 2020, individual:
//              portada "Hellas Verona Football Club S.p.A.", más frecuente "Hellas Verona Service S.r.l."). Cuando coinciden, 51 de 63 exactos
//              (el resto: el sitio tiene el nombre desarrollado a mano, "Nogometni klub" por "NK").
//   nada (ningún candidato con forma societaria: asociaciones civiles) ── el nombre de la carpeta, pendiente (como siempre)
// La pregunta va a la cola con la CARPETA del club como documento, así se contesta una sola vez: corregir --valor "<nombre legal>".
export function decidirNombre(md, displayName, carpeta, pdf, { escribirCola = true, ov = {} } = {}) {
  const claveN = (s) => norm(s).replace(/^the\s+/, '').replace(/[^a-z0-9]+/g, '');
  const aj = ajusteDe(carpeta, 'name') || (pdf ? ajusteDe(pdf, 'name') : null);
  if (aj) return campo('name', aj.valor, `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${aj.autor} ${aj.fecha}): ${aj.motivo}`);
  const { caso: cq, resp: rq } = casoYRespuesta(carpeta, 'alta', 'name', carpeta);
  if (rq && rq.decision === 'corregir' && rq.valor) return campo('name', String(rq.valor).trim(), `respuesta de Guido en la cola (${cq?.id})`);
  if (rq && rq.decision === 'aceptar' && cq?.nombrePropuesto) return campo('name', cq.nombrePropuesto, `respuesta de Guido en la cola (${cq.id}): aceptó la propuesta`);
  if (ov.name) return campo('name', ov.name.valor, `claude-api con cita verificada: ${ov.name.fuente}`);
  const nl = nombreLegal(md, displayName); const frec = nl && nl.veces >= 2 ? nl.nombre : null; const port = nombrePortada(md, displayName);
  // nombreLegal cuenta en las primeras 4000 líneas: si el .md es más largo, se dice (regla de Admin/PIPELINE.md «Una tool que decide no lee solo
  // una parte del documento»; medido: 356 de 3.763 .md pasan las 4000 líneas). La decisión no cambia.
  const totalLineas = md.split('\n').length;
  const corte = totalLineas > 4000 ? ` (AVISO (recorte): lo más frecuente se contó en las primeras 4000 de ${totalLineas} líneas; el resto no se miró)` : '';
  if (port && frec && claveN(port) === claveN(frec)) return campo('name', nombreBienEscrito(port, md), `la portada y lo más frecuente del .md coinciden (${nl.veces} veces)${corte}`);
  if (port || frec) {
    // la propuesta, normalizada por país (Colombia: sufijo S.A./S.A.S. y acentos que ya usa data/clubs.js; tools/alta-club-nombre-pais.mjs).
    // No contesta nada: la pregunta va a la cola igual.
    const { nombre: prop, notas } = normalizarPropuesta(nombreBienEscrito(port || frec, md), { iso2: isoDeCarpeta(carpeta), crudo: port || frec });
    // sin candidato de una de las dos fuentes, la cláusula se omite (antes decía «lo más frecuente del documento es nada»)
    const fuentes = [port ? `La portada dice "${port}"` : null, frec ? `lo más frecuente del documento es "${frec}" (${nl.veces} veces)` : null].filter(Boolean).join(' y ');
    const pregunta = `¿Cuál es el nombre legal de "${displayName}"? ${fuentes.charAt(0).toUpperCase() + fuentes.slice(1)}${nl?.otros?.length ? ` (otras formas: ${nl.otros.join('; ')})` : ''}. Propuesta${notas.length ? ` (normalizada: ${notas.join('; ')})` : ''}: "${prop}".`;
    if (escribirCola) agregarCaso({ pdf: carpeta, md: pdf ? pdf.replace(/\.pdf$/i, '.md') : null, etapa: 'alta', motivo: 'name', detalle: carpeta, nombrePropuesto: prop, que: pregunta, propuesta: `"${prop}" (responder aceptar si está bien; si no, corregir --valor "<nombre legal>")` });
    return campo('name', null, `la portada y lo más frecuente no coinciden: pregunta en la cola (node tools/cola.mjs)${corte}`, 'pregunta', { pregunta });
  }
  return campo('name', displayName, `no se encontró el nombre legal en el .md; se usa el nombre de la carpeta${corte}`, 'pendiente', { nota: 'name es el nombre legal completo (pestaña Fuentes)' });
}

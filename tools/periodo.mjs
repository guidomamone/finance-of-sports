#!/usr/bin/env node
// ============================================================================
// tools/periodo.mjs — qué PERÍODO cubre un documento, leído del CONTENIDO del .md (no del nombre del archivo). Gratis, sin API.
//
// POR QUÉ EXISTE: "cuando haya balances trimestrales, anuales (no temporada sino año), bimestrales o lo que
// fuera, deberían quedar marcados para que luego se los agrupe cuando se consigan los otros reportes". El caso que lo disparó: Galatasaray
// `galatasaray-sportif-bilanco-31-05-2019.pdf`, cuyo nombre dice cierre anual al 31/05/2019 pero cuyo contenido es un informe INTERMEDIO de
// tres meses al 31/08/2019 ("31 Ağustos 2019 ... Sona Eren Üç Aylık Ara Hesap Dönemi"). Cargarlo como ejercicio sería un error; tirarlo,
// también: sumado a los otros tres trimestres arma un año.
//
// QUÉ DEVUELVE periodoDe(mdText, nombreArchivo):
//   tipo       'anual' | 'nueve-meses' | 'semestral' | 'cuatrimestral' | 'trimestral' | 'bimestral' | 'mensual' | 'intermedio' (es
//              intermedio pero no se pudo leer cuántos meses) | 'otro' (N meses que no es ninguno de los anteriores)
//   meses      cantidad de meses si se pudo leer (12 para anual por defecto)
//   cierre     'AAAA-MM-DD' de cierre del período si se pudo leer
//   anual      solo si tipo = 'anual': 'calendario' (cierra en diciembre) o 'temporada' (cierra en otro mes: jun, may, jul...)
//   evidencia  { pagina, texto } del fragmento que lo sostiene (para revisarlo sin abrir el PDF)
//   nombreNoCoincide  true si el nombre del archivo trae una fecha/año de cierre distinto del leído en el contenido
//   confianza  'alta' (meses leídos explícitamente) | 'media' (palabra de período intermedio sin meses, o anual por descarte con cierre
//              leído) | 'baja' (anual por descarte, sin cierre leído)
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «periodo.mjs».
//
// USO:
//   import { periodoDe } from './periodo.mjs';
//   node tools/periodo.mjs <archivo.md>                un documento
//   node tools/periodo.mjs --todos [--solo-no-anual]   todos los .md de Clubes/ (sin .previo/.antes/-check/-redo)
//   node tools/periodo.mjs --grupos                    por club y año: qué períodos parciales hay (para juntarlos cuando lleguen los demás)
// ============================================================================

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { gunzipSync } from 'node:zlib';

const ROOT = resolve(import.meta.dirname, '..');
const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/å/g, 'a');

// ---------------------------------------------------------------- meses por nombre (para fechas escritas con palabras), ya normalizados
const MESES = {
  1: ['enero', 'janeiro', 'january', 'januar', 'janvier', 'gennaio', 'januari', 'ocak', 'января', 'январь', 'сiчня', 'січня', 'leden', 'ledna', 'styczen', 'stycznia', 'sijecanj', 'sijecnja', 'ιανουαριου', 'jan'],
  2: ['febrero', 'fevereiro', 'february', 'februar', 'fevrier', 'febbraio', 'februari', 'subat', 'февраля', 'лютого', 'unor', 'unora', 'luty', 'lutego', 'veljaca', 'veljace', 'φεβρουαριου', 'feb'],
  3: ['marzo', 'marco', 'march', 'marz', 'mars', 'maart', 'mart', 'марта', 'березня', 'brezen', 'brezna', 'marzec', 'marca', 'ozujak', 'ozujka', 'μαρτιου', 'mar'],
  4: ['abril', 'april', 'avril', 'aprile', 'nisan', 'апреля', 'квiтня', 'квітня', 'duben', 'dubna', 'kwiecien', 'kwietnia', 'travanj', 'travnja', 'απριλιου', 'apr'],
  5: ['mayo', 'maio', 'may', 'mai', 'maggio', 'mei', 'mayis', 'мая', 'травня', 'kveten', 'kvetna', 'maj', 'maja', 'svibanj', 'svibnja', 'μαιου'],
  6: ['junio', 'junho', 'june', 'juni', 'juin', 'giugno', 'haziran', 'июня', 'червня', 'cerven', 'cervna', 'czerwiec', 'czerwca', 'lipanj', 'lipnja', 'ιουνιου', 'jun'],
  7: ['julio', 'julho', 'july', 'juli', 'juillet', 'luglio', 'temmuz', 'июля', 'липня', 'cervenec', 'cervence', 'lipiec', 'lipca', 'srpanj', 'srpnja', 'ιουλιου', 'jul'],
  8: ['agosto', 'august', 'aout', 'augustus', 'agustos', 'августа', 'серпня', 'srpen', 'srpna', 'sierpien', 'sierpnia', 'kolovoz', 'kolovoza', 'αυγουστου', 'aug'],
  9: ['septiembre', 'setembro', 'september', 'septembre', 'settembre', 'eylul', 'сентября', 'вересня', 'zari', 'wrzesien', 'wrzesnia', 'rujan', 'rujna', 'σεπτεμβριου', 'sep', 'sept'],
  10: ['octubre', 'outubro', 'october', 'oktober', 'octobre', 'ottobre', 'ekim', 'октября', 'жовтня', 'rijen', 'rijna', 'pazdziernik', 'pazdziernika', 'listopad', 'οκτωβριου', 'oct', 'okt'],
  11: ['noviembre', 'novembro', 'november', 'novembre', 'kasim', 'ноября', 'листопада', 'listopadu', 'listopada', 'studeni', 'studenog', 'νοεμβριου', 'nov'],
  12: ['diciembre', 'dezembro', 'december', 'dezember', 'decembre', 'dicembre', 'aralik', 'декабря', 'грудня', 'prosinec', 'prosince', 'grudzien', 'grudnia', 'prosinac', 'prosinca', 'δεκεμβριου', 'dec', 'dez'],
};
const MES_DE = new Map(); for (const [m, ws] of Object.entries(MESES)) for (const w of ws) MES_DE.set(w, Number(m));
const MES_RE = [...MES_DE.keys()].sort((a, b) => b.length - a.length).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

// ---------------------------------------------------------------- "N meses" en palabras
const NUMEROS = {
  2: ['two', 'dos', 'dois', 'zwei', 'deux', 'due', 'twee', 'to', 'iki', 'двух', 'два', 'двох', 'dva', 'dwa', 'δυο'],
  3: ['three', 'tres', 'tres', 'drei', 'trois', 'tre', 'drie', 'uc', 'трех', 'трёх', 'три', 'трьох', 'tri', 'trzy', 'τριων'],
  4: ['four', 'cuatro', 'quatro', 'vier', 'quatre', 'quattro', 'dort', 'четырех', 'чотирьох', 'ctyri', 'cztery'],
  6: ['six', 'seis', 'sechs', 'sei', 'zes', 'seks', 'sex', 'alti', 'шести', 'шесть', 'шести', 'шiсть', 'шість', 'sest', 'szesc', 'εξι'],
  9: ['nine', 'nueve', 'nove', 'neun', 'neuf', 'negen', 'ni', 'nio', 'dokuz', 'девяти', 'девять', "дев'яти", 'девяти', 'devet', 'dziewiec', 'εννεα'],
  12: ['twelve', 'doce', 'doze', 'zwolf', 'douze', 'dodici', 'twaalf', 'tolv', 'on iki', 'двенадцати', 'дванадцяти', 'dvanact', 'dwanascie'],
};
const NUM_DE = new Map(); for (const [n, ws] of Object.entries(NUMEROS)) for (const w of ws) NUM_DE.set(w, Number(n));
const NUM_RE = [...NUM_DE.keys()].sort((a, b) => b.length - a.length).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
// palabra "mes/meses" en cada idioma (normalizada)
const MESW = 'months?|meses|mes|monate?n?|mois|mesi|maanden|maneder|manader|kuukautta|aylik|ay|месяцев|месяца|мiсяцiв|місяців|місяці|mesicu|mesice|miesiecy|miesiace|mjeseci|μηνων';

// "N meses" explícito (cifras o palabras), ej. "three months ended", "seis meses terminados", "üç aylık", "за 9 месяцев", "6-month"
const N_MESES_RE = new RegExp(`(?:^|[^\\p{L}\\d])(\\d{1,2}|${NUM_RE})[- ]?(?:${MESW})(?![\\p{L}])`, 'u');
// abreviaturas: Q1-Q4 / 1T-4T / H1 H2 / 9M / 1S 2S / I кв.
const ABREV_RE = /(?:^|[^\p{L}\d])(q[1-4]|[1-4]t|[1-4]q|h[12]|[1-2]s|9m|6m|3m|[1-4]\.? ?(?:quartal|kvartal|kwartaal|trimestre|quarter)|(?:i{1,3}|iv) ?кв)(?![\p{L}\d])/u;
// palabra de período intermedio (sin meses)
// FRASES, no palabras sueltas: "intermedi" solo daba "intermediação de atletas" (Cruzeiro, Corinthians) y "semestre" cualquier párrafo
// ("en el segundo semestre del año..."). Primera versión medida sobre 2.249 .md: 58 "intermedio", casi todos falsos; ver CHANGELOG 314.
const INTERMEDIO_RE = /interim (financial|report|accounts|statements|condensed|consolidated)|condensed (consolidated )?interim|half[- ]year(ly)? (report|financial|accounts|results)|quarterly (report|financial)|(estados?|informacion|informe) (financier[oa]s?|contables?) (intermedi|trimestral|semestral)|periodo intermedio|periodos intermedios|informe (trimestral|semestral)|demonstrac(oes|ao) (financeiras? |contabeis )?(intermediarias|intercalares|trimestrais|semestrais)|informacoes trimestrais|relatorio (trimestral|semestral)|ara (hesap )?donem|zwischen(bericht|abschluss)|halbjahres(finanz)?bericht|quartals(bericht|abschluss)|delarsrapport|halvarsrapport|kvartalsrapport|halfjaar(bericht|verslag|cijfers)|kwartaal(bericht|cijfers)|relazione (finanziaria )?semestrale|resoconto intermedio|bilancio semestrale|rapport (financier )?semestriel|comptes semestriels|промежуточн[а-я]* (финансов|отчет|бухгалтер)|отчет за (1|i|первый) (квартал|полугодие)|проміжн[а-я]* (фінансов|звіт)|pololetni (zprava|uzaverka)|mezitimni|sprawozdanie (polroczne|kwartalne|srodroczne)|polugodisnj|tromjesecn|ενδιαμεσ|中期報告|四半期報告|半期報告|중간|분기보고|반기보고/;
const TRIM_POR_PALABRA = [[/bimestr/, 2], [/trimestr|quarter|quartal|kvartal|kwartaal|квартал|ctvrtlet|kwartal|tromjesec|τριμην|四半期|분기/, 3], [/cuatrimestr/, 4], [/semestr|halbjahr|halvar|полугод|пiврiч|піврічч|pololet|polrocz|polugodi|εξαμην|半期|中間|반기/, 6]];

// Lo que une las dos fechas de un rango ("09/08/2021 – 30/06/2022", "24 Ιουλίου 2018 - 30 Ιουνίου 2019", "vom 31.07.2014 bis zum 31.12.2014",
// "za období 04.04.2007 – 31.12.2007", "3 novembre 2003 – 30 giugno 2004"). Sobre el texto normalizado (norm).
const RANGO_SEP_RE = /^\s*(?:-|–|—|εως|bis(?: zum| zu)?|az|to|till|until|al|a|au|tot|do|ate)\s*$/u;
function tipoDeMeses(m) {
  return { 1: 'mensual', 2: 'bimestral', 3: 'trimestral', 4: 'cuatrimestral', 6: 'semestral', 9: 'nueve-meses', 12: 'anual' }[m] || 'otro';
}

// Fechas de una línea: "31 Ağustos 2019", "August 31, 2019", "31.08.2019", "31/08/2019", "2019-08-31". Devuelve [{a, m, d}].
function fechasDe(linea) {
  const t = norm(linea); const out = [];
  for (const x of t.matchAll(/(?<!\d)(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?!\d)/g)) { const d = +x[1], m = +x[2]; if (m >= 1 && m <= 12 && d >= 1 && d <= 31) out.push({ a: +x[3], m, d, i: x.index, fin: x.index + x[0].length }); }
  // coreano, japonés y chino: "2018년 12월 31일", "2018年3月31日" (año, mes, día, en ese orden)
  for (const x of t.matchAll(/(?<!\d)(\d{4})\s*[년年]\s*(\d{1,2})\s*[월月]\s*(\d{1,2})\s*[일日]/g)) { const m = +x[2], d = +x[3]; if (m >= 1 && m <= 12 && d >= 1 && d <= 31) out.push({ a: +x[1], m, d, i: x.index, fin: x.index + x[0].length }); }
  for (const x of t.matchAll(/(?<!\d)(\d{4})-(\d{2})-(\d{2})(?!\d)/g)) out.push({ a: +x[1], m: +x[2], d: +x[3], i: x.index, fin: x.index + x[0].length });
  for (const x of t.matchAll(new RegExp(`(?<!\\d)(\\d{1,2})\\.?\\s*(?:de\\s+)?(${MES_RE})\\.?,?\\s*(?:de\\s+|del\\s+)?(\\d{4})`, 'gu'))) out.push({ a: +x[3], m: MES_DE.get(x[2]), d: +x[1], i: x.index, fin: x.index + x[0].length });
  // "mes día de año" con el "de" antes del año ("diciembre 31 de 2025"): no se leía y el cierre salía de la otra fecha del título
  // ("... y diciembre 31 2024"): Unión Magdalena 2025 quedó con cierre 2024-12-31 y se extrajo la columna 2024. Medido sobre 3.646 .md: 31 pasan de sin cierre a cierre leído, 1 cambia (Deportes Tolima 2016, 2015 -> 2016, correcto y sin cargar).
  for (const x of t.matchAll(new RegExp(`(${MES_RE})\\.?\\s+(\\d{1,2}),?\\s+(?:de\\s+|del\\s+)?(\\d{4})`, 'gu'))) out.push({ a: +x[3], m: MES_DE.get(x[1]), d: +x[2], i: x.index, fin: x.index + x[0].length });
  return out.sort((p, q) => p.i - q.i);
}
const iso = (f) => `${f.a}-${String(f.m).padStart(2, '0')}-${String(f.d).padStart(2, '0')}`;

// ---------------------------------------------------------------- ESCALÓN 0: el período etiquetado del iXBRL
// Un .md que salió de un informe XHTML (tools/xhtml-aarsrapport.mjs) tiene al lado el XHTML, y el XHTML ETIQUETA el período: Companies House
// `EndDateForPeriodCoveredByReport` / `StartDateForPeriodCoveredByReport`, el registro danés `ReportingPeriodEndDate` / `ReportingPeriodStartDate`
// (sin el prefijo, que cambia: d, ns10, e). El texto de esos .md no lo dice en un título: 16 de los 68 británicos del lote 133 salían «anual, sin
// cierre, confianza baja» y frenaban (Burton, Barnsley, Chesterfield, Gillingham, Wigan, Falkirk, Lincoln). El valor de la etiqueta puede venir
// en un <span> anidado y en varios formatos («30 June 2023» ixt:datelonguk, «30.6.25» ixt2:datedaymonthyear, «2025-12-31»); si está vacío o
// no se lee, vale la fecha del contexto del hecho (xbrli:endDate o instant de su contextRef). COMPUERTA: un solo cierre (dos valores distintos de
// la etiqueta de cierre: no decide, sigue el texto). Con el inicio, los meses; sin él, se supone anual como el resto de la escalera.
export function xhtmlHermano(mdAbs, mdText) {
  const x = String(mdAbs).replace(/\.md$/, '.xhtml');
  return /xhtml-aarsrapport\.mjs/.test(String(mdText).slice(0, 400)) && existsSync(x) ? x : null;
}
// inglés y danés (el registro danés etiqueta «1. OKTOBER 2024», ixt:date-day-monthname-year-da)
const MESES_EN = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  januar: 1, februar: 2, marts: 3, maj: 5, juni: 6, juli: 7, oktober: 10 };
function fechaIxbrl(txt) {
  const t = String(txt || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  let m = t.match(/^(\d{4})-(\d{2})-(\d{2})$/); if (m) return { a: +m[1], m: +m[2], d: +m[3] };
  m = t.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2}|\d{4})$/); if (m) return { a: m[3].length === 2 ? 2000 + +m[3] : +m[3], m: +m[2], d: +m[1] };
  m = t.match(/^(\d{1,2})(?:st|nd|rd|th|\.)? ([a-zæøå]+),? (\d{4})$/i); if (m && MESES_EN[m[2].toLowerCase()]) return { a: +m[3], m: MESES_EN[m[2].toLowerCase()], d: +m[1] };
  return null;
}
export function periodoIxbrl(xhtmlAbs) {
  let src; try { const b = readFileSync(xhtmlAbs); src = (b[0] === 0x1f && b[1] === 0x8b ? gunzipSync(b) : b).toString('utf8'); } catch { return null; }
  const contextos = new Map();
  for (const c of src.matchAll(/<(?:[\w-]+:)?context\b[^>]*\bid="([^"]+)"[\s\S]*?<\/(?:[\w-]+:)?context>/g)) {
    const fin = (c[0].match(/<(?:[\w-]+:)?(?:endDate|instant)>\s*([\d-]{10})\s*</) || [])[1]; if (fin) contextos.set(c[1], fin);
  }
  const leer = (nombres, { contexto = true } = {}) => {
    const vals = new Set();
    // cada etiqueta de apertura por separado, con el texto hasta el cierre más cercano: una ix:nonNumeric puede ir ANIDADA en otra (Barnsley
    // 2023-24: el inicio dentro de una más grande) y un match de apertura a cierre se tragaba la de adentro
    for (const h of src.matchAll(/<ix:nonNumeric\b([^>]*)>/g)) {
      const name = ((h[1].match(/\bname="([^"]+)"/) || [])[1] || '').replace(/^.*:/, ''); if (!nombres.includes(name)) continue;
      const desde = h.index + h[0].length; const hasta = src.indexOf('</ix:nonNumeric>', desde);
      const f = fechaIxbrl(src.slice(desde, hasta < 0 ? desde : hasta)); const ctx = contextos.get((h[1].match(/\bcontextRef="([^"]+)"/) || [])[1]);
      const v = f ? iso(f) : contexto ? ctx || null : null; if (v) vals.add(v); // la fecha del contexto vale para el cierre; para el inicio daba el cierre (0 meses)
    }
    return [...vals];
  };
  const fins = leer(['EndDateForPeriodCoveredByReport', 'ReportingPeriodEndDate']);
  if (fins.length !== 1 || fins[0] > `${new Date().getFullYear() + 2}-12-31`) return null; // el mismo tope que el texto: nunca más de 2 años después de hoy
  const inis = leer(['StartDateForPeriodCoveredByReport', 'ReportingPeriodStartDate'], { contexto: false });
  const cierre = fins[0]; let meses = 12; let inicio;
  if (inis.length === 1) {
    inicio = inis[0]; // los días del período (con el último), en meses: 2022-07-01 a 2023-06-30 son 365 días, 12 meses
    meses = Math.round(((Date.parse(cierre) - Date.parse(inicio)) / 864e5 + 1) / (365.25 / 12));
  }
  return { tipo: meses === 12 ? 'anual' : meses > 12 ? 'otro' : tipoDeMeses(meses), meses, ...(inicio ? { inicio } : {}), cierre, cierreDe: 'iXBRL: período etiquetado (escalón 0)', evidencia: { pagina: null, texto: `iXBRL: ${inicio ? `${inicio} a ` : ''}${cierre}` }, confianza: 'alta' };
}
const finDeMes = (f) => f.d >= 28;

function paginasDe(md) {
  const marks = [...md.matchAll(/^--- p[aá]g\. (\d+) ---/gm)];
  if (!marks.length) return [{ n: 1, body: md }];
  return marks.map((m, i) => ({ n: Number(m[1]), body: md.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : md.length) }));
}

export function periodoDe(mdText, nombreArchivo = '', { xhtml = null } = {}) {
  // ESCALÓN 0: el período ETIQUETADO del informe XHTML (iXBRL) del que salió el .md, antes del texto (ver periodoIxbrl)
  const ix = xhtml ? periodoIxbrl(xhtml) : null;
  if (ix) return terminar(ix, nombreArchivo);
  const pags = paginasDe(mdText).slice(0, 6);
  // Líneas "título": cortas, fuera de tablas (o encabezados de tabla), sin ser un párrafo de prosa.
  const lineas = [];
  // Solo TÍTULOS: línea con formato de encabezado (#, negrita) o mayormente en MAYÚSCULAS, o una línea corta de la PRIMERA página (la
  // portada). Todo lo demás es prosa: habla de "semestres" y "trimestres" por cualquier motivo.
  const esTitulo = (raw, s, pagina, primera) => {
    if (/^\s*#/.test(raw) || /^\s*\*\*.+\*\*\s*$/.test(raw)) return true;
    const letras = s.replace(/[^\p{L}]/gu, ''); const mayus = s.replace(/[^\p{Lu}]/gu, '');
    if (letras.length >= 8 && mayus.length / letras.length > 0.6) return true;
    return primera && s.split(' ').length <= 25;
  };
  const primeraPag = pags[0]?.n;
  for (const p of pags) for (const l of p.body.split('\n')) {
    if (l.trim().startsWith('|')) continue;
    const s = l.replace(/[#*_]/g, ' ').replace(/\s+/g, ' ').trim();
    if (s && s.length <= 200 && esTitulo(l, s, p.n, p.n === primeraPag)) lineas.push({ pagina: p.n, texto: s, t: norm(s) });
  }
  let res = null;
  // 1. "N meses" explícito, en una línea que también tenga una fecha o una palabra de período
  for (const l of lineas) {
    const m = l.t.match(N_MESES_RE);
    if (m) {
      const n = /^\d+$/.test(m[1]) ? Number(m[1]) : NUM_DE.get(m[1]);
      if (n >= 1 && n <= 18 && (fechasDe(l.texto).length || INTERMEDIO_RE.test(l.t) || /ended|terminad|finalizad|encerrad|sona eren|endend|beendet|clos|chius|afgesloten|за |zakonc|koncic|zavrs/.test(l.t))) {
        const f = fechasDe(l.texto).filter(finDeMes).pop();
        res = { tipo: tipoDeMeses(n), meses: n, cierre: f ? iso(f) : null, evidencia: { pagina: l.pagina, texto: l.texto.slice(0, 200) }, confianza: 'alta' };
        break;
      }
    }
    const ab = l.t.match(ABREV_RE);
    if (ab && (fechasDe(l.texto).length || INTERMEDIO_RE.test(l.t))) {
      const a = ab[1];
      const n = /h[12]|[12]s|6m/.test(a) ? 6 : /9m/.test(a) ? 9 : 3;
      const f = fechasDe(l.texto).filter(finDeMes).pop();
      res = { tipo: tipoDeMeses(n), meses: n, cierre: f ? iso(f) : null, evidencia: { pagina: l.pagina, texto: l.texto.slice(0, 200) }, confianza: 'alta' };
      break;
    }
  }
  // 2. rango de fechas explícito en una línea (inicio día 1 y fin de mes)
  if (!res) for (const l of lineas) {
    const fs = fechasDe(l.texto);
    for (let i = 0; i + 1 < fs.length; i++) {
      const a = fs[i]; const b = fs[i + 1];
      if (a.d === 1 && finDeMes(b)) {
        const n = (b.a - a.a) * 12 + (b.m - a.m) + 1;
        if (n >= 1 && n <= 18) { res = { tipo: tipoDeMeses(n), meses: n, cierre: iso(b), evidencia: { pagina: l.pagina, texto: l.texto.slice(0, 200) }, confianza: 'alta' }; break; }
      }
    }
    if (res) break;
  }
  // 2b. RANGO QUE NO EMPIEZA EL DÍA 1: el primer ejercicio de una sociedad recién constituida. Kifisia 2022 dice "09/08/2021 –
  // 30/06/2022" (L93) y el paso 2 lo ignoraba (exige inicio el día 1): salía anual por descarte, 12 meses, y había que anotarlo a mano en
  // Admin/registros/documentos-parciales.txt. Solo si el paso 2 no decidió, con UNA compuerta: inicio anterior al fin (fin de mes) y MENOS de
  // 12 meses entre los dos, y es el ÚNICO rango de ese ejercicio en los títulos. "Rango" = dos fechas unidas SOLO por un separador
  // (RANGO_SEP_RE: sin él, medido sobre los 2.713 .md, entraban fechas sueltas de un título: "31/12/2023 31/12/2023"). "Único": un
  // ejercicio anual partido en tramos de gestión no es un período corto (Lazio 2003-04 "A) periodo 1° luglio 2003 - 3 novembre 2003" y
  // "B) periodo 3 novembre 2003 – 30 giugno 2004"; Barcelona memoria 2020-21, los dos tramos de junta en una línea).
  // Un rango de 12 meses o más ("30/06/2021 – 30/06/2022") no decide aquí: sigue la escalera como siempre. Medido sobre los 2.713 .md:
  // cambian 7 (Kifisia 2022, Panserraikos 2021, Volos 2019 x3, Dukla 2007, RB Leipzig 2014), todos períodos cortos de verdad.
  if (!res) {
    const dia = (f) => Date.UTC(f.a, f.m - 1, f.d) / 864e5;
    const rangos = []; // todos los rangos de los títulos (cualquier día de inicio), sin repetir
    for (const l of lineas) {
      const tx = l.texto.replace(/(\d)\s*[°º]/g, '$1'); const fs = fechasDe(tx); // "1° luglio 2003" (Lazio 2003-04, el tramo A)
      for (let i = 0; i + 1 < fs.length; i++) {
        const a = fs[i]; const b = fs[i + 1];
        if (dia(b) > dia(a) && RANGO_SEP_RE.test(norm(tx).slice(a.fin, b.i)) && !rangos.some((r) => iso(r.a) === iso(a) && iso(r.b) === iso(b))) rangos.push({ a, b, l });
      }
    }
    const cand = rangos.find(({ a, b }) => a.d !== 1 && finDeMes(b) && dia(b) - dia(a) + 1 < 365);
    const delEjercicio = cand ? rangos.filter(({ b }) => dia(b) <= dia(cand.b) && dia(b) > dia(cand.b) - 365) : [];
    if (cand && delEjercicio.length === 1) {
      const n = Math.max(1, Math.round((dia(cand.b) - dia(cand.a) + 1) / 30.44));
      res = { tipo: n >= 12 ? 'otro' : tipoDeMeses(n), meses: n, inicio: iso(cand.a), cierre: iso(cand.b), evidencia: { pagina: cand.l.pagina, texto: cand.l.texto.slice(0, 200) }, confianza: 'alta' };
    }
  }
  // cierre más citado en los títulos (para el anual y para completar). COMPUERTA: un cierre no puede ser de más de 2 años
  // después de hoy. Caso real: Fortaleza CEIF 2022, "La duración legal del Club es definida hasta el 31 de diciembre del 2050" (L28) ganaba
  // como cierre 2050-12-31 y el año nunca entraba como 2022. No "posterior a hoy" (lo primero que se probó): un PRESUPUESTO cierra en el
  // futuro de verdad (Boca "Presupuesto 26-27" y Racing "presupuesto2026-27", 2027-06-30, quedaban sin fecha).
  const TOPE = `${new Date().getFullYear() + 2}-12-31`;
  const cuenta = new Map();
  // EJERCICIO Y COMPARATIVO EN UN MISMO TÍTULO: si la línea trae otra fecha del mismo día y mes un año DESPUÉS, esta es el comparativo y no cuenta
  // como cierre ("diciembre 31 de 2025 y diciembre 31 2024": solo cuenta 2025). Unión Magdalena 2025 salía con cierre 2024-12-31 (tres títulos con 2024 contra dos con 2025) y el pipeline
  // extrajo la columna 2024. Medido sobre 3.646 .md: 31 pasan de sin cierre a cierre leído, 2 cambian y quedan bien (Deportes Tolima 2016, Universidad de Chile 2014; sin cargar).
  for (const l of lineas) { const fl = fechasDe(l.texto); for (const f of fl) { if (!(finDeMes(f) && f.a >= 1950 && iso(f) <= TOPE)) continue; if (fl.some((g) => g !== f && finDeMes(g) && g.a === f.a + 1 && g.m === f.m && g.d === f.d)) continue; cuenta.set(iso(f), (cuenta.get(iso(f)) || 0) + 1); } }
  const masCitado = [...cuenta].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? 1 : -1))[0]?.[0] || null;
  // 3. palabra de período intermedio sin meses
  if (!res) {
    const l = lineas.find((x) => INTERMEDIO_RE.test(x.t));
    if (l) {
      const pal = TRIM_POR_PALABRA.find(([re]) => re.test(l.t));
      res = pal ? { tipo: tipoDeMeses(pal[1]), meses: pal[1], cierre: masCitado, evidencia: { pagina: l.pagina, texto: l.texto.slice(0, 200) }, confianza: 'media' }
        : { tipo: 'intermedio', meses: null, cierre: masCitado, evidencia: { pagina: l.pagina, texto: l.texto.slice(0, 200) }, confianza: 'media' };
    }
  }
  // 3b. EL PERÍODO QUE DECLARA EL FORMULARIO. Las cuentas NBB belgas y las estonias dicen el ejercicio en una frase fija, en
  // celdas de una tabla o en prosa, que los pasos de arriba no ven (solo leen títulos fuera de tablas): "| met betrekking tot het boekjaar
  // dat de periode dekt van | 01-07-2018 | tot | 30-06-2019 |" (Lommel SK 2019), "| ... dekt van | 01-07-2020 tot 30-06-2021 |" (RWDM 2021),
  // "... dekt van 29-06-2018 tot 30-06-2019" en prosa (Beerschot 2019 -correction), "exercice couvrant la période du ... au ...", y en
  // Estonia "| aruandeaasta algus: | 09.01.2023 |" y "| aruandeaasta lõpp: | 31.12.2023 |" (Harju JK Laagri 2023, primer ejercicio). Sin esto
  // el cierre salía de la fecha más citada, que puede ser la de la asamblea (Lierse SK 2023: 28-10-2023, .md L27, contra 30-06-2023, L33) o el
  // inicio del ejercicio (Beerschot 2019 -correction: 29-06-2018). Solo si los pasos 1-3 no decidieron; COMPUERTA: la frase, fin de mes al
  // final, inicio antes del fin, 1 a 18 meses, y una sola fecha de fin entre todas las frases (el "vorige boekjaar" no es esta frase).
  if (!res) {
    const dia = (f) => Date.UTC(f.a, f.m - 1, f.d) / 864e5;
    const FRASES = [/boekjaar dat de periode dekt van/, /exercice couvrant la periode du/];
    const cands = []; let ini = null; let fin = null;
    const limpio = (raw) => raw.replace(/\|/g, ' ').replace(/[*_]/g, ' ').replace(/\s+/g, ' ').trim();
    for (const p of pags) { const lineas = p.body.split('\n'); lineas.forEach((raw, i) => {
      let tx = limpio(raw); const t = norm(tx);
      const k = FRASES.map((re) => t.search(re)).find((x) => x >= 0);
      if (k === undefined) return;
      // la frase sola en su línea y las fechas en las siguientes ("…la période du" / "12-05-2017" / "au" / "30-06-2018", RAAL La
      // Louvière 2018, Sint-Truiden 2013, Zulte Waregem 2012): se siguen leyendo hasta 8 líneas más mientras falten las dos fechas
      for (let j = i + 1; j <= i + 8 && j < lineas.length && fechasDe(tx).filter((f) => f.i >= k).length < 2; j++) tx = `${tx} ${limpio(lineas[j])}`.trim();
      const fs = fechasDe(tx).filter((f) => f.i >= k); if (fs.length >= 2) cands.push({ a: fs[0], b: fs[1], pagina: p.n, texto: tx });
    }); }
    for (const p of pags) for (const raw of p.body.split('\n')) {
      const tx = limpio(raw); const t = norm(tx);
      if (/aruandeaasta algus/.test(t) && fechasDe(tx).length === 1) ini = { f: fechasDe(tx)[0], pagina: p.n, texto: tx };
      if (/aruandeaasta lopp/.test(t) && fechasDe(tx).length === 1) fin = { f: fechasDe(tx)[0], pagina: p.n, texto: tx };
    }
    if (ini && fin) cands.push({ a: ini.f, b: fin.f, pagina: fin.pagina, texto: `${ini.texto} / ${fin.texto}` });
    const validos = cands.filter(({ a, b }) => finDeMes(b) && dia(b) > dia(a) && (dia(b) - dia(a) + 1) / 30.44 >= 0.5 && (dia(b) - dia(a) + 1) / 30.44 <= 18.5);
    if (validos.length && new Set(validos.map((c) => iso(c.b))).size === 1) {
      const c = validos[0]; const n = Math.max(1, Math.round((dia(c.b) - dia(c.a) + 1) / 30.44));
      res = { tipo: n === 12 ? 'anual' : tipoDeMeses(n), meses: n, inicio: iso(c.a), cierre: iso(c.b), cierreDe: 'período del formulario (to-do 298 f)', evidencia: { pagina: c.pagina, texto: c.texto.slice(0, 200) }, confianza: 'alta' };
    }
  }
  // 3c. TRAMO CORTO POR LAS COLUMNAS (tramo corto de transición, Admin/CONVENCIONES-DATOS.md). Un ejercicio de transición por cambio de cierre no
  // lo dice en un título: la frase está en la prosa («composto da soli 6 mesi gestione (1 gennaio 2020 - 30 giugno 2020)», Fiorentina 2020 L324)
  // o en ningún lado (Atalanta 2022), y salía «anual, 12 meses» por descarte. Lo que sí trae siempre son las columnas de los estados: el cierre al
  // lado del cierre ANTERIOR, que está a menos de 12 meses («| ATTIVO | 30/06/2022 | 31/12/2021 |», Atalanta 2022; «| 30-06-2024 | 31-12-2023 |»,
  // Genoa 2024). Solo si los pasos 1-3b no decidieron y hay cierre leído. Votos: cada fila de tabla cuya primera fecha es el cierre y la segunda
  // otro fin de mes anterior. COMPUERTA: un solo salto de 1 a 11 meses con 2 votos o más, y NINGÚN par a 12 meses (un intermedio compara el
  // resultado con el mismo período del año anterior: tiene pares a 12 meses y no entra acá). Un primer ejercicio de una sociedad nueva no entra:
  // no tiene columna de un cierre anterior para votar (Kifisia 2022, Volos 2019, RWDM 2019, Anderlecht 2011 y RAAL 2018 los deciden los pasos 2b y
  // 3b y salen igual). Medido sobre los 3.763 .md (Auditora 5, sección 8): cambian 4, Atalanta 2022, Fiorentina 2020, Genoa 2024 y Slavia Praha 2002
  // («Za období od 1.1. do 30.6.2002»), todos semestrales de verdad. Se apaga con un ajuste `cierre` del documento (el período sale del ajuste).
  if (!res && masCitado) {
    const saltos = new Map(); let ej = null;
    for (const p of paginasDe(mdText)) for (const l of p.body.split('\n')) {
      if (!l.trim().startsWith('|')) continue;
      const fs = l.split('|').map((c) => fechasDe(c)[0]).filter(Boolean);
      if (fs.length < 2 || iso(fs[0]) !== masCitado || !finDeMes(fs[1])) continue;
      const n = (fs[0].a - fs[1].a) * 12 + (fs[0].m - fs[1].m);
      if (n < 1) continue;
      saltos.set(n, (saltos.get(n) || 0) + 1);
      if (n < 12 && !ej) ej = { pagina: p.n, texto: l.trim().slice(0, 200), anterior: fs[1] };
    }
    const cortos = [...saltos].filter(([n]) => n < 12);
    if (cortos.length === 1 && cortos[0][1] >= 2 && !saltos.has(12)) {
      const n = cortos[0][0]; const d = new Date(Date.UTC(ej.anterior.a, ej.anterior.m - 1, ej.anterior.d + 1));
      res = { tipo: tipoDeMeses(n), meses: n, inicio: d.toISOString().slice(0, 10), cierre: masCitado, cierreDe: 'columnas: cierre y cierre anterior (3c)', evidencia: { pagina: ej.pagina, texto: ej.texto }, confianza: 'alta' };
    }
  }
  // 4. anual por descarte
  if (!res) res = { tipo: 'anual', meses: 12, cierre: masCitado, evidencia: null, confianza: masCitado ? 'media' : 'baja' };
  if (res.cierre && res.cierre > TOPE) res.cierre = null; // la compuerta, también para lo leído en los pasos 1-3
  if (!res.cierre) res.cierre = masCitado;
  // ESCALÓN 1 DE LA FECHA DE CIERRE: si los títulos de las 6 primeras páginas no traen el
  // cierre, se lee de los ENCABEZADOS DE COLUMNA de las tablas del documento entero: la fecha de la primera columna con fecha, la más repetida.
  // COMPUERTA: la columna de al lado es la misma fecha un año antes (el par ejercicio + comparativo) y no pasa el tope de arriba. Caso real:
  // Fortaleza CEIF 2017-2020, cuyas primeras páginas son políticas contables; sus notas dicen "| | A 31 de Diciembre de 2020 | A 31 de
  // Diciembre de 2019 |" (2020: L405). Escalón 2 (ya existía, en verificar.mjs): deducida de los documentos vecinos (tools/cierre-vecinos.mjs).
  if (!res.cierre) {
    const votos = new Map();
    for (const p of paginasDe(mdText)) for (const l of p.body.split('\n')) {
      if (!l.trim().startsWith('|')) continue;
      const fs = l.split('|').map((c) => fechasDe(c)[0]).filter(Boolean);
      if (fs.length < 2) continue;
      const [f1, f2] = fs;
      if (finDeMes(f1) && f2.a === f1.a - 1 && f2.m === f1.m && f2.d === f1.d && iso(f1) <= TOPE) {
        const v = votos.get(iso(f1)) || { n: 0, pagina: p.n, texto: l.trim().slice(0, 200) }; v.n++; votos.set(iso(f1), v);
      }
    }
    const [mejor, v] = [...votos].sort((a, b) => b[1].n - a[1].n || (a[0] < b[0] ? 1 : -1))[0] || [];
    if (mejor) { res.cierre = mejor; res.cierreDe = 'encabezados de tablas (escalón 1)'; res.evidencia = res.evidencia || { pagina: v.pagina, texto: v.texto }; res.confianza = 'media'; }
  }
  // ESCALÓN "PAR DE ENCABEZADO". En un anual por descarte, el cierre salía de la fecha MÁS CITADA en los títulos, y la más
  // citada puede ser otra cosa: la fecha de firma (Alverca 2022-23: "Alverca, 29 de Setembro de 2023" dos veces, cuando el documento dice
  // "Período findo em 30 de Junho de 2023" y sus columnas "30/06/2023 | 30/06/2022") o el fin de mandato de los órganos sociales (Benfica
  // 2013-14: "30/06/2016" en la tabla de mandatos; quedó con cierre 2017-06-30). Las dos se arreglaron con ajustes `cierre`. Escalón, UNA
  // compuerta: una fila de tabla que es SOLO encabezado (ninguna celda con dígitos salvo las fechas) con dos fechas, f y f un año antes (el
  // par ejercicio + comparativo); las fechas con año de 2 dígitos ("30/06/23") valen solo ahí. Si la fecha del par más repetida no es la más
  // citada, manda el par. No se aplica cuando el cierre de títulos sale de una frase de período ("findo em", "ended", "do 1.1. a 30.6"): esa
  // fecha la dijo el documento, no se contó.
  if (res.tipo === 'anual' && !res.evidencia && res.cierre && res.cierre === masCitado && !res.cierreDe) {
    const FRASE_PERIODO_RE = /findo|ended|year end|terminad|finalizad|encerrad|cerrad|clos|chius|beendet|afgesloten|sona eren|exercicio de|ejercicio (economico )?(de|del)|periodo (de|del|do)|\bdo \d|\bal \d|\bdal \d|\bvom \d/;
    const dichaEnFrase = lineas.some((l) => FRASE_PERIODO_RE.test(l.t) && fechasDe(l.texto).some((f) => iso(f) === res.cierre));
    const fechaCelda = (c) => { const t = c.trim(); const m2 = t.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2})$/); if (m2) { const yy = +m2[3]; return { a: yy > 50 ? 1900 + yy : 2000 + yy, m: +m2[2], d: +m2[1] }; } const fs = fechasDe(t); return fs.length === 1 ? fs[0] : null; };
    const votos = new Map();
    if (!dichaEnFrase) for (const p of paginasDe(mdText)) for (const l of p.body.split('\n')) {
      if (!l.trim().startsWith('|')) continue;
      const celdas = l.split('|').slice(1, -1); const fs = []; let soloEncabezado = true;
      for (const c of celdas) { const f = fechaCelda(c); if (f) fs.push(f); else if (/\d/.test(c.replace(/\b(?:19|20)\d{2}\b/g, ''))) { soloEncabezado = false; break; } }
      if (!soloEncabezado || fs.length < 2) continue;
      const [f1, f2] = fs;
      if (finDeMes(f1) && f2.a === f1.a - 1 && f2.m === f1.m && f2.d === f1.d && iso(f1) <= TOPE) { const v = votos.get(iso(f1)) || { n: 0, pagina: p.n, texto: l.trim().slice(0, 200) }; v.n++; votos.set(iso(f1), v); }
    }
    const [mejor, v] = [...votos].sort((a, b) => b[1].n - a[1].n || (a[0] < b[0] ? 1 : -1))[0] || [];
    if (mejor && mejor !== res.cierre && v.n >= Number(process.env.PERIODO_PAR_MIN || 1)) { res.cierreTitulos = res.cierre; res.cierre = mejor; res.cierreDe = 'par de encabezado (to-do 237 a + ac)'; res.evidencia = { pagina: v.pagina, texto: v.texto }; }
  }
  return terminar(res, nombreArchivo, mdText);
}
// Los años que el NOMBRE del archivo dice: los de cuatro cifras y, en una temporada abreviada "2009-10" / "2023_24", el año de CIERRE (el segundo; misma regla que guessYear() de onboard.mjs).
const aniosDelNombre = (nom) => {
  const ys = [...nom.matchAll(/(?<!\d)(19|20)\d{2}(?!\d)/g)].map((x) => x[0]);
  for (const m of nom.matchAll(/(?<!\d)((?:19|20)\d{2})[-_](\d{2})(?!\d)/g)) { const fin = Number(m[1].slice(0, 2) + m[2]); if (fin === Number(m[1]) + 1) ys.push(String(fin)); }
  return ys;
};
// ESCALÓN "FECHA DE FIN DE MES MÁS REPETIDA": un anual sin cierre leído de un título ni de un par de encabezado (el cierre solo está en el cuerpo: «al 31 de diciembre de 2023»
// en cada estado) toma el último día de mes más citado en las primeras páginas, con tres compuertas: se cita 3 veces o más, su comparativa un año antes también aparece, y el año
// del nombre del archivo (si lo trae) es el del cierre. Con un empate gana la fecha más tardía (la del ejercicio, no la del comparativo). Medido sobre los anuales cuyo cierre ya
// se lee de otra forma: 98,3 % de aciertos (996 de 1013); las dos compuertas de comparativa y nombre suben el 95,2 % de la regla sola.
const ultimoDiaDelMes = (f) => f.d === new Date(Date.UTC(f.a, f.m, 0)).getUTCDate();
export function cierrePorFechaRepetida(mdText, nombreArchivo = '', { paginas = 8 } = {}) {
  const cuenta = new Map();
  for (const p of paginasDe(mdText).slice(0, paginas)) for (const l of p.body.split('\n')) for (const f of fechasDe(l)) if (ultimoDiaDelMes(f)) cuenta.set(iso(f), (cuenta.get(iso(f)) || 0) + 1);
  const [mejor, n] = [...cuenta].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? 1 : -1))[0] || [];
  if (!mejor || n < 3) return null;
  if (!cuenta.has(`${Number(mejor.slice(0, 4)) - 1}${mejor.slice(4)}`)) return null;
  const ys = aniosDelNombre(basename(nombreArchivo));
  if (ys.length && !ys.includes(mejor.slice(0, 4))) return null;
  return { cierre: mejor, veces: n };
}
function terminar(res, nombreArchivo, mdText = null) {
  // Sin cierre leído del contenido, un anual cuyo NOMBRE trae una fecha de fin de mes (`aarsrapport-2022-06-30.pdf`) usa esa fecha, con confianza media y una compuerta:
  // el año de la fecha tiene que aparecer en el texto del documento. Si el contenido dice otro cierre, ya no se llega acá: manda el contenido.
  if (!res.cierre && res.tipo === 'anual' && mdText) {
    const fNombre = fechasDe(basename(nombreArchivo).replace(/_/g, '-'))[0];
    if (fNombre && finDeMes(fNombre) && mdText.includes(String(fNombre.a))) { res.cierre = iso(fNombre); res.cierreDe = 'nombre del archivo (fin de mes, y el año aparece en el texto)'; res.confianza = 'media'; }
  }
  if (!res.cierre && res.tipo === 'anual' && mdText) {
    const h = cierrePorFechaRepetida(mdText, nombreArchivo);
    if (h) { res.cierre = h.cierre; res.cierreDe = `fecha de fin de mes más citada (${h.veces} veces) con su comparativa`; res.confianza = 'media'; }
  }
  if (res.tipo === 'anual' && res.cierre) res.anual = res.cierre.slice(5, 7) === '12' ? 'calendario' : 'temporada';
  // ¿El nombre del archivo dice otra cosa? (fecha AAAA-MM-DD / DD-MM-AAAA o el año de cierre)
  const nom = basename(nombreArchivo);
  const fn = fechasDe(nom.replace(/_/g, '-'))[0];
  if (res.cierre && fn && iso(fn) !== res.cierre) res.nombreNoCoincide = true;
  else if (res.cierre && !fn) {
    // (aniosDelNombre: la temporada abreviada "2009-10" cuenta por su año de CIERRE; antes se veía solo "2009" y 165 de los 226 documentos marcados `nombreNoCoincide` eran temporadas así)
    const ys = aniosDelNombre(nom);
    if (ys.length && !ys.includes(res.cierre.slice(0, 4))) res.nombreNoCoincide = true;
  }
  return res;
}

// ---------------------------------------------------------------- CLI
function todosLosMd() {
  const out = [];
  const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.md') && !/\.(previo-|antes-|mistral-redo|gemini-check|claude-check|t-)|-mistral-test\.md$/.test(e.name) && existsSync(p.replace(/\.md$/, '.pdf'))) out.push(p); } };
  walk(resolve(ROOT, 'Clubes'));
  return out.sort();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.includes('--todos') || args.includes('--grupos')) {
    const filas = todosLosMd().map((f) => { const t = readFileSync(f, 'utf8'); return { md: f.replace(ROOT + '/', ''), ...periodoDe(t, f, { xhtml: xhtmlHermano(f, t) }) }; });
    if (args.includes('--grupos')) {
      const g = {};
      for (const r of filas.filter((x) => x.tipo !== 'anual')) { const club = r.md.split('/').slice(1, 3).join('/'); const y = (r.cierre || '????').slice(0, 4); ((g[club] ??= {})[y] ??= []).push(`${r.tipo}${r.cierre ? ' al ' + r.cierre : ''}`); }
      for (const [club, ys] of Object.entries(g)) console.log(`${club}\n${Object.entries(ys).map(([y, l]) => `  ${y}: ${l.join(', ')}`).join('\n')}`);
    } else {
      const by = {}; for (const r of filas) { const k = r.tipo === 'anual' ? `anual-${r.anual || '?'}` : r.tipo; by[k] = (by[k] || 0) + 1; }
      console.log(`${filas.length} documentos: ${Object.entries(by).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · ')}; nombre no coincide: ${filas.filter((r) => r.nombreNoCoincide).length}`);
      for (const r of filas.filter((x) => !args.includes('--solo-no-anual') || x.tipo !== 'anual')) if (r.tipo !== 'anual' || r.nombreNoCoincide) console.log(`  ${r.tipo.padEnd(12)} ${String(r.meses ?? '?').padStart(2)}m ${r.cierre || '?'}${r.nombreNoCoincide ? ' NOMBRE≠' : ''}  ${r.md}${r.evidencia ? `\n      pág. ${r.evidencia.pagina}: ${r.evidencia.texto.slice(0, 120)}` : ''}`);
    }
  } else if (args[0]) {
    const t = readFileSync(resolve(args[0]), 'utf8');
    console.log(JSON.stringify(periodoDe(t, args[0], { xhtml: xhtmlHermano(resolve(args[0]), t) }), null, 1));
  } else console.error('Uso: node tools/periodo.mjs <archivo.md> | --todos [--solo-no-anual] | --grupos');
}

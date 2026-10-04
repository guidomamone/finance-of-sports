#!/usr/bin/env node
// ============================================================================
// tools/periodo.mjs — qué PERÍODO cubre un documento, leído del CONTENIDO del .md (no del nombre del archivo). Gratis, sin API.
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30): "cuando haya balances trimestrales, anuales (no temporada sino año), bimestrales o lo que
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
// CÓMO DECIDE (en este orden; solo mira las 6 primeras páginas y las líneas cortas, donde están los títulos, para no confundirse con la
// prosa de las notas, que habla de "trimestres" o "seis meses" por cualquier motivo):
//   1. "N meses" explícito cerca de una palabra de cierre/período ("three months ended", "seis meses terminados", "üç aylık", "за 9 месяцев",
//      "sechs Monate", "9M", "H1", "1T", "Q3"), en ~15 idiomas. Número en cifras o en palabras.
//   2. Rango de fechas explícito ("del 1 de enero al 30 de junio de 2019", "01.01.2019 - 30.09.2019", "1 July 2018 to 31 December 2018"):
//      los meses salen de la diferencia.
//   3. Palabra de período intermedio SIN meses ("interim", "ara dönem", "Zwischenbericht", "delårsrapport", "полугодие", "中期"): 'intermedio'.
//   4. Nada de lo anterior: 'anual' (lo normal en este proyecto), con el cierre = la fecha de fin de mes más citada en los títulos.
//   Fecha de cierre, escalera (Versión 369): escalón 0 la más citada en los títulos; escalón 1 los encabezados de columna de las tablas
//   (ejercicio | mismo día un año antes); compuerta: nunca más de 2 años después de hoy.
//
// USO:
//   import { periodoDe } from './periodo.mjs';
//   node tools/periodo.mjs <archivo.md>                un documento
//   node tools/periodo.mjs --todos [--solo-no-anual]   todos los .md de Clubes/ (sin .previo/.antes/-check/-redo)
//   node tools/periodo.mjs --grupos                    por club y año: qué períodos parciales hay (para juntarlos cuando lleguen los demás)
// ============================================================================

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';

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

function tipoDeMeses(m) {
  return { 1: 'mensual', 2: 'bimestral', 3: 'trimestral', 4: 'cuatrimestral', 6: 'semestral', 9: 'nueve-meses', 12: 'anual' }[m] || 'otro';
}

// Fechas de una línea: "31 Ağustos 2019", "August 31, 2019", "31.08.2019", "31/08/2019", "2019-08-31". Devuelve [{a, m, d}].
function fechasDe(linea) {
  const t = norm(linea); const out = [];
  for (const x of t.matchAll(/(?<!\d)(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?!\d)/g)) { const d = +x[1], m = +x[2]; if (m >= 1 && m <= 12 && d >= 1 && d <= 31) out.push({ a: +x[3], m, d, i: x.index }); }
  for (const x of t.matchAll(/(?<!\d)(\d{4})-(\d{2})-(\d{2})(?!\d)/g)) out.push({ a: +x[1], m: +x[2], d: +x[3], i: x.index });
  for (const x of t.matchAll(new RegExp(`(?<!\\d)(\\d{1,2})\\.?\\s*(?:de\\s+)?(${MES_RE})\\.?,?\\s*(?:de\\s+|del\\s+)?(\\d{4})`, 'gu'))) out.push({ a: +x[3], m: MES_DE.get(x[2]), d: +x[1], i: x.index });
  for (const x of t.matchAll(new RegExp(`(${MES_RE})\\.?\\s+(\\d{1,2}),?\\s+(\\d{4})`, 'gu'))) out.push({ a: +x[3], m: MES_DE.get(x[1]), d: +x[2], i: x.index });
  return out.sort((p, q) => p.i - q.i);
}
const iso = (f) => `${f.a}-${String(f.m).padStart(2, '0')}-${String(f.d).padStart(2, '0')}`;
const finDeMes = (f) => f.d >= 28;

function paginasDe(md) {
  const marks = [...md.matchAll(/^--- p[aá]g\. (\d+) ---/gm)];
  if (!marks.length) return [{ n: 1, body: md }];
  return marks.map((m, i) => ({ n: Number(m[1]), body: md.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : md.length) }));
}

export function periodoDe(mdText, nombreArchivo = '') {
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
  // cierre más citado en los títulos (para el anual y para completar). COMPUERTA (Versión 369): un cierre no puede ser de más de 2 años
  // después de hoy. Caso real: Fortaleza CEIF 2022, "La duración legal del Club es definida hasta el 31 de diciembre del 2050" (L28) ganaba
  // como cierre 2050-12-31 y el año nunca entraba como 2022. No "posterior a hoy" (lo primero que se probó): un PRESUPUESTO cierra en el
  // futuro de verdad (Boca "Presupuesto 26-27" y Racing "presupuesto2026-27", 2027-06-30, quedaban sin fecha).
  const TOPE = `${new Date().getFullYear() + 2}-12-31`;
  const cuenta = new Map();
  for (const l of lineas) for (const f of fechasDe(l.texto)) if (finDeMes(f) && f.a >= 1950 && iso(f) <= TOPE) cuenta.set(iso(f), (cuenta.get(iso(f)) || 0) + 1);
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
  // 4. anual por descarte
  if (!res) res = { tipo: 'anual', meses: 12, cierre: masCitado, evidencia: null, confianza: masCitado ? 'media' : 'baja' };
  if (res.cierre && res.cierre > TOPE) res.cierre = null; // la compuerta, también para lo leído en los pasos 1-3
  if (!res.cierre) res.cierre = masCitado;
  // ESCALÓN 1 DE LA FECHA DE CIERRE (Versión 369, aprobado por Guido el 2026-10-02): si los títulos de las 6 primeras páginas no traen el
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
  if (res.tipo === 'anual' && res.cierre) res.anual = res.cierre.slice(5, 7) === '12' ? 'calendario' : 'temporada';
  // ¿El nombre del archivo dice otra cosa? (fecha AAAA-MM-DD / DD-MM-AAAA o el año de cierre)
  const nom = basename(nombreArchivo);
  const fn = fechasDe(nom.replace(/_/g, '-'))[0];
  if (res.cierre && fn && iso(fn) !== res.cierre) res.nombreNoCoincide = true;
  else if (res.cierre && !fn) {
    const ys = [...nom.matchAll(/(?<!\d)(19|20)\d{2}(?!\d)/g)].map((x) => x[0]);
    // Temporada abreviada "2009-10" / "2023_24": el año de CIERRE es el segundo (misma regla que guessYear() de onboard.mjs). BUG REAL
    // (encontrado probando tools/cargar.mjs, 2026-09-30): el regex de arriba solo veía "2009", y 165 de los 226 documentos marcados
    // `nombreNoCoincide` eran temporadas así (Los Andes 2009-10 con cierre 2010-06-30, Nacional 2023-24, Lazio 2024-25, los alemanes).
    for (const m of nom.matchAll(/(?<!\d)((?:19|20)\d{2})[-_](\d{2})(?!\d)/g)) { const fin = Number(m[1].slice(0, 2) + m[2]); if (fin === Number(m[1]) + 1) ys.push(String(fin)); }
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
    const filas = todosLosMd().map((f) => ({ md: f.replace(ROOT + '/', ''), ...periodoDe(readFileSync(f, 'utf8'), f) }));
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
    console.log(JSON.stringify(periodoDe(readFileSync(resolve(args[0]), 'utf8'), args[0]), null, 1));
  } else console.error('Uso: node tools/periodo.mjs <archivo.md> | --todos [--solo-no-anual] | --grupos');
}

// ============================================================================
// tools/alta-club-tablas.mjs — las tablas fijas del alta: países, monedas, meses, formas societarias y ligas conocidas
// Mudado de tools/alta-club.mjs sin cambiar una línea (salvo `export`); tools/alta-club.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

// ============================================================================
// TABLAS FIJAS. Lo único "conocimiento propio" del script: datos públicos que no
// cambian (ISO 3166, la moneda de curso legal de cada país, en qué año dejó de
// circular la moneda vieja). La bandera NO está acá: sale del ISO2 (los emoji de
// bandera son los dos "regional indicators" del código, mecánico).
// ============================================================================
// Clave = nombre de la carpeta de país en `Clubes/` (en castellano, como las crea
// el sourcing). `en` es el nombre para `data/lang/en.js`; `legado` es la moneda
// que se usaba ANTES de `desde` (año de cierre del ejercicio a partir del cual los
// balances ya salen en la moneda actual).
const PAISES = {
  'Alemania':        { iso2: 'DE', moneda: 'EUR', region: 'europa', en: 'Germany', legado: { codigo: 'DEM', desde: 2002, tokens: ['dem', 'dm', 'deutsche mark'] } },
  'Argentina':       { iso2: 'AR', moneda: 'ARS', region: 'sudamerica', en: 'Argentina' },
  'Austria':         { iso2: 'AT', moneda: 'EUR', region: 'europa', en: 'Austria', legado: { codigo: 'ATS', desde: 2002, tokens: ['ats', 'schilling'] } },
  'Brasil':          { iso2: 'BR', moneda: 'BRL', region: 'sudamerica', en: 'Brazil' },
  'Bélgica':         { iso2: 'BE', moneda: 'EUR', region: 'europa', en: 'Belgium', legado: { codigo: 'BEF', desde: 2002, tokens: ['bef', 'belgische frank', 'francs belges', 'bfr'] } },
  'Chile':           { iso2: 'CL', moneda: 'CLP', region: 'sudamerica', en: 'Chile' },
  'China':           { iso2: 'CN', moneda: 'CNY', region: 'asia', en: 'China' },
  'Colombia':        { iso2: 'CO', moneda: 'COP', region: 'sudamerica', en: 'Colombia' },
  'Corea del Sur':   { iso2: 'KR', moneda: 'KRW', region: 'asia', en: 'South Korea' },
  'Costa Rica':      { iso2: 'CR', moneda: 'CRC', region: 'norteamerica', en: 'Costa Rica' },
  'Croacia':         { iso2: 'HR', moneda: 'EUR', region: 'europa', en: 'Croatia', legado: { codigo: 'HRK', desde: 2023, tokens: ['hrk', 'kuna', 'kuna', 'kn'] } },
  'Dinamarca':       { iso2: 'DK', moneda: 'DKK', region: 'europa', en: 'Denmark' },
  'Ecuador':         { iso2: 'EC', moneda: 'USD', region: 'sudamerica', en: 'Ecuador' },
  // Escocia NO tiene ISO2 propio (es parte de GB): va como GB, igual que Inglaterra, Gales e Irlanda del Norte (decisión de Guido).
  // El sitio muestra GB como "Inglaterra" con la bandera inglesa: el nombre y la bandera son de pantalla.
  'Escocia':         { iso2: 'GB', moneda: 'GBP', region: 'europa', en: 'Scotland' },
  'España':          { iso2: 'ES', moneda: 'EUR', region: 'europa', en: 'Spain', legado: { codigo: 'ESP', desde: 2002, tokens: ['pesetas', 'ptas', 'esp'] } },
  'Estonia':         { iso2: 'EE', moneda: 'EUR', region: 'europa', en: 'Estonia', legado: { codigo: 'EEK', desde: 2011, tokens: ['eek', 'kroon', 'krooni'] } },
  'Estados Unidos':  { iso2: 'US', moneda: 'USD', region: 'norteamerica', en: 'United States' },
  'Francia':         { iso2: 'FR', moneda: 'EUR', region: 'europa', en: 'France', legado: { codigo: 'FRF', desde: 2002, tokens: ['frf', 'francs'] } },
  'Grecia':          { iso2: 'GR', moneda: 'EUR', region: 'europa', en: 'Greece', legado: { codigo: 'GRD', desde: 2002, tokens: ['grd', 'δραχμ', 'drachm'] } },
  'Guatemala':       { iso2: 'GT', moneda: 'GTQ', region: 'norteamerica', en: 'Guatemala' },
  'Honduras':        { iso2: 'HN', moneda: 'HNL', region: 'norteamerica', en: 'Honduras' },
  'Inglaterra':      { iso2: 'GB', moneda: 'GBP', region: 'europa', en: 'England' },
  'Italia':          { iso2: 'IT', moneda: 'EUR', region: 'europa', en: 'Italy', legado: { codigo: 'ITL', desde: 2002, tokens: ['lire', 'itl', 'lit.'] } },
  'Jamaica':         { iso2: 'JM', moneda: 'JMD', region: 'norteamerica', en: 'Jamaica' },
  'Japón':           { iso2: 'JP', moneda: 'JPY', region: 'asia', en: 'Japan' },
  'México':          { iso2: 'MX', moneda: 'MXN', region: 'norteamerica', en: 'Mexico' },
  'Noruega':         { iso2: 'NO', moneda: 'NOK', region: 'europa', en: 'Norway' },
  // Panamá: el balboa está a la par del dólar y los balances suelen salir en "B/." o
  // en USD indistintamente — no es algo que el script pueda asumir.
  'Panamá':          { iso2: 'PA', moneda: null, region: 'norteamerica', en: 'Panama', preguntaMoneda: 'Panamá: el balboa (PAB) está a la par del dólar y los estados contables salen en B/. o en USD. ¿Se carga como USD (sin toggle) o como PAB con fx 1?' },
  'Países Bajos':    { iso2: 'NL', moneda: 'EUR', region: 'europa', en: 'Netherlands', legado: { codigo: 'NLG', desde: 2002, tokens: ['nlg', 'gulden', 'hfl', 'fl.'] } },
  'Perú':            { iso2: 'PE', moneda: 'PEN', region: 'sudamerica', en: 'Peru' },
  'Portugal':        { iso2: 'PT', moneda: 'EUR', region: 'europa', en: 'Portugal', legado: { codigo: 'PTE', desde: 2002, tokens: ['pte', 'escudos', 'contos'] } },
  'República Checa': { iso2: 'CZ', moneda: 'CZK', region: 'europa', en: 'Czech Republic' },
  'Rusia':           { iso2: 'RU', moneda: 'RUB', region: 'europa', en: 'Russia' },
  'Suiza':           { iso2: 'CH', moneda: 'CHF', region: 'europa', en: 'Switzerland' },
  'Turquía':         { iso2: 'TR', moneda: 'TRY', region: 'europa', en: 'Turkey', legado: { codigo: 'TRL', desde: 2005, tokens: ['trl', 'türk lirası', 'turk lirasi'] } },
  'Ucrania':         { iso2: 'UA', moneda: 'UAH', region: 'europa', en: 'Ukraine' },
};
// ESCALÓN DEL PAÍS. Escalón 0: la tabla PAISES de arriba. Escalón 1, solo si la carpeta no está ahí:
// la tabla de referencia ISO (tools/paises-referencia.json: ISO2, moneda ISO 4217, región, nombre en inglés y la moneda vieja de antes del
// euro). COMPUERTA: el nombre de la carpeta, sin tildes ni mayúsculas, coincide con UNA sola entrada. Antes, un país nuevo frenaba el alta con
// 3 preguntas (id, país, moneda) hasta agregar su fila a mano (Estonia); en Clubes/ hay 32 carpetas así (Polonia, Suecia, Uruguay...).
let REFERENCIA = null;
const sinTilde = (x) => String(x || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
export function paisDe(nombre) {
  if (PAISES[nombre]) return PAISES[nombre];
  if (!REFERENCIA) { try { REFERENCIA = JSON.parse(readFileSync(resolve(ROOT, 'tools/paises-referencia.json'), 'utf8')).paises || {}; } catch { REFERENCIA = {}; } }
  const m = Object.entries(REFERENCIA).filter(([k]) => sinTilde(k) === sinTilde(nombre));
  return m.length === 1 ? { ...m[0][1], referencia: true } : undefined;
}

export const NOMBRE_PAIS_ES = { DE: 'Alemania', AR: 'Argentina', AT: 'Austria', BR: 'Brasil', BE: 'Bélgica', CL: 'Chile', CN: 'China', CO: 'Colombia', KR: 'Corea del Sur', CR: 'Costa Rica', HR: 'Croacia', DK: 'Dinamarca', EC: 'Ecuador', EE: 'Estonia', ES: 'España', US: 'Estados Unidos', FR: 'Francia', GR: 'Grecia', GT: 'Guatemala', HN: 'Honduras', GB: 'Inglaterra', IT: 'Italia', JM: 'Jamaica', JP: 'Japón', MX: 'México', NO: 'Noruega', PA: 'Panamá', NL: 'Países Bajos', PE: 'Perú', PT: 'Portugal', CZ: 'República Checa', RU: 'Rusia', CH: 'Suiza', TR: 'Turquía', UA: 'Ucrania' };

// Monedas: escala de visualización (mismo criterio que la cabecera de
// data/currency-map.js: scale 1000 = "miles de millones", para monedas de valor
// nominal grande), rango plausible de "moneda por 1 USD" (generoso a propósito:
// atrapa un fx invertido o con el orden de magnitud mal, no exige precisión), y
// las formas en que el texto de un balance nombra la moneda.
//
// RANGOS REVISADOS contra el mínimo y el máximo REAL de cada serie de tools/fx-reference/
// (bug real: TRY estaba en [1, 45] y la lira cotiza 48,93 al 30/9/2026, así que un tipo de cambio
// declarado de hoy se descartaba como "no plausible"). Criterio: [~90% del mínimo histórico, máximo
// histórico + margen para lo que puede moverse en ~1-2 años]. Mín./máx. medidos (fecha):
//   ARS 2,76 (2003-07) – 1.525,5 (2026-09)   -> [0.9, 3000]  (0,9: antes de 2002 la convertibilidad era 1:1)
//   BRL 1,5345 (2011-07) – 6,2086 (2025-01)  -> [1.4, 7.5]   (era [3, 7]: descartaba todo 2010-2015)
//   COP 1.748 (2011-07) – 5.061 (2022-11)    -> [1600, 5500] (era [2500, 5000]: descartaba 2010-2014)
//   NOK 4,96 (2008-04) – 11,48 (2025-01)     -> [4.5, 13]
//   CZK 14,45 (2008-07) – 42,13 (2000-10)    -> [13, 45]     (era [15, 35]: descartaba 2000-2003 y 2008)
//   CHF 0,7296 (2011-08) – 1,825 (2000-10)   -> [0.65, 1.95]
//   TRY 0,535 (2000-01) – 48,93 (2026-09)    -> [0.5, 70]    (lira nueva; se deprecia 20-40% por año: margen amplio)
//   RUB 23,13 (2008-07) – 120,38 (2022-03)   -> [20, 140]
//   UAH 4,84 (2008-07) – 44,98 (2026-06)     -> [4.5, 60]
//   KRW 903,2 (2007-10) – 1.570,1 (2009-03)  -> [800, 1800]
// Las monedas sin serie local (PEN, EUR, GBP, DKK, CNY, JPY, MXN...) quedan como estaban.
// OJO: esta tabla es la de alta-club.mjs (filtra candidatos del texto y es lo que `--escribir` copia a
// FX_PLAUSIBLE_RANGE cuando la moneda es NUEVA). El rango del sitio vive en data/currency-map.js
// (FX_PLAUSIBLE_RANGE) y no se edita desde acá.
export const MONEDAS = {
  ARS: { scale: 1000, rango: [0.9, 3000], tokens: ['ars', '\\$'] },
  BRL: { scale: 1, rango: [1.4, 7.5], tokens: ['r\\$', 'brl', 'reais'] },
  CLP: { scale: 1000, rango: [600, 1200], tokens: ['clp', '\\$'] },
  COP: { scale: 1000, rango: [1600, 5500], tokens: ['cop', '\\$'] },
  PEN: { scale: 1, rango: [3, 5], tokens: ['pen', 's/\\.?', 'soles'] },
  USD: { scale: 1, rango: [1, 1], tokens: ['usd', 'us\\$', 'u\\$s'] },
  EUR: { scale: 1, rango: [0.7, 1.15], tokens: ['eur', '€', 'euro', 'euros', 'евро', 'євро', 'ευρω'] },
  GBP: { scale: 1, rango: [0.6, 0.95], tokens: ['gbp', '£'] },
  DKK: { scale: 1, rango: [5, 8], tokens: ['dkk', 't\\.kr', 'mio\\. kr', 'kr\\.'] },
  NOK: { scale: 1, rango: [4.5, 13], tokens: ['nok', 'kr', 'kroner'] },
  CZK: { scale: 1, rango: [13, 45], tokens: ['czk', 'kč', 'kc', 'korun'] },
  CHF: { scale: 1, rango: [0.65, 1.95], tokens: ['chf', 'fr\\.', 'franken'] },
  TRY: { scale: 1, rango: [0.5, 70], tokens: ['try', 'tl', 'türk lirası', 'turk lirasi'] },
  RUB: { scale: 1, rango: [20, 140], tokens: ['rub', 'руб', 'рубл'] },
  UAH: { scale: 1, rango: [4.5, 60], tokens: ['uah', 'грн', 'гривн'] },
  KRW: { scale: 1000, rango: [800, 1800], tokens: ['krw', '원', '₩'] },
  CNY: { scale: 1, rango: [6, 8], tokens: ['cny', 'rmb', '人民币', '元'] },
  JPY: { scale: 1, rango: [80, 180], tokens: ['jpy', '円', '¥'] },
  MXN: { scale: 1, rango: [10, 25], tokens: ['mxn', '\\$'] },
  GTQ: { scale: 1, rango: [7, 9], tokens: ['gtq', 'quetzales'] },
  HNL: { scale: 1, rango: [18, 27], tokens: ['hnl', 'lempiras'] },
  JMD: { scale: 1, rango: [80, 170], tokens: ['jmd', 'j\\$'] },
  CRC: { scale: 1, rango: [450, 700], tokens: ['crc', '₡', 'colones'] },
};
// Monedas casi a la par del dólar: por el número solo no se puede saber si el
// documento escribió "moneda por USD" o "USD por moneda" (1,08 es EUR/USD al
// derecho o al revés según quién lo escriba). El bug de España de una versión anterior
// fue exactamente esto. Un fx declarado en estas monedas siempre es `pregunta`.
export const MONEDAS_A_LA_PAR = new Set(['EUR', 'GBP', 'CHF']);

// Palabras que marcan una línea de tipo de cambio, y las que nombran al dólar.
const FX_PALABRAS = ['tipo de cambio', 'tipos de cambio', 'cotizacion', 'taxa de cambio', 'taxas de cambio', 'ptax', 'cotacao', 'exchange rate', 'rate of exchange', 'rates of exchange', 'tasso di cambio', 'tassi di cambio', 'taux de change', 'wechselkurs', 'devisenkurs', 'stichtagskurs', 'wisselkoers', 'valutakurs', 'kurs ', 'kurz', 'tecaj', 'doviz kuru', 'kuru', 'курс', 'ισοτιμ', '환율', '汇率', 'trm', 'tasa representativa'];
const USD_PALABRAS = ['usd', 'us$', 'u$s', 'dolar', 'dollar', 'доллар', 'долар', 'δολαρ', '달러', '美元', 'dolár', 'dolaru', 'dolara'];
// Encabezados de un anexo de moneda extranjera (el tipo de cambio va en una columna, lejos de la
// palabra "tipo de cambio").
const ANCLAS_FX = ['moneda extranjera', 'foreign currenc', 'moeda estrangeira', 'moedas estrangeiras', 'valuta estera', 'valute estere', 'fremmed valuta', 'fremmede valuta', 'vreemde valuta', 'fremdwahrung', 'devises', 'cizi men', 'иностранн', 'іноземн', 'ξενο νομισμα', 'yabanci para', 'doviz', '외화', '外币', 'cotizacion', 'tipo de cambio', 'taxa de cambio', 'exchange rate'];
// Palabras que marcan que una tasa es la de CIERRE (y no un promedio del período).
const CIERRE_PALABRAS = ['cierre', 'closing', 'fechamento', 'encerramento', 'chiusura', 'stichtag', 'balansdag', 'closing rate', 'year end', 'year-end', 'al 31', 'al 30', 'em 31', 'at 31', 'at 30', 'на 31', 'на конец', 'станом на', 'kapanış', 'donem sonu', 'dönem sonu', '기말', '期末'];

// Formas societarias, para encontrar el nombre legal en el documento.
const FORMAS = ['a/s', 'aps', 'asa', 'as', 'ab', 'n\\.v\\.', 'nv', 'b\\.v\\.', 'bv', 'vzw', 'srl', 's\\.a\\.d\\.', 'sad', 's\\.a\\.', 'sa', 'saf', 's\\.p\\.a\\.', 'spa', 's\\.r\\.l\\.', 'gmbh & co\\.? kgaa', 'gmbh', 'ag', 'e\\.v\\.', 'plc', 'ltd\\.?', 'limited', 'a\\.s\\.', 's\\.r\\.o\\.', 'z\\.s\\.', 'd\\.d\\.', 's\\.d\\.d\\.', 'd\\.o\\.o\\.', 'a\\.ş\\.', 'p\\.a\\.e\\.', 'π\\.α\\.ε\\.', 'παε', 'fli', 'inc\\.?', 'co\\., ltd\\.?', 'ltda\\.?', 's\\.a\\.s\\.', 'kgaa', 'oyj', 'ооо', 'ао', 'пао', 'тов', 'пат'];

// Deportes que NO son fútbol, para no dar de alta como 'futbol' un equipo de F1.
export const DEPORTES_OTROS = {
  rugby: /\brugby\b/g,
  cricket: /\bcricket\b|\bcounty cricket\b|\bccc\b/g,
  f1: /formula (1|one)\b|\bgrand prix\b|\bf1\b/g,
  nfl: /\bnfl\b|national football league/g,
  basquet: /\bbasketball\b|\bbasquet\b|\bbaloncesto\b/g,
};
export const FUTBOL_RE = /football|futbol|fútbol|futebol|calcio|fodbold|fotball|voetbal|fussball|fußball|nogomet|fotbal|ποδοσφ|футбол|축구|足球|サッカー|soccer/g;

// Nombres de archivo que NO son un estado contable anual (presupuestos, intermedios, actas,
// memorias sueltas, dictámenes): no se cargan como balance y no cuentan para el historial de
// cierres del club (un semestral al 30/6 de un club que cierra el 31/12 NO es un cambio de cierre:
// bug real de la primera versión con Guangzhou Evergrande).
export const NO_BALANCE = /presupuesto|orcamento|budget|previsional|semi-annual|semi annual|semiannual|interim|intermedi|trimestr|quarter|ene-jun|movimientos|pagos|presentacion|acta|asamblea|minutes|agm|informe-gestion|informe-presidencia|reglamento|board_report|board-report|dictamen|comision-revisora|pagos-agentes|review/;
// Señales en el CONTENIDO de un estado intermedio (6 meses, semestral, trimestral).
export const INTERMEDIO_RE = /estados? financieros? intermedios?|periodo intermedio|seis meses|6 meses|semestral|[12][ºo°]? semestre|primeiro semestre|primer semestre|first half|interim (financial|condensed|report)|six months|half-year|half year|halbjahr|semestrale|tussentijds|halvars|pololet|полугод|піврічн|ενδιαμεσ|반기|中期/g;
// Meses, por idioma (sin acentos, en minúscula; ruso/ucraniano/griego/checo/croata
// en genitivo, que es como aparecen en una fecha). Valor = número de mes.
export const MESES = {};
const agregarMeses = (lista) => lista.forEach((m, i) => { for (const alt of m.split('|')) MESES[alt] = i + 1; });
agregarMeses(['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre|setiembre', 'octubre', 'noviembre', 'diciembre']);
agregarMeses(['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']);
agregarMeses(['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']);
agregarMeses(['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']);
agregarMeses(['januar|jan', 'februar|feb', 'marz|maerz|mars|marts', 'april|apr', 'mai|maj', 'juni|jun', 'juli|jul', 'august|aug', 'september|sep|sept', 'oktober|okt', 'november|nov', 'dezember|desember|december|dez|des']);
agregarMeses(['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']);
agregarMeses(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']);
agregarMeses(['ledna', 'unora', 'brezna', 'dubna', 'kvetna', 'cervna', 'cervence', 'srpna', 'zari', 'rijna', 'listopadu', 'prosince']);
agregarMeses(['sijecnja', 'veljace', 'ozujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenoga|studenog', 'prosinca']);
agregarMeses(['ocak', 'subat', 'mart', 'nisan', 'mayis', 'haziran', 'temmuz', 'agustos', 'eylul', 'ekim', 'kasim', 'aralik']);
agregarMeses(['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']);
agregarMeses(['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']);
agregarMeses(['ιανουαριου', 'φεβρουαριου', 'μαρτιου', 'απριλιου', 'μαιου', 'ιουνιου', 'ιουλιου', 'αυγουστου', 'σεπτεμβριου', 'οκτωβριου', 'νοεμβριου', 'δεκεμβριου']);
agregarMeses(['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'wrzesnia', 'pazdziernika', 'listopada', 'grudnia']);
// "listopada" es noviembre en polaco y octubre en croata; "lutego" febrero en polaco y
// ucraniano: la última tabla agregada gana y las dos colisiones dan el mismo número
// salvo listopada (pl 11 / hr 10). Croacia pesa más en `Clubes/` que Polonia (0 clubes).
MESES['listopada'] = 10;
export const MES_ALT = Object.keys(MESES).sort((a, b) => b.length - a.length).map((m) => m.replace(/\./g, '\\.')).join('|');

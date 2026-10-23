#!/usr/bin/env node
// ============================================================================
// tools/vocabulario.mjs — EL vocabulario contable multi-idioma del pipeline, en UN solo lugar (pedido de Guido:
// "deberías anticipar que los PDFs van a estar en múltiples idiomas, y todos los que faltan").
//
// POR QUÉ EXISTE. Antes las palabras que reconocen un estado de resultados, un ingreso, un gasto, un total o un flujo de
// efectivo vivían en 5+ regex y listas sueltas, en 4 herramientas distintas, y cada una se había ido parchando de a un idioma cuando un piloto
// fallaba: STATEMENT_RE (pipeline.mjs y proponer-carga.mjs, con contenidos distintos), NO_RESULTADOS_RE / SIDE_REV / SIDE_EXP / isTotal
// (pipeline.mjs), RELEVANT_KEYWORDS (extract-table-rows.mjs), REV_W / EXP_W / RESULTADO_RE / SUBTOTAL_RE (filas-rubro.mjs), REV_TOTAL_RE /
// RESULT_RE / TOTAL_RE (proponer-carga.mjs). Consecuencias reales de tenerlas separadas:
//   - Un idioma se agregaba en una lista y no en las otras (el ucraniano estaba en SIDE_REV pero no en REV_W; Karpaty Lviv tenía lado en 11
//     de 41 filas antes).
//   - Cada tool normalizaba el texto a su manera, y algunas palabras de las listas NUNCA podían coincidir: el turco "Hasılat" / "nakit akış"
//     (la ı sin punto no se convertía en i, así que 'hasilat' y 'nakit akis' no encontraban nada), el alemán "Umsatzerlöse" (la lista decía
//     'umsatzerloese' y la ö normalizada da 'o'), el coreano (NFD parte las sílabas de Hangul en letras sueltas y '손익계산서' dejaba de ser
//     igual a sí mismo), las palabras checas con acento dentro de la regex ('výnos', 'náklad': el texto se normaliza sin acentos y la regex los
//     tenía, así que esas entradas estaban muertas).
//   - Raíces cortas sueltas daban falsos positivos: 'venta' está adentro de "inventario"; 'ertrag' adentro de "Vertrag" (contrato);
//     'cost' adentro de "Costa Rica"; 'zisk' / 'zysk' adentro de cualquier palabra.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «vocabulario.mjs».
import { IDIOMAS, VOCABULARIO } from './vocabulario-datos.mjs';
export { IDIOMAS, VOCABULARIO } from './vocabulario-datos.mjs';
const ARABE_HEBREO_MARCAS = /[֑-ׇؐ-ًؚ-ٰٟۖ-ۭـ]/g;
export function normalizar(t) {
  return String(t ?? '').toLowerCase().replace(/ς/g, 'σ')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(ARABE_HEBREO_MARCAS, '')
    .replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/ð/g, 'd').replace(/đ/g, 'd')
    .replace(/ł/g, 'l').replace(/ı/g, 'i').replace(/ħ/g, 'h').replace(/þ/g, 'th').replace(/[أإآٱ]/g, 'ا')
    .normalize('NFC')
    .replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------- FAMILIA DE UNA ETIQUETA
// Pedido de Guido: "una familia de palabras similares, como la del PSV con dos S o una". El precedente del club (escalón 0 de la
// categorización: si el club ya cargó ese renglón en otro año, se copia su categoría gratis) comparaba el texto EXACTO, y el mismo renglón de un
// año a otro cambia en detalles que no cambian qué es: PSV 2019-20 imprime "Vergoedingsommen" y 2024/2025 "Vergoedingssommen
// (transferopbrengsten)"; el número de nota ("Belastingen (22)"), la numeración ("1. Umsatzerlöse"), la traducción bilingüe ("Andre finansielle
// omkostninger<br>*Other financial expenses*"). Con el texto exacto esas filas iban a Claude, que dudaba (PSV: 0,75 -> el ejercicio frenaba).
//
// claveFamilia(): la forma canónica de la etiqueta. Sobre normalizar() saca, en este orden: lo que viene después de un <br> (la traducción), el
// markdown (*, _, #), la numeración inicial ("1.", "a)", "IV.", "1.1."), las referencias a notas ("(22)", "nota 16", "note 5", "5(f)", "Anexo
// E"), la puntuación y los espacios repetidos. El paréntesis final con texto queda (ver mismaFamilia()).
// mismaFamilia(a, b): claves iguales, o casi iguales por DISTANCIA DE EDICIÓN (letras cambiadas, de más o de menos): hasta 1 letra si la clave
// tiene 10 caracteres o más, hasta 2 si tiene 20 o más. Con etiquetas cortas NO se tolera ninguna: "ventas" y "rentas" difieren en una letra y
// no son lo mismo. El riesgo que queda lo acota quien la usa: solo contra el MISMO club, y solo si todos los años de ese club con esa familia
// dicen la misma categoría (si no, no hay precedente).
const NOTA_REF_RE = /\(\s*(nota|notas|note|notes|anexo|anexos|annex|n\.?)?\s*[0-9ivx]{1,4}(\s*[.,/-]\s*[0-9a-z]{1,3})*\s*\)|\b(nota|notas|note|notes|anexo|annex)\s*[0-9ivxa-e]{1,4}(\s*[.,/(-]\s*[0-9a-z]{1,3}\)?)*|\b\d{1,2}\s*\([a-z]\)/g;
export function claveFamilia(etiqueta) {
  let t = String(etiqueta ?? '').split(/<br\s*\/?>/i)[0];
  t = normalizar(t.replace(/[*_#`]/g, ' '));
  // la numeración italiana "4 bis)", "5-bis)", "17bis)", "15 bis )" (y "ter") sale igual que "4)". Antes
  // "4 bis) Debiti verso banche oltre l'esercizio successivo" no empezaba con "debiti verso banche" y el diccionario de deuda no la veía.
  // Caso: Genoa 2022 (pág. 8, L304-312), 3 bis) soci 1.300.000 y 4 bis) banche 48.266.122.
  t = t.replace(/^\s*(\(?[0-9]{1,2}(\.[0-9]{1,2})*(\s?-?\s?(bis|ter)\s?)?[.)]|\(?[a-z][.)]|\(?[ivx]{1,5}[.)])\s+/, '');
  t = t.replace(NOTA_REF_RE, ' ');
  return t.replace(/[^\p{L}\p{N}() ]+/gu, ' ').replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}
// La clave SIN el paréntesis del final: "vergoedingssommen (transferopbrengsten)" -> "vergoedingssommen".
const sinParentesisFinal = (k) => k.replace(/\s*\([^()]*\)\s*$/, '').trim();
function distanciaEdicion(a, b, tope) {
  if (Math.abs(a.length - b.length) > tope) return tope + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let min = i;
    for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (cur[j] < min) min = cur[j]; }
    if (min > tope) return tope + 1;
    prev = cur;
  }
  return prev[b.length];
}
// EL PARÉNTESIS DEL FINAL (medido contra producción, 7.098 líneas cargadas): quitarlo siempre daba 93,0% de acierto en las 171 líneas que el
// precedente exacto no cubre, y casi todos los errores eran el SECTOR, que en los clubes argentinos y brasileños va entre paréntesis y cambia la
// categoría ("Seguros (Fútbol)" -> wages_squad, "Seguros (Estadio)" -> admin_general_expense; "... (Otros Dptos)" -> youth_other_sports_expense).
// Regla: si las DOS etiquetas tienen paréntesis final, tiene que coincidir; si solo una lo tiene, se compara sin él (PSV).
function casiIgual(x, y) {
  if (!x || !y) return false;
  if (x === y) return true;
  const n = Math.min(x.length, y.length); const tope = n >= 20 ? 2 : n >= 10 ? 1 : 0;
  return tope > 0 && distanciaEdicion(x, y, tope) <= tope;
}
// { parentesis: false }: sin la tolerancia del paréntesis final (medido: para filas SIN LADO conocido la tolerancia bajaba a 91,9%, porque el
// paréntesis suele decir el lado: "Bilheteria" es ingreso y "Bilheteria (Custo)" es gasto; sin ella, 60 líneas más con 100% de acierto).
export function mismaFamilia(a, b, { parentesis = true } = {}) {
  const x = claveFamilia(a); const y = claveFamilia(b);
  if (casiIgual(x, y)) return true;
  if (!parentesis) return false;
  const px = sinParentesisFinal(x); const py = sinParentesisFinal(y);
  const unoSolo = (px !== x) !== (py !== y);
  return unoSolo && casiIgual(px, py);
}

// ---------------------------------------------------------------- compilación de términos a regex
const SEP = '[^\\p{L}\\p{N}]+';     // ' ' en un término
const SEP_OPC = '[^\\p{L}\\p{N}]*'; // '-' en un término
const LIM_ANTES = '(?<![\\p{L}\\p{N}])';
const LIM_DESPUES = '(?![\\p{L}\\p{N}])';
// Escrituras sin espacios entre palabras (o con prefijos pegados): sin límites de palabra.
const SIN_LIMITES = /[֐-׿؀-ۿ぀-ヿ㐀-鿿가-힯豈-﫿]/u;

// modo: 'libre' (en cualquier parte del texto), 'inicio' (anclado al comienzo), 'fin' (anclado al final), 'entero' (todo el texto).
// En los modos anclados un '*' inicial/final tiene que consumir letras de verdad (\p{L}*); en el libre alcanza con no poner el límite.
export function fuente(term, modo = 'libre') {
  if (term && typeof term === 'object') return term.re;
  let s = normalizar(term);
  let ini = true; let fin = true; let pre = ''; let post = '';
  if (SIN_LIMITES.test(s)) { ini = false; fin = false; }
  if (s.startsWith('*')) { ini = false; s = s.slice(1); if (modo !== 'libre') pre = '\\p{L}*'; }
  if (s.endsWith('*')) { fin = false; s = s.slice(0, -1); if (modo === 'fin' || modo === 'entero') post = '\\p{L}*'; }
  let out = '';
  for (const ch of s) {
    if (ch === '*') out += '\\p{L}*';
    else if (ch === ' ') out += SEP;
    else if (ch === '-') out += SEP_OPC;
    else out += ch.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  }
  return (ini ? LIM_ANTES : '') + pre + out + post + (fin ? LIM_DESPUES : '');
}

// Prefijo que puede tener una ETIQUETA DE FILA antes de la palabra que importa: negritas "**", espacios y un signo "(=)", "(-)", "+".
const PREFIJO_FILA = '[\\s*]*(?:\\(?[=+\\-]\\)?\\s*)?';

export function compilar(terminos, modo = 'libre') {
  const alt = terminos.map((t) => fuente(t, modo)).join('|');
  if (modo === 'inicio') return new RegExp(`^${PREFIJO_FILA}(?:${alt})`, 'u');
  if (modo === 'fin') return new RegExp(`(?:${alt})[^\\p{L}\\p{N}]*$`, 'u');
  if (modo === 'entero') return new RegExp(`^(?:${alt})$`, 'u');
  return new RegExp(`(?:${alt})`, 'u');
}
export function terminos(concepto, idiomas = null) {
  const c = VOCABULARIO[concepto]; if (!c) throw new Error(`vocabulario.mjs: concepto desconocido ${concepto}`);
  return Object.entries(c).filter(([k]) => !idiomas || idiomas.includes(k)).flatMap(([, v]) => v);
}

// ---------------------------------------------------------------- regex listas para las tools (sobre texto YA normalizado con normalizar())
const T = terminos;
// Estado de resultados por sección + columnas (proponer-carga.mjs). El TITULO_SOLO va anclado al texto entero.
export const TITULO_RESULTADOS_RE = new RegExp(`${compilar(T('TITULO_RESULTADOS')).source}|${compilar(T('TITULO_SOLO'), 'entero').source}`, 'u');
// INGRESOS_RE: lado de una fila y de una tabla (incluye INGRESOS_FILA, como el REV_W de antes). INGRESOS_TABLA_RE: solo las palabras que
// pueden decir el lado de una tabla entera o volverla relevante.
export const INGRESOS_RE = compilar([...T('INGRESOS'), ...T('INGRESOS_LADO'), ...T('INGRESOS_FILA')]);
export const INGRESOS_TABLA_RE = compilar([...T('INGRESOS'), ...T('INGRESOS_LADO'), ...T('INGRESOS_TABLA')]);
export const GASTOS_RE = compilar(T('GASTOS'));
export const IMPUESTOS_RE = compilar(T('IMPUESTOS'));
export const RESULTADO_INICIO_RE = compilar(T('RESULTADO_INICIO'), 'inicio');
export const GANANCIA_PERDIDA_RE = compilar(T('GANANCIA_PERDIDA'));
// Subtotal/total: al comienzo O al final de la etiqueta.
export const TOTAL_INICIO_RE = compilar(T('TOTAL_INICIO'), 'inicio');
export const TOTAL_FIN_RE = compilar(T('TOTAL_FIN'), 'fin');
// signo de una fila del financiero por su rótulo; se prueban sobre normalizar(etiqueta)
export const FIN_INGRESO_RE = compilar(T('FIN_INGRESO'));
export const FIN_GASTO_RE = compilar(T('FIN_GASTO'));
// Cobertura de pérdidas de un socio o del holding: no es un ingreso operativo. La usan verificar.mjs (cuenta en el resultado, fuera de
// ingresos y gastos) y cargar.mjs (la carga como exceptional_items, una ganancia dentro de los gastos, como la venta del 20% de Goiás 2023).
// Se amplía a las transferencias entre la sociedad del club y su holding o su asociación, que el informe de
// FC Basel imprime SIN LADO debajo del resultado operativo: la garantía de déficit (Defizitgarantie, de la Holding a la AG o de la AG al Verein) y la
// transferencia de ganancia (Gewinnüberführung/-übertrag/-abführung, también su "Korrektur"). Solo actúan sobre filas sin lado: una Defizitgarantie
// que el documento cuenta DENTRO de Total Aufwand (Basel 2015 y 2019) ya viene como gasto y no se toca.
export const COBERTURA_PERDIDAS_RE = /verlustabdeckung|verlustübernahme|verlustuebernahme|verlustausgleich|defizitgarantie|gewinn(ü|ue)ber(führung|fuehrung|trag)|gewinnabführung|gewinnabfuehrung|cobertura de p[eé]rdidas|cobertura de pr[eé]juízo|copertura (delle )?perdite/i;
export const DE_LOS_CUALES_RE = compilar(T('DE_LOS_CUALES'), 'inicio');
export const TOTAL_RE = new RegExp(`${TOTAL_INICIO_RE.source}|${TOTAL_FIN_RE.source}`, 'u');
export const esTotal = (etiqueta) => TOTAL_RE.test(normalizar(etiqueta));
export const TOTAL_INGRESOS_RE = compilar(T('TOTAL_INGRESOS'), 'inicio');
export const RESULTADO_EJERCICIO_RE = compilar(T('RESULTADO_EJERCICIO'), 'inicio');
// Flujo de efectivo, cambios en el patrimonio y cuadros de movimientos de saldos: tablas que NO son estado de resultados.
export const FLUJO_O_PATRIMONIO_RE = compilar([...T('FLUJO_EFECTIVO'), ...T('CAMBIOS_PATRIMONIO'), ...T('SALDO_INICIAL')]);
export const TITULO_BALANCE_RE = compilar(T('TITULO_BALANCE'));
export const TOTAL_ACTIVO_RE = compilar(T('TOTAL_ACTIVO'), 'inicio');
export const TOTAL_PASIVO_RE = compilar(T('TOTAL_PASIVO'), 'inicio');
export const CAJA_RE = compilar(T('CAJA'), 'inicio');
export const DEUDA_FINANCIERA_RE = compilar(T('DEUDA_FINANCIERA'), 'inicio');
// ---- Resultado financiero e impuesto a las ganancias (se mudaron acá desde tools/cargar.mjs, porque ahora también los usa la
// selección de filas de tools/proponer-carga.mjs). Son expresiones regulares escritas a mano y no conceptos del VOCABULARIO porque mezclan
// raíces con comodín en el medio de la palabra y frases con alternativas internas que compilar() no sabe armar. Se prueban sobre texto
// NORMALIZADO (normalizar(): minúsculas, sin acentos).
//   - Para tools/cargar.mjs deciden el DESTINO de una fila: el resultado financiero va a `netInterest` y el impuesto a las ganancias a `tax`
//     del fiscalYearMeta, nunca como línea (club-data-mapping §2).
//   - Para tools/proponer-carga.mjs deciden qué renglón del estado de resultados NO se abre en una nota: si va entero al fiscalYearMeta, su
//     desglose no sirve, y abrirlo trajo basura real (PSV 2019-20: "Belastingen (22)" se abría en la conciliación de la tasa impositiva,
//     "Verwachte belasting op basis van nominaal tarief"; Sunderland 2025: el interés de la nota y el del estado se cargaban los dos).
// Resultado financiero: intereses, diferencias de cambio, "financial income/expenses", participaciones en otras sociedades (Vejle suma la
// participación en VB Plus ApS a netInterest).
export const FINANCIERO_RE = /\b(interes(es)?|interest|zinsen?|zins|renteindt|renteudg|renteinnt|rentekost|renter|rente\w*|juros|financ\w*|finanz\w*|finans\w*|financij\w*|financn\w*|финанс\w*|фінанс\w*|процент\w*|diferencias? de cambio|exchange (gain|loss|difference)\w*|foreign exchange|kursdifferen\w*|wechselkurs\w*|valutakurs\w*|variac\w* cambia\w*|kur farki\w*|tecajn\w*|kapitalandele|beteiligung\w*|ertrage aus beteiligung)\b/;
// Impuesto a las GANANCIAS (no "impuestos, tasas y contribuciones", que es admin_general_expense: CRITERIOS de categorizar-claude.mjs).
export const IMPUESTO_GANANCIAS_RE = /(income tax|tax on (profit|loss|ordinary)|taxation|corporation tax|impuesto (a las|sobre las?) (ganancias|renta|sociedades|utilidad)|impuesto a la renta|imposto de renda|irpj|csll|imposto sobre o rendimento|steuern vom einkommen|ertragsteuer|korperschaftsteuer|skat af arets|selskabsskat|skatt pa (arets|ordinaert)|inkomstskatt|belasting (over|op) (de )?(winst|resultaat)|vennootschapsbelasting|imposte sul reddito|porez na dobit|dan z prijm|налог на прибыль|податок на прибуток|kurumlar vergisi|vergi (gideri|geliri))/;
// Un renglón que es SOLO la palabra impuesto(s) ("Belastingen (22)" de PSV, "Taxation", "Steuern"), en el estado de resultados, es el impuesto a
// las ganancias del ejercicio (los impuestos operativos llevan más texto: "Impuestos, tasas y contribuciones", "Sonstige Steuern").
export const IMPUESTO_SOLO_RE = /^\**\s*(\d{1,2}[.)]\s*)?(belastingen|belasting|taxation|tax|taxes|impuestos?|impostos?|steuern|skat|skatt|skatter|vergi|porez|dan|налог|податок)\s*(\(\d+\))?\**\s*$/;

// Relevancia de una tabla (extract-table-rows.mjs): título de estado de resultados, ingresos, gastos o palabras de resultado.
export const RELEVANTE_RE = compilar([...T('TITULO_RESULTADOS'), ...T('INGRESOS'), ...T('INGRESOS_TABLA'), ...T('GASTOS'), ...T('RESULTADO_RELEVANTE')]);
// Columna de notas / código de fila (filas-rubro.mjs columnaDeImportes).
export const NOTAS_COLUMNA_RE = new RegExp(`${compilar(T('NOTAS_ENTERO'), 'entero').source}|${compilar(T('NOTAS_EN')).source}`, 'u');

// ---------------------------------------------------------------- CLI: probar un texto o ver la cobertura
if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv.slice(2);
  if (arg[0] === '--cobertura') {
    const conceptos = Object.keys(VOCABULARIO);
    console.log(`concepto`.padEnd(22) + IDIOMAS.map((i) => i.padStart(3)).join(''));
    for (const c of conceptos) console.log(c.padEnd(22) + IDIOMAS.map((i) => (VOCABULARIO[c][i] ? '  x' : '  .')).join(''));
  } else if (arg.length) {
    const txt = normalizar(arg.join(' '));
    const res = { TITULO_RESULTADOS_RE, INGRESOS_RE, GASTOS_RE, IMPUESTOS_RE, RESULTADO_INICIO_RE, GANANCIA_PERDIDA_RE, TOTAL_RE, TOTAL_INGRESOS_RE, RESULTADO_EJERCICIO_RE, FLUJO_O_PATRIMONIO_RE, TITULO_BALANCE_RE, TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE, RELEVANTE_RE, NOTAS_COLUMNA_RE };
    console.log(`normalizado: "${txt}"`);
    for (const [k, re] of Object.entries(res)) { const m = txt.match(re); if (m) console.log(`  ${k.padEnd(24)} "${m[0]}"`); }
  } else console.log('Uso: node tools/vocabulario.mjs "texto a probar"   |   node tools/vocabulario.mjs --cobertura');
}

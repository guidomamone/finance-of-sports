#!/usr/bin/env node
// ============================================================================
// tools/vocabulario.mjs — EL vocabulario contable multi-idioma del pipeline, en UN solo lugar (Versión 316, pedido de Guido 2026-09-30:
// "deberías anticipar que los PDFs van a estar en múltiples idiomas, y todos los que faltan").
//
// POR QUÉ EXISTE. Hasta la Versión 313 las palabras que reconocen un estado de resultados, un ingreso, un gasto, un total o un flujo de
// efectivo vivían en 5+ regex y listas sueltas, en 4 herramientas distintas, y cada una se había ido parchando de a un idioma cuando un piloto
// fallaba: STATEMENT_RE (pipeline.mjs y proponer-carga.mjs, con contenidos distintos), NO_RESULTADOS_RE / SIDE_REV / SIDE_EXP / isTotal
// (pipeline.mjs), RELEVANT_KEYWORDS (extract-table-rows.mjs), REV_W / EXP_W / RESULTADO_RE / SUBTOTAL_RE (filas-rubro.mjs), REV_TOTAL_RE /
// RESULT_RE / TOTAL_RE (proponer-carga.mjs). Consecuencias reales de tenerlas separadas:
//   - Un idioma se agregaba en una lista y no en las otras (el ucraniano estaba en SIDE_REV pero no en REV_W; Karpaty Lviv tenía lado en 11
//     de 41 filas hasta la Versión 312).
//   - Cada tool normalizaba el texto a su manera, y algunas palabras de las listas NUNCA podían coincidir: el turco "Hasılat" / "nakit akış"
//     (la ı sin punto no se convertía en i, así que 'hasilat' y 'nakit akis' no encontraban nada), el alemán "Umsatzerlöse" (la lista decía
//     'umsatzerloese' y la ö normalizada da 'o'), el coreano (NFD parte las sílabas de Hangul en letras sueltas y '손익계산서' dejaba de ser
//     igual a sí mismo), las palabras checas con acento dentro de la regex ('výnos', 'náklad': el texto se normaliza sin acentos y la regex los
//     tenía, así que esas entradas estaban muertas).
//   - Raíces cortas sueltas daban falsos positivos: 'venta' está adentro de "inventario"; 'ertrag' adentro de "Vertrag" (contrato);
//     'cost' adentro de "Costa Rica"; 'zisk' / 'zysk' adentro de cualquier palabra.
//
// CÓMO SE COMPARA UN TEXTO (UNA sola normalización para todo el proyecto: `normalizar()`, más abajo). Antes de comparar, TODO texto (la
// sección de una tabla, sus columnas, la etiqueta de una fila, una línea de título) pasa por `normalizar()`, y LOS TÉRMINOS DE ESTE ARCHIVO
// TAMBIÉN (al compilar las regex). Por eso los términos se escriben como se escriben en el idioma, con sus acentos ("výkaz zisku a ztráty",
// "Erträge", "Hasılat", "звіт про фінансові результати"): los dos lados quedan iguales. `normalizar()`:
//   1. minúsculas (con la regla de la sigma final griega: ς -> σ, para que "αποτελεσματος" y "αποτελεσματοσ" sean lo mismo);
//   2. descompone por COMPATIBILIDAD (NFKD) y saca los signos diacríticos combinantes: á->a, ü->u, č->c, ř->r, ё->е, й->и, ї->і, ş->s,
//      ğ->g, İ->i; NFKD además deshace las ligaduras de los PDF ("Deﬁcit" -> "deficit", Estudiantes LP 2022-23), los caracteres de ancho
//      completo del japonés ("Ｊ１" -> "j1"), "º" -> "o" y los superíndices;
//      también la vocalización del árabe y el hebreo (harakat, niqqud) y el tatweel árabe;
//   3. letras que NO se descomponen y que hay que llevar a mano: ß->ss, æ->ae, œ->oe, ø->o, ð->d, đ->d, ł->l, ı->i (turco), ħ->h, þ->th;
//      y las alef árabes con hamza/madda a alef simple (أ إ آ -> ا);
//   4. recompone (NFC): las sílabas de Hangul (coreano) y los kana con dakuten (japonés) vuelven a ser un solo carácter;
//   5. espacios (incluido el no separable) colapsados en uno, sin espacios al principio ni al final.
//   OJO: la ä alemana/sueca queda 'a' (NO 'ae'): "Erträge" -> "ertrage", "omsättning" -> "omsattning". Si un documento escribe "Ertraege"
//   (sin diéresis, como en un teclado sin ä), es OTRA forma y necesita su propia entrada (por eso hay pares 'ertrag'/'ertraeg').
//
// CÓMO SE ESCRIBE UN TÉRMINO (notación propia, compilada a regex por `fuente()`):
//   'palabra'          palabra o frase ENTERA: no puede tener letras ni dígitos pegados ni antes ni después ("kar" no encuentra "karakter").
//   'raiz*'            raíz: nada pegado ANTES, cualquier terminación DESPUÉS ("ingreso*" = ingreso, ingresos; "výnos*" = výnosy, výnosů).
//                      Es la forma normal para idiomas con flexión (checo, polaco, ruso, ucraniano, croata, turco, finés, griego...).
//   '*infijo*'         en cualquier lugar, también DENTRO de otra palabra: para idiomas que pegan palabras (alemán "Personalaufwand",
//                      noruego "Billettinntekter", neerlandés "Sponsoropbrengsten", danés "Sponsorindtægter", húngaro "árbevétel", finés
//                      "Pääsylipputuotot"). Solo con raíces largas o muy específicas: una raíz de 3-4 letras como infijo encuentra basura.
//   ' ' (espacio)      cualquier separador entre palabras (espacio, guion, barra, apóstrofo, coma...): "chiffre d affaires" encuentra
//                      "chiffre d'affaires"; "kar zarar" encuentra "Kâr/Zarar".
//   '-' (guion)        separador OPCIONAL: "sub-total" encuentra "subtotal", "sub total", "sub-total"; "gewinn- und verlust*" encuentra
//                      "Gewinn- und Verlustrechnung" y "Gewinn und Verlust".
//   '*' en el medio    cualquier cantidad de letras: "vykaz zisk* a ztrat*" = "výkaz zisku a ztráty" y "výkaz zisků a ztrát".
//   { re: '...' }      regex cruda (ya escrita en texto normalizado, con la bandera `u`), solo cuando la notación no alcanza: la
//                      exclusión de "Vertrag" en 'ertrag', o "concepto (del )?ingreso".
//   Chino, japonés, coreano, árabe y hebreo NO usan límites de palabra aunque el término no lleve '*': el chino y el japonés no tienen
//   espacios, el coreano pega partículas, y el árabe y el hebreo pegan prefijos al sustantivo (ال "el", و "y", ב "en", ה "el"). Se buscan
//   en cualquier lugar.
//
// CÓMO AGREGAR UN IDIOMA (o una palabra que faltó en un piloto):
//   1. Buscá el concepto en VOCABULARIO (abajo) y agregá la clave del idioma (código ISO de 2 letras; 'hr' cubre croata/bosnio/serbio en
//      alfabeto latino y 'sr' el serbio en cirílico) con sus términos. Escribilos tal como aparecen en el documento, con acentos.
//   2. Preferí la palabra o frase entera, o una raíz con '*' al final. Usá '*infijo*' solo para idiomas que componen palabras y con raíces
//      de 5+ letras. Probá una raíz corta contra palabras comunes del mismo idioma antes de agregarla (ya pasó: 'resultado' en prosa hacía
//      que cualquier nota contara como estado de resultados; 'zisk' dentro de otras palabras).
//   3. `node tools/vocabulario.mjs "texto de prueba"` dice qué conceptos encuentra en ese texto; `node tools/vocabulario.mjs --cobertura`
//      imprime la matriz concepto x idioma (qué idioma falta en qué concepto).
//   4. Medí antes y después sobre el inventario (así se hizo en la Versión 316, informe en Admin/tests/test-vocabulario.md): un término nuevo en
//      RELEVANTE o en INGRESOS/GASTOS puede volver "relevantes" tablas de notas y de balance y multiplicar los rubros (una regla probada en la
//      Versión 312 llevó Real Madrid de 32 a 253 rubros: eso es un error, no una mejora).
//
// QUIÉN LO USA: tools/pipeline.mjs (título de estado de resultados, flujo/patrimonio, lado de la tabla, totales), tools/extract-table-rows.mjs
// (relevancia de una tabla y de sus filas), tools/filas-rubro.mjs (lado por palabras, resultados, subtotales, columna de notas) y
// tools/proponer-carga.mjs (título de estado, totales de ingresos, resultado del ejercicio). tools/chequeos-gratis.mjs recibe `normalizar`
// a través de filas-rubro.mjs (su `norm`); sus ACTIVO_RE / PASIVO_RE todavía son propios (ver TOTAL_ACTIVO / TOTAL_PASIVO acá, listos para
// reemplazarlos).
// ============================================================================

// ---------------------------------------------------------------- normalización (la ÚNICA del pipeline)
const ARABE_HEBREO_MARCAS = /[֑-ׇؐ-ًؚ-ٰٟۖ-ۭـ]/g;
export function normalizar(t) {
  return String(t ?? '').toLowerCase().replace(/ς/g, 'σ')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(ARABE_HEBREO_MARCAS, '')
    .replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/ð/g, 'd').replace(/đ/g, 'd')
    .replace(/ł/g, 'l').replace(/ı/g, 'i').replace(/ħ/g, 'h').replace(/þ/g, 'th').replace(/[أإآٱ]/g, 'ا')
    .normalize('NFC')
    .replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------- FAMILIA DE UNA ETIQUETA (Versión 321, arreglo 1d del HANDOFF de entonces, hoy en Admin/Archive/)
// Pedido de Guido (2026-09-30): "una familia de palabras similares, como la del PSV con dos S o una". El precedente del club (escalón 0 de la
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
  t = t.replace(/^\s*(\(?[0-9]{1,2}(\.[0-9]{1,2})*[.)]|\(?[a-z][.)]|\(?[ivx]{1,5}[.)])\s+/, '');
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

// ---------------------------------------------------------------- EL VOCABULARIO, por concepto y por idioma
// Idiomas: es español, pt portugués, en inglés, de alemán, fr francés, it italiano, nl neerlandés, da danés, no noruego, sv sueco, fi finés,
// cs checo, sk eslovaco, pl polaco, hr croata/bosnio/serbio (latino), sr serbio (cirílico), sl esloveno, hu húngaro, ro rumano, bg búlgaro,
// el griego, tr turco, ru ruso, uk ucraniano, zh chino, ja japonés, ko coreano, ar árabe, he hebreo.
// Clave 'xx': términos de VARIOS idiomas agregados juntos por un mismo motivo (explicado en el comentario del concepto); no es un idioma.
export const IDIOMAS = ['es', 'pt', 'en', 'de', 'fr', 'it', 'nl', 'da', 'no', 'sv', 'fi', 'cs', 'sk', 'pl', 'hr', 'sr', 'sl', 'hu', 'ro', 'bg', 'el', 'tr', 'ru', 'uk', 'zh', 'ja', 'ko', 'ar', 'he'];

export const VOCABULARIO = {
  // ---- Título de un ESTADO DE RESULTADOS (o de recursos y gastos, o de ingresos y egresos). Se busca en la sección + columnas de una tabla
  // y en las líneas cortas (títulos) de la página. Incluye las formas gramaticales: nominativo/genitivo/plural ("výkaz zisku a ztráty" /
  // "zisků a ztrát"; "финансовые результаты" / "о финансовых результатах"; "фінансові результати" / "фінансових результатів").
  TITULO_RESULTADOS: {
    // "pérdidas y ganancias" suelto aparece en notas españolas ("imputación a pérdidas y ganancias", nota de impuestos de Atlético de Madrid):
    // esas formas no son un título.
    es: ['resultado*', 'cuenta de perdidas*', { re: '(?<!imputacion a )(?<!imputad[oa]s? a )(?<!imputad[oa]s? en )(?<!reconocid[oa]s? en )perdidas y ganancias' },
      'estado de ganancias y perdidas', 'recursos y gastos', 'recursos y erogaciones', 'estado de recursos',
      // NO "ingresos y gastos" suelto: en España el "Estado de ingresos y gastos reconocidos" es parte del estado de cambios en el patrimonio
      // neto, y "17. Ingresos y gastos" es una nota.
      'estado* de ingresos y egresos', 'cuadro* de ingresos y egresos', 'estado de actividades', 'estado de excedentes', { re: 'concepto (?:del )?(?:ingreso|gasto)' }],
    pt: ['demonstracao d* resultado*', 'rendimentos e gastos', 'rendimentos e perdas', 'gastos e perdas', 'demonstracao d* superavit*',
      'demonstracao d* deficit*', 'conta de resultados', 'demonstracao das receitas e despesas'],
    en: ['income statement*', 'statement* of income', 'profit and loss', 'profit or loss', 'comprehensive income', 'statement* of operations',
      'statement* of activities', 'income and expenditure', 'statement* of financial performance', 'revenue and expenditure', 'statement* of revenue*'],
    de: ['gewinn- und verlust*', 'guv', '*erfolgsrechnung*', '*ergebnisrechnung*', 'betriebsrechnung', 'aufwands- und ertragsrechnung'],
    fr: ['compte* de resultat*', 'compte* des resultats', 'compte de pertes et profits', 'etat du resultat*', 'compte d exploitation'],
    it: ['conto economico', 'rendiconto gestionale', 'rendiconto della gestione'],
    nl: ['winst- en verlies*', '*resultatenrekening*', 'staat van baten en lasten', 'exploitatierekening'],
    da: ['*resultatopgor*'],
    no: ['*resultatregnskap*'],
    sv: ['*resultatrakning*'],
    fi: ['tulos*'],
    cs: ['vykaz zisk*', 'zisk* a ztrat*', 'vysledovka'],
    sk: ['vykaz zisk* a strat*', 'vysledovka'],
    pl: ['rachunek zysk* i strat*', 'zysk* i strat*'],
    hr: ['racun dobit*', 'dobit* i gubit*', 'izvjestaj o dobit*', 'izvestaj o dobit*', 'bilans usp*ha', 'izvjestaj o sveobuhvatno* dobit*',
      'izvestaj o ostalom rezultatu'],
    sr: ['биланс успеха', 'извештај о осталом резултату'],
    sl: ['izkaz poslovnega izida', 'izkaz uspeha', 'izkaz vseobsegajocega donosa'],
    hu: ['eredmeny-kimutatas*'],
    ro: ['cont* de profit si pierdere', 'situatia rezultatului global'],
    bg: ['отчет за приходите и разходите', 'отчет за доходите', 'отчет за всеобхватния доход', 'отчет за печалбата или загубата'],
    el: ['αποτελεσμα*', 'συνολικ* εισοδημα*'],
    tr: ['gelir tablosu', 'kar veya zarar*', 'kar zarar*', 'kar ve zarar*', 'kapsamli gelir tablosu'],
    ru: ['финансов* результат*', 'прибыл* и убыт*', 'совокупн* доход*'],
    uk: ['фінансов* результат*', 'прибутк* та збитк*', 'звіт про сукупн* дохід*'],
    // CJK: el título seguido de una partícula es una mención en una oración ("손익계산서에 인식된 금액" = "importes reconocidos EN el estado de
    // resultados", nota de arrendamientos de FC Seoul), no el título del estado.
    zh: [{ re: '(?:利润表|损益表|損益表|综合收益表|收支表)(?!中)' }],
    ja: [{ re: '(?:損益計算書|収支計算書|正味財産増減計算書|活動計算書)(?![にのでへ])' }],
    ko: [{ re: '손익계산서(?![에의])' }],
    ar: ['قائمة الدخل', 'بيان الدخل', 'الارباح والخسائر', 'الارباح او الخسائر', 'قائمة الانشطة'],
    he: ['רווח והפסד', 'דוח על הפעילויות', 'דוחות על הפעילויות'],
  },

  // ---- Título que es SOLO la palabra del lado ("Recursos", "Gastos", "Revenues"): cuenta como estado de resultados solo si es el texto
  // ENTERO de la sección + columnas (una palabra suelta en una frase no dice nada).
  TITULO_SOLO: {
    es: ['recursos', 'gastos', 'ingresos', 'egresos'],
    pt: ['receitas', 'despesas'],
    en: ['revenue', 'revenues', 'expenses', 'income', 'expenditure'],
    de: ['ertrage', 'aufwendungen'],
    fr: ['produits', 'charges'],
    it: ['ricavi', 'costi'],
  },

  // ---- Palabras de INGRESOS / ventas / recursos. Dan el lado 'revenue' (de una tabla por su título y columnas, de una fila por su etiqueta)
  // y hacen "relevante" una tabla (extract-table-rows.mjs).
  INGRESOS: {
    // "venta(s)" / "vendas" / "ventes" / "πωλήσεις" NO cuentan dentro de "costo de ventas", "custo das vendas", "coût des ventes", "κόστος πωλήσεων"
    // (medido en la Versión 316: sin esta exclusión "COSTO DE VENTAS" de Universidad Católica quedaba sin lado y sus filas heredaban el lado
    // 'revenue' de la tabla).
    es: ['ingres*', 'recurso*', 'recaudac*'],
    pt: ['receita*', 'rendiment*', { re: '(?<!custos? das )(?<!custos? de )(?<![\\p{L}\\p{N}])venda' }, 'faturamento*', 'proveito*'],
    en: ['revenue*', 'income*'],
    de: ['*umsatz*', { re: '(?<!v)ertr(?:ag|aeg)' }, '*erlose*', '*erloes*', '*einnahme*'],
    fr: ['produit*', 'recette*', 'chiffre d affaires', { re: '(?<!couts? des )(?<![\\p{L}\\p{N}])ventes(?![\\p{L}\\p{N}])' }],
    it: ['ricav*', 'provent*', 'vendit*', 'valore della produzione'],
    nl: ['*opbrengst*', '*omzet*', '*baten', 'inkomsten'],
    da: ['*indtaegt*', '*indtagt*', '*omsaetning*'],
    no: ['*inntekt*', '*omsetning*'],
    sv: ['*intakt*', '*intaekt*', '*omsattning*'],
    fi: ['tulot', 'tuotot', '*liikevaihto*', '*myyntituotot*'],
    cs: ['vynos*', 'trzb*', 'prodej*', 'prijm*'],
    sk: ['vynos*', 'trzb*', 'prijm*'],
    pl: ['przychod*', 'sprzedaz*'],
    hr: ['prihod*'],
    sr: ['приход*'],
    sl: ['prihod*'],
    hu: ['*bevetel*'],
    ro: ['venit*', 'cifra de afaceri'],
    bg: ['приход*', 'продажб*'],
    el: ['εσοδ*', { re: '(?<!κοστοσ )(?<![\\p{L}\\p{N}])πωλησ' }, 'κυκλος εργασιων'],
    // "Satışların maliyeti" (costo de ventas): 'satis' seguido de 'maliyet' no es ingreso.
    tr: ['gelir*', 'hasilat*', { re: '(?<![\\p{L}\\p{N}])satis(?!\\p{L}*[^\\p{L}\\p{N}]+maliyet)' }],
    ru: ['доход*', 'выручк*'],
    uk: ['дохід*', 'доход*', 'виручк*'],
    zh: ['收入', '收益', '营业额'],
    ja: ['収益', '収入', '売上'],
    // NO '매출' solo ('매출채권' = cuentas por cobrar) ni '수입' solo (también "importación").
    ko: ['수익', '매출액', '영업수익'],
    ar: ['ايراد', 'مبيعات'],
    he: ['הכנסות', 'הכנסה', 'מכירות'],
  },

  // ---- Palabras de ingreso que dicen el lado de una FILA pero NO hacen relevante una tabla ni dan el lado de una tabla entera: aparecen en
  // títulos de notas de balance ("Subvenciones, donaciones y legados", "Investments in subsidiaries", "Related party transactions: sales"),
  // y medido en la Versión 316, sumarlas a la relevancia metía esas notas como rubros (Atlético de Madrid 70 -> 128, Mercedes F1 45 -> 77).
  INGRESOS_FILA: {
    es: ['subsidio*', 'subvenc*'], pt: ['subsidio*', 'subvenc*'], en: [{ re: '(?<!cost of )(?<![\\p{L}\\p{N}])sales(?![\\p{L}\\p{N}])' }, 'grant* receivable', 'subsidy', 'subsidies'],
    de: ['*zuschuss*', '*zuschuess*', '*zuschusse*'], fr: ['subvention*'], it: ['contribut* in conto esercizio'],
  },

  // ---- Palabras de ingreso que dicen el lado de una fila Y de una tabla, pero NO hacen relevante una tabla: 'turnover' aparece en la prosa
  // de las notas inglesas ("All turnover arose within the United Kingdom. 5. Operating loss ... stated after charging:") y volvía relevante la
  // tabla de gastos de abajo, con lado 'revenue' (Wolverhampton 2023-24). Hasta la Versión 313 tampoco estaba en la relevancia.
  INGRESOS_LADO: { en: ['turnover'] },

  // ---- Palabras de ingreso que hacen relevante una tabla y dicen el lado de una TABLA, pero NO el de una FILA suelta: "Cuotas entidades
  // deportivas" (cuotas que el club PAGA a la federación, gasto) y "Operacionales de venta" (gastos de ventas, Colombia) quedaban como
  // ingreso (medido en la Versión 316). Hasta la Versión 313 estaban en la relevancia y en el lado de la tabla, no en el de la fila.
  INGRESOS_TABLA: { es: [{ re: '(?<!cost[oe]s? de )(?<!cost[oe]s? de las )(?<![\\p{L}\\p{N}])venta' }, 'cuota*'] },

  // ---- Palabras de GASTOS / costos / egresos.
  GASTOS: {
    es: ['gasto*', 'egreso*', 'costo', 'costos', 'coste', 'costes', 'erogacion*', 'quebranto*'],
    pt: ['despesa*', 'custo', 'custos', 'gasto*', 'encargo*'],
    en: ['expens*', 'expenditure*', 'cost', 'costs', 'charges'],
    de: ['*aufwand*', '*aufwend*', '*kosten*', '*ausgabe*'],
    fr: ['charges', 'depense*', 'cout', 'couts'],
    it: ['costi', 'oneri', 'spese'],
    nl: ['*kosten*', '*lasten', 'uitgaven'],
    da: ['*omkostning*', '*udgift*'],
    no: ['*kostnad*', '*utgift*'],
    sv: ['*kostnad*', '*utgift*'],
    fi: ['*kulut', '*menot', 'kustannu*'],
    cs: ['naklad*', 'vydaj*'],
    sk: ['naklad*', 'vydavk*'],
    pl: ['koszt*', 'wydatk*'],
    hr: ['rashod*', 'trosk*', 'izdac*'],
    sr: ['расход*', 'трошк*'],
    sl: ['odhodk*', 'odhodek', 'strosk*'],
    hu: ['*raforditas*', '*koltseg*'],
    ro: ['cheltuiel*'],
    bg: ['разход*'],
    el: ['εξοδ*', 'δαπαν*', 'κοστ*'],
    tr: ['gider*', 'maliyet*', 'harcama*'],
    ru: ['расход*', 'затрат*', 'себестоимост*'],
    uk: ['витрат*', 'собівартіст*'],
    zh: ['费用', '費用', '支出', '成本'],
    ja: ['費用', '支出', '原価', '経費'],
    // NO '원가' solo: '상각후원가' = costo amortizado (notas de instrumentos financieros).
    ko: ['비용', '매출원가', '지출'],
    ar: ['مصروفات', 'مصاريف', 'تكاليف', 'تكلفة'],
    he: ['הוצאות', 'עלות', 'עלויות'],
  },

  // ---- IMPUESTOS: "Income tax", "Imposto sobre o rendimento", "Steuern vom Einkommen und vom Ertrag" tienen una palabra de ingreso adentro
  // (income/rendimento/Ertrag) pero son un GASTO (filas-rubro.mjs, ladoPorPalabras).
  IMPUESTOS: {
    es: ['impuesto*'], pt: ['imposto*', 'irpj', 'csll'], en: ['tax*'], de: ['*steuer*'], fr: ['impot*'], it: ['impost*'], nl: ['*belasting*'],
    da: ['skat', 'skatter', '*skat'], no: ['skatt', '*skatt'], sv: ['skatt', '*skatt', '*skatter'], fi: ['vero', 'verot', '*verot'],
    cs: ['dan', 'dane'], sk: ['dan', 'dane'], pl: ['podat*'], hr: ['porez*'], sr: ['порез*'], sl: ['davek', 'davk*'], hu: ['ado', '*adok'],
    ro: ['impozit*'], bg: ['данък*', 'данъц*'], el: ['φορο*', 'φορου*', 'φορων'], tr: ['vergi*'], ru: ['налог*'], uk: ['податок', 'податк*'],
    zh: ['所得税', '税金', '税费'], ja: ['法人税', '税金'], ko: ['법인세'], ar: ['ضريب'], he: ['מסים', 'מס הכנסה'],
  },

  // ---- RESULTADO al COMIENZO de una etiqueta de fila ("Resultado del ejercicio", "Ergebnis nach Steuern", "Výsledek hospodaření",
  // "Прибыль до налогообложения", "当期純利益"): la fila es un resultado/margen calculado, no un rubro (filas-rubro.mjs, RESULTADO_RE).
  // OJO: solo palabras que en ese idioma SON un resultado al principio de la etiqueta. "Pérdida por deterioro", "Verlies op vorderingen",
  // "Gewinne aus Transfers" son rubros: por eso "perdida", "winst", "gewinn" solos NO están acá, solo en frases.
  // El RESULTADO INTEGRAL ("Total comprehensive income", "Toplam Kapsamlı Gelir", "Сукупний дохід") también es un resultado: sin esto, un
  // renglón "Toplam Kapsamlı Gelir" (que ahora se reconoce como total por 'toplam') le daba lado 'revenue' a todo el estado de resultados de
  // arriba por la regla de posición (Trabzonspor 2021 y Fenerbahçe 2016, medido en la Versión 316).
  RESULTADO_INICIO: {
    xx: ['total comprehensive*', 'comprehensive income*', 'other comprehensive*', 'total resultado*', 'total do resultado*', 'toplam kapsamli*',
      'kapsamli gelir*', 'diger kapsamli*', 'gesamtergebnis*', 'совокупн* доход*', 'совокупн* финансов* результат*', 'сукупн* дохід*',
      'інш* сукупн* дохід*', 'συγκεντρωτικ* συνολικ*', 'totale utile*', 'totale conto economico complessivo', 'resultat global*', 'total du resultat global'],
    // "utilidad" y "excedente" solo en frases: "Utilidad en venta de activos" (5 palabras) es un rubro colombiano y se descartaría.
    es: ['resultado*', 'ganancia*', 'superavit*', 'deficit*', 'margen*', 'utilidad neta', 'utilidad bruta', 'utilidad operacional', 'utilidad operativa',
      'utilidad antes*', 'utilidad del ejercicio', 'utilidad del periodo', 'utilidad perdida*', 'excedente del ejercicio', 'excedente neto', 'excedente bruto',
      'excedente operacional', 'perdida neta', 'perdida del ejercicio',
      'perdida del periodo', 'perdida bruta', 'perdida operacional', 'perdida antes*'],
    pt: ['resultado*', 'lucro*', 'superavit*', 'deficit*', 'prejuizo do exercicio', 'prejuizo liquido'],
    en: ['ebit', 'ebitda', 'ebt', 'gross profit*', 'gross margin*', 'gross result*', 'operating profit*', 'operating result*', 'operating income*',
      'operating loss*', 'net profit*', 'net income*', 'net loss*', 'net result*', 'net finance*', 'net financial*', 'profit before*', 'profit after*',
      'profit for*', 'loss for*', 'loss before*', 'loss after*', 'result', 'surplus*', 'deficit*', 'margin*'],
    de: ['ergebnis*', 'rohergebnis*', 'betriebsergebnis*', 'finanzergebnis*', 'jahresergebnis*', 'jahresueberschuss*', 'jahresuberschuss*',
      'jahresfehlbetrag*', 'bilanzgewinn*', 'bilanzverlust*'],
    fr: ['resultat*', 'benefice*', 'perte nette', 'perte de l exercice', 'excedent*'],
    it: ['risultato*', 'utile*', 'perdita d esercizio', 'perdita dell esercizio', 'avanzo*', 'disavanzo*'],
    nl: ['resultaat*', 'bedrijfsresultaat*', 'nettowinst*', 'winst voor*', 'winst na*', 'verlies voor*', 'verlies na*'],
    da: ['resultat*', 'arets resultat*', 'aarets resultat*', 'overskud*', 'underskud*', 'ordinaert*'],
    no: ['resultat*', 'arsresultat*', 'aarsresultat*', 'driftsresultat*', 'ordinaert*', 'netto finans*', 'finansresultat*', 'overskudd*', 'underskudd*'],
    sv: ['resultat*', 'arets resultat*', 'rorelseresultat*'],
    fi: ['tulos*', 'tilikauden tulos*', 'tilikauden voitto*', 'tilikauden tappio*', 'liikevoitto*', 'liiketappio*'],
    cs: ['zisk*', 'ztrata*', 'vysledek*'],
    sk: ['zisk*', 'strata*', 'vysledok*'],
    pl: ['zysk*', 'strata*', 'wynik*'],
    hr: ['dobit*', 'gubitak*', 'neto dobit*', 'neto gubit*'],
    sr: ['добит*', 'губитак*', 'нето добит*'],
    sl: ['cisti dobicek*', 'cista izguba*', 'poslovni izid*', 'dobicek*'],
    hu: ['eredmeny*', 'adozott eredmeny*', 'adozas elotti eredmeny*', 'uzemi eredmeny*', 'merleg szerinti eredmeny*'],
    ro: ['profitul*', 'pierderea*', 'rezultatul*'],
    bg: ['печалба*', 'загуба*', 'финансов резултат*', 'нетна печалба*'],
    el: ['αποτελεσμα*', 'αποτελεσματα*', 'μικτο*', 'κερδη*', 'ζημι*', 'καθαρ*'],
    tr: ['kar', 'zarar*', 'net donem kar*', 'donem kar*', 'brut kar*', 'faaliyet kar*', 'esas faaliyet kar*'],
    ru: ['результат*', 'прибыл*', 'убыт*', 'чистая*', 'валовая*'],
    // NO 'чистий' solo: "Чистий дохід від реалізації продукції" es la línea de INGRESOS de los formularios ucranianos.
    uk: ['результат*', 'прибут*', 'збит*', 'чистий прибут*', 'чистий збит*', 'чистий фінансов* результат*', 'валовий прибут*', 'валовий збит*', 'фінансов* результат*'],
    zh: ['净利润', '利润总额', '营业利润', '毛利', '净亏损', '亏损'],
    ja: ['当期純利益', '当期純損失', '経常利益', '経常損失', '営業利益', '営業損失', '税引前', '売上総利益', '当期正味財産増減額'],
    ko: ['당기순이익', '당기순손실', '영업이익', '영업손실', '법인세비용차감전', '매출총이익'],
    ar: ['صافي الربح', 'صافي الخسارة', 'الربح', 'الخسارة', 'ربح', 'خسارة'],
    he: ['רווח', 'הפסד'],
  },

  // ---- GANANCIA / PÉRDIDA en CUALQUIER parte de la etiqueta ("Profit/(loss) before net finance charges", "Share of ... operating loss"):
  // un subtotal así no dice de qué lado son sus sumandos (filas-rubro.mjs, ladosPorEstructura) y no se "abre" en una nota (proponer-carga).
  GANANCIA_PERDIDA: {
    es: ['*resultado*', '*superavit*', '*deficit*', '*margen*', '*beneficio*', '*perdida*', 'utilidad*', 'excedente*'],
    pt: ['*lucro*', '*prejuizo*', '*resultado*'],
    en: ['*profit*', '*loss', 'ebit', 'ebitda', '*margin*', '*surplus*', 'comprehensive income'], xx: ['kapsamli gelir*', 'сукупн* дохід*', 'совокупн* доход*'],
    de: ['*ergebnis*', '*gewinn*', '*verlust*', '*ueberschuss*', '*uberschuss*', '*fehlbetrag*'],
    fr: ['*resultat*', 'benefice*', 'perte', 'perte nette', 'excedent*'],
    it: ['*risultato*', '*utile*', 'perdita', 'avanzo', 'disavanzo'],
    nl: ['*winst*', '*verlies*', 'resultaat*'],
    da: ['*resultat*', '*overskud*', '*underskud*'], no: ['*resultat*', '*overskudd*', '*underskudd*'], sv: ['*resultat*', '*vinst*', '*forlust*'],
    fi: ['*tulos', '*voitto', '*tappio'],
    cs: ['zisk*', 'ztrat*', 'vysled*'], sk: ['zisk*', 'strata', 'straty', 'vysled*'], pl: ['zysk*', 'strata', 'straty', 'wynik*'],
    hr: ['dobit*', 'gubit*'], sr: ['добит*', 'губит*'], sl: ['dobicek*', 'izguba', 'izid*'], hu: ['*eredmeny*'],
    ro: ['profit*', 'pierdere*', 'pierderea*'], bg: ['печалб*', 'загуб*'], el: ['κερδ*', 'ζημι*', 'αποτελεσμ*'],
    tr: ['kar', 'kari', 'zarar*'], ru: ['прибыл*', 'убыт*', 'результат*'], uk: ['прибут*', 'збит*', 'результат*'],
    zh: ['利润', '亏损'], ja: ['利益', '損失', '損益'], ko: ['이익', '손실'], ar: ['ربح', 'خسار'], he: ['רווח', 'הפסד'],
  },

  // ---- Palabras de resultado que hacen RELEVANTE una tabla aunque su título no diga "estado de resultados" (extract-table-rows.mjs, heredado
  // de RELEVANT_KEYWORDS: 'regnskap' = "cuentas" en noruego, 'ergebnis', 'результат', 'zisk'...).
  RESULTADO_RELEVANTE: {
    es: ['resultado*'], de: ['*ergebnis*'], no: ['*regnskap*'], nl: ['*winst*', '*verlies*'], cs: ['zisk*', 'ztrat*', 'vysled*'], pl: ['wynik*'],
    tr: ['zarar*'], ru: ['результат*', 'прибыл*', 'убыт*'], uk: ['результат*', 'прибут*', 'збит*'], en: ['*sponsor*'],
    zh: ['利润', '营业'], ja: ['損益', '営業'], ko: ['손익'],
  },

  // ---- TOTAL / subtotal al COMIENZO de la etiqueta ("Total ingresos", "Sum driftsinntekter", "Итого по разделу", "Toplam", "合計").
  TOTAL_INICIO: {
    es: ['total*', 'sub-total*', 'suma', 'sumas'], pt: ['total*', 'sub-total*', 'soma'], en: ['total*', 'sub-total*', 'sum'],
    de: ['gesamt*', 'summe*', 'insgesamt'], fr: ['total*', 'sous-total*'], it: ['total*', 'subtotal*'], nl: ['totaal*', 'subtotaal*'],
    da: ['i alt', 'sum'], no: ['sum', 'totalt'], sv: ['summa*', 'totalt'], fi: ['yhteensa'],
    cs: ['celkem', 'soucet'], sk: ['spolu', 'celkom', 'sucet'], pl: ['razem', 'ogolem', 'suma'], hr: ['ukupn*', 'svega'], sr: ['укупн*', 'свега'],
    sl: ['skupaj', 'skupno'], hu: ['osszes*'], ro: ['total*'], bg: ['общо', 'всичко'], el: ['συνολ*'], tr: ['toplam*'],
    ru: ['итог*', 'всего'], uk: ['разом', 'усього', 'всього', 'підсумок*'],
    zh: ['合计', '总计', '小计', '總計', '合計', '小計'], ja: ['合計', '小計', '総計'], ko: ['합계', '총계', '소계'],
    ar: ['المجموع', 'مجموع', 'اجمالي', 'الاجمالي'], he: ['סה"כ', 'סך הכל', 'סך'],
  },

  // ---- TOTAL al FINAL de la etiqueta: idiomas que ponen el "total" después ("Tržby celkem", "Indtægter i alt", "Liikevaihto yhteensä",
  // "Bevételek összesen", "Gelirler toplamı", "Receitas totais", "Ingresos totales", "Доходы всего").
  TOTAL_FIN: {
    es: ['totales'], pt: ['totais'], en: ['total'], de: ['insgesamt', 'gesamt'], da: ['i alt'], no: ['i alt', 'totalt'], sv: ['totalt', 'summa'],
    fi: ['yhteensa'], cs: ['celkem'], sk: ['spolu', 'celkom'], pl: ['razem', 'ogolem'], hr: ['ukupno', 'svega'], sr: ['укупно'], sl: ['skupaj'],
    hu: ['osszesen'], bg: ['общо'], tr: ['toplami'], ru: ['итого', 'всего'], uk: ['разом', 'усього', 'всього'],
    zh: ['合计', '总计', '合計'], ja: ['合計'], ko: ['합계', '총계', '소계'], ar: ['الاجمالي'],
  },

  // ---- TOTAL DE INGRESOS al comienzo de una etiqueta (proponer-carga.mjs: detecta la fila del total de ingresos del documento).
  TOTAL_INGRESOS: {
    es: ['total de ingresos', 'total ingresos', 'total de recursos', 'total recursos', 'ingresos totales', 'recursos totales', 'ingresos de actividades ordinarias'],
    pt: ['total de receitas', 'total receitas', 'receita* liquida*', 'receita* bruta*', 'receita* operaciona* liquida*', 'receita* operaciona* bruta*', 'receitas totais'],
    en: ['total revenue*', 'total income', 'total operating revenue*', 'total turnover', 'revenue*', 'turnover', 'net sales'],
    de: ['umsatzerlose', 'umsatzerloese', 'gesamtertrage', 'gesamtertraege', 'gesamtleistung', 'summe ertrage', 'summe der ertrage', 'betriebsertrag*'],
    fr: ['chiffre d affaires', 'total des produits', 'produits d exploitation', 'total produits'],
    it: ['ricavi totali', 'totale ricavi', 'totale proventi', 'valore della produzione', 'total ricavi', 'total proventi'],
    nl: ['netto-omzet', 'totaal opbrengsten', 'total opbrengsten', 'totaal baten', 'som der bedrijfsopbrengsten'],
    da: ['nettoomsaetning', 'omsaetning', 'indtaegter i alt'], no: ['sum inntekter', 'sum driftsinntekter'],
    sv: ['nettoomsattning', 'summa intakter', 'summa rorelsens intakter'], fi: ['liikevaihto', 'tuotot yhteensa'],
    // checo/eslovaco: "Tržby z prodeje..." / "Tržby za prodej zboží" son COMPONENTES en el formulario oficial, no el total.
    cs: ['vynosy celkem'], sk: ['vynosy spolu'], pl: ['przychody ogolem', 'przychody netto*', 'przychody razem'],
    hr: ['ukupni prihodi', 'prihodi ukupno', 'poslovni prihodi', 'ukupno prihodi'], sr: ['пословни приходи', 'укупни приходи'],
    sl: ['cisti prihodki od prodaje', 'prihodki skupaj', 'kosmati donos*'], hu: ['ertekesites netto arbevetele', 'osszes bevetel'],
    ro: ['cifra de afaceri*', 'venituri totale', 'total venituri'], bg: ['нетни приходи*', 'общо приходи', 'приходи общо'],
    el: ['κυκλος εργασιων', 'συνολο εσοδων'], tr: ['hasilat', 'satis gelirleri', 'toplam gelir*', 'net satislar'],
    ru: ['выручка*', 'доходы всего', 'итого доходов'], uk: ['чистий дохід*', 'виручка*', 'разом доход*'],
    zh: ['营业收入', '营业总收入', '收入合计', '营业额'], ja: ['売上高', '営業収益', '経常収益', '収益合計'], ko: ['매출액', '영업수익', '수익합계'],
    ar: ['اجمالي الايرادات', 'مجموع الايرادات', 'الايرادات'], he: ['סך הכנסות', 'סך ההכנסות', 'הכנסות'],
  },

  // ---- RESULTADO DEL EJERCICIO al comienzo de una etiqueta (proponer-carga.mjs: la fila del resultado final del documento).
  RESULTADO_EJERCICIO: {
    es: ['resultado del ejercicio', 'resultado neto', 'utilidad neta', 'utilidad del ejercicio', 'perdida neta', 'perdida del ejercicio', 'excedente del ejercicio', 'superavit*', 'deficit*'],
    pt: ['resultado do exercicio', 'resultado liquido do exercicio', 'resultado do periodo', 'resultado liquido do periodo', 'lucro liquido*', 'prejuizo do exercicio', 'prejuizo liquido*', 'superavit*', 'deficit*'],
    en: ['profit*', 'net profit*', 'net income*', 'net loss*', 'loss for the year', 'loss for the period', 'net result*'],
    de: ['jahresueberschuss*', 'jahresuberschuss*', 'jahresfehlbetrag*', 'jahresergebnis*'],
    fr: ['resultat*', 'benefice net', 'perte nette'], it: ['utile*', 'risultato netto', 'risultato d esercizio', 'risultato dell esercizio', 'perdita d esercizio', 'perdita dell esercizio'],
    nl: ['nettoresultaat', 'netto resultaat', 'resultaat na belasting*', 'nettowinst', 'totaalresultaat*', 'resultaat boekjaar', 'resultaat van het boekjaar'], da: ['arets resultat', 'aarets resultat', 'resultat*', 'arets overskud', 'arets underskud'],
    no: ['arsresultat*', 'aarsresultat*', 'resultat*'], sv: ['arets resultat*', 'resultat*'], fi: ['tilikauden tulos', 'tilikauden voitto', 'tilikauden tappio'],
    cs: ['vysledek hospodareni za ucetni obdobi', 'vysledek hospodareni po zdaneni'], sk: ['vysledok hospodarenia za uctovne obdobie', 'vysledok hospodarenia po zdaneni'],
    pl: ['zysk netto', 'strata netto', 'zysk (strata) netto'], hr: ['neto rezultat', 'dobit*', 'gubitak', 'dobit razdoblja', 'gubitak razdoblja', 'neto dobit*'],
    sr: ['нето добитак', 'нето губитак'], sl: ['cisti dobicek*', 'cista izguba*'], hu: ['adozott eredmeny', 'merleg szerinti eredmeny'],
    ro: ['profitul net', 'pierderea neta', 'rezultatul net*'], bg: ['нетна печалба', 'нетна загуба'], el: ['καθαρα κερδη', 'καθαρες ζημιες'],
    tr: ['net donem kar*', 'donem net kar*', 'net donem zarar*', 'donem net zarar*'], ru: ['чистая прибыль', 'чистый убыток'],
    uk: ['чистий прибуток', 'чистий збиток', 'чистий фінансовий результат'], zh: ['净利润', '净亏损'], ja: ['当期純利益', '当期純損失'],
    ko: ['당기순이익', '당기순손실'], ar: ['صافي الربح', 'صافي الخسارة'], he: ['רווח נקי', 'הפסד נקי'],
  },

  // ---- Estado de FLUJO DE EFECTIVO (no tiene rubros de ingresos/gastos para el sitio, pero sus filas dicen "resultado", "amortizaciones").
  FLUJO_EFECTIVO: {
    es: ['flujo* de efectivo', 'flujo* de fondos', 'flujo* de caja', 'origen y aplicacion de fondos'],
    pt: ['fluxo* de caixa'], en: ['cash-flow*'], de: ['*kapitalflussrechnung*', '*geldflussrechnung*', '*mittelflussrechnung*', 'cashflow*'],
    fr: ['flux de tresorerie', 'tableau des flux*'], it: ['flusso di cassa', 'flussi di cassa', 'rendiconto finanziario'], nl: ['kasstroom*'],
    da: ['*pengestrom*'], no: ['kontantstrom*'], sv: ['kassaflode*'], fi: ['rahoituslaskelma', 'kassavirta*'],
    cs: ['penezn* tok*', 'penezn* toc*'], sk: ['penazn* tok*', 'penazn* toc*'], pl: ['przeplyw* pienie*', 'rachunek przeplywow'],
    hr: ['novcan* tok*', 'novcan* tijek*'], sr: ['новчан* ток*'], sl: ['denarn* tok*'], hu: ['penzforgalm*'], ro: ['flux* de numerar', 'flux* de trezorerie'],
    bg: ['паричн* поток*'], el: ['ταμειακ* ρο*'], tr: ['nakit akis*', 'nakit akim*'], ru: ['движени* денежн*', 'денежн* поток*'],
    uk: ['рух грошов*', 'грошов* поток*'], zh: ['现金流量', '現金流量'], ja: ['キャッシュ・フロー', 'キャッシュフロー', '資金収支計算書'],
    ko: ['현금흐름'], ar: ['التدفقات النقدية', 'تدفقات نقدية'], he: ['תזרים מזומנים', 'תזרימי מזומנים', 'תזרים המזומנים'],
  },

  // ---- Estado de CAMBIOS EN EL PATRIMONIO (evolución del patrimonio neto).
  CAMBIOS_PATRIMONIO: {
    es: ['cambios en el patrimonio', 'evolucion del patrimonio', 'variacion* del patrimonio', 'variacion* en el patrimonio', 'cambios en el capital'],
    pt: ['mutacoes do patrimonio', 'mutacoes no patrimonio', 'mutacoes do patrimonio liquido', 'alteracoes no capital proprio', 'alteracoes nos capitais proprios'],
    en: ['changes in equity', 'changes in net assets', 'changes in shareholders* equity', 'changes in members* funds', 'movement* in reserves'],
    de: ['*eigenkapitalveranderung*', '*eigenkapitalveraenderung*', '*eigenkapitalspiegel*', 'entwicklung des eigenkapitals'],
    fr: ['variation* des capitaux propres'], it: ['variazioni del patrimonio', 'variazioni di patrimonio'],
    nl: ['verloop van het eigen vermogen', 'mutatieoverzicht eigen vermogen', 'mutaties in het eigen vermogen'],
    da: ['egenkapitalopgorelse*'], no: ['egenkapitaloppstilling*', 'endring* i egenkapital*'], sv: ['forandring* i eget kapital'],
    fi: ['oman paaoman muutok*', 'oman paaoman muutos*'], cs: ['zmen* vlastniho kapitalu', 'zmenach vlastniho kapitalu'],
    sk: ['zmen* vo vlastnom iman*', 'zmen* vlastneho imania'], pl: ['zmian* w kapitale wlasnym', 'zestawienie zmian w kapitale*'],
    hr: ['promjen* kapital*', 'promjen* u kapital*', 'promjen* glavnice', 'promen* na kapital*'], sr: ['промен* на капитал*'],
    sl: ['spremem* lastnisk* kapital*'], hu: ['sajat toke valtozas*'], ro: ['modificar* capitalur* propri*'], bg: ['промен* в собствения капитал'],
    el: ['μεταβολ* ιδιων κεφαλαιων'], tr: ['ozkaynak degisim*', 'ozkaynaklar degisim*'], ru: ['собственного капитала', 'изменени* капитала'],
    uk: ['власного капіталу'], zh: ['所有者权益变动', '股东权益变动', '權益變動'], ja: ['株主資本等変動', '純資産変動'], ko: ['자본변동'],
    ar: ['التغيرات في حقوق', 'التغير في حقوق'], he: ['שינויים בהון'],
  },

  // ---- Primeras filas de un cuadro de MOVIMIENTOS de saldos (saldo inicial -> altas/bajas -> saldo final): no es un estado de resultados.
  SALDO_INICIAL: {
    es: ['saldo inicial', 'saldo al inicio', 'saldos al inicio'], pt: ['saldo inicial', 'saldos iniciais'],
    en: ['opening balance*', 'balance at the beginning', 'balance at beginning', 'at beginning of'], de: ['anfangsbestand', 'stand am anfang'],
    fr: ['solde a l ouverture', 'solde d ouverture', 'solde au debut'], it: ['saldo iniziale'], nl: ['beginsaldo', 'stand begin'],
    cs: ['stav k pocatku', 'pocatecni stav', 'pocatecni zustatek'], sk: ['pociatocny stav', 'zostatok na zaciatku'], pl: ['bilans otwarcia', 'stan na poczatek'],
    hr: ['pocetno stanje', 'stanje na pocetku'], ro: ['sold initial', 'sold la inceputul'], tr: ['donem basi bakiye*', 'acilis bakiye*'],
    ru: ['остаток на начало', 'сальдо на начало'], uk: ['залишок на початок'], bg: ['начално салдо', 'салдо в началото'],
  },

  // ---- Títulos de BALANCE (situación patrimonial). No los usa ninguna tool todavía para excluir tablas (proponer-carga.mjs tiene su propia
  // NO_PL_RE, más amplia): quedan acá para la próxima.
  TITULO_BALANCE: {
    es: ['balance general', 'estado de situacion*', 'balance de situacion'], pt: ['balanco patrimonial', 'demonstracao da posicao financeira', 'balanco'],
    en: ['balance sheet*', 'statement* of financial position'], de: ['bilanz'], fr: ['bilan'], it: ['stato patrimoniale'], nl: ['balans'],
    no: ['balanse'], sv: ['balansrakning'], fi: ['tase'], cs: ['rozvaha'], sk: ['suvaha'], pl: ['bilans'], hr: ['bilanca*', 'bilans stanja'],
    sr: ['биланс стања'], sl: ['bilanca stanja'], hu: ['merleg'], ro: ['bilant*'], bg: ['счетоводен баланс'], el: ['ισολογισμ*'],
    tr: ['bilanco', 'finansal durum tablosu'], ru: ['бухгалтерский баланс', 'баланс'], uk: ['баланс', 'звіт про фінансовий стан'],
    zh: ['资产负债表', '資產負債表'], ja: ['貸借対照表'], ko: ['재무상태표', '대차대조표'], ar: ['الميزانية العمومية', 'قائمة المركز المالي'], he: ['מאזן'],
  },

  // ---- CAJA y DEUDA FINANCIERA del balance (Versión 352, tools/caja-deuda.mjs, escalón 1). Al comienzo de una etiqueta. Caja: lo que el sitio
  // guarda en fiscalYearMeta.cash. Deuda financiera: el criterio por defecto de grossDebt para un club sin precedente (club-data-mapping,
  // sección 14, ok de Guido 2026-10-01): préstamos y obligaciones bancarias/financieras, corriente + no corriente; NUNCA el total del pasivo.
  CAJA: {
    es: ['efectivo y equivalente*', 'caja y banco*', 'caja y equivalente*', 'disponibilidades', 'caja'], pt: ['caixa e equivalente*', 'disponibilidades', 'caixa e bancos'],
    en: ['cash and cash equivalent*', 'cash at bank*', 'cash and bank*', 'cash'], de: ['flussige mittel', 'kassenbestand*', 'guthaben bei kreditinstitut*', 'liquide mittel'],
    fr: ['tresorerie et equivalent*', 'disponibilites'], it: ['disponibilita liquide', 'cassa e disponibilita*'], nl: ['liquide middelen', 'geldmiddelen'],
    da: ['likvide beholdninger', 'likvide midler'], no: ['bankinnskudd*', 'kontanter og bankinnskudd'], sv: ['kassa och bank', 'likvida medel'],
  },
  DEUDA_FINANCIERA: {
    es: ['prestamo*', 'otros pasivos financieros', 'pasivos financieros', 'deudas bancarias*', 'deudas financieras', 'obligaciones financieras', 'obligaciones con bancos*', 'deudas con entidades de credito'],
    pt: ['emprestimo*', 'financiamento*', 'emprestimos e financiamentos', 'mutuo*'], // mutuo: Versión 422 (Novorizontino, préstamo de I-9 Sports)
    // (Versión 439) la lista `en` había quedado DENTRO del comentario de arriba desde la Versión 422: ningún balance en inglés encontraba su
    // deuda por diccionario. Más los términos del formato italiano en inglés (Juventus: "Due to banks" 2005-2006, "Loans and other
    // financial payables/liabilities" 2007 y 2011-2021, "Bonds and other financial liabilities" 2008-2010).
    en: ['borrowings', 'bank loans*', 'loans and borrowings', 'bank overdraft*', 'loans', 'due to banks', 'loans and other financial*', 'bonds and other financial liabilities'],
    de: ['verbindlichkeiten gegenuber kreditinstitut*', 'darlehen', 'finanzverbindlichkeiten'], fr: ['emprunts*', 'dettes financieres'],
    it: ['debiti verso banche', 'debiti finanziari'], nl: ['schulden aan kredietinstellingen', 'leningen'], da: ['gaeld til kreditinstitutter', 'bankgaeld'],
    no: ['gjeld til kredittinstitusjoner', 'banklan'], sv: ['skulder till kreditinstitut', 'banklan'],
  },

  // ---- TOTAL DEL ACTIVO y TOTAL DEL PASIVO (+ patrimonio) al comienzo de una etiqueta. Para chequeos-gratis.mjs (activo = pasivo + patrimonio);
  // hoy esa tool tiene sus propias ACTIVO_RE / PASIVO_RE (no se editó en la Versión 316): estas listas las amplían.
  TOTAL_ACTIVO: {
    es: ['total del activo', 'total de activo', 'total activo*', 'activo total'], pt: ['total do ativo', 'total ativo', 'ativo total'],
    en: ['total assets'], de: ['summe aktiva', 'aktiva gesamt', 'bilanzsumme', 'summe der aktiva'], fr: ['total de l actif', 'total actif', 'actif total'],
    it: ['totale attivo', 'totale dell attivo', 'attivo totale'], nl: ['totaal activa', 'totaal der activa', 'balanstotaal'],
    da: ['aktiver i alt', 'aktiver ialt'], no: ['sum eiendeler', 'eiendeler i alt'], sv: ['summa tillgangar'], fi: ['vastaavaa yhteensa'],
    cs: ['aktiva celkem'], sk: ['spolu majetok', 'aktiva spolu', 'majetok spolu'], pl: ['aktywa razem', 'suma aktywow'], hr: ['ukupna aktiva', 'ukupno aktiva', 'ukupna imovina'],
    sr: ['укупна актива', 'пословна имовина'], sl: ['sredstva skupaj'], hu: ['eszkozok osszesen', 'eszkozok (aktivak) osszesen'], ro: ['total active'],
    bg: ['сума на актива', 'общо активи'], el: ['συνολο ενεργητικου'], tr: ['toplam varlik*', 'varliklar toplami'],
    ru: ['итого актив*', 'баланс'], uk: ['баланс', 'усього активів'], zh: ['资产总计', '資產總計'], ja: ['資産合計', '資産の部合計'], ko: ['자산총계'],
    ar: ['مجموع الموجودات', 'اجمالي الاصول', 'مجموع الاصول'], he: ['סך הנכסים', 'סה"כ נכסים'],
  },
  TOTAL_PASIVO: {
    es: ['total del pasivo', 'total pasivo*', 'total de pasivo', 'total pasivo y patrimonio*', 'total pasivo mas patrimonio*', 'total patrimonio neto y pasivo'],
    pt: ['total do passivo', 'total passivo', 'total do passivo e patrim*', 'total passivo e patrim*'],
    en: ['total liabilities and*', 'total equity and liabilities'], de: ['summe passiva', 'passiva gesamt', 'summe der passiva'],
    fr: ['total du passif', 'total passif', 'passif total'], it: ['totale passivo', 'totale del passivo', 'totale passivo e patrimonio netto'],
    nl: ['totaal passiva', 'totaal der passiva'], da: ['passiver i alt', 'passiver ialt'], no: ['sum egenkapital og gjeld'], sv: ['summa eget kapital och skulder'],
    fi: ['vastattavaa yhteensa'], cs: ['pasiva celkem'], sk: ['spolu vlastne imanie a zavazky', 'pasiva spolu'], pl: ['pasywa razem', 'suma pasywow'],
    hr: ['ukupna pasiva', 'ukupno pasiva', 'ukupno kapital i obveze'], sr: ['укупна пасива'], sl: ['obveznosti do virov sredstev skupaj', 'viri sredstev skupaj'],
    hu: ['forrasok osszesen', 'forrasok (passzivak) osszesen'], ro: ['total capitaluri proprii si datorii'], bg: ['сума на пасива', 'общо собствен капитал и пасиви'],
    el: ['συνολο παθητικου', 'συνολο ιδιων κεφαλαιων και υποχρεωσεων'], tr: ['toplam kaynak*', 'kaynaklar toplami'],
    ru: ['итого пассив*', 'баланс'], uk: ['баланс', 'усього пасивів'], zh: ['负债和所有者权益总计', '负债和股东权益总计', '負債及權益總計'],
    ja: ['負債純資産合計', '負債及び純資産合計', '負債・純資産合計'], ko: ['부채와자본총계', '부채및자본총계'],
    ar: ['مجموع المطلوبات وحقوق', 'اجمالي الخصوم وحقوق'], he: ['סך ההתחייבויות וההון', 'סה"כ התחייבויות והון'],
  },

  // ---- Encabezado de la columna de NOTAS / anexo / código de fila: NO es la columna de importes (filas-rubro.mjs, columnaDeImportes).
  // NOTAS_ENTERO: el encabezado ENTERO es esto (abreviaturas cortas que como palabra suelta dirían otra cosa: "no", "ref", "код").
  NOTAS_ENTERO: {
    es: ['nota', 'notas', 'anexo', 'anexos', 'ref', 'ref.', 'nº', 'n°', 'no', 'no.', 'n.o'], pt: ['nota', 'notas', 'nota explicativa', 'ne'],
    en: ['note', 'notes', 'nr', 'nr.', 'ref', 'ref.', 'no', 'no.'], de: ['anhang', 'anm', 'anm.', 'tz', 'tz.', 'ziffer'], fr: ['note', 'notes', 'annexe'],
    it: ['nota', 'note', 'allegato'], nl: ['noot', 'toel', 'toel.', 'toelichting'], da: ['note', 'noter'], no: ['note', 'noter'], sv: ['not', 'noter'],
    fi: ['liite', 'liitetieto'], cs: ['pozn', 'pozn.', 'poznamka', 'c. r.', 'radek', 'cis. rad.', 'oznaceni'], sk: ['pozn', 'pozn.', 'poznamka', 'c. r.', 'riadok', 'oznacenie'],
    pl: ['nota', 'noty'], hr: ['biljeska', 'bilj', 'bilj.', 'napomena', 'aop', 'aop oznaka'], sr: ['напомена', 'аоп', 'ознака аоп'], sl: ['pojasnilo', 'pojasnila'],
    hu: ['megjegyzes', 'sorszam'], ro: ['nota', 'nr. rd.', 'nr. rand'], bg: ['бележка', 'бележки', 'пояснение'], el: ['σημειωση', 'σημειωσεις', 'σημ', 'σημ.'],
    tr: ['dipnot', 'dipnotlar', 'dipnot referanslari'], ru: ['примечание', 'прим', 'прим.', 'пояснения', 'код', 'код строки'],
    uk: ['примітка', 'прим', 'прим.', 'примітки', 'код', 'код рядка'], zh: ['附注', '注释', '行次'], ja: ['注記', '注記番号'], ko: ['주석'], ar: ['ايضاح', 'ايضاحات'],
    he: ['ביאור', 'באור'],
  },
  // NOTAS_EN: palabras que, en CUALQUIER lugar del encabezado, dicen que la columna es de notas (heredado: 'nota' y 'note' en cualquier lugar).
  NOTAS_EN: {
    es: ['nota*'], pt: ['nota*'], en: ['note*'], de: ['anhang*', 'anmerkung*'], fr: ['note*', 'annexe*'], it: ['nota', 'note', 'allegat*'], nl: ['noot', 'toelichting*'],
    da: ['note*'], no: ['note*'], sv: ['noter'], fi: ['liite*'], cs: ['poznamk*', 'cis* rad*', 'cislo radku'], sk: ['poznamk*', 'cislo riadku'], pl: ['nota', 'noty'],
    hr: ['biljesk*', 'napomen*', 'aop'], sr: ['напомен*', 'аоп'], sl: ['pojasnil*'], hu: ['megjegyzes*'], bg: ['бележк*', 'пояснени*'], el: ['σημειωσ*'],
    tr: ['dipnot*'], ru: ['примечани*', 'код строки'], uk: ['примітк*', 'код рядка'], zh: ['附注', '注释'], ja: ['注記'], ko: ['주석'], ar: ['ايضاح'], he: ['ביאור', 'באור'],
  },
};

// Todos los términos de un concepto (todos los idiomas, o solo algunos).
export function terminos(concepto, idiomas = null) {
  const c = VOCABULARIO[concepto]; if (!c) throw new Error(`vocabulario.mjs: concepto desconocido ${concepto}`);
  return Object.entries(c).filter(([k]) => !idiomas || idiomas.includes(k)).flatMap(([, v]) => v);
}

// ---------------------------------------------------------------- regex listas para las tools (sobre texto YA normalizado con normalizar())
const T = terminos;
// Estado de resultados por sección + columnas (pipeline.mjs isStatement, proponer-carga.mjs). El TITULO_SOLO va anclado al texto entero.
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
// ---- Resultado financiero e impuesto a las ganancias (Versión 321: se mudaron acá desde tools/cargar.mjs, porque ahora también los usa la
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

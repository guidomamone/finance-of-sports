// ============================================================================
// data/currency-map.js — CURRENCY_META: la tabla de traducción de moneda, mismo
// espíritu que data/category-map.js pero para monedas en vez de categorías de
// ingreso/gasto. Creada en la Versión 103 (a pedido de Guido: "full native
// currency toggle for every club", al onboardear clubes fuera de Argentina).
//
// EL MODELO, LEÉ ESTO ANTES DE TOCAR toDisplayValue/fmtAmount/el toggle:
//
// 1) El toggle de moneda de CUALQUIER club es SIEMPRE "moneda nativa del club" <->
//    USD, nunca entre dos monedas no-USD directamente (ej. nunca ARS<->BRL en
//    vivo). USD es el PIVOTE universal — así es como ya funciona "Comparar
//    Gestiones" (siempre en USD) y así escala a comparar clubes de países
//    distintos (Inicio, a futuro) sin necesitar una matriz de conversión NxN.
//    `toDisplayValue(value, meta, targetCurrency)` asume este invariante: si en
//    algún momento hace falta un 3er destino que no sea ni `meta.currency` ni
//    `'USD'`, es momento de repensar la función, no de parchear un 4to branch.
//
// 2) `fx` (en cada `<club>FiscalYearMeta[year]`) es SIEMPRE el tipo de cambio
//    QUE EL PROPIO DOCUMENTO declara para ESE ejercicio puntual (unidades de
//    moneda nativa por 1 USD) — nunca una cotización externa de mercado, nunca
//    reusado entre ejercicios o entre clubes. Un balance de River de 2024 y uno
//    de Racing de 2024 pueden (y en la práctica van a) declarar un `fx` USD
//    distinto entre sí, y un balance vs. un presupuesto del MISMO club en el
//    MISMO año calendario también pueden diferir (fecha de cierre vs. fecha de
//    presentación). "El USD de Boca 2025" y "el USD de River 2024" NO son la
//    misma cifra de conversión, son dos tipos de cambio de cierre distintos,
//    cada uno el que ESE documento imprimió. Ver
//    `.claude/skills/club-data-mapping/SKILL.md` sección 5 para el criterio de
//    qué tipo de cambio preferir dentro de un mismo documento (el que el propio
//    documento declara, antes que uno externo investigado a mano).
//
// 3) LÍMITE CONOCIDO, a propósito no resuelto todavía (documentado para no
//    tener que redescubrirlo la próxima vez que aparezca un caso real): un
//    presupuesto puede reportar ALGUNAS líneas ya en USD (ej. una cláusula de
//    transferencia atada a dólares) mientras el resto del documento está en
//    moneda local. El modelo de hoy solo soporta UNA moneda nativa por
//    EJERCICIO ENTERO (`fiscalYearMeta[year].currency`), no por línea. Si
//    aparece un club/documento real con este caso, la extensión más simple es
//    agregar un campo opcional a la línea individual (ej.
//    `nativeCurrencyOverride: {currency:'USD', fx: null}` en el objeto de
//    `revenueLines`/`expenseLines`) que `toDisplayValue` consulte ANTES del
//    `meta` del ejercicio — no inventar esto de antemano sin un caso real que
//    lo pida (ver CLAUDE.md, "no premature abstraction").
//
// 4) `scale`: algunas monedas tienen valores nominales tan grandes (por
//    historial inflacionario o denominación chica) que mostrar "millones" lee
//    mal — se muestran en "miles de millones" (`scale:1000`, divide
//    `amountNative` por 1000 antes de mostrar). Otras (USD, EUR, BRL, PEN...)
//    se muestran en millones directo (`scale:1`). `scale` es una propiedad de
//    LA MONEDA, no del club: agregala una vez acá, no por club.
//
// 5) Un club cuyo `reportingCurrency` (data/clubs.js) YA ES 'USD' (ej. Ecuador,
//    oficialmente dolarizado) no tiene nada que togglear: `populateCurrencyToggle()`
//    en index.html esconde el toggle entero para esos clubes, mismo criterio
//    que ya existía para el toggle USD/ARS antes de esta versión.
//
// Agregar una moneda nueva: una entrada acá (label = el código ISO que se
// muestra en el botón del toggle, scale, unitSuffix = el prefijo de unidad que
// arma fmtAmount/fmtAmountPlain, ej. "mil M"/"M"). Un código sin entrada acá
// cae al DEFAULT_CURRENCY_META de abajo (scale:1, "M <código>"), nunca rompe,
// pero conviene agregar la entrada real apenas se sepa el orden de magnitud
// típico de ese club (ver punto 4).
// ============================================================================

const CURRENCY_META = {
  ARS: { scale: 1000, unitSuffix: 'mil M' },  // Argentina
  CLP: { scale: 1000, unitSuffix: 'mil M' },  // Chile
  COP: { scale: 1000, unitSuffix: 'mil M' },  // Colombia
  USD: { scale: 1, unitSuffix: 'M' },          // pivote universal + Ecuador (dolarizado)
  BRL: { scale: 1, unitSuffix: 'M' },          // Brasil
  PEN: { scale: 1, unitSuffix: 'M' },          // Perú
  EUR: { scale: 1, unitSuffix: 'M' },          // España
  // México (Club América/Ollamani, Versión 104): el peso mexicano ronda ~$18-20 por USD (orden de
  // magnitud similar a BRL/PEN, NO a ARS/CLP/COP, que están en los miles por USD), así que "millones"
  // ya lee bien sin necesitar "miles de millones" — scale:1, mismo criterio que BRL/PEN/EUR arriba.
  MXN: { scale: 1, unitSuffix: 'M' },          // México
  // Japón (10 clubes J.League, sesión 2026-09-13): el documento fuente reporta en 百万円 (millones
  // de yenes) directo, y esos montos ya leen en un orden de magnitud razonable como "millones"
  // (ej. un club grande factura ~¥8.000-15.000 M) — scale:1, mismo criterio que BRL/PEN/EUR/MXN.
  JPY: { scale: 1, unitSuffix: 'M' },          // Japón
};

// Fallback para cualquier código ISO sin entrada propia todavía: nunca
// silenciosamente rompe ni muestra la unidad equivocada (antes de la Versión
// 103, `fmtAmount` mostraba "M USD" para CUALQUIER moneda que no fuera
// literalmente 'ARS', el bug real que motivó esta tabla).
const DEFAULT_CURRENCY_META = { scale: 1, unitSuffix: 'M' };

function currencyMetaFor(code){
  return CURRENCY_META[code] || DEFAULT_CURRENCY_META;
}

// FX_PLAUSIBLE_RANGE (Versión 112): rango [min, max] de unidades de moneda nativa por 1 USD que se
// consideran plausibles para esa moneda, usado SOLO para detectar un error de carga (`fx` invertido
// o tipeado con el orden de magnitud equivocado), nunca para validar precisión — el `fx` real de
// cada club siempre sale del propio documento o de la cotización de cierre correspondiente (ver
// punto 2 más arriba), este rango es deliberadamente ancho.
//
// Por qué existe: en la sesión de onboarding de España (Versión 111), 10 archivos de club
// guardaron `fx` como "USD por 1 EUR" (1,172) en vez de "EUR por 1 USD" (0,8532) — el sentido
// INVERSO al que espera `toDisplayValue()`. El error solo se encontró releyendo cada archivo a
// mano al mergear; con este chequeo, `checkFxSanity()` (index.html, corre junto a `verifyTieOuts()`
// al cargar el sitio) lo hubiera marcado de inmediato en la consola. Rangos generosos a propósito
// (cubren varios años de variación real de cada moneda, no una fecha puntual) — el objetivo es
// atrapar un `fx` con el sentido invertido o un typo de orden de magnitud, no exigir precisión.
const FX_PLAUSIBLE_RANGE = {
  ARS: [3, 3000],        // Argentina: alta inflación, rango histórico amplio a propósito (clubes
                          // cargados van de ~$4 en 2011 a ~$1900 en presupuestos 2026/27)
  CLP: [600, 1200],      // Chile
  COP: [2500, 5000],     // Colombia
  BRL: [3, 7],           // Brasil
  PEN: [3, 5],           // Perú
  EUR: [0.7, 1.15],      // España — OJO: EUR/USD (cuántos USD vale 1 EUR) ronda 1,0-1,2, así que el
                          // fx que va ACÁ (EUR por 1 USD) es el INVERSO, ~0,85-1,0. Si aparece un
                          // valor >1,15 acá, casi seguro está invertido (ver el bug de España arriba).
  MXN: [15, 25],         // México
  JPY: [100, 180],       // Japón
};

// checkFxSanity(): recorre todo lo que haya en window.CLUB_GENERIC_DATA y avisa por consola
// (console.warn, no error — puede haber un caso real fuera de rango, esto es una señal para
// revisar, no una verificación dura como verifyTieOuts()) si algún fx cae fuera del rango
// plausible de su moneda. Una moneda sin entrada en FX_PLAUSIBLE_RANGE no se chequea (no rompe,
// simplemente no hay nada contra qué comparar todavía) — agregar el rango real la primera vez que
// se onboardea un club en esa moneda, mismo criterio que CURRENCY_META.
function checkFxSanity(){
  const data = (typeof window !== 'undefined' && window.CLUB_GENERIC_DATA) || {};
  Object.keys(data).forEach(clubId => {
    const meta = data[clubId].fiscalYearMeta;
    if(!meta) return;
    Object.keys(meta).forEach(year => {
      const y = meta[year];
      if(!y || y.currency === 'USD' || y.fx == null) return;
      const range = FX_PLAUSIBLE_RANGE[y.currency];
      if(!range) return;
      const [min, max] = range;
      if(y.fx < min || y.fx > max){
        console.warn(`[fx sanity] ${clubId} ${year}: fx:${y.fx} para ${y.currency} está fuera del rango plausible [${min}, ${max}] (moneda nativa por 1 USD) — revisar si está invertido o con el orden de magnitud equivocado.`);
      }
    });
  });
}

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
  // Inglaterra (5 clubes Premier League + Alemania Bundesliga, sesión 2026-09-22): la libra ronda
  // ~1-1,5 USD, mismo orden de magnitud que EUR — scale:1.
  GBP: { scale: 1, unitSuffix: 'M' },          // Inglaterra
};

// Fallback para cualquier código ISO sin entrada propia todavía: nunca
// silenciosamente rompe ni muestra la unidad equivocada (antes de la Versión
// 103, `fmtAmount` mostraba "M USD" para CUALQUIER moneda que no fuera
// literalmente 'ARS', el bug real que motivó esta tabla).
const DEFAULT_CURRENCY_META = { scale: 1, unitSuffix: 'M' };

function currencyMetaFor(code){
  return CURRENCY_META[code] || DEFAULT_CURRENCY_META;
}

// ============================================================================
// PROCEDENCIA DEL TIPO DE CAMBIO (Versión 125)
//
// EL PROBLEMA QUE RESUELVE: hasta acá, `fx` era un número suelto y de dónde
// salía se contaba en prosa, en el comentario de cada año o en el header del
// archivo, con una decena de redacciones distintas para la misma idea ("el
// documento no declara tipo de cambio propio", "PTAX de cierre", "cotización de
// cierre BCE investigada vía web", "la tasa dominante que declara el propio
// balance"). Auditar los 41 clubes era abrir 44 archivos y leer comentarios, y
// 18 de los 89 valores no decían nada. Nada de eso se podía filtrar, contar ni
// chequear. Ahora cada `fx` declara su procedencia en un campo, y
// `node tools/audit.js` la lee.
//
// LAS 6 PROCEDENCIAS, y por qué son 6 y no 2 (pedido explícito de Guido: "para
// Presupuesto, los clubes toman assumption de FX siempre"). Las 4 primeras son
// las 4 reglas de `.claude/skills/club-data-mapping/SKILL.md` sección 5, en su
// mismo orden de preferencia:
const FX_SOURCE = {
  // Regla 0: el balance declara su propio tipo de cambio de cierre (Anexo de
  // "Activos y pasivos en moneda extranjera"). Es el más fiel y el que gana
  // siempre que exista.
  document_close: {
    label: 'Declarado por el balance',
    detail: 'Tipo de cambio de cierre que el propio balance declara en su Anexo de moneda extranjera',
  },
  // Regla 3: un presupuesto NO tiene cierre todavía, declara un supuesto sobre
  // el futuro ("Estimamos un TC de $X en promedio para el período"). Es una
  // categoría propia y no un `document_close` más porque un supuesto puede
  // terminar equivocado: comparar un presupuesto en USD contra un balance en
  // USD mezcla un pronóstico con un cierre realizado.
  document_assumption: {
    label: 'Premisa del presupuesto',
    detail: 'Tipo de cambio que el propio presupuesto declara como supuesto para un ejercicio que todavía no cerró',
  },
  // Versión 140, a pedido de Guido: "puede ser porque tuvieron acceso a distinto FX,
  // o porque al momento de cancelar o recibir tal plata, el fx era distinto. Para
  // Argentina es normal que el fx sea difícil".
  //
  // Este es el caso que faltaba, y no es una variante de `document_close`: un balance
  // convierte su ESTADO DE RESULTADOS (un flujo, plata que entró y salió a lo largo de
  // 12 meses) a un tipo de cambio PROMEDIO del período, y su BALANCE (un stock al
  // cierre) al de cierre. Es contabilidad estándar y en Argentina la diferencia entre
  // los dos es enorme. Sin esta categoría, un club que declare su promedio quedaría
  // etiquetado `document_close`, que sería falso: diría "este es el tipo de cambio del
  // día del cierre" sobre un número que es el promedio de un año.
  //
  // OJO AL CARGAR UNO: si el documento declara los DOS (promedio para resultados,
  // cierre para el balance), el `fx` del ejercicio es el que corresponde a lo que el
  // sitio muestra. Hoy `revenueLines`/`expenseLines` son el estado de resultados, así
  // que va el PROMEDIO; `grossDebt`/`cash` son del balance y quedarían convertidos con
  // el promedio, que es incorrecto. Ese caso todavía no existe en el sitio: el día que
  // aparezca, hay que separar el fx por tipo de dato, no elegir uno para todo.
  document_average: {
    label: 'Promedio del período, declarado por el balance',
    detail: 'Tipo de cambio promedio del ejercicio que el propio documento declara para convertir su estado de resultados, distinto del de cierre que usa para el balance',
  },
  // Reglas 1 y 2: el documento no declara ninguno, se usó la cotización oficial
  // de la fecha de cierre. Estas son las que se repetían club por club y ahora
  // viven una sola vez en FX_CLOSE, abajo.
  market_close: {
    label: 'Cotización oficial de cierre',
    detail: 'El documento no declara ninguno: se usó la cotización oficial de la fecha de cierre (BCRA, BNA, PTAX, BCE, TRM)',
  },
  // "Cuándo la cotización exacta no aparece" del mismo skill: para fechas
  // viejas, interpolada o de fecha cercana. Se distingue a propósito de
  // `market_close` porque el skill exige poder separar "esto es exacto" de
  // "esto es una estimación razonable".
  market_approx: {
    label: 'Cotización aproximada',
    detail: 'No se consiguió la cotización exacta del día: se interpoló o se usó una de fecha cercana',
  },
  // No sale de ninguna fuente. Existe para que el toggle de moneda funcione.
  placeholder: {
    label: 'Valor de referencia',
    detail: 'No sale de ninguna fuente: existe solo para que el toggle de moneda funcione',
  },
  // Cargado antes de que existiera este campo, sin rastro de su procedencia.
  // NO es un estado aceptable a largo plazo: `tools/audit.js` lo lista como
  // pendiente hasta que alguien lo verifique contra el documento.
  unknown: {
    label: 'Sin determinar',
    detail: 'Todavía no se verificó de dónde salió; queda listado como pendiente en node tools/audit.js',
  },
};

// FX_CLOSE: las cotizaciones de mercado, UNA SOLA VEZ, por moneda y fecha de
// cierre. Antes de esta tabla el cierre del real al 31/12/2024 (R$6,1923) estaba
// escrito a mano en 5 archivos, el euro al 30/6/2025 en 9 y el ¥150 de la
// J.League en 10: 33 copias de 9 valores, y nada avisaba si una quedaba
// distinta. Las copias crecen con la cantidad de clubes; la verdad crece con
// (moneda × fecha de cierre), que está acotada.
//
// LA REGLA, que es lo que hace que esta tabla no contradiga la regla #0 del
// skill ("nunca reuses el fx de un club para otro"):
//   - `fx:` literal en el archivo del club = lo declara ESE documento. Dos
//     clubes pueden declarar valores distintos para el mismo día y los dos
//     están bien. NUNCA se mueve a esta tabla.
//   - `fxRef:'MONEDA@AAAA-MM-DD'` = el documento no declaraba nada y se usó la
//     cotización pública de esa fecha. Eso no es un dato del club, es un dato
//     del mercado: se dice una vez acá y lo referencian todos los que lo usen.
// Solo entran cotizaciones EXACTAS y verificadas: una `market_approx` se queda
// como literal en el archivo del club, para que nadie la reuse creyendo que es
// un cierre oficial.
const FX_CLOSE = {
  'ARS@2014-06-30': { fx: 8.15,    source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2014' },
  // Las 5 de abajo vivían escritas a mano en data/argentinosjuniors-data.js (to-do 21(b),
  // movidas el 2026-09-20). Son la MISMA serie que la de 2014 de arriba — dólar vendedor BNA de
  // cierre, investigada en datos.gob.ar/series — así que su lugar es acá y no adentro de un club.
  // ANTES DE MOVERLAS SE CONFIRMÓ QUE DE VERDAD SON DE MERCADO, que es lo que el to-do pedía: los
  // 3 balances auditados de Argentinos no declaran ningún tipo de cambio propio (no tienen Anexo
  // de moneda extranjera, solo notas con partidas en U$S/EUR ya convertidas a pesos, sin la
  // columna de cambio vigente). No es el caso de Unión, que estaba mal rotulado y sí salía de su
  // Anexo V (Versión 140).
  // OJO, NO CONTRADICEN a los `document_close` de San Lorenzo y Vélez para esas mismas fechas
  // (8,988 en 2015 y 14,94 en 2016): esos son el COMPRADOR que declara cada documento y estos son
  // el VENDEDOR del mercado. Son los dos lados del spread, no dos versiones del mismo número.
  'ARS@2015-06-30': { fx: 9.085,   source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2015' },
  'ARS@2016-06-30': { fx: 15.2,    source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2016' },
  'ARS@2017-06-30': { fx: 16.8,    source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2017' },
  'ARS@2018-06-30': { fx: 28.85,   source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2018' },
  'ARS@2019-06-30': { fx: 42.45,   source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2019' },
  // Sesión 2026-09-23 (onboarding de Banfield): ninguno de los 2 balances de Talleres ni el de
  // Banfield declara un TC de cierre propio confiable (ver comentario de cabecera de cada
  // data/<club>-data.js), así que las 3 entradas de abajo son cierres de mercado, dólar mayorista
  // BCRA (serie de Rava Bursátil, misma fuente que ya usan las entradas de 2024/2025 de arriba).
  'ARS@2020-06-30': { fx: 70.46,   source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2020' },
  'ARS@2024-06-30': { fx: 909,     source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2024' },
  'ARS@2025-06-30': { fx: 1203,    source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2025' },
  // Última rueda de cada año: el mercado mayorista no operó el 31/12 en ninguno de los 2 años
  // (30/12/2024 y 29/12/2025 fueron las últimas ruedas efectivas, confirmado contra Rava).
  'ARS@2024-12-31': { fx: 1032,    source: 'market_close', label: 'Dólar mayorista BCRA, última rueda de 2024 (30/12/2024)' },
  'ARS@2025-12-31': { fx: 1457,    source: 'market_close', label: 'Dólar mayorista BCRA, última rueda de 2025 (29/12/2025)' },
  // Sesión 2026-09-23 (onboarding de Gimnasia y Esgrima LP): el presupuesto 2025-26 (año standalone,
  // sin balance real todavía) no declara TC propio y no tiene un balance pareado del que tomarlo.
  'ARS@2026-06-30': { fx: 1482,    source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2026' },
  'BRL@2024-12-31': { fx: 6.1923,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2024' },
  'BRL@2025-12-31': { fx: 5.5024,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil, boletín del 30/12/2025' },
  'COP@2025-12-31': { fx: 3757.08, source: 'market_close', label: 'TRM oficial (Superintendencia Financiera de Colombia) al 31/12/2025' },
  'EUR@2024-06-30': { fx: 0.9337,  source: 'market_close', label: 'Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD)' },
  'EUR@2025-06-30': { fx: 0.8532,  source: 'market_close', label: 'Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD)' },
  // Placeholder, no cotización: la J.League no declara ninguna en su Club
  // Licensing Report y los 10 clubes de Japón salen de ese mismo documento.
  'JPY@2025-12-31': { fx: 150,     source: 'placeholder',  label: 'Referencia redonda de ¥150 por USD; el documento de la J.League no declara ninguna' },
  // Sesión 2026-09-22 (onboarding de Getafe/Girona/Espanyol, Köln/Eintracht Frankfurt/Werder
  // Bremen/Augsburg/Stuttgart, Arsenal/Liverpool/Man City/Everton/Tottenham). Ninguno de estos
  // documentos declara su propio tipo de cambio a USD, así que las 8 entradas de abajo son cierres
  // BCE, calculados como EUR/USD publicado por el BCE (para EUR, directo) o cruzando GBP/EUR ×
  // EUR/USD del mismo boletín BCE (para GBP, que el BCE no publica contra USD directo).
  'EUR@2020-06-30': { fx: 0.8930, source: 'market_close', label: 'Cierre BCE al 30/6/2020 (1 EUR = 1,1198 USD)' },
  'EUR@2022-06-30': { fx: 0.9627, source: 'market_close', label: 'Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD)' },
  'EUR@2023-06-30': { fx: 0.9203, source: 'market_close', label: 'Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD)' },
  // El 31/12/2023 es domingo, sin cotización BCE: se usa el boletín del viernes anterior, mismo
  // criterio que ya usa 'BRL@2025-12-31' de arriba (boletín del 30/12 para un 31 sin cotización).
  'EUR@2023-12-31': { fx: 0.9050, source: 'market_close', label: 'Cierre BCE del viernes 29/12/2023 (el 31 es domingo, sin cotización) (1 EUR = 1,1050 USD)' },
  'EUR@2024-12-31': { fx: 0.9626, source: 'market_close', label: 'Cierre BCE al 31/12/2024 (1 EUR = 1,0389 USD)' },
  'GBP@2024-05-31': { fx: 0.7866, source: 'market_close', label: 'Cierre BCE al 31/5/2024, cruzando GBP/EUR (0,85365) × EUR/USD (1,0852) (1 GBP ≈ 1,2712 USD)' },
  // El 31/5/2025 es sábado, sin cotización BCE: se usa el boletín del viernes anterior.
  'GBP@2025-05-31': { fx: 0.7419, source: 'market_close', label: 'Cierre BCE del viernes 30/5/2025 (el 31 es sábado, sin cotización), cruzando GBP/EUR (0,84120) × EUR/USD (1,1339) (1 GBP ≈ 1,3480 USD)' },
  // El 30/6/2024 es domingo, sin cotización BCE: se usa el boletín del viernes anterior.
  'GBP@2024-06-30': { fx: 0.7906, source: 'market_close', label: 'Cierre BCE del viernes 28/6/2024 (el 30 es domingo, sin cotización), cruzando GBP/EUR (0,84638) × EUR/USD (1,0705) (1 GBP ≈ 1,2648 USD)' },
  'GBP@2025-06-30': { fx: 0.7299, source: 'market_close', label: 'Cierre BCE al 30/6/2025, cruzando GBP/EUR (0,85550) × EUR/USD (1,1720) (1 GBP ≈ 1,3700 USD)' },
};

// fxMetaFor(meta): resuelve el tipo de cambio de un ejercicio (o de un overlay
// de presupuesto) a {fx, source, label, ref}, mirando `fxRef` en FX_CLOSE
// cuando corresponde. ES EL ÚNICO LUGAR que resuelve `fxRef`: todo lo que
// necesite un fx (yearMetaFor, presupuestoOverlayMetaFor, checkFxSanity,
// tools/audit.js) pasa por acá en vez de leer `meta.fx` directo, si no un
// ejercicio con `fxRef` parece un ejercicio sin tipo de cambio.
// `fx:null` (los placeholders históricos de Boca/River) sigue devolviendo null:
// el fallback al FX_RATE global es responsabilidad de yearMetaFor, como siempre.
function fxMetaFor(meta){
  const m = meta || {};
  if(m.fxRef){
    const entry = FX_CLOSE[m.fxRef];
    if(!entry){
      console.warn(`[fx] fxRef desconocido: '${m.fxRef}', no está en FX_CLOSE (data/currency-map.js). El ejercicio queda sin tipo de cambio.`);
      return { fx: null, source: 'unknown', label: `Referencia inexistente: ${m.fxRef}`, ref: m.fxRef };
    }
    return { fx: entry.fx, source: entry.source, label: entry.label, ref: m.fxRef };
  }
  const source = m.fxSource || (m.fx == null ? 'placeholder' : 'unknown');
  return { fx: (m.fx != null ? m.fx : null), source, label: (FX_SOURCE[source] || {}).label || source, ref: null };
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
  GBP: [0.6, 0.95],      // Inglaterra — GBP por 1 USD; la libra rondó 1,05-1,45 USD en las últimas
                          // dos décadas, así que el inverso (lo que va acá) ronda 0,69-0,95.
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
      if(!y || y.currency === 'USD') return;
      // Versión 125: por fxMetaFor y no por `y.fx` directo, un ejercicio con
      // `fxRef` tiene el número en FX_CLOSE, no en su propio archivo, y leerlo
      // crudo lo haría pasar por "sin fx" y saltearse este chequeo.
      const fx = fxMetaFor(y).fx;
      if(fx == null) return;
      const range = FX_PLAUSIBLE_RANGE[y.currency];
      if(!range) return;
      const [min, max] = range;
      if(fx < min || fx > max){
        console.warn(`[fx sanity] ${clubId} ${year}: fx:${fx} para ${y.currency} está fuera del rango plausible [${min}, ${max}] (moneda nativa por 1 USD), revisar si está invertido o con el orden de magnitud equivocado.`);
      }
    });
  });
}

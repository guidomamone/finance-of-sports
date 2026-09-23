// ============================================================================
// data/arsenal-gb-data.js — Arsenal Holdings Limited (clubId 'arsenal-gb'), Ejercicios 2023/24 y
// 2024/25 (1° de junio a 31 de mayo — confirmado en la carátula de los dos documentos y en la nota
// 1(b) "Basis of preparation of Group financial statements": "made up to 31 May 2024/2025").
//
// ENTIDAD LEGAL: "Arsenal Holdings Limited" — confirmado LITERAL en la carátula de los dos PDF
// ("ARSENAL HOLDINGS LIMITED"), no "plc" como decía el pedido original. Company Registration No.
// 4250459 (Companies House, UK). Es la HOLDING/matriz del grupo; la sociedad operativa del club en
// sí es "The Arsenal Football Club Limited" (n° 00109244, cuentas individuales separadas, no
// cargadas acá) — ya estaba anotado así en fuentes/Inglaterra/Arsenal.md antes de esta sesión.
// Cuentas CONSOLIDADAS del grupo ("Group turnover"/"Consolidated Profit and Loss Account"), no
// individuales.
//
// Fuente: transcripciones completas en Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-
// 2023-24.md y -2024-25.md (ya transcriptas antes de esta sesión, no se volvió a tocar el PDF).
//
// Cifras en GBP MILLONES nativos (el documento reporta en £'000, dividido por 1.000 al cargar).
// GBP es moneda NUEVA en el sitio (no existe todavía en data/currency-map.js/FX_CLOSE) — no se tocó
// ese archivo en esta sesión, a propósito (fuera de alcance). Los dos ejercicios usan `fxRef`
// ('GBP@2024-05-31'/'GBP@2025-05-31') en vez de un `fx` literal: ninguno de los dos documentos
// declara un tipo de cambio propio a USD en su nota de moneda extranjera (Nota 17/18, "Foreign
// currency management" — solo cuantifica exposición en EUR/USD/AUD de partidas puntuales, no un TC
// de cierre GBP/USD para todo el balance), así que no aplica la regla #0 de club-data-mapping
// sección 5 (TC declarado por el documento) y corresponde `market_close`/`fxRef` en vez de un `fx`
// literal con `fxSource:'document_close'`. El sitio va a tirar un console.warn hasta que se agregue
// la entrada GBP@... a FX_CLOSE — esperado, no es trabajo de esta sesión.
//
// ----------------------------------------------------------------------------------------------
// CATEGORIZACIÓN DE INGRESOS (Note 3 "Group turnover", 5 líneas en los dos ejercicios):
//   - "Gate and other match day revenues" -> matchday_competition.
//   - "Broadcasting" -> broadcasting.
//   - "Commercial" -> sponsorship_commercial.
//   - "Property development"/"Property" (segmento chico de desarrollo inmobiliario, ajeno al
//     fútbol) -> other_income (catch-all: no hay categoría de "negocio inmobiliario" en la
//     taxonomía y es un monto chico, <0,5% del total).
//   - "Player trading" (dentro de Turnover: son fees de PRÉSTAMOS de jugadores recibidos, NO la
//     ganancia por venta — ver el propio párrafo debajo de la Cuenta de P&L: "Player trading
//     consists primarily of loan fees receivable...") -> player_sales, siguiendo el mapeo pedido
//     ("Profit on disposal of players' registrations / player trading -> player_sales").
//   - "Profit on disposal of player registrations": línea NETA separada, fuera del cuerpo de
//     Turnover/Operating expenses (aparece después de "Operating profit/(loss)" en la Cuenta de
//     P&L) -> UNA revenueLine con player_sales, siguiendo club-data-mapping sección 3 (el
//     documento la presenta como línea neta separada, se refleja igual). meta.profitOnPlayerSales
//     queda en 0 para NO duplicarla (ver comentario del template de la tarea).
//   - "Share of joint venture operating loss" (participación en el resultado de Arsenal Broadband
//     Limited, método de la participación — Nota 11): es una línea REAL del P&L, entre "Operating
//     profit/(loss)" y "Profit on disposal of player registrations", que NINGÚN campo de
//     fiscalYearMeta contempla (no es netInterest, tax, profitOnPlayerSales ni assetSales). Se
//     cargó como revenueLine (other_income, negativa) para que la fórmula de PAT reconcilie EXACTO
//     contra el "Loss for the financial year" impreso — sin esta línea, el PAT calculado quedaba
//     £1,934 M / £1,690 M por encima del real en 2024/2025. Es la única categorización de esta
//     sesión que no sale directo de la tabla del pedido; documentado para revisar si en el futuro
//     se agrega un campo meta dedicado a "resultado de sociedades vinculadas".
//
// CATEGORIZACIÓN DE GASTOS (Note 4 "Operating expenses"):
//   - "Amortisation of player registrations" -> player_amortisation.
//   - "Impairment of player registrations" (Nota 2, "Exceptional Items" en el propio documento,
//     pero SIGUE sumando al total de "Operating expenses" de la Nota 4 — no es una partida aparte
//     del resultado operativo) -> player_impairment (no exceptional_items: la fórmula de
//     officialTotalExpenses de este motor es `Math.abs(expenses+nonCash)`, que necesita esta plata
//     adentro de nonCash para cerrar contra el "Total operating expenses" impreso; exceptional_items
//     no participa de esa fórmula). 2023/24 no tuvo impairment (£Nil); 2024/25 sí, £15,241 M.
//   - "Depreciation and impairment charges (less amortisation of grants)" -> depreciation.
//   - "Staff costs" (Note 6): el documento da la plantilla por ÁREA (Playing/Training/Commercial
//     and Administrative/Ground staff) pero el COSTO ("Wages and salaries"+"Social security
//     costs"+"Other pension costs") viene en UN solo número agregado, sin desglose de costo por
//     área — a diferencia de Vélez (club-data-mapping sección 14), no hay una matriz costo×área
//     que permita separar plantel profesional del resto del personal. Se cargó el total completo a
//     wages_squad (mismo criterio ya usado en el proyecto cuando la fuente no separa costo de
//     personal por sector, ver club-data-mapping sección 17 sobre "Fútbol profesional" de Racing).
//   - "Other operating charges" (catch-all sin desglose adicional en las notas: incluye costo de
//     mercadería de retail, tarifas profesionales, gastos de organización de partidos, etc.
//     mezclados sin una nota que los separe) -> other_expenses.
//   - "Cost of property sales" (solo existe como línea separada en el ejercicio 2023/24; en
//     2024/25 el propio documento la funde dentro de "Other operating charges" — se ve comparando
//     la columna 2024 de la Nota 4 de cada documento: 146,774+1,118 = 147,892, que es exactamente
//     el comparativo "2024" que el documento de 2025 imprime ya fusionado) -> other_expenses.
//
// "netInterest" = Nota 5 "Net finance charges" (NETO de "Total interest payable and similar
// charges" menos "Interest receivable"), con signo NEGATIVO porque en los dos ejercicios es un
// costo neto. "tax" = Nota 8 "Total tax charge/(credit) on loss", con signo tal que
// pbt + tax = pat (0 en 2023/24, -0,029 M en 2024/25 — un cargo, no crédito).
//
// "grossDebt" = Nota 21(b) "Analysis of changes in net debt", que el propio documento define
// EXPLÍCITO como la suma de "Debentures" + "Balance due to parent undertaking" (esa nota calcula
// "Net (debt)" = Cash - Debentures - Balance due to parent undertaking, y ese resultado coincide
// EXACTO con el que da esta cuenta) — se preferyó esta línea angosta (deuda financiera real: las
// debentures cotizadas + el préstamo del accionista controlante) en vez del Total de "Creditors"
// completo (que mezcla acreedores comerciales, impuestos, anticipos de abonos, etc., ver criterio
// de club-data-mapping sección 14). NO se incluyó el préstamo del Barclays de working capital
// (£100 M) porque la Nota 17 aclara que estaba SIN USAR ("undrawn committed bank borrowing
// facilities") en las dos fechas de cierre. "cash" = "Cash at bank and in hand" (Balance Sheet).
//
// VERIFICACIÓN (node -e, ver detalle numérico en el historial de esta sesión — no se dejó un
// archivo de verificación aparte, el cálculo es reproducible con los números de este archivo):
//   2023/24: revenue 665,719 M + expenses (-475,714 M) + nonCash (-189,260 M) + netInterest
//     (-18,432 M) = -17,687 M = officialPAT EXACTO ("(Loss) for the financial year" impreso).
//     officialTotalExpenses = |expenses+nonCash| = 664,974 M = "Total operating expenses" impreso
//     EXACTO (Nota 4).
//   2024/25: revenue 770,545 M + expenses (-547,560 M) + nonCash (-206,646 M) + netInterest
//     (-17,687 M) + tax (-0,029 M) = -1,377 M = officialPAT EXACTO ("(Loss) for the financial
//     year" impreso). officialTotalExpenses = |expenses+nonCash| = 754,206 M = "Total operating
//     expenses" impreso EXACTO (Nota 4).
// Los dos cierran EXACTOS, sin residuo — no hizo falta forzar ningún número.
// ============================================================================

const arsenalGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate and other match day revenues', normalizedCategory:'matchday_competition', amountNative:131.652, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:262.252, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:218.268, disclosureLevel:'detailed' },
    { rawLabel:'Property development', normalizedCategory:'other_income', amountNative:3.034, disclosureLevel:'detailed' },
    { rawLabel:'Player trading', normalizedCategory:'player_sales', amountNative:1.374, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:51.073, disclosureLevel:'detailed' },
    { rawLabel:'Share of joint venture operating loss', normalizedCategory:'other_income', amountNative:-1.934, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate and other match day revenues', normalizedCategory:'matchday_competition', amountNative:153.854, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:272.784, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:263.193, disclosureLevel:'detailed' },
    { rawLabel:'Property', normalizedCategory:'other_income', amountNative:0.713, disclosureLevel:'detailed' },
    { rawLabel:'Player trading', normalizedCategory:'player_sales', amountNative:0.454, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:81.237, disclosureLevel:'detailed' },
    { rawLabel:'Share of joint venture operating loss', normalizedCategory:'other_income', amountNative:-1.690, disclosureLevel:'detailed' },
  ],
};

const arsenalGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-327.822, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-171.099, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation and impairment charges (less amortisation of grants)', normalizedCategory:'depreciation', amountNative:-18.161, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-146.774, disclosureLevel:'detailed' },
    { rawLabel:'Cost of property sales', normalizedCategory:'other_expenses', amountNative:-1.118, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-346.804, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-171.627, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of player registrations', normalizedCategory:'player_impairment', amountNative:-15.241, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation and impairment charges (less amortisation of grants)', normalizedCategory:'depreciation', amountNative:-19.778, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-200.756, disclosureLevel:'detailed' },
  ],
};

const arsenalGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-05-31',
    sourceId:'arsenal-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'kroenke',
    // grossDebt = Debentures (17.722) + Balance due to parent undertaking, KSE UK Inc. (324.062) —
    // ver comentario de cabecera. cash = Cash at bank and in hand.
    grossDebt:341.784, cash:66.819,
    profitOnPlayerSales:0, assetSales:0, netInterest:-18.432, tax:0,
    officialTotalRevenue:665.719, officialTotalExpenses:664.974, officialPAT:-17.687,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-05-31',
    sourceId:'arsenal-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'kroenke',
    grossDebt:358.294, cash:55.994,
    profitOnPlayerSales:0, assetSales:0, netInterest:-17.687, tax:-0.029,
    officialTotalRevenue:770.545, officialTotalExpenses:754.206, officialPAT:-1.377,
  },
};

const arsenalGbPresupuestoOverlayByYear = {};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que otros clubes onboardeados
// solo para Finanzas (ver data/valenciacf-data.js).
const arsenalGbPasesData = [];
const arsenalGbResultadosData = {};
const arsenalGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['arsenal-gb'] = {
  revenueLinesByYear: arsenalGbRevenueLinesByYear, expenseLinesByYear: arsenalGbExpenseLinesByYear,
  fiscalYearMeta: arsenalGbFiscalYearMeta, pasesData: arsenalGbPasesData,
  resultadosData: arsenalGbResultadosData, titulosData: arsenalGbTitulosData,
  presupuestoOverlayByYear: arsenalGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'arsenal-gb-group-accounts-2024': {
    id:'arsenal-gb-group-accounts-2024', clubId:'arsenal-gb',
    title:'Arsenal Holdings Limited — Annual Report and Financial Statements, year ended 31 May 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/04250459/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Arsenal Holdings Limited, la sociedad matriz del grupo, depositado en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2024 (temporada 2023/24).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2023-24.md. Cuentas consolidadas del grupo (no las individuales de The Arsenal Football Club Limited, n° 00109244). No se encontró un tipo de cambio GBP/USD propio declarado por el documento (Nota 17/18 solo cuantifica partidas puntuales en EUR/USD/AUD, no un TC de cierre para todo el balance) — fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2024-05-31 (pendiente, fuera de alcance de esta sesión).',
  },
  'arsenal-gb-group-accounts-2025': {
    id:'arsenal-gb-group-accounts-2025', clubId:'arsenal-gb',
    title:'Arsenal Holdings Limited — Annual Report and Financial Statements, year ended 31 May 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/04250459/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Arsenal Holdings Limited, la sociedad matriz del grupo, depositado en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2025 (temporada 2024/25).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2024-25.md. Cuentas consolidadas del grupo. Mismo gotcha de fx que el ejercicio 2024: fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2025-05-31 (pendiente, fuera de alcance de esta sesión).',
  },
});

// gestionId 'kroenke': los dos ejercicios cargados confirman a E.S. Kroenke / KSE UK Inc. como
// controlante último ("Funding is provided mainly by the ultimate parent company, KSE UK Inc....";
// "The ultimate parent undertaking and controlling party is KSE UK Inc.... wholly-owned and
// controlled by Mr E.S. Kroenke") en los dos Directors' Reports. El rango firstYear/lastYear
// refleja SOLO los ejercicios efectivamente cargados (2024-2025), no se afirma acá desde cuándo
// dura la gestión Kroenke en general (dato no confirmado por estos documentos).
gestionesByClub['arsenal-gb'] = { kroenke: { nombre:'Kroenke / KSE UK Inc.', firstYear:2024, lastYear:2025 } };

memberCountByClub['arsenal-gb'] = null;

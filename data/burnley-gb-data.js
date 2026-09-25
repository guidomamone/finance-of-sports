// ============================================================================
// data/burnley-gb-data.js — Burnley FC Holdings Limited (clubId 'burnley-gb'), Ejercicios 2023/24
// (año ended 31 julio 2024) y 2024/25 (año ended 31 julio 2025).
//
// ENTIDAD LEGAL: "Burnley FC Holdings Limited" (Companies House n° 08335231), la HOLDING creada por
// ALK Capital (Alan Pace) que presenta cuentas CONSOLIDADAS del grupo — NO "The Burnley Football &
// Athletic Company Limited" (n° 00054222), la sociedad operativa histórica que presenta cuentas
// individuales sin consolidar. Mismo criterio que Arsenal/Everton/etc.: preferir la entidad que
// consolida (ver fuentes/Inglaterra/Burnley.md).
//
// CIERRE DE EJERCICIO: 31 de JULIO, no 31 de mayo (Arsenal/Liverpool) ni 30 de junio (Man
// City/Everton/Tottenham/Bournemouth/Aston Villa/Brentford/Brighton) — confirmado en la carátula y
// en la Nota 1.2 ("All financial statements are made up to 31 July 2024/2025") de los dos
// documentos. fiscalYearStart en data/clubs.js es '08-01'.
//
// LIGA: OJO, este club es la EXCEPCIÓN de los 5 onboardeados en esta sesión — NO jugó Premier
// League los dos ejercicios. El ejercicio 2024 (año ended 31/7/2024) cubre la temporada 2023/24, en
// la que Burnley SÍ jugó Premier League (recién ascendido, terminó 19° y descendió — confirmado
// literal en el propio Strategic Report: "Turnover has increased... due to the Club competing in
// the Premier League", "League Position 19th"). El ejercicio 2025 (año ended 31/7/2025) cubre la
// temporada 2024/25, en la CHAMPIONSHIP (recién descendido) — el propio documento lo dice literal:
// "Turnover has decreased from £133.6m to £71.7m due to the Club competing in the Championship,
// compared to the Premier League", "League Position 2nd" (ascendido de nuevo al final de esa
// temporada). Por eso data/club-leagues/gb.js mapea 2024->'gb-premierleague' y 2025->
// 'gb-championship' (liga nueva agregada a data/leagues.js en esta sesión, mismo criterio que
// de-2bundesliga/es-segunda: el id nombra el escalón).
//
// Fuente: transcripciones completas en Clubes/Inglaterra/Burnley/burnley-fc-holdings-group-
// accounts-2023-24.md y -2024-25.md (ya transcriptas antes de esta sesión).
//
// Cifras en GBP MILLONES nativos (el documento reporta en £'000, dividido por 1.000 al cargar).
// GBP ya es moneda cargada en el sitio (Arsenal/Liverpool/Man City/Everton/Tottenham). Ninguno de
// los 2 documentos declara un tipo de cambio propio GBP/USD (solo hay exposición a riesgo de tipo
// de cambio genérica en el texto de going concern, sin cifra), así que corresponde `market_close` +
// `fxRef` (regla #0 de club-data-mapping sección 5 no aplica). El cierre 31/7 es una fecha NUEVA
// para GBP en FX_CLOSE (hasta ahora solo había 31/5 y 30/6): se agregaron 'GBP@2024-07-31' (0,7793)
// y 'GBP@2025-07-31' (0,7556) a data/currency-map.js, cruzando el Boletín BCE de esas fechas exactas
// (GBP/EUR y EUR/USD publicados por el BCE, mismo método que las entradas ya existentes).
//
// ----------------------------------------------------------------------------------------------
// CATEGORIZACIÓN DE INGRESOS (Note 3 "Revenue"/"Turnover analysed by class of business", 5 líneas
// en los dos ejercicios, + "Other operating income" del cuerpo del P&L, + la línea neta de venta de
// jugadores):
//   - "Match income" -> matchday_competition.
//   - "Television rights" -> broadcasting.
//   - "Catering sales" -> stadium_other (concesiones de estadio en día de partido, mismo criterio
//     que "Catering" de Köln, club-data-mapping sección 1: no es la entrada en sí, es lo que se
//     vende adentro del estadio el día del partido).
//   - "Retail sales" (venta de mercadería/merchandising del club) -> sponsorship_commercial, mismo
//     criterio que "Merchandising" de Eintracht Frankfurt/Köln.
//   - "Other commercial activities" (línea de Note 3 sin más desglose disponible en ningún lado del
//     documento, no nombra el estadio ni sponsorship específico) -> other_income (catch-all), mismo
//     criterio que Everton usó para su propia línea homónima ("hospitality, catering, events and
//     all other revenue sources").
//   - "Other operating income", que el P&L separa en 2 columnas ("Operations excluding player
//     trading" / "Player trading"): la porción de player trading (£5,494k en 2024 / £4,596k en
//     2025) son fees de PRÉSTAMOS de jugadores recibidos ("Player trading consists primarily of
//     loan fees receivable...", nota bajo el P&L) -> player_sales, mismo criterio que "Player
//     trading" de Arsenal. La porción NO de player trading (£804k en 2024 / £980k en 2025, según la
//     política contable "Income generated from temporary player loan registrations, including club
//     payroll obligations recharged" — hay overlap conceptual con la columna de al lado, pero el
//     propio documento las separa en dos columnas del P&L, así que se respeta esa separación) ->
//     other_income.
//   - "Profit on disposal of player/staff registrations": línea NETA separada, después de
//     "Operating Profit/(loss)", en la columna "Player trading" -> player_sales, mismo criterio que
//     Arsenal/Everton. meta.profitOnPlayerSales queda en 0 para no duplicarla.
//
// CATEGORIZACIÓN DE GASTOS (cuerpo del P&L, columna "Operations excluding player trading" salvo
// Amortisation que solo existe en la columna "Player trading"):
//   - "Administrative expenses" -> admin_general_expense (el documento no la desglosa más).
//   - "Staff costs" (Note 6): al igual que Everton/Arsenal, el documento da headcount por área
//     (Note 6, "Players, managerial and training staff" vs. "Sales, administration and ancillary
//     staff") pero el COSTO ("Wages and salaries"+"Social security costs"+"Pension costs") es una
//     sola cifra agregada sin desglose de costo por área -> wages_squad completa.
//   - "Depreciation" -> depreciation.
//   - "Amortisation of player registrations" -> player_amortisation. Ningún impairment de pases en
//     ninguno de los 2 ejercicios (no aparece como línea separada en ningún lado del P&L o las
//     notas).
//
// "netInterest" = "Interest receivable and similar income" (Note 7) menos "Interest payable and
// similar expenses" (Note 8), NEGATIVO en los 2 ejercicios (costo neto). "tax" = "Tax on loss"
// (Note 9), positivo en los 2 ejercicios (crédito, no cargo).
//
// "grossDebt" = Note 18 "Loans and overdrafts", TOTAL (Bank loans + Other loans/Proceeds from
// factored debts, corriente + no corriente) — se prefirió esta línea angosta de deuda financiera
// real en vez del total de "Creditors" (que mezcla acreedores comerciales de otros clubes,
// impuestos, anticipos, etc.), mismo criterio de club-data-mapping sección 14. "cash" = "Cash at
// bank and in hand" (Balance Sheet).
//
// VERIFICACIÓN (a mano, sumando cada línea contra los totales impresos — los 2 ejercicios
// reconcilian EXACTOS, sin residuo):
//   2023/24 (año ended 31/7/2024): revenue 154,922 M (8,869+110,564+0,836+10,681+2,615+0,804+5,494+
//     15,059) + expenses (wages -93,420 + admin_general -27,744 = -121,164) + nonCash
//     (player_amortisation -42,615 + depreciation -2,629 = -45,244) + netInterest (2,064-19,025=
//     -16,961) + tax (4,016) = -24,431 = officialPAT EXACTO ("Loss for the financial year"
//     impreso). officialTotalExpenses = |expenses+nonCash| = 166,408 M = Administrative expenses
//     (27,744) + Staff costs (93,420) + Depreciation (2,629) + Amortisation (42,615) EXACTO.
//   2024/25 (año ended 31/7/2025): revenue 136,276 M (9,095+55,219+0,351+4,358+2,723+0,980+4,596+
//     58,954) + expenses (wages -82,263 + admin_general -30,401 = -112,664) + nonCash
//     (player_amortisation -36,679 + depreciation -2,606 = -39,285) + netInterest (6,945-20,434=
//     -13,489) + tax (0,632) = -28,530 = officialPAT EXACTO ("Loss for the financial year"
//     impreso). officialTotalExpenses = |expenses+nonCash| = 151,949 M = Administrative expenses
//     (30,401) + Staff costs (82,263) + Depreciation (2,606) + Amortisation (36,679) EXACTO.
// Los dos cierran EXACTOS, sin residuo — no hizo falta forzar ningún número.
// ============================================================================

const burnleyGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Match income', normalizedCategory:'matchday_competition', amountNative:8.869, disclosureLevel:'detailed' },
    { rawLabel:'Television rights', normalizedCategory:'broadcasting', amountNative:110.564, disclosureLevel:'detailed' },
    { rawLabel:'Catering sales', normalizedCategory:'stadium_other', amountNative:0.836, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:10.681, disclosureLevel:'not_disclosed' },
    { rawLabel:'Retail sales', normalizedCategory:'sponsorship_commercial', amountNative:2.615, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (excluding player trading)', normalizedCategory:'other_income', amountNative:0.804, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (player trading — loan fees receivable)', normalizedCategory:'player_sales', amountNative:5.494, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player/staff registrations', normalizedCategory:'player_sales', amountNative:15.059, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Match income', normalizedCategory:'matchday_competition', amountNative:9.095, disclosureLevel:'detailed' },
    { rawLabel:'Television rights', normalizedCategory:'broadcasting', amountNative:55.219, disclosureLevel:'detailed' },
    { rawLabel:'Catering sales', normalizedCategory:'stadium_other', amountNative:0.351, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:4.358, disclosureLevel:'not_disclosed' },
    { rawLabel:'Retail sales', normalizedCategory:'sponsorship_commercial', amountNative:2.723, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (excluding player trading)', normalizedCategory:'other_income', amountNative:0.980, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (player trading — loan fees receivable)', normalizedCategory:'player_sales', amountNative:4.596, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player/staff registrations', normalizedCategory:'player_sales', amountNative:58.954, disclosureLevel:'detailed' },
  ],
};

const burnleyGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-27.744, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-93.420, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-2.629, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-42.615, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-30.401, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-82.263, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-2.606, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-36.679, disclosureLevel:'detailed' },
  ],
};

const burnleyGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-07-31',
    sourceId:'burnley-gb-holdings-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'pace',
    // grossDebt = Note 18 "Loans and overdrafts", total (Bank loans 92.190 + Other loans 20.203).
    // cash = Cash at bank and in hand.
    grossDebt:112.393, cash:8.910,
    profitOnPlayerSales:0, assetSales:0, netInterest:-16.961, tax:4.016,
    officialTotalRevenue:154.922, officialTotalExpenses:166.408, officialPAT:-24.431,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-07-31',
    sourceId:'burnley-gb-holdings-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'pace',
    // grossDebt = Note 18 "Loans and overdrafts", total (Bank loans 105.343 + Proceeds from
    // factored debts 37.029).
    grossDebt:142.372, cash:12.909,
    profitOnPlayerSales:0, assetSales:0, netInterest:-13.489, tax:0.632,
    officialTotalRevenue:136.276, officialTotalExpenses:151.949, officialPAT:-28.530,
  },
};

const burnleyGbPresupuestoOverlayByYear = {};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que otros clubes onboardeados
// solo para Finanzas.
const burnleyGbPasesData = [];
const burnleyGbResultadosData = {};
const burnleyGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['burnley-gb'] = {
  revenueLinesByYear: burnleyGbRevenueLinesByYear, expenseLinesByYear: burnleyGbExpenseLinesByYear,
  fiscalYearMeta: burnleyGbFiscalYearMeta, pasesData: burnleyGbPasesData,
  resultadosData: burnleyGbResultadosData, titulosData: burnleyGbTitulosData,
  presupuestoOverlayByYear: burnleyGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'burnley-gb-holdings-group-accounts-2024': {
    id:'burnley-gb-holdings-group-accounts-2024', clubId:'burnley-gb',
    title:'Burnley FC Holdings Limited — Annual Report and Financial Statements, year ended 31 July 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/08335231/filing-history',
    publicNote:'Balance consolidado auditado (BDO LLP, con énfasis de negocio en marcha) de Burnley FC Holdings Limited, la sociedad matriz del grupo (ALK Capital / Alan Pace), depositado en Companies House (Reino Unido). Ejercicio cerrado el 31 de julio de 2024 (temporada 2023/24, Premier League — recién ascendido, descendió al terminar 19°).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Burnley/burnley-fc-holdings-group-accounts-2023-24.md. Cuentas consolidadas del grupo (no las individuales de The Burnley Football & Athletic Company Limited, n° 00054222). No se encontró un tipo de cambio GBP/USD propio declarado por el documento — fxRef apunta a FX_CLOSE (GBP@2024-07-31, agregada en esta sesión, cierre BCE al 31/7/2024).',
  },
  'burnley-gb-holdings-group-accounts-2025': {
    id:'burnley-gb-holdings-group-accounts-2025', clubId:'burnley-gb',
    title:'Burnley FC Holdings Limited — Annual Report and Financial Statements, year ended 31 July 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/08335231/filing-history',
    publicNote:'Balance consolidado auditado (BDO LLP) de Burnley FC Holdings Limited. Ejercicio cerrado el 31 de julio de 2025 (temporada 2024/25, CHAMPIONSHIP — recién descendido, ascendió de nuevo terminando 2°, no Premier League como los otros 4 clubes onboardeados en esta sesión).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Burnley/burnley-fc-holdings-group-accounts-2024-25.md. Cuentas consolidadas del grupo. Mismo gotcha de fx que el ejercicio 2024: fxRef apunta a FX_CLOSE (GBP@2025-07-31, agregada en esta sesión, cierre BCE al 31/7/2025).',
  },
});

// gestionId 'pace': los dos ejercicios confirman a AG Pace / ALK Capital LLC como controlante
// último ("The ultimate parent undertaking is ALK Capital LLC... AG Pace is considered to be the
// ultimate controlling party", Nota "Controlling party" de los dos Directors' Reports). El rango
// firstYear/lastYear refleja SOLO los ejercicios efectivamente cargados (2024-2025).
gestionesByClub['burnley-gb'] = { pace: { nombre:'Alan Pace / ALK Capital LLC', firstYear:2024, lastYear:2025 } };

memberCountByClub['burnley-gb'] = null;

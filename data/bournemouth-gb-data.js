// ============================================================================
// data/bournemouth-gb-data.js — AFC Bournemouth Limited (clubId 'bournemouth-gb'), Ejercicios
// 2023/24 (año ended 30 junio 2024) y 2024/25 (año ended 30 junio 2025).
//
// ENTIDAD LEGAL: "AFC Bournemouth Limited", Companies House n° 06632170 — cuentas de la SOCIEDAD
// individual (`Full accounts`), no hay grupo consolidado separado (a diferencia de Arsenal/Burnley).
// Ejercicio 1° de julio a 30 de junio (fiscalYearStart '07-01' en data/clubs.js, mismo criterio que
// Man City/Everton/Tottenham).
//
// Fuente: transcripciones completas en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-
// 2023-24.md y -2024-25.md (ya transcriptas antes de esta sesión).
//
// Cifras en GBP MILLONES nativos (documento en £'000, /1.000 al cargar). fx: ninguno de los 2
// documentos declara un tipo de cambio propio a USD -> fxRef a FX_CLOSE (GBP@2024-06-30/
// GBP@2025-06-30, ya existentes, mismas fechas que Man City/Everton/Tottenham).
//
// REGLA DE CLUB-DATA-MAPPING SECCIÓN 6.5 aplicada: el ejercicio 2024 se cargó de SU PROPIA
// presentación (el documento `bournemouth-full-accounts-2023-24.md`, formato FRS 102 "clásico"), NO
// de la columna comparativa "2024" que aparece DENTRO del documento `-2024-25.md` — ese documento
// adoptó una presentación nueva (con "Right-of-use assets"/leases, ver Nota de arrendamientos) que
// restata levemente el 2024 comparativo (ej. depreciación pasa de 1.896 a 2.391 al sumarle
// amortización de right-of-use assets). Los dos son el mismo hecho económico, presentado distinto:
// se usa siempre la presentación PROPIA del ejercicio, nunca la comparativa de un documento
// posterior.
//
// ----------------------------------------------------------------------------------------------
// CATEGORIZACIÓN DE INGRESOS (Note 4 "Turnover"/Note 5 "Revenue", 6 líneas de "class of business" +
// Note 5/6 "Other operating income" + la línea neta de venta de jugadores):
//   - "Match and season ticket income" (línea COMBINADA, el documento no separa taquilla partido a
//     partido de abonos de temporada) -> matchday_competition, mismo criterio que Talleres (cuando
//     el documento no reporta una línea de abonos separada, todo va a matchday_competition, no se
//     inventa una separación que la fuente no da).
//   - "Premier League income" (distribuciones centrales de la liga: TV, facility fees, mérito,
//     solidaridad — el propio Strategic Report lo describe como "central distributions") ->
//     broadcasting.
//   - "Sponsorship and advertising" -> sponsorship_commercial.
//   - "Shop merchandise" -> sponsorship_commercial (merchandising, mismo criterio que Eintracht
//     Frankfurt/Köln).
//   - "Hospitality and events" -> other_income (NO stadium_other: el rótulo no nombra el estadio,
//     criterio conservador de club-data-mapping sección 1/13 — mismo tratamiento que le dio Everton
//     a su línea "hospitality, catering, events").
//   - "Other income" (Note 4/5, catch-all explícito) -> other_income.
//   - "Other operating income": el documento NO la separa en columnas como Burnley, pero SÍ
//     desglosa en una nota que "£X de £Y corresponde a lo recibido por jugadores a préstamo en
//     otros clubes" — se partió en 2 líneas para reflejar esa nota (loan fees -> player_sales, resto
//     sin especificar -> other_income), en vez de cargar el monto entero bajo una sola categoría:
//     2024 (£8,825k total): £8,257k loan fees -> player_sales, £568k resto -> other_income.
//     2025 (£17,398k total): £15,199k loan fees -> player_sales, £2,199k resto -> other_income.
//   - "Profit on disposal of players' registrations" -> player_sales, línea neta separada después
//     de operating profit, mismo criterio que Arsenal/Everton/Burnley. meta.profitOnPlayerSales
//     queda en 0 para no duplicarla.
//
// CATEGORIZACIÓN DE GASTOS:
//   - "Staff costs" (Note 9): headcount por área (Playing/Academy/Matchday) pero costo agregado sin
//     desglose por área -> wages_squad completa, mismo criterio que el resto de los clubes ingleses.
//   - "Depreciation of tangible assets" (2024) / "Depreciation of tangible assets and right-of-use
//     assets" (2025, ya incluye la amortización de los right-of-use del nuevo estándar de leases) ->
//     depreciation.
//   - "Amortisation of intangibles" (Note 14/párrafo de intangibles: player registration costs +
//     website/software, ~99,9% jugadores en los 2 ejercicios — el residuo de website/software es
//     £39k de £61.616k en 2024, no separable de forma material) -> player_amortisation, el monto
//     completo (la porción de software es <0,1%, ver Nota de intangibles para el detalle: 2024
//     61.577 jugadores + 39 website = 61.616; cifra equivalente en 2025 no se desglosó por ser
//     igual de inmaterial).
//   - "Other operating expenses" (línea del P&L sin ninguna nota que la desglose en ningún lado del
//     documento) -> other_expenses.
//   - "Exceptional other operating income" (2023 solamente, £71.444k por la extinción de deuda de
//     accionista previa al cambio de control a Black Knight/Cannae — Nota 6): NO se carga, es
//     comparativo del ejercicio 2022/23, fuera del alcance de esta sesión (solo 2024 y 2025).
//
// "netInterest" = "Interest receivable and similar income"/"Investment income" menos "Interest
// payable and similar expenses"/"Finance costs", NEGATIVO en los 2 ejercicios. "tax" = 0 en los 2
// ejercicios (Note 13, "Total tax charge for the financial year" = £Nil los 2 años — el Club no
// tiene ganancias imponibles, arrastra pérdidas fiscales sin reconocer el activo por impuesto
// diferido).
//
// "grossDebt": el propio documento define "Borrowings" (Nota 18 del `-2024-25.md`, que da el
// desglose EXACTO también para el comparativo 2024) como Bank loans + Loans from fellow group
// undertakings (el préstamo interest-free del accionista controlante, Black Knight Football Club UK
// Limited) — se siguió esa clasificación PROPIA del documento (no separar el préstamo de accionista
// como si no fuera deuda), a diferencia de tratarlo como una cuenta a pagar más: 2024 = Bank loans
// 33,000 (3,000 corriente + 30,000 no corriente, ver Note 19/20 del `-2023-24.md`) + Loans from
// fellow group undertakings 89,779 = 122,779. 2025 = Bank loans 48,905 solamente (el préstamo de
// accionista se convirtió íntegro a acciones A Ordinarias durante el ejercicio — Nota 18/25 del
// `-2024-25.md`, "following the conversion of shareholder loans to A ordinary shares"). "cash" =
// "Cash at bank and in hand" (Statement of Financial Position).
//
// VERIFICACIÓN (a mano, sumando cada línea contra los totales impresos — los 2 ejercicios
// reconcilian EXACTOS, sin residuo):
//   2023/24: revenue 169,868 M (6,531+135,631+12,120+3,226+1,542+1,742+8,257+0,568+0,251) +
//     expenses (wages -136,170 + other_expenses -26,026 = -162,196) + nonCash (depreciation -1,896
//     + player_amortisation -61,616 = -63,512) = -55,840 = "Operating (loss)/profit" impreso EXACTO.
//     + netInterest (191-10,502=-10,311) = -66,151 = "(Loss)/profit before taxation" impreso EXACTO.
//     + tax (0) = -66,151 = officialPAT EXACTO ("(Loss)/profit for the financial year" impreso).
//   2024/25: revenue 290,131 M (6,738+147,999+18,107+4,672+1,868+2,332+15,199+2,199+91,017) +
//     expenses (wages -158,422 + other_expenses -31,281 = -189,703) + nonCash (depreciation -2,989
//     + player_amortisation -69,165 = -72,154) = 28,274 = "Operating profit/(loss)" impreso EXACTO.
//     + netInterest (5,312-18,699=-13,387) = 14,887 = "Profit/(loss) before tax" impreso EXACTO. +
//     tax (0) = 14,887 = officialPAT EXACTO ("Profit/(loss) for the financial year" impreso).
// Los dos cierran EXACTOS, sin residuo.
// ============================================================================

const bournemouthGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Match and season ticket income', normalizedCategory:'matchday_competition', amountNative:6.531, disclosureLevel:'detailed' },
    { rawLabel:'Premier League income', normalizedCategory:'broadcasting', amountNative:135.631, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:12.120, disclosureLevel:'detailed' },
    { rawLabel:'Hospitality and events', normalizedCategory:'other_income', amountNative:3.226, disclosureLevel:'detailed' },
    { rawLabel:'Shop merchandise', normalizedCategory:'sponsorship_commercial', amountNative:1.542, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:1.742, disclosureLevel:'not_disclosed' },
    { rawLabel:'Other operating income (amounts received for players on loan at other clubs)', normalizedCategory:'player_sales', amountNative:8.257, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (resto, sin especificar)', normalizedCategory:'other_income', amountNative:0.568, disclosureLevel:'not_disclosed' },
    { rawLabel:"Profit on disposal of players' registrations", normalizedCategory:'player_sales', amountNative:0.251, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Match and season ticket income', normalizedCategory:'matchday_competition', amountNative:6.738, disclosureLevel:'detailed' },
    { rawLabel:'Premier League income', normalizedCategory:'broadcasting', amountNative:147.999, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:18.107, disclosureLevel:'detailed' },
    { rawLabel:'Hospitality and events', normalizedCategory:'other_income', amountNative:4.672, disclosureLevel:'detailed' },
    { rawLabel:'Shop merchandise', normalizedCategory:'sponsorship_commercial', amountNative:1.868, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:2.332, disclosureLevel:'not_disclosed' },
    { rawLabel:'Other operating income (amounts received for players on loan at other clubs)', normalizedCategory:'player_sales', amountNative:15.199, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (resto, sin especificar)', normalizedCategory:'other_income', amountNative:2.199, disclosureLevel:'not_disclosed' },
    { rawLabel:"Profit on disposal of players' registrations", normalizedCategory:'player_sales', amountNative:91.017, disclosureLevel:'detailed' },
  ],
};

const bournemouthGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-136.170, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses', normalizedCategory:'other_expenses', amountNative:-26.026, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-1.896, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangibles (jugadores + website/software, ~99,9% jugadores)', normalizedCategory:'player_amortisation', amountNative:-61.616, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-158.422, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses', normalizedCategory:'other_expenses', amountNative:-31.281, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciation of tangible assets and right-of-use assets', normalizedCategory:'depreciation', amountNative:-2.989, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangibles (jugadores + website/software)', normalizedCategory:'player_amortisation', amountNative:-69.165, disclosureLevel:'detailed' },
  ],
};

const bournemouthGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'bournemouth-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'foley',
    // grossDebt = "Borrowings" (Bank loans 33.000 + Loans from fellow group undertakings 89.779,
    // clasificación propia del documento, ver comentario de cabecera). cash = Cash at bank and in
    // hand.
    grossDebt:122.779, cash:7.104,
    profitOnPlayerSales:0, assetSales:0, netInterest:-10.311, tax:0,
    officialTotalRevenue:169.868, officialTotalExpenses:225.708, officialPAT:-66.151,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'bournemouth-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'foley',
    // grossDebt = "Borrowings", Bank loans solamente (48.905): el préstamo de accionista se
    // convirtió íntegro a acciones durante el ejercicio.
    grossDebt:48.905, cash:47.236,
    profitOnPlayerSales:0, assetSales:0, netInterest:-13.387, tax:0,
    officialTotalRevenue:290.131, officialTotalExpenses:261.857, officialPAT:14.887,
  },
};

const bournemouthGbPresupuestoOverlayByYear = {};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que otros clubes onboardeados
// solo para Finanzas.
const bournemouthGbPasesData = [];
const bournemouthGbResultadosData = {};
const bournemouthGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['bournemouth-gb'] = {
  revenueLinesByYear: bournemouthGbRevenueLinesByYear, expenseLinesByYear: bournemouthGbExpenseLinesByYear,
  fiscalYearMeta: bournemouthGbFiscalYearMeta, pasesData: bournemouthGbPasesData,
  resultadosData: bournemouthGbResultadosData, titulosData: bournemouthGbTitulosData,
  presupuestoOverlayByYear: bournemouthGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'bournemouth-gb-full-accounts-2024': {
    id:'bournemouth-gb-full-accounts-2024', clubId:'bournemouth-gb',
    title:'AFC Bournemouth Limited — Full Accounts, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06632170/filing-history',
    publicNote:'Cuentas completas auditadas de AFC Bournemouth Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24, Premier League, terminó 12°).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2023-24.md. No se encontró un tipo de cambio GBP/USD propio declarado por el documento — fxRef apunta a FX_CLOSE (GBP@2024-06-30).',
  },
  'bournemouth-gb-full-accounts-2025': {
    id:'bournemouth-gb-full-accounts-2025', clubId:'bournemouth-gb',
    title:'AFC Bournemouth Limited — Full Accounts, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06632170/filing-history',
    publicNote:'Cuentas completas auditadas de AFC Bournemouth Limited. Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25, Premier League, terminó 9°).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2024-25.md. Adopta una presentación nueva (leases/right-of-use assets) que restata levemente el comparativo 2024 — se usó SIEMPRE la presentación propia de cada ejercicio, nunca la comparativa del documento del año siguiente (ver comentario de cabecera de data/bournemouth-gb-data.js). fxRef apunta a FX_CLOSE (GBP@2025-06-30).',
  },
});

// gestionId 'foley': los dos ejercicios confirman a Black Knight Football Club UK Limited
// (controlado por Cannae Holdings Inc y William P. Foley II) como matriz/controlante último desde
// diciembre de 2022 ("Ultimate parent undertaking and controlling party... William P. Foley II").
// El rango firstYear/lastYear refleja SOLO los ejercicios efectivamente cargados (2024-2025).
gestionesByClub['bournemouth-gb'] = { foley: { nombre:'William P. Foley II / Black Knight Football Club UK Limited', firstYear:2024, lastYear:2025 } };

memberCountByClub['bournemouth-gb'] = null;

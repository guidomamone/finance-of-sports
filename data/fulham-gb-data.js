// ============================================================================
// data/fulham-gb-data.js — Fulham (Inglaterra, Premier League), clubId 'fulham-gb'.
//
// Fuente: "Full accounts" (NO group accounts) de Fulham Football Club Limited (Companies House n°
// 02114486), auditadas, depositadas en Companies House UK. 2 ejercicios, ambos cerrados el 30 de
// junio:
//   2024: temporada 2023-24, terminó 13°. Transcripción:
//         Clubes/Inglaterra/Fulham/fulham-full-accounts-2023-24.md
//   2025: temporada 2024-25, terminó 11°. Transcripción:
//         Clubes/Inglaterra/Fulham/fulham-full-accounts-2024-25.md
//
// amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. fxRef porque
// ninguno de los 2 documentos declara un tipo de cambio propio.
//
// POR QUÉ "FULL ACCOUNTS" Y NO "GROUP ACCOUNTS" (a diferencia de la mayoría de los clubes ingleses
// ya cargados): Fulham Football Club Limited NO tiene subsidiarias propias (Nota 18 de ambos
// documentos), es standalone. El préstamo de £125m con JPMorgan Chase Bank (julio 2024, para
// completar el Riverside Stand) y todo el CAPEX de esa obra están registrados en Fulham Stadium
// Limited, una compañía HERMANA — fuera de alcance de este documento, no una omisión. La Nota 11
// (Creditors) de los 2 ejercicios no tiene ninguna línea "Borrowings"/deuda bancaria.
//
// "Central Awards" + "Broadcasting" van las dos a `broadcasting`: la política contable 1.12 las
// describe como las 2 mitades de la misma frase ("Broadcasting revenue can be recognised in two
// parts"), no dos conceptos distintos.
//
// "Compensation" (£0,873m 2024 / £4,013m 2025): "sums from collaboration agreements with other
// Clubs and remediation of lost income" — no encaja limpio en ninguna categoría, va a `other_income`
// (catch-all). Duda genuina en Admin/dudas-por-club.md.
//
// GROSSDEBT: Fulham FC Limited no tiene ninguna nota "Borrowings" en ningún ejercicio. La única
// partida deuda-like es "Amounts due to immediate parent company" (préstamo del dueño, SIN interés,
// "repayable on demand", que se convierte en acciones): £44,398m (2024), £0 (2025, todo convertido
// a equity en el año). Se usa ese valor tentativamente — duda genuina en Admin/dudas-por-club.md
// sobre si corresponde tratarlo como deuda financiera real o excluirlo (es cuasi-equity, sin interés).
//
// "Gate Receipts" 2025: la transcripción OCR trae un valor que no reconcilia contra el Turnover
// total impreso (194.790) menos las otras 4 líneas (179.780) — se usa 15.010 (el valor
// matemáticamente forzado por el total, consistente con un patrón de error OCR 1↔4 ya visto en el
// documento 2023-24), duda anotada para confirmar contra el PDF original.
//
// brandColor: NO resuelto — camiseta blanca ("The Whites"/"The Cottagers"), mismo bucket que
// River/Vélez/Sevilla/Real Madrid/Valencia/Once Caldas (club-or-year-onboarding sección 3). `null`.
// ============================================================================

const fulhamGbRevenueLinesByYear = {
  // Ejercicio 2024. Fuente: Note 2 "Turnover" + P&L (Profit on disposal of players' registrations).
  // Suma Turnover (5 líneas) = 181.559 exacto. Total = 218.918 = officialTotalRevenue.
  2024: [
    { rawLabel:'Gate Receipts', normalizedCategory:'matchday_competition', amountNative:18.392, disclosureLevel:'detailed' },
    { rawLabel:'Central Awards', normalizedCategory:'broadcasting', amountNative:123.316, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:11.190, disclosureLevel:'detailed' },
    { rawLabel:'Compensation', normalizedCategory:'other_income', amountNative:0.873, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and other Commercial Activities', normalizedCategory:'sponsorship_commercial', amountNative:27.788, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:32.735, disclosureLevel:'detailed' },
    { rawLabel:'Other income (R&D tax credits)', normalizedCategory:'other_income', amountNative:4.624, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025. Suma Turnover (5 líneas) = 194.790 exacto. Total = 235.825 = officialTotalRevenue.
  2025: [
    { rawLabel:'Gate Receipts (forzado por el total — ver duda de OCR en el comentario de cabecera)', normalizedCategory:'matchday_competition', amountNative:15.010, disclosureLevel:'estimated' },
    { rawLabel:'Central Awards', normalizedCategory:'broadcasting', amountNative:128.837, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:12.748, disclosureLevel:'detailed' },
    { rawLabel:'Compensation', normalizedCategory:'other_income', amountNative:4.013, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and other Commercial Activities', normalizedCategory:'sponsorship_commercial', amountNative:34.182, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:41.035, disclosureLevel:'detailed' },
  ],
};

const fulhamGbExpenseLinesByYear = {
  // Ejercicio 2024. Fuente: Note 3 + Note 4 + Note 9. Suma = -251.022 = officialTotalExpenses.
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-154.754, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos operativos (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-37.504, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-57.400, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of fixed assets', normalizedCategory:'depreciation', amountNative:-1.364, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025. Suma componentes = -275.356 (subtotal impreso D&A da 63.220 vs 63.221 real,
  // redondeo de £1.000 de la propia fuente, inmaterial).
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-166.507, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos operativos (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-45.628, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-61.521, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of fixed assets', normalizedCategory:'depreciation', amountNative:-1.700, disclosureLevel:'detailed' },
  ],
};

const fulhamGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'fulham-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'khan',
    grossDebt:44.398, cash:32.768,
    netInterest:0.905, tax:-1.009, assetSales:-0.007, profitOnPlayerSales:0,
    officialTotalRevenue:218.918, officialTotalExpenses:251.022, officialPAT:-32.215,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'fulham-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'khan',
    grossDebt:0, cash:13.172,
    netInterest:0.518, tax:0, assetSales:0, profitOnPlayerSales:0,
    officialTotalRevenue:235.825, officialTotalExpenses:275.355, officialPAT:-39.012,
  },
};

const fulhamGbPresupuestoOverlayByYear = {};
const fulhamGbPasesData = [];
const fulhamGbResultadosData = {};
const fulhamGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fulham-gb'] = {
  revenueLinesByYear: fulhamGbRevenueLinesByYear, expenseLinesByYear: fulhamGbExpenseLinesByYear,
  fiscalYearMeta: fulhamGbFiscalYearMeta, pasesData: fulhamGbPasesData,
  resultadosData: fulhamGbResultadosData, titulosData: fulhamGbTitulosData,
  presupuestoOverlayByYear: fulhamGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fulham-gb-full-accounts-2024': {
    id:'fulham-gb-full-accounts-2024', clubId:'fulham-gb',
    title:'Full accounts (Fulham Football Club Limited, standalone), ejercicio cerrado 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02114486/filing-history',
    note:'Cuentas de la sociedad individual (no consolida, no tiene subsidiarias), depositadas en Companies House (Reino Unido). El CAPEX y financiamiento del Riverside Stand viven en Fulham Stadium Limited, compañía hermana no incluida acá. Transcripción completa en Clubes/Inglaterra/Fulham/fulham-full-accounts-2023-24.md. Ver comentario de cabecera de data/fulham-gb-data.js.',
  },
  'fulham-gb-full-accounts-2025': {
    id:'fulham-gb-full-accounts-2025', clubId:'fulham-gb',
    title:'Full accounts (Fulham Football Club Limited, standalone), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02114486/filing-history',
    note:'Transcripción completa en Clubes/Inglaterra/Fulham/fulham-full-accounts-2024-25.md. "Gate Receipts" de este ejercicio tiene un valor forzado por el total (ver duda de OCR en Admin/dudas-por-club.md).',
  },
});

gestionesByClub['fulham-gb'] = {
  khan: { nombre:'Shahid Khan (2013-actual)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['fulham-gb'] = null;

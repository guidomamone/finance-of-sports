const fulhamGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate Receipts', normalizedCategory:'matchday_competition', amountNative:18.392, disclosureLevel:'detailed' },
    { rawLabel:'Central Awards', normalizedCategory:'broadcasting', amountNative:123.316, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:11.190, disclosureLevel:'detailed' },
    { rawLabel:'Compensation', normalizedCategory:'other_income', amountNative:0.873, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and other Commercial Activities', normalizedCategory:'sponsorship_commercial', amountNative:27.788, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:32.735, disclosureLevel:'detailed' },
    { rawLabel:'Other income (R&D tax credits)', normalizedCategory:'other_income', amountNative:4.624, disclosureLevel:'detailed' },
  ],
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
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-154.754, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos operativos (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-37.504, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-57.400, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of fixed assets', normalizedCategory:'depreciation', amountNative:-1.364, disclosureLevel:'detailed' },
  ],
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

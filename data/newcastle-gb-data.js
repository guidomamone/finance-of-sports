const newcastleGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:51.560, disclosureLevel:'detailed' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:161.066, disclosureLevel:'detailed' },
    { rawLabel:'UEFA', normalizedCategory:'broadcasting', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:120.179, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:2.517, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' and staff registrations', normalizedCategory:'player_sales', amountNative:19.875, disclosureLevel:'detailed' },
  ],
};

const newcastleGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-243.477, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residuo exacto, sin línea propia impresa)', normalizedCategory:'other_expenses', amountNative:-93.222, disclosureLevel:'estimated' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-8.182, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-99.502, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations', normalizedCategory:'player_impairment', amountNative:-0.366, disclosureLevel:'detailed' },
  ],
};

const newcastleGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'newcastle-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'pifreuben',
    grossDebt:58.314, cash:12.701,
    profitOnPlayerSales:0, assetSales:133.133, netInterest:-8.853, tax:0,
    officialTotalRevenue:355.197, officialTotalExpenses:444.749, officialPAT:34.728,
  },
};

const newcastleGbPresupuestoOverlayByYear = {};
const newcastleGbPasesData = [];
const newcastleGbResultadosData = {};
const newcastleGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['newcastle-gb'] = {
  revenueLinesByYear: newcastleGbRevenueLinesByYear, expenseLinesByYear: newcastleGbExpenseLinesByYear,
  fiscalYearMeta: newcastleGbFiscalYearMeta, pasesData: newcastleGbPasesData,
  resultadosData: newcastleGbResultadosData, titulosData: newcastleGbTitulosData,
  presupuestoOverlayByYear: newcastleGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'newcastle-gb-group-accounts-2025': {
    id:'newcastle-gb-group-accounts-2025', clubId:'newcastle-gb',
    title:'Report and Financial Statements (Newcastle United Limited — cuentas consolidadas del grupo), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02529667/filing-history',
    publicNote:'Cuentas consolidadas del grupo depositadas en Companies House (Reino Unido). Incluye 2 ganancias no operativas por reorganización societaria intra-grupo (venta de una subsidiaria y sale-and-leaseback de mejoras del estadio a una sociedad hermana), registradas aparte del resultado futbolístico.',
    note:'Transcripción completa en Clubes/Inglaterra/Newcastle United/newcastle-united-group-accounts-2024-25.md. Amanda Staveley renunció al directorio y desinvirtió su participación en julio de 2024. Ver comentario de cabecera de data/newcastle-gb-data.js para el detalle completo de categorización.',
  },
});

gestionesByClub['newcastle-gb'] = {
  pifreuben: { nombre:'Public Investment Fund / Reuben Brothers (tras salida de Staveley, jul-2024)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['newcastle-gb'] = null;

const chelseaGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:203.230, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:200.865, disclosureLevel:'detailed' },
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:86.762, disclosureLevel:'detailed' },
    { rawLabel:'Research & development tax credit', normalizedCategory:'other_income', amountNative:0.500, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:57.906, disclosureLevel:'detailed' },
  ],
};

const chelseaGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Cost of sales (incluye salarios de plantel, sin desglose propio — ver duda)', normalizedCategory:'wages_squad', amountNative:-428.673, disclosureLevel:'summary' },
    { rawLabel:'Amounts payable in relation to legal and regulatory matters (incluye settlement UEFA por Financial Sustainability Regulations)', normalizedCategory:'exceptional_items', amountNative:-50.200, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of owned tangible fixed assets', normalizedCategory:'depreciation', amountNative:-12.519, disclosureLevel:'detailed' },
    { rawLabel:'Administrative expenses (residual, sin más desglose)', normalizedCategory:'admin_general_expense', amountNative:-83.778, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation and impairment of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-224.344, disclosureLevel:'detailed' },
  ],
};

const chelseaGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'chelsea-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'boehly-clearlake',
    grossDebt:0, cash:49.009,
    profitOnPlayerSales:0, assetSales:-2.985, netInterest:-9.208, tax:-0.203,
    officialTotalRevenue:549.263, officialTotalExpenses:749.314, officialPAT:-262.647,
  },
};

const chelseaGbPresupuestoOverlayByYear = {};
const chelseaGbPasesData = [];
const chelseaGbResultadosData = {};
const chelseaGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['chelsea-gb'] = {
  revenueLinesByYear: chelseaGbRevenueLinesByYear, expenseLinesByYear: chelseaGbExpenseLinesByYear,
  fiscalYearMeta: chelseaGbFiscalYearMeta, pasesData: chelseaGbPasesData,
  resultadosData: chelseaGbResultadosData, titulosData: chelseaGbTitulosData,
  presupuestoOverlayByYear: chelseaGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'chelsea-gb-group-accounts-2025': {
    id:'chelsea-gb-group-accounts-2025', clubId:'chelsea-gb',
    title:'Group accounts (Chelsea FC Holdings Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02536231/filing-history',
    publicNote:'La venta de Chelsea FC Women a una parte relacionada (£198,7m de ganancia) ocurrió en el ejercicio anterior (2023-24), no en este.',
    note:'Cuentas consolidadas del grupo, depositadas en Companies House (Reino Unido). Transcripción completa en Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md. Ver comentario de cabecera de data/chelsea-gb-data.js para el detalle completo de categorización y las dudas abiertas (Cost of sales sin desglose, gap de amortización/deterioro, grossDebt).',
  },
});

gestionesByClub['chelsea-gb'] = {
  'boehly-clearlake': { nombre:'Todd Boehly / Clearlake Capital', firstYear:2025, lastYear:2025 },
};

memberCountByClub['chelsea-gb'] = null;

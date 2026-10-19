const astonvillaGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:38.452, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:170.717, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship', normalizedCategory:'sponsorship_commercial', amountNative:28.646, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:51.230, disclosureLevel:'not_disclosed' },
    { rawLabel:'UEFA', normalizedCategory:'broadcasting', amountNative:70.232, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:18.776513, disclosureLevel:'aggregated' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:152.55645, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsorship', normalizedCategory:'sponsorship_commercial', amountNative:16.302816, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:16.890061, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
};

const astonvillaGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-20.578, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-8.737, disclosureLevel:'detailed' },
    { rawLabel:'Operating expenses (resto sin desglosar — ver limitación en el comentario de cabecera: casi con certeza incluye el costo del plantel profesional, que esta entidad no reporta por separado)', normalizedCategory:'lump_football_operations_expense', amountNative:-404.092, disclosureLevel:'not_disclosed' },
  ],
  2023: [
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-3.317377, disclosureLevel:'aggregated' },
    { rawLabel:'Wages and salaries', normalizedCategory:'wages_squad', amountNative:-9.080191, disclosureLevel:'aggregated' },
    { rawLabel:'Social security costs', normalizedCategory:'wages_squad', amountNative:-1.2022, disclosureLevel:'aggregated' },
    { rawLabel:'Other pension costs', normalizedCategory:'wages_squad', amountNative:-0.477504, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating charges (including exceptional costs)', normalizedCategory:'other_expenses', amountNative:-306.203312, disclosureLevel:'aggregated' },
  ],
};

const astonvillaGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'astonvilla-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'nswe',
    grossDebt:110.571, cash:6.299,
    profitOnPlayerSales:0, assetSales:-0.084, netInterest:-0.262, tax:1.171,
    officialTotalRevenue:359.277, officialTotalExpenses:433.407, officialPAT:-73.305,
  },
  2023: {
    currency:'GBP', fxRef:'GBP@2023-05-31',
    sourceId:'astonvilla-gb-full-accounts-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.128924, tax:-0.22125,
    extraRows: [
      {label:'Interest payable and similar expenses', value:-0.128924},
      {label:'Tax on (loss)/profit', value:-0.22125},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:204.52584, officialTotalExpenses:320.280584, officialPAT:-116.104918,
  },
};

const astonvillaGbPresupuestoOverlayByYear = {};

const astonvillaGbPasesData = [];
const astonvillaGbResultadosData = {};
const astonvillaGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['astonvilla-gb'] = {
  revenueLinesByYear: astonvillaGbRevenueLinesByYear, expenseLinesByYear: astonvillaGbExpenseLinesByYear,
  fiscalYearMeta: astonvillaGbFiscalYearMeta, pasesData: astonvillaGbPasesData,
  resultadosData: astonvillaGbResultadosData, titulosData: astonvillaGbTitulosData,
  presupuestoOverlayByYear: astonvillaGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'astonvilla-gb-full-accounts-2025': {
    id:'astonvilla-gb-full-accounts-2025', clubId:'astonvilla-gb',
    title:'Aston Villa Football Club Limited — Full Accounts, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/03375789/filing-history',
    publicNote:'Cuentas completas auditadas (BDO LLP) de Aston Villa Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25, Premier League, con participación en competencia UEFA).',
  },
  'astonvilla-gb-full-accounts-2022-23': {
    id:'astonvilla-gb-full-accounts-2022-23', clubId:'astonvilla-gb',
    title:'Aston Villa Football Club Limited — astonvilla-full-accounts-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['astonvilla-gb'] = { nswe: { nombre:'V Sports S.C.S. (Nassef Sawiris / Wes Edens) — NSWE UK Limited', firstYear:2025, lastYear:2025 } };

memberCountByClub['astonvilla-gb'] = null;

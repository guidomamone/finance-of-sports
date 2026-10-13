const mancityGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:75.607, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - UEFA', normalizedCategory:'broadcasting', amountNative:104.599, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - All Other', normalizedCategory:'broadcasting', amountNative:190.132, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:344.681, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:4.455, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:75.084, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - UEFA', normalizedCategory:'broadcasting', amountNative:70.651, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - All Other', normalizedCategory:'broadcasting', amountNative:207.976, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:340.383, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:2.835, disclosureLevel:'detailed' },
  ],
};

const mancityGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Employee costs', normalizedCategory:'wages_squad', amountNative:-412.573, disclosureLevel:'detailed' },
    { rawLabel:'Direct cost of sales and consumables', normalizedCategory:'admin_general_expense', amountNative:-17.186, disclosureLevel:'detailed' },
    { rawLabel:'Remuneration of Auditors (audit fees)', normalizedCategory:'admin_general_expense', amountNative:-0.080, disclosureLevel:'detailed' },
    { rawLabel:'Other external charges', normalizedCategory:'other_expenses', amountNative:-172.391, disclosureLevel:'not_disclosed' },
    { rawLabel:'(Profit)/loss on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:-0.016, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation and impairment of intangible assets (players\' registrations)', normalizedCategory:'player_amortisation', amountNative:-165.094, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Owned', normalizedCategory:'depreciation', amountNative:-11.179, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Leased', normalizedCategory:'depreciation', amountNative:-1.452, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Employee costs', normalizedCategory:'wages_squad', amountNative:-408.403, disclosureLevel:'detailed' },
    { rawLabel:'Direct cost of sales and consumables', normalizedCategory:'admin_general_expense', amountNative:-9.307, disclosureLevel:'detailed' },
    { rawLabel:'Remuneration of Auditors (audit fees)', normalizedCategory:'admin_general_expense', amountNative:-0.090, disclosureLevel:'detailed' },
    { rawLabel:'Other external charges', normalizedCategory:'other_expenses', amountNative:-187.753, disclosureLevel:'not_disclosed' },
    { rawLabel:'(Profit)/loss on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:0.080, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation and impairment of intangible assets (players\' registrations)', normalizedCategory:'player_amortisation', amountNative:-169.546, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Owned', normalizedCategory:'depreciation', amountNative:-11.901, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Leased', normalizedCategory:'depreciation', amountNative:-3.311, disclosureLevel:'detailed' },
  ],
};

const mancityGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'mancity-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:0, cash:53.767,
    profitOnPlayerSales:139.009, assetSales:0,
    netInterest:-4.755, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:1.098},
      {label:'Interest payable and similar charges', value:-5.853},
    ],
    officialTotalRevenue:719.474, officialTotalExpenses:779.971, officialPAT:73.757,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'mancity-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:0, cash:173.724,
    profitOnPlayerSales:95.210, assetSales:0,
    netInterest:-11.824, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:7.768},
      {label:'Interest payable and similar charges', value:-19.592},
    ],
    officialTotalRevenue:696.929, officialTotalExpenses:790.231, officialPAT:-9.916,
  },
};

const mancityGbPresupuestoOverlayByYear = {};

const mancityGbPasesData = [];
const mancityGbResultadosData = {};
const mancityGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['mancity-gb'] = {
  revenueLinesByYear: mancityGbRevenueLinesByYear, expenseLinesByYear: mancityGbExpenseLinesByYear,
  fiscalYearMeta: mancityGbFiscalYearMeta, pasesData: mancityGbPasesData,
  resultadosData: mancityGbResultadosData, titulosData: mancityGbTitulosData,
  presupuestoOverlayByYear: mancityGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'mancity-gb-full-accounts-2024': {
    id:'mancity-gb-full-accounts-2024', clubId:'mancity-gb',
    title:'Manchester City Football Club Limited — Full Accounts (Companies House n.° 00040946), ejercicio cerrado el 30 de junio de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00040946/filing-history',
    publicNote:'Cuentas de la sociedad del club (Manchester City Football Club Limited) sola, NO las cuentas consolidadas de City Football Group, que además controla otros clubes (Nueva York, Melbourne, Girona, entre otros) y publica su propio balance por separado.',
  },
  'mancity-gb-full-accounts-2025': {
    id:'mancity-gb-full-accounts-2025', clubId:'mancity-gb',
    title:'Manchester City Football Club Limited — Full Accounts (Companies House n.° 00040946), ejercicio cerrado el 30 de junio de 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00040946/filing-history',
    publicNote:'Cuentas de la sociedad del club (Manchester City Football Club Limited) sola, NO las cuentas consolidadas de City Football Group, que además controla otros clubes (Nueva York, Melbourne, Girona, entre otros) y publica su propio balance por separado.',
  },
});

gestionesByClub['mancity-gb'] = { actual: { nombre:'Khaldoon Al Mubarak (Chairman, 2008-actual)', firstYear:2024, lastYear:2025 } };

memberCountByClub['mancity-gb'] = null;

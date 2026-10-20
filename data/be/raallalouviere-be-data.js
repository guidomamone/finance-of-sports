const raallalouvierebeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Chiffre d\'affaires', normalizedCategory:'lump_football_operations', amountNative:4.615173, disclosureLevel:'aggregated' },
    { rawLabel:'Autres produits d\'exploitation', normalizedCategory:'other_income', amountNative:1.536293, disclosureLevel:'aggregated' },
    { rawLabel:'Produits d\'exploitation non récurrents', normalizedCategory:'other_income', amountNative:0.145299, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Marge brute d\'exploitation', normalizedCategory:'lump_football_operations', amountNative:0.430494, disclosureLevel:'aggregated' },
  ],
};
const raallalouvierebeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Achats', normalizedCategory:'other_expenses', amountNative:-0.511554, disclosureLevel:'aggregated' },
    { rawLabel:'Stocks: réduction (augmentation)', normalizedCategory:'other_expenses', amountNative:-0.013739, disclosureLevel:'aggregated' },
    { rawLabel:'Services et biens divers', normalizedCategory:'other_expenses', amountNative:-3.72582, disclosureLevel:'aggregated' },
    { rawLabel:'Rémunérations, charges sociales et pensions', normalizedCategory:'wages_squad', amountNative:-3.535934, disclosureLevel:'aggregated' },
    { rawLabel:'Amortissements et réductions de valeur sur frais d\'établissement, sur immobilisations incorporelles et corporelles', normalizedCategory:'depreciation', amountNative:-0.558871, disclosureLevel:'aggregated' },
    { rawLabel:'Réductions de valeur sur stocks, sur commandes en cours d\'exécution et sur créances commerciales: dotations (reprises)', normalizedCategory:'other_expenses', amountNative:-0.017902, disclosureLevel:'aggregated' },
    { rawLabel:'Autres charges d\'exploitation', normalizedCategory:'other_expenses', amountNative:-0.09718, disclosureLevel:'aggregated' },
    { rawLabel:'Charges d\'exploitation non récurrentes', normalizedCategory:'exceptional_items', amountNative:-0.003193, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Rémunérations, charges sociales et pensions', normalizedCategory:'wages_squad', amountNative:-0.578307, disclosureLevel:'aggregated' },
    { rawLabel:'Amortissements et réductions de valeur sur frais d\'établissement, sur immobilisations incorporelles et corporelles', normalizedCategory:'depreciation', amountNative:-0.086931, disclosureLevel:'aggregated' },
    { rawLabel:'Autres charges d\'exploitation', normalizedCategory:'other_expenses', amountNative:-0.002507, disclosureLevel:'aggregated' },
  ],
};
const raallalouvierebeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'raallalouviere-be-wf-2024-2025-2677fac4',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.029283, tax:-0.010503,
    extraRows: [
      {label:'Autres produits financiers', value:0.120161},
      {label:'Autres charges financières', value:-0.090878},
      {label:'Impôts', value:-0.010503},
    ],
    sinDesglose: [
      {renglon:'Chiffre d\'affaires', lado:'revenue', importe:4.615173, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:1.630864,
    officialTotalRevenue:6.296765, officialTotalExpenses:8.464193, officialPAT:-2.148648,
  },
  2018: {
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'raallalouviere-be-jaarrekening-2018-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.001578, tax:-0.000178,
    extraRows: [
      {label:'Charges financières récurrentes', value:-0.001578},
      {label:'Impôts sur le résultat', value:-0.000178},
    ],
    sinDesglose: [
      {renglon:'Marge brute d\'exploitation', lado:'revenue', importe:0.430494, motivo:'Claude 2026-10-20 (Onboarding 5): precedente Patro Eisden 2021: Brutomarge -> lump_football_operations'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.430494, officialTotalExpenses:0.667745, officialPAT:-0.239007,
  },
};
const raallalouvierebePresupuestoOverlayByYear = {};

const raallalouvierebePasesData = [];
const raallalouvierebeResultadosData = {};
const raallalouvierebeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['raallalouviere-be'] = {
  revenueLinesByYear: raallalouvierebeRevenueLinesByYear, expenseLinesByYear: raallalouvierebeExpenseLinesByYear,
  fiscalYearMeta: raallalouvierebeFiscalYearMeta, pasesData: raallalouvierebePasesData,
  resultadosData: raallalouvierebeResultadosData, titulosData: raallalouvierebeTitulosData,
  presupuestoOverlayByYear: raallalouvierebePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'raallalouviere-be-wf-2024-2025-2677fac4': {
    id:'raallalouviere-be-wf-2024-2025-2677fac4', clubId:'raallalouviere-be',
    title:'RAAL La Louvière SC — wf-2024-2025-2677fac4 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'raallalouviere-be-jaarrekening-2018-06-30-individual': {
    id:'raallalouviere-be-jaarrekening-2018-06-30-individual', clubId:'raallalouviere-be',
    title:'RAAL La Louvière SC — jaarrekening-2018-06-30-individual (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    publicNote:'Primer ejercicio de la sociedad: del 12/05/2017 al 30/06/2018 (14 meses).',
  },
});

memberCountByClub['raallalouviere-be'] = null;

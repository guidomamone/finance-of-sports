const raallalouvierebeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Chiffre d\'affaires', normalizedCategory:'lump_football_operations', amountNative:4.615173, disclosureLevel:'aggregated' },
    { rawLabel:'Autres produits d\'exploitation', normalizedCategory:'other_income', amountNative:1.536293, disclosureLevel:'aggregated' },
    { rawLabel:'Produits d\'exploitation non récurrents', normalizedCategory:'other_income', amountNative:0.145299, disclosureLevel:'aggregated' },
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
});

memberCountByClub['raallalouviere-be'] = null;

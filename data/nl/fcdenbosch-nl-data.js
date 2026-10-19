const fcdenboschnlRevenueLinesByYear = {
  2025: [
    { rawLabel:'Netto-omzet', normalizedCategory:'lump_football_operations', amountNative:5.133797, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijving en resultaat vergoedingssommen', normalizedCategory:'player_sales', amountNative:0.405859, disclosureLevel:'aggregated' },
  ],
};
const fcdenboschnlExpenseLinesByYear = {
  2025: [
    { rawLabel:'Personeelskosten', normalizedCategory:'wages_squad', amountNative:-3.864955, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen', normalizedCategory:'depreciation', amountNative:-0.165585, disclosureLevel:'aggregated' },
    { rawLabel:'Overige bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-2.845217, disclosureLevel:'aggregated' },
  ],
};
const fcdenboschnlFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'fcdenbosch-nl-wf-2024-2025-c4a5aec0',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.057953, tax:0,
    extraRows: [
      {label:'Financië le baten en lasten', value:-0.057953},
      {label:'Belastingen', value:null},
    ],
    sinDesglose: [
      {renglon:'Netto-omzet', lado:'revenue', importe:5.133797, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:5.539656, officialTotalExpenses:6.875757, officialPAT:-1.394054,
  },
};
const fcdenboschnlPresupuestoOverlayByYear = {};

const fcdenboschnlPasesData = [];
const fcdenboschnlResultadosData = {};
const fcdenboschnlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fcdenbosch-nl'] = {
  revenueLinesByYear: fcdenboschnlRevenueLinesByYear, expenseLinesByYear: fcdenboschnlExpenseLinesByYear,
  fiscalYearMeta: fcdenboschnlFiscalYearMeta, pasesData: fcdenboschnlPasesData,
  resultadosData: fcdenboschnlResultadosData, titulosData: fcdenboschnlTitulosData,
  presupuestoOverlayByYear: fcdenboschnlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fcdenbosch-nl-wf-2024-2025-c4a5aec0': {
    id:'fcdenbosch-nl-wf-2024-2025-c4a5aec0', clubId:'fcdenbosch-nl',
    title:'FC Den Bosch B.V. — wf-2024-2025-c4a5aec0 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['fcdenbosch-nl'] = null;

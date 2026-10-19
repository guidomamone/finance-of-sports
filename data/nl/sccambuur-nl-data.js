const sccambuurnlRevenueLinesByYear = {
  2025: [
    { rawLabel:'Netto-omzet', normalizedCategory:'lump_football_operations', amountNative:10.544, disclosureLevel:'aggregated' },
    { rawLabel:'Vergoedingssommen', normalizedCategory:'player_sales', amountNative:0.075, disclosureLevel:'aggregated' },
  ],
};
const sccambuurnlExpenseLinesByYear = {
  2025: [
    { rawLabel:'Kostprijs van de omzet', normalizedCategory:'other_expenses', amountNative:-0.181, disclosureLevel:'aggregated' },
    { rawLabel:'Lonen en salarissen', normalizedCategory:'wages_squad', amountNative:-7.364, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen', normalizedCategory:'depreciation', amountNative:-0.491, disclosureLevel:'aggregated' },
    { rawLabel:'Overige bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-5.579, disclosureLevel:'aggregated' },
  ],
};
const sccambuurnlFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'sccambuur-nl-jaarverslag-sc-cambuur-2024-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.531, tax:-0.068,
    extraRows: [
      {label:'Financiële baten', value:0.011},
      {label:'Financiële lasten', value:-0.542},
      {label:'Belastingen', value:-0.068},
    ],
    sinDesglose: [
      {renglon:'Netto-omzet', lado:'revenue', importe:10.544, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:10.619, officialTotalExpenses:13.615, officialPAT:-3.595,
  },
};
const sccambuurnlPresupuestoOverlayByYear = {};

const sccambuurnlPasesData = [];
const sccambuurnlResultadosData = {};
const sccambuurnlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sccambuur-nl'] = {
  revenueLinesByYear: sccambuurnlRevenueLinesByYear, expenseLinesByYear: sccambuurnlExpenseLinesByYear,
  fiscalYearMeta: sccambuurnlFiscalYearMeta, pasesData: sccambuurnlPasesData,
  resultadosData: sccambuurnlResultadosData, titulosData: sccambuurnlTitulosData,
  presupuestoOverlayByYear: sccambuurnlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sccambuur-nl-jaarverslag-sc-cambuur-2024-2025': {
    id:'sccambuur-nl-jaarverslag-sc-cambuur-2024-2025', clubId:'sccambuur-nl',
    title:'SC Cambuur-Leeuwarden B.V. — Jaarverslag-SC-Cambuur-2024-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['sccambuur-nl'] = null;

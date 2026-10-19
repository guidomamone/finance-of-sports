const excelsiornlRevenueLinesByYear = {
  2024: [
    { rawLabel:'netto-omzet', normalizedCategory:'lump_football_operations', amountNative:10.082985, disclosureLevel:'aggregated' },
  ],
};
const excelsiornlExpenseLinesByYear = {
  2024: [
    { rawLabel:'lonen en salarissen', normalizedCategory:'wages_squad', amountNative:-4.879159, disclosureLevel:'aggregated' },
    { rawLabel:'sociale lasten', normalizedCategory:'wages_squad', amountNative:-0.690253, disclosureLevel:'aggregated' },
    { rawLabel:'pensioenen', normalizedCategory:'wages_squad', amountNative:-0.052281, disclosureLevel:'aggregated' },
    { rawLabel:'afschrijving vaste activa', normalizedCategory:'depreciation', amountNative:-0.402815, disclosureLevel:'aggregated' },
    { rawLabel:'overige bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-4.101825, disclosureLevel:'aggregated' },
  ],
};
const excelsiornlFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'excelsior-nl-jaarverslag-2023-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.090304, tax:0.409864,
    extraRows: [
      {label:'financiële baten en lasten', value:-0.018713},
      {label:'resultaat deelneming', value:0.109017},
      {label:'belastingen', value:0.409864},
    ],
    sinDesglose: [
      {renglon:'netto-omzet', lado:'revenue', importe:10.082985, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:10.082985, officialTotalExpenses:10.126333, officialPAT:0.45682,
  },
};
const excelsiornlPresupuestoOverlayByYear = {};

const excelsiornlPasesData = [];
const excelsiornlResultadosData = {};
const excelsiornlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['excelsior-nl'] = {
  revenueLinesByYear: excelsiornlRevenueLinesByYear, expenseLinesByYear: excelsiornlExpenseLinesByYear,
  fiscalYearMeta: excelsiornlFiscalYearMeta, pasesData: excelsiornlPasesData,
  resultadosData: excelsiornlResultadosData, titulosData: excelsiornlTitulosData,
  presupuestoOverlayByYear: excelsiornlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'excelsior-nl-jaarverslag-2023-2024': {
    id:'excelsior-nl-jaarverslag-2023-2024', clubId:'excelsior-nl',
    title:'Stichting Betaald Voetbal Excelsior — Excelsior-Jaarverslag-2023-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['excelsior-nl'] = null;

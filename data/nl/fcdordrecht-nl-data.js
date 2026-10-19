const fcdordrechtnlRevenueLinesByYear = {
  2025: [
    { rawLabel:'Netto-omzet', normalizedCategory:'lump_football_operations', amountNative:4.680373, disclosureLevel:'aggregated' },
    { rawLabel:'Resultaat vergoedingssommen', normalizedCategory:'player_sales', amountNative:1.156388, disclosureLevel:'aggregated' },
  ],
};
const fcdordrechtnlExpenseLinesByYear = {
  2025: [
    { rawLabel:'Lonen en salarissen', normalizedCategory:'wages_squad', amountNative:-2.008539, disclosureLevel:'aggregated' },
    { rawLabel:'Sociale lasten', normalizedCategory:'wages_squad', amountNative:-0.415736, disclosureLevel:'aggregated' },
    { rawLabel:'Pensioenlasten', normalizedCategory:'wages_squad', amountNative:-0.003541, disclosureLevel:'aggregated' },
    { rawLabel:'Overige personeelskosten', normalizedCategory:'admin_general_expense', amountNative:-0.855319, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen', normalizedCategory:'depreciation', amountNative:-0.164875, disclosureLevel:'aggregated' },
    { rawLabel:'Huisvestingskosten', normalizedCategory:'admin_general_expense', amountNative:-0.442573, disclosureLevel:'aggregated' },
    { rawLabel:'Kantoorkosten', normalizedCategory:'admin_general_expense', amountNative:-0.3714, disclosureLevel:'aggregated' },
    { rawLabel:'Verkoopkosten', normalizedCategory:'admin_general_expense', amountNative:-0.861632, disclosureLevel:'aggregated' },
    { rawLabel:'Algemene kosten', normalizedCategory:'admin_general_expense', amountNative:-0.451614, disclosureLevel:'aggregated' },
  ],
};
const fcdordrechtnlFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'fcdordrecht-nl-wf-2024-2025-602d6b96',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.044471, tax:0,
    extraRows: [
      {label:'Financiële baten en lasten', value:-0.044471},
      {label:'Belastingen', value:0},
    ],
    sinDesglose: [
      {renglon:'Netto-omzet', lado:'revenue', importe:4.680373, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:5.836761, officialTotalExpenses:5.575229, officialPAT:0.217061,
  },
};
const fcdordrechtnlPresupuestoOverlayByYear = {};

const fcdordrechtnlPasesData = [];
const fcdordrechtnlResultadosData = {};
const fcdordrechtnlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fcdordrecht-nl'] = {
  revenueLinesByYear: fcdordrechtnlRevenueLinesByYear, expenseLinesByYear: fcdordrechtnlExpenseLinesByYear,
  fiscalYearMeta: fcdordrechtnlFiscalYearMeta, pasesData: fcdordrechtnlPasesData,
  resultadosData: fcdordrechtnlResultadosData, titulosData: fcdordrechtnlTitulosData,
  presupuestoOverlayByYear: fcdordrechtnlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fcdordrecht-nl-wf-2024-2025-602d6b96': {
    id:'fcdordrecht-nl-wf-2024-2025-602d6b96', clubId:'fcdordrecht-nl',
    title:'FC Dordrecht Holding B.V. — wf-2024-2025-602d6b96 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['fcdordrecht-nl'] = null;

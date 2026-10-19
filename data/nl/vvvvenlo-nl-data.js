const vvvvenlonlRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:5.718, disclosureLevel:'aggregated' },
    { rawLabel:'Resultaat vergoedingsommen', normalizedCategory:'player_sales', amountNative:0.166, disclosureLevel:'aggregated' },
  ],
};
const vvvvenlonlExpenseLinesByYear = {
  2025: [
    { rawLabel:'Personeelskosten', normalizedCategory:'wages_squad', amountNative:-3.783, disclosureLevel:'aggregated' },
    { rawLabel:'Verkoopkosten', normalizedCategory:'admin_general_expense', amountNative:-1.354, disclosureLevel:'aggregated' },
    { rawLabel:'Huisvestingskosten', normalizedCategory:'admin_general_expense', amountNative:-0.541, disclosureLevel:'aggregated' },
    { rawLabel:'Wedstrijd-trainingskosten', normalizedCategory:'match_organisation_expense', amountNative:-0.83, disclosureLevel:'aggregated' },
    { rawLabel:'Algemene kosten', normalizedCategory:'admin_general_expense', amountNative:-0.347, disclosureLevel:'aggregated' },
    { rawLabel:'Afsch. Materiele vaste activa', normalizedCategory:'depreciation', amountNative:-0.429, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijving vergoedingsommen', normalizedCategory:'player_amortisation', amountNative:-0.078, disclosureLevel:'aggregated' },
  ],
};
const vvvvenlonlFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'vvvvenlo-nl-jaarverslag-2024-2025-vvv-venlo-bv',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.082, tax:0,
    extraRows: [
      {label:'Rentelasten', value:-0.082},
      {label:'Vennootschapsbelasting', value:0},
    ],
    sinDesglose: [
      {renglon:'Omzet', lado:'revenue', importe:5.718, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:5.884, officialTotalExpenses:7.362, officialPAT:-1.56,
  },
};
const vvvvenlonlPresupuestoOverlayByYear = {};

const vvvvenlonlPasesData = [];
const vvvvenlonlResultadosData = {};
const vvvvenlonlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['vvvvenlo-nl'] = {
  revenueLinesByYear: vvvvenlonlRevenueLinesByYear, expenseLinesByYear: vvvvenlonlExpenseLinesByYear,
  fiscalYearMeta: vvvvenlonlFiscalYearMeta, pasesData: vvvvenlonlPasesData,
  resultadosData: vvvvenlonlResultadosData, titulosData: vvvvenlonlTitulosData,
  presupuestoOverlayByYear: vvvvenlonlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'vvvvenlo-nl-jaarverslag-2024-2025-vvv-venlo-bv': {
    id:'vvvvenlo-nl-jaarverslag-2024-2025-vvv-venlo-bv', clubId:'vvvvenlo-nl',
    title:'VVV-Venlo B.V. — jaarverslag_2024-2025_-_vvv-venlo_bv (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['vvvvenlo-nl'] = null;

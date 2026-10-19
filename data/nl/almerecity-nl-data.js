const almerecitynlRevenueLinesByYear = {
  2025: [
    { rawLabel:'Netto-omzet', normalizedCategory:'lump_football_operations', amountNative:15.391477, disclosureLevel:'aggregated' },
    { rawLabel:'Resultaat vergoedingssommen', normalizedCategory:'player_sales', amountNative:0.371884, disclosureLevel:'aggregated' },
  ],
};
const almerecitynlExpenseLinesByYear = {
  2025: [
    { rawLabel:'Lonen en salarissen', normalizedCategory:'wages_squad', amountNative:-9.325684, disclosureLevel:'aggregated' },
    { rawLabel:'Overige personeelskosten', normalizedCategory:'admin_general_expense', amountNative:-1.834305, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijving vaste activa', normalizedCategory:'depreciation', amountNative:-0.361672, disclosureLevel:'aggregated' },
    { rawLabel:'Overige bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-4.102788, disclosureLevel:'aggregated' },
  ],
};
const almerecitynlFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'almerecity-nl-wf-2024-2025-68975c13',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.141762, tax:0.00285,
    extraRows: [
      {label:'Rentebaten en soortgelijke opbrengsen', value:0},
      {label:'Rentelasten en soortgelijke kosten', value:-0.141762},
      {label:'Vennootschapsbelasting', value:0.00285},
    ],
    sinDesglose: [
      {renglon:'Netto-omzet', lado:'revenue', importe:15.391477, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:15.763361, officialTotalExpenses:15.624449, officialPAT:0,
  },
};
const almerecitynlPresupuestoOverlayByYear = {};

const almerecitynlPasesData = [];
const almerecitynlResultadosData = {};
const almerecitynlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['almerecity-nl'] = {
  revenueLinesByYear: almerecitynlRevenueLinesByYear, expenseLinesByYear: almerecitynlExpenseLinesByYear,
  fiscalYearMeta: almerecitynlFiscalYearMeta, pasesData: almerecitynlPasesData,
  resultadosData: almerecitynlResultadosData, titulosData: almerecitynlTitulosData,
  presupuestoOverlayByYear: almerecitynlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'almerecity-nl-wf-2024-2025-68975c13': {
    id:'almerecity-nl-wf-2024-2025-68975c13', clubId:'almerecity-nl',
    title:'Almere City FC B.V. — wf-2024-2025-68975c13 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['almerecity-nl'] = null;

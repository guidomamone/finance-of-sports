const alvercaptRevenueLinesByYear = {
  2022: [
    { rawLabel:'Vendas e serviços prestados', normalizedCategory:'lump_football_operations', amountNative:0.09357, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.037669, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'other_income', amountNative:0.02106, disclosureLevel:'aggregated' },
  ],
};
const alvercaptExpenseLinesByYear = {
  2022: [
    { rawLabel:'Fornecimentos e serviços externos', normalizedCategory:'admin_general_expense', amountNative:-0.580143, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com pessoal', normalizedCategory:'wages_squad', amountNative:-1.898159, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (aumentos/reduções)', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos', normalizedCategory:'other_expenses', amountNative:-0.041037, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos / reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.031442, disclosureLevel:'aggregated' },
  ],
};
const alvercaptFiscalYearMeta = {
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'alverca-pt-relatorio-contas-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.011537, tax:-0.006458,
    extraRows: [
      {label:'Gastos de financiamento (líquidos)', value:-0.011537},
      {label:'Imposto sobre o rendimento do período', value:-0.006458},
    ],
    sinDesglose: [
      {renglon:'Vendas e serviços prestados', lado:'revenue', importe:0.09357, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.1523, officialTotalExpenses:2.550781, officialPAT:-2.416477,
  },
};
const alvercaptPresupuestoOverlayByYear = {};

const alvercaptPasesData = [];
const alvercaptResultadosData = {};
const alvercaptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['alverca-pt'] = {
  revenueLinesByYear: alvercaptRevenueLinesByYear, expenseLinesByYear: alvercaptExpenseLinesByYear,
  fiscalYearMeta: alvercaptFiscalYearMeta, pasesData: alvercaptPasesData,
  resultadosData: alvercaptResultadosData, titulosData: alvercaptTitulosData,
  presupuestoOverlayByYear: alvercaptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'alverca-pt-relatorio-contas-2021-22': {
    id:'alverca-pt-relatorio-contas-2021-22', clubId:'alverca-pt',
    title:'Futebol Clube de Alverca - Futebol SAD — relatorio-contas-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['alverca-pt'] = null;

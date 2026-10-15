const estreladaamadoraptRevenueLinesByYear = {
  2023: [
    { rawLabel:'Vendas e serviços prestados', normalizedCategory:'lump_football_operations', amountNative:1.07693, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'other_income', amountNative:0.809546, disclosureLevel:'aggregated' },
  ],
};
const estreladaamadoraptExpenseLinesByYear = {
  2023: [
    { rawLabel:'Fornecimentos e serviços externos', normalizedCategory:'admin_general_expense', amountNative:-1.908991, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com pessoal', normalizedCategory:'wages_squad', amountNative:-2.849796, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos', normalizedCategory:'other_expenses', amountNative:-0.003577, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.022908, disclosureLevel:'aggregated' },
  ],
};
const estreladaamadoraptFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'estreladaamadora-pt-relatorio-contas-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:-0.006943,
    sinDesglose: [
      {renglon:'Vendas e serviços prestados', lado:'revenue', importe:1.07693, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.886476, officialTotalExpenses:4.785272, officialPAT:-2.905739,
  },
};
const estreladaamadoraptPresupuestoOverlayByYear = {};

const estreladaamadoraptPasesData = [];
const estreladaamadoraptResultadosData = {};
const estreladaamadoraptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['estreladaamadora-pt'] = {
  revenueLinesByYear: estreladaamadoraptRevenueLinesByYear, expenseLinesByYear: estreladaamadoraptExpenseLinesByYear,
  fiscalYearMeta: estreladaamadoraptFiscalYearMeta, pasesData: estreladaamadoraptPasesData,
  resultadosData: estreladaamadoraptResultadosData, titulosData: estreladaamadoraptTitulosData,
  presupuestoOverlayByYear: estreladaamadoraptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'estreladaamadora-pt-relatorio-contas-2022-23': {
    id:'estreladaamadora-pt-relatorio-contas-2022-23', clubId:'estreladaamadora-pt',
    title:'Club Football Estrela, SAD — relatorio-contas-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['estreladaamadora-pt'] = null;

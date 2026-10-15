const alvercaptRevenueLinesByYear = {
  2022: [
    { rawLabel:'Vendas e serviços prestados', normalizedCategory:'lump_football_operations', amountNative:0.09357, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.037669, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'other_income', amountNative:0.02106, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Vendas e serviços prestados', normalizedCategory:'lump_football_operations', amountNative:0.063878, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios a exploração', normalizedCategory:'other_income', amountNative:0.054882, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento obtidos', normalizedCategory:'other_income', amountNative:0.000011, disclosureLevel:'aggregated' },
    { rawLabel:'Alienações diretas de inscrição desportiva', normalizedCategory:'player_sales', amountNative:0.694021, disclosureLevel:'aggregated' },
    { rawLabel:'Correções relativas a períodos anteriores (rendimentos)', normalizedCategory:'other_income', amountNative:0.003093, disclosureLevel:'aggregated' },
    { rawLabel:'Recuperação de encargos', normalizedCategory:'other_income', amountNative:0.002949, disclosureLevel:'aggregated' },
    { rawLabel:'Outros não especificados', normalizedCategory:'other_income', amountNative:0.008474, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Vendas e serviços prestados', normalizedCategory:'lump_football_operations', amountNative:0.069051, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.063231, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos Suplementares', normalizedCategory:'other_income', amountNative:0.024154, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento obtidos', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Alienações diretas de inscrição desportiva', normalizedCategory:'player_sales', amountNative:0.5815, disclosureLevel:'aggregated' },
    { rawLabel:'Correções relativas a períodos anteriores (rendimentos)', normalizedCategory:'other_income', amountNative:0.004103, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'other_income', amountNative:0.0005, disclosureLevel:'aggregated' },
    { rawLabel:'Outros não especificados', normalizedCategory:'other_income', amountNative:0.012335, disclosureLevel:'aggregated' },
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
  2023: [
    { rawLabel:'Fornecimentos e serviços externos', normalizedCategory:'admin_general_expense', amountNative:-1.441895, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com o pessoal', normalizedCategory:'wages_squad', amountNative:-2.57562, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos', normalizedCategory:'other_expenses', amountNative:-0.038684, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.020295, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Serviços Especializados', normalizedCategory:'admin_general_expense', amountNative:-0.736232, disclosureLevel:'aggregated' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.067239, disclosureLevel:'aggregated' },
    { rawLabel:'Energia e Fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.007643, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e Estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.14016, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços Diversos', normalizedCategory:'other_expenses', amountNative:-0.220087, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com o pessoal', normalizedCategory:'wages_squad', amountNative:-2.437682, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.019459, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos', normalizedCategory:'other_expenses', amountNative:-0.347029, disclosureLevel:'aggregated' },
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
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'alverca-pt-relatorio-contas-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000029, tax:-0.007798,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.000029},
      {label:'Imposto sobre o rendimento do período', value:-0.007798},
    ],
    sinDesglose: [
      {renglon:'Vendas e serviços prestados', lado:'revenue', importe:0.063878, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.827308, officialTotalExpenses:4.076494, officialPAT:-3.257014,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'alverca-pt-relatorio-contas-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:-0.00983,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:0},
      {label:'Imposto sobre o rendimento do período', value:-0.00983},
    ],
    sinDesglose: [
      {renglon:'Vendas e serviços prestados', lado:'revenue', importe:0.069051, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.754874, officialTotalExpenses:3.975531, officialPAT:-3.230497,
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
  'alverca-pt-relatorio-contas-2022-23': {
    id:'alverca-pt-relatorio-contas-2022-23', clubId:'alverca-pt',
    title:'Futebol Clube de Alverca - Futebol SAD — relatorio-contas-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'alverca-pt-relatorio-contas-2023-24': {
    id:'alverca-pt-relatorio-contas-2023-24', clubId:'alverca-pt',
    title:'Futebol Clube de Alverca - Futebol SAD — relatorio-contas-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['alverca-pt'] = null;

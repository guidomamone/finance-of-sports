const casapiaptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Vendas:', normalizedCategory:'sponsorship_commercial', amountNative:0.05356, disclosureLevel:'aggregated' },
    { rawLabel:'Bilheteira', normalizedCategory:'matchday_competition', amountNative:0.262439, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocínios, publicidade e corporate', normalizedCategory:'sponsorship_commercial', amountNative:0.557069, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas IV, Premios de participação Competições', normalizedCategory:'broadcasting', amountNative:3.629792, disclosureLevel:'aggregated' },
    { rawLabel:'Lucros jogos Online e Placard', normalizedCategory:'other_income', amountNative:0.348881, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços Scouting', normalizedCategory:'other_income', amountNative:0.0105, disclosureLevel:'aggregated' },
    { rawLabel:'Cedência direitos desportivos', normalizedCategory:'player_sales', amountNative:2.618628, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.005129, disclosureLevel:'aggregated' },
    { rawLabel:'Correções relativas a exercícios anteriores', normalizedCategory:'other_income', amountNative:0.000938, disclosureLevel:'aggregated' },
    { rawLabel:'Acordo de gestão', normalizedCategory:'other_income', amountNative:12.85698, disclosureLevel:'aggregated' },
    { rawLabel:'Alienações - ativos intangíveis', normalizedCategory:'player_sales', amountNative:9.717752, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'other_income', amountNative:0.656869, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Bilheteira', normalizedCategory:'matchday_competition', amountNative:0.009415, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocínios, publicidade e corporate', normalizedCategory:'sponsorship_commercial', amountNative:0.161139, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas TV, Premios de participação Competições', normalizedCategory:'broadcasting', amountNative:0.584504, disclosureLevel:'aggregated' },
    { rawLabel:'Lucros jogos Online e Placard', normalizedCategory:'other_income', amountNative:0.28793, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços Scouting', normalizedCategory:'other_income', amountNative:0.0432, disclosureLevel:'aggregated' },
    { rawLabel:'Cedência direitos desportivos', normalizedCategory:'player_sales', amountNative:0.0097, disclosureLevel:'aggregated' },
    { rawLabel:'Subsidios à exploração', normalizedCategory:'other_income', amountNative:0.003673, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'other_income', amountNative:3.78568, disclosureLevel:'aggregated' },
  ],
};
const casapiaptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.083811, disclosureLevel:'aggregated' },
    { rawLabel:'Fornecimentos e serviços externos', normalizedCategory:'admin_general_expense', amountNative:-3.819986, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações dos orgão sociais', normalizedCategory:'admin_general_expense', amountNative:-0.086492, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-7.320722, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.617218, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.575659, disclosureLevel:'aggregated' },
    { rawLabel:'Equipamentos', normalizedCategory:'wages_squad', amountNative:-0.072393, disclosureLevel:'aggregated' },
    { rawLabel:'Correções relativas a exercícios anteriores', normalizedCategory:'exceptional_items', amountNative:-0.038398, disclosureLevel:'aggregated' },
    { rawLabel:'Quotizações', normalizedCategory:'admin_general_expense', amountNative:-0.151071, disclosureLevel:'aggregated' },
    { rawLabel:'Multas', normalizedCategory:'other_expenses', amountNative:-0.153802, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos não devidamente documentados', normalizedCategory:'other_expenses', amountNative:-0.004373, disclosureLevel:'aggregated' },
    { rawLabel:'Acordo de gestão', normalizedCategory:'other_expenses', amountNative:-16.808584, disclosureLevel:'aggregated' },
    { rawLabel:'Outros n/ aceites fiscalmente', normalizedCategory:'other_expenses', amountNative:-0.218858, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.672628, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de investimentos depreciáveis/amortizáveis (perdas/reversões)', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-0.256177, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.025058, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e Segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.06551, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.138642, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.080789, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços bancários', normalizedCategory:'admin_general_expense', amountNative:-0.00406, disclosureLevel:'aggregated' },
    { rawLabel:'Materias', normalizedCategory:'admin_general_expense', amountNative:-0.027292, disclosureLevel:'aggregated' },
    { rawLabel:'Energia e fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.019924, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.179567, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.067119, disclosureLevel:'aggregated' },
    { rawLabel:'Contencioso e notariado', normalizedCategory:'admin_general_expense', amountNative:-0.000681, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços diversos', normalizedCategory:'other_expenses', amountNative:-0.044615, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações dos orgão sociais', normalizedCategory:'admin_general_expense', amountNative:-0.103306, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-1.944016, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.076245, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.182969, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.196204, disclosureLevel:'aggregated' },
    { rawLabel:'Testes laboratoriais/COVID', normalizedCategory:'wages_squad', amountNative:-0.038197, disclosureLevel:'aggregated' },
    { rawLabel:'Equipamentos', normalizedCategory:'wages_squad', amountNative:-0.084688, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.037, disclosureLevel:'aggregated' },
    { rawLabel:'Correções relativas a exercícios anteriores', normalizedCategory:'exceptional_items', amountNative:-0.055685, disclosureLevel:'aggregated' },
    { rawLabel:'Quotizações', normalizedCategory:'admin_general_expense', amountNative:-0.001646, disclosureLevel:'aggregated' },
    { rawLabel:'Multas', normalizedCategory:'other_expenses', amountNative:-0.008799, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos não devidamente documentados', normalizedCategory:'other_expenses', amountNative:-0.042497, disclosureLevel:'aggregated' },
    { rawLabel:'Acordo de gestão', normalizedCategory:'other_expenses', amountNative:-1.135215, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de financiamento', normalizedCategory:'other_expenses', amountNative:-0.005095, disclosureLevel:'aggregated' },
    { rawLabel:'Outros n/ aceites fiscalmente', normalizedCategory:'other_expenses', amountNative:-0.002983, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.071816, disclosureLevel:'aggregated' },
  ],
};
const casapiaptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'casapia-pt-relatorio-contas-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.026893, tax:-0.048394,
    extraRows: [
      {label:'Juros e rendimentos similares obtidos', value:0.081241},
      {label:'Juros e gastos similares suportados', value:-0.108134},
      {label:'Imposto sobre o rendimento', value:-0.048394},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:30.718537, officialTotalExpenses:30.585597, officialPAT:0.019256,
  },
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'casapia-pt-relatorio-contas-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.005095, tax:-0.035287,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.005095},
      {label:'Imposto sobre o rendimento', value:-0.035287},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.885241, officialTotalExpenses:4.84011, officialPAT:-0.050939,
  },
};
const casapiaptPresupuestoOverlayByYear = {};

const casapiaptPasesData = [];
const casapiaptResultadosData = {};
const casapiaptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['casapia-pt'] = {
  revenueLinesByYear: casapiaptRevenueLinesByYear, expenseLinesByYear: casapiaptExpenseLinesByYear,
  fiscalYearMeta: casapiaptFiscalYearMeta, pasesData: casapiaptPasesData,
  resultadosData: casapiaptResultadosData, titulosData: casapiaptTitulosData,
  presupuestoOverlayByYear: casapiaptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'casapia-pt-relatorio-contas-2024-25': {
    id:'casapia-pt-relatorio-contas-2024-25', clubId:'casapia-pt',
    title:'Casa Pia — relatorio-contas-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'casapia-pt-relatorio-contas-2021-22': {
    id:'casapia-pt-relatorio-contas-2021-22', clubId:'casapia-pt',
    title:'Casa Pia — relatorio-contas-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['casapia-pt'] = null;

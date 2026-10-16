const famalicaoptRevenueLinesByYear = {
  2022: [
    { rawLabel:'Vendas de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.154177, disclosureLevel:'aggregated' },
    { rawLabel:'Ingressos', normalizedCategory:'matchday_competition', amountNative:0.17565, disclosureLevel:'aggregated' },
    { rawLabel:'Competições', normalizedCategory:'competition_bonus', amountNative:0.15935, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.389362, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocinios', normalizedCategory:'sponsorship_commercial', amountNative:0.267143, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos Clube', normalizedCategory:'broadcasting', amountNative:3.6, disclosureLevel:'aggregated' },
    { rawLabel:'Apostas desportivas', normalizedCategory:'other_income', amountNative:0.347894, disclosureLevel:'aggregated' },
    { rawLabel:'Outras receitas desportivas', normalizedCategory:'other_income', amountNative:0.460113, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.167736, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'player_sales', amountNative:5.141805, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Vendas de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.027361, disclosureLevel:'aggregated' },
    { rawLabel:'Ingressos', normalizedCategory:'matchday_competition', amountNative:0.06745, disclosureLevel:'aggregated' },
    { rawLabel:'Competições', normalizedCategory:'competition_bonus', amountNative:0.038254, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.390202, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.061751, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos Clube', normalizedCategory:'broadcasting', amountNative:0.7, disclosureLevel:'aggregated' },
    { rawLabel:'Apostas desportivas', normalizedCategory:'other_income', amountNative:0.204446, disclosureLevel:'aggregated' },
    { rawLabel:'Outras receitas desportivas', normalizedCategory:'other_income', amountNative:0.055525, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos e Abatimentos', normalizedCategory:'other_income', amountNative:-0.011405, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.188401, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'player_sales', amountNative:0.024638, disclosureLevel:'aggregated' },
  ],
};
const famalicaoptExpenseLinesByYear = {
  2022: [
    { rawLabel:'Custo das mercadorias vendidas', normalizedCategory:'admin_general_expense', amountNative:-0.109644, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços especializados', normalizedCategory:'admin_general_expense', amountNative:-1.028339, disclosureLevel:'aggregated' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.724745, disclosureLevel:'aggregated' },
    { rawLabel:'Energia e fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.125474, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações, estadas e transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.469293, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.521427, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, Higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.035165, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.0759, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-10.029738, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-1.010529, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.831429, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-1.120376, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de ação social', normalizedCategory:'wages_squad', amountNative:-0.076881, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com pessoal', normalizedCategory:'player_amortisation', amountNative:-0.502903, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:-0.00041, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (aumentos/reduções)', normalizedCategory:'admin_general_expense', amountNative:-0.0351, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.006895, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento concedidos', normalizedCategory:'other_expenses', amountNative:-0.00003, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos e perdas em inv. não financeiros', normalizedCategory:'other_expenses', amountNative:-0.087186, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos e perdas', normalizedCategory:'other_expenses', amountNative:-0.119427, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-1.23441, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Custo das mercadorias vendidas', normalizedCategory:'admin_general_expense', amountNative:-0.019172, disclosureLevel:'aggregated' },
    { rawLabel:'Fornecimentos e serviços externos', normalizedCategory:'admin_general_expense', amountNative:-0.951736, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-2.158421, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.111664, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.220708, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.155976, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de ação social', normalizedCategory:'wages_squad', amountNative:-0.023652, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com pessoal', normalizedCategory:'player_amortisation', amountNative:-0.153281, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:-0.133332, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.001453, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento concedi', normalizedCategory:'other_expenses', amountNative:-0.000006, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos e perdas', normalizedCategory:'other_expenses', amountNative:-0.227823, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.118354, disclosureLevel:'aggregated' },
  ],
};
const famalicaoptFiscalYearMeta = {
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'famalicao-pt-relatorio-contas-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.067547, tax:-0.057691,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-2.067547},
      {label:'Imposto sobre o rendimento do período', value:-0.057691},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:10.86323, officialTotalExpenses:18.145301, officialPAT:-9.40273,
  },
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'famalicao-pt-relatorio-contas-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.293679, tax:0.047468,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.293679},
      {label:'Imposto sobre o rendimento do período', value:0.047468},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.746623, officialTotalExpenses:4.275577, officialPAT:-2.775165,
  },
};
const famalicaoptPresupuestoOverlayByYear = {};

const famalicaoptPasesData = [];
const famalicaoptResultadosData = {};
const famalicaoptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['famalicao-pt'] = {
  revenueLinesByYear: famalicaoptRevenueLinesByYear, expenseLinesByYear: famalicaoptExpenseLinesByYear,
  fiscalYearMeta: famalicaoptFiscalYearMeta, pasesData: famalicaoptPasesData,
  resultadosData: famalicaoptResultadosData, titulosData: famalicaoptTitulosData,
  presupuestoOverlayByYear: famalicaoptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'famalicao-pt-relatorio-contas-2021-22': {
    id:'famalicao-pt-relatorio-contas-2021-22', clubId:'famalicao-pt',
    title:'Futebol Clube de Famalicão - Futebol S.A.D. — relatorio-contas-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'famalicao-pt-relatorio-contas-2018-19': {
    id:'famalicao-pt-relatorio-contas-2018-19', clubId:'famalicao-pt',
    title:'Futebol Clube de Famalicão - Futebol S.A.D. — relatorio-contas-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['famalicao-pt'] = null;

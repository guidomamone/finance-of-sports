const portimonenseptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Vendas', normalizedCategory:'sponsorship_commercial', amountNative:0.078818, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos suplementares', normalizedCategory:'other_income', amountNative:0.523798, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento', normalizedCategory:'other_income', amountNative:0.000033, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos e ganhos nos restantes ativos financeiros', normalizedCategory:'other_income', amountNative:0.000002, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos e ganhos em investimentos não financeiros', normalizedCategory:'player_sales', amountNative:7.02126, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.922934, disclosureLevel:'aggregated' },
    { rawLabel:'Bilheteira', normalizedCategory:'matchday_competition', amountNative:0.070054, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.498286, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos televisivos', normalizedCategory:'broadcasting', amountNative:0.45, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Vendas', normalizedCategory:'sponsorship_commercial', amountNative:0.05209, disclosureLevel:'aggregated' },
    { rawLabel:'Prestações de Serviços', normalizedCategory:'lump_football_operations', amountNative:4.387657, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.001783, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos suplementares', normalizedCategory:'other_income', amountNative:0.895791, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos e ganhos em investimentos não financeiros', normalizedCategory:'player_sales', amountNative:15.573673, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos e ganhos nos outros Inv.Financ.', normalizedCategory:'other_income', amountNative:0.014113, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:1.048493, disclosureLevel:'aggregated' },
  ],
};
const portimonenseptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias cons.', normalizedCategory:'other_expenses', amountNative:-0.051774, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-0.215159, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.014018, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.293355, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.077949, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.05632, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.141484, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.004841, disclosureLevel:'aggregated' },
    { rawLabel:'Ferramentas e utensílios de desgaste rápido', normalizedCategory:'admin_general_expense', amountNative:-0.011107, disclosureLevel:'aggregated' },
    { rawLabel:'Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.005413, disclosureLevel:'aggregated' },
    { rawLabel:'Artigos para oferta', normalizedCategory:'admin_general_expense', amountNative:-0.0005, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.007921, disclosureLevel:'aggregated' },
    { rawLabel:'Electricidade', normalizedCategory:'admin_general_expense', amountNative:-0.065915, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.116112, disclosureLevel:'aggregated' },
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.267416, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-1.067913, disclosureLevel:'aggregated' },
    { rawLabel:'Transportes de mercadorias', normalizedCategory:'admin_general_expense', amountNative:-0.003465, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.238601, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.023521, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.065141, disclosureLevel:'aggregated' },
    { rawLabel:'Contencioso e notariado', normalizedCategory:'admin_general_expense', amountNative:-0.002663, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de representação', normalizedCategory:'admin_general_expense', amountNative:-0.03442, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.026409, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-1.14342, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com o Pessoal', normalizedCategory:'wages_squad', amountNative:-6.304874, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos e perdas', normalizedCategory:'other_expenses', amountNative:-1.12515, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-2.210126, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.007865, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-0.340702, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.087421, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.23508, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.120975, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-1.409596, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.108935, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.00034, disclosureLevel:'aggregated' },
    { rawLabel:'Ferramentas e utensílios de desgaste rápido', normalizedCategory:'admin_general_expense', amountNative:-0.004736, disclosureLevel:'aggregated' },
    { rawLabel:'Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.008278, disclosureLevel:'aggregated' },
    { rawLabel:'Mat. Sinal e Segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.000379, disclosureLevel:'aggregated' },
    { rawLabel:'Materiais Covid', normalizedCategory:'admin_general_expense', amountNative:-0.000404, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.01022, disclosureLevel:'aggregated' },
    { rawLabel:'Electricidade', normalizedCategory:'admin_general_expense', amountNative:-0.040113, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.135662, disclosureLevel:'aggregated' },
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.258275, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-1.378296, disclosureLevel:'aggregated' },
    { rawLabel:'Transportes de mercadorias', normalizedCategory:'admin_general_expense', amountNative:-0.00488, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.288638, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.019163, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.036298, disclosureLevel:'aggregated' },
    { rawLabel:'Contencioso e notariado', normalizedCategory:'admin_general_expense', amountNative:-0.00012, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de representação', normalizedCategory:'admin_general_expense', amountNative:-0.031181, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.010666, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-1.576176, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações dos órgãos sociais', normalizedCategory:'admin_general_expense', amountNative:-0.882541, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-6.123402, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.738904, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros de acidentes de trabalho e doenças profissionais', normalizedCategory:'admin_general_expense', amountNative:-0.562563, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de acção social', normalizedCategory:'wages_squad', amountNative:-0.016528, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com o pessoal', normalizedCategory:'wages_squad', amountNative:-0.213148, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.008465, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos e perdas em investimentos não financeiros', normalizedCategory:'other_expenses', amountNative:-0.142237, disclosureLevel:'aggregated' },
    { rawLabel:'Outros juros', normalizedCategory:'other_expenses', amountNative:-0.031593, disclosureLevel:'aggregated' },
    { rawLabel:'Outras diferenças de câmbio desfavoráveis', normalizedCategory:'other_expenses', amountNative:-0.10375, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.449755, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-1.846219, disclosureLevel:'aggregated' },
  ],
};
const portimonenseptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'portimonense-pt-relatorio-contas-24-25-assinado',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.366821, tax:-0.329269,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.366821},
      {label:'Imposto sobre o rendimento do período', value:-0.329269},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:9.565184, officialTotalExpenses:13.574984, officialPAT:-4.70589,
  },
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'portimonense-pt-relatorio-contas-21-22-assinado',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.003153, tax:-0.335391,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.003153},
      {label:'Imposto sobre o rendimento do período', value:-0.335391},
    ],
    sinDesglose: [
      {renglon:'Prestações de Serviços', lado:'revenue', importe:4.387657, motivo:'Claude 2026-10-16 (revisado): el renglón se reemplaza por bilheteira, publicidade y TV con ajustes \'fila\' (cuadro de gestión, cierra exacto).'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:21.9736, officialTotalExpenses:17.233504, officialPAT:4.401551,
  },
};
const portimonenseptPresupuestoOverlayByYear = {};

const portimonenseptPasesData = [];
const portimonenseptResultadosData = {};
const portimonenseptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['portimonense-pt'] = {
  revenueLinesByYear: portimonenseptRevenueLinesByYear, expenseLinesByYear: portimonenseptExpenseLinesByYear,
  fiscalYearMeta: portimonenseptFiscalYearMeta, pasesData: portimonenseptPasesData,
  resultadosData: portimonenseptResultadosData, titulosData: portimonenseptTitulosData,
  presupuestoOverlayByYear: portimonenseptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'portimonense-pt-relatorio-contas-24-25-assinado': {
    id:'portimonense-pt-relatorio-contas-24-25-assinado', clubId:'portimonense-pt',
    title:'Portimonense Futebol, SAD — Relatorio-Contas-24-25_assinado (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'portimonense-pt-relatorio-contas-21-22-assinado': {
    id:'portimonense-pt-relatorio-contas-21-22-assinado', clubId:'portimonense-pt',
    title:'Portimonense Futebol, SAD — Relatorio-Contas-21-22_assinado (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['portimonense-pt'] = null;

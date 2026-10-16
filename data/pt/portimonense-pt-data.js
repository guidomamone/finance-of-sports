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
});

memberCountByClub['portimonense-pt'] = null;

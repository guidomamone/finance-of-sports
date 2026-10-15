const santaclaraptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:0.388372, disclosureLevel:'aggregated' },
    { rawLabel:'Ingressos para Jogos', normalizedCategory:'matchday_competition', amountNative:0.520033, disclosureLevel:'aggregated' },
    { rawLabel:'Apostas Desportivas e Placard', normalizedCategory:'other_income', amountNative:0.339215, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.224859, disclosureLevel:'aggregated' },
    { rawLabel:'Prémio Participação', normalizedCategory:'competition_bonus', amountNative:0.237526, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos Televisivos', normalizedCategory:'broadcasting', amountNative:3.6, disclosureLevel:'aggregated' },
    { rawLabel:'Cedência por empréstimo de Direitos Desportivos', normalizedCategory:'player_sales', amountNative:0.347472, disclosureLevel:'aggregated' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0.0015, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:1.159475, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de Pronto Pagamentos Obridos', normalizedCategory:'other_income', amountNative:0.000001, disclosureLevel:'aggregated' },
    { rawLabel:'Alienação de Ativos Intangíveis', normalizedCategory:'other_income', amountNative:0.582477, disclosureLevel:'aggregated' },
    { rawLabel:'Alienação de Ativos Tangíveis', normalizedCategory:'other_income', amountNative:0.000862, disclosureLevel:'aggregated' },
    { rawLabel:'Correções Relativas a Períodos Anteriores', normalizedCategory:'other_income', amountNative:0.012021, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.209661, disclosureLevel:'aggregated' },
    { rawLabel:'Juros e Outros Rendimentos Similares', normalizedCategory:'other_income', amountNative:0.033375, disclosureLevel:'aggregated' },
  ],
};
const santaclaraptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.378448, disclosureLevel:'aggregated' },
    { rawLabel:'Subcontratos', normalizedCategory:'admin_general_expense', amountNative:-0.284963, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-0.618158, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.006161, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.154296, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.001, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.139428, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.120247, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.243097, disclosureLevel:'aggregated' },
    { rawLabel:'Ferramentas e utensílios de desgaste rápido', normalizedCategory:'admin_general_expense', amountNative:-0.076196, disclosureLevel:'aggregated' },
    { rawLabel:'Livros e documentação técnica', normalizedCategory:'admin_general_expense', amountNative:-0.0005, disclosureLevel:'aggregated' },
    { rawLabel:'Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.006673, disclosureLevel:'aggregated' },
    { rawLabel:'Artigos para oferta', normalizedCategory:'admin_general_expense', amountNative:-0.000035, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.013852, disclosureLevel:'aggregated' },
    { rawLabel:'Eletricidade', normalizedCategory:'admin_general_expense', amountNative:-0.019026, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.020799, disclosureLevel:'aggregated' },
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.008422, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.002041, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-1.563734, disclosureLevel:'aggregated' },
    { rawLabel:'Transportes de pessoal', normalizedCategory:'match_organisation_expense', amountNative:-0.017719, disclosureLevel:'aggregated' },
    { rawLabel:'Transportes de mercadorias', normalizedCategory:'admin_general_expense', amountNative:-0.002744, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.566195, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.03961, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.010418, disclosureLevel:'aggregated' },
    { rawLabel:'Contencioso e notariado', normalizedCategory:'admin_general_expense', amountNative:-0.07307, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de representação', normalizedCategory:'admin_general_expense', amountNative:-0.063915, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.030451, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações dos órgãos sociais', normalizedCategory:'admin_general_expense', amountNative:-0.280628, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-11.611976, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.362835, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre as remunerações', normalizedCategory:'wages_squad', amountNative:-1.282908, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros de acidentes no trabalho e doenças profissionais', normalizedCategory:'admin_general_expense', amountNative:-0.942493, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com o pessoal, dos quais:', normalizedCategory:'wages_squad', amountNative:-1.684349, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:-0.236995, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (aumentos/ Reduções)', normalizedCategory:'admin_general_expense', amountNative:-0.471404, disclosureLevel:'aggregated' },
    { rawLabel:'IMI', normalizedCategory:'admin_general_expense', amountNative:-0.003043, disclosureLevel:'aggregated' },
    { rawLabel:'IUC', normalizedCategory:'admin_general_expense', amountNative:-0.000555, disclosureLevel:'aggregated' },
    { rawLabel:'Imposto de Selo', normalizedCategory:'admin_general_expense', amountNative:-0.056836, disclosureLevel:'aggregated' },
    { rawLabel:'Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.007956, disclosureLevel:'aggregated' },
    { rawLabel:'Desconto Pronto Pagamento', normalizedCategory:'other_expenses', amountNative:-0.000001, disclosureLevel:'aggregated' },
    { rawLabel:'Jogadores', normalizedCategory:'wages_squad', amountNative:-0.041335, disclosureLevel:'aggregated' },
    { rawLabel:'Correções Relativas a períodos anteriores', normalizedCategory:'exceptional_items', amountNative:-0.040646, disclosureLevel:'aggregated' },
    { rawLabel:'Donativos', normalizedCategory:'other_expenses', amountNative:-0.07822, disclosureLevel:'aggregated' },
    { rawLabel:'Quotizações', normalizedCategory:'admin_general_expense', amountNative:-0.053782, disclosureLevel:'aggregated' },
    { rawLabel:'Diferença de câmbio desfavoráveis', normalizedCategory:'admin_general_expense', amountNative:-0.000972, disclosureLevel:'aggregated' },
    { rawLabel:'Multas e penalidades', normalizedCategory:'other_expenses', amountNative:-0.065239, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos não devidamente documentados', normalizedCategory:'other_expenses', amountNative:-0.157836, disclosureLevel:'aggregated' },
    { rawLabel:'Juros de Mora e compensatórios', normalizedCategory:'other_expenses', amountNative:-0.006905, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.00445, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'player_amortisation', amountNative:-1.397239, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de ativos depreciáveis/amortizáveis (perdas/reversões)', normalizedCategory:'other_amortisation', amountNative:-0.011195, disclosureLevel:'aggregated' },
  ],
};
const santaclaraptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'santaclara-pt-relatorio-contas-sad-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.289446, tax:1.652448,
    extraRows: [
      {label:'Juros e rendimentos similares obtidos', value:null},
      {label:'Juros e gastos similares suportados', value:-0.289446},
      {label:'Imposto sobre o rendimento do período', value:1.652448},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:8.656848, officialTotalExpenses:23.22035, officialPAT:-13.241139,
  },
};
const santaclaraptPresupuestoOverlayByYear = {};

const santaclaraptPasesData = [];
const santaclaraptResultadosData = {};
const santaclaraptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['santaclara-pt'] = {
  revenueLinesByYear: santaclaraptRevenueLinesByYear, expenseLinesByYear: santaclaraptExpenseLinesByYear,
  fiscalYearMeta: santaclaraptFiscalYearMeta, pasesData: santaclaraptPasesData,
  resultadosData: santaclaraptResultadosData, titulosData: santaclaraptTitulosData,
  presupuestoOverlayByYear: santaclaraptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'santaclara-pt-relatorio-contas-sad-2024-25': {
    id:'santaclara-pt-relatorio-contas-sad-2024-25', clubId:'santaclara-pt',
    title:'Santa Clara Açores - Futebol, S.A.D. — relatorio-contas-sad-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['santaclara-pt'] = null;

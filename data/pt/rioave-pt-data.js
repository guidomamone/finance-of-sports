const rioaveptRevenueLinesByYear = {
  2018: [
    { rawLabel:'Bilheteira', normalizedCategory:'matchday_competition', amountNative:0.367305, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos Televisivos', normalizedCategory:'broadcasting', amountNative:2.2, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocínio e Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.164129, disclosureLevel:'aggregated' },
    { rawLabel:'Atividades Comerciais', normalizedCategory:'sponsorship_commercial', amountNative:0.114175, disclosureLevel:'aggregated' },
    { rawLabel:'O.Lucros de Exploração', normalizedCategory:'other_income', amountNative:0.000102, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à Exploração', normalizedCategory:'other_income', amountNative:0.272402, disclosureLevel:'aggregated' },
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.002, disclosureLevel:'aggregated' },
    { rawLabel:'Participação nas Competições Europeias', normalizedCategory:'competition_bonus', amountNative:0.02628, disclosureLevel:'aggregated' },
    { rawLabel:'Participação nas Competições Nacionais', normalizedCategory:'competition_bonus', amountNative:0.267927, disclosureLevel:'aggregated' },
    { rawLabel:'Apostas Desportivas', normalizedCategory:'other_income', amountNative:0.122794, disclosureLevel:'aggregated' },
    { rawLabel:'Cedência de Jogadores', normalizedCategory:'player_sales', amountNative:0.035, disclosureLevel:'aggregated' },
    { rawLabel:'Venda de Direitos Desportivos', normalizedCategory:'player_sales', amountNative:3.07065, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações AT', normalizedCategory:'other_income', amountNative:0.014033, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.136702, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Rendimentos Similares', normalizedCategory:'other_income', amountNative:0.145689, disclosureLevel:'aggregated' },
  ],
};
const rioaveptExpenseLinesByYear = {
  2018: [
    { rawLabel:'Subcontratos', normalizedCategory:'admin_general_expense', amountNative:-0.087766, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-0.073071, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.140899, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.360508, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos honorários a agentes desportivos', normalizedCategory:'other_expenses', amountNative:-0.50836, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços especializados', normalizedCategory:'other_expenses', amountNative:-0.001378, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.08747, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços especializados', normalizedCategory:'other_expenses', amountNative:-0.057591, disclosureLevel:'aggregated' },
    { rawLabel:'Livros e Documentação Técnica', normalizedCategory:'admin_general_expense', amountNative:-0.024333, disclosureLevel:'aggregated' },
    { rawLabel:'Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.010446, disclosureLevel:'aggregated' },
    { rawLabel:'Artigos para oferta', normalizedCategory:'admin_general_expense', amountNative:-0.02182, disclosureLevel:'aggregated' },
    { rawLabel:'Equipamento Desportivo', normalizedCategory:'other_expenses', amountNative:-0.073413, disclosureLevel:'aggregated' },
    { rawLabel:'Medicamentos e Artigos de Saúde', normalizedCategory:'admin_general_expense', amountNative:-0.055591, disclosureLevel:'aggregated' },
    { rawLabel:'Outros materiais', normalizedCategory:'admin_general_expense', amountNative:-0.013405, disclosureLevel:'aggregated' },
    { rawLabel:'Electricidade', normalizedCategory:'admin_general_expense', amountNative:-0.055988, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.024756, disclosureLevel:'aggregated' },
    { rawLabel:'Outras energias e fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.000299, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.344759, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.057616, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.027677, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.009893, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.024343, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços diversos', normalizedCategory:'other_expenses', amountNative:-0.057617, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-4.395426, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.074194, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos s/ remunerações', normalizedCategory:'wages_squad', amountNative:-0.381574, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros de acidentes no trabalho e doenças profissionais', normalizedCategory:'admin_general_expense', amountNative:-0.399151, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos', normalizedCategory:'other_expenses', amountNative:-0.255267, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:-0.001599, disclosureLevel:'aggregated' },
    { rawLabel:'Quotizações/Inscrições', normalizedCategory:'match_organisation_expense', amountNative:-0.122144, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.020836, disclosureLevel:'aggregated' },
    { rawLabel:'Multas e Penalidades', normalizedCategory:'other_expenses', amountNative:-0.042792, disclosureLevel:'aggregated' },
    { rawLabel:'Abates', normalizedCategory:'exceptional_items', amountNative:-0.063833, disclosureLevel:'aggregated' },
    { rawLabel:'Donativos', normalizedCategory:'other_expenses', amountNative:-0.00022, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Gastos e Perdas', normalizedCategory:'other_expenses', amountNative:-0.030737, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Juros', normalizedCategory:'other_expenses', amountNative:-0.002516, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Gastos de Financiamento', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Ativos fixos tangíveis', normalizedCategory:'depreciation', amountNative:-0.163561, disclosureLevel:'aggregated' },
    { rawLabel:'Ativos intangíveis', normalizedCategory:'player_amortisation', amountNative:-1.256375, disclosureLevel:'aggregated' },
  ],
};
const rioaveptFiscalYearMeta = {
  2018: {
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'rioave-pt-relatorio-contas-2017-18',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.268983, tax:0,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.268983},
      {label:'Imposto sobre o rendimento do período', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:7.939188, officialTotalExpenses:9.265391, officialPAT:-1.659019,
  },
};
const rioaveptPresupuestoOverlayByYear = {};

const rioaveptPasesData = [];
const rioaveptResultadosData = {};
const rioaveptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rioave-pt'] = {
  revenueLinesByYear: rioaveptRevenueLinesByYear, expenseLinesByYear: rioaveptExpenseLinesByYear,
  fiscalYearMeta: rioaveptFiscalYearMeta, pasesData: rioaveptPasesData,
  resultadosData: rioaveptResultadosData, titulosData: rioaveptTitulosData,
  presupuestoOverlayByYear: rioaveptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rioave-pt-relatorio-contas-2017-18': {
    id:'rioave-pt-relatorio-contas-2017-18', clubId:'rioave-pt',
    title:'Rio Ave Futebol Clube – Futebol SAD — relatorio-contas-2017-18 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['rioave-pt'] = null;

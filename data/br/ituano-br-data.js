const ituanoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Direito de Transmissão de TV (FPF/CBF)', normalizedCategory:'broadcasting', amountNative:13.888289, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:8.228219, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de Jogos', normalizedCategory:'matchday_competition', amountNative:2.550598, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Incentivos, Doações e Loterias', normalizedCategory:'other_income', amountNative:2.598796, disclosureLevel:'detailed' },
    { rawLabel:'Cessão Temp. Direitos Federativos de Atletas (Empréstimo)', normalizedCategory:'player_sales', amountNative:1.671683, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas', normalizedCategory:'other_income', amountNative:1.048817, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.324055, disclosureLevel:'detailed' },
    { rawLabel:'Premiações em Campeonatos (FPF)', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Receita com Repasses de Direitos Federativos', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos Incidentes s/ Vendas e Serviços', normalizedCategory:'other_income', amountNative:-1.071240, disclosureLevel:'detailed' },
  ],
};

const ituanoExpenseLinesByYear = {
  2024: [
    { rawLabel:'Serviços de Terceiros (Prêmios, Mídia, Serviços de PJ e PF)', normalizedCategory:'match_organisation_expense', amountNative:-13.195087, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Pessoal, futebol profissional e de base (Salários e Encargos)', normalizedCategory:'wages_squad', amountNative:-9.712266, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Pessoal, administrativo (Salários e encargos)', normalizedCategory:'admin_general_expense', amountNative:-4.951629, disclosureLevel:'detailed' },
    { rawLabel:'Gastos c/ Atletas (Viagens, Uniformes, Taxas CBF-FPF)', normalizedCategory:'match_organisation_expense', amountNative:-2.414843, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas (Eventos e Partidas - Estádio e Alojamento)', normalizedCategory:'match_organisation_expense', amountNative:-2.029142, disclosureLevel:'detailed' },
    { rawLabel:'Gastos c/ Bens de terceiros (Acomodações, Estádio, Energia, Água e Telefone)', normalizedCategory:'admin_general_expense', amountNative:-1.284147, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros - Advogado, Contador, Assessores', normalizedCategory:'admin_general_expense', amountNative:-0.706377, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor (custo do programa)', normalizedCategory:'admin_general_expense', amountNative:-0.579749, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.562575, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e Taxas diversas', normalizedCategory:'admin_general_expense', amountNative:-0.119490, disclosureLevel:'detailed' },
    { rawLabel:'Água, Luz, Telefone e Internet (sede do Clube)', normalizedCategory:'admin_general_expense', amountNative:-0.056784, disclosureLevel:'detailed' },
  ],
};

const ituanoFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'ituano-br-relatorio-auditoria-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:10.847429, cash:0.054008,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.690259, tax:0,
    officialTotalRevenue:29.239217, officialTotalExpenses:35.612090, officialPAT:-7.063131,
  },
};

const ituanoPresupuestoOverlayByYear = {};

const ituanoPasesData = [];
const ituanoResultadosData = {};
const ituanoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['ituano-br'] = {
  revenueLinesByYear: ituanoRevenueLinesByYear, expenseLinesByYear: ituanoExpenseLinesByYear,
  fiscalYearMeta: ituanoFiscalYearMeta, pasesData: ituanoPasesData,
  resultadosData: ituanoResultadosData, titulosData: ituanoTitulosData,
  presupuestoOverlayByYear: ituanoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'ituano-br-relatorio-auditoria-2024': {
      id:'ituano-br-relatorio-auditoria-2024', clubId:'ituano-br',
      title:'Demonstrações Financeiras e Relatório de Auditoria, Exercício findo em 31 de dezembro de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://ituanofc.com.br/',
    },
});

gestionesByClub['ituano-br'] = {
    sinconfirmar: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
  };

memberCountByClub['ituano-br'] = null;

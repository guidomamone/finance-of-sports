const botafogospBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Cotas de Participação', normalizedCategory:'competition_bonus', amountNative:23.657248, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios e Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:3.793653, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:2.835215, disclosureLevel:'detailed' },
    { rawLabel:'Transação de Atletas', normalizedCategory:'player_sales', amountNative:2.556087, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de Jogos', normalizedCategory:'matchday_competition', amountNative:4.588867, disclosureLevel:'detailed' },
    { rawLabel:'Receita com Eventos e Shows', normalizedCategory:'stadium_other', amountNative:0.768144, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Aluguel', normalizedCategory:'stadium_other', amountNative:2.263418, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (premiações, Nota 21-vi)', normalizedCategory:'competition_bonus', amountNative:0.284288, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Transmissão', normalizedCategory:'broadcasting', amountNative:4.880000, disclosureLevel:'detailed' },
    { rawLabel:'Impostos Incidentes sobre Receitas (TEF)', normalizedCategory:'other_income', amountNative:-2.281858, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Sócio Torcedor (dedução da receita bruta)', normalizedCategory:'member_dues', amountNative:-0.303834, disclosureLevel:'detailed' },
    { rawLabel:'Repasse de Arrecadação de Jogos', normalizedCategory:'matchday_competition', amountNative:-0.022515, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de Uso de Superfície', normalizedCategory:'stadium_other', amountNative:0.332115, disclosureLevel:'detailed' },
    { rawLabel:'Bonificações', normalizedCategory:'competition_bonus', amountNative:0.237137, disclosureLevel:'detailed' },
    { rawLabel:'Ajuste a Valor Presente (AVP)', normalizedCategory:'other_income', amountNative:2.014732, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (Nota 27)', normalizedCategory:'other_income', amountNative:0.429964, disclosureLevel:'detailed' },
  ],
};

const botafogospBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Salários (plantel/comissão técnica)', normalizedCategory:'wages_squad', amountNative:-10.924615, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-5.636639, disclosureLevel:'detailed' },
    { rawLabel:'Férias (plantel)', normalizedCategory:'wages_squad', amountNative:-1.993080, disclosureLevel:'detailed' },
    { rawLabel:'INSS e FGTS (plantel)', normalizedCategory:'wages_squad', amountNative:-0.877373, disclosureLevel:'detailed' },
    { rawLabel:'Prêmios e Gratificações', normalizedCategory:'wages_squad', amountNative:-0.152000, disclosureLevel:'detailed' },
    { rawLabel:'13º Salário (plantel)', normalizedCategory:'wages_squad', amountNative:-1.009075, disclosureLevel:'detailed' },
    { rawLabel:'Alimentação (plantel)', normalizedCategory:'wages_squad', amountNative:-0.763787, disclosureLevel:'detailed' },
    { rawLabel:'Assistência Médica Odontológica', normalizedCategory:'wages_squad', amountNative:-0.023067, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de Direito de Jogadores', normalizedCategory:'player_amortisation', amountNative:-0.331506, disclosureLevel:'detailed' },
    { rawLabel:'Luvas Contratuais', normalizedCategory:'wages_squad', amountNative:-1.191683, disclosureLevel:'detailed' },
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-1.272313, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de Atletas e Empréstimos', normalizedCategory:'player_amortisation', amountNative:-3.890204, disclosureLevel:'detailed' },
    { rawLabel:'Outros Custos (com atletas e comissão técnica)', normalizedCategory:'wages_squad', amountNative:-0.263408, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Campeonato Estadual', normalizedCategory:'match_organisation_expense', amountNative:-2.305812, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Campeonato Nacional', normalizedCategory:'match_organisation_expense', amountNative:-2.926585, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Futebol Base', normalizedCategory:'youth_other_sports_expense', amountNative:-0.412463, disclosureLevel:'detailed' },
    { rawLabel:'Outros Custos com Futebol', normalizedCategory:'match_organisation_expense', amountNative:-2.981436, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Eventos e Shows', normalizedCategory:'admin_general_expense', amountNative:-0.419036, disclosureLevel:'detailed' },
    { rawLabel:'Salários (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-1.727666, disclosureLevel:'detailed' },
    { rawLabel:'INSS e FGTS (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.997701, disclosureLevel:'detailed' },
    { rawLabel:'Férias (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.629163, disclosureLevel:'detailed' },
    { rawLabel:'13º Salário (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.107875, disclosureLevel:'detailed' },
    { rawLabel:'Alimentação (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.293466, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas (Nota 23, pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.455270, disclosureLevel:'detailed' },
    { rawLabel:'Bens de Pequeno Valor', normalizedCategory:'admin_general_expense', amountNative:-0.040118, disclosureLevel:'detailed' },
    { rawLabel:'Contingências', normalizedCategory:'admin_general_expense', amountNative:-0.332105, disclosureLevel:'detailed' },
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.907065, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-0.633132, disclosureLevel:'detailed' },
    { rawLabel:'Material de Escritório, Limpeza e Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.117516, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade e Propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.126434, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.985532, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor (despesa administrativa)', normalizedCategory:'admin_general_expense', amountNative:-0.506276, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.501600, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Alimentação (Nota 24)', normalizedCategory:'admin_general_expense', amountNative:-0.412307, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas (Nota 24)', normalizedCategory:'admin_general_expense', amountNative:-0.784155, disclosureLevel:'detailed' },
    { rawLabel:'IPVA', normalizedCategory:'admin_general_expense', amountNative:-0.006417, disclosureLevel:'detailed' },
    { rawLabel:'ICMS', normalizedCategory:'admin_general_expense', amountNative:0.001959, disclosureLevel:'detailed' },
    { rawLabel:'Multas Fiscais', normalizedCategory:'admin_general_expense', amountNative:-0.036917, disclosureLevel:'detailed' },
    { rawLabel:'Juros Fiscais', normalizedCategory:'admin_general_expense', amountNative:-0.241062, disclosureLevel:'detailed' },
    { rawLabel:'Impostos Municipais', normalizedCategory:'admin_general_expense', amountNative:-0.002443, disclosureLevel:'detailed' },
    { rawLabel:'Taxas Diversas', normalizedCategory:'admin_general_expense', amountNative:-0.208963, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de Direito de Uso', normalizedCategory:'depreciation', amountNative:-0.482926, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-1.591812, disclosureLevel:'detailed' },
  ],
};

const botafogospBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'botafogosp-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:53.593257, cash:0.013588,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.076494, tax:0,
    officialTotalRevenue:46.032661, officialTotalExpenses:49.500044, officialPAT:-3.543877,
  },
};

const botafogospBrPresupuestoOverlayByYear = {};

const botafogospBrPasesData = [];
const botafogospBrResultadosData = {};
const botafogospBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['botafogosp-br'] = {
  revenueLinesByYear: botafogospBrRevenueLinesByYear, expenseLinesByYear: botafogospBrExpenseLinesByYear,
  fiscalYearMeta: botafogospBrFiscalYearMeta, pasesData: botafogospBrPasesData,
  resultadosData: botafogospBrResultadosData, titulosData: botafogospBrTitulosData,
  presupuestoOverlayByYear: botafogospBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'botafogosp-br-demonstracoes-2024': {
    id:'botafogosp-br-demonstracoes-2024', clubId:'botafogosp-br',
    title:'Demonstrações Contábeis (Auditadas) para os Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://botafogofutebolsa.com.br/',
  },
});

memberCountByClub['botafogosp-br'] = null;

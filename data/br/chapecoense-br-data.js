const chapecoenseBrRevenueLinesByYear = {
  2017: [
    { rawLabel:'Receita de Transmissão', normalizedCategory:'broadcasting', amountNative:37.859111, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:4.120692, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:9.239816, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Negociação de Atletas', normalizedCategory:'player_sales', amountNative:11.298182, disclosureLevel:'detailed' },
    { rawLabel:'Programa Sócio Torcedor', normalizedCategory:'member_dues', amountNative:13.868568, disclosureLevel:'detailed' },
    { rawLabel:'Time-Mania', normalizedCategory:'other_income', amountNative:0.201120, disclosureLevel:'detailed' },
    { rawLabel:'Royalties/Direito de Uso de Marca', normalizedCategory:'sponsorship_commercial', amountNative:1.521739, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:1.346781, disclosureLevel:'detailed' },
    { rawLabel:'Doações/PAF', normalizedCategory:'other_income', amountNative:10.125631, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Federações (Copa do Brasil/Sul-Americana/Brasileirão)', normalizedCategory:'competition_bonus', amountNative:10.220073, disclosureLevel:'detailed' },
    { rawLabel:'Deduções Tributárias e Sindicais', normalizedCategory:'other_income', amountNative:-5.256351, disclosureLevel:'detailed' },
    { rawLabel:'Dividendos Recebidos', normalizedCategory:'other_income', amountNative:0.014573, disclosureLevel:'detailed' },
    { rawLabel:'Indenizações de Seguros Recebidas', normalizedCategory:'other_income', amountNative:0.500000, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas Não Operacionais', normalizedCategory:'other_income', amountNative:0.020178, disclosureLevel:'detailed' },
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:0.251953, disclosureLevel:'detailed' },
    { rawLabel:'Reversão de Provisão', normalizedCategory:'other_income', amountNative:2.500000, disclosureLevel:'detailed' },
    { rawLabel:'Venda de Imobilizado', normalizedCategory:'other_income', amountNative:0.020490, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Receita de Transmissão', normalizedCategory:'broadcasting', amountNative:41.593, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:0.392, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:5.004, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Negociação de Atletas', normalizedCategory:'player_sales', amountNative:4.330, disclosureLevel:'detailed' },
    { rawLabel:'Programa Sócio Torcedor', normalizedCategory:'member_dues', amountNative:4.278, disclosureLevel:'detailed' },
    { rawLabel:'Timemania', normalizedCategory:'other_income', amountNative:0.128, disclosureLevel:'detailed' },
    { rawLabel:'Royalties/Direito de Uso de Marca/Venda de produtos', normalizedCategory:'sponsorship_commercial', amountNative:0.076, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:4.465, disclosureLevel:'detailed' },
    { rawLabel:'Doações/PAF', normalizedCategory:'other_income', amountNative:0.135, disclosureLevel:'detailed' },
    { rawLabel:'Receita Federações (Copa do Brasil)', normalizedCategory:'competition_bonus', amountNative:1.923, disclosureLevel:'detailed' },
    { rawLabel:'Deduções Tributárias e Sindicais', normalizedCategory:'other_income', amountNative:-5.260, disclosureLevel:'detailed' },
    { rawLabel:'Dividendos Recebidos', normalizedCategory:'other_income', amountNative:0.029, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas Não Operacionais', normalizedCategory:'other_income', amountNative:0.034, disclosureLevel:'detailed' },
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:0.877, disclosureLevel:'detailed' },
    { rawLabel:'Reversão de Provisão', normalizedCategory:'other_income', amountNative:3.093, disclosureLevel:'detailed' },
  ],
};

const chapecoenseBrExpenseLinesByYear = {
  2017: [
    { rawLabel:'Despesas com Pessoal (exceto Custo Transf. Jogadores)', normalizedCategory:'wages_squad', amountNative:-37.660567, disclosureLevel:'detailed', items:[
      ['Ordenados e Salários', -22.078499],
      ['Premiação', -9.501117],
      ['Impostos (encargos sobre a folha)', -2.775954],
      ['Indenizações', -0.862384],
      ['Aluguel', -0.047160],
      ['Alimentação', -0.020891],
      ['Despesas Médicas', -0.830591],
      ['Seguros', -0.782221],
      ['Outros Gastos c/ Pessoal', -0.761750],
    ] },
    { rawLabel:'Custo Transf. Jogadores', normalizedCategory:'player_amortisation', amountNative:-10.931989, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-12.359605, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com Jogos e Competições', normalizedCategory:'match_organisation_expense', amountNative:-10.420885, disclosureLevel:'detailed' },
    { rawLabel:'Serviços Terceiros', normalizedCategory:'admin_general_expense', amountNative:-6.819750, disclosureLevel:'aggregate' },
    { rawLabel:'Gerais e Administrativas', normalizedCategory:'admin_general_expense', amountNative:-3.145019, disclosureLevel:'detailed', items:[
      ['Multas e Indenizações', -0.029909],
      ['Propaganda e Publicidade', -0.997213],
      ['Gastos Logísticos', -1.137576],
      ['Provisões Contingência', -0.037044],
      ['Doações/Ajudas de Custo', -0.126994],
      ['Água, Luz e Telefone', -0.130782],
      ['Despesas Bancárias', -0.141326],
      ['Mensalidades/Periódicos', -0.065955],
      ['Demais Gastos', -0.478221],
    ] },
    { rawLabel:'Contingência Processos', normalizedCategory:'exceptional_items', amountNative:-7.710137, disclosureLevel:'detailed' },
    { rawLabel:'Despesa com Manutenção', normalizedCategory:'admin_general_expense', amountNative:-1.443115, disclosureLevel:'detailed', items:[
      ['Manutenção Imobilizado', -0.105108],
      ['Manutenção Terceiros', -0.813551],
      ['Manutenção Intangível', -0.524456],
    ] },
    { rawLabel:'Acidente Aéreo Chapecoense', normalizedCategory:'exceptional_items', amountNative:-1.843707, disclosureLevel:'detailed' },
    { rawLabel:'Premiação do Ano p/pgto pôster', normalizedCategory:'other_expenses', amountNative:-1.355000, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.942911, disclosureLevel:'aggregate' },
    { rawLabel:'Despesa com Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.675831, disclosureLevel:'aggregate' },
    { rawLabel:'Depreciação e Bens Pq Valor', normalizedCategory:'depreciation', amountNative:-0.575004, disclosureLevel:'aggregate' },
    { rawLabel:'Custo dos Bens Patrimoniais Vendidos', normalizedCategory:'other_expenses', amountNative:-0.025135, disclosureLevel:'detailed' },
    { rawLabel:'Despesas diversas', normalizedCategory:'other_expenses', amountNative:-0.022097, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Despesas com Pessoal', normalizedCategory:'wages_squad', amountNative:-46.456, disclosureLevel:'detailed', items:[
      ['Ordenados e Salários', -19.730],
      ['Premiação', -4.226],
      ['INSS/FGTS/PIS', -2.986],
      ['Despesas com Transf. Jogadores', -0.136],
      ['Indenizações', -16.060],
      ['Alimentação', -0.120],
      ['Despesas Médicas', -2.349],
      ['Seguros', -0.562],
      ['Outros Gastos c/ Pessoal', -0.287],
    ] },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-7.341, disclosureLevel:'detailed' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.634, disclosureLevel:'aggregate' },
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-0.918, disclosureLevel:'detailed', items:[
      ['Manutenção Imobilizado', -0.586],
      ['Manutenção Terceiros', -0.039],
      ['Manutenção Intangível', -0.292],
    ] },
    { rawLabel:'Gastos com Jogos e Competições', normalizedCategory:'match_organisation_expense', amountNative:-5.433, disclosureLevel:'detailed', items:[
      ['Viagens', -2.677],
      ['Hospedagens', -0.153],
      ['Gastos com jogos - Camp. Brasileiro', -1.982],
      ['Gastos com jogos - Camp. Catarinense', -0.551],
      ['Gastos com outros', -0.069],
    ] },
    { rawLabel:'Terceiros - Futebol e Comissões', normalizedCategory:'other_expenses', amountNative:-3.016, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros (Honorários profissionais + Outros)', normalizedCategory:'admin_general_expense', amountNative:-1.445, disclosureLevel:'detailed', items:[
      ['Honorários profissionais', -0.514],
      ['Outros', -0.931],
    ] },
    { rawLabel:'Bens de pq. Valor e depreciação', normalizedCategory:'depreciation', amountNative:-0.792, disclosureLevel:'aggregate' },
    { rawLabel:'Gerais e Administrativas', normalizedCategory:'admin_general_expense', amountNative:-2.554, disclosureLevel:'detailed', items:[
      ['Multas e Indenizações', -0.048],
      ['Propaganda e Publicidade', -0.134],
      ['Gastos Logísticos', -0.119],
      ['Doações/Ajudas de Custo', -0.362],
      ['Água, Luz e Telefone', -0.086],
      ['Despesas Bancárias', -0.189],
      ['Mensalidades/Periódicos', -0.022],
      ['Demais Gastos', -1.594],
    ] },
    { rawLabel:'Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.172, disclosureLevel:'aggregate' },
    { rawLabel:'Despesas diversas (reversão)', normalizedCategory:'other_expenses', amountNative:0.430, disclosureLevel:'detailed' },
    { rawLabel:'Custo dos Bens Patrimoniais Vendidos', normalizedCategory:'other_expenses', amountNative:0.003, disclosureLevel:'detailed' },
    { rawLabel:'Acidente Aéreo Chapecoense (indenizações)', normalizedCategory:'exceptional_items', amountNative:-45.672, disclosureLevel:'detailed' },
    { rawLabel:'Equivalência patrimonial', normalizedCategory:'exceptional_items', amountNative:-0.036, disclosureLevel:'detailed' },
  ],
};

const chapecoenseBrFiscalYearMeta = {
  2017: {
    currency:'BRL', fxRef:'BRL@2017-12-31',
    sourceId:'chapecoense-br-demonstracoes-2017',
    reportType:'official_balance_sheet',
    gestionId:'plinio-denes',
    grossDebt:0, cash:8.340897,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:2.910458, tax:0,
    officialTotalRevenue:97.852554, officialTotalExpenses:86.376908, officialPAT:4.832261,
  },
  2021: {
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'chapecoense-br-demonstracoes-2020-2021',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:14.025, cash:2.531,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.933, tax:0,
    officialTotalRevenue:61.097, officialTotalExpenses:68.328, officialPAT:-59.872,
  },
};

const chapecoenseBrPresupuestoOverlayByYear = {};

const chapecoenseBrPasesData = [];
const chapecoenseBrResultadosData = {};
const chapecoenseBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['chapecoense-br'] = {
  revenueLinesByYear: chapecoenseBrRevenueLinesByYear, expenseLinesByYear: chapecoenseBrExpenseLinesByYear,
  fiscalYearMeta: chapecoenseBrFiscalYearMeta, pasesData: chapecoenseBrPasesData,
  resultadosData: chapecoenseBrResultadosData, titulosData: chapecoenseBrTitulosData,
  presupuestoOverlayByYear: chapecoenseBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'chapecoense-br-demonstracoes-2017': {
    id:'chapecoense-br-demonstracoes-2017', clubId:'chapecoense-br',
    title:'Demonstrações Financeiras (Controladora e Consolidado) findas em 31/12/2017',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.chapecoense.com',
  },
  'chapecoense-br-demonstracoes-2020-2021': {
    id:'chapecoense-br-demonstracoes-2020-2021', clubId:'chapecoense-br',
    title:'Demonstrações Financeiras da Controladora e Consolidado em conjunto com as Notas Explicativas, findas em 31/12/2021 e 31/12/2020',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.fcf.com.br/',
  },
});

gestionesByClub['chapecoense-br'] = {
  sinconfirmar: { nombre:'Gestión sin confirmar en detalle (cambio de Conselho Administrativo el 14/12/2021; balance firmado por Nei Roque Mohr, Presidente)', firstYear:2021, lastYear:2021 },
  'plinio-denes': { nombre:'Plinio David De Nes Filho', firstYear:2017, lastYear:2017 },
};

memberCountByClub['chapecoense-br'] = null;

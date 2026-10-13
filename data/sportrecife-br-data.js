const sportrecifeBrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Direitos televisivos e premiações', normalizedCategory:'broadcasting', amountNative:88.708, disclosureLevel:'detailed' },
    { rawLabel:'Comerciais, marketing e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:47.335, disclosureLevel:'detailed' },
    { rawLabel:'Receitas em jogos', normalizedCategory:'matchday_competition', amountNative:19.682, disclosureLevel:'detailed' },
    { rawLabel:'Contribuições de associados', normalizedCategory:'member_dues', amountNative:16.626, disclosureLevel:'detailed' },
    { rawLabel:'Patrimoniais', normalizedCategory:'other_income', amountNative:3.319, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.567, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de direitos contratuais (negociação de atletas, empréstimos e solidariedade)', normalizedCategory:'player_sales', amountNative:6.609, disclosureLevel:'detailed' },
    { rawLabel:'Deduções de receita (INSS Patronal, 5%)', normalizedCategory:'other_income', amountNative:-8.660, disclosureLevel:'detailed' },
  ],
};

const sportrecifeBrExpenseLinesByYear = {
  2025: [
    { rawLabel:'Gastos com pessoal do futebol', normalizedCategory:'wages_squad', amountNative:-116.898, disclosureLevel:'detailed' },
    { rawLabel:'Competição e viagens', normalizedCategory:'match_organisation_expense', amountNative:-14.094, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos', normalizedCategory:'other_expenses', amountNative:-1.447, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com formação de atleta e amortização de despesas de anos anteriores', normalizedCategory:'youth_other_sports_expense', amountNative:-34.935, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-23.234, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com pessoal (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-15.648, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-7.826, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-8.659, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com alimentação', normalizedCategory:'admin_general_expense', amountNative:-3.884, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com manutenção', normalizedCategory:'admin_general_expense', amountNative:-2.985, disclosureLevel:'detailed' },
    { rawLabel:'Despesas c/alugueis', normalizedCategory:'admin_general_expense', amountNative:-1.525, disclosureLevel:'detailed' },
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-5.868, disclosureLevel:'detailed' },
    { rawLabel:'Outras (despesas) receitas operacionais líquidas (Liga Forte União, provisão para contingências e outras)', normalizedCategory:'other_expenses', amountNative:-35.739, disclosureLevel:'detailed' },
  ],
};

const sportrecifeBrFiscalYearMeta = {
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'sportrecife-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:26.786, cash:2.388,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-13.941, tax:0,
    officialTotalRevenue:174.186, officialTotalExpenses:272.742, officialPAT:-112.497,
  },
};

const sportrecifeBrPresupuestoOverlayByYear = {};

const sportrecifeBrPasesData = [];
const sportrecifeBrResultadosData = {};
const sportrecifeBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sportrecife-br'] = {
  revenueLinesByYear: sportrecifeBrRevenueLinesByYear, expenseLinesByYear: sportrecifeBrExpenseLinesByYear,
  fiscalYearMeta: sportrecifeBrFiscalYearMeta, pasesData: sportrecifeBrPasesData,
  resultadosData: sportrecifeBrResultadosData, titulosData: sportrecifeBrTitulosData,
  presupuestoOverlayByYear: sportrecifeBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sportrecife-br-demonstracoes-2025': {
    id:'sportrecife-br-demonstracoes-2025', clubId:'sportrecife-br',
    title:'Demonstrações Contábeis, Exercícios Findos em 31 de Dezembro de 2025 e de 2024, com Relatório do Auditor Independente',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://sportrecife.com.br/portal-transparencia/demonstracoes-financeiras/',
    note:'PDF oficial (texto nativo), descargado del Portal de Transparência oficial del Clube (ver fuentes/Brasil/Sport Recife.md). Auditado por BDO RCS Auditores Associados Ltda., que emitió ABSTENÇÃO DE OPINIÃO (no una opinião limpia ni con ressalva: el auditor declara explícitamente que não expressa opinião) por múltiples limitações de escopo simultáneas: ausência de confirmações externas de contas correntes/aplicações/empréstimos; falta de evidência sobre créditos a receber (R$31.107 mil), contas a pagar (R$118.769 mil), obrigações sociais e trabalhistas (R$33.472 mil) e receitas a reconhecer/antecipadas (R$35.594 mil); ausência de confirmações de partes relacionadas (R$26.786 mil); ausência de revisão da vida útil do imobilizado; ausência de extratos de depósitos judiciais (R$6.169 mil); reapresentação de saldos de exercícios anteriores sem retificação completa dos comparativos (CPC 23); y una limitación específica sobre el tratamento contábil de la recompra parcial de participação em direitos de transmissão junto a la Liga Forte União (R$74.625 mil), bajo consulta técnica sin resolver ante el CFC — el mismo asunto LFU que motivó la ressalva de Fluminense 2025 (ver data/fluminense-br-data.js). El Clube está "Em Recuperação Judicial" (Lei nº 11.101/2005), con Plano homologado el 28/10/2025. Déficit do exercício de R$112.497 mil (6,8x mayor que 2024), primer patrimônio líquido negativo de su historia reciente (-R$21.707 mil) y caja reducida a R$2.388 mil (-93% interanual). Cambio de presidencia dentro del ejercicio: renuncia del então Presidente el 12/12/2025, eleição suplementar el 15/12/2025, posse de Matheus Souto Maior el 19/12/2025 (12 días antes del cierre) — no se cargó gestionesByClub por atribución ambigua, ver comentario de cabecera de data/sportrecife-br-data.js. Rebaixamento de la Série A para la Série B del Campeonato Brasileiro al cierre de la temporada esportiva 2025. Convertido a USD con PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2025 (R$5,5024) — el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Sport Recife/demonstracoes-financeiras-2025.md.',
  },
});

memberCountByClub['sportrecife-br'] = null;

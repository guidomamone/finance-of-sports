const guaraniBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:0.119, disclosureLevel:'detailed' },
    { rawLabel:'Cotas de transmissão', normalizedCategory:'broadcasting', amountNative:21.476, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:6.656, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de atletas', normalizedCategory:'player_sales', amountNative:10.152, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Sociais', normalizedCategory:'member_dues', amountNative:2.330, disclosureLevel:'detailed' },
    { rawLabel:'Outras', normalizedCategory:'other_income', amountNative:6.084, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:0.240, disclosureLevel:'detailed' },
    { rawLabel:'Cotas de transmissão', normalizedCategory:'broadcasting', amountNative:14.298, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:1.827, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de atletas', normalizedCategory:'player_sales', amountNative:42.132, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Sociais', normalizedCategory:'member_dues', amountNative:2.121, disclosureLevel:'detailed' },
    { rawLabel:'Outras', normalizedCategory:'other_income', amountNative:2.950, disclosureLevel:'detailed' },
  ],
};

const guaraniBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Salários e encargos', normalizedCategory:'wages_squad', amountNative:-21.689, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-3.659, disclosureLevel:'detailed' },
    { rawLabel:'Jogos', normalizedCategory:'match_organisation_expense', amountNative:-8.155, disclosureLevel:'detailed' },
    { rawLabel:'Direitos econômicos', normalizedCategory:'player_amortisation', amountNative:-2.698, disclosureLevel:'detailed' },
    { rawLabel:'Gastos gerais com atividade desportiva', normalizedCategory:'match_organisation_expense', amountNative:-8.234, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-9.300, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.247, disclosureLevel:'detailed' },
    { rawLabel:'Contingências (desafetação de previsão)', normalizedCategory:'exceptional_items', amountNative:0.001, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Salários e encargos', normalizedCategory:'wages_squad', amountNative:-19.155, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-4.582, disclosureLevel:'detailed' },
    { rawLabel:'Jogos', normalizedCategory:'match_organisation_expense', amountNative:-6.127, disclosureLevel:'detailed' },
    { rawLabel:'Direitos econômicos', normalizedCategory:'player_amortisation', amountNative:-2.983, disclosureLevel:'detailed' },
    { rawLabel:'Gastos gerais com atividade desportiva', normalizedCategory:'match_organisation_expense', amountNative:-8.000, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-12.399, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.167, disclosureLevel:'detailed' },
  ],
};

const guaraniBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'guarani-br-demonstracoes-2023-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:144.944, cash:0.298,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:6.754, tax:0,
    officialTotalRevenue:46.817, officialTotalExpenses:53.983, officialPAT:-0.412,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'guarani-br-demonstracoes-2024-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:142.494, cash:6.535,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.079, tax:0,
    officialTotalRevenue:63.569, officialTotalExpenses:53.413, officialPAT:8.077,
  },
};

const guaraniBrPresupuestoOverlayByYear = {};

const guaraniBrPasesData = [];
const guaraniBrResultadosData = {};
const guaraniBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['guarani-br'] = {
  revenueLinesByYear: guaraniBrRevenueLinesByYear, expenseLinesByYear: guaraniBrExpenseLinesByYear,
  fiscalYearMeta: guaraniBrFiscalYearMeta, pasesData: guaraniBrPasesData,
  resultadosData: guaraniBrResultadosData, titulosData: guaraniBrTitulosData,
  presupuestoOverlayByYear: guaraniBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'guarani-br-demonstracoes-2023-2024': {
    id:'guarani-br-demonstracoes-2023-2024', clubId:'guarani-br',
    title:'Demonstrações Financeiras do Guarani Futebol Clube — Em Recuperação Judicial, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://futebolpaulista.com.br/Repositorio/Institucional/2024/Guarani.pdf',
    note:'PDF con capa de texto real (formato "publicación legal", recorte de gazetasp.com.br), descargado del repositorio institucional de la Federação Paulista de Futebol. Auditado por ASSESSORA ASSESSORES E AUDITORES EIRELI EPP con opinião COM RESSALVAS (adiantamentos, bloqueios judiciais sin documentación, obligações trabalhistas/tributárias sin reconciliar, provisão de contingências sin actualizar por multas/intereses). El clube está EM RECUPERAÇÃO JUDICIAL (aprobada 27/2/2023, homologada 3/6/2024). Transcripción completa en Clubes/Brasil/Guarani/demonstracoes-financeiras-2023-2024.md. 2024 fue un ejercicio de déficit (R$412 mil). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923).',
  },
  'guarani-br-demonstracoes-2024-2025': {
    id:'guarani-br-demonstracoes-2024-2025', clubId:'guarani-br',
    title:'Demonstrações Financeiras do Guarani Futebol Clube — Em Recuperação Judicial, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://guaranifc.com.br/wp-content/uploads/2026/04/1-RELATORIO-DE-AUDITORIA-COM-AS-DEMONSTRACOES-FINANCEIRAS-GUARANI-2025.pdf',
    note:'PDF oficial (texto nativo), descargado de la sección de gobernanza del sitio propio del club (guaranifc.com.br/governanca/). Auditado por Audcorp Auditoria e Assessoria S/S (José Augusto Barbosa, CRC 1SP 120808/0-6), opinião COM RESSALVAS (obrigações trabalhistas/tributárias sin documentación completa, contingencia tributaria de 2006 no reconocida por R$6.200 mil, ajuste retroactivo de adiantamentos en desacuerdo con CPC 23). 2025 revirtió el déficit de 2024 con un superávit de R$8.077 mil, impulsado principalmente por la negociación de atletas (R$42,1 M, incl. R$6,1 M de categorías de base). Transcripción completa en Clubes/Brasil/Guarani/demonstracoes-financeiras-2024-2025.md. Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024).',
  },
});

gestionesByClub['guarani-br'] = {
  sinconfirmar: { nombre:'Gestión sin confirmar en detalle (firma 2024 y 2025: Rômulo Aleksander Moreno Amaro, Presidente do Conselho de Administração)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['guarani-br'] = null;

const gremioRevenueLinesByYear = {
  2024: [
    { rawLabel:'Receita de Transmissão', normalizedCategory:'broadcasting', amountNative:178.616, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Patrimoniais', normalizedCategory:'member_dues', amountNative:99.046, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Publicitárias', normalizedCategory:'sponsorship_commercial', amountNative:65.375, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de Luvas Contratuais', normalizedCategory:'other_income', amountNative:17.706, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de Jogos', normalizedCategory:'matchday_competition', amountNative:11.997, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de Royalties', normalizedCategory:'other_income', amountNative:11.775, disclosureLevel:'detailed' },
    { rawLabel:'Vendas Grêmio Mania (líquido de devoluções e impostos)', normalizedCategory:'sponsorship_commercial', amountNative:18.566, disclosureLevel:'detailed', items:[
      ['Vendas Grêmio Mania', 22.150], ['Devoluções de vendas', -0.417], ['Impostos sobre vendas', -3.167],
    ]},
    { rawLabel:'Venda de Atletas', normalizedCategory:'player_sales', amountNative:105.303, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de Solidariedade', normalizedCategory:'player_sales', amountNative:1.017, disclosureLevel:'detailed' },
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:0.011, disclosureLevel:'detailed' },
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:15.523, disclosureLevel:'detailed' },
    { rawLabel:'Valor justo (cessão de crédito Arena Porto-Alegrense, Nota 6-e)', normalizedCategory:'other_income', amountNative:88.995, disclosureLevel:'detailed' },
    { rawLabel:'Festejos e Aniversários', normalizedCategory:'other_income', amountNative:0.157, disclosureLevel:'detailed' },
    { rawLabel:'Multas e indenizações', normalizedCategory:'other_income', amountNative:0.934, disclosureLevel:'detailed' },
  ],
};

const gremioExpenseLinesByYear = {
  2024: [
    { rawLabel:'Salários, benefícios e encargos sociais (plantel)', normalizedCategory:'wages_squad', amountNative:-164.647, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de Direitos sobre Atletas Profissionais', normalizedCategory:'player_amortisation', amountNative:-47.404, disclosureLevel:'detailed' },
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-18.701, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Federações, Imagens, Prêmios, Material Esportivo e outras', normalizedCategory:'match_organisation_expense', amountNative:-134.467, disclosureLevel:'detailed' },
    { rawLabel:'Ingressos a Sócios', normalizedCategory:'admin_general_expense', amountNative:-22.068, disclosureLevel:'detailed' },
    { rawLabel:'CMV – Grêmio Mania', normalizedCategory:'admin_general_expense', amountNative:-10.977, disclosureLevel:'detailed' },
    { rawLabel:'Salários, benefícios e encargos sociais (demais administrativas)', normalizedCategory:'admin_general_expense', amountNative:-37.690, disclosureLevel:'detailed' },
    { rawLabel:'Tributos e Contribuições Federais', normalizedCategory:'admin_general_expense', amountNative:-7.263, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-15.776, disclosureLevel:'detailed' },
    { rawLabel:'Contingências Judiciais', normalizedCategory:'admin_general_expense', amountNative:-8.786, disclosureLevel:'detailed' },
    { rawLabel:'Aluguéis, Seguros, Materiais de Consumo e de Expediente', normalizedCategory:'admin_general_expense', amountNative:-7.919, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação de Ativos Imobilizados', normalizedCategory:'depreciation', amountNative:-6.327, disclosureLevel:'detailed' },
    { rawLabel:'Água, Luz, Telefonia, Manutenção, Transportes e outras', normalizedCategory:'admin_general_expense', amountNative:-5.662, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (administrativas)', normalizedCategory:'other_expenses', amountNative:-0.579, disclosureLevel:'detailed' },
    { rawLabel:'Negociação de Atletas (comissões e custos)', normalizedCategory:'other_expenses', amountNative:-22.150, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (operacionais)', normalizedCategory:'other_expenses', amountNative:-0.120, disclosureLevel:'detailed' },
  ],
};

const gremioFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'gremio-demonstracoes-2023-2024',
    reportType:'official_balance_sheet',
    gestionId:'guerraneto',
    grossDebt:99.636, cash:11.145,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-60.893, tax:0,
    officialTotalRevenue:615.021, officialTotalExpenses:510.536, officialPAT:43.592,
  },
};

const gremioPresupuestoOverlayByYear = {};

const gremioPasesData = [];
const gremioResultadosData = {};
const gremioTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.gremio = {
  revenueLinesByYear: gremioRevenueLinesByYear, expenseLinesByYear: gremioExpenseLinesByYear,
  fiscalYearMeta: gremioFiscalYearMeta, pasesData: gremioPasesData,
  resultadosData: gremioResultadosData, titulosData: gremioTitulosData,
  presupuestoOverlayByYear: gremioPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'gremio-demonstracoes-2023-2024': {
      id:'gremio-demonstracoes-2023-2024', clubId:'gremio',
      title:'Demonstrações Contábeis dos Exercícios Findos em 31 de Dezembro de 2024 e de 2023 (Reapresentado)',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://gremio.net/documentos/',
      note:'PDF oficial (42 páginas, texto nativo), auditado por Baker Tilly Brasil RS Auditores Independentes (opinião sem ressalvas), firmado marzo de 2025, descargado directo de gremio.net/documentos/. Transcripción completa en Clubes/Brasil/Gremio/demonstracoes-contabeis-2023-2024.md. Solo se cargó el ejercicio 2024 (la columna 2023 del mismo documento está "Reapresentada" tras un cambio de norma contable, no comparable 1:1 con un balance 2023 propio). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923), investigado externamente — el documento no declara tipo de cambio propio.',
    },
});

gestionesByClub.gremio = {
    guerraneto: { nombre:'Guerra Neto (presidente al momento del balance 2024)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.gremio = null;

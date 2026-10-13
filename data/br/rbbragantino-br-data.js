const rbbragantinoBrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Receita Líquida', normalizedCategory:'lump_football_operations', amountNative:39.171, disclosureLevel:'lump' },
  ],
  2024: [
    { rawLabel:'Receita Líquida', normalizedCategory:'lump_football_operations', amountNative:425.224, disclosureLevel:'lump' },
    { rawLabel:'Outras receitas e despesas operacionais', normalizedCategory:'other_income', amountNative:80.992, disclosureLevel:'summary' },
  ],
};

const rbbragantinoBrExpenseLinesByYear = {
  2019: [
    { rawLabel:'Comissão técnica', normalizedCategory:'wages_squad', amountNative:-3.189, disclosureLevel:'summary' },
    { rawLabel:'Custo do departamento de futebol', normalizedCategory:'wages_squad', amountNative:-23.807, disclosureLevel:'summary' },
    { rawLabel:'Gastos com jogos e bonificações', normalizedCategory:'match_organisation_expense', amountNative:-2.470, disclosureLevel:'summary' },
    { rawLabel:'Custo com departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:0, disclosureLevel:'summary' },
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-7.559, disclosureLevel:'summary' },
  ],
  2024: [
    { rawLabel:'Comissão técnica', normalizedCategory:'wages_squad', amountNative:-68.656, disclosureLevel:'summary' },
    { rawLabel:'Custo do departamento de futebol', normalizedCategory:'wages_squad', amountNative:-311.878, disclosureLevel:'summary' },
    { rawLabel:'Gastos com jogos e bonificações', normalizedCategory:'match_organisation_expense', amountNative:-13.822, disclosureLevel:'summary' },
    { rawLabel:'Custo com departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:-37.316, disclosureLevel:'summary' },
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-38.253, disclosureLevel:'summary' },
  ],
};

const rbbragantinoBrFiscalYearMeta = {
  2019: {
    currency:'BRL', fxRef:'BRL@2019-12-31',
    sourceId:'rbbragantino-br-balanco-2019',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:0.564, cash:4.256,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.002, tax:0,
    officialTotalRevenue:39.171, officialTotalExpenses:37.025, officialPAT:0.144,
  },
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'rbbragantino-br-balanco-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:0, cash:29.015,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:9.094, tax:-14.384,
    officialTotalRevenue:506.216, officialTotalExpenses:469.925, officialPAT:31.001,
  },
};

const rbbragantinoBrPresupuestoOverlayByYear = {};

const rbbragantinoBrPasesData = [];
const rbbragantinoBrResultadosData = {};
const rbbragantinoBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rbbragantino-br'] = {
  revenueLinesByYear: rbbragantinoBrRevenueLinesByYear, expenseLinesByYear: rbbragantinoBrExpenseLinesByYear,
  fiscalYearMeta: rbbragantinoBrFiscalYearMeta, pasesData: rbbragantinoBrPasesData,
  resultadosData: rbbragantinoBrResultadosData, titulosData: rbbragantinoBrTitulosData,
  presupuestoOverlayByYear: rbbragantinoBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rbbragantino-br-balanco-2019': {
    id:'rbbragantino-br-balanco-2019', clubId:'rbbragantino-br',
    title:'Red Bull Bragantino — Balanço Patrimonial e Demonstração do Resultado, Exercícios Findos em 31 de Dezembro de 2019 e de 2018',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://web.archive.org/web/2019*/https://www.redbullbragantino.com.br/balanco/2019.pdf',
  },
  'rbbragantino-br-balanco-2024': {
    id:'rbbragantino-br-balanco-2024', clubId:'rbbragantino-br',
    title:'Red Bull Bragantino Futebol Ltda. — Balanços Patrimoniais e Demonstrações do Resultado, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://web.archive.org/web/2025*/https://www.redbullbragantino.com.br/balanco/Red_Bull_Bragantino_(BDO...11_de_Fevereiro_de_2025).pdf',
  },
});

gestionesByClub['rbbragantino-br'] = {
  sinconfirmar: { nombre:'Red Bull Bragantino Futebol Ltda. (controlada por Red Bull GmbH, sin gestión/presidencia electa)', firstYear:2019, lastYear:2024 },
};

memberCountByClub['rbbragantino-br'] = null;

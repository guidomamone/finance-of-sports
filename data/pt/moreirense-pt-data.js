const moreirenseptRevenueLinesByYear = {
  2022: [
    { rawLabel:'Vendas', normalizedCategory:'sponsorship_commercial', amountNative:0.001865, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos Televisivos', normalizedCategory:'broadcasting', amountNative:3.6, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.755346, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.259935, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos suplementares', normalizedCategory:'other_income', amountNative:0.061432, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos em investimentos não financeiros', normalizedCategory:'other_income', amountNative:4.10405, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.748277, disclosureLevel:'aggregated' },
  ],
};
const moreirenseptExpenseLinesByYear = {
  2022: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.001102, disclosureLevel:'aggregated' },
    { rawLabel:'6221 Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-0.209685, disclosureLevel:'aggregated' },
    { rawLabel:'6223 Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.09269, disclosureLevel:'aggregated' },
    { rawLabel:'6224 Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.202738, disclosureLevel:'aggregated' },
    { rawLabel:'6226 Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.079031, disclosureLevel:'aggregated' },
    { rawLabel:'6231 Ferramentas e utensílios de desgaste rápido', normalizedCategory:'admin_general_expense', amountNative:-0.014752, disclosureLevel:'aggregated' },
    { rawLabel:'6233 Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.008423, disclosureLevel:'aggregated' },
    { rawLabel:'6238 Outros', normalizedCategory:'other_expenses', amountNative:-0.023785, disclosureLevel:'aggregated' },
    { rawLabel:'6241 Electricidade', normalizedCategory:'admin_general_expense', amountNative:-0.03683, disclosureLevel:'aggregated' },
    { rawLabel:'6242 Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.070809, disclosureLevel:'aggregated' },
    { rawLabel:'6243 Água', normalizedCategory:'admin_general_expense', amountNative:-0.004296, disclosureLevel:'aggregated' },
    { rawLabel:'6251 Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.158222, disclosureLevel:'aggregated' },
    { rawLabel:'6253 Transportes de mercadorias', normalizedCategory:'admin_general_expense', amountNative:-0.000004, disclosureLevel:'aggregated' },
    { rawLabel:'6261 Rendas e alugueres', normalizedCategory:'other_expenses', amountNative:-0.086358, disclosureLevel:'aggregated' },
    { rawLabel:'6262 Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.007415, disclosureLevel:'aggregated' },
    { rawLabel:'6263 Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.001746, disclosureLevel:'aggregated' },
    { rawLabel:'6265 Contencioso e notariado', normalizedCategory:'admin_general_expense', amountNative:-0.004648, disclosureLevel:'aggregated' },
    { rawLabel:'6267 Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.003511, disclosureLevel:'aggregated' },
    { rawLabel:'6268 Outros serviços', normalizedCategory:'other_expenses', amountNative:-0.029876, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-4.352123, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.011, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.274648, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros de acidentes de trabalho e doenças profissionais', normalizedCategory:'admin_general_expense', amountNative:-0.515805, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com pessoal', normalizedCategory:'admin_general_expense', amountNative:-0.227749, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (aumentos/reduções)', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.004797, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento concedidos', normalizedCategory:'other_expenses', amountNative:-0.000023, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.100784, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e amortização', normalizedCategory:'player_amortisation', amountNative:-1.120698, disclosureLevel:'aggregated' },
  ],
};
const moreirenseptFiscalYearMeta = {
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'moreirense-pt-relatorio-contas-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:-0.00568,
    incluidoEn:{"matchday_competition":{"en":"other_income","posible":true},"season_tickets":{"en":"other_income","posible":true},"stadium_other":{"en":"other_income","posible":true}},
    grossDebt:null, cash:null,
    officialTotalRevenue:9.530906, officialTotalExpenses:7.643551, officialPAT:1.881675,
  },
};
const moreirenseptPresupuestoOverlayByYear = {};

const moreirenseptPasesData = [];
const moreirenseptResultadosData = {};
const moreirenseptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['moreirense-pt'] = {
  revenueLinesByYear: moreirenseptRevenueLinesByYear, expenseLinesByYear: moreirenseptExpenseLinesByYear,
  fiscalYearMeta: moreirenseptFiscalYearMeta, pasesData: moreirenseptPasesData,
  resultadosData: moreirenseptResultadosData, titulosData: moreirenseptTitulosData,
  presupuestoOverlayByYear: moreirenseptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'moreirense-pt-relatorio-contas-2021-22': {
    id:'moreirense-pt-relatorio-contas-2021-22', clubId:'moreirense-pt',
    title:'Moreirense Futebol Clube – Futebol SAD — relatorio-contas-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['moreirense-pt'] = null;

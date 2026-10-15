const benficaptRevenueLinesByYear = {
  2019: [
    { rawLabel:'Prémios da UEFA', normalizedCategory:'competition_bonus', amountNative:56.765, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas de televisão', normalizedCategory:'broadcasting', amountNative:43.525, disclosureLevel:'aggregated' },
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.614, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocinadores', normalizedCategory:'sponsorship_commercial', amountNative:23.292, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas de espaço', normalizedCategory:'other_income', amountNative:3.805, disclosureLevel:'aggregated' },
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:1.952, disclosureLevel:'aggregated' },
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:8.457, disclosureLevel:'aggregated' },
    { rawLabel:'Corporate', normalizedCategory:'stadium_other', amountNative:10.672, disclosureLevel:'aggregated' },
    { rawLabel:'Bilhetes de época', normalizedCategory:'season_tickets', amountNative:7.699, disclosureLevel:'aggregated' },
    { rawLabel:'Competições nacionais', normalizedCategory:'matchday_competition', amountNative:4.95, disclosureLevel:'aggregated' },
    { rawLabel:'Competições europeias', normalizedCategory:'competition_bonus', amountNative:3.973, disclosureLevel:'aggregated' },
    { rawLabel:'Ganhos com alienações de direitos de atletas (mais-valias)', normalizedCategory:'player_sales', amountNative:76.157, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'player_sales', amountNative:15.194, disclosureLevel:'aggregated' },
    { rawLabel:'Resultado relativo a investimentos em participadas', normalizedCategory:'other_income', amountNative:2.787, disclosureLevel:'aggregated' },
  ],
};
const benficaptExpenseLinesByYear = {
  2019: [
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-13.73, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-7.468, disclosureLevel:'aggregated' },
    { rawLabel:'Licença marca Benfica', normalizedCategory:'admin_general_expense', amountNative:-6.109, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-2.966, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços de catering/softdrink', normalizedCategory:'match_organisation_expense', amountNative:-2.852, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e aluguéis', normalizedCategory:'admin_general_expense', amountNative:-2.393, disclosureLevel:'aggregated' },
    { rawLabel:'Equipamento desportivo', normalizedCategory:'other_expenses', amountNative:-2.379, disclosureLevel:'aggregated' },
    { rawLabel:'Subcontratos', normalizedCategory:'admin_general_expense', amountNative:-2.118, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-2.045, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-2.003, disclosureLevel:'aggregated' },
    { rawLabel:'Outros fornecimentos e serviços', normalizedCategory:'other_expenses', amountNative:-10.837, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações fixas', normalizedCategory:'wages_squad', amountNative:-0.574, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações variáveis', normalizedCategory:'wages_squad', amountNative:-0.108, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações fixas', normalizedCategory:'wages_squad', amountNative:-62.207, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações variáveis', normalizedCategory:'wages_squad', amountNative:-17.023, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-3.029, disclosureLevel:'aggregated' },
    { rawLabel:'Benefícios pós-emprego', normalizedCategory:'wages_squad', amountNative:-0.074, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-6.337, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros de acidentes de trabalho', normalizedCategory:'admin_general_expense', amountNative:-5.957, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com pessoal', normalizedCategory:'wages_squad', amountNative:-1.49, disclosureLevel:'aggregated' },
    { rawLabel:'Edifícios e outras construções', normalizedCategory:'depreciation', amountNative:-5.531, disclosureLevel:'aggregated' },
    { rawLabel:'Equipamento básico', normalizedCategory:'depreciation', amountNative:-1.509, disclosureLevel:'aggregated' },
    { rawLabel:'Equipamento de transporte', normalizedCategory:'depreciation', amountNative:-0.227, disclosureLevel:'aggregated' },
    { rawLabel:'Equipamento administrativo', normalizedCategory:'depreciation', amountNative:-1.528, disclosureLevel:'aggregated' },
    { rawLabel:'Outros ativos tangíveis', normalizedCategory:'depreciation', amountNative:-0.046, disclosureLevel:'aggregated' },
    { rawLabel:'Direito de utilização da marca', normalizedCategory:'other_amortisation', amountNative:-1.52, disclosureLevel:'aggregated' },
    { rawLabel:'Programas de computador', normalizedCategory:'other_amortisation', amountNative:-1.359, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos de televisão', normalizedCategory:'other_amortisation', amountNative:-0.25, disclosureLevel:'aggregated' },
    { rawLabel:'Calena comercial', normalizedCategory:'depreciation', amountNative:-0.249, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões/Imparidades ^{2)}', normalizedCategory:'other_amortisation', amountNative:0.445, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos e perdas operacionais ^{3)}', normalizedCategory:'other_expenses', amountNative:-0.842, disclosureLevel:'aggregated' },
    { rawLabel:'Perdas com alienações de direitos de atletas (menos-valias)', normalizedCategory:'exceptional_items', amountNative:-4.422, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos associados a alienações de direitos de atletas (comissões)', normalizedCategory:'other_expenses', amountNative:-9.674, disclosureLevel:'aggregated' },
    { rawLabel:'Abates de direitos de atletas', normalizedCategory:'player_amortisation', amountNative:-0.03, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos', normalizedCategory:'other_expenses', amountNative:-7.18, disclosureLevel:'aggregated' },
    { rawLabel:'Amortizações de direitos de atletas', normalizedCategory:'player_amortisation', amountNative:-33.343, disclosureLevel:'aggregated' },
    { rawLabel:'Perdas de imparidade', normalizedCategory:'player_impairment', amountNative:-3.555, disclosureLevel:'aggregated' },
    { rawLabel:'Reversões de imparidade', normalizedCategory:'player_impairment', amountNative:0.731, disclosureLevel:'aggregated' },
  ],
};
const benficaptFiscalYearMeta = {
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'benfica-pt-relatorio-contas-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-12.976, tax:4.312,
    extraRows: [
      {label:'Rendimentos e ganhos financeiros', value:3.47},
      {label:'Gastos e perdas financeiros', value:-16.446},
      {label:'Imposto sobre o rendimento', value:4.312},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:259.842, officialTotalExpenses:217.366, officialPAT:29.39,
  },
};
const benficaptPresupuestoOverlayByYear = {};

const benficaptPasesData = [];
const benficaptResultadosData = {};
const benficaptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['benfica-pt'] = {
  revenueLinesByYear: benficaptRevenueLinesByYear, expenseLinesByYear: benficaptExpenseLinesByYear,
  fiscalYearMeta: benficaptFiscalYearMeta, pasesData: benficaptPasesData,
  resultadosData: benficaptResultadosData, titulosData: benficaptTitulosData,
  presupuestoOverlayByYear: benficaptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'benfica-pt-relatorio-contas-2018-19': {
    id:'benfica-pt-relatorio-contas-2018-19', clubId:'benfica-pt',
    title:'Sport Lisboa e Benfica – Futebol, SAD — relatorio-contas-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['benfica-pt'] = null;

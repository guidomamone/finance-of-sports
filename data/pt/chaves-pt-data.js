const chavesptRevenueLinesByYear = {
  2023: [
    { rawLabel:'Venda de bens', normalizedCategory:'sponsorship_commercial', amountNative:0.527256, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.442878, disclosureLevel:'aggregated' },
    { rawLabel:'Bilhetes Jogos', normalizedCategory:'matchday_competition', amountNative:0.470289, disclosureLevel:'aggregated' },
    { rawLabel:'Cessao direitos televisivos', normalizedCategory:'broadcasting', amountNative:3.6, disclosureLevel:'aggregated' },
    { rawLabel:'Gold Pass/Cativos/Camarotes', normalizedCategory:'stadium_other', amountNative:0.232416, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA', normalizedCategory:'other_income', amountNative:0.2074, disclosureLevel:'aggregated' },
    { rawLabel:'Inst. Apoio às PME', normalizedCategory:'other_income', amountNative:0.004692, disclosureLevel:'aggregated' },
    { rawLabel:'Jogos Placard', normalizedCategory:'other_income', amountNative:0.071968, disclosureLevel:'aggregated' },
    { rawLabel:'Distribuição de lucros dos jogos e apostas on-line', normalizedCategory:'other_income', amountNative:0.384781, disclosureLevel:'aggregated' },
    { rawLabel:'Premios de Participação Taça Liga Allianz Cup', normalizedCategory:'competition_bonus', amountNative:0.033088, disclosureLevel:'aggregated' },
    { rawLabel:'Premios Taça de Portugal', normalizedCategory:'competition_bonus', amountNative:0.004065, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídio de deslocação Taça de Portugal', normalizedCategory:'other_income', amountNative:0.001261, disclosureLevel:'aggregated' },
    { rawLabel:'Quotas Grupo Desportivo de Chaves', normalizedCategory:'member_dues', amountNative:0.146612, disclosureLevel:'aggregated' },
    { rawLabel:'Mecanismo de Solidariedade Matheus Pereira', normalizedCategory:'player_sales', amountNative:0.023313, disclosureLevel:'aggregated' },
    { rawLabel:'Transferências', normalizedCategory:'player_sales', amountNative:2.514115, disclosureLevel:'aggregated' },
    { rawLabel:'Fundo de Apoio Desenvolvimento Infrastruras Tecnológicas', normalizedCategory:'other_income', amountNative:0.010851, disclosureLevel:'aggregated' },
    { rawLabel:'Premio Liga Portugal', normalizedCategory:'competition_bonus', amountNative:0.001, disclosureLevel:'aggregated' },
    { rawLabel:'Cedência Direitos Económicos', normalizedCategory:'player_sales', amountNative:0.00525, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de Pronto Pagamento Obtidos', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Diferenças de Câmbio Favoráveis', normalizedCategory:'other_income', amountNative:0.001126, disclosureLevel:'aggregated' },
    { rawLabel:'Indeminização de Seguros', normalizedCategory:'other_income', amountNative:0.002238, disclosureLevel:'aggregated' },
    { rawLabel:'Indeminização de Vencimentos', normalizedCategory:'other_income', amountNative:0.01, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.002203, disclosureLevel:'aggregated' },
  ],
};
const chavesptExpenseLinesByYear = {
  2023: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.30783, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos Especializados', normalizedCategory:'admin_general_expense', amountNative:-1.217131, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e Propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.107027, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e Segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.141958, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.082961, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e Reparação', normalizedCategory:'admin_general_expense', amountNative:-0.114189, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços Bancários', normalizedCategory:'admin_general_expense', amountNative:-0.007489, disclosureLevel:'aggregated' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.035784, disclosureLevel:'aggregated' },
    { rawLabel:'Energia e Fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.094843, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e Estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.098455, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços Diversos', normalizedCategory:'other_expenses', amountNative:-0.184657, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com o pessoal', normalizedCategory:'wages_squad', amountNative:-4.523505, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos Indiretos', normalizedCategory:'admin_general_expense', amountNative:-0.001457, disclosureLevel:'aggregated' },
    { rawLabel:'Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.003562, disclosureLevel:'aggregated' },
    { rawLabel:'Correcções relativas a ex. anterior', normalizedCategory:'exceptional_items', amountNative:-0.059522, disclosureLevel:'aggregated' },
    { rawLabel:'Quotização', normalizedCategory:'admin_general_expense', amountNative:-0.003935, disclosureLevel:'aggregated' },
    { rawLabel:'Insuficiencia estimativa imposto', normalizedCategory:'admin_general_expense', amountNative:-0.006396, disclosureLevel:'aggregated' },
    { rawLabel:'Multas e Penalidades', normalizedCategory:'other_expenses', amountNative:-0.021397, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.519159, disclosureLevel:'aggregated' },
  ],
};
const chavesptFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'chaves-pt-rc-2022-2023-com',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.017402, tax:-0.297666,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.017402},
      {label:'Imposto sobre o rendimento do período', value:-0.297666},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:8.696802, officialTotalExpenses:7.471735, officialPAT:0.850477,
  },
};
const chavesptPresupuestoOverlayByYear = {};

const chavesptPasesData = [];
const chavesptResultadosData = {};
const chavesptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['chaves-pt'] = {
  revenueLinesByYear: chavesptRevenueLinesByYear, expenseLinesByYear: chavesptExpenseLinesByYear,
  fiscalYearMeta: chavesptFiscalYearMeta, pasesData: chavesptPasesData,
  resultadosData: chavesptResultadosData, titulosData: chavesptTitulosData,
  presupuestoOverlayByYear: chavesptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'chaves-pt-rc-2022-2023-com': {
    id:'chaves-pt-rc-2022-2023-com', clubId:'chaves-pt',
    title:'Grupo Desportivo de Chaves - Futebol, SAD — RC-2022-2023-com (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['chaves-pt'] = null;

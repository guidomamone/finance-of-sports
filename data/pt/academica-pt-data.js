const academicaptRevenueLinesByYear = {
  2024: [
    { rawLabel:'Bilhetes de Jogo', normalizedCategory:'matchday_competition', amountNative:0.039085, disclosureLevel:'aggregated' },
    { rawLabel:'Prestações de Serviços', normalizedCategory:'other_income', amountNative:0.002505, disclosureLevel:'aggregated' },
    { rawLabel:'Subsidios à exploração', normalizedCategory:'other_income', amountNative:0.097842, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.220206, disclosureLevel:'aggregated' },
    { rawLabel:'Alienações e Direitos desportivos', normalizedCategory:'player_sales', amountNative:0.0204, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.073596, disclosureLevel:'aggregated' },
  ],
};
const academicaptExpenseLinesByYear = {
  2024: [
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-0.065247, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.0063, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.050674, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.123388, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.001351, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.033823, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.001802, disclosureLevel:'aggregated' },
    { rawLabel:'Ferramentas e utensílios de desgaste rápido', normalizedCategory:'admin_general_expense', amountNative:-0.000068, disclosureLevel:'aggregated' },
    { rawLabel:'Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.000031, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.065285, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.087661, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.000377, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.004374, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.005429, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.022347, disclosureLevel:'aggregated' },
    { rawLabel:'Salários', normalizedCategory:'wages_squad', amountNative:-0.404049, disclosureLevel:'aggregated' },
    { rawLabel:'Contribuições', normalizedCategory:'wages_squad', amountNative:-0.071845, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.126949, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidades (Perdas/Reversões)', normalizedCategory:'other_expenses', amountNative:-0.145012, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (Aumentos/Reversões)', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos e taxas', normalizedCategory:'admin_general_expense', amountNative:-0.00254, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Gastos e Perdas', normalizedCategory:'other_expenses', amountNative:-0.007984, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.000729, disclosureLevel:'aggregated' },
  ],
};
const academicaptFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'academica-pt-rc-sduq-2023-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.018758, tax:0,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.018758},
      {label:'Imposto sobre rendimento do período', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.453634, officialTotalExpenses:1.227265, officialPAT:-0.792388,
  },
};
const academicaptPresupuestoOverlayByYear = {};

const academicaptPasesData = [];
const academicaptResultadosData = {};
const academicaptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['academica-pt'] = {
  revenueLinesByYear: academicaptRevenueLinesByYear, expenseLinesByYear: academicaptExpenseLinesByYear,
  fiscalYearMeta: academicaptFiscalYearMeta, pasesData: academicaptPasesData,
  resultadosData: academicaptResultadosData, titulosData: academicaptTitulosData,
  presupuestoOverlayByYear: academicaptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'academica-pt-rc-sduq-2023-2024': {
    id:'academica-pt-rc-sduq-2023-2024', clubId:'academica-pt',
    title:'Académica — RC-SDUQ-2023-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['academica-pt'] = null;

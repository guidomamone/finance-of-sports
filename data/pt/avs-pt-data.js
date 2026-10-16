const avsptRevenueLinesByYear = {
  2024: [
    { rawLabel:'Quotizações', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas de bilheteira', normalizedCategory:'matchday_competition', amountNative:0.023439, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocínios, publicidade e corporate', normalizedCategory:'sponsorship_commercial', amountNative:0.213195, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas de televisão', normalizedCategory:'broadcasting', amountNative:0.45, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:0.012142, disclosureLevel:'aggregated' },
    { rawLabel:'Competições da UEFA e nacionais', normalizedCategory:'competition_bonus', amountNative:0.122228, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios e donativos de Associações/Federações/Liga', normalizedCategory:'other_income', amountNative:0.227073, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios do Estado e outros entes públicos', normalizedCategory:'other_income', amountNative:0.021038, disclosureLevel:'aggregated' },
    { rawLabel:'Donativos de partes não relacionadas', normalizedCategory:'other_income', amountNative:0.003773, disclosureLevel:'aggregated' },
    { rawLabel:'Contribuições/Donativos de partes relacionadas', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos de operações extra-futebol não relacionadas com clube (l)', normalizedCategory:'other_income', amountNative:0.033751, disclosureLevel:'aggregated' },
    { rawLabel:'Outros ganhos extraordinários', normalizedCategory:'other_income', amountNative:0.351414, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos operacionais', normalizedCategory:'other_income', amountNative:0.036217, disclosureLevel:'aggregated' },
  ],
};
const avsptExpenseLinesByYear = {
  2024: [
    { rawLabel:'Custo mercadorias vendidas e matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.032046, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-2.123752, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre Remunerações', normalizedCategory:'wages_squad', amountNative:-0.218715, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.120249, disclosureLevel:'aggregated' },
    { rawLabel:'Seguro Ac. Trab. e Doenças Profi.', normalizedCategory:'admin_general_expense', amountNative:-0.195684, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com ação social', normalizedCategory:'wages_squad', amountNative:-0.098571, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com Pessoal', normalizedCategory:'wages_squad', amountNative:-0.011849, disclosureLevel:'aggregated' },
    { rawLabel:'Depreciações de ativos tangíveis', normalizedCategory:'depreciation', amountNative:-0.019117, disclosureLevel:'aggregated' },
    { rawLabel:'Amortizações de ativos intangíveis exc. atletas', normalizedCategory:'other_amortisation', amountNative:-0.019731, disclosureLevel:'aggregated' },
    { rawLabel:'Perdas por imparidade exc. atletas', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Reversões de Provisões/Imparidades exc. Atletas', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos em dia de jogo', normalizedCategory:'match_organisation_expense', amountNative:-0.126342, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com logística e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.087817, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de patrocínios, publicidade e corporate', normalizedCategory:'admin_general_expense', amountNative:-0.017116, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de actividades relacionadas com "comercial"', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.115709, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com agentes e intermediários', normalizedCategory:'other_expenses', amountNative:-0.0281, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de operações extra-futebol não relacionadas com o clube (m)', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.000978, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.118131, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.094414, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos operacionais', normalizedCategory:'other_expenses', amountNative:-1.084434, disclosureLevel:'aggregated' },
  ],
};
const avsptFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'avs-pt-relatorio-contas-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.004346, tax:-0.027164,
    extraRows: [
      {label:'Rendimentos e ganhos financeiros', value:null},
      {label:'Gastos e perdas financeiras', value:0.004346},
      {label:'Ganhos e perdas com diferenças de câmbio', value:null},
      {label:'Imposto sobre o rendimento (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-0.027164},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.49427, officialTotalExpenses:4.512755, officialPAT:-3.041302,
  },
};
const avsptPresupuestoOverlayByYear = {};

const avsptPasesData = [];
const avsptResultadosData = {};
const avsptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['avs-pt'] = {
  revenueLinesByYear: avsptRevenueLinesByYear, expenseLinesByYear: avsptExpenseLinesByYear,
  fiscalYearMeta: avsptFiscalYearMeta, pasesData: avsptPasesData,
  resultadosData: avsptResultadosData, titulosData: avsptTitulosData,
  presupuestoOverlayByYear: avsptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'avs-pt-relatorio-contas-2023-24': {
    id:'avs-pt-relatorio-contas-2023-24', clubId:'avs-pt',
    title:'AVS — relatorio-contas-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['avs-pt'] = null;

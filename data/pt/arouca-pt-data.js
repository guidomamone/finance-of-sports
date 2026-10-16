const aroucaptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.309576, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas de Bilheteira', normalizedCategory:'matchday_competition', amountNative:0.177248, disclosureLevel:'aggregated' },
    { rawLabel:'Corporate', normalizedCategory:'sponsorship_commercial', amountNative:0.003757, disclosureLevel:'aggregated' },
    { rawLabel:'Transmissões Televisivas', normalizedCategory:'broadcasting', amountNative:4.6, disclosureLevel:'aggregated' },
    { rawLabel:'Ced. Temporária atletas', normalizedCategory:'player_sales', amountNative:0.05, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios e Prémios', normalizedCategory:'competition_bonus', amountNative:0.095325, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas Apostas Desport.', normalizedCategory:'other_income', amountNative:0.350762, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.020671, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos pp obtidos', normalizedCategory:'other_income', amountNative:0.001977, disclosureLevel:'aggregated' },
    { rawLabel:'Al. ativos intangíveis-Passes atletas', normalizedCategory:'player_sales', amountNative:11.450321, disclosureLevel:'aggregated' },
    { rawLabel:'Benefícios de penalidades contratuais', normalizedCategory:'other_income', amountNative:0.170908, disclosureLevel:'aggregated' },
    { rawLabel:'Correções a exercícios anteriores', normalizedCategory:'other_income', amountNative:0.044748, disclosureLevel:'aggregated' },
    { rawLabel:'Exc estimativa p/ impostos', normalizedCategory:'other_income', amountNative:0.404345, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Rendimentos', normalizedCategory:'other_income', amountNative:0.919946, disclosureLevel:'aggregated' },
  ],
};
const aroucaptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Subcontratos', normalizedCategory:'admin_general_expense', amountNative:-1.173766, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos Especializados', normalizedCategory:'admin_general_expense', amountNative:-0.427239, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e Segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.090956, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.01468, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.040845, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e Reparação', normalizedCategory:'admin_general_expense', amountNative:-0.084307, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços Bancários', normalizedCategory:'admin_general_expense', amountNative:-0.006084, disclosureLevel:'aggregated' },
    { rawLabel:'Out. Serv. Especializados', normalizedCategory:'admin_general_expense', amountNative:-0.00167, disclosureLevel:'aggregated' },
    { rawLabel:'Ferr. Ut. Desgaste Rápido', normalizedCategory:'admin_general_expense', amountNative:-0.009619, disclosureLevel:'aggregated' },
    { rawLabel:'Livros e doc. técnica', normalizedCategory:'admin_general_expense', amountNative:-0.004379, disclosureLevel:'aggregated' },
    { rawLabel:'Material de Escritório', normalizedCategory:'admin_general_expense', amountNative:-0.008261, disclosureLevel:'aggregated' },
    { rawLabel:'Artigos Oferta', normalizedCategory:'admin_general_expense', amountNative:-0.026101, disclosureLevel:'aggregated' },
    { rawLabel:'Eletricidade', normalizedCategory:'admin_general_expense', amountNative:-0.020341, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.037146, disclosureLevel:'aggregated' },
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.000576, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.019676, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e Estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.28587, disclosureLevel:'aggregated' },
    { rawLabel:'Transp. Pessoal', normalizedCategory:'match_organisation_expense', amountNative:-0.011453, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e Alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.031192, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.008326, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.006426, disclosureLevel:'aggregated' },
    { rawLabel:'Contencioso e Notarido', normalizedCategory:'admin_general_expense', amountNative:-0.006001, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, Higiene e Conforto', normalizedCategory:'admin_general_expense', amountNative:-0.001018, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Serviços', normalizedCategory:'other_expenses', amountNative:-0.187008, disclosureLevel:'aggregated' },
    { rawLabel:'Remun. Órgãos sociais', normalizedCategory:'admin_general_expense', amountNative:-0.067329, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações pessoal', normalizedCategory:'wages_squad', amountNative:-6.283346, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.21683, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos s/ remunerações', normalizedCategory:'wages_squad', amountNative:-0.113696, disclosureLevel:'aggregated' },
    { rawLabel:'Seg. Acidentes de Trabalho', normalizedCategory:'admin_general_expense', amountNative:-1.084429, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Gastos c/ Pessoal', normalizedCategory:'wages_squad', amountNative:-0.096589, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:-0.187635, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (aumentos/reduções)', normalizedCategory:'admin_general_expense', amountNative:0.019583, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.008069, disclosureLevel:'aggregated' },
    { rawLabel:'Desc. Pp concedidos', normalizedCategory:'other_expenses', amountNative:-0.004324, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos em inv não financeiros', normalizedCategory:'other_expenses', amountNative:-0.008335, disclosureLevel:'aggregated' },
    { rawLabel:'Corr. Per. Anteriores', normalizedCategory:'exceptional_items', amountNative:-0.078834, disclosureLevel:'aggregated' },
    { rawLabel:'Multas e penalidades', normalizedCategory:'other_expenses', amountNative:-0.023704, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.15196, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'player_amortisation', amountNative:-0.720184, disclosureLevel:'aggregated' },
    { rawLabel:'Aumentos/reduções de justo valor', normalizedCategory:'exceptional_items', amountNative:-0.010287, disclosureLevel:'aggregated' },
  ],
};
const aroucaptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'arouca-pt-wf-2024-2025-78053ec5',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.76803, tax:-1.756235,
    extraRows: [
      {label:'Juros e rendimentos similares obtidos', value:0.776087},
      {label:'Juros e gastos similares suportados', value:-0.008057},
      {label:'Imposto sobre o rendimento do período', value:-1.756235},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:18.599582, officialTotalExpenses:11.449787, officialPAT:6.072468,
  },
};
const aroucaptPresupuestoOverlayByYear = {};

const aroucaptPasesData = [];
const aroucaptResultadosData = {};
const aroucaptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['arouca-pt'] = {
  revenueLinesByYear: aroucaptRevenueLinesByYear, expenseLinesByYear: aroucaptExpenseLinesByYear,
  fiscalYearMeta: aroucaptFiscalYearMeta, pasesData: aroucaptPasesData,
  resultadosData: aroucaptResultadosData, titulosData: aroucaptTitulosData,
  presupuestoOverlayByYear: aroucaptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'arouca-pt-wf-2024-2025-78053ec5': {
    id:'arouca-pt-wf-2024-2025-78053ec5', clubId:'arouca-pt',
    title:'Futebol Clube de Arouca – Futebol, SDUQ, Lda. — wf-2024-2025-78053ec5 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['arouca-pt'] = null;

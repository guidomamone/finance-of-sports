const belenensesptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Vendas e serviços prestados', normalizedCategory:'lump_football_operations', amountNative:0.536756, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios à exploração', normalizedCategory:'other_income', amountNative:0.222067, disclosureLevel:'aggregated' },
    { rawLabel:'Outros não especificados', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
};
const belenensesptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Bilhetes', normalizedCategory:'match_organisation_expense', amountNative:-0.002915, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços de Gestão', normalizedCategory:'admin_general_expense', amountNative:-0.006, disclosureLevel:'aggregated' },
    { rawLabel:'Contabilidade', normalizedCategory:'admin_general_expense', amountNative:-0.0139, disclosureLevel:'aggregated' },
    { rawLabel:'Acompanhamento Nutricional', normalizedCategory:'other_expenses', amountNative:-0.008541, disclosureLevel:'aggregated' },
    { rawLabel:'Catapult One Team', normalizedCategory:'other_expenses', amountNative:-0.004, disclosureLevel:'aggregated' },
    { rawLabel:'Outros Serviços', normalizedCategory:'other_expenses', amountNative:-0.052712, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.00148, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.08914, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.0004, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.116055, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços bancários', normalizedCategory:'admin_general_expense', amountNative:-0.000442, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.00014, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços especializados', normalizedCategory:'other_expenses', amountNative:-0.0005, disclosureLevel:'aggregated' },
    { rawLabel:'Ferramentas e utensílios de desgaste rápido', normalizedCategory:'admin_general_expense', amountNative:-0.007859, disclosureLevel:'aggregated' },
    { rawLabel:'Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.000278, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.00134, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadias', normalizedCategory:'match_organisation_expense', amountNative:-0.11185, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.0082, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.000225, disclosureLevel:'aggregated' },
    { rawLabel:'Contencioso e notariado', normalizedCategory:'admin_general_expense', amountNative:-0.000113, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de representação', normalizedCategory:'admin_general_expense', amountNative:-0.003977, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.000148, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.002396, disclosureLevel:'aggregated' },
    { rawLabel:'Orgãos sociais e outros colaboradores', normalizedCategory:'admin_general_expense', amountNative:-0.054712, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações Plantel e Equipa Técnica', normalizedCategory:'wages_squad', amountNative:-0.55804, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.05392, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.031442, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.005235, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.001404, disclosureLevel:'aggregated' },
    { rawLabel:'Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.00006, disclosureLevel:'aggregated' },
    { rawLabel:'Quotizações Assoc. Futebol Lisboa', normalizedCategory:'admin_general_expense', amountNative:-0.01552, disclosureLevel:'aggregated' },
    { rawLabel:'Multas desportivas', normalizedCategory:'other_expenses', amountNative:-0.01714, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos e perdas', normalizedCategory:'other_expenses', amountNative:-0.010946, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos / reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.009439, disclosureLevel:'aggregated' },
  ],
};
const belenensesptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'belenenses-pt-sduq-demonstracoes-financeiras-30junho2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000046, tax:-0.019344,
    extraRows: [
      {label:'Juros e gastos similares suportados', value:-0.000046},
      {label:'Imposto sobre o rendimento do período', value:-0.019344},
    ],
    sinDesglose: [
      {renglon:'Vendas e serviços prestados', lado:'revenue', importe:0.536756, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.758823, officialTotalExpenses:1.190468, officialPAT:-0.451035,
  },
};
const belenensesptPresupuestoOverlayByYear = {};

const belenensesptPasesData = [];
const belenensesptResultadosData = {};
const belenensesptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['belenenses-pt'] = {
  revenueLinesByYear: belenensesptRevenueLinesByYear, expenseLinesByYear: belenensesptExpenseLinesByYear,
  fiscalYearMeta: belenensesptFiscalYearMeta, pasesData: belenensesptPasesData,
  resultadosData: belenensesptResultadosData, titulosData: belenensesptTitulosData,
  presupuestoOverlayByYear: belenensesptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'belenenses-pt-sduq-demonstracoes-financeiras-30junho2025': {
    id:'belenenses-pt-sduq-demonstracoes-financeiras-30junho2025', clubId:'belenenses-pt',
    title:'Belenenses — Belenenses-SDUQ-demonstracoes-financeiras-30junho2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['belenenses-pt'] = null;

const academicoviseuptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Receitas de bilheteira', normalizedCategory:'matchday_competition', amountNative:0.086275, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:0.147336, disclosureLevel:'aggregated' },
    { rawLabel:'Patrocínios, publicidade e corporate', normalizedCategory:'sponsorship_commercial', amountNative:0.357225, disclosureLevel:'aggregated' },
    { rawLabel:'Receitas de televisão', normalizedCategory:'broadcasting', amountNative:0.45, disclosureLevel:'aggregated' },
    { rawLabel:'Competições da UEFA e nacionais', normalizedCategory:'competition_bonus', amountNative:0.004066, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios Associações/FPF/Liga/UEFA', normalizedCategory:'other_income', amountNative:0.359044, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios do Estado e outros entes públicos', normalizedCategory:'other_income', amountNative:0.016016, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos de apostas', normalizedCategory:'other_income', amountNative:0.374347, disclosureLevel:'aggregated' },
    { rawLabel:'Fundo de infraestruturas Liga Portugal', normalizedCategory:'other_income', amountNative:0.046632, disclosureLevel:'aggregated' },
    { rawLabel:'Compensação de formação (FIFA Clearing House)', normalizedCategory:'player_sales', amountNative:0.063392, disclosureLevel:'aggregated' },
    { rawLabel:'Ganhos em investimentos não financeiros', normalizedCategory:'player_sales', amountNative:3.932136, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações de seguros de acidentes de trabalho', normalizedCategory:'other_income', amountNative:0.082653, disclosureLevel:'aggregated' },
    { rawLabel:'Outros não especificados', normalizedCategory:'other_income', amountNative:0.069994, disclosureLevel:'aggregated' },
  ],
};
const academicoviseuptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.038169, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-1.22954, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.016965, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.078274, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-0.076281, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.207375, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.090704, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços especializados', normalizedCategory:'other_expenses', amountNative:-0.004546, disclosureLevel:'aggregated' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.027791, disclosureLevel:'aggregated' },
    { rawLabel:'Energia e fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.071493, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações, estadas e transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.328689, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.483205, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.031497, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.009263, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de representação', normalizedCategory:'admin_general_expense', amountNative:-0.017553, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.009765, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços', normalizedCategory:'other_expenses', amountNative:-0.009454, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-5.869037, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.055114, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.636691, disclosureLevel:'aggregated' },
    { rawLabel:'Seguro de acidentes no trabalho doenças profissionais', normalizedCategory:'admin_general_expense', amountNative:-0.62972, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com o pessoal', normalizedCategory:'wages_squad', amountNative:-0.428072, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (aumentos/reduções)', normalizedCategory:'admin_general_expense', amountNative:-0.08, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.001973, disclosureLevel:'aggregated' },
    { rawLabel:'Perdas em investimentos não financeiros', normalizedCategory:'other_expenses', amountNative:-0.112305, disclosureLevel:'aggregated' },
    { rawLabel:'Donativos e Quotizações', normalizedCategory:'other_expenses', amountNative:-0.013571, disclosureLevel:'aggregated' },
    { rawLabel:'Multas e penalidades', normalizedCategory:'other_expenses', amountNative:-0.025464, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas indevidamente documentadas', normalizedCategory:'other_expenses', amountNative:-0.001391, disclosureLevel:'aggregated' },
    { rawLabel:'Bolsas de formação desportiva', normalizedCategory:'youth_other_sports_expense', amountNative:-0.112725, disclosureLevel:'aggregated' },
    { rawLabel:'Contratos de formação desportiva - Despesas médicas e equipamentos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.035917, disclosureLevel:'aggregated' },
    { rawLabel:'Contratos de formação desportiva - Gastos com alimentação', normalizedCategory:'youth_other_sports_expense', amountNative:-0.233549, disclosureLevel:'aggregated' },
    { rawLabel:'Contratos de formação desportiva - Taxas de inscrição e transferências', normalizedCategory:'youth_other_sports_expense', amountNative:-0.018674, disclosureLevel:'aggregated' },
    { rawLabel:'Contratos de formação desportiva - Outros gastos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.001404, disclosureLevel:'aggregated' },
    { rawLabel:'Outros não especificados', normalizedCategory:'other_expenses', amountNative:-0.114752, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-1.773055, disclosureLevel:'aggregated' },
  ],
};
const academicoviseuptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'academicoviseu-pt-wf-2024-2025-efe7ad0a',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.784786, tax:-0.015107,
    extraRows: [
      {label:'Juros e rendimentos similares obtidos', value:0.066583},
      {label:'Juros e gastos similares suportados', value:-1.851369},
      {label:'Imposto sobre o rendimento do período', value:-0.015107},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:5.989118, officialTotalExpenses:12.87398, officialPAT:-8.684755,
  },
};
const academicoviseuptPresupuestoOverlayByYear = {};

const academicoviseuptPasesData = [];
const academicoviseuptResultadosData = {};
const academicoviseuptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['academicoviseu-pt'] = {
  revenueLinesByYear: academicoviseuptRevenueLinesByYear, expenseLinesByYear: academicoviseuptExpenseLinesByYear,
  fiscalYearMeta: academicoviseuptFiscalYearMeta, pasesData: academicoviseuptPasesData,
  resultadosData: academicoviseuptResultadosData, titulosData: academicoviseuptTitulosData,
  presupuestoOverlayByYear: academicoviseuptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'academicoviseu-pt-wf-2024-2025-efe7ad0a': {
    id:'academicoviseu-pt-wf-2024-2025-efe7ad0a', clubId:'academicoviseu-pt',
    title:'Académico de Viseu Futebol Clube, Futebol SAD — wf-2024-2025-efe7ad0a (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['academicoviseu-pt'] = null;

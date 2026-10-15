const portoptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Vendas', normalizedCategory:'sponsorship_commercial', amountNative:11.09, disclosureLevel:'aggregated' },
    { rawLabel:'Prémios competições UEFA', normalizedCategory:'competition_bonus', amountNative:17.179, disclosureLevel:'aggregated' },
    { rawLabel:'Prémios competições FIFA', normalizedCategory:'competition_bonus', amountNative:17.047, disclosureLevel:'aggregated' },
    { rawLabel:'Receita de bilheteira', normalizedCategory:'matchday_competition', amountNative:7.102, disclosureLevel:'aggregated' },
    { rawLabel:'Receita de lugares anuais', normalizedCategory:'season_tickets', amountNative:6.485, disclosureLevel:'aggregated' },
    { rawLabel:'Outras receitas desportivas', normalizedCategory:'other_income', amountNative:2.246, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:19.579, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos de transmissões', normalizedCategory:'broadcasting', amountNative:42.926, disclosureLevel:'aggregated' },
    { rawLabel:'Corporate Hospitality', normalizedCategory:'stadium_other', amountNative:10.553, disclosureLevel:'aggregated' },
    { rawLabel:'Outras prestações de serviços', normalizedCategory:'other_income', amountNative:12.484, disclosureLevel:'aggregated' },
    { rawLabel:'Diferencia de redondeo', normalizedCategory:'other_income', amountNative:0.001, disclosureLevel:'aggregated' },
    { rawLabel:'Outros proveitos', normalizedCategory:'other_income', amountNative:2.849, disclosureLevel:'aggregated' },
    { rawLabel:'Proveitos com alienações de passes de jogadores (i)', normalizedCategory:'player_sales', amountNative:154.949, disclosureLevel:'aggregated' },
    { rawLabel:'Proveitos com empréstimos de jogadores', normalizedCategory:'player_sales', amountNative:11.554, disclosureLevel:'aggregated' },
    { rawLabel:'Outros proveitos com jogadores', normalizedCategory:'player_sales', amountNative:4.999, disclosureLevel:'aggregated' },
  ],
};
const portoptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Custo das vendas', normalizedCategory:'other_expenses', amountNative:-6.849, disclosureLevel:'aggregated' },
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-8.824, disclosureLevel:'aggregated' },
    { rawLabel:'Subcontratos', normalizedCategory:'admin_general_expense', amountNative:-6.563, disclosureLevel:'aggregated' },
    { rawLabel:'Direitos de imagem de atletas', normalizedCategory:'wages_squad', amountNative:-3.838, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-3.247, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-2.61, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de organização', normalizedCategory:'match_organisation_expense', amountNative:-2.577, disclosureLevel:'aggregated' },
    { rawLabel:'Honorários', normalizedCategory:'admin_general_expense', amountNative:-2.124, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-1.865, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços de catering', normalizedCategory:'match_organisation_expense', amountNative:-1.863, disclosureLevel:'aggregated' },
    { rawLabel:'Material desportivo', normalizedCategory:'other_expenses', amountNative:-1.766, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-1.457, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-1.38, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-1.302, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-1.198, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.867, disclosureLevel:'aggregated' },
    { rawLabel:'Eletricidade', normalizedCategory:'admin_general_expense', amountNative:-0.774, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de representação', normalizedCategory:'admin_general_expense', amountNative:-0.202, disclosureLevel:'aggregated' },
    { rawLabel:'Outros fornecimentos e serviços', normalizedCategory:'other_expenses', amountNative:-4.278, disclosureLevel:'aggregated' },
    { rawLabel:'Diferencia de redondeo', normalizedCategory:'other_expenses', amountNative:0.001, disclosureLevel:'aggregated' },
    { rawLabel:'Custos com o pessoal', normalizedCategory:'wages_squad', amountNative:-81.939, disclosureLevel:'aggregated' },
    { rawLabel:'Depreciações e Amortizações, excluindo passes de jogadores', normalizedCategory:'depreciation', amountNative:-10.375, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões e perdas por imparidade excluindo passes de jogadores', normalizedCategory:'other_amortisation', amountNative:0.851, disclosureLevel:'aggregated' },
    { rawLabel:'Outros custos', normalizedCategory:'other_expenses', amountNative:-2.053, disclosureLevel:'aggregated' },
    { rawLabel:'Amortizações de passes de jogadores', normalizedCategory:'player_amortisation', amountNative:-31.036, disclosureLevel:'aggregated' },
    { rawLabel:'Perdas por imparidade com passes de jogadores', normalizedCategory:'player_impairment', amountNative:-3.341, disclosureLevel:'aggregated' },
    { rawLabel:'Custos com alienações de passes de jogadores (ii)', normalizedCategory:'player_amortisation', amountNative:-62.006, disclosureLevel:'aggregated' },
    { rawLabel:'Custos com empréstimos de jogadores', normalizedCategory:'other_expenses', amountNative:-5.784, disclosureLevel:'aggregated' },
    { rawLabel:'Outros custos com jogadores', normalizedCategory:'other_expenses', amountNative:-3.276, disclosureLevel:'aggregated' },
    { rawLabel:'Diferencia de redondeo', normalizedCategory:'other_expenses', amountNative:-0.001, disclosureLevel:'aggregated' },
  ],
};
const portoptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'porto-pt-wf-2024-2025-6b41056f',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-23.518, tax:-3.993,
    extraRows: [
      {label:'Custos e perdas financeiras', value:-27.717},
      {label:'Proveitos e ganhos financeiros', value:4.059},
      {label:'Resultados relativos a investimentos', value:0.14},
      {label:'Imposto sobre o rendimento', value:-3.993},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:321.043, officialTotalExpenses:252.543, officialPAT:40.988,
  },
};
const portoptPresupuestoOverlayByYear = {};

const portoptPasesData = [];
const portoptResultadosData = {};
const portoptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['porto-pt'] = {
  revenueLinesByYear: portoptRevenueLinesByYear, expenseLinesByYear: portoptExpenseLinesByYear,
  fiscalYearMeta: portoptFiscalYearMeta, pasesData: portoptPasesData,
  resultadosData: portoptResultadosData, titulosData: portoptTitulosData,
  presupuestoOverlayByYear: portoptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'porto-pt-wf-2024-2025-6b41056f': {
    id:'porto-pt-wf-2024-2025-6b41056f', clubId:'porto-pt',
    title:'Futebol Clube do Porto — wf-2024-2025-6b41056f (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['porto-pt'] = null;

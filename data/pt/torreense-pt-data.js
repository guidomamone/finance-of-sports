const torreenseptRevenueLinesByYear = {
  2024: [
    { rawLabel:'Vendas e serviços prestados', normalizedCategory:'lump_football_operations', amountNative:4.77215, disclosureLevel:'aggregated' },
    { rawLabel:'Aumentos/reduções de justo valor', normalizedCategory:'other_income', amountNative:2.907, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos', normalizedCategory:'other_income', amountNative:0.477636, disclosureLevel:'aggregated' },
  ],
};
const torreenseptExpenseLinesByYear = {
  2024: [
    { rawLabel:'Trabalhos especializados', normalizedCategory:'admin_general_expense', amountNative:-1.430409, disclosureLevel:'aggregated' },
    { rawLabel:'Publicidade e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.081592, disclosureLevel:'aggregated' },
    { rawLabel:'Vigilância e segurança', normalizedCategory:'match_organisation_expense', amountNative:-0.09789, disclosureLevel:'aggregated' },
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.000262, disclosureLevel:'aggregated' },
    { rawLabel:'Conservação e reparação', normalizedCategory:'admin_general_expense', amountNative:-0.010487, disclosureLevel:'aggregated' },
    { rawLabel:'Ferramentas e utensílios de desgaste rápido', normalizedCategory:'admin_general_expense', amountNative:-0.006765, disclosureLevel:'aggregated' },
    { rawLabel:'Material de escritório', normalizedCategory:'admin_general_expense', amountNative:-0.002476, disclosureLevel:'aggregated' },
    { rawLabel:'Artigos para oferta', normalizedCategory:'admin_general_expense', amountNative:-0.004602, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.193385, disclosureLevel:'aggregated' },
    { rawLabel:'Eletricidade', normalizedCategory:'admin_general_expense', amountNative:-0.021942, disclosureLevel:'aggregated' },
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.011204, disclosureLevel:'aggregated' },
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.016656, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.350482, disclosureLevel:'aggregated' },
    { rawLabel:'Transportes de pessoal', normalizedCategory:'match_organisation_expense', amountNative:-0.213904, disclosureLevel:'aggregated' },
    { rawLabel:'Transportes de mercadorias', normalizedCategory:'admin_general_expense', amountNative:-0.000072, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.327789, disclosureLevel:'aggregated' },
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.005316, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.000284, disclosureLevel:'aggregated' },
    { rawLabel:'Contencioso e notariado', normalizedCategory:'admin_general_expense', amountNative:-0.002565, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas de representação', normalizedCategory:'admin_general_expense', amountNative:-0.004942, disclosureLevel:'aggregated' },
    { rawLabel:'Limpeza, higiene e conforto', normalizedCategory:'admin_general_expense', amountNative:-0.005987, disclosureLevel:'aggregated' },
    { rawLabel:'Outros serviços', normalizedCategory:'other_expenses', amountNative:-0.004873, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-3.8122, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.235338, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre as remunerações', normalizedCategory:'wages_squad', amountNative:-0.349402, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros de acidentes no trabalho e doenças profissionais', normalizedCategory:'admin_general_expense', amountNative:-0.344303, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de acção social', normalizedCategory:'wages_squad', amountNative:-0.00144, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com o pessoal, dos quais:', normalizedCategory:'wages_squad', amountNative:-0.051985, disclosureLevel:'aggregated' },
    { rawLabel:'Provisões (aumentos/reduções)', normalizedCategory:'other_amortisation', amountNative:-0.00282, disclosureLevel:'aggregated' },
    { rawLabel:'681 - Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.003348, disclosureLevel:'aggregated' },
    { rawLabel:'6881-Corr. Rel. Periodos Anteriores', normalizedCategory:'exceptional_items', amountNative:-0.001155, disclosureLevel:'aggregated' },
    { rawLabel:'6882-Donativos', normalizedCategory:'other_expenses', amountNative:-0.004, disclosureLevel:'aggregated' },
    { rawLabel:'6888-Multas e penalidades', normalizedCategory:'other_expenses', amountNative:-0.013647, disclosureLevel:'aggregated' },
    { rawLabel:'6888-Desp. N dev. Documentadas', normalizedCategory:'other_expenses', amountNative:-0.000892, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.003496, disclosureLevel:'aggregated' },
  ],
};
const torreenseptFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'torreense-pt-sad-relatoriocontas2023-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.497105, tax:-0.027812,
    extraRows: [
      {label:'Juros e rendimentos similares obtidos', value:0.000077},
      {label:'Juros e gastos similares suportados', value:-0.497182},
      {label:'Imposto sobre o rendimento do período', value:-0.027812},
    ],
    sinDesglose: [
      {renglon:'Vendas e serviços prestados', lado:'revenue', importe:4.77215, motivo:'Claude 2026-10-16 (subagente Sonnet): ver lote 81, segunda vuelta (Gil Vicente, Leixões, Mafra, Paços, Portimonense, Torreense).'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:8.156787, officialTotalExpenses:7.61791, officialPAT:0.013961,
  },
};
const torreenseptPresupuestoOverlayByYear = {};

const torreenseptPasesData = [];
const torreenseptResultadosData = {};
const torreenseptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['torreense-pt'] = {
  revenueLinesByYear: torreenseptRevenueLinesByYear, expenseLinesByYear: torreenseptExpenseLinesByYear,
  fiscalYearMeta: torreenseptFiscalYearMeta, pasesData: torreenseptPasesData,
  resultadosData: torreenseptResultadosData, titulosData: torreenseptTitulosData,
  presupuestoOverlayByYear: torreenseptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'torreense-pt-sad-relatoriocontas2023-2024': {
    id:'torreense-pt-sad-relatoriocontas2023-2024', clubId:'torreense-pt',
    title:'Sport Clube União Torreense - Futebol, SAD — SAD_RelatorioContas2023-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['torreense-pt'] = null;

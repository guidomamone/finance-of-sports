const uniaodeleiriaptRevenueLinesByYear = {
  2024: [
    { rawLabel:'Vendas de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.097869, disclosureLevel:'aggregated' },
    { rawLabel:'Prestação de serviços', normalizedCategory:'lump_football_operations', amountNative:1.546109, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios do estado e outros entes públicas', normalizedCategory:'other_income', amountNative:0.013237, disclosureLevel:'aggregated' },
    { rawLabel:'Subsídios de outras entidades', normalizedCategory:'other_income', amountNative:0.011565, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos suplementares', normalizedCategory:'other_income', amountNative:0.00234, disclosureLevel:'aggregated' },
    { rawLabel:'Outros rendimentos e ganhos', normalizedCategory:'other_income', amountNative:0.025335, disclosureLevel:'aggregated' },
  ],
};
const uniaodeleiriaptExpenseLinesByYear = {
  2024: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.037626, disclosureLevel:'aggregated' },
    { rawLabel:'Subcontratos', normalizedCategory:'admin_general_expense', amountNative:-0.00794, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços especializados', normalizedCategory:'admin_general_expense', amountNative:-1.902194, disclosureLevel:'aggregated' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.03967, disclosureLevel:'aggregated' },
    { rawLabel:'Energia e fluídos', normalizedCategory:'admin_general_expense', amountNative:-0.009294, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações e estadas', normalizedCategory:'match_organisation_expense', amountNative:-0.345991, disclosureLevel:'aggregated' },
    { rawLabel:'Rendas e alugueres', normalizedCategory:'admin_general_expense', amountNative:-0.400387, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços diversos (*)', normalizedCategory:'other_expenses', amountNative:-0.157265, disclosureLevel:'aggregated' },
    { rawLabel:'Remunerações do pessoal', normalizedCategory:'wages_squad', amountNative:-2.844058, disclosureLevel:'aggregated' },
    { rawLabel:'Indemnizações', normalizedCategory:'wages_squad', amountNative:-0.267583, disclosureLevel:'aggregated' },
    { rawLabel:'Encargos sobre remunerações', normalizedCategory:'wages_squad', amountNative:-0.288227, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.273126, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com pessoal', normalizedCategory:'wages_squad', amountNative:-0.353512, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.045131, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos e perdas', normalizedCategory:'other_expenses', amountNative:-0.305863, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.092352, disclosureLevel:'aggregated' },
  ],
};
const uniaodeleiriaptFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'uniaodeleiria-pt-relatorio-contas-udl-sad-2023-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.42124, tax:-0.036063,
    extraRows: [
      {label:'Gastos de financiamento', value:-0.42124},
      {label:'Imposto sobre o rendimento do período', value:-0.036063},
    ],
    incluidoEn:{"matchday_competition":"lump_football_operations","stadium_other":"lump_football_operations","season_tickets":"lump_football_operations"},
    sinDesglose: [
      {renglon:'Prestação de serviços', lado:'revenue', importe:1.546109, motivo:'Claude 2026-10-16 (revisado, reemplaza la respuesta anterior): \'Prestação de serviços\' mezcla patrocinios, entradas, apuestas y apoyos sin desglose en ninguna nota: fútbol sin desglosar, como Torreense.'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.696455, officialTotalExpenses:7.370219, officialPAT:-6.131068,
  },
};
const uniaodeleiriaptPresupuestoOverlayByYear = {};

const uniaodeleiriaptPasesData = [];
const uniaodeleiriaptResultadosData = {};
const uniaodeleiriaptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['uniaodeleiria-pt'] = {
  revenueLinesByYear: uniaodeleiriaptRevenueLinesByYear, expenseLinesByYear: uniaodeleiriaptExpenseLinesByYear,
  fiscalYearMeta: uniaodeleiriaptFiscalYearMeta, pasesData: uniaodeleiriaptPasesData,
  resultadosData: uniaodeleiriaptResultadosData, titulosData: uniaodeleiriaptTitulosData,
  presupuestoOverlayByYear: uniaodeleiriaptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'uniaodeleiria-pt-relatorio-contas-udl-sad-2023-2024': {
    id:'uniaodeleiria-pt-relatorio-contas-udl-sad-2023-2024', clubId:'uniaodeleiria-pt',
    title:'União de Leiria- Futebol, SAD — Relatorio-Contas-UDL-SAD_2023-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['uniaodeleiria-pt'] = null;

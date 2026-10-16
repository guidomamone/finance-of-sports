const oliveirenseptRevenueLinesByYear = {
  2025: [
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.008868, disclosureLevel:'aggregated' },
    { rawLabel:'Prestação de serviços', normalizedCategory:'lump_football_operations', amountNative:1.141257, disclosureLevel:'aggregated' },
    { rawLabel:'Federação Portuguesa de Futebol', normalizedCategory:'other_income', amountNative:0.004065, disclosureLevel:'aggregated' },
    { rawLabel:'Liga Portuguesa de Futebol Profissional', normalizedCategory:'other_income', amountNative:0.023905, disclosureLevel:'aggregated' },
    { rawLabel:'Fundo Infraestruturas - LPF', normalizedCategory:'other_income', amountNative:0.037254, disclosureLevel:'aggregated' },
    { rawLabel:'Prémio Allianz Cup -LPF', normalizedCategory:'competition_bonus', amountNative:0.008654, disclosureLevel:'aggregated' },
    { rawLabel:'Subs. Deslocação - FPF', normalizedCategory:'other_income', amountNative:0.001224, disclosureLevel:'aggregated' },
    { rawLabel:'UDO - Fundos Formação FIFA', normalizedCategory:'youth_football', amountNative:0.060763, disclosureLevel:'aggregated' },
    { rawLabel:'Rendimentos suplementares', normalizedCategory:'other_income', amountNative:0.574802, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento obtidos', normalizedCategory:'other_income', amountNative:0.000001, disclosureLevel:'aggregated' },
    { rawLabel:'Outras', normalizedCategory:'other_income', amountNative:0.003995, disclosureLevel:'aggregated' },
  ],
};
const oliveirenseptExpenseLinesByYear = {
  2025: [
    { rawLabel:'Custo das mercadorias vendidas e das matérias consumidas', normalizedCategory:'other_expenses', amountNative:-0.004274, disclosureLevel:'aggregated' },
    { rawLabel:'Subcontratos', normalizedCategory:'admin_general_expense', amountNative:-0.026325, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços especializados', normalizedCategory:'admin_general_expense', amountNative:-0.684726, disclosureLevel:'aggregated' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.038138, disclosureLevel:'aggregated' },
    { rawLabel:'Energia e fluidos', normalizedCategory:'admin_general_expense', amountNative:-0.050141, disclosureLevel:'aggregated' },
    { rawLabel:'Deslocações, estadas e transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.229731, disclosureLevel:'aggregated' },
    { rawLabel:'Serviços diversos', normalizedCategory:'other_expenses', amountNative:-0.218521, disclosureLevel:'aggregated' },
    { rawLabel:'Salários e ordenados', normalizedCategory:'wages_squad', amountNative:-1.622765, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos com rescisão de contratos', normalizedCategory:'wages_squad', amountNative:-0.122923, disclosureLevel:'aggregated' },
    { rawLabel:'Contribuições para a segurança social', normalizedCategory:'wages_squad', amountNative:-0.141045, disclosureLevel:'aggregated' },
    { rawLabel:'Outros gastos com o pessoal', normalizedCategory:'wages_squad', amountNative:-0.257717, disclosureLevel:'aggregated' },
    { rawLabel:'Imparidade de dívidas a receber (perdas/reversões)', normalizedCategory:'other_expenses', amountNative:-0.03, disclosureLevel:'aggregated' },
    { rawLabel:'Impostos', normalizedCategory:'admin_general_expense', amountNative:-0.019071, disclosureLevel:'aggregated' },
    { rawLabel:'Descontos de pronto pagamento concedidos', normalizedCategory:'other_expenses', amountNative:-0.000001, disclosureLevel:'aggregated' },
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.07259, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos/reversões de depreciação e de amortização', normalizedCategory:'depreciation', amountNative:-0.049917, disclosureLevel:'aggregated' },
  ],
};
const oliveirenseptFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'oliveirense-pt-relatorio-e-contas-202425',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.004548, tax:-0.03774,
    extraRows: [
      {label:'Juros e rendimentos similares obtidos', value:0.149391},
      {label:'Juros e gastos similares suportados', value:-0.144843},
      {label:'Imposto sobre o rendimento do período', value:-0.03774},
    ],
    incluidoEn:{"matchday_competition":"lump_football_operations","stadium_other":"lump_football_operations","season_tickets":"lump_football_operations","broadcasting":{"en":"lump_football_operations","posible":true}},
    sinDesglose: [
      {renglon:'Prestação de serviços', lado:'revenue', importe:1.141257, motivo:'Claude 2026-10-16 (revisado, reemplaza la respuesta anterior): \'Prestação de serviços\' mezcla patrocinios, entradas, apuestas y apoyos sin desglose en ninguna nota: fútbol sin desglosar, como Torreense.'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.864788, officialTotalExpenses:3.567885, officialPAT:-1.736289,
  },
};
const oliveirenseptPresupuestoOverlayByYear = {};

const oliveirenseptPasesData = [];
const oliveirenseptResultadosData = {};
const oliveirenseptTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['oliveirense-pt'] = {
  revenueLinesByYear: oliveirenseptRevenueLinesByYear, expenseLinesByYear: oliveirenseptExpenseLinesByYear,
  fiscalYearMeta: oliveirenseptFiscalYearMeta, pasesData: oliveirenseptPasesData,
  resultadosData: oliveirenseptResultadosData, titulosData: oliveirenseptTitulosData,
  presupuestoOverlayByYear: oliveirenseptPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'oliveirense-pt-relatorio-e-contas-202425': {
    id:'oliveirense-pt-relatorio-e-contas-202425', clubId:'oliveirense-pt',
    title:'União Desportiva Oliveirense - Futebol, SAD — Relatorio-e-Contas-202425 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['oliveirense-pt'] = null;

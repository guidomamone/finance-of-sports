const celticgbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Revenue', normalizedCategory:'lump_football_operations', amountNative:143.597, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of intangible assets', normalizedCategory:'player_sales', amountNative:31.488, disclosureLevel:'aggregated' },
  ],
};
const celticgbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Operating expenses (before intangible asset transactions and exceptional items)', normalizedCategory:'other_expenses', amountNative:-117.062, disclosureLevel:'aggregated' },
    { rawLabel:'Exceptional operating (expense)/income', normalizedCategory:'exceptional_items', amountNative:-2.005, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of intangible assets', normalizedCategory:'player_amortisation', amountNative:-13.845, disclosureLevel:'aggregated' },
  ],
};
const celticgbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'celtic-gb-plc-group-accounts-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:3.514, tax:-11.753,
    extraRows: [
      {label:'Finance income', value:5.082},
      {label:'Finance expense', value:-1.568},
      {label:'Tax expense', value:-11.753},
    ],
    sinDesglose: [
      {renglon:'Revenue', lado:'revenue', importe:143.597, motivo:'Claude 2026-10-20: el estado trae un solo renglón Revenue; el desglose por categoría (nota 4, pág. 74 del visor) lo evalúa el reintento; si el desglose entra, este total no se suma aparte'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:175.085, officialTotalExpenses:130.907, officialPAT:33.934,
  },
};
const celticgbPresupuestoOverlayByYear = {};

const celticgbPasesData = [];
const celticgbResultadosData = {};
const celticgbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['celtic-gb'] = {
  revenueLinesByYear: celticgbRevenueLinesByYear, expenseLinesByYear: celticgbExpenseLinesByYear,
  fiscalYearMeta: celticgbFiscalYearMeta, pasesData: celticgbPasesData,
  resultadosData: celticgbResultadosData, titulosData: celticgbTitulosData,
  presupuestoOverlayByYear: celticgbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'celtic-gb-plc-group-accounts-2024-25': {
    id:'celtic-gb-plc-group-accounts-2024-25', clubId:'celtic-gb',
    title:'Celtic plc — celtic-plc-group-accounts-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['celtic-gb'] = null;

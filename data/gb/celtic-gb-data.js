const celticgbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Revenue', normalizedCategory:'lump_football_operations', amountNative:143.597, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of intangible assets', normalizedCategory:'player_sales', amountNative:31.488, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Ticketing', normalizedCategory:'matchday_competition', amountNative:21.675, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandise vouchers for season ticket holders', normalizedCategory:'season_tickets', amountNative:-2.775, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial / sponsorship', normalizedCategory:'sponsorship_commercial', amountNative:12.425, disclosureLevel:'aggregated' },
    { rawLabel:'Retail outlets and E-commerce', normalizedCategory:'sponsorship_commercial', amountNative:15.117, disclosureLevel:'aggregated' },
    { rawLabel:'Media rights', normalizedCategory:'broadcasting', amountNative:11.253, disclosureLevel:'aggregated' },
    { rawLabel:'Stadium operations', normalizedCategory:'stadium_other', amountNative:1.924, disclosureLevel:'aggregated' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:1.162, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of intangible assets', normalizedCategory:'player_sales', amountNative:9.435, disclosureLevel:'aggregated' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:5, disclosureLevel:'aggregated' },
  ],
};
const celticgbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Operating expenses (before intangible asset transactions and exceptional items)', normalizedCategory:'other_expenses', amountNative:-117.062, disclosureLevel:'aggregated' },
    { rawLabel:'Exceptional operating (expense)/income', normalizedCategory:'exceptional_items', amountNative:-2.005, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of intangible assets', normalizedCategory:'player_amortisation', amountNative:-13.845, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Operating expenses (before intangible asset transactions and exceptional items)', normalizedCategory:'other_expenses', amountNative:-74.353, disclosureLevel:'aggregated' },
    { rawLabel:'Exceptional operating expenses', normalizedCategory:'exceptional_items', amountNative:-0.333, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of intangible assets', normalizedCategory:'player_amortisation', amountNative:-11.821, disclosureLevel:'aggregated' },
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
  2021: {
    currency:'GBP', fxRef:'GBP@2021-06-30',
    sourceId:'celtic-gb-group-accounts-2020-21',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.201, tax:-1.109,
    extraRows: [
      {label:'Finance income', value:0.855},
      {label:'Finance expense', value:-1.056},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-1.109},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:75.216, officialTotalExpenses:86.174, officialPAT:-12.601,
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
  'celtic-gb-group-accounts-2020-21': {
    id:'celtic-gb-group-accounts-2020-21', clubId:'celtic-gb',
    title:'Celtic plc — celtic-group-accounts-2020-21 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['celtic-gb'] = null;

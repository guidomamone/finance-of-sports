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
  2022: [
    { rawLabel:'Ticketing', normalizedCategory:'matchday_competition', amountNative:36.314, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandise vouchers for season ticket holders', normalizedCategory:'season_tickets', amountNative:0.347, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial / sponsorship', normalizedCategory:'sponsorship_commercial', amountNative:11.513, disclosureLevel:'aggregated' },
    { rawLabel:'Retail outlets and E-commerce', normalizedCategory:'sponsorship_commercial', amountNative:18.511, disclosureLevel:'aggregated' },
    { rawLabel:'Media rights', normalizedCategory:'broadcasting', amountNative:13.308, disclosureLevel:'aggregated' },
    { rawLabel:'Stadium operations', normalizedCategory:'stadium_other', amountNative:6.397, disclosureLevel:'aggregated' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:1.845, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of intangible assets', normalizedCategory:'player_sales', amountNative:29.029, disclosureLevel:'aggregated' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Ticketing', normalizedCategory:'matchday_competition', amountNative:40.551, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial / sponsorship', normalizedCategory:'sponsorship_commercial', amountNative:13.365, disclosureLevel:'aggregated' },
    { rawLabel:'Retail outlets and E-commerce', normalizedCategory:'sponsorship_commercial', amountNative:22.219, disclosureLevel:'aggregated' },
    { rawLabel:'Media rights', normalizedCategory:'broadcasting', amountNative:31.176, disclosureLevel:'aggregated' },
    { rawLabel:'Stadium operations', normalizedCategory:'stadium_other', amountNative:10.457, disclosureLevel:'aggregated' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:2.083, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of intangible assets', normalizedCategory:'player_sales', amountNative:14.441, disclosureLevel:'aggregated' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:13.5, disclosureLevel:'aggregated' },
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
  2022: [
    { rawLabel:'Operating expenses (before intangible asset transactions and exceptional items)', normalizedCategory:'other_expenses', amountNative:-91.728, disclosureLevel:'aggregated' },
    { rawLabel:'Impairment of intangible assets and other prepaid costs', normalizedCategory:'exceptional_items', amountNative:-7.235, disclosureLevel:'aggregated' },
    { rawLabel:'Reversal of prior period impairment charges', normalizedCategory:'exceptional_items', amountNative:1.094, disclosureLevel:'aggregated' },
    { rawLabel:'Settlement agreements on contract termination', normalizedCategory:'exceptional_items', amountNative:-0.121, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of intangible assets', normalizedCategory:'player_amortisation', amountNative:-13.045, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Operating expenses (before intangible asset transactions and exceptional items)', normalizedCategory:'other_expenses', amountNative:-95.432, disclosureLevel:'aggregated' },
    { rawLabel:'Exceptional operating expenses', normalizedCategory:'exceptional_items', amountNative:-0.131, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of intangible assets', normalizedCategory:'player_amortisation', amountNative:-12.088, disclosureLevel:'aggregated' },
  ],
};
const celticgbFiscalYearMeta = {
  2025: {
    incluidoEn:{ sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' } },
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
  2022: {
    currency:'GBP', fxRef:'GBP@2022-06-30',
    sourceId:'celtic-gb-group-accounts-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.093, tax:-0.287,
    extraRows: [
      {label:'Finance income', value:0.876},
      {label:'Finance expense', value:-0.969},
      {label:'Tax expense', value:-0.287},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:117.264, officialTotalExpenses:104.773, officialPAT:5.849,
  },
  2023: {
    currency:'GBP', fxRef:'GBP@2023-06-30',
    sourceId:'celtic-gb-group-accounts-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.556, tax:-7.365,
    extraRows: [
      {label:'Finance income', value:2.041},
      {label:'Finance expense', value:-1.485},
      {label:'Tax expense', value:-7.365},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:147.792, officialTotalExpenses:107.52, officialPAT:33.332,
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
  'celtic-gb-group-accounts-2021-22': {
    id:'celtic-gb-group-accounts-2021-22', clubId:'celtic-gb',
    title:'Celtic plc — celtic-group-accounts-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'celtic-gb-group-accounts-2022-23': {
    id:'celtic-gb-group-accounts-2022-23', clubId:'celtic-gb',
    title:'Celtic plc — celtic-group-accounts-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['celtic-gb'] = null;

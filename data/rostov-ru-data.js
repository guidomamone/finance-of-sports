const rostovruRevenueLinesByYear = {
  2025: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2798.413, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:790.726, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:1852.908, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1630.427, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:1668.897, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1504.608, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2525.414, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1581.047, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2571.435, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1381.728, disclosureLevel:'aggregated' },
  ],
};
const rostovruExpenseLinesByYear = {
  2025: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2150.474, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-142.2, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-198.887, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-116.29, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-747.87, disclosureLevel:'aggregated' },
    { rawLabel:'Материальные затраты (5610)', normalizedCategory:'other_expenses', amountNative:-100.843, disclosureLevel:'detailed' },
    { rawLabel:'Расходы на оплату труда (5620)', normalizedCategory:'wages_squad', amountNative:-1473.968, disclosureLevel:'detailed' },
    { rawLabel:'Отчисления на социальные нужды (5630)', normalizedCategory:'wages_squad', amountNative:-185.042, disclosureLevel:'detailed' },
    { rawLabel:'Амортизация (5640)', normalizedCategory:'depreciation', amountNative:-5.243, disclosureLevel:'detailed' },
    { rawLabel:'Прочие затраты (5650)', normalizedCategory:'other_expenses', amountNative:-1135.242, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-461.761, disclosureLevel:'aggregated' },
    { rawLabel:'Материальные затраты (5610)', normalizedCategory:'other_expenses', amountNative:-101.095, disclosureLevel:'detailed' },
    { rawLabel:'Расходы на оплату труда (5620)', normalizedCategory:'wages_squad', amountNative:-1175.961, disclosureLevel:'detailed' },
    { rawLabel:'Отчисления на социальные нужды (5630)', normalizedCategory:'wages_squad', amountNative:-193.686, disclosureLevel:'detailed' },
    { rawLabel:'Амортизация (5640)', normalizedCategory:'depreciation', amountNative:-8.251, disclosureLevel:'detailed' },
    { rawLabel:'Прочие затраты (5650)', normalizedCategory:'other_expenses', amountNative:-1157.604, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-701.632, disclosureLevel:'aggregated' },
    { rawLabel:'Материальные затраты (5610)', normalizedCategory:'other_expenses', amountNative:-139.059, disclosureLevel:'detailed' },
    { rawLabel:'Расходы на оплату труда (5620)', normalizedCategory:'wages_squad', amountNative:-1439.814, disclosureLevel:'detailed' },
    { rawLabel:'Отчисления на социальные нужды (5630)', normalizedCategory:'wages_squad', amountNative:-241.657, disclosureLevel:'detailed' },
    { rawLabel:'Амортизация (5640)', normalizedCategory:'depreciation', amountNative:-7.606, disclosureLevel:'detailed' },
    { rawLabel:'Прочие затраты (5650)', normalizedCategory:'other_expenses', amountNative:-1016.071, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-567.554, disclosureLevel:'aggregated' },
    { rawLabel:'Материальные затраты (5610)', normalizedCategory:'other_expenses', amountNative:-130.391, disclosureLevel:'detailed' },
    { rawLabel:'Расходы на оплату труда (5620)', normalizedCategory:'wages_squad', amountNative:-1624.76, disclosureLevel:'detailed' },
    { rawLabel:'Отчисления на социальные нужды (5630)', normalizedCategory:'wages_squad', amountNative:-257.482, disclosureLevel:'detailed' },
    { rawLabel:'Амортизация (5640)', normalizedCategory:'depreciation', amountNative:-17.492, disclosureLevel:'detailed' },
    { rawLabel:'Прочие затраты (5650)', normalizedCategory:'other_expenses', amountNative:-1530.389, disclosureLevel:'detailed' },
  ],
};
const rostovruFiscalYearMeta = {
  2025: {
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'rostov-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-77.184, tax:-490.947,
    extraRows: [
      {label:'Проценты к получению (2320)', value:3.992},
      {label:'Проценты к уплате (2330)', value:-81.176},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-490.947},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2798.413, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2150.474, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:413.157,
  },
  2021: {
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'rostov-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-77.642, tax:24.745,
    extraRows: [
      {label:'Проценты к получению (2320)', value:1.295},
      {label:'Проценты к уплате (2330)', value:-78.937},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:24.745},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:1852.908, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-217.77,
  },
  2022: {
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'rostov-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-129.455, tax:-41.431,
    extraRows: [
      {label:'Проценты к получению (2320)', value:0.152},
      {label:'Проценты к уплате (2330)', value:-129.607},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-41.431},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:1668.897, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-95.739,
  },
  2023: {
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'rostov-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-87.398, tax:-113.096,
    extraRows: [
      {label:'Проценты к получению (2320)', value:0.471},
      {label:'Проценты к уплате (2330)', value:-87.869},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-113.096},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2525.414, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:360.128,
  },
  2024: {
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'rostov-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-86.46, tax:42.982,
    extraRows: [
      {label:'Проценты к получению (2320)', value:1.957},
      {label:'Проценты к уплате (2330)', value:-88.417},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:42.982},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2571.435, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-218.383,
  },
};
const rostovruPresupuestoOverlayByYear = {};

const rostovruPasesData = [];
const rostovruResultadosData = {};
const rostovruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rostov-ru'] = {
  revenueLinesByYear: rostovruRevenueLinesByYear, expenseLinesByYear: rostovruExpenseLinesByYear,
  fiscalYearMeta: rostovruFiscalYearMeta, pasesData: rostovruPasesData,
  resultadosData: rostovruResultadosData, titulosData: rostovruTitulosData,
  presupuestoOverlayByYear: rostovruPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rostov-ru-bfo-2021-datos': {
    id:'rostov-ru-bfo-2021-datos', clubId:'rostov-ru',
    title:'AO Football Club Rostov — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rostov-ru-bfo-2022-datos': {
    id:'rostov-ru-bfo-2022-datos', clubId:'rostov-ru',
    title:'AO Football Club Rostov — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rostov-ru-bfo-2023-datos': {
    id:'rostov-ru-bfo-2023-datos', clubId:'rostov-ru',
    title:'AO Football Club Rostov — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rostov-ru-bfo-2024-datos': {
    id:'rostov-ru-bfo-2024-datos', clubId:'rostov-ru',
    title:'AO Football Club Rostov — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rostov-ru-bfo-2025-datos': {
    id:'rostov-ru-bfo-2025-datos', clubId:'rostov-ru',
    title:'AO Football Club Rostov — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['rostov-ru'] = null;

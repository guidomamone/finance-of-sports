const rubinkazanruRevenueLinesByYear = {
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:3149.141, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2026.431, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2468.547, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2747.875, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2139.986, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1770.225, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:4137.976, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1086.189, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:3607.111, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2700.951, disclosureLevel:'aggregated' },
  ],
};
const rubinkazanruExpenseLinesByYear = {
  2021: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2642.177, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-4.613, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-304.845, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1656.48, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2118.976, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-71.279, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-366.904, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-4199.92, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2653.208, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-72.158, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-216.81, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1381.255, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-4056.276, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-5.079, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-152.92, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-952.683, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-5277.813, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-3.806, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-211.954, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-565.367, disclosureLevel:'aggregated' },
  ],
};
const rubinkazanruFiscalYearMeta = {
  2021: {
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'rubinkazan-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:111.936, tax:-136.567,
    extraRows: [
      {label:'Проценты к получению (2320)', value:129.122},
      {label:'Проценты к уплате (2330)', value:-17.186},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-136.567},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:3149.141, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2642.177, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:1091.076, cash:4.345,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:542.826,
  },
  2022: {
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'rubinkazan-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:89.734, tax:289.687,
    extraRows: [
      {label:'Проценты к получению (2320)', value:105.348},
      {label:'Проценты к уплате (2330)', value:-15.614},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:289.687},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2468.547, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2118.976, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:65.594, cash:35.982,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-1161.236,
  },
  2023: {
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'rubinkazan-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:125.756, tax:51.053,
    extraRows: [
      {label:'Проценты к получению (2320)', value:140.479},
      {label:'Проценты к уплате (2330)', value:-14.723},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:51.053},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2139.986, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2653.208, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:39.677, cash:1.095,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-236.411,
  },
  2024: {
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'rubinkazan-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:160.064, tax:-81.108,
    extraRows: [
      {label:'Проценты к получению (2320)', value:166.172},
      {label:'Проценты к уплате (2330)', value:-6.108},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-81.108},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:4137.976, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:4056.276, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:42.441, cash:1.459,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:136.163,
  },
  2025: {
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'rubinkazan-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:176.966, tax:-294.285,
    extraRows: [
      {label:'Проценты к получению (2320)', value:179.581},
      {label:'Проценты к уплате (2330)', value:-2.615},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-294.285},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:3607.111, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:5277.813, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:36.838, cash:104.729,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:131.803,
  },
};
const rubinkazanruPresupuestoOverlayByYear = {};

const rubinkazanruPasesData = [];
const rubinkazanruResultadosData = {};
const rubinkazanruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rubinkazan-ru'] = {
  revenueLinesByYear: rubinkazanruRevenueLinesByYear, expenseLinesByYear: rubinkazanruExpenseLinesByYear,
  fiscalYearMeta: rubinkazanruFiscalYearMeta, pasesData: rubinkazanruPasesData,
  resultadosData: rubinkazanruResultadosData, titulosData: rubinkazanruTitulosData,
  presupuestoOverlayByYear: rubinkazanruPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rubinkazan-ru-bfo-2021-datos': {
    id:'rubinkazan-ru-bfo-2021-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rubinkazan-ru-bfo-2022-datos': {
    id:'rubinkazan-ru-bfo-2022-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rubinkazan-ru-bfo-2023-datos': {
    id:'rubinkazan-ru-bfo-2023-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rubinkazan-ru-bfo-2024-datos': {
    id:'rubinkazan-ru-bfo-2024-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
  },
  'rubinkazan-ru-bfo-2025-datos': {
    id:'rubinkazan-ru-bfo-2025-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['rubinkazan-ru'] = null;

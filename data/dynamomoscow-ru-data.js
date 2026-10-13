const dynamomoscowruRevenueLinesByYear = {
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:6399.966, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:907.175, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:7422.358, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:534.236, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:7747.802, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2954.606, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:9816.813, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:549.506, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:13446.933, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1513.384, disclosureLevel:'aggregated' },
  ],
};
const dynamomoscowruExpenseLinesByYear = {
  2021: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-3945.338, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-90.017, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-604.279, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-2416.742, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-4519.247, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-137.019, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-817.37, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1987.706, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-7215.321, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-295.639, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-1021.993, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1475.729, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-8117.874, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-353.275, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-1190.627, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-506.548, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-9915.104, disclosureLevel:'aggregated' },
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-339.701, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-1325.843, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1338.664, disclosureLevel:'aggregated' },
  ],
};
const dynamomoscowruFiscalYearMeta = {
  2021: {
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'dynamomoscow-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-32.849, tax:5.298,
    extraRows: [
      {label:'Проценты к получению (2320)', value:45.791},
      {label:'Проценты к уплате (2330)', value:-78.64},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:5.298},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:6399.966, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:3945.338, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:223.214,
  },
  2022: {
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'dynamomoscow-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-114.987, tax:-103.11,
    extraRows: [
      {label:'Проценты к получению (2320)', value:112.889},
      {label:'Проценты к уплате (2330)', value:-227.876},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-103.11},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:7422.358, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:4519.247, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:277.155,
  },
  2023: {
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'dynamomoscow-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-215.513, tax:-109.621,
    extraRows: [
      {label:'Проценты к получению (2320)', value:77.442},
      {label:'Проценты к уплате (2330)', value:-292.955},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-109.621},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:7747.802, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:7215.321, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:368.592,
  },
  2024: {
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'dynamomoscow-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-209.502, tax:354.884,
    extraRows: [
      {label:'Проценты к получению (2320)', value:268.878},
      {label:'Проценты к уплате (2330)', value:-478.38},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:354.884},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:9816.813, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:8117.874, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:343.377,
  },
  2025: {
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'dynamomoscow-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-325.182, tax:-465.002,
    extraRows: [
      {label:'Проценты к получению (2320)', value:209.606},
      {label:'Проценты к уплате (2330)', value:-534.788},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-465.002},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:13446.933, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:9915.104, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:1250.821,
  },
};
const dynamomoscowruPresupuestoOverlayByYear = {};

const dynamomoscowruPasesData = [];
const dynamomoscowruResultadosData = {};
const dynamomoscowruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['dynamomoscow-ru'] = {
  revenueLinesByYear: dynamomoscowruRevenueLinesByYear, expenseLinesByYear: dynamomoscowruExpenseLinesByYear,
  fiscalYearMeta: dynamomoscowruFiscalYearMeta, pasesData: dynamomoscowruPasesData,
  resultadosData: dynamomoscowruResultadosData, titulosData: dynamomoscowruTitulosData,
  presupuestoOverlayByYear: dynamomoscowruPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'dynamomoscow-ru-bfo-2021-datos': {
    id:'dynamomoscow-ru-bfo-2021-datos', clubId:'dynamomoscow-ru',
    title:'AO Football Club Dynamo-Moscow — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Dynamo Moscow/bfo-2021-datos.md.',
  },
  'dynamomoscow-ru-bfo-2022-datos': {
    id:'dynamomoscow-ru-bfo-2022-datos', clubId:'dynamomoscow-ru',
    title:'AO Football Club Dynamo-Moscow — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Dynamo Moscow/bfo-2022-datos.md.',
  },
  'dynamomoscow-ru-bfo-2023-datos': {
    id:'dynamomoscow-ru-bfo-2023-datos', clubId:'dynamomoscow-ru',
    title:'AO Football Club Dynamo-Moscow — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Dynamo Moscow/bfo-2023-datos.md.',
  },
  'dynamomoscow-ru-bfo-2024-datos': {
    id:'dynamomoscow-ru-bfo-2024-datos', clubId:'dynamomoscow-ru',
    title:'AO Football Club Dynamo-Moscow — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Dynamo Moscow/bfo-2024-datos.md.',
  },
  'dynamomoscow-ru-bfo-2025-datos': {
    id:'dynamomoscow-ru-bfo-2025-datos', clubId:'dynamomoscow-ru',
    title:'AO Football Club Dynamo-Moscow — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Dynamo Moscow/bfo-2025-datos.md.',
  },
});

memberCountByClub['dynamomoscow-ru'] = null;

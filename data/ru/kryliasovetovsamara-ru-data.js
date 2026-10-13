const kryliasovetovsamararuRevenueLinesByYear = {
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:241.394, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1309.452, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:686.891, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2065.318, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:902.657, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1850.81, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:809.104, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1822.17, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:818.188, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1417.999, disclosureLevel:'aggregated' },
  ],
};
const kryliasovetovsamararuExpenseLinesByYear = {
  2021: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-1508.704, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-6.803, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-1993.276, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-25.348, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2387.252, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-24.485, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2216.984, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-120.141, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-29.793, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2444.921, disclosureLevel:'aggregated' },
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-148.015, disclosureLevel:'aggregated' },
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-133.395, disclosureLevel:'aggregated' },
  ],
};
const kryliasovetovsamararuFiscalYearMeta = {
  2021: {
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'kryliasovetovsamara-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-31.57, tax:-1.663,
    extraRows: [
      {label:'Проценты к уплате (2330)', value:-31.57},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-1.663},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:241.394, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:1508.704, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:2.106,
  },
  2022: {
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'kryliasovetovsamara-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.662, tax:-146.543,
    extraRows: [
      {label:'Проценты к уплате (2330)', value:-4.662},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-146.543},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:686.891, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:1993.276, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:582.38,
  },
  2023: {
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'kryliasovetovsamara-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.498, tax:-67.217,
    extraRows: [
      {label:'Проценты к уплате (2330)', value:-4.498},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-67.217},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:902.657, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2387.252, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:270.015,
  },
  2024: {
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'kryliasovetovsamara-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.343, tax:-54.197,
    extraRows: [
      {label:'Проценты к уплате (2330)', value:-4.343},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-54.197},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:809.104, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2216.984, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:205.816,
  },
  2025: {
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'kryliasovetovsamara-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-138.797, tax:0,
    extraRows: [
      {label:'Проценты к уплате (2330)', value:-138.797},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}},
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:818.188, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2444.921, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-628.941,
  },
};
const kryliasovetovsamararuPresupuestoOverlayByYear = {};

const kryliasovetovsamararuPasesData = [];
const kryliasovetovsamararuResultadosData = {};
const kryliasovetovsamararuTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['kryliasovetovsamara-ru'] = {
  revenueLinesByYear: kryliasovetovsamararuRevenueLinesByYear, expenseLinesByYear: kryliasovetovsamararuExpenseLinesByYear,
  fiscalYearMeta: kryliasovetovsamararuFiscalYearMeta, pasesData: kryliasovetovsamararuPasesData,
  resultadosData: kryliasovetovsamararuResultadosData, titulosData: kryliasovetovsamararuTitulosData,
  presupuestoOverlayByYear: kryliasovetovsamararuPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'kryliasovetovsamara-ru-bfo-2021-datos': {
    id:'kryliasovetovsamara-ru-bfo-2021-datos', clubId:'kryliasovetovsamara-ru',
    title:'AO Professional Football Club Krylia Sovetov — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
  },
  'kryliasovetovsamara-ru-bfo-2022-datos': {
    id:'kryliasovetovsamara-ru-bfo-2022-datos', clubId:'kryliasovetovsamara-ru',
    title:'AO Professional Football Club Krylia Sovetov — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
  },
  'kryliasovetovsamara-ru-bfo-2023-datos': {
    id:'kryliasovetovsamara-ru-bfo-2023-datos', clubId:'kryliasovetovsamara-ru',
    title:'AO Professional Football Club Krylia Sovetov — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
  },
  'kryliasovetovsamara-ru-bfo-2024-datos': {
    id:'kryliasovetovsamara-ru-bfo-2024-datos', clubId:'kryliasovetovsamara-ru',
    title:'AO Professional Football Club Krylia Sovetov — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
  },
  'kryliasovetovsamara-ru-bfo-2025-datos': {
    id:'kryliasovetovsamara-ru-bfo-2025-datos', clubId:'kryliasovetovsamara-ru',
    title:'AO Professional Football Club Krylia Sovetov — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['kryliasovetovsamara-ru'] = null;

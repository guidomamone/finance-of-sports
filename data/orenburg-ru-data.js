// ============================================================================
// data/orenburg-ru-data.js — ANO Football Club Orenburg (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Orenburg/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "orenburg-ru" — slug de "Orenburg" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "ANO Football Club Orenburg" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social (АНО «Футбольный клуб «Оренбург»)
//   displayName        ok        "Orenburg" — nombre de la carpeta del club en Clubes/
//   country            ok        "RU" — carpeta de país "Rusia" (tabla PAISES)
//   reportingCurrency  ok        "RUB" — moneda de curso legal de Rusia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 1 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "RUB" — moneda de curso legal de Rusia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "RUB@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene RUB@2021-12-31 = 74.2926 (Tipo oficial del Banco de Rusia al 2021-12-31)
//   sourceId           ok        "orenburg-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2021 (ru-premierliga): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"orenburg-ru-bfo-2021-datos"}
// ============================================================================

const orenburgruRevenueLinesByYear = {
  // 2021: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2021-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:874.208, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:18.962, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие поступления (6250, форма 6)', normalizedCategory:'other_income', amountNative:56.697, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2022: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2022-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:1335.468, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:409.131, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие поступления (6250, форма 6)', normalizedCategory:'other_income', amountNative:84.883, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2023-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:1995.771, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:639.075, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие поступления (6250, форма 6)', normalizedCategory:'other_income', amountNative:60.405, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2024: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2024-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:1733.825, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:649.539, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие поступления (6250, форма 6)', normalizedCategory:'other_income', amountNative:49.13, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2025: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2025-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2025: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2563.879, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:712.018, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие поступления (6250, форма 6)', normalizedCategory:'other_income', amountNative:55.999, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const orenburgruExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-85.579, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'**Материальные затраты** (5610)', normalizedCategory:'other_expenses', amountNative:-86.817, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'**Расходы на оплату труда** (5620)', normalizedCategory:'wages_squad', amountNative:-428.871, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'**Отчисления на социальные нужды** (5630)', normalizedCategory:'wages_squad', amountNative:-59.233, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'**Прочие затраты** (5650)', normalizedCategory:'other_expenses', amountNative:-168.43, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-50.094, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-255.436, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'**Материальные затраты** (5610)', normalizedCategory:'other_expenses', amountNative:-31.924, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'**Расходы на оплату труда** (5620)', normalizedCategory:'wages_squad', amountNative:-655.76, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'**Отчисления на социальные нужды** (5630)', normalizedCategory:'wages_squad', amountNative:-81.769, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'**Амортизация** (5640)', normalizedCategory:'depreciation', amountNative:-47.29, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'**Прочие затраты** (5650)', normalizedCategory:'other_expenses', amountNative:-680.66, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-70.238, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-279.232, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Материальные затраты (5610)', normalizedCategory:'other_expenses', amountNative:-34.091, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы на оплату труда (5620)', normalizedCategory:'wages_squad', amountNative:-1075.023, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Отчисления на социальные нужды (5630)', normalizedCategory:'wages_squad', amountNative:-111.65, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Амортизация (5640)', normalizedCategory:'depreciation', amountNative:-67.221, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие затраты (5650)', normalizedCategory:'other_expenses', amountNative:-1032.834, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-77.721, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-5.243, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2067.511, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-5.126, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-94.719, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-241.299, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-80.35, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-0.388, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-26.602, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2688.13, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-5.354, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-129.55, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-479.277, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-109.376, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-63.918, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const orenburgruFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'orenburg-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:3.005, tax:-16.727,
    extraRows: [
      {label:'Проценты к получению (2320)', value:4.351},
      {label:'Проценты к уплате (2330)', value:-1.346},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-16.727},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true} }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:874.208, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:50.094, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:57.121,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'orenburg-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:14.351, tax:-3.335,
    extraRows: [
      {label:'Проценты к получению (2320)', value:14.926},
      {label:'Проценты к уплате (2330)', value:-0.575},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-3.335},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:1335.468, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:70.238, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:17.421,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'orenburg-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:9.911, tax:-19.444,
    extraRows: [
      {label:'Проценты к получению (2320)', value:10.711},
      {label:'Проценты к уплате (2330)', value:-0.8},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-19.444},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:1995.771, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:77.721, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:2.703,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'orenburg-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.223, tax:-1.392,
    extraRows: [
      {label:'Проценты к получению (2320)', value:18.137},
      {label:'Проценты к уплате (2330)', value:-17.914},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-1.392},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:1733.825, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2067.511, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:80.35, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-84.67,
  },
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'orenburg-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.002, tax:-34.502,
    extraRows: [
      {label:'Проценты к уплате (2330)', value:-3.002},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-34.502},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2563.879, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2688.13, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:109.376, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-181.213,
  },
};
const orenburgruPresupuestoOverlayByYear = {};

const orenburgruPasesData = [];
const orenburgruResultadosData = {};
const orenburgruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['orenburg-ru'] = {
  revenueLinesByYear: orenburgruRevenueLinesByYear, expenseLinesByYear: orenburgruExpenseLinesByYear,
  fiscalYearMeta: orenburgruFiscalYearMeta, pasesData: orenburgruPasesData,
  resultadosData: orenburgruResultadosData, titulosData: orenburgruTitulosData,
  presupuestoOverlayByYear: orenburgruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'orenburg-ru-bfo-2021-datos': {
    id:'orenburg-ru-bfo-2021-datos', clubId:'orenburg-ru',
    title:'ANO Football Club Orenburg — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Orenburg/bfo-2021-datos.md.',
  },
  'orenburg-ru-bfo-2022-datos': {
    id:'orenburg-ru-bfo-2022-datos', clubId:'orenburg-ru',
    title:'ANO Football Club Orenburg — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Orenburg/bfo-2022-datos.md.',
  },
  'orenburg-ru-bfo-2023-datos': {
    id:'orenburg-ru-bfo-2023-datos', clubId:'orenburg-ru',
    title:'ANO Football Club Orenburg — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Orenburg/bfo-2023-datos.md.',
  },
  'orenburg-ru-bfo-2024-datos': {
    id:'orenburg-ru-bfo-2024-datos', clubId:'orenburg-ru',
    title:'ANO Football Club Orenburg — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Orenburg/bfo-2024-datos.md.',
  },
  'orenburg-ru-bfo-2025-datos': {
    id:'orenburg-ru-bfo-2025-datos', clubId:'orenburg-ru',
    title:'ANO Football Club Orenburg — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Orenburg/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Orenburg/bfo-2025-datos.md.',
  },
});

memberCountByClub['orenburg-ru'] = null;

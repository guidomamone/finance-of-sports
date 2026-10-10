// ============================================================================
// data/akrontolyatti-ru-data.js — ANO Football Club Akron (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Akron Tolyatti/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "akrontolyatti-ru" — slug de "Akron Tolyatti" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "ANO Football Club Akron" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): АНО "Футбольный клуб "Акрон" (ИНН 6376025783)
//   displayName        ok        "Akron Tolyatti" — nombre de la carpeta del club en Clubes/
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
//   sourceId           ok        "akrontolyatti-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-pervayaliga" — roster cacheado de "2021–22 Russian First Division" (tools/club-league-reference/ru.json), coincidencia exacta "Akron Tolyatti"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"akrontolyatti-ru-bfo-2021-datos"}
// ============================================================================

const akrontolyattiruRevenueLinesByYear = {
  // 2021: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2021-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:3.532, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:0.428, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:321.341, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2022: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2022-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:13.166, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1.087, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:42, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:351.134, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2023-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:55.338, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:49.914, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:0.253, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:466.986, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2024: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2024-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:337.147, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:56.645, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:0.634, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:1345.02, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие поступления (6250, форма 6)', normalizedCategory:'other_income', amountNative:67.764, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2025: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2025-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2025: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:691.943, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:57.41, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:1615.051, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие поступления (6250, форма 6)', normalizedCategory:'other_income', amountNative:60.89, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const akrontolyattiruExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-1.339, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-0.152, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-0.823, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-2.368, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-96.956, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-152.754, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-44.379, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-22.947, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-0.871, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-1.53, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-9.955, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-2.176, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-126.309, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-200.665, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-7.817, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-43.703, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2.16, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-5.455, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-15.273, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-52.706, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-457.76, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-16.423, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-10.774, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-59.467, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-201.568, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-125.022, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-35.145, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-42.105, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-1172.825, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-51.423, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-20.377, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-93.929, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-244.247, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-432.555, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-40.473, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-38.472, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-1546.483, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-47.446, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-32.51, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-77.378, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const akrontolyattiruFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'akrontolyatti-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.011, tax:-0.322,
    extraRows: [
      {label:'Проценты к получению (2320)', value:0.011},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-0.322},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:3.532, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:1.339, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:96.956, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:3.272,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'akrontolyatti-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:2.541, tax:5.106,
    extraRows: [
      {label:'Проценты к получению (2320)', value:2.541},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:5.106},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:13.166, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:0.871, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:126.309, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:22.008,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'akrontolyatti-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:1.235, tax:-13.454,
    extraRows: [
      {label:'Проценты к получению (2320)', value:1.235},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-13.454},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:55.338, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2.16, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:457.76, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-59.746,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'akrontolyatti-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:8.58, tax:3.354,
    extraRows: [
      {label:'Проценты к получению (2320)', value:8.58},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:3.354},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:337.147, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:201.568, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:1172.825, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:76.75,
  },
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'akrontolyatti-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:7.168, tax:14.346,
    extraRows: [
      {label:'Проценты к получению (2320)', value:7.84},
      {label:'Проценты к уплате (2330)', value:-0.672},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:14.346},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:691.943, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:244.247, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:1546.483, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-12.756,
  },
};
const akrontolyattiruPresupuestoOverlayByYear = {};

const akrontolyattiruPasesData = [];
const akrontolyattiruResultadosData = {};
const akrontolyattiruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['akrontolyatti-ru'] = {
  revenueLinesByYear: akrontolyattiruRevenueLinesByYear, expenseLinesByYear: akrontolyattiruExpenseLinesByYear,
  fiscalYearMeta: akrontolyattiruFiscalYearMeta, pasesData: akrontolyattiruPasesData,
  resultadosData: akrontolyattiruResultadosData, titulosData: akrontolyattiruTitulosData,
  presupuestoOverlayByYear: akrontolyattiruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'akrontolyatti-ru-bfo-2022-datos': {
    id:'akrontolyatti-ru-bfo-2022-datos', clubId:'akrontolyatti-ru',
    title:'ANO Football Club Akron — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akron Tolyatti/bfo-2022-datos.md.',
  },
  'akrontolyatti-ru-bfo-2023-datos': {
    id:'akrontolyatti-ru-bfo-2023-datos', clubId:'akrontolyatti-ru',
    title:'ANO Football Club Akron — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akron Tolyatti/bfo-2023-datos.md.',
  },
  'akrontolyatti-ru-bfo-2024-datos': {
    id:'akrontolyatti-ru-bfo-2024-datos', clubId:'akrontolyatti-ru',
    title:'ANO Football Club Akron — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akron Tolyatti/bfo-2024-datos.md.',
  },
  'akrontolyatti-ru-bfo-2025-datos': {
    id:'akrontolyatti-ru-bfo-2025-datos', clubId:'akrontolyatti-ru',
    title:'ANO Football Club Akron — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akron Tolyatti/bfo-2025-datos.md.',
  },
  'akrontolyatti-ru-bfo-2021-datos': {
    id:'akrontolyatti-ru-bfo-2021-datos', clubId:'akrontolyatti-ru',
    title:'ANO Football Club Akron — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akron Tolyatti/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Más el formulario 6 (uso de fondos con fin específico: aportes y gastos del programa, sin el 6240; 6100 + 6200 − 6300 = 6400); resultado = 2400 + (6200 − 6240) − 6300. Transcripción legible: Clubes/Rusia/Akron Tolyatti/bfo-2021-datos.md.',
  },
});

memberCountByClub['akrontolyatti-ru'] = null;

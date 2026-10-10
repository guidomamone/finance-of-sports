// ============================================================================
// data/krasnodar-ru-data.js — OOO Football Club Krasnodar (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Krasnodar/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "krasnodar-ru" — slug de "Krasnodar" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "OOO Football Club Krasnodar" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social (ООО «Футбольный клуб «Краснодар»
//   displayName        ok        "Krasnodar" — nombre de la carpeta del club en Clubes/
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
//   fxRef              ok        "RUB@2021-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 74.2926. --escribir agrega 'RUB@2021-12-31' a FX_CLOSE
//   sourceId           ok        "krasnodar-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia exacta "Krasnodar"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"krasnodar-ru-bfo-2021-datos"}
// ============================================================================

const krasnodarruRevenueLinesByYear = {
  // 2021: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2021-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:3368.643, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1384.005, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2022: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2022-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:3180.351, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:4500.664, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2023-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:4030.342, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:6625.309, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2024: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2024-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2024: [
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:7186.301, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Размещение спонсорской рекламы', normalizedCategory:'sponsorship_commercial', amountNative:1905.084, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Реализация коммерческих прав на трансляцию', normalizedCategory:'broadcasting', amountNative:920.893, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Размещение рекламной продукции', normalizedCategory:'sponsorship_commercial', amountNative:692.181, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Атрибутика', normalizedCategory:'sponsorship_commercial', amountNative:340.684, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Продажа билетов', normalizedCategory:'matchday_competition', amountNative:311.228, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Продажа абонементов', normalizedCategory:'season_tickets', amountNative:254.062, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие', normalizedCategory:'other_income', amountNative:75.777, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  // 2025: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2025-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2025: [
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:5781.574, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Размещение спонсорской рекламы', normalizedCategory:'sponsorship_commercial', amountNative:1815.143, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Реализация коммерческих прав на трансляцию', normalizedCategory:'broadcasting', amountNative:1199.719, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Размещение рекламной продукции', normalizedCategory:'sponsorship_commercial', amountNative:914.103, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Атрибутика', normalizedCategory:'sponsorship_commercial', amountNative:525.112, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Продажа билетов', normalizedCategory:'matchday_competition', amountNative:519.266, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Продажа абонементов', normalizedCategory:'season_tickets', amountNative:419.637, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие', normalizedCategory:'other_income', amountNative:59.877, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
};
const krasnodarruExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-4497.071, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-150.006, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-108.919, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-3055.249, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-3238.92, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-172.376, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-125.734, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-9089.867, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-3987.725, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-240.986, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-121.486, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-3085.193, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-7330.711, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Материальные затраты', normalizedCategory:'admin_general_expense', amountNative:-341.694, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы, связанные с основным видом деятельности (в том числе расходы по организации тренировочного процесса, подготовке к соревнованиям)', normalizedCategory:'match_organisation_expense', amountNative:-972.149, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы на оплату труда', normalizedCategory:'wages_squad', amountNative:-3961.42, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Отчисления на социальные нужды', normalizedCategory:'wages_squad', amountNative:-362.808, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Амортизация', normalizedCategory:'depreciation', amountNative:-91.4, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-5187.116, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Материальные затраты', normalizedCategory:'admin_general_expense', amountNative:-487.343, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы, связанные с основным видом деятельности (в том числе расходы по организации тренировочного процесса, подготовке к соревнованиям)', normalizedCategory:'match_organisation_expense', amountNative:-1245.217, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы на оплату труда', normalizedCategory:'wages_squad', amountNative:-4599.209, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Отчисления на социальные нужды', normalizedCategory:'wages_squad', amountNative:-413.407, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Амортизация', normalizedCategory:'depreciation', amountNative:-89.29, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
};
const krasnodarruFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'krasnodar-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:73.322, tax:594.387,
    extraRows: [
      {label:'Доходы от участия в других организациях (2310)', value:0.612},
      {label:'Проценты к получению (2320)', value:72.71},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:594.387},
    ],
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2024, 2025): Inversiones (amortizaciones y depreciación), Organización de partidos
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:3368.643, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:4497.071, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-2390.888,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'krasnodar-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:52.206, tax:84.424,
    extraRows: [
      {label:'Доходы от участия в других организациях (2310)', value:31.721},
      {label:'Проценты к получению (2320)', value:52.074},
      {label:'Проценты к уплате (2330)', value:-31.589},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:84.424},
    ],
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2024, 2025): Inversiones (amortizaciones y depreciación), Organización de partidos
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:3180.351, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:3238.92, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-4809.252,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'krasnodar-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:881.4, tax:212.724,
    extraRows: [
      {label:'Доходы от участия в других организациях (2310)', value:767.606},
      {label:'Проценты к получению (2320)', value:149.475},
      {label:'Проценты к уплате (2330)', value:-35.681},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:212.724},
    ],
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2024, 2025): Inversiones (amortizaciones y depreciación), Organización de partidos
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:4030.342, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:3987.725, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:4314.385,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'krasnodar-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:1279.59, tax:504.643,
    extraRows: [
      {label:'Доходы от участия в других организациях (2310)', value:1294.48},
      {label:'Проценты к получению (2320)', value:29.027},
      {label:'Проценты к уплате (2330)', value:-43.917},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:504.643},
    ],
    incluidoEn:{}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:410.261,
  },
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'krasnodar-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:1248.868, tax:432.001,
    extraRows: [
      {label:'Доходы от участия в других организациях (2310)', value:1185.951},
      {label:'Проценты к получению (2320)', value:108.155},
      {label:'Проценты к уплате (2330)', value:-45.238},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:432.001},
    ],
    incluidoEn:{}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:893.718,
  },
};
const krasnodarruPresupuestoOverlayByYear = {};

const krasnodarruPasesData = [];
const krasnodarruResultadosData = {};
const krasnodarruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['krasnodar-ru'] = {
  revenueLinesByYear: krasnodarruRevenueLinesByYear, expenseLinesByYear: krasnodarruExpenseLinesByYear,
  fiscalYearMeta: krasnodarruFiscalYearMeta, pasesData: krasnodarruPasesData,
  resultadosData: krasnodarruResultadosData, titulosData: krasnodarruTitulosData,
  presupuestoOverlayByYear: krasnodarruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'krasnodar-ru-bfo-2021-datos': {
    id:'krasnodar-ru-bfo-2021-datos', clubId:'krasnodar-ru',
    title:'OOO Football Club Krasnodar — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Krasnodar/bfo-2021-datos.md.',
  },
  'krasnodar-ru-bfo-2022-datos': {
    id:'krasnodar-ru-bfo-2022-datos', clubId:'krasnodar-ru',
    title:'OOO Football Club Krasnodar — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Krasnodar/bfo-2022-datos.md.',
  },
  'krasnodar-ru-bfo-2023-datos': {
    id:'krasnodar-ru-bfo-2023-datos', clubId:'krasnodar-ru',
    title:'OOO Football Club Krasnodar — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Krasnodar/bfo-2023-datos.md.',
  },
  'krasnodar-ru-bfo-2024-datos': {
    id:'krasnodar-ru-bfo-2024-datos', clubId:'krasnodar-ru',
    title:'OOO Football Club Krasnodar — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Krasnodar/bfo-2024-datos.md.',
  },
  'krasnodar-ru-bfo-2025-datos': {
    id:'krasnodar-ru-bfo-2025-datos', clubId:'krasnodar-ru',
    title:'OOO Football Club Krasnodar — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Krasnodar/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Krasnodar/bfo-2025-datos.md.',
  },
});

memberCountByClub['krasnodar-ru'] = null;

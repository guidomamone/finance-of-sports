// ============================================================================
// data/rubinkazan-ru-data.js — OOO Football Club Rubin (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Rubin Kazan/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "rubinkazan-ru" — slug de "Rubin Kazan" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "OOO Football Club Rubin" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): ООО "Футбольный клуб "Рубин" (ИНН 1661055547)
//   displayName        ok        "Rubin Kazan" — nombre de la carpeta del club en Clubes/
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
//   sourceId           ok        "rubinkazan-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Rubin" = "Rubin Kazan"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"rubinkazan-ru-bfo-2021-datos"}
// ============================================================================

const rubinkazanruRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Rubin Kazan/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:3149.141, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2026.431, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Rubin Kazan/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2468.547, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2747.875, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Rubin Kazan/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2139.986, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1770.225, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2024-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Rubin Kazan/bfo-2024-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:4137.976, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:1086.189, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const rubinkazanruExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2642.177, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-4.613, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-304.845, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1656.48, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2118.976, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-71.279, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-366.904, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-4199.92, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2653.208, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-72.158, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-216.81, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1381.255, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-4056.276, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-5.079, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-152.92, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-952.683, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const rubinkazanruFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
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
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:3149.141, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2642.177, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:542.826,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
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
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2468.547, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2118.976, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-1161.236,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
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
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2139.986, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2653.208, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-236.411,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
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
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:4137.976, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:4056.276, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:136.163,
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

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'rubinkazan-ru-bfo-2021-datos': {
    id:'rubinkazan-ru-bfo-2021-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Rubin Kazan/bfo-2021-datos.md.',
  },
  'rubinkazan-ru-bfo-2022-datos': {
    id:'rubinkazan-ru-bfo-2022-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Rubin Kazan/bfo-2022-datos.md.',
  },
  'rubinkazan-ru-bfo-2023-datos': {
    id:'rubinkazan-ru-bfo-2023-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Rubin Kazan/bfo-2023-datos.md.',
  },
  'rubinkazan-ru-bfo-2024-datos': {
    id:'rubinkazan-ru-bfo-2024-datos', clubId:'rubinkazan-ru',
    title:'OOO Football Club Rubin — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Rubin Kazan/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Rubin Kazan/bfo-2024-datos.md.',
  },
});

memberCountByClub['rubinkazan-ru'] = null;

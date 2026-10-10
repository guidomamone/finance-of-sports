// ============================================================================
// data/cskamoscow-ru-data.js — AO Professional Football Club CSKA (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/CSKA Moscow/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "cskamoscow-ru" — slug de "CSKA Moscow" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "AO Professional Football Club CSKA" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): АО "Профессиональный футбольный клуб ЦСКА" (ИН
//   displayName        ok        "CSKA Moscow" — nombre de la carpeta del club en Clubes/
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
//   sourceId           ok        "cskamoscow-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "CSKA" = "CSKA Moscow"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"cskamoscow-ru-bfo-2021-datos"}
// ============================================================================

const cskamoscowruRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/CSKA Moscow/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/CSKA Moscow/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:4297.346, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:3735.752, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/CSKA Moscow/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/CSKA Moscow/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:5374.097, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:4829.805, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/CSKA Moscow/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/CSKA Moscow/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:6039.691, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:3081.561, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const cskamoscowruExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-8035.801, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-0.75, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-22.975, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-673.972, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-6672.262, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-0.29, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-28.648, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-4780.201, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-7910.561, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-2.371, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-36.795, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-2177.867, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const cskamoscowruFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'cskamoscow-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-202.969, tax:168.057,
    extraRows: [
      {label:'Проценты к получению (2320)', value:2.947},
      {label:'Проценты к уплате (2330)', value:-205.916},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:168.057},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:4297.346, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:8035.801, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-735.312,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'cskamoscow-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-316.18, tax:422.094,
    extraRows: [
      {label:'Проценты к получению (2320)', value:2.555},
      {label:'Проценты к уплате (2330)', value:-318.735},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:422.094},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:5374.097, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:6672.262, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-1171.585,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'cskamoscow-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-263.249, tax:249.512,
    extraRows: [
      {label:'Проценты к получению (2320)', value:47.727},
      {label:'Проценты к уплате (2330)', value:-310.976},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:249.512},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:6039.691, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:7910.561, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-1020.079,
  },
};
const cskamoscowruPresupuestoOverlayByYear = {};

const cskamoscowruPasesData = [];
const cskamoscowruResultadosData = {};
const cskamoscowruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['cskamoscow-ru'] = {
  revenueLinesByYear: cskamoscowruRevenueLinesByYear, expenseLinesByYear: cskamoscowruExpenseLinesByYear,
  fiscalYearMeta: cskamoscowruFiscalYearMeta, pasesData: cskamoscowruPasesData,
  resultadosData: cskamoscowruResultadosData, titulosData: cskamoscowruTitulosData,
  presupuestoOverlayByYear: cskamoscowruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'cskamoscow-ru-bfo-2021-datos': {
    id:'cskamoscow-ru-bfo-2021-datos', clubId:'cskamoscow-ru',
    title:'AO Professional Football Club CSKA — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/CSKA Moscow/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/CSKA Moscow/bfo-2021-datos.md.',
  },
  'cskamoscow-ru-bfo-2022-datos': {
    id:'cskamoscow-ru-bfo-2022-datos', clubId:'cskamoscow-ru',
    title:'AO Professional Football Club CSKA — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/CSKA Moscow/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/CSKA Moscow/bfo-2022-datos.md.',
  },
  'cskamoscow-ru-bfo-2023-datos': {
    id:'cskamoscow-ru-bfo-2023-datos', clubId:'cskamoscow-ru',
    title:'AO Professional Football Club CSKA — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/CSKA Moscow/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/CSKA Moscow/bfo-2023-datos.md.',
  },
});

memberCountByClub['cskamoscow-ru'] = null;

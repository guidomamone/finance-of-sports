// ============================================================================
// data/parinizhnynovgorod-ru-data.js — ANO Football Club Pari Nizhny Novgorod (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "parinizhnynovgorod-ru" — slug de "Pari Nizhny Novgorod" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "ANO Football Club Pari Nizhny Novgorod" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social vigente (АНО «Футбольный клуб «Па
//   displayName        ok        "Pari Nizhny Novgorod" — nombre de la carpeta del club en Clubes/
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
//   sourceId           ok        "parinizhnynovgorod-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Nizhny Novgorod" = "Pari N
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"parinizhnynovgorod-ru-bfo-2021-datos"}
// ============================================================================

const parinizhnynovgorodruRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2025: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:657.779, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'поступления по трансферам', normalizedCategory:'player_sales', amountNative:6.214, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'призовые от РФС', normalizedCategory:'competition_bonus', amountNative:39.958, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'прочие поступления (бартер, списание просроченной задолженности, услуги за сдачу в аренду и предоставление прочих услуг)', normalizedCategory:'other_income', amountNative:85.293, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:1646.878, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:150, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:291.117, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:7.176, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:574.553, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:100, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:647.871, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:195.082, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:876, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:100, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:656.634, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:310.394, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:811.954, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:100, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2024: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:771.264, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:297.629, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Целевые взносы (6220, форма 6)', normalizedCategory:'other_income', amountNative:1487.999, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Добровольные имущественные взносы и пожертвования (6230, форма 6)', normalizedCategory:'other_income', amountNative:100, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const parinizhnynovgorodruExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-234.785, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-254.441, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-308.952, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-1478.802, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-351.481, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-0.168, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-7.379, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-117.293, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-22.797, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-6.163, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-648.61, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-64.685, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-5.515, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-0.414, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-237.925, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-140.194, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-179.869, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-754.41, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-105.656, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-2.192, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-369.708, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-226.598, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-367.14, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-1055.294, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-191.491, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-3.905, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-722.498, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-216.704, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-136.558, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на целевые мероприятия (6310, форма 6)', normalizedCategory:'lump_football_operations_expense', amountNative:-740.572, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на содержание аппарата управления (6320, форма 6)', normalizedCategory:'admin_general_expense', amountNative:-735.042, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Приобретение основных средств, инвентаря и иного имущества (6330, форма 6)', normalizedCategory:'other_expenses', amountNative:-30.736, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (6350, форма 6)', normalizedCategory:'other_expenses', amountNative:-0.223, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const parinizhnynovgorodruFiscalYearMeta = {
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'parinizhnynovgorod-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:4.073, tax:-2.518,
    extraRows: [
      {label:'Проценты к получению (2320)', value:4.073},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-2.518},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:657.779, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:234.785, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:1478.802, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-48.332,
  },
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'parinizhnynovgorod-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:-33.12,
    extraRows: [
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-33.12},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:291.117, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:117.293, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:648.61, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:74.248,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'parinizhnynovgorod-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:-76.12,
    extraRows: [
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-76.12},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:647.871, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:237.925, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:754.41, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:322.587,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'parinizhnynovgorod-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:7.988, tax:0.93,
    extraRows: [
      {label:'Проценты к получению (2320)', value:7.988},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:0.93},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:656.634, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:369.708, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:1055.294, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-326.236,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'parinizhnynovgorod-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:15.408, tax:-8.353,
    extraRows: [
      {label:'Проценты к получению (2320)', value:15.408},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-8.353},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:771.264, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:722.498, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Расходы на целевые мероприятия (6310, форма 6)', lado:'gasto', importe:740.572, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:81.613,
  },
};
const parinizhnynovgorodruPresupuestoOverlayByYear = {};

const parinizhnynovgorodruPasesData = [];
const parinizhnynovgorodruResultadosData = {};
const parinizhnynovgorodruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['parinizhnynovgorod-ru'] = {
  revenueLinesByYear: parinizhnynovgorodruRevenueLinesByYear, expenseLinesByYear: parinizhnynovgorodruExpenseLinesByYear,
  fiscalYearMeta: parinizhnynovgorodruFiscalYearMeta, pasesData: parinizhnynovgorodruPasesData,
  resultadosData: parinizhnynovgorodruResultadosData, titulosData: parinizhnynovgorodruTitulosData,
  presupuestoOverlayByYear: parinizhnynovgorodruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'parinizhnynovgorod-ru-bfo-2021-datos': {
    id:'parinizhnynovgorod-ru-bfo-2021-datos', clubId:'parinizhnynovgorod-ru',
    title:'ANO Football Club Pari Nizhny Novgorod — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md.',
  },
  'parinizhnynovgorod-ru-bfo-2022-datos': {
    id:'parinizhnynovgorod-ru-bfo-2022-datos', clubId:'parinizhnynovgorod-ru',
    title:'ANO Football Club Pari Nizhny Novgorod — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.md.',
  },
  'parinizhnynovgorod-ru-bfo-2023-datos': {
    id:'parinizhnynovgorod-ru-bfo-2023-datos', clubId:'parinizhnynovgorod-ru',
    title:'ANO Football Club Pari Nizhny Novgorod — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.md.',
  },
  'parinizhnynovgorod-ru-bfo-2024-datos': {
    id:'parinizhnynovgorod-ru-bfo-2024-datos', clubId:'parinizhnynovgorod-ru',
    title:'ANO Football Club Pari Nizhny Novgorod — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.md.',
  },
  'parinizhnynovgorod-ru-bfo-2025-datos': {
    id:'parinizhnynovgorod-ru-bfo-2025-datos', clubId:'parinizhnynovgorod-ru',
    title:'ANO Football Club Pari Nizhny Novgorod — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.md.',
  },
});

memberCountByClub['parinizhnynovgorod-ru'] = null;

// ============================================================================
// data/sochi-ru-data.js — OOO Football Club Sochi (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Sochi/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "sochi-ru" — slug de "Sochi" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "OOO Football Club Sochi" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social (ООО «Футбольный клуб «Сочи», ОГР
//   displayName        ok        "Sochi" — nombre de la carpeta del club en Clubes/
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
//   sourceId           ok        "sochi-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia exacta "Sochi"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"sochi-ru-bfo-2021-datos"}
// ============================================================================

const sochiruRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2024-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2024-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2025-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2025-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Спонсорская помощь для организации и проведения спортивных мероприятий', normalizedCategory:'sponsorship_commercial', amountNative:1847.808, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи билетов на игры', normalizedCategory:'matchday_competition', amountNative:59.968, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доходы от продажи прав на трансляцию', normalizedCategory:'broadcasting', amountNative:154.672, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи сувенирной продукции', normalizedCategory:'sponsorship_commercial', amountNative:5.202, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочая реализация', normalizedCategory:'other_income', amountNative:22.695, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доход от выбытия регистраций игроков (включая доход от аренды)', normalizedCategory:'player_sales', amountNative:32.66, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Курсовые разницы', normalizedCategory:'other_income', amountNative:6.112, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Призовые средства (выплаты РФС, прочих организаций)', normalizedCategory:'competition_bonus', amountNative:66.385, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доходы от выбытия ЦБ', normalizedCategory:'other_income', amountNative:50.808, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доходы от выплат на развитие детско-юношеского футбола, целевое финансирование', normalizedCategory:'youth_football', amountNative:31.338, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие доходы', normalizedCategory:'other_income', amountNative:14.291, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Спонсорская помощь для организации и проведения спортивных мероприятий', normalizedCategory:'sponsorship_commercial', amountNative:2120.139, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи билетов на игры', normalizedCategory:'matchday_competition', amountNative:61.567, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доходы от продажи прав на трансляцию', normalizedCategory:'broadcasting', amountNative:610.611, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи сувенирной продукции', normalizedCategory:'sponsorship_commercial', amountNative:8.316, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочая реализация', normalizedCategory:'other_income', amountNative:29.27, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доход от выбытия регистраций игроков (включая доход от аренды)', normalizedCategory:'player_sales', amountNative:709.07, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Курсовые разницы', normalizedCategory:'other_income', amountNative:80.638, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расформирование резерва под обесценение МПЗ', normalizedCategory:'other_income', amountNative:26.241, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Призовые средства (выплаты РФС, прочих организаций)', normalizedCategory:'competition_bonus', amountNative:48.458, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доходы от выплат на развитие детско-юношеского футбола, целевое финансирование', normalizedCategory:'youth_football', amountNative:13.178, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие доходы', normalizedCategory:'other_income', amountNative:20.335, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:2895.934, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Доход от выбытия регистраций игроков (включая доход аренды)', normalizedCategory:'player_sales', amountNative:385.808, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Курсовые разницы', normalizedCategory:'other_income', amountNative:66.523, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Призовые средства (выплаты РФС, прочих организаций)', normalizedCategory:'competition_bonus', amountNative:60.2, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие доходы', normalizedCategory:'other_income', amountNative:10.742, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2024-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2024-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2024: [
    { rawLabel:'Спонсорская помощь для организации и проведения спортивных мероприятий', normalizedCategory:'sponsorship_commercial', amountNative:2844.563, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи билетов на игры', normalizedCategory:'matchday_competition', amountNative:35.961, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доходы от продажи прав на трансляцию', normalizedCategory:'broadcasting', amountNative:187.354, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи сувенирной продукции', normalizedCategory:'sponsorship_commercial', amountNative:9.445, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочая реализация', normalizedCategory:'other_income', amountNative:6.691, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доход от выбытия регистраций игроков (включая доход аренды)', normalizedCategory:'player_sales', amountNative:163.766, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Курсовые разницы', normalizedCategory:'other_income', amountNative:5.781, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Призовые средства (выплаты РФС, прочих организаций)', normalizedCategory:'competition_bonus', amountNative:12.6, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие доходы', normalizedCategory:'other_income', amountNative:10.605, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2025-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Sochi/bfo-2025-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2025: [
    { rawLabel:'Спонсорская помощь для организации и проведения спортивных мероприятий', normalizedCategory:'sponsorship_commercial', amountNative:2341.194, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи билетов на игры', normalizedCategory:'matchday_competition', amountNative:50.092, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доходы от продажи прав на трансляцию', normalizedCategory:'broadcasting', amountNative:197.117, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Выручка от продажи сувенирной продукции', normalizedCategory:'sponsorship_commercial', amountNative:9.757, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочая реализация', normalizedCategory:'other_income', amountNative:5.243, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Призовые выплаты (выплаты РФС, прочих организаций)', normalizedCategory:'competition_bonus', amountNative:49.772, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Доход от выбытия регистраций игроков (включая доход аренды и компенсационные выплаты)', normalizedCategory:'player_sales', amountNative:60.353, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие', normalizedCategory:'other_income', amountNative:12.64, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
};
const sochiruExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2406.278, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-4.161, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-67.653, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Курсовые разницы', normalizedCategory:'other_expenses', amountNative:-8.306, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Резерв под обесценение МПЗ', normalizedCategory:'other_expenses', amountNative:-26.241, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие расходы', normalizedCategory:'other_expenses', amountNative:-6.361, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2823.867, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-6.947, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-124.221, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Благотворительная помощь', normalizedCategory:'other_expenses', amountNative:-46.233, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Расходы по целевому финансированию', normalizedCategory:'youth_other_sports_expense', amountNative:-13.178, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Солидарные выплаты на подготовку спортсменов', normalizedCategory:'other_expenses', amountNative:-13.042, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Членские взносы', normalizedCategory:'admin_general_expense', amountNative:-17.5, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие расходы', normalizedCategory:'other_expenses', amountNative:-3.84, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2326.957, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-31.077, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-71.486, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Резерв по сомнительным долгам', normalizedCategory:'other_expenses', amountNative:-41.333, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие расходы', normalizedCategory:'other_expenses', amountNative:-93.569, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-2830.285, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-53.618, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-92.949, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Благотворительная помощь', normalizedCategory:'other_expenses', amountNative:-2.474, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Резерв по сомнительным долгам', normalizedCategory:'other_expenses', amountNative:-9.723, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие расходы', normalizedCategory:'other_expenses', amountNative:-133.404, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-3248.653, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-48.978, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Управленческие расходы (2220)', normalizedCategory:'admin_general_expense', amountNative:-122.182, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Расходы на развитие молодежного футбола', normalizedCategory:'youth_other_sports_expense', amountNative:-660.25, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Курсовые разницы', normalizedCategory:'other_expenses', amountNative:-12.252, disclosureLevel:'detailed' }, // pág. ?, ?
    { rawLabel:'Прочие', normalizedCategory:'other_expenses', amountNative:-9.363, disclosureLevel:'detailed' }, // pág. ?, ?
  ],
};
const sochiruFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'sochi-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:8.378, tax:42.832,
    extraRows: [
      {label:'Проценты к получению (2320)', value:8.378},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:42.832},
    ],
    incluidoEn:{"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2406.278, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-175.851,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'sochi-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:71.256, tax:-159.742,
    extraRows: [
      {label:'Проценты к получению (2320)', value:71.518},
      {label:'Проценты к уплате (2330)', value:-0.262},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-159.742},
    ],
    incluidoEn:{"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2823.867, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:590.509,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'sochi-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:175.96, tax:-223.4,
    extraRows: [
      {label:'Проценты к получению (2320)', value:175.96},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-223.4},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true} }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:2895.934, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2326.957, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:807.344,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2024-12-31',
    sourceId:'sochi-ru-bfo-2024-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:398.665, tax:-89.652,
    extraRows: [
      {label:'Проценты к получению (2320)', value:398.665},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-89.652},
    ],
    incluidoEn:{"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:2830.285, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:463.325,
  },
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2025-12-31',
    sourceId:'sochi-ru-bfo-2025-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:417.666, tax:80.581,
    extraRows: [
      {label:'Проценты к получению (2320)', value:417.666},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:80.581},
    ],
    incluidoEn:{"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:3248.653, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-877.263,
  },
};
const sochiruPresupuestoOverlayByYear = {};

const sochiruPasesData = [];
const sochiruResultadosData = {};
const sochiruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sochi-ru'] = {
  revenueLinesByYear: sochiruRevenueLinesByYear, expenseLinesByYear: sochiruExpenseLinesByYear,
  fiscalYearMeta: sochiruFiscalYearMeta, pasesData: sochiruPasesData,
  resultadosData: sochiruResultadosData, titulosData: sochiruTitulosData,
  presupuestoOverlayByYear: sochiruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'sochi-ru-bfo-2021-datos': {
    id:'sochi-ru-bfo-2021-datos', clubId:'sochi-ru',
    title:'OOO Football Club Sochi — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Sochi/bfo-2021-datos.md.',
  },
  'sochi-ru-bfo-2022-datos': {
    id:'sochi-ru-bfo-2022-datos', clubId:'sochi-ru',
    title:'OOO Football Club Sochi — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Sochi/bfo-2022-datos.md.',
  },
  'sochi-ru-bfo-2023-datos': {
    id:'sochi-ru-bfo-2023-datos', clubId:'sochi-ru',
    title:'OOO Football Club Sochi — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Sochi/bfo-2023-datos.md.',
  },
  'sochi-ru-bfo-2024-datos': {
    id:'sochi-ru-bfo-2024-datos', clubId:'sochi-ru',
    title:'OOO Football Club Sochi — отчетность 2024 в ГИР БО (bo.nalog.gov.ru), ejercicio 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Sochi/bfo-2024-datos.md.',
  },
  'sochi-ru-bfo-2025-datos': {
    id:'sochi-ru-bfo-2025-datos', clubId:'sochi-ru',
    title:'OOO Football Club Sochi — отчетность 2025 в ГИР БО (bo.nalog.gov.ru), ejercicio 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Sochi/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Sochi/bfo-2025-datos.md.',
  },
});

memberCountByClub['sochi-ru'] = null;

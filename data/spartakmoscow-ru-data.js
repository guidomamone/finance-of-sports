// ============================================================================
// data/spartakmoscow-ru-data.js — AO Football Club Spartak-Moscow (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Spartak Moscow/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "spartakmoscow-ru" — slug de "Spartak Moscow" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "AO Football Club Spartak-Moscow" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): АО "Футбольный клуб "Спартак-Москва" (ИНН 7728
//   displayName        ok        "Spartak Moscow" — nombre de la carpeta del club en Clubes/
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
//   sourceId           ok        "spartakmoscow-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               pendiente null — coincidencia NO exacta en los rosters cacheados: "Spartak" en 2021–22 Russian Premier League | "Spartak-2 Moscow" en 2021–22 Russian First Division
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"spartakmoscow-ru-bfo-2021-datos"}
// ============================================================================

const spartakmoscowruRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Spartak Moscow/bfo-2021-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Spartak Moscow/bfo-2021-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2021: [
    { rawLabel:'Выручка (2110)', normalizedCategory:'lump_football_operations', amountNative:7991.133, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:2472.263, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const spartakmoscowruExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Себестоимость продаж (2120)', normalizedCategory:'lump_football_operations_expense', amountNative:-9041.728, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Коммерческие расходы (2210)', normalizedCategory:'admin_general_expense', amountNative:-54.015, disclosureLevel:'aggregated' }, // pág. ?, ?
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-2415.58, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const spartakmoscowruFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2021-12-31',
    sourceId:'spartakmoscow-ru-bfo-2021-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:26.361, tax:140.277,
    extraRows: [
      {label:'Проценты к получению (2320)', value:26.361},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:140.277},
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Выручка (2110)', lado:'ingreso', importe:7991.133, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
      {renglon:'Себестоимость продаж (2120)', lado:'gasto', importe:9041.728, motivo:'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:-881.289,
  },
};
const spartakmoscowruPresupuestoOverlayByYear = {};

const spartakmoscowruPasesData = [];
const spartakmoscowruResultadosData = {};
const spartakmoscowruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['spartakmoscow-ru'] = {
  revenueLinesByYear: spartakmoscowruRevenueLinesByYear, expenseLinesByYear: spartakmoscowruExpenseLinesByYear,
  fiscalYearMeta: spartakmoscowruFiscalYearMeta, pasesData: spartakmoscowruPasesData,
  resultadosData: spartakmoscowruResultadosData, titulosData: spartakmoscowruTitulosData,
  presupuestoOverlayByYear: spartakmoscowruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'spartakmoscow-ru-bfo-2021-datos': {
    id:'spartakmoscow-ru-bfo-2021-datos', clubId:'spartakmoscow-ru',
    title:'AO Football Club Spartak-Moscow — отчетность 2021 в ГИР БО (bo.nalog.gov.ru), ejercicio 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Spartak Moscow/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Spartak Moscow/bfo-2021-datos.md.',
  },
});

memberCountByClub['spartakmoscow-ru'] = null;

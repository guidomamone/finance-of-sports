// ============================================================================
// data/dynamomakhachkala-ru-data.js — ANO Football Club Dynamo (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Dynamo Makhachkala/bfo-2021-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "dynamomakhachkala-ru" — slug de "Dynamo Makhachkala" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "ANO Football Club Dynamo" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social del documento (АНО «Футбольный Кл
//   displayName        ok        "Dynamo Makhachkala" — nombre de la carpeta del club en Clubes/
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
//   sourceId           ok        "dynamomakhachkala-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Dynamo" = "Dynamo Makhachk
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"dynamomakhachkala-ru-bfo-2021-datos"}
// ============================================================================

const dynamomakhachkalaruRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Makhachkala/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Dynamo Makhachkala/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
  ],
};
const dynamomakhachkalaruExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-10)
  ],
};
const dynamomakhachkalaruFiscalYearMeta = {
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'dynamomakhachkala-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:0,
    extraRows: [
    ],
    incluidoEn:{"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true},"sponsorship_commercial":{"en":"lump_football_operations","posible":true},"wages_squad":{"en":"lump_football_operations_expense","posible":true}}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:0,
  },
};
const dynamomakhachkalaruPresupuestoOverlayByYear = {};

const dynamomakhachkalaruPasesData = [];
const dynamomakhachkalaruResultadosData = {};
const dynamomakhachkalaruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['dynamomakhachkala-ru'] = {
  revenueLinesByYear: dynamomakhachkalaruRevenueLinesByYear, expenseLinesByYear: dynamomakhachkalaruExpenseLinesByYear,
  fiscalYearMeta: dynamomakhachkalaruFiscalYearMeta, pasesData: dynamomakhachkalaruPasesData,
  resultadosData: dynamomakhachkalaruResultadosData, titulosData: dynamomakhachkalaruTitulosData,
  presupuestoOverlayByYear: dynamomakhachkalaruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'dynamomakhachkala-ru-bfo-2022-datos': {
    id:'dynamomakhachkala-ru-bfo-2022-datos', clubId:'dynamomakhachkala-ru',
    title:'ANO Football Club Dynamo — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Makhachkala/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Dynamo Makhachkala/bfo-2022-datos.md.',
  },
});

memberCountByClub['dynamomakhachkala-ru'] = null;

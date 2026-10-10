// ============================================================================
// data/akhmatgrozny-ru-data.js — ANO Republican Football Club Akhmat (Rusia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.md
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "akhmatgrozny-ru" — slug de "Akhmat Grozny" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "ANO Republican Football Club Akhmat" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): АНО "Республиканский футбольный клуб "Ахмат" (
//   displayName        ok        "Akhmat Grozny" — nombre de la carpeta del club en Clubes/
//   country            ok        "RU" — carpeta de país "Rusia" (tabla PAISES)
//   reportingCurrency  ok        "RUB" — moneda de curso legal de Rusia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 1 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "RUB" — moneda de curso legal de Rusia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "RUB@2022-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene RUB@2022-12-31 = 70.3375 (Tipo oficial del Banco de Rusia al 2022-12-31)
//   sourceId           ok        "akhmatgrozny-ru-bfo-2022-datos" — clubId + nombre del archivo en slug
//   liga               ok        "ru-premierliga" — roster cacheado de "2022–23 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Akhmat" = "Akhmat Grozny"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2022-12-31","sourceId":"akhmatgrozny-ru-bfo-2022-datos"}
// ============================================================================

const akhmatgroznyruRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Akhmat Grozny/bfo-2022-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2022: [
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:631.027, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2023-datos.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Rusia/Akhmat Grozny/bfo-2023-datos.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
  2023: [
    { rawLabel:'Прочие доходы (2340)', normalizedCategory:'other_income', amountNative:963.028, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const akhmatgroznyruExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-634.641, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Прочие расходы (2350)', normalizedCategory:'other_expenses', amountNative:-1009.451, disclosureLevel:'aggregated' }, // pág. ?, ?
  ],
};
const akhmatgroznyruFiscalYearMeta = {
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2022-12-31',
    sourceId:'akhmatgrozny-ru-bfo-2022-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:70.837, tax:-2.105,
    extraRows: [
      {label:'Проценты к получению (2320)', value:70.837},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-2.105},
    ],
    incluidoEn:{}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:65.118,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'RUB', fxRef:'RUB@2023-12-31',
    sourceId:'akhmatgrozny-ru-bfo-2023-datos',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:83.495, tax:-4.85,
    extraRows: [
      {label:'Проценты к получению (2320)', value:83.495},
      {label:'Налог на прибыль и прочее (2300 − 2400)', value:-4.85},
    ],
    incluidoEn:{}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:32.222,
  },
};
const akhmatgroznyruPresupuestoOverlayByYear = {};

const akhmatgroznyruPasesData = [];
const akhmatgroznyruResultadosData = {};
const akhmatgroznyruTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['akhmatgrozny-ru'] = {
  revenueLinesByYear: akhmatgroznyruRevenueLinesByYear, expenseLinesByYear: akhmatgroznyruExpenseLinesByYear,
  fiscalYearMeta: akhmatgroznyruFiscalYearMeta, pasesData: akhmatgroznyruPasesData,
  resultadosData: akhmatgroznyruResultadosData, titulosData: akhmatgroznyruTitulosData,
  presupuestoOverlayByYear: akhmatgroznyruPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'akhmatgrozny-ru-bfo-2022-datos': {
    id:'akhmatgrozny-ru-bfo-2022-datos', clubId:'akhmatgrozny-ru',
    title:'ANO Republican Football Club Akhmat — отчетность 2022 в ГИР БО (bo.nalog.gov.ru), ejercicio 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.md.',
  },
  'akhmatgrozny-ru-bfo-2023-datos': {
    id:'akhmatgrozny-ru-bfo-2023-datos', clubId:'akhmatgrozny-ru',
    title:'ANO Republican Football Club Akhmat — отчетность 2023 в ГИР БО (bo.nalog.gov.ru), ejercicio 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akhmat Grozny/bfo-2023-datos.md.',
  },
});

memberCountByClub['akhmatgrozny-ru'] = null;

// ============================================================================
// data/juventus-it-data.js — Juventus Football Club S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "juventus-it" — slug de "Juventus" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Juventus Football Club S.p.A." — el .md, 3 veces (nombre del club + forma societaria)
//   displayName        ok        "Juventus" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (296 de 310 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 140 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2012 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2012-06-30" — año del ejercicio + mes de cierre (contenido del .md (296 de 310 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2012-06-30" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.794281. --escribir agrega 'EUR@2012-06-30' a FX_CLOSE
//   sourceId           ok        "juventus-it-annual-financial-report-2011-12" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2011–12 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Juventus"
//
// FISCAL YEAR META PROPUESTO para 2012 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2012: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2012-06-30","sourceId":"juventus-it-annual-financial-report-2011-12"}
// ============================================================================

const juventusitRevenueLinesByYear = {
  // 2012: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2011-12.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2012: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:31.824261, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.99
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:90.581926, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:53.452409, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:18.433501, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.94
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:19.494134, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.98
  ],
  // 2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2012-13.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2012-13.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2013: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:38.051069, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:163.47767, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:52.598893, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:11.397065, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:18.276776, disclosureLevel:'aggregated' }, // pág. 79, precedente
  ],
};
const juventusitExpenseLinesByYear = {
  2012: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-2.588125, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-41.162241, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-137.131802, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-12.959489, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-6.297027, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-6.179816, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-52.304836, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.96
    { rawLabel:'Amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-6.794484, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.96
    { rawLabel:'Provisions and other write-downs/reverses and releases', normalizedCategory:'other_amortisation', amountNative:10.443216, disclosureLevel:'aggregated' }, // pág. 86, precedente
  ],
  2013: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-2.93377, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-45.079682, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-149.010399, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-14.452797, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-5.579779, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-10.03385, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-51.414589, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-8.291739, disclosureLevel:'aggregated' }, // pág. 79, Jev 0.99
    { rawLabel:'Provisions and other write-downs/reverses and releases', normalizedCategory:'other_amortisation', amountNative:-0.810874, disclosureLevel:'aggregated' }, // pág. 79, precedente
  ],
};
const juventusitFiscalYearMeta = {
  2012: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2012-06-30',
    sourceId:'juventus-it-annual-financial-report-2011-12',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.730256, tax:-2.735921,
    extraRows: [
      {label:'Financial income', value:1.380876},
      {label:'Financial expenses', value:-6.111132},
      {label:'Current taxes', value:-3.788628},
      {label:'Deferred taxes', value:1.052707},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:213.786231, officialTotalExpenses:254.974604, officialPAT:-48.65455,
  },
  2013: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2013-06-30',
    sourceId:'juventus-it-annual-financial-report-2012-13',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-7.108992, tax:-4.995651,
    extraRows: [
      {label:'Financial income', value:2.364266},
      {label:'Financial expenses', value:-9.473258},
      {label:'Current taxes', value:-5.924068},
      {label:'Deferred taxes', value:0.928417},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:283.801473, officialTotalExpenses:287.607479, officialPAT:-15.910649,
  },
};
const juventusitPresupuestoOverlayByYear = {};

const juventusitPasesData = [];
const juventusitResultadosData = {};
const juventusitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['juventus-it'] = {
  revenueLinesByYear: juventusitRevenueLinesByYear, expenseLinesByYear: juventusitExpenseLinesByYear,
  fiscalYearMeta: juventusitFiscalYearMeta, pasesData: juventusitPasesData,
  resultadosData: juventusitResultadosData, titulosData: juventusitTitulosData,
  presupuestoOverlayByYear: juventusitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'juventus-it-annual-financial-report-2011-12': {
    id:'juventus-it-annual-financial-report-2011-12', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2011-12 (ejercicio 2012)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2012-13': {
    id:'juventus-it-annual-financial-report-2012-13', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2012-13 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2012-13.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['juventus-it'] = null;

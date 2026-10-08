// ============================================================================
// data/juvestabia-it-data.js — Società Sportiva Juve Stabia S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "juvestabia-it" — slug de "Juve Stabia" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Società Sportiva Juve Stabia S.r.l." — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): Claude 2026-10-08 (revisión Sonnet de las altas de Italia): el script propuso 'Sportiv
//   displayName        ok        "Juve Stabia" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (169 de 172 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 23 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (169 de 172 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
//   sourceId           ok        "juvestabia-it-bilancio-2024-ifrs-sec-6k" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2024 (it-seriea, it-serieb): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"juvestabia-it-bilancio-2024-ifrs-sec-6k"}
// ============================================================================

const juvestabiaitRevenueLinesByYear = {
  // 2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Sponsorships', normalizedCategory:'sponsorship_commercial', amountNative:2.023466, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Sponsorships - Related party', normalizedCategory:'sponsorship_commercial', amountNative:0.15, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.99
    { rawLabel:'Ticketing', normalizedCategory:'matchday_competition', amountNative:0.727035, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Gain on transfer of players', normalizedCategory:'player_sales', amountNative:0.23, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.99
    { rawLabel:'Revenue from Television rights', normalizedCategory:'broadcasting', amountNative:0.05, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Revenue from Contributions', normalizedCategory:'other_income', amountNative:0.538644, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Revenue from store', normalizedCategory:'sponsorship_commercial', amountNative:0.074261, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Other incomes', normalizedCategory:'other_income', amountNative:0.116954, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.99
    { rawLabel:'Other incomes', normalizedCategory:'other_income', amountNative:0.190721, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
  ],
};
const juvestabiaitExpenseLinesByYear = {
  2024: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Ticketing', normalizedCategory:'match_organisation_expense', amountNative:-0.111591, disclosureLevel:'aggregated' }, // pág. 40, Jev 0.93
    { rawLabel:'Sports equipment', normalizedCategory:'other_expenses', amountNative:-0.659782, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Player salaries', normalizedCategory:'wages_squad', amountNative:-2.463183, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Accomodation and transportation', normalizedCategory:'match_organisation_expense', amountNative:-0.053867, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Insurance', normalizedCategory:'admin_general_expense', amountNative:-0.014157, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Loan of players', normalizedCategory:'other_expenses', amountNative:-0.0075, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Other cost of revenues', normalizedCategory:'other_expenses', amountNative:-0.193876, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Amortization of multi-year football players rights', normalizedCategory:'player_amortisation', amountNative:-0.166, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Salaries and social security contributions', normalizedCategory:'admin_general_expense', amountNative:-1.010865, disclosureLevel:'aggregated' }, // pág. 42, Claude 0.8
    { rawLabel:'Rental expenses', normalizedCategory:'admin_general_expense', amountNative:-0.043785, disclosureLevel:'aggregated' }, // pág. 42, Jev 1
    { rawLabel:'Impairment of receivables', normalizedCategory:'other_expenses', amountNative:-0.090272, disclosureLevel:'aggregated' }, // pág. 42, Jev 0.96
    { rawLabel:'Penalties and fines', normalizedCategory:'other_expenses', amountNative:-0.11377, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Operating and administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-0.816133, disclosureLevel:'aggregated' }, // pág. 42, Jev 0.91
    { rawLabel:'Impairment loss on intangible assets', normalizedCategory:'player_impairment', amountNative:-0.082667, disclosureLevel:'aggregated' }, // pág. 42, Jev 0.91
    { rawLabel:'Depreciation costs', normalizedCategory:'depreciation', amountNative:-0.007872, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Amortization on Intangible assets', normalizedCategory:'player_amortisation', amountNative:-0.004474, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.98
  ],
};
const juvestabiaitFiscalYearMeta = {
  2024: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'juvestabia-it-bilancio-2024-ifrs-sec-6k',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.120093, tax:-0.127938,
    extraRows: [
      {label:'Finance costs', value:-0.120093},
      {label:'Provision for income taxes', value:-0.127938},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.101081, officialTotalExpenses:5.839794, officialPAT:-1.986746,
  },
};
const juvestabiaitPresupuestoOverlayByYear = {};

const juvestabiaitPasesData = [];
const juvestabiaitResultadosData = {};
const juvestabiaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['juvestabia-it'] = {
  revenueLinesByYear: juvestabiaitRevenueLinesByYear, expenseLinesByYear: juvestabiaitExpenseLinesByYear,
  fiscalYearMeta: juvestabiaitFiscalYearMeta, pasesData: juvestabiaitPasesData,
  resultadosData: juvestabiaitResultadosData, titulosData: juvestabiaitTitulosData,
  presupuestoOverlayByYear: juvestabiaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'juvestabia-it-bilancio-2024-ifrs-sec-6k': {
    id:'juvestabia-it-bilancio-2024-ifrs-sec-6k', clubId:'juvestabia-it',
    title:'Società Sportiva Juve Stabia S.r.l. — Juve Stabia-bilancio-2024-IFRS-SEC-6K (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['juvestabia-it'] = null;

// ============================================================================
// data/asroma-it-data.js — A.S. Roma S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "asroma-it" — slug de "AS Roma" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "A.S. Roma S.r.l." — el .md, 7 veces (nombre del club + forma societaria)
//   displayName        ok        "AS Roma" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (653 de 714 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 101 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] as roma: #980A2B Dark Red, #FBB900 Orange, #FFD500 Yellow
//   anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (contenido del .md (653 de 714 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 3 documento(s) con los dos estados votan consolidad
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
//   sourceId           ok        "asroma-it-bilancio-2022-consolidato" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Roma" = "AS Roma"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"asroma-it-bilancio-2022-consolidato"}
// ============================================================================

const asromaitRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Ricavi da gare', normalizedCategory:'matchday_competition', amountNative:39.957, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Ricavi delle vendite commerciali e licensing', normalizedCategory:'sponsorship_commercial', amountNative:13.989, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.96
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:8.241, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Diritti televisivi e diritti d\'immagine', normalizedCategory:'broadcasting', amountNative:78.516, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.99
    { rawLabel:'Pubblicità', normalizedCategory:'sponsorship_commercial', amountNative:16.336, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:34.152, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Ricavi da gestione dei diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:14.684, disclosureLevel:'aggregated' }, // pág. 43, Claude 0.8
  ],
};
const asromaitExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Acquisti materie di consumo', normalizedCategory:'admin_general_expense', amountNative:-10.252, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_expenses', amountNative:0.544, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Spese per servizi', normalizedCategory:'admin_general_expense', amountNative:-63.207, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Spese per godimento beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-6.868, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.91
    { rawLabel:'Spese per il personale', normalizedCategory:'wages_squad', amountNative:-182.831, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-21.707, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.99
    { rawLabel:'Ammortamenti e svalutazioni', normalizedCategory:'player_amortisation', amountNative:-90.277, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Oneri da gestione dei diritti pluriennali prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-26.29, disclosureLevel:'aggregated' }, // pág. 43, precedente
  ],
};
const asromaitFiscalYearMeta = {
  2022: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'asroma-it-bilancio-2022-consolidato',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-23.938, tax:-0.507,
    extraRows: [
      {label:'Proventi finanziari', value:2.676},
      {label:'Oneri finanziari', value:-26.614},
      {label:'imposte correnti', value:-0.507},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:205.875, officialTotalExpenses:400.888, officialPAT:-219.459,
  },
};
const asromaitPresupuestoOverlayByYear = {};

const asromaitPasesData = [];
const asromaitResultadosData = {};
const asromaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['asroma-it'] = {
  revenueLinesByYear: asromaitRevenueLinesByYear, expenseLinesByYear: asromaitExpenseLinesByYear,
  fiscalYearMeta: asromaitFiscalYearMeta, pasesData: asromaitPasesData,
  resultadosData: asromaitResultadosData, titulosData: asromaitTitulosData,
  presupuestoOverlayByYear: asromaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'asroma-it-bilancio-2022-consolidato': {
    id:'asroma-it-bilancio-2022-consolidato', clubId:'asroma-it',
    title:'A.S. Roma S.r.l. — AS-Roma-bilancio-2022-consolidato (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['asroma-it'] = null;

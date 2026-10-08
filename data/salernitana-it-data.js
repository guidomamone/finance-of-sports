// ============================================================================
// data/salernitana-it-data.js — U.S. Salernitana 1919 S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "salernitana-it" — slug de "Salernitana" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "U.S. Salernitana 1919 S.r.l." — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): Claude 2026-10-08 (revisión Sonnet de las altas de Italia): nombre legal; el escaneo d
//   displayName        ok        "Salernitana" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2022-06-30) y contenido del .md (152 de 155 fechas de fin de mes)
//   sport              ok        "futbol" — el .md nombra el fútbol 8 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2022-06-30) y contenido del .md (152 de 155 fechas de fin de mes))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
//   sourceId           ok        "salernitana-it-bilancio-30-giugno-2022" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Salernitana"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"salernitana-it-bilancio-30-giugno-2022"}
// ============================================================================

const salernitanaitRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Ricavi da gare', normalizedCategory:'matchday_competition', amountNative:6.878617, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Diritti audiovisivi e proventi media', normalizedCategory:'broadcasting', amountNative:28.365068, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Ricavi da sponsorizzazione e pubblicità', normalizedCategory:'sponsorship_commercial', amountNative:5.168052, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Proventi da gestione diritti calciatori', normalizedCategory:'player_sales', amountNative:0.331924, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:4.733619, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:0.578781, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'RICAVI NETTI DA CESSIONE DIRITTI PLURIENNALI PRESTAZIONI TESSERATI', normalizedCategory:'player_sales', amountNative:0.192882, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
  ],
};
const salernitanaitExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.606968, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Personale', normalizedCategory:'wages_squad', amountNative:-44.832813, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.8
    { rawLabel:'Oneri da gestione diritti calciatori', normalizedCategory:'other_expenses', amountNative:-1.335344, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.96
    { rawLabel:'Oneri per servizi esterni', normalizedCategory:'admin_general_expense', amountNative:-6.216789, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.8
    { rawLabel:'Altri oneri', normalizedCategory:'other_expenses', amountNative:-4.960945, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Ammortamenti e svalutazioni delle attività materiali ed immateriali', normalizedCategory:'player_amortisation', amountNative:-5.856426, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Accantonamenti e altre svalutazioni', normalizedCategory:'other_amortisation', amountNative:-1.345784, disclosureLevel:'aggregated' }, // pág. 16, precedente
  ],
};
const salernitanaitFiscalYearMeta = {
  2022: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'salernitana-it-bilancio-30-giugno-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.167151, tax:3.285548,
    extraRows: [
      {label:'Oneri finanziari netti e differenze cambio', value:-0.167151},
      {label:'Imposte correnti', value:-1.285966},
      {label:'Imposte differite e anticipate', value:4.571514},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:46.248943, officialTotalExpenses:66.155069, officialPAT:-16.787721,
  },
};
const salernitanaitPresupuestoOverlayByYear = {};

const salernitanaitPasesData = [];
const salernitanaitResultadosData = {};
const salernitanaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['salernitana-it'] = {
  revenueLinesByYear: salernitanaitRevenueLinesByYear, expenseLinesByYear: salernitanaitExpenseLinesByYear,
  fiscalYearMeta: salernitanaitFiscalYearMeta, pasesData: salernitanaitPasesData,
  resultadosData: salernitanaitResultadosData, titulosData: salernitanaitTitulosData,
  presupuestoOverlayByYear: salernitanaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'salernitana-it-bilancio-30-giugno-2022': {
    id:'salernitana-it-bilancio-30-giugno-2022', clubId:'salernitana-it',
    title:'U.S. Salernitana 1919 S.r.l. — Salernitana-bilancio-30-giugno-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['salernitana-it'] = null;

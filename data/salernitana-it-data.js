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
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2023-def.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Salernitana/Salernitana-bilancio-30-giugno-2023-def.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:5.664836, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Ricavi da gare ospitate', normalizedCategory:'matchday_competition', amountNative:0.076979, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.85
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:2.817977, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Audiovisivi', normalizedCategory:'broadcasting', amountNative:33.790659, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:6.784095, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.157131, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Canoni per licenze, marchi, brevetti', normalizedCategory:'sponsorship_commercial', amountNative:0.052317, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.1, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.068961, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Sopravvenienze attive (non ricorrenti)', normalizedCategory:'other_income', amountNative:1.856368, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Contributi in c/esercizio', normalizedCategory:'other_income', amountNative:1.237855, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.95
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:3.216209, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:0.692534, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:14.419294, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
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
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisti di materie prime,sussidiarie,di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.419612, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_expenses', amountNative:-0.121219, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-60.700403, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.317936, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.85
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.229248, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.97
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-0.50217, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.97
    { rawLabel:'Costi per Acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-4.4675, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.49977, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.379036, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.318567, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-2.678449, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.97
    { rawLabel:'Costi per vitto,alloggio e locomozione', normalizedCategory:'match_organisation_expense', amountNative:-2.123548, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.863186, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-0.695477, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Spese amministrative', normalizedCategory:'admin_general_expense', amountNative:-3.454188, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Spese per pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-0.821141, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Spese bancarie', normalizedCategory:'admin_general_expense', amountNative:-0.046376, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-1.191882, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.292686, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'Tassa iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.00739, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'- percentuale su incassi gare a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-0.037619, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.98
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-2.415015, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Sopravvenienze passive (non ricorrenti)', normalizedCategory:'exceptional_items', amountNative:-1.126402, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Minusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.361351, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Amm. delle attività immateriali', normalizedCategory:'player_amortisation', amountNative:-13.792266, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.92
    { rawLabel:'Amm. delle attività materiali', normalizedCategory:'depreciation', amountNative:-0.525955, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Amm. dei diritti d\'uso', normalizedCategory:'depreciation', amountNative:-0.247922, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.97
    { rawLabel:'Svalutaz. delle attività immateriali', normalizedCategory:'player_impairment', amountNative:-1.293505, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Svalutaz. delle attività materiali', normalizedCategory:'depreciation', amountNative:-0.00101, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Svalutaz. dei crediti dell\'attivo circolante', normalizedCategory:'other_expenses', amountNative:-1.596799, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Accantonamenti per rischi diversi', normalizedCategory:'other_amortisation', amountNative:-0.01, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.85
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
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'salernitana-it-bilancio-30-giugno-2023-def',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.206648, tax:7.183312,
    extraRows: [
      {label:'Utili e perdite su cambi', value:-0.004523},
      {label:'da terzi', value:0.015245},
      {label:'verso terzi', value:-1.205293},
      {label:'da attualizzazione', value:-0.012077},
      {label:'Imposte correnti', value:-1.515571},
      {label:'imposte anticipate', value:8.698883},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:70.935215, officialTotalExpenses:105.049875, officialPAT:-29.625747,
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
  'salernitana-it-bilancio-30-giugno-2023-def': {
    id:'salernitana-it-bilancio-30-giugno-2023-def', clubId:'salernitana-it',
    title:'U.S. Salernitana 1919 S.r.l. — Salernitana-bilancio-30-giugno-2023-def (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2023-def.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['salernitana-it'] = null;

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
  // 2018: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AS Roma/AS-Roma-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Campionato Serie A', normalizedCategory:'matchday_competition', amountNative:11.598, disclosureLevel:'aggregated' }, // pág. 109, Claude 0.85
    { rawLabel:'UEFA Champions League', normalizedCategory:'competition_bonus', amountNative:52.784, disclosureLevel:'aggregated' }, // pág. 109, Jev 0.97
    { rawLabel:'Youth League', normalizedCategory:'competition_bonus', amountNative:0.048, disclosureLevel:'aggregated' }, // pág. 109, ? 0.6
    { rawLabel:'Tim Cup', normalizedCategory:'matchday_competition', amountNative:0.242, disclosureLevel:'aggregated' }, // pág. 109, ? 0.65
    { rawLabel:'Gare amichevoli', normalizedCategory:'matchday_competition', amountNative:3.628, disclosureLevel:'aggregated' }, // pág. 109, Jev 1
    { rawLabel:'Abbonamenti Campionato', normalizedCategory:'season_tickets', amountNative:8.919, disclosureLevel:'aggregated' }, // pág. 109, Jev 0.95
    { rawLabel:'Altri ricavi delle vendite e delle prestazioni', normalizedCategory:'other_income', amountNative:7.808, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.97
    { rawLabel:'b) Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:11.842, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'c) Diritti televisivi e diritti d\'immagine', normalizedCategory:'broadcasting', amountNative:128.557, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'d) Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:13.814, disclosureLevel:'aggregated' }, // pág. 62, Jev 1
    { rawLabel:'Proventi LNP', normalizedCategory:'broadcasting', amountNative:2.086, disclosureLevel:'aggregated' }, // pág. 112, precedente
    { rawLabel:'Indennizzi assicurativi infortuni calciatori', normalizedCategory:'other_income', amountNative:5.114, disclosureLevel:'aggregated' }, // pág. 112, Jev 1
    { rawLabel:'Riaddebiti ed entità correlate', normalizedCategory:'other_income', amountNative:0.201, disclosureLevel:'aggregated' }, // pág. 112, Jev 0.99
    { rawLabel:'AS Roma Camp', normalizedCategory:'youth_football', amountNative:0.35, disclosureLevel:'aggregated' }, // pág. 112, Jev 0.99
    { rawLabel:'Ritiri estivi', normalizedCategory:'other_income', amountNative:0.325, disclosureLevel:'aggregated' }, // pág. 112, ? 0.6
    { rawLabel:'Scuola Calcio', normalizedCategory:'youth_football', amountNative:0.501, disclosureLevel:'aggregated' }, // pág. 112, Jev 0.98
    { rawLabel:'Addebiti materiale sportivo', normalizedCategory:'other_income', amountNative:0.219, disclosureLevel:'aggregated' }, // pág. 112, Jev 0.93
    { rawLabel:'Utilizzo fondi rischi', normalizedCategory:'other_income', amountNative:1.239, disclosureLevel:'aggregated' }, // pág. 112, Jev 0.95
    { rawLabel:'Sopravvenienze attive', normalizedCategory:'other_income', amountNative:0.089, disclosureLevel:'aggregated' }, // pág. 112, Jev 1
    { rawLabel:'Biglietti trasferite internazionali', normalizedCategory:'matchday_competition', amountNative:0.682, disclosureLevel:'aggregated' }, // pág. 112, Jev 0.99
    { rawLabel:'Tessera Tifoso Away', normalizedCategory:'matchday_competition', amountNative:0.149, disclosureLevel:'aggregated' }, // pág. 112, precedente
    { rawLabel:'Altri proventi diversi', normalizedCategory:'other_income', amountNative:0.671, disclosureLevel:'aggregated' }, // pág. 112, Jev 1
    { rawLabel:'Gestione operativa netta calciatori', normalizedCategory:'player_sales', amountNative:45.922, disclosureLevel:'aggregated' }, // pág. 62, Claude 0.8
    { rawLabel:'Variazione delle rimanenze (reduce costos)', normalizedCategory:'other_income', amountNative:0.082, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.99
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
  2018: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Indumenti sportivi e materiale tecnico', normalizedCategory:'admin_general_expense', amountNative:-2.267, disclosureLevel:'aggregated' }, // pág. 113, precedente
    { rawLabel:'Divise sociali ed altri beni', normalizedCategory:'admin_general_expense', amountNative:-0.405, disclosureLevel:'aggregated' }, // pág. 113, precedente
    { rawLabel:'Beni e prodotti da commercializzare', normalizedCategory:'other_expenses', amountNative:-3.504, disclosureLevel:'aggregated' }, // pág. 113, Jev 0.93
    { rawLabel:'Materiale vario di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.786, disclosureLevel:'aggregated' }, // pág. 113, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.542, disclosureLevel:'aggregated' }, // pág. 114, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-5.641, disclosureLevel:'aggregated' }, // pág. 114, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-6.336, disclosureLevel:'aggregated' }, // pág. 114, Jev 0.95
    { rawLabel:'Costi vitto, alloggio, locomozione e trasferte', normalizedCategory:'match_organisation_expense', amountNative:-2.254, disclosureLevel:'aggregated' }, // pág. 114, Jev 1
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-5.865, disclosureLevel:'aggregated' }, // pág. 114, Jev 0.98
    { rawLabel:'Consulenze e servizi professionali', normalizedCategory:'admin_general_expense', amountNative:-6.701, disclosureLevel:'aggregated' }, // pág. 115, Jev 1
    { rawLabel:'Consulenze professionali per servizi commerciali', normalizedCategory:'admin_general_expense', amountNative:-1.174, disclosureLevel:'aggregated' }, // pág. 115, Claude 0.85
    { rawLabel:'Spese postali, telefoniche ed altre utenze', normalizedCategory:'admin_general_expense', amountNative:-0.655, disclosureLevel:'aggregated' }, // pág. 115, Claude 0.9
    { rawLabel:'Spese di vigilanza', normalizedCategory:'match_organisation_expense', amountNative:-0.157, disclosureLevel:'aggregated' }, // pág. 115, Jev 0.9
    { rawLabel:'Manutenzione - gestione sede sociale e centro sportivo', normalizedCategory:'admin_general_expense', amountNative:-1.559, disclosureLevel:'aggregated' }, // pág. 115, Jev 0.99
    { rawLabel:'Manutenzione e gestione hardware, software e sito internet', normalizedCategory:'admin_general_expense', amountNative:-2.041, disclosureLevel:'aggregated' }, // pág. 115, Jev 0.99
    { rawLabel:'Spese per assemblee, societari e di borsa', normalizedCategory:'admin_general_expense', amountNative:-0.1, disclosureLevel:'aggregated' }, // pág. 115, Jev 0.96
    { rawLabel:'Trasporti e trasferte', normalizedCategory:'match_organisation_expense', amountNative:-1.974, disclosureLevel:'aggregated' }, // pág. 115, precedente
    { rawLabel:'Emolumenti al Consiglio di Amministrazione', normalizedCategory:'admin_general_expense', amountNative:-0.15, disclosureLevel:'aggregated' }, // pág. 115, Jev 0.99
    { rawLabel:'Spese di revisione contabile', normalizedCategory:'admin_general_expense', amountNative:-0.234, disclosureLevel:'aggregated' }, // pág. 115, Claude 0.9
    { rawLabel:'Emolumenti al Collegio sindacale / O.D.V.', normalizedCategory:'admin_general_expense', amountNative:-0.137, disclosureLevel:'aggregated' }, // pág. 115, Claude 0.9
    { rawLabel:'Costi di produzione *Roma TV e Roma Radio', normalizedCategory:'admin_general_expense', amountNative:-4.878, disclosureLevel:'aggregated' }, // pág. 115, precedente
    { rawLabel:'Spese Call Center Stadio ed altri servizi interinali', normalizedCategory:'admin_general_expense', amountNative:-0.025, disclosureLevel:'aggregated' }, // pág. 115, precedente
    { rawLabel:'Altre spese generali e amministrative', normalizedCategory:'admin_general_expense', amountNative:-0.205, disclosureLevel:'aggregated' }, // pág. 115, Jev 1
    { rawLabel:'Spese di pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-5.752, disclosureLevel:'aggregated' }, // pág. 114, Jev 1
    { rawLabel:'Spese per godimento beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-10.671, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-150.958, disclosureLevel:'aggregated' }, // pág. 117, Jev 0.98
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-6.452, disclosureLevel:'aggregated' }, // pág. 117, Claude 0.85
    { rawLabel:'T.F.R.', normalizedCategory:'wages_squad', amountNative:-0.932, disclosureLevel:'aggregated' }, // pág. 117, precedente
    { rawLabel:'Altri costi (Faifc)', normalizedCategory:'other_expenses', amountNative:-0.498, disclosureLevel:'aggregated' }, // pág. 117, precedente
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.979, disclosureLevel:'aggregated' }, // pág. 118, Jev 1
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.107, disclosureLevel:'aggregated' }, // pág. 118, Jev 1
    { rawLabel:'- Costi accesso segnale televisivo LNP', normalizedCategory:'match_organisation_expense', amountNative:-1.063, disclosureLevel:'aggregated' }, // pág. 118, precedente
    { rawLabel:'- Mutualità incassi gare TIM Cup', normalizedCategory:'match_organisation_expense', amountNative:-0.109, disclosureLevel:'aggregated' }, // pág. 118, precedente
    { rawLabel:'- Contributi, ammende, spese LNP-FIGC-UEFA', normalizedCategory:'match_organisation_expense', amountNative:-1.355, disclosureLevel:'aggregated' }, // pág. 118, precedente
    { rawLabel:'- Costi per acquisti biglietti gare in trasferta', normalizedCategory:'match_organisation_expense', amountNative:-0.68, disclosureLevel:'aggregated' }, // pág. 118, Jev 0.99
    { rawLabel:'- Erogazioni liberali Roma', normalizedCategory:'other_expenses', amountNative:-0.973, disclosureLevel:'aggregated' }, // pág. 118, Jev 1
    { rawLabel:'- Penalità contrattuali', normalizedCategory:'other_expenses', amountNative:-0.287, disclosureLevel:'aggregated' }, // pág. 118, precedente
    { rawLabel:'- Altri oneri diversi', normalizedCategory:'other_expenses', amountNative:-0.731, disclosureLevel:'aggregated' }, // pág. 118, Jev 1
    { rawLabel:'Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-57.457, disclosureLevel:'aggregated' }, // pág. 121, Claude 0.85
    { rawLabel:'Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.353, disclosureLevel:'aggregated' }, // pág. 121, Jev 1
    { rawLabel:'Svalutazione dei crediti correnti', normalizedCategory:'other_expenses', amountNative:-1.41, disclosureLevel:'aggregated' }, // pág. 121, Jev 1
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.546, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.98
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
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 45.922. resultado neto de la gestión de jugadores, positivo (EBITDA 66.733 = 250.867 - 230.056 + 45.922) (to-do 155/156, arreglo manual 2026-10-07)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 225. el resultado impreso es el del Gruppo (25.498); el consolidado (25.723) incluye la pérdida de terzi; se suma del lado financiero para no inflar ingresos (to-do 155/156, arreglo manual 2026-10-07)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. el total se contaba como una línea más; los costos son sus renglones + Ammortamenti (L1920) y Accantonamenti (L1921), impresos fuera del total (to-do 156, arreglo manual 2026-10-07)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 82. la variación de existencias (82) reduce costos; los gastos se toman en valor absoluto, así que va del lado de ingresos con el mismo efecto en el resultado (arreglo manual 2026-10-07; to-do 156)
  2018: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'asroma-it-bilancio-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-24.489, tax:-7.976,
    extraRows: [
      {label:'Proventi e oneri finanziari', value:-24.714},
      {label:'Risultato di terzi', value:0.225},
      {label:'Imposte dell\'esercizio', value:-7.976},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:296.87, officialTotalExpenses:289.796, officialPAT:-25.498,
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
  'asroma-it-bilancio-2018': {
    id:'asroma-it-bilancio-2018', clubId:'asroma-it',
    title:'A.S. Roma S.r.l. — AS-Roma-bilancio-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/AS Roma/AS-Roma-bilancio-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['asroma-it'] = null;

// ============================================================================
// data/sassuolo-it-data.js — Unione Sportiva Sassuolo Calcio S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "sassuolo-it" — slug de "Sassuolo" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Unione Sportiva Sassuolo Calcio S.r.l." — el .md, 6 veces (nombre del club + forma societaria)
//   displayName        ok        "Sassuolo" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo
//   sport              ok        "futbol" — el .md nombra el fútbol 31 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] sassuolo: #1EA451 Green, #000000 Black
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
//   cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo)
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
//   sourceId           ok        "sassuolo-it-bilancio-2025" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"sassuolo-it-bilancio-2025"}
// ============================================================================

const sassuoloitRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Italia/Sassuolo/Sassuolo-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sassuolo/Sassuolo-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:1.67, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.97
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.557, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.98
    { rawLabel:'Ricavi store', normalizedCategory:'sponsorship_commercial', amountNative:0.385, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.96
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:19.305, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:7.096, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.291, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:16.205, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:2.385, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi da cessioni temporanee calciatori', normalizedCategory:'player_sales', amountNative:1.627, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi Lega non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:15.507, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi diversi', normalizedCategory:'other_income', amountNative:5.671, disclosureLevel:'aggregated' }, // pág. 49, precedente
  ],
};
const sassuoloitExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.359561, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.99
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-3.214, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.094, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.462, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Compensi per Agenti e intermediari', normalizedCategory:'other_expenses', amountNative:-4.873, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.8
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.356, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.99
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.941, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-4.405, disclosureLevel:'aggregated' }, // pág. 51, Jev 1
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.234, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.8
    { rawLabel:'8) Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.104377, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-52.650402, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.96
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.413067, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.027425, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.99
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-25.849587, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.778222, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'d) Svalutazioni crediti dell\'attivo', normalizedCategory:'other_expenses', amountNative:-0.00036, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.97
    { rawLabel:'11) Variazioni delle rimanenze', normalizedCategory:'other_expenses', amountNative:0.148511, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'Spese organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.597, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.032, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Oneri contribuzione Lega', normalizedCategory:'match_organisation_expense', amountNative:-3.644, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.511, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Premi valorizzazione, di addestramento e Carriera', normalizedCategory:'player_amortisation', amountNative:-0.818, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Contributo Solidarietà Fifa', normalizedCategory:'player_amortisation', amountNative:-0.618, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Premi di rendimento', normalizedCategory:'wages_squad', amountNative:-0.125, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.97
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.188, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.413, disclosureLevel:'aggregated' }, // pág. 54, Claude 0.8
  ],
};
const sassuoloitFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 34.086.540. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 16.205.000. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): categoria = broadcasting. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo,
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): categoria = other_income. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'sassuolo-it-bilancio-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.69364, tax:11.842313,
    extraRows: [
      {label:'d) Proventi diversi dai precedenti:', value:1.957063},
      {label:'c) verso imprese controllanti', value:-2.510217},
      {label:'d) verso altri', value:-2.140486},
      {label:'a) Imposte correnti', value:-0.197019},
      {label:'b) Imposte esercizi precedenti', value:0},
      {label:'b) Imposte anticipate e differite', value:0.171314},
      {label:'d) Provento da Consolidato Fiscale', value:11.868018},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:70.699, officialTotalExpenses:118.55949, officialPAT:-38.772733,
  },
};
const sassuoloitPresupuestoOverlayByYear = {};

const sassuoloitPasesData = [];
const sassuoloitResultadosData = {};
const sassuoloitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sassuolo-it'] = {
  revenueLinesByYear: sassuoloitRevenueLinesByYear, expenseLinesByYear: sassuoloitExpenseLinesByYear,
  fiscalYearMeta: sassuoloitFiscalYearMeta, pasesData: sassuoloitPasesData,
  resultadosData: sassuoloitResultadosData, titulosData: sassuoloitTitulosData,
  presupuestoOverlayByYear: sassuoloitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'sassuolo-it-bilancio-2025': {
    id:'sassuolo-it-bilancio-2025', clubId:'sassuolo-it',
    title:'Unione Sportiva Sassuolo Calcio S.r.l. — Sassuolo-bilancio-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['sassuolo-it'] = null;

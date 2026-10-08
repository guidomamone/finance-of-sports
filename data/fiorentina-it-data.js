// ============================================================================
// data/fiorentina-it-data.js — ACF Fiorentina S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "fiorentina-it" — slug de "Fiorentina" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "ACF Fiorentina S.r.l." — la portada y lo más frecuente del .md coinciden (8 veces)
//   displayName        ok        "Fiorentina" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (245 de 261 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] fiorentina: #61358B Purple, #FFFFFF White, #DD3224 Red
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (245 de 261 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-07: individual (ACF Fiorentina S.r.l.); no publica consolidado desde 202
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "fiorentina-it-bilancio-2024-25" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Fiorentina"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fiorentina-it-bilancio-2024-25"}
// ============================================================================

const fiorentinaitRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Fiorentina/Fiorentina-bilancio-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:6.58165, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:4.700496, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:21.493476, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.97
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:32.070851, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:9.745695, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:4.01346, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'e) proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:54.766599, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'f) ricavi per cessione temporanea giocatori', normalizedCategory:'player_sales', amountNative:4.233329, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'g) plusv. da cessione diritti pluriennali alle prest.di calciatori', normalizedCategory:'player_sales', amountNative:56.220277, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'h) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.426567, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:1.356428, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
  ],
};
const fiorentinaitExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.799032, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'7) per servizi', normalizedCategory:'admin_general_expense', amountNative:-35.425574, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.143172, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.97
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-85.963704, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-6.513075, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.96
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.118917, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-1.110483, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'a) ammortamento immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-7.035533, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.9
    { rawLabel:'b) ammortamento diritti pluriennali calciatori', normalizedCategory:'player_amortisation', amountNative:-39.145499, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'c) ammortamento immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-6.54364, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'d) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.715385, disclosureLevel:'aggregated' }, // pág. 32, Jev 0.9
    { rawLabel:'11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.076272, disclosureLevel:'aggregated' }, // pág. 32, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.753983, disclosureLevel:'aggregated' }, // pág. 32, Jev 0.97
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-0.267411, disclosureLevel:'aggregated' }, // pág. 32, Jev 1
    { rawLabel:'b) costi per acquisizione temporanea prestazioni dei calciatori', normalizedCategory:'other_expenses', amountNative:-19.148386, disclosureLevel:'aggregated' }, // pág. 32, Jev 0.99
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.079488, disclosureLevel:'aggregated' }, // pág. 32, Jev 0.99
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-3.890894, disclosureLevel:'aggregated' }, // pág. 32, Jev 1
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-2.511391, disclosureLevel:'aggregated' }, // pág. 32, Jev 1
  ],
};
const fiorentinaitFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de a) abierto por la nota (2117-2123 suman 21.493.476)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de h) abierto por la nota (2190-2199 suman 3.426.567)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. idem
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de d) (3.268.853 + 622.041 = 3.890.894)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. idem
  2025: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'fiorentina-it-bilancio-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.077642, tax:-5.523235,
    extraRows: [
      {label:'c) da titoli iscritti nell\'attivo circolante che non costituiscono partecipazioni', value:0.023859},
      {label:'altri', value:3.945261},
      {label:'altri', value:-4.042506},
      {label:'17-bis) utili e perdite su cambi', value:-0.004256},
      {label:'imposte correnti', value:-3.108311},
      {label:'imposte anni precedenti', value:-0.052302},
      {label:'imposte anticipate', value:0.283142},
      {label:'imposte differite', value:-2.645764},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:198.608828, officialTotalExpenses:216.162351, officialPAT:-23.233889,
  },
};
const fiorentinaitPresupuestoOverlayByYear = {};

const fiorentinaitPasesData = [];
const fiorentinaitResultadosData = {};
const fiorentinaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fiorentina-it'] = {
  revenueLinesByYear: fiorentinaitRevenueLinesByYear, expenseLinesByYear: fiorentinaitExpenseLinesByYear,
  fiscalYearMeta: fiorentinaitFiscalYearMeta, pasesData: fiorentinaitPasesData,
  resultadosData: fiorentinaitResultadosData, titulosData: fiorentinaitTitulosData,
  presupuestoOverlayByYear: fiorentinaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'fiorentina-it-bilancio-2024-25': {
    id:'fiorentina-it-bilancio-2024-25', clubId:'fiorentina-it',
    title:'ACF Fiorentina S.r.l. — Fiorentina-bilancio-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['fiorentina-it'] = null;

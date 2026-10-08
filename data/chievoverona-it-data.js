// ============================================================================
// data/chievoverona-it-data.js — Associazione Calcio Chievo-Verona S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "chievoverona-it" — slug de "Chievo Verona" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Associazione Calcio Chievo-Verona S.r.l." — respuesta de Guido en la cola (a2ef8d4)
//   displayName        ok        "Chievo Verona" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2014-06-30) y contenido del .md (186 de 187 fechas de fin de mes)
//   sport              ok        "futbol" — el .md nombra el fútbol 15 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2014 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2014-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2014-06-30) y contenido del .md (186 de 187 fechas de fin de mes))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2014-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2014-06-30 = 0.732172 (Tipo de referencia del Banco Central Europeo al 2014-06-30)
//   sourceId           ok        "chievoverona-it-bilancio-30-giugno-2014" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2013–14 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Chievo" = "Chievo Verona"
//
// FISCAL YEAR META PROPUESTO para 2014 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2014: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2014-06-30","sourceId":"chievoverona-it-bilancio-30-giugno-2014"}
// ============================================================================

const chievoveronaitRevenueLinesByYear = {
  // 2014: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2014: [
    { rawLabel:'- Gare campionato', normalizedCategory:'matchday_competition', amountNative:1.09534, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.003304, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.96
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.03423, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.96
    { rawLabel:'- Gare Amichevoli estero', normalizedCategory:'matchday_competition', amountNative:0.069021, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.96
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.618963, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:3.159845, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.953032, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.96
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:4.607875, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.672307, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'- Proventi televisivi', normalizedCategory:'broadcasting', amountNative:27.853883, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.10092, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:1.6573, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.97
    { rawLabel:'Plusvalenze da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:7.672633, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:1.074068, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.94
    { rawLabel:'Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:0.430237, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2016: [
    { rawLabel:'- Gare campionato', normalizedCategory:'matchday_competition', amountNative:1.373813, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.008015, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.96
    { rawLabel:'- Altre gare Italia/estero', normalizedCategory:'matchday_competition', amountNative:0.010077, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.91
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.644116, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:3.05026, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:2.126581, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.96
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:4.915909, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:1.007425, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'- Proventi televisivi', normalizedCategory:'broadcasting', amountNative:35.076342, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.13, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.1968, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.97
    { rawLabel:'Plusvalenze da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:18.822898, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.675969, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.94
    { rawLabel:'Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:0.489209, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
  ],
};
const chievoveronaitExpenseLinesByYear = {
  2014: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.053949, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.98
    { rawLabel:'7) per servizi', normalizedCategory:'admin_general_expense', amountNative:-8.178732, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-1.524568, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-21.523555, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-1.526648, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.92
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.272088, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-15.0881, disclosureLevel:'aggregated' }, // pág. 8, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.092518, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.204822, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.013017, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'- Percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.001487, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Costo per acquisiti temporanea prestaz. Calciatori', normalizedCategory:'other_expenses', amountNative:-1.173686, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Minusvalenze da cessione diritti plur. calciatori', normalizedCategory:'exceptional_items', amountNative:-0.718093, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.195, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.217624, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
  ],
  2016: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.035203, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'7) per servizi', normalizedCategory:'admin_general_expense', amountNative:-10.585414, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.293589, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-26.607857, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-1.562244, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.92
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.268687, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-14.921241, disclosureLevel:'aggregated' }, // pág. 30, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.101383, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.194, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'13) altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:-1.05, disclosureLevel:'aggregated' }, // pág. 30, Claude 0.85
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.308593, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.013833, disclosureLevel:'aggregated' }, // pág. 53, Jev 1
    { rawLabel:'- Percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.003607, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.99
    { rawLabel:'Costo per acquisii.temporanea prestaz.', normalizedCategory:'other_expenses', amountNative:-1.6, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.98
    { rawLabel:'Minusvalenze da cessione diritti plur. calciatori', normalizedCategory:'exceptional_items', amountNative:-1.516225, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.99
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.925, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.99
    { rawLabel:'Altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-2.237947, disclosureLevel:'aggregated' }, // pág. 53, Jev 1
  ],
};
const chievoveronaitFiscalYearMeta = {
  2014: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2014-06-30',
    sourceId:'chievoverona-it-bilancio-30-giugno-2014',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:3.253266, tax:-0.156273,
    extraRows: [
      {label:'altri', value:7.882619},
      {label:'altri', value:-3.697124},
      {label:'17-bis) utili e perdite su cambi', value:-0.000247},
      {label:'plusvalenze da alienazioni i cui ricavi non sono iscrivibili al n 5', value:0.00082},
      {label:'altri', value:0.47},
      {label:'altri', value:-1.402802},
      {label:'imposte correnti', value:-0.156273},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:50.002958, officialTotalExpenses:52.065794, officialPAT:0.316064,
  },
  2016: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2016-06-30',
    sourceId:'chievoverona-it-bilancio-30-giugno-2016',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.982643, tax:-0.017256,
    extraRows: [
      {label:'altri', value:0.000189},
      {label:'altri', value:-1.841762},
      {label:'17-bis) utili e perdite su cambi', value:-0.001302},
      {label:'plusvalenze da alienazioni i cui ricavi non sono iscrivibili al n 5', value:0.0002},
      {label:'altri', value:0.15272},
      {label:'altri', value:-1.292688},
      {label:'imposte correnti', value:-0.13492},
      {label:'imposte differite', value:0.117664},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:68.527414, officialTotalExpenses:63.708598, officialPAT:0.302692,
  },
};
const chievoveronaitPresupuestoOverlayByYear = {};

const chievoveronaitPasesData = [];
const chievoveronaitResultadosData = {};
const chievoveronaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['chievoverona-it'] = {
  revenueLinesByYear: chievoveronaitRevenueLinesByYear, expenseLinesByYear: chievoveronaitExpenseLinesByYear,
  fiscalYearMeta: chievoveronaitFiscalYearMeta, pasesData: chievoveronaitPasesData,
  resultadosData: chievoveronaitResultadosData, titulosData: chievoveronaitTitulosData,
  presupuestoOverlayByYear: chievoveronaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'chievoverona-it-bilancio-30-giugno-2014': {
    id:'chievoverona-it-bilancio-30-giugno-2014', clubId:'chievoverona-it',
    title:'Associazione Calcio Chievo-Verona S.r.l. — ChievoVerona-bilancio-30-giugno-2014 (ejercicio 2014)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'chievoverona-it-bilancio-30-giugno-2016': {
    id:'chievoverona-it-bilancio-30-giugno-2016', clubId:'chievoverona-it',
    title:'Associazione Calcio Chievo-Verona S.r.l. — ChievoVerona-bilancio-30-giugno-2016 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['chievoverona-it'] = null;

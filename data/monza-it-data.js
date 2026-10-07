// ============================================================================
// data/monza-it-data.js — Associazione Calcio Monza S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Monza/Monza-bilancio-2022.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "monza-it" — slug de "Monza" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Associazione Calcio Monza S.p.A." — el .md, 6 veces (nombre del club + forma societaria)
//   displayName        ok        "Monza" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
//   sport              ok        "futbol" — el .md nombra el fútbol 37 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2022 — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
//   cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
//   reportType         ok        "official_balance_sheet" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: balance anual ('Bilancio d'Esercizio al 31 dicembre 2022'); 'semestr
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 1 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2022-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.937559. --escribir agrega 'EUR@2022-12-31' a FX_CLOSE
//   sourceId           ok        "monza-it-bilancio-2022" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Monza"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-12-31","sourceId":"monza-it-bilancio-2022"}
// ============================================================================

const monzaitRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Monza/Monza-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Monza/Monza-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Gare di Campionato', normalizedCategory:'matchday_competition', amountNative:1.412702, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.98
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.010578, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.93
    { rawLabel:'Gare Amichevoli', normalizedCategory:'matchday_competition', amountNative:0.014924, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'Ricavi da gare fuori casa', normalizedCategory:'matchday_competition', amountNative:0.021847, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:1.283379, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Mutualità generale LNPB', normalizedCategory:'broadcasting', amountNative:2.038, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Contributi Federali', normalizedCategory:'other_income', amountNative:0.394423, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.96
    { rawLabel:'Contributi LNPA', normalizedCategory:'other_income', amountNative:0.272596, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.94
    { rawLabel:'Altri contributi sportivi', normalizedCategory:'other_income', amountNative:0.065815, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Contributi LNPB', normalizedCategory:'other_income', amountNative:0.0425, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.93
    { rawLabel:'Proventi da sponsorizzazioni e altre attività promozionali', normalizedCategory:'sponsorship_commercial', amountNative:9.66049, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.94
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.489973, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.98
    { rawLabel:'Proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:15.170502, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'Proventi Corporate', normalizedCategory:'sponsorship_commercial', amountNative:0.310638, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.95
    { rawLabel:'Ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.305273, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.080722, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Ricavi altre attività sportive organizzate dalla società', normalizedCategory:'other_income', amountNative:0.116096, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi da attività accessorie', normalizedCategory:'other_income', amountNative:0.098476, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.97
    { rawLabel:'Proventi diversi, indennizzi e sopravvenienze', normalizedCategory:'other_income', amountNative:0.547496, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'Contributi e crediti fiscali emergenza sanitaria', normalizedCategory:'other_income', amountNative:0.387011, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
  ],
};
const monzaitExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6. Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.24265, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.089306, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.946825, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.8064, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Compensi per Agenti Sportivi', normalizedCategory:'other_expenses', amountNative:-3.36279, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.154341, disclosureLevel:'aggregated' }, // pág. 48, Jev 1
    { rawLabel:'Costi assicurativi e servizi finanziari', normalizedCategory:'admin_general_expense', amountNative:-0.742191, disclosureLevel:'aggregated' }, // pág. 48, Jev 1
    { rawLabel:'Costi per servizi inerenti il personale', normalizedCategory:'admin_general_expense', amountNative:-0.964906, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-2.613511, disclosureLevel:'aggregated' }, // pág. 48, Jev 1
    { rawLabel:'Spese pubblicitarie e promozionali', normalizedCategory:'admin_general_expense', amountNative:-1.819114, disclosureLevel:'aggregated' }, // pág. 48, Jev 0.93
    { rawLabel:'Servizio biglietteria e controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.276843, disclosureLevel:'aggregated' }, // pág. 48, Jev 0.99
    { rawLabel:'Noleggio automezzi e autoveicoli per uso aziendale', normalizedCategory:'admin_general_expense', amountNative:-0.569114, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Noleggio attrezzature sportive e varie', normalizedCategory:'match_organisation_expense', amountNative:-0.558876, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Locazione impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.029, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Canoni utilizzo software e simili', normalizedCategory:'admin_general_expense', amountNative:-0.125089, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Concessione strutture sportive', normalizedCategory:'match_organisation_expense', amountNative:-0.014353, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-44.363742, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.93
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.169385, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.223423, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-11.842211, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Costi di Impianto e Ampliamento', normalizedCategory:'other_amortisation', amountNative:-0.000115, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.85
    { rawLabel:'Licenze Software', normalizedCategory:'other_amortisation', amountNative:-0.007447, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.85
    { rawLabel:'Marchio', normalizedCategory:'other_amortisation', amountNative:-0.006626, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.85
    { rawLabel:'Diritti Pluriennali prest. Calciatori', normalizedCategory:'player_amortisation', amountNative:-13.315139, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.99
    { rawLabel:'Migliorie Stadio', normalizedCategory:'other_amortisation', amountNative:-0.496802, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Migliorie Monzello', normalizedCategory:'other_amortisation', amountNative:-0.309711, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Altre immobilizzazioni immateriali', normalizedCategory:'other_amortisation', amountNative:-0.008709, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.93
    { rawLabel:'Terreni e fabbricati', normalizedCategory:'depreciation', amountNative:-0.000255, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.98
    { rawLabel:'Impianto Telefonico', normalizedCategory:'depreciation', amountNative:-0.001095, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'Impianti Generici', normalizedCategory:'depreciation', amountNative:-0.019703, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'Attrezzatura e dotazioni', normalizedCategory:'depreciation', amountNative:-0.01294, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'Attrezzatura Sportiva', normalizedCategory:'depreciation', amountNative:-0.04659, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'Macchine Elettroniche', normalizedCategory:'depreciation', amountNative:-0.021082, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'Mobili e Arredi', normalizedCategory:'depreciation', amountNative:-0.038617, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'Autovetture e ciclomotori', normalizedCategory:'depreciation', amountNative:-0.000188, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'Allestimenti stadio', normalizedCategory:'depreciation', amountNative:-0.011593, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.9
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.283484, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'12. Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-4.70175, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Minusvalenze cessione diritti pluriennali prestazione calciatori', normalizedCategory:'exceptional_items', amountNative:-0.125729, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazione calciatori', normalizedCategory:'other_expenses', amountNative:-5.228, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Spese organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.882679, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.320625, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.98
    { rawLabel:'Percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.004053, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.97
    { rawLabel:'Oneri contribuzione Lega', normalizedCategory:'match_organisation_expense', amountNative:-3, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'premi di preparazione', normalizedCategory:'player_amortisation', amountNative:-0.081054, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'altri oneri', normalizedCategory:'other_expenses', amountNative:-0.06743, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.8
    { rawLabel:'sopravvenienze passive e perdite su crediti', normalizedCategory:'exceptional_items', amountNative:-0.246107, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.92
    { rawLabel:'multe e ammende', normalizedCategory:'other_expenses', amountNative:-0.014954, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'imposte e tasse diverse', normalizedCategory:'admin_general_expense', amountNative:-0.128916, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
    { rawLabel:'abbonamenti', normalizedCategory:'admin_general_expense', amountNative:-0.106999, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
    { rawLabel:'altri', normalizedCategory:'other_expenses', amountNative:-0.126817, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
  ],
};
const monzaitFiscalYearMeta = {
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): reportType = official_balance_sheet. Guido 2026-10-06: balance anual ('Bilancio d'Esercizio al 31 dicembre 2022'); 'semestre' es un comentario de gestión, no un intermedio
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2022-12-31. Guido 2026-10-06: el ejercicio cierra el 31/12/2022
  2022: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-12-31',
    sourceId:'monza-it-bilancio-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.124837, tax:7.527764,
    extraRows: [
      {label:'- da imprese controllanti', value:0.003943},
      {label:'- altri', value:0.001031},
      {label:'c) da imprese controllanti', value:-0.119856},
      {label:'d) verso altri', value:-0.009267},
      {label:'17.bis Utili e perdite su cambi', value:-0.000688},
      {label:'D) Rettifiche di valore di attività e passività finanziarie', value:0},
      {label:'a) imposte correnti', value:0},
      {label:'b) imposte relative a esercizi precedenti', value:0.007123},
      {label:'c) imposte anticipate (differite)', value:0},
      {label:'d) proventi da consolidato fiscale', value:7.520641},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:32.723441, officialTotalExpenses:105.157443, officialPAT:-65.402911,
  },
};
const monzaitPresupuestoOverlayByYear = {};

const monzaitPasesData = [];
const monzaitResultadosData = {};
const monzaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['monza-it'] = {
  revenueLinesByYear: monzaitRevenueLinesByYear, expenseLinesByYear: monzaitExpenseLinesByYear,
  fiscalYearMeta: monzaitFiscalYearMeta, pasesData: monzaitPasesData,
  resultadosData: monzaitResultadosData, titulosData: monzaitTitulosData,
  presupuestoOverlayByYear: monzaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'monza-it-bilancio-2022': {
    id:'monza-it-bilancio-2022', clubId:'monza-it',
    title:'Associazione Calcio Monza S.p.A. — Monza-bilancio-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Monza/Monza-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['monza-it'] = null;

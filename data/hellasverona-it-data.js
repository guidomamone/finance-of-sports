// ============================================================================
// data/hellasverona-it-data.js — Hellas Verona Football Club S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "hellasverona-it" — slug de "Hellas Verona" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Hellas Verona Football Club S.p.A." — el .md, 9 veces (nombre del club + forma societaria)
//   displayName        ok        "Hellas Verona" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (86 de 87 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 11 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] hellas verona: #FFD100 Yellow
//   anio               ok        2020 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2020-06-30" — año del ejercicio + mes de cierre (contenido del .md (86 de 87 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("Hellas-Verona-bilancio-individuale-2020.pdf"), y no hay un consolidado del mismo ejercic
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2020-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2020-06-30 = 0.893 (Cierre BCE al 30/6/2020 (1 EUR = 1,1198 USD))
//   sourceId           ok        "hellasverona-it-bilancio-individuale-2020" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Hellas Verona"
//
// FISCAL YEAR META PROPUESTO para 2020 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2020: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2020-06-30","sourceId":"hellasverona-it-bilancio-individuale-2020"}
// ============================================================================

const hellasveronaitRevenueLinesByYear = {
  // 2020: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Gare Campionato', normalizedCategory:'matchday_competition', amountNative:1.738, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.038, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.9
    { rawLabel:'Ricavi diversi', normalizedCategory:'other_income', amountNative:0.074, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.96
    { rawLabel:'Percentuali su incassi da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:1.463043, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'1a) Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:1.709749, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'1b) Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.15, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'1c) Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.802368, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.98
    { rawLabel:'1d) Proventi da cessioni diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:29.161904, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'1e) Ricavi da cessione temporanea prestazione calciatori', normalizedCategory:'player_sales', amountNative:0.35, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.92
    { rawLabel:'1f) Plusvalenze da cessione pluriennale diritti calciatori', normalizedCategory:'player_sales', amountNative:15.03626, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.98
    { rawLabel:'1g) Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:12.149652, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'1h) Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:2.008318, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'b) Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.909502, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.98
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'a) Ricavi da gare', normalizedCategory:'matchday_competition', amountNative:2.502149, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'b) Abbonamenti', normalizedCategory:'season_tickets', amountNative:1.953526, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'c) Corrispettivi Store', normalizedCategory:'sponsorship_commercial', amountNative:1.473301, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'a) Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:1.324461, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'b) Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:9.066377, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'c) Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'d) Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:1.845, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'e) Proventi da cessioni diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:34.134013, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'f) Ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:8.1445, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.98
    { rawLabel:'g) Plusvalenze da cessione pluriennale diritti calciatori', normalizedCategory:'player_sales', amountNative:30.912273, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF', normalizedCategory:'player_sales', amountNative:4.773504, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'di cui proventi diversi da trasferimento calciatori', normalizedCategory:'player_sales', amountNative:0.166703, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.9
    { rawLabel:'i) Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:2.14917, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
  ],
};
const hellasveronaitExpenseLinesByYear = {
  2020: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-0.731918, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.95
    { rawLabel:'Costi per attività sportiva settore giovanile', normalizedCategory:'youth_other_sports_expense', amountNative:-0.496, disclosureLevel:'aggregated' }, // pág. 32, Jev 0.99
    { rawLabel:'Costi per attività sportiva prima squadra', normalizedCategory:'lump_football_operations_expense', amountNative:-0.765, disclosureLevel:'aggregated' }, // pág. 32, Jev 0.9
    { rawLabel:'Costi per competenze procuratori e consulenze sportive', normalizedCategory:'other_expenses', amountNative:-1.512, disclosureLevel:'aggregated' }, // pág. 32, precedente
    { rawLabel:'Costi accessori campagna trasferimenti', normalizedCategory:'other_expenses', amountNative:-4.028, disclosureLevel:'aggregated' }, // pág. 32, precedente
    { rawLabel:'Costi per servizio stadio “Bentegodi”', normalizedCategory:'match_organisation_expense', amountNative:-0.14, disclosureLevel:'aggregated' }, // pág. 32, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.182, disclosureLevel:'aggregated' }, // pág. 32, precedente
    { rawLabel:'Costi pubblicitari e promozionali (di cui con HVMC S.r.l. Euro 947= migliaia)', normalizedCategory:'admin_general_expense', amountNative:-0.98, disclosureLevel:'aggregated' }, // pág. 32, Jev 1
    { rawLabel:'Costi amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-5.243, disclosureLevel:'aggregated' }, // pág. 32, Jev 1
    { rawLabel:'Affitto campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.072, disclosureLevel:'aggregated' }, // pág. 33, Jev 0.95
    { rawLabel:'Affitto impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.76, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'Locazioni finanziarie', normalizedCategory:'admin_general_expense', amountNative:-0.022, disclosureLevel:'aggregated' }, // pág. 33, Jev 0.91
    { rawLabel:'Canoni di noleggio', normalizedCategory:'admin_general_expense', amountNative:-0.507, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'Canoni affitto altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.034, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'Altre spese su beni di terzi', normalizedCategory:'other_expenses', amountNative:-0.009, disclosureLevel:'aggregated' }, // pág. 33, Jev 0.9
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-22.858689, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.97
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-1.630264, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.395427, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'d) altri costi', normalizedCategory:'other_expenses', amountNative:-2.516431, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.99
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-4.992463, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.254953, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'c) Atre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.385871, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'d) Svalutazioni cred. incl. nell\'attivo circolante', normalizedCategory:'other_expenses', amountNative:-0.184718, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.97
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'13) Altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'a) Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.390318, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.94
    { rawLabel:'b) Tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.008765, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'c) Oneri specifici verso squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.017172, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'d) Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.269105, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'e) Minusvalenze da cessione diritti prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.737206, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Costi di valorizzazione calciatori', normalizedCategory:'player_amortisation', amountNative:-0.39, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Premi di rendimento', normalizedCategory:'wages_squad', amountNative:-0.18, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.98
    { rawLabel:'Altri costi da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.795, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'- Ammende e multe gara', normalizedCategory:'other_expenses', amountNative:-0.009, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.99
    { rawLabel:'- Contribuzione e Servizi Lega', normalizedCategory:'match_organisation_expense', amountNative:-1.171, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'- Altre spese', normalizedCategory:'other_expenses', amountNative:-0.135, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.99
  ],
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.998446, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.357, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.035, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-5.889, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.91
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.567, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Servizio biglietteria e controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.25, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.268, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-5.629, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Affitto campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.068, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Affitto impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.94, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Costi di noleggio', normalizedCategory:'admin_general_expense', amountNative:-0.918, disclosureLevel:'aggregated' }, // pág. 46, Claude 0.9
    { rawLabel:'Canoni affitto altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.174, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altre spese su beni di terzi', normalizedCategory:'other_expenses', amountNative:-0.037, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Locazioni finanziarie', normalizedCategory:'admin_general_expense', amountNative:-0.064, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-49.183265, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.949636, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.560313, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'d) altri costi', normalizedCategory:'other_expenses', amountNative:-1.672547, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-23.841826, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.414622, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'d) Svalutazioni cred. incl. nell\'attivo circolante', normalizedCategory:'other_expenses', amountNative:-1.025542, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'a) Oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-1.871434, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'b) Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.547, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'c) Minusvalenze da cessione diritti prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.699186, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF', normalizedCategory:'player_amortisation', amountNative:-0.120596, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'di cui costi diversi da trasferimento calciatori', normalizedCategory:'other_expenses', amountNative:-2.69664, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
    { rawLabel:'- Ammende e multe gara', normalizedCategory:'other_expenses', amountNative:-0.092, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'- Devoluzione e Servizi Lega', normalizedCategory:'match_organisation_expense', amountNative:-1.191, disclosureLevel:'aggregated' }, // pág. 48, Jev 0.96
    { rawLabel:'- Oneri precedenti esercizi e sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.142, disclosureLevel:'aggregated' }, // pág. 48, Jev 0.97
    { rawLabel:'- Altre spese', normalizedCategory:'other_expenses', amountNative:-0.795, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-8.21724, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'11) Variazioni delle rimanenze (a favor)', normalizedCategory:'other_expenses', amountNative:0.025971, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
};
const hellasveronaitFiscalYearMeta = {
  2020: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'hellasverona-it-bilancio-individuale-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.027588, tax:-1.484095,
    extraRows: [
      {label:'a) in imprese controllate', value:0},
      {label:'d) Proventi diversi dai precedenti', value:-0.000017},
      {label:'e) Proventi da compartecipazioni', value:0},
      {label:'a) Da compartecipazioni ex Art. 102 bis NOIF', value:0},
      {label:'b) Interessi e altri oneri finanziari: v/controllanti', value:0},
      {label:'b.1) verso terzi', value:-0.027571},
      {label:'Ines/Irap dell\'esercizio', value:-0.995095},
      {label:'b) Imposte differite', value:-1.103845},
      {label:'c) Imposte anticipate', value:0.614845},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Costi per attività sportiva prima squadra', lado:'expense', importe:0.765, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:65.590796, officialTotalExpenses:55.066094, officialPAT:8.275111,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 8.217.240. fila fuera del índice de localizar (cola 8c6bea8)
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (25.971). idem; costo negativo
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 4.720. sección C fuera del índice
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (4.520.228). idem
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (10.210). idem
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'hellasverona-it-bilancio-individuale-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.525718, tax:1.341981,
    extraRows: [
      {label:'18) Rivalutazioni', value:0},
      {label:'a) di partecipazioni', value:0},
      {label:'16) d.5) Altri proventi diversi', value:0.00472},
      {label:'17) e) altri interessi e oneri finanziari', value:-4.520228},
      {label:'17-bis) Utili e perdite su cambi', value:-0.01021},
      {label:'Ires/Irap dell\'esercizio', value:-1.837856},
      {label:'c) Imposte differite', value:-3.2424},
      {label:'d) Imposte anticipate', value:6.422237},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:98.444977, officialTotalExpenses:114.347136, officialPAT:-19.9277,
  },
};
const hellasveronaitPresupuestoOverlayByYear = {};

const hellasveronaitPasesData = [];
const hellasveronaitResultadosData = {};
const hellasveronaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['hellasverona-it'] = {
  revenueLinesByYear: hellasveronaitRevenueLinesByYear, expenseLinesByYear: hellasveronaitExpenseLinesByYear,
  fiscalYearMeta: hellasveronaitFiscalYearMeta, pasesData: hellasveronaitPasesData,
  resultadosData: hellasveronaitResultadosData, titulosData: hellasveronaitTitulosData,
  presupuestoOverlayByYear: hellasveronaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'hellasverona-it-bilancio-individuale-2020': {
    id:'hellasverona-it-bilancio-individuale-2020', clubId:'hellasverona-it',
    title:'Hellas Verona Football Club S.p.A. — Hellas-Verona-bilancio-individuale-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'hellasverona-it-bilancio-individuale-2023': {
    id:'hellasverona-it-bilancio-individuale-2023', clubId:'hellasverona-it',
    title:'Hellas Verona Football Club S.p.A. — Hellas-Verona-bilancio-individuale-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['hellasverona-it'] = null;

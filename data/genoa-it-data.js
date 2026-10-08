// ============================================================================
// data/genoa-it-data.js — Genoa Cricket and Football Club S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "genoa-it" — slug de "Genoa" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Genoa Cricket and Football Club S.p.A." — respuesta de Guido en la cola (ef0de19)
//   displayName        ok        "Genoa" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — el documento más reciente del club (Genoa-bilancio-30.06.2025-consolidato.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 6: 2024,2025,2025 / me
//   sport              ok        "futbol" — el .md nombra el fútbol -117 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] genoa: #002942 Dark Blue, #AB131C Dark Red, #FFD600 Yellow, #FFFFFF White
//   anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (nombre del archivo (2022-12-31) y contenido del .md (214 de 278 fechas de fin de mes))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-07: individual (Genoa Cricket and Football Club S.p.A.); único perímetro
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2022-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-12-31 = 0.937559 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
//   sourceId           ok        "genoa-it-bilancio-31-12-2022-individual" — clubId + nombre del archivo en slug
//   liga               ok        "it-serieb" — roster cacheado de "2022–23 Serie B" (tools/club-league-reference/it.json), coincidencia exacta "Genoa"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-12-31","sourceId":"genoa-it-bilancio-31-12-2022-individual"}
// ============================================================================

const genoaitRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Gare campionato', normalizedCategory:'matchday_competition', amountNative:1.658958, disclosureLevel:'aggregated' }, // pág. 78, Jev 1
    { rawLabel:'Gare coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.114176, disclosureLevel:'aggregated' }, // pág. 78, Jev 0.99
    { rawLabel:'b) percentuale su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:0.062983, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:1.274388, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:4.918278, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.98
    { rawLabel:'- Paracadute retrocesse ex art. 18, comma 3, dello Statuto LNPA', normalizedCategory:'broadcasting', amountNative:25, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:1.046578, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:1.109739, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'- proventi televisivi', normalizedCategory:'broadcasting', amountNative:11.094754, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.742541, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:13.122835, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:9.235531, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.94
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:15.282877, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
};
const genoaitExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) Per acquisti materiale di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-0.164498, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.067673, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.189785, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-3.471878, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.94558, disclosureLevel:'aggregated' }, // pág. 82, Jev 0.98
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.32051, disclosureLevel:'aggregated' }, // pág. 82, Claude 0.92
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.377552, disclosureLevel:'aggregated' }, // pág. 82, Claude 0.85
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-6.767924, disclosureLevel:'aggregated' }, // pág. 82, Jev 1
    { rawLabel:'8) Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.007074, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-70.221072, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-4.546914, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.95
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.619956, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'a) ammortamenti immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-19.452175, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-3.845322, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.95
    { rawLabel:'d) svalutazioni dei crediti nell\'attivo circolante e nelle disponib. liquide', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'11) Variazioni delle rimanenze di materiale di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-0.411247, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.349732, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.88
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.226172, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.034, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'- percentuale su diritti televisivi a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.94
    { rawLabel:'d) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.259025, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-2.590025, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'Costi valorizzazione calciatori', normalizedCategory:'player_amortisation', amountNative:-1.973275, disclosureLevel:'aggregated' }, // pág. 86, Claude 0.8
    { rawLabel:'Contributo di solidarietà', normalizedCategory:'player_amortisation', amountNative:-1.011447, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Premio alla carriera ex art. 99 bis N.O.I.F.', normalizedCategory:'wages_squad', amountNative:-0.155, disclosureLevel:'aggregated' }, // pág. 86, Claude 0.8
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.142087, disclosureLevel:'aggregated' }, // pág. 86, Claude 0.88
    { rawLabel:'Oneri lega', normalizedCategory:'match_organisation_expense', amountNative:-3.571011, disclosureLevel:'aggregated' }, // pág. 86, Claude 0.8
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-6.855563, disclosureLevel:'aggregated' }, // pág. 86, Claude 0.92
    { rawLabel:'Altri (Sopravvenienze Passive)', normalizedCategory:'exceptional_items', amountNative:-15.049305, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.93
  ],
};
const genoaitFiscalYearMeta = {
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (5.297.416). pág. 10 transcripta sin tabla: importes sin etiqueta (cola 3560b84)
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 104. idem
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (23.945). idem
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (847.954). idem
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 8.589.283. idem
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 1.654.981. idem
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): resultado-final = (61.728.621). el resultado del conto economico (pág. 10, transcripta como texto sin tabla) no se detecta; las filas (con el financiero y el impuesto por ajuste) dan -61.728.624 (3 € de redondeo); el impuesto deducido queda igual al impreso
  2022: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-12-31',
    sourceId:'genoa-it-bilancio-31-12-2022-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.16277, tax:9.396313,
    extraRows: [
      {label:'- altri', value:0.138916},
      {label:'b) da titoli iscritti nelle immobilizzazioni che non costituiscono partecipazioni', value:0.019529},
      {label:'c) da titoli iscritti nell\'attivo circolante che non costituiscono partecipazioni', value:0.000042},
      {label:'17) e) altri oneri finanziari', value:-5.297416},
      {label:'17 bis) a) utile su cambi', value:0.000104},
      {label:'17 bis) b) perdite su cambi', value:-0.023945},
      {label:'20) a) imposte correnti (deducido: antes de impuestos − resultado final, por ajuste manual)', value:9.396313},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:84.663638, officialTotalExpenses:132.986472, officialPAT:-61.728621,
  },
};
const genoaitPresupuestoOverlayByYear = {};

const genoaitPasesData = [];
const genoaitResultadosData = {};
const genoaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['genoa-it'] = {
  revenueLinesByYear: genoaitRevenueLinesByYear, expenseLinesByYear: genoaitExpenseLinesByYear,
  fiscalYearMeta: genoaitFiscalYearMeta, pasesData: genoaitPasesData,
  resultadosData: genoaitResultadosData, titulosData: genoaitTitulosData,
  presupuestoOverlayByYear: genoaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'genoa-it-bilancio-31-12-2022-individual': {
    id:'genoa-it-bilancio-31-12-2022-individual', clubId:'genoa-it',
    title:'Genoa Cricket and Football Club S.p.A. — Genoa-bilancio-31.12.2022-individual (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['genoa-it'] = null;

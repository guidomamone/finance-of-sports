// ============================================================================
// data/inter-it-data.js — F.C. Internazionale Milano S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "inter-it" — slug de "Inter" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "F.C. Internazionale Milano S.p.A." — el .md, 50 veces (nombre del club + forma societaria)
//   displayName        ok        "Inter" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (368 de 391 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 74 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [brasil] sc internacional: #E5050F Red, #FFFFFF White | [colombia] internacional de bogota: #C49F65 gold, #
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (368 de 391 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 5 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "inter-it-fascicolo-bilancio-consolidato-2024-25" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Inter Milan" = "Inter"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"inter-it-fascicolo-bilancio-consolidato-2024-25"}
// ============================================================================

const interitRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'- Championship matches', normalizedCategory:'matchday_competition', amountNative:22.63, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.97
    { rawLabel:'- Coppa Italia matches', normalizedCategory:'matchday_competition', amountNative:3.826, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.97
    { rawLabel:'- International Cup matches', normalizedCategory:'matchday_competition', amountNative:8.009, disclosureLevel:'aggregated' }, // pág. 53, Claude 0.8
    { rawLabel:'- Tournaments and friendly matches', normalizedCategory:'matchday_competition', amountNative:0.02, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.99
    { rawLabel:'b) revenue from away matches', normalizedCategory:'matchday_competition', amountNative:1.60039, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'c) season tickets', normalizedCategory:'season_tickets', amountNative:1.569645, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'- Inter Club/Member Fan Cards', normalizedCategory:'member_dues', amountNative:2.191, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.98
    { rawLabel:'- Sponsorship EU in house', normalizedCategory:'sponsorship_commercial', amountNative:16.125, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.98
    { rawLabel:'- Sponsorship Regional', normalizedCategory:'sponsorship_commercial', amountNative:15.645, disclosureLevel:'aggregated' }, // pág. 53, Jev 1
    { rawLabel:'- Rai-Infront-CSB-Dazn Library', normalizedCategory:'broadcasting', amountNative:6.823, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.93
    { rawLabel:'- Inter TV', normalizedCategory:'broadcasting', amountNative:2.457, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.97
    { rawLabel:'- Others', normalizedCategory:'other_income', amountNative:0.454, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.99
    { rawLabel:'2) Changes in inventories of work in progress, semi-finished and finished products', normalizedCategory:'other_income', amountNative:0.280769, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'4) Capitalization of youth programme costs', normalizedCategory:'other_income', amountNative:8.899515, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'a) grants and contribution', normalizedCategory:'other_income', amountNative:16.612651, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.98
    { rawLabel:'b) sponsorships', normalizedCategory:'sponsorship_commercial', amountNative:43.497058, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'c) advertising income', normalizedCategory:'sponsorship_commercial', amountNative:4.039383, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'d) commercial income and royalties', normalizedCategory:'sponsorship_commercial', amountNative:6.472314, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'- television revenues', normalizedCategory:'broadcasting', amountNative:84.239107, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'- television income from participation in UEFA competitions', normalizedCategory:'broadcasting', amountNative:62.303836, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.97
    { rawLabel:'g) revenues from temporary loan of players', normalizedCategory:'player_sales', amountNative:1.246479, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'h) gains on sale of player registrations rights', normalizedCategory:'player_sales', amountNative:105.232497, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'i) other income from player management', normalizedCategory:'player_sales', amountNative:2.469482, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'l) sundry revenues and income', normalizedCategory:'other_income', amountNative:22.999055, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:67.296366, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:31.541347, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'2) Variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:2.022694, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'- altri contributi in conto esercizio', normalizedCategory:'other_income', amountNative:16.374844, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.97
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:88.168392, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:10.026251, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:44.148269, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:264.422878, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:3, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:14.370974, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'- proventi diversi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:4.117261, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.94
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:21.522762, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
  ],
};
const interitExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Technical material', normalizedCategory:'admin_general_expense', amountNative:-2.706, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Consumables', normalizedCategory:'admin_general_expense', amountNative:-1.844, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Health material', normalizedCategory:'admin_general_expense', amountNative:-0.199, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'E-commerce material', normalizedCategory:'admin_general_expense', amountNative:-0.281, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Other', normalizedCategory:'other_expenses', amountNative:-0.18, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.93
    { rawLabel:'Costs for training sessions and camps', normalizedCategory:'match_organisation_expense', amountNative:-2.11, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Health expenses', normalizedCategory:'match_organisation_expense', amountNative:-0.628, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Fees for self-employed contractors', normalizedCategory:'admin_general_expense', amountNative:-1.923, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Retirement costs', normalizedCategory:'wages_squad', amountNative:-0.646, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Expenses for maintenance of sport pitches', normalizedCategory:'admin_general_expense', amountNative:-0.837, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Sundry', normalizedCategory:'other_expenses', amountNative:-0.274, disclosureLevel:'aggregated' }, // pág. 57, Jev 0.91
    { rawLabel:'Player scouting and trials', normalizedCategory:'other_expenses', amountNative:-0.979, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Subsidized teams', normalizedCategory:'youth_other_sports_expense', amountNative:-0.25, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Transfer market agent fees', normalizedCategory:'other_expenses', amountNative:-22.976, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Sundry', normalizedCategory:'other_expenses', amountNative:-0.075, disclosureLevel:'aggregated' }, // pág. 57, Jev 0.91
    { rawLabel:'Costs for accomodation, food, transport', normalizedCategory:'match_organisation_expense', amountNative:-1.983, disclosureLevel:'aggregated' }, // pág. 57, Jev 1
    { rawLabel:'Ticketing service, ground admission, security control', normalizedCategory:'match_organisation_expense', amountNative:-3.683, disclosureLevel:'aggregated' }, // pág. 57, Jev 1
    { rawLabel:'Insurance and pension', normalizedCategory:'admin_general_expense', amountNative:-2.359, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Intercampus', normalizedCategory:'other_expenses', amountNative:-0.273, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Administrative, advertising and general', normalizedCategory:'admin_general_expense', amountNative:-25.378, disclosureLevel:'aggregated' }, // pág. 57, Jev 1
    { rawLabel:'Licence to use Meazza Stadium', normalizedCategory:'match_organisation_expense', amountNative:-4.758, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Rental expenses', normalizedCategory:'admin_general_expense', amountNative:-3.31, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Operating lease payments', normalizedCategory:'admin_general_expense', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Other user licence fees', normalizedCategory:'other_expenses', amountNative:-2.19, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.93
    { rawLabel:'Concession sports facilities', normalizedCategory:'admin_general_expense', amountNative:-0.549, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Other Rental fees', normalizedCategory:'admin_general_expense', amountNative:-1.935, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'a) salaries and wages', normalizedCategory:'wages_squad', amountNative:-217.790584, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'b) social security contributions', normalizedCategory:'wages_squad', amountNative:-8.802346, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.95
    { rawLabel:'c) employee severance indemnity', normalizedCategory:'wages_squad', amountNative:-2.078553, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'e) other costs', normalizedCategory:'wages_squad', amountNative:-19.762744, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'a) amortisation of intangibles assets', normalizedCategory:'player_amortisation', amountNative:-124.531265, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'b) depreciation of tangible', normalizedCategory:'depreciation', amountNative:-1.844571, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'c) write-downs of assets', normalizedCategory:'player_impairment', amountNative:-16.556314, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'d) write-downs of doubtful account receivables included in current assets', normalizedCategory:'other_amortisation', amountNative:-25.803288, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.96
    { rawLabel:'12) Provision for risks', normalizedCategory:'other_amortisation', amountNative:-0.027146, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'13) Other provisions', normalizedCategory:'other_amortisation', amountNative:-12.006531, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'a) various costs of organising competitions', normalizedCategory:'match_organisation_expense', amountNative:-4.529072, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.97
    { rawLabel:'b) competition registration fees', normalizedCategory:'match_organisation_expense', amountNative:-0.018332, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'- percentage of match takings paid to visiting teams', normalizedCategory:'match_organisation_expense', amountNative:-0.150787, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'d) costs for the temporary acquisition of players', normalizedCategory:'other_expenses', amountNative:-0.27, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'e) losses from the sale of player registrations', normalizedCategory:'other_expenses', amountNative:-0.050536, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.94
    { rawLabel:'f) other expenses from player management', normalizedCategory:'other_expenses', amountNative:-4.723285, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.97
    { rawLabel:'- Costs, fines and penalties for matches', normalizedCategory:'match_organisation_expense', amountNative:-0.214, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Indirect tax expenses', normalizedCategory:'admin_general_expense', amountNative:-0.513, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.98
    { rawLabel:'- Contributions from Football League', normalizedCategory:'match_organisation_expense', amountNative:-1.068, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Transactions and compensation', normalizedCategory:'other_expenses', amountNative:-0.658, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Cost of previously years', normalizedCategory:'exceptional_items', amountNative:-1.763, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.96
    { rawLabel:'- Sundry costs', normalizedCategory:'other_expenses', amountNative:-2.402, disclosureLevel:'aggregated' }, // pág. 61, Jev 1
  ],
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo', normalizedCategory:'other_expenses', amountNative:-16.659295, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'7) Per servizi', normalizedCategory:'admin_general_expense', amountNative:-80.032871, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'8) Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-17.047058, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-231.682534, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-11.737955, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.92
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-2.551709, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.92
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-7.248734, disclosureLevel:'aggregated' }, // pág. 46, Claude 0.88
    { rawLabel:'a) ammortamento immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-79.856596, disclosureLevel:'aggregated' }, // pág. 46, Claude 0.88
    { rawLabel:'b) ammortamento immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-2.197761, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'c) svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-6.34645, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.98
    { rawLabel:'d) svalutazioni di crediti compresi nell\'attivo circolante e nelle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-2.558108, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0.01942, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.98
    { rawLabel:'13) Altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:-8.871892, disclosureLevel:'aggregated' }, // pág. 46, Claude 0.92
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-7.128693, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'b) costi da acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.25, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.011849, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'- oneri diversi da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-0.53586, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-7.326177, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
  ],
};
const interitFiscalYearMeta = {
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 521.197. D) rettifiche quedaban sin lado (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
  2022: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-48.333842, tax:-3.45366,
    extraRows: [
      {label:'- from other companies', value:0.000248},
      {label:'- from third parties', value:0.955104},
      {label:'c) from parent companies', value:-4.8},
      {label:'d) other financial expenses', value:-45.165624},
      {label:'a) income from exchange', value:0.190987},
      {label:'c) losses on exchange', value:-0.035754},
      {label:'revaluation of investments', value:0.521197},
      {label:'a) current taxes', value:-3.74694},
      {label:'b) deferred tax liabilities', value:0.413833},
      {label:'c) deferred tax assets', value:-0.120553},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:439.642181, officialTotalExpenses:526.149354, officialPAT:-140.05618,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 780.928. D) 18) rettifiche: la fila no se extrajo (to-do 155). Sin reemplaza: la toma el escalón 'ajustes del financiero sin reemplaza' de verificar.mjs (to-do 156 B), ya no hace falta --reemplaza-linea
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-35.098536, tax:-14.491102,
    extraRows: [
      {label:'a.5) altri proventi', value:0.252746},
      {label:'d.5) altri proventi diversi', value:6.116183},
      {label:'c) verso imprese controllanti', value:-0.095298},
      {label:'e) altri interessi e oneri finanziari', value:-42.382857},
      {label:'17 bis) Utile e perdite su cambi', value:0.229762},
      {label:'rivalutazioni di partecipazioni', value:0.780928},
      {label:'a) imposte correnti', value:-15.335692},
      {label:'b) imposte relative a esercizi precedenti', value:0.416423},
      {label:'c) imposte differite', value:0.413833},
      {label:'d) imposte anticipate', value:0.014334},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:567.012038, officialTotalExpenses:482.012273, officialPAT:35.398278,
  },
};
const interitPresupuestoOverlayByYear = {};

const interitPasesData = [];
const interitResultadosData = {};
const interitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['inter-it'] = {
  revenueLinesByYear: interitRevenueLinesByYear, expenseLinesByYear: interitExpenseLinesByYear,
  fiscalYearMeta: interitFiscalYearMeta, pasesData: interitPasesData,
  resultadosData: interitResultadosData, titulosData: interitTitulosData,
  presupuestoOverlayByYear: interitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'inter-it-fascicolo-bilancio-consolidato-2021-22': {
    id:'inter-it-fascicolo-bilancio-consolidato-2021-22', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'inter-it-fascicolo-bilancio-consolidato-2024-25': {
    id:'inter-it-fascicolo-bilancio-consolidato-2024-25', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['inter-it'] = null;

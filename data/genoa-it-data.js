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
  // 2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Genoa/Genoa-bilancio-30.06.2025-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Genoa/Genoa-bilancio-30.06.2025-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Gare campionato', normalizedCategory:'matchday_competition', amountNative:1.397559, disclosureLevel:'aggregated' }, // pág. 89, precedente
    { rawLabel:'Gare coppa italia', normalizedCategory:'matchday_competition', amountNative:0.686154, disclosureLevel:'aggregated' }, // pág. 89, precedente
    { rawLabel:'Altre gare', normalizedCategory:'matchday_competition', amountNative:0.02, disclosureLevel:'aggregated' }, // pág. 89, Jev 0.95
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:5.951414, disclosureLevel:'aggregated' }, // pág. 89, precedente
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:3.690013, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:1.589868, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:3.2, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:1.973421, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:43.971312, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Ricavi da cessione temporanea prestazioni calciatori (prestiti)', normalizedCategory:'player_sales', amountNative:7.10925, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:20.783273, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.99
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:27.550635, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:2.555824, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.98
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Genoa/Genoa-bilancio-31.12.2023-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Genoa/Genoa-bilancio-31.12.2023-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Gare campionato', normalizedCategory:'matchday_competition', amountNative:1.8562, disclosureLevel:'aggregated' }, // pág. 93, precedente
    { rawLabel:'Gare coppa italia', normalizedCategory:'matchday_competition', amountNative:0.152549, disclosureLevel:'aggregated' }, // pág. 93, precedente
    { rawLabel:'Altre gare', normalizedCategory:'matchday_competition', amountNative:0.113135, disclosureLevel:'aggregated' }, // pág. 93, precedente
    { rawLabel:'Gare coppa italia', normalizedCategory:'matchday_competition', amountNative:0.177797, disclosureLevel:'aggregated' }, // pág. 93, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:3.721714, disclosureLevel:'aggregated' }, // pág. 93, precedente
    { rawLabel:'contributi in conto esercizio', normalizedCategory:'other_income', amountNative:4.730058, disclosureLevel:'aggregated' }, // pág. 13, Claude 0.95
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:2.635423, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.842, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.061781, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:24, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Ricavi da cessione temporanea prestazioni calciatori (prestiti)', normalizedCategory:'player_sales', amountNative:1.144396, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:6.2625, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:9.016878, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:60.269055, disclosureLevel:'aggregated' }, // pág. 94, precedente
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
  2025: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale sportivo e indumenti', normalizedCategory:'other_expenses', amountNative:-0.577127, disclosureLevel:'aggregated' }, // pág. 92, Claude 0.8
    { rawLabel:'Altro', normalizedCategory:'other_expenses', amountNative:-0.062526, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.95
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.042989, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.068111, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-2.587433, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-3.234511, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.361716, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Costi di Service', normalizedCategory:'admin_general_expense', amountNative:-2.351457, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.211906, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-2.764119, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Commissioni Varie', normalizedCategory:'admin_general_expense', amountNative:-6.994497, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.94
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.164129, disclosureLevel:'aggregated' }, // pág. 12, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-57.169719, disclosureLevel:'aggregated' }, // pág. 12, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-4.563761, disclosureLevel:'aggregated' }, // pág. 12, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.670351, disclosureLevel:'aggregated' }, // pág. 12, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-52.967396, disclosureLevel:'aggregated' }, // pág. 12, Claude 0.93
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.137598, disclosureLevel:'aggregated' }, // pág. 12, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 12, precedente
    { rawLabel:'11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.235646, disclosureLevel:'aggregated' }, // pág. 12, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-1.35, disclosureLevel:'aggregated' }, // pág. 12, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.655144, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.004, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Oneri specifici verso squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.325994, disclosureLevel:'aggregated' }, // pág. 95, Jev 1
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.9436, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.478715, disclosureLevel:'aggregated' }, // pág. 95, Jev 1
    { rawLabel:'Costi valorizzazione calciatori', normalizedCategory:'player_amortisation', amountNative:-0.035064, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Contributo di solidarietà', normalizedCategory:'player_amortisation', amountNative:-0.054527, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Premio alla carriera ex art. 99 bis N.O.I.F.', normalizedCategory:'wages_squad', amountNative:-0.030536, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.186114, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Oneri lega', normalizedCategory:'match_organisation_expense', amountNative:-2.015683, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.767126, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Altri (Sopravvenienze Passive)', normalizedCategory:'exceptional_items', amountNative:-0.882583, disclosureLevel:'aggregated' }, // pág. 95, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.015716, disclosureLevel:'aggregated' }, // pág. 13, Jev 0.99
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.020482, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.709102, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-5.527073, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-2.436368, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.401331, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Costi di Service', normalizedCategory:'admin_general_expense', amountNative:-8.391287, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.111985, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-5.93495, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.785918, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-60.082004, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.734692, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.554082, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'Diritti pluriennali calciatori 1° squadra', normalizedCategory:'player_amortisation', amountNative:-27.794978, disclosureLevel:'aggregated' }, // pág. 100, Jev 0.92
    { rawLabel:'Diritti pluriennali calciatori settore giovanile', normalizedCategory:'player_amortisation', amountNative:-0.07175, disclosureLevel:'aggregated' }, // pág. 100, Jev 0.99
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.304581, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.862316, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.03, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Oneri specifici verso squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.061865, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.951382, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-1.339974, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Costi valorizzazione calciatori', normalizedCategory:'player_amortisation', amountNative:-3.707528, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Contributo di solidarietà', normalizedCategory:'player_amortisation', amountNative:-0.298619, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Premio alla carriera *ex art. 99 bis N.O.I.F.', normalizedCategory:'wages_squad', amountNative:-0.183846, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.215257, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Oneri lega', normalizedCategory:'match_organisation_expense', amountNative:-3.80355, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-1.968882, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Altri (Sopravvenienze Passive)', normalizedCategory:'exceptional_items', amountNative:-6.358874, disclosureLevel:'aggregated' }, // pág. 101, precedente
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
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): name = Genoa Cricket and Football Club S.p.A.. Guido 2026-10-07: la sociedad que juega (perímetro individual)
  2025: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'genoa-it-bilancio-30-06-2025-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.586783, tax:-0.299043,
    extraRows: [
      {label:'b) da titoli iscritti nelle immobilizzazioni che non costituiscono partecipazioni', value:0.04725},
      {label:'c) da titoli iscritti nell\'attivo circolante che non costituiscono partecipazioni', value:0.013119},
      {label:'da imprese controllanti', value:0.060708},
      {label:'altri', value:1.55124},
      {label:'altri', value:-7.194827},
      {label:'17-bis) utili e perdite su cambi', value:-0.064273},
      {label:'imposte correnti', value:-0.299043},
      {label:'imposte relative a esercizi precedenti', value:0},
      {label:'proventi (oneri) da adesione al regime di consolidato fiscale / trasparenza fiscale', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:120.478723, officialTotalExpenses:146.53278, officialPAT:-33.301181,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (10.323.759). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): Codice Civile: el 17) altri se imprime en positivo y se resta por posición; el script lo sumaba. C impreso (9.579.460)
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (12.799). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): es un provento: reduce el total de impuestos, que el documento imprime (2.712.602) en L403; sumaba al revés
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 2022. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 6.021.395. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.110.505. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 4.730.058. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 29.918.278. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 106.232.032. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 51.634.857. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 110.962.090. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 81.553.135. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 116.983.485. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 84.663.640. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.015.716. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 164.498. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 23.532.578. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 15.140.901. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.785.918. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.007.074. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 60.082.004. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 70.221.072. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.734.692. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 4.546.914. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 554.082. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 619.956. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 64.370.778. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 75.387.942. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 27.866.728. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 19.452.175. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.845.322. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 27.866.728. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 23.297.497. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 304.581. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 411.247. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 349.732. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 21.782.092. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 32.866.910. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 142.658.391. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 150.625.801. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 25.674.906. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 65.962.161. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 11.352. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 138.916. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 11.352. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 138.916. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 47.250. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 19.529. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 186.305. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 502.708. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 689.013. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 747.615. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 158.487. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 10.323.759. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 5.297.416. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 10.323.759. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 5.297.416. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.316. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 23.841. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 9.579.460. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 5.162.770. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 35.254.366. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 71.124.931. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.559.129. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 847.954. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.051.785. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 5.310.717. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 8.589.283. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 12.799. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.654.981. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 2.712.602. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 9.396.310. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 32.541.764. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 61.728.621. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-12-31',
    sourceId:'genoa-it-bilancio-31-12-2023-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-9.57946, tax:2.712602,
    extraRows: [
      {label:'altri', value:0.011352},
      {label:'b) da titoli iscritti nelle immobilizzazioni che non costituiscono partecipazioni', value:0.04725},
      {label:'c) da titoli iscritti nell\'attivo circolante che non costituiscono partecipazioni', value:0},
      {label:'da imprese controllanti', value:0.186305},
      {label:'altri', value:0.502708},
      {label:'17-bis) utili e perdite su cambi', value:-0.003316},
      {label:'altri oneri finanziari (17, costo)', value:-10.323759},
      {label:'imposte correnti', value:-1.559129},
      {label:'imposte relative a esercizi precedenti', value:-1.051785},
      {label:'imposte differite e anticipate', value:5.310717},
      {label:'proventi da adesione consolidato fiscale (resta del impuesto)', value:0.012799},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:116.983486, officialTotalExpenses:134.959544, officialPAT:-32.541764,
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
  'genoa-it-bilancio-30-06-2025-individual': {
    id:'genoa-it-bilancio-30-06-2025-individual', clubId:'genoa-it',
    title:'Genoa Cricket and Football Club S.p.A. — Genoa-bilancio-30.06.2025-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Genoa/Genoa-bilancio-30.06.2025-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'genoa-it-bilancio-31-12-2023-individual': {
    id:'genoa-it-bilancio-31-12-2023-individual', clubId:'genoa-it',
    title:'Genoa Cricket and Football Club S.p.A. — Genoa-bilancio-31.12.2023-individual (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Genoa/Genoa-bilancio-31.12.2023-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['genoa-it'] = null;

// ============================================================================
// data/napoli-it-data.js — SSC Napoli S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Napoli/Napoli-bilancio-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "napoli-it" — slug de "Napoli" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "SSC Napoli S.p.A." — el .md, 67 veces (nombre del club + forma societaria)
//   displayName        ok        "Napoli" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (190 de 198 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] napoli: #00ABE7 Blue, #FFFFFF White
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (190 de 198 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "napoli-it-bilancio-2025" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Napoli"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"napoli-it-bilancio-2025"}
// ============================================================================

const napoliitRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Napoli/Napoli-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Napoli/Napoli-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:13.212447, disclosureLevel:'aggregated' }, // pág. 44, Claude 0.95
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.858139, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.91
    { rawLabel:'- Altre gare - amichevoli', normalizedCategory:'matchday_competition', amountNative:0.316917, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.92
    { rawLabel:'b) percentuale su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:0.066179, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.97
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:9.190793, disclosureLevel:'aggregated' }, // pág. 44, Claude 0.95
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.483709, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.91
    { rawLabel:'d) altri ricavi da gare', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, ? 0.6
    { rawLabel:'Sponsor istituzionali', normalizedCategory:'sponsorship_commercial', amountNative:1.122425, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Altre sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:10.0492, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'Regional Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:1.75, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Global Partner', normalizedCategory:'sponsorship_commercial', amountNative:10.107292, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.91
    { rawLabel:'Principal Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:9.177575, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Official Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:8.957638, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Local Partner', normalizedCategory:'sponsorship_commercial', amountNative:0.431948, disclosureLevel:'aggregated' }, // pág. 45, Claude 0.95
    { rawLabel:'Business Partner', normalizedCategory:'sponsorship_commercial', amountNative:3.664756, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.98
    { rawLabel:'Sponsor - Ospitalità', normalizedCategory:'sponsorship_commercial', amountNative:2.801795, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.005, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Proventi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:18.939974, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Proventi da licensing', normalizedCategory:'sponsorship_commercial', amountNative:1.056749, disclosureLevel:'aggregated' }, // pág. 45, Claude 0.9
    { rawLabel:'Altri proventi commerciali', normalizedCategory:'sponsorship_commercial', amountNative:0.08079, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.96
    { rawLabel:'Proventi televisivi - LNPA', normalizedCategory:'broadcasting', amountNative:67.793035, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'Proventi televisivi da competizione Uefa', normalizedCategory:'broadcasting', amountNative:3.938244, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.98
    { rawLabel:'Proventi televisivi gare amichevoli', normalizedCategory:'broadcasting', amountNative:0.194388, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'Altri Proventi TV', normalizedCategory:'broadcasting', amountNative:6.158798, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.94
    { rawLabel:'Proventi radiofonici', normalizedCategory:'broadcasting', amountNative:0.9, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.94
    { rawLabel:'Proventi sfruttamento diritti d\'immagine', normalizedCategory:'sponsorship_commercial', amountNative:0.444, disclosureLevel:'aggregated' }, // pág. 46, ? 0.65
    { rawLabel:'g) ricavi per cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:7.241858, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'h) plusvalenza da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:102.550445, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.57142, disclosureLevel:'aggregated' }, // pág. 6, Claude 0.8
    { rawLabel:'- proventi da enti federali (L.N.P.A.)', normalizedCategory:'other_income', amountNative:0.367821, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.98
    { rawLabel:'- proventi produzioni televisive', normalizedCategory:'broadcasting', amountNative:1.376549, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.93
    { rawLabel:'- altri ricavi', normalizedCategory:'other_income', amountNative:7.050442, disclosureLevel:'aggregated' }, // pág. 47, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Napoli/Napoli-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Napoli/Napoli-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'a) ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:15.811801, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:11.484132, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'d) altri ricavi da gare', normalizedCategory:'matchday_competition', amountNative:0.094979, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:48.650684, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.005, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:21.568088, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'e) proventi da cessioni diritti televisivi', normalizedCategory:'broadcasting', amountNative:142.188404, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:1.307222, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'g) ricavi per cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:1.3, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'h) plusvalenza da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:70.758785, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.867745, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'j) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:14.153534, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
  ],
};
const napoliitExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Acquisto materiale sportivo', normalizedCategory:'other_expenses', amountNative:-0.176999, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
    { rawLabel:'Acquisto materiale indumenti', normalizedCategory:'admin_general_expense', amountNative:-0.822073, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Acquisto materiale di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.428446, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.96
    { rawLabel:'Acquisto materiale di cancelleria e stampati', normalizedCategory:'admin_general_expense', amountNative:-0.02113, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.103624, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
    { rawLabel:'Beni destinati alla rivendita', normalizedCategory:'admin_general_expense', amountNative:-4.900237, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi per tesserati ed attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.69292, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.034212, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-19.950371, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.713094, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Servizio biglietteria e controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-2.847942, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.161452, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.94
    { rawLabel:'Compensi Amministratori', normalizedCategory:'admin_general_expense', amountNative:-2.767828, disclosureLevel:'aggregated' }, // pág. 50, Claude 0.85
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-5.703665, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.144077, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.94
    { rawLabel:'Locazioni operative', normalizedCategory:'admin_general_expense', amountNative:-3.212019, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Affitto centro tecnico, campi sportivi e canone concessione stadio', normalizedCategory:'match_organisation_expense', amountNative:-1.1513, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Altri costi per godimento beni terzi', normalizedCategory:'admin_general_expense', amountNative:-2.31096, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Compensi contrattuali calciatori', normalizedCategory:'wages_squad', amountNative:-100.437597, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Quota variabile retrib. calc. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-6.206871, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
    { rawLabel:'Compensi contrattuali allenatori', normalizedCategory:'wages_squad', amountNative:-18.418929, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
    { rawLabel:'Quota variabile retrib. allen. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-3.897554, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.9
    { rawLabel:'Compensi contrattuali istruttori, tecnici e altri tess.', normalizedCategory:'wages_squad', amountNative:-3.975802, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.9
    { rawLabel:'Altri salari e stipendi', normalizedCategory:'admin_general_expense', amountNative:-2.907804, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-4.065083, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.97
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.439957, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.96
    { rawLabel:'Indennità fine carriera', normalizedCategory:'wages_squad', amountNative:-0.269914, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.8
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-1.452043, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'Concessioni, marchi, licenze e simili', normalizedCategory:'other_amortisation', amountNative:-3.75, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.97
    { rawLabel:'Amm.to diritti plur. prestazioni calciatori', normalizedCategory:'player_amortisation', amountNative:-111.470646, disclosureLevel:'aggregated' }, // pág. 53, Jev 1
    { rawLabel:'Altre immobilizzazioni immateriali', normalizedCategory:'other_amortisation', amountNative:-0.185386, disclosureLevel:'aggregated' }, // pág. 53, Claude 0.9
    { rawLabel:'Impianti', normalizedCategory:'depreciation', amountNative:-0.026083, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.98
    { rawLabel:'Macchinari', normalizedCategory:'depreciation', amountNative:-0.000433, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.93
    { rawLabel:'Attrezzature', normalizedCategory:'depreciation', amountNative:-0.064089, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.98
    { rawLabel:'Automezzi', normalizedCategory:'depreciation', amountNative:-0.004486, disclosureLevel:'aggregated' }, // pág. 53, Jev 1
    { rawLabel:'Macchine ufficio', normalizedCategory:'depreciation', amountNative:-0.020981, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.94
    { rawLabel:'Mobili e arredi', normalizedCategory:'depreciation', amountNative:-0.035806, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.95
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.2, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.96
    { rawLabel:'d) svalut.dei crediti compresi nel circolante', normalizedCategory:'other_expenses', amountNative:-1.478376, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'11) Variaz. delle riman. mat.prime, sussid., di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.091495, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'a) spese varie organizzazioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.201066, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.419137, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'c) oneri specifici v/squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.389586, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-2.0016, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'e) minus. da cessione diritti plur. alle prest. calciatori', normalizedCategory:'exceptional_items', amountNative:-0.065485, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.096497, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'- indennizzi Lega e Uefa', normalizedCategory:'match_organisation_expense', amountNative:-0.09829, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- rappresentanza e omaggi', normalizedCategory:'admin_general_expense', amountNative:-0.603975, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- diversi', normalizedCategory:'other_expenses', amountNative:-1.312687, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.97
  ],
  2024: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'per materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-10.303501, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'per servizi', normalizedCategory:'admin_general_expense', amountNative:-30.219876, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.96
    { rawLabel:'per godimento beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-7.412806, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-109.087515, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.861, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.672057, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-2.783843, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'a) amm.to delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-74.913174, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.96
    { rawLabel:'b) amm.to delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.121897, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'d) svalut.dei crediti compresi nel circolante', normalizedCategory:'other_expenses', amountNative:-0.370124, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Variaz delle riman. mat.prime, sussid., di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.099458, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'a) spese varie organizzazioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.218268, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.782273, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) oneri specifici visquadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.079927, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-1.013818, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.436089, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.271958, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
  ],
};
const napoliitFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (918.251). oneri finanziari impresos en positivo bajo 17); Totale C (L326) 4.063.075 = 4.981.326 - 918.251 (to-do 155/156, arreglo manual 2026-10-07)
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'napoli-it-bilancio-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:4.063075, tax:-0.758781,
    extraRows: [
      {label:'- altri', value:4.981326},
      {label:'a) utili su cambi', value:0},
      {label:'b) perdite su cambi', value:0},
      {label:'e) altri', value:-0.918251},
      {label:'a) imposte correnti', value:-5.859119},
      {label:'b) imposte relative a esercizi precedenti', value:-1.117363},
      {label:'c) oneri (proventi) da consolidato fiscale', value:14.574172},
      {label:'d) imposte differite', value:-15.489341},
      {label:'e) imposte anticipate', value:7.13287},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:290.860326, officialTotalExpenses:315.481532, officialPAT:-21.382397,
  },
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.063.280). oneri finanziari impresos en positivo bajo 17); Totale C (L290) 7.442.873 (to-do 155/156, arreglo manual 2026-10-07)
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (4.559). perdite su cambi impresas en positivo; Totale 17bis (4.529) (to-do 155/156, arreglo manual 2026-10-07)
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2023. Claude 2026-10-07: es el año "2023" del encabezado de la columna, no un importe
  2024: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'napoli-it-bilancio-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:7.442873, tax:-28.155398,
    extraRows: [
      {label:'- altri', value:8.510682},
      {label:'a) utili su cambi', value:0.00003},
      {label:'e) altri (oneri finanziari)', value:-1.06328},
      {label:'b) perdite su cambi', value:-0.004559},
      {label:'a) imposte correnti', value:-10.138752},
      {label:'b) imposte relative a esercizi precedenti', value:-0.164063},
      {label:'c) oneri (proventi) da consolidato fiscale', value:-17.011456},
      {label:'d) imposte differite', value:-7.180915},
      {label:'e) imposte anticipate', value:6.339788},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:328.190374, officialTotalExpenses:244.448668, officialPAT:63.029181,
  },
};
const napoliitPresupuestoOverlayByYear = {};

const napoliitPasesData = [];
const napoliitResultadosData = {};
const napoliitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['napoli-it'] = {
  revenueLinesByYear: napoliitRevenueLinesByYear, expenseLinesByYear: napoliitExpenseLinesByYear,
  fiscalYearMeta: napoliitFiscalYearMeta, pasesData: napoliitPasesData,
  resultadosData: napoliitResultadosData, titulosData: napoliitTitulosData,
  presupuestoOverlayByYear: napoliitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'napoli-it-bilancio-2025': {
    id:'napoli-it-bilancio-2025', clubId:'napoli-it',
    title:'SSC Napoli S.p.A. — Napoli-bilancio-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'napoli-it-bilancio-2024': {
    id:'napoli-it-bilancio-2024', clubId:'napoli-it',
    title:'SSC Napoli S.p.A. — Napoli-bilancio-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['napoli-it'] = null;

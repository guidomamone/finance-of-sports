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
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AS Roma/AS-Roma-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:28.031802, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:16.434645, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'a) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:21.137526, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'b) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:24.912436, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'c) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:25.621428, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'d) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:90.373519, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'e) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:5.663, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.98
    { rawLabel:'f) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:29.888552, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.99
    { rawLabel:'g) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:13.121622, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.99
    { rawLabel:'h) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:15.056475, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
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
    { rawLabel:'d) Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:13.814, disclosureLevel:'aggregated' }, // pág. 62, precedente
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
    { rawLabel:'Variazione delle rimanenze (reduce costos)', normalizedCategory:'other_income', amountNative:0.082, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.99
    { rawLabel:'Ricavi da gestione dei diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:69.561, disclosureLevel:'aggregated' }, // pág. 119, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AS Roma/AS-Roma-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Ricavi da gare', normalizedCategory:'matchday_competition', amountNative:66.284, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Ricavi delle vendite commerciali e licensing', normalizedCategory:'sponsorship_commercial', amountNative:7.716, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:24.22, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Diritti televisivi e diritti d\'immagine', normalizedCategory:'broadcasting', amountNative:111.919, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Pubblicità', normalizedCategory:'sponsorship_commercial', amountNative:11.395, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Altri', normalizedCategory:'other_income', amountNative:11.219, disclosureLevel:'aggregated' }, // pág. 64, Jev 0.99
    { rawLabel:'Ricavi da gestione dei diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:148.262, disclosureLevel:'aggregated' }, // pág. 64, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AS Roma/AS-Roma-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:33.377286, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:15.866698, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'2) variazioni delle rimanenze di prodotti finiti', normalizedCategory:'other_income', amountNative:0.252067, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'a) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:10.95, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:15.821559, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:21.824255, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:109.325538, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:3.416157, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'f) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:47.131792, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'g) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:5.563399, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'h) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:13.527844, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AS Roma/AS-Roma-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:39.174069, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:16.290643, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'2) variazioni delle rimanenze di prodotti finiti', normalizedCategory:'other_income', amountNative:1.834252, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'a) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:18.399384, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'b) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:24.743181, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'c) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:26.864751, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'d) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:104.146581, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'e) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:1.565535, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'f) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:25.046418, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'g) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:21.038216, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'h) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:22.613434, disclosureLevel:'aggregated' }, // pág. 23, precedente
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
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Indumenti sportivi e divise ufficiale', normalizedCategory:'admin_general_expense', amountNative:-1.75, disclosureLevel:'aggregated' }, // pág. 50, Claude 0.88
    { rawLabel:'Materiali di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.984, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.98
    { rawLabel:'Beni e prodotti da commercializzare', normalizedCategory:'other_expenses', amountNative:-10.179, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.252, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-7.192, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-6.758, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi di vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-3.329, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-8.423, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-22.871, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Spese di pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-5.196, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Centro sportivo di Trigoria', normalizedCategory:'match_organisation_expense', amountNative:-2.7, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Stadio Olimpico', normalizedCategory:'match_organisation_expense', amountNative:-4.026, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Altre sedi', normalizedCategory:'admin_general_expense', amountNative:-3.018, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Beni', normalizedCategory:'admin_general_expense', amountNative:-4.051, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Calciatori e calciatrici', normalizedCategory:'wages_squad', amountNative:-112.903, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.99
    { rawLabel:'Staff Tecnico', normalizedCategory:'wages_squad', amountNative:-15.494, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.98
    { rawLabel:'Dipendenti e dirigenti', normalizedCategory:'admin_general_expense', amountNative:-12.64, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-9.77567, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.914402, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.95
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-1.006119, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'Ammortamento DPS Calciatori', normalizedCategory:'player_amortisation', amountNative:-45.5, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Ammortamento DPS Calciatrici', normalizedCategory:'player_amortisation', amountNative:-0.054, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.85
    { rawLabel:'Ammortamento altre immob. Immateriali', normalizedCategory:'other_amortisation', amountNative:-0.952, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.8
    { rawLabel:'b) ammortamenti immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-4.865562, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'d) svalutazioni dei crediti dell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.829513, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'11) variazioni delle rimanenze di prodotti finiti', normalizedCategory:'other_expenses', amountNative:1.548221, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-7.008318, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.93, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.99
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-3.259849, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.99
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-6.233958, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.312, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Biglietti trasferte', normalizedCategory:'match_organisation_expense', amountNative:-0.329, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
    { rawLabel:'Oneri lega', normalizedCategory:'match_organisation_expense', amountNative:-0.905, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.91
    { rawLabel:'Multe', normalizedCategory:'other_expenses', amountNative:-0.331, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.797, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-0.979, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
  ],
  2018: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Indumenti sportivi e materiale tecnico', normalizedCategory:'admin_general_expense', amountNative:-2.267, disclosureLevel:'aggregated' }, // pág. 113, precedente
    { rawLabel:'Divise sociali ed altri beni', normalizedCategory:'admin_general_expense', amountNative:-0.405, disclosureLevel:'aggregated' }, // pág. 113, precedente
    { rawLabel:'Beni e prodotti da commercializzare', normalizedCategory:'other_expenses', amountNative:-3.504, disclosureLevel:'aggregated' }, // pág. 113, precedente
    { rawLabel:'Materiale vario di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.786, disclosureLevel:'aggregated' }, // pág. 113, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.542, disclosureLevel:'aggregated' }, // pág. 114, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-5.641, disclosureLevel:'aggregated' }, // pág. 114, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-6.336, disclosureLevel:'aggregated' }, // pág. 114, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione e trasferte', normalizedCategory:'match_organisation_expense', amountNative:-2.254, disclosureLevel:'aggregated' }, // pág. 114, Jev 1
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-5.865, disclosureLevel:'aggregated' }, // pág. 114, precedente
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
    { rawLabel:'Spese di pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-5.752, disclosureLevel:'aggregated' }, // pág. 114, precedente
    { rawLabel:'Spese per godimento beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-10.671, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-150.958, disclosureLevel:'aggregated' }, // pág. 117, Jev 0.98
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-6.452, disclosureLevel:'aggregated' }, // pág. 117, precedente
    { rawLabel:'T.F.R.', normalizedCategory:'wages_squad', amountNative:-0.932, disclosureLevel:'aggregated' }, // pág. 117, precedente
    { rawLabel:'Altri costi (Faifc)', normalizedCategory:'other_expenses', amountNative:-0.498, disclosureLevel:'aggregated' }, // pág. 117, precedente
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.979, disclosureLevel:'aggregated' }, // pág. 118, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.107, disclosureLevel:'aggregated' }, // pág. 118, precedente
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
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.546, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Oneri da gestione dei diritti pluriennali prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-23.639, disclosureLevel:'aggregated' }, // pág. 119, precedente
  ],
  2019: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisti materie di consumo', normalizedCategory:'admin_general_expense', amountNative:-7.195, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_expenses', amountNative:0.163, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Spese per servizi', normalizedCategory:'admin_general_expense', amountNative:-54.784, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Spese per godimento beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-10.866, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Spese per il personale', normalizedCategory:'wages_squad', amountNative:-184.42, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-7.367, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Ammortamenti e svalutazioni', normalizedCategory:'player_amortisation', amountNative:-87.412, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Oneri da gestione dei diritti pluriennali prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-15.934, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.6, disclosureLevel:'aggregated' }, // pág. 64, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Indumenti sportivi e divise ufficiale', normalizedCategory:'admin_general_expense', amountNative:-2.792, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Materiali di consumo', normalizedCategory:'admin_general_expense', amountNative:-1.438, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Beni e prodotti da commercializzare', normalizedCategory:'other_expenses', amountNative:-9.7, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-2.306, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-9.338, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-8.288, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costi di vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-4.555, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-8.19, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-25.691, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Spese di pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-7.231, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Centro sportivo di Trigoria', normalizedCategory:'match_organisation_expense', amountNative:-2.7, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Stadio Olimpico', normalizedCategory:'match_organisation_expense', amountNative:-3.928, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Altre sedi', normalizedCategory:'admin_general_expense', amountNative:-3.295, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Beni', normalizedCategory:'admin_general_expense', amountNative:-4.588, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Calciatori e calciatrici', normalizedCategory:'wages_squad', amountNative:-125.983, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Staff Tecnico', normalizedCategory:'wages_squad', amountNative:-17.967, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Dipendenti e dirigenti', normalizedCategory:'admin_general_expense', amountNative:-17.787, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-9.388237, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.211118, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-0.748489, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Ammortamento DPS Calciatori', normalizedCategory:'player_amortisation', amountNative:-55.645, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Ammortamento altre immob. Immateriali', normalizedCategory:'other_amortisation', amountNative:-0.546, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'b) ammortamenti immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-3.92308, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.96
    { rawLabel:'d) svalutazioni dei crediti dell\'attive circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.491626, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.058728, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-1.415828, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.010429, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-9.942395, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.325, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Biglietti trasferte', normalizedCategory:'match_organisation_expense', amountNative:-0.394, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Oneri lega', normalizedCategory:'match_organisation_expense', amountNative:-1.68, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Multe', normalizedCategory:'other_expenses', amountNative:-2.606, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Produzione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.007, disclosureLevel:'aggregated' }, // pág. 62, Jev 1
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.825, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-2.783, disclosureLevel:'aggregated' }, // pág. 62, precedente
  ],
  2024: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Indumenti sportivi e divise ufficiale', normalizedCategory:'admin_general_expense', amountNative:-3.367, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Materiali di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.987, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Beni e prodotti da commercializzare', normalizedCategory:'other_expenses', amountNative:-12.549, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.799, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-6.734, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-8.54, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi di vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-3.743, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-8.216, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-24.163, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Spese di pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-5.045, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Centro sportivo di Trigoria', normalizedCategory:'match_organisation_expense', amountNative:-2.7, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Stadio Olimpico', normalizedCategory:'match_organisation_expense', amountNative:-4.166, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Altre sedi', normalizedCategory:'admin_general_expense', amountNative:-3.516, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Beni', normalizedCategory:'admin_general_expense', amountNative:-4.07, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-189.464635, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-10.603306, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.890082, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'d) trattamento di quiescenza e simili', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'aggregated' }, // pág. 23, Claude 0.8
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-1.168195, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Ammortamento DPS Calciatori', normalizedCategory:'player_amortisation', amountNative:-38.079, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Ammortamento DPS Calciatrici', normalizedCategory:'player_amortisation', amountNative:-0.029, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Ammortamento altre immob. Immateriali', normalizedCategory:'other_amortisation', amountNative:-0.951, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'b) ammortamenti immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-4.546359, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'d) svalutazioni dei crediti dell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.287125, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-4.956295, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-10.082075, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-1.135911, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-7.880849, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.572815, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
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
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2025-06-30. Claude 2026-10-07: es el BILANCIO 2024-25 (cierre 30/06/2025); periodo.mjs lo leyó como 2024-06-30 (confianza media, el nombre no coincide) y extraer tomó la columna comparativa
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'asroma-it-bilancio-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-13.937648, tax:-4.985606,
    extraRows: [
      {label:'16) altri proventi finanziari', value:4.359403},
      {label:'e) altri interessi e oneri finanziari', value:-17.954026},
      {label:'17 bis) utile e perdite su cambi', value:-0.343025},
      {label:'a) imposte correnti', value:-11.367144},
      {label:'c) imposte differite', value:-0.019536},
      {label:'e) proventi (oneri) da adesione al regime di consolidato fiscale', value:6.401074},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:270.241005, officialTotalExpenses:301.143321, officialPAT:-53.884213,
  },
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 225. el resultado impreso es el del Gruppo (25.498); el consolidado (25.723) incluye la pérdida de terzi; se suma del lado financiero para no inflar ingresos (to-do 155/156, arreglo manual 2026-10-07)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. el total se contaba como una línea más; los costos son sus renglones + Ammortamenti (L1920) y Accantonamenti (L1921), impresos fuera del total (to-do 156, arreglo manual 2026-10-07)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 82. la variación de existencias (82) reduce costos; los gastos se toman en valor absoluto, así que va del lado de ingresos con el mismo efecto en el resultado (arreglo manual 2026-10-07; to-do 156)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 69.561. Guido 2026-10-07: gestión de jugadores en bruto (Proventi de la nota 30), como 2019, 2022 y 2025
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (23.639). Guido 2026-10-07: gestión de jugadores en bruto (Oneri de la nota 30)
  2018: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
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
    officialTotalRevenue:320.509, officialTotalExpenses:313.435, officialPAT:-25.498,
  },
  2019: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'asroma-it-bilancio-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-28.092, tax:-8.964,
    extraRows: [
      {label:'Proventi finanziari', value:2.614},
      {label:'Oneri finanziari', value:-30.706},
      {label:'Imposte correnti', value:-8.921},
      {label:'Imposte differite', value:-0.043},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:381.015, officialTotalExpenses:368.415, officialPAT:-24.456,
  },
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'asroma-it-bilancio-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-27.578385, tax:-3.446901,
    extraRows: [
      {label:'16) altri proventi finanziari', value:1.169325},
      {label:'a) verso imprese controllate', value:null},
      {label:'b) verso imprese collegate', value:null},
      {label:'c) verso imprese controllanti', value:null},
      {label:'d) verso imprese sottoposte al controllo delle controllanti', value:null},
      {label:'e) altri interessi e oneri finanziari', value:-28.740257},
      {label:'17 bis) utile e perdite su cambi', value:-0.007453},
      {label:'a) imposte correnti', value:-5.847725},
      {label:'c) imposte differite', value:-0.700215},
      {label:'e) proventi (oneri) da adesione al regime di consolidato fiscale', value:3.101039},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:277.056595, officialTotalExpenses:347.942501, officialPAT:-102.747288,
  },
  2024: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'asroma-it-bilancio-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-11.060677, tax:-5.778058,
    extraRows: [
      {label:'16) altri proventi finanziari', value:6.045982},
      {label:'17) interessi ed altri oneri finanziari', value:-17.104753},
      {label:'17 bis) utile e perdite su cambi', value:-0.001906},
      {label:'20) imposte sul reddito dell\'esercizio', value:-5.778058},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:301.716464, officialTotalExpenses:365.105736, officialPAT:-81.364367,
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
  'asroma-it-bilancio-2025': {
    id:'asroma-it-bilancio-2025', clubId:'asroma-it',
    title:'A.S. Roma S.r.l. — AS-Roma-bilancio-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/AS Roma/AS-Roma-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'asroma-it-bilancio-2019': {
    id:'asroma-it-bilancio-2019', clubId:'asroma-it',
    title:'A.S. Roma S.r.l. — AS-Roma-bilancio-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AS Roma/AS-Roma-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'asroma-it-bilancio-2023': {
    id:'asroma-it-bilancio-2023', clubId:'asroma-it',
    title:'A.S. Roma S.r.l. — AS-Roma-bilancio-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AS Roma/AS-Roma-bilancio-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'asroma-it-bilancio-2024': {
    id:'asroma-it-bilancio-2024', clubId:'asroma-it',
    title:'A.S. Roma S.r.l. — AS-Roma-bilancio-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AS Roma/AS-Roma-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['asroma-it'] = null;

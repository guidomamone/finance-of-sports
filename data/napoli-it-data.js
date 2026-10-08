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
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Napoli/Napoli-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:21.167284, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.240938, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'- Gare Coppe Internazionali', normalizedCategory:'matchday_competition', amountNative:12.508187, disclosureLevel:'aggregated' }, // pág. 43, Claude 0.93
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:3.214768, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'- Gare Coppe Internazionali', normalizedCategory:'matchday_competition', amountNative:0.311252, disclosureLevel:'aggregated' }, // pág. 43, Claude 0.93
    { rawLabel:'d) altri ricavi da gare', normalizedCategory:'matchday_competition', amountNative:0.456563, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.507143, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Sponsor ufficiali', normalizedCategory:'sponsorship_commercial', amountNative:0.914218, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Sponsor tecnico', normalizedCategory:'sponsorship_commercial', amountNative:0.1, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Sponsor istituzionali', normalizedCategory:'sponsorship_commercial', amountNative:5.591667, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Fornitori ufficiali e tecnici', normalizedCategory:'sponsorship_commercial', amountNative:0.783664, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Partner commerciali', normalizedCategory:'sponsorship_commercial', amountNative:0.469247, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'Altre sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:7.364963, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Regional Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:2.6375, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Global Partner', normalizedCategory:'sponsorship_commercial', amountNative:12.127573, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Principal Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:4.5, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Officile Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:3.545, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Local Partner', normalizedCategory:'sponsorship_commercial', amountNative:1.563634, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Business Partner', normalizedCategory:'sponsorship_commercial', amountNative:2.626562, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.094, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Proventi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:14.713799, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Proventi da licensing', normalizedCategory:'sponsorship_commercial', amountNative:1.502491, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Altri proventi commerciali', normalizedCategory:'sponsorship_commercial', amountNative:0.1172, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Proventi televisivi', normalizedCategory:'broadcasting', amountNative:78.779898, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'Proventi televisivi da competizione Uefa', normalizedCategory:'broadcasting', amountNative:76.673, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi televisivi gare amichevoli', normalizedCategory:'broadcasting', amountNative:0.377238, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri Proventi TV', normalizedCategory:'broadcasting', amountNative:5.15, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi radiofonici', normalizedCategory:'broadcasting', amountNative:0.44, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi sfruttamento diritti d\'immagine', normalizedCategory:'sponsorship_commercial', amountNative:0.973, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'g) ricavi per cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:2.625, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'h) plusvalenza da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:79.641174, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:1.943157, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'- proventi da enti federali (L.N.P.)', normalizedCategory:'other_income', amountNative:0.4097, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- proventi produzioni televisive', normalizedCategory:'broadcasting', amountNative:1.507922, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- altri ricavi', normalizedCategory:'other_income', amountNative:13.686612, disclosureLevel:'aggregated' }, // pág. 47, precedente
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Napoli/Napoli-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'a) ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) altri ricavi da gare', normalizedCategory:'matchday_competition', amountNative:0.039148, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Contributi federali', normalizedCategory:'other_income', amountNative:0.015, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.99
    { rawLabel:'Contributo canoni locazione', normalizedCategory:'other_income', amountNative:0.01675, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.98
    { rawLabel:'Contributi Investimenti Pubblicitari', normalizedCategory:'other_income', amountNative:0.003828, disclosureLevel:'aggregated' }, // pág. 44, Claude 0.8
    { rawLabel:'Contributi a fondo perduto - COVID', normalizedCategory:'other_income', amountNative:0.15, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Contributi per sanificazione e D.P.I.', normalizedCategory:'other_income', amountNative:0.028297, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Sponsor ufficiali', normalizedCategory:'sponsorship_commercial', amountNative:9.15217, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Sponsor tecnico', normalizedCategory:'sponsorship_commercial', amountNative:3.839143, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Sponsor istituzionali', normalizedCategory:'sponsorship_commercial', amountNative:10.684791, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Partner commerciali', normalizedCategory:'sponsorship_commercial', amountNative:3.065009, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'Altre sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:5.055461, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Regional Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:0.631579, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.117455, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Proventi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:3.33477, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi da licensing', normalizedCategory:'sponsorship_commercial', amountNative:2.73104, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri proventi commerciali', normalizedCategory:'sponsorship_commercial', amountNative:0.13478, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi televisivi', normalizedCategory:'broadcasting', amountNative:100.44614, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'Proventi televisivi da competizione Uefa', normalizedCategory:'broadcasting', amountNative:17.797225, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi televisivi gare amichevoli', normalizedCategory:'broadcasting', amountNative:0.102329, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri Proventi TV', normalizedCategory:'broadcasting', amountNative:5.35, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Proventi radiofonici', normalizedCategory:'broadcasting', amountNative:0.585105, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Proventi sfruttamento diritti d\'immagine', normalizedCategory:'sponsorship_commercial', amountNative:0.997903, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'g) ricavi per cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:4.817629, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'h) plusvalenza da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:48.743167, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.078183, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'- proventi da enti federali (L.N.P.)', normalizedCategory:'other_income', amountNative:3.594329, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'- proventi produzioni televisive', normalizedCategory:'broadcasting', amountNative:1.699338, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'- rilascio fondo rischi', normalizedCategory:'other_income', amountNative:3.420415, disclosureLevel:'aggregated' }, // pág. 48, Jev 0.99
    { rawLabel:'- partecipazione gare amichevoli', normalizedCategory:'matchday_competition', amountNative:0.04, disclosureLevel:'aggregated' }, // pág. 48, ? 0.75
    { rawLabel:'- altri ricavi', normalizedCategory:'other_income', amountNative:1.426863, disclosureLevel:'aggregated' }, // pág. 48, precedente
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Napoli/Napoli-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'a) ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:12.005646, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:0.041078, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) altri ricavi da gare', normalizedCategory:'matchday_competition', amountNative:0.062598, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Sponsor ufficiali', normalizedCategory:'sponsorship_commercial', amountNative:10.86523, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Sponsor tecnico', normalizedCategory:'sponsorship_commercial', amountNative:0.1, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Sponsor istituzionali', normalizedCategory:'sponsorship_commercial', amountNative:8.071667, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Fornitori ufficiali e tecnici', normalizedCategory:'sponsorship_commercial', amountNative:0.782664, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Partner commerciali', normalizedCategory:'sponsorship_commercial', amountNative:3.625781, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Altre sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:6.563401, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Regional Sponsor', normalizedCategory:'sponsorship_commercial', amountNative:0.550736, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.1435, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Proventi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:5.893826, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi da licensing', normalizedCategory:'sponsorship_commercial', amountNative:0.591236, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Altri proventi commerciali', normalizedCategory:'sponsorship_commercial', amountNative:0.083511, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi televisivi', normalizedCategory:'broadcasting', amountNative:68.167059, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi televisivi da competizione Uefa', normalizedCategory:'broadcasting', amountNative:16.547817, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi televisivi gare amichevoli', normalizedCategory:'broadcasting', amountNative:0.132869, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Altri Proventi TV', normalizedCategory:'broadcasting', amountNative:5, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi radiofonici', normalizedCategory:'broadcasting', amountNative:0.488, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi sfruttamento diritti d\'immagine', normalizedCategory:'sponsorship_commercial', amountNative:1.38925, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'g) ricavi per cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:8.65654, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Valore di realizzo', normalizedCategory:'player_sales', amountNative:7.792704, disclosureLevel:'aggregated' }, // pág. 49, Claude 0.8
    { rawLabel:'Sell on Fee', normalizedCategory:'player_sales', amountNative:3.00015, disclosureLevel:'aggregated' }, // pág. 49, Claude 0.85
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.072099, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:12.367747, disclosureLevel:'aggregated' }, // pág. 6, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Napoli/Napoli-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'a) ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:11.855797, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) percentuale su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:0.198725, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:3.818023, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:36.709282, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.24805, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:4.24878, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'e) proventi da cessioni diritti televisivi', normalizedCategory:'broadcasting', amountNative:142.848552, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:1.622961, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'g) ricavi per cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:6.055081, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'h) plusvalenza da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:83.228609, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:4.785602, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:4.242719, disclosureLevel:'aggregated' }, // pág. 6, precedente
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
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisto materiale sportivo', normalizedCategory:'other_expenses', amountNative:-0.407339, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Acquisto materiale indumenti', normalizedCategory:'admin_general_expense', amountNative:-1.13112, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Acquisto materiale di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.503847, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Acquisto materiale di cancelleria e stampati', normalizedCategory:'admin_general_expense', amountNative:-0.020416, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.082387, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Beni destinati alla rivendita', normalizedCategory:'admin_general_expense', amountNative:-4.338099, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi per tesserati ed attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.524872, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.408892, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-8.181879, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.113258, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Servizio biglietteria e controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-3.59235, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.098303, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Compensi Amministratori', normalizedCategory:'admin_general_expense', amountNative:-2.506274, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-5.184261, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.977992, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Locazioni operative', normalizedCategory:'admin_general_expense', amountNative:-2.757349, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Affitto centro tecnico, campi sportivi e canone concessione stadio', normalizedCategory:'match_organisation_expense', amountNative:-1.305411, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Altri costi per godimento beni terzi', normalizedCategory:'admin_general_expense', amountNative:-0.585712, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Compensi contrattuali calciatori', normalizedCategory:'wages_squad', amountNative:-89.733513, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Quota variabile retrib. calc. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-4.034984, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Compensi contrattuali allenatori', normalizedCategory:'wages_squad', amountNative:-7.222093, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Quota variabile retrib. allen. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-0.88289, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Compensi contrattuali istruttori, tecnici e altri tess.', normalizedCategory:'wages_squad', amountNative:-3.912648, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Altri salari e stipendi', normalizedCategory:'admin_general_expense', amountNative:-2.058656, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.547054, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.42953, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Indennità fine carriera', normalizedCategory:'wages_squad', amountNative:-0.246874, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-0.193519, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Concessioni, marchi, licenze e simili', normalizedCategory:'other_amortisation', amountNative:-3.75, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Amm.to diritti plur. prestazioni calciatori', normalizedCategory:'player_amortisation', amountNative:-78.33044, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Altre immobilizzazioni immateriali', normalizedCategory:'other_amortisation', amountNative:-0.393369, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Impianti', normalizedCategory:'depreciation', amountNative:-0.003255, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Macchinari', normalizedCategory:'depreciation', amountNative:-0.000137, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Attrezzature', normalizedCategory:'depreciation', amountNative:-0.062048, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Automezzi', normalizedCategory:'depreciation', amountNative:-0.008973, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Macchine ufficio', normalizedCategory:'depreciation', amountNative:-0.019475, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Mobili e arredi', normalizedCategory:'depreciation', amountNative:-0.028119, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.1398, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) svalut.dei crediti compresi nel circolante', normalizedCategory:'other_expenses', amountNative:-2.69407, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'11) Variaz. delle riman. mat.prime, sussid., di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.030136, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.419965, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) oneri specifici v/squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.099018, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-3.60316, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'e) minus. da cessione diritti plur. alle prest. calciatori', normalizedCategory:'exceptional_items', amountNative:-0.0051, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-4.131986, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'- indennizzi Lega e Uefa', normalizedCategory:'match_organisation_expense', amountNative:-0.12755, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- rappresentanza e omaggi', normalizedCategory:'admin_general_expense', amountNative:-0.629955, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- diversi', normalizedCategory:'other_expenses', amountNative:-0.10185, disclosureLevel:'aggregated' }, // pág. 54, precedente
  ],
  2021: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisto materiale sportivo', normalizedCategory:'other_expenses', amountNative:-0.051707, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Acquisto materiale indumenti', normalizedCategory:'admin_general_expense', amountNative:-2.328067, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Acquisto materiale di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.319092, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Acquisto materiale di cancelleria e stampati', normalizedCategory:'admin_general_expense', amountNative:-0.065089, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.05539, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Beni destinati alla rivendita', normalizedCategory:'admin_general_expense', amountNative:-1.58093, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per tesserati ed attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.854628, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.852483, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-12.915281, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.629831, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Servizio biglietteria e controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.784433, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.112028, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Compensi Amministratori', normalizedCategory:'admin_general_expense', amountNative:-2.2506, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-3.206966, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.717276, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Locazioni operative', normalizedCategory:'admin_general_expense', amountNative:-2.68463, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Affitto centro tecnico, campi sportivi e canone concessione stadio', normalizedCategory:'match_organisation_expense', amountNative:-1.325411, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Altri costi per godimento beni terzi', normalizedCategory:'admin_general_expense', amountNative:-0.172793, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Compensi contrattuali calciatori', normalizedCategory:'wages_squad', amountNative:-134.732022, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Quota variabile retrib. calc. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-6.018133, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Compensi contrattuali allenatori', normalizedCategory:'wages_squad', amountNative:-4.341274, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Quota variabile retrib. allen. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-0.009923, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Compensi contrattuali istruttori, tecnici e altri tess.', normalizedCategory:'wages_squad', amountNative:-4.283638, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Altri salari e stipendi', normalizedCategory:'admin_general_expense', amountNative:-1.30148, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.201352, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.39824, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Indennità fine carriera', normalizedCategory:'wages_squad', amountNative:-0.230569, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-1.036194, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Amm.to diritti plur. prestazioni calciatori', normalizedCategory:'player_amortisation', amountNative:-111.406313, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Altre immobilizzazioni immateriali', normalizedCategory:'other_amortisation', amountNative:-0.359087, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Impianti', normalizedCategory:'depreciation', amountNative:-0.04335, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Macchinari', normalizedCategory:'depreciation', amountNative:-0.000652, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Attrezzature', normalizedCategory:'depreciation', amountNative:-0.060892, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Automezzi', normalizedCategory:'depreciation', amountNative:-0.004486, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Macchine ufficio', normalizedCategory:'depreciation', amountNative:-0.015125, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Mobili e arredi', normalizedCategory:'depreciation', amountNative:-0.031705, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.11, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Crediti iscritti nell\'attivo circolante vs Clienti', normalizedCategory:'other_expenses', amountNative:-0.689934, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.98
    { rawLabel:'Crediti iscritti nell\'attivo circolante vs Club Esteri', normalizedCategory:'other_expenses', amountNative:-0.55, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.92
    { rawLabel:'Variaz. delle riman. mat.prime, sussid., di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.053458, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.711028, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) oneri specifici v/squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-1.758, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'e) minus. da cessione diritti plur. alle prest. calciatori', normalizedCategory:'exceptional_items', amountNative:-1.1035, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-3.372871, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'- indennizzi Lega e Uefa', normalizedCategory:'match_organisation_expense', amountNative:-0.03626, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'- rappresentanza e omaggi', normalizedCategory:'admin_general_expense', amountNative:-0.371994, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'- diversi', normalizedCategory:'other_expenses', amountNative:-0.612473, disclosureLevel:'aggregated' }, // pág. 55, precedente
  ],
  2022: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisto materiale sportivo', normalizedCategory:'other_expenses', amountNative:-0.250994, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Acquisto materiale indumenti', normalizedCategory:'admin_general_expense', amountNative:-1.574065, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Acquisto materiale di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.363071, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Acquisto materiale di cancelleria e stampati', normalizedCategory:'admin_general_expense', amountNative:-0.054633, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.075942, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Beni destinati alla rivendita', normalizedCategory:'admin_general_expense', amountNative:-2.01336, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi per tesserati ed attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.543303, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.171648, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-4.742827, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.578948, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Servizio biglietteria e controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-2.039291, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.110215, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Compensi Amministratori', normalizedCategory:'admin_general_expense', amountNative:-2.3546, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-4.372546, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.758666, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Locazioni operative', normalizedCategory:'admin_general_expense', amountNative:-2.158076, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Affitto centro tecnico, campi sportivi e canone concessione stadio', normalizedCategory:'match_organisation_expense', amountNative:-1.300411, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Altri costi per godimento beni terzi', normalizedCategory:'admin_general_expense', amountNative:-0.39416, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Compensi contrattuali calciatori', normalizedCategory:'wages_squad', amountNative:-109.690271, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Quota variabile retrib. calc. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-3.588172, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Compensi contrattuali allenatori', normalizedCategory:'wages_squad', amountNative:-6.638111, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Quota variabile retrib. allen. legata ai risultati sportivi', normalizedCategory:'wages_squad', amountNative:-0.499712, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Compensi contrattuali istruttori, tecnici e altri tess.', normalizedCategory:'wages_squad', amountNative:-4.981226, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Altri salari e stipendi', normalizedCategory:'admin_general_expense', amountNative:-1.646801, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.131331, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.403405, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Indennità fine carriera', normalizedCategory:'wages_squad', amountNative:-0.220322, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-0.553451, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Concessioni, marchi, licenze e simili', normalizedCategory:'other_amortisation', amountNative:-3.75, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Amm.to diritti plur. prestazioni calciatori', normalizedCategory:'player_amortisation', amountNative:-70.579676, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Altre immobilizzazioni immateriali', normalizedCategory:'other_amortisation', amountNative:-0.359132, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Impianti', normalizedCategory:'depreciation', amountNative:-0.037291, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Macchinari', normalizedCategory:'depreciation', amountNative:-0.000389, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Attrezzature', normalizedCategory:'depreciation', amountNative:-0.062424, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Automezzi', normalizedCategory:'depreciation', amountNative:-0.008973, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Macchine ufficio', normalizedCategory:'depreciation', amountNative:-0.017481, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Mobili e arredi', normalizedCategory:'depreciation', amountNative:-0.029501, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) svalut.dei crediti compresi nel circolante', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'11) Variaz delle riman. mat.prime, sussid., di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.439846, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.429367, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) oneri specifici v/squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.008249, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-2.305, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'e) minus. da cessione diritti plur. alle prest. calciatori', normalizedCategory:'exceptional_items', amountNative:-6.892, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.530475, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.391847, disclosureLevel:'aggregated' }, // pág. 6, precedente
  ],
  2019: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-4.084446, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'7) per servizi', normalizedCategory:'admin_general_expense', amountNative:-20.407012, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'8) per godimento beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-4.228235, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-131.33975, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.31681, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.561757, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-0.923922, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'a) amm.to delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-82.138679, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) amm.to delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.129912, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) svalut.dei crediti compresi nel circolante', normalizedCategory:'other_expenses', amountNative:-2.244905, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'11) Variaz. delle riman. mat.prime, sussid., di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.160801, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.407223, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'c) oneri specifici v/squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.034602, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.071237, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'e) minus. da cessione diritti plur. alle prest. calciatori', normalizedCategory:'exceptional_items', amountNative:-0.0024, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-2.111594, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.175201, disclosureLevel:'aggregated' }, // pág. 6, precedente
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
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (212). perdite su cambi impresas en positivo; Totale 17bis 3.287 = 3.499 - 212 (patrón to-do 155 igual que Napoli 2024)
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'napoli-it-bilancio-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:1.101112, tax:-38.105457,
    extraRows: [
      {label:'- altri', value:2.300194},
      {label:'e) altri', value:-1.202369},
      {label:'a) utili su cambi', value:0.003499},
      {label:'b) perdite su cambi', value:-0.000212},
      {label:'a) imposte correnti', value:-11.542101},
      {label:'b) imposte relative a esercizi precedenti', value:0.004186},
      {label:'c) oneri (proventi) da consolidato fiscale', value:-16.680415},
      {label:'d) imposte differite', value:-15.855455},
      {label:'e) imposte anticipate', value:5.968328},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:359.264354, officialTotalExpenses:242.559928, officialPAT:79.700081,
  },
  2021: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'napoli-it-bilancio-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.597734, tax:19.006326,
    extraRows: [
      {label:'- altri', value:0.649163},
      {label:'e) altri', value:-0.047765},
      {label:'a) utili su cambi', value:0.000138},
      {label:'b) perdite su cambi', value:-0.003802},
      {label:'a) imposte correnti', value:-3.713189},
      {label:'b) imposte relative a esercizi precedenti', value:2.541673},
      {label:'c) oneri (proventi) da consolidato fiscale', value:1.932616},
      {label:'d) imposte differite', value:-4.927366},
      {label:'e) imposte anticipate', value:23.172592},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:228.097847, officialTotalExpenses:305.540172, officialPAT:-58.941765,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (6.136). perdite su cambi impresas en positivo; Totale 17bis 6.743 = 12.879 - 6.136 (patrón to-do 155)
  2022: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'napoli-it-bilancio-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.396221, tax:13.621427,
    extraRows: [
      {label:'- altri', value:0.000973},
      {label:'e) altri', value:-0.403937},
      {label:'a) utili su cambi', value:0.012879},
      {label:'b) perdite su cambi', value:-0.006136},
      {label:'a) imposte correnti', value:-3.226666},
      {label:'b) imposte relative a esercizi precedenti', value:0.233857},
      {label:'c) oneri (proventi) da consolidato fiscale', value:6.623853},
      {label:'d) imposte differite', value:-0.538566},
      {label:'e) imposte anticipate', value:10.528949},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:175.995109, officialTotalExpenses:234.279517, officialPAT:-51.951202,
  },
  2019: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'napoli-it-bilancio-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.001438, tax:-18.682901,
    extraRows: [
      {label:'- altri', value:0.001113},
      {label:'e) altri', value:-0.003227},
      {label:'a) utili su cambi', value:0.004113},
      {label:'b) perdite su cambi', value:-0.000561},
      {label:'a) imposte correnti', value:-9.194163},
      {label:'b) imposte relative a esercizi precedenti', value:0.729207},
      {label:'c) oneri (proventi) da consolidato fiscale', value:-2.017882},
      {label:'d) imposte differite', value:-16.186023},
      {label:'e) imposte anticipate', value:7.98596},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:299.862181, officialTotalExpenses:252.016884, officialPAT:29.163834,
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
  'napoli-it-bilancio-2023': {
    id:'napoli-it-bilancio-2023', clubId:'napoli-it',
    title:'SSC Napoli S.p.A. — Napoli-bilancio-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'napoli-it-bilancio-2021': {
    id:'napoli-it-bilancio-2021', clubId:'napoli-it',
    title:'SSC Napoli S.p.A. — Napoli-bilancio-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'napoli-it-bilancio-2022': {
    id:'napoli-it-bilancio-2022', clubId:'napoli-it',
    title:'SSC Napoli S.p.A. — Napoli-bilancio-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'napoli-it-bilancio-2019': {
    id:'napoli-it-bilancio-2019', clubId:'napoli-it',
    title:'SSC Napoli S.p.A. — Napoli-bilancio-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['napoli-it'] = null;

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
  // 2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:16.48, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
    { rawLabel:'- Gare Tim Cup', normalizedCategory:'matchday_competition', amountNative:1.525, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.98
    { rawLabel:'- Gare Coppe Internazionali', normalizedCategory:'matchday_competition', amountNative:6.945, disclosureLevel:'aggregated' }, // pág. 49, Claude 0.95
    { rawLabel:'- Tomei e amichevoli', normalizedCategory:'matchday_competition', amountNative:2.624, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.98
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:16.802772, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'- Quote Inter Club/Tessere del tifoso', normalizedCategory:'member_dues', amountNative:2.446, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'- Sponsorship EU in house', normalizedCategory:'sponsorship_commercial', amountNative:9.508, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.98
    { rawLabel:'- Sponsorship Regional', normalizedCategory:'sponsorship_commercial', amountNative:43.775, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'- Sponsorship Global', normalizedCategory:'sponsorship_commercial', amountNative:2.418, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'- Archivio Rai/Infront', normalizedCategory:'broadcasting', amountNative:10.424, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.9
    { rawLabel:'- Inter Tv', normalizedCategory:'broadcasting', amountNative:5.621, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.97
    { rawLabel:'- Diversi', normalizedCategory:'other_income', amountNative:0.296, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'4) Capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:8.634746, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.93
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:4.652909, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.97
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:22.154411, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:2.711111, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.537309, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'- proventi televisivi', normalizedCategory:'broadcasting', amountNative:69.755258, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'- proventi televisivi da partecip. a compet. UEFA', normalizedCategory:'broadcasting', amountNative:45.603, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.97
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciat.', normalizedCategory:'player_sales', amountNative:5.515267, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.97
    { rawLabel:'h) plusvalenze da cessione dir. plur. prest. calciatori', normalizedCategory:'player_sales', amountNative:61.546275, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.925553, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.92
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:26.469549, disclosureLevel:'aggregated' }, // pág. 16, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:17.367, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Gare Tim Cup', normalizedCategory:'matchday_competition', amountNative:0.177, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Gare Coppe Internazionali', normalizedCategory:'matchday_competition', amountNative:7.211, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Tomei e amichevoli', normalizedCategory:'matchday_competition', amountNative:1.357, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'b) percentuale su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.98
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:18.563663, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'- Quote Inter Club/Tessere del tifoso', normalizedCategory:'member_dues', amountNative:2.229, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Sponsorship EU/ex Infront', normalizedCategory:'sponsorship_commercial', amountNative:12.254, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.99
    { rawLabel:'- Sponsorship Regional', normalizedCategory:'sponsorship_commercial', amountNative:96.85, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Archivio Rai/Infront', normalizedCategory:'broadcasting', amountNative:10.423, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Inter TV', normalizedCategory:'broadcasting', amountNative:3.992, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Diversi', normalizedCategory:'other_income', amountNative:0.226, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:4.28444, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:29.108266, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:4.572248, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.267743, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'- proventi televisivi', normalizedCategory:'broadcasting', amountNative:87.221195, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'- proventi televisivi da partecip. a compet. UEFA', normalizedCategory:'broadcasting', amountNative:51.738723, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:0.055, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciat.', normalizedCategory:'player_sales', amountNative:2.523483, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'h) plusvalenze da cessione dir. plur. prest. calciatori', normalizedCategory:'player_sales', amountNative:40.140634, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:1.209614, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:16.161128, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'4) Capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:7.147379, disclosureLevel:'aggregated' }, // pág. 14, precedente
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:20.221, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Gare Tim Cup', normalizedCategory:'matchday_competition', amountNative:0.161, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Tornei e amichevoli', normalizedCategory:'matchday_competition', amountNative:3.285, disclosureLevel:'aggregated' }, // pág. 47, Jev 1
    { rawLabel:'b) percentuale su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:0.773578, disclosureLevel:'aggregated' }, // pág. 13, Jev 0.98
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:9.331604, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'- Quote Inter Club', normalizedCategory:'member_dues', amountNative:1.727, disclosureLevel:'aggregated' }, // pág. 47, Jev 1
    { rawLabel:'- Sponsorship Infront', normalizedCategory:'sponsorship_commercial', amountNative:14.249, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.99
    { rawLabel:'- Sponsorship Regional', normalizedCategory:'sponsorship_commercial', amountNative:91.687, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Archivio Rai/Infront', normalizedCategory:'broadcasting', amountNative:10.422, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Inter Tv', normalizedCategory:'broadcasting', amountNative:3.921, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Diversi', normalizedCategory:'other_income', amountNative:0.07, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'4) Capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:7.526234, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:2.58061, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:20.543333, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:1.786051, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.010964, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'- proventi televisivi', normalizedCategory:'broadcasting', amountNative:80.245963, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'- proventi televisivi da partecip. a compet. UEFA.', normalizedCategory:'broadcasting', amountNative:0, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciati.', normalizedCategory:'player_sales', amountNative:3.971329, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'h) plusvalenze da cessione dir. plur. prest. calciatori', normalizedCategory:'player_sales', amountNative:49.704026, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:5.083038, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:17.690682, disclosureLevel:'aggregated' }, // pág. 13, precedente
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'- Championship matches', normalizedCategory:'matchday_competition', amountNative:30.368, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'- TIM Cup matches', normalizedCategory:'matchday_competition', amountNative:0.489, disclosureLevel:'aggregated' }, // pág. 81, Jev 0.98
    { rawLabel:'- International Cup matches', normalizedCategory:'matchday_competition', amountNative:13.195, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'- Tournaments and friendly matches', normalizedCategory:'matchday_competition', amountNative:1.583, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'b) season tickets', normalizedCategory:'season_tickets', amountNative:25.201115, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'2) Changes in inventories of work in progress, semi-finished and finished products', normalizedCategory:'other_income', amountNative:0.759266, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'a) grants and contribution', normalizedCategory:'other_income', amountNative:18.243755, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'b) sponsorships', normalizedCategory:'sponsorship_commercial', amountNative:79.87781, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'c) advertising income', normalizedCategory:'sponsorship_commercial', amountNative:8.112225, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'d) commercial income and royalties', normalizedCategory:'sponsorship_commercial', amountNative:24.013822, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'- television revenues', normalizedCategory:'broadcasting', amountNative:101.065, disclosureLevel:'aggregated' }, // pág. 82, Jev 1
    { rawLabel:'- television income from UEFA competitions', normalizedCategory:'broadcasting', amountNative:65.636, disclosureLevel:'aggregated' }, // pág. 82, Jev 0.99
    { rawLabel:'- Other television income', normalizedCategory:'broadcasting', amountNative:9.719, disclosureLevel:'aggregated' }, // pág. 82, Jev 1
    { rawLabel:'f) revenues from temporary loan of players', normalizedCategory:'player_sales', amountNative:2.25, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'g) gains on sale of player registrations rights', normalizedCategory:'player_sales', amountNative:65.84578, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'h) other income from player management', normalizedCategory:'player_sales', amountNative:5.77553, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'i) sundry revenues and income', normalizedCategory:'other_income', amountNative:21.074113, disclosureLevel:'aggregated' }, // pág. 44, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'- Championship matches', normalizedCategory:'matchday_competition', amountNative:23.477, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Coppa Italia matches', normalizedCategory:'matchday_competition', amountNative:5.371, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- International Cup matches', normalizedCategory:'matchday_competition', amountNative:27.396, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'- Tournaments and friendly matches', normalizedCategory:'matchday_competition', amountNative:0.585, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'b) season tickets', normalizedCategory:'season_tickets', amountNative:22.139373, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'2) Changes in inventories of work in progress, semi-finished and finished products', normalizedCategory:'other_income', amountNative:0.390684, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'4) Capitalization of youth programme costs', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'a) grants and contribution', normalizedCategory:'other_income', amountNative:17.445533, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) sponsorships', normalizedCategory:'sponsorship_commercial', amountNative:54.378034, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'c) advertising income', normalizedCategory:'sponsorship_commercial', amountNative:6.963657, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'d) commercial income and royalties', normalizedCategory:'sponsorship_commercial', amountNative:13.160209, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'- television revenues', normalizedCategory:'broadcasting', amountNative:87.069, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'- television income from UEFA competitions', normalizedCategory:'broadcasting', amountNative:99.582, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'- Other television income', normalizedCategory:'broadcasting', amountNative:9.881, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'f) revenues from temporary loan of players', normalizedCategory:'player_sales', amountNative:1.0525, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'g) gains on sale of player registrations rights', normalizedCategory:'player_sales', amountNative:28.875955, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'h) other income from player management', normalizedCategory:'player_sales', amountNative:9.652751, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'i) sundry revenues and income', normalizedCategory:'other_income', amountNative:18.055477, disclosureLevel:'aggregated' }, // pág. 14, precedente
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2020-21-en.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2020-21-en.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'- Inter Club/Member Fan Cards', normalizedCategory:'member_dues', amountNative:2.182, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Sponsorship EU in house', normalizedCategory:'sponsorship_commercial', amountNative:14.149, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Sponsorship Regional', normalizedCategory:'sponsorship_commercial', amountNative:38.161, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Sponsorship Global', normalizedCategory:'sponsorship_commercial', amountNative:3.782, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'- Rai-Infront Library', normalizedCategory:'broadcasting', amountNative:10.423, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'- Inter TV', normalizedCategory:'broadcasting', amountNative:5.445, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Others', normalizedCategory:'other_income', amountNative:0.316, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Coaches compensation and bonuses', normalizedCategory:'other_income', amountNative:4.533, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.9
    { rawLabel:'Inps – Enpals – cost for coaches', normalizedCategory:'other_income', amountNative:1.203, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.88
    { rawLabel:'Coaches and of career allowances', normalizedCategory:'other_income', amountNative:0.239, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.95
    { rawLabel:'Health care costs', normalizedCategory:'other_income', amountNative:0.002, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.97
    { rawLabel:'Retirement management', normalizedCategory:'other_income', amountNative:0.564, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.91
    { rawLabel:'Sport Facilities', normalizedCategory:'other_income', amountNative:2.167, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.85
    { rawLabel:'Room and Board for the matches', normalizedCategory:'other_income', amountNative:0.142, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.85
    { rawLabel:'a) grants and contribution', normalizedCategory:'other_income', amountNative:8.524319, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'b) sponsorships', normalizedCategory:'sponsorship_commercial', amountNative:41.605362, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'c) advertising income', normalizedCategory:'sponsorship_commercial', amountNative:0.007357, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'d) commercial income and royalties', normalizedCategory:'sponsorship_commercial', amountNative:4.209868, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'- television revenues', normalizedCategory:'broadcasting', amountNative:125.413182, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'- television income from participation in UEFA competitions', normalizedCategory:'broadcasting', amountNative:64.32396, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'8) revenues from temporary loan of players', normalizedCategory:'player_sales', amountNative:5.060964, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'h) gains on sale of player registrations rights', normalizedCategory:'player_sales', amountNative:2.287893, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'i) other income from player management', normalizedCategory:'player_sales', amountNative:1.005863, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'I) sundry revenues and income', normalizedCategory:'other_income', amountNative:28.965814, disclosureLevel:'aggregated' }, // pág. 16, precedente
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
  2020: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale tecnico', normalizedCategory:'admin_general_expense', amountNative:-0.987, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.95
    { rawLabel:'Materiale consumo', normalizedCategory:'admin_general_expense', amountNative:-1.78, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.92
    { rawLabel:'Materiale sanitario', normalizedCategory:'admin_general_expense', amountNative:-0.272, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.93
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.204, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.98
    { rawLabel:'Costi per allenamenti e ritiri', normalizedCategory:'match_organisation_expense', amountNative:-1.929, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.98
    { rawLabel:'Spese sanitarie', normalizedCategory:'match_organisation_expense', amountNative:-0.3, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.92
    { rawLabel:'Compensi lavoratori autonomi', normalizedCategory:'admin_general_expense', amountNative:-2.104, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.95
    { rawLabel:'Costi pensionato', normalizedCategory:'wages_squad', amountNative:-0.857, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.8
    { rawLabel:'Spese per manutenzione campi sportivi', normalizedCategory:'admin_general_expense', amountNative:-0.654, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.92
    { rawLabel:'Diversi', normalizedCategory:'other_expenses', amountNative:-0.348, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.96
    { rawLabel:'Osservazione calciatori', normalizedCategory:'other_expenses', amountNative:-1.005, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.92
    { rawLabel:'Squadre sovvenzionate', normalizedCategory:'youth_other_sports_expense', amountNative:-0.275, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.92
    { rawLabel:'Costi accessori campagna trasferimenti', normalizedCategory:'other_expenses', amountNative:-11.853, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Diversi', normalizedCategory:'other_expenses', amountNative:-0.188, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.96
    { rawLabel:'Costi vitto, alloggio, locomozione', normalizedCategory:'match_organisation_expense', amountNative:-2.677, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-2.511, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.755, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.95
    { rawLabel:'Costi Intercampus', normalizedCategory:'other_expenses', amountNative:-0.456, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.98
    { rawLabel:'Amministrative - pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-38.179, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Concessione d\'uso Stadio Meazza', normalizedCategory:'match_organisation_expense', amountNative:-4.697, disclosureLevel:'aggregated' }, // pág. 53, Claude 0.93
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-1.981, disclosureLevel:'aggregated' }, // pág. 53, Jev 1
    { rawLabel:'Canoni leasing operativo', normalizedCategory:'admin_general_expense', amountNative:-0.006, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.99
    { rawLabel:'Canoni licenza d\'uso diversi', normalizedCategory:'other_expenses', amountNative:-2.582, disclosureLevel:'aggregated' }, // pág. 53, Claude 0.92
    { rawLabel:'Concessione impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.628, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.92
    { rawLabel:'Canoni noleggio', normalizedCategory:'admin_general_expense', amountNative:-2.044, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.95
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-181.340808, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-8.321829, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-2.091181, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-6.25158, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-132.670879, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.92
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-2.055367, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-3.570271, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.96
    { rawLabel:'d) svalutazioni di crediti compresi nell\'attivo circolante e nelle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.742985, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.003402, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'13) Altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:-15.236091, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-2.986579, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'b) tasse di iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.01502, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'- percentuali su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.276721, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-3.06782, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'e) minusvalenze da cessione dir. plur. prest. calc.', normalizedCategory:'exceptional_items', amountNative:-0.036098, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.98
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.672556, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'- spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.145, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.92
    { rawLabel:'- oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.412, disclosureLevel:'aggregated' }, // pág. 56, Jev 1
    { rawLabel:'- contributi a Lega Calcio', normalizedCategory:'match_organisation_expense', amountNative:-1.319, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.95
    { rawLabel:'- transazioni e risarcimenti', normalizedCategory:'other_expenses', amountNative:-0.013, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.98
    { rawLabel:'- oneri esercizi precedenti', normalizedCategory:'exceptional_items', amountNative:-2.039, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.99
    { rawLabel:'- diversi', normalizedCategory:'other_expenses', amountNative:-0.39, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.93
  ],
  2019: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale tecnico', normalizedCategory:'admin_general_expense', amountNative:-0.721, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Materiale consumo', normalizedCategory:'admin_general_expense', amountNative:-1.876, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Materiale sanitario', normalizedCategory:'admin_general_expense', amountNative:-0.264, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.366, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'7) Per servizi', normalizedCategory:'admin_general_expense', amountNative:-56.054442, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'Concessione d\'uso Stadio Meazza', normalizedCategory:'match_organisation_expense', amountNative:-4.674, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-1.857, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Canoni leasing operativo', normalizedCategory:'admin_general_expense', amountNative:-0.025, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Canoni licenza d\'uso diversi', normalizedCategory:'other_expenses', amountNative:-1.016, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Concessione impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.33, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Canoni noleggio', normalizedCategory:'admin_general_expense', amountNative:-1.827, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-174.905831, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-8.027211, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.941161, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-7.722272, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-95.71981, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.953181, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-3.567858, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'d) svalutazioni di crediti compresi nell\'attivo circolante e nelle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-4.993354, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-1.552492, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'13) Altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:-25.811, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-3.416021, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) tasse di iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.005007, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'- percentuali su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.079984, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-21.609545, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'e) minusvalenze da cessione dir. plur. prest. calc.', normalizedCategory:'exceptional_items', amountNative:-0.667586, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.052483, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'- spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.244, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'- oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.681, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'- contributi a Lega Calcio', normalizedCategory:'match_organisation_expense', amountNative:-1.026, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'- transazioni e risarcimenti', normalizedCategory:'other_expenses', amountNative:-1.344, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'- oneri esercizi precedenti', normalizedCategory:'exceptional_items', amountNative:-2.622, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'- diversi', normalizedCategory:'other_expenses', amountNative:-0.23, disclosureLevel:'aggregated' }, // pág. 53, precedente
  ],
  2018: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale tecnico', normalizedCategory:'admin_general_expense', amountNative:-0.526, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Materiale consumo', normalizedCategory:'admin_general_expense', amountNative:-0.72, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Materiale sanitario', normalizedCategory:'admin_general_expense', amountNative:-0.219, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.136, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per allenamenti e ritiri', normalizedCategory:'match_organisation_expense', amountNative:-2.219, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Spese sanitarie', normalizedCategory:'match_organisation_expense', amountNative:-0.438, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Compensi lavoratori autonomi', normalizedCategory:'admin_general_expense', amountNative:-1.391, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi pensionato', normalizedCategory:'wages_squad', amountNative:-0.846, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Spese per manutenzione campi sportivi', normalizedCategory:'admin_general_expense', amountNative:-0.514, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Diversi', normalizedCategory:'other_expenses', amountNative:-0.44, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Osservazione calciatori', normalizedCategory:'other_expenses', amountNative:-1.294, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Squadre sovvenzionate', normalizedCategory:'youth_other_sports_expense', amountNative:-0.33, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi accessori campagna trasferimenti', normalizedCategory:'other_expenses', amountNative:-6.107, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Diversi', normalizedCategory:'other_expenses', amountNative:-0.15, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione', normalizedCategory:'match_organisation_expense', amountNative:-1.963, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-2.78, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.299, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi Intercampus', normalizedCategory:'other_expenses', amountNative:-0.578, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Amministrative - pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-31.628, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Concessione d\'uso Stadio Meazza', normalizedCategory:'match_organisation_expense', amountNative:-4.618, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-1.7, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Canoni leasing operativo', normalizedCategory:'admin_general_expense', amountNative:-0.049, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Canoni licenza d\'uso diversi', normalizedCategory:'other_expenses', amountNative:-0.483, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Concessione impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.262, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Canoni noleggio', normalizedCategory:'admin_general_expense', amountNative:-1.24, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-135.992088, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-7.298702, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.640109, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-11.061001, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-88.126004, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.083968, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-2.135071, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'d) svalutazioni di crediti compresi nell\'attivo circolante e nelle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.000734, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'13) Altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:-0.24696, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-2.274022, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'b) tasse di iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.00554, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'- percentuali su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.072591, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-3.487117, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'e) minusvalenze da cessione dir. plur. prest. calc.', normalizedCategory:'exceptional_items', amountNative:-0.572107, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'f) altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.710259, disclosureLevel:'aggregated' }, // pág. 13, precedente
    { rawLabel:'- spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.105, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.578, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- contributi a Lega Calcio', normalizedCategory:'match_organisation_expense', amountNative:-1.037, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- transazioni e risarcimenti', normalizedCategory:'other_expenses', amountNative:-0.028, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- diversi', normalizedCategory:'other_expenses', amountNative:-2.767, disclosureLevel:'aggregated' }, // pág. 54, precedente
  ],
  2024: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Technical material', normalizedCategory:'admin_general_expense', amountNative:-3.348, disclosureLevel:'aggregated' }, // pág. 83, precedente
    { rawLabel:'Consumables', normalizedCategory:'admin_general_expense', amountNative:-3.838, disclosureLevel:'aggregated' }, // pág. 83, precedente
    { rawLabel:'Health material', normalizedCategory:'admin_general_expense', amountNative:-0.259, disclosureLevel:'aggregated' }, // pág. 83, precedente
    { rawLabel:'E-commerce material', normalizedCategory:'admin_general_expense', amountNative:-6.355, disclosureLevel:'aggregated' }, // pág. 83, precedente
    { rawLabel:'Other', normalizedCategory:'other_expenses', amountNative:-0.162, disclosureLevel:'aggregated' }, // pág. 83, precedente
    { rawLabel:'Costs for training sessions and camps', normalizedCategory:'match_organisation_expense', amountNative:-2.503, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Health expenses', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Fees for self-employed contractors', normalizedCategory:'admin_general_expense', amountNative:-2.218, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Retirement costs', normalizedCategory:'wages_squad', amountNative:-0.843, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Expenses for maintenance of sport pitches', normalizedCategory:'admin_general_expense', amountNative:-0.963, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Sundry', normalizedCategory:'other_expenses', amountNative:-0.216, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Player scouting and trials', normalizedCategory:'other_expenses', amountNative:-2.163, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Subsidized teams', normalizedCategory:'youth_other_sports_expense', amountNative:-0.25, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Transfer campaign agent fees', normalizedCategory:'other_expenses', amountNative:-14.1, disclosureLevel:'aggregated' }, // pág. 84, Jev 1
    { rawLabel:'Costs for accomodation, food, transport', normalizedCategory:'match_organisation_expense', amountNative:-2.587, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Ticketing service, ground admission, security control', normalizedCategory:'match_organisation_expense', amountNative:-4.335, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Insurance and pension', normalizedCategory:'admin_general_expense', amountNative:-3.274, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Intercampus', normalizedCategory:'other_expenses', amountNative:-0.362, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Administrative, advertising and general', normalizedCategory:'admin_general_expense', amountNative:-35.872, disclosureLevel:'aggregated' }, // pág. 84, precedente
    { rawLabel:'Licence to use Meazza Stadium', normalizedCategory:'match_organisation_expense', amountNative:-5.509, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Rental expenses', normalizedCategory:'admin_general_expense', amountNative:-3.854, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Operating lease payments', normalizedCategory:'admin_general_expense', amountNative:-0.024, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Other user licence fees', normalizedCategory:'other_expenses', amountNative:-3.357, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Concession sports facilities', normalizedCategory:'admin_general_expense', amountNative:-0.492, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Rental fees', normalizedCategory:'admin_general_expense', amountNative:-2.132, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Other Rental fees', normalizedCategory:'admin_general_expense', amountNative:-0.002, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'a) salaries and wages', normalizedCategory:'wages_squad', amountNative:-207.702936, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'b) social security contributions', normalizedCategory:'wages_squad', amountNative:-11.008929, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'c) employee severance indemnity', normalizedCategory:'wages_squad', amountNative:-2.448402, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'e) other costs', normalizedCategory:'wages_squad', amountNative:-6.223714, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'a) amortisation of intangibles assets', normalizedCategory:'player_amortisation', amountNative:-96.321678, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'b) depreciation of tangible', normalizedCategory:'depreciation', amountNative:-2.064158, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'c) write-downs of assets', normalizedCategory:'player_impairment', amountNative:-6.515532, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'d) write-downs of doubtful account receivables included in current assets', normalizedCategory:'other_amortisation', amountNative:-6.83259, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'12) Provision for risks', normalizedCategory:'other_amortisation', amountNative:-0.004098, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'13) Other provisions', normalizedCategory:'other_amortisation', amountNative:-9.432241, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'a) various costs of organising competitions', normalizedCategory:'match_organisation_expense', amountNative:-6.168241, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'b) costs for the temporary acquisition of players', normalizedCategory:'other_expenses', amountNative:-1.5, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'c) losses from the sale of player registrations', normalizedCategory:'other_expenses', amountNative:-1.163936, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'d) other expenses from player management', normalizedCategory:'other_expenses', amountNative:-1.668825, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'- Costs, fines and penalties for matches', normalizedCategory:'match_organisation_expense', amountNative:-0.144, disclosureLevel:'aggregated' }, // pág. 88, precedente
    { rawLabel:'- Indirect tax expenses', normalizedCategory:'admin_general_expense', amountNative:-1.925, disclosureLevel:'aggregated' }, // pág. 88, precedente
    { rawLabel:'- Contributions from Football League', normalizedCategory:'match_organisation_expense', amountNative:-1.596, disclosureLevel:'aggregated' }, // pág. 88, precedente
    { rawLabel:'- Transactions and compensation', normalizedCategory:'other_expenses', amountNative:-0.004, disclosureLevel:'aggregated' }, // pág. 88, precedente
    { rawLabel:'- Cost of previously years', normalizedCategory:'exceptional_items', amountNative:-2.149, disclosureLevel:'aggregated' }, // pág. 88, precedente
    { rawLabel:'- Sundry costs', normalizedCategory:'other_expenses', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 88, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Technical material', normalizedCategory:'admin_general_expense', amountNative:-3.215, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Consumables', normalizedCategory:'admin_general_expense', amountNative:-2.338, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Health material', normalizedCategory:'admin_general_expense', amountNative:-0.238, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'E-commerce material', normalizedCategory:'admin_general_expense', amountNative:-3.576, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Other', normalizedCategory:'other_expenses', amountNative:-0.174, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costs for training sessions and camps', normalizedCategory:'match_organisation_expense', amountNative:-2.311, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Health expenses', normalizedCategory:'match_organisation_expense', amountNative:-0.351, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Fees for self-employed contractors', normalizedCategory:'admin_general_expense', amountNative:-2.025, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Retirement costs', normalizedCategory:'wages_squad', amountNative:-0.767, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Expenses for maintenance of sport pitches', normalizedCategory:'admin_general_expense', amountNative:-0.805, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Sundry', normalizedCategory:'other_expenses', amountNative:-0.271, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Player scouting and trials', normalizedCategory:'other_expenses', amountNative:-1.463, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Subsidized teams', normalizedCategory:'youth_other_sports_expense', amountNative:-0.25, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Transfer market agent fees', normalizedCategory:'other_expenses', amountNative:-10.884, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Sundry', normalizedCategory:'other_expenses', amountNative:-0.037, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costs for accomodation, food, transport', normalizedCategory:'match_organisation_expense', amountNative:-4.06, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Ticketing service, ground admission, security control', normalizedCategory:'match_organisation_expense', amountNative:-4.095, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Insurance and pension', normalizedCategory:'admin_general_expense', amountNative:-2.583, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Intercampus', normalizedCategory:'other_expenses', amountNative:-0.369, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Administrative, advertising and general', normalizedCategory:'admin_general_expense', amountNative:-31.809, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Licence to use Meazza Stadium', normalizedCategory:'match_organisation_expense', amountNative:-5.163, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Rental expenses', normalizedCategory:'admin_general_expense', amountNative:-3.576, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Operating lease payments', normalizedCategory:'admin_general_expense', amountNative:-0.022, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Other user licence fees', normalizedCategory:'other_expenses', amountNative:-2.646, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Concession sports facilities', normalizedCategory:'admin_general_expense', amountNative:-0.483, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Rental fees', normalizedCategory:'admin_general_expense', amountNative:-1.762, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Other Rental fees', normalizedCategory:'admin_general_expense', amountNative:-0.002, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'a) salaries and wages', normalizedCategory:'wages_squad', amountNative:-205.959981, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) social security contributions', normalizedCategory:'wages_squad', amountNative:-8.992735, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'c) employee severance indemnity', normalizedCategory:'wages_squad', amountNative:-2.129382, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'e) other costs', normalizedCategory:'wages_squad', amountNative:-9.837709, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'a) amortisation of intangibles assets', normalizedCategory:'player_amortisation', amountNative:-112.114063, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) depreciation of tangible', normalizedCategory:'depreciation', amountNative:-1.831228, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'c) write-downs of assets', normalizedCategory:'player_impairment', amountNative:-7.725399, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'d) write-downs of doubtful account receivables included in current assets', normalizedCategory:'other_amortisation', amountNative:-0.535022, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'12) Provision for risks', normalizedCategory:'other_amortisation', amountNative:0.034679, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'13) Other provisions', normalizedCategory:'other_amortisation', amountNative:-0.564, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'a) various costs of organising competitions', normalizedCategory:'match_organisation_expense', amountNative:-7.22432, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) costs for the temporary acquisition of players', normalizedCategory:'other_expenses', amountNative:-10.975748, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'c) losses from the sale of player registrations', normalizedCategory:'other_expenses', amountNative:-0.634125, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'d) other expenses from player management', normalizedCategory:'other_expenses', amountNative:-1.493487, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'- Costs, fines and penalties for matches', normalizedCategory:'match_organisation_expense', amountNative:-1.518, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Indirect tax expenses', normalizedCategory:'admin_general_expense', amountNative:-0.582, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Contributions from Football League', normalizedCategory:'match_organisation_expense', amountNative:-1.136, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Transactions and compensation', normalizedCategory:'other_expenses', amountNative:-0.288, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Cost of previous years', normalizedCategory:'exceptional_items', amountNative:-4.42, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'- Sundry costs', normalizedCategory:'other_expenses', amountNative:-2.308, disclosureLevel:'aggregated' }, // pág. 54, precedente
  ],
  2021: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Technical material', normalizedCategory:'admin_general_expense', amountNative:-0.937, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Consumables', normalizedCategory:'admin_general_expense', amountNative:-0.98, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Health material', normalizedCategory:'admin_general_expense', amountNative:-0.235, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Other', normalizedCategory:'other_expenses', amountNative:-0.096, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Costs for training sessions and camps', normalizedCategory:'match_organisation_expense', amountNative:-1.714, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Health expenses', normalizedCategory:'match_organisation_expense', amountNative:-1.931, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Fees for self-employed contractors', normalizedCategory:'admin_general_expense', amountNative:-2.403, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Retirement costs', normalizedCategory:'wages_squad', amountNative:-0.564, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Expenses for maintenance of sport pitches', normalizedCategory:'admin_general_expense', amountNative:-0.84, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Sundry', normalizedCategory:'other_expenses', amountNative:-0.316, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Player scouting and trials', normalizedCategory:'other_expenses', amountNative:-0.91, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Subsidized teams', normalizedCategory:'youth_other_sports_expense', amountNative:-0.27, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Transfer campaign agent fees', normalizedCategory:'other_expenses', amountNative:-10.981, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Sundry', normalizedCategory:'other_expenses', amountNative:-0.09, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Costs for accomodation, food, transport', normalizedCategory:'match_organisation_expense', amountNative:-2.033, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Ticketing service, ground admission, security control', normalizedCategory:'match_organisation_expense', amountNative:-0.399, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Insurance and pension', normalizedCategory:'admin_general_expense', amountNative:-2.23, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Intercampus', normalizedCategory:'other_expenses', amountNative:-0.2, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Administrative, advertising and general', normalizedCategory:'admin_general_expense', amountNative:-26.807, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Licence to use Meazza Stadium', normalizedCategory:'match_organisation_expense', amountNative:-4.697, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Rental expenses', normalizedCategory:'admin_general_expense', amountNative:-2.692, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Operating lease payments', normalizedCategory:'admin_general_expense', amountNative:-0.019, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Other user licence fees', normalizedCategory:'other_expenses', amountNative:-2.051, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Concession sports facilities', normalizedCategory:'admin_general_expense', amountNative:-0.45, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Other Rental fees', normalizedCategory:'admin_general_expense', amountNative:-2.688, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'a) salaries and wages', normalizedCategory:'wages_squad', amountNative:-236.686056, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'b) social security contributions', normalizedCategory:'wages_squad', amountNative:-8.497191, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'c) employee severance indemnity', normalizedCategory:'wages_squad', amountNative:-2.087202, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'e) other costs', normalizedCategory:'wages_squad', amountNative:-14.307164, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'a) amortisation of intangibles assets', normalizedCategory:'player_amortisation', amountNative:-150.625585, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'b) depreciation of tangible', normalizedCategory:'depreciation', amountNative:-1.844157, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'c) write-downs of assets', normalizedCategory:'player_impairment', amountNative:-16.70694, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'receivables included in current assets', normalizedCategory:'other_amortisation', amountNative:-40.382799, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'12) Provision for risks', normalizedCategory:'other_amortisation', amountNative:-0.008302, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'13) Other provisions', normalizedCategory:'other_amortisation', amountNative:-20.456542, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'a) various costs of organising competitions', normalizedCategory:'match_organisation_expense', amountNative:-1.275485, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'b) competition registration fees', normalizedCategory:'match_organisation_expense', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'d) costs for the temporary acquisition of players', normalizedCategory:'other_expenses', amountNative:-0.560267, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'e) losses from the sale of player registrations', normalizedCategory:'other_expenses', amountNative:-2.041579, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'f) other expenses from player management', normalizedCategory:'other_expenses', amountNative:-1.737774, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'- Costs, fines and penalties for matches', normalizedCategory:'match_organisation_expense', amountNative:-0.169, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Indirect tax expenses', normalizedCategory:'admin_general_expense', amountNative:-0.342, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Contributions from Football League', normalizedCategory:'match_organisation_expense', amountNative:-1.544, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Cost of previously years', normalizedCategory:'exceptional_items', amountNative:-2.638, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Sundry costs', normalizedCategory:'other_expenses', amountNative:-0.335, disclosureLevel:'aggregated' }, // pág. 61, precedente
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
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): resultado-final = (102.393.789). el estado cortó en b12 y el resultado impreso (L912 y L918) quedó afuera; cierra exacto con los totales impresos (372.370.111 − 443.923.801 − 26.213.126 + 529.404 − 5.156.377)
  2020: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-25.683722, tax:-5.15104,
    extraRows: [
      {label:'- da altre imprese', value:0.000209},
      {label:'- da terzi', value:7.635012},
      {label:'c) verso imprese controllanti', value:-5.529912},
      {label:'d) verso imprese sottoposte al controllo di controllanti', value:-3.013514},
      {label:'d-bis) altri oneri finanziari', value:-25.461249},
      {label:'a) utile su cambi', value:0.562187},
      {label:'c) perdite su cambi', value:-0.405859},
      {label:'a) di partecipazioni', value:0.529404},
      {label:'a) imposte correnti (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-5.15104},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:372.37016, officialTotalExpenses:441.854089, officialPAT:-102.393789,
  },
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 7.147.379. Claude 2026-10-08 (Guido: a mano): el renglón 4) del estado (L795, ingreso 7.147.379) se queda entero: la nota b41 (L2307-L2314) explica los costos que se capitalizan (entrenadores, pensionato, instalaciones) y no es un desglose de ingreso; sin esto sus filas quedaban como gastos y el resultado no cerraba (−62,68 M contra −48,39 M impreso)
  2019: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-29.218575, tax:-8.06666,
    extraRows: [
      {label:'- da altre imprese', value:0.000197},
      {label:'- da terzi', value:5.625657},
      {label:'c) verso imprese controllanti', value:-9.833005},
      {label:'d) verso imprese sottoposte al controllo di controllanti', value:-3.00528},
      {label:'d-bis) altri oneri finanziari', value:-22.921383},
      {label:'a) utile su cambi', value:0.192255},
      {label:'c) perdite su cambi', value:-0.148212},
      {label:'a) di partecipazioni', value:0.871196},
      {label:'a) di partecipazioni', value:null},
      {label:'a) imposte correnti', value:-8.730307},
      {label:'b) imposte differite', value:-0.074466},
      {label:'c) imposte anticipate', value:0.738113},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:417.079516, officialTotalExpenses:424.892652, officialPAT:-48.387493,
  },
  2018: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2017-18',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-34.726631, tax:-7.865714,
    extraRows: [
      {label:'- da altre imprese (da crediti iscritti nelle immobilizzazioni)', value:0.000209},
      {label:'- da terzi (proventi diversi dai precedenti)', value:4.607689},
      {label:'c) verso imprese controllanti', value:-14.091129},
      {label:'d) altri oneri finanziari', value:-25.151049},
      {label:'a) utile su cambi', value:0.305048},
      {label:'c) perdite su cambi', value:-0.219919},
      {label:'19) Svalutazioni a) di partecipazioni', value:-0.17748},
      {label:'a) imposte correnti', value:-7.362455},
      {label:'b) imposte differite', value:-0.242375},
      {label:'c) imposte anticipate', value:-0.260884},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:346.990412, officialTotalExpenses:321.579166, officialPAT:-17.753536,
  },
  2024: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-35.43401, tax:-9.194137,
    extraRows: [
      {label:'- from other companies', value:0.04502},
      {label:'- others', value:4.228799},
      {label:'c) from parent companies', value:-3.789315},
      {label:'d) other financial expenses', value:-36.579154},
      {label:'c) losses on exchange', value:-0.011002},
      {label:'a) of investments', value:0.671642},
      {label:'a) current taxes', value:-9.916453},
      {label:'b) taxes related to previous years', value:0.308483},
      {label:'c) deferred tax assets', value:0.413833},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:473.208416, officialTotalExpenses:462.17828, officialPAT:-35.745922,
  },
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-37.194675, tax:-8.144303,
    extraRows: [
      {label:'- from other companies', value:0.00027},
      {label:'- from third parties', value:0.695256},
      {label:'c) from parent companies', value:-6.269781},
      {label:'e) other financial expenses', value:-33.388426},
      {label:'17-bis) Gains and losses on foreign currency traslation', value:-0.053831},
      {label:'a) of investments', value:1.821837},
      {label:'a) current taxes', value:-8.74515},
      {label:'b) taxes related to previous fiscal years', value:0.187014},
      {label:'c) deferred tax liabilities', value:0.413833},
      {label:'d) deferred tax assets', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:425.475173, officialTotalExpenses:461.08952, officialPAT:-85.372658,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): resultado-final = (245.579.264). Claude 2026-10-08 (Guido: to-do 179, ok): el resultado impreso quedó afuera de las filas; cierra exacto con los totales impresos (364.712.220 - 568.782.409 - 33.431.112 - 1.972.728 - 6.105.235)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (1.972.728). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la sección D (19 impairment of investments, 1.972.728 impreso en negativo) no entró en el financiero: el impuesto deducido daba 8,08 M contra 6,105 M impresos (current 4.009.004 + deferred -3.805 + 2.100.036)
  2021: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'inter-it-fascicolo-bilancio-consolidato-2020-21-en',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-35.40384, tax:-6.106963,
    extraRows: [
      {label:'- from other companies', value:0.000259},
      {label:'- from third parties', value:2.7066},
      {label:'b) from companies subject to parent companies control', value:null},
      {label:'c) from parent companies', value:-5.475671},
      {label:'d) other financial expenses', value:-30.747585},
      {label:'a) income from exchange', value:0.096625},
      {label:'c) losses on exchange', value:-0.01134},
      {label:'19) Impairment a) of investments (D, costo)', value:-1.972728},
      {label:'a) current taxes (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-6.106963},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:364.712582, officialTotalExpenses:566.143043, officialPAT:-245.579264,
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
  'inter-it-fascicolo-bilancio-consolidato-2019-20': {
    id:'inter-it-fascicolo-bilancio-consolidato-2019-20', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'inter-it-fascicolo-bilancio-consolidato-2018-19': {
    id:'inter-it-fascicolo-bilancio-consolidato-2018-19', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'inter-it-fascicolo-bilancio-consolidato-2017-18': {
    id:'inter-it-fascicolo-bilancio-consolidato-2017-18', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2017-18 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'inter-it-fascicolo-bilancio-consolidato-2023-24': {
    id:'inter-it-fascicolo-bilancio-consolidato-2023-24', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'inter-it-fascicolo-bilancio-consolidato-2022-23': {
    id:'inter-it-fascicolo-bilancio-consolidato-2022-23', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'inter-it-fascicolo-bilancio-consolidato-2020-21-en': {
    id:'inter-it-fascicolo-bilancio-consolidato-2020-21-en', clubId:'inter-it',
    title:'F.C. Internazionale Milano S.p.A. — Inter-fascicolo-bilancio-consolidato-2020-21-en (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2020-21-en.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['inter-it'] = null;

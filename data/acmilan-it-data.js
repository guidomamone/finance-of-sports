// ============================================================================
// data/acmilan-it-data.js — A.C. Milan S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "acmilan-it" — slug de "AC Milan" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "A.C. Milan S.p.A." — el .md, 18 veces (nombre del club + forma societaria)
//   displayName        ok        "AC Milan" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 74 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [argentina] ac milan: #E4002B Crimson Red, #101820 Black, #FFFFFF White | [italia] ac milan: #E4002B Crimso
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 5 documento(s) con los dos estados votan consolidad
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 2 línea(s), pero ninguno es una cotización plausible
//   fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
//   sourceId           ok        "acmilan-it-bilanci-relazioni-2023-24" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "AC Milan"
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"acmilan-it-bilanci-relazioni-2023-24"}
// ============================================================================

const acmilanitRevenueLinesByYear = {
  // 2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:44.488, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:19.276, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:5.585, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.93
    { rawLabel:'2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:3.258, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.94
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.109, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:90.529, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:52.919, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:152.324, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:9.335, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:4.164, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:44.899, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.471, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.95
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:26.584, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:55.064, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:16.183, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:1.587, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'Rimanenze Finali E-Commerce', normalizedCategory:'other_income', amountNative:3.098, disclosureLevel:'aggregated' }, // pág. 77, Claude 0.8
    { rawLabel:'Rimanenze Finali Store Casa Milan', normalizedCategory:'other_income', amountNative:1.121, disclosureLevel:'aggregated' }, // pág. 77, Claude 0.8
    { rawLabel:'Acc. Fondo Obsolescenza E-commerce', normalizedCategory:'other_income', amountNative:-0.391, disclosureLevel:'aggregated' }, // pág. 77, ? 0.7
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.119, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:80.783, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:46.511, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:174.907, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:7.519, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.082, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.268, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:6.243, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:11.435, disclosureLevel:'aggregated' }, // pág. 33, precedente
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:22.819, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:9.796, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:2.723, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:-0.125, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:44.711, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:17.76, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:100.578, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:8.927, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:2.454, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:35.956, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.652, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:6.482, disclosureLevel:'aggregated' }, // pág. 43, precedente
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:32.309, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:0.235, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:-0.054, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.173, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:57.799, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:25.07, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:133.075, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:7.512, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:1.661, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:5.57, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.227, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:31.015, disclosureLevel:'aggregated' }, // pág. 27, precedente
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:13.402, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:6.676, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:3.551, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:0.075, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:36.683, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:15.562, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:63.385, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:8.881, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:5.442, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:20.019, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:2.674, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:15.965, disclosureLevel:'aggregated' }, // pág. 28, precedente
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:41.113, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:22.118, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:6.286, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:0.997, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.013, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:91.111, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:61.216, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:154.216, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:12.694, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:9.496, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:55.9, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:17.775, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:21.595, disclosureLevel:'aggregated' }, // pág. 36, precedente
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2020-21.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'A) RICAVI DA GARE', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'B) ABBONAMENTI', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'C) RICAVI DA ALTRE COMPETIZIONI', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'2 VARIAZIONI DELLE RIMANENZE DI PRODUIT IN CORSO DI LAVORAZIONE, SEMILAVORATI E FINITI', normalizedCategory:'other_income', amountNative:0.15, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'B) PROVENTI DA SPONSORIZZAZIONI', normalizedCategory:'sponsorship_commercial', amountNative:53.991, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'D) PROVENTI COMMERCIALI E ROYALTIES', normalizedCategory:'sponsorship_commercial', amountNative:11.237, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'E) PROVENTI DA CESSIONE DIRITTI AUDIOVISIVI', normalizedCategory:'broadcasting', amountNative:138.261, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'F) PROVENTI VARI', normalizedCategory:'other_income', amountNative:8.975, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'G) RICAVI DA CESSIONE TEMPORANEA PRESTAZIONI CALCIATORI', normalizedCategory:'player_sales', amountNative:0.063, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'H) PLUSVALENZE DA CESSIONE DIRITTI PLURIENNALI PRESTAZIONI CALCIATORI', normalizedCategory:'player_sales', amountNative:20.185, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'I) ALTRI PROVENTI DA GESTIONE CALCIATORI', normalizedCategory:'player_sales', amountNative:8.133, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'L) RICAVI E PROVENTI DIVERSI', normalizedCategory:'other_income', amountNative:20.097, disclosureLevel:'aggregated' }, // pág. 25, precedente
  ],
  // 2008: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2008: [
    { rawLabel:'a) ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:10.152, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'b) percentuale su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:1.828, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.96
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:12.221, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'d) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:4.097, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:5.008, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.013, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:28.238, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.101, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:25.967, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'e) proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:122.453, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:0.471, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:2.409, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:20.453, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.088, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:4.401, disclosureLevel:'aggregated' }, // pág. 31, precedente
  ],
  // 2009: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2009: [
    { rawLabel:'a) ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:11.753, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'b) percentuale su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:2.162, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.96
    { rawLabel:'c) abbonamenti', normalizedCategory:'season_tickets', amountNative:10.457, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'d) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:7.444, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:6.097, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.013, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:29.389, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.103, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:27.351, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'e) proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:133.533, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:20.592, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.076, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:74.025, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:4.622, disclosureLevel:'aggregated' }, // pág. 31, precedente
  ],
  // 2010: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2010: [
    { rawLabel:'a) ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:14.499, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:10.736, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'d) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:4.29, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:7.615, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.013, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:31.739, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.113, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:34.863, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'e) proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:109.6, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:1.646, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.5, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:25.533, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:12.049, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  // 2011: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2011.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2011: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:15.809, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:11.097, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:2.417, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'4 incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:8.408, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.013, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:35.497, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.317, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:45.621, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:113.868, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:2.745, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:1.051, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:23.567, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.021, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:6.38, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
  // 2012: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2012: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:19.476, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:11.861, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:2.414, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'4 incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:7.91, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.013, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:34.582, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0.319, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:44.885, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:139.818, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:6.047, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.326, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:53.437, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.125, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:8.094, disclosureLevel:'aggregated' }, // pág. 25, precedente
  ],
  // 2013: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2013: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:14.41, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:10.079, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:4.209, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'4 Incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:7.259, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.006, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:34.727, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:43.543, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:119.547, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:9.387, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.5, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:24.148, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.126, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:10.772, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:21.182, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:9.115, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:3.815, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:0.1, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:38.03, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:18.817, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:105.048, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:9.09, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:5.245, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:12.621, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:7.67, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:10.385, disclosureLevel:'aggregated' }, // pág. 38, precedente
  ],
};
const acmilanitExpenseLinesByYear = {
  2024: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-19.672, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-34.546, disclosureLevel:'aggregated' }, // pág. 91, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-17.855, disclosureLevel:'aggregated' }, // pág. 91, precedente
    { rawLabel:'Pubblicità e spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-7.439, disclosureLevel:'aggregated' }, // pág. 91, Jev 1
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.804, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-4.577, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.98
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-7.355, disclosureLevel:'aggregated' }, // pág. 92, Jev 1
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-1.709, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.51, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.93
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-3.426, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.9
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-10.914, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.92
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-10.427, disclosureLevel:'aggregated' }, // pág. 93, Jev 0.96
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-4.263, disclosureLevel:'aggregated' }, // pág. 93, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-173.48, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-12.16, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-2.514, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.364, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-86.96, disclosureLevel:'aggregated' }, // pág. 39, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-2.237, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-3.199, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.93
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-1.33, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-14.085, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.97
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-10.701, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.551, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-4.312, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.331, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
  ],
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-19.741, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-35.824, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-13.444, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Pubblicità e spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-6.612, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.942, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-4.027, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-7.275, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-1.455, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.184, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-2.95, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-10.699, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-9.521, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-4.803, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-161.966, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-9.244, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-2.367, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.421, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-62.819, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.867, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-4.263, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-2.316, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-6.293, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-9.358, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.01, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'c) percentuale da riconoscere a squadre ospiti', normalizedCategory:'match_organisation_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 33, Jev 0.99
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-3.947, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.042, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.149, disclosureLevel:'aggregated' }, // pág. 33, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-5.06, disclosureLevel:'aggregated' }, // pág. 33, precedente
  ],
  2018: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-4.03, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'7 per servizi', normalizedCategory:'admin_general_expense', amountNative:-47.813, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'8 per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-10.095, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.97
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-141.86, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-6.682, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.581, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.274, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-86.419, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.07, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-21.822, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-1.211, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-17.965, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-5.978, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.002, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'c) percentuale da riconoscere a squadre ospiti', normalizedCategory:'match_organisation_expense', amountNative:-0.965, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.107, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-1.29, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.332, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-3.892, disclosureLevel:'aggregated' }, // pág. 43, precedente
  ],
  2022: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-7.705, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'7 per servizi', normalizedCategory:'admin_general_expense', amountNative:-57.737, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'8 per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-10.384, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-159.598, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-8.123, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-2.166, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.367, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-65.997, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-2.347, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-8.007, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.017, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-7.893, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-6.28, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.02, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-7.443, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-2.456, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.5, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-5.533, disclosureLevel:'aggregated' }, // pág. 27, precedente
  ],
  2020: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-4.307, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-23.876, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-6.321, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Pubblicità e spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-1.631, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.568, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-3.784, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-5.876, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-0.757, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-1.644, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-0.151, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-7.348, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-7.971, disclosureLevel:'aggregated' }, // pág. 76, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-2.064, disclosureLevel:'aggregated' }, // pág. 76, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-151.663, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-7.136, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.752, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.327, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-103.418, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.996, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-19.851, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-1.418, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-9.858, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-3.233, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'c) percentuale da riconoscere a squadre ospiti', normalizedCategory:'match_organisation_expense', amountNative:-0.241, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-3.438, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-4.717, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.005, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-4.561, disclosureLevel:'aggregated' }, // pág. 28, precedente
  ],
  2025: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-22.782, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-34.126, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-14.254, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Pubblicità e spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-8.939, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.87, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-4.627, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-8.224, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-1.861, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.525, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-4.286, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-11.697, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-11.138, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-4.664, disclosureLevel:'aggregated' }, // pág. 101, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-172.324, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-13.376, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-2.584, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'d) trattamento di quiescenza e simili', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.433, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-96.414, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-2.56, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-19.726, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-1.323, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'11 variazione delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-11.789, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'13 altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 36, Claude 0.85
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-10.798, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.186, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'c) percentuale su incassi gare a squadre ospiti', normalizedCategory:'match_organisation_expense', amountNative:-0.212, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-5.373, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.837, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-4.22, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.331, disclosureLevel:'aggregated' }, // pág. 36, precedente
  ],
  2021: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 PER MATERIE PRIME, SUSSIDIARIE, DI CONSUMO, MERCI', normalizedCategory:'other_expenses', amountNative:-4.951, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-23.049, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-5.239, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Pubblicità e spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-1.302, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.555, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-3.633, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-5.093, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-0.944, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.007, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-0.503, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-8.693, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-6.552, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-2.129, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'A) SALARI E STIPENDI', normalizedCategory:'wages_squad', amountNative:-160.309, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'B) ONERI SOCIALI', normalizedCategory:'wages_squad', amountNative:-7.315, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'C) TRATTAMENTO DI FINE RAPPORTO', normalizedCategory:'wages_squad', amountNative:-1.736, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'E) ALTRI COSTI', normalizedCategory:'wages_squad', amountNative:-0.328, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'A) AMMORTAMENTO DELLE IMMOBILIZZAZIONI IMMATERIALI', normalizedCategory:'player_amortisation', amountNative:-74.074, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'B) AMMORTAMENTO DELLE IMMOBILIZZAZIONI MATERIALI', normalizedCategory:'depreciation', amountNative:-1.666, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'C) ALTRE SVALUTAZIONI DELLE IMMOBILIZZAZIONI', normalizedCategory:'player_impairment', amountNative:-1.864, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'D) SVALUTAZIONE DEI CREDITI COMPRESI NELL\'ATTIVO CIRCOLANTE E DELLE DISPONIBILITÀ LIQUIDE', normalizedCategory:'other_expenses', amountNative:-3.545, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'12 ACCANTONAMENTI PER RISCHI', normalizedCategory:'other_amortisation', amountNative:-8.352, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'A) SPESE VARIE ORGANIZZAZIONE GARE', normalizedCategory:'match_organisation_expense', amountNative:-1.024, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'B) TASSE ISCRIZIONE GARE', normalizedCategory:'match_organisation_expense', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'C) PERCENTUALE DA RICONOSCERE A SQUADRE OSPITI', normalizedCategory:'match_organisation_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'D) COSTI PER ACQUISIZIONE TEMPORANEA CALCIATORI', normalizedCategory:'other_expenses', amountNative:-11.821, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'E) MINUSVALENZE DA CESSIONE DIRITTI PLURIENNALI PRESTAZIONI CALCIATORI', normalizedCategory:'exceptional_items', amountNative:-2.224, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'F) ALTRI ONERI DA GESTIONE CALCIATORI', normalizedCategory:'other_expenses', amountNative:-2.14, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'G) ALTRI ONERI DIVERSI DI GESTIONE', normalizedCategory:'other_expenses', amountNative:-6.363, disclosureLevel:'aggregated' }, // pág. 25, precedente
  ],
  2008: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-4.601, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-17.541, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-8.184, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-4.719, disclosureLevel:'aggregated' }, // pág. 79, Jev 1
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.337, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-2.258, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-2.861, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Mensa, ricerca e formazione del personale', normalizedCategory:'admin_general_expense', amountNative:-1.416, disclosureLevel:'aggregated' }, // pág. 79, Claude 0.88
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-1.402, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-1.06, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-3.392, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-6.812, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-1.266, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-170.936, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-4.466, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.991, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.112, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-40.62, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.093, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-2.582, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.489, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-5.119, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.004, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) oneri specifici verso squadre ospitate:', normalizedCategory:'match_organisation_expense', amountNative:-20.631, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.942, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.809, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'f) altri oneri a gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.746, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-5.537, disclosureLevel:'aggregated' }, // pág. 31, precedente
  ],
  2009: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-5.67, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-16.797, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-9.941, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-4.359, disclosureLevel:'aggregated' }, // pág. 79, Jev 1
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.325, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-2.266, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-3.043, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Mensa, ricerca e formazione del personale', normalizedCategory:'admin_general_expense', amountNative:-1.474, disclosureLevel:'aggregated' }, // pág. 79, Claude 0.88
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-1.715, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-1.335, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-5.66, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-8.949, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-172.856, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-4.807, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.03, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.116, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-40.67, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.128, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.608, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.546, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-5.767, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.001, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'c) oneri specifici verso squadre ospitate:', normalizedCategory:'match_organisation_expense', amountNative:-19.951, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-5.077, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.025, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.352, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.587, disclosureLevel:'aggregated' }, // pág. 31, precedente
  ],
  2010: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-6.13, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-19.409, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-6.191, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-4.814, disclosureLevel:'aggregated' }, // pág. 81, Jev 1
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.296, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-2.298, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-3.325, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Mensa, ricerca e formazione del personale', normalizedCategory:'admin_general_expense', amountNative:-1.361, disclosureLevel:'aggregated' }, // pág. 81, Claude 0.88
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.135, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-1.264, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-4.365, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-6.916, disclosureLevel:'aggregated' }, // pág. 83, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-2.308, disclosureLevel:'aggregated' }, // pág. 83, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-186.579, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-4.888, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.218, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.12, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-50.428, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.165, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-4.556, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-3.055, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-5.687, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'c) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-3.908, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'d) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-1.513, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'e) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.053, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'f) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-5.387, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  2011: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-5.331, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-19.878, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-6.031, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-5.81, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.294, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-2.276, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-3.48, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Mensa, ricerca e formazione del personale', normalizedCategory:'admin_general_expense', amountNative:-1.396, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.88
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.307, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-1.277, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-3.545, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-7.79, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-2.9, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-199.106, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.811, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.416, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.152, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-52.975, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.008, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.351, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-5.02, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-5.75, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.004, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.215, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.297, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.073, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'f) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.568, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
  2012: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-5.105, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-20.72, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-5.961, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-3.365, disclosureLevel:'aggregated' }, // pág. 52, Jev 1
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.318, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-2.211, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-3.472, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Mensa, ricerca e formazione del personale', normalizedCategory:'admin_general_expense', amountNative:-1.259, disclosureLevel:'aggregated' }, // pág. 52, Claude 0.88
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.153, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-1.099, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-9.363, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-7.875, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-2.358, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-176.391, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.814, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.448, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.153, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-53.676, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.954, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.115, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liq.', normalizedCategory:'other_expenses', amountNative:-2.129, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.3, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-6.863, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.002, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'c) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-1.038, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'d) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.275, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'e) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-3.1, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'f) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.796, disclosureLevel:'aggregated' }, // pág. 25, precedente
  ],
  2013: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-4.301, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-20.212, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-6.373, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Pubblicità e altre spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-3.014, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.97
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.326, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-2.208, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-3.691, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-1.185, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.224, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-1.017, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-6.641, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-7.749, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-2.429, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-144.22, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.543, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.377, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.135, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-50.818, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.884, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.086, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liq.', normalizedCategory:'other_expenses', amountNative:-0.107, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-2.35, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-5.047, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.775, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.77, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'e) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'f) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-5.17, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
  2019: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-5.145, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-20.176, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-6.981, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Pubblicità e spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-2.184, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.436, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-2.849, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-5.728, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-1.528, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-1.731, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-0.722, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-8.588, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-7.658, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-1.502, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-175.946, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-6.789, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.818, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.269, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-89.15, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.051, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.934, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.85, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-6.885, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-5.235, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.002, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'c) percentuale da riconoscere a squadre ospiti', normalizedCategory:'match_organisation_expense', amountNative:-0.199, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-13.18, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.449, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.157, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-4.233, disclosureLevel:'aggregated' }, // pág. 38, precedente
  ],
};
const acmilanitFiscalYearMeta = {
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 672. D) rettifiche quedaban sin lado; las dos filas se llaman igual (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (800). ver el anterior (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
  2024: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'acmilan-it-bilanci-relazioni-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.925, tax:-8.162,
    extraRows: [
      {label:'- altri', value:11.133},
      {label:'d) altri oneri finanziari', value:-11.619},
      {label:'a) utili su cambi', value:0.037},
      {label:'b) perdite su cambi', value:-0.348},
      {label:'rivalutazioni di partecipazioni', value:0.672},
      {label:'svalutazioni di partecipazioni (19, costo)', value:-0.8},
      {label:'a) imposte correnti', value:-10.203},
      {label:'b) imposte differite e anticipate', value:2.041},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:456.941, officialTotalExpenses:443.193, officialPAT:4.106,
  },
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fx:0.9203, fxSource:'manual',
    sourceId:'acmilan-it-bilanci-relazioni-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.392, tax:-7.468,
    extraRows: [
      {label:'- altri', value:2.151},
      {label:'d) altri oneri finanziari', value:-5.167},
      {label:'a) utili su cambi', value:0.086},
      {label:'b) perdite su cambi', value:-0.084},
      {label:'a) di partecipazioni', value:1.822},
      {label:'a) di partecipazioni', value:-0.2},
      {label:'a) imposte correnti', value:-7.697},
      {label:'b) imposte differite e anticipate', value:0.229},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:404.529, officialTotalExpenses:389.557, officialPAT:6.07,
  },
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (218). D) rettifiche quedan sin lado: 19) a) svalutazioni di partecipazioni (218), TOTALE D (218) L1018; igual que AC Milan 2023-24 (to-do 155)
  2018: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'acmilan-it-bilanci-relazioni-2017-18',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-22.561, tax:-4.803,
    extraRows: [
      {label:'- altri', value:1.531},
      {label:'d) altri oneri finanziari', value:-23.844},
      {label:'a) utili su cambi', value:0.027},
      {label:'b) perdite su cambi', value:-0.057},
      {label:'svalutazioni di partecipazioni (19, costo)', value:-0.218},
      {label:'a) imposte correnti', value:-2.556},
      {label:'b) imposte differite e anticipate', value:-2.247},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:255.733, officialTotalExpenses:353.098, officialPAT:-126.019,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 521. D) rettifiche sin lado: 18) a) rivalutazioni di partecipazioni 521 (TOTALE D (479), L844); igual que AC Milan 2023-24 (to-do 155)
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (1.000). D) rettifiche sin lado: 19) a) svalutazioni di partecipazioni (1.000); ver el anterior (to-do 155)
  2022: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fx:0.9627, fxSource:'manual',
    sourceId:'acmilan-it-bilanci-relazioni-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.079, tax:-6.478,
    extraRows: [
      {label:'- altri', value:0.023},
      {label:'d) altri oneri finanziari', value:-4.501},
      {label:'a) utili su cambi', value:0.002},
      {label:'b) perdite su cambi', value:-0.124},
      {label:'rivalutazioni di partecipazioni', value:0.521},
      {label:'svalutazioni di partecipazioni (19, costo)', value:-1},
      {label:'a) imposte correnti', value:-4.209},
      {label:'b) imposte differite e anticipate', value:-2.269},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:297.592, officialTotalExpenses:350.117, officialPAT:-66.537,
  },
  2020: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'acmilan-it-bilanci-relazioni-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.798, tax:-2.219,
    extraRows: [
      {label:'- altri', value:0.612},
      {label:'d) altri oneri finanziari', value:-6.954},
      {label:'a) utili su cambi', value:0.035},
      {label:'b) perdite su cambi', value:-0.03},
      {label:'a) di partecipazioni', value:0.539},
      {label:'a) imposte correnti', value:-0.372},
      {label:'b) imposte differite e anticipate', value:-1.847},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:192.315, officialTotalExpenses:374.198, officialPAT:-194.616,
  },
  2025: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'acmilan-it-bilanci-relazioni-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.251, tax:-6.804,
    extraRows: [
      {label:'- altri', value:8.054},
      {label:'d) altri oneri finanziari', value:-14.527},
      {label:'a) utili su cambi', value:0.176},
      {label:'b) perdite su cambi', value:-0.735},
      {label:'a) di partecipazioni', value:0.781},
      {label:'a) imposte correnti', value:-9.193},
      {label:'b) imposte differite e anticipate', value:2.389},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:494.53, officialTotalExpenses:477.642, officialPAT:2.994,
  },
  2021: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'acmilan-it-bilanci-relazioni-2020-21',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.23, tax:-4.864,
    extraRows: [
      {label:'- ALTRI', value:1.413},
      {label:'D) ALTRI ONERI FINANZIARI', value:-4.673},
      {label:'A) UTILI SU CAMBI', value:0.013},
      {label:'B) PERDITE SU CAMBI', value:-0.01},
      {label:'A) DI PARTECIPAZIONI', value:-1.973},
      {label:'A) IMPOSTE CORRENTI', value:-3.363},
      {label:'B) IMPOSTE DIFFERITE E ANTICIPATE', value:-1.501},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:261.092, officialTotalExpenses:345.19, officialPAT:-96.416,
  },
  2008: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2008-12-31',
    sourceId:'acmilan-it-bilancio-gruppo-dic-2008',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-7.507, tax:13.695,
    extraRows: [
      {label:'- altri', value:0.45},
      {label:'e) proventi da compartecipazioni ex art. 102 bis N.O.I.F.', value:7.015},
      {label:'c) verso imprese controllanti', value:-0.067},
      {label:'d) altri oneri finanziari', value:-12.915},
      {label:'e) oneri da compartecipazioni ex art. 102 bis N.O.I.F.', value:-1.649},
      {label:'a) utili su cambi', value:0.009},
      {label:'b) perdite su cambi', value:-0.26},
      {label:'a) di partecipazioni', value:-0.048},
      {label:'a) plusvalenze da alienazioni', value:0.006},
      {label:'a) minusvalenze da alienazioni', value:-0.003},
      {label:'b) imposte relative ad esercizi precedenti', value:-0.045},
      {label:'a) imposte correnti', value:20.897},
      {label:'b) imposte differite e anticipate', value:-7.202},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:237.9, officialTotalExpenses:310.117, officialPAT:-66.838,
  },
  2009: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2009-12-31',
    sourceId:'acmilan-it-bilancio-gruppo-dic-2009',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.246, tax:-11.152,
    extraRows: [
      {label:'- altri', value:0.185},
      {label:'e) proventi da compartecipazioni ex art. 102 bis N.O.I.F.', value:6.742},
      {label:'c) verso imprese controllanti', value:-0.267},
      {label:'d) altri oneri finanziari', value:-8.31},
      {label:'e) oneri da compartecipazioni ex art. 102 bis N.O.I.F.', value:-1.25},
      {label:'a) utili su cambi', value:0.004},
      {label:'b) perdite su cambi', value:-0.082},
      {label:'a) di partecipazioni', value:-0.262},
      {label:'a) plusvalenze da alienazioni', value:0.001},
      {label:'a) minusvalenze da alienazioni', value:-0.007},
      {label:'a) imposte correnti', value:7.742},
      {label:'b) imposte differite e anticipate', value:-18.894},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:327.617, officialTotalExpenses:323.03, officialPAT:-9.836,
  },
  2010: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2010-12-31',
    sourceId:'acmilan-it-bilancio-gruppo-dic-2010',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-8.23, tax:15.655,
    extraRows: [
      {label:'- altri', value:0.559},
      {label:'e) proventi da compartecipazioni ex art. 102 bis N.O.I.F.', value:0.34},
      {label:'c) verso imprese controllanti', value:-0.07},
      {label:'d) altri oneri finanziari', value:-8.285},
      {label:'e) oneri da compartecipazioni ex art. 102 bis N.O.I.F.', value:-0.65},
      {label:'a) utili su cambi', value:0.052},
      {label:'b) perdite su cambi', value:-0.022},
      {label:'a) di partecipazioni', value:-0.186},
      {label:'a) plusvalenze da alienazioni', value:0.04},
      {label:'a) minusvalenze da alienazioni', value:-0.008},
      {label:'a) imposte correnti', value:10.695},
      {label:'b) imposte differite e anticipate', value:4.96},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:253.196, officialTotalExpenses:328.859, officialPAT:-69.751,
  },
  // 2011: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (101). Claude 2026-10-08 (Guido: a mano): la extracción se salteó la sección D de 2011 (.md L1006-L1010: a) di partecipazioni (96), b) di immobilizzazioni finanziarie (5), Totale (101), TOTALE D (101)); sin ella el resultado daba −67,233 M contra −67,334 M impreso. Sin línea a propósito: el escalón de la sección D sigue trayendo las filas de la E
  2011: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2011-12-31',
    sourceId:'acmilan-it-bilancio-gruppo-dic-2011',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.416, tax:13.332,
    extraRows: [
      {label:'- altri', value:0.46},
      {label:'e) proventi da compartecipazioni ex art. 102 bis N.O.I.F.', value:6.25},
      {label:'c) verso imprese controllanti', value:-0.007},
      {label:'d) altri oneri finanziari', value:-9.892},
      {label:'e) oneri da compartecipazioni ex art. 102 bis N.O.I.F.', value:-1.751},
      {label:'a) utili su cambi', value:0.001},
      {label:'b) perdite su cambi', value:-0.003},
      {label:'Rettifiche di valore di attività finanziarie (D)', value:-0.101},
      {label:'a) plusvalenze da alienazioni', value:0.003},
      {label:'a) minusvalenze da alienazioni', value:-0.007},
      {label:'b) imposte relative ad esercizi precedenti', value:-1.369},
      {label:'a) imposte correnti', value:9.362},
      {label:'b) imposte differite e anticipate', value:3.97},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:266.811, officialTotalExpenses:340.764, officialPAT:-67.334,
  },
  2012: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2012-12-31',
    sourceId:'acmilan-it-bilancio-gruppo-dic-2012',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.951, tax:-5.9,
    extraRows: [
      {label:'- altri', value:0.111},
      {label:'e) proventi da compartecipazioni ex art. 102 bis N.O.I.F.', value:0.06},
      {label:'d) altri oneri finanziari', value:-13.335},
      {label:'e) oneri da compartecipazioni ex art. 102 bis N.O.I.F.', value:-0.3},
      {label:'a) utili su cambi', value:0.002},
      {label:'b) perdite su cambi', value:-0.018},
      {label:'a) di partecipazioni', value:-0.105},
      {label:'a) plusvalenze da alienazioni', value:0.007},
      {label:'b) sopravvenienze attive straordinarie', value:7.704},
      {label:'a) minusvalenze da alienazioni', value:-0.012},
      {label:'b) imposte relative ad esercizi precedenti', value:-0.065},
      {label:'a) imposte correnti', value:-2.314},
      {label:'b) imposte differite e anticipate', value:-3.586},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:329.307, officialTotalExpenses:324.038, officialPAT:-6.857,
  },
  2013: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2013-12-31',
    sourceId:'acmilan-it-bilancio-gruppo-dic-2013',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-12.886, tax:-2.895,
    extraRows: [
      {label:'- altri', value:0.018},
      {label:'e) proventi da compartecipazioni ex art. 102 bis N.O.I.F.', value:0.03},
      {label:'c) verso imprese controllanti', value:null},
      {label:'d) altri oneri finanziari', value:-8.305},
      {label:'e) oneri da compartecipazioni ex art. 102 bis N.O.I.F.', value:-4.489},
      {label:'a) utili su cambi', value:null},
      {label:'b) perdite su cambi', value:-0.031},
      {label:'a) di partecipazioni', value:0.013},
      {label:'a) plusvalenze da alienazioni', value:0.04},
      {label:'a) minusvalenze da alienazioni', value:-0.108},
      {label:'b) imposte relative ad esercizi precedenti', value:-0.054},
      {label:'a) imposte correnti', value:-0.174},
      {label:'b) imposte differite e anticipate', value:-2.721},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:278.713, officialTotalExpenses:277.885, officialPAT:-15.723,
  },
  2019: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'acmilan-it-bilanci-relazioni-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-10.281, tax:-3.447,
    extraRows: [
      {label:'- altri', value:0.687},
      {label:'d) altri oneri finanziari', value:-11.788},
      {label:'a) utili su cambi', value:0.031},
      {label:'b) perdite su cambi', value:-0.012},
      {label:'a) di partecipazioni', value:0.801},
      {label:'a) imposte correnti', value:-1.196},
      {label:'b) imposte differite e anticipate', value:-2.251},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:241.118, officialTotalExpenses:372.926, officialPAT:-145.985,
  },
};
const acmilanitPresupuestoOverlayByYear = {};

const acmilanitPasesData = [];
const acmilanitResultadosData = {};
const acmilanitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['acmilan-it'] = {
  revenueLinesByYear: acmilanitRevenueLinesByYear, expenseLinesByYear: acmilanitExpenseLinesByYear,
  fiscalYearMeta: acmilanitFiscalYearMeta, pasesData: acmilanitPasesData,
  resultadosData: acmilanitResultadosData, titulosData: acmilanitTitulosData,
  presupuestoOverlayByYear: acmilanitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'acmilan-it-bilanci-relazioni-2023-24': {
    id:'acmilan-it-bilanci-relazioni-2023-24', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilanci-relazioni-2022-23': {
    id:'acmilan-it-bilanci-relazioni-2022-23', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilanci-relazioni-2017-18': {
    id:'acmilan-it-bilanci-relazioni-2017-18', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2017-18 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilanci-relazioni-2021-22': {
    id:'acmilan-it-bilanci-relazioni-2021-22', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilanci-relazioni-2019-20': {
    id:'acmilan-it-bilanci-relazioni-2019-20', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilanci-relazioni-2024-25': {
    id:'acmilan-it-bilanci-relazioni-2024-25', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilanci-relazioni-2020-21': {
    id:'acmilan-it-bilanci-relazioni-2020-21', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2020-21 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilancio-gruppo-dic-2008': {
    id:'acmilan-it-bilancio-gruppo-dic-2008', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilancio-gruppo-dic-2008 (ejercicio 2008)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2008.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilancio-gruppo-dic-2009': {
    id:'acmilan-it-bilancio-gruppo-dic-2009', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilancio-gruppo-dic-2009 (ejercicio 2009)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2009.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilancio-gruppo-dic-2010': {
    id:'acmilan-it-bilancio-gruppo-dic-2010', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilancio-gruppo-dic-2010 (ejercicio 2010)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilancio-gruppo-dic-2011': {
    id:'acmilan-it-bilancio-gruppo-dic-2011', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilancio-gruppo-dic-2011 (ejercicio 2011)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilancio-gruppo-dic-2012': {
    id:'acmilan-it-bilancio-gruppo-dic-2012', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilancio-gruppo-dic-2012 (ejercicio 2012)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilancio-gruppo-dic-2013': {
    id:'acmilan-it-bilancio-gruppo-dic-2013', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilancio-gruppo-dic-2013 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'acmilan-it-bilanci-relazioni-2018-19': {
    id:'acmilan-it-bilanci-relazioni-2018-19', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['acmilan-it'] = null;

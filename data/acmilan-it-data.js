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
});

memberCountByClub['acmilan-it'] = null;

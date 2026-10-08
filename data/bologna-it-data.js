// ============================================================================
// data/bologna-it-data.js — Bologna F.C. 1909 S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "bologna-it" — slug de "Bologna" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Bologna F.C. 1909 S.p.A." — el .md, 47 veces (nombre del club + forma societaria)
//   displayName        ok        "Bologna" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (149 de 151 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] bologna: #1B2838 Navy Blue, #9F1F33 Dark Red, #FFFFFF White, #DEDEE2 Light Grey
//   anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (contenido del .md (149 de 151 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
//   sourceId           ok        "bologna-it-bilancio-consolidato-2018-19" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Bologna"
//
// FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"bologna-it-bilancio-consolidato-2018-19"}
// ============================================================================

const bolognaitRevenueLinesByYear = {
  // 2020: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-consolidato-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'1) ricavi delle vendite e delle prestazioni', normalizedCategory:'matchday_competition', amountNative:4.493215, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.882444, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:4.093425, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.889771, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:6.495607, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:33.871885, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.059484, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:1.291423, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Plusvalenze da cessione diritti calciatori', normalizedCategory:'player_sales', amountNative:17.164895, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:1.526886, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:1.605715, disclosureLevel:'aggregated' }, // pág. 56, precedente
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-consolidato-2020-21.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'1) ricavi delle vendite e delle prestazioni', normalizedCategory:'matchday_competition', amountNative:0.00875, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:1.724809, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:4.426134, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.729673, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:4.110633, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:62.734806, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.055014, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.55194, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Plusvalenze da cessione diritti calciatori', normalizedCategory:'player_sales', amountNative:3.236345, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:1.806671, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:2.276001, disclosureLevel:'aggregated' }, // pág. 57, precedente
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-consolidato-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'1) ricavi delle vendite e delle prestazioni', normalizedCategory:'matchday_competition', amountNative:4.50158, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:1.962486, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:4.051018, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:6.936721, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:1.921631, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:41.848063, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.045, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.469115, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Plusvalenze da cessione diritti calciatori', normalizedCategory:'player_sales', amountNative:15.237416, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:2.568116, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:0.83119, disclosureLevel:'aggregated' }, // pág. 64, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'1) ricavi delle vendite e delle prestazioni', normalizedCategory:'matchday_competition', amountNative:5.776763, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:1.142206, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:1.238095, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:4.158432, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.59455, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:7.021703, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:44.102006, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.040739, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:1.674437, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Plusvalenze da cessione diritti calciatori', normalizedCategory:'player_sales', amountNative:15.154912, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:1.83184, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:2.927466, disclosureLevel:'aggregated' }, // pág. 53, precedente
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-consolidato-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'1) ricavi delle vendite e delle prestazioni', normalizedCategory:'matchday_competition', amountNative:5.284022, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:2.112772, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:1.698621, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:4.389407, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.558119, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:6.41123, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:36.09453, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.021778, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:2.098343, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Plusvalenze da cessione diritti calciatori', normalizedCategory:'player_sales', amountNative:27.506574, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.826721, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:5.812877, disclosureLevel:'aggregated' }, // pág. 56, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-consolidato-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:4.026784, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:2.377419, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'c) altri', normalizedCategory:'other_income', amountNative:0.0125, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:2.540974, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:6.038556, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:9.597107, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.268162, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:47.020087, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.054, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'f) ricavi da cessione temporanea prestazione calciatori', normalizedCategory:'player_sales', amountNative:0.30773, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.98
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazione calciatori', normalizedCategory:'player_sales', amountNative:34.520674, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:6.914074, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:1.645245, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-individuale-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-individuale-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:5.605794, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:2.989694, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:3.319329, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'b) proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:5.245655, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:11.88499, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:3.469603, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:62.645472, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.000453, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:24.0133, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:7.172215, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:1.456947, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-individuale-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Bologna/Bologna-bilancio-individuale-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:8.101739, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:1.064466, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'b) proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:6.377678, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:18.748548, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.877283, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:90.644565, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:1.6355, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:77.424567, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:6.884461, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:1.745884, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:8.65599, disclosureLevel:'aggregated' }, // pág. 25, precedente
  ],
};
const bolognaitExpenseLinesByYear = {
  2020: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.424157, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.992574, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-2.174215, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.91
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.434508, disclosureLevel:'aggregated' }, // pág. 58, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.1654, disclosureLevel:'aggregated' }, // pág. 58, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.311562, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.95
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-4.944371, disclosureLevel:'aggregated' }, // pág. 58, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.063853, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.96
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-47.623939, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.097375, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.92
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.648654, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-32.469132, disclosureLevel:'aggregated' }, // pág. 60, Jev 0.97
    { rawLabel:'Costi impianto ed ampliamento', normalizedCategory:'other_amortisation', amountNative:-0.000246, disclosureLevel:'aggregated' }, // pág. 60, Jev 0.92
    { rawLabel:'Concessioni, licenze e marchi e diritti simili', normalizedCategory:'other_amortisation', amountNative:-0.221074, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
    { rawLabel:'Costi del vivaio giovanile', normalizedCategory:'other_amortisation', amountNative:-1.492709, disclosureLevel:'aggregated' }, // pág. 60, Claude 0.8
    { rawLabel:'Costi pluriennali su beni di terzi', normalizedCategory:'other_amortisation', amountNative:-1.554083, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'terreni e fabbricati "costruzioni leggere"', normalizedCategory:'depreciation', amountNative:-0.288976, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.042544, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.065181, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.120826, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.126634, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.96
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:-1.307014, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.022, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.850743, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.005, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.99
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.384, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.99
    { rawLabel:'Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.206012, disclosureLevel:'aggregated' }, // pág. 61, Jev 1
    { rawLabel:'Altri oneri da gestione calciatori:', normalizedCategory:'other_expenses', amountNative:-1.618718, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.99
    { rawLabel:'- Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.039547, disclosureLevel:'aggregated' }, // pág. 62, Jev 1
    { rawLabel:'- Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.249291, disclosureLevel:'aggregated' }, // pág. 62, Jev 1
    { rawLabel:'- Altri', normalizedCategory:'other_expenses', amountNative:-1.914126, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.99
  ],
  2021: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.437327, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.835568, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.889538, disclosureLevel:'aggregated' }, // pág. 59, Jev 0.91
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.548743, disclosureLevel:'aggregated' }, // pág. 59, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.001131, disclosureLevel:'aggregated' }, // pág. 59, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.480709, disclosureLevel:'aggregated' }, // pág. 59, Jev 0.95
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-4.917788, disclosureLevel:'aggregated' }, // pág. 59, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.259582, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.96
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-53.953723, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.166168, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.92
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.634263, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-29.480048, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.97
    { rawLabel:'Costi impianto ed ampliamento', normalizedCategory:'other_amortisation', amountNative:-0.001161, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.92
    { rawLabel:'Concessioni, licenze e marchi e diritti simili', normalizedCategory:'other_amortisation', amountNative:-0.222705, disclosureLevel:'aggregated' }, // pág. 61, Jev 1
    { rawLabel:'Costi del vivaio giovanile', normalizedCategory:'other_amortisation', amountNative:-1.054562, disclosureLevel:'aggregated' }, // pág. 61, Claude 0.8
    { rawLabel:'Costi pluriennali su beni di terzi', normalizedCategory:'other_amortisation', amountNative:-0.345645, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'terreni e fabbricati “costruzioni leggere”', normalizedCategory:'depreciation', amountNative:-0.331557, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.024833, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.067158, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.091419, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.427979, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.96
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:-0.375749, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.98
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.496393, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.00582, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.99
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.553333, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.99
    { rawLabel:'Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.192929, disclosureLevel:'aggregated' }, // pág. 62, Jev 1
    { rawLabel:'- Contributi solidarietà', normalizedCategory:'player_amortisation', amountNative:-0.009829, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'- Premi alla carriera', normalizedCategory:'wages_squad', amountNative:-0.09, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'- Premio di rendimento', normalizedCategory:'wages_squad', amountNative:-1.251, disclosureLevel:'aggregated' }, // pág. 63, Jev 0.99
    { rawLabel:'- Premi di preparazione ex. art. 96 N.O.I.F.', normalizedCategory:'player_amortisation', amountNative:-0.136, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'- Accantonamento rischi altri oneri gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.018, disclosureLevel:'aggregated' }, // pág. 63, Jev 1
    { rawLabel:'- Sopravvenienze attive altri oneri gestione calciatori', normalizedCategory:'other_expenses', amountNative:0.015253, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'- Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.032873, disclosureLevel:'aggregated' }, // pág. 63, Jev 1
    { rawLabel:'- Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.201585, disclosureLevel:'aggregated' }, // pág. 63, Jev 1
    { rawLabel:'- Altri', normalizedCategory:'other_expenses', amountNative:-2.094208, disclosureLevel:'aggregated' }, // pág. 63, Jev 0.99
  ],
  2022: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.357946, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.351753, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-1.735484, disclosureLevel:'aggregated' }, // pág. 65, Jev 0.91
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.613084, disclosureLevel:'aggregated' }, // pág. 65, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.131198, disclosureLevel:'aggregated' }, // pág. 65, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.973454, disclosureLevel:'aggregated' }, // pág. 65, Jev 0.95
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-5.438533, disclosureLevel:'aggregated' }, // pág. 65, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.152537, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.96
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-63.456626, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.48589, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.92
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.697597, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-34.448916, disclosureLevel:'aggregated' }, // pág. 68, Jev 0.97
    { rawLabel:'Costi impianto ed ampliamento', normalizedCategory:'other_amortisation', amountNative:-0.003228, disclosureLevel:'aggregated' }, // pág. 68, Jev 0.92
    { rawLabel:'Concessioni, licenze e marchi e diritti simili', normalizedCategory:'other_amortisation', amountNative:-0.221298, disclosureLevel:'aggregated' }, // pág. 68, Jev 1
    { rawLabel:'Costi del vivaio giovanile', normalizedCategory:'other_amortisation', amountNative:-0.650639, disclosureLevel:'aggregated' }, // pág. 68, Claude 0.8
    { rawLabel:'Costi pluriennali su beni di terzi', normalizedCategory:'other_amortisation', amountNative:-0.246995, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'terreni e fabbricati “costruzioni leggere”', normalizedCategory:'depreciation', amountNative:-0.345997, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.019518, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.063434, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.098631, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.459221, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.96
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.45, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.023412, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.01682, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.99
    { rawLabel:'Oneri specifici verso squadre ospitate:', normalizedCategory:'match_organisation_expense', amountNative:-0.013331, disclosureLevel:'aggregated' }, // pág. 69, Jev 1
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.1885, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.99
    { rawLabel:'Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.952237, disclosureLevel:'aggregated' }, // pág. 69, Jev 1
    { rawLabel:'- Contributi solidarietà', normalizedCategory:'player_amortisation', amountNative:-0.143354, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'- Premio di rendimento', normalizedCategory:'wages_squad', amountNative:-1.462922, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.99
    { rawLabel:'- Premi di preparazione ex. art. 96 N.O.I.F.', normalizedCategory:'player_amortisation', amountNative:-0.06475, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'- Costi di convocazione in Nazionale', normalizedCategory:'other_expenses', amountNative:-0.002756, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'- Sopravvenienze attive altri oneri di gestione calciatori', normalizedCategory:'other_expenses', amountNative:0.007466, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'- Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.0495, disclosureLevel:'aggregated' }, // pág. 69, Jev 1
    { rawLabel:'- Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.434205, disclosureLevel:'aggregated' }, // pág. 69, Jev 1
    { rawLabel:'- Altri', normalizedCategory:'other_expenses', amountNative:-1.365852, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.99
  ],
  2019: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.385357, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.204258, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-1.239954, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.557934, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.220389, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.111702, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-4.264945, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.074, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-57.009902, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.95
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.247284, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.690248, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-23.142564, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'terreni e fabbricati "costruzioni leggere"', normalizedCategory:'depreciation', amountNative:-0.268982, disclosureLevel:'aggregated' }, // pág. 57, Claude 0.9
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.034294, disclosureLevel:'aggregated' }, // pág. 57, Claude 0.9
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.075719, disclosureLevel:'aggregated' }, // pág. 57, Claude 0.9
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.072217, disclosureLevel:'aggregated' }, // pág. 57, Claude 0.9
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.666228, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:-0.4127, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.92
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.276006, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.00699, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.98
    { rawLabel:'- percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.230687, disclosureLevel:'aggregated' }, // pág. 58, Claude 0.8
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-1.789712, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'- Contributi a società affiliate', normalizedCategory:'other_expenses', amountNative:-0.180328, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'- Contributi solidarietà', normalizedCategory:'player_amortisation', amountNative:-0.069845, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'- Premio di rendimento', normalizedCategory:'wages_squad', amountNative:-0.745875, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.91
    { rawLabel:'- Premi di preparazione ex.art. 96 N.O.I.F.', normalizedCategory:'player_amortisation', amountNative:-0.070719, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'- Sopravvenienze passive altri oneri di gestione', normalizedCategory:'exceptional_items', amountNative:-0.088816, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'- Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-1.139447, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'- Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.273999, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.99
    { rawLabel:'- Altri', normalizedCategory:'other_expenses', amountNative:-0.827468, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.99
  ],
  2018: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.330388, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.859964, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-2.216239, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.477731, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.203425, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.998758, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-4.198298, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-1.884395, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-46.46697, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.606746, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.616113, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-14.529362, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Concessioni, licenze e marchi e diritti simili', normalizedCategory:'other_amortisation', amountNative:-0.237132, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costi del vivaio giovanile', normalizedCategory:'other_amortisation', amountNative:-1.991281, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costi pluriennali su beni di terzi', normalizedCategory:'other_amortisation', amountNative:-1.434066, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'terreni e fabbricati "costruzioni leggere"', normalizedCategory:'depreciation', amountNative:-0.269051, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.027132, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.063828, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.083263, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.639601, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:-0.124982, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-1.35, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.177417, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.008457, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.023968, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.15277, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-1.453097, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Contributi a società affiliate', normalizedCategory:'other_expenses', amountNative:-0.058144, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Premio di rendimento', normalizedCategory:'wages_squad', amountNative:-4.9, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Premi di preparazione ex.art. 96 N.O.I.F.', normalizedCategory:'player_amortisation', amountNative:-0.087846, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-3.06183, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.253329, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'- Altri', normalizedCategory:'other_expenses', amountNative:-0.800582, disclosureLevel:'aggregated' }, // pág. 61, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.463854, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.334143, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-1.82168, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.958882, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.128244, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.034241, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-7.072472, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.346416, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-64.317881, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.927103, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.845311, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-30.144411, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Costi impianto ed ampliamento', normalizedCategory:'other_amortisation', amountNative:-0.003227, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Concessioni, licenze e marchi e diritti simili', normalizedCategory:'other_amortisation', amountNative:-0.220358, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Costi del vivaio giovanile', normalizedCategory:'other_amortisation', amountNative:-0.228316, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Costi pluriennali su beni di terzi', normalizedCategory:'other_amortisation', amountNative:-0.190869, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'terreni e fabbricati “costruzioni leggere”', normalizedCategory:'depreciation', amountNative:-0.349772, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.015878, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.071005, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.100287, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-3.957361, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-1.052335, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.299532, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.016053, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Oneri specifici verso squadre ospitate:', normalizedCategory:'match_organisation_expense', amountNative:-0.061896, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.5655, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.349908, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'d) altri oneri da trasferimento calciatori', normalizedCategory:'other_expenses', amountNative:-1.759443, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.92
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-2.003196, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
  ],
  2024: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.566205, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.720328, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-2.443669, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.003073, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.100622, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.057236, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-5.858302, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.343208, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-64.389834, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.81673, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.846228, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-29.721144, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Concessioni, licenze e marchi e diritti simili', normalizedCategory:'other_amortisation', amountNative:-0.218687, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Costi pluriennali su beni di terzi', normalizedCategory:'other_amortisation', amountNative:-0.078138, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.078732, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.101277, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.06878, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-2.188692, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.548989, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.03502, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Oneri specifici verso squadre ospitate:', normalizedCategory:'match_organisation_expense', amountNative:-0.115382, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-1.75976, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.150747, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-7.779245, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.769028, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  2025: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.956903, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-3.446071, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-5.745128, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-2.063679, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.093794, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.573627, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-9.174327, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-4.341546, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-77.930898, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.169913, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.014575, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-35.718991, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Diritti di brevetto e diritti industriali', normalizedCategory:'other_amortisation', amountNative:-0.01513, disclosureLevel:'aggregated' }, // pág. 61, Claude 0.9
    { rawLabel:'Concessioni, licenze e marchi e diritti simili', normalizedCategory:'other_amortisation', amountNative:-0.199953, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Costi pluriennali su beni di terzi', normalizedCategory:'other_amortisation', amountNative:-0.5052, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'terreni e fabbricati “costruzioni leggere”', normalizedCategory:'depreciation', amountNative:-0.04712, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'impianti e macchinari', normalizedCategory:'depreciation', amountNative:-0.207553, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'attrezzature industriali e commerciali', normalizedCategory:'depreciation', amountNative:-0.111155, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'altri beni', normalizedCategory:'depreciation', amountNative:-0.136704, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-8.184046, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:-0.767223, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-2.488495, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-1.681063, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.000001, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-37.142597, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.877001, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
};
const bolognaitFiscalYearMeta = {
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (670.894). Formato Codice Civile: el 17) "interessi ed altri oneri finanziari" se imprime en positivo y se resta por posición (C = 15+16-17); el script lo sumaba. Se reemplaza solo la fila de esa línea: "altri" también rotula el 5) de ingresos y el 16) (to-do 157/158).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.868.716). Rettifiche D sin lado en la extracción: 19) a) svalutazioni di partecipazioni 1.868.716, impreso en positivo y restado (Totale D (1.868.716), L960). Va del lado financiero, como las rettifiche D de Milan 2023-24 e Inter 2021-22 (to-do 157).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 882.444. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.093.425. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 889.771. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 6.495.607. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 33.871.885. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 59.484. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.291.423. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 17.164.895. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.526.886. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.605.715. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
  2020: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'bologna-it-bilancio-consolidato-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.535436, tax:-0.498916,
    extraRows: [
      {label:'altri', value:null},
      {label:'altri', value:0.001931},
      {label:'17-bis) utili e perdite su cambi', value:0.002243},
      {label:'altri oneri finanziari (17, costo)', value:-0.670894},
      {label:'svalutazioni di partecipazioni (D 19, costo)', value:-1.868716},
      {label:'imposte correnti', value:-0.591876},
      {label:'imposte relative a esercizi precedenti', value:0.094384},
      {label:'imposte differite e anticipate', value:-0.001424},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:72.37475, officialTotalExpenses:108.652452, officialPAT:-39.518065,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.297.992). Formato Codice Civile: el 17) "interessi ed altri oneri finanziari" se imprime en positivo y se resta por posición (C = 15+16-17); el script lo sumaba. Se reemplaza solo la fila de esa línea: "altri" también rotula el 5) de ingresos y el 16) (to-do 157/158).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.724.809. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.426.134. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 729.673. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.110.633. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 62.734.806. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 55.014. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 551.940. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 3.236.345. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.806.671. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 2.276.001. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
  2021: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'bologna-it-bilancio-consolidato-2020-21',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.080163, tax:-0.81277,
    extraRows: [
      {label:'altri', value:0.217766},
      {label:'17-bis) utili e perdite su cambi', value:0.000063},
      {label:'altri oneri finanziari (17, costo)', value:-1.297992},
      {label:'imposte correnti', value:-0.905396},
      {label:'imposte relative a esercizi precedenti', value:0.09405},
      {label:'imposte differite e anticipate', value:-0.001424},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:81.660776, officialTotalExpenses:110.421144, officialPAT:-30.84623,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.384.360). Formato Codice Civile: el 17) "interessi ed altri oneri finanziari" se imprime en positivo y se resta por posición (C = 15+16-17); el script lo sumaba. Se reemplaza solo la fila de esa línea: "altri" también rotula el 5) de ingresos y el 16) (to-do 157/158).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.962.486. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.051.018. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 6.936.721. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.921.631. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 41.848.063. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 45.000. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 469.115. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 15.237.416. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 2.568.116. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 831.190. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
  2022: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'bologna-it-bilancio-consolidato-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.223922, tax:-0.730404,
    extraRows: [
      {label:'altri', value:0.004561},
      {label:'17-bis) utili e perdite su cambi', value:0.155877},
      {label:'altri oneri finanziari (17, costo)', value:-1.38436},
      {label:'imposte correnti', value:-0.779656},
      {label:'imposte relative a esercizi precedenti', value:0.050676},
      {label:'imposte differite e anticipate', value:-0.001424},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:80.372336, officialTotalExpenses:124.159915, officialPAT:-46.694143,
  },
  2019: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'bologna-it-bilancio-consolidato-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.55652, tax:-1.44418,
    extraRows: [
      {label:'altri', value:0.000002},
      {label:'altri', value:0.006223},
      {label:'altri', value:-0.554378},
      {label:'17-bis) utili e perdite su cambi', value:-0.008367},
      {label:'imposte correnti', value:-1.566167},
      {label:'imposte relative a esercizi precedenti', value:0.116973},
      {label:'imposte differite e anticipate', value:0.005014},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:85.663149, officialTotalExpenses:105.289753, officialPAT:-21.716119,
  },
  2018: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'bologna-it-bilancio-consolidato-2017-18',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.446888, tax:-1.600572,
    extraRows: [
      {label:'altri', value:0.000002},
      {label:'altri', value:0.011128},
      {label:'altri', value:-0.458018},
      {label:'imposte correnti', value:-1.838328},
      {label:'imposte relative a esercizi precedenti', value:0.239179},
      {label:'imposte differite e anticipate', value:-0.001423},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:92.814994, officialTotalExpenses:94.133068, officialPAT:-4.818634,
  },
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'bologna-it-bilancio-consolidato-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.705322, tax:-2.294954,
    extraRows: [
      {label:'c) da titoli iscritti nell\'attivo circolante che non ncostituiscono partecipazioni', value:0.000159},
      {label:'Altri', value:1.711694},
      {label:'Altri', value:-2.409366},
      {label:'17-bis) utili e perdite su cambi', value:-0.007809},
      {label:'imposte correnti', value:-2.322996},
      {label:'imposte relative a esercizi precedenti', value:0.029466},
      {label:'imposte differite e anticipate', value:-0.001424},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:117.323312, officialTotalExpenses:130.289666, officialPAT:-16.316537,
  },
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (6.450.122). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): Codice Civile: el 17) interessi ed altri oneri finanziari se imprime en positivo y se resta por posición; el script lo sumaba (mismo caso que Bologna 2019-20, 2020-21 y 2025)
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (259.314). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): rettifiche D 19) a) svalutazioni di partecipazioni impreso en positivo y restado
  2024: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'bologna-it-bilancio-individuale-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.117214, tax:-2.335748,
    extraRows: [
      {label:'Imprese controllate', value:0.316104},
      {label:'b) proventi finanziari da titoli immobilizz.', value:0.000045},
      {label:'altri', value:5.253267},
      {label:'17-bis) utili e perdite su cambi', value:0.022806},
      {label:'altri oneri finanziari (17, costo)', value:-6.450122},
      {label:'svalutazioni di partecipazioni (D 19, costo)', value:-0.259314},
      {label:'imposte correnti', value:-2.372575},
      {label:'imposte relative a esercizi precedenti', value:0.036827},
      {label:'proventi (oneri) da adesione al regime di consolidato fiscale / trasparenza fiscale', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:127.803452, officialTotalExpenses:134.608309, officialPAT:-10.408567,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 8.655.990. Claude 2026-10-08 (Guido: Bologna 2025 a mano): error del documento. a) ricavi da gare 8.101.739 + b) abbonamenti 8.665.990 suman 16.767.729 pero el total impreso dice 16.757.729 (10.000 menos); el Totale valore della produzione 224.160.682 y el utile 13.954.040 cierran con el impreso. Se carga abbonamenti 8.655.990 (impreso menos los 10.000 de diferencia): las dos líneas son del mismo rubro, el rubro y el total quedan exactos
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. Claude 2026-10-08 (Guido: Bologna 2025 a mano): sale el subtotal de L1076 (16.757.729): ya no es la suma de sus dos renglones por el error de 10.000 del documento y se contaba además de ellos (ver el ajuste de abbonamenti)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (11.156.522). Claude 2026-10-08 (Guido: Bologna 2025 a mano): formato Codice Civile: el 17) interessi ed altri oneri finanziari se imprime en positivo y se resta por posición; el script lo sumaba. Mismo caso que Bologna 2019-20 y 2020-21 (to-do 157/158)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (43.130). Claude 2026-10-08 (Guido: Bologna 2025 a mano): rettifiche D 19) a) svalutazioni di partecipazioni 43.130 impreso en positivo y restado (Totale D (43.130), L1157). Del lado financiero como en Bologna 2019-20
  2025: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'bologna-it-bilancio-individuale-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.00792, tax:-5.606026,
    extraRows: [
      {label:'Imprese controllate', value:null},
      {label:'b) proventi finanziari da titoli immobilizz.', value:0.00003},
      {label:'altri', value:8.19204},
      {label:'17-bis) utili e perdite su cambi', value:-0.000338},
      {label:'altri oneri finanziari (17, costo)', value:-11.156522},
      {label:'svalutazioni di partecipazioni (D 19, costo)', value:-0.04313},
      {label:'imposte correnti', value:-5.668098},
      {label:'imposte relative a esercizi precedenti', value:0.062072},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:224.160681, officialTotalExpenses:201.592693, officialPAT:13.95404,
  },
};
const bolognaitPresupuestoOverlayByYear = {};

const bolognaitPasesData = [];
const bolognaitResultadosData = {};
const bolognaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['bologna-it'] = {
  revenueLinesByYear: bolognaitRevenueLinesByYear, expenseLinesByYear: bolognaitExpenseLinesByYear,
  fiscalYearMeta: bolognaitFiscalYearMeta, pasesData: bolognaitPasesData,
  resultadosData: bolognaitResultadosData, titulosData: bolognaitTitulosData,
  presupuestoOverlayByYear: bolognaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'bologna-it-bilancio-consolidato-2019-20': {
    id:'bologna-it-bilancio-consolidato-2019-20', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-consolidato-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'bologna-it-bilancio-consolidato-2020-21': {
    id:'bologna-it-bilancio-consolidato-2020-21', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-consolidato-2020-21 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'bologna-it-bilancio-consolidato-2021-22': {
    id:'bologna-it-bilancio-consolidato-2021-22', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-consolidato-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'bologna-it-bilancio-consolidato-2018-19': {
    id:'bologna-it-bilancio-consolidato-2018-19', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-consolidato-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'bologna-it-bilancio-consolidato-2017-18': {
    id:'bologna-it-bilancio-consolidato-2017-18', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-consolidato-2017-18 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'bologna-it-bilancio-consolidato-2022-23': {
    id:'bologna-it-bilancio-consolidato-2022-23', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-consolidato-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'bologna-it-bilancio-individuale-2023-24': {
    id:'bologna-it-bilancio-individuale-2023-24', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-individuale-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-individuale-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'bologna-it-bilancio-individuale-2024-25': {
    id:'bologna-it-bilancio-individuale-2024-25', clubId:'bologna-it',
    title:'Bologna F.C. 1909 S.p.A. — Bologna-bilancio-individuale-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-individuale-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['bologna-it'] = null;

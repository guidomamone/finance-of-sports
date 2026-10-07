// ============================================================================
// data/lazio-it-data.js — S.S. Lazio S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "lazio-it" — slug de "Lazio" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "S.S. Lazio S.p.A." — el .md, 15 veces (nombre del club + forma societaria)
//   displayName        ok        "Lazio" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (658 de 691 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 26 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] lazio: #74D1EA Sky Blue, #FFFFFF White, #D69A2D Gold, #003A70 Navy Blue
//   anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2023-06-30" — año del ejercicio + mes de cierre (contenido del .md (658 de 691 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 5 documento(s) con los dos estados votan consolidad
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2023-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-06-30 = 0.9203 (Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD))
//   sourceId           ok        "lazio-it-bilancio-separato-consolidato-2022-23" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Lazio"
//
// FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-06-30","sourceId":"lazio-it-bilancio-separato-consolidato-2022-23"}
// ============================================================================

const lazioitRevenueLinesByYear = {
  // 2007: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2006-07.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2006-07.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2007: [
    { rawLabel:'ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:4.508333, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'percentuali su incassi gare da squadra ospitanti', normalizedCategory:'matchday_competition', amountNative:0.331808, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'abbonamenti', normalizedCategory:'season_tickets', amountNative:3.357648, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'-/- televisivi', normalizedCategory:'broadcasting', amountNative:28.741509, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'-/- percentuale diritti televisivi da squadre ospitanti', normalizedCategory:'broadcasting', amountNative:4.367268, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.92
    { rawLabel:'-/- da L.N.P.', normalizedCategory:'broadcasting', amountNative:1, disclosureLevel:'aggregated' }, // pág. 106, Claude 0.8
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:10.816567, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:5.949375, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Canoni per licenze, marchi, brevetti', normalizedCategory:'sponsorship_commercial', amountNative:0.468351, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.9
    { rawLabel:'Cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.3, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:10.613962, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.024894, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'-/- da transazioni con creditori', normalizedCategory:'other_income', amountNative:2.217066, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.96
    { rawLabel:'-/- da altri', normalizedCategory:'other_income', amountNative:3.410385, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.97
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.125618, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.97
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_income', amountNative:0.038547, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.92
  ],
  // 2009: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2008-09.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2008-09.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2009: [
    { rawLabel:'ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:5.33171, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'percentuali su incassi gare da squdra ospitanti', normalizedCategory:'matchday_competition', amountNative:0.698521, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.98
    { rawLabel:'abbonamenti', normalizedCategory:'season_tickets', amountNative:3.584529, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'-) televisivi', normalizedCategory:'broadcasting', amountNative:36.98, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.98
    { rawLabel:'-) percentuale diritti televisivi da squadre ospitanti', normalizedCategory:'broadcasting', amountNative:6.584517, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.91
    { rawLabel:'-) da L.N.P.', normalizedCategory:'broadcasting', amountNative:4.381249, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:12.186899, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:7.785495, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Canoni per licenze, marchi, brevetti', normalizedCategory:'sponsorship_commercial', amountNative:0.518155, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.9
    { rawLabel:'Cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.4, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:9.759247, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.103183, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'-) da transazioni con creditori (non ricorrenti)', normalizedCategory:'other_income', amountNative:0.464569, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.98
    { rawLabel:'-) da altri', normalizedCategory:'other_income', amountNative:1.733258, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.98
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.222898, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.97
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_income', amountNative:0.278025, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.92
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:0.989106, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
  ],
  // 2010: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2009-10.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2009-10.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2010: [
    { rawLabel:'ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:5.163532, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'percentuali su incassi gare da squadre ospitanti', normalizedCategory:'matchday_competition', amountNative:0.543202, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.99
    { rawLabel:'abbonamenti', normalizedCategory:'season_tickets', amountNative:4.292532, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'-) televisivi', normalizedCategory:'broadcasting', amountNative:35.1, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.98
    { rawLabel:'-) percentuale diritti televisivi da squadre ospitanti', normalizedCategory:'broadcasting', amountNative:6.719213, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.91
    { rawLabel:'-) televisivi da partecipazioni comp. U.E.F.A.', normalizedCategory:'broadcasting', amountNative:1.878703, disclosureLevel:'aggregated' }, // pág. 96, Claude 0.82
    { rawLabel:'-) da L.N.P.', normalizedCategory:'broadcasting', amountNative:1.764484, disclosureLevel:'aggregated' }, // pág. 96, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:13.522294, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:9.521492, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Canoni per licenze, marchi, brevetti', normalizedCategory:'sponsorship_commercial', amountNative:0.450574, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.9
    { rawLabel:'Cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.89, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:8.159896, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.143698, disclosureLevel:'aggregated' }, // pág. 96, precedente
    { rawLabel:'-) da transazioni con creditori (non ricorrenti)', normalizedCategory:'other_income', amountNative:1.053974, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.98
    { rawLabel:'-) da altri', normalizedCategory:'other_income', amountNative:7.115893, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.98
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.3624, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.97
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_income', amountNative:0.676007, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.92
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:1.14395, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:6.662215, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'abbonamenti', normalizedCategory:'season_tickets', amountNative:2.810204, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'-) televisivi', normalizedCategory:'broadcasting', amountNative:57.930391, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.98
    { rawLabel:'-) televisivi da partecipazioni comp. U.E.F.A.', normalizedCategory:'broadcasting', amountNative:14.282601, disclosureLevel:'aggregated' }, // pág. 106, Claude 0.82
    { rawLabel:'-) da L.N.P.', normalizedCategory:'broadcasting', amountNative:6.134433, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:3.276539, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:8.544548, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Canoni per licenze, marchi, brevetti', normalizedCategory:'sponsorship_commercial', amountNative:0.279535, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.9
    { rawLabel:'Cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:1.946271, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'-) da altri', normalizedCategory:'other_income', amountNative:0.787425, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.98
    { rawLabel:'Contributi in c/esercizio', normalizedCategory:'other_income', amountNative:1.716286, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.366393, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.97
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:1.521904, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati', normalizedCategory:'player_sales', amountNative:16.673723, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Ricavi da gare', normalizedCategory:'matchday_competition', amountNative:17.919117, disclosureLevel:'aggregated' }, // pág. 99, Jev 1
    { rawLabel:'Diritti radiotelevisivi e proventi media', normalizedCategory:'broadcasting', amountNative:101.991926, disclosureLevel:'aggregated' }, // pág. 99, Jev 1
    { rawLabel:'Ricavi da sponsorizzazione e pubblicità', normalizedCategory:'sponsorship_commercial', amountNative:20.725428, disclosureLevel:'aggregated' }, // pág. 99, Jev 1
    { rawLabel:'Proventi da gestione diritti calciatori', normalizedCategory:'player_sales', amountNative:0.473302, disclosureLevel:'aggregated' }, // pág. 99, Jev 0.99
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:5.242734, disclosureLevel:'aggregated' }, // pág. 99, Jev 1
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:2.311766, disclosureLevel:'aggregated' }, // pág. 99, Jev 1
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati', normalizedCategory:'player_sales', amountNative:4.65178, disclosureLevel:'aggregated' }, // pág. 99, Jev 1
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Ricavi da gare', normalizedCategory:'matchday_competition', amountNative:10.5283, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Diritti radiotelevisivi e proventi media', normalizedCategory:'broadcasting', amountNative:85.657296, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Ricavi da sponsorizzazione e pubblicità', normalizedCategory:'sponsorship_commercial', amountNative:23.952336, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Proventi da gestione diritti calciatori', normalizedCategory:'player_sales', amountNative:0.9, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:13.311937, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:1.80032, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati', normalizedCategory:'player_sales', amountNative:24.98463, disclosureLevel:'aggregated' }, // pág. 97, precedente
  ],
  // 2015: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2014-15.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2014-15.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:7.580604, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'percentuali su incassi gare da squadra ospitanti', normalizedCategory:'matchday_competition', amountNative:0.198454, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'abbonamenti', normalizedCategory:'season_tickets', amountNative:1.909872, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'-) televisivi', normalizedCategory:'broadcasting', amountNative:46.798503, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'-) televisivi da partecipazioni comp. U.E.F.A.', normalizedCategory:'broadcasting', amountNative:22.329997, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'-) da L.N.P.', normalizedCategory:'broadcasting', amountNative:15.173702, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:1.287238, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:5.398294, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Canoni per licenze, marchi, brevetti', normalizedCategory:'sponsorship_commercial', amountNative:2.124836, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.537133, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:0.013478, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'-) da transazioni con creditori (non ricorrenti)', normalizedCategory:'other_income', amountNative:0.450212, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'-) da altri', normalizedCategory:'other_income', amountNative:5.184386, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Proventi vari', normalizedCategory:'other_income', amountNative:0.363633, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_income', amountNative:0.132146, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Ricavi da merchandising', normalizedCategory:'sponsorship_commercial', amountNative:1.444895, disclosureLevel:'aggregated' }, // pág. 94, precedente
  ],
};
const lazioitExpenseLinesByYear = {
  2007: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-0.610223, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-29.043689, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-1.671361, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.91
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.101238, disclosureLevel:'aggregated' }, // pág. 106, Claude 0.8
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-0.210788, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Costi per Acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.755876, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.98
    { rawLabel:'Minusvalenze da cessione diritti alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.033611, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.94
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.113488, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.95
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.124109, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.007338, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-1.944419, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.93
    { rawLabel:'Costi per vitto, alloggio e locomozione', normalizedCategory:'match_organisation_expense', amountNative:-0.570823, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.383418, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-0.073895, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.98
    { rawLabel:'Spese amministrative', normalizedCategory:'admin_general_expense', amountNative:-2.64878, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Spese per pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-1.72508, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Spese bancarie', normalizedCategory:'admin_general_expense', amountNative:-0.426571, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-1.955654, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.200404, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Tassa iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.0029, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'-/- percentuale su incassi gare a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-0.627983, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.94
    { rawLabel:'-/- percentuale su diritti televisivi a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-5.5746, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-0.464327, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.95
    { rawLabel:'Oneri straordinari', normalizedCategory:'exceptional_items', amountNative:-0.453404, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Amm. delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-9.770213, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Amm. delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.967232, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Svalutaz. Delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.001564, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Svalutaz. dei crediti dell\'attivo circolante e dispon. lig.', normalizedCategory:'other_expenses', amountNative:1.03898, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.290424, disclosureLevel:'aggregated' }, // pág. 106, Claude 0.8
  ],
  2009: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Materie prime,sussidiarie,di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.483311, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-24.3459, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.99
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-1.873574, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.91
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.095986, disclosureLevel:'aggregated' }, // pág. 90, Claude 0.8
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-0.58877, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Costi per Acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.4, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.98
    { rawLabel:'Minusvalenze da cessione diritti alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-0.483741, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.94
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.01785, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.95
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.278717, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.006945, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-5.130781, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.93
    { rawLabel:'Costi per vitto,alloggio e locomozione', normalizedCategory:'match_organisation_expense', amountNative:-0.650423, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.673891, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.99
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-0.070782, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.98
    { rawLabel:'Spese amministrative', normalizedCategory:'admin_general_expense', amountNative:-2.57683, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Spese per pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-1.849134, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Spese bancarie', normalizedCategory:'admin_general_expense', amountNative:-0.288877, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.701261, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.99
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.369057, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Tassa iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.00646, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'-) percentuale su incassi gare a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-1.029413, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.9
    { rawLabel:'-) percentuale su diritti televisivi a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-7.196968, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-0.44982, disclosureLevel:'aggregated' }, // pág. 90, Jev 0.95
    { rawLabel:'Sopravvenienze passive (non ricorrenti)', normalizedCategory:'exceptional_items', amountNative:-0.917358, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Amm. delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-11.80348, disclosureLevel:'aggregated' }, // pág. 90, precedente
    { rawLabel:'Amm. delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.329019, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Svalutaz. dei crediti dell\'attivo circolante e dispon.liq.', normalizedCategory:'other_expenses', amountNative:-0.0557, disclosureLevel:'aggregated' }, // pág. 90, Jev 1
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.512, disclosureLevel:'aggregated' }, // pág. 90, Claude 0.8
  ],
  2010: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.304631, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-34.357616, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.99
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.208617, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.91
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.091457, disclosureLevel:'aggregated' }, // pág. 96, Claude 0.8
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-1.283713, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Costi per Acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.8, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.98
    { rawLabel:'Minusvalenze da cessione diritti alle prestazioni dei calciatori', normalizedCategory:'exceptional_items', amountNative:-2.307573, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.94
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.14585, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.95
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.408398, disclosureLevel:'aggregated' }, // pág. 96, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-7.050488, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.93
    { rawLabel:'Costi per vitto, alloggio e locomozione', normalizedCategory:'match_organisation_expense', amountNative:-0.749022, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.64604, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.99
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-0.080173, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.98
    { rawLabel:'Spese amministrative', normalizedCategory:'admin_general_expense', amountNative:-2.894996, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Spese per pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-1.913618, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Spese bancarie', normalizedCategory:'admin_general_expense', amountNative:-0.196141, disclosureLevel:'aggregated' }, // pág. 96, precedente
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.15336, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.99
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.372293, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Tassa iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.007255, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'-) percentuale su incassi gare a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-0.733965, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.9
    { rawLabel:'-) percentuale su diritti televisivi a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-6.9825, disclosureLevel:'aggregated' }, // pág. 96, precedente
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-0.805453, disclosureLevel:'aggregated' }, // pág. 96, Jev 0.95
    { rawLabel:'Sopravvenienze passive (non ricorrenti)', normalizedCategory:'exceptional_items', amountNative:-2.448136, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Amm. delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-16.385288, disclosureLevel:'aggregated' }, // pág. 96, precedente
    { rawLabel:'Amm. delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.90812, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Svalutaz. dei crediti dell\'attivo circolante e dispon.liq.', normalizedCategory:'other_expenses', amountNative:-0.176805, disclosureLevel:'aggregated' }, // pág. 96, Jev 1
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-1.424177, disclosureLevel:'aggregated' }, // pág. 96, Claude 0.8
  ],
  2020: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Acquisti di materie prime,sussidiarie,di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.3415, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Variazione delle rimanenze', normalizedCategory:'other_expenses', amountNative:-0.846263, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-63.538666, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.268538, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.91
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.382595, disclosureLevel:'aggregated' }, // pág. 106, Claude 0.8
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-0.133803, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Costi per Acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.036446, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.98
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-3.271565, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.95
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.814774, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-7.542387, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.93
    { rawLabel:'Costi per vitto,alloggio e locomozione', normalizedCategory:'match_organisation_expense', amountNative:-1.547173, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-1.140654, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-0.127135, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.98
    { rawLabel:'Spese amministrative', normalizedCategory:'admin_general_expense', amountNative:-7.678244, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Spese per pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-3.27771, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Spese bancarie', normalizedCategory:'admin_general_expense', amountNative:-0.306148, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.705019, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.99
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.382193, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Tassa iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.008615, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'-) percentuale su incassi gare a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-0.018005, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.9
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-2.301326, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.95
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.110124, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Amm. delle attività immateriali', normalizedCategory:'player_amortisation', amountNative:-30.408328, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.94
    { rawLabel:'Amm. delle attività materiali', normalizedCategory:'depreciation', amountNative:-1.166546, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
    { rawLabel:'Amm. Dei diritti d\'uso', normalizedCategory:'depreciation', amountNative:-0.409569, disclosureLevel:'aggregated' }, // pág. 106, precedente
    { rawLabel:'Svalutaz. delle attività immateriali', normalizedCategory:'player_impairment', amountNative:-3.111921, disclosureLevel:'aggregated' }, // pág. 106, Jev 0.94
    { rawLabel:'Svalutaz. dei crediti dell\'attivo circolante e dispon.liq.', normalizedCategory:'other_expenses', amountNative:-0.170661, disclosureLevel:'aggregated' }, // pág. 106, Jev 1
  ],
  2023: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Costi per materie prime', normalizedCategory:'other_expenses', amountNative:-3.340428, disclosureLevel:'aggregated' }, // pág. 99, Jev 0.96
    { rawLabel:'Costo del Personale', normalizedCategory:'wages_squad', amountNative:-110.068773, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-25.679646, disclosureLevel:'aggregated' }, // pág. 99, Jev 0.93
    { rawLabel:'Oneri da gestione diritti calciatori', normalizedCategory:'other_expenses', amountNative:-1.489073, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-4.434459, disclosureLevel:'aggregated' }, // pág. 99, Jev 1
    { rawLabel:'Ammortamenti, accantonamenti e svalutazioni', normalizedCategory:'player_amortisation', amountNative:-31.054117, disclosureLevel:'aggregated' }, // pág. 99, precedente
    { rawLabel:'Minusvalenze da diritti alle prestazioni dei tesserati', normalizedCategory:'exceptional_items', amountNative:-0.029726, disclosureLevel:'aggregated' }, // pág. 99, Jev 0.94
  ],
  2022: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Costi per materie prime', normalizedCategory:'other_expenses', amountNative:-3.818452, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Costo del personale', normalizedCategory:'wages_squad', amountNative:-99.182175, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-22.204801, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Oneri da gestione diritti calciatori', normalizedCategory:'other_expenses', amountNative:-0.608626, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-4.420754, disclosureLevel:'aggregated' }, // pág. 97, precedente
    { rawLabel:'Ammortamenti, accantonamenti e svalutazioni', normalizedCategory:'player_amortisation', amountNative:-42.773753, disclosureLevel:'aggregated' }, // pág. 97, precedente
  ],
  2015: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Materie prime,sussidiarie,di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.941465, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-57.910068, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.72647, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.178884, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Altri costi', normalizedCategory:'other_expenses', amountNative:-0.101613, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Costi per Acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.51, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.055835, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.393209, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-2.571813, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Costi per vitto,alloggio e locomozione', normalizedCategory:'match_organisation_expense', amountNative:-1.144056, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.932813, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Spese assicurative', normalizedCategory:'admin_general_expense', amountNative:-0.157731, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Spese amministrative', normalizedCategory:'admin_general_expense', amountNative:-5.444039, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Spese per pubblicità e promozione', normalizedCategory:'admin_general_expense', amountNative:-4.511485, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Spese bancarie', normalizedCategory:'admin_general_expense', amountNative:-0.118355, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.51552, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.437862, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Tassa iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.00222, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'-) percentuale su incassi gare a squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-0.237758, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-0.958658, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Sopravvenienze passive (non ricorrenti)', normalizedCategory:'exceptional_items', amountNative:-1.147384, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Amm. delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-13.501742, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Amm. delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.924133, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Svalutaz. Delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.093507, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Svalutaz. dei crediti dell\'attivo circolante e dispon.liq.', normalizedCategory:'other_expenses', amountNative:-0.135496, disclosureLevel:'aggregated' }, // pág. 94, precedente
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0.13778, disclosureLevel:'aggregated' }, // pág. 94, precedente
  ],
};
const lazioitFiscalYearMeta = {
  2007: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2007-06-30',
    sourceId:'lazio-it-bilancio-separato-consolidato-2006-07',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.362255, tax:-10.72716,
    extraRows: [
      {label:'Svalutazioni di partecipazioni', value:-0.201949},
      {label:'a) utili', value:0.045318},
      {label:'da imprese controllate', value:0.000259},
      {label:'da terzi', value:0.198094},
      {label:'da attualizzazione', value:1.219397},
      {label:'verso terzi', value:-2.993284},
      {label:'da attualizzazione', value:-2.63009},
      {label:'Imposte correnti', value:-0.276123},
      {label:'b) imposte differite', value:-30.339423},
      {label:'c) imposte anticipate', value:19.888386},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:76.271331, officialTotalExpenses:59.227417, officialPAT:1.467481,
  },
  2009: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2009-06-30',
    sourceId:'lazio-it-bilancio-separato-consolidato-2008-09',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.737718, tax:-7.026613,
    extraRows: [
      {label:'a) utili', value:0.000012},
      {label:'b) perdite', value:-0.040236},
      {label:'da terzi', value:0.413136},
      {label:'da attualizzazione', value:0.570197},
      {label:'verso terzi', value:-3.112227},
      {label:'da attualizzazione', value:-1.5686},
      {label:'Imposte correnti', value:-1.609799},
      {label:'b) imposte differite', value:6.71712},
      {label:'c) imposte anticipate', value:-12.133934},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:92.001361, officialTotalExpenses:67.784949, officialPAT:12.050984,
  },
  2010: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2010-06-30',
    sourceId:'lazio-it-bilancio-separato-consolidato-2009-10',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.137062, tax:-6.221847,
    extraRows: [
      {label:'b) perdite', value:-0.14123},
      {label:'da terzi', value:0.063044},
      {label:'da attualizzazione', value:0.40847},
      {label:'verso terzi', value:-2.426046},
      {label:'da attualizzazione', value:-1.0413},
      {label:'Imposte correnti', value:-2.648093},
      {label:'b) imposte differite', value:6.681449},
      {label:'c) imposte anticipate', value:-10.255203},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:98.501844, officialTotalExpenses:86.079976, officialPAT:-1.692751,
  },
  2020: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'lazio-it-bilancio-separato-consolidato-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.322744, tax:-0.440078,
    extraRows: [
      {label:'a) utili', value:0.000316},
      {label:'da terzi', value:0.028287},
      {label:'da attualizzazione', value:0.009779},
      {label:'verso terzi', value:-0.873826},
      {label:'da attualizzazione', value:-0.4873},
      {label:'Imposte correnti', value:-3.810091},
      {label:'b) imposte differite', value:0.096755},
      {label:'c) imposte anticipate', value:3.273258},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:122.932468, officialTotalExpenses:136.935784, officialPAT:-15.876263,
  },
  2023: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'lazio-it-bilancio-separato-consolidato-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.467378, tax:-3.293597,
    extraRows: [
      {label:'Proventi finanziari', value:0.706786},
      {label:'Oneri finanziari', value:-4.174164},
      {label:'Imposte correnti', value:-3.019757},
      {label:'Imposte differite e anticipate', value:-0.27384},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:153.316053, officialTotalExpenses:176.066496, officialPAT:-29.541144,
  },
  2022: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'lazio-it-bilancio-separato-consolidato-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.430598, tax:-4.115317,
    extraRows: [
      {label:'Proventi finanziari', value:0.186256},
      {label:'Oneri finanziari', value:-1.616854},
      {label:'Imposte correnti', value:-3.738451},
      {label:'Imposte differite e anticipate', value:-0.376866},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:161.134819, officialTotalExpenses:173.008561, officialPAT:-17.419657,
  },
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (3.432.429). el renglón salió con las columnas corridas y no se extrajo (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 172.710. to-do 157: columnas corridas en el .md (L3463-3465); L3463 933.312 es el subtotal b)+c) con la etiqueta de b); L3464 172.710 es b). Reemplaza solo su propia fila (antes no reemplazaba y el impuesto entraba doble)
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 760.602. to-do 157: L3465 760.602 es c); saca la fila de L3463 (933.312 = b)+c), el subtotal contado además de sus partes)
  2015: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2015-06-30',
    sourceId:'lazio-it-bilancio-separato-consolidato-2014-15',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.101739, tax:-2.499117,
    extraRows: [
      {label:'b) perdite', value:-0.000675},
      {label:'da terzi', value:0.005387},
      {label:'da attualizzazione', value:0.102051},
      {label:'verso terzi', value:-1.487416},
      {label:'da attualizzazione', value:-0.721086},
      {label:'imposte correnti', value:-3.432429},
      {label:'imposte differite (b)', value:0.17271},
      {label:'imposte anticipate (c)', value:0.760602},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:110.927383, officialTotalExpenses:99.366952, officialPAT:5.812193,
  },
};
const lazioitPresupuestoOverlayByYear = {};

const lazioitPasesData = [];
const lazioitResultadosData = {};
const lazioitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['lazio-it'] = {
  revenueLinesByYear: lazioitRevenueLinesByYear, expenseLinesByYear: lazioitExpenseLinesByYear,
  fiscalYearMeta: lazioitFiscalYearMeta, pasesData: lazioitPasesData,
  resultadosData: lazioitResultadosData, titulosData: lazioitTitulosData,
  presupuestoOverlayByYear: lazioitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'lazio-it-bilancio-separato-consolidato-2006-07': {
    id:'lazio-it-bilancio-separato-consolidato-2006-07', clubId:'lazio-it',
    title:'S.S. Lazio S.p.A. — Lazio-bilancio-separato-consolidato-2006-07 (ejercicio 2007)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2006-07.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'lazio-it-bilancio-separato-consolidato-2008-09': {
    id:'lazio-it-bilancio-separato-consolidato-2008-09', clubId:'lazio-it',
    title:'S.S. Lazio S.p.A. — Lazio-bilancio-separato-consolidato-2008-09 (ejercicio 2009)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2008-09.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'lazio-it-bilancio-separato-consolidato-2009-10': {
    id:'lazio-it-bilancio-separato-consolidato-2009-10', clubId:'lazio-it',
    title:'S.S. Lazio S.p.A. — Lazio-bilancio-separato-consolidato-2009-10 (ejercicio 2010)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2009-10.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'lazio-it-bilancio-separato-consolidato-2019-20': {
    id:'lazio-it-bilancio-separato-consolidato-2019-20', clubId:'lazio-it',
    title:'S.S. Lazio S.p.A. — Lazio-bilancio-separato-consolidato-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'lazio-it-bilancio-separato-consolidato-2022-23': {
    id:'lazio-it-bilancio-separato-consolidato-2022-23', clubId:'lazio-it',
    title:'S.S. Lazio S.p.A. — Lazio-bilancio-separato-consolidato-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'lazio-it-bilancio-separato-consolidato-2021-22': {
    id:'lazio-it-bilancio-separato-consolidato-2021-22', clubId:'lazio-it',
    title:'S.S. Lazio S.p.A. — Lazio-bilancio-separato-consolidato-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'lazio-it-bilancio-separato-consolidato-2014-15': {
    id:'lazio-it-bilancio-separato-consolidato-2014-15', clubId:'lazio-it',
    title:'S.S. Lazio S.p.A. — Lazio-bilancio-separato-consolidato-2014-15 (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2014-15.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['lazio-it'] = null;

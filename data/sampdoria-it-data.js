// ============================================================================
// data/sampdoria-it-data.js — U.C. Sampdoria S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "sampdoria-it" — slug de "Sampdoria" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "U.C. Sampdoria S.p.A." — el .md, 8 veces (nombre del club + forma societaria)
//   displayName        ok        "Sampdoria" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (125 de 182 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 98 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (125 de 182 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 1 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2021-12-31 = 0.882924 (Tipo de referencia del Banco Central Europeo al 2021-12-31)
//   sourceId           ok        "sampdoria-it-fascicolo-bilancio-2021" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Sampdoria"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2021-12-31","sourceId":"sampdoria-it-fascicolo-bilancio-2021"}
// ============================================================================

const sampdoriaitRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:1.015668, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.577893, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:3.261983, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:3.405, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.983088, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:52.208405, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:2.691738, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:3.392901, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:8.773329, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Gare Campionato', normalizedCategory:'matchday_competition', amountNative:1.209, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.047, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:3.03, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Incrementi di immobilizzazione per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:1.981108, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.96
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:3.215, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Proventi pubblicitari e concessioni varie', normalizedCategory:'sponsorship_commercial', amountNative:3.964, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.85
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:47.462, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:55.528, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Proventi da cessioni temporanee calciatori', normalizedCategory:'player_sales', amountNative:2.595, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.96
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:16.915, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.96
    { rawLabel:'Contributi federali', normalizedCategory:'other_income', amountNative:3.733, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:0.281, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.98
    { rawLabel:'Proventi da contratto Rai – Library Sampdoria', normalizedCategory:'broadcasting', amountNative:0.23, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.98
    { rawLabel:'Sopravvenienze attive', normalizedCategory:'other_income', amountNative:1.583, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Gare Campionato', normalizedCategory:'matchday_competition', amountNative:1.662, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.264, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.041, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:3.006, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Incrementi di immobilizzazione per lavori interni e capitalizzazione costi vivaio', normalizedCategory:'other_income', amountNative:2.125726, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Proventi da sponsorizzazioni:', normalizedCategory:'sponsorship_commercial', amountNative:2.839, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Proventi pubblicitari e concessioni varie:', normalizedCategory:'sponsorship_commercial', amountNative:4.23, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Diritti radiotelevisivi e proventi media', normalizedCategory:'broadcasting', amountNative:47.695, disclosureLevel:'aggregated' }, // pág. 59, Jev 1
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:52.345, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Proventi da cessioni temporanee calciatori', normalizedCategory:'player_sales', amountNative:5.603, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.893, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Contributi federali', normalizedCategory:'other_income', amountNative:2.584, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:0.743, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Proventi da contratto Rai – Library Sampdoria', normalizedCategory:'broadcasting', amountNative:0.117, disclosureLevel:'aggregated' }, // pág. 59, precedente
    { rawLabel:'Sopravvenienze attive', normalizedCategory:'other_income', amountNative:1.878, disclosureLevel:'aggregated' }, // pág. 59, precedente
  ],
};
const sampdoriaitExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.572866, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Per servizi', normalizedCategory:'admin_general_expense', amountNative:-17.135343, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.071039, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-56.074528, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.739995, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.91
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.627336, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.88
    { rawLabel:'d) altri costi', normalizedCategory:'wages_squad', amountNative:-0.032591, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-7.91662, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.85
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.407155, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Variazione delle rimanenze di materiale di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.007428, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.855701, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-0.545115, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-1.809266, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-2.754819, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-1.200638, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-2.652781, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
  ],
  2018: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.07, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Indumenti gioco', normalizedCategory:'admin_general_expense', amountNative:-1.061, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Indumenti', normalizedCategory:'admin_general_expense', amountNative:-0.099, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Cancelleria e stampati', normalizedCategory:'admin_general_expense', amountNative:-0.009, disclosureLevel:'aggregated' }, // pág. 57, Jev 1
    { rawLabel:'Altro', normalizedCategory:'other_expenses', amountNative:-0.269, disclosureLevel:'aggregated' }, // pág. 57, Jev 0.95
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.066, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.209, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.871, disclosureLevel:'aggregated' }, // pág. 57, Jev 0.9
    { rawLabel:'Compensi per Agenti e intermediari', normalizedCategory:'other_expenses', amountNative:-11.579, disclosureLevel:'aggregated' }, // pág. 57, Jev 0.98
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.831, disclosureLevel:'aggregated' }, // pág. 57, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.015, disclosureLevel:'aggregated' }, // pág. 57, Jev 0.99
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-5.323, disclosureLevel:'aggregated' }, // pág. 57, Jev 1
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.238, disclosureLevel:'aggregated' }, // pág. 57, Jev 1
    { rawLabel:'Costi campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-1.286, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Noleggio autovetture', normalizedCategory:'admin_general_expense', amountNative:-0.253, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.99
    { rawLabel:'Locazioni uffici e altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.161, disclosureLevel:'aggregated' }, // pág. 58, Jev 0.99
    { rawLabel:'Noleggi', normalizedCategory:'admin_general_expense', amountNative:-0.14, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'Concessione utilizzo marchio', normalizedCategory:'admin_general_expense', amountNative:-3, disclosureLevel:'aggregated' }, // pág. 58, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-50.809682, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.705739, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.593002, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'d) altri costi', normalizedCategory:'wages_squad', amountNative:-0.033413, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-27.245164, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.349443, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.95
    { rawLabel:'d) Svalutazioni crediti dell\'attivo', normalizedCategory:'other_expenses', amountNative:-1.163971, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.755298, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.155, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.002, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
    { rawLabel:'Percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.021, disclosureLevel:'aggregated' }, // pág. 60, Jev 0.98
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.775, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Minusvalenze cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.494, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
    { rawLabel:'Premi Preparazione ex art. 96 NOIF', normalizedCategory:'player_amortisation', amountNative:-0.169, disclosureLevel:'aggregated' }, // pág. 60, Jev 0.97
    { rawLabel:'Contributo Solidarietà Fifa/Indennita\' Formazione', normalizedCategory:'player_amortisation', amountNative:-0.065, disclosureLevel:'aggregated' }, // pág. 60, Jev 0.97
    { rawLabel:'Premi Valorizzazione', normalizedCategory:'player_amortisation', amountNative:-0.447, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Oneri diversi da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.183, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.04, disclosureLevel:'aggregated' }, // pág. 60, Jev 0.95
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.207, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.151, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.172, disclosureLevel:'aggregated' }, // pág. 60, Jev 1
  ],
  2019: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale di consumo', normalizedCategory:'admin_general_expense', amountNative:-0.103, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Indumenti gioco', normalizedCategory:'admin_general_expense', amountNative:-0.721, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Indumenti', normalizedCategory:'admin_general_expense', amountNative:-0.142, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.076, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Cancelleria e stampati', normalizedCategory:'admin_general_expense', amountNative:-0.013, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Altro', normalizedCategory:'other_expenses', amountNative:-0.304, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.098, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.317, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.853, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Compensi per Agenti e intermediari', normalizedCategory:'other_expenses', amountNative:-10.511, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.668, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-1.186, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-6.43, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.15, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Costi campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-1.078, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Noleggio autovetture', normalizedCategory:'admin_general_expense', amountNative:-0.291, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Locazioni uffici e altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.16, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Noleggi', normalizedCategory:'admin_general_expense', amountNative:-0.139, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'Concessione utilizzo marchio', normalizedCategory:'admin_general_expense', amountNative:-3, disclosureLevel:'aggregated' }, // pág. 63, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-57.347849, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.9426, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.642734, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'d) altri costi', normalizedCategory:'wages_squad', amountNative:-0.036415, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-38.516308, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.396331, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'di cui Svalutazioni diritti pluriennali calciatori', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.9
    { rawLabel:'d) Svalutazioni crediti dell\'attivo', normalizedCategory:'other_expenses', amountNative:-0.53213, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-1.621854, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.533, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.004, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.119, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.907, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Minusvalenze cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-2.936, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Premi Preparazione ex art. 96 NOIF', normalizedCategory:'player_amortisation', amountNative:-0.142, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Premi Valorizzazione', normalizedCategory:'player_amortisation', amountNative:-0.796, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Oneri diversi da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.13, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.006, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.177, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.182, disclosureLevel:'aggregated' }, // pág. 65, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.506, disclosureLevel:'aggregated' }, // pág. 65, precedente
  ],
};
const sampdoriaitFiscalYearMeta = {
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. to-do 157: i) es otro 'di cui' de h) (28.550 + 2.959.520 + 5.785.259 = 8.773.329 = h); se contaba dos veces
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2021-12-31. Claude 2026-10-07 (ok de Guido, cola d29023b): el conto economico es al 31/12/2021; 30/03/2022 es la fecha de aprobación del consiglio
  2021: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-12-31',
    sourceId:'sampdoria-it-fascicolo-bilancio-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.139726, tax:3.817955,
    extraRows: [
      {label:'d) proventi diversi dai precedenti', value:0.697745},
      {label:'e) altri interessi e oneri finanziari', value:-4.837668},
      {label:'a) utile su cambi', value:0.000201},
      {label:'b) perdite su cambi', value:-0.000004},
      {label:'a) Imposte correnti', value:-0.392825},
      {label:'b) Imposte relative a esercizi precedenti', value:-0.104879},
      {label:'c) Imposte differite', value:-1.99323},
      {label:'d) Imposte anticipate', value:-0.118679},
      {label:'e) proventi (aneri) da adesione al regime di consolidato fiscale', value:6.427568},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:76.310005, officialTotalExpenses:97.648402, officialPAT:-24.414986,
  },
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 56.853. pág. 27: importes sin etiqueta (cola f1b4f17)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (2.728.204). idem
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 46. idem
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (1). idem
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (3.465.535). reemplaza la fila extraída '(sin etiqueta: imposte correnti)' L1061, que se sumaba dos veces con el ajuste
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (3.943.972). idem
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 440.273. idem
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2018-12-31. Fascicolo di Bilancio al 31 dicembre 2018; el 29/03/2019 es la fecha de aprobación del CdA
  2018: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-12-31',
    sourceId:'sampdoria-it-fascicolo-bilancio-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.671306, tax:-6.969234,
    extraRows: [
      {label:'16) c) proventi da terzi', value:0.056853},
      {label:'17) b.1) interessi e altri oneri finanziari verso terzi', value:-2.728204},
      {label:'17 bis) a) utile su cambi', value:0.000046},
      {label:'17 bis) b) perdite su cambi', value:-0.000001},
      {label:'22) a) imposte correnti', value:-3.465535},
      {label:'22) b) imposte differite', value:-3.943972},
      {label:'22) c) imposte anticipate', value:0.440273},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:141.773108, officialTotalExpenses:119.411712, officialPAT:12.052939,
  },
  2019: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-12-31',
    sourceId:'sampdoria-it-fascicolo-bilancio-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.487903, tax:1.11226,
    extraRows: [
      {label:'a) Da compartecipazioni ex Art. 102 bis NOIF', value:0},
      {label:'b.2) da titoli immobilizzati che non cost. partecipazioni', value:0},
      {label:'c) Da terzi', value:0.058298},
      {label:'a) Da compartecipazioni ex Art. 102 bis NOIF', value:0},
      {label:'b.1) verso terzi', value:-3.025626},
      {label:'a) utile su cambi', value:0.850114},
      {label:'b) perdite su cambi', value:-0.370689},
      {label:'a) Imposte correnti', value:-1.978564},
      {label:'b) Imposte relative ad es. precedenti', value:0.015076},
      {label:'c) Imposte differite', value:-4.237956},
      {label:'d) Imposte anticipate', value:7.313704},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:129.025726, officialTotalExpenses:137.272221, officialPAT:-13.064222,
  },
};
const sampdoriaitPresupuestoOverlayByYear = {};

const sampdoriaitPasesData = [];
const sampdoriaitResultadosData = {};
const sampdoriaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sampdoria-it'] = {
  revenueLinesByYear: sampdoriaitRevenueLinesByYear, expenseLinesByYear: sampdoriaitExpenseLinesByYear,
  fiscalYearMeta: sampdoriaitFiscalYearMeta, pasesData: sampdoriaitPasesData,
  resultadosData: sampdoriaitResultadosData, titulosData: sampdoriaitTitulosData,
  presupuestoOverlayByYear: sampdoriaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'sampdoria-it-fascicolo-bilancio-2021': {
    id:'sampdoria-it-fascicolo-bilancio-2021', clubId:'sampdoria-it',
    title:'U.C. Sampdoria S.p.A. — Sampdoria-fascicolo-bilancio-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'sampdoria-it-fascicolo-bilancio-2018': {
    id:'sampdoria-it-fascicolo-bilancio-2018', clubId:'sampdoria-it',
    title:'U.C. Sampdoria S.p.A. — Sampdoria-fascicolo-bilancio-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'sampdoria-it-fascicolo-bilancio-2019': {
    id:'sampdoria-it-fascicolo-bilancio-2019', clubId:'sampdoria-it',
    title:'U.C. Sampdoria S.p.A. — Sampdoria-fascicolo-bilancio-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['sampdoria-it'] = null;

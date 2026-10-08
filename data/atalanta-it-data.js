// ============================================================================
// data/atalanta-it-data.js — Atalanta Bergamasca Calcio S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "atalanta-it" — slug de "Atalanta" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Atalanta Bergamasca Calcio S.p.A." — el .md, 7 veces (nombre del club + forma societaria)
//   displayName        ok        "Atalanta" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — el documento más reciente del club (Atalanta-bilancio-consolidato-2025.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 12: 2018,2020,2021 / mes 
//   sport              ok        "futbol" — el .md nombra el fútbol 39 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] atalanta: #0D68B1 Blue, #FFFFFF White, #1E1E1E Black
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (118 de 120 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 7 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2021-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.882924. --escribir agrega 'EUR@2021-12-31' a FX_CLOSE
//   sourceId           ok        "atalanta-it-bilancio-consolidato-2021" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Atalanta"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2021-12-31","sourceId":"atalanta-it-bilancio-consolidato-2021"}
// ============================================================================

const atalantaitRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Altri ricavi delle vendite e prestazioni', normalizedCategory:'other_income', amountNative:2.975097, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Altri incassi per gare', normalizedCategory:'matchday_competition', amountNative:2.331775, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Gare di campionato', normalizedCategory:'matchday_competition', amountNative:2.117671, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.93
    { rawLabel:'Gare di Coppe Internazionali', normalizedCategory:'matchday_competition', amountNative:1.576767, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Gare amichevoli', normalizedCategory:'matchday_competition', amountNative:0.016252, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.96
    { rawLabel:'Gare di Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.007474, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'4) Incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:2.780081, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'Proventi televisivi', normalizedCategory:'broadcasting', amountNative:115.75425, disclosureLevel:'aggregated' }, // pág. 35, Jev 1
    { rawLabel:'Plusv. Cess. Dir. Plur. Prest. Calciatori', normalizedCategory:'player_sales', amountNative:53.607849, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.99
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:28.184986, disclosureLevel:'aggregated' }, // pág. 35, Jev 1
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:18.230155, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.95
    { rawLabel:'Contributi da Leghe e Enti Federali', normalizedCategory:'other_income', amountNative:6.241535, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.96
    { rawLabel:'Proventi non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:4.562677, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Calc. in prestito ad altre squadre prof.', normalizedCategory:'player_sales', amountNative:2.501027, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Sopravvenienze attive', normalizedCategory:'other_income', amountNative:0.711903, disclosureLevel:'aggregated' }, // pág. 35, Jev 1
    { rawLabel:'Proventi cess licenze diritti e simili', normalizedCategory:'sponsorship_commercial', amountNative:0.436306, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Proventi per iscrizioni Football camp', normalizedCategory:'youth_football', amountNative:0.43151, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.9
    { rawLabel:'Proventi da enti assicurativi', normalizedCategory:'other_income', amountNative:0.117578, disclosureLevel:'aggregated' }, // pág. 35, Jev 1
    { rawLabel:'Proventi diversi settore giovanile', normalizedCategory:'youth_football', amountNative:0.069017, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.98
    { rawLabel:'Contributi c/impianto', normalizedCategory:'other_income', amountNative:0.016109, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.99
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:12.592362, disclosureLevel:'aggregated' }, // pág. 8, Claude 0.88
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:4.474726, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'c) altri ricavi delle vendite e delle prestazioni', normalizedCategory:'other_income', amountNative:4.201274, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.96
    { rawLabel:'- altri contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.98
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:23.675223, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.472215, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.97
    { rawLabel:'e) proventi da cessione diritti audiovisivi e non audiovisivi', normalizedCategory:'broadcasting', amountNative:107.538202, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.91
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.899774, disclosureLevel:'aggregated' }, // pág. 8, ? 0.6
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:70.977084, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'- premi e/o indennizzi attivi ex art.103, comma 3, NOIF', normalizedCategory:'other_income', amountNative:8.14843, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.93
    { rawLabel:'- proventi diversi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:3.649085, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.92
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:7.095469, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:1.394192, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Altri ricavi delle vendite e prestazioni', normalizedCategory:'other_income', amountNative:2.272885, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Gare di Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.034041, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Gare di campionato', normalizedCategory:'matchday_competition', amountNative:2.620548, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Altri incassi per gare', normalizedCategory:'matchday_competition', amountNative:0.408734, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'4) Incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:1.30197, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Proventi televisivi', normalizedCategory:'broadcasting', amountNative:117.150278, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Plusv. Cess. Dir. Plur. Prest. Calciatori', normalizedCategory:'player_sales', amountNative:68.482096, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:18.178509, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:19.265616, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Calc. in prestito ad altre squadre prof.', normalizedCategory:'player_sales', amountNative:1.620336, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:4.200594, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Contributi da Leghe e Enti Federali', normalizedCategory:'other_income', amountNative:1.534843, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Sopravvenienze attive', normalizedCategory:'other_income', amountNative:1.517007, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi per iscrizioni Football camp', normalizedCategory:'youth_football', amountNative:0.128399, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi da enti assicurativi', normalizedCategory:'other_income', amountNative:1.439042, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri proventi su trasf. Calciatori', normalizedCategory:'player_sales', amountNative:0.001256, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.98
    { rawLabel:'Proventi cess licenze diritti e simili', normalizedCategory:'sponsorship_commercial', amountNative:0.308269, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi diversi settore giovanile', normalizedCategory:'youth_football', amountNative:0.135651, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Contributi c/impianto', normalizedCategory:'other_income', amountNative:0.00373, disclosureLevel:'aggregated' }, // pág. 36, precedente
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:15.703913, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:6.005269, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'c) altri ricavi delle vendite e delle prestazioni', normalizedCategory:'other_income', amountNative:5.852463, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:27.148451, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.411017, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi e non audiovisivi', normalizedCategory:'broadcasting', amountNative:138.606244, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:3.286635, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:100.855538, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'- premi e/o indennizzi attivi ex art.103, comma 3, NOIF', normalizedCategory:'other_income', amountNative:14.669948, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'- proventi diversi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:2.771745, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:5.506545, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'1) Ricavi delle vendite e delle prestazioni', normalizedCategory:'matchday_competition', amountNative:13.50221, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'2) Variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'3) variazioni di lavori in corso su ordinazione', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'4) Incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:2.875337, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Proventi televisivi', normalizedCategory:'broadcasting', amountNative:89.803554, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Plusv. Cess. Dir. Plur. Prest. Calciatori', normalizedCategory:'player_sales', amountNative:38.753413, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:18.333293, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:7.623164, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Calc. in prestito ad altre squadre prof.', normalizedCategory:'player_sales', amountNative:6.740273, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:4.334551, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Contributi da Leghe e Enti Federali', normalizedCategory:'other_income', amountNative:3.405604, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Sopravvenienze attive', normalizedCategory:'other_income', amountNative:0.955623, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi per iscrizioni Football camp', normalizedCategory:'youth_football', amountNative:0.789203, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi cess licenze diritti e simili', normalizedCategory:'sponsorship_commercial', amountNative:0.615377, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi da enti assicurativi', normalizedCategory:'other_income', amountNative:0.400348, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri proventi su trasf. Calciatori', normalizedCategory:'player_sales', amountNative:0.305891, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi diversi settore giovanile', normalizedCategory:'youth_football', amountNative:0.176617, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Rimborso spese e ricavi Stadio', normalizedCategory:'stadium_other', amountNative:0.006749, disclosureLevel:'aggregated' }, // pág. 36, ? 0.6
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:3.031395, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Gare di campionato', normalizedCategory:'matchday_competition', amountNative:1.230842, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri ricavi delle vendite e prestazioni', normalizedCategory:'other_income', amountNative:1.18543, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Gare di Coppe Internazionali', normalizedCategory:'matchday_competition', amountNative:0.917377, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Gare di Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.811548, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri incassi per gare', normalizedCategory:'matchday_competition', amountNative:0.605592, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Gare amichevoli', normalizedCategory:'matchday_competition', amountNative:0.228024, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'2) Variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'3) variazioni di lavori in corso su ordinazione', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'4) Incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:2.689378, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Proventi televisivi', normalizedCategory:'broadcasting', amountNative:47.723494, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:32.382198, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Plusv. Cess. Dir. Plur. Prest. Calciatori', normalizedCategory:'player_sales', amountNative:24.231467, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:14.958661, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Calc. in prestito ad altre squadre prof.', normalizedCategory:'player_sales', amountNative:13.476965, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Proventi da partecipazione all\'Europa League', normalizedCategory:'competition_bonus', amountNative:6.163352, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Proventi non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:1.746433, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Contributi da Leghe e Enti Federali', normalizedCategory:'other_income', amountNative:1.710355, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Sopravvenienze attive', normalizedCategory:'other_income', amountNative:0.870353, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Proventi per iscrizioni Football camp', normalizedCategory:'youth_football', amountNative:0.860102, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Altri proventi su trasf. Calciatori', normalizedCategory:'player_sales', amountNative:0.522075, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Proventi cess licenze diritti e simili', normalizedCategory:'sponsorship_commercial', amountNative:0.188514, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Proventi diversi settore giovanile', normalizedCategory:'youth_football', amountNative:0.134826, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Proventi da enti assicurativi', normalizedCategory:'other_income', amountNative:0.067409, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Rimborso spese e ricavi Stadio', normalizedCategory:'stadium_other', amountNative:0.004836, disclosureLevel:'aggregated' }, // pág. 37, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:7.258441, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:4.534028, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'c) altri ricavi delle vendite e delle prestazioni', normalizedCategory:'other_income', amountNative:3.20428, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'4) Incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'- altri contributi in conto esercizio', normalizedCategory:'other_income', amountNative:1.318405, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:23.904626, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.490448, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi e non audiovisivi', normalizedCategory:'broadcasting', amountNative:66.546462, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:7.101722, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:63.198935, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'- premi e/o indennizzi attivi ex art.103, comma 3, NOIF', normalizedCategory:'other_income', amountNative:12.510814, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'- proventi diversi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:0.728173, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:4.590231, disclosureLevel:'aggregated' }, // pág. 7, precedente
  ],
};
const atalantaitExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Acquisto materiali vari e di consumo', normalizedCategory:'admin_general_expense', amountNative:-1.310529, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Acquisto divise dipendenti', normalizedCategory:'admin_general_expense', amountNative:-1.068036, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Acquisto materiale pubblicitario e promozionale', normalizedCategory:'admin_general_expense', amountNative:-0.141229, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.006622, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Sconti e abbuoni su acquisti', normalizedCategory:'other_expenses', amountNative:0.00912, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Compensi a terzi', normalizedCategory:'admin_general_expense', amountNative:-13.647092, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-3.663103, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Spese Amministrative e generali serv.', normalizedCategory:'admin_general_expense', amountNative:-2.771163, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'Spese Pubblicitarie', normalizedCategory:'admin_general_expense', amountNative:-2.054149, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-1.562988, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-1.495215, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'Costi vitto - alloggio - locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.131453, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Costi per utenze', normalizedCategory:'admin_general_expense', amountNative:-0.796133, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.98
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.649573, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Spese varie organizzazioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.642785, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.93
    { rawLabel:'Servizio biglietteria/controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.437947, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.424008, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Trasferimento temporaneo calciatori', normalizedCategory:'other_expenses', amountNative:-1.644676, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Locazioni impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.019025, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Noleggi e locazioni varie', normalizedCategory:'other_expenses', amountNative:-1.009397, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.97
    { rawLabel:'Locazioni immobiliari', normalizedCategory:'admin_general_expense', amountNative:-0.215, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.93
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-82.628189, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.96
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.8915, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.728276, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-1.971044, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Amm. Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-49.157146, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Amm. Costi capitalizzati vivaio', normalizedCategory:'other_amortisation', amountNative:-2.374261, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Amm. Altre Immobilizzazioni', normalizedCategory:'other_amortisation', amountNative:-0.532668, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.97
    { rawLabel:'Amm. Immobili strumentali', normalizedCategory:'depreciation', amountNative:-1.730507, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.99
    { rawLabel:'Amm. Impianti specifici', normalizedCategory:'depreciation', amountNative:-0.247378, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.98
    { rawLabel:'Amm. Automezzi e autovetture', normalizedCategory:'depreciation', amountNative:-0.003152, disclosureLevel:'aggregated' }, // pág. 38, Claude 0.9
    { rawLabel:'Amm. Altrezzatura generica', normalizedCategory:'depreciation', amountNative:-0.16783, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.98
    { rawLabel:'Amm. Mobili macchine d\'ufficio', normalizedCategory:'depreciation', amountNative:-0.152047, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.91
    { rawLabel:'Amm. Macchine d\'ufficio elettroniche', normalizedCategory:'depreciation', amountNative:-0.01733, disclosureLevel:'aggregated' }, // pág. 38, Claude 0.9
    { rawLabel:'Amm. Altri beni sociali', normalizedCategory:'depreciation', amountNative:-0.001168, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.98
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'d) svalutazione crediti compresi nell\'attivo circolante e disp. liquide', normalizedCategory:'other_expenses', amountNative:-3.107256, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.97
    { rawLabel:'11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.100543, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.295781, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Minusvalenze cess dir plur prest calciatori', normalizedCategory:'exceptional_items', amountNative:-3.45741, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Oneri diversi da campagna trasferimenti', normalizedCategory:'other_expenses', amountNative:-2.264556, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.91
    { rawLabel:'Valorizzazioni passive', normalizedCategory:'other_expenses', amountNative:-1.08192, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Altri costi diversi di gestione', normalizedCategory:'other_expenses', amountNative:-0.337213, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.93
    { rawLabel:'Imposte e tasse varie', normalizedCategory:'admin_general_expense', amountNative:-0.50292, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.96
    { rawLabel:'Contributi Lega Calcio', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.26829, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Ammende - multe gare', normalizedCategory:'other_expenses', amountNative:-0.097, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Minusvalenze alienazione imm materiali', normalizedCategory:'exceptional_items', amountNative:-0.00555, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Perdite su crediti', normalizedCategory:'other_expenses', amountNative:-0.00532, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Abbuoni e arrotondamenti passivi', normalizedCategory:'other_expenses', amountNative:-0.003291, disclosureLevel:'aggregated' }, // pág. 39, precedente
  ],
  2024: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Acquisto materiali vari e di consumo', normalizedCategory:'admin_general_expense', amountNative:-1.377682, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Acquisto divise dipendenti', normalizedCategory:'admin_general_expense', amountNative:-1.245242, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Acquisto materiale pubblicitario e promozionale', normalizedCategory:'admin_general_expense', amountNative:-0.340638, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.034873, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Sconti e abbuoni su acquisti', normalizedCategory:'other_expenses', amountNative:0.0169, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Compensi a terzi', normalizedCategory:'admin_general_expense', amountNative:-16.538177, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-3.281251, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-3.856787, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Spese Amministrative e generali serv.', normalizedCategory:'admin_general_expense', amountNative:-2.742316, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'Spese Pubblicitarie', normalizedCategory:'admin_general_expense', amountNative:-2.971636, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Costi vitto - alloggio - locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-2.844729, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Costi per utenze', normalizedCategory:'admin_general_expense', amountNative:-0.706975, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.98
    { rawLabel:'Manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-1.29839, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.698958, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.688756, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Servizio biglietteria/controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.254665, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Locazioni impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.125607, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Noleggi e locazioni varie', normalizedCategory:'other_expenses', amountNative:-1.112632, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.97
    { rawLabel:'Locazioni immobiliari', normalizedCategory:'admin_general_expense', amountNative:-0.355151, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.93
    { rawLabel:'Compensi contrattuali calciatori', normalizedCategory:'wages_squad', amountNative:-87.496056, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.97
    { rawLabel:'Compensi contrattuali allenatori-tecnici', normalizedCategory:'wages_squad', amountNative:-12.071867, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.94
    { rawLabel:'Salari-stipendi', normalizedCategory:'wages_squad', amountNative:-7.925028, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.93
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.208454, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Oneri sociali', normalizedCategory:'wages_squad', amountNative:-0.848752, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'F.A.F.I.C. - T.F.R.', normalizedCategory:'wages_squad', amountNative:-0.54002, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'F.A.F.I.C. - T.F.R.', normalizedCategory:'wages_squad', amountNative:-0.630353, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.455305, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Amm. Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-48.514863, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Amm. Costi capitalizzati vivaio', normalizedCategory:'other_amortisation', amountNative:-1.106782, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Altre Immobilizzazioni', normalizedCategory:'other_amortisation', amountNative:-1.013991, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.97
    { rawLabel:'Amm. Immobili strumentali', normalizedCategory:'depreciation', amountNative:-2.101121, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.99
    { rawLabel:'Amm. Impianti specifici', normalizedCategory:'depreciation', amountNative:-0.251018, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.98
    { rawLabel:'Amm. Automezzi e autovetture', normalizedCategory:'depreciation', amountNative:-0.003152, disclosureLevel:'aggregated' }, // pág. 38, Claude 0.9
    { rawLabel:'Amm. Attrezzatura generica', normalizedCategory:'depreciation', amountNative:-0.220712, disclosureLevel:'aggregated' }, // pág. 38, Claude 0.95
    { rawLabel:'Amm. Mobili macchine d\'ufficio', normalizedCategory:'depreciation', amountNative:-0.17381, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.91
    { rawLabel:'Amm. Macchine d\'ufficio elettroniche', normalizedCategory:'depreciation', amountNative:-0.027852, disclosureLevel:'aggregated' }, // pág. 38, Claude 0.9
    { rawLabel:'Amm. Altri beni sociali', normalizedCategory:'depreciation', amountNative:-0.005065, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.98
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.420854, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'d) svalutazione crediti compresi nell\'attivo circolante e disp. liquide', normalizedCategory:'other_expenses', amountNative:-0.157219, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.97
    { rawLabel:'11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.277302, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.582109, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-2.097633, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-5.848402, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:0, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'- premi e/o indennizzi passivi ex art.103, comma 3, NOIF', normalizedCategory:'player_amortisation', amountNative:-2.936943, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'- oneri diversi da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-0.066392, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-2.235802, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.96
  ],
  2020: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisto materiali vari e di consumo', normalizedCategory:'admin_general_expense', amountNative:-1.133695, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Acquisto divise dipendenti', normalizedCategory:'admin_general_expense', amountNative:-1.046453, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Acquisto materiale pubblicitario e promozionale', normalizedCategory:'admin_general_expense', amountNative:-0.282645, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.017575, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Sconti e abbuoni su acquisti', normalizedCategory:'other_expenses', amountNative:0.004882, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Compensi a terzi', normalizedCategory:'admin_general_expense', amountNative:-11.747652, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Spese Pubblicitarie', normalizedCategory:'admin_general_expense', amountNative:-1.676663, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.687856, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Spese Amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-1.973209, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-1.20469, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi vitto - alloggio - locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.000444, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Servizio biglietteria/controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.55884, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Spese varie organizzazioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.333954, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-2.066244, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi per utenze', normalizedCategory:'admin_general_expense', amountNative:-0.560181, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.555663, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.343752, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Trasferimento temporaneo calciatori', normalizedCategory:'other_expenses', amountNative:-2.766941, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Locazioni impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.367904, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Noleggi e locazioni varie', normalizedCategory:'other_expenses', amountNative:-0.808488, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Locazioni immobiliari', normalizedCategory:'admin_general_expense', amountNative:-0.149163, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-67.507412, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.929494, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.608337, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-3.097412, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Amm. Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-39.835618, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Costi capitalizzati vivaio', normalizedCategory:'other_amortisation', amountNative:-2.387521, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Altre Immobilizzazioni', normalizedCategory:'other_amortisation', amountNative:-0.50822, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-2.025122, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.089414, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'d) svalutazione crediti compresi nell\'attivo circolante e disp. liquide', normalizedCategory:'other_expenses', amountNative:-0.625211, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.093168, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.057305, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Altri costi diversi di gestione', normalizedCategory:'other_expenses', amountNative:-12.247774, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Minusvalenze cess dir plur prest calciatori', normalizedCategory:'exceptional_items', amountNative:-0.24889, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Oneri bancari', normalizedCategory:'other_expenses', amountNative:-0.019307, disclosureLevel:'aggregated' }, // pág. 40, ? 0.6
    { rawLabel:'Contributi Lega Calcio', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Imposte e tasse varie', normalizedCategory:'admin_general_expense', amountNative:-0.562018, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Ammende - multe gare', normalizedCategory:'other_expenses', amountNative:-0.02855, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-1.902202, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Perdite su crediti', normalizedCategory:'other_expenses', amountNative:-0.039245, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Abbuoni e arrotondamenti passivi', normalizedCategory:'other_expenses', amountNative:-0.000583, disclosureLevel:'aggregated' }, // pág. 40, precedente
  ],
  2025: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-5.008868, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.97
    { rawLabel:'7) per servizi', normalizedCategory:'admin_general_expense', amountNative:-36.715169, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'8) per godimento beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-1.776468, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.97
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-110.328541, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-6.454514, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.261721, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-5.163032, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'depreciation', amountNative:-69.469909, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-3.917778, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-2.611342, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'d) svalutazione crediti compresi nell\'attivo circolante e disp. liquide', normalizedCategory:'other_expenses', amountNative:-0.355413, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:1.401684, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.289039, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-2.698511, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-9.846796, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.327543, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'- premi e/o indennizzi passivi ex art.103, comma 3, NOIF', normalizedCategory:'player_amortisation', amountNative:-0.212873, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'- oneri diversi da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-4.748042, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.927896, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'a) di partecipazioni (svalutazione)', normalizedCategory:'other_expenses', amountNative:-0.004, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
  2019: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisto materiali vari e di consumo', normalizedCategory:'admin_general_expense', amountNative:-1.352429, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Acquisto divise dipendenti', normalizedCategory:'admin_general_expense', amountNative:-0.96108, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Acquisto materiale pubblicitario e promozionale', normalizedCategory:'admin_general_expense', amountNative:-0.187297, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Acquisto materiale sportivo', normalizedCategory:'other_expenses', amountNative:-0.026437, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.98
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.012573, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Sconti e abbuoni su acquisti', normalizedCategory:'other_expenses', amountNative:0.008578, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Compensi a terzi', normalizedCategory:'admin_general_expense', amountNative:-5.985205, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Spese Pubblicitarie', normalizedCategory:'admin_general_expense', amountNative:-3.130416, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.734472, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Spese Amministrative e generali serv.', normalizedCategory:'admin_general_expense', amountNative:-1.785424, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-1.72108, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi vitto - alloggio - locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.085787, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Servizio biglietteria/controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-1.063552, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Spese varie organizzazioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.839551, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-0.803921, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi per utenze', normalizedCategory:'admin_general_expense', amountNative:-0.573826, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.527105, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.387647, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Trasferimento temporaneo calciatori', normalizedCategory:'other_expenses', amountNative:-10.292384, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Locazioni impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-1.104545, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Noleggi e locazioni varie', normalizedCategory:'other_expenses', amountNative:-0.846915, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Locazioni immobiliari', normalizedCategory:'admin_general_expense', amountNative:-0.1027, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Canoni Leasing', normalizedCategory:'admin_general_expense', amountNative:-0.003009, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.97
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-61.644235, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.798158, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.612309, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'d) trattamento di quiescenza e simili', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-3.989276, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Amm. Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-31.346324, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Costi capitalizzati vivaio', normalizedCategory:'other_amortisation', amountNative:-2.702715, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Altre Immobilizzazioni', normalizedCategory:'other_amortisation', amountNative:-0.447769, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Immobili strumentali', normalizedCategory:'depreciation', amountNative:-0.878549, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Impianti specifici', normalizedCategory:'depreciation', amountNative:-0.412405, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Macchine d\'ufficio elettroniche', normalizedCategory:'depreciation', amountNative:-0.010376, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Mobili macchine d\'ufficio', normalizedCategory:'depreciation', amountNative:-0.058084, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Altri beni sociali', normalizedCategory:'depreciation', amountNative:-0.047366, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Amm. Attrezzatura generica', normalizedCategory:'depreciation', amountNative:-0.094465, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.412363, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'d) svalutazione crediti compresi nell\'attivo circolante e disp. liquide', normalizedCategory:'other_expenses', amountNative:-0.055632, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.20754, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'12) Accantonamenti per rischi ed oneri', normalizedCategory:'other_amortisation', amountNative:-0.093632, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.9
    { rawLabel:'13) Altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.85
    { rawLabel:'Altri costi diversi di gestione', normalizedCategory:'other_expenses', amountNative:-4.798984, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.525938, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Imposte e tasse varie', normalizedCategory:'admin_general_expense', amountNative:-0.406115, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Contributi Lega Calcio', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Minusvalenze cess dir plur prest calciatori', normalizedCategory:'exceptional_items', amountNative:-0.306111, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Percentuale squadre ospiti', normalizedCategory:'match_organisation_expense', amountNative:-0.219613, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Ammende - multe gare', normalizedCategory:'other_expenses', amountNative:-0.14575, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Perdite su crediti', normalizedCategory:'other_expenses', amountNative:-0.002152, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Abbuoni e arrotondamenti passivi', normalizedCategory:'other_expenses', amountNative:-0.00004, disclosureLevel:'aggregated' }, // pág. 40, precedente
  ],
  2018: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-2.39852, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Compensi a terzi', normalizedCategory:'admin_general_expense', amountNative:-6.018617, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.487189, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Spese Pubblicitarie', normalizedCategory:'admin_general_expense', amountNative:-1.882019, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-1.835932, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Spese Amministrative e generali serv.', normalizedCategory:'admin_general_expense', amountNative:-1.496227, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi vitto - alloggio - locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.06945, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-0.887608, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Spese varie organizzazioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.872929, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.709293, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Servizio biglietteria/controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.555245, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi per utenze', normalizedCategory:'admin_general_expense', amountNative:-0.519248, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.477015, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Trasferimento temporaneo calciatori', normalizedCategory:'other_expenses', amountNative:-5.436843, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Noleggi e locazioni varie', normalizedCategory:'other_expenses', amountNative:-0.787824, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Locazioni impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.157459, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Locazioni immobiliari', normalizedCategory:'admin_general_expense', amountNative:-0.139529, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Canoni Leasing', normalizedCategory:'admin_general_expense', amountNative:-0.005066, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-42.881429, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.809913, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.617851, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'d) trattamento di quiescenza e simili', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-3.207111, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Amm. Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-30.658632, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Amm. Costi capitalizzati vivaio', normalizedCategory:'other_amortisation', amountNative:-2.646982, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Amm. Altre Immobilizzazioni', normalizedCategory:'other_amortisation', amountNative:-0.392204, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.32995, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.36, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'d) svalutazione crediti compresi nell\'attivo circolante e disp. liquide', normalizedCategory:'other_expenses', amountNative:-1.210907, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.208929, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'12) Accantonamenti per rischi ed oneri', normalizedCategory:'other_amortisation', amountNative:-0.009315, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'13) Altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'14) Oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.444735, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.93
  ],
  2023: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Acquisto materiali vari e di consumo', normalizedCategory:'admin_general_expense', amountNative:-1.400427, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Acquisto divise dipendenti', normalizedCategory:'admin_general_expense', amountNative:-1.1555, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Acquisto materiale pubblicitario e promozionale', normalizedCategory:'admin_general_expense', amountNative:-0.162799, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Acquisto medicinali', normalizedCategory:'admin_general_expense', amountNative:-0.03467, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Sconti e abbuoni su acquisti', normalizedCategory:'other_expenses', amountNative:0.017521, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Compensi a terzi', normalizedCategory:'admin_general_expense', amountNative:-12.403257, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-3.226461, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Spese Amministrative e generali serv.', normalizedCategory:'admin_general_expense', amountNative:-2.96066, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-2.166668, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Spese Pubblicitarie', normalizedCategory:'admin_general_expense', amountNative:-1.964954, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-1.094839, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Costi vitto - alloggio - locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.034864, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Costi per utenze', normalizedCategory:'admin_general_expense', amountNative:-0.991616, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.774678, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.628642, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Servizio biglietteria/controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.180375, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Locazioni impianti sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.023988, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Noleggi e locazioni varie', normalizedCategory:'other_expenses', amountNative:-0.966341, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Locazioni immobiliari', normalizedCategory:'admin_general_expense', amountNative:-0.263436, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-75.730017, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.52136, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.812017, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-4.384712, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Amm. Diritti pluriennali alle prestazioni dei calciatori', normalizedCategory:'player_amortisation', amountNative:-57.102601, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Costi capitalizzati vivaio', normalizedCategory:'other_amortisation', amountNative:-1.662626, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Altre Immobilizzazioni', normalizedCategory:'other_amortisation', amountNative:-0.539185, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Immobili strumentali', normalizedCategory:'depreciation', amountNative:-2.012273, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Impianti specifici', normalizedCategory:'depreciation', amountNative:-0.206257, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Automezzi e autovetture', normalizedCategory:'depreciation', amountNative:-0.003152, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Attrezzatura generica', normalizedCategory:'depreciation', amountNative:-0.167792, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Mobili macchine d\'ufficio', normalizedCategory:'depreciation', amountNative:-0.180069, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Macchine d\'ufficio elettroniche', normalizedCategory:'depreciation', amountNative:-0.018816, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Amm. Altri beni sociali', normalizedCategory:'depreciation', amountNative:-0.002335, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.528074, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'d) svalutazione crediti compresi nell\'attivo circolante e disp. liquide', normalizedCategory:'other_expenses', amountNative:-0.243489, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.055059, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'12) Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.300226, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Spese varie organizzazioni gare', normalizedCategory:'match_organisation_expense', amountNative:-1.098158, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.99
    { rawLabel:'Tasse iscrizione F.I.G.C.', normalizedCategory:'match_organisation_expense', amountNative:-0.0418, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.97
    { rawLabel:'Ammende - multe gare', normalizedCategory:'other_expenses', amountNative:-0.08634, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.03, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.005172, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Premio di valorizzazione passivo', normalizedCategory:'player_amortisation', amountNative:-0.95055, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.9
    { rawLabel:'Premio di rendimento passivo', normalizedCategory:'wages_squad', amountNative:-1, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.96
    { rawLabel:'Oneri diversi campagna trasferimenti', normalizedCategory:'other_expenses', amountNative:-0.22, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.98
    { rawLabel:'Premi di preparazione ex art. 96 N.O.I.F.', normalizedCategory:'player_amortisation', amountNative:-0.016502, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.97
    { rawLabel:'Sell on fee passivo', normalizedCategory:'other_expenses', amountNative:-1.861605, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.92
    { rawLabel:'Omaggi', normalizedCategory:'admin_general_expense', amountNative:-0.122299, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Imposte e tasse varie', normalizedCategory:'admin_general_expense', amountNative:-0.597572, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Altri costi diversi di gestione', normalizedCategory:'other_expenses', amountNative:-0.264714, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Perdite su crediti', normalizedCategory:'other_expenses', amountNative:-0.0247, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.145246, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Percentuale squadre ospiti', normalizedCategory:'match_organisation_expense', amountNative:-0.022947, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Contributi Lega Calcio', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 38, precedente
  ],
};
const atalantaitFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-12-31',
    sourceId:'atalanta-it-bilancio-consolidato-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.3717, tax:-17.970195,
    extraRows: [
      {label:'- da controllanti', value:0.167005},
      {label:'- da altri', value:0.338548},
      {label:'- verso controllanti', value:0},
      {label:'- verso altri', value:-0.877249},
      {label:'- utili (perdite) su cambi realizzate', value:0.001758},
      {label:'- utili (perdite) su cambi da valutazione', value:-0.001762},
      {label:'a) imposte correnti', value:-5.730378},
      {label:'b) imposte anni precedenti', value:-0.818883},
      {label:'c) oneri/(proventi) da adesione consolidato fiscale', value:-10.503021},
      {label:'d) imposte differite', value:-1.73917},
      {label:'e) imposte anticipate', value:0.821257},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:242.670019, officialTotalExpenses:185.454299, officialPAT:35.142575,
  },
  2024: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'atalanta-it-bilancio-consolidato-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:1.221437, tax:-9.394905,
    extraRows: [
      {label:'b) da titoli iscritti nelle immobilizzazioni che non costit. partecipazioni', value:0},
      {label:'- da altri', value:6.471792},
      {label:'- verso altri', value:-5.216739},
      {label:'- utili (perdite) su cambi realizzate', value:-0.033595},
      {label:'- utili (perdite) su cambi da valutazione', value:-0.000021},
      {label:'a) imposte correnti', value:-5.395931},
      {label:'b) imposte anni precedenti', value:0.024933},
      {label:'c) oneri/(proventi) da adesione consolidato fiscale', value:-10.510942},
      {label:'d) imposte differite', value:7.141271},
      {label:'e) imposte anticipate', value:-0.654236},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:243.723844, officialTotalExpenses:223.674422, officialPAT:11.875955,
  },
  2020: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2020-12-31',
    sourceId:'atalanta-it-bilancio-consolidato-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.146086, tax:-22.648727,
    extraRows: [
      {label:'- da imprese controllate', value:0},
      {label:'- da controllanti', value:0.281967},
      {label:'- da altri', value:0.256369},
      {label:'- verso controllanti', value:-0.115775},
      {label:'- verso altri', value:-1.572128},
      {label:'- utili (perdite) su cambi realizzate', value:0.003481},
      {label:'a) imposte correnti', value:-6.021778},
      {label:'b) imposte anni precedenti', value:0.818883},
      {label:'c) oneri/(proventi) da adesione consolidato fiscale', value:-10.737493},
      {label:'d) imposte differite', value:-7.248351},
      {label:'e) imposte anticipate', value:0.540012},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:241.997996, officialTotalExpenses:164.313841, officialPAT:51.738249,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 4.000. rettifiche D) impresas en negativo = costo; Risultato prima delle imposte 58.571.254 = 59.105.997 - 530.743 - 4.000
  2025: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'atalanta-it-bilancio-consolidato-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.530743, tax:-20.709269,
    extraRows: [
      {label:'- da altri', value:6.717045},
      {label:'- verso altri', value:-6.640319},
      {label:'- utili (perdite) su cambi realizzate', value:-0.133157},
      {label:'- utili (perdite) su cambi da valutazione', value:-0.474312},
      {label:'a) imposte correnti', value:-7.387644},
      {label:'b) imposte anni precedenti', value:0},
      {label:'c) oneri/(proventi) da adesione consolidato fiscale', value:-3.653405},
      {label:'d) imposte differite', value:-9.845609},
      {label:'e) imposte anticipate', value:0.177389},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:320.817768, officialTotalExpenses:261.388228, officialPAT:37.861985,
  },
  2019: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-12-31',
    sourceId:'atalanta-it-bilancio-consolidato-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.838256, tax:-13.590922,
    extraRows: [
      {label:'- da imprese controllanti', value:0.175438},
      {label:'- da altri', value:0.01419},
      {label:'c) verso imprese controllanti', value:-0.189682},
      {label:'- da altri', value:-0.837279},
      {label:'17-bis) Utile e perdite su cambi', value:-0.000923},
      {label:'Imposte correnti', value:-4.313217},
      {label:'Oneri da adesione al consolidato fiscale', value:-6.710851},
      {label:'Imposte differite (anticipate)', value:-2.566854},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:188.621207, officialTotalExpenses:146.862549, officialPAT:26.497451,
  },
  2018: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-12-31',
    sourceId:'atalanta-it-bilancio-consolidato-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.021654, tax:-10.664504,
    extraRows: [
      {label:'- da imprese controllanti', value:0.028219},
      {label:'- da altri', value:0.001719},
      {label:'c) verso imprese controllanti', value:-0.224682},
      {label:'- da altri', value:-0.827075},
      {label:'17-bis) Utile e perdite su cambi', value:0.000165},
      {label:'Imposte correnti', value:-3.410671},
      {label:'Imposte relative ad esercizi precedenti', value:0.26949},
      {label:'Oneri da adesione al consolidato fiscale', value:-8.059694},
      {label:'Proventi da adesione al consolidato fiscale', value:0},
      {label:'Imposte differite', value:-0.093657},
      {label:'Imposte anticipate', value:0.630028},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:155.740626, officialTotalExpenses:120.096113, officialPAT:23.958355,
  },
  2023: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'atalanta-it-bilancio-consolidato-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.346164, tax:-3.784767,
    extraRows: [
      {label:'b) da titoli iscritti nelle immobilizzazioni che non costit. partecipazioni', value:0.113},
      {label:'- da altri', value:2.14513},
      {label:'- verso altri', value:-2.604874},
      {label:'- utili (perdite) su cambi realizzate', value:0.000997},
      {label:'- utili (perdite) su cambi da valutazione', value:-0.000417},
      {label:'a) imposte correnti', value:-3.708224},
      {label:'b) imposte anni precedenti', value:1.06642},
      {label:'c) oneri/(proventi) da adesione consolidato fiscale', value:0.023007},
      {label:'d) imposte differite', value:-1.06139},
      {label:'e) imposte anticipate', value:-0.10458},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:195.386565, officialTotalExpenses:185.488783, officialPAT:5.616433,
  },
};
const atalantaitPresupuestoOverlayByYear = {};

const atalantaitPasesData = [];
const atalantaitResultadosData = {};
const atalantaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['atalanta-it'] = {
  revenueLinesByYear: atalantaitRevenueLinesByYear, expenseLinesByYear: atalantaitExpenseLinesByYear,
  fiscalYearMeta: atalantaitFiscalYearMeta, pasesData: atalantaitPasesData,
  resultadosData: atalantaitResultadosData, titulosData: atalantaitTitulosData,
  presupuestoOverlayByYear: atalantaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'atalanta-it-bilancio-consolidato-2021': {
    id:'atalanta-it-bilancio-consolidato-2021', clubId:'atalanta-it',
    title:'Atalanta Bergamasca Calcio S.p.A. — Atalanta-bilancio-consolidato-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'atalanta-it-bilancio-consolidato-2024': {
    id:'atalanta-it-bilancio-consolidato-2024', clubId:'atalanta-it',
    title:'Atalanta Bergamasca Calcio S.p.A. — Atalanta-bilancio-consolidato-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'atalanta-it-bilancio-consolidato-2020': {
    id:'atalanta-it-bilancio-consolidato-2020', clubId:'atalanta-it',
    title:'Atalanta Bergamasca Calcio S.p.A. — Atalanta-bilancio-consolidato-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'atalanta-it-bilancio-consolidato-2025': {
    id:'atalanta-it-bilancio-consolidato-2025', clubId:'atalanta-it',
    title:'Atalanta Bergamasca Calcio S.p.A. — Atalanta-bilancio-consolidato-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'atalanta-it-bilancio-consolidato-2019': {
    id:'atalanta-it-bilancio-consolidato-2019', clubId:'atalanta-it',
    title:'Atalanta Bergamasca Calcio S.p.A. — Atalanta-bilancio-consolidato-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'atalanta-it-bilancio-consolidato-2018': {
    id:'atalanta-it-bilancio-consolidato-2018', clubId:'atalanta-it',
    title:'Atalanta Bergamasca Calcio S.p.A. — Atalanta-bilancio-consolidato-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'atalanta-it-bilancio-consolidato-2023': {
    id:'atalanta-it-bilancio-consolidato-2023', clubId:'atalanta-it',
    title:'Atalanta Bergamasca Calcio S.p.A. — Atalanta-bilancio-consolidato-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['atalanta-it'] = null;

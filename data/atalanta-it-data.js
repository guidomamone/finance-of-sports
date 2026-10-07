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
});

memberCountByClub['atalanta-it'] = null;

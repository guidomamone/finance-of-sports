// ============================================================================
// data/torino-it-data.js — Torino Football Club S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Torino/Torino-bilancio-2024.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "torino-it" — slug de "Torino" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Torino Football Club S.p.A." — el .md, 4 veces (nombre del club + forma societaria)
//   displayName        ok        "Torino" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (131 de 134 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 7 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] torino: #ECAC00 Orange, #8B2A1F Dark Red, #5B8CC1 Blue, #FFFFFF White
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (contenido del .md (131 de 134 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 3 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2024-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-12-31 = 0.9626 (Cierre BCE al 31/12/2024 (1 EUR = 1,0389 USD))
//   sourceId           ok        "torino-it-bilancio-2024" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Torino"
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-12-31","sourceId":"torino-it-bilancio-2024"}
// ============================================================================

const torinoitRevenueLinesByYear = {
  // 2018: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Torino/Torino-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Torino/Torino-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Ricavi biglietteria gare nazionali e amichevoli', normalizedCategory:'matchday_competition', amountNative:3.44, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:2.469, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Ricavi da gare di squadre minori', normalizedCategory:'youth_football', amountNative:0.062, disclosureLevel:'aggregated' }, // pág. 39, ? 0.6
    { rawLabel:'Sponsor Ufficiali e Tecnico', normalizedCategory:'sponsorship_commercial', amountNative:4.672, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Altri proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:0.83, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Proventi pubblicitari generati dalla concessionaria Cairo Pubblicità', normalizedCategory:'sponsorship_commercial', amountNative:3.368, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Proventi radiotelevisivi', normalizedCategory:'broadcasting', amountNative:54.109, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Proventi da accesso segnale televisivo', normalizedCategory:'broadcasting', amountNative:1.139, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:6.647, disclosureLevel:'aggregated' }, // pág. 40, Jev 0.99
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:1.717, disclosureLevel:'aggregated' }, // pág. 40, Jev 0.98
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:15.334, disclosureLevel:'aggregated' }, // pág. 40, Jev 0.99
    { rawLabel:'Contributi di solidarietà', normalizedCategory:'player_sales', amountNative:0.016, disclosureLevel:'aggregated' }, // pág. 40, ? 0.7
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Torino/Torino-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Torino/Torino-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Ricavi biglietteria gare nazionali e amichevoli', normalizedCategory:'matchday_competition', amountNative:1.215, disclosureLevel:'aggregated' }, // pág. 47, Jev 1
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.185, disclosureLevel:'aggregated' }, // pág. 47, Jev 1
    { rawLabel:'Ricavi da gare di squadre minori', normalizedCategory:'youth_football', amountNative:0.001, disclosureLevel:'aggregated' }, // pág. 47, ? 0.6
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.97
    { rawLabel:'Sponsor Ufficiali e Tecnico', normalizedCategory:'sponsorship_commercial', amountNative:6.96, disclosureLevel:'aggregated' }, // pág. 48, Jev 1
    { rawLabel:'Altri proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:1.612, disclosureLevel:'aggregated' }, // pág. 48, Jev 1
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:2.281911, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.303936, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:54.314348, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:1.8524, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.99
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:8.838201, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:0.215674, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:5.939498, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Torino/Torino-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Torino/Torino-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Ricavi biglietteria gare nazionali e amichevoli', normalizedCategory:'matchday_competition', amountNative:4.482, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:1.473, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:3.002211, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.97
    { rawLabel:'Sponsor Ufficiali e Tecnico', normalizedCategory:'sponsorship_commercial', amountNative:7.329, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Altri proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:1.773, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:5.078304, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.495238, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:48.508991, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.710816, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:58.455538, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:0.125024, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:1.108275, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Torino/Torino-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Torino/Torino-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Ricavi biglietteria gare nazionali e amichevoli', normalizedCategory:'matchday_competition', amountNative:3.939, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.538, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Ricavi da gare di squadre minori', normalizedCategory:'youth_football', amountNative:0.002, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:2.569713, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Sponsor Ufficiali e Tecnico', normalizedCategory:'sponsorship_commercial', amountNative:6.672, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Altri proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:1.509, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:2.427895, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:1.990963, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:52.647451, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:0.175, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:38.257373, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:0.7447, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'i) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:1.270827, disclosureLevel:'aggregated' }, // pág. 18, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Torino/Torino-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Torino/Torino-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Ricavi biglietteria gare nazionali e amichevoli', normalizedCategory:'matchday_competition', amountNative:3.364, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Ricavi biglietteria gare internazionali', normalizedCategory:'matchday_competition', amountNative:0.886, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:2.407, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Ricavi da gare di squadre minori', normalizedCategory:'youth_football', amountNative:0.037, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Sponsor Ufficiali e Tecnico', normalizedCategory:'sponsorship_commercial', amountNative:5.696, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Altri proventi da sponsorizzazione', normalizedCategory:'sponsorship_commercial', amountNative:1.372, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi pubblicitari generati dalla concessionaria Cairo Pubblicità', normalizedCategory:'sponsorship_commercial', amountNative:3.018, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Proventi radiotelevisivi', normalizedCategory:'broadcasting', amountNative:57.303, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Rimborso costi per produzioni televisive', normalizedCategory:'broadcasting', amountNative:0.868, disclosureLevel:'aggregated' }, // pág. 36, ? 0.6
    { rawLabel:'Altri ricavi', normalizedCategory:'other_income', amountNative:8.561, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Ricavi da cessione temporanea calciatori', normalizedCategory:'player_sales', amountNative:0.855, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:11.864, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Contributi di solidarietà/Indennità formazione', normalizedCategory:'player_sales', amountNative:0.101, disclosureLevel:'aggregated' }, // pág. 36, Claude 0.85
  ],
};
const torinoitExpenseLinesByYear = {
  2018: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'per materie prime,sussid. e di consumo', normalizedCategory:'other_expenses', amountNative:-0.953338, disclosureLevel:'aggregated' }, // pág. 14, Jev 1
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.27, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.707, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-3.433, disclosureLevel:'aggregated' }, // pág. 42, Jev 0.93
    { rawLabel:'Costi vitto, alloggio, locomozione gare, lavanderia', normalizedCategory:'match_organisation_expense', amountNative:-2.049, disclosureLevel:'aggregated' }, // pág. 42, Claude 0.9
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-1.566, disclosureLevel:'aggregated' }, // pág. 42, Jev 0.99
    { rawLabel:'Costi gestione impianti sportivi ed eventi', normalizedCategory:'match_organisation_expense', amountNative:-3.507, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Costi produzione televisiva', normalizedCategory:'match_organisation_expense', amountNative:-1.158, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Costi amministrativi, pubblicitari e generali', normalizedCategory:'admin_general_expense', amountNative:-1.534, disclosureLevel:'aggregated' }, // pág. 42, Jev 1
    { rawLabel:'Corrispettivi per acquisizioni temporanee di calciatori', normalizedCategory:'other_expenses', amountNative:-5.051, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.98
    { rawLabel:'Affitto campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.811, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.96
    { rawLabel:'Affitto sede ed altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.042, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.96
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.27, disclosureLevel:'aggregated' }, // pág. 43, Jev 0.94
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-59.001852, disclosureLevel:'aggregated' }, // pág. 14, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.393577, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.98
    { rawLabel:'c) trattamento fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.283245, disclosureLevel:'aggregated' }, // pág. 14, Claude 0.8
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.289875, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'a) amm.ti immob. immateriali', normalizedCategory:'player_amortisation', amountNative:-21.027152, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'b) amm.ti immob. materiali', normalizedCategory:'depreciation', amountNative:-0.144396, disclosureLevel:'aggregated' }, // pág. 14, Jev 1
    { rawLabel:'c) svalutazione delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.334475, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.97
    { rawLabel:'d) svalut.crediti di attivo circ. e disp.l.', normalizedCategory:'other_expenses', amountNative:-0.5, disclosureLevel:'aggregated' }, // pág. 14, Jev 1
    { rawLabel:'accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.97
    { rawLabel:'Minusvalenze', normalizedCategory:'exceptional_items', amountNative:-1.764, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.92
    { rawLabel:'Spese per gare ufficiali', normalizedCategory:'match_organisation_expense', amountNative:-0.676, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Contributo UEFA Europa League', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Percentuale incassi bigliettazione squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-0.042, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.98
    { rawLabel:'Altri oneri', normalizedCategory:'other_expenses', amountNative:-0.711, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
  ],
  2021: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Materiale tecnico (divise ufficiali)', normalizedCategory:'admin_general_expense', amountNative:-1.193, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Materiale di consumo e altri materiali', normalizedCategory:'admin_general_expense', amountNative:-0.097, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.785, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.687, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-3.602, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.93
    { rawLabel:'Costi vitto, alloggio, locomozione gare, lavanderia', normalizedCategory:'match_organisation_expense', amountNative:-1.714, disclosureLevel:'aggregated' }, // pág. 50, Claude 0.88
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-1.044, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.99
    { rawLabel:'Costi gestione impianti ed eventi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-2.469, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.97
    { rawLabel:'Costi produzione televisiva', normalizedCategory:'match_organisation_expense', amountNative:-0.598, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Costi amministrativi, pubblicitari e generali', normalizedCategory:'admin_general_expense', amountNative:-1.508, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Affitto campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.777, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.96
    { rawLabel:'Affitto sede ed altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.042, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.96
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.344, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.94
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-73.699728, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.556709, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.98
    { rawLabel:'c) trattamento fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.282341, disclosureLevel:'aggregated' }, // pág. 19, Claude 0.8
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.3466, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'a) amm.ti immob. immateriali', normalizedCategory:'player_amortisation', amountNative:-33.759631, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'b) amm.ti immob. materiali', normalizedCategory:'depreciation', amountNative:-0.222369, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'c) svalutazione delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.97
    { rawLabel:'d) svalut.crediti di attivo circ. e disp.l.', normalizedCategory:'other_expenses', amountNative:-0.1, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.96
    { rawLabel:'13) altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 19, Claude 0.8
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-1.196917, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
    { rawLabel:'b) costi da cessione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-3.366074, disclosureLevel:'aggregated' }, // pág. 19, Claude 0.85
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.999484, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.99
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-0.04, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.98
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-0.641301, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.97
  ],
  2024: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Materiale tecnico (divise ufficiali)', normalizedCategory:'admin_general_expense', amountNative:-1.358, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Materiale di consumo e altri materiali', normalizedCategory:'admin_general_expense', amountNative:-0.191, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.586, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.817, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-3.558, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.93
    { rawLabel:'Costi vitto, alloggio, trasporti, lavanderia', normalizedCategory:'match_organisation_expense', amountNative:-3.63, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.94
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-0.964, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'Costi gestione impianti ed eventi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-2.559, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.97
    { rawLabel:'Costi per l’energia', normalizedCategory:'admin_general_expense', amountNative:-1.038, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.96
    { rawLabel:'Costi amministrativi e generali', normalizedCategory:'admin_general_expense', amountNative:-2.687, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Concessioni campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-1.068, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.511, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.94
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-54.208625, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.974162, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.98
    { rawLabel:'c) trattamento fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.323897, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.8
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.346618, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'a) amm.ti immob. immateriali', normalizedCategory:'player_amortisation', amountNative:-32.619481, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'b) amm.ti immob. materiali', normalizedCategory:'depreciation', amountNative:-0.208923, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'c) svalutazione delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.97
    { rawLabel:'d) svalut.crediti di attivo circ. e disp.l.', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.08, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.96
    { rawLabel:'13) altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.8
    { rawLabel:'Spese per gare ufficiali', normalizedCategory:'match_organisation_expense', amountNative:-0.75, disclosureLevel:'aggregated' }, // pág. 47, Jev 1
    { rawLabel:'Contributo UEFA Europa League', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'b) costi da cessione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.924891, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.85
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.076729, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-0.013, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.98
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.989044, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.97
  ],
  2022: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale tecnico (divise ufficiali)', normalizedCategory:'admin_general_expense', amountNative:-1.087, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Materiale di consumo e altri materiali', normalizedCategory:'admin_general_expense', amountNative:-0.056, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.526, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.791, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-3.342, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare, lavanderia', normalizedCategory:'match_organisation_expense', amountNative:-2.73, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-0.868, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi gestione impianti ed eventi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-2.508, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi per l\'energia', normalizedCategory:'admin_general_expense', amountNative:-1.65, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi amministrativi, pubblicitari e generali', normalizedCategory:'admin_general_expense', amountNative:-2.032, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Affitto campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.92, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Affitto sede ed altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.043, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.368, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-62.285321, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.787898, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'c) trattamento fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.266142, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.312375, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'a) amm.ti immob. immateriali', normalizedCategory:'player_amortisation', amountNative:-27.566933, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'b) amm.ti immob. materiali', normalizedCategory:'depreciation', amountNative:-0.230615, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'c) svalutazione delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'d) svalut.crediti di attivo circ. e disp.l.', normalizedCategory:'other_expenses', amountNative:-0.203, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'13) altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-1.059631, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'b) costi da cessione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-1.520638, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-3.760772, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-0.991241, disclosureLevel:'aggregated' }, // pág. 18, precedente
  ],
  2019: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'Materiale tecnico (divise ufficiali)', normalizedCategory:'admin_general_expense', amountNative:-1.1, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Materiale di consumo e altri materiali', normalizedCategory:'admin_general_expense', amountNative:-0.066, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-0.271, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.802, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-3.387, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare, lavanderia', normalizedCategory:'match_organisation_expense', amountNative:-1.812, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-1.96, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi gestione impianti sportivi ed eventi', normalizedCategory:'match_organisation_expense', amountNative:-3.458, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi produzione televisiva', normalizedCategory:'match_organisation_expense', amountNative:-1.103, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Costi amministrativi, pubblicitari e generali', normalizedCategory:'admin_general_expense', amountNative:-1.904, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Corrispettivi per acquisizioni temporanee di calciatori', normalizedCategory:'other_expenses', amountNative:-1.322, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Affitto campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.88, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Affitto sede ed altri locali', normalizedCategory:'admin_general_expense', amountNative:-0.041, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.353, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'[sin etiqueta] Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-59.291175, disclosureLevel:'aggregated' }, // pág. 13, Jev 1
    { rawLabel:'[sin etiqueta] Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.217909, disclosureLevel:'aggregated' }, // pág. 13, Jev 0.91
    { rawLabel:'[sin etiqueta] Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.204104, disclosureLevel:'aggregated' }, // pág. 13, Jev 0.95
    { rawLabel:'[sin etiqueta] Altri costi del personale', normalizedCategory:'wages_squad', amountNative:-0.308816, disclosureLevel:'aggregated' }, // pág. 13, Claude 0.85
    { rawLabel:'[sin etiqueta] Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-28.306204, disclosureLevel:'aggregated' }, // pág. 13, Claude 0.9
    { rawLabel:'[sin etiqueta] Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.184646, disclosureLevel:'aggregated' }, // pág. 13, Jev 0.99
    { rawLabel:'[sin etiqueta] Altre svalutazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 13, ? 0.75
    { rawLabel:'[sin etiqueta] Svalutazione dei crediti', normalizedCategory:'other_expenses', amountNative:-0.65, disclosureLevel:'aggregated' }, // pág. 13, Jev 1
    { rawLabel:'[sin etiqueta] Accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 13, Jev 0.93
    { rawLabel:'Minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.101, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Altri oneri relativi alla gestione calciatori', normalizedCategory:'other_expenses', amountNative:-1.445, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.99
    { rawLabel:'Spese per gare ufficiali', normalizedCategory:'match_organisation_expense', amountNative:-0.952, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Contributo UEFA Europa League', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Percentuale incassi bigliettazione squadra ospite', normalizedCategory:'match_organisation_expense', amountNative:-0.083, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Altri oneri', normalizedCategory:'other_expenses', amountNative:-0.499, disclosureLevel:'aggregated' }, // pág. 41, precedente
  ],
};
const torinoitFiscalYearMeta = {
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (400.771). Guido 2026-10-07: el 17) 'Interessi e altri oneri finanziari' se imprime en positivo y se resta por posición (TOTALE (C) = 15+16-17); la etapa 6 lo sumaba como ingreso (to-do 155)
  2018: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-12-31',
    sourceId:'torino-it-bilancio-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.116348, tax:2.61426,
    extraRows: [
      {label:'d) proventi diversi', value:0.517119},
      {label:'D) RETTIFICHE DI VALORI DI ATTIVITA\' FINANZIARIE', value:0},
      {label:'d) oneri diversi (17, costo)', value:-0.400771},
      {label:'Imposte esercizi precedenti', value:0},
      {label:'Imposte correnti', value:-1.778912},
      {label:'Imposte anticipate e differite', value:4.393172},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:93.803, officialTotalExpenses:107.12991, officialPAT:-12.361807,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (940.101). Guido 2026-10-07: el 17) 'Interessi e altri oneri finanziari' se imprime en positivo y se resta por posición (TOTALE (C) = 15+16-17); la etapa 6 lo sumaba como ingreso (to-do 155)
  2021: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-12-31',
    sourceId:'torino-it-bilancio-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.697262, tax:11.254531,
    extraRows: [
      {label:'d) proventi diversi', value:0.242839},
      {label:'D) RETTIFICHE DI VALORI DI ATTIVITA\' FINANZIARIE', value:0},
      {label:'d) oneri diversi (17, costo)', value:-0.940101},
      {label:'Imposte correnti', value:7.051289},
      {label:'Imposte anticipate e differite', value:4.203242},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:83.718968, officialTotalExpenses:131.07167, officialPAT:-37.79559,
  },
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (3.226.978). Guido 2026-10-07: el 17) 'Interessi e altri oneri finanziari' se imprime en positivo y se resta por posición (TOTALE (C) = 15+16-17 = (2.788.248)); la etapa 6 lo sumaba como ingreso (to-do 155)
  2024: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'torino-it-bilancio-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.788248, tax:-6.496317,
    extraRows: [
      {label:'d) proventi diversi', value:0.43873},
      {label:'d) oneri diversi (17, costo)', value:-3.226978},
      {label:'Imposte correnti', value:-2.323564},
      {label:'Imposte anticipate e differite', value:-4.172753},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:134.541397, officialTotalExpenses:114.780641, officialPAT:10.398302,
  },
  2022: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-12-31',
    sourceId:'torino-it-bilancio-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.296694, tax:-0.372268,
    extraRows: [
      {label:'d) proventi diversi', value:0.167702},
      {label:'d) oneri diversi', value:-1.464396},
      {label:'Imposte correnti', value:-0.372268},
      {label:'Imposte anticipate e differite', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:112.743922, officialTotalExpenses:114.144794, officialPAT:-6.831131,
  },
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (609.108). el 17) se imprime en positivo y se resta por posición (TOTALE C = 15+16-17 = (108.044), L648); la fila perdió la etiqueta con '17)'
  2019: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-12-31',
    sourceId:'torino-it-bilancio-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.108044, tax:2.880636,
    extraRows: [
      {label:'[sin etiqueta] Proventi diversi dai precedenti', value:0.501064},
      {label:'[sin etiqueta] Rettifiche di valore di attività finanziarie', value:0},
      {label:'17) d) oneri diversi (17, costo)', value:-0.609108},
      {label:'[sin etiqueta] Imposte correnti', value:-0.925554},
      {label:'[sin etiqueta] Imposte differite e anticipate', value:3.80619},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:96.332, officialTotalExpenses:112.975854, officialPAT:-13.971466,
  },
};
const torinoitPresupuestoOverlayByYear = {};

const torinoitPasesData = [];
const torinoitResultadosData = {};
const torinoitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['torino-it'] = {
  revenueLinesByYear: torinoitRevenueLinesByYear, expenseLinesByYear: torinoitExpenseLinesByYear,
  fiscalYearMeta: torinoitFiscalYearMeta, pasesData: torinoitPasesData,
  resultadosData: torinoitResultadosData, titulosData: torinoitTitulosData,
  presupuestoOverlayByYear: torinoitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'torino-it-bilancio-2018': {
    id:'torino-it-bilancio-2018', clubId:'torino-it',
    title:'Torino Football Club S.p.A. — Torino-bilancio-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'torino-it-bilancio-2021': {
    id:'torino-it-bilancio-2021', clubId:'torino-it',
    title:'Torino Football Club S.p.A. — Torino-bilancio-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'torino-it-bilancio-2024': {
    id:'torino-it-bilancio-2024', clubId:'torino-it',
    title:'Torino Football Club S.p.A. — Torino-bilancio-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'torino-it-bilancio-2022': {
    id:'torino-it-bilancio-2022', clubId:'torino-it',
    title:'Torino Football Club S.p.A. — Torino-bilancio-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'torino-it-bilancio-2019': {
    id:'torino-it-bilancio-2019', clubId:'torino-it',
    title:'Torino Football Club S.p.A. — Torino-bilancio-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['torino-it'] = null;

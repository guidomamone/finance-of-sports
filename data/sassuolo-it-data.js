// ============================================================================
// data/sassuolo-it-data.js — Unione Sportiva Sassuolo Calcio S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "sassuolo-it" — slug de "Sassuolo" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Unione Sportiva Sassuolo Calcio S.r.l." — el .md, 6 veces (nombre del club + forma societaria)
//   displayName        ok        "Sassuolo" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo
//   sport              ok        "futbol" — el .md nombra el fútbol 31 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] sassuolo: #1EA451 Green, #000000 Black
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
//   cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo)
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
//   sourceId           ok        "sassuolo-it-bilancio-2025" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"sassuolo-it-bilancio-2025"}
// ============================================================================

const sassuoloitRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Italia/Sassuolo/Sassuolo-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sassuolo/Sassuolo-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:1.67, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.97
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.557, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.98
    { rawLabel:'Ricavi store', normalizedCategory:'sponsorship_commercial', amountNative:0.385, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.96
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:19.305, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:7.096, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.291, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:16.205, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:2.385, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi da cessioni temporanee calciatori', normalizedCategory:'player_sales', amountNative:1.627, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi Lega non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:15.507, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Proventi diversi', normalizedCategory:'other_income', amountNative:5.671, disclosureLevel:'aggregated' }, // pág. 49, precedente
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sassuolo/Sassuolo-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:0.858, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.078, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Ricavi store', normalizedCategory:'sponsorship_commercial', amountNative:0.211, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:18.881, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:8.003, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:47.393, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:33.93, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Proventi da cessioni temporanee calciatori', normalizedCategory:'player_sales', amountNative:0.403, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Proventi Lega non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:3.372, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Proventi diversi', normalizedCategory:'other_income', amountNative:10.524, disclosureLevel:'aggregated' }, // pág. 43, precedente
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sassuolo/Sassuolo-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:2.036, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Ricavi da gare fuori casa', normalizedCategory:'matchday_competition', amountNative:0.21, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.99
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.515, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Ricavi store', normalizedCategory:'sponsorship_commercial', amountNative:0.271, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:18.916, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:7.929, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:17.772, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori', normalizedCategory:'player_sales', amountNative:32.691, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi da cessioni temporanee calciatori', normalizedCategory:'player_sales', amountNative:2.949, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi Lega non audiovisivi', normalizedCategory:'sponsorship_commercial', amountNative:13.512, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Proventi diversi', normalizedCategory:'other_income', amountNative:5.303, disclosureLevel:'aggregated' }, // pág. 48, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sassuolo/Sassuolo-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Ricavi da gare in casa', normalizedCategory:'matchday_competition', amountNative:2.395, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Ricavi da gare fuori casa', normalizedCategory:'matchday_competition', amountNative:0.035, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.921, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:18.852, disclosureLevel:'aggregated' }, // pág. 41, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:9.07, disclosureLevel:'aggregated' }, // pág. 41, Jev 1
    { rawLabel:'Proventi da cessione diritti televisivi', normalizedCategory:'broadcasting', amountNative:39.811, disclosureLevel:'aggregated' }, // pág. 41, Jev 1
    { rawLabel:'Proventi da cessioni temporanee calciatori', normalizedCategory:'player_sales', amountNative:5.889, disclosureLevel:'aggregated' }, // pág. 42, Jev 0.96
    { rawLabel:'Proventi diversi', normalizedCategory:'other_income', amountNative:5.018, disclosureLevel:'aggregated' }, // pág. 42, Jev 1
    { rawLabel:'b) plusvalenze', normalizedCategory:'player_sales', amountNative:43.399333, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.99
    { rawLabel:'f) Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:2.188567, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.98
  ],
};
const sassuoloitExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.359561, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.99
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-3.214, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.094, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.462, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Compensi per Agenti e intermediari', normalizedCategory:'other_expenses', amountNative:-4.873, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.8
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.356, disclosureLevel:'aggregated' }, // pág. 51, Jev 0.99
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.941, disclosureLevel:'aggregated' }, // pág. 51, precedente
    { rawLabel:'Amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-4.405, disclosureLevel:'aggregated' }, // pág. 51, Jev 1
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.234, disclosureLevel:'aggregated' }, // pág. 51, Claude 0.8
    { rawLabel:'8) Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.104377, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-52.650402, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.96
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.413067, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-1.027425, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.99
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-25.849587, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.778222, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'d) Svalutazioni crediti dell\'attivo', normalizedCategory:'other_expenses', amountNative:-0.00036, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.97
    { rawLabel:'11) Variazioni delle rimanenze', normalizedCategory:'other_expenses', amountNative:0.148511, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'Spese organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.597, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.032, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Oneri contribuzione Lega', normalizedCategory:'match_organisation_expense', amountNative:-3.644, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.511, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Premi valorizzazione, di addestramento e Carriera', normalizedCategory:'player_amortisation', amountNative:-0.818, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Contributo Solidarietà Fifa', normalizedCategory:'player_amortisation', amountNative:-0.618, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Premi di rendimento', normalizedCategory:'wages_squad', amountNative:-0.125, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.97
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.188, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.413, disclosureLevel:'aggregated' }, // pág. 54, Claude 0.8
  ],
  2021: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.819233, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-3.114, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.102, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.267, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Compensi per Agenti e intermediari', normalizedCategory:'other_expenses', amountNative:-6.171, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.76, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.605, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-3.806, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.737, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'8) Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.09099, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-66.099495, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.376754, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.793318, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-36.218392, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.693514, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'d) Svalutazioni crediti dell\'attivo', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'11) Variazioni delle rimanenze', normalizedCategory:'other_expenses', amountNative:0.124627, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Spese organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.502, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.021, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Oneri contribuzione Lega', normalizedCategory:'match_organisation_expense', amountNative:-1.517, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-2.318, disclosureLevel:'aggregated' }, // pág. 47, precedente
    { rawLabel:'Minusvalenze cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.985, disclosureLevel:'aggregated' }, // pág. 47, Jev 0.99
    { rawLabel:'Premi valorizzazione, di addestramento e Carriera', normalizedCategory:'player_amortisation', amountNative:-1.177, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Contributo Solidarietà Fifa', normalizedCategory:'player_amortisation', amountNative:-0.206, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.069, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.016, disclosureLevel:'aggregated' }, // pág. 48, Jev 0.9
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.015, disclosureLevel:'aggregated' }, // pág. 48, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.226, disclosureLevel:'aggregated' }, // pág. 48, precedente
  ],
  2024: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.199538, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-2.974, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.12, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.302, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Compensi per Agenti e intermediari', normalizedCategory:'other_expenses', amountNative:-5.302, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.495, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.222, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-5.086, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-2.22, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'8) Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.722512, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-57.068548, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-5.295685, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.998607, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-29.549966, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.625091, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'d) Svalutazioni crediti dell\'attivo', normalizedCategory:'other_expenses', amountNative:-0.179916, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'11) Variazioni delle rimanenze', normalizedCategory:'other_expenses', amountNative:0.062299, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Spese organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.604, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.041, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Oneri contribuzione Lega', normalizedCategory:'match_organisation_expense', amountNative:-1.44, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-0.998, disclosureLevel:'aggregated' }, // pág. 52, precedente
    { rawLabel:'Minusvalenze cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.567, disclosureLevel:'aggregated' }, // pág. 52, Jev 0.99
    { rawLabel:'Premi valorizzazione, di addestramento e Carriera', normalizedCategory:'player_amortisation', amountNative:-0.543, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Contributo Solidarietà Fifa', normalizedCategory:'player_amortisation', amountNative:-1.256, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Premi di rendimento', normalizedCategory:'wages_squad', amountNative:-0.968, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.549, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.01, disclosureLevel:'aggregated' }, // pág. 53, Jev 0.9
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.465, disclosureLevel:'aggregated' }, // pág. 53, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-1.035, disclosureLevel:'aggregated' }, // pág. 53, precedente
  ],
  2019: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.208562, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Costi per tesserati', normalizedCategory:'wages_squad', amountNative:-1.724, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.093, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.251, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Compensi per Agenti e intermediari', normalizedCategory:'other_expenses', amountNative:-6.124, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.603, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.352, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-3.435, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-3.377, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'8) Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-2.630843, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-51.099235, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.809263, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.464694, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-30.360448, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.392384, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.98
    { rawLabel:'d) Svalutazioni crediti dell\'attivo', normalizedCategory:'other_expenses', amountNative:-0.530834, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Spese organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.875, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Tasse iscrizioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.035, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Oneri contribuzione Lega', normalizedCategory:'match_organisation_expense', amountNative:-0.995, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Percentuale su incassi gare a squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.007, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'Costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-4.013, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Minusvalenze cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-1.877, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Premi valorizzazione', normalizedCategory:'player_amortisation', amountNative:-0.75, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.96
    { rawLabel:'Contributo Solidarietà Fifa', normalizedCategory:'player_amortisation', amountNative:-0.586, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Premi rendimento', normalizedCategory:'wages_squad', amountNative:-6.963, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.98
    { rawLabel:'Sopravvenienze passive', normalizedCategory:'exceptional_items', amountNative:-0.155, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Spese, ammende e multe gare', normalizedCategory:'other_expenses', amountNative:-0.053, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Oneri tributari indiretti', normalizedCategory:'admin_general_expense', amountNative:-0.08, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.558, disclosureLevel:'aggregated' }, // pág. 46, precedente
  ],
};
const sassuoloitFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 34.086.540. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 16.205.000. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): categoria = broadcasting. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo,
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): categoria = other_income. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'sassuolo-it-bilancio-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.69364, tax:11.842313,
    extraRows: [
      {label:'d) Proventi diversi dai precedenti:', value:1.957063},
      {label:'c) verso imprese controllanti', value:-2.510217},
      {label:'d) verso altri', value:-2.140486},
      {label:'a) Imposte correnti', value:-0.197019},
      {label:'b) Imposte esercizi precedenti', value:0},
      {label:'b) Imposte anticipate e differite', value:0.171314},
      {label:'d) Provento da Consolidato Fiscale', value:11.868018},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:70.699, officialTotalExpenses:118.55949, officialPAT:-38.772733,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2021-12-31. Bilancio al 31 dicembre 2021
  2021: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-12-31',
    sourceId:'sassuolo-it-bilancio-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.412906, tax:1.489585,
    extraRows: [
      {label:'d) Proventi diversi dai precedenti:', value:0.079239},
      {label:'c) verso imprese controllanti', value:-1.168688},
      {label:'d) verso altri', value:-0.323457},
      {label:'a) Imposte correnti', value:-2.01919},
      {label:'b) Imposte esercizi precedenti', value:-0.54331},
      {label:'b) Imposte anticipate e differite', value:0.213875},
      {label:'d) Provento da Consolidato Fiscale', value:3.83821},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:123.653, officialTotalExpenses:136.527069, officialPAT:-13.850755,
  },
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2024-12-31. Bilancio al 31 dicembre 2024
  2024: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'sassuolo-it-bilancio-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.420507, tax:4.966633,
    extraRows: [
      {label:'d) Proventi diversi dai precedenti:', value:3.251515},
      {label:'c) verso imprese controllanti', value:-5.083404},
      {label:'d) verso altri', value:-1.588618},
      {label:'a) Imposte correnti', value:-1.378484},
      {label:'b) Imposte esercizi precedenti', value:0},
      {label:'b) Imposte anticipate e differite', value:-0.121392},
      {label:'d) Provento da Consolidato Fiscale', value:6.466509},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:102.104, officialTotalExpenses:124.658564, officialPAT:-22.125621,
  },
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2019-12-31. Bilancio al 31 dicembre 2019 (portada del documento, .md); Sassuolo cierra el 31/12 (Guido pidió el ajuste manual, 2026-10-08)
  2019: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-12-31',
    sourceId:'sassuolo-it-bilancio-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.817006, tax:-2.516655,
    extraRows: [
      {label:'d) Proventi diversi dai precedenti:', value:0.000018},
      {label:'c) verso imprese controllanti', value:-0.522084},
      {label:'d) verso verso altri', value:-0.29494},
      {label:'a) differenze attive su cambi', value:0},
      {label:'b) differenze passive su cambi', value:0},
      {label:'a) Imposte correnti', value:-2.822069},
      {label:'b) Imposte relative ad esercizi precedenti', value:0},
      {label:'c) Imposte anticipate e differite', value:0.305414},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:127.5789, officialTotalExpenses:121.370263, officialPAT:0.842978,
  },
};
const sassuoloitPresupuestoOverlayByYear = {};

const sassuoloitPasesData = [];
const sassuoloitResultadosData = {};
const sassuoloitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sassuolo-it'] = {
  revenueLinesByYear: sassuoloitRevenueLinesByYear, expenseLinesByYear: sassuoloitExpenseLinesByYear,
  fiscalYearMeta: sassuoloitFiscalYearMeta, pasesData: sassuoloitPasesData,
  resultadosData: sassuoloitResultadosData, titulosData: sassuoloitTitulosData,
  presupuestoOverlayByYear: sassuoloitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'sassuolo-it-bilancio-2025': {
    id:'sassuolo-it-bilancio-2025', clubId:'sassuolo-it',
    title:'Unione Sportiva Sassuolo Calcio S.r.l. — Sassuolo-bilancio-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'sassuolo-it-bilancio-2021': {
    id:'sassuolo-it-bilancio-2021', clubId:'sassuolo-it',
    title:'Unione Sportiva Sassuolo Calcio S.r.l. — Sassuolo-bilancio-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'sassuolo-it-bilancio-2024': {
    id:'sassuolo-it-bilancio-2024', clubId:'sassuolo-it',
    title:'Unione Sportiva Sassuolo Calcio S.r.l. — Sassuolo-bilancio-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'sassuolo-it-bilancio-2019': {
    id:'sassuolo-it-bilancio-2019', clubId:'sassuolo-it',
    title:'Unione Sportiva Sassuolo Calcio S.r.l. — Sassuolo-bilancio-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['sassuolo-it'] = null;

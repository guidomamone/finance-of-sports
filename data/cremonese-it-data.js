// ============================================================================
// data/cremonese-it-data.js — U.S. Cremonese S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Cremonese/Cremonese-bilancio-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "cremonese-it" — slug de "Cremonese" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "U.S. Cremonese S.p.A." — el .md, 9 veces (nombre del club + forma societaria)
//   displayName        ok        "Cremonese" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (157 de 164 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 18 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] cremonese: #ED1C24 Red, #808285 Grey, #CF9C51 Gold, #0A4A9B Dark Blue
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (157 de 164 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "cremonese-it-bilancio-2025" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"cremonese-it-bilancio-2025"}
// ============================================================================

const cremoneseitRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Italia/Cremonese/Cremonese-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Italia/Cremonese/Cremonese-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Cremonese/Cremonese-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Gare di campionato part. In casa 1^ squadra', normalizedCategory:'matchday_competition', amountNative:0.775482, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.99
    { rawLabel:'Abbonamenti stagione sportiva', normalizedCategory:'season_tickets', amountNative:0.778032, disclosureLevel:'aggregated' }, // pág. 41, Jev 1
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.071304, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.99
    { rawLabel:'Gare del settore giovanile', normalizedCategory:'youth_football', amountNative:0.0139, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.95
    { rawLabel:'Gare amichevoli e altri', normalizedCategory:'matchday_competition', amountNative:0.009921, disclosureLevel:'aggregated' }, // pág. 41, Claude 0.85
    { rawLabel:'Provvidenze e contributi dalla mutualità', normalizedCategory:'broadcasting', amountNative:3.81965, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Contributo solidarietà', normalizedCategory:'broadcasting', amountNative:1.58371, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Contributo progetto solidarietà lega', normalizedCategory:'broadcasting', amountNative:0.07, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi da sponsors ufficiali e istituzionali', normalizedCategory:'sponsorship_commercial', amountNative:37.607005, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi da sponsors tecnici e fornitori ufficiali', normalizedCategory:'sponsorship_commercial', amountNative:0.901037, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi pubblicitari e altri sponsors', normalizedCategory:'sponsorship_commercial', amountNative:3.996392, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi televisivi campionato', normalizedCategory:'broadcasting', amountNative:0.894677, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi televisivi Coppa Italia', normalizedCategory:'broadcasting', amountNative:0.478553, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Proventi da contratto RAI Com', normalizedCategory:'broadcasting', amountNative:0.030146, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Ricavi da cessione temporanea prestaz calciat.', normalizedCategory:'player_sales', amountNative:0.8145, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Plusv, da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:3.014719, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Premi di valorizz, preparaz, contr solid e altri calc', normalizedCategory:'player_sales', amountNative:1.851697, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Ricavi da attività varie del SG', normalizedCategory:'youth_football', amountNative:0.068245, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Affitti attivi', normalizedCategory:'other_income', amountNative:0.03, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Ricavi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.422299, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:0.167072, disclosureLevel:'aggregated' }, // pág. 42, precedente
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Cremonese/Cremonese-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Italia/Cremonese/Cremonese-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Cremonese/Cremonese-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Gare di campionato part. In casa 1^ squadra', normalizedCategory:'matchday_competition', amountNative:0.607234, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Abbonamenti stagione sportiva', normalizedCategory:'season_tickets', amountNative:0.055941, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.008059, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Ricavi tessera tifoso', normalizedCategory:'matchday_competition', amountNative:0.005377, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Provvidenze e contributi in c/esercizio', normalizedCategory:'broadcasting', amountNative:5.778315, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Proventi da sponsors ufficiali e istituzionali', normalizedCategory:'sponsorship_commercial', amountNative:17.210186, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Proventi da sponsors tecnici e fornitori ufficiali', normalizedCategory:'sponsorship_commercial', amountNative:0.354575, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Proventi pubblicitari e altri sponsors', normalizedCategory:'sponsorship_commercial', amountNative:0.980636, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Concessioni radio televisive', normalizedCategory:'broadcasting', amountNative:2.736953, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Proventi da contratto RAI Com', normalizedCategory:'broadcasting', amountNative:0.036636, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Ricavi da cessione temporanea prestaz calciat.', normalizedCategory:'player_sales', amountNative:0.0135, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Plusv, da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:0.005, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Premi di valorizz, preparaz, contr solid e altri calc', normalizedCategory:'player_sales', amountNative:0.182105, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Affitti attivi', normalizedCategory:'other_income', amountNative:0.028414, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Ricavi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.031222, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:0.072386, disclosureLevel:'aggregated' }, // pág. 28, precedente
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Cremonese/Cremonese-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Gare di campionato part. In casa 1^ squadra', normalizedCategory:'matchday_competition', amountNative:0.793438, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Abbonamenti stagione sportiva', normalizedCategory:'season_tickets', amountNative:0.689539, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.205408, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Gare amichevoli e altri', normalizedCategory:'matchday_competition', amountNative:0.028564, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Ricavi tessera tifoso', normalizedCategory:'matchday_competition', amountNative:0.009005, disclosureLevel:'aggregated' }, // pág. 41, ? 0.7
    { rawLabel:'Provvidenze e contributi in c/esercizio', normalizedCategory:'broadcasting', amountNative:3.111905, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Paracadute retrocessione', normalizedCategory:'broadcasting', amountNative:10, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi da sponsors ufficiali e istituzionali', normalizedCategory:'sponsorship_commercial', amountNative:32.294362, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi da sponsors tecnici e fornitori ufficiali', normalizedCategory:'sponsorship_commercial', amountNative:0.414693, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi pubblicitari e altri sponsors', normalizedCategory:'sponsorship_commercial', amountNative:3.499979, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi televisivi campionato', normalizedCategory:'broadcasting', amountNative:2.098216, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi televisivi Coppa Italia', normalizedCategory:'broadcasting', amountNative:0.799, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Proventi da contratto RAI Com', normalizedCategory:'broadcasting', amountNative:0.030146, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Ricavi da cessione temporanea prestaz calciat.', normalizedCategory:'player_sales', amountNative:0.70825, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Plusv, da cessione diritti pluriennali calciatori', normalizedCategory:'player_sales', amountNative:1.396012, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Premi di valorizz, preparaz, contr solid e altri calc', normalizedCategory:'player_sales', amountNative:0.665823, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Ricavi da attività varie del SG', normalizedCategory:'youth_football', amountNative:0.066271, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Affitti attivi', normalizedCategory:'other_income', amountNative:0.034047, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Ricavi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.107452, disclosureLevel:'aggregated' }, // pág. 42, precedente
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:0.726444, disclosureLevel:'aggregated' }, // pág. 42, precedente
  ],
};
const cremoneseitExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.368862, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.99
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.481316, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Vitto, alloggio e locomozioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.730276, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.147871, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per intermediazioni', normalizedCategory:'other_expenses', amountNative:-2.136098, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Servizio biglietteria, ingressi e stewarding', normalizedCategory:'match_organisation_expense', amountNative:-0.39994, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-0.124116, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.95
    { rawLabel:'Costi per servizi da banche e soc finanziarie', normalizedCategory:'admin_general_expense', amountNative:-0.504455, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per prestazioni al personale', normalizedCategory:'admin_general_expense', amountNative:-0.104616, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per utenze e spese generali', normalizedCategory:'admin_general_expense', amountNative:-0.821266, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Compensi e rimborsi spese a terzi', normalizedCategory:'admin_general_expense', amountNative:-0.536433, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.98
    { rawLabel:'Costi per pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.100783, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Costi per manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-0.463485, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.99
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-0.873015, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.99
    { rawLabel:'Stipendi tesserati ed area sportiva 1° Squadra', normalizedCategory:'wages_squad', amountNative:-22.385854, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Stipendi tesserati ed area sportiva SG', normalizedCategory:'youth_other_sports_expense', amountNative:-1.1501, disclosureLevel:'aggregated' }, // pág. 45, Claude 0.85
    { rawLabel:'Premi a tesserati ed area sport 1° squadra', normalizedCategory:'wages_squad', amountNative:-7.823304, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'Premi a tesserati ed area sportiva SG', normalizedCategory:'youth_other_sports_expense', amountNative:-0.034, disclosureLevel:'aggregated' }, // pág. 45, Claude 0.85
    { rawLabel:'Indennità e incentivi all\'esodo tesserati', normalizedCategory:'wages_squad', amountNative:-1.3723, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Stipendi direzione', normalizedCategory:'admin_general_expense', amountNative:-0.8, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.97
    { rawLabel:'Premi promozione personale direttivo', normalizedCategory:'admin_general_expense', amountNative:-0.288, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Altri stipendi e salari', normalizedCategory:'admin_general_expense', amountNative:-1.269474, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.902203, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.96
    { rawLabel:'Indennità di fine carriera', normalizedCategory:'wages_squad', amountNative:-0.398228, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Trattamento di fine rapporto maturato', normalizedCategory:'wages_squad', amountNative:-0.151312, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.95
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-0.004799, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.98
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-9.547126, disclosureLevel:'aggregated' }, // pág. 5, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.881789, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.4247, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.93
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.023325, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Oneri vari da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-0.226626, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'Tasse iscrizioni campionato e gare', normalizedCategory:'match_organisation_expense', amountNative:-0.23949, disclosureLevel:'aggregated' }, // pág. 46, Claude 0.85
    { rawLabel:'Costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.38, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.98
    { rawLabel:'Minusv. da cessione diritti pluriennali calciatori', normalizedCategory:'exceptional_items', amountNative:-0.005919, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'Costi per premi ex-art 103 comma 3 NOIF', normalizedCategory:'player_amortisation', amountNative:-0.4208, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri costi per premi e indennizzi', normalizedCategory:'other_expenses', amountNative:-2.244821, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.159177, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'Contributo di solidarietà alla Lega B', normalizedCategory:'match_organisation_expense', amountNative:-0.377828, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Multe gare ed imposte e tasse varie', normalizedCategory:'admin_general_expense', amountNative:-0.085823, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.109739, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.97
  ],
  2022: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-0.47575, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Costi per Tesserati', normalizedCategory:'wages_squad', amountNative:-0.05083, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Vitto, alloggio e locomozioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.334167, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.977925, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-1.632135, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Servizio biglietteria, ingressi e pulizie stadio', normalizedCategory:'match_organisation_expense', amountNative:-0.274772, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.081203, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.92
    { rawLabel:'Amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-0.8724, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-0.189597, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-18.875721, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-1.587877, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.381408, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-1.80087, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.398316, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.27515, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.09349, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'Tasse iscrizioni campionato e gare', normalizedCategory:'match_organisation_expense', amountNative:-0.23475, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.0925, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Costi per premi ex-art 103 comma 3 NOIF', normalizedCategory:'player_amortisation', amountNative:-1.24208, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.012068, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Spese riscossione, penali FIGC, imp e tasse', normalizedCategory:'admin_general_expense', amountNative:-0.089938, disclosureLevel:'aggregated' }, // pág. 31, Claude 0.8
    { rawLabel:'Oneri per accordi transattivi e sopravvenienze', normalizedCategory:'exceptional_items', amountNative:-0.01904, disclosureLevel:'aggregated' }, // pág. 31, ? 0.6
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.007723, disclosureLevel:'aggregated' }, // pág. 31, precedente
  ],
  2024: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-0.547528, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.387364, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Vitto, alloggio e locomozioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.636025, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.29139, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Costi per intermediazioni', normalizedCategory:'other_expenses', amountNative:-2.202413, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Servizio biglietteria, ingressi e stewarding', normalizedCategory:'match_organisation_expense', amountNative:-0.407424, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-0.081961, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per servizi da banche e soc finanziarie', normalizedCategory:'admin_general_expense', amountNative:-0.230439, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per prestazioni al personale', normalizedCategory:'admin_general_expense', amountNative:-0.138521, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per utenze e spese generali', normalizedCategory:'admin_general_expense', amountNative:-0.691016, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Compensi e rimborsi spese a terzi', normalizedCategory:'admin_general_expense', amountNative:-0.584978, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.032408, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-0.218416, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-0.632628, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-26.118675, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.52916, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.461971, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-11.276373, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.716795, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.832573, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.02, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Oneri vari da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-0.202072, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Tasse iscrizioni campionato e gare', normalizedCategory:'match_organisation_expense', amountNative:-0.23599, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.6575, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Minusv. da cessione diritti pluriennali calciatori', normalizedCategory:'exceptional_items', amountNative:-0.00787, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Costi per premi ex-art 103 comma 3 NOIF', normalizedCategory:'player_amortisation', amountNative:-0.4767, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.28829, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Contributo di solidarietà alla Lega B', normalizedCategory:'match_organisation_expense', amountNative:-1, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Multe gare ed imposte e tasse varie', normalizedCategory:'admin_general_expense', amountNative:-0.10835, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.066208, disclosureLevel:'aggregated' }, // pág. 46, precedente
  ],
};
const cremoneseitFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 24.755. proventi y oneri con la misma etiqueta 'altri'; el oneri (L190) impreso en positivo; Totale C (L192) (4.261) (to-do 155/156, arreglo manual 2026-10-07),
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (29.016). ver el anterior (to-do 155/156, arreglo manual 2026-10-07)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 24.755. proventi y oneri con la misma etiqueta 'altri'; el oneri (L190) impreso en positivo; Totale C (L192) (4.261) (to-do 155/156, arreglo manual 2026-10-07),
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (29.016). ver el anterior (to-do 155/156, arreglo manual 2026-10-07)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 24.755. proventi y oneri con la misma etiqueta 'altri'; el oneri (L190) impreso en positivo; Totale C (L192) (4.261) (to-do 155/156, arreglo manual 2026-10-07)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (29.016). ver el anterior (to-do 155/156, arreglo manual 2026-10-07)
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'cremonese-it-bilancio-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.004261, tax:1.073132,
    extraRows: [
      {label:'altri (proventi finanziari)', value:0.024755},
      {label:'altri (oneri finanziari)', value:-0.029016},
      {label:'imposte correnti', value:-1.182142},
      {label:'imposte differite e anticipate', value:2.255274},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:57.398341, officialTotalExpenses:65.452619, officialPAT:-6.985407,
  },
  2022: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'cremonese-it-bilancio-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.121384, tax:-0.90906,
    extraRows: [
      {label:'altri', value:0.00438},
      {label:'altri', value:-0.125764},
      {label:'imposte correnti', value:-0.687127},
      {label:'imposte differite e anticipate', value:-0.221933},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:28.106539, officialTotalExpenses:29.98067, officialPAT:-2.923614,
  },
  2024: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'cremonese-it-bilancio-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.048206, tax:-1.547347,
    extraRows: [
      {label:'altri', value:0.030856},
      {label:'altri', value:-0.079062},
      {label:'imposte correnti', value:-1.547347},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:57.678554, officialTotalExpenses:54.081038, officialPAT:2.001962,
  },
};
const cremoneseitPresupuestoOverlayByYear = {};

const cremoneseitPasesData = [];
const cremoneseitResultadosData = {};
const cremoneseitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['cremonese-it'] = {
  revenueLinesByYear: cremoneseitRevenueLinesByYear, expenseLinesByYear: cremoneseitExpenseLinesByYear,
  fiscalYearMeta: cremoneseitFiscalYearMeta, pasesData: cremoneseitPasesData,
  resultadosData: cremoneseitResultadosData, titulosData: cremoneseitTitulosData,
  presupuestoOverlayByYear: cremoneseitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'cremonese-it-bilancio-2025': {
    id:'cremonese-it-bilancio-2025', clubId:'cremonese-it',
    title:'U.S. Cremonese S.p.A. — Cremonese-bilancio-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'cremonese-it-bilancio-2024': {
    id:'cremonese-it-bilancio-2024', clubId:'cremonese-it',
    title:'U.S. Cremonese S.p.A. — Cremonese-bilancio-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'cremonese-it-bilancio-2022': {
    id:'cremonese-it-bilancio-2022', clubId:'cremonese-it',
    title:'U.S. Cremonese S.p.A. — Cremonese-bilancio-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['cremonese-it'] = null;

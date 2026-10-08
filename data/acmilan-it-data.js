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
});

memberCountByClub['acmilan-it'] = null;

// ============================================================================
// data/werderbremen-de-data.js — SV Werder Bremen GmbH & Co. KGaA (Alemania, Bundesliga).
//
// 3 ejercicios REALES, los 3 Konzernabschluss (cuentas CONSOLIDADAS del grupo, incluye Werder
// Bremen Merchandising GmbH y Werder Bremen Payment GmbH), bajados de unternehmensregister.de
// (registro mercantil oficial alemán — ver fuentes/Alemania/Werder Bremen.md). Transcripciones
// completas en Clubes/Alemania/Werder Bremen/konzernabschluss-<ejercicio>.md.
//
// Ejercicio fiscal: 01/07 al 30/06 (confirmado en cada documento: "Konzernabschluss zum
// Geschäftsjahr vom 01.07.20XX bis zum 30.06.20XY"). Se carga con la clave del año de CIERRE.
//
// Moneda: EUR en los 3 ejercicios. Ninguno de los 3 documentos declara un tipo de cambio propio a
// USD (no es una práctica habitual en cuentas alemanas — a diferencia de los balances argentinos
// con su Anexo de moneda extranjera), así que se usa fxRef contra FX_CLOSE (data/currency-map.js):
// 'EUR@2024-06-30' y 'EUR@2025-06-30' YA EXISTEN. 'EUR@2023-06-30' (para el ejercicio 2023) NO
// EXISTE TODAVÍA — queda pendiente que el orquestador la agregue a FX_CLOSE. Hasta entonces el
// ejercicio 2023 va a disparar un console.warn de checkFxSanity()/fx faltante, esperado.
//
// Revenue: los 3 documentos reportan la nota "Die Umsatzerlöse setzen sich wie folgt zusammen"
// (Anhang 5.11) como UN SOLO bolsón "Spielerträge, mediale Verwertung und Werbung sowie
// Transfererträge" + "Handel" + "Sonstige" — no alcanza (mezcla matchday/TV/sponsoring/transfers).
// El desglose real usado acá sale del Konzernlagebericht (B.1 Ertragslage) de cada ejercicio, que
// SÍ separa Spielbetrieb/Werbung/mediale Verwertungsrechte/Transfer(-erträge und
// Ausbildungsentschädigungen)/Handel con su propia cifra en TEUR — coincide con la regla de
// club-data-mapping SKILL.md sección 1 (promover a líneas de primer nivel cuando cada sub-ítem
// tiene categoría real distinta, en vez de dejarlas enterradas en un bolsón). El Lagebericht de
// 2023/24 no imprime "Spielbetrieb" con cifra propia (solo dice "las demás partidas se mantuvieron
// prácticamente constantes") — ese valor (27.896 TEUR) es un RESIDUAL: Umsatzerlöse total menos las
// 5 partidas que sí tienen cifra propia. Mismo criterio para "Sonstige" (Anhang 5.11) del ejercicio
// 2025: el documento no imprime esa línea con cifra propia este año, así que también es residual.
// Ambos casos llevan disclosureLevel:'aggregated_residual', no 'detailed'.
//
// "Handel" (venta de merchandising/indumentaria del club) se categoriza sponsorship_commercial en
// los 3 ejercicios (criterio de club-data-mapping SKILL.md sección 1: merchandising del propio
// club, no un negocio no futbolístico separado).
//
// Materialaufwand (costo de mercadería vendida + servicios comprados) no calza en ninguna
// categoría específica de la taxonomía del sitio → other_expenses. Personalaufwand no se pudo
// separar plantel/cuerpo técnico vs. administrativo en ningún ejercicio (el documento solo da
// headcount total, no el costo por área) → wages_squad completo, ver club-data-mapping SKILL.md
// sección 1 ("separá SI el documento lo permite separar" — acá no lo permite).
//
// Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen (una
// sola línea de P&L) SÍ se pudo separar con exactitud en los 3 ejercicios cruzando el Konzern-
// anlagenspiegel (roll-forward de activo fijo, columna "Abschreibungen — Zugang" del período):
// la parte de "Entgeltlich erworbene Konzessionen... sowie Lizenzen" (= derechos federativos de
// jugadores capitalizados) es player_amortisation, la de Sachanlagen (Grundstücke/Bauten + Andere
// Anlagen) es depreciation. Las dos suman EXACTO la cifra impresa en el cuerpo del P&L en los 3
// ejercicios (ver tie-out en el reporte de carga).
//
// "Sonstige betriebliche Erträge" (línea de P&L separada de Umsatzerlöse): en 2023 y 2024 el
// Anhang 5.12 identifica un componente de "außergewöhnlicher Größenordnung" (ausbuchung de deudas
// por sobrepagos de la época covid + liberación de previsiones) — se promovió a línea propia
// (`other_income`, no `exceptional_items`: esa categoría es solo de la taxonomía de GASTOS, ver
// `data/category-map.js`; usarla en un revenueLine no cierra en `computeYearGeneric()` como
// categoría de gasto, así que aunque sumara bien igual generaba ruido de auditoría), el resto queda
// en su propia línea `other_income` sin partir. En 2025 el Anhang 5.12 no identifica ningún
// componente extraordinario del lado de ingresos (sí del lado de gastos, ver abajo), así que la
// línea completa queda en other_income sin partir.
//
// "Sonstige betriebliche Aufwendungen" 2025: el Anhang 5.12 SÍ identifica un componente de
// TEUR 860 de "außergewöhnlicher Größenordnung" (costos de la emisión del nuevo bono Werder-Anleihe
// 2025/2030) → se promovió a línea propia `other_expenses` (no `exceptional_items`: esa categoría
// existe pero el motor la excluye a propósito de `expenses`/`nonCash` — ver `computeYearGeneric()`,
// se suma aparte directo a `operatingProfit` — así que hubiera exigido ajustar
// `officialTotalExpenses` para no romper el tie-out en vez de sumar todo junto), el resto queda en
// other_expenses.
//
// OJO — resultado financiero e impuestos del ejercicio 2025, ADVERTENCIA DE CALIDAD DE FUENTE: la
// transcripción de la tabla de GuV 2024/2025 (pág. 4 de 20 del documento, "Konzern-Gewinn- und
// Verlustrechnung für die Zeit vom 1. Juli 2024 bis 30. Juni 2025") llegó con las columnas
// desalineadas por el proceso de conversión PDF→Markdown: se pudo reconstruir con certeza el
// resultado operativo (Umsatzerlöse+sonst.Erträge-Materialaufwand-Personalaufwand-Abschreibungen-
// sonst.Aufwendungen = -5.025.710,70 EUR), la línea "Ergebnis nach Steuern" (-7.219.276,76) y
// "Sonstige Steuern" (201.059,20) — estas 2 últimas reconcilian EXACTO contra el Konzernjahres-
// fehlbetrag impreso dos veces en el documento (-7.420.335,96, en el cuerpo del GuV y en el
// Konzerneigenkapitalspiegel). Pero el desglose interno de "Erträge aus assoziierten Unternehmen" /
// "Sonstige Zinsen" / "Zinsen und ähnliche Aufwendungen" / "Steuern vom Einkommen und vom Ertrag"
// (4 líneas, ítems 7-10) no se pudo reconstruir individualmente con confianza — los candidatos
// leídos (-1.725.915,17 / 467.650,89) no cierran de forma consistente contra el resto de la cadena
// si Zinsaufwendungen ronda su magnitud histórica (~2,3-2,6 M€ en 2023 y 2024). Para no inventar un
// desglose falso, netInterest de 2025 absorbe TODO el bloque de resultado financiero + impuesto a
// las ganancias combinado (Ergebnis nach Steuern - Betriebsergebnis), y tax de 2025 lleva SOLO la
// "Sonstige Steuern" confirmada. El total (revenue+expenses+netInterest+tax) cierra EXACTO contra
// el Jahresfehlbetrag impreso — es el check fuerte de club-data-mapping SKILL.md sección 6.2 — pero
// la separación entre "resultado financiero" y "Steuern vom Einkommen" dentro de netInterest de
// 2025 es una aproximación, no una lectura confirmada línea por línea. Pendiente para
// Admin/dudas-por-club.md si se consigue releer esa página del PDF original.
//
// gestionId: 'actual' en los 3 ejercicios — Klaus Filbry es Vorsitzender der Geschäftsführung
// (presidente del directorio/CEO) en los 3, así que no hay cambio de gestión que declarar; solo
// cambió el Geschäftsführer Fußball (Frank Baumann hasta 30/6/2024, Clemens Fritz desde 1/7/2024).
// ============================================================================

const werderbremenDeRevenueLinesByYear = {
  // Ejercicio 2023 (01.07.2022-30.06.2023). Fuente: Konzernlagebericht B.1 Ertragslage (Spielbetrieb/
  // Werbung/mediale Verwertungsrechte/Transfererlöse con cifra propia) + Anhang 5.11 (Handel/Sonstige)
  // + Anhang 5.12 (componente extraordinario de Sonstige betriebliche Erträge).
  2023: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:28.052, disclosureLevel:'detailed' },
    { rawLabel:'Werbe- und Sponsoringerlöse (Werbung)', normalizedCategory:'sponsorship_commercial', amountNative:30.740, disclosureLevel:'detailed' },
    { rawLabel:'Erträge aus medialer Verwertung (mediale Verwertungsrechte)', normalizedCategory:'broadcasting', amountNative:38.238, disclosureLevel:'detailed' },
    { rawLabel:'Transfererlöse', normalizedCategory:'player_sales', amountNative:5.247, disclosureLevel:'detailed' },
    { rawLabel:'Handel', normalizedCategory:'sponsorship_commercial', amountNative:9.005, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige (Umsatzerlöse, Anhang 5.11)', normalizedCategory:'other_income', amountNative:4.005, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge — Ausbuchung von Verbindlichkeiten aus Überzahlungen in der Coronazeit und Auflösung von Rückstellungen (Anhang 5.12)', normalizedCategory:'other_income', amountNative:2.826, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:1.966120, disclosureLevel:'aggregated_residual' },
  ],
  // Ejercicio 2024 (01.07.2023-30.06.2024). "Spielbetrieb" no tiene cifra propia impresa este año
  // (el Lagebericht solo dice que se mantuvo "prácticamente constante") — es residual: Umsatzerlöse
  // total (145.580.686,60 EUR) menos las otras 5 partidas con cifra propia.
  2024: [
    { rawLabel:'Erlöse aus dem Spielbetrieb (residual, no impreso con cifra propia este ejercicio)', normalizedCategory:'matchday_competition', amountNative:27.896, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Werbe- und Sponsoringerlöse (Werbung)', normalizedCategory:'sponsorship_commercial', amountNative:29.054, disclosureLevel:'detailed' },
    { rawLabel:'Erträge aus medialer Verwertung (mediale Verwertungsrechte)', normalizedCategory:'broadcasting', amountNative:42.839, disclosureLevel:'detailed' },
    { rawLabel:'Transfer- und Ausbildungsentschädigungen', normalizedCategory:'player_sales', amountNative:28.531, disclosureLevel:'detailed' },
    { rawLabel:'Handel', normalizedCategory:'sponsorship_commercial', amountNative:12.918, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige (Umsatzerlöse, Anhang 5.11)', normalizedCategory:'other_income', amountNative:4.342, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge — Ausbuchung von Verbindlichkeiten aus Überzahlungen in der Coronazeit und Auflösung von Rückstellungen (Anhang 5.12)', normalizedCategory:'other_income', amountNative:0.619, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:3.702849, disclosureLevel:'aggregated_residual' },
  ],
  // Ejercicio 2025 (01.07.2024-30.06.2025). "Sonstige" (Anhang 5.11, dentro de Umsatzerlöse) no
  // tiene cifra propia impresa este ejercicio — es residual: Umsatzerlöse total (142.730.027,20 EUR)
  // menos las otras 5 partidas con cifra propia (todas impresas en el Lagebericht con su propio TEUR).
  2025: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:32.627, disclosureLevel:'detailed' },
    { rawLabel:'Werbe- und Sponsoringerlöse (Werbung)', normalizedCategory:'sponsorship_commercial', amountNative:31.004, disclosureLevel:'detailed' },
    { rawLabel:'Erträge aus medialer Verwertung (mediale Verwertungsrechte)', normalizedCategory:'broadcasting', amountNative:50.057, disclosureLevel:'detailed' },
    { rawLabel:'Transfer- und Ausbildungsentschädigungen', normalizedCategory:'player_sales', amountNative:10.651, disclosureLevel:'detailed' },
    { rawLabel:'Handel', normalizedCategory:'sponsorship_commercial', amountNative:12.590, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige (Umsatzerlöse, Anhang 5.11, residual, no impreso con cifra propia este ejercicio)', normalizedCategory:'other_income', amountNative:5.801, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:3.752149, disclosureLevel:'detailed' },
  ],
};

const werderbremenDeExpenseLinesByYear = {
  2023: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-6.726563, disclosureLevel:'detailed', items:[
      ['Aufwendungen für Roh-, Hilfs- und Betriebsstoffe und bezogene Waren', -4.694605], ['Aufwendungen für bezogene Leistungen', -2.031957],
    ]},
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-57.211167, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -51.127319], ['Soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -6.083847],
    ]},
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände (Spielerwerte)', normalizedCategory:'player_amortisation', amountNative:-10.839956, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.061341, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-47.000534, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-9.156275, disclosureLevel:'detailed', items:[
      ['Aufwendungen für Roh-, Hilfs- und Betriebsstoffe und bezogene Waren', -6.599518], ['Aufwendungen für bezogene Leistungen', -2.556758],
    ]},
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-71.682403, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -65.451785], ['Soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -6.230618],
    ]},
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände (Spielerwerte)', normalizedCategory:'player_amortisation', amountNative:-8.327656, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.126563, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-54.400302, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-10.324774, disclosureLevel:'detailed', items:[
      ['Aufwendungen für Roh-, Hilfs- und Betriebsstoffe und bezogene Waren', -7.131045], ['Aufwendungen für bezogene Leistungen', -3.193730],
    ]},
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-74.580021, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -67.357972], ['Soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -7.222049],
    ]},
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände (Spielerwerte)', normalizedCategory:'player_amortisation', amountNative:-7.576409, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.522886, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Kosten im Zusammenhang mit der Auflage der neuen Werder-Anleihe 2025/2030 (Anhang 5.12)', normalizedCategory:'other_expenses', amountNative:-0.860000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen (resto, sin desglose adicional en el documento)', normalizedCategory:'other_expenses', amountNative:-56.643798, disclosureLevel:'aggregated_residual' },
  ],
};

const werderbremenDeFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30', // PENDIENTE: esta clave todavía no existe en FX_CLOSE (data/currency-map.js), la agrega el orquestador.
    sourceId:'werderbremen-de-konzernabschluss-2023',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-0.896254, tax:-0.179978, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:120.077632, officialTotalExpenses:122.839560, officialPAT:-3.838160,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'werderbremen-de-konzernabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1.889156, tax:-1.133120, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:149.902536, officialTotalExpenses:144.693200, officialPAT:2.187061,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'werderbremen-de-konzernabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest de este ejercicio absorbe TODO el bloque financiero+impuesto a las ganancias
    // combinado (ver comentario largo de cabecera) — tax lleva SOLO "Sonstige Steuern", confirmada
    // exacta contra el Jahresfehlbetrag impreso.
    netInterest:-2.193566, tax:-0.201059, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:146.482176, officialTotalExpenses:151.507887, officialPAT:-7.420336,
  },
};

const werderbremenDePresupuestoOverlayByYear = {};
const werderbremenDePasesData = [];
const werderbremenDeResultadosData = {};
const werderbremenDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['werderbremen-de'] = {
  revenueLinesByYear: werderbremenDeRevenueLinesByYear, expenseLinesByYear: werderbremenDeExpenseLinesByYear,
  fiscalYearMeta: werderbremenDeFiscalYearMeta, pasesData: werderbremenDePasesData,
  resultadosData: werderbremenDeResultadosData, titulosData: werderbremenDeTitulosData,
  presupuestoOverlayByYear: werderbremenDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'werderbremen-de-konzernabschluss-2023': {
    id:'werderbremen-de-konzernabschluss-2023', clubId:'werderbremen-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2022 bis zum 30.06.2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Konzernabschluss (cuentas consolidadas, incluye Werder Bremen Merchandising GmbH y Werder Bremen Payment GmbH) bajado de unternehmensregister.de (registro mercantil oficial alemán). 21 páginas. Transcripción completa en Clubes/Alemania/Werder Bremen/konzernabschluss-2022-23.md.',
  },
  'werderbremen-de-konzernabschluss-2024': {
    id:'werderbremen-de-konzernabschluss-2024', clubId:'werderbremen-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Konzernabschluss (cuentas consolidadas) bajado de unternehmensregister.de. 21 páginas. Transcripción completa en Clubes/Alemania/Werder Bremen/konzernabschluss-2023-24.md.',
  },
  'werderbremen-de-konzernabschluss-2025': {
    id:'werderbremen-de-konzernabschluss-2025', clubId:'werderbremen-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Konzernabschluss (cuentas consolidadas) bajado de unternehmensregister.de. 20 páginas. Transcripción completa en Clubes/Alemania/Werder Bremen/konzernabschluss-2024-25.md. La tabla de GuV de este ejercicio llegó con columnas desalineadas en la conversión PDF→Markdown (ver comentario de cabecera de werderbremen-de-data.js sobre el resultado financiero/impuestos de 2025).',
  },
});

gestionesByClub['werderbremen-de'] = {
  actual: { nombre:'Gestión actual (Klaus Filbry, Vorsitzender der Geschäftsführung)', firstYear:2023, lastYear:2025 },
};

memberCountByClub['werderbremen-de'] = null;

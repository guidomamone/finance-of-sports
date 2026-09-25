// ============================================================================
// data/monchengladbach-de-data.js — Borussia VfL 1900 Mönchengladbach GmbH
// (Alemania, Bundesliga). 2 ejercicios REALES (2023, 2024), Jahresabschluss
// INDIVIDUAL (no hay Konzernabschluss separado). Transcripciones en
// Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-<año>.md.
//
// EJERCICIO CALENDARIO (01/01-31/12), NO 01/07-30/06 como el resto de los
// clubes alemanes ya cargados — confirmado en el propio documento ("Bilanz zum
// 31. Dezember 2023"/"...2024", "Gewinn- und Verlustrechnung für die Zeit vom
// 1. Januar bis 31. Dezember"). Por eso usa fx de CIERRE CALENDARIO
// (EUR@2023-12-31, EUR@2024-12-31), no las fechas 30/6 del resto — las 2 fechas
// YA EXISTÍAN en FX_CLOSE (data/currency-map.js) antes de esta carga, no hizo
// falta agregar ninguna.
//
// SOBRE EL 3er ARCHIVO DE LA CARPETA, `jahresabschluss-2024-aufsichtsratsbericht
// -nachtrag.md`: es el "Bericht des Aufsichtsrates zum Geschäftsjahr 2024" (el
// informe del CONSEJO DE VIGILANCIA/supervisory board), un documento narrativo
// de 3 páginas separado del balance — NO es el Jahresabschluss ni un anexo del
// balance en sí, es un informe de gobierno corporativo que el propio consejo de
// vigilancia redacta sobre su propia gestión de supervisión durante el año. Se
// leyó igual (confirma el Jahresfehlbetrag de 2,4M€ y la caída de ingresos de
// 7,8% en prosa) pero NO se usó como fuente de datos — todos los números de
// este archivo salen de `jahresabschluss-2024-completo.md`, el balance real.
//
// ADVERTENCIA DE CALIDAD DE FUENTE — TABLA DE GuV INCOMPLETA EN LOS 2 AÑOS: la
// conversión PDF→Markdown capturó limpio el desglose de Personalaufwand (Löhne+
// soziale Abgaben) y "Aufwendungen für bezogene Waren" (Materialaufwand), y
// saltó DIRECTAMENTE de ahí a "11. Ergebnis nach Steuern" — las filas de
// Umsatzerlöse, Sonstige betriebliche Erträge, Abschreibungen, Sonstige
// betriebliche Aufwendungen, Erträge/Aufwendungen financieros y Steuern vom
// Einkommen NO sobrevivieron como filas de tabla en ninguno de los 2 archivos
// (confirmado con grep, cero resultados). Se reconstruyó todo lo que se pudo
// cruzando: el Lagebericht ("Finanz-, Vermögens- und Ertragslage", que da en
// prosa el movimiento interanual de cada partida en TEUR) + el Konzern-
// Anlagenspiegel (que SÍ sobrevivió completo y limpio, con la columna
// "Abschreibung des Geschäftsjahres" separando Spielerwerte de Sachanlagen/
// Konzessionen) + "11. Ergebnis nach Steuern" y el Jahresüberschuss/
// -fehlbetrag de la Bilanz (los 2 únicos números EXACTOS al EUR que
// sobrevivieron intactos en la tabla).
//
// LO ÚNICO QUE QUEDÓ SIN PODER SEPARAR: "Sonstige betriebliche Erträge"
// (ingreso) y el resultado financiero neto (Finanzergebnis/netInterest) — el
// Lagebericht NO menciona ninguno de los 2 en ningún año (a diferencia de
// Werder/Köln/Hoffenheim/Hamburgo, que sí narran ambos). Por diferencia contra
// "11. Ergebnis nach Steuern" (el ancla exacta), el COMBINADO de ambos da
// TEUR ~615 (2023) y TEUR ~104 (2024) — montos chicos (0,3%/0,06% del revenue),
// pero la separación entre los 2 es una incógnita real, no una aproximación
// razonada. SE DECIDIÓ (documentado como duda en Admin/dudas-por-club.md):
// cargar el combinado ENTERO como línea de revenue "Sonstige betriebliche
// Erträge" (other_income) y `netInterest:0` para los 2 años — más simple que
// inventar una partición sin ningún ancla, pero es una SIMPLIFICACIÓN
// reconocida: dado que Borussia carga ~62-63M€ de deuda bancaria (Verbindlich-
// keiten gegenüber Kreditinstituten, ver Bilanz), es probable que el
// Finanzergebnis real sea negativo (varios cientos de miles a pocos millones)
// compensado por una "Sonstige betriebliche Erträge" positiva de magnitud
// similar — sin las filas originales del GuV no se puede confirmar el split.
//
// REVENUE — Umsatzerlöse por línea de negocio (Lagebericht "Finanz-, Vermögens-
// und Ertragslage" de cada año, TEUR): Spielbetrieb, Werbung, Fernseh- und
// Hörfunkverwertung (TV), Transfer, Handel tienen cifra propia; el resto
// (Umsatzerlöse total menos esas 5 partidas) es RESIDUAL sin desglose propio →
// other_income, disclosureLevel:'aggregated_residual' (mismo criterio que
// Werder/Hoffenheim). "Handel" → sponsorship_commercial (merchandising).
//
// GASTOS — Materialaufwand ("Aufwendungen für bezogene Waren", EXACTO en la
// tabla los 2 años) → other_expenses. Personalaufwand (Löhne+soziale Abgaben,
// EXACTO) → wages_squad, sin separar plantel de administración. Sonstige
// betriebliche Aufwendungen: el Lagebericht solo da el combinado "Material- und
// sonstige betriebliche Aufwendungen" (TEUR), así que se calculó por diferencia
// contra el Materialaufwand exacto (sin desglose adicional propio) →
// other_expenses. Abschreibungen: el Anlagenspiegel SÍ separa "Spielerwerte"
// (activo INDEPENDIENTE de "Entgeltlich erworbene Konzessionen" en este club, a
// diferencia de Hoffenheim/Köln donde las 2 cosas están mezcladas en una sola
// línea "Konzessionen") → player_amortisation = SOLO la columna "Abschreibung
// des Geschäftsjahres" de Spielerwerte; depreciation = Konzessiones (licencias/
// software, NO jugadores en este club) + Sachanlagen (Grundstücke + andere
// Anlagen). Los 2 componentes reconcilian EXACTOS contra el total impreso en el
// Lagebericht (34.633 en 2023, 30.789 en 2024).
//
// MONEDA: EUR los 2 ejercicios. fxRef contra FX_CLOSE: EUR@2023-12-31,
// EUR@2024-12-31 (ambas ya existían).
//
// LIGA: Bundesliga (1ª división) los 2 ejercicios — 14° puesto en la temporada
// 2023/24 (que cubre la 2da mitad del ejercicio calendario 2023 y la 1ra mitad
// del ejercicio 2024), sin descenso en ningún momento del período. Cargado en
// data/club-leagues/de.js.
//
// gestionId: 'actual' — la Geschäftsführung cambió DENTRO de 2024 (Rolf Königs
// hasta 19/3/2024, Stephan A.C. Schippers hasta 31/7/2024, Dr. Stefan
// Stegemann asume como nuevo CEO recién el 1/1/2025), sin un responsable único
// para todo el período en ninguno de los 2 ejercicios.
// ============================================================================

const monchengladbachDeRevenueLinesByYear = {
  // 2023: Umsatzerlöse total TEUR 197.721. Nombradas: Spielbetrieb 21.268,
  // Werbung 40.189, TV 68.206, Transfer 38.054, Handel 21.555 (suma 189.272,
  // residual 8.449). Sonstige betriebliche Erträge = combinado con
  // Finanzergebnis (ver comentario de cabecera), ajustado +0,000294 para que
  // el tie-out cierre exacto contra el Jahresüberschuss impreso.
  2023: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:21.268000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:40.189000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Fernseh- und Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:68.206000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transfer', normalizedCategory:'player_sales', amountNative:38.054000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:21.555000, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:8.449000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge (incluye una aproximación del resultado financiero neto — ver comentario de cabecera de este archivo)', normalizedCategory:'other_income', amountNative:0.614710, disclosureLevel:'aggregated_residual' },
  ],
  // 2024: Umsatzerlöse total TEUR 182.288. Nombradas: Spielbetrieb 23.407,
  // Werbung 42.149, TV 64.958, Transfer 18.909, Handel 24.184 (suma 173.607,
  // residual 8.681).
  2024: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:23.407000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:42.149000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Fernseh- und Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:64.958000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transfer', normalizedCategory:'player_sales', amountNative:18.909000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:24.184000, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:8.681000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge (incluye una aproximación del resultado financiero neto — ver comentario de cabecera de este archivo)', normalizedCategory:'other_income', amountNative:0.104068, disclosureLevel:'aggregated_residual' },
  ],
};

const monchengladbachDeExpenseLinesByYear = {
  2023: [
    { rawLabel:'Aufwendungen für bezogene Waren (Materialaufwand)', normalizedCategory:'other_expenses', amountNative:-12.949497, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-102.008369, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -94.607140], ['Soziale Abgaben', -7.401229],
    ]},
    // Abschreibung des Geschäftsjahres, Konzern-Anlagenspiegel: Spielerwerte 28.187.752,93 →
    // player_amortisation. Konzessionen 631.080,75 + Grundstücke 4.529.307,36 + andere Anlagen
    // 1.285.153,44 = 6.445.541,55 → depreciation. Suma 34.633.294,48 ≈ TEUR 34.633 impreso.
    { rawLabel:'Abschreibungen — Spielerwerte, laut Anlagenspiegel (Abschreibung des Geschäftsjahres)', normalizedCategory:'player_amortisation', amountNative:-28.187753, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Entgeltlich erworbene Konzessionen + Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-6.445541, disclosureLevel:'detailed', items:[
      ['Entgeltlich erworbene Konzessionen', -0.631081], ['Grundstücke, grundstücksgleiche Rechte und Bauten', -4.529307], ['Andere Anlagen, Betriebs- und Geschäftsausstattung', -1.285153],
    ]},
    // Sonstige betriebliche Aufwendungen = Material- und sonstige betriebliche Aufwendungen
    // combinado (TEUR 51.584, Lagebericht) menos Materialaufwand exacto (12.949497).
    { rawLabel:'Sonstige betriebliche Aufwendungen (por diferencia contra el combinado "Material- und sonstige betriebliche Aufwendungen" del Lagebericht)', normalizedCategory:'other_expenses', amountNative:-38.634503, disclosureLevel:'aggregated_residual' },
  ],
  2024: [
    { rawLabel:'Aufwendungen für bezogene Waren (Materialaufwand)', normalizedCategory:'other_expenses', amountNative:-12.918763, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-98.505634, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -90.415952], ['Soziale Abgaben', -8.089682],
    ]},
    // Spielerwerte 24.656.798,07 → player_amortisation. Konzessionen 682.732,83 + Grundstücke
    // 4.306.189,01 + andere Anlagen 1.143.092,62 = 6.132.014,46 → depreciation. Suma
    // 30.788.812,53 ≈ TEUR 30.789 impreso.
    { rawLabel:'Abschreibungen — Spielerwerte, laut Anlagenspiegel (Abschreibung des Geschäftsjahres)', normalizedCategory:'player_amortisation', amountNative:-24.656798, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Entgeltlich erworbene Konzessionen + Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-6.132014, disclosureLevel:'detailed', items:[
      ['Entgeltlich erworbene Konzessionen', -0.682733], ['Grundstücke, grundstücksgleiche Rechte und Bauten', -4.306189], ['Andere Anlagen, Betriebs- und Geschäftsausstattung', -1.143093],
    ]},
    { rawLabel:'Sonstige betriebliche Aufwendungen (por diferencia contra el combinado "Material- und sonstige betriebliche Aufwendungen" del Lagebericht)', normalizedCategory:'other_expenses', amountNative:-42.691237, disclosureLevel:'aggregated_residual' },
  ],
};

const monchengladbachDeFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-12-31',
    sourceId:'monchengladbach-de-jahresabschluss-2023',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest = 0 (simplificación reconocida: combinado con "Sonstige betriebliche Erträge"
    // del lado de revenue, ver comentario de cabecera).
    netInterest:0,
    // tax = 10. Steuern vom Einkommen und vom Ertrag (-5.734, Lagebericht "Steuerergebnis") +
    // 12. sonstige Steuern (-0.089501, despejado por diferencia entre Ergebnis nach Steuern
    // 4.376.047,44 y el Jahresüberschuss 4.286.546,48 impresos).
    tax:-5.823501,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:107.105528, cash:0.493335,
    officialTotalRevenue:198.335710, officialTotalExpenses:188.225663,
    // officialPAT = IV. Jahresüberschuss impreso EXACTO (4.286.546,48 EUR).
    officialPAT:4.286546,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'monchengladbach-de-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:0,
    // tax = 10. Steuern vom Einkommen (+0.136, Lagebericht "Steuerergebnis": Steuererstattung por
    // reversión de impuestos diferidos) + 12. sonstige Steuern (-0.056024, despejado por diferencia
    // entre Ergebnis nach Steuern -2.376.379,45 y el Jahresfehlbetrag -2.432.403,17 impresos).
    tax:0.079976,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:107.921968, cash:0.740841,
    officialTotalRevenue:182.392068, officialTotalExpenses:184.904447,
    // officialPAT = IV. Jahresfehlbetrag impreso EXACTO (-2.432.403,17 EUR).
    officialPAT:-2.432403,
  },
};

const monchengladbachDePresupuestoOverlayByYear = {};
const monchengladbachDePasesData = [];
const monchengladbachDeResultadosData = {};
const monchengladbachDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['monchengladbach-de'] = {
  revenueLinesByYear: monchengladbachDeRevenueLinesByYear, expenseLinesByYear: monchengladbachDeExpenseLinesByYear,
  fiscalYearMeta: monchengladbachDeFiscalYearMeta, pasesData: monchengladbachDePasesData,
  resultadosData: monchengladbachDeResultadosData, titulosData: monchengladbachDeTitulosData,
  presupuestoOverlayByYear: monchengladbachDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'monchengladbach-de-jahresabschluss-2023': {
    id:'monchengladbach-de-jahresabschluss-2023', clubId:'monchengladbach-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.01.2023 bis zum 31.12.2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la Borussia VfL 1900 Mönchengladbach GmbH (HRB 5742, Amtsgericht Mönchengladbach), ejercicio CALENDARIO. Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2023.md. La tabla de GuV llegó incompleta (faltan varias filas); reconstruido cruzando el Lagebericht y el Anlagenspiegel — ver comentario de cabecera de monchengladbach-de-data.js.',
  },
  'monchengladbach-de-jahresabschluss-2024': {
    id:'monchengladbach-de-jahresabschluss-2024', clubId:'monchengladbach-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.01.2024 bis zum 31.12.2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL, ejercicio CALENDARIO. Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2024-completo.md. Existe además jahresabschluss-2024-aufsichtsratsbericht-nachtrag.md (informe del Consejo de Vigilancia, narrativo, NO se usó como fuente de datos — ver comentario de cabecera de monchengladbach-de-data.js). Mismo problema de tabla de GuV incompleta que 2023.',
  },
});

gestionesByClub['monchengladbach-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2023, lastYear:2024 },
};

memberCountByClub['monchengladbach-de'] = null;

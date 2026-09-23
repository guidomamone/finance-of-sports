// ============================================================================
// data/koln-de-data.js — 1. FC Köln GmbH & Co. KGaA (Köln, Alemania).
// Uno de 5 clubes alemanes cargados en paralelo el 2026-09-22 (Bundesliga).
// País 'DE' y liga 'de-bundesliga' ya existían en data/leagues.js (agregados
// por otra sesión). clubId 'koln-de' (con guion) porque hay otros clubes
// alemanes con id corto potencialmente ambiguo — convención de esta tanda.
//
// FUENTE: `Clubes/Alemania/1. FC Köln/jahresabschluss-2023-24.md` y
// `jahresabschluss-2024-25.md` (transcripciones de los Jahresabschluss
// INDIVIDUALES, no consolidados — no hay Konzernabschluss separado para este
// club en los años recientes), bajados de unternehmensregister.de. Los PDF
// SÍ tienen capa de texto nativa (`pdftotext -layout` funciona limpio, no fue
// necesario OCR). Ver fuentes/Alemania/1. FC Köln.md para el detalle de
// sourcing.
//
// Ejercicio 2023/2024 (01.07.2023-30.06.2024, cierra 30/6/2024) → clave 2024.
// Ejercicio 2024/2025 (01.07.2024-30.06.2025, cierra 30/6/2025) → clave 2025.
// Fechas confirmadas leyendo el propio documento (encabezado del Jahresabschluss
// y de la Gewinn- und Verlustrechnung en cada .md), no asumidas del nombre de
// archivo.
//
// FORMATO DEL DOCUMENTO: Gewinn- und Verlustrechnung nach Gesamtkostenverfahren
// (§275 Abs. 2 HGB) — el P&L en sí solo tiene 6-8 líneas gruesas (Umsatzerlöse,
// sonstige betriebliche Erträge, Materialaufwand, Personalaufwand, Abschreibungen,
// sonstige betriebliche Aufwendungen, resultado financiero, impuestos). El
// desglose de Umsatzerlöse por "Tätigkeitsfeld" (línea de negocio) SÍ está en el
// Anhang (nota "IV. Erläuterungen zur Gewinn- und Verlustrechnung"), en TEUR
// (miles de EUR) — por eso revenueLines usa 3 decimales efectivos de precisión
// para esas 7 líneas (la suma da match exacto al TEUR redondeado, con un
// residuo de <0.1% contra el EUR exacto del total, documentado, no corregido a
// mano).
//
// UMSATZERLÖSE por Tätigkeitsfeld (Anhang IV, TEUR):
//                                    2023/2024   2024/2025
//   Spielbetrieb                       25.560      23.713    → matchday_competition
//   Werbung                            42.637      40.519    → sponsorship_commercial
//   Fernseh- u. Hörfunkverwertung      56.830      32.481    → broadcasting
//   Transfer                            3.232      12.181    → player_sales
//   Merchandising                      15.098      17.023    → sponsorship_commercial
//   Catering                            3.667       9.830    → stadium_other (concesiones
//     de estadio en día de partido, ver club-data-mapping SKILL.md sección 1: el Lagebericht
//     liga explícitamente la caída/suba de Catering a la cantidad de partidos EN CASA —
//     "fehlende Heimspiele"/vuelta del "eigenständigen Übernahme des Public Caterings" —
//     no es un negocio de catering externo al estadio)
//   Sonstige                            8.291       9.854    → other_income
//
// sonstige betriebliche Erträge (línea 2 del P&L, EUR exacto): 3.656.789,13
// (2023/24) y 5.250.220,50 (2024/25) → other_income. Incluye Sachbezug
// (beneficios en especie) y erträge periodenfremde (ingresos de ejercicios
// anteriores: reversión de previsiones, indemnizaciones de seguro).
//
// GASTOS — Materialaufwand: "betrifft Aufwendungen aus dem Bereich
// Merchandising und Catering" (nota explícita del Anhang) — costo de
// mercadería/insumos, sin categoría propia en el sitio → other_expenses.
//
// Personalaufwand: el documento NO separa plantel profesional de personal
// administrativo en ningún nivel (a diferencia de Vélez, que sí tiene un 2do
// eje por sector) — toda la masa salarial (Löhne y Gehälter + soziale
// Abgaben) va a wages_squad, con las 2 sub-líneas en `items` (misma
// categoría, solo transparencia).
//
// Abschreibungen (depreciación/amortización): el P&L combina en UNA línea
// "Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens
// und Sachanlagen" (intangibles — que para este club son casi enteramente
// Spielervermögen/derechos federativos de jugadores, ver nota del Anhang I:
// "Spielerwerte wurden... zu Anschaffungskosten bewertet und linear...
// abgeschrieben" — más software y algunos derechos de explotación menores) +
// Sachanlagen (bienes de uso tangibles). El Anlagenspiegel (Anlage 4 del
// Anhang, tabla de movimiento de activo fijo) SÍ separa la "Zugänge" (cargo
// del ejercicio) de la depreciación acumulada por cada uno de los 2 grupos, y
// la suma de esos 2 componentes reconcilia EXACTA con el total impreso en el
// P&L (2023/24: 6.676.510,06 + 2.178.390,37 = 8.854.900,43 ✓; 2024/25:
// 7.906.982,52 + 2.552.206,12 = 10.459.188,64 ✓). Se promovieron a 2 líneas de
// primer nivel (player_amortisation / depreciation) en vez de dejar todo en
// depreciation, siguiendo el mismo criterio de "REGLA CRÍTICA de sub-ítems"
// de club-data-mapping SKILL.md sección 1 — acá el desglose sale de una nota
// distinta (el Anlagenspiegel) en vez de una sub-fila del propio P&L, pero el
// principio es el mismo: no dejar plata real de amortización de pases
// enterrada en un bucket genérico cuando el documento SÍ permite separarla con
// un tie-out exacto.
//
// sonstige betriebliche Aufwendungen: sin desglose numérico en el Anhang (solo
// comentario narrativo en el Lagebericht) → queda una sola línea other_expenses.
//
// RESULTADO FINANCIERO (netInterest): sonstige Zinsen und ähnliche Erträge
// (ingreso) - Zinsen und ähnliche Aufwendungen (gasto). 2024/2025 tiene ADEMÁS
// una línea propia "Abschreibungen auf Finanzanlagen und auf Wertpapiere des
// Umlaufvermögens" (TEUR 3.000, deterioro de la participación en SK Gaming
// Beteiligungs GmbH — ver Anhang "III. Erläuterungen zur Bilanz") que en el
// esquema de §275 Abs. 2 HGB vive DENTRO del bloque de Finanzergebnis (entre
// los intereses ganados y los intereses pagados, posiciones 9-13), no en el
// bloque operativo — se sumó a netInterest en vez de a expenseLines por ese
// motivo estructural (mismo criterio de club-data-mapping SKILL.md sección 2:
// "resultado financiero, no operativo, nunca una línea"). netInterest
// 2024/2025 = 6.874,20 - 3.000.000,00 - 1.216.503,83 = -4.209.629,63.
//
// tax: Steuern vom Einkommen und vom Ertrag (impuesto a las ganancias) +
// sonstige Steuern (impuestos no relacionados al resultado, ej. tasas — es un
// renglón PROPIO y chico del P&L alemán, entre "Ergebnis nach Steuern" y
// "Jahresüberschuss") — se suman los 2 en el campo `tax` porque los 2 están
// "debajo de la línea" en la estructura del documento, ninguno es gasto
// operativo. Sin este ajuste, el tie-out con el Jahresüberschuss impreso no
// cierra exacto.
//
// TIE-OUT (verificado, ver también el cálculo completo en el comentario de
// cada año en fiscalYearMeta):
//   2023/2024: revenue 158,971709 + expenses -143,487558 + netInterest
//     -1,899231 + tax -1,804034 = 11,780886 = Jahresüberschuss impreso exacto.
//   2024/2025: revenue 150,851886 + expenses -140,091057 + netInterest
//     -4,209630 + tax -1,191767 = 5,359432 vs Jahresüberschuss impreso
//     5.359433,42 (diferencia de EUR 1, redondeo acumulado de los componentes
//     en 6 decimales, irrelevante).
//
// MONEDA: EUR ambos años. El documento no declara tipo de cambio propio a USD
// (no es un club de fuera de la Eurozona, no hay Anexo de moneda extranjera) —
// se usa fxRef a FX_CLOSE (data/currency-map.js), que YA tenía las 2 fechas
// necesitadas (EUR@2024-06-30, EUR@2025-06-30) antes de esta carga.
//
// grossDebt: se usó el total de "C. VERBINDLICHKEITEN" del Bilanz (Anleihen +
// Verbindlichkeiten gegenüber Kreditinstituten + aus Lieferungen und
// Leistungen + gegenüber Gesellschaftern + sonstige Verbindlichkeiten),
// EXCLUYENDO "B. RÜCKSTELLUNGEN" (previsiones) y "D. RECHNUNGSABGRENZUNGSPOSTEN"
// (ingresos diferidos) — mismo criterio más angosto que ya usan Boca/Vélez
// (ver club-data-mapping SKILL.md sección 14), no el total-pasivo amplio de
// Racing. cash: "Kassenbestand und Guthaben bei Kreditinstituten" (Bilanz,
// Activo circulante).
//
// BUNDESLIGA POR AÑO: el propio Lagebericht 2024/2025 lo dice explícito
// ("Grundsätzlich ist der Berichtszeitraum aufgrund des Klassenwechsels in den
// Geschäftsjahren 2024/2025 (2. Bundesliga) und 2023/2024 (Bundesliga) nur
// eingeschränkt mit dem des Vorjahreszeitraums zu vergleichen"), confirmado
// además por Wikipedia/DFL: temporada 2023-24 jugada en Bundesliga (con
// descenso a fin de esa temporada), temporada 2024-25 jugada en 2. Bundesliga
// (campeón, ascenso directo a Bundesliga para 2025-26). Por lo tanto: el año
// 2024 (ejercicio 2023/24) SÍ integra 'de-bundesliga'; el año 2025 (ejercicio
// 2024/25) NO — lo carga el orquestador en data/club-leagues/de.js, no este
// archivo.
// ============================================================================

const kolnDeRevenueLinesByYear = {
  2024: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:25.560000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung', normalizedCategory:'sponsorship_commercial', amountNative:42.637000, disclosureLevel:'detailed' },
    { rawLabel:'Fernseh- u. Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:56.830000, disclosureLevel:'detailed' },
    { rawLabel:'Transfer', normalizedCategory:'player_sales', amountNative:3.232000, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:15.098000, disclosureLevel:'detailed' },
    { rawLabel:'Catering', normalizedCategory:'stadium_other', amountNative:3.667000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige', normalizedCategory:'other_income', amountNative:8.291000, disclosureLevel:'detailed' },
    { rawLabel:'sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:3.656789, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:23.713000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung', normalizedCategory:'sponsorship_commercial', amountNative:40.519000, disclosureLevel:'detailed' },
    { rawLabel:'Fernseh- u. Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:32.481000, disclosureLevel:'detailed' },
    { rawLabel:'Transfer', normalizedCategory:'player_sales', amountNative:12.181000, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:17.023000, disclosureLevel:'detailed' },
    { rawLabel:'Catering', normalizedCategory:'stadium_other', amountNative:9.830000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige', normalizedCategory:'other_income', amountNative:9.854000, disclosureLevel:'detailed' },
    { rawLabel:'sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:5.250221, disclosureLevel:'detailed' },
  ],
};

const kolnDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-10.945362, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-62.750772, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', 56.248597], ['soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', 6.502175],
    ]},
    // Abschreibungen (P&L línea 5, TEUR 8.854,900), separada en 2 vía el Anlagenspiegel
    // (Anlage 4 del Anhang) — ver comentario de cabecera. Reconcilia exacto: 6,676510 +
    // 2,178390 = 8,854900.
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte sowie Lizenzen an solchen Rechten und Werten; überwiegend Spielervermögen), laut Anlagenspiegel', normalizedCategory:'player_amortisation', amountNative:-6.676510, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-2.178390, disclosureLevel:'detailed', items:[
      ['Grundstücke, grundstücksgleiche Rechte und Bauten einschließlich der Bauten auf fremden Grundstücken', 0.900914],
      ['technische Anlagen und Maschinen', 0.244808],
      ['andere Anlagen, Betriebs- und Geschäftsausstattung', 0.808318],
      ['geleistete Anzahlungen und Anlagen im Bau', 0.224352],
    ]},
    { rawLabel:'sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-60.936524, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-14.802485, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-55.939221, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', 48.302650], ['soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', 7.636572],
    ]},
    // Reconcilia exacto: 7,906983 + 2,552206 = 10,459189 (redondeo de 10.459188,64).
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte sowie Lizenzen an solchen Rechten und Werten; überwiegend Spielervermögen), laut Anlagenspiegel', normalizedCategory:'player_amortisation', amountNative:-7.906983, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-2.552206, disclosureLevel:'detailed', items:[
      ['Grundstücke, grundstücksgleiche Rechte und Bauten einschließlich der Bauten auf fremden Grundstücken', 1.042212],
      ['technische Anlagen und Maschinen', 0.262673],
      ['andere Anlagen, Betriebs- und Geschäftsausstattung', 1.114992],
      ['geleistete Anzahlungen und Anlagen im Bau', 0.132328],
    ]},
    { rawLabel:'sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-58.890161, disclosureLevel:'detailed' },
  ],
};

const kolnDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'koln-de-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // sonstige Zinsen und ähnliche Erträge (4.093,91) - Zinsen und ähnliche Aufwendungen
    // (1.903.325,39).
    netInterest:-1.899231,
    // Steuern vom Einkommen und vom Ertrag (-1.767.000,00) + sonstige Steuern (-37.033,72),
    // ver comentario de cabecera (los 2 son renglones "debajo de la línea", no gasto operativo).
    tax:-1.804034,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = C. VERBINDLICHKEITEN del Bilanz (Anleihen+Kreditinstitute+Lieferungen y
    // Leistungen+Gesellschafter+sonstige), EXCLUYE Rückstellungen/Rechnungsabgrenzung. cash =
    // Kassenbestand und Guthaben bei Kreditinstituten.
    grossDebt:37.862442, cash:11.882740,
    officialTotalRevenue:158.971709, officialTotalExpenses:143.487558, officialPAT:11.780886,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'koln-de-jahresabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // sonstige Zinsen und ähnliche Erträge (6.874,20) - Abschreibungen auf Finanzanlagen und auf
    // Wertpapiere des Umlaufvermögens (3.000.000,00, deterioro de la participación en SK Gaming) -
    // Zinsen und ähnliche Aufwendungen (1.216.503,83). Ver comentario de cabecera: la línea de
    // deterioro de Finanzanlagen vive en el bloque de Finanzergebnis del esquema HGB §275 Abs. 2,
    // no en el bloque operativo, por eso se sumó acá y no a expenseLines.
    netInterest:-4.209630,
    // Steuern vom Einkommen und vom Ertrag (-1.172.437,00) + sonstige Steuern (-19.329,72).
    tax:-1.191767,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:31.996691, cash:6.197026,
    officialTotalRevenue:150.851886, officialTotalExpenses:140.091057, officialPAT:5.359433,
  },
};

const kolnDePresupuestoOverlayByYear = {};

const kolnDePasesData = [];
const kolnDeResultadosData = {};
const kolnDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['koln-de'] = {
  revenueLinesByYear: kolnDeRevenueLinesByYear, expenseLinesByYear: kolnDeExpenseLinesByYear,
  fiscalYearMeta: kolnDeFiscalYearMeta, pasesData: kolnDePasesData,
  resultadosData: kolnDeResultadosData, titulosData: kolnDeTitulosData,
  presupuestoOverlayByYear: kolnDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'koln-de-jahresabschluss-2024': {
    id:'koln-de-jahresabschluss-2024', clubId:'koln-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024 (Auszug aus dem Unternehmensregister)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la 1. FC Köln GmbH & Co. KGaA (HRB 37030, Amtsgericht Köln), no consolidado — no hay Konzernabschluss separado para este club en los años recientes. Descargado vía unternehmensregister.de. PDF con capa de texto nativa. Transcripción completa en Clubes/Alemania/1. FC Köln/jahresabschluss-2023-24.md.',
  },
  'koln-de-jahresabschluss-2025': {
    id:'koln-de-jahresabschluss-2025', clubId:'koln-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025 (Auszug aus dem Unternehmensregister)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la 1. FC Köln GmbH & Co. KGaA (HRB 37030, Amtsgericht Köln), no consolidado. Descargado vía unternehmensregister.de. PDF con capa de texto nativa. Transcripción completa en Clubes/Alemania/1. FC Köln/jahresabschluss-2024-25.md.',
  },
});

// gestionesByClub: 'actual' para los 2 ejercicios — el Vorstand del 1. Fußball-Club Köln 01/07 e.V.
// (el asociado que controla el 100% de la KGaA) cambió de composición durante 2024/2025 (Wolf/
// Wettich/Sauren dejaron el cargo el 28-29/9/2025, después del cierre del ejercicio), y los
// Geschäftsführer de la propia KGaA también cambiaron dentro del ejercicio 2024/2025 (Rejek hasta
// 31/1/2025, Keller hasta 7/5/2025, Liesenfeld desde 21/5/2025) — no hay un único responsable
// identificable con solvencia para TODO el ejercicio, así que no se creó ninguna entrada con nombre
// propio en gestionesByClub['koln-de'].
gestionesByClub['koln-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['koln-de'] = null;

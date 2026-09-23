// ============================================================================
// data/stuttgart-de-data.js — VfB Stuttgart 1893 AG (Stuttgart, Alemania).
// Uno de 5 clubes alemanes cargados en paralelo (sesión 2026-09-22) — este
// club tiene la particularidad de cerrar ejercicio CALENDARIO, no
// julio-junio como los otros 4 de la misma ronda.
//
// FUENTE: `Clubes/Alemania/VfB Stuttgart/konzernabschluss-2023.md` y
// `konzernabschluss-2024.md` — Konzernabschluss (cuentas CONSOLIDADAS del
// grupo VfB, que incluye la AG matriz + 5 subsidiarias: VfB Stuttgart
// Marketing GmbH, VfB Stuttgart Beteiligungs-GmbH, VfB Reha-Welt GmbH, VfB
// Stuttgart Arena Betriebs GmbH, VfB Stuttgart Stadion GmbH), auditados por
// RSM Ebner Stolz. Ambos documentos tienen texto nativo (transcripción
// directa desde el HTML del Unternehmensregister, sin OCR).
//
// EJERCICIO CONFIRMADO CALENDARIO: cada documento lo dice explícito en su
// propio título — "Konzernabschluss zum Geschäftsjahr vom 01.01.2023 bis zum
// 31.12.2023" / "...vom 01.01.2024 bis zum 31.12.2024" — y la Konzern-Gewinn-
// und Verlustrechnung repite el mismo período en su encabezado. A diferencia
// de los otros 4 clubes de esta ronda (temporada jul-jun), acá el año de
// cierre = el año calendario completo, así que se carga con clave 2023/2024
// directo, sin ningún ajuste de temporada. fiscalYearStart:'01-01'.
//
// ESTRUCTURA DE LA GuV (HGB, Gesamtkostenverfahren): 23 renglones numerados,
// reconciliados EXACTOS con node antes de cargar (ver verificación al final
// de este comentario) — cierre perfecto contra el "Konzernjahresüberschuss"
// impreso en los dos ejercicios, sin ningún residuo sin explicar.
//
// REVENUE — "Umsatzerlöse" se desglosa en el Anhang (nota 1 de la GuV) en
// SOLO 4 grandes rubros, en miles de EUR ("TE"), notación alemana (el punto
// es separador de miles, no decimal — "35.845" TE = 35.845.000 EUR = 35,845
// millones EUR, exactamente el valor que se carga acá en amountNative):
//   Spielbetrieb          → matchday_competition (ingresos de día de partido;
//                            el propio Lagebericht confirma que esta cifra
//                            ES "Spieltagseinnahmen", no incluye abonos por
//                            separado — el documento no desglosa Dauerkarten)
//   Werbung/Sponsoring    → sponsorship_commercial
//   Medienvermarktung     → broadcasting
//   Handel und Sonstiges  → lump_football_operations (ver nota abajo, NO es
//                            sponsorship_commercial ni player_sales limpio)
//
// NOTA CRÍTICA sobre "Handel und Sonstiges" (mercadería/comercial + OTROS,
// el rubro que más creció año a año: 57,5M→81,1M→109,5M): el propio Anhang
// dice explícito, en los dos ejercicios, "Entsprechend den Gliederungs-
// vorgaben des DFL e.V. werden Erlöse aus Spielertransfers unter den
// Umsatzerlösen ausgewiesen. Die korrespondierenden Restbuchwerte sind dabei
// mindernd in demselben Posten erfasst" — es decir, el ingreso NETO por
// venta de jugadores (ingreso de transferencia MENOS el valor contable
// residual del pase vendido) está mezclado dentro de Umsatzerlöse, y por el
// tamaño/volatilidad de "Handel und Sonstiges" (el único de los 4 rubros que
// no tiene una cifra de Lagebericht que lo explique aparte) es casi seguro
// que esa neteación cae ahí adentro, junto con merchandising/venta de
// mercadería real. El Lagebericht da una cifra aproximada de "Erlöse nach
// DFL-Ausweis ohne Transfererlöse" (162,7M 2023 / cifra equivalente no
// repetida para 2024 en el mismo formato) que permitiría estimar el
// transfer neto ~41,4M (2023), pero es una cifra NARRATIVA redondeada a
// 100.000 EUR, no un renglón auditado con desglose exacto — separar
// "Handel und Sonstiges" en sponsorship_commercial + player_sales con ese
// número inventaría una precisión que el documento no tiene. Se optó por
// NO forzar la separación (mismo criterio que Racing 2009-2011 y los
// catch-alls de J.League, ver club-data-mapping SKILL.md secciones 1 y 18):
// se carga como UNA sola línea, categoría `lump_football_operations`,
// disclosureLevel 'aggregated_residual'. Consecuencia conocida: "Venta de
// Jugadores" en Formato Simplificado muestra $0 para Stuttgart aunque el
// club vendió jugadores reales (Endo, Mavropanos, Sosa en 2023) — es una
// limitación de LA FUENTE, no un error de categorización. Duda anotada para
// Admin/dudas-por-club.md: pedirle a VfB el desglose exacto de "Handel und
// Sonstiges" (¿cuánto es merchandising/comercial puro y cuánto es venta neta
// de jugadores?) para los dos ejercicios.
//
// "Sonstige betriebliche Erträge" (ingresos operativos varios, GuV renglón
// 4) → other_income. Sin desglose numerado en el Anhang, solo menciones
// narrativas de sus componentes más grandes (2023: 11,0M por la disolución
// anticipada de un pasivo diferido tras el cambio de nombre del estadio de
// Mercedes-Benz Arena a MHPArena; 2024: 5,9M por disolución de provisiones y
// bajas de activos) — no hay categoría normalizada mejor que other_income
// para "otros ingresos operativos" genéricos de un balance HGB.
//
// EXPENSES:
//   Materialaufwand (a+b, "bezogene Waren"+"bezogene Leistungen", combinadas
//     en una sola línea con items porque ambas son la misma categoría real:
//     costos operativos comprados a terceros, sin mejor encaje en la
//     taxonomía) → other_expenses.
//   Personalaufwand (Löhne+Gehälter + Soziale Abgaben, GuV 6a+6b): el Anhang
//     NO desglosa por departamento, pero el LAGEBERICHT sí da, en los dos
//     ejercicios, la cifra específica de "Personalkosten im Lizenzspieler-
//     bereich" (plantel profesional): 71,1M (2023), 88,7M (2024) — cifra
//     narrativa redondeada a 100.000 EUR, no un renglón auditado exacto, así
//     que se usa para separar wages_squad (esa cifra literal) del resto
//     (residuo = total Personalaufwand - Lizenzspieler), marcado
//     disclosureLevel 'aggregated_residual' en los dos casos. El resto
//     mezcla Amateur-/Jugendbereich (219/223 empleados) + Verwaltung/
//     Geschäftsstelle (237/247) + Aushilfen/Spieltagsaushilfen (151/180) —
//     tres funciones bien distintas (juvenil, administración, personal
//     temporario de día de partido) sin cifra propia para cada una, así que
//     el residuo va a other_expenses (catch-all) en vez de forzarlo a
//     admin_general_expense o youth_other_sports_expense sin evidencia de
//     cuánto corresponde a cada uno.
//   Abschreibungen (GuV renglón 7) SÍ tiene desglose EXACTO por clase de
//     activo en el Konzernanlagespiegel (Anlagevermögen-Bewegungstabelle,
//     columna "Abschr. lfd. Gj." = amortización/depreciación del ejercicio):
//       Spielerwerte (activos de pases de jugadores) → player_amortisation
//       Sachanlagen (Grundstücke + Andere Anlagen)   → depreciation
//       Konzessionen/Lizenzen (intangibles no-jugador) → other_amortisation
//     Los 3 suman EXACTO el total impreso en la GuV, sin residuo — la
//     separación más confiable de todo este archivo.
//   Sonstige betriebliche Aufwendungen (GuV renglón 8, el más grande de
//     todos: 71,3M 2023 / 90,0M 2024, ~34% y ~32% del gasto total
//     respectivamente) → other_expenses. Sin ningún desglose numerado en el
//     Anhang (solo menciones de que incluye efectos de conversión de
//     moneda extranjera, magnitudes chicas). Catch-all grande pero genuino:
//     el documento no da más detalle en ningún lado.
//
// netInterest = suma de TODOS los renglones de resultado financiero de la
// GuV (13. Sonstige Zinsen und ähnliche Erträge + 17a. Zinsen und ähnliche
// Aufwendungen + 17b. Vergütungen für Genussrechtskapital und Einlagen
// stiller Gesellschafter — esta última son intereses pagados a los
// partícipes de las "stille Beteiligungen"/Genussrechte, capital mezzanine
// que financia al club, conceptualmente costo financiero, no salario ni
// operación).
//
// tax = Steuern vom Einkommen und Ertrag (18.) + Sonstige Steuern (20., ej.
// impuesto inmobiliario, no es impuesto a las ganancias pero se resta
// DESPUÉS de "Ergebnis nach Steuern" en la propia GuV, así que conviene
// tratarlo junto al impuesto de ganancias en vez de como revenue/expense
// line) + Ergebnis nicht beherrschende Anteile (22., la porción de
// Jahresüberschuss que corresponde a socios minoritarios de una
// subsidiaria no 100% controlada — VfB Reha-Welt GmbH tiene un socio
// externo con 20%. No hay un campo dedicado a "interés minoritario" en
// fiscalYearMeta, y conceptualmente es otra resta "por debajo de la línea"
// en el camino hacia el resultado final atribuible al grupo, mismo lugar
// que Sonstige Steuern en la propia GuV — se suma a tax por eso).
// officialPAT = Konzernjahresüberschuss (el resultado FINAL, después de
// minoritarios — la cifra que el propio documento destaca como cierre de
// su Konzern-GuV).
//
// VERIFICACIÓN (tie-out, hecha con node antes de cargar, EXACTA sin
// redondeo relevante en los dos ejercicios):
//   2023: revenueLines suman 217,622360 M (vs. officialTotalRevenue exacto
//     217,622653 M — diferencia de 0,000293 M = 293 EUR, 0,00013% del
//     total, 100% explicada por el redondeo a miles de la propia tabla de
//     Umsatzerlöse del Anhang, documentado ahí mismo). |expenseLines| suman
//     210,074841 M (= officialTotalExpenses exacto). revenue + expenses +
//     netInterest + tax = 217,622653 - 210,074841 - 6,290382 - 0,578130 =
//     0,679300 M = EXACTO el Konzernjahresüberschuss impreso (679.300,04 EUR).
//   2024: revenueLines suman 299,815091 M (vs. 299,815224 M exacto,
//     diferencia de 0,000133 M, mismo motivo de redondeo a miles).
//     |expenseLines| suman 277,881349 M (= officialTotalExpenses exacto).
//     299,815224 - 277,881350 - 3,910318 - 2,580281 = 15,443275 M ≈ EXACTO
//     el Konzernjahresüberschuss impreso (15.443.275,78 EUR; diferencia de
//     1 EUR por redondeo en cascada de los pasos intermedios).
//
// MONEDA: EUR, sin tipo de cambio propio declarado por el documento (se
// revisó el Anhang completo — la única mención de moneda extranjera es la
// política genérica de conversión de partidas en moneda extranjera al
// Devisenkassamittelkurs del cierre, sin declarar un valor numérico EUR/USD
// puntual). fxRef:'EUR@2023-12-31' / 'EUR@2024-12-31' — NINGUNA de las 2
// fechas existe todavía en FX_CLOSE (data/currency-map.js), a diferencia de
// los otros 4 clubes de esta ronda que cierran 30/6. Van a generar
// console.warn hasta que el orquestador las agregue.
//
// gestionId: 'wehrle' — Alexander Wehrle es Vorstandsvorsitzender (CEO/
// presidente del Vorstand) confirmado por nombre en los DOS ejercicios
// ("Organe des Mutterunternehmens", Anhang). No es un "presidente" en el
// sentido argentino (VfB Stuttgart 1893 AG es una sociedad anónima con
// Vorstand + Aufsichtsrat, no un club asociativo con presidente electo —
// el VfB Stuttgart 1893 e.V., la asociación matriz, tiene su propia
// presidencia aparte, no confirmada acá), pero Wehrle SÍ es la cabeza
// ejecutiva de la AG que reporta este Konzernabschluss en los dos años.
//
// brandColor: null. Confirmado por de.wikipedia.org (infobox, consultado
// 2026-09-22): "Vereinsfarben: Weiß-Rot" — blanco PRIMERO, rojo como
// acento. Camiseta titular blanca con detalles rojos, mismo patrón
// documentado en club-or-year-onboarding SKILL.md ("camiseta blanca con un
// acento fuerte... no se resuelve buscando más, es decisión de producto")
// para River/Vélez/Sevilla/Real Madrid/Valencia/Once Caldas — se deja en
// null en vez de elegir rojo unilateralmente.
// ============================================================================

const stuttgartDeRevenueLinesByYear = {
  2023: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:35.845000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung/Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:30.414000, disclosureLevel:'detailed' },
    { rawLabel:'Medienvermarktung', normalizedCategory:'broadcasting', amountNative:56.756000, disclosureLevel:'detailed' },
    { rawLabel:'Handel und Sonstiges', normalizedCategory:'lump_football_operations', amountNative:81.077000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:13.530360, disclosureLevel:'not_disclosed' },
  ],
  2024: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:53.493000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung/Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:39.778000, disclosureLevel:'detailed' },
    { rawLabel:'Medienvermarktung', normalizedCategory:'broadcasting', amountNative:89.890000, disclosureLevel:'detailed' },
    { rawLabel:'Handel und Sonstiges', normalizedCategory:'lump_football_operations', amountNative:109.498000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:7.156091, disclosureLevel:'not_disclosed' },
  ],
};

const stuttgartDeExpenseLinesByYear = {
  2023: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-9.779388, disclosureLevel:'not_disclosed', items:[
      ['Aufwendungen für bezogene Waren', -5.347668], ['Aufwendungen für bezogene Leistungen', -4.431720],
    ]},
    { rawLabel:'Personalaufwand: Lizenzspielerbereich (laut Lagebericht)', normalizedCategory:'wages_squad', amountNative:-71.100000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Personalaufwand: übrige Bereiche (Amateur-/Jugendbereich, Verwaltung/Geschäftsstelle, Aushilfen — Restwert)', normalizedCategory:'other_expenses', amountNative:-34.716695, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-20.268011, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf entgeltlich erworbene Konzessionen, Schutzrechte und ähnliche Rechte', normalizedCategory:'other_amortisation', amountNative:-0.044710, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-2.858487, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-71.307550, disclosureLevel:'not_disclosed' },
  ],
  2024: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-23.153317, disclosureLevel:'not_disclosed', items:[
      ['Aufwendungen für bezogene Waren', -8.012439], ['Aufwendungen für bezogene Leistungen', -15.140878],
    ]},
    { rawLabel:'Personalaufwand: Lizenzspielerbereich (laut Lagebericht)', normalizedCategory:'wages_squad', amountNative:-88.700000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Personalaufwand: übrige Bereiche (Amateur-/Jugendbereich, Verwaltung/Geschäftsstelle, Aushilfen — Restwert)', normalizedCategory:'other_expenses', amountNative:-45.427990, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-27.498827, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf entgeltlich erworbene Konzessionen, Schutzrechte und ähnliche Rechte', normalizedCategory:'other_amortisation', amountNative:-0.042293, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.071713, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-89.987209, disclosureLevel:'not_disclosed' },
  ],
};

const stuttgartDeFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-12-31',
    sourceId:'stuttgart-de-konzernabschluss-2023',
    reportType:'official_balance_sheet',
    gestionId:'wehrle',
    // netInterest = 13. Sonstige Zinsen und ähnliche Erträge (264.112,51) + 17a. Zinsen und
    // ähnliche Aufwendungen (-6.141.016,90) + 17b. Vergütungen für Genussrechtskapital und
    // Einlagen stiller Gesellschafter (-413.477,25) = -6.290.381,64 EUR.
    netInterest:-6.290382,
    // tax = 18. Steuern vom Einkommen und Ertrag (-185.001,05) + 20. Sonstige Steuern
    // (-295.417,25) + 22. Ergebnis nicht beherrschende Anteile (-97.712,00) = -578.130,30 EUR.
    tax:-0.578130,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = D. Verbindlichkeiten (Konzernbilanz Passiva, total: Kreditinstitute +
    // Lieferungen und Leistungen + Transfer + verbundene Unternehmen + Sonstige Verbindlichkeiten
    // = 125.909.849,45 EUR), EXCLUYE C. Rückstellungen (provisiones, 19.069.886,69) y
    // B. Beteiligungskapital/Stille Beteiligungen (7.753.000,00, capital mezzanine) y
    // E. Rechnungsabgrenzungsposten (ingresos diferidos, 28.060.275,06) — mismo criterio que
    // Boca/Vélez (club-data-mapping SKILL.md sección 14): la línea más angosta de "Deudas".
    // cash = III. Kassenbestand und Guthaben bei Kreditinstituten (Konzernbilanz Aktiva).
    grossDebt:125.909849, cash:9.153243,
    officialTotalRevenue:217.622653, officialTotalExpenses:210.074841, officialPAT:0.679300,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'stuttgart-de-konzernabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'wehrle',
    // netInterest = 13. (657.008,83) + 17a. (-4.139.724,61) + 17b. (-427.602,25) = -3.910.318,03.
    netInterest:-3.910318,
    // tax = 18. (-2.476.306,01) + 20. (-14.399,98) + 22. Ergebnis nicht beherrschende Anteile
    // (-89.575,00) = -2.580.280,99.
    tax:-2.580281,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = D. Verbindlichkeiten (Kreditinstitute + Lieferungen und Leistungen + Transfer +
    // verbundene Unternehmen + Sonstige Verbindlichkeiten = 140.706.446,39 EUR), mismo criterio
    // que 2023. cash = Kassenbestand und Guthaben bei Kreditinstituten, Konzernbilanz Aktiva.
    grossDebt:140.706446, cash:10.438385,
    officialTotalRevenue:299.815224, officialTotalExpenses:277.881350, officialPAT:15.443276,
  },
};

const stuttgartDePresupuestoOverlayByYear = {};
const stuttgartDePasesData = []; const stuttgartDeResultadosData = {}; const stuttgartDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['stuttgart-de'] = {
  revenueLinesByYear: stuttgartDeRevenueLinesByYear, expenseLinesByYear: stuttgartDeExpenseLinesByYear,
  fiscalYearMeta: stuttgartDeFiscalYearMeta, pasesData: stuttgartDePasesData,
  resultadosData: stuttgartDeResultadosData, titulosData: stuttgartDeTitulosData,
  presupuestoOverlayByYear: stuttgartDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'stuttgart-de-konzernabschluss-2023': {
    id:'stuttgart-de-konzernabschluss-2023', clubId:'stuttgart-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.01.2023 bis zum 31.12.2023 (VfB Stuttgart 1893 AG, cuentas consolidadas)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado del Unternehmensregister alemán. Auditado por RSM Ebner Stolz GmbH & Co. KG, sin salvedades. Ejercicio CALENDARIO confirmado por el propio título del documento (01.01.2023-31.12.2023). "Handel und Sonstiges" (revenue) mezcla merchandising con venta neta de jugadores sin desglose exacto disponible — ver comentario de cabecera de data/stuttgart-de-data.js. Transcripción completa en Clubes/Alemania/VfB Stuttgart/konzernabschluss-2023.md.',
  },
  'stuttgart-de-konzernabschluss-2024': {
    id:'stuttgart-de-konzernabschluss-2024', clubId:'stuttgart-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.01.2024 bis zum 31.12.2024 (VfB Stuttgart 1893 AG, cuentas consolidadas)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado del Unternehmensregister alemán. Auditado por RSM Ebner Stolz GmbH & Co. KG, sin salvedades. Ejercicio CALENDARIO confirmado por el propio título del documento (01.01.2024-31.12.2024). Transcripción completa en Clubes/Alemania/VfB Stuttgart/konzernabschluss-2024.md.',
  },
});

gestionesByClub['stuttgart-de'] = {
  wehrle: { nombre:'Alexander Wehrle (Vorstandsvorsitzender)', firstYear:2023, lastYear:2024 },
};

memberCountByClub['stuttgart-de'] = null;

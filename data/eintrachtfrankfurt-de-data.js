// ============================================================================
// data/eintrachtfrankfurt-de-data.js — Eintracht Frankfurt Fußball Aktiengesellschaft
// (Frankfurt am Main, Alemania). Ejercicios 2023/24 y 2024/25 (1/7 a 30/6), motor genérico.
//
// FUENTES (Konzernabschluss CONSOLIDADO, vía unternehmensregister.de):
// - Clubes/Alemania/Eintracht Frankfurt/konzernabschluss-2023-24.md (cierra 30/6/2024 -> año 2024)
// - Clubes/Alemania/Eintracht Frankfurt/konzernabschluss-2024-25.md (cierra 30/6/2025 -> año 2025)
// Ambos son extractos del Unternehmensregister (34 págs. cada uno), incluyen Konzernlagebericht +
// Konzernbilanz + Konzern-GuV + Konzernanhang. El consolidado ES el total oficial de este club (no
// existe un balance individual paralelo a buscar).
//
// Cifras en EUR MILLONES nativos, escala 1 (mismo criterio que Real Madrid/clubes de España): el
// documento reporta la mayoría de sus tablas "in TEURO" (miles de €) — dividido por 1.000 da
// millones. La Konzern-GuV en sí (y algunas notas puntuales) va en EUR completos — dividido por
// 1.000.000 da millones. fx: EUR@2024-06-30 (0,9337) y EUR@2025-06-30 (0,8532) YA existen en
// FX_CLOSE (data/currency-map.js) — el documento NO declara su propio tipo de cambio (no reporta
// partidas materiales en USD), así que se referencian con fxRef, sin fx/fxSource propios.
//
// CATEGORIZACIÓN DE INGRESOS (Nota 16 "Umsatzerlöse" de cada Konzernanhang, tabla formal que
// reconcilia EXACTA contra el total de Umsatzerlöse impreso en la Konzern-GuV, +
// "Sonstige betriebliche Erträge" como línea aparte, Nota 17):
// - Spielbetrieb (recaudación de partidos, entradas) -> matchday_competition.
// - Vermarktung (explotación comercial de derechos propios: sponsoring, hospitality, palcos) ->
//   sponsorship_commercial.
// - TV-Rechte (derechos de TV: Bundesliga + competencias UEFA + DFB-Pokal, el documento NO separa
//   premios de dinero de TV, todo bajo "TV-Rechte") -> broadcasting. La nota narrativa da un
//   desglose PARCIAL ("im Wesentlichen" = "principalmente") de Bundesliga/UEFA/DFB-Pokal que NO
//   suma exacto al total de la línea (falta un resto sin desglosar) -> no se cargó como `items`
//   para no insinuar una completitud que la fuente no da.
// - Spielertransfer (venta/préstamo de jugadores, bruto, SIN netear contra el gasto "Transfer" del
//   lado de Aufwendungen — el documento no netea, ver club-data-mapping SKILL.md sección 3) ->
//   player_sales. Nota 16 SÍ da un desglose exacto (venta de derechos + comisiones de préstamo) ->
//   se cargó como `items`.
// - Merchandising und Catering -> sponsorship_commercial (merchandising del club, ver
//   club-data-mapping SKILL.md sección 1).
// - Frauen und Jugendfußball (línea COMBINADA fútbol femenino + juvenil, el documento no la separa
//   en ningún lado para el lado de ingresos) -> other_income. DUDA GENUINA (reportada, no resuelta
//   unilateralmente): ni `womens_football` ni `youth_football` solos serían fieles, y no hay
//   categoría combinada en la taxonomía — se optó por el catch-all en vez de forzar una de las 2.
// - Fußballschule (escuela de fútbol comercial para chicos, campamentos) -> youth_football
//   (aproximación: es la categoría más cercana disponible, aunque no es un desglose formal de
//   Nachwuchsleistungszentrum).
// - Sonstiges (residual de la propia Nota 16) -> other_income.
// - Sonstige betriebliche Erträge (Nota 17: disolución de pasivos con agentes, beneficios en
//   especie a empleados, refacturación de modernización del estadio, reversión de provisiones,
//   aportes de terceros) -> other_income. La nota da un desglose PARCIAL ("im Wesentlichen") que no
//   suma exacto al total -> no se cargó `items`, mismo criterio que TV-Rechte arriba.
//
// CATEGORIZACIÓN DE GASTOS (Nota 19 "Sonstige betriebliche Aufwendungen", Nota 18 "Personalaufwand",
// Notas 5/6 para el desglose de Abschreibungen; + "Aufwendungen für bezogene Waren" de la GuV):
// - Aufwendungen für bezogene Waren (compra de mercadería para venta, ej. insumos de merchandising)
//   -> admin_general_expense (no hay categoría de "costo de ventas" propia; `admin_general_expense`
//   cubre explícitamente "comerciales" según category-map.js).
// - Personalaufwand: el documento SÍ permite separar (Nota 18 declara el % exacto atribuible al
//   "área deportiva"): 2024 = 77,5% (109,6 M, cifra dada literal por el documento) -> wages_squad;
//   resto (141,378594 - 109,6 = 31,778594) -> admin_general_expense. 2025 = 79,2% (140,4 M) ->
//   wages_squad; resto (177,300117 - 140,4 = 36,900117) -> admin_general_expense.
// - Abschreibungen (D&A): el documento NO da una línea GuV propia con este desglose completo, pero
//   las Notas 5 (Immaterielle Vermögensgegenstände) y 6 (Sachanlagen) SÍ permiten reconstruirlo
//   exacto por sub-categoría real distinta (promovidas a líneas de primer nivel, ver
//   club-data-mapping SKILL.md sección 1):
//     · Abschreibungen sobre Spielerwerte (Männer+Frauen+NLZ, Nota 5) -> player_amortisation.
//     · Abschreibungen sobre Lizenzen/Software + Geschäfts-/Firmenwert (Nota 5) -> other_amortisation.
//     · Abschreibungen sobre Sachanlagen (Nota 6, residual: total D&A del Lagebericht menos el total
//       de Nota 5) -> depreciation.
// - Spielbetrieb Lizenzfußball (Nota 19): el documento aclara EXPLÍCITAMENTE (Nota 16) que "die
//   Restbuchwerte aus Spielerabgängen werden unter... Aufwendungen für Spielbetrieb Lizenzfußball
//   ausgewiesen" (el valor libro residual de los jugadores que se fueron del club se contabiliza
//   ACÁ) — es una categoría real distinta (constitutivo del costo de venta de jugadores, no del
//   funcionamiento de partidos) y se promovió a línea propia: "Abgang von Spielerwerten" ->
//   player_amortisation. El resto de la línea (Verbandsabgaben, seguridad/orden, uso del estadio,
//   viajes, salud, ropa/equipamiento, centro de entrenamiento) -> match_organisation_expense. La
//   nota da "größte Posten" (los ítems más grandes, no exhaustivo) -> se cargó igual como `items`
//   de transparencia, con una diferencia residual chica sin desglosar (documentada, no inventada).
// - Marketing und Kommunikation, Merchandising (gasto), Verwaltung -> admin_general_expense (costos
//   comerciales/administrativos no deportivos).
// - Transfer (comisiones de agentes + cargos de transferencia/préstamo, mezcla de costos de compra
//   Y venta de jugadores según la propia narrativa del documento) -> other_expenses. DUDA GENUINA
//   (reportada, no resuelta unilateralmente): no hay categoría de "costo de transacción de pases"
//   distinta de player_amortisation (que es para amortización/deterioro de activos propios, no para
//   comisiones), así que se usó el catch-all en vez de forzar player_amortisation como hace Racing
//   con su "Costo Transferencia de Jugadores" (que sí es específicamente costo de ADQUISICIÓN).
// - Frauen- und Jugendfußball (gasto, SÍ separado por el documento en NLZ + Frauenfußball, a
//   diferencia del lado de ingresos) -> youth_other_sports_expense, con `items` exactos.
// - Fußballschule (gasto, solo declarado en 2024; en 2025 sus costos quedaron narrativamente
//   embebidos dentro de "Marketing und Kommunikation" sin línea propia en la tabla formal de Nota 19
//   — se sigue la tabla formal de cada año, no se fuerza continuidad entre ejercicios) ->
//   youth_other_sports_expense.
//
// RESULTADOS FINANCIEROS Y FISCALES (fiscalYearMeta, nunca como línea, ver sección 2 del skill):
// - netInterest = "Finanzergebnis" impreso (Nota 20), literal.
// - tax = "Steuern vom Einkommen und vom Ertrag" (Nota 21) + un renglón "Sonstige Steuern" que el
//   propio extracto del Unternehmensregister NO imprime como fila con nombre (aparece un salto de
//   numeración entre "11./12. Ergebnis nach Steuern" y "13./14. Konzernjahresüberschuss/-fehlbetrag
//   vor nicht beherrschenden Anteilen" en la Konzern-GuV) pero SÍ se puede despejar exacto por
//   diferencia entre esos 2 totales impresos — ver verificación por año abajo.
// - officialPAT = "Konzernjahresüberschuss"/"Konzernjahresfehlbetrag" VOR nicht beherrschenden
//   Anteilen (el resultado TOTAL del grupo consolidado, antes de la porción atribuida a minoritarios
//   de la subsidiaria Eintracht Frankfurt Sportpark Dreieich GmbH, 62,5% — ver Konzernanhang Nota 2).
//   Se usa esta cifra (no la "nach nicht beherrschenden Anteilen") porque reconcilia exacta con
//   revenue+expenses+netInterest+tax sin necesitar un campo aparte para la porción de minoritarios.
// - profitOnPlayerSales / assetSales = 0 para los 2 años: el documento no reporta un resultado neto
//   de venta de jugadores/activos APARTE del cuerpo de Umsatzerlöse/Aufwendungen (a diferencia de
//   Real Madrid) — ya está todo capturado en revenueLines (Spielertransfer) y expenseLines (Abgang
//   von Spielerwerten), netearlo de nuevo en meta sería contarlo dos veces.
// - grossDebt = "Verbindlichkeiten gegenüber Kreditinstituten" (Konzernbilanz, Passiva). cash =
//   "Kassenbestand und Guthaben bei Kreditinstituten" (Konzernbilanz, Aktiva).
//
// VERIFICACIÓN (tie-out, ver club-data-mapping SKILL.md sección 6):
// 2024: Revenue líneas suman 390,505068 M vs. "Summe betriebliche Erträge" impreso 390,504820 M
//   (dif. 0,000248 M ≈ €248, redondeo de convertir filas en TEURO). Expenses líneas suman
//   353,647496 M vs. "Summe betriebliche Aufwendungen" impreso 353,647338 M (dif. 0,000158 M ≈
//   €158, mismo motivo). tax se despejó como: "11./12. Ergebnis nach Steuern" impreso 27,526684 M
//   = Betriebsergebnis (36,857482) + Finanzergebnis (-5,132041) - Steuern vom Einkommen (Nota 21:
//   4,198756) EXACTO; luego "14. Konzernjahresüberschuss vor nicht beherrschenden Anteilen" impreso
//   26,857789 M = Ergebnis nach Steuern (27,526684) - Sonstige Steuern (0,668896, despejado por
//   diferencia, sin fila propia en el extracto) EXACTO. tax total cargado = -(4,198756+0,668896) =
//   -4,867652 M. Revenue+Expenses+netInterest+tax = 390,505068-353,647496-5,132041-4,867652 =
//   26,857879 vs. officialPAT impreso 26,857789 (dif. 0,00009 M ≈ €90, redondeo acumulado). officialPAT
//   usa la cifra impresa exacta (26,857789), no la resultante de la suma de líneas redondeadas.
// 2025: Revenue líneas suman 389,131701 M vs. impreso 389,131471 M (dif. €230). Expenses líneas
//   suman 392,088520 M vs. impreso 392,089555 M (dif. €1.035). tax: "11. Ergebnis nach Steuern"
//   impreso -8,358179 M = Betriebsergebnis (-2,958084) + Finanzergebnis (-5,431050) + Steuerertrag
//   (Nota 21: +0,030955, EXACTO) [ojo: 2025 es un Steuerertrag/ingreso por impuestos, no un gasto];
//   luego "13. Konzernjahresfehlbetrag vor nicht beherrschenden Anteilen" impreso -8,456566 M =
//   Ergebnis nach Steuern (-8,358179) - Sonstige Steuern (0,098388, despejado por diferencia) EXACTO.
//   tax total cargado = +0,030955-0,098388 = -0,067432 M (neto, cargado como tax único). officialPAT
//   usa la cifra impresa exacta -8,456566 M.
// ============================================================================

const eintrachtfrankfurtDeRevenueLinesByYear = {
  2024: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:24.565, disclosureLevel:'detailed' },
    { rawLabel:'Vermarktung', normalizedCategory:'sponsorship_commercial', amountNative:84.419, disclosureLevel:'detailed' },
    { rawLabel:'TV-Rechte', normalizedCategory:'broadcasting', amountNative:92.614, disclosureLevel:'detailed' },
    { rawLabel:'Spielertransfer', normalizedCategory:'player_sales', amountNative:143.163, disclosureLevel:'detailed', items:[
      ['Veräußerungserlöse von aktivierten und nichtaktivierten Spielern', 143.026], ['Erlöse aus Ausleihgebühren', 0.137],
    ]},
    { rawLabel:'Merchandising und Catering', normalizedCategory:'sponsorship_commercial', amountNative:27.184, disclosureLevel:'detailed' },
    { rawLabel:'Frauen und Jugendfußball', normalizedCategory:'other_income', amountNative:7.622, disclosureLevel:'detailed' },
    { rawLabel:'Fußballschule', normalizedCategory:'youth_football', amountNative:1.065, disclosureLevel:'detailed' },
    { rawLabel:'Sonstiges', normalizedCategory:'other_income', amountNative:0.177, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:9.696068, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:28.523, disclosureLevel:'detailed' },
    { rawLabel:'Vermarktung', normalizedCategory:'sponsorship_commercial', amountNative:91.571, disclosureLevel:'detailed' },
    { rawLabel:'TV-Rechte', normalizedCategory:'broadcasting', amountNative:107.937, disclosureLevel:'detailed' },
    { rawLabel:'Spielertransfer', normalizedCategory:'player_sales', amountNative:118.580, disclosureLevel:'detailed', items:[
      ['Veräußerungserlöse von aktivierten und nichtaktivierten Spielern', 117.950], ['Erlöse aus Ausleihgebühren', 0.630],
    ]},
    { rawLabel:'Merchandising und Catering', normalizedCategory:'sponsorship_commercial', amountNative:29.236, disclosureLevel:'detailed' },
    { rawLabel:'Frauen und Jugendfußball', normalizedCategory:'other_income', amountNative:7.597, disclosureLevel:'detailed' },
    { rawLabel:'Sonstiges', normalizedCategory:'other_income', amountNative:0.248, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:5.439701, disclosureLevel:'detailed' },
  ],
};

const eintrachtfrankfurtDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aufwendungen für bezogene Waren', normalizedCategory:'admin_general_expense', amountNative:-12.208902, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand (sportlicher Bereich, 77,5%)', normalizedCategory:'wages_squad', amountNative:-109.6, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand (Verwaltung / Back Office, 22,5%)', normalizedCategory:'admin_general_expense', amountNative:-31.778594, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Spielerwerte (Männer, Frauen, NLZ)', normalizedCategory:'player_amortisation', amountNative:-27.823, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Lizenzen/Software und Geschäfts- oder Firmenwert', normalizedCategory:'other_amortisation', amountNative:-1.217, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-5.278, disclosureLevel:'detailed' },
    { rawLabel:'Spielbetrieb Lizenzfußball (Restbuchwerte aus Spielerabgängen)', normalizedCategory:'player_amortisation', amountNative:-16.492, disclosureLevel:'detailed' },
    // items NO incluidos a propósito (Versión de esta sesión, corrigiendo un hallazgo de
    // node tools/audit.js): la Nota 19 da un desglose "im Wesentlichen" (sustancialmente, no
    // completo) que solo suma 24,211 de los 26,414 impresos — agregar esos sub-ítems solos
    // implicaría una falsa completitud (mismo criterio ya aplicado a "TV-Rechte" en este archivo).
    { rawLabel:'Spielbetrieb Lizenzfußball (organización y logística, desglose parcial en Nota 19: Verbandsabgaben, seguridad, uso del estadio, viajes, atención sanitaria, indumentaria, centro de entrenamiento)', normalizedCategory:'match_organisation_expense', amountNative:-26.414, disclosureLevel:'aggregated' },
    { rawLabel:'Marketing und Kommunikation', normalizedCategory:'admin_general_expense', amountNative:-57.770, disclosureLevel:'detailed' },
    { rawLabel:'Transfer', normalizedCategory:'other_expenses', amountNative:-38.907, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'admin_general_expense', amountNative:-4.784, disclosureLevel:'detailed' },
    { rawLabel:'Verwaltung', normalizedCategory:'admin_general_expense', amountNative:-13.138, disclosureLevel:'detailed' },
    { rawLabel:'Frauen- und Jugendfußball', normalizedCategory:'youth_other_sports_expense', amountNative:-7.251, disclosureLevel:'detailed', items:[
      ['Nachwuchsleistungszentrum (NLZ)', 4.366], ['Frauenfußball', 2.885],
    ]},
    { rawLabel:'Fußballschule', normalizedCategory:'youth_other_sports_expense', amountNative:-0.986, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Aufwendungen für bezogene Waren', normalizedCategory:'admin_general_expense', amountNative:-13.445403, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand (sportlicher Bereich, 79,2%)', normalizedCategory:'wages_squad', amountNative:-140.4, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand (Verwaltung / Back Office, 20,8%)', normalizedCategory:'admin_general_expense', amountNative:-36.900117, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Spielerwerte (Männer, Frauen, NLZ)', normalizedCategory:'player_amortisation', amountNative:-38.330, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Lizenzen/Software und Geschäfts- oder Firmenwert', normalizedCategory:'other_amortisation', amountNative:-1.425, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-6.236, disclosureLevel:'detailed' },
    { rawLabel:'Spielbetrieb Lizenzfußball (Restbuchwerte aus Spielerabgängen)', normalizedCategory:'player_amortisation', amountNative:-12.606, disclosureLevel:'detailed' },
    // items NO incluidos a propósito, mismo motivo que el ejercicio 2024 de arriba (desglose
    // parcial de la Nota 19, no completo).
    { rawLabel:'Spielbetrieb Lizenzfußball (organización y logística, desglose parcial en Nota 19: Verbandsabgaben, seguridad, uso del estadio, viajes, atención sanitaria, centro de entrenamiento, indumentaria)', normalizedCategory:'match_organisation_expense', amountNative:-28.120, disclosureLevel:'aggregated' },
    { rawLabel:'Marketing und Kommunikation', normalizedCategory:'admin_general_expense', amountNative:-63.887, disclosureLevel:'detailed' },
    { rawLabel:'Transfer', normalizedCategory:'other_expenses', amountNative:-26.306, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'admin_general_expense', amountNative:-4.567, disclosureLevel:'detailed' },
    { rawLabel:'Verwaltung', normalizedCategory:'admin_general_expense', amountNative:-13.186, disclosureLevel:'detailed' },
    { rawLabel:'Frauen- und Jugendfußball', normalizedCategory:'youth_other_sports_expense', amountNative:-6.680, disclosureLevel:'detailed', items:[
      ['Nachwuchsleistungszentrum (NLZ)', 4.596], ['Frauenfußball', 2.084],
    ]},
  ],
};

const eintrachtfrankfurtDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'eintrachtfrankfurt-de-konzernabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-5.132041,
    tax:-4.867652,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:57.069177, cash:3.666443,
    officialTotalRevenue:390.504820, officialTotalExpenses:353.647338, officialPAT:26.857789,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'eintrachtfrankfurt-de-konzernabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-5.431050,
    tax:-0.067432,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:60.715487, cash:4.383441,
    officialTotalRevenue:389.131471, officialTotalExpenses:392.089555, officialPAT:-8.456566,
  },
};

const eintrachtfrankfurtDePresupuestoOverlayByYear = {};

const eintrachtfrankfurtDePasesData = [];
const eintrachtfrankfurtDeResultadosData = {};
const eintrachtfrankfurtDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['eintrachtfrankfurt-de'] = {
  revenueLinesByYear: eintrachtfrankfurtDeRevenueLinesByYear, expenseLinesByYear: eintrachtfrankfurtDeExpenseLinesByYear,
  fiscalYearMeta: eintrachtfrankfurtDeFiscalYearMeta, pasesData: eintrachtfrankfurtDePasesData,
  resultadosData: eintrachtfrankfurtDeResultadosData, titulosData: eintrachtfrankfurtDeTitulosData,
  presupuestoOverlayByYear: eintrachtfrankfurtDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'eintrachtfrankfurt-de-konzernabschluss-2024': {
    id:'eintrachtfrankfurt-de-konzernabschluss-2024', clubId:'eintrachtfrankfurt-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024 (Unternehmensregister)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado vía unternehmensregister.de. Extracto de 34 págs.: Konzernlagebericht + Konzernbilanz + Konzern-GuV + Konzernanhang. Consolidado (Konzern) — es el total oficial de este club, no existe un balance individual paralelo. Transcripción completa en Clubes/Alemania/Eintracht Frankfurt/konzernabschluss-2023-24.md.',
  },
  'eintrachtfrankfurt-de-konzernabschluss-2025': {
    id:'eintrachtfrankfurt-de-konzernabschluss-2025', clubId:'eintrachtfrankfurt-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025 (Unternehmensregister)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado vía unternehmensregister.de. Extracto de 34 págs., mismo formato que el ejercicio 2023/24. Primer año con Jahresfehlbetrag (pérdida) desde que se carga este club. Transcripción completa en Clubes/Alemania/Eintracht Frankfurt/konzernabschluss-2024-25.md.',
  },
});

// gestionesByClub: Vorstandssprecher (vocero/CEO del Vorstand) Axel Hellmann firma el Lagebericht
// de los 2 ejercicios (sin cambio de conducción entre 2024 y 2025) — no se creó una gestión con su
// nombre porque una Aktiengesellschaft alemana no tiene el mismo concepto de "gestión" electa que
// Boca/River/Racing (el Vorstand es un directorio ejecutivo, no una presidencia por voto de socios;
// la entidad con socios/presidente es el Eintracht Frankfurt e.V. matriz, que NO es la que reporta
// este balance). Se usa 'actual' genérico, mismo criterio que Envigado/Once Caldas.
gestionesByClub['eintrachtfrankfurt-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['eintrachtfrankfurt-de'] = null;

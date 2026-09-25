// ============================================================================
// data/hamburgersv-de-data.js — Hamburger SV Fußball AG (Alemania, 2. Bundesliga).
// 2 ejercicios REALES (2023/24, 2024/25), Jahresabschluss INDIVIDUAL de la
// Fußball AG. Transcripciones en Clubes/Alemania/Hamburger SV/
// fussball-ag-jahresabschluss-<ejercicio>.md.
//
// QUÉ ENTIDAD SE CARGA — Hamburger SV tiene DOS documentos financieros
// distintos en la carpeta, y se decidió cargar la Fußball AG, no el e.V.:
//   - Hamburger Sport-Verein e.V. (ev-bilanz-*/ev-guv-*): el CLUB SOCIAL, sin
//     fines de lucro (Vereinskapital, no Aktienkapital). Bilanzsumme ~50,8M,
//     Umsatzerlöse ~10,7M (2023/24) — a todas luces NO es el negocio de fútbol
//     profesional (esas cifras son un orden de magnitud menor a lo que
//     factura un club de 2. Bundesliga).
//   - Hamburger SV Fußball AG (fussball-ag-jahresabschluss-*): la SOCIEDAD
//     ANÓNIMA a la que el e.V. le cedió la explotación del fútbol profesional
//     (el "ausgegliederter" modelo alemán, igual que Werder Bremen/Köln/
//     Hoffenheim ya cargados) — Umsatzerlöse ~123-127M, Bilanzsumme ~154-158M,
//     con Spielernutzungsrechte (derechos federativos) activados en su Anlage-
//     vermögen. Esta es la entidad que corresponde al "club de fútbol" tal
//     como lo entiende el resto de este sitio.
//   Se cargó la Fußball AG por ser la entidad conceptualmente equivalente a
//   todos los demás clubes del sitio (la sociedad que opera el equipo
//   profesional), siguiendo la instrucción explícita de la sesión. El e.V. NO
//   se cargó — queda sin usar en Clubes/Alemania/Hamburger SV/ev-*.md.
//
// ADVERTENCIA DE CALIDAD DE FUENTE — LA TABLA DE GuV DE AMBOS EJERCICIOS LLEGÓ
// MUY GARBLED por el proceso de conversión PDF→Markdown (dígitos y separadores
// de miles mezclados, filas con texto y números intercalados sin espacio,
// ej. "10.ErgebnisnachSteuem 0080[.......247327649"). La extracción se hizo
// CRUZANDO el "iii) Ertragslage" del Lagebericht (que SÍ transcribió limpio,
// en prosa, con cada componente de Umsatzerlöse/Materialaufwand/Personalaufwand
// /Abschreibungen/Finanzergebnis en TEUR) contra los pocos números limpios que
// sí sobrevivieron en la tabla garbled (Umsatzerlöse, Materialaufwand,
// Personalaufwand y Jahresüberschuss llegaron exactos al EUR; el resto se tomó
// del Lagebericht en TEUR, 3 decimales). El campo `tax` de cada año es un PLUG
// (Steuern vom Einkommen + sonstige Steuern combinados, sin poder separarlos:
// la fila de impuesto a las ganancias quedó ilegible en los 2 ejercicios —
// "862. rn 875 597" en 2024/25, "a 875. or, BE" en 2023/24) calculado por
// diferencia contra el Jahresüberschuss REAL impreso (el único ancla de
// precisión total: 2.146.705,69 EUR en 2023/24, 4.397.047,71 EUR en 2024/25),
// así que el tie-out revenue+expenses+netInterest+tax = officialPAT cierra
// EXACTO en los 2 años aunque el resto de las líneas tengan precisión TEUR
// (±1.000 EUR). grossDebt/cash NO se cargaron para ningún año: el Bilanz-
// Passiva/Aktiva de ambos ejercicios llegó igual de garbled y no se pudo
// reconstruir con confianza (mismo criterio que Werder Bremen, que tampoco
// carga estos 2 campos opcionales cuando la fuente no permite confirmarlos).
//
// REVENUE (Lagebericht "iii) Ertragslage" de cada año, TEUR): Spielbetrieb,
// Werbung, mediale Verwertungsrechte, Transferentschädigungen tienen categoría
// clara. "Merchandising und Catering" es UNA sola línea combinada en el
// documento (no separa las 2) → sponsorship_commercial completo (el propio
// texto narrativo indica que el merchandising —camisetas, colecciones propias—
// es el driver principal de la línea en los 2 años; el catering del estadio
// queda dentro sin partir, a diferencia de Köln que sí tenía a Catering como
// línea propia separable). "Sonstige Erlöse" (eventos de terceros, escuela de
// fútbol, upfront payment, EURO 2024/Taylor Swift en 2024/25) → other_income.
// La suma de las 6 líneas nombradas da 123.126 (2023/24, EXACTA, sin residual)
// y 126.523 (2024/25, vs. Umsatzerlöse impreso 126.521 — diferencia de TEUR2,
// ruido de redondeo TEUR entre 6 componentes, irrelevante). Sonstige
// betriebliche Erträge (línea aparte del P&L) → other_income.
//
// GASTOS: Materialaufwand ("exclusivamente Aufwendungen für bezogene Waren aus
// dem Bereich Merchandising") → other_expenses. Personalaufwand ("überwiegender
// Teil... Spielerkader und Trainerstab") → wages_squad completo, sin separar
// plantel de administración. Abschreibungen: el Lagebericht SÍ separa
// Spielernutzungsrechte (derechos federativos) de Sachanlagen → player_amortisation
// / depreciation. Sonstige betriebliche Aufwendungen: el Lagebericht da un
// desglose PARCIAL ("im Wesentlichen", no exhaustivo) de 4 componentes:
// "Aufwendungen aus dem Spielbetrieb" → match_organisation_expense (organización
// de partidos, mantenimiento de estadio); "Verwaltungsaufwendungen" →
// admin_general_expense; "Vermarktungsprovisionen" y "Transferaufwendungen" →
// other_expenses (comisiones comerciales/de intermediación de pases, mismo
// criterio que Racing no separa comisiones de compraventa dentro de "Compra de
// jugadores", club-data-mapping SKILL.md sección 13). El resto (no nombrado
// explícitamente) queda como línea residual other_expenses.
//
// MONEDA: EUR los 2 ejercicios, cierre 30/6. fxRef contra FX_CLOSE
// (EUR@2024-06-30, EUR@2025-06-30), ambas ya existían.
//
// LIGA: 2. Bundesliga los 2 ejercicios (documento: "sechsten Jahr in der 2.
// Bundesliga" en 2023/24; en 2024/25 confirma "DFL-Zentralvermarktung (2.
// Bundesliga)" y el ascenso a Bundesliga ocurre RECIÉN para la temporada
// 2025/26, fuera de los 2 ejercicios cargados). Cargado en
// data/club-leagues/de.js.
//
// gestionId: 'actual' — el documento no identifica un Vorstand/CEO único con
// nombre propio en el extracto transcripto (a diferencia de Hoffenheim/Köln
// donde sí aparecen los Geschäftsführer nombrados).
// ============================================================================

const hamburgersvDeRevenueLinesByYear = {
  2024: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:48.486000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:13.539000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus medialen Verwertungsrechten', normalizedCategory:'broadcasting', amountNative:21.539000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transferentschädigungen', normalizedCategory:'player_sales', amountNative:1.600000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Merchandising und Catering', normalizedCategory:'sponsorship_commercial', amountNative:19.553000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige Erlöse (Drittveranstaltungen, HSV-Fußballschule, Upfrontzahlung, EURO 2024)', normalizedCategory:'other_income', amountNative:18.409000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:2.793000, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:44.360000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:17.510000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus medialen Verwertungsrechten', normalizedCategory:'broadcasting', amountNative:18.482000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transferentschädigungen', normalizedCategory:'player_sales', amountNative:3.827000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Merchandising und Catering', normalizedCategory:'sponsorship_commercial', amountNative:23.753000, disclosureLevel:'detailed' },
    // Ajustada -0,002 respecto del TEUR 18.591 impreso en el Lagebericht para que la suma de las
    // 6 líneas nombradas cierre EXACTA contra el Umsatzerlöse total impreso (126.521) — ruido de
    // redondeo TEUR entre 6 componentes narrados por separado, documentado acá.
    { rawLabel:'Sonstige Erlöse (Drittveranstaltungen, HSV-Fußballschule, Upfrontzahlung, EURO 2024/Taylor Swift)', normalizedCategory:'other_income', amountNative:18.589000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:2.525000, disclosureLevel:'detailed' },
  ],
};

const hamburgersvDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren, Bereich Merchandising)', normalizedCategory:'other_expenses', amountNative:-6.624000, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-44.311000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Spielernutzungsrechte', normalizedCategory:'player_amortisation', amountNative:-4.628000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.487000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Aufwendungen aus dem Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-30.114000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Verwaltungsaufwendungen', normalizedCategory:'admin_general_expense', amountNative:-6.327000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Vermarktungsprovisionen', normalizedCategory:'other_expenses', amountNative:-5.698000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Transferaufwendungen', normalizedCategory:'other_expenses', amountNative:-1.679000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen (resto, sin desglose adicional en el documento)', normalizedCategory:'other_expenses', amountNative:-18.198000, disclosureLevel:'aggregated_residual' },
  ],
  2025: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren, Bereich Merchandising)', normalizedCategory:'other_expenses', amountNative:-8.922000, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-46.816000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Spielernutzungsrechte', normalizedCategory:'player_amortisation', amountNative:-6.341000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.857000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Aufwendungen aus dem Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-23.862000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Verwaltungsaufwendungen', normalizedCategory:'admin_general_expense', amountNative:-5.999000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Vermarktungsprovisionen', normalizedCategory:'other_expenses', amountNative:-6.588000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Transferaufwendungen', normalizedCategory:'other_expenses', amountNative:-2.325000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen (resto, sin desglose adicional en el documento)', normalizedCategory:'other_expenses', amountNative:-18.589000, disclosureLevel:'aggregated_residual' },
  ],
};

const hamburgersvDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'hamburgersv-de-fussball-ag-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Finanzergebnis (Lagebericht, TEUR): -1.505.
    netInterest:-1.505000,
    // tax = PLUG: officialPAT - revenue - expenses - netInterest (ver comentario de cabecera,
    // la fila de impuesto a las ganancias quedó ilegible en la transcripción de ambos ejercicios).
    tax:-1.201294,
    profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:125.919000, officialTotalExpenses:121.066000,
    // officialPAT = Jahresüberschuss impreso EXACTO (2.146.705,69 EUR), el único número de este
    // ejercicio que llegó sin ambigüedad en la tabla garbled.
    officialPAT:2.146706,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'hamburgersv-de-fussball-ag-jahresabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1.110000,
    tax:-0.239952,
    profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:129.046000, officialTotalExpenses:123.299000,
    // officialPAT = Jahresüberschuss impreso EXACTO (4.397.047,71 EUR).
    officialPAT:4.397048,
  },
};

const hamburgersvDePresupuestoOverlayByYear = {};
const hamburgersvDePasesData = [];
const hamburgersvDeResultadosData = {};
const hamburgersvDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['hamburgersv-de'] = {
  revenueLinesByYear: hamburgersvDeRevenueLinesByYear, expenseLinesByYear: hamburgersvDeExpenseLinesByYear,
  fiscalYearMeta: hamburgersvDeFiscalYearMeta, pasesData: hamburgersvDePasesData,
  resultadosData: hamburgersvDeResultadosData, titulosData: hamburgersvDeTitulosData,
  presupuestoOverlayByYear: hamburgersvDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'hamburgersv-de-fussball-ag-jahresabschluss-2024': {
    id:'hamburgersv-de-fussball-ag-jahresabschluss-2024', clubId:'hamburgersv-de',
    title:'Jahresabschluss der Hamburger SV Fußball AG zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la Fußball AG (la sociedad que opera el fútbol profesional, distinta del Hamburger Sport-Verein e.V., club social — ver comentario de cabecera de hamburgersv-de-data.js). Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Hamburger SV/fussball-ag-jahresabschluss-2023-24.md. La tabla de GuV/Bilanz llegó muy garbled en la conversión PDF→Markdown; los datos se reconstruyeron cruzando el Lagebericht ("iii) Ertragslage"), que transcribió limpio en prosa.',
  },
  'hamburgersv-de-fussball-ag-jahresabschluss-2025': {
    id:'hamburgersv-de-fussball-ag-jahresabschluss-2025', clubId:'hamburgersv-de',
    title:'Jahresabschluss der HSV Fußball AG & Co. KGaA zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la entidad que opera el fútbol profesional — cambió de forma jurídica de "Fußball AG" a "Fußball AG & Co. KGaA" durante este ejercicio, el documento ya la nombra con la forma nueva. Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Hamburger SV/fussball-ag-jahresabschluss-2024-25.md. Mismo problema de tabla garbled que el ejercicio 2023/24.',
  },
});

gestionesByClub['hamburgersv-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['hamburgersv-de'] = null;

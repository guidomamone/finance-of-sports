// ============================================================================
// data/dortmund-de-data.js — Borussia Dortmund GmbH & Co. KGaA (Alemania, Bundesliga).
//
// 2 ejercicios REALES (2023/24, 2024/25), fuente: el Annual Report (Geschäftsbericht) oficial del
// club, en INGLÉS (BVB lo publica bilingüe/solo en inglés para el inversor internacional — BVB
// cotiza en bolsa, Frankfurt Stock Exchange). Incluye tanto las "ANNUAL FINANCIAL STATEMENTS"
// (HGB, entidad KGaA standalone, auditadas por EY) como los "CONSOLIDATED FINANCIAL STATEMENTS"
// (IFRS, Grupo). Transcripciones completas en Clubes/Alemania/Borussia Dortmund/
// geschaeftsbericht-<ejercicio>.md (contienen ambos ejercicios como comparativo, ya que el reporte
// de 2024/25 imprime 2023/24 en su columna comparativa completa — se usó esa columna para 2023/24
// en vez de abrir el reporte de 2023/24 aparte, válido porque son cuentas HGB nominales en EUR, sin
// reexpresión por inflación entre ejercicios — ver club-data-mapping SKILL.md sección 6.5, esa regla
// aplica a RT6/moneda homogénea argentina, no a HGB alemán).
//
// NIVEL DE CUENTAS ELEGIDO: HGB KGaA standalone ("ANNUAL FINANCIAL STATEMENTS"), NO el IFRS Group
// consolidado — mismo criterio que el resto de los clubes alemanes ya cargados (Köln, Eintracht
// Frankfurt, Werder Bremen, Augsburg, todos HGB). El reporte de BVB da AMBOS niveles con desglose
// completo (a diferencia de Bayern Munich, que solo desglosa el Einzelabschluss), así que se eligió
// HGB por consistencia con el resto del país, no por falta de alternativa. officialTotalRevenue/
// Expenses/PAT son los de la KGaA HGB (528,663 / 562,410 miles € de "Sales", no los 526,019 / 509,110
// del "Consolidated revenue" IFRS del Grupo — cifras DISTINTAS a propósito, ver el propio reporte).
//
// Ingresos ("Sales" nota, ANNUAL FINANCIAL STATEMENTS, pág. 215-216 del reporte 2024/25): Match
// operations (matchday_competition), Advertising (sponsorship_commercial), TV marketing
// (broadcasting), Transfer deals (player_sales, INGRESO bruto de transferencias — ver sección 3 de
// club-data-mapping, BVB no netea, reporta el ingreso bruto de "Transfer deals" separado del gasto
// "Transfer deals" del lado de gastos), Conference/catering/miscellaneous (other_income). Más
// "Other operating income" (other_income), línea de P&L separada de "Sales" (ver GuV completa,
// pág. 201). officialTotalRevenue = Sales + Other operating income (mismo criterio que Werder
// Bremen: "Sonstige betriebliche Erträge" SÍ cuenta como revenue).
//
// Gastos: Personnel expenses (nota por segmento, pág. 217): Match operations=plantel profesional
// (wages_squad), Retail and administration (admin_general_expense), Amateur and youth football
// (youth_other_sports_expense) — separación POR SEGMENTO disponible en la fuente, mismo patrón que
// Vélez Sarsfield (club-data-mapping sección 14). Amortisation/depreciation (pág. 217-218): la
// porción de "player registrations" (amortización + write-downs) es player_amortisation, el resto
// (tangible fixed assets) es depreciation. Other operating expenses (nota, pág. 218): Match
// operations (match_organisation_expense), Advertising (admin_general_expense, costo comercial/
// agencia, no organización de partidos), Transfer deals (player_amortisation, GASTO bruto de
// transferencias — comisiones + carrying amounts de jugadores vendidos, sin netear contra el
// ingreso, mismo criterio de "reflejá como lo presenta el club" de la sección 3 del skill), Retail
// (admin_general_expense), Administration (admin_general_expense), Other (other_expenses).
//
// netInterest/tax: el "Financial result" del HGB (pág. 219-220) es la suma de 3 líneas de P&L
// consecutivas — "Income from profit and loss transfer agreements" (ganancias de subsidiarias con
// Ergebnisabführungsvertrag: BVB Stadionmanagement, besttravel Dortmund, BVB Merchandising, BVB
// Event & Catering, BVB Fußballakademie), "Other interest and similar income" y "Interest and
// similar expenses" — las 3 forman el Finanzergebnis en la estructura HGB estándar (§275 HGB),
// mismo criterio de club-data-mapping sección 2 (resultado financiero, nunca una línea de
// revenue/expense) — van juntas a netInterest, NO como revenueLine, aunque la primera técnicamente
// sea "ingreso" de subsidiarias, porque el documento la ubica en la sección de resultado financiero,
// no en Sales/Other operating income. tax = Taxes on income + Other taxes (2 líneas separadas del
// GuV, sumadas). El total (revenue+expenses+netInterest+tax) cierra EXACTO contra "Net income for
// the year" impreso, sin redondeo — ver club-data-mapping SKILL.md sección 6.2.
//
// Moneda: EUR. Ningún ejercicio declara TC propio a USD → fxRef contra FX_CLOSE
// (data/currency-map.js): 'EUR@2024-06-30' y 'EUR@2025-06-30' YA EXISTEN.
//
// gestionId: 'actual' en los 2 ejercicios — Hans-Joachim Watzke es Chairman de la Geschäftsführung
// (management board del general partner) en los 2, sin cambio.
// ============================================================================

const dortmundDeRevenueLinesByYear = {
  // Ejercicio 2024 (01.07.2023-30.06.2024). Fuente: geschaeftsbericht-2024-25.md, columna comparativa
  // "2023/2024" de la nota "Sales" (pág. 215) y de "Other operating income" (pág. 216).
  2024: [
    { rawLabel:'Match operations', normalizedCategory:'matchday_competition', amountNative:52.582, disclosureLevel:'detailed' },
    { rawLabel:'Advertising', normalizedCategory:'sponsorship_commercial', amountNative:146.609, disclosureLevel:'detailed' },
    { rawLabel:'TV marketing', normalizedCategory:'broadcasting', amountNative:206.050, disclosureLevel:'detailed' },
    { rawLabel:'Transfer deals', normalizedCategory:'player_sales', amountNative:129.678, disclosureLevel:'detailed' },
    { rawLabel:'Conference, catering, miscellaneous', normalizedCategory:'other_income', amountNative:27.492, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:9.498, disclosureLevel:'aggregated_residual' },
  ],
  // Ejercicio 2025 (01.07.2024-30.06.2025). Fuente: geschaeftsbericht-2024-25.md, pág. 215-216 (año corriente).
  2025: [
    { rawLabel:'Match operations', normalizedCategory:'matchday_competition', amountNative:55.221, disclosureLevel:'detailed' },
    { rawLabel:'Advertising', normalizedCategory:'sponsorship_commercial', amountNative:153.557, disclosureLevel:'detailed' },
    { rawLabel:'TV marketing', normalizedCategory:'broadcasting', amountNative:227.200, disclosureLevel:'detailed' },
    { rawLabel:'Transfer deals', normalizedCategory:'player_sales', amountNative:71.223, disclosureLevel:'detailed' },
    { rawLabel:'Conference, catering, miscellaneous', normalizedCategory:'other_income', amountNative:21.462, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:6.831, disclosureLevel:'aggregated_residual' },
  ],
};

const dortmundDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Personnel expenses — Match operations (professional squad)', normalizedCategory:'wages_squad', amountNative:-208.191, disclosureLevel:'detailed' },
    { rawLabel:'Personnel expenses — Retail and administration', normalizedCategory:'admin_general_expense', amountNative:-26.426, disclosureLevel:'detailed' },
    { rawLabel:'Personnel expenses — Amateur and youth football', normalizedCategory:'youth_other_sports_expense', amountNative:-16.133, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangible fixed assets — player registrations (incl. write-downs)', normalizedCategory:'player_amortisation', amountNative:-91.025, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-10.188, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Match operations', normalizedCategory:'match_organisation_expense', amountNative:-74.633, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Advertising', normalizedCategory:'admin_general_expense', amountNative:-14.275, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Transfer deals', normalizedCategory:'player_amortisation', amountNative:-39.754, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Retail', normalizedCategory:'admin_general_expense', amountNative:-2.248, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Administration', normalizedCategory:'admin_general_expense', amountNative:-54.032, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Other', normalizedCategory:'other_expenses', amountNative:-7.084, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Personnel expenses — Match operations (professional squad)', normalizedCategory:'wages_squad', amountNative:-201.171, disclosureLevel:'detailed' },
    { rawLabel:'Personnel expenses — Retail and administration', normalizedCategory:'admin_general_expense', amountNative:-32.909, disclosureLevel:'detailed' },
    { rawLabel:'Personnel expenses — Amateur and youth football', normalizedCategory:'youth_other_sports_expense', amountNative:-14.707, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangible fixed assets — player registrations (incl. write-downs)', normalizedCategory:'player_amortisation', amountNative:-90.759, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-10.670, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Match operations', normalizedCategory:'match_organisation_expense', amountNative:-77.185, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Advertising', normalizedCategory:'admin_general_expense', amountNative:-15.808, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Transfer deals', normalizedCategory:'player_amortisation', amountNative:-31.662, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Retail', normalizedCategory:'admin_general_expense', amountNative:-1.859, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Administration', normalizedCategory:'admin_general_expense', amountNative:-51.157, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses — Other', normalizedCategory:'other_expenses', amountNative:-8.970, disclosureLevel:'detailed' },
  ],
};

const dortmundDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'dortmund-de-geschaeftsbericht-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Financial result HGB = Income from p&l transfer agreements (17.570) + Other interest income
    // (2.686) - Interest expenses (5.756) = 14.500. tax = Taxes on income (-4.319) + Other taxes (-0.243).
    netInterest:14.500, tax:-4.562, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:571.908, officialTotalExpenses:543.991, officialPAT:37.857,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'dortmund-de-geschaeftsbericht-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Financial result = 14.334 + 1.974 - 3.954 = 12.354 (documento redondea a 12.355). tax = -2.929 - 0.410.
    netInterest:12.355, tax:-3.339, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:535.495, officialTotalExpenses:536.857, officialPAT:7.653,
  },
};

const dortmundDePresupuestoOverlayByYear = {};
const dortmundDePasesData = [];
const dortmundDeResultadosData = {};
const dortmundDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['dortmund-de'] = {
  revenueLinesByYear: dortmundDeRevenueLinesByYear, expenseLinesByYear: dortmundDeExpenseLinesByYear,
  fiscalYearMeta: dortmundDeFiscalYearMeta, pasesData: dortmundDePasesData,
  resultadosData: dortmundDeResultadosData, titulosData: dortmundDeTitulosData,
  presupuestoOverlayByYear: dortmundDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'dortmund-de-geschaeftsbericht-2024': {
    id:'dortmund-de-geschaeftsbericht-2024', clubId:'dortmund-de',
    title:'Annual Report 2023/2024 (Geschäftsbericht) — Annual Financial Statements (HGB) of Borussia Dortmund GmbH & Co. KGaA',
    type:'official_balance_sheet', reliability:'primary',
    note:'Reporte anual oficial de BVB (cotiza en la Bolsa de Frankfurt), en inglés, auditado por EY GmbH & Co. KG. Cifras de este ejercicio tomadas de la columna comparativa "2023/2024" del reporte 2024/2025 (mismo documento fuente, ver comentario de cabecera de dortmund-de-data.js). Transcripción completa en Clubes/Alemania/Borussia Dortmund/geschaeftsbericht-2024-25.md (244 páginas).',
  },
  'dortmund-de-geschaeftsbericht-2025': {
    id:'dortmund-de-geschaeftsbericht-2025', clubId:'dortmund-de',
    title:'Annual Report 2024/2025 (Geschäftsbericht) — Annual Financial Statements (HGB) of Borussia Dortmund GmbH & Co. KGaA',
    type:'official_balance_sheet', reliability:'primary',
    note:'Reporte anual oficial de BVB, en inglés, auditado por EY GmbH & Co. KG. Transcripción completa en Clubes/Alemania/Borussia Dortmund/geschaeftsbericht-2024-25.md (244 páginas).',
  },
});

gestionesByClub['dortmund-de'] = {
  actual: { nombre:'Gestión actual (Hans-Joachim Watzke, Chairman de la Geschäftsführung)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['dortmund-de'] = null;

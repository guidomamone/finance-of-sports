// ============================================================================
// data/nottinghamforest-gb-data.js — Nottingham Forest Football Club Limited (clubId
// 'nottinghamforest-gb'), Ejercicios 2023/24 y 2024/25 (1° de julio a 30 de junio, confirmado en la
// carátula de los dos documentos: "FOR THE YEAR ENDED 30 JUNE 2024"/"...2025").
//
// ENTIDAD LEGAL: "Nottingham Forest Football Club Limited", Company Registration No. 01630402
// (Companies House, UK). Cuentas INDIVIDUALES de la compañía (no consolidadas: el documento dice
// "financial statements of Nottingham Forest Football Club Limited", no "Group"), aunque el club
// tiene 2 subsidiarias (Nottingham Forest Women's Football Club Limited, Nottingham Forest Netball
// Club Limited) cuyo resultado NO se consolida en estas cifras — mismo criterio de alcance que
// Getafe/Everton (cuentas tal cual las presenta el documento, no una reconstrucción propia).
//
// Fuente: transcripciones completas en Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-
// 2023-24.md y -2024-25.md.
//
// Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). GBP ya existe
// en data/currency-map.js (agregado en la sesión de Arsenal/Everton/Tottenham). Los 2 ejercicios
// usan `fxRef` ('GBP@2024-06-30'/'GBP@2025-06-30', ya en FX_CLOSE) porque ninguno de los 2
// documentos declara un tipo de cambio propio a USD (no tienen Nota de moneda extranjera: el club
// opera 100% en libras).
//
// ----------------------------------------------------------------------------------------------
// CATEGORIZACIÓN DE INGRESOS (Nota 3 "Turnover analysed by class of business", 5 líneas los 2
// ejercicios, + "Profit on disposal of player registrations" como línea NETA separada debajo de
// "Operating loss" en el Statement of comprehensive income):
//   - "Gate receipts" -> matchday_competition.
//   - "Media related activity" -> broadcasting.
//   - "Merchandising" -> sponsorship_commercial (mismo criterio que Everton, que combina
//     merchandising con sponsorship en un único bucket).
//   - "Other commercial" -> sponsorship_commercial: a diferencia de "Other commercial activities"
//     de Everton (que el propio documento definía como "hospitality, catering, events" y por eso
//     fue a other_income), acá el rótulo dice explícitamente "commercial" y la política contable de
//     Turnover (Nota 1.3) agrupa bajo el mismo párrafo "sponsorship and advertising receipts" y
//     "conferencing and event receipts" como los componentes de este rubro — se interpretó como la
//     porción comercial/sponsorship que el documento no desglosa más, no como hospitalidad genérica.
//   - "Loan fees received" -> player_sales (fees de préstamos de jugadores recibidos, mismo
//     criterio que "Player trading" de Arsenal: "Player trading consists primarily of loan fees
//     receivable").
//   - "Profit on disposal of player registrations": línea NETA, debajo de "Operating loss", antes
//     de impuestos (misma posición que Everton/Arsenal) -> revenueLine con player_sales, NO
//     fiscalYearMeta.profitOnPlayerSales (que queda en 0 para no duplicar).
//
// CATEGORIZACIÓN DE GASTOS: el Income Statement de Forest NO desglosa "Cost of sales"/
// "Administrative expenses" por naturaleza del gasto más allá de lo que la Nota 7 "Operating loss"
// (stated after charging/crediting) revela: Staff costs (Nota 5, agregado único sin desglose por
// plantel/resto — mismo gotcha que Arsenal/Everton, ningún club inglés cargado hasta ahora separa
// costo salarial por departamento), Amortisation of player registrations, Impairment of player
// registrations (solo 2025), Depreciation. El resto de "Cost of sales" + "Administrative expenses"
// (que incluye exchange gains/losses y loss/profit en venta de activos tangibles, ambos inmateriales
// y ya "stated after charging" dentro de Administrative expenses, no como línea aparte) se cargó
// como UNA línea residual `other_expenses` — mismo criterio que "Other operating costs" de Everton,
// acá sin nombre propio en el documento porque Forest no lo desglosa ni siquiera a ese nivel.
//   - "Staff costs" -> wages_squad (total agregado, plantel + resto del personal).
//   - "Amortisation of player registrations" -> player_amortisation.
//   - "Impairment of player registrations" (solo 2025, Nota 7/10) -> player_impairment.
//   - "Depreciation of owned tangible fixed assets" -> depreciation.
//   - Residual (Cost of sales + Administrative expenses − Staff costs − Amortisation − Impairment −
//     Depreciation) -> other_expenses, rotulado explicando que es residual.
//
// "netInterest" = Interest receivable (Nota 8) − Interest payable (Nota 9). "tax" = 0 los 2 años
// (ninguna de las 2 tuvo cargo impositivo, ver Nota 11/12). "assetSales"/"profitOnPlayerSales" = 0
// (el profit on disposal ya está en revenueLines; el loss/profit en venta de activos TANGIBLES es
// inmaterial —£66k/£10k— y queda embebido en el residual "other_expenses", no se separó aparte).
//
// GROSSDEBT: se usó el criterio de Everton/Arsenal (deuda financiera real: bancos + facilities de
// descuento de pases + "Other loans", EXCLUYENDO "Amounts payable in respect of player transfers"
// —deuda comercial por compra de pases, no deuda financiera— y "Amounts due to group undertakings"
// —financiamiento intra-grupo, tratado aparte igual que en el criterio ya usado para Sunderland).
//   2024: Bank overdrafts+Other loans dentro de 1 año (Nota 18: 11.492+8.358=19.850) + Other loans
//     después de 1 año (Nota 20: 75.997) = 95.847.
//   2025: Bank loans and overdrafts+Other borrowings dentro de 1 año (Nota 21/19: 0.044+59.616=
//     59.660) + Other loans después de 1 año (Nota 20: 86.825) = 146.485.
// cash = "Cash at bank and in hand" del balance (0.029 en 2024, 13.224 en 2025).
//
// VERIFICACIÓN (a mano, contra los totales impresos):
//   2024: revenueLines suman 290.083 = officialTotalRevenue (Turnover 189.552 + Profit on disposal
//     100.531). expenses(wages+other_expenses) + nonCash(amortisation+depreciation) = -199.963 +
//     (-62.844) = -262.807 = officialTotalExpenses EXACTO (Cost of sales 12.643 + Administrative
//     expenses 250.164 impreso). + netInterest (-15.177) = 12.099 = officialPAT EXACTO ("Profit for
//     the financial year" impreso).
//   2025: revenueLines suman 228.763 = officialTotalRevenue (Turnover 221.746 + Profit on disposal
//     7.017). expenses+nonCash = -210.574 + (-76.099) = -286.673 = officialTotalExpenses EXACTO
//     (Cost of sales 15.224 + Administrative expenses 271.449 impreso). + netInterest (-21.011) =
//     -78.921 = officialPAT EXACTO ("(Loss) for the financial year" impreso).
// Los dos cierran EXACTOS, sin residuo.
// ============================================================================

const nottinghamforestGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:14.408, disclosureLevel:'detailed' },
    { rawLabel:'Media related activity', normalizedCategory:'broadcasting', amountNative:130.019, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:8.550, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial', normalizedCategory:'sponsorship_commercial', amountNative:21.088, disclosureLevel:'detailed' },
    { rawLabel:'Loan fees received', normalizedCategory:'player_sales', amountNative:15.487, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:100.531, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:20.251, disclosureLevel:'detailed' },
    { rawLabel:'Media related activity', normalizedCategory:'broadcasting', amountNative:158.600, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:10.090, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial', normalizedCategory:'sponsorship_commercial', amountNative:28.421, disclosureLevel:'detailed' },
    { rawLabel:'Loan fees received', normalizedCategory:'player_sales', amountNative:4.384, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:7.017, disclosureLevel:'detailed' },
  ],
};

const nottinghamforestGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-166.399, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-61.685, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of owned tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.159, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Administrative expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-33.564, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-166.651, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-68.883, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of player registrations', normalizedCategory:'player_impairment', amountNative:-5.322, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of owned tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.894, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Administrative expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-43.923, disclosureLevel:'aggregated' },
  ],
};

const nottinghamforestGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'nottinghamforest-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'marinakis',
    grossDebt:95.847, cash:0.029,
    profitOnPlayerSales:0, assetSales:0, netInterest:-15.177, tax:0,
    officialTotalRevenue:290.083, officialTotalExpenses:262.807, officialPAT:12.099,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'nottinghamforest-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'marinakis',
    grossDebt:146.485, cash:13.224,
    profitOnPlayerSales:0, assetSales:0, netInterest:-21.011, tax:0,
    officialTotalRevenue:228.763, officialTotalExpenses:286.673, officialPAT:-78.921,
  },
};

const nottinghamforestGbPresupuestoOverlayByYear = {};

const nottinghamforestGbPasesData = [];
const nottinghamforestGbResultadosData = {};
const nottinghamforestGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['nottinghamforest-gb'] = {
  revenueLinesByYear: nottinghamforestGbRevenueLinesByYear, expenseLinesByYear: nottinghamforestGbExpenseLinesByYear,
  fiscalYearMeta: nottinghamforestGbFiscalYearMeta, pasesData: nottinghamforestGbPasesData,
  resultadosData: nottinghamforestGbResultadosData, titulosData: nottinghamforestGbTitulosData,
  presupuestoOverlayByYear: nottinghamforestGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'nottinghamforest-gb-full-accounts-2024': {
    id:'nottinghamforest-gb-full-accounts-2024', clubId:'nottinghamforest-gb',
    title:'Nottingham Forest Football Club Limited — Annual Report and Financial Statements, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01630402/filing-history',
    publicNote:'Cuentas individuales auditadas (Azets Audit Services, sin salvedades) de Nottingham Forest Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24, 2ª temporada de retorno a la Premier League).',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2023-24.md. Cuentas individuales de la compañía, no consolidadas con Nottingham Forest Women\'s FC Limited ni Nottingham Forest Netball Club Limited. No declara tipo de cambio propio (fxRef apunta a FX_CLOSE).',
  },
  'nottinghamforest-gb-full-accounts-2025': {
    id:'nottinghamforest-gb-full-accounts-2025', clubId:'nottinghamforest-gb',
    title:'Nottingham Forest Football Club Limited — Annual Report and Financial Statements, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01630402/filing-history',
    publicNote:'Cuentas individuales auditadas (Azets Audit Services, sin salvedades) de Nottingham Forest Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25).',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.md. Mismo criterio de categorización que el ejercicio 2024.',
  },
});

// gestionId 'marinakis': los 2 ejercicios cargados confirman a Mr E Marinakis (80%, vía NF Football
// Investments Limited) como controlante último en los 2 Strategic Reports, sin cambio entre 2024 y
// 2025.
gestionesByClub['nottinghamforest-gb'] = { marinakis: { nombre:'Marinakis / NF Football Investments', firstYear:2024, lastYear:2025 } };

memberCountByClub['nottinghamforest-gb'] = null;

// ============================================================================
// data/brighton-gb-data.js — The Brighton and Hove Albion Football Club Limited (clubId
// 'brighton-gb'), Ejercicios 2023/24 y 2024/25 (1° de julio a 30 de junio, confirmado en la
// carátula de los dos documentos: "Year Ended 30 June 2024"/"for the Year Ended 30 June 2025").
//
// ENTIDAD LEGAL: "The Brighton and Hove Albion Football Club Limited", Company Number 00081077
// (Companies House, UK). Cuentas INDIVIDUALES de la compañía (no consolidadas: el documento dice
// "financial statements of The Brighton and Hove Albion Football Club Limited", no "Group"),
// aunque el club tiene subsidiarias hermanas bajo la misma matriz (Brighton & Hove Albion Women's
// Football Club Limited, The Community Stadium Limited) cuyo resultado NO se consolida en estas
// cifras — mismo criterio de alcance que Forest/Sunderland/Everton (cuentas tal cual las presenta
// el documento, no una reconstrucción propia). El controlante último es A(lexander) Bloom
// ("Tony" Bloom), vía Brighton & Hove Albion Holdings Limited (99.98% de las acciones), sin cambio
// entre los 2 ejercicios.
//
// Fuente: transcripciones completas en "Clubes/Inglaterra/Brighton & Hove Albion/brighton-full-
// accounts-2023-24.md" y "-2024-25.md".
//
// Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). GBP ya existe
// en data/currency-map.js. Los 2 ejercicios usan `fxRef` ('GBP@2024-06-30'/'GBP@2025-06-30', ya en
// FX_CLOSE, agregadas en la sesión de Arsenal/Everton/Tottenham) porque ninguno de los 2 documentos
// declara un tipo de cambio propio a USD (no tienen Nota de moneda extranjera: el club opera 100%
// en libras, "All turnover arose within/in the United Kingdom").
//
// ----------------------------------------------------------------------------------------------
// RESTATEMENT DE 2024, NO APLICADO ACÁ A PROPÓSITO: el documento de 2024/25 (Nota 27) restablece
// (restates) el ejercicio 2024 por un error: no se había reconocido un activo por impuesto diferido
// de £22.897k por pérdidas históricas, lo que en la columna comparativa "2024 (As restated)" del
// documento de 2025 sube el resultado neto de 2024 de £56.065k (como se filed originalmente) a
// £73.369k. Este ejercicio se carga con las cifras TAL CUAL las declaró su PROPIO documento
// (brighton-full-accounts-2023-24.md, aprobado 19/12/2024, el que realmente se depositó en
// Companies House para ese ejercicio), no con la versión restated que aparece recién como
// comparativo del documento del año siguiente — mismo criterio de "cada ejercicio usa el documento
// cuyo año corriente es ESE año" que ya rige para las reexpresiones por inflación (ver
// club-data-mapping sección 6.5). La corrección NO toca Turnover/Operating expenses/Player
// trading/Interest (son idénticos en las 2 versiones), solo el impuesto diferido y por lo tanto el
// resultado neto — quedó anotado como pregunta genuina en Admin/dudas-por-club.md (¿reflejar la
// cifra restated en vez de la originalmente depositada?).
//
// CATEGORIZACIÓN DE INGRESOS (Nota "Turnover" — Matchday/Broadcasting/Commercial/Other, los 2
// ejercicios — + "Other operating income" como línea separada del P&L, + "Profit on disposal of
// players' registrations" como línea NETA bruta de ganancia por venta, separada de la amortización/
// deterioro que se carga del lado de Gastos):
//   - "Matchday" -> matchday_competition.
//   - "Broadcasting" -> broadcasting.
//   - "Commercial" -> sponsorship_commercial.
//   - "Other" (dentro de Turnover, Nota 3: fee income de jugadores cedidos a préstamo + generación
//     de ingresos de pretemporada) -> other_income.
//   - "Other operating income" (línea de P&L separada de Turnover, Nota 4: "Other income", más
//     "Compensation received" solo en el comparativo 2023) -> other_income. Es una línea DISTINTA
//     de "Other" de Turnover (una nota separada, un renglón separado en el Statement of
//     comprehensive income), se preserva separada en vez de fusionarla, mismo criterio de no perder
//     trazabilidad de club-data-mapping sección 4.
//   - "Profit on disposal of players' registrations": el P&L muestra esta cifra en la columna
//     "Player trading" (£110.295m en 2024, £56.911m en 2025) es la ganancia BRUTA por venta de
//     pases (Nota de Intangible assets: coincide exacto con la suma "cost - net book value" de las
//     disposals del año) — NO neta de amortización/deterioro, esos 2 conceptos se cargan aparte del
//     lado de Gastos (ver abajo), igual que Everton/Forest. Va a revenueLines con player_sales, NO a
//     fiscalYearMeta.profitOnPlayerSales (que queda en 0 para no duplicar).
//
// CATEGORIZACIÓN DE GASTOS: el Income Statement de Brighton tampoco desglosa "Cost of sales" (coste
// de reventa de mercadería/retail) ni el resto de "Operating expenses" por naturaleza más allá de lo
// que revela la Nota "Operating profit"/"Operating (loss)/profit" (arrived at after charging) + la
// Nota "Employees"/"Staff costs" + la Nota "Intangible assets" (amortisation/impairment de pases):
//   - "Staff costs" (Wages and salaries + Social security costs + Pension costs, agregado único sin
//     desglose por plantel/resto — mismo gotcha que el resto de los clubes ingleses cargados, ninguno
//     separa costo salarial por departamento) -> wages_squad.
//   - "Amortisation of players' registrations" (Nota "Intangible assets") -> player_amortisation.
//   - "Impairment of players' registrations" (Nota "Intangible assets"; £2.784m en 2024, £Nil en
//     2025 — sin línea en 2025 porque el propio documento dice "£Nil") -> player_impairment.
//   - "Depreciation" (tangible fixed assets) -> depreciation.
//   - Residual (Cost of sales + el resto de "Operating expenses" no capturado en las 4 líneas de
//     arriba: Staff costs, Depreciation, y — solo en la columna "excluding player trading" — el
//     resto de costos operativos/administrativos que el documento no nombra individualmente) ->
//     other_expenses, rotulado explicando que es residual — mismo criterio que Forest/Sunderland
//     ("Otros costos operativos"), acá sin nombre propio en el documento porque Brighton tampoco lo
//     desglosa a ese nivel. Cálculo: Operating expenses "excluding player trading" − Staff costs −
//     Depreciation, más Cost of sales (que es una línea del P&L totalmente aparte de "Operating
//     expenses", pero sin nota propia): 2024 = (200.518 − 142.235 − 1.397) + 6.681 = 63.567; 2025 =
//     (225.814 − 158.679 − 1.410) + 6.625 = 72.350.
//
// "netInterest" = Interest receivable and similar income (Nota) − Interest payable and similar
// charges (Nota), sumando las 2 columnas del P&L (operaciones excluyendo player trading + player
// trading: los 2 años reportan "unwinding of discount" sobre transfer fees a cobrar/pagar dentro de
// esas mismas notas, sin separarlo). "tax" = tax on profit/(loss) TAL CUAL impreso en el documento
// de CADA ejercicio (−£32.192m en 2024 según su propio documento, sin el restatement — ver nota de
// arriba; +£3.400m de crédito impositivo en 2025). "assetSales"/"profitOnPlayerSales" (meta) = 0 los
// 2 años (el profit on disposal ya está en revenueLines, y no hay venta de activos tangibles
// separada del resto de "Operating expenses"/"Tangible assets" en ninguno de los 2 documentos).
//
// GROSSDEBT: Brighton NO tiene deuda bancaria (no aparece ninguna línea de "Bank loans"/
// "Borrowings" con saldo distinto de cero en ninguno de los 2 balances — el propio Strategic Report
// lo dice explícito: "funding for the company continues to be provided by its Chairman, Tony Bloom,
// by way of interest free loans and equity conversion"). Se usó "Amounts owed to group
// undertakings"/"Amounts due to related parties" (Creditors: amounts falling due within one year) —
// el préstamo intragrupo del accionista, la única fuente real de financiamiento del club, descripta
// explícitamente como tal en el propio documento — EXCLUYENDO "Transfer payables"/"Transfers
// payable" (deuda comercial por compra de pases, no deuda financiera, mismo criterio que Forest
// excluye "Amounts payable in respect of player transfers") y el resto de creditors ordinarios
// (trade creditors, impuestos, accruals). 2024: 229.200 (Nota "Creditors: amounts falling due within
// one year", "Amounts owed to group undertakings"). 2025: 336.069 (Nota 17, "Amounts due to related
// parties"). cash = "Cash at bank and in hand" del balance (14.966 en 2024, 39.836 en 2025).
//
// VERIFICACIÓN (a mano, contra los totales impresos de CADA documento):
//   2024: revenueLines suman 334.038 = officialTotalRevenue (Turnover 221.293 + Other operating
//     income 2.450 + Profit on disposal 110.295). expenses(wages+other_expenses) + nonCash
//     (amortisation+impairment+depreciation) = -205.802 + (-43.523) = -249.325 =
//     officialTotalExpenses EXACTO (Cost of sales 6.681 + Operating expenses 242.644 impreso, suma
//     242.644+6.681=249.325). Ese resultado (84.713) coincide EXACTO con "Operating profit before
//     interest and taxation" impreso. + netInterest (7.289-3.745=3.544) = 88.257 = "Profit before
//     taxation" impreso EXACTO. + tax (-32.192) = 56.065 = "Profit after taxation"/officialPAT
//     impreso EXACTO (cifra tal cual depositada para este ejercicio, ver nota del restatement arriba).
//   2025: revenueLines suman 282.974 = officialTotalRevenue (Turnover 221.063 + Other operating
//     income 5.000 + Profit on disposal 56.911). expenses(wages+other_expenses) + nonCash
//     (amortisation+depreciation, sin impairment este año) = -231.029 + (-83.250) = -314.279 =
//     officialTotalExpenses EXACTO (Cost of sales 6.625 + Operating expenses 307.654 impreso, suma
//     307.654+6.625=314.279). 282.974 - 314.279 = -31.305 = "Operating (loss) before interest and
//     taxation" impreso EXACTO.
//     + netInterest (6.117-6.817=-700) = -32.005 = "(Loss) before taxation" impreso EXACTO. + tax
//     (+3.400, crédito) = -28.605 = "(Loss) after taxation"/officialPAT impreso EXACTO.
// Los dos cierran EXACTOS, sin residuo.
// ============================================================================

const brightonGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:27.722, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:163.478, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:20.188, disclosureLevel:'detailed' },
    { rawLabel:'Other (Turnover)', normalizedCategory:'other_income', amountNative:9.905, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:2.450, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:110.295, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:27.534, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:150.638, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:22.414, disclosureLevel:'detailed' },
    { rawLabel:'Other (Turnover)', normalizedCategory:'other_income', amountNative:20.477, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:5.000, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:56.911, disclosureLevel:'detailed' },
  ],
};

const brightonGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-142.235, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-39.342, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations', normalizedCategory:'player_impairment', amountNative:-2.784, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.397, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-63.567, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-158.679, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-81.840, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.410, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-72.350, disclosureLevel:'aggregated' },
  ],
};

const brightonGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'brighton-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'bloom',
    grossDebt:229.200, cash:14.966,
    profitOnPlayerSales:0, assetSales:0, netInterest:3.544, tax:-32.192,
    officialTotalRevenue:334.038, officialTotalExpenses:249.325, officialPAT:56.065,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'brighton-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'bloom',
    grossDebt:336.069, cash:39.836,
    profitOnPlayerSales:0, assetSales:0, netInterest:-0.700, tax:3.400,
    officialTotalRevenue:282.974, officialTotalExpenses:314.279, officialPAT:-28.605,
  },
};

// brightonGbPresupuestoOverlayByYear: vacío, no hay presupuesto oficial cargado para ningún
// ejercicio de Brighton, solo balances auditados reales.
const brightonGbPresupuestoOverlayByYear = {};

// Sin datos reales de mercado de pases/resultados deportivos/títulos para Brighton todavía (fuera
// de alcance de esta carga, que es solo financiera) — mismo criterio que otros clubes recién
// onboardeados sin este desglose: arrays vacíos, no placeholders inventados.
const brightonGbPasesData = [];
const brightonGbResultadosData = {};
const brightonGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['brighton-gb'] = {
  revenueLinesByYear: brightonGbRevenueLinesByYear, expenseLinesByYear: brightonGbExpenseLinesByYear,
  fiscalYearMeta: brightonGbFiscalYearMeta, pasesData: brightonGbPasesData,
  resultadosData: brightonGbResultadosData, titulosData: brightonGbTitulosData,
  presupuestoOverlayByYear: brightonGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'brighton-gb-full-accounts-2024': {
    id:'brighton-gb-full-accounts-2024', clubId:'brighton-gb',
    title:'The Brighton and Hove Albion Football Club Limited — Report and Financial Statements, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00081077/filing-history',
    publicNote:'Cuentas individuales auditadas (BDO LLP, sin salvedades) de The Brighton and Hove Albion Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24, séptima temporada en la Premier League, 11° puesto, primera participación europea del club — UEFA Europa League).',
    note:'PDF con texto nativo, transcripción completa en "Clubes/Inglaterra/Brighton & Hove Albion/brighton-full-accounts-2023-24.md". Cuentas individuales de la compañía, no consolidadas con Brighton & Hove Albion Women\'s Football Club Limited ni The Community Stadium Limited. No declara tipo de cambio propio (fxRef apunta a FX_CLOSE). El ejercicio 2024 fue restated (impuesto diferido) en el documento del ejercicio 2025 — se cargó con la cifra tal cual depositada en SU PROPIO documento, ver comentario de cabecera de data/brighton-gb-data.js y Admin/dudas-por-club.md.',
  },
  'brighton-gb-full-accounts-2025': {
    id:'brighton-gb-full-accounts-2025', clubId:'brighton-gb',
    title:'The Brighton and Hove Albion Football Club Limited — Annual Report and Financial Statements, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00081077/filing-history',
    publicNote:'Cuentas individuales auditadas (BDO LLP, sin salvedades) de The Brighton and Hove Albion Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25, octava temporada en la Premier League, 8° puesto, sin competencia europea).',
    note:'PDF con texto nativo, transcripción completa en "Clubes/Inglaterra/Brighton & Hove Albion/brighton-full-accounts-2024-25.md". Mismo criterio de categorización que el ejercicio 2024.',
  },
});

// gestionId 'bloom': los 2 Strategic Reports confirman a A(lexander)/"Tony" Bloom como controlante
// último (96.44% de la matriz Brighton & Hove Albion Holdings Limited en 2024, 96.92% en 2025), sin
// cambio entre los 2 ejercicios. Bloom es propietario mayoritario del club desde 2009 (fuera del
// alcance de lo confirmado por estos 2 documentos puntuales, no se declara un firstYear anterior a
// los ejercicios cargados).
gestionesByClub['brighton-gb'] = { bloom: { nombre:'Bloom (2009-actual)', firstYear:2024, lastYear:2025 } };

memberCountByClub['brighton-gb'] = null;

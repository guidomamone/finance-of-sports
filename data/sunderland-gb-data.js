// ============================================================================
// data/sunderland-gb-data.js — Sunderland Association Football Club, Limited (The) (clubId
// 'sunderland-gb'), Ejercicios 2023/24 y 2024/25 (1° de agosto a 31 de julio, confirmado en la
// carátula de los dos documentos: "FOR THE YEAR ENDED 31 JULY 2024"/"...2025").
//
// OJO LIGA (pedido explícito de la tarea, verificado contra Wikipedia "2023–24 EFL Championship" y
// "2024–25 EFL Championship"): Sunderland ascendió a la Premier League recién para la temporada
// 2025/26 (vía el playoff de final de la temporada 2024/25, jugado en mayo de 2025 — POSTERIOR al
// cierre de este ejercicio, 31/7/2025 incluye toda la temporada 2024/25 que se jugó en el
// Championship). Los 2 ejercicios cargados acá (2024 y 2025) son 100% Championship, NO Premier
// League — confirmado también por el propio Strategic Report de cada documento ("enjoyed its second
// season back in the EFL Championship" para 2023/24; "A successful 2024/25 season culminated in the
// return of Sunderland AFC to the Premier League, via the Championship [playoff]" para 2024/25, que
// dice explícitamente que la vuelta a la Premier League fue el RESULTADO del ejercicio, jugado
// enteramente en el Championship). Ver data/club-leagues/gb.js: se agregó 'gb-championship' al
// catálogo (data/leagues.js) porque no existía ninguna liga inglesa de 2ª división cargada todavía.
//
// ENTIDAD LEGAL: "Sunderland Association Football Club, Limited (The)", Company Registration No.
// 00049116 (Companies House, UK). Cuentas INDIVIDUALES (la compañía está exenta de preparar
// consolidadas bajo Section 400 del Companies Act 2006; sus subsidiarias —1879 Events Management
// Limited, Sunderland AFC Women Limited— se consolidan en las cuentas de la matriz, Sunderland
// Limited, no cargadas acá).
//
// Fuente: transcripciones completas en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-
// 2023-24.md y -2024-25.md.
//
// Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). Los 2
// ejercicios usan `fxRef` ('GBP@2024-07-31'/'GBP@2025-07-31', agregadas a FX_CLOSE en esta sesión —
// ninguna de las 2 fechas de cierre, 31 de julio, coincidía con las que ya tenía el sitio de otros
// clubes ingleses, todos con cierre 31/5 o 30/6) porque ninguno de los 2 documentos declara un tipo
// de cambio propio a USD.
//
// ----------------------------------------------------------------------------------------------
// GOTCHA DE LECTURA (Ejercicio 2025): el Income Statement transcripto perdió la fila "Other
// operating income" en la columna 2025 (queda en blanco/nil, a diferencia de 2024 que sí tenía
// £25k) — la secuencia de números post-OCR/extracción parecía no calzar con las filas hasta
// reconciliar contra Nota 5 ("Other operating income": 2025 = £nil, confirmado) y Nota 6
// (Amortisation 10.409, Profit on disposal 45.843, EXACTOS contra la reconstrucción). Ver sección 11
// de club-data-mapping/SKILL.md: se resolvió reconciliando cada subtotal impreso (Operating loss,
// Loss before tax) antes de asignar cada número a su fila, no adivinando por posición en la lista.
//
// CATEGORIZACIÓN DE INGRESOS (Nota 3 "Turnover by class of business", 6 líneas los 2 ejercicios, +
// "Other operating income" y "Profit on disposal of player contracts" como líneas separadas del
// cuerpo del Income Statement):
//   - "Gate receipts" -> matchday_competition.
//   - "Television and media"/"TV, Media and FL distribution" -> broadcasting.
//   - "Sponsorship and royalties" -> sponsorship_commercial.
//   - "Conference and banqueting" -> other_income: mismo criterio que "Other commercial activities"
//     de Everton (definida por su propio documento como "hospitality, catering, events"), acá
//     "Conference and banqueting" es hospitalidad/eventos, no sponsorship — se sigue el precedente
//     de Everton en vez de tratarlo como comercial.
//   - "Retail and merchandising" -> sponsorship_commercial (mismo criterio que "Merchandising" de
//     Everton/Forest).
//   - "Other" -> other_income (catch-all genérico, sin más desglose en el documento).
//   - "Other operating income" (línea aparte del Income Statement, £25k en 2024 —rebate de tasas
//     municipales del Stadium of Light—, £nil en 2025) -> other_income.
//   - "Profit on disposal of player contracts": línea NETA separada, debajo de "Amortisation of
//     players contracts" en el Income Statement -> revenueLine con player_sales, mismo criterio que
//     Forest/Everton/Arsenal (meta.profitOnPlayerSales queda en 0 para no duplicar).
//
// CATEGORIZACIÓN DE GASTOS: igual que Forest, el Income Statement no desglosa "Cost of sales"/
// "Operating expenses" por naturaleza más allá de lo que la Nota 4 (Employees, Staff costs
// agregados, sin desglose plantel/resto) y la Nota 5 ("Operating loss is stated after
// charging/(crediting)": Depreciation, Players contracts amortisation) revelan. "Amortisation of
// players contracts" SÍ es una línea propia del Income Statement (no embebida en Operating
// expenses), a diferencia de Depreciation, que queda embebida y se extrae vía la Nota 5.
//   - "Staff costs" (Nota 4: Wages and salaries + Social security + Other pension costs) ->
//     wages_squad (agregado único, mismo gotcha que Forest/Everton/Arsenal: no separa plantel del
//     resto del personal).
//   - "Amortisation of players contracts" -> player_amortisation.
//   - "Depreciation - owned assets" (Nota 5, embebida en Cost of sales/Operating expenses) ->
//     depreciation.
//   - Residual (Cost of sales + Operating expenses − Staff costs − Depreciation) -> other_expenses.
//
// "netInterest" = Interest receivable (Nota 7) − Interest payable (Nota 7). "tax" = 0 los 2 años. //
// "assetSales"/"profitOnPlayerSales" = 0 (ya en revenueLines).
//
// GROSSDEBT: se excluyeron "Amounts owed to ultimate parent company"/"Amounts owed to group
// undertakings" (financiamiento intra-grupo/accionista, con intención declarada de convertirse a
// patrimonio) y "Trade creditors"/"Accruals and deferred income" relacionados a compra de pases
// (deuda comercial, no financiera) — mismo criterio que Forest. Solo se cargó deuda bancaria/de
// entidades financieras real:
//   2024: "Bank Overdraft" (Nota 14, dentro de 1 año) = 8.289. Sin deuda no corriente de este tipo.
//   2025: "Loan Facility" (Nota 14, dentro de 1 año, nueva línea que reemplaza el overdraft de 2024)
//     = 25.217. Sin deuda no corriente de este tipo (la Nota 15 no corriente son £101.641M de
//     "Trade creditors"/"Accruals" ligados a compra de pases, deuda comercial, no financiera).
// cash = "Cash at bank" del balance (£0 en 2024 —toda la caja está barrida hacia el overdraft—,
// 20.711 en 2025).
//
// VERIFICACIÓN (a mano, contra los totales impresos):
//   2024: revenueLines suman 46.295 = officialTotalRevenue (Turnover 37.452 + Other operating
//     income 0.025 + Profit on disposal 8.818). expenses(wages+other_expenses) +
//     nonCash(amortisation+depreciation) = -49.884 + (-4.899) = -54.783 = officialTotalExpenses
//     EXACTO (Cost of sales 3.300 + Operating expenses 47.500 + Amortisation 3.983 impreso). +
//     netInterest (-0.583) = -9.071 = officialPAT EXACTO ("LOSS FOR THE FINANCIAL YEAR" impreso).
//   2025: revenueLines suman 85.265 = officialTotalRevenue (Turnover 39.422 + Other operating
//     income 0 + Profit on disposal 45.843). expenses+nonCash = -73.872 + (-11.724) = -85.596 =
//     officialTotalExpenses EXACTO (Cost of sales 1.454 + Operating expenses 73.733 + Amortisation
//     10.409 impreso). + netInterest (-2.948) = -3.279 = officialPAT EXACTO ("LOSS FOR THE FINANCIAL
//     YEAR" impreso).
// Los dos cierran EXACTOS, sin residuo.
// ============================================================================

const sunderlandGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:11.537, disclosureLevel:'detailed' },
    { rawLabel:'Television and media', normalizedCategory:'broadcasting', amountNative:10.443, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.315, disclosureLevel:'detailed' },
    { rawLabel:'Conference and banqueting', normalizedCategory:'other_income', amountNative:8.713, disclosureLevel:'detailed' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:2.997, disclosureLevel:'detailed' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:1.447, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:0.025, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player contracts', normalizedCategory:'player_sales', amountNative:8.818, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:13.020, disclosureLevel:'detailed' },
    { rawLabel:'TV, Media and FL distribution', normalizedCategory:'broadcasting', amountNative:12.005, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and royalties', normalizedCategory:'sponsorship_commercial', amountNative:3.888, disclosureLevel:'detailed' },
    { rawLabel:'Conference and banqueting', normalizedCategory:'other_income', amountNative:7.613, disclosureLevel:'detailed' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:1.180, disclosureLevel:'detailed' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:1.716, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player contracts', normalizedCategory:'player_sales', amountNative:45.843, disclosureLevel:'detailed' },
  ],
};

const sunderlandGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-30.463, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players contracts', normalizedCategory:'player_amortisation', amountNative:-3.983, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation - owned assets', normalizedCategory:'depreciation', amountNative:-0.916, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-19.421, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-52.899, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players contracts', normalizedCategory:'player_amortisation', amountNative:-10.409, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation - owned assets', normalizedCategory:'depreciation', amountNative:-1.315, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-20.973, disclosureLevel:'aggregated' },
  ],
};

const sunderlandGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-07-31',
    sourceId:'sunderland-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'louisdreyfus',
    // grossDebt = Bank Overdraft (Nota 14). cash = "Cash at bank" (balance: Current assets =
    // Stocks 0.100 + Debtors 11.791 + Cash = 11.891 impreso -> Cash = 0).
    grossDebt:8.289, cash:0,
    profitOnPlayerSales:0, assetSales:0, netInterest:-0.583, tax:0,
    officialTotalRevenue:46.295, officialTotalExpenses:54.783, officialPAT:-9.071,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-07-31',
    sourceId:'sunderland-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'louisdreyfus',
    // grossDebt = "Loan Facility" (Nota 14, dentro de 1 año). cash = "Cash at bank" (balance).
    grossDebt:25.217, cash:20.711,
    profitOnPlayerSales:0, assetSales:0, netInterest:-2.948, tax:0,
    officialTotalRevenue:85.265, officialTotalExpenses:85.596, officialPAT:-3.279,
  },
};

const sunderlandGbPresupuestoOverlayByYear = {};

const sunderlandGbPasesData = [];
const sunderlandGbResultadosData = {};
const sunderlandGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sunderland-gb'] = {
  revenueLinesByYear: sunderlandGbRevenueLinesByYear, expenseLinesByYear: sunderlandGbExpenseLinesByYear,
  fiscalYearMeta: sunderlandGbFiscalYearMeta, pasesData: sunderlandGbPasesData,
  resultadosData: sunderlandGbResultadosData, titulosData: sunderlandGbTitulosData,
  presupuestoOverlayByYear: sunderlandGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sunderland-gb-full-accounts-2024': {
    id:'sunderland-gb-full-accounts-2024', clubId:'sunderland-gb',
    title:'Sunderland Association Football Club, Limited (The) — Strategic Report, Report of the Directors and Financial Statements, year ended 31 July 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00049116/filing-history',
    publicNote:'Cuentas individuales auditadas (Constantin, sin salvedades) de Sunderland Association Football Club, Limited (The), depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de julio de 2024 (temporada 2023/24, EFL Championship).',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2023-24.md. Cuentas individuales, exenta de consolidar bajo Section 400 (Companies Act 2006). No declara tipo de cambio propio (fxRef apunta a FX_CLOSE, entrada GBP@2024-07-31 agregada en esta sesión).',
  },
  'sunderland-gb-full-accounts-2025': {
    id:'sunderland-gb-full-accounts-2025', clubId:'sunderland-gb',
    title:'Sunderland Association Football Club, Limited (The) — Strategic Report, Report of the Directors and Financial Statements, year ended 31 July 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00049116/filing-history',
    publicNote:'Cuentas individuales auditadas (Constantin, sin salvedades) de Sunderland Association Football Club, Limited (The), depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de julio de 2025 (temporada 2024/25, EFL Championship — el ascenso a la Premier League vía playoff ocurrió al FINAL de este ejercicio, para la temporada SIGUIENTE, 2025/26).',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2024-25.md. La fila "Other operating income" de 2025 no aparece en el Income Statement transcripto (nil, confirmado contra Nota 5); ver comentario de cabecera de este archivo. Mismo criterio de categorización que el ejercicio 2024. fxRef apunta a FX_CLOSE, entrada GBP@2025-07-31 agregada en esta sesión.',
  },
});

// gestionId 'louisdreyfus': los 2 ejercicios cargados confirman a Kyril Louis-Dreyfus (vía Mercator
// Investments Limited, controlante último) en los 2 Strategic Reports/Related Party Disclosures, sin
// cambio entre 2024 y 2025.
gestionesByClub['sunderland-gb'] = { louisdreyfus: { nombre:'Louis-Dreyfus / Mercator Investments', firstYear:2024, lastYear:2025 } };

memberCountByClub['sunderland-gb'] = null;

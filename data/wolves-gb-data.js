// ============================================================================
// data/wolves-gb-data.js — Wolverhampton Wanderers Football Club (1986) Limited (clubId
// 'wolves-gb'), 2 ejercicios: 2023/24 (12 meses, 1° de junio de 2023 a 31 de mayo de 2024) y un
// PERÍODO DE TRANSICIÓN DE 13 MESES (1° de junio de 2024 a 30 de junio de 2025, cargado como año
// "2025"). Ver el aviso grande más abajo antes de comparar 2025 contra cualquier otro ejercicio.
//
// ENTIDAD LEGAL: "Wolverhampton Wanderers Football Club (1986) Limited", Company Registration No.
// 01989823 (Companies House, UK). Cuentas INDIVIDUALES de la compañía operativa (inmediatamente
// propiedad de W.W. (1990) Limited, dentro del grupo Fosun; no consolida).
//
// Fuente: transcripciones completas en Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-
// accounts-2023-24.md y -2024-25.md.
//
// Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). `fxRef`
// ('GBP@2024-05-31' para 2024, que cierra 31/5; 'GBP@2025-06-30' para 2025, que cierra 30/6 de
// verdad tras el cambio de fecha de cierre — ambas entradas YA estaban en FX_CLOSE desde sesiones
// anteriores) porque ninguno de los 2 documentos declara un tipo de cambio propio a USD.
//
// ============================================================================
// AVISO IMPORTANTE — EL EJERCICIO "2025" CUBRE 13 MESES, NO 12 (hallazgo genuino de esta sesión,
// anotado también en Admin/dudas-por-club.md):
//
// El PDF de wolves-full-accounts-2024-25.md dice literalmente "FOR THE PERIOD ENDED 30 JUNE 2025" y
// "FOR THE 13 MONTH PERIOD ENDED 30 JUNE 2025" en sus notas — la compañía CAMBIÓ su fecha de cierre
// de ejercicio de 31 de mayo a 30 de junio, y este documento es el período de TRANSICIÓN (1 de junio
// de 2024 a 30 de junio de 2025, 13 meses), no un ejercicio normal de 12. La comparativa que imprime
// el propio documento para el período anterior ("12 months to 31 May 2024") coincide EXACTA con los
// números ya cargados acá como año 2024 (Turnover 177.697, Profit on disposal 64.631, etc.), así que
// no hay conflicto de datos, solo de DURACIÓN del período nuevo.
//
// Se cargó igual (como año "2025", la fecha de cierre más reciente) porque el pedido de esta sesión
// era cargar ambos documentos disponibles, y la alternativa —no cargarlo— habría dejado a Wolves con
// un solo ejercicio real. PERO: cualquier comparación "año a año" entre 2024 (12 meses) y 2025 (13
// meses) de este club va a sobreestimar el crecimiento real (hay un mes extra de ingresos/gastos
// metido en 2025) — no se intentó prorratear a 12 meses porque el propio documento no ofrece un
// desglose mensual que permita hacerlo con precisión (ver club-data-mapping sección 15, mismo
// espíritu: no inventar una reconstrucción sin la granularidad para hacerla bien). Pregunta abierta
// para Guido en Admin/dudas-por-club.md: si prefiere marcar este ejercicio con una nota visible de
// "13 meses" en el sitio, o dejarlo como está con esta documentación interna.
//
// El `fxRef` de 2025 usa 'GBP@2025-06-30', que SÍ es la cotización exacta del día de cierre real
// (30/6/2025) — ya estaba en FX_CLOSE de una sesión anterior, no hizo falta agregar nada nuevo.
// ============================================================================
//
// CATEGORIZACIÓN DE INGRESOS (Nota 4 "Turnover by class of business" — el documento de 2025
// RECLASIFICÓ las categorías, "streamlined turnover classes... comparative amounts have been
// reclassified", así que el desglose de 2024 usado acá sale del documento ORIGINAL 2023-24, no de
// la comparativa reclasificada de 2025, siguiendo club-data-mapping sección 6.5: usar siempre la
// columna "año corriente" del balance de ESE mismo ejercicio):
//   2024 (6 líneas, documento original): "Gate receipts" -> matchday_competition; "Sponsorship and
//     advertising" -> sponsorship_commercial; "Broadcasting rights" -> broadcasting; "Commercial" ->
//     sponsorship_commercial; "League distributions" -> broadcasting (distribuciones centrales de la
//     Premier League, en la práctica ingreso de TV/derechos); "Other turnover" -> other_income.
//   2025 (4 líneas, documento reclasificado): "Gate receipts" -> matchday_competition; "Sponsorship
//     and advertising" -> sponsorship_commercial; "Broadcasting rights" -> broadcasting (ahora
//     incluye lo que antes eran 2 líneas separadas, Broadcasting rights + League distributions);
//     "Commercial" -> sponsorship_commercial.
//   Los 2 años, además: "Other operating income" (línea aparte del cuerpo del P&L; 2024 = nil, 2025
//     = £0.324m + £1.100m de "Insurance claims receivable") -> other_income. "Profit on disposal of
//     player registrations" (línea NETA, columna "Player trading", después de "Operating loss") ->
//     revenueLine con player_sales, mismo criterio que el resto de los clubes ingleses
//     (meta.profitOnPlayerSales queda en 0 para no duplicar).
//
// CATEGORIZACIÓN DE GASTOS: el P&L de Wolves SÍ separa 2 columnas ("Operations excluding player
// amortisation & trading" / "Player amortisation & trading"), y la Nota 5 "Operating loss" (stated
// after charging) permite reconciliar EXACTO qué compone la columna "Player trading": Amortisation
// of player's registrations + Provision for impairment of intangible assets (NO incluye
// "Amortisation of OTHER intangible assets", que queda en la columna "Operations" — confirmado
// sumando: 64.168+3.024=67.192 en 2024, 75.426+12.365=87.791 en 2025, EXACTOS contra el total de la
// columna Player trading del P&L).
//   - "Wages and salaries" + "Social security costs" + "Pension" (Nota Staff costs, agregado único
//     sin desglose plantel/resto) -> wages_squad.
//   - "Amortisation of player's registrations" -> player_amortisation.
//   - "Provision for impairment of intangible assets" -> player_impairment.
//   - "Depreciation of assets" -> depreciation.
//   - "Amortisation of other intangible assets" (inmaterial, £67k/£12k) -> other_amortisation.
//   - Residual (Operating expenses total de las 2 columnas − wages − amortisation − impairment −
//     depreciation − other_amortisation, que incluye operating lease rentals, diferencias de cambio,
//     y el resto de costos operativos/administrativos/de partido sin nombre propio) -> other_expenses.
//
// "netInterest" = Interest receivable (Nota 9) − Interest payable (Nota 10). "tax" = 0 los 2 años
// (Nota 11, sin cargo). "assetSales"/"profitOnPlayerSales" = 0 (ya en revenueLines).
//
// GROSSDEBT: se excluyó "Amounts owed to group undertakings" (241.462 en 2024, 247.502 en 2025 —
// financiamiento intra-grupo Fosun, mismo criterio que Forest/Sunderland/West Ham) y "Other
// creditors" relacionados a player trading (deuda comercial por pases, no financiera). Se cargó
// "Bank loans" (Notas 16/17/18, deuda bancaria real):
//   2024: dentro de 1 año = 0 (nil, confirmado en Nota 18 "Loans"); después de 1 año = 100.609.
//     grossDebt = 100.609.
//   2025: dentro de 1 año = 21.939; después de 1 año = 79.455. grossDebt = 101.394.
// cash = "Cash at bank and in hand" del balance. 2024: no viene legible directo en la transcripción
//   del balance (OCR garbled), se derivó por diferencia: Current assets total (168.999) − Debtors
//   (138.436) − Stocks (0, "no stock held at year end due to the outsourcing of the retail
//   operation", Nota 14) = 30.563 — coincide EXACTO con el "30,563" que sí aparece legible como
//   comparativa en el balance del documento 2025 (confirma la derivación). 2025: el balance del
//   documento 2025 muestra un fragmento OCR "3 9439" que NO reconcilia contra el total de Current
//   assets impreso (235.298) si se lee como 9.439 (faltarían £24.000k) — se leyó como 33.439
//   (probable dígito "3" separado del resto por el OCR), que sí reconcilia EXACTO: Debtors (201.859)
//   + Cash (33.439) = 235.298 = Current assets impreso, y Net current liabilities (235.298 −
//   428.765 = −193.467) coincide EXACTO con el impreso. Ver club-data-mapping sección 6 (cruzar
//   contra subtotales impresos antes de cargar un número dudoso).
//
// VERIFICACIÓN (a mano, contra los totales impresos):
//   2024: revenueLines suman 242.328 = officialTotalRevenue (Turnover 177.697 + Profit on disposal
//     64.631). expenses(wages+other_expenses) + nonCash(amortisation+impairment+depreciation+other_
//     amortisation) = -178.831 + (-68.736) = -247.567 = officialTotalExpenses EXACTO (Operating
//     expenses total impreso, 2 columnas). + netInterest (-5.639) = -10.878 = officialPAT EXACTO
//     ("Loss for the financial year" impreso).
//   2025 (13 meses): revenueLines suman 290.383 = officialTotalRevenue (Turnover 171.975 + Other
//     operating income 1.424 + Profit on disposal 116.984). expenses+nonCash = -201.360 + (-89.338)
//     = -290.698 = officialTotalExpenses EXACTO (Operating expenses total impreso). + netInterest
//     (-11.316) = -11.631 = officialPAT EXACTO ("Loss for the financial period" impreso).
// Los dos cierran EXACTOS, sin residuo.
// ============================================================================

const wolvesGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:16.193, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:14.538, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting rights', normalizedCategory:'broadcasting', amountNative:15.569, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:12.288, disclosureLevel:'detailed' },
    { rawLabel:'League distributions', normalizedCategory:'broadcasting', amountNative:117.135, disclosureLevel:'detailed' },
    { rawLabel:'Other turnover', normalizedCategory:'other_income', amountNative:1.974, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:64.631, disclosureLevel:'detailed' },
  ],
  // AVISO: 13 meses (1/6/2024 a 30/6/2025), no 12 — ver aviso de cabecera de este archivo.
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:21.766, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:19.830, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting rights', normalizedCategory:'broadcasting', amountNative:125.591, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:4.788, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (incl. seguros)', normalizedCategory:'other_income', amountNative:1.424, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:116.984, disclosureLevel:'detailed' },
  ],
};

const wolvesGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-141.284, disclosureLevel:'detailed' },
    { rawLabel:"Amortisation of player's registrations", normalizedCategory:'player_amortisation', amountNative:-64.168, disclosureLevel:'detailed' },
    { rawLabel:'Provision for impairment of intangible assets', normalizedCategory:'player_impairment', amountNative:-3.024, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of assets', normalizedCategory:'depreciation', amountNative:-1.477, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of other intangible assets', normalizedCategory:'other_amortisation', amountNative:-0.067, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Operating expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-37.547, disclosureLevel:'aggregated' },
  ],
  // AVISO: 13 meses (1/6/2024 a 30/6/2025), no 12 — ver aviso de cabecera de este archivo.
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-162.087, disclosureLevel:'detailed' },
    { rawLabel:"Amortisation of player's registrations", normalizedCategory:'player_amortisation', amountNative:-75.426, disclosureLevel:'detailed' },
    { rawLabel:'Provision for impairment of intangible assets', normalizedCategory:'player_impairment', amountNative:-12.365, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of assets', normalizedCategory:'depreciation', amountNative:-1.535, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of other intangible assets', normalizedCategory:'other_amortisation', amountNative:-0.012, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Operating expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-39.273, disclosureLevel:'aggregated' },
  ],
};

const wolvesGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-05-31',
    sourceId:'wolves-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'fosun',
    grossDebt:100.609, cash:30.563,
    profitOnPlayerSales:0, assetSales:0, netInterest:-5.639, tax:0,
    officialTotalRevenue:242.328, officialTotalExpenses:247.567, officialPAT:-10.878,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'wolves-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'fosun',
    // OJO: ejercicio de 13 meses (1/6/2024 a 30/6/2025), NO 12 — ver aviso de cabecera del archivo.
    grossDebt:101.394, cash:33.439,
    profitOnPlayerSales:0, assetSales:0, netInterest:-11.316, tax:0,
    officialTotalRevenue:290.383, officialTotalExpenses:290.698, officialPAT:-11.631,
  },
};

const wolvesGbPresupuestoOverlayByYear = {};

const wolvesGbPasesData = [];
const wolvesGbResultadosData = {};
const wolvesGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['wolves-gb'] = {
  revenueLinesByYear: wolvesGbRevenueLinesByYear, expenseLinesByYear: wolvesGbExpenseLinesByYear,
  fiscalYearMeta: wolvesGbFiscalYearMeta, pasesData: wolvesGbPasesData,
  resultadosData: wolvesGbResultadosData, titulosData: wolvesGbTitulosData,
  presupuestoOverlayByYear: wolvesGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'wolves-gb-full-accounts-2024': {
    id:'wolves-gb-full-accounts-2024', clubId:'wolves-gb',
    title:'Wolverhampton Wanderers Football Club (1986) Limited — Report and Financial Statements, year ended 31 May 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01989823/filing-history',
    publicNote:'Cuentas individuales auditadas de Wolverhampton Wanderers Football Club (1986) Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2024 (temporada 2023/24), 12 meses.',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2023-24.md. Propiedad de Fosun International Limited (vía W.W. (1990) Limited). No declara tipo de cambio propio (fxRef apunta a FX_CLOSE).',
  },
  'wolves-gb-full-accounts-2025': {
    id:'wolves-gb-full-accounts-2025', clubId:'wolves-gb',
    title:'Wolverhampton Wanderers Football Club (1986) Limited — Report and Financial Statements, period ended 30 June 2025 (13 meses)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01989823/filing-history',
    publicNote:'Cuentas individuales auditadas de Wolverhampton Wanderers Football Club (1986) Limited, depositadas en Companies House (Reino Unido). PERÍODO DE TRANSICIÓN DE 13 MESES (1° de junio de 2024 a 30 de junio de 2025) por un cambio de fecha de cierre de ejercicio de 31/5 a 30/6 — NO es un ejercicio normal de 12 meses, ver aviso completo en el comentario de cabecera de data/wolves-gb-data.js.',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2024-25.md. Cash at bank derivado por reconciliación de subtotales (OCR ambiguo, ver comentario de cabecera). fxRef usa GBP@2025-06-30, cotización exacta del día de cierre real.',
  },
});

// gestionId 'fosun': los 2 ejercicios cargados confirman a Fosun International Limited/Fosun
// International Holdings Limited (Chairman Guo Guangchang, accionista mayoritario último) como
// controlante, sin cambio entre 2024 y 2025.
gestionesByClub['wolves-gb'] = { fosun: { nombre:'Fosun International', firstYear:2024, lastYear:2025 } };

memberCountByClub['wolves-gb'] = null;

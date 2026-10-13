const tottenhamGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Match receipts', normalizedCategory:'matchday_competition', amountNative:105.847, disclosureLevel:'detailed' },
    { rawLabel:'UEFA Prize money', normalizedCategory:'competition_bonus', amountNative:1.262, disclosureLevel:'detailed' },
    { rawLabel:'TV and media', normalizedCategory:'broadcasting', amountNative:165.910, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:244.744, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:10.428, disclosureLevel:'not_disclosed' },
  ],
  2025: [
    { rawLabel:'Match receipts', normalizedCategory:'matchday_competition', amountNative:126.473, disclosureLevel:'detailed' },
    { rawLabel:'UEFA Prize money', normalizedCategory:'competition_bonus', amountNative:34.716, disclosureLevel:'detailed' },
    { rawLabel:'TV and media', normalizedCategory:'broadcasting', amountNative:126.993, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:276.699, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:0.385, disclosureLevel:'not_disclosed' },
  ],
};

const tottenhamGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-221.929, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment', normalizedCategory:'depreciation', amountNative:-68.796, disclosureLevel:'detailed' },
    { rawLabel:'Loss on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:-0.006, disclosureLevel:'detailed' },
    { rawLabel:'Exceptional items - Onerous employment contracts', normalizedCategory:'admin_general_expense', amountNative:-1.528, disclosureLevel:'detailed' },
    { rawLabel:'Other operating costs', normalizedCategory:'other_expenses', amountNative:-161.367, disclosureLevel:'not_disclosed' },
    { rawLabel:"Amortisation, impairments and other net football trading income and expenditure", normalizedCategory:'player_amortisation', amountNative:-135.583, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-255.811, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment', normalizedCategory:'depreciation', amountNative:-56.948, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:0.110, disclosureLevel:'detailed' },
    { rawLabel:'Exceptional items - Onerous employment contracts and other employment related payments', normalizedCategory:'admin_general_expense', amountNative:-11.601, disclosureLevel:'detailed' },
    { rawLabel:'Other operating costs', normalizedCategory:'other_expenses', amountNative:-197.259, disclosureLevel:'not_disclosed' },
    { rawLabel:"Amortisation, impairments and other net football trading income and expenditure", normalizedCategory:'player_amortisation', amountNative:-146.720, disclosureLevel:'detailed' },
  ],
};

const tottenhamGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'tottenham-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'levy',
    grossDebt:851.448, cash:78.974,
    profitOnPlayerSales:82.305, assetSales:0, netInterest:-47.317, tax:-0.196,
    officialTotalRevenue:528.191, officialTotalExpenses:589.209, officialPAT:-26.226,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'tottenham-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'levy',
    grossDebt:851.652, cash:20.413,
    profitOnPlayerSales:52.565, assetSales:0, netInterest:-70.230, tax:25.962,
    officialTotalRevenue:565.266, officialTotalExpenses:668.229, officialPAT:-94.666,
  },
};

const tottenhamGbPresupuestoOverlayByYear = {};

const tottenhamGbPasesData = [];
const tottenhamGbResultadosData = {};
const tottenhamGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['tottenham-gb'] = {
  revenueLinesByYear: tottenhamGbRevenueLinesByYear, expenseLinesByYear: tottenhamGbExpenseLinesByYear,
  fiscalYearMeta: tottenhamGbFiscalYearMeta, pasesData: tottenhamGbPasesData,
  resultadosData: tottenhamGbResultadosData, titulosData: tottenhamGbTitulosData,
  presupuestoOverlayByYear: tottenhamGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'tottenham-gb-group-accounts-2024': {
    id:'tottenham-gb-group-accounts-2024', clubId:'tottenham-gb',
    title:'Tottenham Hotspur Limited — Annual Report and Consolidated Financial Statements, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01706358/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Tottenham Hotspur Limited, depositado en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24). Las cifras del grupo incluyen la actividad del plantel masculino y del plantel femenino combinadas, tal como aclara el propio documento ("the operation of both a men\'s and a women\'s professional football club").',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2023-24.md. Cuentas consolidadas del grupo. No se encontró un tipo de cambio GBP/USD de cierre declarado por el documento para todo el balance (solo exposición cualitativa a moneda extranjera en transferencias de jugadores) — fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2024-06-30 (pendiente, fuera de alcance de esta sesión, mismo gotcha que arsenal-gb-data.js). Duda abierta sobre el desglose interno de "Commercial" (Sponsorship/Merchandising/Other revenue, este último con ingresos no futbolísticos del estadio) sin cifra exacta en la Nota 2 — ver comentario de cabecera de tottenham-gb-data.js.',
  },
  'tottenham-gb-group-accounts-2025': {
    id:'tottenham-gb-group-accounts-2025', clubId:'tottenham-gb',
    title:'Tottenham Hotspur Limited — Annual Report and Consolidated Financial Statements, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01706358/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Tottenham Hotspur Limited, depositado en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25). Las cifras del grupo incluyen la actividad del plantel masculino y del plantel femenino combinadas, tal como aclara el propio documento ("the operation of both a men\'s and a women\'s professional football club").',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2024-25.md. Cuentas consolidadas del grupo. Mismo gotcha de fx que el ejercicio 2024: fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2025-06-30 (pendiente, fuera de alcance de esta sesión). Post balance sheet: el Executive Chairman Daniel Levy dejó el club el 4/9/2025, después del cierre de este ejercicio.',
  },
});

gestionesByClub['tottenham-gb'] = { levy: { nombre:'Levy (Executive Chairman, ENIC)', firstYear:2024, lastYear:2025 } };

memberCountByClub['tottenham-gb'] = null;

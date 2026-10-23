// GENERADO desde data/co/llaneros-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const llanerosCoRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Cesion de Derechos de TV","normalizedCategory":"broadcasting","amountNative":2557.762933,"disclosureLevel":"aggregated"},
    {"rawLabel":"Contratos Publicidad","normalizedCategory":"sponsorship_commercial","amountNative":6388.932082,"disclosureLevel":"aggregated"},
    {"rawLabel":"Auxilio Transporte Dimayor","normalizedCategory":"competition_bonus","amountNative":673.77927,"disclosureLevel":"aggregated"},
    {"rawLabel":"Auxilio Arbitraje Dimayor","normalizedCategory":"competition_bonus","amountNative":96.254181,"disclosureLevel":"aggregated"},
    {"rawLabel":"Auxilio Hotelero Dimayor","normalizedCategory":"competition_bonus","amountNative":192.508363,"disclosureLevel":"aggregated"},
    {"rawLabel":"Mecanismo de Solidaridad","normalizedCategory":"player_sales","amountNative":120,"disclosureLevel":"aggregated"},
    {"rawLabel":"Taquillas","normalizedCategory":"matchday_competition","amountNative":1826.318189,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros Ingresos","normalizedCategory":"other_income","amountNative":1.294537,"disclosureLevel":"aggregated"},
  ],
};

const llanerosCoExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Gastos de Administración","normalizedCategory":"admin_general_expense","amountNative":-186.887168,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos por beneficios a empleados","normalizedCategory":"wages_squad","amountNative":-6616.106802,"disclosureLevel":"aggregated"},
    {"rawLabel":"Honorarios","normalizedCategory":"admin_general_expense","amountNative":-304.3695,"disclosureLevel":"aggregated"},
    {"rawLabel":"Impuestos","normalizedCategory":"admin_general_expense","amountNative":-243.29674,"disclosureLevel":"aggregated"},
    {"rawLabel":"Arrendamientos","normalizedCategory":"admin_general_expense","amountNative":-15.574139,"disclosureLevel":"aggregated"},
    {"rawLabel":"Seguros","normalizedCategory":"admin_general_expense","amountNative":-38.49822,"disclosureLevel":"aggregated"},
    {"rawLabel":"Servicios","normalizedCategory":"admin_general_expense","amountNative":-478.950141,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos legales","normalizedCategory":"admin_general_expense","amountNative":-385.4103,"disclosureLevel":"aggregated"},
    {"rawLabel":"Mantenimiento y reparaciones","normalizedCategory":"admin_general_expense","amountNative":-0.31,"disclosureLevel":"aggregated"},
    {"rawLabel":"Adecuacion e instalacion","normalizedCategory":"admin_general_expense","amountNative":-816.568181,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de Viaje","normalizedCategory":"match_organisation_expense","amountNative":-1408.304135,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros Gstos","normalizedCategory":"other_expenses","amountNative":-228.43519,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos extraordinarios","normalizedCategory":"exceptional_items","amountNative":-38.083024,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos diversos","normalizedCategory":"other_expenses","amountNative":-44.283671,"disclosureLevel":"aggregated"},
  ],
};

const llanerosCoFiscalYearMeta = {
  2025: {"currency":"COP","sourceId":"llaneros-co-estados-financieros-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":-10.205,"grossDebt":null,"cash":null,"officialTotalRevenue":11856.849555,"officialTotalExpenses":10766.994187,"officialPAT":1041.567343,"extraRows":[{"label":"Gastos Financieros","value":null},{"label":"Diferido","value":-10.205}]},
};

const llanerosCoPresupuestoOverlayByYear = {};

const llanerosCoPasesData = [];
const llanerosCoResultadosData = {};
const llanerosCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["llaneros-co"] = {
  revenueLinesByYear: llanerosCoRevenueLinesByYear, expenseLinesByYear: llanerosCoExpenseLinesByYear,
  fiscalYearMeta: llanerosCoFiscalYearMeta, pasesData: llanerosCoPasesData,
  resultadosData: llanerosCoResultadosData, titulosData: llanerosCoTitulosData,
  presupuestoOverlayByYear: llanerosCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"llaneros-co-estados-financieros-2025":{"id":"llaneros-co-estados-financieros-2025","clubId":"llaneros-co","title":"Club Llaneros S.A. — estados-financieros-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Llaneros/estados-financieros-2025.pdf"}});

memberCountByClub["llaneros-co"] = null;

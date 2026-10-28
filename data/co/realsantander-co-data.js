// GENERADO desde data/co/realsantander-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const realsantanderCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1663.367,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":3955.323,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":2169.952,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":27.818,"disclosureLevel":"aggregated"},
  ],
};

const realsantanderCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2050.948,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-27.962,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2497.205,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-35.424,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2752.664,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-56.964,"disclosureLevel":"aggregated"},
  ],
};

const realsantanderCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"realsantander-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-30.089,"tax":-4.685,"grossDebt":null,"cash":null,"officialTotalRevenue":1663.367,"officialTotalExpenses":2078.91,"officialPAT":-450.317,"extraRows":[{"label":"Costos financieros","value":-30.089},{"label":"Ingreso (gasto) por impuestos","value":-4.685}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1663.367,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
  2017: {"currency":"COP","sourceId":"realsantander-co-siis-estado-2017","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2017-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-78.171,"tax":-107.462,"grossDebt":null,"cash":null,"officialTotalRevenue":3955.323,"officialTotalExpenses":2532.629,"officialPAT":1237.061,"extraRows":[{"label":"Costos financieros","value":-78.171},{"label":"Ingreso (gasto) por impuestos","value":-107.462}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":3955.323,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
  2018: {"currency":"COP","sourceId":"realsantander-co-siis-estado-2018","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2018-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-94.526,"tax":-27.173,"grossDebt":null,"cash":null,"officialTotalRevenue":2197.77,"officialTotalExpenses":2809.628,"officialPAT":-733.557,"extraRows":[{"label":"Costos financieros","value":-94.526},{"label":"Ingreso (gasto) por impuestos","value":-27.173}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":2169.952,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
};

const realsantanderCoPresupuestoOverlayByYear = {};

const realsantanderCoPasesData = [];
const realsantanderCoResultadosData = {};
const realsantanderCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["realsantander-co"] = {
  revenueLinesByYear: realsantanderCoRevenueLinesByYear, expenseLinesByYear: realsantanderCoExpenseLinesByYear,
  fiscalYearMeta: realsantanderCoFiscalYearMeta, pasesData: realsantanderCoPasesData,
  resultadosData: realsantanderCoResultadosData, titulosData: realsantanderCoTitulosData,
  presupuestoOverlayByYear: realsantanderCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"realsantander-co-siis-estado-2016":{"id":"realsantander-co-siis-estado-2016","clubId":"realsantander-co","title":"Club Deportivo Real Santander S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Real Santander/siis-estado-2016.pdf"},"realsantander-co-siis-estado-2017":{"id":"realsantander-co-siis-estado-2017","clubId":"realsantander-co","title":"Club Deportivo Real Santander S.A. — siis-estado-2017 (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Real Santander/siis-estado-2017.pdf"},"realsantander-co-siis-estado-2018":{"id":"realsantander-co-siis-estado-2018","clubId":"realsantander-co","title":"Club Deportivo Real Santander S.A. — siis-estado-2018 (ejercicio 2018)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Real Santander/siis-estado-2018.pdf"}});

memberCountByClub["realsantander-co"] = null;

// GENERADO desde data/co/realsantander-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const realsantanderCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1663.367,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const realsantanderCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2050.948,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-27.962,"disclosureLevel":"aggregated"},
  ],
};

const realsantanderCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"realsantander-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-30.089,"tax":-4.685,"grossDebt":null,"cash":null,"officialTotalRevenue":1663.367,"officialTotalExpenses":2078.91,"officialPAT":-450.317,"extraRows":[{"label":"Costos financieros","value":-30.089},{"label":"Ingreso (gasto) por impuestos","value":-4.685}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1663.367,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
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

Object.assign(sources, {"realsantander-co-siis-estado-2016":{"id":"realsantander-co-siis-estado-2016","clubId":"realsantander-co","title":"Club Deportivo Real Santander S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Real Santander/siis-estado-2016.pdf"}});

memberCountByClub["realsantander-co"] = null;

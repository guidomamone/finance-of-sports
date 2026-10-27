// GENERADO desde data/co/atleticofc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const atleticofcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1143.089,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":9.88,"disclosureLevel":"aggregated"},
  ],
};

const atleticofcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-952.314,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-216.126,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const atleticofcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"atleticofc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.02,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":1152.969,"officialTotalExpenses":1168.44,"officialPAT":-15.451,"extraRows":[{"label":"Ingresos financieros","value":0.02},{"label":"Costos financieros","value":0},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1143.089,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Costo de ventas","lado":"expense","importe":0,"motivo":"Costo de ventas es 74% de los gastos: actividad deportiva (excepción por contenido de la regla de Colombia)","tipo":"cost_of_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":952.314,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const atleticofcCoPresupuestoOverlayByYear = {};

const atleticofcCoPasesData = [];
const atleticofcCoResultadosData = {};
const atleticofcCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["atleticofc-co"] = {
  revenueLinesByYear: atleticofcCoRevenueLinesByYear, expenseLinesByYear: atleticofcCoExpenseLinesByYear,
  fiscalYearMeta: atleticofcCoFiscalYearMeta, pasesData: atleticofcCoPasesData,
  resultadosData: atleticofcCoResultadosData, titulosData: atleticofcCoTitulosData,
  presupuestoOverlayByYear: atleticofcCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"atleticofc-co-siis-estado-2016":{"id":"atleticofc-co-siis-estado-2016","clubId":"atleticofc-co","title":"Club Deportivo Atletico Futbol Club Sa — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Atletico FC/siis-estado-2016.pdf"}});

memberCountByClub["atleticofc-co"] = null;

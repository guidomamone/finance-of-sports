// GENERADO desde data/co/tigresfc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const tigresfcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1188.443,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":73.24,"disclosureLevel":"aggregated"},
  ],
};

const tigresfcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-523.191,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-683.325,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const tigresfcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"tigresfc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-60.221,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":1261.683,"officialTotalExpenses":1206.516,"officialPAT":-5.054,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":-60.221},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1188.443,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":0,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const tigresfcCoPresupuestoOverlayByYear = {};

const tigresfcCoPasesData = [];
const tigresfcCoResultadosData = {};
const tigresfcCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["tigresfc-co"] = {
  revenueLinesByYear: tigresfcCoRevenueLinesByYear, expenseLinesByYear: tigresfcCoExpenseLinesByYear,
  fiscalYearMeta: tigresfcCoFiscalYearMeta, pasesData: tigresfcCoPasesData,
  resultadosData: tigresfcCoResultadosData, titulosData: tigresfcCoTitulosData,
  presupuestoOverlayByYear: tigresfcCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"tigresfc-co-siis-estado-2016":{"id":"tigresfc-co-siis-estado-2016","clubId":"tigresfc-co","title":"Tigres Fútbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Tigres FC/siis-estado-2016.pdf"}});

memberCountByClub["tigresfc-co"] = null;

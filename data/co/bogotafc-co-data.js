// GENERADO desde data/co/bogotafc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const bogotafcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":2137.075,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":4,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1214.168,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const bogotafcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-237.686,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1073.082,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-149.522,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-124.585,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-906.74,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-7.604,"disclosureLevel":"aggregated"},
  ],
};

const bogotafcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"bogotafc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-22.245,"tax":-92.404,"grossDebt":null,"cash":null,"officialTotalRevenue":2141.075,"officialTotalExpenses":1460.29,"officialPAT":566.136,"extraRows":[{"label":"Ingresos financieros","value":3.433},{"label":"Costos financieros","value":-25.678},{"label":"Ingreso (gasto) por impuestos","value":-92.404}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":2137.075,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":237.686,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2017: {"currency":"COP","sourceId":"bogotafc-co-siis-estado-2017","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2017-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-31.686,"tax":-25.333,"grossDebt":null,"cash":null,"officialTotalRevenue":1214.168,"officialTotalExpenses":1038.929,"officialPAT":118.22,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":-31.686},{"label":"Ingreso (gasto) por impuestos","value":-25.333}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1214.168,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":124.585,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const bogotafcCoPresupuestoOverlayByYear = {};

const bogotafcCoPasesData = [];
const bogotafcCoResultadosData = {};
const bogotafcCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["bogotafc-co"] = {
  revenueLinesByYear: bogotafcCoRevenueLinesByYear, expenseLinesByYear: bogotafcCoExpenseLinesByYear,
  fiscalYearMeta: bogotafcCoFiscalYearMeta, pasesData: bogotafcCoPasesData,
  resultadosData: bogotafcCoResultadosData, titulosData: bogotafcCoTitulosData,
  presupuestoOverlayByYear: bogotafcCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"bogotafc-co-siis-estado-2016":{"id":"bogotafc-co-siis-estado-2016","clubId":"bogotafc-co","title":"Bogota Futbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Bogota FC/siis-estado-2016.pdf"},"bogotafc-co-siis-estado-2017":{"id":"bogotafc-co-siis-estado-2017","clubId":"bogotafc-co","title":"Bogota Futbol Club S.A. — siis-estado-2017 (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Bogota FC/siis-estado-2017.pdf"}});

memberCountByClub["bogotafc-co"] = null;

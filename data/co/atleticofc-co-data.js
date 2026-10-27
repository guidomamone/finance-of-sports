// GENERADO desde data/co/atleticofc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const atleticofcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1143.089,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":9.88,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":876.445,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":23.368,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1389.192,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":9.375,"disclosureLevel":"aggregated"},
  ],
};

const atleticofcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-952.314,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-216.126,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-528.381,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-629.974,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-347.807,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-949.018,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-269.822,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-65.097,"disclosureLevel":"aggregated"},
  ],
};

const atleticofcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"atleticofc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.02,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":1152.969,"officialTotalExpenses":1168.44,"officialPAT":-15.451,"extraRows":[{"label":"Ingresos financieros","value":0.02},{"label":"Costos financieros","value":0},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1143.089,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Costo de ventas","lado":"expense","importe":0,"motivo":"Costo de ventas es 74% de los gastos: actividad deportiva (excepción por contenido de la regla de Colombia)","tipo":"cost_of_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":952.314,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2017: {"currency":"COP","sourceId":"atleticofc-co-siis-estado-2017","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2017-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":2.492,"grossDebt":null,"cash":null,"officialTotalRevenue":899.813,"officialTotalExpenses":1506.162,"officialPAT":-603.857,"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":876.445,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Costo de ventas","lado":"expense","importe":528.381,"motivo":"Costo de ventas es 74% de los gastos: actividad deportiva (excepción por contenido de la regla de Colombia)","tipo":"cost_of_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":0,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2018: {"currency":"COP","sourceId":"atleticofc-co-siis-estado-2018","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2018-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":-17.946,"grossDebt":null,"cash":null,"officialTotalRevenue":1398.567,"officialTotalExpenses":1283.937,"officialPAT":96.684,"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1389.192,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Costo de ventas","lado":"expense","importe":949.018,"motivo":"Costo de ventas es 74% de los gastos: actividad deportiva (excepción por contenido de la regla de Colombia)","tipo":"cost_of_sales"}],"baseIngreso":"full"},
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

Object.assign(sources, {"atleticofc-co-siis-estado-2016":{"id":"atleticofc-co-siis-estado-2016","clubId":"atleticofc-co","title":"Club Deportivo Atletico Futbol Club Sa — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Atletico FC/siis-estado-2016.pdf"},"atleticofc-co-siis-estado-2017":{"id":"atleticofc-co-siis-estado-2017","clubId":"atleticofc-co","title":"Club Deportivo Atletico Futbol Club Sa — siis-estado-2017 (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Atletico FC/siis-estado-2017.pdf"},"atleticofc-co-siis-estado-2018":{"id":"atleticofc-co-siis-estado-2018","clubId":"atleticofc-co","title":"Club Deportivo Atletico Futbol Club Sa — siis-estado-2018 (ejercicio 2018)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Atletico FC/siis-estado-2018.pdf"}});

memberCountByClub["atleticofc-co"] = null;

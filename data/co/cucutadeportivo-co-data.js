// GENERADO desde data/co/cucutadeportivo-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const cucutadeportivoCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":3216.538,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":718.886,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":3870.273,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":166.379,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":7582.398,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":10.435,"disclosureLevel":"aggregated"},
  ],
};

const cucutadeportivoCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-971.008,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1795.634,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-1576.058,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-1421.772,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2468.139,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-1061.715,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-3291.972,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-3267.055,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-1019.56,"disclosureLevel":"aggregated"},
  ],
};

const cucutadeportivoCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"cucutadeportivo-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":3935.424,"officialTotalExpenses":4342.7,"officialPAT":-407.276,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":0},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":3216.538,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":971.008,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2017: {"currency":"COP","sourceId":"cucutadeportivo-co-siis-estado-2017","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2017-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":4036.652,"officialTotalExpenses":4951.626,"officialPAT":-914.974,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":0},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":3870.273,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":1421.772,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2018: {"currency":"COP","sourceId":"cucutadeportivo-co-siis-estado-2018","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2018-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":7592.833,"officialTotalExpenses":7578.587,"officialPAT":14.246,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":7582.398,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":3291.972,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const cucutadeportivoCoPresupuestoOverlayByYear = {};

const cucutadeportivoCoPasesData = [];
const cucutadeportivoCoResultadosData = {};
const cucutadeportivoCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["cucutadeportivo-co"] = {
  revenueLinesByYear: cucutadeportivoCoRevenueLinesByYear, expenseLinesByYear: cucutadeportivoCoExpenseLinesByYear,
  fiscalYearMeta: cucutadeportivoCoFiscalYearMeta, pasesData: cucutadeportivoCoPasesData,
  resultadosData: cucutadeportivoCoResultadosData, titulosData: cucutadeportivoCoTitulosData,
  presupuestoOverlayByYear: cucutadeportivoCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"cucutadeportivo-co-siis-estado-2016":{"id":"cucutadeportivo-co-siis-estado-2016","clubId":"cucutadeportivo-co","title":"Cúcuta Deportivo Fútbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cucuta Deportivo/siis-estado-2016.pdf"},"cucutadeportivo-co-siis-estado-2017":{"id":"cucutadeportivo-co-siis-estado-2017","clubId":"cucutadeportivo-co","title":"Cúcuta Deportivo Fútbol Club S.A. — siis-estado-2017 (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cucuta Deportivo/siis-estado-2017.pdf"},"cucutadeportivo-co-siis-estado-2018":{"id":"cucutadeportivo-co-siis-estado-2018","clubId":"cucutadeportivo-co","title":"Cúcuta Deportivo Fútbol Club S.A. — siis-estado-2018 (ejercicio 2018)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cucuta Deportivo/siis-estado-2018.pdf"}});

memberCountByClub["cucutadeportivo-co"] = null;

// GENERADO desde data/co/tigresfc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const tigresfcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1188.443,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":73.24,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":3088.567,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":58.845,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":2100.508,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":42.617,"disclosureLevel":"aggregated"},
  ],
};

const tigresfcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-523.191,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-683.325,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-1265.527,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1772.032,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-466.172,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1527.972,"disclosureLevel":"aggregated"},
  ],
};

const tigresfcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"tigresfc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-60.221,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":1261.683,"officialTotalExpenses":1206.516,"officialPAT":-5.054,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":-60.221},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1188.443,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":0,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2017: {"currency":"COP","sourceId":"tigresfc-co-siis-estado-2017","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2017-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-93.78,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":3147.412,"officialTotalExpenses":3037.559,"officialPAT":16.073,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":-93.78},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":3088.567,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":0,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2018: {"currency":"COP","sourceId":"tigresfc-co-siis-estado-2018","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2018-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-108.147,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":2143.125,"officialTotalExpenses":1994.144,"officialPAT":40.834,"extraRows":[{"label":"Costos financieros","value":-108.147},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":2100.508,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
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

Object.assign(sources, {"tigresfc-co-siis-estado-2016":{"id":"tigresfc-co-siis-estado-2016","clubId":"tigresfc-co","title":"Tigres Fútbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Tigres FC/siis-estado-2016.pdf"},"tigresfc-co-siis-estado-2017":{"id":"tigresfc-co-siis-estado-2017","clubId":"tigresfc-co","title":"Tigres Fútbol Club S.A. — siis-estado-2017 (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Tigres FC/siis-estado-2017.pdf"},"tigresfc-co-siis-estado-2018":{"id":"tigresfc-co-siis-estado-2018","clubId":"tigresfc-co","title":"Tigres Fútbol Club S.A. — siis-estado-2018 (ejercicio 2018)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Tigres FC/siis-estado-2018.pdf"}});

memberCountByClub["tigresfc-co"] = null;

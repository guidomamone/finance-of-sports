// GENERADO desde data/co/leonesfc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const leonesfcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":3552.748,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":21.516,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":5490.044,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otras ganancias (pérdidas)","normalizedCategory":"other_income","amountNative":24.162,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":4191.777,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otras ganancias (pérdidas)","normalizedCategory":"other_income","amountNative":9.665,"disclosureLevel":"aggregated"},
  ],
};

const leonesfcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-3.502,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-357.23,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-3107.352,"disclosureLevel":"aggregated"},
  ],
  2017: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-439.393,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-4662.028,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-2.802,"disclosureLevel":"aggregated"},
  ],
  2018: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-215.303,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2918.377,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-2.521,"disclosureLevel":"aggregated"},
  ],
};

const leonesfcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"leonesfc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.416,"tax":-25.941,"grossDebt":null,"cash":null,"officialTotalRevenue":3574.264,"officialTotalExpenses":3468.084,"officialPAT":77.823,"extraRows":[{"label":"Costos financieros","value":-2.416},{"label":"Ingreso (gasto) por impuestos","value":-25.941}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":3552.748,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":357.23,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
  2017: {"currency":"COP","sourceId":"leonesfc-co-siis-estado-2017","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2017-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.174,"tax":-138.995,"grossDebt":null,"cash":null,"officialTotalRevenue":5514.206,"officialTotalExpenses":5104.223,"officialPAT":268.814,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":-2.174},{"label":"Ingreso (gasto) por impuestos","value":-138.995}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":5490.044,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":439.393,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
  2018: {"currency":"COP","sourceId":"leonesfc-co-siis-estado-2018","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2018-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1.74,"tax":-350.955,"grossDebt":null,"cash":null,"officialTotalRevenue":4201.442,"officialTotalExpenses":3136.201,"officialPAT":712.546,"extraRows":[{"label":"Costos financieros","value":-1.74},{"label":"Ingreso (gasto) por impuestos","value":-350.955}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":4191.777,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":215.303,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const leonesfcCoPresupuestoOverlayByYear = {};

const leonesfcCoPasesData = [];
const leonesfcCoResultadosData = {};
const leonesfcCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["leonesfc-co"] = {
  revenueLinesByYear: leonesfcCoRevenueLinesByYear, expenseLinesByYear: leonesfcCoExpenseLinesByYear,
  fiscalYearMeta: leonesfcCoFiscalYearMeta, pasesData: leonesfcCoPasesData,
  resultadosData: leonesfcCoResultadosData, titulosData: leonesfcCoTitulosData,
  presupuestoOverlayByYear: leonesfcCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"leonesfc-co-siis-estado-2016":{"id":"leonesfc-co-siis-estado-2016","clubId":"leonesfc-co","title":"Leones Fútbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Leones FC/siis-estado-2016.pdf"},"leonesfc-co-siis-estado-2017":{"id":"leonesfc-co-siis-estado-2017","clubId":"leonesfc-co","title":"Leones Fútbol Club S.A. — siis-estado-2017 (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Leones FC/siis-estado-2017.pdf"},"leonesfc-co-siis-estado-2018":{"id":"leonesfc-co-siis-estado-2018","clubId":"leonesfc-co","title":"Leones Fútbol Club S.A. — siis-estado-2018 (ejercicio 2018)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Leones FC/siis-estado-2018.pdf"}});

memberCountByClub["leonesfc-co"] = null;

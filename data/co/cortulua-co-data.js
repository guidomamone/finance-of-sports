// GENERADO desde data/co/cortulua-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const cortuluaCoRevenueLinesByYear = {
  2020: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":7080.765,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":2247.941,"disclosureLevel":"aggregated"},
  ],
  2021: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":6535.977,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":14056.427,"disclosureLevel":"aggregated"},
  ],
};

const cortuluaCoExpenseLinesByYear = {
  2020: [
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-8859.297,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
  ],
  2021: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-16242.59,"disclosureLevel":"aggregated"},
  ],
};

const cortuluaCoFiscalYearMeta = {
  2020: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2020","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2020-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-157.58,"tax":-100.465,"grossDebt":null,"cash":null,"officialTotalRevenue":9328.706,"officialTotalExpenses":8859.297,"officialPAT":211.364,"extraRows":[{"label":"Costos financieros","value":-157.58},{"label":"Ingreso (gasto) por impuestos","value":-100.465}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":7080.765,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
  2021: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2021","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2021-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-258.149,"tax":-513.877,"grossDebt":null,"cash":null,"officialTotalRevenue":20592.404,"officialTotalExpenses":16242.59,"officialPAT":3577.788,"extraRows":[{"label":"Costos financieros","value":-258.149},{"label":"Ingreso (gasto) por impuestos","value":-513.877}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":6535.977,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":16242.59,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const cortuluaCoPresupuestoOverlayByYear = {};

const cortuluaCoPasesData = [];
const cortuluaCoResultadosData = {};
const cortuluaCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["cortulua-co"] = {
  revenueLinesByYear: cortuluaCoRevenueLinesByYear, expenseLinesByYear: cortuluaCoExpenseLinesByYear,
  fiscalYearMeta: cortuluaCoFiscalYearMeta, pasesData: cortuluaCoPasesData,
  resultadosData: cortuluaCoResultadosData, titulosData: cortuluaCoTitulosData,
  presupuestoOverlayByYear: cortuluaCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"cortulua-co-siis-estado-2020":{"id":"cortulua-co-siis-estado-2020","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2020 (ejercicio 2020)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2020.pdf"},"cortulua-co-siis-estado-2021":{"id":"cortulua-co-siis-estado-2021","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2021 (ejercicio 2021)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2021.pdf"}});

memberCountByClub["cortulua-co"] = null;

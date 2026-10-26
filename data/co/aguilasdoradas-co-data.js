// GENERADO desde data/co/aguilasdoradas-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const aguilasdoradasCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":9487.082,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":361.463,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":26735.986,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":723.998,"disclosureLevel":"aggregated"},
  ],
};

const aguilasdoradasCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-582.17,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-8082.85,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-81.618,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-117.156,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-17658.317,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2744.462,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-478.829,"disclosureLevel":"aggregated"},
  ],
};

const aguilasdoradasCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"aguilasdoradas-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-53.759,"tax":-308.432,"grossDebt":null,"cash":null,"officialTotalRevenue":9848.545,"officialTotalExpenses":8746.638,"officialPAT":739.716,"extraRows":[{"label":"Costos financieros","value":-53.759},{"label":"Ingreso (gasto) por impuestos","value":-308.432}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":9487.082,"motivo":"Línea única de ingresos sin abrir: lump_football_operations (regla de Colombia, 463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":582.17,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
  2024: {"currency":"COP","sourceId":"aguilasdoradas-co-siis-estado-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":323.344,"tax":-1292.477,"grossDebt":null,"cash":null,"officialTotalRevenue":27459.984,"officialTotalExpenses":20998.764,"officialPAT":5492.087,"extraRows":[{"label":"Ingresos financieros","value":453.755},{"label":"Costos financieros","value":-130.411},{"label":"Ingreso (gasto) por impuestos","value":-1292.477}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":26735.986,"motivo":"Línea única de ingresos sin abrir: lump_football_operations (regla de Colombia, 463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":17658.317,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const aguilasdoradasCoPresupuestoOverlayByYear = {};

const aguilasdoradasCoPasesData = [];
const aguilasdoradasCoResultadosData = {};
const aguilasdoradasCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["aguilasdoradas-co"] = {
  revenueLinesByYear: aguilasdoradasCoRevenueLinesByYear, expenseLinesByYear: aguilasdoradasCoExpenseLinesByYear,
  fiscalYearMeta: aguilasdoradasCoFiscalYearMeta, pasesData: aguilasdoradasCoPasesData,
  resultadosData: aguilasdoradasCoResultadosData, titulosData: aguilasdoradasCoTitulosData,
  presupuestoOverlayByYear: aguilasdoradasCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"aguilasdoradas-co-siis-estado-2024":{"id":"aguilasdoradas-co-siis-estado-2024","clubId":"aguilasdoradas-co","title":"Talento Dorado S.A. — siis-estado-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Aguilas Doradas/siis-estado-2024.pdf"},"aguilasdoradas-co-siis-estado-2016":{"id":"aguilasdoradas-co-siis-estado-2016","clubId":"aguilasdoradas-co","title":"Talento Dorado S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Aguilas Doradas/siis-estado-2016.pdf"}});

memberCountByClub["aguilasdoradas-co"] = null;

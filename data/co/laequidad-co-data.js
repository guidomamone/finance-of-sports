// GENERADO desde data/co/laequidad-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const laequidadCoRevenueLinesByYear = {
  2023: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":20007.369,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":1710.231,"disclosureLevel":"aggregated"},
  ],
};

const laequidadCoExpenseLinesByYear = {
  2023: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-138.663,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-16277.847,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2084.126,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-266.793,"disclosureLevel":"aggregated"},
  ],
};

const laequidadCoFiscalYearMeta = {
  2023: {"currency":"COP","sourceId":"laequidad-co-siis-estado-2023","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2023-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1796.694,"tax":-581.746,"grossDebt":null,"cash":null,"officialTotalRevenue":21717.6,"officialTotalExpenses":18767.429,"officialPAT":571.731,"extraRows":[{"label":"Ingresos financieros","value":60.828},{"label":"Costos financieros","value":-1857.522},{"label":"Ingreso (gasto) por impuestos","value":-581.746}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":20007.369,"motivo":"Línea única de ingresos sin abrir: lump_football_operations (regla de Colombia, 463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":16277.847,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const laequidadCoPresupuestoOverlayByYear = {};

const laequidadCoPasesData = [];
const laequidadCoResultadosData = {};
const laequidadCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["laequidad-co"] = {
  revenueLinesByYear: laequidadCoRevenueLinesByYear, expenseLinesByYear: laequidadCoExpenseLinesByYear,
  fiscalYearMeta: laequidadCoFiscalYearMeta, pasesData: laequidadCoPasesData,
  resultadosData: laequidadCoResultadosData, titulosData: laequidadCoTitulosData,
  presupuestoOverlayByYear: laequidadCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"laequidad-co-siis-estado-2023":{"id":"laequidad-co-siis-estado-2023","clubId":"laequidad-co","title":"IDBDC Albinegro S.A. — siis-estado-2023 (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/La Equidad/siis-estado-2023.pdf"}});

memberCountByClub["laequidad-co"] = null;

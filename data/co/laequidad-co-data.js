// GENERADO desde data/co/laequidad-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const laequidadCoRevenueLinesByYear = {
  2023: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":20007.369,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":1710.231,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":20614.852,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":14058.593,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":20612.236,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":11825.819,"disclosureLevel":"aggregated"},
  ],
};

const laequidadCoExpenseLinesByYear = {
  2023: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-138.663,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-16277.847,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2084.126,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-266.793,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-127.399,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-2471.578,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-24415.721,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-319.542,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-555.558,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-29012.937,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2763.306,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-1271.411,"disclosureLevel":"aggregated"},
  ],
};

const laequidadCoFiscalYearMeta = {
  2023: {"currency":"COP","sourceId":"laequidad-co-siis-estado-2023","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2023-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1796.694,"tax":-581.746,"grossDebt":null,"cash":null,"officialTotalRevenue":21717.6,"officialTotalExpenses":18767.429,"officialPAT":571.731,"extraRows":[{"label":"Ingresos financieros","value":60.828},{"label":"Costos financieros","value":-1857.522},{"label":"Ingreso (gasto) por impuestos","value":-581.746}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":20007.369,"motivo":"Línea única de ingresos sin abrir: lump_football_operations (regla de Colombia, 463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":16277.847,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
  2024: {"currency":"COP","sourceId":"laequidad-co-siis-estado-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1163.442,"tax":-2248.061,"grossDebt":null,"cash":null,"officialTotalRevenue":34673.445,"officialTotalExpenses":27334.24,"officialPAT":3927.702,"extraRows":[{"label":"Costos financieros","value":-1163.442},{"label":"Ingreso (gasto) por impuestos","value":-2248.061}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":20614.852,"motivo":"Línea única de ingresos sin abrir: lump_football_operations (regla de Colombia, 463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":2471.578,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
  2025: {"currency":"COP","sourceId":"laequidad-co-siis-estado-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-377.89,"tax":-42.928,"grossDebt":null,"cash":null,"officialTotalRevenue":32438.055,"officialTotalExpenses":33603.212,"officialPAT":-1585.975,"extraRows":[{"label":"Costos financieros","value":-377.89},{"label":"Ingreso (gasto) por impuestos","value":-42.928}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":20612.236,"motivo":"Línea única de ingresos sin abrir: lump_football_operations (regla de Colombia, 463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":29012.937,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
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

Object.assign(sources, {"laequidad-co-siis-estado-2023":{"id":"laequidad-co-siis-estado-2023","clubId":"laequidad-co","title":"IDBDC Albinegro S.A. — siis-estado-2023 (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/La Equidad/siis-estado-2023.pdf"},"laequidad-co-siis-estado-2024":{"id":"laequidad-co-siis-estado-2024","clubId":"laequidad-co","title":"IDBDC Albinegro S.A. — siis-estado-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/La Equidad/siis-estado-2024.pdf"},"laequidad-co-siis-estado-2025":{"id":"laequidad-co-siis-estado-2025","clubId":"laequidad-co","title":"IDBDC Albinegro S.A. — siis-estado-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/La Equidad/siis-estado-2025.pdf"}});

memberCountByClub["laequidad-co"] = null;

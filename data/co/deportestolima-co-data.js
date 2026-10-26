// GENERADO desde data/co/deportestolima-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const deportestolimaCoRevenueLinesByYear = {
  2023: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":33320.417,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":3099.225,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":45544.864,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":1973.19,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otras ganancias (pérdidas)","normalizedCategory":"other_income","amountNative":227.675,"disclosureLevel":"aggregated"},
  ],
};

const deportestolimaCoExpenseLinesByYear = {
  2023: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-1659.803,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-31753.876,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-4021.941,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-558.943,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-2632.78,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-5166.142,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-37305.416,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-1006.202,"disclosureLevel":"aggregated"},
  ],
};

const deportestolimaCoFiscalYearMeta = {
  2023: {"currency":"COP","sourceId":"deportestolima-co-siis-estado-2023","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2023-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":-11.008,"grossDebt":null,"cash":null,"officialTotalRevenue":36419.642,"officialTotalExpenses":37994.563,"officialPAT":-1585.929,"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":33320.417,"motivo":"Línea única de ingresos que el estado de SIIS no abre: va a la categoría de fútbol sin desglosar, como Omzet o Chiffre d'affaires de los clubes belgas y argentinos; el precedente de Tolima es la regla de Gastos de ventas (463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":31753.876,"motivo":"Regla votada 2026-10-26: «Gastos de ventas» sin abrir va a lump_football_operations_expense","tipo":"other"}],"baseIngreso":"full"},
  2024: {"currency":"COP","sourceId":"deportestolima-co-siis-estado-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":-720.859,"grossDebt":null,"cash":null,"officialTotalRevenue":47745.729,"officialTotalExpenses":46110.54,"officialPAT":914.33,"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":45544.864,"motivo":"Línea única de ingresos que el estado de SIIS no abre: va a la categoría de fútbol sin desglosar, como Omzet o Chiffre d'affaires de los clubes belgas y argentinos; el precedente de Tolima es la regla de Gastos de ventas (463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":5166.142,"motivo":"Regla votada 2026-10-26: «Gastos de ventas» sin abrir va a lump_football_operations_expense","tipo":"other"}],"baseIngreso":"full"},
};

const deportestolimaCoPresupuestoOverlayByYear = {};

const deportestolimaCoPasesData = [];
const deportestolimaCoResultadosData = {};
const deportestolimaCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["deportestolima-co"] = {
  revenueLinesByYear: deportestolimaCoRevenueLinesByYear, expenseLinesByYear: deportestolimaCoExpenseLinesByYear,
  fiscalYearMeta: deportestolimaCoFiscalYearMeta, pasesData: deportestolimaCoPasesData,
  resultadosData: deportestolimaCoResultadosData, titulosData: deportestolimaCoTitulosData,
  presupuestoOverlayByYear: deportestolimaCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"deportestolima-co-siis-estado-2023":{"id":"deportestolima-co-siis-estado-2023","clubId":"deportestolima-co","title":"Club Deportes Tolima S.A. — siis-estado-2023 (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Deportes Tolima/siis-estado-2023.pdf"},"deportestolima-co-siis-estado-2024":{"id":"deportestolima-co-siis-estado-2024","clubId":"deportestolima-co","title":"Club Deportes Tolima S.A. — siis-estado-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Deportes Tolima/siis-estado-2024.pdf"}});

memberCountByClub["deportestolima-co"] = null;

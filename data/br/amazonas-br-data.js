// GENERADO desde data/br/amazonas-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const amazonasBrRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Receita de Atividades Esportivas","normalizedCategory":"lump_football_operations","amountNative":36.0557646,"disclosureLevel":"aggregate"},
  ],
};

const amazonasBrExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Custo das atividades Esportivas","normalizedCategory":"lump_football_operations_expense","amountNative":-33.06579984,"disclosureLevel":"aggregate"},
    {"rawLabel":"Despesas Administrativas","normalizedCategory":"admin_general_expense","amountNative":-2.54805502,"disclosureLevel":"aggregate"},
    {"rawLabel":"Despesas Comerciais","normalizedCategory":"admin_general_expense","amountNative":-2.85553898,"disclosureLevel":"aggregate"},
    {"rawLabel":"Despesas Tributárias","normalizedCategory":"admin_general_expense","amountNative":-0.95349552,"disclosureLevel":"aggregate"},
    {"rawLabel":"Outras Despesas Operacionais","normalizedCategory":"other_expenses","amountNative":-0.00060156,"disclosureLevel":"aggregate"},
  ],
};

const amazonasBrFiscalYearMeta = {
  2024: {"currency":"BRL","sourceId":"amazonas-br-balanco-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"BRL@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.01401904,"tax":0,"grossDebt":0.9230075,"cash":0.12759833,"officialTotalRevenue":36.0557646,"officialTotalExpenses":39.42349092,"officialPAT":-3.38174536,"sinDesglose":[{"renglon":"Receita de Atividades Esportivas","lado":"revenue","importe":36.055765,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Custo das atividades Esportivas","lado":"expense","importe":33.0658,"motivo":"el documento no desglosa este renglón","tipo":"cost_of_sales"}]},
};

const amazonasBrPresupuestoOverlayByYear = {};

const amazonasBrPasesData = [];
const amazonasBrResultadosData = {};
const amazonasBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["amazonas-br"] = {
  revenueLinesByYear: amazonasBrRevenueLinesByYear, expenseLinesByYear: amazonasBrExpenseLinesByYear,
  fiscalYearMeta: amazonasBrFiscalYearMeta, pasesData: amazonasBrPasesData,
  resultadosData: amazonasBrResultadosData, titulosData: amazonasBrTitulosData,
  presupuestoOverlayByYear: amazonasBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"amazonas-br-balanco-2024":{"id":"amazonas-br-balanco-2024","clubId":"amazonas-br","title":"Balanço Patrimonial em 31/12/2024 (Amazonas FC)","type":"official_balance_sheet","reliability":"primary","url":"https://web.archive.org/web/2026/https://amazonasfc.com.br/site/pagina/transparencia/"}});

memberCountByClub["amazonas-br"] = null;

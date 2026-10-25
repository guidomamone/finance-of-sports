// GENERADO desde data/br/mirassol-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const mirassolBrRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Receita do exercício (bruta, operacional — sem desagregação na fonte)","normalizedCategory":"lump_football_operations","amountNative":59.339448,"disclosureLevel":"aggregated"},
  ],
};

const mirassolBrExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Custos","normalizedCategory":"lump_football_operations_expense","amountNative":-36.105741,"disclosureLevel":"aggregated"},
    {"rawLabel":"Despesas operacionais","normalizedCategory":"admin_general_expense","amountNative":-19.090093,"disclosureLevel":"aggregated"},
  ],
};

const mirassolBrFiscalYearMeta = {
  2024: {"currency":"BRL","sourceId":"mirassol-br-relatorio-auditoria-2024","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":0,"cash":11.583747,"officialTotalRevenue":59.339448,"officialTotalExpenses":55.195834,"officialPAT":4.143614,"sinDesglose":[{"renglon":"Receita do exercício (bruta, operacional — sem desagregação na fonte)","lado":"revenue","importe":59.339448,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Custos","lado":"expense","importe":36.105741,"motivo":"el documento no desglosa este renglón","tipo":"other"}]},
};

const mirassolBrPresupuestoOverlayByYear = {};

const mirassolBrPasesData = [];
const mirassolBrResultadosData = {};
const mirassolBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["mirassol-br"] = {
  revenueLinesByYear: mirassolBrRevenueLinesByYear, expenseLinesByYear: mirassolBrExpenseLinesByYear,
  fiscalYearMeta: mirassolBrFiscalYearMeta, pasesData: mirassolBrPasesData,
  resultadosData: mirassolBrResultadosData, titulosData: mirassolBrTitulosData,
  presupuestoOverlayByYear: mirassolBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"mirassol-br-relatorio-auditoria-2024":{"id":"mirassol-br-relatorio-auditoria-2024","clubId":"mirassol-br","title":"Relatório de Auditoria Contábil, Exercício 2024","type":"official_balance_sheet","reliability":"primary","url":"https://mirassolfc.com.br/"}});

gestionesByClub["mirassol-br"] = {"sinconfirmar":{"nombre":"Gestión actual","firstYear":2024,"lastYear":2024}};

memberCountByClub["mirassol-br"] = null;

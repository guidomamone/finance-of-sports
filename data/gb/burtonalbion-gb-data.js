// GENERADO desde data/gb/burtonalbion-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const burtonalbionGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Football league distrubutions","normalizedCategory":"broadcasting","amountNative":2.85948,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercial income","normalizedCategory":"sponsorship_commercial","amountNative":2.652423,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gate receipts","normalizedCategory":"matchday_competition","amountNative":0.902567,"disclosureLevel":"aggregated"},
    {"rawLabel":"Net rents receivable","normalizedCategory":"other_income","amountNative":0.03125,"disclosureLevel":"aggregated"},
    {"rawLabel":"Release of grant income","normalizedCategory":"other_income","amountNative":0.080623,"disclosureLevel":"aggregated"},
    {"rawLabel":"Fees receivable","normalizedCategory":"other_income","amountNative":0.012075,"disclosureLevel":"aggregated"},
    {"rawLabel":"Profit on disposal of player registrations","normalizedCategory":"player_sales","amountNative":0.234726,"disclosureLevel":"aggregated"},
  ],
};

const burtonalbionGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-8.044102,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-7.076727,"disclosureLevel":"aggregated"},
  ],
};

const burtonalbionGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"burtonalbion-gb-burton-full-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.003704,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":6.773144,"officialTotalExpenses":15.120829,"officialPAT":-8.343981,"extraRows":[{"label":"Interest receivable and similar income","value":0.005605},{"label":"Interest payable and similar expenses","value":-0.001901},{"label":"Tax on loss","value":null}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true}},"baseIngreso":"full"},
};

const burtonalbionGbPresupuestoOverlayByYear = {};

const burtonalbionGbPasesData = [];
const burtonalbionGbResultadosData = {};
const burtonalbionGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["burtonalbion-gb"] = {
  revenueLinesByYear: burtonalbionGbRevenueLinesByYear, expenseLinesByYear: burtonalbionGbExpenseLinesByYear,
  fiscalYearMeta: burtonalbionGbFiscalYearMeta, pasesData: burtonalbionGbPasesData,
  resultadosData: burtonalbionGbResultadosData, titulosData: burtonalbionGbTitulosData,
  presupuestoOverlayByYear: burtonalbionGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"burtonalbion-gb-burton-full-accounts-2024-25-ixbrl":{"id":"burtonalbion-gb-burton-full-accounts-2024-25-ixbrl","clubId":"burtonalbion-gb","title":"The Albion Football Club (Burton on Trent) Limited — burton-full-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)","url":"https://find-and-update.company-information.service.gov.uk/company/00488096/filing-history/MzUwNTY2MDQyNWFkaXF6a2N4/document?format=xhtml&download=0","documento":"Clubes/Inglaterra/Burton Albion/burton-full-accounts-2024-25-ixbrl.pdf"}});

memberCountByClub["burtonalbion-gb"] = null;

// GENERADO desde data/gb/shrewsburytown-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const shrewsburytownGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ticket Sales","normalizedCategory":"matchday_competition","amountNative":1.840131,"disclosureLevel":"aggregated"},
    {"rawLabel":"Football League income","normalizedCategory":"broadcasting","amountNative":2.363353,"disclosureLevel":"aggregated"},
    {"rawLabel":"Transfer fees","normalizedCategory":"player_sales","amountNative":0.250931,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sundry Income","normalizedCategory":"other_income","amountNative":1.353709,"disclosureLevel":"aggregated"},
    {"rawLabel":"Academy income","normalizedCategory":"youth_football","amountNative":0.555635,"disclosureLevel":"aggregated"},
    {"rawLabel":"Television and internet portal income","normalizedCategory":"broadcasting","amountNative":0.022903,"disclosureLevel":"aggregated"},
    {"rawLabel":"Contributions from support organisations","normalizedCategory":"grants_donations","amountNative":0.040037,"disclosureLevel":"aggregated"},
    {"rawLabel":"Food and Beverage sales","normalizedCategory":"stadium_other","amountNative":0.787364,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other operating income","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const shrewsburytownGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-6.948641,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-1.188028,"disclosureLevel":"aggregated"},
  ],
};

const shrewsburytownGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"shrewsburytown-gb-shrewsbury-full-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.003898,"tax":0.327092,"grossDebt":null,"cash":null,"officialTotalRevenue":7.214063,"officialTotalExpenses":8.136669,"officialPAT":-0.599412,"extraRows":[{"label":"Other interest receivable and similar income","value":null},{"label":"Interest payable and similar expenses","value":-0.003898},{"label":"Tax on loss","value":0.327092}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true},"member_dues":{"en":"other_income","posible":true}}},
};

const shrewsburytownGbPresupuestoOverlayByYear = {};

const shrewsburytownGbPasesData = [];
const shrewsburytownGbResultadosData = {};
const shrewsburytownGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["shrewsburytown-gb"] = {
  revenueLinesByYear: shrewsburytownGbRevenueLinesByYear, expenseLinesByYear: shrewsburytownGbExpenseLinesByYear,
  fiscalYearMeta: shrewsburytownGbFiscalYearMeta, pasesData: shrewsburytownGbPasesData,
  resultadosData: shrewsburytownGbResultadosData, titulosData: shrewsburytownGbTitulosData,
  presupuestoOverlayByYear: shrewsburytownGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"shrewsburytown-gb-shrewsbury-full-accounts-2024-25-ixbrl":{"id":"shrewsburytown-gb-shrewsbury-full-accounts-2024-25-ixbrl","clubId":"shrewsburytown-gb","title":"Shrewsbury Town Football Club Limited — shrewsbury-full-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)","url":"https://find-and-update.company-information.service.gov.uk/company/00315587/filing-history/MzUwNzE1NjYzNGFkaXF6a2N4/document?format=xhtml&download=0"}});

memberCountByClub["shrewsburytown-gb"] = null;

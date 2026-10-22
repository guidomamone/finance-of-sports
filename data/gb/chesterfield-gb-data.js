// GENERADO desde data/gb/chesterfield-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const chesterfieldGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Gates and season tickets","normalizedCategory":"matchday_competition","amountNative":4.12574,"disclosureLevel":"aggregated"},
    {"rawLabel":"TV and football awards","normalizedCategory":"broadcasting","amountNative":0.074626,"disclosureLevel":"aggregated"},
    {"rawLabel":"Transfer fees","normalizedCategory":"player_sales","amountNative":0.343466,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercial income","normalizedCategory":"sponsorship_commercial","amountNative":2.54526,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other income","normalizedCategory":"other_income","amountNative":0.714996,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortisation of government grants receivable","normalizedCategory":"other_income","amountNative":0.073349,"disclosureLevel":"aggregated"},
    {"rawLabel":"Lease premium income","normalizedCategory":"other_income","amountNative":0.0056,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other grants receivable","normalizedCategory":"other_income","amountNative":0.0024,"disclosureLevel":"aggregated"},
  ],
};

const chesterfieldGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-0.941478,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-9.162496,"disclosureLevel":"aggregated"},
  ],
};

const chesterfieldGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"chesterfield-gb-cfc2001-medium-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.164358,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":7.885437,"officialTotalExpenses":10.103974,"officialPAT":-2.382893,"extraRows":[{"label":"Interest receivable and similar income","value":-0.000001},{"label":"Interest payable and similar expenses","value":-0.164357},{"label":"Tax on loss","value":null}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true}}},
};

const chesterfieldGbPresupuestoOverlayByYear = {};

const chesterfieldGbPasesData = [];
const chesterfieldGbResultadosData = {};
const chesterfieldGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["chesterfield-gb"] = {
  revenueLinesByYear: chesterfieldGbRevenueLinesByYear, expenseLinesByYear: chesterfieldGbExpenseLinesByYear,
  fiscalYearMeta: chesterfieldGbFiscalYearMeta, pasesData: chesterfieldGbPasesData,
  resultadosData: chesterfieldGbResultadosData, titulosData: chesterfieldGbTitulosData,
  presupuestoOverlayByYear: chesterfieldGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"chesterfield-gb-cfc2001-medium-accounts-2024-25-ixbrl":{"id":"chesterfield-gb-cfc2001-medium-accounts-2024-25-ixbrl","clubId":"chesterfield-gb","title":"Chesterfield — cfc2001-medium-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)","url":"https://find-and-update.company-information.service.gov.uk/company/04273743/filing-history/MzUwOTkwNDI0OWFkaXF6a2N4/document?format=xhtml&download=0"}});

memberCountByClub["chesterfield-gb"] = null;

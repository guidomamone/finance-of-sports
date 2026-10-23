// GENERADO desde data/gb/lincolncity-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const lincolncityGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Matchday","normalizedCategory":"matchday_competition","amountNative":2.8518,"disclosureLevel":"aggregated"},
    {"rawLabel":"Central distribution and grants","normalizedCategory":"broadcasting","amountNative":2.275433,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercial, hospitality and retail","normalizedCategory":"sponsorship_commercial","amountNative":1.909729,"disclosureLevel":"aggregated"},
    {"rawLabel":"Academy grants and fundraising","normalizedCategory":"youth_football","amountNative":0.775767,"disclosureLevel":"aggregated"},
    {"rawLabel":"Football fortune and miscellaneous income","normalizedCategory":"other_income","amountNative":0.665579,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other operating income","normalizedCategory":"other_income","amountNative":0.69424,"disclosureLevel":"aggregated"},
  ],
};

const lincolncityGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-0.604423,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-11.436136,"disclosureLevel":"aggregated"},
  ],
};

const lincolncityGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"lincolncity-gb-lincoln-medium-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.012991,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":9.172548,"officialTotalExpenses":12.040559,"officialPAT":-2.881002,"extraRows":[{"label":"Interest payable and similar expenses","value":-0.012991},{"label":"Tax on loss","value":null}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true},"member_dues":{"en":"matchday_competition","posible":true}}},
};

const lincolncityGbPresupuestoOverlayByYear = {};

const lincolncityGbPasesData = [];
const lincolncityGbResultadosData = {};
const lincolncityGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["lincolncity-gb"] = {
  revenueLinesByYear: lincolncityGbRevenueLinesByYear, expenseLinesByYear: lincolncityGbExpenseLinesByYear,
  fiscalYearMeta: lincolncityGbFiscalYearMeta, pasesData: lincolncityGbPasesData,
  resultadosData: lincolncityGbResultadosData, titulosData: lincolncityGbTitulosData,
  presupuestoOverlayByYear: lincolncityGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"lincolncity-gb-lincoln-medium-accounts-2024-25-ixbrl":{"id":"lincolncity-gb-lincoln-medium-accounts-2024-25-ixbrl","clubId":"lincolncity-gb","title":"Lincoln City Football Club Company Limited — lincoln-medium-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)","url":"https://find-and-update.company-information.service.gov.uk/company/00045611/filing-history/MzQ5OTMxNDk0MGFkaXF6a2N4/document?format=xhtml&download=0","documento":"Clubes/Inglaterra/Lincoln City/lincoln-medium-accounts-2024-25-ixbrl.pdf"}});

memberCountByClub["lincolncity-gb"] = null;

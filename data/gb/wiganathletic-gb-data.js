// GENERADO desde data/gb/wiganathletic-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const wiganathleticGbRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Premier League distributions","normalizedCategory":"broadcasting","amountNative":0.7785,"disclosureLevel":"aggregated"},
    {"rawLabel":"EFL central distributions","normalizedCategory":"broadcasting","amountNative":1.371627,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsorship, commercial","normalizedCategory":"sponsorship_commercial","amountNative":1.594484,"disclosureLevel":"aggregated"},
    {"rawLabel":"Match/Season/Cup Tickets","normalizedCategory":"matchday_competition","amountNative":2.378645,"disclosureLevel":"aggregated"},
    {"rawLabel":"Stadium hire/rental charges","normalizedCategory":"stadium_other","amountNative":0.821697,"disclosureLevel":"aggregated"},
    {"rawLabel":"Academy grants","normalizedCategory":"youth_football","amountNative":0.831025,"disclosureLevel":"aggregated"},
    {"rawLabel":"Retail income","normalizedCategory":"sponsorship_commercial","amountNative":0.704355,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other income","normalizedCategory":"other_income","amountNative":0.367778,"disclosureLevel":"aggregated"},
    {"rawLabel":"Cup broadcasting","normalizedCategory":"broadcasting","amountNative":0.22,"disclosureLevel":"aggregated"},
    {"rawLabel":"Cup prize money","normalizedCategory":"competition_bonus","amountNative":0.178,"disclosureLevel":"aggregated"},
    {"rawLabel":"Profit on sale of intangible fixed assets","normalizedCategory":"player_sales","amountNative":0.748978,"disclosureLevel":"aggregated"},
  ],
};

const wiganathleticGbExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-0.881525,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-17.346415,"disclosureLevel":"aggregated"},
  ],
};

const wiganathleticGbFiscalYearMeta = {
  2024: {"currency":"GBP","sourceId":"wiganathletic-gb-wigan-full-accounts-2023-24-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.007538,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":9.995089,"officialTotalExpenses":18.22794,"officialPAT":-8.225313,"extraRows":[{"label":"Interest receivable and similar income","value":0.007538},{"label":"Tax on loss","value":null}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true}}},
};

const wiganathleticGbPresupuestoOverlayByYear = {};

const wiganathleticGbPasesData = [];
const wiganathleticGbResultadosData = {};
const wiganathleticGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["wiganathletic-gb"] = {
  revenueLinesByYear: wiganathleticGbRevenueLinesByYear, expenseLinesByYear: wiganathleticGbExpenseLinesByYear,
  fiscalYearMeta: wiganathleticGbFiscalYearMeta, pasesData: wiganathleticGbPasesData,
  resultadosData: wiganathleticGbResultadosData, titulosData: wiganathleticGbTitulosData,
  presupuestoOverlayByYear: wiganathleticGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"wiganathletic-gb-wigan-full-accounts-2023-24-ixbrl":{"id":"wiganathletic-gb-wigan-full-accounts-2023-24-ixbrl","clubId":"wiganathletic-gb","title":"Wigan Athletic A.F.C. Limited — wigan-full-accounts-2023-24-ixbrl (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)","url":"https://find-and-update.company-information.service.gov.uk/company/13161421/filing-history/MzQ2MDQ2MTgxOGFkaXF6a2N4/document?format=xhtml&download=0","documento":"Clubes/Inglaterra/Wigan Athletic/wigan-full-accounts-2023-24-ixbrl.pdf"}});

memberCountByClub["wiganathletic-gb"] = null;

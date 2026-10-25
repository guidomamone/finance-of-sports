// GENERADO desde data/gb/gillingham-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const gillinghamGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Football","normalizedCategory":"matchday_competition","amountNative":3.495463,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercial","normalizedCategory":"sponsorship_commercial","amountNative":2.334535,"disclosureLevel":"aggregated"},
    {"rawLabel":"School","normalizedCategory":"education","amountNative":0.068491,"disclosureLevel":"aggregated"},
    {"rawLabel":"Shop","normalizedCategory":"sponsorship_commercial","amountNative":0.518864,"disclosureLevel":"aggregated"},
    {"rawLabel":"Youth Academy","normalizedCategory":"youth_football","amountNative":0.652507,"disclosureLevel":"aggregated"},
    {"rawLabel":"Programmes","normalizedCategory":"sponsorship_commercial","amountNative":0.053741,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kiosks","normalizedCategory":"stadium_other","amountNative":0.359451,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sundry income and donation","normalizedCategory":"other_income","amountNative":0.012463,"disclosureLevel":"aggregated"},
    {"rawLabel":"Transfer fees","normalizedCategory":"player_sales","amountNative":0.035,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other operating income","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const gillinghamGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-10.057281,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-3.194908,"disclosureLevel":"aggregated"},
  ],
};

const gillinghamGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"gillingham-gb-medium-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.015884,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":7.530515,"officialTotalExpenses":13.252189,"officialPAT":-5.737558,"extraRows":[{"label":"Interest payable and similar expenses","value":-0.015884},{"label":"Tax on loss","value":null}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true},"broadcasting":{"en":"matchday_competition","posible":true}},"baseIngreso":"full"},
};

const gillinghamGbPresupuestoOverlayByYear = {};

const gillinghamGbPasesData = [];
const gillinghamGbResultadosData = {};
const gillinghamGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["gillingham-gb"] = {
  revenueLinesByYear: gillinghamGbRevenueLinesByYear, expenseLinesByYear: gillinghamGbExpenseLinesByYear,
  fiscalYearMeta: gillinghamGbFiscalYearMeta, pasesData: gillinghamGbPasesData,
  resultadosData: gillinghamGbResultadosData, titulosData: gillinghamGbTitulosData,
  presupuestoOverlayByYear: gillinghamGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"gillingham-gb-medium-accounts-2024-25-ixbrl":{"id":"gillingham-gb-medium-accounts-2024-25-ixbrl","clubId":"gillingham-gb","title":"Gillingham Football Club Ltd — gillingham-medium-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)","documento":"Clubes/Inglaterra/Gillingham/gillingham-medium-accounts-2024-25-ixbrl.pdf"}});

memberCountByClub["gillingham-gb"] = null;

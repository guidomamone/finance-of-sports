// GENERADO desde data/gb/afcwimbledon-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const afcwimbledonGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Match receipts, player loans and prize money","normalizedCategory":"matchday_competition","amountNative":5.858414,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise and programmes","normalizedCategory":"sponsorship_commercial","amountNative":1.081991,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsorships and advertising","normalizedCategory":"sponsorship_commercial","amountNative":0.990532,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bar and catering","normalizedCategory":"other_income","amountNative":0.861032,"disclosureLevel":"aggregated"},
    {"rawLabel":"Donations and sundry","normalizedCategory":"other_income","amountNative":0.446091,"disclosureLevel":"aggregated"},
    {"rawLabel":"Youth development income","normalizedCategory":"youth_football","amountNative":0.546023,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gain on disposal of players' registrations","normalizedCategory":"player_sales","amountNative":0.972266,"disclosureLevel":"aggregated"},
    {"rawLabel":"Grants receivable","normalizedCategory":"grants_donations","amountNative":0.025,"disclosureLevel":"aggregated"},
    {"rawLabel":"Insurance claim","normalizedCategory":"other_income","amountNative":0.960556,"disclosureLevel":"aggregated"},
    {"rawLabel":"Flood Donations","normalizedCategory":"grants_donations","amountNative":0.146424,"disclosureLevel":"aggregated"},
  ],
};

const afcwimbledonGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-8.223069,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-4.183724,"disclosureLevel":"aggregated"},
    {"rawLabel":"Exceptional administrative expenses","normalizedCategory":"exceptional_items","amountNative":-0.881019,"disclosureLevel":"aggregated"},
  ],
};

const afcwimbledonGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"afcwimbledon-gb-full-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.09507,"tax":0.083392,"grossDebt":null,"cash":null,"officialTotalRevenue":11.888329,"officialTotalExpenses":12.406793,"officialPAT":-1.221022,"extraRows":[{"label":"Interest receivable and similar income","value":0.100329},{"label":"Interest payable and similar expenses","value":-0.005259},{"label":"Tax on (loss)/profit","value":0.083392}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true},"broadcasting":{"en":"matchday_competition","posible":true}}},
};

const afcwimbledonGbPresupuestoOverlayByYear = {};

const afcwimbledonGbPasesData = [];
const afcwimbledonGbResultadosData = {};
const afcwimbledonGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["afcwimbledon-gb"] = {
  revenueLinesByYear: afcwimbledonGbRevenueLinesByYear, expenseLinesByYear: afcwimbledonGbExpenseLinesByYear,
  fiscalYearMeta: afcwimbledonGbFiscalYearMeta, pasesData: afcwimbledonGbPasesData,
  resultadosData: afcwimbledonGbResultadosData, titulosData: afcwimbledonGbTitulosData,
  presupuestoOverlayByYear: afcwimbledonGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"afcwimbledon-gb-full-accounts-2024-25-ixbrl":{"id":"afcwimbledon-gb-full-accounts-2024-25-ixbrl","clubId":"afcwimbledon-gb","title":"AFC Wimbledon Limited — afcwimbledon-full-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)"}});

memberCountByClub["afcwimbledon-gb"] = null;

// GENERADO desde data/gb/exetercity-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const exetercityGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Gates","normalizedCategory":"matchday_competition","amountNative":1.361318,"disclosureLevel":"aggregated"},
    {"rawLabel":"Season ticket sales","normalizedCategory":"season_tickets","amountNative":0.808738,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercial activities","normalizedCategory":"sponsorship_commercial","amountNative":2.436251,"disclosureLevel":"aggregated"},
    {"rawLabel":"Football League","normalizedCategory":"broadcasting","amountNative":2.710542,"disclosureLevel":"aggregated"},
    {"rawLabel":"Television income","normalizedCategory":"broadcasting","amountNative":0.01,"disclosureLevel":"aggregated"},
    {"rawLabel":"Food and drink sales","normalizedCategory":"stadium_other","amountNative":0.886029,"disclosureLevel":"aggregated"},
    {"rawLabel":"Grants and donations","normalizedCategory":"grants_donations","amountNative":0.615898,"disclosureLevel":"aggregated"},
    {"rawLabel":"Insurance claims receivable","normalizedCategory":"other_income","amountNative":0.006475,"disclosureLevel":"aggregated"},
    {"rawLabel":"Transfer revenue","normalizedCategory":"player_sales","amountNative":4.929505,"disclosureLevel":"aggregated"},
  ],
};

const exetercityGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-9.082874,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-4.137513,"disclosureLevel":"aggregated"},
  ],
};

const exetercityGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"exetercity-gb-exeter-group-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.017732,"tax":-0.178423,"grossDebt":null,"cash":null,"officialTotalRevenue":13.764756,"officialTotalExpenses":13.220387,"officialPAT":0.348214,"extraRows":[{"label":"Interest receivable and similar income","value":0.01119},{"label":"Interest payable and similar expenses","value":-0.028922},{"label":"Tax on profit","value":-0.178423}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true}}},
};

const exetercityGbPresupuestoOverlayByYear = {};

const exetercityGbPasesData = [];
const exetercityGbResultadosData = {};
const exetercityGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["exetercity-gb"] = {
  revenueLinesByYear: exetercityGbRevenueLinesByYear, expenseLinesByYear: exetercityGbExpenseLinesByYear,
  fiscalYearMeta: exetercityGbFiscalYearMeta, pasesData: exetercityGbPasesData,
  resultadosData: exetercityGbResultadosData, titulosData: exetercityGbTitulosData,
  presupuestoOverlayByYear: exetercityGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"exetercity-gb-exeter-group-accounts-2024-25-ixbrl":{"id":"exetercity-gb-exeter-group-accounts-2024-25-ixbrl","clubId":"exetercity-gb","title":"Exeter City A.F.C. Limited — exeter-group-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)","url":"https://find-and-update.company-information.service.gov.uk/company/00097808/filing-history/MzUxMzAwMzU3MmFkaXF6a2N4/document?format=xhtml&download=0"}});

memberCountByClub["exetercity-gb"] = null;

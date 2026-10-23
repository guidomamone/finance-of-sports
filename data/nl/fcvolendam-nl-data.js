// GENERADO desde data/nl/fcvolendam-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const fcvolendamNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Netto-omzet","normalizedCategory":"lump_football_operations","amountNative":10.714978,"disclosureLevel":"aggregated"},
  ],
};

const fcvolendamNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-3.957954,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-0.74537,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijving vaste activa","normalizedCategory":"depreciation","amountNative":-0.648395,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-6.162643,"disclosureLevel":"aggregated"},
  ],
};

const fcvolendamNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"fcvolendam-nl-volendam-jaarcijfers-2024-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.028337,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":10.714978,"officialTotalExpenses":11.514362,"officialPAT":-0.82772,"extraRows":[{"label":"Financiële baten en lasten","value":-0.028337},{"label":"Belastingen","value":0}],"sinDesglose":[{"renglon":"Netto-omzet","lado":"revenue","importe":10.714978,"motivo":"el documento no desglosa este renglón"}]},
};

const fcvolendamNlPresupuestoOverlayByYear = {};

const fcvolendamNlPasesData = [];
const fcvolendamNlResultadosData = {};
const fcvolendamNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["fcvolendam-nl"] = {
  revenueLinesByYear: fcvolendamNlRevenueLinesByYear, expenseLinesByYear: fcvolendamNlExpenseLinesByYear,
  fiscalYearMeta: fcvolendamNlFiscalYearMeta, pasesData: fcvolendamNlPasesData,
  resultadosData: fcvolendamNlResultadosData, titulosData: fcvolendamNlTitulosData,
  presupuestoOverlayByYear: fcvolendamNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"fcvolendam-nl-volendam-jaarcijfers-2024-2025":{"id":"fcvolendam-nl-volendam-jaarcijfers-2024-2025","clubId":"fcvolendam-nl","title":"Stichting R.K.F.C. Volendam — Volendam-Jaarcijfers-2024-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/FC Volendam/Volendam-Jaarcijfers-2024-2025.pdf"}});

memberCountByClub["fcvolendam-nl"] = null;

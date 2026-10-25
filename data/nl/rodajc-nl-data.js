// GENERADO desde data/nl/rodajc-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const rodajcNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Netto-omzet","normalizedCategory":"lump_football_operations","amountNative":7.877577,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":0.442997,"disclosureLevel":"aggregated"},
  ],
};

const rodajcNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Personeelskosten","normalizedCategory":"wages_squad","amountNative":-5.316416,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen","normalizedCategory":"depreciation","amountNative":-0.11552,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-3.691078,"disclosureLevel":"aggregated"},
  ],
};

const rodajcNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"rodajc-nl-wf-2024-2025-e1694c69","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.072486,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":8.320574,"officialTotalExpenses":9.123014,"officialPAT":-0.874926,"extraRows":[{"label":"Financiële baten en lasten","value":-0.072486},{"label":"Belastingen","value":null}],"sinDesglose":[{"renglon":"Netto-omzet","lado":"revenue","importe":7.877577,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}]},
};

const rodajcNlPresupuestoOverlayByYear = {};

const rodajcNlPasesData = [];
const rodajcNlResultadosData = {};
const rodajcNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["rodajc-nl"] = {
  revenueLinesByYear: rodajcNlRevenueLinesByYear, expenseLinesByYear: rodajcNlExpenseLinesByYear,
  fiscalYearMeta: rodajcNlFiscalYearMeta, pasesData: rodajcNlPasesData,
  resultadosData: rodajcNlResultadosData, titulosData: rodajcNlTitulosData,
  presupuestoOverlayByYear: rodajcNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"rodajc-nl-wf-2024-2025-e1694c69":{"id":"rodajc-nl-wf-2024-2025-e1694c69","clubId":"rodajc-nl","title":"Roda JC — wf-2024-2025-e1694c69 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Roda JC/wf-2024-2025-e1694c69.pdf"}});

memberCountByClub["rodajc-nl"] = null;

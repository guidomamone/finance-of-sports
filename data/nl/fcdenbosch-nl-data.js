// GENERADO desde data/nl/fcdenbosch-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const fcdenboschNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Netto-omzet","normalizedCategory":"lump_football_operations","amountNative":5.133797,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijving en resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":0.405859,"disclosureLevel":"aggregated"},
  ],
};

const fcdenboschNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Personeelskosten","normalizedCategory":"wages_squad","amountNative":-3.864955,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen","normalizedCategory":"depreciation","amountNative":-0.165585,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-2.845217,"disclosureLevel":"aggregated"},
  ],
};

const fcdenboschNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"fcdenbosch-nl-wf-2024-2025-c4a5aec0","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.057953,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":5.539656,"officialTotalExpenses":6.875757,"officialPAT":-1.394054,"extraRows":[{"label":"Financië le baten en lasten","value":-0.057953},{"label":"Belastingen","value":null}],"sinDesglose":[{"renglon":"Netto-omzet","lado":"revenue","importe":5.133797,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
};

const fcdenboschNlPresupuestoOverlayByYear = {};

const fcdenboschNlPasesData = [];
const fcdenboschNlResultadosData = {};
const fcdenboschNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["fcdenbosch-nl"] = {
  revenueLinesByYear: fcdenboschNlRevenueLinesByYear, expenseLinesByYear: fcdenboschNlExpenseLinesByYear,
  fiscalYearMeta: fcdenboschNlFiscalYearMeta, pasesData: fcdenboschNlPasesData,
  resultadosData: fcdenboschNlResultadosData, titulosData: fcdenboschNlTitulosData,
  presupuestoOverlayByYear: fcdenboschNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"fcdenbosch-nl-wf-2024-2025-c4a5aec0":{"id":"fcdenbosch-nl-wf-2024-2025-c4a5aec0","clubId":"fcdenbosch-nl","title":"FC Den Bosch B.V. — wf-2024-2025-c4a5aec0 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/FC Den Bosch/wf-2024-2025-c4a5aec0.pdf"}});

memberCountByClub["fcdenbosch-nl"] = null;

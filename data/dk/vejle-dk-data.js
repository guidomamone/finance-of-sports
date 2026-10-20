// GENERADO desde data/dk/vejle-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const vejleDkRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa explícitamente la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)","normalizedCategory":"lump_football_operations","amountNative":47.596,"disclosureLevel":"aggregated"},
  ],
};

const vejleDkExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Personaleomkostninger (Lønninger + Pensioner + Andre omkostninger til social sikring)","normalizedCategory":"wages_squad","amountNative":-48.591,"disclosureLevel":"detailed","items":[["Lønninger",-45.433],["Pensioner",-2.471],["Andre omkostninger til social sikring",-0.687]]},
    {"rawLabel":"Andre driftsomkostninger (residual, sin nota propia)","normalizedCategory":"other_expenses","amountNative":-0.082,"disclosureLevel":"aggregated"},
    {"rawLabel":"Immaterielle anlægsaktiver — afskrivninger (amortisation for the year, registraciones de jugadores)","normalizedCategory":"player_amortisation","amountNative":-2.392,"disclosureLevel":"detailed"},
    {"rawLabel":"Materielle anlægsaktiver — afskrivninger (Andre anlæg, driftsmateriel og inventar + Indretning af lejede lokaler)","normalizedCategory":"depreciation","amountNative":-0.962,"disclosureLevel":"detailed","items":[["Andre anlæg, driftsmateriel og inventar",-0.828],["Indretning af lejede lokaler",-0.134]]},
  ],
};

const vejleDkFiscalYearMeta = {
  2024: {"currency":"DKK","sourceId":"vejle-dk-aarsrapport-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.456,"tax":0.31,"grossDebt":24.128,"cash":4.548,"officialTotalRevenue":47.596,"officialTotalExpenses":52.027,"officialPAT":-3.665},
};

const vejleDkPresupuestoOverlayByYear = {};

const vejleDkPasesData = [];
const vejleDkResultadosData = {};
const vejleDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["vejle-dk"] = {
  revenueLinesByYear: vejleDkRevenueLinesByYear, expenseLinesByYear: vejleDkExpenseLinesByYear,
  fiscalYearMeta: vejleDkFiscalYearMeta, pasesData: vejleDkPasesData,
  resultadosData: vejleDkResultadosData, titulosData: vejleDkTitulosData,
  presupuestoOverlayByYear: vejleDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"vejle-dk-aarsrapport-2024":{"id":"vejle-dk-aarsrapport-2024","clubId":"vejle-dk","title":"VB Alliancen A/S — Årsrapport 1. januar - 31. december 2024","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["vejle-dk"] = null;

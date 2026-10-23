// GENERADO desde data/nl/scheerenveen-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const scheerenveenNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":4.867279,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":9.101753,"disclosureLevel":"aggregated"},
    {"rawLabel":"Mediagelden","normalizedCategory":"broadcasting","amountNative":6.469374,"disclosureLevel":"aggregated"},
    {"rawLabel":"Food & Beverage","normalizedCategory":"stadium_other","amountNative":0.531163,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.776585,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige opbrengsten","normalizedCategory":"other_income","amountNative":2.513826,"disclosureLevel":"aggregated"},
    {"rawLabel":"Netto-opbrengst vergoedingssommen","normalizedCategory":"player_sales","amountNative":7.555866,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat deelnemingen","normalizedCategory":"other_income","amountNative":0.203041,"disclosureLevel":"aggregated"},
  ],
};

const scheerenveenNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Kostprijs","normalizedCategory":"other_expenses","amountNative":-1.406246,"disclosureLevel":"aggregated"},
    {"rawLabel":"Salariskosten","normalizedCategory":"wages_squad","amountNative":-10.939527,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenlasten","normalizedCategory":"wages_squad","amountNative":-0.245383,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-1.534143,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige kosten","normalizedCategory":"admin_general_expense","amountNative":-1.676125,"disclosureLevel":"aggregated"},
    {"rawLabel":"Doorberekende personeelskosten","normalizedCategory":"wages_squad","amountNative":-0.19887,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingskosten vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-3.268827,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afwaardering boekwaarde vertrokken spelers","normalizedCategory":"player_impairment","amountNative":-0.37125,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen op materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.685457,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-10.279559,"disclosureLevel":"aggregated"},
  ],
};

const scheerenveenNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"scheerenveen-nl-jaarverslag-2024-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.035254,"tax":-0.332253,"grossDebt":null,"cash":null,"officialTotalRevenue":32.018887,"officialTotalExpenses":30.605387,"officialPAT":1.045993,"extraRows":[{"label":"Rentebaten en soortgelijke opbrengsten","value":0.061227},{"label":"Rentelasten en soortgelijke kosten","value":-0.096481},{"label":"Vennootschapsbelasting","value":-0.332253}]},
};

const scheerenveenNlPresupuestoOverlayByYear = {};

const scheerenveenNlPasesData = [];
const scheerenveenNlResultadosData = {};
const scheerenveenNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["scheerenveen-nl"] = {
  revenueLinesByYear: scheerenveenNlRevenueLinesByYear, expenseLinesByYear: scheerenveenNlExpenseLinesByYear,
  fiscalYearMeta: scheerenveenNlFiscalYearMeta, pasesData: scheerenveenNlPasesData,
  resultadosData: scheerenveenNlResultadosData, titulosData: scheerenveenNlTitulosData,
  presupuestoOverlayByYear: scheerenveenNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"scheerenveen-nl-jaarverslag-2024-2025":{"id":"scheerenveen-nl-jaarverslag-2024-2025","clubId":"scheerenveen-nl","title":"S.C. Heerenveen Holding B.V. — SC-Heerenveen-Jaarverslag-2024-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/SC Heerenveen/SC-Heerenveen-Jaarverslag-2024-2025.pdf"}});

memberCountByClub["scheerenveen-nl"] = null;

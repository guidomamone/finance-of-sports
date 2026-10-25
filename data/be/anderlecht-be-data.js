// GENERADO desde data/be/anderlecht-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const anderlechtBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":91.304983,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten","normalizedCategory":"player_sales","amountNative":19.517775,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":0.185851,"disclosureLevel":"aggregated"},
  ],
};

const anderlechtBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Aankopen handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-3.983067,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-35.897374,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-53.328314,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa","normalizedCategory":"player_amortisation","amountNative":-10.832766,"disclosureLevel":"aggregated"},
    {"rawLabel":"Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen","normalizedCategory":"other_expenses","amountNative":-0.505416,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-1.662686,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorzieningen voor risico's en kosten","normalizedCategory":"exceptional_items","amountNative":-0.199,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfskosten","normalizedCategory":"player_impairment","amountNative":-2.948383,"disclosureLevel":"aggregated"},
  ],
};

const anderlechtBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"anderlecht-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1.309869,"tax":-0.23214,"grossDebt":57.066235,"cash":1.516035,"officialTotalRevenue":111.008609,"officialTotalExpenses":109.158006,"officialPAT":0.109593,"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":91.304983,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
};

const anderlechtBePresupuestoOverlayByYear = {};

const anderlechtBePasesData = [];
const anderlechtBeResultadosData = {};
const anderlechtBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["anderlecht-be"] = {
  revenueLinesByYear: anderlechtBeRevenueLinesByYear, expenseLinesByYear: anderlechtBeExpenseLinesByYear,
  fiscalYearMeta: anderlechtBeFiscalYearMeta, pasesData: anderlechtBePasesData,
  resultadosData: anderlechtBeResultadosData, titulosData: anderlechtBeTitulosData,
  presupuestoOverlayByYear: anderlechtBePresupuestoOverlayByYear,
};

Object.assign(sources, {"anderlecht-be-jaarrekening-2025":{"id":"anderlecht-be-jaarrekening-2025","clubId":"anderlecht-be","title":"Jaarrekening van Royal Sporting Club Anderlecht NV voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["anderlecht-be"] = null;

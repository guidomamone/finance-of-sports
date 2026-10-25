// GENERADO desde data/be/unionsg-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const unionsgBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Chiffre d'affaires","normalizedCategory":"lump_football_operations","amountNative":15.029834,"disclosureLevel":"aggregated"},
    {"rawLabel":"Autres produits d'exploitation","normalizedCategory":"other_income","amountNative":22.925706,"disclosureLevel":"aggregated","items":[["Subsides d’exploitation et montants compensatoires obtenus des pouvoirs publics (Nota 6.10)",10.074391],["Reste sans détail disponible",12.851315]]},
    {"rawLabel":"Produits d'exploitation non récurrents — Plus-values sur réalisation d'immobilisations incorporelles (droits sur joueurs)","normalizedCategory":"player_sales","amountNative":20.715719,"disclosureLevel":"detailed"},
    {"rawLabel":"Produits d'exploitation non récurrents — Autres","normalizedCategory":"other_income","amountNative":0.096854,"disclosureLevel":"detailed"},
  ],
};

const unionsgBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Approvisionnements et marchandises","normalizedCategory":"other_expenses","amountNative":-0.963428,"disclosureLevel":"aggregated"},
    {"rawLabel":"Services et biens divers","normalizedCategory":"other_expenses","amountNative":-18.078026,"disclosureLevel":"aggregated"},
    {"rawLabel":"Rémunérations, charges sociales et pensions","normalizedCategory":"wages_squad","amountNative":-22.150441,"disclosureLevel":"detailed","items":[["Rémunérations et avantages sociaux directs",20.445031],["Cotisations patronales d’assurances sociales",1.174342],["Autres frais de personnel",0.531068]]},
    {"rawLabel":"Amortissements — droits sur joueurs (immobilisations incorporelles)","normalizedCategory":"player_amortisation","amountNative":-10.115265,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortissements — immobilisations corporelles","normalizedCategory":"depreciation","amountNative":-0.449653,"disclosureLevel":"detailed"},
    {"rawLabel":"Réductions de valeur sur créances commerciales (dotations nettes)","normalizedCategory":"other_expenses","amountNative":-4.106085,"disclosureLevel":"aggregated"},
    {"rawLabel":"Autres charges d'exploitation (impôts et taxes + autres, sin desglose confiable en la transcripción)","normalizedCategory":"admin_general_expense","amountNative":-0.266065,"disclosureLevel":"aggregated"},
  ],
};

const unionsgBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"unionsg-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.499375,"tax":-0.336402,"grossDebt":31.660587,"cash":1.27532,"officialTotalRevenue":58.768113,"officialTotalExpenses":56.128962,"officialPAT":1.803374,"sinDesglose":[{"renglon":"Chiffre d'affaires","lado":"revenue","importe":15.029834,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}]},
};

const unionsgBePresupuestoOverlayByYear = {};

const unionsgBePasesData = [];
const unionsgBeResultadosData = {};
const unionsgBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["unionsg-be"] = {
  revenueLinesByYear: unionsgBeRevenueLinesByYear, expenseLinesByYear: unionsgBeExpenseLinesByYear,
  fiscalYearMeta: unionsgBeFiscalYearMeta, pasesData: unionsgBePasesData,
  resultadosData: unionsgBeResultadosData, titulosData: unionsgBeTitulosData,
  presupuestoOverlayByYear: unionsgBePresupuestoOverlayByYear,
};

Object.assign(sources, {"unionsg-be-jaarrekening-2025":{"id":"unionsg-be-jaarrekening-2025","clubId":"unionsg-be","title":"Comptes annuels de la Royale Union Saint-Gilloise SRL pour l'exercice du 1/7/2024 au 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["unionsg-be"] = null;

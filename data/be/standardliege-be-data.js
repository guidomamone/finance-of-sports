// GENERADO desde data/be/standardliege-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const standardliegeBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Chiffre d'affaires","normalizedCategory":"lump_football_operations","amountNative":20.453554,"disclosureLevel":"aggregated"},
    {"rawLabel":"En-cours de fabrication, produits finis et commandes en cours d'exécution","normalizedCategory":"other_income","amountNative":0.475908,"disclosureLevel":"aggregated"},
    {"rawLabel":"Autres produits d'exploitation","normalizedCategory":"other_income","amountNative":23.052,"disclosureLevel":"aggregated","items":[["Subsides d’exploitation et montants compensatoires obtenus des pouvoirs publics (Nota 6.10)",7.501605],["Reste sans détail disponible",15.550395]]},
    {"rawLabel":"Produits d'exploitation non récurrents","normalizedCategory":"other_income","amountNative":0.587342,"disclosureLevel":"aggregated"},
  ],
};

const standardliegeBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Approvisionnements et marchandises","normalizedCategory":"other_expenses","amountNative":-0.881477,"disclosureLevel":"aggregated"},
    {"rawLabel":"Services et biens divers","normalizedCategory":"other_expenses","amountNative":-15.997812,"disclosureLevel":"aggregated"},
    {"rawLabel":"Rémunérations, charges sociales et pensions","normalizedCategory":"wages_squad","amountNative":-32.062651,"disclosureLevel":"detailed","items":[["Rémunérations et avantages sociaux directs",25.703064],["Cotisations patronales d’assurances sociales",3.870421],["Autres frais de personnel",2.489166]]},
    {"rawLabel":"Amortissements — droits sur joueurs (immobilisations incorporelles)","normalizedCategory":"player_amortisation","amountNative":-4.192331,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortissements — immobilisations corporelles","normalizedCategory":"depreciation","amountNative":-1.013961,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortissements — frais de constitution","normalizedCategory":"other_amortisation","amountNative":-0.014688,"disclosureLevel":"detailed"},
    {"rawLabel":"Réductions de valeur sur stocks et créances commerciales","normalizedCategory":"other_expenses","amountNative":-0.470536,"disclosureLevel":"aggregated"},
    {"rawLabel":"Provisions pour risques et charges (reprise nette)","normalizedCategory":"exceptional_items","amountNative":0.972273,"disclosureLevel":"detailed"},
    {"rawLabel":"Impôts et taxes relatifs à l'exploitation","normalizedCategory":"admin_general_expense","amountNative":-0.962229,"disclosureLevel":"detailed"},
    {"rawLabel":"Autres charges d'exploitation","normalizedCategory":"other_expenses","amountNative":-0.306633,"disclosureLevel":"detailed"},
    {"rawLabel":"Charges d'exploitation non récurrentes","normalizedCategory":"other_expenses","amountNative":-0.000203,"disclosureLevel":"aggregated"},
  ],
};

const standardliegeBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"standardliege-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.834691,"tax":-0.146296,"grossDebt":23.461701,"cash":0.311835,"officialTotalRevenue":44.568803,"officialTotalExpenses":55.902521,"officialPAT":-13.342433,"sinDesglose":[{"renglon":"Chiffre d'affaires","lado":"revenue","importe":20.453554,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}]},
};

const standardliegeBePresupuestoOverlayByYear = {};

const standardliegeBePasesData = [];
const standardliegeBeResultadosData = {};
const standardliegeBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["standardliege-be"] = {
  revenueLinesByYear: standardliegeBeRevenueLinesByYear, expenseLinesByYear: standardliegeBeExpenseLinesByYear,
  fiscalYearMeta: standardliegeBeFiscalYearMeta, pasesData: standardliegeBePasesData,
  resultadosData: standardliegeBeResultadosData, titulosData: standardliegeBeTitulosData,
  presupuestoOverlayByYear: standardliegeBePresupuestoOverlayByYear,
};

Object.assign(sources, {"standardliege-be-jaarrekening-2025":{"id":"standardliege-be-jaarrekening-2025","clubId":"standardliege-be","title":"Comptes annuels du Standard de Liège SA pour l'exercice du 1/7/2024 au 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["standardliege-be"] = null;

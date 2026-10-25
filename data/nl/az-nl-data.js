// GENERADO desde data/nl/az-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const azNlRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":11.499,"disclosureLevel":"detailed"},
    {"rawLabel":"Sponsoropbrengsten","normalizedCategory":"sponsorship_commercial","amountNative":15.097,"disclosureLevel":"detailed"},
    {"rawLabel":"Opbrengst Televisiegelden","normalizedCategory":"broadcasting","amountNative":8.284,"disclosureLevel":"detailed"},
    {"rawLabel":"Opbrengst Merchandising, magazines en internet","normalizedCategory":"sponsorship_commercial","amountNative":1.131,"disclosureLevel":"detailed"},
    {"rawLabel":"Opbrengst Horeca","normalizedCategory":"stadium_other","amountNative":5.253,"disclosureLevel":"detailed"},
    {"rawLabel":"Verhuur spelers en detachering personeel","normalizedCategory":"other_income","amountNative":0.687,"disclosureLevel":"detailed"},
    {"rawLabel":"Vergoedingssommen spelers (netto, overige bedrijfsopbrengsten)","normalizedCategory":"player_sales","amountNative":44.223,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":2.047,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":24.535,"disclosureLevel":"detailed"},
    {"rawLabel":"Sponsoropbrengsten","normalizedCategory":"sponsorship_commercial","amountNative":16.324,"disclosureLevel":"detailed"},
    {"rawLabel":"Opbrengst Televisiegelden","normalizedCategory":"broadcasting","amountNative":9.965,"disclosureLevel":"detailed"},
    {"rawLabel":"Opbrengst Merchandising, magazines en internet","normalizedCategory":"sponsorship_commercial","amountNative":1.392,"disclosureLevel":"detailed"},
    {"rawLabel":"Opbrengst Horeca","normalizedCategory":"stadium_other","amountNative":6.38,"disclosureLevel":"detailed"},
    {"rawLabel":"Verhuur spelers en detachering personeel","normalizedCategory":"other_income","amountNative":0.698,"disclosureLevel":"detailed"},
    {"rawLabel":"Vergoedingssommen spelers (netto, overige bedrijfsopbrengsten)","normalizedCategory":"player_sales","amountNative":29.498,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":2.411,"disclosureLevel":"detailed"},
  ],
};

const azNlExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Lonen en salarissen, sociale lasten en pensioenlasten","normalizedCategory":"wages_squad","amountNative":-32.588,"disclosureLevel":"detailed","items":[["Lonen en salarissen",29.652],["Sociale lasten",2.501],["Pensioenlasten",0.435]]},
    {"rawLabel":"Afschrijvingen immateriële vaste activa (boekwaarde spelers)","normalizedCategory":"player_amortisation","amountNative":-12.064,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen materiële vaste activa","normalizedCategory":"depreciation","amountNative":-2.552,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige personeelskosten + Huisvestingskosten + Verkoopkosten + Autokosten + Kantoorkosten + Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-14.658,"disclosureLevel":"detailed","items":[["Overige personeelskosten",2.572],["Huisvestingskosten",4.952],["Verkoopkosten",4.741],["Autokosten",1.315],["Kantoorkosten",0.691],["Algemene kosten",0.387]]},
    {"rawLabel":"Wedstrijd- en trainingkosten","normalizedCategory":"match_organisation_expense","amountNative":-5.707,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige lasten","normalizedCategory":"other_expenses","amountNative":-0.451,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Lonen en salarissen, sociale lasten en pensioenlasten","normalizedCategory":"wages_squad","amountNative":-37.794,"disclosureLevel":"detailed","items":[["Lonen en salarissen",34.461],["Sociale lasten",2.856],["Pensioenlasten",0.477]]},
    {"rawLabel":"Afschrijvingen immateriële vaste activa (boekwaarde spelers)","normalizedCategory":"player_amortisation","amountNative":-9.514,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen materiële vaste activa","normalizedCategory":"depreciation","amountNative":-2.83,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige personeelskosten + Huisvestingskosten + Verkoopkosten + Autokosten + Kantoorkosten + Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-19.207,"disclosureLevel":"detailed","items":[["Overige personeelskosten",4.28],["Huisvestingskosten",6.221],["Verkoopkosten",5.859],["Autokosten",1.395],["Kantoorkosten",0.83],["Algemene kosten",0.622]]},
    {"rawLabel":"Wedstrijd- en trainingkosten","normalizedCategory":"match_organisation_expense","amountNative":-7.765,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige lasten","normalizedCategory":"other_expenses","amountNative":-0.804,"disclosureLevel":"detailed"},
  ],
};

const azNlFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"az-nl-jaarrekening-2024","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.9690000000000003,"tax":-4.642,"grossDebt":39.275,"cash":14.012,"officialTotalRevenue":88.22,"officialTotalExpenses":68.02,"officialPAT":12.589,"baseIngreso":"full"},
  2025: {"currency":"EUR","sourceId":"az-nl-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":1.051,"tax":-3.936,"grossDebt":37.578,"cash":8.877,"officialTotalRevenue":91.202,"officialTotalExpenses":77.914,"officialPAT":10.402,"baseIngreso":"full"},
};

const azNlPresupuestoOverlayByYear = {};

const azNlPasesData = [];
const azNlResultadosData = {};
const azNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["az-nl"] = {
  revenueLinesByYear: azNlRevenueLinesByYear, expenseLinesByYear: azNlExpenseLinesByYear,
  fiscalYearMeta: azNlFiscalYearMeta, pasesData: azNlPasesData,
  resultadosData: azNlResultadosData, titulosData: azNlTitulosData,
  presupuestoOverlayByYear: azNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"az-nl-jaarrekening-2024":{"id":"az-nl-jaarrekening-2024","clubId":"az-nl","title":"Jaarrekening AZ Holding B.V. boekjaar 2023-2024 (1 juli 2023 - 30 juni 2024)","type":"official_balance_sheet","reliability":"primary"},"az-nl-jaarrekening-2025":{"id":"az-nl-jaarrekening-2025","clubId":"az-nl","title":"Jaarrekening AZ Holding B.V. boekjaar 2024-2025 (1 juli 2024 - 30 juni 2025)","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["az-nl"] = {"actual":{"nombre":"Gestión actual","firstYear":2024,"lastYear":2025}};

memberCountByClub["az-nl"] = null;

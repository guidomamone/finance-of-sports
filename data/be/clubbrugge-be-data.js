// GENERADO desde data/be/clubbrugge-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const clubbruggeBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdopbrengsten","normalizedCategory":"matchday_competition","amountNative":27.588,"disclosureLevel":"detailed"},
    {"rawLabel":"Opbrengsten uit mediarechten","normalizedCategory":"broadcasting","amountNative":74.117,"disclosureLevel":"detailed","items":[["Binnenlands",12.968],["Europees",61.149]]},
    {"rawLabel":"Commerciële opbrengsten","normalizedCategory":"sponsorship_commercial","amountNative":18.784,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige opbrengsten","normalizedCategory":"other_income","amountNative":1.778,"disclosureLevel":"aggregated"},
    {"rawLabel":"Meerwaarde bij de overdracht van spelersregistratierechten","normalizedCategory":"player_sales","amountNative":31.658,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":0.272,"disclosureLevel":"detailed","items":[["Lidgeld",0.044],["Giften",0.03],["Overige",0.198]]},
  ],
};

const clubbruggeBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Aankoop van materialen, benodigdheden en overige verbruiksgoederen","normalizedCategory":"other_expenses","amountNative":-4.985,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige bedrijfskosten — organisatie, apparatuur, beveiliging, reizen, hotels","normalizedCategory":"match_organisation_expense","amountNative":-13.693,"disclosureLevel":"detailed","items":[["Organisatie, apparatuur en beveiliging",8.636],["Reiskosten",2.174],["Hotels, restaurants en recepties",2.883]]},
    {"rawLabel":"Overige bedrijfskosten — administratie, huur, nutsvoorzieningen, consulting, interim, belastingen","normalizedCategory":"admin_general_expense","amountNative":-15.625,"disclosureLevel":"detailed","items":[["Algemene administratie",6.749],["Huur en andere diensten",2.708],["Nutsvoorzieningen, onderhoud en reparatie",3.332],["Consulting- en andere advieskosten",1.115],["Interim",0.513],["Overige belastingen",1.208]]},
    {"rawLabel":"Lonen van spelers en kosten van technische staf","normalizedCategory":"wages_squad","amountNative":-48.075,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige personeelskosten","normalizedCategory":"admin_general_expense","amountNative":-10.06,"disclosureLevel":"detailed","items":[["Overige personeelskosten",7.716],["Op aandelen gebaseerde betalingen",0.078],["Socialezekerheidsbijdragen",1.98],["Toegezegde-pensioenregelingskosten",0.305],["Overige kosten",-0.019]]},
    {"rawLabel":"Minderwaarde bij de overdracht van spelersregistratierechten","normalizedCategory":"player_impairment","amountNative":-9.024,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen van spelersregistratierechten","normalizedCategory":"player_amortisation","amountNative":-26.844,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen van overige immateriële activa en materiële vaste activa","normalizedCategory":"depreciation","amountNative":-3.293,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen en waardevermindering van een recht-op-gebruik activa","normalizedCategory":"depreciation","amountNative":-1.731,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige niet-kaskosten","normalizedCategory":"exceptional_items","amountNative":0.335,"disclosureLevel":"aggregated"},
  ],
};

const clubbruggeBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"clubbrugge-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":1.755,"tax":-6.891,"grossDebt":98.745,"cash":21.401,"officialTotalRevenue":154.196,"officialTotalExpenses":133.331,"officialPAT":16.064,"baseIngreso":"full"},
};

const clubbruggeBePresupuestoOverlayByYear = {};

const clubbruggeBePasesData = [];
const clubbruggeBeResultadosData = {};
const clubbruggeBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["clubbrugge-be"] = {
  revenueLinesByYear: clubbruggeBeRevenueLinesByYear, expenseLinesByYear: clubbruggeBeExpenseLinesByYear,
  fiscalYearMeta: clubbruggeBeFiscalYearMeta, pasesData: clubbruggeBePasesData,
  resultadosData: clubbruggeBeResultadosData, titulosData: clubbruggeBeTitulosData,
  presupuestoOverlayByYear: clubbruggeBePresupuestoOverlayByYear,
};

Object.assign(sources, {"clubbrugge-be-jaarrekening-2025":{"id":"clubbrugge-be-jaarrekening-2025","clubId":"clubbrugge-be","title":"Geconsolideerde jaarrekening van Club Brugge NV voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["clubbrugge-be"] = {"actual":{"nombre":"Bart Verhaeghe (Voorzitter Raad van Bestuur)","firstYear":2025,"lastYear":2025}};

memberCountByClub["clubbrugge-be"] = null;

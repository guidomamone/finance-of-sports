// GENERADO desde data/nl/ajax-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const ajaxNlRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Recettes competitie, nationale beker en vriendschappelijke wedstrijden","normalizedCategory":"matchday_competition","amountNative":8.179,"disclosureLevel":"detailed"},
    {"rawLabel":"Recettes Europese competities","normalizedCategory":"matchday_competition","amountNative":10.491,"disclosureLevel":"detailed"},
    {"rawLabel":"Premies Europese competities","normalizedCategory":"competition_bonus","amountNative":10.602,"disclosureLevel":"detailed"},
    {"rawLabel":"Seizoenkaarten","normalizedCategory":"season_tickets","amountNative":13.741,"disclosureLevel":"detailed"},
    {"rawLabel":"Business-seats en skybox-plaatsen","normalizedCategory":"season_tickets","amountNative":20.911,"disclosureLevel":"detailed"},
    {"rawLabel":"Indirecte wedstrijdbaten","normalizedCategory":"stadium_other","amountNative":2.439,"disclosureLevel":"detailed"},
    {"rawLabel":"Partnerships","normalizedCategory":"sponsorship_commercial","amountNative":40.1,"disclosureLevel":"detailed"},
    {"rawLabel":"Televisie","normalizedCategory":"broadcasting","amountNative":12.425,"disclosureLevel":"detailed"},
    {"rawLabel":"Merchandising","normalizedCategory":"sponsorship_commercial","amountNative":28.717,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":4.356,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Recettes competitie, nationale beker en vriendschappelijke wedstrijden","normalizedCategory":"matchday_competition","amountNative":9.455,"disclosureLevel":"detailed"},
    {"rawLabel":"Recettes Europese competities","normalizedCategory":"matchday_competition","amountNative":12.533,"disclosureLevel":"detailed"},
    {"rawLabel":"Premies Europese competities","normalizedCategory":"competition_bonus","amountNative":20.752,"disclosureLevel":"detailed"},
    {"rawLabel":"Seizoenkaarten","normalizedCategory":"season_tickets","amountNative":14.799,"disclosureLevel":"detailed"},
    {"rawLabel":"Business-seats en skybox-plaatsen","normalizedCategory":"season_tickets","amountNative":23.038,"disclosureLevel":"detailed"},
    {"rawLabel":"Indirecte wedstrijdbaten","normalizedCategory":"stadium_other","amountNative":4.44,"disclosureLevel":"detailed"},
    {"rawLabel":"Partnerships","normalizedCategory":"sponsorship_commercial","amountNative":42.46,"disclosureLevel":"detailed"},
    {"rawLabel":"Televisie","normalizedCategory":"broadcasting","amountNative":11.724,"disclosureLevel":"detailed"},
    {"rawLabel":"Merchandising","normalizedCategory":"sponsorship_commercial","amountNative":33.408,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":5.52,"disclosureLevel":"detailed"},
  ],
};

const ajaxNlExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Inkoopwaarde omzet","normalizedCategory":"other_expenses","amountNative":-15.595,"disclosureLevel":"detailed"},
    {"rawLabel":"Lonen, salarissen en sociale lasten — Voetbal","normalizedCategory":"wages_squad","amountNative":-78.583,"disclosureLevel":"detailed"},
    {"rawLabel":"Lonen, salarissen en sociale lasten — Overige + Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten","normalizedCategory":"admin_general_expense","amountNative":-62.934,"disclosureLevel":"detailed","items":[["Lonen, salarissen en sociale lasten — Overige",23.293],["Overige personeelskosten",8.5],["Huisvestingskosten",8.434],["Beheer- en administratiekosten",22.707]]},
    {"rawLabel":"Wedstrijdkosten","normalizedCategory":"match_organisation_expense","amountNative":-23.093,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen op vaste activa","normalizedCategory":"depreciation","amountNative":-11.099,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-50.191,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Inkoopwaarde omzet","normalizedCategory":"other_expenses","amountNative":-18.465,"disclosureLevel":"detailed"},
    {"rawLabel":"Lonen, salarissen en sociale lasten — Voetbal","normalizedCategory":"wages_squad","amountNative":-84.153,"disclosureLevel":"detailed"},
    {"rawLabel":"Lonen, salarissen en sociale lasten — Overige + Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten","normalizedCategory":"admin_general_expense","amountNative":-58.26,"disclosureLevel":"detailed","items":[["Lonen, salarissen en sociale lasten — Overige",24.957],["Overige personeelskosten",5.005],["Huisvestingskosten",7.629],["Beheer- en administratiekosten",20.669]]},
    {"rawLabel":"Wedstrijdkosten","normalizedCategory":"match_organisation_expense","amountNative":-25.413,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen op vaste activa","normalizedCategory":"depreciation","amountNative":-11.243,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-41.344,"disclosureLevel":"detailed"},
  ],
};

const ajaxNlFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"ajax-nl-jaarverslag-2024","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2024-06-30","profitOnPlayerSales":81.522,"assetSales":0,"netInterest":-4.85,"tax":3.111,"grossDebt":296.182,"cash":34.636,"officialTotalRevenue":151.961,"officialTotalExpenses":241.495,"officialPAT":-9.751,"baseIngreso":"full"},
  2025: {"currency":"EUR","sourceId":"ajax-nl-jaarverslag-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":10.333,"assetSales":0,"netInterest":-1.088,"tax":14.165,"grossDebt":219.259,"cash":40.295,"officialTotalRevenue":178.129,"officialTotalExpenses":238.878,"officialPAT":-37.339,"baseIngreso":"full"},
};

const ajaxNlPresupuestoOverlayByYear = {};

const ajaxNlPasesData = [];
const ajaxNlResultadosData = {};
const ajaxNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["ajax-nl"] = {
  revenueLinesByYear: ajaxNlRevenueLinesByYear, expenseLinesByYear: ajaxNlExpenseLinesByYear,
  fiscalYearMeta: ajaxNlFiscalYearMeta, pasesData: ajaxNlPasesData,
  resultadosData: ajaxNlResultadosData, titulosData: ajaxNlTitulosData,
  presupuestoOverlayByYear: ajaxNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"ajax-nl-jaarverslag-2024":{"id":"ajax-nl-jaarverslag-2024","clubId":"ajax-nl","title":"Jaarverslag AFC Ajax N.V. boekjaar 2023/2024 (1 juli 2023 - 30 juni 2024)","type":"official_balance_sheet","reliability":"primary"},"ajax-nl-jaarverslag-2025":{"id":"ajax-nl-jaarverslag-2025","clubId":"ajax-nl","title":"Jaarverslag AFC Ajax N.V. boekjaar 2024/2025 (1 juli 2024 - 30 juni 2025)","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["ajax-nl"] = {"actual":{"nombre":"Gestión actual","firstYear":2024,"lastYear":2025}};

memberCountByClub["ajax-nl"] = null;

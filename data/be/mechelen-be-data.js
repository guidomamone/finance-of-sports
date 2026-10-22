// GENERADO desde data/be/mechelen-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const mechelenBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":20.890688,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen","normalizedCategory":"grants_donations","amountNative":4.059643,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfsopbrengsten — resto sin desglosar","normalizedCategory":"other_income","amountNative":8.5361,"disclosureLevel":"aggregated"},
  ],
};

const mechelenBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-2.728544,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-10.72811,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-17.73975,"disclosureLevel":"detailed","items":[["Bezoldigingen en rechtstreekse sociale voordelen",14.591188],["Werkgeversbijdragen voor sociale verzekeringen",2.482892],["Andere personeelskosten",0.66567]]},
    {"rawLabel":"Afschrijvingen op immateriële vaste activa (concessies, octrooien, licenties, knowhow, merken)","normalizedCategory":"depreciation","amountNative":-1.112255,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen op materiële vaste activa","normalizedCategory":"depreciation","amountNative":-1.527367,"disclosureLevel":"detailed","items":[["Terreinen en gebouwen",0.044729],["Installaties, machines en uitrusting",0.209039],["Meubilair en rollend materieel",0.194897],["Overige materiële vaste activa",1.078702]]},
    {"rawLabel":"Andere bedrijfskosten — Bedrijfsbelastingen en -taksen","normalizedCategory":"admin_general_expense","amountNative":-0.499055,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfskosten — Andere","normalizedCategory":"other_expenses","amountNative":-0.105779,"disclosureLevel":"detailed"},
  ],
};

const mechelenBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"mechelen-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1.440798,"tax":-0.358728,"grossDebt":27.9558,"cash":3.134613,"officialTotalRevenue":33.486431,"officialTotalExpenses":34.440862,"officialPAT":-2.753957},
};

const mechelenBePresupuestoOverlayByYear = {};

const mechelenBePasesData = [];
const mechelenBeResultadosData = {};
const mechelenBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["mechelen-be"] = {
  revenueLinesByYear: mechelenBeRevenueLinesByYear, expenseLinesByYear: mechelenBeExpenseLinesByYear,
  fiscalYearMeta: mechelenBeFiscalYearMeta, pasesData: mechelenBePasesData,
  resultadosData: mechelenBeResultadosData, titulosData: mechelenBeTitulosData,
  presupuestoOverlayByYear: mechelenBePresupuestoOverlayByYear,
};

Object.assign(sources, {"mechelen-be-jaarrekening-2025":{"id":"mechelen-be-jaarrekening-2025","clubId":"mechelen-be","title":"Jaarrekening van Yellow-Red KV Mechelen NV voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["mechelen-be"] = null;

// GENERADO desde data/nl/nacbreda-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const nacbredaNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":3.930225,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":7.580148,"disclosureLevel":"aggregated"},
    {"rawLabel":"Media gerelateerde baten","normalizedCategory":"broadcasting","amountNative":2.834542,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandising","normalizedCategory":"sponsorship_commercial","amountNative":0.271365,"disclosureLevel":"aggregated"},
    {"rawLabel":"Food & Beverage","normalizedCategory":"stadium_other","amountNative":1.337949,"disclosureLevel":"aggregated"},
    {"rawLabel":"Opleidingen","normalizedCategory":"youth_football","amountNative":0.272455,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":2.449265,"disclosureLevel":"aggregated"},
    {"rawLabel":"Opbrengst vergoedingssommen","normalizedCategory":"player_sales","amountNative":3.05268,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":0.013004,"disclosureLevel":"aggregated"},
  ],
};

const nacbredaNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-1.707815,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisvestingkosten","normalizedCategory":"admin_general_expense","amountNative":-2.878863,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-1.661898,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige kosten","normalizedCategory":"other_expenses","amountNative":-1.29113,"disclosureLevel":"aggregated"},
    {"rawLabel":"Brutoloon","normalizedCategory":"wages_squad","amountNative":-7.931277,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijdpremies","normalizedCategory":"wages_squad","amountNative":-0.273594,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige personeelskosten","normalizedCategory":"admin_general_expense","amountNative":-2.731781,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenpremies","normalizedCategory":"wages_squad","amountNative":-0.135313,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.944243,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bedrijfsgebouwen en -terreinen","normalizedCategory":"depreciation","amountNative":-0.10118,"disclosureLevel":"aggregated"},
    {"rawLabel":"Machines en installaties","normalizedCategory":"depreciation","amountNative":-0.131275,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere vaste bedrijfsmiddelen","normalizedCategory":"depreciation","amountNative":-0.167653,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen vergoedingssommen clubs","normalizedCategory":"player_amortisation","amountNative":-0.572525,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen hand- en tekengelden","normalizedCategory":"player_amortisation","amountNative":-0.181389,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-0.04608,"disclosureLevel":"aggregated"},
  ],
};

const nacbredaNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"nacbreda-nl-jaarrekening-2024-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.046969,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":21.741633,"officialTotalExpenses":20.756016,"officialPAT":0.938648,"extraRows":[{"label":"Rentebaten en soortgelijke opbrengsten","value":0.022924},{"label":"Rentelasten en soortgelijke kosten","value":-0.069893},{"label":"Belastingen","value":null}],"baseIngreso":"full"},
};

const nacbredaNlPresupuestoOverlayByYear = {};

const nacbredaNlPasesData = [];
const nacbredaNlResultadosData = {};
const nacbredaNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["nacbreda-nl"] = {
  revenueLinesByYear: nacbredaNlRevenueLinesByYear, expenseLinesByYear: nacbredaNlExpenseLinesByYear,
  fiscalYearMeta: nacbredaNlFiscalYearMeta, pasesData: nacbredaNlPasesData,
  resultadosData: nacbredaNlResultadosData, titulosData: nacbredaNlTitulosData,
  presupuestoOverlayByYear: nacbredaNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"nacbreda-nl-jaarrekening-2024-2025":{"id":"nacbreda-nl-jaarrekening-2024-2025","clubId":"nacbreda-nl","title":"NAC Breda B.V. — NAC-Breda-Jaarrekening-2024-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/NAC Breda/NAC-Breda-Jaarrekening-2024-2025.pdf"}});

memberCountByClub["nacbreda-nl"] = null;

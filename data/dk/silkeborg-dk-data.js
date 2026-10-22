// GENERADO desde data/dk/silkeborg-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const silkeborgDkRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Entrance fees","normalizedCategory":"matchday_competition","amountNative":9.756,"disclosureLevel":"detailed"},
    {"rawLabel":"TV revenue","normalizedCategory":"broadcasting","amountNative":25.15,"disclosureLevel":"detailed"},
    {"rawLabel":"Sponsorship and collaboration agreements","normalizedCategory":"sponsorship_commercial","amountNative":28.64,"disclosureLevel":"detailed"},
    {"rawLabel":"Sale of merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.531,"disclosureLevel":"detailed"},
    {"rawLabel":"Compensation (FIFA/UEFA/DBU) + Prize income","normalizedCategory":"competition_bonus","amountNative":12.899,"disclosureLevel":"detailed","items":[["Compensation (FIFA/UEFA/DBU)",6.188],["Prize income",6.711]]},
    {"rawLabel":"Food & beverage JYSK PARK","normalizedCategory":"stadium_other","amountNative":6.454,"disclosureLevel":"detailed"},
    {"rawLabel":"Other revenue","normalizedCategory":"other_income","amountNative":10.086,"disclosureLevel":"detailed"},
    {"rawLabel":"Salary refunds","normalizedCategory":"other_income","amountNative":0.271,"disclosureLevel":"detailed"},
    {"rawLabel":"Transfer income","normalizedCategory":"player_sales","amountNative":61.343,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Entrance fees","normalizedCategory":"matchday_competition","amountNative":5.802,"disclosureLevel":"aggregated"},
    {"rawLabel":"TV revenue","normalizedCategory":"broadcasting","amountNative":18.571,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsorship and collaboration agreements","normalizedCategory":"sponsorship_commercial","amountNative":29.161,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sale of merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.451,"disclosureLevel":"aggregated"},
    {"rawLabel":"Compensation (FIFA/UEFA/DBU)","normalizedCategory":"competition_bonus","amountNative":3.99,"disclosureLevel":"aggregated"},
    {"rawLabel":"Food & beverage JYSK PARK","normalizedCategory":"stadium_other","amountNative":5.257,"disclosureLevel":"aggregated"},
    {"rawLabel":"Prize income","normalizedCategory":"competition_bonus","amountNative":7.522,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other revenue","normalizedCategory":"other_income","amountNative":10.259,"disclosureLevel":"aggregated"},
    {"rawLabel":"Transfer income","normalizedCategory":"player_sales","amountNative":50.393,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sale of property, plant and equipment","normalizedCategory":"other_income","amountNative":0.102,"disclosureLevel":"aggregated"},
    {"rawLabel":"Salary refunds","normalizedCategory":"other_income","amountNative":0.231,"disclosureLevel":"aggregated"},
  ],
};

const silkeborgDkExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Other external expenses — match and player expenses","normalizedCategory":"match_organisation_expense","amountNative":-19.98,"disclosureLevel":"detailed"},
    {"rawLabel":"Other external expenses — sales and administrative expenses + other staff costs","normalizedCategory":"admin_general_expense","amountNative":-15.434,"disclosureLevel":"detailed","items":[["Sales and administrative expenses",-14.315],["Other staff costs",-1.119]]},
    {"rawLabel":"Staff costs","normalizedCategory":"wages_squad","amountNative":-46.801,"disclosureLevel":"detailed","items":[["Wages and salaries",-44.259],["Pension costs",-1.954],["Other social security costs",-0.588]]},
    {"rawLabel":"Depreciation, amortisation and impairment losses — property, plant and equipment","normalizedCategory":"depreciation","amountNative":-8.073,"disclosureLevel":"detailed","items":[["Other fixtures and fittings, tools and equipment",-4.023],["Leasehold improvements",-4.05]]},
    {"rawLabel":"Depreciation, amortisation and impairment losses — acquired intangible assets (contractual rights)","normalizedCategory":"player_amortisation","amountNative":-4.371,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Other external expenses","normalizedCategory":"match_organisation_expense","amountNative":-34.848,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wages and salaries","normalizedCategory":"wages_squad","amountNative":-48.332,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pension costs","normalizedCategory":"wages_squad","amountNative":-2.078,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other social security costs","normalizedCategory":"wages_squad","amountNative":-0.685,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortisation of intangible assets (player registrations)","normalizedCategory":"player_amortisation","amountNative":-6.502,"disclosureLevel":"aggregated"},
    {"rawLabel":"Depreciation of property, plant and equipment","normalizedCategory":"depreciation","amountNative":-6.168,"disclosureLevel":"aggregated"},
  ],
};

const silkeborgDkFiscalYearMeta = {
  2024: {"currency":"DKK","sourceId":"silkeborg-aarsrapport-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":1.369,"tax":-13.6,"grossDebt":0,"cash":20.522,"officialTotalRevenue":155.13,"officialTotalExpenses":94.659,"officialPAT":48.24},
  2025: {"currency":"DKK","sourceId":"silkeborg-dk-annual-report-2025-silkeborg-if-a-s-fact","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.018,"tax":-7.309,"grossDebt":null,"cash":null,"officialTotalRevenue":131.739,"officialTotalExpenses":98.613,"officialPAT":25.799,"extraRows":[{"label":"Other financial income","value":0.324},{"label":"Other financial expenses","value":-0.342},{"label":"Tax on profit/loss for the year","value":-7.309}]},
};

const silkeborgDkPresupuestoOverlayByYear = {};

const silkeborgDkPasesData = [];
const silkeborgDkResultadosData = {};
const silkeborgDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["silkeborg-dk"] = {
  revenueLinesByYear: silkeborgDkRevenueLinesByYear, expenseLinesByYear: silkeborgDkExpenseLinesByYear,
  fiscalYearMeta: silkeborgDkFiscalYearMeta, pasesData: silkeborgDkPasesData,
  resultadosData: silkeborgDkResultadosData, titulosData: silkeborgDkTitulosData,
  presupuestoOverlayByYear: silkeborgDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"silkeborg-aarsrapport-2024":{"id":"silkeborg-aarsrapport-2024","clubId":"silkeborg-dk","title":"Silkeborg IF A/S — Annual report 2024 (01.01.2024 - 31.12.2024)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/13779362/amNsb3VkczovLzAzL2Q0LzVjLzUyLzQzLzAwMzktNDkxYS04NmQ0LTEyYjRhZTQ3YzVlMQ.pdf"},"silkeborg-dk-annual-report-2025-silkeborg-if-a-s-fact":{"id":"silkeborg-dk-annual-report-2025-silkeborg-if-a-s-fact","clubId":"silkeborg-dk","title":"Silkeborg IF A/S — Annual-Report-2025-Silkeborg-IF-A_S-FACT (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/13779362/amNsb3VkczovLzAzLzU0Lzc3LzdkLzExLzE3ZjYtNDdkNS1hMGUyLTBhZDMzNDIzMTVmZA.xhtml"}});

memberCountByClub["silkeborg-dk"] = null;

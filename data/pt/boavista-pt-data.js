// GENERADO desde data/pt/boavista-pt.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const boavistaPtRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Subsídios à exploração","normalizedCategory":"grants_donations","amountNative":0.219358,"disclosureLevel":"aggregated"},
    {"rawLabel":"Outros rendimentos","normalizedCategory":"other_income","amountNative":5.282976,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bilhetes e Camarotes","normalizedCategory":"matchday_competition","amountNative":0.507075,"disclosureLevel":"aggregated"},
    {"rawLabel":"Direitos Televisivos","normalizedCategory":"broadcasting","amountNative":3.463889,"disclosureLevel":"aggregated"},
    {"rawLabel":"Publicidade","normalizedCategory":"sponsorship_commercial","amountNative":0.453304,"disclosureLevel":"aggregated"},
  ],
};

const boavistaPtExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Fornecimentos e serviços externos","normalizedCategory":"admin_general_expense","amountNative":-3.886821,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos com o pessoal","normalizedCategory":"wages_squad","amountNative":-10.608358,"disclosureLevel":"aggregated"},
    {"rawLabel":"Outros gastos","normalizedCategory":"other_expenses","amountNative":-0.618006,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos/reversões de depreciação e de amortização","normalizedCategory":"depreciation","amountNative":-2.200963,"disclosureLevel":"aggregated"},
  ],
};

const boavistaPtFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"boavista-pt-rcsad-23-24-1-3","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.931493,"tax":1.649761,"grossDebt":0,"cash":0.051557,"officialTotalRevenue":9.926602,"officialTotalExpenses":17.314147,"officialPAT":-6.669278,"extraRows":[{"label":"Juros e gastos similares suportados","value":-0.931493},{"label":"Imposto sobre o rendimento do período","value":1.649761}]},
};

const boavistaPtPresupuestoOverlayByYear = {};

const boavistaPtPasesData = [];
const boavistaPtResultadosData = {};
const boavistaPtTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["boavista-pt"] = {
  revenueLinesByYear: boavistaPtRevenueLinesByYear, expenseLinesByYear: boavistaPtExpenseLinesByYear,
  fiscalYearMeta: boavistaPtFiscalYearMeta, pasesData: boavistaPtPasesData,
  resultadosData: boavistaPtResultadosData, titulosData: boavistaPtTitulosData,
  presupuestoOverlayByYear: boavistaPtPresupuestoOverlayByYear,
};

Object.assign(sources, {"boavista-pt-rcsad-23-24-1-3":{"id":"boavista-pt-rcsad-23-24-1-3","clubId":"boavista-pt","title":"Boavista Futebol Clube, Futebol, SAD — RCSAD-23-24_1-3 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["boavista-pt"] = null;

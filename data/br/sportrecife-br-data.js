// GENERADO desde data/br/sportrecife-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const sportrecifeBrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Direitos televisivos e premiações","normalizedCategory":"broadcasting","amountNative":88.708,"disclosureLevel":"detailed"},
    {"rawLabel":"Comerciais, marketing e publicidade","normalizedCategory":"sponsorship_commercial","amountNative":47.335,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas em jogos","normalizedCategory":"matchday_competition","amountNative":19.682,"disclosureLevel":"detailed"},
    {"rawLabel":"Contribuições de associados","normalizedCategory":"member_dues","amountNative":16.626,"disclosureLevel":"detailed"},
    {"rawLabel":"Patrimoniais","normalizedCategory":"other_income","amountNative":3.319,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras receitas","normalizedCategory":"other_income","amountNative":0.567,"disclosureLevel":"detailed"},
    {"rawLabel":"Cessão de direitos contratuais (negociação de atletas, empréstimos e solidariedade)","normalizedCategory":"player_sales","amountNative":6.609,"disclosureLevel":"detailed"},
    {"rawLabel":"Deduções de receita (INSS Patronal, 5%)","normalizedCategory":"other_income","amountNative":-8.66,"disclosureLevel":"detailed"},
  ],
};

const sportrecifeBrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Gastos com pessoal do futebol","normalizedCategory":"wages_squad","amountNative":-116.898,"disclosureLevel":"detailed"},
    {"rawLabel":"Competição e viagens","normalizedCategory":"match_organisation_expense","amountNative":-14.094,"disclosureLevel":"detailed"},
    {"rawLabel":"Outros custos","normalizedCategory":"other_expenses","amountNative":-1.447,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas com formação de atleta e amortização de despesas de anos anteriores","normalizedCategory":"youth_other_sports_expense","amountNative":-34.935,"disclosureLevel":"detailed"},
    {"rawLabel":"Serviços de terceiros","normalizedCategory":"admin_general_expense","amountNative":-23.234,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos com pessoal (administrativo)","normalizedCategory":"admin_general_expense","amountNative":-15.648,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciação","normalizedCategory":"depreciation","amountNative":-7.826,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas gerais","normalizedCategory":"admin_general_expense","amountNative":-8.659,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas com alimentação","normalizedCategory":"admin_general_expense","amountNative":-3.884,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas com manutenção","normalizedCategory":"admin_general_expense","amountNative":-2.985,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas c/alugueis","normalizedCategory":"admin_general_expense","amountNative":-1.525,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas tributárias","normalizedCategory":"admin_general_expense","amountNative":-5.868,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras (despesas) receitas operacionais líquidas (Liga Forte União, provisão para contingências e outras)","normalizedCategory":"other_expenses","amountNative":-35.739,"disclosureLevel":"detailed"},
  ],
};

const sportrecifeBrFiscalYearMeta = {
  2025: {"currency":"BRL","sourceId":"sportrecife-br-demonstracoes-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"BRL@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-13.941,"tax":0,"grossDebt":26.786,"cash":2.388,"officialTotalRevenue":174.186,"officialTotalExpenses":272.742,"officialPAT":-112.497,"baseIngreso":"full"},
};

const sportrecifeBrPresupuestoOverlayByYear = {};

const sportrecifeBrPasesData = [];
const sportrecifeBrResultadosData = {};
const sportrecifeBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["sportrecife-br"] = {
  revenueLinesByYear: sportrecifeBrRevenueLinesByYear, expenseLinesByYear: sportrecifeBrExpenseLinesByYear,
  fiscalYearMeta: sportrecifeBrFiscalYearMeta, pasesData: sportrecifeBrPasesData,
  resultadosData: sportrecifeBrResultadosData, titulosData: sportrecifeBrTitulosData,
  presupuestoOverlayByYear: sportrecifeBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"sportrecife-br-demonstracoes-2025":{"id":"sportrecife-br-demonstracoes-2025","clubId":"sportrecife-br","title":"Demonstrações Contábeis, Exercícios Findos em 31 de Dezembro de 2025 e de 2024, com Relatório do Auditor Independente","type":"official_balance_sheet","reliability":"primary","url":"https://sportrecife.com.br/portal-transparencia/demonstracoes-financeiras/"}});

memberCountByClub["sportrecife-br"] = null;

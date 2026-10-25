// GENERADO desde data/br/guarani-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const guaraniBrRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Premiação","normalizedCategory":"competition_bonus","amountNative":0.119,"disclosureLevel":"detailed"},
    {"rawLabel":"Cotas de transmissão","normalizedCategory":"broadcasting","amountNative":21.476,"disclosureLevel":"detailed"},
    {"rawLabel":"Patrocínio","normalizedCategory":"sponsorship_commercial","amountNative":6.656,"disclosureLevel":"detailed"},
    {"rawLabel":"Cessão de atletas","normalizedCategory":"player_sales","amountNative":10.152,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas Sociais","normalizedCategory":"member_dues","amountNative":2.33,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras","normalizedCategory":"other_income","amountNative":6.084,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Premiação","normalizedCategory":"competition_bonus","amountNative":0.24,"disclosureLevel":"detailed"},
    {"rawLabel":"Cotas de transmissão","normalizedCategory":"broadcasting","amountNative":14.298,"disclosureLevel":"detailed"},
    {"rawLabel":"Patrocínio","normalizedCategory":"sponsorship_commercial","amountNative":1.827,"disclosureLevel":"detailed"},
    {"rawLabel":"Cessão de atletas","normalizedCategory":"player_sales","amountNative":42.132,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas Sociais","normalizedCategory":"member_dues","amountNative":2.121,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras","normalizedCategory":"other_income","amountNative":2.95,"disclosureLevel":"detailed"},
  ],
};

const guaraniBrExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Salários e encargos","normalizedCategory":"wages_squad","amountNative":-21.689,"disclosureLevel":"detailed"},
    {"rawLabel":"Direito de Imagem","normalizedCategory":"wages_squad","amountNative":-3.659,"disclosureLevel":"detailed"},
    {"rawLabel":"Jogos","normalizedCategory":"match_organisation_expense","amountNative":-8.155,"disclosureLevel":"detailed"},
    {"rawLabel":"Direitos econômicos","normalizedCategory":"player_amortisation","amountNative":-2.698,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos gerais com atividade desportiva","normalizedCategory":"match_organisation_expense","amountNative":-8.234,"disclosureLevel":"detailed"},
    {"rawLabel":"Gerais e administrativas","normalizedCategory":"admin_general_expense","amountNative":-9.3,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas Tributárias","normalizedCategory":"admin_general_expense","amountNative":-0.247,"disclosureLevel":"detailed"},
    {"rawLabel":"Contingências (desafetação de previsão)","normalizedCategory":"exceptional_items","amountNative":0.001,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Salários e encargos","normalizedCategory":"wages_squad","amountNative":-19.155,"disclosureLevel":"detailed"},
    {"rawLabel":"Direito de Imagem","normalizedCategory":"wages_squad","amountNative":-4.582,"disclosureLevel":"detailed"},
    {"rawLabel":"Jogos","normalizedCategory":"match_organisation_expense","amountNative":-6.127,"disclosureLevel":"detailed"},
    {"rawLabel":"Direitos econômicos","normalizedCategory":"player_amortisation","amountNative":-2.983,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos gerais com atividade desportiva","normalizedCategory":"match_organisation_expense","amountNative":-8,"disclosureLevel":"detailed"},
    {"rawLabel":"Gerais e administrativas","normalizedCategory":"admin_general_expense","amountNative":-12.399,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas Tributárias","normalizedCategory":"admin_general_expense","amountNative":-0.167,"disclosureLevel":"detailed"},
  ],
};

const guaraniBrFiscalYearMeta = {
  2024: {"currency":"BRL","sourceId":"guarani-br-demonstracoes-2023-2024","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":6.754,"tax":0,"grossDebt":144.944,"cash":0.298,"officialTotalRevenue":46.817,"officialTotalExpenses":53.983,"officialPAT":-0.412,"baseIngreso":"full"},
  2025: {"currency":"BRL","sourceId":"guarani-br-demonstracoes-2024-2025","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.079,"tax":0,"grossDebt":142.494,"cash":6.535,"officialTotalRevenue":63.569,"officialTotalExpenses":53.413,"officialPAT":8.077,"baseIngreso":"full"},
};

const guaraniBrPresupuestoOverlayByYear = {};

const guaraniBrPasesData = [];
const guaraniBrResultadosData = {};
const guaraniBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["guarani-br"] = {
  revenueLinesByYear: guaraniBrRevenueLinesByYear, expenseLinesByYear: guaraniBrExpenseLinesByYear,
  fiscalYearMeta: guaraniBrFiscalYearMeta, pasesData: guaraniBrPasesData,
  resultadosData: guaraniBrResultadosData, titulosData: guaraniBrTitulosData,
  presupuestoOverlayByYear: guaraniBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"guarani-br-demonstracoes-2023-2024":{"id":"guarani-br-demonstracoes-2023-2024","clubId":"guarani-br","title":"Demonstrações Financeiras do Guarani Futebol Clube — Em Recuperação Judicial, Exercícios Findos em 31 de Dezembro de 2024 e de 2023","type":"official_balance_sheet","reliability":"primary","url":"https://futebolpaulista.com.br/Repositorio/Institucional/2024/Guarani.pdf"},"guarani-br-demonstracoes-2024-2025":{"id":"guarani-br-demonstracoes-2024-2025","clubId":"guarani-br","title":"Demonstrações Financeiras do Guarani Futebol Clube — Em Recuperação Judicial, Exercícios Findos em 31 de Dezembro de 2025 e de 2024","type":"official_balance_sheet","reliability":"primary","url":"https://guaranifc.com.br/wp-content/uploads/2026/04/1-RELATORIO-DE-AUDITORIA-COM-AS-DEMONSTRACOES-FINANCEIRAS-GUARANI-2025.pdf"}});

gestionesByClub["guarani-br"] = {"sinconfirmar":{"nombre":"Gestión sin confirmar en detalle (firma 2024 y 2025: Rômulo Aleksander Moreno Amaro, Presidente do Conselho de Administração)","firstYear":2024,"lastYear":2025}};

memberCountByClub["guarani-br"] = null;

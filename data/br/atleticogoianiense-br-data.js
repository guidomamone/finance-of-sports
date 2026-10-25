// GENERADO desde data/br/atleticogoianiense-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const atleticogoianienseBrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Direitos de Transmissão","normalizedCategory":"broadcasting","amountNative":4.465,"disclosureLevel":"detailed"},
    {"rawLabel":"Bilheteria","normalizedCategory":"matchday_competition","amountNative":1.004,"disclosureLevel":"detailed"},
    {"rawLabel":"Patrocínio e publicidade","normalizedCategory":"sponsorship_commercial","amountNative":8.828,"disclosureLevel":"detailed"},
    {"rawLabel":"Mensalidades Associativas","normalizedCategory":"member_dues","amountNative":0.312,"disclosureLevel":"detailed"},
    {"rawLabel":"Negociação de atletas","normalizedCategory":"player_sales","amountNative":37.657,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras receitas","normalizedCategory":"other_income","amountNative":10.399,"disclosureLevel":"detailed"},
    {"rawLabel":"Programa Sócio Torcedor","normalizedCategory":"member_dues","amountNative":0.705,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas Condomínio LFU","normalizedCategory":"broadcasting","amountNative":10.819,"disclosureLevel":"detailed"},
    {"rawLabel":"Premiações","normalizedCategory":"competition_bonus","amountNative":2.922,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras receitas e despesas operacionais","normalizedCategory":"other_income","amountNative":1.589,"disclosureLevel":"detailed"},
  ],
};

const atleticogoianienseBrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Custos com Salários de Atletas/Com. Técnica","normalizedCategory":"wages_squad","amountNative":-40.6,"disclosureLevel":"detailed"},
    {"rawLabel":"Direito de Imagem","normalizedCategory":"wages_squad","amountNative":-13.428,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas com Patrocínio/Premiações (bonos de rendimiento)","normalizedCategory":"match_organisation_expense","amountNative":-3.16,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas CBF","normalizedCategory":"match_organisation_expense","amountNative":-0.238,"disclosureLevel":"detailed"},
    {"rawLabel":"INSS sobre Receita","normalizedCategory":"admin_general_expense","amountNative":-0.085,"disclosureLevel":"detailed"},
    {"rawLabel":"Fenapaf / Direito de Arena","normalizedCategory":"match_organisation_expense","amountNative":-0.006,"disclosureLevel":"detailed"},
    {"rawLabel":"Quadro Móvel (logística de partidos)","normalizedCategory":"match_organisation_expense","amountNative":-0.183,"disclosureLevel":"detailed"},
    {"rawLabel":"Custos com Parcerias com outros clubes","normalizedCategory":"other_expenses","amountNative":-1.131,"disclosureLevel":"detailed"},
    {"rawLabel":"Comissão/intermediação","normalizedCategory":"other_expenses","amountNative":-1.209,"disclosureLevel":"detailed"},
    {"rawLabel":"Salários e encargos (administrativo)","normalizedCategory":"wages_squad","amountNative":-1.506,"disclosureLevel":"detailed"},
    {"rawLabel":"Serviços de Terceiros","normalizedCategory":"admin_general_expense","amountNative":-2.699,"disclosureLevel":"detailed"},
    {"rawLabel":"Marketing","normalizedCategory":"admin_general_expense","amountNative":-1.095,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortização do custo de atletas","normalizedCategory":"player_amortisation","amountNative":-6.074,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciações","normalizedCategory":"depreciation","amountNative":-2.156,"disclosureLevel":"detailed"},
    {"rawLabel":"Contingências","normalizedCategory":"other_expenses","amountNative":-0.003,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas gerais","normalizedCategory":"admin_general_expense","amountNative":-3.53,"disclosureLevel":"detailed"},
  ],
};

const atleticogoianienseBrFiscalYearMeta = {
  2025: {"currency":"BRL","sourceId":"atleticogoianiense-br-demonstracoes-2024-2025","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.899,"tax":-0.009,"grossDebt":9.666,"cash":0.767,"officialTotalRevenue":78.7,"officialTotalExpenses":77.103,"officialPAT":0.687,"baseIngreso":"full"},
};

const atleticogoianienseBrPresupuestoOverlayByYear = {};

const atleticogoianienseBrPasesData = [];
const atleticogoianienseBrResultadosData = {};
const atleticogoianienseBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["atleticogoianiense-br"] = {
  revenueLinesByYear: atleticogoianienseBrRevenueLinesByYear, expenseLinesByYear: atleticogoianienseBrExpenseLinesByYear,
  fiscalYearMeta: atleticogoianienseBrFiscalYearMeta, pasesData: atleticogoianienseBrPasesData,
  resultadosData: atleticogoianienseBrResultadosData, titulosData: atleticogoianienseBrTitulosData,
  presupuestoOverlayByYear: atleticogoianienseBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"atleticogoianiense-br-demonstracoes-2024-2025":{"id":"atleticogoianiense-br-demonstracoes-2024-2025","clubId":"atleticogoianiense-br","title":"Demonstrações Financeiras (Relatório da Administração), Exercícios Findos em 31 de Dezembro de 2025 e de 2024","type":"official_balance_sheet","reliability":"primary","url":"https://atleticogoianiense.com.br/up/TRANSPARENCIA-26/"}});

gestionesByClub["atleticogoianiense-br"] = {"sinconfirmar":{"nombre":"Atlético Goianiense (gestión no confirmada en detalle)","firstYear":2025,"lastYear":2025}};

memberCountByClub["atleticogoianiense-br"] = null;

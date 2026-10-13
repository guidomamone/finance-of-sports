const juventudeBrRevenueLinesByYear = {
  2020: [
    { rawLabel:'Venda/Empréstimo de Atletas', normalizedCategory:'player_sales', amountNative:9.53026790, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Patrimoniais', normalizedCategory:'other_income', amountNative:1.53487736, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Transmissão', normalizedCategory:'broadcasting', amountNative:15.42508914, disclosureLevel:'detailed' },
    { rawLabel:'Receita jogos de Futebol', normalizedCategory:'matchday_competition', amountNative:0.52843655, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Publicitária', normalizedCategory:'sponsorship_commercial', amountNative:3.26438183, disclosureLevel:'detailed' },
    { rawLabel:'Receita Loteria Esportiva', normalizedCategory:'other_income', amountNative:0.70944628, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (Nota 18)', normalizedCategory:'other_income', amountNative:0.83902160, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.01777140, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:0.53415641, disclosureLevel:'detailed' },
  ],
};

const juventudeBrExpenseLinesByYear = {
  2020: [
    { rawLabel:'Remuneração, Benefícios, Encargos e amortização de direitos e de custos de formação', normalizedCategory:'lump_football_operations_expense', amountNative:-22.55193562, disclosureLevel:'lump' },
    { rawLabel:'Federação, viagem, imagem, serviços, material esportivo e outras', normalizedCategory:'match_organisation_expense', amountNative:-4.84499961, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-6.00835769, disclosureLevel:'detailed' },
  ],
};

const juventudeBrFiscalYearMeta = {
  2020: {
    currency:'BRL',
    fxRef:'BRL@2020-12-31',
    sourceId:'juventude-br-demonstracoes-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:0.73381295, cash:0.02633058,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.70489589, tax:0,
    officialTotalRevenue:32.38344847, officialTotalExpenses:33.40529292, officialPAT:-2.72674034,
  },
};

const juventudeBrPresupuestoOverlayByYear = {};

const juventudeBrPasesData = [];
const juventudeBrResultadosData = {};
const juventudeBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['juventude-br'] = {
  revenueLinesByYear: juventudeBrRevenueLinesByYear, expenseLinesByYear: juventudeBrExpenseLinesByYear,
  fiscalYearMeta: juventudeBrFiscalYearMeta, pasesData: juventudeBrPasesData,
  resultadosData: juventudeBrResultadosData, titulosData: juventudeBrTitulosData,
  presupuestoOverlayByYear: juventudeBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'juventude-br-demonstracoes-2020': {
    id:'juventude-br-demonstracoes-2020', clubId:'juventude-br',
    title:'Relatório dos Auditores Independentes sobre as Demonstrações Financeiras, 31 de Dezembro de 2020 e 2019',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://fgf.com.br/demonstracoes-financeiras-filiados/2020',
    note:'PDF oficial (escaneo, sin capa de texto — la transcripción original en Clubes/Brasil/Juventude/demonstracoes-financeiras-2020.md tiene ruido de OCR; los números cargados acá salen de una relectura directa de la imagen a 300dpi de la página con la Demonstração do Déficit/Superávit, ver comentario de cabecera del archivo de datos). Auditado por Rosito & Filomena Auditores Independentes (Porto Alegre), opinião COM RESSALVA: (a) el club no deprecia/amortiza la totalidad de su activo imobilizado/intangível; (b) no aplicó la Resolução 1.292/10 (valor recuperável de activos); (c) mantiene la marca JUVENTUDE revaluada en R$6.000.000 desde 1996, práctica no aceita en Brasil. Déficit real de R$2.726.740,34, con passivo a descoberto de R$8.011.948,22 al cierre (arrastre de moratoria PROFUT de 2009-2015 + contingencias). Convertido a USD con PTAX BCB de cierre 31/12/2020 (R$5,1967, fx literal — ver comentario de cabecera). Descargado del repositorio de demonstrações financeiras de clubes filiados de la Federação Gaúcha de Futebol. Transcripción completa (con ruido de OCR sin corregir) en Clubes/Brasil/Juventude/demonstracoes-financeiras-2020.md.',
  },
});

memberCountByClub['juventude-br'] = null;

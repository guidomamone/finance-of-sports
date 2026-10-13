const amazonasBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Receita de Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:36.05576460, disclosureLevel:'aggregate' },
  ],
};

const amazonasBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Custo das atividades Esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-33.06579984, disclosureLevel:'aggregate' },
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-2.54805502, disclosureLevel:'aggregate' },
    { rawLabel:'Despesas Comerciais', normalizedCategory:'admin_general_expense', amountNative:-2.85553898, disclosureLevel:'aggregate' },
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.95349552, disclosureLevel:'aggregate' },
    { rawLabel:'Outras Despesas Operacionais', normalizedCategory:'other_expenses', amountNative:-0.00060156, disclosureLevel:'aggregate' },
  ],
};

const amazonasBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'amazonas-br-balanco-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:0.9230075, cash:0.12759833,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.01401904, tax:0,
    officialTotalRevenue:36.05576460, officialTotalExpenses:39.42349092, officialPAT:-3.38174536,
  },
};

const amazonasBrPresupuestoOverlayByYear = {};

const amazonasBrPasesData = [];
const amazonasBrResultadosData = {};
const amazonasBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['amazonas-br'] = {
  revenueLinesByYear: amazonasBrRevenueLinesByYear, expenseLinesByYear: amazonasBrExpenseLinesByYear,
  fiscalYearMeta: amazonasBrFiscalYearMeta, pasesData: amazonasBrPasesData,
  resultadosData: amazonasBrResultadosData, titulosData: amazonasBrTitulosData,
  presupuestoOverlayByYear: amazonasBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'amazonas-br-balanco-2024': {
    id:'amazonas-br-balanco-2024', clubId:'amazonas-br',
    title:'Balanço Patrimonial em 31/12/2024 (Amazonas FC)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://web.archive.org/web/2026/https://amazonasfc.com.br/site/pagina/transparencia/',
    note:'PDF oficial (texto nativo, extraído con pdftotext -layout), firmado digitalmente por el Diretor Presidente y la Contadora (CRC-AM 013501/O-0). Recuperado vía Wayback Machine: el dominio amazonasfc.com.br no resuelve desde 2026-09-22 (ver fuentes/Brasil/Amazonas.md), pero la página de transparencia quedó archivada (snapshot 22/04/2026) y linkeaba este PDF. Documento MUY agregado: una sola página con Ativo/Passivo/DRE, sin notas explicativas ni anexos de desglose, y SIN un relatório de auditores independentes (a diferencia de Botafogo-SP/Juventude/Palmeiras). OJO: fuentes/Brasil/Amazonas.md (chequeo 2026-09-22) decía que con estos documentos "se puede armar el balance pero no un estado de resultados" — ESO NO ES CIERTO para balanco-patrimonial-2024.pdf específicamente, que SÍ trae una DRE completa de 7 líneas que reconcilia exacto (puede referirse solo a balancos-2022-2023.pdf, el otro archivo del club, excluido de esta carga por mala calidad de OCR); corregir esa nota en una sesión futura. Déficit real de R$3.381.745,36. Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Amazonas/balanco-patrimonial-2024.md.',
  },
});

memberCountByClub['amazonas-br'] = null;

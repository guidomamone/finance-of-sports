const mirassolRevenueLinesByYear = {
  2024: [
    { rawLabel:'Receita do exercício (bruta, operacional — sem desagregação na fonte)', normalizedCategory:'lump_football_operations', amountNative:59.339448, disclosureLevel:'aggregated' },
  ],
};

const mirassolExpenseLinesByYear = {
  2024: [
    { rawLabel:'Custos', normalizedCategory:'lump_football_operations_expense', amountNative:-36.105741, disclosureLevel:'aggregated' },
    { rawLabel:'Despesas operacionais', normalizedCategory:'admin_general_expense', amountNative:-19.090093, disclosureLevel:'aggregated' },
  ],
};

const mirassolFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'mirassol-br-relatorio-auditoria-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:0, cash:11.583747,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:0,
    officialTotalRevenue:59.339448, officialTotalExpenses:55.195834, officialPAT:4.143614,
  },
};

const mirassolPresupuestoOverlayByYear = {};

const mirassolPasesData = [];
const mirassolResultadosData = {};
const mirassolTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['mirassol-br'] = {
  revenueLinesByYear: mirassolRevenueLinesByYear, expenseLinesByYear: mirassolExpenseLinesByYear,
  fiscalYearMeta: mirassolFiscalYearMeta, pasesData: mirassolPasesData,
  resultadosData: mirassolResultadosData, titulosData: mirassolTitulosData,
  presupuestoOverlayByYear: mirassolPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'mirassol-br-relatorio-auditoria-2024': {
      id:'mirassol-br-relatorio-auditoria-2024', clubId:'mirassol-br',
      title:'Relatório de Auditoria Contábil, Exercício 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://mirassolfc.com.br/',
    },
});

gestionesByClub['mirassol-br'] = {
    sinconfirmar: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
  };

memberCountByClub['mirassol-br'] = null;

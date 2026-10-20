const urawareddiamondsRevenueLinesByYear = {
  2025: [
    { rawLabel:'スポンサー収入 (Ingreso por sponsors)', normalizedCategory:'sponsorship_commercial', amountNative:4195, disclosureLevel:'detailed' },
    { rawLabel:'入場料収入 (Ingreso por entradas/gate)', normalizedCategory:'matchday_competition', amountNative:2214, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)', normalizedCategory:'lump_football_operations', amountNative:4901, disclosureLevel:'aggregated_residual' },
  ],
};

const urawareddiamondsExpenseLinesByYear = {
  2025: [],
};

const urawareddiamondsFiscalYearMeta = {
  2025: {
    currency:'JPY', fxRef:'JPY@2025-12-31',
    sourceId:'urawareddiamonds-jp-jleague-doc-2025',
    reportType:'official_balance_sheet',
    gestionId:'temporada2025',
    grossDebt:null, cash:null, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:11310, officialTotalExpenses:null, officialPAT:null,
  },
};

const urawareddiamondsPresupuestoOverlayByYear = {};

const urawareddiamondsPasesData = [];
const urawareddiamondsResultadosData = {};
const urawareddiamondsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['urawareddiamonds-jp'] = {
  revenueLinesByYear: urawareddiamondsRevenueLinesByYear, expenseLinesByYear: urawareddiamondsExpenseLinesByYear,
  fiscalYearMeta: urawareddiamondsFiscalYearMeta, pasesData: urawareddiamondsPasesData,
  resultadosData: urawareddiamondsResultadosData, titulosData: urawareddiamondsTitulosData,
  presupuestoOverlayByYear: urawareddiamondsPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'urawareddiamonds-jp-jleague-doc-2025': {
    id:'urawareddiamonds-jp-jleague-doc-2025', clubId:'urawareddiamonds-jp',
    title:'クラブ経営情報開示資料 (Club Management Information Disclosure Material), edición 2025, J.League',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf',
    publicNote:'El documento lo publica la J.League, no el club. Por club informa solo el ingreso total, el de patrocinio y el de entradas: el resto del desglose de ingresos y todos los costos se publican por división (J1, J2, J3), no club por club.',
  },
});

gestionesByClub['urawareddiamonds-jp'] = {
  temporada2025: { nombre:'Temporada 2025', firstYear:2025, lastYear:2025 },
};

memberCountByClub['urawareddiamonds-jp'] = null;

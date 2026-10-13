const kawasakifrontaleRevenueLinesByYear = {
  2025: [
    { rawLabel:'スポンサー収入 (Ingreso por sponsors)', normalizedCategory:'sponsorship_commercial', amountNative:3765, disclosureLevel:'detailed' },
    { rawLabel:'入場料収入 (Ingreso por entradas/gate)', normalizedCategory:'matchday_competition', amountNative:1469, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)', normalizedCategory:'lump_football_operations', amountNative:4835, disclosureLevel:'aggregated_residual' },
  ],
};

const kawasakifrontaleExpenseLinesByYear = {
  2025: [],
};

const kawasakifrontaleFiscalYearMeta = {
  2025: {
    currency:'JPY', fxRef:'JPY@2025-12-31',
    sourceId:'kawasakifrontale-jleague-doc-2025',
    reportType:'official_balance_sheet',
    gestionId:'temporada2025',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:10069, officialTotalExpenses:null, officialPAT:null,
  },
};

const kawasakifrontalePresupuestoOverlayByYear = {};

const kawasakifrontalePasesData = [];
const kawasakifrontaleResultadosData = {};
const kawasakifrontaleTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.kawasakifrontale = {
  revenueLinesByYear: kawasakifrontaleRevenueLinesByYear, expenseLinesByYear: kawasakifrontaleExpenseLinesByYear,
  fiscalYearMeta: kawasakifrontaleFiscalYearMeta, pasesData: kawasakifrontalePasesData,
  resultadosData: kawasakifrontaleResultadosData, titulosData: kawasakifrontaleTitulosData,
  presupuestoOverlayByYear: kawasakifrontalePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'kawasakifrontale-jleague-doc-2025': {
    id:'kawasakifrontale-jleague-doc-2025', clubId:'kawasakifrontale',
    title:'クラブ経営情報開示資料 (Club Management Information Disclosure Material), edición 2025, J.League',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf',
    publicNote:'El documento lo publica la J.League, no el club. Por club informa solo el ingreso total, el de patrocinio y el de entradas: el resto del desglose de ingresos y todos los costos se publican por división (J1, J2, J3), no club por club.',
  },
});

gestionesByClub.kawasakifrontale = {
  temporada2025: { nombre:'Temporada 2025', firstYear:2025, lastYear:2025 },
};

memberCountByClub.kawasakifrontale = null;

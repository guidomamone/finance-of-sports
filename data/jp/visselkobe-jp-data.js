const visselkobeRevenueLinesByYear = {
  2025: [
    { rawLabel:'スポンサー収入 (Ingreso por sponsors)', normalizedCategory:'sponsorship_commercial', amountNative:3025, disclosureLevel:'detailed' },
    { rawLabel:'入場料収入 (Ingreso por entradas/gate)', normalizedCategory:'matchday_competition', amountNative:1441, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)', normalizedCategory:'lump_football_operations', amountNative:4245, disclosureLevel:'aggregated_residual' },
  ],
};

const visselkobeExpenseLinesByYear = {
  2025: [],
};

const visselkobeFiscalYearMeta = {
  2025: {
    currency:'JPY', fxRef:'JPY@2025-12-31',
    sourceId:'visselkobe-jp-jleague-doc-2025',
    reportType:'official_balance_sheet',
    gestionId:'temporada2025',
    grossDebt:null, cash:null, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:8711, officialTotalExpenses:null, officialPAT:null,
  },
};

const visselkobePresupuestoOverlayByYear = {};

const visselkobePasesData = [];
const visselkobeResultadosData = {};
const visselkobeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['visselkobe-jp'] = {
  revenueLinesByYear: visselkobeRevenueLinesByYear, expenseLinesByYear: visselkobeExpenseLinesByYear,
  fiscalYearMeta: visselkobeFiscalYearMeta, pasesData: visselkobePasesData,
  resultadosData: visselkobeResultadosData, titulosData: visselkobeTitulosData,
  presupuestoOverlayByYear: visselkobePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'visselkobe-jp-jleague-doc-2025': {
    id:'visselkobe-jp-jleague-doc-2025', clubId:'visselkobe-jp',
    title:'クラブ経営情報開示資料 (Club Management Information Disclosure Material), edición 2025, J.League',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf',
    publicNote:'El documento lo publica la J.League, no el club. Por club informa solo el ingreso total, el de patrocinio y el de entradas: el resto del desglose de ingresos y todos los costos se publican por división (J1, J2, J3), no club por club.',
  },
});

gestionesByClub.visselkobe = {
  temporada2025: { nombre:'Temporada 2025', firstYear:2025, lastYear:2025 },
};

memberCountByClub.visselkobe = null;

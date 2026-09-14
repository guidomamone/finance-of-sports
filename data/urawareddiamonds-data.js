// ============================================================================
// data/urawareddiamonds-data.js — Urawa Red Diamonds (浦和レッズ). Mismo lote de
// carga y misma fuente que Kashima Antlers (data/kashimaantlers-data.js) —
// ver ESE archivo para la metodología completa (qué desglosa el documento por
// club vs. solo por división, por qué expenseLinesByYear queda vacío, y el fx
// placeholder). Acá solo el detalle específico de Urawa.
//
// Urawa abreviado "浦和" en las tablas del club_doc-2025.pdf. Es el club de
// MAYOR ingreso de la liga en 2025 (113 億円/¥11.310M, el primero en superar
// los ¥10.000M junto con Kawasaki Frontale — ver fuentes/Japón/Urawa Red
// Diamonds.md).
// ============================================================================

const urawareddiamondsRevenueLinesByYear = {
  // Millones de JPY, Ejercicio 2025. Página 8: 浦和 2025年度 = 11.310 (+1.099 vs. 2024).
  // Página 9 (Sponsor): 4.195. Página 10 (Gate): 2.214.
  2025: [
    { rawLabel:'スポンサー収入 (Ingreso por sponsors)', normalizedCategory:'sponsorship_commercial', amountNative:4195, disclosureLevel:'detailed' },
    { rawLabel:'入場料収入 (Ingreso por entradas/gate)', normalizedCategory:'matchday_competition', amountNative:2214, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)', normalizedCategory:'other_income', amountNative:4901, disclosureLevel:'aggregated_residual' },
  ],
};

const urawareddiamondsExpenseLinesByYear = {
  2025: [],
};

const urawareddiamondsFiscalYearMeta = {
  2025: {
    currency:'JPY', fxRef:'JPY@2025-12-31',
    sourceId:'urawareddiamonds-jleague-doc-2025',
    reportType:'official_balance_sheet',
    gestionId:'temporada2025',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:11310, officialTotalExpenses:null, officialPAT:null,
  },
};

const urawareddiamondsPresupuestoOverlayByYear = {};

const urawareddiamondsPasesData = [];
const urawareddiamondsResultadosData = {};
const urawareddiamondsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.urawareddiamonds = {
  revenueLinesByYear: urawareddiamondsRevenueLinesByYear, expenseLinesByYear: urawareddiamondsExpenseLinesByYear,
  fiscalYearMeta: urawareddiamondsFiscalYearMeta, pasesData: urawareddiamondsPasesData,
  resultadosData: urawareddiamondsResultadosData, titulosData: urawareddiamondsTitulosData,
  presupuestoOverlayByYear: urawareddiamondsPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'urawareddiamonds-jleague-doc-2025': {
    id:'urawareddiamonds-jleague-doc-2025', clubId:'urawareddiamonds',
    title:'クラブ経営情報開示資料 (Club Management Information Disclosure Material), edición 2025, J.League',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf',
    publicNote:'El documento lo publica la J.League, no el club. Por club informa solo el ingreso total, el de patrocinio y el de entradas: el resto del desglose de ingresos y todos los costos se publican por división (J1, J2, J3), no club por club.',
    note:'Documento publicado por la propia J.League (no por Urawa directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.',
  },
});

gestionesByClub.urawareddiamonds = {
  temporada2025: { nombre:'Temporada 2025', firstYear:2025, lastYear:2025 },
};

memberCountByClub.urawareddiamonds = null;

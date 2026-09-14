// ============================================================================
// data/fctokyo-data.js — FC Tokyo (FC東京). Mismo lote de carga y misma
// fuente que Kashima Antlers (data/kashimaantlers-data.js) — ver ESE archivo
// para la metodología completa. Acá solo el detalle específico de FC Tokyo.
//
// Abreviado "FC東京" en las tablas del club_doc-2025.pdf (ojo con el gotcha de
// ancho de caracteres documentado en fuentes/Japón/_notas-generales.md: otros
// años pueden abreviar "ＦＣ東京" con caracteres de ancho completo).
// ============================================================================

const fctokyoRevenueLinesByYear = {
  // Millones de JPY, Ejercicio 2025. Página 8: FC東京 2025年度 = 7.210 (+221 vs. 2024).
  // Página 9 (Sponsor): 3.223. Página 10 (Gate): 1.439.
  2025: [
    { rawLabel:'スポンサー収入 (Ingreso por sponsors)', normalizedCategory:'sponsorship_commercial', amountNative:3223, disclosureLevel:'detailed' },
    { rawLabel:'入場料収入 (Ingreso por entradas/gate)', normalizedCategory:'matchday_competition', amountNative:1439, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)', normalizedCategory:'other_income', amountNative:2548, disclosureLevel:'aggregated_residual' },
  ],
};

const fctokyoExpenseLinesByYear = {
  2025: [],
};

const fctokyoFiscalYearMeta = {
  2025: {
    currency:'JPY', fxRef:'JPY@2025-12-31',
    sourceId:'fctokyo-jleague-doc-2025',
    reportType:'official_balance_sheet',
    gestionId:'temporada2025',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:7210, officialTotalExpenses:null, officialPAT:null,
  },
};

const fctokyoPresupuestoOverlayByYear = {};

const fctokyoPasesData = [];
const fctokyoResultadosData = {};
const fctokyoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.fctokyo = {
  revenueLinesByYear: fctokyoRevenueLinesByYear, expenseLinesByYear: fctokyoExpenseLinesByYear,
  fiscalYearMeta: fctokyoFiscalYearMeta, pasesData: fctokyoPasesData,
  resultadosData: fctokyoResultadosData, titulosData: fctokyoTitulosData,
  presupuestoOverlayByYear: fctokyoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fctokyo-jleague-doc-2025': {
    id:'fctokyo-jleague-doc-2025', clubId:'fctokyo',
    title:'クラブ経営情報開示資料 (Club Management Information Disclosure Material) — edición 2025, J.League',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf',
    note:'Documento publicado por la propia J.League (no por FC Tokyo directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.',
  },
});

gestionesByClub.fctokyo = {
  temporada2025: { nombre:'Temporada 2025', firstYear:2025, lastYear:2025 },
};

memberCountByClub.fctokyo = null;

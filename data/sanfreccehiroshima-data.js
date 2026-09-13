// ============================================================================
// data/sanfreccehiroshima-data.js — Sanfrecce Hiroshima (サンフレッチェ広島). Mismo
// lote de carga y misma fuente que Kashima Antlers (data/kashimaantlers-data.js)
// — ver ESE archivo para la metodología completa. Acá solo el detalle
// específico de Sanfrecce Hiroshima.
//
// Abreviado "広島" en las tablas del club_doc-2025.pdf.
// ============================================================================

const sanfreccehiroshimaRevenueLinesByYear = {
  // Millones de JPY, Ejercicio 2025. Página 8: 広島 2025年度 = 8.348 (+313 vs. 2024,
  // un salto grande desde 4.198 en 2023 — el propio documento no aclara el motivo puntual,
  // no se especula acá). Página 9 (Sponsor): 2.792. Página 10 (Gate): 2.166.
  2025: [
    { rawLabel:'スポンサー収入 (Ingreso por sponsors)', normalizedCategory:'sponsorship_commercial', amountNative:2792, disclosureLevel:'detailed' },
    { rawLabel:'入場料収入 (Ingreso por entradas/gate)', normalizedCategory:'matchday_competition', amountNative:2166, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)', normalizedCategory:'other_income', amountNative:3390, disclosureLevel:'aggregated_residual' },
  ],
};

const sanfreccehiroshimaExpenseLinesByYear = {
  2025: [],
};

const sanfreccehiroshimaFiscalYearMeta = {
  2025: {
    currency:'JPY', fx:150,
    sourceId:'sanfreccehiroshima-jleague-doc-2025',
    reportType:'official_balance_sheet',
    gestionId:'temporada2025',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:8348, officialTotalExpenses:null, officialPAT:null,
  },
};

const sanfreccehiroshimaPresupuestoOverlayByYear = {};

const sanfreccehiroshimaPasesData = [];
const sanfreccehiroshimaResultadosData = {};
const sanfreccehiroshimaTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.sanfreccehiroshima = {
  revenueLinesByYear: sanfreccehiroshimaRevenueLinesByYear, expenseLinesByYear: sanfreccehiroshimaExpenseLinesByYear,
  fiscalYearMeta: sanfreccehiroshimaFiscalYearMeta, pasesData: sanfreccehiroshimaPasesData,
  resultadosData: sanfreccehiroshimaResultadosData, titulosData: sanfreccehiroshimaTitulosData,
};

Object.assign(sources, {
  'sanfreccehiroshima-jleague-doc-2025': {
    id:'sanfreccehiroshima-jleague-doc-2025', clubId:'sanfreccehiroshima',
    title:'クラブ経営情報開示資料 (Club Management Information Disclosure Material) — edición 2025, J.League',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf',
    note:'Documento publicado por la propia J.League (no por Sanfrecce Hiroshima directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.',
  },
});

gestionesByClub.sanfreccehiroshima = {
  temporada2025: { nombre:'Temporada 2025', firstYear:2025, lastYear:2025 },
};

memberCountByClub.sanfreccehiroshima = null;

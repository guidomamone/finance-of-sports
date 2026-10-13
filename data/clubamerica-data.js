const clubamericaRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos del Segmento de Fútbol (incluye Estadio Banorte; Ollamani no desglosa Club América por separado, ver comentario de cabecera de este archivo)', normalizedCategory:'lump_football_operations', amountNative:2795.643, disclosureLevel:'detailed' },
  ],
};

const clubamericaExpenseLinesByYear = {
  2025: [
    { rawLabel:'Costos y gastos del Segmento de Fútbol (cifra IMPLÍCITA: Ingresos del segmento menos Utilidad operativa del segmento antes de D&A informada por Ollamani; el documento no desglosa costos por rubro a nivel segmento)', normalizedCategory:'lump_football_operations_expense', amountNative:-2751.732, disclosureLevel:'detailed' },
  ],
};

const clubamericaFiscalYearMeta = {
  2025: {
    currency:'MXN',
    fx:17.9528, fxSource:'document_close',
    sourceId:'clubamerica-ollamani-2025',
    reportType:'official_balance_sheet',
    gestionId:'ollamani',
    grossDebt:0, cash:0,
    profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:2795.643,
    officialTotalExpenses:2751.732,
    officialPAT:null,
  },
};

const clubamericaPresupuestoOverlayByYear = {};

const clubamericaPasesData = [];

const clubamericaResultadosData = {};
const clubamericaTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.clubamerica = {
  revenueLinesByYear: clubamericaRevenueLinesByYear, expenseLinesByYear: clubamericaExpenseLinesByYear,
  fiscalYearMeta: clubamericaFiscalYearMeta, pasesData: clubamericaPasesData,
  resultadosData: clubamericaResultadosData, titulosData: clubamericaTitulosData,
  presupuestoOverlayByYear: clubamericaPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'clubamerica-ollamani-2025': {
      id:'clubamerica-ollamani-2025', clubId:'clubamerica',
      title:'Ollamani, S.A.B. de C.V.: Reporte Financiero BMV (Trimestre 4D, Año 2025), Nota de Segmentos ("Segmento de Fútbol")',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://ollamani.com.mx/reportes-3/',
      publicNote:'Club América no publica un balance propio. Las cifras salen del segmento de fútbol de Ollamani, la compañía que controla al club, y ese segmento incluye también el negocio del Estadio Banorte sin desglose posible entre los dos. A nivel de segmento no se informan deuda ni caja.',
    },
});

gestionesByClub.clubamerica = {
  ollamani: { nombre:'Ollamani, S.A.B. (post-escisión de Televisa, 2024-actual)', firstYear:2025, lastYear:2025 },
};

memberCountByClub.clubamerica = null;

// GENERADO desde data/mx/clubamerica-mx.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const clubamericaMxRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos del Segmento de Fútbol (incluye Estadio Banorte; Ollamani no desglosa Club América por separado, ver comentario de cabecera de este archivo)","normalizedCategory":"lump_football_operations","amountNative":2795.643,"disclosureLevel":"detailed"},
  ],
};

const clubamericaMxExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Costos y gastos del Segmento de Fútbol (cifra IMPLÍCITA: Ingresos del segmento menos Utilidad operativa del segmento antes de D&A informada por Ollamani; el documento no desglosa costos por rubro a nivel segmento)","normalizedCategory":"lump_football_operations_expense","amountNative":-2751.732,"disclosureLevel":"detailed"},
  ],
};

const clubamericaMxFiscalYearMeta = {
  2025: {"currency":"MXN","sourceId":"clubamerica-mx-ollamani-2025","reportType":"official_balance_sheet","gestionId":"ollamani","fx":17.9528,"fxSource":"document_close","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":2795.643,"officialTotalExpenses":2751.732,"officialPAT":null,"sinDesglose":[{"renglon":"Ingresos del Segmento de Fútbol (incluye Estadio Banorte; Ollamani no desglosa Club América por separado, ver comentario de cabecera de este archivo)","lado":"revenue","importe":2795.643,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Costos y gastos del Segmento de Fútbol (cifra IMPLÍCITA: Ingresos del segmento menos Utilidad operativa del segmento antes de D&A informada por Ollamani; el documento no desglosa costos por rubro a nivel segmento)","lado":"expense","importe":2751.732,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"sales_total"},
};

const clubamericaMxPresupuestoOverlayByYear = {};

const clubamericaMxPasesData = [];
const clubamericaMxResultadosData = {};
const clubamericaMxTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["clubamerica-mx"] = {
  revenueLinesByYear: clubamericaMxRevenueLinesByYear, expenseLinesByYear: clubamericaMxExpenseLinesByYear,
  fiscalYearMeta: clubamericaMxFiscalYearMeta, pasesData: clubamericaMxPasesData,
  resultadosData: clubamericaMxResultadosData, titulosData: clubamericaMxTitulosData,
  presupuestoOverlayByYear: clubamericaMxPresupuestoOverlayByYear,
};

Object.assign(sources, {"clubamerica-mx-ollamani-2025":{"id":"clubamerica-mx-ollamani-2025","clubId":"clubamerica-mx","title":"Ollamani, S.A.B. de C.V.: Reporte Financiero BMV (Trimestre 4D, Año 2025), Nota de Segmentos (\"Segmento de Fútbol\")","type":"official_balance_sheet","reliability":"primary","url":"https://ollamani.com.mx/reportes-3/","publicNote":"Club América no publica un balance propio. Las cifras salen del segmento de fútbol de Ollamani, la compañía que controla al club, y ese segmento incluye también el negocio del Estadio Banorte sin desglose posible entre los dos. A nivel de segmento no se informan deuda ni caja."}});

gestionesByClub["clubamerica-mx"] = {"ollamani":{"nombre":"Ollamani, S.A.B. (post-escisión de Televisa, 2024-actual)","firstYear":2025,"lastYear":2025}};

memberCountByClub["clubamerica-mx"] = null;

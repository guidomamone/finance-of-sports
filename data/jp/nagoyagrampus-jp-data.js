// GENERADO desde data/jp/nagoyagrampus-jp.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const nagoyagrampusJpRevenueLinesByYear = {
  2025: [
    {"rawLabel":"スポンサー収入 (Ingreso por sponsors)","normalizedCategory":"sponsorship_commercial","amountNative":2988,"disclosureLevel":"detailed"},
    {"rawLabel":"入場料収入 (Ingreso por entradas/gate)","normalizedCategory":"matchday_competition","amountNative":1360,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)","normalizedCategory":"lump_football_operations","amountNative":2115,"disclosureLevel":"aggregated_residual"},
  ],
};

const nagoyagrampusJpExpenseLinesByYear = {
  2025: [

  ],
};

const nagoyagrampusJpFiscalYearMeta = {
  2025: {"currency":"JPY","sourceId":"nagoyagrampus-jp-jleague-doc-2025","reportType":"official_balance_sheet","gestionId":"temporada2025","fxRef":"JPY@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":6463,"officialTotalExpenses":null,"officialPAT":null,"sinDesglose":[{"renglon":"Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)","lado":"revenue","importe":2115,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const nagoyagrampusJpPresupuestoOverlayByYear = {};

const nagoyagrampusJpPasesData = [];
const nagoyagrampusJpResultadosData = {};
const nagoyagrampusJpTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["nagoyagrampus-jp"] = {
  revenueLinesByYear: nagoyagrampusJpRevenueLinesByYear, expenseLinesByYear: nagoyagrampusJpExpenseLinesByYear,
  fiscalYearMeta: nagoyagrampusJpFiscalYearMeta, pasesData: nagoyagrampusJpPasesData,
  resultadosData: nagoyagrampusJpResultadosData, titulosData: nagoyagrampusJpTitulosData,
  presupuestoOverlayByYear: nagoyagrampusJpPresupuestoOverlayByYear,
};

Object.assign(sources, {"nagoyagrampus-jp-jleague-doc-2025":{"id":"nagoyagrampus-jp-jleague-doc-2025","clubId":"nagoyagrampus-jp","title":"クラブ経営情報開示資料 (Club Management Information Disclosure Material), edición 2025, J.League","type":"official_balance_sheet","reliability":"primary","url":"https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf","publicNote":"El documento lo publica la J.League, no el club. Por club informa solo el ingreso total, el de patrocinio y el de entradas: el resto del desglose de ingresos y todos los costos se publican por división (J1, J2, J3), no club por club."}});

gestionesByClub["nagoyagrampus-jp"] = {"temporada2025":{"nombre":"Temporada 2025","firstYear":2025,"lastYear":2025}};

memberCountByClub["nagoyagrampus-jp"] = null;

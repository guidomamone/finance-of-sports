// GENERADO desde data/jp/sanfreccehiroshima-jp.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const sanfreccehiroshimaJpRevenueLinesByYear = {
  2025: [
    {"rawLabel":"スポンサー収入 (Ingreso por sponsors)","normalizedCategory":"sponsorship_commercial","amountNative":2792,"disclosureLevel":"detailed"},
    {"rawLabel":"入場料収入 (Ingreso por entradas/gate)","normalizedCategory":"matchday_competition","amountNative":2166,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)","normalizedCategory":"lump_football_operations","amountNative":3390,"disclosureLevel":"aggregated_residual"},
  ],
};

const sanfreccehiroshimaJpExpenseLinesByYear = {
  2025: [

  ],
};

const sanfreccehiroshimaJpFiscalYearMeta = {
  2025: {"currency":"JPY","sourceId":"sanfreccehiroshima-jp-jleague-doc-2025","reportType":"official_balance_sheet","gestionId":"temporada2025","fxRef":"JPY@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":8348,"officialTotalExpenses":null,"officialPAT":null,"sinDesglose":[{"renglon":"Otros ingresos (物販, distribución J.League, transferencias, academia, equipo femenino y otros — el documento NO los desglosa por club, solo a nivel de división)","lado":"revenue","importe":3390,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const sanfreccehiroshimaJpPresupuestoOverlayByYear = {};

const sanfreccehiroshimaJpPasesData = [];
const sanfreccehiroshimaJpResultadosData = {};
const sanfreccehiroshimaJpTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["sanfreccehiroshima-jp"] = {
  revenueLinesByYear: sanfreccehiroshimaJpRevenueLinesByYear, expenseLinesByYear: sanfreccehiroshimaJpExpenseLinesByYear,
  fiscalYearMeta: sanfreccehiroshimaJpFiscalYearMeta, pasesData: sanfreccehiroshimaJpPasesData,
  resultadosData: sanfreccehiroshimaJpResultadosData, titulosData: sanfreccehiroshimaJpTitulosData,
  presupuestoOverlayByYear: sanfreccehiroshimaJpPresupuestoOverlayByYear,
};

Object.assign(sources, {"sanfreccehiroshima-jp-jleague-doc-2025":{"id":"sanfreccehiroshima-jp-jleague-doc-2025","clubId":"sanfreccehiroshima-jp","title":"クラブ経営情報開示資料 (Club Management Information Disclosure Material), edición 2025, J.League","type":"official_balance_sheet","reliability":"primary","url":"https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf","publicNote":"El documento lo publica la J.League, no el club. Por club informa solo el ingreso total, el de patrocinio y el de entradas: el resto del desglose de ingresos y todos los costos se publican por división (J1, J2, J3), no club por club."}});

gestionesByClub["sanfreccehiroshima-jp"] = {"temporada2025":{"nombre":"Temporada 2025","firstYear":2025,"lastYear":2025}};

memberCountByClub["sanfreccehiroshima-jp"] = null;

const sevillafcRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:7.193, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:14.365, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:64.758, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:28.869, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:2.657, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.106, disclosureLevel:'detailed' },
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0.349, disclosureLevel:'detailed' },
    { rawLabel:'Otros Resultados', normalizedCategory:'other_income', amountNative:4.277, disclosureLevel:'detailed' },
  ],
};

const sevillafcExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-10.424, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-20.889, disclosureLevel:'detailed' },
    { rawLabel:'Gastos plantilla deportiva inscribible en la LFP', normalizedCategory:'wages_squad', amountNative:-84.988, disclosureLevel:'detailed' },
    { rawLabel:'Gastos plantilla deportiva no inscribible en la LFP', normalizedCategory:'wages_squad', amountNative:-8.080, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-20.850, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.418, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:2.548, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-2.070, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-1.368, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores inscribibles en la LFP', normalizedCategory:'other_expenses', amountNative:-3.343, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores no inscribibles en la LFP', normalizedCategory:'other_expenses', amountNative:-0.196, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado material', normalizedCategory:'depreciation', amountNative:-2.862, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado inmaterial (excluido jugadores)', normalizedCategory:'depreciation', amountNative:-0.161, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de adquisición de jugadores inscribibles en la LFP', normalizedCategory:'player_amortisation', amountNative:-24.122, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de adquisición de jugadores no inscribibles en la LFP', normalizedCategory:'player_amortisation', amountNative:-0.310, disclosureLevel:'detailed' },
  ],
};

const sevillafcFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'sevillafc-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    grossDebt:268.353, cash:39.247,
    profitOnPlayerSales:5.705, assetSales:0, netInterest:-4.807, tax:0,
    officialTotalRevenue:122.574, officialTotalExpenses:177.533, officialPAT:-54.061,
  },
};

const sevillafcPasesData = [];
const sevillafcResultadosData = {};
const sevillafcTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.sevillafc = {
  revenueLinesByYear: sevillafcRevenueLinesByYear, expenseLinesByYear: sevillafcExpenseLinesByYear,
  fiscalYearMeta: sevillafcFiscalYearMeta, pasesData: sevillafcPasesData,
  resultadosData: sevillafcResultadosData, titulosData: sevillafcTitulosData,
};

Object.assign(sources, {
  'sevillafc-cuentas-anuales-2024-25': {
      id:'sevillafc-cuentas-anuales-2024-25', clubId:'sevillafc',
      title:'Cuentas Anuales 2024-2025, Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://sevillafc.es/el-club/la-entidad/accionista/jga',
      note:'PDF oficial, escaneo sin capa de texto (leído renderizando páginas a imagen). Patrimonio Neto NEGATIVO al cierre (-122,813 M EUR) — club en situación financiera comprometida. Transcripción completa de la cuenta de resultados en Clubes/España/Sevilla FC/cuentas-anuales-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.sevillafc = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.sevillafc = null;

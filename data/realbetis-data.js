const realbetisRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones nacionales', normalizedCategory:'competition_bonus', amountNative:5.986473, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por competiciones europeas', normalizedCategory:'competition_bonus', amountNative:20.730690, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:21.663176, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:64.957035, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:37.291523, disclosureLevel:'detailed' },
    { rawLabel:'Trabajos realizados por la empresa para su activo', normalizedCategory:'other_income', amountNative:0.546884, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:7.146189, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados (Nota 15.8, principalmente traspasos de jugadores de Cantera)', normalizedCategory:'other_income', amountNative:36.897850, disclosureLevel:'detailed' },
  ],
};

const realbetisExpenseLinesByYear = {
  2025: [
    { rawLabel:'Consumo de material deportivo', normalizedCategory:'other_expenses', amountNative:-3.979839, disclosureLevel:'detailed' },
    { rawLabel:'Otros consumos y gastos externos', normalizedCategory:'admin_general_expense', amountNative:-8.737170, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios de plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-85.404892, disclosureLevel:'detailed' },
    { rawLabel:'Otros sueldos, salarios y asimilados', normalizedCategory:'admin_general_expense', amountNative:-12.544400, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-4.780469, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-28.652025, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.481227, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-7.787003, disclosureLevel:'detailed' },
    { rawLabel:'Gastos cesión de jugadores', normalizedCategory:'other_expenses', amountNative:-5.725000, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-2.461770, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-2.490471, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos federativos de jugadores (Nota 4/5)', normalizedCategory:'player_amortisation', amountNative:-23.343953, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones (propiedad industrial, aplicaciones informáticas, material)', normalizedCategory:'depreciation', amountNative:-3.913101, disclosureLevel:'detailed' },
  ],
};

const realbetisFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'realbetis-informe-auditoria-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    grossDebt:129.106402, cash:15.954506,
    profitOnPlayerSales:10.101484, assetSales:0, netInterest:-9.442450, tax:-1.008801,
    officialTotalRevenue:195.219820, officialTotalExpenses:190.301320, officialPAT:4.568734,
  },
};

const realbetisPasesData = [];
const realbetisResultadosData = {};
const realbetisTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.realbetis = {
  revenueLinesByYear: realbetisRevenueLinesByYear, expenseLinesByYear: realbetisExpenseLinesByYear,
  fiscalYearMeta: realbetisFiscalYearMeta, pasesData: realbetisPasesData,
  resultadosData: realbetisResultadosData, titulosData: realbetisTitulosData,
};

Object.assign(sources, {
  'realbetis-informe-auditoria-2024-25': {
      id:'realbetis-informe-auditoria-2024-25', clubId:'realbetis',
      title:'Informe de Auditoría, Memoria y Estado de Información No Financiera 2024-2025, Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
    },
});

gestionesByClub.realbetis = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.realbetis = null;

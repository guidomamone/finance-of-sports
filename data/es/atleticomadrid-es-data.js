const atleticomadridRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos deportivos', normalizedCategory:'matchday_competition', amountNative:134.956779, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:56.319660, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisiones', normalizedCategory:'broadcasting', amountNative:109.218501, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:113.460859, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por prestación de servicios', normalizedCategory:'other_income', amountNative:2.095125, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:31.338766, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.345591, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_income', amountNative:11.951083, disclosureLevel:'detailed' },
  ],
};

const atleticomadridExpenseLinesByYear = {
  2025: [
    { rawLabel:'Consumo de material deportivo', normalizedCategory:'other_expenses', amountNative:-3.872953, disclosureLevel:'detailed' },
    { rawLabel:'Otros consumos y gastos externos', normalizedCategory:'admin_general_expense', amountNative:-12.678877, disclosureLevel:'detailed' },
    { rawLabel:'Trabajos realizados por otras empresas', normalizedCategory:'admin_general_expense', amountNative:-17.472737, disclosureLevel:'detailed' },
    { rawLabel:'Deterioro de mercaderías, materias primas y otros aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-0.778669, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Salarios plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-229.311862, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-10.191500, disclosureLevel:'detailed' },
    { rawLabel:'Otros sueldos, salarios y asimilados', normalizedCategory:'admin_general_expense', amountNative:-40.435701, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-43.186087, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-3.478864, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-9.289851, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-9.352189, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:0.192813, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-13.684947, disclosureLevel:'detailed' },
    { rawLabel:'Amortización derechos adquisición jugadores', normalizedCategory:'player_amortisation', amountNative:-76.372748, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'depreciation', amountNative:-16.070669, disclosureLevel:'detailed' },
  ],
};

const atleticomadridFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'atleticomadrid-es-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    grossDebt:61.049280, cash:130.176510,
    profitOnPlayerSales:44.176920, assetSales:0, netInterest:-23.797408, tax:-0.072276,
    officialTotalRevenue:459.686364, officialTotalExpenses:485.984841, officialPAT:-5.991241,
  },
};

const atleticomadridPasesData = [];
const atleticomadridResultadosData = {};
const atleticomadridTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['atleticomadrid-es'] = {
  revenueLinesByYear: atleticomadridRevenueLinesByYear, expenseLinesByYear: atleticomadridExpenseLinesByYear,
  fiscalYearMeta: atleticomadridFiscalYearMeta, pasesData: atleticomadridPasesData,
  resultadosData: atleticomadridResultadosData, titulosData: atleticomadridTitulosData,
};

Object.assign(sources, {
  'atleticomadrid-es-cuentas-anuales-2024-25': {
      id:'atleticomadrid-es-cuentas-anuales-2024-25', clubId:'atleticomadrid-es',
      title:'Cuentas Anuales 2024-2025, Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.atleticodemadrid.com/pdf/cuentas_anuales_2025.pdf',
    },
});

gestionesByClub.atleticomadrid = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.atleticomadrid = null;

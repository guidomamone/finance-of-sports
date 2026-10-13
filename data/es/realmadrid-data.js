const realmadridRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos de socios y estadios', normalizedCategory:'matchday_competition', amountNative:326.092, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de amistosos y competiciones', normalizedCategory:'competition_bonus', amountNative:189.566, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de retransmisión', normalizedCategory:'broadcasting', amountNative:162.086, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de marketing', normalizedCategory:'sponsorship_commercial', amountNative:481.164, disclosureLevel:'detailed' },
    { rawLabel:'Trabajos realizados por la empresa para su activo', normalizedCategory:'other_income', amountNative:0.272, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:2.114, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.192, disclosureLevel:'detailed' },
    { rawLabel:'Excesos de provisiones', normalizedCategory:'other_income', amountNative:23.201, disclosureLevel:'detailed' },
  ],
};

const realmadridExpenseLinesByYear = {
  2025: [
    { rawLabel:'Consumo de materias primas y otras materias consumibles', normalizedCategory:'other_expenses', amountNative:-87.697, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de personal deportivo y no deportivo', normalizedCategory:'wages_squad', amountNative:-514.230, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-2.947, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-371.519, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de traspaso de jugadores (Nota 4, fútbol+baloncesto)', normalizedCategory:'player_amortisation', amountNative:-115.841, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del resto del inmovilizado (intangible no deportivo + material)', normalizedCategory:'depreciation', amountNative:-51.957, disclosureLevel:'detailed' },
  ],
};

const realmadridFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'realmadrid-informe-economico-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    grossDebt:141.014, cash:175.827,
    profitOnPlayerSales:34.647, assetSales:0, netInterest:-43.790, tax:-7.033,
    officialTotalRevenue:1184.687, officialTotalExpenses:1144.191, officialPAT:24.320,
  },
};

const realmadridPasesData = [];
const realmadridResultadosData = {};
const realmadridTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.realmadrid = {
  revenueLinesByYear: realmadridRevenueLinesByYear, expenseLinesByYear: realmadridExpenseLinesByYear,
  fiscalYearMeta: realmadridFiscalYearMeta, pasesData: realmadridPasesData,
  resultadosData: realmadridResultadosData, titulosData: realmadridTitulosData,
};

Object.assign(sources, {
  'realmadrid-informe-economico-2024-25': {
      id:'realmadrid-informe-economico-2024-25', clubId:'realmadrid',
      title:'Informe Económico Real Madrid 2024-2025 (Cuentas Anuales Consolidadas + Informe de Auditoría), Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.realmadrid.com/es-ES/el-club/transparencia/informes-economicos',
    },
});

gestionesByClub.realmadrid = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.realmadrid = null;

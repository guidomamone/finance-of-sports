const villarrealcfRevenueLinesByYear = {
  2024: [
    { rawLabel:'Importe neto de la cifra de negocios (ventas, sin desglosar por concepto)', normalizedCategory:'lump_football_operations', amountNative:119.721562, disclosureLevel:'summary' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:8.564334, disclosureLevel:'detailed' },
  ],
};

const villarrealcfExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aprovisionamientos (consumo de mercaderías y materias primas)', normalizedCategory:'other_expenses', amountNative:-5.542115, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos, salarios y asimilados + Cargas sociales (sin separar plantel deportivo/no deportivo)', normalizedCategory:'wages_squad', amountNative:-108.089071, disclosureLevel:'summary' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-21.563438, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.242450, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.001407, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-6.447510, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado (sin separar jugadores del resto, ver comentario arriba)', normalizedCategory:'player_amortisation', amountNative:-27.897705, disclosureLevel:'summary' },
  ],
};

const villarrealcfFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'villarrealcf-estados-financieros-2023-24',
    reportType:'official_balance_sheet',
    gestionId: null,
    grossDebt:116.355224, cash:47.616789,
    profitOnPlayerSales:26.425834, assetSales:0, netInterest:-0.945099, tax:1.895827,
    officialTotalRevenue:128.285896, officialTotalExpenses:169.783696, officialPAT:-14.121238,
  },
};

const villarrealcfPasesData = [];
const villarrealcfResultadosData = {};
const villarrealcfTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.villarrealcf = {
  revenueLinesByYear: villarrealcfRevenueLinesByYear, expenseLinesByYear: villarrealcfExpenseLinesByYear,
  fiscalYearMeta: villarrealcfFiscalYearMeta, pasesData: villarrealcfPasesData,
  resultadosData: villarrealcfResultadosData, titulosData: villarrealcfTitulosData,
};

Object.assign(sources, {
  'villarrealcf-estados-financieros-2023-24': {
      id:'villarrealcf-estados-financieros-2023-24', clubId:'villarrealcf',
      title:'Estados Financieros correspondientes al ejercicio anual terminado el 30 de junio de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://web.archive.org/web/2024/https://villarrealcf.es/wp-content/uploads/2.b.ii-CCAA-Villarreal-firmadas.pdf',
    },
});

gestionesByClub.villarrealcf = {
    ejercicio2024: { nombre:'Ejercicio 2023/24', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.villarrealcf = null;

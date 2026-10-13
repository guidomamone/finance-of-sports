const institutoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Cuotas sociales y abonos deportivos', normalizedCategory:'member_dues', amountNative:2734.838041, disclosureLevel:'detailed' },
    { rawLabel:'Abonos deportivos sede', normalizedCategory:'season_tickets', amountNative:110.393384, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de TV', normalizedCategory:'broadcasting', amountNative:2283.418911, disclosureLevel:'detailed' },
    { rawLabel:'Entradas generales fútbol', normalizedCategory:'matchday_competition', amountNative:1335.932147, disclosureLevel:'detailed' },
    { rawLabel:'Entradas plateas y palcos fútbol', normalizedCategory:'matchday_competition', amountNative:1851.384253, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad institucional', normalizedCategory:'sponsorship_commercial', amountNative:39.810623, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad otras competencias', normalizedCategory:'sponsorship_commercial', amountNative:1013.662215, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y sponsors fútbol', normalizedCategory:'sponsorship_commercial', amountNative:2832.484669, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:3288.129685, disclosureLevel:'detailed' },
    { rawLabel:'Centros educativos', normalizedCategory:'education', amountNative:1480.506179, disclosureLevel:'detailed' },
    { rawLabel:'Recursos predio La Agustina', normalizedCategory:'other_sports', amountNative:148.864908, disclosureLevel:'detailed' },
    { rawLabel:'Ventas de salón Gloriamanía', normalizedCategory:'other_income', amountNative:816.979303, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios recibidos', normalizedCategory:'other_income', amountNative:21.961181, disclosureLevel:'detailed' },
  ],
};

const institutoExpenseLinesByYear = {
  2024: [
    { rawLabel:'Remuneraciones y cargas (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-2501.512775, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones y cargas (Colegio)', normalizedCategory:'education_expense', amountNative:-979.100475, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones y cargas (Básquet/La Agustina/Sede/Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-456.740343, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (Colegio)', normalizedCategory:'education_expense', amountNative:-7.003365, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Colegio)', normalizedCategory:'education_expense', amountNative:-80.466336, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Básquet/La Agustina/Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-1038.399838, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-1123.895617, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (Colegio)', normalizedCategory:'education_expense', amountNative:-73.671180, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (Básquet/La Agustina/Sede/Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-639.357926, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento de bienes de uso (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-167.652401, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento de bienes de uso (Colegio)', normalizedCategory:'education_expense', amountNative:-145.746239, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento de bienes de uso (La Agustina/Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-559.041803, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia sede (Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-91.516356, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de energía, agua, gas, etc. (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-13.240852, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de energía, agua, gas, etc. (Colegio)', normalizedCategory:'education_expense', amountNative:-6.010492, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de energía, agua, gas, etc. (La Agustina/Sede/Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-99.188118, disclosureLevel:'detailed' },
    { rawLabel:'Gastos generales por eventos deportivos', normalizedCategory:'match_organisation_expense', amountNative:-895.612298, disclosureLevel:'detailed' },
    { rawLabel:'Viajes y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-1022.310864, disclosureLevel:'detailed' },
    { rawLabel:'Compras de mercadería (Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-669.262280, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones y acuerdos de rescisión', normalizedCategory:'other_expenses', amountNative:-3284.765346, disclosureLevel:'detailed' },
    { rawLabel:'Limpieza y vigilancia (Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-22.460193, disclosureLevel:'detailed' },
    { rawLabel:'Compras y préstamos de jugadores', normalizedCategory:'player_amortisation', amountNative:-213.545381, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia La Agustina (La Agustina)', normalizedCategory:'youth_other_sports_expense', amountNative:-112.503089, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones y cargas (administración)', normalizedCategory:'admin_general_expense', amountNative:-136.389896, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (administración)', normalizedCategory:'admin_general_expense', amountNative:-201.457618, disclosureLevel:'detailed' },
    { rawLabel:'Servicios, luz, agua, gas, etc. (administración)', normalizedCategory:'admin_general_expense', amountNative:-13.049239, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-1140.780590, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de juicios', normalizedCategory:'admin_general_expense', amountNative:-17.865467, disclosureLevel:'detailed' },
    { rawLabel:'Quebranto por juicios', normalizedCategory:'admin_general_expense', amountNative:-410.267638, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-310.502231, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del plantel profesional (intangibles)', normalizedCategory:'player_amortisation', amountNative:-317.109648, disclosureLevel:'detailed' },
    { rawLabel:'Gastos extraordinarios', normalizedCategory:'exceptional_items', amountNative:-18.911650, disclosureLevel:'detailed' },
  ],
};

const institutoFiscalYearMeta = {
  2024: {
    currency:'ARS', fxRef:'ARS@2024-06-30',
    sourceId:'instituto-balance-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'cavagliatto',
    grossDebt:2764.369893, cash:450.629479,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:641.475849, tax:0,
    officialTotalRevenue:17958.365499, officialTotalExpenses:16750.425894, officialPAT:1830.503804,
  },
};

const institutoPasesData = [];
const institutoResultadosData = {};
const institutoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.instituto = {
  revenueLinesByYear: institutoRevenueLinesByYear, expenseLinesByYear: institutoExpenseLinesByYear,
  fiscalYearMeta: institutoFiscalYearMeta, pasesData: institutoPasesData,
  resultadosData: institutoResultadosData, titulosData: institutoTitulosData,
};

Object.assign(sources, {
  'instituto-balance-2023-24': {
      id:'instituto-balance-2023-24', clubId:'instituto',
      title:'Estados Contables (balance auditado), Ejercicio Económico N°70, 1°/7/2023 al 30/6/2024',
      type:'official_balance_sheet', reliability:'primary',
    },
});

gestionesByClub.instituto = {
    cavagliatto: { nombre:'Cavagliatto (2021-actual)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.instituto = 30000;


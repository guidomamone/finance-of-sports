const silkeborgdkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Entrance fees', normalizedCategory:'matchday_competition', amountNative:9.756, disclosureLevel:'detailed' },
    { rawLabel:'TV revenue', normalizedCategory:'broadcasting', amountNative:25.150, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and collaboration agreements', normalizedCategory:'sponsorship_commercial', amountNative:28.640, disclosureLevel:'detailed' },
    { rawLabel:'Sale of merchandise', normalizedCategory:'sponsorship_commercial', amountNative:0.531, disclosureLevel:'detailed' },
    { rawLabel:'Compensation (FIFA/UEFA/DBU) + Prize income', normalizedCategory:'competition_bonus', amountNative:12.899, disclosureLevel:'detailed', items:[
      ['Compensation (FIFA/UEFA/DBU)', 6.188], ['Prize income', 6.711],
    ]},
    { rawLabel:'Food & beverage JYSK PARK', normalizedCategory:'stadium_other', amountNative:6.454, disclosureLevel:'detailed' },
    { rawLabel:'Other revenue', normalizedCategory:'other_income', amountNative:10.086, disclosureLevel:'detailed' },
    { rawLabel:'Salary refunds', normalizedCategory:'other_income', amountNative:0.271, disclosureLevel:'detailed' },
    { rawLabel:'Transfer income', normalizedCategory:'player_sales', amountNative:61.343, disclosureLevel:'detailed' },
  ],
};

const silkeborgdkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Other external expenses — match and player expenses', normalizedCategory:'match_organisation_expense', amountNative:-19.980, disclosureLevel:'detailed' },
    { rawLabel:'Other external expenses — sales and administrative expenses + other staff costs', normalizedCategory:'admin_general_expense', amountNative:-15.434, disclosureLevel:'detailed', items:[
      ['Sales and administrative expenses', -14.315], ['Other staff costs', -1.119],
    ]},
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-46.801, disclosureLevel:'detailed', items:[
      ['Wages and salaries', -44.259], ['Pension costs', -1.954], ['Other social security costs', -0.588],
    ]},
    { rawLabel:'Depreciation, amortisation and impairment losses — property, plant and equipment', normalizedCategory:'depreciation', amountNative:-8.073, disclosureLevel:'detailed', items:[
      ['Other fixtures and fittings, tools and equipment', -4.023], ['Leasehold improvements', -4.050],
    ]},
    { rawLabel:'Depreciation, amortisation and impairment losses — acquired intangible assets (contractual rights)', normalizedCategory:'player_amortisation', amountNative:-4.371, disclosureLevel:'detailed' },
  ],
};

const silkeborgdkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-12-31',
    sourceId:'silkeborg-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    netInterest:1.369,
    tax:-13.600,
    grossDebt:0, cash:20.522,
    officialTotalRevenue:155.130, officialTotalExpenses:94.659, officialPAT:48.240,
  },
};

const silkeborgdkPresupuestoOverlayByYear = {};

const silkeborgdkPasesData = [];
const silkeborgdkResultadosData = {};
const silkeborgdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['silkeborg-dk'] = {
  revenueLinesByYear: silkeborgdkRevenueLinesByYear, expenseLinesByYear: silkeborgdkExpenseLinesByYear,
  fiscalYearMeta: silkeborgdkFiscalYearMeta, pasesData: silkeborgdkPasesData,
  resultadosData: silkeborgdkResultadosData, titulosData: silkeborgdkTitulosData,
  presupuestoOverlayByYear: silkeborgdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'silkeborg-aarsrapport-2024': {
    id:'silkeborg-aarsrapport-2024', clubId:'silkeborg-dk',
    title:'Silkeborg IF A/S — Annual report 2024 (01.01.2024 - 31.12.2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Entidad única (CVR 26397731), sin subsidiarias consolidadas. Auditor: BDO Statsautoriseret revisionsaktieselskab, sin salvedades. Cambio de control societario el 18/12/2024 (Trivela Group V ApS compró 80% del capital), no afecta las cifras del ejercicio 2024. Transcripción completa en Clubes/Dinamarca/Silkeborg IF/aarsrapport-2024-12-31.md.',
  },
});

memberCountByClub['silkeborg-dk'] = null;

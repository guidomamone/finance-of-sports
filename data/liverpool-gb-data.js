const liverpoolGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:203.705, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:308.398, disclosureLevel:'detailed' },
    { rawLabel:'Match day', normalizedCategory:'matchday_competition', amountNative:101.661, disclosureLevel:'detailed' },
    { rawLabel:"Profit on disposal of registrations", normalizedCategory:'player_sales', amountNative:22.017, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:263.659, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:323.472, disclosureLevel:'detailed' },
    { rawLabel:'Match day', normalizedCategory:'matchday_competition', amountNative:115.591, disclosureLevel:'detailed' },
    { rawLabel:"Profit on disposal of registrations", normalizedCategory:'player_sales', amountNative:53.268, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:12.892, disclosureLevel:'detailed', items:[
      ['Insurance settlement relating to historic loss of earnings', 12.892],
    ]},
  ],
};

const liverpoolGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Cost of sales', normalizedCategory:'other_expenses', amountNative:-83.483, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs (wages and salaries, social security and pension costs — not split by department)', normalizedCategory:'wages_squad', amountNative:-386.086, disclosureLevel:'detailed', items:[
      ['Wages and salaries', -341.354], ['Social security costs', -40.141], ['Pension costs', -4.591],
    ]},
    { rawLabel:'Administrative expenses (other operating costs, not further disclosed by department)', normalizedCategory:'admin_general_expense', amountNative:-83.097, disclosureLevel:'partial', items:[
      ['Operating lease rentals', -2.751],
      ["Auditors' remuneration (audit, assurance and tax advisory fees)", -0.156],
      ['Profit on disposal of tangible fixed assets', 0.052],
      ['Other administrative costs (not itemised by the source)', -80.242],
    ]},
    { rawLabel:'Amortisation of registrations', normalizedCategory:'player_amortisation', amountNative:-114.479, disclosureLevel:'detailed' },
    { rawLabel:'Impairment loss on registrations', normalizedCategory:'player_impairment', amountNative:-0.618, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-15.218, disclosureLevel:'detailed' },
    { rawLabel:'Impairment loss on tangible fixed assets', normalizedCategory:'depreciation', amountNative:-0.458, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Cost of sales', normalizedCategory:'other_expenses', amountNative:-88.608, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs (wages and salaries, social security and pension costs — not split by department)', normalizedCategory:'wages_squad', amountNative:-427.727, disclosureLevel:'detailed', items:[
      ['Wages and salaries', -374.795], ['Social security costs', -48.881], ['Pension costs', -4.051],
    ]},
    { rawLabel:'Administrative expenses (other operating costs, not further disclosed by department)', normalizedCategory:'admin_general_expense', amountNative:-96.976, disclosureLevel:'partial', items:[
      ['Operating lease rentals', -3.093],
      ["Auditors' remuneration (audit and assurance fees)", -0.150],
      ['Profit on disposal of tangible fixed assets', 0.009],
      ['Other administrative costs (not itemised by the source)', -93.742],
    ]},
    { rawLabel:'Amortisation of registrations', normalizedCategory:'player_amortisation', amountNative:-117.165, disclosureLevel:'detailed' },
    { rawLabel:'Impairment loss on registrations', normalizedCategory:'player_impairment', amountNative:-0.183, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-14.462, disclosureLevel:'detailed' },
  ],
};

const liverpoolGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-05-31',
    sourceId:'liverpool-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:314.295, cash:7.504,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-9.446, tax:13.626,
    officialTotalRevenue:635.781, officialTotalExpenses:683.439, officialPAT:-43.478,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-05-31',
    sourceId:'liverpool-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:285.256, cash:2.541,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-8.549, tax:-6.939,
    officialTotalRevenue:768.882, officialTotalExpenses:745.121, officialPAT:8.273,
  },
};

const liverpoolGbPresupuestoOverlayByYear = {};

const liverpoolGbPasesData = [];
const liverpoolGbResultadosData = {};
const liverpoolGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['liverpool-gb'] = {
  revenueLinesByYear: liverpoolGbRevenueLinesByYear, expenseLinesByYear: liverpoolGbExpenseLinesByYear,
  fiscalYearMeta: liverpoolGbFiscalYearMeta, pasesData: liverpoolGbPasesData,
  resultadosData: liverpoolGbResultadosData, titulosData: liverpoolGbTitulosData,
  presupuestoOverlayByYear: liverpoolGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'liverpool-gb-group-accounts-2024': {
    id:'liverpool-gb-group-accounts-2024', clubId:'liverpool-gb',
    title:'The Liverpool Football Club and Athletic Grounds Limited — Annual report and consolidated financial statements, year ended 31 May 2024',
    type:'official_balance_sheet', reliability:'primary_official',
    url:'https://find-and-update.company-information.service.gov.uk/company/00035668/filing-history',
    publicNote:'Balance auditado consolidado, depositado en Companies House (Reino Unido) por The Liverpool Football Club and Athletic Grounds Limited, sociedad n.° 00035668. El documento no separa el costo de personal por área (plantel profesional vs. resto del club), así que "Salarios del plantel" en este ejercicio refleja el costo de personal TOTAL del grupo (jugadores, cuerpo técnico y todo el resto del staff), no solo el plantel profesional.',
    note:'Transcripción completa en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2023-24.md (38 págs. escaneadas, con capa de texto vía pdftotext/OCR previo, ver fuentes/Inglaterra/Liverpool.md). Ejercicio cerrado el 31 de mayo (confirmado en carátula y Group Strategic Report). Auditor: Ernst & Young LLP. Controlante última: Fenway Sports Group, LLC (Nota 25).',
  },
  'liverpool-gb-group-accounts-2025': {
    id:'liverpool-gb-group-accounts-2025', clubId:'liverpool-gb',
    title:'The Liverpool Football Club and Athletic Grounds Limited — Annual report and consolidated financial statements, year ended 31 May 2025',
    type:'official_balance_sheet', reliability:'primary_official',
    url:'https://find-and-update.company-information.service.gov.uk/company/00035668/filing-history',
    publicNote:'Balance auditado consolidado, depositado en Companies House (Reino Unido) por The Liverpool Football Club and Athletic Grounds Limited, sociedad n.° 00035668. Mismo criterio de personal sin desglosar por área que el ejercicio 2023/24 (ver su nota).',
    note:'Transcripción completa en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2024-25.md. Ejercicio cerrado el 31 de mayo. Controlante última: Fenway Sports Group, LLC (Nota 25). Incluye "Other operating income" (12,9 M GBP) por un seguro de lucro cesante, cargado a other_income.',
  },
});

gestionesByClub['liverpool-gb'] = { actual: { nombre:'Fenway Sports Group', firstYear:2024, lastYear:2025 } };

memberCountByClub['liverpool-gb'] = null;

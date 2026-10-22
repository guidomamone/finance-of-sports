// GENERADO desde data/gb/liverpool-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const liverpoolGbRevenueLinesByYear = {
  2022: [
    {"rawLabel":"Media","normalizedCategory":"broadcasting","amountNative":260.841,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercial","normalizedCategory":"sponsorship_commercial","amountNative":246.663,"disclosureLevel":"aggregated"},
    {"rawLabel":"Match day","normalizedCategory":"matchday_competition","amountNative":86.767,"disclosureLevel":"aggregated"},
    {"rawLabel":"Profit on disposal of players' registrations","normalizedCategory":"player_sales","amountNative":28.124,"disclosureLevel":"aggregated"},
  ],
  2023: [
    {"rawLabel":"Media","normalizedCategory":"broadcasting","amountNative":241.553,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercial","normalizedCategory":"sponsorship_commercial","amountNative":272.523,"disclosureLevel":"aggregated"},
    {"rawLabel":"Match day","normalizedCategory":"matchday_competition","amountNative":79.76,"disclosureLevel":"aggregated"},
    {"rawLabel":"Profit on disposal of players' registrations","normalizedCategory":"player_sales","amountNative":33.767,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Media","normalizedCategory":"broadcasting","amountNative":203.705,"disclosureLevel":"detailed"},
    {"rawLabel":"Commercial","normalizedCategory":"sponsorship_commercial","amountNative":308.398,"disclosureLevel":"detailed"},
    {"rawLabel":"Match day","normalizedCategory":"matchday_competition","amountNative":101.661,"disclosureLevel":"detailed"},
    {"rawLabel":"Profit on disposal of registrations","normalizedCategory":"player_sales","amountNative":22.017,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Media","normalizedCategory":"broadcasting","amountNative":263.659,"disclosureLevel":"detailed"},
    {"rawLabel":"Commercial","normalizedCategory":"sponsorship_commercial","amountNative":323.472,"disclosureLevel":"detailed"},
    {"rawLabel":"Match day","normalizedCategory":"matchday_competition","amountNative":115.591,"disclosureLevel":"detailed"},
    {"rawLabel":"Profit on disposal of registrations","normalizedCategory":"player_sales","amountNative":53.268,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating income","normalizedCategory":"other_income","amountNative":12.892,"disclosureLevel":"detailed","items":[["Insurance settlement relating to historic loss of earnings",12.892]]},
  ],
};

const liverpoolGbExpenseLinesByYear = {
  2022: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-67.305,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses (sin el costo de personal)","normalizedCategory":"admin_general_expense","amountNative":-178.949,"disclosureLevel":"aggregated"},
    {"rawLabel":"Staff costs (total de la nota de personal)","normalizedCategory":"wages_squad","amountNative":-366.092,"disclosureLevel":"aggregated"},
  ],
  2023: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-70.543,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses (sin el costo de personal)","normalizedCategory":"admin_general_expense","amountNative":-188.636,"disclosureLevel":"aggregated"},
    {"rawLabel":"Staff costs (total de la nota de personal)","normalizedCategory":"wages_squad","amountNative":-372.881,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-83.483,"disclosureLevel":"not_disclosed"},
    {"rawLabel":"Staff costs (wages and salaries, social security and pension costs — not split by department)","normalizedCategory":"wages_squad","amountNative":-386.086,"disclosureLevel":"detailed","items":[["Wages and salaries",-341.354],["Social security costs",-40.141],["Pension costs",-4.591]]},
    {"rawLabel":"Administrative expenses (other operating costs, not further disclosed by department)","normalizedCategory":"admin_general_expense","amountNative":-83.097,"disclosureLevel":"partial","items":[["Operating lease rentals",-2.751],["Auditors' remuneration (audit, assurance and tax advisory fees)",-0.156],["Profit on disposal of tangible fixed assets",0.052],["Other administrative costs (not itemised by the source)",-80.242]]},
    {"rawLabel":"Amortisation of registrations","normalizedCategory":"player_amortisation","amountNative":-114.479,"disclosureLevel":"detailed"},
    {"rawLabel":"Impairment loss on registrations","normalizedCategory":"player_impairment","amountNative":-0.618,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciation of tangible fixed assets","normalizedCategory":"depreciation","amountNative":-15.218,"disclosureLevel":"detailed"},
    {"rawLabel":"Impairment loss on tangible fixed assets","normalizedCategory":"depreciation","amountNative":-0.458,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-88.608,"disclosureLevel":"not_disclosed"},
    {"rawLabel":"Staff costs (wages and salaries, social security and pension costs — not split by department)","normalizedCategory":"wages_squad","amountNative":-427.727,"disclosureLevel":"detailed","items":[["Wages and salaries",-374.795],["Social security costs",-48.881],["Pension costs",-4.051]]},
    {"rawLabel":"Administrative expenses (other operating costs, not further disclosed by department)","normalizedCategory":"admin_general_expense","amountNative":-96.976,"disclosureLevel":"partial","items":[["Operating lease rentals",-3.093],["Auditors' remuneration (audit and assurance fees)",-0.15],["Profit on disposal of tangible fixed assets",0.009],["Other administrative costs (not itemised by the source)",-93.742]]},
    {"rawLabel":"Amortisation of registrations","normalizedCategory":"player_amortisation","amountNative":-117.165,"disclosureLevel":"detailed"},
    {"rawLabel":"Impairment loss on registrations","normalizedCategory":"player_impairment","amountNative":-0.183,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciation of tangible fixed assets","normalizedCategory":"depreciation","amountNative":-14.462,"disclosureLevel":"detailed"},
  ],
};

const liverpoolGbFiscalYearMeta = {
  2022: {"currency":"GBP","sourceId":"liverpool-gb-group-accounts-2021-22","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2022-05-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.58,"tax":-5.033,"grossDebt":null,"cash":null,"officialTotalRevenue":622.395,"officialTotalExpenses":612.346,"officialPAT":2.436,"extraRows":[{"label":"Interest receivable and similar income","value":0.893},{"label":"Interest payable and similar charges","value":-3.473},{"label":"Tax on profit/ loss on ordinary activities","value":-5.033}]},
  2023: {"currency":"GBP","sourceId":"liverpool-gb-group-accounts-2022-23","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2023-05-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-4.548,"tax":2.075,"grossDebt":null,"cash":null,"officialTotalRevenue":627.603,"officialTotalExpenses":632.06,"officialPAT":-6.93,"extraRows":[{"label":"Interest receivable and similar income","value":1.614},{"label":"Interest payable and similar charges","value":-6.162},{"label":"Tax on loss/ profit on ordinary activities","value":2.075}]},
  2024: {"currency":"GBP","sourceId":"liverpool-gb-group-accounts-2024","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"GBP@2024-05-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-9.446,"tax":13.626,"grossDebt":314.295,"cash":7.504,"officialTotalRevenue":635.781,"officialTotalExpenses":683.439,"officialPAT":-43.478},
  2025: {"currency":"GBP","sourceId":"liverpool-gb-group-accounts-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"GBP@2025-05-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-8.549,"tax":-6.939,"grossDebt":285.256,"cash":2.541,"officialTotalRevenue":768.882,"officialTotalExpenses":745.121,"officialPAT":8.273},
};

const liverpoolGbPresupuestoOverlayByYear = {};

const liverpoolGbPasesData = [];
const liverpoolGbResultadosData = {};
const liverpoolGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["liverpool-gb"] = {
  revenueLinesByYear: liverpoolGbRevenueLinesByYear, expenseLinesByYear: liverpoolGbExpenseLinesByYear,
  fiscalYearMeta: liverpoolGbFiscalYearMeta, pasesData: liverpoolGbPasesData,
  resultadosData: liverpoolGbResultadosData, titulosData: liverpoolGbTitulosData,
  presupuestoOverlayByYear: liverpoolGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"liverpool-gb-group-accounts-2024":{"id":"liverpool-gb-group-accounts-2024","clubId":"liverpool-gb","title":"The Liverpool Football Club and Athletic Grounds Limited — Annual report and consolidated financial statements, year ended 31 May 2024","type":"official_balance_sheet","reliability":"primary_official","url":"https://find-and-update.company-information.service.gov.uk/company/00035668/filing-history","publicNote":"Balance auditado consolidado, depositado en Companies House (Reino Unido) por The Liverpool Football Club and Athletic Grounds Limited, sociedad n.° 00035668. El documento no separa el costo de personal por área (plantel profesional vs. resto del club), así que \"Salarios del plantel\" en este ejercicio refleja el costo de personal TOTAL del grupo (jugadores, cuerpo técnico y todo el resto del staff), no solo el plantel profesional."},"liverpool-gb-group-accounts-2025":{"id":"liverpool-gb-group-accounts-2025","clubId":"liverpool-gb","title":"The Liverpool Football Club and Athletic Grounds Limited — Annual report and consolidated financial statements, year ended 31 May 2025","type":"official_balance_sheet","reliability":"primary_official","url":"https://find-and-update.company-information.service.gov.uk/company/00035668/filing-history","publicNote":"Balance auditado consolidado, depositado en Companies House (Reino Unido) por The Liverpool Football Club and Athletic Grounds Limited, sociedad n.° 00035668. Mismo criterio de personal sin desglosar por área que el ejercicio 2023/24 (ver su nota)."},"liverpool-gb-group-accounts-2021-22":{"id":"liverpool-gb-group-accounts-2021-22","clubId":"liverpool-gb","title":"The Liverpool Football Club and Athletic Grounds Limited — liverpool-group-accounts-2021-22 (ejercicio 2022)","type":"official_balance_sheet","reliability":"primary"},"liverpool-gb-group-accounts-2022-23":{"id":"liverpool-gb-group-accounts-2022-23","clubId":"liverpool-gb","title":"The Liverpool Football Club and Athletic Grounds Limited — liverpool-group-accounts-2022-23 (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["liverpool-gb"] = {"actual":{"nombre":"Fenway Sports Group","firstYear":2024,"lastYear":2025}};

memberCountByClub["liverpool-gb"] = null;

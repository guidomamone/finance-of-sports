const stgallenchRevenueLinesByYear = {
  2025: [
    { rawLabel:'Erträge aus Transfers und Leihgebühren', normalizedCategory:'player_sales', amountNative:3.353, disclosureLevel:'aggregated' },
    { rawLabel:'Diverse Erträge inklusive Swiss Football League', normalizedCategory:'other_income', amountNative:9.512, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge aus FutureChampsOstschweiz', normalizedCategory:'youth_football', amountNative:1.416, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge von Gönnern und Mitgliedern', normalizedCategory:'member_dues', amountNative:1.246, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Fussballspielen', normalizedCategory:'matchday_competition', amountNative:11.607, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Werbung und Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:9.547, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Hospitality und Logen', normalizedCategory:'stadium_other', amountNative:5.167, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:2.32, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Drittveranstaltungen', normalizedCategory:'other_income', amountNative:0.107, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Conference Arena / Diverse Erträge', normalizedCategory:'other_income', amountNative:1.245, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Ertrag', normalizedCategory:'other_income', amountNative:0.044, disclosureLevel:'aggregated' },
    { rawLabel:'Veränderung Wertberichtigungen', normalizedCategory:'other_income', amountNative:0.021, disclosureLevel:'aggregated' },
    { rawLabel:'Ertragsminderungen', normalizedCategory:'other_income', amountNative:-0.484, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Erträge brutto', normalizedCategory:'lump_football_operations', amountNative:28.001, disclosureLevel:'aggregated' },
    { rawLabel:'Entschädigung von FCSG Event AG', normalizedCategory:'other_income', amountNative:6.405, disclosureLevel:'aggregated' },
    { rawLabel:'Ertragsminderungen', normalizedCategory:'other_income', amountNative:-0.304, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Ertrag', normalizedCategory:'other_income', amountNative:0.713, disclosureLevel:'aggregated' },
    { rawLabel:'Auflösung Rückstellungen', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Erträge brutto', normalizedCategory:'lump_football_operations', amountNative:31.998, disclosureLevel:'aggregated' },
    { rawLabel:'Ertragsminderungen', normalizedCategory:'other_income', amountNative:-0.315, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Ertrag', normalizedCategory:'other_income', amountNative:0.986, disclosureLevel:'aggregated' },
    { rawLabel:'Entschädigung von FCSG Event AG', normalizedCategory:'other_income', amountNative:9.8, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Erträge brutto', normalizedCategory:'lump_football_operations', amountNative:37.47, disclosureLevel:'aggregated' },
    { rawLabel:'Ertragsminderungen', normalizedCategory:'other_income', amountNative:-0.456, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Ertrag', normalizedCategory:'other_income', amountNative:0.154, disclosureLevel:'aggregated' },
  ],
};
const stgallenchExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aufwand für Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-4.845, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Transfers', normalizedCategory:'other_expenses', amountNative:-1.378, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Spielorganisation Fussball', normalizedCategory:'match_organisation_expense', amountNative:-3.701, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Catering', normalizedCategory:'other_expenses', amountNative:-2.164, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Werbung und Sponsoring', normalizedCategory:'admin_general_expense', amountNative:-1.005, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Mechandising', normalizedCategory:'other_expenses', amountNative:-1.876, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Drittveranstaltungen', normalizedCategory:'other_expenses', amountNative:-0.012, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Conference Arena / Diverses', normalizedCategory:'other_expenses', amountNative:-0.074, disclosureLevel:'aggregated' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-20.833, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiger Betriebsaufwand', normalizedCategory:'admin_general_expense', amountNative:-5.372, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.362, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-2.059, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Direkte Kosten', normalizedCategory:'lump_football_operations_expense', amountNative:-8.165, disclosureLevel:'aggregated' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-14.747, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiger Betriebsaufwand', normalizedCategory:'admin_general_expense', amountNative:-4.145, disclosureLevel:'aggregated' },
    { rawLabel:'Entschädigung an FCSG AG', normalizedCategory:'other_expenses', amountNative:-6.405, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-0.846, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.339, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Aufwand', normalizedCategory:'exceptional_items', amountNative:-0.16, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentliche Abschreibungen', normalizedCategory:'exceptional_items', amountNative:-3.999, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Direkte Kosten', normalizedCategory:'lump_football_operations_expense', amountNative:-8.912, disclosureLevel:'aggregated' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-15.459, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiger Betriebsaufwand', normalizedCategory:'admin_general_expense', amountNative:-4.124, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.21, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-1.071, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Aufwand', normalizedCategory:'exceptional_items', amountNative:-0.03, disclosureLevel:'aggregated' },
    { rawLabel:'Entschädigung an FCSG AG', normalizedCategory:'other_expenses', amountNative:-9.8, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Direkte Kosten', normalizedCategory:'lump_football_operations_expense', amountNative:-11.154, disclosureLevel:'aggregated' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-17.004, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiger Betriebsaufwand', normalizedCategory:'admin_general_expense', amountNative:-4.434, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.156, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-1.412, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Aufwand', normalizedCategory:'exceptional_items', amountNative:-1.127, disclosureLevel:'aggregated' },
  ],
};
const stgallenchFiscalYearMeta = {
  2025: {
    currency:'CHF', fxRef:'CHF@2025-06-30',
    sourceId:'stgallen-ch-geschaeftsbericht-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.292, tax:-0.011,
    extraRows: [
      {label:'Finanzerfolg', value:-0.292},
      {label:'Steuern', value:-0.011},
    ],
    incluidoEn:{"broadcasting":{"en":"other_income","posible":true}},
    grossDebt:null, cash:null,
    officialTotalRevenue:45.101, officialTotalExpenses:44.681, officialPAT:0.117,
  },
  2019: {
    currency:'CHF', fxRef:'CHF@2019-06-30',
    sourceId:'stgallen-ch-geschaeftsbericht-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.067, tax:-0.004,
    extraRows: [
      {label:'Finanzerfolg', value:-0.067},
      {label:'Steuern', value:-0.004},
    ],
    sinDesglose: [
      {renglon:'Erträge brutto', lado:'revenue', importe:28.001, motivo:'Claude 2026-10-19 (subagente Sonnet, revisado): Erträge brutto del grupo consolidado AG + Event AG (renglón combinado con subtotales mezclados); sin desglose único: lump_football_operations'},
      {renglon:'Direkte Kosten', lado:'expense', importe:8.165, motivo:'Claude 2026-10-19 (subagente Sonnet, revisado por suma): Direkte Kosten mezcla Spielbetrieb, Transfers, Werbung, Merchandising y Catering de las dos sociedades; no es solo organización de partidos'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:34.815, officialTotalExpenses:35.647, officialPAT:-5.063,
  },
  2022: {
    currency:'CHF', fxRef:'CHF@2022-06-30',
    sourceId:'stgallen-ch-geschaeftsbericht-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.223, tax:-0.01,
    extraRows: [
      {label:'Finanzerfolg', value:-0.223},
      {label:'Steuern', value:-0.01},
    ],
    sinDesglose: [
      {renglon:'Erträge brutto', lado:'revenue', importe:31.998, motivo:'Claude 2026-10-19 (subagente Sonnet, revisado): Erträge brutto del grupo consolidado AG + Event AG (renglón combinado con subtotales mezclados); sin desglose único: lump_football_operations'},
      {renglon:'Direkte Kosten', lado:'expense', importe:8.912, motivo:'Claude 2026-10-19 (subagente Sonnet, revisado por suma): Direkte Kosten mezcla Spielbetrieb, Transfers, Werbung, Merchandising y Catering de las dos sociedades; no es solo organización de partidos'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:42.469, officialTotalExpenses:40.576, officialPAT:1.63,
  },
  2023: {
    currency:'CHF', fxRef:'CHF@2023-06-30',
    sourceId:'stgallen-ch-geschaeftsbericht-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.264, tax:-0.014,
    extraRows: [
      {label:'Finanzerfolg', value:-0.264},
      {label:'Steuern', value:-0.014},
    ],
    sinDesglose: [
      {renglon:'Erträge brutto', lado:'revenue', importe:37.47, motivo:'Claude 2026-10-19 (subagente Sonnet, revisado): Erträge brutto del grupo consolidado AG + Event AG (renglón combinado con subtotales mezclados); sin desglose único: lump_football_operations'},
      {renglon:'Direkte Kosten', lado:'expense', importe:11.154, motivo:'Claude 2026-10-19 (subagente Sonnet, revisado por suma): Direkte Kosten mezcla Spielbetrieb, Transfers, Werbung, Merchandising y Catering de las dos sociedades; no es solo organización de partidos'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:37.168, officialTotalExpenses:35.16, officialPAT:0.603,
  },
};
const stgallenchPresupuestoOverlayByYear = {};

const stgallenchPasesData = [];
const stgallenchResultadosData = {};
const stgallenchTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['stgallen-ch'] = {
  revenueLinesByYear: stgallenchRevenueLinesByYear, expenseLinesByYear: stgallenchExpenseLinesByYear,
  fiscalYearMeta: stgallenchFiscalYearMeta, pasesData: stgallenchPasesData,
  resultadosData: stgallenchResultadosData, titulosData: stgallenchTitulosData,
  presupuestoOverlayByYear: stgallenchPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'stgallen-ch-geschaeftsbericht-2024-25': {
    id:'stgallen-ch-geschaeftsbericht-2024-25', clubId:'stgallen-ch',
    title:'FC St.Gallen AG — geschaeftsbericht-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'stgallen-ch-geschaeftsbericht-2018-19': {
    id:'stgallen-ch-geschaeftsbericht-2018-19', clubId:'stgallen-ch',
    title:'FC St.Gallen AG — geschaeftsbericht-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'stgallen-ch-geschaeftsbericht-2021-22': {
    id:'stgallen-ch-geschaeftsbericht-2021-22', clubId:'stgallen-ch',
    title:'FC St.Gallen AG — geschaeftsbericht-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'stgallen-ch-geschaeftsbericht-2022-23': {
    id:'stgallen-ch-geschaeftsbericht-2022-23', clubId:'stgallen-ch',
    title:'FC St.Gallen AG — geschaeftsbericht-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['stgallen-ch'] = null;

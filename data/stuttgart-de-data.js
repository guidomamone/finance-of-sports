const stuttgartDeRevenueLinesByYear = {
  2023: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:35.845000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung/Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:30.414000, disclosureLevel:'detailed' },
    { rawLabel:'Medienvermarktung', normalizedCategory:'broadcasting', amountNative:56.756000, disclosureLevel:'detailed' },
    { rawLabel:'Handel und Sonstiges', normalizedCategory:'lump_football_operations', amountNative:81.077000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:13.530360, disclosureLevel:'not_disclosed' },
  ],
  2024: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:53.493000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung/Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:39.778000, disclosureLevel:'detailed' },
    { rawLabel:'Medienvermarktung', normalizedCategory:'broadcasting', amountNative:89.890000, disclosureLevel:'detailed' },
    { rawLabel:'Handel und Sonstiges', normalizedCategory:'lump_football_operations', amountNative:109.498000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:7.156091, disclosureLevel:'not_disclosed' },
  ],
};

const stuttgartDeExpenseLinesByYear = {
  2023: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-9.779388, disclosureLevel:'not_disclosed', items:[
      ['Aufwendungen für bezogene Waren', -5.347668], ['Aufwendungen für bezogene Leistungen', -4.431720],
    ]},
    { rawLabel:'Personalaufwand: Lizenzspielerbereich (laut Lagebericht)', normalizedCategory:'wages_squad', amountNative:-71.100000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Personalaufwand: übrige Bereiche (Amateur-/Jugendbereich, Verwaltung/Geschäftsstelle, Aushilfen — Restwert)', normalizedCategory:'other_expenses', amountNative:-34.716695, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-20.268011, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf entgeltlich erworbene Konzessionen, Schutzrechte und ähnliche Rechte', normalizedCategory:'other_amortisation', amountNative:-0.044710, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-2.858487, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-71.307550, disclosureLevel:'not_disclosed' },
  ],
  2024: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-23.153317, disclosureLevel:'not_disclosed', items:[
      ['Aufwendungen für bezogene Waren', -8.012439], ['Aufwendungen für bezogene Leistungen', -15.140878],
    ]},
    { rawLabel:'Personalaufwand: Lizenzspielerbereich (laut Lagebericht)', normalizedCategory:'wages_squad', amountNative:-88.700000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Personalaufwand: übrige Bereiche (Amateur-/Jugendbereich, Verwaltung/Geschäftsstelle, Aushilfen — Restwert)', normalizedCategory:'other_expenses', amountNative:-45.427990, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-27.498827, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf entgeltlich erworbene Konzessionen, Schutzrechte und ähnliche Rechte', normalizedCategory:'other_amortisation', amountNative:-0.042293, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.071713, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-89.987209, disclosureLevel:'not_disclosed' },
  ],
};

const stuttgartDeFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-12-31',
    sourceId:'stuttgart-de-konzernabschluss-2023',
    reportType:'official_balance_sheet',
    gestionId:'wehrle',
    netInterest:-6.290382,
    tax:-0.578130,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:125.909849, cash:9.153243,
    officialTotalRevenue:217.622653, officialTotalExpenses:210.074841, officialPAT:0.679300,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'stuttgart-de-konzernabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'wehrle',
    netInterest:-3.910318,
    tax:-2.580281,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:140.706446, cash:10.438385,
    officialTotalRevenue:299.815224, officialTotalExpenses:277.881350, officialPAT:15.443276,
  },
};

const stuttgartDePresupuestoOverlayByYear = {};
const stuttgartDePasesData = []; const stuttgartDeResultadosData = {}; const stuttgartDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['stuttgart-de'] = {
  revenueLinesByYear: stuttgartDeRevenueLinesByYear, expenseLinesByYear: stuttgartDeExpenseLinesByYear,
  fiscalYearMeta: stuttgartDeFiscalYearMeta, pasesData: stuttgartDePasesData,
  resultadosData: stuttgartDeResultadosData, titulosData: stuttgartDeTitulosData,
  presupuestoOverlayByYear: stuttgartDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'stuttgart-de-konzernabschluss-2023': {
    id:'stuttgart-de-konzernabschluss-2023', clubId:'stuttgart-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.01.2023 bis zum 31.12.2023 (VfB Stuttgart 1893 AG, cuentas consolidadas)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado del Unternehmensregister alemán. Auditado por RSM Ebner Stolz GmbH & Co. KG, sin salvedades. Ejercicio CALENDARIO confirmado por el propio título del documento (01.01.2023-31.12.2023). "Handel und Sonstiges" (revenue) mezcla merchandising con venta neta de jugadores sin desglose exacto disponible — ver comentario de cabecera de data/stuttgart-de-data.js. Transcripción completa en Clubes/Alemania/VfB Stuttgart/konzernabschluss-2023.md.',
  },
  'stuttgart-de-konzernabschluss-2024': {
    id:'stuttgart-de-konzernabschluss-2024', clubId:'stuttgart-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.01.2024 bis zum 31.12.2024 (VfB Stuttgart 1893 AG, cuentas consolidadas)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado del Unternehmensregister alemán. Auditado por RSM Ebner Stolz GmbH & Co. KG, sin salvedades. Ejercicio CALENDARIO confirmado por el propio título del documento (01.01.2024-31.12.2024). Transcripción completa en Clubes/Alemania/VfB Stuttgart/konzernabschluss-2024.md.',
  },
});

gestionesByClub['stuttgart-de'] = {
  wehrle: { nombre:'Alexander Wehrle (Vorstandsvorsitzender)', firstYear:2023, lastYear:2024 },
};

memberCountByClub['stuttgart-de'] = null;

const bayernmunichDeRevenueLinesByYear = {
  2021: [
    { rawLabel:'Umsatz (Konzern, ohne Aufteilung nach Erlösquelle — das Dokument bringt nur den Gesamtwert)', normalizedCategory:'lump_football_operations', amountNative:643.9, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Umsatz (Einzelabschluss AG, ohne Aufteilung nach Erlösquelle — das Dokument bringt nur den Gesamtwert)', normalizedCategory:'lump_football_operations', amountNative:817.3, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Einnahmen aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:226.9, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Sponsoring und Vermarktung', normalizedCategory:'sponsorship_commercial', amountNative:225.7, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus medialer Vermarktung', normalizedCategory:'broadcasting', amountNative:91.7, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Transfers', normalizedCategory:'player_sales', amountNative:186.1, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:135.1, disclosureLevel:'detailed' },
    { rawLabel:'Sonstiges (Mieten und Pachten, New Media, Museum, Abstellungen DFB-Nationalspieler, FC Bayern II, Jugend- und Frauenfußball)', normalizedCategory:'other_income', amountNative:42.7, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Einnahmen aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:260.7, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Sponsoring und Vermarktung', normalizedCategory:'sponsorship_commercial', amountNative:240.4, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus medialer Vermarktung', normalizedCategory:'broadcasting', amountNative:105.3, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Transfers', normalizedCategory:'player_sales', amountNative:117.7, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:150.5, disclosureLevel:'detailed' },
    { rawLabel:'Sonstiges (Mieten und Pachten, New Media, Museum, Abstellungen DFB-Nationalspieler, FC Bayern II, Jugend- und Frauenfußball)', normalizedCategory:'other_income', amountNative:51.9, disclosureLevel:'detailed' },
  ],
};

const bayernmunichDeExpenseLinesByYear = {
  2021: [
    { rawLabel:'Aufwendungen vor Abschreibungen (Konzern; aus Umsatz 643,9 - EBITDA 98,4 errechnet)', normalizedCategory:'lump_football_operations_expense', amountNative:-545.5, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen und Zinsergebnis kombiniert (Konzern; aus EBITDA 98,4 - Gewinn vor Steuern 5,0 errechnet — das Dokument trennt Abschreibungen nicht vom Zinsergebnis, siehe Kommentar)', normalizedCategory:'depreciation', amountNative:-93.4, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Aufwendungen vor Abschreibungen (Einzelabschluss AG; aus Umsatz 817,3 - EBITDA 153,4 errechnet)', normalizedCategory:'lump_football_operations_expense', amountNative:-663.9, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen und Zinsergebnis kombiniert (Einzelabschluss AG; aus EBITDA 153,4 - Gewinn vor Steuern 35,5 errechnet — das Dokument trennt Abschreibungen nicht vom Zinsergebnis, siehe Kommentar)', normalizedCategory:'depreciation', amountNative:-117.9, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Gesamtpersonalaufwand', normalizedCategory:'wages_squad', amountNative:-396.5, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-325.0, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Materialaufwand und -einsatz', normalizedCategory:'other_expenses', amountNative:-53.9, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Transferentschädigungen', normalizedCategory:'player_amortisation', amountNative:-89.2, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen (resto, Anlageabschreibungen)', normalizedCategory:'depreciation', amountNative:-5.9, disclosureLevel:'aggregated_residual' },
  ],
  2025: [
    { rawLabel:'Gesamtpersonalaufwand', normalizedCategory:'wages_squad', amountNative:-408.3, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-310.0, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Materialaufwand und -einsatz', normalizedCategory:'other_expenses', amountNative:-59.9, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Transferentschädigungen', normalizedCategory:'player_amortisation', amountNative:-126.4, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen (resto, Anlageabschreibungen)', normalizedCategory:'depreciation', amountNative:-5.9, disclosureLevel:'aggregated_residual' },
  ],
};

const bayernmunichDeFiscalYearMeta = {
  2021: {
    incluidoEn:{ sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_sales:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, player_impairment:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'bayernmunich-de-jahresabschluss-2021',
    reportType:'official_balance_sheet',
    gestionId:'rummenigge',
    netInterest:0, tax:-3.1, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:643.9, officialTotalExpenses:638.9, officialPAT:1.9,
  },
  2023: {
    incluidoEn:{ sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_sales:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, player_impairment:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'bayernmunich-de-jahresabschluss-2023',
    reportType:'official_balance_sheet',
    gestionId:'kahn',
    netInterest:0, tax:-12.9, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:817.3, officialTotalExpenses:781.8, officialPAT:22.6,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'bayernmunich-de-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:4.4, tax:-12.6, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:908.1, officialTotalExpenses:870.5, officialPAT:29.5,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'bayernmunich-de-jahresabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:1.9, tax:-6.7, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:926.6, officialTotalExpenses:910.5, officialPAT:11.3,
  },
};

const bayernmunichDePresupuestoOverlayByYear = {};
const bayernmunichDePasesData = [];
const bayernmunichDeResultadosData = {};
const bayernmunichDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['bayernmunich-de'] = {
  revenueLinesByYear: bayernmunichDeRevenueLinesByYear, expenseLinesByYear: bayernmunichDeExpenseLinesByYear,
  fiscalYearMeta: bayernmunichDeFiscalYearMeta, pasesData: bayernmunichDePasesData,
  resultadosData: bayernmunichDeResultadosData, titulosData: bayernmunichDeTitulosData,
  presupuestoOverlayByYear: bayernmunichDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'bayernmunich-de-jahresabschluss-2021': {
    id:'bayernmunich-de-jahresabschluss-2021', clubId:'bayernmunich-de',
    title:'Jahresabschluss der Saison 2020/2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Comunicado oficial anual del club (fcbayern.com, Direktion Medien, Digital und Kommunikation), SOLO 2 páginas — mucho más chico que los comunicados de 2023/24 y 2024/25 (7 páginas): trae solo el Konzern (Bilanz condensado + Umsatz/EBITDA/Gewinn vor Steuern/Jahresüberschuss), sin el desglose de GuV por rubro del Einzelabschluss que sí tienen los otros 2 ejercicios. revenueLines/expenseLines se cargaron con el máximo detalle que el documento permite (1 línea de ingreso sin desglosar, 2 de gasto derivadas matemáticamente de las 4 cifras impresas) — ver comentario de cabecera de data/bayernmunich-de-data.js para el detalle completo de la aproximación (la línea de depreciation combina D&A con el resultado financiero neto, que el documento no separa). Sin nota de deuda financiera (no se cargó grossDebt/cash, mismo criterio que 2023/24 y 2024/25). Convertido a USD con el cierre BCE del 30/6/2021 (1 EUR = 1,1884 USD), consultado en esta sesión vía api.frankfurter.dev — no está en FX_CLOSE compartido todavía. Transcripción completa en Clubes/Alemania/Bayern Munich/jahresabschluss-2020-21.md.',
  },
  'bayernmunich-de-jahresabschluss-2023': {
    id:'bayernmunich-de-jahresabschluss-2023', clubId:'bayernmunich-de',
    title:'Jahresabschluss der Saison 2022/23',
    type:'official_balance_sheet', reliability:'primary',
    note:'Comunicado oficial anual del club (fcbayern.com, Direktion Medien und Kommunikation), 4 páginas — pese al nombre del archivo ("presseinformation"), es el mismo tipo de comunicado que jahresabschluss-2020-21.md: trae Bilanz condensado (Aktiva/Passiva) del Konzern Y del Einzelabschluss AG, más Kennzahlen Umsatz/EBITDA/Gewinn vor Steuern/Jahresüberschuss de cada nivel y una tabla histórica de 10 años, pero SIN el desglose de GuV por rubro que sí tienen 2023/24 y 2024/25. revenueLines/expenseLines se cargaron con el máximo detalle que el documento permite (1 línea de ingreso sin desglosar, 2 de gasto derivadas matemáticamente de las 4 cifras del Einzelabschluss AG) — ver comentario de cabecera de data/bayernmunich-de-data.js para el detalle completo de la aproximación (la línea de depreciation combina D&A con el resultado financiero neto, que el documento no separa). Sin nota de deuda financiera (no se cargó grossDebt/cash, mismo criterio que 2020/21, 2023/24 y 2024/25). Oliver Kahn fue Vorstandsvorsitzender casi todo el ejercicio (hasta el 25/5/2023); Jan-Christian Dreesen asumió el 1/6/2023, últimas semanas del ejercicio. Transcripción completa en Clubes/Alemania/Bayern Munich/presseinformation-jhv-2022-23.md.',
  },
  'bayernmunich-de-jahresabschluss-2024': {
    id:'bayernmunich-de-jahresabschluss-2024', clubId:'bayernmunich-de',
    title:'Jahresabschluss der Saison 2023/24',
    type:'official_balance_sheet', reliability:'primary',
    note:'Comunicado oficial anual del club (fcbayern.com, Direktion Medien und Kommunikation), 7 páginas, con Balance y GuV condensados de la AG Einzelabschluss y del Konzern. No es el Geschäftsbericht completo con Anhang notarial. Transcripción completa en Clubes/Alemania/Bayern Munich/jahresabschluss-2023-24.md.',
  },
  'bayernmunich-de-jahresabschluss-2025': {
    id:'bayernmunich-de-jahresabschluss-2025', clubId:'bayernmunich-de',
    title:'Jahresabschluss der Saison 2024/25',
    type:'official_balance_sheet', reliability:'primary',
    note:'Comunicado oficial anual del club (fcbayern.com, Direktion Medien und Kommunikation), 7 páginas. Transcripción completa en Clubes/Alemania/Bayern Munich/jahresabschluss-2024-25.md.',
  },
});

gestionesByClub['bayernmunich-de'] = {
  actual: { nombre:'Gestión actual (Jan-Christian Dreesen, Vorstandsvorsitzender)', firstYear:2024, lastYear:2025 },
  rummenigge: { nombre:'Karl-Heinz Rummenigge (Vorstandsvorsitzender)', firstYear:2021, lastYear:2021 },
  kahn: { nombre:'Oliver Kahn (Vorstandsvorsitzender, hasta el 25/5/2023)', firstYear:2023, lastYear:2023 },
};

memberCountByClub['bayernmunich-de'] = null;

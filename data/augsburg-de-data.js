// ============================================================================
// data/augsburg-de-data.js — Fußball-Club Augsburg 1907 GmbH & Co. KGaA
// (Augsburg, Alemania). Uno de 5 clubes alemanes cargados en paralelo el
// 2026-09-22 (país 'DE' / liga 'de-bundesliga' ya agregados a data/leagues.js
// por otra sesión). clubId = 'augsburg-de' (con guion, no 'augsburg' solo).
//
// FUENTE: Clubes/Alemania/FC Augsburg/konzernabschluss-2023-24.md y
// konzernabschluss-2024-25.md — extractos del Unternehmensregister alemán
// (bajados por sesión anterior, ver fuentes/Alemania/FC Augsburg.md), CADA
// UNO es el Konzernabschluss (cuentas CONSOLIDADAS del grupo: FCA KGaA +
// F.C. Augsburg Arena Besitz und Betriebs GmbH, 91,7% participación) para su
// ejercicio 01.07-30.06. El consolidado ES el total oficial de cada
// documento (no hay individual en paralelo).
//   - 2024 = ejercicio 01.07.2023-30.06.2024 (Konzern-GuV, pág. 3-4 del .md).
//   - 2025 = ejercicio 01.07.2024-30.06.2025 (Konzern-GuV, pág. 3-4 del .md).
//
// UMSATZERLÖSE (línea agrupadora, NO se carga como bolsón): la Nota VI
// ("Erläuterungen zur Konzern-Gewinn- und Verlustrechnung") de cada ejercicio
// desglosa la cifra en 6 conceptos con categoría real distinta entre sí, así
// que se promueven a 6 líneas de primer nivel (regla de club-data-mapping
// SKILL.md sección 1): Erlöse aus dem Spielbetrieb (matchday_competition),
// Werbung (sponsorship_commercial), TV-Einnahmen (broadcasting), Transfers
// (player_sales — la política contable declarada, "Transfererlöse... auf
// Basis einer Nettobilanzierung", confirma que esta cifra YA es neta de
// pérdidas por transferencia, por eso profitOnPlayerSales queda en 0 en
// fiscalYearMeta, no se netea de nuevo), Handel (sponsorship_commercial,
// venta de mercadería/fanshop del club) y Sonstiges (other_income). ESTA
// NOTA SOLO DA PRECISIÓN EN MILES DE EUR (TEUR), a diferencia del total
// impreso de Umsatzerlöse en la Konzern-GuV que sí es exacto al centavo —
// por eso la suma de estas 6 líneas queda ~560 EUR (2024) / ~292 EUR (2025)
// por debajo de Umsatzerlöse real, una diferencia de ~0,0005% de redondeo de
// la propia nota, documentada, no un error de carga (ver club-data-mapping
// SKILL.md sección 6).
//
// ABSCHREIBUNGEN (depreciación/amortización, también agrupadora en la
// Konzern-GuV): el Konzernanlagenspiegel (Anhang, tabla de movimientos del
// activo fijo) SÍ da el desglose exacto por tipo de activo, y las 3 partes
// tienen categoría real distinta → promovidas a 3 líneas: Spielerwerte
// (player_amortisation), Konzessionen/otros intangibles (other_amortisation)
// y Sachanlagen —Grundstücke+technische Anlagen+andere Anlagen, sumadas
// porque las 3 SON depreciation— (depreciation). Suma exacta contra el total
// impreso de "Abschreibungen" en ambos ejercicios (17.208.200,55 en 2024;
// 14.610.437,86 en 2025), verificado contra el propio Anlagenspiegel.
//
// PERSONALAUFWAND: Löhne und Gehälter + soziale Abgaben, sin split por
// departamento/plantel vs. resto (a diferencia de Vélez, este documento NO
// tiene un 2do eje por sector) → TODO a wages_squad (criterio default de
// club-data-mapping cuando no hay cómo separar), con las 2 sub-líneas como
// `items` de transparencia (misma categoría que el padre).
//
// SONSTIGE STEUERN (línea 11 de la Konzern-GuV, "otros impuestos" no ligados
// al resultado — no es Steuern vom Einkommen/vom Ertrag) → admin_general_expense,
// mismo criterio que Impuestos/tasas en el resto del sitio (club-data-mapping
// sección 17). Se carga como expenseLine (no como `tax`) para que
// officialTotalExpenses/PAT cierren con la fórmula estándar del sitio.
//
// AUFLÖSUNG UNTERSCHIEDSBETRAG AUS DER KAPITALKONSOLIDIERUNG (línea 12,
// reversión anual programada del pasivo por diferencia de primera
// consolidación de FCA Arena GmbH, HGB $309 Abs.2 — un ítem puramente de
// consolidación, no operativo ni de venta de jugadores/activos): sin un meta
// field dedicado para este caso, se cargó como revenueLine `other_income`
// (única categoría disponible que no lo tergiversa como algo que no es). VER
// DUDA genuina en el reporte de esta sesión: si el sitio necesita un campo
// propio para ítems de consolidación no operativos en vez de other_income.
//
// netInterest = Sonstige Zinsen und ähnliche Erträge − Zinsen und ähnliche
// Aufwendungen (neto, nunca como línea, club-data-mapping sección 2).
// tax = Steuern vom Einkommen und vom Ertrag (0,00 en 2024 por Jahresfehlbetrag;
// -2.990.125,88 en 2025, primer ejercicio con Ergebnis positivo del período).
// officialPAT = Konzernjahresfehlbetrag (2024) / Konzernjahresüberschuss (2025)
// — el resultado consolidado del AÑO (línea 13), ANTES de las líneas 14-16
// (asignación a minoritarios / arrastre de resultados, que son de balance,
// no del ejercicio).
//
// grossDebt = D. Verbindlichkeiten (línea angosta de deuda, excluye
// Rückstellungen/Rechnungsabgrenzungsposten — mismo criterio que Boca, ver
// club-data-mapping sección 14). cash = C. Kassenbestand, Guthaben bei
// Kreditinstituten (Schecks en 2024).
//
// Moneda: EUR, sin tipo de cambio propio declarado por el documento (ningún
// anexo de moneda extranjera en las 24 páginas revisadas) → fxRef a
// FX_CLOSE (data/currency-map.js), que YA tenía 'EUR@2024-06-30' y
// 'EUR@2025-06-30' antes de esta carga, no se agregó nada ahí.
//
// gestionId: 'actual' para los 2 años — la FCA KGaA es una KGaA con
// Geschäftsführung (Michael Ströll, estable en ambos ejercicios), no un
// club asociativo con presidencia electa por ejercicio en el sentido
// argentino, así que no aplica una atribución de "gestión" con ese
// significado (club-data-mapping sección 7 / club-or-year-onboarding
// sección 16: sin esa info, 'actual' es el default seguro).
// ============================================================================

const augsburgDeRevenueLinesByYear = {
  2024: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:15.541000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung', normalizedCategory:'sponsorship_commercial', amountNative:17.331000, disclosureLevel:'detailed' },
    { rawLabel:'TV-Einnahmen', normalizedCategory:'broadcasting', amountNative:48.991000, disclosureLevel:'detailed' },
    { rawLabel:'Transfers', normalizedCategory:'player_sales', amountNative:15.142000, disclosureLevel:'detailed' },
    { rawLabel:'Handel', normalizedCategory:'sponsorship_commercial', amountNative:3.426000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstiges', normalizedCategory:'other_income', amountNative:1.806000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:5.735098, disclosureLevel:'detailed' },
    { rawLabel:'Auflösung Unterschiedsbetrag aus der Kapitalkonsolidierung', normalizedCategory:'other_income', amountNative:1.016697, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:18.957000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung', normalizedCategory:'sponsorship_commercial', amountNative:17.880000, disclosureLevel:'detailed' },
    { rawLabel:'TV-Einnahmen', normalizedCategory:'broadcasting', amountNative:54.185000, disclosureLevel:'detailed' },
    { rawLabel:'Transfers', normalizedCategory:'player_sales', amountNative:44.985000, disclosureLevel:'detailed' },
    { rawLabel:'Handel', normalizedCategory:'sponsorship_commercial', amountNative:8.669000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstiges', normalizedCategory:'other_income', amountNative:1.386000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:2.983403, disclosureLevel:'detailed' },
    { rawLabel:'Auflösung Unterschiedsbetrag aus der Kapitalkonsolidierung', normalizedCategory:'other_income', amountNative:1.070795, disclosureLevel:'detailed' },
  ],
};

const augsburgDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aufwendungen für Roh-, Hilfs- und Betriebsstoffe und für bezogene Waren', normalizedCategory:'other_expenses', amountNative:-9.542689, disclosureLevel:'detailed' },
    { rawLabel:'Aufwendungen für bezogene Leistungen', normalizedCategory:'other_expenses', amountNative:-7.714990, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-59.599750, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -55.164649], ['soziale Abgaben', -4.435101],
    ]},
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-13.878242, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte', normalizedCategory:'other_amortisation', amountNative:-0.025290, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.304668, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-22.899545, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige Steuern', normalizedCategory:'admin_general_expense', amountNative:-0.117630, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Aufwendungen für Roh-, Hilfs- und Betriebsstoffe und für bezogene Waren', normalizedCategory:'other_expenses', amountNative:-10.170114, disclosureLevel:'detailed' },
    { rawLabel:'Aufwendungen für bezogene Leistungen', normalizedCategory:'other_expenses', amountNative:-15.460372, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-62.294068, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -57.555509], ['soziale Abgaben', -4.738560],
    ]},
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-10.974193, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte', normalizedCategory:'other_amortisation', amountNative:-0.018288, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.617957, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-26.082291, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige Steuern', normalizedCategory:'admin_general_expense', amountNative:-0.976323, disclosureLevel:'detailed' },
  ],
};

const augsburgDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'augsburg-de-konzernabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Sonstige Zinsen und ähnliche Erträge (807.870,83) − Zinsen und ähnliche Aufwendungen
    // (24.789,24), neto.
    netInterest:0.783082,
    // Steuern vom Einkommen und vom Ertrag = 0,00 (Jahresfehlbetrag, no corresponde impuesto).
    tax:0,
    // Transfers ya se carga NETO como revenueLine (player_sales) por política contable declarada
    // del club ("Nettobilanzierung"), no hay ganancia/pérdida por venta de jugadores aparte que
    // netear acá.
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:35.487566, cash:15.706786,
    officialTotalRevenue:108.989355, officialTotalExpenses:117.082804, officialPAT:-7.310368,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'augsburg-de-konzernabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:0.512983,
    // Steuern vom Einkommen und vom Ertrag = -2.990.125,88 (primer ejercicio con Ergebnis positivo
    // de la muttergesellschaft en el período cargado).
    tax:-2.990126,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:27.810112, cash:14.134535,
    officialTotalRevenue:150.115906, officialTotalExpenses:129.593606, officialPAT:18.045158,
  },
};

const augsburgDePresupuestoOverlayByYear = {};

const augsburgDePasesData = [];
const augsburgDeResultadosData = {};
const augsburgDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['augsburg-de'] = {
  revenueLinesByYear: augsburgDeRevenueLinesByYear, expenseLinesByYear: augsburgDeExpenseLinesByYear,
  fiscalYearMeta: augsburgDeFiscalYearMeta, pasesData: augsburgDePasesData,
  resultadosData: augsburgDeResultadosData, titulosData: augsburgDeTitulosData,
  presupuestoOverlayByYear: augsburgDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'augsburg-de-konzernabschluss-2024': {
    id:'augsburg-de-konzernabschluss-2024', clubId:'augsburg-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024 (Fußball-Club Augsburg 1907 GmbH & Co. KGaA)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Extracto del Unternehmensregister alemán (HRB 21812, Amtsgericht Augsburg). Cuentas CONSOLIDADAS del grupo (FCA KGaA + F.C. Augsburg Arena Besitz und Betriebs GmbH, 91,7%). Transcripción completa en Clubes/Alemania/FC Augsburg/konzernabschluss-2023-24.md.',
  },
  'augsburg-de-konzernabschluss-2025': {
    id:'augsburg-de-konzernabschluss-2025', clubId:'augsburg-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025 (Fußball-Club Augsburg 1907 GmbH & Co. KGaA)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Extracto del Unternehmensregister alemán (HRB 21812, Amtsgericht Augsburg). Cuentas CONSOLIDADAS del grupo (FCA KGaA + F.C. Augsburg Arena Besitz und Betriebs GmbH, 91,7%). Transcripción completa en Clubes/Alemania/FC Augsburg/konzernabschluss-2024-25.md.',
  },
});

gestionesByClub['augsburg-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['augsburg-de'] = null;

// ============================================================================
// data/bayernmunich-de-data.js — FC Bayern München AG (Alemania, Bundesliga).
//
// 2 ejercicios REALES (2023/24, 2024/25), fuente: el comunicado oficial anual "Jahresabschluss
// der Saison <año>" que el club publica en fcbayern.com (media@fcbayern.com), NO el Geschäftsbericht
// completo con Anhang notarial — es un resumen oficial de 7 páginas con el Balance y la GuV
// condensados, publicado por el propio club (no un tercero), así que se trata como fuente primaria
// (reliability:'primary'), aunque con menos desglose que el Konzernabschluss completo de Werder
// Bremen/Köln. Transcripciones completas en Clubes/Alemania/Bayern Munich/jahresabschluss-<año>.md.
// Hay también un jahresabschluss-2020-21.md y un presseinformation-jhv-2022-23.md más viejos, sin
// cargar (prioridad: los 2 ejercicios más recientes, per pedido explícito de esta sesión).
//
// NIVEL DE CUENTAS ELEGIDO: Einzelabschluss (AG standalone), NO el Konzern (consolidado con
// Allianz Arena München Stadion GmbH y el resto de las subsidiarias). Motivo: el documento da el
// desglose de ingresos/gastos por rubro SOLO para el Einzelabschluss ("2. Komponenten der Gewinn-
// und Verlustrechnung im Einzelabschluss der FC Bayern München AG"), el Konzern solo imprime 4
// cifras agregadas (Umsatz/EBITDA/EBT/Jahresüberschuss) sin desglose. Sin el desglose no hay forma
// de categorizar por normalizedCategory, así que se usa el nivel de cuentas que SÍ lo tiene — mismo
// criterio de club-data-mapping SKILL.md sección 13 ("cuando una estructura no alcanza para
// categorizar, buscar el nivel de detalle que sí distingue, no forzar sobre la que no alcanza").
// officialTotalRevenue/officialTotalExpenses/officialPAT son también los de la AG Einzelabschluss
// (908,1 M€ / 926,6 M€ de Umsatz), NO los 951,5 M€ / 978,3 M€ del Konzern — coherencia entre el
// nivel de detalle y el nivel de los totales.
//
// Ingresos (Einzelabschluss AG), 6 líneas impresas con cifra propia, todas 'detailed': Spielbetrieb
// (matchday_competition), Sponsoring und Vermarktung (sponsorship_commercial), mediale Vermarktung
// (broadcasting), Transfers (player_sales), Merchandising (sponsorship_commercial, mismo criterio
// que "Handel" de Werder Bremen: venta de indumentaria/merchandising del propio club, no un negocio
// no futbolístico separado), Sonstiges (other_income, incluye alquileres, museo, cesión de
// jugadores a la selección, FC Bayern II, fútbol juvenil y femenino — el documento no separa más).
//
// Gastos (Einzelabschluss AG): Gesamtpersonalaufwand (wages_squad, sin separar plantel de
// administrativo, el documento no llega a ese nivel), Betriebliche Aufwendungen (other_expenses, es
// su propia línea de P&L separada de Materialaufwand, sin más desglose impreso), Materialaufwand
// (other_expenses), Abschreibungen (player_amortisation por la porción "davon Abschreibungen auf
// Transferentschädigungen" impresa con cifra propia — pases de jugadores capitalizados — y
// depreciation por el resto, activo fijo).
//
// netInterest/tax: el documento NO imprime el resultado financiero ni el impuesto a las ganancias
// como líneas separadas (solo EBITDA/EBT/Jahresüberschuss). Se calculan como RESIDUALES:
// netInterest = EBT - (EBITDA - Abschreibungen); tax = Jahresüberschuss - EBT.
//
// VERIFICACIÓN EN NAVEGADOR (2026-09-25): `verifyTieOuts()` da "NO CIERRA, diferencia de 0.1" en 3
// checks de este club (Revenue 2024 y 2025, Resultado neto 2025) — NO es un error de carga, es el
// límite de precisión de la FUENTE: el comunicado de prensa redondea cada cifra a 1 decimal (100.000
// €), así que 6 líneas de revenue independientemente redondeadas pueden sumar hasta ±0,1 M€ distinto
// del total también redondeado a 1 decimal — a diferencia de Werder Bremen/Dortmund/RB Leipzig, que
// vienen de cuentas auditadas completas con cifras exactas al euro. Los 6 checks restantes (Expenses
// de los 2 años, PAT 2024) sí cierran exacto porque `officialTotalExpenses`/`officialPAT` se tomaron
// directo de sumar/usar las mismas cifras ya redondeadas que alimentan expenseLines, sin acumular
// redondeos independientes de un lado distintos del otro. Ver duda abierta en
// `Admin/dudas-por-club.md` (pedirle a Bayern el desglose exacto, si existiera un documento con más
// precisión que este comunicado).
//
// Moneda: EUR. Ningún ejercicio declara TC propio a USD (no es práctica habitual en cuentas
// alemanas) → fxRef contra FX_CLOSE (data/currency-map.js): 'EUR@2024-06-30' y 'EUR@2025-06-30' YA
// EXISTEN, no hace falta agregar nada.
//
// gestionId: 'actual' en los 2 ejercicios — Jan-Christian Dreesen es Vorstandsvorsitzender (CEO) en
// los 2.
// ============================================================================

const bayernmunichDeRevenueLinesByYear = {
  // Ejercicio 2024 (01.07.2023-30.06.2024). Fuente: jahresabschluss-2023-24.md, pág. 2.
  2024: [
    { rawLabel:'Einnahmen aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:226.9, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Sponsoring und Vermarktung', normalizedCategory:'sponsorship_commercial', amountNative:225.7, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus medialer Vermarktung', normalizedCategory:'broadcasting', amountNative:91.7, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Transfers', normalizedCategory:'player_sales', amountNative:186.1, disclosureLevel:'detailed' },
    { rawLabel:'Einnahmen aus Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:135.1, disclosureLevel:'detailed' },
    { rawLabel:'Sonstiges (Mieten und Pachten, New Media, Museum, Abstellungen DFB-Nationalspieler, FC Bayern II, Jugend- und Frauenfußball)', normalizedCategory:'other_income', amountNative:42.7, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025 (01.07.2024-30.06.2025). Fuente: jahresabschluss-2024-25.md, pág. 2.
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
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'bayernmunich-de-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest/tax residuales, ver comentario de cabecera. EBT=42,1; EBITDA-Abschr.=132,8-95,1=37,7 -> netInterest=4,4.
    // Jahresüberschuss=29,5; tax=29,5-42,1=-12,6.
    netInterest:4.4, tax:-12.6, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:908.1, officialTotalExpenses:870.5, officialPAT:29.5,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'bayernmunich-de-jahresabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // EBT=18,0; EBITDA-Abschr.=148,4-132,3=16,1 -> netInterest=1,9. Jahresüberschuss=11,3; tax=11,3-18,0=-6,7.
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
};

memberCountByClub['bayernmunich-de'] = null;

// ============================================================================
// data/bayernmunich-de-data.js — FC Bayern München AG (Alemania, Bundesliga).
//
// 3 ejercicios cargados: 2020/21, 2023/24, 2024/25. Fuente de los 2 más recientes: el comunicado
// oficial anual "Jahresabschluss der Saison <año>" que el club publica en fcbayern.com
// (media@fcbayern.com), NO el Geschäftsbericht completo con Anhang notarial — es un resumen oficial
// de 7 páginas con el Balance y la GuV condensados, publicado por el propio club (no un tercero), así
// que se trata como fuente primaria (reliability:'primary'), aunque con menos desglose que el
// Konzernabschluss completo de Werder Bremen/Köln. Transcripciones completas en
// Clubes/Alemania/Bayern Munich/jahresabschluss-<año>.md. Queda un presseinformation-jhv-2022-23.md
// más viejo, todavía sin cargar.
//
// EJERCICIO 2020/21 (jahresabschluss-2020-21.md): documento MUCHO MÁS CHICO que los otros 2 (2
// páginas, no 7) — SOLO trae el Konzern (nunca el Einzelabschluss con el desglose de GuV por rubro
// que sí tienen 2023/24 y 2024/25) y 4 cifras: Umsatz, EBITDA, Gewinn vor Steuern (EBT) y
// Jahresüberschuss, más el Bilanz Konzern condensado (Aktiva/Passiva) y una tabla histórica de 10
// años (solo Umsatz/EBITDA/Jahresüberschuss, sin más desglose). Confirmado con `pdftotext -layout`
// directo sobre el PDF (2 páginas, texto nativo) que la transcripción no se salteó nada — es TODO el
// contenido del documento real, no un problema de esta sesión. Categorización forzosamente distinta
// de 2023/24 y 2024/25 (ver detalle más abajo, después del comentario de esos 2 ejercicios) porque el
// documento no tiene el nivel de detalle que sí tienen esos 2.
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
// gestionId: 'actual' en 2024/2025 — Jan-Christian Dreesen es Vorstandsvorsitzender (CEO) en los 2.
// 2020/21 usa una gestión propia, ver más abajo.
//
// ---------------------------------------------------------------------------
// EJERCICIO 2020/21 — categorización (documento SIN desglose, ver nota de cabecera):
//
// El documento solo da 4 cifras (Konzern): Umsatz 643,9; EBITDA 98,4; Gewinn vor Steuern (EBT) 5,0;
// Jahresüberschuss 1,9 — más un Bilanz condensado sin nota de deuda financiera separada de otros
// pasivos (a diferencia de otros clubes, no se cargó grossDebt/cash para NINGÚN ejercicio de este
// club, mismo criterio que 2023/24 y 2024/25, que tampoco los tienen: el comunicado no alcanza ese
// nivel).
//
// Se cargó lo que el documento SÍ permite, sin inventar una separación que no está: revenueLines
// es UNA sola línea 'lump_football_operations' con el Umsatz completo (643,9) — no hay ninguna otra
// opción honesta, el documento no da NINGÚN desglose por rubro para el Konzern (esa apertura
// —Spielbetrieb/Sponsoring/mediale Vermarktung/Transfers/Merchandising/Sonstiges— solo existe para el
// Einzelabschluss de 2023/24 y 2024/25, que este documento de 2020/21 ni siquiera menciona).
//
// expenseLines tiene 2 líneas, ambas DERIVADAS matemáticamente de las 4 cifras (no inventadas):
// 1. 'Aufwendungen vor Abschreibungen' (lump_football_operations_expense) = Umsatz - EBITDA =
//    643,9 - 98,4 = 545,5: todo el gasto operativo en efectivo antes de amortizaciones, sin
//    desglose posible (mismo argumento que arriba, no hay ninguna apertura disponible).
// 2. 'Abschreibungen und Zinsergebnis kombiniert' (depreciation) = EBITDA - EBT = 98,4 - 5,0 = 93,4:
//    ACÁ HAY UNA APROXIMACIÓN DOCUMENTADA, no un hecho puro del documento. Este monto combina
//    Abschreibungen (D&A) Y Zinsergebnis (resultado financiero neto) — el documento NO los separa
//    (a diferencia de 2023/24 y 2024/25, donde SÍ hay líneas propias de "davon Abschreibungen auf
//    Transferentschädigungen" que permiten separar netInterest como residual, ver comentario de
//    cabecera de esos 2 años). Con solo Umsatz/EBITDA/EBT/Jahresüberschuss no hay forma matemática de
//    separar D&A de intereses: son 2 incógnitas y 1 sola ecuación. Se cargó el monto COMBINADO
//    entero como 'depreciation' (en vez de partirlo a ojo entre depreciation/netInterest) porque D&A
//    es casi con certeza el componente dominante (en 2023/24 y 2024/25, D&A fue 95,1 y 132,3 contra
//    un netInterest de apenas 4,4 y 1,9 — ~95-99% del gap EBITDA-EBT es D&A en los 2 años con
//    desglose real), así que `netInterest:0` para este ejercicio es la aproximación más chica
//    posible dado lo que hay, NO un hecho confirmado. Documentado acá y como pregunta abierta en
//    `Admin/dudas-por-club.md` (si existe un Jahresabschluss/Geschäftsbericht más completo de
//    2020/21, con el Einzelabschluss y su desglose de GuV, permitiría separar esto con precisión).
//
// tax = Jahresüberschuss - EBT = 1,9 - 5,0 = -3,1 (mismo método residual que 2023/24 y 2024/25, este
// SÍ es un hecho directo de las 2 cifras impresas, no una aproximación).
//
// TIE-OUT: revenue(643,9) - expenses(545,5+93,4=638,9) + netInterest(0) + tax(-3,1) = 1,9, EXACTO
// contra el Jahresüberschuss impreso — más preciso que 2023/24 y 2024/25 (que tienen ±0,1 M€ de
// diferencia por redondeo de 6 líneas independientes), simplemente porque acá hay menos líneas
// (2 en vez de 6) que redondear por separado.
//
// FX: cierre BCE del 30/6/2021 (miércoles, día hábil): 1 EUR = 1,1884 USD → 0.8415 (EUR por 1 USD),
// consultado en esta sesión vía api.frankfurter.dev (espejo de series del BCE). Promovido a
// 'EUR@2021-06-30' en FX_CLOSE (data/currency-map.js) en la integración de esta misma sesión.
//
// Gestión: Karl-Heinz Rummenigge fue Vorstandsvorsitzender (CEO) de Bayern Munich desde 2002 hasta
// su retiro en noviembre de 2021 — cubre la totalidad del ejercicio 2020/21 (01.07.2020-30.06.2021).
// Se cargó una gestión propia 'rummenigge', acotada a firstYear/lastYear:2021 (solo el año
// confirmado por esta carga, sin extender el rango a ejercicios no verificados en esta sesión).
// ---------------------------------------------------------------------------
// ============================================================================

const bayernmunichDeRevenueLinesByYear = {
  // Ejercicio 2021 (01.07.2020-30.06.2021). Fuente: jahresabschluss-2020-21.md — Konzern, sin
  // desglose por rubro (ver comentario de cabecera).
  2021: [
    { rawLabel:'Umsatz (Konzern, ohne Aufteilung nach Erlösquelle — das Dokument bringt nur den Gesamtwert)', normalizedCategory:'lump_football_operations', amountNative:643.9, disclosureLevel:'aggregated' },
  ],
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
  // Ejercicio 2021: 2 líneas derivadas matemáticamente de Umsatz/EBITDA/EBT (ver comentario de
  // cabecera para el detalle completo de la aproximación en la 2da línea).
  2021: [
    { rawLabel:'Aufwendungen vor Abschreibungen (Konzern; aus Umsatz 643,9 - EBITDA 98,4 errechnet)', normalizedCategory:'lump_football_operations_expense', amountNative:-545.5, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen und Zinsergebnis kombiniert (Konzern; aus EBITDA 98,4 - Gewinn vor Steuern 5,0 errechnet — das Dokument trennt Abschreibungen nicht vom Zinsergebnis, siehe Kommentar)', normalizedCategory:'depreciation', amountNative:-93.4, disclosureLevel:'aggregated' },
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
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'bayernmunich-de-jahresabschluss-2021',
    reportType:'official_balance_sheet',
    gestionId:'rummenigge',
    // netInterest:0 y la línea 'depreciation' de -93,4 combinan D&A + resultado financiero, ver
    // comentario de cabecera (aproximación documentada, el documento no los separa). tax = residual:
    // Jahresüberschuss 1,9 - EBT 5,0 = -3,1.
    netInterest:0, tax:-3.1, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:643.9, officialTotalExpenses:638.9, officialPAT:1.9,
  },
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
  'bayernmunich-de-jahresabschluss-2021': {
    id:'bayernmunich-de-jahresabschluss-2021', clubId:'bayernmunich-de',
    title:'Jahresabschluss der Saison 2020/2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Comunicado oficial anual del club (fcbayern.com, Direktion Medien, Digital und Kommunikation), SOLO 2 páginas — mucho más chico que los comunicados de 2023/24 y 2024/25 (7 páginas): trae solo el Konzern (Bilanz condensado + Umsatz/EBITDA/Gewinn vor Steuern/Jahresüberschuss), sin el desglose de GuV por rubro del Einzelabschluss que sí tienen los otros 2 ejercicios. revenueLines/expenseLines se cargaron con el máximo detalle que el documento permite (1 línea de ingreso sin desglosar, 2 de gasto derivadas matemáticamente de las 4 cifras impresas) — ver comentario de cabecera de data/bayernmunich-de-data.js para el detalle completo de la aproximación (la línea de depreciation combina D&A con el resultado financiero neto, que el documento no separa). Sin nota de deuda financiera (no se cargó grossDebt/cash, mismo criterio que 2023/24 y 2024/25). Convertido a USD con el cierre BCE del 30/6/2021 (1 EUR = 1,1884 USD), consultado en esta sesión vía api.frankfurter.dev — no está en FX_CLOSE compartido todavía. Transcripción completa en Clubes/Alemania/Bayern Munich/jahresabschluss-2020-21.md.',
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
};

memberCountByClub['bayernmunich-de'] = null;

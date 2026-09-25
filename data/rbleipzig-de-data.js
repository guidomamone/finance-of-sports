// ============================================================================
// data/rbleipzig-de-data.js — RasenBallsport Leipzig GmbH (Alemania, Bundesliga).
//
// 4 ejercicios REALES (2021/22, 2022/23, 2023/24, 2024/25), Jahresabschluss (HGB) bajado de
// unternehmensregister.de (registro mercantil oficial alemán), auditado por EY GmbH & Co. KG.
// Transcripciones completas en Clubes/Alemania/RB Leipzig/jahresabschluss-<ejercicio>.md. Hay una
// serie más larga 2014-2021/22 también transcripta — con 2021/22 ya cargado, el resto (2014-2020/21)
// queda sin cargar todavía — y un jahresabschluss-2018-stub.md que es un stub incompleto,
// correctamente excluido, NO USAR.
//
// EJERCICIO 2021/22 (jahresabschluss-2021-22.md): mismo tipo de documento y mismo nivel de detalle
// que los otros 3 (Jahresabschluss HGB completo, Lagebericht + Bilanz + GuV + Anhang, auditado por
// EY), CON LA MISMA DIFERENCIA ESTRUCTURAL que 2022/23 en el Anhang 4.1 (Umsatzerlöse): SOLO 3
// categorías (Spielbetrieb 255.395 + Handel 2.259 + Sonstigem 86.413 = 344.067 TEUR, reconcilia
// contra el Umsatzerlöse de la GuV, 344.067.408,00 EUR, con la tolerancia de redondeo a TEUR habitual
// de este Anhang), sin "Transfer- u. Leihgeschäft" separado.
//
// EJERCICIO 2022/23 (jahresabschluss-2022-23.md): mismo tipo de documento y mismo nivel de detalle
// que 2023/24 y 2024/25 (Jahresabschluss HGB completo, Lagebericht + Bilanz + GuV + Anhang,
// auditado por EY), CON UNA DIFERENCIA ESTRUCTURAL real en el Anhang 4.1 (Umsatzerlöse): este
// ejercicio desglosa por Tätigkeitsbereich en SOLO 3 categorías (Spielbetrieb, Handel, Sonstigem —
// 313.227+8.403+54.861=376.491 TEUR, reconcilia exacto contra el Umsatzerlöse total de la GuV,
// 376.490.670,75 EUR), NO 4 como 2023/24 y 2024/25 (que además separan "Transfer- u. Leihgeschäft").
// El propio documento explica por qué probablemente no hace falta la categoría separada ese año:
// "Transfererträge im abgelaufenen Geschäftsjahr waren geringer als im Vorjahr" (Lagebericht,
// Ertragslage) — sin una línea de transferencias grande, quedó dentro de "Sonstigem" sin separar.
// Se categorizó iguel que en 2023/24-2024/25 para las categorías que SÍ existen (Spielbetrieb ->
// lump_football_operations, Handel -> sponsorship_commercial), y 'Sonstigem' -> other_income
// (incluye lo que en otros ejercicios sería Transfer- u. Leihgeschäft, sin poder separarlo — el
// documento no lo desglosa este año, no se fuerza una separación que el dato no tiene). Mismo
// criterio aplicado a 2021/22 (su propio Lagebericht dice lo mismo: "die Transfererträge höher als
// in der Vorsaison ausgefallen", sin una línea propia en el Anhang de todas formas).
//
// GmbH (no KGaA/AG): entidad única, sin distinción Einzel-/Konzernabschluss como Bayern/Dortmund —
// mismo nivel de cuentas para ambos ejercicios, sin ambigüedad de qué nivel usar.
//
// Ingresos: la nota "Umsatzerlöse" (Anhang 4.1) desglosa por "Tätigkeitsbereich" (área de negocio) en
// 4 categorías: Spielbetrieb, Handel, Transfer- u. Leihgeschäft, Sonstigem. Esto reconcilia exacto
// para los 2 ejercicios: 2023/24 (249.693+10.597+193.146+9.971=463.407) y 2024/25
// (356.602+16.950+74.108+7.292=454.952, ver nota abajo sobre el valor de "Sonstigem").
//
// TRAMPA DE TRANSCRIPCIÓN ENCONTRADA Y CORREGIDA (relevante para cualquier sesión futura que
// retranscriba este documento): una primera lectura de jahresabschluss-2024-25.md pág. 8 leyó
// "Sonstigem" 2024/25 como 71.292 (con un "1" de más), lo que hacía sumar 518.952 en vez de 454.952
// — no reconciliaba contra el Umsatzerlöse total de la GuV (línea 1, pág. 5, SIEMPRE confiable). El
// valor correcto es 7.292 (SIN el "1"), confirmado cruzando contra `fuentes/Alemania/RB Leipzig.md`
// (que ya lo tenía anotado correcto desde el sourcing original) — con 7.292 la suma cierra EXACTO.
// Moraleja de club-data-mapping SKILL.md sección 10 aplicada al revés: acá SÍ había una fila que
// "no explicaba la diferencia" de otra fila, sino un dígito de más en la propia transcripción —
// conviene cruzar contra fuentes/<País>/<Club>.md antes de asumir que el documento fuente está mal.
//
// Categorización (ambos ejercicios, mismo criterio): Spielbetrieb es un bolsón amplio que el propio
// Anhang 4.1 dice que incluye "Erträge aus Sponsoringverträgen, Erträge aus Einnahmen des laufenden
// Spielbetriebs und der Fernsehwerbung" (sponsoring + matchday + TV combinados sin desglosar más) →
// lump_football_operations (no matchday_competition solo, sería subrepresentar lo que realmente
// contiene el número); Handel (merchandising) → sponsorship_commercial (mismo criterio que "Handel"
// de Werder Bremen); Transfer- u. Leihgeschäft → player_sales; Sonstigem → other_income.
//
// Gastos (ambos ejercicios reconcilian exacto): Materialaufwand → other_expenses (costo de bienes
// comprados, sin más desglose). Personalaufwand (Löhne+Gehälter + Soziale Abgaben, combinados en una
// sola línea porque el documento no separa plantel profesional de administrativo, a diferencia de
// Borussia Dortmund) → wages_squad. Abschreibungen: auf Spielerwerte (pases capitalizados) →
// player_amortisation; auf sonstige immaterielle Vermögensgegenstände (software, no pases) →
// other_amortisation; auf Sachanlagen (activo fijo tangible) → depreciation. Sonstige betriebliche
// Aufwendungen → other_expenses (sin desglose adicional impreso).
//
// netInterest/tax: "Finanzergebnis" (Sonstige Zinsen und ähnliche Erträge - Zinsen und ähnliche
// Aufwendungen) va completo a netInterest. tax = Steuern vom Einkommen und vom Ertrag + Sonstige
// Steuern (2 líneas separadas del GuV, sumadas). El total (revenue+expenses+netInterest+tax) cierra
// EXACTO contra el Jahresüberschuss impreso en los 2 ejercicios (2024: 4,690; 2025: 1,600939) — ver
// club-data-mapping SKILL.md sección 6.2.
//
// Moneda: EUR. Ningún ejercicio declara TC propio a USD → fxRef contra FX_CLOSE
// (data/currency-map.js): 'EUR@2022-06-30', 'EUR@2023-06-30', 'EUR@2024-06-30' y 'EUR@2025-06-30'
// YA EXISTEN, no hizo falta agregar nada para 2021/22 ni para 2022/23.
//
// 2022/23 también reconcilia EXACTO: netInterest = Finanzergebnis (Sonstige Zinsen 1,696404 -
// Zinsen und ähnliche Aufwendungen 4,727726 = -3,031322). tax = Steuern vom Einkommen und vom
// Ertrag (0,662665) + Sonstige Steuern (0,358534) = 1,021199 (guardado como tax:-1.021199, mismo
// signo que los otros 2 ejercicios). revenue(394,761484) - expenses(385,366929) + netInterest
// (-3,031322) + tax(-1,021199) = 5,342034, EXACTO contra el Jahresüberschuss impreso
// (5.342.033,84 EUR).
//
// 2021/22 reconcilia EXACTO: Materialaufwand (1,457145) + Personalaufwand (163,933354 =
// 158,546117 Löhne und Gehälter + 5,387237 Soziale Abgaben) + Abschreibungen (84,244145 auf
// Spielerwerte + 0,893053 auf sonstige immaterielle + 4,816530 auf Sachanlagen) + Sonstige
// betriebliche Aufwendungen (82,922600) = 338,266827, EXACTO contra el Betriebsaufwand total
// impreso (338.266.826,61 EUR). netInterest = Finanzergebnis (Sonstige Zinsen 0,208342 - Zinsen
// und ähnliche Aufwendungen 1,659164 = -1,450822). tax = Steuern vom Einkommen und vom Ertrag
// (1,832483) + Sonstige Steuern (0,188518) = 2,021001 (tax:-2.021001). revenue(346,510706) -
// expenses(338,266827) + netInterest(-1,450822) + tax(-2,021001) = 4,772056, EXACTO contra el
// Jahresüberschuss impreso (4.772.056,80 EUR).
//
// gestionId: 'actual' en los 4 ejercicios — Florian Hopp (CFO) y Johann Plenge (CSO) constantes en
// los 4; Oliver Mintzlaff fue Geschäftsführer (CEO) hasta el 14/11/2022 (cubre todo 2021/22, firma
// el Lagebericht de ese ejercicio junto con Hopp y Plenge) y el Geschäftsführer Sport cambió (Max
// Eberl hasta 5/10/2023, vacante, Marcel Schäfer desde 1/8/2024), sin afectar la gestión
// financiera/societaria (Red Bull GmbH, accionista único) en ninguno de los 4 ejercicios.
// ============================================================================

const rbleipzigDeRevenueLinesByYear = {
  // Ejercicio 2022 (01.07.2021-30.06.2022). Fuente: jahresabschluss-2021-22.md, pág. 5 (GuV) y pág.
  // 8 (Anhang 4.1, SOLO 3 categorías este ejercicio, mismo caso que 2022/23, ver comentario de cabecera).
  2022: [
    { rawLabel:'Umsatzerlöse aus Spielbetrieb (incluye sponsoring, matchday y TV sin desglosar más, ver Anhang 4.1)', normalizedCategory:'lump_football_operations', amountNative:255.395, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Umsatzerlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:2.259, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse aus Sonstigem (incluye Transfer- u. Leihgeschäft, sin línea propia este ejercicio, ver comentario de cabecera)', normalizedCategory:'other_income', amountNative:86.413, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Erhöhung des Bestands an unfertigen Leistungen', normalizedCategory:'other_income', amountNative:0.044473, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:2.398825, disclosureLevel:'aggregated_residual' },
  ],
  // Ejercicio 2023 (01.07.2022-30.06.2023). Fuente: jahresabschluss-2022-23.md, pág. 5 (GuV) y pág.
  // 8 (Anhang 4.1, SOLO 3 categorías este ejercicio, ver comentario de cabecera).
  2023: [
    { rawLabel:'Umsatzerlöse aus Spielbetrieb (incluye sponsoring, matchday y TV sin desglosar más, ver Anhang 4.1)', normalizedCategory:'lump_football_operations', amountNative:313.227, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Umsatzerlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:8.403, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse aus Sonstigem (incluye Transfer- u. Leihgeschäft, sin línea propia este ejercicio, ver comentario de cabecera)', normalizedCategory:'other_income', amountNative:54.861, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Erhöhung des Bestands an unfertigen Leistungen', normalizedCategory:'other_income', amountNative:0.304598, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:17.966216, disclosureLevel:'aggregated_residual' },
  ],
  // Ejercicio 2024 (01.07.2023-30.06.2024). Fuente: jahresabschluss-2024-25.md, columna comparativa
  // "1. Juli 2023 bis 30. Juni 2024" (pág. 5, GuV; pág. 8, Anhang 4.1 Umsatzerlöse — reconcilia exacto).
  2024: [
    { rawLabel:'Umsatzerlöse aus Spielbetrieb (incluye sponsoring, matchday y TV sin desglosar más, ver Anhang 4.1)', normalizedCategory:'lump_football_operations', amountNative:249.693, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Umsatzerlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:10.597, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse aus Transfer- u. Leihgeschäft', normalizedCategory:'player_sales', amountNative:193.146, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse aus Sonstigem', normalizedCategory:'other_income', amountNative:9.971, disclosureLevel:'detailed' },
    { rawLabel:'Erhöhung (+) oder Verminderung (-) des Bestands an unfertigen Leistungen', normalizedCategory:'other_income', amountNative:-0.106, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:3.367, disclosureLevel:'aggregated_residual' },
  ],
  // Ejercicio 2025 (01.07.2024-30.06.2025). Fuente: jahresabschluss-2024-25.md, pág. 5 (GuV) y pág. 8
  // (Anhang 4.1, con la corrección de "Sonstigem" documentada en el comentario de cabecera).
  2025: [
    { rawLabel:'Umsatzerlöse aus Spielbetrieb (incluye sponsoring, matchday y TV sin desglosar más, ver Anhang 4.1)', normalizedCategory:'lump_football_operations', amountNative:356.602, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Umsatzerlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:16.950, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse aus Transfer- u. Leihgeschäft', normalizedCategory:'player_sales', amountNative:74.108, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse aus Sonstigem', normalizedCategory:'other_income', amountNative:7.292, disclosureLevel:'detailed' },
    { rawLabel:'Erhöhung (+) oder Verminderung (-) des Bestands an unfertigen Leistungen', normalizedCategory:'other_income', amountNative:0.109520, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:5.643216, disclosureLevel:'aggregated_residual' },
  ],
};

const rbleipzigDeExpenseLinesByYear = {
  2022: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren)', normalizedCategory:'other_expenses', amountNative:-1.457145, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-163.933354, disclosureLevel:'aggregated_residual', items:[
      ['Löhne und Gehälter', -158.546117], ['Soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -5.387237],
    ]},
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-84.244145, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf sonstige immaterielle Vermögensgegenstände', normalizedCategory:'other_amortisation', amountNative:-0.893053, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-4.816530, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-82.922600, disclosureLevel:'aggregated_residual' },
  ],
  2023: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren)', normalizedCategory:'other_expenses', amountNative:-2.494307, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-190.816780, disclosureLevel:'aggregated_residual', items:[
      ['Löhne und Gehälter', -183.105578], ['Soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -7.711202],
    ]},
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-88.034010, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf sonstige immaterielle Vermögensgegenstände', normalizedCategory:'other_amortisation', amountNative:-1.151991, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-5.200372, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-97.669468, disclosureLevel:'aggregated_residual' },
  ],
  2024: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren)', normalizedCategory:'other_expenses', amountNative:-2.436, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-200.693, disclosureLevel:'aggregated_residual', items:[
      ['Löhne und Gehälter', -192.558], ['Soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -8.135],
    ]},
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-95.541, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf sonstige immaterielle Vermögensgegenstände', normalizedCategory:'other_amortisation', amountNative:-2.183, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-5.194, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-148.096, disclosureLevel:'aggregated_residual' },
  ],
  2025: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren)', normalizedCategory:'other_expenses', amountNative:-2.730835, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-207.141181, disclosureLevel:'aggregated_residual', items:[
      ['Löhne und Gehälter', -198.188897], ['Soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -8.952283],
    ]},
    { rawLabel:'Abschreibungen auf Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-112.873948, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf sonstige immaterielle Vermögensgegenstände', normalizedCategory:'other_amortisation', amountNative:-1.018344, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-4.914196, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-122.475276, disclosureLevel:'aggregated_residual' },
  ],
};

const rbleipzigDeFiscalYearMeta = {
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'rbleipzig-de-jahresabschluss-2022',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1.450822, tax:-2.021001, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:346.510706, officialTotalExpenses:338.266827, officialPAT:4.772057,
  },
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'rbleipzig-de-jahresabschluss-2023',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-3.031322, tax:-1.021199, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:394.761484, officialTotalExpenses:385.366929, officialPAT:5.342034,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'rbleipzig-de-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-4.109, tax:-3.726, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:466.668, officialTotalExpenses:454.143, officialPAT:4.690,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'rbleipzig-de-jahresabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-2.929727, tax:-5.019911, profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:460.704357, officialTotalExpenses:451.153780, officialPAT:1.600939,
  },
};

const rbleipzigDePresupuestoOverlayByYear = {};
const rbleipzigDePasesData = [];
const rbleipzigDeResultadosData = {};
const rbleipzigDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rbleipzig-de'] = {
  revenueLinesByYear: rbleipzigDeRevenueLinesByYear, expenseLinesByYear: rbleipzigDeExpenseLinesByYear,
  fiscalYearMeta: rbleipzigDeFiscalYearMeta, pasesData: rbleipzigDePasesData,
  resultadosData: rbleipzigDeResultadosData, titulosData: rbleipzigDeTitulosData,
  presupuestoOverlayByYear: rbleipzigDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rbleipzig-de-jahresabschluss-2022': {
    id:'rbleipzig-de-jahresabschluss-2022', clubId:'rbleipzig-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2021 bis zum 30.06.2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss (HGB) bajado de unternehmensregister.de (registro mercantil oficial alemán), auditado por EY GmbH & Co. KG. Jahresüberschuss de EUR 4.772.056,80 sobre Umsatzerlöse+Bestandsveränderungen+sonstige Erträge de EUR 346.510.706,15. El Anhang 4.1 (Umsatzerlöse) de este ejercicio SOLO desglosa 3 categorías (Spielbetrieb/Handel/Sonstigem), mismo caso que 2022/23 — sin línea propia de "Transfer- u. Leihgeschäft" (ver comentario de cabecera de rbleipzig-de-data.js). Título sportivo de la temporada: primer título en el DFB-Pokal 2022. Geschäftsführung completa este ejercicio: Oliver Mintzlaff (CEO), Florian Hopp (CFO), Johann Plenge (CSO). Transcripción completa en Clubes/Alemania/RB Leipzig/jahresabschluss-2021-22.md.',
  },
  'rbleipzig-de-jahresabschluss-2023': {
    id:'rbleipzig-de-jahresabschluss-2023', clubId:'rbleipzig-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2022 bis zum 30.06.2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss (HGB) bajado de unternehmensregister.de (registro mercantil oficial alemán), auditado por EY GmbH & Co. KG. Jahresüberschuss de EUR 5.342.033,84 sobre Umsatzerlöse+Bestandsveränderungen+sonstige Erträge de EUR 394.761.484,18. El Anhang 4.1 (Umsatzerlöse) de este ejercicio SOLO desglosa 3 categorías (Spielbetrieb/Handel/Sonstigem), a diferencia de 2023/24 y 2024/25 que agregan una 4ta ("Transfer- u. Leihgeschäft") — el propio Lagebericht dice que los ingresos por transferencias fueron menores que el año anterior, y quedaron sin línea propia dentro de "Sonstigem" (ver comentario de cabecera de rbleipzig-de-data.js). Ejercicio de transición en la Geschäftsführung: Oliver Mintzlaff (CEO) hasta el 14/11/2022, Max Eberl (Geschäftsführer Sport) desde el 1/12/2022; Florian Hopp (CFO) y Johann Plenge (CSO) constantes en los 4 ejercicios cargados de este club. Transcripción completa en Clubes/Alemania/RB Leipzig/jahresabschluss-2022-23.md.',
  },
  'rbleipzig-de-jahresabschluss-2024': {
    id:'rbleipzig-de-jahresabschluss-2024', clubId:'rbleipzig-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss (HGB) bajado de unternehmensregister.de (registro mercantil oficial alemán), auditado por EY GmbH & Co. KG. Cifras tomadas de la columna comparativa del Jahresabschluss 2024/2025 (mismo documento fuente, cuentas HGB nominales sin reexpresión). Transcripción completa en Clubes/Alemania/RB Leipzig/jahresabschluss-2024-25.md.',
  },
  'rbleipzig-de-jahresabschluss-2025': {
    id:'rbleipzig-de-jahresabschluss-2025', clubId:'rbleipzig-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss (HGB) bajado de unternehmensregister.de, auditado por EY GmbH & Co. KG. Transcripción completa en Clubes/Alemania/RB Leipzig/jahresabschluss-2024-25.md — la tabla del Anhang 4.1 (Umsatzerlöse por área de negocio) tenía un dígito de más en "Sonstigem" en una primera lectura (71.292 en vez de 7.292), corregido cruzando contra fuentes/Alemania/RB Leipzig.md; ver comentario de cabecera de rbleipzig-de-data.js.',
  },
});

gestionesByClub['rbleipzig-de'] = {
  actual: { nombre:'Gestión actual (Florian Hopp, CFO — Red Bull GmbH, accionista único)', firstYear:2022, lastYear:2025 },
};

memberCountByClub['rbleipzig-de'] = null;

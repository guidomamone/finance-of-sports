// ============================================================================
// data/rbleipzig-de-data.js — RasenBallsport Leipzig GmbH (Alemania, Bundesliga).
//
// 2 ejercicios REALES (2023/24, 2024/25), Jahresabschluss (HGB) bajado de unternehmensregister.de
// (registro mercantil oficial alemán), auditado por EY GmbH & Co. KG. Transcripciones completas en
// Clubes/Alemania/RB Leipzig/jahresabschluss-<ejercicio>.md. Hay una serie más larga 2014-2022/23
// también transcripta, sin cargar (prioridad de esta sesión: los 2 ejercicios más recientes) — y un
// jahresabschluss-2018-stub.md que es un stub incompleto, correctamente excluido, NO USAR.
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
// (data/currency-map.js): 'EUR@2024-06-30' y 'EUR@2025-06-30' YA EXISTEN.
//
// gestionId: 'actual' en los 2 ejercicios — Florian Hopp (CFO) y Johann Plenge (CSO) constantes;
// cambió el Geschäftsführer Sport (Max Eberl hasta 5/10/2023, vacante, Marcel Schäfer desde
// 1/8/2024), sin afectar la gestión financiera/societaria (Red Bull GmbH, accionista único).
// ============================================================================

const rbleipzigDeRevenueLinesByYear = {
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
  actual: { nombre:'Gestión actual (Florian Hopp, CFO — Red Bull GmbH, accionista único)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['rbleipzig-de'] = null;

// ============================================================================
// data/realoviedo-es-data.js — Real Oviedo, S.A.D. Ejercicio 2024/2025
// (1/7/2024 a 30/6/2025), único ejercicio cargado.
//
// Fuente: "Cuentas Anuales, Temporada 2024-25" (`Clubes/España/Real Oviedo/
// cuentas-anuales-2024-2025.pdf`, 65 págs.). Bajado de
// `realoviedo.es/ley-de-transparencia`, ver fuentes/España/Real Oviedo.md.
// Host statics-maker.llt-services.com/ovi/ (mismo CMS compartido que
// Mallorca/Girona/Getafe/etc.).
//
// TRANSCRIPCIÓN: a diferencia de Mallorca (mismo CMS, pero con las etiquetas
// separadas de sus números por el OCR), acá la Cuenta de Pérdidas y Ganancias
// vino con cada fila y su número en la MISMA línea — mucho menos ruido de
// OCR, reconcilió exacto (con centavos de redondeo, ≤2 EUR) en todos los
// niveles: rubro -> sub-total -> RESULTADO DE EXPLOTACIÓN -> RESULTADO ANTES
// DE IMPUESTOS -> "Resultado del ejercicio" (impreso 2 veces, en la Cuenta de
// P&G y en el Balance, ambos exactos -5.578.650). Ver VERIFICACIÓN abajo.
//
// UN AJUSTE DE ESTRUCTURA ENCONTRADO AL RECONCILIAR: "Pérdidas, deterioro y
// variación provisiones por operaciones comerciales" (-12.131) aparece listada
// visualmente bajo el mismo grupo "Otros Gastos de explotación" que Servicios
// exteriores/Tributos/Desplazamientos/etc., pero el subtotal impreso de ese
// grupo (-9.250.684) NO la incluye (los otros 5 sub-ítems solos ya suman
// exacto -9.250.684/685). Sí participa del RESULTADO DE EXPLOTACIÓN total
// (sin sumarla, el resultado da -5.264.306 contra el -5.276.439 impreso,
// diferencia de -12.133 ≈ el valor exacto de esta línea). Se cargó como línea
// de primer nivel propia (mismo criterio de "promover sub-ítems con categoría
// real distinta" de club-data-mapping sección 1), no anidada bajo el grupo.
//
// Cifras en EUR MILLONES nativos. Tipo de cambio: el documento NO declara uno
// propio (sin Anexo de moneda extranjera) -> `fxRef:'EUR@2025-06-30'` (cierre
// BCE, ya en data/currency-map.js), `fxSource:'market_close'`.
//
// CATEGORIZACIÓN (mismo formato INFUT que Mallorca/Getafe/Sevilla FC/Osasuna,
// mismo criterio ya establecido para esos clubes):
// - "Ingresos por competiciones" (Liga/Copa/amistosos/Otros) ->
//   competition_bonus, NO matchday_competition (sin línea de taquilla propia,
//   mismo criterio que el resto de clubes con este formato INFUT).
// - "Ingresos por abonados y socios" -> season_tickets.
// - "Ingresos por retransmisión" -> broadcasting (sin desglose por concepto
//   este documento, línea única).
// - "Ingresos por comercialización" + "Ingresos por publicidad" ->
//   sponsorship_commercial (2 líneas separadas).
// - "Otros ingresos" (Ingresos LFP + Subvenciones a la explotación y otros +
//   Cesiones + Otros) -> other_income, una sola línea con desglose en items.
// - "Imputación de subvenciones de inmovilizado no financiero y otras" ->
//   other_income.
// - "Otros Resultados" (positivo este ejercicio) -> other_income.
// - "Deterioro y resultado por enajenaciones" (Beneficios procedentes del
//   inmovilizado e ingresos excepcionales 2.800.000 menos Pérdidas
//   procedentes del inmovilizado y gastos excepcionales -28.971 = 2.771.029):
//   misma posición del P&L INFUT que "traspaso de jugadores" en Mallorca (el
//   inmovilizado intangible deportivo del club, es decir los derechos de
//   jugadores, es la partida que se da de baja acá) -> fiscalYearMeta.
//   profitOnPlayerSales, NUNCA revenueLine (club-data-mapping sección 2). El
//   documento no lo etiqueta explícitamente "traspaso de jugadores" como
//   Mallorca, así que queda una duda menor anotada en Admin/dudas-por-club.md
//   sobre si incluye algún activo no futbolístico.
// - "Aprovisionamientos y variación de existencias" -> other_expenses.
// - "Gastos de personal no deportivo" -> admin_general_expense. "Gastos
//   plantilla deportiva" (inscribible + no inscribible en la LFP) ->
//   wages_squad.
// - "Otros Gastos de explotación": sub-ítems promovidos a líneas de primer
//   nivel (ver nota de arriba) — "Servicios exteriores"/"Tributos"/"Otros
//   gastos de gestión corriente" -> admin_general_expense; "Desplazamientos"
//   -> match_organisation_expense; "Pérdidas, deterioro y variación de
//   provisiones por operaciones comerciales" -> other_expenses; "Gastos de
//   adquisición de jugadores inscribible en la LFP" -> other_expenses
//   (comisiones/intermediación, mismo criterio que Mallorca/Sevilla FC).
// - "Amortizaciones": "Amortizaciones del inmovilizado material" ->
//   depreciation; "Amortizaciones del inmovilizado inmaterial (excluido
//   jugadores)" -> other_amortisation; "Amortizaciones de los derechos de
//   adquisición de jugadores" -> player_amortisation.
//
// VERIFICACIÓN Ejercicio 2024/2025: Revenue (revenueLines) 25,162014 M -
// Expenses cash (Aprovisionamientos + Gastos personal + Otros Gastos
// explotación, incl. la línea de Pérdidas/deterioro) 31,190394 M - Non-cash
// (Amortizaciones) 2,019087 M = -8,047467 M; + profitOnPlayerSales 2,771029 M
// = -5,276438 M ≈ RESULTADO DE EXPLOTACIÓN impreso (-5.276.439) EXACTO
// (redondeo ≤1 EUR); + netInterest -0,077772 M = -5,354210 M ≈ RESULTADO
// ANTES DE IMPUESTOS impreso (-5.354.212) EXACTO; + tax -0,224438 M =
// -5,578648 M ≈ "Resultado del ejercicio" impreso (-5.578.650) EXACTO
// (redondeo ≤2 EUR), coincide con el Balance (pág. 5 del .md).
//
// grossDebt = "Deudas a largo plazo" (7,594336 M) + "Deudas a corto plazo"
// (0,530218 M) del Balance, EXCLUYENDO "Acreed. comerciales y otras ctas a
// pagar" (deuda comercial, no financiera) y Pasivos por impuesto diferido —
// mismo criterio angosto "Deudas" que Boca/Getafe/Mallorca. cash =
// "Tesorería" del Activo Corriente (Efectivo y otros activos líquidos
// equivalentes, "Otros activos líquidos" = 0 este ejercicio).
//
// brandColor: '#0033A0' (azul), Wikipedia en español declara los colores del
// club como "Azul y Blanco" con el azul en PANTONE 286C — hex convertido de
// ese Pantone (fuentes de conversión: crispedge.com, icolorpalette.com,
// coinciden en #0032A0/#0033A0). Azul domina sobre blanco en la identidad
// (nombre popular "los azules", equipación histórica). Ver
// fuentes/España/Real Oviedo.md.
//
// gestionesByClub: no se encontró un nombre de Presidente identificable en la
// transcripción (menciona el cargo "Presidente — Consejero Delegado" sin
// nombre propio legible) -> entrada genérica "Sin confirmar".
// ============================================================================

const realoviedoesRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones (Liga, Copa del Rey, otras competiciones y amistosos)', normalizedCategory:'competition_bonus', amountNative:1.972266, disclosureLevel:'detailed', items:[
      ['Liga', 1.919717], ['Otras competiciones y partidos amistosos', 0.020007], ['Otros', 0.032541],
    ]},
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:5.068747, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:7.238523, disclosureLevel:'summary' },
    { rawLabel:'Ingresos por comercialización', normalizedCategory:'sponsorship_commercial', amountNative:3.039208, disclosureLevel:'detailed', items:[
      ['Venta tiendas', 3.035735], ['Otros', 0.003474],
    ]},
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:5.780227, disclosureLevel:'detailed', items:[
      ['Publicidad estática', 3.787460], ['Publicidad dinámica', 1.992767],
    ]},
    { rawLabel:'Otros ingresos (LFP, subvenciones, cesiones y varios)', normalizedCategory:'other_income', amountNative:0.881363, disclosureLevel:'detailed', items:[
      ['Ingresos LFP', 0.080911], ['Subvenciones a la explotación y otros', 0.364786], ['Cesiones', 0.300455], ['Otros', 0.135212],
    ]},
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.752718, disclosureLevel:'detailed' },
    { rawLabel:'Otros Resultados', normalizedCategory:'other_income', amountNative:0.428962, disclosureLevel:'detailed' },
  ],
};

const realoviedoesExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aprovisionamientos y variación de existencias', normalizedCategory:'other_expenses', amountNative:-2.321316, disclosureLevel:'detailed', items:[
      ['Consumos de material deportivo', -1.087960], ['Variación de existencias', -1.233356],
    ]},
    { rawLabel:'Gastos de personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-3.006709, disclosureLevel:'detailed', items:[
      ['Sueldos y salarios del personal no deportivo', -2.394785], ['Indemnizaciones al personal no deportivo', -0.017648], ['Seguridad Social del personal no deportivo', -0.594276],
    ]},
    { rawLabel:'Gastos plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-16.599553, disclosureLevel:'detailed', items:[
      ['Gastos plantilla deportiva inscribible en la LFP', -15.076363, [
        ['Sueldos y salarios', -9.023668], ['Indemnizaciones', -0.996667], ['Seguridad Social', -0.554041], ['Primas colectivas', -4.500000], ['Otros', -0.001988],
      ]],
      ['Gastos plantilla deportiva no inscribible en la LFP', -1.523190, [
        ['Sueldos y salarios', -1.170861], ['Indemnizaciones', -0.000017], ['Seguridad Social', -0.352312],
      ]],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-6.979629, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.017966, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.012131, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-0.781633, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-0.860947, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores inscribible en la LFP', normalizedCategory:'other_expenses', amountNative:-0.610510, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones del inmovilizado material', normalizedCategory:'depreciation', amountNative:-0.600566, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones del inmovilizado inmaterial (excluido jugadores)', normalizedCategory:'other_amortisation', amountNative:-0.818956, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de los derechos de adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-0.599567, disclosureLevel:'detailed' },
  ],
};

const realoviedoesFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30', fxSource:'market_close',
    sourceId:'realoviedo-es-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'sin_confirmar',
    // netInterest = RESULTADO FINANCIERO impreso (Ingresos financieros 0,019923 M -
    // Gastos financieros -0,112247 M + Diferencias de cambio 0,014552 M).
    // profitOnPlayerSales = "Deterioro y resultado por enajenaciones" (Beneficios
    // procedentes del inmovilizado e ingresos excepcionales 2,800000 M menos
    // Pérdidas procedentes del inmovilizado y gastos excepcionales -0,028971 M).
    netInterest:-0.077772, tax:-0.224438, profitOnPlayerSales:2.771029, assetSales:0,
    // grossDebt = Deudas a largo plazo (7,594336 M) + Deudas a corto plazo
    // (0,530218 M), EXCLUYENDO Acreedores comerciales y Pasivos por impuesto
    // diferido. cash = Tesorería (Activo Corriente).
    grossDebt:8.124554, cash:1.433716,
    officialTotalRevenue:25.162014, officialTotalExpenses:33.209483, officialPAT:-5.578650,
  },
};

const realoviedoesPresupuestoOverlayByYear = {};

const realoviedoesPasesData = [];
const realoviedoesResultadosData = {};
const realoviedoesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['realoviedo-es'] = {
  revenueLinesByYear: realoviedoesRevenueLinesByYear, expenseLinesByYear: realoviedoesExpenseLinesByYear,
  fiscalYearMeta: realoviedoesFiscalYearMeta, pasesData: realoviedoesPasesData,
  resultadosData: realoviedoesResultadosData, titulosData: realoviedoesTitulosData,
  presupuestoOverlayByYear: realoviedoesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'realoviedo-es-cuentas-anuales-2024-25': {
    id:'realoviedo-es-cuentas-anuales-2024-25', clubId:'realoviedo-es',
    title:'Cuentas Anuales, Temporada 2024-25',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (65 págs.), texto con poco ruido de OCR (a diferencia de Mallorca, cada fila y su número quedaron en la misma línea en la transcripción). Un sub-ítem ("Pérdidas, deterioro y variación de provisiones por operaciones comerciales") aparece bajo el grupo visual "Otros Gastos de explotación" pero el subtotal impreso de ese grupo no lo incluye — se cargó como línea propia, ver comentario de cabecera de data/realoviedo-es-data.js. Bajado de realoviedo.es/ley-de-transparencia, host statics-maker.llt-services.com/ovi/. Transcripción completa en Clubes/España/Real Oviedo/cuentas-anuales-2024-2025.md.',
  },
});

gestionesByClub['realoviedo-es'] = {
  sin_confirmar: { nombre:'Sin confirmar', firstYear:2025, lastYear:2025 },
};

memberCountByClub['realoviedo-es'] = null; // no investigado en esta sesión (alcance: solo Finanzas)

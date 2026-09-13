// ============================================================================
// data/envigado-data.js — Envigado Fútbol Club S.A. (Envigado, Colombia).
// Segundo club colombiano cargado en finance-of-sports (junto con Once
// Caldas, misma sesión). Ejercicio 2025 = REAL, único ejercicio cargado a
// propósito: SIIS tiene 10 ejercicios consecutivos (2016-2025) disponibles
// para este club (ver fuentes/Colombia/Envigado.md), pero el pedido
// explícito de esta sesión fue "widen clubs, not deepen one club" — solo se
// bajó y cargó 2025, los otros 9 años quedan pendientes a propósito para una
// sesión futura.
//
// FUENTE: `Clubes/Colombia/Envigado/estados-financieros-2025.pdf` (44
// páginas, "Estados Financieros Individuales... Al 31 de diciembre de 2025",
// membrete Grant Thornton, NIT 900.470.848). Es un PDF ESCANEADO sin capa de
// texto (`pdftotext`/`pdffonts` no devuelven nada) — transcripto vía OCR
// (Tesseract, `pdftoppm -r 300` + `tesseract -l spa --psm 6`, página por
// página), transcripción completa en `estados-financieros-2025.md` en la
// misma carpeta. Bajado vía SIIS, ver `fuentes/Colombia/Envigado.md`.
//
// A DIFERENCIA de Once Caldas/Deportes Tolima, este PDF SÍ incluye el Estado
// de Resultado Integral PRIMARIO completo (págs. 9-10 del documento), no
// solo notas — esto permitió una reconciliación EXACTA sin ningún residuo/
// plug (ver verificación abajo), la carga de mayor confianza de las 2
// cargadas esta sesión.
//
// Cifras del documento "Expresado en pesos colombianos" (PESOS COMPLETOS,
// no miles) — confirmado por el propio encabezado de la tabla primaria.
// Acá se guardan divididas por 1.000.000, en MILLONES de pesos colombianos
// (COP), mismo criterio de unidad que usa el sitio para ARS.
//
// ESTADO DE RESULTADO INTEGRAL PRIMARIO (pág. 10 del PDF, en pesos
// colombianos completos, cifras 2025):
//   Ingresos de actividades ordinarias ........... 36.888.980.382
//   Costo de ventas ............................... (703.506.292)
//   Ganancia bruta ................................ 36.185.474.090
//   Otros ingresos ..................................  791.255.801
//   Gasto equipo de fútbol ...................... (19.371.584.981)
//   Gastos de administración ..................... (2.900.589.891)
//   Otros gastos ..................................  (229.130.853)
//   (Costos) Ingresos financieros neto ........... (2.317.382.801)
//   Ganancia antes de impuestos ................... 12.158.041.365
//   Gasto por impuestos a las ganancias ........... (4.404.913.000)
//   Gasto por impuesto diferido ..................... (117.904.729)
//   Ganancia neta del período ......................  7.635.223.636
// Cada línea de arriba reconcilia EXACTA con la anterior (verificado con
// node antes de cargar, ver el script de verificación de esta sesión) — a
// diferencia de Once Caldas, acá NO hizo falta ningún residuo/plug: todos
// los campos de fiscalYearMeta salen directo de líneas impresas.
//
// REVENUE: Nota 20 "Ingresos de actividades ordinarias" (17 líneas + 1
// deducción "Devoluciones, rebajas y descuentos", suma EXACTA a
// $36.888,980382 M, el total impreso) + Nota 22 "Otros ingresos" (7 líneas,
// $791,255801 M) — se suman ambas al campo `revenue` del sitio (ver mismo
// criterio en Once Caldas). officialTotalRevenue = 36.888,980382 +
// 791,255801 = 37.680,236183 M.
//
// EXPENSES: Nota 21 "Costo de ventas" ($703,506292 M), "Gasto equipo de
// fútbol" (14 sub-totales por rubro, $19.371,584981 M impreso — bolsón
// heterogéneo con sub-categoría real distinta entre sí, promovido a líneas
// de primer nivel, ver club-data-mapping SKILL.md sección 1), "Gastos de
// administración" (13 sub-totales, $2.900,589891 M impreso, mismo
// tratamiento), Nota 22 "Otros gastos" ($229,130853 M).
//
// netInterest = Nota 23: Ingresos financieros ($1.803,868791 M) - Costos
// financieros ($4.121,251592 M) = -2.317,382801 M, EXACTO igual al
// "(Costos) Ingresos financieros neto" impreso en el Estado de Resultado
// Integral primario.
//
// tax = Gasto por impuestos a las ganancias ($4.404,913 M, corriente) +
// Gasto por impuesto diferido ($117,904729 M) = -4.522,817729 M, EXACTO
// igual a los 2 renglones impresos en el Estado de Resultado Integral
// primario (a diferencia de Once Caldas, acá SÍ están las 2 líneas de
// impuesto impresas por separado, nada que despejar).
// ============================================================================

const envigadoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Matrículas', normalizedCategory:'youth_football', amountNative:110.993850, disclosureLevel:'detailed' },
    { rawLabel:'Mensualidades', normalizedCategory:'youth_football', amountNative:1182.347006, disclosureLevel:'detailed' },
    { rawLabel:'Participación y becas Escuela Iniciación', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla', normalizedCategory:'matchday_competition', amountNative:1745.300000, disclosureLevel:'detailed' },
    { rawLabel:'Abonados', normalizedCategory:'season_tickets', amountNative:101.990000, disclosureLevel:'detailed' },
    { rawLabel:'Venta de derechos deportivos', normalizedCategory:'player_sales', amountNative:23394.556566, disclosureLevel:'detailed' },
    { rawLabel:'Préstamo de derechos deportivos', normalizedCategory:'player_sales', amountNative:250.000000, disclosureLevel:'detailed' },
    { rawLabel:'Contribución de solidaridad', normalizedCategory:'player_sales', amountNative:3219.383811, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimiento deportivo', normalizedCategory:'other_income', amountNative:827.807696, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:22.841257, disclosureLevel:'detailed' },
    { rawLabel:'Dimayor', normalizedCategory:'broadcasting', amountNative:6396.711939, disclosureLevel:'detailed' },
    { rawLabel:'Federación colombiana de fútbol', normalizedCategory:'competition_bonus', amountNative:681.010000, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:2244.247305, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de sostenimiento', normalizedCategory:'member_dues', amountNative:1207.957773, disclosureLevel:'detailed' },
    { rawLabel:'Arrendamientos', normalizedCategory:'other_income', amountNative:225.000000, disclosureLevel:'detailed' },
    { rawLabel:'Venta de mercancías', normalizedCategory:'sponsorship_commercial', amountNative:1004.718947, disclosureLevel:'detailed' },
    { rawLabel:'Otras actividades de servicios', normalizedCategory:'other_income', amountNative:1230.473765, disclosureLevel:'detailed' },
    { rawLabel:'Devoluciones, rebajas y descuentos', normalizedCategory:'other_income', amountNative:-6956.359533, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (arrendamientos, comisiones, venta de PP&E, reintegro de provisiones, reintegro de costos, indemnizaciones, diversos)', normalizedCategory:'other_income', amountNative:791.255801, disclosureLevel:'detailed', items:[
      ['Arrendamientos', 31.542576], ['Comisiones', 6.127704], ['Venta de PP&E', 9.925000], ['Reintegro provisiones', 302.901047], ['Reintegro de otros costos y gastos', 310.842305], ['Indemnizaciones', 129.900554], ['Diversos', 0.016615],
    ]},
  ],
};

const envigadoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Costo de ventas', normalizedCategory:'other_expenses', amountNative:-703.506292, disclosureLevel:'detailed' },
    // "Gasto equipo de fútbol" ($19.371,584981 M impreso), promovida por sub-categoría real (ver
    // comentario de cabecera):
    { rawLabel:'Gasto equipo de fútbol: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-8559.779486, disclosureLevel:'detailed' },
    { rawLabel:'Gasto equipo de fútbol: Organización y logística (arrendamientos, servicios, mantenimiento, adecuación, viajes)', normalizedCategory:'match_organisation_expense', amountNative:-2717.328944, disclosureLevel:'detailed', items:[
      ['Arrendamientos', 1152.092303], ['Servicios', 279.037672], ['Mantenimiento y reparaciones', 268.368535], ['Adecuación e instalación', 8.602967], ['Gastos de viaje', 1009.227467],
    ]},
    { rawLabel:'Gasto equipo de fútbol: Administración del plantel (honorarios, impuestos, contribuciones, seguros, legales)', normalizedCategory:'admin_general_expense', amountNative:-700.696033, disclosureLevel:'detailed', items:[
      ['Honorarios', 394.120079], ['Impuestos', 146.435676], ['Contribuciones y afiliaciones', 153.439745], ['Seguros', 0], ['Gastos legales', 6.700533],
    ]},
    { rawLabel:'Gasto equipo de fútbol: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-428.902586, disclosureLevel:'detailed' },
    { rawLabel:'Gasto equipo de fútbol: Diversos y provisiones (comisiones de agentes, divisiones menores, derechos deportivos, solidaridad, formación)', normalizedCategory:'other_expenses', amountNative:-6964.877932, disclosureLevel:'detailed', items:[
      ['Diversos', 6936.836861], ['Provisión cartera', 28.041071],
    ]},
    // "Gastos de administración" ($2.900,589891 M impreso), mismo criterio:
    { rawLabel:'Gastos de administración (personal, honorarios, impuestos, arrendamientos, contribuciones, servicios, legales, mantenimiento, adecuación, viajes, diversos)', normalizedCategory:'admin_general_expense', amountNative:-2665.570925, disclosureLevel:'detailed', items:[
      ['Gastos de personal', 1369.897743], ['Honorarios', 421.177966], ['Impuestos', 577.954245], ['Arrendamientos', 66.866408], ['Contribuciones y afiliaciones', 1.423500], ['Servicios', 76.610129], ['Gastos legales', 11.601844], ['Mantenimiento y reparaciones', 52.950675], ['Adecuación e instalación', 0.130000], ['Gastos de viaje', 9.522383], ['Diversos', 77.436047],
    ]},
    { rawLabel:'Gastos de administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-167.807989, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-67.210962, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (pérdida en venta de bienes, impuestos asumidos, multas y sanciones, donaciones, gastos diversos)', normalizedCategory:'other_expenses', amountNative:-229.130853, disclosureLevel:'detailed', items:[
      ['Pérdida en venta y retiro de bienes', 6.850542], ['Impuestos asumidos', 55.706699], ['Multas, sanciones y litigios', 121.590625], ['Donaciones', 44.972031], ['Gastos diversos', 0.010956],
    ]},
  ],
};

const envigadoFiscalYearMeta = {
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio
    // (mismo caso que Once Caldas, ver ese archivo), así que se usa la TRM de cierre oficial.
    currency:'COP', fx:3757.08,
    sourceId:'envigado-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Nota 23: Ingresos financieros (1.803,868791) - Costos financieros (4.121,251592), EXACTO
    // igual al "(Costos) Ingresos financieros neto" impreso en el Estado de Resultado Integral.
    netInterest:-2317.382801,
    // Gasto por impuestos a las ganancias (-4.404,913, corriente) + Gasto por impuesto diferido
    // (-117,904729), EXACTO igual a los 2 renglones impresos por separado — sin ningún residuo,
    // a diferencia de Once Caldas.
    tax:-4522.817729,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Obligaciones financieras (Nota 12, todas corrientes según el Estado de Situación
    // Financiera, pág. 9 — no aparece una línea de obligaciones financieras no corrientes). cash =
    // Efectivo y equivalentes al efectivo (Nota 6, pág. 9).
    grossDebt:3236.656641, cash:9181.759716,
    officialTotalRevenue:37680.236183, officialTotalExpenses:23204.812017, officialPAT:7635.223636,
  },
};

const envigadoPresupuestoOverlayByYear = {};

const envigadoPasesData = [];
const envigadoResultadosData = {};
const envigadoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.envigado = {
  revenueLinesByYear: envigadoRevenueLinesByYear, expenseLinesByYear: envigadoExpenseLinesByYear,
  fiscalYearMeta: envigadoFiscalYearMeta, pasesData: envigadoPasesData,
  resultadosData: envigadoResultadosData, titulosData: envigadoTitulosData,
  presupuestoOverlayByYear: envigadoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'envigado-estados-financieros-2025': {
      id:'envigado-estados-financieros-2025', clubId:'envigado',
      title:'Estados Financieros Individuales (auditados, Grant Thornton), al 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900.470.848). PDF escaneado sin capa de texto, transcripto vía OCR (Tesseract). Incluye el Estado de Resultado Integral primario completo (no solo notas) — cada línea reconcilia exacta, sin ningún residuo. SIIS tiene 10 ejercicios consecutivos (2016-2025) disponibles para este club; a propósito solo se cargó 2025 esta sesión (pedido explícito: ampliar clubes, no profundizar uno). Transcripción completa en Clubes/Colombia/Envigado/estados-financieros-2025.md.',
    },
});

// gestionesByClub: mismo criterio que Once Caldas (ver comentario en data/oncecaldas-data.js) —
// entrada genérica "Gestión actual" para que el selector "Por gestión" tenga al menos 1 opción, sin
// atribuir un nombre propio que no se confirmó con confianza (la firma del Representante Legal en
// el PDF escaneado salió parcialmente ilegible en la transcripción OCR de esta sesión).
gestionesByClub.envigado = {
  actual: { nombre:'Gestión actual', firstYear:2025, lastYear:2025 },
};

memberCountByClub.envigado = null;

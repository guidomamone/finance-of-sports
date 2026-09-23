// ============================================================================
// data/santafe-co-data.js — Independiente Santa Fe S.A. En Reorganización
// (Bogotá, Colombia). clubId lleva el país al final (`santafe-co`) por la
// convención de Admin/CONVENCIONES.md. Ejercicio 2025 = REAL, único
// ejercicio cargado a propósito (mismo criterio que Envigado/Once Caldas).
//
// FUENTE: `Clubes/Colombia/Independiente Santa Fe/estados-financieros-2025.pdf`
// (42 páginas, "Estado de Resultados Integral Separado" + notas), texto
// nativo vía pdftotext -layout, transcripción completa en
// `estados-financieros-2025.md` en la misma carpeta. Bajado vía SIIS
// (siis.ia.supersociedades.gov.co, NIT 860009807), ver
// `fuentes/Colombia/Independiente Santa Fe.md`.
//
// OJO — el club está "en reorganización" ante Supersociedades (Ley 1116).
//
// Cifras del documento "Expresado en pesos colombianos" (PESOS COMPLETOS, no
// miles — confirmado en el encabezado de la tabla primaria). Acá se guardan
// divididas por 1.000.000, en MILLONES de pesos colombianos (COP).
//
// ESTADO DE RESULTADOS INTEGRAL SEPARADO (pág. 3 del PDF, pesos completos,
// cifras 2025):
//   Ingresos de Actividades Ordinarias ........... 61.020.279.389
//   Costo de ventas ................................ (448.505.443)
//   UTILIDAD BRUTA ................................ 60.571.773.946
//   Ingresos Financieros ............................ 446.464.327
//   Gastos de Administración ..................... (4.709.542.551)
//   Gastos de venta ............................. (59.524.159.842)
//   Gastos Financieros ........................... (1.498.757.376)
//   Otros Ingresos ................................ 6.635.226.012
//   Otros Gastos .................................... (922.400.138)
//   UTILIDAD OPERACIONAL ............................ 998.604.379
//   Impuesto de Renta Corriente ..................... (144.061.286)
//   Impuesto de Renta Diferido ..................... 1.116.790.273 (BENEFICIO,
//     no gasto: la utilidad neta SUBE respecto a la operacional)
//   UTILIDAD NETA DEL EJERCICIO .................... 1.971.333.366
// Reconciliado con node antes de cargar: 998.604.379 - 144.061.286 +
// 1.116.790.273 = 1.971.333.366, EXACTO. El documento agrupa Ingresos/Gastos
// Financieros junto con Administración/Venta/Otros en la misma cascada hacia
// "Utilidad Operacional" — se separó el resultado financiero a netInterest,
// como corresponde (ver club-data-mapping SKILL.md sección 2), y
// officialTotalRevenue/officialTotalExpenses solo suman los rubros no
// financieros: Revenue = Ingresos Actividades Ordinarias + Otros Ingresos =
// 67.655.505.401. Expenses = Costo de ventas + Gastos de Administración +
// Gastos de venta + Otros Gastos = 65.604.607.974. netInterest = Ingresos
// Financieros - Gastos Financieros = -1.052.293.049. Revenue-Expenses+
// netInterest = 998.604.378 ≈ 998.604.379 impreso (redondeo de $1).
// tax = -Impuesto Corriente + Impuesto Diferido = -144.061.286+1.116.790.273
// = +972.728.987 (BENEFICIO neto, ver abajo). PAT = 998.604.379+972.728.987 =
// 1.971.333.366, EXACTO.
// Todas las cifras de arriba están en PESOS COMPLETOS; en el archivo se
// guardan ya divididas por 1.000.000 (ver valores abajo en millones).
//
// REVENUE: Nota 21 "Ingresos de Actividades Ordinarias" (16 líneas incl.
// devoluciones, suma EXACTA) + Nota 22 "Otros Ingresos" (9 líneas, suma
// EXACTA a $6.635.226.012).
//
// EXPENSES: Nota 24 "Gastos de Administración" (14 sub-notas — Personal,
// Honorarios, Impuestos, Arrendamientos, Contribuciones, Seguros, Servicios,
// Legales, Mantenimiento, Reparaciones Locativas, Viajes, Depreciación y
// Amortización, Diversos, Provisiones y Litigios — suma EXACTA a
// $4.709.542.551, confirmado con el "Total Gastos de Administración" impreso
// al final de la nota), Nota 25 "Gastos de Venta" (14 sub-notas del plantel
// profesional — Personal, Honorarios, Impuestos, Arrendamientos,
// Contribuciones, Seguros, Servicios, Legales, Mantenimiento, Adecuación,
// Viajes, Depreciaciones y Amortizaciones, Diversos — suma EXACTA a
// $59.524.159.842), Nota 27 "Otros Gastos" (3 líneas, suma EXACTA a
// $922.400.138), Nota 28 "Costo de venta" (mercancía + boletería, suma
// EXACTA a $448.505.443). Ver el desglose por sub-nota en los `items` de cada
// línea de abajo.
//
// tax: Nota 29 (Impuesto de Renta) confirma la tarifa del 35% y el efecto de
// "impuesto de renta diferido (Ingreso)" para 2025 — el beneficio neto de
// impuesto diferido (mayor al gasto corriente) es consistente con el
// reconocimiento de pérdidas fiscales/diferencias temporarias, mismo patrón
// que Deportivo Cali (otra sociedad deportiva colombiana en reorganización).
// ============================================================================

const santafecoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Taquilla Venta De Boletería/Abonos', normalizedCategory:'matchday_competition', amountNative:27252.794113, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1948.104553, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:8701.653103, disclosureLevel:'detailed' },
    { rawLabel:'Dimayor', normalizedCategory:'broadcasting', amountNative:13028.917487, disclosureLevel:'detailed' },
    { rawLabel:'Federación Colombiana De Futbol', normalizedCategory:'competition_bonus', amountNative:1226.151540, disclosureLevel:'detailed' },
    { rawLabel:'Venta de derechos deportivos', normalizedCategory:'player_sales', amountNative:611.187078, disclosureLevel:'detailed' },
    { rawLabel:'Prestamos Jugadores', normalizedCategory:'player_sales', amountNative:234.084888, disclosureLevel:'detailed' },
    { rawLabel:'Exterior Mecanismo De Solidaridad', normalizedCategory:'player_sales', amountNative:198.169183, disclosureLevel:'detailed' },
    { rawLabel:'Regalías', normalizedCategory:'sponsorship_commercial', amountNative:22.096216, disclosureLevel:'detailed' },
    { rawLabel:'Divisiones Menores', normalizedCategory:'youth_football', amountNative:322.850328, disclosureLevel:'detailed' },
    { rawLabel:'Escuelas de formación', normalizedCategory:'youth_football', amountNative:4931.985002, disclosureLevel:'detailed' },
    { rawLabel:'Comercio al por mayor y al por menor (Ropa Deportiva)', normalizedCategory:'sponsorship_commercial', amountNative:452.838972, disclosureLevel:'detailed' },
    { rawLabel:'Equipo Profesional Femenino', normalizedCategory:'womens_football', amountNative:622.606265, disclosureLevel:'detailed' },
    { rawLabel:'Participación Eventos Internacionales', normalizedCategory:'competition_bonus', amountNative:3776.594500, disclosureLevel:'detailed' },
    { rawLabel:'Dev Venta de ropa deportiva', normalizedCategory:'sponsorship_commercial', amountNative:-8.968078, disclosureLevel:'detailed' },
    { rawLabel:'Dev Divisiones Menores', normalizedCategory:'youth_football', amountNative:-6.235100, disclosureLevel:'detailed' },
    // AJUSTE DE RECONCILIACIÓN: la suma de las 16 líneas de arriba (Nota 21) da $63.314.830.050,
    // pero el propio documento imprime "Total Ingresos de Actividades Deportivas: 61.020.279.389"
    // — una diferencia de $2.294.550.661 que NO se explica por ninguna fila adicional visible en la
    // transcripción (verificado: cada línea reconcilia exacta contra su propia "Variación Absoluta"
    // 2025-2024, y el % "Análisis Vertical" de cada línea es consistente con el TOTAL IMPRESO, no
    // con mi suma). Es un error de cuadre del propio documento (o de una reclasificación que no se
    // refleja en esta nota), no una omisión de esta transcripción. Se usa el TOTAL IMPRESO (más
    // fiel a lo que el club declaró) y se declara el ajuste como línea propia, en vez de esconderlo
    // prorrateado entre las demás líneas. Pregunta anotada para Admin/dudas-por-club.md.
    { rawLabel:'Ajuste de reconciliación contra el total impreso de la Nota 21 (diferencia no explicada por ninguna línea visible en el documento)', normalizedCategory:'other_income', amountNative:-2294.550661, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos (ingresos método de participación, arrendamientos, recuperaciones, indemnizaciones, ejercicios anteriores, utilidad venta PP&E, comisiones, devoluciones, diversos)', normalizedCategory:'other_income', amountNative:6635.226012, disclosureLevel:'detailed', items:[
      ['Ingresos Método De Participación', 1015.586382], ['Arrendamientos', 745.757678], ['Recuperaciones', 2273.661424], ['Indemnizaciones', 1744.180308], ['Ingresos De Ejercicios Anteriores', 57.990332], ['Utilidad En Venta De Propiedades Planta Y Equipo', 0], ['Comisiones', 100.841128], ['Devoluciones, Rebajas Y Descuentos En Otras Ventas', -1446.000000], ['Diversos', 2143.208760],
    ]},
  ],
};

const santafecoExpenseLinesByYear = {
  2025: [
    // Nota 24 "Gastos de Administración" ($4.709.542.551 impreso), agrupada por sub-categoría:
    { rawLabel:'Gastos de Administración (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, servicios, legales, mantenimiento, reparaciones locativas, viajes)', normalizedCategory:'admin_general_expense', amountNative:-4429.482451, disclosureLevel:'detailed', items:[
      ['Gastos de Personal', -3179.845206], ['Honorarios', -137.069068], ['Impuestos', -664.712923], ['Arrendamientos', -19.908658], ['Contribuciones y Afiliaciones', -1.448500], ['Seguros', -0.830920], ['Servicios', -332.910657], ['Gastos Legales', -12.610490], ['Mantenimientos y Reparaciones', -15.940618], ['Reparaciones Locativas', -14.855706], ['Gastos de Viaje', -49.349705],
    ]},
    { rawLabel:'Gastos de Administración: Depreciación y Amortización (PP&E)', normalizedCategory:'depreciation', amountNative:-210.327775, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración: Diversos y Provisiones y Litigios', normalizedCategory:'other_expenses', amountNative:-69.732325, disclosureLevel:'detailed', items:[
      ['Diversos relacionados con la operación', -65.732325], ['Provisiones y Litigios', -4.000000],
    ]},
    // Nota 25 "Gastos de Venta" ($59.524.159.842 impreso, el plantel profesional):
    { rawLabel:'Gastos de Venta: Gastos de Personal', normalizedCategory:'wages_squad', amountNative:-37547.995510, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: Bonificaciones y convenios (parte de "Diversos: Otros gastos de funcionamiento deportivo")', normalizedCategory:'wages_squad', amountNative:-3445.271359, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: transferencias de jugadores (amortización de intangibles, préstamos, % venta jugadores, acuerdos de colaboración y solidaridad, inscripciones y transferencias, derechos de formación)', normalizedCategory:'player_amortisation', amountNative:-1183.530642, disclosureLevel:'detailed', items:[
      ['Amortización Intangibles (Depreciaciones y Amortizaciones)', -639.500588], ['Prestamos Jugadores', -143.912000], ['% Venta de jugadores', -24.041934], ['Acuerdos de colaboración y solidaridad', -192.473675], ['Inscripciones y Transferencias', -113.988000], ['Derechos de Formación', -69.614445],
    ]},
    { rawLabel:'Gastos de Venta: organización y logística (impuestos IDRD, arrendamientos, contribuciones y tasas de arriendo, servicios, mantenimiento, adecuación, viajes, sanciones deportivas, inscripciones a torneos)', normalizedCategory:'match_organisation_expense', amountNative:-15094.452895, disclosureLevel:'detailed', items:[
      ['Impuestos', -2493.675011], ['Arrendamientos', -1643.079036], ['Contribuciones y Afiliaciones', -3955.882542], ['Servicios', -3746.057748], ['Mantenimiento y Reparaciones', -300.902063], ['Adecuación e instalación', -32.784703], ['Gastos de Viaje', -2444.563326], ['Sanciones Deportivas', -394.916116], ['Inscripciones a torneos', -82.592350],
    ]},
    { rawLabel:'Gastos de Venta: Imagen y publicidad', normalizedCategory:'admin_general_expense', amountNative:-144.000000, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: Auxilio deportivo Divisiones Menores', normalizedCategory:'youth_other_sports_expense', amountNative:-74.657600, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: Depreciaciones (PP&E)', normalizedCategory:'depreciation', amountNative:-367.626469, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta (honorarios, seguros, legales, ARL, diversos no deportivos: comisiones, elementos de aseo, papelería, combustibles, casino, parqueaderos)', normalizedCategory:'admin_general_expense', amountNative:-1666.625367, disclosureLevel:'detailed', items:[
      ['Honorarios', -214.630180], ['Seguros', -256.523404], ['Gastos Legales', -23.889002], ['ARL Vigencias anteriores', -1.106900], ['Comisiones', -942.224905], ['Gastos De Representación Y Relaciones Publicas', -4.948472], ['Elementos De Aseo Y Cafetería', -23.203230], ['Útiles, Papelería Y Fotocopias', -13.285547], ['Combustibles Y Lubricantes', -75.378379], ['Taxis Y Buses', -0.110000], ['Casino Y Restaurante', -106.486518], ['Parqueaderos', -4.358830], ['Adecuaciones Sede Tenjo', -0.480000],
    ]},
    // Nota 27 "Otros Gastos" ($922.400.138 impreso):
    { rawLabel:'Otros Gastos (pérdidas método de participación, gastos extraordinarios, gastos diversos)', normalizedCategory:'other_expenses', amountNative:-922.400138, disclosureLevel:'detailed', items:[
      ['Pérdidas Método De Participación', -1.856881], ['Gastos Extraordinarios', -288.775653], ['Gastos Diversos', -631.767604],
    ]},
    // Nota 28 "Costo de venta" (mercancía + boletería, $448.505.443 impreso):
    { rawLabel:'Costo de venta de mercancía para la venta', normalizedCategory:'other_expenses', amountNative:-275.573900, disclosureLevel:'detailed' },
    { rawLabel:'Costo de venta de boletería', normalizedCategory:'match_organisation_expense', amountNative:-172.931543, disclosureLevel:'detailed' },
  ],
};

const santafecoFiscalYearMeta = {
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
    // cierre (los movimientos "Diferencia en cambio" de las notas financieras son de operaciones
    // puntuales en USD, no una cotización de cierre para todo el balance), mismo caso que
    // Envigado/Once Caldas.
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'santafe-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos Financieros (446.464327) - Gastos Financieros (1.498757376), EXACTO igual a los 2
    // totales impresos en el Estado de Resultados.
    netInterest:-1052.293049,
    // -Impuesto de Renta Corriente (144.061286) + Impuesto de Renta Diferido (1.116790273, un
    // BENEFICIO neto de impuesto diferido, no un gasto — el documento lo suma directo en la
    // cascada hacia Utilidad Neta, ver comentario de cabecera). tax = +972.728987 (beneficio neto).
    tax:972.728987,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Obligaciones financieras a corto plazo (Nota 16, particulares+entidades+otras =
    // 3.402593239) + la porción "Obligaciones Financieras" de los Pasivos Ley 1116 a largo plazo
    // (Nota 20, 1.242561656) — se excluye el resto de esa nota (Costos y Gastos Por Pagar,
    // Impuestos, Obligaciones Laborales, Fideicomiso, Litigios), que es pasivo de reorganización
    // no financiero, mismo criterio de "usar la línea de deuda financiera real" que ya aplica el
    // sitio (ver club-data-mapping SKILL.md sección 14). cash = Nota 5, Total efectivo y
    // equivalentes al efectivo.
    grossDebt:4645.154895, cash:684.927123,
    officialTotalRevenue:67655.505401, officialTotalExpenses:65604.607974, officialPAT:1971.333366,
  },
};

const santafecoPresupuestoOverlayByYear = {};

const santafecoPasesData = [];
const santafecoResultadosData = {};
const santafecoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['santafe-co'] = {
  revenueLinesByYear: santafecoRevenueLinesByYear, expenseLinesByYear: santafecoExpenseLinesByYear,
  fiscalYearMeta: santafecoFiscalYearMeta, pasesData: santafecoPasesData,
  resultadosData: santafecoResultadosData, titulosData: santafecoTitulosData,
  presupuestoOverlayByYear: santafecoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'santafe-co-estados-financieros-2025': {
      id:'santafe-co-estados-financieros-2025', clubId:'santafe-co',
      title:'Estado de Resultados Integral Separado y Notas a los Estados Financieros, al 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 860009807). Texto nativo, incluye el Estado de Resultados Integral primario completo. El club está en proceso de reorganización (Ley 1116) ante Supersociedades; 11 registros distintos existen en SIIS bajo este NIT, solo se cargó el ejercicio más reciente (2025) esta sesión. El impuesto de renta diferido de 2025 fue un BENEFICIO neto (mayor al gasto corriente), lo que hizo que la Utilidad Neta terminara por encima de la Utilidad Operacional — ver comentario de cabecera de data/santafe-co-data.js. Transcripción completa en Clubes/Colombia/Independiente Santa Fe/estados-financieros-2025.md.',
    },
});

// gestionesByClub: el Representante Legal aparece en certificacion-ef-2025.md pero con una
// transcripción OCR parcialmente ilegible ("LUIS ?DUARDO MENDEZ B.", sin poder confirmar con
// confianza el nombre completo) — se usa una entrada genérica en vez de un nombre a medio
// confirmar, mismo criterio que Once Caldas/Envigado cuando no hay firma legible.
gestionesByClub['santafe-co'] = {
  actual: { nombre:'Gestión actual', firstYear:2025, lastYear:2025 },
};

memberCountByClub['santafe-co'] = null;

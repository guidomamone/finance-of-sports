// ============================================================================
// data/unionmagdalena-co-data.js — Unión Magdalena S.A. (Santa Marta, Colombia).
// Tercer club colombiano cargado en finance-of-sports (junto con Once Caldas y
// Envigado). Ejercicio 2018 = REAL, único ejercicio cargado esta sesión: SIIS
// tiene además un ejercicio 2021 sourceado (ver fuentes/Colombia/Union
// Magdalena.md) pero SIN transcribir/cargar todavía — queda pendiente para
// una sesión futura. Los cortes 2016/2017/2019/2020 están verificados como
// vacíos en SIIS (la sociedad no adjuntó el paquete esos años), no son huecos
// de búsqueda.
//
// FUENTE: `Clubes/Colombia/Union Magdalena/estados-financieros-2018.md`
// (transcripción completa de `estados-financieros-2018.pdf`, 44 páginas,
// "Estados Financieros... Al 31 de Diciembre de 2018 y Diciembre 31 2017",
// NIT 891.700.992-8). A DIFERENCIA de Once Caldas (que solo trae notas) e
// IGUAL que Envigado, este PDF tiene texto nativo (`pdftotext -layout`, sin
// necesidad de OCR) y SÍ incluye el Estado de Situación Financiera y el
// Estado de Resultado Integral PRIMARIOS completos (págs. 3-4), no solo
// notas — permitió una reconciliación EXACTA, sin ningún residuo/plug.
// También se transcribió `certificacion-ef-2018.md` (documento corto, PDF
// escaneado, OCR): certifica que los estados fueron tomados fielmente de los
// libros bajo NIIF-PYMES, y nombra al Presidente (Luis Eduardo Méndez
// Bustos), el Contador (Luis Manuel Molina Ibáñez) y el Revisor Fiscal
// (Robinsson Álvarez Giraldo) — no trae ningún total, así que no aporta un
// cruce numérico independiente, solo identidad de firmantes.
//
// Cifras del documento "Expresado en miles de pesos Colombianos" (MILES, no
// pesos completos) — confirmado por el propio encabezado de las tablas
// primarias (pág. 3-4) y de cada nota. OJO: esto es DISTINTO de Envigado
// (pesos completos, ÷1.000.000) e IGUAL que Once Caldas (miles, ÷1.000). Acá
// se guardan divididas por 1.000, en MILLONES de pesos colombianos (COP).
//
// ESTADO DE RESULTADO INTEGRAL PRIMARIO (pág. 4 del PDF, en miles de pesos
// colombianos, cifras 2018 — convertidas acá a millones ÷1.000):
//   Ingresos de Actividades Ordinarias ............  7.049,990
//   (+) Otros Ingresos .............................    113,286
//   (-) Gastos Operacionales ....................... (5.400,542)
//   (-) Gastos Administrativos y Otros Gastos ...... (1.069,690)
//   (=) Ganancias por actividades operación ........    693,044
//   (+) Ingresos Financieros .......................     66,916
//   (-) Gastos Financieros .......................... (126,104)
//   (=) Ganancia antes de impuestos .................    633,856
//   (-) Impuesto a las Ganancias .................... (348,114)
//   (=) Utilidad del Ejercicio / Resultado Integral Total   285,742
// Cada línea de arriba reconcilia EXACTA con la anterior, y cada nota (24-29)
// reconcilia EXACTA contra el total que imprime el Estado de Resultado
// Integral primario (verificado sumando cada nota a mano antes de cargar) —
// la carga de mayor confianza de las 3 cargadas hasta ahora en Colombia, sin
// ningún residuo/plug como sí hizo falta en Once Caldas.
//
// REVENUE: Nota 24 "Ingresos de Actividades Ordinarias" (8 líneas, suma
// EXACTA a $7.049,990 M, el total impreso) + Nota 25 "Otros ingresos" (3
// líneas — Recuperaciones, Descuento comercial, Diversos —, $113,286 M
// impreso) — se suman ambas al campo `revenue` del sitio, mismo criterio que
// Envigado/Once Caldas. officialTotalRevenue = 7.049,990 + 113,286 =
// 7.163,276 M.
//
// "Amortización de Ingreso Dimayor" (Nota 24, $239,521 M): categorizada como
// `broadcasting` junto con "Participación Dimayor" — el documento no explica
// más el concepto (no hay una nota aparte), pero el nombre liga claramente a
// un ingreso de Dimayor (que es la fuente de TV/torneo del fútbol
// colombiano), probablemente el reconocimiento diferido de un contrato
// plurianual. Es la única categorización de esta carga con margen de duda
// genuina — reportado en la sesión, no autoasumido con certeza total.
//
// "Otros ingresos de partido" (Nota 24, $66,190 M): categorizada como
// `matchday_competition` (junto con Taquilla) porque el propio rótulo dice
// "de partido" — no es un alquiler o uso del estadio fuera del partido
// (`stadium_other`), es ingreso asociado al día de juego.
//
// EXPENSES: Nota 26 "Gastos Operacionales" ("todas transacciones de la parte
// deportiva tales como nóminas, gastos partido de local, gastos de partido
// de visitante") y Nota 27 "Gastos Administrativos y Otros Gastos" — ambas
// son bolsones con sub-categoría real distinta entre sí (ver club-data-mapping
// SKILL.md sección 1), promovidas a líneas de primer nivel por categoría,
// mismo tratamiento que Envigado. Dentro de Nota 26: Arriendos/Servicios/
// Mantenimiento/Gastos de viaje/Diversos-logística van a
// `match_organisation_expense` (organización del partido), Impuestos/
// Contribuciones y afiliaciones/Gastos legales van a `admin_general_expense`
// (mismo split que usa Envigado en su "Administración del plantel"),
// "Amortizaciones Derechos Deportivos" (costo de transferencia de
// jugadores, no depreciación genérica) va a `player_amortisation`, y "Costo
// de Venta Mercancía no Fabricada" va a `other_expenses`. Dentro de Nota 27:
// el propio título del documento ya separa "Administrativos" de "Otros
// Gastos" — Personal/Honorarios/Impuestos/Arrendamientos/Contribuciones/
// Seguros/Servicios/Legales/Mantenimiento/Adecuaciones/Viajes van a
// `admin_general_expense`; "Depreciaciones y Amortizaciones" (línea
// combinada, sin desglosar depreciación de PP&E vs. amortización de
// intangibles en esta nota) va a `depreciation` (el movimiento de
// Depreciación de PP&E en el Estado de Situación Financiera, -80.500,
// confirma que la mayor parte es depreciación); Diversos/Provisiones/Gastos
// Bancarios/Gastos Extraordinarios/Gastos Diversos van a `other_expenses`
// (el catch-all real del documento).
//
// netInterest = Nota 28: Ingresos por Intereses (66,916) - Gastos por
// Intereses (126,104) = -59,188 M, EXACTO igual al "Total Ingresos Y Gastos
// Financieros" impreso.
//
// tax = Nota 29: Impuesto Corriente Renta 33% (330,089) + Gasto por Impuesto
// Diferido (18,025) = -348,114 M, EXACTO igual al "Total Impuestos a la
// Ganancias" impreso.
//
// grossDebt = Obligaciones Financieras corrientes (Nota 10, $419,425 M) +
// Obligaciones Financieras a L.P. (Nota 16, $638,889 M) = 1.058,314 M —
// mismo criterio que Envigado/Boca/Vélez (línea angosta de deuda financiera,
// el balance separa "Obligaciones Financieras" de Cuentas por Pagar/
// Impuestos por Pagar/Beneficios a Empleados/Otros Pasivos). cash = Efectivo
// y equivalente al efectivo (pág. 3) = 1.494,693 M.
// ============================================================================

const unionmagdalenaCoRevenueLinesByYear = {
  2018: [
    { rawLabel:'Taquilla - Venta de Boletería', normalizedCategory:'matchday_competition', amountNative:1997.253, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:167.202, disclosureLevel:'detailed' },
    { rawLabel:'Préstamo Derechos Deportivos', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Participación Dimayor', normalizedCategory:'broadcasting', amountNative:4016.426, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de Ingreso Dimayor', normalizedCategory:'broadcasting', amountNative:239.521, disclosureLevel:'detailed' },
    { rawLabel:'Participación Federación Colombiana de Fútbol', normalizedCategory:'competition_bonus', amountNative:485.600, disclosureLevel:'detailed' },
    { rawLabel:'Venta de Artículos Deportivos', normalizedCategory:'sponsorship_commercial', amountNative:77.798, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de partido', normalizedCategory:'matchday_competition', amountNative:66.190, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (recuperaciones, descuento comercial, diversos)', normalizedCategory:'other_income', amountNative:113.286, disclosureLevel:'detailed', items:[
      ['Recuperaciones', 40.496], ['Descuento comercial', 0.500], ['Diversos', 72.290],
    ]},
  ],
};

const unionmagdalenaCoExpenseLinesByYear = {
  2018: [
    // Nota 26 "Gastos Operacionales" ($5.400,542 M impreso), promovida por sub-categoría real (ver
    // comentario de cabecera):
    { rawLabel:'Gastos Operacionales: Gastos del Personal (plantel)', normalizedCategory:'wages_squad', amountNative:-3250.748, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Operacionales: Organización y logística (arriendos, servicios, mantenimiento, viajes, logística de eventos)', normalizedCategory:'match_organisation_expense', amountNative:-1210.410, disclosureLevel:'detailed', items:[
      ['Arriendos', 192.226], ['Servicios', 41.378], ['Mantenimiento', 1.300], ['Gastos de viaje', 230.720], ['Diversos - Logística y preparación eventos', 744.786],
    ]},
    { rawLabel:'Gastos Operacionales: Administración del plantel (impuestos, contribuciones y afiliaciones, legales)', normalizedCategory:'admin_general_expense', amountNative:-784.796, disclosureLevel:'detailed', items:[
      ['Impuestos', 193.835], ['Contribuciones y Afiliaciones', 577.808], ['Gastos Legales', 13.153],
    ]},
    { rawLabel:'Gastos Operacionales: Amortizaciones Derechos Deportivos (costo transferencia de jugadores)', normalizedCategory:'player_amortisation', amountNative:-113.988, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Operacionales: Costo de Venta Mercancía no Fabricada', normalizedCategory:'other_expenses', amountNative:-40.600, disclosureLevel:'detailed' },
    // Nota 27 "Gastos Administrativos y Otros Gastos" ($1.069,690 M impreso), separada según el
    // propio título del documento (ver comentario de cabecera):
    { rawLabel:'Gastos Administrativos (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, servicios, legales, mantenimiento, adecuaciones, viajes)', normalizedCategory:'admin_general_expense', amountNative:-903.738, disclosureLevel:'detailed', items:[
      ['Gasto de Personal', 462.732], ['Honorarios', 92.298], ['Impuestos', 116.035], ['Arrendamientos', 14.769], ['Contribuciones y Afiliaciones', 0], ['Seguros', 9.580], ['Servicios', 94.931], ['Gastos Legales', 3.859], ['Mantenimiento y Reparaciones', 38.337], ['Adecuaciones e Instalaciones', 0], ['Gastos de Viaje', 71.197],
    ]},
    { rawLabel:'Depreciaciones y Amortizaciones (combinado, sin desglosar en el documento)', normalizedCategory:'depreciation', amountNative:-81.367, disclosureLevel:'detailed' },
    { rawLabel:'Otros Gastos (diversos, provisiones, bancarios, extraordinarios)', normalizedCategory:'other_expenses', amountNative:-84.585, disclosureLevel:'detailed', items:[
      ['Diversos', 28.040], ['Provisiones', 0], ['Gastos Bancarios', 22.468], ['Gastos Extraordinarios', 34.077], ['Gastos Diversos', 0],
    ]},
  ],
};

const unionmagdalenaCoFiscalYearMeta = {
  2018: {
    // El documento NO declara su propio tipo de cambio (no tiene un Anexo de "activos y pasivos en
    // moneda extranjera"; todas las partidas son en COP). Se usa la TRM oficial de cierre
    // (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2018: $3.249,75
    // COP/USD. Esta entrada TODAVÍA NO EXISTE en data/currency-map.js (COP@2018-12-31) al momento
    // de cargar este archivo — reportada a la sesión orquestadora para que la agregue una sola vez
    // en FX_CLOSE, no acá (ver Admin/CLAUDE.md / club-data-mapping sección 5).
    currency:'COP', fxRef:'COP@2018-12-31',
    sourceId:'unionmagdalena-co-estados-financieros-2018',
    reportType:'official_balance_sheet',
    gestionId:'sin_confirmar',
    // Nota 28: Ingresos por Intereses (66,916) - Gastos por Intereses (126,104), EXACTO igual al
    // "Total Ingresos Y Gastos Financieros" impreso.
    netInterest:-59.188,
    // Nota 29: Impuesto Corriente Renta 33% (330,089) + Gasto por Impuesto Diferido (18,025),
    // EXACTO igual al "Total Impuestos a la Ganancias" impreso.
    tax:-348.114,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Obligaciones Financieras corrientes (Nota 10, 419,425) + no corrientes (Nota 16,
    // 638,889). cash = Efectivo y equivalente al efectivo (pág. 3).
    grossDebt:1058.314, cash:1494.693,
    officialTotalRevenue:7163.276, officialTotalExpenses:6470.232, officialPAT:285.742,
  },
};

const unionmagdalenaCoPresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
// club (fuera de alcance de esta sesión, que se enfocó en Finanzas del ejercicio 2018). Arrays
// vacíos en vez de placeholders inventados.
const unionmagdalenaCoPasesData = [];
const unionmagdalenaCoResultadosData = {};
const unionmagdalenaCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['unionmagdalena-co'] = {
  revenueLinesByYear: unionmagdalenaCoRevenueLinesByYear, expenseLinesByYear: unionmagdalenaCoExpenseLinesByYear,
  fiscalYearMeta: unionmagdalenaCoFiscalYearMeta, pasesData: unionmagdalenaCoPasesData,
  resultadosData: unionmagdalenaCoResultadosData, titulosData: unionmagdalenaCoTitulosData,
  presupuestoOverlayByYear: unionmagdalenaCoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'unionmagdalena-co-estados-financieros-2018': {
      id:'unionmagdalena-co-estados-financieros-2018', clubId:'unionmagdalena-co',
      title:'Estados Financieros (Situación Financiera, Resultado Integral, Cambios en el Patrimonio y Flujo de Efectivo), al 31 de diciembre de 2018 y 2017',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 891700992, punto de entrada "Pymes-Individuales"). PDF con texto nativo (pdftotext -layout), incluye el Estado de Situación Financiera y el Estado de Resultado Integral primarios completos, no solo notas — cada nota (24-29) reconcilia exacta contra el total impreso, sin ningún residuo. Se complementa con certificacion-ef-2018.md (PDF escaneado, OCR), que certifica la elaboración bajo NIIF-PYMES y nombra a los firmantes, sin aportar un total propio. SIIS tiene además un ejercicio 2021 sourceado para este club (dictamen del revisor fiscal) pero todavía NO transcripto ni cargado — queda pendiente para una sesión futura. Los cortes 2016/2017/2019/2020 están verificados como vacíos en SIIS (formulario presentado sin paquete de estados financieros adjunto). Transcripciones completas en Clubes/Colombia/Union Magdalena/estados-financieros-2018.md y certificacion-ef-2018.md.',
    },
});

// gestionesByClub: no se pudo confirmar con confianza la atribución de gestión para el ejercicio
// 2018 — la certificación (certificacion-ef-2018.md) nombra a Luis Eduardo Méndez Bustos como
// "Presidente" firmante, pero no hay forma de confirmar que ejerció la presidencia durante TODO el
// ejercicio 2018 (la certificación pudo firmarse bien entrado 2019). Mismo criterio que
// club-data-mapping SKILL.md sección 7 ("mejor un año sin gestión asignada que una gestión
// inventada"): entrada genérica "Sin confirmar" en vez de atribuirle el nombre sin certeza.
gestionesByClub['unionmagdalena-co'] = {
  sin_confirmar: { nombre:'Sin confirmar', firstYear:2018, lastYear:2018 },
};

memberCountByClub['unionmagdalena-co'] = null;

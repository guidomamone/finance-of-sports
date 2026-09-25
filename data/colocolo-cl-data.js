// ============================================================================
// data/colocolo-cl-data.js — Colo-Colo (Blanco y Negro S.A. y Filiales), Chile. clubId:'colocolo-cl'
// (convención desde la Versión 129, CONVENCIONES.md: todo club nuevo lleva el país al final del id).
// Primer club chileno cargado en finance-of-sports (junto con Universidad de
// Chile y Universidad Católica, misma sesión, 2026-09-25).
//
// FUENTE: Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales
// (IFRS, auditados), transcriptos completos en:
//   Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2024.md
//   Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2023.md
//   Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2022.md
// Ejercicio 2024 y 2023 extraídos del documento de 2024 (que trae ambos años
// como columnas "Acumulado" 01.01-31.12, formato estándar de EEFF chilenos, sin
// reexpresión por inflación entre ejercicios) — se verificó cruzando contra el
// "año corriente" del documento propio de 2023 (mismo pretax $852.053 M$ y mismo
// tax -$34.283 M$ en ambos documentos), así que usar el comparativo del reporte
// 2024 para el ejercicio 2023 es equivalente a usar el reporte de 2023 directo.
// Ejercicio 2022 extraído de su propio documento (estados-financieros-2022.md).
//
// CIFRAS: el documento reporta en MILES de pesos chilenos (M$). Acá se guardan
// ya divididas por 1.000, en MILLONES de pesos (CLP), mismo criterio de unidad
// que usa el sitio para ARS/COP (amountNative en millones nativos).
//
// REVENUE = Nota 22 "Ingresos de actividades ordinarias y otros ingresos por
// función" (6 líneas de ingresos ordinarios + el desglose de "otros ingresos,
// por función", una línea de P&L aparte, debajo de la ganancia bruta) — la suma
// de las 6 líneas ordinarias da EXACTO el total impreso ($47.333.779 M$ en 2024,
// $29.660.025 M$ en 2023, $28.846.935 M$ en 2022), y sumándole "Otros ingresos,
// por función" da el total de revenueLines de cada año.
//
// EXPENSES = Nota 23 (2024)/24 (2022) "Composición de cuentas de resultados
// relevantes", que desglosa por NATURALEZA "Costo de ventas", "Gastos de
// administración" y "Otros gastos, por función" — las 3 sub-tablas reconcilian
// EXACTO contra los 3 totales impresos en el Estado de Resultados.
//
// CATEGORIZACIÓN (revenue): "Ingresos por recaudaciones" -> matchday_competition;
// "venta de jugadores comprado a terceros"/"formados por el Club" -> player_sales
// (2 líneas separadas porque el documento las separa así, ver Nota 22); "Ingresos
// por publicidad" -> sponsorship_commercial; "Ingresos por derechos de
// televisión" -> broadcasting; "Otros" (dentro de ingresos ordinarios) y "Otros
// ingresos, por función" (línea de P&L aparte, debajo de la ganancia bruta) ->
// other_income, cada una su propia línea (no se combinan, para poder auditar
// cada una contra la nota que la sustenta).
//
// CATEGORIZACIÓN (expenses), dentro de "Costo de ventas": "Costo de ventas
// jugadores" (costo asociado a las ventas del año, distinto de la amortización
// del plantel activo) -> player_amortisation; "Remuneración plantel profesional
// y cuerpo técnico" -> wages_squad; "Amortización Activos en concesión"
// (amortización de activos de la concesión del Estadio Monumental, no vinculada
// a jugadores) -> depreciation; "Amortización pases jugadores profesionales" ->
// player_amortisation; "Costos de concentración traslados y otros" (viajes,
// pretemporada, concentración del plantel) -> match_organisation_expense;
// "Otros costos" -> other_expenses. Dentro de "Gastos de administración": todo
// -> admin_general_expense salvo "Depreciaciones" -> depreciation (es
// depreciación de activo fijo administrativo, no de plantel). Dentro de "Otros
// gastos, por función": "Otros gastos" -> other_expenses; "Intereses y Multas"
// (multas/recargos, no interés financiero de deuda) -> other_expenses, NO va a
// netInterest (ese campo es solo Ingresos/Costos financieros + diferencias de
// cambio, ver abajo).
//
// RESULTADOS FINANCIEROS: "Ingresos financieros" - "Costos financieros" -
// "Diferencias de tipo de cambio" (netas) van a fiscalYearMeta[year].netInterest,
// nunca como línea (club-data-mapping SKILL.md sección 2).
//
// IMPUESTO: "Gasto (Ingreso) por Impuesto a las Ganancias" va a
// fiscalYearMeta[year].tax. OJO CON EL SIGNO: en este documento, cuando la línea
// es POSITIVA representa un INGRESO/beneficio tributario que se SUMA al pretax
// para llegar al resultado después de impuesto (confirmado sumando: pretax +
// tax = PAT exacto en los 3 ejercicios) — no es el signo "gasto resta" que
// tienen otros balances, así que el valor se carga literal, con su signo tal
// cual lo imprime el documento.
//
// TIPO DE CAMBIO: ninguno de los 3 documentos (2022/2023/2024) declara su propio
// tipo de cambio de cierre en un Anexo dedicado (la Nota 28 "Moneda extranjera"
// desglosa activos/pasivos por moneda YA CONVERTIDOS a M$, sin declarar la tasa
// usada) — se usa el dólar observado (SII/Banco Central de Chile) de cierre de
// ejercicio, fx LITERAL (no fxRef a FX_CLOSE) porque fxSource:'market_approx':
// el 31/12 no tiene publicación propia en la serie consultada (cae fin de semana
// en 2022 y 2023; sin dato en la serie de SII para 2024) y se usó el día hábil
// más cercano — data/currency-map.js documenta que una cotización `market_approx`
// se queda literal en el archivo del club, no se centraliza en FX_CLOSE, para que
// nadie la reuse creyendo que es un cierre oficial exacto. Valores: 2022-12-30
// $859,51; 2023-12-29 $884,59; 2024-12-30 $992,12 (dólar observado SII/BCCh).
//
// GESTIÓN: Alfredo Stohwing presidió Blanco y Negro S.A. desde abril de 2022
// hasta abril de 2024 (~2 años, fuente: prensa deportiva chilena, abril 2024,
// cobertura de la vuelta de Aníbal Mosa a la presidencia); cierra los ejercicios
// 2022 y 2023 (31/12, antes del cambio de abril 2024). Aníbal Mosa asumió el 26
// de abril de 2024 (su 3er período) y es quien preside al cierre del ejercicio
// 2024 (31/12/2024), criterio "gestión al cierre del ejercicio" (mismo que ya
// usa el sitio, ver cabecera de data/club-leagues.js).
//
// grossDebt/cash: NO se cargaron (no se revisó el Estado de Situación Financiera
// completo en esta sesión, fuera de alcance — quedan en 0, mismo criterio que
// Once Caldas cuando el balance/deuda no se sourceó).
// ============================================================================

const colocoloRevenueLinesByYear = {
  2024: [
    { rawLabel:'Ingresos por recaudaciones', normalizedCategory:'matchday_competition', amountNative:11552.069, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores comprado a terceros', normalizedCategory:'player_sales', amountNative:2271.929, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores formados por el Club', normalizedCategory:'player_sales', amountNative:4651.549, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:12259.949, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de televisión', normalizedCategory:'broadcasting', amountNative:12057.231, disclosureLevel:'detailed' },
    { rawLabel:'Otros (ingresos de actividades ordinarias)', normalizedCategory:'other_income', amountNative:4541.052, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos, por función', normalizedCategory:'other_income', amountNative:274.716, disclosureLevel:'detailed', items:[
      ['Devolución seguros', 222.779], ['Dividendos', 51.937],
    ]},
  ],
  2023: [
    { rawLabel:'Ingresos por recaudaciones', normalizedCategory:'matchday_competition', amountNative:8197.538, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores comprado a terceros', normalizedCategory:'player_sales', amountNative:827.026, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores formados por el Club', normalizedCategory:'player_sales', amountNative:996.125, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:10192.754, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de televisión', normalizedCategory:'broadcasting', amountNative:8367.460, disclosureLevel:'detailed' },
    { rawLabel:'Otros (ingresos de actividades ordinarias)', normalizedCategory:'other_income', amountNative:1079.122, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos, por función', normalizedCategory:'other_income', amountNative:2260.264, disclosureLevel:'detailed', items:[
      ['Condonación Intereses y Multas TGR', 1270.400], ['Provisión PPUA', 983.882], ['Otros Ingresos', 5.982],
    ]},
  ],
  2022: [
    { rawLabel:'Ingresos por recaudaciones', normalizedCategory:'matchday_competition', amountNative:5032.509, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores comprado a terceros', normalizedCategory:'player_sales', amountNative:4830.583, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores formados por el Club', normalizedCategory:'player_sales', amountNative:694.804, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:8641.046, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de televisión', normalizedCategory:'broadcasting', amountNative:8812.894, disclosureLevel:'detailed' },
    { rawLabel:'Otros (ingresos de actividades ordinarias)', normalizedCategory:'other_income', amountNative:835.099, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos, por función', normalizedCategory:'other_income', amountNative:108.593, disclosureLevel:'detailed', items:[
      ['Dividendos', 99.545], ['Otros ingresos', 9.048],
    ]},
  ],
};

const colocoloExpenseLinesByYear = {
  2024: [
    { rawLabel:'Costo de ventas jugadores', normalizedCategory:'player_amortisation', amountNative:-1603.044, disclosureLevel:'detailed' },
    { rawLabel:'Remuneración plantel profesional y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-18468.781, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos en concesión', normalizedCategory:'depreciation', amountNative:-228.205, disclosureLevel:'detailed' },
    { rawLabel:'Amortización pases jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-4588.745, disclosureLevel:'detailed' },
    { rawLabel:'Costos de concentración traslados y otros', normalizedCategory:'match_organisation_expense', amountNative:-8362.036, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos (costo de ventas)', normalizedCategory:'other_expenses', amountNative:-2289.846, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración', normalizedCategory:'admin_general_expense', amountNative:-7857.352, disclosureLevel:'detailed', items:[
      ['Servicios básicos', 336.507], ['Asesorías', 860.634], ['Gastos Legales', 715.785], ['Mantenciones', 45.392], ['Remuneración administración', 3703.869], ['Otros gastos de administración', 2195.165],
    ]},
    { rawLabel:'Depreciaciones (gastos de administración)', normalizedCategory:'depreciation', amountNative:-522.938, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-39.860, disclosureLevel:'detailed' },
    { rawLabel:'Intereses y Multas (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-855.267, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Costo de ventas jugadores', normalizedCategory:'player_amortisation', amountNative:-173.974, disclosureLevel:'detailed' },
    { rawLabel:'Remuneración plantel profesional y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-12347.555, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos en concesión', normalizedCategory:'depreciation', amountNative:-228.205, disclosureLevel:'detailed' },
    { rawLabel:'Amortización pases jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-3249.301, disclosureLevel:'detailed' },
    { rawLabel:'Costos de concentración traslados y otros', normalizedCategory:'match_organisation_expense', amountNative:-5090.641, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos (costo de ventas)', normalizedCategory:'other_expenses', amountNative:-1373.570, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración', normalizedCategory:'admin_general_expense', amountNative:-6080.220, disclosureLevel:'detailed', items:[
      ['Servicios básicos', 323.036], ['Asesorías', 765.707], ['Gastos Legales', 426.937], ['Mantenciones', 42.637], ['Remuneración administración', 3250.798], ['Otros gastos de administración', 1271.105],
    ]},
    { rawLabel:'Depreciaciones (gastos de administración)', normalizedCategory:'depreciation', amountNative:-507.507, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-30.963, disclosureLevel:'detailed' },
    { rawLabel:'Intereses y Multas (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-701.853, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Costo de ventas jugadores', normalizedCategory:'player_amortisation', amountNative:-2614.370, disclosureLevel:'detailed' },
    { rawLabel:'Remuneración plantel profesional y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-11057.918, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos en concesión', normalizedCategory:'depreciation', amountNative:-228.204, disclosureLevel:'detailed' },
    { rawLabel:'Amortización pases jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-2537.550, disclosureLevel:'detailed' },
    { rawLabel:'Costos de concentración traslados y otros', normalizedCategory:'match_organisation_expense', amountNative:-4167.757, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos (costo de ventas)', normalizedCategory:'other_expenses', amountNative:-695.903, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración', normalizedCategory:'admin_general_expense', amountNative:-4998.150, disclosureLevel:'detailed', items:[
      ['Servicios básicos', 200.893], ['Asesorías', 550.526], ['Gastos Legales', 399.975], ['Mantenciones', 49.131], ['Remuneración administración', 2430.000], ['Otros gastos de administración', 1367.625],
    ]},
    { rawLabel:'Depreciaciones (gastos de administración)', normalizedCategory:'depreciation', amountNative:-543.459, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-27.731, disclosureLevel:'detailed' },
    { rawLabel:'Intereses y Multas (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-376.828, disclosureLevel:'detailed' },
  ],
};

const colocoloFiscalYearMeta = {
  2024: {
    currency:'CLP', fx:992.12, fxSource:'market_approx',
    sourceId:'colocolo-cl-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'mosa3',
    netInterest:0.609 - 1794.667 - 700.471, // Ingresos financieros - Costos financieros - Diferencias de tipo de cambio
    tax:370.515, profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0, // no sourceado en esta sesión (fuera de alcance)
    officialTotalRevenue:47608.495, officialTotalExpenses:44816.074, officialPAT:668.407,
  },
  2023: {
    currency:'CLP', fx:884.59, fxSource:'market_approx',
    sourceId:'colocolo-cl-estados-financieros-2023',
    reportType:'official_balance_sheet',
    gestionId:'stohwing',
    netInterest:0.273 - 1005.992 - 278.728,
    tax:-34.283, profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0,
    officialTotalRevenue:31920.289, officialTotalExpenses:29783.789, officialPAT:817.770,
  },
  2022: {
    currency:'CLP', fx:859.51, fxSource:'market_approx',
    sourceId:'colocolo-cl-estados-financieros-2022',
    reportType:'official_balance_sheet',
    gestionId:'stohwing',
    netInterest:80.129 - 1408.430 - 1211.160,
    tax:1623.264, profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0,
    officialTotalRevenue:28955.528, officialTotalExpenses:27247.870, officialPAT:791.461,
  },
};

const colocoloPresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía (fuera de
// alcance de esta sesión, que se enfocó en Finanzas 2022-2024).
const colocoloPasesData = [];
const colocoloResultadosData = {};
const colocoloTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['colocolo-cl'] = {
  revenueLinesByYear: colocoloRevenueLinesByYear, expenseLinesByYear: colocoloExpenseLinesByYear,
  fiscalYearMeta: colocoloFiscalYearMeta, pasesData: colocoloPasesData,
  resultadosData: colocoloResultadosData, titulosData: colocoloTitulosData,
  presupuestoOverlayByYear: colocoloPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'colocolo-cl-estados-financieros-2024': {
      id:'colocolo-cl-estados-financieros-2024', clubId:'colocolo-cl',
      title:'Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales, ejercicios terminados al 31 de diciembre de 2024 y 2023',
      type:'official_balance_sheet', reliability:'primary',
      note:'EEFF consolidados bajo IFRS, con notas completas (82+ páginas). Transcripción completa en Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2024.md. Tipo de cambio: dólar observado de cierre (el documento no declara uno propio). OJO: según fuentes/Chile/Colo-Colo (Blanco y Negro).md, este balance fue inicialmente rechazado por los accionistas en la junta de abril 2025 (por el tratamiento contable del contrato con DG Medios) y la CMF debió intervenir; el PDF cargado es el que finalmente circuló, pero conviene revisar prensa de la época antes de citar este ejercicio como definitivo sin salvedad.',
    },
  'colocolo-cl-estados-financieros-2023': {
      id:'colocolo-cl-estados-financieros-2023', clubId:'colocolo-cl',
      title:'Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales, ejercicios terminados al 31 de diciembre de 2023 y 2022',
      type:'official_balance_sheet', reliability:'primary',
      note:'Cifras del ejercicio 2023 extraídas del comparativo del documento de 2024 (verificado idéntico contra el "año corriente" del documento propio de 2023: mismo pretax y mismo impuesto). Transcripción completa en Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2023.md.',
    },
  'colocolo-cl-estados-financieros-2022': {
      id:'colocolo-cl-estados-financieros-2022', clubId:'colocolo-cl',
      title:'Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales, ejercicios terminados al 31 de diciembre de 2022 y 2021',
      type:'official_balance_sheet', reliability:'primary',
      note:'Transcripción completa en Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2022.md.',
    },
});

// gestionesByClub: Alfredo Stohwing presidió Blanco y Negro S.A. abril 2022 - abril 2024 (cierra
// 2022 y 2023); Aníbal Mosa asumió su 3er período el 26/4/2024 (cierra 2024). Fuente: cobertura de
// prensa deportiva chilena de abril 2024 sobre el cambio de presidencia (Emol, Cooperativa,
// Meganoticias, La Tercera) — ver comentario de cabecera de este archivo.
gestionesByClub['colocolo-cl'] = {
  stohwing: { nombre:'Stohwing (2022-2024)', firstYear:2022, lastYear:2023 },
  mosa3: { nombre:'Mosa (2024-actual, 3er período)', firstYear:2024, lastYear:2024 },
};

memberCountByClub['colocolo-cl'] = null;

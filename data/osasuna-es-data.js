// ============================================================================
// data/osasuna-es-data.js — Club Atlético Osasuna. Ejercicios 2021/2022
// (1/7/2021 a 30/6/2022) y 2023/2024 (1/7/2023 a 30/6/2024).
//
// Fuente: informes de auditoría + cuentas anuales oficiales,
// `Clubes/España/CA Osasuna/auditoria2022.pdf` y `auditoria2024.pdf` (PDFs con
// texto nativo, 2022 con calidad de OCR/extracción irregular en zonas del
// documento — ver gotcha abajo). Transcripciones completas en los .md
// homónimos, misma carpeta.
//
// Cifras en EUR MILLONES nativos. fx: `EUR@2022-06-30` (agregada a
// data/currency-map.js en esta sesión) y `EUR@2024-06-30` (ya existía), el
// documento no declara un tipo de cambio propio.
//
// GOTCHA DE TRANSCRIPCIÓN (Ejercicio 2021/2022 únicamente): varias cifras de
// la Nota 16.1 vinieron con coma en vez de punto de miles por un error de OCR
// (ej. "541,994" en vez de "541.994" para "Taquillas Liga") — se detectaron y
// corrigieron verificando que la suma de la fila cerrara EXACTA contra el
// TOTAL impreso de esa misma nota (63.824.948), no se tomó ningún número
// suelto sin ese cruce.
//
// CATEGORIZACIÓN: el Ejercicio 2023/2024 desglosa ingresos/gastos con
// sub-letras a)/b)/c)/... directo en la cara de la Cuenta de Pérdidas y
// Ganancias (mucho más fino que 2021/2022, que solo da el desglose en las
// notas 16.1/16.2/16.6) — mismo criterio de mapeo que Getafe/Elche:
// - "Ingresos por competiciones" -> competition_bonus. "Ingresos por
//   abonados y socios" -> season_tickets (2022: fila "Socios" de la Nota 16.1,
//   mismo concepto). "Ingresos por explotación de instalaciones" (2024, línea
//   nueva y chica, nombra explícitamente las instalaciones del club) ->
//   stadium_other. "Ingresos por retransmisiones"/"Derechos audiovisuales" ->
//   broadcasting. "Ingresos por comercialización y publicidad"/"Publicidad"+
//   "Tienda" -> sponsorship_commercial.
// - "Ingresos por cesiones" (2022, préstamo de jugadores) -> player_sales.
//   "Arrendamientos"/"Ingresos por derechos venta"/"Otros Ingresos"/
//   "Subvenciones" (2022) y "Ingresos accesorios y otros de gestión
//   corriente"/"Subvenciones a la explotación" (2024) -> other_income.
// - "Imputación de subvenciones de inmovilizado no financiero" -> other_income
//   (mismo criterio que Getafe): corresponde a la activación de la Cesión de
//   Uso del Estadio El Sadar, financiada con subvención pública, y se
//   amortiza y se imputa a razón de prácticamente el mismo importe cada año
//   (ver Nota 5/6) — no mueve el resultado neto, es un "espejo" contable.
// - "Deterioro y resultado por enajenaciones del inmovilizado" (venta neta de
//   derechos federativos, puede ser positivo o negativo según el año) ->
//   fiscalYearMeta.profitOnPlayerSales, NUNCA revenueLine.
// - "Otros resultados" (partida excepcional, Nota 16.4) -> revenueLine
//   other_income si el neto es positivo (los 2 años cargados lo son): 2022
//   dominado por sentencias judiciales a favor del Club (Sres. Izco/Suárez/
//   Archanco et al.) y un ingreso por la organización del amistoso
//   Argentina-Estonia; 2024 dominado por cobros del "Caso Osasuna" y
//   beneficios por cesiones/traspasos de jugadores (Ezzalzoul, Brasanac,
//   Huesca-Martínez), neto de un gasto recurrente por la crisis COVID-19
//   facturado por LaLiga (última vez en 2024/25, según el propio documento).
// - "Gastos de personal": 2024 separa en la cara del P&L "Gastos Personal
//   Deportivo Inscribible"/"No Inscribible" -> wages_squad y "Gastos Personal
//   NO DEPORTIVO" -> admin_general_expense, sin bolsón. 2022 solo da
//   "Sueldos y salarios"/"Cargas sociales" en la cara, pero la Nota 16.6 SÍ
//   separa sueldos por plantilla deportiva/no deportiva — la Seguridad
//   Social y otras cargas sociales de 2022 NO están desglosadas por área en
//   ninguna nota, así que van al bolsón `lump_football_operations_expense`
//   (nunca forzar un prorrateo aproximado).
// - "Otros gastos de explotación": Servicios exteriores + Tributos ->
//   admin_general_expense; Pérdidas/deterioro operaciones comerciales +
//   Otros gastos de gestión corriente (sin desglose adicional disponible en
//   ninguno de los 2 documentos) -> other_expenses.
// - "Amortización del inmovilizado": 2024 la separa en la cara del P&L
//   (Dchos. Adq./traspaso jugadores, Otro inmovilizado intangible,
//   Inmovilizado material). 2022 se reconstruyó desde la Nota 5/6 (cuadro de
//   movimientos, columna "Entradas" = dotación del ejercicio): Derechos de
//   traspaso -> player_amortisation; Aplicaciones informáticas + Otro
//   inmovilizado intangible (la Cesión de Uso del Estadio, ver arriba) ->
//   other_amortisation; Terrenos/construcciones + Instalaciones técnicas ->
//   depreciation.
//
// VERIFICACIÓN Ejercicio 2021/2022 (replicando la Cuenta de Pérdidas y
// Ganancias línea por línea, ver el .md): Revenue 70,058872 M - Expenses
// (cash 59,131394 M + non-cash 9,972092 M = 69,103486 M) + profitOnPlayerSales
// (-2,422339 M) = -1,466953 M ≈ A.1) RESULTADO DE EXPLOTACIÓN impreso
// (-1.466.954,61, diff ~1 EUR de redondeo); + netInterest -1,584758 M =
// -3,051711 M ≈ A.3 impreso (-3.051.712,44) OK; + tax +1,998652 M =
// -1,053059 M ≈ A.5/PAT impreso (-1.053.060,55) OK.
//
// VERIFICACIÓN Ejercicio 2023/2024: Revenue 76,443297 M - Expenses (cash
// 70,471505 M + non-cash 7,550543 M = 78,022048 M) + profitOnPlayerSales
// 5,101991 M = 3,523240 M ≈ A.1 impreso (3.523.240) EXACTO; + netInterest
// -1,676497 M = 1,846743 M ≈ A.3 impreso (1.846.742) OK; + tax 0,958945 M =
// 2,805688 M ≈ A.5/PAT impreso (2.805.688) EXACTO.
// ============================================================================

const osasunaesRevenueLinesByYear = {
  2022: [
    { rawLabel:'Taquillas Liga y amistosos', normalizedCategory:'competition_bonus', amountNative:0.543417, disclosureLevel:'detailed', items:[
      ['Taquillas Liga', 0.541994], ['Amistosos', 0.001423],
    ]},
    { rawLabel:'Socios', normalizedCategory:'season_tickets', amountNative:5.388221, disclosureLevel:'detailed' },
    { rawLabel:'Derechos audiovisuales', normalizedCategory:'broadcasting', amountNative:51.254102, disclosureLevel:'detailed' },
    { rawLabel:'Tienda y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:6.639209, disclosureLevel:'detailed', items:[
      ['Tienda', 0.145309], ['Publicidad', 6.493900],
    ]},
    { rawLabel:'Ingresos por cesiones (préstamo de jugadores)', normalizedCategory:'player_sales', amountNative:0.060000, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación (arrendamientos, derechos de venta, otros, subvenciones)', normalizedCategory:'other_income', amountNative:2.194211, disclosureLevel:'detailed', items:[
      ['Arrendamientos (terrenos de Tajonar)', 0.479415], ['Ingresos por derechos venta', 0.117236], ['Otros ingresos (quinielas/licencias/patrocinios LaLiga, RFEF cantera, UEFA)', 1.242399], ['Subvenciones de explotación', 0.355161],
    ]},
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero (Cesión de Uso del Estadio El Sadar)', normalizedCategory:'other_income', amountNative:1.385807, disclosureLevel:'detailed' },
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0.001150, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados (excepcionales: sentencias judiciales a favor, amistoso Argentina-Estonia, gasto COVID-19 LaLiga)', normalizedCategory:'other_income', amountNative:2.592756, disclosureLevel:'detailed', items:[
      ['Sentencia Sr. Izco (responsable civil)', 1.154763], ['Sentencia Archanco et al. (provisionado como cobrable)', 1.350000], ['Sentencia Sr. Suárez', 0.250000], ['Acuerdo AS Monaco / Álvaro Fernández', 0.375000], ['Beneficio amistoso Argentina-Estonia', 0.293602], ['Ingreso extraordinario traspaso Oihan Sancet (hito cumplido)', 0.150000], ['Gasto COVID-19 facturado por LaLiga (temporada 20/21, a 5 años)', -1.061255], ['Otros ajustes menores', 0.080646],
    ]},
  ],
  2024: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:4.853667, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:6.764142, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por explotación de instalaciones', normalizedCategory:'stadium_other', amountNative:0.044227, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisiones', normalizedCategory:'broadcasting', amountNative:51.833310, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:7.722948, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación (accesorios y gestión corriente, subvenciones)', normalizedCategory:'other_income', amountNative:2.291856, disclosureLevel:'detailed', items:[
      ['Ingresos accesorios y otros de gestión corriente', 2.134254], ['Subvenciones a la explotación', 0.157602],
    ]},
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero (Cesión de Uso del Estadio El Sadar)', normalizedCategory:'other_income', amountNative:1.224420, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados (excepcionales: cobros "Caso Osasuna", beneficios por cesión/traspaso de jugadores, neto de gasto COVID-19 LaLiga)', normalizedCategory:'other_income', amountNative:1.708727, disclosureLevel:'detailed', items:[
      ['Cobros relacionados con el "Caso Osasuna"', 1.000000], ['Beneficio traspaso Abde Ezzalzoul (Real Betis)', 0.550000], ['Beneficio ascenso Darko Brasanac (Leganés)', 0.200000], ['Permanencia Huesca en Segunda con Javi Martínez cedido', 0.100000], ['Gasto COVID-19 facturado por LaLiga (último año)', -0.270996], ['Otros ajustes menores', 0.129723],
    ]},
  ],
};

const osasunaesExpenseLinesByYear = {
  2022: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-0.492851, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios, plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-35.602344, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios, plantilla no deportiva', normalizedCategory:'admin_general_expense', amountNative:-3.386508, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad Social y otras cargas sociales (sin desglosar por área)', normalizedCategory:'lump_football_operations_expense', amountNative:-1.509496, disclosureLevel:'not_disclosed', items:[
      ['Seguridad social a cargo de la empresa', -1.492852], ['Otras cargas sociales', -0.016644],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-12.654800, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.048387, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.432752, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'other_expenses', amountNative:-5.004256, disclosureLevel:'aggregated' },
    { rawLabel:'Amortización de derechos de traspaso de jugadores', normalizedCategory:'player_amortisation', amountNative:-7.075315, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de otro inmovilizado intangible (incl. Cesión de Uso del Estadio El Sadar)', normalizedCategory:'other_amortisation', amountNative:-1.433719, disclosureLevel:'detailed', items:[
      ['Aplicaciones informáticas', -0.047912], ['Cesión de Uso del Estadio El Sadar y Tajonar', -1.385807],
    ]},
    { rawLabel:'Amortización de inmovilizado material (terrenos, construcciones e instalaciones)', normalizedCategory:'depreciation', amountNative:-1.463058, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-1.044355, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Personal Deportivo (Inscribible y No Inscribible)', normalizedCategory:'wages_squad', amountNative:-40.818907, disclosureLevel:'detailed', items:[
      ['Inscribible', -38.020694], ['No inscribible', -2.798213],
    ]},
    { rawLabel:'Gastos Personal No Deportivo', normalizedCategory:'admin_general_expense', amountNative:-6.111538, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-15.295070, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.076577, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas y provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.000817, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'other_expenses', amountNative:-7.124241, disclosureLevel:'aggregated' },
    { rawLabel:'Amortización de derechos de adquisición y traspaso de jugadores', normalizedCategory:'player_amortisation', amountNative:-4.331337, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de otro inmovilizado intangible (incl. Cesión de Uso del Estadio El Sadar)', normalizedCategory:'other_amortisation', amountNative:-1.281098, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de inmovilizado material', normalizedCategory:'depreciation', amountNative:-1.938109, disclosureLevel:'detailed' },
  ],
};

const osasunaesFiscalYearMeta = {
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'osasuna-es-auditoria-2021-22',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest = A.2) RESULTADO FINANCIERO impreso (14+15+17+18: ingresos financieros 1,20 +
    // gastos financieros -1.584.759,03 + diferencias de cambio 0 = -1.584.757,83).
    netInterest:-1.584758, tax:1.998652,
    // profitOnPlayerSales = "11. Deterioro y resultado por enajenaciones del inmovilizado" impreso
    // (2022 es una PÉRDIDA neta: bajas de Brandon Thomas, Enric Gallego, Iñigo Pérez y Jonas
    // Ramalho, jugadores que finalizaron su vinculación con el Club).
    profitOnPlayerSales:-2.422339, assetSales:0,
    // grossDebt = Deudas a largo plazo + Deudas a corto plazo (Nota 13, deuda financiera, ya
    // separada de "Acreedores comerciales y otras cuentas a pagar" en el propio balance). cash =
    // Efectivo y otros activos líquidos equivalentes.
    grossDebt:45.839328, cash:6.029247,
    officialTotalRevenue:70.058872, officialTotalExpenses:69.103486, officialPAT:-1.053060,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'osasuna-es-auditoria-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest = A.2) Resultado financiero impreso (-1.676.497), tomado directo (la fila de
    // "Diferencias de cambio" quedó con un valor ambiguo en la transcripción, ver el .md).
    netInterest:-1.676497, tax:0.958945,
    // profitOnPlayerSales = "11. Deterioro y Rtdo. por enaj. inmov." impreso (2024 es una
    // GANANCIA neta, a diferencia de 2022).
    profitOnPlayerSales:5.101991, assetSales:0,
    grossDebt:50.186677, cash:3.067461,
    officialTotalRevenue:76.443297, officialTotalExpenses:78.022048, officialPAT:2.805688,
  },
};

const osasunaesPresupuestoOverlayByYear = {};
const osasunaesPasesData = [];
const osasunaesResultadosData = {};
const osasunaesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['osasuna-es'] = {
  revenueLinesByYear: osasunaesRevenueLinesByYear, expenseLinesByYear: osasunaesExpenseLinesByYear,
  fiscalYearMeta: osasunaesFiscalYearMeta, pasesData: osasunaesPasesData,
  resultadosData: osasunaesResultadosData, titulosData: osasunaesTitulosData,
  presupuestoOverlayByYear: osasunaesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'osasuna-es-auditoria-2021-22': {
      id:'osasuna-es-auditoria-2021-22', clubId:'osasuna-es',
      title:'Informe de Auditoría y Cuentas Anuales, ejercicio terminado el 30 de junio de 2022',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF con texto nativo (Loyola Auditores, S.L.P.), transcripción completa en Clubes/España/CA Osasuna/auditoria2022.md. Varias cifras de la Nota 16.1 vinieron con coma en vez de punto de miles por un error de OCR/extracción — corregidas verificando que cerraran contra el TOTAL impreso de esa misma nota antes de cargar nada.',
    },
  'osasuna-es-auditoria-2023-24': {
      id:'osasuna-es-auditoria-2023-24', clubId:'osasuna-es',
      title:'Informe de Auditoría y Cuentas Anuales, ejercicio terminado el 30 de junio de 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF con texto nativo, transcripción completa en Clubes/España/CA Osasuna/auditoria2024.md. Este ejercicio desglosa ingresos y gastos con sub-letras directo en la cara de la Cuenta de Pérdidas y Ganancias, mucho más fino que el ejercicio 2021/2022.',
    },
});

gestionesByClub['osasuna-es'] = {
  actual: { nombre:'Gestión actual', firstYear:2022, lastYear:2024 },
};

memberCountByClub['osasuna-es'] = null;

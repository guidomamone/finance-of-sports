// ============================================================================
// data/river-data.js — River Plate: Brito (2021-actual) y D'Onofrio (2013-2021).
//
// Ejercicio 2024 (gestión Brito) = REAL, balance auditado real vía réplica de tuRiver.com — ver
// comentario largo antes de riverRevenueLinesByYear[2024] más abajo. El resto (Ejercicio 2025 y
// Ejercicio 2021) SIGUE SIENDO PLACEHOLDER: no hay documento oficial cargado para esos ejercicios
// (ver fuentes-por-club.md). La cobertura de prensa que se encontró al armar el esquema original
// tenía cifras ambiguas/contradictorias entre sí (una nota hablaba de "cuota social + abonos"
// combinados, otra de "entradas y abonos" del estadio remodelado como un número aparte, sin quedar
// claro si se superponían) — en vez de forzar esos números dudosos a una categoría, se optó por
// números redondos, obviamente inventados. El ejercicio 2021 (última temporada de D'Onofrio) se
// agregó con el mismo criterio, solo para que "Comparar Gestiones" tenga dos períodos de River.
//
// LOS RESULTADOS DEPORTIVOS (más abajo) SÍ SON REALES, a diferencia de las
// finanzas: buscados y verificados vía web search en agosto de 2026.
// ============================================================================

// Ejercicio 2024 (1° de septiembre de 2023 al 31 de agosto de 2024, Ejercicio N°123 según la
// propia numeración de River) = REAL, del balance auditado (Estado de Recursos y Gastos + Anexo
// VII de Ingresos + Anexo VIII de Gastos). Fuente: ver sources['river-estados-contables-2023-24']
// en data/clubs.js — el PDF se consiguió en una réplica de la comunidad tuRiver (turiver.com), NO
// del dominio oficial de River, aunque el documento en sí es el balance auditado real (informe de
// auditoría independiente incluido, sellos CPCECABA). Transcripción completa en
// Clubes/Argentina/River/estados-contables-leads/river-estados-contables-2023-24.md.
//
// Cifras en PESOS COMPLETOS / millones ARS NATIVOS (Versión 32 — REESCRITO). Hasta la Versión 31,
// este archivo guardaba amountNative ya convertido a USD (una sola conversión, sin capa de
// re-conversión como Boca). Desde la Versión 32, River sigue el mismo patrón que Boca y Racing:
// amountNative se guarda en ARS millones nativos, y la conversión a USD pasa al renderizar
// (yearMetaFor('river', year) + toDisplayValue) — esto es lo que habilita el toggle USD/ARS en vivo.
//
// Tipo de cambio: $950,50 al 31/08/2024 — NO es una cotización externa investigada a mano, es el
// valor que el PROPIO balance declara en su Anexo V ("Activos en Moneda Extranjera", pág. 55,
// columna "Cambio vigente al cierre") para convertir sus partidas en USD a pesos. Antes se usaba
// $953,50 (Rava Bursátil/BCRA, investigado externamente) — se corrigió en la Versión 32 siguiendo
// la misma regla nueva que Racing (preferir el tipo de cambio que declara el propio documento antes
// que uno externo, ver finance-of-sports/.claude/skills/club-data-mapping/SKILL.md sección 5). La
// diferencia es chica (~0,3%) pero la fuente primaria es más fiel. El balance también declara tipos
// de cambio propios para EUR ($1.049,5421) y CHF ($1.122,36) en el mismo Anexo — no se usan acá
// porque el sitio solo modela una moneda de reporte (ARS) y una de display (USD), no multi-moneda
// por partida.
//
// Revenue = 5 categorías reales del Anexo VII (Fútbol Profesional, Estadio, Educación, Deportes y
// otras actividades, Socios), cada una con sus sub-ítems reales — la suma de las 5 da EXACTO
// $207.077.217.738, el "Total recursos ordinarios" impreso. Expenses = 8 áreas reales del Anexo
// VIII (Fútbol profesional, Educación, Deportes, Administración, Mantenimiento e intendencia,
// Servicio médico y asistencial, Socios, Museo) + 3 ítems no-efectivo (Depreciación, Amortización
// de plantel, Amortización de software) — la suma da EXACTO $(149.674.797.729), el "Total gastos
// ordinarios" impreso. NO se cargó el desglose interno de Gastos por concepto (Anexo VIII tiene una
// matriz concepto×área que el agente de extracción no pudo transcribir con confianza suficiente por
// la calidad del escaneo) — se prefirió omitir esas celdas en vez de arriesgar una cifra incorrecta,
// documentado en el .md de arriba.
//
// OJO — discrepancia encontrada y resuelta durante la carga: la transcripción original traía DOS
// valores distintos para "Depreciación de bienes de uso" ($5.984.158.778 en la tabla principal del
// Estado de Recursos y Gastos vs. $5.594.158.778 citado en una nota de cruce del Anexo II). Se
// verificó por aritmética propia (sumando categorías conocidas hasta llegar al Total de Gastos
// Ordinarios ya confirmado) que el valor correcto es $5.984.158.778 — el de la nota del Anexo II
// tiene una transposición de dígitos. Se usó el valor verificado, no el de la nota.
const riverRevenueLinesByYear = {
  // ARS millones nativos (Versión 32 — antes USD ya convertido). Fuente: Anexo VII, pág. 58,
  // columna 31/08/2024. Suma exacta a $207.077.217.738.
  2024: [
    { rawLabel:'Fútbol Profesional', normalizedCategory:'lump_football_operations', amountNative:138100.487166, disclosureLevel:'detailed', items:[
      ['Venta, préstamos de jugadores, derechos de formación y otros', 34976.634475], ['Televisión', 12013.955106],
      ['Publicidad', 38954.967989], ['Ingresos torneos nacionales e internacionales', 52154.929596],
    ]},
    { rawLabel:'Estadio', normalizedCategory:'matchday_competition', amountNative:13365.876231, disclosureLevel:'detailed', items:[
      ['Concesiones', 2710.815855], ['Ingresos Museo', 4624.600585], ['Alquileres', 5758.259768], ['Estacionamiento', 272.200023],
    ]},
    { rawLabel:'Educación', normalizedCategory:'other_income', amountNative:4132.081787, disclosureLevel:'detailed', items:[
      ['Instituto de enseñanza', 2926.467892], ['Subsidios estatales', 1205.613895],
    ]},
    { rawLabel:'Deportes y otras actividades', normalizedCategory:'other_income', amountNative:1519.239655, disclosureLevel:'detailed', items:[
      ['Abonos y aranceles varios', 1313.513553], ['Escuela de fútbol', 108.42522], ['Publicidad', 97.300882],
    ]},
    { rawLabel:'Socios', normalizedCategory:'member_dues', amountNative:49959.532899, disclosureLevel:'detailed', items:[
      ['Cuotas sociales', 42123.020825], ['Somos River', 7803.142331], ['Otras membresías', 33.369743],
    ]},
  ],
};

const riverExpenseLinesByYear = {
  // ARS millones nativos (Versión 32). Fuente: Anexo VIII, pág. 59-62, fila "Totales al
  // 31/08/2024" por área + Estado de Recursos y Gastos (Depreciación/Amortización, pág. 11). Suma
  // exacta a $(149.674.797.729), el "Total gastos ordinarios" impreso.
  // CATEGORIZACIÓN POR DESTINO (Versión 140, a pedido de Guido: "river 2024: arreglalo").
  // Hasta acá las 8 líneas de arriba estaban las 8 en `other_expenses`, o sea el 80% de los
  // gastos de River caía al catch-all "Otros gastos" de Formato simplificado, y la fila
  // "Salarios y primas" mostraba $0. Un club de primera división no gasta cero en sueldos: lo
  // que pasa es que el Anexo VIII de River desglosa sus gastos POR DESTINO (qué área del club
  // los gastó) y no POR NATURALEZA (en qué se gastaron), así que los sueldos están adentro de
  // cada área, sin una línea propia.
  //
  // QUÉ SE HIZO: mapear cada destino al bucket de destino que el sitio ya tiene, siguiendo
  // LÍNEA POR LÍNEA el precedente de Boca 2025 (`data/boca-data.js`), que es la referencia
  // canónica de Formato simplificado. No se movió ni un peso: los montos son los mismos y el
  // total sigue cerrando contra los $149.674.797.729 impresos.
  //   - "Fútbol profesional" -> `lump_football_operations_expense`, que es exactamente lo que
  //     es: un bolsón que la fuente no desglosa. Se muestra en la fila "Fútbol profesional (sin
  //     desglosar por la fuente)", que lo dice, en vez de perderse en "Otros gastos".
  //   - "Educación" y "Deportes" -> `youth_other_sports_expense` (Boca manda ahí su
  //     Departamento de educación física, Fútbol juvenil, Básquet y Fútbol femenino).
  //   - "Administración", "Mantenimiento e intendencia", "Servicio médico y asistencial",
  //     "Socios" y "Museo" -> `admin_general_expense` (Boca manda ahí "Gastos generales",
  //     "Gastos de estructura operativa — Otros", "Departamento médico — Otros gastos
  //     operativos" y "Departamento de cultura", que es el análogo del Museo).
  //
  // LO QUE SIGUE SIN SABERSE, Y DÓNDE ESTÁ: cuánto de esos $78.835 M es sueldo del plantel.
  // El Anexo VIII tiene la matriz completa (30 conceptos x 8 áreas, páginas 59-62 del PDF,
  // impresas 51-54), con "Sueldos y cargas sociales" como una de sus filas. NO se transcribió:
  // la sesión que leyó el documento encontró diferencias no explicadas al sumar celdas
  // individuales de esa matriz escaneada y decidió no publicar cifras posiblemente incorrectas
  // (ver el final de `Clubes/Argentina/River/estados-contables-leads/river-estados-contables-2023-24.md`).
  // La celda que hace falta es UNA: fila "Sueldos y cargas sociales" x columna "Fútbol
  // profesional". El día que se lea y verifique, esa porción sale de acá y pasa a `wages_squad`.
  2024: [
    { rawLabel:'Fútbol profesional', normalizedCategory:'lump_football_operations_expense', amountNative:-78835.612406, disclosureLevel:'not_disclosed' },
    { rawLabel:'Educación', normalizedCategory:'youth_other_sports_expense', amountNative:-4112.960939, disclosureLevel:'detailed' },
    { rawLabel:'Deportes', normalizedCategory:'youth_other_sports_expense', amountNative:-5640.127149, disclosureLevel:'detailed' },
    { rawLabel:'Administración', normalizedCategory:'admin_general_expense', amountNative:-10887.796621, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento e intendencia', normalizedCategory:'admin_general_expense', amountNative:-7235.840776, disclosureLevel:'detailed' },
    { rawLabel:'Servicio médico y asistencial', normalizedCategory:'admin_general_expense', amountNative:-875.180363, disclosureLevel:'detailed' },
    { rawLabel:'Socios', normalizedCategory:'admin_general_expense', amountNative:-10595.940947, disclosureLevel:'detailed' },
    { rawLabel:'Museo', normalizedCategory:'admin_general_expense', amountNative:-1156.148838, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-5984.158778, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de plantel de jugadores de fútbol', normalizedCategory:'player_amortisation', amountNative:-23916.286868, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de software', normalizedCategory:'other_amortisation', amountNative:-434.744044, disclosureLevel:'detailed' },
  ],
};

const riverFiscalYearMeta = {
  // Ejercicio 2024: no se pudo separar "Salarios" del resto de los gastos operativos por área (el
  // Anexo VIII sí tiene ese desglose por concepto, pero la matriz no se pudo transcribir con
  // confianza suficiente — ver comentario arriba). Por eso wages queda en 0 acá (todo cae en
  // "Otros gastos" vía normalizedCategory) y el stat "Salarios / Ingresos" no es representativo
  // para este ejercicio — no es un error, es una limitación de la fuente transcripta.
  // currency/fx (Versión 32): 'ARS' con fx:950.50, el tipo de cambio que el propio balance declara
  // en su Anexo V (ver comentario de cabecera) — no una cotización externa. grossDebt/cash/extraRows
  // están en ARS millones nativos ahora (antes USD ya convertido).
  2024: {
    currency:'ARS', fx:950.50, fxSource:'document_close',
    sourceId:'river-estados-contables-2023-24',
    reportType:'unofficial_mirror',
    gestionId:'brito',
    // grossDebt = "Préstamos" (Nota 2.f, corriente $19.987.059.205 + no corriente $7.500.000.000),
    // NO el Total del Pasivo completo (que incluye cuentas por pagar, cargas fiscales, etc. — mismo
    // criterio que Boca/Racing: grossDebt es deuda financiera, no todo lo que el club debe). cash =
    // Caja y bancos (pág. 10, Estado de situación patrimonial).
    grossDebt:27487.059205, cash:70.900528,
    profitOnPlayerSales:0, assetSales:0, netInterest:1543.098828, tax:0,
    // extraRows: el documento separa "Resultados financieros y por tenencia (incl. RECPAM)" de
    // "Otros egresos (Nota 2.k)" como dos líneas distintas — se muestran así en la tabla, aunque
    // netInterest de arriba lleva el NETO de ambas ($1.543,098828 M ARS) para que el cálculo de
    // PAT/KPIs cierre.
    extraRows: [
      {label:'Resultados financieros y por tenencia (incl. RECPAM)', value:7264.060326},
      {label:'Otros egresos (Nota 2.k)', value:-5720.961498},
    ],
    // officialTotalExpenses = Total de Gastos Ordinarios IMPRESO (incluye los 3 ítems no-efectivo,
    // a diferencia de cur.expenses que solo suma wages+otherExpenses) — el chequeo en verifyTieOuts
    // compara contra Math.abs(expenses)+Math.abs(nonCash), no contra expenses solo. Todo en ARS
    // millones (Versión 32).
    officialTotalRevenue:207077.217738, officialTotalExpenses:149674.797729, officialPAT:58945.518837,
  },
};

// riverPresupuestoOverlayByYear (Versión 57): mismo mecanismo que racingPresupuestoOverlayByYear
// (ver data/racing-data.js), vacío hoy, para el día que aparezca un ejercicio de River con
// Presupuesto Y Balance reales cargados a la vez.
const riverPresupuestoOverlayByYear = {};

// ---------------------------------------------------------------------------
// Mercado de pases — placeholder, mismo estilo que los movimientos inventados
// que ya tenía Boca (Jugador A, Jugador B...) desde el primer MVP: esa
// sección nunca tuvo datos reales para ningún club todavía (pendiente
// Transfermarkt, ver finance-of-sports-project.md).
// ---------------------------------------------------------------------------
const riverPasesData = [
  { gestion:'brito', anio:2024, ventana:'Verano', tipo:'Jugador', nombre:'Jugador R1 (placeholder)', movimiento:'Venta', monto:16.0 },
  { gestion:'brito', anio:2024, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador R2 (placeholder)', movimiento:'Compra', monto:-11.0 },
  { gestion:'brito', anio:2023, ventana:'Verano', tipo:'DT', nombre:'DT entrante (Brito, placeholder)', movimiento:'Contratación', monto:0 },
  { gestion:'donofrio', anio:2021, ventana:'Verano', tipo:'Jugador', nombre:'Jugador R3 (placeholder)', movimiento:'Venta', monto:9.5 },
];

// ---------------------------------------------------------------------------
// Resultados deportivos — estos SÍ son reales (a diferencia de las finanzas):
// buscados y verificados vía web search en agosto de 2026 (ESPN, Infobae,
// La Nación, Wikipedia). Igual que con Boca, a cruzar contra el sitio
// oficial del club antes de publicar.
// ---------------------------------------------------------------------------
const riverResultadosData = {
  brito: { titulosLocales:2, titulosInternacionales:0, mejorResultadoLibertadores:'Semifinalista (2024)' },
  donofrio: { titulosLocales:5, titulosInternacionales:6, mejorResultadoLibertadores:'Campeón (2015 y 2018)' },
};

const riverTitulosData = [
  { anio:2014, competencia:'Copa Sudamericana', resultado:'Campeón', gestion:'donofrio' },
  { anio:2015, competencia:'Copa Libertadores', resultado:'Campeón', gestion:'donofrio' },
  { anio:2015, competencia:'Recopa Sudamericana', resultado:'Campeón', gestion:'donofrio' },
  { anio:2016, competencia:'Recopa Sudamericana', resultado:'Campeón', gestion:'donofrio' },
  { anio:2016, competencia:'Copa Argentina', resultado:'Campeón', gestion:'donofrio' },
  { anio:2017, competencia:'Copa Argentina', resultado:'Campeón', gestion:'donofrio' },
  { anio:2018, competencia:'Copa Libertadores', resultado:'Campeón', gestion:'donofrio' },
  { anio:2018, competencia:'Supercopa Argentina', resultado:'Campeón', gestion:'donofrio' },
  { anio:2019, competencia:'Recopa Sudamericana', resultado:'Campeón', gestion:'donofrio' },
  { anio:2019, competencia:'Supercopa Argentina', resultado:'Campeón', gestion:'donofrio' },
  { anio:2021, competencia:'Torneo Liga Profesional', resultado:'Campeón', gestion:'donofrio' },
  { anio:2023, competencia:'Trofeo de Campeones 2020 (jugado en feb-2023)', resultado:'Campeón', gestion:'brito' },
  { anio:2023, competencia:'Liga Profesional', resultado:'Campeón', gestion:'brito' },
];

// Versión 95: registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, la
// primera vez que se agrega este registro) — reemplaza los ternarios `clubId === 'river' ? ... :
// clubId === 'racing' ? ... : ...` que había que extender a mano en finanzas-calc.js/
// finanzas-render.js/index.html cada vez que se sumaba un club nuevo.
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.river = {
  revenueLinesByYear: riverRevenueLinesByYear, expenseLinesByYear: riverExpenseLinesByYear,
  fiscalYearMeta: riverFiscalYearMeta, pasesData: riverPasesData,
  resultadosData: riverResultadosData, titulosData: riverTitulosData,
  presupuestoOverlayByYear: riverPresupuestoOverlayByYear,
};


Object.assign(sources, {
  'river-estados-contables-2023-24': {
      id:'river-estados-contables-2023-24', clubId:'river',
      title:'Estados Contables (balance auditado), Ejercicio Económico N°123, 1°/9/2023 al 31/8/2024',
      type:'unofficial_mirror', reliability:'secondary_mirror',
      url:'https://turiver.s3.us-west-000.backblazeb2.com/original/4X/1/7/a/17ac4c09709f687d2249c3e21b8e7c5262b78116.pdf',
      publicNote:'El balance es real y trae informe de auditoría independiente, pero se consiguió en una réplica subida por la comunidad de hinchas tuRiver, no en el sitio oficial del club, que publica solo la Memoria narrativa sin estados contables.',
      note:'PDF de 67 páginas con informe de auditoría independiente real y sellos de legalización, pero conseguido en una réplica subida por la comunidad tuRiver (turiver.com), NO desde el dominio oficial de River (riverplate.com/cariverplate.com.ar solo exponen la "Memoria" narrativa sin estados contables — ver river-data.js para el detalle de este hallazgo). El contenido en sí tiene toda la apariencia de ser el documento real y auditado; lo que no está confirmado por canal primario es la vía de distribución. Copia local en finance-of-sports/Clubes/Argentina/River/estados-contables-leads/turiver-estados-contables.pdf. Transcripción completa en Clubes/Argentina/River/estados-contables-leads/river-estados-contables-2023-24.md. Convertido a USD con $950,50, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo V (Versión 32; antes se usaba $953,50, una cotización externa de Rava Bursátil/BCRA).',
    },
});

gestionesByClub.river = {
    // Versión 138: los ejercicios 2021 y 2025 de River eran placeholder puro (existían solo para
    // que "Comparar Gestiones" tuviera dos períodos que poner lado a lado) y se borraron. El único
    // ejercicio real de River es el 2024, y es de la gestión Brito, así que su rango es ese.
    // `donofrio` se queda sin ningún ejercicio, igual que ameal/angelici en Boca: sigue acá porque
    // Mercado de Pases y Resultados Deportivos agrupan por gestión y tienen filas suyas.
    brito:    { nombre:'Brito (2021-actual)',   firstYear:2024, lastYear:2024 },
    donofrio: { nombre:"D'Onofrio (2013-2021)", firstYear:2021, lastYear:2021 },
  };

memberCountByClub.river = null;


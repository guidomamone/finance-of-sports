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
// que uno externo, ver numeros-de-boca/.claude/skills/club-data-mapping/SKILL.md sección 5). La
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
  2025: [
    { rawLabel:'Cuotas sociales (placeholder, sin fuente)', normalizedCategory:'member_dues', amountNative:20, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos (placeholder, sin fuente)', normalizedCategory:'season_tickets', amountNative:15, disclosureLevel:'not_disclosed' },
    { rawLabel:'Partidos y competencias (placeholder, sin fuente)', normalizedCategory:'matchday_competition', amountNative:25, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comercial / sponsors (placeholder, sin fuente)', normalizedCategory:'sponsorship_commercial', amountNative:30, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros ingresos (placeholder, sin fuente)', normalizedCategory:'other_income', amountNative:5, disclosureLevel:'not_disclosed' },
  ],
  // 2021: último ejercicio de la gestión D'Onofrio, agregado solo para que "Comparar Gestiones"
  // tenga dos períodos de River para poner lado a lado. Placeholder igual que el de arriba.
  2021: [
    { rawLabel:'Cuotas sociales (placeholder, sin fuente)', normalizedCategory:'member_dues', amountNative:15, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos (placeholder, sin fuente)', normalizedCategory:'season_tickets', amountNative:8, disclosureLevel:'not_disclosed' },
    { rawLabel:'Partidos y competencias (placeholder, sin fuente)', normalizedCategory:'matchday_competition', amountNative:18, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comercial / sponsors (placeholder, sin fuente)', normalizedCategory:'sponsorship_commercial', amountNative:20, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros ingresos (placeholder, sin fuente)', normalizedCategory:'other_income', amountNative:4, disclosureLevel:'not_disclosed' },
  ],
};

const riverExpenseLinesByYear = {
  // ARS millones nativos (Versión 32). Fuente: Anexo VIII, pág. 59-62, fila "Totales al
  // 31/08/2024" por área + Estado de Recursos y Gastos (Depreciación/Amortización, pág. 11). Suma
  // exacta a $(149.674.797.729), el "Total gastos ordinarios" impreso.
  2024: [
    { rawLabel:'Fútbol profesional', normalizedCategory:'other_expenses', amountNative:-78835.612406, disclosureLevel:'detailed' },
    { rawLabel:'Educación', normalizedCategory:'other_expenses', amountNative:-4112.960939, disclosureLevel:'detailed' },
    { rawLabel:'Deportes', normalizedCategory:'other_expenses', amountNative:-5640.127149, disclosureLevel:'detailed' },
    { rawLabel:'Administración', normalizedCategory:'other_expenses', amountNative:-10887.796621, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento e intendencia', normalizedCategory:'other_expenses', amountNative:-7235.840776, disclosureLevel:'detailed' },
    { rawLabel:'Servicio médico y asistencial', normalizedCategory:'other_expenses', amountNative:-875.180363, disclosureLevel:'detailed' },
    { rawLabel:'Socios', normalizedCategory:'other_expenses', amountNative:-10595.940947, disclosureLevel:'detailed' },
    { rawLabel:'Museo', normalizedCategory:'other_expenses', amountNative:-1156.148838, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-5984.158778, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de plantel de jugadores de fútbol', normalizedCategory:'player_amortisation', amountNative:-23916.286868, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de software', normalizedCategory:'other_amortisation', amountNative:-434.744044, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Salarios del plantel (placeholder, sin fuente)', normalizedCategory:'wages_squad', amountNative:-45, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos (placeholder, sin fuente)', normalizedCategory:'other_expenses', amountNative:-30, disclosureLevel:'not_disclosed' },
    { rawLabel:'Amortización de pases (placeholder, sin fuente)', normalizedCategory:'player_amortisation', amountNative:-8, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciación (placeholder, sin fuente)', normalizedCategory:'depreciation', amountNative:-2, disclosureLevel:'not_disclosed' },
  ],
  2021: [
    { rawLabel:'Salarios del plantel (placeholder, sin fuente)', normalizedCategory:'wages_squad', amountNative:-32, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos (placeholder, sin fuente)', normalizedCategory:'other_expenses', amountNative:-22, disclosureLevel:'not_disclosed' },
    { rawLabel:'Amortización de pases (placeholder, sin fuente)', normalizedCategory:'player_amortisation', amountNative:-6, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciación (placeholder, sin fuente)', normalizedCategory:'depreciation', amountNative:-1, disclosureLevel:'not_disclosed' },
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
    currency:'ARS', fx:950.50,
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
    officialTotalRevenue:207077.217738, officialTotalExpenses:149674.797729,
  },
  2025: {
    currency:'USD', fx:null,
    sourceId:'river-placeholder',
    reportType:'placeholder',
    gestionId:'brito',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:null, officialTotalExpenses:null,
  },
  2021: {
    currency:'USD', fx:null,
    sourceId:'river-placeholder',
    reportType:'placeholder',
    gestionId:'donofrio',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:null, officialTotalExpenses:null,
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
// Transfermarkt, ver Proyecto Boca.md).
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

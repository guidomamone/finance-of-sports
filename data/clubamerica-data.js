// ============================================================================
// data/clubamerica-data.js — Club de Fútbol América (México). PRIMER CLUB NO ARGENTINO cargado con
// datos reales, y primer caso del sitio donde la fuente es un SEGMENTO de negocio dentro de una
// compañía bursátil más grande, no un balance del club en sí. Leer este comentario completo antes
// de tocar cualquier número de este archivo — la estructura de la fuente es genuinamente distinta a
// la de cualquier club cargado hasta ahora (Argentina: asociación civil con balance propio).
//
// ----------------------------------------------------------------------------------------------
// QUIÉN PUBLICA EL DATO Y POR QUÉ (contexto societario)
// ----------------------------------------------------------------------------------------------
// Club América dejó de ser una subsidiaria interna de Grupo Televisa el 31/01/2024: Televisa
// escindió ("spin-off") su negocio de fútbol + Estadio Azteca (rebautizado Estadio Banorte) +
// editoriales (Editorial Televisa) + juegos y sorteos (Play City) en una compañía nueva, Ollamani,
// S.A.B. de C.V., que cotiza en la Bolsa Mexicana de Valores (BMV) desde el 20/02/2024 bajo la clave
// AGUILAS. Al ser una Sociedad Anónima Bursátil regulada por la CNBV, Ollamani está obligada a
// publicar Estados Financieros Consolidados auditados bajo IFRS, trimestrales y anuales — de ahí
// sale el dato, NO de un balance propio de Club América (que como entidad deportiva dentro del
// grupo no publica sus propios estados financieros separados). Ver fuentes/México/Club América.md
// para el detalle completo de la investigación de sourcing.
//
// Fuente cargada: 'reporte-financiero-ollamani-2025-auditado.pdf' (Reporte Financiero BMV,
// Trimestre 4D-2024... trimestre 4D-2025, año terminado el 31/12/2025, 113 páginas, texto nativo
// extraíble con pdftotext, sin necesidad de OCR), en Clubes/México/Club América/. Transcripción de
// las páginas relevantes (Nota de Segmentos, Notas de Gastos financieros/tipo de cambio) en
// Clubes/México/Club América/segmento-futbol-2025.md.
//
// ----------------------------------------------------------------------------------------------
// LA ADVERTENCIA MÁS IMPORTANTE DE ESTE ARCHIVO: el "Segmento de Fútbol" NO es Club América solo
// ----------------------------------------------------------------------------------------------
// Ollamani reporta bajo IFRS 8 tres segmentos operativos reportables: (i) Fútbol, (ii) Juegos
// (Play City) y (iii) Editoriales y Distribuidoras. El segmento "Fútbol" se define textualmente en
// la Nota de Segmentos (pág. 108/113) como: "El segmento de Fútbol incluye las operaciones
// nacionales del Grupo en la promoción de eventos deportivos y espectáculos y el equipo de fútbol" —
// y en el cuerpo del MD&A (pág. 6/113): "El segmento de Fútbol de la Compañía incluye la promoción
// de espectáculos deportivos y eventos especiales en México, es propietaria del Club de Fútbol
// América, así como del Estadio Banorte." Es decir: el ingreso y la utilidad del segmento MEZCLAN
// Club América (varonil y femenil) CON el negocio del Estadio Banorte (conciertos, otros eventos,
// arrendamientos del inmueble) — no hay forma de separar cuánto de esos $2,795.6 M MXN es "el club"
// puro y cuánto es "el estadio como negocio de eventos". El propio MD&A dice que los ingresos del
// segmento "corresponden principalmente a ingresos por publicidad y patrocinios, así como ventas de
// taquilla y esquilmos" (pág. 6/113), en una sola frase cualitativa, SIN desglose en pesos entre
// esos conceptos. Se cargó igual, con este disclaimer explícito acá y en el rawLabel de la propia
// línea (visible en "Estado de resultados" sin tener que abrir ningún acordeón), porque es lo que
// el documento realmente publica y es preferible a no cargar nada — mismo espíritu que el proyecto
// ya usa para Brasil (SAF vs. associação: dos entidades legales distintas mezcladas en la prensa) o
// para "lump_football_operations" en Racing/River (un bolsón real sin desglosar, documentado como
// tal, no forzado a partirse en categorías inventadas).
//
// ----------------------------------------------------------------------------------------------
// NO HAY BALANCE POR SEGMENTO: grossDebt/cash quedan en 0, documentado, NO "deuda cero"
// ----------------------------------------------------------------------------------------------
// El Grupo SÍ desglosa "Activos por segmento" ($9,863,633 miles = $9,863.633 M MXN, Fútbol, 2025) y
// "Pasivos por segmento" ($3,013,763 miles = $3,013.763 M MXN, Fútbol, 2025) en la misma Nota de
// Segmentos — pero eso es el TOTAL de activos/pasivos del segmento (incluye cuentas por cobrar/
// pagar, arrendamientos, provisiones, todo lo que el segmento tiene y debe), no una cifra de "deuda
// financiera" separada de "caja" como necesita este sitio (grossDebt/cash, ver el criterio ya usado
// para Boca/River/Racing: grossDebt es deuda financiera pura, no todo el pasivo). La única cifra de
// deuda financiera que el reporte SÍ desglosa (Deuda a largo plazo $1,672.0 M + pasivos por
// arrendamiento $1,059.5 M, pág. 10/113) es CONSOLIDADA, de los 3 segmentos juntos, sin split por
// segmento — no se puede atribuir a Fútbol sin inventar un criterio de reparto que el documento no
// da. Por eso grossDebt:0, cash:0 acá, con el mismo mecanismo genérico que ya usa el sitio
// (debtDisclosureNote() en js/finanzas-calc.js, activado automáticamente por reportType oficial +
// grossDebt=cash=0): el sitio ya avisa solo que es un "dato no disponible", no "deuda cero real". No
// se agregó ningún código nuevo para esto, es el mecanismo existente funcionando como con cualquier
// otro club/ejercicio sin balance patrimonial.
//
// ----------------------------------------------------------------------------------------------
// "UTILIDAD DEL SEGMENTO" NO ES "RESULTADO NETO" — por eso officialPAT queda en null
// ----------------------------------------------------------------------------------------------
// La Nota de Segmentos SÍ imprime una "(Pérdida) utilidad por segmento" para Fútbol: $43,911 miles
// ($43.911 M MXN) para el año terminado el 31/12/2025. PERO la propia nota lo define en su pie de
// página (2): "Utilidad de los segmentos operativos se define como la utilidad de operación ANTES
// DE depreciación y amortización y otros ingresos o gastos, neto" (pág. 108-109/113) — es decir, es
// un resultado operativo ANTES de D&A y antes de "otros ingresos/gastos", conceptualmente más
// parecido a un EBITDA segmentado que a un "Resultado neto" (PAT) real. Ollamani NO desglosa D&A,
// resultado financiero (intereses/tipo de cambio) ni impuestos por segmento — a nivel consolidado
// D&A fue -$820,345 miles y hubo pérdida de operación consolidada de -$288,225 miles en 2025 (Nota
// de Segmentos, pág. 108/113), así que es enteramente posible (de hecho, probable si D&A se
// repartiera proporcional) que el resultado FINAL del segmento Fútbol, después de D&A/financieros/
// impuestos, sea negativo, aunque su utilidad operativa pre-D&A haya sido positiva. Por eso
// `officialPAT` queda en `null` acá: cargar $43.911 M como si fuera "Resultado neto" (el label fijo
// que usa el motor genérico para cualquier club, ver `resultLabel:'Resultado neto'` en
// js/finanzas-calc.js, que este archivo NO edita) sería presentar una utilidad operativa pre-D&A
// como si fuera la línea de fondo del club, exactamente el tipo de imprecisión que este sitio existe
// para evitar ("Precisión antes que velocidad", CLAUDE.md). El monto SÍ se carga (ver
// expenseLinesByYear más abajo, como un gasto único derivado por diferencia) porque no cargarlo
// dejaría "Gastos: 0" y "Resultado neto: +2,795.6 M" (el revenue entero como si fuera ganancia neta),
// que sería un error mucho peor y más engañoso — pero el número que el sitio va a mostrar como
// "Resultado neto" para este ejercicio hay que leerlo, en la práctica, como la utilidad operativa
// del segmento antes de D&A/financieros/impuestos, NO como una utilidad neta después de impuestos.
// `officialTotalExpenses` (2,751.732 M) SÍ se carga porque es una identidad aritmética exacta y
// verificable a partir de dos cifras impresas (Ingresos − Utilidad de segmento), no una
// aproximación: sirve para confirmar que la línea de gasto de acá no tiene un error de tipeo, no
// para afirmar que el documento imprime una cifra de "Gastos" con ese nombre.
//
// ----------------------------------------------------------------------------------------------
// TIPO DE CAMBIO: el documento declara DOS cifras de cierre distintas para el 31/12/2025, se
// documenta la discrepancia y se usa la de la Nota a los estados financieros (más autorizada)
// ----------------------------------------------------------------------------------------------
// Sección MD&A (pág. 7/113, comentario de "Gastos financieros, neto"): "El tipo de cambio del peso
// frente al dólar estadounidense fue de $18.0012 y $20.7862 al 31 de diciembre de 2025 y 2024,
// respectivamente."
// Nota a los estados financieros auditados (pág. 104/113, footnote (3) de "Gastos financieros,
// neto" dentro del cuerpo de EEFF): "El tipo de cambio del peso frente al dólar estadounidense fue
// de $17.9528 y $20.8691 al 31 de diciembre de 2025 y 2024, respectivamente."
// Diferencia real: $18.0012 vs. $17.9528 (~0,27%) para 2025; $20.7862 vs. $20.8691 (~0,4%) para
// 2024. No se encontró una 3ra cifra que reconcilie las dos, ni una nota que aclare por qué el
// mismo reporte trae dos valores para "el mismo tipo de cambio de cierre". Se usó $17.9528 (la cifra
// que vive DENTRO de la Nota a los estados financieros auditados, la misma sección donde está la
// Nota de Segmentos usada para revenue/utilidad, en vez de la cifra de la sección MD&A/narrativa que
// antecede a los EEFF) por ser la más cercana, en jerarquía documental, a los números que se están
// cargando. Diferencia inmaterial para el toggle de moneda de este sitio, documentada acá en vez de
// promediada o descartada en silencio (ver dudas-por-club.md si Guido quiere consultarle a Ollamani
// investor relations cuál es la cifra "oficial").
//
// ----------------------------------------------------------------------------------------------
// ALCANCE DE ESTA CARGA: SOLO el Ejercicio 2025 (año calendario completo, 1/1/2025-31/12/2025)
// ----------------------------------------------------------------------------------------------
// El PDF de 2024 ('reporte-financiero-ollamani-2024-auditado.pdf', también en Clubes/México/Club
// América/) cubre el período inicial de la compañía (1/2/2024 al 31/12/2024, 11 meses, no un año
// completo — el spin-off ocurrió el 31/01/2024), por eso se decidió NO cargarlo en esta sesión (ver
// fuentes/México/Club América.md): un ejercicio de 11 meses no es directamente comparable a uno de
// 12, y esta carga se limitó a pedido explícito a "el ejercicio más reciente y completo". Queda
// pendiente para una sesión futura si se quiere sumar como 2do punto de la serie histórica.
//
// Ollamani no tiene el concepto de "gestión"/presidente de comisión directiva que sí tienen los
// clubes argentinos (es una sociedad anónima bursátil, no una asociación civil con elecciones). Se
// creó una única entrada sintética en gestionesByClub (ver más abajo) para no romper las funciones
// genéricas del sitio que asumen que todo club tiene al menos una gestión (populateFinanzasSelectors/
// populateResultadosSelector/populateCompararSelectors, en index.html/js/finanzas-render.js, leen
// `Object.keys(gestionesByClub[clubId])` sin chequeo defensivo) — "Comparar Gestiones" para este club
// hoy compara el único ejercicio cargado contra sí mismo, sin sentido práctico hasta que se cargue un
// 2do ejercicio real, documentado acá para que no sorprenda a la próxima sesión.
//
// LIMITACIÓN ENCONTRADA EN LA VERIFICACIÓN DEL NAVEGADOR (Versión 107), NO corregida a propósito
// (fuera de alcance: requeriría tocar js/finanzas-calc.js, que esta sesión tenía prohibido tocar):
// `ejercicioLabel(year, reportType)` (js/finanzas-calc.js) arma SIEMPRE el label como
// `(year-1)+'/'+year` (ej. "Balance 2024/2025" para year=2025), asumiendo que TODO club tiene
// ejercicio partido a mitad de año calendario, como los clubes argentinos. Club América/Ollamani
// reporta en año CALENDARIO completo (1/1 a 31/12), así que el dropdown "Año" y el header de "Estado
// de resultados" muestran "2024/2025" para el Ejercicio 2025, un rango que no es real (el ejercicio
// es 100% 2025, no a caballo entre 2024 y 2025) — puede confundir a un visitante que no sepa que
// Ollamani reporta distinto. Es una limitación estructural del motor genérico (afecta a CUALQUIER
// club de año calendario futuro, no solo a este), documentada acá y en el to-do de `index.html` en
// vez de forzada una corrección fuera del alcance de esta sesión.
// ============================================================================

const clubamericaRevenueLinesByYear = {
  // Año terminado el 31/12/2025. Fuente: Nota de Segmentos, tabla "Año terminado el 31 de diciembre
  // de 2025", fila "Fútbol", columna "Ingresos Totales" ($2,795,643 miles de pesos), pág. 108/113.
  // Cruzado exacto contra la tabla "Desagregación de ingresos totales" de la misma nota (pág.
  // 109/113): "Eventos de fútbol y promoción de espectáculos" = $2,726,632 (nacional) + $69,011
  // (exportación) = $2,795,643 total — coincide exacto con la fila de segmento, confirma que no hay
  // error de transcripción. Categoría lump_football_operations: es un bolsón real, el documento no
  // desglosa este ingreso por concepto (TV/entradas/sponsors/etc.) a nivel Fútbol, solo por
  // nacional/exportación (geografía, no tipo de ingreso).
  2025: [
    { rawLabel:'Ingresos del Segmento de Fútbol (incluye Estadio Banorte; Ollamani no desglosa Club América por separado, ver comentario de cabecera de este archivo)', normalizedCategory:'lump_football_operations', amountNative:2795.643, disclosureLevel:'detailed' },
  ],
};

const clubamericaExpenseLinesByYear = {
  // Línea ÚNICA, DERIVADA por diferencia (no es una cifra que el documento imprima con este nombre):
  // Ingresos del segmento ($2,795.643 M) − Utilidad de los segmentos operativos, Fútbol ($43.911 M,
  // pág. 108/113) = $2,751.732 M. Ollamani no desglosa costos/gastos por segmento en ningún lado del
  // reporte (solo Ingresos y Utilidad de segmento, ver Nota de Segmentos completa), así que esta es
  // la ÚNICA forma de que "Estado de resultados" muestre algo distinto de "Gastos: 0" para este
  // ejercicio. OJO — la "Utilidad de los segmentos operativos" que esto reconcilia es, por definición
  // propia del documento (footnote 2 de esa tabla), ANTES de depreciación y amortización y "otros
  // ingresos o gastos, neto": esta línea de gasto NO incluye D&A ni financieros ni impuestos del
  // segmento (Ollamani no los desglosa por segmento), así que el "Resultado neto" que el motor
  // genérico del sitio va a calcular a partir de esta línea (Ingresos + esta línea, sin más ajustes)
  // es en realidad la utilidad operativa pre-D&A del segmento, NO un resultado neto después de
  // impuestos — ver el comentario largo de "UTILIDAD DEL SEGMENTO NO ES RESULTADO NETO" al principio
  // de este archivo antes de citar este número como si fuera la ganancia/pérdida final del club.
  2025: [
    { rawLabel:'Costos y gastos del Segmento de Fútbol (cifra IMPLÍCITA: Ingresos del segmento menos Utilidad operativa del segmento antes de D&A informada por Ollamani; el documento no desglosa costos por rubro a nivel segmento)', normalizedCategory:'lump_football_operations_expense', amountNative:-2751.732, disclosureLevel:'detailed' },
  ],
};

const clubamericaFiscalYearMeta = {
  2025: {
    currency:'MXN',
    // Tipo de cambio de cierre al 31/12/2025 que declara la Nota a los estados financieros
    // auditados (pág. 104/113, footnote 3 de "Gastos financieros, neto") — ver comentario largo de
    // cabecera sobre la discrepancia con la cifra de la sección MD&A ($18.0012).
    fx:17.9528, fxSource:'document_close',
    sourceId:'clubamerica-ollamani-2025',
    reportType:'official_balance_sheet',
    // Sin gestión real asignable (ver comentario de cabecera): entrada sintética 'ollamani', no un
    // presidente/gestión tradicional.
    gestionId:'ollamani',
    // No hay deuda financiera ni caja desglosadas a nivel de segmento (solo activos/pasivos TOTALES
    // por segmento, y deuda financiera solo a nivel consolidado, sin split) — ver comentario de
    // cabecera "NO HAY BALANCE POR SEGMENTO". debtDisclosureNote() (js/finanzas-calc.js) ya avisa
    // solo que este 0/0 es "no disponible", no deuda cero real, mismo mecanismo que cualquier otro
    // club/ejercicio sin balance patrimonial propio.
    grossDebt:0, cash:0,
    profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:2795.643,
    // Identidad aritmética exacta (Ingresos − Utilidad de segmento), no una cifra que el documento
    // imprima con el nombre "Gastos" — ver comentario de la línea de expenseLines de arriba.
    officialTotalExpenses:2751.732,
    // Deliberadamente null: la "Utilidad de los segmentos operativos" del documento ($43.911 M) es,
    // por definición propia de la fuente, ANTES de D&A y de "otros ingresos o gastos, neto" — no es
    // comparable a "Resultado neto (PAT)" tal como lo define el resto del sitio (después de todo
    // ajuste no-operativo). Cargarla acá haría que verifyTieOuts() la valide como si fuera un PAT
    // real. Ver comentario largo "UTILIDAD DEL SEGMENTO NO ES RESULTADO NETO" al principio de este
    // archivo.
    officialPAT:null,
  },
};

// Sin ejercicios con Presupuesto Y Balance reales a la vez todavía (un solo ejercicio cargado en
// total) — vacío, mismo criterio que cualquier club nuevo sin overlay propio (ver river-data.js).
const clubamericaPresupuestoOverlayByYear = {};

// Sin datos reales de mercado de pases para este club todavía (fuera del alcance de esta carga,
// que fue puramente financiera) — vacío en vez de inventar movimientos placeholder, ver
// pasesDataForClub()/applyPasesFilters() en index.html/js/finanzas-render.js, que ya manejan un
// array vacío sin romper (0 en todos los stats, tabla vacía).
const clubamericaPasesData = [];

// Sin resultados deportivos ni títulos investigados en esta sesión (alcance de esta carga: solo
// datos financieros del Segmento de Fútbol) — vacío, mismo criterio que pasesData de arriba.
// renderResultados()/renderTitulosTable() (js/finanzas-render.js) ya manejan un dataset vacío sin
// romper (la pestaña Resultados queda sin números para este club hasta que se cargue ese dato en una
// sesión futura).
const clubamericaResultadosData = {};
const clubamericaTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.clubamerica = {
  revenueLinesByYear: clubamericaRevenueLinesByYear, expenseLinesByYear: clubamericaExpenseLinesByYear,
  fiscalYearMeta: clubamericaFiscalYearMeta, pasesData: clubamericaPasesData,
  resultadosData: clubamericaResultadosData, titulosData: clubamericaTitulosData,
  presupuestoOverlayByYear: clubamericaPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'clubamerica-ollamani-2025': {
      id:'clubamerica-ollamani-2025', clubId:'clubamerica',
      title:'Ollamani, S.A.B. de C.V. — Reporte Financiero BMV (Trimestre 4D, Año 2025), Nota de Segmentos ("Segmento de Fútbol")',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://ollamani.com.mx/reportes-3/',
      note:'PDF oficial de 113 páginas (texto nativo), Estados Financieros Consolidados auditados bajo IFRS del año terminado el 31/12/2025, presentados ante la Bolsa Mexicana de Valores (BMV, clave AGUILAS) y espejados en bmv.com.mx y gob.mx/cnbv. Club América NO publica balance propio: Ollamani es la controladora pública (post spin-off de Grupo Televisa, 31/01/2024) y reporta un "Segmento de Fútbol" bajo IFRS 8 que agrupa Club América (varonil y femenil) CON el Estadio Banorte — ver comentario de cabecera de data/clubamerica-data.js para el detalle completo de este límite y de por qué grossDebt/cash/officialPAT quedan en 0/0/null. Copia local en finance-of-sports/Clubes/México/Club América/reporte-financiero-ollamani-2025-auditado.pdf.',
    },
});

// Sin gestión/presidencia tradicional (sociedad anónima bursátil, no asociación civil) — entrada
// sintética única para que las funciones genéricas del sitio (que asumen ≥1 gestión por club) no
// rompan. Ver comentario de cabecera de este archivo.
gestionesByClub.clubamerica = {
  ollamani: { nombre:'Ollamani, S.A.B. (post-escisión de Televisa, 2024-actual)', firstYear:2025, lastYear:2025 },
};

// Sin cifra de socios/membresía citable encontrada (Club América es de propiedad corporativa, no
// tiene un padrón de socios tradicional al estilo de los clubes argentinos de este sitio).
memberCountByClub.clubamerica = null;

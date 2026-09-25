// ============================================================================
// data/deportivopereira-co-data.js — Deportivo Pereira F.C. S.A. (Pereira,
// Colombia). Cuarto club colombiano cargado en finance-of-sports. Un único
// ejercicio cargado a propósito: 2025.
//
// CONTEXTO: al 22/1/2026 la Superintendencia de Sociedades ordenó DE OFICIO el
// inicio de un proceso de reorganización empresarial (Auto 2026-01-023551) por
// cesación de pagos de $11.252 M (50,4% del pasivo), verificada al 31/8/2025 —
// el ejercicio 2025 cargado acá es exactamente el que sustenta esa decisión. El
// dictamen del revisor fiscal (`dictamen-revisor-fiscal-2025.md`) confirma una
// "Incertidumbre material relacionada con negocio en marcha" (sin modificar su
// opinión) y el proceso de reorganización radicado el 25/11/2025. Ver
// fuentes/Colombia/Deportivo Pereira.md.
//
// FUENTE PRINCIPAL: `Clubes/Colombia/Deportivo Pereira/estados-financieros-2025.md`
// (33 páginas, "Revelaciones Estados Financieros de Propósito General bajo NIIF
// para PYME's al 31 de diciembre de 2025", vía SIIS, NIT 901644853). El PDF
// TIENE capa de texto nativa (`pdftotext -layout` funciona para todo el texto
// narrativo), PERO cada tabla de cifras del documento está insertada como
// IMAGEN (captura de Excel), no como texto — la transcripción .md quedó con
// esas tablas en blanco. Los números de este archivo se leyeron directo del PDF
// renderizando esas páginas puntuales a PNG (300dpi) y leyéndolas con el Read
// tool, NO de la transcripción .md (que solo sirve para el texto narrativo de
// cada nota). `certificacion-ef-2025.md` (carátula, sin cifras) y
// `dictamen-revisor-fiscal-2025.md` (dictamen del revisor fiscal, confirma la
// incertidumbre de negocio en marcha) son de contexto.
//
// ESCALA: el documento está en PESOS COMPLETOS (no miles) — confirmado por el
// propio "Resultado del periodo" impreso, $5.908.561.384, que solo tiene
// magnitud de club real en pesos completos (en miles sería 5,9 billones,
// imposible). Se guarda dividido por 1.000.000, en millones de COP, mismo
// criterio que Envigado.
//
// FX: el documento NO declara un tipo de cambio de cierre propio (se buscó
// explícitamente "tasa de cambio"/"TRM" en los 3 PDF de este club — ausente,
// a diferencia de Millonarios). Se usa la TRM oficial de cierre al 31/12/2025
// ya cargada en FX_CLOSE (`COP@2025-12-31` = 3.757,08), vía fxRef.
//
// REVENUE: Nota 3.18 "Ingresos de actividades ordinarias" (22 líneas, tabla en
// imagen pág. 28-29 del PDF, suma EXACTA $20.659.304.256, el total impreso) +
// Nota 3.19 "Otros ingresos de actividades ordinarias" (tabla en imagen pág. 29
// del PDF) MENOS su línea "Diferencia en cambio" ($284.862, reclasificada a
// netInterest per club-data-mapping sección 2 — es la única línea de la Nota
// 3.19 que es inequívocamente un resultado financiero y no está mezclada con
// nada más, a diferencia de "Gastos financieros" del lado de Gastos, ver
// abajo). officialTotalRevenue = 20.659,304256 + 5.498,103371 = 26.157,407627 M.
//
// CAVEAT IMPORTANTE — "Ingreso por actualización derecho de (DIMAYOR)"
// ($4.428.430.000, el 17% de TODO el revenue del ejercicio, dentro de la Nota
// 3.19): NO es un ingreso operativo real (taquilla, sponsors, TV) sino la
// REVALUACIÓN ESTATUTARIA del activo intangible "derecho a pertenecer a la
// DIMAYOR", que la Nota 3.7 explica se actualiza según los estatutos de la
// DIMAYOR por un monto equivalente a 10.000 SMLV — una revaluación contable
// formulaica, sin entrada de caja. Se cargó igual como `other_income` (omitirla
// habría roto la reconciliación exacta contra el "Resultado del periodo"
// impreso, que si la incluye), pero es una pregunta genuina para
// Admin/dudas-por-club.md: ¿tiene sentido mostrar esto en la misma fila que
// taquilla/sponsors, o merece su propia categoría de "revaluación no-cash"?
//
// EXPENSES: Nota 3.20 "Gastos administrativos" ($3.458,523458 M, tabla imagen
// pág. 29-30) + Nota 3.21 "Gastos de ventas" ($26.866,661018 M, tabla imagen
// pág. 30-32 — el costo de sostener la planta de jugadores/cuerpo técnico) +
// Nota 3.22 "Otros gastos" ($1.741,069398 M, tabla imagen pág. 32). Categorías
// asignadas DENTRO de "Gastos de ventas" según lo que cada sub-línea describe
// en el propio texto de la nota (pág. 31 del .md/PDF): "Impuestos" ahí es
// explícitamente el impuesto a los espectáculos públicos POR PARTIDO (no un
// impuesto administrativo genérico, por eso NO sigue el default de
// club-data-mapping sección 17 y va a `match_organisation_expense`, no
// `admin_general_expense` — el propio documento lo liga a "poder disputar cada
// partido"), igual que Arrendamientos (alquiler del Estadio), Honorarios
// (arbitrajes + médicos), Afiliaciones (bus del equipo, inscripciones a
// divisiones menores), Seguros y Servicios (energía/agua/logística/ambulancia
// del Estadio) y los sub-ítems de "Diversos" ligados a la operación del equipo
// (combustibles, casino/restaurante, taxis). officialTotalExpenses = 3.458,523
// + 26.866,661 + 1.741,069 = 32.066,253874 M.
//
// CAVEAT — "Trayectoria deportiva" ($2.854.789520 M dentro de "Diversos" de
// Gastos de ventas, ~11% del gasto total): per Nota 3.21, es "el gasto que se
// incurre PREVIO A LA CONTRATACIÓN de jugadores y cuerpos técnicos, cuyos
// recorridos futbolísticos han sido notables" — un bono/pago ligado al prestigio
// del jugador/DT al momento de ficharlo, pagado en cuotas a cada uno por nombre
// (aparece también como activo pagado por anticipado, Nota 3.8, y como pasivo
// no corriente "Pasivos financieros cuentas por pagar trayectoria deportiva",
// Nota 3.16, con nombres — Rafael Edgar Dudamel Ochoa, exdirector técnico, entre
// ellos). Se cargó a `wages_squad` (es compensación a personas físicas
// vinculadas al club, no una transferencia a otro club), pero es una
// clasificación con incertidumbre genuina — bien podría ser más parecido a
// `player_amortisation` si se entiende como costo de fichaje. Anotado en
// Admin/dudas-por-club.md.
//
// "Gastos financieros" (Nota 3.22, $852,554333 M, ~2,7% del gasto total):
// mezcla GMF (impuesto a movimientos financieros), comisiones bancarias Y
// diferencia en cambio SIN discriminar cuánto es cada una — a diferencia de la
// línea aislada de la Nota 3.19, acá no se puede separar el componente
// cambiario. Se dejó completa en `admin_general_expense`, mismo criterio que
// Banfield con su Anexo VII (línea mixta, tamaño marginal, ~2,7% del total) —
// ver club-data-mapping SKILL.md sección 5.
//
// netInterest = SOLO la "Diferencia en cambio" aislada de la Nota 3.19
// (+$0,284862 M) — ver caveat de "Gastos financieros" arriba (esa pieza sigue
// en admin_general_expense, no se pudo separar).
//
// tax: el documento NO reporta una línea de impuesto a las ganancias separada
// (a diferencia de Millonarios) — el único resultado impreso, "Resultado del
// periodo (PÉRDIDA) $5.908.561.384... ANTES DE IMPUESTOS" (Nota 3.23, pág. 33),
// reconcilia EXACTO contra revenue − expenses + netInterest sin ningún ajuste
// de impuesto adicional (ver verificación abajo) — consistente con que una
// compañía con pérdida fiscal y en cesación de pagos no genera impuesto de
// renta corriente ese ejercicio. tax = 0.
//
// VERIFICACIÓN (node, antes de cargar): revenue (26.157,407627) − expenses
// (32.066,253874) + netInterest (0,284862) + tax (0) = −5.908,561385 M, EXACTO
// (diferencia de $1 peso, redondeo) igual al "Resultado del periodo" impreso,
// −5.908,561384 M. Reconciliación exacta pese a que el documento NO trae ningún
// Estado de Resultado Integral primario ni desglose de impuesto — un solo
// número de resultado, sin cifras contradictorias entre sí (no aplica la
// alerta de "más de una cifra de resultado neto" de Deportes Tolima).
//
// grossDebt = Nota 3.9 "Pasivos Financieros" corrientes ($3.300,431201 M:
// Gestores de Contenido, LC Proyectos y Construcciones, Scotiabank Colpatria
// Dimayor) + Nota 3.16 "Pasivos financieros no corrientes" ($7.970,935634 M:
// Trayectoria deportiva por pagar + "Deudas con socios", $7.607,132557 M
// adeudados al accionista Inversiones López Ltda. por aportes para sostener la
// operación del club — el propio documento los clasifica como pasivo
// financiero, no como aporte de capital, así que se incluyen) = 11.271,366835 M
// — del mismo orden de magnitud que los $11.252 M de cesación de pagos citados
// en el Auto de reorganización de oficio (dato de cruce, no del mismo campo
// exacto). cash = Nota 3.1 "Efectivo y equivalente del efectivo", Total 2025 =
// $9,656770 M (de los cuales $8,586425 M de "efectivo de uso restringido" por
// el embargo de la DIAN sobre las cuentas del club, ver Nota 3.1).
// ============================================================================

const deportivopereiraCoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Comercio al por mayor y al detal', normalizedCategory:'sponsorship_commercial', amountNative:0.955336, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:5645.558637, disclosureLevel:'detailed' },
    { rawLabel:'Taquillas', normalizedCategory:'matchday_competition', amountNative:5715.718653, disclosureLevel:'detailed' },
    // "Regalías": no se pudo confirmar si es royalty comercial (marca/merchandising) o de otro
    // tipo — el mecanismo de solidaridad por pases ya tiene su propia línea separada abajo, así
    // que esto es algo distinto. Categorizado como comercial por descarte; duda genuina anotada.
    { rawLabel:'Regalías', normalizedCategory:'sponsorship_commercial', amountNative:573.459243, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de TV', normalizedCategory:'broadcasting', amountNative:6192.158245, disclosureLevel:'detailed' },
    { rawLabel:'Escuelas de formación', normalizedCategory:'youth_football', amountNative:819.645000, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidaridad', normalizedCategory:'player_sales', amountNative:12.295209, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio arbitraje (DIMAYOR)', normalizedCategory:'competition_bonus', amountNative:294.254251, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio hotelero (DIMAYOR)', normalizedCategory:'competition_bonus', amountNative:659.547071, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio tiquetes (DIMAYOR)', normalizedCategory:'competition_bonus', amountNative:16.404080, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio transporte terrestre (DIMAYOR)', normalizedCategory:'competition_bonus', amountNative:26.544000, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio logístico (DIMAYOR)', normalizedCategory:'competition_bonus', amountNative:175.560000, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio fondo equipos no clasificados (DIMAYOR)', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio divisiones menores (DIMAYOR)', normalizedCategory:'youth_football', amountNative:40.815000, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio infraestructura', normalizedCategory:'other_income', amountNative:144.000000, disclosureLevel:'detailed' },
    { rawLabel:'Videos oficiales', normalizedCategory:'broadcasting', amountNative:175.154550, disclosureLevel:'detailed' },
    { rawLabel:'Fomento al deporte', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Premios', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Otros academia', normalizedCategory:'youth_football', amountNative:158.212311, disclosureLevel:'detailed' },
    { rawLabel:'Venta y préstamo jugadores', normalizedCategory:'player_sales', amountNative:1649.953140, disclosureLevel:'detailed' },
    { rawLabel:'Devoluciones en ventas y servicios', normalizedCategory:'other_income', amountNative:-1640.930470, disclosureLevel:'detailed' },
    // Nota 3.19 "Otros ingresos de actividades ordinarias" (MENOS su línea "Diferencia en cambio",
    // reclasificada a netInterest — ver comentario de cabecera):
    { rawLabel:'Descuentos comerciales', normalizedCategory:'other_income', amountNative:0.694380, disclosureLevel:'detailed' },
    { rawLabel:'Reintegro de costos y gastos', normalizedCategory:'other_income', amountNative:1045.200787, disclosureLevel:'detailed' },
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_income', amountNative:0.093946, disclosureLevel:'detailed' },
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:23.684258, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por actualización derecho DIMAYOR (revaluación estatutaria, no-cash — ver caveat en cabecera)', normalizedCategory:'other_income', amountNative:4428.430000, disclosureLevel:'detailed' },
  ],
};

const deportivopereiraCoExpenseLinesByYear = {
  2025: [
    // Nota 3.20 "Gastos administrativos" ($3.458,523458 M impreso):
    { rawLabel:'Gastos administrativos', normalizedCategory:'admin_general_expense', amountNative:-3458.523458, disclosureLevel:'detailed', items:[
      ['Personal', -2947.384496], ['Honorarios', -113.034960], ['Impuestos', -13.070317], ['Arrendamientos', -35.680676], ['Afiliaciones y sostenimiento', -0.445142], ['Seguros', -2.734597], ['Servicios', -164.886820], ['Gastos legales', -13.537100], ['Mantenimiento', -15.802880], ['Adecuaciones e instalaciones', -0.793969], ['Gastos de viaje', -134.140319], ['Diversos', -17.012181],
    ]},
    // Nota 3.21 "Gastos de ventas" ($26.866,661018 M impreso) — costo de la planta deportiva.
    { rawLabel:'Gastos de personal (planta deportiva: jugadores, cuerpo técnico y médico)', normalizedCategory:'wages_squad', amountNative:-16652.322362, disclosureLevel:'detailed' },
    // Ver caveat en cabecera sobre esta línea puntual.
    { rawLabel:'Trayectoria deportiva (bonos de fichaje ligados al prestigio del jugador/DT — ver caveat en cabecera)', normalizedCategory:'wages_squad', amountNative:-2854.789520, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de ventas: organización de partidos (arbitrajes/médicos, impuesto a espectáculos, estadio, afiliaciones, seguros, servicios del estadio, mantenimiento, viajes, combustibles, casino/restaurante)', normalizedCategory:'match_organisation_expense', amountNative:-6561.425695, disclosureLevel:'detailed', items:[
      ['Honorarios (arbitrajes y médicos especialistas)', -710.552350],
      ['Impuestos (impuesto a los espectáculos públicos por partido)', -1240.971491],
      ['Arrendamientos (alquiler del Estadio)', -818.835368],
      ['Afiliaciones y sostenimiento (bus del equipo, divisiones menores)', -48.022449],
      ['Seguros', -111.304112],
      ['Servicios (energía, agua, logística, ambulancia, bomberos del Estadio)', -1830.519181],
      ['Mantenimiento', -7.398840],
      ['Gastos de viaje', -1471.952978],
      ['Combustibles y lubricantes', -29.901119],
      ['Taxis y buses', -0.027000],
      ['Casino restaurante', -291.001507],
      ['Útiles, papelería y fotocopias', -0.939300],
    ]},
    { rawLabel:'Gastos de ventas: gastos legales', normalizedCategory:'admin_general_expense', amountNative:-3.062535, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de ventas: otros diversos', normalizedCategory:'other_expenses', amountNative:-795.060905, disclosureLevel:'detailed' },
    // Nota 3.22 "Otros gastos" ($1.741,069398 M impreso).
    { rawLabel:'Gastos financieros (GMF, comisiones bancarias y diferencia en cambio sin discriminar — ver caveat en cabecera)', normalizedCategory:'admin_general_expense', amountNative:-852.554333, disclosureLevel:'detailed' },
    { rawLabel:'Gastos extraordinarios (costos y gastos de ejercicios anteriores, impuestos asumidos)', normalizedCategory:'exceptional_items', amountNative:-50.042287, disclosureLevel:'detailed' },
    { rawLabel:'Gastos diversos (no deducibles fiscalmente, incl. multas y sanciones)', normalizedCategory:'other_expenses', amountNative:-838.472778, disclosureLevel:'detailed' },
  ],
};

const deportivopereiraCoFiscalYearMeta = {
  2025: {
    // El documento no declara TC de cierre propio (se buscó explícitamente, ausente en los 3
    // PDF de este club) — TRM oficial de cierre al 31/12/2025 (FX_CLOSE).
    currency:'COP', fxRef:'COP@2025-12-31', fxSource:'market_close',
    sourceId:'deportivopereira-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Solo la "Diferencia en cambio" aislada de la Nota 3.19 (ver caveat de cabecera sobre
    // "Gastos financieros", que sigue mezclado en admin_general_expense).
    netInterest:0.284862,
    // El documento no reporta impuesto a las ganancias por separado — el "Resultado del periodo"
    // impreso ya reconcilia exacto sin ajuste de impuesto adicional (ver verificación en cabecera).
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:11271.366835, cash:9.656770,
    // officialTotalExpenses EXCLUYE "Gastos extraordinarios (costos y gastos de ejercicios
    // anteriores, impuestos asumidos)" (-50,042287, exceptional_items) — mismo criterio que
    // Botafogo/Atlético Mineiro: verifyTieOuts()/tools/audit.js comparan "Expenses" contra gasto
    // ordinario + no-efectivo solamente. 32066,253874 (impreso, incluye el extraordinario) -
    // 50,042287 = 32016,211587.
    officialTotalRevenue:26157.407627, officialTotalExpenses:32016.211587, officialPAT:-5908.561384,
  },
};

const deportivopereiraCoPresupuestoOverlayByYear = {};
const deportivopereiraCoPasesData = [];
const deportivopereiraCoResultadosData = {};
const deportivopereiraCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['deportivopereira-co'] = {
  revenueLinesByYear: deportivopereiraCoRevenueLinesByYear, expenseLinesByYear: deportivopereiraCoExpenseLinesByYear,
  fiscalYearMeta: deportivopereiraCoFiscalYearMeta, pasesData: deportivopereiraCoPasesData,
  resultadosData: deportivopereiraCoResultadosData, titulosData: deportivopereiraCoTitulosData,
  presupuestoOverlayByYear: deportivopereiraCoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'deportivopereira-co-estados-financieros-2025': {
    id:'deportivopereira-co-estados-financieros-2025', clubId:'deportivopereira-co',
    title:'Revelaciones Estados Financieros de Propósito General bajo NIIF para PYME\'s, al 31 de diciembre de 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 901644853). PDF con texto nativo, pero cada tabla de cifras está insertada como imagen (captura de Excel) — números leídos renderizando esas páginas puntuales a PNG y leyéndolas directo, no de la transcripción .md (que solo tiene el texto narrativo). El 22/1/2026 la Superintendencia de Sociedades ordenó DE OFICIO el inicio de un proceso de reorganización empresarial (Auto 2026-01-023551) por cesación de pagos de $11.252 M (50,4% del pasivo) verificada al 31/8/2025 — el ejercicio 2025 acá cargado es el que sustenta esa decisión; el dictamen del revisor fiscal confirma incertidumbre material de negocio en marcha, sin modificar su opinión. Transcripción completa en Clubes/Colombia/Deportivo Pereira/estados-financieros-2025.md.',
  },
});

gestionesByClub['deportivopereira-co'] = {
  // No se confirmó con certeza una "gestión"/presidencia en el sentido usado para clubes
  // argentinos (S.A. adjudicada judicialmente a 147 accionistas ex acreedores de la extinta
  // Corpereira, el firmante de los EEFF es el Representante Legal, Álvaro de Jesús López Bedoya) —
  // entrada genérica sin confirmar.
  actual: { nombre: 'Gestión actual (sin confirmar)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['deportivopereira-co'] = null;

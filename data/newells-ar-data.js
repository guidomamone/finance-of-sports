// ============================================================================
// data/newells-ar-data.js — Club Atlético Newell's Old Boys: club nuevo del motor genérico
// (clubId con sufijo de país, `newells-ar`, ver CLAUDE.md/convención de la Versión 129: los ids
// nuevos llevan el país al final). 1 ejercicio cargado: 2019 (Ejercicio 1°/7/2018 al 30/6/2019).
// PDF + transcripción en
// Clubes/Argentina/Newells Old Boys/memoria-y-balance-2018-2019.{pdf,md} (98 páginas, capa de
// texto NATIVA — sin OCR, confirmado con pdftotext antes de transcribir). Ver
// fuentes/Argentina/Newells Old Boys.md para cómo se encontró el PDF (recuperado de Wayback
// Machine, la URL oficial viva devuelve 404 hoy).
//
// El segundo PDF de la carpeta (resumen-anual-actividades-2012-2013.pdf) es narrativo, sin
// estados contables — NO es fuente de esta carga, ya revisado en la sesión de sourcing.
//
// ESTRUCTURA DEL DOCUMENTO (balance auditado real, "Memoria y Balance General"): Estado de
// Situación Patrimonial + Estado de Recursos y Gastos + Estado de Evolución del Patrimonio Neto +
// notas + Anexos I-VIII. El Estado de Recursos y Gastos separa RECURSOS/GASTOS ORDINARIOS de un
// resultado EXTRAORDINARIO (Nota 13) — a diferencia del caso de San Lorenzo (club-data-mapping
// SKILL.md sección 16, un PRESUPUESTO de caja donde la sección extraordinaria es financiamiento y
// se descarta), este es un BALANCE con devengado real en las dos secciones, así que ambas suman
// directo al resultado final: Superávit Ordinario 205.980.660 + Superávit Extraordinario 2.982.903
// = Superávit Final 208.963.563 (los 3 números impresos tal cual en el documento, pág. 2 del PDF /
// "--- pág. 2 ---" del .md). CONFIRMADO SUPERÁVIT (no déficit): los 3 montos se imprimen positivos,
// sin paréntesis ni signo negativo, a diferencia de los renglones de gasto (que sí llevan
// paréntesis, ej. "Total Gastos Ordinarios (644.592.060)").
//
// LA EXTRAORDINARIA (Nota 13, pág. 15) es "Donaciones" $2.982.903 — un ingreso real, no
// financiamiento ni venta de activos, así que se cargó como una revenueLine más
// (normalizedCategory:'other_income', rawLabel con la cita a la Nota 13), no como un meta field
// aparte: no hay un campo de fiscalYearMeta que le calce mejor (no es profitOnPlayerSales, no es
// assetSales, no es netInterest) y así el propio `computed.revenue` de computeYearGeneric() queda
// trazable 1:1 contra la suma de revenueLines. officialTotalRevenue = 772.154677 (Total Recursos
// Ordinarios, impreso) + 2.982903 (Donaciones) = 775.137580. La "Recupero de gastos" extraordinaria
// que menciona la Nota 13 aparece sin monto (implícitamente $0), no se cargó nada por ella.
//
// RECURSOS (Anexo V "Recursos para Fines Generales" + Anexo VI "Recursos para Fines Específicos",
// págs. 24-25 del .md): Anexo V mezcla cuotas sociales con el negocio no futbolístico del club
// (pileta/natación, básquet, hockey, futsal → other_sports; CIENOB, el colegio del club, "Complejo
// Educativo Newell's Old Boys" → education; alquiler del estadio cubierto y "El Coloso" —apodo del
// estadio Marcelo Bielsa— fuera del partido → stadium_other, CRITERIO CONSERVADOR de
// club-data-mapping sección 1 porque el rótulo nombra el estadio explícito). Anexo VI separa
// Fútbol Profesional (transferencias, TV, sponsors, entradas) de Fútbol Amateur ("Escuela de
// fútbol" → youth_football). "Cuotas socios fútbol y abonos plateas" es una línea MIXTA (cuota +
// abono, no separable en el documento) — se cargó a season_tickets siguiendo el mismo criterio que
// ya usó Unión para su línea igual de mixta ("Contribuciones de socios, ventas de palcos y
// plateas"). "Recupero por Dto. 1212/03" (Nota 22, pág. 18): NO es sponsor ni TV, es una ganancia
// contable por el mecanismo AFA de retención/percepción del 6,5% sobre entradas/transferencias/TV
// que sustituye el aporte a la seguridad social — se cargó a other_income (técnico, no operativo
// real). "Concesiones" y "Derechos de fútbol" (dentro de Fútbol Profesional) son demasiado
// genéricos para asignarles una categoría propia con confianza — other_income, ver
// Admin/dudas-por-club.md.
//
// GASTOS (Anexo VII "Gastos Generales de Administración", pág. 26, TODO admin_general_expense; y
// Anexo VIII "Gastos Específico de Sectores", pág. 27, con columnas Fútbol/Otros por rubro —
// mismo patrón de "2do eje" que ya usó Vélez, club-data-mapping sección 14). Columna Fútbol:
// remuneraciones + cargas sociales del plantel profesional → wages_squad; "Estadía, concentración y
// otros" (viajes/concentración del plantel) → wages_squad, mismo criterio que Racing para costos NO
// salariales del plantel (club-data-mapping sección 13); "Gastos Edificio Jorge Griffa" → wages_squad
// TAMBIÉN: la Memoria narrativa (pág. 1 y varias más del .md) confirma que "edificio Griffa" es el
// HOTEL/centro de entrenamiento del PLANTEL PROFESIONAL donado por Marcelo Bielsa, no la academia
// juvenil (a pesar del nombre "Griffa", asociado también a las inferiores) — se verificó el uso
// exacto en el propio texto antes de categorizar. "Costo de bajas plantel" y "Préstamos y
// transferencias" → player_amortisation (costo de bajas/altas de jugadores, mismo criterio que
// "Costo transferencia de jugadores" de Racing). "Complejo Ricardone" → youth_other_sports_expense,
// SIN confirmar con certeza qué actividad aloja (la Memoria solo menciona la escrituración del
// predio, no su uso) — duda anotada en Admin/dudas-por-club.md, monto chico ($2,65M sobre $644,6M
// de gastos totales, 0,4%). Columna Otros: pileta/hockey/básquet/futsal/otras
// secciones/implementos/estadio cubierto → youth_other_sports_expense; CIENOB → education_expense;
// "Gastos seguridad y control" (columna Otros, no Fútbol → se interpreta como seguridad general de
// sede, no de partidos) → admin_general_expense; "Gastos tienda" → other_expenses (contrapartida de
// "Resultado vta. Mercadería oficial" del lado de ingresos). Amortización de Bienes de Uso (Anexo
// III) → depreciation; Amortización de Activos Intangibles (Anexo II, los pases de jugadores
// capitalizados) → player_amortisation.
//
// TIPO DE CAMBIO: el Anexo I ("Activos y Pasivos en Moneda Extranjera", pág. 19) declara SU PROPIO
// TC de cierre al 30/06/2019, `fxSource:'document_close'` (regla #0 de club-data-mapping sección 5).
// El documento usa DOS tasas de USD distintas según el lado del balance: 41,50 (comprador, para los
// Créditos/Activos en USD, ej. "Deudores por transferencia jugadores") y 43,50 (vendedor, para las
// Deudas/Pasivos en USD) — el mismo spread comprador/vendedor que ya documentó Unión
// (data/union-data.js) para su propio Anexo de moneda extranjera. Se usó el lado ACTIVO/CRÉDITO
// (comprador, 41,50), mismo criterio ya establecido para Unión ("Anexo V, lado Activo/Créditos").
// NO se usó el fxRef ARS@2019-06-30 de currency-map.js (42,45, cotización de mercado): el documento
// declara el suyo propio, que gana siempre sobre una cotización externa.
//
// grossDebt: el Estado de Situación Patrimonial (pág. 1-2 del .md) separa "Deudas" de
// "Remuneraciones y Cargas Sociales", "Deudas Fiscales", "Ingresos cobrados por anticipado" y
// "Deudas Judiciales" como líneas de pasivo DISTINTAS — se usó la línea angosta "Deudas"
// (corriente + no corriente), excluyendo "Deudas Judiciales" (litigios, análogo a una Previsión,
// no deuda financiera) e "Ingresos cobrados por anticipado" (no es deuda), mismo criterio que Boca/
// Vélez/Unión. cash = "Caja y Bancos" únicamente (no se sumó "Inversiones").
//
// Membresía: no se encontró una cifra de "cantidad de socios" en este documento (memberCountByClub
// queda en null). Gestión: "Eduardo Bermúdez" figura como Presidente en la Comisión Directiva del
// propio documento (pág. 1) y firma el Estado de Recursos y Gastos como tal (pág. 2) — confirmado
// con el propio balance, no una fuente externa.
// ============================================================================

const newellsArRevenueLinesByYear = {
  2019: [
    // Anexo V — Recursos para Fines Generales (Total 167.521.788)
    { rawLabel:'Cuotas Socios', normalizedCategory:'member_dues', amountNative:96.338916, disclosureLevel:'detailed' },
    { rawLabel:'Recupero por Incobrab. por cuotas y otros cdtos (Anexo IV)', normalizedCategory:'other_income', amountNative:0.060773, disclosureLevel:'detailed' },
    { rawLabel:'Resultado vta. Mercadería oficial', normalizedCategory:'other_income', amountNative:11.809725, disclosureLevel:'detailed' },
    { rawLabel:'Recupero por Dto. 1212/03 (Nota 22)', normalizedCategory:'other_income', amountNative:24.610267, disclosureLevel:'detailed' },
    { rawLabel:'Otros recursos sociales', normalizedCategory:'other_income', amountNative:7.011870, disclosureLevel:'detailed' },
    { rawLabel:'Recursos piletas/natación', normalizedCategory:'other_sports', amountNative:8.280011, disclosureLevel:'detailed' },
    { rawLabel:'Recursos básquet', normalizedCategory:'other_sports', amountNative:0.474338, disclosureLevel:'detailed' },
    { rawLabel:'Recursos Hockey', normalizedCategory:'other_sports', amountNative:1.393762, disclosureLevel:'detailed' },
    { rawLabel:'Recursos CIENOB', normalizedCategory:'education', amountNative:7.246994, disclosureLevel:'detailed' },
    { rawLabel:'Recursos alquiler estadio cubierto y El Coloso', normalizedCategory:'stadium_other', amountNative:3.756296, disclosureLevel:'detailed' },
    { rawLabel:'Recursos Futsal', normalizedCategory:'other_sports', amountNative:1.612661, disclosureLevel:'detailed' },
    { rawLabel:'Recursos canon panteón social', normalizedCategory:'other_income', amountNative:0.463710, disclosureLevel:'detailed' },
    { rawLabel:'Recupero de gastos', normalizedCategory:'other_income', amountNative:4.462466, disclosureLevel:'detailed' },
    // Anexo VI — Recursos para Fines Específicos / Fútbol Profesional (subtotal 597.711.545)
    { rawLabel:'Campeonatos AFA y venta de entradas de partidos de fútbol', normalizedCategory:'matchday_competition', amountNative:31.340402, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas socios fútbol y abonos plateas', normalizedCategory:'season_tickets', amountNative:91.072950, disclosureLevel:'detailed' },
    { rawLabel:'Quebrantos por Incobrables por cuotas (Anexo IV)', normalizedCategory:'other_income', amountNative:-0.267664, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de retransmisión', normalizedCategory:'broadcasting', amountNative:120.090649, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y sponsors', normalizedCategory:'sponsorship_commercial', amountNative:62.321817, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones', normalizedCategory:'other_income', amountNative:1.594759, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:284.988405, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de fútbol', normalizedCategory:'other_income', amountNative:2.620518, disclosureLevel:'detailed' },
    { rawLabel:'Recupero de gastos fútbol profesional', normalizedCategory:'other_income', amountNative:3.949707, disclosureLevel:'detailed' },
    // Anexo VI — Recursos Fútbol Amateur (subtotal 6.921.344)
    { rawLabel:'Escuela de fútbol', normalizedCategory:'youth_football', amountNative:6.921344, disclosureLevel:'detailed' },
    // Nota 13 — Recursos y Gastos Extraordinarios (Donaciones, 2.982.903)
    { rawLabel:'Donaciones (Recursos y Gastos Extraordinarios, Nota 13)', normalizedCategory:'other_income', amountNative:2.982903, disclosureLevel:'detailed' },
  ],
};

const newellsArExpenseLinesByYear = {
  2019: [
    // Anexo VII — Gastos Generales de Administración (Total 87.661.810)
    { rawLabel:'Remuneraciones Administración', normalizedCategory:'admin_general_expense', amountNative:-23.901442, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales Administración', normalizedCategory:'admin_general_expense', amountNative:-6.759398, disclosureLevel:'detailed' },
    { rawLabel:'Movilidad, Viáticos y otros gtos representacion', normalizedCategory:'admin_general_expense', amountNative:-1.265898, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-9.900274, disclosureLevel:'detailed' },
    { rawLabel:'Papelería y Útiles de Oficina, informática y franqueos', normalizedCategory:'admin_general_expense', amountNative:-3.648632, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos, Tasas y Servicios', normalizedCategory:'admin_general_expense', amountNative:-0.626363, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y Comisiones Bancarias y por cobranzas de cuotas', normalizedCategory:'admin_general_expense', amountNative:-13.968234, disclosureLevel:'detailed' },
    { rawLabel:'Gastos organización asambleas', normalizedCategory:'admin_general_expense', amountNative:-0.106873, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Varios', normalizedCategory:'admin_general_expense', amountNative:-3.145482, disclosureLevel:'detailed' },
    { rawLabel:'Gastos protocolares', normalizedCategory:'admin_general_expense', amountNative:-0.875469, disclosureLevel:'detailed' },
    { rawLabel:'Gastos marketing, prensa y promoción', normalizedCategory:'admin_general_expense', amountNative:-5.431081, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos nacionales', normalizedCategory:'admin_general_expense', amountNative:-17.993280, disclosureLevel:'detailed' },
    { rawLabel:'Gastos pendientes de rendición', normalizedCategory:'admin_general_expense', amountNative:-0.039383, disclosureLevel:'detailed' },
    // Anexo VIII — Gastos Específico de Sectores, columna Fútbol (subtotal 394.405.970)
    { rawLabel:'Remuneraciones fútbol profesional', normalizedCategory:'wages_squad', amountNative:-156.140815, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales fútbol profesional', normalizedCategory:'wages_squad', amountNative:-5.747599, disclosureLevel:'detailed' },
    { rawLabel:'Estadía, concentración y otros', normalizedCategory:'wages_squad', amountNative:-35.150113, disclosureLevel:'detailed' },
    { rawLabel:'Costo de bajas plantel', normalizedCategory:'player_amortisation', amountNative:-21.950208, disclosureLevel:'detailed' },
    { rawLabel:'Gastos explotación estadio y partidos', normalizedCategory:'match_organisation_expense', amountNative:-33.625340, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos-partidos', normalizedCategory:'match_organisation_expense', amountNative:-28.204605, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Edificio Jorge Griffa', normalizedCategory:'wages_squad', amountNative:-2.329592, disclosureLevel:'detailed' },
    { rawLabel:'Complejo Ricardone', normalizedCategory:'youth_other_sports_expense', amountNative:-2.651811, disclosureLevel:'detailed' },
    { rawLabel:'Préstamos y transferencias', normalizedCategory:'player_amortisation', amountNative:-84.085049, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Bella Vista y fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-24.520840, disclosureLevel:'detailed' },
    // Anexo VIII — Gastos Específico de Sectores, columna Otros (subtotal 62.145.256)
    { rawLabel:'Gastos pileta', normalizedCategory:'youth_other_sports_expense', amountNative:-10.493593, disclosureLevel:'detailed' },
    { rawLabel:'Gastos hockey', normalizedCategory:'youth_other_sports_expense', amountNative:-1.361452, disclosureLevel:'detailed' },
    { rawLabel:'Gastos basquet', normalizedCategory:'youth_other_sports_expense', amountNative:-0.740215, disclosureLevel:'detailed' },
    { rawLabel:'Gastos otras secciones deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-6.520817, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Futsal', normalizedCategory:'youth_other_sports_expense', amountNative:-3.264413, disclosureLevel:'detailed' },
    { rawLabel:'Gastos CIENOB', normalizedCategory:'education_expense', amountNative:-14.572415, disclosureLevel:'detailed' },
    { rawLabel:'Gastos estadio cubierto', normalizedCategory:'youth_other_sports_expense', amountNative:-0.435091, disclosureLevel:'detailed' },
    { rawLabel:'Gastos seguridad y control', normalizedCategory:'admin_general_expense', amountNative:-18.656042, disclosureLevel:'detailed' },
    { rawLabel:'Gastos tienda', normalizedCategory:'other_expenses', amountNative:-5.849792, disclosureLevel:'detailed' },
    { rawLabel:'Implementos deportivos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.251427, disclosureLevel:'detailed' },
    // Amortizaciones (cuerpo principal del Estado de Recursos y Gastos)
    { rawLabel:'Amortización de Bienes de Uso (Anexo III)', normalizedCategory:'depreciation', amountNative:-15.303973, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de Activos Intangibles (Anexo II)', normalizedCategory:'player_amortisation', amountNative:-85.075052, disclosureLevel:'detailed' },
  ],
};

const newellsArFiscalYearMeta = {
  2019: {
    currency:'ARS', fx:41.50, fxSource:'document_close', sourceId:'newells-ar-memoria-y-balance-2018-2019',
    reportType:'official_balance_sheet', gestionId:'bermudez',
    // grossDebt = Deudas corriente (211.885373) + no corriente (14.645665), EXCLUYENDO Deudas
    // Judiciales (litigios) e Ingresos cobrados por anticipado. cash = Caja y Bancos.
    grossDebt:226.531038, cash:17.263929,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados Financieros y por Tenencia incluyendo el RECPAM" (RXTYR), impreso
    // positivo en el Estado de Recursos y Gastos.
    netInterest:78.418044, tax:0,
    // officialTotalRevenue = Total Recursos Ordinarios (772.154677) + Donaciones extraordinarias
    // (2.982903) = 775.137580. officialTotalExpenses = Total Gastos Ordinarios impreso (no incluye
    // gasto extraordinario, la Nota 13 no declara ninguno). officialPAT = Superávit Final del
    // Ejercicio impreso ($208.963.563, SUPERÁVIT confirmado: los 3 montos —ordinario, extraordinario
    // y final— se imprimen positivos, sin paréntesis).
    officialTotalRevenue:775.137580, officialTotalExpenses:644.592060, officialPAT:208.963563,
  },
};

const newellsArPresupuestoOverlayByYear = {};
const newellsArPasesData = [];
const newellsArResultadosData = {};
const newellsArTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en data/instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['newells-ar'] = {
  revenueLinesByYear: newellsArRevenueLinesByYear, expenseLinesByYear: newellsArExpenseLinesByYear,
  fiscalYearMeta: newellsArFiscalYearMeta, pasesData: newellsArPasesData,
  resultadosData: newellsArResultadosData, titulosData: newellsArTitulosData,
};


Object.assign(sources, {
  'newells-ar-memoria-y-balance-2018-2019': {
      id:'newells-ar-memoria-y-balance-2018-2019', clubId:'newells-ar',
      title:'Memoria y Balance General, Ejercicio 1°/7/2018 al 30/6/2019',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (98 páginas, capa de texto nativa, sin OCR). Recuperado vía Wayback Machine (la URL oficial viva, newellsoldboys.com.ar/uploadsarchivos/memoria_y_balance_nob.pdf, devuelve 404 hoy — el club rehízo el sitio a WordPress). SUPERÁVIT FINAL real: $208.963.563 ARS (Ordinario $205.980.660 + Extraordinario $2.982.903). Anexo V/VI de Recursos y Anexo VII/VIII de Gastos con desglose completo por rubro, verificados fila por fila contra sus propios subtotales impresos antes de cargar. Convertido a USD con $41,50 (Anexo I, lado Activo/Créditos, comprador — el mismo documento usa $43,50 vendedor del lado Pasivo). Ver data/newells-ar-data.js.',
    },
});

gestionesByClub['newells-ar'] = {
    // Eduardo Bermúdez figura como Presidente en la Comisión Directiva del propio documento y firma
    // el Estado de Recursos y Gastos como tal — confirmado con el balance mismo, no con una fuente
    // externa. Solo se carga el rango de este único ejercicio, sin asumir cuánto duró el mandato.
    bermudez: { nombre:'Bermúdez', firstYear:2019, lastYear:2019 },
  };

memberCountByClub['newells-ar'] = null; // no se encontró una cifra de "cantidad de socios" en este documento

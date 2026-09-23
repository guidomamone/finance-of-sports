// ============================================================================
// data/banfield-ar-data.js — Club Atlético Banfield (Sociedad Civil). Primer ejercicio cargado:
// 2020 (116° Ejercicio Económico, 1°/7/2019 al 30/6/2020). PDF + transcripción completa en
// Clubes/Argentina/Banfield/memoria-y-balance-2019-2020.{pdf,md} (58 páginas, texto nativo,
// confirmado con pdftotext -layout, sin OCR). Ver fuentes/Argentina/Banfield.md para cómo se
// encontró el documento (Wayback Machine, la URL oficial del club da 404 hoy).
//
// ESTRUCTURA DEL DOCUMENTO: a diferencia de Racing/River/Unión, Banfield NO reporta un "Estado de
// Recursos y Gastos" por naturaleza de gasto con Anexo de detalle por rubro transversal — reporta
// por SECTOR/DEPARTAMENTO (Anexos IV a X, cada uno un centro de costos: Fútbol Profesional, Fútbol
// Amateur, Estadio, Administración Sede Social, Predio, Departamento Deportes, Instituto CAB), más
// 2 Anexos transversales (XI: Impositivos y Financieros: XII: Generales). Cada Anexo de sector se
// abrió línea por línea (pág. 43-50 del .md) y se categorizó por NATURALEZA del gasto dentro de
// cada sector, no por el sector completo en bloque, salvo cuando todas sus líneas comparten
// categoría real (Predio, Instituto CAB).
//
// ANEXO IV (Sector Fútbol Profesional, 204.927.334,97): igual criterio que Racing/Boca 2027 (ver
// club-data-mapping/SKILL.md sección 13, "CASO CONSULTADO"): los costos NO salariales del plantel
// profesional (médico, indumentaria, pretemporada, proveduría/comida, seguro y viáticos,
// concentraciones) se cargan junto con "Sueldos y Cargas Sociales"/"Primas Anuales" en
// `wages_squad`, porque ESE es el criterio que ya usa Boca 2027 para el mismo tipo de línea mixta.
// Excepciones: "Costo y Custodia Espectáculo" (organización/seguridad del partido) ->
// `match_organisation_expense`, y "Prop. Mant. Administración y Gastos Generales" (asignación de
// costos de administración al sector) -> `admin_general_expense`. Suma de las 10 líneas del Anexo =
// 204.927.335,00 vs. impreso 204.927.334,97 (diferencia de 3 centavos, redondeo).
//
// ANEXO V (Sector Fútbol Amateur, 120.335.465,08): SE CAPITALIZA ENTERO como Bienes Intangibles
// (Nota 4, pág. 37 del .md: "incluye... el costo prorrateado incurrido en el fútbol amateur,
// destinado a la formación de jugadores... en la medida que dichos valores tengan capacidad futura
// de generar ingresos"), y el propio Estado de Recursos y Gastos lo revierte con una línea
// "Apropiación de Costos Fútbol Amateur (Nota 4)" por el mismo importe exacto — el Estado de Flujo
// de Efectivo confirma la capitalización ("Aumento Bienes Intangibles" = exactamente 120.335.465,08,
// pág. 34-35 del .md). Efecto neto en el Estado de Recursos y Gastos: CERO (ver el subtotal
// "GASTOS ESPECIFICOS" de 405.110.315,86, que ya no incluye este importe). Se cargaron AMBAS líneas
// (el gasto del sector y su reversión), categoría `youth_other_sports_expense` las dos (NO
// `youth_football`: esa categoría solo existe del lado de Ingresos, ver ANEXO IX abajo), en vez de
// omitirlas — más fiel a la fuente y muestra el mecanismo de capitalización real en "Formato del
// club".
//
// ANEXO VI (Sector Estadio, 20.695.882,83) -> `match_organisation_expense` completo (mantenimiento,
// servicios y sueldos de la operación del estadio, no de la organización de UN partido puntual pero
// mismo espíritu de costo de infraestructura de juego que Union/Racing).
//
// ANEXO VII (Sector Administración Sede Social, 36.532.338,72) -> `admin_general_expense` completo.
// Incluye "Gastos e Intereses Bancarios" (978.271,91): a diferencia del Anexo XI (ver abajo), esta
// línea mezcla comisiones/gastos bancarios con una porción menor de intereses sin desglosar y es
// ~2,7% del sector — se dejó en admin_general_expense en vez de separarla a netInterest, por su
// tamaño marginal y porque el propio documento la agrupa con "gastos" administrativos, no con el
// bloque financiero dedicado (Anexo XI).
//
// ANEXO VIII (Sector Predio, 69.869.856,52) -> `youth_other_sports_expense` completo. "Predio" es
// la contracara de gasto de los ingresos de Predio en Recursos (Anexo III: Pileta Natación,
// Estacionamiento, Colonia, Acceso a Predio, Alquiler -> `other_sports`/`other_income`), un
// complejo recreativo/deportivo del socio, no el plantel profesional. Incluye "Proyecto formación
// de Jugadores Extranjeros" (6.364.599,79): pese al nombre, está dentro del Anexo del Predio (no del
// Anexo IV de Fútbol Profesional ni del Anexo V de Fútbol Amateur), así que se mantuvo en la misma
// categoría que el resto del sector en vez de separarla.
//
// ANEXO IX (Departamento Deportes, 33.551.356,71) -> `youth_other_sports_expense` completo
// (Escuela de Fútbol, Fútbol femenino, Hockey, Futsal, Vóley, Tenis, Handball, Liga de fútbol,
// Patín, Gimnasia Deportiva, Taekwondo, Acondicionamiento Físico, Ajedrez, Colonia Vacaciones,
// Gastos Departamento de Deportes). Del lado de Ingresos (Anexo III) estas mismas actividades SÍ
// se separaron en `youth_football`/`womens_football`/`other_sports` (categorías que existen para
// Ingresos), pero `category-map.js` no tiene ese mismo detalle del lado de Gastos: el único
// espejo-gasto de las 3 es `youth_other_sports_expense` ("fútbol juvenil, femenino, otros
// deportes, básquet, actividades sociales", ver su comentario en category-map.js) — se probó
// primero separarlas igual que en Ingresos y `youth_football`/`womens_football` quedaron AFUERA
// de `otherExpenses` en computeYearGeneric() (esas 2 categorías no existen en EXPENSE_CATEGORIES,
// así que la plata desaparecía del PAT sin ningún error visible), encontrado corriendo el motor
// real contra este archivo antes de cargarlo — ver verificación en el reporte de la sesión.
//
// ANEXO X (Instituto CAB, 39.533.546,11) -> `education_expense` completo, espejo de "Arancel
// Enseñanza" (Anexo III) -> `education` del lado de Recursos. Instituto CAB es el colegio del club.
//
// ANEXO XI (Gastos Impositivos y Financieros, 49.803.210,63) — NO SE CARGÓ COMO expenseLine.
// Las 3 líneas del Anexo ("AFIP Intereses y Otros", "Dif. Cambio, Financiación y Otros", "Intereses
// e Impuestos Bancarios") son intereses/diferencias de cambio por definición — club-data-mapping
// sección 2 es explícita: van a `netInterest`, "ni siquiera si el documento fuente los muestra como
// una línea más" del cuerpo de Gastos (que es exactamente este caso: Banfield los suma DENTRO de
// "Total Gastos", a diferencia de Racing/Boca/River, que ya los muestran aparte). Se sacaron los
// 49.803.210,63 del cuerpo de Gastos y se sumaron, en negativo, a `netInterest`.
//
// ANEXO XII (Gastos Generales, 240.372.992,58): SE PROMOVIERON 2 líneas del Anexo con categoría
// real propia distinta del resto: "Depreciaciones" (113.965.732,45) -> `depreciation`, y
// "Objetivos" (25.469.312,28, premios por objetivos deportivos al plantel/cuerpo técnico) ->
// `wages_squad` (mismo criterio que Racing con "Fútbol profesional", club-data-mapping sección 13).
// El resto (Abonos/Mantenimiento, Honorarios, Insumos Generales, Juicios, Socios/Comunicación) ->
// `admin_general_expense`. "Juicios" (73.552.707,54, litigios/contingencias legales) es la línea más
// grande del resto — no hay categoría más específica en el sitio para litigios, se cargó como
// gasto administrativo general, mismo criterio que clubes previos sin bucket de "contingencias".
//
// R.E.C.P.A.M. (Resultado por Exposición al Cambio del Poder Adquisitivo de la Moneda,
// +69.665.680,54): el propio Estado de Recursos y Gastos lo separa DEBAJO del "Total Gastos", antes
// del "Resultado Final del Ejercicio" (pág. 32 del .md) — es el resultado monetario por la
// reexpresión por inflación (RT6/RT48), mismo concepto que "Resultados financieros y por tenencia
// (incl. RECPAM)" que ya se carga a `netInterest` para Boca/River/Racing/Vélez/Estudiantes LP/
// Rosario Central/Instituto/Independiente (ver esos archivos). Se sumó a `netInterest` junto con el
// Anexo XI (arriba): netInterest = RECPAM (69.665.680,54) − Anexo XI (49.803.210,63) =
// +19.862.469,91.
//
// VERIFICACIÓN (node, ver detalle en el reporte de la sesión): revenueLines suman EXACTO
// 705.794.414,61 = Total Recursos impreso. expenseLines (sin Anexo XI, reclasificado a netInterest)
// suman EXACTO 645.483.308,44 = Total Gastos impreso (695.286.519,07) MENOS Anexo XI
// (49.803.210,63) — por eso `officialTotalExpenses` de este archivo (645,483308 M) es MENOR que el
// "Total Gastos" que imprime el balance (695,286519 M): la diferencia es exactamente el Anexo XI,
// reclasificado. revenue + expenses + netInterest = 705.794.414,61 − 645.483.308,44 + 19.862.469,91
// = 80.173.576,08 = "Resultado Final del Ejercicio" impreso, EXACTO. Total del Activo también
// verificado: $1.253.147.745,78 (30/6/2020) = impreso.
//
// grossDebt: el Estado de Situación Patrimonial separa "Deudas Generales" + "Deudas Bancarias y
// Financieras" + "Deudas Sociales y Fiscales" (corriente + no corriente) de "Contingencias"
// (corriente + no corriente, una previsión/provisión, no deuda financiera) — se usó la línea más
// angosta (Deudas, sin Contingencias): 246.057.621,72 = 31.821.621,75 + 73.288.918,83 +
// 91.698.579,86 + 49.248.501,28. Sumada a Contingencias (65.178.281,09) da el Total del Pasivo
// exacto (311.235.902,81), confirmando el corte. cash = Caja y Bancos (Nota 2): 8.578.019,85.
//
// FX: el documento NO declara un tipo de cambio de cierre propio (no hay Anexo de "Activos y
// pasivos en moneda extranjera" — se buscó explícitamente en las 58 páginas, ausente; la única
// mención a dólares es en la Memoria, cláusulas de préstamo/rescisión de jugadores, no una
// valuación contable). fx = mercado (BCRA mayorista o BNA vendedor) al 30/6/2020, referenciado a
// FX_CLOSE (data/currency-map.js) como 'ARS@2020-06-30' — ESA entrada todavía no existe en
// FX_CLOSE, queda pendiente de que se agregue centralizado (ver reporte de la sesión).
//
// Gestión: Lucía Barbuto, Presidenta, electa en acto del 06/10/2018 (lista única), mandato hasta
// octubre de 2021 (pág. 2 del .md) — cubre el ejercicio 2019/2020 cargado con confianza total.
// No se encontró una cifra de cantidad de socios en este documento.
// ============================================================================

const banfieldArRevenueLinesByYear = {
  2020: [
    { rawLabel:'Transferencias y Préstamos', normalizedCategory:'player_sales', amountNative:132.687500, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Socios', normalizedCategory:'member_dues', amountNative:63.385042, disclosureLevel:'detailed' },
    { rawLabel:'Formación de Jugadores', normalizedCategory:'player_sales', amountNative:50.305977, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:27.699428, disclosureLevel:'detailed' },
    { rawLabel:'Entradas Grales., Plateas, Palcos y Abonos', normalizedCategory:'matchday_competition', amountNative:22.284826, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol Amateur - Derechos', normalizedCategory:'player_sales', amountNative:4.547082, disclosureLevel:'detailed' },
    { rawLabel:'Pileta Natación (Predio)', normalizedCategory:'other_sports', amountNative:2.987267, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento (Predio)', normalizedCategory:'other_income', amountNative:1.471150, disclosureLevel:'detailed' },
    { rawLabel:'Colonia (Predio)', normalizedCategory:'other_sports', amountNative:0.983501, disclosureLevel:'detailed' },
    { rawLabel:'Acceso a Predio', normalizedCategory:'other_income', amountNative:0.137240, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler (Predio)', normalizedCategory:'other_income', amountNative:0.031559, disclosureLevel:'detailed' },
    { rawLabel:'Escuela de Fútbol (Departamento Deportes)', normalizedCategory:'youth_football', amountNative:6.346066, disclosureLevel:'detailed' },
    { rawLabel:'Hockey', normalizedCategory:'other_sports', amountNative:5.258900, disclosureLevel:'detailed' },
    { rawLabel:'Futsal', normalizedCategory:'other_sports', amountNative:1.281824, disclosureLevel:'detailed' },
    { rawLabel:'Voley', normalizedCategory:'other_sports', amountNative:1.184147, disclosureLevel:'detailed' },
    { rawLabel:'Tenis', normalizedCategory:'other_sports', amountNative:1.144882, disclosureLevel:'detailed' },
    { rawLabel:'Handball', normalizedCategory:'other_sports', amountNative:1.125940, disclosureLevel:'detailed' },
    { rawLabel:'Liga de fútbol', normalizedCategory:'other_sports', amountNative:1.039320, disclosureLevel:'detailed' },
    { rawLabel:'Patín', normalizedCategory:'other_sports', amountNative:0.710011, disclosureLevel:'detailed' },
    { rawLabel:'Gimnasia Deportiva', normalizedCategory:'other_sports', amountNative:0.688741, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol femenino (Departamento Deportes)', normalizedCategory:'womens_football', amountNative:0.184004, disclosureLevel:'detailed' },
    { rawLabel:'Taekwondo', normalizedCategory:'other_sports', amountNative:0.161673, disclosureLevel:'detailed' },
    { rawLabel:'Acondicionamiento Físico', normalizedCategory:'other_sports', amountNative:0.076092, disclosureLevel:'detailed' },
    { rawLabel:'Ajedrez', normalizedCategory:'other_sports', amountNative:0.051627, disclosureLevel:'detailed' },
    { rawLabel:'Arancel Enseñanza (Instituto CAB)', normalizedCategory:'education', amountNative:28.049127, disclosureLevel:'detailed' },
    { rawLabel:'Televisaciones', normalizedCategory:'broadcasting', amountNative:164.620005, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Varios', normalizedCategory:'other_income', amountNative:187.351483, disclosureLevel:'detailed' },
  ],
};

const banfieldArExpenseLinesByYear = {
  2020: [
    // Anexo IV — Sector Fútbol Profesional (ver comentario de cabecera)
    { rawLabel:'Concentraciones, Entrenamientos y Alquileres', normalizedCategory:'wages_squad', amountNative:-4.305518, disclosureLevel:'detailed' },
    { rawLabel:'Dpto. Médico, Estudios, Medicamentos y Accesorios (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-6.326139, disclosureLevel:'detailed' },
    { rawLabel:'Indumentaria y Elementos Deportivos (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-0.382300, disclosureLevel:'detailed' },
    { rawLabel:'Primas Anuales', normalizedCategory:'wages_squad', amountNative:-93.350381, disclosureLevel:'detailed' },
    { rawLabel:'Proveduría', normalizedCategory:'wages_squad', amountNative:-5.080915, disclosureLevel:'detailed' },
    { rawLabel:'Seguro y Viáticos Jugadores', normalizedCategory:'wages_squad', amountNative:-0.689111, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-51.461734, disclosureLevel:'detailed' },
    { rawLabel:'Traslados Partidos y Pretemporadas', normalizedCategory:'wages_squad', amountNative:-2.388711, disclosureLevel:'detailed' },
    { rawLabel:'Costo y Custodia Espectáculo', normalizedCategory:'match_organisation_expense', amountNative:-25.804760, disclosureLevel:'detailed' },
    { rawLabel:'Prop. Mant. Administración y Gastos Generales (Fútbol Profesional)', normalizedCategory:'admin_general_expense', amountNative:-15.137768, disclosureLevel:'detailed' },
    // Anexo V — Sector Fútbol Amateur, capitalizado como Bienes Intangibles (Nota 4) y revertido.
    // normalizedCategory: `youth_other_sports_expense` (NO `youth_football`, que solo existe del
    // lado de Ingresos — el espejo de gasto para fútbol juvenil/femenino/otros deportes es
    // `youth_other_sports_expense`, ver data/category-map.js).
    { rawLabel:'Sector Fútbol Amateur (formación de jugadores, capitalizado — Nota 4)', normalizedCategory:'youth_other_sports_expense', amountNative:-120.335465,
      disclosureLevel:'detailed', items:[
        ['Alquileres, Alojamientos y Seguros', -2.096880],
        ['Comidas y Cocina Pensionados Dormys', -7.033706],
        ['Convenio Liga', -2.007872],
        ['Dpto. Médico, Estudios, Medicamentos y Accesorios', -12.802727],
        ['Indumentaria y Elementos Deportivos', -0.062964],
        ['Inscripción Contratos', -0.102328],
        ['Mantenimiento, Administración y Reformas', -46.084856],
        ['Partidos Divisiones Inferiores', -0.574850],
        ['Salarios, Honorarios, Innovación y Tecnología', -47.373758],
        ['Traslados y Viáticos Jugadores', -2.195524],
      ] },
    { rawLabel:'Apropiación de Costos Fútbol Amateur (reversión por capitalización, Nota 4)', normalizedCategory:'youth_other_sports_expense', amountNative:120.335465, disclosureLevel:'detailed' },
    // Anexo VI — Sector Estadio
    { rawLabel:'Sector Estadio (mantenimiento, servicios y personal)', normalizedCategory:'match_organisation_expense', amountNative:-20.695883,
      disclosureLevel:'detailed', items:[
        ['Gtos. Generales, Mantenimiento y Reparaciones', -9.187674],
        ['Servicios (Teléfono, Agua, Gas, Electricidad)', -2.536533],
        ['Sueldos y Cargas Sociales', -8.971676],
      ] },
    // Anexo VII — Sector Administración Sede Social
    { rawLabel:'Sector Administración Sede Social', normalizedCategory:'admin_general_expense', amountNative:-36.532339,
      disclosureLevel:'detailed', items:[
        ['Gastos e Intereses Bancarios', -0.978272],
        ['Gastos Generales', -0.522663],
        ['Honorarios', -0.142397],
        ['Mantenimiento y Reparaciones', -0.347012],
        ['Remuneraciones y Cargas Sociales', -33.433677],
        ['Servicios (Teléfono, Agua, Gas, Electricidad)', -1.108318],
      ] },
    // Anexo VIII — Sector Predio
    { rawLabel:'Sector Predio', normalizedCategory:'youth_other_sports_expense', amountNative:-69.869857,
      disclosureLevel:'detailed', items:[
        ['Gastos Generales y Administración', -12.554649],
        ['Proyecto formación de Jugadores Extranjeros', -6.364600],
        ['Remuneraciones y Cargas Sociales', -43.892420],
        ['Reparaciones y Mantenimiento', -3.286247],
        ['Servicios (Electricidad, Teléfono, Agua, Gas)', -3.771941],
      ] },
    // Anexo IX — Departamento Deportes. TODO el sector -> `youth_other_sports_expense` (no hay
    // `other_sports` del lado de Gastos, esa categoría solo existe para Ingresos — ver
    // data/category-map.js: el espejo de gasto para fútbol juvenil/femenino/otros deportes es
    // siempre `youth_other_sports_expense`, sin distinguir sub-tipo del lado de Gastos).
    { rawLabel:'Escuela de Fútbol (Departamento Deportes, gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-4.509135, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol femenino (Departamento Deportes, gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.035389, disclosureLevel:'detailed' },
    { rawLabel:'Resto de Departamento Deportes (Hockey, Futsal, Voley, Tenis, Handball, Liga de fútbol, Patín, Gimnasia, Taekwondo, Acond. Físico, Ajedrez, Colonia, gastos generales)', normalizedCategory:'youth_other_sports_expense', amountNative:-28.006832,
      disclosureLevel:'detailed', items:[
        ['Acondicionamiento físico', -0.120816],
        ['Ajedrez', -0.266613],
        ['Colonia Vacaciones', -0.474394],
        ['Futsal', -2.119345],
        ['Gastos Departamento de Deportes', -2.630266],
        ['Gimnasia Deportiva', -1.499304],
        ['Handball', -1.521199],
        ['Hockey', -7.874299],
        ['Liga de fútbol', -2.222729],
        ['Patín', -1.967646],
        ['Pileta Natación', -1.562513],
        ['Taekwondo', -0.474432],
        ['Tenis', -2.656003],
        ['Voley', -2.617273],
      ] },
    // Anexo X — Instituto CAB
    { rawLabel:'Instituto CAB (Gastos Varios + Remuneraciones y Cargas Sociales)', normalizedCategory:'education_expense', amountNative:-39.533546,
      disclosureLevel:'detailed', items:[
        ['Gastos Varios', -4.571453],
        ['Remuneraciones y Cargas Sociales', -34.962093],
      ] },
    // Anexo XII — Gastos Generales (Depreciaciones y Objetivos promovidas, resto admin_general_expense)
    { rawLabel:'Depreciaciones (Gastos Generales)', normalizedCategory:'depreciation', amountNative:-113.965732, disclosureLevel:'detailed' },
    { rawLabel:'Objetivos (premios por objetivos deportivos, Gastos Generales)', normalizedCategory:'wages_squad', amountNative:-25.469312, disclosureLevel:'detailed' },
    { rawLabel:'Resto de Gastos Generales (Abonos/Mantenimiento, Honorarios, Insumos, Juicios, Socios/Comunicación)', normalizedCategory:'admin_general_expense', amountNative:-100.937948,
      disclosureLevel:'detailed', items:[
        ['Abonos, Mantenimiento y Otros gastos', -12.383574],
        ['Honorarios', -6.720166],
        ['Insumos Generales', -0.715780],
        ['Juicios', -73.552708],
        ['Socios, Comunicación y otros', -7.565721],
      ] },
    // Anexo XI (Gastos Impositivos y Financieros) NO se carga acá: reclasificado íntegro a
    // netInterest junto con el R.E.C.P.A.M. — ver comentario de cabecera.
  ],
};

const banfieldArFiscalYearMeta = {
  2020: {
    currency:'ARS', fxRef:'ARS@2020-06-30', fxSource:'market_close',
    sourceId:'banfield-ar-memoria-y-balance-2019-2020',
    reportType:'official_balance_sheet', gestionId:'barbuto',
    // netInterest = R.E.C.P.A.M. (+69.665.680,54, pág. 32 del .md) menos Anexo XI "Gastos
    // Impositivos y Financieros" (-49.803.210,63, reclasificado desde Gastos, ver cabecera).
    netInterest:19.862470, profitOnPlayerSales:0, assetSales:0, tax:0,
    // grossDebt = Deudas Generales + Deudas Bancarias y Financieras + Deudas Sociales y Fiscales
    // (corriente + no corriente), EXCLUYENDO Contingencias (previsión, no deuda financiera).
    // cash = Caja y Bancos (Nota 2).
    grossDebt:246.057622, cash:8.578020,
    // officialTotalRevenue = "Total Recursos" impreso (Estado de Recursos y Gastos).
    // officialTotalExpenses = "Total Gastos" impreso (695,286519 M) MENOS Anexo XI (49,803211 M),
    // reclasificado a netInterest — ver comentario de cabecera para la reconciliación completa.
    // officialPAT = "Resultado Final del Ejercicio" impreso. Verificado: revenue + expenses +
    // netInterest = 80,173576 M exacto.
    officialTotalRevenue:705.794415, officialTotalExpenses:645.483308, officialPAT:80.173576,
  },
};

const banfieldArPresupuestoOverlayByYear = {};
const banfieldArPresupuestoSupuestosByYear = {};
const banfieldArPresupuestoFinancieroByYear = {};
const banfieldArPresupuestoInversionesByYear = {};
const banfieldArPasesData = [];
const banfieldArResultadosData = {};
const banfieldArTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['banfield-ar'] = {
  revenueLinesByYear: banfieldArRevenueLinesByYear, expenseLinesByYear: banfieldArExpenseLinesByYear,
  fiscalYearMeta: banfieldArFiscalYearMeta, pasesData: banfieldArPasesData,
  resultadosData: banfieldArResultadosData, titulosData: banfieldArTitulosData,
  presupuestoOverlayByYear: banfieldArPresupuestoOverlayByYear,
  presupuestoSupuestosByYear: banfieldArPresupuestoSupuestosByYear,
  presupuestoFinancieroByYear: banfieldArPresupuestoFinancieroByYear,
  presupuestoInversionesByYear: banfieldArPresupuestoInversionesByYear,
};

Object.assign(sources, {
  'banfield-ar-memoria-y-balance-2019-2020': {
    id:'banfield-ar-memoria-y-balance-2019-2020', clubId:'banfield-ar',
    title:'Memoria y Balance General, 116° Ejercicio Económico (1°/7/2019 al 30/6/2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (58 páginas, texto nativo, sin OCR), informe del auditor (Juan Pablo Régoli, C.P.C.E.P.B.A.) del 30/9/2020, sin salvedades. URL oficial del club (clubabanfield.org/inicio/balance/CAB-MemoriaBalance2020.pdf) da 404 hoy — recuperado del snapshot de Wayback Machine de esa misma URL (ver fuentes/Argentina/Banfield.md). RESULTADO FINAL real: $80.173.576,08 ARS (superávit). Total del Activo al cierre: $1.253.147.745,78. Reporta por SECTOR/DEPARTAMENTO (Fútbol Profesional, Fútbol Amateur, Estadio, Administración Sede Social, Predio, Departamento Deportes, Instituto CAB) más 2 Anexos transversales (Impositivos y Financieros, Generales), a diferencia del desglose por naturaleza de gasto de otros clubes. No declara tipo de cambio de cierre propio (sin Anexo de moneda extranjera) — convertido con cotización de mercado (ARS@2020-06-30, FX_CLOSE). Ver data/banfield-ar-data.js para el detalle completo de categorización.',
  },
});

gestionesByClub['banfield-ar'] = {
  // Lucía Barbuto, Presidenta, electa en acto eleccionario (lista única) del 6/10/2018,
  // mandato de 3 años (hasta octubre de 2021) — confirmado en la propia Memoria, pág. 2 del .md.
  barbuto: { nombre:'Barbuto (2018-2021)', firstYear:2020, lastYear:2020 },
};

memberCountByClub['banfield-ar'] = null; // no se encontró una cifra de socios en este documento

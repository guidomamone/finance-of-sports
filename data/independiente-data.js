// ============================================================================
// data/independiente-data.js — Club Atlético Independiente: 7mo club del motor genérico. Un
// ejercicio cargado: 2023/2024 (1°/7/2023 al 30/6/2024), balance auditado real, texto nativo. PDF +
// transcripción en Clubes/Argentina/Independiente/memoria-y-balance-2023-2024.{pdf,md}.
//
// Estructura del documento: el Estado de Recursos y Gastos principal usa 3 líneas agregadas
// (Actividades Deportivas/Cuotas de Socios/Otros Recursos, y sus 3 espejos de Gastos), que remiten
// al Anexo V ("Apertura de Recursos y Gastos, clasificados por actividad") para el desglose por
// DEPARTAMENTO (Fútbol Profesional/Fútbol Juvenil/Educación Física/Complejo de Tenis/Filial Capital
// Federal/Centro Educativo/Complejo Wilde/Parque Santo Domingo/Estadio/Sede Central), y el Anexo D
// ("Fútbol Profesional") desglosa ADEMÁS ese departamento por NATURALEZA del rubro (entradas, TV,
// publicidad, plateas, jugadores, técnicos, organización de partidos, etc.) — se usó este nivel más
// fino para Fútbol Profesional, y el nivel de departamento (Anexo V) para el resto.
//
// "Diferencia de Cambio" (activos: 1.113,800909 M; pasivos e intereses: 10.699,446685 M) y RECPAM
// (18.961,207621 M) NO se cargaron como líneas de revenue/expense — el propio Estado de Recursos y
// Gastos los excluye de "Otros Recursos"/"Gastos Administrativos" ("Anexo V sin resultados
// financieros") y los muestra netos en una sección aparte ("RESULTADOS FINANCIEROS Y POR TENENCIA",
// $9.375,561845 M) — van al campo `netInterest`, mismo criterio que el resto de los clubes
// (club-data-mapping/SKILL.md sección 2). "Resultado Inversiones" (987,666079 M) SÍ queda como
// revenue ordinario (`other_income`), porque el documento lo incluye explícitamente dentro de "Otros
// Recursos (Anexo V sin resultados financieros)", no en la sección de resultados financieros.
//
// "Gastos directos derivados de la venta" (de pases, 738,442785 M) se cargó en `other_expenses`, no
// en `player_amortisation` — mismo precedente que Racing/Instituto/Rosario Central (comisiones de
// compraventa de pases separadas de la amortización/costo de adquisición real).
//
// grossDebt = Total del Pasivo (25.968,939849 M) — este balance no tiene una previsión/contingencia
// separable de la deuda real (a diferencia de Instituto/Rosario Central), todo el pasivo son deudas
// bancarias/operativas/sociales-fiscales reales.
//
// fx: el propio balance declara $890,50 para USD al 30/6/2024 (Nota de "Activos y pasivos en moneda
// extranjera", único valor, sin ambigüedad).
//
// Gestión: Néstor Grindetti, presidente desde abril/julio de 2023 (confirmado por búsqueda), cubre
// la totalidad de este ejercicio.
//
// ============================================================================
// EJERCICIO N°122 (2025/2026, cierre 30/6/2026) — agregado 2026-09-23 (to-do 58).
// ============================================================================
// DOS documentos, y el desglose fino cambió de lugar respecto del 120° Ejercicio:
//   - memoria-y-balance-2025-2026.pdf (150 págs, texto nativo): este año es SOLO la Memoria
//     narrativa (actividades del club, departamento por departamento) — NO tiene un solo estado
//     contable ni Anexo, se confirmó con pdftotext + grep sobre las 150 páginas (0 matches de
//     "ANEXO", "ESTADO DE RECURSOS Y GASTOS", etc.). Se usó solo para el conteo de socios y para
//     confirmar presidencia/liga.
//   - estados-contables-2025-2026.pdf (54 págs) tiene TODOS los estados contables, incluido el
//     Anexo D (Fútbol Profesional por naturaleza) — pero ESE Anexo D vive como nota (pág. 40 del
//     PDF, no está en el índice de arriba, que solo lista los 8 estados primarios + "Notas y
//     Anexos") y hay que buscarlo adentro del bloque de notas.
// PROBLEMA DE FUENTE, no de escaneo: `pdftotext` da texto LEGIBLE en la carátula/TOC/algunas notas
// narrativas (fuente Arial, uni:yes) pero BASURA en todas las páginas con tablas numéricas
// (fuente "Owners", `pdffonts` confirma Custom/uni:no) — mismo síntoma que
// `presupuesto-2024-2025.pdf` de Gimnasia y Esgrima LP (ver comentario de cabecera de
// data/gimnasiaesgrima-ar-data.js), pero acá afecta ~48 de 54 páginas, no una tabla puntual.
// Se resolvió renderizando cada página a imagen (`pdftoppm -png -r 300/400`) y leyéndola con el
// Read tool: la imagen es nítida (no es un escaneo, es un PDF nativo con fuente mal empaquetada),
// así que la lectura visual fue exacta. Se probó Tesseract primero (más barato) y funcionó bien
// para texto corrido, pero para las tablas con 2 columnas (30/06/2026 vs 30/06/2025) el orden de
// lectura de Tesseract mezclaba filas — cada tabla se re-verificó con el Read tool sobre la imagen
// en alta resolución antes de cargar un solo número, y CADA subtotal transcripto cierra EXACTO
// contra el impreso (ver verificación más abajo). Una página del Anexo V (pág. 8 del documento)
// está rotada 180° enteros (no 90°, no hace falta el flujo de deskew), se corrigió con
// `Image.rotate(180)` antes de leerla.
//
// TRAMPA REAL que costó una primera verificación fallida: el Anexo V tiene una línea "Generales"
// DENTRO de "1) Actividades Deportivas, Culturales y Sociales" (557,744193 M, revenue) que es
// distinta del "Generales" que en el lado de Gastos es el SUBTÍTULO de "Gastos Administrativos y
// Generales" — incluirla en la suma de columnas pero olvidarla como línea propia al cargar dejó el
// primer intento de PAT con una diferencia de exactamente 557,744193 M. Si un club futuro repite
// esta estructura (una fila "Generales" al final de un bloque de departamentos, antes de "Cuotas de
// Socios"), es una línea de revenue propia, no un typo ni un subtotal.
//
// ANEXO D (Fútbol Profesional por naturaleza) SÍ existe este año, con la misma apertura que el
// 120° Ejercicio (entradas/TV/publicidad/plateas/varios + transferencias), pero la sub-apertura de
// "Recaudaciones Partidos" quedó ATADA a "PARTIDOS COPA ARGENTINA, COPA SUPERLIGA Y COPA
// SUDAMERICANA" como encabezado, con una sección aparte "OTRAS COMPETICIONES" que solo da un
// ingreso/gasto lump sin desglosar por naturaleza (2.792,306789 M de ingresos, 2026). No se pudo
// confirmar con certeza qué torneo cubre exactamente "Otras Competiciones" (¿Liga Profesional?
// ¿amistosos?) — se cargó a `matchday_competition` igual que "Ingresos por venta de entradas
// generales" (mismo criterio de club-data-mapping sección 1: recaudación de partidos sin separar
// premios). Pendiente en Admin/dudas-por-club.md.
//
// "Estadio" y "Parque Santo Domingo" dan $0 de INGRESO este año en el Anexo V (departamento por
// departamento) para 2026 Y 2025 — no es un error de lectura (confirmado visualmente, celda con
// "-"), es plausible que la recaudación de concesiones del estadio haya quedado embebida en
// "Publicidad y concesiones" del Anexo D este año (el 120° Ejercicio sí tenía una línea "Estadio
// (concesiones, no recaudación de partidos)" con plata real). Se documenta, no se investiga más:
// el GASTO de ambos departamentos sí es real y se cargó igual que siempre.
//
// FX: a diferencia del 120° Ejercicio ($890,50, único valor sin ambigüedad), el Anexo II
// ("Activos y pasivos en moneda extranjera") de este ejercicio declara VARIOS tipos de cambio de
// USD distintos según la línea: $1.450,00 para TODO el activo en moneda extranjera (caja, bancos,
// créditos), pero $1.500,00 para LAS 4 líneas de deuda (pasivo corriente y no corriente) en USD —
// unánime del lado de la deuda, ningún pasivo USD usa otro valor. Mismo patrón que
// presupuesto-2024-2025.pdf de Gimnasia y Esgrima LP (ver su comentario de cabecera): se usó la
// cotización que aplica a la MAYORÍA (acá, la TOTALIDAD) de las líneas de deuda en USD, que sigue
// siendo `fxSource:'document_close'` porque es un valor que el propio documento declara, solo que
// elegido entre varios que declara para USD. fx = 1.500,00.
//
// grossDebt = Total del Pasivo (52.113,682021 M) — el Estado de Situación Patrimonial de este
// ejercicio tampoco separa una previsión/contingencia de la deuda real (mismo criterio que el 120°
// Ejercicio). cash = Caja y Bancos (978,164626 M).
//
// netInterest = "Diferencias de Cambio Generadas por Activos" (revenue, Anexo V) + RECPAM (revenue
// extraordinario, Anexo V) − "Diferencia de Cambio generada por Pasivos e Intereses" (gasto, Anexo
// V) = 1.502,817626 + 8.362,628476 − 8.540,223617 = 1.325,222485 M, que reconcilia EXACTO contra
// "Resultados Financieros (Incluye RECPAM)" que imprime el Estado de Recursos y Gastos.
//
// "Gastos directos derivados de la venta de jugadores" (Anexo D3, 7.612,638319 M) → `other_expenses`,
// mismo criterio que el 120° Ejercicio (comisiones/costos directos de venta, separados de
// `player_amortisation`).
//
// VERIFICACIÓN (node, script de la sesión): revenueLines (20 líneas) suman 107.425,533090 M,
// exacto igual a "RECURSOS ORDINARIOS" (80.726,844739) + "Transferencias y Préstamos del Plantel
// Profesional" (26.698,688351) del Estado de Recursos y Gastos. expenseLines (19 líneas) suman
// 106.972,675946 M en magnitud. revenue + expenses + netInterest = 1.778,079629 M, EXACTO contra
// "SUPERÁVIT FINAL DEL EJERCICIO" impreso (Estado de Recursos y Gastos Y Anexo V, los dos
// documentos coinciden al peso). Cruzado ADEMÁS contra el Informe de Tesorería (ancla de la sesión
// de sourcing): superávit final $1.778 M ✓, recursos ordinarios $80.727 M ✓ (redondeo de
// 80.726,844739), gastos ordinarios antes de D&A $79.605 M ✓, superávit operativo $1.122 M ✓
// (redondeo de 1.121,755929), Activo $192.453 M ✓ — los 5 anchors reconcilian exacto.
//
// Socios: la Memoria de este ejercicio da "175.796 SOCIOS Y SOCIAS EN REGISTRO" (Departamento de
// Socios, pág. 22), más preciso que la cifra de prensa (~150.000) que se venía usando —
// `memberCountByClub.independiente` se actualizó a ese valor.
//
// Presidencia: Néstor Grindetti sigue firmando como Presidente en los estados contables (fecha de
// informe del auditor 10/09/2026) — `gestionesByClub.independiente.grindetti.lastYear` pasa a 2026.
// ============================================================================

const independienteRevenueLinesByYear = {
  2024: [
    // Fútbol Profesional, desglosado por naturaleza (Anexo D).
    { rawLabel:'Ingresos por venta de entradas generales', normalizedCategory:'matchday_competition', amountNative:967.489472, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos partidos amistosos', normalizedCategory:'matchday_competition', amountNative:463.418323, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:2836.075715, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y concesiones', normalizedCategory:'sponsorship_commercial', amountNative:3894.029816, disclosureLevel:'detailed' },
    { rawLabel:'Plateas', normalizedCategory:'season_tickets', amountNative:5879.551558, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_income', amountNative:844.389059, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de futbolistas profesionales', normalizedCategory:'player_sales', amountNative:4145.523929, disclosureLevel:'detailed' },
    { rawLabel:'Resultados por derechos de formación y mecanismos de solidaridad', normalizedCategory:'player_sales', amountNative:591.419614, disclosureLevel:'detailed' },
    // Resto de departamentos (Anexo V, nivel departamento).
    { rawLabel:'Fútbol Juvenil', normalizedCategory:'youth_football', amountNative:62.807704, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Educación Física', normalizedCategory:'other_sports', amountNative:133.193580, disclosureLevel:'detailed' },
    { rawLabel:'Complejo de Tenis', normalizedCategory:'other_sports', amountNative:131.201365, disclosureLevel:'detailed' },
    { rawLabel:'Filial Capital Federal (actividades)', normalizedCategory:'other_income', amountNative:515.491235, disclosureLevel:'detailed' },
    { rawLabel:'Centro Educativo', normalizedCategory:'education', amountNative:1936.897300, disclosureLevel:'detailed' },
    { rawLabel:'Complejo Polideportivo Wilde', normalizedCategory:'other_sports', amountNative:261.266336, disclosureLevel:'detailed' },
    { rawLabel:'Estadio (concesiones, no recaudación de partidos)', normalizedCategory:'stadium_other', amountNative:72.525021, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de Socios (Filial Capital Federal)', normalizedCategory:'member_dues', amountNative:269.965350, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de Socios (Sede Central)', normalizedCategory:'member_dues', amountNative:13248.916744, disclosureLevel:'detailed' },
    { rawLabel:'Carnets de Asociados', normalizedCategory:'member_dues', amountNative:42.301581, disclosureLevel:'detailed' },
    { rawLabel:'Recursos Varios', normalizedCategory:'other_income', amountNative:883.151053, disclosureLevel:'detailed' },
    { rawLabel:'Resultado Inversiones', normalizedCategory:'other_income', amountNative:987.666079, disclosureLevel:'detailed' },
  ],
  2026: [
    // Fútbol Profesional, desglosado por naturaleza (Anexo D, dentro de "Notas y Anexos", pág. 40
    // del PDF — ver comentario de cabecera para por qué no está en el índice de estados primarios).
    { rawLabel:'Ingresos por venta de entradas generales', normalizedCategory:'matchday_competition', amountNative:582.978874, disclosureLevel:'detailed' },
    { rawLabel:'Otras Competiciones (ingresos)', normalizedCategory:'matchday_competition', amountNative:2792.306789, disclosureLevel:'detailed' },
    { rawLabel:'Derechos T.V.', normalizedCategory:'broadcasting', amountNative:6288.636359, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y concesiones', normalizedCategory:'sponsorship_commercial', amountNative:10900.370217, disclosureLevel:'detailed' },
    { rawLabel:'Plateas', normalizedCategory:'season_tickets', amountNative:13901.105825, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_income', amountNative:1096.303927, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de futbolistas profesionales', normalizedCategory:'player_sales', amountNative:25815.787269, disclosureLevel:'detailed' },
    { rawLabel:'Resultados por derechos de formación y mecanismos de solidaridad', normalizedCategory:'player_sales', amountNative:882.901082, disclosureLevel:'detailed' },
    // Resto de departamentos (Anexo V, nivel departamento). "Estadio"/"Parque Santo Domingo" no
    // tienen línea de ingreso este año (documento muestra "-" en ambos ejercicios), ver comentario
    // de cabecera.
    { rawLabel:'Fútbol Juvenil', normalizedCategory:'youth_football', amountNative:227.501436, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Educación Física', normalizedCategory:'other_sports', amountNative:355.836739, disclosureLevel:'detailed' },
    { rawLabel:'Complejo de Tenis', normalizedCategory:'other_sports', amountNative:1847.419418, disclosureLevel:'detailed' },
    { rawLabel:'Filial Capital Federal (actividades)', normalizedCategory:'other_income', amountNative:1190.871805, disclosureLevel:'detailed' },
    { rawLabel:'Centro Educativo', normalizedCategory:'education', amountNative:3425.277879, disclosureLevel:'detailed' },
    { rawLabel:'Complejo Polideportivo Wilde', normalizedCategory:'other_sports', amountNative:451.120923, disclosureLevel:'detailed' },
    // Fila propia dentro de "1) Actividades Deportivas, Culturales y Sociales" (NO es el
    // "Generales" del lado de Gastos, que es el subtítulo de Administración) — ver la trampa
    // documentada en el comentario de cabecera.
    { rawLabel:'Generales (Actividades Deportivas, Culturales y Sociales)', normalizedCategory:'other_income', amountNative:557.744193, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de Socios (Filial Capital Federal)', normalizedCategory:'member_dues', amountNative:548.964924, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de Socios (Sede Central)', normalizedCategory:'member_dues', amountNative:26904.152832, disclosureLevel:'detailed' },
    { rawLabel:'Carnets de Asociados', normalizedCategory:'member_dues', amountNative:116.634435, disclosureLevel:'detailed' },
    { rawLabel:'Recursos Varios', normalizedCategory:'other_income', amountNative:8293.309947, disclosureLevel:'detailed' },
    { rawLabel:'Resultado Inversiones', normalizedCategory:'other_income', amountNative:1246.308217, disclosureLevel:'detailed' },
  ],
};

const independienteExpenseLinesByYear = {
  2024: [
    // Fútbol Profesional, desglosado por naturaleza (Anexo D) — personal (jugadores/técnicos/
    // auxiliares/asistencia médica) va a wages_squad, organización de partidos/concentraciones a
    // match_organisation_expense.
    { rawLabel:'Jugadores', normalizedCategory:'wages_squad', amountNative:-11494.498654, disclosureLevel:'detailed' },
    { rawLabel:'Técnicos y preparadores físicos', normalizedCategory:'wages_squad', amountNative:-498.335033, disclosureLevel:'detailed' },
    { rawLabel:'Personal auxiliar fútbol', normalizedCategory:'wages_squad', amountNative:-1196.963202, disclosureLevel:'detailed' },
    { rawLabel:'Asistencia médica', normalizedCategory:'wages_squad', amountNative:-549.511496, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-1214.788836, disclosureLevel:'detailed' },
    { rawLabel:'Concentraciones, traslados, estadías, cesiones y otros', normalizedCategory:'match_organisation_expense', amountNative:-2130.132189, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos amistosos', normalizedCategory:'match_organisation_expense', amountNative:-60.245184, disclosureLevel:'detailed' },
    { rawLabel:'Gastos directos derivados de la venta de jugadores', normalizedCategory:'other_expenses', amountNative:-738.442785, disclosureLevel:'detailed' },
    // Resto de departamentos (Anexo V, nivel departamento) — "todo lo que no es plantel
    // profesional", ver EXPENSE_CATEGORY_LABELS.youth_other_sports_expense. "Centro Educativo
    // (gasto)" es la excepción desde la Versión 194 (to-do 42): va a `education_expense`, espejo de
    // la fila "Centro Educativo" que Ingresos ya tenía en `education` desde la Versión 189.
    { rawLabel:'Fútbol Juvenil (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1917.566423, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Educación Física (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-711.290588, disclosureLevel:'detailed' },
    { rawLabel:'Complejo de Tenis (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-310.260968, disclosureLevel:'detailed' },
    { rawLabel:'Filial Capital Federal (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-221.044991, disclosureLevel:'detailed' },
    { rawLabel:'Centro Educativo (gasto)', normalizedCategory:'education_expense', amountNative:-2324.309805, disclosureLevel:'detailed' },
    { rawLabel:'Complejo Polideportivo Wilde (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-931.945511, disclosureLevel:'detailed' },
    { rawLabel:'Parque Santo Domingo (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1723.064013, disclosureLevel:'detailed' },
    { rawLabel:'Estadio (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1889.285004, disclosureLevel:'detailed' },
    { rawLabel:'Administración', normalizedCategory:'admin_general_expense', amountNative:-6576.118028, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-1318.497962, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes intangibles (plantel profesional)', normalizedCategory:'player_amortisation', amountNative:-4343.753047, disclosureLevel:'detailed' },
  ],
  2026: [
    // Fútbol Profesional (Anexo D) — personal a wages_squad, organización de partidos/otras
    // competiciones a match_organisation_expense, costo directo de venta de pases a other_expenses
    // (mismo criterio que el 120° Ejercicio).
    { rawLabel:'Jugadores', normalizedCategory:'wages_squad', amountNative:-23208.823795, disclosureLevel:'detailed' },
    { rawLabel:'Técnicos y preparadores físicos', normalizedCategory:'wages_squad', amountNative:-1123.421025, disclosureLevel:'detailed' },
    { rawLabel:'Personal auxiliar fútbol', normalizedCategory:'wages_squad', amountNative:-1753.046366, disclosureLevel:'detailed' },
    { rawLabel:'Asistencia médica', normalizedCategory:'wages_squad', amountNative:-2021.631758, disclosureLevel:'detailed' },
    { rawLabel:'Organización partidos', normalizedCategory:'match_organisation_expense', amountNative:-1867.251651, disclosureLevel:'detailed' },
    { rawLabel:'Concentraciones, traslados, estadías, cesiones y otros', normalizedCategory:'match_organisation_expense', amountNative:-10052.781424, disclosureLevel:'detailed' },
    { rawLabel:'Otras Competiciones (gastos)', normalizedCategory:'match_organisation_expense', amountNative:-20.781644, disclosureLevel:'detailed' },
    { rawLabel:'Gastos directos derivados de la venta de jugadores (Anexo D3)', normalizedCategory:'other_expenses', amountNative:-7612.638319, disclosureLevel:'detailed' },
    // Resto de departamentos (Anexo V, nivel departamento) — mismo criterio que el 120° Ejercicio:
    // "Centro Educativo (gasto)" va a education_expense, el resto a youth_other_sports_expense.
    { rawLabel:'Fútbol Juvenil (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-3855.156169, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Educación Física (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1772.726075, disclosureLevel:'detailed' },
    { rawLabel:'Complejo de Tenis (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-851.622319, disclosureLevel:'detailed' },
    { rawLabel:'Filial Capital Federal (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-574.055059, disclosureLevel:'detailed' },
    { rawLabel:'Centro Educativo (gasto)', normalizedCategory:'education_expense', amountNative:-4035.248148, disclosureLevel:'detailed' },
    { rawLabel:'Complejo Polideportivo Wilde (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-2171.867844, disclosureLevel:'detailed' },
    { rawLabel:'Parque Santo Domingo (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-3892.444667, disclosureLevel:'detailed' },
    { rawLabel:'Estadio (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-4512.874200, disclosureLevel:'detailed' },
    { rawLabel:'Administración', normalizedCategory:'admin_general_expense', amountNative:-17891.356666, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso (neta de desafectación de Res. de Rev. Técnico)', normalizedCategory:'depreciation', amountNative:-2671.788371, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes intangibles', normalizedCategory:'player_amortisation', amountNative:-17083.160446, disclosureLevel:'detailed' },
  ],
};

const independienteFiscalYearMeta = {
  2024: {
    currency:'ARS', fx:890.50, fxSource:'document_close',
    sourceId:'independiente-memoria-y-balance-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'grindetti',
    // grossDebt = Total del Pasivo (sin previsión/contingencia separable en este balance).
    // cash = Caja y Bancos.
    grossDebt:25968.939849, cash:1704.387140,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados Financieros y por Tenencia" (incluye RECPAM + diferencias de cambio
    // de activos y pasivos), ver comentario de cabecera para la reconciliación completa.
    netInterest:9375.561845, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"+"Transferencias y Préstamos
    // del Plantel Profesional" (extraordinario) / "GASTOS ORDINARIOS" impresos (pág. 6).
    // SUPERÁVIT FINAL real: $7.392.788.960 ARS.
    officialTotalRevenue:38167.280834, officialTotalExpenses:40150.053719, officialPAT:7392.788960,
  },
  2026: {
    currency:'ARS', fx:1500.00, fxSource:'document_close',
    sourceId:'independiente-estados-contables-2025-26',
    reportType:'official_balance_sheet',
    gestionId:'grindetti',
    // grossDebt = Total del Pasivo (Estado de Situación Patrimonial, sin previsión separable este
    // año tampoco). cash = Caja y Bancos.
    grossDebt:52113.682021, cash:978.164626,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Diferencias de Cambio Generadas por Activos + RECPAM − Diferencia de Cambio
    // generada por Pasivos e Intereses (Anexo V) = reconcilia exacto contra "Resultados
    // Financieros (Incluye RECPAM)" del Estado de Recursos y Gastos. Ver comentario de cabecera.
    netInterest:1325.222485, tax:0,
    // officialTotalRevenue = suma de las 20 revenueLines (= "RECURSOS ORDINARIOS" + "Transferencias
    // y Préstamos del Plantel Profesional" del Estado de Recursos y Gastos). officialTotalExpenses
    // = suma de las 19 expenseLines (incluye depreciación/amortización, a diferencia de "GASTOS
    // ORDINARIOS" impreso que las excluye este año — ver verifyTieOuts(), compara contra
    // computed.expenses+computed.nonCash, no contra el subtotal impreso). officialPAT =
    // "SUPERÁVIT FINAL DEL EJERCICIO" impreso (Estado de Recursos y Gastos y Anexo V, coinciden).
    officialTotalRevenue:107425.533090, officialTotalExpenses:106972.675946, officialPAT:1778.079629,
  },
};

const independientePasesData = [];
const independienteResultadosData = {};
const independienteTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.independiente = {
  revenueLinesByYear: independienteRevenueLinesByYear, expenseLinesByYear: independienteExpenseLinesByYear,
  fiscalYearMeta: independienteFiscalYearMeta, pasesData: independientePasesData,
  resultadosData: independienteResultadosData, titulosData: independienteTitulosData,
};


Object.assign(sources, {
  'independiente-memoria-y-balance-2023-24': {
      id:'independiente-memoria-y-balance-2023-24', clubId:'independiente',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2023 al 30/6/2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (51 páginas, texto nativo), auditado por Dr. Walter Hugo Rivero, informe de fecha 30/09/2024. SUPERÁVIT FINAL real: $7.392.788.960 ARS. Convertido a USD con $890,50 (Nota "Activos y pasivos en moneda extranjera", único valor declarado). El Anexo D (Fútbol Profesional) desglosa el rubro más grande del club por naturaleza (entradas, TV, publicidad, plateas, jugadores, técnicos, organización de partidos); el Anexo V clasifica el resto por departamento (Fútbol Juvenil, Educación Física, Centro Educativo, etc.). "Diferencia de cambio"+RECPAM se llevan netos a netInterest, igual que el resto de los clubes.',
    },
  'independiente-estados-contables-2025-26': {
      id:'independiente-estados-contables-2025-26', clubId:'independiente',
      title:'Estados Contables (Informe de Tesorería, Estado de Situación Patrimonial y Estado de Recursos y Gastos), Ejercicio N°122, 1°/7/2025 al 30/6/2026',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (54 páginas), auditado por Dr. Walter Hugo Rivero, informe de fecha 10/09/2026. Capa de texto nativa pero con fuente subseteada sin ToUnicode en casi todas las páginas con tablas numéricas (pdftotext da basura, la carátula y algunas notas narrativas sí se leen bien) — valores extraídos renderizando cada página a imagen (300-400dpi) y leyendo visualmente, verificados subtotal por subtotal contra los impresos. SUPERÁVIT FINAL real: $1.778.079.629 ARS. El Anexo D (Fútbol Profesional por naturaleza) vive dentro del bloque de Notas y Anexos (pág. 40 del PDF), no en el índice de estados primarios. Convertido a USD con $1.500,00 (Anexo II "Activos y pasivos en moneda extranjera": el documento declara $1.450,00 para el activo en moneda extranjera y $1.500,00 para la totalidad de las líneas de deuda en USD del pasivo — se usó la de la deuda, mismo criterio que Gimnasia y Esgrima LP para un caso de múltiples cotizaciones). "Diferencia de Cambio"+RECPAM se llevan netos a netInterest, igual que el resto de los clubes.',
    },
  'independiente-memoria-2025-26': {
      id:'independiente-memoria-2025-26', clubId:'independiente',
      title:'Memoria (institucional/narrativa, sin estados contables), 122° Ejercicio Administrativo, 1°/7/2025 al 30/6/2026',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (150 páginas, texto nativo). A diferencia del 120° Ejercicio, este año la Memoria es SOLO narrativa institucional (actividades por departamento, hitos, balance social) — no incluye un solo estado contable ni Anexo numérico, esos viven enteros en el documento de Estados Contables. Se usó para confirmar presidencia (Néstor Grindetti) y para el conteo de socios: "175.796 SOCIOS Y SOCIAS EN REGISTRO" (Departamento de Socios, pág. 22).',
    },
});

gestionesByClub.independiente = {
    // Confirmado por búsqueda (Versión 95): Néstor Grindetti asumió como interino en abril de 2023
    // y fue confirmado en julio de 2023, mandato hasta diciembre de 2026. Sigue firmando como
    // Presidente en los Estados Contables del Ejercicio 122 (informe del auditor 10/09/2026) —
    // lastYear pasa a 2026, cubre ambos ejercicios cargados (2023/2024 y 2025/2026).
    grindetti: { nombre:'Grindetti (2023-actual)', firstYear:2024, lastYear:2026 },
  };

memberCountByClub.independiente = 175796; // "175.796 SOCIOS Y SOCIAS EN REGISTRO", Memoria del Ejercicio 122 (Departamento de Socios, pág. 22) — más preciso que la cifra de prensa que se venía usando


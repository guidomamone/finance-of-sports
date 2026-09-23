// ============================================================================
// data/talleres-ar-data.js — Club Atlético Talleres Asociación Civil (Córdoba,
// Argentina). Onboarding inicial del club (sesión 2026-09-23): pasa de "sin
// nada cargado" a 2 ejercicios auditados reales, 2024 y 2025, ejercicio
// CALENDARIO (1/1-31/12, NO temporada jul-jun como la mayoría de los clubes
// argentinos ya cargados — fiscalYearStart:'01-01', igual criterio que
// data/stuttgart-de-data.js, usado como plantilla de shape/convención).
//
// FUENTE: `Clubes/Argentina/Talleres/estados-contables-2024.md` y
// `estados-contables-2025.md` — Estados Contables completos (Estado de
// Situación Patrimonial + Estado de Recursos y Gastos + Anexos I-V/VI),
// auditados, con Informe de la Comisión Revisora de Cuentas. Los dos PDF
// fuente tienen texto nativo (pdftotext -layout, sin OCR, confirmado con
// ~4000 caracteres/página). Transcripción completa página por página en los
// .md de arriba. El 3er PDF de la carpeta (`asamblea-social-2024.pdf`) es un
// reporte infográfico sin cifras absolutas cargables — NO es fuente de esta
// carga, ver fuentes/Argentina/Talleres.md.
//
// EXPRESADO EN MONEDA HOMOGÉNEA (RT6, "en pesos sin centavos, a la fecha de
// cierre"): cada documento reexpresa TODO el ejercicio (incluida su propia
// columna comparativa del año anterior) al poder adquisitivo de SU fecha de
// cierre. Por eso se usó SIEMPRE la columna "año corriente" de CADA balance
// (31/12/2024 dentro del EECC 2024; 31/12/2025 dentro del EECC 2025), nunca
// la columna comparativa del balance siguiente — confirmado que difieren
// (ej. "Total del activo" 31/12/2024: 96.410.707.726 en su propio EECC vs.
// 126.818.644.941 como comparativo dentro del EECC 2025, mismo concepto,
// reexpresado a 2 fechas de cierre distintas — club-data-mapping SKILL.md
// sección 6.5).
//
// ESTRUCTURA DEL "ESTADO DE RECURSOS Y GASTOS": el documento agrupa todo bajo
// "RECURSOS" (incluida la sección "Transferencias de Derechos Económicos", ver
// nota crítica abajo) y "GASTOS", con Anexos III/IV (2024) o IV/V (2025) que
// desglosan cada línea de primer nivel en sub-ítems con monto propio — el
// desglose más granular de cualquier club argentino cargado hasta ahora,
// reconciliado EXACTO contra cada subtotal impreso del documento (Total
// Recursos Fútbol Profesional, Total Otros Recursos, Total Gastos Fútbol
// Profesional, Total Otros Gastos, y el Total Recursos/Total Gastos/
// Resultado del Ejercicio final) con node antes de cargar, ver verificación
// al final de este comentario.
//
// NOTA CRÍTICA — "Transferencias de Derechos Económicos" SE CARGA NETO, a
// diferencia de Boca/Racing (club-data-mapping SKILL.md sección 3, que dice
// "reflejá cómo LO PRESENTA CADA CLUB, no una regla fija"): el propio Estado
// de Recursos y Gastos de Talleres muestra "Ingreso por transferencias"
// (bruto) MENOS "Costo computable de los activos transferidos" (valor libro
// del pase dado de baja) MENOS "Gastos de transferencia" (comisiones), y el
// resultado NETO ("Total por transferencias de Derechos Económicos") es lo
// que suma a "Total Recursos Fútbol Profesional" — es decir, a diferencia de
// Boca/Racing (que muestran las 3 partidas como líneas ORDINARIAS separadas,
// cada una sumando a su propio Total de Ingresos/Total de Gastos), acá el
// propio documento ya neteó estas 3 partidas ANTES de llegar a "Total
// Recursos". Cargar los 3 componentes como revenueLine/expenseLine separados
// (como si fuera Boca/Racing) habría inflado el revenueLines/expenseLines
// combinado por encima del "Total Recursos"/"Total Gastos" oficiales en
// ~14681 M ARS (2024) / ~11510 M ARS (2025) — se probó así primero y
// falló el tie-out contra los 2 totales oficiales por exactamente ese monto
// (el PAT final igual daba exacto, porque revenue y expense suben lo mismo,
// pero verifyTieOuts() chequea Revenue y Expenses POR SEPARADO, no solo el
// PAT — ver index.html función verifyTieOuts()). Se cargó entonces como UNA
// sola revenueLine (categoría player_sales) con el valor NETO, y los 3
// componentes (bruto, costo computable, gastos) como `items` para que el
// acordeón de "Formato del club"/"Formato simplificado" siga mostrando el
// detalle real — mismo criterio de "reflejar cómo lo presenta cada club" de
// la sección 3 del skill, aplicado al hecho de que ESTE club sí netea.
// "Costo computable de los activos transferidos" y "Gastos de transferencia"
// quedan así DENTRO del item de la revenueLine, no promovidos a
// expenseLines — es una excepción deliberada a la regla general de "no
// enterrar un gasto real dentro de items de una línea de ingreso", justificada
// porque acá promoverlos rompería el tie-out contra los totales oficiales
// impresos por EL PROPIO documento (a diferencia del caso de Racing en la
// sección 1 del skill, donde promover SÍ mantenía el tie-out).
//
// REVENUE — mapeo de las 13 líneas de primer nivel (2024) / 12 (2025, sin
// "Partidos amistosos" que dio $0 en 2025) del Anexo de Recursos:
//   Ingresos por publicidad - Aliados estratégicos  → sponsorship_commercial
//   Cuotas sociales                                 → member_dues
//   Partidos fútbol profesional (entradas por partido, NO abonos: el
//     documento no reporta una línea de abonos/season tickets separada)
//                                                    → matchday_competition
//   Ingresos AFA derechos televisación y otros /
//     Ingresos derechos televisación y otros        → broadcasting
//   Otros ingresos socios (emisión de carnet, ingresos especiales a socios)
//                                                    → member_dues (ingreso
//     incremental ligado al padrón de socios, mismo negocio que Cuotas
//     Sociales, no un negocio distinto)
//   Partidos amistosos                              → matchday_competition
//   Partidos de copas (el documento NO separa recaudación de premios por
//     avance de ronda dentro de esta línea — ver club-data-mapping SKILL.md
//     sección 1, regla de competition_bonus: solo se separa si el documento
//     la reporta como línea propia, y acá no lo hace) → matchday_competition
//   Ingresos concesiones (gastronomía/bar)           → stadium_other (uso
//     del estadio fuera del partido en sí, concesiones — criterio
//     conservador de la sección 1 del skill, acá el rótulo SÍ nombra
//     "concesiones", no es un alquiler genérico)
//   Otros ingresos fútbol profesional (préstamos de jugadores y derechos de
//     preferencia, mecanismo de solidaridad FIFA, ingresos por cargas
//     sociales Decreto 510/ex-1212 de préstamos, otros service charge) →
//     other_income (4 conceptos heterogéneos de "negocio de pases" que no
//     son ventas en firme — no encajan limpio en player_sales, que ya está
//     usado para la línea de transferencias propiamente dicha arriba; se
//     mantienen juntos como un solo revenueLine con items, mismo
//     normalizedCategory en los 4 sub-ítems, no ameritan promoción según la
//     regla de la sección 1 del skill)
//   Total por transferencias de Derechos Económicos (NETO, ver nota crítica
//     arriba)                                        → player_sales
//   Ingresos por tienda netos de costo de venta (indumentaria, merchandising,
//     ya neto de "costos de mercadería vendida" según lo imprime el propio
//     documento)                                     → sponsorship_commercial
//     (la categoría agrupa "sponsors, merchandising, canjes" explícito en
//     category-map.js)
//   Ingresos deportes amateurs (entradas fútbol amateur, cuotas, otros — es
//     fútbol de inferiores/reserva, no otro deporte)  → youth_football
//   Otros ingresos ordinarios / Otros ingresos (otros ingresos, donaciones,
//     recupero gastos administrativos)                → other_income
//
// EXPENSE — mapeo de las ~19-20 líneas de primer nivel del Anexo de Gastos:
//   Plantel y cuerpo técnico (sueldos, reconocimiento trayectoria, premios)
//                                                      → wages_squad
//   Alojamiento/movilidad/atención médica, Gastos operativos de partidos,
//     Honorarios y viáticos (personal + árbitros), Aportes A.F.A./L.C.F.,
//     Inscripciones jugadores y técnicos, Otros gastos de entrenamientos →
//     match_organisation_expense (costo de organizar partidos/participar en
//     competencias — logística de viajes, seguridad, árbitros, AFA/LCF,
//     entrenamiento del plantel profesional, calza exacto con la definición
//     de la categoría en category-map.js)
//   Alquileres y expensas                             → admin_general_expense
//     (viviendas/locales/expensas genéricos, no nombra el estadio — criterio
//     conservador de stadium_other, sección 1 del skill)
//   Amortización de activos deportivos (pases)         → player_amortisation
//   Prestamos, comisiones, gto. transferencias / gto. mercado y rescisiones
//                                                       → other_expenses
//     (comisiones e intermediación de compraventa — MISMO criterio que
//     Racing, club-data-mapping SKILL.md sección 13: Boca tampoco separa
//     comisiones dentro de su bucket "Compra de jugadores", que es solo
//     amortización/deterioro de pases; meterlo ahí sería menos fiel, no más)
//   Otros gastos (fútbol profesional: utilería, alquiler de canchas, service
//     charge)                                          → other_expenses
//   Gastos por sueldos y cargas sociales (ordinarios/estructura — personal
//     que NO es plantel/cuerpo técnico)                → admin_general_expense
//   Gastos impositivos, Gastos departamentos de servicios, Gastos de
//     mantenimiento, Gastos de prensa y eventos, Quebranto previsión
//     deudores incobrables                             → admin_general_expense
//   Gastos de preparación de jugadores de inferiores (SOLO 2025, línea
//     nueva: desarrollo de juveniles)                  → youth_other_sports_expense
//   Depreciación de bienes de uso                       → depreciation
//   Otros gastos (ordinarios/estructura: Básquet, Vóley, Patín, Donaciones,
//     Varios — básquet/vóley/patín son EXACTAMENTE "otros deportes" per la
//     definición de youth_other_sports_expense en category-map.js)
//                                                        → youth_other_sports_expense
//
// netInterest: "Resultados Financieros y por Tenencia" completo (2024:
// Diferencias de cambio + Resultados por tenencia e intereses + Recpam,
// ajuste por inflación —los 3 conceptos van juntos al mismo campo, ninguno
// es revenueLine/expenseLine, club-data-mapping SKILL.md sección 2—; 2025:
// una sola línea ya neta "Resultados financieros y por tenencia", el
// documento no la desglosa en el propio Estado). tax = 0: Talleres es una
// asociación civil con exención impositiva (Nota 3 de ambos documentos,
// "Exenciones Impositivas") — no hay impuesto a las ganancias que restar.
//
// TIPO DE CAMBIO: el Anexo V (2024) / Anexo VI (2025) "Activos y Pasivos en
// Moneda Extranjera" NO declara un tipo de cambio único de cierre a pesar de
// que su propio encabezado de columna dice "Importe moneda origen / Tipo de
// cambio" — la celda solo completa el importe en moneda origen, nunca un
// número de cotización, y la razón (moneda homogénea + partidas de distinto
// origen temporal) se confirma dividiendo Importe convertido AR$ / Importe
// moneda origen fila por fila: da valores DISTINTOS entre líneas de la MISMA
// moneda al MISMO cierre (ej. 2024: ~912 para "Deudas con clubes" USD vs.
// ~1.060 para "Provisión de fútbol profesional" USD; 2025: entre ~1.060 y
// ~1.458 según la línea) — no hay un tipo de cambio de cierre único y
// declarado que citar como document_close (regla 0 de club-data-mapping
// SKILL.md sección 5 exige un número EXPLÍCITO, no uno inferido y
// contradictorio entre líneas). fxSource:'market_close', fxRef apuntando a
// FX_CLOSE (data/currency-map.js) para 'ARS@2024-12-31'/'ARS@2025-12-31' —
// NINGUNA de las 2 fechas existe todavía ahí (se revisó currency-map.js
// completo: solo hay entradas @2024-06-30/@2025-06-30 para ARS, cierres de
// junio de otros clubes). Van a generar console.warn hasta que el
// orquestador agregue esas 2 entradas (dólar mayorista BCRA/BNA de cierre al
// 31/12/2024 y al 31/12/2025) — ver reporte final de la sesión.
//
// grossDebt: el Estado de Situación Patrimonial separa "Cuentas por pagar"
// (2024, Nota 2.6: proveedores + deudas con clubes + tarjetas + cheques
// diferidos + AFA/LCF + provisión de fútbol profesional — deuda operativa y
// de pases) de "Remuneraciones y cargas sociales", "Cargas fiscales", "Otros
// pasivos" y "Previsiones" — mismo criterio que Boca/Vélez (club-data-mapping
// SKILL.md sección 14): se usó la línea más angosta "Cuentas por pagar"
// (corriente+no corriente), NO el Total del Pasivo completo. 2025 usa el
// equivalente "Deudas con proveedores" (el balance 2025 reordenó los rubros
// del pasivo respecto de 2024, pero mantiene la misma separación conceptual).
// cash = "Caja y bancos" en los 2 años.
//
// PRESIDENCIA: Andrés Miguel Fassi confirmado como Presidente en la Comisión
// Directiva de LOS 2 ejercicios (2024: firma el Vicepresidente 1° "al solo
// efecto de identificación", con Fassi listado como Presidente en la nómina
// de la Comisión Directiva de la pág. 2; 2025: Fassi firma directamente como
// "Presidente"). gestionId:'fassi', firstYear:2024, lastYear:2025 (solo lo
// que estos 2 documentos confirman con certeza, sin asumir hacia atrás).
//
// memberCountByClub: null — ningún documento declara la cantidad de socios.
//
// VERIFICACIÓN (tie-out, hecha con node antes de cargar — 3 checks por año,
// más los subtotales intermedios impresos por el propio documento, TODOS
// exactos sin redondeo):
//   2024: revenueLines suman 66852.071667 M (= officialTotalRevenue exacto,
//     "Total Recursos"). |expenseLines| suman 51795.390034 M (=
//     officialTotalExpenses exacto, "Total Gastos"). revenue + expenses +
//     netInterest + tax = 66852.071667 - 51795.390034 - 1860.248365 + 0 =
//     13196.433268 M = EXACTO el "RESULTADO DEL EJERCICIO - SUPERAVIT"
//     impreso (13.196.433.268 ARS). Subtotales intermedios también exactos:
//     Total Recursos Fútbol Profesional sin transferencias (35.727199339 M),
//     Total Gastos Fútbol Profesional (39.531434862 M), Total Otros Gastos
//     Ordinarios (12.263955172 M), Total Otros Recursos Ordinarios
//     (4.470594687 M).
//   2025: revenueLines suman 73164.540148 M (= officialTotalRevenue exacto).
//     |expenseLines| suman 72560.192543 M (= officialTotalExpenses exacto).
//     73164.540148 - 72560.192543 - 41.692293 + 0 = 562.655312 M = EXACTO
//     el "RESULTADO DEL EJERCICIO - SUPERAVIT" impreso (562.655.312 ARS).
//     Subtotales intermedios exactos: Total Recursos Fútbol Profesional sin
//     transferencias (46.492143755 M), Total Gastos Fútbol Profesional
//     (53.007037703 M), Total Otros Gastos Estructura (19.553154840 M),
//     Total Otros Recursos (3.709783732 M).
//   Los ~90 sub-ítems de `items` (desglose de cada línea de primer nivel,
//   Anexos III/IV de 2024 y IV/V de 2025) también reconciliaron EXACTOS
//   contra el valor de su línea padre, uno por uno, antes de cargar.
// ============================================================================

const talleresArRevenueLinesByYear = {
  2024: [
    { rawLabel:'Ingresos por publicidad - Aliados estratégicos', normalizedCategory:'sponsorship_commercial', amountNative:2741.239693, disclosureLevel:'detailed', items:[
      ['Ingresos por publicidad', 1888.219993], ['Ingresos por sponsoreo', 861.996820], ['Gastos por colocación de tarjetas', -8.977120],
    ]},
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:14942.210788, disclosureLevel:'detailed', items:[
      ['Ingresos socios', 14942.210788],
    ]},
    { rawLabel:'Partidos fútbol profesional', normalizedCategory:'matchday_competition', amountNative:187.425550, disclosureLevel:'detailed', items:[
      ['Entradas Generales - mayor', 185.945176], ['Plateas Generales - menor/jubilado', 0], ['Plateas Gasparini - mayor', 0.445409],
      ['Plateas Ardiles - mayor', 0.866757], ['Plateas Sur', 0.168208],
    ]},
    { rawLabel:'Ingresos AFA derechos televisación y otros', normalizedCategory:'broadcasting', amountNative:4310.144660, disclosureLevel:'detailed', items:[
      ['Ingresos AFA - derechos televisación', 4310.144660],
    ]},
    { rawLabel:'Otros ingresos socios', normalizedCategory:'member_dues', amountNative:453.165720, disclosureLevel:'detailed', items:[
      ['Emisión carnet', 194.165818], ['Ingresos especiales', 179.614383], ['Otros ingresos', 79.385519],
    ]},
    { rawLabel:'Partidos amistosos', normalizedCategory:'matchday_competition', amountNative:67.704585, disclosureLevel:'detailed', items:[
      ['Partidos amistosos', 67.704585],
    ]},
    { rawLabel:'Partidos de copas', normalizedCategory:'matchday_competition', amountNative:8949.051956, disclosureLevel:'detailed', items:[
      ['Copas locales', 57.217056], ['Copas internacionales', 8891.834900],
    ]},
    { rawLabel:'Ingresos concesiones gastronomía', normalizedCategory:'stadium_other', amountNative:20.803953, disclosureLevel:'detailed', items:[
      ['Ingresos por concesiones merchandising', 1.518314], ['Ingresos por concesiones de bar', 19.285639],
    ]},
    { rawLabel:'Otros ingresos fútbol profesional', normalizedCategory:'other_income', amountNative:4055.452434, disclosureLevel:'detailed', items:[
      ['Préstamos de jugadores y derechos de preferencia', 2001.419157], ['Mecanismo de solidaridad', 287.935076],
      ['Ingresos por cargas sociales - Decreto 510 (ex-1212)', 1382.165462], ['Otros ingresos service charge', 383.932739],
    ]},
    { rawLabel:'Total por transferencias de Derechos Económicos (neto)', normalizedCategory:'player_sales', amountNative:26654.277641, disclosureLevel:'aggregated_residual', items:[
      ['Ingreso por transferencias de derechos económicos', 41335.343337], ['Costo computable de los activos transferidos', -6177.050546],
      ['Gastos de transferencia', -8504.015150],
    ]},
    { rawLabel:'Ingresos por tienda netos de costo de venta', normalizedCategory:'sponsorship_commercial', amountNative:1269.257920, disclosureLevel:'detailed', items:[
      ['Indumentaria oficial', 5547.365964], ['Indumentaria otros', 1166.181523], ['Merchandising', 352.670188],
      ['Ventas anteriores tienda', 0], ['Otros ingresos tienda', 53.043226], ['Costos de mercadería vendida', -5850.002981],
    ]},
    { rawLabel:'Ingresos deportes amateurs', normalizedCategory:'youth_football', amountNative:149.241302, disclosureLevel:'detailed', items:[
      ['Entradas futbol amateur', 12.182210], ['Cuotas', 41.610618], ['Otros ingresos deportes amateur', 95.448474],
    ]},
    { rawLabel:'Otros ingresos ordinarios', normalizedCategory:'other_income', amountNative:3052.095465, disclosureLevel:'detailed', items:[
      ['Otros ingresos', 443.518387], ['Donaciones', 2602.995182], ['Recupero gastos administrativos', 5.581896],
    ]},
  ],
  2025: [
    { rawLabel:'Ingresos por publicidad - Aliados estratégicos', normalizedCategory:'sponsorship_commercial', amountNative:5506.892384, disclosureLevel:'detailed', items:[
      ['Ingresos por publicidad', 2219.582874], ['Ingresos por sponsoreo', 3304.156365], ['Comisión de terceros por intermediación', -16.846855],
    ]},
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:19330.446335, disclosureLevel:'detailed', items:[
      ['Ingresos socios', 19330.446335],
    ]},
    { rawLabel:'Partidos fútbol profesional', normalizedCategory:'matchday_competition', amountNative:24.470236, disclosureLevel:'detailed', items:[
      ['Entradas Generales', 9.281006], ['Plateas Gasparini', 5.039578], ['Plateas Ardiles', 10.149652], ['Plateas Sur', 0],
    ]},
    { rawLabel:'Ingresos derechos televisación y otros', normalizedCategory:'broadcasting', amountNative:7864.877880, disclosureLevel:'detailed', items:[
      ['Ingresos derechos televisación', 7864.877880],
    ]},
    { rawLabel:'Otros ingresos socios', normalizedCategory:'member_dues', amountNative:57.248160, disclosureLevel:'detailed', items:[
      ['Emisión carnet', 57.248160], ['Ingresos especiales', 0],
    ]},
    { rawLabel:'Partidos de copas', normalizedCategory:'matchday_competition', amountNative:6559.572424, disclosureLevel:'detailed', items:[
      ['Copas locales', 484.808504], ['Copas internacionales', 6074.763920],
    ]},
    { rawLabel:'Ingresos concesiones', normalizedCategory:'stadium_other', amountNative:15.682623, disclosureLevel:'detailed', items:[
      ['Ingresos por concesiones', 15.210731], ['Ingresos por concesiones de bar', 0.471892],
    ]},
    { rawLabel:'Otros ingresos fútbol profesional', normalizedCategory:'other_income', amountNative:7132.953713, disclosureLevel:'detailed', items:[
      ['Préstamos de jugadores y derechos de preferencia', 1805.025056], ['Otros ingresos futbol profesional', 2315.391736],
      ['Mecanismo de solidaridad', 165.260346], ['Ingresos por cargas sociales - Decreto 510 (ex-1212)', 2663.788307],
      ['Otros ingresos service charge', 183.488268],
    ]},
    { rawLabel:'Total por transferencias de Derechos Económicos (neto)', normalizedCategory:'player_sales', amountNative:22962.612661, disclosureLevel:'aggregated_residual', items:[
      ['Ingreso por transferencias de derechos económicos', 34473.063362], ['Costo computable de los activos transferidos', -8013.599864],
      ['Gastos de transferencia', -3496.850837],
    ]},
    { rawLabel:'Ingresos por tienda netos de costo de venta', normalizedCategory:'sponsorship_commercial', amountNative:2635.397905, disclosureLevel:'detailed', items:[
      ['Indumentaria oficial', 6212.391367], ['Indumentaria otros', 599.338594], ['Merchandising', 425.850757],
      ['Otros ingresos tienda', 46.629298], ['Costos de mercadería vendida', -4648.812111],
    ]},
    { rawLabel:'Ingresos deportes amateurs', normalizedCategory:'youth_football', amountNative:213.562146, disclosureLevel:'detailed', items:[
      ['Entradas futbol amateur', 20.871429], ['Cuotas', 52.431210], ['Otros ingresos deportes amateur', 140.259507],
    ]},
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:860.823681, disclosureLevel:'detailed', items:[
      ['Otros ingresos', 488.645932], ['Donaciones', 372.099464], ['Recupero gastos administrativos', 0.078285],
    ]},
  ],
};

const talleresArExpenseLinesByYear = {
  2024: [
    { rawLabel:'Plantel y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-10162.603075, disclosureLevel:'detailed', items:[
      ['Sueldos y cargas sociales', -2882.344340], ['Reconocimiento trayectoria', -3309.226503], ['Premios', -3852.580394], ['Otros gastos en personal', -118.451838],
    ]},
    { rawLabel:'Alojamiento, movilidad y atención médica', normalizedCategory:'match_organisation_expense', amountNative:-3120.886457, disclosureLevel:'detailed', items:[
      ['Alojamiento', -689.663061], ['Pasajes', -1303.099491], ['Viáticos', -520.533268], ['Almuerzos y cenas', -429.771600],
      ['Seguros', -45.748251], ['Atención médica y gastos de farmacia', -132.070786],
    ]},
    { rawLabel:'Gastos operativos de partidos', normalizedCategory:'match_organisation_expense', amountNative:-1675.372637, disclosureLevel:'detailed', items:[
      ['Servicio policial', -561.822044], ['Alquiler de vallas y generadores', -313.427466], ['Servicio de control de acceso', -295.069497],
      ['Servicio de sonido', -36.639688], ['Boleteros', -1.133333], ['Colocación de vallas y cartelería', -14.759788],
      ['Entradas seguridad', 0], ['Gastos varios', -100.742053], ['Habilitación municipal', -0.073722], ['Imprenta entradas', 0],
      ['Multas', -194.417962], ['Participación club visitante', -17.970430], ['Seguro espectador', -83.836128], ['Entradas de protocolo', -55.480526],
    ]},
    { rawLabel:'Honorarios y viáticos', normalizedCategory:'match_organisation_expense', amountNative:-785.074469, disclosureLevel:'detailed', items:[
      ['Honorarios y viáticos personal', -737.707285], ['Honorarios y traslado árbitros', -47.367184],
    ]},
    { rawLabel:'Aportes A.F.A. y L.C.F.', normalizedCategory:'match_organisation_expense', amountNative:-310.833151, disclosureLevel:'detailed', items:[
      ['Aporte LCF', -231.850486], ['Aportes AFA', -70.480861], ['Inscripción copas internacionales', -5.717494], ['AFA - otros gastos', -2.784310],
    ]},
    { rawLabel:'Alquileres y expensas', normalizedCategory:'admin_general_expense', amountNative:-521.656983, disclosureLevel:'detailed', items:[
      ['Viviendas', -49.442171], ['Locales', -117.479428], ['Expensas', -61.466187], ['Otros alquileres', -293.269197],
    ]},
    { rawLabel:'Amortización de activos deportivos', normalizedCategory:'player_amortisation', amountNative:-17647.192347, disclosureLevel:'detailed', items:[
      ['Amortización jugadores fútbol profesional', -17647.192347],
    ]},
    { rawLabel:'Prestamos, comisiones, gto. transferencias', normalizedCategory:'other_expenses', amountNative:-4719.255755, disclosureLevel:'detailed', items:[
      ['Préstamo de jugadores y derechos de preferencia', -941.545304], ['Costo por rescisiones de contratos', -894.277810],
      ['Gastos y comisiones transferencias', -2414.099720], ['Mecanismo solidaridad', -469.332921], ['Bono por uso del jugador', 0],
    ]},
    { rawLabel:'Inscripciones jugadores y técnicos', normalizedCategory:'match_organisation_expense', amountNative:-8.132518, disclosureLevel:'detailed', items:[
      ['Inscripciones jugadores AFA y LCF', -8.080097], ['Inscripciones técnicos AFA', -0.052421],
    ]},
    { rawLabel:'Otros gastos de entrenamientos', normalizedCategory:'match_organisation_expense', amountNative:-94.567079, disclosureLevel:'detailed', items:[
      ['Pelotas y elementos para entrenar', -24.045553], ['Gastos varios de entrenamiento', -70.521526],
    ]},
    { rawLabel:'Otros gastos (fútbol profesional)', normalizedCategory:'other_expenses', amountNative:-485.860391, disclosureLevel:'detailed', items:[
      ['Gastos de utilería', -5.755827], ['Alquiler de canchas', -10.172743], ['Gastos varios', -226.044623], ['Service charge - socios y partidos', -243.887198],
    ]},
    { rawLabel:'Gastos por sueldos y cargas sociales ord.', normalizedCategory:'admin_general_expense', amountNative:-5021.677229, disclosureLevel:'detailed', items:[
      ['Gastos por sueldos y cargas sociales', -4972.302014], ['Mercadería personal interno', -49.375215],
    ]},
    { rawLabel:'Gastos impositivos', normalizedCategory:'admin_general_expense', amountNative:-1644.386187, disclosureLevel:'detailed', items:[
      ['Iva no computable', -388.091403], ['Impuesto a los débitos bancarios', -349.705955], ['Impuesto a los créditos bancarios', -322.711777],
      ['Otros impuestos', -505.586785], ['Comercio e Industria', -78.290267],
    ]},
    { rawLabel:'Gastos departamentos de servicios', normalizedCategory:'admin_general_expense', amountNative:-2791.599591, disclosureLevel:'detailed', items:[
      ['Comisiones por tarjetas', -513.483982], ['Gastos bancarios', -152.487232], ['Servicio técnico', -584.140609],
      ['Librería y gastos de oficina', -197.246480], ['Gastos de movilidad personal', -8.295940], ['Gastos de escribanía', -0.393414],
      ['Artículos de limpieza', -28.127318], ['Insumos para carnet', -27.143320], ['Servicios dispenser de agua', -4.222551],
      ['Fletes y encomiendas', -20.049979], ['Gastos área social', -18.666072], ['Honorarios y costas judiciales', -207.728191],
      ['Honorarios médicos', -1.267226], ['Aguas cordobesas', -12.413122], ['Ecogas', -1.035557], ['Epec', -52.114936],
      ['Telefonía fija', -58.140328], ['Servicio de cable e internet', -66.973386], ['Telefonía celular', -7.898500],
      ['Honorarios contables', -52.742616], ['Gastos varios de administración', -166.186982], ['Servicio de limpieza', -98.452877],
      ['Gastos de representación', -119.429109], ['Mercadería de protocolo', -68.428166], ['Gastos y comisiones mercado pago', -324.531698],
    ]},
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-1336.866091, disclosureLevel:'detailed', items:[
      ['Artículos de electricidad', -12.438842], ['Canchas sembrado', -35.181281], ['Combustible', -26.628907], ['Ferretería', -20.134865],
      ['Fletes contenedores', -12.922909], ['Gas a granel', -3.042859], ['Indumentaria personal', -7.844495], ['Mano de obra', -282.403406],
      ['Matafuegos y otros', -1.057431], ['Materiales construcción', -52.851742], ['Pinturería', -19.754289], ['Reparaciones maquinas', -2.936593],
      ['Mantenimientos varios', -7.380169], ['Seguridad', -831.348553], ['Sistemas de riego', -3.887235], ['Tratamiento de residuos', -15.738869],
      ['Gastos por obras', -1.313646],
    ]},
    { rawLabel:'Gastos de prensa y eventos', normalizedCategory:'admin_general_expense', amountNative:-231.959211, disclosureLevel:'detailed', items:[
      ['Gastos de prensa y eventos', -231.959211],
    ]},
    { rawLabel:'Quebranto previsión deud. incobrables', normalizedCategory:'admin_general_expense', amountNative:-161.392326, disclosureLevel:'detailed', items:[
      ['Quebranto deudores incobrables', -161.392326],
    ]},
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-1071.194810, disclosureLevel:'detailed', items:[
      ['Amortización muebles útiles e instalaciones', -273.134207], ['Amortización equipos de computación', -149.107700],
      ['Amortización máquinas y herramientas', -131.319945], ['Amortización RT 31', -71.291275], ['Amortización inmuebles', -429.292680],
      ['Amortización rodados', -17.049003],
    ]},
    { rawLabel:'Otros gastos ordinarios', normalizedCategory:'youth_other_sports_expense', amountNative:-4.879727, disclosureLevel:'detailed', items:[
      ['Básquet', -3.229709], ['Vóley', -0.341523], ['Patín', -0.143623], ['Deportes Amateurs', 0], ['Donaciones', -1.111772], ['Varios', -0.053100],
    ]},
  ],
  2025: [
    { rawLabel:'Plantel y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-14033.133345, disclosureLevel:'detailed', items:[
      ['Sueldos y cargas sociales', -5138.150752], ['Reconocimiento trayectoria', -6152.290803], ['Premios', -2394.255228], ['Otros gastos en personal', -348.436562],
    ]},
    { rawLabel:'Alojamiento, movilidad y atención médica', normalizedCategory:'match_organisation_expense', amountNative:-4191.582415, disclosureLevel:'detailed', items:[
      ['Alojamiento', -975.479856], ['Pasajes', -1477.452703], ['Viáticos', -764.942053], ['Almuerzos y cenas', -678.415159],
      ['Seguros', -55.662427], ['Atención médica y gastos de farmacia', -239.630217],
    ]},
    { rawLabel:'Gastos operativos de partidos', normalizedCategory:'match_organisation_expense', amountNative:-2408.573547, disclosureLevel:'detailed', items:[
      ['Servicio policial', -815.827179], ['Alquiler de vallas y generadores', -374.853440], ['Servicio de control de acceso', -300.168276],
      ['Servicio de sonido', -38.433433], ['Boleteros', -1.615915], ['Colocación de vallas y cartelería', -30.839016],
      ['Gastos varios', -309.387230], ['Habilitación municipal', -0.045030], ['Multas', -258.858340], ['Participación club visitante', 0],
      ['Seguro espectador', -245.157675], ['Entradas de protocolo', -33.388013],
    ]},
    { rawLabel:'Honorarios y viáticos', normalizedCategory:'match_organisation_expense', amountNative:-840.887802, disclosureLevel:'detailed', items:[
      ['Honorarios y viáticos personal', -787.117848], ['Honorarios y traslado árbitros', -53.769954],
    ]},
    { rawLabel:'Aportes A.F.A. y L.C.F.', normalizedCategory:'match_organisation_expense', amountNative:-270.335198, disclosureLevel:'detailed', items:[
      ['Aporte LCF', -226.557488], ['Aportes AFA', -33.700711], ['Inscripción copas internacionales', -7.019754], ['AFA - otros gastos', -3.057245],
    ]},
    { rawLabel:'Alquileres y expensas', normalizedCategory:'admin_general_expense', amountNative:-311.590318, disclosureLevel:'detailed', items:[
      ['Viviendas', -13.774061], ['Locales', -172.036496], ['Expensas', -40.077314], ['Otros alquileres', -85.702447],
    ]},
    { rawLabel:'Amortización de activos deportivos', normalizedCategory:'player_amortisation', amountNative:-27289.404336, disclosureLevel:'detailed', items:[
      ['Amortización jugadores fútbol profesional (Anexo I)', -27289.404336],
    ]},
    { rawLabel:'Prestamos, gto. mercado y rescisiones', normalizedCategory:'other_expenses', amountNative:-3369.721904, disclosureLevel:'detailed', items:[
      ['Préstamo de jugadores y derechos de preferencia', -712.229000], ['Costo por rescisiones de contratos', -1591.689879],
      ['Gastos y comisiones transferencias', -955.159843], ['Mecanismo solidaridad', -110.643182],
    ]},
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-187.401476, disclosureLevel:'detailed', items:[
      ['Gastos de utilería', -2.581774], ['Alquiler de canchas', -5.710260], ['Gastos varios', -0.622510], ['Service charge - socios y partidos', -178.486932],
    ]},
    { rawLabel:'Otros gastos de entrenamientos', normalizedCategory:'match_organisation_expense', amountNative:-87.951523, disclosureLevel:'detailed', items:[
      ['Pelotas y elementos para entrenar', -23.820211], ['Gastos varios de entrenamiento', -64.131312],
    ]},
    { rawLabel:'Inscripciones jugadores y técnicos', normalizedCategory:'match_organisation_expense', amountNative:-16.455839, disclosureLevel:'detailed', items:[
      ['Inscripciones jugadores AFA y LCF', -4.652471], ['Inscripciones técnicos AFA', -11.803368],
    ]},
    { rawLabel:'Gastos por sueldos y cargas sociales', normalizedCategory:'admin_general_expense', amountNative:-10727.728475, disclosureLevel:'detailed', items:[
      ['Gastos por sueldos y cargas sociales', -10646.462531], ['Indumentaria personal interno', -81.265944],
    ]},
    { rawLabel:'Gastos impositivos', normalizedCategory:'admin_general_expense', amountNative:-1527.375420, disclosureLevel:'detailed', items:[
      ['Iva no computable', -677.271586], ['Impuesto a los débitos bancarios', -403.778999], ['Impuesto a los créditos bancarios', -332.518654],
      ['Otros impuestos', -32.820840], ['Comercio e Industria', -80.985341],
    ]},
    { rawLabel:'Gastos departamentos de servicios', normalizedCategory:'admin_general_expense', amountNative:-3961.349371, disclosureLevel:'detailed', items:[
      ['Comisiones por tarjetas', -557.604555], ['Gastos bancarios', -114.423575], ['Servicio técnico', -920.548951],
      ['Librería y gastos de oficina', -285.955776], ['Gastos de movilidad personal', -5.382119], ['Gastos de escribanía', -3.514327],
      ['Artículos de limpieza', -17.903716], ['Insumos para carnet', -12.568754], ['Servicios dispenser de agua', -11.439040],
      ['Fletes y encomiendas', -22.500753], ['Gastos área social', -16.037002], ['Honorarios y costas judiciales', -871.731019],
      ['Honorarios médicos', -43.908569], ['Aguas cordobesas', -23.017912], ['Ecogas', -1.780482], ['Epec', -95.426332],
      ['Telefonía fija', 0], ['Servicio de cable e internet', -85.251191], ['Telefonía celular', -59.576611],
      ['Honorarios contables', -69.979720], ['Gastos varios de administración', -172.688640], ['Servicio de limpieza', -85.613535],
      ['Gastos de representación', -193.157744], ['Mercadería de protocolo', -134.775907], ['Gastos y comisiones mercado pago', -156.563141],
    ]},
    { rawLabel:'Gastos de preparación de jugadores de inferiores', normalizedCategory:'youth_other_sports_expense', amountNative:-386.869215, disclosureLevel:'detailed', items:[
      ['Gastos de preparación de jugadores inferiores', -386.869215],
    ]},
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-1433.299331, disclosureLevel:'detailed', items:[
      ['Artículos de electricidad', -6.192469], ['Canchas sembrado', -21.947767], ['Combustible', -33.349903], ['Ferretería', -8.857282],
      ['Fletes contenedores', -15.856894], ['Gas a granel', -2.937357], ['Indumentaria personal', -14.536660], ['Mano de obra', -49.392592],
      ['Matafuegos y otros', -3.286808], ['Materiales construcción', -131.242976], ['Pinturería', -2.082187], ['Reparaciones maquinas', -7.362820],
      ['Mantenimientos varios', -27.658225], ['Seguridad', -1079.495402], ['Sistemas de riego', -0.856238], ['Tratamiento de residuos', -28.243751],
      ['Gastos por obras', 0],
    ]},
    { rawLabel:'Gastos de prensa y eventos', normalizedCategory:'admin_general_expense', amountNative:-393.266683, disclosureLevel:'detailed', items:[
      ['Gastos de prensa y eventos', -393.266683],
    ]},
    { rawLabel:'Quebranto previsión deudores incobrables', normalizedCategory:'admin_general_expense', amountNative:-1.349431, disclosureLevel:'detailed', items:[
      ['Quebranto deudores incobrables', -1.349431],
    ]},
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-1100.167905, disclosureLevel:'detailed', items:[
      ['Amortización muebles útiles e instalaciones', -347.225791], ['Amortización equipos de computación', -154.107748],
      ['Amortización máquinas y herramientas', -166.892798], ['Amortización modelo de revaluación', -47.038700],
      ['Amortización inmuebles', -348.223383], ['Amortización rodados', -36.679485],
    ]},
    { rawLabel:'Otros gastos (estructura)', normalizedCategory:'youth_other_sports_expense', amountNative:-21.749009, disclosureLevel:'detailed', items:[
      ['Básquet', -7.798532], ['Vóley', -1.913189], ['Patín', -1.186617], ['Donaciones', -4.947088], ['Varios', -5.903583],
    ]},
  ],
};

const talleresArFiscalYearMeta = {
  2024: {
    currency:'ARS', fxRef:'ARS@2024-12-31', fxSource:'market_close',
    sourceId:'talleres-ar-estados-contables-2024',
    reportType:'official_balance_sheet',
    gestionId:'fassi',
    // netInterest = Diferencias de cambio (-2118.541842) + Resultados por tenencia e intereses
    // (5166.919133) + Recpam (-4908.625656) = -1860.248365 M ARS.
    netInterest:-1860.248365,
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = "Cuentas por pagar" (Nota 2.6, corriente+no corriente: proveedores + deudas con
    // clubes + tarjetas + cheques diferidos + AFA/LCF + provisión de fútbol profesional),
    // EXCLUYE Remuneraciones y cargas sociales, Cargas fiscales, Otros pasivos y Previsiones —
    // mismo criterio de "línea más angosta" que Boca/Vélez (club-data-mapping SKILL.md sección 14).
    // cash = Caja y bancos (Estado de Situación Patrimonial, Activo Corriente).
    grossDebt:21486.534385, cash:220.025129,
    officialTotalRevenue:66852.071667, officialTotalExpenses:51795.390034, officialPAT:13196.433268,
  },
  2025: {
    currency:'ARS', fxRef:'ARS@2025-12-31', fxSource:'market_close',
    sourceId:'talleres-ar-estados-contables-2025',
    reportType:'official_balance_sheet',
    gestionId:'fassi',
    // netInterest = "Resultados financieros y por tenencia" (línea única, el documento no la
    // desglosa en el propio Estado de Recursos y Gastos de 2025).
    netInterest:-41.692293,
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = "Deudas con proveedores" (Estado de Situación Patrimonial, Pasivo Corriente),
    // equivalente 2025 de "Cuentas por pagar" de 2024 (mismo criterio, el balance reordenó las
    // etiquetas del pasivo entre un año y otro pero mantiene la separación deudas operativas/pases
    // vs. Deudas fiscales/laborales/Otras deudas/Previsiones).
    grossDebt:30269.641516, cash:519.884887,
    officialTotalRevenue:73164.540148, officialTotalExpenses:72560.192543, officialPAT:562.655312,
  },
};

const talleresArPresupuestoOverlayByYear = {};
const talleresArPasesData = []; const talleresArResultadosData = {}; const talleresArTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['talleres-ar'] = {
  revenueLinesByYear: talleresArRevenueLinesByYear, expenseLinesByYear: talleresArExpenseLinesByYear,
  fiscalYearMeta: talleresArFiscalYearMeta, pasesData: talleresArPasesData,
  resultadosData: talleresArResultadosData, titulosData: talleresArTitulosData,
  presupuestoOverlayByYear: talleresArPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'talleres-ar-estados-contables-2024': {
    id:'talleres-ar-estados-contables-2024', clubId:'talleres-ar',
    title:'Estados Contables por el ejercicio finalizado el 31 de diciembre de 2024 (Club Atlético Talleres Asociación Civil)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de clubtalleres.com.ar (nota de prensa de la Asamblea, no de una sección fija de transparencia — ver fuentes/Argentina/Talleres.md). Auditado, con Informe de la Comisión Revisora de Cuentas. Expresado en moneda homogénea (RT6) a la fecha de cierre. Ejercicio CALENDARIO (1/1/2024-31/12/2024). El Anexo V (Moneda Extranjera) no declara un tipo de cambio de cierre único — ver comentario de cabecera de data/talleres-ar-data.js. Transcripción completa en Clubes/Argentina/Talleres/estados-contables-2024.md.',
  },
  'talleres-ar-estados-contables-2025': {
    id:'talleres-ar-estados-contables-2025', clubId:'talleres-ar',
    title:'Estados Contables por el ejercicio finalizado el 31 de diciembre de 2025 (Club Atlético Talleres Asociación Civil)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de clubtalleres.com.ar (nota de prensa de la Asamblea 2026 — ver fuentes/Argentina/Talleres.md). Auditado, con Informe de la Comisión Revisora de Cuentas. Expresado en moneda homogénea (RT6) a la fecha de cierre. Ejercicio CALENDARIO (1/1/2025-31/12/2025). Transcripción completa en Clubes/Argentina/Talleres/estados-contables-2025.md.',
  },
});

gestionesByClub['talleres-ar'] = {
  fassi: { nombre:'Andrés Miguel Fassi (Presidente)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['talleres-ar'] = null;

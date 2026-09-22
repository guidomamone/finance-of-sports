// ============================================================================
// data/racing-data.js — Racing Club: Milito (2024-actual) y Blanco (2013-2024).
//
// Ejercicios 2024, 2025, 2026 y 2027 = REALES, del archivo oficial completo de
// racingclub.com.ar/informes/ (~24 PDFs 2009-2027, guardados en
// finance-of-sports/Clubes/Argentina/Racing/). A diferencia de Boca y River, estos PDFs
// tienen texto extraíble directo (no son escaneos) — se procesaron con
// pdftotext + Python, sin necesidad del Read tool con imágenes.
//
// - Ejercicio 2021 (Ejercicio Nro. 119, irregular de 10 meses, 1°/9/2020 al 30/6/2021, transición
//   del cierre de agosto a junio) = balance auditado real, sin presupuesto propio en el archivo.
//   SUPERÁVIT real, chico: $7.012.082 ARS.
// - Ejercicio 2024 (Ejercicio Nro. 122, 1°/7/2023 al 30/6/2024, última
//   temporada de Blanco) = balance auditado real. DÉFICIT del ejercicio
//   real: $(6.127.619.872) ARS — muy distinto del viejo placeholder que
//   mostraba un superávit inventado.
// - Ejercicio 2025 (Ejercicio Nro. 123, 1°/7/2024 al 30/6/2025) = balance
//   auditado real, firmado por Diego Milito como Presidente — la mayor
//   parte del ejercicio cae bajo su gestión (asumió 20/12/2024) así que se
//   asignó completo a "milito", mismo criterio que ya se usa para
//   resultados deportivos por fecha exacta. DÉFICIT real, mucho más chico:
//   $(178.451.821) ARS.
// - Ejercicio 2026 (Presupuesto 2025-26, 1°/7/2025 al 30/6/2026) = presupuesto
//   oficial real (un presupuesto financiero de ingresos/egresos mensual con
//   ~50 líneas).
// - Ejercicio 2027 (Presupuesto 2026-27, 1°/7/2026 al 30/6/2027) = presupuesto
//   oficial real, mismo formato que 2026 (ver presupuesto2026-27.md), cargado
//   en la Versión 32. Todavía vigente (no cerró) a la fecha de esta carga.
//
// CONVERSIÓN A USD (Versión 32 — REESCRITO): hasta la Versión 31, este archivo
// guardaba amountNative YA CONVERTIDO a USD para 2024/2025/2026, y River/Racing
// no tenían toggle USD/ARS (siempre mostraban USD). A partir de la Versión 32,
// Racing sigue el mismo patrón que Boca: amountNative se guarda en ARS
// MILLONES NATIVOS (tal cual el balance/presupuesto), y la conversión a USD
// pasa al momento de renderizar (yearMetaFor('racing', year) + toDisplayValue,
// igual que yearMeta/toDisplayValue de Boca) — nunca se guarda un valor
// pre-convertido. Esto es lo que permite el toggle USD/ARS en vivo para
// Racing (antes solo existía para Boca).
//
// Tipo de cambio por ejercicio — REGLA NUEVA (Versión 32, ver también
// finance-of-sports/.claude/skills/club-data-mapping/SKILL.md sección 5):
// para un ejercicio CERRADO, si el propio balance declara su tipo de cambio
// de cierre (buscar "Activos y pasivos en moneda extranjera" / Anexo con
// columna "Tipo de Cambio" cerca de Caja y bancos en moneda extranjera), se
// usa ESE valor declarado por el club, no una cotización externa investigada
// a mano. Se encontró y corrigió una diferencia real: el balance 2023-24
// (Anexo VI, pág. 30) declara $909,00 al 30/6/2024 (antes se usaba $912,
// una cotización de Rava Bursátil buscada a mano); el balance 2024-25 (Anexo
// VI, pág. 31) declara $1.196,00 al 30/6/2025 (antes $1.203). La diferencia
// es chica pero la regla es más fiel a la fuente y evita mezclar el criterio
// del club con una investigación externa cuando el documento ya lo dice.
// - 2021 (Ejercicio N° 119, irregular de 10 meses): $95,52 (declarado, Anexo V del balance 2021,
//   pág. 30), usado sin excepciones en TODO el Anexo (a diferencia del Anexo V de 2020, que tenía
//   una inconsistencia puntual de 3 líneas en $74,18 vs. $73,98 dominante).
// - 2024: $909,00 (declarado, Anexo VI del balance 2023-24, pág. 30).
// - 2025: $1.196,00 (declarado, Anexo VI del balance 2024-25, pág. 31).
// - 2026 (presupuesto, sin cerrar todavía): $1.438 promedio, que el propio
//   presupuesto declara como premisa ("Tipo de Cambio: Se prevé un tipo de
//   cambio promedio de $1.438 por dólar estadounidense").
// - 2027 (presupuesto, sin cerrar): el propio presupuesto declara DOS puntos
//   ("$1.505 para Julio 2026 y $1.870 para Junio 2027"), no un promedio
//   único — se promedian esos dos valores ($1.687,5), mismo criterio que usa
//   Boca para su Presupuesto 2027 (promedio inicio/cierre declarado).
//
// IMPORTANTE — de qué columna del balance sale cada número (Versión 32): un
// balance en "moneda homogénea" (RT 6) REEXPRESA el ejercicio comparativo
// (el anterior) a la fecha de cierre del ejercicio ACTUAL cada vez que se
// imprime un balance nuevo — por eso la columna "2024" que aparece DENTRO
// del balance 2024-25 (como comparativo) NO es igual a la columna "2024" que
// aparece como año corriente DENTRO del balance 2023-24 (están reexpresadas
// a fechas de cierre distintas, 30/6/2025 vs. 30/6/2024). Para cargar un
// ejercicio, hay que usar SIEMPRE la columna "año corriente" del balance DE
// ESE MISMO ejercicio (nunca la columna comparativa de un balance posterior)
// — si no, se mezclan dos poderes adquisitivos distintos sin darse cuenta.
// Ya pasó acá: la columna "2024" del balance 2024-25 imprime $92.529.945.669
// de recursos ordinarios, muy distinto de los $66.367.712.489 que imprime el
// balance 2023-24 (su propio año corriente) — la primera cifra está
// reexpresada a 30/6/2025, la segunda a 30/6/2024. Se usó siempre la
// columna de año corriente del balance del ejercicio que se está cargando.
//
// Racing NO separa "Préstamos"/deuda financiera del resto del pasivo en su
// balance (a diferencia de Boca y River, que sí tienen una línea "Deudas"
// o "Préstamos" propia) — el balance de Racing solo tiene Deudas
// comerciales/sociales/fiscales/otras + Previsiones, todas juntas. Por eso
// grossDebt acá es el TOTAL DEL PASIVO completo (Estado de situación
// patrimonial, no la Anexo de moneda extranjera), no una deuda financiera
// aislada — es lo más parecido a "deuda" que el documento ofrece, pero
// hay que leerlo como "todo lo que Racing debe", no como préstamos bancarios.
//
// "Costo transferencia de jugadores" y "Transferencia de jugadores" NO se
// netean entre sí (a diferencia de Boca, donde el balance sí las separa
// pero el sitio las junta en "Ganancia por venta de jugadores"): acá van
// como dos líneas ordinarias más, exactamente como las presenta el propio
// Estado de Recursos y Gastos de Racing (no hay una línea "ganancia neta
// por pases" en el documento — meterlas dentro de Ingresos/Gastos tal cual
// es más fiel al original que forzar un neteo que el club no hace).
//
// LOS RESULTADOS DEPORTIVOS (más abajo) SÍ SON REALES, a diferencia de las
// finanzas de Blanco: buscados y verificados vía web search en agosto de
// 2026. Ojo con el límite de fechas: la Copa Sudamericana 2024 se ganó el
// 23/11/2024, todavía bajo la presidencia de Blanco — Milito asumió recién
// el 20/12/2024, casi un mes después. Ese título queda contado en la
// gestión de Blanco, no en la de Milito (mismo criterio que ya se usó para
// separar a Riquelme de Ameal en Boca).
// ============================================================================

// Ejercicios 2009, 2010, 2011 (Ejercicios N° 107, 108, 109 — ciclo noviembre a octubre, distinto
// del ciclo julio-junio que usa Racing desde años más recientes) = REALES, de los balances
// auditados oficiales bajados de racingclub.com.ar/informes/. A diferencia de los ejercicios 2024
// en adelante, estos PDFs tienen texto extraíble nativo — no hizo falta OCR. Balances 2012-2018
// (y los presupuestos 2013-14/2015-16/2018-19/2019-20), en cambio, SÍ son escaneos sin capa de
// texto (confirmado con pdftotext: ~1 char/página) — quedan pendientes de una extracción con el
// Read tool sobre imágenes de página, mucho más cara en tokens, para una sesión futura.
//
// OJO (Versión 32): a diferencia de 2024/2025/2026/2027, estos 3 años NO se re-extrajeron a ARS
// nativo — Guido decidió explícitamente no re-hacer esta extracción para 2009-2011 (documentos de
// una época sin moneda homogénea, y el propio balance NO declara un tipo de cambio propio como sí
// hacen los balances modernos — ver más abajo). amountNative acá sigue en USD YA CONVERTIDO (como
// estaba desde la Versión 20), y racingFiscalYearMeta guarda el mismo tipo de cambio ya usado para
// esa conversión (documentado abajo) para que el toggle USD/ARS de todas formas funcione: al pasar
// a ARS para estos 3 años, el sitio hace la cuenta inversa (USD × fx) — una reconstrucción
// aproximada, no el ARS nativo real, pero consistente con la nota de "estimado, no exacto" que ya
// tenían estos 3 años. Si en el futuro se re-extrae el ARS nativo real de estos 3 balances, este
// campo pasa a currency:'ARS' con amountNative en ARS, igual que 2024 en adelante.
//
// Conversión a USD: estos balances son de una época SIN moneda homogénea/reexpresión por
// inflación (eso es una práctica de RT 6 que se generalizó recién con la crisis inflacionaria de
// los 2020), así que se convirtieron directo a USD con el dólar mayorista de CIERRE de cada
// ejercicio: $3,82 al 31/10/2009, $3,98 al 31/10/2010, $4,27 al 31/10/2011. OJO: para 2010 y 2011
// no se encontró la cotización exacta del día (las fuentes consultadas no exponían el dato diario
// para fechas tan viejas) — se interpoló linealmente entre los valores de apertura y cierre de
// cada año calendario publicados por cotizacion-dolar.com.ar (2010: $3,82 en enero a $4,01 en
// diciembre; 2011: $4,01 en enero a $4,32 en diciembre). Es una aproximación, no una cotización
// exacta — para 2009 sí se encontró una cotización de fecha cercana real ($3,8475 el 2/10 y
// $3,819 el 2/11, ambas del mismo mes que el cierre del ejercicio).
//
// Verificación: para cada año, la suma de revenueLines + expenseLines + netInterest (ver
// racingFiscalYearMeta) da el RESULTADO FINAL que imprime el propio balance, con una diferencia
// de centésimas de millón de USD (ruido de la aproximación de tipo de cambio, no un error de
// carga): 2009 computado 0.704 vs impreso 0.703; 2010 computado -2.439 vs impreso -2.441; 2011
// computado 0.063 vs impreso 0.063 (exacto). Por esta inconsistencia entre años en cómo el propio
// documento agrupa "Amortizaciones" y "Resultados Financieros" dentro de sus totales de Ingresos y
// Gastos (a veces adentro de la tabla de Recursos/Gastos, a veces afuera), NO se agregaron checks
// de Revenue/Expenses por separado a verifyTieOuts() para estos 3 años — el check de PAT de arriba
// ya es una verificación real y suficiente de que ningún renglón se perdió o se contó dos veces.
//
// "Resultados Financieros" (intereses + diferencias de cambio, ganados y perdidos) NO se cargó
// como revenueLine/expenseLine: se llevó neto a `netInterest` en racingFiscalYearMeta, mismo
// criterio que ya usan 2024/2025/2026/2027 para profitOnPlayerSales/assetSales/netInterest/tax.
//
// Gestión: estos 3 ejercicios son ANTERIORES a la presidencia de Víctor Blanco (asumió recién en
// septiembre de 2013). Racing venía de una `quiebra` y un fideicomiso ("Blanquiceleste S.A.",
// 2000-2008) que se disolvió en 2008 por otra bancarrota — el propio balance de 2009 tiene una
// línea "Resultado Extraordinario s/Quiebra" que lo confirma. No se identificó con confianza quién
// presidía Racing específicamente en 2009-2011 (hubo varias administraciones cortas en ese tramo),
// así que estos 3 años se cargan SOLO en el selector "Año a año" (vía Object.keys de
// racingFiscalYearMeta, automático) — no se les asignó gestionId ni se agregaron a
// gestionesByClub.racing, para no inventar una atribución de gestión que no se pudo verificar.
const racingRevenueLinesByYear = {
  2009: [
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:2.001, disclosureLevel:'detailed' },
    { rawLabel:'Televisación', normalizedCategory:'broadcasting', amountNative:3.805, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales', normalizedCategory:'matchday_competition', amountNative:1.787, disclosureLevel:'detailed' },
    { rawLabel:'Otros torneos', normalizedCategory:'matchday_competition', amountNative:0.124, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos alquiler', normalizedCategory:'other_income', amountNative:0.132, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1.429, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos diversos', normalizedCategory:'other_income', amountNative:0.131, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos deportivos', normalizedCategory:'other_income', amountNative:0.19, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de jugadores', normalizedCategory:'player_sales', amountNative:10.587, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:0.132, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos colegio', normalizedCategory:'education', amountNative:0.155, disclosureLevel:'detailed' },
    { rawLabel:'Desafectación de previsiones y provisiones (extraordinario)', normalizedCategory:'exceptional_items', amountNative:2.355, disclosureLevel:'detailed' },
    { rawLabel:'Condonaciones (extraordinario)', normalizedCategory:'exceptional_items', amountNative:0.053, disclosureLevel:'detailed' },
  ],
  2010: [
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:3.296, disclosureLevel:'detailed' },
    { rawLabel:'Televisación', normalizedCategory:'broadcasting', amountNative:5.965, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales', normalizedCategory:'matchday_competition', amountNative:1.35, disclosureLevel:'detailed' },
    { rawLabel:'Otros torneos', normalizedCategory:'matchday_competition', amountNative:0.132, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos alquiler', normalizedCategory:'other_income', amountNative:0.221, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos publicidad', normalizedCategory:'sponsorship_commercial', amountNative:2.573, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos diversos', normalizedCategory:'other_income', amountNative:1.622, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos deportivos', normalizedCategory:'other_income', amountNative:0.138, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de jugadores', normalizedCategory:'player_sales', amountNative:2.549, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:0.137, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos colegio', normalizedCategory:'education', amountNative:0.343, disclosureLevel:'detailed' },
    { rawLabel:'Desafectación de previsiones (extraordinario)', normalizedCategory:'exceptional_items', amountNative:0.093, disclosureLevel:'detailed' },
  ],
  2011: [
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:5.671, disclosureLevel:'detailed' },
    { rawLabel:'Televisación', normalizedCategory:'broadcasting', amountNative:5.699, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales', normalizedCategory:'matchday_competition', amountNative:1.943, disclosureLevel:'detailed' },
    { rawLabel:'Otros torneos', normalizedCategory:'matchday_competition', amountNative:0.197, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos alquiler', normalizedCategory:'other_income', amountNative:0.159, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos publicidad', normalizedCategory:'sponsorship_commercial', amountNative:2.985, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos diversos', normalizedCategory:'other_income', amountNative:2.997, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos deportivos', normalizedCategory:'other_income', amountNative:0.158, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de jugadores', normalizedCategory:'player_sales', amountNative:4.844, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:0.151, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos colegio', normalizedCategory:'education', amountNative:0.673, disclosureLevel:'detailed' },
  ],
  // Ejercicio N° 110 (1°/11/2011 al 31/10/2012, PRE-Blanco, presidente Gastón Federico Cogorno,
  // `gestionId:null` mismo criterio que 2009/2010/2011) — `balance2012.pdf`, balance real
  // (`reportType:'official_balance_sheet'`). A diferencia de 2009-2011 (cargados en USD
  // ya-convertido), este ejercicio se cargó en ARS NATIVO (`currency:'ARS'`) con el fx que declara
  // el propio balance en su Anexo de Moneda Extranjera ($4,7260 por U$S, la tasa dominante del lado
  // Activo — el lado Pasivo usa $4,7660 para "Otros Pasivos", inconsistencia menor ya vista en
  // otros ejercicios de Racing, ej. 2019/2020). Mismos rubros "Generales/Específicos/Diversos"
  // (Anexo II) que 2009-2011, sin decisiones nuevas de categorización. Escaneo puro (25 páginas),
  // transcripto con el Read tool sobre imágenes de página — sin inclinación diagonal, pero los
  // Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página
  // portrait (`club-data-mapping/SKILL.md` sección 9). Fuente completa:
  // `Clubes/Argentina/Racing/racing-balance-2012.md`.
  //
  // Suma exacta a $184.791.901 (11 líneas ordinarias + "Desafectación de Previsiones/Provisiones"
  // como `exceptional_items`, $1.000.000) = el total real de Recursos Ordinarios+Extraordinarios
  // del Anexo II, EXCLUYENDO "Resultados Financieros" (que va a `netInterest` en el meta, no acá,
  // mismo criterio que 2009-2011). "Condonaciones" ($0) no se cargó como línea propia.
  2012: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:27.908682 },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:30.610592 },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:7.573676 },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:4.441797 },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:1.158378 },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:16.329828 },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:26.494900 },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:0.992412 },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:64.297016 },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:0.760321 },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:3.224299 },
    { rawLabel:'Desafectación de Previsiones y Provisiones (extraordinario)', normalizedCategory:'exceptional_items', amountNative:1.000000 },
  ],
  // Ejercicio N° 111 (1°/11/2012 al 31/10/2013) — `balance2013.pdf`, balance real
  // (`reportType:'official_balance_sheet'`). Presidencia INCIERTA para este ejercicio puntual
  // (ninguna página del balance muestra firma rotulada "Presidente", a diferencia de 2012/2015+) —
  // `gestionId:null` por inferencia de fecha (Memoria fechada 2/12/2013, probablemente antes de la
  // elección de Blanco ese mismo diciembre), no confirmado con certeza, ver nota completa en
  // `Clubes/Argentina/Racing/racing-balance-2013.md`. Mismos rubros "Generales/Específicos/
  // Diversos" (Anexo II) que 2009-2012, sin decisiones nuevas. fx=5,8720, la tasa dominante que
  // declara el propio balance en su Anexo de Moneda Extranjera. Escaneo puro (28 páginas, calidad
  // de escaneo más baja que otros años pero legible), transcripto con el Read tool sobre imágenes
  // de página — sin inclinación diagonal, pero los Anexos II/III y el de Moneda Extranjera estaban
  // en landscape rotado dentro de la página portrait (`club-data-mapping/SKILL.md` sección 9).
  //
  // Suma exacta a $188.690.953, el "TOTAL DE RECURSOS" impreso — 11 líneas ordinarias, sin
  // Recursos Extraordinarios este ejercicio (ambas líneas del Anexo II en $0).
  2013: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:41.980607 },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:32.510718 },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:5.723933 },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:2.039223 },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:0.538175 },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:22.911354 },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:13.504244 },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:1.505573 },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:63.588544 },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:0.651300 },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:3.737282 },
  ],
  // Ejercicio N° 112 (1°/11/2013 al 31/8/2014, irregular de 10 meses, gestión Blanco) —
  // `balance2014.pdf`, balance real. Este es el par del presupuesto 2013/2014
  // (`presupuesto2013-14.pdf`, cargado antes) — mismo ejercicio (cierra 31/8/2014 en los dos
  // documentos, aunque el período declarado no coincida exacto: el presupuesto asume 12 meses
  // desde septiembre, el balance real son 10 meses desde noviembre). `reportType` pasó de
  // `'official_budget'` a `'official_budget_and_balance'`, mismo mecanismo que 2017/2018 y
  // 2019/2020 (`club-or-year-onboarding/SKILL.md` sección 11) — el balance es ahora el dato
  // PRIMARIO, las líneas del presupuesto que ya estaban acá se movieron, sin tocar un solo valor,
  // a `racingPresupuestoOverlayByYear[2014]` más abajo. fx=8,3070, la tasa dominante que declara
  // el propio balance en su Anexo de Moneda Extranjera. Escaneo puro (38 páginas), transcripto con
  // el Read tool sobre imágenes de página — sin inclinación diagonal, pero los Anexos II/III y el
  // de Moneda Extranjera estaban en landscape rotado dentro de la página portrait
  // (`club-data-mapping/SKILL.md` sección 9). Fuente completa:
  // `Clubes/Argentina/Racing/racing-balance-2014.md`.
  //
  // Suma exacta a $301.631.868, el "TOTAL DE RECURSOS" impreso — 11 líneas ordinarias +
  // "Desafectación de Previsiones y Provisiones" (exceptional_items, $1.000.000).
  2014: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:46.449177 },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:42.021758 },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:7.348189 },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:1.614510 },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:0.868263 },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:23.904721 },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:36.812116 },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:1.522769 },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:136.156527 },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:0.805942 },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:4.127896 },
    { rawLabel:'Desafectación de Previsiones y Provisiones (extraordinario)', normalizedCategory:'exceptional_items', amountNative:1.000000 },
  ],
  // Ejercicio N° 114 (1°/9/2015 al 31/8/2016, gestión Blanco) — `balance2016.pdf`, balance real.
  // Este es el par del presupuesto 2015/2016 (`presupuesto2015-16.pdf`, cargado antes) — mismo
  // período exacto. `reportType` pasó de `'official_budget'` a `'official_budget_and_balance'`,
  // mismo mecanismo que 2014/2018/2020 (`club-or-year-onboarding/SKILL.md` sección 11) — el
  // balance es ahora el dato PRIMARIO, las líneas del presupuesto que ya estaban acá se movieron,
  // sin tocar un solo valor, a `racingPresupuestoOverlayByYear[2016]` más abajo. fx=14,83, la tasa
  // dominante que declara el propio balance en su Anexo V (Moneda Extranjera). Primer ejercicio
  // con auditoría externa (Estudio Bertora y Asociados S.R.L.) — formato de estados contables
  // distinto (Notas 1-8 + Anexos I-V), pero Anexo II/III mantienen la misma estructura de
  // columnas que los ejercicios anteriores. Escaneo puro (36 páginas), transcripto con el Read
  // tool sobre imágenes de página — sin inclinación diagonal, pero los Anexos II/III/V estaban en
  // landscape rotado dentro de la página portrait (`club-data-mapping/SKILL.md` sección 9). Fuente
  // completa: `Clubes/Argentina/Racing/racing-balance-2016.md` — incluye una nota importante sobre
  // por qué la columna comparativa "31/08/2015" de ESTE documento no coincide con
  // `racingRevenueLinesByYear[2015]` (reclasificación de exposición por el nuevo auditor externo,
  // no una corrección del resultado real — NO se tocaron los datos ya cargados de 2015).
  //
  // Suma exacta a $611.968.373, el "TOTAL DE RECURSOS" impreso — 11 líneas, sin Recursos
  // Extraordinarios este ejercicio (a diferencia de 2012/2014, este Anexo II no tiene fila de
  // Desafectación de Previsiones).
  2016: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:138.030177 },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:52.802659 },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:89.069294 },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:2.569939 },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:1.520788 },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:43.794391 },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:85.027196 },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:12.372951 },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:175.030692 },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:1.891514 },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:9.858772 },
  ],
  // Ejercicio N° 113 (1°/9/2014 al 31/8/2015, gestión Blanco) — `balance2015.pdf`, balance real
  // (`reportType:'official_balance_sheet'`, sin presupuesto propio en el archivo para este mismo
  // ejercicio — salta de `presupuesto2013-14.pdf` a `presupuesto2015-16.pdf`). Mismos rubros
  // "Generales/Específicos/Diversos" (Anexo II) que 2009-2012, sin decisiones nuevas. fx=9,20, el
  // dólar oficial de cierre de agosto de 2015 (tasa dominante del Anexo de Moneda Extranjera para
  // Caja y Bancos y la mayoría de "Otros Créditos" del período corriente — algunas líneas de
  // crédito heredadas mantienen tipos de cambio históricos congelados, no representativos del
  // ejercicio, no se usaron). Escaneo puro (25 páginas), transcripto con el Read tool sobre
  // imágenes de página — sin inclinación diagonal, pero los Anexos I/II/III y el de Moneda
  // Extranjera estaban en landscape rotado dentro de la página portrait
  // (`club-data-mapping/SKILL.md` sección 9). Fuente completa:
  // `Clubes/Argentina/Racing/racing-balance-2014-15.md`.
  //
  // Suma exacta a $430.314.984 (redondeo de $1 contra el "TOTAL DE RECURSOS" impreso,
  // $430.314.983) — 11 líneas ordinarias, sin Recursos Extraordinarios este ejercicio (ambas
  // líneas del Anexo II en $0, no se cargaron).
  2015: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:93.187267 },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:56.648320 },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:56.640384 },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:2.568669 },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:1.457230 },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:40.505380 },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:84.059113 },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:3.448025 },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:83.417474 },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:1.326368 },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:7.056754 },
  ],
  // Ejercicio N° 115 (1°/9/2016 al 31/8/2017, gestión Blanco) — `balance2017.pdf`, balance real
  // (`reportType:'official_balance_sheet'`, sin presupuesto propio en el archivo para este mismo
  // ejercicio — no existe `presupuesto2016-17.pdf`). Segundo ejercicio con auditoría externa
  // (Estudio Bertora y Asociados S.R.L.). A diferencia de `balance2016.pdf`, este Anexo II NO
  // incluye "Resultados Financieros" dentro del total de Recursos — el Estado de Recursos y
  // Gastos los muestra por separado (netInterest). fx=17,21, la tasa dominante que declara el
  // propio balance en su Anexo V (Moneda Extranjera). Escaneo puro (34 páginas), transcripto con
  // el Read tool sobre imágenes de página — sin inclinación diagonal, pero los Anexos I/II/III/V
  // estaban en landscape rotado dentro de la página portrait (`club-data-mapping/SKILL.md`
  // sección 9). Fuente completa: `Clubes/Argentina/Racing/racing-balance-2017.md` — confirma que
  // la columna comparativa "31/08/2016" de este documento coincide EXACTO con
  // `racingRevenueLinesByYear[2016]` ya cargado (a diferencia de la transición 2015→2016, acá no
  // hubo reclasificación).
  //
  // Suma exacta a $804.833.215, el "TOTAL DE RECURSOS" impreso — 11 líneas, ya es el total
  // completo sin sumar nada más (a diferencia de 2016).
  2017: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:182.076763 },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:90.438829 },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:38.039780 },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:73.592850 },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:1.422611 },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:63.643015 },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:72.825306 },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:58.202349 },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:206.087866 },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:5.181522 },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:13.322324 },
  ],
  // Ejercicio 2017/2018 (Ejercicio N° 116, 1°/9/2017 al 31/8/2018, gestión Blanco) — balance real
  // cargado en la Versión 64 (OCR de `balance2018.pdf`, escaneo de 36 páginas sin inclinación, no
  // hizo falta deskew), completando el par Presupuesto+Balance de este ejercicio (el presupuesto ya
  // estaba cargado desde la Versión 63, ver `racingPresupuestoOverlayByYear[2018]` más abajo).
  // `reportType` pasó de `'official_budget'` a `'official_budget_and_balance'`, mismo mecanismo que
  // 2019/2020 (`club-or-year-onboarding/SKILL.md` sección 11). Fuente: racing-balance-2018.md, Anexo
  // II "Recursos ordinarios" (columna TOTAL 2018, pág. 24) — mismos rubros exactos que 2019/2020 y
  // 2020/2021 (mismo formato de documento), suma exacta a $1.789.819.233, el TOTAL DE RECURSOS
  // impreso del Estado de recursos y gastos (pág. 5).
  2018: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:236.433910, disclosureLevel:'detailed' },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:90.532228, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:122.099684, disclosureLevel:'detailed' },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:2.712848, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:1.864879, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:88.125372, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:140.903954, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:109.042661, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:970.845312, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:6.711866, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:20.546519, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2018/2019 (1°/9/2018 al 31/8/2019, gestión Blanco) — `presupuesto2018-19.pdf`,
  // PRESUPUESTO-ONLY (sin balance real cargado todavía para este ejercicio en el archivo de Racing,
  // `balance2018-19.pdf` no existe/no se encontró; `reportType:'official_budget'` simple en
  // `racingFiscalYearMeta[2019]`, no `official_budget_and_balance`). Escaneo puro (9 páginas, ~1
  // char/página), transcripto con el Read tool sobre imágenes de página — sin inclinación en
  // ninguna de las 9 (verificado renderizando cada una a 150 DPI antes de leer el resto), pero las
  // 2 páginas de tabla (Ingresos/Egresos) están en landscape rotado 90° dentro de la página
  // portrait, hubo que rotar la imagen 90° (PIL) para leerlas en orientación normal. Mismo formato
  // de documento y mismos rubros que `racingPresupuestoOverlayByYear[2018]` (presupuesto
  // 2017/2018, el ejercicio inmediato anterior) — mismo criterio de categorización, sin decisiones
  // nuevas. fx=40, la premisa macro que el propio documento declara ("Estimamos un TC de $ 40.- por
  // u$d 1.- en promedio para el período", pág. 2). Fuente completa:
  // `Clubes/Argentina/Racing/racing-presupuesto-2018-19.md`.
  //
  // Suma exacta a $1.616.026.650, el "TOTAL DE INGRESOS DE FDOS" impreso (pese a su etiqueta
  // confusa "(I)+(II)+(III)": el total NO incluye el Saldo Inicial de Caja (I), solo Ordinarios
  // (II) + Extraordinarios (III) — mismo comentario ya documentado para
  // `racingPresupuestoOverlayByYear[2018]`). Filas en $0 del documento (f./g. "Otros Ingresos por
  // derechos de fútbol"/"Dep. Futbol Prof.", "Cobranzas de Subvenciones a la Explotación", c. "Otros
  // Ingresos de Gestión por Futbol", y a./b./c./e./f./h. de Ingresos Extraordinarios) no se cargaron
  // como líneas propias, mismo criterio que el resto del sitio para un valor real en cero.
  2019: [
    { rawLabel:'Campeonatos Oficiales SAF/AFA', normalizedCategory:'matchday_competition', amountNative:52.000000 },
    { rawLabel:'Comp. Oficiales Internacionales', normalizedCategory:'matchday_competition', amountNative:32.670000 },
    { rawLabel:'Otras Comp. y Partidos Amistosos', normalizedCategory:'matchday_competition', amountNative:3.730000 },
    { rawLabel:'Derechos de Retransmisión', normalizedCategory:'broadcasting', amountNative:137.154000 },
    { rawLabel:'Pub. y Esponsorización Futbol', normalizedCategory:'sponsorship_commercial', amountNative:100.000000 },
    { rawLabel:'Cesión de Jugadores (Transf. / Prést.)', normalizedCategory:'player_sales', amountNative:602.950000 },
    { rawLabel:'Ingresos por Prop. Industrial / Intelectual cedida en Explotación', normalizedCategory:'other_income', amountNative:10.968650 },
    { rawLabel:'Cobranza de Ingresos de Otras Secciones Deportivas', normalizedCategory:'other_sports', amountNative:19.000000 },
    { rawLabel:'Cobranza de ingresos por Socios y Abonados', normalizedCategory:'member_dues', amountNative:404.494000 },
    { rawLabel:'Cobranza de Otros Ingresos Ordinarios', normalizedCategory:'other_income', amountNative:85.700000 },
    { rawLabel:'Cobranza de Rentas Financieras Ordinarias', normalizedCategory:'other_income', amountNative:91.960000 },
    { rawLabel:'Cobro de Subv., Donaciones y Legados', normalizedCategory:'other_income', amountNative:3.400000 },
    { rawLabel:'Otros Cobros de Ing. Fros', normalizedCategory:'other_income', amountNative:72.000000 },
  ],
  // Ejercicio 2019/2020 (Ejercicio N° 118, 1°/9/2019 al 31/8/2020, gestión Blanco) — cargado en la
  // Versión 58, primer paso del onboarding masivo del archivo de Racing (ver to-do). amountNative
  // en ARS MILLONES NATIVOS, mismo criterio que 2024 en adelante. Fuente:
  // racing-balance-2019-20.md, Anexo II "Recursos ordinarios" (columna "2020", año corriente de ESE
  // balance, pág. 27) — suma exacta a $2.436.102.976, el TOTAL DE RECURSOS ORDINARIOS impreso del
  // Estado de recursos y gastos de ese mismo balance. Es el ÚLTIMO ejercicio de Racing con cierre a
  // agosto (el 18/12/2019 la Asamblea aprobó pasar el cierre a 30 de junio, ver Nota 5 del balance;
  // el ejercicio siguiente, 2020/2021, es un ejercicio irregular de transición, balance2021.pdf).
  2020: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:485.007214, disclosureLevel:'detailed' },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:290.569011, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:180.471063, disclosureLevel:'detailed' },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:11.400134, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:4.120262, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:240.140055, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:283.705929, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:367.059521, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:509.331575, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:11.957092, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:52.341120, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2020/2021 (Ejercicio N° 119, irregular de 10 meses: 1°/9/2020 al 30/6/2021, gestión
  // Blanco) — ejercicio de transición para pasar el cierre de agosto a junio (ver comentario de
  // racingRevenueLinesByYear[2020] y racing-balance-2019-20.md, Nota 5). No tiene presupuesto propio
  // en el archivo de Racing (`balance2021.pdf` es el único documento de este ejercicio), así que
  // queda como `official_balance_sheet` simple, no `official_budget_and_balance`. Fuente:
  // racing-balance-2021.md, Anexo II "Recursos ordinarios" (columna "2021", año corriente de ESE
  // balance, pág. 27) — mismos rubros exactos que 2019/2020 (mismo formato de documento, ver
  // `club-or-year-onboarding/SKILL.md` sección 9), suma exacta a $3.335.562.848, el TOTAL DE
  // RECURSOS ORDINARIOS impreso. "Otros Torneos" se carga en $0 (el documento la lista con "-" este
  // ejercicio, a diferencia de 2020 que sí tuvo monto) — se mantiene la fila por fidelidad a la
  // fuente, no se omite un rubro real solo porque dio cero este año puntual.
  2021: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:444.730770, disclosureLevel:'detailed' },
    { rawLabel:'Televisación / Televisión AFA', normalizedCategory:'broadcasting', amountNative:294.387257, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos Oficiales', normalizedCategory:'matchday_competition', amountNative:579.451092, disclosureLevel:'detailed' },
    { rawLabel:'Otros Torneos', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Alquiler', normalizedCategory:'other_income', amountNative:9.916097, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:281.073459, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Diversos', normalizedCategory:'other_income', amountNative:345.913034, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Deportivos', normalizedCategory:'other_income', amountNative:469.722665, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de Jugadores', normalizedCategory:'player_sales', amountNative:855.871189, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:3.561719, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Colegio', normalizedCategory:'education', amountNative:50.935566, disclosureLevel:'detailed' },
  ],
  // 2024 en adelante: amountNative en ARS MILLONES NATIVOS (Versión 32 — ver comentario de cabecera).
  // Fuente: racing-balance-2023-24.md, Anexo III "Recursos ordinarios" (columna "2024", año
  // corriente de ESE balance, pág. 27) — suma exacta a $66.367.712.489, el TOTAL DE RECURSOS
  // ORDINARIOS impreso del Estado de recursos y gastos de ese mismo balance.
  2024: [
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:11613.758662, disclosureLevel:'detailed' },
    { rawLabel:'Televisación', normalizedCategory:'broadcasting', amountNative:3098.596682, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales', normalizedCategory:'matchday_competition', amountNative:5841.305367, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos alquiler', normalizedCategory:'other_income', amountNative:504.690564, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos publicidad', normalizedCategory:'sponsorship_commercial', amountNative:4265.712955, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos diversos', normalizedCategory:'other_income', amountNative:8519.14145, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos deportivos', normalizedCategory:'other_income', amountNative:3942.938917, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de jugadores', normalizedCategory:'player_sales', amountNative:27684.959835, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos colegio', normalizedCategory:'education', amountNative:896.608057, disclosureLevel:'detailed' },
  ],
  // Fuente: racing-balance-2024-25.md, Anexo III (columna "2025", año corriente de ESE balance,
  // pág. 29) — suma exacta a $87.399.617.009, el TOTAL DE RECURSOS ORDINARIOS impreso.
  2025: [
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:20397.105338, disclosureLevel:'detailed' },
    { rawLabel:'Televisación', normalizedCategory:'broadcasting', amountNative:6494.232872, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales', normalizedCategory:'matchday_competition', amountNative:18773.606931, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos alquiler', normalizedCategory:'other_income', amountNative:68.936162, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos publicidad', normalizedCategory:'sponsorship_commercial', amountNative:5134.942754, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos diversos', normalizedCategory:'other_income', amountNative:14849.103245, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos deportivos', normalizedCategory:'other_income', amountNative:6557.543132, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de jugadores', normalizedCategory:'player_sales', amountNative:13515.889164, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Sede Villa del Parque', normalizedCategory:'other_income', amountNative:121.928016, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos colegio', normalizedCategory:'education', amountNative:1486.329395, disclosureLevel:'detailed' },
  ],
  // Fuente: racing-presupuesto-2025-26.md, tabla "PRESUPUESTO FINANCIERO DE INGRESOS Y EGRESOS"
  // (columna TOTAL PERÍODO). Suma exacta a $123.297.209.473, el TOTAL INGRESOS DE FONDOS DEL
  // PERÍODO impreso.
  2026: [
    // "Ingresos provenientes de fútbol" (encabezado de grupo A del documento) NO es un bolsón sin
    // desglosar — el propio presupuesto separa estas 9 líneas numeradas (1 a 9) con nombre y monto
    // propio cada una. Hasta la Versión 38 se cargaban como sub-ítems (`items`) de una única línea
    // `lump_football_operations`, lo que las escondía de cualquier cálculo por `normalizedCategory`
    // (incluida "Formato simplificado": Televisión/Comercial/Venta de jugadores daban 0 porque la
    // plata estaba enterrada adentro del bolsón — bug real reportado por Guido, que abrió el PDF y
    // vio la línea "COBROS POR RETRANSMISION Y DERECHOS DE TV" con monto propio). Se promovieron a
    // líneas de primer nivel, cada una con su categoría real — ver
    // `.claude/skills/club-data-mapping/SKILL.md`, sección 1, tabla de mapeos.
    { rawLabel:'Cobranzas por venta de entradas', normalizedCategory:'matchday_competition', amountNative:3325.230307, disclosureLevel:'detailed' },
    { rawLabel:'Cobranzas por participación', normalizedCategory:'competition_bonus', amountNative:7973.298, disclosureLevel:'detailed' },
    { rawLabel:'Cobranzas por venta de abonos estadio', normalizedCategory:'season_tickets', amountNative:8906.278442, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por retransmisión y derechos de TV', normalizedCategory:'broadcasting', amountNative:7470.240603, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por marketing y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:13712.624218, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por ventas de jugadores', normalizedCategory:'player_sales', amountNative:32475.995078, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por préstamos de jugadores', normalizedCategory:'player_sales', amountNative:387.4, disclosureLevel:'detailed' },
    { rawLabel:'Cobros de derechos de formación y mecanismo de solidaridad', normalizedCategory:'youth_football', amountNative:1152.906397, disclosureLevel:'detailed' },
    { rawLabel:'Cobros de otros recursos de gestión por fútbol', normalizedCategory:'other_income', amountNative:14863.072662, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos sociales', normalizedCategory:'member_dues', amountNative:23789.84136, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de otras secciones', normalizedCategory:'other_sports', amountNative:2289.790438, disclosureLevel:'detailed', items:[
      ['Cobranzas de otras actividades deportivas', 599.188852], ['Cobranzas de instituciones educativas', 1690.601585],
    ]},
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:6950.531967, disclosureLevel:'detailed', items:[
      ['Cobros de otros recursos ordinarios', 6430.531967], ['Cobros de rentas financieras', 520.0],
    ]},
  ],
  // Fuente: presupuesto2026-27.md (Versión 32, carga nueva), misma tabla y misma estructura de
  // rubros que 2026 (el presupuesto no cambió de formato de un año a otro). Suma exacta a
  // $143.118.482.343, el TOTAL INGRESOS DE FONDOS DEL PERÍODO impreso.
  2027: [
    // Mismo criterio que 2026 (ver comentario ahí) — desde la Versión 38, líneas de primer nivel en
    // vez de sub-ítems de un bolsón "lump_football_operations".
    { rawLabel:'Cobranzas por venta de entradas', normalizedCategory:'matchday_competition', amountNative:4456.387863, disclosureLevel:'detailed' },
    { rawLabel:'Cobranzas por participación', normalizedCategory:'competition_bonus', amountNative:2646.0, disclosureLevel:'detailed' },
    { rawLabel:'Cobranzas por venta de abonos estadio', normalizedCategory:'season_tickets', amountNative:11902.898203, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por retransmisión y derechos de TV', normalizedCategory:'broadcasting', amountNative:7003.015314, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por marketing y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:12914.651805, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por ventas de jugadores', normalizedCategory:'player_sales', amountNative:38271.865599, disclosureLevel:'detailed' },
    { rawLabel:'Cobros por préstamos de jugadores', normalizedCategory:'player_sales', amountNative:504.875, disclosureLevel:'detailed' },
    { rawLabel:'Cobros de derechos de formación y mecanismo de solidaridad', normalizedCategory:'youth_football', amountNative:1551.494, disclosureLevel:'detailed' },
    { rawLabel:'Cobros de otros recursos de gestión por fútbol', normalizedCategory:'other_income', amountNative:13778.918428, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos sociales', normalizedCategory:'member_dues', amountNative:36786.392109, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de otras secciones', normalizedCategory:'other_sports', amountNative:4359.330552, disclosureLevel:'detailed', items:[
      ['Cobranzas de otras actividades deportivas', 1151.782091], ['Cobranzas de instituciones educativas', 3207.548462],
    ]},
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:8942.65347, disclosureLevel:'detailed', items:[
      ['Cobros de otros recursos ordinarios', 8664.10347], ['Cobros de rentas financieras', 278.55],
    ]},
  ],
};

// HOMOLOGACIÓN DE GASTOS CON BOCA (Versión 52, pedido explícito de Guido: "homologar egresos en
// racing a como lo tiene Boca"). Hasta la Versión 51, "Costo transferencia de jugadores" (2009,
// 2010, 2011, 2024, 2025) y "Pago por adquisición de jugadores" (2026, 2027) estaban en
// `other_expenses`, así que el bucket "Compra de jugadores" de Formato Simplificado (ver
// GENERIC_SIMPLIFIED_EXPENSE_BUCKETS en js/finanzas-calc.js: cats:['player_amortisation',
// 'player_impairment']) daba SIEMPRE $0 para Racing, aunque el club gastó plata real comprando
// jugadores todos estos años, esa plata estaba escondida dentro de "Otros gastos". Se reetiquetaron
// esas 7 líneas a `player_amortisation` (no se tocó ningún monto, solo la categoría). Racing no
// separa amortización de deterioro de pases como sí puede hacer Boca, así que todo entra a
// `player_amortisation`, que junto con `player_impairment` (sin uso en Racing hoy) arma el mismo
// bucket.
//
// DOS CASOS QUE QUEDAN A PROPÓSITO EN `other_expenses` (consultados a Guido con AskUserQuestion
// antes de decidir, ver también .claude/skills/club-data-mapping/SKILL.md sección 1 y 10):
// - "Pago de gastos por compraventa de jugadores" (2026, 2027): son comisiones/intermediación de
//   la operación, no el costo del pase en sí. Boca no desglosa este tipo de comisión dentro de su
//   bucket "Compra de jugadores" (que es solo amortización + deterioro de pases), así que meterlo
//   ahí sería MENOS fiel a cómo Boca arma esa fila, no más homologado. Guido confirmó: dejarlo en
//   el catch-all.
// - "Egresos extraordinarios (compra de bienes de uso y mejoras, principalmente)" (2026, 2027): es
//   CAPEX (plata de caja para comprar activos), un concepto distinto de "Inversiones (amortizaciones
//   y depreciación)" de Boca, que es un cargo contable NO-CASH. Mezclar CAPEX con D&A rompería la
//   comparabilidad que busca esta homologación, no la mejoraría. Guido confirmó: dejarlo en el
//   catch-all.
//
// SEGUNDA RONDA DE HOMOLOGACIÓN (Versión 53, pedido explícito de Guido: "las rows tienen que ser
// siempre iguales entre clubes, aunque alguna tenga un cero" + "no puede ser que otros gastos tenga
// 64% del total... mirando los rows de Boca, podes crear nuevos y reducir ese 64%"). Se agregaron 3
// categorías nuevas (`match_organisation_expense`/`youth_other_sports_expense`/
// `admin_general_expense`, ver data/category-map.js), las mismas 3 filas que Boca ya usa en su
// Ejercicio 2027 (`otrosGastos2027` en js/finanzas-calc.js: "Organización de partidos"/"Otras
// secciones deportivas"/"Administración y gastos generales"), y se re-etiquetaron TODAS las líneas
// de `other_expenses` que tenían un rubro identificable (antes: 100% de "Otros gastos" era
// `other_expenses` sin distinción), dejando en el catch-all SOLO las 4 líneas ya consultadas con
// Guido en la Versión 52 (compraventa de jugadores y CAPEX, ver arriba).
// - `match_organisation_expense`: "Organización de partidos" (2009-2011/2024/2025) y "Pago de
//   gastos por participación" (2026/2027, costo de participar en competencias: viajes,
//   concentración). Mismo concepto que "Organización de Espectáculos" de Boca.
// - `youth_other_sports_expense`: "Actividades deportivas y sociales" (2009-2011/2024/2025), "Pago
//   de gastos fútbol amateur (activable)" y "Egresos de otras secciones" (2026/2027, incluye
//   sub-ítems de otras actividades deportivas E instituciones educativas). Mismo concepto que
//   "Fútbol Juvenil"+"Otros Deportes"+"Basket" de Boca.
// - `admin_general_expense`: "Televisión AFA"/"Honorarios órgano fiduciario"/"Honorarios y otras
//   contribuciones"/"Mantenimiento"/"Sellados, multas y gastos bancarios"/"Sede Villa del
//   Parque" (2009-2011/2024/2025), "Pago de gastos explotación del estadio"/"Pago de gastos de
//   comercialización"/"Otros egresos" (2026/2027, incluye sub-ítems de administración/impuestos/
//   gastos financieros). Mismo concepto que "Administración"+"Gastos Generales"+"Comerciales"+
//   "Socios"+"Eventuales" de Boca. "Colegio" (2009-2018, ver abajo) SALIÓ de esta lista en la
//   Versión 194 (to-do 42): pasó a `education_expense`, que no existía todavía en la Versión 53.
// - CASO CONSULTADO (Guido eligió la 1ra opción vía AskUserQuestion): "Fútbol profesional"
//   (2009-2011/2024/2025) y "Pago de otros gastos deportivos fútbol profesional" (2026/2027) son
//   costos NO salariales del plantel profesional (médico, indumentaria, viajes, pretemporada), la
//   línea más grande de todo el catch-all (hasta ~30% de "Otros gastos" en algunos años). Se
//   re-etiquetaron a `wages_squad`, NO a una categoría nueva: Boca ya mezcla este mismo tipo de
//   costo dentro de su propio campo "wages" para el Ejercicio 2027 (ver
//   `expenseSubBreakdown[2027]['Fútbol Profesional']` en data/boca-data.js: "Gerencia de Fútbol
//   Profesional" incluye Farmacia/Pretemporada/Vigilancia/Canjes/Indumentaria junto con
//   Remuneraciones y Primas, y ESE total completo es lo que alimenta `r.wages` para "Salarios y
//   primas" en `simplifiedReportForBoca()`), así que sumarlo a `wages_squad` en Racing sigue el
//   mismo criterio que ya usa Boca, no uno inventado para esta sesión. OJO (documentado para no
//   repetir la investigación): esto es distinto de cómo Boca arma su Ejercicio 2025 (balance
//   auditado real), donde `wages` es una cifra de remuneraciones MÁS estricta (excluye
//   médico/indumentaria/viajes, ver comentario de `yearsRaw[2025]` en data/boca-data.js) — los dos
//   ejercicios reales de Boca NO son 100% consistentes entre sí en este punto específico, y esta
//   homologación de Racing sigue el criterio del Ejercicio 2027 (la referencia "canónica" que ya usa
//   el resto de este skill/sitio para el orden y los nombres de fila).
//
// Boca 2025 (balance auditado real) NO recibió el mismo desglose de 3 filas en esta sesión: su
// dato nativo (`nativeFinancialsBoca[2025]`) SÍ tiene detalle, pero varias líneas mezclan sueldos y
// gastos operativos DENTRO del mismo renglón sin desglose propio (ej. "Estadio" trae "Remuneraciones
// y cargas sociales" y gastos de mantenimiento juntos) — separar esa mezcla a mano, sin un balance
// de verificación automatizado como pide CLAUDE.md ("Precisión antes que velocidad"), es un riesgo
// real de ensuciar un balance auditado real. Un intento de reconstrucción a mano en esta sesión dio
// una diferencia de ~$4.500 M contra `otherExpenses` (-71.553,845458 M), señal de que faltaba
// reconciliar algo, así que NO se cargó. Queda como to-do explícito (ver comentario en
// `js/finanzas-calc.js`, función `simplifiedReportForBoca`, sección `otrosGastosDefault`): Boca 2025
// muestra las 3 filas nuevas en $0 y el monto completo en "Otros gastos", igual que antes de esta
// versión, hasta que alguien re-verifique la separación línea por línea contra el balance.
const racingExpenseLinesByYear = {
  2009: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-3.746, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-0.592, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-6.499, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.995, disclosureLevel:'detailed' },
    { rawLabel:'Televisión AFA', normalizedCategory:'admin_general_expense', amountNative:-0.215, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-0.632, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios órgano fiduciario', normalizedCategory:'admin_general_expense', amountNative:-0.008, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y otras contribuciones', normalizedCategory:'admin_general_expense', amountNative:-0.239, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-0.318, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-0.068, disclosureLevel:'detailed' },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-0.251, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-0.491, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-1.506, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.259, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / otras amortizaciones (cargos extraordinarios)', normalizedCategory:'other_amortisation', amountNative:-6.316, disclosureLevel:'detailed' },
  ],
  2010: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-5.545, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-0.684, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-6.786, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-1.191, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-1.735, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-0.41, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-0.124, disclosureLevel:'detailed' },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-0.043, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-0.13, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-0.167, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.303, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / otras amortizaciones (cargos extraordinarios)', normalizedCategory:'other_amortisation', amountNative:-3.128, disclosureLevel:'detailed' },
  ],
  2011: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-6.939, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-1.117, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-7.077, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-1.128, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-2.279, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-0.255, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-0.189, disclosureLevel:'detailed' },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-0.041, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-0.185, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-0.992, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.316, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / otras amortizaciones (cargos extraordinarios)', normalizedCategory:'other_amortisation', amountNative:-3.954, disclosureLevel:'detailed' },
  ],
  // Ejercicio N° 110 (ver comentario completo junto a racingRevenueLinesByYear[2012] más arriba).
  // Fuente: `Clubes/Argentina/Racing/racing-balance-2012.md`, Anexo III "Detalle de Gastos"
  // (columna Total al 31/10/2012) + Anexo I "Bienes de Uso" (Amortizaciones del Ejercicio). Los 10
  // rubros del Anexo III suman exacto $(141.052.157) (SUBTOTAL impreso); con "Cargos
  // Extraordinarios (Previsiones/Otras Amortizaciones)" ($24.292.381, `other_amortisation`) y
  // Amortizaciones de Bienes de Uso ($1.442.073, `depreciation`, Anexo I, NO incluidas en el
  // subtotal de Anexo III) suma $(166.786.611) — ver verifyTieOuts().
  2012: [
    { rawLabel:'Sueldos del Personal', normalizedCategory:'wages_squad', amountNative:-34.882106 },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-5.751097 },
    { rawLabel:'Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-36.097682 },
    { rawLabel:'Organización de Partidos', normalizedCategory:'match_organisation_expense', amountNative:-6.173585 },
    { rawLabel:'Grales. Actividades Deportivas / Soc.', normalizedCategory:'youth_other_sports_expense', amountNative:-11.285320 },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-1.365491 },
    { rawLabel:'Sellados, Multas, Gtos Bancarios', normalizedCategory:'admin_general_expense', amountNative:-1.252515 },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-0.198060 },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-0.998536 },
    { rawLabel:'Costo Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-43.047765 },
    { rawLabel:'Amortizaciones de Bienes de Uso', normalizedCategory:'depreciation', amountNative:-1.442073 },
    { rawLabel:'Cargos Extraordinarios (Previsiones / Otras Amortizaciones)', normalizedCategory:'other_amortisation', amountNative:-24.292381 },
  ],
  // Ejercicio N° 111 (ver comentario completo junto a racingRevenueLinesByYear[2013] más arriba).
  // Fuente: `Clubes/Argentina/Racing/racing-balance-2013.md`, Anexo III "Detalle de Gastos"
  // (columna Total al 31/10/2013) + Anexo I "Bienes de Uso" (Amortización del Ejercicio). Los 10
  // rubros del Anexo III suman exacto $(158.127.700) (redondeo de $1 contra el SUBTOTAL impreso,
  // $158.127.701); con "Cargos Extraordinarios (Previsiones/Otras Amortizaciones)" ($18.016.124,
  // `other_amortisation`) y Amortizaciones de Bienes de Uso ($1.486.409, `depreciation`, Anexo I)
  // suma $(177.630.233) — ver verifyTieOuts(). OJO al releer el PDF original: "Organización de
  // Partidos"/"Grales. Actividades Deportivas / Soc." tienen sus columnas Generales/Específicos
  // desalineadas del orden visual de filas (mismo tipo de trampa que las presupuestos 2013-14/
  // 2015-16, pero acá en un balance) — ver la nota completa en el .md fuente antes de tocar estos
  // 2 valores.
  2013: [
    { rawLabel:'Sueldos del Personal', normalizedCategory:'wages_squad', amountNative:-49.704889 },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-8.046589 },
    { rawLabel:'Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-55.534786 },
    { rawLabel:'Organización de Partidos', normalizedCategory:'match_organisation_expense', amountNative:-6.815239 },
    { rawLabel:'Grales. Actividades Deportivas / Soc.', normalizedCategory:'youth_other_sports_expense', amountNative:-13.000589 },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-1.321368 },
    { rawLabel:'Sellados, Multas, Gtos Bancarios', normalizedCategory:'admin_general_expense', amountNative:-0.331475 },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-1.153084 },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-1.617500 },
    { rawLabel:'Costo Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-20.602181 },
    { rawLabel:'Amortizaciones de Bienes de Uso', normalizedCategory:'depreciation', amountNative:-1.486409 },
    { rawLabel:'Cargos Extraordinarios (Previsiones / Otras Amortizaciones)', normalizedCategory:'other_amortisation', amountNative:-18.016124 },
  ],
  // Ejercicio N° 112 (ver comentario completo junto a racingRevenueLinesByYear[2014] más arriba).
  // Fuente: `Clubes/Argentina/Racing/racing-balance-2014.md`, Anexo III "Detalle de Gastos"
  // (columna Total al 31/08/2014) + Anexo I "Bienes de Uso" (Amortización del Ejercicio). Los 10
  // rubros del Anexo III suman exacto $(190.132.485) (SUBTOTAL impreso); con "Cargos
  // Extraordinarios (Previsiones/Otras Amortizaciones)" ($26.435.662, `other_amortisation`) y
  // Amortizaciones de Bienes de Uso ($1.578.112, `depreciation`, Anexo I) suma $(218.146.259) —
  // ver verifyTieOuts().
  2014: [
    { rawLabel:'Sueldos del Personal', normalizedCategory:'wages_squad', amountNative:-56.424777 },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-8.983527 },
    { rawLabel:'Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-50.750419 },
    { rawLabel:'Organización de Partidos', normalizedCategory:'match_organisation_expense', amountNative:-13.329071 },
    { rawLabel:'Grales. Actividades Deportivas / Soc.', normalizedCategory:'youth_other_sports_expense', amountNative:-17.848486 },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-2.362159 },
    { rawLabel:'Sellados, Multas, Gtos Bancarios', normalizedCategory:'admin_general_expense', amountNative:-4.507312 },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-0.370414 },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-1.209085 },
    { rawLabel:'Costo Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-34.347235 },
    { rawLabel:'Amortizaciones de Bienes de Uso', normalizedCategory:'depreciation', amountNative:-1.578112 },
    { rawLabel:'Cargos Extraordinarios (Previsiones / Otras Amortizaciones)', normalizedCategory:'other_amortisation', amountNative:-26.435662 },
  ],
  // Ejercicio N° 114 (ver comentario completo junto a racingRevenueLinesByYear[2016] más
  // arriba). Fuente: `Clubes/Argentina/Racing/racing-balance-2016.md`, Anexo III "Detalle de
  // Gastos" (columna Total al 31/08/2016) + "Depreciación" del Estado de Recursos y Gastos. Los
  // 10 rubros del Anexo III suman exacto $(353.474.696) (SUBTOTAL impreso); con "Previsiones /
  // Amortizaciones" ($86.210.139, `other_amortisation`) y Depreciación ($1.968.198,
  // `depreciation`) suma $(441.653.033) — ver verifyTieOuts().
  2016: [
    { rawLabel:'Sueldos del Personal', normalizedCategory:'wages_squad', amountNative:-112.639736 },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-18.694347 },
    { rawLabel:'Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-99.361355 },
    { rawLabel:'Organización de Partidos', normalizedCategory:'match_organisation_expense', amountNative:-30.147936 },
    { rawLabel:'Grales. Actividades Deportivas / Soc.', normalizedCategory:'youth_other_sports_expense', amountNative:-49.287058 },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-5.121782 },
    { rawLabel:'Sellados, Multas, Gtos Bancarios', normalizedCategory:'admin_general_expense', amountNative:-14.797764 },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-1.077987 },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-2.845248 },
    { rawLabel:'Costo Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-19.501483 },
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-1.968198 },
    { rawLabel:'Previsiones / Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-86.210139 },
  ],
  // Ejercicio N° 113 (ver comentario completo junto a racingRevenueLinesByYear[2015] más arriba).
  // Fuente: `Clubes/Argentina/Racing/racing-balance-2014-15.md`, Anexo III "Detalle de Gastos"
  // (columna Total al 31/08/2015) + Anexo I "Bienes de Uso" (Amortización del Ejercicio). Los 10
  // rubros del Anexo III suman exacto $(310.039.072) (SUBTOTAL impreso); con "Cargos
  // Extraordinarios (Previsiones/Otras Amortizaciones)" ($19.931.642, `other_amortisation`) y
  // Amortizaciones de Bienes de Uso ($1.683.948, `depreciation`, Anexo I) suma $(331.654.662) —
  // ver verifyTieOuts().
  2015: [
    { rawLabel:'Sueldos del Personal', normalizedCategory:'wages_squad', amountNative:-88.805004 },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-14.284452 },
    { rawLabel:'Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-72.493181 },
    { rawLabel:'Organización de Partidos', normalizedCategory:'match_organisation_expense', amountNative:-35.094389 },
    { rawLabel:'Grales. Actividades Deportivas / Soc.', normalizedCategory:'youth_other_sports_expense', amountNative:-31.493115 },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-9.084199 },
    { rawLabel:'Sellados, Multas, Gtos Bancarios', normalizedCategory:'admin_general_expense', amountNative:-3.326824 },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-0.547052 },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-1.644146 },
    { rawLabel:'Costo Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-53.266710 },
    { rawLabel:'Amortizaciones de Bienes de Uso', normalizedCategory:'depreciation', amountNative:-1.683948 },
    { rawLabel:'Cargos Extraordinarios (Previsiones / Otras Amortizaciones)', normalizedCategory:'other_amortisation', amountNative:-19.931642 },
  ],
  // Ejercicio N° 115 (ver comentario completo junto a racingRevenueLinesByYear[2017] más arriba).
  // Fuente: `Clubes/Argentina/Racing/racing-balance-2017.md`, Anexo III "Detalle de Gastos"
  // (columna Total 2017) + Anexo I "Bienes de Uso" (Depreciación del Ejercicio). Los 10 rubros del
  // Anexo III suman exacto $(575.933.019) (SUBTOTAL impreso); con "Previsiones/Amortizaciones
  // intangibles" ($126.386.082, `other_amortisation`) y Depreciación ($6.073.853, `depreciation`,
  // Anexo I) suma $(708.392.954) — ver verifyTieOuts().
  2017: [
    { rawLabel:'Sueldos del Personal', normalizedCategory:'wages_squad', amountNative:-174.356185 },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-24.647352 },
    { rawLabel:'Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-139.564544 },
    { rawLabel:'Organización de Partidos', normalizedCategory:'match_organisation_expense', amountNative:-22.151970 },
    { rawLabel:'Actividades Deportivas y Sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-67.837036 },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-6.560212 },
    { rawLabel:'Sellados, Multas y Gastos Bancarios', normalizedCategory:'admin_general_expense', amountNative:-24.037401 },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-1.413230 },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-4.879757 },
    { rawLabel:'Costo Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-110.485332 },
    { rawLabel:'Depreciaciones de Bienes de Uso', normalizedCategory:'depreciation', amountNative:-6.073853 },
    { rawLabel:'Previsiones / Amortizaciones Intangibles', normalizedCategory:'other_amortisation', amountNative:-126.386082 },
  ],
  // Ejercicio 2017/2018 (ver comentario completo junto a racingRevenueLinesByYear[2018] más arriba).
  // Fuente: racing-balance-2018.md, Anexo III "Detalle de gastos" (columna TOTAL 2018, pág. 25) +
  // Estado de recursos y gastos (Depreciaciones de bienes de uso, Anexo I, pág. 22-23). Los 10 rubros
  // de Anexo III suman exacto $1.093.025.917 (TOTAL DE GASTOS impreso, pág. 5); con Previsiones/
  // Amortizaciones intangibles (`other_amortisation`, parte del propio total de Anexo III,
  // $249.645.990) y Depreciaciones de bienes de uso (`depreciation`, de Anexo I, $7.775.936, NO
  // incluidas en el total de Anexo III) suma $1.350.447.843 — ver verifyTieOuts().
  2018: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-238.067884, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-36.475037, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-351.203655, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-98.275268, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-97.925553, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-8.374754, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-32.075059, disclosureLevel:'detailed' },
    { rawLabel:'Colegio', normalizedCategory:'education_expense', amountNative:-2.570500, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-9.166669, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-218.891538, disclosureLevel:'detailed' },
    { rawLabel:'Depreciaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-7.775936, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / Amortizaciones intangibles', normalizedCategory:'other_amortisation', amountNative:-249.645990, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2018/2019 (ver comentario completo junto a racingRevenueLinesByYear[2019] más arriba).
  // Fuente: `Clubes/Argentina/Racing/racing-presupuesto-2018-19.md`, página 9 (columna "Total del
  // Período"). Suma exacta a $(1.756.652.573), el "TOTAL DE EGRESOS DE FDOS (IV)+(V)" impreso.
  // "Pago por compra de Activos Intangibles" (-415.333.333, la compra de jugadores de este
  // ejercicio) va a `player_amortisation`, mismo criterio que "Pago por adquisición de jugadores"
  // en 2020 y "Cancelación Efectiva por Compra de Jugadores" en el overlay 2018 — no se excluye
  // como si fuera puro movimiento de balance. Filas en $0 del documento (d. "Participación en
  // Otras Comp. y Partidos Amistosos", b. "Subvenciones a Otras Entidades Deportivas", a. "Comisión
  // Directiva", 3. "Otros Pagos por egresos extraord.", b. "Devolución Aportes al Fondo Social") no
  // se cargaron como líneas propias, mismo criterio de siempre para un valor real en cero.
  2019: [
    { rawLabel:'Gastos de Explotación del Estadio', normalizedCategory:'admin_general_expense', amountNative:-65.450000 },
    { rawLabel:'Participación en Camp. Oficiales SAF/AFA', normalizedCategory:'match_organisation_expense', amountNative:-46.700000 },
    { rawLabel:'Part. en Campeonatos Internacionales', normalizedCategory:'match_organisation_expense', amountNative:-25.000000 },
    { rawLabel:'Remuneraciones Plantel Deportivo (Incluido Cuerpo Técnico)', normalizedCategory:'wages_squad', amountNative:-154.000000 },
    { rawLabel:'Premios y Primas Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-177.000000 },
    { rawLabel:'Otros Gastos Dep. Futbol Profesional', normalizedCategory:'wages_squad', amountNative:-296.700000 },
    { rawLabel:'Gastos Fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-66.000000 },
    { rawLabel:'Pago de Gtos de Otras Secciones Dep.', normalizedCategory:'youth_other_sports_expense', amountNative:-28.600000 },
    { rawLabel:'Gerencias Operativas', normalizedCategory:'admin_general_expense', amountNative:-27.200000 },
    { rawLabel:'Departamentos Auxiliares - No Incluidos en (A)', normalizedCategory:'admin_general_expense', amountNative:-22.000000 },
    { rawLabel:'Gastos Generales de Administración', normalizedCategory:'admin_general_expense', amountNative:-54.000000 },
    { rawLabel:'Pago de Otros Gastos Ordinarios', normalizedCategory:'other_expenses', amountNative:-108.800000 },
    { rawLabel:'Pagos de Gastos Financieros', normalizedCategory:'admin_general_expense', amountNative:-2.400000 },
    { rawLabel:'Pagos por compra de Bienes de Uso', normalizedCategory:'other_expenses', amountNative:-120.500000 },
    { rawLabel:'Pago por compra de Activos Intangibles', normalizedCategory:'player_amortisation', amountNative:-415.333333 },
    { rawLabel:'Pagos por Colocaciones Fras.', normalizedCategory:'other_expenses', amountNative:-46.200000 },
    { rawLabel:'Cancelación Efectiva de Pasivos', normalizedCategory:'other_expenses', amountNative:-100.769240 },
  ],
  // Ejercicio 2019/2020 (ver comentario completo junto a racingRevenueLinesByYear[2020] más arriba).
  // Fuente: racing-balance-2019-20.md, Anexo III "Detalle de gastos" (columna "2020", pág. 28) +
  // Estado de recursos y gastos (Depreciaciones/Previsiones, pág. 4). Suma exacta a
  // $(2.100.483.040) de gastos ordinarios; con las dos líneas no-cash de abajo, cierra exacto
  // ($(2.940.733.186) + netInterest 227.570.638 + revenue 2436.102976 = -277.059572, el RESULTADO
  // (DÉFICIT) impreso) — ver verifyTieOuts().
  2020: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-611.240429, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-71.370395, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-902.416706, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-62.397662, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-229.174140, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-14.227505, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-29.062797, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-13.310389, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-167.283017, disclosureLevel:'detailed' },
    { rawLabel:'Depreciaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-105.212746, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / Amortizaciones intangibles', normalizedCategory:'other_amortisation', amountNative:-735.037400, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2020/2021 (ver comentario completo junto a racingRevenueLinesByYear[2021] más arriba).
  // Fuente: racing-balance-2021.md, Anexo III "Detalle de gastos" (columna "2021", pág. 28) +
  // Estado de recursos y gastos (Depreciaciones/Previsiones, pág. 5). Suma exacta a
  // $(2.348.405.480) de gastos ordinarios; con las dos líneas no-cash de abajo, cierra exacto
  // ($(3.404.446.864) + netInterest 75.896098 + revenue 3335.562848 = 7.012082, el SUPERÁVIT
  // impreso) — ver verifyTieOuts().
  2021: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-588.846774, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-90.303914, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-1127.573095, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-77.158339, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-242.195045, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-15.785163, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-39.157337, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-9.539660, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-157.846153, disclosureLevel:'detailed' },
    { rawLabel:'Depreciaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-152.718471, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / Amortizaciones intangibles', normalizedCategory:'other_amortisation', amountNative:-903.322913, disclosureLevel:'detailed' },
  ],
  // Fuente: racing-balance-2023-24.md, Anexo IV "Gastos ordinarios" (columna "2024", año corriente
  // de ESE balance, pág. 28) + Estado de recursos y gastos (Depreciaciones/Previsiones, pág. 3).
  // Suma exacta a $(55.847.189.733) de gastos ordinarios; con las dos líneas no-cash de abajo,
  // cierra exacto contra el DÉFICIT DEL EJERCICIO impreso ($(6.127.619.872)) — ver verifyTieOuts().
  2024: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-8519.25827, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-1698.882389, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-24286.994971, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-2597.482802, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-7194.050178, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-261.225073, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-1293.568672, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-9995.727378, disclosureLevel:'detailed' },
    { rawLabel:'Depreciaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-2488.762976, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / Amortizaciones intangibles', normalizedCategory:'other_amortisation', amountNative:-20832.011983, disclosureLevel:'detailed' },
  ],
  // Fuente: racing-balance-2024-25.md, Anexo IV (columna "2025", año corriente de ESE balance,
  // pág. 29) + Estado de recursos y gastos (pág. 3). Suma exacta a $(67.228.067.867) de gastos
  // ordinarios; con las dos líneas no-cash de abajo, cierra exacto contra el DÉFICIT DEL EJERCICIO
  // impreso ($(178.451.821)) — ver verifyTieOuts().
  2025: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-15202.077398, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-3195.300296, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'wages_squad', amountNative:-27905.125653, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-5678.302707, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'youth_other_sports_expense', amountNative:-9290.650219, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-350.733591, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-1695.870575, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'admin_general_expense', amountNative:-1376.54867, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-2533.458758, disclosureLevel:'detailed' },
    { rawLabel:'Depreciaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-3152.752679, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / Amortizaciones intangibles', normalizedCategory:'other_amortisation', amountNative:-20912.793752, disclosureLevel:'detailed' },
  ],
  // Fuente: racing-presupuesto-2025-26.md, columna TOTAL PERÍODO. Suma exacta a
  // $(126.860.457.441), el TOTAL DE EGRESOS DE FONDOS DEL PERÍODO impreso.
  2026: [
    // "Egresos generados por fútbol" (grupo A): mismo caso que el lado de ingresos — el documento
    // separa estas 9 líneas con nombre y monto propio, no es un bolsón sin desglosar. Desde la
    // Versión 38, líneas de primer nivel (antes eran sub-ítems de `lump_football_operations_expense`,
    // lo que dejaba "Salarios del plantel" en $0 en Formato simplificado — mismo bug que el de
    // ingresos, encontrado al revisar el reporte de Guido).
    { rawLabel:'Pago de gastos explotación del estadio', normalizedCategory:'admin_general_expense', amountNative:-6290.935116, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por participación', normalizedCategory:'match_organisation_expense', amountNative:-7653.273667, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones plantel profesional', normalizedCategory:'wages_squad', amountNative:-27953.696292, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-4743.41219, disclosureLevel:'detailed' },
    { rawLabel:'Pago de otros gastos deportivos fútbol profesional', normalizedCategory:'wages_squad', amountNative:-10251.057047, disclosureLevel:'detailed' },
    { rawLabel:'Pago por adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-19010.56705, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por compraventa de jugadores', normalizedCategory:'other_expenses', amountNative:-9719.521189, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos fútbol amateur (activable)', normalizedCategory:'youth_other_sports_expense', amountNative:-5260.525946, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos de comercialización', normalizedCategory:'admin_general_expense', amountNative:-7069.748476, disclosureLevel:'detailed' },
    { rawLabel:'Egresos de otras secciones', normalizedCategory:'youth_other_sports_expense', amountNative:-4732.977406, disclosureLevel:'detailed', items:[
      ['Pago de remuneraciones otras actividades deportivas', -894.565507], ['Pago de gastos otras actividades deportivas', -572.029391],
      ['Pago de remuneraciones de instituciones educativas', -2743.247721], ['Pago de gastos de instituciones educativas', -523.134788],
    ]},
    { rawLabel:'Otros egresos', normalizedCategory:'admin_general_expense', amountNative:-17160.514764, disclosureLevel:'detailed', items:[
      ['Pago de gastos de administración', -12318.896759], ['Pago de otros gastos ordinarios', -436.882116],
      ['Pago de impuestos, tasas y contribuciones', -2427.991586], ['Pago de gastos financieros', -1976.744303],
    ]},
    { rawLabel:'Egresos extraordinarios (compra de bienes de uso y mejoras, principalmente)', normalizedCategory:'other_expenses', amountNative:-7014.228299, disclosureLevel:'detailed' },
  ],
  // Fuente: presupuesto2026-27.md. Desde la Versión 38, "Egresos generados por fútbol" (grupo A) se
  // carga como 9 líneas de primer nivel (mismo motivo que 2026 y que el lado de ingresos — el
  // documento SÍ las separa, no es un bolsón). La suma de estas 9 líneas da EXACTO $105.550.110.665,
  // el mismo subtotal que imprime el documento para ese grupo — CORRECCIÓN a lo que decía este mismo
  // comentario hasta la Versión 32: se había afirmado una diferencia de $10.000 entre la suma de los
  // 9 ítems y el total impreso ("redondeo del propio documento"), pero esa diferencia era un error
  // de suma manual de esta sesión, no algo real del documento — al promover los 9 ítems a líneas de
  // primer nivel y dejar que `computeYearGeneric` los sume de verdad (en vez de sumarlos a mano),
  // `verifyTieOuts()` confirmó que cierran exacto contra el TOTAL DE EGRESOS DE FONDOS DEL PERÍODO
  // impreso ($142.071.747.998), sin necesidad de ningún chequeo especial.
  2027: [
    { rawLabel:'Pago de gastos explotación del estadio', normalizedCategory:'admin_general_expense', amountNative:-5309.807479, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por participación', normalizedCategory:'match_organisation_expense', amountNative:-7340.691293, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones plantel profesional', normalizedCategory:'wages_squad', amountNative:-28190.431748, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-4191.06686, disclosureLevel:'detailed' },
    { rawLabel:'Pago de otros gastos deportivos fútbol profesional', normalizedCategory:'wages_squad', amountNative:-12923.34615, disclosureLevel:'detailed' },
    { rawLabel:'Pago por adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-19318.430324, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por compraventa de jugadores', normalizedCategory:'other_expenses', amountNative:-14335.322189, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos fútbol amateur (activable)', normalizedCategory:'youth_other_sports_expense', amountNative:-5462.113805, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos de comercialización', normalizedCategory:'admin_general_expense', amountNative:-8478.900817, disclosureLevel:'detailed' },
    { rawLabel:'Egresos de otras secciones', normalizedCategory:'youth_other_sports_expense', amountNative:-5981.254752, disclosureLevel:'detailed', items:[
      ['Pago de remuneraciones otras actividades deportivas', -389.374038], ['Pago de gastos otras actividades deportivas', -1970.613103],
      ['Pago de remuneraciones de instituciones educativas', -2789.252081], ['Pago de gastos de instituciones educativas', -832.01553],
    ]},
    { rawLabel:'Otros egresos', normalizedCategory:'admin_general_expense', amountNative:-19998.655736, disclosureLevel:'detailed', items:[
      ['Pago de gastos de administración', -15375.16962], ['Pago de otros gastos ordinarios', -519.097351],
      ['Pago de impuestos, tasas y contribuciones', -2157.3], ['Pago de gastos financieros', -1947.088765],
    ]},
    { rawLabel:'Egresos extraordinarios (compra de bienes de uso y mejoras, principalmente)', normalizedCategory:'other_expenses', amountNative:-10541.726845, disclosureLevel:'detailed' },
  ],
};

// currency/fx (Versión 32): ver comentario de cabecera. 2009-2011 quedan en 'USD' (amountNative ya
// convertido, no re-extraído) con el mismo fx ya documentado arriba (usado para reconstruir un ARS
// aproximado si se togglea a ARS). 2024 en adelante están en 'ARS' (amountNative nativo) con el fx
// declarado por el propio documento (balance o presupuesto), no una cotización externa.
const racingFiscalYearMeta = {
  2009: {
    currency:'USD', fx:3.82, fxSource:'market_approx',
    sourceId:'racing-balance-2009',
    reportType:'official_balance_sheet',
    gestionId:null, // pre-Blanco (asumió 2013), presidencia no verificada — ver comentario arriba
    grossDebt:18.393, cash:1.993, profitOnPlayerSales:0, assetSales:0, netInterest:-0.042, tax:0,
    // TOTALES OFICIALES CARGADOS EL 2026-09-20 (to-do 20(e)). Hasta acá estos 3 ejercicios eran
    // los únicos REALES del sitio sin ningún número de control: `verifyTieOuts()` no tenía contra
    // qué compararlos, así que un dígito mal transcripto en cualquiera de sus líneas no lo hubiera
    // detectado nadie, nunca.
    // EN QUÉ MONEDA VAN: estos 3 ejercicios están guardados en USD ya-convertido (ver el comentario
    // de cabecera y la excepción documentada en club-data-mapping §5), así que los totales van
    // también en USD, dividiendo el número impreso en pesos por el MISMO fx con el que se
    // convirtió cada línea. Eso no vuelve circular el chequeo: como todas las líneas usan ese
    // mismo fx, la división es exacta y lo que se verifica sigue siendo lo que importa — que la
    // SUMA de las líneas transcriptas reproduzca el total que imprime el documento.
    // officialTotalExpenses QUEDA EN null A PROPÓSITO, no es un olvido: el "TOTAL DE GASTOS" que
    // imprime el Estado de Recursos y Gastos de estos balances NO tiene el mismo alcance que
    // `expenses + nonCash` del sitio (deja afuera amortizaciones y cargos extraordinarios, y no lo
    // hace igual en los 3 años). Es exactamente el caso que club-data-mapping §6.4 manda NO forzar:
    // un check automático contra un número que significa otra cosa se ve como "no cierra" por una
    // diferencia de definición, no de datos. La verificación se hizo por el camino fuerte, que es
    // el PAT — un solo número inambiguo que no depende de cómo agrupe el documento.
    // Recursos: "TOTAL DE RECURSOS" $78.209.061 + "Total Recursos Extraordinarios" $9.195.840
    // (el Estado los imprime separados) = $87.404.901. PAT: "RESULTADO FINAL (Ganancia)" $2.687.137.
    // Verificado con computeYearGeneric(): PAT calculado 0,704000 contra 0,703439 impreso, o sea
    // $2.143 ARS sobre $87 millones — es el redondeo de guardar las líneas con 3 decimales de M USD.
    officialTotalRevenue:22.880864, officialTotalExpenses:null, officialPAT:0.703439,
  },
  2010: {
    currency:'USD', fx:3.98, fxSource:'market_approx',
    sourceId:'racing-balance-2010',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:26.459, cash:0.713, profitOnPlayerSales:0, assetSales:0, netInterest:-0.612, tax:0,
    // TOTALES OFICIALES CARGADOS EL 2026-09-20 (to-do 20(e)). Hasta acá estos 3 ejercicios eran
    // los únicos REALES del sitio sin ningún número de control: `verifyTieOuts()` no tenía contra
    // qué compararlos, así que un dígito mal transcripto en cualquiera de sus líneas no lo hubiera
    // detectado nadie, nunca.
    // EN QUÉ MONEDA VAN: estos 3 ejercicios están guardados en USD ya-convertido (ver el comentario
    // de cabecera y la excepción documentada en club-data-mapping §5), así que los totales van
    // también en USD, dividiendo el número impreso en pesos por el MISMO fx con el que se
    // convirtió cada línea. Eso no vuelve circular el chequeo: como todas las líneas usan ese
    // mismo fx, la división es exacta y lo que se verifica sigue siendo lo que importa — que la
    // SUMA de las líneas transcriptas reproduzca el total que imprime el documento.
    // officialTotalExpenses QUEDA EN null A PROPÓSITO, no es un olvido: el "TOTAL DE GASTOS" que
    // imprime el Estado de Recursos y Gastos de estos balances NO tiene el mismo alcance que
    // `expenses + nonCash` del sitio (deja afuera amortizaciones y cargos extraordinarios, y no lo
    // hace igual en los 3 años). Es exactamente el caso que club-data-mapping §6.4 manda NO forzar:
    // un check automático contra un número que significa otra cosa se ve como "no cierra" por una
    // diferencia de definición, no de datos. La verificación se hizo por el camino fuerte, que es
    // el PAT — un solo número inambiguo que no depende de cómo agrupe el documento.
    // Recursos: "TOTAL DE RECURSOS" $72.936.813 + Extraordinarios $370.152 = $73.306.965. PAT:
    // "RESULTADO FINAL (Pérdida)" -$9.714.118. Verificado: PAT -2,439000 contra -2,440733, $6.898 ARS.
    // OJO, DIFERENCIA INTERNA DEL PROPIO DOCUMENTO: el Anexo imprime "Total Recursos Ordinarios"
    // $74.533.299, que NO es el "TOTAL DE RECURSOS" $72.936.813 del Estado de Recursos y Gastos.
    // Las líneas cargadas reproducen el del ESTADO, que es el número del cuerpo principal.
    officialTotalRevenue:18.418835, officialTotalExpenses:null, officialPAT:-2.440733,
  },
  2011: {
    currency:'USD', fx:4.27, fxSource:'market_approx',
    sourceId:'racing-balance-2011',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:24.395, cash:0.542, profitOnPlayerSales:0, assetSales:0, netInterest:-0.942, tax:0,
    // TOTALES OFICIALES CARGADOS EL 2026-09-20 (to-do 20(e)). Hasta acá estos 3 ejercicios eran
    // los únicos REALES del sitio sin ningún número de control: `verifyTieOuts()` no tenía contra
    // qué compararlos, así que un dígito mal transcripto en cualquiera de sus líneas no lo hubiera
    // detectado nadie, nunca.
    // EN QUÉ MONEDA VAN: estos 3 ejercicios están guardados en USD ya-convertido (ver el comentario
    // de cabecera y la excepción documentada en club-data-mapping §5), así que los totales van
    // también en USD, dividiendo el número impreso en pesos por el MISMO fx con el que se
    // convirtió cada línea. Eso no vuelve circular el chequeo: como todas las líneas usan ese
    // mismo fx, la división es exacta y lo que se verifica sigue siendo lo que importa — que la
    // SUMA de las líneas transcriptas reproduzca el total que imprime el documento.
    // officialTotalExpenses QUEDA EN null A PROPÓSITO, no es un olvido: el "TOTAL DE GASTOS" que
    // imprime el Estado de Recursos y Gastos de estos balances NO tiene el mismo alcance que
    // `expenses + nonCash` del sitio (deja afuera amortizaciones y cargos extraordinarios, y no lo
    // hace igual en los 3 años). Es exactamente el caso que club-data-mapping §6.4 manda NO forzar:
    // un check automático contra un número que significa otra cosa se ve como "no cierra" por una
    // diferencia de definición, no de datos. La verificación se hizo por el camino fuerte, que es
    // el PAT — un solo número inambiguo que no depende de cómo agrupe el documento.
    // Recursos: "TOTAL DE RECURSOS" $108.779.778, sin extraordinarios este ejercicio (el Estado
    // imprime "Total Recursos Extraordinarios" $0). PAT: $267.202. Verificado: 0,063000 contra
    // 0,062577, o sea $1.808 ARS.
    // OJO CON EL RÓTULO, ES EL CASO QUE club-data-mapping §6.3 usa de ejemplo Y ES ESTE EJERCICIO:
    // el Estado dice "RESULTADO FINAL (Pérdida)" y el número es POSITIVO (+$267.202); el Estado de
    // Evolución del Patrimonio Neto, en el mismo balance, lo llama "(Superavit)". El rótulo quedó
    // de la plantilla del año anterior (2010 sí fue pérdida). Manda el número, no el rótulo.
    // Mismo caso que el Anexo de 2010: el Anexo dice "Total Recursos Ordinarios" $109.729.244
    // contra los $108.779.778 del Estado. Las líneas reproducen el del Estado.
    officialTotalRevenue:25.475358, officialTotalExpenses:null, officialPAT:0.062577,
  },
  // Ejercicio N° 110 (1°/11/2011 al 31/10/2012, ver comentario completo junto a
  // racingRevenueLinesByYear[2012]). PRE-Blanco (`gestionId:null`, presidente Gastón Federico
  // Cogorno). A diferencia de 2009-2011 (USD ya-convertido), este ejercicio está en ARS NATIVO
  // (`currency:'ARS'`) con fx=4,7260, la tasa dominante que declara el propio balance en su Anexo
  // de Moneda Extranjera (lado Activo — el lado Pasivo usa $4,7660, inconsistencia menor del
  // propio documento). grossDebt = TOTAL DEL PASIVO (Estado de Situación Patrimonial). cash = Caja
  // y Bancos (misma página). netInterest = Resultados Financieros Ingresos−Egresos del Estado de
  // Recursos y Gastos (6.078.346−7.059.282 = −980.936).
  2012: {
    currency:'ARS', fx:4.7260, fxSource:'document_close',
    sourceId:'racing-balance-2012',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:115.415132, cash:1.275318, profitOnPlayerSales:0, assetSales:0, netInterest:-0.980936, tax:0,
    officialTotalRevenue:184.791901, officialTotalExpenses:166.786611, officialPAT:17.024354,
  },
  // Ejercicio N° 111 (1°/11/2012 al 31/10/2013, ver comentario completo junto a
  // racingRevenueLinesByYear[2013]). Balance real (`reportType:'official_balance_sheet'`).
  // `gestionId:null` por inferencia de fecha, NO confirmado con certeza (ninguna página de este
  // balance puntual muestra firma de Presidente) — ver nota completa en
  // `Clubes/Argentina/Racing/racing-balance-2013.md`. fx=5,8720, la tasa dominante que declara el
  // propio balance en su Anexo de Moneda Extranjera. grossDebt = TOTAL DEL PASIVO (Estado de
  // Situación Patrimonial). cash = Caja y Bancos (misma página). netInterest = Resultados
  // Financieros Ingresos−Egresos del Estado de Recursos y Gastos (12.161.277−11.995.156 =
  // 166.121).
  2013: {
    currency:'ARS', fx:5.8720, fxSource:'document_close',
    sourceId:'racing-balance-2013',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:133.030906, cash:4.180729, profitOnPlayerSales:0, assetSales:0, netInterest:0.166121, tax:0,
    officialTotalRevenue:188.690953, officialTotalExpenses:177.630233, officialPAT:11.226840,
  },
  // Ejercicio N° 112 (1°/11/2013 al 31/8/2014, irregular de 10 meses, ver comentario completo
  // junto a racingRevenueLinesByYear[2014]). `reportType:'official_budget_and_balance'`: este
  // balance convive con `racingPresupuestoOverlayByYear[2014]` (el presupuesto 2013/2014, mismo
  // ejercicio, movido acá desde los slots principales) — el balance sigue siendo el dato PRIMARIO
  // (KPIs/Formato Simplificado/verifyTieOuts salen de acá). fx=8,3070, la tasa dominante que
  // declara el propio balance en su Anexo de Moneda Extranjera. grossDebt = TOTAL DEL PASIVO
  // (Estado de Situación Patrimonial). cash = Caja y Bancos (misma página). netInterest =
  // Resultados Financieros Ingresos−Egresos del Estado de Recursos y Gastos
  // (22.318.464−5.867.338 = 16.451.126).
  2014: {
    currency:'ARS', fx:8.3070, fxSource:'document_close',
    sourceId:'racing-balance-2014',
    reportType:'official_budget_and_balance',
    gestionId:'blanco',
    grossDebt:91.442572, cash:4.696944, profitOnPlayerSales:0, assetSales:0, netInterest:16.451126, tax:0,
    officialTotalRevenue:302.631868, officialTotalExpenses:218.146259, officialPAT:100.936735,
  },
  // Ejercicio N° 114 (1°/9/2015 al 31/8/2016, ver comentario completo junto a
  // racingRevenueLinesByYear[2016]). `reportType:'official_budget_and_balance'`: este balance
  // convive con `racingPresupuestoOverlayByYear[2016]` (el presupuesto 2015/2016, mismo ejercicio,
  // movido acá desde los slots principales) — el balance sigue siendo el dato PRIMARIO. fx=14,83,
  // la tasa dominante que declara el propio balance en su Anexo V (Moneda Extranjera). grossDebt =
  // TOTAL DEL PASIVO (Estado de Situación Patrimonial). cash = Caja y Bancos (misma página).
  // netInterest = Resultados Financieros y por tenencia del Anexo II (4.065.311+19.592.652 =
  // 23.657.963 — este ejercicio no desglosa un lado "Egresos" financieros separado).
  2016: {
    currency:'ARS', fx:14.83, fxSource:'document_close',
    sourceId:'racing-balance-2016',
    reportType:'official_budget_and_balance',
    gestionId:'blanco',
    grossDebt:98.450187, cash:42.030653, profitOnPlayerSales:0, assetSales:0, netInterest:23.657963, tax:0,
    officialTotalRevenue:611.968373, officialTotalExpenses:441.653033, officialPAT:193.973303,
  },
  // Ejercicio N° 113 (1°/9/2014 al 31/8/2015, ver comentario completo junto a
  // racingRevenueLinesByYear[2015]). Balance real (`reportType:'official_balance_sheet'`, sin
  // presupuesto propio en el archivo para este mismo ejercicio). fx=9,20, el dólar oficial de
  // cierre de agosto de 2015 (tasa dominante del Anexo de Moneda Extranjera). grossDebt = TOTAL
  // DEL PASIVO (Estado de Situación Patrimonial). cash = Caja y Bancos (misma página). netInterest
  // = Resultados Financieros Ingresos−Egresos del Estado de Recursos y Gastos
  // (7.900.977−4.016.785 = 3.884.192).
  2015: {
    currency:'ARS', fx:9.20, fxSource:'document_close',
    sourceId:'racing-balance-2014-15',
    reportType:'official_balance_sheet',
    gestionId:'blanco',
    grossDebt:65.098611, cash:7.838386, profitOnPlayerSales:0, assetSales:0, netInterest:3.884192, tax:0,
    officialTotalRevenue:430.314984, officialTotalExpenses:331.654662, officialPAT:102.544513,
  },
  // Ejercicio N° 115 (1°/9/2016 al 31/8/2017, ver comentario completo junto a
  // racingRevenueLinesByYear[2017]). Balance real (`reportType:'official_balance_sheet'`, sin
  // presupuesto propio en el archivo). fx=17,21, la tasa dominante que declara el propio balance
  // en su Anexo V. grossDebt = TOTAL DEL PASIVO. cash = Caja y Bancos. netInterest = Intereses
  // financieros + Diferencias de cambio del Estado de Recursos y Gastos (16.091.594+21.628.821 =
  // 37.720.415).
  2017: {
    currency:'ARS', fx:17.21, fxSource:'document_close',
    sourceId:'racing-balance-2017',
    reportType:'official_balance_sheet',
    gestionId:'blanco',
    grossDebt:198.933525, cash:41.104353, profitOnPlayerSales:0, assetSales:0, netInterest:37.720415, tax:0,
    officialTotalRevenue:804.833215, officialTotalExpenses:708.392954, officialPAT:134.160676,
  },
  // Ejercicio 2017/2018 (Ejercicio N° 116, ver comentario completo junto a
  // racingRevenueLinesByYear[2018]). fx = 36,65, declarado en el Anexo V "Activos y pasivos en
  // moneda extranjera" (pág. 27-29 de racing-balance-2018.md), tipo de cambio USD al 31/08/2018,
  // usado en todo el Anexo salvo una partida puntual de pasivo que declara 36,85 (inconsistencia
  // menor del propio documento, no investigada más, mismo criterio que la diferencia $73,98/$74,18
  // ya documentada para el Ejercicio 2019/2020). `reportType:'official_budget_and_balance'`: este
  // balance convive con `racingPresupuestoOverlayByYear[2018]` (mismo ejercicio, el presupuesto ya
  // cargado en la Versión 63) — el balance sigue siendo el dato PRIMARIO (KPIs/Formato
  // Simplificado/verifyTieOuts salen de acá).
  //
  // netInterest = 177,149112 = "Intereses financieros" (28,953390) + "Diferencias de cambio"
  // (148,195722), las 2 líneas que el balance agrupa bajo "Resultados Financieros y por tenencia"
  // (pág. 5) — se combinan en un solo netInterest, mismo criterio que el resto de los balances de
  // Racing (que reportan esto como una sola línea "incluyendo el R.E.C.P.A.M."), aunque ESTE
  // documento puntual las separe en 2 sub-líneas.
  //
  // Verificación (Versión 64): revenueLines suma exacto $1.789.819.233 (TOTAL DE RECURSOS impreso).
  // expenseLines suma exacto $(1.350.447.843) ($1.093.025.917 de Anexo III + $249.645.990 de
  // Previsiones/Amortizaciones intangibles + $7.775.936 de Depreciaciones de Anexo I). Resultado:
  // 1.789.819.233 - 1.350.447.843 + 177.149.112 = 616.520.502, exacto contra "RESULTADO FINAL –
  // Superávit" impreso — ver verifyTieOuts().
  2018: {
    currency:'ARS', fx:36.65, fxSource:'document_close',
    sourceId:'racing-balance-2018',
    reportType:'official_budget_and_balance',
    gestionId:'blanco',
    grossDebt:458.940640, cash:405.685775, profitOnPlayerSales:0, assetSales:0, netInterest:177.149112, tax:0,
    officialTotalRevenue:1789.819233, officialTotalExpenses:1350.447843, officialPAT:616.520502,
  },
  // Ejercicio 2018/2019 (1°/9/2018 al 31/8/2019, ver comentario completo junto a
  // racingRevenueLinesByYear[2019]). PRESUPUESTO-ONLY, sin balance real cargado todavía para este
  // ejercicio (`reportType:'official_budget'` simple, no `official_budget_and_balance`) — a
  // diferencia de 2017/2018 y 2019/2020 (que sí tienen las 2 fuentes), este ejercicio queda con un
  // solo lado hasta que se cargue (si aparece) el balance auditado real. fx=40, declarado en las
  // Premisas Macro del propio presupuesto (pág. 2: "Estimamos un TC de $ 40.- por u$d 1.- en
  // promedio para el período"). Sin balance real, no hay grossDebt/cash/netInterest que declarar
  // (mismo criterio que 2026/2027, únicos otros `official_budget` simples del sitio): quedan en 0.
  2019: {
    currency:'ARS', fx:40, fxSource:'document_assumption',
    sourceId:'racing-presupuesto-2018-19',
    reportType:'official_budget',
    gestionId:'blanco',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:1616.026650, officialTotalExpenses:1756.652573,
  },
  // Ejercicio 2019/2020 (Ejercicio N° 118, ver comentario completo junto a racingRevenueLinesByYear
  // [2020]). fx = 73,98, declarado en el Anexo V "Activos y pasivos en moneda extranjera" (pág. 30
  // del balance), tipo de cambio USD al 31/08/2020 (regla #1 del skill: usar el que declara el
  // propio documento). OJO: 3 líneas sueltas de "Otras deudas" (pasivo) en ese mismo Anexo V usan
  // $74,18 en vez de $73,98, una inconsistencia real del propio documento (¿fecha de registración
  // distinta?), no se investigó más porque son ~$2M ARS del total, se usó el tipo de cambio
  // dominante (73,98, usado en absolutamente todo el resto del Anexo).
  // reportType 'official_budget_and_balance' (Versión 58, primer ejercicio del sitio que lo usa):
  // este balance real convive con `racingPresupuestoOverlayByYear[2020]` (mismo ejercicio,
  // 1°/9/2019 al 31/8/2020). El balance sigue siendo el dato PRIMARIO (KPIs/Formato Simplificado/
  // verifyTieOuts salen de acá, sin cambios); el presupuesto es la columna "Presupuesto" de
  // comparación en "Estado de resultados" (ver `.claude/skills/club-or-year-onboarding/SKILL.md`
  // sección 7).
  2020: {
    currency:'ARS', fx:73.98, fxSource:'document_close',
    sourceId:'racing-balance-2019-20',
    reportType:'official_budget_and_balance',
    gestionId:'blanco',
    // grossDebt = TOTAL DEL PASIVO (Estado de situación patrimonial, pág. 3, columna 31/08/2020).
    // cash = Caja y bancos (misma página). netInterest = "Resultados financieros y por tenencia
    // (incluyendo el RECPAM)" del Estado de recursos y gastos (pág. 4, columna 2020).
    // assetSales = "Ingresos Terreno Tita Mattiussi" (Nota 10): $0 este ejercicio (fue un ingreso
    // único del ejercicio ANTERIOR, 2018/2019, todavía no cargado en el sitio), se deja el campo
    // documentado para cuando se cargue ese ejercicio (columna comparativa del balance: 738,941791
    // M, pero esa cifra pertenece al año 2019, no se puede usar acá sin re-extraer del balance de
    // ESE ejercicio, ver skill sección 6.5).
    grossDebt:715.799969, cash:585.611084, profitOnPlayerSales:0, assetSales:0, netInterest:227.570638, tax:0,
    officialTotalRevenue:2436.102976, officialTotalExpenses:2940.733186, officialPAT:-277.059572,
  },
  // Ejercicio 2020/2021 (Ejercicio N° 119, irregular de 10 meses: 1°/9/2020 al 30/6/2021, gestión
  // Blanco, ver comentario completo junto a racingRevenueLinesByYear[2021]). fx = 95,52, declarado
  // en el Anexo V "Activos y pasivos en moneda extranjera" (pág. 30 del balance), tipo de cambio
  // USD al 30/06/2021, usado de forma consistente en TODO el Anexo (Caja, bancos, divisas en
  // custodia, créditos por venta de jugadores en USD), sin la inconsistencia puntual que sí tuvo el
  // Anexo V del ejercicio anterior. `official_balance_sheet` simple (no `official_budget_and_balance`
  // como 2020): el archivo de Racing no tiene un presupuesto propio de este ejercicio de transición.
  2021: {
    currency:'ARS', fx:95.52, fxSource:'document_close',
    sourceId:'racing-balance-2021',
    reportType:'official_balance_sheet',
    gestionId:'blanco',
    // grossDebt = TOTAL DEL PASIVO (Estado de situación patrimonial, pág. 4, columna 30/06/2021).
    // cash = Caja y bancos (misma página). netInterest = "Resultados Financieros y por tenencia
    // (Incluyendo el R.E.C.P.A.M.)" del Estado de recursos y gastos (pág. 5, columna 2021).
    grossDebt:885.305109, cash:1154.224649, profitOnPlayerSales:0, assetSales:0, netInterest:75.896098, tax:0,
    officialTotalRevenue:3335.562848, officialTotalExpenses:3404.446864, officialPAT:7.012082,
  },
  2024: {
    currency:'ARS', fx:909, fxSource:'document_close',
    sourceId:'racing-balance-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'blanco',
    // grossDebt = TOTAL DEL PASIVO (Estado de situación patrimonial, pág. 2 del balance 2023-24,
    // columna 30/06/2024). cash = Caja y bancos (misma página). netInterest = "Resultados
    // Financieros y por tenencia (Incluyendo el R.E.C.P.A.M.)" del Estado de recursos y gastos,
    // columna 2024 (pág. 3).
    grossDebt:30889.883055, cash:3854.010152, profitOnPlayerSales:0, assetSales:0, netInterest:6672.632331, tax:0,
    // officialTotalRevenue = TOTAL DE RECURSOS ORDINARIOS impreso ($66.367.712.489). officialTotalExpenses
    // = Total de Gastos Ordinarios impreso ($55.847.189.733) + Depreciaciones ($2.488.762.976) +
    // Previsiones/Amortizaciones intangibles ($20.832.011.983), porque esas dos últimas se cargaron
    // como líneas de expenseLines (no como meta) — ver verifyTieOuts. Todo en ARS millones (Versión 32).
    officialTotalRevenue:66367.712489, officialTotalExpenses:79167.964692, officialPAT:-6127.619872,
  },
  2025: {
    currency:'ARS', fx:1196, fxSource:'document_close',
    sourceId:'racing-balance-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'milito',
    // Mismo criterio que 2024: TOTAL DEL PASIVO / Caja y bancos del Estado de situación patrimonial
    // (pág. 2 del balance 2024-25, columna 30/06/2025); netInterest del Estado de recursos y gastos
    // (pág. 3, columna 2025).
    grossDebt:48210.858049, cash:9738.609524, profitOnPlayerSales:0, assetSales:0, netInterest:3715.545468, tax:0,
    officialTotalRevenue:87399.617009, officialTotalExpenses:91293.614298, officialPAT:-178.451821,
  },
  2026: {
    currency:'ARS', fx:1438, fxSource:'document_assumption',
    sourceId:'racing-presupuesto-2025-26',
    reportType:'official_budget',
    gestionId:'milito',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:123297.209473, officialTotalExpenses:126860.457441,
  },
  // Nuevo en la Versión 32. fx = promedio de los dos puntos que declara el propio presupuesto
  // como premisa ("$1.505 para Julio 2026 y $1.870 para Junio 2027") = $1.687,5 — mismo criterio
  // que usa Boca para su Presupuesto 2027 (promedio inicio/cierre declarado por el documento).
  2027: {
    currency:'ARS', fx:1687.5, fxSource:'document_assumption',
    sourceId:'racing-presupuesto-2026-27',
    reportType:'official_budget',
    gestionId:'milito',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:143118.482343, officialTotalExpenses:142071.747998,
  },
};

// racingPresupuestoOverlayByYear (Versión 57): para un ejercicio con `reportType:
// 'official_budget_and_balance'` arriba (el balance real es el dato primario de ese año), acá va
// el Presupuesto de ESE MISMO ejercicio, usado solo para la columna "Presupuesto" de comparación en
// "Estado de resultados" (ver `presupuestoOverlayFor()`/`presupuestoOverlayReportFor()` en
// js/finanzas-calc.js). Formato: mismo shape que racingRevenueLinesByYear/racingExpenseLinesByYear
// (rawLabel/normalizedCategory/amountNative/items), más su propio currency/fx (puede declarar un
// tipo de cambio distinto al del balance del mismo ejercicio, ver club-data-mapping SKILL.md
// sección 5).
//
// Ejercicio 2020 (Versión 58): primer overlay real cargado, `presupuesto2019-20.pdf` (mismo
// ejercicio 1°/9/2019 al 31/8/2020 que el balance real ya cargado en racingRevenueLinesByYear
// [2020]/racingExpenseLinesByYear[2020]). Es un ESCANEO (8 páginas, ~1 char/página, sin texto
// nativo), transcripto con el Read tool sobre imágenes de página, corrigiendo primero un desvío
// diagonal real del escaneo (~0,78°, medido maximizando la nitidez de las líneas horizontales de
// la grilla con PIL antes de recortar filas) — sin esa corrección, leer una columna angosta (ej. la
// de "TOTAL PERÍODO", la más a la derecha) hace que el valor de una fila "se lea" desplazado a la
// fila de arriba o abajo cuanto más lejos está del borde izquierdo, un efecto acumulativo de la
// inclinación. Encontrado así en esta sesión (y corregido con ayuda de Guido, que confirmó los
// valores correctos mirando el PDF él mismo): antes de deskewar, la fila "9.- Cobros de otros
// recursos de gestión por fútbol" parecía mostrar el mismo valor que "B. Ingresos Sociales" de la
// fila de abajo (634,152 M), cuando el valor real de la fila 9 es 18 M.
//
// CASO DE CRITERIO real encontrado en "2.- Cobranzas por participación" (Ingresos, pág. 7): el
// documento imprime 606,734 M en esa fila, pero sus propios sub-ítems (d+e+f: Competiciones
// oficiales S.A.F./internacionales/A.F.A.) solo suman 274,780 M. Guido explicó, mirando el PDF,
// que esa cifra impresa (606,734 M) es un ACUMULADO que además incluye las filas "3.- Cobranzas
// por venta de abonos" (123,154 M) y "4.- Cobros por retransmisión y derechos de TV" (208,800 M):
// 274,780 + 123,154 + 208,800 = 606,734 M exacto. Como el sitio carga 3 y 4 como líneas PROPIAS
// separadas, usar el 606,734 M impreso para "Cobranzas por participación" duplicaría esa plata.
// Se cargó acá el valor NO acumulado (274,780 M, la suma real de d+e+f), que es el que hace cerrar
// "A. Ingresos provenientes de fútbol" (2.242,767 M) y el total general contra los subtotales
// impresos (verificado exacto, ver comentario de verifyTieOuts en index.html).
//
// fx = 70 (ARS por USD), la premisa macro que el propio presupuesto declara ("Estimamos un TC de
// $70.- por u$d1.- en promedio para el período", pág. 2) — distinto del fx que declara el BALANCE
// real de este mismo ejercicio (73,98, del Anexo V), exactamente el caso que anticipaba el
// comentario de arriba: el presupuesto puede declarar su propio tipo de cambio, no hay que forzar
// el mismo que el balance.
const racingPresupuestoOverlayByYear = {
  // Ejercicio N° 112 (2013/2014, 1°/11/2013 al 31/8/2014): `presupuesto2013-14.pdf`, cargado
  // originalmente como el dato PRIMARIO (único documento de este ejercicio en ese momento,
  // `official_budget` simple). Al cargar `balance2014.pdf` (el balance real del mismo ejercicio,
  // Ejercicio N° 112, irregular de 10 meses), este pasa a ser el dato primario (ver
  // `racingRevenueLinesByYear[2014]`/`racingFiscalYearMeta[2014]`,
  // `reportType:'official_budget_and_balance'`) — estas mismas líneas de presupuesto, sin tocar un
  // solo valor, se movieron acá como columna de comparación. Mismo criterio de categorización que
  // tenían en los slots principales, sin cambios, solo cambió DÓNDE viven estos datos en el
  // archivo.
  2014: {
    currency:'ARS', fx:6.00, fxSource:'document_assumption',
    sourceId:'racing-presupuesto-2013-14',
    revenueLines: [
      { rawLabel:'Campeonatos Oficiales AFA', normalizedCategory:'matchday_competition', amountNative:8.810000 },
      { rawLabel:'Otras Comp. y Partidos Amistosos', normalizedCategory:'matchday_competition', amountNative:2.400000 },
      { rawLabel:'Derechos de Retransmisión', normalizedCategory:'broadcasting', amountNative:35.200000 },
      { rawLabel:'Pub. y Esponsorización Futbol', normalizedCategory:'sponsorship_commercial', amountNative:23.166673 },
      { rawLabel:'Otros Ingresos por alquiler de cancha', normalizedCategory:'other_income', amountNative:0.270000 },
      { rawLabel:'Cesión de Jugadores (Transf. / Prést.)', normalizedCategory:'player_sales', amountNative:85.802408 },
      { rawLabel:'Ingresos por Prop. Industrial / Intelectual cedida en Explotación', normalizedCategory:'other_income', amountNative:6.125000 },
      { rawLabel:'Otros Ingresos de Gestión por Futbol', normalizedCategory:'other_income', amountNative:11.790000 },
      { rawLabel:'Cobranza de Ingresos de Otras Secciones Deportivas', normalizedCategory:'other_sports', amountNative:2.590000 },
      { rawLabel:'Ingresos por Socios', normalizedCategory:'member_dues', amountNative:47.300000 },
      { rawLabel:'Ingresos Varios Sede', normalizedCategory:'other_income', amountNative:4.953750 },
      { rawLabel:'Ingresos por Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:9.350000 },
      { rawLabel:'Cobro de Subv., Donaciones y Legados', normalizedCategory:'other_income', amountNative:5.994000 },
      { rawLabel:'Otros cobros de Ing. Extraordinarios', normalizedCategory:'other_income', amountNative:0.600000 },
    ],
    expenseLines: [
      { rawLabel:'Gastos de Explotación del Estadio', normalizedCategory:'admin_general_expense', amountNative:-2.310000 },
      { rawLabel:'Participación en Camp. Oficiales AFA', normalizedCategory:'match_organisation_expense', amountNative:-5.353950 },
      { rawLabel:'Part. en Campeonatos Internacionales', normalizedCategory:'match_organisation_expense', amountNative:-0.226400 },
      { rawLabel:'Gtos Derechos Televisación', normalizedCategory:'admin_general_expense', amountNative:-0.648000 },
      { rawLabel:'Remuneraciones Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-22.988878 },
      { rawLabel:'Primas Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-22.670010 },
      { rawLabel:'Premios Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-8.748435 },
      { rawLabel:'Pretemporada', normalizedCategory:'wages_squad', amountNative:-0.990000 },
      { rawLabel:'Otros Gastos Dep. Futbol Profesional', normalizedCategory:'wages_squad', amountNative:-28.166451 },
      { rawLabel:'Inversiones en Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-7.145684 },
      { rawLabel:'Gastos de Seguridad', normalizedCategory:'admin_general_expense', amountNative:-6.426500 },
      { rawLabel:'Servicios Médicos', normalizedCategory:'admin_general_expense', amountNative:-1.785000 },
      { rawLabel:'Pago de Gtos de Otras Secciones Dep.', normalizedCategory:'youth_other_sports_expense', amountNative:-2.091000 },
      { rawLabel:'Departamentos Auxiliares - Socios', normalizedCategory:'admin_general_expense', amountNative:-0.630000 },
      { rawLabel:'Departamentos Auxiliares - Imagen / Prensa', normalizedCategory:'admin_general_expense', amountNative:-0.600000 },
      { rawLabel:'Gastos Generales de Administración', normalizedCategory:'admin_general_expense', amountNative:-6.570000 },
      { rawLabel:'Pago de Otros Gastos Ordinarios', normalizedCategory:'other_expenses', amountNative:-37.975000 },
      { rawLabel:'Pago de Moratoria', normalizedCategory:'admin_general_expense', amountNative:-3.600000 },
      { rawLabel:'Pago de Otros Pasivos', normalizedCategory:'other_expenses', amountNative:-25.655611 },
      { rawLabel:'Pagos por compra de Bienes de Uso', normalizedCategory:'other_expenses', amountNative:-0.500000 },
      { rawLabel:'Pago por compra de Inv. Estadio', normalizedCategory:'other_expenses', amountNative:-1.300000 },
      { rawLabel:'Pagos por Colocaciones Fras.', normalizedCategory:'other_expenses', amountNative:-7.500000 },
      { rawLabel:'Cancelación Efectiva de Pasivos', normalizedCategory:'other_expenses', amountNative:-28.165654 },
      { rawLabel:'Cancelación Efva por Cpra de Jug.', normalizedCategory:'player_amortisation', amountNative:-7.500000 },
    ],
  },
  // Ejercicio N° 114 (2015/2016, 1°/9/2015 al 31/8/2016): `presupuesto2015-16.pdf`, cargado
  // originalmente como el dato PRIMARIO (único documento de este ejercicio en ese momento,
  // `official_budget` simple). Al cargar `balance2016.pdf` (el balance real del mismo ejercicio),
  // este pasa a ser el dato primario (ver `racingRevenueLinesByYear[2016]`/
  // `racingFiscalYearMeta[2016]`, `reportType:'official_budget_and_balance'`) — estas mismas
  // líneas de presupuesto, sin tocar un solo valor, se movieron acá como columna de comparación.
  2016: {
    currency:'ARS', fx:11.80, fxSource:'document_assumption',
    sourceId:'racing-presupuesto-2015-16',
    revenueLines: [
      { rawLabel:'Campeonatos Oficiales AFA', normalizedCategory:'matchday_competition', amountNative:23.045000 },
      { rawLabel:'Comp. Oficiales Internacionales', normalizedCategory:'matchday_competition', amountNative:40.300000 },
      { rawLabel:'Otras Comp. y Partidos Amistosos', normalizedCategory:'matchday_competition', amountNative:4.405000 },
      { rawLabel:'Derechos de Retransmisión', normalizedCategory:'broadcasting', amountNative:59.000000 },
      { rawLabel:'Pub. y Esponsorización Futbol', normalizedCategory:'sponsorship_commercial', amountNative:45.600000 },
      { rawLabel:'Otros Ingresos por alquiler de cancha', normalizedCategory:'other_income', amountNative:2.400000 },
      { rawLabel:'Otros Ingresos Dep. Futbol Prof.', normalizedCategory:'other_income', amountNative:2.480000 },
      { rawLabel:'Cesión de Jugadores (Transf. / Prést.)', normalizedCategory:'player_sales', amountNative:59.825000 },
      { rawLabel:'Ingresos por Prop. Industrial / Intelectual cedida en Explotación', normalizedCategory:'other_income', amountNative:9.000000 },
      { rawLabel:'Otros Ingresos de Gestión por Futbol', normalizedCategory:'other_income', amountNative:13.400000 },
      { rawLabel:'Cobranza de Ingresos de Otras Secciones Deportivas', normalizedCategory:'other_sports', amountNative:3.700000 },
      { rawLabel:'Ingresos por Socios', normalizedCategory:'member_dues', amountNative:155.500000 },
      { rawLabel:'Ingresos Varios Sede', normalizedCategory:'other_income', amountNative:10.400000 },
      { rawLabel:'Ingresos por Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:26.300000 },
      { rawLabel:'Cobro de Subv., Donaciones y Legados', normalizedCategory:'other_income', amountNative:8.640000 },
      { rawLabel:'Otros Cobros de Ing. Fros - Plazo Fijo', normalizedCategory:'other_income', amountNative:1.200000 },
    ],
    expenseLines: [
      { rawLabel:'Gastos de Explotación del Estadio', normalizedCategory:'admin_general_expense', amountNative:-3.450000 },
      { rawLabel:'Participación en Camp. Oficiales AFA', normalizedCategory:'match_organisation_expense', amountNative:-8.950000 },
      { rawLabel:'Part. en Campeonatos Internacionales', normalizedCategory:'match_organisation_expense', amountNative:-20.000000 },
      { rawLabel:'Participación en Otras Comp. y Partidos Amistosos', normalizedCategory:'match_organisation_expense', amountNative:-0.150000 },
      { rawLabel:'Gtos Derechos Televisación', normalizedCategory:'admin_general_expense', amountNative:-1.200000 },
      { rawLabel:'Remuneraciones Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-45.100000 },
      { rawLabel:'Primas Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-54.000000 },
      { rawLabel:'Premios Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-25.700000 },
      { rawLabel:'Pretemporada', normalizedCategory:'wages_squad', amountNative:-4.050000 },
      { rawLabel:'Otros Gastos Dep. Futbol Profesional', normalizedCategory:'wages_squad', amountNative:-14.500000 },
      { rawLabel:'Inversiones en Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-19.500000 },
      { rawLabel:'Gastos de Seguridad', normalizedCategory:'admin_general_expense', amountNative:-9.000000 },
      { rawLabel:'Servicios Médicos', normalizedCategory:'admin_general_expense', amountNative:-1.800000 },
      { rawLabel:'Pago de Gtos de Otras Secciones Dep.', normalizedCategory:'youth_other_sports_expense', amountNative:-4.950000 },
      { rawLabel:'Departamentos Auxiliares - Socios', normalizedCategory:'admin_general_expense', amountNative:-2.880000 },
      { rawLabel:'Departamentos Auxiliares - Imagen / Prensa', normalizedCategory:'admin_general_expense', amountNative:-1.800000 },
      { rawLabel:'Gastos Generales de Administración', normalizedCategory:'admin_general_expense', amountNative:-3.360000 },
      { rawLabel:'Pago de Otros Gastos Ordinarios', normalizedCategory:'other_expenses', amountNative:-139.000000 },
      { rawLabel:'Pago de Moratoria', normalizedCategory:'admin_general_expense', amountNative:-2.520000 },
      { rawLabel:'Pago de Otros Pasivos', normalizedCategory:'other_expenses', amountNative:-31.000000 },
      { rawLabel:'Pagos por compra de Bienes de Uso', normalizedCategory:'other_expenses', amountNative:-0.400000 },
      { rawLabel:'Pago por compra de Inv. Estadio y Bs Uso', normalizedCategory:'other_expenses', amountNative:-10.000000 },
      { rawLabel:'Pagos por Colocaciones Fras.', normalizedCategory:'other_expenses', amountNative:-8.400000 },
      { rawLabel:'Cancelación Efectiva de Pasivos', normalizedCategory:'other_expenses', amountNative:-8.016000 },
      { rawLabel:'Cancelación Efva por Cpra de Jug.', normalizedCategory:'player_amortisation', amountNative:-52.500000 },
    ],
  },
  // Ejercicio 2017/2018: `presupuesto2017-18.pdf`, cargado originalmente en la Versión 63 como el
  // dato PRIMARIO (único documento de ese ejercicio en ese momento, `official_budget` simple). En
  // la Versión 64 se cargó el balance real del mismo ejercicio (`balance2018.pdf`), que pasa a ser
  // el dato primario (ver `racingRevenueLinesByYear[2018]`/`racingFiscalYearMeta[2018]`,
  // `reportType:'official_budget_and_balance'`) — estas mismas líneas de presupuesto, sin tocar un
  // solo valor, se movieron acá como columna de comparación. Ver el comentario completo del
  // criterio de categorización (por qué "Cancelación Efva por Cpra de Jug." va a
  // `player_amortisation` en vez de excluirse, por qué los intereses/diferencias de cambio quedan
  // mezclados en el catch-all en vez de separarse a `netInterest`) en el historial de
  // `racingRevenueLinesByYear`/`racingExpenseLinesByYear` de versiones anteriores — mismo criterio,
  // sin cambios, solo cambió DÓNDE viven estos datos en el archivo.
  2018: {
    currency:'ARS', fx:20, fxSource:'document_assumption',
    sourceId:'racing-presupuesto-2017-18',
    revenueLines: [
      { rawLabel:'Campeonatos Oficiales AFA', normalizedCategory:'matchday_competition', amountNative:20.0 },
      { rawLabel:'Competencias Oficiales Internacionales', normalizedCategory:'matchday_competition', amountNative:87.6 },
      { rawLabel:'Otras Competencias y Partidos Amistosos', normalizedCategory:'matchday_competition', amountNative:2.6 },
      { rawLabel:'Derechos de Retransmisión', normalizedCategory:'broadcasting', amountNative:78.0 },
      { rawLabel:'Publicidad y Esponsorización del Fútbol', normalizedCategory:'sponsorship_commercial', amountNative:69.0 },
      { rawLabel:'Otros Ingresos Deportivos Fútbol Profesional', normalizedCategory:'other_income', amountNative:40.0 },
      { rawLabel:'Cesión de Jugadores (Transferencias / Préstamos)', normalizedCategory:'player_sales', amountNative:454.66 },
      { rawLabel:'Ingresos por Propiedad Industrial / Intelectual cedida en Explotación', normalizedCategory:'other_income', amountNative:18.0 },
      { rawLabel:'Cobranza de Ingresos de Otras Secciones Deportivas', normalizedCategory:'other_sports', amountNative:14.1 },
      { rawLabel:'Ingresos por Socios', normalizedCategory:'member_dues', amountNative:225.0 },
      { rawLabel:'Ingresos Varios Sede', normalizedCategory:'other_income', amountNative:30.0 },
      { rawLabel:'Ingresos por Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:66.0 },
      { rawLabel:'Cobro de Subvenciones, Donaciones y Legados', normalizedCategory:'other_income', amountNative:2.16 },
      { rawLabel:'Otros Cobros de Ingresos Financieros - Plazo Fijo', normalizedCategory:'other_income', amountNative:30.0 },
    ],
    // Suma exacta a $1.137.120.000 (Ingresos Ordinarios $1.104.960.000 + Extraordinarios
    // $32.160.000), el "Total de Ingresos de Fdos" impreso pese a su etiqueta confusa "(I)+(II)+(III)".
    expenseLines: [
      { rawLabel:'Gastos de Explotación del Estadio', normalizedCategory:'admin_general_expense', amountNative:-18.0 },
      { rawLabel:'Participación en Campeonatos Oficiales AFA', normalizedCategory:'match_organisation_expense', amountNative:-21.6 },
      { rawLabel:'Participación en Campeonatos Internacionales', normalizedCategory:'match_organisation_expense', amountNative:-15.4 },
      { rawLabel:'Gastos Derechos de Televisación', normalizedCategory:'admin_general_expense', amountNative:-6.0 },
      { rawLabel:'Remuneraciones Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-99.5 },
      { rawLabel:'Primas Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-91.0 },
      { rawLabel:'Premios Plantel Deportivo', normalizedCategory:'wages_squad', amountNative:-10.0 },
      { rawLabel:'Pretemporada', normalizedCategory:'wages_squad', amountNative:-5.0 },
      { rawLabel:'Otros Gastos Deportivos Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-48.0 },
      { rawLabel:'Inversiones en Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-54.0 },
      { rawLabel:'Gastos de Seguridad', normalizedCategory:'admin_general_expense', amountNative:-13.2 },
      { rawLabel:'Servicios Médicos', normalizedCategory:'admin_general_expense', amountNative:-4.224 },
      { rawLabel:'Pago de Gastos de Otras Secciones Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-15.9 },
      { rawLabel:'Departamentos Auxiliares - Socios', normalizedCategory:'admin_general_expense', amountNative:-8.956742 },
      { rawLabel:'Departamentos Auxiliares - Imagen / Prensa', normalizedCategory:'admin_general_expense', amountNative:-5.01706 },
      { rawLabel:'Gastos Generales de Administración', normalizedCategory:'admin_general_expense', amountNative:-5.176587 },
      { rawLabel:'Pago de Otros Gastos Ordinarios', normalizedCategory:'other_expenses', amountNative:-184.0 },
      { rawLabel:'Pago de Otros Gastos Extraordinarios - Moratoria', normalizedCategory:'other_expenses', amountNative:-5.4 },
      { rawLabel:'Gastos Financieros de Pago de Otros Pasivos', normalizedCategory:'admin_general_expense', amountNative:-6.0 },
      { rawLabel:'Pagos por Compra de Bienes de Uso', normalizedCategory:'other_expenses', amountNative:-2.4 },
      { rawLabel:'Pago por Compra de Inversiones en el Estadio', normalizedCategory:'other_expenses', amountNative:-59.4 },
      { rawLabel:'Pagos por Colocaciones Financieras', normalizedCategory:'other_expenses', amountNative:-45.15 },
      { rawLabel:'Cancelación Efectiva de Pasivos', normalizedCategory:'other_expenses', amountNative:-88.0 },
      { rawLabel:'Cancelación Efectiva por Compra de Jugadores', normalizedCategory:'player_amortisation', amountNative:-314.266654 },
    ],
    // Suma exacta a $(1.125.591.043), el "Total de Egresos de Fdos (IV)+(V)" impreso.
  },
  2020: {
    currency:'ARS', fx:70, fxSource:'document_assumption',
    sourceId:'racing-presupuesto-2019-20',
    revenueLines: [
      { rawLabel:'Cobranzas por venta de entradas', normalizedCategory:'matchday_competition', amountNative:156.000000 },
      { rawLabel:'Cobranzas por participación', normalizedCategory:'competition_bonus', amountNative:274.780000, items:[
        ['Competiciones oficiales S.A.F.', 19.780000], ['Competiciones oficiales internacionales', 246.500000], ['Competiciones A.F.A., amistosos y otras competiciones', 8.500000],
      ]},
      { rawLabel:'Cobranzas por venta de abonos estadio', normalizedCategory:'season_tickets', amountNative:123.154000 },
      { rawLabel:'Cobros por retransmisión y derechos de TV', normalizedCategory:'broadcasting', amountNative:208.800000 },
      { rawLabel:'Cobros por marketing y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:320.778000, items:[
        ['Comercialización y otros', 121.278000], ['Esponsorización', 152.400000], ['Publicidad estática y dinámica', 47.100000],
      ]},
      { rawLabel:'Cobros por ventas de jugadores', normalizedCategory:'player_sales', amountNative:1122.345000 },
      { rawLabel:'Cobros por préstamos de jugadores', normalizedCategory:'player_sales', amountNative:10.950000 },
      { rawLabel:'Cobros de derechos de formación y mecanismo de solidaridad', normalizedCategory:'youth_football', amountNative:7.960000 },
      { rawLabel:'Cobros de otros recursos de gestión por fútbol', normalizedCategory:'other_income', amountNative:18.000000 },
      { rawLabel:'Ingresos sociales', normalizedCategory:'member_dues', amountNative:634.152050 },
      { rawLabel:'Ingresos de otras secciones', normalizedCategory:'other_sports', amountNative:76.100000, items:[
        ['Cobranzas de otras actividades deportivas', 29.700000], ['Cobranzas de instituciones educativas', 46.400000],
      ]},
      { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:78.600000, items:[
        ['Cobros de otros recursos ordinarios', 30.600000], ['Cobros de rentas financieras', 48.000000],
      ]},
      { rawLabel:'Cobros por venta de inversiones financieras', normalizedCategory:'other_income', amountNative:96.000000 },
    ],
    // Suma de las 13 líneas de arriba = 3.127,619050 M = TOTAL INGRESOS DE FONDOS DEL PERÍODO
    // impreso EXACTO. Corregido en la Versión 60: hasta entonces esta línea (SUBTOTAL INGRESOS
    // EXTRAORDINARIOS, "Cobros por venta de inversiones financieras") se dejaba afuera a propósito
    // (mismo criterio que netInterest en el resto del sitio), pero eso generaba una ASIMETRÍA con
    // expenseLines de abajo, que SÍ incluye su análogo ("Egresos extraordinarios") como línea normal
    // — el resultado propio del overlay (ingresos - gastos) no cerraba contra el superávit/déficit
    // presupuestado real. Se cargó como línea normal (`other_income`) para que las 2 columnas usen
    // el mismo criterio y el Resultado Neto de la columna Presupuesto en "Estado de resultados"
    // (Versión 60) sea el número real, no un cálculo incompleto.
    expenseLines: [
      { rawLabel:'Pago de gastos explotación del estadio', normalizedCategory:'admin_general_expense', amountNative:-73.300000 },
      { rawLabel:'Pago de gastos por participación', normalizedCategory:'match_organisation_expense', amountNative:-120.700000, items:[
        ['Competiciones oficiales S.A.F.', -88.200000], ['Competiciones oficiales internacionales', -32.500000],
      ]},
      { rawLabel:'Pago de remuneraciones plantel profesional', normalizedCategory:'wages_squad', amountNative:-781.995000, items:[
        ['Sueldos jugadores profesionales', -208.800000], ['Primas jugadores profesionales', -332.010000],
        ['Premios jugadores profesionales', -237.500000], ['Otros conceptos jugadores profesionales', -3.685000],
      ]},
      { rawLabel:'Pago de remuneraciones cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-145.400000 },
      { rawLabel:'Pago de otros gastos deportivos fútbol profesional', normalizedCategory:'wages_squad', amountNative:-221.950000 },
      { rawLabel:'Pago por adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-816.620000 },
      { rawLabel:'Pago de gastos por compraventa de jugadores', normalizedCategory:'other_expenses', amountNative:-95.795000 },
      { rawLabel:'Pago de gastos fútbol amateur (activable)', normalizedCategory:'youth_other_sports_expense', amountNative:-122.000000 },
      { rawLabel:'Pago de gastos de comercialización', normalizedCategory:'admin_general_expense', amountNative:-81.082048 },
      { rawLabel:'Egresos de otras secciones', normalizedCategory:'youth_other_sports_expense', amountNative:-107.500000, items:[
        ['Pago de remuneraciones otras actividades deportivas', -6.900000], ['Pago de gastos otras actividades deportivas', -53.700000],
        ['Pago de remuneraciones de instituciones educativas', -38.600000], ['Pago de gastos de instituciones educativas', -8.300000],
      ]},
      { rawLabel:'Otros egresos', normalizedCategory:'admin_general_expense', amountNative:-325.900000, items:[
        ['Pago de gastos de administración', -42.600000], ['Pago de otros gastos ordinarios', -228.000000],
        ['Pago de impuestos, tasas y contribuciones', -7.300000], ['Pago de gastos financieros', -48.000000],
      ]},
      { rawLabel:'Egresos extraordinarios (compra de bienes de uso y mejoras, principalmente)', normalizedCategory:'other_expenses', amountNative:-85.260000 },
    ],
    // Suma de las 11 líneas de arriba = -2.977,502048 M = TOTAL DE EGRESOS DE FONDOS DEL PERÍODO
    // impreso EXACTO (a diferencia de Ingresos, acá no queda ningún resto: Egresos extraordinarios
    // sí se cargó como línea, ya que es CAPEX/pago de deuda real, no un resultado financiero neto).
    // "Pago por préstamos de jugadores" (línea 7 del documento) y "Pago de gastos fútbol amateur
    // (operativo)" (línea 9) dan $0 este ejercicio, no se cargaron como líneas propias (no hay nada
    // que perder documentando un cero real, pero se listan acá para que quede registrado que existen
    // en el documento por si un ejercicio futuro las usa con monto real): ambas irían a
    // `player_amortisation` y `youth_other_sports_expense` respectivamente, mismo criterio que sus
    // pares "activable"/"adquisición" ya cargadas.
  },
};

// ---------------------------------------------------------------------------
// Mercado de pases — placeholder, mismo estilo que los movimientos inventados
// que ya tenía Boca (Jugador A, Jugador B...) desde el primer MVP.
// ---------------------------------------------------------------------------
const racingPasesData = [
  { gestion:'milito', anio:2025, ventana:'Verano', tipo:'Jugador', nombre:'Jugador C1 (placeholder)', movimiento:'Venta', monto:14.5 },
  { gestion:'milito', anio:2025, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador C2 (placeholder)', movimiento:'Compra', monto:-9.0 },
  { gestion:'milito', anio:2024, ventana:'Verano', tipo:'DT', nombre:'DT continúa (Costas, placeholder)', movimiento:'Renovación', monto:0 },
  { gestion:'blanco', anio:2024, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador C3 (placeholder)', movimiento:'Venta', monto:7.0 },
];

// ---------------------------------------------------------------------------
// Resultados deportivos — estos SÍ son reales (a diferencia de las finanzas):
// buscados y verificados vía web search en agosto de 2026 (ESPN, Infobae,
// La Nación, Wikipedia, sitio oficial de Racing). A cruzar contra el sitio
// oficial del club antes de publicar.
// ---------------------------------------------------------------------------
const racingResultadosData = {
  milito: { titulosLocales:0, titulosInternacionales:1, mejorResultadoLibertadores:'Sin dato verificado todavía en esta gestión (breve, desde dic-2024)' },
  blanco: { titulosLocales:5, titulosInternacionales:1, mejorResultadoLibertadores:'Cuartos de final (2023); nunca pasó de cuartos en su gestión' },
};

const racingTitulosData = [
  { anio:2014, competencia:'Torneo Transición', resultado:'Campeón', gestion:'blanco' },
  { anio:2019, competencia:'Superliga Argentina 2018/19', resultado:'Campeón', gestion:'blanco' },
  { anio:2019, competencia:'Trofeo de Campeones', resultado:'Campeón', gestion:'blanco' },
  { anio:2022, competencia:'Trofeo de Campeones', resultado:'Campeón', gestion:'blanco' },
  { anio:2022, competencia:'Supercopa Internacional', resultado:'Campeón', gestion:'blanco' },
  { anio:2024, competencia:'Copa Sudamericana', resultado:'Campeón', gestion:'blanco' },
  { anio:2025, competencia:'Recopa Sudamericana', resultado:'Campeón', gestion:'milito' },
];

// Versión 95: registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js).
const racingPresupuestoFinancieroByYear = {
  // Movido desde js/finanzas-render.js en la Versión 135: eran datos de un club viviendo en la
  // capa de render. El presupuesto de Racing YA está armado en base de caja desde el origen (sus
  // líneas dicen "Cobranzas por...", "Pago de..."), así que su waterfall es más simple que el de
  // Boca: no tiene las filas de créditos y deudas del ejercicio anterior, porque el documento no
  // tiene ese concepto para reconciliar. No es un descuido, es fiel a la fuente.
    2026: {
      steps: [
        { label:'Saldo Inicial', op:'', magnitude:9324.935735 },
        { label:'Ingresos', op:'+', magnitude:123297.209473 },
        { label:'Egresos', op:'−', magnitude:126860.457441 },
        { label:'Saldo al Cierre', op:'=', magnitude:5761.687768, isResult:true },
      ],
      note:'A diferencia de Boca, el presupuesto de Racing ya está armado en base de caja desde el origen, no distingue un "presupuesto económico" devengado de uno financiero, así que este saldo usa las mismas cifras que el Estado de resultados de arriba, sin ajuste por cobros/pagos diferidos del ejercicio anterior.',
    },
    2027: {
      steps: [
        { label:'Saldo Inicial', op:'', magnitude:5367.787912 },
        { label:'Ingresos', op:'+', magnitude:143118.482343 },
        { label:'Egresos', op:'−', magnitude:142071.747998 },
        { label:'Saldo al Cierre', op:'=', magnitude:6414.522257, isResult:true },
      ],
      note:'Mismo criterio que el Ejercicio 2025/2026: presupuesto en base de caja desde el origen, sin distinción entre devengado y percibido.',
    },
};

const racingPresupuestoInversionesByYear = {
  // Ídem: movido desde el render. Racing agrupa todas sus inversiones en una sola línea de
  // egresos extraordinarios, sin desglosar por obra como sí hace Boca, así que acá no hay
  // `groups`: solo el total y la nota que explica por qué no hay más detalle.
  2026: { total:7014.228299,
    note:'El presupuesto de Racing agrupa este monto en una sola línea ("Egresos extraordinarios", compra de bienes de uso y mejoras) dentro del rubro Egresos Extraordinarios, sin desglosar por obra o proyecto individual como sí hace Boca. El texto del documento menciona en general obras en el Estadio, el predio de Ezeiza, el predio Tita Mattiussi y las sedes Avellaneda y Villa del Parque, pero no separa el monto entre ellas.' },
  2027: { total:10541.726845,
    note:'Mismo criterio que el Ejercicio 2025/2026: una sola línea sin desglosar por obra. El documento menciona en general la primera etapa del predio de Ezeiza, obras en el predio Tita Mattiussi, mejoras del Estadio, y las sedes Avellaneda, Villa del Parque y la nueva sede educativa.' },
};

const racingPresupuestoSupuestosByYear = {
  // Ídem Boca: movido desde js/finanzas-render.js en la Versión 135.
    2026: {
      docLabel: 'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2025/2026 (1° de julio de 2025 al 30 de junio de 2026).',
      sections: [
        { heading:'Premisas macroeconómicas', items: [
          'Producto Bruto Interno (PBI): se proyecta un crecimiento del 4% interanual.',
          'Tipo de cambio: se prevé un promedio de $1.438 por dólar, acelerado post elecciones legislativas de medio término.',
          'Inflación: se proyecta un aumento promedio del Índice de Precios al Consumidor (IPC, medido por el INDEC) del 29,5% durante el período.',
          'Incremento salarial: se proyecta un incremento salarial promedio del 30,4%.',
        ]},
        { heading:'Políticas de ingresos', items: [
          'Campeonatos oficiales y competencias internacionales: participación en la Liga Profesional, torneos CONMEBOL, Copa Sudamericana 2026, Copa Argentina 2025/26 y amistosos de pretemporada, con la renovación del convenio de ESPN muy avanzada.',
          'Retransmisión y derechos de TV: ingreso recurrente proyectado al nivel de cuota devengada actual, con renegociación.',
          'Marketing y publicidad: sponsors vigentes (Betsson, Sur Finanzas, RUS, PAX, Cetrogar, EA Sports, Alliance, Quilmes, Sorare, ESPN, Lat Comex, entre otros) más los ingresos de Locademia y concesiones/licencias sobre la marca.',
          'Venta y préstamos de jugadores: venta moderada, por decisión de retener y valorizar un plantel competitivo; incluye el cobro de acreencias de ejercicios anteriores.',
          'Derechos de formación y mecanismo de solidaridad: ingresos por jugadores formados en Racing y transferidos en ligas del exterior.',
          'Recursos sociales: campaña de captación de socios en el primer mes de ejecución (resultados no contemplados en el presupuesto); incremento de la cuota social bimestral conforme al IPC.',
          'Otras secciones: ingresos de Básquet, Futsal, Fútbol Infantil, Tenis, Vóley, Handball, Hockey y Colonia de vacaciones, más el Colegio (cuotas escolares y subvención estatal).',
          'Otros recursos: concesión de la Sede Avellaneda a Gimnasios Argentinos S.A., eventos sociales, y el rendimiento de excedentes transitorios de capital de trabajo (en baja por la normalización de tasas).',
        ]},
        { heading:'Política de gastos', items: [
          'Plantel profesional: remuneraciones, primas y premios según contratos vigentes, según el propio club, "el presupuesto más importante de los últimos tiempos" por la decisión de retener a figuras campeonas.',
          'Cuerpo técnico: remuneraciones y premios según contratos individuales, campañas y títulos obtenidos.',
          'Incorporación y venta de jugadores: reemplazo de figuras salientes; gastos asociados a la venta (comisiones de agentes, 15% del jugador y agremiados, Decreto 1212).',
          'Fútbol amateur: desarrollo de infantiles y divisiones inferiores, la Pensión y el predio Tita Mattiussi.',
          'Administración: reformulación de la matriz organizacional, dirección deportiva, proveedores, haberes del personal (sin incluir al plantel de fútbol), Obras Sociales y Sindicatos.',
          'Inversiones (egresos extraordinarios): obras en el Estadio, el predio de Ezeiza y el predio Tita Mattiussi, y mejoras en las sedes Avellaneda y Villa del Parque.',
        ]},
      ],
    },
    2027: {
      docLabel: 'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2026/2027 (1° de julio de 2026 al 30 de junio de 2027), el presupuesto vigente hoy.',
      sections: [
        { heading:'Premisas macroeconómicas', items: [
          'Producto Bruto Interno (PBI): se proyecta un crecimiento real del 4,18% interanual.',
          'Tipo de cambio: se prevé $1.505 por dólar en julio de 2026 y $1.870 por dólar en junio de 2027.',
          'Inflación: se proyecta un aumento promedio del Índice de Precios al Consumidor (IPC, medido por el INDEC) del 27,1% durante el período.',
          'Incremento salarial: se proyecta acorde a la inflación estimada para el ejercicio.',
        ]},
        { heading:'Políticas de ingresos', items: [
          'Campeonatos oficiales y competencias internacionales: participación en la Liga Profesional, torneos CONMEBOL, Copa Sudamericana 2027, Copa Argentina 2026/27 y amistosos de pretemporada, con el convenio de televisación de ESPN ya renovado.',
          'Retransmisión y derechos de TV: ingreso recurrente proyectado al nivel de cuota devengada actual, con una renegociación prudente.',
          'Marketing y publicidad: sponsors vigentes (Betsson, RUS, PAX, Cetrogar, Alliance, ESPN, Lat Comex, Pirelli, Coca-Cola, entre otros) más los ingresos de Locademia (venta de artículos deportivos) y concesiones/licencias sobre la marca.',
          'Venta y préstamos de jugadores: venta moderada, priorizando un reembolso neto de la operación por sobre la diferencia compra/venta, dado un mercado poco demandante; incluye el cobro de acreencias de ejercicios anteriores.',
          'Derechos de formación y mecanismo de solidaridad: ingresos por jugadores formados en Racing y transferidos en ligas del exterior.',
          'Recursos sociales: incremento de la cuota social bimestral conforme al IPC; no se proyecta crecimiento de la masa societaria pese a las campañas de captación.',
          'Otras secciones: ingresos de Básquet, Futsal, Fútbol Infantil, Tenis, Vóley, Handball, Hockey y Colonia de vacaciones, más el Colegio (ampliación de matrículas, cuotas escolares y subvención estatal).',
          'Otros recursos: concesión de la Sede Avellaneda a Gimnasios Argentinos S.A., eventos sociales, y el rendimiento de excedentes transitorios de capital de trabajo.',
        ]},
        { heading:'Política de gastos', items: [
          'Plantel profesional: remuneraciones, primas y premios según los contratos vigentes, para torneos amistosos, Copa Argentina y CONMEBOL 2026/27, según el propio club, uno de los presupuestos salariales más altos del fútbol argentino.',
          'Cuerpo técnico: remuneraciones y premios según contratos individuales y el acuerdo con el cuerpo técnico saliente.',
          'Incorporación y venta de jugadores: reemplazo de figuras salientes; gastos asociados a la venta (comisiones de agentes, 15% del jugador y agremiados, Decreto 1212).',
          'Fútbol amateur: desarrollo de infantiles y divisiones inferiores, viajes al exterior, la Pensión y el predio Tita Mattiussi.',
          'Administración: nueva estructura organizacional y dirección deportiva, haberes del personal (sin incluir al plantel de fútbol), Obras Sociales y Sindicatos.',
          'Inversiones (egresos extraordinarios): primera etapa del predio de Ezeiza, obras en el predio Tita Mattiussi, mejoras del Estadio y de las sedes Avellaneda y Villa del Parque, y la nueva sede educativa.',
        ]},
      ],
    },
};

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.racing = {
  revenueLinesByYear: racingRevenueLinesByYear, expenseLinesByYear: racingExpenseLinesByYear,
  fiscalYearMeta: racingFiscalYearMeta, pasesData: racingPasesData,
  resultadosData: racingResultadosData, titulosData: racingTitulosData,
  presupuestoOverlayByYear: racingPresupuestoOverlayByYear,
  presupuestoSupuestosByYear: racingPresupuestoSupuestosByYear,
  presupuestoFinancieroByYear: racingPresupuestoFinancieroByYear,
  presupuestoInversionesByYear: racingPresupuestoInversionesByYear,
};


Object.assign(sources, {
  'racing-presupuesto-2025-26-prensa': {
      id:'racing-presupuesto-2025-26-prensa', clubId:'racing',
      title:'Cobertura de prensa del presupuesto económico-financiero de Racing, julio 2025 a junio 2026',
      type:'press_coverage_of_assembly', reliability:'secondary_press',
      url:'https://x.com/Sacostaracing/status/1944855768127431049',
      publicNote:'No es el documento del club, sino la cobertura de prensa del resumen presentado en asamblea. Los rubros vienen agrupados de forma más gruesa que en un presupuesto oficial.',
      note:'Hilo de X con el resumen presentado en asamblea, no el documento oficial del club. Los rubros vienen agrupados de forma más gruesa que los de Boca — por ejemplo "fútbol profesional" junto en vez de separado por TV/matchday/pases. Donde la prensa no desglosaba un monto, se dejó como línea residual "no desglosado" en vez de inventar categorías.',
    },
  'racing-placeholder': {
      id:'racing-placeholder', clubId:'racing',
      title:'Placeholder (ya no se usa, ver racing-balance-2023-24/2024-25/racing-presupuesto-2025-26)',
      type:'estimate_placeholder', reliability:'placeholder',
      publicNote:'No es un documento: son números de prueba, puestos para diseñar el sitio mientras se consiguen los balances reales de esos ejercicios.',
      note:'Todas las finanzas de Racing que estaban cargadas con esta fuente (Blanco placeholder puro, Milito con dato de prensa) se reemplazaron por documentos oficiales reales en la Versión 15/16. Queda esta entrada solo por si algún dato viejo la sigue referenciando.',
    },
  'racing-balance-2009': {
      id:'racing-balance-2009', clubId:'racing',
      title:'Estado de Recursos y Gastos (balance auditado), Ejercicio N°107, 1°/11/2008 al 31/10/2009',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2009.pdf',
      note:'PDF oficial (22 páginas, con texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. Ejercicio anterior a la presidencia de Víctor Blanco (asumió en 2013) — no se identificó con confianza quién presidía el club en este ejercicio específico, ver comentario en data/racing-data.js. El balance en sí documenta que Racing venía de una quiebra (línea "Resultado Extraordinario s/Quiebra"). GANANCIA real del ejercicio de $2.687.137 ARS. Cifras en pesos históricos, SIN reexpresión por inflación (la práctica de moneda homogénea/RT6 llegó recién con la crisis de los 2020) — convertido a USD con el dólar mayorista de cierre estimado en $3,82 al 31/10/2009 (no se encontró la cotización exacta de ese día puntual, se usó la cotización más cercana disponible, ver comentario en racing-data.js). Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2009.pdf.',
    },
  'racing-balance-2010': {
      id:'racing-balance-2010', clubId:'racing',
      title:'Estado de Recursos y Gastos (balance auditado), Ejercicio N°108, 1°/11/2009 al 31/10/2010',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2010.pdf',
      note:'PDF oficial (25 páginas, texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. PÉRDIDA real del ejercicio de $(9.714.118) ARS. Convertido a USD con el dólar mayorista interpolado linealmente entre los valores de apertura ($3,82) y cierre ($4,01) de 2010 publicados por cotizacion-dolar.com.ar (no se encontró la cotización exacta del 31/10/2010) — estimado en $3,98. Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2010.pdf.',
    },
  'racing-balance-2011': {
      id:'racing-balance-2011', clubId:'racing',
      title:'Estado de Recursos y Gastos (balance auditado), Ejercicio N°109, 1°/11/2010 al 31/10/2011',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2011.pdf',
      note:'PDF oficial (23 páginas, texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. GANANCIA real del ejercicio de $267.202 ARS (el propio documento imprime la fila como "RESULTADO FINAL (Pérdida)" pese a ser positiva — verificado por aritmética propia antes de cargar, es un rótulo de plantilla mal actualizado del documento original, no un error de este sitio). Convertido a USD con el dólar mayorista interpolado entre apertura ($4,01) y cierre ($4,32) de 2011 — estimado en $4,27, mismo criterio y misma limitación de fuente que el Ejercicio 2010. Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2011.pdf.',
    },
  'racing-balance-2012': {
      id:'racing-balance-2012', clubId:'racing',
      title:'Memoria y Balance (balance auditado), Ejercicio N°110, 1°/11/2011 al 31/10/2012',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2012.pdf',
      note:'PDF oficial (25 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Presidente Gastón Federico Cogorno (PRE-Blanco). BENEFICIO real del ejercicio de $17.024.354 ARS. A diferencia de 2009-2011 (cargados en USD ya-convertido con un dólar mayorista investigado externamente), este ejercicio se cargó en ARS NATIVO con $4,7260 por dólar, el tipo de cambio que el propio balance declara en su Anexo de Moneda Extranjera (lado Activo — el lado Pasivo usa $4,7660, inconsistencia menor). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2012.pdf + racing-balance-2012.md).',
    },
  'racing-balance-2013': {
      id:'racing-balance-2013', clubId:'racing',
      title:'Memoria y Balance (balance auditado), Ejercicio N°111, 1°/11/2012 al 31/10/2013',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2013.pdf',
      note:'PDF oficial (28 páginas, 110° aniversario del club), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal, aunque de calidad de escaneo más baja que otros años; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). BENEFICIO real del ejercicio de $11.226.840 ARS. Presidencia de este ejercicio puntual INCIERTA (ninguna página del balance muestra firma rotulada "Presidente"; cargado como gestionId:null por inferencia de fecha, no confirmado — ver nota en racing-balance-2013.md). Convertido a USD con $5,8720 por dólar, la tasa dominante que declara el propio balance en su Anexo de Moneda Extranjera. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2013.pdf + racing-balance-2013.md).',
    },
  'racing-balance-2014': {
      id:'racing-balance-2014', clubId:'racing',
      title:'Memoria y Balance (balance auditado), Ejercicio N°112 (irregular de 10 meses), 1°/11/2013 al 31/8/2014',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2014.pdf',
      note:'PDF oficial (38 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Ejercicio irregular de 10 meses, de transición del cierre de octubre al de agosto. Presidente Víctor Blanco Rodríguez. BENEFICIO real del ejercicio de $100.936.735 ARS. Mismo ejercicio que `racing-presupuesto-2013-14` (cargado antes como dato primario, ahora columna "Presupuesto" de comparación) — con este balance el ejercicio pasa a `reportType:\'official_budget_and_balance\'`. Convertido a USD con $8,3070 por dólar, la tasa dominante que el propio balance declara en su Anexo de Moneda Extranjera. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2014.pdf + racing-balance-2014.md).',
    },
  'racing-presupuesto-2013-14': {
      id:'racing-presupuesto-2013-14', clubId:'racing',
      title:'Presupuesto Financiero, Ejercicio 2013/2014 (1°/9/2013 al 31/8/2014)',
      type:'official_budget', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/presupuesto2013-14.pdf',
      note:'PDF oficial (10 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; las 3 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotaron para leerlas). Primer presupuesto de la gestión Blanco cargado al sitio (firmado por Víctor Blanco Rodríguez como Presidente). Mismo ejercicio que `racing-balance-2014` (el balance real, dato primario desde que se cargó — este presupuesto pasó a ser la columna "Presupuesto" de comparación en "Estado de resultados"). Convertido a USD con $6,00 por dólar, promedio de los 2 puntos que el propio presupuesto declara como premisa ($5,80 al 31/12/13, $6,20 para el semestre siguiente). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2013-14.pdf + racing-presupuesto-2013-14.md).',
    },
  'racing-balance-2014-15': {
      id:'racing-balance-2014-15', clubId:'racing',
      title:'Memoria y Balance (balance auditado), Ejercicio N°113, 1°/9/2014 al 31/8/2015',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2015.pdf',
      note:'PDF oficial (25 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos I/II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). BENEFICIO real del ejercicio de $102.544.513 ARS. Sin presupuesto propio en el archivo para este mismo ejercicio (salta de presupuesto2013-14 a presupuesto2015-16). Convertido a USD con $9,20 por dólar, el dólar oficial de cierre de agosto de 2015, la tasa dominante que declara el propio balance en su Anexo de Moneda Extranjera (algunas líneas de crédito heredadas mantienen tipos de cambio históricos congelados de ejercicios anteriores, no representativos, no se usaron). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2015.pdf + racing-balance-2014-15.md).',
    },
  'racing-balance-2017': {
      id:'racing-balance-2017', clubId:'racing',
      title:'Memoria y Balance (balance auditado), Ejercicio N°115, 1°/9/2016 al 31/8/2017',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2017.pdf',
      note:'PDF oficial (34 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos I/II/III/V estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Segundo ejercicio con auditoría externa (Estudio Bertora y Asociados S.R.L.). Presidente Víctor Blanco Rodríguez. SUPERÁVIT real del ejercicio de $134.160.676 ARS. Sin presupuesto propio en el archivo (no existe presupuesto2016-17.pdf). La columna comparativa "31/08/2016" de este documento coincide exacto con racing-balance-2016 (a diferencia de la transición 2015→2016, acá no hubo reclasificación del auditor). Convertido a USD con $17,21 por dólar, la tasa dominante que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2017.pdf + racing-balance-2017.md).',
    },
  'racing-balance-2016': {
      id:'racing-balance-2016', clubId:'racing',
      title:'Memoria y Balance (balance auditado), Ejercicio N°114, 1°/9/2015 al 31/8/2016',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2016.pdf',
      note:'PDF oficial (36 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III/V estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Primer ejercicio con auditoría externa (Estudio Bertora y Asociados S.R.L.). Presidente Víctor Blanco Rodríguez. BENEFICIO real del ejercicio de $193.973.303 ARS. Mismo ejercicio que `racing-presupuesto-2015-16` (cargado antes como dato primario, ahora columna "Presupuesto" de comparación) — con este balance el ejercicio pasa a `reportType:\'official_budget_and_balance\'`. OJO: la columna comparativa "31/08/2015" de este documento fue reclasificada por el nuevo auditor (Nota 1.c del propio documento) y NO coincide con `racing-balance-2014-15` — no se tocaron los datos ya cargados de ese ejercicio, ver nota completa en racing-balance-2016.md. Convertido a USD con $14,83 por dólar, la tasa dominante que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2016.pdf + racing-balance-2016.md).',
    },
  'racing-presupuesto-2015-16': {
      id:'racing-presupuesto-2015-16', clubId:'racing',
      title:'Presupuesto Financiero, Ejercicio 2015/2016 (1°/9/2015 al 31/8/2016)',
      type:'official_budget', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/presupuesto2015-16.pdf',
      note:'PDF oficial (11 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; las 3 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotaron para leerlas). Mismo formato que `racing-presupuesto-2013-14`, con premisas macro que ya reflejan la devaluación de diciembre de 2015 (2 tipos de cambio declarados, dólar y euro). Mismo ejercicio que `racing-balance-2016` (el balance real, dato primario desde que se cargó — este presupuesto pasó a ser la columna "Presupuesto" de comparación). Convertido a USD con $11,80 por dólar, promedio de los 2 puntos que el propio presupuesto declara como premisa ($10,10 al 31/12/15, $13,5 para el semestre siguiente). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2015-16.pdf + racing-presupuesto-2015-16.md).',
    },
  'racing-presupuesto-2017-18': {
      id:'racing-presupuesto-2017-18', clubId:'racing',
      title:'Presupuesto Financiero, Ejercicio 2017/2018 (1°/9/2017 al 31/8/2018)',
      type:'official_budget', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/presupuesto2017-18.pdf',
      note:'PDF oficial (11 páginas, texto extraíble nativo) del archivo de racingclub.com.ar/informes/. Presupuesto de Recursos y Gastos en base de CAJA (cash-flow mensual, 12 columnas), no el formato acumulado/accrual de los presupuestos 2025-26/2026-27. Mismo ejercicio que `racing-balance-2018` (el balance real, dato primario desde la Versión 64) — este presupuesto es la columna "Presupuesto" de comparación en "Estado de resultados". Convertido a USD con $20 por dólar, el tipo de cambio único que el propio presupuesto declara como premisa ("Premisas Macro"), distinto al $36,65 del balance. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2017-18.pdf + racing-presupuesto-2017-18.md).',
    },
  'racing-presupuesto-2018-19': {
      id:'racing-presupuesto-2018-19', clubId:'racing',
      title:'Presupuesto Financiero de Recursos y Gastos, Ejercicio 2018/2019 (1°/9/2018 al 31/8/2019)',
      type:'official_budget', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/presupuesto2018-19.pdf',
      note:'PDF oficial (9 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal en ninguna página; las 2 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotó la imagen para leerlas en orientación normal). Sin balance real cargado todavía para este mismo ejercicio (`reportType:\'official_budget\'` simple) — es un ejercicio PRESUPUESTO-ONLY por ahora, mismo estado en el que estuvo `racing-presupuesto-2017-18` hasta que se cargó su balance. Convertido a USD con $40 por dólar, el tipo de cambio único que el propio presupuesto declara como premisa ("Premisas Macro"). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2018-19.pdf + racing-presupuesto-2018-19.md).',
    },
  'racing-balance-2018': {
      id:'racing-balance-2018', clubId:'racing',
      title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°116, 1°/9/2017 al 31/8/2018',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2018.pdf',
      note:'PDF oficial (36 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal, no hizo falta deskew). SUPERÁVIT real: $616.520.502 ARS. Mismo ejercicio que `racing-presupuesto-2017-18` (cargado antes, en la Versión 63) — con este balance el ejercicio pasa a `reportType:\'official_budget_and_balance\'`. Convertido a USD con $36,65, el tipo de cambio de cierre que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2018.pdf + racing-balance-2018.md).',
    },
  'racing-balance-2019-20': {
      id:'racing-balance-2019-20', clubId:'racing',
      title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°118, 1°/9/2019 al 31/8/2020',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2019-20.pdf',
      note:'PDF oficial (33 páginas, texto extraíble nativo) bajado de racingclub.com.ar/informes/. Último ejercicio con cierre a agosto (la Asamblea del 18/12/2019 aprobó pasar el cierre a 30 de junio desde el ejercicio siguiente). Tiene también su propio Presupuesto real cargado como overlay de comparación, ver `racing-presupuesto-2019-20`. Convertido a USD con $73,98, el tipo de cambio de cierre que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2019-20.pdf + racing-balance-2019-20.md).',
    },
  'racing-presupuesto-2019-20': {
      id:'racing-presupuesto-2019-20', clubId:'racing',
      title:'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2019/2020 (1°/9/2019 al 31/8/2020)',
      type:'official_budget', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/presupuesto2019-20.pdf',
      note:'PDF oficial (8 páginas), a diferencia de la mayoría de los presupuestos de este archivo es un ESCANEO puro (sin texto extraíble), transcripto con el Read tool sobre imágenes de página, corrigiendo primero una inclinación diagonal real del escaneo (~0,78°, ver `.claude/skills/club-data-mapping/SKILL.md` sección 9 para la receta de deskew). Mismo ejercicio que `racing-balance-2019-20` (el balance real, dato primario) — este presupuesto es la columna "Presupuesto" de comparación en "Estado de resultados". Convertido a USD con $70, el tipo de cambio que el propio presupuesto declara como premisa (distinto al $73,98 del balance). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2019-20.pdf + racing-presupuesto-2019-20.md).',
    },
  'racing-balance-2021': {
      id:'racing-balance-2021', clubId:'racing',
      title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°119 (irregular de 10 meses), 1°/9/2020 al 30/6/2021',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2021.pdf',
      note:'PDF oficial (35 páginas, texto extraíble nativo) bajado de racingclub.com.ar/informes/. Ejercicio irregular de 10 meses, de transición del cierre de agosto al de junio (ver `racing-balance-2019-20`). SUPERÁVIT real chico: $7.012.082 ARS. Sin presupuesto propio en el archivo para este mismo ejercicio (`presupuesto2020-21.pdf` no existe). Convertido a USD con $95,52, el tipo de cambio de cierre que el propio balance declara en su Anexo V, usado sin excepciones en todo el anexo. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2021.pdf + racing-balance-2021.md).',
    },
  'racing-balance-2023-24': {
      id:'racing-balance-2023-24', clubId:'racing',
      title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°122, 1°/7/2023 al 30/6/2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2024.pdf',
      note:'PDF oficial (40 páginas, con informe de auditoría de Bertora y Asociados S.R.L., firmado por Víctor Blanco Rodríguez como Presidente), bajado directo de racingclub.com.ar/informes/ — a diferencia de Boca y River, este PDF tiene texto extraíble (no es un escaneo). Última temporada de la gestión Blanco: DÉFICIT real del ejercicio de $(6.127.619.872) ARS. Cifras en moneda homogénea al 30/06/2024 (RT 6). Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2024.pdf. Convertido a USD con $909, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo VI (Versión 32; antes se usaba $912, una cotización externa).',
    },
  'racing-balance-2024-25': {
      id:'racing-balance-2024-25', clubId:'racing',
      title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°123, 1°/7/2024 al 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/balance2025.pdf',
      note:'PDF oficial (43 páginas, con informe de auditoría de Bertora y Asociados S.R.L., firmado por Diego Alberto Milito como Presidente), bajado directo de racingclub.com.ar/informes/. Primer ejercicio completo de la gestión Milito (asumió 20/12/2024, a mitad de este ejercicio, pero el balance está firmado y presentado bajo su gestión): déficit real del ejercicio de $(178.451.821) ARS, mucho menor al de la gestión anterior. Cifras en moneda homogénea al 30/06/2025 (RT 6). Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2025.pdf. Convertido a USD con $1.196, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo VI (Versión 32; antes se usaba $1.203, una cotización externa).',
    },
  'racing-presupuesto-2025-26': {
      id:'racing-presupuesto-2025-26', clubId:'racing',
      title:'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2025/2026 (1°/7/2025 al 30/6/2026)',
      type:'official_budget', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/presupuesto-2025-26.pdf',
      note:'PDF oficial (8 páginas) bajado directo de racingclub.com.ar/informes/ — reemplaza a racing-presupuesto-2025-26-prensa (un hilo de X), ahora con el documento real: un presupuesto financiero mensual (12 columnas, jul-25 a jun-26) mucho más detallado que la cobertura de prensa. Convertido a USD con el tipo de cambio promedio que el propio presupuesto declara como premisa ($1.438), no con un tipo de cambio de cierre (todavía no cerró este ejercicio). Copia local en finance-of-sports/Clubes/Argentina/Racing/presupuesto2025-26.pdf.',
    },
  'racing-presupuesto-2026-27': {
      id:'racing-presupuesto-2026-27', clubId:'racing',
      title:'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2026/2027 (1°/7/2026 al 30/6/2027)',
      type:'official_budget', reliability:'primary',
      url:'https://www.racingclub.com.ar/informes/presupuesto-2026-27.pdf',
      note:'PDF oficial (8 páginas, texto nativo) bajado directo de racingclub.com.ar/informes/, mismo formato que racing-presupuesto-2025-26 (presupuesto financiero mensual, 12 columnas jul-26 a jun-27). Transcripción completa en Clubes/Argentina/Racing/presupuesto2026-27.md (Versión 32). Convertido a USD con el promedio de los dos tipos de cambio que el propio presupuesto declara como premisa ($1.505 para julio 2026 y $1.870 para junio 2027) = $1.687,5 — mismo criterio que usa Boca para su Presupuesto 2027.',
    },
});

gestionesByClub.racing = {
    // milito.firstYear=2025 es su primer ejercicio REAL completo (balance auditado, Ejercicio
    // N°123); lastYear=2027 es el presupuesto vigente (Ejercicio 2026-27, todavía no cerró — el
    // Ejercicio 2025-26 sí cerró en jun-2026 pero el balance auditado real todavía no se publicó,
    // ver to-do en index.html; se actualizó de 2026 a 2027 en la Versión 32 al cargar el nuevo
    // presupuesto).
    milito: { nombre:'Milito (2024-actual)', firstYear:2025, lastYear:2027 },
    // blanco.firstYear: mismo criterio siempre, "el ejercicio REAL más antiguo cargado de esta
    // gestión", no la fecha exacta en que asumió (2013). Pasó de 2024 a 2020 en la Versión 58
    // (balance2019-20.pdf), de 2020 a 2018 en la Versión 63 (presupuesto2017-18.pdf), y de 2018 a
    // 2014 en la Versión 67 (presupuesto2013-14.pdf, su primer presupuesto como Presidente).
    blanco: { nombre:'Blanco (2013-2024)',   firstYear:2014, lastYear:2024 },
  };

memberCountByClub.racing = 86529;


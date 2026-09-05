// ============================================================================
// data/racing-data.js — Racing Club: Milito (2024-actual) y Blanco (2013-2024).
//
// Ejercicios 2024, 2025, 2026 y 2027 = REALES, del archivo oficial completo de
// racingclub.com.ar/informes/ (~24 PDFs 2009-2027, guardados en
// numeros-de-boca/Clubes/Argentina/Racing/). A diferencia de Boca y River, estos PDFs
// tienen texto extraíble directo (no son escaneos) — se procesaron con
// pdftotext + Python, sin necesidad del Read tool con imágenes.
//
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
// numeros-de-boca/.claude/skills/club-data-mapping/SKILL.md sección 5):
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
    { rawLabel:'Ingresos colegio', normalizedCategory:'other_income', amountNative:0.155, disclosureLevel:'detailed' },
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
    { rawLabel:'Ingresos colegio', normalizedCategory:'other_income', amountNative:0.343, disclosureLevel:'detailed' },
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
    { rawLabel:'Ingresos colegio', normalizedCategory:'other_income', amountNative:0.673, disclosureLevel:'detailed' },
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
    { rawLabel:'Ingresos colegio', normalizedCategory:'other_income', amountNative:896.608057, disclosureLevel:'detailed' },
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
    { rawLabel:'Ingresos colegio', normalizedCategory:'other_income', amountNative:1486.329395, disclosureLevel:'detailed' },
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
    { rawLabel:'Ingresos de otras secciones', normalizedCategory:'other_income', amountNative:2289.790438, disclosureLevel:'detailed', items:[
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
    { rawLabel:'Ingresos de otras secciones', normalizedCategory:'other_income', amountNative:4359.330552, disclosureLevel:'detailed', items:[
      ['Cobranzas de otras actividades deportivas', 1151.782091], ['Cobranzas de instituciones educativas', 3207.548462],
    ]},
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:8942.65347, disclosureLevel:'detailed', items:[
      ['Cobros de otros recursos ordinarios', 8664.10347], ['Cobros de rentas financieras', 278.55],
    ]},
  ],
};

const racingExpenseLinesByYear = {
  2009: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-3.746, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-0.592, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'other_expenses', amountNative:-6.499, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'other_expenses', amountNative:-0.995, disclosureLevel:'detailed' },
    { rawLabel:'Televisión AFA', normalizedCategory:'other_expenses', amountNative:-0.215, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'other_expenses', amountNative:-0.632, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios órgano fiduciario', normalizedCategory:'other_expenses', amountNative:-0.008, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y otras contribuciones', normalizedCategory:'other_expenses', amountNative:-0.239, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-0.318, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.068, disclosureLevel:'detailed' },
    { rawLabel:'Colegio', normalizedCategory:'other_expenses', amountNative:-0.251, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'other_expenses', amountNative:-0.491, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'other_expenses', amountNative:-1.506, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.259, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / otras amortizaciones (cargos extraordinarios)', normalizedCategory:'other_amortisation', amountNative:-6.316, disclosureLevel:'detailed' },
  ],
  2010: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-5.545, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-0.684, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'other_expenses', amountNative:-6.786, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'other_expenses', amountNative:-1.191, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'other_expenses', amountNative:-1.735, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-0.41, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.124, disclosureLevel:'detailed' },
    { rawLabel:'Colegio', normalizedCategory:'other_expenses', amountNative:-0.043, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'other_expenses', amountNative:-0.13, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'other_expenses', amountNative:-0.167, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.303, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / otras amortizaciones (cargos extraordinarios)', normalizedCategory:'other_amortisation', amountNative:-3.128, disclosureLevel:'detailed' },
  ],
  2011: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-6.939, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-1.117, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'other_expenses', amountNative:-7.077, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'other_expenses', amountNative:-1.128, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'other_expenses', amountNative:-2.279, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-0.255, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.189, disclosureLevel:'detailed' },
    { rawLabel:'Colegio', normalizedCategory:'other_expenses', amountNative:-0.041, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'other_expenses', amountNative:-0.185, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'other_expenses', amountNative:-0.992, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.316, disclosureLevel:'detailed' },
    { rawLabel:'Previsiones / otras amortizaciones (cargos extraordinarios)', normalizedCategory:'other_amortisation', amountNative:-3.954, disclosureLevel:'detailed' },
  ],
  // Fuente: racing-balance-2023-24.md, Anexo IV "Gastos ordinarios" (columna "2024", año corriente
  // de ESE balance, pág. 28) + Estado de recursos y gastos (Depreciaciones/Previsiones, pág. 3).
  // Suma exacta a $(55.847.189.733) de gastos ordinarios; con las dos líneas no-cash de abajo,
  // cierra exacto contra el DÉFICIT DEL EJERCICIO impreso ($(6.127.619.872)) — ver verifyTieOuts().
  2024: [
    { rawLabel:'Sueldos del personal', normalizedCategory:'wages_squad', amountNative:-8519.25827, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-1698.882389, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional', normalizedCategory:'other_expenses', amountNative:-24286.994971, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'other_expenses', amountNative:-2597.482802, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'other_expenses', amountNative:-7194.050178, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-261.225073, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'other_expenses', amountNative:-1293.568672, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'other_expenses', amountNative:-9995.727378, disclosureLevel:'detailed' },
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
    { rawLabel:'Fútbol profesional', normalizedCategory:'other_expenses', amountNative:-27905.125653, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'other_expenses', amountNative:-5678.302707, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y sociales', normalizedCategory:'other_expenses', amountNative:-9290.650219, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-350.733591, disclosureLevel:'detailed' },
    { rawLabel:'Sellados, multas y gastos bancarios', normalizedCategory:'other_expenses', amountNative:-1695.870575, disclosureLevel:'detailed' },
    { rawLabel:'Sede Villa del Parque', normalizedCategory:'other_expenses', amountNative:-1376.54867, disclosureLevel:'detailed' },
    { rawLabel:'Costo transferencia de jugadores', normalizedCategory:'other_expenses', amountNative:-2533.458758, disclosureLevel:'detailed' },
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
    { rawLabel:'Pago de gastos explotación del estadio', normalizedCategory:'other_expenses', amountNative:-6290.935116, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por participación', normalizedCategory:'other_expenses', amountNative:-7653.273667, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones plantel profesional', normalizedCategory:'wages_squad', amountNative:-27953.696292, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-4743.41219, disclosureLevel:'detailed' },
    { rawLabel:'Pago de otros gastos deportivos fútbol profesional', normalizedCategory:'other_expenses', amountNative:-10251.057047, disclosureLevel:'detailed' },
    { rawLabel:'Pago por adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-19010.56705, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por compraventa de jugadores', normalizedCategory:'other_expenses', amountNative:-9719.521189, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos fútbol amateur (activable)', normalizedCategory:'other_expenses', amountNative:-5260.525946, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos de comercialización', normalizedCategory:'other_expenses', amountNative:-7069.748476, disclosureLevel:'detailed' },
    { rawLabel:'Egresos de otras secciones', normalizedCategory:'other_expenses', amountNative:-4732.977406, disclosureLevel:'detailed', items:[
      ['Pago de remuneraciones otras actividades deportivas', -894.565507], ['Pago de gastos otras actividades deportivas', -572.029391],
      ['Pago de remuneraciones de instituciones educativas', -2743.247721], ['Pago de gastos de instituciones educativas', -523.134788],
    ]},
    { rawLabel:'Otros egresos', normalizedCategory:'other_expenses', amountNative:-17160.514764, disclosureLevel:'detailed', items:[
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
    { rawLabel:'Pago de gastos explotación del estadio', normalizedCategory:'other_expenses', amountNative:-5309.807479, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por participación', normalizedCategory:'other_expenses', amountNative:-7340.691293, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones plantel profesional', normalizedCategory:'wages_squad', amountNative:-28190.431748, disclosureLevel:'detailed' },
    { rawLabel:'Pago de remuneraciones cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-4191.06686, disclosureLevel:'detailed' },
    { rawLabel:'Pago de otros gastos deportivos fútbol profesional', normalizedCategory:'other_expenses', amountNative:-12923.34615, disclosureLevel:'detailed' },
    { rawLabel:'Pago por adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-19318.430324, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos por compraventa de jugadores', normalizedCategory:'other_expenses', amountNative:-14335.322189, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos fútbol amateur (activable)', normalizedCategory:'other_expenses', amountNative:-5462.113805, disclosureLevel:'detailed' },
    { rawLabel:'Pago de gastos de comercialización', normalizedCategory:'other_expenses', amountNative:-8478.900817, disclosureLevel:'detailed' },
    { rawLabel:'Egresos de otras secciones', normalizedCategory:'other_expenses', amountNative:-5981.254752, disclosureLevel:'detailed', items:[
      ['Pago de remuneraciones otras actividades deportivas', -389.374038], ['Pago de gastos otras actividades deportivas', -1970.613103],
      ['Pago de remuneraciones de instituciones educativas', -2789.252081], ['Pago de gastos de instituciones educativas', -832.01553],
    ]},
    { rawLabel:'Otros egresos', normalizedCategory:'other_expenses', amountNative:-19998.655736, disclosureLevel:'detailed', items:[
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
    currency:'USD', fx:3.82,
    sourceId:'racing-balance-2009',
    reportType:'official_balance_sheet',
    gestionId:null, // pre-Blanco (asumió 2013), presidencia no verificada — ver comentario arriba
    grossDebt:18.393, cash:1.993, profitOnPlayerSales:0, assetSales:0, netInterest:-0.042, tax:0,
  },
  2010: {
    currency:'USD', fx:3.98,
    sourceId:'racing-balance-2010',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:26.459, cash:0.713, profitOnPlayerSales:0, assetSales:0, netInterest:-0.612, tax:0,
  },
  2011: {
    currency:'USD', fx:4.27,
    sourceId:'racing-balance-2011',
    reportType:'official_balance_sheet',
    gestionId:null,
    grossDebt:24.395, cash:0.542, profitOnPlayerSales:0, assetSales:0, netInterest:-0.942, tax:0,
  },
  2024: {
    currency:'ARS', fx:909,
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
    officialTotalRevenue:66367.712489, officialTotalExpenses:79167.964692,
  },
  2025: {
    currency:'ARS', fx:1196,
    sourceId:'racing-balance-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'milito',
    // Mismo criterio que 2024: TOTAL DEL PASIVO / Caja y bancos del Estado de situación patrimonial
    // (pág. 2 del balance 2024-25, columna 30/06/2025); netInterest del Estado de recursos y gastos
    // (pág. 3, columna 2025).
    grossDebt:48210.858049, cash:9738.609524, profitOnPlayerSales:0, assetSales:0, netInterest:3715.545468, tax:0,
    officialTotalRevenue:87399.617009, officialTotalExpenses:91293.614298,
  },
  2026: {
    currency:'ARS', fx:1438,
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
    currency:'ARS', fx:1687.5,
    sourceId:'racing-presupuesto-2026-27',
    reportType:'official_budget',
    gestionId:'milito',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:143118.482343, officialTotalExpenses:142071.747998,
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

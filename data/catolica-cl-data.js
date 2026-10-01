// ============================================================================
// data/catolica-cl-data.js — Cruzados S.A.D.P. (Universidad Católica, Santiago,
// Chile). clubId lleva el sufijo `-cl` (NO `catolica` a secas) porque hay una
// Universidad Católica de ECUADOR sourceándose en paralelo (otro club, otro
// país) — ver `CONVENCIONES.md` Versión 129: todo clubId nuevo que pueda
// colisionar con otro club homónimo de otro país lleva el país al final.
// Ejercicios 2024, 2023 y 2022 = REALES (balance auditado consolidado), los 3
// del mismo tipo de documento.
//
// FUENTE: `Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-
// <año>.md` (transcripción de texto nativo vía pdftotext -layout, no
// escaneados salvo 2009 que no se usa acá), "Estados Financieros Consolidados
// [...] Cruzados S.A.D.P." RUT 76.072.469-6, bajados de cruzados.cl/
// inversionistas/. Cada balance trae 2 columnas (año corriente + comparativo
// del año anterior); para cada ejercicio cargado se usó SIEMPRE la columna
// "año corriente" de SU PROPIO documento, nunca la columna comparativa de un
// balance posterior (ver club-data-mapping SKILL.md sección 6, regla 5).
// Se verificó que Chile NO reexpresa por inflación entre ejercicios (a
// diferencia de la "moneda homogénea" argentina): la columna comparativa
// 2023 del balance 2024 coincide EXACTO, línea por línea, con la columna
// "año corriente" del balance 2023 propio (y lo mismo 2022 balance-2023 vs.
// balance-2022 propio) — con una única excepción menor, ver nota de
// "Ingresos por Ventas de Productos Tienda UC" / "Ingresos por Derechos de
// Merchandising" más abajo (reclasificación entre 2 sub-líneas que mapean a
// la MISMA normalizedCategory, no afecta ningún total).
//
// Cifras del documento en MILES de pesos chilenos (M$, tal cual se indica en
// el encabezado "Miles de pesos" del Estado de Situación Financiera y del
// Estado de Resultados). Acá se guardan divididas por 1.000, en MILLONES de
// CLP nativos (mismo criterio que ya usa el sitio para COP de Once Caldas).
//
// REVENUE: Nota 19 "Ingresos Ordinarios" da 7 líneas (Ingresos por A.N.F.P.,
// Derechos de TV, Borderó/Recaudación de Entradas, Préstamo de Jugadores,
// venta de Jugadores, Derechos de Solidaridad, Otros) que suman "Ingresos por
// Recaudación y otros", más UN SOLO monto agregado "Ingresos Comerciales" sin
// desglosar en la Nota 19 misma. El desglose real de "Ingresos Comerciales"
// (Cuotas Socios Fútbol / Matrículas de Escuelas de Fútbol / Publicidad y
// Auspicios / Ventas de Productos Tienda UC / Derechos de Merchandising) sale
// de la Nota 23 "Información por Segmentos" (columna "Comerciales"), que
// reporta el mismo Estado de Resultados completo partido en 2 segmentos
// (Recaudaciones / Comerciales) — así que NINGUNA línea de ingreso quedó sin
// desglosar acá (a diferencia de otros clubes de este skill donde un "bolsón"
// sin abrir es aceptable). "Otros ingresos por función" (debajo de la
// Ganancia Bruta en el Estado de Resultados, no forma parte de "Ingresos de
// actividades ordinarias") se suma aparte como revenueLine `other_income`,
// mismo criterio que Once Caldas con su Nota 25 "Otros Ingresos".
//
// Categorización (ver club-data-mapping SKILL.md sección 1 para el criterio
// general):
//   - Ingresos por A.N.F.P. → `broadcasting`. El propio documento aclara en
//     nota al pie que es la porción de derechos de TV que la ANFP rinde
//     mensualmente por el contrato colectivo de televisación ("percibió parte
//     del contrato de licenciamiento de los derechos de televisación
//     mediante la rendición de cuentas... que la ANFP debe realizar producto
//     del mandato a nombre propio"), es decir, es TV, aunque el rótulo no lo
//     diga explícito.
//   - Ingresos por Derechos de TV → `broadcasting` (línea de TV separada,
//     más chica; probablemente reventa/rebroadcast internacional, el
//     documento no lo aclara más).
//   - Ingresos por Borderó (Recaudación Entradas) → `matchday_competition`.
//   - Ingresos por Préstamo de Jugadores / venta de Jugadores / Derechos de
//     Solidaridad → `player_sales` (mismo criterio que Once Caldas: préstamos
//     y solidaridad FIFA van junto con venta de jugadores, todos son
//     "actividad de mercado de pases").
//   - Otros (Nota 19) → `other_income`.
//   - Ingresos Cuotas Socios Fútbol → `member_dues`.
//   - Ingresos Matrículas de Escuelas de Fútbol → `youth_football` (escuela
//     de FÚTBOL, no colegio/educación general — ver la distinción explícita
//     de club-data-mapping sección 1: `education` es para un colegio/
//     enseñanza general, esto es una academia de fútbol juvenil).
//   - Ingresos por Publicidad y Auspicios / Ventas de Productos Tienda UC /
//     Derechos de Merchandising → `sponsorship_commercial` (sponsors +
//     merchandising, mismo criterio que Once Caldas con "Publicidad" +
//     "Venta de artículos deportivos").
//   - Otros ingresos por función → `other_income`.
//
// NOTA sobre una reclasificación entre ejercicios (no afecta ningún total):
// el balance 2024 (columna comparativa 2023) reporta "Ventas de Productos
// Tienda UC" $370.123 / "Derechos de Merchandising" $304.735 para 2023,
// mientras que el balance 2023 propio (Nota 23) reporta $375.270 / $299.589
// para esos mismos 2 conceptos en el mismo año — una diferencia de ~$5.147
// M$ en sentido contrario en cada línea (aprox. una reclasificación entre
// las 2 categorías de un año al otro). Como ACÁ las 2 van a la misma
// `normalizedCategory` (`sponsorship_commercial`), y el total "Ingresos
// Comerciales" es IDÉNTICO en ambos documentos ($7.853.832), esto no afecta
// ningún número cargado ni ningún tie-out. Se cargó siempre el valor del
// documento PROPIO de cada ejercicio (balance 2023 para 2023, no la
// comparativa del balance 2024).
//
// EXPENSES: Nota 20 "Composición de Cuentas de Costo de Ventas (Servicios)"
// (9 sub-líneas con categoría real distinta entre sí → promovidas a líneas de
// primer nivel, ver club-data-mapping sección 1) + Nota 21 "Gastos de
// Administración" (15 sub-líneas, TODAS de naturaleza administrativa/no
// deportiva → consolidadas en 1 sola línea `admin_general_expense` con
// `items` de desglose, mismo criterio que usó Once Caldas con su propia Nota
// de Gastos de Administración) + "Otros Gastos por función" (debajo de la
// Ganancia Bruta, aparte de Costo de Ventas/Gastos de Administración, sin
// desglose propio → 1 línea `other_expenses`).
//   - Remuneraciones (Costo de Ventas) → `wages_squad` (personal del plantel/
//     fútbol profesional, la Nota 23 confirma que esta línea es ~93% del
//     segmento "Recaudaciones", es decir, plantel, no administración).
//   - Gastos de Operación → `other_expenses` (bolsón real: el documento no
//     desglosa más, no hay otra nota que lo abra).
//   - Amortización pases de jugadores profesionales + Gasto por Préstamo de
//     Jugadores + Gasto por Transferencia de Jugadores → `player_amortisation`
//     (las 3 son costo del plantel/mercado de pases: amortización contable
//     del pase, costo asociado a préstamos salientes, y costo de adquirir/
//     transferir jugadores — mismo bucket "Compra de jugadores" de Formato
//     Simplificado, igual que Racing/Once Caldas).
//   - Amortización Concesión → `other_amortisation` (amortización de un
//     intangible de concesión, no relacionado al plantel).
//   - Gastos de torneos y otros → `match_organisation_expense`.
//   - Depreciación → `depreciation`.
//   - Costos de ventas productos (COGS de la tienda/merchandising, pareja de
//     "Ingresos por Ventas de Productos Tienda UC") → `other_expenses` (mismo
//     mapeo que usó Once Caldas para su "Costo de Ventas productos
//     deportivos").
//   - Gastos de Administración (consolidado) → `admin_general_expense`.
//   - Otros Gastos por función → `other_expenses`.
//
// RESULTADOS FINANCIEROS: Ingresos financieros - Costos financieros -
// Diferencias de cambio, netos, a `fiscalYearMeta[year].netInterest` (NUNCA
// como línea, ver club-data-mapping sección 2). El propio Estado de
// Resultados imprime "Ingreso (Gasto) por impuestos a las ganancias" = $0 en
// los 3 ejercicios (2022/2023/2024) — a `fiscalYearMeta[year].tax = 0`, no un
// residuo estimado (a diferencia de Once Caldas, acá el documento SÍ imprime
// el impuesto explícito, línea por línea, en el propio Estado de Resultados).
//
// VERIFICACIÓN (club-data-mapping sección 6), los 3 ejercicios cierran EXACTO
// contra el documento propio de cada año, ver detalle numérico completo en
// el reporte de la sesión de carga. Resumen:
//   2024: revenue 21.223,767 = officialTotalRevenue; expenses 21.072,707 =
//     officialTotalExpenses; revenue+expenses+netInterest+tax = -1.353,760 =
//     officialPAT ("Ganancia (Pérdida)" impresa).
//   2023: revenue 16.208,365; expenses 18.898,194; resultado -2.070,007.
//   2022: revenue 23.810,928; expenses 21.410,964; resultado 1.251,440.
//
// TIPO DE CAMBIO: el documento tiene una Nota 25 "Moneda Extranjera" (activos
// y pasivos en USD/EUR), pero a diferencia de los balances argentinos, NO
// declara ningún tipo de cambio propio de cierre (ni una columna "Tipo de
// Cambio" ni un valor puntual, los montos ya vienen convertidos a M$ sin
// mostrar la tasa usada) — se buscó explícito con "tipo de cambio"/"moneda
// extranjera" en los 3 documentos, ninguno lo declara. Por eso se usa el
// dólar observado SII de cierre de cada ejercicio, `fx` LITERAL con
// `fxSource:'market_approx'` (2022 $859,51; 2023 $884,59; 2024 $992,12, día
// hábil más cercano al 31/12 en los 3 casos) — NO un `fxRef` a FX_CLOSE en
// data/currency-map.js, porque esa tabla es solo para cotizaciones EXACTAS
// (`market_close`); una `market_approx` se queda literal en el archivo del
// club para que nadie la reuse creyendo que es un cierre oficial (ver el
// comentario de esa regla en currency-map.js).
//
// grossDebt/cash: a diferencia de Once Caldas (que no traía el Estado de
// Situación Financiera primario), este documento SÍ lo incluye completo.
// `cash` = "Efectivo y equivalentes al efectivo" (activo corriente).
// `grossDebt` = "Otros pasivos financieros" corrientes + no corrientes (Nota
// 17, deuda financiera real: bonos/préstamos) — se usó esta línea más
// angosta, NO el "TOTAL PASIVOS" completo, porque el balance SÍ separa la
// deuda financiera de otras categorías de pasivo (cuentas por pagar
// comerciales, provisiones por beneficios a empleados, pasivos por
// impuestos) — mismo criterio que ya usa Boca/Vélez (ver club-data-mapping
// sección 14).
// ============================================================================

const catolicaRevenueLinesByYear = {
  2024: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:4372.963, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de TV', normalizedCategory:'broadcasting', amountNative:217.415, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:1737.521, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:19.701, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:4278.205, disclosureLevel:'detailed', items:[
      ['Marcelino Nuñez (venta variable, Norwich City)', 245.582], ['Juan Leiva (venta, préstamo a Cobreloa)', 14.776], ['Alexander Aravena (venta, Grêmio FBPA)', 2926.515], ['Gonzalo Tapia (venta, River Plate)', 1091.332],
    ]},
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:56.026, disclosureLevel:'detailed' },
    { rawLabel:'Otros (Nota 19)', normalizedCategory:'other_income', amountNative:16.387, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Cuotas Socios Fútbol', normalizedCategory:'member_dues', amountNative:65.123, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Matrículas de Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:439.141, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:8851.397, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Ventas de Productos Tienda UC', normalizedCategory:'sponsorship_commercial', amountNative:362.786, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:292.418, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:514.684, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:4174.877, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de TV', normalizedCategory:'broadcasting', amountNative:199.545, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:1502.571, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:70.688, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:473.912, disclosureLevel:'detailed', items:[
      ['Benjamin Kuscevic (venta 100%, S.E. Palmeiras)', 317.740], ['Sebastian Galani (venta 75%, Coquimbo Unido)', 20.022], ['Vicente Fernandez (venta 50%, Deportivo Palestino)', 136.150],
    ]},
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:1.933, disclosureLevel:'detailed' },
    { rawLabel:'Otros (Nota 19)', normalizedCategory:'other_income', amountNative:16.980, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Cuotas Socios Fútbol', normalizedCategory:'member_dues', amountNative:94.381, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Matrículas de Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:698.897, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:6385.695, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Ventas de Productos Tienda UC', normalizedCategory:'sponsorship_commercial', amountNative:375.270, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:299.589, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:1914.027, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:3951.082, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de TV', normalizedCategory:'broadcasting', amountNative:3030.675, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:1985.955, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:200.512, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:6464.187, disclosureLevel:'detailed', items:[
      ['Valber Robert Huerta Jerez (venta 100%, Toluca FC)', 1215.180], ['César Pinares (venta 80%, Grêmio FBPA)', 183.994], ['Diego Valencia (venta 100%, US Salernitana)', 2034.560], ['Marcelino Nuñez (venta 85%, Norwich City)', 2746.860], ['Bruno Barticciotto (venta 40%, Deportivo Palestino)', 283.593],
    ]},
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:4.085, disclosureLevel:'detailed' },
    { rawLabel:'Otros (Nota 19)', normalizedCategory:'other_income', amountNative:792.648, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Cuotas Socios Fútbol', normalizedCategory:'member_dues', amountNative:254.263, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Matrículas de Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:488.314, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:5652.315, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Ventas de Productos Tienda UC', normalizedCategory:'sponsorship_commercial', amountNative:317.602, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:379.427, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:289.863, disclosureLevel:'aggregated' },
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:3521.475, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Ingresos por Derechos de TV', normalizedCategory:'broadcasting', amountNative:2953.727, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:623.084, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Ingresos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:315.641, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:82.622, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:31.329, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:11.334, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Ingresos Cuotas Socios Fútbol', normalizedCategory:'member_dues', amountNative:233.028, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Ingresos Matrículas de Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:238.414, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Ingresos por Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:5241.433, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Ingresos por Ventas de Productos Tienda UC', normalizedCategory:'sponsorship_commercial', amountNative:575.407, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Ingresos por Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:253.864, disclosureLevel:'aggregated' }, // pág. 82, precedente
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:76.593, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:4522.883, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Ingresos Derechos de TV Internacional', normalizedCategory:'broadcasting', amountNative:577.538, disclosureLevel:'aggregated' }, // pág. 73, Jev 1
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:4445.898, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Ingresos Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:6048.207, disclosureLevel:'aggregated' }, // pág. 73, Jev 1
    { rawLabel:'Ingresos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:29.807, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:1267.909, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:572.401, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:25.879, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Ingresos Arriendos y Concesiones', normalizedCategory:'stadium_other', amountNative:2229.013, disclosureLevel:'aggregated' }, // pág. 77, Jev 0.93
    { rawLabel:'Ingresos E-Commerce', normalizedCategory:'sponsorship_commercial', amountNative:531.143, disclosureLevel:'aggregated' }, // pág. 77, Jev 0.99
    { rawLabel:'Ingresos Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:515.953, disclosureLevel:'aggregated' }, // pág. 77, Jev 0.99
    { rawLabel:'Ingresos Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:3704.588, disclosureLevel:'aggregated' }, // pág. 77, Jev 1
    { rawLabel:'Ingresos Membresía de Socios', normalizedCategory:'member_dues', amountNative:278.185, disclosureLevel:'aggregated' }, // pág. 77, Jev 1
    { rawLabel:'Ingresos Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:285.221, disclosureLevel:'aggregated' }, // pág. 77, Jev 1
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:396.389, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:419.42, disclosureLevel:'aggregated' }, // pág. 9, precedente
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:3330.077, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Ingresos por Derechos de TV', normalizedCategory:'broadcasting', amountNative:3759.837, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:732.679, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Ingresos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:3.896, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:2583.288, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:155.862, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:12.314, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Ingresos Cuotas Socios Fútbol', normalizedCategory:'member_dues', amountNative:99.645, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Ingresos Matrículas de Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:77.151, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Ingresos por Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:3825.953, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Ingresos por Ventas de Productos Tienda UC', normalizedCategory:'sponsorship_commercial', amountNative:316.398, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Ingresos por Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:324.089, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:200.796, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:3430.17, disclosureLevel:'aggregated' }, // pág. 70, precedente
    { rawLabel:'Ingresos por Derechos de TV', normalizedCategory:'broadcasting', amountNative:2288.001, disclosureLevel:'aggregated' }, // pág. 70, precedente
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:2022.035, disclosureLevel:'aggregated' }, // pág. 70, precedente
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:1875.949, disclosureLevel:'aggregated' }, // pág. 70, precedente
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:1095.936, disclosureLevel:'aggregated' }, // pág. 70, precedente
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:18.209, disclosureLevel:'aggregated' }, // pág. 70, precedente
    { rawLabel:'Ingresos Cuotas Socios Fútbol', normalizedCategory:'member_dues', amountNative:202.753, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Ingresos Matrículas de Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:250.15, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Ingresos por Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:4068.574, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Ingresos por Ventas de Productos Tienda UC', normalizedCategory:'sponsorship_commercial', amountNative:133.956, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Ingresos por Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:191.856, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:1720.886, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Ingresos por A.N.F.P.', normalizedCategory:'broadcasting', amountNative:2400.385, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Ingresos por Retiros del CDF', normalizedCategory:'broadcasting', amountNative:2655.571, disclosureLevel:'aggregated' }, // pág. 57, Jev 0.95
    { rawLabel:'Ingresos por Borderó (Recaudación Entradas)', normalizedCategory:'matchday_competition', amountNative:1516.41, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Ingresos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:31.626, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Ingresos por venta de Jugadores', normalizedCategory:'player_sales', amountNative:371.495, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Ingresos por Derechos de Solidaridad', normalizedCategory:'player_sales', amountNative:330.369, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:5.332, disclosureLevel:'aggregated' }, // pág. 57, precedente
    { rawLabel:'Ingresos Cuotas Socios Fútbol', normalizedCategory:'member_dues', amountNative:98.296, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Ingresos Matrículas de Escuelas de Fútbol', normalizedCategory:'youth_football', amountNative:280.135, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Ingresos por Publicidad y Auspicios', normalizedCategory:'sponsorship_commercial', amountNative:3186.587, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Ingresos por Ventas de Productos Tienda UC', normalizedCategory:'sponsorship_commercial', amountNative:127.851, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Ingresos por Derechos de Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:256.544, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Otros ingresos por función', normalizedCategory:'other_income', amountNative:29.612, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
};

const catolicaExpenseLinesByYear = {
  2024: [
    { rawLabel:'Remuneraciones (Costo de Ventas)', normalizedCategory:'wages_squad', amountNative:-9140.947, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Operación (Costo de Ventas)', normalizedCategory:'other_expenses', amountNative:-4554.467, disclosureLevel:'aggregated' },
    { rawLabel:'Amortización pases de jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-1223.927, disclosureLevel:'detailed' },
    { rawLabel:'Gasto por Préstamo de Jugadores', normalizedCategory:'player_amortisation', amountNative:-27.125, disclosureLevel:'detailed' },
    { rawLabel:'Gasto por Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-1377.032, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-1013.896, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación (Costo de Ventas)', normalizedCategory:'depreciation', amountNative:-304.661, disclosureLevel:'detailed' },
    { rawLabel:'Costos de ventas productos', normalizedCategory:'other_expenses', amountNative:-282.554, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-2619.562, disclosureLevel:'detailed', items:[
      ['Remuneración', 1130.254], ['Indemnización', 8.407], ['Gastos Generales', 77.273], ['Combustible y Lubricantes', 0.889], ['Servicios Contratados', 362.572], ['Servicios de Seguridad', 77.365], ['Servicios de Aseo', 65.115], ['Arriendo de Bienes', 282.970], ['Servicios de Terceros', 108.836], ['Materiales de Mantención y Reparación', 6.227], ['Servicios de Mantención y Reparación', 26.031], ['Patentes y Contribuciones', 146.134], ['Provisión No Operacionales', 3.456], ['Materiales de Oficina y Otros', 312.860], ['Feriado Legal', 11.173],
    ]},
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-377.468, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Remuneraciones (Costo de Ventas)', normalizedCategory:'wages_squad', amountNative:-9389.159, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Operación (Costo de Ventas)', normalizedCategory:'other_expenses', amountNative:-2423.270, disclosureLevel:'aggregated' },
    { rawLabel:'Amortización pases de jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-1906.168, disclosureLevel:'detailed' },
    { rawLabel:'Gasto por Préstamo de Jugadores', normalizedCategory:'player_amortisation', amountNative:-156.627, disclosureLevel:'detailed' },
    { rawLabel:'Gasto por Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-22.761, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-1528.051, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación (Costo de Ventas)', normalizedCategory:'depreciation', amountNative:-309.174, disclosureLevel:'detailed' },
    { rawLabel:'Costos de ventas productos', normalizedCategory:'other_expenses', amountNative:-203.986, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-2470.234, disclosureLevel:'detailed', items:[
      ['Remuneración', 1083.070], ['Indemnización', 98.743], ['Gastos Generales', 159.987], ['Combustible y Lubricantes', 0.549], ['Servicios Contratados', 445.307], ['Servicios de Seguridad', 72.244], ['Servicios de Aseo', 59.023], ['Arriendo de Bienes', 234.485], ['Servicios de Terceros', 11.723], ['Materiales de Mantención y Reparación', 7.775], ['Servicios de Mantención y Reparación', 32.268], ['Patentes y Contribuciones', 126.485], ['Provisión No Operacionales', 7.775], ['Materiales de Oficina y Otros', 111.957], ['Feriado Legal', 18.843],
    ]},
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-337.696, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Remuneraciones (Costo de Ventas)', normalizedCategory:'wages_squad', amountNative:-9819.826, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Operación (Costo de Ventas)', normalizedCategory:'other_expenses', amountNative:-2287.671, disclosureLevel:'aggregated' },
    { rawLabel:'Amortización pases de jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-1837.734, disclosureLevel:'detailed' },
    { rawLabel:'Gasto por Préstamo de Jugadores', normalizedCategory:'player_amortisation', amountNative:-578.028, disclosureLevel:'detailed' },
    { rawLabel:'Gasto por Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-2010.506, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-1251.191, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación (Costo de Ventas)', normalizedCategory:'depreciation', amountNative:-304.106, disclosureLevel:'detailed' },
    { rawLabel:'Costos de ventas productos', normalizedCategory:'other_expenses', amountNative:-220.274, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-2392.084, disclosureLevel:'detailed', items:[
      ['Remuneración', 855.659], ['Indemnización', 4.598], ['Gastos Generales', 119.777], ['Combustible y Lubricantes', 5.895], ['Servicios Contratados', 604.402], ['Servicios de Seguridad', 65.574], ['Servicios de Aseo', 54.797], ['Arriendo de Bienes', 180.508], ['Servicios de Terceros', 189.404], ['Materiales de Mantención y Reparación', 16.260], ['Servicios de Mantención y Reparación', 93.960], ['Patentes y Contribuciones', 96.316], ['Provisión No Operacionales', 2.202], ['Materiales de Oficina y Otros', 82.394], ['Feriado Legal', 20.338],
    ]},
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-558.476, disclosureLevel:'aggregated' },
  ],
  2021: [ // tools/cargar.mjs (2026-10-01)
    { rawLabel:'Remuneraciones', normalizedCategory:'wages_squad', amountNative:-8036.278, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Gastos de Operación', normalizedCategory:'other_expenses', amountNative:-1913.147, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Amortización pases de jugadores profesionales (*)', normalizedCategory:'player_amortisation', amountNative:-3820.607, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Gastos de torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-708.836, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Gasto por Préstamo de Jugadores', normalizedCategory:'player_amortisation', amountNative:-52.88, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Gasto por Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-162.048, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-302.961, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Costos de ventas productos', normalizedCategory:'other_expenses', amountNative:-403.074, disclosureLevel:'aggregated' }, // pág. 80, precedente
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-150.434, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Remuneración', normalizedCategory:'admin_general_expense', amountNative:-722.353, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Indemnización', normalizedCategory:'admin_general_expense', amountNative:-0.305, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-89.854, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Combustible y Lubricantes', normalizedCategory:'admin_general_expense', amountNative:-7.651, disclosureLevel:'aggregated' }, // pág. 81, Jev 0.91
    { rawLabel:'Servicios Contratados', normalizedCategory:'admin_general_expense', amountNative:-504.725, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Servicios de Seguridad', normalizedCategory:'match_organisation_expense', amountNative:-60.689, disclosureLevel:'aggregated' }, // pág. 81, Jev 0.99
    { rawLabel:'Servicios de Aseo', normalizedCategory:'admin_general_expense', amountNative:-39.642, disclosureLevel:'aggregated' }, // pág. 81, Claude 0.8
    { rawLabel:'Arriendo de Bienes', normalizedCategory:'admin_general_expense', amountNative:-3.164, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Servicios de Terceros', normalizedCategory:'admin_general_expense', amountNative:-27.846, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Materiales de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-14.458, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Servicios de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-33.932, disclosureLevel:'aggregated' }, // pág. 81, Claude 0.8
    { rawLabel:'Patentes y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-94.129, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Materiales de Oficina y Otros', normalizedCategory:'admin_general_expense', amountNative:-71.952, disclosureLevel:'aggregated' }, // pág. 81, precedente
    { rawLabel:'Feriado Legal', normalizedCategory:'admin_general_expense', amountNative:-41.602, disclosureLevel:'aggregated' }, // pág. 81, Claude 0.88
  ],
  2025: [ // tools/cargar.mjs (2026-10-01)
    { rawLabel:'Remuneraciones', normalizedCategory:'wages_squad', amountNative:-10762.861, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Gastos de Operación', normalizedCategory:'other_expenses', amountNative:-3689.043, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Amortización Pases de Jugadores Profesionales', normalizedCategory:'player_amortisation', amountNative:-2687.327, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Gastos de Torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-1620.26, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Gasto Arriendo de Pases', normalizedCategory:'player_amortisation', amountNative:-342.329, disclosureLevel:'aggregated' }, // pág. 77, Claude 0.88
    { rawLabel:'Gasto Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-23.115, disclosureLevel:'aggregated' }, // pág. 77, Jev 0.95
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-886.206, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Costos de Ventas por Eventos', normalizedCategory:'other_expenses', amountNative:-465.788, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Costos de Ventas Productos', normalizedCategory:'other_expenses', amountNative:-357.896, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-485.62, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Remuneración', normalizedCategory:'admin_general_expense', amountNative:-1790.062, disclosureLevel:'aggregated' }, // pág. 76, Claude 0.85
    { rawLabel:'Indemnización', normalizedCategory:'admin_general_expense', amountNative:-10.843, disclosureLevel:'aggregated' }, // pág. 76, Jev 0.93
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-92.187, disclosureLevel:'aggregated' }, // pág. 76, Jev 1
    { rawLabel:'Transporte', normalizedCategory:'admin_general_expense', amountNative:-54.199, disclosureLevel:'aggregated' }, // pág. 76, precedente
    { rawLabel:'Servicios Contratados', normalizedCategory:'admin_general_expense', amountNative:-1002.789, disclosureLevel:'aggregated' }, // pág. 76, Claude 0.8
    { rawLabel:'Arriendo de Bienes', normalizedCategory:'admin_general_expense', amountNative:-263.339, disclosureLevel:'aggregated' }, // pág. 76, precedente
    { rawLabel:'Gastos Notariales y Judiciales', normalizedCategory:'admin_general_expense', amountNative:-166.655, disclosureLevel:'aggregated' }, // pág. 76, Jev 0.99
    { rawLabel:'Servicios de Terceros', normalizedCategory:'admin_general_expense', amountNative:-63.01, disclosureLevel:'aggregated' }, // pág. 76, Claude 0.8
    { rawLabel:'Materiales de Mantencion y Reparación', normalizedCategory:'admin_general_expense', amountNative:-0.211, disclosureLevel:'aggregated' }, // pág. 76, Claude 0.8
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-166.375, disclosureLevel:'aggregated' }, // pág. 76, Jev 0.96
    { rawLabel:'Asesorias y Capacitación', normalizedCategory:'admin_general_expense', amountNative:-37.874, disclosureLevel:'aggregated' }, // pág. 76, Jev 0.99
    { rawLabel:'Consumo Básico', normalizedCategory:'admin_general_expense', amountNative:-266.218, disclosureLevel:'aggregated' }, // pág. 76, Jev 0.91
    { rawLabel:'Patentes y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-142.811, disclosureLevel:'aggregated' }, // pág. 76, Jev 0.91
    { rawLabel:'Provisión No Operacionales', normalizedCategory:'admin_general_expense', amountNative:-4.57, disclosureLevel:'aggregated' }, // pág. 76, precedente
    { rawLabel:'Materiales de Oficina y Otros', normalizedCategory:'admin_general_expense', amountNative:-133.338, disclosureLevel:'aggregated' }, // pág. 76, Jev 0.96
  ],
  2020: [ // tools/cargar.mjs (2026-10-01)
    { rawLabel:'Remuneraciones', normalizedCategory:'wages_squad', amountNative:-6871.603, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Gastos de Operación', normalizedCategory:'other_expenses', amountNative:-1428.06, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Amortización pases de jugadores profesionales (*)', normalizedCategory:'player_amortisation', amountNative:-3023.327, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Gastos de torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-711.755, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Gasto por Préstamo de Jugadores', normalizedCategory:'player_amortisation', amountNative:-231.602, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Gasto por Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-803.988, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-315.109, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Costos de ventas productos', normalizedCategory:'other_expenses', amountNative:-181.692, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-278.71, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Remuneración', normalizedCategory:'admin_general_expense', amountNative:-641.356, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-58.164, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Combustible y Lubricantes', normalizedCategory:'admin_general_expense', amountNative:-4.575, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Servicios Contratados', normalizedCategory:'admin_general_expense', amountNative:-469.121, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Servicios de Seguridad', normalizedCategory:'match_organisation_expense', amountNative:-56.808, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Servicios de Aseo', normalizedCategory:'admin_general_expense', amountNative:-30.566, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Arriendo de Bienes', normalizedCategory:'admin_general_expense', amountNative:-8.499, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Servicios de Terceros', normalizedCategory:'admin_general_expense', amountNative:-141.474, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Materiales de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-9.754, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Servicios de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-35.526, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Patentes y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-85.843, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Provisión No Operacionales', normalizedCategory:'admin_general_expense', amountNative:-0.412, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Materiales de Oficina y Otros', normalizedCategory:'admin_general_expense', amountNative:-110.564, disclosureLevel:'aggregated' }, // pág. 78, precedente
    { rawLabel:'Feriado Legal', normalizedCategory:'admin_general_expense', amountNative:15.597, disclosureLevel:'aggregated' }, // pág. 78, precedente
  ],
  2019: [ // tools/cargar.mjs (2026-10-01)
    { rawLabel:'Remuneraciones', normalizedCategory:'wages_squad', amountNative:-7075.881, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Gastos de Operación', normalizedCategory:'other_expenses', amountNative:-1317.409, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Amortización pases de jugadores profesionales (*)', normalizedCategory:'player_amortisation', amountNative:-2418.173, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Gastos de torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-718.834, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Gasto por Préstamo de Jugadores', normalizedCategory:'player_amortisation', amountNative:-120.502, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Gasto por Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-374.562, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-273.994, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Costos de ventas productos', normalizedCategory:'other_expenses', amountNative:-140.317, disclosureLevel:'aggregated' }, // pág. 73, precedente
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-296.777, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Remuneración', normalizedCategory:'admin_general_expense', amountNative:-644.834, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Indemnización', normalizedCategory:'admin_general_expense', amountNative:-5.469, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-73.514, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Combustible y Lubricantes', normalizedCategory:'admin_general_expense', amountNative:-5.319, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Servicios Contratados', normalizedCategory:'admin_general_expense', amountNative:-473.728, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Servicios de Seguridad', normalizedCategory:'match_organisation_expense', amountNative:-58.986, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Servicios de Aseo', normalizedCategory:'admin_general_expense', amountNative:-47.322, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Servicios de Terceros', normalizedCategory:'admin_general_expense', amountNative:-165.184, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Materiales de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-15.569, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Servicios de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-74.589, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Patentes y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-76.221, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Materiales de Oficina y Otros', normalizedCategory:'admin_general_expense', amountNative:-110.084, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'Feriado Legal', normalizedCategory:'admin_general_expense', amountNative:-15.818, disclosureLevel:'aggregated' }, // pág. 74, precedente
  ],
  2018: [ // tools/cargar.mjs (2026-10-01)
    { rawLabel:'Remuneraciones', normalizedCategory:'wages_squad', amountNative:-4756.395, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Gastos de Operación', normalizedCategory:'other_expenses', amountNative:-1274.384, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Amortización pases de jugadores profesionales (*)', normalizedCategory:'player_amortisation', amountNative:-1859.041, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Amortización Concesión', normalizedCategory:'other_amortisation', amountNative:-151.068, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Amortización Licencias', normalizedCategory:'other_amortisation', amountNative:-1.559, disclosureLevel:'aggregated' }, // pág. 60, Jev 0.97
    { rawLabel:'Gastos de torneos y otros', normalizedCategory:'match_organisation_expense', amountNative:-523.549, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Gasto por Préstamo de Jugadores', normalizedCategory:'player_amortisation', amountNative:-163.921, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Gasto por Transferencia de Jugadores', normalizedCategory:'player_amortisation', amountNative:-167.322, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-109.985, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Costos de ventas productos', normalizedCategory:'other_expenses', amountNative:-73.647, disclosureLevel:'aggregated' }, // pág. 60, precedente
    { rawLabel:'Otros Gastos por función', normalizedCategory:'other_expenses', amountNative:-259.086, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Remuneración', normalizedCategory:'admin_general_expense', amountNative:-584.404, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Indemnizaciones', normalizedCategory:'other_expenses', amountNative:-0.796, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.99
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-73.916, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Combustible y Lubricantes', normalizedCategory:'admin_general_expense', amountNative:-7.766, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Servicios Contratados', normalizedCategory:'admin_general_expense', amountNative:-422.153, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Servicios de Seguridad', normalizedCategory:'match_organisation_expense', amountNative:-64.768, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Serviciosa de Aseo', normalizedCategory:'admin_general_expense', amountNative:-27.389, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Arriendo de Bienes', normalizedCategory:'admin_general_expense', amountNative:-188.398, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Servicios de Terceros', normalizedCategory:'admin_general_expense', amountNative:-106.779, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Materiales de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-20.751, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Servicios de Mantención y Reparación', normalizedCategory:'admin_general_expense', amountNative:-51.241, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Patentes y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-74.576, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Provisión No Operacionales', normalizedCategory:'admin_general_expense', amountNative:-1.6, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Materiales de Oficina y Otros', normalizedCategory:'admin_general_expense', amountNative:-98.239, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Feriado Legal', normalizedCategory:'admin_general_expense', amountNative:-15.31, disclosureLevel:'aggregated' }, // pág. 61, precedente
  ],
};

const catolicaFiscalYearMeta = {
  2024: {
    // El documento NO declara su propio tipo de cambio de cierre (Nota 25 "Moneda Extranjera" solo
    // muestra saldos ya convertidos a M$, sin columna de tasa) — se usa el dólar observado SII de
    // cierre vía FX_CLOSE (data/currency-map.js), no un fx literal.
    currency:'CLP', fx:992.12, fxSource:'market_approx',
    sourceId:'catolica-cl-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos financieros (314.591) - Costos financieros (333.552) - Diferencias de cambio (1.485.859).
    netInterest:-1504.820,
    tax:0, // "Ingreso (Gasto) por impuestos a las ganancias" = $0, impreso explícito en el Estado de Resultados
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:29666.971, cash:807.202, // Otros pasivos financieros ctes.+no ctes. (Nota 17) / Efectivo y equivalentes
    officialTotalRevenue:21223.767, officialTotalExpenses:21072.707, officialPAT:-1353.760,
  },
  2023: {
    currency:'CLP', fx:884.59, fxSource:'market_approx',
    sourceId:'catolica-cl-estados-financieros-2023',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos financieros (1.937.432) - Costos financieros (175.650) - Diferencias de cambio (1.141.960).
    netInterest:619.822,
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:22821.792, cash:11867.771,
    officialTotalRevenue:16208.365, officialTotalExpenses:18898.194, officialPAT:-2070.007,
  },
  2022: {
    currency:'CLP', fx:859.51, fxSource:'market_approx',
    sourceId:'catolica-cl-estados-financieros-2022',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos financieros (1.118.692) - Costos financieros (323.559) - Diferencias de cambio (1.943.657).
    netInterest:-1148.524,
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:22192.427, cash:33606.832,
    officialTotalRevenue:23810.928, officialTotalExpenses:21410.964, officialPAT:1251.440,
  },
  2021: { // tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'CLP', fx:844.69, fxSource:'document_close',
    sourceId:'catolica-cl-estados-financieros-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-282.617, tax:0,
    extraRows: [
      {label:'Ingresos financieros', value:483.208},
      {label:'Costos financieros', value:-149.384},
      {label:'Diferencias de cambio', value:-616.441},
      {label:'Ingreso (Gasto) por impuestos a las ganancias', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:14157.951, officialTotalExpenses:17413.635, officialPAT:-3538.301,
  },
  2025: { // tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'CLP', fx:907.13, fxSource:'document_close',
    sourceId:'catolica-cl-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-914.284, tax:0,
    extraRows: [
      {label:'Ingresos financieros', value:59.748},
      {label:'Costos financieros', value:-725.647},
      {label:'Diferencias de cambio', value:595.435},
      {label:'Resultado por unidades de Reajuste', value:-843.82},
      {label:'Ingreso (Gasto) por impuestos a las ganancias', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:25850.434, officialTotalExpenses:25665.994, officialPAT:-729.845,
  },
  2020: { // tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'CLP', fx:710.95, fxSource:'document_close',
    sourceId:'catolica-cl-estados-financieros-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-321.469, tax:0,
    extraRows: [
      {label:'Ingresos financieros', value:45.014},
      {label:'Costos financieros', value:-88.793},
      {label:'Diferencias de cambio', value:-277.69},
      {label:'Ingreso (Gasto) por impuestos a las ganancias', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:15421.985, officialTotalExpenses:15633.979, officialPAT:-533.463,
  },
  2019: { // tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'CLP', fx:748.74, fxSource:'document_close',
    sourceId:'catolica-cl-estados-financieros-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-62.575, tax:0,
    extraRows: [
      {label:'Ingresos financieros', value:189.071},
      {label:'Costos financieros', value:-94.472},
      {label:'Diferencias de cambio', value:-157.174},
      {label:'Ingreso (Gasto) por impuestos a las ganancias', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:17298.475, officialTotalExpenses:14654.154, officialPAT:2581.746,
  },
  2018: { // tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'CLP', fx:694.77, fxSource:'document_close',
    sourceId:'catolica-cl-estados-financieros-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-12.824, tax:0,
    extraRows: [
      {label:'Ingresos financieros', value:66.373},
      {label:'Costos financieros', value:-4.053},
      {label:'Diferencias de cambio', value:-75.144},
      {label:'Ingreso (Gasto) por impuestos a las ganancias', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:11290.213, officialTotalExpenses:11078.043, officialPAT:199.346,
  },
};

const catolicaPresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
// club (fuera de alcance de esta sesión, enfocada en Finanzas 2022-2024). Arrays/objetos vacíos en
// vez de placeholders inventados.
const catolicaPasesData = [];
const catolicaResultadosData = {};
const catolicaTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['catolica-cl'] = {
  revenueLinesByYear: catolicaRevenueLinesByYear, expenseLinesByYear: catolicaExpenseLinesByYear,
  fiscalYearMeta: catolicaFiscalYearMeta, pasesData: catolicaPasesData,
  resultadosData: catolicaResultadosData, titulosData: catolicaTitulosData,
  presupuestoOverlayByYear: catolicaPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'catolica-cl-estados-financieros-2024': {
    id:'catolica-cl-estados-financieros-2024', clubId:'catolica-cl',
    title:'Estados Financieros Consolidados de Cruzados S.A.D.P., al 31 de diciembre de 2024 y 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de cruzados.cl/inversionistas/ (RUT 76.072.469-6). Balance auditado consolidado completo (Estado de Situación Financiera, Estado de Resultados por Función, Estado de Resultados Integrales, Estado de Cambios en el Patrimonio, Estado de Flujo de Efectivo y notas 1 a 30), texto nativo. Transcripción completa en Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2024.md.',
  },
  'catolica-cl-estados-financieros-2023': {
    id:'catolica-cl-estados-financieros-2023', clubId:'catolica-cl',
    title:'Estados Financieros Consolidados de Cruzados S.A.D.P., al 31 de diciembre de 2023 y 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de cruzados.cl/inversionistas/ (RUT 76.072.469-6). Mismo formato que el ejercicio 2024. Transcripción completa en Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2023.md.',
  },
  'catolica-cl-estados-financieros-2022': {
    id:'catolica-cl-estados-financieros-2022', clubId:'catolica-cl',
    title:'Estados Financieros Consolidados de Cruzados S.A.D.P., al 31 de diciembre de 2022 y 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de cruzados.cl/inversionistas/ (RUT 76.072.469-6). Mismo formato que los ejercicios 2023/2024. Transcripción completa en Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2022.md.',
  },
  'catolica-cl-estados-financieros-2021': {
    id:'catolica-cl-estados-financieros-2021', clubId:'catolica-cl',
    title:'Cruzados S.A.D.P. — estados-financieros-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'catolica-cl-estados-financieros-2025': {
    id:'catolica-cl-estados-financieros-2025', clubId:'catolica-cl',
    title:'Cruzados S.A.D.P. — estados-financieros-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
  'catolica-cl-estados-financieros-2020': {
    id:'catolica-cl-estados-financieros-2020', clubId:'catolica-cl',
    title:'Cruzados S.A.D.P. — estados-financieros-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'catolica-cl-estados-financieros-2019': {
    id:'catolica-cl-estados-financieros-2019', clubId:'catolica-cl',
    title:'Cruzados S.A.D.P. — estados-financieros-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'catolica-cl-estados-financieros-2018': {
    id:'catolica-cl-estados-financieros-2018', clubId:'catolica-cl',
    title:'Cruzados S.A.D.P. — estados-financieros-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

// gestionesByClub: no se pudo confirmar con confianza quién ejercía la gerencia general/directorio
// en cada ejercicio puntual (Cruzados S.A.D.P. es una sociedad anónima deportiva profesional, no un
// club asociativo con presidente electo) — se agrega una entrada genérica "Gestión actual" (mismo
// criterio que Once Caldas, club-data-mapping SKILL.md sección 7: "mejor un año sin gestión asignada
// que una gestión inventada").
gestionesByClub['catolica-cl'] = {
  actual: { nombre:'Gestión actual', firstYear:2022, lastYear:2024 },
};

memberCountByClub['catolica-cl'] = null;

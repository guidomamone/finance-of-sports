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

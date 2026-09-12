// ============================================================================
// data/boca-data.js — datos financieros y deportivos de Boca: yearsRaw,
// desgloses (revenueBreakdown/expenseBreakdown/expenseSubBreakdown),
// nativeFinancialsBoca, gestionesInfo, pasesData, resultadosData,
// titulosData. Boca es el único club que todavía NO usa el motor genérico
// revenueLines/expenseLines de River/Racing (ver data/river-data.js), así
// que su forma de dato es distinta a propósito (ver
// numeros-de-boca/.claude/skills/club-data-mapping/SKILL.md sección 1).
//
// Extraído de index.html (Versión 51, limpieza de arquitectura antes de
// seguir agregando clubes) sin cambiar un solo valor: exactamente el mismo
// contenido que antes vivía inline en el <script> principal, ahora en su
// propio archivo — igual que ya tenían River y Racing — para poder
// cargarlo bajo demanda (ver plan de lazy-loading por club).
//
// Quién lo usa: js/finanzas-calc.js (computeYear, simplifiedReportForBoca,
// etc.) y js/finanzas-render.js (buildNativeSectionHtml y afines) leen
// estas constantes por nombre; index.html debe cargar este script ANTES de
// esos dos.
// ============================================================================


  // ---------- DATOS PLACEHOLDER ----------
  // Estructura de Revenue: las 9 categorías tal cual las publica el club en el Presupuesto Económico
  // (Cuotas Sociales, Comerciales, Exhibición de Espectáculos Deportivos, Abonos, Diversos, Otros deportes,
  // Basket Profesional, Futbol Juvenil, Futbol Femenino). Para los ejercicios placeholder (todos menos 2027
  // y 2025, que son reales) no tenemos ese desglose real, así que se reusa lo que ya había
  // (matchday+broadcasting -> Exhibición, commercial -> Comerciales, otherOperatingIncome -> Diversos) sin
  // inventar el resto categoría por categoría.
  // Versión 81 (pedido de Guido, "quita los años placeholders de Finanzas"): estos 5 ejercicios
  // (2018/2019/2021/2022/2023) YA NO aparecen en ningún selector/gráfico de Finanzas (ver
  // `gestionesInfo` más abajo y los arrays hardcodeados en `js/finanzas-render.js`,
  // `populateFinanzasSelectors`/`updateFinanzasByAnio`) — pero se DEJAN acá en `yearsRaw` sin
  // tocar, porque `gestionesByClub.boca` (data/clubs.js) todavía referencia estos años para
  // Mercado de Pases/Resultados/Comparar Gestiones (gestiones "ameal"/"angelici"), que el pedido de
  // Guido no incluía ("de Finanzas", no de todo el sitio) — borrarlos de acá rompía esas 3
  // pestañas con un TypeError real (`computeYear(2023)` leyendo `yearsRaw[2023]` inexistente),
  // encontrado probando en el navegador antes de dar esto por terminado.
  const yearsRaw = {
    2018:{cuotasSociales:0, comerciales:9, exhibicionEspectaculos:16, abonos:0, diversos:0.1, otrosDeportes:0, basketProfesional:0, futbolJuvenil:0, futbolFemenino:0, wages:-14, otherExpenses:-8, exceptionalItems:-0.1, playerAmortisation:-2.5, playerImpairment:-0.1, depreciation:-0.5, otherAmortisation:-0.1, profitOnPlayerSales:5.5, assetSales:0, netInterest:-0.4, tax:-0.1, grossDebt:5.5, cash:1.8, gestion:'angelici'},
    2019:{cuotasSociales:0, comerciales:10, exhibicionEspectaculos:18, abonos:0, diversos:0.1, otrosDeportes:0, basketProfesional:0, futbolJuvenil:0, futbolFemenino:0, wages:-15, otherExpenses:-9, exceptionalItems:-0.1, playerAmortisation:-3.0, playerImpairment:-0.1, depreciation:-0.6, otherAmortisation:-0.1, profitOnPlayerSales:6.0, assetSales:0, netInterest:-0.5, tax:-0.1, grossDebt:6.1, cash:2.0, gestion:'angelici'},
    2021:{cuotasSociales:0, comerciales:17, exhibicionEspectaculos:23, abonos:0, diversos:0.1, otrosDeportes:0, basketProfesional:0, futbolJuvenil:0, futbolFemenino:0, wages:-22, otherExpenses:-13, exceptionalItems:-0.1, playerAmortisation:-4.5, playerImpairment:-0.2, depreciation:-0.8, otherAmortisation:-0.2, profitOnPlayerSales:3.0, assetSales:0, netInterest:-0.9, tax:-0.1, grossDebt:11.8, cash:1.0, gestion:'ameal'},
    2022:{cuotasSociales:0, comerciales:18, exhibicionEspectaculos:27, abonos:0, diversos:0.1, otrosDeportes:0, basketProfesional:0, futbolJuvenil:0, futbolFemenino:0, wages:-24, otherExpenses:-13, exceptionalItems:-0.2, playerAmortisation:-4.8, playerImpairment:-0.3, depreciation:-0.9, otherAmortisation:-0.2, profitOnPlayerSales:4.2, assetSales:0, netInterest:-0.8, tax:-0.2, grossDebt:11.0, cash:1.2, gestion:'ameal'},
    2023:{cuotasSociales:0, comerciales:18, exhibicionEspectaculos:29, abonos:0, diversos:0.2, otrosDeportes:0, basketProfesional:0, futbolJuvenil:0, futbolFemenino:0, wages:-25, otherExpenses:-13, exceptionalItems:-0.3, playerAmortisation:-5.0, playerImpairment:-0.4, depreciation:-1.0, otherAmortisation:-0.2, profitOnPlayerSales:5.0, assetSales:0, netInterest:-0.7, tax:-0.2, grossDebt:10.5, cash:1.5, gestion:'ameal'},
    // Ejercicio 2024: pendiente de cargar con datos reales. Todo en cero a propósito para no confundir con placeholder inventado.
    2024:{cuotasSociales:0, comerciales:0, exhibicionEspectaculos:0, abonos:0, diversos:0, otrosDeportes:0, basketProfesional:0, futbolJuvenil:0, futbolFemenino:0, wages:0, otherExpenses:0, exceptionalItems:0, playerAmortisation:0, playerImpairment:0, depreciation:0, otherAmortisation:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0, grossDebt:0, cash:0, gestion:'riquelme'},
    // Ejercicio 2026 (jul-2025 a jun-2026): pendiente. Boca todavía no publicó el balance auditado de
    // este ejercicio (recién cerró jun-2026, la asamblea que lo aprueba es en octubre siguiente) ni
    // subió un presupuesto oficial en PDF para este período. Se deja en cero a propósito, mismo
    // criterio que el Ejercicio 2024. NO es un placeholder inventado (ver reportTypeForYear/
    // renderDataQualityBannerForCurrentSelection, que lo marcan como 'pending_official': banner y
    // cards dicen explícitamente "todavía no informado por el club", no "dato de prueba"). Reemplazar
    // este objeto por datos reales apenas Boca publique el documento, ver CLAUDE.md para el proceso
    // (transcribir el PDF a .md ANTES de extraer nada).
    2026:{cuotasSociales:0, comerciales:0, exhibicionEspectaculos:0, abonos:0, diversos:0, otrosDeportes:0, basketProfesional:0, futbolJuvenil:0, futbolFemenino:0, wages:0, otherExpenses:0, exceptionalItems:0, playerAmortisation:0, playerImpairment:0, depreciation:0, otherAmortisation:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0, grossDebt:0, cash:0, gestion:'riquelme'},
    // Ejercicio 2025 = Memoria y Balance oficial auditado al 30/06/2025 (ver sources['boca-balance-2024-25']
    // en data/clubs.js). Real, no placeholder, primer ejercicio de Boca con balance auditado cargado.
    // Guardado en ARS MILLONES EXACTOS (= pesos oficiales / 1.000.000), en "moneda homogénea" (Nota 2.2 del
    // balance: reexpresado a poder adquisitivo del 30/06/2025 según RT 6/17), sin ninguna conversión al
    // cargar el dato. Cada campo cruza EXACTO contra el documento (ver detalle campo por campo abajo);
    // toda la cadena revenue->ebitda->ebit->pbt->pat da EXACTO el Resultado antes del efecto financiero
    // ($34.869,724928 M) y el Superávit del ejercicio ($35.581,462204 M) impresos en la pág. 76.
    //
    // Revenue (9 categorías, pág. 76 + anexos VI/VII/VIII, pp.126-128): el balance auditado NO reporta
    // ingresos por transferencias/rescisión de jugadores como parte de "Recursos" en este desglose, esos
    // $84.714,628094 M se llevan, netos de sus gastos asociados, a profitOnPlayerSales (ver abajo), igual
    // convención que usa el resto del sitio (SwissRamble-style: venta de pases no es "Revenue"/turnover).
    // - cuotasSociales = Cuotas sociales (anexo VIII) = suma exacta de sus 6 líneas (activos+adherentes+
    //   interior/exterior+adherentes interior+menores+cadetes).
    // - comerciales = Publicidad, concesiones y licencias (anexo VII) = suma exacta de sus 25 sponsors/líneas.
    // - exhibicionEspectaculos = Exhibiciones y espectáculos de fútbol (anexo VI, $56.414,093318 M) MENOS
    //   "Abonos a palcos, plateas y cocheras" ($21.072,986797 M), que se separó a la fila "abonos" de abajo
    //   porque el propio anexo VI la desglosa como línea propia y el resto del sitio (Ejercicio 2027, y la
    //   estructura de 9 categorías en general) trata Abonos como categoría separada de Exhibición.
    // - abonos = la línea "Abonos a palcos, plateas y cocheras" del anexo VI (ver arriba).
    // - diversos = Otras contribuciones de asociados + Mecanismo de solidaridad + Cesión de jugadores a
    //   préstamo + Ingresos varios (4 líneas sueltas de la pág. 76, sin anexo propio).
    // - otrosDeportes = Departamento de educación física (línea suelta pág. 76). Mapeo aproximado por
    //   nombre (el balance no usa la etiqueta "Otros deportes" de la Presupuesto), pero es el único ingreso
    //   real que corresponde a deportes no-fútbol/no-básquet fuera del club de fútbol profesional.
    // - basketProfesional = Departamento de básquet (línea suelta pág. 76).
    // - futbolJuvenil = 0 y futbolFemenino = 0: el balance NO reporta ingresos propios para estos dos
    //   departamentos (solo gastos, ver más abajo), es un $0 real, no un placeholder sin cargar.
    2025:{cuotasSociales:57536.093713, comerciales:33217.710535, exhibicionEspectaculos:35341.106521, abonos:21072.986797, diversos:4778.281161, otrosDeportes:796.665345, basketProfesional:157.094476, futbolJuvenil:0, futbolFemenino:0,
    // Expenses: wages = Remuneraciones y cargas sociales de TODO el club, sumadas línea por línea de los
    // anexos IX (plantel profesional $44.390,524043 M + personal administrativo $2.061,708176 M), XI
    // (estadio), XII (educación física, 5 sub-líneas), XIII (fútbol juvenil), XIV (básquet), XV (casa
    // amarilla), XVI (médico) y XVII (7 gerencias de estructura operativa) = $67.869,732365 M exacto.
    // otherExpenses = el resto de gastos operativos (no wages, no D&A, no transferencias de jugadores) =
    // Total de Gastos oficial ($202.744,841714 M, pág. 76) MENOS gastos de transferencias/rescisión/tanteo
    // (netos en profitOnPlayerSales) MENOS wages MENOS amortización de pases MENOS depreciación =
    // $71.553,845458 M. Verificado por chequeo cruzado independiente contra el anexo IX (fútbol
    // profesional): total del anexo menos sus propias líneas de wages y amortización da exactamente la
    // suma de sus 10 líneas de gastos varios (comisiones, viajes, indumentaria, etc.), confirma que no
    // hay doble conteo ni faltante.
    wages:-67869.732365, otherExpenses:-71553.845458, exceptionalItems:0,
    // playerAmortisation = Amortización jugadores profesionales (dentro de anexo IX, línea propia).
    // depreciation = Depreciaciones (anexo II, bienes de uso). El balance no reporta un "deterioro de
    // pases" ni "otras amortizaciones" separados (Nota 2.4 dice que no se detectó deterioro este ejercicio).
    playerAmortisation:-36573.123213, playerImpairment:0, depreciation:-7452.805787, otherAmortisation:0,
    // profitOnPlayerSales = resultado NETO de la actividad de pases, calculado (no aparece así en el
    // balance, que reporta ingresos y gastos de transferencias por separado): Ingresos por transferencias
    // ($36.487,756293 M) + Ingresos por rescisión onerosa de contrato ($48.226,871801 M) MENOS Gastos por
    // transferencia de jugadores ($19.266,303700 M) MENOS Derechos de tanteo ($29,031191 M) = $65.419,293203 M.
    // Incluye a Anselmino (100%, $26.764,724260 M), Langoni (100%, $8.625,663125 M) y las rescisiones de
    // Fernandez Carballo y Medina como las ventas/salidas más grandes del ejercicio (nota 3.5/3.7, pp.88/98).
    profitOnPlayerSales:65419.293203, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia (incluye RECPAM)" (pág. 76), una única línea
    // combinada por elección propia del club (Nota 2.4k): agrupa intereses, diferencias de cambio,
    // resultados por tenencia y RECPAM sin desglosar, el balance dice explícitamente que no permite
    // aislar el componente de intereses solo, así que se carga la línea combinada completa acá. tax = 0:
    // el balance no reporta una línea de impuesto a las ganancias separada (asociación civil).
    netInterest:711.737276, tax:0,
    // grossDebt = Total Deudas (corrientes + no corrientes, nota 6.1, balance pág. 75/104) = deuda
    // financiera real, sin incluir "Obligaciones de hacer" (ingresos diferidos, no es deuda) ni
    // Previsiones (litigios). cash = Caja y bancos (nota 5.1, pág. 75/101), no incluye "Inversiones"
    // (fondos comunes de inversión, $1.635,094825 M), que el balance reporta en una línea aparte.
    grossDebt:44566.207208, cash:12520.193181, gestion:'riquelme'},
    // Ejercicio 2027 = Presupuesto oficial 2026/27 (ver acordeón "Presupuesto 2026/27" en Finanzas). Real, no placeholder.
    // Guardado en ARS MILLONES EXACTOS (= pesos oficiales / 1.000.000), sin ninguna conversión al cargar el dato,
    // para que coincida centavo a centavo con el documento oficial. La conversión a USD se hace recién en
    // pantalla, al momento de mostrar, usando el promedio entre el dólar de inicio ($1.480) y cierre ($1.840)
    // del ejercicio = $1.660 (ver yearMeta/toDisplayValue).
    2027:{cuotasSociales:84600.271, comerciales:53477.864, exhibicionEspectaculos:43085.830, abonos:40639.558, diversos:12178.898, otrosDeportes:2118.967, basketProfesional:1656.377, futbolJuvenil:1489.046, futbolFemenino:145.293, wages:-72632.108, otherExpenses:-111846.180, exceptionalItems:0, playerAmortisation:-47726.249, playerImpairment:0, depreciation:-3785.324, otherAmortisation:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0, grossDebt:0, cash:0, gestion:'riquelme'},
  };


  // Desglose real de las líneas de Revenue, disponible para los ejercicios con documento oficial cargado
  // (2027 = Presupuesto oficial 2026/27; 2025 = Memoria y Balance auditado al 30/06/2025).
  // 2027: mismos valores de la tabla resumen de Ingresos del presupuesto oficial, convertidos a USD al promedio $1.660.
  // Desglose de Revenue para el Ejercicio 2027, en ARS MILLONES EXACTOS (idéntico a la tabla resumen del
  // presupuesto oficial, solo que expresado en millones en vez de pesos completos). Sin redondeos de conversión.
  const revenueBreakdown = {
    2027: {
      cuotasSociales: [
        ['Socios Activos', 32387.986], ['Adherente AMBA', 17308.922], ['Socios Interior', 11537.424], ['Adherente Interior', 7869.528],
        ['Socias Activas', 6368.302], ['Socios Menores', 5579.328], ['Socios Cadetes', 1474.486], ['Carnet Socios', 837.700],
        ['Seguro de Vida', 792.438], ['Socio Internacional', 365.029], ['Socios Exterior', 79.128],
      ],
      comerciales: [
        ['Sponsor Indumentaria', 18004.358], ['Sponsor Pecho Fútbol Masculino', 7772.255], ['Espalda Fútbol Masculino', 4212.604],
        ['Bocashop', 2865.507], ['Museo', 2453.545], ['Publicidad Estática Estadio', 2336.400], ['Manga Fútbol Masculino', 2123.153],
        ['Mastercard', 1685.042], ['BBVA - Branding', 1444.315], ['Licencias', 1356.072], ['Pantalón Fútbol Masculino', 1179.529],
        ['Sponsor Digital', 675.000], ['Otros', 2062.613], ['Canje Indumentaria', 2886.784], ['Canje Prepaga', 1714.414],
        ['Canje Baños Químicos/Módulos', 456.956], ['Canje Otros', 249.317],
      ],
      // Corregido en la Versión 30: el PDF SÍ desglosa Derechos de Televisión, Recaudaciones y
      // Premio como líneas separadas (ver Clubes/Argentina/Boca/presupuesto-26-27.md, pág. 12),
      // acá se había resumido de más al cargar el sitio, bundleando esas 3 líneas en un solo
      // subtotal por competencia (bug real, Guido lo notó comparando contra el PDF).
      exhibicionEspectaculos: [
        ['Torneo Oficial', 16807.870, [
          ['Derechos de Televisión', 9174.920], ['Recaudaciones', 5847.950], ['Premio por Campeonato', 1785.000],
        ]],
        ['Copa Argentina', 340.417, [
          ['Premio Por Avanzar de Ronda / Aceledador', 340.417],
        ]],
        ['Giras y Amistosos', 1575.064, [
          ['Amistosos', 1575.064],
        ]],
        ['Copa Libertadores', 24362.479, [
          ['Recaudaciones', 12260.266], ['Derechos de Televisión', 10062.951], ['Bonos', 2039.262],
        ]],
      ],
      abonos: [
        ['Plateas', 30570.629], ['Palcos VIP y corporativos', 8927.048], ['Cocheras', 1141.881],
      ],
      diversos: [
        ['Decreto 510/23', 11855.973], ['Intereses Ganados', 233.176], ['Departamento Médico', 89.749],
      ],
      otrosDeportes: [
        ['Deportes Amateurs', 998.748], ['Futsal', 644.019], ['Hockey', 476.200],
      ],
      basketProfesional: [
        ['Sponsors', 1385.307], ['Recaudaciones', 92.305], ['Champions League', 85.000], ['Televisión', 62.135], ['Aranceles', 31.630],
      ],
      futbolJuvenil: [
        ['Derechos de Solidaridad', 1489.046],
      ],
      futbolFemenino: [
        ['Participación Libertadores', 82.000], ['Derechos TV', 63.293],
      ],
    },
    // Desglose real de Revenue para el Ejercicio 2025 (Memoria y Balance auditado al 30/06/2025), en ARS
    // MILLONES EXACTOS. Fuente: anexos VI (pág. 126), VII (pág. 127) y VIII (pág. 128), y líneas sueltas
    // de la pág. 76 para diversos/otrosDeportes/basketProfesional. Cada lista suma exacto al total de
    // yearsRaw[2025] para esa categoría (ver comentario ahí con el detalle de la reclasificación).
    2025: {
      cuotasSociales: [
        ['Socios Activos', 23823.191813], ['Socios Adherentes', 15956.919899], ['Socios Interior/Exterior', 6771.857667],
        ['Socios Adherentes Interior', 6750.756240], ['Socios Menores', 3284.342620], ['Socios Cadetes', 949.025474],
      ],
      comerciales: [
        ['Adidas', 15452.450956], ['Betsson', 5204.370168], ['DirectTV', 2789.935205], ['Publicidad Estática', 1762.106530],
        ['Museos de Primera', 1221.015858], ['Avalian Cobertura Médica', 1159.364117], ['Ingresos por Licencias', 1109.075476],
        ['BBVA', 841.088331], ['Cetrogar', 761.768724], ['Pax Assistance', 698.573259], ['Regalías Productos Boca', 397.078008],
        ['Cabify', 348.904374], ['Electronic Arts Sponsors', 235.043431], ['Pepsi', 231.332757], ['Fag Sistems (Kanji)', 164.622192],
        ['Quilmes', 153.428820], ['Tropical Arg. SRL', 149.191124], ['Ingresos por Concesiones', 102.163232],
        ['Ingresos varios (comerciales)', 94.849538], ['Programa Goles Xeneize', 94.671205], ['Boca Shop', 75.439144],
        ['Tarjeta Xeneiza BBVA', 74.613604], ['Leiva Joyas', 70.360968], ['Algabo', 15.570026], ['FanXP Publicidad en pantallas', 10.693488],
      ],
      exhibicionEspectaculos: [
        ['Mundial de Clubes', 20133.562819], ['Televisación de partidos', 6891.367698],
        ['Campeonato Liga Profesional de Fútbol', 2621.877067], ['Copa Sudamericana', 2904.994695],
        ['Copa Libertadores', 1935.793380], ['Selección Nacional', 345.060888], ['Giras y amistosos', 271.440828],
        ['Copa Argentina', 237.009146],
      ],
      abonos: [
        ['Abonos a palcos, plateas y cocheras', 21072.986797],
      ],
      diversos: [
        ['Otras contribuciones de asociados', 853.226812], ['Mecanismo de solidaridad', 512.679940],
        ['Cesión de jugadores a préstamo', 375.211221], ['Ingresos varios', 3037.163188],
      ],
      otrosDeportes: [
        ['Departamento de educación física', 796.665345],
      ],
      basketProfesional: [
        ['Departamento de básquet', 157.094476],
      ],
      futbolJuvenil: [
        ['Sin ingresos propios reportados en el balance auditado (solo gastos, ver anexo XIII)', 0],
      ],
      futbolFemenino: [
        ['Sin ingresos propios reportados en el balance auditado (solo gastos, línea suelta pág. 76)', 0],
      ],
    },
  };


  // Desglose real de Gastos para el Ejercicio 2027 (Presupuesto oficial 2026/27), tal cual la tabla
  // resumen "GASTOS" del PDF del presupuesto (los mismos 11 rubros y montos que expenseSubBreakdown,
  // más abajo, suma en detalle). En ARS MILLONES EXACTOS, valores negativos (igual que el resto de las
  // filas de gastos).
  const expenseBreakdown = {
    2027: {
      expenses: [
        ['Fútbol Profesional', -120358.357], ['Administración', -36332.931], ['Organización de Espectáculos', -33730.855],
        ['Gastos Generales', -14386.410], ['Fútbol Juvenil', -7918.490], ['Otros Deportes', -6769.002],
        ['Basket', -6217.767], ['Otras Amortizaciones', -3785.324], ['Comerciales', -3250.608],
        ['Socios', -2393.117], ['Eventuales', -847.000],
      ],
    },
  };


  // Desglose real de Gastos para el Ejercicio 2027 (Presupuesto oficial 2026/27), con sub-items
  // reales por categoría, misma fuente y mismos totales que el (ex) acordeón "Apertura de Gastos"
  // (ver Versión 19 del historial). Formato recursivo [label, value, items?]: cada nodo puede tener
  // sub-items propios (así se preserva la jerarquía real de 3-4 niveles del presupuesto: categoría >
  // sub-gerencia/área > sub-grupo (ej. "Canjes", "Depto Medico") > línea de gasto). Los sub-grupos
  // sin total propio impreso en el documento (ej. "Canjes") llevan como value la SUMA de sus líneas.
  // En ARS MILLONES EXACTOS, todo negativo (mismo criterio que expenseBreakdown). Claves = mismo label
  // que usa expenseBreakdown[2027].expenses, para que nativeReportFor() pueda cruzarlas por nombre.
  const expenseSubBreakdown = {
    2027: {
      'Fútbol Profesional': [
      ['Gerencia de Fútbol Profesional', -68458.578, [
        ['Remuneraciones S.A.C. y C.S.', -3539.035],
        ['Remuneraciones Plantel, S.A.C. y Cs. Sociales', -8819.925],
        ['Remuneraciones Cuerpo Técnico y Utileria S.A.C. y Cs. Sociales', -2970.34],
        ['Agasajos, Buffet y Refrigerios', -168.972],
        ['Alquiler Vivienda', -129.97],
        ['Artículos de Deporte', -5.926],
        ['Gastos Alojamiento', -410.296],
        ['Gastos Pretemporada', -659.769],
        ['Honorarios', -26.5],
        ['Mantenimiento Campo de Juego', -86.184],
        ['Mantenimiento Inmueble y Muebles', -9.896],
        ['Obsequios', -8.179],
        ['Prima cuerpo tecnico', -2698.975],
        ['Prima Jugadores', -45538.138],
        ['Seguros', -13.475],
        ['Servicios y Abonos Varios', -20.32],
        ['Tasas y Sellados', -3.461],
        ['Telefonía', -1.264],
        ['Viajes y Viaticos', -776.325],
        ['Vigilancia', -388.043],
        ['Varios', -11.463],
        ['Depto Medico', -381.06, [
          ['Asistencia Médica, Exámenes Precompetitivos y Honorarios Médicos', -224.025],
          ['Farmacia y Articulos Ortopedicos', -157.035]
        ]],
        ['Canjes', -1791.062, [
          ['Indumentaria', -1444.687],
          ['Prepaga', -346.375]
        ]]
      ]],
      ['Futbol Femenino', -4173.53, [
        ['Remuneraciones S.A.C. y C.S.', -2080.043],
        ['Agasajos, Buffet y Refrigerios', -50.853],
        ['Alquiler Vivienda', -23.983],
        ['Honorarios', -187.089],
        ['Mantenimiento campo de juego', -129.12],
        ['Organización eventos', -36.332],
        ['Premios Jugadoras y Cuerpo Técnico', -374.837],
        ['Servicios y Abonos Varios', -2.217],
        ['Viajes y Movilidad', -247.458],
        ['Viáticos Jugadores', -39.575],
        ['Varios', -7.608],
        ['Departamento médico', -200.98, [
          ['Asistencia Médica, Exámenes Precompetitivos y Honorarios Médicos', -173.73],
          ['Farmacia y Articulos Ortopedicos', -27.25]
        ]],
        ['Canjes', -793.435, [
          ['Indumentaria', -535.135],
          ['Prepaga', -258.3]
        ]]
      ]],
      ['Amortización Plantel', -47726.249, [
        ['Amortizacion Plantel Futbol Profesional - Compras', -30565.146],
        ['Amortizacion Plantel Futbol Profesional - Inferiores', -17161.103]
      ]],
      ],
      'Administración': [
      ['Comisión Directiva', -1131.36, [
        ['Remuneraciones S.A.C. y C.S.', -591.97],
        ['Agasajos, Buffet y Refrigerios', -63.155],
        ['Donaciones', -45.685],
        ['Honorarios', -100.989],
        ['Obsequios', -44.401],
        ['Organización eventos', -108.72],
        ['Servicios y Abonos Varios', -63.692],
        ['Viajes y Viaticos', -92.678],
        ['Varios', -20.07]
      ]],
      ['Gerencia General', -515.256, [
        ['Remuneraciones S.A.C. y C.S.', -513.493],
        ['Agasajos, Buffet y Refrigerios', -0.2],
        ['Artículos de Librería', -0.267],
        ['Obsequios', -0.467],
        ['Telefonía', -0.15],
        ['Viaticos', -0.294],
        ['Varios', -0.385]
      ]],
      ['Gerencia de Legales', -806.873, [
        ['Remuneraciones S.A.C. y C.S.', -581.08],
        ['Artículos de Librería e Impresos', -0.506],
        ['Honorarios', -220.0],
        ['Servicios Varios', -1.921],
        ['Tasas y Sellados', -2.546],
        ['Viajes y Viaticos', -0.313],
        ['Varios', -0.507]
      ]],
      ['Gerencia de Administración y Finanzas', -1862.939, [
        ['Remuneraciones S.A.C. y C.S.', -1622.405],
        ['Artículos de Librería e Impresos', -13.796],
        ['Honorarios', -185.249],
        ['Servicios y Abonos Varios', -39.51],
        ['Tasas y Sellados', -0.501],
        ['Telefonía', -0.642],
        ['Varios', -0.836]
      ]],
      ['Planta Administrativa', -853.449, [
        ['Agasajos, Buffet y Refrigerios', -784.767],
        ['Alquiler de Equipos Varios', -44.848],
        ['Artículos de Librería', -0.469],
        ['Servicios y Abonos Varios', -1.897],
        ['Suscripciones', -7.419],
        ['Telefonía', -14.049]
      ]],
      ['Gerencia de Operaciones - Estadio', -11111.389, [
        ['Remuneraciones S.A.C. y C.S.', -8930.402],
        ['Alquiler de Equipos Varios', -338.942],
        ['Articulos de limpieza', -159.291],
        ['Atenciones al Personal', -3.872],
        ['Combustibles', -17.953],
        ['Honorarios', -141.235],
        ['Impuestos y Servicios publicos', -764.871],
        ['Mantenimiento Inmueble y Muebles', -363.853],
        ['Servicios y Abonos Varios', -182.57],
        ['Telefonía', -6.395],
        ['Viáticos', -30.908],
        ['Varios', -27.243],
        ['Canjes', -143.854, [
          ['Modulos', -74.473],
          ['Pintura', -69.381]
        ]]
      ]],
      ['Gerencia de Operaciones - Casa Amarilla', -2539.587, [
        ['Remuneraciones S.A.C. y C.S.', -2059.288],
        ['Alquiler de Equipos Varios', -3.71],
        ['Articulos de limpieza', -52.313],
        ['Atenciones al Personal', -2.341],
        ['Combustibles', -2.267],
        ['Honorarios', -4.984],
        ['Impuestos y Servicios publicos', -281.663],
        ['Mantenimiento Inmueble y Muebles', -91.113],
        ['Servicios y Abonos Varios', -34.197],
        ['Varios', -7.711]
      ]],
      ['Gerencia de Operaciones - Manzanas Casa Amarilla', -48.37, [
        ['Impuestos y Servicios publicos', -8.678],
        ['Mantenimiento Inmueble y Muebles', -18.4],
        ['Servicios y Abonos Varios', -18.905],
        ['Varios', -2.387]
      ]],
      ['Gerencia de Recursos Humanos', -2008.579, [
        ['Remuneraciones S.A.C. y C.S.', -888.453],
        ['Atenciones al Personal', -672.651],
        ['Capacitación', -58.716],
        ['Honorarios', -199.442],
        ['Servicios y Abonos varios', -14.36],
        ['Telefonía', -0.672],
        ['Uniformes Personal', -166.408],
        ['Viajes y Viaticos', -2.066],
        ['Varios', -5.811]
      ]],
      ['Gerencia de Sistemas', -4428.196, [
        ['Remuneraciones S.A.C. y C.S.', -2101.594],
        ['Honorarios', -16.226],
        ['Mantenimiento', -2300.878],
        ['Telefonía', -0.585],
        ['Viajes y Viaticos', -1.881],
        ['Varios', -7.032]
      ]],
      ['Gerencia de Seguridad', -4840.889, [
        ['Remuneraciones S.A.C. y C.S.', -666.795],
        ['Honorarios', -46.163],
        ['Mantenimiento', -71.273],
        ['Viajes y Viaticos', -3.861],
        ['Vigilancia', -4051.508],
        ['Varios', -1.289]
      ]],
      ['Gerencia de Abastecimiento', -828.044, [
        ['Remuneraciones S.A.C. y C.S.', -797.031],
        ['Artículos de Librería e Impresos', -0.336],
        ['Honorarios', -25.821],
        ['Mantenimiento', -0.707],
        ['Servicios y Abonos Varios', -0.615],
        ['Viajes y Viaticos', -3.134],
        ['Varios', -0.4]
      ]],
      ['Departamento de Indumentaria', -453.373, [
        ['Remuneraciones S.A.C. y C.S.', -449.519],
        ['Agasajos, Buffet y Refrigerios', -0.698],
        ['Artículos de Librería e Impresos', -0.205],
        ['Fletes y Acarreos', -0.188],
        ['Mantenimiento', -0.133],
        ['Telefonía', -0.305],
        ['Viáticos', -0.137],
        ['Varios', -2.188]
      ]],
      ['Departamento Médico', -3136.751, [
        ['Remuneraciones S.A.C. y C.S.', -2125.558],
        ['Farmacia e Insumos Medicos', -98.046],
        ['Honorarios', -827.269],
        ['Mantenimiento', -13.287],
        ['Obsequios', -2.267],
        ['Servicios y Abonos Varios', -36.784],
        ['Telefonía', -0.957],
        ['Varios', -32.583]
      ]],
      ['Departamento de Cultura', -454.174, [
        ['Remuneraciones S.A.C. y C.S.', -316.703],
        ['Alquiler de Equipos Varios', -0.482],
        ['Honorarios', -107.913],
        ['Obsequios', -1.396],
        ['Organización eventos', -18.5],
        ['Viajes y Viaticcos', -0.456],
        ['Varios', -8.724]
      ]],
      ['Departamento de Comunicación', -1257.96, [
        ['Remuneraciones S.A.C. y C.S.', -334.781],
        ['Alquiler de Equipos Varios', -144.98],
        ['Canal Boca', -186.636],
        ['Honorarios', -409.635],
        ['Impresos y Papeleria', -128.161],
        ['Servicios y Abonos Varios', -51.27],
        ['Telefonía', -0.576],
        ['Varios', -1.921]
      ]],
      ['Departamento de Relaciones Públicas', -55.742, [
        ['Remuneraciones S.A.C. y C.S.', -39.681],
        ['Agasajos, Buffet y Refrigerios', -0.485],
        ['Obsequios', -13.066],
        ['Organización eventos', -0.504],
        ['Servicios y Abonos Varios', -0.287],
        ['Viajes y Viaticos', -0.894],
        ['Varios', -0.825]
      ]],
      ],
      'Organización de Espectáculos': [
      ['Campeonato Liga Profesional', -18747.077, [
        ['Remuneraciones S.A.C. y C.S.', -332.038],
        ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -5981.378],
        ['Agasajos, Buffet y Refrigerios', -649.239],
        ['Alcanzabalones', -16.023],
        ['Alquiler de Equipos Varios', -585.152],
        ['Articulos de limpieza', -116.026],
        ['Enlace SIS y Mantenimiento', -84.651],
        ['Gastos AFA', -277.299],
        ['Gastos Concentración', -2123.633],
        ['Gastos Tickets', -33.971],
        ['Honorarios', -37.215],
        ['Mantenimiento', -394.782],
        ['Policía Adicional', -2668.276],
        ['Premios Grupales', -850.0],
        ['Sanción Disciplinaria', -165.217],
        ['Seguro espectador', -869.107],
        ['Servicios y Abonos Varios', -821.034],
        ['Viajes y Movilidad', -481.208],
        ['Vigilancia', -1942.734],
        ['Varios', -48.181],
        ['Canjes', -269.913, [
          ['Ambulancia', -11.173],
          ['Baños Quimicos', -128.819],
          ['Cable', -110.5],
          ['Carro', -19.421]
        ]]
      ]],
      ['Copa Argentina', -170.2, [
        ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -107.181],
        ['Alojamiento y Concentraciones', -44.015],
        ['Viajes y Movilidad', -15.462],
        ['Varios', -3.542]
      ]],
      ['Partidos Amistosos', -980.411, [
        ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -309.172],
        ['Organización de eventos', -624.645],
        ['Premios Grupales', -46.594]
      ]],
      ['Copa Libertadores', -13833.167, [
        ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -1891.842],
        ['Agasajos, Buffet y Refrigerios', -147.665],
        ['Alcanzabalones', -3.421],
        ['Alquiler Equipos y otros', -148.33],
        ['Articulos de limpieza', -42.363],
        ['Enlace SIS y Mantenimiento', -19.253],
        ['Gastos AFA', -1101.321],
        ['Gastos Concentración', -526.296],
        ['Gastos Ticket', -34.144],
        ['Honorarios', -17.535],
        ['Mantenimiento', -68.79],
        ['Policía Adicional', -606.879],
        ['Premios Grupales', -6879.011],
        ['Sanción Disciplinaria', -254.403],
        ['Seguro Espectador', -309.65],
        ['Servicios y Abonos Varios', -232.485],
        ['Viajes y Movilidad', -1038.931],
        ['Vigilancia', -441.86],
        ['Varios', -37.957],
        ['Canjes', -31.031, [
          ['Baños Quimicos', -31.031]
        ]]
      ]],
      ],
      'Gastos Generales': [
      ['Aportes a Fundacion Boca Social', -1252.398],
      ['Comisiones Tarjetas', -2051.732],
      ['Diversos', -2175.79],
      ['Gastos Bancarios', -2888.267],
      ['IVA', -3025.762],
      ['Mutual Jugadores 1%', -533.543],
      ['Previsión Indemnizaciones', -956.863],
      ['Previsión para Juicios', -735.121],
      ['Seguros Varios', -628.04],
      ['Sellos', -138.894],
      ],
      'Fútbol Juvenil': [
      ['Departamento de Futbol Juvenil', -22757.489, [
        ['Remuneraciones Cuerpo Técnico y Utileria S.A.C. y Cs. Sociales', -3500.422],
        ['Remuneraciones S.A.C. y C.S.', -8305.404],
        ['Agasajos, Buffet y Refrigerios', -3292.756],
        ['Alquiler de Equipos Varios', -238.641],
        ['Arbitros', -8.389],
        ['Artículos de Deporte', -25.507],
        ['Artículos de Librería', -2.499],
        ['Articulos de limpieza', -117.232],
        ['Combustibles', -59.274],
        ['Honorarios', -357.435],
        ['Impuestos y Servicios Publicos', -467.853],
        ['Inscripciones y Afiliaciones', -44.569],
        ['Mantenimiento Campo de Juego', -197.936],
        ['Mantenimiento Inmueble y Muebles', -562.779],
        ['Obsequios', -7.009],
        ['Policía Adicional', -31.514],
        ['Servicios y Abonos Varios', -290.644],
        ['Viajes y Movilidad', -1551.695],
        ['Viáticos', -19.972],
        ['Vigilancia', -1387.323],
        ['Varios', -39.417],
        ['Departamento médico', -690.3, [
          ['Asistencia Médica, Exámenes Precompetitivos y Honorarios Médicos', -585.138],
          ['Farmacia y Articulos Ortopedicos', -105.162]
        ]],
        ['Canjes', -1558.919, [
          ['Modulos', -222.633],
          ['Carro', -38.842],
          ['Indumentaria', -500.305],
          ['Prepaga', -797.139]
        ]]
      ]],
      ['Activación Futbol Juvenil', 14838.999],
      ],
      'Otros Deportes': [
      ['Vóley Masculino', -905.412, [
        ['Remuneraciones S.A.C y C.S.', -549.031],
        ['Afiliaciones e Inscripciones', -15.261],
        ['Alquiler instalaciones', -4.538],
        ['Alquiler Vivienda', -3.04],
        ['Artículos de Deporte', -5.736],
        ['Becas deportivas', -132.913],
        ['Comidas jugadores', -1.553],
        ['Honorarios profesionales', -18.375],
        ['Organización Eventos', -85.315],
        ['Servicios y Abonos varios', -1.048],
        ['Transferencias Jugadores', -4.246],
        ['Viajes y Movilidad', -79.194],
        ['Vigilancia', -3.92],
        ['Varios', -1.242]
      ]],
      ['Vóley Femenino', -1218.551, [
        ['Remuneraciones S.A.C y C.S.', -822.723],
        ['Afiliaciones e Inscripciones', -13.338],
        ['Alquiler Vivienda', -6.08],
        ['Artículos de Deporte', -4.702],
        ['Becas deportivas', -213.609],
        ['Comidas jugadores', -4.542],
        ['Honorarios profesionales', -13.475],
        ['Organización eventos', -41.492],
        ['Servicios y Abonos Varios', -2.29],
        ['Transferencias Jugadores', -4.246],
        ['Viajes y Movilidad', -89.33],
        ['Varios', -2.724]
      ]],
      ['Deportes Amateurs', -2458.931, [
        ['Remuneraciones S.A.C. y C.S.', -697.539],
        ['Remuneraciones Pileta', -380.28],
        ['Remuneraciones Colonia', -76.58],
        ['Remuneraciones S.A.C. y C.S. Administracion', -718.32],
        ['Colonia', -25.355],
        ['Honorarios profesionales', -114.539],
        ['Deportes Varios Administracion', -53.518],
        ['Organización eventos', -61.204],
        ['Obsequios', -0.937],
        ['Pileta', -60.5],
        ['Viajes y Movilidad', -3.154],
        ['Canjes', -267.005, [
          ['Indumentaria', -103.922],
          ['Prepaga', -163.083]
        ]]
      ]],
      ['Futsal Masculino', -1263.415, [
        ['Remuneraciones S.A.C y C.S.', -553.238],
        ['Alquiler Vivienda', -26.237],
        ['Artículos de Deporte', -13.211],
        ['Becas deportivas', -320.705],
        ['Comidas jugadores', -3.018],
        ['Honorarios profesionales', -161.774],
        ['Inscripción AFA', -22.298],
        ['Organización eventos', -77.551],
        ['Servicios y Abonos varios', -3.71],
        ['Transferencia Jugadores', -2.206],
        ['Viajes y Movilidad', -66.494],
        ['Vigilancia', -9.236],
        ['Varios', -3.737]
      ]],
      ['Futsal Femenino', -193.55, [
        ['Artículos de Deporte', -6.967],
        ['Becas deportivas', -76.368],
        ['Honorarios profesionales', -73.868],
        ['Inscripción AFA', -7.841],
        ['Organización Eventos', -18.526],
        ['Viajes y Movilidad', -8.39],
        ['Varios', -1.59]
      ]],
      ['Hockey Masculino', -45.789, [
        ['Afiliaciones e Inscripciones', -1.942],
        ['Agasajos, Buffet y Refrigerios', -4.107],
        ['Artículos de Deporte', -9.729],
        ['Honorarios profesionales', -20.184],
        ['Organización Eventos', -3.872],
        ['Viajes y Movilidad', -5.414],
        ['Varios', -0.541]
      ]],
      ['Hockey Femenino', -382.386, [
        ['Remuneraciones S.A.C y C.S.', -105.972],
        ['Afiliaciones e Inscripciones', -1.041],
        ['Agasajos, Buffet y Refrigerios', -25.676],
        ['Artículos de Deporte', -9.718],
        ['Honorarios profesionales', -193.244],
        ['Organización Eventos', -20.019],
        ['Viajes y Movilidad', -26.08],
        ['Varios', -0.636]
      ]],
      ['Handball Masculino', -113.941, [
        ['Afiliaciones e Inscripciones', -10.995],
        ['Alquiler Instalaciones', -4.538],
        ['Artículos de Deporte', -6.01],
        ['Honorarios profesionales', -58.744],
        ['Organización eventos', -25.867],
        ['Viajes y Movilidad', -6.775],
        ['Varios', -1.012]
      ]],
      ['Handball Femenino', -98.54, [
        ['Afiliaciones e Inscripciones', -4.613],
        ['Artículos de Deporte', -4.099],
        ['Honorarios profesionales', -58.141],
        ['Organización Eventos', -23.792],
        ['Viajes y Movilidad', -5.762],
        ['Varios', -2.133]
      ]],
      ['Futbol Inclusivo', -27.342, [
        ['Honorarios profesionales', -8.575],
        ['Artículos de Deporte', -2.313],
        ['Organización Eventos', -4.686],
        ['Viajes y Movilidad', -11.11],
        ['Varios', -0.658]
      ]],
      ['Futbol Playa Masculino', -45.758, [
        ['Afiliaciones e Inscripciones', -1.288],
        ['Honorarios profesionales', -26.95],
        ['Organización Eventos', -8.812],
        ['Viajes y Movilidad', -7.752],
        ['Varios', -0.956]
      ]],
      ['Futbol Playa Femenino', -15.387, [
        ['Honorarios profesionales', -3.662],
        ['Organización Eventos', -4.549],
        ['Viajes y Movilidad', -6.545],
        ['Varios', -0.631]
      ]],
      ],
      'Basket': [
      ['Basket Profesional', -5254.859, [
        ['Remuneraciones S.A.C. y C.S.', -946.639],
        ['Afiliaciones e Inscripciones', -31.908],
        ['Agasajos, Buffet y Refrigerios', -36.614],
        ['Alojamiento y Concentraciones', -233.395],
        ['Alquiler Vivienda', -210.867],
        ['Comisiones Varias', -230.487],
        ['Farmacia', -5.332],
        ['Gastos Transferencias Jugadores', -7.998],
        ['Honorarios', -56.311],
        ['Locación Servicios Plantel', -2304.868],
        ['Mantenimiento', -19.313],
        ['Organización eventos', -203.455],
        ['Policía Adicional', -9.407],
        ['Viajes y Movilidad', -487.375],
        ['Vigilancia', -3.374],
        ['Varios', -15.264],
        ['Canjes', -452.252, [
          ['Indumentaria', -302.735],
          ['Prepaga', -149.517]
        ]]
      ]],
      ['Basket Amateur', -962.908, [
        ['Remuneraciones S.A.C. y C.S.', -557.993],
        ['Agasajos, Buffet y Refrigerios', -16.794],
        ['Alquiler', -25.464],
        ['Becas', -81.037],
        ['Gastos de Transferencias de Jugadores', -5.504],
        ['Gastos Federativos', -33.214],
        ['Honorarios', -32.853],
        ['Organización eventos', -39.236],
        ['Servicios y Abonos Varios', -8.792],
        ['Viajes y Movilidad', -147.522],
        ['Varios', -14.499]
      ]],
      ],
      'Otras Amortizaciones': [
      ['Amortización Inmuebles', -1274.316],
      ['Amortización Instalaciones', -1054.825],
      ['Amortizaciones Varias', -1456.183],
      ],
      'Comerciales': [
      ['Remuneraciones S.A.C. y C.S.', -440.852],
      ['Agasajos, Buffet y Refrigerios', -3.925],
      ['Costo Bocashop', -2550.301],
      ['Honorarios', -199.98],
      ['Obsequios', -18.211],
      ['Servicios Varios', -31.261],
      ['Viajes y Movilidad', -3.162],
      ['Varios', -2.916],
      ],
      'Socios': [
      ['Centro de Atención al Socio', -1903.136, [
        ['Remuneraciones S.A.C. y C.S.', -1137.571],
        ['Credenciales', -24.268],
        ['Honorarios', -182.717],
        ['Obsequios', -14.0],
        ['Organización eventos', -20.0],
        ['Servicios y Abonos Varios', -516.745],
        ['Varios', -7.835]
      ]],
      ['Interior y Exterior', -274.451, [
        ['Remuneraciones S.A.C. y C.S.', -71.217],
        ['Agasajos, Buffet y Refrigerios', -27.673],
        ['Honorarios', -50.82],
        ['Obsequios', -33.451],
        ['Organización eventos', -37.733],
        ['Viajes y Viaticos', -51.501],
        ['Varios', -2.056]
      ]],
      ['Vitalicios', -115.626, [
        ['Remuneraciones S.A.C. y C.S.', -73.984],
        ['Agasajos, Buffet y Refrigerios', -3.499],
        ['Obsequios', -23.094],
        ['Organización de eventos', -14.557],
        ['Varios', -0.492]
      ]],
      ['Filiales', -25.474, [
        ['Agasajos, Buffet y Refrigerios', -12.469],
        ['Honorarios', -1.087],
        ['Obsequios', -7.21],
        ['Organización eventos', -2.436],
        ['Varios', -2.272]
      ]],
      ['Inclusión e Igualdad', -74.43, [
        ['Remuneraciones S.A.C. y C.S.', -39.681],
        ['Agasajos, Buffet y Refrigerios', -1.277],
        ['Capacitaciones', -13.98],
        ['Honorarios', -9.603],
        ['Obsequios', -2.497],
        ['Viajes y Movilidad', -5.078],
        ['Varios', -2.314]
      ]],
      ],
    },
  };



  // ---------- FREE TIER: DATOS "TAL CUAL LOS MUESTRA EL CLUB" (sin normalizar a 9 categorías) ----------
  // El Ejercicio 2025 (balance auditado) usa una estructura de categorías genuinamente distinta a la
  // del Presupuesto 2027 (11 líneas de Revenue en vez de 9, 17 de Gastos en vez de 11, sin el mismo
  // agrupamiento, ver Versión 13 del historial más abajo). En vez de forzarlo a las 9 categorías de
  // siempre (lo que se hizo en un primer intento y después se revirtió), esto guarda la estructura
  // REAL del documento, en el mismo orden en que aparece en la página 76, para mostrarla tal cual,
  // acordeones para las categorías que el balance sí desglosa en anexo, línea simple para las que no.
  // Todo en ARS MILLONES EXACTOS, mismo criterio que yearsRaw. Cada número getSourceValue-cruzado:
  // la suma de items de cada categoría da EXACTO el valor de la categoría, y la suma de las 11
  // categorías de Ingresos da EXACTO el Total de Recursos ($237.614,566642 M, pág. 76); la suma de
  // las 17 de Gastos da $202.744,841744 M, con un desvío de $30 pesos contra el "Total de Gastos"
  // impreso ($202.744,841714 M) que viene del propio documento (ver nota en el anexo XIII, más abajo
  // en yearsRaw[2025]), no es un error de carga.
  const nativeFinancialsBoca = {
    2025: {
      resultLabel: 'Superávit del ejercicio',
      ingresos: [
        { label:'Ingresos por transferencias de jugadores', value:36487.756293, items:[
          ['Anselmino, Aaron (100%)', 26764.724260], ['Langoni, Luca (100%)', 8625.663125], ['Retegui, Mateo', 702.928645],
          ['Varela, Alan', 188.673286], ['Valdez, Bruno (10%)', 153.190546], ['Bentancour, Rodrigo', 52.576430],
        ]},
        { label:'Exhibiciones y espectáculos de fútbol', value:56414.093318, items:[
          ['Mundial de Clubes', 20133.562819], ['Abonos a palcos, plateas y cocheras', 21072.986797], ['Televisación de partidos', 6891.367698],
          ['Campeonato Liga Profesional de Fútbol', 2621.877067], ['Copa Sudamericana', 2904.994695], ['Copa Libertadores', 1935.793380],
          ['Selección Nacional', 345.060888], ['Giras y amistosos', 271.440828], ['Copa Argentina', 237.009146],
        ]},
        { label:'Publicidad, concesiones y licencias', value:33217.710535, items:[
          ['Adidas', 15452.450956], ['Betsson', 5204.370168], ['DirectTV', 2789.935205], ['Publicidad Estática', 1762.106530],
          ['Museos de Primera', 1221.015858], ['Avalian Cobertura Médica', 1159.364117], ['Ingresos por Licencias', 1109.075476],
          ['BBVA', 841.088331], ['Cetrogar', 761.768724], ['Pax Assistance', 698.573259], ['Regalías Productos Boca', 397.078008],
          ['Cabify', 348.904374], ['Electronic Arts Sponsors', 235.043431], ['Pepsi', 231.332757], ['Fag Sistems (Kanji)', 164.622192],
          ['Quilmes', 153.428820], ['Tropical Arg. SRL', 149.191124], ['Ingresos por Concesiones', 102.163232],
          ['Ingresos varios (comerciales)', 94.849538], ['Programa Goles Xeneize', 94.671205], ['Boca Shop', 75.439144],
          ['Tarjeta Xeneiza BBVA', 74.613604], ['Leiva Joyas', 70.360968], ['Algabo', 15.570026], ['FanXP Publicidad en pantallas', 10.693488],
        ]},
        { label:'Cuotas sociales', value:57536.093713, items:[
          ['Socios Activos', 23823.191813], ['Socios Adherentes', 15956.919899], ['Socios Interior/Exterior', 6771.857667],
          ['Socios Adherentes Interior', 6750.756240], ['Socios Menores', 3284.342620], ['Socios Cadetes', 949.025474],
        ]},
        { label:'Ingresos por rescisión onerosa de contrato', value:48226.871801, items:[
          ['Fernandez Carballo, Ezequiel (100%)', 27722.982880], ['Medina, Cristian (100%)', 20503.888921],
        ]},
        { label:'Otras contribuciones de asociados', value:853.226812, items:null },
        { label:'Mecanismo de solidaridad', value:512.679940, items:null },
        { label:'Departamento de básquet', value:157.094476, items:null },
        { label:'Cesión de jugadores a préstamo', value:375.211221, items:null },
        { label:'Departamento de educación física', value:796.665345, items:null },
        { label:'Ingresos varios', value:3037.163188, items:null },
      ],
      gastos: [
        { label:'Gastos por transferencia de jugadores', value:-19266.303700, items:null },
        { label:'Incorporación de jugadores a préstamo', value:0, items:null },
        { label:'Derechos de tanteo', value:-29.031191, items:null },
        { label:'Fútbol profesional', value:-88827.381030, items:[
          ['Remuneraciones plantel profesional, primas', -44390.524043], ['Amortización jugadores profesionales', -36573.123213],
          ['Remuneraciones personal administrativo', -2061.708176], ['Comisiones', -1320.144785], ['Gastos de viajes y hospedajes', -1274.065256],
          ['Artículos de deporte e indumentaria', -830.144990], ['Farmacia y asistencia médica', -809.448017], ['Gastos diversos', -582.250067],
          ['Gastos pretemporada', -334.357845], ['Vigilancia', -297.692805], ['Gastos Área internacional', -176.730477],
          ['Mantenimiento de campo de juego', -131.723707], ['Agasajos y comidas', -45.467649],
        ]},
        { label:'Organización de espectáculos', value:-22838.693201, items:[
          ['Campeonato Oficial', -12625.224419], ['Mundial de Clubes', -6355.467331], ['Copa Sudamericana', -1864.921002],
          ['Copa Libertadores', -1489.465135], ['Festejo día del hincha', -241.727871], ['Selección Nacional', -184.421360],
          ['Copa Argentina', -77.466083],
        ]},
        { label:'Estadio', value:-8127.685943, items:[
          ['Remuneraciones y cargas sociales', -5543.366571], ['Servicios públicos', -623.866711], ['Conservación de muebles e inmuebles', -498.969090],
          ['Alquileres/ABL/impuestos municipales', -424.718410], ['Honorarios', -289.376079], ['Materiales y elementos de limpieza', -293.446972],
          ['Agasajos, buffet y refrigerios', -188.842220], ['Gastos diversos', -164.938647], ['Convenios de Canje', -100.161244],
        ]},
        { label:'Departamento de educación física', value:-4455.910015, items:[
          ['Gastos administrativos', -387.961986], ['Vóley femenino y masculino', -1017.068179], ['Deportes varios', -1317.917137],
          ['Fútbol 5', -923.246913], ['Básquet amateur', -809.715800],
        ]},
        { label:'Fútbol juvenil', value:-5402.782255, items:[
          ['Remuneraciones y cargas sociales', -3358.856303], ['Agasajos, buffet y refrigerios', -877.944935],
          ['Mantenimiento de campo de juego', -95.068751], ['Vigilancia', -397.034004], ['Gastos diversos', -186.754866], ['Viajes', -487.123366],
        ]},
        { label:'Departamento de básquet', value:-3595.217256, items:[
          ['Locación de servicios plantel', -1581.323934], ['Gastos de concentración y viajes', -623.998792],
          ['Remuneraciones y cargas sociales', -550.578435], ['Gastos de alquiler de equipos', -277.743279], ['Gastos diversos', -184.763446],
          ['Gastos de vivienda', -166.888913], ['Gastos de organización de espectáculos', -134.711447], ['Artículos de deporte', -58.872060],
          ['Afiliación e inscripciones', -16.336950],
        ]},
        { label:'Casa Amarilla', value:-2498.903054, items:[
          ['Remuneraciones y cargas sociales', -1723.314898], ['Servicios públicos', -313.395811], ['Agasajos, buffet y refrigerios', -124.964843],
          ['Conservación de muebles e inmuebles', -119.172247], ['Servicios de vigilancia y limpieza', -122.082198],
          ['Parque Social y Deportivo Casa Amarilla', -61.945654], ['Gastos diversos', -29.140162], ['Honorarios', -4.887241],
        ]},
        { label:'Departamento médico', value:-2182.855291, items:[
          ['Remuneraciones y cargas sociales', -1249.597409], ['Honorarios', -754.340520], ['Mantenimiento y soporte', -58.886208],
          ['Gastos diversos', -120.031154],
        ]},
        { label:'Departamento de cultura', value:-354.949396, items:null },
        { label:'Fútbol femenino', value:-1988.118211, items:null },
        { label:'Impuestos y tasas', value:-7080.513561, items:null },
        { label:'Gastos de estructura operativa', value:-16668.591802, items:[
          ['Gastos Comisión Directiva', -1062.124161], ['Gastos Gerencia General', -577.479535], ['Gastos Gerencia de Prensa', -542.717730],
          ['Gastos Gerencia de Recursos Humanos', -1246.238652], ['Gastos Gerencia de Seguridad', -3982.296488],
          ['Gastos Gerencia de Abastecimiento y Operaciones', -831.527648], ['Gastos Gerencia de Administración y Finanzas', -1208.136149],
          ['Gastos Gerencia de Sistemas', -2614.094286], ['Gastos Gerencia de Legales', -551.334343], ['Gastos Gerencia de Marketing', -683.252595],
          ['Gastos Centro de Atención al Socio', -3369.390215],
        ]},
        { label:'Gastos generales', value:-11975.100051, items:[
          ['Indemnizaciones, juicios y contingencias', -4938.388945], ['Cargo por créditos irrecuperables', -4614.875990],
          ['Donaciones', -846.065631], ['Comisiones y gastos bancarios', -811.583347], ['Seguros', -615.119216],
          ['Gratificaciones', -109.316586], ['Gastos diversos', -39.750336],
        ]},
        { label:'Depreciaciones', value:-7452.805787, items:null },
      ],
      // Filas planas después del subtotal de Gastos, en el mismo orden y con la misma etiqueta que
      // usa el balance en la página 76, no son "gastos" ni "ingresos", son resultado financiero.
      extraRows: [
        { label:'Resultados financieros y por tenencia (incluye RECPAM)', value:711.737276 },
      ],
    },
  };


  // Versión 81: ameal/angelici se sacaron de acá (quedaban 100% dentro del rango de años
  // placeholder que se removió de yearsRaw arriba, "Por gestión" de Finanzas no tenía ningún dato
  // real que mostrar para ninguna de las 2). OJO: esto es SOLO el selector "Por gestión" de
  // Finanzas — `gestionesByClub.boca` (data/clubs.js), que alimenta Mercado de Pases/Resultados/
  // Comparar Gestiones/Inicio, sigue teniendo las 3 gestiones sin tocar, esos otros tabs no
  // dependen de yearsRaw y el pedido de Guido fue explícito "de Finanzas".
  const gestionesInfo = {
    riquelme:{nombre:'Riquelme (2023-actual)', firstYear:2024, lastYear:2027},
  };


  const pasesData = [
    {gestion:'riquelme', anio:2025, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador A', movimiento:'Venta', monto:18.5},
    {gestion:'riquelme', anio:2025, ventana:'Verano', tipo:'Jugador', nombre:'Jugador B', movimiento:'Compra', monto:-14.0},
    {gestion:'riquelme', anio:2024, ventana:'Verano', tipo:'Jugador', nombre:'Jugador C', movimiento:'Venta', monto:12.0},
    {gestion:'riquelme', anio:2024, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador D', movimiento:'Compra', monto:-9.5},
    {gestion:'riquelme', anio:2023, ventana:'Verano', tipo:'DT', nombre:'DT entrante (Riquelme)', movimiento:'Contratación', monto:0},
    {gestion:'ameal', anio:2023, ventana:'Invierno', tipo:'DT', nombre:'DT saliente (Ameal)', movimiento:'Salida', monto:0},
    {gestion:'ameal', anio:2022, ventana:'Verano', tipo:'Jugador', nombre:'Jugador E', movimiento:'Compra', monto:-16.0},
    {gestion:'ameal', anio:2022, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador F', movimiento:'Compra', monto:-11.5},
    {gestion:'ameal', anio:2021, ventana:'Verano', tipo:'Jugador', nombre:'Jugador G', movimiento:'Venta', monto:9.0},
    {gestion:'ameal', anio:2023, ventana:'Verano', tipo:'Jugador', nombre:'Jugador H', movimiento:'Venta', monto:8.5},
    {gestion:'ameal', anio:2021, ventana:'Invierno', tipo:'DT', nombre:'DT entrante (Ameal)', movimiento:'Contratación', monto:0},
    {gestion:'angelici', anio:2019, ventana:'Verano', tipo:'Jugador', nombre:'Jugador I', movimiento:'Venta', monto:22.0},
    {gestion:'angelici', anio:2018, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador J', movimiento:'Venta', monto:11.5},
    {gestion:'angelici', anio:2018, ventana:'Verano', tipo:'Jugador', nombre:'Jugador K', movimiento:'Compra', monto:-8.0},
    {gestion:'angelici', anio:2019, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador L', movimiento:'Compra', monto:-10.5},
    {gestion:'angelici', anio:2018, ventana:'Verano', tipo:'DT', nombre:'DT entrante (Angelici)', movimiento:'Contratación', monto:0},
  ];


  // Fuente: cobertura de Infobae, La Nación y Wikipedia sobre cada gestión (agosto 2026).
  // Verificar contra el sitio oficial del club antes de publicar.
  const resultadosData = {
    angelici:{titulosLocales:6, titulosInternacionales:0, mejorResultadoLibertadores:'Finalista (2012 y 2018)'},
    ameal:{titulosLocales:6, titulosInternacionales:0, mejorResultadoLibertadores:'Semifinalista (2020)'},
    riquelme:{titulosLocales:0, titulosInternacionales:0, mejorResultadoLibertadores:'Eliminado en fase preliminar (2025), primera vez en 19 participaciones consecutivas'},
  };


  const titulosData = [
    {anio:2012, competencia:'Copa Argentina', resultado:'Campeón', gestion:'angelici'},
    {anio:2015, competencia:'Campeonato de Primera División', resultado:'Campeón', gestion:'angelici'},
    {anio:2015, competencia:'Copa Argentina', resultado:'Campeón', gestion:'angelici'},
    {anio:2017, competencia:'Primera División 2016/17', resultado:'Campeón', gestion:'angelici'},
    {anio:2018, competencia:'Primera División 2017/18', resultado:'Campeón', gestion:'angelici'},
    {anio:2018, competencia:'Supercopa Argentina', resultado:'Campeón', gestion:'angelici'},
    {anio:2020, competencia:'Superliga 2019/20', resultado:'Campeón', gestion:'ameal'},
    {anio:2020, competencia:'Copa de la Liga Profesional', resultado:'Campeón', gestion:'ameal'},
    {anio:2020, competencia:'Copa Argentina 2019/20', resultado:'Campeón', gestion:'ameal'},
    {anio:2022, competencia:'Copa de la Liga Profesional', resultado:'Campeón', gestion:'ameal'},
    {anio:2022, competencia:'Primera División', resultado:'Campeón', gestion:'ameal'},
    {anio:2023, competencia:'Supercopa Argentina', resultado:'Campeón', gestion:'ameal'},
  ];


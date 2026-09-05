// ============================================================================
// js/finanzas-calc.js — capa de CÁLCULO de Finanzas: a partir de los datos
// crudos (data/boca-data.js para Boca; data/river-data.js/racing-data.js
// para el motor genérico), calcula revenue/ebitda/PAT, reclasifica a
// "Formato simplificado", convierte de moneda (yearMetaFor/toDisplayValue),
// etc. NINGUNA función de este archivo toca el DOM ni arma HTML — eso vive
// en js/finanzas-render.js. Todo lo de acá es reusable/testeable
// independiente de cómo se pinte en pantalla.
//
// Extraído de index.html (Versión 51, limpieza de arquitectura antes de
// seguir agregando clubes), mismo código exacto, sin cambiar comportamiento.
//
// Orden de carga: después de clubs.js/category-map.js/boca-data.js/
// river-data.js/racing-data.js (lee esas constantes por nombre), antes de
// js/finanzas-render.js (que llama a estas funciones) y del <script>
// principal de index.html.
// ============================================================================


  // yearMeta: en qué moneda está guardado cada ejercicio en yearsRaw, y con qué tipo de cambio convertirlo.
  // Todos los ejercicios placeholder están en USD (con el FX_RATE global placeholder para pasar a ARS).
  // El Ejercicio 2027 está en ARS reales, con su propio tipo de cambio promedio ($1.660).
  // El Ejercicio 2025 también está en ARS reales (balance auditado), con el tipo de cambio de CIERRE
  // del ejercicio ($1.203, dólar mayorista BCRA al 30/06/2025, ver Rava Bursátil), no un promedio:
  // el balance está en "moneda homogénea" (Nota 2.2, RT 6/17), es decir ya reexpresado a poder
  // adquisitivo del 30/06/2025, así que corresponde convertir con el tipo de cambio de ESE día puntual,
  // no con un promedio del ejercicio (que mezclaría poder adquisitivo de fechas distintas).
  function yearMeta(year){
    if(year === 2027) return {currency:'ARS', fx:1660};
    if(year === 2025) return {currency:'ARS', fx:1203};
    return {currency:'USD', fx:FX_RATE};
  }


  // Único lugar que decide si un ejercicio de Boca es dato real (presupuesto u balance oficial) o
  // placeholder inventado, usado tanto por el banner de calidad de dato como por drawTrendChart,
  // para que nunca queden desincronizados sobre qué año es "real".
  function bocaYearIsReal(year){
    return year === 2027 || year === 2025;
  }


  // yearMetaFor(clubId, year): igual que yearMeta(year) pero para CUALQUIER club (Versión 32,
  // antes solo existía para Boca, River/Racing estaban hardcodeados a "siempre USD, sin toggle").
  // Boca sigue delegando a yearMeta() sin tocar (ya verificado). Para River/Racing lee
  // currency/fx directo de riverFiscalYearMeta[year]/racingFiscalYearMeta[year] (ver esos archivos
  // en data/): los ejercicios con documento propio re-extraído (Racing 2024 en adelante, River
  // 2024) tienen currency:'ARS' con el fx que el propio balance/presupuesto declara; los que no se
  // re-extrajeron (Racing 2009-2011, placeholders de River) quedan en currency:'USD' con un fx
  // (documentado o null). Si fx viene null (placeholders sin ningún tipo de cambio propio, ej.
  // River 2025/2021), se usa FX_RATE (el mismo placeholder global que ya usan los ejercicios
  // placeholder de Boca) para que el toggle igual funcione, aunque sea con un número aproximado.
  function yearMetaFor(clubId, year){
    if(clubId === 'boca') return yearMeta(year);
    const table = clubId === 'river' ? riverFiscalYearMeta : racingFiscalYearMeta;
    const m = (table && table[year]) || {};
    return { currency: m.currency || 'USD', fx: (m.fx != null ? m.fx : FX_RATE) };
  }


  // Convierte un valor que está en la moneda nativa de "meta" (ARS millones o USD millones) a la moneda
  // pedida para mostrar en pantalla (targetCurrency). Nunca convierte ARS->ARS ni USD->USD, así que el
  // Ejercicio 2027 en modo ARS siempre coincide exacto con el documento oficial.
  function toDisplayValue(value, meta, targetCurrency){
    if(meta.currency === targetCurrency) return targetCurrency === 'ARS' ? value/1000 : value;
    if(meta.currency === 'ARS' && targetCurrency === 'USD') return value / meta.fx;
    if(meta.currency === 'USD' && targetCurrency === 'ARS') return value * meta.fx / 1000;
    return value;
  }


  // ---------- HELPERS ----------
  // Todos los "ejercicios" de estos clubes corren de mitad de un año calendario a mitad del
  // siguiente (Boca/Racing: julio a junio; River: septiembre a agosto) y se identifican por el año
  // en que TERMINAN, por eso year=2027 es el ejercicio 2026/2027, no el año calendario 2027. Los
  // hinchas de fútbol están acostumbrados a leer el rango completo (como en la tabla de posiciones),
  // así que en toda la UI se muestra "Ejercicio AAAA/AAAA" en vez del año suelto.
  // REGLA (Versión 50, pedido de Guido: el "(presupuestado)" pegado al final se superponía con el
  // header "% DEL TOTAL" de al lado en la tabla "Estado de resultados", dificultando la lectura).
  // Antes `ejercicioLabel(year, '(presupuestado)')` agregaba el sufijo AL FINAL de "Ejercicio
  // AAAA/AAAA", alargando el texto. Ahora, para un presupuesto, se cambia directamente el PREFIJO
  // ("Presupuesto" en vez de "Ejercicio") y no se agrega nada más: "Presupuesto 2026/2027" en vez
  // de "Ejercicio 2026/2027 (presupuestado)", más corto y sin perder el significado.
  function ejercicioLabel(year, isPresupuesto){
    return (isPresupuesto ? 'Presupuesto ' : 'Ejercicio ')+(year-1)+'/'+year;
  }

  function computeYear(year){
    const r = yearsRaw[year];
    const revenue = (r.cuotasSociales||0) + (r.comerciales||0) + (r.exhibicionEspectaculos||0) + (r.abonos||0) + (r.diversos||0) + (r.otrosDeportes||0) + (r.basketProfesional||0) + (r.futbolJuvenil||0) + (r.futbolFemenino||0);
    const expenses = r.wages + r.otherExpenses;
    const ebitda = revenue + expenses;
    const nonCash = r.playerAmortisation + r.playerImpairment + r.depreciation + r.otherAmortisation;
    const operatingProfit = ebitda + r.exceptionalItems + nonCash;
    const ebit = operatingProfit + r.profitOnPlayerSales + r.assetSales;
    const pbt = ebit + r.netInterest;
    const pat = pbt + r.tax;
    const wagesToTurnover = revenue !== 0 ? (-r.wages / revenue) : 0;
    const netDebt = r.grossDebt - r.cash;
    const yearLabel = year === 2027 ? ejercicioLabel(2027, true) : ejercicioLabel(year);
    return Object.assign({}, r, {year, yearLabel, revenue, expenses, ebitda, nonCash, operatingProfit, ebit, pbt, pat, wagesToTurnover, netDebt});
  }


  // Formatea un valor que YA está en la moneda que se va a mostrar (ver toDisplayValue). No convierte nada.
  function fmtDisplay(v){
    const abs = Math.abs(v).toFixed(1);
    return v < 0 ? `<span class="neg-num">(${abs})</span>` : abs;
  }

  function fmtPctDisplay(growth, prevDisp){
    if(!prevDisp) return '—';
    const pct = (growth / Math.abs(prevDisp)) * 100;
    return pct < 0 ? `<span class="neg-num">(${Math.abs(pct).toFixed(0)}%)</span>` : pct.toFixed(0)+'%';
  }

  // % que representa una fila (o sub-ítem) sobre el total de SU sección (Total Ingresos o Total
  // Gastos, no el total general), mismo criterio que un "common-size statement". El signo del
  // cociente se cancela solo: en Gastos, fila y total son negativos, así que el resultado da
  // positivo igual (ej. -43.8 / -142.2 = +31%, "los salarios son el 31% de los gastos").
  function fmtPctOfTotal(val, total){
    if(!total) return '—';
    const pct = (val / total) * 100;
    const rounded = Math.round(pct);
    return rounded < 0 ? `<span class="neg-num">(${Math.abs(rounded)}%)</span>` : rounded+'%';
  }

  function plUnitLabel(currency){
    return currency === 'ARS' ? 'Cifras en miles de millones de ARS (estimado, cotización de referencia placeholder)' : 'Cifras en millones de USD (estimado)';
  }

  // fmtAmount/fmtAmountPlain esperan un valor YA convertido a la moneda que se va a mostrar. No convierten:
  // solo agregan signo y unidad. Para valores ligados a un ejercicio (yearsRaw), convertir antes con
  // toDisplayValue(valor, yearMeta(year), currency). Para valores que siempre están en USD (pases,
  // net spend), pasar directamente con currency='USD'.
  function fmtAmount(value, currency){
    const unit = currency === 'ARS' ? 'mil M ARS' : 'M USD';
    const sign = value > 0 ? '+' : (value < 0 ? '-' : '');
    return `${sign}${Math.abs(value).toFixed(1)} ${unit}`;
  }

  function fmtAmountPlain(value, currency){
    const unit = currency === 'ARS' ? 'mil M ARS' : 'M USD';
    return `${value < 0 ? '-' : ''}${Math.abs(value).toFixed(1)} ${unit}`;
  }


  // ---------- TABLA "TAL CUAL LA MUESTRA EL CLUB" (free tier) ----------
  // Hasta acá, Boca mostraba sus 9 categorías de siempre y después un P&L completo estilo
  // SwissRamble (EBITDA, Resultado Operativo, EBIT...). Eso fuerza a un balance auditado (11
  // categorías de Revenue, 17 de Gastos, agrupadas distinto que el Presupuesto) a encajar en una
  // forma que no es la suya. Ahora el free tier muestra la estructura REAL de cada club/ejercicio,
  // tal cual la reportó, acordeones para lo que la fuente sí desglosa, fila simple para lo que no,
  // subtotales y un resultado final para que se pueda leer sin tener que sumar a mano. Nada de
  // categorías compartidas entre clubes ni entre ejercicios: si Boca 2025 y Boca 2027 muestran
  // rubros distintos, o Racing junta en 2 lo que Boca separa en 11, ESO es justamente el punto (ver
  // el botón "Premium" al lado del toggle de moneda), no se fuerza a que cierren entre sí.
  // computeYear/computeYearGeneric (KPIs, gráficos, verifyTieOuts) no se tocaron: esto solo cambia
  // qué se pinta en la tabla "Estado de resultados".

  // "Formato simplificado" de Boca: reclasifica los MISMOS números ya verificados de yearsRaw[year]
  // (ni un peso nuevo, ni un cálculo nuevo, son los mismos campos que ya alimentan computeYear/PAT)
  // a un puñado de categorías uniformes, pensadas para poder comparar entre ejercicios (y a futuro,
  // entre clubes) sin tener que leer la jerga contable propia de cada balance/presupuesto. Reemplaza
  // a nativeReportFor() SOLO cuando el toggle "Formato simplificado" está activo: "Formato del
  // club" (default) sigue mostrando cada categoría tal cual la reportó el club, sin tocar.
  //
  // Por qué "salarios de jugadores" vs. "cuerpo técnico" vs. "primas" quedaron juntos (pedido
  // original de Guido, no resuelto del todo): Boca no las desglosa así en NINGÚN documento excepto
  // el Presupuesto 2026/27, que SÍ tiene el desglose interno línea por línea para ESE ejercicio
  // puntual (ver Clubes/Argentina/Boca/presupuesto-26-27.md, pág. 15. Remuneraciones Plantel
  // 8.819,925 M, Remuneraciones Cuerpo Técnico 2.970,340 M, Prima Jugadores 45.538,138 M, Prima
  // cuerpo técnico 2.698,975 M), pero NINGÚN otro ejercicio tiene ese mismo nivel de detalle.
  // Separarlas de verdad para TODOS los ejercicios por igual exigiría inventar una proporción para
  // los años sin ese desglose, se prefirió una sola categoría "Salarios y primas" consistente en
  // todos los ejercicios, antes que una más desglosada solo para uno y aproximada para el resto.
  //
  // CORRECCIÓN (Versión 30): la Versión 29 decía acá que Boca "fusiona" Televisión y Premios dentro
  // de Exhibición de Espectáculos sin desglosarlos. ESO ERA FALSO. El Presupuesto 2026/27 SÍ separa
  // Derechos de Televisión, Recaudaciones y Premio como líneas propias (pág. 12 del PDF), lo que
  // pasó es que se había resumido de más al cargar `revenueBreakdown[2027]` (bug de proceso, no del
  // club: se saltó el paso de transcribir el PDF completo ANTES de extraer datos, ver CLAUDE.md).
  // Guido lo notó comparando contra el PDF y pidió re-extraer palabra por palabra, ver
  // presupuesto-26-27.md. Para el Ejercicio 2027 (el único con este desglose completo hoy),
  // Televisión y Premios quedan como categorías propias; el resto de los ejercicios sigue con
  // "Estadio" bundled, porque no tienen ese mismo nivel de detalle disponible.
  //
  // Verificado a mano contra verifyTieOuts(): Ingresos 2027 suma exacto $239.392,104 M (el total
  // oficial), y el Resultado 2025 (ingresos+gastos+extraRows) da exacto $35.581,462204 M (el
  // Superávit del ejercicio oficial), no se pierde ni se duplica ningún peso al reclasificar.
  // ACORDEÓN DE CONTROL (Versión 40, pedido explícito de Guido: "es mi manera de hacerte un
  // control"): cada fila de Formato Simplificado lleva `items`, igual que ya hacía "Formato del
  // club", así se puede abrir la flecha de cualquier fila y ver de qué campo(s) nativo(s) de
  // yearsRaw[year] salió ese número, sin tener que cambiar de toggle. Dos helpers chiquitos arman
  // ese detalle reusando datos que YA existen (revenueBreakdown[year]), nunca inventando uno nuevo:
  // - revenueDetailOrLeaf: para una fila que es UN solo campo nativo (ej. Cuotas Sociales). Si ese
  //   año tiene desglose real en revenueBreakdown (hoy: 2025 y 2027), lo usa tal cual, es el mismo
  //   detalle que ya se ve en "Formato del club". Si no, arma una única fila [label, value] que
  //   confirma de qué campo salió (para años sin ese nivel de detalle, igual queda claro que no hay
  //   reclasificación escondida).
  // - revenueComponentTuple: para UN componente de una fila que combina varios campos (ej. "Otras
  //   secciones deportivas y otros ingresos" = 6 campos sumados), arma su tupla [label, value,
  //   subItems?], anidando revenueBreakdown[year] si existe para ese campo puntual.
  function revenueDetailOrLeaf(year, key, label, value){
    const detail = revenueBreakdown[year] && revenueBreakdown[year][key];
    return (detail && detail.length) ? detail : [[label, value]];
  }

  function revenueComponentTuple(year, key, label, value){
    const detail = revenueBreakdown[year] && revenueBreakdown[year][key];
    return [label, value, (detail && detail.length) ? detail : null];
  }

  function simplifiedReportForBoca(year){
    const r = yearsRaw[year] || {};
    // Sub-desglose real de Gastos del Ejercicio 2027 (expenseSubBreakdown[2027], ver más arriba en
    // el archivo), se reusa por referencia para las filas de abajo que combinan varias categorías
    // nativas de ESE ejercicio puntual, mismo criterio que revenueBreakdown para Ingresos.
    const eb2027 = expenseSubBreakdown[2027] || {};
    // REGLA PERMANENTE (Versión 49, pedido explícito de Guido: "Estadio" y "Abonos" venían
    // pareciendo el mismo concepto porque la fila de Abonos se llamaba "Entradas / Abonos", como si
    // las entradas por partido individual estuvieran repartidas entre las dos filas. NO es así, la
    // distinción es esta y hay que mantenerla en cualquier fila nueva/reclasificación futura:
    // - "Estadio: recaudación de partidos" (o "Estadio (TV y premios incluidos)" en años sin el
    //   desglose fino) = entradas que el club vende POR PARTIDO individual (walk-up/single-match
    //   tickets), sea el canal que sea. Es r.exhibicionEspectaculos (o su desglose 2027).
    // - "Abonos" = abonos/season tickets: la plata de socios/hinchas que pagan por adelantado un
    //   asiento fijo para TODA la temporada (palcos, plateas, cocheras), no partido por partido. Es
    //   r.abonos, SIN la palabra "Entradas" en el label (se sacó justamente porque generaba la
    //   confusión: esa plata no es de entradas sueltas, es de abonos).
    // Mismo criterio en GENERIC_SIMPLIFIED_REVENUE_BUCKETS más abajo (River/Racing): matchday_
    // competition = partido por partido, season_tickets = abono de temporada, nunca mezclar los dos
    // bajo un label que sugiera lo contrario.
    //
    // Desglose real de "Exhibición de Espectáculos Deportivos" en Recaudación/TV/Premios, solo el
    // Ejercicio 2027 tiene este nivel de detalle (ver comentario arriba). Cifras en ARS millones,
    // de Clubes/Argentina/Boca/presupuesto-26-27.md pág. 12 (Torneo Oficial + Copa Libertadores).
    // `items` de cada fila cita las mismas líneas de revenueBreakdown[2027].exhibicionEspectaculos
    // (Torneo Oficial/Copa Argentina/Giras y Amistosos/Copa Libertadores), solo reagrupadas por
    // concepto (Recaudación/TV/Premio) en vez de por competencia, los números son los mismos.
    const estadioRows2027 = [
      {label:'Estadio: recaudación de partidos', value: 5847.950+12260.266+1575.064, items:[
        ['Torneo Oficial. Recaudaciones', 5847.950],
        ['Copa Libertadores. Recaudaciones', 12260.266],
        ['Giras y Amistosos. Amistosos', 1575.064],
      ]},
      {label:'Televisión', value: 9174.920+10062.951, items:[
        ['Torneo Oficial. Derechos de Televisión', 9174.920],
        ['Copa Libertadores. Derechos de Televisión', 10062.951],
      ]},
      {label:'Premios por competencias', value: 1785.000+340.417+2039.262, items:[
        ['Torneo Oficial. Premio por Campeonato', 1785.000],
        ['Copa Argentina. Premio Por Avanzar de Ronda / Aceledador', 340.417],
        ['Copa Libertadores. Bonos', 2039.262],
      ]},
    ];
    const estadioRowsDefault = [
      {label:'Estadio (TV y premios incluidos)', value:r.exhibicionEspectaculos||0,
        items: revenueDetailOrLeaf(year, 'exhibicionEspectaculos', 'Exhibición de Espectáculos Deportivos', r.exhibicionEspectaculos||0)},
    ];
    // "Otros gastos" venía siendo un solo número enorme (todo lo que no es plantel, amortización ni
    // depreciación). Guido pidió desagregarlo. Para el Ejercicio 2027 el presupuesto SÍ separa
    // estas categorías reales (ver expenseBreakdown[2027] y presupuesto-26-27.md pág. 9): se
    // reagrupan en 3 buckets más chicos y legibles en vez de uno solo. El resto de los ejercicios no
    // tiene ese desglose disponible (yearsRaw solo trae `otherExpenses` como campo único ahí), así
    // que sigue con la categoría sola de antes. `items` reusa expenseSubBreakdown[2027] por
    // referencia (mismos datos que ya alimentan "Formato del club" para este ejercicio).
    const otrosGastos2027 = [
      {label:'Organización de partidos', value: -33730.855, items:[
        ['Organización de Espectáculos', -33730.855, eb2027['Organización de Espectáculos']||null],
      ]},
      {label:'Otras secciones deportivas (juvenil, otros deportes, básquet)', value: -(7918.490+6769.002+6217.767), items:[
        ['Fútbol Juvenil', -7918.490, eb2027['Fútbol Juvenil']||null],
        ['Otros Deportes', -6769.002, eb2027['Otros Deportes']||null],
        ['Basket', -6217.767, eb2027['Basket']||null],
      ]},
      {label:'Administración y gastos generales', value: -(36332.931+14386.410+3250.608+2393.117+847.000), items:[
        ['Administración', -36332.931, eb2027['Administración']||null],
        ['Gastos Generales', -14386.410, eb2027['Gastos Generales']||null],
        ['Comerciales', -3250.608, eb2027['Comerciales']||null],
        ['Socios', -2393.117, eb2027['Socios']||null],
        ['Eventuales', -847.000, null],
      ]},
    ];
    const otrosGastosDefault = [
      {label:'Otros gastos', value:(r.otherExpenses||0)+(r.exceptionalItems||0), items:[
        ['Otros gastos', r.otherExpenses||0],
        ['Ítems excepcionales', r.exceptionalItems||0],
      ]},
    ];
    return {
      resultLabel: 'Resultado neto',
      ingresos: [
        {label:'Cuotas Sociales', value:r.cuotasSociales||0,
          items: revenueDetailOrLeaf(year, 'cuotasSociales', 'Cuotas Sociales', r.cuotasSociales||0)},
        {label:'Comercial / Sponsors', value:r.comerciales||0,
          items: revenueDetailOrLeaf(year, 'comerciales', 'Comerciales', r.comerciales||0)},
        ...(year === 2027 ? estadioRows2027 : estadioRowsDefault),
        {label:'Abonos', value:r.abonos||0,
          items: revenueDetailOrLeaf(year, 'abonos', 'Abonos', r.abonos||0)},
        {label:'Venta de Jugadores', value:r.profitOnPlayerSales||0,
          items:[['Ganancia por venta de jugadores', r.profitOnPlayerSales||0]]},
        // Otras secciones deportivas + Otros ingresos, antes 2 filas, unidas en una sola a pedido de
        // Guido (ninguna de las dos es grande por separado, quedaban como "ruido" en la tabla). El
        // acordeón muestra los 6 campos que se suman acá, anidando su propio revenueBreakdown[year]
        // cuando existe para ese ejercicio puntual.
        {label:'Otras secciones deportivas y otros ingresos',
          value:(r.otrosDeportes||0)+(r.basketProfesional||0)+(r.futbolJuvenil||0)+(r.futbolFemenino||0)+(r.diversos||0)+(r.assetSales||0),
          items:[
            revenueComponentTuple(year, 'otrosDeportes', 'Otros deportes', r.otrosDeportes||0),
            revenueComponentTuple(year, 'basketProfesional', 'Basket Profesional', r.basketProfesional||0),
            revenueComponentTuple(year, 'futbolJuvenil', 'Futbol Juvenil', r.futbolJuvenil||0),
            revenueComponentTuple(year, 'futbolFemenino', 'Futbol Femenino', r.futbolFemenino||0),
            revenueComponentTuple(year, 'diversos', 'Diversos', r.diversos||0),
            ['Venta de activos', r.assetSales||0, null],
          ]},
      ],
      gastos: [
        {label:'Compra de jugadores', value:(r.playerAmortisation||0)+(r.playerImpairment||0),
          items: (year === 2027 && eb2027['Fútbol Profesional'])
            ? [eb2027['Fútbol Profesional'][2], ['Deterioro de pases', r.playerImpairment||0, null]]
            : [['Amortización de pases', r.playerAmortisation||0, null], ['Deterioro de pases', r.playerImpairment||0, null]]},
        {label:'Salarios y primas (plantel y cuerpo técnico)', value:r.wages||0,
          items: (year === 2027 && eb2027['Fútbol Profesional'])
            ? [eb2027['Fútbol Profesional'][0], eb2027['Fútbol Profesional'][1]]
            : [['Salarios', r.wages||0]]},
        {label:'Inversiones (amortizaciones y depreciación)', value:(r.depreciation||0)+(r.otherAmortisation||0),
          items: year === 2027
            ? [['Depreciación (bienes de uso: "Otras Amortizaciones" en el presupuesto)', r.depreciation||0, eb2027['Otras Amortizaciones']||null], ['Otras amortizaciones (intangibles)', r.otherAmortisation||0, null]]
            : [['Depreciación', r.depreciation||0, null], ['Otras amortizaciones', r.otherAmortisation||0, null]]},
        ...(year === 2027 ? otrosGastos2027 : otrosGastosDefault),
      ],
      extraRows: [
        {label:'Intereses netos', value:r.netInterest||0},
        {label:'Impuestos', value:r.tax||0},
      ],
    };
  }


  // "Formato simplificado" para River/Racing (Versión 32, antes solo existía para Boca). A
  // diferencia de simplifiedReportForBoca (que reclasifica a mano desde yearsRaw, porque Boca no
  // guarda normalizedCategory), River/Racing YA tienen cada línea etiquetada con normalizedCategory
  // (revenueLines/expenseLines, ver data/river-data.js y data/racing-data.js), así que acá alcanza
  // con agrupar por categoría normalizada, no hace falta reclasificar a mano por año. Los buckets
  // sacan sus categorías de las mismas normalizedCategory que ya usa REVENUE_CATEGORIES/
  // EXPENSE_CATEGORIES de data/category-map.js, más 'broadcasting'/'player_sales'/
  // 'lump_football_operations(_expense)' que category-map.js todavía no lista (son categorías reales
  // que ya salieron al cargar Racing, pendiente sumarlas a ese archivo, ver to-do del skill
  // club-data-mapping). El catch-all "Otros" absorbe cualquier normalizedCategory que no matchee
  // ningún bucket explícito, para no perder ningún renglón silenciosamente.
  // Orden pedido por Guido (Versión 44: Comercial/Abonos suben a las posiciones 2-3; Versión 45:
  // "Partidos y competencias" pasa a llamarse "Estadio: recaudación de partidos", mismo nombre que
  // ya usa Boca para su fila de recaudación en `simplifiedReportForBoca`, y sube a la 3ra posición
  // (Abonos baja a 4ta). El `cats:['matchday_competition']` no cambia, es la misma categoría de
  // siempre (recaudación de entradas/tickets), solo se renombra para que las dos vistas usen el
  // mismo vocabulario. Afecta a River Y Racing por igual, comparten esta misma lista (es la gracia
  // de "Formato simplificado": buckets consistentes entre los clubes del motor genérico).
  // REGLA PERMANENTE (Versión 47, ver .claude/skills/club-data-mapping/SKILL.md sección 10): estos
  // labels Y ESTE ORDEN tienen que coincidir con los que ya usa Boca en simplifiedReportForBoca()
  // para el mismo concepto (Guido: "la tabla tiene que quedar exactamente igual ordenada
  // tambien. el orden importa"), así "Formato simplificado" se lee igual entre clubes. Orden de
  // referencia, el mismo que arma simplifiedReportForBoca() para el Ejercicio 2027 (el único con
  // el desglose Estadio/Televisión/Premios completo): Cuotas Sociales, Comercial/Sponsors,
  // Estadio, Televisión, Premios, Abonos, Venta de Jugadores, catch-all. "Premios por
  // competencias" (cats:['competition_bonus']): antes esa plata estaba mezclada dentro de
  // matchday_competition junto con la recaudación de entradas; se separó re-etiquetando las líneas
  // reales de data/racing-data.js (Racing 2026/27, único caso con esa granularidad en la fuente),
  // no se inventó ningún número. "Abonos" (Versión 49, antes decía "Entradas / Abonos"): ver la
  // regla de distinción Estadio-vs-Abonos en el comentario de simplifiedReportForBoca(). "Fútbol
  // profesional (sin desglosar por la fuente)" NO tiene
  // equivalente en Boca (es una categoría que solo existe porque a veces el dato de un club no
  // desglosa más), por eso va al final, y con `hideIfZero:true`: si para ese club/año no hay
  // ninguna línea en esa categoría (ej. Racing, que desde la Versión 38 ya no la usa), la fila ni
  // se pinta, en vez de mostrar un "0.0" que no significa nada y que Boca tampoco tendría (Guido lo
  // pidió explícito viendo la fila en cero para Racing). Distinto de un bucket normal en $0 (ej.
  // "Venta de Jugadores" cuando un club no vendió nadie ese año): esos SÍ se siguen mostrando en
  // $0, porque son categorías reales que Boca también muestra en $0 cuando corresponde, no un
  // artefacto de implementación como el bolsón sin desglosar.
  const GENERIC_SIMPLIFIED_REVENUE_BUCKETS = [
    {label:'Cuotas Sociales', cats:['member_dues']},
    {label:'Comercial / Sponsors', cats:['sponsorship_commercial']},
    {label:'Estadio: recaudación de partidos', cats:['matchday_competition']},
    {label:'Televisión', cats:['broadcasting']},
    {label:'Premios por competencias', cats:['competition_bonus']},
    {label:'Abonos', cats:['season_tickets']},
    {label:'Venta de Jugadores', cats:['player_sales']},
    {label:'Fútbol profesional (sin desglosar por la fuente)', cats:['lump_football_operations'], hideIfZero:true},
  ];

  const GENERIC_SIMPLIFIED_EXPENSE_BUCKETS = [
    {label:'Compra de jugadores', cats:['player_amortisation','player_impairment']},
    {label:'Salarios y primas (plantel y cuerpo técnico)', cats:['wages_squad']},
    {label:'Inversiones (amortizaciones y depreciación)', cats:['depreciation','other_amortisation']},
    {label:'Fútbol profesional (sin desglosar por la fuente)', cats:['lump_football_operations_expense'], hideIfZero:true},
  ];

  function simplifiedReportForGeneric(clubId, year){
    const cur = computeYearGeneric(clubId, year);
    // ACORDEÓN DE CONTROL (Versión 42, extiende a River/Racing la regla de la Versión 40, ver
    // club-data-mapping SKILL.md sección 9): cada bucket lleva `items` con las líneas reales
    // (rawLabel + amountNative, tal cual las reportó la fuente) que se sumaron para llegar a ese
    // número, anidando el desglose propio de cada línea (`line.items`) cuando existe. No se inventa
    // ningún dato nuevo: son las mismas revenueLines/expenseLines que ya alimenta "Formato del
    // club", solo agrupadas distinto.
    const bucketize = (lines, buckets, catchAllLabel) => {
      const bucketed = new Set(buckets.flatMap(b => b.cats));
      const rows = buckets
        .map(b => {
          const matches = lines.filter(l => b.cats.includes(l.normalizedCategory));
          const value = matches.reduce((s,l) => s + l.amountNative, 0);
          const items = matches.length ? matches.map(l => [l.rawLabel, l.amountNative, l.items || null]) : null;
          return { label:b.label, value, items, hideIfZero:b.hideIfZero };
        })
        .filter(row => !(row.hideIfZero && row.value === 0));
      const restLines = lines.filter(l => !bucketed.has(l.normalizedCategory));
      const rest = restLines.reduce((s,l) => s + l.amountNative, 0);
      const restItems = restLines.length ? restLines.map(l => [l.rawLabel, l.amountNative, l.items || null]) : null;
      rows.push({ label:catchAllLabel, value:rest, items:restItems });
      return rows;
    };
    const extraRows = cur.meta.extraRows ? cur.meta.extraRows.slice() : [
      ...(cur.profitOnPlayerSales ? [{label:'Ganancia por venta de jugadores', value:cur.profitOnPlayerSales}] : []),
      ...(cur.assetSales ? [{label:'Venta de activos', value:cur.assetSales}] : []),
      ...(cur.netInterest ? [{label:'Intereses netos', value:cur.netInterest}] : []),
      ...(cur.tax ? [{label:'Impuestos', value:cur.tax}] : []),
    ];
    return {
      resultLabel:'Resultado neto',
      ingresos: bucketize(cur.revenueLines, GENERIC_SIMPLIFIED_REVENUE_BUCKETS, 'Otras secciones deportivas y otros ingresos'),
      gastos: bucketize(cur.expenseLines, GENERIC_SIMPLIFIED_EXPENSE_BUCKETS, 'Otros gastos'),
      extraRows,
    };
  }


  // Arma el reporte nativo {ingresos, gastos, extraRows, resultLabel} de un club/ejercicio.
  function nativeReportFor(clubId, year){
    const revKeys = [
      ['cuotasSociales','Cuotas Sociales'], ['comerciales','Comerciales'],
      ['exhibicionEspectaculos','Exhibición de Espectáculos Deportivos'], ['abonos','Abonos'],
      ['diversos','Diversos'], ['otrosDeportes','Otros deportes'], ['basketProfesional','Basket Profesional'],
      ['futbolJuvenil','Futbol Juvenil'], ['futbolFemenino','Futbol Femenino'],
    ];
    if(clubId === 'boca'){
      if(simplifyFormat) return simplifiedReportForBoca(year);
      if(nativeFinancialsBoca[year]) return nativeFinancialsBoca[year];
      if(year === 2027 && expenseBreakdown[2027]){
        const rb = revenueBreakdown[2027], r = yearsRaw[2027];
        return {
          resultLabel:'Resultado económico',
          ingresos: revKeys.map(([k,label]) => ({label, value:r[k]||0, items:(rb&&rb[k])||null})),
          gastos: expenseBreakdown[2027].expenses.map(it => ({label:it[0], value:it[1], items:(expenseSubBreakdown[2027]&&expenseSubBreakdown[2027][it[0]])||null})),
          extraRows: [],
        };
      }
      // Fallback para los ejercicios de Boca sin documento oficial propio (placeholder): se muestran
      // los mismos campos de siempre (9 de Revenue + wages/otherExpenses + el resto de renglones del
      // viejo P&L), solo que como filas planas en vez de forzar los subtotales EBITDA/EBIT de antes.
      const r = yearsRaw[year] || {};
      const rb = revenueBreakdown[year];
      return {
        resultLabel:'Resultado neto',
        ingresos: revKeys.map(([k,label]) => ({label, value:r[k]||0, items:(rb&&rb[k])||null})),
        gastos: [{label:'Salarios', value:r.wages||0, items:null}, {label:'Otros gastos', value:r.otherExpenses||0, items:null}],
        extraRows: [
          {label:'Ítems excepcionales', value:r.exceptionalItems||0}, {label:'Amortización de pases', value:r.playerAmortisation||0},
          {label:'Deterioro de pases', value:r.playerImpairment||0}, {label:'Depreciación', value:r.depreciation||0},
          {label:'Otras amortizaciones', value:r.otherAmortisation||0}, {label:'Ganancia por venta de jugadores', value:r.profitOnPlayerSales||0},
          {label:'Venta de activos', value:r.assetSales||0}, {label:'Intereses netos', value:r.netInterest||0}, {label:'Impuestos', value:r.tax||0},
        ],
      };
    }
    // River/Racing: el motor genérico ya guarda rawLabel tal cual lo reportó la fuente (prensa o
    // placeholder), no hace falta traducir nada, se usa directo. OJO: "gastos" de abajo ya lista
    // TODAS las expenseLines sin filtrar, así que NO hay que sumar cur.exceptionalItems ni
    // cur.nonCash acá, son sub-sumas de esas mismas líneas (por normalizedCategory) y ya están
    // adentro; agregarlas de nuevo sería contarlas dos veces (bug real: pasó con River, que sí
    // categoriza "Amortización de pases"/"Depreciación" como líneas propias). profitOnPlayerSales,
    // assetSales, netInterest y tax SÍ vienen de otro lado (fiscalYearMeta, no de expenseLines), así
    // que esos no se duplican.
    if(simplifyFormat) return simplifiedReportForGeneric(clubId, year);
    const cur = computeYearGeneric(clubId, year);
    // Por default, las filas debajo de Gastos se arman solas a partir de los 4 campos de meta
    // (profitOnPlayerSales/assetSales/netInterest/tax), alcanza para Racing. Si un club/ejercicio
    // necesita más de una fila ahí abajo con etiquetas propias (ej. River 2024, que tiene
    // "Resultados financieros" Y "Otros egresos" como dos líneas separadas del documento real, no
    // una sola), se puede definir meta.extraRows:[{label,value}] directo en *FiscalYearMeta y eso
    // reemplaza el armado automático (netInterest sigue alimentando el PAT real para KPIs/gráficos,
    // solo cambia cómo se muestra acá).
    const extraRows = cur.meta.extraRows ? cur.meta.extraRows.slice() : [
      ...(cur.profitOnPlayerSales ? [{label:'Ganancia por venta de jugadores', value:cur.profitOnPlayerSales}] : []),
      ...(cur.assetSales ? [{label:'Venta de activos', value:cur.assetSales}] : []),
      ...(cur.netInterest ? [{label:'Intereses netos', value:cur.netInterest}] : []),
      ...(cur.tax ? [{label:'Impuestos', value:cur.tax}] : []),
    ];
    return {
      resultLabel:'Resultado neto',
      ingresos: cur.revenueLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
      gastos: cur.expenseLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
      extraRows,
    };
  }


  // Convierte una categoría {label,value,items} a su valor en la moneda que se está mostrando.
  // meta === null significa "ya está en la moneda a mostrar, no convertir" (caso River/Racing, que
  // siempre están en USD, igual que el resto del sitio para esos dos clubes).
  function nativeDisplayVal(value, meta, targetCurrency){
    return meta ? toDisplayValue(value, meta, targetCurrency) : value;
  }


  // REGLA GENERAL (no solo Boca 2027): un documento oficial (no placeholder) que reporta
  // Deuda bruta = Caja = 0 casi seguro NO tiene deuda cero real, significa que ese documento
  // no desglosa deuda/caja en su resumen (caso: presupuestos económicos, que no siempre traen
  // balance patrimonial). Placeholder ya tiene su propio aviso (banner de arriba de Finanzas),
  // así que acá solo se avisa cuando el dato es oficial pero el 0/0 es sospechoso. Nunca hay que
  // dejar que un hincha lea "Deuda: $0" y asuma que el club no tiene deuda cuando en realidad es
  // un dato no publicado.
  function debtDisclosureNote(curUndisclosed, curLabel, prevUndisclosed, prevLabel){
    if(curUndisclosed && prevUndisclosed) return `⚠️ Ni el documento de ${curLabel} ni el de ${prevLabel} desglosan deuda ni caja en su resumen, el $0 que ves en esas columnas NO significa que la deuda sea cero, es un dato no disponible todavía.`;
    if(curUndisclosed) return `⚠️ El documento de ${curLabel} no desglosa deuda ni caja en su resumen, el $0 que ves en esa columna NO significa que la deuda sea cero, es un dato no disponible todavía.`;
    if(prevUndisclosed) return `⚠️ El documento de ${prevLabel} no desglosa deuda ni caja en su resumen, el $0 que ves en esa columna NO significa que la deuda sea cero, es un dato no disponible todavía.`;
    return '';
  }


  function sumCat(lines, cats){
    return lines.filter(l => cats.includes(l.normalizedCategory)).reduce((s,l) => s + l.amountNative, 0);
  }


  function computeYearGeneric(clubId, year){
    const revenueLines = (clubId === 'river' ? riverRevenueLinesByYear[year] : racingRevenueLinesByYear[year]) || [];
    const expenseLines = (clubId === 'river' ? riverExpenseLinesByYear[year] : racingExpenseLinesByYear[year]) || [];
    const meta = (clubId === 'river' ? riverFiscalYearMeta[year] : racingFiscalYearMeta[year]) || {};
    const revenue = revenueLines.reduce((s,l) => s + l.amountNative, 0);
    const wages = sumCat(expenseLines, ['wages_squad']);
    const otherExpenses = sumCat(expenseLines, ['other_expenses','lump_football_operations_expense']);
    const expenses = wages + otherExpenses;
    const ebitda = revenue + expenses;
    const exceptionalItems = sumCat(expenseLines, ['exceptional_items']);
    const playerAmortisation = sumCat(expenseLines, ['player_amortisation']);
    const playerImpairment = sumCat(expenseLines, ['player_impairment']);
    const depreciation = sumCat(expenseLines, ['depreciation']);
    const otherAmortisation = sumCat(expenseLines, ['other_amortisation']);
    const nonCash = playerAmortisation + playerImpairment + depreciation + otherAmortisation;
    const operatingProfit = ebitda + exceptionalItems + nonCash;
    const profitOnPlayerSales = meta.profitOnPlayerSales || 0;
    const assetSales = meta.assetSales || 0;
    const ebit = operatingProfit + profitOnPlayerSales + assetSales;
    const netInterest = meta.netInterest || 0;
    const pbt = ebit + netInterest;
    const tax = meta.tax || 0;
    const pat = pbt + tax;
    const wagesToTurnover = revenue !== 0 ? (-wages / revenue) : 0;
    const grossDebt = meta.grossDebt || 0, cash = meta.cash || 0;
    const netDebt = grossDebt - cash;
    const yearLabel = ejercicioLabel(year, meta.reportType === 'official_budget');
    return { clubId, year, yearLabel, meta, revenueLines, expenseLines, revenue, wages, otherExpenses, expenses, ebitda, exceptionalItems, playerAmortisation, playerImpairment, depreciation, otherAmortisation, nonCash, operatingProfit, profitOnPlayerSales, assetSales, ebit, netInterest, pbt, tax, pat, wagesToTurnover, grossDebt, cash, netDebt };
  }


  // Nota de tipo de cambio para River/Racing (Versión 32, antes no existía, siempre era USD sin
  // conversión). Solo aparece cuando el ejercicio está en ARS nativo con un fx real (declarado por
  // el club), los ejercicios que siguen en USD (2009-2011 de Racing, placeholders de River) no
  // muestran nota, porque no hay conversión real que explicar.
  function genericFxNote(clubId, year){
    const meta = yearMetaFor(clubId, year);
    if(meta.currency !== 'ARS') return '';
    return `Convertido a USD con $${meta.fx.toLocaleString('es-AR')}, el tipo de cambio que declara el propio documento de este ejercicio (ver pestaña Fuentes).`;
  }


  // reportType de un club/ejercicio, sin pasar por computeYear/computeYearGeneric, lo usa
  // renderSupuestosCard() para saber qué mensaje mostrar cuando el ejercicio no tiene supuestos
  // declarados (distinto texto para "es un balance, no un presupuesto" vs. "todavía es placeholder").
  // Boca no tiene un campo `reportType` en yearsRaw (a diferencia de River/Racing en
  // *FiscalYearMeta), se mantiene el mismo mapeo a mano que ya usa
  // renderDataQualityBannerForCurrentSelection, para no duplicar una fuente de verdad distinta.
  function reportTypeForYear(clubId, year){
    if(clubId === 'boca'){
      if(year === 2027) return 'official_budget';
      if(year === 2025) return 'official_balance_sheet';
      // 2024 y 2026 son ejercicios reales que Boca todavía no publicó/no se cargó (ver comentario en
      // yearsRaw[2026]), 'pending_official' los distingue de 'placeholder' (2018/2019/2021/2022/2023,
      // números inventados a propósito para probar el diseño del sitio, no ejercicios reales en
      // espera). Ambos se ven en $0 en las tablas, pero el mensaje que lee Guido/el usuario final tiene
      // que decir la verdad distinta en cada caso.
      if(year === 2024 || year === 2026) return 'pending_official';
      return 'placeholder';
    }
    const table = clubId === 'river' ? riverFiscalYearMeta : racingFiscalYearMeta;
    return ((table[year]) || {}).reportType || 'placeholder';
  }


  // Calcula el P&L de un ejercicio para cualquier club: Boca sigue con su cálculo original
  // (computeYear), River/Racing con el motor genérico (computeYearGeneric).
  function computeYearForClub(clubId, year){
    return clubId === 'boca' ? computeYear(year) : computeYearGeneric(clubId, year);
  }


  // Convierte el resultado de computeYearForClub a un objeto simple {revenue, expenses, pat,
  // netDebt} ya en USD: "Comparar Gestiones" siempre muestra USD sin importar el toggle de
  // Finanzas (tiene sentido: es la vista que compara entre gestiones/clubes, no se presta a que
  // quede a mitad en ARS de un club y USD de otro). Versión 32: generalizado con yearMetaFor para
  // los 3 clubes, antes River/Racing pasaban los montos "tal cual" asumiendo que ya estaban en
  // USD (cierto hasta la Versión 31, ya no: ahora tienen amountNative en ARS nativo como Boca).
  function displayFinancialsForClub(clubId, computed){
    const meta = yearMetaFor(clubId, computed.year);
    return {
      revenue: toDisplayValue(computed.revenue, meta, 'USD'),
      expenses: Math.abs(toDisplayValue(computed.expenses, meta, 'USD')),
      pat: toDisplayValue(computed.pat, meta, 'USD'),
      netDebt: toDisplayValue(computed.netDebt, meta, 'USD'),
    };
  }


  // La gestión "actual" de un club = la que tiene el lastYear más alto.
  function currentGestionKey(clubId){
    const gestiones = gestionesByClub[clubId];
    return Object.keys(gestiones).reduce((best,k) => (!best || gestiones[k].lastYear > gestiones[best].lastYear) ? k : best, null);
  }


  function pasesNetSpend(clubId, gestionKey){
    const data = pasesDataByClub[clubId] || [];
    return data.filter(r => r.gestion === gestionKey && r.tipo === 'Jugador').reduce((s,r) => s+r.monto, 0);
  }


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
// Orden de carga: después de clubs.js/category-map.js/currency-map.js/
// boca-data.js/river-data.js/racing-data.js (lee esas constantes por nombre),
// antes de js/finanzas-render.js (que llama a estas funciones) y del <script>
// principal de index.html.
// ============================================================================


  // yearMetaFor(clubId, year): en qué moneda está guardado cada ejercicio de un club, y con qué tipo
  // de cambio convertirlo. Lee currency/fx directo de <club>FiscalYearMeta[year] (ver data/<club>-data.js):
  // los ejercicios con documento propio re-extraído tienen currency:'ARS' con el fx que el propio
  // balance/presupuesto declara; los que no se re-extrajeron (placeholders) quedan en currency:'USD'
  // con un fx (documentado o null). Si fx viene null, se usa FX_RATE (placeholder global) para que el
  // toggle igual funcione, aunque sea con un número aproximado.
  // Versión 125: el fx se resuelve con fxMetaFor() (data/currency-map.js) en vez
  // de leerse crudo, porque un ejercicio puede traer `fxRef:'BRL@2024-12-31'` en
  // vez de `fx:`, el número vive en FX_CLOSE y no en el archivo del club. Se
  // devuelven además `fxSource`/`fxLabel` (de dónde salió ese tipo de cambio),
  // que es lo que la ficha de fuente de Finanzas muestra al visitante.
  function yearMetaFor(clubId, year){
    const table = ((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta;
    const m = (table && table[year]) || {};
    const f = fxMetaFor(m);
    return {
      currency: m.currency || 'USD',
      fx: (f.fx != null ? f.fx : FX_RATE),
      fxSource: f.source, fxLabel: f.label, fxRef: f.ref,
    };
  }


  // OVERLAY DE PRESUPUESTO (Versión 57, pedido explícito de Guido: "muchos años de racing tienen
  // ambos presupuesto y balance... para cuando haya un mismo año que tenga both presupuesto y
  // balance, en estado de resultado agregá una columna que sea Balance"). Ver
  // `.claude/skills/club-or-year-onboarding/SKILL.md` sección 11 para el criterio completo.
  //
  // El balance real de un ejercicio dual sigue siendo el dato PRIMARIO de siempre
  // (`racing{Revenue,Expense}LinesByYear[year]`/`racingFiscalYearMeta[year]`, con
  // `reportType:'official_budget_and_balance'`): KPIs, Formato Simplificado y `verifyTieOuts()`
  // salen de ahí sin ningún cambio. `racingPresupuestoOverlayByYear[year]` (mismo formato que
  // revenueLines/expenseLines: `{rawLabel, normalizedCategory, amountNative, items}`, más su propio
  // `currency`/`fx`, que puede ser distinto al del balance del mismo ejercicio) es la fuente
  // SECUNDARIA, usada ÚNICAMENTE para pintar la columna "Presupuesto" de "Estado de resultados", no
  // participa de ningún cálculo (KPIs/PAT/Formato Simplificado/verifyTieOuts). Boca no tiene un
  // archivo de overlay propio hoy (no le hizo falta a este pedido, que es 100% sobre Racing); el
  // `typeof` de abajo evita un ReferenceError si algún día se llama para Boca sin haber declarado
  // `bocaPresupuestoOverlayByYear` en ningún lado, mismo patrón defensivo que ya usa el resto del
  // sitio para lazy-loading (ver Versión 51). River tiene su propio `riverPresupuestoOverlayByYear`
  // vacío, listo para el día que aparezca un ejercicio dual de ese club.
  function presupuestoOverlayFor(clubId, year){
    // Versión 121: antes esto era un `if` a mano que sólo conocía a racing y river, o sea que
    // onboardear un club con presupuesto Y balance del mismo ejercicio obligaba a editar ESTE
    // archivo. Era el último lugar donde sobrevivía el patrón "agregar un club = tocar el código"
    // que el resto del proyecto ya había eliminado (ver `loadClubData()`, Versión 112, y
    // `populateClubSelect()`, Versión 101). Ahora sale por convención del propio archivo del club:
    // alcanza con que su `window.CLUB_GENERIC_DATA.<club>` registre `presupuestoOverlayByYear`.
    // Un club sin overlay (la mayoría) devuelve null igual que antes, sin romper nada.
    const club = (window.CLUB_GENERIC_DATA || {})[clubId];
    const table = club && club.presupuestoOverlayByYear;
    return (table && table[year]) || null;
  }

  // Mismo shape {ingresos, gastos} que arma nativeReportFor() para el motor genérico (rawLabel/
  // amountNative/items tal cual la fuente), para que buildNativeSectionHtml() pinte el overlay con
  // el mismo código que ya pinta la columna primaria, sin lógica nueva de render. `null` si el
  // ejercicio no tiene overlay (el caso normal).
  // REGLA (Versión 59, bug real reportado por Guido con captura de pantalla: en Formato
  // Simplificado, la columna "Presupuesto" mostraba "—" en absolutamente todas las filas salvo el
  // total): cuando `simplifyFormat` está activo, el overlay se agrupa con el MISMO `bucketize()` y
  // los MISMOS `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` que ya agrupan la columna
  // primaria (Balance), así los `label` de las dos columnas coinciden EXACTO ("Cuotas Sociales",
  // "Compra de jugadores", etc.) y `buildNativeSectionHtml()`/`findPrevVal()` los empareja fila
  // por fila. Antes, el overlay siempre devolvía sus `rawLabel` crudos (los del documento nativo,
  // ej. "Ingresos sociales"), que nunca coinciden con los buckets de Formato Simplificado, ni con
  // el propio `rawLabel` de la columna primaria en Formato del club si esta usa otro nombre para
  // el mismo concepto (ver limitación documentada en club-or-year-onboarding/SKILL.md sección 11).
  function presupuestoOverlayReportFor(clubId, year){
    const overlay = presupuestoOverlayFor(clubId, year);
    if(!overlay) return null;
    if(simplifyFormat){
      return {
        ingresos: bucketize(overlay.revenueLines, GENERIC_SIMPLIFIED_REVENUE_BUCKETS, 'Otras secciones deportivas y otros ingresos'),
        gastos: bucketize(overlay.expenseLines, GENERIC_SIMPLIFIED_EXPENSE_BUCKETS, 'Otros gastos'),
      };
    }
    return {
      ingresos: overlay.revenueLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
      gastos: overlay.expenseLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
    };
  }

  // {currency, fx} del overlay, mismo shape que yearMetaFor(), para convertir sus montos a la
  // moneda que se está mostrando. `null` si no hay overlay.
  function presupuestoOverlayMetaFor(clubId, year){
    const overlay = presupuestoOverlayFor(clubId, year);
    if(!overlay) return null;
    // Mismo criterio que yearMetaFor (Versión 125): el overlay también puede
    // traer `fxRef` en vez de `fx`, y su procedencia casi siempre es
    // `document_assumption` (la premisa del presupuesto), distinta de la del
    // balance del MISMO ejercicio.
    const f = fxMetaFor(overlay);
    return {
      currency: overlay.currency,
      fx: (f.fx != null ? f.fx : FX_RATE),
      fxSource: f.source, fxLabel: f.label, fxRef: f.ref,
    };
  }


  // Convierte un valor que está en la moneda nativa de "meta" (`meta.currency`, en millones) a la
  // moneda pedida para mostrar en pantalla (targetCurrency). Generalizado en la Versión 103 (ver
  // comentario de cabecera de data/currency-map.js para el modelo completo): el INVARIANTE es que
  // targetCurrency siempre es o bien `meta.currency` (mostrar en la moneda nativa del ejercicio) o
  // bien 'USD' (el pivote universal) — nunca una 3ra moneda no relacionada. USD actúa de puente: para
  // ir de una moneda nativa no-USD a otra, hacé 2 llamadas (nativa->USD, después USD->la otra), nunca
  // agregues un 4to branch acá para un par directo. `CURRENCY_META[code].scale` reemplaza el `/1000`
  // que antes estaba hardcodeado solo para ARS: cualquier moneda de valor nominal grande (CLP, COP)
  // ya se muestra en "miles de millones" igual que ARS, sin tocar esta función.
  function toDisplayValue(value, meta, targetCurrency){
    const curScale = currencyMetaFor(meta.currency).scale;
    if(meta.currency === targetCurrency) return value / curScale;
    if(targetCurrency === 'USD') return meta.currency === 'USD' ? value : value / meta.fx;
    if(meta.currency === 'USD') return (value * meta.fx) / currencyMetaFor(targetCurrency).scale;
    // No debería llegar acá bajo el invariante de arriba (targetCurrency no es ni meta.currency ni
    // 'USD', y meta.currency tampoco es 'USD'): devolver el valor crudo, sin re-escalar a ciegas, es
    // más seguro que inventar una conversión no soportada.
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
  //
  // REGLA (Versión 57): firma cambiada de `(year, isPresupuesto)` a `(year, reportType)`, recibe
  // el `reportType` directo en vez de un booleano, para poder distinguir un 3er caso:
  // `official_budget_and_balance` (ejercicio con Presupuesto Y Balance reales cargados a la vez,
  // ver `presupuestoOverlayFor()`) usa el prefijo "Balance" — el balance real sigue siendo el dato
  // PRIMARIO de ese ejercicio (KPIs/Formato Simplificado/verifyTieOuts salen de ahí), así que el
  // header de la columna principal en "Estado de resultados" tiene que decirlo explícito ("Balance
  // 2017/2018"), no quedar en el "Ejercicio 2017/2018" genérico que sugeriría que no hay una 2da
  // fuente (Presupuesto) conviviendo al lado en la columna de comparación.
  // REGLA (pedido explícito de Guido con Boca 2024/2025, generalizada a CUALQUIER club/ejercicio):
  // `official_balance_sheet` (un balance real, sin presupuesto overlay al lado) también usa el
  // prefijo "Balance", no el genérico "Ejercicio" — "Ejercicio 2024/2025" no distinguía un balance
  // auditado real de un placeholder/pending_official, y el balance es justamente el documento más
  // sólido que puede tener un ejercicio. "Ejercicio" queda solo para lo que de verdad no tiene un
  // documento oficial cargado (placeholder, pending_official, unofficial_mirror).
  // isCalendarYearClub(clubId): true para un club cuyo ejercicio fiscal es el año calendario
  // (ene-dic), a diferencia de los clubes argentinos (jul-jun o sep-ago), que se identifican por el
  // año en que TERMINAN la temporada ("Ejercicio 2026/2027"). Agregado al onboardear los primeros
  // clubes de Brasil (ejercicio social = año calendario para los SAF/associações relevados) — sin
  // esto, `ejercicioLabel()` les mostraría "Balance 2023/2024" para un balance que en realidad cubre
  // 1/1/2024 a 31/12/2024 completo, una etiqueta de fecha FALSA, no solo un estilo distinto. Lee
  // `clubs[clubId].fiscalYearStart` (data/clubs.js) en vez de una lista de ids hardcodeada: el
  // próximo club calendario (cualquier país — ya lo son Brasil, México y Japón) hereda esto solo
  // con declarar `fiscalYearStart:'01-01'`.
  function isCalendarYearClub(clubId){
    return !!(clubs[clubId] && clubs[clubId].fiscalYearStart === '01-01');
  }

  // 3er parámetro `clubId` (opcional, retrocompatible: todo call site viejo que no lo pasa sigue
  // viendo el formato de temporada de siempre). Si `clubId` corresponde a un club de ejercicio
  // calendario (`isCalendarYearClub`, ver arriba), el label es solo el prefijo + el año suelto
  // ("Balance 2024"), NUNCA "2023/2024" — ese rango de temporada sería una fecha directamente falsa
  // para un club que cierra su ejercicio el 31/12.
  // i18n (to-do 42): prefijo + año, mismo orden en castellano e inglés ("Balance 2024/2025" /
  // "Balance sheet 2024/2025"), así que no hace falta el patrón `{a}`/`{b}` de debtDisclosureNote
  // de más arriba (pensado para frases donde el orden de las palabras puede cambiar entre idiomas) —
  // alcanza con traducir el prefijo y concatenar el año en JS, mismo criterio que ya usa
  // `t('liga.exercise', 'Ejercicio') + ' ' + st.year` en js/liga.js.
  function ejercicioLabel(year, reportType, clubId){
    const prefix = reportType === 'official_budget' ? t('ejercicio.budget', 'Presupuesto')
      : (reportType === 'official_budget_and_balance' || reportType === 'official_balance_sheet') ? t('ejercicio.balance', 'Balance')
      : t('ejercicio.default', 'Ejercicio');
    if(clubId && isCalendarYearClub(clubId)) return prefix+' '+year;
    return prefix+' '+(year-1)+'/'+year;
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

  // fmtAmount/fmtAmountPlain esperan un valor YA convertido a la moneda que se va a mostrar. No convierten:
  // solo agregan signo y unidad. Para valores ligados a un ejercicio, convertir antes con
  // toDisplayValue(valor, yearMetaFor(clubId, year), currency). Para valores que siempre están en USD
  // (pases, net spend), pasar directamente con currency='USD'.
  // Generalizado en la Versión 103: la unidad sale de `currencyMetaFor(currency).unitSuffix` (ver
  // data/currency-map.js), no de un ternario binario ARS/USD. Antes de esta versión, CUALQUIER
  // moneda que no fuera literalmente 'ARS' se mostraba como "M USD" — un club en BRL/CLP/COP/EUR
  // habría mostrado la unidad equivocada sin ningún error visible. `currencyMetaFor` nunca devuelve
  // undefined (cae a `DEFAULT_CURRENCY_META` para un código sin entrada todavía), así que esto no
  // rompe para una moneda nueva, en el peor caso muestra "M <código>" hasta que se agregue su
  // entrada real a `CURRENCY_META`.
  function fmtAmount(value, currency){
    const unit = `${currencyMetaFor(currency).unitSuffix} ${currency}`;
    const sign = value > 0 ? '+' : (value < 0 ? '-' : '');
    return `${sign}${Math.abs(value).toFixed(1)} ${unit}`;
  }

  function fmtAmountPlain(value, currency){
    const unit = `${currencyMetaFor(currency).unitSuffix} ${currency}`;
    return `${value < 0 ? '-' : ''}${Math.abs(value).toFixed(1)} ${unit}`;
  }



  // "Formato simplificado" para el motor genérico (Versión 102: usado por TODOS los clubes,
  // Boca incluida — antes Boca tenía su propia simplifiedReportForBoca(), que reclasificaba a mano
  // desde yearsRaw porque no tenía normalizedCategory; ahora cada club, Boca incluida, ya tiene cada
  // línea etiquetada con normalizedCategory (revenueLines/expenseLines, ver data/<club>-data.js), así
  // que acá alcanza con agrupar por categoría normalizada, no hace falta reclasificar a mano por año.
  // Los buckets sacan sus categorías de las mismas normalizedCategory que ya usa REVENUE_CATEGORIES/
  // EXPENSE_CATEGORIES de data/category-map.js, más 'broadcasting'/'player_sales'/
  // 'lump_football_operations(_expense)' que category-map.js todavía no lista (son categorías reales
  // que ya salieron al cargar Racing, pendiente sumarlas a ese archivo, ver to-do del skill
  // club-data-mapping). El catch-all "Otros" absorbe cualquier normalizedCategory que no matchee
  // ningún bucket explícito, para no perder ningún renglón silenciosamente.
  // Orden pedido por Guido (Versión 44: Comercial/Abonos suben a las posiciones 2-3; Versión 45:
  // "Partidos y competencias" pasa a llamarse "Estadio: recaudación de partidos". El
  // `cats:['matchday_competition']` no cambia, es la misma categoría de siempre (recaudación de
  // entradas/tickets), solo se renombra para que todas las vistas usen el mismo vocabulario. Todos
  // los clubes del motor genérico comparten esta misma lista (es la gracia de "Formato simplificado":
  // buckets consistentes entre clubes).
  // REGLA PERMANENTE (Versión 47, ver .claude/skills/club-data-mapping/SKILL.md sección 13): estos
  // labels Y ESTE ORDEN tienen que coincidir entre todos los clubes para el mismo concepto (Guido:
  // "la tabla tiene que quedar exactamente igual ordenada tambien. el orden importa"), así "Formato
  // simplificado" se lee igual entre clubes. Orden de referencia: Cuotas Sociales, Comercial/
  // Sponsors, Estadio, Televisión, Premios, Abonos, Venta de Jugadores, catch-all. "Premios por
  // competencias" (cats:['competition_bonus']): antes esa plata estaba mezclada dentro de
  // matchday_competition junto con la recaudación de entradas; se separó re-etiquetando las líneas
  // reales de data/racing-data.js (Racing 2026/27, único caso con esa granularidad en la fuente),
  // no se inventó ningún número. "Abonos" (Versión 49, antes decía "Entradas / Abonos"). "Fútbol
  // profesional (sin desglosar por la fuente)" es una categoría que solo existe porque a veces el
  // dato de un club no desglosa más, por eso va al final, y con `hideIfZero:true`: si para ese
  // club/año no hay ninguna línea en esa categoría (ej. Racing, que desde la Versión 38 ya no la
  // usa), la fila ni se pinta, en vez de mostrar un "0.0" que no significa nada. Distinto de un
  // bucket normal en $0 (ej. "Venta de Jugadores" cuando un club no vendió nadie ese año): esos SÍ se
  // siguen mostrando en $0, porque son categorías reales, no un artefacto de implementación como el
  // bolsón sin desglosar.
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

  // REGLA (Versión 53, pedido explícito de Guido: "las rows tienen que ser siempre iguales entre
  // clubes, aunque alguna tenga un cero" + "no puede ser que otros gastos tenga 64% del total"):
  // se agregaron las 3 filas nuevas de gastos que ya usa Boca en su Ejercicio 2027
  // (Organización de partidos / Otras secciones deportivas / Administración y gastos generales, ver
  // otrosGastos2027 más arriba en este archivo), en el MISMO orden, para que el catch-all "Otros
  // gastos" de Racing/River deje de absorber plata que en realidad tiene una categoría real
  // identificable (antes de esto, Racing tenía SOLO 4 filas de gastos, nunca las mismas que Boca
  // mostraba para 2027, que tenía 7). Mapeo real hecho en `data/racing-data.js` (ver comentario ahí
  // antes de `racingExpenseLinesByYear`) y documentado en
  // `.claude/skills/club-data-mapping/SKILL.md` sección 13.
  const GENERIC_SIMPLIFIED_EXPENSE_BUCKETS = [
    {label:'Compra de jugadores', cats:['player_amortisation','player_impairment']},
    {label:'Salarios y primas (plantel y cuerpo técnico)', cats:['wages_squad']},
    {label:'Inversiones (amortizaciones y depreciación)', cats:['depreciation','other_amortisation']},
    {label:'Organización de partidos', cats:['match_organisation_expense']},
    {label:'Otras secciones deportivas (juvenil, otros deportes, básquet)', cats:['youth_other_sports_expense']},
    {label:'Administración y gastos generales', cats:['admin_general_expense']},
    {label:'Fútbol profesional (sin desglosar por la fuente)', cats:['lump_football_operations_expense'], hideIfZero:true},
  ];

  // ACORDEÓN DE CONTROL (Versión 42, extiende a River/Racing la regla de la Versión 40, ver
  // club-data-mapping SKILL.md sección 12): cada bucket lleva `items` con las líneas reales
  // (rawLabel + amountNative, tal cual las reportó la fuente) que se sumaron para llegar a ese
  // número, anidando el desglose propio de cada línea (`line.items`) cuando existe. No se inventa
  // ningún dato nuevo: son las mismas revenueLines/expenseLines que ya alimenta "Formato del
  // club", solo agrupadas distinto.
  //
  // Extraída a función compartida en la Versión 59 (antes vivía adentro de
  // simplifiedReportForGeneric, redeclarada cada llamada): la reusa también
  // presupuestoOverlayReportFor() para que el overlay de Presupuesto de un ejercicio dual se
  // agrupe en los MISMOS buckets que el balance, en vez de quedar con sus rawLabel crudos (que no
  // encontraban match contra las filas de Formato Simplificado, mostrando "—" en casi todas las
  // filas salvo el total, bug real reportado por Guido).
  // "LA FUENTE REPORTA CERO" NO ES "LA FUENTE NO LO DESGLOSA" (to-do 20(h), Versión 172, decisión
  // de Guido). Las dos cosas se mostraban igual: un $0.
  // EL CASO QUE LO MOTIVÓ: Gamba Osaka mostraba "Televisión $0" con 5.074 de sus 8.817 M JPY en el
  // bolsón `lump_football_operations`, porque el informe de la J.League publica 3 líneas por club
  // (sponsors, entradas, y un bolsón que junta merchandising, distribución de liga, transferencias,
  // academia y femenino) y el desglose existe solo a nivel división. Un periodista que comparaba
  // Gamba con Real Madrid leía que un club de primera japonesa no cobra derechos de televisación.
  // LA REGLA: si la sección tiene un bolsón "sin desglosar por la fuente" CON PLATA ADENTRO,
  // entonces cualquier otra fila que dé cero es un "no sabemos", no un cero — esa plata puede estar
  // adentro del bolsón. Esas filas se marcan `unknown` y se pintan "—" en vez de $0.
  // POR QUÉ ES CORRECTO SER CONSERVADOR ACÁ: un club que SÍ desglosa todo y no vendió jugadores
  // muestra "Venta de Jugadores $0", y ese cero es real y se sigue mostrando — sin bolsón no hay
  // ambigüedad. La marca solo aparece cuando la propia fuente admitió que agrupa.
  // EL CATCH-ALL QUEDA AFUERA a propósito: que dé cero significa que todas las líneas encontraron
  // su fila, que es información buena, no un dato faltante.
  // NO MUEVE NINGÚN NÚMERO: las filas marcadas valen 0, así que el total de la sección es idéntico.
  function bucketize(lines, buckets, catchAllLabel){
    const bucketed = new Set(buckets.flatMap(b => b.cats));
    const LUMPS = ['lump_football_operations', 'lump_football_operations_expense'];
    const hayBolson = lines.some(l => LUMPS.includes(l.normalizedCategory) && l.amountNative !== 0);
    const rows = buckets
      .map(b => {
        const matches = lines.filter(l => b.cats.includes(l.normalizedCategory));
        const value = matches.reduce((s,l) => s + l.amountNative, 0);
        const items = matches.length ? matches.map(l => [l.rawLabel, l.amountNative, l.items || null]) : null;
        const esBolson = b.cats.some(c => LUMPS.includes(c));
        return { label:b.label, value, items, hideIfZero:b.hideIfZero,
                 unknown: hayBolson && value === 0 && !esBolson };
      })
      .filter(row => !(row.hideIfZero && row.value === 0));
    const restLines = lines.filter(l => !bucketed.has(l.normalizedCategory));
    const rest = restLines.reduce((s,l) => s + l.amountNative, 0);
    const restItems = restLines.length ? restLines.map(l => [l.rawLabel, l.amountNative, l.items || null]) : null;
    rows.push({ label:catchAllLabel, value:rest, items:restItems });
    return rows;
  }

  function simplifiedReportForGeneric(clubId, year){
    const cur = computeYearGeneric(clubId, year);
    // REGLA (Versión 61, pedido explícito de Guido: "me molesta que para Racing haya Intereses
    // netos en el card y no para el resto... toca ponerlo para todos, aunque sea 0. Es decir,
    // sumarlo al motor"): "Intereses netos" ya NO es condicional a `cur.netInterest` ser distinto
    // de cero, se suma siempre (con 0 si el club/ejercicio no tiene), para que la fila exista de
    // forma consistente entre los 3 clubes. El resto de extraRows (venta de jugadores/activos,
    // impuestos) sigue condicional: son casos genuinamente raros para la mayoría de los
    // club/ejercicio, mostrarlos siempre sería el mismo ruido que ya se evitó en la Versión 60.
    const extraRows = cur.meta.extraRows ? cur.meta.extraRows.slice() : [
      ...(cur.profitOnPlayerSales ? [{label:'Ganancia por venta de jugadores', value:cur.profitOnPlayerSales}] : []),
      ...(cur.assetSales ? [{label:'Venta de activos', value:cur.assetSales}] : []),
      {label:'Intereses netos', value:cur.netInterest||0},
      ...(cur.tax ? [{label:'Impuestos', value:cur.tax}] : []),
    ];
    return {
      resultLabel:'Resultado neto',
      ingresos: bucketize(cur.revenueLines, GENERIC_SIMPLIFIED_REVENUE_BUCKETS, 'Otras secciones deportivas y otros ingresos'),
      gastos: bucketize(cur.expenseLines, GENERIC_SIMPLIFIED_EXPENSE_BUCKETS, 'Otros gastos'),
      extraRows,
    };
  }


  // Arma el reporte nativo {ingresos, gastos, extraRows, resultLabel} de un club/ejercicio. Versión
  // 102: unificado para TODOS los clubes (Boca incluida) — el motor genérico ya guarda rawLabel tal
  // cual lo reportó la fuente (balance, presupuesto, prensa o placeholder), no hace falta traducir
  // nada, se usa directo. OJO: "gastos" de abajo ya lista TODAS las expenseLines sin filtrar, así que
  // NO hay que sumar cur.exceptionalItems ni cur.nonCash acá, son sub-sumas de esas mismas líneas (por
  // normalizedCategory) y ya están adentro; agregarlas de nuevo sería contarlas dos veces (bug real:
  // pasó con River, que sí categoriza "Amortización de pases"/"Depreciación" como líneas propias).
  // profitOnPlayerSales, assetSales, netInterest y tax SÍ vienen de otro lado (fiscalYearMeta, no de
  // expenseLines), así que esos no se duplican.
  function nativeReportFor(clubId, year){
    if(simplifyFormat) return simplifiedReportForGeneric(clubId, year);
    const cur = computeYearGeneric(clubId, year);
    // Por default, las filas debajo de Gastos se arman solas a partir de los 4 campos de meta
    // (profitOnPlayerSales/assetSales/netInterest/tax), alcanza para Racing. Si un club/ejercicio
    // necesita más de una fila ahí abajo con etiquetas propias (ej. River 2024, que tiene
    // "Resultados financieros" Y "Otros egresos" como dos líneas separadas del documento real, no
    // una sola), se puede definir meta.extraRows:[{label,value}] directo en *FiscalYearMeta y eso
    // reemplaza el armado automático (netInterest sigue alimentando el PAT real para KPIs/gráficos,
    // solo cambia cómo se muestra acá).
    // "Intereses netos" ya no es condicional, ver mismo comentario en simplifiedReportForGeneric
    // (Versión 61, pedido explícito de Guido).
    const extraRows = cur.meta.extraRows ? cur.meta.extraRows.slice() : [
      ...(cur.profitOnPlayerSales ? [{label:'Ganancia por venta de jugadores', value:cur.profitOnPlayerSales}] : []),
      ...(cur.assetSales ? [{label:'Venta de activos', value:cur.assetSales}] : []),
      {label:'Intereses netos', value:cur.netInterest||0},
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
  // i18n (to-do 27): estos mensajes se armaban como texto plano en castellano, sin pasar por
  // `t()`, así que con el sitio en inglés el único aviso de la ficha de deuda salía igual en
  // castellano. El scan de i18n de `tools/audit.js` no lo detecta y no puede: mira atributos
  // `data-i18n` y llamadas a `t()`, y esto era un template literal armado en JS. Lo encontró una
  // mirada a la pantalla.
  // POR QUÉ CON PLACEHOLDERS Y NO PARTIENDO LA FRASE: `I18N.t()` traduce una clave entera y no
  // sabe de pedazos, así que armar el mensaje concatenando fragmentos traducibles congela el orden
  // de palabras del castellano. Con `{a}`/`{b}` la frase entera es una sola unidad traducible y
  // cada idioma pone la etiqueta del ejercicio donde le corresponde.
  // SON 2 CLAVES Y NO 3: el mensaje de "solo el ejercicio actual" y el de "solo el anterior" son
  // el mismo texto con otra etiqueta adentro, así que comparten clave.
  // `t()` local: mismo one-liner que js/finanzas-render.js y js/selector.js.
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }
  function fillNote(s, a, b){ return s.replace('{a}', a).replace('{b}', b); }

  function debtDisclosureNote(curUndisclosed, curLabel, prevUndisclosed, prevLabel){
    const both = t('finanzas.debt.note.both', '⚠️ Ni el documento de {a} ni el de {b} desglosan deuda ni caja en su resumen, el $0 que ves en esas columnas NO significa que la deuda sea cero, es un dato no disponible todavía.');
    const one  = t('finanzas.debt.note.one',  '⚠️ El documento de {a} no desglosa deuda ni caja en su resumen, el $0 que ves en esa columna NO significa que la deuda sea cero, es un dato no disponible todavía.');
    if(curUndisclosed && prevUndisclosed) return fillNote(both, curLabel, prevLabel);
    if(curUndisclosed) return fillNote(one, curLabel, '');
    if(prevUndisclosed) return fillNote(one, prevLabel, '');
    return '';
  }


  function sumCat(lines, cats){
    return lines.filter(l => cats.includes(l.normalizedCategory)).reduce((s,l) => s + l.amountNative, 0);
  }


  function computeYearGeneric(clubId, year){
    // Versión 82: se sumó la 3ra rama (Vélez) a los 3 ternarios de esta función, primer club nuevo
    // desde que el motor genérico existe (antes solo river/racing) — ver nota en yearMetaFor.
    // Versión 131: sin club elegido (cold start del selector) no hay nada que computar.
    const gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    if(!gd) return null;
    const revenueLines = (gd.revenueLinesByYear[year]) || [];
    const expenseLines = (gd.expenseLinesByYear[year]) || [];
    const meta = (gd.fiscalYearMeta[year]) || {};
    const revenue = revenueLines.reduce((s,l) => s + l.amountNative, 0);
    const wages = sumCat(expenseLines, ['wages_squad']);
    // Versión 53: match_organisation_expense/youth_other_sports_expense/admin_general_expense son
    // las 3 categorías nuevas que homologan "Otros gastos" de Racing/River con Boca (ver
    // GENERIC_SIMPLIFIED_EXPENSE_BUCKETS y data/racing-data.js). Son gasto operativo en EFECTIVO,
    // igual que other_expenses/lump_football_operations_expense (no son no-efectivo como
    // depreciation/other_amortisation/player_amortisation/player_impairment, que se suman aparte en
    // `nonCash`), así que tienen que sumar acá también. BUG REAL encontrado al probar en el
    // navegador tras crear estas 3 categorías: quedaron afuera de este sumCat, así que la plata que
    // se re-etiquetó fuera de `other_expenses` desapareció de `expenses`/`ebitda`/`pat` (no solo de
    // verifyTieOuts, de TODO cálculo del sitio: KPI "Gastos", deuda, comparar gestiones), Racing
    // pasó a mostrar SUPERÁVIT en años que en realidad tuvieron déficit real. Detectado por
    // verifyTieOuts() dejando de cerrar en Revenue/Expenses Y en PAT para 2024/2025.
    const otherExpenses = sumCat(expenseLines, ['other_expenses','lump_football_operations_expense','match_organisation_expense','youth_other_sports_expense','admin_general_expense']);
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
    const yearLabel = ejercicioLabel(year, meta.reportType, clubId);
    return { clubId, year, yearLabel, meta, revenueLines, expenseLines, revenue, wages, otherExpenses, expenses, ebitda, exceptionalItems, playerAmortisation, playerImpairment, depreciation, otherAmortisation, nonCash, operatingProfit, profitOnPlayerSales, assetSales, ebit, netInterest, pbt, tax, pat, wagesToTurnover, grossDebt, cash, netDebt };
  }


  // REGLA (Versión 56, pedido explícito de Guido: "en el menu dropdown de Anio, poneme siempre
  // entre parentesis si: Presupuesto, Presupuesto y Balance, Placeholder. No salgas de esas
  // opciones"): el `<select>` "Año" usa EXACTAMENTE uno de estos 3 sufijos, nunca otro texto
  // (quedan afuera "(presupuestado)", "(esperando datos)", "(estimado)", que son las 3 variantes
  // sueltas que había antes de esta versión, cada una redactada distinto según quién la escribió).
  // Un ejercicio de balance real (`official_balance_sheet` u `official_budget_and_balance`... si
  // algún día se carga un ejercicio con las dos fuentes, ver nota abajo) NO lleva sufijo: la
  // ausencia de paréntesis ES la 4ta opción implícita ("esto es un balance real, lo normal"), no
  // hace falta anunciarla. `unofficial_mirror` (River 2024, balance real pero conseguido en una
  // réplica no oficial) tampoco lleva sufijo, por el mismo criterio: sigue siendo un balance real,
  // la advertencia de fuente no oficial ya vive en su propio banner de calidad de dato, no en el
  // dropdown. `pending_official` (ejercicio real que el club todavía no publicó, ver
  // `reportTypeForYear` abajo) se trata como Placeholder acá a propósito: no hay una 4ta palabra
  // permitida para ese caso, y de cara al visitante ambos se ven igual (todo en $0, sin fuente
  // real todavía), el detalle de la diferencia sigue explicado en el banner de calidad de dato.
  //
  // "(Presupuesto y Balance)" es para un ejercicio que tiene LAS DOS fuentes reales cargadas a la
  // vez (ej. un presupuesto que ya cerró y además consiguió su balance auditado, sin que se haya
  // reemplazado un dato por el otro). Al escribir esta regla ningún ejercicio de ningún club usa
  // este caso todavía (Guido creía que Racing tenía uno, se revisó `racingFiscalYearMeta` entero y
  // los 7 ejercicios cargados son cada uno SOLO balance o SOLO presupuesto, nunca los dos), así que
  // hoy esta rama nunca se dispara en la práctica, queda lista para cuando corresponda: usar el
  // `reportType` `'official_budget_and_balance'` en `*FiscalYearMeta`/`reportTypeForYear('boca', ...)`
  // el día que se cargue un ejercicio así.
  // REGLA (Versión 61, pedido explícito de Guido: "agregar Balance como opción, la cual aplica
  // para todos los años que tenes sin nada en paréntesis"): la 4ta opción, antes implícita ("sin
  // paréntesis" = balance real, ver comentario arriba), ahora se anuncia explícito como
  // "(Balance)", mismo criterio de siempre para `official_balance_sheet`/`unofficial_mirror`
  // (y cualquier otro reportType no listado arriba). Sigue siendo SOLO 4 palabras posibles, nunca
  // una 5ta inventada para un caso puntual.
  // i18n (to-do 44, mismo patrón que ejercicioLabel() en el to-do 42): las 4 palabras son texto
  // propio de esta función, no pasan por ejercicioLabel() aunque compartan concepto (ejercicioLabel
  // dice "Balance"/"Presupuesto" a secas como PREFIJO del header de la tabla; acá es un SUFIJO entre
  // paréntesis del <select>, y "Presupuesto y Balance"/"Placeholder" no tienen equivalente ahí).
  function anioDropdownSuffix(reportType){
    if(reportType === 'official_budget') return t('ejercicio.dropdown.budget', ' (Presupuesto)');
    if(reportType === 'official_budget_and_balance') return t('ejercicio.dropdown.budgetAndBalance', ' (Presupuesto y Balance)');
    if(reportType === 'placeholder' || reportType === 'pending_official') return t('ejercicio.dropdown.placeholder', ' (Placeholder)');
    return t('ejercicio.dropdown.balance', ' (Balance)');
  }


  // Parte un texto de header de tabla en líneas (<br>) en puntos elegidos a mano, para que columnas
  // angostas (Estado de resultados, Versión 61) lean legible en vez de partirse letra por letra con
  // `overflow-wrap:break-word` (bug real reportado por Guido con captura: "BALANC/E", "PRESUPU/ESTO"
  // partiendo el diptongo "ue"). REGLA (Versión 65, generalizada explícitamente por Guido a "todos
  // los años y clubes" — primero para "Presupuesto AAAA/AAAA", después para "Presupuesto" SOLA en
  // la columna de overlay, mismo criterio en los dos casos, no una excepción para cada uno):
  // NINGUNA palabra se parte nunca, ni siquiera "Presupuesto" (la única más larga que
  // "Balance"/"Ejercicio", que antes se partía en "Presu"/"puesto" porque no entraba en el ancho fijo
  // de 100px de la columna). Cada palabra va envuelta en un `<span style="white-space:nowrap">`, así
  // el propio `overflow-wrap:break-word` del `<th>` (que sigue haciendo falta como red de seguridad
  // para un texto no previsto acá) no la parte sola en un punto feo tipo "PRESUPUES"/"TO" o
  // "PRESUPU"/"ESTO". El `nowrap` fuerza esa línea a un solo renglón aunque desborde unos px hacia
  // la celda vecina (espacio en blanco de su padding, verificado en pantalla que no pisa el texto
  // "% del total" ni en "Presupuesto 2026/2027" ni en "Presupuesto" sola). Con espacio en el texto
  // (ej. "Balance 2019/2020"), el corte de línea sigue siendo en el primer espacio: prefijo entero
  // en la 1ra línea, el resto en la 2da. Sin espacio (ej. "Presupuesto" sola, columna de overlay),
  // es una sola línea, ya no 2 — antes de esta versión esa columna medía distinto (2 líneas) que la
  // columna principal con año (2 líneas también, pero por partir diferente), ahora las dos miden lo
  // que corresponda a su propio contenido, sin forzar una cantidad de líneas pareja entre columnas.
  // No es una función de wrap genérica (no busca el "mejor" punto de corte): son los casos reales
  // que hoy arma esta tabla, agregar uno nuevo si aparece un texto que lo necesite.
  function wrapHeaderLabel(text){
    const spaceIdx = text.indexOf(' ');
    if(spaceIdx === -1) return '<span style="white-space:nowrap">'+text+'</span>';
    const prefix = text.slice(0, spaceIdx), rest = text.slice(spaceIdx+1);
    return '<span style="white-space:nowrap">'+prefix+'</span><br>'+rest;
  }


  // reportType de un club/ejercicio, sin pasar por computeYearGeneric, lo usa renderSupuestosCard()
  // para saber qué mensaje mostrar cuando el ejercicio no tiene supuestos declarados (distinto texto
  // para "es un balance, no un presupuesto" vs. "todavía es placeholder"). Lee directo de
  // <club>FiscalYearMeta[year].reportType (ver data/<club>-data.js).
  function reportTypeForYear(clubId, year){
    const table = ((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta || {};
    return ((table[year]) || {}).reportType || 'placeholder';
  }


  // Calcula el P&L de un ejercicio para cualquier club (Versión 102: Boca incluida, motor genérico
  // único). Se mantiene esta función wrapper (en vez de llamar computeYearGeneric directo en cada
  // call site) por si algún día hace falta volver a bifurcar por club.
  function computeYearForClub(clubId, year){
    return computeYearGeneric(clubId, year);
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
  // `|| {}` (Versión 112): defensivo contra un club onboardeado sin gestionesByClub[clubId] —
  // devuelve null en vez de tirar TypeError. El consumidor que motivó esa defensa
  // (`renderInicioStats()`, los KPIs de Inicio) se borró en la Versión 184; los que quedan
  // (Finanzas y Comparar Gestiones) dependen igual de que esto no explote.
  function currentGestionKey(clubId){
    const gestiones = gestionesByClub[clubId] || {};
    return Object.keys(gestiones).reduce((best,k) => (!best || gestiones[k].lastYear > gestiones[best].lastYear) ? k : best, null);
  }


  function pasesNetSpend(clubId, gestionKey){
    const data = pasesDataForClub(clubId) || [];
    return data.filter(r => r.gestion === gestionKey && r.tipo === 'Jugador').reduce((s,r) => s+r.monto, 0);
  }


  // ---------- INICIO: gráficos de evolución (Ingresos/Gastos/Deuda), TODOS los ejercicios del club ----------
  // A diferencia de gestionesByClub (que solo cubre el rango de UNA gestión), esto cubre TODO el
  // rango del club de punta a punta: del año más viejo al más nuevo que exista en CUALQUIER lugar de
  // sus datos (real o placeholder), sin saltear ningún año del medio aunque no haya ninguna entrada
  // cargada para él.
  function allYearsRangeForClub(clubId){
    // Versión 131: sin club elegido devuelve un rango vacío, no una lista de NaN.
    const table = ((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta;
    if(!table) return [];
    const years = Object.keys(table).map(Number);
    const min = Math.min(...years), max = Math.max(...years);
    const range = [];
    for(let y=min; y<=max; y++) range.push(y);
    return range;
  }

  // "blank" (sin documento, placeholder o pending_official: no se dibuja nada ese año), "balance"
  // (hay balance auditado real de ese ejercicio, exista o no ADEMÁS un presupuesto del mismo año) o
  // "presupuesto" (solo hay presupuesto, sin balance real todavía). Reusa reportTypeForYear (más
  // arriba en este archivo), que ya unifica los 3 clubes incluido el caso hardcodeado de Boca — no
  // se reimplementa ese mapeo acá. Un ejercicio `official_budget_and_balance` (Racing 2017/2018,
  // 2019/2020, etc.) da 'balance': el balance sigue siendo SIEMPRE el dato primario que lee
  // computeYearForClub/simplifiedReportForClub (el presupuesto de esos años vive aparte, en
  // `racingPresupuestoOverlayByYear`, un dato que estas funciones nunca leen), así que estos
  // gráficos de Inicio automáticamente prefieren Balance por sobre Presupuesto cuando hay los dos,
  // sin ninguna lógica extra acá.
  function yearKindForClub(clubId, year){
    const rt = reportTypeForYear(clubId, year);
    if(rt === 'placeholder' || rt === 'pending_official') return 'blank';
    if(rt === 'official_budget') return 'presupuesto';
    return 'balance';
  }

  // "Formato simplificado" de cualquier club, misma función que ya usa nativeReportFor() cuando el
  // toggle está activo — acá se llama SIEMPRE (sin depender del toggle global `simplifyFormat`),
  // porque los gráficos de Inicio necesitan las categorías homologadas entre clubes (ver
  // `club-data-mapping/SKILL.md` sección 13), no el desglose "tal cual la fuente".
  function simplifiedReportForClub(clubId, year){
    return simplifiedReportForGeneric(clubId, year);
  }

  // EL COLOR DE CADA CATEGORÍA de "Formato Simplificado". MISMOS labels que ya arman
  // GENERIC_SIMPLIFIED_*_BUCKETS (ver esas definiciones más arriba en este archivo) — no se
  // inventa vocabulario nuevo acá, solo se le suma un color fijo a cada categoría.
  // OJO CON EL NOMBRE, que quedó viejo y conviene no creerle (Versión 184): nació para los
  // gráficos apilados de Inicio, que YA NO EXISTEN (Inicio es la bifurcación más la vidriera
  // de rankings de liga). Su único consumidor hoy es `colorDeRubro()` en js/selector.js, que
  // pinta la composición de ingresos de la pestaña Comparar. Se conserva el nombre para no
  // tocar ese archivo por una constante; si algún día se renombra, es ahí donde hay que mirar.
  // Su par de GASTOS (`INICIO_GASTOS_BUCKETS`) se borró en la 184: se quedó sin consumidor.
  const INICIO_INGRESOS_BUCKETS = [
    {label:'Cuotas Sociales', color:'#0a2b5c'},
    {label:'Comercial / Sponsors', color:'#f2b705'},
    {label:'Estadio: recaudación de partidos', color:'#1b7a3d'},
    {label:'Televisión', color:'#8a5cf6'},
    {label:'Premios por competencias', color:'#2b8a99'},
    {label:'Abonos', color:'#e07b39'},
    {label:'Venta de Jugadores', color:'#b5372b'},
    {label:'Fútbol profesional (sin desglosar por la fuente)', color:'#c2185b'},
    {label:'Otras secciones deportivas y otros ingresos', color:'#6b6b6b'},
  ];
  // ACÁ VIVÍAN LAS 4 COSAS QUE ALIMENTABAN LOS GRÁFICOS DE INICIO, y ya no existen
  // (Versión 184, to-do 33): `INICIO_GASTOS_BUCKETS`, `lastAvailableYearForClub()`,
  // `inicioStackedSeriesForClub()` y `inicioDeudaSeriesForClub()`. Inicio dejó de mostrar
  // el club activo. Están en git antes de la 184 si hacen falta.
  //
  // LO QUE QUEDÓ SIN CONSUMIDOR Y NO SE BORRÓ, a propósito y como decisión explícita (ver
  // to-do 43): `allYearsRangeForClub()` y `yearKindForClub()`, unas líneas más arriba. Son
  // helpers genéricos del motor, no de Inicio, y `yearKindForClub()` es además la única
  // rama del código que distingue `placeholder` de `pending_official`, que `ESTADO.md`
  // documenta como estados válidos a propósito. Borrarlos es una decisión de Guido, no un
  // efecto colateral de haber sacado una pantalla.



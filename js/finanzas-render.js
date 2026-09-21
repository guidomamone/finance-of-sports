// ============================================================================
// js/finanzas-render.js — capa de RENDER de Finanzas: arma HTML, dibuja los
// gráficos (Chart.js) y actualiza el DOM a partir de los datos YA
// calculados por js/finanzas-calc.js. Incluye los selectores/tabs de
// Pases, Resultados, Comparar e Inicio (mismo criterio: pintan, no
// calculan).
//
// Nota de alcance (Versión 51): un puñado de funciones puente
// (buildNativeSectionHtml, renderFinanzasStats*Generic,
// update*ByGestion/ByAnio*Generic) calculan un par de valores derivados
// chicos (% del total, crecimiento vs. año anterior) EN el mismo paso en
// que arman el HTML, en vez de separarse en un sub-paso de cálculo puro.
// Es una decisión deliberada, no un descuido: separar ese cálculo a mano
// exigía tocar el cuerpo interno de funciones financieras ya verificadas
// (ver finance-of-sports/.claude/skills/club-data-mapping/SKILL.md, historial
// real de bugs de doble conversión al generalizar este mismo código de
// Boca a River/Racing), y el riesgo no se justificaba solo para mover
// archivos. Si se necesita cálculo puro reusable de estos valores más
// adelante, extraerlo recién ahí, con su propia verificación en el browser.
//
// Extraído de index.html (Versión 51, limpieza de arquitectura antes de
// seguir agregando clubes), mismo código exacto, sin cambiar comportamiento.
//
// Orden de carga: después de js/finanzas-calc.js (llama a sus funciones) y
// de los data/*.js, antes del <script> principal de index.html (que llama
// a refreshFinanzas/refreshAllForClub, definidas ahí, que a su vez llaman a
// las funciones de este archivo).
// ============================================================================

  let trendChartInst = null, breakdownChartInst = null;
  let inicioIngresosChartInst = null, inicioGastosChartInst = null, inicioDeudaChartInst = null;


  // % de cada porción dibujado ARRIBA de la porción del pie/doughnut (no en la leyenda. Chart.js no
  // lo trae de fábrica, así que se dibuja a mano tomando el ángulo medio y el radio medio de cada
  // arco). Se omiten las porciones muy chicas (<5%): el texto no entra y se superpondría con la de al
  // lado. Contorno oscuro + relleno blanco para que se lea encima de cualquier color de porción.
  const pctSliceLabelsPlugin = {
    id: 'pctSliceLabels',
    afterDraw(chart){
      const meta = chart.getDatasetMeta(0);
      if(!meta || !meta.data || !meta.data.length) return;
      const values = chart.data.datasets[0].data;
      const total = values.reduce((s,v) => s + Math.abs(v||0), 0);
      if(!total) return;
      const {ctx} = chart;
      ctx.save();
      ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      meta.data.forEach((arc, i) => {
        const pct = Math.round(Math.abs(values[i]||0) / total * 100);
        if(pct < 5) return;
        const {startAngle, endAngle, innerRadius, outerRadius, x, y} = arc.getProps(['startAngle','endAngle','innerRadius','outerRadius','x','y'], true);
        const midAngle = (startAngle + endAngle) / 2;
        const r = (innerRadius + outerRadius) / 2;
        const px = x + Math.cos(midAngle) * r, py = y + Math.sin(midAngle) * r;
        const label = pct + '%';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0,0,0,.55)';
        ctx.strokeText(label, px, py);
        ctx.fillStyle = '#fff';
        ctx.fillText(label, px, py);
      });
      ctx.restore();
    }
  };


  // Glosario de términos contables/de fútbol que aparecen tal cual el club los escribió en algún
  // desglose (revenueBreakdown/expenseSubBreakdown/items) y pueden no ser obvios para un hincha o
  // periodista sin trasfondo contable. La clave es el label EXACTO tal cual aparece en el desglose;
  // el value es el texto que se muestra como tooltip nativo (title=) al pasar el mouse por la fila.
  // Se aplica automáticamente en `renderBreakdownRows` a CUALQUIER fila cuyo label matchee, así que
  // alcanza con agregar una entrada acá, no hace falta tocar cada lugar donde ese label se pinta.
  const rowGlossary = {
    'Amortizacion Plantel Futbol Profesional - Compras': 'Amortización del costo de los pases de jugadores COMPRADOS a otros clubes: el club capitaliza ese costo como activo intangible al firmar al jugador, y lo va llevando a resultados (gasto) en cuotas iguales repartidas a lo largo de la duración de su contrato, en vez de cargarlo todo de una vez en el año de la compra.',
    'Amortizacion Plantel Futbol Profesional - Inferiores': 'Amortización de jugadores surgidos de las Inferiores (juveniles) del propio club: aunque no hubo un pase comprado a otro club, el club igual capitaliza un costo asociado a esos jugadores al firmarles su primer contrato profesional, y lo amortiza en cuotas de la misma manera que a un jugador comprado.',
  };

  function labelWithGlossary(label){
    const tip = rowGlossary[label];
    return tip ? `<span title="${tip.replace(/"/g,'&quot;')}" style="cursor:help;border-bottom:1px dotted currentColor;">${label}</span>` : label;
  }


  // Pinta las filas de un desglose de sub-items, recursivamente: cada item es [label, value] o
  // [label, value, subItems] (mismo formato que expenseSubBreakdown/revenueBreakdown). Un item con
  // subItems se pinta como su propio acordeón anidado (flecha + onclick propio), así una categoría
  // como "Fútbol Profesional" puede desglosarse en sub-gerencias, y cada sub-gerencia a su vez en
  // línea de gasto, sin perder ningún nivel del documento original.
  // sectionTotal: el Total Ingresos/Total Gastos de la sección, el % de un sub-ítem se calcula
  // contra ESE total (no contra el total de su categoría padre), mismo criterio "common-size" que
  // las filas de primer nivel en buildNativeSectionHtml.
  function renderBreakdownRows(items, parentRowId, depth, meta, targetCurrency, sectionTotal){
    return items.map((it, i) => {
      const label = it[0], val = nativeDisplayVal(it[1], meta, targetCurrency), subItems = it[2];
      const indent = 30 + depth*16;
      const pctCell = `<td>${fmtPctOfTotal(val, sectionTotal)}</td>`;
      if(subItems && subItems.length){
        const childRowId = parentRowId+'-'+i;
        const childHtml = renderBreakdownRows(subItems, childRowId, depth+1, meta, targetCurrency, sectionTotal);
        return `<tr data-group="${parentRowId}" data-owngroup="${childRowId}" class="pl-breakdown-row pl-clickable" style="display:none;" onclick="toggleRevenueBreakdown('${childRowId}', this)">
          <td style="padding-left:${indent}px;"><span class="pl-arrow">&#9656;</span>${labelWithGlossary(label)}</td><td>${fmtDisplay(val)}</td>${pctCell}<td></td><td></td>
        </tr>` + childHtml;
      }
      return `<tr data-group="${parentRowId}" class="pl-breakdown-row" style="display:none;">
        <td style="padding-left:${indent}px;">${labelWithGlossary(label)}</td><td>${fmtDisplay(val)}</td>${pctCell}<td></td><td></td>
      </tr>`;
    }).join('');
  }


  // Pinta una sección (Ingresos o Gastos): encabezado, cada categoría (con acordeón si tiene
  // sub-items), y una fila de total. Devuelve el html y el total ya en la moneda a mostrar, para
  // que el llamador pueda sumar Ingresos + Gastos + extraRows y obtener el resultado final.
  // REGLA (Versión 60, pedido explícito de Guido: "para presupuesto, dame tambien % del total. O
  // sea, dos columnas que sean % del total"): cada columna de valor (Actual y Presupuesto) tiene
  // ahora su PROPIA columna de % al lado, calculada contra el total de ESA columna (no contra el
  // total de la columna Actual) — 5 celdas por fila en vez de 4: Rubro, Actual, % Actual,
  // Presupuesto, % Presupuesto.
  function buildNativeSectionHtml(sectionLabel, curList, prevList, meta, prevMeta, targetCurrency, groupPrefix){
    const findPrevRow = (label) => { if(!prevList) return null; return prevList.find(x => x.label === label) || null; };
    const findPrevVal = (label) => { const m = findPrevRow(label); return m ? m.value : null; };
    // to-do 20(h): `unknown` lo pone bucketize() cuando la sección tiene un bolsón "sin desglosar
    // por la fuente" con plata adentro y esta fila da cero — o sea que el cero es un "no sabemos",
    // no un cero. Se pinta "—", el mismo carácter que ya usa la tabla para "no hay columna
    // anterior", y el % también, porque un porcentaje de un dato que no existe no significa nada.
    const celdaValor = (row, val) => row && row.unknown ? '—' : fmtDisplay(val);
    const celdaPct = (row, val, tot) => row && row.unknown ? '—' : fmtPctOfTotal(val, tot);
    // El total tiene que estar calculado ANTES de generar el HTML de cada fila (para poder mostrar
    // el % de cada una contra el total ya cerrado), antes se acumulaba fila por fila en el mismo
    // paso en el que se generaba su HTML, así que ninguna fila conocía el total final todavía.
    const total = curList.reduce((s,c) => s + nativeDisplayVal(c.value, meta, targetCurrency), 0);
    const totalPrev = prevList ? prevList.reduce((s,c) => s + nativeDisplayVal(c.value, prevMeta, targetCurrency), 0) : null;
    const rowsHtml = curList.map((c, i) => {
      const curVal = nativeDisplayVal(c.value, meta, targetCurrency);
      const prevRaw = findPrevVal(c.label);
      const prevVal = prevRaw !== null ? nativeDisplayVal(prevRaw, prevMeta, targetCurrency) : null;
      const prevRow = findPrevRow(c.label);
      const pctCell = `<td>${celdaPct(c, curVal, total)}</td>`;
      const prevPctCell = `<td>${prevVal !== null && totalPrev !== null ? celdaPct(prevRow, prevVal, totalPrev) : '—'}</td>`;
      if(c.items && c.items.length){
        const rowId = groupPrefix+'-'+i;
        const itemsHtml = renderBreakdownRows(c.items, rowId, 0, meta, targetCurrency, total);
        return `<tr class="pl-clickable" onclick="toggleRevenueBreakdown('${rowId}', this)">
          <td><span class="pl-arrow">&#9656;</span>${tLabel(c.label)}</td>
          <td>${celdaValor(c, curVal)}</td>
          ${pctCell}
          <td>${prevVal !== null ? celdaValor(prevRow, prevVal) : '—'}</td>
          ${prevPctCell}
        </tr>` + itemsHtml;
      }
      return `<tr${c.unknown ? ' class="pl-nodato"' : ''}>
        <td>${tLabel(c.label)}</td>
        <td>${celdaValor(c, curVal)}</td>
        ${pctCell}
        <td>${prevVal !== null ? celdaValor(prevRow, prevVal) : '—'}</td>
        ${prevPctCell}
      </tr>`;
    }).join('');
    const headHtml = `<tr class="pl-section-head"><td colspan="5">${sectionLabel}</td></tr>`;
    const totalHtml = `<tr class="pl-bold pl-shade"><td>Total ${sectionLabel}</td><td>${fmtDisplay(total)}</td><td>${fmtPctOfTotal(total, total)}</td>` +
      `<td>${totalPrev !== null ? fmtDisplay(totalPrev) : '—'}</td>` +
      `<td>${totalPrev !== null ? fmtPctOfTotal(totalPrev, totalPrev) : '—'}</td></tr>`;
    // totalPrev se devuelve para que renderNativePLTable() pueda armar el Resultado Neto DEL
    // PRESUPUESTO (Ingresos - Gastos de esa misma columna), no solo el del Balance (Versión 60,
    // Guido: "que resultado neto tenga un numero, no me lo dejes incompleto").
    return { html: headHtml + rowsHtml + totalHtml, total, totalPrev };
  }


  // Reescribe el <colgroup> de #finanzasPLTable según si el ejercicio tiene overlay de Presupuesto
  // o no (Versión 39, criterio de cuándo llamarla actualizado en la Versión 57: antes era Año a
  // año vs. Por gestión). NECESARIO además de la regla CSS que oculta th/td de la 4ta columna
  // cuando no hay overlay (`pl-hide-compare`): probado en el navegador con getBoundingClientRect,
  // en dos vueltas,
  // 1) un <col> con `display:none` NO libera su ancho fijo en `table-layout:fixed` (Rubro seguía
  //    midiendo lo mismo con o sin esa regla).
  // 2) SACAR directamente esos <col> del colgroup TAMPOCO alcanza: la fila de encabezado de sección
  //    (`buildNativeSectionHtml`, `<td colspan="N">`) sigue escribiendo el mismo colspan sin
  //    importar el modo, así que el motor de tablas del navegador sigue viendo esa cantidad de
  //    columnas reales (por esa fila) aunque el colgroup describa menos, y como Rubro Y las
  //    columnas "de más" quedan TODAS sin ancho explícito, el navegador reparte el espacio sobrante
  //    en partes IGUALES entre todas (confirmado midiendo antes/después).
  // Fix real: el <colgroup> SIEMPRE tiene que declarar la MISMA cantidad de columnas que el
  // `colspan` de la fila de encabezado de sección y que las celdas reales de cada fila de datos
  // (hoy: 4, ver REGLA de la Versión 59 abajo), pero la columna oculta cuando no hay overlay lleva
  // un ancho EXPLÍCITO de 0 (no se saca del colgroup, se le pone width:0), así es la ÚNICA con
  // ancho fijo salvo Rubro, que sigue siendo la única columna sin ancho y se lleva TODO el espacio
  // sobrante ella sola, sin repartirlo con nadie.
  // Se llama SIEMPRE junto con el classList.toggle('pl-hide-compare') de #finanzasPLTable, ambos
  // adentro de `renderNativePLTable()` desde la Versión 57 (antes vivían sueltos en cada uno de los
  // 4 call sites que llamaban a esa función).
  // REGLA (Versión 60, pedido explícito de Guido: "para presupuesto, dame tambien % del total. O
  // sea, dos columnas que sean % del total" + "para leer 'presupuesto' de forma entera, tengo que
  // scrollear a la derecha... desliza las columnas apenas a la izquierda para que no haya que
  // scrollear. esto tambien deberia ser regla"): quedan 5 columnas (Rubro, Actual, % Actual,
  // Presupuesto, % Presupuesto), pero los 4 anchos numéricos se angostaron (100/65 → 78/40) respecto
  // a la Versión 59 para que, sumados, entren en el ancho del card sin scroll horizontal — la 5ta
  // columna nueva no puede simplemente sumarse con los anchos viejos o se repite el problema. Regla
  // general para cualquier columna nueva que se agregue a esta tabla en el futuro: el ancho de las
  // columnas EXISTENTES tiene que angostarse en la misma medida que se agranda el total, nunca
  // asumir que "hay lugar" sin volver a mirar el ancho real del card en el navegador.
  // REGLA (Versión 61, pedido explícito de Guido: "lo ideal es que todas las columnas tengan el
  // mismo width y que permita que se lea bien"): las 4 columnas numéricas comparten el MISMO ancho
  // (100px, antes alternaban 84/54/84/54 según fuera Actual/Presupuesto o su "% del total"). 100px
  // sale de medir en el navegador (getComputedStyle + un <span> de prueba con la misma fuente) el
  // texto más ancho que puede aparecer en una sola línea de header con el wrap a propósito de
  // `wrapHeaderLabel` (js/finanzas-calc.js): un rango de años tipo "2026/2027" mide ~69px + 24px de
  // padding del `<th>` (9px 12px) ≈ 93px, "Ejercicio"/"Balance" miden menos. El ancho uniforme +
  // esos headers partidos a propósito (más "% del<br>total") reemplazan el wrap automático
  // letra-por-letra que hacía ilegible el header en columnas angostas.
  function syncPLTableColgroup(hideCompare){
    const colgroup = document.querySelector('#finanzasPLTable colgroup');
    colgroup.innerHTML = hideCompare
      ? '<col><col style="width:100px"><col style="width:100px"><col style="width:0"><col style="width:0">'
      : '<col><col style="width:100px"><col style="width:100px"><col style="width:100px"><col style="width:100px">';
  }


  // REGLA (Versión 57, pedido explícito de Guido: "no existe la columna de comparación... la
  // habíamos eliminado hace rato" + "para cuando un mismo año tenga both presupuesto y balance, en
  // estado de resultado agregá una columna que sea Balance"): esta función YA NO compara el
  // ejercicio actual contra OTRO año (esa comparación se sacó del todo, de los 3 clubes y los 2
  // modos). La 2da columna ahora es, exclusivamente, el overlay de Presupuesto de ESE MISMO
  // ejercicio, cuando existe (`presupuestoOverlayReportFor`, `js/finanzas-calc.js`) — un ejercicio
  // con `reportType:'official_budget_and_balance'` en `*FiscalYearMeta` (el balance real es el dato
  // PRIMARIO de siempre: KPIs, Formato Simplificado, verifyTieOuts salen de ahí, no del overlay).
  // Para el 99% de los ejercicios (sin overlay) la 2da columna directamente no se pinta, igual que
  // antes se ocultaba en "Año a año" vía `pl-hide-compare`, solo que ahora es SIEMPRE así salvo que
  // el ejercicio puntual tenga las 2 fuentes, sin importar si se está mirando "Año a año" o "Por
  // gestión". Ver `.claude/skills/club-or-year-onboarding/SKILL.md` sección 11 para el detalle
  // completo (incluida la limitación real: el emparejamiento de filas Balance-vs-Presupuesto es por
  // `rawLabel` exacto, así que un rubro que cambia de nombre entre los dos documentos no muestra
  // Var./Var. %, mismo comportamiento que ya tenía la comparación año-contra-año vieja).
  function renderNativePLTable(clubId, year, curLabel, containerId){
    const curMeta = yearMetaFor(clubId, year);
    const curReport = nativeReportFor(clubId, year);
    const overlayReport = presupuestoOverlayReportFor(clubId, year);
    const overlayMeta = overlayReport ? presupuestoOverlayMetaFor(clubId, year) : null;

    // innerHTML (no textContent) + wrapHeaderLabel (js/finanzas-calc.js): fuerza el corte de
    // línea en un punto elegido a mano (Versión 61, ver comentario de esa función), en vez de
    // dejar que `overflow-wrap:break-word` parta la palabra letra por letra en columnas angostas.
    // REGLA (Versión 65, pedido explícito de Guido viendo Racing 2019/2020: "solamente dice
    // PRESUPUESTO, agregá el año también, como en el resto de los casos. Es una regla"): el header
    // de la columna de overlay lleva el año, igual que la columna principal — el overlay es SIEMPRE
    // el presupuesto de ESE MISMO `year` (ver comentario de `presupuestoOverlayReportFor`), nunca de
    // otro ejercicio, así que reusa `ejercicioLabel(year, 'official_budget')` (`js/finanzas-calc.js`)
    // para armar "Presupuesto AAAA/AAAA" con el mismo formato que cualquier otro prefijo+año.
    document.getElementById(containerId+'CurLabel').innerHTML = wrapHeaderLabel(curLabel);
    document.getElementById(containerId+'PrevLabel').innerHTML = overlayReport ? wrapHeaderLabel(ejercicioLabel(year, 'official_budget', clubId)) : '—';
    document.getElementById(containerId).classList.toggle('pl-hide-compare', !overlayReport);
    syncPLTableColgroup(!overlayReport);

    const ing = buildNativeSectionHtml(t('section.revenue','Ingresos'), curReport.ingresos, overlayReport ? overlayReport.ingresos : null, curMeta, overlayMeta, currentCurrency, containerId+'-ing');
    const gas = buildNativeSectionHtml(t('section.expenses','Gastos'), curReport.gastos, overlayReport ? overlayReport.gastos : null, curMeta, overlayMeta, currentCurrency, containerId+'-gas');

    // "SIN DATO" NO ES CERO, TAMBIÉN ACÁ (Versión 152, to-do 31). Los 10 clubes
    // japoneses tienen `expenseLines: []` y `officialTotalExpenses: null`: la J.League
    // publica el ingreso de cada club y no su estructura de costos. Sin este test la
    // tabla dibuja la lista entera de rubros en 0,0 y cierra con "Total Gastos 0,0" y
    // un "Resultado neto" igual a los ingresos — no un dato incompleto, uno FALSO.
    // Arriba, los KPIs ya dicen "Sin dato" desde esta misma versión; sin esto, las dos
    // mitades de la misma pantalla se contradecían.
    const cGastos = (typeof computeYearGeneric === 'function') ? computeYearGeneric(clubId, year) : null;
    const sinGastos = !!cGastos
                   && !(cGastos.expenseLines || []).length
                   && (cGastos.meta || {}).officialTotalExpenses == null
                   && !cGastos.expenses && !cGastos.nonCash;
    const gastosHtml = sinGastos
      ? `<tr class="pl-section-head"><td colspan="5">${t("section.expenses","Gastos")}</td></tr>`
        + `<tr class="pl-nodata"><td colspan="5">${t('pl.sin.gastos','La fuente de este ejercicio publica los ingresos del club pero no su estructura de costos, así que no hay gastos que mostrar. No es que sean cero: no están informados.')}</td></tr>`
      : gas.html;

    // REGLA (Versión 54, pedido explícito de Guido: "en el card de Estado de resultado de Boca,
    // ponés 'intereses netos, impuestos' y un copy abajo. quitalo, y quede igual para todos los
    // clubes, todos los años") — REVERTIDA PARCIALMENTE en la Versión 60: Guido detectó que Racing
    // 2020 mostraba Ingresos 32,9 / Gastos 39,8 / Resultado neto -3,7 ("no da la cuenta. qué pasa?
    // por qué esto no saltó en ningún chequeo tuyo? es elemental") — el número final SIEMPRE fue
    // correcto (-277,059572 ARS M / 73,98 = -3,746 ≈ -3,7, ya validado por verifyTieOuts), lo que
    // estaba mal era mostrar Ingresos y Gastos sin ningún rastro visible de por qué no suman
    // Resultado Neto: `extraTotal` (acá, Intereses netos ≈ +3,08 M USD) se sumaba pero nunca se
    // pintaba. Ahora las filas de extraRows SÍ se muestran de nuevo, pero solo cuando su valor no es
    // cero (así un club/año sin esta fila — la mayoría — no gana una fila "Intereses netos: 0" sin
    // sentido). Esto es una única función compartida por los 3 clubes y cualquier año/toggle, así que
    // el cambio es automáticamente igual para todos, sin nada condicional por club/año.
    const extraTotal = (curReport.extraRows||[]).reduce((s,e) => s + nativeDisplayVal(e.value, curMeta, currentCurrency), 0);
    // REGLA (Versión 61, pedido explícito de Guido: "toca ponerlo para todos, aunque sea 0"):
    // "Intereses netos" es la única extraRow que se muestra SIEMPRE, incluso en $0 — las demás
    // (Impuestos, Venta de activos, Ganancia por venta de jugadores) siguen ocultas en $0 (Versión
    // 60, evitar ruido para casos raros). El motor (js/finanzas-calc.js) ya arma "Intereses netos"
    // sin condicional, así que esta excepción solo decide qué se PINTA, no qué se calcula.
    const extraRowsHtml = (curReport.extraRows||[]).map(e => {
      const v = nativeDisplayVal(e.value, curMeta, currentCurrency);
      if(v === 0 && e.label !== 'Intereses netos') return '';
      return `<tr><td>${tLabel(e.label)}</td><td>${fmtDisplay(v)}</td><td>—</td><td>—</td><td>—</td></tr>`;
    }).join('');

    const resultado = sinGastos ? null : (ing.total + gas.total + extraTotal);
    // REGLA (Versión 60, pedido explícito de Guido: "para presupuesto... que resultado neto tenga
    // un numero, no me lo dejes incompleto"): el Resultado Neto de la columna Presupuesto es la
    // suma directa de sus propias revenueLines/expenseLines (`ing.totalPrev + gas.totalPrev`), SIN
    // sumarle ningún extraTotal — el overlay no tiene su propio concepto de extraRows separado, sus
    // líneas "extraordinarias" ya viven adentro de revenueLines/expenseLines como líneas normales
    // (ver nota en `data/racing-data.js`, `racingPresupuestoOverlayByYear[2020]`, corregida en esta
    // misma versión para que sea así en las 2 columnas).
    const resultadoOverlay = overlayReport ? (ing.totalPrev + gas.totalPrev) : null;
    const resultRow = `<tr class="pl-bold pl-highlight"><td>${curReport.resultLabel || 'Resultado neto'}</td><td>${resultado === null ? t('stat.nodata','Sin dato') : fmtDisplay(resultado)}</td><td>—</td>` +
      `<td>${resultadoOverlay !== null ? fmtDisplay(resultadoOverlay) : '—'}</td><td>—</td></tr>`;

    document.querySelector('#'+containerId+' tbody').innerHTML =
      ing.html + '<tr class="pl-spacer"><td colspan="5"></td></tr>' + gastosHtml +
      (!sinGastos && extraRowsHtml ? '<tr class="pl-spacer"><td colspan="5"></td></tr>' + extraRowsHtml : '') +
      '<tr class="pl-spacer"><td colspan="5"></td></tr>' + resultRow;
    // Se devuelven los totales YA en la moneda mostrada para que el stat "Gastos" de arriba de
    // Finanzas use EXACTAMENTE el mismo número que "Total Gastos" acá abajo, antes ese stat salía
    // de cur.expenses (computeYear), que para 2025/2027 (los únicos ejercicios con documento real)
    // es solo wages+otherExpenses, sin amortizaciones/depreciación, así que mostraba un Gastos menor
    // al de la tabla y parecía un descalce con las inversiones. Bug real, reportado por Guido.
    // extraTotal (Versión 61): se devuelve para que renderFinanzasStatsFromComputed/Generic puedan
    // pintar el stat "Int." de arriba con EXACTAMENTE el mismo número que ya se sumó acá abajo para
    // llegar a "Resultado neto" (Ingresos + Gastos + Int. = Resultado neto, visible en los 2
    // lugares a la vez).
    return { ingresosTotal: ing.total, gastosTotal: sinGastos ? undefined : gas.total, resultado, extraTotal: sinGastos ? undefined : extraTotal };
  }


  // Colapsa un grupo y, en cascada, cualquier sub-grupo anidado que hubiera quedado abierto adentro
  // (y resetea sus flechas), así un nivel siempre arranca cerrado la próxima vez que se abre, en vez
  // de quedar en un estado inconsistente con filas nietas visibles sin su fila madre.
  function collapseBreakdownGroup(rowId){
    document.querySelectorAll('tr[data-group="'+rowId+'"]').forEach(r => {
      r.style.display = 'none';
      if(r.dataset.owngroup){
        collapseBreakdownGroup(r.dataset.owngroup);
        const nestedArrow = r.querySelector('.pl-arrow');
        if(nestedArrow) nestedArrow.innerHTML = '&#9656;';
      }
    });
  }

  function toggleRevenueBreakdown(rowId, triggerEl){
    const rows = document.querySelectorAll('tr[data-group="'+rowId+'"]');
    if(!rows.length) return;
    const isOpen = rows[0].style.display !== 'none';
    if(isOpen){
      collapseBreakdownGroup(rowId);
    } else {
      rows.forEach(r => { r.style.display = 'table-row'; });
    }
    const arrow = triggerEl.querySelector('.pl-arrow');
    if(arrow) arrow.innerHTML = isOpen ? '&#9656;' : '&#9662;';
  }


  // La tabla "tal cual la muestra el club" (renderNativePLTable, más arriba) ya cubre TODOS los
  // clubes (Boca incluida desde la Versión 102): nativeReportFor() lee cur.revenueLines/expenseLines
  // directo (rawLabel tal cual la fuente), así que no hace falta una versión "Generic" separada de
  // plRows/renderPLTable. Los nombres "...Generic" de las funciones de abajo quedaron del período en
  // que coexistían con un motor Boca-only propio (ya no existe); no se renombraron para no arrastrar
  // un cambio cosmético de riesgo innecesario sobre esta migración.
  // ¿El documento de ESTE ejercicio desglosa deuda y caja? Deuda bruta = Caja = 0 EXACTO en un
  // documento oficial no es una deuda real de cero (un club de primera división con las dos en
  // cero no existe): es un documento que no lo publica, típicamente un presupuesto, que proyecta
  // ingresos y egresos y no trae estado de situación patrimonial. `computeYearGeneric()` escribe
  // `meta.grossDebt || 0`, así que el caso "null" y el caso "cero" llegan acá iguales y este test
  // cubre los dos. Placeholder/pending_official quedan afuera: ya tienen su propio banner arriba
  // de Finanzas.
  //
  // VIVE ACÁ, COMPARTIDA, A PROPÓSITO (to-do 25). Este test estaba escrito adentro de
  // renderDebtBlockGeneric y NO en renderFinanzasStatsGeneric, así que la ficha de Finanzas se
  // contradecía sola: el KPI publicaba "Deuda neta · 0,0 M USD" en el cuerpo de letra más grande
  // de la página y, unos centímetros más abajo, el aviso que arma esta misma función decía que ese
  // cero no significa que la deuda sea cero. Es el MISMO bug que la Versión 140 arregló en Inicio
  // (ver informaDeuda(), más abajo en este archivo). Mientras el test esté en un solo lugar y los
  // dos lo llamen, no pueden volver a desincronizarse.
  function deudaNoDesglosada(c){
    if(!c) return false;
    const rt = (c.meta || {}).reportType;
    if(rt === 'placeholder' || rt === 'pending_official') return false;
    return c.grossDebt === 0 && c.cash === 0;
  }


  function renderDebtBlockGeneric(cur, prev, containerId){
    document.getElementById(containerId+'CurLabel').textContent = cur.yearLabel;
    document.getElementById(containerId+'PrevLabel').textContent = prev ? prev.yearLabel : '—';
    // Conversión de moneda (Versión 32, antes grossDebt/cash/netDebt se mostraban tal cual, sin
    // convertir, porque River/Racing siempre estaban en USD sin toggle). Mismo patrón que
    // renderDebtBlock (Boca).
    const curMeta = yearMetaFor(cur.clubId, cur.year);
    const prevMeta = prev ? yearMetaFor(prev.clubId, prev.year) : null;
    const rows = [
      {label:'Salarios / Ingresos', curTxt:(cur.wagesToTurnover*100).toFixed(0)+'%', prevTxt: prev ? (prev.wagesToTurnover*100).toFixed(0)+'%' : '—'},
      {label:'Deuda bruta', cur:cur.grossDebt, prev: prev ? prev.grossDebt : null, bold:true},
      {label:'Caja', cur:cur.cash, prev: prev ? prev.cash : null},
      {label:'Deuda neta', cur:cur.netDebt, prev: prev ? prev.netDebt : null, bold:true, shade:true},
    ];
    document.querySelector('#'+containerId+' tbody').innerHTML = rows.map(r => {
      const trCls = [r.bold?'pl-bold':'', r.shade?'pl-shade':''].join(' ');
      const curVal = r.curTxt !== undefined ? r.curTxt : fmtDisplay(toDisplayValue(r.cur, curMeta, currentCurrency));
      const prevVal = r.prevTxt !== undefined ? r.prevTxt : (r.prev !== null ? fmtDisplay(toDisplayValue(r.prev, prevMeta, currentCurrency)) : '—');
      return `<tr class="${trCls}"><td>${tLabel(r.label)}</td><td>${curVal}</td><td>${prevVal}</td></tr>`;
    }).join('');
    // Misma regla general que renderDebtBlock (Boca): un año oficial (no placeholder) con
    // Deuda bruta = Caja = 0 es un documento que no desglosa deuda, no una deuda real de cero.
    const curUndisclosed = deudaNoDesglosada(cur);
    const prevUndisclosed = deudaNoDesglosada(prev);
    document.getElementById('finanzasDebtNote').textContent = debtDisclosureNote(curUndisclosed, cur.yearLabel, prevUndisclosed, prev ? prev.yearLabel : '');
  }


  // gastosTotal/ingresosTotal (opcionales): ver comentario en renderFinanzasStatsFromComputed,
  // mismo criterio acá (Versión 42: hoy River/Racing no tienen el bug de Boca porque revenueLines
  // es una sola fuente compartida entre Formato del club y Formato simplificado, pero se pasa
  // ingresosTotal de todas formas para que los dos stats de arriba, Ingresos y Gastos, sigan el
  // mismo criterio "usar el total ya calculado por la tabla de abajo" y no se desincronicen si el
  // motor genérico cambia a futuro). Conversión de moneda (Versión 32): antes esto siempre mostraba
  // cur.revenue/expenses/pat/netDebt tal cual (ya USD, hardcodeado), ahora convierte con
  // yearMetaFor(cur.clubId, cur.year) + currentCurrency, mismo patrón que
  // renderFinanzasStatsFromComputed (Boca).
  // extraTotal: ver comentario en renderFinanzasStatsFromComputed (Boca), mismo criterio y mismo
  // stat "Int." acá (Versión 61).
  function renderFinanzasStatsGeneric(cur, gastosTotal, ingresosTotal, extraTotal){
    const meta = yearMetaFor(cur.clubId, cur.year);
    const revenueDisp = ingresosTotal !== undefined ? ingresosTotal : toDisplayValue(cur.revenue, meta, currentCurrency);
    // gastosTotal (si viene) ya está convertido a currentCurrency por renderNativePLTable/
    // buildNativeSectionHtml. NO volver a pasarlo por toDisplayValue (bug real, encontrado
    // probando el toggle en el browser: convertía dos veces y mostraba "Gastos: 0.1 M USD" en vez
    // de ~76 M USD). Mismo criterio que renderFinanzasStatsFromComputed (Boca).
    const expensesDisp = gastosTotal !== undefined ? Math.abs(gastosTotal) : Math.abs(toDisplayValue(cur.expenses, meta, currentCurrency));
    const patDisp = toDisplayValue(cur.pat, meta, currentCurrency);
    const netDebtDisp = toDisplayValue(cur.netDebt, meta, currentCurrency);
    // "SIN DATO" NO ES CERO (Versión 152, to-do 31). Los 10 clubes japoneses tienen
    // ingresos cargados y `expenseLines: []` con `officialTotalExpenses: null`, porque
    // la J.League publica el ingreso de cada club y no su estructura de costos. Sin
    // este test, la ficha de Cerezo Osaka decía "Gastos 0,0 M USD" y "Resultado neto
    // +38,1 M USD" en el cuerpo de letra más grande de la página: ese club no ganó 38
    // millones, simplemente no sabemos qué gastó. La TABLA de abajo ya lo hacía bien
    // (muestra guiones), así que el criterio existía en el proyecto y eran estos KPIs
    // los que no lo aplicaban. El resultado cae con los gastos: es el final de una
    // cascada que arranca ahí.
    const sinGastos = !(cur.expenseLines || []).length
                   && (cur.meta || {}).officialTotalExpenses == null
                   && !cur.expenses && !cur.nonCash;
    // to-do 25: mismo criterio que `sinGastos` acá arriba y que la tabla de deuda de abajo — un
    // cero que la fuente no publica no se muestra como cero.
    const sinDeuda = deudaNoDesglosada(cur);
    const extraStat = extraTotal !== undefined
      ? `<div class="stat"><div class="label" title="${t('stat.extra.tip','Intereses netos y otros ajustes que no son Ingresos ni Gastos operativos, pero sí suman al Resultado neto')}">${t('stat.extra','Int.')}</div><div class="value ${extraTotal>=0?'pos':'neg'}">${fmtAmount(extraTotal, currentCurrency)}</div></div>`
      : '';
    document.getElementById('finanzasStats').innerHTML = `
      <div class="stat"><div class="label">${t('section.revenue','Ingresos')}</div><div class="value">${fmtAmountPlain(revenueDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">${t('section.expenses','Gastos')}</div><div class="value${sinGastos ? ' nodato' : ''}">${sinGastos ? t('stat.nodata','Sin dato') : fmtAmountPlain(expensesDisp, currentCurrency)}</div></div>
      ${sinGastos ? '' : extraStat}
      <div class="stat"><div class="label">${t('stat.pat','Resultado neto')}</div><div class="value ${sinGastos ? 'nodato' : (cur.pat>=0?'pos':'neg')}">${sinGastos ? t('stat.nodata','Sin dato') : fmtAmount(patDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">${t('stat.netdebt.short','Deuda neta')}</div><div class="value${sinDeuda ? ' nodato' : ''}">${sinDeuda ? t('stat.nodata','Sin dato') : fmtAmountPlain(netDebtDisp, currentCurrency)}</div></div>
    `;
  }


  // Mismo criterio que drawTrendChart (Boca): un ejercicio con reportType:'placeholder' (ver
  // riverFiscalYearMeta/racingFiscalYearMeta) se grafica como `null`, barra vacía, en vez de un
  // número inventado. 'press_estimate' y 'unofficial_mirror' SÍ se grafican, son cifras reales
  // reportadas, solo que no vienen del documento primario del club. Conversión de moneda (Versión
  // 32): cada año se convierte con SU PROPIO yearMetaFor (no un fx único), porque distintos
  // ejercicios de un mismo club pueden estar en ARS (2024 en adelante) o USD (2009-2011).
  function drawTrendChartGeneric(clubId, computedArr){
    if(typeof Chart === 'undefined') return;
    const ctx = document.getElementById('trendChart').getContext('2d');
    // Ternario, no un objeto { river: riverFiscalYearMeta, racing: racingFiscalYearMeta } armado de
    // una: ese objeto evalúa LAS DOS propiedades al crearse, y con lazy-loading (loadClubData en
    // index.html) el archivo del club que NO se está mirando puede no estar cargado todavía, tira
    // ReferenceError. El ternario solo evalúa la rama que efectivamente hace falta.
    const isReal = year => reportTypeForYear(clubId, year) !== 'placeholder';
    const labels = computedArr.map(c => String(c.year));
    const revenueData = computedArr.map(c => isReal(c.year) ? toDisplayValue(c.revenue, yearMetaFor(clubId, c.year), currentCurrency) : null);
    const expensesData = computedArr.map(c => isReal(c.year) ? Math.abs(toDisplayValue(c.expenses, yearMetaFor(clubId, c.year), currentCurrency)) : null);
    if(trendChartInst) trendChartInst.destroy();
    trendChartInst = new Chart(ctx, {
      type:'bar',
      data:{labels, datasets:[
        {label:'Ingresos', data:revenueData, backgroundColor:'#0a2b5c'},
        {label:'Gastos', data:expensesData, backgroundColor:'#b5372b'},
      ]},
      // layout.padding.top: deja un margen libre arriba del área de trazado para que el "$" de
      // .chart-axis-dollar (span de HTML superpuesto, ver CSS) no quede tapado por/tapando la
      // etiqueta del tick más alto del eje Y, bug real reportado por Guido con captura: sin este
      // padding, el tick de arriba (ej. "90") se dibuja casi en el mismo pixel donde está
      // posicionado el "$", y quedan superpuestos/ilegibles los dos.
      options:{responsive:true, maintainAspectRatio:false, layout:{padding:{top:26}}, plugins:{legend:{position:'bottom'}}, scales:{y:{beginAtZero:true, title:{display:false}}, x:{title:{display:true, text:'Ejercicio'}}}}
    });
  }


  function drawBreakdownChartGeneric(cur){
    if(typeof Chart === 'undefined') return;
    const ctx = document.getElementById('breakdownChart').getContext('2d');
    const meta = yearMetaFor(cur.clubId, cur.year);
    const labels = cur.revenueLines.map(l => l.rawLabel.length > 40 ? l.rawLabel.slice(0,40)+'…' : l.rawLabel);
    const vals = cur.revenueLines.map(l => toDisplayValue(l.amountNative, meta, currentCurrency));
    if(breakdownChartInst) breakdownChartInst.destroy();
    breakdownChartInst = new Chart(ctx, {
      type:'doughnut',
      data:{labels, datasets:[{data:vals, backgroundColor:['#0a2b5c','#f2b705','#1b7a3d','#8a5cf6','#b5372b','#6b6b6b','#e07b39','#2b8a99']}]},
      options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right', align:'start'}}},
      plugins:[pctSliceLabelsPlugin]
    });
  }


  function updateFinanzasByGestionGeneric(clubId){
    const gestiones = gestionesByClub[clubId] || {}; // Versión 112: defensivo, ver currentGestionKey() en js/finanzas-calc.js
    const key = document.getElementById('gestionSelect').value;
    const g = gestiones[key];
    if(!g) return;
    const cur = computeYearGeneric(clubId, g.lastYear);
    if(!cur) return;  // Versión 131: sin club elegido no hay ejercicio que mostrar
    const prev = g.firstYear !== g.lastYear ? computeYearGeneric(clubId, g.firstYear) : null;
    const plTotals = renderNativePLTable(clubId, cur.year, cur.yearLabel, 'finanzasPLTable');
    renderFinanzasStatsGeneric(cur, plTotals.gastosTotal, plTotals.ingresosTotal, plTotals.extraTotal);
    renderDebtBlockGeneric(cur, prev, 'finanzasDebtTable');
    const years = []; for(let y=g.firstYear; y<=g.lastYear; y++){ years.push(y); }
    drawTrendChartGeneric(clubId, years.map(y => computeYearGeneric(clubId, y)).filter(c => c.revenueLines.length));
    drawBreakdownChartGeneric(cur);
    renderSupuestosCard(clubId, g.lastYear);
    renderPresupuestoFinancieroCard(clubId, g.lastYear);
    renderPresupuestoInversionesCard(clubId, g.lastYear);
    renderTorneosCard(clubId, g.lastYear);
  }


  function updateFinanzasByAnioGeneric(clubId){
    const y = parseInt(document.getElementById('anioSelect').value, 10);
    const cur = computeYearGeneric(clubId, y);
    if(!cur) return;  // Versión 131: sin club elegido no hay ejercicio que mostrar
    const plTotals = renderNativePLTable(clubId, cur.year, cur.yearLabel, 'finanzasPLTable');
    renderFinanzasStatsGeneric(cur, plTotals.gastosTotal, plTotals.ingresosTotal, plTotals.extraTotal);
    renderDebtBlockGeneric(cur, null, 'finanzasDebtTable');
    drawTrendChartGeneric(clubId, [cur]);
    drawBreakdownChartGeneric(cur);
    renderSupuestosCard(clubId, y);
    renderPresupuestoFinancieroCard(clubId, y);
    renderPresupuestoInversionesCard(clubId, y);
    renderTorneosCard(clubId, y);
  }


  function populateFinanzasSelectors(clubId){
    const gestionSelect = document.getElementById('gestionSelect');
    const anioSelect = document.getElementById('anioSelect');
    // Antes de reconstruir el <select>, guardamos qué ejercicio se estaba mirando (del club
    // anterior) para tratar de mantenerlo al cambiar de club, o el más cercano en el tiempo si ese
    // ejercicio puntual no existe para el club nuevo. Sin esto, el <select> siempre volvía a la
    // primera opción (el ejercicio más lejano, si la lista no estaba ordenada, ver más abajo).
    const previousYear = parseInt(anioSelect.value, 10);
    // finanzasGestiones/finanzasYears (Versión 102, ver comentario de cabecera en data/boca-data.js):
    // campos OPCIONALES en CLUB_GENERIC_DATA[clubId], para un club que quiera mostrar en el <select>
    // de Finanzas menos gestiones/años de los que tiene cargados en gestionesByClub/fiscalYearMeta
    // (Boca: solo Riquelme y los 4 ejercicios reales/pendientes, ver Versión 81 del historial, "quita
    // los años placeholder de Finanzas" — Mercado de Pases/Resultados/Comparar Gestiones siguen
    // usando el set completo, sin filtrar, vía gestionesByClub/fiscalYearMeta directo). Cualquier
    // club sin estos 2 campos (el resto) muestra TODAS sus gestiones/años, sin cambios.
    // Versión 131: sin club elegido (cold start) o con el archivo del club todavía sin bajar, los
    // selectores quedan vacíos en vez de tirar TypeError. Ver `clubCargado()` en index.html.
    const gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    if(!gd){
      gestionSelect.innerHTML = '';
      document.getElementById('anioSelect').innerHTML = '';
      return;
    }
    const gestiones = gestionesByClub[clubId] || {}; // Versión 112: defensivo, ver currentGestionKey() en js/finanzas-calc.js
    const gestionKeys = gd.finanzasGestiones || Object.keys(gestiones);
    gestionSelect.innerHTML = gestionKeys.map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
    // REGLA (Versión 56): el sufijo entre paréntesis sale de `anioDropdownSuffix(reportType)` (mismo
    // criterio para cualquier club), no de un texto suelto por año (cada uno redactado distinto:
    // "presupuestado", "esperando datos"). REGLA (Versión 61, pedido explícito de Guido: "que no
    // aparezca 'ejercicio 2020/2021' sino '2020/2021'. Ejercicio sino queda muy redundante y agota la
    // vista"): sin el prefijo "Ejercicio " que tenían todas las opciones antes, el rango de años solo.
    // El prefijo sigue vivo en OTRO lugar (el header "Ejercicio/Balance/Presupuesto AAAA/AAAA" de la
    // tabla Estado de resultados, `ejercicioLabel()`), esto solo afecta el texto del propio `<select>`.
    // Object.keys() de un objeto con claves numéricas ("2024","2025"...) las devuelve SIEMPRE en
    // orden ASCENDENTE (son "integer-like keys", JS las reordena así sin importar el orden en el
    // código fuente), por eso se ordena acá a mano, descendente.
    const meta = gd.fiscalYearMeta;
    const yearKeys = gd.finanzasYears || Object.keys(meta).map(Number);
    // AGREGADO al onboardear Brasil: `isCalendarYearClub` (js/finanzas-calc.js) evita el rango de
    // temporada "AAAA-1/AAAA" para un club cuyo ejercicio es el año calendario — mismo criterio que
    // ejercicioLabel(), ver su comentario para el detalle de por qué el rango sería falso acá.
    const years = yearKeys.slice().sort((a,b) => b - a).map(y => ({
      value:y, label: (isCalendarYearClub(clubId) ? String(y) : (y-1)+'/'+y)+anioDropdownSuffix((meta[y]||{}).reportType),
    }));
    anioSelect.innerHTML = years.map(y => `<option value="${y.value}">${y.label}</option>`).join('');
    if(!isNaN(previousYear) && years.length){
      const exact = years.find(y => y.value === previousYear);
      const target = exact || years.reduce((best, y) => Math.abs(y.value - previousYear) < Math.abs(best.value - previousYear) ? y : best);
      anioSelect.value = String(target.value);
    }
  }


  // Los supuestos/premisas que declara CADA presupuesto viven en `presupuestoSupuestosByYear`,
  // adentro del `data/<club>-data.js` de cada club (movido acá desde este archivo en la Versión
  // 135, junto con el Presupuesto Financiero y el de Inversiones). Cuando se onboardea un
  // presupuesto nuevo, su entrada va ahí: onboardear un club no toca este archivo.


  // Card "Supuestos": REGLA (Versión 42, reemplaza la regla de la Versión 34 documentada acá
  // abajo, pedido explícito de Guido). Antes el card SIEMPRE se mostraba, con un mensaje "no hay"
  // cuando el ejercicio no tenía supuestos (ej. un balance auditado, que no es un presupuesto).
  // Guido decidió que ese mensaje ocupa espacio sin aportar nada para esos casos: ahora el card se
  // ESCONDE por completo (display:none en #supuestosCard) cuando el club no declara supuestos
  // para ese ejercicio, en vez de mostrar la explicación. Mismo criterio
  // para Presupuesto Financiero, Presupuesto de Inversiones e Ingresos y Egresos por Torneo, más
  // abajo en este mismo archivo.
  function renderSupuestosCard(clubId, year){
    const card = document.getElementById('supuestosCard');
    const data = datosPresupuesto(clubId, year, 'presupuestoSupuestosByYear');
    if(!data){ card.style.display = 'none'; return; }
    card.style.display = '';
    document.getElementById('supuestosBody').innerHTML = `
      <p class="subtitle" style="margin-bottom:14px;">${data.docLabel}</p>
      ${data.sections.map(s => `
        <div class="premisas-h">${s.heading}</div>
        <ul class="premisas-list">${s.items.map(i => `<li>${i}</li>`).join('')}</ul>
      `).join('')}
    `;
  }


  // Banner de calidad de dato: se recalcula cada vez que cambia club/gestión/año/vista, y muestra
  // de dónde sale el número que se está mirando (oficial, prensa, o placeholder sin fuente).
  function renderDataQualityBannerForCurrentSelection(){
    const banner = document.getElementById('finanzasDataQualityBanner');
    const isGestion = document.querySelector('#viewToggle button.active').dataset.view === 'gestion';
    const year = isGestion
      ? ((gestionesByClub[currentClub] || {})[document.getElementById('gestionSelect').value] || {}).lastYear
      : parseInt(document.getElementById('anioSelect').value, 10);
    const meta = (((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {})[year] || {};
    // REGLA (Versión 58): 'official_budget_and_balance' (ejercicio con las 2 fuentes reales
    // cargadas a la vez, ver club-or-year-onboarding/SKILL.md sección 11) es tan "real" como
    // 'official_balance_sheet'/'official_budget' solos, tiene que ocultar el banner igual. Bug
    // real encontrado al cargar el primer ejercicio con este reportType (Racing 2020): al no estar
    // en esta lista, caía al default del ternario de abajo ("Dato placeholder, número inventado
    // para probar el diseño del sitio"), mostrando esa advertencia FALSA para un ejercicio 100%
    // real (con MÁS fuente que la mayoría, no menos).
    if(meta.reportType === 'official_budget' || meta.reportType === 'official_balance_sheet' || meta.reportType === 'official_budget_and_balance'){
      banner.style.display = 'none';
      return;
    }
    const src = sources[meta.sourceId];
    banner.style.display = 'block';
    const kind = meta.reportType === 'pending_official'
      ? 'Ejercicio todavía no informado por el club: no hay balance ni presupuesto oficial cargado todavía para este período, se está esperando que Boca lo publique'
      : meta.reportType === 'press_estimate'
      ? 'Dato de cobertura de prensa, no el documento oficial del club'
      : meta.reportType === 'unofficial_mirror'
      ? 'Balance real y auditado (informe de auditoría independiente incluido), pero descargado de una réplica de una comunidad de hinchas, no del dominio oficial del club'
      : 'Dato placeholder, número inventado para probar el diseño del sitio, no es real';
    // Versión 125: el banner ya no repite el documento ni sus salvedades, eso pasó a la ficha
    // de Fuentes del final de la sección, que las muestra para TODOS los ejercicios y no solo
    // para los que tienen algo malo que avisar. Acá queda solo la advertencia, que es su trabajo.
    banner.innerHTML = `⚠️ <strong>${kind}.</strong>` +
      (src ? ` ${t('fuentes.banner.ver', 'El documento y sus salvedades están en "Fuentes", al final de esta sección.')}` : '');
  }



  // renderWaterfallSteps: genérico (Versión 35). Pinta una lista de steps {label, op, magnitude,
  // isResult?} adentro de containerId, convirtiendo cada magnitude con `meta` + currentCurrency. Lo
  // Lo usan los waterfalls del Presupuesto Financiero de cualquier club: los steps salen de
  // `presupuestoFinancieroByYear` del propio club (data/<club>-data.js) y la meta de
  // yearMetaFor(clubId, year), así que un club nuevo no toca esta función.
  function renderWaterfallSteps(containerId, steps, meta){
    const wrap = document.getElementById(containerId);
    if(!wrap) return;
    wrap.innerHTML = steps.map(step => {
      const disp = toDisplayValue(step.magnitude, meta, currentCurrency);
      const valCls = step.isResult ? (disp >= 0 ? ' pos' : ' neg') : '';
      const stepHtml = `<div class="stat waterfall-step${step.isResult ? ' waterfall-result' : ''}"><div class="label">${tLabel(step.label)}</div><div class="value${valCls}">${fmtAmountPlain(disp, currentCurrency)}</div></div>`;
      return step.op ? `<div class="waterfall-op">${step.op}</div>${stepHtml}` : stepHtml;
    }).join('');
  }




  // Racing agrupa sus inversiones/bienes de uso en UNA sola línea de egresos extraordinarios
  // ("Pago de gastos de compra de bienes de uso y mejoras" 2026 / equivalente 2027), sin desglosar
  // por obra individual como sí hace Boca (que nombra cada proyecto con su monto). Se muestra el
  // total real (ya cargado en racingExpenseLinesByYear como "Egresos extraordinarios...") con una
  // nota explícita de que no hay desglose por proyecto, no es un "no hay dato", es "el documento
  // no llega a ese nivel de detalle".


  // Versión 135: las dos cards se arman de los datos del club, sin una sola rama por club. Hasta
  // acá, el Presupuesto Financiero y el de Inversiones de Boca 2026/27 estaban escritos a mano
  // como HTML adentro de index.html (133 líneas) y un `isBoca2027` decidía cuál de los dos
  // bloques mostrar; los demás clubes tenían una versión genérica mucho más pobre, y sus datos
  // vivían en ESTE archivo en vez del `data/<club>-data.js`. Ahora los dos casos usan el mismo
  // render: el que tiene desglose lo declara, el que no, no.
  //
  // Las tablas con `formato:'ars-exacto'` se muestran en pesos enteros con separador de miles,
  // como las imprime el documento del club, y NO responden al toggle de moneda. Es el
  // comportamiento que ya tenían cuando eran HTML fijo; cambiarlo es una decisión aparte, no algo
  // que corresponda colar en una mudanza.
  function fmtArsExacto(magnitudeEnMillones){
    return Math.round(magnitudeEnMillones * 1e6).toLocaleString('es-AR');
  }

  function renderFilasMiniTabla(rows){
    return rows.map(f => {
      if(f.kind === 'subhead') return `<tr class="subhead"><td colspan="2">${f.label}</td></tr>`;
      const cls = f.kind === 'total' ? ' class="total-row"' : f.kind === 'subtotal' ? ' class="subtotal-row"' : '';
      return `<tr${cls}><td>${f.label}</td><td class="amount">${fmtArsExacto(f.amount)}</td></tr>`;
    }).join('');
  }

  const MINI_TABLA_COLS = '<colgroup><col><col style="width:130px"></colgroup>';

  function datosPresupuesto(clubId, year, campo){
    const club = (window.CLUB_GENERIC_DATA || {})[clubId] || {};
    return (club[campo] || {})[year] || null;
  }

  function renderPresupuestoFinancieroCard(clubId, year){
    const card = document.getElementById('presupuestoFinancieroCard');
    const data = datosPresupuesto(clubId, year, 'presupuestoFinancieroByYear');
    if(!data){ card.style.display = 'none'; return; }
    card.style.display = '';
    const body = document.getElementById('presupuestoFinancieroBody');
    body.style.display = '';
    body.innerHTML = `<div class="waterfall-row" id="presupuestoFinancieroWaterfallGeneric"></div>` +
      (data.tabla ? `<table class="mini-table">${MINI_TABLA_COLS}${renderFilasMiniTabla(data.tabla.rows)}</table>` : '') +
      (data.note ? `<p class="source-note">${data.note}</p>` : '');
    renderWaterfallSteps('presupuestoFinancieroWaterfallGeneric', data.steps, yearMetaFor(clubId, year));
  }


  function renderPresupuestoInversionesCard(clubId, year){
    const card = document.getElementById('presupuestoInversionesCard');
    const data = datosPresupuesto(clubId, year, 'presupuestoInversionesByYear');
    if(!data){ card.style.display = 'none'; return; }
    card.style.display = '';
    const body = document.getElementById('presupuestoInversionesBody');
    body.style.display = '';

    // Con desglose por obra (Boca): un acordeón por grupo, en pesos exactos, y el total al pie.
    if(data.groups){
      body.innerHTML = data.groups.map(g => `
        <details class="accordion nested">
          <summary><span>${g.label}</span><span>${fmtArsExacto(g.total)}</span></summary>
          <div class="accordion-body"><table class="mini-table">${MINI_TABLA_COLS}${renderFilasMiniTabla(g.rows)}</table></div>
        </details>`).join('') +
        `<table class="mini-table">${MINI_TABLA_COLS}<tr class="total-row"><td>TOTAL INVERSIONES</td><td class="amount">${fmtArsExacto(data.total)}</td></tr></table>` +
        (data.note ? `<p class="source-note">${data.note}</p>` : '');
      return;
    }

    // Sin desglose (Racing): el total solo, convertido con el toggle de moneda, y la nota que
    // explica que el documento no llega a más detalle.
    const disp = toDisplayValue(data.total, yearMetaFor(clubId, year), currentCurrency);
    body.innerHTML = `
      <table class="mini-table">${MINI_TABLA_COLS}
        <tr class="total-row"><td>TOTAL INVERSIONES (sin desglosar por obra)</td><td class="amount">${fmtAmountPlain(disp, currentCurrency)}</td></tr>
      </table>
      <p class="source-note">${data.note}</p>
    `;
  }


  // Cards "Ingresos y Egresos por Torneo" (Versión 41, pedido de Guido: "ver cuánto ingresa y
  // egresa cada torneo"). HTML estático para Boca 2027 (único ejercicio con este desglose real, ver
  // Clubes/Argentina/Boca/presupuesto-26-27.md pág. 12 para Ingresos por competencia y pág. 22-23
  // para Gastos de "Organización de Espectáculos" por competencia). REGLA (Versión 42): para
  // cualquier otro club/año, los 3 cards se esconden por completo (mismo criterio nuevo que
  // Supuestos/Presupuesto Financiero/Inversiones, ver comentario en renderSupuestosCard) en vez de
  // mostrar un card de fallback explicando por qué no hay.
  //
  // OJO, alcance real de "Gastos" en estos 3 cards: es SOLO el costo de organización/logística de
  // los partidos de ESE torneo (seguridad, viajes, concentración, premios grupales por resultado,
  // AFA, etc.). El presupuesto NO desglosa los sueldos/primas del plantel por torneo (son una única
  // cifra para todo el plantel, sin importar la competencia), así que la "Diferencia" de cada card
  // NO es el resultado económico real de esa copa/torneo, está aclarado en cada card, no solo acá,
  // porque es un matiz fácil de leer mal ("¿Boca pierde plata jugando la Liga?": no, solo que ese
  // costado del gasto, sueldos, no está en esta cuenta).
  function renderTorneosCard(clubId, year){
    const isBoca2027 = clubId === 'boca' && year === 2027;
    document.getElementById('torneosBoca2027').style.display = isBoca2027 ? '' : 'none';
  }


  // FICHA DE FUENTE del ejercicio que se está mirando (Versión 125). Reemplaza a
  // `finanzasClubSourceText`, que era un objeto escrito a mano con 3 entradas (Boca, Racing, River)
  // y dejaba a los otros 38 clubes sin citar ninguna fuente. Peor todavía: `sources{}` tenía 91
  // entradas con 61 URLs y se consumía en UN solo lugar, el banner de calidad de dato, que hace
  // `return` temprano cuando el ejercicio es oficial, o sea que los 88 ejercicios REALES no
  // mostraban su fuente en ningún lado, y el sitio prometía "todo dato cita su origen". Esta card
  // se arma de los datos, así que un club nuevo la trae sin tocar una línea de acá.
  // El nivel de fuente y la procedencia del tipo de cambio son etiquetas NUESTRAS, no texto del
  // documento, así que se traducen (a diferencia del título de un balance, que sale textual de la
  // fuente y queda en su idioma original, mismo criterio que los rubros de "Formato del club").
  // Las etiquetas salen de `data/sources-view.js`, compartidas con `fuentes.html`: antes estaban
  // duplicadas acá y en el generador, y podían decir cosas distintas del mismo documento.
  function nivelFuente(reliability){
    const n = sourceLevel(reliability);
    return { label: t('fuentes.nivel.' + reliability, n.label), color: n.color };
  }

  function tipoFuente(type){ return t('fuentes.tipo.' + type, sourceTypeLabel(type)); }

  function fmtFx(fx, currency){
    const dec = fx < 10 ? 4 : 2;
    return `1 USD = ${fx.toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec })} ${currency}`;
  }

  // Una línea "Tipo de cambio", con de dónde salió al lado. `meta` es lo que devuelve
  // yearMetaFor()/presupuestoOverlayMetaFor(): ya trae fxSource/fxLabel resueltos.
  function filaFx(meta, etiqueta){
    if(!meta || meta.currency === 'USD' || meta.fx == null) return '';
    const def = (typeof FX_SOURCE !== 'undefined' && FX_SOURCE[meta.fxSource]) || null;
    const detalle = def ? t('fx.detail.' + meta.fxSource, def.detail) : '';
    // `fxLabel` de una cotización de FX_CLOSE nombra el organismo y la fecha (dato, no chrome);
    // el de un fx literal es la etiqueta genérica de su procedencia, y esa sí se traduce.
    const label = meta.fxRef ? (meta.fxLabel || '') : (def ? t('fx.source.' + meta.fxSource, def.label) : (meta.fxLabel || ''));
    return filaFicha(etiqueta,
      `${fmtFx(meta.fx, meta.currency)}, ${label}` +
      (detalle ? `<span style="display:block;color:var(--muted);font-size:13px;margin-top:2px;">${detalle}</span>` : ''));
  }

  function filaFicha(etiqueta, html){
    return `<div style="display:flex;gap:14px;padding:9px 0;border-top:1px solid var(--border,#e5e5e5);font-size:14.5px;line-height:1.55;">
      <div style="flex:0 0 150px;color:var(--muted);">${etiqueta}</div>
      <div style="flex:1;">${html}</div>
    </div>`;
  }

  // La pestaña Fuentes: todos los documentos del club seleccionado (no de un ejercicio suelto),
  // más el link al listado completo del sitio. Escala por construcción: nunca lista más de un club,
  // así que da igual que el sitio tenga 41 clubes o 1000.
  function renderFuentesClubCard(){
    const body = document.getElementById('fuentesClubBody');
    if(!body) return;
    const club = clubs[currentClub] || {};
    const titulo = document.getElementById('fuentesClubTitulo');
    if(titulo) titulo.textContent = `${t('fuentes.club.title', 'Documentos de')} ${club.displayName || club.name || ''}`;

    const docs = Object.keys(sources)
      .filter(id => sources[id].clubId === currentClub)
      .map(id => sources[id])
      .sort((a,b) => a.title.localeCompare(b.title, 'es'));

    if(!docs.length){
      body.innerHTML = `<p style="color:var(--muted);font-size:14.5px;">${
        t('fuentes.club.none', 'Todavía no hay ningún documento cargado para este club.')}</p>` + linkTodasLasFuentes();
      return;
    }

    body.innerHTML = docs.map(d => {
      const nivel = nivelFuente(d.reliability);
      const notas = salvedadesDe(d, metasDeFuente(d.id));
      return `<div style="border-top:1px solid var(--border);padding:11px 0 4px;">
        <div style="font-size:14.5px;font-weight:600;">${d.url ? `<a href="${d.url}" target="_blank" rel="noopener">${d.title}</a>` : d.title}</div>
        <div style="font-size:13px;color:var(--muted);margin-top:2px;">
          ${tipoFuente(d.type)} · <span style="color:${nivel.color};font-weight:600;">${nivel.label}</span>${d.url ? '' : ` · ${t('fuentes.club.nourl', 'sin URL pública')}`}
        </div>
        ${notas ? `<div style="font-size:13px;color:var(--muted);margin-top:4px;">${notas}</div>` : ''}
      </div>`;
    }).join('') + linkTodasLasFuentes();
  }

  // Las salvedades que se le muestran al visitante: la `publicNote` del documento (escrita para un
  // lector, la tienen 17 de 91) más lo que `sourceCaveats()` deriva de los propios datos.
  // NUNCA `note`, que es la nota interna de una sesión para la siguiente y hasta la Versión 126 se
  // publicaba tal cual, con rutas del disco de Guido adentro. Ver data/sources-view.js.
  function salvedadesDe(src, metas){
    const partes = [];
    if(src.publicNote) partes.push(src.publicNote);
    partes.push(...sourceCaveats(src, metas));
    return partes.join(' ');
  }

  // Las metas de fiscalYearMeta del club actual que usan ESE documento.
  function metasDeFuente(sourceId){
    const meta = ((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {};
    return Object.keys(meta).filter(y => meta[y].sourceId === sourceId).map(y => meta[y]);
  }

  // DOS LINKS Y NO UNO (Versión 162, punto 2 del plan de escala). Hasta acá el único link
  // iba a `fuentes.html`, que era la página con los documentos de TODOS los clubes. Ahora
  // cada club tiene la suya (`fuentes/<clubId>.html`, generada por
  // tools/generate-fuentes-page.js) y `fuentes.html` es el índice, así que el visitante que
  // está mirando un club va primero a SU página, y el índice queda como la salida hacia el
  // resto.
  // OJO: un club sin ningún documento cargado NO tiene página generada (el generador solo
  // escribe las de los clubes que aparecen en sources{}), así que en ese caso se muestra
  // solo el link al índice. Linkear una página que no existe sería un 404 servido por
  // Netlify, que publica la raíz del repo tal cual.
  function linkTodasLasFuentes(){
    const tiene = Object.keys(sources).some(id => sources[id].clubId === currentClub);
    const otros = `<a href="fuentes.html">${t('fuentes.card.others', 'Ver fuentes de otros equipos')} →</a>`;
    if(!tiene) return `<p style="margin:14px 0 0;font-size:14px;">${otros}</p>`;
    return `<p style="margin:14px 0 0;font-size:14px;"><a href="fuentes/${currentClub}.html">${
      t('fuentes.card.club', 'Ver todos los documentos de este club')} →</a></p>` +
      `<p style="margin:6px 0 0;font-size:14px;">${otros}</p>`;
  }

  function renderFuentesCard(){
    const body = document.getElementById('finanzasFuentesBody');
    if(!body) return;
    const isGestion = document.querySelector('#viewToggle button.active').dataset.view === 'gestion';
    const year = isGestion
      ? ((gestionesByClub[currentClub] || {})[document.getElementById('gestionSelect').value] || {}).lastYear
      : parseInt(document.getElementById('anioSelect').value, 10);
    const meta = (((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {})[year] || {};
    const src = sources[meta.sourceId];
    const linkTodas = linkTodasLasFuentes();

    if(!src){
      body.innerHTML = `<p style="color:var(--muted);font-size:14.5px;line-height:1.6;margin:6px 0 0;">${
        t('fuentes.card.none', 'Este ejercicio todavía no tiene un documento oficial cargado: los números que se muestran son un placeholder para probar el diseño, no cifras reales del club.')
      }</p>` + linkTodas;
      return;
    }

    const nivel = nivelFuente(src.reliability);
    const filas = [
      filaFicha(t('fuentes.card.doc', 'Documento'),
        `${src.title}${src.url ? ` <a href="${src.url}" target="_blank" rel="noopener">(${t('fuentes.card.see', 'ver documento')})</a>` : ''}`),
      filaFicha(t('fuentes.card.level', 'Tipo y nivel de fuente'),
        `${tipoFuente(src.type)} · <span style="color:${nivel.color};font-weight:600;">${nivel.label}</span>`),
      filaFx(yearMetaFor(currentClub, year), t('fuentes.card.fx', 'Tipo de cambio')),
      // Un ejercicio con balance Y presupuesto muestra dos columnas, y cada una se convierte con
      // SU tipo de cambio: el del balance es un cierre ya ocurrido, el del presupuesto un supuesto.
      filaFx(presupuestoOverlayMetaFor(currentClub, year), t('fuentes.card.fxBudget', 'Tipo de cambio del presupuesto')),
      (() => {
        const notas = salvedadesDe(src, [meta]);
        return notas ? filaFicha(t('fuentes.card.note', 'Salvedades'),
          `<span style="color:var(--muted);">${notas}</span>`) : '';
      })(),
    ].join('');

    body.innerHTML = filas + linkTodas;
  }


  // ---------- MERCADO DE PASES ----------
  function populatePasesSelectors(clubId){
    const gestiones = gestionesByClub[clubId] || {}; // Versión 112: defensivo, ver currentGestionKey() en js/finanzas-calc.js
    document.getElementById('pasesGestionFilter').innerHTML = '<option value="todas">Todas</option>' +
      Object.keys(gestiones).map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
    const data = pasesDataForClub(clubId) || [];
    const anios = [...new Set(data.map(r => r.anio))].sort((a,b) => b-a);
    document.getElementById('pasesAnioFilter').innerHTML = '<option value="todos">Todos</option>' +
      anios.map(a => `<option value="${a}">${a}</option>`).join('');
    document.getElementById('pasesVentanaFilter').value = 'todas';
    document.getElementById('pasesTipoFilter').value = 'todos';
  }


  function applyPasesFilters(){
    const gestion = document.getElementById('pasesGestionFilter').value;
    const anio = document.getElementById('pasesAnioFilter').value;
    const ventana = document.getElementById('pasesVentanaFilter').value;
    const tipo = document.getElementById('pasesTipoFilter').value;
    const data = pasesDataForClub(currentClub) || [];
    const rows = data.filter(r =>
      (gestion === 'todas' || r.gestion === gestion) &&
      (anio === 'todos' || String(r.anio) === anio) &&
      (ventana === 'todas' || r.ventana === ventana) &&
      (tipo === 'todos' || r.tipo === tipo)
    );
    const compras = rows.filter(r => r.tipo === 'Jugador' && r.monto < 0).reduce((s,r) => s+r.monto, 0);
    const ventas = rows.filter(r => r.tipo === 'Jugador' && r.monto > 0).reduce((s,r) => s+r.monto, 0);
    const neto = compras + ventas;
    const dtMovs = rows.filter(r => r.tipo === 'DT').length;
    document.getElementById('pasesStats').innerHTML = `
      <div class="stat"><div class="label">Gasto en compras</div><div class="value neg">${fmtAmount(compras, 'USD')}</div></div>
      <div class="stat"><div class="label">Ingreso por ventas</div><div class="value pos">${fmtAmount(ventas, 'USD')}</div></div>
      <div class="stat"><div class="label">Net spend</div><div class="value ${neto>=0?'pos':'neg'}">${fmtAmount(neto, 'USD')}</div></div>
      <div class="stat"><div class="label">Movimientos de DT</div><div class="value">${dtMovs}</div></div>
    `;
    document.querySelector('#pasesTable tbody').innerHTML = rows.map(r => `
      <tr><td>${r.nombre}</td><td>${r.tipo}</td><td>${r.movimiento}</td><td>${r.tipo==='Jugador' ? fmtAmount(r.monto, 'USD') : '—'}</td><td>${r.anio}</td><td>${r.ventana}</td></tr>
    `).join('');
  }
  ['pasesGestionFilter','pasesAnioFilter','pasesVentanaFilter','pasesTipoFilter'].forEach(id => {
    document.getElementById(id).addEventListener('change', applyPasesFilters);
  });


  // ---------- RESULTADOS DEPORTIVOS ----------
  function populateResultadosSelector(clubId){
    const gestiones = gestionesByClub[clubId] || {}; // Versión 112: defensivo, ver currentGestionKey() en js/finanzas-calc.js
    document.getElementById('resultadosGestionSelect').innerHTML =
      Object.keys(gestiones).map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
  }


  function renderResultados(){
    const key = document.getElementById('resultadosGestionSelect').value;
    const dataset = resultadosDataForClub(currentClub) || {};
    const r = dataset[key];
    if(!r) return;
    document.getElementById('resultadosStats').innerHTML = `
      <div class="stat"><div class="label">Títulos locales</div><div class="value">${r.titulosLocales}</div></div>
      <div class="stat"><div class="label">Títulos internacionales</div><div class="value">${r.titulosInternacionales}</div></div>
      <div class="stat"><div class="label">Mejor resultado en Libertadores</div><div class="value" style="font-size:15px;line-height:1.3;">${r.mejorResultadoLibertadores}</div></div>
    `;
  }
  document.getElementById('resultadosGestionSelect').addEventListener('change', renderResultados);


  function renderTitulosTable(){
    const gestiones = gestionesByClub[currentClub] || {}; // Versión 112: defensivo, ver currentGestionKey() en js/finanzas-calc.js
    const data = titulosDataForClub(currentClub) || [];
    document.querySelector('#resultadosTable tbody').innerHTML = data.map(t => `
      <tr><td>${t.anio}</td><td>${t.competencia}</td><td>${t.resultado}</td><td>${gestiones[t.gestion] ? gestiones[t.gestion].nombre : t.gestion}</td></tr>
    `).join('');
  }


  // ---------- COMPARAR ----------
  function populateCompararSelectors(clubId){
    const gestiones = gestionesByClub[clubId] || {}; // Versión 112: defensivo, ver currentGestionKey() en js/finanzas-calc.js
    const keys = Object.keys(gestiones);
    const optsHtml = keys.map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
    document.getElementById('compA').innerHTML = optsHtml;
    document.getElementById('compB').innerHTML = optsHtml;
    if(keys.length > 1) document.getElementById('compB').value = keys[1];
  }


  function renderComparar(){
    const aKey = document.getElementById('compA').value;
    const bKey = document.getElementById('compB').value;
    const gestiones = gestionesByClub[currentClub] || {}; // Versión 112: defensivo, ver currentGestionKey() en js/finanzas-calc.js
    const ga = gestiones[aKey], gb = gestiones[bKey];
    if(!ga || !gb) return;
    const a = computeYearForClub(currentClub, ga.lastYear);
    const b = computeYearForClub(currentClub, gb.lastYear);
    const da = displayFinancialsForClub(currentClub, a), db = displayFinancialsForClub(currentClub, b);
    document.getElementById('compAHead').textContent = ga.nombre;
    document.getElementById('compBHead').textContent = gb.nombre;
    const netSpendA = pasesNetSpend(currentClub, aKey), netSpendB = pasesNetSpend(currentClub, bKey);
    const resultadosDataset = resultadosDataForClub(currentClub) || {};
    const rA = resultadosDataset[aKey] || {titulosLocales:0, titulosInternacionales:0, mejorResultadoLibertadores:'—'};
    const rB = resultadosDataset[bKey] || {titulosLocales:0, titulosInternacionales:0, mejorResultadoLibertadores:'—'};
    const rows = [
      ['Ingresos (último ejercicio)', da.revenue, db.revenue, 'money'],
      ['Gastos (último ejercicio)', da.expenses, db.expenses, 'money'],
      ['Resultado neto (último ejercicio)', da.pat, db.pat, 'money'],
      ['Deuda neta (último ejercicio)', da.netDebt, db.netDebt, 'money-inv'],
      ['Net spend en pases (gestión)', netSpendA, netSpendB, 'money'],
      ['Títulos totales (gestión)', rA.titulosLocales+rA.titulosInternacionales, rB.titulosLocales+rB.titulosInternacionales, 'num'],
      ['Mejor resultado en Libertadores', rA.mejorResultadoLibertadores, rB.mejorResultadoLibertadores, 'text'],
    ];
    document.querySelector('#compareTable tbody').innerHTML = rows.map(r => {
      const [label, va, vb, type] = r;
      const isMoney = type === 'money' || type === 'money-inv';
      const fa = isMoney ? fmtAmount(va, 'USD') : va;
      const fb = isMoney ? fmtAmount(vb, 'USD') : vb;
      if(type === 'text'){
        return `<tr><td>${label}</td><td>${fa}</td><td>${fb}</td></tr>`;
      }
      const lowerBetter = type === 'num-inv' || type === 'money-inv';
      const aBetter = lowerBetter ? va < vb : va > vb;
      const bBetter = lowerBetter ? vb < va : vb > va;
      return `<tr><td>${label}</td><td class="${aBetter?'better':''}">${fa}</td><td class="${bBetter?'better':''}">${fb}</td></tr>`;
    }).join('');
  }
  document.getElementById('compA').addEventListener('change', renderComparar);
  document.getElementById('compB').addEventListener('change', renderComparar);


  // ---------- INICIO ----------

  // ¿Este ejercicio informa deuda? Mismo test que usa la comparación entre clubes
  // (js/comparar-clubes.js) y que `sourceCaveats()` usa para derivar la salvedad "no informa
  // deuda ni caja": los dos campos en null es "no lo dice", y los dos en CERO EXACTO es lo
  // mismo escrito distinto, que es como lo escriben los presupuestos. Un club de primera
  // división con deuda bruta y caja exactamente cero no existe.
  function informaDeuda(clubId, year){
    const m = ((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta;
    const y = (m && m[year]) || null;
    if(!y) return false;
    if(y.grossDebt == null && y.cash == null) return false;
    if(y.grossDebt === 0 && y.cash === 0) return false;
    return true;
  }

  // El ejercicio más reciente de la gestión `g` que cumple `test`, o null si ninguno. Se
  // recorre de atrás para adelante porque lo que se busca siempre es "el más nuevo que...".
  function ultimoEjercicioCon(clubId, g, test){
    for(let y = g.lastYear; y >= g.firstYear; y--){
      if(computeYearForClub(clubId, y) && test(y)) return y;
    }
    return null;
  }

  function renderInicioStats(){
    const gestionKey = currentGestionKey(currentClub);
    const g = (gestionesByClub[currentClub] || {})[gestionKey];
    // Defensivo (Versión 112): un club sin ninguna gestionesByClub cargada (o con {} vacío) no debe
    // romper Inicio, la primera pantalla que ve cualquier visitante — antes de esto, un olvido al
    // onboardear un club nuevo (no agregar NINGUNA entrada a gestionesByClub) tiraba un TypeError acá
    // mismo. "Sin dato" en los 4 stats es el mismo criterio de degradación que ya usa "Socios
    // activos" un poco más abajo, no un caso nuevo inventado para esto.
    if(!g){
      document.getElementById('inicioStats').innerHTML = `
        <div class="stat"><div class="label">${t('stat.result','Último resultado')}</div><div class="value">${t('stat.nodata','Sin dato')}</div></div>
        <div class="stat"><div class="label">${t('stat.netdebt','Deuda neta actual')}</div><div class="value">${t('stat.nodata','Sin dato')}</div></div>
        <div class="stat"><div class="label">${t('stat.netspend','Gasto neto en pases')}</div><div class="value">${t('stat.nodata','Sin dato')}</div></div>
        <div class="stat"><div class="label">${t('stat.members','Socios activos')}</div><div class="value">${t('stat.nodata','Sin dato')}</div></div>
      `;
      return;
    }
    // VERSIÓN 140. Antes acá decía `computeYearForClub(currentClub, g.lastYear)`, o sea "el
    // último ejercicio de la gestión actual", y ESE mismo objeto alimentaba los 2 stats
    // financieros. El problema, encontrado tirando del hilo desde el píxel: el último ejercicio
    // de Boca es su PRESUPUESTO 2026/27, así que la home mostraba "Último resultado: +2,0 M USD"
    // (un pronóstico del club, no su último resultado) y "Deuda neta actual: 0,0 M USD" (porque
    // un presupuesto proyecta ingresos y egresos, no un balance, y escribe deuda y caja en cero).
    // Lo segundo se lee como "Boca no debe nada", que es falso.
    //
    // La causa raíz no era el cero: era usar "el último ejercicio" como sinónimo de "el estado
    // actual del club", sin preguntarse si ese ejercicio es un balance o un pronóstico, ni si el
    // documento informa ese indicador. Ahora CADA stat pide el último ejercicio QUE TENGA SU
    // DATO, y lo dice en pantalla en vez de esconderlo en un tooltip.
    // Primero el último BALANCE. Si el club solo tiene presupuestos, se usa el último ejercicio
    // real igual, pero la etiqueta cambia a "Resultado presupuestado" para no llamar "último
    // resultado" a un pronóstico. El fallback exige `!== 'blank'`: `computeYearForClub()`
    // devuelve un objeto para CUALQUIER año de un club cargado, también para uno que no existe
    // en su `fiscalYearMeta`, así que sin ese filtro el fallback podría elegir un año vacío.
    const añoResultado = ultimoEjercicioCon(currentClub, g, (y) => yearKindForClub(currentClub, y) === 'balance')
                      ?? ultimoEjercicioCon(currentClub, g, (y) => yearKindForClub(currentClub, y) !== 'blank');
    const añoDeuda = ultimoEjercicioCon(currentClub, g, (y) => informaDeuda(currentClub, y));
    const cur = añoResultado == null ? null : computeYearForClub(currentClub, añoResultado);
    if(!cur){
      // Una gestión cuyo rango no cubre ningún ejercicio real: mismo "Sin dato" de arriba en los
      // 2 stats financieros, en vez de un NaN o un año inventado.
      document.getElementById('inicioStats').innerHTML = `
        <div class="stat"><div class="label">${t('stat.result','Último resultado')}</div><div class="value">${t('stat.nodata','Sin dato')}</div></div>
        <div class="stat"><div class="label">${t('stat.netdebt','Deuda neta')}</div><div class="value">${t('stat.nodata','Sin dato')}</div></div>
        <div class="stat"><div class="label">${t('stat.netspend','Gasto neto en pases')}</div><div class="value">${fmtAmount(pasesNetSpend(currentClub, gestionKey), 'USD')}</div></div>
        <div class="stat"><div class="label">${t('stat.members','Socios activos')}</div><div class="value">${memberCountByClub[currentClub] ? memberCountByClub[currentClub].toLocaleString('es-AR') : t('stat.nodata','Sin dato')}</div></div>
      `;
      return;
    }
    // NO usa displayFinancialsForClub() acá a propósito — esa función fuerza USD siempre (la usa
    // "Comparar Gestiones", que por diseño ignora el toggle de moneda, ver su propio comentario en
    // js/finanzas-calc.js). El toggle de moneda ahora es universal (header, al lado del selector de
    // club) y también tiene que aplicar a estos 2 stats. "Gasto neto en pases" es la excepción: son
    // valores de mercado de pases, convencionalmente en USD sea cual sea el ejercicio/club (no
    // tienen un fx propio de ningún balance/presupuesto para convertir), se muestran siempre en USD.
    const meta = yearMetaFor(currentClub, cur.year);
    const patDisp = toDisplayValue(cur.pat, meta, currentCurrency);
    const deuda = añoDeuda == null ? null : computeYearForClub(currentClub, añoDeuda);
    const netDebtDisp = deuda ? toDisplayValue(deuda.netDebt, yearMetaFor(currentClub, añoDeuda), currentCurrency) : null;
    const esPresupuesto = yearKindForClub(currentClub, cur.year) === 'presupuesto';
    const netSpend = pasesNetSpend(currentClub, gestionKey);
    const members = memberCountByClub[currentClub];
    // Los 4 labels entran siempre en una sola línea (evita que un card quede más alto que los
    // otros 3 y rompa la alineación de la fila) y en español completo — "Net spend histórico"
    // (mezcla con inglés, reportado por Guido) pasó a "Gasto neto en pases". El detalle que antes
    // iba en el propio texto (el ejercicio de "Último resultado", "gestión actual" de pases) se
    // movió a `title` (tooltip nativo al pasar el mouse), no se perdió información, solo se sacó
    // del texto visible.
    document.getElementById('inicioStats').innerHTML = `
      <div class="stat"><div class="label">${esPresupuesto ? t('stat.result.budget','Resultado presupuestado') : t('stat.result','Último resultado')}</div><div class="value ${patDisp>=0?'pos':'neg'}">${fmtAmount(patDisp, currentCurrency)}</div><div class="stat-sub">${cur.yearLabel}</div></div>
      <div class="stat"><div class="label">${t('stat.netdebt','Deuda neta')}</div>${netDebtDisp === null
        ? `<div class="value">${t('stat.nodata','Sin dato')}</div><div class="stat-sub">${t('stat.netdebt.none','ningún ejercicio cargado informa deuda')}</div>`
        : `<div class="value">${fmtAmountPlain(netDebtDisp, currentCurrency)}</div><div class="stat-sub">${computeYearForClub(currentClub, añoDeuda).yearLabel}</div>`}</div>
      <div class="stat"><div class="label" title="${t('stat.netspend.tip','Gestión actual')}">${t('stat.netspend','Gasto neto en pases')}</div><div class="value ${netSpend>=0?'pos':'neg'}">${fmtAmount(netSpend, 'USD')}</div></div>
      <div class="stat"><div class="label">${t('stat.members','Socios activos')}</div><div class="value">${members ? members.toLocaleString('es-AR') : t('stat.nodata','Sin dato')}</div></div>
    `;
  }


  // Atajo de traducción (Versión 115). `I18N` vive en js/i18n.js, que se carga ANTES que este
  // archivo. Se envuelve igual por las dudas: si i18n.js no cargara, el sitio tiene que seguir
  // funcionando en castellano en vez de tirar ReferenceError y dejar Inicio en blanco.
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }

  // Traduce SOLO las etiquetas que son del sitio (buckets de Formato simplificado y catch-alls,
  // ver data/site-labels.js). Una etiqueta que no está en ese mapa es un rubro textual del balance
  // del club (`rawLabel`) y pasa de largo SIN tocar, que es justo lo que queremos: el sitio muestra
  // cada club tal cual lo reporta. Ojo: esto traduce al DIBUJAR, no cambia `label`, porque el
  // castellano es la clave con la que matchea findPrevVal()/el overlay de presupuesto.
  function tLabel(label){
    const key = (window.SITE_LABEL_KEYS || {})[label];
    return key ? t(key, label) : label;
  }

  // hex (#rrggbb) -> rgba(...) con el alpha pedido. Sirve para atenuar el color de un bucket/serie
  // en un año "Presupuesto" sin mantener una 2da paleta de colores en paralelo (mismo color, menos
  // opacidad) — ver drawInicioStackedChart/drawInicioMetricChart más abajo.
  function hexToRgba(hex, alpha){
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // Clic en cualquier barra/segmento de los 3 gráficos de Inicio -> Finanzas, "Año a año", ese
  // mismo año. Si el año no tiene ningún dato real (reportType placeholder/pending_official, el
  // mismo criterio que ya lo deja en blanco en el gráfico) no navega: ese año ni siquiera es una
  // opción real del <select id="anioSelect"> de Finanzas para algunos clubes (ver
  // populateFinanzasSelectors), y para los que sí tienen la opción (ej. River 2021/2025,
  // placeholder pero con entrada en riverFiscalYearMeta) mostrar ese "dato" placeholder no tiene
  // más sentido acá que en el propio gráfico, que también lo deja en blanco.
  function goToFinanzasYear(clubId, year){
    if(clubId !== currentClub) return;
    const rt = reportTypeForYear(clubId, year);
    if(rt === 'placeholder' || rt === 'pending_official') return;
    document.querySelector('#mainNav button[data-section="finanzas"]').click();
    document.getElementById('anioSelect').value = String(year);
    const anioBtn = document.querySelector('#viewToggle button[data-view="anio"]');
    // Si ya estaba en "Año a año", el click de arriba no dispara su propio listener (no cambia de
    // botón activo), así que hay que llamar a refreshFinanzas() a mano para que tome el año nuevo
    // que se acaba de setear. Si HABÍA que cambiar de "Por gestión" a "Año a año", ese click ya
    // dispara refreshFinanzas() solo (con el año ya seteado), llamarlo de nuevo sería redundante.
    if(anioBtn.classList.contains('active')) refreshFinanzas(); else anioBtn.click();
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Callback compartido de `onClick` por los 3 gráficos de Inicio: con `interaction:{mode:'index',
  // intersect:false}` en options, `elements` ya trae un elemento por dataset visible en ese índice
  // de año (alcanza con mirar el primero para saber a qué año corresponde el click).
  function inicioChartOnClick(clubId, years){
    return (evt, elements) => {
      if(!elements.length) return;
      goToFinanzasYear(clubId, years[elements[0].index]);
    };
  }

  // Título del tooltip compartido: "AAAA/AAAA" (el período, mismo formato que ya usa el resto del
  // sitio para un ejercicio) o "AAAA/AAAA (Presupuesto)" si ese ejercicio no tiene balance real
  // todavía (ver yearKindForClub en js/finanzas-calc.js) — así el usuario sabe, con solo pasar el
  // mouse, si lo que está viendo es un balance auditado o una proyección.
  // AGREGADO al onboardear Brasil: esta función y `inicioPeriodLabels` de abajo asumían el rango de
  // temporada "AAAA-1/AAAA" para CUALQUIER club (correcto para los clubes argentinos, todos con
  // ejercicio jul-jun o sep-ago) — para un club de ejercicio calendario (`isCalendarYearClub`,
  // js/finanzas-calc.js) eso mostraría un rango de fecha FALSO en el tooltip/eje X de Inicio (ej.
  // "2023/2024" para un balance que es 1/1/2024-31/12/2024 entero). Leen `currentClub` (global de
  // index.html) en vez de recibir un `clubId` nuevo porque estas 2 funciones ya se llaman siempre
  // para el club actualmente elegido (`renderInicioCharts()`, sin parámetro de club) — no hace
  // falta tocar ningún call site.
  function inicioTooltipTitle(years, kinds){
    return (items) => {
      const idx = items[0].dataIndex;
      const periodo = isCalendarYearClub(currentClub) ? String(years[idx]) : (years[idx]-1)+'/'+years[idx];
      return kinds[idx] === 'presupuesto' ? `${periodo} (Presupuesto)` : periodo;
    };
  }

  // Cada tick del eje X pasa a ser el PERÍODO completo ("2026"/"2027", Chart.js dibuja un array de
  // strings como 2 líneas) en vez de un solo año suelto — pedido explícito de Guido, mismo criterio
  // que ya usa el resto del sitio (`(year-1)+'/'+year`, ver populateFinanzasSelectors). 2 líneas en
  // vez de "2026/2027" en una sola para no ensanchar cada columna del gráfico.
  // Club calendario: un solo año no necesita 2 líneas, pero se devuelve igual como array de 1
  // elemento para no romper el contrato de Chart.js (espera siempre un array por tick acá).
  function inicioPeriodLabels(years){
    return years.map(y => isCalendarYearClub(currentClub) ? [String(y)] : [String(y-1), String(y)]);
  }

  // Plugin compartido por los 3 gráficos de Inicio: sobre cada columna SIN ningún dato real
  // (yearKindForClub === 'blank', ver `kinds`), un texto vertical (rotado 90°) que dice "No
  // informado por el club", centrado en esa columna — para que una columna vacía se lea como "no
  // tenemos el dato" y no como "el club tuvo $0 ese año".
  function blankColumnLabelsPlugin(kinds){
    return {
      id: 'inicioBlankColumn',
      afterDraw(chart){
        const {ctx, chartArea, scales} = chart;
        if(!chartArea) return;
        const xScale = scales.x;
        ctx.save();
        ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
        ctx.fillStyle = '#9a9fa8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        kinds.forEach((k, i) => {
          if(k !== 'blank') return;
          const x = xScale.getPixelForTick(i);
          const yMid = (chartArea.top + chartArea.bottom) / 2;
          ctx.save();
          ctx.translate(x, yMid);
          ctx.rotate(-Math.PI/2);
          ctx.fillText(t('chart.nodata','No informado por el club'), 0, 0);
          ctx.restore();
        });
        ctx.restore();
      }
    };
  }

  // Plugin de los 2 gráficos APILADOS (Ingresos/Gastos): (a) el % que representa cada segmento
  // sobre el total de ESE año, centrado adentro del segmento (se omite si el segmento da <5% o es
  // muy chico para que entre el texto, mismo criterio que pctSliceLabelsPlugin del doughnut); (b) el
  // total del año (suma de todos los buckets), en negrita, arriba de la pila. Lee la geometría real
  // de cada `BarElement` ya dibujado (`getProps`), no recalcula nada de layout a mano.
  const stackedValueLabelsPlugin = {
    id: 'inicioStackedValueLabels',
    afterDatasetsDraw(chart){
      const {ctx} = chart;
      const datasets = chart.data.datasets;
      if(!datasets.length) return;
      const n = datasets[0].data.length;
      ctx.save();
      for(let i=0; i<n; i++){
        const values = datasets.map(d => d.data[i]);
        if(values.every(v => v === null || v === undefined)) continue; // año en blanco
        const total = values.reduce((s,v) => s + (v||0), 0);
        let topY = null, xCenter = null;
        datasets.forEach((d, di) => {
          const el = chart.getDatasetMeta(di).data[i];
          const v = values[di];
          if(!el || !v) return;
          const {x, y, base} = el.getProps(['x','y','base'], true);
          xCenter = x;
          if(topY === null || y < topY) topY = y;
          const segHeight = base - y;
          const pct = total ? Math.round((v/total)*100) : 0;
          if(pct >= 5 && segHeight >= 14){
            ctx.font = '700 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const label = pct + '%';
            const midY = (y+base)/2;
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(0,0,0,.45)';
            ctx.strokeText(label, x, midY);
            ctx.fillStyle = '#fff';
            ctx.fillText(label, x, midY);
          }
        });
        if(xCenter !== null && topY !== null){
          ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = '#1a1a1a';
          ctx.fillText(total.toFixed(1), xCenter, topY - 4);
        }
      }
      ctx.restore();
    }
  };

  // Mismo total-arriba-de-la-barra que stackedValueLabelsPlugin, para el gráfico de Deuda (una sola
  // serie, sin %). `Math.min(y, base)` en vez de asumir signo: una deuda neta negativa (más caja que
  // deuda) dibuja la barra HACIA ABAJO del cero, así que el "arriba de la barra" real puede ser
  // cualquiera de los 2 extremos según el signo.
  const singleBarTotalPlugin = {
    id: 'inicioSingleBarTotal',
    afterDatasetsDraw(chart){
      const {ctx} = chart;
      const data = chart.data.datasets[0].data;
      const meta = chart.getDatasetMeta(0);
      ctx.save();
      ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = '#1a1a1a';
      meta.data.forEach((el, i) => {
        const v = data[i];
        if(v === null || v === undefined || !el) return;
        const {x, y, base} = el.getProps(['x','y','base'], true);
        ctx.fillText(v.toFixed(1), x, Math.min(y, base) - 4);
      });
      ctx.restore();
    }
  };

  // Leyenda HTML propia (reemplaza la leyenda nativa de Chart.js) para los 2 gráficos apilados: un
  // <div> con CSS Grid (mismo `grid-template-columns` en los 2 cards, ver .inicio-legend) para que
  // las leyendas de Ingresos y Gastos queden alineadas entre sí columna por columna, algo que la
  // leyenda nativa (flex-wrap centrado, ancho de fila distinto según cuánto texto entre) no garantiza.
  function renderInicioLegend(containerId, datasets){
    document.getElementById(containerId).innerHTML = datasets.map(d =>
      `<span class="inicio-legend-item"><span class="inicio-legend-swatch" style="background:${d.color}"></span>${tLabel(d.label)}</span>`
    ).join('');
  }

  // Los 2 gráficos APILADOS de Inicio (Ingresos/Gastos): un dataset de Chart.js por categoría de
  // "Formato Simplificado" (ver inicioStackedSeriesForClub en js/finanzas-calc.js, YA vienen
  // ordenados de mayor a menor según el último ejercicio disponible), TODOS los ejercicios del club
  // en orden cronológico sin saltear ninguno. Los años "Presupuesto" se dibujan con el MISMO color
  // de cada bucket pero atenuado (alpha .45 vs. 1) en vez de un color aparte, así no se rompe el
  // mapeo color-bucket de la leyenda; el título del tooltip aclara "(Presupuesto)" en esos años para
  // que quede clarísimo igual (ver inicioTooltipTitle).
  function drawInicioStackedChart(canvasId, prevInst, years, kinds, datasets){
    if(typeof Chart === 'undefined') return prevInst;
    const ctx = document.getElementById(canvasId).getContext('2d');
    if(prevInst) prevInst.destroy();
    const chartDatasets = datasets.map(d => ({
      label: d.label,
      data: d.data,
      backgroundColor: kinds.map(k => hexToRgba(d.color, k === 'presupuesto' ? 0.45 : 1)),
    }));
    return new Chart(ctx, {
      type:'bar',
      data:{ labels: inicioPeriodLabels(years), datasets: chartDatasets },
      options:{
        responsive:true, maintainAspectRatio:false, layout:{padding:{top:34}},
        interaction:{ mode:'index', intersect:false },
        scales:{
          x:{ stacked:true, title:{display:false} },
          y:{ stacked:true, beginAtZero:true, title:{display:false} },
        },
        plugins:{
          legend:{display:false},
          tooltip:{ callbacks:{ title: inicioTooltipTitle(years, kinds) } },
        },
        onClick: inicioChartOnClick(currentClub, years),
      },
      plugins:[blankColumnLabelsPlugin(kinds), stackedValueLabelsPlugin],
    });
  }

  // El gráfico de Deuda neta de Inicio: única serie, no apilada (la deuda no se desglosa por
  // categoría de "Formato Simplificado", ese concepto es solo de Ingresos/Gastos). Mismo criterio
  // de color atenuado + tooltip "(Presupuesto)" que los 2 gráficos apilados de arriba.
  function drawInicioMetricChart(canvasId, prevInst, years, kinds, values, label, color){
    if(typeof Chart === 'undefined') return prevInst;
    const ctx = document.getElementById(canvasId).getContext('2d');
    if(prevInst) prevInst.destroy();
    return new Chart(ctx, {
      type:'bar',
      data:{ labels: inicioPeriodLabels(years), datasets:[{
        label, data: values,
        backgroundColor: kinds.map(k => hexToRgba(color, k === 'presupuesto' ? 0.45 : 1)),
      }] },
      // layout.padding.top: deja lugar para el total arriba de la barra y para el "$" de
      // .chart-axis-dollar, que no se superpongan con el tick más alto del eje Y.
      options:{
        responsive:true, maintainAspectRatio:false, layout:{padding:{top:34}},
        interaction:{ mode:'index', intersect:false },
        plugins:{
          legend:{display:false},
          tooltip:{ callbacks:{ title: inicioTooltipTitle(years, kinds) } },
        },
        scales:{ y:{beginAtZero:true, title:{display:false}}, x:{title:{display:false}} },
        onClick: inicioChartOnClick(currentClub, years),
      },
      plugins:[blankColumnLabelsPlugin(kinds), singleBarTotalPlugin],
    });
  }

  // Los 3 cards de evolución de Inicio (Ingresos/Gastos/Deuda neta), TODOS los ejercicios del club
  // seleccionado en orden cronológico, sin saltear ninguno (en blanco el que no tenga dato real). Se
  // llama junto con renderInicioStats(): al cargar la página (INIT) y cada vez que se cambia de club
  // (refreshAllForClub()).
  function renderInicioCharts(){
    const ingresosSeries = inicioStackedSeriesForClub(currentClub, INICIO_INGRESOS_BUCKETS, 'ingresos');
    inicioIngresosChartInst = drawInicioStackedChart('inicioIngresosChart', inicioIngresosChartInst, ingresosSeries.years, ingresosSeries.kinds, ingresosSeries.datasets);
    renderInicioLegend('inicioIngresosLegend', ingresosSeries.datasets);

    const gastosSeries = inicioStackedSeriesForClub(currentClub, INICIO_GASTOS_BUCKETS, 'gastos');
    inicioGastosChartInst = drawInicioStackedChart('inicioGastosChart', inicioGastosChartInst, gastosSeries.years, gastosSeries.kinds, gastosSeries.datasets);
    renderInicioLegend('inicioGastosLegend', gastosSeries.datasets);

    const deudaSeries = inicioDeudaSeriesForClub(currentClub);
    inicioDeudaChartInst = drawInicioMetricChart('inicioDeudaChart', inicioDeudaChartInst, deudaSeries.years, deudaSeries.kinds, deudaSeries.values, 'Deuda neta', '#6b6b6b');
  }


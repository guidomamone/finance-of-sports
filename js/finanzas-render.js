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
// (ver numeros-de-boca/.claude/skills/club-data-mapping/SKILL.md, historial
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
    const findPrevVal = (label) => { if(!prevList) return null; const m = prevList.find(x => x.label === label); return m ? m.value : null; };
    // El total tiene que estar calculado ANTES de generar el HTML de cada fila (para poder mostrar
    // el % de cada una contra el total ya cerrado), antes se acumulaba fila por fila en el mismo
    // paso en el que se generaba su HTML, así que ninguna fila conocía el total final todavía.
    const total = curList.reduce((s,c) => s + nativeDisplayVal(c.value, meta, targetCurrency), 0);
    const totalPrev = prevList ? prevList.reduce((s,c) => s + nativeDisplayVal(c.value, prevMeta, targetCurrency), 0) : null;
    const rowsHtml = curList.map((c, i) => {
      const curVal = nativeDisplayVal(c.value, meta, targetCurrency);
      const prevRaw = findPrevVal(c.label);
      const prevVal = prevRaw !== null ? nativeDisplayVal(prevRaw, prevMeta, targetCurrency) : null;
      const pctCell = `<td>${fmtPctOfTotal(curVal, total)}</td>`;
      const prevPctCell = `<td>${prevVal !== null && totalPrev !== null ? fmtPctOfTotal(prevVal, totalPrev) : '—'}</td>`;
      if(c.items && c.items.length){
        const rowId = groupPrefix+'-'+i;
        const itemsHtml = renderBreakdownRows(c.items, rowId, 0, meta, targetCurrency, total);
        return `<tr class="pl-clickable" onclick="toggleRevenueBreakdown('${rowId}', this)">
          <td><span class="pl-arrow">&#9656;</span>${c.label}</td>
          <td>${fmtDisplay(curVal)}</td>
          ${pctCell}
          <td>${prevVal !== null ? fmtDisplay(prevVal) : '—'}</td>
          ${prevPctCell}
        </tr>` + itemsHtml;
      }
      return `<tr>
        <td>${c.label}</td>
        <td>${fmtDisplay(curVal)}</td>
        ${pctCell}
        <td>${prevVal !== null ? fmtDisplay(prevVal) : '—'}</td>
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
    document.getElementById(containerId+'PrevLabel').innerHTML = overlayReport ? wrapHeaderLabel(ejercicioLabel(year, 'official_budget')) : '—';
    document.getElementById(containerId).classList.toggle('pl-hide-compare', !overlayReport);
    syncPLTableColgroup(!overlayReport);

    const ing = buildNativeSectionHtml('Ingresos', curReport.ingresos, overlayReport ? overlayReport.ingresos : null, curMeta, overlayMeta, currentCurrency, containerId+'-ing');
    const gas = buildNativeSectionHtml('Gastos', curReport.gastos, overlayReport ? overlayReport.gastos : null, curMeta, overlayMeta, currentCurrency, containerId+'-gas');

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
      return `<tr><td>${e.label}</td><td>${fmtDisplay(v)}</td><td>—</td><td>—</td><td>—</td></tr>`;
    }).join('');

    const resultado = ing.total + gas.total + extraTotal;
    // REGLA (Versión 60, pedido explícito de Guido: "para presupuesto... que resultado neto tenga
    // un numero, no me lo dejes incompleto"): el Resultado Neto de la columna Presupuesto es la
    // suma directa de sus propias revenueLines/expenseLines (`ing.totalPrev + gas.totalPrev`), SIN
    // sumarle ningún extraTotal — el overlay no tiene su propio concepto de extraRows separado, sus
    // líneas "extraordinarias" ya viven adentro de revenueLines/expenseLines como líneas normales
    // (ver nota en `data/racing-data.js`, `racingPresupuestoOverlayByYear[2020]`, corregida en esta
    // misma versión para que sea así en las 2 columnas).
    const resultadoOverlay = overlayReport ? (ing.totalPrev + gas.totalPrev) : null;
    const resultRow = `<tr class="pl-bold pl-highlight"><td>${curReport.resultLabel || 'Resultado neto'}</td><td>${fmtDisplay(resultado)}</td><td>—</td>` +
      `<td>${resultadoOverlay !== null ? fmtDisplay(resultadoOverlay) : '—'}</td><td>—</td></tr>`;

    document.querySelector('#'+containerId+' tbody').innerHTML =
      ing.html + '<tr class="pl-spacer"><td colspan="5"></td></tr>' + gas.html +
      (extraRowsHtml ? '<tr class="pl-spacer"><td colspan="5"></td></tr>' + extraRowsHtml : '') +
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
    return { ingresosTotal: ing.total, gastosTotal: gas.total, resultado, extraTotal };
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


  function renderDebtBlock(cur, prev, containerId){
    document.getElementById(containerId+'CurLabel').textContent = cur.yearLabel;
    document.getElementById(containerId+'PrevLabel').textContent = prev ? prev.yearLabel : '—';
    const curMeta = yearMeta(cur.year);
    const prevMeta = prev ? yearMeta(prev.year) : null;
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
      return `<tr class="${trCls}"><td>${r.label}</td><td>${curVal}</td><td>${prevVal}</td></tr>`;
    }).join('');
    const curUndisclosed = bocaYearIsReal(cur.year) && cur.grossDebt === 0 && cur.cash === 0;
    const prevUndisclosed = !!prev && bocaYearIsReal(prev.year) && prev.grossDebt === 0 && prev.cash === 0;
    document.getElementById('finanzasDebtNote').textContent = debtDisclosureNote(curUndisclosed, cur.yearLabel, prevUndisclosed, prev ? prev.yearLabel : '');
  }


  // Los ejercicios placeholder (sin balance/presupuesto oficial cargado) se grafican como `null`,
  // no como el número inventado. Chart.js deja esa barra vacía en vez de mostrar un dato falso
  // como si fuera real. Se completa a medida que se cargan balances reales (ver bocaYearIsReal()).
  function drawTrendChart(computedArr){
    if(typeof Chart === 'undefined') return;
    const ctx = document.getElementById('trendChart').getContext('2d');
    const labels = computedArr.map(c => String(c.year));
    const revenueData = computedArr.map(c => bocaYearIsReal(c.year) ? toDisplayValue(c.revenue, yearMeta(c.year), currentCurrency) : null);
    const expensesData = computedArr.map(c => bocaYearIsReal(c.year) ? Math.abs(toDisplayValue(c.expenses, yearMeta(c.year), currentCurrency)) : null);
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


  function drawBreakdownChart(cur){
    if(typeof Chart === 'undefined') return;
    const ctx = document.getElementById('breakdownChart').getContext('2d');
    const meta = yearMeta(cur.year);
    const otros = (cur.otrosDeportes||0) + (cur.basketProfesional||0) + (cur.futbolJuvenil||0) + (cur.futbolFemenino||0);
    const raw = [cur.cuotasSociales||0, cur.comerciales||0, cur.exhibicionEspectaculos||0, cur.abonos||0, cur.diversos||0, otros];
    const vals = raw.map(v => toDisplayValue(v, meta, currentCurrency));
    if(breakdownChartInst) breakdownChartInst.destroy();
    breakdownChartInst = new Chart(ctx, {
      type:'doughnut',
      data:{labels:['Cuotas Sociales','Comerciales','Exhibición Espect.','Abonos','Diversos','Otros'], datasets:[{data:vals, backgroundColor:['#0a2b5c','#f2b705','#1b7a3d','#8a5cf6','#b5372b','#6b6b6b']}]},
      // Leyenda a la derecha, en una sola columna: así queda siempre alineada (cada referencia
      // arranca del mismo borde), a diferencia de 'bottom' que envolvía filas de largo dispar.
      options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right', align:'start'}}},
      plugins:[pctSliceLabelsPlugin]
    });
  }


  // gastosTotal/ingresosTotal (opcionales): el "Total Gastos"/"Total Ingresos" YA calculados por
  // renderNativePLTable para este mismo ejercicio, en la moneda que se está mostrando, así estos
  // stats de arriba usan el mismo número que la tabla de abajo, sea cual sea el toggle activo
  // (Formato del club/Formato simplificado). Si no se pasan, caen al cálculo viejo (cur.revenue/
  // cur.expenses) por las dudas.
  //
  // BUG REAL corregido acá (Versión 42, reportado por Guido: "ingresos en un lado te suma un
  // numero y en otro, otro" para Boca 2024/2025): el fix de "Gastos" (usar gastosTotal en vez de
  // cur.expenses) ya existía desde antes, pero el mismo fix nunca se había aplicado a "Ingresos".
  // Ese stat seguía usando cur.revenue siempre, que para Boca EXCLUYE ingresos por venta de
  // jugadores (van netos a profitOnPlayerSales/PAT, no a "revenue", por diseño). Resultado: el
  // Ejercicio 2025 mostraba 3 números de "Ingresos" distintos, sin explicar por qué difieren: el
  // stat de arriba (152.899,94 M ARS, sin transferencias), "Formato del club" (237.614,57 M ARS,
  // transferencias BRUTAS incluidas como líneas propias, tal cual las reporta nativeFinancialsBoca)
  // y "Formato simplificado" (218.319,23 M ARS, ganancia NETA por venta de jugadores incluida como
  // fila "Venta de Jugadores"). El stat de arriba ahora usa ingresosTotal (mismo criterio que ya
  // regía para Gastos), así que SIEMPRE coincide con el total que se ve en la tabla de abajo, sea
  // cual sea el toggle. Las diferencias entre "Formato del club" y "Formato simplificado" siguen
  // existiendo (son un criterio de presentación distinto, no un error), pero ya no hay una tercera
  // cifra más arriba que no coincide con ninguna de las dos.
  // extraTotal (opcional, Versión 61: pedido explícito de Guido, "agregar Int en los cards del
  // inicio [de Finanzas] en los cuales se hace un breve resumen... cualquiera que vea Ingresos y
  // Egresos y vea que no cuadra con el Resultado neto va a pensar que es poco seria la página"):
  // Ingresos y Gastos de estos stats NUNCA incluían la fila "Intereses netos" (u otras extraRows)
  // que sí participan del Resultado neto de abajo, así que Ingresos-Gastos podía no dar el
  // Resultado neto mostrado, sin que nada en pantalla explicara la diferencia. El stat "Int." (iguala
  // a `extraTotal` de renderNativePLTable, mismo número que ya se suma en "Estado de resultados")
  // cierra la cuenta a simple vista: Ingresos + Gastos + Int. = Resultado neto. Si no se pasa
  // (ningún call site actual), no se agrega el stat, para no romper otro llamador futuro que no lo
  // tenga disponible.
  function renderFinanzasStatsFromComputed(cur, gastosTotal, ingresosTotal, extraTotal){
    const meta = yearMeta(cur.year);
    const revenueDisp = ingresosTotal !== undefined ? ingresosTotal : toDisplayValue(cur.revenue, meta, currentCurrency);
    const expensesDisp = gastosTotal !== undefined ? Math.abs(gastosTotal) : Math.abs(toDisplayValue(cur.expenses, meta, currentCurrency));
    const patDisp = toDisplayValue(cur.pat, meta, currentCurrency);
    const netDebtDisp = toDisplayValue(cur.netDebt, meta, currentCurrency);
    const extraStat = extraTotal !== undefined
      ? `<div class="stat"><div class="label" title="Intereses netos y otros ajustes que no son Ingresos ni Gastos operativos, pero sí suman al Resultado neto">Int.</div><div class="value ${extraTotal>=0?'pos':'neg'}">${fmtAmount(extraTotal, currentCurrency)}</div></div>`
      : '';
    document.getElementById('finanzasStats').innerHTML = `
      <div class="stat"><div class="label">Ingresos</div><div class="value">${fmtAmountPlain(revenueDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Gastos</div><div class="value">${fmtAmountPlain(expensesDisp, currentCurrency)}</div></div>
      ${extraStat}
      <div class="stat"><div class="label">Resultado neto</div><div class="value ${cur.pat>=0?'pos':'neg'}">${fmtAmount(patDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Deuda neta</div><div class="value">${fmtAmountPlain(netDebtDisp, currentCurrency)}</div></div>
    `;
  }


  function updateFinanzasByGestion(){
    const key = document.getElementById('gestionSelect').value;
    const g = gestionesInfo[key];
    const cur = computeYear(g.lastYear);
    const prev = g.firstYear !== g.lastYear ? computeYear(g.firstYear) : null;
    const plTotals = renderNativePLTable('boca', cur.year, cur.yearLabel, 'finanzasPLTable');
    renderFinanzasStatsFromComputed(cur, plTotals.gastosTotal, plTotals.ingresosTotal, plTotals.extraTotal);
    renderDebtBlock(cur, prev, 'finanzasDebtTable');
    const years = []; for(let y=g.firstYear; y<=g.lastYear; y++){ if(yearsRaw[y]) years.push(y); }
    drawTrendChart(years.map(y => computeYear(y)));
    drawBreakdownChart(cur);
    renderSupuestosCard('boca', g.lastYear);
    renderPresupuestoFinancieroCard('boca', g.lastYear);
    renderPresupuestoInversionesCard('boca', g.lastYear);
    renderTorneosCard('boca', g.lastYear);
  }


  function updateFinanzasByAnio(){
    const y = parseInt(document.getElementById('anioSelect').value, 10);
    const cur = computeYear(y);
    const prev = yearsRaw[y-1] ? computeYear(y-1) : null;
    const plTotals = renderNativePLTable('boca', cur.year, cur.yearLabel, 'finanzasPLTable');
    renderFinanzasStatsFromComputed(cur, plTotals.gastosTotal, plTotals.ingresosTotal, plTotals.extraTotal);
    renderDebtBlock(cur, prev, 'finanzasDebtTable');
    // Versión 81: array explícito de los años que Finanzas muestra (ya NO deriva de
    // Object.keys(yearsRaw) — yearsRaw sigue teniendo los 5 años placeholder de siempre, ver
    // comentario en data/boca-data.js, porque Comparar Gestiones/Pases/Resultados todavía los usan;
    // si este gráfico leyera yearsRaw directo, esos 5 volverían a aparecer acá). Mismo criterio que
    // gestionesInfo/el <select> de abajo: estos 4 son los únicos años que Finanzas expone.
    const allYears = [2024,2025,2026,2027];
    drawTrendChart(allYears.map(yy => computeYear(yy)));
    drawBreakdownChart(cur);
    renderSupuestosCard('boca', y);
    renderPresupuestoFinancieroCard('boca', y);
    renderPresupuestoInversionesCard('boca', y);
    renderTorneosCard('boca', y);
  }


  // La tabla "tal cual la muestra el club" (renderNativePLTable, más arriba) ya cubre River/Racing
  // también: nativeReportFor() lee cur.revenueLines/expenseLines directo (rawLabel tal cual la
  // fuente), así que no hace falta una versión "Generic" separada de plRows/renderPLTable.

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
      return `<tr class="${trCls}"><td>${r.label}</td><td>${curVal}</td><td>${prevVal}</td></tr>`;
    }).join('');
    // Misma regla general que renderDebtBlock (Boca): un año oficial (no placeholder) con
    // Deuda bruta = Caja = 0 es un documento que no desglosa deuda, no una deuda real de cero.
    const curUndisclosed = cur.meta.reportType !== 'placeholder' && cur.grossDebt === 0 && cur.cash === 0;
    const prevUndisclosed = !!prev && prev.meta.reportType !== 'placeholder' && prev.grossDebt === 0 && prev.cash === 0;
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
    const extraStat = extraTotal !== undefined
      ? `<div class="stat"><div class="label" title="Intereses netos y otros ajustes que no son Ingresos ni Gastos operativos, pero sí suman al Resultado neto">Int.</div><div class="value ${extraTotal>=0?'pos':'neg'}">${fmtAmount(extraTotal, currentCurrency)}</div></div>`
      : '';
    document.getElementById('finanzasStats').innerHTML = `
      <div class="stat"><div class="label">Ingresos</div><div class="value">${fmtAmountPlain(revenueDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Gastos</div><div class="value">${fmtAmountPlain(expensesDisp, currentCurrency)}</div></div>
      ${extraStat}
      <div class="stat"><div class="label">Resultado neto</div><div class="value ${cur.pat>=0?'pos':'neg'}">${fmtAmount(patDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Deuda neta</div><div class="value">${fmtAmountPlain(netDebtDisp, currentCurrency)}</div></div>
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
    const gestiones = gestionesByClub[clubId];
    const key = document.getElementById('gestionSelect').value;
    const g = gestiones[key];
    if(!g) return;
    const cur = computeYearGeneric(clubId, g.lastYear);
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
    let years;
    if(clubId === 'boca'){
      // Versión 81: se sacó ameal/angelici de este <select> (quita los años placeholder de
      // Finanzas, ver gestionesInfo en data/boca-data.js) — SOLO acá, `gestionesByClub.boca`
      // (data/clubs.js), que alimenta Pases/Resultados/Comparar/Inicio, sigue con las 3 gestiones.
      gestionSelect.innerHTML = `<option value="riquelme">Riquelme (2023-actual)</option>`;
      // REGLA (Versión 56): el sufijo entre paréntesis sale de `anioDropdownSuffix(reportTypeForYear(...))`
      // (js/finanzas-calc.js), no de un texto suelto por año como antes (cada uno redactado
      // distinto: "presupuestado", "esperando datos"). Ver el comentario de esa función para el
      // detalle de qué reportType mapea a qué palabra.
      // REGLA (Versión 61, pedido explícito de Guido: "que no aparezca 'ejercicio 2020/2021' sino
      // '2020/2021'. Ejercicio sino queda muy redundante y agota la vista"): sin el prefijo
      // "Ejercicio " que tenían todas las opciones antes, el rango de años solo. El prefijo sigue
      // vivo en OTRO lugar (el header "Ejercicio/Balance/Presupuesto AAAA/AAAA" de la tabla Estado
      // de resultados, `ejercicioLabel()`), esto solo afecta el texto del propio `<select>`.
      // Versión 81: array explícito de los 4 años reales/pending que Finanzas expone para Boca (no
      // Object.keys(yearsRaw) — ese objeto sigue con los 5 años placeholder de siempre, ver
      // comentario en data/boca-data.js, así que derivar de ahí los volvería a mostrar acá).
      years = [2027,2026,2025,2024].map(value => ({
        value, label:(value-1)+'/'+value+anioDropdownSuffix(reportTypeForYear('boca', value)),
      }));
    } else {
      const gestiones = gestionesByClub[clubId];
      gestionSelect.innerHTML = Object.keys(gestiones).map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
      // Ternario, no un objeto armado de una (ver mismo comentario en drawTrendChartGeneric): con
      // lazy-loading, el club que no se está mirando puede no estar cargado todavía.
      const meta = CLUB_GENERIC_DATA[clubId].fiscalYearMeta;
      // Object.keys() de un objeto con claves numéricas ("2024","2025"...) las devuelve SIEMPRE en
      // orden ASCENDENTE (son "integer-like keys". JS las reordena así sin importar el orden en el
      // código fuente), por eso salía el ejercicio más viejo primero. Se ordena acá a mano,
      // descendente, mismo criterio que la lista de Boca arriba.
      // El dropdown de River/Racing luce igual que el de Boca (`#anioSelect` estático +
      // `populateFinanzasSelectors` más arriba). El sufijo entre paréntesis sale de
      // `anioDropdownSuffix()` (js/finanzas-calc.js, Versión 56), mismo criterio y mismas 4
      // palabras posibles que usa Boca arriba. Sin el prefijo "Ejercicio " (Versión 61, ver mismo
      // comentario en la rama de Boca arriba): antes decía "Ejercicio AAAA/AAAA", ahora solo el
      // rango de años.
      years = Object.keys(meta).map(Number).sort((a,b) => b - a).map(y => ({
        value:y, label: (y-1)+'/'+y+anioDropdownSuffix(meta[y].reportType),
      }));
    }
    anioSelect.innerHTML = years.map(y => `<option value="${y.value}">${y.label}</option>`).join('');
    if(!isNaN(previousYear) && years.length){
      const exact = years.find(y => y.value === previousYear);
      const target = exact || years.reduce((best, y) => Math.abs(y.value - previousYear) < Math.abs(best.value - previousYear) ? y : best);
      anioSelect.value = String(target.value);
    }
  }


  // presupuestoSupuestosByClub: los supuestos/premisas que declara CADA presupuesto, por club y
  // ejercicio (Versión 34). REGLA (pedida por Guido, no una decisión puntual de un club): el card
  // "Supuestos" de Finanzas SIEMPRE tiene que estar, para cualquier club/ejercicio, si el
  // documento de ese ejercicio no declara supuestos (un balance auditado, un ejercicio todavía
  // placeholder, o un presupuesto que no llegó a transcribirse con este detalle), el card lo dice
  // EXPLÍCITO en vez de desaparecer (ver `renderSupuestosCard` más abajo, que arma ese mensaje).
  // Cuando se onboardee un presupuesto nuevo (club existente o club nuevo), hay que sumarle su
  // entrada acá, no es opcional, es lo que hace cumplir la regla.
  const presupuestoSupuestosByClub = {
    boca: {
      2027: {
        docLabel: 'Ejercicio N° 123, del 1° de julio de 2026 al 30 de junio de 2027. Está en pesos argentinos constantes a abril de 2026.',
        sections: [
          { heading:'Supuestos macroeconómicos', items: [
            'Moneda de presentación: pesos argentinos constantes a abril de 2026.',
            'Tipo de cambio nominal de referencia: $1.480 por USD en julio de 2026, $1.840 por USD en junio de 2027.',
            'Inflación acumulada proyectada para el período: 21%.',
            'Política salarial: los costos laborales se ajustan en línea con la inflación estimada.',
          ]},
          { heading:'Políticas de ingresos', items: [
            'Cuotas sociales: se toma la cantidad de socios real a abril de 2026, con ajuste mensual por inflación.',
            'Campeonatos oficiales: participación prevista en dos competencias organizadas por la Liga.',
            'Derechos de TV: proyectados según estimaciones de la Liga Profesional.',
            'Copa Libertadores: se proyecta llegar a cuartos de final en 2026 y fase de grupos en 2027.',
            'Copa Argentina: se proyecta avanzar hasta cuartos de final en 2026 y primera ronda en 2027.',
            'Partidos amistosos: se contemplan dos, uno de local.',
            'Abonos (palcos y plateas): evolucionan según la inflación mensual.',
            'Ingresos comerciales: contratos vigentes y renovaciones previstas (indumentaria, sponsor de pecho, espalda/pantalón/mangas, publicidad estática, merchandising, otros acuerdos).',
            'Fútbol juvenil: derechos de formación y mecanismos de solidaridad.',
            'Otros deportes y básquet: aranceles, cuotas, sponsoreo, TV y recaudaciones propias.',
            'Ingresos diversos: resultados financieros por inversión de excedentes de liquidez, beneficios del Decreto 510/23, ingresos del Departamento Médico.',
            'Transferencias de jugadores: no se contempla ningún ingreso por ventas o préstamos en este presupuesto.',
          ]},
          { heading:'Política de gastos', items: [
            'Gastos operativos: metodología de presupuesto base cero para todos los sectores.',
            'Plantel profesional: premios según acuerdos vigentes ajustados por inflación esperada; primas y amortizaciones calculadas sobre la estructura actual del plantel, sin incorporaciones adicionales presupuestadas.',
            'Gastos generales: donaciones, IVA, seguros, gastos financieros y bancarios, previsión por contingencias legales e indemnizaciones, aportes institucionales (incluye Fundación Boca Social).',
            'Amortizaciones: de bienes de uso, instalaciones y otros activos.',
            'Gastos eventuales: margen de contingencia de hasta 0,4% de los ingresos para desvíos no previstos.',
          ]},
        ],
      },
    },
    racing: {
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
    },
  };


  // Card "Supuestos": REGLA (Versión 42, reemplaza la regla de la Versión 34 documentada acá
  // abajo, pedido explícito de Guido). Antes el card SIEMPRE se mostraba, con un mensaje "no hay"
  // cuando el ejercicio no tenía supuestos (ej. un balance auditado, que no es un presupuesto).
  // Guido decidió que ese mensaje ocupa espacio sin aportar nada para esos casos: ahora el card se
  // ESCONDE por completo (display:none en #supuestosCard) cuando no hay datos en
  // presupuestoSupuestosByClub para ese club+año, en vez de mostrar la explicación. Mismo criterio
  // para Presupuesto Financiero, Presupuesto de Inversiones e Ingresos y Egresos por Torneo, más
  // abajo en este mismo archivo.
  function renderSupuestosCard(clubId, year){
    const card = document.getElementById('supuestosCard');
    const data = (presupuestoSupuestosByClub[clubId] || {})[year];
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
    let meta;
    if(currentClub === 'boca'){
      const year = isGestion ? gestionesInfo[document.getElementById('gestionSelect').value].lastYear : parseInt(document.getElementById('anioSelect').value, 10);
      meta = year === 2027 ? { reportType:'official_budget', sourceId:'boca-presupuesto-2026-27' }
        : year === 2025 ? { reportType:'official_balance_sheet', sourceId:'boca-balance-2024-25' }
        : (year === 2024 || year === 2026) ? { reportType:'pending_official', sourceId:null }
        : { reportType:'placeholder', sourceId:'boca-placeholder-historico' };
    } else {
      const year = isGestion ? gestionesByClub[currentClub][document.getElementById('gestionSelect').value].lastYear : parseInt(document.getElementById('anioSelect').value, 10);
      meta = (CLUB_GENERIC_DATA[currentClub].fiscalYearMeta[year]) || {};
    }
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
    banner.innerHTML = `⚠️ <strong>${kind}.</strong>` +
      (src ? ` Fuente: ${src.title}${src.url ? ` (<a href="${src.url}" target="_blank" rel="noopener">ver</a>)` : ''}.` : '') +
      (src && src.note ? ` ${src.note}` : '');
  }


  // Cifras del card "Presupuesto Financiero" (Ejercicio 2026/2027), en ARS MILLONES exactos,
  // mismo criterio que yearsRaw[2027] (Guido pidió que respondan al toggle USD/ARS de Finanzas,
  // como el resto de los números de Boca). Es solo de presentación: no alimenta ningún cálculo/KPI.
  const presupuestoFinanciero2027 = [
    {label:'Saldo Inicial', op:'', magnitude:6045.520},
    {label:'Créditos a cobrar', op:'+', magnitude:8170.900},
    {label:'Ingresos', op:'+', magnitude:239226.960},
    {label:'Deudas a pagar', op:'−', magnitude:12601.624},
    {label:'Gastos', op:'−', magnitude:194009.816},
    {label:'Inversiones Obras', op:'−', magnitude:41767.058},
    {label:'Saldo al Cierre', op:'=', magnitude:5064.882, isResult:true},
  ];

  // renderWaterfallSteps: genérico (Versión 35, antes era renderPresupuestoFinancieroWaterfall(),
  // hardcodeado a Boca 2027). Pinta una lista de steps {label, op, magnitude, isResult?} adentro de
  // containerId, convirtiendo cada magnitude con `meta` + currentCurrency. Lo usan tanto Boca 2027
  // (steps hardcodeados en presupuestoFinanciero2027, meta=yearMeta(2027)) como el Presupuesto
  // Financiero genérico de Racing (steps armados al vuelo desde presupuestoFinancieroByClub,
  // meta=yearMetaFor(clubId, year)).
  function renderWaterfallSteps(containerId, steps, meta){
    const wrap = document.getElementById(containerId);
    if(!wrap) return;
    wrap.innerHTML = steps.map(step => {
      const disp = toDisplayValue(step.magnitude, meta, currentCurrency);
      const valCls = step.isResult ? (disp >= 0 ? ' pos' : ' neg') : '';
      const stepHtml = `<div class="stat waterfall-step${step.isResult ? ' waterfall-result' : ''}"><div class="label">${step.label}</div><div class="value${valCls}">${fmtAmountPlain(disp, currentCurrency)}</div></div>`;
      return step.op ? `<div class="waterfall-op">${step.op}</div>${stepHtml}` : stepHtml;
    }).join('');
  }

  function renderPresupuestoFinancieroWaterfall(){
    renderWaterfallSteps('presupuestoFinancieroWaterfall', presupuestoFinanciero2027, yearMeta(2027));
  }


  // presupuestoFinancieroByClub / presupuestoInversionesByClub (Versión 35): "homologar lo que se
  // pueda homologar", mismo espíritu que presupuestoSupuestosByClub, pero OJO con una diferencia
  // real entre documentos: el presupuesto de Boca distingue un "presupuesto económico" (devengado)
  // de un "presupuesto financiero" (caja, con créditos/deudas del ejercicio anterior); el de
  // Racing YA está armado en base de caja desde el origen (sus propias líneas dicen "Cobranzas
  // por...", "Cobros por...", "Pago de...", no hay devengado vs. percibido que reconciliar), así
  // que su Presupuesto Financiero es un waterfall más simple (Saldo Inicial + Ingresos − Egresos =
  // Saldo al Cierre, sin las filas de créditos/deudas del ejercicio anterior que sí tiene Boca),
  // no es un descuido, es fiel a que el documento de Racing no tiene ese concepto para reconciliar.
  // Cifras: SALDO INICIAL DE CAJA Y BANCOS (I) de julio, TOTAL INGRESOS/EGRESOS DE FONDOS DEL
  // PERÍODO (columna TOTAL PERÍODO) y el último valor de FLUIR DE FONDOS DEL PERÍODO (columna
  // TOTAL PERÍODO, que en esa fila específica es el saldo de caja de junio, no una suma de los 12
  // meses), de racing-presupuesto-2025-26.md / presupuesto2026-27.md. Verificado a mano:
  // saldoInicial + ingresos − |egresos| = saldoFinal, exacto, para los dos ejercicios.
  const presupuestoFinancieroByClub = {
    racing: {
      2026: { saldoInicial:9324.935735, ingresos:123297.209473, egresos:126860.457441, saldoFinal:5761.687768,
        note:'A diferencia de Boca, el presupuesto de Racing ya está armado en base de caja desde el origen, no distingue un "presupuesto económico" devengado de uno financiero, así que este saldo usa las mismas cifras que el Estado de resultados de arriba, sin ajuste por cobros/pagos diferidos del ejercicio anterior.' },
      2027: { saldoInicial:5367.787912, ingresos:143118.482343, egresos:142071.747998, saldoFinal:6414.522257,
        note:'Mismo criterio que el Ejercicio 2025/2026: presupuesto en base de caja desde el origen, sin distinción entre devengado y percibido.' },
    },
  };

  // Racing agrupa sus inversiones/bienes de uso en UNA sola línea de egresos extraordinarios
  // ("Pago de gastos de compra de bienes de uso y mejoras" 2026 / equivalente 2027), sin desglosar
  // por obra individual como sí hace Boca (que nombra cada proyecto con su monto). Se muestra el
  // total real (ya cargado en racingExpenseLinesByYear como "Egresos extraordinarios...") con una
  // nota explícita de que no hay desglose por proyecto, no es un "no hay dato", es "el documento
  // no llega a ese nivel de detalle".
  const presupuestoInversionesByClub = {
    racing: {
      2026: { total:7014.228299, note:'El presupuesto de Racing agrupa este monto en una sola línea ("Egresos extraordinarios", compra de bienes de uso y mejoras) dentro del rubro Egresos Extraordinarios, sin desglosar por obra o proyecto individual como sí hace Boca. El texto del documento menciona en general obras en el Estadio, el predio de Ezeiza, el predio Tita Mattiussi y las sedes Avellaneda y Villa del Parque, pero no separa el monto entre ellas.' },
      2027: { total:10541.726845, note:'Mismo criterio que el Ejercicio 2025/2026: una sola línea sin desglosar por obra. El documento menciona en general la primera etapa del predio de Ezeiza, obras en el predio Tita Mattiussi, mejoras del Estadio, y las sedes Avellaneda, Villa del Parque y la nueva sede educativa.' },
    },
  };


  function renderPresupuestoFinancieroCard(clubId, year){
    const card = document.getElementById('presupuestoFinancieroCard');
    const isBoca2027 = clubId === 'boca' && year === 2027;
    const data = (presupuestoFinancieroByClub[clubId] || {})[year];
    if(!isBoca2027 && !data){ card.style.display = 'none'; return; }
    card.style.display = '';
    document.getElementById('pfBoca2027').style.display = isBoca2027 ? '' : 'none';
    const body = document.getElementById('presupuestoFinancieroBody');
    body.style.display = isBoca2027 ? 'none' : '';
    if(isBoca2027){ renderPresupuestoFinancieroWaterfall(); return; }
    const steps = [
      {label:'Saldo Inicial', op:'', magnitude:data.saldoInicial},
      {label:'Ingresos', op:'+', magnitude:data.ingresos},
      {label:'Egresos', op:'−', magnitude:data.egresos},
      {label:'Saldo al Cierre', op:'=', magnitude:data.saldoFinal, isResult:true},
    ];
    body.innerHTML = `<div class="waterfall-row" id="presupuestoFinancieroWaterfallGeneric"></div><p class="source-note">${data.note}</p>`;
    renderWaterfallSteps('presupuestoFinancieroWaterfallGeneric', steps, yearMetaFor(clubId, year));
  }


  function renderPresupuestoInversionesCard(clubId, year){
    const card = document.getElementById('presupuestoInversionesCard');
    const isBoca2027 = clubId === 'boca' && year === 2027;
    const data = (presupuestoInversionesByClub[clubId] || {})[year];
    if(!isBoca2027 && !data){ card.style.display = 'none'; return; }
    card.style.display = '';
    document.getElementById('piBoca2027').style.display = isBoca2027 ? '' : 'none';
    const body = document.getElementById('presupuestoInversionesBody');
    body.style.display = isBoca2027 ? 'none' : '';
    if(isBoca2027) return;
    const disp = toDisplayValue(data.total, yearMetaFor(clubId, year), currentCurrency);
    body.innerHTML = `
      <table class="mini-table"><colgroup><col><col style="width:130px"></colgroup>
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


  // Nota de fuente general de "Estado de resultados", al fondo de Finanzas, antes era texto fijo
  // (siempre citaba bocajuniors.com.ar, incluso mirando Racing o River). Un resumen por club, no por
  // ejercicio puntual (para eso está finanzasDataQualityBanner, que sí es por ejercicio).
  const finanzasClubSourceText = {
    boca: 'Fuente: bocajuniors.com.ar/club/presupuesto (placeholder para años históricos) · Ejercicio 2026/2027: Presupuesto oficial.',
    racing: 'Fuente: racingclub.com.ar/informes (archivo oficial completo de balances y presupuestos) · todos los ejercicios cargados son documentos oficiales reales (balances auditados o presupuesto oficial).',
    river: 'Fuente: Ejercicio 2023/2024, balance auditado real (réplica de la comunidad tuRiver, ver pestaña Fuentes) · resto de los ejercicios: placeholder.',
  };

  function renderClubSourceNote(){
    document.getElementById('finanzasClubSourceNote').textContent = finanzasClubSourceText[currentClub] || '';
  }


  // ---------- MERCADO DE PASES ----------
  function populatePasesSelectors(clubId){
    const gestiones = gestionesByClub[clubId];
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
    const gestiones = gestionesByClub[clubId];
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
    const gestiones = gestionesByClub[currentClub];
    const data = titulosDataForClub(currentClub) || [];
    document.querySelector('#resultadosTable tbody').innerHTML = data.map(t => `
      <tr><td>${t.anio}</td><td>${t.competencia}</td><td>${t.resultado}</td><td>${gestiones[t.gestion] ? gestiones[t.gestion].nombre : t.gestion}</td></tr>
    `).join('');
  }


  // ---------- COMPARAR ----------
  function populateCompararSelectors(clubId){
    const gestiones = gestionesByClub[clubId];
    const keys = Object.keys(gestiones);
    const optsHtml = keys.map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
    document.getElementById('compA').innerHTML = optsHtml;
    document.getElementById('compB').innerHTML = optsHtml;
    if(keys.length > 1) document.getElementById('compB').value = keys[1];
  }


  function renderComparar(){
    const aKey = document.getElementById('compA').value;
    const bKey = document.getElementById('compB').value;
    const gestiones = gestionesByClub[currentClub];
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
  function renderInicioStats(){
    const gestionKey = currentGestionKey(currentClub);
    const g = gestionesByClub[currentClub][gestionKey];
    const cur = computeYearForClub(currentClub, g.lastYear);
    // NO usa displayFinancialsForClub() acá a propósito — esa función fuerza USD siempre (la usa
    // "Comparar Gestiones", que por diseño ignora el toggle de moneda, ver su propio comentario en
    // js/finanzas-calc.js). El toggle de moneda ahora es universal (header, al lado del selector de
    // club) y también tiene que aplicar a estos 2 stats. "Gasto neto en pases" es la excepción: son
    // valores de mercado de pases, convencionalmente en USD sea cual sea el ejercicio/club (no
    // tienen un fx propio de ningún balance/presupuesto para convertir), se muestran siempre en USD.
    const meta = yearMetaFor(currentClub, cur.year);
    const patDisp = toDisplayValue(cur.pat, meta, currentCurrency);
    const netDebtDisp = toDisplayValue(cur.netDebt, meta, currentCurrency);
    const netSpend = pasesNetSpend(currentClub, gestionKey);
    const members = memberCountByClub[currentClub];
    // Los 4 labels entran siempre en una sola línea (evita que un card quede más alto que los
    // otros 3 y rompa la alineación de la fila) y en español completo — "Net spend histórico"
    // (mezcla con inglés, reportado por Guido) pasó a "Gasto neto en pases". El detalle que antes
    // iba en el propio texto (el ejercicio de "Último resultado", "gestión actual" de pases) se
    // movió a `title` (tooltip nativo al pasar el mouse), no se perdió información, solo se sacó
    // del texto visible.
    document.getElementById('inicioStats').innerHTML = `
      <div class="stat"><div class="label" title="Ejercicio ${cur.yearLabel}">Último resultado</div><div class="value ${patDisp>=0?'pos':'neg'}">${fmtAmount(patDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Deuda neta actual</div><div class="value">${fmtAmountPlain(netDebtDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label" title="Gestión actual">Gasto neto en pases</div><div class="value ${netSpend>=0?'pos':'neg'}">${fmtAmount(netSpend, 'USD')}</div></div>
      <div class="stat"><div class="label">Socios activos</div><div class="value">${members ? members.toLocaleString('es-AR') : 'Sin dato'}</div></div>
    `;
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
  function inicioTooltipTitle(years, kinds){
    return (items) => {
      const idx = items[0].dataIndex;
      const periodo = (years[idx]-1)+'/'+years[idx];
      return kinds[idx] === 'presupuesto' ? `${periodo} (Presupuesto)` : periodo;
    };
  }

  // Cada tick del eje X pasa a ser el PERÍODO completo ("2026"/"2027", Chart.js dibuja un array de
  // strings como 2 líneas) en vez de un solo año suelto — pedido explícito de Guido, mismo criterio
  // que ya usa el resto del sitio (`(year-1)+'/'+year`, ver populateFinanzasSelectors). 2 líneas en
  // vez de "2026/2027" en una sola para no ensanchar cada columna del gráfico.
  function inicioPeriodLabels(years){
    return years.map(y => [String(y-1), String(y)]);
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
          ctx.fillText('No informado por el club', 0, 0);
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
      `<span class="inicio-legend-item"><span class="inicio-legend-swatch" style="background:${d.color}"></span>${d.label}</span>`
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


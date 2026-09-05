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
          <td style="padding-left:${indent}px;"><span class="pl-arrow">&#9656;</span>${labelWithGlossary(label)}</td><td>${fmtDisplay(val)}</td>${pctCell}<td></td><td></td><td></td>
        </tr>` + childHtml;
      }
      return `<tr data-group="${parentRowId}" class="pl-breakdown-row" style="display:none;">
        <td style="padding-left:${indent}px;">${labelWithGlossary(label)}</td><td>${fmtDisplay(val)}</td>${pctCell}<td></td><td></td><td></td>
      </tr>`;
    }).join('');
  }


  // Pinta una sección (Ingresos o Gastos): encabezado, cada categoría (con acordeón si tiene
  // sub-items), y una fila de total. Devuelve el html y el total ya en la moneda a mostrar, para
  // que el llamador pueda sumar Ingresos + Gastos + extraRows y obtener el resultado final.
  function buildNativeSectionHtml(sectionLabel, curList, prevList, meta, prevMeta, targetCurrency, groupPrefix){
    const findPrevVal = (label) => { if(!prevList) return null; const m = prevList.find(x => x.label === label); return m ? m.value : null; };
    // El total tiene que estar calculado ANTES de generar el HTML de cada fila (para poder mostrar
    // el % de cada una contra el total ya cerrado), antes se acumulaba fila por fila en el mismo
    // paso en el que se generaba su HTML, así que ninguna fila conocía el total final todavía.
    const total = curList.reduce((s,c) => s + nativeDisplayVal(c.value, meta, targetCurrency), 0);
    const rowsHtml = curList.map((c, i) => {
      const curVal = nativeDisplayVal(c.value, meta, targetCurrency);
      const prevRaw = findPrevVal(c.label);
      const prevVal = prevRaw !== null ? nativeDisplayVal(prevRaw, prevMeta, targetCurrency) : null;
      const growth = prevVal !== null ? (curVal - prevVal) : null;
      const pctCell = `<td>${fmtPctOfTotal(curVal, total)}</td>`;
      if(c.items && c.items.length){
        const rowId = groupPrefix+'-'+i;
        const itemsHtml = renderBreakdownRows(c.items, rowId, 0, meta, targetCurrency, total);
        return `<tr class="pl-clickable" onclick="toggleRevenueBreakdown('${rowId}', this)">
          <td><span class="pl-arrow">&#9656;</span>${c.label}</td>
          <td>${fmtDisplay(curVal)}</td>
          ${pctCell}
          <td>${prevVal !== null ? fmtDisplay(prevVal) : '—'}</td>
          <td>${growth !== null ? fmtDisplay(growth) : '—'}</td>
          <td>${growth !== null ? fmtPctDisplay(growth, prevVal) : '—'}</td>
        </tr>` + itemsHtml;
      }
      return `<tr>
        <td>${c.label}</td>
        <td>${fmtDisplay(curVal)}</td>
        ${pctCell}
        <td>${prevVal !== null ? fmtDisplay(prevVal) : '—'}</td>
        <td>${growth !== null ? fmtDisplay(growth) : '—'}</td>
        <td>${growth !== null ? fmtPctDisplay(growth, prevVal) : '—'}</td>
      </tr>`;
    }).join('');
    const totalPrev = prevList ? prevList.reduce((s,c) => s + nativeDisplayVal(c.value, prevMeta, targetCurrency), 0) : null;
    const totalGrowth = totalPrev !== null ? (total - totalPrev) : null;
    const headHtml = `<tr class="pl-section-head"><td colspan="6">${sectionLabel}</td></tr>`;
    const totalHtml = `<tr class="pl-bold pl-shade"><td>Total ${sectionLabel}</td><td>${fmtDisplay(total)}</td><td>${fmtPctOfTotal(total, total)}</td>` +
      `<td>${totalPrev !== null ? fmtDisplay(totalPrev) : '—'}</td>` +
      `<td>${totalGrowth !== null ? fmtDisplay(totalGrowth) : '—'}</td>` +
      `<td>${totalGrowth !== null ? fmtPctDisplay(totalGrowth, totalPrev) : '—'}</td></tr>`;
    return { html: headHtml + rowsHtml + totalHtml, total };
  }


  // Reescribe el <colgroup> de #finanzasPLTable según el modo (Año a año vs. Por gestión). Versión 39.
  // NECESARIO además de la regla CSS que oculta th/td de las columnas 4-6 en "Año a año"
  // (`pl-hide-compare`): probado en el navegador con getBoundingClientRect, en dos vueltas,
  // 1) un <col> con `display:none` NO libera su ancho fijo en `table-layout:fixed` (Rubro seguía
  //    midiendo lo mismo con o sin esa regla).
  // 2) SACAR directamente esos <col> del colgroup (dejarlo con solo 3 en vez de 6) TAMPOCO alcanza:
  //    la fila de encabezado de sección (`buildNativeSectionHtml`, `<td colspan="6">`) sigue
  //    escribiendo `colspan="6"` sin importar el modo, así que el motor de tablas del navegador sigue
  //    viendo 6 columnas reales (por esa fila) aunque el colgroup solo describa 3, y como Rubro Y
  //    las 3 columnas "de más" quedan TODAS sin ancho explícito, el navegador reparte el espacio
  //    sobrante en partes IGUALES entre las 4 (Rubro se quedó con ~108px de 596, un cuarto del
  //    espacio libre, en vez de los ~431px que le tocarían solo), confirmado midiendo antes/después.
  // Fix real: el <colgroup> SIEMPRE tiene que declarar las 6 columnas (para calzar con el colspan=6
  // de esa fila y con las 6 celdas reales de cada fila de datos), pero las columnas ocultas en "Año a
  // año" llevan un ancho EXPLÍCITO de 0 (no las sacamos del colgroup, les ponemos width:0), así son
  // las ÚNICAS con ancho fijo salvo Rubro, que sigue siendo la única columna sin ancho y se lleva
  // TODO el espacio sobrante ella sola, sin repartirlo con nadie.
  // Se llama SIEMPRE junto con el classList.add/remove('pl-hide-compare') de #finanzasPLTable (los 4
  // call sites: updateFinanzasByGestion/ByAnio y sus versiones Generic), si se agrega un call site
  // nuevo que toque esa clase, hay que sumarle también esta llamada.
  function syncPLTableColgroup(hideCompare){
    const colgroup = document.querySelector('#finanzasPLTable colgroup');
    colgroup.innerHTML = hideCompare
      ? '<col><col style="width:100px"><col style="width:65px"><col style="width:0"><col style="width:0"><col style="width:0">'
      : '<col><col style="width:100px"><col style="width:65px"><col style="width:100px"><col style="width:90px"><col style="width:65px">';
  }


  function renderNativePLTable(clubId, curYear, prevYear, curLabel, prevLabel, containerId){
    document.getElementById(containerId+'CurLabel').textContent = curLabel;
    document.getElementById(containerId+'PrevLabel').textContent = prevLabel || '—';
    const curMeta = yearMetaFor(clubId, curYear);
    const prevMeta = prevYear ? yearMetaFor(clubId, prevYear) : null;
    const curReport = nativeReportFor(clubId, curYear);
    const prevReport = prevYear ? nativeReportFor(clubId, prevYear) : null;

    const ing = buildNativeSectionHtml('Ingresos', curReport.ingresos, prevReport ? prevReport.ingresos : null, curMeta, prevMeta, currentCurrency, containerId+'-ing');
    const gas = buildNativeSectionHtml('Gastos', curReport.gastos, prevReport ? prevReport.gastos : null, curMeta, prevMeta, currentCurrency, containerId+'-gas');

    // Las filas sueltas (extraRows: intereses, impuestos) y el Resultado final no pertenecen a
    // Ingresos ni a Gastos, no tienen un "total de sección" propio contra el que calcular un %
    // que signifique algo, así que esa columna queda en "—" para ellas (a diferencia de las filas
    // de Ingresos/Gastos, que sí muestran % sobre su propio Total).
    const extraHtml = (curReport.extraRows||[]).map(e => {
      const v = nativeDisplayVal(e.value, curMeta, currentCurrency);
      return `<tr><td>${e.label}</td><td>${fmtDisplay(v)}</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>`;
    }).join('');
    const extraTotal = (curReport.extraRows||[]).reduce((s,e) => s + nativeDisplayVal(e.value, curMeta, currentCurrency), 0);

    const resultado = ing.total + gas.total + extraTotal;
    const resultRow = `<tr class="pl-bold pl-highlight"><td>${curReport.resultLabel || 'Resultado neto'}</td><td>${fmtDisplay(resultado)}</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>`;

    document.querySelector('#'+containerId+' tbody').innerHTML =
      ing.html + '<tr class="pl-spacer"><td colspan="6"></td></tr>' + gas.html + extraHtml +
      '<tr class="pl-spacer"><td colspan="6"></td></tr>' + resultRow;
    // Se devuelven los totales YA en la moneda mostrada para que el stat "Gastos" de arriba de
    // Finanzas use EXACTAMENTE el mismo número que "Total Gastos" acá abajo, antes ese stat salía
    // de cur.expenses (computeYear), que para 2025/2027 (los únicos ejercicios con documento real)
    // es solo wages+otherExpenses, sin amortizaciones/depreciación, así que mostraba un Gastos menor
    // al de la tabla y parecía un descalce con las inversiones. Bug real, reportado por Guido.
    return { ingresosTotal: ing.total, gastosTotal: gas.total, resultado };
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
  function renderFinanzasStatsFromComputed(cur, gastosTotal, ingresosTotal){
    const meta = yearMeta(cur.year);
    const revenueDisp = ingresosTotal !== undefined ? ingresosTotal : toDisplayValue(cur.revenue, meta, currentCurrency);
    const expensesDisp = gastosTotal !== undefined ? Math.abs(gastosTotal) : Math.abs(toDisplayValue(cur.expenses, meta, currentCurrency));
    const patDisp = toDisplayValue(cur.pat, meta, currentCurrency);
    const netDebtDisp = toDisplayValue(cur.netDebt, meta, currentCurrency);
    document.getElementById('finanzasStats').innerHTML = `
      <div class="stat"><div class="label">Ingresos</div><div class="value">${fmtAmountPlain(revenueDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Gastos</div><div class="value">${fmtAmountPlain(expensesDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Resultado neto</div><div class="value ${cur.pat>=0?'pos':'neg'}">${fmtAmount(patDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Deuda neta</div><div class="value">${fmtAmountPlain(netDebtDisp, currentCurrency)}</div></div>
    `;
  }


  function updateFinanzasByGestion(){
    const key = document.getElementById('gestionSelect').value;
    const g = gestionesInfo[key];
    const cur = computeYear(g.lastYear);
    const prev = g.firstYear !== g.lastYear ? computeYear(g.firstYear) : null;
    const plTotals = renderNativePLTable('boca', cur.year, prev ? prev.year : null, cur.yearLabel, prev ? prev.yearLabel : null, 'finanzasPLTable');
    renderFinanzasStatsFromComputed(cur, plTotals.gastosTotal, plTotals.ingresosTotal);
    renderDebtBlock(cur, prev, 'finanzasDebtTable');
    document.getElementById('finanzasUnitNote').textContent = plUnitLabel(currentCurrency);
    document.getElementById('finanzasFxNote').textContent = g.lastYear === 2027 ? 'El último ejercicio de esta gestión (2026/2027) es el Presupuesto oficial (ver cards más abajo), convertido a USD con el promedio entre el dólar de inicio y cierre: ($1.480 + $1.840) / 2 = $1.660.' : '';
    document.getElementById('finanzasPLTable').classList.remove('pl-hide-compare');
    syncPLTableColgroup(false);
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
    const plTotals = renderNativePLTable('boca', cur.year, prev ? prev.year : null, cur.yearLabel, prev ? prev.yearLabel : null, 'finanzasPLTable');
    renderFinanzasStatsFromComputed(cur, plTotals.gastosTotal, plTotals.ingresosTotal);
    renderDebtBlock(cur, prev, 'finanzasDebtTable');
    document.getElementById('finanzasUnitNote').textContent = plUnitLabel(currentCurrency);
    // El ejercicio 2027 ya no tiene nota de conversión FX acá (se sacó por pedido de Guido, quedaba
    // repetida/con demasiado detalle); la aclaración de que la deuda del presupuesto no está
    // desglosada ahora vive en el card Deuda (finanzasDebtNote / debtDisclosureNote), no acá.
    document.getElementById('finanzasFxNote').textContent = y === 2025 ? 'Ejercicio 2024/2025 = Memoria y Balance oficial auditado al 30/06/2025 (balance real, no presupuesto). Conversión a USD con el dólar mayorista de CIERRE del ejercicio ($1.203 al 30/06/2025), no un promedio, porque el balance está en moneda homogénea reexpresada a esa fecha puntual. Las categorías son las del balance tal cual (11 de Ingresos, 17 de Gastos), nótese que "Ingresos por transferencias de jugadores" y "Gastos por transferencia de jugadores" van SEPARADOS, como los reporta el club, no como una sola "ganancia neta". "Resultados financieros y por tenencia" agrupa intereses + diferencias de cambio + RECPAM en una sola línea, por elección de presentación propia del club.'
      : '';
    document.getElementById('finanzasPLTable').classList.add('pl-hide-compare');
    syncPLTableColgroup(true);
    const allYears = [2018,2019,2021,2022,2023,2024,2025,2027];
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
  function renderFinanzasStatsGeneric(cur, gastosTotal, ingresosTotal){
    const meta = yearMetaFor(cur.clubId, cur.year);
    const revenueDisp = ingresosTotal !== undefined ? ingresosTotal : toDisplayValue(cur.revenue, meta, currentCurrency);
    // gastosTotal (si viene) ya está convertido a currentCurrency por renderNativePLTable/
    // buildNativeSectionHtml. NO volver a pasarlo por toDisplayValue (bug real, encontrado
    // probando el toggle en el browser: convertía dos veces y mostraba "Gastos: 0.1 M USD" en vez
    // de ~76 M USD). Mismo criterio que renderFinanzasStatsFromComputed (Boca).
    const expensesDisp = gastosTotal !== undefined ? Math.abs(gastosTotal) : Math.abs(toDisplayValue(cur.expenses, meta, currentCurrency));
    const patDisp = toDisplayValue(cur.pat, meta, currentCurrency);
    const netDebtDisp = toDisplayValue(cur.netDebt, meta, currentCurrency);
    document.getElementById('finanzasStats').innerHTML = `
      <div class="stat"><div class="label">Ingresos</div><div class="value">${fmtAmountPlain(revenueDisp, currentCurrency)}</div></div>
      <div class="stat"><div class="label">Gastos</div><div class="value">${fmtAmountPlain(expensesDisp, currentCurrency)}</div></div>
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
    const isReal = year => ((clubId === 'river' ? riverFiscalYearMeta[year] : racingFiscalYearMeta[year]) || {}).reportType !== 'placeholder';
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
    const plTotals = renderNativePLTable(clubId, cur.year, prev ? prev.year : null, cur.yearLabel, prev ? prev.yearLabel : null, 'finanzasPLTable');
    renderFinanzasStatsGeneric(cur, plTotals.gastosTotal, plTotals.ingresosTotal);
    renderDebtBlockGeneric(cur, prev, 'finanzasDebtTable');
    document.getElementById('finanzasUnitNote').textContent = plUnitLabel(currentCurrency);
    document.getElementById('finanzasFxNote').textContent = currentCurrency === 'USD' ? genericFxNote(clubId, g.lastYear) : '';
    document.getElementById('finanzasPLTable').classList.remove('pl-hide-compare');
    syncPLTableColgroup(false);
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
    const plTotals = renderNativePLTable(clubId, cur.year, null, cur.yearLabel, null, 'finanzasPLTable');
    renderFinanzasStatsGeneric(cur, plTotals.gastosTotal, plTotals.ingresosTotal);
    renderDebtBlockGeneric(cur, null, 'finanzasDebtTable');
    document.getElementById('finanzasUnitNote').textContent = plUnitLabel(currentCurrency);
    document.getElementById('finanzasFxNote').textContent = currentCurrency === 'USD' ? genericFxNote(clubId, y) : '';
    document.getElementById('finanzasPLTable').classList.add('pl-hide-compare');
    syncPLTableColgroup(true);
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
      gestionSelect.innerHTML = `
        <option value="riquelme">Riquelme (2023-actual)</option>
        <option value="ameal">Ameal (2019-2023)</option>
        <option value="angelici">Angelici (2015-2019)</option>`;
      years = [
        {value:2027, label:'Ejercicio 2026/2027 (presupuestado)'},
        {value:2026, label:'Ejercicio 2025/2026 (esperando datos)'},
        {value:2025, label:'Ejercicio 2024/2025'},
        {value:2024, label:'Ejercicio 2023/2024'},
        {value:2023, label:'Ejercicio 2022/2023'},
        {value:2022, label:'Ejercicio 2021/2022'},
        {value:2021, label:'Ejercicio 2020/2021'},
        {value:2019, label:'Ejercicio 2018/2019'},
        {value:2018, label:'Ejercicio 2017/2018'},
      ];
    } else {
      const gestiones = gestionesByClub[clubId];
      gestionSelect.innerHTML = Object.keys(gestiones).map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
      // Ternario, no un objeto armado de una (ver mismo comentario en drawTrendChartGeneric): con
      // lazy-loading, el club que no se está mirando puede no estar cargado todavía.
      const meta = clubId === 'river' ? riverFiscalYearMeta : racingFiscalYearMeta;
      // Object.keys() de un objeto con claves numéricas ("2024","2025"...) las devuelve SIEMPRE en
      // orden ASCENDENTE (son "integer-like keys". JS las reordena así sin importar el orden en el
      // código fuente), por eso salía el ejercicio más viejo primero. Se ordena acá a mano,
      // descendente, mismo criterio que la lista de Boca arriba.
      // OJO: acá el dropdown mantiene a propósito el estilo viejo "Ejercicio AAAA/AAAA
      // (presupuestado)" (no el "Presupuesto AAAA/AAAA" corto de ejercicioLabel(year, true), que
      // es solo para el header de la tabla, ver comentario en esa función) para que el dropdown de
      // River/Racing luzca igual que el de Boca (`#anioSelect` estático + `populateFinanzasSelectors`
      // más arriba), que también quedó con el estilo largo.
      years = Object.keys(meta).map(Number).sort((a,b) => b - a).map(y => ({
        value:y, label: 'Ejercicio '+(y-1)+'/'+y+(meta[y].reportType === 'official_budget' ? ' (presupuestado)' : ''),
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
      meta = (currentClub === 'river' ? riverFiscalYearMeta[year] : racingFiscalYearMeta[year]) || {};
    }
    if(meta.reportType === 'official_budget' || meta.reportType === 'official_balance_sheet'){
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
    const disp = displayFinancialsForClub(currentClub, cur);
    const netSpend = pasesNetSpend(currentClub, gestionKey);
    const members = memberCountByClub[currentClub];
    document.getElementById('inicioStats').innerHTML = `
      <div class="stat"><div class="label">Último resultado (${cur.yearLabel})</div><div class="value ${disp.pat>=0?'pos':'neg'}">${fmtAmount(disp.pat, 'USD')}</div></div>
      <div class="stat"><div class="label">Deuda neta actual</div><div class="value">${fmtAmountPlain(disp.netDebt, 'USD')}</div></div>
      <div class="stat"><div class="label">Net spend histórico (gestión actual)</div><div class="value ${netSpend>=0?'pos':'neg'}">${fmtAmount(netSpend, 'USD')}</div></div>
      <div class="stat"><div class="label">Socios activos</div><div class="value">${members ? members.toLocaleString('es-AR') : 'Sin dato'}</div></div>
    `;
  }


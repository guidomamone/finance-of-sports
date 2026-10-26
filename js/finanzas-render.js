// ============================================================================
// js/finanzas-render.js — capa de RENDER de Finanzas: arma HTML, dibuja los gráficos (Chart.js) y actualiza el DOM a partir de lo
// que calcula js/finanzas-calc.js. Incluye Resultados y Comparar (pintan, no calculan). Algunas funciones puente
// (buildNativeSectionHtml, renderFinanzasStats*Generic, update*Generic) calculan valores chicos (% del total, crecimiento) en el
// mismo paso en que arman el HTML: separarlo exige tocar funciones financieras ya verificadas, y se hace recién cuando haga falta.
//
// Orden de carga: después de js/finanzas-calc.js y de los data/*.js, antes de js/principal.js.
// ============================================================================

  // El bocadillo de una fila que el documento junta con otra (`incluidoEn`): nombra el rubro donde está. Lo usan la tabla de
  // Finanzas (abajo) y el desglose de Ligas (js/liga.js, que carga después).
  window.FINANZAS_DENTRO_TIP = function(rubro, posible){
    return posible
      ? t('finanzas.tipPosible1', 'Sospecho que está dentro de') + ' ' + tLabel(rubro) + ': ' + t('finanzas.tipPosible2', 'no es un cero, pero la fuente no lo aclara o es confusa.')
      : t('finanzas.tipIncluido1', 'Está incluido en') + ' ' + tLabel(rubro) + ': ' + t('finanzas.tipIncluido2', 'la fuente lo reporta junto con ese rubro.');
  };

  // QUÉ EJERCICIOS SE ESTÁN MIRANDO EN FINANZAS: una LISTA de años (la vista multi-año elige varios). Quien muestra UN ejercicio
  // (KPIs, banner de calidad, ficha de fuente) usa `primary()`, el más nuevo; quien necesita un balance usa `lastBalance()`. Nadie lee
  // `#anioSelect` salvo el dropdown mismo, que escribe acá con `set()`.
  const FIN_SEL = (function(){
    let years = [];
    const BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
    return {
      set(list){ years = [...new Set(list.filter(Number.isFinite))].sort((a, b) => a - b); },
      years(){ return years.slice(); },
      has(y){ return years.includes(y); },
      primary(){ return years.length ? years[years.length - 1] : NaN; },
      lastBalance(clubId){
        for(let i = years.length - 1; i >= 0; i--) if(BAL[reportTypeForYear(clubId, years[i])]) return years[i];
        return null;
      },
    };
  })();
  window.FIN_SEL = FIN_SEL;

  let trendChartInst = null, breakdownChartInst = null;
  let inicioIngresosChartInst = null, inicioGastosChartInst = null, inicioDeudaChartInst = null;


  // % de cada porción dibujado ARRIBA de la porción del doughnut (Chart.js no lo trae): ángulo y radio medios de cada arco. Se
  // omiten las porciones <5% (el texto no entra). Contorno oscuro + relleno blanco para que se lea sobre cualquier color.
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


  // Glosario de términos que aparecen tal cual el club los escribió en un desglose. Clave: el label EXACTO; valor: el tooltip.
  // renderBreakdownRows lo aplica a cualquier fila que matchee: alcanza con agregar una entrada acá.
  const rowGlossary = {
    'Amortizacion Plantel Futbol Profesional - Compras': 'Amortización del costo de los pases de jugadores COMPRADOS a otros clubes: el club capitaliza ese costo como activo intangible al firmar al jugador, y lo va llevando a resultados (gasto) en cuotas iguales repartidas a lo largo de la duración de su contrato, en vez de cargarlo todo de una vez en el año de la compra.',
    'Amortizacion Plantel Futbol Profesional - Inferiores': 'Amortización de jugadores surgidos de las Inferiores (juveniles) del propio club: aunque no hubo un pase comprado a otro club, el club igual capitaliza un costo asociado a esos jugadores al firmarles su primer contrato profesional, y lo amortiza en cuotas de la misma manera que a un jugador comprado.',
  };

  function labelWithGlossary(label){
    const tip = rowGlossary[label];
    return tip ? `<span title="${tip.replace(/"/g,'&quot;')}" style="cursor:help;border-bottom:1px dotted currentColor;">${label}</span>` : tLabelH(label);
  }


  // Pinta las filas de un desglose, recursivamente: cada item es [label, value] o [label, value, subItems], y un item con subItems
  // es su propio acordeón anidado. El % de un sub-ítem es contra el total de la SECCIÓN (sectionTotal), no contra su fila madre.
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


  // Pinta una sección (Ingresos o Gastos): encabezado, cada fila (con acordeón si tiene items) y el total. Cada columna de valor
  // (Actual y Presupuesto) tiene su propia columna de %, calculada contra el total de ESA columna. Devuelve el html y los totales
  // ya en la moneda a mostrar.
  function buildNativeSectionHtml(sectionLabel, curList, prevList, meta, prevMeta, targetCurrency, groupPrefix){
    const findPrevRow = (label) => { if(!prevList) return null; return prevList.find(x => x.label === label) || null; };
    const findPrevVal = (label) => { const m = findPrevRow(label); return m ? m.value : null; };
    // `unknown` (bolsón sin desglosar con plata adentro) e `incluidoEn` (el documento junta esta fila con otra): ver bucketize() en
    // js/finanzas-calc.js. Valor y % se pintan "—"; con incluidoEn la celda dice "Dentro de otro rubro" y el rubro va en el
    // bocadillo (js/info-tip.js).
    const celdaValor = (row, val, esActual) => row && row.incluidoEn ? `<span class="pl-incluido" tabindex="0" data-info-tip="${window.FINANZAS_DENTRO_TIP(row.incluidoEn, row.incluidoPosible).replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">${row.incluidoPosible ? t('finanzas.posibleDentroOtro', 'Posiblemente dentro de otro rubro') : t('finanzas.dentroOtro', 'Dentro de otro rubro')}</span>` : row && row.unknown ? (esActual ? marcaSD(meta, /-gas$/.test(groupPrefix) ? 'expense' : 'revenue') : '—') : (esActual && val < 0 && /-ing$/.test(groupPrefix) ? marcaNeg(fmtDisplay(val)) : fmtDisplay(val));
    const celdaPct = (row, val, tot) => row && (row.unknown || row.incluidoEn) ? '—' : fmtPctOfTotal(val, tot);
    // El total se calcula ANTES de armar las filas: cada fila necesita el total cerrado para su %.
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
          <td><span class="pl-arrow">&#9656;</span>${tLabelH(c.label)}</td>
          <td>${celdaValor(c, curVal, true)}</td>
          ${pctCell}
          <td>${prevVal !== null ? celdaValor(prevRow, prevVal) : '—'}</td>
          ${prevPctCell}
        </tr>` + itemsHtml;
      }
      return `<tr${c.unknown || c.incluidoEn ? ' class="pl-nodato"' : ''}>
        <td>${tLabelH(c.label)}</td>
        <td>${celdaValor(c, curVal, true)}</td>
        ${pctCell}
        <td>${prevVal !== null ? celdaValor(prevRow, prevVal) : '—'}</td>
        ${prevPctCell}
      </tr>`;
    }).join('');
    const headHtml = `<tr class="pl-section-head"><td colspan="5">${sectionLabel}</td></tr>`;
    const totalHtml = `<tr class="pl-bold pl-shade"><td>Total ${sectionLabel}</td><td>${fmtDisplay(total)}</td><td>${fmtPctOfTotal(total, total)}</td>` +
      `<td>${totalPrev !== null ? fmtDisplay(totalPrev) : '—'}</td>` +
      `<td>${totalPrev !== null ? fmtPctOfTotal(totalPrev, totalPrev) : '—'}</td></tr>`;
    // totalPrev: para que renderNativePLTable() arme también el Resultado neto de la columna Presupuesto.
    return { html: headHtml + rowsHtml + totalHtml, total, totalPrev };
  }


  // Reescribe el <colgroup> de #finanzasPLTable según haya overlay de Presupuesto o no. El colgroup declara SIEMPRE la misma
  // cantidad de columnas que el colspan del encabezado de sección; la columna oculta lleva width:0 (sacarla o darle display:none
  // hace que el navegador reparta el espacio sobrante en partes iguales). Anchos y regla para columnas nuevas: Admin/PANTALLA.md,
  // "Reglas de la tabla Estado de resultados".
  function syncPLTableColgroup(hideCompare){
    const colgroup = document.querySelector('#finanzasPLTable colgroup');
    colgroup.innerHTML = hideCompare
      ? '<col><col style="width:100px"><col style="width:100px"><col style="width:0"><col style="width:0">'
      : '<col><col style="width:100px"><col style="width:100px"><col style="width:100px"><col style="width:100px">';
  }


  // Estado de resultados de UN ejercicio. La 2da columna es solo el overlay de Presupuesto de ESE MISMO ejercicio, cuando existe
  // (presupuestoOverlayReportFor, js/finanzas-calc.js); sin overlay no se pinta. Las filas Balance-vs-Presupuesto se emparejan por
  // label exacto (skill club-or-year-onboarding, sección 11).
  function renderNativePLTable(clubId, year, curLabel, containerId){
    const curMeta = yearMetaFor(clubId, year);
    const curReport = nativeReportFor(clubId, year);
    const overlayReport = presupuestoOverlayReportFor(clubId, year);
    const overlayMeta = overlayReport ? presupuestoOverlayMetaFor(clubId, year) : null;

    // wrapHeaderLabel: corte de línea elegido a mano. El header del overlay lleva el año ("Presupuesto AAAA/AAAA"), como la columna
    // principal.
    document.getElementById(containerId+'CurLabel').innerHTML = wrapHeaderLabel(curLabel);
    document.getElementById(containerId+'PrevLabel').innerHTML = overlayReport ? wrapHeaderLabel(ejercicioLabel(year, 'official_budget', clubId)) : '—';
    document.getElementById(containerId).classList.toggle('pl-hide-compare', !overlayReport);
    syncPLTableColgroup(!overlayReport);

    const ing = buildNativeSectionHtml(t('section.revenue','Ingresos'), curReport.ingresos, overlayReport ? overlayReport.ingresos : null, curMeta, overlayMeta, currentCurrency, containerId+'-ing');
    const gas = buildNativeSectionHtml(t('section.expenses','Gastos'), curReport.gastos, overlayReport ? overlayReport.gastos : null, curMeta, overlayMeta, currentCurrency, containerId+'-gas');

    // "SIN DATO" NO ES CERO (Admin/CONVENCIONES-DATOS.md): un ejercicio sin líneas ni total oficial de gastos (ej. los clubes de la
    // J.League, que publica solo ingresos) no dibuja rubros en 0,0 ni un Resultado neto igual a los ingresos.
    const cGastos = (typeof computeYearGeneric === 'function') ? computeYearGeneric(clubId, year) : null;
    const sinGastos = !!cGastos
                   && !(cGastos.expenseLines || []).length
                   && (cGastos.meta || {}).officialTotalExpenses == null
                   && !cGastos.expenses && !cGastos.nonCash;
    const gastosHtml = sinGastos
      ? `<tr class="pl-section-head"><td colspan="5">${t("section.expenses","Gastos")}</td></tr>`
        + `<tr class="pl-nodata"><td colspan="5">${t('pl.sin.gastos','La fuente de este ejercicio publica los ingresos del club pero no su estructura de costos, así que no hay gastos que mostrar. No es que sean cero: no están informados.')}</td></tr>`
      : gas.html;

    // Las filas de extraRows se muestran cuando no son cero: sin ellas Ingresos + Gastos no explicaría el Resultado neto.
    const extraTotal = (curReport.extraRows||[]).reduce((s,e) => s + nativeDisplayVal(e.value, curMeta, currentCurrency), 0);
    // Excepción: "Intereses netos" se muestra siempre, incluso en $0 (Admin/PANTALLA.md, "Reglas de Estado de resultados").
    const extraRowsHtml = (curReport.extraRows||[]).map(e => {
      const v = nativeDisplayVal(e.value, curMeta, currentCurrency);
      if(v === 0 && e.label !== 'Intereses netos') return '';
      return `<tr><td>${tLabelH(e.label)}</td><td>${fmtDisplay(v)}</td><td>—</td><td>—</td><td>—</td></tr>`;
    }).join('');

    const resultado = sinGastos ? null : (ing.total + gas.total + extraTotal);
    // Resultado neto de la columna Presupuesto = sus propios ingresos + gastos, sin extraTotal: el overlay no tiene extraRows, sus
    // líneas extraordinarias ya están dentro de revenueLines/expenseLines.
    const resultadoOverlay = overlayReport ? (ing.totalPrev + gas.totalPrev) : null;
    const resultRow = `<tr class="pl-bold pl-highlight"><td>${tLabel(curReport.resultLabel || 'Resultado neto')}</td><td>${resultado === null ? t('stat.nodata','Sin dato') : fmtDisplay(resultado)}</td><td>—</td>` +
      `<td>${resultadoOverlay !== null ? fmtDisplay(resultadoOverlay) : '—'}</td><td>—</td></tr>`;

    document.querySelector('#'+containerId+' tbody').innerHTML =
      ing.html + '<tr class="pl-spacer"><td colspan="5"></td></tr>' + gastosHtml +
      (!sinGastos && extraRowsHtml ? '<tr class="pl-spacer"><td colspan="5"></td></tr>' + extraRowsHtml : '') +
      '<tr class="pl-spacer"><td colspan="5"></td></tr>' + resultRow;
    // Totales YA en la moneda mostrada, para que los KPIs de arriba usen EXACTAMENTE los mismos números que la tabla (Ingresos +
    // Gastos + Int. = Resultado neto en los dos lugares).
    renderNotasClub(clubId, [year]);
    return { ingresosTotal: ing.total, gastosTotal: sinGastos ? undefined : gas.total, resultado, extraTotal: sinGastos ? undefined : extraTotal };
  }


  // Colapsa un grupo y, en cascada, cualquier sub-grupo abierto adentro (y resetea sus flechas): un nivel siempre arranca cerrado.
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


  // Los nombres "...Generic" quedaron de cuando coexistían con un motor solo para Boca, que ya no existe.
  // ¿El documento de ESTE ejercicio informa deuda Y caja? Sin uno de los dos (null en el dato) la deuda neta no se puede calcular:
  // computeYearGeneric() escribe `meta.grossDebt || 0`, así que una caja sin dato restaba 0 y la deuda neta salía igual a la bruta
  // (Argentinos 2019). Deuda bruta = Caja = 0 en un documento oficial tampoco es una deuda cero: es la convención vieja de "no se
  // cargó" (Admin/PANTALLA.md, "Deuda y caja sin dato"). Un 0 impreso de uno solo de los dos sí es real (Sunderland 2024, caja 0).
  // Placeholder/pending_official quedan afuera: tienen su propio banner. Vive acá, compartida por el KPI, la tabla de deuda, el
  // multiaño y Comparar gestiones, para que no se contradigan.
  function deudaNoDesglosada(c){
    if(!c) return false;
    const m = c.meta || {};
    if(m.reportType === 'placeholder' || m.reportType === 'pending_official') return false;
    return m.grossDebt == null || m.cash == null || (c.grossDebt === 0 && c.cash === 0);
  }
  // El valor de una fila de la tabla de deuda: "—" si ese dato no está en el documento (null), no un 0.
  function filaDeuda(c, campo){
    if(!c) return null;
    if(campo === 'netDebt') return deudaNoDesglosada(c) ? null : c.netDebt;
    const m = c.meta || {};
    if(m[campo] == null || (c.grossDebt === 0 && c.cash === 0)) return null;
    return c[campo];
  }


  function renderDebtBlockGeneric(cur, prev, containerId){
    document.getElementById(containerId+'CurLabel').textContent = cur.yearLabel;
    document.getElementById(containerId+'PrevLabel').textContent = prev ? prev.yearLabel : '—';
    const curMeta = yearMetaFor(cur.clubId, cur.year);
    const prevMeta = prev ? yearMetaFor(prev.clubId, prev.year) : null;
    const rows = [
      {label:'Salarios / Ingresos', curTxt:(cur.wagesToTurnover*100).toFixed(0)+'%', prevTxt: prev ? (prev.wagesToTurnover*100).toFixed(0)+'%' : '—'},
      {label:'Deuda bruta', cur:filaDeuda(cur, 'grossDebt'), prev:filaDeuda(prev, 'grossDebt'), bold:true},
      {label:'Caja', cur:filaDeuda(cur, 'cash'), prev:filaDeuda(prev, 'cash')},
      {label:'Deuda neta', cur:filaDeuda(cur, 'netDebt'), prev:filaDeuda(prev, 'netDebt'), bold:true, shade:true},
    ];
    document.querySelector('#'+containerId+' tbody').innerHTML = rows.map(r => {
      const trCls = [r.bold?'pl-bold':'', r.shade?'pl-shade':''].join(' ');
      const curVal = r.curTxt !== undefined ? r.curTxt : (r.cur !== null ? fmtDisplay(toDisplayValue(r.cur, curMeta, currentCurrency)) : '—');
      const prevVal = r.prevTxt !== undefined ? r.prevTxt : (r.prev !== null ? fmtDisplay(toDisplayValue(r.prev, prevMeta, currentCurrency)) : '—');
      return `<tr class="${trCls}"><td>${tLabel(r.label)}</td><td>${curVal}</td><td>${prevVal}</td></tr>`;
    }).join('');
    const curUndisclosed = deudaNoDesglosada(cur);
    const prevUndisclosed = deudaNoDesglosada(prev);
    document.getElementById('finanzasDebtNote').textContent = debtDisclosureNote(curUndisclosed, cur.yearLabel, prevUndisclosed, prev ? prev.yearLabel : '');
  }


  // gastosTotal/ingresosTotal/extraTotal (opcionales): los totales que ya calculó renderNativePLTable(), para que los KPIs digan
  // exactamente lo mismo que la tabla de abajo.
  function renderFinanzasStatsGeneric(cur, gastosTotal, ingresosTotal, extraTotal){
    const meta = yearMetaFor(cur.clubId, cur.year);
    const revenueDisp = ingresosTotal !== undefined ? ingresosTotal : toDisplayValue(cur.revenue, meta, currentCurrency);
    // gastosTotal ya viene convertido: NO volver a pasarlo por toDisplayValue (Admin/PANTALLA.md, "gastosTotal ya viene convertido").
    const expensesDisp = gastosTotal !== undefined ? Math.abs(gastosTotal) : Math.abs(toDisplayValue(cur.expenses, meta, currentCurrency));
    const patDisp = toDisplayValue(cur.pat, meta, currentCurrency);
    const netDebtDisp = toDisplayValue(cur.netDebt, meta, currentCurrency);
    // "SIN DATO" NO ES CERO: sin gastos informados, Gastos y Resultado neto dicen "Sin dato" (como la tabla de abajo).
    const sinGastos = !(cur.expenseLines || []).length
                   && (cur.meta || {}).officialTotalExpenses == null
                   && !cur.expenses && !cur.nonCash;
    // Mismo criterio para la deuda: un cero que la fuente no publica no se muestra como cero.
    const sinDeuda = deudaNoDesglosada(cur);
    const extraStat = extraTotal !== undefined
      ? `<div class="stat" data-k="extra"><div class="label" title="${t('stat.extra.tip','Intereses netos y otros ajustes que no son Ingresos ni Gastos operativos, pero sí suman al Resultado neto')}">${t('stat.extra','Intereses y otros')}</div><div class="value ${extraTotal>=0?'pos':'neg'}">${fmtAmount(extraTotal, currentCurrency)}</div></div>`
      : '';
    document.getElementById('finanzasStats').innerHTML = `
      <div class="stat" data-k="ing"><div class="label">${t('section.revenue','Ingresos')}</div><div class="value">${fmtAmountPlain(revenueDisp, currentCurrency)}</div></div>
      <div class="stat" data-k="gas"><div class="label">${t('section.expenses','Gastos')}</div><div class="value${sinGastos ? ' nodato' : ''}">${sinGastos ? t('stat.nodata','Sin dato') : fmtAmountPlain(expensesDisp, currentCurrency)}</div></div>
      ${sinGastos ? '' : extraStat}
      <div class="stat" data-k="pat"><div class="label">${t('stat.pat','Resultado neto')}</div><div class="value ${sinGastos ? 'nodato' : (cur.pat>=0?'pos':'neg')}">${sinGastos ? t('stat.nodata','Sin dato') : fmtAmount(patDisp, currentCurrency)}</div></div>
      <div class="stat" data-k="nd"><div class="label">${t('stat.netdebt.short','Deuda neta')}</div><div class="value${sinDeuda ? ' nodato' : ''}">${sinDeuda ? t('stat.nodata','Sin dato') : fmtAmountPlain(netDebtDisp, currentCurrency)}</div></div>
    `;
  }


  // Un ejercicio placeholder se grafica como null (barra vacía), no con un número inventado; press_estimate y unofficial_mirror
  // sí se grafican. Cada año se convierte con SU yearMetaFor: un mismo club puede tener ejercicios en monedas distintas.
  function drawTrendChartGeneric(clubId, computedArr){
    if(typeof Chart === 'undefined') return;
    const ctx = document.getElementById('trendChart').getContext('2d');
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
      // layout.padding.top: margen arriba del área de trazado para que el "$" de .chart-axis-dollar (HTML superpuesto) no pise el
      // tick más alto del eje Y.
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
    const gestiones = gestionesByClub[clubId] || {};
    const key = document.getElementById('gestionSelect').value;
    const g = gestiones[key];
    if(!g) return;
    const cur = computeYearGeneric(clubId, g.lastYear);
    if(!cur) return; // sin club elegido no hay ejercicio que mostrar
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
    const y = FIN_SEL.primary();
    const cur = computeYearGeneric(clubId, y);
    if(!cur) return; // sin club elegido no hay ejercicio que mostrar
    const plTotals = renderNativePLTable(clubId, cur.year, cur.yearLabel, 'finanzasPLTable');
    // En la vista multi-año con más de un ejercicio, la tabla de una columna por año (js/finanzas-multi.js) reemplaza a la de arriba
    // en pantalla. La de arriba se arma igual: sus totales son los del ejercicio más nuevo y los usan los KPIs.
    const ysSel = FIN_SEL.years();
    // Ajustado por inflación también con UN ejercicio: la tabla de un año no sabe ajustar.
    const multiTabla = !!window.FIN_MULTI && (ysSel.length > 1 || (window.FIN_REAL && FIN_REAL.activo() && ysSel.length === 1)) && typeof renderMultiPLTable === 'function';
    document.getElementById('finanzasPLTable').hidden = multiTabla;
    const tablaMulti = document.getElementById('finanzasPLMulti');
    if(tablaMulti){
      tablaMulti.hidden = !multiTabla;
      if(multiTabla) renderMultiPLTable(clubId, ysSel, 'finanzasPLMulti');
      else if(window.FIN_MULTI_PL) FIN_MULTI_PL.ocultar();
    }
    renderFinanzasStatsGeneric(cur, plTotals.gastosTotal, plTotals.ingresosTotal, plTotals.extraTotal);
    // Vista multi-año: los KPIs dicen de qué ejercicio son, se comparan contra el primero elegido y llevan sparkline
    // (js/finanzas-multi.js). El número grande sigue saliendo de los totales de la tabla.
    if(window.FIN_MULTI && window.FIN_MULTI_KPIS) FIN_MULTI_KPIS.render(clubId, ysSel);
    if(window.FIN_MULTI && window.FIN_MULTI_CHART) FIN_MULTI_CHART.render(clubId, ysSel);
    renderDebtBlockGeneric(cur, null, 'finanzasDebtTable');
    // Vista multi-año con más de un ejercicio: la deuda también va con una columna por año.
    const deudaMulti = document.getElementById('finanzasDebtMulti');
    if(deudaMulti && window.FIN_MULTI_DEBT){
      document.getElementById('finanzasDebtTable').hidden = multiTabla;
      deudaMulti.hidden = !multiTabla;
      if(multiTabla) FIN_MULTI_DEBT.render(clubId, ysSel, 'finanzasDebtMulti');
    }
    drawTrendChartGeneric(clubId, [cur]);
    drawBreakdownChartGeneric(cur);
    // Vista multi-año: los cards de presupuesto son los del presupuesto MÁS NUEVO elegido, con su año en el título.
    const yPresu = window.FIN_MULTI ? presupuestoMasNuevoElegido(clubId) : y;
    renderSupuestosCard(clubId, yPresu);
    renderPresupuestoFinancieroCard(clubId, yPresu);
    renderPresupuestoInversionesCard(clubId, yPresu);
    renderTorneosCard(clubId, yPresu);
    document.querySelectorAll('#supuestosCard .fin-card-yr, #presupuestoFinancieroCard .fin-card-yr, #presupuestoInversionesCard .fin-card-yr')
      .forEach(el => { el.textContent = (window.FIN_MULTI && yPresu) ? ' · ' + labelEjercicioCorto(clubId, yPresu) : ''; });
  }

  // El ejercicio con presupuesto (solo, o junto con el balance) más nuevo de los elegidos; null si no hay.
  function presupuestoMasNuevoElegido(clubId){
    const ys = FIN_SEL.years();
    for(let i = ys.length - 1; i >= 0; i--){
      const rt = reportTypeForYear(clubId, ys[i]);
      if(rt === 'official_budget' || rt === 'official_budget_and_balance') return ys[i];
    }
    return null;
  }
  function labelEjercicioCorto(clubId, y){
    return esEjercicioCalendario(clubId, y) ? String(y) : (y - 1) + '/' + String(y).slice(2); // por ejercicio, no por club
  }


  function populateFinanzasSelectors(clubId){
    const gestionSelect = document.getElementById('gestionSelect');
    const anioSelect = document.getElementById('anioSelect');
    // Se guarda el ejercicio que se estaba mirando para mantenerlo al cambiar de club (o el más cercano si no existe).
    const previousYear = FIN_SEL.primary();
    // finanzasGestiones/finanzasYears (opcionales en CLUB_GENERIC_DATA[clubId]): un club que quiera mostrar en Finanzas menos
    // gestiones/años de los que tiene cargados. Sin club elegido o con su archivo sin bajar, los selectores quedan vacíos.
    const gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    if(!gd){
      gestionSelect.innerHTML = '';
      document.getElementById('anioSelect').innerHTML = '';
      FIN_SEL.set([]);
      return;
    }
    const gestiones = gestionesByClub[clubId] || {};
    const gestionKeys = gd.finanzasGestiones || Object.keys(gestiones);
    gestionSelect.innerHTML = gestionKeys.map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
    // Opción del dropdown: el rango de años solo (sin "Ejercicio ") + el sufijo de anioDropdownSuffix(). Object.keys() devuelve las
    // claves numéricas siempre en orden ascendente, por eso se ordena acá, descendente.
    const meta = gd.fiscalYearMeta;
    const yearKeys = gd.finanzasYears || Object.keys(meta).map(Number);
    const years = yearKeys.slice().sort((a,b) => b - a).map(y => ({
      value:y, label: (esEjercicioCalendario(clubId, y) ? String(y) : (y-1)+'/'+y)+anioDropdownSuffix((meta[y]||{}).reportType),
    }));
    anioSelect.innerHTML = years.map(y => `<option value="${y.value}">${y.label}</option>`).join('');
    if(!isNaN(previousYear) && years.length){
      const exact = years.find(y => y.value === previousYear);
      const target = exact || years.reduce((best, y) => Math.abs(y.value - previousYear) < Math.abs(best.value - previousYear) ? y : best);
      anioSelect.value = String(target.value);
    }
    // Con los cards de ejercicios (vista multi-año) la selección la maneja FIN_ANIOS: default de 5 al cambiar de club, y la misma
    // selección si solo cambió el idioma o la moneda.
    if(window.FIN_MULTI && window.FIN_ANIOS) FIN_ANIOS.alCargarClub(clubId);
    else FIN_SEL.set([parseInt(anioSelect.value, 10)]);
  }


  // Los supuestos, el Presupuesto Financiero y el de Inversiones de cada presupuesto viven en el data/<país>/<club>-data.js de cada club
  // (presupuestoSupuestosByYear, etc.): onboardear un club no toca este archivo.


  // Card "Supuestos": se ESCONDE por completo si el club no declara supuestos para ese ejercicio. Mismo criterio para Presupuesto
  // Financiero, Inversiones y Torneos (Admin/PANTALLA.md, "estos 4 cards se esconden").
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
    // Vista multi-año con varios ejercicios: el aviso cubre a TODOS los elegidos, no solo al más nuevo.
    if(window.FIN_MULTI && !isGestion && FIN_SEL.years().length > 1){
      const metas = ((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {};
      const OK = { official_budget:1, official_balance_sheet:1, official_budget_and_balance:1 };
      const avisos = FIN_SEL.years().filter(y => !OK[(metas[y] || {}).reportType]).map(y => {
        const rt = (metas[y] || {}).reportType;
        const txt = rt === 'pending_official' ? t('finanzas.banner.pending', 'Ejercicio todavía no informado por el club: no hay balance ni presupuesto oficial cargado todavía para este período, se está esperando que Boca lo publique')
          : rt === 'press_estimate' ? t('finanzas.banner.press', 'Dato de cobertura de prensa, no el documento oficial del club')
          : rt === 'unofficial_mirror' ? t('finanzas.banner.mirror', 'Balance real y auditado (informe de auditoría independiente incluido), pero descargado de una réplica de una comunidad de hinchas, no del dominio oficial del club')
          : t('finanzas.banner.placeholder', 'Dato placeholder, número inventado para probar el diseño del sitio, no es real');
        return `<div>⚠️ <strong>${labelEjercicioCorto(currentClub, y)}:</strong> ${txt}.</div>`;
      });
      banner.style.display = avisos.length ? 'block' : 'none';
      banner.innerHTML = avisos.join('') + (avisos.length ? `<div style="margin-top:4px;">${t('fuentes.banner.ver', 'El documento y sus salvedades están en "Fuentes", al final de esta sección.')}</div>` : '');
      return;
    }
    const year = isGestion
      ? ((gestionesByClub[currentClub] || {})[document.getElementById('gestionSelect').value] || {}).lastYear
      : FIN_SEL.primary();
    const meta = (((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {})[year] || {};
    // 'official_budget_and_balance' es tan real como los otros dos: también oculta el banner (si no, caía al aviso de placeholder).
    if(meta.reportType === 'official_budget' || meta.reportType === 'official_balance_sheet' || meta.reportType === 'official_budget_and_balance'){
      banner.style.display = 'none';
      return;
    }
    const src = sources[meta.sourceId];
    banner.style.display = 'block';
    // Cada aviso es una clave entera de t(), no fragmentos concatenados: el orden de las palabras cambia entre idiomas.
    const kind = meta.reportType === 'pending_official'
      ? t('finanzas.banner.pending', 'Ejercicio todavía no informado por el club: no hay balance ni presupuesto oficial cargado todavía para este período, se está esperando que Boca lo publique')
      : meta.reportType === 'press_estimate'
      ? t('finanzas.banner.press', 'Dato de cobertura de prensa, no el documento oficial del club')
      : meta.reportType === 'unofficial_mirror'
      ? t('finanzas.banner.mirror', 'Balance real y auditado (informe de auditoría independiente incluido), pero descargado de una réplica de una comunidad de hinchas, no del dominio oficial del club')
      : t('finanzas.banner.placeholder', 'Dato placeholder, número inventado para probar el diseño del sitio, no es real');
    // El documento y sus salvedades están en la ficha de Fuentes del final de la sección; acá queda solo la advertencia.
    banner.innerHTML = `⚠️ <strong>${kind}.</strong>` +
      (src ? ` ${t('fuentes.banner.ver', 'El documento y sus salvedades están en "Fuentes", al final de esta sección.')}` : '');
  }


  // Pinta los steps {label, op, magnitude, isResult?} del waterfall del Presupuesto Financiero, convirtiendo cada magnitude con
  // `meta` + currentCurrency. Los steps salen de presupuestoFinancieroByYear del club.
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


  // Las dos cards de presupuesto se arman de los datos del club, sin ramas por club: el que tiene desglose lo declara.
  // Las tablas con `formato:'ars-exacto'` van en pesos enteros, como las imprime el documento, y NO responden al toggle de moneda.
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


  // Card "Ingresos y Egresos por Torneo": HTML estático de Boca 2026/27, el único ejercicio con este desglose; para el resto se
  // esconde. Los "Gastos" de ese card son solo organización y logística de cada torneo (el presupuesto no reparte los sueldos por
  // competencia), así que la "Diferencia" no es el resultado real del torneo: cada card lo aclara.
  function renderTorneosCard(clubId, year){
    const isBoca2027 = clubId === 'boca-ar' && year === 2027;
    document.getElementById('torneosBoca2027').style.display = isBoca2027 ? '' : 'none';
  }


  // FICHA DE FUENTE del ejercicio que se está mirando, armada de los datos: un club nuevo la trae sin tocar este archivo. Nivel de
  // fuente y procedencia del tipo de cambio son etiquetas nuestras y se traducen (el título de un documento no). Las etiquetas salen
  // de data/sources-view.js, compartidas con fuentes.html.
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

  const CAVEAT_KEYS = {
    'El documento no declara un tipo de cambio y no se consiguió uno de su fecha de cierre: el valor en dólares usa una referencia redonda y sirve solo para dar orden de magnitud.': 'caveat.fxPlaceholder',
    'El tipo de cambio usado para pasar a dólares es aproximado: no se consiguió la cotización exacta de la fecha de cierre.': 'caveat.fxApprox',
    'Falta verificar de dónde salió el tipo de cambio usado para pasar a dólares.': 'caveat.fxUnknown',
    'El documento no publica el resultado del ejercicio, así que esa cifra no se puede verificar contra un total impreso.': 'caveat.noPAT',
    'No informa deuda ni caja.': 'caveat.noDebtCash'
  };
  function salvedadesDe(src, metas){
    const partes = [];
    if(src.publicNote) partes.push(src.publicNote);
    // Las salvedades salen de data/sources-view.js en castellano (también las usa la página de fuentes); acá se traducen por su texto.
    partes.push(...sourceCaveats(src, metas).map(c => CAVEAT_KEYS[c] ? t(CAVEAT_KEYS[c], c) : c));
    return partes.join(' ');
  }

  // Las metas de fiscalYearMeta del club actual que usan ESE documento.
  function metasDeFuente(sourceId){
    const meta = ((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {};
    return Object.keys(meta).filter(y => meta[y].sourceId === sourceId).map(y => meta[y]);
  }

  // Dos links: la página del club (fuentes/<clubId>.html) y el índice (fuentes.html). Un club sin documentos no tiene página
  // generada, así que ahí solo va el link al índice (si no, sería un 404).
  function linkTodasLasFuentes(){
    const tiene = Object.keys(sources).some(id => sources[id].clubId === currentClub);
    const otros = `<a href="fuentes.html">${t('fuentes.card.others', 'Ver fuentes de otros equipos')} →</a>`;
    if(!tiene) return `<p class="fin-fuentes-link" style="margin:14px 0 0;font-size:14px;">${otros}</p>`;
    return `<p class="fin-fuentes-link" style="margin:14px 0 0;font-size:14px;"><a href="fuentes/${currentClub}.html">${
      t('fuentes.card.club', 'Ver todos los documentos de este club')} →</a></p>` +
      `<p class="fin-fuentes-link" style="margin:6px 0 0;font-size:14px;">${otros}</p>`;
  }

  function renderFuentesCard(){
    const body = document.getElementById('finanzasFuentesBody');
    if(!body) return;
    const isGestion = document.querySelector('#viewToggle button.active').dataset.view === 'gestion';
    // Vista multi-año con varios ejercicios: un renglón plegable por ejercicio (el más nuevo abierto), cada uno con su ficha, y el
    // documento del presupuesto cuando el año tiene las dos fuentes.
    if(window.FIN_MULTI && !isGestion && FIN_SEL.years().length > 1){
      const metas = ((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {};
      const tipoDoc = rt => rt === 'official_budget' ? t('finanzas.card.budget', 'Presupuesto')
        : rt === 'official_budget_and_balance' ? t('finanzas.card.both', 'Presupuesto y Balance')
        : t('finanzas.card.balance', 'Balance');
      body.innerHTML = FIN_SEL.years().slice().reverse().map((y, i) => {
        const meta = metas[y] || {};
        return `<details class="fin-src-year"${i === 0 ? ' open' : ''}><summary>${labelEjercicioCorto(currentClub, y)} · ${tipoDoc(meta.reportType)}</summary>${fichaFuenteDeAnio(y)}</details>`;
      }).join('') + linkTodasLasFuentes();
      return;
    }
    const year = isGestion
      ? ((gestionesByClub[currentClub] || {})[document.getElementById('gestionSelect').value] || {}).lastYear
      : FIN_SEL.primary();
    body.innerHTML = fichaFuenteDeAnio(year) + linkTodasLasFuentes();
  }

  // La ficha de fuente de UN ejercicio: documento, nivel, tipos de cambio y salvedades. La usan la vista de un ejercicio y cada
  // renglón de la vista multi-año.
  function fichaFuenteDeAnio(year){
    const meta = (((window.CLUB_GENERIC_DATA || {})[currentClub] || {}).fiscalYearMeta || {})[year] || {};
    const src = sources[meta.sourceId];

    if(!src){
      return `<p style="color:var(--muted);font-size:14.5px;line-height:1.6;margin:6px 0 0;">${
        t('fuentes.card.none', 'Este ejercicio todavía no tiene un documento oficial cargado: los números que se muestran son un placeholder para probar el diseño, no cifras reales del club.')
      }</p>`;
    }

    // En la vista multi-año, el documento del presupuesto de un año que tiene las dos fuentes también se nombra.
    const ov = window.FIN_MULTI ? presupuestoOverlayFor(currentClub, year) : null;
    const srcPresu = ov && ov.sourceId ? sources[ov.sourceId] : null;
    const nivel = nivelFuente(src.reliability);
    const filas = [
      filaFicha(t('fuentes.card.doc', 'Documento'),
        `${src.title}${src.url ? ` <a href="${src.url}" target="_blank" rel="noopener">(${t('fuentes.card.see', 'ver documento')})</a>` : ''}`),
      filaFicha(t('fuentes.card.level', 'Tipo y nivel de fuente'),
        `${tipoFuente(src.type)} · <span style="color:${nivel.color};font-weight:600;">${nivel.label}</span>`),
      srcPresu ? filaFicha(t('fuentes.card.docBudget', 'Documento del presupuesto'),
        `${srcPresu.title}${srcPresu.url ? ` <a href="${srcPresu.url}" target="_blank" rel="noopener">(${t('fuentes.card.see', 'ver documento')})</a>` : ''}`) : '',
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

    return filas;
  }


  // ---------- RESULTADOS DEPORTIVOS ----------
  function populateResultadosSelector(clubId){
    const gestiones = gestionesByClub[clubId] || {};
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
    const gestiones = gestionesByClub[currentClub] || {};
    const data = titulosDataForClub(currentClub) || [];
    document.querySelector('#resultadosTable tbody').innerHTML = data.map(t => `
      <tr><td>${t.anio}</td><td>${t.competencia}</td><td>${t.resultado}</td><td>${gestiones[t.gestion] ? gestiones[t.gestion].nombre : t.gestion}</td></tr>
    `).join('');
  }


  // ---------- COMPARAR ----------
  function populateCompararSelectors(clubId){
    const gestiones = gestionesByClub[clubId] || {};
    const keys = Object.keys(gestiones);
    const optsHtml = keys.map(k => `<option value="${k}">${gestiones[k].nombre}</option>`).join('');
    document.getElementById('compA').innerHTML = optsHtml;
    document.getElementById('compB').innerHTML = optsHtml;
    if(keys.length > 1) document.getElementById('compB').value = keys[1];
  }


  function renderComparar(){
    const aKey = document.getElementById('compA').value;
    const bKey = document.getElementById('compB').value;
    const gestiones = gestionesByClub[currentClub] || {};
    const ga = gestiones[aKey], gb = gestiones[bKey];
    if(!ga || !gb) return;
    const a = computeYearForClub(currentClub, ga.lastYear);
    const b = computeYearForClub(currentClub, gb.lastYear);
    const da = displayFinancialsForClub(currentClub, a), db = displayFinancialsForClub(currentClub, b);
    document.getElementById('compAHead').textContent = ga.nombre;
    document.getElementById('compBHead').textContent = gb.nombre;
    const resultadosDataset = resultadosDataForClub(currentClub) || {};
    const rA = resultadosDataset[aKey] || {titulosLocales:0, titulosInternacionales:0, mejorResultadoLibertadores:'—'};
    const rB = resultadosDataset[bKey] || {titulosLocales:0, titulosInternacionales:0, mejorResultadoLibertadores:'—'};
    const rows = [
      ['Ingresos (último ejercicio)', da.revenue, db.revenue, 'money'],
      ['Gastos (último ejercicio)', da.expenses, db.expenses, 'money'],
      ['Resultado neto (último ejercicio)', da.pat, db.pat, 'money'],
      ['Deuda neta (último ejercicio)', da.netDebt, db.netDebt, 'money-inv'],
      ['Títulos totales (gestión)', rA.titulosLocales+rA.titulosInternacionales, rB.titulosLocales+rB.titulosInternacionales, 'num'],
      ['Mejor resultado en Libertadores', rA.mejorResultadoLibertadores, rB.mejorResultadoLibertadores, 'text'],
    ];
    document.querySelector('#compareTable tbody').innerHTML = rows.map(r => {
      const [labelEs, va, vb, type] = r; const label = tLabel(labelEs);
      const isMoney = type === 'money' || type === 'money-inv';
      const fa = va == null ? '—' : isMoney ? fmtAmount(va, 'USD') : va;
      const fb = vb == null ? '—' : isMoney ? fmtAmount(vb, 'USD') : vb;
      if(type === 'text'){
        return `<tr><td>${label}</td><td>${fa}</td><td>${fb}</td></tr>`;
      }
      const lowerBetter = type === 'num-inv' || type === 'money-inv';
      const ambos = va != null && vb != null;
      const aBetter = ambos && (lowerBetter ? va < vb : va > vb);
      const bBetter = ambos && (lowerBetter ? vb < va : vb > va);
      return `<tr><td>${label}</td><td class="${aBetter?'better':''}">${fa}</td><td class="${bBetter?'better':''}">${fb}</td></tr>`;
    }).join('');
  }
  document.getElementById('compA').addEventListener('change', renderComparar);
  document.getElementById('compB').addEventListener('change', renderComparar);


  // Atajo de traducción. I18N vive en js/i18n.js, que carga antes; se envuelve igual para que, si no cargara, el sitio siga en
  // castellano en vez de tirar ReferenceError.
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }

  // Traduce SOLO las etiquetas del sitio (filas de Formato simplificado y catch-alls, data/site-labels.js); un rubro textual del
  // balance del club pasa sin tocar. Traduce al DIBUJAR, no cambia `label`: el castellano es la clave con la que matchean
  // findPrevVal() y el overlay.
  function tLabel(label){
    const key = (window.SITE_LABEL_KEYS || {})[label];
    return key ? t(key, label) : (glosaDe(label) || label);
  }
  // La glosa de una etiqueta del balance del club en el idioma que eligió el visitante (data/<país>/<club>-glosas.js), o null si ya está en ese idioma o no hay.
  function glosaDe(label){
    const g = (window.GLOSAS_ETIQUETAS || {})[label];
    const idioma = window.I18N && window.I18N.current;
    return g && idioma && g[idioma] ? g[idioma] : null;
  }
  // ---- s/d: una celda que el documento no abre (NO es un cero) ----
  // `meta.sinDesglose` (fiscalYearMeta del año) lista las líneas que el documento junta en una sola: {renglon, lado, importe, motivo, tipo}.
  // `lado` viene con cuatro grafías en los datos viejos (revenue/ingreso, expense/gasto): se normaliza acá.
  const ladoSD = l => /^(revenue|ingreso)$/.test(l) ? 'revenue' : 'expense';
  function sinDesgloseDe(meta, lado){
    return ((meta && meta.sinDesglose) || []).find(e => ladoSD(e.lado) === lado) || null;
  }
  // El rótulo de la línea en el idioma del visitante y sin el paréntesis o la aclaración que lo sigue: en una frase alcanza el nombre.
  const RAYAS = String.fromCharCode(8212, 8211);
  const rotuloCorto = s => (glosaDe(s) || s).replace(new RegExp('\\s*[(' + RAYAS + '].*$'), '').trim() || s;
  function textoSD(meta, lado){
    const e = sinDesgloseDe(meta, lado);
    if(!e) return t('pl.sd.tip.gen', 'Sin desglose: el documento de este ejercicio no abre este renglón. No es cero.');
    const r = rotuloCorto(e.renglon);
    if(lado === 'expense') return t('pl.sd.tip.exp', 'Sin desglose: este ejercicio el documento informa los gastos en una sola línea, sin abrirlos. No es cero.');
    return e.tipo === 'gross_margin'
      ? t('pl.sd.tip.margin', 'Sin desglose: este ejercicio el documento informa solo «{r}» (un margen bruto), no los ingresos por separado. No es cero.').replace('{r}', r)
      : t('pl.sd.tip.one', 'Sin desglose: este ejercicio el documento informa los ingresos en una sola línea («{r}»), sin abrirlos por fuente. No es cero.').replace('{r}', r);
  }
  // El asterisco lleva a «Notas sobre este club» sin tocar la URL (un ancla común volvía a la portada) y la resalta un momento.
  document.addEventListener('click', ev => {
    const a = ev.target.closest && ev.target.closest('.pl-sd-n a');
    if(!a) return;
    ev.preventDefault(); ev.stopPropagation();
    const box = document.getElementById('finNotasClub');
    if(!box || box.hidden) return;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    box.classList.add('pl-notas-flash'); setTimeout(() => box.classList.remove('pl-notas-flash'), 1800);
  });
  // La marca de la celda: «s/d» con su bocadillo (js/info-tip.js: hover en escritorio, toque en el celular) y un asterisco que lleva a «Notas sobre este club».
  function marcaSD(meta, lado){
    const e = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    return `<span class="pl-sd" tabindex="0" data-info-tip="${e(textoSD(meta, lado))}">${e(t('pl.sd', 's/d'))}</span><sup class="pl-sd-n"><a href="#finNotasClub" role="button" aria-label="${e(t('pl.notas.title', 'Notas sobre este club'))}">*</a></sup>`;
  }
  // Un ingreso negativo (el documento lo resta de los ingresos brutos): el número con su bocadillo y el asterisco que lleva a «Notas sobre este club».
  function marcaNeg(valorHtml){
    const e = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    return `<span class="pl-neg" tabindex="0" data-info-tip="${e(t('pl.neg.tip', 'El equipo declaró el número en negativo y preferí ser honesto con la fuente.'))}">${valorHtml}</span><sup class="pl-sd-n"><a href="#finNotasClub" role="button" aria-label="${e(t('pl.notas.title', 'Notas sobre este club'))}">*</a></sup>`;
  }
  // Los renglones de ingresos negativos de un ejercicio (rótulo corto), para su nota.
  function ingresosNegativos(clubId, y){
    const rep = nativeReportFor(clubId, y); const meta = yearMetaFor(clubId, y);
    return ((rep && rep.ingresos) || []).filter(c => !c.unknown && !c.incluidoEn && nativeDisplayVal(c.value, meta, currentCurrency) < 0).map(c => (window.SITE_LABEL_KEYS || {})[c.label] ? tLabel(c.label) : rotuloCorto(c.label));
  }
  // «Notas sobre este club»: una nota por ejercicio mostrado que tiene líneas sin desglosar, armada con los datos del año (sinDesglose) y las plantillas del idioma.
  function renderNotasClub(clubId, years){
    const box = document.getElementById('finNotasClub');
    if(!box) return;
    const lab = y => (typeof esEjercicioCalendario === 'function' && esEjercicioCalendario(clubId, y)) ? String(y) : (y - 1) + '/' + String(y).slice(2);
    // Sin montos: la tabla ya muestra la cifra, y sin ellos los ejercicios consecutivos con la misma nota se juntan en un solo punto («2019/20 a 2022/23»).
    const lineasIngreso = y => (((window.CLUB_GENERIC_DATA || {})[clubId] || {}).revenueLinesByYear || {})[y] || [];
    // Una nota por EJERCICIO (los ingresos y los gastos del mismo año van juntos, en una sola) y los ejercicios con el mismo texto, consecutivos o no, en un solo punto («2016 a 2018 y 2021»):
    // la nota se arma acá con lo que dice el dato de cada año, así que un año nuevo con el mismo caso se suma solo al grupo.
    const porAnio = {};
    (years || []).slice().sort().forEach(y => {
      const meta = yearMetaFor(clubId, y);
      ['revenue', 'expense'].forEach(lado => {
        const e = sinDesgloseDe(meta, lado); if(!e) return;
        // «sales»: la línea es todo el ingreso del año; «salesPart»: el año tiene otras líneas de ingreso y esta es solo una parte (también si es un departamento o una división)
        const otras = lineasIngreso(y).length > 1;
        const clave = lado === 'expense' ? 'exp' : (e.tipo === 'gross_margin' ? 'margin' : e.tipo === 'net_sales' ? (otras ? 'salesPart' : 'sales') : (otras ? 'salesPart' : 'other'));
        (porAnio[y] = porAnio[y] || {})[lado] = { clave, r: rotuloCorto(e.renglon) };
      });
      const neg = ingresosNegativos(clubId, y);
      if(neg.length) (porAnio[y] = porAnio[y] || {}).neg = neg;
    });
    const PLANTILLA = {
      margin: 'El documento informa solo «{r}», así que no sabemos cuántos ingresos generó el club: solo la diferencia entre sus ingresos y parte de sus costos. Los ingresos que se muestran acá no son comparables con los de los años que abren los ingresos. Las categorías figuran como s/d.',
      sales: 'El documento informa una categoría como ingresos pero no lo abre por rubro. El total sí se puede comparar con otros ejercicios; las categorías figuran como s/d.',
      salesPart: '«{r}» no se abre por fuente de ingreso y figura como s/d. El resto de los ingresos del ejercicio está abierto en las otras líneas.',
      other: 'El documento informa los ingresos en una sola línea («{r}»), sin abrirlos por fuente. Las categorías figuran como s/d.',
      exp: 'El documento informa los gastos en una sola línea, sin abrirlos. Las categorías de gasto figuran como s/d.'
    };
    const textoDe = n => t('pl.notas.' + n.clave, PLANTILLA[n.clave]).replace('{r}', n.r);
    const porTexto = new Map();
    Object.keys(porAnio).map(Number).sort((a, b) => a - b).forEach(y => {
      const n = porAnio[y];
      let texto = '';
      if(!n.revenue && !n.expense){
        // solo ingresos negativos: sin nada que no se abra
      } else if(n.revenue && n.expense){
        texto = n.revenue.clave === 'other'
          ? t('pl.notas.both', 'El documento informa los ingresos («{r}») y los gastos en una sola línea cada uno, sin abrirlos. Las categorías figuran como s/d.').replace('{r}', n.revenue.r)
          : textoDe(n.revenue) + ' ' + t('pl.notas.expTambien', 'Los gastos tampoco se abren: vienen en una sola línea y su categoría figura como s/d.');
      } else texto = textoDe(n.revenue || n.expense);
      if(n.neg) texto = (texto ? texto + ' ' : '') + t('pl.notas.neg', 'Ingresos negativos ({r}): el documento los resta de los ingresos brutos (suele ser un impuesto u otra deducción). El total de ingresos es el neto que informa el club.').replace('{r}', n.neg.join(', '));
      if(!porTexto.has(texto)) porTexto.set(texto, []);
      porTexto.get(texto).push(y);
    });
    const rangos = ys => {
      const runs = [];
      ys.forEach(y => { const u = runs[runs.length - 1]; if(u && y === u[1] + 1) u[1] = y; else runs.push([y, y]); });
      const partes = runs.map(([a, b]) => a === b ? lab(a) : lab(a) + t('pl.notas.hasta', ' a ') + lab(b));
      return partes.length > 1 ? partes.slice(0, -1).join(', ') + t('pl.notas.y', ' y ') + partes[partes.length - 1] : partes[0];
    };
    const items = [...porTexto.entries()].map(([texto, ys]) => `<li><b>${rangos(ys)}.</b> ${texto}</li>`);
    box.hidden = !items.length;
    box.innerHTML = items.length ? `<h3>${t('pl.notas.title', 'Notas sobre este club')}</h3><ul>${items.join('')}</ul><p class="pl-notas-leyenda"><span class="pl-sd">${t('pl.sd', 's/d')}</span> ${t('pl.notas.leyenda', 'sin desglose: el documento no abre este ingreso o gasto; no es cero.')} <span class="pl-notas-cero">—</span> ${t('pl.notas.cero', 'cero real o sin dato.')}</p>` : '';
  }
  // Para una celda de la tabla: la glosa con el original a mano (title y subrayado punteado). Sin glosa, igual que tLabel.
  function tLabelH(label){
    const gl = (window.SITE_LABEL_KEYS || {})[label] ? null : glosaDe(label);
    const e = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    return gl ? `<span class="gl-etiqueta" title="${e(t('finanzas.glosaOriginal', 'Dice en el documento') + ': ' + label)}">${e(gl)}</span>` : tLabel(label);
  }

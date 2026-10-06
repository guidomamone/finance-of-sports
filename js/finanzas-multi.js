// ============================================================================
// js/finanzas-multi.js — el Estado de resultados con UNA COLUMNA POR EJERCICIO (to-do 147, paso 5a).
//
// Se usa solo con `?multi=1` y más de un ejercicio elegido (FIN_SEL). Con uno solo sigue la tabla de
// siempre, `renderNativePLTable()` (js/finanzas-render.js), que además es la que devuelve los totales
// del ejercicio más nuevo para los KPIs: esa tabla se sigue armando (escondida) para que KPIs y tabla
// nunca puedan decir números distintos.
//
// Por qué una tabla aparte y no generalizar renderNativePLTable(): esa función tiene 5 columnas fijas
// (colgroup, colspan, CSS por nth-child) con reglas de ancho que Guido pidió una por una (ver sus
// comentarios), y la columna de presupuesto del mismo año. Esta tabla tiene N columnas y otra lógica
// de anchos; mezclarlas era tocar código ya verificado para todos los clubes.
//
// Qué muestra (mockup: Prototyping/Finanzas/mockup-147.html, nota 5):
//   - Rubro | un ejercicio por columna (más viejo a la izquierda) | Δ primero→último | tendencia.
//   - Un "…" angosto entre dos ejercicios elegidos que no son consecutivos.
//   - Filas: la unión de las filas de todos los ejercicios elegidos, en el orden en que aparecen. En
//     formato simplificado son siempre las mismas; en formato del club, una fila que un año no tiene
//     sale "—" ese año (un rubro que el club renombró queda como dos filas: es lo que dice cada
//     documento).
//   - Un ejercicio que es solo presupuesto: columna en amarillo y cursiva.
//   - Los montos de cada ejercicio se convierten con SU tipo de cambio (nativeDisplayVal + yearMetaFor),
//     igual que en la tabla de un año.
//   Lo que falta (paso 5b): desplegar un rubro para ver su gráfico, "% del total", y el presupuesto al
//   lado del balance en los años que tienen los dos (acá esos años muestran el balance).
// ============================================================================

function renderMultiPLTable(clubId, years, tableId){
  const BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
  const cal = clubs[clubId] && clubs[clubId].fiscalYearStart === '01-01';
  const lab = y => cal ? String(y) : (y - 1) + '/' + String(y).slice(2);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  const datos = years.map(y => {
    const meta = yearMetaFor(clubId, y);
    const rep = nativeReportFor(clubId, y);
    const c = computeYearGeneric(clubId, y);
    const sinGastos = !!c && !(c.expenseLines || []).length && (c.meta || {}).officialTotalExpenses == null && !c.expenses && !c.nonCash;
    return { y, meta, rep, sinGastos, presu: !BAL[reportTypeForYear(clubId, y)] };
  });
  const val = (d, v) => nativeDisplayVal(v, d.meta, currentCurrency);

  // Columnas: un ejercicio cada una, con un "…" donde la selección saltea años.
  const cols = [];
  datos.forEach((d, i) => {
    if(i && d.y - datos[i - 1].y > 1) cols.push({ gap:true });
    cols.push({ d });
  });
  const N = cols.length + 3;
  const primero = datos[0], ultimo = datos[datos.length - 1];

  // La fila `label` de un ejercicio. Si el documento repite una etiqueta en la misma sección (Juventus
  // 2002/03 tiene dos "- from others" en los resultados financieros), se suman: si no, la columna
  // mostraría una sola y el total no cerraría contra la tabla de un año.
  function filaDe(lista, label){
    const iguales = (lista || []).filter(r => r.label === label);
    if(iguales.length <= 1) return iguales[0] || null;
    return { label, value: iguales.reduce((s, r) => s + (r.value || 0), 0), unknown: iguales.every(r => r.unknown) };
  }
  function union(key){
    const out = [];
    datos.forEach(d => (d.rep[key] || []).forEach(r => { if(!out.includes(r.label)) out.push(r.label); }));
    return out;
  }
  // El valor que entra al Δ y a la tendencia: null si ese año no lo informa.
  function numero(d, row, seccion){
    if(!row || row.unknown || row.incluidoEn) return null;
    if(seccion === 'gastos' && d.sinGastos) return null;
    return val(d, row.value);
  }
  function celda(d, row, seccion){
    const cls = d.presu ? ' class="pl-col-presu"' : '';
    if(seccion === 'gastos' && d.sinGastos) return `<td${cls}>—</td>`;
    if(!row) return `<td${cls} title="${esc(t('pl.multi.noRow', 'Este rubro no aparece en el documento de este ejercicio'))}">—</td>`;
    if(row.incluidoEn) return `<td${cls}><span class="pl-incluido" tabindex="0" data-info-tip="${esc(window.FINANZAS_DENTRO_TIP(row.incluidoEn, row.incluidoPosible))}">—</span></td>`;
    if(row.unknown) return `<td${cls}>—</td>`;
    return `<td${cls}>${fmtDisplay(val(d, row.value))}</td>`;
  }
  // Δ del primer ejercicio elegido al último. En gastos se compara el tamaño (que el gasto crezca
  // es "más gasto", rojo); en ingresos, el valor.
  function delta(v0, v1, seccion){
    if(v0 == null || v1 == null || !v0) return '—';
    const gasto = seccion === 'gastos';
    const pct = gasto ? (Math.abs(v1) - Math.abs(v0)) / Math.abs(v0) * 100 : (v1 - v0) / Math.abs(v0) * 100;
    const bueno = gasto ? pct < 0 : pct > 0;
    const txt = (pct > 0 ? '+' : '') + pct.toFixed(0) + '%';
    return `<span class="${Math.round(pct) === 0 ? '' : bueno ? 'pl-up' : 'pl-down'}">${txt}</span>`;
  }
  // Sparkline: un punto por ejercicio elegido (los que no informan, salteados). Tramo punteado si
  // hay años sin elegir en el medio o si una punta es un presupuesto.
  function spark(vals, seccion){
    const pts = vals.map((v, i) => v == null ? null : { i, v: seccion === 'gastos' ? Math.abs(v) : v }).filter(Boolean);
    if(pts.length < 2) return '';
    const W = 84, H = 22, n = datos.length;
    const mn = Math.min(...pts.map(p => p.v)), mx = Math.max(...pts.map(p => p.v)), r = (mx - mn) || 1;
    const x = i => 3 + i * (W - 6) / (n - 1), y = v => H - 3 - (v - mn) / r * (H - 6);
    const color = seccion === 'gastos' ? '#b5372b' : '#0a2b5c';
    let s = '';
    for(let k = 1; k < pts.length; k++){
      const a = pts[k - 1], b = pts[k];
      const punteado = datos[b.i].y - datos[a.i].y > 1 || datos[a.i].presu || datos[b.i].presu;
      s += `<line x1="${x(a.i).toFixed(1)}" y1="${y(a.v).toFixed(1)}" x2="${x(b.i).toFixed(1)}" y2="${y(b.v).toFixed(1)}" stroke="${color}" stroke-width="1.6"${punteado ? ' stroke-dasharray="2 2"' : ''}/>`;
    }
    const l = pts[pts.length - 1];
    s += `<circle cx="${x(l.i).toFixed(1)}" cy="${y(l.v).toFixed(1)}" r="2.4" fill="${datos[l.i].presu ? '#fff' : color}" stroke="${color}" stroke-width="1.3"/>`;
    return `<svg width="${W}" height="${H}" aria-hidden="true">${s}</svg>`;
  }
  function filaDatos(label, filas, seccion, extraClass){
    const nums = datos.map((d, i) => numero(d, filas[i], seccion));
    let h = `<tr${extraClass ? ` class="${extraClass}"` : ''}><td>${tLabel(label)}</td>`;
    let i = 0;
    cols.forEach(c => { h += c.gap ? '<td class="pl-gap"></td>' : celda(c.d, filas[i++], seccion); });
    h += `<td class="pl-delta">${delta(nums[0], nums[nums.length - 1], seccion)}</td><td class="pl-spark">${spark(nums, seccion)}</td></tr>`;
    return { html: h, nums };
  }
  function seccion(key, titulo){
    let html = `<tr class="pl-section-head"><td colspan="${N}">${titulo}</td></tr>`;
    union(key).forEach(label => {
      const filas = datos.map(d => filaDe(d.rep[key], label));
      const todasVacias = filas.every(r => !r || r.unknown);
      html += filaDatos(label, filas, key, todasVacias ? 'pl-nodato' : '').html;
    });
    const totales = datos.map(d => (key === 'gastos' && d.sinGastos) ? null : (d.rep[key] || []).reduce((s, r) => s + val(d, r.value), 0));
    let tot = `<tr class="pl-bold pl-shade"><td>Total ${titulo}</td>`;
    let i = 0;
    cols.forEach(c => {
      if(c.gap){ tot += '<td class="pl-gap"></td>'; return; }
      const v = totales[i++];
      tot += `<td${c.d.presu ? ' class="pl-col-presu"' : ''}>${v == null ? t('stat.nodata', 'Sin dato') : fmtDisplay(v)}</td>`;
    });
    tot += `<td class="pl-delta">${delta(totales[0], totales[totales.length - 1], key)}</td><td class="pl-spark">${spark(totales, key)}</td></tr>`;
    return { html: html + tot, totales };
  }

  const ing = seccion('ingresos', t('section.revenue', 'Ingresos'));
  const gas = seccion('gastos', t('section.expenses', 'Gastos'));

  // Filas de abajo (Intereses netos, Impuestos…): la unión; "Intereses netos" siempre, las demás si
  // algún año tiene un valor distinto de cero (misma regla que la tabla de un año, Versiones 60 y 61).
  const extraLabels = [];
  datos.forEach(d => (d.rep.extraRows || []).forEach(e => { if(!extraLabels.includes(e.label)) extraLabels.push(e.label); }));
  let extraHtml = '';
  const extraTot = datos.map(() => 0);
  extraLabels.forEach(label => {
    const filas = datos.map(d => filaDe(d.rep.extraRows, label));
    filas.forEach((r, i) => { if(r) extraTot[i] += val(datos[i], r.value); });
    const algunoNoCero = filas.some((r, i) => r && val(datos[i], r.value) !== 0);
    if(!algunoNoCero && label !== 'Intereses netos') return;
    let h = `<tr><td>${tLabel(label)}</td>`;
    let i = 0;
    cols.forEach(c => {
      if(c.gap){ h += '<td class="pl-gap"></td>'; return; }
      const r = filas[i++];
      h += `<td${c.d.presu ? ' class="pl-col-presu"' : ''}>${r ? fmtDisplay(val(c.d, r.value)) : '—'}</td>`;
    });
    extraHtml += h + '<td class="pl-delta"></td><td class="pl-spark"></td></tr>';
  });

  const resultados = datos.map((d, i) => (d.sinGastos || gas.totales[i] == null) ? null : ing.totales[i] + gas.totales[i] + extraTot[i]);
  let res = `<tr class="pl-bold pl-highlight"><td>${tLabel(ultimo.rep.resultLabel || 'Resultado neto')}</td>`;
  let k = 0;
  cols.forEach(c => {
    if(c.gap){ res += '<td class="pl-gap"></td>'; return; }
    const v = resultados[k++];
    res += `<td${c.d.presu ? ' class="pl-col-presu"' : ''}>${v == null ? t('stat.nodata', 'Sin dato') : fmtDisplay(v)}</td>`;
  });
  res += `<td class="pl-delta"></td><td class="pl-spark">${spark(resultados, 'resultado')}</td></tr>`;

  // Encabezado
  const tipo = d => d.presu ? t('finanzas.card.budget', 'Presupuesto') : t('finanzas.card.balance', 'Balance');
  let head = `<tr><th>${t('th.line', 'Rubro')}<small>M ${esc(currentCurrency)}</small></th>`;
  cols.forEach(c => {
    head += c.gap ? `<th class="pl-gap" title="${esc(t('pl.multi.gap', 'Años sin elegir en el medio'))}">…</th>`
      : `<th${c.d.presu ? ' class="pl-col-presu"' : ''}>${lab(c.d.y)}<small>${tipo(c.d)}</small></th>`;
  });
  head += `<th class="pl-delta">Δ ${lab(primero.y)}→${lab(ultimo.y)}</th><th class="pl-spark">${t('pl.multi.trend', 'Tendencia')}</th></tr>`;

  const sp = `<tr class="pl-spacer"><td colspan="${N}"></td></tr>`;
  const tabla = document.getElementById(tableId);
  tabla.querySelector('thead').innerHTML = head;
  tabla.querySelector('tbody').innerHTML = ing.html + sp + gas.html + (extraHtml ? sp + extraHtml : '') + sp + res;
}

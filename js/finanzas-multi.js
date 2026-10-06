// ============================================================================
// js/finanzas-multi.js — el Estado de resultados con UNA COLUMNA POR EJERCICIO (to-do 147, pasos 5a y 5b).
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
// Qué muestra (mockup: Prototyping/Finanzas/mockup-147.html, notas 5 y 11):
//   - Rubro | un ejercicio por columna (más viejo a la izquierda) | Δ primero→último | tendencia.
//   - Un "…" angosto entre dos ejercicios elegidos que no son consecutivos.
//   - Filas: la unión de las filas de todos los ejercicios elegidos, en el orden en que aparecen. En
//     formato simplificado son siempre las mismas; en formato del club, una fila que un año no tiene
//     sale "—" ese año (un rubro que el club renombró queda como dos filas: es lo que dice cada
//     documento). Si un documento repite una etiqueta en la misma sección, se suman.
//   - Un ejercicio que es solo presupuesto: columna en amarillo y cursiva.
//   - Los montos de cada ejercicio se convierten con SU tipo de cambio (nativeDisplayVal + yearMetaFor),
//     igual que en la tabla de un año.
//   - Paso 5b: tocar un rubro abre su gráfico (Chart.js) debajo de la fila; "M USD | % del total"; y
//     "Presupuesto al lado del balance" (apagado por default), que abre cada año que tiene las dos
//     fuentes en presupuesto | balance | desvío. Manda siempre el balance: es lo que pasó.
// ============================================================================

const FIN_MULTI_PL = (function(){
  const BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
  const estado = { unidad:'abs', conPresu:false, abiertos:new Set(), club:null, years:[], tableId:null };
  let graficos = [];

  function t(k, es){ return (window.I18N && I18N.t) ? I18N.t(k, es) : es; }
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  // La fila `label` de una lista. Si el documento repite una etiqueta en la misma sección (Juventus
  // 2002/03 tiene dos "- from others" en los resultados financieros), se suman: si no, la columna
  // mostraría una sola y el total no cerraría contra la tabla de un año.
  function filaDe(lista, label){
    const iguales = (lista || []).filter(r => r.label === label);
    if(iguales.length <= 1) return iguales[0] || null;
    return { label, value: iguales.reduce((s, r) => s + (r.value || 0), 0), unknown: iguales.every(r => r.unknown) };
  }

  function render(clubId, years, tableId){
    if(clubId !== estado.club){ estado.club = clubId; estado.abiertos.clear(); estado.conPresu = false; }
    estado.years = years; estado.tableId = tableId;
    graficos.forEach(g => g.destroy()); graficos = [];

    const cal = clubs[clubId] && clubs[clubId].fiscalYearStart === '01-01';
    const lab = y => cal ? String(y) : (y - 1) + '/' + String(y).slice(2);
    const pct = estado.unidad === 'pct';

    const datos = years.map(y => {
      const meta = yearMetaFor(clubId, y);
      const rep = nativeReportFor(clubId, y);
      const c = computeYearGeneric(clubId, y);
      const sinGastos = !!c && !(c.expenseLines || []).length && (c.meta || {}).officialTotalExpenses == null && !c.expenses && !c.nonCash;
      const presu = !BAL[reportTypeForYear(clubId, y)];
      const ov = presu ? null : presupuestoOverlayReportFor(clubId, y);
      return { y, meta, rep, sinGastos, presu, ov, ovMeta: ov ? presupuestoOverlayMetaFor(clubId, y) : null };
    });
    const hayPB = datos.some(d => d.ov);
    const abrir = estado.conPresu && hayPB;

    // Columnas. `src`: 'main' (el documento que manda ese año), 'ov' (su presupuesto, si se pidió al
    // lado) o 'dev' (desvío balance vs. presupuesto). Un "…" donde la selección saltea años.
    const cols = [];
    datos.forEach((d, i) => {
      if(i && d.y - datos[i - 1].y > 1) cols.push({ gap:true });
      if(abrir && d.ov){ cols.push({ d, src:'ov' }); cols.push({ d, src:'main' }); cols.push({ d, src:'dev' }); }
      else cols.push({ d, src:'main' });
    });
    const N = cols.length + 3;
    const primero = datos[0], ultimo = datos[datos.length - 1];

    const repDe = (d, src) => src === 'ov' ? d.ov : d.rep;
    const metaDe = (d, src) => src === 'ov' ? d.ovMeta : d.meta;
    const val = (d, src, v) => nativeDisplayVal(v, metaDe(d, src), currentCurrency);
    const cls = c => c.src === 'ov' || (c.src === 'main' && c.d.presu) ? ' class="pl-col-presu"' : c.src === 'dev' ? ' class="pl-dev"' : '';

    // Totales por sección, por ejercicio y fuente (null = no informa).
    function totalDe(d, src, key){
      const r = repDe(d, src);
      if(!r) return null;
      if(key === 'gastos' && src === 'main' && d.sinGastos) return null;
      return (r[key] || []).reduce((s, x) => s + val(d, src, x.value), 0);
    }
    function extraDe(d){ return (d.rep.extraRows || []).reduce((s, e) => s + val(d, 'main', e.value), 0); }
    function resultadoDe(d, src){
      const i = totalDe(d, src, 'ingresos'), g = totalDe(d, src, 'gastos');
      if(i == null || g == null) return null;
      return src === 'ov' ? i + g : i + g + extraDe(d);   // el presupuesto no tiene filas de abajo (Versión 60)
    }
    function numero(d, src, row, key){
      if(!row || row.unknown || row.incluidoEn) return null;
      if(key === 'gastos' && src === 'main' && d.sinGastos) return null;
      return val(d, src, row.value);
    }
    // "% del total": contra el total de su sección ese año; el resultado, contra los ingresos (margen).
    function comoPct(v, base){ return (v == null || !base) ? null : v / base * 100; }
    function fmtPct(p){ return p == null ? '—' : (Math.round(p) < 0 ? `<span class="neg-num">(${Math.abs(Math.round(p))}%)</span>` : Math.round(p) + '%'); }

    function desvio(real, plan, key){
      if(real == null || plan == null || !plan) return '—';
      if(key === 'resultado'){
        const dif = real - plan;
        return `<span class="${dif > 0 ? 'pl-up' : dif < 0 ? 'pl-down' : ''}">${dif > 0 ? '+' : ''}${fmtDisplay(dif)}</span>`;
      }
      const gasto = key === 'gastos';
      const p = gasto ? (Math.abs(real) - Math.abs(plan)) / Math.abs(plan) * 100 : (real - plan) / Math.abs(plan) * 100;
      const bueno = gasto ? p < 0 : p > 0;
      return `<span class="${Math.round(p) === 0 ? '' : bueno ? 'pl-up' : 'pl-down'}">${p > 0 ? '+' : ''}${p.toFixed(0)}%</span>`;
    }
    // Δ del primer ejercicio elegido al último (sobre lo que manda cada año). En gastos se compara el
    // tamaño: que el gasto crezca es "más gasto", rojo. En "% del total", diferencia en puntos.
    function delta(v0, v1, key){
      if(v0 == null || v1 == null) return '—';
      if(pct){
        const dif = v1 - v0;
        return `<span class="${Math.round(dif) === 0 ? '' : (key === 'gastos' ? dif < 0 : dif > 0) ? 'pl-up' : 'pl-down'}">${dif > 0 ? '+' : ''}${dif.toFixed(0)} pp</span>`;
      }
      if(!v0) return '—';
      const gasto = key === 'gastos';
      const p = gasto ? (Math.abs(v1) - Math.abs(v0)) / Math.abs(v0) * 100 : (v1 - v0) / Math.abs(v0) * 100;
      const bueno = gasto ? p < 0 : p > 0;
      return `<span class="${Math.round(p) === 0 ? '' : bueno ? 'pl-up' : 'pl-down'}">${p > 0 ? '+' : ''}${p.toFixed(0)}%</span>`;
    }
    function spark(vals, key){
      const pts = vals.map((v, i) => v == null ? null : { i, v: key === 'gastos' ? Math.abs(v) : v }).filter(Boolean);
      if(pts.length < 2) return '';
      const W = 84, H = 22, n = datos.length;
      const mn = Math.min(...pts.map(p => p.v)), mx = Math.max(...pts.map(p => p.v)), r = (mx - mn) || 1;
      const x = i => 3 + i * (W - 6) / (n - 1), y = v => H - 3 - (v - mn) / r * (H - 6);
      const color = key === 'gastos' ? '#b5372b' : '#0a2b5c';
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

    // Una fila de rubro. `rowsDe(d, src)` da la fila de ese año y fuente.
    function fila(label, key, rowsDe, opts){
      const totK = key;
      const principal = datos.map(d => numero(d, 'main', rowsDe(d, 'main'), key));
      const principalPct = datos.map((d, i) => comoPct(principal[i], totalDe(d, 'main', totK)));
      const serie = pct ? principalPct : principal;
      const id = key + '|' + label;
      const abierto = estado.abiertos.has(id);
      let h = `<tr class="pl-row-open${abierto ? ' abierto' : ''}${opts.nodato ? ' pl-nodato' : ''}" data-id="${esc(id)}" tabindex="0"><td><span class="pl-arrow">${abierto ? '&#9662;' : '&#9656;'}</span>${tLabel(label)}</td>`;
      cols.forEach(c => {
        if(c.gap){ h += '<td class="pl-gap"></td>'; return; }
        const d = c.d;
        if(c.src === 'dev'){
          h += `<td${cls(c)}>${pct ? '—' : desvio(principal[datos.indexOf(d)], numero(d, 'ov', rowsDe(d, 'ov'), key), key)}</td>`;
          return;
        }
        const row = rowsDe(d, c.src);
        if(c.src === 'main' && key === 'gastos' && d.sinGastos){ h += `<td${cls(c)}>—</td>`; return; }
        if(!row){ h += `<td${cls(c)} title="${esc(t('pl.multi.noRow', 'Este rubro no aparece en el documento de este ejercicio'))}">—</td>`; return; }
        if(row.incluidoEn){ h += `<td${cls(c)}><span class="pl-incluido" tabindex="0" data-info-tip="${esc(window.FINANZAS_DENTRO_TIP(row.incluidoEn, row.incluidoPosible))}">—</span></td>`; return; }
        if(row.unknown){ h += `<td${cls(c)}>—</td>`; return; }
        const v = val(d, c.src, row.value);
        h += `<td${cls(c)}>${pct ? fmtPct(comoPct(v, totalDe(d, c.src, totK))) : fmtDisplay(v)}</td>`;
      });
      h += `<td class="pl-delta">${delta(serie[0], serie[serie.length - 1], key)}</td><td class="pl-spark">${spark(serie, key)}</td></tr>`;
      if(abierto) h += `<tr class="pl-row-chart"><td colspan="${N}"><div class="pl-row-chart-wrap"><canvas data-chart="${esc(id)}"></canvas></div></td></tr>`;
      return h;
    }

    function seccion(key, titulo){
      let html = `<tr class="pl-section-head"><td colspan="${N}">${titulo}</td></tr>`;
      const labels = [];
      datos.forEach(d => (d.rep[key] || []).forEach(r => { if(!labels.includes(r.label)) labels.push(r.label); }));
      labels.forEach(label => {
        const rowsDe = (d, src) => filaDe((repDe(d, src) || {})[key], label);
        const nodato = datos.every(d => { const r = rowsDe(d, 'main'); return !r || r.unknown; });
        html += fila(label, key, rowsDe, { nodato });
      });
      // Total
      let tot = `<tr class="pl-bold pl-shade"><td>Total ${titulo}</td>`;
      cols.forEach(c => {
        if(c.gap){ tot += '<td class="pl-gap"></td>'; return; }
        if(c.src === 'dev'){ tot += `<td${cls(c)}>${pct ? '—' : desvio(totalDe(c.d, 'main', key), totalDe(c.d, 'ov', key), key)}</td>`; return; }
        const v = totalDe(c.d, c.src, key);
        tot += `<td${cls(c)}>${v == null ? t('stat.nodata', 'Sin dato') : pct ? '100%' : fmtDisplay(v)}</td>`;
      });
      const tots = datos.map(d => totalDe(d, 'main', key));
      tot += `<td class="pl-delta">${pct ? '' : delta(tots[0], tots[tots.length - 1], key)}</td><td class="pl-spark">${pct ? '' : spark(tots, key)}</td></tr>`;
      return html + tot;
    }

    const ingHtml = seccion('ingresos', t('section.revenue', 'Ingresos'));
    const gasHtml = seccion('gastos', t('section.expenses', 'Gastos'));

    // Filas de abajo (Intereses netos, Impuestos…): la unión; "Intereses netos" siempre, las demás si
    // algún año tiene un valor distinto de cero (misma regla que la tabla de un año, Versiones 60 y 61).
    const extraLabels = [];
    datos.forEach(d => (d.rep.extraRows || []).forEach(e => { if(!extraLabels.includes(e.label)) extraLabels.push(e.label); }));
    let extraHtml = '';
    extraLabels.forEach(label => {
      const filas = datos.map(d => filaDe(d.rep.extraRows, label));
      if(!filas.some((r, i) => r && val(datos[i], 'main', r.value) !== 0) && label !== 'Intereses netos') return;
      let h = `<tr><td>${tLabel(label)}</td>`;
      cols.forEach(c => {
        if(c.gap){ h += '<td class="pl-gap"></td>'; return; }
        if(c.src !== 'main'){ h += `<td${cls(c)}>—</td>`; return; }
        const r = filas[datos.indexOf(c.d)];
        h += `<td${cls(c)}>${!r ? '—' : pct ? fmtPct(comoPct(val(c.d, 'main', r.value), totalDe(c.d, 'main', 'ingresos'))) : fmtDisplay(val(c.d, 'main', r.value))}</td>`;
      });
      extraHtml += h + '<td class="pl-delta"></td><td class="pl-spark"></td></tr>';
    });

    // Resultado neto (en "% del total": margen sobre ingresos)
    const resultados = datos.map(d => resultadoDe(d, 'main'));
    let res = `<tr class="pl-bold pl-highlight"><td>${tLabel(ultimo.rep.resultLabel || 'Resultado neto')}${pct ? ' <small>(' + esc(t('pl.multi.margin', '% de los ingresos')) + ')</small>' : ''}</td>`;
    cols.forEach(c => {
      if(c.gap){ res += '<td class="pl-gap"></td>'; return; }
      if(c.src === 'dev'){ res += `<td${cls(c)}>${pct ? '—' : desvio(resultadoDe(c.d, 'main'), resultadoDe(c.d, 'ov'), 'resultado')}</td>`; return; }
      const v = resultadoDe(c.d, c.src);
      res += `<td${cls(c)}>${v == null ? t('stat.nodata', 'Sin dato') : pct ? fmtPct(comoPct(v, totalDe(c.d, c.src, 'ingresos'))) : fmtDisplay(v)}</td>`;
    });
    res += `<td class="pl-delta"></td><td class="pl-spark">${pct ? '' : spark(resultados, 'resultado')}</td></tr>`;

    // Encabezado
    const sub = c => c.src === 'ov' ? t('finanzas.card.budget', 'Presupuesto')
      : c.src === 'dev' ? t('pl.multi.dev', 'desvío')
      : c.d.presu ? t('finanzas.card.budget', 'Presupuesto')
      : (c.d.ov && !abrir) ? t('pl.multi.balPlus', 'Balance + presup.')
      : t('finanzas.card.balance', 'Balance');
    let head = `<tr><th>${t('th.line', 'Rubro')}<small>${pct ? esc(t('pl.multi.pctUnit', '% del total')) : 'M ' + esc(currentCurrency)}</small></th>`;
    cols.forEach(c => {
      head += c.gap ? `<th class="pl-gap" title="${esc(t('pl.multi.gap', 'Años sin elegir en el medio'))}">…</th>`
        : `<th${cls(c)}>${lab(c.d.y)}<small>${sub(c)}</small></th>`;
    });
    head += `<th class="pl-delta">Δ ${lab(primero.y)}→${lab(ultimo.y)}</th><th class="pl-spark">${t('pl.multi.trend', 'Tendencia')}</th></tr>`;

    const sp = `<tr class="pl-spacer"><td colspan="${N}"></td></tr>`;
    const tabla = document.getElementById(tableId);
    tabla.querySelector('thead').innerHTML = head;
    tabla.querySelector('tbody').innerHTML = ingHtml + sp + gasHtml + (extraHtml ? sp + extraHtml : '') + sp + res;

    // Abrir / cerrar un rubro
    tabla.querySelectorAll('tr.pl-row-open').forEach(tr => {
      const toggle = () => {
        const id = tr.dataset.id;
        estado.abiertos.has(id) ? estado.abiertos.delete(id) : estado.abiertos.add(id);
        render(estado.club, estado.years, estado.tableId);
      };
      tr.addEventListener('click', e => { if(!e.target.closest('.pl-incluido')) toggle(); });
      tr.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } });
    });
    // Gráficos de los rubros abiertos
    tabla.querySelectorAll('canvas[data-chart]').forEach(cv => {
      const [key, ...rest] = cv.dataset.chart.split('|');
      const label = rest.join('|');
      graficos.push(graficoRubro(cv, key, label, datos, lab, pct, abrir));
    });

    renderControles(hayPB);
  }

  // El gráfico de un rubro: una línea con lo que manda cada año (en gastos, el tamaño), punto hueco
  // y tramo punteado donde es presupuesto o hay años sin elegir; con "presupuesto al lado", los
  // presupuestos de los años que tienen las dos fuentes como puntos huecos.
  function graficoRubro(canvas, key, label, datos, lab, pct, abrir){
    const color = key === 'gastos' ? '#b5372b' : '#0a2b5c';
    const absG = v => v == null ? null : (key === 'gastos' ? Math.abs(v) : v);
    const valDe = (d, src) => {
      const rep = src === 'ov' ? d.ov : d.rep;
      if(!rep) return null;
      const r = filaDe(rep[key], label);
      if(!r || r.unknown || r.incluidoEn) return null;
      if(key === 'gastos' && src === 'main' && d.sinGastos) return null;
      const v = nativeDisplayVal(r.value, src === 'ov' ? d.ovMeta : d.meta, currentCurrency);
      if(!pct) return absG(v);
      const tot = (rep[key] || []).reduce((s, x) => s + nativeDisplayVal(x.value, src === 'ov' ? d.ovMeta : d.meta, currentCurrency), 0);
      return tot ? v / tot * 100 : null;
    };
    const serie = datos.map(d => valDe(d, 'main'));
    const sets = [{
      label: tLabel(label),
      data: serie,
      borderColor: color, backgroundColor: color, borderWidth: 2.2, tension: 0, spanGaps: true,
      pointRadius: 4, pointBorderWidth: 1.8,
      pointBackgroundColor: datos.map(d => d.presu ? '#fff' : color),
      segment: { borderDash: ctx => {
        const a = datos[ctx.p0DataIndex], b = datos[ctx.p1DataIndex];
        return (b.y - a.y > 1 || a.presu || b.presu) ? [5, 4] : undefined;
      } },
    }];
    if(abrir && datos.some(d => d.ov)){
      sets.push({
        label: t('finanzas.card.budget', 'Presupuesto'),
        data: datos.map(d => d.ov ? valDe(d, 'ov') : null),
        showLine: false, borderColor: color, backgroundColor: '#fff', pointRadius: 4, pointBorderWidth: 1.8, pointStyle: 'circle',
      });
    }
    const unidad = pct ? '%' : 'M ' + currentCurrency;
    return new Chart(canvas, {
      type: 'line',
      data: { labels: datos.map(d => lab(d.y)), datasets: sets },
      options: {
        responsive: true, maintainAspectRatio: false, animation: false,
        plugins: {
          legend: { display: sets.length > 1, labels: { usePointStyle: true, boxHeight: 6 } },
          tooltip: { callbacks: { label: c => c.dataset.label + (datos[c.dataIndex].presu && c.datasetIndex === 0 ? ' (' + t('finanzas.card.budget', 'Presupuesto') + ')' : '') + ': ' + (c.parsed.y == null ? '—' : c.parsed.y.toFixed(pct ? 0 : 1) + ' ' + unidad) } },
        },
        scales: { y: { beginAtZero: true, ticks: { callback: v => pct ? v + '%' : v } }, x: { grid: { display: false } } },
      },
    });
  }

  // Controles de la tabla multi-año: "M USD | % del total" y "Presupuesto al lado del balance" (este
  // último solo si algún año elegido tiene las dos fuentes).
  function renderControles(hayPB){
    const caja = document.getElementById('plMultiCtrls');
    if(!caja) return;
    caja.hidden = false;
    caja.innerHTML = '';
    const hint = document.createElement('span');
    hint.className = 'pl-multi-hint';
    hint.textContent = t('pl.multi.hint', 'Tocá un rubro para ver cómo cambió año a año.');
    caja.appendChild(hint);
    const derecha = document.createElement('span');
    derecha.className = 'pl-multi-right';
    if(hayPB){
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pl-multi-bud' + (estado.conPresu ? ' on' : '');
      b.setAttribute('aria-pressed', estado.conPresu ? 'true' : 'false');
      b.textContent = t('pl.multi.budSide', 'Presupuesto al lado del balance');
      b.onclick = () => { estado.conPresu = !estado.conPresu; render(estado.club, estado.years, estado.tableId); };
      derecha.appendChild(b);
    }
    const seg = document.createElement('div');
    seg.className = 'segmented';
    [['abs', 'M ' + currentCurrency], ['pct', t('pl.multi.pctUnit', '% del total')]].forEach(([u, txt]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = txt;
      if(estado.unidad === u) b.className = 'active';
      b.onclick = () => { estado.unidad = u; render(estado.club, estado.years, estado.tableId); };
      seg.appendChild(b);
    });
    derecha.appendChild(seg);
    caja.appendChild(derecha);
  }

  function ocultar(){
    graficos.forEach(g => g.destroy()); graficos = [];
    const caja = document.getElementById('plMultiCtrls');
    if(caja) caja.hidden = true;
  }

  return { render, ocultar };
})();
window.FIN_MULTI_PL = FIN_MULTI_PL;

// Nombre que usa js/finanzas-render.js desde el paso 5a.
function renderMultiPLTable(clubId, years, tableId){ FIN_MULTI_PL.render(clubId, years, tableId); }


// ============================================================================
// LOS KPIs DE ARRIBA EN MODO MULTI-AÑO (to-do 147, paso 6).
//
// renderFinanzasStatsGeneric() (js/finanzas-render.js) sigue armando los 5 cards con el ejercicio más
// nuevo elegido, y con los totales de la tabla de un año: el número grande no cambia. Esto les agrega:
//   - de qué ejercicio es cada número ("Ingresos · 2024/25");
//   - con más de un ejercicio elegido, la comparación contra el primero ("vs. 2020/21 +10%") y una
//     sparkline con todos los elegidos. Ingresos y gastos en %; resultado y deuda neta en plata, porque
//     pueden cambiar de signo y un % ahí no significa nada (mismo criterio que el desvío del paso 5b);
//   - si el más nuevo es SOLO presupuesto, los cards van punteados con "Presupuesto", y la deuda neta
//     en "—": un presupuesto no informa deuda.
// Los totales por año salen igual que en la tabla multi-año (nativeReportFor + nativeDisplayVal con el
// tipo de cambio de cada ejercicio), y la deuda de computeYearGeneric, con el mismo test de "no
// desglosada" que el card de un año (deudaNoDesglosada).
// ============================================================================
const FIN_MULTI_KPIS = (function(){
  const BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
  function t(k, es){ return (window.I18N && I18N.t) ? I18N.t(k, es) : es; }

  function delAnio(clubId, y){
    const meta = yearMetaFor(clubId, y);
    const rep = nativeReportFor(clubId, y);
    const c = computeYearGeneric(clubId, y);
    const v = x => nativeDisplayVal(x, meta, currentCurrency);
    const presu = !BAL[reportTypeForYear(clubId, y)];
    const sinGastos = !!c && !(c.expenseLines || []).length && (c.meta || {}).officialTotalExpenses == null && !c.expenses && !c.nonCash;
    const ing = (rep.ingresos || []).reduce((s, r) => s + v(r.value), 0);
    const gas = sinGastos ? null : (rep.gastos || []).reduce((s, r) => s + v(r.value), 0);
    const extra = (rep.extraRows || []).reduce((s, e) => s + v(e.value), 0);
    const pat = gas == null ? null : ing + gas + extra;
    const nd = (presu || !c || deudaNoDesglosada(c)) ? null : toDisplayValue(c.netDebt, meta, currentCurrency);
    return { y, presu, ing, gas: gas == null ? null : Math.abs(gas), pat, nd };
  }

  function spark(vals, ys, color){
    const pts = vals.map((v, i) => v == null ? null : { i, v }).filter(Boolean);
    if(pts.length < 2) return '';
    const W = 64, H = 20, n = vals.length;
    const mn = Math.min(...pts.map(p => p.v)), mx = Math.max(...pts.map(p => p.v)), r = (mx - mn) || 1;
    const x = i => 3 + i * (W - 6) / (n - 1), y = v => H - 3 - (v - mn) / r * (H - 6);
    let s = '';
    for(let k = 1; k < pts.length; k++){
      const a = pts[k - 1], b = pts[k];
      const punteado = ys[b.i].y - ys[a.i].y > 1 || ys[a.i].presu || ys[b.i].presu;
      s += `<line x1="${x(a.i).toFixed(1)}" y1="${y(a.v).toFixed(1)}" x2="${x(b.i).toFixed(1)}" y2="${y(b.v).toFixed(1)}" stroke="${color}" stroke-width="1.5"${punteado ? ' stroke-dasharray="2 2"' : ''}/>`;
    }
    const l = pts[pts.length - 1];
    s += `<circle cx="${x(l.i).toFixed(1)}" cy="${y(l.v).toFixed(1)}" r="2.3" fill="${ys[l.i].presu ? '#fff' : color}" stroke="${color}" stroke-width="1.2"/>`;
    return `<svg width="${W}" height="${H}" aria-hidden="true">${s}</svg>`;
  }

  function render(clubId, years){
    const caja = document.getElementById('finanzasStats');
    if(!caja || !years.length) return;
    const cal = clubs[clubId] && clubs[clubId].fiscalYearStart === '01-01';
    const lab = y => cal ? String(y) : (y - 1) + '/' + String(y).slice(2);
    const datos = years.map(y => delAnio(clubId, y));
    const ultimo = datos[datos.length - 1];
    const multi = datos.length > 1;

    caja.querySelectorAll('.stat').forEach(st => {
      const k = st.dataset.k;
      st.classList.toggle('stat-presu', ultimo.presu);
      const etiqueta = st.querySelector('.label');
      if(etiqueta && !etiqueta.querySelector('.stat-year')){
        etiqueta.insertAdjacentHTML('beforeend', ` <span class="stat-year">· ${lab(ultimo.y)}</span>` +
          (ultimo.presu ? ` <span class="stat-tag">${t('finanzas.card.budget', 'Presupuesto')}</span>` : ''));
      }
      if(k === 'nd' && ultimo.presu){
        const v = st.querySelector('.value');
        v.textContent = '—';
        v.className = 'value nodato';
        st.insertAdjacentHTML('beforeend', `<div class="stat-cmp"><span>${t('stat.multi.noDebt', 'Un presupuesto no informa deuda')}</span></div>`);
        return;
      }
      if(!multi || !['ing', 'gas', 'pat', 'nd'].includes(k)) return;
      const serie = datos.map(d => d[k]);
      const i0 = serie.findIndex(v => v != null);
      const v0 = i0 >= 0 ? serie[i0] : null;
      const v1 = serie[serie.length - 1];
      let cmp = '';
      if(v0 != null && v1 != null && i0 < serie.length - 1){
        const desde = lab(datos[i0].y);
        if(k === 'ing' || k === 'gas'){
          if(v0){
            const p = (v1 - v0) / Math.abs(v0) * 100;
            const bueno = k === 'ing' ? p > 0 : p < 0;
            cmp = `vs. ${desde} <b class="${Math.round(p) === 0 ? '' : bueno ? 'pos' : 'neg'}">${p > 0 ? '+' : ''}${p.toFixed(0)}%</b>`;
          }
        } else {
          const dif = v1 - v0;
          const bueno = k === 'pat' ? dif > 0 : dif < 0;
          cmp = `vs. ${desde} <b class="${Math.abs(dif) < 0.05 ? '' : bueno ? 'pos' : 'neg'}">${dif > 0 ? '+' : dif < 0 ? '−' : ''}${Math.abs(dif).toFixed(1)} M</b>`;
        }
      }
      const color = k === 'gas' ? '#b5372b' : k === 'pat' ? '#1b7a3d' : '#0a2b5c';
      st.insertAdjacentHTML('beforeend', `<div class="stat-cmp"><span>${cmp}</span>${spark(serie, datos, color)}</div>`);
    });
  }

  return { render };
})();
window.FIN_MULTI_KPIS = FIN_MULTI_KPIS;

// ============================================================================
// js/finanzas-anios.js — los cards de ejercicios de Finanzas (to-do 147, paso 4).
//
// Reemplazan al dropdown "Año": un card por ejercicio, cada uno se prende y se apaga solo
// (sin rangos), y escriben la selección en FIN_SEL (js/finanzas-render.js). Decisiones de
// Guido, todas en el to-do 147 y en Prototyping/Finanzas/mockup-147.html:
//   - Default y al cambiar de club: los últimos 5 ejercicios CON BALANCE.
//   - Atajos: Últimos 5, Todos (tocarlo de nuevo saca todos → estado vacío), Solo el último.
//   - Cada card dice qué documento hay: Balance, Presupuesto, Presupuesto y Balance. Un año sin
//     nada entre el primero y el último cargado aparece rayado, "Sin publicar", y no se elige:
//     así se ve el hueco.
//   - Con más de 5 ejercicios la fila arranca corta (los últimos 5 balances + lo elegido, que
//     nunca queda escondido) y "+N más", al principio de la misma fila, abre el resto.
//   - Más viejo a la izquierda.
//
// ES EL DEFAULT desde la Versión 542 (pasos 4 a 10 terminados; hasta ahí vivía detrás de `?multi=1`).
// `?multi=0` vuelve a la vista vieja de un ejercicio con el dropdown "Año": queda como salida de
// emergencia y para comparar, no es algo que vea un visitante. El código de esa vista sigue entero
// (renderNativePLTable, renderDebtBlockGeneric, la sección "Gráficos"): la vista multi-año lo usa
// escondido para los totales de los KPIs, así que no se puede borrar.
// ============================================================================

window.FIN_MULTI = !/[?&]multi=0(&|$)/.test(location.search);
// La clase esconde el dropdown "Año" por CSS: hay 3 lugares de index.html que le ponen display:inline.
if(window.FIN_MULTI) document.documentElement.classList.add('fin-multi');

const FIN_ANIOS = (function(){
  const BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
  const PRE = { official_budget:1, official_budget_and_balance:1 };
  let clubDeLaSeleccion = null;   // para saber si populate() viene de un cambio de club o de idioma
  let expandido = false;

  // Los ejercicios de la fila: los que tiene el club en fiscalYearMeta (o finanzasYears) más los
  // años vacíos ENTRE el primero y el último, que salen como "Sin publicar".
  function ejercicios(clubId){
    const gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    if(!gd) return [];
    const meta = gd.fiscalYearMeta || {};
    const cargados = (gd.finanzasYears || Object.keys(meta).map(Number)).filter(y => {
      const rt = reportTypeForYear(clubId, y);
      return BAL[rt] || PRE[rt];
    });
    if(!cargados.length) return [];
    const desde = Math.min(...cargados), hasta = Math.max(...cargados);
    const out = [];
    for(let y = desde; y <= hasta; y++){
      const rt = cargados.includes(y) ? reportTypeForYear(clubId, y) : null;
      out.push({ y, tipo: !rt ? 'X' : (BAL[rt] && PRE[rt]) ? 'PB' : BAL[rt] ? 'B' : 'P' });
    }
    return out;
  }
  function ultimosConBalance(lista, n){
    return lista.filter(e => e.tipo === 'B' || e.tipo === 'PB').slice(-n).map(e => e.y);
  }
  function etiqueta(clubId, y){
    const cal = clubs[clubId] && clubs[clubId].fiscalYearStart === '01-01';
    return cal ? String(y) : String(y - 1).slice(2) + '/' + String(y).slice(2);
  }
  function tipoTexto(tipo){
    return tipo === 'B' ? t('finanzas.card.balance', 'Balance')
      : tipo === 'P' ? t('finanzas.card.budget', 'Presupuesto')
      : tipo === 'PB' ? t('finanzas.card.both', 'Presupuesto y Balance')
      : t('finanzas.card.unpublished', 'Sin publicar');
  }

  // Lo llama populateFinanzasSelectors(): con un club nuevo, la selección vuelve al default; con
  // el mismo club (cambio de idioma, de moneda), se conserva lo que siga existiendo.
  function alCargarClub(clubId){
    const lista = ejercicios(clubId);
    if(clubId !== clubDeLaSeleccion){
      clubDeLaSeleccion = clubId;
      expandido = false;
      FIN_SEL.set(ultimosConBalance(lista, 5));
      // Las gestiones del país llegan aparte (paso 12): cuando están, se vuelve a dibujar.
      if(window.FIN_GESTION) FIN_GESTION.cargar(clubId).then(() => {
        if(clubDeLaSeleccion === clubId && window.CLUB_GESTIONES && window.CLUB_GESTIONES[clubId]) refreshFinanzas();
      });
    } else {
      const validos = lista.filter(e => e.tipo !== 'X').map(e => e.y);
      FIN_SEL.set(FIN_SEL.years().filter(y => validos.includes(y)));
    }
  }

  function cambiar(nuevos){
    FIN_SEL.set(nuevos);
    refreshFinanzas();
  }

  function render(clubId){
    const caja = document.getElementById('finYears');
    if(!caja) return;
    const sec = document.getElementById('finanzas');
    const lista = ejercicios(clubId);
    caja.hidden = !lista.length;
    if(sec) sec.classList.toggle('sin-anio', !!lista.length && !FIN_SEL.years().length);
    if(!lista.length) return;

    const elegibles = lista.filter(e => e.tipo !== 'X').map(e => e.y);
    const l5 = ultimosConBalance(lista, 5);
    const sel = FIN_SEL.years();
    const n = sel.length;
    const todos = n === elegibles.length;

    // Atajos
    const atajos = caja.querySelector('.fin-years-presets');
    atajos.querySelectorAll('button').forEach(b => {
      const p = b.dataset.p;
      b.classList.toggle('on',
        (p === '5' && n === l5.length && l5.every(y => FIN_SEL.has(y))) ||
        (p === 'all' && todos) ||
        (p === '1' && n === 1 && FIN_SEL.has(l5[l5.length - 1])));
      b.onclick = () => {
        if(p === 'all'){ expandido = !todos; cambiar(todos ? [] : elegibles); }
        else cambiar(p === '5' ? l5 : l5.slice(-1));
      };
    });

    // Cards
    const fila = caja.querySelector('.fin-years-row');
    fila.innerHTML = '';
    const muchos = lista.length > 5;
    const visibles = (!muchos || expandido) ? lista : lista.filter(e => l5.includes(e.y) || FIN_SEL.has(e.y));
    if(muchos){
      const mas = document.createElement('button');
      mas.type = 'button';
      mas.className = 'fin-years-more';
      const ocultos = lista.length - visibles.length;
      mas.textContent = expandido ? t('finanzas.card.less', 'Ver menos') : '+' + ocultos + ' ' + t('finanzas.card.more', 'más');
      mas.onclick = () => { expandido = !expandido; render(clubId); };
      fila.appendChild(mas);
    }
    visibles.forEach(e => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'fin-year' + (FIN_SEL.has(e.y) ? ' on' : '') + (e.tipo === 'P' ? ' presu' : '') + (e.tipo === 'X' ? ' sinpub' : '');
      b.innerHTML = '<b></b><span></span>';
      b.querySelector('b').textContent = etiqueta(clubId, e.y);
      b.querySelector('span').textContent = tipoTexto(e.tipo);
      if(e.tipo === 'X'){
        b.disabled = true;
        b.title = t('finanzas.card.unpublishedTip', 'El club todavía no publicó este ejercicio, o no lo conseguimos');
      } else {
        b.setAttribute('aria-pressed', FIN_SEL.has(e.y) ? 'true' : 'false');
        b.onclick = () => cambiar(FIN_SEL.has(e.y) ? sel.filter(y => y !== e.y) : sel.concat(e.y));
      }
      fila.appendChild(b);
    });
    // En celular la fila se scrollea de costado: que arranque mostrando lo más nuevo.
    fila.scrollLeft = fila.scrollWidth;

    const vacio = caja.querySelector('.fin-years-empty');
    vacio.hidden = n !== 0;
  }

  return { alCargarClub, render, ejercicios };
})();
window.FIN_ANIOS = FIN_ANIOS;


// ============================================================================
// GESTIÓN (to-do 147, paso 12). Lee data/gestiones/<país>.js (formato y regla de ejercicios: ver el
// encabezado de ese archivo) y arma la fila "Gestión" de los cards: un botón por gestión CONFIRMADA
// que tenga algún ejercicio cargado, de la más vieja a la más nueva. Tocar uno SUMA sus ejercicios a
// los elegidos y tocarlo de nuevo los saca (se pueden prender dos para compararlas); un botón se ve
// prendido cuando todos sus ejercicios están elegidos. Con más de 4, se ven las 3 más nuevas (más la
// prendida) y "+N más" a la izquierda. `deAnio()` lo usan el gráfico (franjas) y la tabla (columnas
// agrupadas por presidente), en js/finanzas-multi.js.
// ============================================================================
const FIN_GESTION = (function(){
  // Países con archivo en data/gestiones/. Uno nuevo se suma acá (tools/audit.js lo controla).
  const PAISES = ['ar', 'br', 'gb', 'cl', 'co', 'de', 'be', 'dk', 'hr', 'es', 'it'];
  const pedidos = {};
  let todas = false, clubDeTodas = null;

  function cargar(clubId){
    const pais = ((clubs[clubId] || {}).country || '').toLowerCase();
    if(!PAISES.includes(pais)) return Promise.resolve();
    if(!pedidos[pais]) pedidos[pais] = new Promise(res => {
      const s = document.createElement('script');
      s.src = 'data/gestiones/' + pais + '.js' + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
      s.onload = res; s.onerror = () => { console.error('[gestiones] no cargó data/gestiones/' + pais + '.js'); res(); };
      document.head.appendChild(s);
    });
    return pedidos[pais];
  }
  // La fecha de cierre del ejercicio `y`: el día anterior al arranque del ejercicio siguiente.
  function cierre(clubId, y){
    const ini = (clubs[clubId] || {}).fiscalYearStart || '07-01';
    if(ini === '01-01') return y + '-12-31';
    const d = new Date(Date.UTC(y, Number(ini.slice(0, 2)) - 1, Number(ini.slice(3, 5))));
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
  }
  // Las gestiones confirmadas del club, cada una con sus ejercicios cargados (no "Sin publicar").
  function deClub(clubId){
    const lista = ((window.CLUB_GESTIONES || {})[clubId] || []).filter(g => g.confirmada);
    const ys = FIN_ANIOS.ejercicios(clubId).filter(e => e.tipo !== 'X').map(e => e.y);
    return lista.slice().sort((a, b) => a.desde < b.desde ? -1 : 1).map(g => ({
      ...g,
      anios: ys.filter(y => (g.firmo || []).includes(y) || (!lista.some(o => o !== g && (o.firmo || []).includes(y))
        && g.desde <= cierre(clubId, y) && (g.hasta == null || cierre(clubId, y) < g.hasta))),
    }));
  }
  function deAnio(clubId, y){ return deClub(clubId).find(g => g.anios.includes(y)) || null; }

  function render(clubId){
    const caja = document.getElementById('finGest');
    if(!caja) return;
    if(clubId !== clubDeTodas){ clubDeTodas = clubId; todas = false; }
    const gs = deClub(clubId).filter(g => g.anios.length);
    caja.hidden = !gs.length;
    caja.innerHTML = '';
    if(!gs.length) return;
    const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
    const sel = FIN_SEL.years();
    const prendida = g => g.anios.every(y => sel.includes(y));
    const visibles = (gs.length <= 4 || todas) ? gs : gs.filter((g, i) => i >= gs.length - 3 || prendida(g));
    const lbl = document.createElement('span');
    lbl.className = 'fin-years-lbl';
    lbl.textContent = t('finanzas.gest.label', 'Gestión');
    caja.appendChild(lbl);
    if(gs.length > 4){
      const mas = document.createElement('button');
      mas.type = 'button';
      mas.className = 'fin-years-more';
      mas.textContent = todas ? t('finanzas.gest.less', 'menos') : '+' + (gs.length - visibles.length) + ' ' + t('finanzas.card.more', 'más');
      mas.onclick = () => { todas = !todas; render(clubId); };
      caja.appendChild(mas);
    }
    visibles.forEach(g => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'fin-gest' + (prendida(g) ? ' on' : '');
      b.setAttribute('aria-pressed', prendida(g) ? 'true' : 'false');
      b.title = g.nombre + ' · ' + g.cargo;
      b.innerHTML = '<span></span><small></small>';
      b.querySelector('span').textContent = g.corto;
      b.querySelector('small').textContent = g.desde.slice(0, 4) + '–' + (g.hasta ? g.hasta.slice(0, 4) : t('finanzas.gest.today', 'hoy'));
      b.onclick = () => {
        const on = prendida(g);
        const nuevos = on ? sel.filter(y => !g.anios.includes(y)) : [...new Set(sel.concat(g.anios))];
        FIN_SEL.set(nuevos);
        refreshFinanzas();
      };
      caja.appendChild(b);
    });
  }

  return { cargar, deClub, deAnio, render, cierre };
})();
window.FIN_GESTION = FIN_GESTION;

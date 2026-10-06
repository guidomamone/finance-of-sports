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
// DETRÁS DE `?multi=1` mientras la tabla, los KPIs y los gráficos sigan mostrando UN ejercicio
// (pasos 5 a 9): sin el parámetro el sitio sigue con el dropdown y este archivo no hace nada.
// Con varios elegidos, la página muestra por ahora el más nuevo (FIN_SEL.primary()).
// ============================================================================

window.FIN_MULTI = /[?&]multi=1(&|$)/.test(location.search);
// La clase esconde el dropdown "Año" por CSS: hay 3 lugares de index.html que le ponen display:inline.
if(window.FIN_MULTI) document.documentElement.classList.add('fin-multi');

const FIN_ANIOS = (function(){
  const BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
  const PRE = { official_budget:1, official_budget_and_balance:1 };
  let clubDeLaSeleccion = null;   // para saber si populate() viene de un cambio de club o de idioma
  let expandido = false;

  function tt(k, es){ return (window.I18N && I18N.t) ? I18N.t(k, es) : es; }

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
  function tipoTexto(t){
    return t === 'B' ? tt('finanzas.card.balance', 'Balance')
      : t === 'P' ? tt('finanzas.card.budget', 'Presupuesto')
      : t === 'PB' ? tt('finanzas.card.both', 'Presupuesto y Balance')
      : tt('finanzas.card.unpublished', 'Sin publicar');
  }

  // Lo llama populateFinanzasSelectors(): con un club nuevo, la selección vuelve al default; con
  // el mismo club (cambio de idioma, de moneda), se conserva lo que siga existiendo.
  function alCargarClub(clubId){
    const lista = ejercicios(clubId);
    if(clubId !== clubDeLaSeleccion){
      clubDeLaSeleccion = clubId;
      expandido = false;
      FIN_SEL.set(ultimosConBalance(lista, 5));
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
      mas.textContent = expandido ? tt('finanzas.card.less', 'Ver menos') : '+' + ocultos + ' ' + tt('finanzas.card.more', 'más');
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
        b.title = tt('finanzas.card.unpublishedTip', 'El club todavía no publicó este ejercicio, o no lo conseguimos');
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

  return { alCargarClub, render };
})();
window.FIN_ANIOS = FIN_ANIOS;

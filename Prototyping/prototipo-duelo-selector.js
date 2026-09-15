// ============================================================================
// prototipo-duelo-selector.js — PROTOTIPO 3: dos columnas, A contra B.
//
// ESTO NO ES EL SITIO. Lo carga solo `Prototyping/prototipo-duelo.html`.
// Los prototipos 1 y 2 quedan como están: son tres formas distintas de resolver
// la misma pantalla, para comparar.
//
// DE DÓNDE SALE (Guido, después de probar el prototipo 2 a mano): "quiero probar
// un nuevo prototipo en el cual haya dos columnas en el buscador, y sea tipo
// 'Equipo A' vs 'Equipo B'. De esa manera no hace falta pensar tantas casuísticas
// derivadas de hacer que el usuario pase por el selector dos veces".
//
// LA IDEA, Y POR QUÉ ES MÁS SIMPLE QUE EL PROTOTIPO 2: en el de pasos, comparar
// era "elegí, terminá, y ahora volvé a empezar para el rival". Eso obligaba a
// inventar respuestas para un montón de preguntas que nadie quería contestar
// (¿el paso 7 vuelve a aparecer?, ¿qué significa "otra cosa"?, ¿en qué momento se
// cierra un lado?). Con las dos columnas a la vista, la comparación no es un
// estado en el que entrás y salís: es la pantalla.
//
// EL TOGGLE DE ARRIBA es la otra mitad: la mayoría de las visitas quiere UN club,
// no una comparación, y no tiene por qué pagar el costo de una pantalla partida
// al medio. "Ver un equipo" esconde la columna B entera.
//
// QUÉ COMPARTE CON EL PROTOTIPO 2, a propósito:
//   - los datos INVENTADOS (`prototipo-pasos-datos-inventados.js`), así se puede
//     probar con 10 ejercicios por club en vez de con uno;
//   - la forma de sumar un conjunto: los números salen de `computeYearGeneric()`,
//     el motor real, sumando club-ejercicio por club-ejercicio, y se dice siempre
//     cuántos sostienen cada indicador.
//
// La API pública es la MISMA que la de `js/selector.js`, porque `index.html` y
// `js/comparar-clubes.js` la llaman sin saber cuál está cargada.
// ============================================================================

window.CLUB_SELECTOR = (function(){
  'use strict';

  var LS_CLUB = 'fos_club';
  var LETRAS = ['A', 'B'];

  // Un LADO es lo que ocupa una columna. Tres formas posibles, y las tres terminan
  // siendo una lista de pares (club, ejercicio) a la hora de calcular:
  //   { tipo:'club',  id:'boca',        anio:2025 }
  //   { tipo:'liga',  id:'ar-primera',  anio:2025, modo:'promedio'|'total' }
  //   null  (columna vacía)
  var lado = [null, null];
  var modo = 'duelo';          // 'duelo' | 'uno'
  var pestana = ['clubes', 'clubes'];
  var busca = ['', ''];
  var inited = false;

  var api = {
    getClub: function(){ return null; },
    pickClub: function(){ return Promise.resolve(); }
  };

  function $(id){ return document.getElementById(id); }
  function idx(id){ return (window.CLUB_INDEX || {})[id] || {}; }
  function nameOf(id){ return (clubs[id] && clubs[id].displayName) || idx(id).n || id; }
  function countryOf(id){ return (clubs[id] && clubs[id].country) || idx(id).c; }
  function ligasDe(id){ return window.leaguesOfClub(id).map(function(l){ return l.league; }); }
  function yearsOf(id){
    return (idx(id).yrs || []).filter(function(par){
      return par[1] !== 'placeholder' && par[1] !== 'pending_official';
    });
  }
  function initials(name){
    var w = String(name || '').replace(/[^A-Za-zÀ-ÿ ]/g, '').split(/\s+/).filter(Boolean);
    return (w.slice(0, 2).map(function(x){ return x[0]; }).join('') || '··').toUpperCase();
  }
  function norm(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function marcaFalsa(clubId, year){
    return (window.FOS_DUMMY && window.FOS_DUMMY.esDummy(clubId, year)) ? ' · INVENTADO' : '';
  }
  function labelAnio(clubId, year){
    var par = yearsOf(clubId).filter(function(p){ return p[0] === year; })[0];
    if(!par || !window.ejercicioLabel) return String(year);
    return window.ejercicioLabel(year, par[1], clubId) + marcaFalsa(clubId, year);
  }
  function el(tag, cls, txt){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(txt != null) e.textContent = txt;
    return e;
  }

  function clubesOrdenados(){
    return Object.keys(window.CLUB_INDEX || {}).filter(function(id){ return !!clubs[id]; })
      .sort(function(a, b){ return nameOf(a).localeCompare(nameOf(b), 'es', { sensitivity:'base' }); });
  }
  function ligasConClubes(){
    return Object.keys(window.LEAGUES).filter(function(lid){
      return window.clubsOfLeague(lid).some(function(id){ return !!clubs[id]; });
    }).sort(function(a, b){
      return window.LEAGUES[a].name.localeCompare(window.LEAGUES[b].name, 'es');
    });
  }

  // ---------------------------------------------------------------------------
  // CÁLCULO. Un lado se convierte en pares (club, ejercicio) y de ahí en totales.
  // Los números salen del motor real; acá solo se suman y se cuenta quién aporta.
  // ---------------------------------------------------------------------------
  var INDICADORES = [
    { key:'revenue',  label:'Ingresos' },
    { key:'expenses', label:'Gastos' },
    { key:'pat',      label:'Resultado del ejercicio', signo:true },
    { key:'netDebt',  label:'Deuda neta', signo:true }
  ];

  function paresDe(l){
    if(!l) return [];
    if(l.tipo === 'club') return [[l.id, l.anio || (yearsOf(l.id)[0] || [])[0]]];
    return window.clubsOfLeague(l.id).filter(function(id){ return !!clubs[id]; })
      .map(function(id){ return [id, l.anio || (yearsOf(id)[0] || [])[0]]; });
  }

  function nombreDe(l){
    if(!l) return '';
    if(l.tipo === 'club') return nameOf(l.id);
    return (l.modo === 'promedio' ? 'Promedio de ' : 'Total de ') + window.LEAGUES[l.id].name;
  }

  function numerosDe(id, year){
    var c = window.computeYearGeneric(id, year);
    if(!c) return null;
    var meta = window.yearMetaFor(id, year);
    var usd = function(v){ return window.toDisplayValue(v, meta, 'USD'); };
    // Mismo test que usa el sitio para "la fuente no informa deuda ni caja": los dos
    // en null, o los dos en CERO exacto (así lo escriben los presupuestos).
    var sinDeuda = (c.meta.grossDebt == null && c.meta.cash == null)
                || (c.meta.grossDebt === 0 && c.meta.cash === 0);
    return {
      revenue: usd(c.revenue),
      expenses: Math.abs(usd(c.expenses + c.nonCash)),
      pat: usd(c.pat),
      netDebt: sinDeuda ? null : usd(c.netDebt)
    };
  }

  function totalesDe(l){
    var pares = paresDe(l);
    var out = { nombre:nombreDe(l), modo:(l && l.modo === 'promedio') ? 'promedio' : 'total',
                n:pares.length, conDato:0, sinEjercicio:[], anios:[], presupuestos:0, tot:{}, informan:{} };
    INDICADORES.forEach(function(m){ out.tot[m.key] = 0; out.informan[m.key] = 0; });
    pares.forEach(function(par){
      var id = par[0], y = par[1];
      var tiene = y && yearsOf(id).some(function(p){ return p[0] === y; });
      if(!tiene){ out.sinEjercicio.push(nameOf(id)); return; }
      var n = numerosDe(id, y);
      if(!n){ out.sinEjercicio.push(nameOf(id)); return; }
      out.conDato++;
      out.anios.push(y);
      var tipo = (yearsOf(id).filter(function(p){ return p[0] === y; })[0] || [])[1];
      if(tipo === 'official_budget') out.presupuestos++;
      INDICADORES.forEach(function(m){
        if(n[m.key] == null) return;
        out.tot[m.key] += n[m.key];
        out.informan[m.key]++;
      });
    });
    if(out.modo === 'promedio'){
      INDICADORES.forEach(function(m){
        if(out.informan[m.key]) out.tot[m.key] = out.tot[m.key] / out.informan[m.key];
      });
    }
    return out;
  }

  function fmtM(v){
    if(v == null) return 'sin dato';
    var abs = Math.abs(v);
    var txt = abs >= 1000 ? (abs / 1000).toFixed(2) + ' MM' : abs.toFixed(1) + ' M';
    return (v < 0 ? '-' : '') + txt + ' USD';
  }
  function rangoAnios(t){
    if(!t.anios.length) return '—';
    var min = Math.min.apply(null, t.anios), max = Math.max.apply(null, t.anios);
    return min === max ? String(min) : min + '-' + max;
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  function render(){
    var wrap = $('duWrap');
    if(!wrap) return;
    wrap.innerHTML = '';
    wrap.className = 'du-wrap' + (modo === 'uno' ? ' uno' : '');

    $('duToggleDuelo').classList.toggle('on', modo === 'duelo');
    $('duToggleUno').classList.toggle('on', modo === 'uno');

    wrap.appendChild(columna(0));
    if(modo === 'duelo'){
      wrap.appendChild(el('div', 'du-vs', 'VS'));
      wrap.appendChild(columna(1));
    }
    renderPie();
    renderResultado();
  }

  function columna(i){
    var col = el('div', 'du-col' + (lado[i] ? ' con' : ''));
    var head = el('div', 'du-head');
    head.appendChild(el('span', 'du-letra', modo === 'uno' ? '★' : LETRAS[i]));
    head.appendChild(el('span', 'du-titulo', modo === 'uno' ? 'Qué querés ver' : 'Equipo ' + LETRAS[i]));
    if(lado[i]){
      var x = el('button', 'du-x', '×');
      x.type = 'button';
      x.title = 'Vaciar esta columna';
      x.addEventListener('click', function(){ lado[i] = null; render(); });
      head.appendChild(x);
    }
    col.appendChild(head);

    if(lado[i]){ col.appendChild(elegido(i)); return col; }

    // Pestañas: un club, o una liga entera.
    var tabs = el('div', 'du-tabs');
    [['clubes', 'Clubes'], ['ligas', 'Ligas enteras']].forEach(function(t){
      var b = el('button', 'du-tab' + (pestana[i] === t[0] ? ' on' : ''), t[1]);
      b.type = 'button';
      b.addEventListener('click', function(){ pestana[i] = t[0]; render(); });
      tabs.appendChild(b);
    });
    col.appendChild(tabs);

    var inp = document.createElement('input');
    inp.className = 'du-busca';
    inp.type = 'text';
    inp.placeholder = pestana[i] === 'clubes' ? 'Buscá un club o un país…' : 'Buscá una liga…';
    inp.value = busca[i];
    inp.addEventListener('input', function(){
      busca[i] = this.value;
      renderLista(i, col.querySelector('.du-lista'));
    });
    col.appendChild(inp);

    var lista = el('div', 'du-lista');
    col.appendChild(lista);
    renderLista(i, lista);
    return col;
  }

  function renderLista(i, lista){
    if(!lista) return;
    lista.innerHTML = '';
    var q = norm(busca[i]);

    if(pestana[i] === 'clubes'){
      var ids = clubesOrdenados().filter(function(id){
        if(!q) return true;
        var co = window.COUNTRIES[countryOf(id)];
        return norm(nameOf(id)).indexOf(q) >= 0 || (co && norm(co.name).indexOf(q) >= 0);
      });
      if(!ids.length) return lista.appendChild(el('p', 'du-vacio', 'Nada con ese nombre.'));
      ids.forEach(function(id){
        var co = window.COUNTRIES[countryOf(id)];
        var b = el('button', 'du-op');
        b.type = 'button';
        b.appendChild(el('span', 'du-crest', initials(nameOf(id))));
        var t = el('span', 'du-op-txt');
        t.appendChild(el('span', 'du-op-n', nameOf(id)));
        t.appendChild(el('span', 'du-op-s', (co ? co.flag + ' ' : '') + yearsOf(id).length + ' ejercicios'));
        b.appendChild(t);
        b.addEventListener('click', function(){
          lado[i] = { tipo:'club', id:id, anio:(yearsOf(id)[0] || [])[0] || null };
          busca[i] = '';
          render();
        });
        lista.appendChild(b);
      });
      return;
    }

    var ligas = ligasConClubes().filter(function(lid){
      return !q || norm(window.LEAGUES[lid].name).indexOf(q) >= 0;
    });
    if(!ligas.length) return lista.appendChild(el('p', 'du-vacio', 'Ninguna liga con ese nombre.'));
    ligas.forEach(function(lid){
      var lg = window.LEAGUES[lid];
      var co = window.COUNTRIES[lg.country];
      var n = window.clubsOfLeague(lid).filter(function(id){ return !!clubs[id]; }).length;
      var b = el('button', 'du-op');
      b.type = 'button';
      b.appendChild(el('span', 'du-op-icon', co ? co.flag : '🏆'));
      var t = el('span', 'du-op-txt');
      t.appendChild(el('span', 'du-op-n', lg.name));
      t.appendChild(el('span', 'du-op-s', n + (n === 1 ? ' club cargado' : ' clubes cargados')));
      b.appendChild(t);
      b.addEventListener('click', function(){
        lado[i] = { tipo:'liga', id:lid, anio:null, modo:'promedio' };
        busca[i] = '';
        render();
      });
      lista.appendChild(b);
    });
  }

  // La columna con algo elegido: qué es, de qué ejercicio, y (si es una liga) si se
  // mide por promedio o por total. Las dos preguntas viven al lado del sujeto, que
  // es donde el visitante las está pensando.
  function elegido(i){
    var l = lado[i];
    var caja = el('div', 'du-elegido');
    var fila = el('div', 'du-sujeto');
    fila.appendChild(el('span', 'du-crest grande', l.tipo === 'club' ? initials(nameOf(l.id)) : '🏆'));
    var t = el('span', 'du-op-txt');
    t.appendChild(el('span', 'du-sujeto-n', l.tipo === 'club' ? nameOf(l.id) : window.LEAGUES[l.id].name));
    var sub = l.tipo === 'club'
      ? ((window.COUNTRIES[countryOf(l.id)] || {}).name || '')
      : window.clubsOfLeague(l.id).filter(function(id){ return !!clubs[id]; }).length + ' clubes cargados';
    t.appendChild(el('span', 'du-op-s', sub));
    fila.appendChild(t);
    caja.appendChild(fila);

    if(l.tipo === 'liga'){
      var modos = el('div', 'du-modos');
      [['promedio', 'Promedio por club'], ['total', 'Total de la liga']].forEach(function(m){
        var b = el('button', 'du-modo' + (l.modo === m[0] ? ' on' : ''), m[1]);
        b.type = 'button';
        b.title = m[0] === 'promedio' ? 'Cómo le fue a un club típico de esa liga' : 'Todo lo que movió la liga, sumado';
        b.addEventListener('click', function(){ l.modo = m[0]; render(); });
        modos.appendChild(b);
      });
      caja.appendChild(modos);
    }

    caja.appendChild(selectorDeAnio(i));
    return caja;
  }

  function selectorDeAnio(i){
    var l = lado[i];
    var fila = el('label', 'du-anio');
    fila.appendChild(el('span', null, 'Ejercicio'));
    var sel = document.createElement('select');

    if(l.tipo === 'club'){
      yearsOf(l.id).forEach(function(par){
        var o = document.createElement('option');
        o.value = par[0];
        o.textContent = labelAnio(l.id, par[0]);
        if(par[0] === l.anio) o.selected = true;
        sel.appendChild(o);
      });
    } else {
      var o0 = document.createElement('option');
      o0.value = '';
      o0.textContent = 'El último de cada club';
      sel.appendChild(o0);
      var anios = {};
      window.clubsOfLeague(l.id).forEach(function(id){
        if(!clubs[id]) return;
        yearsOf(id).forEach(function(par){ anios[par[0]] = (anios[par[0]] || 0) + 1; });
      });
      Object.keys(anios).map(Number).sort(function(a, b){ return b - a; }).forEach(function(y){
        var o = document.createElement('option');
        o.value = y;
        // Cuántos clubes tienen ese ejercicio: se dice ANTES de elegirlo, no después.
        o.textContent = 'Cierre ' + y + ' (' + anios[y] + ' clubes)';
        if(y === l.anio) o.selected = true;
        sel.appendChild(o);
      });
    }
    sel.addEventListener('change', function(){
      l.anio = this.value ? Number(this.value) : null;
      render();
    });
    fila.appendChild(sel);
    return fila;
  }

  function renderPie(){
    var pie = $('duPie');
    pie.innerHTML = '';
    var listo = modo === 'uno' ? !!lado[0] : (!!lado[0] && !!lado[1]);
    var b = el('button', 'du-go' + (listo ? '' : ' off'),
      modo === 'uno'
        ? (lado[0] ? 'Ver ' + nombreDe(lado[0]) : 'Elegí un club o una liga')
        : (listo ? 'Comparar ' + nombreDe(lado[0]) + ' contra ' + nombreDe(lado[1])
                 : 'Elegí los dos lados para comparar'));
    b.type = 'button';
    b.disabled = !listo;
    b.addEventListener('click', aplicar);
    pie.appendChild(b);
  }

  // ---------------------------------------------------------------------------
  // RESULTADO. Una sola vista para los tres casos (club, promedio de liga, total de
  // liga), que es justamente lo que compra el modelo de dos columnas: en el
  // prototipo 2 había dos vistas distintas y había que decidir cuál correspondía.
  // ---------------------------------------------------------------------------
  var mostrando = false;

  function aplicar(){
    var ladosActivos = (modo === 'uno' ? [lado[0]] : [lado[0], lado[1]]).filter(Boolean);
    if(!ladosActivos.length) return;

    // Un club activo hace falta igual: sin él el sitio se queda en pantalla fría y
    // esconde el nav y las secciones.
    var primerClub = ladosActivos[0].tipo === 'club'
      ? ladosActivos[0].id
      : (window.clubsOfLeague(ladosActivos[0].id).filter(function(id){ return !!clubs[id]; })[0]);

    var caja = $('duResultado');
    caja.hidden = false;
    caja.innerHTML = '<p class="du-cargando">Calculando…</p>';
    mostrando = true;

    Promise.resolve(api.pickClub(primerClub)).then(function(){
      try { localStorage.setItem(LS_CLUB, primerClub); } catch(e){}
      renderButton();
      // Los data files de todos los clubes involucrados: sin ellos no hay qué sumar.
      var ids = [];
      ladosActivos.forEach(function(l){ paresDe(l).forEach(function(p){ if(ids.indexOf(p[0]) < 0) ids.push(p[0]); }); });
      return Promise.all(ids.map(function(id){
        return window.loadClubData ? window.loadClubData(id).catch(function(){ return null; }) : null;
      }));
    }).then(function(){
      renderResultado();
      // La página no se mueve sola: el card aparece abajo del selector y el visitante
      // decide si baja. (En el prototipo 2 el scroll automático fue una queja.)
    });
  }

  function renderResultado(){
    var caja = $('duResultado');
    if(!caja) return;
    if(!mostrando){ caja.hidden = true; caja.innerHTML = ''; return; }
    var ladosActivos = (modo === 'uno' ? [lado[0]] : [lado[0], lado[1]]).filter(Boolean);
    if(!ladosActivos.length){ caja.hidden = true; return; }

    caja.hidden = false;
    caja.innerHTML = '';
    var tots = ladosActivos.map(totalesDe);

    var head = el('div', 'du-res-head');
    head.appendChild(el('h2', null, tots.length > 1 ? 'A contra B' : nombreDe(ladosActivos[0])));
    head.appendChild(el('p', 'du-res-sub', 'En USD. Cada columna se calcula sumando ejercicio por ejercicio con el mismo motor que usa el sitio.'));
    caja.appendChild(head);

    var tabla = el('table', 'du-tabla');
    var trh = el('tr');
    trh.appendChild(el('th', null, ''));
    tots.forEach(function(t, i){
      var th = el('th');
      if(tots.length > 1) th.appendChild(el('span', 'du-letra chica', LETRAS[i]));
      th.appendChild(el('span', 'du-res-n', t.nombre));
      th.appendChild(el('span', 'du-res-m', t.conDato + ' de ' + t.n + (t.n === 1 ? ' ejercicio' : ' ejercicios') + ' · ' + rangoAnios(t)));
      trh.appendChild(th);
    });
    var thead = el('thead'); thead.appendChild(trh); tabla.appendChild(thead);

    var tbody = el('tbody');
    INDICADORES.forEach(function(m){
      var tr = el('tr');
      tr.appendChild(el('th', 'du-ind', m.label));
      var maxAbs = Math.max.apply(null, tots.map(function(t){
        return t.informan[m.key] ? Math.abs(t.tot[m.key]) : 0;
      })) || 1;
      tots.forEach(function(t){
        var td = el('td');
        if(!t.informan[m.key]){
          td.appendChild(el('span', 'du-nodato', 'sin dato'));
        } else {
          var v = t.tot[m.key];
          td.appendChild(el('span', 'du-num' + (m.signo && v < 0 ? ' neg' : ''), fmtM(v)));
          var barra = el('span', 'du-bar');
          var relleno = el('span', 'du-bar-in' + (m.signo && v < 0 ? ' neg' : ''));
          relleno.style.width = Math.round((Math.abs(v) / maxAbs) * 100) + '%';
          barra.appendChild(relleno);
          td.appendChild(barra);
          if(t.informan[m.key] < t.conDato){
            td.appendChild(el('span', 'du-res-m', t.informan[m.key] + ' de ' + t.conDato + ' lo informan'));
          }
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    caja.appendChild(tabla);

    // Las salvedades. Sin esto, dos números grandes uno al lado del otro parecen
    // comparables aunque no lo sean.
    var avisos = [];
    tots.forEach(function(t, i){
      var letra = tots.length > 1 ? LETRAS[i] + ': ' : '';
      if(t.sinEjercicio.length){
        avisos.push(letra + t.sinEjercicio.length + ' club' + (t.sinEjercicio.length > 1 ? 'es' : '')
          + ' sin ese ejercicio, afuera de la cuenta (' + t.sinEjercicio.slice(0, 4).join(', ')
          + (t.sinEjercicio.length > 4 ? ', y ' + (t.sinEjercicio.length - 4) + ' más' : '') + ').');
      }
      if(t.anios.length > 1){
        var min = Math.min.apply(null, t.anios), max = Math.max.apply(null, t.anios);
        if(max - min >= 2) avisos.push(letra + 'los ejercicios van de ' + min + ' a ' + max + ', no son todos del mismo año.');
      }
      if(t.presupuestos) avisos.push(letra + (t.conDato === 1
        ? 'el ejercicio es un PRESUPUESTO, o sea una proyección del club, no un cierre.'
        : t.presupuestos + ' de los ' + t.conDato + ' ejercicios ' +
          (t.presupuestos === 1 ? 'es un PRESUPUESTO, o sea una proyección' : 'son PRESUPUESTOS, o sea proyecciones') +
          ' del club, no un cierre.'));
    });
    if(tots.length > 1 && tots[0].n !== tots[1].n){
      avisos.push('Los dos lados no tienen la misma cantidad de ejercicios: si uno es una liga entera y el otro un club, el total no se puede leer como "quién es más grande" sin mirar esa cuenta.');
    }
    avisos.push('Un club sin el dato no suma cero: queda afuera y se cuenta aparte.');
    var pie = el('div', 'du-avisos');
    avisos.forEach(function(a){ pie.appendChild(el('p', null, a)); });
    caja.appendChild(pie);
  }

  // ---------------------------------------------------------------------------
  // API PÚBLICA (la misma que js/selector.js)
  // ---------------------------------------------------------------------------
  function renderButton(){
    var id = api.getClub();
    var name = $('cbName'), eyebrow = $('cbEyebrow');
    if(!name) return;
    name.textContent = id ? nameOf(id) : 'Elegí tu club';
    if(eyebrow) eyebrow.textContent = id ? 'Estás viendo' : 'Todavía sin elegir';
  }
  function open(){
    $('dueloBlock').scrollIntoView({ behavior:'smooth', block:'start' });
  }
  function close(){ /* no hay modal */ }
  function goHome(){
    lado = [null, null];
    mostrando = false;
    try { localStorage.removeItem(LS_CLUB); } catch(e){}
    Promise.resolve(api.pickClub(null)).then(function(){ renderButton(); render(); });
  }
  function savedClub(){
    try {
      var id = localStorage.getItem(LS_CLUB);
      return (id && clubs[id]) ? id : null;
    } catch(e){ return null; }
  }
  function init(hooks){
    if(inited) return;
    api.getClub = hooks.getClub || api.getClub;
    api.pickClub = hooks.pickClub || api.pickClub;

    $('duToggleDuelo').addEventListener('click', function(){ modo = 'duelo'; mostrando = false; render(); });
    $('duToggleUno').addEventListener('click', function(){ modo = 'uno'; mostrando = false; render(); });
    $('clubBtn').addEventListener('click', function(ev){ ev.stopPropagation(); open(); }, true);

    var guardado = savedClub();
    if(guardado){
      modo = 'uno';
      lado[0] = { tipo:'club', id:guardado, anio:(yearsOf(guardado)[0] || [])[0] || null };
    }
    inited = true;
    renderButton();
    render();
  }

  return {
    init: init, open: open, close: close, refresh: render,
    renderButton: renderButton, goHome: goHome, savedClub: savedClub
  };
})();

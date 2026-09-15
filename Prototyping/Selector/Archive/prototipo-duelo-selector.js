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
// EL ÁRBOL VUELVE (pedido de Guido, 2026-09-14: "en el prototipo 3 se perdió lo
// de buscar por deporte, región, etc. Traelo de nuevo pero manteniendo las dos
// columnas"). La primera versión de este prototipo cambió el árbol por dos
// pestañas planas (Clubes / Ligas enteras) con una lista alfabética de 41 filas,
// y eso rompía el principio 2 del selector del sitio: la lista plana no dice NADA
// de la forma de los datos (que hay 6 países, que Japón tiene 10 clubes, que
// Argentina tiene dos escalones cargados) hasta que la leés entera.
//
// CÓMO ENTRA UN ÁRBOL DE 5 NIVELES EN MEDIA PANTALLA: no entra al lado, entra
// abajo. Las 5 columnas de `js/selector.js` se vuelven UN nivel por vez, con el
// breadcrumb arriba haciendo el trabajo que ahí hacían las columnas de la
// izquierda (ver dónde estás, y volver). El buscador de texto sigue arriba de
// todo y sigue siendo transversal: escribir "boca" o "japon" llega en un paso, sin
// tocar el árbol. Eso es el principio 1 del selector del sitio, y es lo que hace
// que la jerarquía no sea un peaje.
//
// Y UNA COSA QUE EL ÁRBOL DEL SITIO NO TIENE: acá cada fila de conjunto (una
// región, un país, una liga) lleva un ⊕ que lo toma ENTERO como lado. En el sitio
// eso solo existía para ligas, porque el único agregado que sabía calcular era el
// benchmark de liga. En dos columnas "Argentina contra LaLiga" es una pregunta
// natural, y el motor ya la puede contestar: es la misma suma con otra lista de
// clubes.
//
// La API pública es la MISMA que la de `js/selector.js`, porque `index.html` y
// `js/comparar-clubes.js` la llaman sin saber cuál está cargada.
// ============================================================================

window.CLUB_SELECTOR = (function(){
  'use strict';

  var LS_CLUB = 'fos_club';
  var LETRAS = ['A', 'B'];

  // Un LADO es lo que ocupa una columna. Dos formas, y las dos terminan siendo una
  // lista de pares (club, ejercicio) a la hora de calcular:
  //   { tipo:'club',  id:'boca', anio:2025 }
  //   { tipo:'grupo', kind:'liga'|'pais'|'region', id:'ar-primera', anio:null,
  //     modo:'promedio'|'total' }
  //   null  (columna vacía)
  //
  // `kind` se agregó al devolver el árbol (ver la cabecera): antes el único conjunto
  // posible era una liga, y ahora un país entero o una región entera son sujetos
  // igual de válidos. Lo único que cambia entre los tres es DE DÓNDE sale la lista
  // de clubes; de ahí para abajo se calculan igual, y por eso comparten tipo.
  var lado = [null, null];
  var modo = 'duelo';          // 'duelo' | 'uno'
  var busca = ['', ''];

  // EL ÁRBOL, POR COLUMNA. `nivel` es en qué escalón está parada la columna
  // (0 Deporte, 1 Región, 2 País, 3 Liga, 4 Equipo) y `arbol` qué eligió en cada
  // uno. Se navega un nivel POR VEZ, no 5 columnas a la vista como en el selector
  // del sitio: media pantalla no da para 5 columnas, y son dos árboles, uno por
  // lado. El breadcrumb reemplaza a "mirar la columna de la izquierda".
  //
  // Arranca en 1 y no en 0 a propósito: el deporte ya viene resuelto en fútbol (es
  // el único activo), así que empezar en la lista de deportes sería un peaje de un
  // click para todo el mundo. El tramo "⚽ Fútbol" del breadcrumb sigue estando, y
  // clickeándolo se llega a la lista con los otros 5 apagados.
  function arbolVacio(){ return { sport:'futbol', region:null, country:null, league:null }; }
  var arbol = [arbolVacio(), arbolVacio()];
  var nivel = [1, 1];
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
  // EL ÁRBOL: quién cae bajo qué nodo.
  //
  // Igual que en `js/selector.js`, NADA de acá puede necesitar un
  // `data/<club>-data.js`: el panel se dibuja con los 4 archivos livianos que ya
  // están en memoria (`clubs`, `CLUB_INDEX`, `leagues.js`, `club-leagues.js`), y
  // los data files recién se bajan al apretar el botón de abajo.
  // ---------------------------------------------------------------------------
  function sportOf(id){ return (clubs[id] && clubs[id].sport) || 'futbol'; }
  function regionOf(id){ return window.regionOfCountry(countryOf(id)); }
  function clubesDeDeporte(sp){ return clubesOrdenados().filter(function(id){ return sportOf(id) === sp; }); }
  function clubesDeRegion(r){ return clubesOrdenados().filter(function(id){ return regionOf(id) === r; }); }
  function clubesDePais(c){ return clubesOrdenados().filter(function(id){ return countryOf(id) === c; }); }
  function clubesDeLiga(l){ return window.clubsOfLeague(l).filter(function(id){ return !!clubs[id]; }); }

  // Los clubes que corresponden al nodo más profundo elegido en una columna. Es la
  // lista que muestra el nivel Equipo, y también la que hereda el ⊕ del encabezado.
  function clubesDelNodo(a){
    if(a.league) return clubesDeLiga(a.league);
    if(a.country) return clubesDePais(a.country);
    if(a.region) return clubesDeRegion(a.region);
    return clubesDeDeporte(a.sport);
  }

  // La lista de clubes de un LADO ya elegido. El único punto donde los tres kinds
  // de grupo se diferencian entre sí.
  function clubesDe(l){
    if(!l) return [];
    if(l.tipo === 'club') return [l.id];
    if(l.kind === 'liga') return clubesDeLiga(l.id);
    if(l.kind === 'pais') return clubesDePais(l.id);
    if(l.kind === 'region') return clubesDeRegion(l.id);
    return clubesDeDeporte(l.id);
  }

  function nombreRegion(r){
    var x = window.REGIONS.filter(function(y){ return y.id === r; })[0];
    return x ? x.name : r;
  }
  function nombrePais(c){ return (window.COUNTRIES[c] || {}).name || c; }

  // El globo que mira a esa parte del mundo. Seis filas con el mismo 🌎 son seis
  // filas sin icono, y quedaban más pobres que las de país, que llevan bandera.
  var GLOBO = { sudamerica:'🌎', norteamerica:'🌎', europa:'🌍', africa:'🌍', asia:'🌏', oceania:'🌏' };
  function globoDe(r){ return GLOBO[r] || '🌐'; }
  function nombreDeporte(sp){
    var x = window.SPORTS.filter(function(y){ return y.id === sp; })[0];
    return x ? x.name : sp;
  }
  function nombreGrupo(l){
    if(l.kind === 'liga') return (window.LEAGUES[l.id] || {}).name || l.id;
    if(l.kind === 'pais') return nombrePais(l.id);
    if(l.kind === 'region') return nombreRegion(l.id);
    return nombreDeporte(l.id);
  }
  function iconoGrupo(l){
    if(l.kind === 'liga') return (window.COUNTRIES[(window.LEAGUES[l.id] || {}).country] || {}).flag || '🏆';
    if(l.kind === 'pais') return (window.COUNTRIES[l.id] || {}).flag || '🏆';
    return globoDe(l.id);
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
    return clubesDe(l).map(function(id){ return [id, l.anio || (yearsOf(id)[0] || [])[0]]; });
  }

  function nombreDe(l){
    if(!l) return '';
    if(l.tipo === 'club') return nameOf(l.id);
    return (l.modo === 'promedio' ? 'Promedio de ' : 'Total de ') + nombreGrupo(l);
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
    // Y LO MISMO PARA LOS GASTOS, que es un caso real y no teórico: los 10 clubes
    // japoneses tienen ingresos cargados y `expenseLines: []`, porque la J.League
    // publica el ingreso de cada club y no su estructura de costos. Sin este test la
    // columna decía "Gastos 0,0 M USD" y "Resultado del ejercicio 55,0 M USD", que no
    // es un dato incompleto sino un dato FALSO: ese club no ganó 55 millones. Y el
    // resultado cae con los gastos: es el final de una cascada que arranca en ellos.
    var sinGastos = !(c.expenseLines || []).length
                 && c.meta.officialTotalExpenses == null
                 && !c.expenses && !c.nonCash;
    return {
      revenue: usd(c.revenue),
      expenses: sinGastos ? null : Math.abs(usd(c.expenses + c.nonCash)),
      pat: sinGastos ? null : usd(c.pat),
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

    // EL ÁRBOL. El buscador va POR ENCIMA de él y no adentro, porque no es un nivel
    // más: es la salida del que ya sabe qué club quiere y no vino a explorar nada.
    // Mientras hay texto escrito, el árbol se esconde entero (breadcrumb incluido)
    // y la lista pasa a ser el resultado de la búsqueda: dos navegaciones a la vez
    // en media columna no se entienden.
    var inp = document.createElement('input');
    inp.className = 'du-busca';
    inp.type = 'text';
    inp.placeholder = 'Buscá un club, un país o una liga…';
    inp.value = busca[i];
    inp.addEventListener('input', function(){
      busca[i] = this.value;
      var m = col.querySelector('.du-migas');
      if(m) m.hidden = !!busca[i];
      renderNivel(i, col.querySelector('.du-lista'));
    });
    col.appendChild(inp);

    var mig = migas(i);
    mig.hidden = !!busca[i];
    col.appendChild(mig);

    var lista = el('div', 'du-lista');
    col.appendChild(lista);
    renderNivel(i, lista);
    return col;
  }

  // ---------------------------------------------------------------------------
  // EL BREADCRUMB. Con un nivel por vez es la única forma de volver, así que cada
  // tramo es un botón. En `js/selector.js` ese trabajo lo hacían las columnas de la
  // izquierda, que acá no existen: son dos árboles, uno por lado, en media pantalla
  // cada uno.
  //
  // Solo se listan los tramos MÁS ARRIBA del nivel actual, y el último es el nombre
  // del nivel donde estás parado, sin botón. Si se listaran todos, volver a
  // "Regiones" mostraría "Fútbol › Sudamérica › Regiones", que se lee como si
  // Sudamérica siguiera filtrando la lista que tenés delante.
  // ---------------------------------------------------------------------------
  var NOMBRE_NIVEL = ['Deportes', 'Regiones', 'Países', 'Ligas', 'Equipos'];

  function migas(i){
    var a = arbol[i];
    var wrap = el('div', 'du-migas');
    var sp = window.SPORTS.filter(function(x){ return x.id === a.sport; })[0];
    var parts = [{ lbl:(sp ? sp.icon + ' ' + sp.name : a.sport), lvl:0 }];
    if(a.region) parts.push({ lbl:nombreRegion(a.region), lvl:1 });
    if(a.country) parts.push({ lbl:((window.COUNTRIES[a.country] || {}).flag || '') + ' ' + nombrePais(a.country), lvl:2 });
    if(a.league) parts.push({ lbl:(window.LEAGUES[a.league] || {}).name || a.league, lvl:3 });

    var arriba = parts.filter(function(p){ return p.lvl < nivel[i]; });
    arriba.forEach(function(p, k){
      if(k) wrap.appendChild(el('span', 'du-miga-sep', '›'));
      var b = el('button', 'du-miga', p.lbl);
      b.type = 'button';
      b.title = 'Volver a ' + NOMBRE_NIVEL[p.lvl].toLowerCase();
      b.addEventListener('click', function(){ irA(i, p.lvl); });
      wrap.appendChild(b);
    });
    // El separador solo si hay algo a la izquierda: en el nivel Deportes (el más
    // alto) no hay ningún tramo antes, y quedaba un "› Deportes" colgado.
    if(arriba.length) wrap.appendChild(el('span', 'du-miga-sep', '›'));
    wrap.appendChild(el('span', 'du-miga-ahi', NOMBRE_NIVEL[nivel[i]]));
    return wrap;
  }

  // Volver a un nivel limpia TODO lo que colgaba más abajo. Sin esto el breadcrumb
  // dice una cosa y la lista muestra otra: es el bug 29 del sitio publicado (elegís
  // Europa › España, volvés a la región, y LaLiga sigue en la columna de ligas).
  function irA(i, lvl){
    var a = arbol[i];
    if(lvl <= 0){ a.region = null; }
    if(lvl <= 1){ a.country = null; }
    if(lvl <= 2){ a.league = null; }
    nivel[i] = lvl;
    busca[i] = '';
    render();
  }

  // ---------------------------------------------------------------------------
  // LAS FILAS. Una sola función arma las de los 5 niveles y las de la búsqueda:
  // son la misma cosa con distintos campos llenos (mismo criterio que `mkRow()` en
  // `js/selector.js`).
  //
  // EL ⊕ ES LO NUEVO DE ESTE PROTOTIPO: toda fila que representa un CONJUNTO (una
  // región, un país, una liga) lo puede tomar entero como lado, sin bajar hasta un
  // club. El click sigue significando "bajar un nivel", que es lo que espera quien
  // está explorando; el ⊕ es para el que ya sabe que quiere el conjunto.
  // ---------------------------------------------------------------------------
  function fila(o){
    var b = el('button', 'du-op' + (o.apagado ? ' off' : '') + (o.cls ? ' ' + o.cls : ''));
    b.type = 'button';
    if(o.crest) b.appendChild(el('span', 'du-crest', o.crest));
    else if(o.icon) b.appendChild(el('span', 'du-op-icon', o.icon));
    var t = el('span', 'du-op-txt');
    t.appendChild(el('span', 'du-op-n', o.name));
    if(o.sub) t.appendChild(el('span', 'du-op-s', o.sub));
    b.appendChild(t);
    if(o.meta) b.appendChild(el('span', 'du-op-meta', o.meta));
    if(o.pick){
      // Un <button> adentro de otro <button> no es HTML válido, así que la fila
      // entera es el botón y el ⊕ es un <span> con rol de botón. Se probó al revés
      // y el navegador parte el markup solo.
      var p = el('span', 'du-pick', '⊕');
      p.setAttribute('role', 'button');
      p.setAttribute('tabindex', '0');
      p.title = o.pick.titulo;
      p.addEventListener('click', function(ev){ ev.stopPropagation(); o.pick.onPick(); });
      p.addEventListener('keydown', function(ev){
        if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); ev.stopPropagation(); o.pick.onPick(); }
      });
      b.appendChild(p);
    }
    if(o.arrow) b.appendChild(el('span', 'du-op-arrow', '›'));
    if(o.title) b.title = o.title;
    if(o.apagado) b.disabled = true;
    else if(o.onClick) b.addEventListener('click', o.onClick);
    return b;
  }

  function elegirClub(i, id){
    lado[i] = { tipo:'club', id:id, anio:(yearsOf(id)[0] || [])[0] || null };
    busca[i] = '';
    render();
  }
  function elegirGrupo(i, kind, id){
    lado[i] = { tipo:'grupo', kind:kind, id:id, anio:null, modo:'promedio' };
    busca[i] = '';
    render();
  }

  // La fila de arriba de todo cuando ya estás dentro de un conjunto: lo toma entero.
  // Es la misma acción que el ⊕ de la fila del nivel de arriba, a propósito: el que
  // bajó a Argentina para mirar sus ligas no tiene por qué volver para tomarla.
  //
  // EL TEXTO DICE EL TIPO DE CONJUNTO Y NO SU NOMBRE ("Toda la liga", no "Todo
  // LaLiga") POR GÉNERO: en castellano el artículo concuerda con el nombre, y los
  // nombres los ponen los clubes, las ligas y los países, no nosotros. "Todo
  // Primera División", "Todo España" y "Todo Argentina" son las tres cosas que
  // salían de concatenar. Con el sustantivo genérico el artículo es siempre el
  // mismo, y el nombre propio ya está en el breadcrumb justo arriba y en el
  // subtítulo de la fila. Es además el texto que ya usa `js/selector.js`.
  var TIPO_CONJUNTO = { region:'Toda la región', pais:'Todo el país', liga:'Toda la liga' };

  function filaConjunto(i, kind, id){
    var falso = { tipo:'grupo', kind:kind, id:id };
    var n = clubesDe(falso).length;
    return fila({
      cls:'conjunto', icon:iconoGrupo(falso),
      name:TIPO_CONJUNTO[kind] || ('Todo ' + nombreGrupo(falso)),
      sub:nombreGrupo(falso) + ' · ' + n + (n === 1 ? ' club, medido' : ' clubes, medidos') + ' como uno solo',
      // "Elegir" y no un ⊕: acá el ⊕ sería el tercer significado del mismo símbolo
      // en la misma lista (fila de conjunto, botón de la fila de liga), y esta fila
      // no necesita símbolo porque el click ES la acción.
      meta:'Elegir',
      title:'Tomar ' + nombreGrupo(falso) + ' como un solo lado',
      onClick:function(){ elegirGrupo(i, kind, id); }
    });
  }

  // Saltear los niveles que quedan y ver los equipos del nodo actual. Es la fila
  // "Todo el país" / "Toda la región" de `js/selector.js`, que es lo que hace que
  // la jerarquía sea opcional: nadie está obligado a pasar por Liga.
  function filaVerEquipos(i, cuantos, que){
    return fila({
      cls:'ver', icon:'👥', name:'Ver ' + que, meta:String(cuantos), arrow:true,
      onClick:function(){ nivel[i] = 4; render(); }
    });
  }

  function filaClub(i, id){
    var co = window.COUNTRIES[countryOf(id)];
    var n = yearsOf(id).length;
    return fila({
      crest:initials(nameOf(id)), name:nameOf(id),
      sub:(co ? co.flag + ' ' : '') + n + (n === 1 ? ' ejercicio' : ' ejercicios'),
      onClick:function(){ elegirClub(i, id); }
    });
  }

  function filaLiga(i, lid){
    var lg = window.LEAGUES[lid];
    var n = clubesDeLiga(lid).length;
    return fila({
      icon:(window.COUNTRIES[lg.country] || {}).flag || '🏆',
      name:lg.name, sub:window.tierLabel(lg.tier), meta:String(n),
      arrow:!!n, apagado:!n,
      title:n + ' clubes con al menos un ejercicio cargado en esta liga',
      pick:n ? { titulo:'Tomar ' + lg.name + ' como un solo lado',
                 onPick:function(){ elegirGrupo(i, 'liga', lid); } } : null,
      onClick:function(){
        var a = arbol[i];
        a.league = lid; a.country = lg.country; a.region = window.regionOfCountry(lg.country);
        nivel[i] = 4; render();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // EL NIVEL ACTUAL
  // ---------------------------------------------------------------------------
  function renderNivel(i, lista){
    if(!lista) return;
    lista.innerHTML = '';
    if(busca[i]) return renderBusqueda(i, lista);

    var a = arbol[i], n = nivel[i];

    // 0. Deporte. Los inactivos se muestran apagados: son el roadmap declarado del
    //    proyecto, igual que en el selector del sitio.
    if(n === 0){
      window.SPORTS.forEach(function(sp){
        var cant = sp.active ? clubesDeDeporte(sp.id).length : 0;
        lista.appendChild(fila({
          icon:sp.icon, name:sp.name, meta:cant ? String(cant) : '—',
          sub:cant ? null : 'próximamente', apagado:!cant, arrow:!!cant,
          onClick:function(){
            a.sport = sp.id; a.region = null; a.country = null; a.league = null;
            nivel[i] = 1; render();
          }
        }));
      });
      return;
    }

    // 1. Región.
    if(n === 1){
      lista.appendChild(filaVerEquipos(i, clubesDeDeporte(a.sport).length, 'todos los equipos'));
      window.REGIONS.forEach(function(r){
        var cant = clubesDeRegion(r.id).length;
        lista.appendChild(fila({
          icon:globoDe(r.id), name:r.name, meta:cant ? String(cant) : '—',
          sub:cant ? null : 'próximamente', apagado:!cant, arrow:!!cant,
          pick:cant > 1 ? { titulo:'Tomar ' + r.name + ' como un solo lado',
                            onPick:function(){ elegirGrupo(i, 'region', r.id); } } : null,
          onClick:function(){ a.region = r.id; a.country = null; a.league = null; nivel[i] = 2; render(); }
        }));
      });
      return;
    }

    // 2. País.
    if(n === 2){
      if(a.region){
        lista.appendChild(filaConjunto(i, 'region', a.region));
        lista.appendChild(filaVerEquipos(i, clubesDeRegion(a.region).length, 'los equipos de ' + nombreRegion(a.region)));
      }
      var paises = a.region ? window.countriesOfRegion(a.region)
                            : Object.keys(window.COUNTRIES).sort(function(x, y){
                                return window.COUNTRIES[x].name.localeCompare(window.COUNTRIES[y].name, 'es', { sensitivity:'base' });
                              });
      paises.forEach(function(cid){
        var co = window.COUNTRIES[cid], cant = clubesDePais(cid).length;
        lista.appendChild(fila({
          icon:co.flag, name:co.name, meta:cant ? String(cant) : '—',
          apagado:!cant, arrow:!!cant,
          pick:cant > 1 ? { titulo:'Tomar ' + co.name + ' como un solo lado',
                            onPick:function(){ elegirGrupo(i, 'pais', cid); } } : null,
          onClick:function(){
            a.country = cid; a.region = window.regionOfCountry(cid); a.league = null;
            nivel[i] = 3; render();
          }
        }));
      });
      return;
    }

    // 3. Liga. Sin país elegido se listan las del deporte, PERO filtradas por la
    //    región si hay una: es el bug 29 del sitio publicado, que acá no se repite.
    if(n === 3){
      if(a.country){
        lista.appendChild(filaConjunto(i, 'pais', a.country));
        lista.appendChild(filaVerEquipos(i, clubesDePais(a.country).length, 'los equipos de ' + nombrePais(a.country)));
      }
      var ligas = a.country ? window.leaguesOfCountry(a.country)
                            : ligasConClubes().filter(function(lid){
                                var lg = window.LEAGUES[lid];
                                return lg.sport === a.sport &&
                                       (!a.region || window.regionOfCountry(lg.country) === a.region);
                              });
      ligas.forEach(function(lid){ lista.appendChild(filaLiga(i, lid)); });

      // Un club cuyas filas de liga están TODAS en `null` no aparece bajo ninguna
      // liga. Hoy no hay ninguno, pero un club nuevo nace así y sin esta fila
      // quedaría invisible en el árbol.
      var huerfanos = window.clubsWithoutVerifiedLeague().filter(function(id){
        return clubs[id] && (!a.country || countryOf(id) === a.country);
      });
      if(huerfanos.length){
        lista.appendChild(fila({
          cls:'ver', icon:'❓', name:'Sin liga verificada', meta:String(huerfanos.length), arrow:true,
          onClick:function(){ a.league = '__none__'; nivel[i] = 4; render(); }
        }));
      }
      return;
    }

    // 4. Equipo.
    if(a.league && a.league !== '__none__') lista.appendChild(filaConjunto(i, 'liga', a.league));
    else if(a.country) lista.appendChild(filaConjunto(i, 'pais', a.country));
    else if(a.region) lista.appendChild(filaConjunto(i, 'region', a.region));

    var ids = a.league === '__none__'
      ? window.clubsWithoutVerifiedLeague().filter(function(id){ return !!clubs[id]; })
      : clubesDelNodo(a);
    if(!ids.length) return lista.appendChild(el('p', 'du-vacio', 'Todavía no hay ningún club cargado acá.'));
    ids.forEach(function(id){ lista.appendChild(filaClub(i, id)); });
  }

  // ---------------------------------------------------------------------------
  // LA BÚSQUEDA. Transversal a los 5 niveles y sin importar dónde esté parado el
  // árbol: escribir "japon" tiene que encontrar a los 10 clubes japoneses aunque la
  // columna esté mirando España. Un club, una liga, un país y una región pueden
  // salir en la misma lista, y cada uno dice qué es.
  // ---------------------------------------------------------------------------
  function renderBusqueda(i, lista){
    var q = norm(busca[i]);
    var hubo = false;

    var clubesM = clubesOrdenados().filter(function(id){
      var co = window.COUNTRIES[countryOf(id)];
      return norm(nameOf(id)).indexOf(q) >= 0 || (co && norm(co.name).indexOf(q) >= 0);
    });
    var ligasM = ligasConClubes().filter(function(lid){
      var lg = window.LEAGUES[lid];
      return norm(lg.name).indexOf(q) >= 0 || norm(lg.full || '').indexOf(q) >= 0;
    });
    var paisesM = Object.keys(window.COUNTRIES).filter(function(cid){
      return norm(window.COUNTRIES[cid].name).indexOf(q) >= 0 && clubesDePais(cid).length;
    });
    var regionesM = window.REGIONS.filter(function(r){
      return norm(r.name).indexOf(q) >= 0 && clubesDeRegion(r.id).length;
    });

    if(clubesM.length){
      lista.appendChild(el('p', 'du-grupo-tit', 'Equipos'));
      clubesM.forEach(function(id){ lista.appendChild(filaClub(i, id)); });
      hubo = true;
    }
    if(ligasM.length){
      lista.appendChild(el('p', 'du-grupo-tit', 'Ligas'));
      ligasM.forEach(function(lid){ lista.appendChild(filaLiga(i, lid)); });
      hubo = true;
    }
    if(paisesM.length){
      lista.appendChild(el('p', 'du-grupo-tit', 'Países'));
      paisesM.forEach(function(cid){
        var co = window.COUNTRIES[cid], cant = clubesDePais(cid).length;
        lista.appendChild(fila({
          icon:co.flag, name:co.name, meta:String(cant), arrow:true,
          pick:cant > 1 ? { titulo:'Tomar ' + co.name + ' como un solo lado',
                            onPick:function(){ elegirGrupo(i, 'pais', cid); } } : null,
          onClick:function(){
            var a = arbol[i];
            a.country = cid; a.region = window.regionOfCountry(cid); a.league = null;
            nivel[i] = 4; busca[i] = ''; render();
          }
        }));
      });
      hubo = true;
    }
    if(regionesM.length){
      lista.appendChild(el('p', 'du-grupo-tit', 'Regiones'));
      regionesM.forEach(function(r){
        var cant = clubesDeRegion(r.id).length;
        lista.appendChild(fila({
          icon:globoDe(r.id), name:r.name, meta:String(cant), arrow:true,
          pick:{ titulo:'Tomar ' + r.name + ' como un solo lado',
                 onPick:function(){ elegirGrupo(i, 'region', r.id); } },
          onClick:function(){
            var a = arbol[i];
            a.region = r.id; a.country = null; a.league = null;
            nivel[i] = 2; busca[i] = ''; render();
          }
        }));
      });
      hubo = true;
    }
    if(!hubo) lista.appendChild(el('p', 'du-vacio', 'Nada con ese nombre. Probá con un club, un país o una liga.'));
  }

  // La columna con algo elegido: qué es, de qué ejercicio, y (si es un conjunto) si
  // se mide por promedio o por total. Las dos preguntas viven al lado del sujeto,
  // que es donde el visitante las está pensando.
  //
  // El botón "Elegir otro" devuelve la columna al árbol, en el nivel donde el
  // sujeto vive: el que eligió Boca y se arrepintió aparece entre los equipos
  // argentinos, no de vuelta en la lista de regiones.
  function elegido(i){
    var l = lado[i];
    var caja = el('div', 'du-elegido');
    var fila = el('div', 'du-sujeto');
    fila.appendChild(el('span', 'du-crest grande', l.tipo === 'club' ? initials(nameOf(l.id)) : iconoGrupo(l)));
    var t = el('span', 'du-op-txt');
    t.appendChild(el('span', 'du-sujeto-n', l.tipo === 'club' ? nameOf(l.id) : nombreGrupo(l)));
    var n = clubesDe(l).length;
    var sub = l.tipo === 'club'
      ? ((window.COUNTRIES[countryOf(l.id)] || {}).name || '')
      : n + (n === 1 ? ' club cargado' : ' clubes cargados');
    t.appendChild(el('span', 'du-op-s', sub));
    fila.appendChild(t);
    var otro = el('button', 'du-otro', 'Elegir otro');
    otro.type = 'button';
    otro.title = 'Volver al árbol sin perder el resto de la pantalla';
    otro.addEventListener('click', function(){ volverAlArbol(i); });
    fila.appendChild(otro);
    caja.appendChild(fila);

    if(l.tipo === 'grupo'){
      var modos = el('div', 'du-modos');
      [['promedio', 'Promedio por club'], ['total', 'Todo sumado']].forEach(function(m){
        var b = el('button', 'du-modo' + (l.modo === m[0] ? ' on' : ''), m[1]);
        b.type = 'button';
        b.title = m[0] === 'promedio'
          ? 'Cómo le fue a un club típico de ' + nombreGrupo(l)
          : 'Todo lo que movió ' + nombreGrupo(l) + ', sumado';
        b.addEventListener('click', function(){ l.modo = m[0]; render(); });
        modos.appendChild(b);
      });
      caja.appendChild(modos);
    }

    caja.appendChild(selectorDeAnio(i));
    return caja;
  }

  // Vaciar la columna dejando el árbol parado donde estaba el sujeto. Para un club
  // eso es el nivel Equipo de su país; para un conjunto, el nivel donde se elige
  // ese tipo de conjunto.
  function volverAlArbol(i){
    var l = lado[i], a = arbol[i];
    if(l && l.tipo === 'club'){
      a.country = countryOf(l.id); a.region = regionOf(l.id); a.league = null;
      nivel[i] = 4;
    } else if(l && l.kind === 'liga'){
      var lg = window.LEAGUES[l.id] || {};
      a.country = lg.country || null; a.region = window.regionOfCountry(lg.country); a.league = null;
      nivel[i] = 3;
    } else if(l && l.kind === 'pais'){
      a.country = null; a.region = window.regionOfCountry(l.id); a.league = null;
      nivel[i] = 2;
    } else {
      a.country = null; a.league = null;
      nivel[i] = 1;
    }
    lado[i] = null;
    busca[i] = '';
    render();
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
      clubesDe(l).forEach(function(id){
        yearsOf(id).forEach(function(par){ anios[par[0]] = (anios[par[0]] || 0) + 1; });
      });
      Object.keys(anios).map(Number).sort(function(a, b){ return b - a; }).forEach(function(y){
        var o = document.createElement('option');
        o.value = y;
        // Cuántos clubes tienen ese ejercicio: se dice ANTES de elegirlo, no después.
        o.textContent = 'Cierre ' + y + ' (' + anios[y] + (anios[y] === 1 ? ' club)' : ' clubes)');
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
        ? (lado[0] ? 'Ver ' + nombreDe(lado[0]) : 'Elegí un equipo, una liga o un país')
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
      : clubesDe(ladosActivos[0])[0];

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
    arbol = [arbolVacio(), arbolVacio()];
    nivel = [1, 1];
    busca = ['', ''];
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
      // El árbol de la otra columna arranca parado en el país del club guardado: el
      // rival más probable de Boca es otro club argentino, no una región de Asia.
      arbol[1].region = regionOf(guardado);
      arbol[1].country = countryOf(guardado);
      nivel[1] = 4;
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

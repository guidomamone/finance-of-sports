// ============================================================================
// prototipo-pasos-selector.js — PROTOTIPO 2 del selector de club: un paso por
// card, uno abajo del otro, en vez de las 5 columnas simultáneas del selector de
// hoy (`js/selector.js`, Versión 137).
//
// ESTO NO ES EL SITIO. Solo lo carga `prototipo-pasos.html`. El sitio publicado
// sigue usando `js/selector.js`, y el otro prototipo (`prototipo-inicio-*`) sigue
// como está: son dos visualizaciones distintas para comparar, no una encima de la
// otra.
//
// EL PROBLEMA QUE ATACA (planteado por Guido): "siento que con el actual le
// estamos poniendo una cantidad de información impresionante al usuario ni bien
// se loguea, y es demasiado". Es cierto: el panel de columnas muestra a la vez 6
// deportes, 6 regiones, 6 países, 8 ligas y 41 clubes. Son ~67 opciones en la
// primera pantalla, y 5 decisiones simultáneas que además no son independientes.
//
// LA APUESTA: una decisión por vez. Es literalmente la segunda ley de Krug
// (`Business Books/dont_make_me_think.md`): "no importa cuántos clicks haya que
// hacer, mientras cada click sea una elección obvia y sin pensar; tres clicks sin
// pensar valen menos que uno que te obliga a pensar". Y es divulgación progresiva
// en el sentido de Higgins (`better_onboarding.md`): mostrar capacidad a medida
// que el usuario demuestra que la necesita, no toda junta de entrada.
//
// LO QUE SE PIERDE, para tenerlo a la vista y no descubrirlo tarde: el panel de
// columnas deja VER la forma de los datos (que hay 6 países, que Japón tiene 10
// clubes) sin tocar nada, y permite volver un nivel sin perder el resto. Los
// pasos esconden eso hasta que llegás. El atajo que lo compensa es el buscador de
// arriba, que sigue llegando a cualquier club en un paso.
//
// TRES COSAS QUE EL PROTOTIPO 1 DEJÓ APROBADAS Y ACÁ SE MANTIENEN:
//   - el selector VIVE EN LA PÁGINA, no atrás de un modal, y se queda cuando ya
//     elegiste un club (se colapsa a una línea con el camino elegido);
//   - las pestañas del header se ven desde la primera visita;
//   - un ejercicio puntual se puede elegir sin entrar al club.
//
// QUÉ NO TIENE, a pedido de Guido: el punto de color de calidad del dato y su
// leyenda ("Balance oficial / Parcial / Placeholder / Sin datos"). La calidad
// sigue estando en la ficha del club y en la pestaña Fuentes.
//
// La API pública es la MISMA que la de `js/selector.js`, porque `index.html` y
// `js/comparar-clubes.js` la llaman sin saber cuál de las dos está cargada:
// init / open / close / refresh / renderButton / goHome / savedClub.
// ============================================================================

window.CLUB_SELECTOR = (function(){
  'use strict';

  var LS_CLUB = 'fos_club';

  // El estado es EL CAMINO, no una selección suelta por columna: elegir un país
  // distinto invalida la liga, elegir otra región invalida el país. Guardarlo así
  // hace imposible el bug que tenía el selector de columnas (una liga de la región
  // anterior quedaba a la vista después de cambiar de región, to-do 29).
  var paso = { sport:null, region:null, country:null, league:null };
  var abierto = true;          // el bloque entero, plegable cuando ya hay club
  var inited = false;

  var api = {
    getClub: function(){ return null; },
    pickClub: function(){ return Promise.resolve(); }
  };

  // OJO: `clubs` y `CLUB_LEAGUE_BY_YEAR` se declaran con `const` en sus data files,
  // así que NO son propiedades de `window` (a diferencia de `CLUB_INDEX`, que se
  // asigna a window, y de las funciones sueltas de leagues.js/club-leagues.js, que
  // sí quedan colgadas de window por ser declaraciones de función). Referenciarlos
  // como `window.clubs` da undefined y rompe todo: js/selector.js los usa pelados
  // por lo mismo.
  function $(id){ return document.getElementById(id); }
  function idx(id){ return (window.CLUB_INDEX || {})[id] || {}; }
  function nameOf(id){ return (clubs[id] && clubs[id].displayName) || idx(id).n || id; }
  function countryOf(id){ return (clubs[id] && clubs[id].country) || idx(id).c; }
  function sportOf(id){ return (clubs[id] && clubs[id].sport) || 'futbol'; }
  function yearsOf(id){
    return (idx(id).yrs || []).filter(function(par){
      return par[1] !== 'placeholder' && par[1] !== 'pending_official';
    });
  }
  function nClubes(n){ return n === 1 ? '1 club' : n + ' clubes'; }
  function initials(name){
    var w = String(name || '').replace(/[^A-Za-zÀ-ÿ ]/g, '').split(/\s+/).filter(Boolean);
    return (w.slice(0, 2).map(function(x){ return x[0]; }).join('') || '··').toUpperCase();
  }

  // ---------------------------------------------------------------------------
  // QUÉ CLUBES QUEDAN. Un solo filtro, del que salen todos los conteos: si el
  // número que muestra un paso no sale de la MISMA función que arma la lista del
  // paso siguiente, tarde o temprano dicen cosas distintas.
  // ---------------------------------------------------------------------------
  function clubsQueQuedan(hasta){
    var ids = Object.keys(window.CLUB_INDEX || {}).filter(function(id){ return !!clubs[id]; });
    if(paso.sport) ids = ids.filter(function(id){ return sportOf(id) === paso.sport; });
    if(hasta === 'sport') return ids;
    if(paso.region) ids = ids.filter(function(id){ return window.regionOfCountry(countryOf(id)) === paso.region; });
    if(hasta === 'region') return ids;
    if(paso.country) ids = ids.filter(function(id){ return countryOf(id) === paso.country; });
    if(hasta === 'country') return ids;
    if(paso.league) ids = ids.filter(function(id){ return clubsOfLeague(paso.league).indexOf(id) >= 0; });
    return ids;
  }

  function ordenados(ids){
    return ids.slice().sort(function(a, b){
      return nameOf(a).localeCompare(nameOf(b), 'es', { sensitivity:'base' });
    });
  }

  // ---------------------------------------------------------------------------
  // LOS 5 PASOS. Cada uno se describe con los mismos 4 datos, y el render es uno
  // solo para los cinco: agregar un nivel (deporte > confederación > liga, por
  // ejemplo) es una entrada más en esta lista, no una función nueva.
  //   titulo   — el encabezado del card
  //   valor()  — qué se eligió, o null si todavía no
  //   opciones() — [{ id, label, sub, meta, icon, disabled }]
  //   elegir(id) — null significa "saltear este nivel"
  // ---------------------------------------------------------------------------
  var PASOS = [
    {
      clave: 'sport',
      titulo: 'Elegí el deporte',
      valor: function(){
        if(!paso.sport) return null;
        var sp = window.SPORTS.filter(function(s){ return s.id === paso.sport; })[0];
        return sp ? sp.icon + ' ' + sp.name : paso.sport;
      },
      opciones: function(){
        return window.SPORTS.map(function(sp){
          var n = sp.active ? Object.keys(window.CLUB_INDEX).filter(function(id){
            return clubs[id] && sportOf(id) === sp.id;
          }).length : 0;
          return {
            id: sp.id, icon: sp.icon, label: sp.name,
            meta: n ? nClubes(n) : 'próximamente',
            disabled: !sp.active
          };
        });
      },
      elegir: function(id){ paso.sport = id; paso.region = null; paso.country = null; paso.league = null; }
    },
    {
      clave: 'region',
      titulo: 'Elegí la región',
      valor: function(){
        if(!paso.region) return null;
        var r = window.REGIONS.filter(function(x){ return x.id === paso.region; })[0];
        return r ? r.name : paso.region;
      },
      saltear: 'Ver todas las regiones',
      opciones: function(){
        return window.REGIONS.map(function(r){
          var n = clubsQueQuedan('sport').filter(function(id){
            return window.regionOfCountry(countryOf(id)) === r.id;
          }).length;
          return { id:r.id, label:r.name, meta: n ? nClubes(n) : 'próximamente', disabled: !n };
        });
      },
      elegir: function(id){ paso.region = id; paso.country = null; paso.league = null; }
    },
    {
      clave: 'country',
      titulo: 'Elegí el país',
      valor: function(){
        if(!paso.country) return null;
        var co = window.COUNTRIES[paso.country];
        return co ? co.flag + ' ' + co.name : paso.country;
      },
      saltear: 'Ver todos los países',
      opciones: function(){
        var base = clubsQueQuedan('region');
        var vistos = {};
        base.forEach(function(id){ vistos[countryOf(id)] = (vistos[countryOf(id)] || 0) + 1; });
        return Object.keys(vistos).sort(function(a, b){
          return window.COUNTRIES[a].name.localeCompare(window.COUNTRIES[b].name, 'es');
        }).map(function(cid){
          return { id:cid, icon:window.COUNTRIES[cid].flag, label:window.COUNTRIES[cid].name, meta: nClubes(vistos[cid]) };
        });
      },
      elegir: function(id){
        paso.country = id;
        paso.region = window.regionOfCountry(id);
        paso.league = null;
      }
    },
    {
      clave: 'league',
      titulo: 'Elegí la liga',
      valor: function(){ return paso.league ? window.LEAGUES[paso.league].name : null; },
      saltear: 'Ver todas las ligas',
      opciones: function(){
        var base = clubsQueQuedan('country');
        var vistas = {};
        base.forEach(function(id){
          window.leaguesOfClub(id).forEach(function(l){ vistas[l.league] = 1; });
        });
        return Object.keys(vistas).sort(function(a, b){
          return window.LEAGUES[a].name.localeCompare(window.LEAGUES[b].name, 'es');
        }).map(function(lid){
          var n = base.filter(function(id){ return clubsOfLeague(lid).indexOf(id) >= 0; }).length;
          return { id:lid, label:window.LEAGUES[lid].name, sub:window.tierLabel(window.LEAGUES[lid].tier), meta: nClubes(n) };
        });
      },
      elegir: function(id){
        paso.league = id;
        paso.country = window.LEAGUES[id].country;
        paso.region = window.regionOfCountry(paso.country);
      }
    },
    {
      clave: 'club',
      titulo: 'Elegí el club',
      valor: function(){ return api.getClub() ? nameOf(api.getClub()) : null; },
      opciones: function(){
        return ordenados(clubsQueQuedan()).map(function(id){
          var n = yearsOf(id).length;
          return {
            id: id, crest: initials(nameOf(id)), label: nameOf(id),
            meta: n === 1 ? '1 ejercicio' : n + ' ejercicios'
          };
        });
      },
      elegir: function(id){ elegirClub(id); }
    }
  ];

  // El paso en el que estás: el primero sin resolver. No hay un índice aparte que
  // pueda quedar desfasado del estado.
  function pasoActual(){
    for(var i = 0; i < PASOS.length; i++){
      if(PASOS[i].valor() === null) return i;
    }
    return PASOS.length;
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  function el(tag, cls, txt){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(txt != null) e.textContent = txt;
    return e;
  }

  function opcionBtn(op, onClick){
    var b = el('button', 'op' + (op.disabled ? ' off' : ''));
    b.type = 'button';
    if(op.icon){ b.appendChild(el('span', 'op-icon', op.icon)); }
    else if(op.crest){ b.appendChild(el('span', 'op-crest', op.crest)); }
    var txt = el('span', 'op-txt');
    txt.appendChild(el('span', 'op-label', op.label));
    if(op.sub) txt.appendChild(el('span', 'op-sub', op.sub));
    b.appendChild(txt);
    if(op.meta) b.appendChild(el('span', 'op-meta', op.meta));
    if(op.disabled) b.disabled = true;
    else b.addEventListener('click', function(){ onClick(op.id); });
    return b;
  }

  function render(){
    var wrap = $('pasosWrap');
    if(!wrap) return;
    wrap.innerHTML = '';
    var actual = pasoActual();
    var club = api.getClub();

    // Bloque plegado: con un club ya elegido el selector no se va de la página,
    // se encoge a una línea con el camino. Es lo que el prototipo 1 dejó probado.
    $('pasosBlock').classList.toggle('con-club', !!club);
    $('pasosBlock').classList.toggle('plegado', !!club && !abierto);
    $('pasosResumen').textContent = camino().join('  ›  ');
    $('pasosToggle').textContent = abierto ? 'Minimizar' : 'Cambiar de club';
    if(!!club && !abierto) return;

    PASOS.forEach(function(p, i){
      var valor = p.valor();
      var estado = valor !== null ? 'hecho' : (i === actual ? 'ahora' : 'pendiente');
      // <div> y NO <section>: el CSS del sitio esconde toda <section> que no tenga
    // .active (son las pestañas), así que un card <section> nace invisible. Costó
    // un rato de debug.
    var card = el('div', 'paso ' + estado);

      var head = el('div', 'paso-head');
      head.appendChild(el('span', 'paso-n', String(i + 1)));
      var ht = el('span', 'paso-ht');
      ht.appendChild(el('span', 'paso-t', p.titulo));
      if(valor !== null) ht.appendChild(el('span', 'paso-v', valor));
      head.appendChild(ht);
      if(valor !== null){
        var cambiar = el('button', 'paso-change', 'Cambiar');
        cambiar.type = 'button';
        cambiar.addEventListener('click', function(){ volverA(i); });
        head.appendChild(cambiar);
      }
      card.appendChild(head);

      if(estado === 'ahora'){
        var body = el('div', 'paso-body');
        var ops = p.opciones();
        if(!ops.length){
          body.appendChild(el('p', 'paso-vacio', 'No hay nada cargado acá todavía.'));
        } else {
          var grid = el('div', 'op-grid' + (p.clave === 'club' ? ' clubes' : ''));
          ops.forEach(function(op){ grid.appendChild(opcionBtn(op, function(id){ p.elegir(id); render(); })); });
          body.appendChild(grid);
        }
        // Saltear un nivel es parte del diseño, no una salida de emergencia: quien
        // quiere "todos los clubes de Europa" no debería tener que elegir un país.
        if(p.saltear){
          var skip = el('button', 'paso-skip', p.saltear + ' (' + nClubes(clubsQueQuedan(p.clave === 'region' ? 'sport' : p.clave === 'country' ? 'region' : 'country').length) + ')');
          skip.type = 'button';
          skip.addEventListener('click', function(){ p.elegir(null); render(); });
          body.appendChild(skip);
        }
        card.appendChild(body);
      }
      wrap.appendChild(card);
    });

    if(club) wrap.appendChild(cardEjercicio(club));
  }

  // El 6to card aparece SOLO con un club elegido, y es opcional: sin tocarlo ya
  // estás viendo el club entero. Que el ejercicio sea un paso más y no un dropdown
  // escondido es el mismo criterio que el resto de la pantalla.
  function cardEjercicio(clubId){
    var card = el('div', 'paso ahora ejercicio');
    var head = el('div', 'paso-head');
    head.appendChild(el('span', 'paso-n', '6'));
    var ht = el('span', 'paso-ht');
    ht.appendChild(el('span', 'paso-t', 'Elegí el ejercicio'));
    ht.appendChild(el('span', 'paso-v', 'opcional'));
    head.appendChild(ht);
    card.appendChild(head);

    var body = el('div', 'paso-body');
    var grid = el('div', 'op-grid anios');
    var todos = el('button', 'op', '');
    todos.type = 'button';
    todos.appendChild(el('span', 'op-label', 'Todos los ejercicios'));
    todos.addEventListener('click', function(){ irAlClub(clubId); });
    grid.appendChild(todos);

    yearsOf(clubId).forEach(function(par){
      var b = el('button', 'op');
      b.type = 'button';
      b.appendChild(el('span', 'op-label', window.ejercicioLabel ? window.ejercicioLabel(par[0], par[1], clubId) : String(par[0])));
      b.addEventListener('click', function(){
        if(window.goToFinanzasYear) window.goToFinanzasYear(clubId, par[0]);
      });
      grid.appendChild(b);
    });
    body.appendChild(grid);
    card.appendChild(body);
    return card;
  }

  function camino(){
    var out = [];
    PASOS.forEach(function(p){
      var v = p.valor();
      if(v !== null) out.push(v);
    });
    return out.length ? out : ['Todavía sin elegir'];
  }

  // "Cambiar" en un paso ya resuelto borra ESE y todos los de abajo. Volver atrás
  // sin invalidar lo que dependía de esa elección es justo el bug que tiene hoy el
  // selector de columnas (to-do 29).
  function volverA(i){
    var claves = ['sport', 'region', 'country', 'league'];
    for(var k = i; k < claves.length; k++) paso[claves[k]] = null;
    if(i <= 4){
      try { localStorage.removeItem(LS_CLUB); } catch(e){}
      Promise.resolve(api.pickClub(null)).then(function(){ abierto = true; render(); });
      return;
    }
    render();
  }

  function elegirClub(id){
    try { localStorage.setItem(LS_CLUB, id); } catch(e){}
    Promise.resolve(api.pickClub(id)).then(function(){
      renderButton();
      render();
      irAlContenido();
    });
  }

  function irAlClub(clubId){
    if(api.getClub() !== clubId) return elegirClub(clubId);
    irAlContenido();
  }

  function irAlContenido(){
    var secs = document.querySelectorAll('main > section');
    for(var i = 0; i < secs.length; i++){
      if(secs[i].classList.contains('active') && secs[i].style.display !== 'none'){
        secs[i].scrollIntoView({ behavior:'smooth', block:'start' });
        return;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // BUSCADOR. El atajo que compensa lo que los pasos esconden: quien ya sabe qué
  // club quiere no tiene por qué recorrer 5 niveles. Busca por club, país y liga,
  // ignorando acentos y mayúsculas.
  // ---------------------------------------------------------------------------
  function norm(s){
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function renderBusqueda(){
    var q = norm($('pasosQ').value.trim());
    var caja = $('pasosResultados');
    caja.innerHTML = '';
    caja.hidden = !q;
    $('pasosWrap').hidden = !!q;
    if(!q) return;

    var hits = ordenados(Object.keys(window.CLUB_INDEX).filter(function(id){
      if(!clubs[id]) return false;
      var co = window.COUNTRIES[countryOf(id)];
      var ligas = window.leaguesOfClub(id).map(function(l){ return window.LEAGUES[l.league].name; }).join(' ');
      return norm(nameOf(id)).indexOf(q) >= 0
          || (co && norm(co.name).indexOf(q) >= 0)
          || norm(ligas).indexOf(q) >= 0;
    }));

    if(!hits.length){
      caja.appendChild(el('p', 'paso-vacio', 'Ningún club, liga ni país con ese nombre. Probá con menos letras.'));
      return;
    }
    var grid = el('div', 'op-grid clubes');
    hits.forEach(function(id){
      var co = window.COUNTRIES[countryOf(id)];
      var n = yearsOf(id).length;
      grid.appendChild(opcionBtn({
        id: id, crest: initials(nameOf(id)), label: nameOf(id),
        sub: (co ? co.flag + ' ' + co.name : ''),
        meta: n === 1 ? '1 ejercicio' : n + ' ejercicios'
      }, function(cid){
        // Elegir desde la búsqueda deja el camino coherente: los pasos se llenan
        // solos con el club elegido, no quedan vacíos contradiciendo lo que ves.
        pararseEn(cid);
        $('pasosQ').value = '';
        renderBusqueda();
        elegirClub(cid);
      }));
    });
    caja.appendChild(grid);
  }

  function pararseEn(clubId){
    var lgs = window.leaguesOfClub(clubId);
    paso.sport = sportOf(clubId);
    paso.country = countryOf(clubId);
    paso.region = window.regionOfCountry(paso.country);
    paso.league = lgs.length ? lgs[0].league : null;
  }

  // ---------------------------------------------------------------------------
  // API PÚBLICA. La misma que expone js/selector.js.
  // ---------------------------------------------------------------------------
  function renderButton(){
    var id = api.getClub();
    var name = $('cbName'), eyebrow = $('cbEyebrow');
    if(!name) return;
    name.textContent = id ? nameOf(id) : 'Elegí tu club';
    if(eyebrow) eyebrow.textContent = id ? 'Estás viendo' : 'Todavía sin elegir';
  }

  function open(){
    abierto = true;
    render();
    $('pasosBlock').scrollIntoView({ behavior:'smooth', block:'start' });
    var q = $('pasosQ');
    if(q) q.focus();
  }

  function close(){ /* no hay modal que cerrar: el selector vive en la página */ }

  function goHome(){
    paso = { sport:null, region:null, country:null, league:null };
    try { localStorage.removeItem(LS_CLUB); } catch(e){}
    Promise.resolve(api.pickClub(null)).then(function(){ abierto = true; renderButton(); render(); });
  }

  function init(hooks){
    if(inited) return;
    api.getClub = hooks.getClub || api.getClub;
    api.pickClub = hooks.pickClub || api.pickClub;

    $('pasosQ').addEventListener('input', renderBusqueda);
    $('pasosToggle').addEventListener('click', function(){ abierto = !abierto; render(); });
    $('pasosResumen').addEventListener('click', function(){ abierto = true; render(); });
    $('clubBtn').addEventListener('click', function(ev){ ev.stopPropagation(); open(); }, true);

    var guardado = savedClub();
    if(guardado) pararseEn(guardado);
    abierto = !guardado;

    inited = true;
    renderButton();
    render();
  }

  function savedClub(){
    try {
      var id = localStorage.getItem(LS_CLUB);
      return (id && clubs[id]) ? id : null;
    } catch(e){ return null; }
  }

  return {
    init: init,
    open: open,
    close: close,
    refresh: render,
    renderButton: renderButton,
    goHome: goHome,
    savedClub: savedClub
  };
})();

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
// hacer, mientras cada click sea una elección obvia y sin pensar". Y es
// divulgación progresiva en el sentido de Higgins (`better_onboarding.md`).
//
// LAS 4 REGLAS QUE PIDIÓ GUIDO EN LA SEGUNDA VUELTA, y que cambian el modelo:
//
//  1. TODO PASO SE PUEDE IGNORAR, con un botón que dice "Elegir más tarde". Es lo
//     mismo que un "ver todos" pero dicho como lo piensa el visitante: no es que
//     quiera ver todo, es que todavía no quiere decidir eso. Consecuencia directa:
//     el paso del ejercicio dejó de estar marcado como "opcional", porque ahora
//     TODOS lo son y marcar uno solo era decir algo falso de los otros cinco.
//
//  2. CADA PASO ES MULTI-SELECCIÓN (checkbox, no radio). "Argentina y Brasil" es
//     una respuesta tan válida como "Argentina". Por eso cada paso necesita un
//     "Continuar" explícito: con casillas, el primer click ya no puede avanzar
//     solo sin romper la posibilidad de marcar una segunda.
//
//  3. SI EL VISITANTE IGNORA TODO, elegimos nosotros y se lo decimos en pantalla:
//     Boca contra River. No es un default escondido, es una respuesta declarada —
//     la pantalla dice qué eligió el sitio y por qué lo eligió.
//
//  4. UN CLUB SOLO NO ES EL DESTINO. "La gracia de todo esto es comparar, no
//     analizar un club en solitario" (Guido). Así que cuando la selección termina
//     con un solo club, el último card no felicita a nadie: ofrece contra quién
//     compararlo, con rivales de su propia liga a un click.
//
// LO QUE SE PIERDE CONTRA EL SELECTOR DE COLUMNAS, para tenerlo a la vista: el
// panel deja VER la forma de los datos (que hay 6 países, que Japón tiene 10
// clubes) sin tocar nada. Los pasos esconden eso hasta que llegás. El atajo que lo
// compensa es el buscador de arriba, que sigue llegando a cualquier club en uno.
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

  // Los 6 pasos, cada uno con lo que el visitante marcó y si decidió no decidir.
  // `sel` vacío + `saltado` en false = todavía no llegó; `sel` vacío + `saltado`
  // en true = lo ignoró a propósito. La diferencia importa: la primera es una
  // pregunta pendiente y la segunda es una respuesta.
  var CLAVES = ['sport', 'region', 'country', 'league', 'club', 'year', 'vs'];
  var st = {};
  function reset(){
    CLAVES.forEach(function(k){ st[k] = { sel:[], resuelto:false, saltado:false }; });
  }
  reset();

  var abierto = true;          // el bloque entero, plegable cuando ya hay club
  var inited = false;
  var autoElegido = false;     // true cuando el sitio eligió por el visitante

  // LOS LADOS. Un lado es un CONJUNTO de clubes que se mide como uno solo: "la
  // Primera División", "Cruzeiro + la liga argentina", "Boca". Existe porque el
  // modelo viejo no alcanzaba (Guido: "falta la funcionalidad de poder sumar
  // distintos equipos o ligas y medirlo contra otro"): `js/comparar-clubes.js`
  // compara SUJETOS sueltos —un club, o el promedio de una liga— y no sabe sumar
  // un grupo armado a mano.
  //
  // OJO CON LA PALABRA "TOTAL", que es la diferencia real con lo que ya existe: el
  // benchmark de liga del sitio es un PROMEDIO (o mediana) de sus integrantes; un
  // lado suma. "La liga argentina" como promedio y como total son dos números
  // distintos y contestan dos preguntas distintas.
  var lados = [];              // [{ nombre, clubes:[ids], anio:number|null }]
  var LETRAS = ['A', 'B', 'C', 'D'];

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
  function regionOf(id){ return window.regionOfCountry(countryOf(id)); }
  function sportOf(id){ return (clubs[id] && clubs[id].sport) || 'futbol'; }
  function ligasDe(id){ return window.leaguesOfClub(id).map(function(l){ return l.league; }); }
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
  function tiene(k, id){ return st[k].sel.indexOf(id) >= 0; }
  function alternar(k, id){
    var i = st[k].sel.indexOf(id);
    if(i >= 0) st[k].sel.splice(i, 1); else st[k].sel.push(id);
  }

  // ---------------------------------------------------------------------------
  // QUÉ CLUBES QUEDAN. Un solo filtro, del que salen todos los conteos: si el
  // número que muestra un paso no sale de la MISMA función que arma la lista del
  // paso siguiente, tarde o temprano dicen cosas distintas. Dentro de un paso los
  // valores se suman (Argentina O Brasil); entre pasos se cruzan (Sudamérica Y
  // primera división).
  // ---------------------------------------------------------------------------
  function clubsQueQuedan(hasta){
    var corte = CLAVES.indexOf(hasta || 'club');
    var ids = Object.keys(window.CLUB_INDEX || {}).filter(function(id){ return !!clubs[id]; });
    if(corte > 0 && st.sport.sel.length) ids = ids.filter(function(id){ return st.sport.sel.indexOf(sportOf(id)) >= 0; });
    if(corte > 1 && st.region.sel.length) ids = ids.filter(function(id){ return st.region.sel.indexOf(regionOf(id)) >= 0; });
    if(corte > 2 && st.country.sel.length) ids = ids.filter(function(id){ return st.country.sel.indexOf(countryOf(id)) >= 0; });
    if(corte > 3 && st.league.sel.length) ids = ids.filter(function(id){
      return ligasDe(id).some(function(l){ return st.league.sel.indexOf(l) >= 0; });
    });
    return ids;
  }

  function ordenados(ids){
    return ids.slice().sort(function(a, b){
      return nameOf(a).localeCompare(nameOf(b), 'es', { sensitivity:'base' });
    });
  }
  function porEjercicios(ids){
    return ids.slice().sort(function(a, b){
      return (yearsOf(b).length - yearsOf(a).length) || nameOf(a).localeCompare(nameOf(b), 'es');
    });
  }

  // ---------------------------------------------------------------------------
  // LOS 6 PASOS. Cada uno se describe con los mismos datos, y el render es uno
  // solo para todos: agregar un nivel es una entrada más en esta lista, no una
  // función nueva.
  // ---------------------------------------------------------------------------
  var PASOS = [
    {
      clave: 'sport', titulo: 'Elegí uno o más deportes',
      etiqueta: function(id){
        var sp = window.SPORTS.filter(function(s){ return s.id === id; })[0];
        return sp ? sp.icon + ' ' + sp.name : id;
      },
      opciones: function(){
        return window.SPORTS.map(function(sp){
          var n = sp.active ? Object.keys(window.CLUB_INDEX).filter(function(id){
            return clubs[id] && sportOf(id) === sp.id;
          }).length : 0;
          return { id:sp.id, icon:sp.icon, label:sp.name, meta: n ? nClubes(n) : 'próximamente', disabled: !sp.active };
        });
      }
    },
    {
      clave: 'region', titulo: 'Elegí una o más regiones',
      etiqueta: function(id){
        var r = window.REGIONS.filter(function(x){ return x.id === id; })[0];
        return r ? r.name : id;
      },
      opciones: function(){
        var base = clubsQueQuedan('region');
        return window.REGIONS.map(function(r){
          var n = base.filter(function(id){ return regionOf(id) === r.id; }).length;
          return { id:r.id, label:r.name, meta: n ? nClubes(n) : 'próximamente', disabled: !n };
        });
      }
    },
    {
      clave: 'country', titulo: 'Elegí uno o más países',
      etiqueta: function(id){
        var co = window.COUNTRIES[id];
        return co ? co.flag + ' ' + co.name : id;
      },
      opciones: function(){
        var base = clubsQueQuedan('country'), cuenta = {};
        base.forEach(function(id){ cuenta[countryOf(id)] = (cuenta[countryOf(id)] || 0) + 1; });
        return Object.keys(cuenta).sort(function(a, b){
          return window.COUNTRIES[a].name.localeCompare(window.COUNTRIES[b].name, 'es');
        }).map(function(cid){
          return { id:cid, icon:window.COUNTRIES[cid].flag, label:window.COUNTRIES[cid].name, meta:nClubes(cuenta[cid]) };
        });
      }
    },
    {
      clave: 'league', titulo: 'Elegí una o más ligas',
      etiqueta: function(id){ return window.LEAGUES[id] ? window.LEAGUES[id].name : id; },
      opciones: function(){
        var base = clubsQueQuedan('league'), vistas = {};
        base.forEach(function(id){ ligasDe(id).forEach(function(l){ vistas[l] = 1; }); });
        return Object.keys(vistas).sort(function(a, b){
          return window.LEAGUES[a].name.localeCompare(window.LEAGUES[b].name, 'es');
        }).map(function(lid){
          var n = base.filter(function(id){ return ligasDe(id).indexOf(lid) >= 0; }).length;
          return { id:lid, label:window.LEAGUES[lid].name, sub:window.tierLabel(window.LEAGUES[lid].tier), meta:nClubes(n) };
        });
      }
    },
    {
      clave: 'club', titulo: 'Elegí uno o más clubes',
      ayuda: 'Marcá los que quieras: dos son una comparación, y "Elegir todos" arma un grupo entero (una liga, un país) para medirlo como uno solo.',
      todos: true,
      etiqueta: function(id){ return nameOf(id); },
      opciones: function(){
        return ordenados(clubsQueQuedan('club')).map(function(id){
          var n = yearsOf(id).length;
          return { id:id, crest:initials(nameOf(id)), label:nameOf(id), meta: n === 1 ? '1 ejercicio' : n + ' ejercicios' };
        });
      }
    },
    {
      clave: 'year', titulo: 'Elegí uno o más ejercicios',
      // Guido: "el paso 6 queda confuso porque el usuario no tiene claro de quién es
      // cada ejercicio". Con UN club se listan SUS ejercicios, con su etiqueta real
      // ("Balance 2024/2025"). Con varios, un ejercicio no es de nadie en particular:
      // se listan los AÑOS DE CIERRE, y cada uno dice a cuántos de los clubes
      // elegidos les corresponde. Mezclar las dos cosas era el problema.
      ayuda: null,   // se arma abajo, según cuántos clubes haya
      etiqueta: function(y){ return labelAnio(Number(y)); },
      opciones: function(){
        var finales = clubesFinales();
        if(finales.length === 1){
          return yearsOf(finales[0]).map(function(par){
            return { id:String(par[0]), label: labelAnio(par[0]) };
          });
        }
        var anios = {};
        finales.forEach(function(id){ yearsOf(id).forEach(function(par){ anios[par[0]] = 1; }); });
        return Object.keys(anios).map(Number).sort(function(a, b){ return b - a; }).map(function(y){
          var cuantos = finales.filter(function(id){
            return yearsOf(id).some(function(par){ return par[0] === y; });
          }).length;
          var falsos = finales.filter(function(id){ return marcaFalsa(id, y); }).length;
          return {
            id: String(y),
            label: 'Cierre ' + y + (falsos ? (falsos === cuantos ? ' · INVENTADO' : ' · ' + falsos + ' inventados') : ''),
            // Con varios clubes en juego un año no existe para todos, y eso se dice
            // ANTES de elegirlo en vez de sorprender con una barra vacía.
            meta: cuantos + ' de ' + finales.length + ' clubes'
          };
        });
      }
    },
    {
      // PASO 7 (pedido de Guido). Antes, al terminar el paso 6 la página cargaba el
      // club y BAJABA sola hasta los números, con lo cual el selector se iba de la
      // pantalla justo cuando el visitante todavía no había decidido lo más
      // importante: contra qué mide lo que eligió. Ahora esa pregunta es un paso, la
      // página no se mueve sola, y comparar contra otro ejercicio del mismo club
      // —que antes había que ir a buscar a la bandeja— es una casilla más de acá.
      clave: 'vs', titulo: 'Elegí contra qué comparar',
      etiqueta: function(id){
        var tipo = id.slice(0, id.indexOf(':')), val = id.slice(id.indexOf(':') + 1);
        if(tipo === 'year') return labelAnio(Number(val)) + ' del mismo club';
        if(tipo === 'bench') return 'Promedio de ' + (window.LEAGUES[val] ? window.LEAGUES[val].name : val);
        return nameOf(val);
      },
      opciones: function(){
        var finales = clubesFinales();
        var ops = [];
        if(finales.length === 1){
          var id = finales[0];
          var usado = st.year.sel.map(Number);
          // Lo primero, porque es lo que más se pide y lo que peor escondido estaba:
          // el mismo club en otro ejercicio.
          yearsOf(id).forEach(function(par){
            if(usado.indexOf(par[0]) >= 0) return;
            ops.push({ id:'year:' + par[0], icon:'📅', label: labelAnio(par[0]), sub:'El mismo club, otro ejercicio' });
          });
          ligasDe(id).slice(0, 2).forEach(function(lid){
            ops.push({ id:'bench:' + lid, icon:'📊', label:'Promedio de ' + window.LEAGUES[lid].name, sub:'Contra su propia liga' });
          });
          sugeridos(id).forEach(function(rid){
            ops.push({ id:'club:' + rid, crest:initials(nameOf(rid)), label:nameOf(rid), sub:'Otro club' });
          });
        } else if(finales.length <= MAX_SUELTOS){
          var ligas = {};
          finales.forEach(function(x){ ligasDe(x).forEach(function(l){ ligas[l] = 1; }); });
          Object.keys(ligas).slice(0, 3).forEach(function(lid){
            ops.push({ id:'bench:' + lid, icon:'📊', label:'Promedio de ' + window.LEAGUES[lid].name, sub:'Contra la liga entera' });
          });
        }
        return ops;
      }
    }
  ];

  // El label del ejercicio sale de `ejercicioLabel()`, el del sitio, porque un club
  // de año calendario (Japón, Brasil) no dice "2024/2025" sino "2025", y escribir el
  // rango sería una fecha falsa. Con clubes de los dos tipos mezclados no se puede
  // elegir uno solo, así que ahí va el año pelado.
  // Todo ejercicio inventado se anuncia donde se ofrece. Es la mitad visible de la
  // contención que describe la cabecera de prototipo-pasos-datos-inventados.js: el
  // dato de mentira puede estar, pero no puede pasar por real ni por un segundo.
  function marcaFalsa(clubId, year){
    return (window.FOS_DUMMY && window.FOS_DUMMY.esDummy(clubId, year)) ? ' · INVENTADO' : '';
  }

  function labelAnio(y){
    var finales = clubesFinales();
    var conEse = finales.filter(function(id){
      return yearsOf(id).some(function(par){ return par[0] === y; });
    });
    if(!conEse.length || !window.ejercicioLabel) return String(y);
    var calendario = conEse.map(function(id){ return clubs[id].fiscalYearStart === '01-01'; });
    if(calendario.some(Boolean) && calendario.some(function(x){ return !x; })) return String(y);
    var par = yearsOf(conEse[0]).filter(function(p){ return p[0] === y; })[0];
    var falsos = conEse.filter(function(id){ return marcaFalsa(id, y); }).length;
    var marca = !falsos ? ''
      : falsos === conEse.length ? ' · INVENTADO'
      : ' · ' + falsos + ' inventados';
    return window.ejercicioLabel(y, par[1], conEse[0]) + marca;
  }

  function paso(k){ return PASOS.filter(function(p){ return p.clave === k; })[0]; }
  function resuelto(k){ return st[k].resuelto; }
  function pasoActual(){
    for(var i = 0; i < PASOS.length; i++){ if(!resuelto(PASOS[i].clave)) return i; }
    return PASOS.length;
  }
  function todoResuelto(){ return pasoActual() === PASOS.length; }
  function nadaElegido(){
    return CLAVES.every(function(k){ return !st[k].sel.length; });
  }

  // LOS CLUBES QUE SE VAN A MOSTRAR. Si el visitante eligió, son los suyos. Si no
  // eligió ninguno, elegimos nosotros — y `autoElegido` existe para poder DECIRLO
  // en pantalla, que es la mitad de la regla que pidió Guido.
  //
  // El default es Boca contra River (el clásico que pidió). Si el filtro que venía
  // arrastrando deja afuera a alguno de los dos, la regla se generaliza sola: los
  // dos clubes con más ejercicios cargados de lo que quedó, que son los que más
  // tienen para comparar.
  function clubesFinales(){
    if(st.club.sel.length) return st.club.sel.slice();
    var quedan = clubsQueQuedan('club');
    var clasico = ['boca', 'river'].filter(function(id){ return quedan.indexOf(id) >= 0; });
    if(clasico.length === 2) return clasico;
    return porEjercicios(quedan).slice(0, 2);
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

  function opcionBtn(op, marcado, onClick){
    var b = el('button', 'op' + (op.disabled ? ' off' : '') + (marcado ? ' on' : ''));
    b.type = 'button';
    b.appendChild(el('span', 'op-check', marcado ? '✓' : ''));
    if(op.icon) b.appendChild(el('span', 'op-icon', op.icon));
    else if(op.crest) b.appendChild(el('span', 'op-crest', op.crest));
    var txt = el('span', 'op-txt');
    txt.appendChild(el('span', 'op-label', op.label));
    if(op.sub) txt.appendChild(el('span', 'op-sub', op.sub));
    b.appendChild(txt);
    if(op.meta) b.appendChild(el('span', 'op-meta', op.meta));
    if(op.disabled) b.disabled = true;
    else b.addEventListener('click', function(){ onClick(op.id); });
    return b;
  }

  // El resumen de un paso ya resuelto. Tres estados posibles, y los tres se leen
  // distinto a propósito: lo que elegiste, lo que decidiste no decidir, y lo que
  // elegimos nosotros.
  function resumenDe(p){
    var s = st[p.clave];
    if(s.saltado) return 'Elegir más tarde';
    if(!s.sel.length) return '—';
    var nombres = s.sel.map(p.etiqueta);
    if(nombres.length <= 3) return nombres.join(' + ');
    return nombres.slice(0, 2).join(' + ') + ' + ' + (nombres.length - 2) + ' más';
  }

  function render(){
    var wrap = $('pasosWrap');
    if(!wrap) return;
    wrap.innerHTML = '';
    var actual = pasoActual();
    var hayClub = !!api.getClub();

    $('pasosBlock').classList.toggle('con-club', hayClub);
    $('pasosBlock').classList.toggle('plegado', hayClub && !abierto);
    $('pasosResumen').textContent = camino();
    $('pasosToggle').textContent = abierto ? 'Minimizar' : 'Cambiar de club';
    if(hayClub && !abierto) return;

    PASOS.forEach(function(p, i){
      var estado = resuelto(p.clave) ? 'hecho' : (i === actual ? 'ahora' : 'pendiente');
      var card = el('div', 'paso ' + estado + (st[p.clave].saltado ? ' saltado' : ''));

      var head = el('div', 'paso-head');
      head.appendChild(el('span', 'paso-n', String(i + 1)));
      var ht = el('span', 'paso-ht');
      ht.appendChild(el('span', 'paso-t', p.titulo));
      if(estado === 'hecho') ht.appendChild(el('span', 'paso-v', resumenDe(p)));
      head.appendChild(ht);
      if(estado === 'hecho'){
        var cambiar = el('button', 'paso-change', 'Cambiar');
        cambiar.type = 'button';
        cambiar.addEventListener('click', function(){ volverA(i); });
        head.appendChild(cambiar);
      }
      card.appendChild(head);

      if(estado === 'ahora'){
        var body = el('div', 'paso-body');
        var ayuda = p.clave === 'year' ? ayudaDelAnio()
                  : p.clave === 'vs' ? ayudaDelVs()
                  : p.ayuda;
        if(ayuda) body.appendChild(el('p', 'paso-ayuda', ayuda));
        var ops = p.opciones();
        // "Elegir todos" (paso del club): es lo que permite armar un GRUPO —
        // una liga entera, un país entero— en un click, en vez de tildar 11 casillas.
        if(p.todos && ops.length > 1) body.appendChild(botonTodos(p, ops));
        if(!ops.length){
          body.appendChild(el('p', 'paso-vacio', 'No hay nada cargado acá todavía.'));
        } else {
          var grid = el('div', 'op-grid' + (p.clave === 'club' ? ' clubes' : ''));
          ops.forEach(function(op){
            grid.appendChild(opcionBtn(op, tiene(p.clave, op.id), function(id){
              alternar(p.clave, id);
              render();
            }));
          });
          body.appendChild(grid);
        }
        body.appendChild(p.clave === 'vs' ? pieDelVs(p) : pieDelPaso(p));
        card.appendChild(body);
      }
      wrap.appendChild(card);
    });

    if(todoResuelto()) wrap.appendChild(cardResultado());
  }

  function ayudaDelVs(){
    var finales = clubesFinales();
    if(finales.length > MAX_SUELTOS) return 'Un total solo no dice mucho. Armá el grupo rival con estos mismos pasos, o seguí con este.';
    if(finales.length === 1) return 'Un número solo no dice mucho: 60 millones de ingresos es enorme o es poco según contra quién. '
      + 'Podés medirlo contra el mismo club en otro ejercicio, contra el promedio de su liga, o contra otro club.';
    return 'Ya tenés ' + finales.length + ' clubes lado a lado. Podés sumarles el promedio de su liga, o seguir así.';
  }

  function ayudaDelAnio(){
    var finales = clubesFinales();
    if(finales.length === 1) return 'Los ejercicios de ' + nameOf(finales[0]) + '. Si no elegís ninguno, mostramos el más reciente.';
    return 'Son ' + finales.length + ' clubes y no todos cierran el mismo día: un club argentino cierra en junio y uno japonés en diciembre, '
         + 'así que el año es el del CIERRE. Si no elegís ninguno, usamos el ejercicio más reciente de cada uno.';
  }

  function botonTodos(p, ops){
    var libres = ops.filter(function(o){ return !o.disabled; });
    var todosMarcados = libres.length && libres.every(function(o){ return tiene(p.clave, o.id); });
    var b = el('button', 'paso-todos' + (todosMarcados ? ' on' : ''),
      todosMarcados ? 'Sacar todos' : 'Elegir todos (' + libres.length + ')');
    b.type = 'button';
    b.title = 'Para comparar un grupo entero contra otro: una liga, un país, o lo que hayas filtrado';
    b.addEventListener('click', function(){
      st[p.clave].sel = todosMarcados ? [] : libres.map(function(o){ return o.id; });
      render();
    });
    return b;
  }

  // El pie de cada paso: confirmar lo marcado, o decir que esto se decide después.
  // "Elegir más tarde" está SIEMPRE, en los seis pasos: esa es la regla.
  // El pie del paso 7 no es "continuar / más tarde": es la decisión que Guido pidió
  // que fuera explícita — seguir con lo que elegiste, o elegir contra qué medirlo.
  function pieDelVs(p){
    var pie = el('div', 'paso-pie');
    var n = st.vs.sel.length;
    var esGrupo = clubesFinales().length > MAX_SUELTOS;

    var solo = el('button', 'paso-ok' + (n ? ' alt' : ''), esGrupo ? 'Ver el grupo solo' : 'Continuar solo con lo que elegí');
    solo.type = 'button';
    solo.addEventListener('click', function(){
      st.vs.sel = [];
      st.vs.resuelto = true;
      st.vs.saltado = true;
      avanzar();
    });

    if(n){
      var comparar = el('button', 'paso-ok', 'Comparar con ' + (n === 1 ? 'eso' : 'esos ' + n));
      comparar.type = 'button';
      comparar.addEventListener('click', function(){
        st.vs.resuelto = true;
        st.vs.saltado = false;
        avanzar();
      });
      pie.appendChild(comparar);
    }
    pie.appendChild(solo);

    var grupo = el('button', 'paso-skip', 'Compararlo contra un grupo entero (una liga, un país…)');
    grupo.type = 'button';
    grupo.addEventListener('click', function(){
      st.vs.resuelto = true;
      st.vs.saltado = true;
      // Se cierra este lado y empieza el siguiente: el rival es un grupo armado con
      // los mismos 7 pasos, no una lista aparte.
      aplicar(true);
    });
    pie.appendChild(grupo);
    return pie;
  }

  function pieDelPaso(p){
    var pie = el('div', 'paso-pie');
    var n = st[p.clave].sel.length;
    var seguir = el('button', 'paso-ok' + (n ? '' : ' off'), n ? 'Continuar con ' + n + (n === 1 ? ' elegido' : ' elegidos') : 'Continuar');
    seguir.type = 'button';
    seguir.disabled = !n;
    seguir.addEventListener('click', function(){
      st[p.clave].resuelto = true;
      st[p.clave].saltado = false;
      avanzar();
    });
    pie.appendChild(seguir);

    var luego = el('button', 'paso-skip', 'Elegir más tarde');
    luego.type = 'button';
    luego.title = 'Seguimos sin filtrar por esto. Podés volver cuando quieras.';
    luego.addEventListener('click', function(){
      st[p.clave].sel = [];
      st[p.clave].resuelto = true;
      st[p.clave].saltado = true;
      avanzar();
    });
    pie.appendChild(luego);
    return pie;
  }

  // Resolver un paso puede dejar sin sentido lo marcado más abajo (elegir Europa
  // después de haber marcado Boca), así que los de abajo se limpian. Es la misma
  // cascada del "Cambiar", y es lo que hace imposible el bug de la to-do 29.
  function avanzar(){
    if(todoResuelto()) return aplicar();
    render();
  }

  function cardResultado(){
    var finales = clubesFinales();
    var grupo = lados.length > 1 || finales.length > MAX_SUELTOS;
    var card = el('div', 'paso ahora resultado');
    var head = el('div', 'paso-head');
    head.appendChild(el('span', 'paso-n', '✓'));
    var ht = el('span', 'paso-ht');
    ht.appendChild(el('span', 'paso-t', 'Listo'));
    head.appendChild(ht);
    var reiniciar = el('button', 'paso-change', 'Empezar de nuevo');
    reiniciar.type = 'button';
    reiniciar.addEventListener('click', function(){ goHome(); });
    head.appendChild(reiniciar);
    card.appendChild(head);

    var body = el('div', 'paso-body');

    if(grupo){
      // Un grupo no se "ve", se compara: el card lo dice y manda al card de abajo.
      var l = lados[lados.length - 1] || ladoActual();
      body.appendChild(el('p', 'res-msg', lados.length > 1
        ? 'Comparando ' + lados.map(function(x){ return x.nombre; }).join(' contra ') + '.'
        : 'Grupo armado: ' + l.nombre + ' (' + l.clubes.length + ' clubes), sumados.'));
      body.appendChild(el('p', 'res-sub', lados.length > 1
        ? 'Los totales están abajo. Podés sumar un tercer grupo, o sacar uno.'
        : 'Abajo está el total del grupo. Para que sirva de verdad hace falta contra qué medirlo: armá el segundo.'));
      var bg = el('button', 'paso-ok', lados.length > 1 ? 'Agregar otro grupo' : 'Comparar contra otro grupo');
      bg.type = 'button';
      bg.addEventListener('click', nuevoLado);
      body.appendChild(bg);
      var verG = el('button', 'paso-skip', 'Ver los totales');
      verG.type = 'button';
      verG.addEventListener('click', function(){
        var c = $('gruposCard');
        if(c && !c.hidden) c.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      body.appendChild(verG);
      card.appendChild(body);
      return card;
    }

    if(autoElegido){
      // La regla 3 de Guido: si no elegiste nada, elegimos nosotros Y TE LO DECIMOS.
      body.appendChild(el('p', 'res-msg',
        'No elegiste nada, así que elegimos por vos: ' + finales.map(nameOf).join(' contra ') + '.'));
      body.appendChild(el('p', 'res-sub',
        'Es el clásico más cargado del sitio. Cambiá cualquier paso de arriba para ver otra cosa.'));
    } else if(finales.length === 1 && st.year.sel.length > 1){
      // Un club contra sí mismo en dos ejercicios TAMBIÉN es una comparación, así
      // que acá no corresponde el empujón de "sumá un rival": ya está comparando.
      body.appendChild(el('p', 'res-msg',
        'Comparando ' + nameOf(finales[0]) + ' en ' + st.year.sel.length + ' ejercicios: '
        + st.year.sel.map(function(y){ return labelAnio(Number(y)); }).join(' contra ') + '.'));
      var ver2 = el('button', 'paso-ok', 'Ver la comparación');
      ver2.type = 'button';
      ver2.addEventListener('click', function(){
        var c = $('compareCard');
        if(c && !c.hidden) c.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      body.appendChild(ver2);
    } else if(finales.length === 1 && !(window.CLUB_COMPARE && window.CLUB_COMPARE.count())){
      // La regla 4: un club solo no es el destino. En vez de felicitar al visitante
      // por haber llegado, el card le muestra contra quién puede comparar.
      body.appendChild(el('p', 'res-msg', 'Estás viendo ' + nameOf(finales[0]) + ', solo.'));
      body.appendChild(el('p', 'res-sub', 'Un número solo no dice mucho: 60 millones de ingresos es enorme o es poco según contra quién. Sumá un rival y las dos columnas se miran juntas.'));
      var grid = el('div', 'op-grid sugeridos');
      sugeridos(finales[0]).forEach(function(id){
        var co = window.COUNTRIES[countryOf(id)];
        grid.appendChild(opcionBtn({
          id:id, crest:initials(nameOf(id)), label:nameOf(id),
          sub: (co ? co.flag + ' ' : '') + (ligasDe(id)[0] && window.LEAGUES[ligasDe(id)[0]] ? window.LEAGUES[ligasDe(id)[0]].name : '')
        }, false, function(cid){ sumarRival(cid); }));
      });
      body.appendChild(grid);
      var otro = el('button', 'paso-skip', 'Elegir otro rival de la lista');
      otro.type = 'button';
      otro.addEventListener('click', function(){ volverA(4); });
      body.appendChild(otro);
      var contraGrupo = el('button', 'paso-skip', 'O compararlo contra un grupo entero');
      contraGrupo.type = 'button';
      contraGrupo.title = 'Una liga, un país, o los clubes que elijas, sumados';
      contraGrupo.addEventListener('click', nuevoLado);
      body.appendChild(contraGrupo);
    } else {
      body.appendChild(el('p', 'res-msg', 'Comparando ' + finales.map(nameOf).join(' · ') + '.'));
      // (si finales quedó en 1 pero hay rivales sumados desde este mismo card, el
      //  nombre del rival ya está en st.club.sel y entra en `finales`)
      var verCmp = el('button', 'paso-ok', 'Ver la comparación ↓');
      verCmp.type = 'button';
      verCmp.addEventListener('click', irAlContenido);
      body.appendChild(verCmp);
    }
    // Bajar hasta los números es un botón, no algo que pase solo.
    var ver = el('button', 'paso-skip', 'Ver los números ↓');
    ver.type = 'button';
    ver.addEventListener('click', irAlContenido);
    body.appendChild(ver);

    card.appendChild(body);
    return card;
  }

  // Contra quién ofrecer. Primero los de su misma liga (que es la comparación que
  // se sostiene sola), después los que más ejercicios tienen cargados, que son los
  // que más tienen para mostrar. Nunca una lista editorial de "clubes importantes".
  function sugeridos(clubId){
    var ligas = ligasDe(clubId);
    var mismos = porEjercicios(Object.keys(window.CLUB_INDEX).filter(function(id){
      return clubs[id] && id !== clubId && ligasDe(id).some(function(l){ return ligas.indexOf(l) >= 0; });
    }));
    var resto = porEjercicios(Object.keys(window.CLUB_INDEX).filter(function(id){
      return clubs[id] && id !== clubId && mismos.indexOf(id) < 0;
    }));
    return mismos.concat(resto).slice(0, 3);
  }

  function camino(){
    if(lados.length){
      var nombres = lados.map(function(l, i){ return LETRAS[i] + ': ' + l.nombre; }).join('   ·   ');
      return nombres + (todoResuelto() ? '' : '   ·   armando el ' + LETRAS[lados.length] + '…');
    }
    if(autoElegido) return 'Elegimos por vos: ' + clubesFinales().map(nameOf).join(' contra ');
    var partes = [];
    PASOS.forEach(function(p){
      if(st[p.clave].sel.length) partes.push(resumenDe(p));
    });
    return partes.length ? partes.join('  ›  ') : 'Todavía sin elegir';
  }

  // ---------------------------------------------------------------------------
  // APLICAR: de la selección a lo que el sitio muestra.
  //
  // El club 0 pasa a ser el club activo (el modelo de `js/comparar-clubes.js` lo
  // tiene como sujeto 0 y no se puede comparar sin él) y los demás entran como
  // rivales. Los ejercicios elegidos se aplican DESPUÉS de que estén los sujetos,
  // porque hasta que un sujeto no existe no hay a qué ponerle el año.
  // ---------------------------------------------------------------------------
  // GRUPO CHICO vs GRUPO GRANDE. Con hasta 4 clubes conviene la comparación que el
  // sitio ya tiene (una barra por club, con su nombre y su año). De 5 para arriba
  // eso deja de leerse, y además es el caso que Guido pidió: ahí el grupo se SUMA y
  // se muestra como un lado. El corte en 4 no es un gusto: es el MAX de sujetos de
  // js/comparar-clubes.js (4 rivales + el club activo).
  var MAX_SUELTOS = 5;

  // `seguirConOtroGrupo`: el paso 7 eligió armar el lado rival, así que después de
  // aplicar este lado los pasos vuelven a cero en vez de quedarse en el final.
  function aplicar(seguirConOtroGrupo){
    var finales = clubesFinales();
    autoElegido = !st.club.sel.length;
    var lado = ladoActual();
    // Un lado por selección terminada. Si ya había uno, este es el rival.
    lados.push(lado);
    var comoGrupo = lados.length > 1 || finales.length > MAX_SUELTOS;
    var rivales = comoGrupo ? [] : finales.slice(1);
    // Lo que sumó el paso 7: otros ejercicios del mismo club, el promedio de una
    // liga, o clubes sueltos.
    var vs = st.vs.sel.slice();
    var aniosExtra = vs.filter(function(v){ return v.indexOf('year:') === 0; })
                       .map(function(v){ return Number(v.slice(5)); });

    Promise.resolve(api.pickClub(finales[0])).then(function(){
      try { localStorage.setItem(LS_CLUB, finales[0]); } catch(e){}
      renderButton();
      var cmp = window.CLUB_COMPARE;
      var cadena = Promise.resolve();
      if(cmp){
        rivales.forEach(function(id){
          cadena = cadena.then(function(){ return cmp.toggleClub(id); });
        });
        vs.forEach(function(v){
          if(v.indexOf('club:') === 0) cadena = cadena.then(function(){ return cmp.toggleClub(v.slice(5)); });
          if(v.indexOf('bench:') === 0) cadena = cadena.then(function(){ return cmp.toggleBench(v.slice(6)); });
        });
        // El mismo club en otro ejercicio. Se usa el botón "+ Otro año" que el sitio
        // ya tiene, en vez de duplicar la lógica de qué años quedan libres.
        // OJO: se clickea AUNQUE ESTÉ hidden — ese botón vive en el card de
        // comparación de Inicio, que recién aparece cuando el club está dibujado, y
        // `hidden` solo cambia cómo se ve: el listener corre igual. Con un guard de
        // `!hidden`, esta comparación se perdía en silencio.
        aniosExtra.forEach(function(){
          cadena = cadena.then(function(){
            var btn = $('ccYearBtn') || $('trayAddYear');
            if(btn) btn.click();
          });
        });
      }
      return cadena;
    }).then(function(){
      if(!comoGrupo){
        // El orden de los sujetos manda: primero los ejercicios que eligió el paso 6
        // (o `null`, que significa "dejale al club el suyo por default"), después los
        // que sumó el paso 7. `null` NO es lo mismo que "el más reciente": es "no
        // toques nada", y por eso viaja en la lista en vez de resolverse acá.
        var principales = st.year.sel.map(Number).sort(function(a, b){ return b - a; });
        var lista = (principales.length ? principales : [null]).concat(aniosExtra);
        aplicarAnios(finales, lista, principales.length > 0);
      }
      render();
      if(comoGrupo){
        // Los totales necesitan los data files de TODOS los clubes del lado: se
        // bajan acá, y recién con eso se puede sumar.
        var caja = $('gruposCard');
        if(caja){ caja.hidden = false; caja.innerHTML = '<p class="gc-cargando">Sumando los clubes del grupo…</p>'; }
        Promise.all(lados.map(cargarLado)).then(function(){ renderGrupos(); });
      } else {
        renderGrupos();
      }
      if(seguirConOtroGrupo) nuevoLado();
      // La página NO se mueve sola (lo levantó Guido: "de repente scrollea y no veo
      // más el selector"). Bajar es una decisión del visitante, y el card final
      // tiene el botón.
    });
  }

  // Los años elegidos. Tres casos, y ninguno inventa un dato que no exista:
  //   - un club y un año        -> la ficha de Finanzas de ese ejercicio;
  //   - un club y varios años   -> ese club contra sí mismo, un sujeto por año;
  //   - varios clubes y un año  -> cada uno en ese año, y el que no lo tenga se
  //                                queda en el suyo (se avisa en el paso).
  function aplicarAnios(finales, anios, moverActivo){
    anios = (anios || []).filter(function(y, i){ return y != null || i === 0; });
    if(!anios.length) return;
    var cmp = window.CLUB_COMPARE;

    if(finales.length === 1 && anios.length > 1 && cmp){
      // Un sujeto por ejercicio. Los que ya agregó el paso 7 no se duplican: se
      // cuenta cuántos chips hay y se completa hasta la cantidad de años elegidos.
      var yaHay = Math.max(1, document.querySelectorAll('#trayChips .chip').length);
      for(var i = yaHay; i < anios.length; i++){
        var btn = $('ccYearBtn') || $('trayAddYear');
        if(btn) btn.click();
      }
    }
    if(moverActivo && anios[0] != null && window.goToFinanzasYear) window.goToFinanzasYear(finales[0], anios[0]);
    // La bandeja de comparación se vuelve a dibujar sola después de cambiar el año
    // del club activo, y ese redibujo es ASÍNCRONO (adentro carga el data file del
    // club). Si los chips se tocan una sola vez, el redibujo los pisa: pasó de
    // verdad, el segundo chip se quedaba con el año automático. Por eso se intenta
    // varias veces; la función es idempotente (solo escribe si el año difiere y es
    // una opción válida para ese sujeto).
    [0, 250, 700, 1400].forEach(function(ms){
      setTimeout(function(){ fijarAniosDeChips(finales, anios); }, ms);
    });
  }

  // Los chips de la bandeja de comparación traen su propio <select> de ejercicio
  // (`.chip-year`, js/comparar-clubes.js). En vez de duplicar acá la lógica de qué
  // años son válidos para cada sujeto, se usa ESE control: si el año elegido no es
  // una opción suya, no se toca y el sujeto se queda con el que tenía.
  function fijarAniosDeChips(finales, anios){
    var chips = document.querySelectorAll('#trayChips .chip');
    for(var i = 0; i < chips.length; i++){
      var nombre = chips[i].querySelector('.chip-name');
      var sel = chips[i].querySelector('.chip-year');
      if(!nombre || !sel) continue;
      // Un ejercicio por chip cuando es el mismo club repetido; si no, el mismo año
      // para todos. Un hueco en la lista (null) es "dejá el que tiene".
      var objetivo = finales.length === 1 ? anios[i] : anios[0];
      if(objetivo == null) continue;
      var existe = Array.prototype.some.call(sel.options, function(o){ return Number(o.value) === objetivo && !o.disabled; });
      if(!existe || Number(sel.value) === objetivo) continue;
      sel.value = String(objetivo);
      sel.dispatchEvent(new Event('change', { bubbles:true }));
    }
  }

  // "Cambiar" en un paso ya resuelto borra ESE y todos los de abajo. Volver atrás
  // sin invalidar lo que dependía de esa elección es justo el bug que tiene hoy el
  // selector de columnas (to-do 29).
  function volverA(i){
    for(var k = i; k < CLAVES.length; k++){
      st[CLAVES[k]] = { sel:[], resuelto:false, saltado:false };
    }
    // El último lado se estaba armando con estos pasos: si se toca un paso, ese
    // lado deja de ser lo que decía. Los lados anteriores, ya cerrados, se quedan.
    if(todoResuelto() || lados.length) lados.pop();
    renderGrupos();
    autoElegido = false;
    abierto = true;
    if(window.CLUB_COMPARE) window.CLUB_COMPARE.clear();
    Promise.resolve(api.pickClub(null)).then(function(){
      try { localStorage.removeItem(LS_CLUB); } catch(e){}
      renderButton();
      render();
    });
  }

  // Sumar un rival desde el card final, sin volver a recorrer nada.
  function sumarRival(id){
    if(!window.CLUB_COMPARE) return;
    if(st.club.sel.indexOf(id) < 0) st.club.sel.push(id);
    autoElegido = false;
    Promise.resolve(window.CLUB_COMPARE.toggleClub(id)).then(function(){ render(); });
  }

  function irAlContenido(){
    var card = $('compareCard');
    if(card && !card.hidden) return card.scrollIntoView({ behavior:'smooth', block:'start' });
    var secs = document.querySelectorAll('main > section');
    for(var i = 0; i < secs.length; i++){
      if(secs[i].classList.contains('active') && secs[i].style.display !== 'none'){
        secs[i].scrollIntoView({ behavior:'smooth', block:'start' });
        return;
      }
    }
  }


  // ===========================================================================
  // LADOS (GRUPOS) Y SUS TOTALES
  //
  // Lo que falta en el sitio y esto prototipa: sumar clubes y ligas de un lado y
  // medirlos contra otro. `js/comparar-clubes.js` compara sujetos SUELTOS (hasta 5)
  // y su "promedio de liga" es un promedio, no un total. Acá un lado es un
  // conjunto y se suma.
  //
  // LAS 3 REGLAS DE HONESTIDAD DE ESTA VISTA, que son las mismas del resto del
  // sitio y por eso no se negocian:
  //   1. Un club sin el ejercicio pedido NO cuenta como cero: queda afuera del
  //      total y el card dice cuántos quedaron afuera.
  //   2. Un indicador que la fuente no informa (deuda de un presupuesto, masa
  //      salarial sin desglosar) no suma cero: se cuenta aparte y se muestra
  //      "9 de 12 informan".
  //   3. Los números salen de `computeYearGeneric()`, el motor real, y se
  //      convierten con `toDisplayValue()`. Acá no se reimplementa ninguna
  //      cascada: se suma lo que el motor ya calculó, club por club.
  // ===========================================================================

  // El último ejercicio REAL de un club, según el índice liviano.
  function ultimoAnio(id){
    var ys = yearsOf(id);
    return ys.length ? ys[0][0] : null;
  }

  // Los 4 indicadores de un club-ejercicio, en USD. Es la misma cuenta que hace
  // `financialsFor()` adentro de js/comparar-clubes.js (que es privada), con sus
  // mismos tests de "esto la fuente no lo informa".
  function numerosDe(id, year){
    var c = window.computeYearGeneric(id, year);
    if(!c) return null;
    var meta = window.yearMetaFor(id, year);
    var usd = function(v){ return window.toDisplayValue(v, meta, 'USD'); };
    var sinDeuda = (c.meta.grossDebt == null && c.meta.cash == null)
                || (c.meta.grossDebt === 0 && c.meta.cash === 0);
    return {
      year: year,
      revenue: usd(c.revenue),
      expenses: Math.abs(usd(c.expenses + c.nonCash)),
      pat: usd(c.pat),
      netDebt: sinDeuda ? null : usd(c.netDebt)
    };
  }

  var INDICADORES = [
    { key:'revenue',  label:'Ingresos' },
    { key:'expenses', label:'Gastos' },
    { key:'pat',      label:'Resultado del ejercicio', signo:true },
    { key:'netDebt',  label:'Deuda neta', signo:true }
  ];

  function totalesDeLado(lado){
    var out = { nombre:lado.nombre, n:lado.clubes.length, conDato:0, sinEjercicio:[], anios:[], presupuestos:0, tot:{}, informan:{} };
    INDICADORES.forEach(function(m){ out.tot[m.key] = 0; out.informan[m.key] = 0; });
    lado.clubes.forEach(function(id){
      var y = lado.anio || ultimoAnio(id);
      var tieneEse = y && yearsOf(id).some(function(par){ return par[0] === y; });
      if(!tieneEse){ out.sinEjercicio.push(nameOf(id)); return; }
      var n = numerosDe(id, y);
      if(!n){ out.sinEjercicio.push(nameOf(id)); return; }
      out.conDato++;
      out.anios.push(y);
      // Un presupuesto es una PROYECCIÓN, no un cierre. Sumarlo con balances no
      // está mal —es lo último que publicó ese club— pero el total deja de ser
      // "lo que pasó" y el card tiene que decirlo.
      var tipo = (yearsOf(id).filter(function(par){ return par[0] === y; })[0] || [])[1];
      if(tipo === 'official_budget') out.presupuestos++;
      INDICADORES.forEach(function(m){
        if(n[m.key] == null) return;
        out.tot[m.key] += n[m.key];
        out.informan[m.key]++;
      });
    });
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

  // El nombre de un lado sale de lo que el visitante eligió, no de una caja de
  // texto: si marcó todos los clubes de una liga, el lado se llama como la liga.
  function nombreDeSeleccion(){
    var sel = st.club.sel;
    if(sel.length === 1) return nameOf(sel[0]);
    var universo = clubsQueQuedan('club');
    var completo = sel.length && sel.length === universo.length;
    var ctx = null;
    if(st.league.sel.length === 1) ctx = window.LEAGUES[st.league.sel[0]].name;
    else if(st.country.sel.length === 1) ctx = window.COUNTRIES[st.country.sel[0]].name;
    else if(st.region.sel.length === 1){
      var r = window.REGIONS.filter(function(x){ return x.id === st.region.sel[0]; })[0];
      ctx = r ? r.name : null;
    }
    if(completo && ctx) return ctx + ' (' + sel.length + ')';
    if(sel.length <= 3 && sel.length) return sel.map(nameOf).join(' + ');
    return (ctx ? ctx + ': ' : '') + sel.length + ' clubes';
  }

  function ladoActual(){
    return {
      nombre: nombreDeSeleccion() || 'Selección',
      clubes: clubesFinales(),
      anio: st.year.sel.length ? Number(st.year.sel[0]) : null
    };
  }

  // Un lado hay que BAJARLO antes de sumarlo: los data files de sus clubes se
  // cargan por demanda, y sin ellos `computeYearGeneric()` no tiene con qué.
  function cargarLado(lado){
    return Promise.all(lado.clubes.map(function(id){
      return window.loadClubData ? window.loadClubData(id).catch(function(){ return null; }) : null;
    }));
  }

  function renderGrupos(){
    var caja = $('gruposCard');
    if(!caja) return;
    if(lados.length < 1){ caja.hidden = true; caja.innerHTML = ''; return; }
    caja.hidden = false;
    caja.innerHTML = '';

    var head = el('div', 'gc-head');
    head.appendChild(el('h2', null, lados.length > 1 ? 'Grupo contra grupo' : 'El grupo, sumado'));
    var sub = el('p', 'gc-sub', lados.length > 1
      ? 'Cada columna es un grupo entero sumado, no un club. Los totales son en USD.'
      : 'Los clubes que elegiste, sumados. Agregá otro grupo para compararlo contra este.');
    head.appendChild(sub);
    caja.appendChild(head);

    var tots = lados.map(totalesDeLado);

    var tabla = el('table', 'gc-tabla');
    var thead = el('thead');
    var trh = el('tr');
    trh.appendChild(el('th', null, ''));
    tots.forEach(function(t, i){
      var th = el('th');
      th.appendChild(el('span', 'gc-letra', LETRAS[i]));
      th.appendChild(el('span', 'gc-nombre', t.nombre));
      th.appendChild(el('span', 'gc-meta', t.conDato + ' de ' + t.n + (t.n === 1 ? ' club' : ' clubes') + ' · ejercicio ' + rangoAnios(t)));
      tabla.appendChild(th);
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    tabla.appendChild(thead);

    var tbody = el('tbody');
    INDICADORES.forEach(function(m){
      var tr = el('tr');
      tr.appendChild(el('th', 'gc-ind', m.label));
      var maxAbs = Math.max.apply(null, tots.map(function(t){
        return t.informan[m.key] ? Math.abs(t.tot[m.key]) : 0;
      })) || 1;
      tots.forEach(function(t){
        var td = el('td');
        if(!t.informan[m.key]){
          td.appendChild(el('span', 'gc-nodato', 'sin dato'));
        } else {
          var v = t.tot[m.key];
          td.appendChild(el('span', 'gc-num' + (m.signo && v < 0 ? ' neg' : ''), fmtM(v)));
          var barra = el('span', 'gc-bar');
          var relleno = el('span', 'gc-bar-in' + (m.signo && v < 0 ? ' neg' : ''));
          relleno.style.width = Math.round((Math.abs(v) / maxAbs) * 100) + '%';
          barra.appendChild(relleno);
          td.appendChild(barra);
          // La mitad de la honestidad del card: cuántos de los clubes del lado
          // informan ESTE indicador. Sumar 9 deudas y presentarlo como la deuda de
          // 12 clubes sería inventar 3 ceros.
          if(t.informan[m.key] < t.conDato){
            td.appendChild(el('span', 'gc-meta', t.informan[m.key] + ' de ' + t.conDato + ' lo informan'));
          }
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    caja.appendChild(tabla);

    var avisos = [];
    tots.forEach(function(t, i){
      if(t.sinEjercicio.length){
        avisos.push(LETRAS[i] + ': ' + t.sinEjercicio.length + ' club' + (t.sinEjercicio.length > 1 ? 'es' : '')
          + ' sin ese ejercicio cargado, afuera del total (' + t.sinEjercicio.slice(0, 4).join(', ')
          + (t.sinEjercicio.length > 4 ? ', y ' + (t.sinEjercicio.length - 4) + ' más' : '') + ').');
      }
    });
    // Dos salvedades que un total de grupo esconde si nadie las dice.
    tots.forEach(function(t, i){
      if(t.anios.length > 1){
        var min = Math.min.apply(null, t.anios), max = Math.max.apply(null, t.anios);
        if(max - min >= 2){
          avisos.push(LETRAS[i] + ': los ejercicios sumados van de ' + min + ' a ' + max
            + '. No es el total de una temporada, es el último ejercicio de cada club, y algunos son bastante más viejos que otros.');
        }
      }
      if(t.presupuestos){
        avisos.push(LETRAS[i] + ': ' + t.presupuestos + ' de los ' + t.conDato + ' ejercicios sumados '
          + (t.presupuestos === 1 ? 'es un PRESUPUESTO, o sea una proyección' : 'son PRESUPUESTOS, o sea proyecciones')
          + ' del club, no un cierre auditado.');
      }
    });
    avisos.push('Un club sin el dato no suma cero: queda afuera y se cuenta aparte. Los totales de grupos con distinta cantidad de clubes no son comparables entre sí sin mirar esa cuenta.');
    var pie = el('div', 'gc-avisos');
    avisos.forEach(function(a){ pie.appendChild(el('p', null, a)); });
    caja.appendChild(pie);

    var acciones = el('div', 'gc-acciones');
    var mas = el('button', 'paso-ok', lados.length > 1 ? 'Agregar otro grupo' : 'Comparar contra otro grupo');
    mas.type = 'button';
    mas.addEventListener('click', nuevoLado);
    acciones.appendChild(mas);
    lados.forEach(function(l, i){
      var quitar = el('button', 'paso-skip', 'Sacar ' + LETRAS[i]);
      quitar.type = 'button';
      quitar.addEventListener('click', function(){
        lados.splice(i, 1);
        renderGrupos();
        render();
      });
      acciones.appendChild(quitar);
    });
    caja.appendChild(acciones);
  }

  // Empezar otro lado: se guarda el actual y los pasos vuelven a cero, con la
  // barra de arriba mostrando lo que ya está armado.
  function nuevoLado(){
    reset();
    autoElegido = false;
    abierto = true;
    render();
    $('pasosBlock').scrollIntoView({ behavior:'smooth', block:'start' });
  }

  // ---------------------------------------------------------------------------
  // BUSCADOR. El atajo que compensa lo que los pasos esconden: quien ya sabe qué
  // club quiere no tiene por qué recorrer 6 niveles. Busca por club, país y liga,
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
      var ligas = ligasDe(id).map(function(l){ return window.LEAGUES[l].name; }).join(' ');
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
        id:id, crest:initials(nameOf(id)), label:nameOf(id),
        sub: (co ? co.flag + ' ' + co.name : ''),
        meta: n === 1 ? '1 ejercicio' : n + ' ejercicios'
      }, false, function(cid){
        // Elegir desde la búsqueda deja los pasos coherentes con lo que ves: se
        // marcan solos con el camino de ese club, en vez de quedar vacíos.
        pararseEn(cid);
        $('pasosQ').value = '';
        renderBusqueda();
        aplicar();
      }));
    });
    caja.appendChild(grid);
  }

  function pararseEn(clubId){
    reset();
    var ligas = ligasDe(clubId);
    st.sport.sel = [sportOf(clubId)];
    st.region.sel = [regionOf(clubId)];
    st.country.sel = [countryOf(clubId)];
    st.league.sel = ligas.length ? [ligas[0]] : [];
    st.league.saltado = !ligas.length;
    st.club.sel = [clubId];
    st.year.saltado = true;
    CLAVES.forEach(function(k){ st[k].resuelto = true; });
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
    reset();
    lados = [];
    renderGrupos();
    autoElegido = false;
    abierto = true;
    if(window.CLUB_COMPARE) window.CLUB_COMPARE.clear();
    try { localStorage.removeItem(LS_CLUB); } catch(e){}
    Promise.resolve(api.pickClub(null)).then(function(){ renderButton(); render(); });
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

// ============================================================================
// prototipo-cards-selector.js — PROTOTIPO 4: dos cards vacíos en la portada, y
// cada uno se llena con el selector PASO A PASO adentro de un modal.
//
// ESTO NO ES EL SITIO. Lo carga solo `Prototyping/prototipo-cards.html`. Los
// prototipos 1, 2 y 3 quedan como están: son cuatro formas de resolver la misma
// pantalla, para poder compararlas.
//
// DE DÓNDE SALE (Guido, después de probar el 3): "no me gusta el prototipo 3.
// Quiero ver un prototipo 4: Inicio comienza con un card como el attached pero
// claramente los cards están vacíos. Apretás el card y se dispara un modal que es
// el selector del prototipo 2, pero a ese selector quitale el paso que es para
// comparar con otra cosa".
//
// LA IDEA: es el 3 POR FUERA y el 2 POR DENTRO, y eso resuelve el problema que
// tenían los dos por separado.
//   - El 3 metía el árbol entero adentro de cada columna. Entra, pero la portada
//     abre con dos árboles de cinco niveles a la vez: es el mismo exceso de
//     información que el 2 vino a corregir, ahora duplicado.
//   - El 2 preguntaba de a un paso, pero comparar obligaba a pasar por el
//     selector dos veces, y de ahí salía la casuística del paso 7.
// Con dos cards vacíos, la portada abre con UNA pregunta ("¿qué querés ver?",
// dos veces), y toda la complejidad de elegir vive adentro del modal, de a un
// paso, sin competir con nada.
//
// POR QUÉ SE VA EL PASO 7 (el "contra qué comparar"): porque ya no hay nada que
// preguntar. Ese paso existía en el 2 para resolver "y ahora contra qué mido
// esto", que es exactamente la pregunta que los dos cards contestan en la
// pantalla misma. El card B ES el rival. Sacarlo no pierde ninguna función: la
// mueve a un lugar donde no hace falta explicarla.
//
// Y UN CAMBIO QUE SE CAE DE MADURO AL SACARLO: el paso del club ya no pregunta
// "¿comparar entre los N o armar un grupo con los N?". Un card es UN lado, y un
// lado se mide como uno solo: si marcaste cinco clubes, eso es un conjunto. Lo
// único que queda por decidir es si ese conjunto se lee sumado o promediado, y
// eso se elige después, en el card, viéndolo.
//
// QUÉ SE HEREDA DE CADA UNO, literal:
//   - del prototipo 2: los 6 pasos (`PASOS`), el filtro único `clubsQueQuedan()`,
//     "Elegir más tarde" en todos los pasos, la multi-selección con casillas, el
//     card resuelto encogido a una línea, y el buscador como atajo de un paso;
//   - del prototipo 3: el cálculo de un lado con `computeYearGeneric()` club por
//     club, la tabla de A contra B, los avisos, y el toggle "comparar dos / ver
//     uno".
//
// SEGUNDA VUELTA (Guido, 2026-09-15): "en Inicio, preguntá al usuario 'quiero ver
// un club en particular' vs 'quiero comparar dos clubes o ligas'. Si contesta el
// primero, llevalo a Finanzas y ahí mostrá el selector. Si contesta el segundo,
// llevalo a un tab llamado Comparar, que es el Inicio de hoy".
//
// QUÉ CAMBIA, Y POR QUÉ ES MÁS QUE MOVER CAJAS: hasta acá los dos cards eran la
// portada, así que TODA visita empezaba mirando una pantalla partida al medio,
// incluida la mayoría, que viene por un club y nada más. Ahora la portada es una
// sola pregunta de dos opciones, y cada respuesta lleva a una pantalla que hace
// una sola cosa:
//   - "un club en particular" -> el modal de pasos, y al confirmar, FINANZAS;
//   - "comparar dos"          -> la pestaña Comparar, que es la de los dos cards.
// El mismo modal sirve para los dos caminos: lo único que cambia es a dónde va lo
// elegido, y eso es `origen`.
//
// La API pública es la MISMA que la de `js/selector.js`, porque `index.html` y
// `js/comparar-clubes.js` la llaman sin saber cuál está cargada.
// ============================================================================

window.CLUB_SELECTOR = (function(){
  'use strict';

  var LS_CLUB = 'fos_club';
  var LETRAS = ['A', 'B'];
  var MAX_SUELTOS = 5;

  // UN LADO es lo que ocupa un card, y es siempre lo mismo: una lista de pares
  // (club, ejercicio) que se mide como una sola cosa. Un club suelto es el caso de
  // un par; una liga entera son 11. No hay dos formas de lado, hay una.
  //   { nombre, pares:[[clubId, anio|null]], modo:'promedio'|'total', ctx }
  // `anio` en null significa "el ejercicio más reciente de ESE club", que es lo
  // que corresponde cuando el visitante saltó el paso 6 y los clubes no cierran
  // todos el mismo día.
  var lado = [null, null];
  // La pestaña Comparar SIEMPRE muestra los dos cards. El modo 'uno' existió mientras
  // esta pantalla era la portada y tenía que servir a las dos intenciones; ahora la
  // intención se declara en Inicio, y el que quiere un club solo no llega hasta acá.
  // La variable queda porque la leen los textos, pero ya no cambia.
  var modo = 'duelo';
  var mostrando = false;
  var inited = false;

  // --- El modal de pasos -----------------------------------------------------
  // DE DÓNDE SE ABRIÓ, que es lo único que distingue los dos caminos:
  //   'vs'       -> lo abrió un card de la pestaña Comparar; lo elegido llena ese card.
  //   'finanzas' -> lo abrió Inicio ("ver un club") o el selector de Finanzas; lo
  //                 elegido se carga como club activo y la pantalla salta a Finanzas.
  var origen = 'vs';
  var modalLado = 0;                 // qué card lo abrió
  var CLAVES = ['sport', 'region', 'country', 'league', 'club', 'year'];
  var st = {};
  var stGuardado = [null, null];     // lo elegido por cada card, para poder volver
  function reset(){
    CLAVES.forEach(function(k){ st[k] = { sel:[], resuelto:false, saltado:false }; });
  }
  reset();

  var api = {
    getClub: function(){ return null; },
    pickClub: function(){ return Promise.resolve(); }
  };

  // OJO: `clubs` se declara con `const` en su data file, así que NO es una
  // propiedad de `window` (a diferencia de `CLUB_INDEX`, que se asigna, y de las
  // funciones de leagues.js/club-leagues.js, que quedan colgadas de window por ser
  // declaraciones de función). Referenciarlo como `window.clubs` da undefined y
  // rompe todo; está documentado dos veces en este repo y costó media hora dos
  // veces.
  function $(id){ return document.getElementById(id); }

  // Cambiar de pestaña APRETANDO EL BOTÓN del nav, en vez de repetir acá las clases
  // `active` que pone el <script> de index.html. Si mañana esa navegación cambia,
  // este prototipo no se entera; reimplementarla es garantizarse dos verdades.
  function irASeccion(id){
    var btn = document.querySelector('#mainNav button[data-section="' + id + '"]');
    if(btn) btn.click();
    window.scrollTo(0, 0);
  }
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
  function norm(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function el(tag, cls, txt){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(txt != null) e.textContent = txt;
    return e;
  }
  function tiene(k, id){ return st[k].sel.indexOf(id) >= 0; }
  function alternar(k, id){
    var i = st[k].sel.indexOf(id);
    if(i >= 0) st[k].sel.splice(i, 1); else st[k].sel.push(id);
  }

  // Todo ejercicio inventado se anuncia donde se ofrece. Es la mitad visible de la
  // contención que describe la cabecera de prototipo-pasos-datos-inventados.js: el
  // dato de mentira puede estar, pero no puede pasar por real ni por un segundo.
  function marcaFalsa(clubId, year){
    return (window.FOS_DUMMY && window.FOS_DUMMY.esDummy(clubId, year)) ? ' · INVENTADO' : '';
  }

  // ---------------------------------------------------------------------------
  // QUÉ CLUBES QUEDAN. Un solo filtro, del que salen TODOS los conteos: si el
  // número que muestra un paso no sale de la misma función que arma la lista del
  // paso siguiente, tarde o temprano dicen cosas distintas. Dentro de un paso los
  // valores se suman (Argentina O Brasil); entre pasos se cruzan (Sudamérica Y
  // primera división). Copiado tal cual del prototipo 2.
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

  // LOS CLUBES DEL LADO QUE SE ESTÁ ARMANDO. Si el visitante marcó clubes, son
  // esos. Si no marcó ninguno, son TODOS los que sobrevivieron a sus filtros, y el
  // card final lo dice con todas las letras antes de confirmar.
  //
  // Es distinto del prototipo 2, que en ese caso elegía Boca contra River: allá el
  // selector tenía que entregar una comparación entera, así que un default de dos
  // clubes tenía sentido. Acá el selector entrega UN lado, y el default honesto de
  // "no filtré nada" no es un club famoso: es todo lo que hay.
  function clubesDelLado(){
    if(st.club.sel.length) return st.club.sel.slice();
    return ordenados(clubsQueQuedan('club'));
  }

  function labelAnio(y, ids){
    var finales = ids || clubesDelLado();
    var conEse = finales.filter(function(id){
      return yearsOf(id).some(function(par){ return par[0] === y; });
    });
    if(!conEse.length || !window.ejercicioLabel) return String(y);
    // Con clubes de año calendario (Japón, Brasil) mezclados con clubes de
    // temporada partida, "2024/2025" sería una fecha falsa para la mitad: ahí va el
    // año pelado.
    var calendario = conEse.map(function(id){ return clubs[id].fiscalYearStart === '01-01'; });
    if(calendario.some(Boolean) && calendario.some(function(x){ return !x; })) return String(y);
    var par = yearsOf(conEse[0]).filter(function(p){ return p[0] === y; })[0];
    var falsos = conEse.filter(function(id){ return marcaFalsa(id, y); }).length;
    var marca = !falsos ? '' : (falsos === conEse.length ? ' · INVENTADO' : ' · ' + falsos + ' inventados');
    return window.ejercicioLabel(y, par[1], conEse[0]) + marca;
  }

  // ---------------------------------------------------------------------------
  // LOS 6 PASOS. El séptimo del prototipo 2 ("contra qué comparar") no está: lo
  // contesta el otro card. Todo lo demás es el mismo modelo — un paso es una
  // entrada de esta lista, no una función nueva.
  // ---------------------------------------------------------------------------
  var PASOS = [
    {
      clave:'sport', titulo:'Elegí uno o más deportes',
      etiqueta:function(id){
        var sp = window.SPORTS.filter(function(s){ return s.id === id; })[0];
        return sp ? sp.icon + ' ' + sp.name : id;
      },
      opciones:function(){
        return window.SPORTS.map(function(sp){
          var n = sp.active ? Object.keys(window.CLUB_INDEX).filter(function(id){
            return clubs[id] && sportOf(id) === sp.id;
          }).length : 0;
          return { id:sp.id, icon:sp.icon, label:sp.name, meta:n ? nClubes(n) : 'próximamente', disabled:!sp.active };
        });
      }
    },
    {
      clave:'region', titulo:'Elegí una o más regiones',
      etiqueta:function(id){
        var r = window.REGIONS.filter(function(x){ return x.id === id; })[0];
        return r ? r.name : id;
      },
      opciones:function(){
        var base = clubsQueQuedan('region');
        return window.REGIONS.map(function(r){
          var n = base.filter(function(id){ return regionOf(id) === r.id; }).length;
          return { id:r.id, label:r.name, meta:n ? nClubes(n) : 'próximamente', disabled:!n };
        });
      }
    },
    {
      clave:'country', titulo:'Elegí uno o más países',
      etiqueta:function(id){
        var co = window.COUNTRIES[id];
        return co ? co.flag + ' ' + co.name : id;
      },
      opciones:function(){
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
      clave:'league', titulo:'Elegí una o más ligas',
      etiqueta:function(id){ return window.LEAGUES[id] ? window.LEAGUES[id].name : id; },
      opciones:function(){
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
      clave:'club', titulo:'Elegí uno o más clubes',
      // La ayuda cambió con el paso 7: acá marcar varios no abre ninguna pregunta
      // sobre cómo compararlos, porque este card es un solo lado.
      ayuda:'Marcá los que quieras. Si marcás más de uno, este lado los mide como un conjunto, y después elegís si lo leés sumado o promediado.',
      todos:true,
      etiqueta:function(id){ return nameOf(id); },
      opciones:function(){
        return ordenados(clubsQueQuedan('club')).map(function(id){
          var n = yearsOf(id).length;
          return { id:id, crest:initials(nameOf(id)), label:nameOf(id), meta:n === 1 ? '1 ejercicio' : n + ' ejercicios' };
        });
      }
    },
    {
      clave:'year', titulo:'Elegí uno o más ejercicios',
      // Con UN club se listan SUS ejercicios, con su etiqueta real ("Balance
      // 2024/2025"). Con varios, un ejercicio no es de nadie en particular: se
      // listan los AÑOS DE CIERRE y cada uno dice a cuántos les corresponde.
      // Mezclar las dos cosas era el problema que levantó Guido en el prototipo 2.
      ayuda:null,
      etiqueta:function(y){ return labelAnio(Number(y)); },
      opciones:function(){
        var finales = clubesDelLado();
        if(finales.length === 1){
          return yearsOf(finales[0]).map(function(par){
            return { id:String(par[0]), label:labelAnio(par[0], finales) };
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
            id:String(y),
            label:'Cierre ' + y + (falsos ? (falsos === cuantos ? ' · INVENTADO' : ' · ' + falsos + ' inventados') : ''),
            // Un año no existe para todos los clubes, y eso se dice ANTES de
            // elegirlo en vez de sorprender con una fila vacía.
            meta:cuantos + ' de ' + finales.length + ' clubes'
          };
        });
      }
    }
  ];

  function pasoActual(){
    for(var i = 0; i < PASOS.length; i++){ if(!st[PASOS[i].clave].resuelto) return i; }
    return PASOS.length;
  }
  function todoResuelto(){ return pasoActual() === PASOS.length; }

  // ---------------------------------------------------------------------------
  // EL MODAL
  // ---------------------------------------------------------------------------
  function abrirModal(i, desde){
    origen = desde || 'vs';
    modalLado = i;
    // Reabrir el card de un lado ya armado no empieza de cero: vuelve a lo que ese
    // card había elegido. "Elegir otro" casi siempre es "cambiar una cosa".
    if(stGuardado[i]) st = JSON.parse(JSON.stringify(stGuardado[i]));
    else reset();
    $('modalQ').value = '';
    $('modalTitulo').textContent = origen === 'finanzas' ? 'Elegí el club'
                                 : (modo === 'uno' ? 'Qué querés ver' : 'Equipo ' + LETRAS[i]);
    $('modalBack').hidden = false;
    document.body.style.overflow = 'hidden';
    renderModal();
    setTimeout(function(){ $('modalQ').focus(); }, 30);
  }
  function cerrarModal(){
    $('modalBack').hidden = true;
    document.body.style.overflow = '';
  }
  function modalEstaAbierto(){ return !$('modalBack').hidden; }

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

  // El resumen de un paso ya resuelto. Tres estados, y los tres se leen distinto a
  // propósito: lo que elegiste, y lo que decidiste no decidir.
  function resumenDe(p){
    var s = st[p.clave];
    if(s.saltado) return 'Elegir más tarde';
    if(!s.sel.length) return '—';
    var nombres = s.sel.map(p.etiqueta);
    if(nombres.length <= 3) return nombres.join(' + ');
    return nombres.slice(0, 2).join(' + ') + ' + ' + (nombres.length - 2) + ' más';
  }

  function renderModal(){
    var wrap = $('modalWrap');
    if(!wrap) return;
    wrap.innerHTML = '';
    var actual = pasoActual();

    PASOS.forEach(function(p, i){
      var estado = st[p.clave].resuelto ? 'hecho' : (i === actual ? 'ahora' : 'pendiente');
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
        var ayuda = p.clave === 'year' ? ayudaDelAnio() : p.ayuda;
        if(ayuda) body.appendChild(el('p', 'paso-ayuda', ayuda));
        var ops = p.opciones();
        var botones = ops.length ? botonesDeSeleccion(p, ops) : null;
        if(botones) body.appendChild(botones);
        if(!ops.length){
          body.appendChild(el('p', 'paso-vacio', 'No hay nada cargado acá todavía.'));
        } else {
          var grid = el('div', 'op-grid' + (p.clave === 'club' ? ' clubes' : (p.clave === 'year' ? ' anios' : '')));
          ops.forEach(function(op){
            grid.appendChild(opcionBtn(op, tiene(p.clave, op.id), function(id){
              alternar(p.clave, id);
              renderModal();
            }));
          });
          body.appendChild(grid);
        }
        body.appendChild(pieDelPaso(p));
        card.appendChild(body);
      }
      wrap.appendChild(card);
    });

    if(todoResuelto()) wrap.appendChild(cardFinal());
  }

  function ayudaDelAnio(){
    var finales = clubesDelLado();
    if(finales.length === 1) return 'Los ejercicios de ' + nameOf(finales[0]) + '. Si no elegís ninguno, usamos el más reciente.';
    return 'Son ' + finales.length + ' clubes y no todos cierran el mismo día: un club argentino cierra en junio y uno japonés en diciembre, '
         + 'así que el año es el del CIERRE. Si no elegís ninguno, usamos el ejercicio más reciente de cada uno.';
  }

  // Los dos botones de arriba de la grilla. "Elegir todos" solo donde marcar todo
  // significa algo (el paso del club: arma el conjunto); "Deseleccionar todos" en
  // cualquier paso donde haya algo marcado, porque destildar de a uno cuando
  // marcaste once es un castigo (pedido de Guido).
  function botonesDeSeleccion(p, ops){
    var fila = el('div', 'paso-todos-fila');
    var libres = ops.filter(function(o){ return !o.disabled; });
    var marcados = st[p.clave].sel.length;
    var todosMarcados = libres.length && libres.every(function(o){ return tiene(p.clave, o.id); });

    if(p.todos && libres.length > 1){
      var b = el('button', 'paso-todos' + (todosMarcados ? ' on' : ''), 'Elegir todos (' + libres.length + ')');
      b.type = 'button';
      b.title = 'Para medir un grupo entero: una liga, un país, o lo que hayas filtrado';
      b.addEventListener('click', function(){
        st[p.clave].sel = libres.map(function(o){ return o.id; });
        renderModal();
      });
      fila.appendChild(b);
    }
    if(marcados){
      var d = el('button', 'paso-nada', 'Deseleccionar todos (' + marcados + ')');
      d.type = 'button';
      d.addEventListener('click', function(){ st[p.clave].sel = []; renderModal(); });
      fila.appendChild(d);
    }
    return fila.children.length ? fila : null;
  }

  // El pie de cada paso: confirmar lo marcado, o decir que esto se decide después.
  // "Elegir más tarde" está SIEMPRE, en los seis: esa es la regla del prototipo 2 y
  // es la que hace que ninguno diga "opcional", porque todos lo son.
  function pieDelPaso(p){
    var pie = el('div', 'paso-pie');
    var n = st[p.clave].sel.length;
    var seguir = el('button', 'paso-ok' + (n ? '' : ' off'), n ? 'Continuar con ' + n + (n === 1 ? ' elegido' : ' elegidos') : 'Continuar');
    seguir.type = 'button';
    seguir.disabled = !n;
    seguir.addEventListener('click', function(){
      st[p.clave].resuelto = true;
      st[p.clave].saltado = false;
      renderModal();
    });
    pie.appendChild(seguir);

    var luego = el('button', 'paso-skip', 'Elegir más tarde');
    luego.type = 'button';
    luego.title = 'Seguimos sin filtrar por esto. Podés volver cuando quieras.';
    luego.addEventListener('click', function(){
      st[p.clave].sel = [];
      st[p.clave].resuelto = true;
      st[p.clave].saltado = true;
      renderModal();
    });
    pie.appendChild(luego);
    return pie;
  }

  // "Cambiar" en un paso ya resuelto borra ESE y todos los de abajo. Volver atrás
  // sin invalidar lo que dependía de esa elección es justo el bug que tiene hoy el
  // selector de columnas del sitio (to-do 29).
  function volverA(i){
    for(var j = i; j < PASOS.length; j++){
      var k = PASOS[j].clave;
      st[k] = { sel:(j === i ? st[k].sel : []), resuelto:false, saltado:false };
    }
    renderModal();
  }

  // El card final del modal. No felicita a nadie: dice exactamente qué se va a
  // meter en el card, incluido el caso incómodo (no elegiste ningún club, así que
  // son los 41), y recién ahí ofrece confirmarlo.
  function cardFinal(){
    var finales = clubesDelLado();
    var card = el('div', 'paso ahora resultado');
    var head = el('div', 'paso-head');
    head.appendChild(el('span', 'paso-n', '✓'));
    var ht = el('span', 'paso-ht');
    ht.appendChild(el('span', 'paso-t', 'Listo'));
    head.appendChild(ht);
    var reiniciar = el('button', 'paso-change', 'Empezar de nuevo');
    reiniciar.type = 'button';
    reiniciar.addEventListener('click', function(){ reset(); renderModal(); });
    head.appendChild(reiniciar);
    card.appendChild(head);

    var body = el('div', 'paso-body');
    body.appendChild(el('p', 'res-msg', nombreDeSeleccion()));
    body.appendChild(el('p', 'res-sub', descripcionDeSeleccion(finales)));

    if(!finales.length){
      body.appendChild(el('p', 'paso-vacio', 'No quedó ningún club con esos filtros. Cambiá alguno de los pasos de arriba.'));
      card.appendChild(body);
      return card;
    }

    // EL CAMINO "UN CLUB EN PARTICULAR" TERMINA EN FINANZAS, que muestra UN club por
    // vez. Si el visitante marcó varios, no se le descarta la selección en silencio
    // ni se le inventa un promedio que no pidió: se le dice qué va a ver, y se le
    // ofrece el otro camino con lo mismo que ya eligió.
    if(origen === 'finanzas'){
      var uno = el('button', 'paso-ok', 'Ver los números de ' + nameOf(finales[0]));
      uno.type = 'button';
      uno.addEventListener('click', function(){ confirmar('finanzas'); });
      body.appendChild(uno);
      if(finales.length > 1){
        body.insertBefore(el('p', 'res-sub', 'Elegiste ' + finales.length
          + ' clubes, y Finanzas muestra uno por vez: vas a ver ' + nameOf(finales[0])
          + '. Para verlos juntos está Comparar.'), uno);
        var aVs = el('button', 'paso-skip', 'Llevar los ' + finales.length + ' a Comparar');
        aVs.type = 'button';
        aVs.addEventListener('click', function(){ confirmar('vs'); });
        body.appendChild(aVs);
      }
      card.appendChild(body);
      return card;
    }

    var ok = el('button', 'paso-ok', modo === 'uno' ? 'Ver estos números' : 'Usar como Equipo ' + LETRAS[modalLado]);
    ok.type = 'button';
    ok.addEventListener('click', function(){ confirmar('vs'); });
    body.appendChild(ok);
    card.appendChild(body);
    return card;
  }

  function nombreDeSeleccion(){
    var sel = clubesDelLado();
    if(sel.length === 1) return nameOf(sel[0]);
    var universo = clubsQueQuedan('club');
    var completo = sel.length === universo.length;
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

  function descripcionDeSeleccion(finales){
    var anios = st.year.sel.map(Number);
    var queAnios = anios.length
      ? (anios.length === 1 ? 'Ejercicio ' + labelAnio(anios[0], finales) : anios.length + ' ejercicios de cada uno')
      : 'El ejercicio más reciente de cada club';
    if(!st.club.sel.length && finales.length > 1){
      return 'No elegiste clubes, así que este lado son los ' + finales.length
           + ' que quedaron después de tus filtros, medidos como un conjunto. ' + queAnios + '.';
    }
    if(finales.length === 1) return queAnios + '.';
    return finales.length + ' clubes, medidos como un conjunto. ' + queAnios + '.';
  }

  // Cerrar el modal metiendo lo elegido donde corresponda. `destino` gana sobre
  // `origen` para el único caso en que no coinciden: elegiste varios clubes viniendo
  // por el camino de "un club" y pediste llevarlos a Comparar.
  function confirmar(destino){
    var finales = clubesDelLado();
    if(!finales.length) return;
    destino = destino || origen;
    var anios = st.year.sel.map(Number);
    var pares = [];
    finales.forEach(function(id){
      if(anios.length) anios.forEach(function(y){
        // Un año que ese club no tiene no entra como par vacío: se cuenta como
        // "sin ese ejercicio" más adelante, con nombre y todo.
        pares.push([id, y]);
      });
      else pares.push([id, null]);
    });
    lado[modalLado] = {
      nombre: nombreDeSeleccion(),
      pares: pares,
      modo: 'promedio',
      unClub: finales.length === 1 ? finales[0] : null
    };
    stGuardado[modalLado] = JSON.parse(JSON.stringify(st));
    mostrando = false;
    cerrarModal();
    render();

    if(destino === 'finanzas'){
      // Finanzas muestra el club activo, así que acá sí hay que cargarlo: es la
      // misma llamada que hace el sitio al elegir un club en su selector.
      Promise.resolve(api.pickClub(finales[0])).then(function(){
        try { localStorage.setItem(LS_CLUB, finales[0]); } catch(e){}
        renderButton();
        irASeccion('finanzas');
      });
    } else {
      irASeccion('vs');
    }
  }

  // ---------------------------------------------------------------------------
  // EL BUSCADOR DEL MODAL. El atajo de un paso para el que ya sabe qué club
  // quiere: escribir "boca" y tocarlo llena el card, sin recorrer los seis pasos.
  // ---------------------------------------------------------------------------
  function renderBusqueda(){
    var q = norm($('modalQ').value.trim());
    var caja = $('modalResultados');
    caja.innerHTML = '';
    caja.hidden = !q;
    $('modalWrap').hidden = !!q;
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
        sub:(co ? co.flag + ' ' + co.name : ''),
        meta:n === 1 ? '1 ejercicio' : n + ' ejercicios'
      }, false, function(cid){
        // Elegir desde la búsqueda deja los pasos coherentes con lo que ves: se
        // marcan solos con el camino de ese club, en vez de quedar vacíos.
        pararseEn(cid);
        $('modalQ').value = '';
        renderBusqueda();
        confirmar();   // sin destino: el que corresponda al origen
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
  // CÁLCULO. Un lado ya es una lista de pares (club, ejercicio); acá solo se suman
  // y se cuenta quién aporta. Los números salen del motor REAL del sitio.
  // ---------------------------------------------------------------------------
  var INDICADORES = [
    { key:'revenue',  label:'Ingresos' },
    { key:'expenses', label:'Gastos' },
    { key:'pat',      label:'Resultado del ejercicio', signo:true },
    { key:'netDebt',  label:'Deuda neta', signo:true }
  ];

  function paresDe(l){
    if(!l) return [];
    return l.pares.map(function(p){
      return [p[0], p[1] != null ? p[1] : (yearsOf(p[0])[0] || [])[0]];
    });
  }
  function clubesDe(l){
    var vistos = {};
    return paresDe(l).map(function(p){ return p[0]; }).filter(function(id){
      if(vistos[id]) return false;
      vistos[id] = 1; return true;
    });
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
    // Y LO MISMO PARA LOS GASTOS: los 10 clubes japoneses tienen ingresos cargados y
    // `expenseLines: []`, porque la J.League publica el ingreso de cada club y no su
    // estructura de costos. Sin este test la columna dice "Gastos 0,0 M USD" y un
    // resultado igual a los ingresos, que no es un dato incompleto sino uno FALSO.
    // El resultado cae con los gastos: es el final de una cascada que arranca ahí.
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
    var out = { nombre:l.nombre, modo:l.modo, n:pares.length, conDato:0, sinEjercicio:[], anios:[],
                presupuestos:0, tot:{}, informan:{} };
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
  // LA PORTADA: los dos cards
  // ---------------------------------------------------------------------------
  function render(){
    var wrap = $('cdWrap');
    if(!wrap) return;
    wrap.innerHTML = '';
    wrap.className = 'cd-wrap' + (modo === 'uno' ? ' uno' : '');

    wrap.appendChild(card(0));
    if(modo === 'duelo'){
      wrap.appendChild(el('div', 'cd-vs', 'VS'));
      wrap.appendChild(card(1));
    }
    renderPie();
    renderResultado();
  }

  function card(i){
    var col = el('div', 'cd-col' + (lado[i] ? ' con' : ''));
    var head = el('div', 'cd-head');
    head.appendChild(el('span', 'cd-letra', modo === 'uno' ? '★' : LETRAS[i]));
    head.appendChild(el('span', 'cd-titulo', modo === 'uno' ? 'Qué querés ver' : 'Equipo ' + LETRAS[i]));
    if(lado[i]){
      var x = el('button', 'cd-x', '×');
      x.type = 'button';
      x.title = 'Vaciar este card';
      x.addEventListener('click', function(){
        lado[i] = null; stGuardado[i] = null; mostrando = false; render();
      });
      head.appendChild(x);
    }
    col.appendChild(head);
    col.appendChild(lado[i] ? cuerpoLleno(i) : cuerpoVacio(i));
    return col;
  }

  // EL CARD VACÍO. Es un solo botón grande, y esa es toda la primera pantalla: la
  // portada abre con una pregunta, no con 67 opciones.
  function cuerpoVacio(i){
    var b = el('button', 'cd-vacio');
    b.type = 'button';
    b.appendChild(el('span', 'cd-vacio-mas', '+'));
    b.appendChild(el('span', 'cd-vacio-t', modo === 'uno' ? 'Elegí qué ver' : 'Elegí el equipo ' + LETRAS[i]));
    b.appendChild(el('span', 'cd-vacio-s', 'Un club, una liga entera, un país. Te lo preguntamos de a un paso.'));
    b.addEventListener('click', function(){ abrirModal(i, 'vs'); });
    return b;
  }

  function cuerpoLleno(i){
    var l = lado[i];
    var caja = el('div', 'cd-elegido');
    var fila = el('div', 'cd-sujeto');
    fila.appendChild(el('span', 'cd-crest', l.unClub ? initials(nameOf(l.unClub)) : '👥'));
    var t = el('span', 'cd-op-txt');
    t.appendChild(el('span', 'cd-sujeto-n', l.nombre));
    var ids = clubesDe(l);
    var sub = l.unClub
      ? ((window.COUNTRIES[countryOf(l.unClub)] || {}).name || '')
      : ids.length + ' clubes · ' + l.pares.length + ' ejercicios';
    t.appendChild(el('span', 'cd-op-s', sub));
    fila.appendChild(t);
    var otro = el('button', 'cd-otro', 'Elegir otro');
    otro.type = 'button';
    otro.title = 'Vuelve a los pasos con lo que elegiste, para cambiar lo que haga falta';
    otro.addEventListener('click', function(){ abrirModal(i, 'vs'); });
    fila.appendChild(otro);
    caja.appendChild(fila);

    // El toggle promedio/total solo cuando hay más de un ejercicio que sumar: con
    // uno los dos dan lo mismo y el botón sería ruido.
    if(l.pares.length > 1){
      var modos = el('div', 'cd-modos');
      [['promedio', 'Promedio'], ['total', 'Todo sumado']].forEach(function(m){
        var b = el('button', 'cd-modo' + (l.modo === m[0] ? ' on' : ''), m[1]);
        b.type = 'button';
        b.title = m[0] === 'promedio'
          ? 'Cómo le fue a un integrante típico de este lado'
          : 'Todo lo que movió este lado, sumado';
        b.addEventListener('click', function(){ l.modo = m[0]; render(); });
        modos.appendChild(b);
      });
      caja.appendChild(modos);
    }

    // El desplegable de ejercicio: SOLO cuando el lado es un club en un ejercicio.
    // Para un conjunto, cambiar de ejercicio es volver al paso 6, que es donde esa
    // pregunta ya está contestada; tenerla en dos lugares es tener dos verdades.
    if(l.pares.length === 1 && l.unClub) caja.appendChild(selectorDeAnio(i));
    else caja.appendChild(el('p', 'cd-anios', 'Ejercicios: ' + textoAnios(l)));
    return caja;
  }

  function textoAnios(l){
    var ys = {};
    paresDe(l).forEach(function(p){ if(p[1]) ys[p[1]] = 1; });
    var lista = Object.keys(ys).map(Number).sort(function(a, b){ return b - a; });
    if(!lista.length) return '—';
    if(lista.length === 1) return String(lista[0]);
    return lista[lista.length - 1] + '-' + lista[0] + ' (' + lista.length + ')';
  }

  function selectorDeAnio(i){
    var l = lado[i];
    var fila = el('label', 'cd-anio');
    fila.appendChild(el('span', null, 'Ejercicio'));
    var sel = document.createElement('select');
    var actual = paresDe(l)[0][1];
    yearsOf(l.unClub).forEach(function(par){
      var o = document.createElement('option');
      o.value = par[0];
      o.textContent = labelAnio(par[0], [l.unClub]);
      if(par[0] === actual) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function(){
      l.pares = [[l.unClub, Number(this.value)]];
      render();
    });
    fila.appendChild(sel);
    return fila;
  }

  function renderPie(){
    var pie = $('cdPie');
    pie.innerHTML = '';
    var listo = modo === 'uno' ? !!lado[0] : (!!lado[0] && !!lado[1]);
    var b = el('button', 'cd-go' + (listo ? '' : ' off'),
      modo === 'uno'
        ? (lado[0] ? 'Ver ' + lado[0].nombre : 'Elegí qué querés ver')
        : (listo ? 'Comparar ' + lado[0].nombre + ' contra ' + lado[1].nombre
                 : 'Llená los dos cards para comparar'));
    b.type = 'button';
    b.disabled = !listo;
    b.addEventListener('click', aplicar);
    pie.appendChild(b);
  }

  // ---------------------------------------------------------------------------
  // EL RESULTADO. Una sola vista para los tres casos (un club, un conjunto
  // promediado, un conjunto sumado), que es lo que compra el modelo de dos cards:
  // en el prototipo 2 había dos vistas y había que decidir cuál correspondía.
  // ---------------------------------------------------------------------------
  function aplicar(){
    var activos = (modo === 'uno' ? [lado[0]] : [lado[0], lado[1]]).filter(Boolean);
    if(!activos.length) return;

    // Un club activo hace falta igual: sin él el sitio se queda en pantalla fría y
    // esconde el nav y las secciones.
    var primerClub = clubesDe(activos[0])[0];
    var caja = $('cdResultado');
    caja.hidden = false;
    caja.innerHTML = '<p class="cd-cargando">Calculando…</p>';
    mostrando = true;

    Promise.resolve(api.pickClub(primerClub)).then(function(){
      try { localStorage.setItem(LS_CLUB, primerClub); } catch(e){}
      renderButton();
      // Los data files de todos los clubes involucrados: sin ellos no hay qué sumar.
      var ids = [];
      activos.forEach(function(l){ clubesDe(l).forEach(function(id){ if(ids.indexOf(id) < 0) ids.push(id); }); });
      return Promise.all(ids.map(function(id){
        return window.loadClubData ? window.loadClubData(id).catch(function(){ return null; }) : null;
      }));
    }).then(function(){
      renderResultado();
      // La página no se mueve sola: el card aparece abajo y el visitante decide si
      // baja. (En el prototipo 2 el scroll automático fue una queja de Guido.)
    });
  }

  function renderResultado(){
    var caja = $('cdResultado');
    if(!caja) return;
    if(!mostrando){ caja.hidden = true; caja.innerHTML = ''; return; }
    var activos = (modo === 'uno' ? [lado[0]] : [lado[0], lado[1]]).filter(Boolean);
    if(!activos.length){ caja.hidden = true; return; }

    caja.hidden = false;
    caja.innerHTML = '';
    var tots = activos.map(totalesDe);

    var head = el('div', 'cd-res-head');
    head.appendChild(el('h2', null, tots.length > 1 ? 'A contra B' : tots[0].nombre));
    head.appendChild(el('p', 'cd-res-sub', 'En USD. Cada lado se calcula ejercicio por ejercicio con el mismo motor que usa el sitio.'));
    caja.appendChild(head);

    var tabla = el('table', 'cd-tabla');
    var trh = el('tr');
    trh.appendChild(el('th', null, ''));
    tots.forEach(function(t, i){
      var th = el('th');
      if(tots.length > 1) th.appendChild(el('span', 'cd-letra chica', LETRAS[i]));
      th.appendChild(el('span', 'cd-res-n', t.nombre + (t.n > 1 ? (t.modo === 'promedio' ? ' · promedio' : ' · sumado') : '')));
      th.appendChild(el('span', 'cd-res-m', t.conDato + ' de ' + t.n + (t.n === 1 ? ' ejercicio' : ' ejercicios') + ' · ' + rangoAnios(t)));
      trh.appendChild(th);
    });
    var thead = el('thead'); thead.appendChild(trh); tabla.appendChild(thead);

    var tbody = el('tbody');
    INDICADORES.forEach(function(m){
      var tr = el('tr');
      tr.appendChild(el('th', 'cd-ind', m.label));
      var maxAbs = Math.max.apply(null, tots.map(function(t){
        return t.informan[m.key] ? Math.abs(t.tot[m.key]) : 0;
      })) || 1;
      tots.forEach(function(t){
        var td = el('td');
        if(!t.informan[m.key]){
          td.appendChild(el('span', 'cd-nodato', 'sin dato'));
        } else {
          var v = t.tot[m.key];
          td.appendChild(el('span', 'cd-num' + (m.signo && v < 0 ? ' neg' : ''), fmtM(v)));
          var barra = el('span', 'cd-bar');
          var relleno = el('span', 'cd-bar-in' + (m.signo && v < 0 ? ' neg' : ''));
          relleno.style.width = Math.round((Math.abs(v) / maxAbs) * 100) + '%';
          barra.appendChild(relleno);
          td.appendChild(barra);
          if(t.informan[m.key] < t.conDato){
            td.appendChild(el('span', 'cd-res-m', t.informan[m.key] + ' de ' + t.conDato + ' lo informan'));
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
    if(tots.length > 1 && tots[0].n !== tots[1].n && (tots[0].modo === 'total' || tots[1].modo === 'total')){
      avisos.push('Los dos lados no tienen la misma cantidad de ejercicios, y al menos uno está sumado: "quién es más grande" no se lee sin mirar esa cuenta.');
    }
    avisos.push('Un club sin el dato no suma cero: queda afuera y se cuenta aparte.');
    var pie = el('div', 'cd-avisos');
    avisos.forEach(function(a){ pie.appendChild(el('p', null, a)); });
    caja.appendChild(pie);
  }

  // ---------------------------------------------------------------------------
  // EL SELECTOR DENTRO DE FINANZAS (pedido de Guido). Sin club es lo único que hay
  // para hacer en esa pantalla, así que ocupa el lugar de un card entero; con club
  // es una línea, porque ya no es la tarea principal sino cómo se cambia de club.
  // ---------------------------------------------------------------------------
  function renderFinSelector(){
    var caja = $('finSelector');
    if(!caja) return;
    caja.innerHTML = '';
    var id = api.getClub();
    caja.className = 'fin-sel' + (id ? '' : ' vacio');
    // Sin club elegido, esta pantalla es solo el selector: lo de abajo se esconde.
    var sec = $('finanzas');
    if(sec) sec.classList.toggle('sin-club', !id);

    caja.appendChild(el('span', 'fin-sel-ico', id ? initials(nameOf(id)) : '?'));
    var t = el('span', 'fin-sel-txt');
    t.appendChild(el('span', 'fin-sel-t', id ? nameOf(id) : 'Todavía no elegiste un club'));
    t.appendChild(el('span', 'fin-sel-s', id
      ? ((window.COUNTRIES[countryOf(id)] || {}).name || '') + ' · los números de abajo son de este club'
      : 'Elegilo y acá abajo aparecen sus ingresos, gastos y deuda, ejercicio por ejercicio.'));
    caja.appendChild(t);

    var b = el('button', 'fin-sel-btn' + (id ? ' alt' : ''), id ? 'Cambiar de club' : 'Elegir un club');
    b.type = 'button';
    b.addEventListener('click', function(){ abrirModal(0, 'finanzas'); });
    caja.appendChild(b);
  }

  // ---------------------------------------------------------------------------
  // API PÚBLICA (la misma que js/selector.js)
  // ---------------------------------------------------------------------------
  function renderButton(){
    var id = api.getClub();
    var name = $('cbName'), eyebrow = $('cbEyebrow');
    // El selector de Finanzas se redibuja ACÁ y no en un evento propio: `renderButton`
    // es lo que el sitio llama cada vez que cambia el club activo (applyClubMode), así
    // que es el único punto donde este prototipo se entera sin inventar un canal nuevo.
    renderFinSelector();
    if(!name) return;
    name.textContent = id ? nameOf(id) : 'Elegí tu club';
    if(eyebrow) eyebrow.textContent = id ? 'Estás viendo' : 'Todavía sin elegir';
  }
  // El botón de club del header abre el mismo modal, y su destino es Finanzas: es el
  // control de "qué club estoy viendo", no el de armar una comparación.
  function open(){ abrirModal(0, 'finanzas'); }
  function close(){ cerrarModal(); }
  function goHome(){
    lado = [null, null];
    stGuardado = [null, null];
    mostrando = false;
    reset();
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

    $('clubBtn').addEventListener('click', function(ev){ ev.stopPropagation(); open(); }, true);

    $('modalX').addEventListener('click', cerrarModal);
    $('modalBack').addEventListener('click', function(ev){ if(ev.target === this) cerrarModal(); });
    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && modalEstaAbierto()) cerrarModal();
    });
    $('modalQ').addEventListener('input', renderBusqueda);

    // LA BIFURCACIÓN DE INICIO. Las dos opciones abren caminos distintos con el mismo
    // modal: la primera termina en Finanzas, la segunda ni siquiera lo abre — lleva a
    // la pestaña Comparar, donde los dos cards vacíos hacen la pregunta.
    $('bifUno').addEventListener('click', function(){ abrirModal(0, 'finanzas'); });
    $('bifDos').addEventListener('click', function(){ irASeccion('vs'); });

    // El club guardado de una visita anterior ya NO llena el card A. Con la
    // estructura nueva ese club es asunto de Finanzas (el sitio lo carga solo y el
    // selector de esa pantalla lo muestra); la pestaña Comparar arranca siempre con
    // los dos cards vacíos, porque "con qué comparar" no se hereda de la visita
    // pasada. Lo único que se hereda es dónde se para el modal al abrirlo.
    var guardado = savedClub();
    if(guardado) pararseEn(guardado);
    inited = true;
    renderButton();
    render();
  }

  return {
    init:init, open:open, close:close, refresh:render,
    renderButton:renderButton, goHome:goHome, savedClub:savedClub
  };
})();

// ============================================================================
// js/selector.js — EL SELECTOR DE CLUB, PASO A PASO (Versión 146).
//
// QUÉ REEMPLAZA. Hasta la Versión 145 esto era un panel de Miller columns
// (Deporte › Región › País › Liga › Equipo) con un buscador arriba: cinco
// columnas a la vez, ~67 opciones en pantalla, y cinco decisiones simultáneas.
// Era el prototipo 1 de los cuatro que se probaron; ganó el 4 y esto es su
// etapa 3. El handoff completo — el modelo, qué cambia archivo por archivo, los
// gotchas — está en `Prototyping/Selector/MERGE-A-PRODUCCION.md`.
//
// LA IDEA: una pregunta por vez, adentro de un modal. Los pasos se apilan; el
// que está resuelto se encoge a una línea con lo que elegiste y un "Cambiar".
// Ninguno es obligatorio: "Elegir más tarde" está en todos, y por eso ninguno
// dice "opcional" — todos lo son.
//
//   1 Deporte → 2 Región → 3 País → 4 Clubes → 5 Ejercicio de cada uno
//
// Y arriba de todo, el buscador: el que ya sabe que quiere Boca escribe "boca"
// y llega en un paso, sin recorrer los cinco. El árbol es para explorar, no un
// peaje.
//
// LO QUE TODAVÍA NO ESTÁ (etapa 4 del merge): el paso "¿qué querés medir?" que
// bifurca en Ligas / Clubes / Mezcla, y con él un LADO como suma de bloques
// (una liga-temporada + un puñado de clubes, cada bloque con su agregador).
// Esta etapa arma un solo bloque de clubes, que es lo que necesitan los dos
// caminos que hoy existen: "ver un club" y "sumar rivales a la comparación".
//
// EL MODO COMPARAR es un puente, no el destino. `js/comparar-clubes.js` sigue
// siendo el que dibuja la comparación, y sigue esperando los mismos ids que le
// daba el panel viejo (#clubPanel con clase `open`, #addBanner, #confirmBar,
// .sel-foot): el modal los conserva, así que ese archivo no se tocó. Cuando el
// modal se abre para comparar, el paso de clubes deja de ser una selección
// propia y pasa a prender y apagar sujetos con `CLUB_COMPARE.toggleClub()`, y
// la barra de confirmación de abajo es la que cierra. En la etapa 5, cuando los
// dos cards sean la comparación, este puente se retira entero.
//
// OJO CON `clubs`: se declara con `const` en `data/clubs.js`, así que NO es una
// propiedad de `window` (a diferencia de `CLUB_INDEX`, que se asigna, y de las
// funciones de leagues.js/club-leagues.js, que quedan en window por ser
// declaraciones de función). `window.clubs` da undefined y rompe todo. Esta
// trampa ya costó media hora dos veces en este repo.
// ============================================================================

window.CLUB_SELECTOR = (function(){
  'use strict';

  var LS_CLUB    = 'fos_club';
  var LS_RECENTS = 'fos_recent_clubs';
  var LS_COACH   = 'fos_coach_club';

  var api = {
    getClub: function(){ return null; },
    pickClub: function(){ return Promise.resolve(); }
  };

  var inited = false;
  // Abierto desde la comparación (el botón del header, la tarjeta de Comparar o
  // la bandeja de chips) en vez de para elegir el club que se está viendo.
  var comparando = false;

  // --- ESTADO DE LOS PASOS ---------------------------------------------------
  // `armado` es el paso 5 (el ejercicio de cada club). Está en la lista de claves
  // aunque no filtre nada: `pasoActual()` recorre esta misma lista para saber
  // dónde está parado el visitante.
  var CLAVES = ['sport', 'region', 'country', 'club', 'armado'];
  var st = {};
  // EL BLOQUE que se está armando: una lista de pares (club, ejercicio) que se
  // miden como una sola cosa. `ejercicio === null` significa "el más reciente de
  // ESE club", que es lo que corresponde cuando el visitante no eligió y los
  // clubes no cierran todos el mismo día (uno argentino cierra en junio y uno
  // japonés en diciembre).
  //   bloque = { pares:[['boca',2025], ['river',null]], agg:'promedio'|'suma' }
  // En la etapa 4 un lado pasa a ser una LISTA de bloques, con bloques de liga
  // además de los de clubes. La forma del par no cambia: por eso se elige así.
  var bloque = null;

  function reset(){
    CLAVES.forEach(function(k){ st[k] = { sel:[], resuelto:false, saltado:false }; });
    bloque = null;
  }
  reset();

  // ---------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------
  function $(id){ return document.getElementById(id); }
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }
  function el(tag, cls, txt){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(txt != null) e.textContent = txt;
    return e;
  }
  function idx(id){ return (window.CLUB_INDEX || {})[id] || {}; }
  function nameOf(id){ return (clubs[id] && clubs[id].displayName) || idx(id).n || id; }
  function countryOf(id){ return (clubs[id] && clubs[id].country) || idx(id).c || null; }
  function regionOf(id){ return window.regionOfCountry(countryOf(id)); }
  function sportOf(id){ return (clubs[id] && clubs[id].sport) || 'futbol'; }
  function ligasDe(id){ return (window.leaguesOfClub(id) || []).map(function(l){ return l.league; }); }
  // Los ejercicios REALES de un club. Un placeholder no es un ejercicio: no hay
  // documento detrás, así que ofrecerlo es ofrecer una pantalla vacía.
  function yearsOf(id){
    return (idx(id).yrs || []).filter(function(par){
      return par[1] !== 'placeholder' && par[1] !== 'pending_official';
    });
  }
  function nClubes(n){ return n === 1 ? '1 ' + t('selector.club', 'club') : n + ' ' + t('selector.clubs', 'clubes'); }
  function nEjercicios(n){
    return n === 1 ? '1 ' + t('fuentes.ejercicio', 'ejercicio') : n + ' ' + t('fuentes.ejercicios', 'ejercicios');
  }
  function initials(name){
    var w = String(name || '').replace(/[^A-Za-zÀ-ÿ ]/g, '').split(/\s+/).filter(Boolean);
    return (w.slice(0, 2).map(function(x){ return x[0]; }).join('') || '··').toUpperCase();
  }
  function norm(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function tiene(k, id){ return st[k].sel.indexOf(id) >= 0; }
  function alternar(k, id){
    var i = st[k].sel.indexOf(id);
    if(i >= 0) st[k].sel.splice(i, 1); else st[k].sel.push(id);
  }
  function ordenados(ids){
    return ids.slice().sort(function(a, b){
      return nameOf(a).localeCompare(nameOf(b), 'es', { sensitivity:'base' });
    });
  }

  // ---------------------------------------------------------------------------
  // QUÉ CLUBES QUEDAN. Un solo filtro, del que salen TODOS los conteos: si el
  // número que muestra un paso no sale de la misma función que arma la lista del
  // paso siguiente, tarde o temprano dicen cosas distintas. Dentro de un paso los
  // valores se SUMAN (Argentina O Brasil); entre pasos se CRUZAN (Sudamérica Y
  // fútbol).
  // ---------------------------------------------------------------------------
  function clubsQueQuedan(hasta){
    var corte = CLAVES.indexOf(hasta || 'club');
    var ids = Object.keys(window.CLUB_INDEX || {}).filter(function(id){ return !!clubs[id]; });
    if(corte > 0 && st.sport.sel.length)   ids = ids.filter(function(id){ return st.sport.sel.indexOf(sportOf(id)) >= 0; });
    if(corte > 1 && st.region.sel.length)  ids = ids.filter(function(id){ return st.region.sel.indexOf(regionOf(id)) >= 0; });
    if(corte > 2 && st.country.sel.length) ids = ids.filter(function(id){ return st.country.sel.indexOf(countryOf(id)) >= 0; });
    return ids;
  }

  // Los clubes del bloque que se está armando. Si el visitante marcó clubes, son
  // esos; si no marcó ninguno, son TODOS los que sobrevivieron a sus filtros, y el
  // card final lo dice con todas las letras antes de confirmar.
  function clubesElegidos(){
    if(st.club.sel.length) return st.club.sel.slice();
    return ordenados(clubsQueQuedan('club'));
  }

  // La etiqueta de un ejercicio, tal como la escribe el resto del sitio.
  function labelAnio(y, ids){
    var conEse = (ids || []).filter(function(id){
      return yearsOf(id).some(function(par){ return par[0] === y; });
    });
    if(!conEse.length || !window.ejercicioLabel) return String(y);
    // Con clubes de año calendario (Japón, Brasil) mezclados con clubes de
    // temporada partida, "2024/2025" sería una fecha falsa para la mitad: ahí va
    // el año pelado.
    var calendario = conEse.map(function(id){ return clubs[id].fiscalYearStart === '01-01'; });
    if(calendario.some(Boolean) && calendario.some(function(x){ return !x; })) return String(y);
    var par = yearsOf(conEse[0]).filter(function(p){ return p[0] === y; })[0];
    return window.ejercicioLabel(y, par[1], conEse[0]);
  }

  // ---------------------------------------------------------------------------
  // LOS PASOS
  // ---------------------------------------------------------------------------
  var PASOS_FILTRO = [
    {
      clave:'sport', titulo:function(){ return t('sel.paso.sport', 'Elegí uno o más deportes'); },
      etiqueta:function(id){
        var sp = window.SPORTS.filter(function(s){ return s.id === id; })[0];
        return sp ? sp.icon + ' ' + t(sp.key, sp.name) : id;
      },
      opciones:function(){
        return window.SPORTS.map(function(sp){
          var n = sp.active ? Object.keys(window.CLUB_INDEX).filter(function(id){
            return clubs[id] && sportOf(id) === sp.id;
          }).length : 0;
          return { id:sp.id, icon:sp.icon, label:t(sp.key, sp.name),
                   meta:n ? nClubes(n) : t('selector.soon', 'próximamente'), disabled:!sp.active };
        });
      }
    },
    {
      clave:'region', titulo:function(){ return t('sel.paso.region', 'Elegí una o más regiones'); },
      etiqueta:function(id){
        var r = window.REGIONS.filter(function(x){ return x.id === id; })[0];
        return r ? t(r.key, r.name) : id;
      },
      opciones:function(){
        var base = clubsQueQuedan('region');
        return window.REGIONS.map(function(r){
          var n = base.filter(function(id){ return regionOf(id) === r.id; }).length;
          return { id:r.id, label:t(r.key, r.name),
                   meta:n ? nClubes(n) : t('selector.soon', 'próximamente'), disabled:!n };
        });
      }
    },
    {
      clave:'country', titulo:function(){ return t('sel.paso.country', 'Elegí uno o más países'); },
      etiqueta:function(id){
        var co = window.COUNTRIES[id];
        return co ? co.flag + ' ' + t(co.key, co.name) : id;
      },
      opciones:function(){
        var base = clubsQueQuedan('country'), cuenta = {};
        base.forEach(function(id){ cuenta[countryOf(id)] = (cuenta[countryOf(id)] || 0) + 1; });
        return Object.keys(cuenta).sort(function(a, b){
          return t(window.COUNTRIES[a].key, window.COUNTRIES[a].name)
                 .localeCompare(t(window.COUNTRIES[b].key, window.COUNTRIES[b].name), 'es');
        }).map(function(cid){
          return { id:cid, icon:window.COUNTRIES[cid].flag,
                   label:t(window.COUNTRIES[cid].key, window.COUNTRIES[cid].name), meta:nClubes(cuenta[cid]) };
        });
      }
    }
  ];

  var PASO_CLUBES = {
    clave:'club',
    titulo:function(){
      return comparando ? t('sel.paso.club.cmp', 'Elegí con quién comparar')
                        : t('sel.paso.club', 'Elegí uno o más clubes');
    },
    ayuda:function(){
      return comparando ? null
        : t('sel.paso.club.ayuda', 'Marcá los que quieras. Si marcás más de uno, en el paso siguiente elegís el ejercicio de cada uno.');
    },
    todos:true,
    etiqueta:function(id){ return nameOf(id); },
    opciones:function(){
      return ordenados(clubsQueQuedan('club')).map(function(id){
        var co = window.COUNTRIES[countryOf(id)];
        var op = { id:id, crest:initials(nameOf(id)), label:nameOf(id),
                   sub:co ? co.flag + ' ' + t(co.key, co.name) : '',
                   meta:nEjercicios(yearsOf(id).length) };
        // En modo comparar, un club que no puede sumar ningún ejercicio nuevo se
        // muestra apagado CON EL MOTIVO, en vez de no responder al click.
        if(comparando && window.CLUB_COMPARE){
          var motivo = CLUB_COMPARE.blockReason(id);
          if(motivo){ op.disabled = true; op.sub = motivo; }
        }
        return op;
      });
    },
    // Un solo bloque con todos los clubes marcados, cada uno en su ejercicio más
    // reciente hasta que el paso 5 diga otra cosa.
    alResolver:function(){
      bloque = { pares:clubesElegidos().map(function(id){ return [id, null]; }), agg:'suma' };
    }
  };

  var PASO_CLUB_ANIO = {
    clave:'armado',
    titulo:function(){ return t('sel.paso.anio', 'Elegí el ejercicio de cada club'); },
    cuerpo:cuerpoClubAnio
  };

  function pasosActivos(){
    var out = PASOS_FILTRO.slice();
    out.push(PASO_CLUBES);
    // Comparando, el paso del ejercicio no va: `js/comparar-clubes.js` elige el
    // primer ejercicio libre de cada rival y lo deja cambiar desde su propio chip.
    // Preguntarlo acá sería preguntarlo dos veces y en dos lugares distintos.
    if(!comparando) out.push(PASO_CLUB_ANIO);
    return out;
  }
  function PASOS(){ return pasosActivos(); }

  function pasoActual(){
    var ps = PASOS();
    for(var i = 0; i < ps.length; i++){ if(!st[ps[i].clave].resuelto) return i; }
    return ps.length;
  }
  function todoResuelto(){ return pasoActual() === PASOS().length; }

  // ---------------------------------------------------------------------------
  // ABRIR / CERRAR EL MODAL
  // ---------------------------------------------------------------------------
  function isOpen(){ return $('clubPanel').classList.contains('open'); }

  function open(forCompare){
    if(!inited) return;
    hideCoach();
    comparando = !!forCompare;
    reset();
    // Los filtros arrancan parados donde está el club activo, así abrir el modal
    // muestra el contexto de lo que estás viendo en vez de la raíz. Comparando no:
    // ahí el club activo es el sujeto 0 y lo que se busca es OTRO.
    var actual = api.getClub();
    if(actual && !comparando) pararseEn(actual, true);

    $('modalQ').value = '';
    $('modalResultados').hidden = true;
    $('modalWrap').hidden = false;
    $('modalTitulo').textContent = comparando
      ? t('sel.modal.cmp', 'Sumar a la comparación')
      : t('sel.modal.club', 'Elegí el club');
    $('clubPanel').classList.add('open');
    $('clubBackdrop').classList.add('open');
    $('clubBtn').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    renderModal();
    if(window.CLUB_COMPARE) window.CLUB_COMPARE.renderConfirm();
    setTimeout(function(){ $('modalQ').focus(); }, 30);
  }

  // Cerrar por acá (✕, Esc, el backdrop) CONSERVA lo que se haya elegido para
  // comparar: solo el "Cancelar" explícito de la barra de confirmación descarta.
  // Lo que sí hace es salir del modo comparar, para que la próxima apertura no
  // herede un banner que ya no corresponde.
  function close(){
    $('clubPanel').classList.remove('open');
    $('clubBackdrop').classList.remove('open');
    $('clubBtn').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    comparando = false;
    if(window.CLUB_COMPARE) window.CLUB_COMPARE.leaveAddMode();
  }

  // ---------------------------------------------------------------------------
  // DIBUJAR EL MODAL
  // ---------------------------------------------------------------------------
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
    if(s.saltado) return t('sel.later', 'Elegir más tarde');
    if(!s.sel.length) return '—';
    var nombres = s.sel.map(p.etiqueta);
    if(nombres.length <= 3) return nombres.join(' + ');
    return nombres.slice(0, 2).join(' + ') + ' + ' + (nombres.length - 2) + ' ' + t('sel.more', 'más');
  }

  function renderModal(){
    var wrap = $('modalWrap');
    if(!wrap) return;
    wrap.innerHTML = '';
    var actual = pasoActual();

    PASOS().forEach(function(p, i){
      var estado = st[p.clave].resuelto ? 'hecho' : (i === actual ? 'ahora' : 'pendiente');
      var card = el('div', 'paso ' + estado + (st[p.clave].saltado ? ' saltado' : ''));

      var head = el('div', 'paso-head');
      head.appendChild(el('span', 'paso-n', String(i + 1)));
      var ht = el('span', 'paso-ht');
      ht.appendChild(el('span', 'paso-t', p.titulo()));
      if(estado === 'hecho') ht.appendChild(el('span', 'paso-v', resumenDe(p)));
      head.appendChild(ht);
      if(estado === 'hecho'){
        var cambiar = el('button', 'paso-change', t('sel.change', 'Cambiar'));
        cambiar.type = 'button';
        cambiar.addEventListener('click', function(){ volverA(i); });
        head.appendChild(cambiar);
      }
      card.appendChild(head);

      if(estado === 'ahora'){
        var body = el('div', 'paso-body');
        // El paso del ejercicio no es una grilla de casillas: es una fila por club
        // con su desplegable, así que trae su propio cuerpo.
        if(p.cuerpo){
          body.appendChild(p.cuerpo());
          body.appendChild(pieDelPaso(p));
          card.appendChild(body);
          wrap.appendChild(card);
          return;
        }
        var ayuda = p.ayuda && p.ayuda();
        if(ayuda) body.appendChild(el('p', 'paso-ayuda', ayuda));
        var ops = p.opciones();
        if(!ops.length){
          body.appendChild(el('p', 'paso-vacio', t('sel.empty', 'No hay nada cargado acá todavía.')));
        } else {
          var botones = botonesDeSeleccion(p, ops);
          if(botones) body.appendChild(botones);
          var grid = el('div', 'op-grid' + (p.clave === 'club' ? ' clubes' : ''));
          ops.forEach(function(op){
            grid.appendChild(opcionBtn(op, marcadoEn(p, op.id), function(id){
              if(comparando && p.clave === 'club'){
                // El puente con la comparación vieja: acá no se junta una selección
                // propia, se prenden y apagan sujetos de `CLUB_COMPARE`.
                Promise.resolve(CLUB_COMPARE.toggleClub(id)).then(renderModal);
                return;
              }
              alternar(p.clave, id);
              renderModal();
            }));
          });
          body.appendChild(grid);
          if(comparando && p.clave === 'club') body.appendChild(ligasParaComparar());
        }
        body.appendChild(pieDelPaso(p));
        card.appendChild(body);
      }
      wrap.appendChild(card);
    });

    if(todoResuelto() && !comparando) wrap.appendChild(cardFinal());
  }

  function marcadoEn(p, id){
    if(comparando && p.clave === 'club') return !!(window.CLUB_COMPARE && CLUB_COMPARE.has('club', id));
    return tiene(p.clave, id);
  }

  // EL PROMEDIO DE UNA LIGA, comparando. El panel viejo lo ofrecía como un "+" en
  // la columna de ligas; sin esa columna, va acá abajo de los clubes. No se perdió
  // la función: se mudó. En la etapa 4 esto lo reemplaza un bloque de liga.
  function ligasParaComparar(){
    var caja = el('div', 'cmp-ligas');
    var base = clubsQueQuedan('club'), vistas = {};
    base.forEach(function(id){ ligasDe(id).forEach(function(l){ vistas[l] = 1; }); });
    var lids = Object.keys(vistas).filter(function(lid){
      // Un "promedio" de un solo club no es un promedio.
      return (window.leagueYears(lid) || []).some(function(y){
        return (window.clubsOfLeagueYear(lid, y) || []).filter(function(id){ return !!clubs[id]; }).length >= 2;
      });
    }).sort(function(a, b){
      return window.LEAGUES[a].name.localeCompare(window.LEAGUES[b].name, 'es');
    });
    if(!lids.length) return caja;

    caja.appendChild(el('p', 'paso-ayuda', t('sel.cmp.ligas', 'O medilo contra el promedio de una liga entera:')));
    var grid = el('div', 'op-grid clubes');
    lids.forEach(function(lid){
      var lg = window.LEAGUES[lid];
      var co = window.COUNTRIES[lg.country];
      var ys = window.leagueYears(lid) || [];
      grid.appendChild(opcionBtn({
        id:lid, icon:(co || {}).flag || '🏆', label:lg.name,
        sub:window.tierLabel(lg.tier),
        meta:ys.length + ' ' + t('sel.seasons', 'temporadas')
      }, !!(window.CLUB_COMPARE && CLUB_COMPARE.has('bench', lid)), function(id){
        Promise.resolve(CLUB_COMPARE.toggleBench(id)).then(renderModal);
      }));
    });
    caja.appendChild(grid);
    return caja;
  }

  // Los dos botones de arriba de la grilla. "Elegir todos" solo donde marcar todo
  // significa algo (el paso del club: arma el conjunto); "Deseleccionar todos" en
  // cualquier paso donde haya algo marcado, porque destildar de a uno cuando
  // marcaste once es un castigo (pedido de Guido).
  function botonesDeSeleccion(p, ops){
    if(comparando && p.clave === 'club') return null;
    var fila = el('div', 'paso-todos-fila');
    var libres = ops.filter(function(o){ return !o.disabled; });
    var marcados = st[p.clave].sel.length;
    var todosMarcados = libres.length && libres.every(function(o){ return tiene(p.clave, o.id); });

    if(p.todos && libres.length > 1){
      var b = el('button', 'paso-todos' + (todosMarcados ? ' on' : ''),
                 t('sel.all', 'Elegir todos') + ' (' + libres.length + ')');
      b.type = 'button';
      b.addEventListener('click', function(){
        st[p.clave].sel = libres.map(function(o){ return o.id; });
        renderModal();
      });
      fila.appendChild(b);
    }
    if(marcados){
      var d = el('button', 'paso-nada', t('sel.none', 'Deseleccionar todos') + ' (' + marcados + ')');
      d.type = 'button';
      d.addEventListener('click', function(){ st[p.clave].sel = []; renderModal(); });
      fila.appendChild(d);
    }
    return fila.children.length ? fila : null;
  }

  // El pie de cada paso: confirmar lo marcado, o decir que esto se decide después.
  // "Elegir más tarde" está SIEMPRE: esa regla es la que hace que ningún paso diga
  // "opcional", porque todos lo son.
  function pieDelPaso(p){
    var pie = el('div', 'paso-pie');
    // Comparando, el paso del club no confirma nada: la barra de abajo es la que
    // cierra, y cada tap ya sumó o sacó un sujeto.
    if(comparando && p.clave === 'club') return pie;

    if(p.cuerpo){
      var listo = !!(bloque && bloque.pares.length);
      var ok = el('button', 'paso-ok' + (listo ? '' : ' off'), t('sel.next', 'Continuar'));
      ok.type = 'button';
      ok.disabled = !listo;
      ok.addEventListener('click', function(){
        st[p.clave].resuelto = true;
        st[p.clave].saltado = false;
        renderModal();
      });
      pie.appendChild(ok);
      var reciente = el('button', 'paso-skip', t('sel.latest', 'Usar el más reciente de cada uno'));
      reciente.type = 'button';
      reciente.addEventListener('click', function(){
        if(bloque) bloque.pares = bloque.pares.map(function(par){ return [par[0], null]; });
        st[p.clave].resuelto = true;
        st[p.clave].saltado = true;
        renderModal();
      });
      pie.appendChild(reciente);
      return pie;
    }

    var n = st[p.clave].sel.length;
    var seguir = el('button', 'paso-ok' + (n ? '' : ' off'),
                    n ? t('sel.next.n', 'Continuar con') + ' ' + n : t('sel.next', 'Continuar'));
    seguir.type = 'button';
    seguir.disabled = !n;
    seguir.addEventListener('click', function(){
      st[p.clave].resuelto = true;
      st[p.clave].saltado = false;
      if(p.alResolver) p.alResolver();
      renderModal();
    });
    pie.appendChild(seguir);

    var luego = el('button', 'paso-skip', t('sel.later', 'Elegir más tarde'));
    luego.type = 'button';
    luego.title = t('sel.later.tip', 'Seguimos sin filtrar por esto. Podés volver cuando quieras.');
    luego.addEventListener('click', function(){
      st[p.clave].sel = [];
      st[p.clave].resuelto = true;
      st[p.clave].saltado = true;
      if(p.alResolver) p.alResolver();
      renderModal();
    });
    pie.appendChild(luego);
    return pie;
  }

  // "Cambiar" en un paso ya resuelto borra ESE y todos los de abajo. Volver atrás
  // sin invalidar lo que dependía de esa elección era justo el bug del selector de
  // columnas (to-do 29, que muere con este archivo): elegías Europa › España,
  // cambiabas la región a Asia, y LaLiga seguía en la columna.
  function volverA(i){
    var ps = PASOS();
    for(var j = i; j < ps.length; j++){
      var k = ps[j].clave;
      st[k] = { sel:(j === i ? st[k].sel : []), resuelto:false, saltado:false };
    }
    bloque = null;
    renderModal();
  }

  // ---------------------------------------------------------------------------
  // EL PASO DEL EJERCICIO. Una fila por club, con SUS ejercicios en un desplegable.
  //
  // LA REGLA DE COPY QUE VALE MÁS DE LO QUE PARECE: un ejercicio nunca aparece
  // suelto, siempre cuelga de su club ("Boca Juniors: [Balance 2024/2025 ▾]").
  // Viene de una queja concreta de Guido sobre una versión anterior del prototipo:
  // "si no, el usuario pierde noción de quién son los balances".
  // ---------------------------------------------------------------------------
  function cuerpoClubAnio(){
    var caja = el('div', 'armado');
    if(!bloque) return caja;

    // Un club puede aparecer más de una vez (Boca 24/25 y Boca 23/24): las filas se
    // agrupan por club para que "+ Otro ejercicio" caiga debajo del suyo.
    var orden = [];
    bloque.pares.forEach(function(par){ if(orden.indexOf(par[0]) < 0) orden.push(par[0]); });

    orden.forEach(function(id){
      var fila = el('div', 'arm-fila');
      var cab = el('div', 'arm-cab');
      cab.appendChild(el('span', 'arm-crest', initials(nameOf(id))));
      cab.appendChild(el('span', 'arm-n', nameOf(id)));
      fila.appendChild(cab);

      bloque.pares.forEach(function(par, i){
        if(par[0] !== id) return;
        var linea = el('div', 'arm-anio');
        var sel = document.createElement('select');
        var o0 = document.createElement('option');
        o0.value = '';
        o0.textContent = t('sel.latest.one', 'El más reciente');
        sel.appendChild(o0);
        yearsOf(id).forEach(function(p){
          var o = document.createElement('option');
          o.value = p[0];
          o.textContent = labelAnio(p[0], [id]);
          if(p[0] === par[1]) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', function(){
          bloque.pares[i] = [id, this.value ? Number(this.value) : null];
          renderModal();
        });
        linea.appendChild(sel);
        // La × solo cuando ese club tiene más de un ejercicio: sacar el único sería
        // sacar el club, y para eso está el paso anterior.
        if(bloque.pares.filter(function(p){ return p[0] === id; }).length > 1){
          var x = el('button', 'arm-x', '×');
          x.type = 'button';
          x.title = t('sel.drop.year', 'Sacar este ejercicio');
          x.addEventListener('click', function(){ bloque.pares.splice(i, 1); renderModal(); });
          linea.appendChild(x);
        }
        fila.appendChild(linea);
      });

      if(yearsOf(id).length > 1){
        var mas = el('button', 'arm-mas', '+ ' + t('sel.more.year', 'Otro ejercicio de') + ' ' + nameOf(id));
        mas.type = 'button';
        mas.addEventListener('click', function(){
          // El ejercicio nuevo arranca en el primero que ESE club todavía no tenga:
          // dos filas diciendo "el más reciente" son el mismo ejercicio dos veces.
          var usados = bloque.pares.filter(function(p){ return p[0] === id; })
                                   .map(function(p){ return p[1] != null ? p[1] : (yearsOf(id)[0] || [])[0]; });
          var libre = (yearsOf(id).filter(function(p){ return usados.indexOf(p[0]) < 0; })[0] || [])[0];
          bloque.pares.push([id, libre != null ? libre : null]);
          renderModal();
        });
        fila.appendChild(mas);
      }
      caja.appendChild(fila);
    });
    return caja;
  }

  // ---------------------------------------------------------------------------
  // EL CARD FINAL. No felicita a nadie: dice exactamente qué se eligió, incluido
  // el caso incómodo (no marcaste ningún club, así que son todos), y recién ahí
  // ofrece confirmarlo.
  // ---------------------------------------------------------------------------
  function paresDelBloque(){
    if(!bloque) return [];
    return bloque.pares.map(function(p){
      return [p[0], p[1] != null ? p[1] : (yearsOf(p[0])[0] || [])[0]];
    });
  }
  function clubesDelBloque(){
    var vistos = {};
    return paresDelBloque().map(function(p){ return p[0]; }).filter(function(id){
      if(vistos[id]) return false;
      vistos[id] = 1; return true;
    });
  }

  function cardFinal(){
    var card = el('div', 'paso ahora resultado');
    var head = el('div', 'paso-head');
    head.appendChild(el('span', 'paso-n', '✓'));
    var ht = el('span', 'paso-ht');
    ht.appendChild(el('span', 'paso-t', t('sel.done', 'Listo')));
    head.appendChild(ht);
    var reiniciar = el('button', 'paso-change', t('sel.restart', 'Empezar de nuevo'));
    reiniciar.type = 'button';
    reiniciar.addEventListener('click', function(){ reset(); renderModal(); });
    head.appendChild(reiniciar);
    card.appendChild(head);

    var body = el('div', 'paso-body');
    var ids = clubesDelBloque();
    var pares = paresDelBloque();

    if(!pares.length){
      body.appendChild(el('p', 'paso-vacio',
        t('sel.nothing', 'No quedó ningún ejercicio con esas opciones. Cambiá alguno de los pasos de arriba.')));
      card.appendChild(body);
      return card;
    }

    body.appendChild(el('p', 'res-msg', ids.length === 1 ? nameOf(ids[0]) : nClubes(ids.length)));
    body.appendChild(el('p', 'res-sub', nEjercicios(pares.length) + ' · '
      + ids.slice(0, 3).map(nameOf).join(', ') + (ids.length > 3 ? ', +' + (ids.length - 3) : '')));

    // Finanzas muestra UN club por vez. Si el visitante eligió varios, no se
    // descarta la selección en silencio: se dice qué va a ver.
    if(ids.length > 1){
      body.appendChild(el('p', 'res-sub', t('sel.many',
        'Finanzas muestra un club por vez, así que vas a ver el primero. Para verlos juntos está Comparar.')));
    }
    var uno = el('button', 'paso-ok', t('sel.see', 'Ver los números de') + ' ' + nameOf(ids[0]));
    uno.type = 'button';
    uno.addEventListener('click', function(){ confirmar(ids[0]); });
    body.appendChild(uno);

    card.appendChild(body);
    return card;
  }

  // ---------------------------------------------------------------------------
  // EL BUSCADOR. El atajo de un paso para el que ya sabe qué club quiere:
  // escribir "boca" y tocarlo, sin recorrer los cinco pasos.
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
      var ligas = ligasDe(id).map(function(l){ return (window.LEAGUES[l] || {}).name || ''; }).join(' ');
      return norm(nameOf(id)).indexOf(q) >= 0
          || (co && norm(t(co.key, co.name)).indexOf(q) >= 0)
          || norm(ligas).indexOf(q) >= 0;
    }));
    if(!hits.length){
      caja.appendChild(el('p', 'paso-vacio',
        t('sel.nohits', 'Ningún club, liga ni país con ese nombre. Probá con menos letras.')));
      return;
    }
    var grid = el('div', 'op-grid clubes');
    hits.forEach(function(id){
      var co = window.COUNTRIES[countryOf(id)];
      var op = { id:id, crest:initials(nameOf(id)), label:nameOf(id),
                 sub:co ? co.flag + ' ' + t(co.key, co.name) : '',
                 meta:nEjercicios(yearsOf(id).length) };
      if(comparando && window.CLUB_COMPARE){
        var motivo = CLUB_COMPARE.blockReason(id);
        if(motivo){ op.disabled = true; op.sub = motivo; }
      }
      grid.appendChild(opcionBtn(op, marcadoEn(PASO_CLUBES, id), function(cid){
        if(comparando){
          Promise.resolve(CLUB_COMPARE.toggleClub(cid)).then(function(){
            $('modalQ').value = '';
            renderBusqueda();
            renderModal();
          });
          return;
        }
        confirmar(cid);
      }));
    });
    caja.appendChild(grid);
  }

  // Elegir un club deja los pasos coherentes con lo que ves: se marcan solos con
  // el camino de ese club, en vez de quedar vacíos. `soloFiltros` para cuando se
  // usa al abrir el modal: ahí el club activo es el contexto, no una elección
  // hecha, así que el paso de clubes queda abierto donde está.
  function pararseEn(clubId, soloFiltros){
    reset();
    st.sport.sel   = [sportOf(clubId)];
    st.region.sel  = [regionOf(clubId)];
    st.country.sel = [countryOf(clubId)];
    ['sport', 'region', 'country'].forEach(function(k){ st[k].resuelto = true; });
    if(soloFiltros) return;
    st.club.sel = [clubId];
    st.club.resuelto = true;
    st.armado.resuelto = true;
    st.armado.saltado = true;
    bloque = { pares:[[clubId, null]], agg:'suma' };
  }

  // Cerrar el modal cargando el club elegido. Es el mismo camino que usaba el
  // panel viejo: `api.pickClub` lo provee index.html y hace todo lo demás.
  function confirmar(clubId){
    if(!clubId) return;
    pushRecent(clubId);
    try { localStorage.setItem(LS_CLUB, clubId); } catch(e){}
    close();
    Promise.resolve(api.pickClub(clubId)).then(function(){ renderButton(); });
  }

  // ---------------------------------------------------------------------------
  // RECIENTES. No se muestran (el modal no tiene esa fila), pero se siguen
  // guardando: los va a querer la vidriera de Inicio (to-do 33).
  // ---------------------------------------------------------------------------
  function recentsList(){
    try {
      var raw = localStorage.getItem(LS_RECENTS);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(function(id){ return !!clubs[id]; }) : [];
    } catch(e){ return []; }
  }
  function pushRecent(id){
    var r = recentsList().filter(function(x){ return x !== id; });
    r.unshift(id);
    try { localStorage.setItem(LS_RECENTS, JSON.stringify(r.slice(0, 6))); } catch(e){}
  }

  // ---------------------------------------------------------------------------
  // EL CARTELITO "Elegí tu club acá" (coach mark). Se muestra una sola vez, hasta
  // que el visitante elige un club o lo cierra.
  // ---------------------------------------------------------------------------
  function hideCoach(){
    var c = $('coachMark');
    if(!c) return;
    c.hidden = true;
    try { localStorage.setItem(LS_COACH, '1'); } catch(e){}
  }
  function maybeCoach(){
    var c = $('coachMark');
    if(!c) return;
    var seen = false;
    try { seen = !!localStorage.getItem(LS_COACH); } catch(e){}
    c.hidden = seen || !!api.getClub();
  }

  // ---------------------------------------------------------------------------
  // EL SELECTOR DENTRO DE FINANZAS (Versión 143). Sin club es lo único que hay
  // para hacer en esa pantalla; con club, es cómo se cambia.
  // ---------------------------------------------------------------------------
  function renderFinSelector(){
    var caja = $('finSelector');
    if(!caja) return;
    caja.innerHTML = '';
    var id = api.getClub();
    caja.className = 'fin-sel' + (id ? '' : ' vacio');
    var sec = $('finanzas');
    if(sec) sec.classList.toggle('sin-club', !id);

    caja.appendChild(el('span', 'fin-sel-ico', id ? initials(nameOf(id)) : '?'));

    var txt = el('span', 'fin-sel-txt');
    txt.appendChild(el('span', 'fin-sel-t', id ? nameOf(id) : t('finanzas.sel.none', 'Todavía no elegiste un club')));
    var sub;
    if(id){
      var co = window.COUNTRIES[countryOf(id)];
      sub = (co ? t(co.key, co.name) + ' · ' : '') + t('finanzas.sel.sub.club', 'los números de abajo son de este club');
    } else {
      sub = t('finanzas.sel.sub.none', 'Elegilo y acá abajo aparecen sus ingresos, gastos y deuda, ejercicio por ejercicio.');
    }
    txt.appendChild(el('span', 'fin-sel-s', sub));
    caja.appendChild(txt);

    var b = el('button', 'fin-sel-btn' + (id ? ' alt' : ''),
               id ? t('finanzas.sel.change', 'Cambiar de club') : t('finanzas.sel.pick', 'Elegir un club'));
    b.type = 'button';
    b.addEventListener('click', function(){ open(false); });
    caja.appendChild(b);
  }

  // ---------------------------------------------------------------------------
  // BOTÓN DEL HEADER
  // ---------------------------------------------------------------------------
  function renderButton(){
    // El selector de Finanzas se redibuja ACÁ y no en un evento propio:
    // `renderButton` es lo que el sitio ya llama cada vez que cambia el club
    // activo (`applyClubMode`), así que es el único punto donde enterarse sin
    // inventar un canal nuevo.
    renderFinSelector();
    maybeCoach();
    var id = api.getClub();
    var crest = $('cbCrest'), name = $('cbName'), eyebrow = $('cbEyebrow');
    if(!crest) return;
    if(!id){
      crest.textContent = '?';
      name.textContent = t('header.club.none', 'Elegí tu club');
      eyebrow.textContent = t('header.club.eyebrow.none', 'Todavía sin elegir');
      $('clubBtn').title = t('header.club.btn.none', 'Elegí un club para ver sus números (Ctrl+K)');
      return;
    }
    crest.textContent = initials(nameOf(id));
    name.textContent = nameOf(id);
    eyebrow.textContent = t('header.club.eyebrow', 'Estás viendo');
    var co = window.COUNTRIES[countryOf(id)];
    $('clubBtn').title = t('header.club.btn', 'Cambiar de club (Ctrl+K)')
      + (co ? ' · ' + nameOf(id) + ', ' + t(co.key, co.name) : '');
  }

  // Soltar el club y volver a la portada, que desde la Versión 144 es la pestaña
  // Inicio (la bifurcación), no un hero suelto.
  function goHome(){
    close();
    try { localStorage.removeItem(LS_CLUB); } catch(e){}
    Promise.resolve(api.pickClub(null)).then(function(){
      renderButton();
      var btn = document.querySelector('#mainNav button[data-section="inicio"]');
      if(btn) btn.click();
      window.scrollTo(0, 0);
    });
  }

  function savedClub(){
    try {
      var id = localStorage.getItem(LS_CLUB);
      return (id && clubs[id]) ? id : null;
    } catch(e){ return null; }
  }

  function init(hooks){
    if(inited) return;
    api.getClub  = hooks.getClub  || api.getClub;
    api.pickClub = hooks.pickClub || api.pickClub;

    $('clubBtn').addEventListener('click', function(){ open(false); });
    $('modalX').addEventListener('click', close);
    $('clubBackdrop').addEventListener('click', close);
    $('modalQ').addEventListener('input', renderBusqueda);
    var cx = $('coachX');
    if(cx) cx.addEventListener('click', function(e){ e.stopPropagation(); hideCoach(); });

    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && isOpen()) close();
      // Ctrl+K / Cmd+K: el atajo que anuncia el título del botón del header.
      if((ev.ctrlKey || ev.metaKey) && (ev.key === 'k' || ev.key === 'K')){
        ev.preventDefault();
        isOpen() ? close() : open(false);
      }
    });

    inited = true;
    renderButton();
  }

  return {
    init: init,
    open: open,
    close: close,
    // `refresh` la llama index.html para repintar después de un cambio de idioma.
    refresh: function(){ renderButton(); if(isOpen()) renderModal(); },
    renderButton: renderButton,
    goHome: goHome,
    savedClub: savedClub
  };
})();

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
  var CLAVES = ['sport', 'region', 'country', 'league', 'club', 'year'];
  var st = {};
  function reset(){
    CLAVES.forEach(function(k){ st[k] = { sel:[], resuelto:false, saltado:false }; });
  }
  reset();

  var abierto = true;          // el bloque entero, plegable cuando ya hay club
  var inited = false;
  var autoElegido = false;     // true cuando el sitio eligió por el visitante

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
      clave: 'sport', titulo: 'Elegí el deporte',
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
      clave: 'region', titulo: 'Elegí la región',
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
      clave: 'country', titulo: 'Elegí el país',
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
      clave: 'league', titulo: 'Elegí la liga',
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
      clave: 'club', titulo: 'Elegí el club',
      ayuda: 'Podés marcar más de uno: dos clubes marcados es una comparación.',
      etiqueta: function(id){ return nameOf(id); },
      opciones: function(){
        return ordenados(clubsQueQuedan('club')).map(function(id){
          var n = yearsOf(id).length;
          return { id:id, crest:initials(nameOf(id)), label:nameOf(id), meta: n === 1 ? '1 ejercicio' : n + ' ejercicios' };
        });
      }
    },
    {
      clave: 'year', titulo: 'Elegí el ejercicio',
      etiqueta: function(y){ return labelAnio(Number(y)); },
      opciones: function(){
        var finales = clubesFinales();
        var anios = {};
        finales.forEach(function(id){ yearsOf(id).forEach(function(par){ anios[par[0]] = 1; }); });
        return Object.keys(anios).map(Number).sort(function(a, b){ return b - a; }).map(function(y){
          var cuantos = finales.filter(function(id){
            return yearsOf(id).some(function(par){ return par[0] === y; });
          }).length;
          return {
            id: String(y), label: labelAnio(y),
            // Con varios clubes en juego, un año no siempre existe para todos, y eso
            // se dice ANTES de elegirlo en vez de sorprender con una barra vacía.
            meta: finales.length > 1 ? cuantos + ' de ' + finales.length : null
          };
        });
      }
    }
  ];

  // El label del ejercicio sale de `ejercicioLabel()`, el del sitio, porque un club
  // de año calendario (Japón, Brasil) no dice "2024/2025" sino "2025", y escribir el
  // rango sería una fecha falsa. Con clubes de los dos tipos mezclados no se puede
  // elegir uno solo, así que ahí va el año pelado.
  function labelAnio(y){
    var finales = clubesFinales();
    var conEse = finales.filter(function(id){
      return yearsOf(id).some(function(par){ return par[0] === y; });
    });
    if(!conEse.length || !window.ejercicioLabel) return String(y);
    var calendario = conEse.map(function(id){ return clubs[id].fiscalYearStart === '01-01'; });
    if(calendario.some(Boolean) && calendario.some(function(x){ return !x; })) return String(y);
    var par = yearsOf(conEse[0]).filter(function(p){ return p[0] === y; })[0];
    return window.ejercicioLabel(y, par[1], conEse[0]);
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
        if(p.ayuda) body.appendChild(el('p', 'paso-ayuda', p.ayuda));
        var ops = p.opciones();
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
        body.appendChild(pieDelPaso(p));
        card.appendChild(body);
      }
      wrap.appendChild(card);
    });

    if(todoResuelto()) wrap.appendChild(cardResultado());
  }

  // El pie de cada paso: confirmar lo marcado, o decir que esto se decide después.
  // "Elegir más tarde" está SIEMPRE, en los seis pasos: esa es la regla.
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
    } else {
      body.appendChild(el('p', 'res-msg', 'Comparando ' + finales.map(nameOf).join(' · ') + '.'));
      // (si finales quedó en 1 pero hay rivales sumados desde este mismo card, el
      //  nombre del rival ya está en st.club.sel y entra en `finales`)
      var ver = el('button', 'paso-ok', 'Ver la comparación');
      ver.type = 'button';
      ver.addEventListener('click', function(){
        var card2 = $('compareCard');
        if(card2 && !card2.hidden) card2.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      body.appendChild(ver);
    }
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
  function aplicar(){
    var finales = clubesFinales();
    autoElegido = !st.club.sel.length;
    var rivales = finales.slice(1);

    Promise.resolve(api.pickClub(finales[0])).then(function(){
      try { localStorage.setItem(LS_CLUB, finales[0]); } catch(e){}
      renderButton();
      var cmp = window.CLUB_COMPARE;
      var cadena = Promise.resolve();
      if(cmp){
        rivales.forEach(function(id){
          cadena = cadena.then(function(){ return cmp.toggleClub(id); });
        });
      }
      return cadena;
    }).then(function(){
      aplicarAnios(finales);
      render();
      irAlContenido();
    });
  }

  // Los años elegidos. Tres casos, y ninguno inventa un dato que no exista:
  //   - un club y un año        -> la ficha de Finanzas de ese ejercicio;
  //   - un club y varios años   -> ese club contra sí mismo, un sujeto por año;
  //   - varios clubes y un año  -> cada uno en ese año, y el que no lo tenga se
  //                                queda en el suyo (se avisa en el paso).
  function aplicarAnios(finales){
    var anios = st.year.sel.map(Number).sort(function(a, b){ return b - a; });
    if(!anios.length) return;
    var cmp = window.CLUB_COMPARE;

    if(finales.length === 1 && anios.length > 1 && cmp){
      // "+ Otro año" del propio sitio: agrega un sujeto más del club activo. Los
      // años exactos se fijan abajo, sobre los chips ya dibujados.
      for(var i = 1; i < anios.length; i++){
        var btn = $('ccYearBtn');
        if(btn && !btn.hidden) btn.click();
      }
    }
    if(window.goToFinanzasYear) window.goToFinanzasYear(finales[0], anios[0]);
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
      // Un sujeto por año cuando es el mismo club repetido; si no, el primero.
      var objetivo = finales.length === 1 ? (anios[i] != null ? anios[i] : anios[0]) : anios[0];
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
    Promise.resolve(window.CLUB_COMPARE.toggleClub(id)).then(function(){
      render();
      var card = $('compareCard');
      if(card && !card.hidden) card.scrollIntoView({ behavior:'smooth', block:'start' });
    });
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

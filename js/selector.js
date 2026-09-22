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
// LOS DOS CAMINOS (Versión 148, etapa 4). El modal es el mismo; lo único que
// cambia es a dónde va lo elegido, y eso es `origen`:
//
//   'finanzas' -> lo abrió Inicio ("ver un club"), el botón del header o el card
//                 de Finanzas. Los pasos son los filtros + clubes + ejercicio, y
//                 al confirmar se carga un club y la pantalla salta a Finanzas.
//   'vs'       -> lo abrió uno de los dos cards de la pestaña Comparar. Acá sí
//                 aparece el paso 4, "¿QUÉ QUERÉS MEDIR?", que bifurca:
//
//     1 Deporte → 2 Región → 3 País → 4 ¿QUÉ TIPO? → 5 cuál(es) → 6 año y agregador
//                                          │
//                 ┌────────────────────────┼────────────────────────┐
//             🏆 Ligas                 👕 Clubes                🧩 Mezcla
//        5 qué ligas                5 qué clubes           5 el constructor
//        6 temporada de cada una    6 ejercicio de cada    (cada bloque trae
//          + agregador                club                  lo suyo adentro)
//
// UN LADO ES UNA SUMA DE BLOQUES, y esa es la idea de fondo:
//
//   lado = { nombre, bloques:[ … ] }
//   { kind:'liga',   league:'ar-primera', years:[2025],      agg:'promedio'|'suma' }
//   { kind:'clubes', pares:[['boca',2025], ['river',null]],  agg:'promedio'|'suma' }
//
// Ligas y Clubes son ATAJOS que producen un lado de un solo bloque; la mezcla es
// el modelo completo. Un motor, tres puertas de entrada. El caso que la motivó,
// de Guido: "promedio de clubes colombianos + sumatoria de 6 clubes brasileros"
// contra Real Madrid. Consecuencia directa: el agregador no es del lado sino de
// cada bloque, así que el card no tiene un toggle Promedio/Sumatoria — muestra la
// FÓRMULA (`promedio(Primera 2025) + suma(6 clubes)`).
//
// `año === null` significa "el ejercicio más reciente de ESE club": los clubes no
// cierran todos el mismo día (uno argentino cierra en junio y uno japonés en
// diciembre). En un bloque de liga el año NO puede ser null: define QUIÉNES la
// integraban esa temporada.
//
// LOS DOS CARDS SON LA ÚNICA FORMA DE COMPARAR (Versión 152). `js/comparar-clubes.js`
// —la bandeja de chips de la Versión 137, con sus tres puntos de entrada— se
// borró: contestaba la misma pregunta de otra manera y convivían mal. Lo que ese
// archivo hacía mejor sí se conservó, y vive acá: los 6 indicadores con sus
// barras y sus notas, las 3 reglas de comparabilidad escritas en pantalla, y la
// composición de ingresos. Lo que NO sobrevivió es su modelo: un sujeto era un
// club o el promedio de una liga, y un lado que suma partes no es un sujeto.
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
  var LETRAS = ['A', 'B'];

  // LOS DOS LADOS de la pestaña Comparar. `null` = card vacío.
  var lado = [null, null];
  var mostrando = false;          // ¿ya se apretó "Comparar"?

  // --- ESTADO DE LOS PASOS ---------------------------------------------------
  // `armado` es el paso 6 (el año y el agregador). Está en la lista de claves
  // aunque no filtre nada: `pasoActual()` recorre esta misma lista para saber
  // dónde está parado el visitante.
  var CLAVES = ['sport', 'region', 'country', 'tipo', 'league', 'club', 'armado'];
  var st = {};
  var origen = 'finanzas';        // 'finanzas' | 'vs'
  var modalLado = 0;              // qué card abrió el modal
  var stGuardado = [null, null];  // lo elegido por cada card, para poder volver
  // Los bloques que se están armando: el paso 5 los CREA y el paso 6 (o el
  // constructor de la mezcla) los edita. Al confirmar, son el lado.
  var bloques = [];

  function reset(){
    CLAVES.forEach(function(k){ st[k] = { sel:[], resuelto:false, saltado:false }; });
    bloques = [];
    mezclaAbierto = null;
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
  // EL CÍRCULO DE INICIALES, PINTADO CON EL COLOR DEL CLUB (Versión 178, to-do 23(e)).
  // `brandColor` es opcional a propósito (ver la cabecera de data/clubs.js: un club sin un
  // color primario claro no lo lleva), así que `pintarCrest` tiene que saber VOLVER al azul
  // del sitio, no solo pintar: `#cbCrest` es UN solo nodo del header que se reusa en cada
  // cambio de club, y sin el reset el visitante se queda con el color del club anterior.
  function brandOf(id){ return (clubs[id] && clubs[id].brandColor) || null; }

  // Luminancia relativa (fórmula de WCAG 2.x): con qué color se leen las iniciales arriba del
  // fondo. NO se puede hardcodear blanco — el amarillo de Club América y el de Villarreal lo
  // borran — ni por club, que sería el mismo dato dos veces y se desincroniza al primer ajuste.
  function luminancia(hex){
    var h = String(hex || '').replace('#', '');
    if(h.length !== 6) return 1;
    var c = [0, 2, 4].map(function(i){
      var v = parseInt(h.slice(i, i + 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  // La regla es "blancas mientras se lean, negras cuando no": iniciales blancas salvo que el
  // contraste contra el fondo baje de 4:1 (la razón de WCAG), y ahí negras. Las dos
  // alternativas que se probaron y NO sirven:
  //   - Un umbral de luminancia a ojo (0,35) dejaba blanco sobre el celeste de Racing y el de
  //     Kawasaki Frontale a 2,8:1, ilegible, cuando en negro dan 6,8:1.
  //   - "Siempre el color que más contraste dé" parte a la familia de los rojos al medio: los
  //     rojos de los clubes caen justo en el cruce (4,3 contra 4,7), así que Independiente y
  //     Unión quedaban con iniciales NEGRAS y River, Estudiantes y Argentinos —del mismo rojo,
  //     a dos puntos de diferencia— con blancas. Se veía como un error, no como una regla.
  // El piso real que quedó, medido sobre los 39 clubes con color, es 4,11:1 (Atlético
  // Goianiense; después Athletic Club 4,26 y Grêmio 4,32): abajo de los 4,5 de WCAG para
  // texto chico, pero son dos iniciales en negrita y la alternativa era oscurecerles el
  // color de marca, que es justo lo que este campo no puede hacer.
  function textoSobre(hex){
    return 1.05 / (luminancia(hex) + 0.05) >= 4 ? '#fff' : '#111';
  }

  function pintarCrest(span, id){
    var c = brandOf(id);
    if(!c){ span.style.background = ''; span.style.color = ''; span.style.boxShadow = ''; return span; }
    span.style.background = c;
    span.style.color = textoSobre(c);
    // Un color muy claro (el amarillo de Club América, Villarreal o Mirassol) se confunde con
    // el fondo blanco de la fila: el aro va por dentro (box-shadow y no border) para no
    // cambiar el tamaño del círculo ni empujar el texto de al lado.
    span.style.boxShadow = luminancia(c) > 0.6 ? 'inset 0 0 0 1px rgba(0,0,0,.22)' : '';
    return span;
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
    if(corte > 4 && st.league.sel.length) ids = ids.filter(function(id){
      return ligasDe(id).some(function(l){ return st.league.sel.indexOf(l) >= 0; });
    });
    return ids;
  }

  // ---------------------------------------------------------------------------
  // LAS LIGAS Y SUS TEMPORADAS. Sale de `data/club-leagues.js`, el único archivo
  // que sabe la membresía POR AÑO: "Primera División 2024" no son los mismos
  // equipos que "Primera División 2025", y para la pregunta que motivó todo esto
  // ("¿la liga creció en plata?") mezclar los de un año con los del otro es
  // comparar dos cosas distintas. Ver CONVENCIONES.md, "no existe ninguna arista
  // club -> liga sin año".
  // ---------------------------------------------------------------------------
  function ligasConClubes(){
    return Object.keys(window.LEAGUES).filter(function(lid){
      return (window.clubsOfLeague(lid) || []).some(function(id){ return !!clubs[id]; });
    }).sort(function(a, b){
      return window.LEAGUES[a].name.localeCompare(window.LEAGUES[b].name, 'es');
    });
  }
  function temporadasDe(lid){ return (window.leagueYears(lid) || []).slice(); }
  function ultimaTemporada(lid){ return temporadasDe(lid)[0]; }
  function equiposDe(lid, y){
    return ordenados((window.clubsOfLeagueYear(lid, y) || []).filter(function(id){ return !!clubs[id]; }));
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

  var PASO_TIPO = {
    clave:'tipo', titulo:function(){ return t('sel.paso.tipo', '¿Qué querés medir?'); },
    etiqueta:function(id){
      return { liga:'🏆 ' + t('sel.tipo.liga', 'Ligas enteras'),
               club:'👕 ' + t('sel.tipo.club', 'Clubes'),
               mezcla:'🧩 ' + t('sel.tipo.mezcla', 'Una mezcla') }[id] || id;
    },
    unico:true,      // no es multi-selección: elegir uno avanza
    opciones:function(){
      return [
        { id:'liga',   icon:'🏆', label:t('sel.tipo.liga', 'Ligas enteras'),
          sub:t('sel.tipo.liga.s', 'Todos los equipos de una temporada, juntos') },
        { id:'club',   icon:'👕', label:t('sel.tipo.club', 'Clubes'),
          sub:t('sel.tipo.club.s', 'Uno, o varios elegidos a mano') },
        { id:'mezcla', icon:'🧩', label:t('sel.tipo.mezcla', 'Una mezcla'),
          sub:t('sel.tipo.mezcla.s', 'Ligas y clubes en el mismo lado') }
      ];
    }
  };

  var PASO_LIGAS = {
    clave:'league', titulo:function(){ return t('sel.paso.liga', 'Elegí una o más ligas'); },
    etiqueta:function(id){ return (window.LEAGUES[id] || {}).name || id; },
    opciones:function(){
      var base = clubsQueQuedan('league'), vistas = {};
      base.forEach(function(id){ ligasDe(id).forEach(function(l){ vistas[l] = 1; }); });
      return Object.keys(vistas).sort(function(a, b){
        return window.LEAGUES[a].name.localeCompare(window.LEAGUES[b].name, 'es');
      }).map(function(lid){
        var co = window.COUNTRIES[window.LEAGUES[lid].country] || {};
        return { id:lid, icon:co.flag || '🏆', label:window.LEAGUES[lid].name,
                 sub:window.tierLabel(window.LEAGUES[lid].tier),
                 meta:temporadasDe(lid).length + ' ' + t('sel.seasons', 'temporadas') };
      });
    },
    // Al resolverse crea un bloque por liga. El paso 6 les pone temporada y agregador.
    alResolver:function(){
      bloques = st.league.sel.map(function(lid){
        return { kind:'liga', league:lid, years:[ultimaTemporada(lid)].filter(function(y){ return y != null; }), agg:'promedio' };
      });
    }
  };

  var PASO_CLUBES = {
    clave:'club',
    titulo:function(){ return t('sel.paso.club', 'Elegí uno o más clubes'); },
    ayuda:function(){
      return origen === 'vs'
        ? t('sel.paso.club.ayuda.vs', 'Marcá los que quieras. Si marcás más de uno, este lado los mide como un conjunto, y en el paso siguiente elegís si los suma o los promedia.')
        : t('sel.paso.club.ayuda', 'Marcá los que quieras. Si marcás más de uno, en el paso siguiente elegís el ejercicio de cada uno.');
    },
    todos:true,
    etiqueta:function(id){ return nameOf(id); },
    opciones:function(){
      return ordenados(clubsQueQuedan('club')).map(function(id){
        var co = window.COUNTRIES[countryOf(id)];
        return { id:id, crest:initials(nameOf(id)), label:nameOf(id),
                 sub:co ? co.flag + ' ' + t(co.key, co.name) : '',
                 meta:nEjercicios(yearsOf(id).length) };
      });
    },
    // Un solo bloque con todos los clubes marcados, cada uno en su ejercicio más
    // reciente hasta que el paso 6 diga otra cosa.
    alResolver:function(){
      bloques = [{ pares:clubesElegidos().map(function(id){ return [id, null]; }), kind:'clubes', agg:'suma' }];
    }
  };

  // Los pasos 6 y el constructor no tienen `opciones()`: su cuerpo es propio, porque
  // no son una grilla de casillas sino una fila por sujeto.
  var PASO_LIGA_ANIO = { clave:'armado', titulo:function(){ return t('sel.paso.temporada', 'Elegí la temporada de cada liga'); }, cuerpo:cuerpoLigaAnio };
  var PASO_CLUB_ANIO = { clave:'armado', titulo:function(){ return t('sel.paso.anio', 'Elegí el ejercicio de cada club'); }, cuerpo:cuerpoClubAnio };
  var PASO_MEZCLA    = { clave:'armado', titulo:function(){ return t('sel.paso.mezcla', 'Armá este lado'); }, cuerpo:cuerpoMezcla };

  function pasosActivos(){
    var out = PASOS_FILTRO.slice();
    // Viniendo por "quiero ver un club en particular" no hay nada que bifurcar: ese
    // camino es de clubes por definición, y preguntarlo sería un peaje.
    if(origen === 'finanzas') return out.concat([PASO_CLUBES, PASO_CLUB_ANIO]);
    out.push(PASO_TIPO);
    var tipo = st.tipo.sel[0];
    if(tipo === 'liga')   return out.concat([PASO_LIGAS, PASO_LIGA_ANIO]);
    if(tipo === 'club')   return out.concat([PASO_CLUBES, PASO_CLUB_ANIO]);
    if(tipo === 'mezcla') return out.concat([PASO_MEZCLA]);
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

  // Abrir el modal. `i` es el card que lo pide (0 o 1) y `desde` a dónde va lo
  // elegido: 'finanzas' carga un club, 'vs' llena ese card.
  // LA ÚNICA FRONTERA ASYNC DEL SELECTOR (Versión 164). Las filas de
  // `data/club-leagues/<iso2>.js` ya no vienen en la primera visita: se bajan acá,
  // antes de dibujar. Se puso el await en la apertura y no adentro de los 6 helpers
  // a propósito: si los helpers devolvieran promesas habría que volver async cada
  // función de render del modal, y son muchas. Acá es una sola.
  // `loadClubLeagues()` cachea su promesa, así que reabrir el modal no vuelve a
  // pedir nada. Si un archivo de país falla, la promesa igual resuelve (avisa por
  // consola) y el modal abre sin esas ligas, en vez de no abrir.
  function abrirModal(i, desde){
    if(!inited) return;
    window.loadClubLeagues().then(function(){
      // El texto buscable incluye el nombre de las ligas de cada club, así que no
      // se puede armar antes de que la tabla esté cargada: se invalida acá para que
      // se rearme con las ligas adentro la primera vez que alguien escriba.
      invalidarIndiceBusqueda();
      // Cada apertura arranca con el tope puesto: si alguien apretó "Mostrar más" en
      // una sesión anterior del modal, no tiene por qué arrastrarlo a la siguiente.
      verTodosResultados(false);
      abrirModalYa(i, desde);
    });
  }

  function abrirModalYa(i, desde){
    hideCoach();
    origen = desde || 'finanzas';
    modalLado = i || 0;

    // Reabrir un card ya armado no empieza de cero: vuelve a lo que ese card había
    // elegido. "Elegir otro" casi siempre es "cambiar una cosa".
    if(origen === 'vs' && stGuardado[modalLado]){
      st = JSON.parse(JSON.stringify(stGuardado[modalLado].st));
      bloques = JSON.parse(JSON.stringify(stGuardado[modalLado].bloques));
      mezclaAbierto = null;
    } else {
      reset();
      // Los filtros arrancan parados donde está el club activo, así abrir el modal
      // muestra el contexto de lo que estás viendo en vez de la raíz. Para un card
      // de Comparar no: ahí lo que se busca es otra cosa, no dónde estás.
      var actual = api.getClub();
      if(actual && origen === 'finanzas') pararseEn(actual, true);
    }

    $('modalQ').value = '';
    $('modalResultados').hidden = true;
    $('modalWrap').hidden = false;
    $('modalTitulo').textContent = origen === 'vs'
      ? t('sel.modal.lado', 'Lado') + ' ' + LETRAS[modalLado]
      : t('sel.modal.club', 'Elegí el club');
    $('clubPanel').classList.add('open');
    $('clubBackdrop').classList.add('open');
    $('clubBtn').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    renderModal();
    setTimeout(function(){ $('modalQ').focus(); }, 30);
  }

  // La firma que llama index.html: el botón de club del header y la bifurcación de
  // Inicio abren el camino de Finanzas.
  function open(){ abrirModal(0, 'finanzas'); }

  function close(){
    $('clubPanel').classList.remove('open');
    $('clubBackdrop').classList.remove('open');
    $('clubBtn').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ---------------------------------------------------------------------------
  // DIBUJAR EL MODAL
  // ---------------------------------------------------------------------------
  function opcionBtn(op, marcado, onClick){
    var b = el('button', 'op' + (op.disabled ? ' off' : '') + (marcado ? ' on' : ''));
    b.type = 'button';
    b.appendChild(el('span', 'op-check', marcado ? '✓' : ''));
    if(op.icon) b.appendChild(el('span', 'op-icon', op.icon));
    // `op.crest` solo lo llevan las opciones de CLUB (las de país/liga/deporte traen `op.icon`),
    // así que acá `op.id` es siempre un clubId; para cualquier otra cosa brandOf() da null y el
    // círculo queda como estaba.
    else if(op.crest) b.appendChild(pintarCrest(el('span', 'op-crest', op.crest), op.id));
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
          var grid = el('div', 'op-grid' + (p.clave === 'club' ? ' clubes' : '') + (p.clave === 'tipo' ? ' tipo' : ''));
          ops.forEach(function(op){
            grid.appendChild(opcionBtn(op, tiene(p.clave, op.id), function(id){
              // El paso 4 es de elección única y avanza solo: es una bifurcación, no
              // un filtro, y marcar "ligas Y clubes" es justamente la tercera opción.
              if(p.unico){
                st[p.clave].sel = [id];
                st[p.clave].resuelto = true;
                st[p.clave].saltado = false;
                bloques = [];
                renderModal();
                return;
              }
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
    // El paso 4 avanza solo al tocar una opción: no tiene pie.
    if(p.unico) return pie;

    if(p.cuerpo){
      var listo = bloques.length && bloques.every(bloqueCompleto);
      var ok = el('button', 'paso-ok' + (listo ? '' : ' off'), t('sel.next', 'Continuar'));
      ok.type = 'button';
      ok.disabled = !listo;
      ok.addEventListener('click', function(){
        st[p.clave].resuelto = true;
        st[p.clave].saltado = false;
        renderModal();
      });
      pie.appendChild(ok);
      // En la mezcla no hay atajo: cada bloque ya trae su año adentro.
      if(st.tipo.sel[0] !== 'mezcla'){
        var reciente = el('button', 'paso-skip', t('sel.latest', 'Usar el más reciente de cada uno'));
        reciente.type = 'button';
        reciente.addEventListener('click', function(){
          bloques.forEach(function(b){
            if(b.kind === 'liga') b.years = [ultimaTemporada(b.league)].filter(function(y){ return y != null; });
            else b.pares = b.pares.map(function(par){ return [par[0], null]; });
          });
          st[p.clave].resuelto = true;
          st[p.clave].saltado = true;
          renderModal();
        });
        pie.appendChild(reciente);
      }
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
    // Volver a un paso invalida los bloques armados más abajo: si cambiás de ligas
    // a clubes, lo que ya habías armado no significa nada.
    bloques = [];
    mezclaAbierto = null;
    renderModal();
  }

  // ---------------------------------------------------------------------------
  // LOS CUERPOS PROPIOS DE LOS PASOS 6. Los tres arman la MISMA estructura (una
  // lista de bloques); lo único que cambia es qué se pregunta de cada uno.
  //
  // LA REGLA DE COPY QUE LOS UNE, y que vale más de lo que parece: un ejercicio
  // nunca aparece suelto, siempre cuelga de su club o de su liga ("Boca Juniors:
  // [Balance 2024/2025 ▾]"). Viene de una queja concreta de Guido sobre una
  // versión anterior del prototipo: "si no, el usuario pierde noción de quién son
  // los balances".
  // ---------------------------------------------------------------------------
  function bloqueCompleto(b){
    return b.kind === 'liga' ? b.years.length > 0 : b.pares.length > 0;
  }
  function nEjerciciosDe(b){ return paresDeBloque(b).length; }

  // El control de agregación, el mismo en los tres cuerpos. Con un solo ejercicio
  // no se muestra: promedio y suma dan idéntico y el botón sería ruido.
  function selectorAgg(b){
    if(nEjerciciosDe(b) < 2) return null;
    var fila = el('div', 'agg-fila');
    fila.appendChild(el('span', 'agg-lbl', t('sel.agg', 'Cómo se agrega')));
    [['promedio', t('sel.agg.avg', 'Promedio'), t('sel.agg.avg.tip', 'El valor de un integrante típico')],
     ['suma',     t('sel.agg.sum', 'Sumatoria'), t('sel.agg.sum.tip', 'Todo lo que movieron, sumado')]].forEach(function(m){
      var btn = el('button', 'agg-btn' + (b.agg === m[0] ? ' on' : ''), m[1]);
      btn.type = 'button';
      btn.title = m[2];
      btn.addEventListener('click', function(){ b.agg = m[0]; renderModal(); });
      fila.appendChild(btn);
    });
    return fila;
  }

  // --- RAMA LIGAS: una fila por liga, con sus temporadas como chips -------------
  // Chips y no un desplegable: son pocas temporadas, y el conteo de equipos de cada
  // una es justamente el dato que hace que "la liga creció" se lea bien. Si 2024
  // tenía 10 equipos y 2025 tiene 11, parte del crecimiento es aritmética.
  function cuerpoLigaAnio(){
    var caja = el('div', 'armado');
    bloques.forEach(function(b){
      var lg = window.LEAGUES[b.league] || {};
      var co = window.COUNTRIES[lg.country] || {};
      var fila = el('div', 'arm-fila');
      var cab = el('div', 'arm-cab');
      cab.appendChild(el('span', 'arm-ico', co.flag || '🏆'));
      cab.appendChild(el('span', 'arm-n', lg.name || b.league));
      fila.appendChild(cab);

      var chips = el('div', 'arm-chips');
      var temps = temporadasDe(b.league);
      if(!temps.length){
        chips.appendChild(el('span', 'arm-vacio', t('sel.liga.sintemp', 'Sin temporadas verificadas para esta liga.')));
      }
      temps.forEach(function(y){
        var n = equiposDe(b.league, y).length;
        var on = b.years.indexOf(y) >= 0;
        var c = el('button', 'arm-chip' + (on ? ' on' : '') + (n ? '' : ' off'),
                   y + ' · ' + n + ' ' + (n === 1 ? t('sel.team', 'equipo') : t('sel.teams', 'equipos')));
        c.type = 'button';
        if(!n){ c.disabled = true; c.title = t('sel.liga.sindatos', 'Ningún club de esa temporada tiene datos cargados'); }
        else c.addEventListener('click', function(){
          var i = b.years.indexOf(y);
          if(i >= 0) b.years.splice(i, 1); else b.years.push(y);
          renderModal();
        });
        chips.appendChild(c);
      });
      fila.appendChild(chips);
      var agg = selectorAgg(b);
      if(agg) fila.appendChild(agg);
      caja.appendChild(fila);
    });
    return caja;
  }

  // --- RAMA CLUBES: una fila por club, con SUS ejercicios en un desplegable -----
  function cuerpoClubAnio(){
    var caja = el('div', 'armado');
    var b = bloques[0];
    if(!b) return caja;

    // Un club puede aparecer más de una vez (Boca 24/25 y Boca 23/24): las filas se
    // agrupan por club para que "+ Otro ejercicio" caiga debajo del suyo.
    var orden = [];
    b.pares.forEach(function(par){ if(orden.indexOf(par[0]) < 0) orden.push(par[0]); });

    orden.forEach(function(id){
      var fila = el('div', 'arm-fila');
      var cab = el('div', 'arm-cab');
      cab.appendChild(pintarCrest(el('span', 'arm-crest', initials(nameOf(id))), id));
      cab.appendChild(el('span', 'arm-n', nameOf(id)));
      fila.appendChild(cab);

      b.pares.forEach(function(par, i){
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
          b.pares[i] = [id, this.value ? Number(this.value) : null];
          renderModal();
        });
        linea.appendChild(sel);
        // La × solo cuando ese club tiene más de un ejercicio: sacar el único sería
        // sacar el club, y para eso está el paso anterior.
        if(b.pares.filter(function(p){ return p[0] === id; }).length > 1){
          var x = el('button', 'arm-x', '×');
          x.type = 'button';
          x.title = t('sel.drop.year', 'Sacar este ejercicio');
          x.addEventListener('click', function(){ b.pares.splice(i, 1); renderModal(); });
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
          var usados = b.pares.filter(function(p){ return p[0] === id; })
                              .map(function(p){ return p[1] != null ? p[1] : (yearsOf(id)[0] || [])[0]; });
          var libre = (yearsOf(id).filter(function(p){ return usados.indexOf(p[0]) < 0; })[0] || [])[0];
          b.pares.push([id, libre != null ? libre : null]);
          renderModal();
        });
        fila.appendChild(mas);
      }
      caja.appendChild(fila);
    });

    // El agregador es del CONJUNTO, no de cada club: una sola fila al final. Solo
    // en el camino de la comparación: para Finanzas se ve un club por vez.
    if(origen === 'vs'){
      var agg = selectorAgg(b);
      if(agg){
        var pie = el('div', 'arm-fila total');
        pie.appendChild(el('span', 'arm-n', t('sel.together', 'Los') + ' ' + orden.length + ' ' + t('sel.together2', 'juntos')));
        pie.appendChild(agg);
        caja.appendChild(pie);
      }
    }
    return caja;
  }

  // --- RAMA MEZCLA: el constructor, con forma de tabla dinámica ----------------
  // Filas = bloques, y cada fila trae QUÉ, QUÉ AÑO, CÓMO SE AGREGA y QUÉ ENTRA.
  //
  // "QUÉ ENTRA" y no "cuánto aporta" (que era la idea original): el aporte en plata
  // obliga a bajar el `data/<club>-data.js` de cada club del bloque, y eso es justo
  // lo que el selector NO hace mientras elegís — son 41 archivos y el sitio los
  // carga por demanda. El conteo de ejercicios sale del índice liviano y ya dice si
  // el bloque tiene sustancia. La plata aparece al comparar.
  var mezclaAbierto = null;   // 'liga' | 'clubes' | null — el panel de agregar
  var mezclaTmp = { league:null, years:[], ids:[] };
  // ESTADO PROPIO DEL PANEL, NO COMPARTIDO CON EL BUSCADOR DEL MODAL (Versión 174).
  // `mostrarTodos` (abajo, en la zona del buscador) es de módulo y lo miran TODAS las
  // grillas con tope: si esta grilla lo prendiera, abrir "Mostrar más" acá dejaría el
  // buscador del modal ya expandido sin que nadie lo pidiera. Mismo criterio para el
  // texto del filtro: es de este panel, no del modal.
  var mezclaQ = '';           // lo que hay escrito en el filtro de la grilla de clubes
  var mezclaTodos = false;    // lo prende el "Mostrar más" de esa grilla, y sólo ese

  function cuerpoMezcla(){
    var caja = el('div', 'armado mezcla');
    if(!bloques.length){
      caja.appendChild(el('p', 'paso-ayuda', t('sel.mezcla.ayuda',
        'Este lado se arma con partes. Cada parte puede ser una liga entera o un puñado de clubes, y cada una se agrega a su manera: podés poner el PROMEDIO de una liga junto a la SUMA de seis clubes.')));
    }

    bloques.forEach(function(b, i){
      var fila = el('div', 'mz-fila');
      fila.appendChild(el('span', 'mz-num', String(i + 1)));

      var qu = el('div', 'mz-que');
      qu.appendChild(el('span', 'mz-n', nombreBloque(b)));
      qu.appendChild(el('span', 'mz-s', detalleBloque(b)));
      fila.appendChild(qu);

      // Temporada. En un bloque de clubes es UNA para todo el bloque (o "el más
      // reciente de cada uno"): el detalle por club vive en la rama Clubes, y
      // meterlo también acá haría de cada fila un formulario.
      fila.appendChild(selectorTemporada(b));

      var agg = el('div', 'mz-agg');
      [['promedio', t('sel.agg.avg', 'Promedio')], ['suma', t('sel.agg.sum', 'Sumatoria')]].forEach(function(m){
        var btn = el('button', 'agg-btn' + (b.agg === m[0] ? ' on' : ''), m[1]);
        btn.type = 'button';
        btn.addEventListener('click', function(){ b.agg = m[0]; renderModal(); });
        agg.appendChild(btn);
      });
      fila.appendChild(agg);
      fila.appendChild(el('span', 'mz-entra', nEjercicios(nEjerciciosDe(b))));

      var x = el('button', 'mz-x', '×');
      x.type = 'button';
      x.title = t('sel.mezcla.drop', 'Sacar esta parte');
      x.addEventListener('click', function(){ bloques.splice(i, 1); renderModal(); });
      fila.appendChild(x);
      caja.appendChild(fila);
    });

    if(bloques.length) caja.appendChild(el('p', 'mz-formula', formulaDe({ bloques:bloques })));
    caja.appendChild(mezclaAbierto ? panelAgregar() : botonesAgregar());
    return caja;
  }

  function botonesAgregar(){
    var fila = el('div', 'mz-add');
    [['liga', '+ ' + t('sel.mezcla.addliga', 'Agregar una liga')],
     ['clubes', '+ ' + t('sel.mezcla.addclubes', 'Agregar clubes')]].forEach(function(o){
      var b = el('button', 'mz-add-btn', o[1]);
      b.type = 'button';
      b.addEventListener('click', function(){
        mezclaAbierto = o[0];
        mezclaTmp = { league:null, years:[], ids:[] };
        // Un panel nuevo arranca sin filtro y con el tope puesto, igual que `mezclaTmp`
        // arranca vacío: lo que se escribió para armar el bloque anterior no se hereda.
        mezclaQ = '';
        mezclaTodos = false;
        renderModal();
      });
      fila.appendChild(b);
    });
    return fila;
  }

  // El panel de agregar: el mismo mini-flujo de las otras dos ramas, en chiquito y
  // adentro del constructor, para no abrir un modal arriba de otro modal.
  function panelAgregar(){
    var caja = el('div', 'mz-panel');
    caja.appendChild(el('p', 'mz-panel-t', mezclaAbierto === 'liga'
      ? t('sel.mezcla.queliga', 'Qué liga entra') : t('sel.mezcla.queclubes', 'Qué clubes entran')));

    if(mezclaAbierto === 'liga'){
      var grid = el('div', 'op-grid');
      ligasConClubes().forEach(function(lid){
        var lg = window.LEAGUES[lid], co = window.COUNTRIES[lg.country] || {};
        grid.appendChild(opcionBtn({
          id:lid, icon:co.flag || '🏆', label:lg.name, sub:window.tierLabel(lg.tier),
          meta:temporadasDe(lid).length + ' ' + t('sel.seasons', 'temporadas')
        }, mezclaTmp.league === lid, function(id){
          mezclaTmp.league = id;
          mezclaTmp.years = [ultimaTemporada(id)].filter(function(y){ return y != null; });
          renderModal();
        }));
      });
      caja.appendChild(grid);
      if(mezclaTmp.league){
        var chips = el('div', 'arm-chips');
        temporadasDe(mezclaTmp.league).forEach(function(y){
          var n = equiposDe(mezclaTmp.league, y).length;
          var on = mezclaTmp.years.indexOf(y) >= 0;
          var c = el('button', 'arm-chip' + (on ? ' on' : '') + (n ? '' : ' off'),
                     y + ' · ' + n + ' ' + (n === 1 ? t('sel.team', 'equipo') : t('sel.teams', 'equipos')));
          c.type = 'button';
          if(!n) c.disabled = true;
          else c.addEventListener('click', function(){
            var i = mezclaTmp.years.indexOf(y);
            if(i >= 0) mezclaTmp.years.splice(i, 1); else mezclaTmp.years.push(y);
            renderModal();
          });
          chips.appendChild(c);
        });
        caja.appendChild(chips);
      }
    } else {
      // MISMO TOPE QUE EL BUSCADOR (Versión 165), pero con una diferencia que no se
      // puede saltear: acá el visitante está SELECCIONANDO, así que los clubes que ya
      // marcó van primero y nunca quedan escondidos detrás del tope. Esconderle algo
      // que marcó se leería como que se le borró la selección.
      //
      // Y CON SU PROPIO FILTRO (Versión 174), porque el tope arregla el jank y no el
      // problema de fondo: a 1000 clubes una grilla para elegir a ojo no sirve aunque
      // sea rápida. Tres cosas propias de acá, y ninguna es un descuido:
      //
      // 1. LOS YA MARCADOS NO SE FILTRAN NUNCA. Van primero, matcheen o no el texto:
      //    el filtro achica sólo el "resto", por lo mismo que el tope no los toca.
      // 2. NO BUSCA LIGAS, a diferencia del buscador del modal (donde una liga es un
      //    lado posible). Acá sólo se eligen clubes y cada botón imprime nombre +
      //    país, así que el filtro mira exactamente eso: `indiceClubPais()`, no
      //    `indiceBusqueda()`, que trae los nombres de las ligas adentro.
      // 3. EL INPUT SE CREA ACÁ. El #modalQ del modal principal no existe en este
      //    panel: el constructor de mezcla es otro modal, a propósito (ver el
      //    comentario arriba de esta función). Por eso su texto y su "Mostrar más"
      //    viven en estado propio del panel: renderModal() rehace este DOM entero en
      //    cada tilde, y sin ese estado el filtro se borraría al marcar un club.
      var busca = el('div', 'modal-busca');
      var lupa = el('span', 'lupa', '\uD83D\uDD0D');
      lupa.setAttribute('aria-hidden', 'true');
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.placeholder = t('sel.mezcla.buscaph', 'Filtrá por club o país…');
      inp.value = mezclaQ;
      busca.appendChild(lupa);
      busca.appendChild(inp);
      caja.appendChild(busca);

      // La grilla se repinta SOLA, sin pasar por renderModal(): si el panel entero se
      // rehiciera en cada tecla, el input moriría con él y se perdería el foco a la
      // primera letra.
      var wrap = el('div', 'mz-grilla');
      caja.appendChild(wrap);

      var todosIds = ordenados(Object.keys(window.CLUB_INDEX).filter(function(id){ return !!clubs[id]; }));
      var pintarGrilla = function(){
        wrap.innerHTML = '';
        var q = norm(mezclaQ.trim());
        var txt = indiceClubPais();
        var marcados = todosIds.filter(function(id){ return mezclaTmp.ids.indexOf(id) >= 0; });
        var resto = todosIds.filter(function(id){
          return mezclaTmp.ids.indexOf(id) < 0 && (!q || (txt[id] || '').indexOf(q) >= 0);
        });
        // El tope se cuenta sobre marcados + resto, igual que antes: los marcados van
        // primero, así que nunca son ellos los que quedan detrás de "Mostrar más".
        grillaConTope(marcados.concat(resto), wrap, function(id){
          var co = window.COUNTRIES[countryOf(id)] || {};
          return opcionBtn({
            id:id, crest:initials(nameOf(id)), label:nameOf(id),
            sub:(co.flag || '') + ' ' + t(co.key, co.name || ''),
            meta:nEjercicios(yearsOf(id).length)
          }, mezclaTmp.ids.indexOf(id) >= 0, function(cid){
            var i = mezclaTmp.ids.indexOf(cid);
            if(i >= 0) mezclaTmp.ids.splice(i, 1); else mezclaTmp.ids.push(cid);
            renderModal();
          });
        }, pintarGrilla, { ver:mezclaTodos, expandir:function(){ mezclaTodos = true; } });
        // El aviso va aunque haya marcados arriba: si no, escribir cualquier cosa deja
        // en pantalla sólo lo ya tildado y se lee como que el filtro no hizo nada.
        // Pero un marcado que SÍ matchea cuenta como resultado: con "boca" escrito y
        // Boca tildado, el club está ahí en pantalla y decir "ningún club con ese
        // nombre" arriba de él es simplemente falso.
        var matcheaAlgunMarcado = marcados.some(function(id){
          return (txt[id] || '').indexOf(q) >= 0;
        });
        if(q && !resto.length && !matcheaAlgunMarcado){
          wrap.appendChild(el('p', 'paso-vacio',
            t('sel.mezcla.nohits', 'Ningún club con ese nombre. Probá con menos letras.')));
        }
      };
      pintarGrilla();

      // Mismo debounce que el buscador del modal (160 ms) y por el mismo motivo.
      var debMz = null;
      inp.addEventListener('input', function(){
        clearTimeout(debMz);
        var v = inp.value;
        debMz = setTimeout(function(){
          mezclaQ = v;
          mezclaTodos = false;   // consulta nueva, tope puesto de nuevo
          pintarGrilla();
        }, 160);
      });
    }

    var pie = el('div', 'paso-pie');
    var listo = mezclaAbierto === 'liga' ? (mezclaTmp.league && mezclaTmp.years.length) : mezclaTmp.ids.length;
    var ok = el('button', 'paso-ok' + (listo ? '' : ' off'), t('sel.mezcla.add', 'Agregar a este lado'));
    ok.type = 'button';
    ok.disabled = !listo;
    ok.addEventListener('click', function(){
      if(mezclaAbierto === 'liga'){
        bloques.push({ kind:'liga', league:mezclaTmp.league, years:mezclaTmp.years.slice(), agg:'promedio' });
      } else {
        bloques.push({ kind:'clubes', pares:mezclaTmp.ids.map(function(id){ return [id, null]; }), agg:'suma' });
      }
      mezclaAbierto = null;
      renderModal();
    });
    pie.appendChild(ok);
    var cancel = el('button', 'paso-skip', t('cmp.cancel', 'Cancelar'));
    cancel.type = 'button';
    cancel.addEventListener('click', function(){ mezclaAbierto = null; renderModal(); });
    pie.appendChild(cancel);
    caja.appendChild(pie);
    return caja;
  }

  // La temporada de un bloque dentro del constructor.
  function selectorTemporada(b){
    var caja = el('div', 'mz-anio');
    var sel = document.createElement('select');
    if(b.kind === 'liga'){
      temporadasDe(b.league).forEach(function(y){
        var o = document.createElement('option');
        o.value = y;
        o.textContent = y + ' · ' + equiposDe(b.league, y).length + ' ' + t('sel.teams.short', 'eq.');
        if(b.years.indexOf(y) >= 0) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', function(){ b.years = [Number(this.value)]; renderModal(); });
    } else {
      var o0 = document.createElement('option');
      o0.value = '';
      o0.textContent = t('sel.latest.one', 'El más reciente');
      sel.appendChild(o0);
      var anios = {};
      b.pares.forEach(function(par){ yearsOf(par[0]).forEach(function(p){ anios[p[0]] = 1; }); });
      Object.keys(anios).map(Number).sort(function(a, c){ return c - a; }).forEach(function(y){
        var o = document.createElement('option');
        o.value = y;
        o.textContent = t('sel.close', 'Cierre') + ' ' + y;
        if(b.pares.length && b.pares[0][1] === y) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', function(){
        var v = this.value ? Number(this.value) : null;
        b.pares = b.pares.map(function(par){ return [par[0], v]; });
        renderModal();
      });
    }
    caja.appendChild(sel);
    return caja;
  }

  // ---------------------------------------------------------------------------
  // CÓMO SE LLAMA CADA BLOQUE, Y LA FÓRMULA DEL LADO
  // ---------------------------------------------------------------------------
  function nombreBloque(b){
    if(b.kind === 'liga'){
      var lg = window.LEAGUES[b.league] || {};
      return (lg.name || b.league) + (b.years.length
        ? ' ' + b.years.slice().sort(function(a, c){ return c - a; }).join(' + ') : '');
    }
    var ids = clubesDelBloque(b);
    return ids.length === 1 ? nameOf(ids[0]) : nClubes(ids.length);
  }
  function detalleBloque(b){
    if(b.kind === 'liga'){
      var n = paresDeBloque(b).length;
      return n + ' ' + (n === 1 ? t('sel.team.data', 'equipo con datos') : t('sel.teams.data', 'equipos con datos'));
    }
    var ids = clubesDelBloque(b);
    return ids.slice(0, 3).map(nameOf).join(', ') + (ids.length > 3 ? ', +' + (ids.length - 3) : '');
  }
  function clubesDelBloque(b){
    if(b.kind === 'liga') return equiposDe(b.league, b.years[0]);
    var vistos = {}, out = [];
    b.pares.forEach(function(par){ if(!vistos[par[0]]){ vistos[par[0]] = 1; out.push(par[0]); } });
    return out;
  }
  // La fórmula del lado, en castellano y siempre a la vista: es lo único que
  // explica un total que mezcla un promedio con una sumatoria.
  function formulaDe(l){
    return (l.bloques || []).map(function(b){
      return (b.agg === 'promedio' ? t('sel.agg.avg.f', 'promedio') : t('sel.agg.sum.f', 'suma'))
             + '(' + nombreBloque(b) + ')';
    }).join('  +  ');
  }

  // ---------------------------------------------------------------------------
  // EL CARD FINAL. No felicita a nadie: dice exactamente qué se eligió, incluido
  // el caso incómodo (no marcaste ningún club, así que son todos), y recién ahí
  // ofrece confirmarlo.
  // ---------------------------------------------------------------------------
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
    var l = { bloques:bloques };
    var ids = clubesDe(l);
    var pares = paresDe(l);

    if(!pares.length){
      body.appendChild(el('p', 'paso-vacio',
        t('sel.nothing', 'No quedó ningún ejercicio con esas opciones. Cambiá alguno de los pasos de arriba.')));
      card.appendChild(body);
      return card;
    }

    body.appendChild(el('p', 'res-msg', bloques.map(nombreBloque).join(' + ')));
    body.appendChild(el('p', 'res-sub', nEjercicios(pares.length) + ' ' + t('sel.of', 'de') + ' '
      + nClubes(ids.length) + '. ' + formulaDe(l) + '.'));

    // Peras con manzanas: se avisa, no se prohíbe (decisión explícita de Guido:
    // "suma peras con manzanas pero no es mi tema, yo tengo que dar la funcionalidad").
    var aggs = {};
    bloques.forEach(function(b){ aggs[b.agg] = 1; });
    if(Object.keys(aggs).length > 1){
      body.appendChild(el('p', 'res-warn', '⚠ ' + t('sel.warn.mezcla',
        'Este lado mezcla un promedio con una sumatoria, así que el total suma un integrante típico con un conjunto entero. Sirve para armar un rival a medida, no para decir "esto es lo que generan juntos".')));
    }

    // EL CAMINO "UN CLUB EN PARTICULAR" termina en Finanzas, que muestra un club por
    // vez. Si el visitante eligió varios, no se descarta la selección en silencio:
    // se dice qué va a ver y se ofrece el otro camino con lo mismo que ya eligió.
    if(origen === 'finanzas'){
      if(ids.length > 1){
        body.appendChild(el('p', 'res-sub', t('sel.many',
          'Finanzas muestra un club por vez, así que vas a ver el primero. Para verlos juntos está Comparar.')));
      }
      var uno = el('button', 'paso-ok', t('sel.see', 'Ver los números de') + ' ' + nameOf(ids[0]));
      uno.type = 'button';
      uno.addEventListener('click', function(){ confirmar('finanzas'); });
      body.appendChild(uno);
      if(ids.length > 1){
        var aVs = el('button', 'paso-skip', t('sel.tovs', 'Llevar los') + ' ' + ids.length + ' ' + t('sel.tovs2', 'a Comparar'));
        aVs.type = 'button';
        aVs.addEventListener('click', function(){ confirmar('vs'); });
        body.appendChild(aVs);
      }
      card.appendChild(body);
      return card;
    }

    var ok = el('button', 'paso-ok', t('sel.uselado', 'Usar como lado') + ' ' + LETRAS[modalLado]);
    ok.type = 'button';
    ok.addEventListener('click', function(){ confirmar('vs'); });
    body.appendChild(ok);

    // EL ATAJO DE LAS DOS TEMPORADAS. "La Primera 2025 contra la Primera 2024" es la
    // pregunta que arrancó todo esto, y marcando las dos temporadas en un mismo
    // bloque lo que se arma es la SUMA de las dos. Este botón parte ese bloque en
    // los dos cards, que es lo que el visitante quería decir.
    if(bloques.length === 1 && bloques[0].kind === 'liga' && bloques[0].years.length === 2){
      var ys = bloques[0].years.slice().sort(function(a, b){ return b - a; });
      var partir = el('button', 'paso-skip', ys[0] + ' ' + t('sel.split', 'acá y') + ' ' + ys[1] + ' ' + t('sel.split2', 'en el otro card'));
      partir.type = 'button';
      partir.title = t('sel.split.tip', 'Para compararlas en vez de sumarlas');
      partir.addEventListener('click', function(){ partirTemporadas(ys); });
      body.appendChild(partir);
    }

    card.appendChild(body);
    return card;
  }

  function partirTemporadas(ys){
    var lid = bloques[0].league, agg = bloques[0].agg;
    var copia = JSON.parse(JSON.stringify(st));
    [0, 1].forEach(function(i){
      var b = { kind:'liga', league:lid, years:[ys[i]], agg:agg };
      lado[i] = ladoDesde([b]);
      // Cada card se queda con SU camino: reabrir cualquiera de los dos vuelve a los
      // pasos con esa temporada marcada, no a cero.
      stGuardado[i] = { st:JSON.parse(JSON.stringify(copia)), bloques:[JSON.parse(JSON.stringify(b))] };
    });
    mostrando = false;
    close();
    render();
    irASeccion('vs');
  }

  function ladoDesde(bs){
    return { nombre:bs.map(nombreBloque).join(' + '), bloques:bs };
  }

  function irASeccion(id){
    var btn = document.querySelector('#mainNav button[data-section="' + id + '"]');
    if(btn) btn.click();
    window.scrollTo(0, 0);
  }

  // Cerrar el modal metiendo lo elegido donde corresponda. `destino` gana sobre
  // `origen` en el único caso en que no coinciden: elegiste varios clubes viniendo
  // por el camino de "un club" y pediste llevarlos a Comparar.
  function confirmar(destino){
    var ids = clubesDe({ bloques:bloques });
    if(!ids.length) return;
    destino = destino || origen;

    if(destino === 'vs'){
      lado[modalLado] = ladoDesde(JSON.parse(JSON.stringify(bloques)));
      stGuardado[modalLado] = { st:JSON.parse(JSON.stringify(st)), bloques:JSON.parse(JSON.stringify(bloques)) };
      mostrando = false;
      close();
      render();
      irASeccion('vs');
      return;
    }

    pushRecent(ids[0]);
    try { localStorage.setItem(LS_CLUB, ids[0]); } catch(e){}
    close();
    Promise.resolve(api.pickClub(ids[0])).then(function(){
      renderButton();
      irASeccion('finanzas');
    });
  }

  // ---------------------------------------------------------------------------
  // CÁLCULO. Un lado ya es una lista de pares (club, ejercicio); acá solo se suman
  // y se cuenta quién aporta. Los números salen de `computeYearGeneric()`, el
  // MOTOR REAL del sitio: la cascada del resultado NUNCA se reimplementa por
  // afuera (se probó, y una fórmula simplificada tiró 12 falsos positivos porque
  // no contemplaba nonCash, profitOnPlayerSales, assetSales ni tax).
  // ---------------------------------------------------------------------------
  // LOS 6 INDICADORES, los mismos que dibujaba la vista de barras de
  // js/comparar-clubes.js hasta la Versión 152. Los 4 primeros son MONTOS y se
  // agregan sumando (o promediando) ejercicio por ejercicio; los 2 últimos son
  // RATIOS y NO se pueden promediar así — ver `ratiosDe()`.
  var INDICADORES = [
    { key:'revenue',  label:function(){ return t('cmp.m.revenue', 'Ingresos'); } },
    { key:'expenses', label:function(){ return t('cmp.m.expenses', 'Gastos'); },
      nota:function(){ return t('cmp.m.expenses.note', 'Incluye amortizaciones y depreciación, igual que el total de la tabla de Finanzas.'); } },
    { key:'pat',      label:function(){ return t('cmp.m.pat', 'Resultado del ejercicio'); }, signo:true },
    { key:'netDebt',  label:function(){ return t('cmp.m.netdebt', 'Deuda neta'); }, signo:true,
      nota:function(){ return t('cmp.m.netdebt.note', 'Deuda bruta menos caja. Negativa quiere decir más caja que deuda.'); } },
    { key:'wagesPct', label:function(){ return t('cmp.m.wages', 'Masa salarial / Ingresos'); }, ratio:'pct',
      nota:function(){ return t('cmp.m.wages.note', 'Cuánto de lo que entra se va en sueldos del plantel.'); } },
    { key:'perMember', label:function(){ return t('cmp.m.permember', 'Ingreso por socio'); }, ratio:'usd',
      nota:function(){ return t('cmp.m.permember.note', 'Solo para los clubes que publican su padrón de socios.'); } }
  ];
  // Los 4 que se agregan sumando. Los 2 ratios se calculan aparte, al final.
  var MONTOS = INDICADORES.filter(function(m){ return !m.ratio; });

  // Los pares (club, ejercicio) de UN bloque. Para una liga salen de la membresía
  // de esa temporada; para un puñado de clubes, de lo que se eligió club por club.
  function paresDeBloque(b){
    if(!b) return [];
    if(b.kind === 'liga'){
      var out = [];
      (b.years.length ? b.years : [ultimaTemporada(b.league)]).forEach(function(y){
        if(y == null) return;
        equiposDe(b.league, y).forEach(function(id){ out.push([id, y]); });
      });
      return out;
    }
    return b.pares.map(function(p){
      return [p[0], p[1] != null ? p[1] : (yearsOf(p[0])[0] || [])[0]];
    });
  }
  function paresDe(l){
    var out = [];
    ((l || {}).bloques || []).forEach(function(b){ out = out.concat(paresDeBloque(b)); });
    return out;
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
    // estructura de costos. Sin este test la columna diría "Gastos 0,0 M USD" y un
    // resultado igual a los ingresos, que no es un dato incompleto sino uno FALSO.
    // El resultado cae con los gastos: es el final de una cascada que arranca ahí.
    // (El mismo arreglo le falta a los KPIs de Finanzas: to-do 31.)
    var sinGastos = !(c.expenseLines || []).length
                 && c.meta.officialTotalExpenses == null
                 && !c.expenses && !c.nonCash;
    // Un club con masa salarial 0 no existe: si da 0 es que el documento no la
    // desglosa (pasa con River 2024, cuyos 8 rubros de gasto están todos en
    // `other_expenses`, etiquetados por sector).
    var sinSalarios = !c.wages;
    var socios = (typeof memberCountByClub !== 'undefined') ? memberCountByClub[id] : null;
    var revenueUsd = usd(c.revenue);
    return {
      revenue: revenueUsd,
      expenses: sinGastos ? null : Math.abs(usd(c.expenses + c.nonCash)),
      pat: sinGastos ? null : usd(c.pat),
      netDebt: sinDeuda ? null : usd(c.netDebt),
      // Los dos insumos de los ratios. Van como MONTOS para poder sumarlos, y el
      // ratio se arma recién con los totales del lado: promediar porcentajes de
      // clubes con tamaños distintos da un número que no describe a nadie.
      wages: sinSalarios ? null : Math.abs(usd(c.wages)),
      // `revenueConWages` y `revenueConSocios` son el MISMO ingreso, contado solo
      // cuando el otro término del ratio existe. Sin esto, un club que informa
      // ingresos pero no salarios infla el denominador y el ratio sale bajo.
      revenueConWages: sinSalarios ? null : revenueUsd,
      socios: socios || null,
      revenueConSocios: socios ? revenueUsd : null
    };
  }

  // La composición de ingresos de un club-ejercicio, en USD y en "Formato
  // simplificado", que es la única taxonomía comparable entre clubes de países
  // distintos.
  function mezclaDe(id, year){
    var rows = (window.simplifiedReportForClub(id, year) || {}).ingresos || [];
    var meta = window.yearMetaFor(id, year);
    return rows.map(function(r){
      return { label:r.label, value: window.toDisplayValue(r.value, meta, 'USD') };
    }).filter(function(r){ return r.value > 0; });
  }

  // UN BLOQUE: se suman sus ejercicios y, si el agregador es promedio, se divide por
  // los que informan ESE indicador (no por los ejercicios del bloque: un club que no
  // publica su deuda no puede bajar el promedio de deuda de los demás).
  // Las claves que se ACUMULAN: los 4 montos más los 4 insumos de los 2 ratios.
  var ACUMULADAS = ['revenue', 'expenses', 'pat', 'netDebt',
                    'wages', 'revenueConWages', 'socios', 'revenueConSocios'];

  function totalesDeBloque(b){
    var pares = paresDeBloque(b);
    var out = { nombre:nombreBloque(b), agg:b.agg, n:pares.length, conDato:0, sinEjercicio:[],
                anios:[], presupuestos:0, tot:{}, informan:{}, mezcla:{} };
    ACUMULADAS.forEach(function(k){ out.tot[k] = 0; out.informan[k] = 0; });
    pares.forEach(function(par){
      var id = par[0], y = par[1];
      var tieneEse = y && yearsOf(id).some(function(p){ return p[0] === y; });
      if(!tieneEse){ out.sinEjercicio.push(nameOf(id)); return; }
      var n = numerosDe(id, y);
      if(!n){ out.sinEjercicio.push(nameOf(id)); return; }
      out.conDato++;
      out.anios.push(y);
      var tipo = (yearsOf(id).filter(function(p){ return p[0] === y; })[0] || [])[1];
      if(tipo === 'official_budget') out.presupuestos++;
      ACUMULADAS.forEach(function(k){
        if(n[k] == null) return;
        out.tot[k] += n[k];
        out.informan[k]++;
      });
      // La composición de ingresos del bloque: los rubros simplificados de cada
      // ejercicio, SUMADOS en USD. Un conjunto sí tiene una mezcla propia (de dónde
      // sale la plata de estos clubes juntos); lo que no tiene sentido es promediar
      // los porcentajes de clubes con tamaños distintos.
      mezclaDe(id, y).forEach(function(r){ out.mezcla[r.label] = (out.mezcla[r.label] || 0) + r.value; });
    });
    if(b.agg === 'promedio'){
      ACUMULADAS.forEach(function(k){
        if(out.informan[k]) out.tot[k] = out.tot[k] / out.informan[k];
      });
      Object.keys(out.mezcla).forEach(function(lbl){
        if(out.conDato) out.mezcla[lbl] = out.mezcla[lbl] / out.conDato;
      });
    }
    return out;
  }

  // EL LADO: la suma de sus bloques, cada uno ya agregado a su manera. Acá es donde
  // un promedio y una sumatoria se suman entre sí — peras con manzanas, a pedido, y
  // con el aviso correspondiente abajo de la tabla.
  function totalesDe(l){
    var out = { nombre:l.nombre, n:0, conDato:0, sinEjercicio:[], anios:[], presupuestos:0,
                tot:{}, informan:{}, mezcla:{}, partes:[], mezclaAgg:false, formula:formulaDe(l) };
    ACUMULADAS.forEach(function(k){ out.tot[k] = 0; out.informan[k] = 0; });
    var aggs = {};
    (l.bloques || []).forEach(function(b){
      var tb = totalesDeBloque(b);
      out.partes.push(tb);
      out.n += tb.n;
      out.conDato += tb.conDato;
      out.anios = out.anios.concat(tb.anios);
      out.presupuestos += tb.presupuestos;
      out.sinEjercicio = out.sinEjercicio.concat(tb.sinEjercicio);
      if(tb.conDato) aggs[b.agg] = 1;
      ACUMULADAS.forEach(function(k){
        if(!tb.informan[k]) return;
        out.tot[k] += tb.tot[k];
        out.informan[k]++;
      });
      Object.keys(tb.mezcla).forEach(function(lbl){
        out.mezcla[lbl] = (out.mezcla[lbl] || 0) + tb.mezcla[lbl];
      });
    });
    out.mezclaAgg = Object.keys(aggs).length > 1;

    // LOS DOS RATIOS, recién acá. Se calculan sobre los TOTALES del lado y solo con
    // los ejercicios que informan los dos términos: promediar el porcentaje de un
    // club chico con el de uno grande da un número que no describe a ninguno de los
    // dos. `informan` para un ratio es el del insumo que puede faltar.
    out.tot.wagesPct = out.informan.wages && out.tot.revenueConWages
      ? (out.tot.wages / out.tot.revenueConWages) * 100 : null;
    out.informan.wagesPct = out.informan.wages;
    // Ingresos en USD son millones; el ingreso por socio va en USD enteros.
    out.tot.perMember = out.informan.socios && out.tot.socios
      ? (out.tot.revenueConSocios * 1e6) / out.tot.socios : null;
    out.informan.perMember = out.informan.socios;
    return out;
  }

  function fmtM(v, m){
    if(v == null) return t('cmp.nodata', 'sin dato');
    if(m && m.ratio === 'pct') return v.toFixed(0) + '%';
    if(m && m.ratio === 'usd') return Math.round(v).toLocaleString('es-AR') + ' USD';
    var abs = Math.abs(v);
    var txt = abs >= 1000 ? (abs / 1000).toFixed(2) + ' MM' : abs.toFixed(1) + ' M';
    return (v < 0 ? '-' : '') + txt + ' USD';
  }
  function rangoAnios(tt){
    if(!tt.anios.length) return '—';
    var min = Math.min.apply(null, tt.anios), max = Math.max.apply(null, tt.anios);
    return min === max ? String(min) : min + '-' + max;
  }

  // ---------------------------------------------------------------------------
  // LOS DOS CARDS DE LA PESTAÑA COMPARAR. Cada uno es un LADO, y se llena con el
  // mismo modal de pasos. Vacíos, la pantalla abre con una pregunta y no con un
  // árbol de cinco niveles por duplicado.
  // ---------------------------------------------------------------------------
  function render(){
    var wrap = $('cdWrap');
    if(!wrap) return;
    // Los dos cards se ARMAN primero y se cuelgan después. Agregarlos de a uno hacía
    // que un error dibujando el segundo dejara el primero colgado y el segundo no,
    // o sea media pantalla que parecía una decisión de diseño en vez de un bug.
    var cols;
    try {
      cols = [card(0), el('div', 'cd-vs', 'VS'), card(1)];
    } catch(err){
      console.error('[selector] no se pudieron dibujar los cards', err);
      return;
    }
    wrap.innerHTML = '';
    cols.forEach(function(c){ wrap.appendChild(c); });
    renderPie();
    renderResultado();
  }

  function card(i){
    var col = el('div', 'cd-col' + (lado[i] ? ' con' : ''));
    var head = el('div', 'cd-head');
    head.appendChild(el('span', 'cd-letra', LETRAS[i]));
    head.appendChild(el('span', 'cd-titulo', t('sel.modal.lado', 'Lado') + ' ' + LETRAS[i]));
    if(lado[i]){
      var x = el('button', 'cd-x', '×');
      x.type = 'button';
      x.title = t('sel.card.clear', 'Vaciar este card');
      x.addEventListener('click', function(){
        lado[i] = null; stGuardado[i] = null; mostrando = false; render();
      });
      head.appendChild(x);
    }
    col.appendChild(head);
    col.appendChild(lado[i] ? cuerpoLleno(i) : cuerpoVacio(i));
    return col;
  }

  function cuerpoVacio(i){
    var b = el('button', 'cd-vacio');
    b.type = 'button';
    b.appendChild(el('span', 'cd-vacio-mas', '+'));
    b.appendChild(el('span', 'cd-vacio-t', t('sel.card.pick', 'Elegí el lado') + ' ' + LETRAS[i]));
    b.appendChild(el('span', 'cd-vacio-s', t('sel.card.pick.s', 'Un club, una liga entera, un país. Te lo preguntamos de a un paso.')));
    b.addEventListener('click', function(){ abrirModal(i, 'vs'); });
    return b;
  }

  function cuerpoLleno(i){
    var l = lado[i];
    var caja = el('div', 'cd-elegido');
    var ids = clubesDe(l);
    // "ESTE LADO ES UN CLUB" SE DECIDE POR LO QUE ES EL BLOQUE, NO CONTANDO CLUBES.
    // Contando (ids.length === 1) parecía equivalente y no lo es: una temporada de
    // liga puede tener UN solo equipo con datos cargados — el Brasileirão Série A
    // 2025 tiene uno, Mirassol — y ahí el lado seguía siendo una liga, pero el card
    // lo trataba como un club y le pedía `bloques[0].pares`, que en un bloque de
    // liga no existe. TypeError, y como render() va agregando los tres hijos de a
    // uno, el card B desaparecía dejando A y el VS. Bug real, encontrado por Guido
    // comparando la liga argentina contra la brasilera.
    var soloClubes = l.bloques.length === 1 && l.bloques[0].kind === 'clubes';
    var unClub = (soloClubes && ids.length === 1 && paresDe(l).length === 1) ? ids[0] : null;

    var fila = el('div', 'cd-sujeto');
    // Un lado que NO es un club solo (una liga, un país, una mezcla) va con el 🧩 y sin color:
    // el color es del club, y un lado de varios no tiene uno.
    fila.appendChild(pintarCrest(el('span', 'cd-crest', unClub ? initials(nameOf(unClub)) : '🧩'), unClub));
    var txt = el('span', 'cd-op-txt');
    txt.appendChild(el('span', 'cd-sujeto-n', l.nombre));
    var co = unClub ? window.COUNTRIES[countryOf(unClub)] : null;
    txt.appendChild(el('span', 'cd-op-s', unClub
      ? (co ? t(co.key, co.name) : '')
      : nClubes(ids.length) + ' · ' + nEjercicios(paresDe(l).length)));
    fila.appendChild(txt);
    var otro = el('button', 'cd-otro', t('sel.card.other', 'Elegir otro'));
    otro.type = 'button';
    otro.title = t('sel.card.other.tip', 'Vuelve a los pasos con lo que elegiste, para cambiar lo que haga falta');
    otro.addEventListener('click', function(){ abrirModal(i, 'vs'); });
    fila.appendChild(otro);
    caja.appendChild(fila);

    // LA FÓRMULA, en lugar de un toggle Promedio / Sumatoria: con un agregador por
    // bloque, un botón único ya no puede decir cómo se mide este lado.
    if(l.bloques.length > 1 || (l.bloques[0] && paresDeBloque(l.bloques[0]).length > 1)){
      caja.appendChild(el('p', 'cd-formula', formulaDe(l)));
    }
    if(unClub) caja.appendChild(selectorDeAnio(i));
    else caja.appendChild(el('p', 'cd-anios', t('sel.card.years', 'Ejercicios') + ': ' + textoAnios(l)));
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

  // El desplegable de ejercicio del card: SOLO cuando el lado es un club en un
  // ejercicio. Para cualquier otra cosa, cambiar de año es volver al paso donde esa
  // pregunta ya está contestada; tenerla en dos lugares es tener dos verdades.
  function selectorDeAnio(i){
    var l = lado[i];
    var b = l.bloques[0];
    // La invariante que lo hace posible, escrita: un solo bloque, de clubes, con un
    // solo par. Si alguna vez deja de cumplirse, esto devuelve el texto de siempre
    // en vez de tirar y llevarse el card puesto.
    if(!b || b.kind !== 'clubes' || !b.pares || !b.pares.length){
      return el('p', 'cd-anios', t('sel.card.years', 'Ejercicios') + ': ' + textoAnios(l));
    }
    var id = b.pares[0][0];
    var fila = el('label', 'cd-anio');
    fila.appendChild(el('span', null, t('fuentes.ejercicio', 'Ejercicio')));
    var sel = document.createElement('select');
    var actual = paresDe(l)[0][1];
    yearsOf(id).forEach(function(par){
      var o = document.createElement('option');
      o.value = par[0];
      o.textContent = labelAnio(par[0], [id]);
      if(par[0] === actual) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function(){
      b.pares = [[id, Number(this.value)]];
      render();
    });
    fila.appendChild(sel);
    return fila;
  }

  function renderPie(){
    var pie = $('cdPie');
    if(!pie) return;
    pie.innerHTML = '';
    var listo = !!lado[0] && !!lado[1];
    var b = el('button', 'cd-go' + (listo ? '' : ' off'), listo
      ? t('sel.go', 'Comparar') + ' ' + lado[0].nombre + ' ' + t('sel.vs', 'contra') + ' ' + lado[1].nombre
      : t('sel.go.off', 'Llená los dos cards para comparar'));
    b.type = 'button';
    b.disabled = !listo;
    b.addEventListener('click', aplicar);
    pie.appendChild(b);
  }

  // ---------------------------------------------------------------------------
  // EL RESULTADO. Una sola vista para los tres casos (un club, un conjunto
  // promediado, un conjunto sumado): eso es lo que compra el modelo de dos cards.
  // ---------------------------------------------------------------------------
  function aplicar(){
    var activos = [lado[0], lado[1]].filter(Boolean);
    if(activos.length < 2) return;

    // Un club activo hace falta igual: Finanzas y el resto del sitio se paran sobre
    // el club activo, y sin uno el nav se recorta.
    var primerClub = clubesDe(activos[0])[0];
    var caja = $('cdResultado');
    caja.hidden = false;
    caja.innerHTML = '';
    caja.appendChild(el('p', 'cd-cargando', t('sel.calc', 'Calculando…')));
    mostrando = true;

    Promise.resolve(api.pickClub(primerClub)).then(function(){
      try { localStorage.setItem(LS_CLUB, primerClub); } catch(e){}
      renderButton();
      // Los data files de todos los clubes involucrados: sin ellos no hay qué sumar.
      // Es el único momento en que el selector baja archivos de club, y es a pedido
      // explícito ("Comparar"), no mientras elegís.
      var ids = [];
      activos.forEach(function(l){ clubesDe(l).forEach(function(id){ if(ids.indexOf(id) < 0) ids.push(id); }); });
      return Promise.all(ids.map(function(id){
        return window.loadClubData ? window.loadClubData(id).catch(function(){ return null; }) : null;
      }));
    }).then(function(){
      renderResultado();
      // La página no se mueve sola: el resultado aparece abajo y el visitante decide
      // si baja. (El scroll automático fue una queja de Guido en el prototipo 2.)
    });
  }

  function renderResultado(){
    var caja = $('cdResultado');
    if(!caja) return;
    if(!mostrando){ caja.hidden = true; caja.innerHTML = ''; return; }
    var activos = [lado[0], lado[1]].filter(Boolean);
    if(activos.length < 2){ caja.hidden = true; return; }

    caja.hidden = false;
    caja.innerHTML = '';
    var tots = activos.map(totalesDe);

    var head = el('div', 'cd-res-head');
    head.appendChild(el('h2', null, 'A ' + t('sel.vs', 'contra') + ' B'));
    head.appendChild(el('p', 'cd-res-sub', t('sel.res.sub',
      'En USD. Cada lado se calcula ejercicio por ejercicio con el mismo motor que usa el resto del sitio.')));
    caja.appendChild(head);

    // LAS 3 REGLAS DE COMPARABILIDAD SE DICEN, no solo se aplican. Vienen tal cual de
    // la vista que esto reemplaza (js/comparar-clubes.js, Versión 137).
    var reglas = el('p', 'cd-reglas');
    reglas.innerHTML = t('cmp.rules',
      'Todo en <b>USD</b> (la comparación ignora el toggle de moneda a propósito) y en <b>Formato simplificado</b>, '
      + 'la única taxonomía comparable entre clubes de países distintos. Cada lado muestra <b>su propio ejercicio</b>: '
      + 'los clubes no cierran el mismo día ni tienen los mismos años cargados.');
    caja.appendChild(reglas);

    var tabla = el('table', 'cd-tabla');
    var trh = el('tr');
    trh.appendChild(el('th', null, ''));
    tots.forEach(function(tt, i){
      var th = el('th');
      th.appendChild(el('span', 'cd-letra chica', LETRAS[i]));
      th.appendChild(el('span', 'cd-res-n', tt.nombre));
      // La fórmula abajo del nombre: con un agregador por bloque, el encabezado solo
      // no alcanza para saber qué se está mirando. Va SIEMPRE que haya una liga de
      // por medio, aunque sea de un solo ejercicio: hoy el Brasileirão Série A 2025
      // tiene un único club con balance cargado (Mirassol), y "Brasileirão Série A
      // 2025: 114,1 M USD" a secas se lee como lo que factura la liga entera. Con
      // `promedio(Brasileirão Série A 2025)` y "1 de 1 ejercicio" al lado, se lee lo
      // que es. Los otros lados solo la muestran cuando suman más de una cosa,
      // porque `suma(Real Madrid)` es ruido.
      var hayLiga = (activos[i].bloques || []).some(function(b){ return b.kind === 'liga'; });
      if(hayLiga || tt.partes.length > 1 || tt.n > 1) th.appendChild(el('span', 'cd-res-m', tt.formula));
      th.appendChild(el('span', 'cd-res-m', tt.conDato + ' ' + t('sel.of', 'de') + ' '
        + nEjercicios(tt.n) + ' · ' + rangoAnios(tt)));
      trh.appendChild(th);
    });
    var thead = el('thead'); thead.appendChild(trh); tabla.appendChild(thead);

    var tbody = el('tbody');
    INDICADORES.forEach(function(m){
      var tr = el('tr');
      var th = el('th', 'cd-ind');
      th.appendChild(el('span', null, m.label()));
      // La nota de cada indicador, la misma que escribía la vista vieja: sin ella
      // "Gastos" no dice que incluye amortizaciones, y "Deuda neta" negativa se lee
      // como un error en vez de como "más caja que deuda".
      if(m.nota) th.appendChild(el('span', 'cd-ind-nota', m.nota()));
      tr.appendChild(th);
      // Cada barra está a escala DENTRO de su indicador, no entre indicadores: es la
      // misma regla que ya usa la comparación de barras del sitio.
      var maxAbs = Math.max.apply(null, tots.map(function(tt){
        return tt.informan[m.key] ? Math.abs(tt.tot[m.key]) : 0;
      })) || 1;
      tots.forEach(function(tt){
        var td = el('td');
        if(!tt.informan[m.key]){
          td.appendChild(el('span', 'cd-nodato', t('cmp.nodata', 'sin dato')));
        } else {
          var v = tt.tot[m.key];
          td.appendChild(el('span', 'cd-num' + (m.signo && v < 0 ? ' neg' : ''), fmtM(v, m)));
          var barra = el('span', 'cd-bar');
          var relleno = el('span', 'cd-bar-in' + (m.signo && v < 0 ? ' neg' : ''));
          relleno.style.width = Math.round((Math.abs(v) / maxAbs) * 100) + '%';
          barra.appendChild(relleno);
          td.appendChild(barra);
          // "X de Y lo informan" cuenta PARTES del lado, no ejercicios: con un
          // agregador por bloque, el lado suma bloques, y decir "2 de 8" mezclaría
          // dos unidades distintas en la misma frase.
          if(tt.informan[m.key] < tt.partes.length){
            td.appendChild(el('span', 'cd-res-m', tt.informan[m.key] + ' ' + t('sel.of', 'de')
              + ' ' + tt.partes.length + ' ' + t('sel.res.partes', 'partes lo informan')));
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
    tots.forEach(function(tt, i){
      var letra = LETRAS[i] + ': ';
      if(tt.sinEjercicio.length){
        avisos.push(letra + tt.sinEjercicio.length + ' ' + t('sel.res.falta',
          'club(es) sin ese ejercicio, afuera de la cuenta') + ' (' + tt.sinEjercicio.slice(0, 4).join(', ')
          + (tt.sinEjercicio.length > 4 ? ', +' + (tt.sinEjercicio.length - 4) : '') + ').');
      }
      if(tt.anios.length > 1){
        var min = Math.min.apply(null, tt.anios), max = Math.max.apply(null, tt.anios);
        if(max - min >= 2) avisos.push(letra + t('sel.res.anios', 'los ejercicios van de') + ' ' + min
          + ' ' + t('sel.res.anios2', 'a') + ' ' + max + ', ' + t('sel.res.anios3', 'no son todos del mismo año.'));
      }
      if(tt.presupuestos) avisos.push(letra + tt.presupuestos + ' ' + t('sel.res.presu',
        'de los ejercicios son PRESUPUESTOS, o sea proyecciones del club, no cierres.'));
      if(tt.mezclaAgg) avisos.push(letra + t('sel.res.mezcla',
        'este lado mezcla un promedio con una sumatoria') + ' (' + tt.formula + ').');
    });
    if(tots[0].n !== tots[1].n){
      avisos.push(t('sel.res.desparejo',
        'Los dos lados no tienen la misma cantidad de ejercicios: mirá la fórmula de cada uno antes de leer el total como "quién es más grande".'));
    }
    avisos.push(t('sel.res.cero', 'Un club sin el dato no suma cero: queda afuera y se cuenta aparte.'));
    var pie = el('div', 'cd-avisos');
    avisos.forEach(function(a){ pie.appendChild(el('p', null, a)); });
    caja.appendChild(pie);

    caja.appendChild(cardMezcla(tots));
  }

  // ---------------------------------------------------------------------------
  // DE DÓNDE SALE LA PLATA DE CADA LADO. Barras al 100%, para comparar la MEZCLA y
  // no el tamaño; el total va al costado. Viene de la vista vieja, con una
  // diferencia: allá un benchmark de liga no tenía composición propia, porque el
  // promedio era de porcentajes. Acá los rubros se suman en USD antes de sacar el
  // porcentaje, así que un conjunto sí describe algo — de dónde sale la plata de
  // esos clubes juntos.
  // ---------------------------------------------------------------------------
  function cardMezcla(tots){
    var caja = el('div', 'cd-mix');
    caja.appendChild(el('h3', null, t('cmp.mix.title', 'Composición de ingresos')));
    caja.appendChild(el('p', 'cd-res-sub', t('cmp.mix.sub',
      'De dónde sale la plata de cada uno. Barras al 100%, para comparar la mezcla y no el tamaño; el total va al costado.')));

    var usados = {};
    tots.forEach(function(tt, i){
      var labels = Object.keys(tt.mezcla).filter(function(l){ return tt.mezcla[l] > 0; });
      var total = labels.reduce(function(acc, l){ return acc + tt.mezcla[l]; }, 0);
      var fila = el('div', 'mix-row');

      var nombre = el('div', 'mix-name');
      nombre.appendChild(el('span', 'cd-letra chica', LETRAS[i]));
      var txt = el('span', 'mbar-txt');
      txt.appendChild(el('span', 'mbar-nm', tt.nombre));
      txt.appendChild(el('span', 'mbar-yr', rangoAnios(tt)));
      nombre.appendChild(txt);
      fila.appendChild(nombre);

      var barra = el('div', 'mix-bar');
      labels.sort(function(a, b){ return tt.mezcla[b] - tt.mezcla[a]; }).forEach(function(lbl){
        usados[lbl] = true;
        var seg = el('div', 'mix-seg');
        seg.style.width = (tt.mezcla[lbl] / total * 100) + '%';
        seg.style.background = colorDeRubro(lbl);
        seg.title = lbl + ': ' + Math.round(tt.mezcla[lbl] / total * 100) + '%';
        barra.appendChild(seg);
      });
      fila.appendChild(barra);
      fila.appendChild(el('div', 'mix-val', total ? total.toFixed(1) + ' M USD' : '—'));
      caja.appendChild(fila);
    });

    // La leyenda lista solo las categorías que efectivamente aparecen.
    var leyenda = el('div', 'mix-legend');
    Object.keys(usados).forEach(function(lbl){
      var sp = el('span');
      var i = el('i');
      i.style.background = colorDeRubro(lbl);
      sp.appendChild(i);
      sp.appendChild(document.createTextNode(lbl));
      leyenda.appendChild(sp);
    });
    caja.appendChild(leyenda);
    return caja;
  }

  function colorDeRubro(label){
    var b = (typeof INICIO_INGRESOS_BUCKETS !== 'undefined' ? INICIO_INGRESOS_BUCKETS : [])
      .filter(function(x){ return x.label === label; })[0];
    return b ? b.color : '#b8b8b3';
  }

  // ---------------------------------------------------------------------------
  // EL BUSCADOR. El atajo de un paso para el que ya sabe qué club quiere:
  // escribir "boca" y tocarlo, sin recorrer los cinco pasos.
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // EL BUSCADOR A ESCALA (Versión 165). Tres cosas, y ninguna cambia qué encuentra:
  //
  // 1. TOPE DE RESULTADOS. La grilla pintaba un botón por cada club que matcheara,
  //    con su propio listener. Con 41 es invisible; con 1000-3000, escribir una
  //    letra reconstruye cientos de nodos. Se muestran TOPE_RESULTADOS y el resto
  //    queda detrás de "Mostrar más", con el conteo real al lado para que el
  //    visitante sepa que hay más y cuántos (esconder sin decirlo se lee como "no
  //    está").
  // 2. CACHÉ DEL TEXTO BUSCABLE. El filtro llamaba a `ligasDe(id)` para CADA club
  //    en CADA tecla, y esa función ordena las ligas del club cada vez. A 3000
  //    clubes eso pesa más que el DOM. Ahora el texto de cada club (nombre + país +
  //    ligas, ya normalizado) se arma una vez y se guarda.
  // 3. DEBOUNCE, que NO está acá sino en el listener (ver `init()`). Es a propósito:
  //    esta función también se llama desde adentro de sí misma al elegir un club o
  //    una liga, justo después de vaciar el input, y esas llamadas tienen que correr
  //    YA. Debouncear la función en vez del evento dejaría los resultados viejos en
  //    pantalla mientras `confirmar()` cambia de club.
  // ---------------------------------------------------------------------------
  var TOPE_RESULTADOS = 30;
  var mostrarTodos = false;      // lo prende "Mostrar más", se apaga en cada búsqueda nueva
  function verTodosResultados(v){ mostrarTodos = !!v; }
  var textoBuscable = null;      // { clubId: 'nombre pais ligas' }, normalizado

  // Se arma una vez por sesión de modal. Se invalida al cargar la tabla de ligas
  // (Versión 164, `loadClubLeagues()`), porque hasta entonces `ligasDe()` devuelve
  // vacío y el texto quedaría sin las ligas adentro.
  function indiceBusqueda(){
    if(textoBuscable) return textoBuscable;
    textoBuscable = {};
    Object.keys(window.CLUB_INDEX || {}).forEach(function(id){
      if(!clubs[id]) return;
      var co = window.COUNTRIES[countryOf(id)];
      var ligasTxt = ligasDe(id).map(function(l){ return (window.LEAGUES[l] || {}).name || ''; }).join(' ');
      textoBuscable[id] = norm(nameOf(id)) + ' ' + norm(co ? t(co.key, co.name) : '') + ' ' + norm(ligasTxt);
    });
    return textoBuscable;
  }

  // EL OTRO ÍNDICE: NOMBRE + PAÍS, SIN LIGAS (Versión 174). Es el que filtra la grilla
  // de "elegir clubes" del constructor de mezcla. No puede reusar `textoBuscable`
  // porque ese incluye los nombres de las ligas de cada club, y en esa grilla cada
  // botón imprime nombre + país nada más: filtrar por un texto que no está escrito en
  // ninguna parte del botón devuelve clubes que parecen no tener nada que ver.
  // Cacheado por el mismo motivo que el otro (a 3000 clubes, normalizar en cada tecla
  // pesa más que el DOM), y se invalida junto con él porque el país va traducido.
  var textoClubPais = null;   // { clubId: 'nombre pais' }, normalizado
  function indiceClubPais(){
    if(textoClubPais) return textoClubPais;
    textoClubPais = {};
    Object.keys(window.CLUB_INDEX || {}).forEach(function(id){
      if(!clubs[id]) return;
      var co = window.COUNTRIES[countryOf(id)];
      textoClubPais[id] = norm(nameOf(id)) + ' ' + norm(co ? t(co.key, co.name) : '');
    });
    return textoClubPais;
  }
  function invalidarIndiceBusqueda(){ textoBuscable = null; textoClubPais = null; }

  // La grilla de clubes con tope: devuelve el <div> y, si sobran, el botón.
  // `estado` (Versión 174) es opcional y sirve para que una grilla traiga su PROPIO
  // "mostrar todos" — `{ ver:bool, expandir:fn }` — en vez del `mostrarTodos` de
  // módulo, que es de acá y lo comparten todas las grillas que no pasen nada.
  function grillaConTope(ids, caja, hazBoton, repintar, estado){
    var todos = estado ? !!estado.ver : mostrarTodos;
    var visibles = todos ? ids : ids.slice(0, TOPE_RESULTADOS);
    var grid = el('div', 'op-grid clubes');
    visibles.forEach(function(id){ grid.appendChild(hazBoton(id)); });
    caja.appendChild(grid);
    if(ids.length > visibles.length){
      var b = el('button', 'sel-mas');
      b.type = 'button';
      b.textContent = t('sel.mostrarmas', 'Mostrar más') +
        ' (' + visibles.length + '/' + ids.length + ')';
      b.addEventListener('click', function(){
        if(estado) estado.expandir(); else mostrarTodos = true;
        (repintar || renderBusqueda)();
      });
      caja.appendChild(b);
    }
  }

  function renderBusqueda(){
    var q = norm($('modalQ').value.trim());
    var caja = $('modalResultados');
    caja.innerHTML = '';
    caja.hidden = !q;
    $('modalWrap').hidden = !!q;
    if(!q) return;

    // LAS LIGAS TAMBIÉN SE BUSCAN (Versión 152). El placeholder promete "un club,
    // una liga o un país" desde siempre, pero hasta acá escribir "primera div"
    // devolvía los 11 clubes argentinos y no la liga: el nombre de la liga entraba
    // en la búsqueda solo como un atributo de sus clubes. Lo levantó Guido probando
    // la etapa 4 ("puse 'primera div' y no me trajo Primera División, así que busqué
    // con el flow"). Una liga es un lado posible, así que tiene que poder elegirse
    // igual que un club.
    // Solo en el camino de Comparar: Finanzas muestra un club por vez.
    var hits = 0;
    if(origen === 'vs'){
      var ligas = ligasConClubes().filter(function(lid){
        var lg = window.LEAGUES[lid];
        var co = window.COUNTRIES[lg.country];
        // `full` además de `name`: la tabla guarda "Primera División" y "Primera
        // División de Argentina", y buscar por el nombre largo tiene que funcionar.
        return norm(lg.name).indexOf(q) >= 0
            || norm(lg.full || '').indexOf(q) >= 0
            || (co && norm(t(co.key, co.name)).indexOf(q) >= 0);
      });
      if(ligas.length){
        caja.appendChild(el('p', 'busca-grupo', t('sel.busca.ligas', 'Ligas')));
        var gl = el('div', 'op-grid clubes');
        ligas.forEach(function(lid){
          var lg = window.LEAGUES[lid], co = window.COUNTRIES[lg.country] || {};
          gl.appendChild(opcionBtn({
            id:lid, icon:co.flag || '🏆', label:lg.name,
            sub:window.tierLabel(lg.tier),
            meta:temporadasDe(lid).length + ' ' + t('sel.seasons', 'temporadas')
          }, false, function(id){
            // Una liga NO se confirma de una, a diferencia de un club: sin temporada
            // no es un sujeto (CONVENCIONES.md, "no existe ninguna arista club ->
            // liga sin año"). Se deja parado en el paso de la temporada, con la más
            // reciente ya marcada, para que se vea y se pueda cambiar.
            pararseEnLiga(id);
            $('modalQ').value = '';
            renderBusqueda();
            renderModal();
          }));
        });
        caja.appendChild(gl);
        hits += ligas.length;
      }
    }

    var txt = indiceBusqueda();
    var clubesHit = ordenados(Object.keys(txt).filter(function(id){
      return txt[id].indexOf(q) >= 0;
    }));
    if(clubesHit.length){
      if(origen === 'vs') caja.appendChild(el('p', 'busca-grupo', t('sel.busca.clubes', 'Clubes')));
      grillaConTope(clubesHit, caja, function(id){
        var co = window.COUNTRIES[countryOf(id)];
        return opcionBtn({
          id:id, crest:initials(nameOf(id)), label:nameOf(id),
          sub:co ? co.flag + ' ' + t(co.key, co.name) : '',
          meta:nEjercicios(yearsOf(id).length)
        }, false, function(cid){
          // Elegir un club deja los pasos coherentes con lo que ves: se marcan solos
          // con el camino de ese club, en vez de quedar vacíos.
          pararseEn(cid);
          $('modalQ').value = '';
          renderBusqueda();
          confirmar();   // sin destino: el que corresponda al origen
        });
      });
      hits += clubesHit.length;
    }

    if(!hits){
      caja.appendChild(el('p', 'paso-vacio',
        t('sel.nohits', 'Ningún club, liga ni país con ese nombre. Probá con menos letras.')));
    }
  }

  // Elegir una liga desde el buscador: los pasos quedan marcados con su camino y el
  // visitante aterriza en el paso de la temporada, que es la única pregunta que le
  // queda por contestar.
  function pararseEnLiga(lid){
    var lg = window.LEAGUES[lid] || {};
    reset();
    st.sport.sel   = [lg.sport || 'futbol'];
    st.region.sel  = [window.regionOfCountry(lg.country)].filter(Boolean);
    st.country.sel = [lg.country].filter(Boolean);
    st.tipo.sel    = ['liga'];
    st.league.sel  = [lid];
    ['sport', 'region', 'country', 'tipo', 'league'].forEach(function(k){ st[k].resuelto = true; });
    bloques = [{ kind:'liga', league:lid,
                 years:[ultimaTemporada(lid)].filter(function(y){ return y != null; }), agg:'promedio' }];
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
    st.tipo.sel = ['club'];
    st.club.sel = [clubId];
    CLAVES.forEach(function(k){ st[k].resuelto = true; });
    st.armado.saltado = true;
    bloques = [{ kind:'clubes', pares:[[clubId, null]], agg:'suma' }];
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
      pintarCrest(crest, null);   // soltar el club también le saca su color al botón
      name.textContent = t('header.club.none', 'Elegí tu club');
      eyebrow.textContent = t('header.club.eyebrow.none', 'Todavía sin elegir');
      $('clubBtn').title = t('header.club.btn.none', 'Elegí un club para ver sus números (Ctrl+K)');
      return;
    }
    crest.textContent = initials(nameOf(id));
    pintarCrest(crest, id);
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
    lado = [null, null];
    stGuardado = [null, null];
    mostrando = false;
    reset();
    try { localStorage.removeItem(LS_CLUB); } catch(e){}
    Promise.resolve(api.pickClub(null)).then(function(){
      renderButton();
      render();
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
    // DEBOUNCE ACÁ Y NO ADENTRO DE renderBusqueda() (Versión 165): esa función
    // también se llama desde adentro de sí misma al elegir un club o una liga,
    // después de vaciar el input, y esas llamadas tienen que correr YA. Si se
    // debounceara la función, los resultados viejos quedarían en pantalla mientras
    // `confirmar()` cambia de club.
    // 160 ms: por debajo de eso no ahorra teclas reales, por arriba se empieza a
    // sentir el retraso al escribir.
    var debQ = null;
    $('modalQ').addEventListener('input', function(){
      clearTimeout(debQ);
      debQ = setTimeout(function(){
        // Una consulta nueva vuelve a mostrar el tope: si alguien apretó "Mostrar
        // más" buscando "bo", no tiene por qué arrastrar eso a la búsqueda siguiente.
        verTodosResultados(false);
        renderBusqueda();
      }, 160);
    });
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
    render();
  }

  return {
    init: init,
    open: open,
    close: close,
    // `refresh` la llama index.html para repintar después de un cambio de idioma.
    refresh: function(){ renderButton(); render(); if(isOpen()) renderModal(); },
    renderButton: renderButton,
    goHome: goHome,
    savedClub: savedClub
  };
})();

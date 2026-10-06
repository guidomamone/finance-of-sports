// ============================================================================
// js/selector.js — EL SELECTOR DE CLUB, PASO A PASO (Versión 146).
//
// QUÉ REEMPLAZA. Hasta la Versión 145 esto era un panel de Miller columns
// (Deporte › Región › País › Liga › Equipo) con un buscador arriba: cinco
// columnas a la vez, ~67 opciones en pantalla, y cinco decisiones simultáneas.
// Era el prototipo 1 de los cuatro que se probaron; ganó el 4 y esto es su
// etapa 3. El handoff completo — el modelo, qué cambia archivo por archivo, los
// gotchas — está en `Admin/Archive/selector-merge-a-produccion.md`.
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

  // LOGGING DE BÚSQUEDAS Y COMPARACIONES (Versión 216). Worker + KV propios
  // (`Admin/CHANGELOG.md`), NO Cloudflare Web Analytics: ese solo mide
  // pageviews/referrers, no puede loggear texto libre tipeado en el buscador.
  // Gateado por hostname A PROPÓSITO: cualquier sesión de trabajo (preview
  // local, `financeofsports.com` visitado a mano para debug) NO es un
  // visitante real, y sin este freno esas pruebas ensucian las cuentas.
  var LOG_ENDPOINT = 'https://square-sky-ca25.guidomamone91.workers.dev';
  function logEvent(payload){
    if(location.hostname !== 'financeofsports.com') return;
    try{
      var data = JSON.stringify(payload);
      if(navigator.sendBeacon) navigator.sendBeacon(LOG_ENDPOINT, data);
      else fetch(LOG_ENDPOINT, { method:'POST', body:data, keepalive:true });
    }catch(e){}
  }
  var logBusquedaTimer = null;

  // FUNNEL DEL SELECTOR EN MIXPANEL (to-do 67, pedido de Guido 2026-09-28: "me gustaría ver
  // cómo interactúa la gente con el selector"). Instrumentado A MANO, nunca con el Autocapture
  // de Mixpanel (loguea cada click/scroll de la página entera y puede inflar el conteo de
  // eventos sin necesidad) — a este volumen de tráfico, los eventos puntuales de acá ni se
  // acercan al free tier de 1M eventos/mes. `track_pageview:false` a propósito: los
  // pageviews/referrers ya los da Cloudflare Web Analytics gratis y sin tope (Versión 166), no
  // hace falta duplicarlos acá. Mismo gateo por hostname que logEvent(), mismo motivo: una
  // sesión de trabajo (preview local, financeofsports.com visitado a mano para debug) no es un
  // visitante real. El token NO es secreto (a diferencia de un API Secret): es el mismo tipo de
  // credencial pública que ya explica el comentario de supabase.js en index.html.
  var MIXPANEL_TOKEN = '76f860e7f23b4bbd0d19cd4b2a2cb922';
  var mixpanelReady = false;
  function mpInit(){
    if(mixpanelReady) return;
    if(location.hostname !== 'financeofsports.com') return;
    if(!window.mixpanel || !window.mixpanel.init) return;
    window.mixpanel.init(MIXPANEL_TOKEN, { track_pageview:false, persistence:'localStorage' });
    mixpanelReady = true;
  }
  function mpTrack(event, props){
    if(location.hostname !== 'financeofsports.com') return;
    mpInit();
    if(!mixpanelReady) return;
    try{ window.mixpanel.track(event, props); }catch(e){}
  }
  // Centraliza las 5 asignaciones de `resuelto` que había sueltas por el archivo (paso único,
  // paso con cuerpo propio x2, paso de grilla x2) para no repetir el hook de tracking en cada
  // una. `saltado` ya existía como concepto (ver comentario de `pieDelPaso`); acá se manda
  // también a Mixpanel para poder ver drop-off real vs. "elegir más tarde" en el funnel.
  function marcarResuelto(clave, saltado){
    st[clave].resuelto = true;
    st[clave].saltado = !!saltado;
    mpTrack('selector_step_completed', { step:clave, origen:origen, saltado:!!saltado });
  }

  var api = {
    getClub: function(){ return null; },
    pickClub: function(){ return Promise.resolve(); },
    // Versión 183: qué hacer cuando lo elegido es una LIGA y no un club. El
    // default no hace nada a propósito — si index.html no lo cablea, elegir una
    // liga no rompe, simplemente no navega.
    pickLeague: function(){}
  };

  var inited = false;
  var LETRAS = ['A', 'B'];

  // LOS DOS LADOS de la pestaña Comparar. `null` = card vacío.
  var lado = [null, null];
  var mostrando = false;          // ¿ya se apretó "Comparar"?
  // "Valores ajustados por inflación" de Comparar (to-do 23). Es un estado APARTE del de Finanzas
  // (FIN_REAL, js/finanzas-multi.js): Comparar siempre muestra USD, sin importar la moneda elegida.
  var cmpReal = false;

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
  // ¿EL VISITANTE TOCÓ LOS CHIPS DE TEMPORADA, o está mirando el prellenado?
  // (Versión 183.) `pararseEnLiga()` preselecciona la temporada MÁS RECIENTE, que
  // casi siempre es la que MENOS clubes tiene: la Primera argentina tiene 5 en
  // 2025 y 8 en 2024, porque los balances tardan en publicarse. La pestaña Ligas
  // elige sola la de más clubes, así que sin esta distinción la misma página abría
  // en 2024 llegando por el nav y en 2025 llegando por el selector. Con el flag,
  // un prellenado que nadie tocó deja decidir a la vista, y una temporada elegida
  // a mano se respeta. NO se cambió el prellenado en sí: Comparar sigue igual.
  var ligaAnioTocado = false;

  function reset(){
    ligaAnioTocado = false;
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
  // Etiqueta de una fila de Formato simplificado, traducida (mismo helper que js/liga.js; Versión 510, para el aviso de "incluido en").
  function tLabel(label){ var key = (window.SITE_LABEL_KEYS || {})[label]; return key ? t(key, label) : label; }
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
  // comparar dos cosas distintas. Ver Admin/CONVENCIONES.md, "no existe ninguna arista
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
                   label:t(window.COUNTRIES[cid].key, window.COUNTRIES[cid].name), meta:nClubes(cuenta[cid]),
                   // to-do 47: México aparece con muy pocos clubes (hoy 1, América) y no es un hueco
                   // de sourcing sin resolver: la Liga MX exige balances auditados Y los declara
                   // confidenciales en el mismo reglamento. El tooltip explica la ausencia, no la tapa.
                   info: cid === 'MX' ? t('sel.country.mx.info', 'Los balances de los clubes de Liga MX existen: el reglamento de la liga exige presentarlos auditados (art. 26), pero el mismo reglamento los declara confidenciales (art. 12). Por eso el sitio no puede mostrarlos. Excepción parcial: Club América, que reporta resultados dentro del grupo que cotiza en bolsa.') : null };
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
    // camino es de clubes por definición, y preguntarlo sería un peaje. El paso
    // "¿Qué querés medir?" sigue sin aparecer acá, a propósito.
    if(origen === 'finanzas'){
      // VERSIÓN 183: salvo que el visitante YA haya elegido una liga desde el
      // buscador. Hasta acá eso era imposible —el buscador solo ofrecía ligas en
      // el camino de Comparar— porque no existía ninguna pantalla de liga; ahora
      // existe (la pestaña Ligas), así que el camino tiene que poder terminar
      // ahí. Sin esta rama, `pararseEnLiga()` dejaba el estado marcado con una
      // liga y los pasos mostrando clubes, que es un modal que se contradice.
      if(st.tipo.sel[0] === 'liga') return out.concat([PASO_LIGAS, PASO_LIGA_ANIO]);
      return out.concat([PASO_CLUBES, PASO_CLUB_ANIO]);
    }
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
    mpTrack('selector_opened', { origen:origen });

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
    cerrarInfosAbiertas();
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
    // `op.info` es el círculo "?" de explicación (to-do 47: por qué México casi no
    // tiene clubes). Va FUERA de `b`, nunca adentro: `b` ya es un <button>, y un
    // <button> no puede anidar otro. Envolver los dos en `.op-cell` es lo que le
    // permite a `.op-info` quedar clickeable por su cuenta sin también seleccionar
    // el país al tocarlo.
    if(op.info){
      var cell = el('div', 'op-cell');
      cell.appendChild(b);
      cell.appendChild(infoBtn(op.info));
      return cell;
    }
    return b;
  }

  // El botón "?" de info: hover en desktop, click/tap en mobile. El bocadillo vive en js/info-tip.js (Versión 515: compartido
  // con las celdas "Dentro de otro rubro" de Finanzas y Ligas); ahí está el porqué de que no sea descendiente del botón.
  // Llamado desde `renderModal()`: si el paso se repinta, el botón pineado ya no existe y el bocadillo se cierra con él.
  function cerrarInfosAbiertas(){ window.INFO_TIP.cerrar(); }

  function infoBtn(texto){
    var info = el('button', 'op-info', '?');
    info.type = 'button';
    info.setAttribute('aria-label', t('sel.info.aria', 'Por qué'));
    window.INFO_TIP.enganchar(info, texto);
    return info;
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
    cerrarInfosAbiertas(); // el paso se repinta: el botón "?" pineado, si había uno, ya no existe
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
                marcarResuelto(p.clave, false);
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
        marcarResuelto(p.clave, false);
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
          marcarResuelto(p.clave, true);
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
      marcarResuelto(p.clave, false);
      if(p.alResolver) p.alResolver();
      renderModal();
    });
    pie.appendChild(seguir);

    var luego = el('button', 'paso-skip', t('sel.later', 'Elegir más tarde'));
    luego.type = 'button';
    luego.title = t('sel.later.tip', 'Seguimos sin filtrar por esto. Podés volver cuando quieras.');
    luego.addEventListener('click', function(){
      st[p.clave].sel = [];
      marcarResuelto(p.clave, true);
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
          ligaAnioTocado = true;
          // EN EL CAMINO QUE TERMINA EN LA PESTAÑA LIGAS, UNA SOLA TEMPORADA
          // (Versión 183): un ranking es (liga, UN ejercicio), así que marcar dos
          // no significa nada y confirmar tomaría la primera, en silencio. En
          // Comparar sí son varias, porque ahí el bloque las SUMA (o promedia) y
          // el card lo dice con la fórmula.
          if(origen !== 'vs'){ b.years = [y]; renderModal(); return; }
          var i = b.years.indexOf(y);
          if(i >= 0) b.years.splice(i, 1); else b.years.push(y);
          renderModal();
        });
        chips.appendChild(c);
      });
      fila.appendChild(chips);
      // EL AGREGADOR (Promedio / Suma) ES UNA PREGUNTA DE COMPARAR, no del camino
      // que termina en la pestaña Ligas (Versión 183). Un ranking no promedia ni
      // suma la liga: la lista club por club. Mostrar el control ahí sería ofrecer
      // una decisión que no cambia nada de lo que el visitante va a ver.
      if(origen === 'vs'){
        var agg = selectorAgg(b);
        if(agg) fila.appendChild(agg);
      }
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

    // ELEGISTE UNA LIGA Y NO VENÍS DE COMPARAR (Versión 183): lo que querías ver es
    // la liga, no el primer club de la liga por orden alfabético. Este botón es el
    // to-do 23(c) entero, y sale ANTES de las dos líneas de abajo a propósito: esas
    // dicen "5 ejercicios de 5 clubes. promedio(Primera División 2025)", que es el
    // vocabulario de Comparar. Un ranking no promedia nada, así que acá esa frase
    // no describe lo que el visitante va a ver.
    // Solo con UN bloque de liga: una mezcla de bloques no es una liga.
    if(origen === 'finanzas' && bloques.length === 1 && bloques[0].kind === 'liga'){
      var lgId = bloques[0].league;
      var lgN = (window.LEAGUES[lgId] || {}).name || lgId;
      body.appendChild(el('p', 'res-msg', lgN));
      body.appendChild(el('p', 'res-sub', t('sel.liga.res',
        'Vas a ver el ranking de ingresos de sus clubes, en un ejercicio. Vas a poder cambiar el ejercicio ahí mismo.')));
      var aLiga = el('button', 'paso-ok', t('sel.toliga', 'Ver el ranking de ingresos de') + ' ' + lgN);
      aLiga.type = 'button';
      aLiga.addEventListener('click', function(){ confirmar('liga'); });
      body.appendChild(aLiga);
      // NO se ofrece además "ver los números de <primer club>": con una liga
      // elegida, el primer club por orden alfabético no es nadie en particular
      // (sería "Athletic Club" para LaLiga), y la propia pantalla de la liga lleva
      // a cualquiera de sus clubes con un click en su fila.
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

    // LA PESTAÑA LIGAS (Versión 183, to-do 23(c)). Hasta acá, elegir una liga y
    // confirmar terminaba en Finanzas DEL PRIMER CLUB de esa liga: la liga se
    // usaba como filtro para llegar a un club, y no había ninguna pantalla que
    // fuera sobre la liga. Ahora hay, y este es el único camino que lleva a ella
    // desde el selector.
    // El bloque tiene que ser UNO y de tipo liga: una mezcla de bloques no es una
    // liga, es un sujeto armado a mano, y eso ya tiene su pantalla (Comparar).
    if(destino === 'liga'){
      var b = bloques[0];
      if(!b || b.kind !== 'liga') return;
      // El AÑO que se manda es el primero elegido; si no se eligió ninguno, se
      // manda null y la vista elige el suyo (el ejercicio con más clubes, que casi
      // nunca es el más reciente). El selector de ejercicio vive en esa pantalla,
      // así que no hace falta resolverlo acá.
      var y = (ligaAnioTocado && b.years && b.years.length) ? b.years[0] : null;
      close();
      api.pickLeague(b.league, y);
      return;
    }

    if(destino === 'vs'){
      lado[modalLado] = ladoDesde(JSON.parse(JSON.stringify(bloques)));
      stGuardado[modalLado] = { st:JSON.parse(JSON.stringify(st)), bloques:JSON.parse(JSON.stringify(bloques)) };
      // Se loggea recién con LOS DOS lados puestos: un solo lado no es una
      // comparación todavía, es la mitad de una (Versión 216).
      if(lado[0] && lado[1]){
        logEvent({ type:'compare', a:lado[0].nombre, b:lado[1].nombre });
      }
      mostrando = false;
      close();
      render();
      irASeccion('vs');
      return;
    }

    pushRecent(ids[0]);
    try { localStorage.setItem(LS_CLUB, ids[0]); } catch(e){}
    mpTrack('selector_club_chosen', { clubId:ids[0], origen:origen });
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
  // LOS INDICADORES: 4 MONTOS (ingresos, gastos, resultado, deuda neta) que se agregan sumando
  // (o promediando) ejercicio por ejercicio, y 2 RATIOS (masa salarial / ingresos, ingreso por
  // socio) que NO se pueden promediar así: se arman al final con los totales del lado (totalesDe).

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

  // VALORES AJUSTADOS POR INFLACIÓN (to-do 23): el mismo criterio que FIN_REAL en Finanzas, con la serie
  // del dólar de data/deflactores.js. Cada ejercicio se ajusta por el año en que cierra (`year`, la misma
  // clave que usa el tipo de cambio) ANTES de sumarse o promediarse con los demás de su lado; año base =
  // el último de la serie; un ejercicio que cierra en el año base o después (un presupuesto futuro) no se
  // ajusta. Con el toggle apagado, 1.
  function serieUSD(){ return ((window.DEFLACTORES || {}).USD) || null; }
  function baseReal(){
    var s = serieUSD();
    return s ? Math.max.apply(null, Object.keys(s.valores).map(Number)) : null;
  }
  function facReal(year){
    var s = serieUSD();
    if(!cmpReal || !s) return 1;
    var b = baseReal();
    if(year >= b) return 1;
    var v = s.valores[year];
    return v ? s.valores[b] / v : 1;
  }

  function numerosDe(id, year){
    var c = window.computeYearGeneric(id, year);
    if(!c) return null;
    var meta = window.yearMetaFor(id, year);
    var f = facReal(year);
    var usd = function(v){ return window.toDisplayValue(v, meta, 'USD') * f; };
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
    var f = facReal(year);
    return rows.map(function(r){
      return { label:r.label, value: window.toDisplayValue(r.value, meta, 'USD') * f };
    // OJO: se descartan los CEROS exactos (una fila en 0 no dibuja nada), pero NO
    // los negativos. Botafogo 2024, Cruzeiro 2025 y Envigado 2025 reportan ingreso
    // BRUTO y una línea de deducciones que cae en el catch-all y queda negativa —
    // filtrar por `> 0` (to-do 41) tiraba ese rubro entero y el total de la mezcla
    // quedaba inflado ~5% en esos 3 clubes. Mismo criterio que ya usa
    // `tools/generate-rankings.js` para el mismo dato.
    }).filter(function(r){ return r.value !== 0; });
  }

  // Los gastos de un club-ejercicio por rubro del formato simplificado, en USD (to-do 23,
  // paso 5: la tabla de Comparar tiene las mismas filas que la de Finanzas). Vienen en
  // NEGATIVO, como en el reporte, y se muestran entre paréntesis.
  function gastosDe(id, year){
    var rows = (window.simplifiedReportForClub(id, year) || {}).gastos || [];
    var meta = window.yearMetaFor(id, year);
    var f = facReal(year);
    return rows.map(function(r){
      return { label:r.label, value: window.toDisplayValue(r.value, meta, 'USD') * f };
    }).filter(function(r){ return r.value !== 0; });
  }
  // El orden de los rubros: el del formato simplificado (el primero que aparece manda).
  function anotarOrden(lista, label){ if(lista.indexOf(label) < 0) lista.push(label); }

  // UN BLOQUE: se suman sus ejercicios y, si el agregador es promedio, se divide por
  // los que informan ESE indicador (no por los ejercicios del bloque: un club que no
  // publica su deuda no puede bajar el promedio de deuda de los demás).
  // Las claves que se ACUMULAN: los 4 montos más los 4 insumos de los 2 ratios.
  var ACUMULADAS = ['revenue', 'expenses', 'pat', 'netDebt',
                    'wages', 'revenueConWages', 'socios', 'revenueConSocios'];

  function totalesDeBloque(b){
    var pares = paresDeBloque(b);
    var out = { nombre:nombreBloque(b), agg:b.agg, n:pares.length, conDato:0, sinEjercicio:[],
                anios:[], presupuestos:0, tot:{}, informan:{}, mezcla:{}, incluidos:[],
                gastos:{}, conGastos:0, ordenIng:[], ordenGas:[], incl:{} };
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
      // El orden de las filas sale del reporte ENTERO, ceros incluidos: si saliera de los rubros
      // con plata, un rubro en cero en el primer club (Banfield 2020 no tiene premios) caería al final.
      var rep = window.simplifiedReportForClub(id, y) || {};
      (rep.ingresos || []).forEach(function(r){ anotarOrden(out.ordenIng, r.label); });
      (rep.gastos || []).forEach(function(r){ anotarOrden(out.ordenGas, r.label); });
      // "Dentro de otro rubro" (Versión 510): con UN ejercicio, la celda va en "—" con el
      // bocadillo, como en Finanzas. Con varios, va como aviso del lado (no hay una celda única).
      [['i', rep.ingresos], ['g', rep.gastos]].forEach(function(par){
        (par[1] || []).forEach(function(r){
          if(r.incluidoEn) out.incl[par[0] + '|' + r.label] = { en:r.incluidoEn, posible:!!r.incluidoPosible };
        });
      });
      mezclaDe(id, y).forEach(function(r){
        out.mezcla[r.label] = (out.mezcla[r.label] || 0) + r.value;
      });
      // Los gastos por rubro, solo de los ejercicios que informan gastos (los clubes japoneses
      // publican ingresos y no costos: no pueden bajar el promedio de gastos de los demás).
      if(n.expenses != null){
        out.conGastos++;
        gastosDe(id, y).forEach(function(r){
          out.gastos[r.label] = (out.gastos[r.label] || 0) + r.value;
        });
      }
      // Versión 510: las filas que el documento junta con otra (fiscalYearMeta.incluidoEn) van como aviso: en la mezcla suman donde están.
      var repI = window.simplifiedReportForClub(id, y) || {};
      (repI.ingresos || []).concat(repI.gastos || []).forEach(function(r){
        if(r.incluidoEn) out.incluidos.push(nameOf(id) + ' ' + y + ': ' + tLabel(r.label) + ' ' + (r.incluidoPosible ? t('sel.res.inclPosible', 'posiblemente está dentro de') : t('sel.res.incl', 'está dentro de')) + ' ' + tLabel(r.incluidoEn));
      });
    });
    if(b.agg === 'promedio'){
      ACUMULADAS.forEach(function(k){
        if(out.informan[k]) out.tot[k] = out.tot[k] / out.informan[k];
      });
      Object.keys(out.mezcla).forEach(function(lbl){
        if(out.conDato) out.mezcla[lbl] = out.mezcla[lbl] / out.conDato;
      });
      Object.keys(out.gastos).forEach(function(lbl){
        if(out.conGastos) out.gastos[lbl] = out.gastos[lbl] / out.conGastos;
      });
    }
    return out;
  }

  // EL LADO: la suma de sus bloques, cada uno ya agregado a su manera. Acá es donde
  // un promedio y una sumatoria se suman entre sí — peras con manzanas, a pedido, y
  // con el aviso correspondiente abajo de la tabla.
  function totalesDe(l){
    var out = { nombre:l.nombre, n:0, conDato:0, sinEjercicio:[], anios:[], presupuestos:0,
                tot:{}, informan:{}, mezcla:{}, partes:[], mezclaAgg:false, formula:formulaDe(l), incluidos:[],
                gastos:{}, ordenIng:[], ordenGas:[], nEj:{}, incl:{} };
    // `informan` cuenta PARTES (bloques) del lado; `nEj`, EJERCICIOS (para el "12 de 14" de la tabla).
    ACUMULADAS.forEach(function(k){ out.tot[k] = 0; out.informan[k] = 0; out.nEj[k] = 0; });
    var aggs = {};
    (l.bloques || []).forEach(function(b){
      var tb = totalesDeBloque(b);
      out.partes.push(tb);
      out.n += tb.n;
      out.conDato += tb.conDato;
      out.anios = out.anios.concat(tb.anios);
      out.presupuestos += tb.presupuestos;
      out.sinEjercicio = out.sinEjercicio.concat(tb.sinEjercicio);
      out.incluidos = out.incluidos.concat(tb.incluidos);
      if(tb.conDato) aggs[b.agg] = 1;
      ACUMULADAS.forEach(function(k){
        out.nEj[k] += tb.informan[k];
        if(!tb.informan[k]) return;
        out.tot[k] += tb.tot[k];
        out.informan[k]++;
      });
      Object.keys(tb.mezcla).forEach(function(lbl){
        out.mezcla[lbl] = (out.mezcla[lbl] || 0) + tb.mezcla[lbl];
      });
      Object.keys(tb.gastos).forEach(function(lbl){
        out.gastos[lbl] = (out.gastos[lbl] || 0) + tb.gastos[lbl];
      });
      Object.keys(tb.incl).forEach(function(k){ out.incl[k] = tb.incl[k]; });
      tb.ordenIng.forEach(function(lbl){ anotarOrden(out.ordenIng, lbl); });
      tb.ordenGas.forEach(function(lbl){ anotarOrden(out.ordenGas, lbl); });
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
      cols = [card(0), card(1)];
    } catch(err){
      console.error('[selector] no se pudieron dibujar los cards', err);
      return;
    }
    wrap.innerHTML = '';
    cols.forEach(function(c){ wrap.appendChild(c); });
    renderPie();
    renderControles();
    // SIN BOTÓN "COMPARAR" (to-do 23): con los dos lados llenos, el resultado se arma solo y se
    // rehace con cada cambio de un card, como Finanzas con sus cards de ejercicio.
    if(lado[0] && lado[1]) aplicar();
    else { mostrando = false; renderResultado(); }
  }

  function card(i){
    var col = el('div', 'cd-col' + (lado[i] ? ' con' : ''));
    var head = el('div', 'cd-head');
    head.appendChild(el('span', 'cd-letra' + (i ? ' b' : ''), LETRAS[i]));
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

  // LOS CHIPS DE EJERCICIO (to-do 23): el mismo componente que los cards de Finanzas
  // (js/finanzas-anios.js, clases .fin-year*), para que las dos pantallas se lean igual.
  // Dos formas de lado los tienen: UN club (un chip por ejercicio, varios a la vez) y UNA
  // liga (un chip por temporada). Cualquier otra forma (varios clubes, varias ligas, una
  // mezcla) sigue con la fórmula y "Ejercicios: …": cambiar eso es volver al modal.
  var BAL_TIPOS = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
  var cdExpandido = [false, false];   // "+N más" abierto, por card

  function tipoDe(id, y){
    var par = yearsOf(id).filter(function(p){ return p[0] === y; })[0];
    if(!par) return null;
    return par[1] === 'official_budget' ? 'P' : BAL_TIPOS[par[1]] ? 'B' : null;
  }
  function etiquetaEj(id, y){
    var cal = clubs[id] && clubs[id].fiscalYearStart === '01-01';
    return cal ? String(y) : String(y - 1).slice(2) + '/' + String(y).slice(2);
  }
  // Los ejercicios de un club, del primero al último cargado, con los años vacíos del medio
  // como "Sin publicar" (mismo criterio que FIN_ANIOS.ejercicios, pero desde CLUB_INDEX: el
  // card se dibuja antes de bajar el archivo del club).
  function ejerciciosClub(id){
    var ys = yearsOf(id).map(function(p){ return p[0]; }).filter(function(y){ return tipoDe(id, y); });
    if(!ys.length) return [];
    var out = [];
    for(var y = Math.min.apply(null, ys); y <= Math.max.apply(null, ys); y++){
      out.push({ y:y, tipo: ys.indexOf(y) >= 0 ? tipoDe(id, y) : 'X' });
    }
    return out;
  }
  function ultimoBalance(id){
    var b = ejerciciosClub(id).filter(function(e){ return e.tipo === 'B'; });
    return b.length ? b[b.length - 1].y : (yearsOf(id)[0] || [])[0];
  }

  // Una fila de chips. `lista` = [{y, label, sub, tipo}] de más viejo a más nuevo; `elegidos`
  // = años prendidos. Con más de 5, arranca corta (los últimos 5 y lo elegido) y "+N más" va
  // al principio, como en Finanzas. Nunca deja apagar el último: un lado vacío no compara nada.
  function filaChips(i, titulo, lista, elegidos, alCambiar){
    var caja = el('div', 'cd-chips');
    caja.appendChild(el('span', 'fin-years-lbl', titulo));
    var fila = el('div', 'fin-years-row');
    var ultimos = lista.filter(function(e){ return e.tipo !== 'X'; }).slice(-5).map(function(e){ return e.y; });
    // Se cuentan los publicados: si lo único que quedaría escondido son años "Sin publicar", no vale un "+N más".
    var muchos = lista.filter(function(e){ return e.tipo !== 'X'; }).length > 5;
    var visibles = (!muchos || cdExpandido[i]) ? lista : lista.filter(function(e){
      return ultimos.indexOf(e.y) >= 0 || elegidos.indexOf(e.y) >= 0;
    });
    if(muchos){
      var mas = el('button', 'fin-years-more', cdExpandido[i]
        ? t('finanzas.card.less', 'Ver menos')
        : '+' + (lista.length - visibles.length) + ' ' + t('finanzas.card.more', 'más'));
      mas.type = 'button';
      mas.addEventListener('click', function(){ cdExpandido[i] = !cdExpandido[i]; render(); });
      fila.appendChild(mas);
    }
    visibles.forEach(function(e){
      var on = elegidos.indexOf(e.y) >= 0;
      var b = el('button', 'fin-year' + (on ? ' on' : '') + (e.tipo === 'P' ? ' presu' : '') + (e.tipo === 'X' ? ' sinpub' : ''));
      b.type = 'button';
      b.appendChild(el('b', null, e.label));
      b.appendChild(el('span', null, e.sub));
      if(e.tipo === 'X'){
        b.disabled = true;
        b.title = t('finanzas.card.unpublishedTip', 'El club todavía no publicó este ejercicio, o no lo conseguimos');
      } else {
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.addEventListener('click', function(){
          var nuevos = on ? elegidos.filter(function(y){ return y !== e.y; }) : elegidos.concat(e.y);
          if(!nuevos.length) return;
          alCambiar(nuevos.sort(function(a, c){ return a - c; }));
          render();
        });
      }
      fila.appendChild(b);
    });
    caja.appendChild(fila);
    return caja;
  }

  function chipsClub(i, b, id){
    var lista = ejerciciosClub(id).map(function(e){
      return { y:e.y, tipo:e.tipo, label:etiquetaEj(id, e.y),
               sub: e.tipo === 'B' ? t('finanzas.card.balance', 'Balance')
                  : e.tipo === 'P' ? t('finanzas.card.budget', 'Presupuesto')
                  : t('finanzas.card.unpublished', 'Sin publicar') };
    });
    var elegidos = b.pares.map(function(p){ return p[1]; });
    return filaChips(i, t('sel.card.years', 'Ejercicios'), lista, elegidos, function(ys){
      b.pares = ys.map(function(y){ return [id, y]; });
    });
  }

  function chipsLiga(i, b){
    var lista = temporadasDe(b.league).slice().sort(function(a, c){ return a - c; }).map(function(y){
      return { y:y, tipo:'B', label:String(y), sub:nClubes(equiposDe(b.league, y).length) };
    });
    var elegidos = b.years.length ? b.years.slice() : [ultimaTemporada(b.league)];
    return filaChips(i, t('sel.card.seasons', 'Temporadas'), lista, elegidos, function(ys){
      b.years = ys;
      lado[i] = ladoDesde([b]);
    });
  }

  // "Cómo se junta": el agregador del bloque, a la vista. Solo con más de un ejercicio.
  function segAgregador(b){
    var caja = el('div', 'cd-agg');
    caja.appendChild(el('span', 'fin-years-lbl', t('sel.card.agg', 'Cómo se junta')));
    var seg = el('div', 'segmented');
    [['promedio', t('sel.agg.avg', 'Promedio')], ['suma', t('sel.agg.sum', 'Suma')]].forEach(function(o){
      var btn = el('button', b.agg === o[0] ? 'active' : null, o[1]);
      btn.type = 'button';
      btn.addEventListener('click', function(){ b.agg = o[0]; render(); });
      seg.appendChild(btn);
    });
    caja.appendChild(seg);
    return caja;
  }

  // La línea de abajo del nombre: cómo se arma el lado, en una frase. Es lo único que queda
  // de la vieja bajada "A contra B" (Guido: el título son los cards).
  function comoSeArma(l, unClub, unaLiga){
    var pares = paresDe(l);
    var partes = [];
    var pais = unClub ? countryOf(unClub) : unaLiga ? (window.LEAGUES[unaLiga.league] || {}).country : null;
    var co = pais ? window.COUNTRIES[pais] : null;
    if(co) partes.push(t(co.key, co.name));
    var presu = pares.filter(function(p){ return tipoDe(p[0], p[1]) === 'P'; }).length;
    if(pares.length === 1){
      partes.push((presu ? t('sel.card.budget1', 'presupuesto') : t('sel.card.balance1', 'balance')) + ' ' + etiquetaEj(pares[0][0], pares[0][1]));
      return { texto:partes.join(' · '), presu:0 };
    }
    var agg = (l.bloques.length === 1) ? l.bloques[0].agg : null;
    var n = nEjercicios(pares.length);
    var nc = clubesDe(l).length;
    partes.push((agg === 'promedio' ? t('sel.card.avgOf', 'promedio de') + ' '
               : agg === 'suma' ? t('sel.card.sumOf', 'suma de') + ' ' : '')
               + n + (nc > 1 ? ' ' + t('sel.card.of', 'de') + ' ' + nClubes(nc) : ''));
    return { texto:partes.join(' · '), presu:presu };
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
    // Desde el to-do 23 un club puede tener VARIOS ejercicios: sigue siendo "un club".
    var b0 = l.bloques[0];
    var soloClubes = l.bloques.length === 1 && b0.kind === 'clubes';
    var unClub = (soloClubes && ids.length === 1) ? ids[0] : null;
    var unaLiga = (l.bloques.length === 1 && b0.kind === 'liga') ? b0 : null;
    // Un club recién elegido llega con el año en null ("el más reciente"): el card lo fija
    // en el último BALANCE, como el default de Finanzas (un presupuesto futuro no es lo
    // primero que se quiere comparar).
    if(unClub && b0.pares.some(function(p){ return p[1] == null; })){
      var ult = ultimoBalance(unClub);
      b0.pares = [[unClub, ult]];
    }

    var fila = el('div', 'cd-sujeto');
    // Un lado que NO es un club solo (una liga, un país, una mezcla) va con el 🧩 y sin color:
    // el color es del club, y un lado de varios no tiene uno.
    fila.appendChild(pintarCrest(el('span', 'cd-crest', unClub ? initials(nameOf(unClub)) : '🧩'), unClub));
    var txt = el('span', 'cd-op-txt');
    txt.appendChild(el('span', 'cd-sujeto-n', unClub ? nameOf(unClub)
      : unaLiga ? ((window.LEAGUES[unaLiga.league] || {}).name || unaLiga.league) : l.nombre));
    var arma = comoSeArma(l, unClub, unaLiga);
    var sub = el('span', 'cd-op-s', arma.texto);
    if(arma.presu){
      sub.appendChild(document.createTextNode(' · '));
      sub.appendChild(el('span', 'cd-tag-presu', t('sel.card.inclPresu', 'incluye') + ' ' + arma.presu + ' '
        + (arma.presu === 1 ? t('sel.card.presu1', 'presupuesto') : t('sel.card.presuN', 'presupuestos'))));
    }
    txt.appendChild(sub);
    fila.appendChild(txt);
    var otro = el('button', 'cd-otro', t('sel.card.other', 'Elegir otro'));
    otro.type = 'button';
    otro.title = t('sel.card.other.tip', 'Vuelve a los pasos con lo que elegiste, para cambiar lo que haga falta');
    otro.addEventListener('click', function(){ abrirModal(i, 'vs'); });
    fila.appendChild(otro);
    caja.appendChild(fila);

    if(unClub) caja.appendChild(chipsClub(i, b0, unClub));
    else if(unaLiga) caja.appendChild(chipsLiga(i, unaLiga));
    else {
      // LA FÓRMULA, en lugar de un toggle Promedio / Sumatoria: con un agregador por
      // bloque, un botón único ya no puede decir cómo se mide este lado.
      if(l.bloques.length > 1 || (b0 && paresDeBloque(b0).length > 1)){
        caja.appendChild(el('p', 'cd-formula', formulaDe(l)));
      }
      caja.appendChild(el('p', 'cd-anios', t('sel.card.years', 'Ejercicios') + ': ' + textoAnios(l)));
    }
    if((unClub || unaLiga) && paresDe(l).length > 1) caja.appendChild(segAgregador(b0));
    // Los avisos de ESTE lado: los llena renderResultado(), que es el que tiene los números.
    caja.appendChild(el('div', 'cd-avisos-lado'));
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

  // LA BARRA (to-do 23, paso 3): formato fijo y "Valores: Nominales | Ajustados por
  // inflación", como en Finanzas. La franja verde explica el ajuste con el ejercicio más
  // viejo de la comparación y avisa si hay presupuestos posteriores al año base.
  function renderControles(){
    var barra = $('cdControles'), nota = $('cdRealNote');
    if(!barra || !nota) return;
    var listo = !!lado[0] && !!lado[1] && !!serieUSD();
    barra.hidden = !listo;
    barra.querySelectorAll('#cdRealToggle button').forEach(function(b){
      b.classList.toggle('active', (b.dataset.real === '1') === cmpReal);
      b.onclick = function(){ cmpReal = b.dataset.real === '1'; renderControles(); renderResultado(); };
    });
    if(!listo || !cmpReal){ nota.hidden = true; return; }
    var ys = paresDe(lado[0]).concat(paresDe(lado[1])).map(function(p){ return p[1]; }).filter(Boolean);
    var base = baseReal(), a = Math.min.apply(null, ys);
    var txt = t('sel.real.note', 'Todo en M USD de {b}, ajustado con el deflactor del PBI de EE.UU.: 100 M USD de un ejercicio que cerró en {a} equivalen a {x} M de {b}. Cada ejercicio se ajusta por el año en que cierra, antes de sumar o promediar su lado.')
      .split('{b}').join(base).replace('{a}', a).replace('{x}', Math.round(100 * facReal(a)));
    if(ys.some(function(y){ return y > base; })){
      txt += ' ' + t('sel.real.future', 'Los presupuestos que cierran después de {b} quedan como están: todavía no hay inflación para descontarles.').split('{b}').join(base);
    }
    nota.textContent = txt;
    nota.hidden = false;
  }

  // Sin botón "Comparar" (to-do 23): el pie solo avisa mientras falte un lado.
  function renderPie(){
    var pie = $('cdPie');
    if(!pie) return;
    pie.innerHTML = '';
    var listo = !!lado[0] && !!lado[1];
    pie.hidden = listo;
    if(!listo) pie.appendChild(el('p', 'cd-falta', t('sel.go.off', 'Llená los dos cards para comparar')));
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
    // Con un resultado ya a la vista (se cambió un chip), no se borra para mostrar
    // "Calculando…": parpadearía en cada toque.
    if(!mostrando){
      caja.innerHTML = '';
      caja.appendChild(el('p', 'cd-cargando', t('sel.calc', 'Calculando…')));
    }
    mostrando = true;

    // Pero SOLO si todavía no había uno (to-do 23): sin botón, la comparación se rehace con
    // cada chip, y pisar el club que el visitante estaba mirando en cada toque lo sacaba de
    // su club sin que lo pidiera.
    var hayClub = !!api.getClub();
    Promise.resolve(hayClub ? null : api.pickClub(primerClub)).then(function(){
      if(!hayClub){
        try { localStorage.setItem(LS_CLUB, primerClub); } catch(e){}
        renderButton();
      }
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
      // to-do 70, "Saved Searches": js/selector.js no sabe de Supabase ni de cuentas —
      // solo avisa que una comparación se confirmó, con los dos `lado` tal cual (ya son
      // JSON puro, ver ladoDesde()). Si no hay sesión, notifyStateChange no hace nada.
      if(window.CUENTA) window.CUENTA.notifyStateChange({ view:'vs', ladoA:lado[0], ladoB:lado[1] });
    });
  }

  // ---------------------------------------------------------------------------
  // EL GRÁFICO (to-do 23, paso 4): A y B en el MISMO eje, no un gráfico por lado (pedido de
  // Guido: separados pierden la gracia de la comparación). Eje X = año de cierre, en escala
  // real: un año que no se eligió deja su hueco y el tramo que lo cruza va punteado. Mismo
  // código visual que el gráfico de Finanzas (FIN_MULTI_CHART): presupuesto = punto hueco y
  // tramo punteado. "De qué vive cada lado" son las barras apiladas de Finanzas, una por lado.
  // ---------------------------------------------------------------------------
  var cmpModo = 'ing';
  var cmpCharts = [];
  var COL_LADO = ['#0a2b5c', '#d9822b'];

  // Un lado partido por año de cierre: para cada año, el mismo lado restringido a sus ejercicios
  // de ese año y agregado con totalesDe(), o sea con las mismas reglas que el número del lado
  // (promedio por los que informan, ratios sobre totales, factor de inflación por ejercicio).
  function seriePorAnio(l){
    var ys = {};
    paresDe(l).forEach(function(p){ if(p[1] != null) ys[p[1]] = 1; });
    return Object.keys(ys).map(Number).sort(function(a, b){ return a - b; }).map(function(y){
      var bs = (l.bloques || []).map(function(b){
        if(b.kind === 'liga'){
          var yrs = b.years.length ? b.years : [ultimaTemporada(b.league)];
          return yrs.indexOf(y) >= 0 ? { kind:'liga', league:b.league, years:[y], agg:b.agg } : null;
        }
        var ps = paresDeBloque(b).filter(function(p){ return p[1] === y; });
        return ps.length ? { kind:'clubes', pares:ps, agg:b.agg } : null;
      }).filter(Boolean);
      var pares = paresDe({ bloques:bs });
      return { y:y, tt:totalesDe({ nombre:'', bloques:bs }),
               presu: pares.length > 0 && pares.every(function(p){ return tipoDe(p[0], p[1]) === 'P'; }) };
    });
  }
  function unidadCmp(){
    return cmpReal ? 'M USD ' + t('finanzas.real.of', 'de') + ' ' + baseReal() : 'M USD';
  }
  function fmtCorto(v){ return v == null ? '—' : (v < 0 ? '-' : '') + Math.abs(v).toFixed(1); }
  function vecesTxt(va, vb){
    if(va == null || vb == null || va === 0 || vb === 0) return '';
    if((va < 0) !== (vb < 0)) return t('sel.graf.sign', 'signo distinto');
    var r = vb / va;
    return 'B = ' + r.toFixed(r >= 10 ? 0 : 1) + '× A';
  }

  // Dibuja A contra B en `canvas`. `series` = [serieA, serieB] de seriePorAnio(); `valor(tt)`
  // devuelve el número de un año (null = sin dato); `barras` = un punto es una barra (resultado).
  function graficoAB(canvas, nombres, series, valor, barras){
    var todos = {};
    series.forEach(function(s){ s.forEach(function(p){ todos[p.y] = 1; }); });
    var Y = Object.keys(todos).map(Number).sort(function(a, b){ return a - b; });
    var datasets = series.map(function(s, i){
      var col = COL_LADO[i];
      var d = s.map(function(p){
        var v = valor(p.tt);
        return v == null ? null : { x:p.y + (barras ? (i ? 0.18 : -0.18) : 0), y:v, presu:p.presu, yr:p.y };
      }).filter(Boolean);
      var label = LETRAS[i] + ' · ' + nombres[i];
      if(barras) return { type:'bar', label:label, data:d, barThickness:22,
        backgroundColor:d.map(function(p){ return p.presu ? '#fff' : col + 'cc'; }),
        borderColor:col, borderWidth:d.map(function(p){ return p.presu ? 1.5 : 0; }), borderDash:[3, 2] };
      return { type:'line', label:label, data:d, borderColor:col, backgroundColor:col, borderWidth:2.6, tension:0,
        pointRadius:4.5, pointBorderWidth:2, pointBackgroundColor:d.map(function(p){ return p.presu ? '#fff' : col; }),
        segment:{ borderDash:function(c){
          var p0 = d[c.p0DataIndex], p1 = d[c.p1DataIndex];
          return (p1.yr - p0.yr > 1 || p0.presu || p1.presu) ? [5, 4] : undefined;
        } } };
    });
    var presuTxt = t('finanzas.card.budget', 'Presupuesto');
    cmpCharts.push(new Chart(canvas, {
      type: barras ? 'bar' : 'line',
      data:{ datasets:datasets },
      options:{
        responsive:true, maintainAspectRatio:false, animation:false,
        interaction:{ mode:'nearest', axis:'x', intersect:false },
        plugins:{
          legend:{ position:'bottom', labels:{ usePointStyle:true, boxHeight:7 } },
          tooltip:{ callbacks:{
            title:function(it){ return it.length ? t('sel.graf.close', 'Cierre') + ' ' + it[0].raw.yr : ''; },
            label:function(c){ var r = c.raw;
              return c.dataset.label + (r.presu ? ' (' + presuTxt + ')' : '') + ': ' + r.y.toFixed(1) + ' ' + unidadCmp(); }
          } }
        },
        scales:{
          x:{ type:'linear', min:Y[0] - 0.5, max:Y[Y.length - 1] + 0.5, grid:{ display:false },
              afterBuildTicks:function(ax){ ax.ticks = Y.map(function(v){ return { value:v }; }); },
              ticks:{ autoSkip:true, autoSkipPadding:8, maxRotation:0, callback:function(v){ return String(v); } } },
          y:{ beginAtZero:true, title:{ display:true, text:unidadCmp() }, ticks:{ maxTicksLimit:6 } }
        }
      }
    }));
  }

  // "De qué vive cada lado": una barra apilada por lado, con los rubros de ingreso del formato
  // simplificado, cada rubro con su color fijo (colorDeRubro), igual en las dos barras.
  function graficoMezcla(canvas, nombres, tots){
    var rubros = [];
    tots.forEach(function(tt){ Object.keys(tt.mezcla).forEach(function(r){ if(rubros.indexOf(r) < 0) rubros.push(r); }); });
    cmpCharts.push(new Chart(canvas, {
      type:'bar',
      data:{ labels:nombres.map(function(n, i){ return LETRAS[i] + ' · ' + n; }),
             datasets:rubros.map(function(r){
               return { label:tLabel(r), data:tots.map(function(tt){ return tt.mezcla[r] || 0; }),
                        backgroundColor:colorDeRubro(r), maxBarThickness:120 };
             }) },
      options:{
        responsive:true, maintainAspectRatio:false, animation:false,
        plugins:{ legend:{ position:'bottom', labels:{ boxWidth:10, boxHeight:10 } },
          tooltip:{ callbacks:{ label:function(c){ return c.dataset.label + ': ' + c.parsed.y.toFixed(1) + ' ' + unidadCmp(); } } } },
        scales:{ x:{ stacked:true, grid:{ display:false } },
                 y:{ stacked:true, beginAtZero:true, title:{ display:true, text:unidadCmp() } } }
      }
    }));
  }

  function bloqueGrafico(tots){
    var caja = el('div', 'cd-graf');
    var head = el('div', 'cd-graf-head');
    var tit = el('div');
    tit.appendChild(el('h3', null, t('sel.graf.title', 'Ingresos, gastos y resultado')));
    tit.appendChild(el('p', 'cd-res-sub', cmpModo === 'mix'
      ? t('sel.graf.subMix', 'En {u}. De dónde sale la plata de cada lado, rubro por rubro (formato simplificado).').replace('{u}', unidadCmp())
      : t('sel.graf.sub', 'En {u}, por año de cierre. Una liga: un punto por temporada. Un club: uno por ejercicio.').replace('{u}', unidadCmp())));
    head.appendChild(tit);
    var seg = el('div', 'segmented');
    [['ing', t('section.revenue', 'Ingresos')], ['gas', t('section.expenses', 'Gastos')],
     ['pat', t('sel.graf.result', 'Resultado')], ['mix', t('sel.graf.mix', 'De qué vive cada lado')]].forEach(function(o){
      var b = el('button', cmpModo === o[0] ? 'active' : null, o[1]);
      b.type = 'button';
      b.addEventListener('click', function(){ cmpModo = o[0]; renderResultado(); });
      seg.appendChild(b);
    });
    head.appendChild(seg);
    caja.appendChild(head);

    // El número de cada lado arriba del gráfico, con "B = 3,1× A": es la comparación en una línea.
    var k = { ing:'revenue', gas:'expenses', pat:'pat', mix:'revenue' }[cmpModo];
    var lab = { ing:t('section.revenue', 'Ingresos'), gas:t('section.expenses', 'Gastos'),
                pat:t('sel.graf.result', 'Resultado'), mix:t('section.revenue', 'Ingresos') }[cmpModo];
    var sum = el('div', 'cd-graf-sum');
    var vals = tots.map(function(tt){ return tt.informan[k] ? tt.tot[k] : null; });
    tots.forEach(function(tt, i){
      var sp = el('span');
      sp.appendChild(el('span', 'cd-letra chica' + (i ? ' b' : ''), LETRAS[i]));
      var agg = (lado[i].bloques.length === 1 && tt.conDato > 1)
        ? ', ' + (lado[i].bloques[0].agg === 'promedio' ? t('sel.agg.avg.f', 'promedio') : t('sel.agg.sum.f', 'suma')) : '';
      sp.appendChild(document.createTextNode(lab + agg + ': '));
      var v = vals[i];
      sp.appendChild(el('b', tt.conDato && tt.presupuestos === tt.conDato ? 'presu' : null,
        (cmpModo === 'pat' && v > 0 ? '+' : '') + fmtCorto(v)));
      sum.appendChild(sp);
    });
    sum.appendChild(el('span', null, vecesTxt(vals[0], vals[1])));
    caja.appendChild(sum);

    var cv = el('div', 'cd-graf-cv');
    cv.appendChild(document.createElement('canvas'));
    caja.appendChild(cv);
    return caja;
  }

  function dibujarGrafico(caja, tots){
    cmpCharts.forEach(function(c){ c.destroy(); });
    cmpCharts = [];
    var canvas = caja.querySelector('.cd-graf canvas');
    if(!canvas || !window.Chart) return;
    var nombres = tots.map(function(tt){ return tt.nombre; });
    if(cmpModo === 'mix'){
      graficoMezcla(canvas, nombres, tots);
      dibujarFila(caja, nombres, [seriePorAnio(lado[0]), seriePorAnio(lado[1])]);
      return;
    }
    var k = { ing:'revenue', gas:'expenses', pat:'pat' }[cmpModo];
    var series = [seriePorAnio(lado[0]), seriePorAnio(lado[1])];
    graficoAB(canvas, nombres, series, function(tt){ return tt.informan[k] ? tt.tot[k] : null; }, cmpModo === 'pat');
    dibujarFila(caja, nombres, series);
  }

  // El rubro abierto de la tabla: el mismo gráfico A contra B, solo para ese rubro. Los gastos,
  // en positivo (es un tamaño). Un año sin el dato no se dibuja.
  function dibujarFila(caja, nombres, series){
    var cv = caja.querySelector('canvas[data-fila]');
    if(!cv || !cmpFila) return;
    var clave = cmpFila.slice(0, 1), label = cmpFila.slice(2);
    graficoAB(cv, nombres, series, function(tt){
      if(!tt.conDato) return null;
      if(clave === 'i') return tt.mezcla[label] || 0;
      return tt.informan.expenses ? Math.abs(tt.gastos[label] || 0) : null;
    }, false);
  }

  // ---------------------------------------------------------------------------
  // LA TABLA (to-do 23, paso 5): las filas de la de Finanzas en formato simplificado (rubro por
  // rubro, totales, resultado, deuda) y abajo los dos indicadores que solo tiene Comparar.
  // Columnas A, B y B / A, sin verde ni rojo en B / A: en una comparación ningún lado es el
  // bueno. Mismas clases que la tabla multi-año de Finanzas (.pl-multi): unidad en el
  // encabezado, gastos entre paréntesis, columna de presupuesto en amarillo y cursiva, rubro
  // desplegable con su gráfico (acá, A contra B por año de cierre).
  // ---------------------------------------------------------------------------
  var cmpPct = false;
  var cmpFila = null;   // 'i|<rubro>' o 'g|<rubro>': la fila abierta

  function escH(s){
    return String(s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; });
  }
  function fmtNum(v){
    if(v == null) return '—';
    var abs = Math.abs(v).toFixed(1);
    return v < 0 ? '<span class="neg-num">(' + abs + ')</span>' : abs;
  }
  function fmtPctCell(v, base){
    if(v == null || !base) return '—';
    var p = v / Math.abs(base) * 100;
    return p < 0 ? '<span class="neg-num">(' + Math.abs(p).toFixed(1) + '%)</span>' : p.toFixed(1) + '%';
  }
  function esPresu(tt){ return tt.conDato > 0 && tt.presupuestos === tt.conDato; }
  function preguntaH(texto){ return ' <span class="cd-q" tabindex="0" data-info-tip="' + escH(texto) + '">?</span>'; }

  function tablaComparacion(tots){
    var caja = el('div', 'cd-pl');
    var head = el('div', 'cd-graf-head');
    var tit = el('div');
    tit.appendChild(el('h3', null, t('sel.tab.title', 'Estado de resultados')));
    tit.appendChild(el('p', 'cd-res-sub', t('sel.tab.sub', 'En ingresos ves cuánta plata entró y en gastos cuánta salió, rubro por rubro. Tocá un rubro para ver cómo se compara año a año.')));
    head.appendChild(tit);
    var seg = el('div', 'segmented');
    [[false, unidadCmp()], [true, t('pl.multi.pctUnit', '% del total')]].forEach(function(o){
      var b = el('button', cmpPct === o[0] ? 'active' : null, o[1]);
      b.type = 'button';
      b.addEventListener('click', function(){ cmpPct = o[0]; renderResultado(); });
      seg.appendChild(b);
    });
    head.appendChild(seg);
    caja.appendChild(head);

    var pres = tots.map(esPresu);
    var tdCls = function(i){ return pres[i] ? ' class="pl-col-presu"' : ''; };
    var anyRev = tots.map(function(tt){ return !!tt.informan.revenue; });
    var anyGas = tots.map(function(tt){ return !!tt.informan.expenses; });
    var base = baseReal();

    // B / A: veces en montos, diferencia en puntos en "% del total". "—" con un cero o sin dato.
    function rat(va, vb, pa, pb){
      if(cmpPct){
        if(pa == null || pb == null) return '<td class="cd-rat">—</td>';
        var d = pb - pa;
        return '<td class="cd-rat">' + (d >= 0 ? '+' : '') + d.toFixed(1) + ' ' + t('sel.tab.pp', 'p.p.') + '</td>';
      }
      if(va == null || vb == null || va === 0 || vb === 0) return '<td class="cd-rat">—</td>';
      if((va < 0) !== (vb < 0)) return '<td class="cd-rat">' + t('sel.graf.sign', 'signo distinto') + '</td>';
      var r = vb / va;
      return '<td class="cd-rat">×' + r.toFixed(r >= 10 ? 0 : 1) + '</td>';
    }
    function cnt(tt, k){
      return tt.nEj[k] < tt.conDato
        ? '<span class="cd-cnt">' + tt.nEj[k] + ' ' + t('sel.of', 'de') + ' ' + tt.conDato + '</span>' : '';
    }

    // Encabezado: el nombre de cada lado; con el ajuste, el factor de cada año; la etiqueta de
    // presupuesto si el lado lo mezcla con balances. Con una LIGA de por medio va además cómo se
    // junta: "Brasileirão 2025: 114,1" a secas se lee como lo que factura la liga entera (hoy esa
    // temporada tiene un solo club cargado, Mirassol); "promedio de 1 ejercicio" dice lo que es.
    var h = '<thead><tr><th>' + escH(t('th.line', 'Rubro')) + '<small>' + escH(unidadCmp()) + '</small></th>';
    tots.forEach(function(tt, i){
      h += '<th' + tdCls(i) + '><span class="cd-letra chica' + (i ? ' b' : '') + '">' + LETRAS[i] + '</span>' + escH(tt.nombre);
      var hayLiga = (lado[i].bloques || []).some(function(b){ return b.kind === 'liga'; });
      if(hayLiga && lado[i].bloques.length === 1){
        h += '<small>' + escH((lado[i].bloques[0].agg === 'promedio' ? t('sel.card.avgOf', 'promedio de') : t('sel.card.sumOf', 'suma de'))
          + ' ' + nEjercicios(tt.conDato)) + '</small>';
      } else if(lado[i].bloques.length > 1){
        h += '<small>' + escH(tt.formula) + '</small>';
      }
      if(pres[i]) h += '<small>' + escH(t('finanzas.card.budget', 'Presupuesto')) + '</small>';
      if(cmpReal){
        var ys = tt.anios.filter(function(y, k, a){ return a.indexOf(y) === k; }).sort(function(a, b){ return a - b; });
        h += '<small>' + ys.map(function(y){
          return y >= base && facReal(y) === 1 && y > base ? y + ': ' + t('sel.tab.noadj', 'sin ajustar') : y + ': ×' + facReal(y).toFixed(2);
        }).join(' · ') + '</small>';
      }
      if(tt.presupuestos && !pres[i]){
        h += '<small><span class="cd-tag-presu">' + escH(t('sel.card.inclPresu', 'incluye') + ' ' + tt.presupuestos + ' '
          + (tt.presupuestos === 1 ? t('sel.card.presu1', 'presupuesto') : t('sel.card.presuN', 'presupuestos'))) + '</span></small>';
      }
      h += '</th>';
    });
    h += '<th class="cd-rat">B / A<small>' + escH(cmpPct ? t('sel.tab.diff', 'diferencia') : t('sel.tab.times', 'veces')) + '</small></th></tr></thead><tbody>';

    var sec = function(titulo){ return '<tr class="pl-section-head"><td colspan="4">' + titulo + '</td></tr>'; };
    function filaRubro(clave, label, vals, totales, hay){
      var id = clave + '|' + label;
      var abierta = cmpFila === id;
      var pcts = vals.map(function(v, i){ return hay[i] && totales[i] ? v / Math.abs(totales[i]) * 100 : null; });
      var r = '<tr class="pl-row-open' + (abierta ? ' abierto' : '') + '" data-fila="' + escH(id) + '" tabindex="0"><td><span class="pl-arrow">'
        + (abierta ? '&#9662;' : '&#9656;') + '</span>' + escH(tLabel(label)) + '</td>';
      var dentro = tots.map(function(tt){ return tt.conDato === 1 ? tt.incl[id] : null; });
      vals.forEach(function(v, i){
        if(dentro[i]){
          r += '<td' + tdCls(i) + '><span class="pl-incluido" tabindex="0" data-info-tip="'
            + escH(window.FINANZAS_DENTRO_TIP ? window.FINANZAS_DENTRO_TIP(dentro[i].en, dentro[i].posible) : dentro[i].en) + '">—</span></td>';
          return;
        }
        r += '<td' + tdCls(i) + '>' + (!hay[i] ? '—' : cmpPct ? fmtPctCell(v, totales[i]) : fmtNum(v)) + '</td>';
      });
      r += (dentro[0] || dentro[1] ? '<td class="cd-rat">—</td>' : rat(hay[0] ? vals[0] : null, hay[1] ? vals[1] : null, pcts[0], pcts[1])) + '</tr>';
      if(abierta) r += '<tr class="pl-row-chart"><td colspan="4"><div class="pl-row-chart-wrap"><canvas data-fila="' + escH(id) + '"></canvas></div></td></tr>';
      return r;
    }
    function filaTotal(label, vals, hay, cls){
      var r = '<tr class="pl-bold ' + cls + '"><td>' + label + '</td>';
      vals.forEach(function(v, i){ r += '<td' + tdCls(i) + '>' + (!hay[i] ? '—' : cmpPct ? '100%' : fmtNum(v)) + '</td>'; });
      return r + (cmpPct ? '<td class="cd-rat">—</td>' : rat(hay[0] ? vals[0] : null, hay[1] ? vals[1] : null)) + '</tr>';
    }
    function union(campo){
      var out = [];
      tots.forEach(function(tt){ tt[campo].forEach(function(l){ if(out.indexOf(l) < 0) out.push(l); }); });
      return out;
    }

    var totIng = tots.map(function(tt){ return tt.informan.revenue ? tt.tot.revenue : null; });
    var totGas = tots.map(function(tt){ return tt.informan.expenses ? -tt.tot.expenses : null; });

    h += sec(escH(t('section.revenue', 'Ingresos')));
    union('ordenIng').forEach(function(l){
      var vals = tots.map(function(tt){ return tt.mezcla[l] || 0; });
      // Un rubro en cero en los dos lados no dice nada (salvo que esté dentro de otro).
      if(!vals[0] && !vals[1] && !tots.some(function(tt){ return tt.conDato === 1 && tt.incl['i|' + l]; })) return;
      h += filaRubro('i', l, vals, totIng, anyRev);
    });
    h += filaTotal(escH(t('sel.tab.totRev', 'Total ingresos')), totIng, anyRev, 'pl-shade');

    h += sec(escH(t('section.expenses', 'Gastos')) + preguntaH(t('cmp.m.expenses.note', 'Incluye amortizaciones y depreciación, igual que el total de la tabla de Finanzas.')));
    union('ordenGas').forEach(function(l){
      var vals = tots.map(function(tt){ return tt.gastos[l] || 0; });
      if(!vals[0] && !vals[1] && !tots.some(function(tt){ return tt.conDato === 1 && tt.incl['g|' + l]; })) return;
      h += filaRubro('g', l, vals, totGas, anyGas);
    });
    h += filaTotal(escH(t('sel.tab.totExp', 'Total gastos')), totGas, anyGas, 'pl-shade');

    // Resultado: lo que no es ni ingreso ni gasto operativo (intereses, resultados financieros,
    // extraordinarios) en una fila, para que la columna cierre contra el resultado oficial.
    h += sec(escH(t('sel.tab.result', 'Resultado')));
    var pat = tots.map(function(tt){ return tt.informan.pat ? tt.tot.pat : null; });
    var otros = tots.map(function(tt, i){ return pat[i] != null && totIng[i] != null && totGas[i] != null ? pat[i] - totIng[i] - totGas[i] : null; });
    var rOtros = '<tr><td>' + escH(t('sel.tab.other', 'Intereses y otros resultados'))
      + preguntaH(t('sel.tab.other.tip', 'Intereses, resultados financieros y extraordinarios: por eso el resultado no es ingresos menos gastos.')) + '</td>';
    otros.forEach(function(v, i){ rOtros += '<td' + tdCls(i) + '>' + (v == null ? '—' : cmpPct ? fmtPctCell(v, totIng[i]) : fmtNum(v)) + '</td>'; });
    h += rOtros + '<td class="cd-rat">—</td></tr>';
    var rPat = '<tr class="pl-bold pl-highlight"><td>' + escH(t('cmp.m.pat', 'Resultado del ejercicio'))
      + (cmpPct ? ' <small>(' + escH(t('pl.multi.margin', '% de los ingresos')) + ')</small>' : '') + '</td>';
    pat.forEach(function(v, i){ rPat += '<td' + tdCls(i) + '>' + (v == null ? '—' : (cmpPct ? fmtPctCell(v, totIng[i]) : fmtNum(v)) + cnt(tots[i], 'pat')) + '</td>'; });
    h += rPat + (cmpPct ? '<td class="cd-rat">—</td>' : rat(pat[0], pat[1])) + '</tr>';

    h += sec(escH(t('sel.tab.debt', 'Deuda')));
    var nd = tots.map(function(tt){ return tt.informan.netDebt ? tt.tot.netDebt : null; });
    var rNd = '<tr><td>' + escH(t('cmp.m.netdebt', 'Deuda neta')) + preguntaH(t('cmp.m.netdebt.note', 'Deuda bruta menos caja. Negativa quiere decir más caja que deuda.')) + '</td>';
    nd.forEach(function(v, i){
      var vacio = v == null && pres[i] ? '<span class="cd-cnt">' + escH(t('sel.tab.noDebt', 'un presupuesto no la informa')) + '</span>' : '';
      rNd += '<td' + tdCls(i) + '>' + (v == null ? '—' + vacio : cmpPct ? '—' : fmtNum(v) + cnt(tots[i], 'netDebt')) + '</td>';
    });
    h += rNd + (cmpPct ? '<td class="cd-rat">—</td>' : rat(nd[0], nd[1])) + '</tr>';

    // Los dos indicadores que Finanzas no tiene: aparte, al final, para que el resto de la
    // tabla sea igual a la de Finanzas.
    h += sec(escH(t('sel.tab.only', 'Indicadores que solo tiene Comparar')));
    var wp = tots.map(function(tt){ return tt.tot.wagesPct; });
    var rWp = '<tr><td>' + escH(t('cmp.m.wages', 'Masa salarial / Ingresos')) + preguntaH(t('sel.tab.wages.tip', 'Cuánto de lo que entra se va en sueldos del plantel. Se calcula sobre los totales del lado, no promediando porcentajes.')) + '</td>';
    wp.forEach(function(v, i){ rWp += '<td' + tdCls(i) + '>' + (v == null ? '—' : v.toFixed(0) + '%' + cnt(tots[i], 'wages')) + '</td>'; });
    h += rWp + '<td class="cd-rat">' + (wp[0] != null && wp[1] != null ? (wp[1] - wp[0] >= 0 ? '+' : '') + (wp[1] - wp[0]).toFixed(0) + ' ' + t('sel.tab.pp', 'p.p.') : '—') + '</td></tr>';
    var pm = tots.map(function(tt){ return tt.tot.perMember; });
    var rPm = '<tr><td>' + escH(t('cmp.m.permember', 'Ingreso por socio')) + preguntaH(t('cmp.m.permember.note', 'Solo para los clubes que publican su padrón de socios.')) + '</td>';
    pm.forEach(function(v, i){ rPm += '<td' + tdCls(i) + '>' + (v == null ? '—' : Math.round(v).toLocaleString('es-AR') + ' USD' + cnt(tots[i], 'socios')) + '</td>'; });
    h += rPm + rat(pm[0], pm[1]) + '</tr>';

    var tw = el('div', 'cd-tw');
    var tabla = el('table', 'pl-multi cd-tabla-n');
    tabla.innerHTML = h + '</tbody>';
    tabla.addEventListener('click', function(ev){
      var tr = ev.target.closest('tr[data-fila]');
      if(!tr) return;
      cmpFila = cmpFila === tr.dataset.fila ? null : tr.dataset.fila;
      renderResultado();
    });
    tabla.addEventListener('keydown', function(ev){
      if(ev.key !== 'Enter' && ev.key !== ' ') return;
      var tr = ev.target.closest('tr[data-fila]');
      if(!tr) return;
      ev.preventDefault();
      cmpFila = cmpFila === tr.dataset.fila ? null : tr.dataset.fila;
      renderResultado();
    });
    tw.appendChild(tabla);
    caja.appendChild(tw);
    return caja;
  }

  function renderResultado(){
    var caja = $('cdResultado');
    if(!caja) return;
    if(!mostrando){ caja.hidden = true; caja.innerHTML = ''; limpiarAvisosLado(); return; }
    var activos = [lado[0], lado[1]].filter(Boolean);
    if(activos.length < 2){ caja.hidden = true; limpiarAvisosLado(); return; }

    caja.hidden = false;
    caja.innerHTML = '';
    var tots = activos.map(totalesDe);

    // Sin título "A contra B" ni párrafo de reglas (to-do 23, paso 6): los cards ya dicen qué es
    // cada lado, y la barra dice el formato y la moneda. El resultado arranca con el gráfico.
    caja.appendChild(bloqueGrafico(tots));
    caja.appendChild(tablaComparacion(tots));

    // Abajo de la tabla, solo los avisos que valen para la comparación entera. Los de cada
    // lado van a su card (avisosDeLado), al lado de lo que explican.
    var avisos = [];
    if(tots[0].conDato !== tots[1].conDato){
      avisos.push(t('sel.res.desparejo2', 'Los dos lados no tienen la misma cantidad de ejercicios (A: {a}, B: {b}). Mirá cómo se arma cada uno, en su card, antes de leer el total como "quién es más grande".')
        .replace('{a}', tots[0].conDato).replace('{b}', tots[1].conDato));
    }
    avisos.push(t('sel.res.cero2', 'Un ejercicio sin el dato no suma cero: queda afuera y se cuenta aparte (el "12 de 14" abajo del número).'));
    var pie = el('div', 'cd-avisos');
    avisos.forEach(function(a){ pie.appendChild(el('p', null, a)); });
    caja.appendChild(pie);

    caja.appendChild(bloqueFuentes(tots));
    avisosDeLado(tots);
    // El gráfico se dibuja con el bloque ya colgado: Chart.js mide el contenedor.
    dibujarGrafico(caja, tots);
  }

  // Los avisos de cada lado, en su card: lo que el número de ESE lado deja afuera o junta.
  // Los años y los presupuestos ya están a la vista en los chips y en la línea de cómo se arma.
  function avisosDeLado(tots){
    var cajas = document.querySelectorAll('#cdWrap .cd-avisos-lado');
    tots.forEach(function(tt, i){
      var c = cajas[i];
      if(!c) return;
      c.innerHTML = '';
      var avisos = [];
      if(tt.sinEjercicio.length){
        avisos.push(tt.sinEjercicio.length + ' ' + t('sel.res.falta', 'club(es) sin ese ejercicio, afuera de la cuenta') + ' ('
          + tt.sinEjercicio.slice(0, 4).join(', ') + (tt.sinEjercicio.length > 4 ? ', +' + (tt.sinEjercicio.length - 4) : '') + ').');
      }
      // Con un solo ejercicio, "dentro de otro rubro" va en la celda de la tabla (con su bocadillo).
      if(tt.incluidos.length && tt.conDato > 1){
        avisos.push(t('sel.res.incluidos2', 'el documento junta dos rubros en una línea, y en la tabla suman donde están') + ': '
          + tt.incluidos.slice(0, 3).join('; ') + (tt.incluidos.length > 3 ? '; +' + (tt.incluidos.length - 3) : '') + '.');
      }
      if(tt.mezclaAgg) avisos.push(t('sel.res.mezcla', 'este lado mezcla un promedio con una sumatoria') + ' (' + tt.formula + ').');
      avisos.forEach(function(a){ c.appendChild(el('p', null, a.charAt(0).toUpperCase() + a.slice(1))); });
    });
  }
  function limpiarAvisosLado(){
    document.querySelectorAll('#cdWrap .cd-avisos-lado').forEach(function(c){ c.innerHTML = ''; });
  }

  // FUENTES (to-do 23, paso 6): como en Finanzas, un renglón por ejercicio, agrupado por lado.
  // Cada renglón dice el documento y linkea a él; abajo, la página de fuentes de cada club.
  function bloqueFuentes(tots){
    var caja = el('div', 'cd-fuentes');
    caja.appendChild(el('h3', null, t('fuentes.card.title', 'Fuentes')));
    caja.appendChild(el('p', 'cd-res-sub', t('sel.src.sub', 'De dónde sale cada número. Un renglón por ejercicio, agrupado por lado.')));
    var tipoDoc = function(id, y){
      var tp = (yearsOf(id).filter(function(p){ return p[0] === y; })[0] || [])[1];
      return tp === 'official_budget' ? t('finanzas.card.budget', 'Presupuesto')
        : tp === 'official_budget_and_balance' ? t('finanzas.card.both', 'Presupuesto y Balance')
        : t('finanzas.card.balance', 'Balance');
    };
    [lado[0], lado[1]].forEach(function(l, i){
      var pares = paresDe(l).filter(function(p){ return p[1] != null; });
      var det = el('details', 'fin-src-year');
      if(i === 1 || pares.length <= 3) det.open = true;
      var sum = el('summary');
      sum.appendChild(el('span', 'cd-letra chica' + (i ? ' b' : ''), LETRAS[i]));
      sum.appendChild(document.createTextNode(tots[i].nombre + ' · ' + nEjercicios(pares.length)));
      det.appendChild(sum);
      var clubesVistos = [];
      pares.slice().sort(function(a, b){ return nameOf(a[0]).localeCompare(nameOf(b[0]), 'es') || a[1] - b[1]; }).forEach(function(p){
        var meta = (((window.CLUB_GENERIC_DATA || {})[p[0]] || {}).fiscalYearMeta || {})[p[1]] || {};
        var src = (typeof sources !== 'undefined' ? sources : {})[meta.sourceId];
        var fila = el('div', 'cd-src-row');
        fila.appendChild(document.createTextNode(nameOf(p[0]) + ', ' + etiquetaEj(p[0], p[1]) + ' · ' + tipoDoc(p[0], p[1]) + ': '));
        if(src){
          if(src.url){
            var a = el('a', null, src.title);
            a.href = src.url; a.target = '_blank'; a.rel = 'noopener';
            fila.appendChild(a);
          } else fila.appendChild(document.createTextNode(src.title));
        } else fila.appendChild(el('span', 'cd-cnt-inline', t('sel.src.none', 'sin documento cargado')));
        det.appendChild(fila);
        if(clubesVistos.indexOf(p[0]) < 0) clubesVistos.push(p[0]);
      });
      // La página de fuentes de cada club (fuentes/<clubId>.html), solo si tiene documentos.
      var conPagina = clubesVistos.filter(function(id){
        return Object.keys(typeof sources !== 'undefined' ? sources : {}).some(function(k){ return sources[k].clubId === id; });
      });
      if(conPagina.length === 1){
        var lnk = el('a', 'cd-src-more', t('fuentes.card.club', 'Ver todos los documentos de este club') + ' →');
        lnk.href = 'fuentes/' + conPagina[0] + '.html';
        det.appendChild(lnk);
      }
      caja.appendChild(det);
    });
    var todas = el('a', 'cd-src-more', t('fuentes.card.others', 'Ver fuentes de otros equipos') + ' →');
    todas.href = 'fuentes.html';
    caja.appendChild(todas);
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
    // HASTA LA VERSIÓN 182 ESTO ESTABA LIMITADO AL CAMINO DE COMPARAR, con el
    // motivo "Finanzas muestra un club por vez". Era cierto y dejó de serlo: desde
    // la Versión 183 una liga tiene su propia pantalla (la pestaña Ligas), así que
    // buscar "LaLiga" desde el botón del header tiene que encontrarla igual que
    // desde Comparar. Buscar una liga y que el buscador conteste con sus 9 clubes
    // era justo el síntoma que el to-do 23(c) describía.
    var hits = 0;
    {
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
            // no es un sujeto (Admin/CONVENCIONES.md, "no existe ninguna arista club ->
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

    // Se loggea con un debounce PROPIO, más largo que el de renderBusqueda()
    // (Versión 165): loggear en cada tecla mandaría "b", "bi", "bil"… de un
    // mismo "bilbao" como búsquedas separadas. Este timer se reinicia en cada
    // letra nueva y solo dispara si el visitante se quedó quieto 900ms.
    clearTimeout(logBusquedaTimer);
    logBusquedaTimer = setTimeout(function(){
      logEvent({ type:'search', q:q, hits:hits > 0 });
    }, 900);
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
  // La bajada del título con club (to-do 147, paso 1): liga · país · cuántos balances y
  // presupuestos hay y de qué ejercicio a qué ejercicio. Sale del índice liviano
  // (CLUB_INDEX), así que no necesita los datos del club cargados. La liga es la del
  // ejercicio más reciente que tenga una asignada; si la tabla de ligas de ese país
  // todavía no cargó, la bajada sale sin liga en vez de esperar.
  function finSubtitle(id){
    var partes = [];
    var yrs = (idx(id).yrs || []);
    var conLiga = yrs.map(function(p){ return typeof leagueAt === 'function' ? leagueAt(id, p[0]) : null; })
                     .filter(Boolean)[0];
    var liga = conLiga && (window.LEAGUES || {})[conLiga];
    if(liga) partes.push(liga.name);
    var co = window.COUNTRIES[countryOf(id)];
    if(co) partes.push(t(co.key, co.name));
    var BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
    var PRE = { official_budget:1, official_budget_and_balance:1 };
    var nb = 0, np = 0, anios = [];
    yrs.forEach(function(p){
      if(BAL[p[1]]) nb++;
      if(PRE[p[1]]) np++;
      if(BAL[p[1]] || PRE[p[1]]) anios.push(p[0]);
    });
    if(anios.length){
      var calendario = clubs[id] && clubs[id].fiscalYearStart === '01-01';
      var ej = function(y){ return calendario ? String(y) : (y - 1) + '/' + String(y).slice(2); };
      var cuantos = [];
      if(nb) cuantos.push(nb === 1 ? t('finanzas.head.bal1', '1 balance') : t('finanzas.head.baln', '{n} balances').replace('{n}', nb));
      if(np) cuantos.push(np === 1 ? t('finanzas.head.pre1', '1 presupuesto') : t('finanzas.head.pren', '{n} presupuestos').replace('{n}', np));
      var desde = Math.min.apply(null, anios), hasta = Math.max.apply(null, anios);
      var rango = desde === hasta ? ej(desde)
        : t('finanzas.head.range', '{a} a {b}').replace('{a}', ej(desde)).replace('{b}', ej(hasta));
      partes.push(cuantos.join(t('finanzas.head.and', ' y ')) + ', ' + rango);
    }
    return partes.join(' · ');
  }

  function renderFinSelector(){
    var caja = $('finSelector');
    if(!caja) return;
    caja.innerHTML = '';
    var id = api.getClub();
    caja.className = 'fin-sel' + (id ? '' : ' vacio');
    var sec = $('finanzas');
    if(sec) sec.classList.toggle('sin-club', !id);

    // Con club, el club ES el título y se cambia desde el chip del header: el card de acá
    // repetía el mismo control (to-do 147, paso 1). Sin club, el card sigue siendo lo único
    // que hay para hacer en la pantalla.
    var h1 = $('finTitle'), bajada = $('finSub');
    if(h1) h1.textContent = id ? nameOf(id) : t('finanzas.title', 'Finanzas');
    if(bajada){
      bajada.textContent = id ? finSubtitle(id) : '';
      bajada.hidden = !bajada.textContent;
      // Las tablas de ligas se cargan aparte (data/club-leagues/<país>.js): si todavía no
      // llegaron, la bajada se rearma cuando lleguen, siempre que el club no haya cambiado.
      if(id && typeof window.loadClubLeagues === 'function'){
        window.loadClubLeagues().then(function(){
          if(api.getClub() === id) bajada.textContent = finSubtitle(id);
        });
      }
    }
    caja.hidden = !!id;
    if(id) return;

    caja.appendChild(el('span', 'fin-sel-ico', '?'));
    var txt = el('span', 'fin-sel-txt');
    txt.appendChild(el('span', 'fin-sel-t', t('finanzas.sel.none', 'Todavía no elegiste un club')));
    txt.appendChild(el('span', 'fin-sel-s', t('finanzas.sel.sub.none', 'Elegilo y acá abajo aparecen sus ingresos, gastos y deuda, ejercicio por ejercicio.')));
    caja.appendChild(txt);

    var b = el('button', 'fin-sel-btn', t('finanzas.sel.pick', 'Elegir un club'));
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
    // Versión 183: el selector no sabe navegar ni cargar un ranking, igual que no
    // sabe renderizar un club. index.html le pasa qué hacer cuando se eligió una
    // liga, y este archivo solo decide CUÁNDO se eligió una.
    api.pickLeague = hooks.pickLeague || api.pickLeague;

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
    // (El click afuera del "?" que cierra el bocadillo lo escucha js/info-tip.js desde la Versión 515.)

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
    savedClub: savedClub,
    // to-do 70, "Saved Searches": reabrir una comparación guardada en Mi Cuenta sin pasar por
    // el modal de pasos — `a`/`b` son los mismos objetos `lado` ({nombre, bloques}) que guardó
    // notifyStateChange() en aplicar(). index.html todavía tiene que navegar a la pestaña 'vs'.
    reopenComparacion: function(a, b){
      lado[0] = a; lado[1] = b;
      // render() dibuja los dos cards de arriba (#cdWrap) leyendo `lado[i]` directo — sin esto
      // quedaban vacíos, aunque aplicar() sí mostrara bien la tabla de resultado de abajo
      // (encontrado por Guido probando la reapertura). Desde el to-do 23, render() con los
      // dos lados llenos llama a aplicar() solo, que carga los data files que hagan falta.
      render();
    },
    // to-do 70: pares [clubId, year] YA RESUELTOS de un lado — un bloque puede guardar el año
    // en `null` ("el más reciente que haya", ver paresDeBloque()) y ese default se calcula acá
    // adentro, no en el bloque en sí. js/cuenta.js necesita el año real para el label
    // ("Real Betis, 2025/2026"), así que pide la versión ya resuelta en vez de leer `bloques`
    // crudo.
    paresDeLado: function(l){ return paresDe(l); },
    // to-do 23: "Valores ajustados por inflación" de Comparar. Lo usa el toggle de la barra (paso 3).
    setReal: function(v){ cmpReal = !!v; renderControles(); if(mostrando) renderResultado(); },
    baseReal: baseReal
  };
})();

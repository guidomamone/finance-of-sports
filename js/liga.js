// ============================================================================
// js/liga.js — LA PESTAÑA "LIGAS" (el ranking de ingresos de los clubes de una liga en UN ejercicio), la simulación de clubes en
// una liga que no es la suya y la vidriera de rankings de Inicio. Reglas de pantalla: Admin/PANTALLA.md, "Pestaña Ligas" y
// "Simular clubes".
//
// - Un ranking es (liga, EJERCICIO), nunca (liga): el ejercicio va siempre en el encabezado y se cambia con un selector propio.
// - El default es el ejercicio con MÁS clubes, no el más reciente (los balances tardan en publicarse: el más nuevo es el más flaco).
// - Los números salen de data/rankings/<liga>.js, precalculado por tools/generate-rankings.js con el motor real: no se baja ningún
//   data/<país>/<club>-data.js.
// - El ranking son barras horizontales en el color de cada club, de mayor a menor, con el monto escrito (con eje lineal, un club
//   chico es un hilo). La composición va aparte, una barra apilada por club: el bolsón sin desglosar en beige y un tramo negativo
//   nombrado debajo, porque no se puede apilar.
// ============================================================================
window.LIGA_VIEW = (function(){
  'use strict';

  // El (liga, ejercicio) que se está mirando; `null` es el estado frío (se llega por el nav sin elegir nada). `simulados`: clubes
  // insertados a mano en ESTE ranking para ver dónde quedarían por plata. Nunca se guardan en window.RANKINGS (la verdad compartida),
  // se pierden al cambiar de liga y no cuentan para ningún total.
  var st = { league:null, year:null, simulados:[] };
  // Los clubes esperando liga destino (desde Finanzas, o al volver de una simulación activa), como [{clubId, clubYear}]. No es
  // parte de `st` porque todavía no hay liga elegida. `[]` = no está en modo "elegir destino".
  var pendingSim = [];
  // El texto del buscador de "sumar un club": UI efímera, se resetea al navegar a otra liga o volver.
  var buscadorQ = '';
  function norm(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function $(id){ return document.getElementById(id); }
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }
  // Traduce una etiqueta de bucket, como tLabel() en js/finanzas-render.js (solo las de data/site-labels.js; el resto pasa intacta).
  function tLabel(label){
    var key = (window.SITE_LABEL_KEYS || {})[label];
    return key ? t(key, label) : label;
  }
  function el(tag, cls, txt){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    if(txt != null) n.textContent = txt;
    return n;
  }
  // OJO: `clubs` SIN `window.`: data/clubs.js lo declara con `const`, así que window.clubs da undefined.
  function clubDe(id){ return (typeof clubs !== 'undefined' && clubs[id]) || {}; }
  // Con año, el nombre que el club tenía ese año (js/nombres.js): en la tabla de una temporada se ve el que ve el hincha en ese torneo.
  function nombreDe(id, anio){ return window.nombreClubEn ? window.nombreClubEn(id, anio) : (clubDe(id).displayName || id); }
  function deporteNombre(id){ var sp = (window.SPORTS || []).filter(function(x){ return x.id === id; })[0]; return sp ? t(sp.key, sp.name) : ''; }
  function ligaDe(lid){ return (window.LEAGUES || {})[lid] || {}; }
  function paisDe(lid){ return (window.COUNTRIES || {})[ligaDe(lid).country] || {}; }
  // La etiqueta del ejercicio se arma acá y no viene del archivo generado: congelarla en data/rankings/ la haría intraducible.
  // ejercicioLabel() solo necesita clubs[id].fiscalYearStart (eager); el fallback es el año pelado.
  function etiquetaEjercicio(f, year){
    return (typeof window.ejercicioLabel === 'function')
      ? window.ejercicioLabel(year, f.reportType, f.id)
      : String(year);
  }
  // "1 club" y no "1 club(es)".
  function nClubes(n){
    return n + ' ' + (n === 1 ? t('liga.club1', 'club') : t('liga.clubN', 'clubes'));
  }
  // El bolsón "sin desglosar por la fuente" se identifica por su etiqueta, que depende del deporte del club (LUMP_LABEL_BY_SPORT de
  // js/finanzas-calc.js, la misma clave que en data/site-labels.js). `esBolson(c)` reconoce la de cualquier deporte.
  var LUMP_LABELS = Object.keys(window.LUMP_LABEL_BY_SPORT || {}).map(function(k){ return window.LUMP_LABEL_BY_SPORT[k]; });
  if(!LUMP_LABELS.length) LUMP_LABELS = ['Fútbol profesional (sin desglosar por la fuente)'];
  function esBolson(c){ return LUMP_LABELS.indexOf(c) >= 0; }
  // El total de los cargados: una sola cuenta para rankingCard(), salvedades() y tarjetaLiga().
  function totalDe(r){
    return r.clubs.reduce(function(s, f){ return s + f.revenue; }, 0);
  }
  // Filas para dibujar: reales + simuladas, descendente. Siempre un array nuevo: nunca mutar r.clubs, que es
  // window.RANKINGS[liga][año], compartido y cacheado.
  function filasConSimulado(r, filasSim){
    if(!filasSim || !filasSim.length) return r.clubs;
    return r.clubs.concat(filasSim).sort(function(a, b){ return b.revenue - a.revenue; });
  }
  function fmtM(v){
    var abs = Math.abs(v);
    var txt = abs >= 1000 ? (abs / 1000).toFixed(2) + ' MM' : abs.toFixed(1) + ' M';
    return (v < 0 ? '-' : '') + txt + ' USD';
  }

  // --------------------------------------------------------------------------
  // LA CARGA: un <script> inyectado con el ?v= de ASSET_V (sin él, un visitante se queda con números viejos después de un deploy) y
  // una promesa cacheada por liga para que dos pedidos simultáneos no ejecuten el archivo dos veces.
  // --------------------------------------------------------------------------
  var pend = {};
  function loadRanking(leagueId){
    if((window.RANKINGS || {})[leagueId]) return Promise.resolve(true);
    if(pend[leagueId]) return pend[leagueId];
    var src = fosUrl('data/rankings/' + leagueId + '.js') + fosV('data/rankings/' + leagueId + '.js');
    pend[leagueId] = new Promise(function(resolve){
      var s = document.createElement('script');
      s.src = src;
      s.onload = function(){ delete pend[leagueId]; resolve(true); };
      // No se rechaza: una liga sin ranking es una liga sin datos, y la vista ya sabe dibujar ese caso.
      s.onerror = function(){
        delete pend[leagueId];
        console.warn('[liga] no se pudo cargar ' + src);
        resolve(false);
      };
      document.head.appendChild(s);
    });
    return pend[leagueId];
  }

  // LOS ESTIMADOS (data/estimados/<liga>.js, de tools/estimar.mjs): el ingreso de cada club de la liga sin balance ese año, una cuenta
  // nuestra y no un dato del club. Mismo mecanismo que loadRanking(); una liga sin archivo es una liga sin estimados.
  var pendEst = {};
  function loadEstimados(leagueId){
    if((window.ESTIMADOS || {})[leagueId]) return Promise.resolve(true);
    if(pendEst[leagueId]) return pendEst[leagueId];
    pendEst[leagueId] = new Promise(function(resolve){
      var s = document.createElement('script');
      s.src = fosUrl('data/estimados/' + leagueId + '.js') + fosV('data/estimados/' + leagueId + '.js');
      s.onload = function(){ delete pendEst[leagueId]; resolve(true); };
      s.onerror = function(){ delete pendEst[leagueId]; resolve(false); };
      document.head.appendChild(s);
    });
    return pendEst[leagueId];
  }
  function cargarLiga(leagueId){ return Promise.all([loadRanking(leagueId), loadEstimados(leagueId)]); }
  // Filas estimadas del (liga, ejercicio): mismas claves que una fila real más `estimado`, y `n` cuando el club no está en el sitio.
  function filasEstimadas(leagueId, year){
    return (((window.ESTIMADOS || {})[leagueId] || {})[year] || []).map(function(e){
      return { id:e.id || null, n:e.n || null, revenue:e.revenue, lo:e.lo, hi:e.hi, error:e.error, estimado:true, margen:!!e.margen, ancla:e.caso === 'ancla' };
    });
  }
  // El total suma los estimados solo cuando más de la mitad de la liga de ese año tiene balance real. El tamaño es el
  // verificado (leagueSize) o, sin él, reales + estimados (la lista de la temporada).
  function totalConEstimados(r, est){
    var tam = r.leagueSize != null ? r.leagueSize : r.clubs.length + est.length;
    return est.length > 0 && tam > 0 && r.clubs.length / tam > 0.5;
  }

  function rankingDe(leagueId, year){
    return ((window.RANKINGS || {})[leagueId] || {})[year] || null;
  }
  function aniosDe(leagueId){
    return Object.keys((window.RANKINGS || {})[leagueId] || {})
      .map(Number).sort(function(a, b){ return b - a; });
  }
  // El ejercicio por default: el de MÁS clubes cargados, y entre empatados el más reciente.
  function anioPorDefecto(leagueId){
    var ys = aniosDe(leagueId);
    if(!ys.length) return null;
    return ys.slice().sort(function(a, b){
      var na = rankingDe(leagueId, a).clubs.length, nb = rankingDe(leagueId, b).clubs.length;
      return (nb - na) || (b - a);
    })[0];
  }

  // --------------------------------------------------------------------------
  // LA API QUE USA EL RESTO DEL SITIO.
  // `show(liga, año)` deja la vista lista; QUIÉN navega a la sección es el
  // llamador (index.html), que es el único que conoce el nav.
  // --------------------------------------------------------------------------
  function show(leagueId, year){
    return cargarLiga(leagueId).then(function(){
      st.league = leagueId;
      st.year = (year != null && rankingDe(leagueId, year)) ? Number(year) : anioPorDefecto(leagueId);
      st.simulados = [];
      buscadorQ = '';
      render();
    });
  }

  // --------------------------------------------------------------------------
  // "¿CÓMO LE IRÍA A ESTE CLUB EN OTRA LIGA?": insertar un club cargado en el ranking de otra liga, solo por ingresos (no es una
  // predicción deportiva). Mismo motor que tools/generate-rankings.js (computeYearGeneric + toDisplayValue +
  // simplifiedReportForClub), en vivo: el club ya está en memoria. Nunca reimplementar la cascada por afuera del motor.
  function filaSimulada(clubId, year){
    if(typeof computeYearGeneric !== 'function' || typeof toDisplayValue !== 'function'
       || typeof yearMetaFor !== 'function') return null;
    var c = computeYearGeneric(clubId, year);
    var meta = yearMetaFor(clubId, year);
    if(!c || !meta) return null;
    var revenue = toDisplayValue(c.revenue, meta, 'USD');
    // Como en tools/generate-rankings.js: un club sin ingreso calculable (o en 0) no entra con una barra en cero.
    if(!revenue) return null;
    var rep = (typeof simplifiedReportForClub === 'function' ? simplifiedReportForClub(clubId, year) : null) || {};
    var mix = (rep.ingresos || [])
      .map(function(row){ return [row.label, toDisplayValue(row.value, meta, 'USD')]; })
      .filter(function(row){ return row[1] !== 0; });
    // OJO: reportType y sourceId salen de c.meta (el fiscalYearMeta crudo), NO de yearMetaFor(), que solo devuelve moneda y tipo
    // de cambio.
    var incluidos = (rep.ingresos || []).filter(function(row){ return row.incluidoEn; }).map(function(row){ return [row.label, row.incluidoEn].concat(row.incluidoPosible ? [1] : []); });
    return { id:clubId, revenue:revenue, reportType:c.meta.reportType || null,
             sourceId:c.meta.sourceId || null, mix:mix, year:year, simulado:true, incluidos:incluidos };
  }

  // Arranca el flujo desde Finanzas: guarda el club a insertar y deja la pestaña en el estado frío, en modo "elegir destino".
  function iniciarSimulacion(clubId, year){
    pendingSim = [{ clubId:clubId, clubYear:year }];
    st.league = null; st.year = null; st.simulados = [];
    render();
  }

  // Los ejercicios cargados de un club, descendente. agregarSimulado() sin año usa el más nuevo; el dropdown de cada línea del panel
  // ofrece el resto.
  function aniosDisponiblesDe(clubId){
    var gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    var years = gd ? Object.keys(gd.revenueLinesByYear || {}).map(Number) : [];
    return years.sort(function(a, b){ return b - a; });
  }
  // "2024/2025", salvo ejercicio calendario: mismo criterio que seasonLabel() en js/cuenta.js, duplicado a propósito (son 2 líneas).
  function temporadaLabel(clubId, year){
    return (window.esEjercicioCalendario ? window.esEjercicioCalendario(clubId, year) : clubDe(clubId).fiscalYearStart === '01-01') ? String(year) : (year - 1) + '/' + year;
  }

  // Como show(), pero además calcula las filas simuladas. `clubes` es [{clubId, clubYear}]; un club sin ingreso calculable para ese
  // año no entra, sin romper a los demás.
  function showConSimulados(leagueId, year, clubes){
    return cargarLiga(leagueId).then(function(){
      st.league = leagueId;
      st.year = (year != null && rankingDe(leagueId, year)) ? Number(year) : anioPorDefecto(leagueId);
      pendingSim = [];
      buscadorQ = '';
      st.simulados = (clubes || []).map(function(c){
        var fila = filaSimulada(c.clubId, c.clubYear);
        // Un año de margen bruto entra con su ingreso estimado, no con el margen (sin desglose por rubro).
        if(fila && c.revenue != null){ fila.revenue = c.revenue; fila.mix = []; fila.incluidos = []; fila.estimado = true; }
        return fila ? { clubId:c.clubId, clubYear:c.clubYear, fila:fila } : null;
      }).filter(Boolean);
      render();
      // Avisa a index.html para que guarde la búsqueda en Mi Cuenta: este módulo no sabe de Supabase.
      if(st.simulados.length) api.onSimulado(leagueId, st.year, st.simulados.map(function(s){
        return { club:s.clubId, clubYear:s.clubYear };
      }));
    });
  }

  // Atajo de 1 solo club (Finanzas, y el dropdown de liga mientras se simula).
  function showConSimulado(leagueId, year, clubId, clubYear){
    return showConSimulados(leagueId, year, [{ clubId:clubId, clubYear:clubYear }]);
  }

  // Sumar un club desde la pestaña: a diferencia del camino de Finanzas, el club no está cargado y hay que bajar su data file
  // (loadClubData(), de index.html) antes de calcular.
  function agregarSimulado(clubId, year){
    if(st.simulados.some(function(s){ return s.clubId === clubId; })) return Promise.resolve();
    var cargar = (typeof loadClubData === 'function') ? loadClubData(clubId) : Promise.resolve();
    return Promise.resolve(cargar).then(function(){
      var yy = year != null ? year : aniosDisponiblesDe(clubId)[0];
      var fila = (yy != null) ? filaSimulada(clubId, yy) : null;
      if(!fila){ render(); return; }
      st.simulados.push({ clubId:clubId, clubYear:yy, fila:fila });
      render();
      api.onSimulado(st.league, st.year, st.simulados.map(function(s){
        return { club:s.clubId, clubYear:s.clubYear };
      }));
    }).catch(function(err){
      console.error('[liga] no se pudo sumar el club a la simulación:', clubId, err);
      render();
    });
  }
  function quitarUnSimulado(clubId){
    st.simulados = st.simulados.filter(function(s){ return s.clubId !== clubId; });
    render();
  }
  // Cambiar el ejercicio de UN club ya simulado: ya está cargado, así que recalcular es sincrónico.
  function cambiarAnioSimulado(clubId, newYear){
    var i = -1;
    for(var k = 0; k < st.simulados.length; k++){ if(st.simulados[k].clubId === clubId) i = k; }
    if(i < 0) return;
    var fila = filaSimulada(clubId, newYear);
    if(!fila) return;
    st.simulados[i] = { clubId:clubId, clubYear:newYear, fila:fila };
    render();
    api.onSimulado(st.league, st.year, st.simulados.map(function(s){
      return { club:s.clubId, clubYear:s.clubYear };
    }));
  }

  // Sumar una liga entera: no hace falta loadClubData(), data/rankings/<liga>.js ya trae cada fila calculada (mismo shape que
  // filaSimulada()). Un club que ya está en el ranking real o ya simulado no se duplica.
  function agregarLigaCompleta(leagueId, year){
    return loadRanking(leagueId).then(function(){
      var yy = (year != null && rankingDe(leagueId, year)) ? Number(year) : anioPorDefecto(leagueId);
      var origen = rankingDe(leagueId, yy);
      if(!origen) return;
      var actual = rankingDe(st.league, st.year);
      var yaEstan = {};
      (actual ? actual.clubs : []).forEach(function(f){ yaEstan[f.id] = true; });
      st.simulados.forEach(function(s){ yaEstan[s.clubId] = true; });
      origen.clubs.forEach(function(f){
        if(yaEstan[f.id]) return;
        yaEstan[f.id] = true;
        st.simulados.push({ clubId:f.id, clubYear:yy,
          fila:{ id:f.id, revenue:f.revenue, reportType:f.reportType, sourceId:f.sourceId, mix:f.mix, year:yy, simulado:true } });
      });
      render();
      if(st.simulados.length) api.onSimulado(st.league, st.year, st.simulados.map(function(s){
        return { club:s.clubId, clubYear:s.clubYear };
      }));
    });
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  // Cada repintado avisa (api.onEstado): index.html escribe la liga y el ejercicio en la URL.
  function render(){ pintar(); api.onEstado(); }
  function pintar(){
    var wrap = $('ligaWrap');
    if(!wrap) return;
    wrap.innerHTML = '';
    if(!st.league){ wrap.appendChild(estadoFrio()); return; }

    var r = rankingDe(st.league, st.year);
    wrap.appendChild(botonVolver());
    if(!r){
      wrap.appendChild(el('p', 'liga-vacio', t('liga.nodata',
        'Todavía no hay ningún ejercicio cargado de esta liga.')));
      return;
    }

    wrap.appendChild(encabezado(r));
    // Quién auditó a la entidad que organiza la liga, si su balance de ese ejercicio está cargado (js/auditoria.js).
    var cuentasLiga = window.FIN_AUDITORIA && FIN_AUDITORIA.cardLiga ? FIN_AUDITORIA.cardLiga(st.league, st.year) : null;
    if(cuentasLiga) wrap.appendChild(cuentasLiga);
    var filasSim = st.simulados.map(function(s){ return s.fila; });
    // Una liga-año sin ningún club con ingreso real (todos los cargados publican solo el margen bruto) no tiene un total por categoría: la tarjeta diría «0 de N clubes, US$ 0 M».
    if(r.clubs.length) wrap.appendChild(consolidado(r, filasSim));
    var grilla = el('div', 'lg-grilla');
    grilla.appendChild(rankingCard(r, filasSim));
    var der = el('div', 'lg-col');
    der.appendChild(composicion(r, filasSim));
    der.appendChild(panelSimulacion(r));
    grilla.appendChild(der);
    wrap.appendChild(grilla);
    var inf = informes(st.league);
    if(inf) wrap.appendChild(inf);
    wrap.appendChild(salvedades(r));
  }

  // INFORMES DE ESTA LIGA: una lista de lectura (data/informes.js), no datos: ningún número de acá entra en un ranking. Los informes que
  // cubren varias ligas de Europa van arriba; después, los de esta liga. Cada tarjeta lleva una cifra con su fuente y el link al original.
  function informes(leagueId){
    var todos = window.INFORMES || [];
    var pais = (window.COUNTRIES || {})[ligaDe(leagueId).country] || {};
    var lista = todos.filter(function(i){ return i.ambito === 'europa' ? pais.region === 'europa' : (i.ligas || []).indexOf(leagueId) >= 0; })
      .sort(function(a, b){ return (a.ambito === 'europa' ? 0 : 1) - (b.ambito === 'europa' ? 0 : 1); });
    if(!lista.length) return null;
    var lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    function txt(o){ return o[lang] || o.es; }
    var caja = el('section', 'lg-informes');
    caja.appendChild(el('h2', 'lg-card-h', t('liga.inf.title', 'Informes de esta liga')));
    caja.appendChild(el('p', 'lg-card-sub', t('liga.inf.sub', 'Lecturas de terceros que cubren esta liga. Los números son de cada informe, no de los clubes cargados en el sitio.')));
    var grilla = el('div', 'lg-inf-grilla');
    lista.forEach(function(i){
      var c = el('article', 'lg-inf');
      var top = el('div', 'lg-inf-top');
      top.appendChild(el('span', 'lg-inf-ambito', i.ambito === 'europa' ? t('liga.inf.europa', 'Europa') : ligaDe(leagueId).name));
      if(i.cifra && i.cifra.borrador) top.appendChild(el('span', 'lg-inf-borrador', t('liga.inf.borrador', 'borrador')));
      c.appendChild(top);
      c.appendChild(el('h3', 'lg-inf-t', i.titulo));
      c.appendChild(el('p', 'lg-inf-ed', i.editor + ' · ' + i.anio));
      c.appendChild(el('p', 'lg-inf-cubre', txt(i.cubre)));
      c.appendChild(el('p', 'lg-inf-frase', txt(i.frase)));
      if(i.cifra){
        var f = el('p', 'lg-inf-cifra');
        f.appendChild(el('strong', null, txt(i.cifra)));
        f.appendChild(el('span', 'lg-inf-fuente', i.cifra.fuente));
        c.appendChild(f);
      }
      var a = el('a', 'lg-inf-link', i.urlTipo === 'pdf' ? t('liga.inf.pdf', 'Leer el PDF original →') : t('liga.inf.pagina', 'Ver el informe original →'));
      a.href = i.url; a.target = '_blank'; a.rel = 'noopener';
      c.appendChild(a);
      grilla.appendChild(c);
    });
    caja.appendChild(grilla);
    return caja;
  }

  // LA POSICIÓN ES SOLO ENTRE LOS CLUBES CARGADOS, nunca "de los leagueSize reales": no hay forma de saber dónde quedaría contra un
  // club que el sitio no tiene.
  // EL PANEL DE SIMULACIÓN, siempre visible en una liga: primero el buscador de "sumar un club"; si hay algo simulado, una línea
  // por club con su posición, la salvedad, el dropdown de liga y "Quitar todas".
  function panelSimulacion(r){
    var caja = el('article', 'vid-card liga-sim-panel');
    caja.appendChild(el('h2', 'lg-card-h', t('liga.sim.title', '¿Dónde quedaría otro club?')));
    caja.appendChild(el('p', 'lg-card-sub', t('liga.sim.sub',
      'Sumá un club o una liga entera a este ranking, solo por ingresos. No cambia los números reales.')));
    caja.appendChild(buscadorAgregarClub());
    if(!st.simulados.length) return caja;

    // Su propia caja ámbar: "hay una simulación activa" no va con el mismo peso visual que el buscador.
    var activa = el('div', 'liga-sim-activa');
    var filas = filasConSimulado(r, st.simulados.map(function(s){ return s.fila; }));
    var n = filas.length;
    st.simulados.forEach(function(sim){
      var pos = filas.indexOf(sim.fila) + 1;
      var linea = el('div', 'liga-sim-linea');
      var texto = el('span', 'liga-sim-texto');
      texto.appendChild(document.createTextNode(nombreDe(sim.clubId) + ' ('));
      // El año es un dropdown solo si el club tiene más de un ejercicio cargado.
      var years = aniosDisponiblesDe(sim.clubId);
      if(years.length > 1){
        var selAnio = document.createElement('select');
        selAnio.className = 'liga-sim-anio-club';
        years.forEach(function(y){
          var o = document.createElement('option');
          o.value = y;
          o.textContent = temporadaLabel(sim.clubId, y);
          if(y === sim.clubYear) o.selected = true;
          selAnio.appendChild(o);
        });
        selAnio.addEventListener('change', function(){ cambiarAnioSimulado(sim.clubId, Number(selAnio.value)); });
        texto.appendChild(selAnio);
      } else {
        texto.appendChild(document.createTextNode(etiquetaEjercicio(sim.fila, sim.clubYear)));
      }
      texto.appendChild(document.createTextNode('): '
        + t('liga.sim.con', 'con') + ' ' + fmtM(sim.fila.revenue) + ', '
        + t('liga.sim.seria', 'sería el') + ' ' + pos + '° ' + t('liga.sim.de', 'de') + ' ' + n + '.'));
      linea.appendChild(texto);
      var quitarUno = el('button', 'liga-sim-quitar-uno', '✕');
      quitarUno.type = 'button';
      quitarUno.title = t('liga.sim.quitarUno', 'Sacar este club de la simulación');
      quitarUno.addEventListener('click', function(){ quitarUnSimulado(sim.clubId); });
      linea.appendChild(quitarUno);
      activa.appendChild(linea);
    });
    activa.appendChild(el('p', 'liga-sim-chico', t('liga.sim.caveat',
      'Solo por ingresos, comparado contra los clubes con ejercicio cargado en el sitio. No es una posición en la tabla real, no hay puntos ni fixture de por medio.')));

    var fila = el('div', 'liga-sim-fila');
    fila.appendChild(selectorDeLigaSimulada());
    var quitarTodas = el('button', 'liga-sim-quitar',
      t(st.simulados.length > 1 ? 'liga.sim.quitarTodas' : 'liga.sim.quitar',
        st.simulados.length > 1 ? '✕ Quitar todas las simulaciones' : '✕ Quitar simulación'));
    quitarTodas.type = 'button';
    quitarTodas.addEventListener('click', function(){ st.simulados = []; render(); });
    fila.appendChild(quitarTodas);
    activa.appendChild(fila);
    caja.appendChild(activa);
    return caja;
  }

  // El buscador de "sumar un club": propio de esta pantalla (no reusa el modal de js/selector.js), filtra `clubs` (eager).
  // pintarResultados() repinta SOLO la lista en cada tecla: si repintara todo con render(), el input perdería el foco.
  function buscadorAgregarClub(){
    var caja = el('div', 'liga-sim-buscador');
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'liga-sim-input';
    input.placeholder = t('liga.sim.buscarPlaceholder', 'Sumar un club o una liga entera a este ranking…');
    input.value = buscadorQ;
    var resultados = el('div', 'liga-sim-resultados');

    function pintarResultados(){
      resultados.innerHTML = '';
      var q = norm(buscadorQ);
      if(q.length < 2) return;
      var yaEstan = {};
      st.simulados.forEach(function(s){ yaEstan[s.clubId] = true; });
      var candidatos = Object.keys(typeof clubs !== 'undefined' ? clubs : {}).filter(function(id){
        if(yaEstan[id]) return false;
        return (window.nombresClub ? window.nombresClub(id) : [nombreDe(id)]).some(function(n){ return norm(n).indexOf(q) >= 0; });
      }).sort(function(a, b){ return nombreDe(a).localeCompare(nombreDe(b), 'es'); }).slice(0, 8);
      candidatos.forEach(function(id){
        var co = window.COUNTRIES && window.COUNTRIES[window.nationOf(id)];
        var b = el('button', 'liga-sim-resultado',
          (co && co.flag ? co.flag + ' ' : '') + nombreDe(id));
        b.type = 'button';
        b.addEventListener('click', function(){ buscadorQ = ''; agregarSimulado(id, null); });
        resultados.appendChild(b);
      });
      // Ligas enteras en el mismo buscador, sin la que se está mirando.
      var candidatosLigas = Object.keys(window.LEAGUES || {}).filter(function(lid){
        return lid !== st.league && norm(ligaDe(lid).name).indexOf(q) >= 0;
      }).sort(function(a, b){ return ligaDe(a).name.localeCompare(ligaDe(b).name, 'es'); }).slice(0, 4);
      candidatosLigas.forEach(function(lid){
        var co = paisDe(lid);
        var b = el('button', 'liga-sim-resultado liga-sim-resultado-liga',
          (co.flag || '🏆') + ' ' + ligaDe(lid).name + ' · ' + t('liga.sim.ligaCompleta', 'liga completa'));
        b.type = 'button';
        b.addEventListener('click', function(){ buscadorQ = ''; agregarLigaCompleta(lid, null); });
        resultados.appendChild(b);
      });
      if(!candidatos.length && !candidatosLigas.length){
        resultados.appendChild(el('p', 'liga-sim-sinresultados', t('liga.sim.sinresultados', 'Ningún club o liga coincide.')));
      }
    }
    input.addEventListener('input', function(){ buscadorQ = input.value; pintarResultados(); });
    caja.appendChild(input);
    caja.appendChild(resultados);
    pintarResultados();
    return caja;
  }

  // El dropdown de liga: mismo agrupado por continente que estadoFrio(). Cambiar de liga recalcula la simulación para LOS MISMOS
  // clubes, no los descarta.
  function selectorDeLigaSimulada(){
    var caja = el('label', 'liga-sim-liga');
    caja.appendChild(el('span', 'liga-sim-liga-l', t('liga.sim.probarOtra', 'Probar en otra liga')));
    var sel = el('select');
    (window.REGIONS || []).forEach(function(reg){
      var paises = paisesDeRegionAlfa(reg.id).filter(function(cid){ return ligasDePaisAlfa(cid).length; });
      if(!paises.length) return;
      var grp = document.createElement('optgroup');
      grp.label = t(reg.key, reg.name);
      paises.forEach(function(cid){
        ligasDePaisAlfa(cid).forEach(function(lid){
          var lg = ligaDe(lid), co = paisDe(lid);
          var o = document.createElement('option');
          o.value = lid;
          o.textContent = (co.flag || '🏆') + ' ' + lg.name + ' · ' + (co.key ? t(co.key, co.name) : '');
          if(lid === st.league) o.selected = true;
          grp.appendChild(o);
        });
      });
      sel.appendChild(grp);
    });
    sel.addEventListener('change', function(){
      var clubes = st.simulados.map(function(s){ return { clubId:s.clubId, clubYear:s.clubYear }; });
      showConSimulados(sel.value, null, clubes);
    });
    caja.appendChild(sel);
    return caja;
  }

  // EL ESTADO FRÍO: en vez de una pantalla vacía, las ligas que existen (LEAGUES es eager: cero pedidos de red). Agrupado por
  // continente en el orden editorial de REGIONS; dentro de cada card, país alfabético.
  function paisesDeRegionAlfa(regionId){
    return Object.keys(window.COUNTRIES || {})
      .filter(function(cid){ return window.COUNTRIES[cid].region === regionId; })
      .sort(function(a, b){
        var A = window.COUNTRIES[a], B = window.COUNTRIES[b];
        return t(A.key, A.name).localeCompare(t(B.key, B.name), 'es', {sensitivity:'base'});
      });
  }
  // Ligas de un país por división (`tier`, 1 = primera), no alfabéticas; el nombre desempata.
  function ligasDePaisAlfa(cid){
    return Object.keys(window.LEAGUES || {})
      .filter(function(lid){ return window.LEAGUES[lid].country === cid; })
      .sort(function(a, b){
        return ((ligaDe(a).tier ?? 99) - (ligaDe(b).tier ?? 99)) // sin tier (estaduales) al final
          || ligaDe(a).name.localeCompare(ligaDe(b).name, 'es', {sensitivity:'base'});
      });
  }
  // EL ESTADO FRÍO: un buscador (liga o país), los filtros de deporte, región e informes, y las ligas agrupadas por país, por deporte o por
  // nivel. Solo las ligas con datos se pueden elegir; las demás quedan al final, plegadas. La lista no muestra cuánto hay cargado ni plata:
  // el índice (data/rankings/_regiones.js) solo dice qué ligas tienen datos. Los filtros viven en la URL (LIGA_VIEW.current().filtros).
  // Los niveles se comparan solo dentro de un país y un deporte: nunca se ordenan ligas de países distintos por nivel.
  // `pais`: los países que el visitante abrió o cerró a mano ({cid: true/false}), y `sinDatos`, el plegable de las ligas sin datos. Viven en
  // memoria mientras dura la visita: volver con atrás desde una liga redibuja la lista como se dejó (la guía de UX, punto 6).
  var frio = { q:'', region:null, deporte:null, agrupar:'pais', orden:'az', informes:false, abiertos:null, pais:{}, sinDatos:false };
  var FRIO_AGRUPAR = ['pais', 'deporte', 'nivel'], FRIO_ORDEN = ['az', 'ligas'];
  function conDatos(lid){ return !!(window.RANKINGS_INDICE || {})[lid]; }
  // Informes propios de la liga (los de toda Europa no cuentan: cubren todas las ligas y no distinguen). Ver `informes()`.
  function informesPropios(lid){
    return (window.INFORMES || []).filter(function(i){ return i.ambito !== 'europa' && (i.ligas || []).indexOf(lid) >= 0; }).length;
  }
  function nivelTxt(lid){
    var n = ligaDe(lid).tier;
    if(n == null) return '—';
    if(document.documentElement.lang === 'en') return n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');
    return n + '.ª';
  }
  function nombrePais(cid){ var co = (window.COUNTRIES || {})[cid] || {}; return t(co.key, co.name || cid); }
  function ligasDelCatalogo(){ return Object.keys(window.LEAGUES || {}); }
  function deportesConDatos(){
    var vistos = {};
    ligasDelCatalogo().forEach(function(lid){ if(conDatos(lid)) vistos[ligaDe(lid).sport] = true; });
    return (window.SPORTS || []).filter(function(s){ return vistos[s.id]; });
  }
  // Las ligas que pasan los filtros, sin separar las que tienen datos de las que no.
  function ligasFiltradas(){
    var q = norm(frio.q.trim());
    return ligasDelCatalogo().filter(function(lid){
      var lg = ligaDe(lid), co = paisDe(lid);
      if(frio.region && co.region !== frio.region) return false;
      if(frio.deporte && lg.sport !== frio.deporte) return false;
      if(frio.informes && !informesPropios(lid)) return false;
      return !q || norm(lg.name).indexOf(q) >= 0 || norm(nombrePais(lg.country)).indexOf(q) >= 0;
    });
  }
  function porTier(a, b){
    return ((ligaDe(a).tier == null ? 99 : ligaDe(a).tier) - (ligaDe(b).tier == null ? 99 : ligaDe(b).tier)) // sin tier (estaduales) al final
      || ligaDe(a).name.localeCompare(ligaDe(b).name, 'es', {sensitivity:'base'});
  }
  // [{ cid, nombre, ligas:[lid…] }] ordenado por nombre o por cantidad de ligas.
  function agruparPorPais(lids){
    var m = {};
    lids.forEach(function(lid){ var c = ligaDe(lid).country; (m[c] = m[c] || { cid:c, nombre:nombrePais(c), ligas:[] }).ligas.push(lid); });
    var arr = Object.keys(m).map(function(c){ m[c].ligas.sort(porTier); return m[c]; });
    arr.sort(function(a, b){
      return (frio.orden === 'ligas' ? b.ligas.length - a.ligas.length : 0) || a.nombre.localeCompare(b.nombre, 'es', {sensitivity:'base'});
    });
    return arr;
  }
  function filaLiga(lid, conDeporte){
    var lg = ligaDe(lid);
    var b = el('button', 'lg-lrow');
    b.type = 'button';
    b.appendChild(el('span', 'lg-niv', nivelTxt(lid)));
    var n = el('span', 'lg-lrow-n');
    n.appendChild(document.createTextNode(lg.name));
    var ni = informesPropios(lid);
    if(ni) n.appendChild(el('span', 'lg-insig', ni + ' ' + (ni === 1 ? t('liga.inf.uno', 'informe') : t('liga.inf.varios', 'informes'))));
    if(conDeporte) n.appendChild(el('small', null, deporteNombre(lg.sport)));
    b.appendChild(n);
    b.title = t('liga.nivelEn', 'Nivel dentro de') + ' ' + nombrePais(lg.country) + ' · ' + deporteNombre(lg.sport);
    // Modo simulación: si hay clubes esperando destino, la lista usa la liga elegida como destino en vez de navegar.
    b.addEventListener('click', function(){
      if(pendingSim.length) showConSimulados(lid, null, pendingSim);
      else show(lid);
    });
    return b;
  }
  function vistaPais(lids){
    var frag = document.createDocumentFragment();
    var grupos = agruparPorPais(lids);
    grupos.forEach(function(g, i){
      var det = el('details', 'lg-pais2');
      var abierto = g.cid in frio.pais ? frio.pais[g.cid]
        : frio.abiertos === 'todos' ? true : frio.abiertos === 'ninguno' ? false : (frio.q.trim() ? true : i < 2);
      if(abierto) det.open = true;
      var sum = el('summary');
      // El click llega antes de que el <details> cambie: lo que queda es lo contrario de lo que hay.
      sum.addEventListener('click', function(){ frio.pais[g.cid] = !det.open; });
      sum.appendChild(el('span', 'lg-flag', ((window.COUNTRIES || {})[g.cid] || {}).flag || ''));
      sum.appendChild(el('span', 'lg-pais2-n', g.nombre));
      sum.appendChild(el('span', 'lg-pais2-r', g.ligas.length + ' ' + (g.ligas.length === 1 ? t('liga.una', 'liga') : t('liga.varias', 'ligas'))));
      det.appendChild(sum);
      var cuerpo = el('div', 'lg-pais2-c');
      var deportes = [];
      g.ligas.forEach(function(lid){ if(deportes.indexOf(ligaDe(lid).sport) < 0) deportes.push(ligaDe(lid).sport); });
      deportes.forEach(function(sp){
        if(deportes.length > 1) cuerpo.appendChild(el('div', 'lg-dep', deporteNombre(sp)));
        g.ligas.filter(function(lid){ return ligaDe(lid).sport === sp; }).forEach(function(lid){ cuerpo.appendChild(filaLiga(lid, false)); });
      });
      det.appendChild(cuerpo);
      frag.appendChild(det);
    });
    return frag;
  }
  function vistaDeporte(lids){
    var frag = document.createDocumentFragment();
    (window.SPORTS || []).forEach(function(sp){
      var ls = lids.filter(function(lid){ return ligaDe(lid).sport === sp.id; });
      if(!ls.length) return;
      var grupos = agruparPorPais(ls);
      var card = el('section', 'lg-dcard');
      var h = el('div', 'lg-dhead');
      h.appendChild(el('h3', null, deporteNombre(sp.id)));
      h.appendChild(el('span', null, ls.length + ' ' + (ls.length === 1 ? t('liga.una', 'liga') : t('liga.varias', 'ligas')) + ' · '
        + grupos.length + ' ' + (grupos.length === 1 ? t('liga.pais1', 'país') : t('liga.paisN', 'países'))));
      card.appendChild(h);
      grupos.forEach(function(g){
        var f = el('div', 'lg-dpais');
        f.appendChild(el('span', 'lg-dpais-n', (((window.COUNTRIES || {})[g.cid] || {}).flag || '') + ' ' + g.nombre));
        var ch = el('div', 'lg-pais-ligas');
        g.ligas.forEach(function(lid){ ch.appendChild(botonLiga(lid)); });
        f.appendChild(ch);
        card.appendChild(f);
      });
      frag.appendChild(card);
    });
    return frag;
  }
  // La matriz de UN deporte: filas, países; columnas, niveles. Las ligas sin nivel (estaduales) van en una columna aparte.
  function vistaNivel(lids){
    var frag = document.createDocumentFragment();
    var sp = frio.deporte || 'futbol';
    var ls = lids.filter(function(lid){ return ligaDe(lid).sport === sp; });
    if(!frio.deporte) frag.appendChild(el('p', 'lg-nota', t('liga.nivel.uno', 'Los niveles solo se comparan dentro de un deporte: se muestra') + ' ' + deporteNombre(sp) + '.'));
    if(!ls.length) return frag;
    var max = 1, sinNivel = false;
    ls.forEach(function(lid){ var n = ligaDe(lid).tier; if(n == null) sinNivel = true; else if(n > max) max = n; });
    var caja = el('div', 'lg-mat');
    var tabla = document.createElement('table');
    var tr = document.createElement('tr');
    var th = document.createElement('th'); th.textContent = t('liga.f.pais', 'País'); tr.appendChild(th);
    for(var n = 1; n <= max; n++){ th = document.createElement('th'); th.textContent = t('liga.nivel', 'Nivel') + ' ' + n; tr.appendChild(th); }
    if(sinNivel){ th = document.createElement('th'); th.textContent = t('liga.sinNivel', 'Sin nivel'); tr.appendChild(th); }
    var thead = document.createElement('thead'); thead.appendChild(tr); tabla.appendChild(thead);
    var tbody = document.createElement('tbody');
    agruparPorPais(ls).forEach(function(g){
      var fila = document.createElement('tr');
      var c0 = document.createElement('th');
      c0.textContent = (((window.COUNTRIES || {})[g.cid] || {}).flag || '') + ' ' + g.nombre;
      fila.appendChild(c0);
      for(var k = 1; k <= max + (sinNivel ? 1 : 0); k++){
        var td = document.createElement('td');
        g.ligas.filter(function(lid){ var tn = ligaDe(lid).tier; return k <= max ? tn === k : tn == null; })
          .forEach(function(lid){ td.appendChild(botonLiga(lid)); });
        if(!td.children.length){ td.className = 'vacio'; td.textContent = '—'; }
        fila.appendChild(td);
      }
      tbody.appendChild(fila);
    });
    tabla.appendChild(tbody);
    caja.appendChild(tabla);
    frag.appendChild(caja);
    frag.appendChild(el('p', 'lg-nota', t('liga.nivel.nota', 'Un nivel 2 de un país no equivale al de otro: los niveles se comparan solo dentro de un país y un deporte.')));
    return frag;
  }
  // La pastilla de una liga con datos: solo el nombre (las vistas por deporte y por nivel).
  function botonLiga(lid){
    var b = el('button', 'lg-liga');
    b.type = 'button';
    b.appendChild(el('span', 'lg-liga-n', ligaDe(lid).name));
    var ni = informesPropios(lid);
    if(ni) b.appendChild(el('span', 'lg-insig', String(ni)));
    b.addEventListener('click', function(){
      if(pendingSim.length) showConSimulados(lid, null, pendingSim);
      else show(lid);
    });
    return b;
  }
  // Hasta 3 nombres unidos con "+"; más, los 2 primeros + "N más" (mismo criterio que resumenDe() en js/selector.js).
  function nombresLista(ids){
    var nombres = ids.map(nombreDe);
    if(nombres.length <= 3) return nombres.join(' + ');
    return nombres.slice(0, 2).join(' + ') + ' + ' + (nombres.length - 2) + ' ' + t('liga.sim.mas', 'más');
  }
  function estadoFrio(){
    var caja = el('div', 'lg-frio');
    if(pendingSim.length){
      var aviso = el('div', 'lg-frio-sim');
      aviso.appendChild(el('p', null, t('liga.sim.pick', 'Elegí la liga donde querés ver a') + ' '
        + nombresLista(pendingSim.map(function(s){ return s.clubId; }))));
      var cancelar = el('button', 'liga-sim-cancelar', t('liga.sim.cancelar', 'Cancelar'));
      cancelar.type = 'button';
      cancelar.addEventListener('click', function(){ pendingSim = []; render(); });
      aviso.appendChild(cancelar);
      caja.appendChild(aviso);
    }
    var barra = el('div', 'lg-frio-barra');
    var campo = el('div', 'lg-buscar');
    campo.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>';
    var input = document.createElement('input');
    input.type = 'search';
    input.value = frio.q;
    input.placeholder = t('liga.search', 'Buscá una liga o un país: Brasil, Serie A…');
    input.setAttribute('aria-label', t('liga.searchAria', 'Buscar una liga o un país'));
    campo.appendChild(input);
    barra.appendChild(campo);
    caja.appendChild(barra);
    var filtros = el('div', 'lg-filtros');
    caja.appendChild(filtros);
    var cuenta = el('div', 'lg-cuenta');
    caja.appendChild(cuenta);
    var lista = el('div', 'lg-frio-lista');
    caja.appendChild(lista);

    // Una fila de pastillas: [{ id, nombre, n? }]; `clave` es la propiedad de `frio` que cambia.
    function fila(titulo, items, clave){
      var f = el('div', 'lg-ffila');
      f.appendChild(el('span', 'lg-ffila-l', titulo));
      var g = el('div', 'lg-regiones');
      g.setAttribute('role', 'group');
      g.setAttribute('aria-label', titulo);
      items.forEach(function(x){
        var on = frio[clave] === x.id;
        var b = el('button', 'lg-region' + (on ? ' activa' : ''));
        b.type = 'button';
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.appendChild(document.createTextNode(x.nombre));
        if(x.n != null) b.appendChild(el('span', 'lg-region-n', ' ' + x.n));
        b.addEventListener('click', function(){
          frio[clave] = x.id;
          if(clave !== 'q') frio.abiertos = null;
          pintarFiltros(); pintarLista(); api.onEstado();
        });
        g.appendChild(b);
      });
      f.appendChild(g);
      return f;
    }
    function pintarFiltros(){
      filtros.innerHTML = '';
      var conD = ligasDelCatalogo().filter(conDatos);
      var deportes = deportesConDatos();
      if(deportes.length > 1){
        filtros.appendChild(fila(t('liga.f.deporte', 'Deporte'), [{ id:null, nombre:t('liga.all.m', 'Todos'), n:conD.length }]
          .concat(deportes.map(function(s){ return { id:s.id, nombre:t(s.key, s.name), n:conD.filter(function(l){ return ligaDe(l).sport === s.id; }).length }; })), 'deporte'));
      }
      var regs = [{ id:null, nombre:t('liga.all', 'Todas'), n:conD.length }];
      (window.REGIONS || []).forEach(function(reg){
        var n = conD.filter(function(l){ return paisDe(l).region === reg.id; }).length;
        if(n) regs.push({ id:reg.id, nombre:t(reg.key, reg.name), n:n });
      });
      filtros.appendChild(fila(t('liga.f.region', 'Región'), regs, 'region'));
      filtros.appendChild(fila(t('liga.f.agrupar', 'Agrupar por'), [{ id:'pais', nombre:t('liga.f.pais', 'País') }, { id:'deporte', nombre:t('liga.f.dep', 'Deporte') }, { id:'nivel', nombre:t('liga.nivel', 'Nivel') }], 'agrupar'));
      filtros.appendChild(fila(t('liga.f.orden', 'Ordenar'), [{ id:'az', nombre:t('liga.f.az', 'A–Z') }, { id:'ligas', nombre:t('liga.f.mas', 'Más ligas') }], 'orden'));
      var extra = el('div', 'lg-ffila');
      extra.appendChild(el('span', 'lg-ffila-l', t('liga.f.mostrar', 'Mostrar')));
      var g = el('div', 'lg-regiones');
      var b = el('button', 'lg-region' + (frio.informes ? ' activa' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', frio.informes ? 'true' : 'false');
      b.appendChild(document.createTextNode(t('liga.f.informes', 'Con informes')));
      b.addEventListener('click', function(){ frio.informes = !frio.informes; frio.abiertos = null; pintarFiltros(); pintarLista(); api.onEstado(); });
      g.appendChild(b);
      extra.appendChild(g);
      filtros.appendChild(extra);
    }
    // Pinta SOLO la lista: si repintara todo, el input perdería el foco en cada tecla.
    function pintarLista(){
      lista.innerHTML = '';
      cuenta.innerHTML = '';
      var todas = ligasFiltradas();
      var con = todas.filter(conDatos), sin = todas.filter(function(l){ return !conDatos(l); });
      var paises = {}; con.forEach(function(l){ paises[ligaDe(l).country] = true; });
      var np = Object.keys(paises).length;
      cuenta.appendChild(el('span', null, con.length + ' ' + (con.length === 1 ? t('liga.una', 'liga') : t('liga.varias', 'ligas')) + ' ' + t('liga.de', 'de') + ' '
        + np + ' ' + (np === 1 ? t('liga.pais1', 'país') : t('liga.paisN', 'países'))));
      if(frio.agrupar === 'pais' && con.length){
        var acc = el('span', 'lg-acc');
        [['todos', t('liga.abrir', 'Abrir todos')], ['ninguno', t('liga.cerrar', 'Cerrar todos')]].forEach(function(x){
          var bt = el('button', null, x[1]);
          bt.type = 'button';
          bt.addEventListener('click', function(){ frio.abiertos = x[0]; frio.pais = {}; pintarLista(); });
          acc.appendChild(bt);
        });
        cuenta.appendChild(acc);
      }
      if(!con.length) lista.appendChild(el('p', 'lg-frio-nada', t('liga.sim.sinresultados', 'Ningún club o liga coincide.')));
      else lista.appendChild(frio.agrupar === 'deporte' ? vistaDeporte(con) : frio.agrupar === 'nivel' ? vistaNivel(con) : vistaPais(con));
      if(sin.length){
        var det = el('details', 'lg-sindatos');
        if(frio.sinDatos) det.open = true;
        var sumSin = el('summary', null, sin.length + ' ' + t('liga.noDataYet', 'ligas sin datos todavía'));
        sumSin.addEventListener('click', function(){ frio.sinDatos = !det.open; });
        det.appendChild(sumSin);
        det.appendChild(el('p', null, sin.map(function(lid){ return nombrePais(ligaDe(lid).country) + ': ' + ligaDe(lid).name; }).join(' · ')));
        lista.appendChild(det);
      }
    }
    input.addEventListener('input', function(){ frio.q = input.value; pintarLista(); });
    // El índice es chico y se baja una sola vez; mientras tanto se dibuja la lista sin saber qué ligas tienen datos.
    pintarFiltros(); pintarLista();
    if(!window.RANKINGS_INDICE) loadRanking('_regiones').then(function(){ if(caja.isConnected){ pintarFiltros(); pintarLista(); } });
    return caja;
  }

  // EL BOTÓN DE VOLVER a la grilla de ligas.
  function botonVolver(){
    var b = el('button', 'liga-volver', '← ' + t('liga.back', 'Todas las ligas'));
    b.type = 'button';
    b.addEventListener('click', function(){
      // Con una simulación activa, volver deja elegir OTRA liga para LOS MISMOS clubes en vez de resetear todo.
      var sims = st.simulados;
      st.league = null; st.year = null; st.simulados = [];
      pendingSim = sims.map(function(s){ return { clubId:s.clubId, clubYear:s.clubYear }; });
      render();
    });
    return b;
  }

  // La marca COVID de una temporada: todos los clubes de su ranking cierran dentro de la ventana (esCovidPares(), js/finanzas-calc.js).
  function covidTemporada(leagueId, y){
    var r = rankingDe(leagueId, y);
    return !!(r && window.esCovidPares && esCovidPares((r.clubs || []).map(function(c){ return [c.id, c.year || y]; })));
  }

  // EL ENCABEZADO: la liga como título; país, división y cobertura en una línea; los ejercicios como pastillas que dicen cuántos
  // clubes trae cada uno, para no elegir a ciegas.
  function encabezado(r){
    var caja = el('div', 'lg-head');
    var lg = ligaDe(st.league), co = paisDe(st.league);
    var txt = el('div', 'lg-head-txt');
    var h = el('h2', 'lg-h');
    h.appendChild(el('span', 'lg-flag', co.flag || ''));
    h.appendChild(document.createTextNode(lg.name));
    txt.appendChild(h);
    txt.appendChild(el('p', 'lg-sub', [co.key ? t(co.key, co.name) : '', window.tierLabel ? window.tierLabel(lg.tier) : '', deporteNombre(lg.sport)]
      .filter(Boolean).join(' · ')));
    caja.appendChild(txt);

    var anios = el('div', 'lg-anios');
    anios.appendChild(el('span', 'lg-anios-l', t('liga.year', 'Ejercicio')));
    var pills = el('div', 'lg-anios-p');
    aniosDe(st.league).forEach(function(y){
      var b = el('button', 'lg-region' + (y === st.year ? ' activa' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', y === st.year ? 'true' : 'false');
      b.appendChild(document.createTextNode(String(y)));
      b.addEventListener('click', function(){ st.year = y; render(); });
      // Una temporada de la pandemia lleva la marca COVID debajo de la pastilla, fuera del botón: no cambia su ancho y recibe foco sola.
      if(covidTemporada(st.league, y)){
        var c = el('span', 'lg-anio-covid');
        c.appendChild(b);
        c.insertAdjacentHTML('beforeend', marcaCovidHtml('s', true));
        pills.appendChild(c);
      } else pills.appendChild(b);
    });
    anios.appendChild(pills);
    caja.appendChild(anios);
    return caja;
  }

  // EL SALTO AL CLUB: la vista no conoce el nav ni sabe cargar un club, se lo pide al hook que le pasa index.html.
  var api = { pickClub: function(){ return Promise.resolve(); },
              goFinanzas: function(){}, goLiga: function(){},
              // Avisa que una simulación se armó de verdad (fila calculada); index.html la guarda en Mi Cuenta.
              onSimulado: function(){},
              // Avisa que cambió lo que se mira (liga, ejercicio o el estado frío); index.html lo escribe en la URL.
              onEstado: function(){} };
  function irAlClub(clubId){
    Promise.resolve(api.pickClub(clubId)).then(function(){ api.goFinanzas(); });
  }

  // EL RANKING: una fila por club con la barra en su color, y el total de los cargados. Un club simulado va en ámbar.
  function rankingCard(r, simulados){
    var card = el('article', 'vid-card lg-rank');
    var head = el('div', 'lg-card-head');
    head.appendChild(el('h2', 'lg-card-h', t('liga.revenue', 'Ingresos')));
    head.appendChild(el('span', 'lg-card-sub', t('liga.rankSub', 'En dólares · tocá un club para ver su ficha')));
    card.appendChild(head);
    // Los estimados van en la misma tabla, en su puesto por plata, con "(estimado)*" y la barra rayada: nunca se leen como un balance.
    var est = filasEstimadas(st.league, st.year);
    var filas = filasConSimulado(r, simulados).concat(est).sort(function(a, b){ return b.revenue - a.revenue; });
    var max = filas.reduce(function(m, f){ return Math.max(m, f.revenue); }, 0);
    var ol = el('ol', 'lg-filas');
    filas.forEach(function(f, i){
      var li = el('li', 'lg-fila' + (f.simulado ? ' simulada' : '') + (f.estimado ? ' estimada' : ''));
      var color = (f.id && clubDe(f.id).brandColor) || (f.estimado ? '#b9bec7' : 'var(--azul)');
      li.appendChild(el('span', 'vid-pos', String(i + 1)));
      var nom = el('div', 'lg-fila-nom');
      // Un club estimado que no está en el sitio no tiene ficha: va como texto, no como botón.
      var b = el(f.id ? 'button' : 'span', 'lg-club');
      if(f.id) b.type = 'button';
      var dot = el('span', 'vid-dot'); dot.style.background = color;
      b.appendChild(dot);
      b.appendChild(el('span', 'vid-nom-t', f.id ? nombreDe(f.id, st.year) : f.n));
      // Fuera del nombre: un nombre largo se recorta con "…", y la marca de estimado no se puede recortar nunca.
      if(f.estimado) b.appendChild(el('span', 'lg-est-tag', (f.ancla ? t('liga.est.tagAncla', '(informe siguiente)') : t('liga.est.tag', '(estimado)')) + '*'));
      if(f.id) b.addEventListener('click', function(){ irAlClub(f.id); });
      nom.appendChild(b);
      // Sin el documento debajo de cada club (está en su ficha y en Fuentes): en la fila queda demasiado texto junto. Un club simulado
      // sí lleva su marca: nadie lo puede leer como un club que juega ahí.
      if(f.simulado) nom.appendChild(el('span', 'lg-doc liga-sim-badge', t('liga.sim.tag', '(simulado)')));
      li.appendChild(nom);
      var barra = el('span', 'vid-barra');
      var lleno = el('span');
      if(f.estimado) lleno.style.background = 'repeating-linear-gradient(45deg,' + color + ' 0 4px,#ffffff 4px 7px)';
      else lleno.style.background = color;
      if(f.simulado) lleno.style.opacity = '.5';
      lleno.style.width = max > 0 ? Math.max(2, Math.round(f.revenue / max * 100)) + '%' : '0';
      barra.appendChild(lleno);
      li.appendChild(barra);
      var val = el('span', 'vid-val', (f.estimado && !f.ancla ? '≈ ' : '') + fmtCard(f.revenue));
      if(f.ancla) val.title = t('liga.est.ancla', 'Ingreso real de este ejercicio, tomado del informe del año siguiente (el de este año imprime solo el margen bruto).');
      else if(f.estimado) val.title = t('liga.est.range', 'Entre') + ' ' + fmtCard(f.lo) + ' ' + t('liga.est.and', 'y') + ' ' + fmtCard(f.hi)
        + ' ' + t('liga.est.range2', '(8 de cada 10 veces)') + ' · ' + t('liga.est.error', 'error típico') + ' ' + f.error + '%';
      li.appendChild(val);
      ol.appendChild(li);
    });
    card.appendChild(ol);
    // "Total de los N cargados", nunca "total de la liga", salvo que más de la mitad de la liga tenga balance real: ahí es el total de
    // la liga con los estimados, y lo dice.
    var pie = el('div', 'vid-card-pie');
    if(totalConEstimados(r, est)){
      var totEst = est.reduce(function(sum, f){ return sum + f.revenue; }, 0);
      pie.appendChild(el('span', null, t('liga.est.total', 'Total de la liga') + ' (' + r.clubs.length + ' '
        + t('liga.est.withBal', 'con balance') + ' + ' + est.length + ' ' + (est.length === 1 ? t('liga.est.one', 'estimado') : t('liga.est.many', 'estimados')) + '*)'));
      pie.appendChild(el('strong', 'lg-total', '≈ ' + fmtCard(totalDe(r) + totEst) + '*'));
    } else if(r.clubs.length){
      pie.appendChild(el('span', null, t('liga.total', 'Total de los') + ' ' + r.clubs.length + ' ' + t('liga.totalLoaded', 'cargados')));
      pie.appendChild(el('strong', 'lg-total', fmtCard(totalDe(r))));
    }
    if(pie.childNodes.length) card.appendChild(pie);
    if(est.length){
      card.appendChild(el('p', 'lg-est-nota', '* ' + t('liga.est.note',
        'Estimado: el club no tiene balance de este ejercicio en el sitio. El número es una cuenta nuestra, con sus otros años o, si no los hay, con la liga y su puesto en la tabla; no es un dato del club. El total suma estimados solo cuando más de la mitad de la liga tiene balance real.')));
      // Un club que ese año publicó solo su margen bruto sí tiene balance en el sitio, pero no un ingreso: su ficha lo dice y acá se estima.
      if(est.some(function(f){ return f.margen && !f.ancla; })){
        card.appendChild(el('p', 'lg-est-nota', '* ' + t('liga.est.noteMargen',
          'En algunos clubes ese ejercicio el documento publica solo el margen bruto (ventas menos costos), no los ingresos: el número es una cuenta nuestra y nunca es menor que ese margen.')));
      }
      if(est.some(function(f){ return f.ancla; })){
        card.appendChild(el('p', 'lg-est-nota', '* ' + t('liga.est.noteAncla',
          '«Informe siguiente»: el documento de ese ejercicio publica solo el margen bruto, y el del año siguiente trae el ingreso real en su columna anterior; es ese dato.')));
      }
    }
    return card;
  }

  // DE DÓNDE SALE LA PLATA: el ingreso de cada club partido en las categorías de Formato simplificado (f.mix, precalculado), una
  // barra apilada por club con la leyenda arriba. Cada tramo dice su categoría, monto y % al pasar el mouse. Un tramo negativo (una
  // deducción del ingreso bruto) no se puede apilar: se nombra debajo, igual que la fila que el documento junta con otra.
  var PALETA_MIX = ['#0a2b5c', '#4f86d9', '#f2b705', '#1b7a3d', '#b5372b', '#7a5ea8', '#2a9d8f', '#b9bec7', '#e38b2c'];
  // Un color por categoría, en el orden de cuánto pesa en el ranking; el bolsón sin desglosar siempre en beige. La usan composicion() y
  // consolidado(), así una categoría tiene el mismo color en las dos cards.
  function paletaMix(filas){
    var pesos = {};
    filas.forEach(function(f){ f.mix.forEach(function(m){ if(m[1] > 0) pesos[m[0]] = (pesos[m[0]] || 0) + m[1]; }); });
    var cats = Object.keys(pesos).filter(function(c){ return !esBolson(c); }).sort(function(a, b){ return pesos[b] - pesos[a]; });
    var colorDe = {};
    cats.forEach(function(c, i){ colorDe[c] = PALETA_MIX[i % PALETA_MIX.length]; });
    LUMP_LABELS.forEach(function(L){ if(pesos[L]){ colorDe[L] = '#e0d6c2'; cats.push(L); } });
    return { cats:cats, colorDe:colorDe };
  }

  // LA LIGA EN TOTAL: la suma por categoría de los clubes con balance del ejercicio (todos en dólares, con el tipo de cambio de cada
  // documento: no se mezclan monedas ni ejercicios). Los simulados no entran. Los estimados son un total por club, sin categorías: entran
  // como una franja rayada aparte solo cuando el total de la tabla los suma (totalConEstimados()), para que los dos totales coincidan.
  function consolidado(r, simulados){
    var card = el('article', 'vid-card lg-cons');
    var est = filasEstimadas(st.league, st.year);
    var conEst = totalConEstimados(r, est);
    var sumaEst = conEst ? est.reduce(function(a, f){ return a + f.revenue; }, 0) : 0;
    var real = totalDe(r), total = real + sumaEst;
    var pal = paletaMix(filasConSimulado(r, simulados));
    var porCat = {};
    r.clubs.forEach(function(f){ f.mix.forEach(function(m){ porCat[m[0]] = (porCat[m[0]] || 0) + m[1]; }); });
    var cats = pal.cats.filter(function(c){ return porCat[c]; });
    // Una categoría que suma negativo (deducciones) no se puede apilar: va en la lista, no en la barra.
    Object.keys(porCat).forEach(function(c){ if(cats.indexOf(c) < 0 && porCat[c]) cats.push(c); });

    var head = el('div', 'lg-card-head');
    var txt = el('div', 'lg-cons-txt');
    txt.appendChild(el('h2', 'lg-card-h', t('liga.cons.title', 'La liga en total, por categoría')));
    var tam = r.leagueSize != null ? r.leagueSize : (est.length ? r.clubs.length + est.length : null);
    var sub = t('liga.cons.sum', 'Suma de los') + ' ' + r.clubs.length + (tam != null ? ' ' + t('vid.of', 'de') + ' ' + tam : '') + ' '
      + t('liga.cons.withBal', 'clubes con balance') + ' ' + st.year
      + (conEst ? ' + ' + est.length + ' ' + (est.length === 1 ? t('liga.est.one', 'estimado') : t('liga.est.many', 'estimados')) + '*' : '')
      + ' · ' + t('liga.cons.usd', 'en dólares');
    var subP = el('p', 'lg-card-sub', sub);
    if(covidTemporada(st.league, st.year)) subP.insertAdjacentHTML('beforeend', ' ' + marcaCovidHtml('s', true));
    txt.appendChild(subP);
    head.appendChild(txt);
    var big = el('div', 'lg-cons-total');
    big.appendChild(el('span', 'lg-cons-total-l', t('liga.revenue', 'Ingresos')));
    big.appendChild(el('strong', null, (conEst ? '≈ ' : '') + fmtCard(total) + (conEst ? '*' : '')));
    head.appendChild(big);
    card.appendChild(head);

    var barra = el('div', 'lg-cons-barra');
    var positivos = cats.filter(function(c){ return porCat[c] > 0; });
    var baseBarra = positivos.reduce(function(a, c){ return a + porCat[c]; }, 0) + sumaEst;
    function seg(color, v, titulo){
      var sg = el('span'); sg.style.background = color;
      sg.style.width = (baseBarra ? v / baseBarra * 100 : 0).toFixed(2) + '%';
      sg.title = titulo;
      barra.appendChild(sg);
    }
    var RAYAS = 'repeating-linear-gradient(45deg,#b9bec7 0 4px,#ffffff 4px 7px)';
    positivos.forEach(function(c){ seg(pal.colorDe[c], porCat[c], nombreCat(c)); });
    if(sumaEst) seg(RAYAS, sumaEst, t('liga.cons.est', 'Estimados, sin categoría'));
    card.appendChild(barra);

    var lista = el('div', 'lg-cons-filas');
    function fila(color, nombre, v, esEst){
      var f = el('div', 'lg-cons-fila' + (esEst ? ' estimada' : ''));
      var sw = el('span', 'lg-cons-sw'); sw.style.background = color || 'transparent';
      f.appendChild(sw);
      f.appendChild(el('span', 'lg-cons-n', nombre));
      f.appendChild(el('span', 'lg-cons-v', (esEst ? '≈ ' : '') + fmtCard(v)));
      f.appendChild(el('span', 'lg-cons-p', total ? (v / total * 100).toFixed(1) + '%' : ''));
      lista.appendChild(f);
    }
    cats.forEach(function(c){ fila(porCat[c] > 0 ? pal.colorDe[c] : null, nombreCat(c), porCat[c]); });
    if(sumaEst) fila(RAYAS, t('liga.cons.est', 'Estimados, sin categoría') + '*', sumaEst, true);
    card.appendChild(lista);

    var notas = [];
    var lump = r.clubs.filter(function(f){ return f.mix.some(function(m){ return esBolson(m[0]) && m[1]; }); });
    if(lump.length) notas.push(t('liga.lumpShort', 'Sin desglosar') + ': ' + nClubes(lump.length) + ' (' + lump.map(function(f){ return nombreDe(f.id); }).join(', ') + ') '
      + (lump.length === 1 ? t('liga.cons.lump1', 'publica el ingreso sin partirlo en categorías.') : t('liga.cons.lump', 'publican el ingreso sin partirlo en categorías.')));
    if(conEst) notas.push('* ' + t('liga.cons.estNote', 'Un estimado es un total por club, sin categorías: va aparte. Ver la nota de la tabla de ingresos.'));
    else if(est.length) notas.push(t('liga.cons.estOut', 'Los clubes estimados no entran: menos de la mitad de la liga tiene balance real.'));
    notas.forEach(function(n){ card.appendChild(el('p', 'lg-est-nota', n)); });
    return card;
  }
  function nombreCat(c){ return esBolson(c) ? t('liga.lumpShort', 'Sin desglosar') : tLabel(c); }

  function composicion(r, simulados){
    var card = el('article', 'vid-card lg-mix');
    card.appendChild(el('h2', 'lg-card-h', t('liga.breakdown', 'De dónde sale la plata')));
    card.appendChild(el('p', 'lg-card-sub', t('liga.breakdown.sub',
      'El ingreso de cada club, partido en las mismas categorías de su ficha de Finanzas.')));
    var filas = filasConSimulado(r, simulados);
    var pal = paletaMix(filas), cats = pal.cats, colorDe = pal.colorDe;

    var ley = el('div', 'lg-ley');
    cats.forEach(function(c){
      var it = el('span', 'lg-ley-it');
      var sw = el('span', 'lg-ley-sw'); sw.style.background = colorDe[c];
      it.appendChild(sw);
      // El bolsón, con su nombre corto: el largo ("Fútbol profesional (sin desglosar por la fuente)") parte la leyenda en dos líneas.
      it.appendChild(document.createTextNode(esBolson(c) ? t('liga.lumpShort', 'Sin desglosar') : tLabel(c)));
      ley.appendChild(it);
    });
    card.appendChild(ley);

    var lista = el('div', 'lg-mix-filas');
    filas.forEach(function(f){
      var fila = el('div', 'lg-mix-fila' + (f.simulado ? ' simulada' : ''));
      fila.appendChild(el('span', 'lg-mix-n', nombreDe(f.id)));
      var barra = el('span', 'lg-mix-barra');
      var pos = f.mix.filter(function(m){ return m[1] > 0; });
      var sumaPos = pos.reduce(function(a, m){ return a + m[1]; }, 0);
      pos.forEach(function(m){
        var seg = el('span');
        seg.style.background = colorDe[m[0]];
        seg.style.width = (sumaPos ? m[1] / sumaPos * 100 : 0).toFixed(2) + '%';
        seg.title = tLabel(m[0]) + ': ' + fmtM(m[1]) + ' · ' + (f.revenue ? Math.round(m[1] / f.revenue * 100) : 0) + '%';
        barra.appendChild(seg);
      });
      fila.appendChild(barra);
      var notas = [];
      f.mix.filter(function(m){ return m[1] < 0; }).forEach(function(m){ notas.push(tLabel(m[0]) + ': ' + fmtM(m[1])); });
      (f.incluidos || []).forEach(function(m){
        notas.push(tLabel(m[0]) + ': ' + (m[2] ? t('finanzas.posibleDentroOtro', 'Posiblemente dentro de otro rubro') : t('finanzas.dentroOtro', 'Dentro de otro rubro')) + ' (' + tLabel(m[1]) + ')');
      });
      if(notas.length) fila.appendChild(el('span', 'lg-mix-nota', notas.join(' · ')));
      lista.appendChild(fila);
    });
    card.appendChild(lista);
    return card;
  }

  // LAS SALVEDADES: lo que hace no comparables dos números grandes se escribe, no se deja implícito (modelo: "Basis of preparation"
  // del Deloitte Football Money League).
  function salvedades(r){
    var caja = el('div', 'lg-avisos');
    var out = [];

    if(r.leagueSize != null && r.clubs.length < r.leagueSize && filasEstimadas(st.league, st.year).length){
      out.push(t('liga.cv.missing', 'Faltan') + ' ' + (r.leagueSize - r.clubs.length) + ' '
        + t('liga.cv.missing2', 'de los') + ' ' + r.leagueSize + ' '
        + t('liga.cv.missingEst', 'clubes de esa temporada: figuran en la tabla con un ingreso estimado (*).'));
    } else if(r.leagueSize != null && r.clubs.length < r.leagueSize){
      out.push(t('liga.cv.missing', 'Faltan') + ' ' + (r.leagueSize - r.clubs.length) + ' '
        + t('liga.cv.missing2', 'de los') + ' ' + r.leagueSize + ' '
        + t('liga.cv.missing3', 'clubes de esa temporada: el total de la tabla es el de los cargados, no el de la liga.'));
    }
    // Un club con el año de margen bruto va a sinDato y, si la tabla le da un estimado, no se repite acá.
    var estId = {}; filasEstimadas(st.league, st.year).forEach(function(e){ if(e.id) estId[e.id] = true; });
    var sinDato = (r.sinDato || []).filter(function(id){ return !estId[id]; });
    if(sinDato.length){
      out.push(nClubes(sinDato.length) + ' ' + t('liga.cv.nodata',
        'de esa temporada tienen ejercicio cargado pero sin ingreso calculable, y quedan afuera de la tabla:')
        + ' ' + sinDato.map(nombreDe).join(', ') + '.');
    }

    var presu = r.clubs.filter(function(f){ return f.reportType === 'official_budget'; });
    if(presu.length){
      // Singular y plural aparte: una salvedad que se lee como un error de la página deja de creerse.
      out.push(presu.length === 1
        ? t('liga.cv.budget1', 'Uno de estos ejercicios es un PRESUPUESTO, o sea una proyección del club y no un cierre:')
          + ' ' + nombreDe(presu[0].id) + '.'
        : presu.length + ' ' + t('liga.cv.budget',
            'de estos ejercicios son PRESUPUESTOS, o sea proyecciones del club y no cierres:')
          + ' ' + presu.map(function(f){ return nombreDe(f.id); }).join(', ') + '.');
    }
    var noOf = r.clubs.filter(function(f){ return f.reportType === 'unofficial_mirror'; });
    if(noOf.length){
      out.push(noOf.map(function(f){ return nombreDe(f.id); }).join(', ') + ': '
        + t('liga.cv.mirror',
          'el balance es auditado pero el PDF no salió de un canal oficial del club, sino de una copia pública.'));
    }

    // Cuánto de este ranking no está desglosado (una fuente que publica el total por club y el resto solo por división). El bolsón
    // se identifica con esBolson(): ver su comentario.
    var tot = totalDe(r), lump = 0;
    r.clubs.forEach(function(f){
      f.mix.forEach(function(m){ if(esBolson(m[0])) lump += m[1]; });
    });
    if(tot && lump / tot > 0.10){
      out.push(Math.round((lump / tot) * 100) + '% ' + t('liga.cv.lump',
        'del ingreso de este ranking no está desglosado por club: la fuente publica el total pero no de dónde sale.'));
    }

    out.push(t('liga.cv.fx',
      'Cada ejercicio se convierte a USD con el tipo de cambio de su propio documento, sin ajustar por inflación.'));
    out.push(t('liga.cv.zero',
      'Un club sin ejercicio cargado no aparece con una barra en cero: simplemente no está.'));

    caja.appendChild(el('p', null, out.join(' ')));
    var cita = citaLista(r);
    if(cita) caja.appendChild(cita);
    return caja;
  }

  // DE DÓNDE SALE LA LISTA DE CLUBES: la tabla de equipos de la página de la temporada en Wikipedia (`wiki` del ranking, de
  // tools/generate-rankings.js). Se cita con su licencia solo cuando la pantalla la usa: para el "de los M" o para los estimados.
  function citaLista(r){
    var w = r.wiki;
    if(!w || (r.leagueSize == null && !filasEstimadas(st.league, st.year).length)) return null;
    var lang = document.documentElement.lang || 'es';
    var p = el('p', 'lg-cita-lista');
    var a = el('a', null, w.t);
    a.href = 'https://' + w.lang + '.wikipedia.org/wiki/' + encodeURIComponent(w.t.replace(/ /g, '_'));
    a.target = '_blank'; a.rel = 'noopener';
    var lic = el('a', null, 'CC BY-SA 4.0');
    lic.href = 'https://creativecommons.org/licenses/by-sa/4.0/deed.' + (lang === 'en' ? 'en' : 'es');
    lic.target = '_blank'; lic.rel = 'noopener';
    var idioma = w.lang === lang ? '' : ' (' + (w.lang === 'en' ? t('liga.cita.en', 'en inglés') : w.lang) + ')';
    var fecha = '';
    if(w.at){
      var d = new Date(w.at + 'T12:00:00Z');
      if(!isNaN(d)) fecha = ', ' + t('liga.cita.leida', 'leída el') + ' ' + d.toLocaleDateString(lang, { day:'numeric', month:'numeric', year:'numeric', timeZone:'UTC' });
    }
    p.appendChild(document.createTextNode(t('liga.cita.pre', 'La lista de los') + ' ' + w.n + ' ' + t('liga.cita.mid', 'clubes de la temporada sale de Wikipedia:') + ' '));
    p.appendChild(a);
    p.appendChild(document.createTextNode(idioma + fecha + ', ' + t('liga.cita.lic', 'bajo licencia') + ' '));
    p.appendChild(lic);
    p.appendChild(document.createTextNode('.'));
    return p;
  }

  // --------------------------------------------------------------------------
  // LA VIDRIERA DE INICIO. Dos bloques con la misma tarjeta (top N con barras horizontales en el color de cada club):
  // - "Los que más facturan": el mundo y América, de data/rankings/_regiones.js. Lo genera tools/generate-rankings.js con todas las
  //   ligas, un solo ejercicio por ranking (el de más clubes), así que se actualiza con cada carga.
  // - "Quién factura más en cada liga": hasta 10 pares (liga, ejercicio) curados a mano en data/destacados.js (lo que hace buena a una
  //   vidriera es editorial). audit.js chequea que cada entrada tenga su ranking (destacado-sin-ranking).
  // Baja un data/rankings/<liga>.js por bloque y ningún archivo de club; no dibuja ningún Chart.js.
  // --------------------------------------------------------------------------
  var TOP_LIGA = 5;
  function loadRegiones(){
    return window.RANKINGS_REGION ? Promise.resolve(true) : loadRanking('_regiones');
  }
  function fmtCard(v){ return 'US$ ' + Math.round(v).toLocaleString(document.documentElement.lang || 'es', { useGrouping:'always' }) + ' M'; }

  // ÚLTIMAS CARGAS (al fondo de Inicio). Las tandas (un club, un día) de data/ultimas-cargas.js, que genera tools/generar-ultimas-cargas.mjs del
  // historial de las cargas; el card muestra las 5 últimas y «Ver más» abre ultimas-cargas.html, que usa la misma lista entera.
  var ULT_N = 5;
  function ultEjercicios(a){
    var runs = [], i = 0;
    while(i < a.length){
      var j = i;
      while(j + 1 < a.length && a[j + 1] === a[j] + 1) j++;
      runs.push(j > i ? a[i] + ' ' + t('uc.to', 'a') + ' ' + a[j] : String(a[i]));
      i = j + 1;
    }
    if(runs.length > 2) return t('uc.nEj', '{n} ejercicios ({a} a {b})').replace('{n}', a.length).replace('{a}', a[0]).replace('{b}', a[a.length - 1]);
    return (a.length === 1 ? t('uc.ej1', 'Ejercicio') : t('uc.ejN', 'Ejercicios')) + ' ' + runs.join(', ');
  }
  function ultFecha(f){
    return new Date(f + 'T12:00:00').toLocaleDateString(document.documentElement.lang || 'es', { day:'numeric', month:'short' });
  }
  function ultFilas(card, lista, conFecha){
    var ol = el('ol', 'vid-filas');
    lista.forEach(function(c){
      var li = el('li');
      var a = el('a', 'uc-fila');
      a.href = 'index.html?tab=finanzas&club=' + encodeURIComponent(c.id) + '&anios=' + c.anios[c.anios.length - 1];
      var bandera = ((window.COUNTRIES || {})[window.nationOf(c.id)] || {}).flag;
      a.appendChild(el('span', 'vid-pais', bandera || ''));
      a.appendChild(el('span', 'uc-nom', nombreDe(c.id)));
      a.appendChild(el('span', 'uc-ej', ultEjercicios(c.anios)));
      if(conFecha) a.appendChild(el('span', 'uc-fecha', ultFecha(c.fecha)));
      li.appendChild(a);
      ol.appendChild(li);
    });
    card.appendChild(ol);
  }
  function ultTarjeta(titulo, sub, lista, conFecha, verMas){
    var card = el('article', 'vid-card');
    var head = el('div', 'vid-card-head');
    var tit = el('div');
    tit.appendChild(el('h3', 'vid-card-h', titulo));
    tit.appendChild(el('div', 'vid-card-sub', sub));
    head.appendChild(tit);
    if(verMas){
      var ver = el('a', 'vid-link', t('uc.more', 'Ver más') + ' →');
      ver.href = 'ultimas-cargas.html';
      head.appendChild(ver);
    }
    card.appendChild(head);
    ultFilas(card, lista, conFecha);
    return card;
  }
  function pintarUltimasCargas(sec){
    var conClub = function(c){ return clubDe(c.id).displayName; };
    var ult = (window.ULTIMAS_CARGAS || []).filter(conClub).slice(0, ULT_N);
    if(!ult.length) return;
    var prox = (window.PROXIMAS_CARGAS || []).filter(conClub).slice(0, ULT_N);
    sec.appendChild(cabecera(t('uc.title', 'Qué se está cargando'), t('uc.sub', 'Los balances que se sumaron al sitio y los que vienen.')));
    var grilla = el('div', 'vid-grilla');
    grilla.appendChild(ultTarjeta(t('uc.last', 'Últimas cargas'), t('uc.last.sub', 'Lo más reciente que se sumó'), ult, true, true));
    if(prox.length) grilla.appendChild(ultTarjeta(t('uc.next', 'Próximas cargas'), t('uc.next.sub', 'Con el documento en mano, todavía sin cargar'), prox, false, false));
    sec.appendChild(grilla);
  }

  function renderDestacados(){
    var caja = $('vidriera');
    if(!caja) return Promise.resolve();
    var lista = (window.DESTACADOS || []).slice(0, 10);
    caja.innerHTML = '';

    var secReg = el('section', 'vid-sec');
    var secLig = el('section', 'vid-sec');
    var secUlt = el('section', 'vid-sec');
    caja.appendChild(secReg);
    caja.appendChild(secLig);
    caja.appendChild(secUlt);
    pintarUltimasCargas(secUlt);

    var pReg = loadRegiones().then(function(){
      var R = window.RANKINGS_REGION || {};
      var cards = [['mundo', t('top.mundo', 'En el mundo')], ['america', t('top.america', 'En América')]]
        .filter(function(x){ return R[x[0]] && R[x[0]].clubs.length; });
      if(!cards.length) return;
      secReg.appendChild(cabecera(t('top.title', 'Los que más facturan'),
        t('top.sub', 'Ingresos en dólares de todos los clubes cargados, un solo ejercicio por ranking: el que tiene más clubes. Se actualiza con cada balance nuevo.')));
      var grilla = el('div', 'vid-grilla');
      cards.forEach(function(x){
        var r = R[x[0]];
        grilla.appendChild(tarjeta({
          titulo: x[1],
          sub: t('liga.exercise', 'Ejercicio') + ' ' + r.year,
          filas: r.clubs,
          conPais: true
        }));
      });
      secReg.appendChild(grilla);
    });

    if(!lista.length) return pReg;
    var pLig = Promise.all(lista.map(function(d){ return loadRanking(d.league); })).then(function(){
      var head = cabecera(t('vid.title', 'Quién factura más en cada liga'),
        t('vid.sub', 'Ingresos en dólares, un ejercicio por liga. Entrá a la liga para ver el ranking completo y otros años.'));
      var todas = el('button', 'vid-link', t('vid.all', 'Todas las ligas') + ' →');
      todas.type = 'button';
      todas.addEventListener('click', function(){ api.goLiga(); });
      head.appendChild(todas);
      secLig.appendChild(head);
      var grilla = el('div', 'vid-grilla');
      lista.forEach(function(d){
        var r = rankingDe(d.league, d.year);
        // Un destacado sin ranking se saltea en silencio; el que avisa es audit.js.
        if(r) grilla.appendChild(tarjetaLiga(d.league, d.year, r));
      });
      secLig.appendChild(grilla);
    });
    return Promise.all([pReg, pLig]).then(pintarAtajos);
  }

  // "Probá con" del buscador de Inicio: el 1 del mundo, el 1 de América y la primera liga destacada. Salen de los mismos rankings,
  // así que cambian solos cuando cambia el dato.
  function pintarAtajos(){
    var caja = $('iniAtajos');
    if(!caja) return;
    caja.innerHTML = '';
    var R = window.RANKINGS_REGION || {}, items = [];
    ['mundo', 'america'].forEach(function(k){
      var f = R[k] && R[k].clubs[0];
      if(f && !items.some(function(x){ return x.id === f.id; })) items.push({ id: f.id });
    });
    var d = (window.DESTACADOS || [])[0];
    if(d && rankingDe(d.league, d.year)) items.push({ league: d.league, year: d.year });
    if(!items.length) return;
    caja.appendChild(el('span', 'ini-atajos-l', t('ini.try', 'Probá con')));
    items.forEach(function(x){
      var b = el('button', 'ini-atajo');
      b.type = 'button';
      if(x.id){
        var dot = el('span', 'vid-dot');
        dot.style.background = clubDe(x.id).brandColor || 'var(--azul)';
        b.appendChild(dot);
        b.appendChild(document.createTextNode(nombreDe(x.id)));
        b.addEventListener('click', function(){ irAlClub(x.id); });
      } else {
        b.textContent = ligaDe(x.league).name;
        b.addEventListener('click', function(){ show(x.league, x.year).then(function(){ api.goLiga(); }); });
      }
      caja.appendChild(b);
    });
  }

  function cabecera(titulo, sub){
    var head = el('div', 'vid-head');
    var txt = el('div');
    txt.appendChild(el('h2', 'vid-h', titulo));
    txt.appendChild(el('p', 'vid-sub', sub));
    head.appendChild(txt);
    return head;
  }

  function tarjetaLiga(leagueId, year, r){
    var lg = ligaDe(leagueId);
    return tarjeta({
      pais: ligaDe(leagueId).country,
      titulo: lg.name,
      sub: t('liga.exercise', 'Ejercicio') + ' ' + year,
      filas: r.clubs.slice(0, TOP_LIGA),
      ver: function(){
        // `show()` deja la vista lista; navegar es del que sabe del nav.
        show(leagueId, year).then(function(){ api.goLiga(); });
      }
    });
  }

  // La tarjeta de ranking: o = { titulo, sub, filas:[{id, revenue, league?}], pais? (código: se muestra su bandera), conPais? (la
  // bandera de cada club), pie?, aviso?, ver? }.
  function tarjeta(o){
    var card = el('article', 'vid-card');
    var head = el('div', 'vid-card-head');
    var tit = el('div');
    var h = el('h3', 'vid-card-h');
    var bandera = o.pais && ((window.COUNTRIES || {})[o.pais] || {}).flag;
    if(bandera) h.appendChild(el('span', 'vid-chip', bandera));
    h.appendChild(document.createTextNode(o.titulo));
    tit.appendChild(h);
    tit.appendChild(el('div', 'vid-card-sub', o.sub));
    head.appendChild(tit);
    if(o.ver){
      var ver = el('button', 'vid-link', t('vid.see', 'Ver la liga') + ' →');
      ver.type = 'button';
      ver.addEventListener('click', o.ver);
      head.appendChild(ver);
    }
    card.appendChild(head);

    var max = o.filas.length ? o.filas[0].revenue : 0;
    var ol = el('ol', 'vid-filas');
    o.filas.forEach(function(f, i){
      var li = el('li');
      var b = el('button', 'vid-fila');
      b.type = 'button';
      // El color de cada club, como el círculo del selector; sin color propio, el azul del sitio.
      var color = clubDe(f.id).brandColor || 'var(--azul)';
      b.appendChild(el('span', 'vid-pos', String(i + 1)));
      var nom = el('span', 'vid-nom');
      var dot = el('span', 'vid-dot'); dot.style.background = color;
      nom.appendChild(dot);
      nom.appendChild(el('span', 'vid-nom-t', nombreDe(f.id)));
      if(o.conPais) nom.appendChild(el('span', 'vid-pais', ((window.COUNTRIES || {})[window.nationOf(f.id)] || {}).flag || ''));
      b.appendChild(nom);
      var barra = el('span', 'vid-barra');
      var lleno = el('span'); lleno.style.background = color;
      lleno.style.width = max > 0 ? Math.max(2, Math.round(f.revenue / max * 100)) + '%' : '0';
      barra.appendChild(lleno);
      b.appendChild(barra);
      b.appendChild(el('span', 'vid-val', fmtCard(f.revenue)));
      b.addEventListener('click', function(){ irAlClub(f.id); });
      li.appendChild(b);
      ol.appendChild(li);
    });
    card.appendChild(ol);

    if(o.pie || o.aviso){
      var pie = el('div', 'vid-card-pie');
      pie.appendChild(el('span', null, o.pie || ''));
      if(o.aviso) pie.appendChild(el('span', 'vid-aviso', o.aviso));
      card.appendChild(pie);
    }
    return card;
  }

  // --------------------------------------------------------------------------
  function init(hooks){
    api.pickClub = (hooks && hooks.pickClub) || api.pickClub;
    api.goFinanzas = (hooks && hooks.goFinanzas) || api.goFinanzas;
    api.goLiga = (hooks && hooks.goLiga) || api.goLiga;
    api.onSimulado = (hooks && hooks.onSimulado) || api.onSimulado;
    api.onEstado = (hooks && hooks.onEstado) || api.onEstado;
  }

  return {
    init: init,
    show: show,
    // "¿Cómo le iría este club en otra liga?" / "sumar equipos": iniciarSimulacion arranca el flujo desde Finanzas (1 club);
    // showConSimulados es lo que llama Mi Cuenta al reabrir una simulación guardada (N clubes).
    iniciarSimulacion: iniciarSimulacion,
    showConSimulados: showConSimulados,
    // El card "otra liga" de Finanzas calcula el puesto con el MISMO motor (filaSimulada) contra el MISMO ranking precalculado.
    loadRanking: loadRanking,
    rankingDe: rankingDe,
    filaSimulada: filaSimulada,
    // Un ejercicio de margen bruto no tiene ingreso: el card compara el estimado (o el ingreso del informe siguiente) de la liga propia.
    loadEstimados: loadEstimados,
    filasEstimadas: filasEstimadas,
    // La llama index.html después de un cambio de idioma. Repinta LAS DOS pantallas: la vidriera también es texto generado en JS.
    refresh: function(){ render(); renderDestacados(); },
    renderDestacados: renderDestacados,
    current: function(){
      return { league: st.league, year: st.year,
        filtros: { deporte: frio.deporte, region: frio.region, agrupar: frio.agrupar, orden: frio.orden, informes: frio.informes } };
    },
    // Los filtros de la lista de ligas que dice la URL; un valor que no existe vuelve al de siempre.
    setFiltros: function(f){
      f = f || {};
      var antes = [frio.deporte, frio.region, frio.agrupar, frio.orden, frio.informes].join('|');
      frio.deporte = (window.SPORTS || []).some(function(x){ return x.id === f.deporte; }) ? f.deporte : null;
      frio.region = (window.REGIONS || []).some(function(x){ return x.id === f.region; }) ? f.region : null;
      frio.agrupar = FRIO_AGRUPAR.indexOf(f.agrupar) >= 0 ? f.agrupar : 'pais';
      frio.orden = FRIO_ORDEN.indexOf(f.orden) >= 0 ? f.orden : 'az';
      frio.informes = !!f.informes;
      // "Atrás" a la misma lista no cambia ningún filtro: lo abierto y cerrado queda como estaba. Otros filtros, otra lista.
      if([frio.deporte, frio.region, frio.agrupar, frio.orden, frio.informes].join('|') !== antes) frio.abiertos = null;
    },
    // Volver al estado frío (la grilla de ligas), por ejemplo con "atrás" desde una liga.
    frio: function(){ st.league = null; st.year = null; st.simulados = []; pendingSim = []; render(); }
  };
})();

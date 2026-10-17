// ============================================================================
// js/liga.js — LA PESTAÑA "LIGAS" (el ranking de ingresos de los clubes de una liga en UN ejercicio), la simulación de clubes en
// una liga que no es la suya y la vidriera de rankings de Inicio. Reglas de pantalla: Admin/PANTALLA.md, "Pestaña Ligas" y
// "Simular clubes".
//
// - Un ranking es (liga, EJERCICIO), nunca (liga): el ejercicio va siempre en el encabezado y se cambia con un selector propio.
// - El default es el ejercicio con MÁS clubes, no el más reciente (los balances tardan en publicarse: el más nuevo es el más flaco).
// - Los números salen de data/rankings/<liga>.js, precalculado por tools/generate-rankings.js con el motor real: no se baja ningún
//   data/<país>/<club>-data.js.
// - Barras de un color sólido (no apiladas: el bolsón sin desglosar y los segmentos negativos no se leerían), en orden ascendente
//   en el gráfico y descendente en la tabla, con el número escrito arriba de cada barra (con eje lineal, un club chico es un hilo).
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
  // Instancias de Chart.js por pantalla: cada una destruye lo suyo antes de redibujar. Hoy solo la pestaña Ligas dibuja gráficos
  // (la vidriera de Inicio son tarjetas HTML).
  var instancias = { liga: [] };
  function nueva(donde, chart){ instancias[donde].push(chart); return chart; }
  function matarCharts(donde){
    instancias[donde].forEach(function(c){ try { c.destroy(); } catch(e){} });
    instancias[donde] = [];
  }

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
  function nombreDe(id){ return clubDe(id).displayName || id; }
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
  // El bolsón "sin desglosar por la fuente" se identifica por su etiqueta (la clave de los buckets en data/site-labels.js). Si se
  // renombra en js/finanzas-calc.js hay que renombrarlo acá: si no, el aviso deja de mostrarse sin romper nada.
  var LUMP_LABEL = 'Fútbol profesional (sin desglosar por la fuente)';
  // El total de los cargados: una sola cuenta para grafico(), tabla(), salvedades() y tarjetaLiga().
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
    var src = 'data/rankings/' + leagueId + '.js' + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
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
    return loadRanking(leagueId).then(function(){
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
    return loadRanking(leagueId).then(function(){
      st.league = leagueId;
      st.year = (year != null && rankingDe(leagueId, year)) ? Number(year) : anioPorDefecto(leagueId);
      pendingSim = [];
      buscadorQ = '';
      st.simulados = (clubes || []).map(function(c){
        var fila = filaSimulada(c.clubId, c.clubYear);
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
  function render(){
    var wrap = $('ligaWrap');
    if(!wrap) return;
    matarCharts('liga');
    wrap.innerHTML = '';
    if(!st.league){ wrap.appendChild(estadoFrio()); return; }

    var r = rankingDe(st.league, st.year);
    wrap.appendChild(botonVolver());
    if(!r){
      wrap.appendChild(el('p', 'liga-vacio', t('liga.nodata',
        'Todavía no hay ningún ejercicio cargado de esta liga.')));
      wrap.appendChild(estadoFrio());
      return;
    }

    wrap.appendChild(encabezado(r));
    wrap.appendChild(panelSimulacion(r));
    var filasSim = st.simulados.map(function(s){ return s.fila; });
    wrap.appendChild(grafico(r, st.league, st.year, 'ligaChart', null, 'liga', filasSim));
    wrap.appendChild(tabla(r, filasSim));
    wrap.appendChild(desglose(r, filasSim));
    wrap.appendChild(salvedades(r));
  }

  // LA POSICIÓN ES SOLO ENTRE LOS CLUBES CARGADOS, nunca "de los leagueSize reales": no hay forma de saber dónde quedaría contra un
  // club que el sitio no tiene.
  // EL PANEL DE SIMULACIÓN, siempre visible en una liga: primero el buscador de "sumar un club"; si hay algo simulado, una línea
  // por club con su posición, la salvedad, el dropdown de liga y "Quitar todas".
  function panelSimulacion(r){
    var caja = el('div', 'liga-sim-panel');
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
      'Solo por ingresos, comparado contra los clubes con ejercicio cargado en el sitio — no es una posición en la tabla real, no hay puntos ni fixture de por medio.')));

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
        return norm(nombreDe(id)).indexOf(q) >= 0;
      }).sort(function(a, b){ return nombreDe(a).localeCompare(nombreDe(b), 'es'); }).slice(0, 8);
      candidatos.forEach(function(id){
        var co = window.COUNTRIES && window.COUNTRIES[clubDe(id).country];
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
          (co.flag || '🏆') + ' ' + ligaDe(lid).name + ' — ' + t('liga.sim.ligaCompleta', 'liga completa'));
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
          o.textContent = (co.flag || '🏆') + ' ' + lg.name + ' — ' + (co.key ? t(co.key, co.name) : '');
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
  function botonLiga(lid){
    var lg = ligaDe(lid), co = paisDe(lid);
    var b = el('button', 'liga-frio-btn');
    b.type = 'button';
    b.appendChild(el('span', 'liga-frio-flag', co.flag || '🏆'));
    b.appendChild(el('span', 'liga-frio-n', lg.name));
    b.appendChild(el('span', 'liga-frio-m',
      [co.key ? t(co.key, co.name) : '', window.tierLabel ? window.tierLabel(lg.tier) : ''].filter(Boolean).join(' · ')));
    // Modo simulación: si hay clubes esperando destino, la grilla usa la liga elegida como destino en vez de navegar.
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
    var caja = el('div', 'liga-frio');
    if(pendingSim.length){
      caja.appendChild(el('p', 'liga-frio-t',
        t('liga.sim.pick', 'Elegí la liga donde querés ver a') + ' '
        + nombresLista(pendingSim.map(function(s){ return s.clubId; }))));
      var cancelar = el('button', 'liga-sim-cancelar', t('liga.sim.cancelar', 'Cancelar'));
      cancelar.type = 'button';
      cancelar.addEventListener('click', function(){ pendingSim = []; render(); });
      caja.appendChild(cancelar);
    } else {
      caja.appendChild(el('p', 'liga-frio-t', t('liga.pick', 'Elegí una liga')));
    }

    (window.REGIONS || []).forEach(function(reg){
      var paises = paisesDeRegionAlfa(reg.id).filter(function(cid){ return ligasDePaisAlfa(cid).length; });
      if(!paises.length) return;

      var cont = el('div', 'liga-frio-cont');
      cont.appendChild(el('h3', 'liga-frio-cont-t', t(reg.key, reg.name)));
      var grid = el('div', 'liga-frio-grid');
      paises.forEach(function(cid){
        ligasDePaisAlfa(cid).forEach(function(lid){ grid.appendChild(botonLiga(lid)); });
      });
      cont.appendChild(grid);
      caja.appendChild(cont);
    });

    return caja;
  }

  // EL BOTÓN DE VOLVER a la grilla de ligas.
  function botonVolver(){
    var b = el('button', 'liga-volver', '‹ ' + t('liga.back', 'Volver a Ligas'));
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

  // EL ENCABEZADO (convención de Our World in Data): el título es la métrica y el sujeto; el subtítulo, la cobertura y la unidad,
  // en prosa.
  function encabezado(r){
    var caja = el('div', 'liga-head');
    var lg = ligaDe(st.league), co = paisDe(st.league);
    var fila = el('div', 'liga-head-top');

    var h = el('h2', 'liga-h');
    h.appendChild(el('span', 'liga-flag', co.flag || '🏆'));
    h.appendChild(document.createTextNode(' ' + lg.name + ' · '
      + t('liga.exercise', 'Ejercicio') + ' ' + st.year));
    fila.appendChild(h);
    fila.appendChild(selectorDeAnio());
    caja.appendChild(fila);

    // "N de M" SOLO si leagueSize existe: inventar el M sería justo el dato inventado que data/club-leagues.js existe para evitar.
    var n = r.clubs.length;
    var sub = r.leagueSize != null
      ? n + ' ' + t('liga.of', 'de los') + ' ' + r.leagueSize + ' '
        + t('liga.cover', 'clubes de esa temporada tienen ejercicio cargado.')
      : nClubes(n) + ' ' + t('liga.coverN', 'con ejercicio cargado. No está verificado cuántos equipos jugaron esa temporada, así que el sitio no dice de cuántos son.');
    caja.appendChild(el('p', 'liga-sub', sub));
    caja.appendChild(el('p', 'liga-sub chico', t('liga.units',
      'En USD y en Formato simplificado: las dos condiciones para que los números de clubes de países distintos signifiquen lo mismo.')));
    return caja;
  }

  // El selector de ejercicio: cada opción dice cuántos clubes trae, para no elegir a ciegas.
  function selectorDeAnio(){
    var ys = aniosDe(st.league);
    var caja = el('label', 'liga-anio');
    caja.appendChild(el('span', 'liga-anio-l', t('liga.year', 'Ejercicio')));
    var sel = el('select');
    ys.forEach(function(y){
      var o = el('option', null, y + ' · ' + nClubes(rankingDe(st.league, y).clubs.length));
      o.value = y;
      if(y === st.year) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function(){ st.year = Number(sel.value); render(); });
    caja.appendChild(sel);
    return caja;
  }

  // EL GRÁFICO de la pestaña Ligas: una serie con backgroundColor como array (cada barra en su color de marca).
  function grafico(r, leagueId, year, canvasId, alto, donde, simulados){
    var caja = el('div', 'liga-chart-card');
    var head = el('div', 'liga-chart-head');
    head.appendChild(el('span', 'liga-chart-y', 'M USD'));
    caja.appendChild(head);
    var box = el('div', 'liga-chart-box');
    if(alto) box.style.height = alto + 'px';
    var cv = document.createElement('canvas');
    cv.id = canvasId;
    box.appendChild(cv);
    caja.appendChild(box);

    if(typeof Chart === 'undefined') return caja;

    // Ascendente: el dato se guarda descendente (el orden de la tabla) y acá se invierte.
    var filas = filasConSimulado(r, simulados).slice().reverse();
    // Color de marca de cada club; brandColor es opcional (un club cuyo color es el blanco lleva null) y cae al azul del sitio, como
    // pintarCrest() en js/selector.js. La barra simulada va translúcida para que nadie la lea como un club que juega ahí.
    var colores = filas.map(function(f){
      var base = clubDe(f.id).brandColor || '#0a2b5c';
      return f.simulado ? base + '80' : base;
    });

    // Arriba de cada barra: el total, y debajo, más chico, el % que esa barra es del total de la liga-ejercicio.
    var total = totalDe(r);
    var etiquetas = {
      id:'ligaValueLabels',
      afterDatasetsDraw: function(chart){
        var c = chart.ctx, meta = chart.getDatasetMeta(0);
        c.save();
        c.textAlign = 'center';
        meta.data.forEach(function(bar, i){
          var v = filas[i].revenue;
          var pct = total ? Math.round((v / total) * 100) : null;
          c.textBaseline = 'bottom';
          c.font = '600 11px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif';
          c.fillStyle = '#1c1c1c';
          c.fillText(v >= 1000 ? (v / 1000).toFixed(2) + ' MM' : v.toFixed(1),
            bar.x, bar.y - (pct != null ? 14 : 4));
          if(pct != null){
            // "(31%)" y no "31% del total": con 20 barras rotadas 45° una frase larga se pisa con la del vecino.
            c.font = '500 9px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif';
            c.fillStyle = '#6b6b6b';
            c.fillText('(' + pct + '%)', bar.x, bar.y - 4);
          }
          // Marca "(simulado)" sobre la barra, además de la transparencia.
          if(filas[i].simulado){
            c.font = '700 9px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif';
            c.fillStyle = '#8a5a00';
            c.fillText(t('liga.sim.tag', '(simulado)'), bar.x, bar.y - (pct != null ? 26 : 16));
          }
        });
        c.restore();
      }
    };

    // Se usa `cv` (el canvas que creó ESTA llamada), nunca getElementById(canvasId): con dos renders seguidos de Inicio los canvasId
    // se repiten y el setTimeout del primero pintaba sobre el canvas del segundo ("Canvas is already in use"). Chart.getChart(cv) es la
    // segunda red, por si el canvas se reusara.
    setTimeout(function(){
      if(!cv.isConnected) return;
      var previo = Chart.getChart(cv);
      if(previo) previo.destroy();
      nueva(donde, new Chart(cv.getContext('2d'), {
        type:'bar',
        data:{
          labels: filas.map(function(f){ return nombreDe(f.id); }),
          // maxBarThickness: con pocos clubes Chart.js reparte todo el ancho y las barras salen del tamaño de un cartel.
          datasets:[{ label:t('liga.revenue', 'Ingresos'), data: filas.map(function(f){ return f.revenue; }),
                      backgroundColor: colores, borderWidth:0, maxBarThickness:64 }]
        },
        options:{
          responsive:true, maintainAspectRatio:false, layout:{padding:{top:34}},
          plugins:{
            legend:{display:false},
            tooltip:{ callbacks:{
              label: function(c){ return fmtM(c.parsed.y); },
              // El tooltip dice el ejercicio DE ESE CLUB. Para una fila simulada `year` es el de la liga destino, no el del club: se usa su .year.
              afterLabel: function(c){ return etiquetaEjercicio(filas[c.dataIndex], filas[c.dataIndex].year || year); }
            } }
          },
          scales:{
            y:{ beginAtZero:true, title:{display:false} },
            // Rotación fija en 45° (con minRotation:0 Chart.js rota de menos y los nombres se pisan); autoSkip:false porque saltear una
            // etiqueta es saltear un club del ranking.
            x:{ title:{display:false},
                ticks:{ maxRotation:45, minRotation:45, autoSkip:false, font:{size:11} } }
          },
          // Cada barra linkea a su club: el ranking es superficie de navegación.
          onClick: function(e, act){
            if(!act.length) return;
            irAlClub(filas[act[0].index].id);
          }
        },
        plugins:[etiquetas]
      }));
    }, 0);
    return caja;
  }

  // EL SALTO AL CLUB: la vista no conoce el nav ni sabe cargar un club, se lo pide al hook que le pasa index.html.
  var api = { pickClub: function(){ return Promise.resolve(); },
              goFinanzas: function(){}, goLiga: function(){},
              // Avisa que una simulación se armó de verdad (fila calculada); index.html la guarda en Mi Cuenta.
              onSimulado: function(){} };
  function irAlClub(clubId){
    Promise.resolve(api.pickClub(clubId)).then(function(){ api.goFinanzas(); });
  }

  // LA TABLA: donde el dato de un club chico sigue siendo legible aunque su barra sea un hilo.
  function tabla(r, simulados){
    var caja = el('div', 'liga-tabla-card');
    // OJO: un array vacío es truthy; por eso `.length`.
    var tb = el('table', 'liga-tabla' + (simulados && simulados.length ? ' con-simulado' : ''));
    var trh = el('tr');
    [['#', 'liga-col-n'], [t('liga.club', 'Club'), ''], [t('liga.revenue', 'Ingresos'), 'num'],
     [t('liga.exerciseCol', 'Ejercicio'), ''], [t('liga.doc', 'Documento'), '']]
      .forEach(function(c){ trh.appendChild(el('th', c[1], c[0])); });
    var thead = el('thead'); thead.appendChild(trh); tb.appendChild(thead);

    var tbody = el('tbody');
    var total = totalDe(r);
    filasConSimulado(r, simulados).forEach(function(f, i){
      var tr = el('tr', f.simulado ? 'liga-fila-simulada' : null);
      tr.appendChild(el('td', 'liga-col-n', String(i + 1)));

      var tdc = el('td');
      var pin = el('span', 'liga-pin');
      pin.style.background = clubDe(f.id).brandColor || '#0a2b5c';
      tdc.appendChild(pin);
      var a = el('button', 'liga-club-link', nombreDe(f.id));
      a.type = 'button';
      a.addEventListener('click', function(){ irAlClub(f.id); });
      tdc.appendChild(a);
      // "(simulado)" dentro de la celda del nombre, no en una columna nueva que correría la tabla en el caso normal.
      if(f.simulado) tdc.appendChild(el('span', 'liga-sim-badge', t('liga.sim.tag', '(simulado)')));
      tr.appendChild(tdc);

      tr.appendChild(el('td', 'num', fmtM(f.revenue)));
      tr.appendChild(el('td', 'liga-col-ej', etiquetaEjercicio(f, f.year || st.year)));

      // El tipo de documento no es decoración: un presupuesto o una copia no oficial entre balances cerrados no se leen igual.
      var tdd = el('td', 'liga-col-doc');
      var esp = f.reportType === 'official_budget';
      var noOf = f.reportType === 'unofficial_mirror';
      var et = el('span', 'liga-doc' + (esp ? ' presu' : '') + (noOf ? ' nooficial' : ''),
        t('fuentes.tipo.' + f.reportType, (window.sourceTypeLabel ? window.sourceTypeLabel(f.reportType) : f.reportType)));
      tdd.appendChild(et);
      // El link va a la página estática fuentes/<club>.html, no a sources{}, que solo tiene los clubes con data file cargado.
      var lnk = el('a', 'liga-doc-link', t('liga.sources', 'fuentes'));
      lnk.href = 'fuentes/' + f.id + '.html';
      tdd.appendChild(lnk);
      tr.appendChild(tdd);
      tbody.appendChild(tr);
    });
    tb.appendChild(tbody);

    var tfoot = el('tfoot');
    var trf = el('tr');
    trf.appendChild(el('td', 'liga-col-n', ''));
    // "Total de los N cargados", nunca "total de la liga": son cosas distintas.
    trf.appendChild(el('td', null, t('liga.total', 'Total de los') + ' ' + r.clubs.length + ' '
      + t('liga.totalLoaded', 'cargados')));
    trf.appendChild(el('td', 'num', fmtM(total)));
    trf.appendChild(el('td', null, ''));
    trf.appendChild(el('td', null, ''));
    tfoot.appendChild(trf);
    tb.appendChild(tfoot);

    caja.appendChild(tb);
    return caja;
  }

  // EL DESGLOSE POR CATEGORÍA: solo ingresos, en las categorías de Formato simplificado, siempre visible debajo de la tabla. Sale de
  // f.mix (ya precalculado en data/rankings/). El % de cada fila es del ingreso DE ESE CLUB, no de la liga (ese lo da el gráfico).
  function desglose(r, simulados){
    var caja = el('div', 'liga-desglose-card');
    caja.appendChild(el('h3', 'liga-desglose-h', t('liga.breakdown', 'Desglose de ingresos por categoría')));
    caja.appendChild(el('p', 'liga-desglose-sub', t('liga.breakdown.sub',
      'La composición de cada club, en las mismas categorías de Formato simplificado que se ven en su ficha individual de Finanzas.')));

    filasConSimulado(r, simulados).forEach(function(f){
      var bloque = el('div', 'liga-desglose-club' + (f.simulado ? ' liga-fila-simulada' : ''));
      var head = el('div', 'liga-desglose-club-head');
      var pin = el('span', 'liga-pin');
      pin.style.background = clubDe(f.id).brandColor || '#0a2b5c';
      head.appendChild(pin);
      var a = el('button', 'liga-club-link', nombreDe(f.id));
      a.type = 'button';
      a.addEventListener('click', function(){ irAlClub(f.id); });
      head.appendChild(a);
      if(f.simulado) head.appendChild(el('span', 'liga-sim-badge', t('liga.sim.tag', '(simulado)')));
      head.appendChild(el('span', 'liga-desglose-club-total', fmtM(f.revenue)));
      bloque.appendChild(head);

      f.mix.forEach(function(m){
        var pct = f.revenue ? Math.round((m[1] / f.revenue) * 100) : 0;
        var fila = el('div', 'liga-desglose-fila');
        fila.appendChild(el('span', 'liga-desglose-cat', tLabel(m[0])));
        fila.appendChild(el('span', 'liga-desglose-val', fmtM(m[1]) + ' · ' + pct + '%'));
        bloque.appendChild(fila);
      });
      // La fila que el documento junta con otra (fiscalYearMeta.incluidoEn) se nombra, en vez de no aparecer.
      (f.incluidos || []).forEach(function(m){
        var fila = el('div', 'liga-desglose-fila liga-desglose-incluido');
        fila.appendChild(el('span', 'liga-desglose-cat', tLabel(m[0])));
        // Texto corto; el rubro, en el bocadillo (js/info-tip.js).
        var val = el('span', 'liga-desglose-val pl-incluido', m[2] ? t('finanzas.posibleDentroOtro', 'Posiblemente dentro de otro rubro') : t('finanzas.dentroOtro', 'Dentro de otro rubro'));
        val.setAttribute('data-info-tip', window.FINANZAS_DENTRO_TIP(m[1], !!m[2])); val.setAttribute('tabindex', '0');
        fila.appendChild(val);
        bloque.appendChild(fila);
      });
      caja.appendChild(bloque);
    });

    return caja;
  }

  // LAS SALVEDADES: lo que hace no comparables dos números grandes se escribe, no se deja implícito (modelo: "Basis of preparation"
  // del Deloitte Football Money League).
  function salvedades(r){
    var caja = el('div', 'liga-avisos');
    caja.appendChild(el('h3', null, t('liga.caveats', 'Salvedades')));
    var out = [];

    if(r.leagueSize != null && r.clubs.length < r.leagueSize){
      out.push(t('liga.cv.missing', 'Faltan') + ' ' + (r.leagueSize - r.clubs.length) + ' '
        + t('liga.cv.missing2', 'de los') + ' ' + r.leagueSize + ' '
        + t('liga.cv.missing3', 'clubes de esa temporada: el total de la tabla es el de los cargados, no el de la liga.'));
    }
    if(r.leagueSize == null){
      out.push(t('liga.cv.nosize',
        'Nadie verificó todavía cuántos equipos jugaron esta temporada, así que no se puede decir qué porción de la liga es esto.'));
    }
    if(r.sinDato && r.sinDato.length){
      out.push(nClubes(r.sinDato.length) + ' ' + t('liga.cv.nodata',
        'de esa temporada tienen ejercicio cargado pero sin ingreso calculable, y quedan afuera de la tabla:')
        + ' ' + r.sinDato.map(nombreDe).join(', ') + '.');
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
    // se identifica por LUMP_LABEL: ver su comentario.
    var tot = totalDe(r), lump = 0;
    r.clubs.forEach(function(f){
      f.mix.forEach(function(m){ if(m[0] === LUMP_LABEL) lump += m[1]; });
    });
    if(tot && lump / tot > 0.10){
      out.push(Math.round((lump / tot) * 100) + '% ' + t('liga.cv.lump',
        'del ingreso de este ranking no está desglosado por club: la fuente publica el total pero no de dónde sale.'));
    }

    out.push(t('liga.cv.fx',
      'Cada ejercicio se convierte a USD con el tipo de cambio de su propio documento, sin ajustar por inflación.'));
    out.push(t('liga.cv.zero',
      'Un club sin ejercicio cargado no aparece con una barra en cero: simplemente no está.'));

    out.forEach(function(x){ caja.appendChild(el('p', null, '· ' + x)); });
    return caja;
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

  function renderDestacados(){
    var caja = $('vidriera');
    if(!caja) return Promise.resolve();
    var lista = (window.DESTACADOS || []).slice(0, 10);
    caja.innerHTML = '';

    var secReg = el('section', 'vid-sec');
    var secLig = el('section', 'vid-sec');
    caja.appendChild(secReg);
    caja.appendChild(secLig);

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
        var resto = r.total - r.clubs.length;
        grilla.appendChild(tarjeta({
          titulo: x[1],
          sub: t('liga.exercise', 'Ejercicio') + ' ' + r.year + ' · ' + r.total + ' ' + t('top.withBalance', 'clubes con balance'),
          filas: r.clubs,
          conPais: true,
          pie: resto > 0 ? '+ ' + resto + ' ' + t('top.more', 'clubes más con balance') + ' ' + r.year : ''
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
    // La misma regla de cobertura que la pestaña: "N de M" solo si leagueSizeAt() lo supo al generar el ranking.
    var cob = r.leagueSize != null
      ? r.clubs.length + ' ' + t('vid.of', 'de') + ' ' + r.leagueSize + ' ' + t('liga.clubN', 'clubes')
      : nClubes(r.clubs.length) + ' ' + t('vid.loaded', 'cargados');
    // Una sola salvedad acá, la que cambia cómo se lee el ranking (cuánto no está desglosado); el resto está en la pestaña de la liga.
    var tot = totalDe(r), lump = 0;
    r.clubs.forEach(function(f){
      f.mix.forEach(function(m){ if(m[0] === LUMP_LABEL) lump += m[1]; });
    });
    var resto = r.clubs.length - TOP_LIGA;
    return tarjeta({
      pais: ligaDe(leagueId).country,
      titulo: lg.name,
      sub: t('liga.exercise', 'Ejercicio') + ' ' + year + ' · ' + cob,
      filas: r.clubs.slice(0, TOP_LIGA),
      pie: resto > 0 ? '+ ' + resto + ' ' + t('vid.more', 'clubes más en el ranking') : '',
      aviso: (tot && lump / tot > 0.10)
        ? Math.round((lump / tot) * 100) + '% ' + t('vid.lump', 'sin desglosar por rubro') : '',
      ver: function(){
        // `show()` deja la vista lista; navegar es del que sabe del nav.
        show(leagueId, year).then(function(){ api.goLiga(); });
      }
    });
  }

  // La tarjeta de ranking: o = { titulo, sub, filas:[{id, revenue, league?}], pais?, conPais?, pie?, aviso?, ver? }.
  function tarjeta(o){
    var card = el('article', 'vid-card');
    var head = el('div', 'vid-card-head');
    var tit = el('div');
    var h = el('h3', 'vid-card-h');
    if(o.pais) h.appendChild(el('span', 'vid-chip', o.pais));
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
      if(o.conPais) nom.appendChild(el('span', 'vid-pais', clubDe(f.id).country || ''));
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
    // La llama index.html después de un cambio de idioma. Repinta LAS DOS pantallas: la vidriera también es texto generado en JS.
    refresh: function(){ render(); renderDestacados(); },
    renderDestacados: renderDestacados,
    current: function(){ return { league: st.league, year: st.year }; }
  };
})();

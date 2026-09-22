// ============================================================================
// js/liga.js — LA PESTAÑA "LIGAS": el ranking de ingresos de los clubes de una
// liga en UN ejercicio. Versión 183, to-do 23(c).
//
// QUÉ HUECO TAPA. Hasta acá, elegir una liga en el selector solo filtraba la
// columna Equipo: no había ninguna pantalla que contestara "¿y qué pasa con
// esta liga?". El to-do 23(c) lo venía pidiendo desde la Versión 137.
//
// LA REGLA QUE ORDENA TODO ESTE ARCHIVO: **un ranking es (liga, EJERCICIO), no
// (liga)**. Es la misma regla de `data/club-leagues.js` ("no existe ninguna
// arista club → liga sin año"), y acá se ve en tres lugares: el ejercicio está
// SIEMPRE escrito en el encabezado, es cambiable con un selector propio, y cada
// opción de ese selector dice cuántos clubes tiene, para que elegir un año no
// sea elegir a ciegas.
//
// EL DEFAULT NO ES EL AÑO MÁS RECIENTE, ES EL QUE TIENE MÁS CLUBES. Parece un
// detalle y no lo es: los balances tardan en publicarse, así que el ejercicio
// más nuevo es SIEMPRE el más flaco. La Primera argentina tiene 8 clubes en 2024
// y 5 en 2025; abrir en 2025 mostraría la peor versión del ranking.
//
// DE DÓNDE SALEN LOS NÚMEROS: de `data/rankings/<liga>.js`, precalculado por
// `tools/generate-rankings.js` con el motor real (Versión 182). NO se baja ni un
// `data/<club>-data.js`: el archivo de una liga pesa entre 1 y 3,4 KB gzip,
// contra los 18-101 KB que costaría calcular el mismo ranking en vivo. Ver la
// cabecera del generador para las mediciones.
//
// POR QUÉ LAS BARRAS SON DE UN COLOR SÓLIDO Y NO APILADAS. El to-do 23(c)
// original decía "barra apilada por club". Guido lo redefinió el 2026-09-22:
// "solo ingresos... eje Y $ y en el eje X los clubes ordenados por cash". Y los
// datos le dan la razón: en la J1 2025 casi la mitad de cada barra sería el
// bolsón "sin desglosar por la fuente", y hay 3 clubes (Botafogo, Cruzeiro,
// Envigado) con un segmento NEGATIVO, porque reportan ingreso bruto menos
// deducciones. Un apilado de esa mezcla no se lee. La composición no se pierde:
// viaja en `data/rankings/` y de ahí sale el aviso de cuánto no está desglosado.
//
// ORDEN ASCENDENTE (de menor a mayor, izquierda a derecha) en el gráfico, pedido
// explícito de Guido. La TABLA va al revés, descendente con el puesto, que es
// como se lee un ranking. El dato guardado está en orden descendente y el
// gráfico lo invierte: el orden es decisión de la vista, no del dato.
//
// EL NÚMERO VA ESCRITO ARRIBA DE CADA BARRA, y no es decoración. En LaLiga 2025
// Real Madrid saca 1.388,5 M USD y Alavés 75,1: con eje lineal —que es el
// correcto, porque la desproporción ES la noticia— la barra de Alavés es un hilo.
// Escrito arriba, ninguna fila queda muda. Es lo que hacen CoinMarketCap y
// companiesmarketcap, y es gratis.
// ============================================================================
window.LIGA_VIEW = (function(){
  'use strict';

  // El (liga, ejercicio) que se está mirando. `null` es el estado frío: la
  // pestaña se puede abrir desde el nav sin haber elegido nada.
  var st = { league:null, year:null };
  var chartInst = null;

  function $(id){ return document.getElementById(id); }
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }
  function el(tag, cls, txt){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    if(txt != null) n.textContent = txt;
    return n;
  }
  // OJO: `clubs` SIN `window.` (mismo bug que documentan data/club-leagues.js y la
  // Versión 96). `data/clubs.js` lo declara con `const`, así que es un global
  // LÉXICO y no una propiedad de `window`: `window.clubs` da undefined.
  function clubDe(id){ return (typeof clubs !== 'undefined' && clubs[id]) || {}; }
  function nombreDe(id){ return clubDe(id).displayName || id; }
  function ligaDe(lid){ return (window.LEAGUES || {})[lid] || {}; }
  function paisDe(lid){ return (window.COUNTRIES || {})[ligaDe(lid).country] || {}; }
  // LA ETIQUETA DEL EJERCICIO SE ARMA ACÁ, no viene del archivo generado. Es un
  // string de presentación ("Balance 2024/2025", "Presupuesto 2026"), y
  // congelarlo en `data/rankings/` lo volvería intraducible para siempre. La
  // función del motor está disponible sin cargar ningún data file: solo necesita
  // `clubs[id].fiscalYearStart`, que es eager. El fallback es el año pelado, que
  // es cierto aunque diga menos.
  function etiquetaEjercicio(f){
    return (typeof window.ejercicioLabel === 'function')
      ? window.ejercicioLabel(st.year, f.reportType, f.id)
      : String(st.year);
  }
  // "1 club" y no "1 club(es)": el conteo aparece en el subtítulo de la página y
  // en dos salvedades, y el paréntesis se lee como un formulario.
  function nClubes(n){
    return n + ' ' + (n === 1 ? t('liga.club1', 'club') : t('liga.clubN', 'clubes'));
  }
  function fmtM(v){
    var abs = Math.abs(v);
    var txt = abs >= 1000 ? (abs / 1000).toFixed(2) + ' MM' : abs.toFixed(1) + ' M';
    return (v < 0 ? '-' : '') + txt + ' USD';
  }

  // --------------------------------------------------------------------------
  // LA CARGA. Mismo patrón que `loadClubData()` en index.html y que
  // `loadClubLeagues()` en data/club-leagues.js: un <script> inyectado, con el
  // `?v=` de ASSET_V, y una promesa cacheada por liga para que dos pedidos
  // simultáneos no ejecuten el archivo dos veces.
  //
  // El `?v=` NO es opcional. Sin él, un visitante que ya vio el ranking de una
  // liga se queda con los números viejos después de un deploy que los corrigió
  // — que es exactamente el riesgo que hace que `data/rankings/` tenga un
  // chequeo P1 en `tools/audit.js`.
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
      // No se rechaza: una liga sin ranking no es un error del sitio, es una liga
      // sin datos, y la vista ya sabe dibujar ese caso. Rechazar obligaría a cada
      // llamador a un catch que igual terminaría mostrando lo mismo.
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
  // El ejercicio que conviene mostrar por default: el de MÁS clubes cargados, y
  // entre empatados el más reciente. Ver la cabecera para el porqué.
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
      render();
    });
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  function render(){
    var wrap = $('ligaWrap');
    if(!wrap) return;
    if(chartInst){ chartInst.destroy(); chartInst = null; }
    wrap.innerHTML = '';
    if(!st.league){ wrap.appendChild(estadoFrio()); return; }

    var r = rankingDe(st.league, st.year);
    if(!r){
      wrap.appendChild(el('p', 'liga-vacio', t('liga.nodata',
        'Todavía no hay ningún ejercicio cargado de esta liga.')));
      wrap.appendChild(estadoFrio());
      return;
    }

    wrap.appendChild(encabezado(r));
    wrap.appendChild(grafico(r));
    wrap.appendChild(tabla(r));
    wrap.appendChild(salvedades(r));
  }

  // EL ESTADO FRÍO. La pestaña Ligas se ve siempre (no necesita club), así que se
  // puede llegar por el nav sin haber elegido nada. En vez de una pantalla vacía
  // o de un "elegí algo", se ofrecen las ligas que existen: `LEAGUES` es eager,
  // así que esto no cuesta ni un pedido de red.
  function estadoFrio(){
    var caja = el('div', 'liga-frio');
    caja.appendChild(el('p', 'liga-frio-t', t('liga.pick', 'Elegí una liga')));
    var grid = el('div', 'liga-frio-grid');
    Object.keys(window.LEAGUES || {}).sort(function(a, b){
      var A = ligaDe(a), B = ligaDe(b);
      return (A.tier - B.tier) || A.name.localeCompare(B.name, 'es', {sensitivity:'base'});
    }).forEach(function(lid){
      var lg = ligaDe(lid), co = paisDe(lid);
      var b = el('button', 'liga-frio-btn');
      b.type = 'button';
      b.appendChild(el('span', 'liga-frio-flag', co.flag || '🏆'));
      b.appendChild(el('span', 'liga-frio-n', lg.name));
      b.appendChild(el('span', 'liga-frio-m',
        (co.key ? t(co.key, co.name) : '') + ' · ' + (window.tierLabel ? window.tierLabel(lg.tier) : '')));
      b.addEventListener('click', function(){ show(lid); });
      grid.appendChild(b);
    });
    caja.appendChild(grid);
    return caja;
  }

  // EL ENCABEZADO. Convención tomada de Our World in Data: el título es la
  // métrica y el sujeto, el subtítulo dice la cobertura y la unidad, y las dos
  // cosas están en prosa, no en un tooltip.
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

    // "N de M" SOLO si `leagueSize` existe. En 24 de las 27 liga-temporadas nadie
    // verificó cuántos equipos la jugaron, y en esas el sitio dice cuántos tiene
    // cargados y NADA MÁS: inventar el M (por ejemplo, asumir el tamaño de hoy)
    // sería el dato inventado que `data/club-leagues.js` existe para no inventar.
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

  // EL SELECTOR DE EJERCICIO, y cada opción dice cuántos clubes trae. Sin eso,
  // cambiar de año es elegir a ciegas: "2025" y "2024" se ven igual de buenos
  // hasta que uno tiene 5 clubes y el otro 8.
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

  // EL GRÁFICO. Chart.js, el mismo que ya usa el resto del sitio; una sola serie
  // con `backgroundColor` como ARRAY, que es como se pinta cada barra de su
  // color (mismo truco que `drawInicioMetricChart()` en js/finanzas-render.js
  // usa para atenuar los años de presupuesto).
  function grafico(r){
    var caja = el('div', 'liga-chart-card');
    var head = el('div', 'liga-chart-head');
    head.appendChild(el('span', 'liga-chart-y', 'M USD'));
    caja.appendChild(head);
    var box = el('div', 'liga-chart-box');
    var cv = document.createElement('canvas');
    cv.id = 'ligaChart';
    box.appendChild(cv);
    caja.appendChild(box);

    if(typeof Chart === 'undefined') return caja;

    // ASCENDENTE, pedido de Guido: el dato se guarda descendente (puesto 1
    // primero, que es el orden de la tabla) y acá se invierte.
    var filas = r.clubs.slice().reverse();
    // El color de marca de cada club (Versión 178). `brandColor` es opcional a
    // propósito: Real Madrid y Once Caldas llevan `null` porque el color que los
    // identifica es el blanco. Esos caen al azul del sitio, que es el mismo
    // fallback que usa `pintarCrest()` en js/selector.js.
    var colores = filas.map(function(f){ return clubDe(f.id).brandColor || '#0a2b5c'; });

    // El total arriba de cada barra. Ver la cabecera: sin esto, en LaLiga la
    // mitad de las barras son un hilo y no se puede leer ningún número.
    var etiquetas = {
      id:'ligaValueLabels',
      afterDatasetsDraw: function(chart){
        var c = chart.ctx, meta = chart.getDatasetMeta(0);
        c.save();
        c.font = '600 11px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif';
        c.fillStyle = '#1c1c1c';
        c.textAlign = 'center';
        c.textBaseline = 'bottom';
        meta.data.forEach(function(bar, i){
          var v = filas[i].revenue;
          c.fillText(v >= 1000 ? (v / 1000).toFixed(2) + ' MM' : v.toFixed(1), bar.x, bar.y - 4);
        });
        c.restore();
      }
    };

    setTimeout(function(){
      var ctx = document.getElementById('ligaChart');
      if(!ctx) return;
      chartInst = new Chart(ctx.getContext('2d'), {
        type:'bar',
        data:{
          labels: filas.map(function(f){ return nombreDe(f.id); }),
          datasets:[{ label:t('liga.revenue', 'Ingresos'), data: filas.map(function(f){ return f.revenue; }),
                      backgroundColor: colores, borderWidth:0 }]
        },
        options:{
          responsive:true, maintainAspectRatio:false, layout:{padding:{top:26}},
          plugins:{
            legend:{display:false},
            tooltip:{ callbacks:{
              label: function(c){ return fmtM(c.parsed.y); },
              // El tooltip dice el ejercicio DE ESE CLUB. No todos cierran el
              // mismo día, y el encabezado solo dice el año del ranking.
              afterLabel: function(c){ return etiquetaEjercicio(filas[c.dataIndex]); }
            } }
          },
          scales:{
            y:{ beginAtZero:true, title:{display:false} },
            // ROTACIÓN FIJA EN 45°, no un rango. Con `minRotation:0` Chart.js
            // decide cuánto rotar y se queda corto: con 8 clubes argentinos
            // "Vélez Sarsfield" se pisaba con "Estudiantes de La Plata", y con
            // los 10 japoneses o los 20 de una liga entera sería ilegible.
            // `autoSkip:false` porque acá saltear una etiqueta es saltear un
            // club del ranking, que es justo lo que no puede pasar.
            x:{ title:{display:false},
                ticks:{ maxRotation:45, minRotation:45, autoSkip:false, font:{size:11} } }
          },
          // Cada barra linkea a su club: el ranking es superficie de navegación,
          // no una foto. Es lo que hacen CoinMarketCap y companiesmarketcap, y es
          // lo que hace que se gane el lugar en una portada (to-do 33).
          onClick: function(e, act){
            if(!act.length) return;
            irAlClub(filas[act[0].index].id);
          }
        },
        plugins:[etiquetas]
      });
    }, 0);
    return caja;
  }

  // EL SALTO AL CLUB. La vista de liga no conoce el nav ni sabe cargar un club:
  // se lo pide al hook que le pasó index.html, igual que hace js/selector.js.
  var api = { pickClub: function(){ return Promise.resolve(); }, goFinanzas: function(){} };
  function irAlClub(clubId){
    Promise.resolve(api.pickClub(clubId)).then(function(){ api.goFinanzas(); });
  }

  // LA TABLA. Es donde el dato de un club chico sigue siendo legible: en LaLiga
  // la barra de Alavés es 1/18 de la de Real Madrid, pero su fila se lee igual
  // que las demás.
  function tabla(r){
    var caja = el('div', 'liga-tabla-card');
    var tb = el('table', 'liga-tabla');
    var trh = el('tr');
    [['#', 'liga-col-n'], [t('liga.club', 'Club'), ''], [t('liga.revenue', 'Ingresos'), 'num'],
     [t('liga.exerciseCol', 'Ejercicio'), ''], [t('liga.doc', 'Documento'), '']]
      .forEach(function(c){ trh.appendChild(el('th', c[1], c[0])); });
    var thead = el('thead'); thead.appendChild(trh); tb.appendChild(thead);

    var tbody = el('tbody');
    var total = 0;
    r.clubs.forEach(function(f, i){
      total += f.revenue;
      var tr = el('tr');
      tr.appendChild(el('td', 'liga-col-n', String(i + 1)));

      var tdc = el('td');
      var pin = el('span', 'liga-pin');
      pin.style.background = clubDe(f.id).brandColor || '#0a2b5c';
      tdc.appendChild(pin);
      var a = el('button', 'liga-club-link', nombreDe(f.id));
      a.type = 'button';
      a.addEventListener('click', function(){ irAlClub(f.id); });
      tdc.appendChild(a);
      tr.appendChild(tdc);

      tr.appendChild(el('td', 'num', fmtM(f.revenue)));
      tr.appendChild(el('td', 'liga-col-ej', etiquetaEjercicio(f)));

      // EL TIPO DE DOCUMENTO NO ES DECORACIÓN. En el ranking de la Primera 2024,
      // el puesto 1 (River) es `unofficial_mirror` —una copia no oficial— y el 7
      // (San Lorenzo) es un PRESUPUESTO, o sea una proyección del club sentada
      // entre balances cerrados. Sin esta columna, las tres cosas se leen igual.
      var tdd = el('td', 'liga-col-doc');
      var esp = f.reportType === 'official_budget';
      var noOf = f.reportType === 'unofficial_mirror';
      var et = el('span', 'liga-doc' + (esp ? ' presu' : '') + (noOf ? ' nooficial' : ''),
        t('fuentes.tipo.' + f.reportType, (window.sourceTypeLabel ? window.sourceTypeLabel(f.reportType) : f.reportType)));
      tdd.appendChild(et);
      // El link va a la página estática de fuentes de ese club, que ya existe y
      // se genera sola (`tools/generate-fuentes-page.js`). NO a `sources{}`: esa
      // tabla solo tiene los clubes cuyo data file está cargado, y esta vista a
      // propósito no carga ninguno.
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
    // "TOTAL de los N cargados", nunca "total de la liga": son cosas distintas y
    // la diferencia es todo el punto de esta pantalla.
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

  // LAS SALVEDADES. Mismo criterio que la pestaña Comparar: dos números grandes
  // uno al lado del otro parecen comparables aunque no lo sean, así que lo que
  // los hace no comparables se escribe, no se deja implícito. El modelo es la
  // sección "Basis of preparation" del Deloitte Football Money League.
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
      // Singular y plural aparte: "1 de estos ejercicios son PRESUPUESTOS" se lee
      // como un error de la página, y una salvedad que se lee como un error deja
      // de creerse, que es justo lo contrario de para qué está.
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

    // CUÁNTO DE ESTE RANKING NO ESTÁ DESGLOSADO. Es el aviso que la J1 necesita:
    // la J.League publica por club el total, el patrocinio y la recaudación, y
    // todo lo demás solo por división, así que casi la mitad del ingreso del
    // ranking es un bolsón.
    // OJO: el bolsón se identifica por su ETIQUETA, que es la clave con la que el
    // sitio entero matchea los buckets (ver data/site-labels.js). Si se renombra
    // el bucket en js/finanzas-calc.js hay que renombrarlo acá, y este aviso
    // degrada a no mostrarse: no rompe nada, pero deja de avisar.
    var LUMP = 'Fútbol profesional (sin desglosar por la fuente)';
    var tot = 0, lump = 0;
    r.clubs.forEach(function(f){
      tot += f.revenue;
      f.mix.forEach(function(m){ if(m[0] === LUMP) lump += m[1]; });
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
  function init(hooks){
    api.pickClub = (hooks && hooks.pickClub) || api.pickClub;
    api.goFinanzas = (hooks && hooks.goFinanzas) || api.goFinanzas;
  }

  return {
    init: init,
    show: show,
    // La llama index.html después de un cambio de idioma, igual que
    // `CLUB_SELECTOR.refresh()`.
    refresh: render,
    current: function(){ return { league: st.league, year: st.year }; }
  };
})();

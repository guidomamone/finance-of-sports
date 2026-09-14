// ============================================================================
// js/comparar-clubes.js — COMPARACIÓN ENTRE CLUBES (Versión 137).
//
// OJO, NO CONFUNDIR con "Comparar Gestiones" (js/finanzas-render.js), que compara
// dos PRESIDENCIAS del MISMO club. Esto compara clubes distintos entre sí.
//
// LA UNIDAD COMPARABLE ES (CLUB, EJERCICIO), NO EL CLUB. Es la decisión que ordena
// todo lo demás, y sale de dos cosas que Guido levantó y resultaron ser la misma:
// "en el comparador falta el año, podría ser que alguien quiera comparar River de
// un año contra otro equipo, otro año", y "los clubes suben y bajan de categoría,
// no se account for that". Con el par como sujeto, las dos se caen solas:
//   - cada barra lleva su ejercicio, así que un club sin año deja de ser un
//     promedio de nada;
//   - "River 2020/21 vs River 2024/25" no es una feature especial: son dos sujetos
//     de la lista, igual que dos clubes distintos;
//   - la liga es un atributo del PAR (`leagueAt(club, año)`), así que "Mirassol
//     Série B 2024" y "Mirassol Série A 2025" conviven sin contradecirse.
// Y por lo mismo, el promedio de liga es (LIGA, EJERCICIO), nunca liga sola:
// "Promedio Série B" sin año no significa nada si los integrantes cambian cada año.
//
// UN SOLO MODELO PARA LOS 3 CASOS que pidió Guido (1 vs 1, N clubes, y club contra
// benchmark de liga). `subjects` es una lista de sujetos comparables, cada uno de
// una de dos formas:
//     { kind:'club',  id:'river',   year:2021 }
//     { kind:'bench', id:'ar-primera', year:2025, stat:'avg' }   // o 'median'
// El MODO (Duelo / Múltiple / Benchmark / Mixto) se DEDUCE de la lista, no se elige
// en un menú: el visitante elige con quién comparar y la vista se acomoda. Eso es
// lo que hace que "los tres casos" no cuesten tres veces.
//
// LAS 3 REGLAS DE COMPARABILIDAD, que no son opcionales:
//  1. MONEDA: la comparación fuerza USD, sin importar el toggle del header. Hay
//     precedente explícito: "Comparar Gestiones" ya ignora ese toggle a propósito
//     (`displayFinancialsForClub`, js/finanzas-calc.js). Una comparación a mitad en
//     ARS de un club y en JPY de otro no es una comparación.
//  2. CATEGORÍAS: solo tiene sentido en "Formato simplificado"
//     (`simplifiedReportForClub`), nunca en "Formato del club": los rubros crudos de
//     un balance argentino y uno japonés no son la misma cosa.
//  3. EJERCICIO: los clubes no cierran el mismo día ni tienen los mismos años
//     cargados. Por default, el último ejercicio REAL de cada uno, editable por
//     sujeto, con el año escrito al lado de cada barra. No se esconde alineando por
//     año calendario.
// Las 3 se dicen en pantalla (`#cmpRules`), no solo se aplican.
//
// "SIN DATO" NO ES CERO. Un club cuyo documento no informa deuda muestra "sin dato",
// no "0.0 M USD": un cero se lee como un dato y este sitio no muestra datos que no
// tiene. Mismo criterio que ya usa `sourceCaveats()` para las salvedades.
// ============================================================================

window.CLUB_COMPARE = (function(){
  'use strict';

  var MAX = 4;               // 4 rivales + el club activo = 5 sujetos
  var subjects = [];         // los RIVALES; el club activo es siempre el sujeto 0 y no se puede sacar
  var snapshot = null;       // estado al abrir el panel, para el botón Cancelar
  var view = 'bars';
  var api = {
    getClub: function(){ return null; },
    getYear: function(){ return null; },
    setYear: function(){},
    openPanel: function(){},
    closePanel: function(){}
  };

  // Color POR POSICIÓN, no por club: el color real de los 41 clubes es dato que
  // habría que verificar uno por uno (ver el comentario de `.crest` en index.html).
  // Por posición además es más legible: el 1º es siempre el mismo color en todos los
  // indicadores, que es lo que hace seguible una grilla de barras.
  var COLORS = ['#0a2b5c', '#b5372b', '#1b7a3d', '#8a5cf6', '#2b8a99'];
  var BENCH_COLOR = '#f2b705';

  function $(id){ return document.getElementById(id); }
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }
  function nameOf(id){ return (clubs[id] && clubs[id].displayName) || id; }
  function initials(name){
    var w = String(name || '').replace(/[^A-Za-zÀ-ÿ ]/g, '').split(/\s+/).filter(Boolean);
    return (w.slice(0, 2).map(function(x){ return x[0]; }).join('') || '··').toUpperCase();
  }
  function esc(s){
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---------------------------------------------------------------------------
  // EJERCICIOS
  // ---------------------------------------------------------------------------

  // Los ejercicios REALES de un club, descendente. Excluye placeholder y
  // pending_official (`yearKindForClub` === 'blank'): comparar un placeholder es
  // comparar nada. Requiere que el archivo del club esté cargado.
  function realYears(clubId){
    var gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    if(!gd || !gd.fiscalYearMeta) return [];
    return Object.keys(gd.fiscalYearMeta).map(Number)
      .filter(function(y){ return yearKindForClub(clubId, y) !== 'blank'; })
      .sort(function(a, b){ return b - a; });
  }

  // El ejercicio del club ACTIVO. Sigue al `<select>` de Año de Finanzas, para que
  // Inicio, Finanzas y la comparación usen UN estado y no uno propio cada una. Si
  // ahí hay un ejercicio placeholder elegido, cae al último real: una comparación
  // contra un placeholder mostraría ceros que se leen como datos.
  function activeYear(){
    var id = api.getClub();
    if(!id) return null;
    var sel = api.getYear();
    var years = realYears(id);
    if(sel != null && years.indexOf(Number(sel)) >= 0) return Number(sel);
    return years.length ? years[0] : null;
  }

  function activeSubject(){
    var id = api.getClub();
    if(!id) return null;
    var y = activeYear();
    return y == null ? null : { kind:'club', id:id, year:y, active:true };
  }

  function allSubjects(){
    var a = activeSubject();
    return a ? [a].concat(subjects) : subjects.slice();
  }

  // ---- UNICIDAD (club, ejercicio) --------------------------------------------
  // La identidad de un sujeto es el PAR, no el club. El mismo club dos veces con
  // años distintos es válido y es justamente el caso que pidió Guido; el mismo club
  // dos veces con el MISMO año no es una comparación, es la misma barra dibujada dos
  // veces. Hay CUATRO caminos por los que se puede llegar a un duplicado, y los
  // cuatro pasan por acá: el "+" del panel, el atajo "+ Otro año", el `<select>` de
  // cada chip, y el `<select>` de Año de Finanzas (el club activo TAMBIÉN ocupa un
  // ejercicio). En una versión anterior del prototipo faltaba, y se podía comparar
  // un club contra sí mismo en el mismo ejercicio: lo encontró Guido.
  function usedYears(clubId){
    var used = {};
    var a = activeSubject();
    if(a && a.id === clubId) used[a.year] = true;
    subjects.forEach(function(s){ if(s.kind === 'club' && s.id === clubId) used[s.year] = true; });
    return used;
  }

  function freeYear(clubId, ignore){
    var used = usedYears(clubId);
    if(ignore != null) delete used[ignore];
    var ys = realYears(clubId);
    for(var i = 0; i < ys.length; i++){ if(!used[ys[i]]) return ys[i]; }
    return null;
  }

  function canAddYear(clubId){ return freeYear(clubId) !== null; }

  // El motivo por el que NO se puede agregar este club, o null si sí se puede. Un
  // botón que al tocarlo no hace nada es peor que un botón deshabilitado con el
  // motivo escrito.
  function blockReason(clubId){
    if(has('club', clubId)) return null;            // ya está: el botón sirve para sacarlo
    if(!realYears(clubId).length) return null;      // todavía no se cargó su archivo: se resuelve al agregarlo
    if(freeYear(clubId) !== null) return null;
    var n = realYears(clubId).length;
    return n === 1
      ? t('cmp.block.one', 'Solo tiene 1 ejercicio cargado, y ya lo estás viendo')
      : t('cmp.block.all', 'Ya están todos sus ejercicios en la comparación');
  }

  // ---------------------------------------------------------------------------
  // ALTA Y BAJA DE SUJETOS
  // ---------------------------------------------------------------------------
  function has(kind, id){
    return subjects.some(function(s){ return s.kind === kind && s.id === id; });
  }

  function toggleClub(clubId){
    if(has('club', clubId)){
      subjects = subjects.filter(function(s){ return !(s.kind === 'club' && s.id === clubId); });
      return render();
    }
    // Se carga primero: sin su archivo no se sabe qué ejercicios tiene, y el sujeto
    // entra con el primer ejercicio LIBRE (para el club activo, el anterior al que
    // estás viendo: compararlo contra sí mismo en el mismo año no dice nada).
    return loadClubData(clubId).then(function(){
      var y = freeYear(clubId);
      if(y === null) return render();
      if(subjects.length >= MAX) subjects.shift();
      subjects.push({ kind:'club', id:clubId, year:y });
      return render();
    });
  }

  function addAnotherYear(clubId){
    var y = freeYear(clubId);
    if(y === null) return Promise.resolve();
    if(subjects.length >= MAX) subjects.shift();
    subjects.push({ kind:'club', id:clubId, year:y });
    return render();
  }

  function toggleBench(leagueId){
    if(has('bench', leagueId)){
      subjects = subjects.filter(function(s){ return !(s.kind === 'bench' && s.id === leagueId); });
      return render();
    }
    if(subjects.length >= MAX) subjects.shift();
    // Año por default: el del club activo si esa liga tiene al menos 2 integrantes
    // ese ejercicio; si no, el más reciente que sí tenga con qué promediar. Un
    // "promedio" de un solo club no es un promedio.
    var ys = leagueYears(leagueId);
    var act = activeYear();
    var year = (act != null && clubsOfLeagueYear(leagueId, act).length >= 2) ? act
             : (ys.filter(function(y){ return clubsOfLeagueYear(leagueId, y).length >= 2; })[0]);
    if(year == null) year = ys[0];
    if(year == null) return Promise.resolve();
    subjects.push({ kind:'bench', id:leagueId, year:year, stat:'avg' });
    return render();
  }

  function removeAt(i){ subjects.splice(i, 1); return render(); }
  function clear(){ subjects = []; return render(); }
  function count(){ return subjects.length; }
  function takeSnapshot(){ snapshot = subjects.map(function(s){ return Object.assign({}, s); }); }
  function restoreSnapshot(){
    subjects = (snapshot || []).map(function(s){ return Object.assign({}, s); });
    return render();
  }

  // ---------------------------------------------------------------------------
  // ETIQUETAS
  // ---------------------------------------------------------------------------
  function yearLabel(clubId, year){
    // No se reimplementa el criterio de año calendario vs. temporada partida:
    // `isCalendarYearClub()` ya lo decide para todo el sitio.
    return isCalendarYearClub(clubId) ? String(year) : (year - 1) + '/' + year;
  }

  // El ejercicio de una liga se escribe con el mismo formato que el de sus clubes
  // ("2024/2025" en Argentina, "2024" en Brasil): se toma de cualquier integrante de
  // esa liga, que por definición comparten temporada. Antes el chip decía "2024/2025"
  // y la barra "2025" para el mismo sujeto.
  function benchYearLabel(leagueId, year){
    var any = benchMembers(leagueId, year)[0] || clubsOfLeague(leagueId).filter(function(id){ return clubs[id]; })[0];
    return any ? yearLabel(any, year) : String(year);
  }

  function benchLabel(s){
    var lg = (LEAGUES[s.id] || {}).name || s.id;
    // SIEMPRE se dice cuál de los dos es: en una liga con 2 clubes cargados
    // (Colombia hoy) la diferencia entre promedio y mediana es enorme, y un
    // "promedio" sin aclarar es engañoso.
    return (s.stat === 'avg' ? t('cmp.avg', 'Prom.') : t('cmp.median', 'Mediana')) + ' ' + lg;
  }

  function subjectName(s){ return s.kind === 'club' ? nameOf(s.id) : benchLabel(s); }

  // El año, y para un club la liga que jugó ESE ejercicio cuando no es la de sus
  // otros ejercicios. Es donde el ascenso/descenso se vuelve visible.
  // La liga se nombra SOLO cuando aporta: si los sujetos están todos en la misma
  // categoría, repetirla en cada barra es ruido. Aporta cuando la comparación cruza
  // más de una liga, o cuando ese club tiene ejercicios en más de una (ahí el año
  // solo no alcanza para saber en qué categoría se generó esa plata).
  function subjectYearLabel(s){
    if(s.kind === 'bench'){
      var n = benchMembers(s.id, s.year).length;
      return benchYearLabel(s.id, s.year) + ' · ' + n + ' ' + t('cmp.clubs', 'clubes');
    }
    var lbl = yearLabel(s.id, s.year);
    var lg = leagueAt(s.id, s.year);
    if(!lg) return lbl;
    var ligas = {};
    allSubjects().forEach(function(x){
      var l = x.kind === 'bench' ? x.id : leagueAt(x.id, x.year);
      if(l) ligas[l] = true;
    });
    var aporta = Object.keys(ligas).length > 1 || leaguesOfClub(s.id).length > 1;
    return aporta ? lbl + ' · ' + ((LEAGUES[lg] || {}).name || lg) : lbl;
  }

  function subjectColor(s, i){ return s.kind === 'bench' ? BENCH_COLOR : COLORS[i % COLORS.length]; }

  // ---------------------------------------------------------------------------
  // LOS DATOS. Todo en USD (regla 1) y por "Formato simplificado" (regla 2).
  // ---------------------------------------------------------------------------

  // Los clubes que hay que tener en memoria para dibujar la comparación: los
  // sujetos, más los integrantes de cada liga con benchmark ESE año. Se cargan en
  // PARALELO (Promise.all), no en cascada.
  function clubsToLoad(){
    var need = {};
    allSubjects().forEach(function(s){
      if(s.kind === 'club') need[s.id] = true;
      else clubsOfLeagueYear(s.id, s.year).forEach(function(c){ if(clubs[c]) need[c] = true; });
    });
    return Object.keys(need);
  }

  function ensureLoaded(){
    return Promise.all(clubsToLoad().map(function(id){
      return loadClubData(id).catch(function(e){ console.error('[comparación] no se pudo cargar', id, e); });
    }));
  }

  // Los 6 indicadores. `nodata` (y no 0) cuando la fuente no lo informa.
  var METRICS = [
    { key:'revenue', label:'Ingresos', i18n:'cmp.m.revenue', better:'high', unit:'money' },
    { key:'expenses', label:'Gastos', i18n:'cmp.m.expenses', better:'low', unit:'money',
      note:'Incluye amortizaciones y depreciación, igual que el total de la tabla de Finanzas.', noteKey:'cmp.m.expenses.note' },
    { key:'pat', label:'Resultado del ejercicio', i18n:'cmp.m.pat', better:'high', unit:'money', signed:true },
    { key:'wagesPct', label:'Masa salarial / Ingresos', i18n:'cmp.m.wages', better:'low', unit:'pct',
      note:'Cuánto de lo que entra se va en sueldos del plantel.', noteKey:'cmp.m.wages.note' },
    { key:'netDebt', label:'Deuda neta', i18n:'cmp.m.netdebt', better:'low', unit:'money', signed:true,
      note:'Deuda bruta menos caja. Negativa quiere decir más caja que deuda.', noteKey:'cmp.m.netdebt.note' },
    { key:'perMember', label:'Ingreso por socio', i18n:'cmp.m.permember', better:'high', unit:'usd',
      note:'Solo para los clubes que publican su padrón de socios.', noteKey:'cmp.m.permember.note' }
  ];

  // Los 6 indicadores de UN club-ejercicio, en USD. `null` = la fuente no lo dice.
  function financialsFor(clubId, year){
    var c = computeYearGeneric(clubId, year);
    if(!c) return null;
    var meta = yearMetaFor(clubId, year);
    var usd = function(v){ return toDisplayValue(v, meta, 'USD'); };
    // "No informa deuda ni caja": mismo test que usa sourceCaveats() en
    // data/sources-view.js para derivar esa salvedad. Con los dos en null, la deuda
    // neta que devuelve el motor es 0 por construcción, y un 0 acá se leería como
    // "este club no debe nada".
    // Los DOS en null es "el documento no informa deuda ni caja", el mismo test que
    // usa sourceCaveats() en data/sources-view.js. Los dos en CERO exacto es el mismo
    // hecho escrito distinto: pasa en los presupuestos (Boca 2026/27, Racing 2025/26 y
    // 2026/27), que proyectan ingresos y egresos y no proyectan un balance. Un club de
    // primera división con deuda bruta y caja exactamente cero no existe, y publicar
    // "Deuda neta: 0.0 M USD" se lee como "este club no debe nada", que es falso.
    // OJO: esto lo corrige la VISTA. El dato sigue diciendo 0 en el archivo del club,
    // y otras vistas lo muestran como 0 (ver la to-do de index.html).
    var sinDeuda = (c.meta.grossDebt == null && c.meta.cash == null)
                || (c.meta.grossDebt === 0 && c.meta.cash === 0);
    // Un club con masa salarial 0 no existe: si da 0 es que el documento no la
    // desglosa (pasa con river 2024, cuyos 8 rubros de gasto están todos en
    // `other_expenses`, etiquetados por sector). Ver to-do 20(f) y 20(h).
    var sinSalarios = !c.wages;
    var socios = (typeof memberCountByClub !== 'undefined') ? memberCountByClub[clubId] : null;
    var revenueUsd = usd(c.revenue);
    return {
      revenue: revenueUsd,
      expenses: Math.abs(usd(c.expenses + c.nonCash)),
      pat: usd(c.pat),
      wagesPct: sinSalarios ? null : Math.abs(c.wages / c.revenue) * 100,
      netDebt: sinDeuda ? null : usd(c.netDebt),
      // Ingresos en USD son millones; el ingreso por socio va en USD enteros.
      perMember: socios ? (revenueUsd * 1e6) / socios : null
    };
  }

  // La composición de ingresos de un club-ejercicio, en USD y por "Formato
  // simplificado", que es la única taxonomía comparable entre clubes.
  function mixFor(clubId, year){
    var rows = (simplifiedReportForClub(clubId, year) || {}).ingresos || [];
    var meta = yearMetaFor(clubId, year);
    var out = rows.map(function(r){
      return { label:r.label, value: toDisplayValue(r.value, meta, 'USD') };
    }).filter(function(r){ return r.value > 0; });
    var total = out.reduce(function(s, r){ return s + r.value; }, 0);
    return { rows:out, total:total };
  }

  // Los integrantes REALES de una liga en un ejercicio: los que ese año jugaron esa
  // categoría Y tienen ese ejercicio cargado. No es `clubsOfLeague()`.
  function benchMembers(leagueId, year){
    return clubsOfLeagueYear(leagueId, year).filter(function(id){
      return clubs[id] && realYears(id).indexOf(year) >= 0;
    });
  }

  // El agregado de una liga-ejercicio. Los sujetos sin dato para ese indicador
  // quedan afuera del promedio en vez de contar como cero.
  function benchFinancials(s){
    var members = benchMembers(s.id, s.year);
    var out = {};
    METRICS.forEach(function(m){
      var vals = members.map(function(id){
        var f = financialsFor(id, s.year);
        return f ? f[m.key] : null;
      }).filter(function(v){ return v != null && isFinite(v); }).sort(function(a, b){ return a - b; });
      if(!vals.length){ out[m.key] = null; return; }
      out[m.key] = s.stat === 'median'
        ? (vals.length % 2 ? vals[(vals.length - 1) / 2] : (vals[vals.length / 2 - 1] + vals[vals.length / 2]) / 2)
        : vals.reduce(function(a, b){ return a + b; }, 0) / vals.length;
    });
    out.__n = members.length;
    return out;
  }

  function valuesFor(s){
    return s.kind === 'club' ? financialsFor(s.id, s.year) : benchFinancials(s);
  }

  function fmtMetric(v, m){
    if(v == null || !isFinite(v)) return null;
    if(m.unit === 'pct') return v.toFixed(0) + '%';
    if(m.unit === 'usd') return Math.round(v).toLocaleString('es-AR') + ' USD';
    return (m.signed && v > 0 ? '+' : v < 0 ? '-' : '') + Math.abs(v).toFixed(1) + ' M USD';
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  function render(){
    return ensureLoaded().then(draw);
  }

  function draw(){
    renderTray();
    renderCta();
    renderConfirm();
    renderCompare();
    if(window.CLUB_SELECTOR && window.CLUB_SELECTOR.refresh) window.CLUB_SELECTOR.refresh();
  }

  function crestSpan(s, i){
    if(s.kind === 'bench') return '<span style="font-size:12px;padding-left:4px" aria-hidden="true">&#128202;</span>';
    return '<span class="cmp-crest" style="background:' + subjectColor(s, i) + '">' + esc(initials(nameOf(s.id))) + '</span>';
  }

  // ---- bandeja ----
  function renderTray(){
    var tray = $('cmpTray');
    var active = api.getClub();
    tray.hidden = !subjects.length || !active;
    $('compareBtn').classList.toggle('on', !!subjects.length);
    if(tray.hidden) return;

    var wrap = $('trayChips');
    wrap.innerHTML = '';
    var all = allSubjects();

    all.forEach(function(s, i){
      var el = document.createElement('span');
      el.className = 'chip' + (s.kind === 'bench' ? ' bench' : '');
      el.innerHTML = crestSpan(s, i) + '<span class="chip-name">' + esc(subjectName(s)) + '</span>';
      if(s.kind === 'club'){
        el.appendChild(yearSelect(realYears(s.id), s.year, s.id, function(y){
          if(s.active) api.setYear(y); else s.year = y;
          render();
        }, s.id, s.year));
      } else {
        // Cada ejercicio de la liga dice con cuántos clubes se calcula: en esta liga
        // hay años con 5 integrantes cargados y años con 1, y un "promedio" de un solo
        // club no es un promedio. El visitante lo ve antes de elegir el año.
        var ys = leagueYears(s.id);
        el.appendChild(benchYearSelect(s));
        var tg = document.createElement('button');
        tg.type = 'button';
        tg.className = 'chip-stat';
        tg.textContent = s.stat === 'avg' ? t('cmp.avg.short', 'prom.') : t('cmp.median.short', 'med.');
        tg.title = t('cmp.stat.toggle', 'Alternar promedio / mediana');
        tg.addEventListener('click', function(ev){
          ev.stopPropagation();
          s.stat = s.stat === 'avg' ? 'median' : 'avg';
          render();
        });
        el.appendChild(tg);
      }
      if(!s.active){
        var x = document.createElement('button');
        x.type = 'button';
        x.className = 'x';
        x.title = t('cmp.remove', 'Sacar de la comparación');
        x.textContent = '×';
        x.addEventListener('click', function(){ removeAt(i - 1); });
        el.appendChild(x);
      }
      wrap.appendChild(el);
    });

    // "+ Otro año" solo existe si al club activo le queda algún ejercicio libre. Con
    // un solo ejercicio cargado (30 de los 41 clubes) es imposible, y un botón que no
    // hace nada es peor que un botón que no está.
    $('trayAddYear').hidden = !canAddYear(active);

    // El modo se DEDUCE, no se elige.
    var nClubs = subjects.filter(function(s){ return s.kind === 'club'; }).length;
    var nBench = subjects.length - nClubs;
    var mode, hint;
    if(nBench && !nClubs){ mode = t('cmp.mode.bench', 'Benchmark'); hint = t('cmp.mode.bench.hint', 'club contra su liga'); }
    else if(nBench && nClubs){ mode = t('cmp.mode.mixed', 'Mixto'); hint = (nClubs + 1) + ' ' + t('cmp.clubs', 'clubes') + ' + ' + nBench + ' benchmark'; }
    else if(nClubs >= 2){ mode = t('cmp.mode.multi', 'Múltiple'); hint = (nClubs + 1) + ' ' + t('cmp.mode.multi.hint', 'clubes lado a lado'); }
    else { mode = t('cmp.mode.duel', 'Duelo'); hint = t('cmp.mode.duel.hint', '1 contra 1'); }
    $('cmpModePill').textContent = mode;
    $('cmpModeHint').textContent = hint;
  }

  function benchYearSelect(s){
    var sel = document.createElement('select');
    sel.className = 'chip-year';
    leagueYears(s.id).forEach(function(y){
      var n = benchMembers(s.id, y).length;
      var o = document.createElement('option');
      o.value = y;
      o.textContent = benchYearLabel(s.id, y) + ' · ' + n;
      o.title = n + ' ' + t('cmp.clubs', 'clubes');
      if(y === s.year) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function(e){ s.year = Number(e.target.value); render(); });
    sel.addEventListener('click', function(e){ e.stopPropagation(); });
    return sel;
  }

  // `uniqueFor`: los ejercicios ya ocupados por otra instancia del MISMO club se
  // deshabilitan, si no se llega al duplicado a mano después de haberlo evitado al
  // agregar (es el 3er y 4to camino de los cuatro, ver `usedYears`).
  function yearSelect(years, current, labelClub, onChange, uniqueFor, ignore){
    var sel = document.createElement('select');
    sel.className = 'chip-year';
    var taken = uniqueFor ? usedYears(uniqueFor) : {};
    if(ignore != null) delete taken[ignore];
    years.forEach(function(y){
      var o = document.createElement('option');
      o.value = y;
      o.textContent = labelClub ? yearLabel(labelClub, y) : String(y);
      if(y !== current && taken[y]){ o.disabled = true; o.textContent += ' ' + t('cmp.taken', '(ya está)'); }
      if(y === current) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function(e){ onChange(Number(e.target.value)); });
    sel.addEventListener('click', function(e){ e.stopPropagation(); });
    return sel;
  }

  // ---- tarjeta de invitación ----
  function renderCta(){
    var cta = $('cmpCta');
    var active = api.getClub();
    cta.hidden = !active || subjects.length > 0;
    if(cta.hidden) return;
    $('ccT').textContent = t('cmp.cta.title', 'Compará') + ' ' + nameOf(active) + ' ' + t('cmp.cta.title2', 'con otro club');
    $('ccYearBtn').hidden = !canAddYear(active);
  }

  // ---- barra de confirmación del panel ----
  function renderConfirm(){
    var bar = $('confirmBar'), foot = document.querySelector('.sel-foot');
    var on = addMode && $('clubPanel').classList.contains('open');
    bar.hidden = !on;
    // La barra REEMPLAZA a la leyenda mientras está visible, para no apilar dos
    // franjas en el borde de abajo del panel.
    foot.style.display = on ? 'none' : '';
    if(!on) return;
    var active = api.getClub();
    var sel = $('cfSel');
    if(!subjects.length){
      sel.innerHTML = '<span>' + t('cmp.confirm.empty', 'Todavía no elegiste a nadie. Tocá un club de la lista, o el + de una liga para su promedio.') + '</span>';
    } else {
      sel.innerHTML = '<span>' + esc(nameOf(active)) + ' ' + t('cmp.confirm.vs', 'contra:') + '</span>'
        + subjects.map(function(s, i){
            return '<span class="cf-chip">' + crestSpan(s, i + 1) + esc(subjectName(s))
                 + ' <span style="opacity:.65">' + esc(subjectYearLabel(s)) + '</span></span>';
          }).join('');
    }
    var ok = $('cmpOk');
    ok.disabled = !subjects.length;
    ok.textContent = subjects.length
      ? t('cmp.ok', 'Ver comparación') + ' (' + (subjects.length + 1) + ')'
      : t('cmp.ok', 'Ver comparación');
  }

  // ---- la comparación ----
  function renderCompare(){
    var card = $('compareCard'), mix = $('mixCard');
    var all = allSubjects();
    var show = subjects.length > 0 && all.length > 1;
    card.hidden = !show;
    mix.hidden = !show;
    if(!show) return;

    var vals = all.map(valuesFor);

    renderWarnings(all, vals);
    renderRules();
    renderBars(all, vals);
    renderTable(all, vals);
    renderMix(all);

    $('metricGrid').hidden = view !== 'bars';
    $('cmpTableWrap').hidden = view === 'bars';
    document.querySelectorAll('#cmpView button').forEach(function(b){
      b.classList.toggle('active', b.dataset.v === view);
    });
  }

  // LOS 3 AVISOS. Ninguno es opcional: este sitio lo usan periodistas, y una
  // comparación que se ve prolija y es falsa termina citada en una nota.
  function renderWarnings(all, vals){
    var w = [];

    // (1) SESGO DEL BENCHMARK. Un promedio calculado sobre los clubes cargados no es
    // el promedio de la liga: es el promedio de los clubes de esa liga que ESTE SITIO
    // tiene cargados ese año, y los que publican balance suelen ser los más grandes.
    all.forEach(function(s, i){
      if(s.kind !== 'bench') return;
      var n = vals[i].__n || 0;
      var total = (LEAGUES[s.id] || {}).totalClubs;
      if(!n){
        w.push('<b>' + esc(benchLabel(s)) + '</b>: ' + t('cmp.warn.bench.none', 'no hay ningún club de esa liga con ese ejercicio cargado.'));
        return;
      }
      // `totalClubs` está en null a propósito mientras nadie lo verifique (ver
      // data/leagues.js), así que el aviso dice "N clubes cargados" y no inventa
      // un denominador.
      w.push('<b>' + esc(benchLabel(s)) + '</b> ' + t('cmp.warn.bench.a', 'sale de los')
        + ' <b>' + n + (total ? ' ' + t('cmp.warn.bench.of', 'de') + ' ' + total : '') + '</b> '
        + t('cmp.warn.bench.b', 'clubes de esa liga con ese ejercicio cargado en este sitio, no de la liga entera. Los que publican balance suelen ser los más grandes, así que el número tiende a quedar alto.'));
    });

    // (2) EJERCICIOS DE AÑOS DISTINTOS. Es la trampa más peligrosa de las tres, y
    // aparece justamente en el caso que pidió Guido (el mismo club en dos años).
    var years = {};
    all.forEach(function(s){ years[s.year] = true; });
    var ys = Object.keys(years).map(Number).sort(function(a, b){ return b - a; });
    if(ys.length > 1){
      // Partido en dos claves porque los años van EN EL MEDIO: una sola clave con la
      // lista ya interpolada adentro es intraducible (el traductor recibiría el texto
      // con "2027, 2024" pegado y no podría moverlo de lugar).
      w.push(t('cmp.warn.years.a', 'Estás comparando <b>ejercicios de años distintos</b>')
        + ' (' + ys.join(', ') + '). '
        + t('cmp.warn.years.b', 'Cada uno se convierte a USD con el tipo de cambio que declara su propio documento, sin ajustar por inflación: la diferencia incluye el paso del tiempo, no solo al club.'));
    }

    // (3) CATEGORÍAS DISTINTAS. Si un sujeto jugó ese ejercicio en otra división que
    // el resto, se nombra explícito; y si hay divisiones distintas entre sí, se avisa
    // que TV y premios no son comparables uno a uno.
    var tiers = {}, byLeague = {};
    all.forEach(function(s){
      var lg = s.kind === 'bench' ? s.id : leagueAt(s.id, s.year);
      if(!lg) return;
      byLeague[lg] = true;
      var ti = (LEAGUES[lg] || {}).tier;
      if(ti != null) tiers[ti] = true;
    });
    if(Object.keys(tiers).length > 1){
      var detalle = all.filter(function(s){ return s.kind === 'club' && leagueAt(s.id, s.year); })
        .map(function(s){
          var lg = leagueAt(s.id, s.year);
          return esc(nameOf(s.id)) + ' ' + esc(yearLabel(s.id, s.year)) + ': <b>' + esc((LEAGUES[lg] || {}).name || lg) + '</b>';
        }).join(' · ');
      w.push(t('cmp.warn.tiers', 'Hay sujetos de <b>categorías distintas</b>: los ingresos por TV y los premios no son comparables uno a uno.') + ' ' + detalle);
    }

    // (4) PRESUPUESTO CONTRA BALANCE. No está en la lista original de 3 avisos porque
    // apareció probando: el ejercicio por default de Boca es su presupuesto 2026/27, y
    // comparar un pronóstico contra un balance auditado de otro club, sin decirlo, es
    // exactamente el tipo de comparación prolija y falsa que este sitio no puede
    // publicar.
    var presupuestos = all.filter(function(s){
      return s.kind === 'club' && reportTypeForYear(s.id, s.year) === 'official_budget';
    });
    if(presupuestos.length && presupuestos.length < all.length){
      w.push(presupuestos.map(function(s){
        return '<b>' + esc(nameOf(s.id)) + ' ' + esc(yearLabel(s.id, s.year)) + '</b>';
      }).join(', ') + ': ' + t('cmp.warn.budget', 'es un <b>presupuesto</b>, no un balance auditado. Son números que el club proyectó, no lo que efectivamente pasó.'));
    }

    var box = $('cmpWarn');
    box.hidden = !w.length;
    box.innerHTML = w.map(function(x){ return '<div>&#9888;&#65039; ' + x + '</div>'; }).join('');
  }

  // Las 3 reglas de comparabilidad se DICEN, no solo se aplican.
  function renderRules(){
    $('cmpRules').innerHTML = t('cmp.rules',
      'Todo en <b>USD</b> (la comparación ignora el toggle de moneda a propósito) y en <b>Formato simplificado</b>, '
      + 'la única taxonomía comparable entre clubes de países distintos. Cada sujeto muestra <b>su propio ejercicio</b>, '
      + 'escrito al lado de cada barra: los clubes no cierran el mismo día ni tienen los mismos años cargados.');
  }

  function renderBars(all, vals){
    var grid = $('metricGrid');
    grid.innerHTML = '';
    METRICS.forEach(function(m){
      var v = vals.map(function(x){ return x ? x[m.key] : null; });
      // El "mejor" se decide SOLO entre clubes: el benchmark no compite, es un
      // agregado.
      // El "mejor" se marca solo si hay AL MENOS DOS clubes con dato para ese
      // indicador: con uno solo, pintar de verde el único valor que existe sugiere que
      // ganó una comparación que no ocurrió. Pasa seguido, porque no todos los
      // documentos informan deuda, masa salarial o padrón de socios.
      var clubVals = v.filter(function(x, i){ return all[i].kind === 'club' && x != null && isFinite(x); });
      var best = clubVals.length >= 2 ? (m.better === 'high' ? Math.max.apply(null, clubVals) : Math.min.apply(null, clubVals)) : null;
      // Escala POR INDICADOR.
      var maxAbs = Math.max.apply(null, v.map(function(x){ return (x == null || !isFinite(x)) ? 0 : Math.abs(x); }).concat([0])) || 1;
      // La barra se centra en cero solo si ese indicador tiene de verdad algún valor
      // negativo: un "Resultado" que dio positivo en todos no necesita media barra vacía.
      var centrada = m.signed && v.some(function(x){ return x != null && x < 0; });

      var box = document.createElement('div');
      box.className = 'metric';
      box.innerHTML = '<div class="m-title">' + esc(t(m.i18n, m.label)) + '</div>'
        + '<div class="m-note">' + esc(m.note ? t(m.noteKey, m.note) : '') + '</div>';

      all.forEach(function(s, i){
        var val = v[i], isB = s.kind === 'bench';
        var row = document.createElement('div');
        row.className = 'mbar-row' + (isB ? ' is-bench' : '');
        var fill;
        if(val == null || !isFinite(val)){
          fill = 'width:0';
        } else if(centrada){
          var w = (Math.abs(val) / maxAbs) * 50;
          fill = 'position:absolute;top:0;bottom:0;' + (val >= 0
            ? 'left:50%;width:' + w + '%;background:' + subjectColor(s, i)
            : 'right:50%;width:' + w + '%;background:' + (isB ? BENCH_COLOR : 'var(--red)'));
        } else {
          fill = 'width:' + Math.max(1.5, (Math.abs(val) / maxAbs) * 100) + '%;background:' + subjectColor(s, i);
        }
        var txt = fmtMetric(val, m);
        row.innerHTML =
          '<div class="mbar-name">' + crestSpan(s, i)
            + '<span class="mbar-txt"><span class="mbar-nm">' + esc(subjectName(s)) + '</span>'
            + '<span class="mbar-yr">' + esc(subjectYearLabel(s)) + '</span></span></div>'
          + '<div class="mbar-track">' + (centrada ? '<div class="mbar-zero" style="left:50%"></div>' : '')
            + '<div class="mbar-fill' + (isB ? ' bench' : '') + '" style="' + fill + '"></div></div>'
          + '<div class="mbar-val' + (txt === null ? ' nodata' : (!isB && val === best ? ' best' : '')) + '">'
            + (txt === null ? esc(t('cmp.nodata', 'sin dato')) : esc(txt)) + '</div>';
        box.appendChild(row);
      });
      grid.appendChild(box);
    });
  }

  function renderTable(all, vals){
    var head = '<thead><tr><th>' + esc(t('cmp.indicator', 'Indicador')) + '</th>'
      + all.map(function(s){
          return '<th class="num' + (s.kind === 'bench' ? ' bench-col' : '') + '">' + esc(subjectName(s))
               + '<br><span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10.5px">'
               + esc(subjectYearLabel(s)) + '</span></th>';
        }).join('') + '</tr></thead>';
    var body = '<tbody>' + METRICS.map(function(m){
      var v = vals.map(function(x){ return x ? x[m.key] : null; });
      var clubVals = v.filter(function(x, i){ return all[i].kind === 'club' && x != null && isFinite(x); });
      // Mismo criterio que las barras: con un solo club con dato no hay "mejor".
      var best = clubVals.length >= 2 ? (m.better === 'high' ? Math.max.apply(null, clubVals) : Math.min.apply(null, clubVals)) : null;
      return '<tr><td>' + esc(t(m.i18n, m.label)) + '</td>' + v.map(function(val, i){
        var isB = all[i].kind === 'bench';
        var txt = fmtMetric(val, m);
        return '<td class="num' + (isB ? ' bench-col' : '') + (!isB && txt !== null && val === best ? ' best' : '') + '">'
             + (txt === null ? '—' : esc(txt)) + '</td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody>';
    $('cmpTable').innerHTML = head + body;
  }

  function bucketColor(label){
    var b = (typeof INICIO_INGRESOS_BUCKETS !== 'undefined' ? INICIO_INGRESOS_BUCKETS : [])
      .filter(function(x){ return x.label === label; })[0];
    return b ? b.color : '#b8b8b3';
  }

  function renderMix(all){
    var wrap = $('mixRows');
    wrap.innerHTML = '';
    var usados = {};
    all.forEach(function(s, i){
      // El benchmark no tiene composición propia: promediar porcentajes de clubes
      // con mezclas distintas da un número que no describe a nadie.
      if(s.kind !== 'club') return;
      var m = mixFor(s.id, s.year);
      var row = document.createElement('div');
      row.className = 'mix-row';
      var segs = m.total
        ? m.rows.map(function(r){
            usados[r.label] = true;
            var pct = (r.value / m.total) * 100;
            return '<div class="mix-seg" style="width:' + pct + '%;background:' + bucketColor(r.label) + '" title="'
                 + esc(r.label) + ': ' + pct.toFixed(0) + '%"></div>';
          }).join('')
        : '';
      row.innerHTML =
        '<div class="mix-name">' + crestSpan(s, i)
          + '<span class="mbar-txt"><span class="mbar-nm">' + esc(nameOf(s.id)) + '</span>'
          + '<span class="mbar-yr">' + esc(subjectYearLabel(s)) + '</span></span></div>'
        + '<div class="mix-bar">' + segs + '</div>'
        + '<div class="mix-val">' + esc(m.total.toFixed(1)) + ' M USD</div>';
      wrap.appendChild(row);
    });
    // La leyenda lista solo las categorías que efectivamente aparecen.
    $('mixLegend').innerHTML = Object.keys(usados).map(function(lbl){
      return '<span><i style="background:' + bucketColor(lbl) + '"></i>' + esc(lbl) + '</span>';
    }).join('');
  }

  // ---------------------------------------------------------------------------
  // MODO "AGREGAR" DEL PANEL
  // ---------------------------------------------------------------------------
  var addMode = false;

  function openForCompare(){
    addMode = true;
    takeSnapshot();
    var active = api.getClub();
    var b = $('addBanner');
    b.hidden = false;
    b.innerHTML = '<span aria-hidden="true">&#8644;</span><span>'
      + t('cmp.banner.a', 'Elegí con quién comparar a') + ' <b>' + esc(nameOf(active)) + '</b>. '
      + t('cmp.banner.b', 'Tocá un club para sumarlo, o el <b>+</b> de una liga para comparar contra su promedio. Podés sumar hasta 4, y después <b>Ver comparación</b> acá abajo.')
      + '</span>';
    api.openPanel(true);
    draw();
  }

  function leaveAddMode(){
    addMode = false;
    $('addBanner').hidden = true;
    renderConfirm();
  }

  function isAddMode(){ return addMode; }

  // ---------------------------------------------------------------------------
  function init(hooks){
    Object.keys(hooks || {}).forEach(function(k){ api[k] = hooks[k]; });

    $('compareBtn').addEventListener('click', function(){
      if(!api.getClub()) return api.openPanel(false);
      openForCompare();
    });
    $('ccBtn').addEventListener('click', openForCompare);
    $('ccYearBtn').addEventListener('click', function(){ addAnotherYear(api.getClub()); });
    $('trayAdd').addEventListener('click', openForCompare);
    $('trayAddYear').addEventListener('click', function(){ addAnotherYear(api.getClub()); });
    $('trayClear').addEventListener('click', clear);
    $('cmpOk').addEventListener('click', function(){
      leaveAddMode();
      api.closePanel();
      var card = $('compareCard');
      if(!card.hidden) card.scrollIntoView({ behavior:'smooth', block:'start' });
    });
    // "Cancelar" DEVUELVE el estado al que había al abrir el panel, no es un cerrar:
    // cerrar por cualquier otra vía conserva lo elegido, solo el Cancelar explícito
    // descarta.
    $('cmpCancel').addEventListener('click', function(){
      leaveAddMode();
      api.closePanel();
      restoreSnapshot();
    });
    document.querySelectorAll('#cmpView button').forEach(function(b){
      b.addEventListener('click', function(){ view = b.dataset.v; renderCompare(); });
    });
    if(window.I18N && window.I18N.onChange) window.I18N.onChange(function(){ draw(); });
  }

  return {
    init: init,
    render: render,
    draw: draw,
    clear: clear,
    count: count,
    has: has,
    toggleClub: toggleClub,
    toggleBench: toggleBench,
    blockReason: blockReason,
    isAddMode: isAddMode,
    leaveAddMode: leaveAddMode,
    renderConfirm: renderConfirm,
    // El club activo cambió de ejercicio (o de club): la comparación tiene que
    // repintarse, y puede que un sujeto haya quedado duplicado con el nuevo par.
    onActiveChanged: function(){
      var a = activeSubject();
      if(a){
        subjects = subjects.filter(function(s){
          return !(s.kind === 'club' && s.id === a.id && s.year === a.year);
        });
      }
      return render();
    }
  };
})();

// ============================================================================
// js/selector.js — el SELECTOR JERÁRQUICO DE CLUB (Versión 137).
//
// Reemplaza al `<select id="clubSelect">` plano del header (y a
// `populateClubSelect()`, borrada). Con 41 clubes el dropdown ya era incómodo, y
// el objetivo declarado del proyecto es 1000: a esa escala un `<select>`
// alfabético es inusable, no se puede buscar, no agrupa, y no dice nada de qué
// vas a encontrar adentro.
//
// DOS PRINCIPIOS QUE NO SE NEGOCIAN (son los que lo separan de un selector
// genérico, y salen del prompt que escribió Guido):
//
//  1. LA JERARQUÍA ES OPCIONAL, NO UN PEAJE. El 90% de las visitas quiere un
//     club que ya tiene en la cabeza: escribir "boca" tiene que llegar en un
//     paso. Las 5 columnas son para explorar, no 5 clicks obligatorios.
//  2. EL SELECTOR MUESTRA LA CALIDAD DEL DATO ANTES DE ENTRAR. Cada club lleva
//     su punto de color y cuántos ejercicios tiene, así nadie descubre recién
//     adentro que el club que eligió es un placeholder.
//
// DE DÓNDE SACA LOS DATOS, Y POR QUÉ NO CARGA NINGUNO. El panel muestra los 41
// clubes pero NO puede cargar ninguno para dibujarse: `loadClubData()` es la
// carga por demanda que hace que quien solo mira Boca no baje 41 archivos. Así
// que se alimenta de 4 archivos livianos que ya están en memoria:
//   - `clubs{}` (data/clubs.js)          -> nombre corto, país, deporte
//   - `CLUB_INDEX` (data/club-index.js)  -> calidad del dato, cuántos ejercicios
//   - `data/leagues.js`                  -> el catálogo (deportes/regiones/países/ligas)
//   - `data/club-leagues.js`             -> qué club jugó qué liga, POR EJERCICIO
//
// EL ÁRBOL NO TIENE UNA "LIGA DE HOY". Un club aparece bajo CADA liga en la que
// tiene al menos un ejercicio cargado, con los años a la vista. Ver la cabecera
// de `data/leagues.js` para por qué (resumen: un campo club->liga sin año es una
// segunda verdad sobre el mismo hecho, y encima no sirve para ningún agregado de
// liga, que necesita saber quiénes la integraban ESE año).
//
// CÓMO SE INTEGRA: el `<script>` principal de index.html llama a
// `CLUB_SELECTOR.init({ getClub, pickClub })` una sola vez. Este archivo no sabe
// nada de cómo se renderiza el sitio; avisa qué club se eligió y listo.
// ============================================================================

window.CLUB_SELECTOR = (function(){
  'use strict';

  // --- claves de localStorage. Prefijo `fos_` como el resto del sitio (ver
  // STORAGE_KEY de js/i18n.js). ---
  var LS_RECENTS = 'fos_recent_clubs';
  var LS_CLUB    = 'fos_club';
  var MAX_RECENTS = 5;

  var api = { getClub: function(){ return null; }, pickClub: function(){ return Promise.resolve(); } };
  var inited = false;

  // Nivel más profundo elegido del árbol. `null` en un nivel significa "no filtré
  // por acá", y la columna Equipo obedece al nivel más profundo que sí tenga valor.
  var sel = { sport:'futbol', region:null, country:null, league:null };
  var pane = 4;          // móvil: qué columna se ve
  var recents = [];

  function $(id){ return document.getElementById(id); }
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }

  // Insensible a acentos y mayúsculas: buscar "japon" tiene que encontrar "Japón",
  // y "velez" a "Vélez". Sin esto, media búsqueda en castellano falla en silencio.
  function norm(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

  // Iniciales para el escudo. 2 letras, sin puntuación ni dígitos.
  function initials(name){
    var w = String(name || '').replace(/[^A-Za-zÀ-ÿ ]/g, '').split(/\s+/).filter(Boolean);
    return (w.slice(0, 2).map(function(x){ return x[0]; }).join('') || '··').toUpperCase();
  }

  // ---------------------------------------------------------------------------
  // LECTURA DE DATOS. Todo lo de acá sale de los 4 archivos livianos; ninguna de
  // estas funciones puede necesitar un `data/<club>-data.js`.
  // ---------------------------------------------------------------------------
  // OJO (bug real de esta sesión): `clubs`, `SPORTS`, `LEAGUES` y compañía se declaran
  // con `const` en sus archivos, y un `const` de nivel superior NO crea una propiedad de
  // `window` (a diferencia de un `function`, que sí). Así que acá se los referencia por
  // nombre pelado, nunca como `window.clubs`: eso daba `undefined` y el panel entero
  // tiraba TypeError en la primera carga. Los que sí van con `window.` son los que se
  // exportan explícitamente (`window.CLUB_INDEX`, `window.SPORTS`...) o los opcionales
  // (`window.I18N`).
  function allClubIds(){ return Object.keys(clubs || {}); }
  function idxOf(id){ return (window.CLUB_INDEX || {})[id] || {}; }
  function nameOf(id){ return (clubs[id] && clubs[id].displayName) || idxOf(id).n || id; }
  function countryOf(id){ return (clubs[id] || {}).country || idxOf(id).c || null; }
  function sportOf(id){ return (clubs[id] || {}).sport || 'futbol'; }
  function qualityOf(id){ return idxOf(id).q || 'empty'; }
  function yearsCountOf(id){ return idxOf(id).y || 0; }
  function regionOf(id){ return window.regionOfCountry(countryOf(id)); }

  // El ejercicio en formato corto, para las filas del árbol: "2024" para un club
  // de año calendario, "2023/24" para uno de temporada partida. Usa
  // `isCalendarYearClub()` (js/finanzas-calc.js), que solo lee `clubs{}`, así que
  // no fuerza la carga de nada. NO se reimplementa el criterio acá.
  function yearLabelShort(clubId, year){
    if(typeof isCalendarYearClub === 'function' && isCalendarYearClub(clubId)) return String(year);
    return (year - 1) + '/' + String(year).slice(2);
  }

  function clubsOfSport(sportId){ return allClubIds().filter(function(id){ return sportOf(id) === sportId; }); }
  function clubsOfRegion(regionId){ return allClubIds().filter(function(id){ return regionOf(id) === regionId; }); }
  function clubsOfCountry(countryId){ return allClubIds().filter(function(id){ return countryOf(id) === countryId; }); }

  // Los clubes de una liga QUE EXISTEN en `clubs{}`. La intersección importa: la
  // tabla de ligas se mantiene a mano y podría nombrar un club que todavía no
  // está cargado; en ese caso el árbol no lo muestra en vez de romperse.
  function clubsInLeague(leagueId){
    return clubsOfLeague(leagueId).filter(function(id){ return !!clubs[id]; });
  }

  // La lista de clubes que corresponde al nivel más profundo elegido.
  function clubsForSelection(){
    var list;
    if(sel.league) list = clubsInLeague(sel.league);
    else if(sel.country) list = clubsOfCountry(sel.country);
    else if(sel.region) list = clubsOfRegion(sel.region);
    else list = clubsOfSport(sel.sport);
    return list.slice().sort(function(a, b){
      return nameOf(a).localeCompare(nameOf(b), 'es', { sensitivity:'base' });
    });
  }

  // El subtítulo de una fila de club: cuántos ejercicios y de qué liga(s). Con una
  // liga elegida muestra los ejercicios DE ESA LIGA (es la respuesta a "¿qué tiene
  // este club acá adentro?"); sin liga elegida, las ligas en las que tiene algo.
  function clubSubtitle(id){
    var n = yearsCountOf(id);
    var ej = n === 1 ? t('selector.year.one', '1 ejercicio') : n + ' ' + t('selector.year.many', 'ejercicios');
    if(sel.league){
      var ys = window.yearsOfClubInLeague(id, sel.league).map(function(y){ return yearLabelShort(id, y); });
      return ys.length ? ej + ' · ' + ys.join(', ') : ej;
    }
    var lgs = window.leaguesOfClub(id).map(function(r){ return (window.LEAGUES[r.league] || {}).name || r.league; });
    return lgs.length ? ej + ' · ' + lgs.join(' / ') : ej + ' · ' + t('selector.league.none', 'liga sin verificar');
  }

  // ---------------------------------------------------------------------------
  // FILA GENÉRICA. Una sola función arma las filas de las 5 columnas y las de los
  // resultados de búsqueda: son la misma cosa con distintos campos llenos.
  // ---------------------------------------------------------------------------
  function mkRow(o){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'sel-row' + (o.selected ? ' sel' : '') + (o.disabled ? ' disabled' : '') + (o.cls ? ' ' + o.cls : '');
    if(o.dot){
      var d = document.createElement('i');
      d.className = 'q-dot ' + o.dot;
      b.appendChild(d);
    }
    if(o.crest){
      var c = document.createElement('span');
      c.className = 'crest sm on-light';
      c.textContent = o.crest;
      b.appendChild(c);
    } else if(o.icon){
      var i = document.createElement('span');
      i.style.fontSize = '14px';
      i.textContent = o.icon;
      b.appendChild(i);
    }
    var m = document.createElement('span');
    m.className = 'r-main';
    var nm = document.createElement('span');
    nm.className = 'r-name';
    nm.textContent = o.name;
    m.appendChild(nm);
    if(o.sub){
      var sb = document.createElement('span');
      sb.className = 'r-sub';
      sb.textContent = o.sub;
      m.appendChild(sb);
    }
    b.appendChild(m);
    if(o.meta){
      var mt = document.createElement('span');
      mt.className = 'r-meta';
      mt.textContent = o.meta;
      b.appendChild(mt);
    }
    // PROTO: la barra de acciones de la fila de club. Tres controles, en este orden:
    // qué ejercicio, verlo, y verlo sin salir del selector.
    //
    // El <select> de ejercicio (pedido de Guido) evita entrar al club y recién ahí
    // buscar el dropdown de Finanzas. Su opción 0 NO es un año: es "el club entero",
    // que sigue siendo el camino por default.
    //
    // Los 2 botones son la otra mitad: "Ver" sale del selector, "Ver y elegir otro" se
    // queda adentro para sumar un segundo club (o una liga, con el + de su fila).
    // Reemplazan al "+" de comparación de la fila de club: un símbolo que había que
    // descubrir pasa a ser dos botones que dicen lo que hacen.
    if(o.years && o.years.length){
      var acts = document.createElement('span');
      acts.className = 'r-acts';

      var ys = document.createElement('select');
      ys.className = 'r-years';
      var op0 = document.createElement('option');
      op0.value = '';
      op0.textContent = o.years.length === 1 ? 'Todo el club' : 'Todos sus ejercicios';
      ys.appendChild(op0);
      o.years.forEach(function(par){
        var op = document.createElement('option');
        op.value = String(par[0]);
        // Mismo label que usa el sitio adentro (ejercicioLabel, js/finanzas-calc.js):
        // "Balance 2024/2025", "Presupuesto 2026/2027", y año suelto para los clubes
        // de ejercicio calendario. No se inventa un formato nuevo para el selector.
        op.textContent = window.ejercicioLabel
          ? window.ejercicioLabel(par[0], par[1], o.yearsClubId)
          : String(par[0]);
        ys.appendChild(op);
      });
      ys.title = 'Elegí un ejercicio, o dejá "todos" para ver el club entero';
      // Los 3: sin mousedown el <button> de la fila se "arma" y en algunos navegadores
      // se queda con el click; sin click el dropdown elige el club al abrirse.
      ys.addEventListener('mousedown', function(ev){ ev.stopPropagation(); });
      ys.addEventListener('click', function(ev){ ev.stopPropagation(); });
      ys.addEventListener('change', function(ev){ ev.stopPropagation(); });
      acts.appendChild(ys);

      [{ cls:'r-go', txt:'Ver', fn:o.onSee, ttl:'Ver este club y salir del selector' },
       { cls:'r-go alt', txt:'Ver y elegir otro', fn:o.onSeeAndMore, ttl:'Verlo y quedarte acá para sumar otro club o una liga' }
      ].forEach(function(def){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = def.cls;
        btn.textContent = def.txt;
        btn.title = def.ttl;
        btn.addEventListener('mousedown', function(ev){ ev.stopPropagation(); });
        btn.addEventListener('click', function(ev){
          ev.stopPropagation();
          if(def.fn) def.fn(ys.value);
        });
        acts.appendChild(btn);
      });
      b.appendChild(acts);
    }

    // El "+" de comparación. Vive en la fila del panel (clubes y ligas) y agrega ese
    // sujeto SIN cambiar de club activo. Cuando no se puede, va deshabilitado con el
    // motivo en el `title`: nunca un botón que al tocarlo no hace nada.
    if(o.addable){
      var a = document.createElement('button');
      a.type = 'button';
      a.className = 'add-btn' + (o.added ? ' on' : '');
      a.textContent = o.added ? '✓' : '+';
      if(o.addDisabled){ a.disabled = true; a.title = o.addDisabled; }
      else a.title = o.added ? t('cmp.remove', 'Sacar de la comparación') : t('cmp.add', 'Agregar a la comparación');
      a.addEventListener('click', function(ev){
        ev.stopPropagation();
        if(!o.addDisabled && o.onAdd) o.onAdd();
      });
      b.appendChild(a);
    }
    if(o.arrow){
      var ar = document.createElement('span');
      ar.className = 'r-arrow';
      ar.textContent = '›';
      b.appendChild(ar);
    }
    if(o.title) b.title = o.title;
    if(!o.disabled && o.onClick) b.addEventListener('click', o.onClick);
    return b;
  }

  function fill(id, rows){
    var el = $(id);
    el.innerHTML = '';
    rows.forEach(function(r){ el.appendChild(r); });
  }

  // ---------------------------------------------------------------------------
  // LAS 5 COLUMNAS
  // ---------------------------------------------------------------------------
  function renderCols(){
    var active = api.getClub();

    // Deporte. Los inactivos se muestran apagados: son el roadmap declarado del
    // proyecto, no una promesa de fecha.
    fill('selColSport', window.SPORTS.map(function(sp){
      var n = sp.active ? clubsOfSport(sp.id).length : 0;
      return mkRow({
        icon: sp.icon,
        name: t(sp.key, sp.name),
        meta: n ? String(n) : '—',
        sub: sp.active ? null : t('selector.soon', 'próximamente'),
        selected: sel.sport === sp.id,
        disabled: !sp.active,
        arrow: !!sp.active,
        onClick: function(){
          sel.sport = sp.id; sel.region = null; sel.country = null; sel.league = null;
          goPane(1); render();
        }
      });
    }));

    // Región. La fila "Todas las regiones" es lo que permite SALTEARSE niveles y
    // quedarse con un conjunto, en vez de estar obligado a bajar hasta un club.
    var regionRows = [mkRow({
      name: t('selector.all.regions', 'Todas las regiones'),
      meta: String(clubsOfSport(sel.sport).length),
      cls: 'all', arrow: true, selected: sel.region === null,
      onClick: function(){ sel.region = null; sel.country = null; sel.league = null; goPane(4); render(); }
    })];
    window.REGIONS.forEach(function(r){
      var n = clubsOfRegion(r.id).length;
      regionRows.push(mkRow({
        name: t(r.key, r.name), meta: n ? String(n) : '—',
        sub: n ? null : t('selector.soon', 'próximamente'),
        selected: sel.region === r.id, disabled: !n, arrow: !!n,
        onClick: function(){
          sel.region = r.id; sel.country = null; sel.league = null;
          goPane(2); render();
        }
      }));
    });
    fill('selColRegion', regionRows);

    // País. Solo los que tienen al menos un club cargado (ver data/leagues.js).
    var countryIds = sel.region ? window.countriesOfRegion(sel.region)
                                : Object.keys(window.COUNTRIES).sort(function(a, b){
                                    return window.COUNTRIES[a].name.localeCompare(window.COUNTRIES[b].name, 'es', { sensitivity:'base' });
                                  });
    var countryRows = [];
    if(sel.region){
      countryRows.push(mkRow({
        name: t('selector.all.region', 'Toda la región'),
        meta: String(clubsOfRegion(sel.region).length),
        cls: 'all', arrow: true, selected: sel.country === null,
        onClick: function(){ sel.country = null; sel.league = null; goPane(4); render(); }
      }));
    }
    countryIds.forEach(function(cid){
      var co = window.COUNTRIES[cid], n = clubsOfCountry(cid).length;
      countryRows.push(mkRow({
        icon: co.flag, name: t(co.key, co.name), meta: n ? String(n) : '—',
        selected: sel.country === cid, disabled: !n, arrow: !!n,
        onClick: function(){
          sel.country = cid; sel.region = window.regionOfCountry(cid); sel.league = null;
          goPane(3); render();
        }
      }));
    });
    fill('selColCountry', countryRows);

    // Liga. Sin país elegido se listan todas las del deporte.
    var leagueIds = sel.country ? window.leaguesOfCountry(sel.country)
                                : Object.keys(window.LEAGUES).filter(function(id){
                                    var lg = window.LEAGUES[id];
                                    if(lg.sport !== sel.sport) return false;
                                    // PROTO: sin país pero CON región, solo las ligas de esa región.
                                    return !sel.region || window.regionOfCountry(lg.country) === sel.region;
                                  });
    var leagueRows = [];
    if(sel.country){
      leagueRows.push(mkRow({
        name: t('selector.all.country', 'Todo el país'),
        meta: String(clubsOfCountry(sel.country).length),
        cls: 'all', arrow: true, selected: sel.league === null,
        onClick: function(){ sel.league = null; goPane(4); render(); }
      }));
    }
    leagueIds.forEach(function(lid){
      var lg = window.LEAGUES[lid], n = clubsInLeague(lid).length;
      leagueRows.push(mkRow({
        name: lg.name,
        sub: window.tierLabel(lg.tier),
        // El conteo es "clubes con al menos un ejercicio cargado en esta liga", no
        // "clubes de la liga": el sitio no sabe lo segundo (`totalClubs` está en
        // null a propósito, ver data/leagues.js) y no lo va a afirmar.
        meta: String(n),
        title: n + ' ' + t('selector.league.count', 'clubes con al menos un ejercicio cargado en esta liga'),
        selected: sel.league === lid, disabled: !n, arrow: !!n,
        addable: !!n && !!window.CLUB_COMPARE && !!api.getClub(),
        added: !!window.CLUB_COMPARE && window.CLUB_COMPARE.has('bench', lid),
        onAdd: function(){ window.CLUB_COMPARE.toggleBench(lid); },
        onClick: function(){
          sel.league = lid; sel.country = lg.country; sel.region = window.regionOfCountry(lg.country);
          goPane(4); render();
        }
      }));
    });
    // Un club cuyas filas de liga están TODAS en null no aparece bajo ninguna liga.
    // Hoy no hay ninguno, pero un club nuevo nace así y sin esta fila quedaría
    // invisible en el árbol.
    var huerfanos = clubsWithoutVerifiedLeague().filter(function(id){
      return clubs[id] && (!sel.country || countryOf(id) === sel.country);
    });
    if(huerfanos.length){
      leagueRows.push(mkRow({
        name: t('selector.league.unverified', 'Sin liga verificada'),
        sub: huerfanos.length + ' ' + t('selector.year.many', 'ejercicios'),
        meta: String(huerfanos.length), cls: 'all', arrow: true,
        selected: sel.league === '__none__',
        onClick: function(){ sel.league = '__none__'; goPane(4); render(); }
      }));
    }
    fill('selColLeague', leagueRows);

    // Equipo.
    var list = sel.league === '__none__' ? huerfanos : clubsForSelection();
    fill('selColClub', list.map(function(id){ return clubRow(id, clubSubtitle(id)); }));

    renderCrumbs();
  }

  // Una fila de club, la misma en la columna Equipo y en los resultados de búsqueda.
  // En modo comparar el CLICK agrega el club a la comparación en vez de cambiar de
  // club activo: si no, el panel abierto desde "Comparar" se ve igual que el de
  // cambiar de club y el visitante cambia de club sin querer.
  function clubRow(id, sub, meta){
    var cmp = window.CLUB_COMPARE;
    var enModoAgregar = !!cmp && cmp.isAddMode();
    var blocked = cmp ? cmp.blockReason(id) : null;
    return mkRow({
      crest: initials(nameOf(id)), name: nameOf(id), sub: sub, meta: meta,
      // PROTO: el dropdown de ejercicio y los 2 botones de la columna EQUIPO.
      years: (window.PROTO_YEARS || {})[id], yearsClubId: id,
      onSee: function(y){ pick(id, y); },
      onSeeAndMore: function(y){ pickAndStay(id, y); },
      dot: qualityOf(id), selected: !enModoAgregar && api.getClub() === id,
      addable: false,   // PROTO: lo reemplazan los 2 botones de la fila
      added: !!cmp && cmp.has('club', id),
      addDisabled: blocked,
      onAdd: function(){ cmp.toggleClub(id); },
      onClick: function(){
        if(enModoAgregar){ if(!blocked) cmp.toggleClub(id); }
        else pick(id);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // MÓVIL: una columna por vez + breadcrumb clickeable
  // ---------------------------------------------------------------------------
  function goPane(i){
    pane = i;
    var cols = document.querySelectorAll('#selCols .sel-col');
    for(var k = 0; k < cols.length; k++){
      cols[k].classList.toggle('active-pane', Number(cols[k].dataset.level) === i);
    }
  }

  function renderCrumbs(){
    var wrap = $('selCrumbs');
    wrap.innerHTML = '';
    var sp = window.SPORTS.filter(function(x){ return x.id === sel.sport; })[0];
    var parts = [{ lbl: (sp ? sp.icon + ' ' + t(sp.key, sp.name) : sel.sport), lvl:0 }];
    if(sel.region){
      var r = window.REGIONS.filter(function(x){ return x.id === sel.region; })[0];
      if(r) parts.push({ lbl: t(r.key, r.name), lvl:1 });
    }
    if(sel.country){
      var co = window.COUNTRIES[sel.country];
      if(co) parts.push({ lbl: t(co.key, co.name), lvl:2 });
    }
    if(sel.league && sel.league !== '__none__'){
      parts.push({ lbl: window.LEAGUES[sel.league].name, lvl:3 });
    }
    parts.push({ lbl: t('selector.col.club', 'Equipo'), lvl:4 });
    parts.forEach(function(p, i){
      if(i){
        var s = document.createElement('span');
        s.className = 'crumb-sep';
        s.textContent = '›';
        wrap.appendChild(s);
      }
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'crumb' + (p.lvl === pane ? ' cur' : '');
      b.textContent = p.lbl;
      b.addEventListener('click', function(){ goPane(p.lvl); renderCrumbs(); });
      wrap.appendChild(b);
    });
  }

  // ---------------------------------------------------------------------------
  // BÚSQUEDA. Filtra clubes, ligas y países a la vez, agrupados por tipo. Es el
  // camino rápido: el que ya sabe qué club quiere no pasa por el árbol.
  // ---------------------------------------------------------------------------
  function renderSearch(){
    var term = norm($('selQ').value.trim());
    var res = $('selResults'), cols = $('selCols'), crumbs = $('selCrumbs');
    if(!term){
      res.hidden = true; cols.hidden = false; crumbs.style.display = '';
      return;
    }
    res.hidden = false; cols.hidden = true; crumbs.style.display = 'none';
    res.innerHTML = '';

    var clubHits = allClubIds().filter(function(id){
      return norm(nameOf(id)).indexOf(term) >= 0 || norm(id).indexOf(term) >= 0
          || norm((clubs[id] || {}).name).indexOf(term) >= 0;
    }).sort(function(a, b){ return nameOf(a).localeCompare(nameOf(b), 'es', { sensitivity:'base' }); });

    var lgHits = Object.keys(window.LEAGUES).filter(function(id){
      var l = window.LEAGUES[id];
      return norm(l.name).indexOf(term) >= 0 || norm(l.full).indexOf(term) >= 0 || norm(id).indexOf(term) >= 0;
    });

    var coHits = Object.keys(window.COUNTRIES).filter(function(id){
      return norm(window.COUNTRIES[id].name).indexOf(term) >= 0 && clubsOfCountry(id).length;
    });

    function group(txt){
      var d = document.createElement('div');
      d.className = 'res-group';
      d.textContent = txt;
      res.appendChild(d);
    }

    if(clubHits.length){
      group(t('selector.group.clubs', 'Clubes'));
      clubHits.slice(0, 25).forEach(function(id){
        var co = window.COUNTRIES[countryOf(id)];
        var n = yearsCountOf(id);
        res.appendChild(clubRow(id,
          window.leaguesOfClub(id).map(function(r){ return window.LEAGUES[r.league].name; }).join(' / ')
            + (co ? ' · ' + t(co.key, co.name) : ''),
          n === 1 ? t('selector.year.one', '1 ejercicio') : n + ' ' + t('selector.year.many', 'ejercicios')));
      });
    }
    if(lgHits.length){
      group(t('selector.group.leagues', 'Ligas'));
      lgHits.forEach(function(lid){
        var lg = window.LEAGUES[lid], co = window.COUNTRIES[lg.country];
        res.appendChild(mkRow({
          name: lg.full, sub: (co ? t(co.key, co.name) : '') + ' · ' + window.tierLabel(lg.tier),
          meta: clubsInLeague(lid).length + ' ' + t('selector.clubs', 'clubes'), arrow: true,
          addable: !!window.CLUB_COMPARE && !!api.getClub(),
          added: !!window.CLUB_COMPARE && window.CLUB_COMPARE.has('bench', lid),
          onAdd: function(){ window.CLUB_COMPARE.toggleBench(lid); },
          // Elegir una liga desde la búsqueda deja el árbol PARADO EN ESA LIGA, no
          // en su primer club: el que buscó "laliga" quiere ver la liga.
          onClick: function(){
            sel.league = lid; sel.country = lg.country; sel.region = window.regionOfCountry(lg.country);
            $('selQ').value = ''; goPane(4); render(); $('selQ').focus();
          }
        }));
      });
    }
    if(coHits.length){
      group(t('selector.group.countries', 'Países'));
      coHits.forEach(function(cid){
        var co = window.COUNTRIES[cid];
        res.appendChild(mkRow({
          icon: co.flag, name: t(co.key, co.name),
          meta: clubsOfCountry(cid).length + ' ' + t('selector.clubs', 'clubes'), arrow: true,
          onClick: function(){
            sel.country = cid; sel.region = window.regionOfCountry(cid); sel.league = null;
            $('selQ').value = ''; goPane(3); render(); $('selQ').focus();
          }
        }));
      });
    }
    if(!clubHits.length && !lgHits.length && !coHits.length){
      var d = document.createElement('div');
      d.className = 'sel-empty';
      d.textContent = t('selector.noresults', 'No hay nada con ese nombre. Si es un club que todavía no está cargado, escribinos y lo priorizamos.');
      res.appendChild(d);
    }
  }

  // ---------------------------------------------------------------------------
  // RECIENTES. Mismo patrón que ya usa el selector de idioma para recordar la
  // elección (Versión 115): localStorage, con try/catch porque en una ventana
  // privada el acceso puede tirar.
  // ---------------------------------------------------------------------------
  function readRecents(){
    try {
      var raw = localStorage.getItem(LS_RECENTS);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(function(id){ return !!clubs[id]; }).slice(0, MAX_RECENTS) : [];
    } catch(e){ return []; }
  }
  function pushRecent(id){
    recents = [id].concat(recents.filter(function(r){ return r !== id; })).slice(0, MAX_RECENTS);
    try { localStorage.setItem(LS_RECENTS, JSON.stringify(recents)); } catch(e){}
  }
  function renderRecents(){
    var wrap = $('selRecents');
    $('selRecentsWrap').hidden = !recents.length;
    wrap.innerHTML = '';
    recents.forEach(function(id){
      if(!clubs[id]) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'r-chip';
      var c = document.createElement('span');
      c.className = 'crest sm on-light';
      c.textContent = initials(nameOf(id));
      b.appendChild(c);
      b.appendChild(document.createTextNode(nameOf(id)));
      b.addEventListener('click', function(){ pick(id); });
      wrap.appendChild(b);
    });
  }

  // ---------------------------------------------------------------------------
  // PIE: el total del sitio. Sale de `CLUB_INDEX`, así que no hay que acordarse
  // de actualizar un número a mano cuando entra un club.
  // ---------------------------------------------------------------------------
  function renderFoot(){
    var ids = Object.keys(window.CLUB_INDEX || {});
    var ejercicios = ids.reduce(function(s, id){ return s + (idxOf(id).y || 0); }, 0);
    var paises = {};
    ids.forEach(function(id){ paises[idxOf(id).c] = 1; });
    $('selFootCount').textContent = ids.length + ' ' + t('selector.clubs', 'clubes') + ' · '
      + Object.keys(paises).length + ' ' + t('selector.countries', 'países') + ' · '
      + ejercicios + ' ' + t('selector.year.many', 'ejercicios');
  }

  // ---------------------------------------------------------------------------
  // BOTÓN DEL HEADER
  // ---------------------------------------------------------------------------
  function renderButton(){
    var id = api.getClub();
    var crest = $('cbCrest'), name = $('cbName'), eyebrow = $('cbEyebrow');
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

  // ---------------------------------------------------------------------------
  // ABRIR / CERRAR. Dos salidas VISIBLES (arriba y abajo), más Esc y el backdrop
  // como atajos. Ver el comentario del CSS: que la única forma de salir sea Esc o
  // clickear afuera es mala UX, y en móvil directamente no hay Esc.
  // ---------------------------------------------------------------------------
  function isOpen(){ return $('clubPanel').classList.contains('open'); }

  function open(forCompare){
    if(!inited) return;
    hideCoach();
    // El árbol se para donde está el club activo, así abrir el panel muestra el
    // contexto de lo que estás viendo en vez de la raíz.
    var id = api.getClub();
    if(id){
      var lgs = window.leaguesOfClub(id);
      sel.sport = sportOf(id);
      sel.country = countryOf(id);
      sel.region = window.regionOfCountry(sel.country);
      sel.league = lgs.length ? lgs[0].league : null;
    }
    $('clubPanel').classList.add('open');
    $('clubBackdrop').classList.add('open');
    $('clubBtn').setAttribute('aria-expanded', 'true');
    $('selQ').value = '';
    goPane(4);
    render();
    if(window.CLUB_COMPARE) window.CLUB_COMPARE.renderConfirm();
    $('selQ').focus();
  }

  // Cerrar por acá (✕, "Cerrar sin cambiar", Esc, backdrop) CONSERVA lo que se haya
  // elegido para comparar: solo el "Cancelar" explícito de la barra de confirmación
  // descarta. Lo que sí hace es salir del modo comparar, para que la próxima apertura
  // no herede un banner que ya no corresponde.
  function close(){
    $('clubPanel').classList.remove('open');
    $('clubBackdrop').classList.remove('open');
    $('clubBtn').setAttribute('aria-expanded', 'false');
    if(window.CLUB_COMPARE) window.CLUB_COMPARE.leaveAddMode();
    $('clubBtn').focus();
  }

  function pick(id, year){
    // También acá y no solo en open(): a un club se llega por el panel o por la
    // portada, y el cartelito tiene que irse por cualquiera de los dos caminos.
    hideCoach();
    pushRecent(id);
    try { localStorage.setItem(LS_CLUB, id); } catch(e){}
    close();
    Promise.resolve(api.pickClub(id)).then(function(){
      renderButton(); renderRecents();
      if(year && window.goToFinanzasYear) window.goToFinanzasYear(id, Number(year));
    });
  }

  // PROTO: "Ver y elegir otro". La otra mitad de la respuesta a Guido ("permanecer en
  // el selector y elegir un segundo equipo, liga, o inclusive más de un equipo"): el
  // club se muestra igual que con "Ver", pero el panel NO se cierra y queda en modo
  // comparar, así el siguiente que toques se suma en vez de reemplazar.
  //
  // POR QUÉ EL PRIMERO TIENE QUE PASAR A SER EL CLUB ACTIVO: el modelo de la
  // comparación (js/comparar-clubes.js) tiene al club activo como sujeto 0 y a los
  // demás como rivales. No hay "comparación sin club activo", así que el primer
  // "Ver y elegir otro" elige, y del segundo en adelante se suma.
  function pickAndStay(id, year){
    hideCoach();
    var cmp = window.CLUB_COMPARE;
    var active = api.getClub();
    if(active && cmp && active !== id){
      cmp.toggleClub(id);
      if(!cmp.isAddMode()) document.getElementById('compareBtn').click();
      return;
    }
    pushRecent(id);
    try { localStorage.setItem(LS_CLUB, id); } catch(e){}
    Promise.resolve(api.pickClub(id)).then(function(){
      renderButton(); renderRecents();
      if(year && window.goToFinanzasYear) window.goToFinanzasYear(id, Number(year));
      // Reabre el panel en modo comparar (el club recién elegido esconde la portada, y
      // con ella el panel embebido). openForCompare() no está exportado, pero el botón
      // Comparar del header es exactamente ese camino.
      document.getElementById('compareBtn').click();
      render();
    });
  }

  // ---------------------------------------------------------------------------
  // COACH MARK. Un solo cartel, se va al primer click y no vuelve.
  // ---------------------------------------------------------------------------
  var LS_COACH = 'fos_coach_club';
  function hideCoach(){
    $('coachMark').hidden = true;
    try { localStorage.setItem(LS_COACH, '1'); } catch(e){}
  }
  function maybeShowCoach(){
    var seen = false;
    try { seen = localStorage.getItem(LS_COACH) === '1'; } catch(e){ seen = true; }
    $('coachMark').hidden = seen;
  }


  // ---------------------------------------------------------------------------
  // COLD START. La portada de la primera visita: el buscador grande, unos clubes
  // de acceso rápido y las ligas que tienen algo cargado. Ver el comentario del
  // HTML (#coldHero) para por qué existe.
  // ---------------------------------------------------------------------------

  // Los clubes destacados NO son una selección editorial (que sería una opinión
  // metida adentro de un sitio de datos): son los que más ejercicios tienen
  // cargados, con los recientes de este visitante adelante. El label lo dice, así
  // que el criterio está a la vista y no hay que adivinarlo.
  function quickPicks(n){
    var byYears = Object.keys(CLUB_INDEX || {}).sort(function(a, b){
      return (idxOf(b).y || 0) - (idxOf(a).y || 0)
          || nameOf(a).localeCompare(nameOf(b), 'es', { sensitivity:'base' });
    });
    var out = [];
    recents.concat(byYears).forEach(function(id){
      if(clubs[id] && out.indexOf(id) < 0 && out.length < n) out.push(id);
    });
    return out;
  }

  function renderHero(){
    var hc = $('heroClubs');
    if(!hc) return;
    hc.innerHTML = '';
    quickPicks(3).forEach(function(id){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hq-club';
      var c = document.createElement('span');
      c.className = 'crest sm';
      c.textContent = initials(nameOf(id));
      b.appendChild(c);
      b.appendChild(document.createTextNode(nameOf(id) + ' '));
      var sub = document.createElement('span');
      sub.className = 'hq-sub';
      var y = yearsCountOf(id);
      sub.textContent = y === 1 ? t('selector.year.one', '1 ejercicio') : y + ' ' + t('selector.year.many', 'ejercicios');
      b.appendChild(sub);
      b.addEventListener('click', function(){ pick(id); });
      hc.appendChild(b);
    });

    var hl = $('heroLeagues');
    hl.innerHTML = '';
    Object.keys(LEAGUES).forEach(function(lid){
      var lg = LEAGUES[lid], co = COUNTRIES[lg.country], n = clubsInLeague(lid).length;
      if(!n) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hq-league';
      b.textContent = (co ? co.flag + ' ' : '') + lg.name + ' · ' + n;
      b.title = n + ' ' + t('selector.league.count', 'clubes con al menos un ejercicio cargado en esta liga');
      // La vista agregada de liga (el ranking de ingresos) todavía no existe, así
      // que el chip abre el panel PARADO en esa liga en vez de prometer una vista
      // que no está. Cuando exista, este handler es el que cambia.
      b.addEventListener('click', function(){
        sel.league = lid; sel.country = lg.country; sel.region = regionOfCountry(lg.country);
        open(); goPane(4); render();
      });
      hl.appendChild(b);
    });

    var ids = Object.keys(CLUB_INDEX || {});
    var ejercicios = ids.reduce(function(s2, id){ return s2 + (idxOf(id).y || 0); }, 0);
    var paises = {};
    ids.forEach(function(id){ paises[idxOf(id).c] = 1; });
    $('heroFoot').textContent = ids.length + ' ' + t('selector.clubs', 'clubes')
      + ' · ' + Object.keys(paises).length + ' ' + t('selector.countries', 'países')
      + ' · ' + ejercicios + ' ' + t('selector.year.many', 'ejercicios')
      + ' ' + t('hero.foot', 'con documento oficial detrás.');
  }

  // La búsqueda del hero delega en el panel: un solo buscador, no dos motores de
  // búsqueda que se puedan ir separando con el tiempo.
  function heroSearch(){
    var term = $('heroQ').value.trim();
    open();
    if(term){ $('selQ').value = term; renderSearch(); }
  }

  // Volver a la portada. Es la vía de vuelta que pidió Guido para que la pantalla
  // de exploración no quede inalcanzable después del primer click.
  function goHome(){
    close();
    Promise.resolve(api.pickClub(null)).then(function(){ renderButton(); renderHero(); });
  }

  function render(){
    renderCols();
    renderSearch();
    renderRecents();
    renderFoot();
    renderButton();
    renderHero();
    // "Ver la portada" solo tiene sentido si hay un club elegido: en frío ya estás ahí.
    $('selHomeWrap').hidden = !api.getClub();
  }

  function init(hooks){
    if(inited) return;
    api.getClub = hooks.getClub || api.getClub;
    api.pickClub = hooks.pickClub || api.pickClub;
    recents = readRecents();

    $('clubBtn').addEventListener('click', function(){ open(false); });
    $('selClose').addEventListener('click', close);
    $('selFootClose').addEventListener('click', close);
    $('clubBackdrop').addEventListener('click', close);
    $('selQ').addEventListener('input', renderSearch);
    $('coachX').addEventListener('click', function(e){ e.stopPropagation(); hideCoach(); });
    $('selHome').addEventListener('click', goHome);
    $('heroGo').addEventListener('click', heroSearch);
    $('heroQ').addEventListener('keydown', function(e){ if(e.key === 'Enter') heroSearch(); });
    // Enter con un solo club en los resultados lo elige: el camino de 1 paso para
    // el que ya sabe qué club quiere.
    $('selQ').addEventListener('keydown', function(e){
      if(e.key !== 'Enter') return;
      var first = $('selResults').querySelector('.sel-row');
      if(first && !$('selResults').hidden) first.click();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && isOpen()){ close(); return; }
      if((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase() === 'k'){
        e.preventDefault();
        isOpen() ? close() : open();
      }
    });
    if(window.I18N && window.I18N.onChange) window.I18N.onChange(function(){ render(); });

    inited = true;
    maybeShowCoach();
    render();
  }

  return {
    init: init,
    open: open,
    close: close,
    refresh: render,
    renderButton: renderButton,
    goHome: goHome,
    // El club guardado de una visita anterior. Lo lee el arranque de index.html
    // para no volver a mostrar el cold start a alguien que ya eligió.
    savedClub: function(){
      try {
        var id = localStorage.getItem(LS_CLUB);
        return (id && clubs[id]) ? id : null;
      } catch(e){ return null; }
    }
  };
})();

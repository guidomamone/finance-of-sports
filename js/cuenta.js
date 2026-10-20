// ============================================================================
// js/cuenta.js — "Mi Cuenta": login con Google (Supabase Auth) y guardado automático de búsquedas. Mismo principio que
// js/selector.js: este archivo no sabe cómo se renderiza el resto del sitio. index.html le pasa `reopen` por CUENTA.init(), y le
// avisa cuándo cambió el estado llamando a CUENTA.notifyStateChange() desde refreshFinanzas(), no al revés.
//
// LA URL Y LA KEY DE ACÁ ABAJO SON PÚBLICAS A PROPÓSITO: la `anon public key` de Supabase está pensada para viajar en el JS del
// cliente; la seguridad la da Row Level Security del lado del server.
//
// Schema esperado: tabla `saved_searches` (user_id, state jsonb, state_hash, is_favorite, created_at, last_opened_at) + función
// `save_search(state, state_hash)` que hace upsert sin resetear `is_favorite`.
// ============================================================================

(function () {
  'use strict';

  var SUPABASE_URL = 'https://qgupzttqsgtidoruipel.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndXB6dHRxc2d0aWRvcnVpcGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1Mjk3NjcsImV4cCI6MjEwNjEwNTc2N30.WN7q2ETX1SM92heDG03eQwMtDpqPq-j7U7f-aU7xQzQ';

  var client = null;
  var currentUser = null;
  var host = null; // { reopen(state) } — lo pasa index.html en CUENTA.init()
  // Evita reguardar en cada re-render intermedio de refreshFinanzas(): solo llama a Supabase
  // cuando el estado (club/año/gestión) cambió de verdad respecto del último guardado.
  var lastSavedKey = null;

  function t(key, es) { return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }

  // Misma combinación = misma fila en saved_searches (unique en user_id+state_hash). No hace
  // falta un hash de verdad: alcanza con una clave de texto estable y determinística.
  function stateKey(state) {
    if (state.view === 'vs') return ['vs', JSON.stringify(state.ladoA), JSON.stringify(state.ladoB)].join('|');
    // Simulación de clubes en otra liga: `clubes` es SIEMPRE un array (un solo club también), así que la clave incluye cada
    // club+año de ORIGEN, más la liga+año DESTINO.
    if (state.view === 'ligaSim') {
      var claves = (state.clubes || []).map(function(c) { return c.club + ':' + c.clubYear; }).join(',');
      return ['ligaSim', state.league, state.leagueYear, claves].join('|');
    }
    // Con varios ejercicios elegidos la clave lleva la lista. Con uno solo queda la clave de siempre, así una búsqueda vieja de un
    // año y la misma búsqueda hecha hoy son la misma fila.
    if (Array.isArray(state.years) && state.years.length > 1) {
      return [state.view, state.club, state.mode, state.years.join(','), state.gestion].join('|');
    }
    return [state.view, state.club, state.mode, state.year, state.gestion].join('|');
  }

  // A diferencia de `clubs` (ver el comentario de clubName()), `data/leagues.js`
  // SÍ asigna `window.LEAGUES` (mismo criterio que usa js/liga.js), así que no
  // hace falta el `typeof` de guarda: es un global eager, siempre cargado.
  function leagueName(leagueId) {
    var lg = (window.LEAGUES || {})[leagueId] || null;
    return (lg && lg.name) || leagueId;
  }

  // `clubs` (data/clubs.js) es un `const` de scope de módulo, NO `window.clubs` — un script
  // clásico normal SÍ lo ve como identificador global (selector.js e index.html lo usan así:
  // `clubs[id]`), pero hay que declarar el `typeof` primero para no tirar ReferenceError si
  // este archivo llegara a ejecutar antes que data/clubs.js por algún cambio futuro de orden.
  function clubName(clubId) {
    var club = (typeof clubs !== 'undefined' && clubs[clubId]) || null;
    return (club && club.displayName) || clubId;
  }

  // Mismo criterio que ejercicioLabel()/anioSelect en js/finanzas-calc.js y
  // js/finanzas-render.js (duplicado a propósito, 2 líneas, para no depender de que esos
  // archivos expongan su función privada): "2025/2026", salvo un club de ejercicio calendario
  // (cierra el 31/12), que muestra el año suelto.
  function seasonLabel(clubId, year) {
    if (!year) return '';
    var club = (typeof clubs !== 'undefined' && clubs[clubId]) || null;
    var isCalendarYear = window.esEjercicioCalendario ? window.esEjercicioCalendario(clubId, year) : !!(club && club.fiscalYearStart === '01-01');
    return isCalendarYear ? String(year) : (year - 1) + '/' + year;
  }

  // Un "lado" de una comparación (ver ladoDesde() en js/selector.js) es `{nombre, bloques}`.
  // Para el caso más común — un solo club de un solo lado — usamos el nombre real del club +
  // la temporada, igual que en Finanzas. Para una liga o una mezcla de varios clubes, el
  // `nombre` que ya arma el selector (ej. "LaLiga 2025", "5 clubes") alcanza y sobra.
  function labelForLado(lado) {
    if (!lado) return '?';
    // CLUB_SELECTOR.paresDeLado() ya resuelve el año "sin fijar" (null = el más reciente
    // disponible) al valor real — no alcanza con leer `lado.bloques` crudo, ver su comentario.
    var pares = (window.CLUB_SELECTOR && window.CLUB_SELECTOR.paresDeLado(lado)) || [];
    // Un solo par = un solo club (una liga entera resuelve a un par POR EQUIPO, así que esto solo da 1 cuando el lado es
    // literalmente "un club, un año").
    if (pares.length === 1) return clubName(pares[0][0]) + ', ' + seasonLabel(pares[0][0], pares[0][1]);
    return lado.nombre;
  }

  function labelFor(state) {
    if (state.view === 'vs') return labelForLado(state.ladoA) + ' vs ' + labelForLado(state.ladoB);
    // Simulación: "River 2024/2025 en Liga Española, ejercicio 2025". El año de la LIGA va como "ejercicio N", como etiqueta un
    // ranking js/liga.js (encabezado()). Con más de un club, mismo criterio que labelForLado(): hasta 3 nombres unidos con "+", de
    // ahí para arriba los 2 primeros + "N más".
    if (state.view === 'ligaSim') {
      var nombres = (state.clubes || []).map(function(c) {
        return clubName(c.club) + ' ' + seasonLabel(c.club, c.clubYear);
      });
      var lista = nombres.length <= 3 ? nombres.join(' + ')
        : nombres.slice(0, 2).join(' + ') + ' + ' + (nombres.length - 2) + ' ' + t('cuenta.more', 'más');
      return lista + ' ' + t('cuenta.ligasim.en', 'en') + ' ' + leagueName(state.league) + ', '
        + t('cuenta.ligasim.ejercicio', 'ejercicio') + ' ' + state.leagueYear;
    }
    if (state.mode === 'gestion') return clubName(state.club) + ', ' + (state.gestion || '');
    // Varios ejercicios. Hasta 3, se nombran; con más, el primero, el último y cuántos son ("Racing, 2017/2018 a 2024/2025, 5
    // ejercicios": puede haber saltos en el medio).
    if (Array.isArray(state.years) && state.years.length > 1) {
      var ys = state.years.slice().sort(function(a, b) { return a - b; });
      if (ys.length <= 3) return clubName(state.club) + ', ' + ys.map(function(y) { return seasonLabel(state.club, y); }).join(', ');
      return clubName(state.club) + ', ' + t('cuenta.years.range', '{a} a {b}, {n} ejercicios')
        .replace('{a}', seasonLabel(state.club, ys[0])).replace('{b}', seasonLabel(state.club, ys[ys.length - 1])).replace('{n}', ys.length);
    }
    return clubName(state.club) + ', ' + seasonLabel(state.club, state.year);
  }

  // Si Supabase no contesta (un proyecto gratis se pausa solo tras una semana sin uso), Mi Cuenta lo dice en vez de dejar un botón
  // que no hace nada. Se queda así hasta recargar: no se reintenta en segundo plano.
  var unavailable = false;

  function showUnavailable(motivo) {
    if (motivo) console.error('[cuenta] Supabase no disponible:', motivo);
    unavailable = true;
    document.getElementById('cuentaLoggedOut').style.display = 'none';
    document.getElementById('cuentaLoggedIn').style.display = 'none';
    document.getElementById('cuentaNoDisponible').style.display = '';
    var sub = document.querySelector('#cuenta > .subtitle');
    if (sub) sub.style.display = 'none';
  }

  // El chequeo corre al abrir la pestaña, no al cargar el sitio: un visitante que nunca abre Mi Cuenta no le pide nada a Supabase.
  var healthChecked = false;
  function checkHealth() {
    if (healthChecked || unavailable) return;
    healthChecked = true;
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;
    fetch(SUPABASE_URL + '/auth/v1/health', { headers: { apikey: SUPABASE_ANON_KEY }, signal: ctrl ? ctrl.signal : undefined })
      .then(function (res) { if (!res.ok) showUnavailable('health ' + res.status); })
      .catch(function (err) { showUnavailable(err && err.message); })
      .then(function () { if (timer) clearTimeout(timer); });
  }

  function showLoggedOut() {
    if (unavailable) return;
    document.getElementById('cuentaLoggedOut').style.display = '';
    document.getElementById('cuentaLoggedIn').style.display = 'none';
  }

  function showLoggedIn() {
    if (unavailable) return;
    document.getElementById('cuentaLoggedOut').style.display = 'none';
    document.getElementById('cuentaLoggedIn').style.display = '';
    document.getElementById('cuentaEmail').textContent = currentUser.email || '';
    loadSearches();
  }

  function loadSearches() {
    var listEl = document.getElementById('savedSearchesList');
    if (!listEl) return;
    client.from('saved_searches').select('*')
      .order('is_favorite', { ascending: false })
      .order('last_opened_at', { ascending: false })
      .then(function (res) {
        if (res.error) {
          console.error('[cuenta] no se pudieron leer las búsquedas guardadas:', res.error.message);
          listEl.innerHTML = '';
          // Un error de red (status 0) o del servidor (5xx) es Supabase caído; un 4xx es otra cosa y se deja en la consola.
          if (!res.status || res.status >= 500) showUnavailable();
          return;
        }
        // Una búsqueda guardada con un id de club viejo (to-do 246) se lee con el id de hoy.
        renderList((res.data || []).map(function (row) { if (window.resolverClubIds) row.state = window.resolverClubIds(row.state); return row; }));
      });
  }

  function renderList(rows) {
    var listEl = document.getElementById('savedSearchesList');
    if (!rows.length) {
      listEl.innerHTML = '<p class="subtitle" data-i18n="cuenta.searches.empty">Todavía no hay ninguna guardada — se guardan solas la próxima vez que elijas un club.</p>';
      if (window.I18N) window.I18N.apply(listEl);
      return;
    }
    var byId = {};
    rows.forEach(function (r) { byId[r.id] = r; });
    listEl.innerHTML = rows.map(function (row) {
      return (
        '<div class="saved-search-row">' +
          '<button type="button" class="saved-search-fav' + (row.is_favorite ? ' active' : '') + '" data-id="' + row.id + '" title="Favorito" aria-label="Favorito">★</button>' +
          '<button type="button" class="saved-search-open" data-id="' + row.id + '">' + labelFor(row.state) + '</button>' +
          '<button type="button" class="saved-search-delete" data-id="' + row.id + '" title="Borrar" aria-label="Borrar">✕</button>' +
        '</div>'
      );
    }).join('');
    Array.prototype.forEach.call(listEl.querySelectorAll('.saved-search-open'), function (btn) {
      btn.addEventListener('click', function () {
        var row = byId[btn.dataset.id];
        if (row && host && host.reopen) host.reopen(row.state);
      });
    });
    Array.prototype.forEach.call(listEl.querySelectorAll('.saved-search-fav'), function (btn) {
      btn.addEventListener('click', function () {
        var row = byId[btn.dataset.id];
        if (!row) return;
        client.from('saved_searches').update({ is_favorite: !row.is_favorite }).eq('id', row.id)
          .then(function (res) {
            if (res.error) console.error('[cuenta] no se pudo marcar favorito:', res.error.message);
            loadSearches();
          });
      });
    });
    Array.prototype.forEach.call(listEl.querySelectorAll('.saved-search-delete'), function (btn) {
      btn.addEventListener('click', function () {
        client.from('saved_searches').delete().eq('id', btn.dataset.id)
          .then(function (res) {
            if (res.error) console.error('[cuenta] no se pudo borrar:', res.error.message);
            loadSearches();
          });
      });
    });
  }

  function onAuthChange(session) {
    currentUser = session ? session.user : null;
    lastSavedKey = null; // sesión nueva (o cerrada): la próxima búsqueda se guarda de nuevo
    if (currentUser) showLoggedIn(); else showLoggedOut();
  }

  function init(hostApi) {
    host = hostApi;
    var navBtn = document.querySelector('#mainNav button[data-section="cuenta"]');
    if (navBtn) navBtn.addEventListener('click', checkHealth);
    if (!window.supabase || !window.supabase.createClient) {
      showUnavailable('la librería de Supabase no cargó; revisar el <script> de supabase-js en index.html');
      return;
    }
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    var btnLogin = document.getElementById('btnLoginGoogle');
    if (btnLogin) btnLogin.addEventListener('click', function () {
      client.auth.signInWithOAuth({ provider: 'google' });
    });
    var btnLogout = document.getElementById('btnLogout');
    if (btnLogout) btnLogout.addEventListener('click', function () {
      client.auth.signOut();
    });

    client.auth.onAuthStateChange(function (_event, session) { onAuthChange(session); });
    client.auth.getSession().then(function (res) {
      if (res.error) showUnavailable(res.error.message); else onAuthChange(res.data.session);
    }, function (err) { showUnavailable(err && err.message); });
  }

  // Llamado por index.html (refreshFinanzas()) cada vez que el club/año/gestión se asienta.
  // Sin sesión no hace nada — no es un error, es un visitante sin cuenta mirando el sitio normal.
  function notifyStateChange(state) {
    if (!currentUser || !client || !state) return;
    var valido = state.view === 'vs' ? (state.ladoA && state.ladoB)
      : state.view === 'ligaSim' ? !!(state.clubes && state.clubes.length)
      : !!state.club;
    if (!valido) return;
    var key = stateKey(state);
    if (key === lastSavedKey) return;
    lastSavedKey = key;
    client.rpc('save_search', { p_state: state, p_state_hash: key }).then(function (res) {
      if (res.error) console.error('[cuenta] save_search:', res.error.message);
      // Si la pantalla de Mi Cuenta está abierta mientras se guarda, refresca la lista.
      else if (currentUser && document.getElementById('cuentaLoggedIn').style.display !== 'none') loadSearches();
    });
  }

  // stateKey y labelFor se exponen para poder verificarlos sin sesión: guardar de verdad necesita un usuario logueado, armar la
  // clave y el nombre de la búsqueda no.
  window.CUENTA = { init: init, notifyStateChange: notifyStateChange, stateKey: stateKey, labelFor: labelFor };
})();

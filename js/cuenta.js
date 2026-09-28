// ============================================================================
// js/cuenta.js — "Mi Cuenta": login con Google (Supabase Auth) y guardado automático de
// búsquedas (to-do 70, Admin/TODO.md). Mismo principio que js/selector.js (ver su cabecera):
// este archivo no sabe cómo se renderiza el resto del sitio. index.html le pasa `reopen` por
// CUENTA.init(), y este archivo le avisa a index.html cuándo cambió el estado llamando a
// CUENTA.notifyStateChange() desde refreshFinanzas() — no al revés.
//
// LA URL Y LA KEY DE ACÁ ABAJO SON PÚBLICAS A PROPÓSITO. No son un secreto que se filtró: la
// `anon public key` de Supabase está pensada para viajar en el JS del cliente, la seguridad la
// da Row Level Security del lado del server (ver Admin/supabase/.env y Admin/supabase/schema.sql
// para el detalle completo, incluidas las políticas de RLS).
//
// Schema esperado en Supabase (ya corrido, ver Admin/supabase/schema.sql): tabla
// `saved_searches` (user_id, state jsonb, state_hash, is_favorite, created_at,
// last_opened_at) + función `save_search(state, state_hash)` que hace upsert sin
// resetear `is_favorite`.
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
    return [state.view, state.club, state.mode, state.year, state.gestion].join('|');
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
    var isCalendarYear = !!(club && club.fiscalYearStart === '01-01');
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
    // Un solo par = un solo club (una liga entera resuelve a un par POR EQUIPO, así que esto
    // solo da 1 cuando el lado es literalmente "un club, un año" — el caso de Guido).
    if (pares.length === 1) return clubName(pares[0][0]) + ', ' + seasonLabel(pares[0][0], pares[0][1]);
    return lado.nombre;
  }

  function labelFor(state) {
    if (state.view === 'vs') return labelForLado(state.ladoA) + ' vs ' + labelForLado(state.ladoB);
    if (state.mode === 'gestion') return clubName(state.club) + ', ' + (state.gestion || '');
    return clubName(state.club) + ', ' + seasonLabel(state.club, state.year);
  }

  function showLoggedOut() {
    document.getElementById('cuentaLoggedOut').style.display = '';
    document.getElementById('cuentaLoggedIn').style.display = 'none';
  }

  function showLoggedIn() {
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
          return;
        }
        renderList(res.data || []);
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
    if (!window.supabase || !window.supabase.createClient) {
      console.error('[cuenta] la librería de Supabase no cargó — revisar el <script> de supabase-js en index.html');
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
    client.auth.getSession().then(function (res) { onAuthChange(res.data.session); });
  }

  // Llamado por index.html (refreshFinanzas()) cada vez que el club/año/gestión se asienta.
  // Sin sesión no hace nada — no es un error, es un visitante sin cuenta mirando el sitio normal.
  function notifyStateChange(state) {
    if (!currentUser || !client || !state) return;
    var valido = state.view === 'vs' ? (state.ladoA && state.ladoB) : !!state.club;
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

  window.CUENTA = { init: init, notifyStateChange: notifyStateChange };
})();

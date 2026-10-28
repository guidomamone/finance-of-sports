  // `window.CLUB_GENERIC_DATA` solo lo crean los data/<país>/<club>-data.js, que se cargan bajo demanda. Se crea acá, antes que nada: una
  // referencia SIN `window.` a un global nunca declarado tira ReferenceError y corta el resto del INIT.
  window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};

  const FX_RATE = 1450; // ARS por USD, placeholder de referencia
  let currentCurrency = 'USD';
  let simplifyFormat = true; // toggle "Formato del club" / "Formato simplificado"

  // El club de la visita anterior, si hubo. `currentClub` arranca SIEMPRE en null: el sitio se dibuja en frío (la portada) y
  // recién al final del INIT se pide el club guardado, que entra por el mismo camino que un click en el selector (selectClub ->
  // loadClubData -> refreshAllForClub). Un solo camino para llegar a un club mostrado.
  const clubGuardado = CLUB_SELECTOR.savedClub();
  let currentClub = null;

  // ---------- CARGA BAJO DEMANDA DE DATOS POR CLUB ----------
  // Todo club se inyecta como <script> recién cuando el visitante lo elige; `clubDataLoaded` cachea qué ya se bajó.
  // CONVENCIÓN: el archivo de CUALQUIER club es SIEMPRE `data/<país>/<clubId>-data.js` (país = `clubs[clubId].country` en minúscula),
  // sin registro que mantener; las tools arman la misma ruta en tools/data-clubes.js. Si alguna vez un club necesita otro nombre, va una
  // entrada en CLUB_DATA_SCRIPT_OVERRIDE, no un mapa completo.
  const CLUB_DATA_SCRIPT_OVERRIDE = {};
  // Arranca vacío: ningún data file de club entra eager.
  const clubDataLoaded = {};
  // Dos llamadas SIMULTÁNEAS al mismo club devuelven la MISMA promesa: si no, el archivo se ejecuta dos veces y la segunda tira
  // "Identifier ... has already been declared" (los `const` de un data file viven en el scope global). Pasa al comparar varios clubes
  // en paralelo.
  const clubDataPending = {};
  function loadClubData(clubId){
    if(clubDataLoaded[clubId] || !clubs[clubId]) return Promise.resolve();
    if(clubDataPending[clubId]) return clubDataPending[clubId];
    // `?v=`: el hash del archivo en data/manifiesto.js (fosV). Sin esto, un visitante con un data file viejo cacheado seguiría viendo
    // números viejos después de un deploy que los corrigió.
    const base = CLUB_DATA_SCRIPT_OVERRIDE[clubId] || ('data/' + clubs[clubId].country.toLowerCase() + '/' + clubId + '-data.js');
    const src = fosUrl(base) + fosV(base);
    // Las glosas de las etiquetas del club (data/<país>/<clubId>-glosas.js, solo si el índice dice que existen): si no llegan, la pantalla muestra el original.
    const glosas = (window.GLOSAS_CLUBES || {})[clubId]
      ? new Promise(res => { const g = document.createElement('script'); g.src = fosUrl(base.replace('-data.js', '-glosas.js')) + fosV(base.replace('-data.js', '-glosas.js')); g.onload = g.onerror = () => res(); document.head.appendChild(g); })
      : Promise.resolve();
    clubDataPending[clubId] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => { glosas.then(() => { clubDataLoaded[clubId] = true; delete clubDataPending[clubId]; resolve(); }); };
      // Se borra también al fallar, para que un reintento (el visitante que elige otra vez el
      // mismo club después de un error de red) vuelva a intentarlo de verdad.
      script.onerror = () => { delete clubDataPending[clubId]; reject(new Error('No se pudo cargar ' + src)); };
      document.head.appendChild(script);
    });
    return clubDataPending[clubId];
  }

  // El ejercicio que se lleva a otra liga: el balance más nuevo de los elegidos; si no se eligió ninguno con balance, el balance
  // más nuevo del club (CLUB_INDEX). null si no hay.
  function ligaSimYear(){
    const elegido = FIN_SEL.lastBalance(currentClub);
    if(elegido) return elegido;
    const BAL = { official_balance_sheet:1, unofficial_mirror:1, official_budget_and_balance:1 };
    const yrs = ((window.CLUB_INDEX || {})[currentClub] || {}).yrs || [];
    const ultimo = yrs.find(p => BAL[p[1]]);
    return ultimo ? ultimo[0] : null;
  }
  function renderLigaSimCard(isGestion){
    const card = document.getElementById('ligaSimWrap');
    if(!card) return;
    const year = currentClub && !isGestion ? ligaSimYear() : null;
    card.style.display = year ? '' : 'none';
    if(!year) return;
    const club = clubs[currentClub] || {};
    const nombre = club.displayName || ((window.CLUB_INDEX || {})[currentClub] || {}).n || currentClub;
    const ej = club.fiscalYearStart === '01-01' ? String(year) : (year - 1) + '/' + year;
    document.getElementById('ligaSimTitle').textContent = I18N.t('finanzas.ligasim.title', '{club} en otra liga').replace('{club}', nombre);
    document.getElementById('ligaSimSub').textContent = I18N.t('finanzas.ligasim.sub',
      'Ponemos sus ingresos de {ej} en el ranking de ingresos de otra liga, mismo ejercicio. No es una predicción deportiva: es cuánta plata maneja comparado con esos clubes.').replace('{ej}', ej);
    card.dataset.year = year;
    renderLigaSimPuesto(year, ej);
  }

  // El puesto en otra liga, sin salir de Finanzas. Candidatas = las ligas que no son la del club y que tienen clubes cargados ESE
  // ejercicio (leagueAt sobre el índice de clubes, sin bajar ningún ranking). Default: la de más clubes cargados. El puesto sale de
  // LIGA_VIEW.filaSimulada (el motor de la simulación de Ligas) contra el ranking precalculado. Un ranking tiene solo los clubes
  // cargados, así que el texto dice entre cuántos, nunca "de 20" a secas.
  let ligaSimElegida = {}, ligasPorClubListas = false, estimadosPedidos = {};
  // Un ejercicio cuyo documento imprime solo el margen bruto no tiene ingreso: el card no lo compara como si lo tuviera.
  function ligaSimEsMargen(club, year){
    const m = (((window.CLUB_GENERIC_DATA || {})[club] || {}).fiscalYearMeta || {})[year] || {};
    return m.baseIngreso === 'gross_margin';
  }
  // El aspecto del card según el caso: normal, con estimado (etiqueta ámbar) o sin nada que comparar (gris, sin puesto).
  function ligaSimAspecto(modo, etiqueta){
    const card = document.getElementById('ligaSimWrap'), rank = document.getElementById('ligaSimRank');
    const pick = document.getElementById('ligaSimLeague').closest('label'), ver = document.getElementById('btnLigaSimVer');
    card.classList.toggle('liga-sim-vacio', modo === 'vacio');
    rank.classList.toggle('liga-sim-gris', modo === 'vacio');
    pick.hidden = modo === 'vacio'; ver.hidden = modo === 'vacio';
    card.querySelectorAll('.liga-sim-tag').forEach(x => x.remove());
  }
  // Millones con un decimal en el idioma de la pantalla (10,6 en español, 10.6 en inglés).
  const fmtSimM = v => Number(v).toLocaleString((window.I18N && I18N.current) || 'es', { maximumFractionDigits: 1 });
  // La etiqueta va pegada al dato que califica: al puesto con estimado, al título cuando no hay nada que comparar.
  function ligaSimEtiqueta(donde, tipo, texto, ayuda){
    const tag = document.createElement('span');
    tag.className = 'liga-sim-tag liga-sim-tag-' + tipo; tag.textContent = texto; tag.title = ayuda; tag.setAttribute('aria-label', ayuda);
    donde.appendChild(tag);
  }
  function renderLigaSimPuesto(year, ej){
    const res = document.getElementById('ligaSimRes'), btnViejo = document.getElementById('btnLigaSim');
    const club = currentClub;
    if(!res || typeof leagueAt !== 'function' || !window.LIGA_VIEW || !LIGA_VIEW.filaSimulada){ if(res) res.hidden = true; return; }
    // Las ligas por club (data/club-leagues/) se cargan aparte: hasta que lleguen, no hay candidatas.
    if(!ligasPorClubListas && typeof window.loadClubLeagues === 'function'){
      window.loadClubLeagues().then(() => { ligasPorClubListas = true; if(currentClub === club) renderLigaSimPuesto(year, ej); });
      res.hidden = true; return;
    }
    const propia = leagueAt(club, year);
    // Año de margen bruto: el ingreso que se compara es el estimado de la liga propia (o el del informe siguiente), nunca el margen.
    const margen = ligaSimEsMargen(club, year);
    if(margen && propia && !(window.ESTIMADOS || {})[propia] && !estimadosPedidos[propia]){
      estimadosPedidos[propia] = true;
      LIGA_VIEW.loadEstimados(propia).then(() => { if(currentClub === club) renderLigaSimPuesto(year, ej); });
      res.hidden = true; return;
    }
    const est = margen && propia ? (LIGA_VIEW.filasEstimadas(propia, year).find(e => e.id === club) || null) : null;
    ligaSimAspecto(margen && !est ? 'vacio' : 'normal');
    const subEl = document.getElementById('ligaSimSub'), tituloEl = document.getElementById('ligaSimTitle');
    if(margen && est){
      subEl.textContent = (est.ancla
        ? I18N.t('finanzas.ligasim.sub.ancla', 'El documento de {ej} informa solo un margen bruto; el informe del año siguiente trae el ingreso de ese ejercicio (US$ {v} M) y es el que usamos.')
        : I18N.t('finanzas.ligasim.sub.est', 'Ponemos sus ingresos de {ej} en el ranking de ingresos de otra liga, mismo ejercicio. El documento no informa ingresos, solo un margen bruto: usamos nuestro estimado (US$ {v} M, entre {lo} M y {hi} M).'))
        .replace('{ej}', ej).replace('{v}', fmtSimM(est.revenue)).replace('{lo}', fmtSimM(est.lo)).replace('{hi}', fmtSimM(est.hi));
    } else if(margen){
      const nombreProp = (LEAGUES[propia] || {}).name || '';
      subEl.textContent = I18N.t('finanzas.ligasim.sub.nocomp', 'No comparamos este ejercicio: el documento de {ej} informa solo un margen bruto, no los ingresos, y todavía no tenemos un estimado de {liga} {ej}. Cuando lo tengamos, el puesto aparece acá.')
        .replace('{liga}', nombreProp).replace(/\{ej\}/g, ej);
      ligaSimEtiqueta(tituloEl, 'gris', I18N.t('finanzas.ligasim.tag.sinIng', 'Sin ingresos'), I18N.t('finanzas.ligasim.tag.sinIng.ayuda', 'No se compara'));
      res.hidden = false; btnViejo.hidden = true;
      document.getElementById('ligaSimRank').textContent = '—'; document.getElementById('ligaSimCap').textContent = '';
      return;
    }
    const cuenta = {};
    Object.entries(window.CLUB_INDEX || {}).forEach(([id, c]) => {
      if(id === club || !(c.yrs || []).some(p => p[0] === year)) return;
      const lid = leagueAt(id, year);
      if(lid && lid !== propia && LEAGUES[lid]) cuenta[lid] = (cuenta[lid] || 0) + 1; // 'liga-no-catalogada' y 'sin-competencia' no son ligas para elegir
    });
    const ligas = Object.keys(cuenta).sort((a, b) => (cuenta[b] - cuenta[a]) || ((LEAGUES[a] || {}).name || a).localeCompare((LEAGUES[b] || {}).name || b));
    if(!ligas.length){ res.hidden = true; btnViejo.hidden = false; return; }
    const sel = document.getElementById('ligaSimLeague');
    const clave = club + '|' + year;
    const elegida = ligas.includes(ligaSimElegida[clave]) ? ligaSimElegida[clave] : ligas[0];
    sel.innerHTML = ligas.map(l => `<option value="${l}">${(LEAGUES[l] || {}).name || l}</option>`).join('');
    sel.value = elegida;
    sel.onchange = () => { ligaSimElegida[clave] = sel.value; renderLigaSimPuesto(year, ej); };
    res.hidden = false; btnViejo.hidden = true;
    const rank = document.getElementById('ligaSimRank'), cap = document.getElementById('ligaSimCap');
    rank.textContent = '…'; cap.textContent = '';
    LIGA_VIEW.loadRanking(elegida).then(() => {
      if(currentClub !== club || sel.value !== elegida) return;
      const r = LIGA_VIEW.rankingDe(elegida, year), yo = LIGA_VIEW.filaSimulada(club, year);
      if(!r || !yo){ rank.textContent = '—'; cap.textContent = ''; return; }
      const otros = (r.clubs || []).filter(c => c.id !== club && c.revenue);
      const ingreso = est ? est.revenue : yo.revenue;
      const puestoCon = v => 1 + otros.filter(c => c.revenue > v).length;
      const puesto = puestoCon(ingreso);
      const nombreLiga = (LEAGUES[elegida] || {}).name || elegida;
      rank.textContent = (est && !est.ancla ? '≈ ' : '') + I18N.t('finanzas.ligasim.rank', '{p}.º').replace('{p}', puesto);
      cap.textContent = I18N.t('finanzas.ligasim.among', 'en ingresos, entre los {n} clubes de {liga} {ej} que tenemos cargados')
        .replace('{n}', otros.length + 1).replace('{liga}', nombreLiga).replace('{ej}', ej)
        + (r.leagueSize ? ' ' + I18N.t('finanzas.ligasim.size', '(la liga tuvo {m})').replace('{m}', r.leagueSize) : '') + '.';
      if(est && !est.ancla){
        // El rango del estimado (80 %): del mejor al peor puesto posible.
        cap.textContent += ' ' + I18N.t('finanzas.ligasim.rango', 'Con el rango del estimado, entre el {a}.º y el {b}.º.')
          .replace('{a}', puestoCon(est.hi)).replace('{b}', puestoCon(est.lo));
      }
      if(est) ligaSimEtiqueta(rank, est.ancla ? 'azul' : 'ambar',
        est.ancla ? I18N.t('finanzas.ligasim.tag.ancla', 'Informe siguiente') : I18N.t('finanzas.ligasim.tag.est', 'Estimado'),
        est.ancla ? I18N.t('finanzas.ligasim.tag.ancla.ayuda', 'Ingreso del informe del año siguiente') : I18N.t('finanzas.ligasim.tag.est.ayuda', 'Con el ingreso estimado, no con un balance'));
      document.getElementById('btnLigaSimVer').onclick = () => {
        LIGA_VIEW.showConSimulados(elegida, year, [{ clubId: club, clubYear: year, revenue: est ? est.revenue : null }]);
        irASeccion('liga');
      };
    });
  }

  function refreshFinanzas(){
    // Los años elegidos van a la URL sin sumar una entrada al historial por cada click.
    escribirURL('replace');
    const isGestion = document.querySelector('#viewToggle button.active').dataset.view === 'gestion';
    isGestion ? updateFinanzasByGestionGeneric(currentClub) : updateFinanzasByAnioGeneric(currentClub);
    renderDataQualityBannerForCurrentSelection();
    renderFuentesCard();
    // El card de simulación solo tiene sentido con un club elegido y en modo "Año a año" (es de UN ejercicio, no de una gestión).
    renderLigaSimCard(isGestion);
    if(window.FIN_MULTI) FIN_ANIOS.render(currentClub);
    if(window.FIN_MULTI && window.FIN_GESTION) FIN_GESTION.render(currentClub);
    if(window.FIN_ESTRUCTURA) FIN_ESTRUCTURA.render(currentClub, FIN_SEL.years());
    if(window.FIN_AUDITORIA) FIN_AUDITORIA.render(currentClub, FIN_SEL.years());
    if(window.FIN_CORRECCIONES) FIN_CORRECCIONES.render(currentClub, FIN_SEL.years());
    if(window.FIN_CITAR) FIN_CITAR.render(currentClub, FIN_SEL.years());
    if(window.FIN_CONTEXTO) FIN_CONTEXTO.render(currentClub, FIN_SEL.years());
    if(window.FIN_REAL_UI) FIN_REAL_UI.render(currentClub, FIN_SEL.years());
    // Guardado en Mi Cuenta: cada vez que el club/año/gestión se asienta se avisa a js/cuenta.js, que guarda solo (no es un botón).
    // Sin sesión, o en la portada, CUENTA.notifyStateChange no hace nada.
    if(window.CUENTA && currentClub && (isGestion || FIN_SEL.years().length)){
      window.CUENTA.notifyStateChange({
        view: 'finanzas',
        club: currentClub,
        mode: isGestion ? 'gestion' : 'anio',
        year: isGestion ? null : FIN_SEL.primary(),
        // La lista completa de ejercicios elegidos. `year` (el más nuevo) se sigue guardando para que una búsqueda se pueda reabrir con
        // la vista de un año y para que las búsquedas viejas, que solo tienen `year`, se sigan leyendo.
        years: isGestion ? null : FIN_SEL.years(),
        gestion: isGestion ? document.getElementById('gestionSelect').value : null,
      });
    }
  }

  // Cambiar de club en el header reconstruye los selectores y vuelve a dibujar TODAS las
  // secciones (no solo la que está a la vista), para que al cambiar de pestaña ya esté todo
  // al día con el club elegido, en vez de quedar desactualizado hasta el próximo evento.
  function refreshAllForClub(){
    populateFinanzasSelectors(currentClub);
    // Los cards de presupuesto son genéricos: cada uno decide su contenido en su render (renderSupuestosCard(), etc.).
    // Toggle de moneda: nativa/USD para cualquier club (populateCurrencyToggle(), y la cabecera de data/currency-map.js).
    populateCurrencyToggle(currentClub);
    // "Formato del club" / "Formato simplificado": siempre visible, para cualquier club.
    refreshFinanzas();
    populateResultadosSelector(currentClub);
    renderResultados();
    renderTitulosTable();
    populateCompararSelectors(currentClub);
    renderComparar();
  }

  // ---------- SELECTOR DE CLUB (js/selector.js) ----------
  // Este archivo le pasa 2 funciones y no sabe nada más de él; el selector no sabe cómo se renderiza el sitio. Cambiar de club es:
  // cargar su data file, actualizar `currentClub`, repintar todo, y verificar los tie-outs de ese club.
  // Cambiar de pestaña APRETANDO EL BOTÓN del nav, en vez de repetir las clases `active` que pone su listener: si esa navegación
  // cambia, esto no se entera.
  function irASeccion(id){
    const btn = document.querySelector('#mainNav button[data-section="' + id + '"]');
    if(btn) btn.click();
  }
  // Lo prende el buscador de Inicio, y lo
  // apaga selectClub() al aterrizar. Un flag y no un parámetro de selectClub() porque entre
  // el click y la elección hay un panel entero de por medio.
  let irAFinanzasAlElegir = false;

  function selectClub(newClub){
    const previousClub = currentClub;
    // null = volver a la portada (el "Ver la portada" del panel). No se descarga ni
    // se descarta ningún dato: el archivo del club que estaba cargado queda en
    // memoria, así que volver a elegirlo es instantáneo.
    if(newClub === null){
      currentClub = null;
      applyClubMode();
      return Promise.resolve();
    }
    return loadClubData(newClub).then(() => {
      // Se apaga el aviso de un intento anterior que falló: vive en <main> y no se esconde solo al cambiar de pestaña, así que un error
      // viejo quedaría al lado de los datos del club que SÍ cargó.
      const avisoPrevio = document.getElementById('clubLoadError');
      if(avisoPrevio) avisoPrevio.hidden = true;
      currentClub = newClub;
      applyClubMode();
      refreshAllForClub();
      verifyTieOuts(newClub);
      // El que entró por "quiero ver un club en particular" aterriza en FINANZAS. Es lo único que distingue ese camino del botón de
      // club del header, que te deja donde estabas.
      if(irAFinanzasAlElegir){
        irAFinanzasAlElegir = false;
        irASeccion('finanzas');
      }
    }).catch(err => {
      // NO un alert(): un alert nativo CONGELA la página entera (timers, onload de scripts). Si el club que falla es el guardado en
      // localStorage, el sitio quedaría congelado en cada visita. El error va a la consola y a un aviso en la página.
      console.error('[club] no se pudo cargar', newClub, err);
      currentClub = previousClub;
      applyClubMode();
      const aviso = document.getElementById('clubLoadError');
      if(aviso){
        aviso.textContent = 'No se pudieron cargar los datos de ' + ((clubs[newClub] || {}).displayName || newClub) + '. Probá de nuevo en un momento.';
        aviso.hidden = false;
      }
    });
  }

  // Reabrir una búsqueda guardada desde Mi Cuenta. js/cuenta.js no toca `currentClub` ni ningún <select>: le pasa el `state`
  // guardado y esta función hace lo mismo que haría el visitante a mano (elegir el club, después el año/gestión, y aterrizar en
  // Finanzas).
  function reopenSavedSearch(state){
    if(!state) return;
    // Comparación (pestaña "Comparar"/vs): CLUB_SELECTOR sabe rearmar los dos lados, index.html
    // solo tiene que pararse en esa pestaña.
    if(state.view === 'vs'){
      CLUB_SELECTOR.reopenComparacion(state.ladoA, state.ladoB);
      irASeccion('vs');
      return;
    }
    // Simulación de uno o más clubes en una liga que no es la suya. `state.clubes` es SIEMPRE un array. Necesitan sus data files
    // cargados para recalcular el ingreso con computeYearGeneric(), pero NO pasa por selectClub(): no cambia el club activo, solo arma
    // una vista (LIGA_VIEW no sabe cargar clubes).
    if(state.view === 'ligaSim'){
      if(!state.league || !state.clubes || !state.clubes.length) return;
      Promise.all(state.clubes.map(c => loadClubData(c.club).catch(() => null))).then(() => {
        LIGA_VIEW.showConSimulados(state.league, state.leagueYear,
          state.clubes.map(c => ({ clubId:c.club, clubYear:c.clubYear })));
        irASeccion('liga');
      });
      return;
    }
    if(!state.club) return;
    selectClub(state.club).then(() => {
      const isGestion = state.mode === 'gestion';
      document.querySelectorAll('#viewToggle button').forEach(b => b.classList.toggle('active', b.dataset.view === state.mode));
      document.getElementById('gestionSelectWrap').style.display = isGestion ? 'inline' : 'none';
      document.getElementById('anioSelectWrap').style.display = isGestion ? 'none' : 'inline';
      if(isGestion) document.getElementById('gestionSelect').value = state.gestion;
      else {
        document.getElementById('anioSelect').value = String(state.year);
        FIN_SEL.set([parseInt(document.getElementById('anioSelect').value, 10)]);
        // Una búsqueda guardada con varios ejercicios los vuelve a elegir todos (los que el club siga teniendo). Con ?multi=0 queda el
        // más nuevo, `year`.
        if(window.FIN_MULTI && Array.isArray(state.years) && state.years.length > 1){
          const hay = new Set([...document.getElementById('anioSelect').options].map(o => parseInt(o.value, 10)));
          const ys = state.years.filter(y => hay.has(y));
          if(ys.length) FIN_SEL.set(ys);
        }
      }
      refreshFinanzas();
      irASeccion('finanzas');
    });
  }

  // La guía de Finanzas cerrada (applyClubMode la esconde). localStorage puede no estar (modo privado): sin él, se cierra por la sesión.
  let guiaCerrada = false;
  try { guiaCerrada = localStorage.getItem('finGuiaCerrada') === '1'; } catch(e) {}
  // applyClubMode(): la única función que decide qué se ve según haya club o no. Hoy todas las pestañas funcionan sin club (Finanzas
  // sin club es el card del selector); TABS_SIN_CLUB queda para una pestaña futura que no signifique nada sin uno: se escondería
  // hasta que lo haya, y si el visitante estaba en ella, vuelve a Inicio.
  const TABS_SIN_CLUB = ['inicio', 'vs', 'liga', 'finanzas', 'cuenta', 'grupo', 'sponsor'];
  function applyClubMode(){
    const cold = !currentClub;
    document.getElementById('mainNav').style.display = '';
    document.querySelectorAll('main > section').forEach(sec => { sec.style.display = ''; });

    document.querySelectorAll('#mainNav button').forEach(b => {
      b.hidden = cold && TABS_SIN_CLUB.indexOf(b.dataset.section) < 0;
    });
    const activo = document.querySelector('#mainNav button.active');
    if(activo && activo.hidden) document.querySelector('#mainNav button[data-section="inicio"]').click();


    // Lo de Finanzas que solo tiene sentido con un club: cambiarlo, la guía y el índice de la página.
    document.getElementById('finCambiar').hidden = cold;
    document.getElementById('finIndice').hidden = cold;
    document.getElementById('finGuia').hidden = cold || guiaCerrada;

    CLUB_SELECTOR.renderButton();
  }

  CLUB_SELECTOR.init({
    getClub: () => currentClub,
    pickClub: selectClub,
    // Elegir una LIGA en el selector aterriza en la pestaña Ligas.
    pickLeague: (leagueId, year) => LIGA_VIEW.show(leagueId, year).then(() => irASeccion('liga')),
    // Cada cambio de un lado de Comparar o de su ajuste por inflación va a la URL, sin sumar entradas al historial.
    onCambio: () => escribirURL('replace'),
  });

  // js/cuenta.js no sabe cargar un club ni cambiar de pestaña: se le pasa reopenSavedSearch() para que reabrir una búsqueda
  // guardada haga exactamente lo mismo que elegirla a mano.
  CUENTA.init({
    reopen: reopenSavedSearch,
  });

  // La página de un sponsor tampoco sabe cargar un club: tocar un equipo lleva a su Finanzas por el mismo camino que el selector.
  if(window.SPONSOR_VIEW) SPONSOR_VIEW.init({ irAClub: id => selectClub(id).then(() => irASeccion('finanzas')) });

  // La vista de liga tampoco sabe navegar ni cargar un club: se le pasa qué hacer cuando
  // el visitante clickea una barra o una fila de la tabla, que es ir a Finanzas de ese club.
  LIGA_VIEW.init({
    pickClub: selectClub,
    goFinanzas: () => irASeccion('finanzas'),
    // El "Ver la liga ›" de cada bloque de la vidriera de Inicio.
    goLiga: () => irASeccion('liga'),
    // LIGA_VIEW no sabe de Supabase: avisa acá cuando una simulación se armó de verdad, y acá se decide si guardarla (sin sesión,
    // notifyStateChange no hace nada).
    // La liga en la URL: una liga nueva suma una entrada al historial ("atrás" vuelve a la anterior); cambiar el ejercicio, no.
    onEstado: () => {
      const enURL = (rutaDeURL() || {}).tipo === 'liga' ? rutaDeURL().id : new URLSearchParams(location.search).get('liga');
      escribirURL((LIGA_VIEW.current().league || null) !== enURL ? 'push' : 'replace');
    },
    onSimulado: (league, leagueYear, clubes) => {
      if(window.CUENTA) window.CUENTA.notifyStateChange({
        view: 'ligaSim', league, leagueYear, clubes,
      });
    },
  });
  document.getElementById('btnLigaSim').addEventListener('click', () => {
    LIGA_VIEW.iniciarSimulacion(currentClub, parseInt(document.getElementById('ligaSimWrap').dataset.year, 10));
    irASeccion('liga');
  });
  // Se dibujan las dos pantallas del módulo: la pestaña (estado frío: la grilla de ligas) y la vidriera de Inicio.
  LIGA_VIEW.refresh();

  applyClubMode();

  // ---------- INICIO ----------
  // El buscador es la puerta al selector: al tocarlo se abre el modal con lo que haya tipeado, y al elegir se cae en Finanzas.
  // "Comparar" lleva a la pestaña Comparar.
  const iniQ = document.getElementById('iniQ');
  const abrirDesdeInicio = () => {
    const q = iniQ.value.trim();
    iniQ.value = '';
    iniQ.blur();
    irAFinanzasAlElegir = true;
    CLUB_SELECTOR.open(q);
  };
  iniQ.addEventListener('focus', abrirDesdeInicio);
  iniQ.addEventListener('input', abrirDesdeInicio);
  document.getElementById('iniCmp').addEventListener('click', () => irASeccion('vs'));

  document.getElementById('gestionSelect').addEventListener('change', refreshFinanzas);
  // El dropdown escribe en FIN_SEL (js/finanzas-render.js) y nadie más lo lee.
  document.getElementById('anioSelect').addEventListener('change', e => {
    FIN_SEL.set([parseInt(e.target.value, 10)]);
    refreshFinanzas();
  });
  document.querySelectorAll('#viewToggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#viewToggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isGestion = btn.dataset.view === 'gestion';
      document.getElementById('gestionSelectWrap').style.display = isGestion ? 'inline' : 'none';
      document.getElementById('anioSelectWrap').style.display = isGestion ? 'none' : 'inline';
      refreshFinanzas();
    });
  });

  // Verificación automática: para cada club-ejercicio con un total oficial conocido, chequea que la suma de las líneas cargadas
  // coincida, y avisa por consola si algo no cierra. Revisa solo los clubes cargados en memoria; `onlyClub` (opcional) la limita al
  // que se acaba de cargar (la llama loadClubData()). Para todos los clubes: auditAll().
  function verifyTieOuts(onlyClub){
    const checks = [];
    // Cada club guarda officialTotalRevenue / officialTotalExpenses / officialPAT dentro de su fiscalYearMeta[year]: agregar un club o
    // un ejercicio no toca esta función. officialPAT se omite en un presupuesto puro (no hay un resultado real impreso contra qué
    // comparar).
    Object.keys(window.CLUB_GENERIC_DATA || {}).forEach(clubId => {
      const meta = window.CLUB_GENERIC_DATA[clubId].fiscalYearMeta;
      if(!meta) return;
      Object.keys(meta).map(Number).forEach(year => {
        const y = meta[year];
        if(y.officialTotalRevenue == null && y.officialTotalExpenses == null && y.officialPAT == null) return;
        const computed = computeYearGeneric(clubId, year);
        if(y.officialTotalRevenue != null){
          checks.push({ club:clubId, year, label:'Revenue', computed: computed.revenue, official: y.officialTotalRevenue, tol: toleranciaTieOut(montosTieOut(computed, 'revenue'), y.officialTotalRevenue) });
        }
        if(y.officialTotalExpenses != null){
          checks.push({ club:clubId, year, label:'Expenses (incl. no-efectivo)', computed: Math.abs(computed.expenses + computed.nonCash), official: Math.abs(y.officialTotalExpenses), tol: toleranciaTieOut(montosTieOut(computed, 'expenses'), y.officialTotalExpenses) });
        }
        if(y.officialPAT != null){
          checks.push({ club:clubId, year, label:'Resultado neto (PAT)', computed: computed.pat, official: y.officialPAT, tol: toleranciaTieOut(montosTieOut(computed, 'pat'), y.officialPAT) });
        }
      });
    });
    checks.filter(c => c.official !== null && (!onlyClub || c.club === onlyClub)).forEach(c => {
      const delta = +(c.computed - c.official).toFixed(3);
      const ok = Math.abs(delta) < c.tol; // redondeo de la unidad impresa: toleranciaTieOut() (js/finanzas-calc.js)
      console[ok ? 'log' : 'error'](`[verificación] ${c.club} ${c.year} ${c.label}: calculado ${c.computed} vs. oficial ${c.official} -> ${ok ? 'OK, cierra' : 'NO CIERRA, diferencia de ' + delta}`);
    });
  }

  // ---------- ACCESO POR CLUB PARA RESULTADOS / COMPARAR GESTIONES ----------
  // Todos los clubes viven en CLUB_GENERIC_DATA: un club nuevo no toca estas funciones. Devuelven null si no hay club elegido o si
  // sus datos todavía no se cargaron (ver clubCargado()).
  function resultadosDataForClub(clubId){
    return clubCargado(clubId) ? CLUB_GENERIC_DATA[clubId].resultadosData : null;
  }
  function titulosDataForClub(clubId){
    return clubCargado(clubId) ? CLUB_GENERIC_DATA[clubId].titulosData : null;
  }

  // clubCargado(clubId): el único lugar que contesta "¿hay datos de este club acá y ahora?" (distingue "todavía no se eligió
  // club" de "se eligió pero su archivo todavía no bajó").
  function clubCargado(clubId){
    return !!(clubId && (window.CLUB_GENERIC_DATA || {})[clubId]);
  }
  window.clubCargado = clubCargado;

  // ---------- NAVEGACIÓN ----------
  const navButtons = document.querySelectorAll('#mainNav button');
  const sections = document.querySelectorAll('main > section');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.section).classList.add('active');
      // La pestaña activa también en <body>, para que el CSS esconda lo que en ella no hace nada (el USD / ARS del header en Comparar,
      // que siempre muestra USD).
      document.body.dataset.section = btn.dataset.section;
      escribirURL('push');
    });
  });

  // ---------- EL HEADER EN EL TELÉFONO (una fila: logo, lupa y menú) ----------
  // El menú es el mismo #mainNav mostrado como panel (css/styles.css, max-width:700px), así que elegir una sección es el mismo click
  // de siempre; acá solo se abre, se cierra y se rotula el botón con la sección actual.
  const headerEl = document.querySelector('header');
  const mMenuBtn = document.getElementById('mMenuBtn');
  const mVelo = document.getElementById('mVelo');
  function setMenuMovil(abierto){
    headerEl.classList.toggle('menu-abierto', abierto);
    mVelo.classList.toggle('abierto', abierto);
    mMenuBtn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  }
  function rotularMenuMovil(){
    const activo = document.querySelector('#mainNav button.active');
    document.getElementById('mMenuLbl').textContent = activo ? activo.textContent.trim() : '';
  }
  mMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuMovil(!headerEl.classList.contains('menu-abierto'));
  });
  mVelo.addEventListener('click', () => setMenuMovil(false));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') setMenuMovil(false); });
  navButtons.forEach(btn => btn.addEventListener('click', () => { setMenuMovil(false); rotularMenuMovil(); }));
  rotularMenuMovil();
  // La lupa abre el mismo selector que el botón de club del header de escritorio; al elegir, a Finanzas.
  document.getElementById('mBuscar').addEventListener('click', () => {
    irAFinanzasAlElegir = true;
    CLUB_SELECTOR.open();
  });
  // El atajo del selector, como lo escribe cada sistema: ⌘K en Mac, Ctrl K en el resto.
  if(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) document.querySelectorAll('#mBuscarK, .ini-kbd').forEach(k => { k.textContent = '⌘K'; });
  document.getElementById('mContacto').addEventListener('click', () => {
    setMenuMovil(false);
    document.getElementById('contactBtn').click();
  });
  document.getElementById('mIdioma').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-lang]');
    if(b) I18N.setLang(b.dataset.lang);
  });
  // Si la ventana se agranda con el menú abierto, se cierra: en escritorio no hay menú.
  const mqMovil = window.matchMedia('(max-width:700px)');
  mqMovil.addEventListener('change', () => { if(!mqMovil.matches) setMenuMovil(false); });

  // ---------- FINANZAS: lo de arriba de la página ----------
  // La moneda vive en el panel "Más opciones" de Finanzas (el único lugar donde cambia algo), no en el header. Se mueve el mismo
  // nodo, así que su listener y sus botones (populateCurrencyToggle) no se enteran.
  document.getElementById('finMonedaSlot').appendChild(document.getElementById('currencyToggleGlobal'));
  document.getElementById('finCambiar').addEventListener('click', () => CLUB_SELECTOR.open());
  // La guía: una línea que se cierra y no vuelve.
  document.getElementById('finGuiaX').addEventListener('click', () => {
    guiaCerrada = true;
    try { localStorage.setItem('finGuiaCerrada', '1'); } catch(e) {}
    document.getElementById('finGuia').hidden = true;
  });
  // El panel de la vista y su resumen en palabras ("Montos en USD, nominales, en formato simplificado"), leído de los botones activos:
  // así no hay un segundo estado que se pueda desincronizar. Con ?multi=0 no hay tarjeta de ejercicios: el panel queda abierto.
  const finAjustes = document.getElementById('finAjustes');
  const finVistaBtn = document.getElementById('finVistaBtn');
  finVistaBtn.addEventListener('click', () => {
    const abierto = !finAjustes.classList.contains('abierto');
    delete finAjustes.dataset.auto;
    finAjustes.classList.toggle('abierto', abierto);
    finVistaBtn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });
  function pintarVistaFin(){
    const activo = sel => { const b = document.querySelector(sel); return b ? b.textContent.trim() : ''; };
    const partes = [];
    const moneda = activo('#currencyToggleGlobal button.active');
    if(moneda) partes.push(I18N.t('finanzas.view.amountsIn', 'Montos en') + ' ' + moneda);
    if(!document.getElementById('realToggleWrap').hidden) partes.push(activo('#realToggle button.active').toLowerCase());
    partes.push(activo('#simplifyToggle button.active').toLowerCase());
    document.getElementById('finVistaTxt').textContent = partes.filter(Boolean).join(', ');
    // Abierto "de oficio" solo mientras no hay tarjeta de ejercicios; cuando aparece, vuelve a cerrarse (si no lo abrió el visitante).
    const sinTarjeta = document.getElementById('finYears').hidden;
    if(sinTarjeta && !finAjustes.classList.contains('abierto')){ finAjustes.dataset.auto = '1'; finAjustes.classList.add('abierto'); }
    else if(!sinTarjeta && finAjustes.dataset.auto){ delete finAjustes.dataset.auto; finAjustes.classList.remove('abierto'); }
  }
  // Cualquier cambio de botón activo (un click, o el JS que rearma la moneda al cambiar de club) repinta el resumen.
  new MutationObserver(pintarVistaFin).observe(finAjustes, { subtree:true, childList:true, attributes:true, attributeFilter:['class', 'hidden'] });
  new MutationObserver(pintarVistaFin).observe(document.getElementById('finYears'), { attributes:true, attributeFilter:['hidden'] });
  pintarVistaFin();
  // El índice marca la sección que se está leyendo: la última cuyo borde de arriba ya pasó debajo del header y del índice.
  const finIdxLinks = [...document.querySelectorAll('#finIndice a')];
  function marcarIndiceFin(){
    if(document.getElementById('finIndice').hidden) return;
    let actual = finIdxLinks[0];
    finIdxLinks.forEach(a => {
      const destino = document.querySelector(a.getAttribute('href'));
      if(destino && destino.offsetParent !== null && destino.getBoundingClientRect().top < 140) actual = a;
    });
    finIdxLinks.forEach(a => a.classList.toggle('activo', a === actual));
  }
  window.addEventListener('scroll', marcarIndiceFin, { passive:true });
  // Saltar sin escribir el #ancla en la URL: la URL es del estado de la pantalla (club, pestaña, años), no de la posición.
  finIdxLinks.forEach(a => a.addEventListener('click', e => {
    const destino = document.querySelector(a.getAttribute('href'));
    if(!destino) return;
    e.preventDefault();
    destino.scrollIntoView({ behavior:'smooth', block:'start' });
  }));
  marcarIndiceFin();

  // ---------- CURRENCY TOGGLE (universal, en el header) ----------
  // "Comparar Gestiones" lo ignora a propósito (displayFinancialsForClub, js/finanzas-calc.js: siempre USD). Los botones se
  // regeneran por club en populateCurrencyToggle() (modelo completo: cabecera de data/currency-map.js), así que el listener de
  // click se delega en el contenedor fijo #currencyToggleGlobal.
  document.getElementById('currencyToggleGlobal').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-currency]');
    if(!btn) return;
    document.querySelectorAll('#currencyToggleGlobal button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCurrency = btn.dataset.currency;
    refreshFinanzas();
  });

  // Arma el toggle [moneda nativa del club / USD]. Un club cuyo `reportingCurrency` YA ES 'USD' (ej. Ecuador, dolarizado) no tiene
  // nada que togglear y el contenedor se esconde. `currentCurrency` vuelve a USD al cambiar de club SOLO si la moneda elegida no
  // tiene sentido para el club nuevo; entre dos clubes de la misma moneda nativa, la elección se conserva.
  function populateCurrencyToggle(clubId){
    const wrap = document.getElementById('currencyToggleGlobal');
    const native = (clubs[clubId] || {}).reportingCurrency;
    // Sin club elegido (portada) no hay moneda nativa que ofrecer: si no, el toggle se pintaba con "undefined" al lado de USD.
    if(!native || native === 'USD'){
      wrap.style.display = 'none';
      currentCurrency = 'USD';
      return;
    }
    wrap.style.display = '';
    if(currentCurrency !== 'USD' && currentCurrency !== native) currentCurrency = 'USD';
    wrap.innerHTML = `<button data-currency="USD" class="${currentCurrency === 'USD' ? 'active' : ''}">USD</button>` +
      `<button data-currency="${native}" class="${currentCurrency === native ? 'active' : ''}">${native}</button>`;
  }

  // ---------- TOGGLE "FORMATO DEL CLUB" / "FORMATO SIMPLIFICADO" (Estado de resultados) ----------
  document.querySelectorAll('#simplifyToggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#simplifyToggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simplifyFormat = btn.dataset.simplify === '1';
      refreshFinanzas();
    });
  });

  // ---------- CONTACTO ----------
  document.getElementById('contactBtn').addEventListener('click', () => document.getElementById('contactModal').classList.add('open'));
  document.getElementById('cfCancel').addEventListener('click', () => document.getElementById('contactModal').classList.remove('open'));
  document.getElementById('contactModal').addEventListener('click', (e) => { if(e.target.id === 'contactModal') document.getElementById('contactModal').classList.remove('open'); });
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('cfNombre').value || 'Anónimo';
    const email = document.getElementById('cfEmail').value;
    const tipo = document.getElementById('cfTipo').value;
    const mensaje = document.getElementById('cfMensaje').value;
    const subject = encodeURIComponent(`[El deporte en Números] ${tipo} de ${nombre}`);
    const body = encodeURIComponent(`${mensaje}\n\nEmail de contacto: ${email || 'no provisto'}`);
    window.location.href = `mailto:guidomamone91@gmail.com?subject=${subject}&body=${body}`;
    document.getElementById('contactModal').classList.remove('open');
    document.getElementById('contactForm').reset();
  });

  // ---------- INIT ----------
  // Los selectores de Finanzas se generan también en la carga inicial, no solo al cambiar de club: el dropdown tiene que ser
  // SIEMPRE el que arma el JS, nunca las opciones estáticas del HTML.
  populateFinanzasSelectors(currentClub);
  populateCurrencyToggle(currentClub);
  refreshFinanzas();
  verifyTieOuts();
  checkFxSanity();
  renderResultados();
  renderTitulosTable();
  renderComparar();

  // ==========================================================================
  // EL ESTADO EN LA URL: qué pestaña, qué club y qué años, qué liga y qué ejercicio. Un link copiado abre lo mismo y "atrás" vuelve a
  // lo anterior. `?tab=finanzas&club=river-ar&anios=2021,2024`, `?tab=liga&liga=es-laliga&anio=2025`; Inicio no lleva nada. Se tocan
  // solo estas claves: `?multi=0`, `?audit=1` y las demás quedan como estaban. `var` y no `let`: refreshFinanzas() y la vista de
  // Ligas llaman a escribirURL() desde el INIT, antes de este bloque, y `urlLista` las frena hasta haber leído la URL de entrada.
  // ==========================================================================
  // `moneda`, `real` y `formato` van solo cuando no son los de siempre (USD, sin ajustar, formato simplificado): un link común queda
  // corto. `a` y `b` son los dos lados de Comparar (ladoAURL()).
  var URL_CLAVES = ['tab', 'club', 'anios', 'liga', 'anio', 'grupo', 'sponsor', 'moneda', 'real', 'formato', 'a', 'b', 'deporte', 'region', 'agrupar', 'orden', 'informes'];
  // UN LADO DE COMPARAR EN TEXTO: bloques separados por "~"; un bloque de clubes es "c.<club>:<año>,<club>:<año>" (sin año = el más
  // reciente) y uno de liga "l.<liga>.<años separados por coma>"; al final ".s" (suma) o ".p" (promedio) solo si no es el de siempre
  // (clubes suman, ligas promedian). `?tab=vs&a=c.boca-ar:2024&b=c.river-ar:2024`, `b=l.es-laliga.2025`.
  function ladoAURL(l){
    if(!l || !l.bloques || !l.bloques.length) return null;
    return l.bloques.map(b => {
      const agg = b.kind === 'liga' ? (b.agg === 'suma' ? '.s' : '') : (b.agg === 'promedio' ? '.p' : '');
      if(b.kind === 'liga') return 'l.' + b.league + '.' + (b.years || []).join(',') + agg;
      return 'c.' + (b.pares || []).map(p => p[0] + (p[1] != null ? ':' + p[1] : '')).join(',') + agg;
    }).join('~');
  }
  // Lo inverso. Un club o una liga que el sitio no tiene se descartan (el link viejo no rompe nada); sin bloques válidos, el lado queda vacío.
  function ladoDeURL(txt){
    if(!txt) return null;
    const bloques = [];
    txt.split('~').forEach(s => {
      const partes = s.split('.');
      let agg = null;
      if(partes.length > 2 && (partes[partes.length - 1] === 's' || partes[partes.length - 1] === 'p')) agg = partes.pop() === 's' ? 'suma' : 'promedio';
      if(partes[0] === 'l' && partes.length === 3 && (window.LEAGUES || {})[partes[1]]){
        const years = partes[2].split(',').map(Number).filter(y => Number.isInteger(y) && y > 1800);
        if(years.length) bloques.push({ kind:'liga', league:partes[1], years, agg:agg || 'promedio' });
      } else if(partes[0] === 'c' && partes.length === 2){
        const pares = partes[1].split(',').map(x => x.split(':')).map(p => [window.resolverClubId(p[0]), p[1]]).filter(p => clubs[p[0]])
          .map(p => [p[0], p[1] && Number.isInteger(Number(p[1])) ? Number(p[1]) : null]);
        if(pares.length) bloques.push({ kind:'clubes', pares, agg:agg || 'suma' });
      }
    });
    return bloques.length ? bloques : null;
  }
  var urlLista = false, aplicandoURL = false;
  function estadoActual(){
    const tab = (document.querySelector('#mainNav button.active') || {}).dataset?.section || 'inicio';
    const e = {};
    if(tab !== 'inicio') e.tab = tab;
    if(tab === 'finanzas' && currentClub){
      e.club = currentClub;
      if(FIN_SEL.years().length) e.anios = FIN_SEL.years().join(',');
      if(currentCurrency !== 'USD') e.moneda = currentCurrency;
      if(window.FIN_REAL && FIN_REAL.activo()) e.real = 1;
      if(!simplifyFormat) e.formato = 'club';
    }
    if(tab === 'vs'){
      const l = CLUB_SELECTOR.lados();
      const a = ladoAURL(l[0]), b = ladoAURL(l[1]);
      if(a) e.a = a;
      if(b) e.b = b;
      if(CLUB_SELECTOR.real()) e.real = 1;
    }
    if(tab === 'liga'){
      const c = LIGA_VIEW.current();
      if(c.league){ e.liga = c.league; if(c.year) e.anio = c.year; }
      else if(c.filtros){
        // La lista de ligas sin liga elegida: solo lo que no es de siempre.
        if(c.filtros.deporte) e.deporte = c.filtros.deporte;
        if(c.filtros.region) e.region = c.filtros.region;
        if(c.filtros.agrupar !== 'pais') e.agrupar = c.filtros.agrupar;
        if(c.filtros.orden !== 'az') e.orden = c.filtros.orden;
        if(c.filtros.informes) e.informes = 1;
      }
    }
    if(tab === 'grupo' && window.GRUPO_VIEW && GRUPO_VIEW.current().grupo) e.grupo = GRUPO_VIEW.current().grupo;
    if(tab === 'sponsor' && window.SPONSOR_VIEW && SPONSOR_VIEW.current().sponsor) e.sponsor = SPONSOR_VIEW.current().sponsor;
    return e;
  }
  // LOS LINKS RELATIVOS (fuentes.html, fuentes/<id>.html, correcciones.html…) se resuelven contra la URL de la barra, que en /club/<id> y /liga/<id>
  // ya no es la raíz: se reescriben a absolutos al cargar y, para los que arma el JS después, justo antes de usarlos.
  function absolutizarLink(a){
    const h = a.getAttribute('href');
    if(h && !/^([a-z][a-z0-9+.-]*:|\/|#|\?)/i.test(h)) a.setAttribute('href', fosUrl(h));
  }
  document.querySelectorAll('a[href]').forEach(absolutizarLink);
  ['pointerdown', 'click', 'contextmenu', 'focusin'].forEach(ev => document.addEventListener(ev, e => {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if(a) absolutizarLink(a);
  }, true));
  // LA RUTA: Finanzas con un club es `/club/<id>` y Ligas con una liga `/liga/<id>` (páginas con su propia tarjeta al compartir); el resto
  // de las pestañas vive en `/`. Sin servidor http (file://) no se tocan las rutas y todo queda en la query.
  var CON_RUTA = /^https?:$/.test(location.protocol);
  function rutaDeURL(){
    const m = /^\/(club|liga)\/([^\/?#]+?)(?:\.html)?\/?$/.exec(decodeURIComponent(location.pathname));
    return m ? { tipo: m[1], id: m[2] } : null;
  }
  // `window.FOS_RUTA` lo escribe la página generada; solo vale para la primera lectura: después manda la barra de direcciones.
  var rutaInicial = window.FOS_RUTA || null;
  // El título de la pestaña sigue a la ruta. En la ruta por la que se entró queda el de la página generada (el que ven los buscadores).
  var tituloEntrada = document.title, pathEntrada = location.pathname.replace(/\.html$/, '');
  function tituloDe(ruta){
    const sitio = I18N.t('site.name', 'El deporte en Números');
    const m = /^\/(club|liga)\/(.+)$/.exec(ruta || '');
    if(m && ruta === pathEntrada) return tituloEntrada;
    const nombre = m && (m[1] === 'club' ? (clubs[m[2]] || {}).displayName : ((window.LEAGUES || {})[m[2]] || {}).name);
    return nombre ? nombre + ' | ' + sitio : I18N.t('site.title', 'El deporte en Números | Las finanzas de los clubes, directo de la fuente');
  }
  // EL SCROLL AL CAMBIAR DE VISTA, en un solo lugar: toda navegación pasa por escribirURL(). Otra vista (otra pestaña, club, liga, grupo
  // o sponsor) arranca arriba, o en el ancla si la URL trae una; el año, la moneda o un filtro no son otra vista y no mueven nada.
  // "Atrás", "adelante" y recargar vuelven a la altura en que se dejó esa entrada del historial (cada una lleva una clave `k`): se anota
  // justo antes de cada click (antes de que el click redibuje y la página se achique), al apretar atrás o adelante, y en history.state
  // cuando el scroll se detiene, para que la recarga la encuentre (Chrome no guarda un replaceState hecho en pagehide).
  var vistaEscrita = null, restaurarScroll = true, alturas = {};
  if('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function claveNueva(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function claveDeEntrada(){
    if(!(history.state || {}).k) try { history.replaceState(Object.assign({}, history.state, { k: claveNueva() }), ''); } catch(e){}
    return (history.state || {}).k;
  }
  var claveActual = claveDeEntrada();
  function guardarScroll(){
    // Mientras "atrás" lleva la pantalla a la entrada nueva, los clicks son del propio sitio y pisarían la altura que hay que restaurar.
    if(aplicandoURL) return;
    alturas[claveActual] = window.scrollY;
    try { history.replaceState(Object.assign({}, history.state, { y: window.scrollY }), ''); } catch(e){}
  }
  document.addEventListener('click', guardarScroll, true);
  // Con espera, y solo si sigue siendo la misma entrada: un replaceState por cada evento de scroll lo frena Safari.
  var esperaScroll = null;
  window.addEventListener('scroll', () => {
    clearTimeout(esperaScroll);
    const clave = claveActual;
    esperaScroll = setTimeout(() => { if(clave === claveActual) guardarScroll(); }, 250);
  }, { passive: true });
  // EL FOCO SIGUE A LA VISTA: va al primer título visible de la sección nueva (o a la sección), para que el teclado y el lector de pantalla
  // arranquen ahí y no en `body` (el elemento que se tocó, una fila de la lista de Ligas por ejemplo, ya no existe). Al abrir la página no
  // se mueve: el foco de entrada es del navegador.
  function focoDeVista(){
    const s = document.querySelector('main > section.active');
    if(!s) return;
    const h = [...s.querySelectorAll('h1, h2')].find(x => x.offsetParent) || s;
    if(!h.hasAttribute('tabindex')){ h.setAttribute('tabindex', '-1'); h.classList.add('foco-vista'); }
    h.focus({ preventScroll: true });
  }
  function scrollDeVista(e){
    const vista = [e.tab, e.club, e.liga, e.grupo, e.sponsor].join('|');
    if(vista === vistaEscrita) return;
    const primera = vistaEscrita === null;
    vistaEscrita = vista;
    const ancla = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(ancla) ancla.scrollIntoView();
    else window.scrollTo(0, restaurarScroll ? alturas[claveActual] ?? (history.state || {}).y ?? 0 : 0);
    restaurarScroll = false;
    if(!primera) focoDeVista();
  }
  function escribirURL(modo){
    if(!urlLista || aplicandoURL) return;
    const p = new URLSearchParams(location.search);
    URL_CLAVES.forEach(k => p.delete(k));
    const e = estadoActual();
    scrollDeVista(e);
    let ruta = null;
    if(CON_RUTA && e.tab === 'finanzas' && e.club){ ruta = '/club/' + e.club; delete e.tab; delete e.club; }
    else if(CON_RUTA && e.tab === 'liga' && e.liga){ ruta = '/liga/' + e.liga; delete e.tab; delete e.liga; }
    Object.entries(e).forEach(([k, v]) => p.set(k, v));
    const q = p.toString().replace(/%2C/g, ',').replace(/%3A/g, ':').replace(/%7E/g, '~');
    const path = ruta || (CON_RUTA ? '/' : location.pathname);
    document.title = tituloDe(ruta);
    const url = path + (q ? '?' + q : '') + location.hash;
    if(url === location.pathname + location.search + location.hash) return;
    // Cambiar de club (o de liga) con la barra ya en una ruta suma una entrada al historial: "atrás" vuelve al anterior.
    const antes = rutaDeURL();
    const otro = ruta && antes && ruta.split('/')[1] === antes.tipo && ruta !== '/' + antes.tipo + '/' + antes.id;
    if(modo === 'push' || otro){ claveActual = claveNueva(); history.pushState({ k: claveActual }, '', url); }
    else history.replaceState(history.state, '', url);
  }
  // Lleva la pantalla a lo que dice la URL. Un club o una liga que no existen se ignoran (el link viejo no rompe nada).
  function aplicarURL(){
    const p = new URLSearchParams(location.search);
    const ruta = rutaDeURL() || rutaInicial;
    rutaInicial = null;
    if(ruta){
      if(ruta.tipo === 'club' || ruta.tab === 'finanzas'){ p.set('tab', 'finanzas'); p.set('club', ruta.id || ruta.club); }
      else { p.set('tab', 'liga'); p.set('liga', ruta.id || ruta.liga); }
    }
    const tab = p.get('tab') || 'inicio';
    const club = window.resolverClubId(p.get('club'));
    const anios = (p.get('anios') || '').split(',').map(Number).filter(Number.isFinite).filter(Boolean);
    const liga = p.get('liga');
    const anio = Number(p.get('anio')) || null;
    const grupo = p.get('grupo'), sponsor = p.get('sponsor');
    const moneda = p.get('moneda'), real = p.get('real') === '1', formatoClub = p.get('formato') === 'club';
    aplicandoURL = true;
    let paso = Promise.resolve();
    if(club && clubs[club] && club !== currentClub) paso = selectClub(club);
    return paso.then(() => {
      if(tab === 'finanzas' && club && club === currentClub){
        if(anios.length) FIN_SEL.set(anios);
        // Moneda, inflación y formato: lo que dice la URL, y sin la clave el de siempre ("atrás" desde un link en pesos vuelve a USD).
        // La moneda va después de cargar el club: populateCurrencyToggle() la lleva a USD si el club no la tiene.
        currentCurrency = moneda && moneda === (clubs[club] || {}).reportingCurrency ? moneda : 'USD';
        populateCurrencyToggle(club);
        if(window.FIN_REAL) FIN_REAL.set(real);
        simplifyFormat = !formatoClub;
        document.querySelectorAll('#simplifyToggle button').forEach(b => b.classList.toggle('active', (b.dataset.simplify === '1') === simplifyFormat));
        refreshFinanzas();
      }
      if(tab === 'vs' && (p.has('a') || p.has('b'))){
        CLUB_SELECTOR.setReal(real);
        CLUB_SELECTOR.setLados(ladoDeURL(p.get('a')), ladoDeURL(p.get('b')));
      }
      if(tab === 'liga'){
        if(liga && (window.LEAGUES || {})[liga]) return LIGA_VIEW.show(liga, anio);
        LIGA_VIEW.setFiltros({ deporte: p.get('deporte'), region: p.get('region'), agrupar: p.get('agrupar'), orden: p.get('orden'), informes: p.get('informes') === '1' });
        return LIGA_VIEW.frio();
      }
      if(tab === 'grupo' && window.GRUPO_VIEW && (window.GRUPOS_INDICE || []).some(g => g.id === grupo)) return GRUPO_VIEW.show(grupo);
      // Un sponsor que no existe lo dice la propia página ("No encontramos ese sponsor"): para saberlo hay que bajar data/sponsors.js.
      if(tab === 'sponsor' && window.SPONSOR_VIEW && sponsor) return SPONSOR_VIEW.show(sponsor);
    }).then(() => {
      const btn = document.querySelector('#mainNav button[data-section="' + tab + '"]');
      if(btn && !btn.hidden && !btn.classList.contains('active')) irASeccion(tab);
    }).catch(err => console.error('[url] no se pudo abrir el estado de la URL', err))
      .finally(() => { aplicandoURL = false; urlLista = true; escribirURL('replace'); restaurarScroll = false; });
  }
  window.addEventListener('popstate', () => {
    alturas[claveActual] = window.scrollY;
    claveActual = claveDeEntrada();
    restaurarScroll = true;
    aplicarURL();
  });

  // Y recién acá entra lo que hay que mostrar: lo que pide la URL (un link compartido) y, si no pide nada, el club de la visita
  // anterior, por el mismo camino que un click en el selector.
  // La página generada trae su texto para quien no corre JS dentro de #pagina-estatica: al arrancar la app se esconde.
  var estatica = document.getElementById('pagina-estatica');
  if(estatica) estatica.style.display = 'none';
  if(rutaInicial || rutaDeURL() || URL_CLAVES.some(k => new URLSearchParams(location.search).has(k))) aplicarURL();
  else {
    urlLista = true;
    scrollDeVista(estadoActual());
    if(clubGuardado) selectClub(clubGuardado);
  }

  // ==========================================================================
  // SELECTOR DE IDIOMA
  //
  // El menú se dibuja leyendo `window.LANGS` (data/lang/langs.js), así que sumar un idioma NO toca este código ni el HTML: alcanza
  // con la entrada en LANGS y su `data/lang/<code>.js`. Convención, no un mapa a mano.
  // ==========================================================================
  function renderLangMenu(){
    const menu = document.getElementById('langMenu');
    menu.innerHTML = Object.keys(window.LANGS).map(code => {
      const l = window.LANGS[code];
      const active = (code === I18N.current) ? ' class="active"' : '';
      return `<button type="button" role="menuitem" data-lang="${code}"${active}>${l.name}</button>`;
    }).join('');
    document.getElementById('langBtnLabel').textContent = I18N.current.toUpperCase();
    document.getElementById('mIdioma').innerHTML = Object.keys(window.LANGS).map(code =>
      `<button type="button" data-lang="${code}"${code === I18N.current ? ' class="active"' : ''}>${code.toUpperCase()}</button>`).join('');
  }

  function setLangMenuOpen(open){
    const menu = document.getElementById('langMenu');
    const btn  = document.getElementById('langBtn');
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.getElementById('langBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    setLangMenuOpen(document.getElementById('langMenu').hidden);
  });

  document.getElementById('langMenu').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-lang]');
    if (!b) return;
    I18N.setLang(b.dataset.lang);
    setLangMenuOpen(false);
  });

  // Cerrar el menú al hacer click afuera o con Escape (si no, queda abierto tapando
  // el contenido, que es justo lo que pasa con un dropdown hecho a mano sin esto).
  document.addEventListener('click', () => setLangMenuOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setLangMenuOpen(false); });

  // Todo lo que se genera en JS hay que volver a dibujarlo cuando cambia el idioma:
  // `I18N.apply()` solo alcanza para lo que está escrito en el HTML con data-i18n.
  // Si mañana se agrega una vista nueva que genere texto propio, sumarla ACÁ.
  I18N.onChange(() => {
    renderLangMenu();
    // El chip del club del header y el modal del selector se arman en JS: sin esta llamada no se vuelven a traducir.
    CLUB_SELECTOR.refresh();
    populateFinanzasSelectors(currentClub);
    populateCurrencyToggle(currentClub);
    refreshFinanzas();
    renderResultados();
    renderTitulosTable();
    renderComparar();
    // La pestaña Fuentes arma su contenido en JS: sin esto, el título y las etiquetas quedan en el idioma del arranque.
    // refreshFinanzas(), acá arriba, ya redibuja la ficha de Fuentes de Finanzas.
    // La pestaña Ligas también arma todo su contenido en JS.
    LIGA_VIEW.refresh();
    if(window.SPONSOR_VIEW) SPONSOR_VIEW.refresh();
    rotularMenuMovil();
    pintarVistaFin();
  });

  I18N.init().then(renderLangMenu);

  // ==========================================================================
  // auditAll() — AUDITORÍA COMPLETA, DE TODOS LOS CLUBES
  //
  // verifyTieOuts() y checkFxSanity() solo revisan los clubes CARGADOS en memoria, y los clubes se cargan por demanda: sin esto,
  // un error de datos en un club que nadie abre es invisible. La carga por demanda se conserva (el visitante que solo quiere ver un
  // club no baja todos); acá se fuerza la carga de todos.
  //
  // REGLA: cualquier verificación total pasa por computeYearGeneric(), el motor real; nunca reimplementar la cascada (una fórmula
  // simplificada tiró falsos positivos por no contemplar nonCash, profitOnPlayerSales, assetSales ni tax).
  //
  // CÓMO SE USA:
  //   - `financeofsports.com/?audit=1` — carga todos los clubes y audita todo.
  //   - `auditAll()` desde la consola del navegador, en cualquier momento.
  // Devuelve una Promise con el resumen, además de imprimirlo.
  // ==========================================================================
  async function auditAll(){
    const ids = Object.keys(clubs);
    const failedToLoad = [];
    console.log(`[auditoría] cargando los ${ids.length} clubes...`);
    // EN TANDAS PARALELAS, NO DE A UNO: en fila serían decenas de segundos con muchos clubes, y esto corre antes de cada push que
    // toque datos. El tamaño de tanda es un TECHO (el navegador ya limita a ~6 conexiones por origen): sirve para no inyectar miles
    // de <script> de una. `allSettled` Y NO `all`: el primer club que falla no aborta la tanda, y `failedToLoad` conserva un orden
    // determinista.
    // OJO SI ALGÚN DÍA UN data/<país>/<club>-data.js LOGUEA ALGO: hoy ninguno lo hace y las verificaciones corren DESPUÉS de toda la carga,
    // así que cargar en paralelo no entremezcla mensajes. Un data file que loguee tendría que prefijar su propio id.
    const TANDA = 25;
    for(let i = 0; i < ids.length; i += TANDA){
      const tanda = ids.slice(i, i + TANDA);
      const res = await Promise.allSettled(tanda.map(id => loadClubData(id)));
      res.forEach((r, j) => {
        if(r.status !== 'rejected') return;
        failedToLoad.push(tanda[j]);
        console.error(`[auditoría] no se pudo cargar ${tanda[j]}:`, r.reason && r.reason.message);
      });
    }

    // Se interceptan console.log/error para CONTAR, pero se deja pasar todo a la
    // consola igual: el detalle línea por línea sigue siendo útil para encontrar
    // cuál check falló, el resumen es un agregado arriba de eso, no un reemplazo.
    let ok = 0; const failures = [], warnings = [];
    const realLog = console.log, realError = console.error, realWarn = console.warn;
    console.log = (...a) => { const t = a.join(' '); if(t.includes('OK, cierra')) ok++; realLog(...a); };
    console.error = (...a) => { const t = a.join(' '); if(t.includes('[verificación]')) failures.push(t); realError(...a); };
    console.warn = (...a) => { const t = a.join(' '); if(t.includes('fx')) warnings.push(t); realWarn(...a); };
    try { verifyTieOuts(); checkFxSanity(); }
    finally { console.log = realLog; console.error = realError; console.warn = realWarn; }

    const summary = {
      clubes: ids.length,
      clubesQueNoCargaron: failedToLoad,
      checksOK: ok,
      checksQueNoCierran: failures.length,
      warningsDeTipoDeCambio: warnings.length,
      detalle: { noCierran: failures, fx: warnings },
    };
    const limpio = failures.length === 0 && warnings.length === 0 && failedToLoad.length === 0;
    console[limpio ? 'log' : 'error'](
      `[auditoría] ${ids.length} clubes · ${ok} checks cierran · ${failures.length} no cierran · ` +
      `${warnings.length} warnings de fx · ${failedToLoad.length} clubes que no cargaron` +
      (limpio ? ' -> TODO OK' : ' -> REVISAR')
    );
    return summary;
  }
  window.auditAll = auditAll;

  // `?audit=1` dispara la auditoría completa sola, para poder pegar el link en
  // una sesión o revisarlo después de un deploy sin tener que abrir la consola.
  if(new URLSearchParams(location.search).get('audit') === '1'){
    auditAll();
  }

// ============================================================================
// PÁGINA DE UN GRUPO MULTICLUB (sección #grupo). Los clubes que controla el grupo, con link a los que están en el sitio, y el total de
// ingresos por año: la suma, en millones de USD y formato simplificado, de los clubes controlados que tienen ese ejercicio en
// data/rankings/ (lo copia tools/entidades.mjs a data/entidades/_grupos-detalle.js, que se baja la primera vez que se abre un grupo).
// No es un consolidado y la página lo dice. GRUPO_VIEW.show(id) dibuja; quien llama elige la sección (contrato con el lector de URL).
// ============================================================================
const GRUPO_VIEW = (function(){
  let actual = null, pedido = null, grafico = null;
  const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const lang = () => (window.I18N && I18N.current) || 'es';
  const vale = (c, y) => (c.desde == null || c.desde <= y) && (c.hasta == null || y <= c.hasta);
  const num = v => v.toLocaleString(lang() === 'es' ? 'es-AR' : 'en-GB', { minimumFractionDigits:1, maximumFractionDigits:1 });

  function cargar(){
    if(window.GRUPOS) return Promise.resolve();
    if(!pedido) pedido = new Promise(res => {
      const s = document.createElement('script');
      s.src = fosUrl('data/entidades/_grupos-detalle.js') + fosV('data/entidades/_grupos-detalle.js');
      s.onload = res; s.onerror = () => { console.error('[grupo] no cargó data/entidades/_grupos-detalle.js'); res(); };
      document.head.appendChild(s);
    });
    return pedido;
  }
  function pais(iso){ try { return new Intl.DisplayNames([lang()], { type:'region' }).of(iso); } catch(e){ return iso; } }
  function etiqueta(clubId, y){
    return clubId && typeof esEjercicioCalendario === 'function' && esEjercicioCalendario(clubId, y) ? String(y) : (y - 1) + '/' + String(y).slice(2);
  }
  function verFuente(f){
    if(!f) return '';
    if(f.md) return `<a class="estr-ver" href="${esc(encodeURI(f.md))}" target="_blank" rel="noopener">${esc(t('estr.ver.doc', 'ver en el balance'))}</a>`;
    let host = f.url; try { host = new URL(f.url).hostname.replace(/^www\./, ''); } catch(e){}
    return `<a class="estr-ver" href="${esc(f.url)}" target="_blank" rel="noopener">${esc(t('estr.ver.url', 'ver en'))} ${esc(host)}</a>`;
  }
  const nombreClub = c => c.clubId ? ((clubs[c.clubId] || {}).displayName || c.nombre) : c.nombre;
  function ligaDe(c, y){
    if(!c.clubId) return c.pais ? pais(c.pais) : '—';
    const l = typeof leagueAt === 'function' ? leagueAt(c.clubId, y) : null;
    return (l && (window.LEAGUES || {})[l] || {}).name || pais((clubs[c.clubId] || {}).country || '');
  }

  function render(){
    const caja = document.getElementById('grupoView');
    const g = (window.GRUPOS || {})[actual];
    if(!caja) return;
    if(!g){ caja.innerHTML = `<p class="subtitle">${esc(t('grupo.nohay', 'No encontramos ese grupo.'))}</p>`; return; }
    const control = g.clubes.filter(c => c.control);
    const menores = g.clubes.filter(c => !c.control);
    const conDatos = Object.values(g.ingresos).flatMap(o => Object.keys(o).map(Number));
    const desde = Math.min(...control.map(c => c.desde).filter(v => v != null));
    const hasta = Math.max(desde, ...conDatos);
    const anios = []; for(let y = desde; y <= hasta; y++) anios.push(y);
    const ultimo = conDatos.length ? Math.max(...conDatos) : hasta;
    const ingreso = (c, y) => c.clubId && g.ingresos[c.clubId] ? g.ingresos[c.clubId][y] : undefined;

    const filas = control.map(c => {
      const v = ingreso(c, ultimo);
      const color = c.clubId && (clubs[c.clubId] || {}).brandColor || '#c9ced8';
      return `<tr>
        <td><span class="grupo-club"><span class="grupo-sw" style="background:${esc(c.clubId && v != null ? color : '#c9ced8')}" aria-hidden="true"></span>${c.clubId
          ? `<a href="?tab=finanzas&amp;club=${esc(encodeURIComponent(c.clubId))}">${esc(nombreClub(c))}</a>` : esc(nombreClub(c))}</span></td>
        <td>${esc(ligaDe(c, ultimo))}</td>
        <td>${c.desde != null ? esc(etiqueta(c.clubId, c.desde)) : '—'}${c.hasta != null ? ' – ' + esc(etiqueta(c.clubId, c.hasta)) : ''}</td>
        <td class="num">${v != null ? num(v) : `<span class="grupo-sin">${esc(t('grupo.sinbalance', 'sin balance'))}</span>`}</td>
        <td>${verFuente(c.fuente)}</td></tr>`;
    }).join('');
    const totales = anios.map(y => {
      const del = control.filter(c => vale(c, y));
      const con = del.filter(c => ingreso(c, y) != null);
      return { y, n: del.length, k: con.length, total: con.reduce((s, c) => s + ingreso(c, y), 0) };
    });
    const tu = totales.find(x => x.y === ultimo) || { n: control.length, k: 0 };

    caja.innerHTML = `
      <button type="button" class="grupo-volver" data-volver>← ${esc(t('grupo.volver', 'Volver a Finanzas'))}</button>
      <span class="grupo-kicker">${esc(t('grupo.kicker', 'Grupo multiclub'))}</span>
      <h1 class="grupo-h1">${esc(g.nombre)}</h1>
      <p class="grupo-sub">${esc(g.legal)}${g.pais ? ' · ' + esc(pais(g.pais)) : ''}. ${verFuente(g.fuente)}${g.duenoUltimo ? `<br>${esc(t('estr.rol.ultimo', 'Dueño último'))}: ${esc(g.duenoUltimo.nombre)}${g.duenoUltimo.pais ? ' (' + esc(pais(g.duenoUltimo.pais)) + ')' : ''}. ${verFuente(g.duenoUltimo.fuente)}` : ''}</p>
      <div class="card">
        <h2>${esc(t('grupo.clubes', 'Los clubes del grupo'))}</h2>
        <div class="table-scroll"><table class="grupo-tabla">
          <thead><tr><th>${esc(t('grupo.th.club', 'Club'))}</th><th>${esc(t('grupo.th.liga', 'Liga o país'))}</th><th>${esc(t('grupo.th.desde', 'En el grupo'))}</th>
            <th class="num">${esc(t('grupo.th.ingresos', 'Ingresos'))} ${esc(etiqueta(null, ultimo))} (M USD)</th><th>${esc(t('grupo.th.fuente', 'De dónde sale'))}</th></tr></thead>
          <tbody>${filas}</tbody></table></div>
        <p class="subtitle">${menores.length
          ? esc(t('grupo.menores', 'Participaciones de 50 % o menos, fuera del total:')) + ' ' + menores.map(c => esc(nombreClub(c)) + (c.pct != null ? ' (' + c.pct + ' %)' : '')).join(', ')
          : esc(t('grupo.sinmenores', 'Participaciones de 50 % o menos: ninguna registrada.'))}</p>
      </div>
      <div class="card">
        <h2>${esc(t('grupo.total', 'Ingresos del grupo, por año'))}</h2>
        <p class="subtitle">${esc(t('grupo.unidad', 'Millones de dólares, nominales, formato simplificado.'))}</p>
        <div class="grupo-chart"><canvas id="grupoChart" aria-label="${esc(t('grupo.total', 'Ingresos del grupo, por año'))}" role="img"></canvas></div>
        <p class="grupo-cuantos">${totales.map(x => `<span><strong>${esc(etiqueta(null, x.y))}</strong> ${x.k} ${esc(t('grupo.de', 'de'))} ${x.n} ${esc(t(x.n === 1 ? 'grupo.club1' : 'grupo.clubN', x.n === 1 ? 'club' : 'clubes'))}</span>`).join('')}</p>
        <p class="grupo-aviso"><strong>${esc(t('grupo.aviso.t', 'Lo que este total no es.'))}</strong> ${esc(t('grupo.aviso.a', 'Suma solo los clubes que el grupo controla y que tienen balance en el sitio'))}: ${esc(etiqueta(null, ultimo))}, ${tu.k} ${esc(t('grupo.de', 'de'))} ${tu.n}. ${esc(t('grupo.aviso.b', 'No es un consolidado: lo que un club del grupo le vende a otro se cuenta en los dos. Cada club se suma con su propio cierre de ejercicio.'))}</p>
      </div>`;

    caja.querySelector('[data-volver]').addEventListener('click', () => {
      const b = document.querySelector('#mainNav button[data-section="finanzas"]');
      if(b) b.click();
    });
    if(grafico){ grafico.destroy(); grafico = null; }
    if(typeof Chart === 'undefined') return;
    const sets = control.filter(c => c.clubId && g.ingresos[c.clubId]).map(c => ({
      label: nombreClub(c), backgroundColor: (clubs[c.clubId] || {}).brandColor || '#0a2b5c',
      data: anios.map(y => vale(c, y) && ingreso(c, y) != null ? ingreso(c, y) : null),
    }));
    grafico = new Chart(document.getElementById('grupoChart'), {
      type: 'bar',
      data: { labels: anios.map(y => etiqueta(null, y)), datasets: sets },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' },
        tooltip: { callbacks: { label: ctx => ctx.dataset.label + ': ' + num(ctx.parsed.y) + ' M USD' } } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } },
    });
  }

  function show(id){
    actual = id;
    return cargar().then(render);
  }
  // Desde Finanzas: dibuja el grupo y se para en su sección (el botón de #mainNav está escondido; click() igual lo activa).
  function abrir(id){
    return show(id).then(() => {
      const b = document.querySelector('#mainNav button[data-section="grupo"]');
      if(b) b.click();
    });
  }
  return { show, abrir, current: () => ({ grupo: actual }), refresh: () => { if(actual) render(); } };
})();
window.GRUPO_VIEW = GRUPO_VIEW;

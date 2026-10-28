// ============================================================================
// LA PÁGINA DE UN SPONSOR DE CAMISETA O DE UNA MARCA TÉCNICA (sección #sponsor). Los equipos que lleva hoy y todas sus temporadas, de
// toda la liga: un equipo que el sitio no tiene va en gris y sin link. Lee data/sponsors.js (formato: cabecera de
// tools/generate-sponsors.js), que es grande y se baja recién al abrir la página. "Hoy" = las entradas cuyo año es la temporada en curso
// de su liga (SPONSORS.actuales). El año es el del final de la temporada (2027 = 2026/27).
// ============================================================================
const SPONSOR_VIEW = (function(){
  const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const slug = s => norm(s).replace(/ /g, '-');
  let pedido = null, actual = null;
  let hooks = { irAClub: null };

  function cargar(){
    if(window.SPONSORS) return Promise.resolve();
    if(!pedido) pedido = new Promise(res => {
      const s = document.createElement('script');
      s.src = fosUrl('data/sponsors.js') + fosV('data/sponsors.js');
      s.onload = res; s.onerror = () => { console.error('[sponsor] no cargó data/sponsors.js'); res(); };
      document.head.appendChild(s);
    });
    return pedido;
  }
  // El índice chico (data/sponsors-indice.js: [id, nombre, roles]) es para el buscador: se baja la primera vez que alguien busca, no
  // al entrar al sitio.
  let pedidoIndice = null;
  function cargarIndice(){
    if(window.SPONSORS_INDICE) return Promise.resolve();
    if(!pedidoIndice) pedidoIndice = new Promise(res => {
      const s = document.createElement('script');
      s.src = fosUrl('data/sponsors-indice.js') + fosV('data/sponsors-indice.js');
      s.onload = res; s.onerror = () => { console.error('[sponsor] no cargó data/sponsors-indice.js'); res(); };
      document.head.appendChild(s);
    });
    return pedidoIndice;
  }
  const liga = lid => (window.LEAGUES || {})[lid] || {};
  const bandera = lid => ((window.COUNTRIES || {})[liga(lid).country] || {}).flag || '';
  // Una liga de temporada partida tiene como temporada en curso la del año que viene: la más alta de SPONSORS.actuales.
  function partida(lid){
    const act = window.SPONSORS.actuales, max = Math.max(...Object.values(act));
    return act[lid] === max;
  }
  const temporada = (lid, y) => partida(lid) ? (y - 1) + '/' + String(y).slice(2) : String(y);

  // El sponsor del nombre que muestra Finanzas: entre los que tienen a ese club con ese rol, el del nombre más parecido; si no, el slug.
  function resolver(nombre, clubId, rol){
    const L = window.SPONSORS.lista, n = norm(nombre);
    const cand = Object.keys(L).filter(id => L[id].e.some(e => e[3] === clubId && (!rol || e[4] === rol)));
    return cand.find(id => norm(L[id].n) === n) || cand.find(id => n.includes(norm(L[id].n)) || norm(L[id].n).includes(n))
      || (L[slug(nombre)] ? slug(nombre) : null);
  }

  function render(){
    const caja = document.getElementById('sponsorView');
    if(!caja) return;
    const S = window.SPONSORS, s = S && S.lista[actual];
    if(!s){ caja.innerHTML = `<p class="subtitle">${esc(t('spo.nada', 'No encontramos ese sponsor.'))}</p>`; return; }
    const rolTxt = s.roles.length > 1 ? t('spo.rol.cm', 'Sponsor de camiseta y marca técnica')
      : s.roles[0] === 'm' ? t('spo.rol.m', 'Marca técnica') : t('spo.rol.c', 'Sponsor de camiseta');
    // Un equipo es su clubId o, si el sitio no lo tiene, la liga y el nombre.
    const clave = e => e[3] || (e[0] + '|' + e[2]);
    const hoy = s.e.filter(e => e[1] === S.actuales[e[0]]);
    const equipos = new Map();
    s.e.forEach(e => {
      const k = clave(e);
      if(!equipos.has(k)) equipos.set(k, { equipo: e[3] ? ((clubs[e[3]] || {}).displayName || e[2]) : e[2], club: e[3], liga: e[0], ys: new Map(), ultimo: 0 });
      const q = equipos.get(k);
      q.ys.set(e[1], (q.ys.get(e[1]) || '') + e[4]);
      q.ultimo = Math.max(q.ultimo, e[1]);
    });
    const ligas = new Set(s.e.map(e => e[0]));
    const ys = s.e.map(e => e[1]), desde = Math.min(...ys), hasta = Math.max(...ys);
    const lidDesde = s.e.find(e => e[1] === desde)[0];
    const resumen = [hoy.length ? t('spo.hoy1', 'Hoy en') + ' ' + hoy.length + ' ' + (hoy.length === 1 ? t('spo.equipo', 'equipo') : t('spo.equipos', 'equipos')) : t('spo.hoy0', 'Hoy en ningún equipo'),
      equipos.size + ' ' + (equipos.size === 1 ? t('spo.equipo', 'equipo') : t('spo.equipos', 'equipos')) + ' ' + t('spo.desde', 'desde') + ' ' + temporada(lidDesde, desde)
        + ', ' + t('spo.en', 'en') + ' ' + ligas.size + ' ' + (ligas.size === 1 ? t('spo.liga', 'liga') : t('spo.ligas', 'ligas'))].join(' · ');

    const tarjeta = e => {
      const nombre = e[3] ? ((clubs[e[3]] || {}).displayName || e[2]) : e[2];
      const cuerpo = `<span class="spo-flag">${bandera(e[0])}</span><span class="spo-hoy-txt"><span class="spo-hoy-n">${esc(nombre)}</span>`
        + `<span class="spo-hoy-l">${esc(liga(e[0]).name || e[0])} · ${esc(temporada(e[0], e[1]))}</span></span>`;
      return e[3] ? `<a class="spo-hoy" href="?tab=finanzas&amp;club=${esc(e[3])}" data-club="${esc(e[3])}">${cuerpo}</a>`
        : `<span class="spo-hoy spo-gris">${cuerpo}</span>`;
    };
    const ordenHoy = hoy.slice().sort((a, b) => (!!b[3] - !!a[3]) || String(a[2]).localeCompare(b[2]));
    const anios = []; for(let y = desde; y <= hasta; y++) anios.push(y);
    const filas = [...equipos.values()].sort((a, b) => (b.ultimo - a.ultimo) || a.equipo.localeCompare(b.equipo));
    const dosRoles = s.roles.length > 1;
    const celda = (q, y) => {
      const r = q.ys.get(y);
      if(!r) return '<td><span class="spo-c"></span></td>';
      const cls = q.club ? (dosRoles && r === 'm' ? 'spo-c on m' : 'spo-c on') : 'spo-c gris';
      return `<td><span class="${cls}" title="${esc(q.equipo + ' · ' + temporada(q.liga, y))}"></span></td>`;
    };
    const fuentes = [...ligas].map(lid => {
      const ultimo = Math.max(...s.e.filter(e => e[0] === lid).map(e => e[1]));
      const url = (S.fuentes || {})[lid + '|' + ultimo];
      return url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(liga(lid).name || lid)}</a>` : esc(liga(lid).name || lid);
    }).join(' · ');
    // Lo que no salió de la página de temporada (cargado a mano o de la página del club) trae su fuente en e[5]: una línea aparte, por
    // club y fuente, con el rango de temporadas. El nombre del link sigue la regla de la tarjeta "Estadio y camiseta".
    const nombreFuente = u => { let h = u; try { h = new URL(u).hostname.replace(/^www\./, ''); } catch(err){} const w = h.match(/^([a-z]{2,3})\.(?:m\.)?wikipedia\.org$/); return w ? 'Wikipedia (' + w[1] + ')' : h; };
    const propias = new Map();
    s.e.filter(e => e[5]).forEach(e => {
      const k = clave(e) + '|' + e[5];
      if(!propias.has(k)) propias.set(k, { equipo: e[3] ? ((clubs[e[3]] || {}).displayName || e[2]) : e[2], liga: e[0], url: e[5], ys: [] });
      propias.get(k).ys.push(e[1]);
    });
    const otras = [...propias.values()].sort((a, b) => a.equipo.localeCompare(b.equipo) || Math.min(...a.ys) - Math.min(...b.ys)).map(p => {
      const d = Math.min(...p.ys), h = Math.max(...p.ys);
      const rango = d === h ? temporada(p.liga, d) : temporada(p.liga, d) + '–' + temporada(p.liga, h);
      return `${esc(p.equipo)} ${esc(rango)}: <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(nombreFuente(p.url))}</a>`;
    }).join(' · ');

    caja.innerHTML = `
      <div class="spo-head"><span class="spo-rol">${esc(rolTxt)}</span><h1>${esc(s.n)}</h1><p class="spo-resumen">${esc(resumen)}</p></div>
      ${hoy.length ? `<section class="card spo-card"><h2>${esc(t('spo.hoyT', 'Hoy'))}</h2><div class="spo-hoy-grilla">${ordenHoy.map(tarjeta).join('')}</div>
        ${hoy.some(e => !e[3]) ? `<p class="spo-nota">${esc(t('spo.grisNota', 'En gris, los equipos que el sitio todavía no tiene: no tienen ficha.'))}</p>` : ''}</section>` : ''}
      <section class="card spo-card"><h2>${esc(t('spo.todasT', 'Todas las temporadas'))}</h2>
        <p class="spo-nota">${esc(t('spo.todasSub', 'Cada cuadro, una temporada en la camiseta. El año es el del final de la temporada (2027 = 2026/27).'))}${dosRoles ? ' ' + esc(t('spo.dosRoles', 'Naranja: sponsor de camiseta; azul: marca técnica.')) : ''}</p>
        <div class="table-scroll"><table class="spo-tabla"><thead><tr><th>${esc(t('spo.equipoT', 'Equipo'))}</th>${anios.map(y => `<th>${y}</th>`).join('')}</tr></thead>
        <tbody>${filas.map(q => `<tr><th scope="row" class="${q.club ? '' : 'spo-gris'}"><span class="spo-flag">${bandera(q.liga)}</span>${q.club ? `<a href="?tab=finanzas&amp;club=${esc(q.club)}" data-club="${esc(q.club)}">${esc(q.equipo)}</a>` : esc(q.equipo)}</th>${anios.map(y => celda(q, y)).join('')}</tr>`).join('')}</tbody></table></div>
        <p class="spo-nota">${esc(t('spo.fuente', 'Fuente: la página de cada temporada en Wikipedia, en la versión que se leyó.'))} ${fuentes}</p>
        ${otras ? `<p class="spo-nota">${esc(t('spo.otras', 'Otras fuentes:'))} ${otras}</p>` : ''}
      </section>`;
    caja.querySelectorAll('a[data-club]').forEach(a => a.addEventListener('click', ev => {
      if(!hooks.irAClub) return;
      ev.preventDefault(); hooks.irAClub(a.dataset.club);
    }));
  }

  function show(id){
    actual = id;
    return cargar().then(render);
  }
  // Se para en su sección (el botón de #mainNav está escondido; click() igual lo activa); subir lo hace escribirURL() (js/principal.js).
  function abrir(id){
    return show(id).then(() => {
      const b = document.querySelector('#mainNav button[data-section="sponsor"]');
      if(b) b.click();
    });
  }
  // Desde la tarjeta "Estadio y camiseta" de Finanzas: el nombre de ese ejercicio, el club y si es sponsor ('c') o marca ('m').
  function abrirDesde(nombre, clubId, rol){
    return cargar().then(() => {
      if(!window.SPONSORS) return;
      const id = resolver(nombre, clubId, rol);
      if(id) return abrir(id);
    });
  }
  function init(h){ hooks = Object.assign(hooks, h || {}); }
  return { show, abrir, abrirDesde, init, cargarIndice, current: () => ({ sponsor: actual }), refresh: () => { if(actual && window.SPONSORS) render(); } };
})();
window.SPONSOR_VIEW = SPONSOR_VIEW;

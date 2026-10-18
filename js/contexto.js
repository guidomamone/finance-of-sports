// ============================================================================
// ESTADIO Y CAMISETA (tarjeta #finContexto de Finanzas). Estadio, capacidad, sponsor de camiseta y marca técnica de cada ejercicio
// elegido, una columna por ejercicio, y la fuente de cada uno. Lee data/contexto/<país>.js (se carga al elegir un club; formato:
// cabecera de tools/estadio-sponsor.mjs). Un campo que no se sabe es "—". La fuente de un campo cargado a mano (listado en `manual`)
// es `fuenteManual`; la de los demás, `fuente`. Sin ningún dato del club, la tarjeta y su link del índice se esconden.
// ============================================================================
const FIN_CONTEXTO = (function(){
  const pedidos = {};
  const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  function cargar(clubId){
    const pais = ((clubs[clubId] || {}).country || '').toLowerCase();
    if(!pais) return Promise.resolve();
    // Un país sin archivo es un país sin dato: el error de carga no se avisa.
    if(!pedidos[pais]) pedidos[pais] = new Promise(res => {
      const s = document.createElement('script');
      s.src = 'data/contexto/' + pais + '.js' + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
      s.onload = res; s.onerror = res;
      document.head.appendChild(s);
    });
    return pedidos[pais];
  }

  const etiqueta = (clubId, y) => esEjercicioCalendario(clubId, y) ? String(y) : (y - 1) + '/' + String(y).slice(2);
  const fuenteDe = (d, campo) => (d.manual || []).includes(campo) && d.fuenteManual ? d.fuenteManual : d.fuente;
  // El nombre del sponsor o la marca lleva a su página (js/sponsor.js) cuando existe; si no, queda como texto.
  function nombreConLink(txt){
    if(!txt) return '';
    if(!window.SPONSOR_VIEW) return esc(txt);
    return String(txt).split(/\s*[,/]\s*/).map(n => {
      const id = SPONSOR_VIEW.idDe(n);
      return id ? `<a href="?tab=sponsor&amp;sponsor=${esc(id)}" class="ctx-sponsor" data-sponsor="${esc(id)}">${esc(n)}</a>` : esc(n);
    }).join(', ');
  }
  function celda(d, campo){
    if(!d || d[campo] == null || d[campo] === '') return '<td class="ctx-nada">—</td>';
    if(campo === 'capacidad') return `<td>${Number(d[campo]).toLocaleString(document.documentElement.lang || 'es')}</td>`;
    if(campo === 'sponsor' || campo === 'marca') return `<td>${nombreConLink(d[campo])}</td>`;
    return `<td>${esc(d[campo])}</td>`;
  }

  function render(clubId, ys){
    const card = document.getElementById('finContexto');
    const link = document.querySelector('#finIndice a[href="#finContexto"]');
    if(!card) return;
    const datos = clubId && (window.CLUB_CONTEXT || {})[clubId];
    const anios = (ys || []).slice().sort((a, b) => a - b);
    const hay = !!(datos && anios.some(y => datos[y]));
    card.hidden = !hay; if(link) link.hidden = !hay;
    if(!hay){
      if(clubId && !datos) cargar(clubId).then(() => { if((window.CLUB_CONTEXT || {})[clubId] && window.FIN_SEL) render(clubId, FIN_SEL.years()); });
      return;
    }
    const tabla = card.querySelector('.ctx-tabla');
    tabla.querySelector('thead').innerHTML = '<tr><th></th>' + anios.map(y => `<th>${esc(etiqueta(clubId, y))}</th>`).join('') + '</tr>';
    const filas = [['estadio', t('ctx.estadio', 'Estadio')], ['capacidad', t('ctx.capacidad', 'Capacidad')],
      ['sponsor', t('ctx.sponsor', 'Sponsor de camiseta')], ['marca', t('ctx.marca', 'Marca técnica')]];
    // La fuente: una por ejercicio; si algún campo de ese ejercicio salió de otra fuente (carga a mano), las dos.
    const fuentes = anios.map(y => {
      const d = datos[y];
      if(!d) return '<td></td>';
      const urls = [...new Set(['estadio', 'capacidad', 'sponsor', 'marca'].filter(c => d[c] != null).map(c => fuenteDe(d, c)).filter(Boolean))];
      return '<td class="ctx-fuente">' + urls.map(u => {
        let host = u; try { host = new URL(u).hostname.replace(/^www\.|^[a-z]{2}\./, ''); } catch(e){}
        const txt = /wikipedia\.org/.test(u) && d.temporada ? 'Wikipedia: ' + d.temporada : host;
        return `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(txt)}</a>`;
      }).join('<br>') + '</td>';
    });
    tabla.querySelector('tbody').innerHTML = filas.map(([c, nombre]) =>
      `<tr><th scope="row">${esc(nombre)}</th>${anios.map(y => celda(datos[y], c)).join('')}</tr>`).join('')
      + `<tr><th scope="row" class="ctx-fuente-l">${esc(t('ctx.fuente', 'Fuente'))}</th>${fuentes.join('')}</tr>`;
  }

  return { render };
})();
window.FIN_CONTEXTO = FIN_CONTEXTO;

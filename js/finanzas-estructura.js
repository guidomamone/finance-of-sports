// ============================================================================
// ESTRUCTURA DEL CLUB (tarjeta #finEstructura de Finanzas). De qué entidad son los números del ejercicio elegido más nuevo, la cadena
// de dueños hasta el último, las controladas que entran en esos números y las relacionadas que quedan afuera, más los otros clubes del
// mismo grupo multiclub. Lee data/entidades/<país>.js (se carga al elegir un club de un país de window.ENTIDADES_PAISES) y
// window.GRUPOS_INDICE (data/entidades/_grupos.js). Formato: cabecera de tools/entidades.mjs. Sin datos del club, la tarjeta y su
// link del índice se esconden.
// ============================================================================
const FIN_ESTRUCTURA = (function(){
  const pedidos = {};
  const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const lang = () => (window.I18N && I18N.current) || 'es';
  const tx = o => o ? (o[lang()] || o.es || '') : '';

  function cargar(clubId){
    const pais = ((clubs[clubId] || {}).country || '').toLowerCase();
    if(!(window.ENTIDADES_PAISES || []).includes(pais)) return Promise.resolve();
    if(!pedidos[pais]) pedidos[pais] = new Promise(res => {
      const s = document.createElement('script');
      s.src = 'data/entidades/' + pais + '.js' + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
      s.onload = res; s.onerror = () => { console.error('[estructura] no cargó data/entidades/' + pais + '.js'); res(); };
      document.head.appendChild(s);
    });
    return pedidos[pais];
  }

  const vale = (r, y) => (r.desde == null || r.desde <= y) && (r.hasta == null || y <= r.hasta);
  const etiqueta = (clubId, y) => esEjercicioCalendario(clubId, y) ? String(y) : (y - 1) + '/' + String(y).slice(2);
  function pais(iso){
    try { return new Intl.DisplayNames([lang()], { type:'region' }).of(iso); } catch(e){ return iso; }
  }
  function forma(f){
    return { club:t('estr.forma.club', 'Club'), sociedad:t('estr.forma.sociedad', 'Sociedad'), holding:t('estr.forma.holding', 'Holding'),
      asociacion:t('estr.forma.asociacion', 'Asociación'), fundacion:t('estr.forma.fundacion', 'Fundación'),
      fondo:t('estr.forma.fondo', 'Fondo'), persona:t('estr.forma.persona', 'Persona') }[f] || f;
  }
  // El link al documento no dice "Fuente:" (la cita de fuente de la página vive en la ficha de Fuentes): lleva a la transcripción.
  function verFuente(f){
    if(!f) return '';
    if(f.md) return `<a class="estr-ver" href="${esc(encodeURI(f.md))}" target="_blank" rel="noopener">${esc(t('estr.ver.doc', 'ver en el balance'))}</a>`;
    let host = f.url; try { host = new URL(f.url).hostname.replace(/^www\./, ''); } catch(e){}
    return `<a class="estr-ver" href="${esc(f.url)}" target="_blank" rel="noopener">${esc(t('estr.ver.url', 'ver en'))} ${esc(host)}</a>`;
  }

  // Hacia arriba desde la entidad cargada: un dueño que controla por ejercicio (el primero, si hubiera dos en el registro).
  function cadena(d, id, y){
    const out = [];
    let actual = id, guarda = 0;
    while(guarda++ < 20){
      const r = d.relaciones.find(r => r.a === actual && r.rel === 'controla' && vale(r, y));
      if(!r) break;
      out.unshift({ id: r.de, rel: r });
      actual = r.de;
    }
    return out;
  }
  function grupoDe(clubId, y){
    return (window.GRUPOS_INDICE || []).find(g => g.clubes.some(c => c.clubId === clubId && c.control && vale(c, y))) || null;
  }

  function render(clubId, ys){
    const card = document.getElementById('finEstructura');
    const link = document.querySelector('#finIndice a[href="#finEstructura"]');
    if(!card) return;
    const d = clubId && (window.CLUB_ENTIDADES || {})[clubId];
    card.hidden = !d; if(link) link.hidden = !d;
    if(!d){
      if(clubId) cargar(clubId).then(() => { if((window.CLUB_ENTIDADES || {})[clubId] && window.FIN_SEL) render(clubId, FIN_SEL.years()); });
      return;
    }
    const conCarga = (ys || []).filter(y => d.cargas.some(c => c.anio === y));
    const cuerpo = card.querySelector('.estr-cuerpo');
    const titulo = card.querySelector('h2');
    if(!conCarga.length){
      titulo.textContent = t('estr.title', 'De quién son estos números');
      cuerpo.innerHTML = `<p class="subtitle">${esc(t('estr.sinanio', 'Todavía no cargamos la estructura de los ejercicios elegidos.'))}</p>`;
      return;
    }
    const y = conCarga[conCarga.length - 1];
    titulo.textContent = t('estr.title', 'De quién son estos números') + ' · ' + etiqueta(clubId, y);
    const cargas = d.cargas.filter(c => c.anio === y);
    const ent = id => d.entidades[id] || { nombre: id };
    const propia = cargas[0].entidad;
    const grupo = grupoDe(clubId, y);
    const nombreClub = (clubs[clubId] || {}).displayName || clubId;

    const dentro = cargas[0].perimetro === 'consolidado'
      ? d.relaciones.filter(r => r.de === propia && r.rel === 'controla' && r.consolidada !== false && vale(r, y)) : [];
    const fuera = d.relaciones.filter(r => vale(r, y) && !dentro.includes(r) && (
      (r.de === propia && (r.rel === 'participa' || r.rel === 'controla')) || (r.rel === 'vinculada' && (r.a === propia || r.de === propia))));
    const hermanos = grupo ? grupo.clubes.filter(c => c.clubId !== clubId && c.control && vale(c, y)) : [];

    // La frase de arriba.
    let frase = cargas.length > 1
      ? t('estr.frase.suma', 'Los números de esta página suman los balances de') + ' ' + cargas.map(c => `<strong>${esc(ent(c.entidad).nombre)}</strong>`).join(' ' + t('estr.y', 'y') + ' ') + '.'
      : (cargas[0].perimetro === 'consolidado'
        ? t('estr.frase.cons', 'Los números de esta página son del consolidado de') + ` <strong>${esc(ent(propia).nombre)}</strong>` +
          (dentro.length ? ': ' + t('estr.frase.incluye', 'incluye') + ' ' + dentro.length + ' ' + t(dentro.length === 1 ? 'estr.frase.soc1' : 'estr.frase.socN', dentro.length === 1 ? 'sociedad controlada' : 'sociedades controladas') : '') + '.'
        : t('estr.frase.ind', 'Los números de esta página son del balance individual de') + ` <strong>${esc(ent(propia).nombre)}</strong>.`);
    if(grupo){
      frase += ' ' + esc(nombreClub) + ' ' + t('estr.frase.grupo', 'es parte del grupo multiclub') + ' ' + grupoLink(grupo) +
        (hermanos.length ? ', ' + t('estr.frase.tambien', 'que también controla a') + ' ' + hermanos.map(c => esc(c.clubId ? ((clubs[c.clubId] || {}).displayName || c.nombre) : c.nombre)).join(', ') : '') + '.';
    }

    const caja = (id, rol, detalle, fuente, yo) => `<div class="estr-caja${yo ? ' estr-yo' : ''}">
        <span class="estr-rol">${esc(rol)}</span><span class="estr-nombre">${esc(ent(id).nombre)}</span>
        <span class="estr-det">${detalle}</span>${verFuente(fuente)}</div>`;
    const detalleDe = (id, rel) => {
      const e = ent(id);
      const partes = [forma(e.forma), e.pais ? pais(e.pais) : ''];
      if(rel && rel.desde != null) partes.push(t('estr.desde', 'desde') + ' ' + etiqueta(clubId, rel.desde));
      if(e.grupo) partes.push(e.grupo.nombre);
      return partes.filter(Boolean).map(esc).join(' · ');
    };
    const arriba = cadena(d, propia, y);
    const cajas = arriba.map((a, i) => caja(a.id,
      i === 0 ? t('estr.rol.ultimo', 'Dueño último') : ent(a.id).grupo ? t('estr.rol.grupo', 'Grupo multiclub') : i === arriba.length - 1 ? t('estr.rol.inmediato', 'Dueño inmediato') : t('estr.rol.intermedio', 'Holding intermedia'),
      detalleDe(a.id, a.rel), a.rel.fuente, false));
    cajas.push(caja(propia, t('estr.rol.estos', 'Estos números'), detalleDe(propia) + (cargas[0].perimetro === 'consolidado' ? ' · ' + esc(t('estr.consolidado', 'consolidado')) : ''), cargas[0].fuente, true));

    const fila = (id, txt, derecha, fuente) => `<li><span class="estr-li-txt"><span class="estr-nombre">${esc(ent(id).nombre)}</span>${txt ? `<span class="estr-det">${esc(txt)}</span>` : ''}</span>
        <span class="estr-li-der">${derecha ? esc(derecha) + ' · ' : ''}${verFuente(fuente)}</span></li>`;
    const pct = r => r.pct != null ? String(r.pct).replace('.', lang() === 'es' ? ',' : '.') + ' %' : '';
    const filasDentro = dentro.map(r => fila(r.a, tx(ent(r.a).que), pct(r), r.fuente)).join('');
    const filasFuera = fuera.map(r => {
      const otro = r.a === propia ? r.de : r.a;
      const porque = r.rel === 'participa' ? t('estr.fuera.part', 'Participación, fuera del consolidado')
        : r.rel === 'controla' ? t('estr.fuera.ctrl', 'Controlada, fuera de estos números') : t('estr.fuera.vinc', 'Relacionada, sin control');
      return fila(otro, [tx(ent(otro).que), porque].filter(Boolean).join('. '), pct(r), r.fuente);
    }).concat(hermanos.map(c => `<li><span class="estr-li-txt"><span class="estr-nombre">${c.clubId
        ? `<a href="?tab=finanzas&amp;club=${esc(encodeURIComponent(c.clubId))}">${esc((clubs[c.clubId] || {}).displayName || c.nombre)}</a>` : esc(c.nombre)}</span>
        <span class="estr-det">${esc(t('estr.fuera.grupo', 'Mismo grupo multiclub, club aparte'))}${c.clubId ? '' : ' · ' + esc(t('estr.sinbalance', 'todavía sin balance en el sitio'))}</span></span></li>`)).join('');

    // El dueño último de cada ejercicio cargado del club, cuando la estructura está cargada en más de uno.
    const anios = (window.FIN_ANIOS ? FIN_ANIOS.ejercicios(clubId).filter(e => e.tipo !== 'X').map(e => e.y) : []);
    let duenos = '';
    if(new Set(d.cargas.map(c => c.anio)).size > 1){
      duenos = `<h3 class="estr-h3">${esc(t('estr.duenos', 'El dueño, ejercicio por ejercicio'))}</h3><div class="estr-duenos">` + anios.map(a => {
        const c = d.cargas.find(c => c.anio === a);
        const top = c ? (cadena(d, c.entidad, a)[0] || { id: c.entidad }) : null;
        const e = top && ent(top.id);
        return `<div class="estr-dueno${a === y ? ' estr-yo' : ''}"><strong>${esc(etiqueta(clubId, a))}</strong><span>${e ? esc(e.grupo ? e.grupo.nombre : e.nombre) : '—'}</span></div>`;
      }).join('') + '</div>';
    }

    const nota = cargas.map(c => tx(c.nota)).filter(Boolean).join(' ');
    cuerpo.innerHTML = `<p class="estr-frase">${frase}</p>${duenos}
      <div class="estr-cols">
        <div class="estr-col"><h3 class="estr-h3">${esc(t('estr.arriba', 'Arriba: los dueños'))}</h3><div class="estr-cadena">${cajas.join('')}</div></div>
        <div class="estr-col">
          ${filasDentro ? `<h3 class="estr-h3 estr-verde">${esc(t('estr.dentro', 'Abajo: dentro de estos números'))}</h3><ul class="estr-lista">${filasDentro}</ul>` : ''}
          ${filasFuera ? `<h3 class="estr-h3 estr-ambar">${esc(t('estr.fuera', 'Relacionadas, fuera de estos números'))}</h3><ul class="estr-lista">${filasFuera}</ul>` : ''}
        </div>
      </div>
      ${nota ? `<p class="estr-nota"><strong>${esc(t('estr.periodistas', 'Para periodistas:'))}</strong> ${esc(nota)}</p>` : ''}`;
  }
  // La página del grupo la abre GRUPO_VIEW (js/grupo.js) cuando existe; mientras tanto el grupo se nombra sin link.
  function grupoLink(g){
    return window.GRUPO_VIEW ? `<a href="?tab=grupo&amp;grupo=${esc(encodeURIComponent(g.id))}">${esc(g.nombre)}</a>` : `<strong>${esc(g.nombre)}</strong>`;
  }

  return { cargar, render };
})();
window.FIN_ESTRUCTURA = FIN_ESTRUCTURA;

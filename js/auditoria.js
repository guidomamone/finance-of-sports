// ============================================================================
// QUIÉN AUDITÓ ESTOS NÚMEROS (tarjeta #finAuditoria de Finanzas). Una fila por ejercicio elegido: el auditor, qué dijo su informe en
// palabras simples y, aparte, si advierte una duda sobre la continuidad del club, con el link a la línea del informe. Lee
// data/auditoria/<país>.js (se carga al elegir un club de un país de window.AUDITORIA_PAISES). Formato: cabecera de tools/auditoria.mjs.
// Un ejercicio que no está en el dato es "todavía no lo revisamos", distinto de "sin informe de auditoría". Sin ningún dato del club,
// la tarjeta y su link del índice se esconden.
// ============================================================================
const FIN_AUDITORIA = (function(){
  const pedidos = {};
  const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  function cargar(clubId){
    const pais = ((clubs[clubId] || {}).country || '').toLowerCase();
    if(!(window.AUDITORIA_PAISES || []).includes(pais)) return Promise.resolve();
    if(!pedidos[pais]) pedidos[pais] = new Promise(res => {
      const s = document.createElement('script');
      s.src = 'data/auditoria/' + pais + '.js' + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
      s.onload = res; s.onerror = () => { console.error('[auditoria] no cargó data/auditoria/' + pais + '.js'); res(); };
      document.head.appendChild(s);
    });
    return pedidos[pais];
  }

  const etiqueta = (clubId, y) => esEjercicioCalendario(clubId, y) ? String(y) : (y - 1) + '/' + String(y).slice(2);
  // [etiqueta, clase de color, explicación]
  function dictamen(d){
    return {
      sin_salvedades: [t('aud.d.ok', 'Sin salvedades'), 'ok', t('aud.d.ok.x', 'El auditor no objetó nada: los números reflejan la situación del club.')],
      con_salvedades: [t('aud.d.salv', 'Con salvedades'), 'salv', t('aud.d.salv.x', 'El auditor objetó algo puntual; el resto del balance lo da por bueno. Qué objetó está en el informe.')],
      adverso: [t('aud.d.adv', 'Opinión adversa'), 'mal', t('aud.d.adv.x', 'El auditor dice que el balance no refleja la situación del club.')],
      abstencion: [t('aud.d.abs', 'Sin opinión'), 'mal', t('aud.d.abs.x', 'El auditor no pudo formarse una opinión sobre el balance.')],
      sin_informe: [t('aud.d.sin', 'Sin informe de auditoría'), 'gris', t('aud.d.sin.x', 'El documento publicado no trae informe de un auditor.')],
    }[d] || [d, 'gris', ''];
  }
  function tipo(x){
    return { firma:t('aud.tipo.firma', 'Firma de auditoría'), persona:t('aud.tipo.persona', 'Contador público'),
      organismo:t('aud.tipo.organismo', 'Organismo público') }[x] || '';
  }

  function fila(clubId, y, a){
    const anio = `<span class="aud-anio">${esc(etiqueta(clubId, y))}</span>`;
    if(!a){
      return `<li class="aud-fila">${anio}
        <span class="aud-que"><span class="aud-chips"><span class="aud-chip aud-nosabe">${esc(t('aud.nosabe', 'Todavía no lo revisamos'))}</span></span></span><span></span></li>`;
    }
    const d = dictamen(a.dictamen);
    const au = a.auditor;
    const sub = au ? [au.legal, tipo(au.tipo)].filter(Boolean).join(' · ') : '';
    const cont = a.continuidad ? `<span class="aud-chip aud-salv">${esc(t('aud.cont', 'Duda sobre la continuidad'))}</span>` : '';
    const explica = d[2] + (a.continuidad ? ' ' + t('aud.cont.x', 'El auditor además advierte una incertidumbre importante sobre si el club puede seguir operando con normalidad.') : '');
    // El link no dice "Fuente:" (la cita de fuente de la página vive en la ficha de Fuentes): lleva a la línea del informe.
    const ver = a.fuente && a.fuente.md ? `<a class="aud-ver" href="${esc(encodeURI(a.fuente.md))}" target="_blank" rel="noopener">${esc(t('estr.ver.doc', 'ver en el balance'))}</a>` : '';
    return `<li class="aud-fila">${anio}
      <span class="aud-quien"><span class="aud-nombre${au ? '' : ' aud-gris'}">${esc(au ? au.nombre : t('aud.sinAuditor', 'Sin auditor'))}</span>${sub ? `<span class="aud-sub">${esc(sub)}</span>` : ''}</span>
      <span class="aud-que"><span class="aud-chips"><span class="aud-chip aud-${d[1]}">${esc(d[0])}</span>${cont}</span>${explica ? `<span class="aud-x">${esc(explica)}</span>` : ''}</span>
      <span class="aud-link">${ver}</span></li>`;
  }

  function render(clubId, ys){
    const card = document.getElementById('finAuditoria');
    const link = document.querySelector('#finIndice a[href="#finAuditoria"]');
    if(!card) return;
    const d = clubId && (window.CLUB_AUDITORIA || {})[clubId];
    card.hidden = !d; if(link) link.hidden = !d;
    if(!d){
      if(clubId) cargar(clubId).then(() => { if((window.CLUB_AUDITORIA || {})[clubId] && window.FIN_SEL) render(clubId, FIN_SEL.years()); });
      return;
    }
    // Del más nuevo al más viejo, como se lee el resto de la ficha de arriba abajo.
    const anios = (ys || []).slice().sort((a, b) => b - a);
    card.querySelector('.aud-lista').innerHTML = anios.map(y => fila(clubId, y, d[y] || d[String(y)])).join('');
  }

  return { render };
})();
window.FIN_AUDITORIA = FIN_AUDITORIA;

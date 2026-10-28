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
      s.src = fosUrl('data/auditoria/' + pais + '.js') + fosV('data/auditoria/' + pais + '.js');
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
  function alcance(x){
    return {
      revision_limitada: { reemplaza: true, chip: t('aud.al.rev', 'Revisión limitada'),
        x: t('aud.al.rev.x', 'No es una auditoría: el revisor solo dice que no encontró nada que le haga pensar que los números están mal. Da menos seguridad que una auditoría.') },
      procedimientos_acordados: { reemplaza: true, chip: t('aud.al.proc', 'Sin auditoría'),
        x: t('aud.al.proc.x', 'Una firma comprobó cifras puntuales a pedido del club; no auditó ni revisó el balance.') },
      proposito_especial: { reemplaza: false, chip: t('aud.al.lic', 'Estados para la licencia'),
        x: t('aud.al.lic.x', 'El auditor revisó los estados que el club preparó para la licencia de la federación, no sus cuentas legales.') },
      grupo: { reemplaza: false, chip: t('aud.al.grupo', 'Auditoría del grupo dueño'),
        x: t('aud.al.grupo.x', 'El informe es sobre las cuentas del grupo dueño del club; no hay un informe del club solo.') },
      federacion: { reemplaza: false, chip: t('aud.al.fed', 'Cuentas de la federación entera'),
        x: t('aud.al.fed.x', 'Son las cuentas de toda la federación (con el fútbol amateur y las selecciones), no solo las de la liga.') },
    }[x] || null;
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
    // `alcance`: sin el campo, una auditoría plena de las cuentas del club. Una revisión limitada o unos procedimientos acordados no son
    // una auditoría y reemplazan al dictamen; unos estados para la licencia o un informe del grupo dueño lo dejan y se suman como aviso.
    const al = alcance(a.alcance);
    const d = al && al.reemplaza ? [al.chip, 'gris', al.x] : dictamen(a.dictamen);
    const au = a.auditor;
    const sub = au ? [au.legal, tipo(au.tipo)].filter(Boolean).join(' · ') : '';
    const extra = al && !al.reemplaza ? `<span class="aud-chip aud-gris">${esc(al.chip)}</span>` : '';
    const cont = a.continuidad ? `<span class="aud-chip aud-salv">${esc(t('aud.cont', 'Duda sobre la continuidad'))}</span>` : '';
    const explica = [d[2], al && !al.reemplaza ? al.x : '', a.continuidad ? t('aud.cont.x', 'El auditor además advierte una incertidumbre importante sobre si el club puede seguir operando con normalidad.') : '']
      .filter(Boolean).join(' ');
    // El link no dice "Fuente:" (la cita de fuente de la página vive en la ficha de Fuentes): lleva a la línea del informe.
    const ver = a.fuente && a.fuente.md ? `<a class="aud-ver" href="${esc(encodeURI(a.fuente.md))}" target="_blank" rel="noopener">${esc(t('estr.ver.doc', 'ver en el balance'))}</a>` : '';
    return `<li class="aud-fila">${anio}
      <span class="aud-quien"><span class="aud-nombre${au ? '' : ' aud-gris'}">${esc(au ? au.nombre : t('aud.sinAuditor', 'Sin auditor'))}</span>${sub ? `<span class="aud-sub">${esc(sub)}</span>` : ''}</span>
      <span class="aud-que"><span class="aud-chips"><span class="aud-chip aud-${d[1]}">${esc(d[0])}</span>${extra}${cont}</span>${explica ? `<span class="aud-x">${esc(explica)}</span>` : ''}</span>
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

  // LAS CUENTAS DE LA LIGA (pestaña Ligas): la entidad que organiza la liga, su auditor y qué dijo, del ejercicio elegido
  // (window.LIGA_AUDITORIA, data/auditoria/_ligas.js; mismo vocabulario que los clubes). Sin dato de ese año, nada: Ligas no muestra la tarjeta.
  function cardLiga(leagueId, year){
    const a = ((window.LIGA_AUDITORIA || {})[leagueId] || {})[year];
    if(!a || !a.entidad) return null;
    const al = alcance(a.alcance);
    const d = al && al.reemplaza ? [al.chip, 'gris', al.x] : dictamen(a.dictamen);
    const au = a.auditor;
    const ent = a.entidad.legal || a.entidad.nombre;
    // La federación entera (KNVB): no es la entidad que organiza la liga, así que la frase no puede decir eso.
    const org = a.alcance === 'federacion'
      ? t('aud.liga.fed', 'la federación entera, publica su propio balance: la sociedad que organiza la liga no publica el suyo.')
      : t('aud.liga.org', 'la entidad que organiza la liga, publica su propio balance.');
    const frase = esc(ent) + ', ' + esc(org)
      + (au ? ' ' + esc(t('aud.liga.lo', 'Lo auditó')) + ` <strong>${esc(au.nombre)}</strong>` + (au.legal && au.legal !== au.nombre ? ' (' + esc(au.legal) + ')' : '') + '.'
            : ' ' + esc(t('aud.liga.sin', 'No trae informe de un auditor.')));
    const extra = al && !al.reemplaza ? `<span class="aud-chip aud-gris">${esc(al.chip)}</span>` : '';
    const cont = a.continuidad ? `<span class="aud-chip aud-salv">${esc(t('aud.cont', 'Duda sobre la continuidad'))}</span>` : '';
    const ver = a.fuente && a.fuente.md ? `<a class="aud-ver" href="${esc(encodeURI(a.fuente.md))}" target="_blank" rel="noopener">${esc(t('estr.ver.doc', 'ver en el balance'))}</a>` : '';
    const card = document.createElement('section');
    card.className = 'card aud-liga';
    card.innerHTML = `<div class="aud-liga-txt"><h2>${esc(t('aud.liga.title', 'Las cuentas de la liga'))}</h2><p>${frase}</p></div>
      <div class="aud-liga-der"><span class="aud-chip aud-${d[1]}" title="${esc(d[2])}">${esc(d[0])}</span>${extra}${cont}${ver}</div>`;
    return card;
  }

  return { render, cardLiga };
})();
window.FIN_AUDITORIA = FIN_AUDITORIA;

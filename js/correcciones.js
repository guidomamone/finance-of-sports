// ============================================================================
// REGISTRO PÚBLICO DE CORRECCIONES. Lo comparten la página correcciones.html y el bloque «Correcciones a estos números» de Finanzas.
// Lee data/correcciones/<país>.json (un club) o correcciones.json (todo); los genera tools/generar-correcciones.mjs del historial de git.
// El motivo sale del trailer `Corrige:` del commit o de Admin/registros/correcciones.jsonl; sin ninguno, «Motivo no registrado» (nunca se inventa).
// Un evento anterior a `registro_desde` lleva la marca «anterior al registro». Importes en millones de la moneda del club.
// ============================================================================
const FOS_CORRECCIONES = (function(){
  const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const lang = () => (window.I18N && I18N.current) || document.documentElement.lang || 'es';
  const pedidos = {};
  const K = () => typeof clubs !== 'undefined' ? clubs : {};

  function cargar(archivo){
    if(!pedidos[archivo]) pedidos[archivo] = fetch(fosUrl('data/correcciones/' + archivo + '.json') + fosV('data/correcciones/' + archivo + '.json'))
      .then(r => r.ok ? r.json() : null).catch(() => null);
    return pedidos[archivo];
  }
  const porPais = clubId => cargar((K()[clubId] || {}).country ? clubs[clubId].country.toLowerCase() : 'nada');

  const etiquetaEjercicio = (clubId, y) => (K()[clubId] || {}).fiscalYearStart === '01-01' ? String(y) : (y - 1) + '/' + String(y).slice(2);
  const nombreClub = id => (K()[id] || {}).displayName || id;

  function num(v, moneda){
    if(v == null) return '—';
    const s = Number(v).toLocaleString(lang() === 'en' ? 'en-US' : 'es-AR', { maximumFractionDigits: Math.abs(v) < 10 ? 3 : 1 });
    return s + (moneda ? ' ' + moneda : '');
  }
  function categoria(id){
    if(id == null) return '—';
    const m = (typeof REVENUE_CATEGORY_LABELS !== 'undefined' && REVENUE_CATEGORY_LABELS[id]) || (typeof EXPENSE_CATEGORY_LABELS !== 'undefined' && EXPENSE_CATEGORY_LABELS[id]);
    if(lang() === 'en' || !m) { const k = t('bucket.' + id, ''); if(k) return k; }
    return m || String(id).replace(/_/g, ' ');
  }
  const TIPOS = {
    valor: ['corr.t.valor', 'Valor'], categoria: ['corr.t.categoria', 'Categoría'], estructura: ['corr.t.estructura', 'Filas'],
    recarga: ['corr.t.recarga', 'Ejercicio recargado'], retirado: ['corr.t.retirado', 'Ejercicio retirado'],
    total: ['corr.t.total', 'Total, caja o deuda'], otro: ['corr.t.otro', 'Moneda, fuente o perímetro'],
  };
  const tipoTexto = x => TIPOS[x] ? t(TIPOS[x][0], TIPOS[x][1]) : x;
  const CAMPOS = {
    importe: ['corr.c.importe', 'Importe'], categoria: ['corr.c.categoria', 'Categoría'], fila: ['corr.c.fila', 'Fila'],
    suma_ingresos: ['corr.c.sumaIng', 'Suma de ingresos'], suma_gastos: ['corr.c.sumaGas', 'Suma de gastos'],
    total_ingresos: ['corr.c.totIng', 'Total de ingresos impreso'], total_gastos: ['corr.c.totGas', 'Total de gastos impreso'], resultado: ['corr.c.resultado', 'Resultado'],
    deuda: ['corr.c.deuda', 'Deuda'], caja: ['corr.c.caja', 'Caja'], moneda: ['corr.c.moneda', 'Moneda'], tipo_de_cambio: ['corr.c.fx', 'Tipo de cambio'],
    fuente: ['corr.c.fuente', 'Fuente'], perimetro: ['corr.c.perim', 'Perímetro'],
  };
  const campoTexto = x => CAMPOS[x] ? t(CAMPOS[x][0], CAMPOS[x][1]) : x;

  // Un cambio, como «antes → después».
  function valores(c){
    if(c.campo === 'categoria') return [categoria(c.antes), categoria(c.despues)];
    if(c.campo === 'fila') return [c.antes == null ? t('corr.noEstaba', 'no estaba') : num(c.antes, c.moneda), c.despues == null ? t('corr.sacada', 'quitada') : num(c.despues, c.moneda)];
    if(['moneda', 'fuente', 'perimetro'].includes(c.campo)) return [c.antes == null ? '—' : String(c.antes), c.despues == null ? '—' : String(c.despues)];
    if(c.campo === 'tipo_de_cambio') return [num(c.antes), num(c.despues)];
    return [num(c.antes, c.moneda), num(c.despues, c.moneda)];
  }
  const que = c => (c.rotulo ? c.rotulo : campoTexto(c.campo)) + (c.rotulo && !['importe', 'categoria', 'fila'].includes(c.campo) ? ' · ' + campoTexto(c.campo) : '');

  // La línea que resume el evento.
  function resumen(e){
    const [c] = e.cambios; if(!c) return '';
    const mas = e.cambios.length > 1 ? ' ' + t('corr.mas', '(+{n} más)').replace('{n}', e.cambios.length - 1) : '';
    if(e.tipo === 'recarga') {
      const [a, b] = [e.cambios.find(x => x.campo === 'suma_ingresos'), e.cambios.find(x => x.campo === 'suma_gastos')];
      return t('corr.res.recarga', 'Se volvió a cargar el ejercicio ({n} filas cambiadas). Ingresos {i}; gastos {g}.').replace('{n}', e.filas_cambiadas || '')
        .replace('{i}', a ? num(a.antes, a.moneda) + ' → ' + num(a.despues, a.moneda) : '—').replace('{g}', b ? num(b.antes, b.moneda) + ' → ' + num(b.despues, b.moneda) : '—');
    }
    if(e.tipo === 'retirado') return t('corr.res.retirado', 'Se sacó del sitio el ejercicio (ingresos {i}, gastos {g}).').replace('{i}', num(c.antes, c.moneda)).replace('{g}', e.cambios[1] ? num(e.cambios[1].antes, c.moneda) : '—');
    if(e.tipo === 'estructura') return t('corr.res.estructura', 'Se sumaron o quitaron filas del ejercicio: {n}.').replace('{n}', e.cambios.length);
    const [a, b] = valores(c);
    return que(c) + ': ' + a + ' → ' + b + mas;
  }
  const motivo = e => lang() === 'en' && e.motivo_en ? e.motivo_en : e.motivo_es;
  const fechaTexto = f => { const [y, m, d] = String(f).split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(lang() === 'en' ? 'en-GB' : 'es-AR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); };

  // El detalle (los cambios uno por uno), plegado.
  function detalle(e, max){
    const filas = e.cambios.slice(0, max || 30).map(c => { const [a, b] = valores(c);
      return `<tr><td>${esc(c.lado ? t('corr.lado.' + c.lado, c.lado === 'ingresos' ? 'Ingresos' : 'Gastos') : '')}</td><td>${esc(que(c))}</td><td class="num">${esc(a)}</td><td class="num">${esc(b)}</td></tr>`; }).join('');
    const resto = e.cambios.length - (max || 30);
    return `<table class="corr-tabla"><thead><tr><th></th><th>${esc(t('corr.th.que', 'Qué'))}</th><th class="num">${esc(t('corr.th.antes', 'Antes'))}</th><th class="num">${esc(t('corr.th.despues', 'Después'))}</th></tr></thead><tbody>${filas}</tbody></table>`
      + (resto > 0 ? `<p class="corr-mas">${esc(t('corr.masFilas', '… y {n} cambios más; están todos en el archivo de datos abiertos.').replace('{n}', resto))}</p>` : '');
  }
  function motivoHtml(e){
    const m = motivo(e);
    return m ? `<span class="corr-motivo">${esc(m)}</span>` : `<span class="corr-motivo corr-sinmotivo">${esc(t('corr.sinMotivo', 'Motivo no registrado'))}</span>`;
  }
  function meta(e){
    return `<span>${esc(fechaTexto(e.fecha))}</span><span class="corr-sha" title="${esc(t('corr.sha', 'Versión del dato en el historial del proyecto'))}">${esc(e.commit)}</span>`
      + (e.anterior_al_registro ? `<span class="corr-previo" title="${esc(t('corr.previo.x', 'Cambio de antes de que existiera este registro público: el motivo puede faltar.'))}">${esc(t('corr.previo', 'anterior al registro'))}</span>` : '');
  }

  // ---------------- el bloque de Finanzas
  const cache = {};
  function render(clubId, ys){
    const card = document.getElementById('finCorrecciones'); const link = document.querySelector('#finIndice a[href="#finCorrecciones"]');
    if(!card) return;
    if(!clubId){ card.hidden = true; if(link) link.hidden = true; return; }
    const listo = datos => {
      if(!datos){ card.hidden = true; if(link) link.hidden = true; return; }
      const ev = datos.events.filter(e => e.club_id === clubId);
      cache[clubId] = ev;
      card.hidden = false; if(link) link.hidden = false;
      const caja = card.querySelector('.corr-cuerpo'); const desde = datos.registro_desde;
      const ver = `<a class="corr-ver" href="correcciones.html?club=${encodeURIComponent(clubId)}">${esc(t('corr.verTodas', 'Ver el registro completo'))} →</a>`;
      if(!ev.length){
        caja.innerHTML = `<p class="corr-vacio">${esc(t('corr.sin', 'Sin correcciones desde el {f}.').replace('{f}', fechaTexto(desde)))}</p>${ver}`;
      } else {
        const ult = ev.slice(0, 5);
        caja.innerHTML = `<ul class="corr-lista">${ult.map(e => `<li class="corr-item"><div class="corr-cab"><b>${esc(etiquetaEjercicio(clubId, e.fiscal_year))}</b><span class="corr-tipo">${esc(tipoTexto(e.tipo))}</span>${meta(e)}</div>
          <div class="corr-res">${esc(resumen(e))}</div>${motivoHtml(e)}</li>`).join('')}</ul>
          <p class="corr-n">${esc(ev.length > ult.length ? t('corr.ultimas', 'Las {n} más recientes de {m}.').replace('{n}', ult.length).replace('{m}', ev.length) : '')}</p>${ver}`;
      }
      if(window.FIN_ANIOS && !cache[clubId + ':marcado']){ cache[clubId + ':marcado'] = 1; FIN_ANIOS.render(clubId); }
    };
    porPais(clubId).then(listo);
  }
  // Años del club con alguna corrección desde el registro o antes (para la marca de las tarjetas de ejercicio).
  const anios = clubId => new Set((cache[clubId] || []).map(e => e.fiscal_year));

  return { cargar, render, anios, etiquetaEjercicio, nombreClub, resumen, detalle, motivoHtml, meta, tipoTexto, campoTexto, num, fechaTexto, esc };
})();
window.FIN_CORRECCIONES = FOS_CORRECCIONES;

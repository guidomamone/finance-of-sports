// ============================================================================
// CITAR Y DESCARGAR (tarjeta #finCitar de Finanzas). La cita sugerida y el link de lo que se está viendo (ejercicios, moneda,
// inflación y formato, las mismas claves que escribe la URL), y un CSV con una fila por rubro y ejercicio. Los números salen del motor
// (computeYearGeneric(), nativeReportFor(), nativeDisplayVal()), los mismos de la tabla: el CSV no recalcula nada por afuera.
// ============================================================================
const FIN_CITAR = (function(){
  const t = (k, es) => (window.I18N && I18N.t) ? I18N.t(k, es) : es;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const SITIO = 'https://financeofsports.com/';
  // Solo lo que define la vista de Finanzas: el `cb`, `audit` o `multi` de quien copió no viajan.
  const CLAVES = ['tab', 'club', 'anios', 'moneda', 'real', 'formato'];
  let clubActual = null, aniosActuales = [];

  const nombreDe = id => (clubs[id] || {}).displayName || id;
  const etiqueta = (id, y) => esEjercicioCalendario(id, y) ? String(y) : (y - 1) + '/' + String(y).slice(2);
  const fecha = iso => { const p = String(iso || '').split('-'); return p.length === 3 ? Number(p[2]) + '/' + Number(p[1]) + '/' + p[0] : ''; };
  const num = v => Number(v).toLocaleString(document.documentElement.lang || 'es', { maximumFractionDigits: 4 });
  function unidad(){
    const m = currencyMetaFor(currentCurrency);
    return (m.scale === 1000 ? 'mil M ' : 'M ') + currentCurrency;
  }
  function link(){
    const p = new URLSearchParams(location.search), q = new URLSearchParams();
    CLAVES.forEach(k => { if(p.has(k)) q.set(k, p.get(k)); });
    const s = q.toString().replace(/%2C/g, ',');
    return SITIO + (s ? '?' + s : '');
  }
  function documentoDe(id, y){
    const meta = (((window.CLUB_GENERIC_DATA || {})[id] || {}).fiscalYearMeta || {})[y] || {};
    return sources[meta.sourceId] || null;
  }

  // La cita: club, documento(s) con su cierre, de dónde salen los datos, en qué unidad y el link.
  function cita(id, ys){
    const docs = ys.map(y => {
      const rt = reportTypeForYear(id, y);
      const tipo = rt === 'official_budget' ? t('citar.presu', 'Presupuesto') : t('citar.balance', 'Balance');
      return tipo + ' ' + etiqueta(id, y) + (ys.length === 1 ? ' (' + t('citar.cierre', 'cierre') + ' ' + fecha(cierreEjercicio(id, y)) + ')' : '');
    });
    let unid = t('citar.enM', 'en millones de') + ' ' + (currentCurrency === 'USD' ? t('citar.dolares', 'dólares') : currentCurrency);
    if(currencyMetaFor(currentCurrency).scale === 1000) unid = t('citar.enMilM', 'en miles de millones de') + ' ' + currentCurrency;
    const partes = [unid];
    const convertido = ys.some(y => (yearMetaFor(id, y) || {}).currency !== currentCurrency);
    if(convertido){
      if(ys.length === 1){
        const m = yearMetaFor(id, ys[0]);
        partes.push(t('citar.fx1', 'al tipo de cambio de cierre') + ' (1 USD = ' + num(m.fx) + ' ' + m.currency + ')');
      } else partes.push(t('citar.fxN', 'al tipo de cambio de cierre de cada ejercicio'));
    }
    if(window.FIN_REAL && FIN_REAL.activo()) partes.push(t('citar.real', 'ajustados por inflación a') + ' ' + FIN_REAL.unidad(id).replace(/^M /, ''));
    if(!simplifyFormat) partes.push(t('citar.formatoClub', 'con los rubros del formato del club'));
    return nombreDe(id) + ', ' + docs.join(', ') + '. ' + t('citar.datos', 'Datos de') + ' ' + t('site.name', 'El deporte en Números') + ', '
      + partes.join(', ') + '. ' + link();
  }

  // EL CSV: una fila por rubro y ejercicio, en la unidad que se está viendo. Rubro sin cifra propia ("dentro de otro rubro" o
  // desconocido) y deuda sin desglose van vacíos, nunca 0: "sin dato no es cero" también en la planilla.
  const COLS = ['club', 'ejercicio', 'cierre', 'tipo', 'seccion', 'rubro', 'valor', 'unidad', 'moneda_original', 'tipo_de_cambio',
    'origen_tipo_de_cambio', 'ajustado_inflacion', 'documento', 'link_documento', 'link'];
  function filas(id, ys){
    const out = [];
    const real = window.FIN_REAL && FIN_REAL.activo();
    ys.forEach(y => {
      const meta = yearMetaFor(id, y), c = computeYearGeneric(id, y), rep = nativeReportFor(id, y);
      const fac = real ? FIN_REAL.fac(y) : 1;
      const val = v => v == null || !isFinite(v) ? '' : Math.round(nativeDisplayVal(v, meta, currentCurrency) * fac * 1000) / 1000;
      const src = documentoDe(id, y) || {};
      const fx = fxMetaFor(c.meta || {}) || {};
      // FX_SOURCE es un `const` de data/currency-map.js: global de script, no propiedad de window.
      const fxOrigen = ((typeof FX_SOURCE !== 'undefined' ? FX_SOURCE : {})[meta.fxSource || fx.source] || {}).label || '';
      const rt = reportTypeForYear(id, y);
      const comun = [nombreDe(id), etiqueta(id, y), cierreEjercicio(id, y), rt === 'official_budget' ? 'presupuesto' : 'balance'];
      const cola = [unidad(), meta.currency, meta.currency === 'USD' ? '' : meta.fx, meta.currency === 'USD' ? '' : fxOrigen,
        real ? 'sí, ' + FIN_REAL.unidad(id) : 'no', src.title || '', src.url || '', link()];
      const fila = (sec, rubro, v) => out.push(comun.concat([sec, rubro, val(v)], cola));
      const sinCifra = r => r.unknown || r.incluidoEn;
      (rep.ingresos || []).forEach(r => { if(r.value || sinCifra(r)) fila('ingresos', tLabel(r.label), sinCifra(r) ? null : r.value); });
      (rep.gastos || []).forEach(r => { if(r.value || sinCifra(r)) fila('gastos', tLabel(r.label), sinCifra(r) ? null : r.value); });
      (rep.extraRows || []).forEach(r => { if(r.value) fila('otros_resultados', tLabel(r.label), r.value); });
      fila('totales', t('citar.totIng', 'Total ingresos'), c.revenue);
      fila('totales', t('citar.resultado', 'Resultado neto'), c.pat);
      fila('deuda', tLabel('Deuda bruta'), filaDeuda(c, 'grossDebt'));
      fila('deuda', tLabel('Caja'), filaDeuda(c, 'cash'));
      fila('deuda', tLabel('Deuda neta'), filaDeuda(c, 'netDebt'));
    });
    return out;
  }
  const celda = v => { const s = String(v == null ? '' : v); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  function descargar(){
    if(!clubActual || !aniosActuales.length) return;
    const lineas = [COLS].concat(filas(clubActual, aniosActuales)).map(f => f.map(celda).join(','));
    // BOM: sin él, Excel abre los acentos rotos.
    const blob = new Blob(['﻿' + lineas.join('\r\n') + '\r\n'], { type: 'text/csv;charset=utf-8' });
    const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const ys = aniosActuales.map(y => etiqueta(clubActual, y).replace('/', '-'));
    const nombre = [slug(nombreDe(clubActual)), ys.length > 2 ? ys[0] + '-a-' + ys[ys.length - 1] : ys.join('-'), currentCurrency.toLowerCase()].join('-') + '.csv';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function copiar(texto, boton){
    const listo = () => { const antes = boton.textContent; boton.textContent = t('citar.copiado', 'Copiado'); setTimeout(() => { boton.textContent = antes; }, 1500); };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(listo, () => {});
    else { const ta = document.createElement('textarea'); ta.value = texto; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); listo(); } catch(e){} ta.remove(); }
  }

  function render(clubId, ys){
    const card = document.getElementById('finCitar');
    const linkIdx = document.querySelector('#finIndice a[href="#finCitar"]');
    if(!card) return;
    const anios = (ys || []).filter(y => computeYearGeneric(clubId, y));
    const hay = !!(clubId && anios.length);
    card.hidden = !hay; if(linkIdx) linkIdx.hidden = !hay;
    if(!hay) return;
    clubActual = clubId; aniosActuales = anios.slice().sort((a, b) => a - b);
    card.querySelector('.citar-texto').textContent = cita(clubId, aniosActuales);
    const n = aniosActuales.length;
    card.querySelector('.citar-csv-que').textContent = t('citar.csvQue1', 'Un CSV con lo que estás viendo:') + ' ' + n + ' '
      + (n === 1 ? t('citar.ej1', 'ejercicio') : t('citar.ejN', 'ejercicios')) + ', ' + t('citar.en', 'en') + ' ' + unidad()
      + (window.FIN_REAL && FIN_REAL.activo() ? ' ' + t('citar.ajustado', 'ajustados por inflación') : '') + ', '
      + (simplifyFormat ? t('citar.fSimpl', 'formato simplificado') : t('citar.fClub', 'formato del club')) + '. '
      + t('citar.csvQue2', 'Una fila por rubro, con la moneda original, el tipo de cambio y el documento de cada número.');
  }
  function init(){
    const card = document.getElementById('finCitar');
    if(!card) return;
    card.querySelector('.citar-copiar').addEventListener('click', e => copiar(card.querySelector('.citar-texto').textContent, e.currentTarget));
    card.querySelector('.citar-link').addEventListener('click', e => copiar(link(), e.currentTarget));
    card.querySelector('.citar-csv').addEventListener('click', descargar);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  return { render, filas, cita };
})();
window.FIN_CITAR = FIN_CITAR;

// Los nombres de un club cuando cambió de nombre sin cambiar de entidad (data/clubs.js, `names`: [{ name, from?, to? }], años incluidos).
// `displayName` es el nombre de hoy; nombreClubEn(id, año) da el que tenía ese año; nombresClub(id) da todos, para buscar por cualquiera.
// OJO: `clubs` SIN `window.`: data/clubs.js lo declara con `const`.
(function(){
  function ficha(id){ return (typeof clubs !== 'undefined' && clubs[id]) || {}; }
  window.nombreClubEn = function(id, anio){
    var c = ficha(id); var actual = c.displayName || id;
    if(anio == null || !c.names) return actual;
    var n = c.names.filter(function(x){ return (x.from == null || anio >= x.from) && (x.to == null || anio <= x.to); })[0];
    return n ? n.name : actual;
  };
  window.nombresClub = function(id){
    var c = ficha(id); var out = [c.displayName || id];
    (c.names || []).forEach(function(x){ if(out.indexOf(x.name) < 0) out.push(x.name); });
    return out;
  };
  // «Antes Cortuluá (hasta 2023)»: los nombres que el club ya no usa, para mostrarlos junto al de hoy. '' si no cambió de nombre.
  window.nombresAnterioresClub = function(id){
    var c = ficha(id); var hoy = c.displayName || id;
    return (c.names || []).filter(function(x){ return x.name !== hoy; }).map(function(x){
      var cuando = x.from != null && x.to != null ? x.from + '-' + x.to : x.to != null ? (window.I18N ? window.I18N.t('finanzas.hasta', 'hasta') : 'hasta') + ' ' + x.to : x.from != null ? (window.I18N ? window.I18N.t('finanzas.desde', 'desde') : 'desde') + ' ' + x.from : '';
      return x.name + (cuando ? ' (' + cuando + ')' : '');
    }).join(', ');
  };
})();

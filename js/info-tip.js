// js/info-tip.js — EL BOCADILLO DE EXPLICACIÓN, compartido (Versión 515, sacado de js/selector.js para el to-do 140(i)).
//
// Hover en desktop, click/tap en mobile (donde no existe hover). El bocadillo NO es descendiente de su ancla: un único
// `div.op-info-float` con `position:fixed` colgado de `document.body`, reposicionado con `getBoundingClientRect()` en cada
// apertura, esquiva cualquier `overflow:hidden` ajeno en el camino (el bug que lo originó: `.paso` del selector recortaba el
// bocadillo de México, la última fila de Países; las tablas de Finanzas viven adentro de cards con el mismo problema).
//
// Dos formas de usarlo:
//   INFO_TIP.enganchar(el, texto)   listeners propios del elemento (el "?" del selector, que corta la propagación del click
//                                   para no seleccionar el país al tocarlo).
//   <x data-info-tip="texto">       delegación: cualquier elemento con ese atributo, aunque se haya pintado con innerHTML
//                                   (las celdas "Dentro de otro rubro" de Finanzas y Ligas).
// Un click fuera de cualquier ancla, o un scroll, cierra el bocadillo pineado.
window.INFO_TIP = (function(){
  var tipEl = null, abierto = null; // abierto: el ancla pineada por click, o null
  function tip(){
    if(!tipEl){
      tipEl = document.createElement('div');
      tipEl.className = 'op-info-float';
      tipEl.setAttribute('role', 'tooltip');
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }
  function mostrar(ancla, texto){
    var t = tip();
    t.textContent = texto;
    t.style.display = 'block';
    var r = ancla.getBoundingClientRect();
    var w = t.offsetWidth || 230;
    var left = Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8);
    t.style.top = (r.bottom + 6) + 'px';
    t.style.left = left + 'px';
  }
  function ocultar(){ if(tipEl) tipEl.style.display = 'none'; }
  function cerrar(){ abierto = null; ocultar(); }
  function alternar(ancla, texto){
    if(abierto === ancla){ cerrar(); }
    else { abierto = ancla; mostrar(ancla, texto); }
  }
  function enganchar(ancla, texto){
    ancla.addEventListener('mouseenter', function(){ mostrar(ancla, texto); });
    ancla.addEventListener('mouseleave', function(){ if(abierto !== ancla) ocultar(); });
    ancla.addEventListener('click', function(ev){ ev.stopPropagation(); alternar(ancla, texto); });
  }
  var anclaDe = function(ev){ return ev.target && ev.target.closest ? ev.target.closest('[data-info-tip]') : null; };
  document.addEventListener('mouseover', function(ev){
    var a = anclaDe(ev); if(a && !abierto) mostrar(a, a.getAttribute('data-info-tip'));
  });
  document.addEventListener('mouseout', function(ev){
    var a = anclaDe(ev); if(a && abierto !== a && !a.contains(ev.relatedTarget)) ocultar();
  });
  document.addEventListener('click', function(ev){
    var a = anclaDe(ev);
    if(a) alternar(a, a.getAttribute('data-info-tip'));
    else cerrar();
  });
  window.addEventListener('scroll', cerrar, { passive: true });
  return { mostrar: mostrar, ocultar: ocultar, cerrar: cerrar, enganchar: enganchar };
})();

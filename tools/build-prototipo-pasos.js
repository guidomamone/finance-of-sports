#!/usr/bin/env node
/**
 * build-prototipo-pasos.js — genera `prototipo-pasos.html`, el PROTOTIPO 2 del
 * selector: un paso por card, uno abajo del otro.
 *
 * NO REEMPLAZA al prototipo 1 (`prototipo-inicio-selector.html`, el selector de
 * columnas metido en la portada), que queda como está: son dos visualizaciones
 * para comparar de verdad, una al lado de la otra.
 *
 * QUÉ CAMBIA (pedido de Guido): "siento que con el actual le estamos poniendo una
 * cantidad de información impresionante al usuario ni bien se loguea, y es
 * demasiado". El panel de columnas muestra 6 deportes + 6 regiones + 6 países +
 * 8 ligas + 41 clubes a la vez. Acá se elige de a una cosa, y el card siguiente
 * aparece cuando el anterior está resuelto. Como los cards van apilados, la misma
 * pantalla sirve en un teléfono sin rediseñarla.
 *
 * Fuera también, a pedido: el punto de color de calidad del dato y su leyenda.
 *
 * La lógica del selector nuevo NO se genera: vive en `prototipo-pasos-selector.js`,
 * escrito a mano, porque no es un parche de `js/selector.js` sino otro componente
 * con la misma API pública. Este script solo arma la página.
 *
 * Si un ancla no aparece, FALLA en vez de escribir un archivo a medias.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'index.html');
const OUT = path.join(ROOT, 'prototipo-pasos.html');

let html = fs.readFileSync(SRC, 'utf8');

function replaceOnce(needle, replacement, what){
  const i = html.indexOf(needle);
  if(i < 0) throw new Error('ancla no encontrada (' + what + '): index.html cambió, actualizá tools/build-prototipo-pasos.js');
  if(html.indexOf(needle, i + 1) >= 0) throw new Error('ancla ambigua (' + what + '): aparece más de una vez');
  html = html.slice(0, i) + replacement + html.slice(i + needle.length);
}

// ---------------------------------------------------------------------------
// 1. Cabecera y título.
// ---------------------------------------------------------------------------
replaceOnce('<html lang="es">', [
  '<!--',
  '  ============================ ESTO NO ES EL SITIO ============================',
  '  PROTOTIPO 2 del selector de club: un paso por card, uno abajo del otro.',
  '  GENERADO por `node tools/build-prototipo-pasos.js` a partir de index.html.',
  '  NO editar a mano: se sobrescribe. Los cambios van en el generador, y la',
  '  lógica del selector en `prototipo-pasos-selector.js`.',
  '  El prototipo 1 (selector de columnas en la portada) sigue en',
  '  `prototipo-inicio-selector.html`: son dos visualizaciones para comparar.',
  '  Los datos y los clubes son los REALES (mismos js/ y data/).',
  '  =============================================================================',
  '-->',
  '<html lang="es">'
].join('\n'), 'apertura <html>');

replaceOnce('<title data-i18n="site.title">El deporte en Números | Datos para votar informado</title>',
  '<title>PROTOTIPO 2 · Selector paso a paso</title>', 'title');

// ---------------------------------------------------------------------------
// 2. CSS.
// ---------------------------------------------------------------------------
const PROTO_CSS = `
<!-- ======================== PROTO: estilos del prototipo ======================== -->
<style>
  .proto-flag{position:sticky;top:0;z-index:200;background:#1b7a3d;color:#fff;font-size:12px;font-weight:700;
              letter-spacing:.04em;text-align:center;padding:5px 10px;}
  .proto-flag span{font-weight:400;opacity:.85;}
  .proto-reset{margin-left:14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.55);
               color:#fff;border-radius:6px;padding:2px 9px;font-size:11px;font-weight:700;
               font-family:inherit;cursor:pointer;vertical-align:1px;}
  .proto-reset:hover{background:#fff;color:#1b7a3d;}

  /* El panel de columnas sigue en el DOM porque js/comparar-clubes.js le pregunta
     por varios ids, pero en esta versión no se muestra nunca. */
  .sel-panel, .sel-backdrop, .coach{display:none !important;}

  /* ---------------------------------------------------------------------------
     EL BLOQUE DE PASOS. Vive en la página (no es un modal) y se queda cuando ya
     hay club elegido, plegado a una línea con el camino.
     --------------------------------------------------------------------------- */
  .pasos-block{background:linear-gradient(160deg,var(--azul) 0%,var(--azul-dark) 100%);color:#fff;
               border-radius:14px;padding:26px 24px 22px;margin-bottom:26px;}
  .pasos-block h1{font-size:27px;margin:0 0 6px;color:#fff;}
  .pasos-block .lead{color:#bfcde6;font-size:14.5px;margin:0 0 20px;max-width:820px;line-height:1.55;}
  .pasos-block.con-club h1, .pasos-block.con-club .lead{display:none;}
  .pasos-block.con-club{padding:12px 14px;margin-bottom:18px;}

  /* La barra de arriba: el camino elegido + minimizar. Es el "you are here" de
     Krug, y por eso el camino se lee entero, no abreviado. */
  .pasos-bar{display:none;align-items:center;gap:12px;}
  .pasos-block.con-club .pasos-bar{display:flex;}
  .pasos-resumen{flex:1;min-width:0;font-size:13.5px;font-weight:700;color:#fff;background:none;border:none;
                 text-align:left;font-family:inherit;cursor:pointer;padding:4px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .pasos-resumen:hover{color:var(--oro);}
  .pasos-toggle{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.28);color:#fff;border-radius:8px;
                padding:6px 12px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;}
  .pasos-toggle:hover{background:rgba(242,183,5,.22);border-color:var(--oro);}
  .pasos-block.plegado .pasos-busca, .pasos-block.plegado #pasosWrap, .pasos-block.plegado #pasosResultados{display:none;}
  .pasos-block.con-club .pasos-busca{margin-top:12px;}

  /* El atajo de una sola línea, para el que ya sabe qué club quiere. */
  .pasos-busca{display:flex;align-items:center;gap:8px;background:#fff;border-radius:10px;padding:4px 4px 4px 14px;max-width:560px;margin-bottom:18px;}
  .pasos-busca input{flex:1;border:none;outline:none;font-size:15px;padding:10px 0;background:none;font-family:inherit;color:var(--text);}
  .pasos-busca .lupa{color:var(--muted);font-size:15px;}

  /* ---------------------------------------------------------------------------
     UN CARD POR PASO. Tres estados: resuelto (una línea con lo elegido), actual
     (abierto, con las opciones) y pendiente (apenas visible, para que se vea
     cuántos pasos faltan sin competir por la atención).
     --------------------------------------------------------------------------- */
  .paso{background:var(--card);border-radius:12px;margin-bottom:10px;overflow:hidden;
        border:1px solid transparent;}
  .paso.pendiente{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14);}
  .paso.ahora{border-color:var(--oro);box-shadow:0 8px 24px rgba(7,29,63,.25);}
  .paso-head{display:flex;align-items:center;gap:11px;padding:11px 14px;}
  .paso-n{width:22px;height:22px;border-radius:50%;background:#eef2f9;color:var(--azul);font-size:11.5px;
          font-weight:800;display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .paso.ahora .paso-n{background:var(--oro);color:var(--azul-dark);}
  .paso.pendiente .paso-n{background:rgba(255,255,255,.12);color:#a8b8d4;}
  .paso-ht{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1;}
  .paso-t{font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:800;color:var(--muted);}
  .paso.pendiente .paso-t{color:#8fa3c4;}
  .paso-v{font-size:15px;font-weight:700;color:var(--text);}
  .paso-change{background:none;border:1px solid var(--border);color:var(--azul);border-radius:7px;
               padding:4px 10px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;}
  .paso-change:hover{border-color:var(--azul);background:#eef2f9;}
  .paso-body{padding:2px 14px 14px;}
  .paso-vacio{color:var(--muted);font-size:13.5px;margin:6px 0;}

  /* Las opciones. Grilla que se acomoda sola: en desktop entran 3 o 4 por fila,
     en un teléfono queda una columna, sin una sola regla de media query. */
  .op-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;}
  .op-grid.clubes{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));max-height:340px;overflow-y:auto;}
  .op-grid.anios{grid-template-columns:repeat(auto-fill,minmax(180px,1fr));}
  .op{display:flex;align-items:center;gap:9px;width:100%;text-align:left;background:#fff;border:1px solid var(--border);
      border-radius:9px;padding:10px 12px;font-family:inherit;font-size:14px;cursor:pointer;color:var(--text);}
  .op:hover{border-color:var(--azul);background:#eef2f9;}
  .op.off{opacity:.45;cursor:not-allowed;}
  .op.off:hover{border-color:var(--border);background:#fff;}
  .op-icon{font-size:17px;flex:0 0 auto;}
  .op-crest{width:24px;height:24px;border-radius:50%;background:var(--azul);color:#fff;font-size:9px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .op-txt{display:flex;flex-direction:column;min-width:0;flex:1;}
  .op-label{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .op-sub{font-size:11.5px;color:var(--muted);}
  .op-meta{font-size:11.5px;color:var(--muted);white-space:nowrap;}
  .paso-skip{margin-top:10px;background:none;border:none;color:var(--azul);font-family:inherit;font-size:13px;
             cursor:pointer;text-decoration:underline;text-underline-offset:3px;padding:2px 0;}
  .paso-skip:hover{color:var(--azul-dark);}

  #pasosResultados{background:var(--card);border-radius:12px;padding:12px;}

  main > section{scroll-margin-top:96px;}
  #mainNav.proto-dummy{opacity:.45;}
  #mainNav.proto-dummy button{cursor:default;}
</style>
`;
replaceOnce('</style>\n', '</style>\n' + PROTO_CSS, 'cierre del <style> del sitio');

// ---------------------------------------------------------------------------
// 3. Franja del prototipo + botón de reset.
// ---------------------------------------------------------------------------
replaceOnce('<body>\n',
  '<body>\n<div class="proto-flag">PROTOTIPO 2 · Selector paso a paso '
  + '<span>— no es el sitio publicado</span>'
  + '<button type="button" class="proto-reset" id="protoReset" title="Borra el club elegido y los recientes de ESTE navegador, y recarga. El idioma no se toca.">Volver a la primera visita</button>'
  + '</div>\n', '<body>');

// ---------------------------------------------------------------------------
// 4. La portada: el bloque de pasos reemplaza al hero del cold start.
//
//    Los ids del hero viejo que toca js/selector.js NO hacen falta acá, porque
//    este prototipo NO carga js/selector.js: carga prototipo-pasos-selector.js,
//    que no los usa. El único que se conserva es #clubLoadError, que lo escribe
//    el <script> principal de index.html cuando un club no carga.
// ---------------------------------------------------------------------------
const HERO_VIEJO_INICIO = '  <div class="hero" id="coldHero" hidden>';
const HERO_VIEJO_FIN = '  </div>\n\n  <!-- INICIO -->';
const iniHero = html.indexOf(HERO_VIEJO_INICIO);
const finHero = html.indexOf(HERO_VIEJO_FIN, iniHero);
if(iniHero < 0 || finHero < 0) throw new Error('no se encontró el bloque #coldHero de index.html');

const HERO_NUEVO = `  <div class="pasos-block" id="pasosBlock">
    <!-- #coldHero sigue existiendo (vacío y escondido) porque applyClubMode() lo
         toca por id. El bloque de pasos es este de afuera. -->
    <div id="coldHero" hidden></div>

    <h1>Los números reales de tu club</h1>
    <p class="lead">Ingresos, gastos y deuda, sacados del balance oficial de cada club, con la fuente de cada cifra a la vista.</p>

    <!-- Con un club elegido, todo el bloque se reduce a esta línea. -->
    <div class="pasos-bar">
      <button class="pasos-resumen" id="pasosResumen" type="button"></button>
      <button class="pasos-toggle" id="pasosToggle" type="button">Minimizar</button>
    </div>

    <!-- El atajo: quien ya sabe qué club quiere no recorre 5 pasos. -->
    <div class="pasos-busca">
      <span class="lupa" aria-hidden="true">&#128269;</span>
      <input id="pasosQ" type="text" autocomplete="off" spellcheck="false" placeholder="¿Ya sabés cuál? Escribí el club, la liga o el país">
    </div>

    <div id="pasosResultados" hidden></div>
    <div id="pasosWrap"></div>

    <p class="hero-error" id="clubLoadError" hidden></p>
  </div>
`;
html = html.slice(0, iniHero) + HERO_NUEVO + html.slice(finHero);

// ---------------------------------------------------------------------------
// 5. applyClubMode(): mismo cambio que en el prototipo 1. El selector no es una
//    pantalla aparte que se apaga al elegir, y las pestañas se ven siempre.
// ---------------------------------------------------------------------------
replaceOnce(`  function applyClubMode(){
    const cold = !currentClub;
    document.getElementById('coldHero').hidden = !cold;
    document.getElementById('mainNav').style.display = cold ? 'none' : '';`,
`  function applyClubMode(){
    const cold = !currentClub;
    // PROTO: el bloque de pasos se queda en la página con el club ya elegido; el
    // #coldHero original quedó vacío y escondido, solo para que esta línea siga
    // teniendo a quién apuntar.
    document.getElementById('coldHero').hidden = true;
    // PROTO: las pestañas se ven siempre, apagadas hasta que haya club.
    document.getElementById('mainNav').style.display = '';
    document.getElementById('mainNav').classList.toggle('proto-dummy', cold);`,
  'applyClubMode');

// ---------------------------------------------------------------------------
// 6. El selector nuevo reemplaza a js/selector.js. Expone la MISMA API pública,
//    así el <script> principal de index.html y js/comparar-clubes.js no se enteran.
// ---------------------------------------------------------------------------
const TAG_SELECTOR = html.match(/<script src="js\/selector\.js\?v=[^"]*"><\/script>/);
if(!TAG_SELECTOR) throw new Error('no se encontró el <script> de js/selector.js en index.html');
replaceOnce(TAG_SELECTOR[0],
  '<!-- PROTO: el selector paso a paso, en vez del de columnas. Misma API pública. -->\n' +
  '<script src="prototipo-pasos-selector.js"></script>',
  'script de js/selector.js');

// ---------------------------------------------------------------------------
// 7. El botón de "volver a la primera visita" y el guard de las pestañas dummy.
// ---------------------------------------------------------------------------
const PROTO_JS = `
<!-- ======================== PROTO: comportamiento del banco de pruebas ======== -->
<script>
(function(){
  document.getElementById('protoReset').addEventListener('click', function(){
    ['fos_club', 'fos_recent_clubs', 'fos_coach_club'].forEach(function(k){
      try { localStorage.removeItem(k); } catch(e){}
    });
    try { history.scrollRestoration = 'manual'; } catch(e){}
    window.scrollTo(0, 0);
    location.reload();
  });
  document.getElementById('mainNav').addEventListener('click', function(ev){
    if(this.classList.contains('proto-dummy')){ ev.stopPropagation(); ev.preventDefault(); }
  }, true);
})();
</script>
`;
replaceOnce('\n</body>', PROTO_JS + '\n</body>', 'cierre del <body>');

fs.writeFileSync(OUT, html);
console.log('escrito: ' + path.relative(ROOT, OUT) + ' (' + Math.round(html.length / 1024) + ' KB)');
console.log('la lógica del selector vive en prototipo-pasos-selector.js (escrito a mano, no se genera)');

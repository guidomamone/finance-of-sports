#!/usr/bin/env node
/**
 * build-prototipo-duelo.js — genera `prototipo-duelo.html`, el PROTOTIPO 3 del
 * selector: dos columnas, Equipo A contra Equipo B, con un toggle arriba para el
 * que solo quiere ver un club.
 *
 * NO REEMPLAZA a los prototipos 1 (columnas en la portada) ni 2 (paso a paso):
 * los tres quedan vivos, en esta misma carpeta, para poder compararlos.
 *
 * DE DÓNDE SALE (Guido, después de probar el 2 a mano): "quiero probar un nuevo
 * prototipo en el cual haya dos columnas en el buscador, y sea tipo Equipo A vs
 * Equipo B. De esa manera no hace falta pensar tantas casuísticas derivadas de
 * hacer que el usuario pase por el selector dos veces".
 *
 * Carga los MISMOS datos inventados que el prototipo 2 (los clubes de Argentina y
 * Brasil con 10 ejercicios cada uno): sin eso no se puede probar nada de esto.
 * Ver la cabecera de `prototipo-pasos-datos-inventados.js`.
 *
 * La lógica vive en `prototipo-duelo-selector.js`, escrita a mano. Este script
 * solo arma la página.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');        // la raíz del repo
const AQUI = __dirname;                          // Prototyping/, donde salen los archivos
const SRC = path.join(ROOT, 'index.html');
const OUT = path.join(AQUI, 'prototipo-duelo.html');

let html = fs.readFileSync(SRC, 'utf8');

function replaceOnce(needle, replacement, what){
  const i = html.indexOf(needle);
  if(i < 0) throw new Error('ancla no encontrada (' + what + '): index.html cambió, actualizá Prototyping/build-prototipo-duelo.js');
  if(html.indexOf(needle, i + 1) >= 0) throw new Error('ancla ambigua (' + what + '): aparece más de una vez');
  html = html.slice(0, i) + replacement + html.slice(i + needle.length);
}

// ---------------------------------------------------------------------------
// 1. Cabecera y título.
// ---------------------------------------------------------------------------
replaceOnce('<html lang="es">', [
  '<!--',
  '  ============================ ESTO NO ES EL SITIO ============================',
  '  PROTOTIPO 3 del selector: dos columnas, Equipo A contra Equipo B.',
  '  GENERADO por `node Prototyping/build-prototipo-duelo.js` a partir de index.html.',
  '  NO editar a mano: se sobrescribe. Los cambios van en el generador, y la',
  '  lógica del selector en `prototipo-duelo-selector.js`.',
  '  El prototipo 1 (selector de columnas en la portada) sigue en',
  '  `prototipo-inicio-selector.html`: son dos visualizaciones para comparar.',
  '  Los datos y los clubes son los REALES (mismos js/ y data/).',
  '  =============================================================================',
  '-->',
  '<html lang="es">'
].join('\n'), 'apertura <html>');

replaceOnce('<head>\n', '<head>\n' +
  '<!-- PROTO: el prototipo vive en Prototyping/ y el sitio en la raíz. Esta línea hace\n' +
  '     que TODA ruta relativa (los <script src> de js/ y data/, y también las que arma\n' +
  '     el JS en tiempo de ejecución: loadClubData() y I18N.load()) siga resolviendo\n' +
  '     contra la raíz. Sin esto habría que reescribir cada ruta, incluidas las que no\n' +
  '     están en el HTML. -->\n' +
  '<base href="../">\n', '<head>');

replaceOnce('<title data-i18n="site.title">El deporte en Números | Datos para votar informado</title>',
  '<title>PROTOTIPO 3 · Duelo A contra B</title>', 'title');

// ---------------------------------------------------------------------------
// 2. CSS.
// ---------------------------------------------------------------------------
const PROTO_CSS = `
<!-- ======================== PROTO: estilos del prototipo ======================== -->
<style>
  .proto-flag{position:sticky;top:0;z-index:200;background:#1b7a3d;color:#fff;font-size:12px;font-weight:700;
              letter-spacing:.04em;text-align:center;padding:5px 10px;}
  /* Con datos inventados en la página, la franja deja de ser verde: que nadie
     confunda una captura de esto con una del sitio. */
  .proto-flag-falso{background:#b5372b;}
  .proto-flag-falso b{background:#fff;color:#b5372b;padding:1px 7px;border-radius:5px;}
  /* La marca de cada ejercicio inventado, donde el prototipo lo ofrece. */
  .op-falso{font-size:10px;font-weight:800;letter-spacing:.05em;color:#b5372b;background:#fdecea;
            border:1px solid #f3b8b1;border-radius:4px;padding:1px 5px;margin-left:7px;}
  .proto-flag span{font-weight:400;opacity:.85;}
  .proto-reset{margin-left:14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.55);
               color:#fff;border-radius:6px;padding:2px 9px;font-size:11px;font-weight:700;
               font-family:inherit;cursor:pointer;vertical-align:1px;}
  .proto-reset:hover{background:#fff;color:#1b7a3d;}

  /* El panel de columnas sigue en el DOM porque js/comparar-clubes.js le pregunta
     por varios ids, pero en esta versión no se muestra nunca. */
  .sel-panel, .sel-backdrop, .coach{display:none !important;}

  /* ---------------------------------------------------------------------------
     EL BLOQUE DEL DUELO. Dos columnas iguales con un VS en el medio, o una sola
     cuando el visitante dice que no vino a comparar.
     --------------------------------------------------------------------------- */
  .duelo-block{background:linear-gradient(160deg,var(--azul) 0%,var(--azul-dark) 100%);color:#fff;
               border-radius:14px;padding:26px 24px 22px;margin-bottom:22px;}
  .duelo-block h1{font-size:27px;margin:0 0 6px;color:#fff;}
  .duelo-block .lead{color:#bfcde6;font-size:14.5px;margin:0 0 18px;max-width:820px;line-height:1.55;}

  .du-toggle{display:inline-flex;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
             border-radius:10px;padding:3px;margin-bottom:18px;gap:3px;}
  .du-toggle button{background:none;border:none;color:#bfcde6;font-family:inherit;font-size:13px;font-weight:700;
                    padding:8px 16px;border-radius:8px;cursor:pointer;}
  .du-toggle button.on{background:var(--oro);color:var(--azul-dark);}
  .du-toggle button:not(.on):hover{color:#fff;}

  .du-wrap{display:grid;grid-template-columns:1fr 44px 1fr;gap:10px;align-items:start;}
  .du-wrap.uno{grid-template-columns:minmax(0,560px);}
  .du-vs{align-self:center;text-align:center;font-size:13px;font-weight:800;color:#8fa3c4;letter-spacing:.08em;}
  .du-col{background:var(--card);color:var(--text);border-radius:12px;border:1px solid transparent;overflow:hidden;}
  .du-col.con{border-color:var(--oro);}
  .du-head{display:flex;align-items:center;gap:9px;padding:11px 13px;border-bottom:1px solid var(--border);}
  .du-letra{width:22px;height:22px;border-radius:50%;background:var(--azul);color:#fff;font-size:11.5px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .du-letra.chica{display:inline-flex;width:19px;height:19px;font-size:10.5px;margin-right:7px;vertical-align:1px;}
  .du-titulo{font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:800;color:var(--muted);flex:1;}
  .du-x{background:none;border:none;color:var(--muted);font-size:19px;line-height:1;cursor:pointer;padding:0 3px;}
  .du-x:hover{color:var(--red);}

  .du-tabs{display:flex;gap:6px;padding:10px 13px 0;}
  .du-tab{background:none;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:5px 11px;
          font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;}
  .du-tab.on{background:var(--azul);border-color:var(--azul);color:#fff;}
  .du-busca{margin:10px 13px;width:calc(100% - 26px);border:1px solid var(--border);border-radius:8px;
            padding:9px 11px;font-family:inherit;font-size:14px;outline:none;}
  .du-busca:focus{border-color:var(--azul);}
  .du-lista{max-height:290px;overflow-y:auto;padding:0 13px 13px;display:flex;flex-direction:column;gap:5px;}
  .du-op{display:flex;align-items:center;gap:9px;text-align:left;background:#fff;border:1px solid var(--border);
         border-radius:9px;padding:8px 10px;font-family:inherit;cursor:pointer;color:var(--text);}
  .du-op:hover{border-color:var(--azul);background:#eef2f9;}
  .du-crest{width:24px;height:24px;border-radius:50%;background:var(--azul);color:#fff;font-size:9px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .du-crest.grande{width:34px;height:34px;font-size:12px;}
  .du-op-icon{font-size:17px;}
  .du-op-txt{display:flex;flex-direction:column;min-width:0;}
  .du-op-n{font-size:14px;font-weight:600;}
  .du-op-s{font-size:11.5px;color:var(--muted);}
  .du-vacio{color:var(--muted);font-size:13px;margin:4px 0;}

  .du-elegido{padding:13px;}
  .du-sujeto{display:flex;align-items:center;gap:11px;margin-bottom:12px;}
  .du-sujeto-n{font-size:17px;font-weight:800;}
  .du-modos{display:flex;gap:6px;margin-bottom:12px;}
  .du-modo{flex:1;background:#fff;border:1px solid var(--border);color:var(--muted);border-radius:8px;padding:7px 9px;
           font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;}
  .du-modo.on{background:var(--azul);border-color:var(--azul);color:#fff;}
  .du-anio{display:flex;align-items:center;gap:9px;font-size:12px;color:var(--muted);font-weight:700;}
  .du-anio select{flex:1;font-family:inherit;font-size:13px;padding:7px 8px;border:1px solid var(--border);
                  border-radius:8px;background:#fff;color:var(--text);cursor:pointer;}

  .du-pie{margin-top:16px;}
  .du-go{background:var(--oro);color:var(--azul-dark);border:none;border-radius:10px;padding:12px 22px;
         font-family:inherit;font-size:14.5px;font-weight:800;cursor:pointer;}
  .du-go:hover{filter:brightness(1.07);}
  .du-go.off{background:rgba(255,255,255,.12);color:#8fa3c4;cursor:not-allowed;}

  /* El resultado: una sola vista para club, promedio de liga y total de liga. */
  .du-resultado{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px 22px;margin-bottom:26px;}
  .du-resultado[hidden]{display:none;}
  .du-res-head h2{margin:0 0 4px;font-size:20px;}
  .du-res-sub{color:var(--muted);font-size:13px;margin:0 0 16px;}
  .du-cargando{color:var(--muted);font-size:13.5px;margin:0;}
  .du-tabla{width:100%;border-collapse:collapse;}
  .du-tabla th, .du-tabla td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:top;}
  .du-tabla thead th{border-bottom:2px solid var(--azul);}
  .du-res-n{font-size:14.5px;font-weight:700;}
  .du-res-m{display:block;font-size:11.5px;color:var(--muted);font-weight:400;margin-top:3px;}
  .du-ind{font-size:13px;color:var(--muted);font-weight:700;width:190px;}
  .du-num{font-size:17px;font-weight:800;display:block;}
  .du-num.neg{color:var(--red);}
  .du-nodato{color:var(--muted);font-size:13px;font-style:italic;}
  .du-bar{display:block;height:6px;background:#eef2f9;border-radius:3px;margin-top:6px;overflow:hidden;max-width:260px;}
  .du-bar-in{display:block;height:100%;background:var(--azul);}
  .du-bar-in.neg{background:var(--red);}
  .du-avisos{margin-top:14px;}
  .du-avisos p{color:var(--muted);font-size:12px;line-height:1.5;margin:0 0 5px;}

  /* En un teléfono las dos columnas se apilan y el VS queda en el medio. */
  @media (max-width:900px){
    .du-wrap{grid-template-columns:1fr;}
    .du-vs{padding:4px 0;}
  }

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
  '<body>\n<div class="proto-flag proto-flag-falso">PROTOTIPO 3 · Duelo A contra B '
  + '<span>— no es el sitio publicado · </span>'
  + '<b>DATOS INVENTADOS: los ejercicios 2016-2025 de Argentina y Brasil son de mentira</b>'
  + '<button type="button" class="proto-reset" id="protoReset" title="Borra el club elegido y los recientes de ESTE navegador, y recarga. El idioma no se toca.">Volver a la primera visita</button>'
  + '</div>\n', '<body>');

// ---------------------------------------------------------------------------
// 4. La portada: el bloque del duelo reemplaza al hero del cold start.
//
//    Los ids del hero viejo que toca js/selector.js NO hacen falta acá, porque
//    este prototipo NO carga js/selector.js: carga prototipo-duelo-selector.js,
//    que no los usa. El único que se conserva es #clubLoadError, que lo escribe
//    el <script> principal de index.html cuando un club no carga.
// ---------------------------------------------------------------------------
const HERO_VIEJO_INICIO = '  <div class="hero" id="coldHero" hidden>';
const HERO_VIEJO_FIN = '  </div>\n\n  <!-- INICIO -->';
const iniHero = html.indexOf(HERO_VIEJO_INICIO);
const finHero = html.indexOf(HERO_VIEJO_FIN, iniHero);
if(iniHero < 0 || finHero < 0) throw new Error('no se encontró el bloque #coldHero de index.html');

const HERO_NUEVO = `  <div class="duelo-block" id="dueloBlock">
    <!-- #coldHero sigue existiendo (vacío y escondido) porque applyClubMode() lo
         toca por id. El bloque del duelo es este de afuera. -->
    <div id="coldHero" hidden></div>

    <h1>Los números reales de tu club</h1>
    <p class="lead">Ingresos, gastos y deuda, sacados del balance oficial de cada club, con la fuente de cada cifra a la vista.</p>

    <!-- El toggle. La mayoría de las visitas quiere UN club y no tiene por qué pagar
         el costo de una pantalla partida al medio; el que vino a comparar encuentra
         las dos columnas sin buscarlas. -->
    <div class="du-toggle">
      <button type="button" id="duToggleDuelo" class="on">Quiero comparar dos</button>
      <button type="button" id="duToggleUno">Solo quiero ver uno</button>
    </div>

    <div class="du-wrap" id="duWrap"></div>
    <div class="du-pie" id="duPie"></div>

    <p class="hero-error" id="clubLoadError" hidden></p>
  </div>

  <!-- El resultado. Vive fuera del bloque porque es lo que se mira, no un control. -->
  <div class="du-resultado" id="duResultado" hidden></div>
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
    // PROTO: el bloque del duelo se queda en la página con el club ya elegido; el
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
// El `?v=` con la fecha de modificación del archivo NO es decorativo: sin él el
// navegador sirve el JS viejo de su caché aunque el HTML sea nuevo, y se depura un
// bug que ya estaba arreglado (pasó, ver CLAUDE.md, "Gotchas de tooling").
const V_SEL = Math.floor(fs.statSync(path.join(AQUI, 'prototipo-duelo-selector.js')).mtimeMs);
const V_DUM = Math.floor(fs.statSync(path.join(AQUI, 'prototipo-pasos-datos-inventados.js')).mtimeMs);
replaceOnce(TAG_SELECTOR[0],
  '<!-- PROTO: DATOS INVENTADOS. Rellena los últimos 10 ejercicios de los clubes de\n' +
  '     Argentina y Brasil, con ascensos y descensos, para poder probar la interfaz\n' +
  '     sin que la falta de datos reales limite el diseño. NINGÚN número que salga de\n' +
  '     acá es real, y este archivo NO lo carga ninguna otra página del sitio. Ver la\n' +
  '     cabecera de prototipo-pasos-datos-inventados.js. -->\n' +
  '<script src="Prototyping/prototipo-pasos-datos-inventados.js?v=' + V_DUM + '"></script>\n' +
  '<!-- PROTO: el selector paso a paso, en vez del de columnas. Misma API pública. -->\n' +
  '<script src="Prototyping/prototipo-duelo-selector.js?v=' + V_SEL + '"></script>',
  'script de js/selector.js');

// ---------------------------------------------------------------------------
// 7. El botón de "volver a la primera visita" y el guard de las pestañas dummy.
// ---------------------------------------------------------------------------
const PROTO_JS = `
<!-- ======================== PROTO: comportamiento del banco de pruebas ======== -->
<script>
(function(){
  // Los datos inventados se encienden ACÁ y no arriba, y el motivo es de orden de
  // carga: loadClubData() lo define el <script> principal de index.html, que corre
  // DESPUÉS de los <script src> del final del body. Encendiéndolo antes, el wrapper
  // se instalaba sobre un undefined y los ejercicios inventados nunca entraban —
  // aparecían en el selector y no existían al abrirlos, que es el peor de los mundos.
  if(window.FOS_DUMMY){
    FOS_DUMMY.init();
    if(window.CLUB_SELECTOR && CLUB_SELECTOR.refresh) CLUB_SELECTOR.refresh();
    // Si la visita entra con un club guardado, ese club se dibujó en el INIT del
    // sitio, o sea ANTES de que existieran los ejercicios inventados: hay que
    // volver a elegirlo para que se redibuje con ellos. Pasar por null y volver es
    // el mismo camino que usa el selector, no un refresh inventado por afuera.
    var guardado = (window.CLUB_SELECTOR && CLUB_SELECTOR.savedClub) ? CLUB_SELECTOR.savedClub() : null;
    if(guardado && typeof selectClub === 'function'){
      Promise.resolve(selectClub(null)).then(function(){ return selectClub(guardado); });
    }
  }

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
console.log('la lógica vive en prototipo-duelo-selector.js (escrito a mano, no se genera)');

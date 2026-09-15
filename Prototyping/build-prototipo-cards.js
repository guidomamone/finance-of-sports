#!/usr/bin/env node
/**
 * build-prototipo-cards.js — genera `prototipo-cards.html`, el PROTOTIPO 4 del
 * selector: dos cards VACÍOS en la portada, y cada uno se llena con el selector
 * paso a paso del prototipo 2 adentro de un modal.
 *
 * NO REEMPLAZA a los prototipos 1, 2 ni 3: los cuatro quedan vivos, en esta misma
 * carpeta, para poder compararlos.
 *
 * DE DÓNDE SALE (Guido, después de probar el 3): "no me gusta el prototipo 3.
 * Quiero ver un prototipo 4: Inicio comienza con un card como el attached pero
 * claramente los cards están vacíos. Apretás el card y se dispara un modal que es
 * el selector del prototipo 2, pero a ese selector quitale el paso que es para
 * comparar con otra cosa".
 *
 * Carga los MISMOS datos inventados que los prototipos 2 y 3 (los clubes de
 * Argentina y Brasil con 10 ejercicios cada uno): sin eso no se puede probar el
 * paso de ejercicios. Ver la cabecera de `prototipo-pasos-datos-inventados.js`.
 *
 * La lógica vive en `prototipo-cards-selector.js`, escrita a mano. Este script
 * solo arma la página.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');        // la raíz del repo
const AQUI = __dirname;                          // Prototyping/, donde salen los archivos
const SRC = path.join(ROOT, 'index.html');
const OUT = path.join(AQUI, 'prototipo-cards.html');

let html = fs.readFileSync(SRC, 'utf8');

function replaceOnce(needle, replacement, what){
  const i = html.indexOf(needle);
  if(i < 0) throw new Error('ancla no encontrada (' + what + '): index.html cambió, actualizá Prototyping/build-prototipo-cards.js');
  if(html.indexOf(needle, i + 1) >= 0) throw new Error('ancla ambigua (' + what + '): aparece más de una vez');
  html = html.slice(0, i) + replacement + html.slice(i + needle.length);
}

// ---------------------------------------------------------------------------
// 1. Cabecera y título.
// ---------------------------------------------------------------------------
replaceOnce('<html lang="es">', [
  '<!--',
  '  ============================ ESTO NO ES EL SITIO ============================',
  '  PROTOTIPO 4 del selector: dos cards vacíos, y un modal con los pasos del 2.',
  '  GENERADO por `node Prototyping/build-prototipo-cards.js` a partir de index.html.',
  '  NO editar a mano: se sobrescribe. Los cambios van en el generador, y la',
  '  lógica del selector en `prototipo-cards-selector.js`.',
  '  Los prototipos 1, 2 y 3 siguen en sus propios archivos: son cuatro',
  '  visualizaciones para comparar, no una encima de la otra.',
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
  '<title>PROTOTIPO 4 · Dos cards y un modal de pasos</title>', 'title');

// ---------------------------------------------------------------------------
// 2. CSS. Los cards son los del prototipo 3 (prefijo `cd-`) y el contenido del
//    modal es el del prototipo 2 (`.paso`, `.op`), a propósito: el 4 es el 3 por
//    fuera y el 2 por dentro, y si se ven distinto de sus originales no se puede
//    comparar nada.
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
  .proto-flag span{font-weight:400;opacity:.85;}
  .proto-reset{margin-left:14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.55);
               color:#fff;border-radius:6px;padding:2px 9px;font-size:11px;font-weight:700;
               font-family:inherit;cursor:pointer;vertical-align:1px;}
  .proto-reset:hover{background:#fff;color:#1b7a3d;}

  /* El panel de columnas sigue en el DOM porque js/comparar-clubes.js le pregunta
     por varios ids, pero en esta versión no se muestra nunca. */
  .sel-panel, .sel-backdrop, .coach{display:none !important;}

  /* ---------------------------------------------------------------------------
     LOS DOS CARDS. Iguales a los del prototipo 3, pero arrancan VACÍOS: el card
     vacío es un botón grande y nada más, así la portada abre con una pregunta en
     vez de con un árbol de cinco niveles por lado.
     --------------------------------------------------------------------------- */
  .cards-block{background:linear-gradient(160deg,var(--azul) 0%,var(--azul-dark) 100%);color:#fff;
               border-radius:14px;padding:26px 24px 22px;margin-bottom:22px;}
  .cards-block h1{font-size:27px;margin:0 0 6px;color:#fff;}
  .cards-block .lead{color:#bfcde6;font-size:14.5px;margin:0 0 18px;max-width:820px;line-height:1.55;}

  .cd-toggle{display:inline-flex;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
             border-radius:10px;padding:3px;margin-bottom:18px;gap:3px;}
  .cd-toggle button{background:none;border:none;color:#bfcde6;font-family:inherit;font-size:13px;font-weight:700;
                    padding:8px 16px;border-radius:8px;cursor:pointer;}
  .cd-toggle button.on{background:var(--oro);color:var(--azul-dark);}
  .cd-toggle button:not(.on):hover{color:#fff;}

  .cd-wrap{display:grid;grid-template-columns:1fr 44px 1fr;gap:10px;align-items:stretch;}
  .cd-wrap.uno{grid-template-columns:minmax(0,560px);}
  .cd-vs{align-self:center;text-align:center;font-size:13px;font-weight:800;color:#8fa3c4;letter-spacing:.08em;}
  .cd-col{background:var(--card);color:var(--text);border-radius:12px;border:1px solid transparent;overflow:hidden;
          display:flex;flex-direction:column;}
  .cd-col.con{border-color:var(--oro);}
  .cd-head{display:flex;align-items:center;gap:9px;padding:11px 13px;border-bottom:1px solid var(--border);}
  .cd-letra{width:22px;height:22px;border-radius:50%;background:var(--azul);color:#fff;font-size:11.5px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .cd-letra.chica{display:inline-flex;width:19px;height:19px;font-size:10.5px;margin-right:7px;vertical-align:1px;}
  .cd-titulo{font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:800;color:var(--muted);flex:1;}
  .cd-x{background:none;border:none;color:var(--muted);font-size:19px;line-height:1;cursor:pointer;padding:0 3px;}
  .cd-x:hover{color:var(--red);}

  /* EL CARD VACÍO: un solo botón, del alto de todo el card, para que apretar
     "en cualquier parte del card" haga lo que el visitante espera. */
  .cd-vacio{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
            background:none;border:2px dashed var(--border);border-radius:11px;margin:11px;padding:30px 18px;
            font-family:inherit;color:var(--text);cursor:pointer;text-align:center;}
  .cd-vacio:hover{border-color:var(--azul);background:#f3f7ff;}
  .cd-vacio-mas{width:34px;height:34px;border-radius:50%;background:var(--azul);color:#fff;font-size:21px;line-height:1;
                display:flex;align-items:center;justify-content:center;margin-bottom:3px;}
  .cd-vacio-t{font-size:16px;font-weight:800;}
  .cd-vacio-s{font-size:12.5px;color:var(--muted);max-width:280px;line-height:1.45;}

  .cd-elegido{padding:13px;}
  .cd-sujeto{display:flex;align-items:center;gap:11px;margin-bottom:12px;}
  .cd-crest{width:34px;height:34px;border-radius:50%;background:var(--azul);color:#fff;font-size:12px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .cd-op-txt{display:flex;flex-direction:column;min-width:0;}
  .cd-op-s{font-size:11.5px;color:var(--muted);}
  .cd-sujeto-n{font-size:17px;font-weight:800;}
  .cd-otro{margin-left:auto;background:none;border:1px solid var(--border);color:var(--muted);border-radius:7px;
           padding:5px 9px;font-family:inherit;font-size:11.5px;font-weight:700;cursor:pointer;flex:0 0 auto;}
  .cd-otro:hover{border-color:var(--azul);color:var(--azul);}
  .cd-modos{display:flex;gap:6px;margin-bottom:12px;}
  .cd-modo{flex:1;background:#fff;border:1px solid var(--border);color:var(--muted);border-radius:8px;padding:7px 9px;
           font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;}
  .cd-modo.on{background:var(--azul);border-color:var(--azul);color:#fff;}
  .cd-anio{display:flex;align-items:center;gap:9px;font-size:12px;color:var(--muted);font-weight:700;}
  .cd-anio select{flex:1;font-family:inherit;font-size:13px;padding:7px 8px;border:1px solid var(--border);
                  border-radius:8px;background:#fff;color:var(--text);cursor:pointer;}
  .cd-anios{margin:0;font-size:12px;color:var(--muted);font-weight:700;}

  .cd-pie{margin-top:16px;}
  .cd-go{background:var(--oro);color:var(--azul-dark);border:none;border-radius:10px;padding:12px 22px;
         font-family:inherit;font-size:14.5px;font-weight:800;cursor:pointer;}
  .cd-go:hover{filter:brightness(1.07);}
  .cd-go.off{background:rgba(255,255,255,.12);color:#8fa3c4;cursor:not-allowed;}

  /* El resultado: una sola vista para un club, un conjunto promediado y uno sumado. */
  .cd-resultado{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px 22px;margin-bottom:26px;}
  .cd-resultado[hidden]{display:none;}
  .cd-res-head h2{margin:0 0 4px;font-size:20px;}
  .cd-res-sub{color:var(--muted);font-size:13px;margin:0 0 16px;}
  .cd-cargando{color:var(--muted);font-size:13.5px;margin:0;}
  .cd-tabla{width:100%;border-collapse:collapse;}
  .cd-tabla th, .cd-tabla td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:top;}
  .cd-tabla thead th{border-bottom:2px solid var(--azul);}
  .cd-res-n{font-size:14.5px;font-weight:700;}
  .cd-res-m{display:block;font-size:11.5px;color:var(--muted);font-weight:400;margin-top:3px;}
  .cd-ind{font-size:13px;color:var(--muted);font-weight:700;width:190px;}
  .cd-num{font-size:17px;font-weight:800;display:block;}
  .cd-num.neg{color:var(--red);}
  .cd-nodato{color:var(--muted);font-size:13px;font-style:italic;}
  .cd-bar{display:block;height:6px;background:#eef2f9;border-radius:3px;margin-top:6px;overflow:hidden;max-width:260px;}
  .cd-bar-in{display:block;height:100%;background:var(--azul);}
  .cd-bar-in.neg{background:var(--red);}
  .cd-avisos{margin-top:14px;}
  .cd-avisos p{color:var(--muted);font-size:12px;line-height:1.5;margin:0 0 5px;}

  /* ---------------------------------------------------------------------------
     EL MODAL. Es la diferencia con el prototipo 2, donde los pasos vivían EN la
     página: acá la portada muestra la pregunta y el modal muestra el trabajo.
     --------------------------------------------------------------------------- */
  .modal-back{position:fixed;inset:0;z-index:300;background:rgba(7,29,63,.55);backdrop-filter:blur(2px);
              display:flex;align-items:flex-start;justify-content:center;padding:34px 16px;overflow-y:auto;}
  .modal-back[hidden]{display:none;}
  .modal-panel{background:linear-gradient(160deg,var(--azul) 0%,var(--azul-dark) 100%);color:#fff;border-radius:14px;
               width:100%;max-width:760px;padding:18px 20px 22px;box-shadow:0 24px 60px rgba(7,29,63,.45);}
  .modal-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
  .modal-t{font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:800;color:#bfcde6;}
  .modal-h{font-size:20px;font-weight:800;flex:1;margin:0;}
  .modal-x{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.28);color:#fff;border-radius:8px;
           width:30px;height:30px;font-size:17px;line-height:1;cursor:pointer;font-family:inherit;}
  .modal-x:hover{background:rgba(242,183,5,.22);border-color:var(--oro);}

  /* El atajo de una línea, para el que ya sabe qué club quiere: mismo control que
     en el prototipo 2, y por el mismo motivo. */
  .modal-busca{display:flex;align-items:center;gap:8px;background:#fff;border-radius:10px;padding:4px 4px 4px 14px;margin-bottom:16px;}
  .modal-busca input{flex:1;border:none;outline:none;font-size:15px;padding:10px 0;background:none;font-family:inherit;color:var(--text);}
  .modal-busca .lupa{color:var(--muted);font-size:15px;}

  /* ---------------------------------------------------------------------------
     UN CARD POR PASO (copiado del prototipo 2, con sus tres estados: resuelto,
     actual y pendiente).
     --------------------------------------------------------------------------- */
  /* color explícito: el panel de afuera es azul con texto blanco, y sin esto
     cualquier texto del card que no traiga color propio nace blanco sobre blanco. */
  .paso{background:var(--card);color:var(--text);border-radius:12px;margin-bottom:10px;overflow:hidden;
        border:1px solid transparent;}
  .paso.pendiente{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14);color:#fff;}
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

  /* Las opciones. Grilla que se acomoda sola: en desktop entran 2 o 3 por fila, en
     un teléfono queda una columna, sin una sola media query. */
  .op-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;}
  .op-grid.clubes{grid-template-columns:repeat(auto-fill,minmax(230px,1fr));max-height:340px;overflow-y:auto;}
  .op-grid.anios{grid-template-columns:repeat(auto-fill,minmax(180px,1fr));max-height:300px;overflow-y:auto;}
  .op{display:flex;align-items:center;gap:9px;width:100%;text-align:left;background:#fff;border:1px solid var(--border);
      border-radius:9px;padding:10px 12px;font-family:inherit;font-size:14px;cursor:pointer;color:var(--text);}
  .op:hover{border-color:var(--azul);background:#eef2f9;}
  .op.off{opacity:.45;cursor:not-allowed;}
  .op.off:hover{border-color:var(--border);background:#fff;}
  /* La casilla. Cada paso es multi-selección, y una casilla lo dice sin tener que
     explicarlo: un botón que se pinta al tocarlo se lee como un radio. */
  .op-check{width:17px;height:17px;border-radius:5px;border:1.5px solid var(--border);flex:0 0 auto;
            display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;background:#fff;}
  .op.on{border-color:var(--azul);background:#eef2f9;}
  .op.on .op-check{background:var(--azul);border-color:var(--azul);}
  .op.off .op-check{opacity:.5;}
  .op-icon{font-size:17px;flex:0 0 auto;}
  .op-crest{width:24px;height:24px;border-radius:50%;background:var(--azul);color:#fff;font-size:9px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
  .op-txt{display:flex;flex-direction:column;min-width:0;flex:1;}
  /* El label ENVUELVE en vez de cortarse con puntos suspensivos, al revés que en el
     prototipo 2: allá el bloque ocupaba el ancho de la página y entraba todo, y acá
     el modal mide 760px, así que "Fútbol americano" quedaba en "Fútbol ...". Un
     nombre cortado en una lista de opciones es peor que una fila de dos renglones. */
  .op-label{font-weight:600;line-height:1.25;}
  .op-sub{font-size:11.5px;color:var(--muted);}
  .op-meta{font-size:11.5px;color:var(--muted);white-space:nowrap;}

  .paso-todos-fila{display:flex;gap:8px;margin-bottom:9px;flex-wrap:wrap;}
  .paso-todos{background:#fff;border:1px solid var(--azul);color:var(--azul);border-radius:7px;padding:5px 11px;
              font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;}
  .paso-todos.on, .paso-todos:hover{background:var(--azul);color:#fff;}
  .paso-nada{background:none;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:5px 11px;
             font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;}
  .paso-nada:hover{border-color:var(--red);color:var(--red);}

  /* El pie de cada paso: confirmar, o decidir después. "Elegir más tarde" está en
     los seis pasos, y por eso ninguno dice "opcional": todos lo son. */
  .paso-pie{display:flex;align-items:center;gap:14px;margin-top:12px;flex-wrap:wrap;}
  .paso-ok{background:var(--azul);color:#fff;border:1px solid var(--azul);border-radius:8px;
           padding:9px 16px;font-family:inherit;font-size:13.5px;font-weight:700;cursor:pointer;}
  .paso-ok:hover{background:var(--azul-dark);}
  .paso-ok.off{background:#eef2f9;color:var(--muted);border-color:var(--border);cursor:not-allowed;}
  .paso-skip{background:none;border:none;color:var(--azul);font-family:inherit;font-size:13px;
             cursor:pointer;text-decoration:underline;text-underline-offset:3px;padding:2px 0;}
  .paso-skip:hover{color:var(--azul-dark);}
  .paso-ayuda{color:var(--muted);font-size:12.5px;margin:0 0 10px;}

  /* El card final del modal: dice qué se va a meter en el card y lo confirma. */
  .paso.resultado .paso-n{background:var(--green);color:#fff;}
  .res-msg{font-size:15.5px;font-weight:700;margin:0 0 4px;}
  .res-sub{color:var(--muted);font-size:13px;line-height:1.5;margin:0 0 12px;max-width:620px;}

  /* En un teléfono los dos cards se apilan y el VS queda en el medio. */
  @media (max-width:900px){
    .cd-wrap{grid-template-columns:1fr;}
    .cd-vs{padding:4px 0;}
    .modal-back{padding:12px 8px;}
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
  '<body>\n<div class="proto-flag proto-flag-falso">PROTOTIPO 4 · Dos cards y un modal de pasos '
  + '<span>— no es el sitio publicado · </span>'
  + '<b>DATOS INVENTADOS: los ejercicios 2016-2025 de Argentina y Brasil son de mentira</b>'
  + '<button type="button" class="proto-reset" id="protoReset" title="Borra el club elegido y los recientes de ESTE navegador, y recarga. El idioma no se toca.">Volver a la primera visita</button>'
  + '</div>\n', '<body>');

// ---------------------------------------------------------------------------
// 4. La portada: los dos cards reemplazan al hero del cold start, y el modal se
//    agrega al final del body.
//
//    Los ids del hero viejo que toca js/selector.js NO hacen falta acá, porque
//    este prototipo NO carga js/selector.js. El único que se conserva es
//    #clubLoadError, que lo escribe el <script> principal de index.html cuando un
//    club no carga.
// ---------------------------------------------------------------------------
const HERO_VIEJO_INICIO = '  <div class="hero" id="coldHero" hidden>';
const HERO_VIEJO_FIN = '  </div>\n\n  <!-- INICIO -->';
const iniHero = html.indexOf(HERO_VIEJO_INICIO);
const finHero = html.indexOf(HERO_VIEJO_FIN, iniHero);
if(iniHero < 0 || finHero < 0) throw new Error('no se encontró el bloque #coldHero de index.html');

const HERO_NUEVO = `  <div class="cards-block" id="cardsBlock">
    <!-- #coldHero sigue existiendo (vacío y escondido) porque applyClubMode() lo
         toca por id. El bloque de los cards es este de afuera. -->
    <div id="coldHero" hidden></div>

    <h1>Los números reales de tu club</h1>
    <p class="lead">Ingresos, gastos y deuda, sacados del balance oficial de cada club, con la fuente de cada cifra a la vista.</p>

    <!-- El toggle. La mayoría de las visitas quiere UN club y no tiene por qué pagar
         el costo de una pantalla partida al medio; el que vino a comparar encuentra
         los dos cards sin buscarlos. -->
    <div class="cd-toggle">
      <button type="button" id="cdToggleDuelo" class="on">Quiero comparar dos</button>
      <button type="button" id="cdToggleUno">Solo quiero ver uno</button>
    </div>

    <div class="cd-wrap" id="cdWrap"></div>
    <div class="cd-pie" id="cdPie"></div>

    <p class="hero-error" id="clubLoadError" hidden></p>
  </div>

  <!-- El resultado. Vive fuera del bloque porque es lo que se mira, no un control. -->
  <div class="cd-resultado" id="cdResultado" hidden></div>
`;
html = html.slice(0, iniHero) + HERO_NUEVO + html.slice(finHero);

// EL MODAL. Va al final del body y no adentro del bloque azul: es una capa sobre
// la página entera, y anidarlo en un contenedor con `border-radius` y `overflow`
// propio es la forma clásica de que un `position:fixed` quede recortado.
const MODAL = `
<!-- ======================== PROTO: el modal de pasos ========================= -->
<div class="modal-back" id="modalBack" hidden>
  <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitulo">
    <div class="modal-head">
      <h2 class="modal-h" id="modalTitulo">Equipo A</h2>
      <button type="button" class="modal-x" id="modalX" title="Cerrar sin elegir (Esc)">&times;</button>
    </div>

    <!-- El atajo: quien ya sabe qué club quiere no recorre los seis pasos. -->
    <div class="modal-busca">
      <span class="lupa" aria-hidden="true">&#128269;</span>
      <input id="modalQ" type="text" autocomplete="off" spellcheck="false" placeholder="¿Ya sabés cuál? Escribí el club, la liga o el país">
    </div>

    <div id="modalResultados" hidden></div>
    <div id="modalWrap"></div>
  </div>
</div>
`;
// VA ANTES DEL <footer>, y no antes de `</body>` como podría parecer natural: el
// <script> principal de index.html está al final del body y es el que llama a
// `CLUB_SELECTOR.init()`. Con el modal después de ese script, init() corría con el
// markup del modal todavía inexistente y `$('modalX')` daba null (pasó: TypeError
// en la primera carga, y los dos cards quedaban muertos).
replaceOnce('<footer>', MODAL + '\n<footer>', 'apertura del <footer> (modal)');

// ---------------------------------------------------------------------------
// 5. applyClubMode(): mismo cambio que en los prototipos 1 y 3. El selector no es
//    una pantalla aparte que se apaga al elegir, y las pestañas se ven siempre.
// ---------------------------------------------------------------------------
replaceOnce(`  function applyClubMode(){
    const cold = !currentClub;
    document.getElementById('coldHero').hidden = !cold;
    document.getElementById('mainNav').style.display = cold ? 'none' : '';`,
`  function applyClubMode(){
    const cold = !currentClub;
    // PROTO: el bloque de los cards se queda en la página con el club ya elegido; el
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
const V_SEL = Math.floor(fs.statSync(path.join(AQUI, 'prototipo-cards-selector.js')).mtimeMs);
const V_DUM = Math.floor(fs.statSync(path.join(AQUI, 'prototipo-pasos-datos-inventados.js')).mtimeMs);
replaceOnce(TAG_SELECTOR[0],
  '<!-- PROTO: DATOS INVENTADOS. Rellena los últimos 10 ejercicios de los clubes de\n' +
  '     Argentina y Brasil, con ascensos y descensos, para poder probar la interfaz\n' +
  '     sin que la falta de datos reales limite el diseño. NINGÚN número que salga de\n' +
  '     acá es real, y este archivo NO lo carga ninguna otra página del sitio. Ver la\n' +
  '     cabecera de prototipo-pasos-datos-inventados.js. -->\n' +
  '<script src="Prototyping/prototipo-pasos-datos-inventados.js?v=' + V_DUM + '"></script>\n' +
  '<!-- PROTO: los dos cards + el modal de pasos, en vez del selector de columnas.\n' +
  '     Misma API pública. -->\n' +
  '<script src="Prototyping/prototipo-cards-selector.js?v=' + V_SEL + '"></script>',
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
replaceOnce('\n</body>', PROTO_JS + '\n</body>', 'cierre del <body> (script)');

fs.writeFileSync(OUT, html);
console.log('escrito: ' + path.relative(ROOT, OUT) + ' (' + Math.round(html.length / 1024) + ' KB)');
console.log('la lógica vive en prototipo-cards-selector.js (escrito a mano, no se genera)');

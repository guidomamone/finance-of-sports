#!/usr/bin/env node
/**
 * build-prototipo-inicio.js — genera el prototipo de la portada nueva
 * (`prototipo-inicio-selector.html` + `prototipo-inicio-selector.js`).
 *
 * QUÉ PROTOTIPA (pedido de Guido, 2026-09-14): hoy la primera visita ve un card
 * ("Los números reales de tu club") con un buscador chico, y el selector jerárquico
 * queda escondido atrás de un click. La propuesta es al revés: el SELECTOR es la
 * portada, con copy antes y después, y se puede MINIMIZAR.
 *
 * POR QUÉ UN GENERADOR Y NO UN ARCHIVO A MANO: el prototipo anterior
 * (`prototipo-selector.html`, Versión 137) era un mock autocontenido con taxonomía
 * embebida y números inventados. Eso servía para decidir una UX que todavía no
 * existía; hoy el selector YA ESTÁ CONSTRUIDO, así que el prototipo tiene que
 * probar la interacción REAL (41 clubes de verdad, js/selector.js de verdad) y lo
 * único nuevo es el layout de la portada. Copiar `index.html` a mano dejaría dos
 * archivos de 1800 líneas divergiendo; esto lo regenera en un segundo.
 *
 * El prototipo NO se deploya: no lo linkea ninguna página del sitio. Se abre a mano
 * (`prototipo-inicio-selector.html`) y se compara contra `index.html` al lado.
 *
 * Si un ancla de las de abajo no aparece, el script FALLA en vez de escribir un
 * archivo a medias: significa que `index.html` cambió y hay que actualizar esto.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'index.html');
const OUT = path.join(ROOT, 'prototipo-inicio-selector.html');
// El prototipo son 2 archivos: la portada y la copia PARCHEADA de js/selector.js.
// (Hasta la Versión 145 eran 3: el tercero era una tabla propia de ejercicios por
// club. Dejó de hacer falta en la 146, cuando esa lista pasó a `data/club-index.js`,
// que es el índice liviano REAL del sitio.)
const OUT_SEL = path.join(ROOT, 'prototipo-inicio-selector.js');

let html = fs.readFileSync(SRC, 'utf8');

function replaceOnce(needle, replacement, what){
  const i = html.indexOf(needle);
  if(i < 0) throw new Error('ancla no encontrada (' + what + '): index.html cambió, actualizá tools/build-prototipo-inicio.js');
  if(html.indexOf(needle, i + 1) >= 0) throw new Error('ancla ambigua (' + what + '): aparece más de una vez');
  html = html.slice(0, i) + replacement + html.slice(i + needle.length);
}

// ---------------------------------------------------------------------------
// 1. Cabecera: que el archivo se declare prototipo desde la primera línea.
// ---------------------------------------------------------------------------
replaceOnce('<html lang="es">', [
  '<!--',
  '  ============================ ESTO NO ES EL SITIO ============================',
  '  Prototipo del Inicio con el selector de clubes en la página.',
  '  GENERADO por `node tools/build-prototipo-inicio.js` a partir de index.html.',
  '  NO editar a mano: se sobrescribe. Los cambios van en el generador.',
  '  Todo lo que agrega el prototipo está marcado con PROTO en el HTML, el CSS y el JS.',
  '  Los datos, los clubes y el motor del selector son los REALES (mismos js/ y data/).',
  '  =============================================================================',
  '-->',
  '<html lang="es">'
].join('\n'), 'apertura <html>');

replaceOnce('<title data-i18n="site.title">El deporte en Números | Datos para votar informado</title>',
  '<title>PROTOTIPO · Inicio con el selector en la página</title>', 'title');

// ---------------------------------------------------------------------------
// 2. CSS del prototipo. Va DESPUÉS del </style> del sitio, en su propio bloque,
//    para que el diff contra index.html muestre de una qué es nuevo.
// ---------------------------------------------------------------------------
const PROTO_CSS = `
<!-- ======================== PROTO: estilos del prototipo ======================== -->
<style>
  /* Franja permanente: ninguna captura de esto puede pasar por el sitio real. */
  .proto-flag{position:sticky;top:0;z-index:200;background:#b5372b;color:#fff;font-size:12px;font-weight:700;
              letter-spacing:.04em;text-align:center;padding:5px 10px;}
  .proto-flag span{font-weight:400;opacity:.85;}
  .proto-hidden{display:none !important;}

  /* ---------------------------------------------------------------------------
     LA PORTADA. Dos modos del MISMO bloque, no dos pantallas: en frío manda el
     selector (con el título y la bajada arriba); con un club elegido el bloque se
     encoge, el contenido del club pasa a ser lo principal, y el selector se queda
     en la página para cambiar de club sin ir a buscar nada (.warm).
     --------------------------------------------------------------------------- */
  .hero{padding:26px 26px 22px;}
  .hero h1{margin-bottom:6px;}
  .hero.warm .hero-copy,
  .hero.warm .hero-quick,
  .hero.warm .hero-foot{display:none;}
  .hero.warm{padding:12px 14px;margin-bottom:18px;}

  /* La barra con el botón Minimizar. Solo existe con un club elegido: en frío no
     hay nada abajo del selector que minimizarlo te deje ver. */
  .hero-sel-bar{display:none;align-items:center;gap:10px;margin-bottom:9px;}
  .hero.warm .hero-sel-bar{display:flex;}
  .hs-title{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#8fa3c4;font-weight:800;flex:1;}
  .hs-toggle{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.28);color:#fff;border-radius:8px;
             padding:6px 12px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;}
  .hs-toggle:hover{background:rgba(242,183,5,.22);border-color:var(--oro);}
  .hero.min .hero-sel-bar{margin-bottom:0;}

  /* El panel es EL MISMO nodo que el modal (js/selector.js lo sigue manejando por
     id): el prototipo lo muda adentro de la portada y ya no lo saca nunca, así que
     esto solo apaga el posicionamiento fijo. El backdrop no corre más: no hay modal
     que oscurecer. */
  .sel-panel.embedded{position:static;transform:none;width:auto;max-height:none;height:min(560px,68vh);
                      box-shadow:0 10px 30px rgba(7,29,63,.22);display:flex !important;}
  .sel-backdrop{display:none !important;}
  /* Adentro de la página no hay a dónde "cerrar": la salida es Minimizar. Y "Ver la
     portada con todos los clubes" tampoco tiene sentido: la portada no es otra
     pantalla, es esta misma, y los 41 clubes están a la vista mientras lo leés. */
  .sel-panel.embedded .sel-close,
  .sel-panel.embedded .foot-close,
  .sel-panel.embedded .kbd,
  .sel-panel.embedded .sel-home{display:none;}
  .hero.min .sel-panel.embedded{display:none !important;}

  /* Punto 3 de Guido: la bajada cortaba a los 600px (la regla .hero p de index.html)
     y metía un salto de línea en la mitad de una frase, con medio card vacío al lado. */
  .hero p{max-width:820px;}

  /* ---------------------------------------------------------------------------
     LA FILA DE BÚSQUEDA. El input ocupaba el ancho entero y al lado quedaba aire;
     ahí van ahora los 3 clubes de acceso rápido (punto 12 de Guido).
     --------------------------------------------------------------------------- */
  .sel-panel.embedded .sel-search{flex-wrap:wrap;}
  .sel-panel.embedded .sel-search input{flex:1 1 380px;}
  .sel-search .hero-quick{margin:0;display:flex;align-items:center;gap:9px;flex:0 1 auto;}
  .sel-search .hq-label{margin:0;color:var(--muted);font-size:10.5px;white-space:nowrap;}
  /* Los chips estaban pensados para el fondo azul del hero; acá viven sobre blanco. */
  .sel-search .hq-club{background:#f4f6fa;border-color:var(--border);color:var(--text);padding:5px 10px 5px 5px;font-size:12.5px;}
  .sel-search .hq-club:hover{background:#eef2f9;border-color:var(--azul);}
  .sel-search .hq-club .hq-sub{color:var(--muted);}
  .sel-search .hq-club .crest{border-color:rgba(0,0,0,.12);}

  /* ---------------------------------------------------------------------------
     LA FILA DE CLUB. Un solo control (punto 13): el dropdown "Ver" junta el
     ejercicio y las dos acciones, así la fila vuelve a ser de una línea.
     --------------------------------------------------------------------------- */
  /* Contorno y no relleno: son 41 filas, y 41 botones azules macizos apilados le
     ganan la atención al nombre del club, que es lo que el visitante viene a leer. */
  .r-act{margin-left:auto;flex:0 0 auto;font-family:inherit;font-size:11.5px;font-weight:700;
         color:var(--azul);background:#fff;border:1px solid var(--border);border-radius:6px;
         padding:4px 6px;cursor:pointer;max-width:46%;}
  .r-act:hover{border-color:var(--azul);background:#eef2f9;}
  .sel-row.sel .r-act{background:var(--oro);color:var(--azul-dark);border-color:var(--oro);}
  .r-act + .add-btn{margin-left:6px;}

  /* Al elegir club la página baja hasta sus datos, y el header es sticky: sin esto
     el título de la sección queda tapado abajo del header. */
  main > section{scroll-margin-top:96px;}

  /* PROTO (punto 9): las pestañas se ven desde la primera visita. En frío no llevan
     a ningún lado todavía, y eso se dice apagándolas, no escondiéndolas. */
  #mainNav.proto-dummy{opacity:.45;}
  #mainNav.proto-dummy button{cursor:default;}
</style>
`;
replaceOnce('</style>\n', '</style>\n' + PROTO_CSS, 'cierre del <style> del sitio');

// ---------------------------------------------------------------------------
// 3. La franja de prototipo, apenas abre el <body>.
// ---------------------------------------------------------------------------
replaceOnce('<body>\n', '<body>\n<div class="proto-flag">PROTOTIPO · Inicio con el selector en la página <span>— no es el sitio publicado</span></div>\n', '<body>');

// PROTO (punto 4 de Guido): los ejemplos del buscador iban en minúscula ("boca",
// "laliga", "japón") como si fueran cómo hay que escribirlos. La búsqueda ignora
// mayúsculas y acentos, así que escribirlos bien no le cuesta nada al usuario y el
// sitio deja de mostrar mal los nombres propios. Mismo arreglo pendiente en la clave
// selector.search.ph de data/lang/en.js ("boca", "laliga", "japan").
replaceOnce(
  'placeholder="Buscá un club, una liga o un país…  (ej. &quot;boca&quot;, &quot;laliga&quot;, &quot;japón&quot;)"',
  'placeholder="Buscá un club, una liga o un país…  (ej. &quot;Boca&quot;, &quot;LaLiga&quot;, &quot;Japón&quot;)"',
  'placeholder del buscador del panel');

// ---------------------------------------------------------------------------
// 4. La portada nueva.
//
//    Los ids que toca js/selector.js (heroQ, heroGo, heroClubs, heroLeagues,
//    heroFoot, clubLoadError) siguen TODOS en el DOM. Los que el layout nuevo no
//    usa quedan con .proto-hidden en vez de borrados: borrarlos haría explotar
//    init() en el primer addEventListener sobre null.
// ---------------------------------------------------------------------------
const HERO_VIEJO_INICIO = '  <div class="hero" id="coldHero" hidden>';
const HERO_VIEJO_FIN = '  </div>\n\n  <!-- INICIO -->';
const iniHero = html.indexOf(HERO_VIEJO_INICIO);
const finHero = html.indexOf(HERO_VIEJO_FIN, iniHero);
if(iniHero < 0 || finHero < 0) throw new Error('no se encontró el bloque #coldHero de index.html');

const HERO_NUEVO = `  <div class="hero" id="coldHero" hidden>
    <!-- PROTO: COPY DE ANTES. Solo en frío: con un club elegido se esconde, porque
         a esa altura ya no le está explicando nada a nadie. -->
    <div class="hero-copy">
      <h1 data-i18n="hero.title">Los números reales de tu club</h1>
      <!-- Sin "y mercado de pases", que el sitio todavía no tiene cargado (punto 3
           de Guido). El mismo cambio va en la clave hero.sub de data/lang/en.js,
           que hoy dice "and transfers". -->
      <p data-i18n="hero.sub">Ingresos, gastos y deuda, sacados del balance oficial de cada club, con la fuente de cada cifra a la vista.</p>
    </div>

    <!-- PROTO: EL SELECTOR, ACÁ MISMO, SIEMPRE. No está duplicado: es el mismo nodo
         #clubPanel, mudado acá por el script de abajo y no devuelto nunca. -->
    <div class="hero-sel" id="heroSel">
      <div class="hero-sel-bar">
        <span class="hs-title" id="hsTitle">Cambiar de club</span>
        <button class="hs-toggle" id="hsToggle" type="button" aria-expanded="true" aria-controls="heroSelSlot">Minimizar</button>
      </div>
      <div class="hero-sel-slot" id="heroSelSlot"></div>
    </div>

    <!-- Los 3 clubes de acceso rápido. El script los MUEVE adentro de la fila de
         búsqueda del panel, que tenía todo el lado derecho vacío (punto 12). -->
    <div class="hero-quick" id="heroQuickWrap">
      <div class="hq-label" data-i18n="hero.quick.clubs">O empezá por</div>
      <div class="hq-row" id="heroClubs"></div>
    </div>

    <p class="hero-foot" id="heroFoot"></p>
    <p class="hero-error" id="clubLoadError" hidden></p>

    <!-- Nodos que js/selector.js necesita pero este layout no muestra: el buscador
         del hero (lo reemplazó el del panel) y las ligas (ya son una columna del
         árbol). Se esconden en vez de borrarse: sin ellos, init() explota. -->
    <div class="hero-search proto-hidden">
      <input id="heroQ" type="text" autocomplete="off" data-i18n-placeholder="hero.search.ph" placeholder="Buscá tu club…  ej. Boca, Racing, Barcelona, Kashima">
      <button id="heroGo" data-i18n="hero.search.go">Buscar</button>
    </div>
    <div class="hero-quick proto-hidden">
      <div class="hq-label" data-i18n="hero.quick.leagues">O mirá qué hay cargado de cada liga</div>
      <div class="hq-row" id="heroLeagues"></div>
    </div>
`;
html = html.slice(0, iniHero) + HERO_NUEVO + html.slice(finHero);

// ---------------------------------------------------------------------------
// 5. applyClubMode(): la función del sitio que decide "portada" vs "club elegido".
//    El prototipo la cambia en vez de pelearla desde afuera, porque ESTE es el
//    cambio que habría que hacer de verdad si la portada nueva se aprueba.
// ---------------------------------------------------------------------------
replaceOnce(`  function applyClubMode(){
    const cold = !currentClub;
    document.getElementById('coldHero').hidden = !cold;
    document.getElementById('mainNav').style.display = cold ? 'none' : '';`,
`  function applyClubMode(){
    const cold = !currentClub;
    // PROTO: la portada dejó de ser una pantalla aparte que se apaga al elegir club.
    // Es el mismo bloque en dos modos, y el selector se queda en la página con el
    // club ya elegido (pedido de Guido: "que el selector se quede ahí, pero puedas
    // minimizarlo"). Esconderlo era obligar a un viaje al header para cambiar de club.
    const portada = document.getElementById('coldHero');
    portada.hidden = false;
    portada.classList.toggle('warm', !cold);
    // PROTO: las pestañas se ven siempre (punto 9). En frío no llevan a ningún lado
    // todavía — no hay club que mostrar — y eso se dice apagándolas, no borrándolas:
    // que se vea lo que el sitio tiene para ofrecer antes de elegir.
    document.getElementById('mainNav').style.display = '';
    document.getElementById('mainNav').classList.toggle('proto-dummy', cold);`,
  'applyClubMode');

// ---------------------------------------------------------------------------
// 6. El JS del prototipo, al final del <body>. Lo mínimo que no entra en
//    applyClubMode(): mudar nodos y el botón Minimizar.
// ---------------------------------------------------------------------------
const PROTO_JS = `
<!-- ======================== PROTO: comportamiento nuevo ======================== -->
<script>
(function(){
  var hero = document.getElementById('coldHero');
  var panel = document.getElementById('clubPanel');
  var slot = document.getElementById('heroSelSlot');
  var toggle = document.getElementById('hsToggle');
  var titulo = document.getElementById('hsTitle');
  var LS_MIN = 'fos_proto_selector_min';

  // (a) El panel del selector se muda adentro de la página y ya no vuelve al <body>:
  //     en este prototipo no existe el modal. Un solo nodo, un solo lugar.
  slot.appendChild(panel);
  panel.classList.add('embedded');
  panel.classList.add('open');

  // (b) Los 3 clubes de acceso rápido se mudan al lado derecho del buscador, que
  //     estaba vacío (punto 12 de Guido).
  var search = panel.querySelector('.sel-search');
  if(search) search.appendChild(document.getElementById('heroQuickWrap'));

  // (c) Minimizar. Solo se ve con un club elegido: en frío no hay nada abajo que
  //     minimizarlo te deje ver.
  function setMin(min){
    hero.classList.toggle('min', min);
    toggle.textContent = min ? 'Abrir el selector' : 'Minimizar';
    toggle.setAttribute('aria-expanded', String(!min));
    titulo.textContent = min ? 'Cambiar de club' : 'Elegí otro club';
    try { localStorage.setItem(LS_MIN, min ? '1' : '0'); } catch(e){}
  }
  toggle.addEventListener('click', function(){
    var min = !hero.classList.contains('min');
    setMin(min);
    if(!min){ var q = document.getElementById('selQ'); if(q) q.focus(); }
  });
  var guardado = null;
  try { guardado = localStorage.getItem(LS_MIN); } catch(e){}
  setMin(guardado === '1');

  // (d) El botón de club del header ya no abre un modal (no hay), así que abre y
  //     muestra el selector que está en la página.
  document.getElementById('clubBtn').addEventListener('click', function(ev){
    ev.stopPropagation();
    setMin(false);
    hero.scrollIntoView({ behavior:'smooth', block:'start' });
    var q = document.getElementById('selQ');
    if(q) q.focus();
  }, true);

  // (e) Las pestañas en frío son de mentira: muestran qué tiene el sitio, pero no
  //     hay club que mostrar todavía, así que no llevan a ningún lado.
  document.getElementById('mainNav').addEventListener('click', function(ev){
    if(this.classList.contains('proto-dummy')){ ev.stopPropagation(); ev.preventDefault(); }
  }, true);

  // (f) Al elegir un club SIN ejercicio puntual, la página baja hasta sus datos: el
  //     selector se queda arriba (eso es lo pedido), pero el click tiene que verse.
  //     Con ejercicio elegido no corre: de eso se encarga goToFinanzasYear().
  window.PROTO_AFTER_PICK = function(){
    var secs = document.querySelectorAll('main > section');
    for(var i = 0; i < secs.length; i++){
      if(secs[i].style.display !== 'none' && secs[i].classList.contains('active')){
        secs[i].scrollIntoView({ behavior:'smooth', block:'start' });
        return;
      }
    }
  };
})();
</script>
`;
replaceOnce('\n</body>', PROTO_JS + '\n</body>', 'cierre del <body>');

// ---------------------------------------------------------------------------
// 7. LA COPIA PARCHEADA DE js/selector.js (`prototipo-inicio-selector.js`).
//
//    Este diff ES la propuesta de implementación: si Guido aprueba, esto mismo va
//    a js/selector.js (con los textos pasando por `t()`).
// ---------------------------------------------------------------------------
let selJs = fs.readFileSync(path.join(ROOT, 'js/selector.js'), 'utf8');

function parcharSelector(needle, replacement, what){
  const i = selJs.indexOf(needle);
  if(i < 0) throw new Error('ancla no encontrada en js/selector.js (' + what + '): actualizá tools/build-prototipo-inicio.js');
  if(selJs.indexOf(needle, i + 1) >= 0) throw new Error('ancla ambigua en js/selector.js (' + what + ')');
  selJs = selJs.slice(0, i) + replacement + selJs.slice(i + needle.length);
}

// (a) La fila de club le pasa a mkRow sus ejercicios y sus dos acciones, y deja de
//     pedir el "+" de comparación: lo reemplaza "Ver y elegir otro", que dice con
//     palabras lo que el "+" decía con un símbolo.
//
//     LOS EJERCICIOS SALEN DE `CLUB_INDEX[id].yrs` (data/club-index.js, Versión
//     146), el índice liviano que el sitio ya carga en cada visita: el panel dibuja
//     41 clubes sin bajar un solo data file de club, y eso no se negocia.
parcharSelector(
  '      crest: initials(nameOf(id)), name: nameOf(id), sub: sub, meta: meta,',
  '      crest: initials(nameOf(id)), name: nameOf(id), sub: sub, meta: meta,\n' +
  '      // PROTO: el dropdown "Ver" de la columna EQUIPO (ejercicio + las 2 acciones).\n' +
  '      years: realYearsOf(id), yearsClubId: id,\n' +
  '      onSee: function(y){ pick(id, y); },\n' +
  '      onSeeAndMore: function(y){ pickAndStay(id, y); },',
  'clubRow -> mkRow');
parcharSelector(
  '      addable: !!cmp && !!api.getClub(),\n',
  '      addable: false,   // PROTO: lo reemplaza el dropdown de la fila\n',
  'clubRow -> addable');

// (b) `pick` acepta un ejercicio opcional, y nace `pickAndStay`.
parcharSelector(
  '    Promise.resolve(api.pickClub(id)).then(function(){ renderButton(); renderRecents(); });\n  }',
  `    Promise.resolve(api.pickClub(id)).then(function(){
      renderButton(); renderRecents();
      // Con ejercicio elegido, derecho a la ficha de Finanzas de ESE ejercicio,
      // reusando goToFinanzasYear(), que ya existe para el click en una barra de los
      // gráficos de Inicio: un solo camino a "club + año".
      if(year && window.goToFinanzasYear) window.goToFinanzasYear(id, Number(year));
      else if(window.PROTO_AFTER_PICK) window.PROTO_AFTER_PICK();
    });
  }

  // PROTO: los ejercicios REALES de un club, del más reciente al más viejo, sacados
  // del índice liviano. Un placeholder no es una opción: es el mismo criterio con el
  // que goToFinanzasYear() se niega a navegar a uno.
  function realYearsOf(id){
    var yrs = ((window.CLUB_INDEX || {})[id] || {}).yrs || [];
    return yrs.filter(function(par){
      return par[1] !== 'placeholder' && par[1] !== 'pending_official';
    });
  }

  // PROTO: "Ver y elegir otro". La otra mitad de la respuesta a Guido ("permanecer en
  // el selector y elegir un segundo equipo, liga, etc"): el club se muestra igual que
  // con "Ver", pero el selector queda en modo comparar, así el siguiente que toques se
  // suma en vez de reemplazar.
  //
  // POR QUÉ EL PRIMERO TIENE QUE PASAR A SER EL CLUB ACTIVO: el modelo de la
  // comparación (js/comparar-clubes.js) tiene al club activo como sujeto 0 y a los
  // demás como rivales. No existe "comparación sin club activo", así que el primer
  // "Ver y elegir otro" elige, y del segundo en adelante se suma.
  function pickAndStay(id, year){
    hideCoach();
    var cmp = window.CLUB_COMPARE;
    var active = api.getClub();
    if(active && cmp && active !== id){
      cmp.toggleClub(id);
      if(!cmp.isAddMode()) document.getElementById('compareBtn').click();
      return;
    }
    pushRecent(id);
    try { localStorage.setItem(LS_CLUB, id); } catch(e){}
    Promise.resolve(api.pickClub(id)).then(function(){
      renderButton(); renderRecents();
      if(year && window.goToFinanzasYear) window.goToFinanzasYear(id, Number(year));
      document.getElementById('compareBtn').click();
      render();
    });
  }`,
  'pick -> goToFinanzasYear + pickAndStay');
parcharSelector('  function pick(id){', '  function pick(id, year){', 'firma de pick');

// (c) Con el panel adentro de la página, cerrar no existe y devolverle el foco al
//     botón del header solo sirve para que la página se vaya para arriba sola.
parcharSelector(
  "    $('clubBtn').focus();\n  }",
  "    if(!$('clubPanel').classList.contains('embedded')) $('clubBtn').focus();   // PROTO\n  }",
  'close -> focus');

// (d) mkRow dibuja UN SOLO control por fila (punto 13 de Guido): el dropdown "Ver",
//     que junta el ejercicio y las dos acciones. Con el ejercicio y los 2 botones
//     sueltos, la fila necesitaba dos renglones y se iba a 70px de alto.
parcharSelector(
  '    // El "+" de comparación. Vive en la fila del panel (clubes y ligas) y agrega ese',
  `    // PROTO: el dropdown "Ver". Un solo control con todo lo que se puede hacer con
    // ese club: verlo entero, verlo en un ejercicio puntual, o verlo sin dejar de
    // elegir. Es un <select> nativo y no un menú propio a propósito: la columna
    // scrollea (overflow-y:auto) y un menú dibujado por nosotros se cortaría contra
    // ese borde, mientras que el del sistema operativo flota por encima de todo.
    if(o.years && o.years.length){
      var act = document.createElement('select');
      act.className = 'r-act';
      var op0 = document.createElement('option');
      op0.value = '';
      op0.textContent = 'Ver';
      act.appendChild(op0);

      var gVer = document.createElement('optgroup');
      gVer.label = 'Ver';
      [['see:', 'El club entero']].concat(o.years.map(function(par){
        // Mismo label que usa el sitio adentro (ejercicioLabel, js/finanzas-calc.js):
        // "Balance 2024/2025", "Presupuesto 2026/2027", y año suelto para los clubes
        // de ejercicio calendario. No se inventa un formato nuevo para el selector.
        var lbl = window.ejercicioLabel ? window.ejercicioLabel(par[0], par[1], o.yearsClubId) : String(par[0]);
        return ['see:' + par[0], lbl];
      })).forEach(function(par){
        var op = document.createElement('option');
        op.value = par[0];
        op.textContent = par[1];
        gVer.appendChild(op);
      });
      act.appendChild(gVer);

      var gMas = document.createElement('optgroup');
      gMas.label = 'Sin dejar de elegir';
      var opMas = document.createElement('option');
      opMas.value = 'more:';
      opMas.textContent = 'Ver y elegir otro';
      gMas.appendChild(opMas);
      act.appendChild(gMas);

      act.title = 'Ver este club, un ejercicio suyo, o verlo y seguir eligiendo';
      // Los 3: sin mousedown el <button> de la fila se "arma" y en algunos navegadores
      // se queda con el click; sin click el dropdown elige el club al abrirse.
      act.addEventListener('mousedown', function(ev){ ev.stopPropagation(); });
      act.addEventListener('click', function(ev){ ev.stopPropagation(); });
      act.addEventListener('change', function(ev){
        ev.stopPropagation();
        var v = this.value;
        this.selectedIndex = 0;
        if(!v) return;
        var anio = v.slice(v.indexOf(':') + 1);
        if(v.indexOf('more:') === 0){ if(o.onSeeAndMore) o.onSeeAndMore(anio); }
        else if(o.onSee) o.onSee(anio);
      });
      b.appendChild(act);
    }

    // El "+" de comparación. Vive en la fila del panel (clubes y ligas) y agrega ese`,
  'mkRow -> dropdown Ver');

// (e) BUG REAL, y está en el sitio publicado, no solo acá (lo encontró Guido): al
//     elegir una región, la columna LIGA seguía mostrando las ligas de TODOS los
//     países, así que después de cambiar de región quedaban a la vista las ligas de la
//     región anterior. La selección sí se limpiaba (`sel.league = null`); lo que no se
//     filtraba era la LISTA. Con país elegido siempre estuvo bien. Ver to-do 29.
parcharSelector(
  "    var leagueIds = sel.country ? window.leaguesOfCountry(sel.country)\n" +
  "                                : Object.keys(window.LEAGUES).filter(function(id){ return window.LEAGUES[id].sport === sel.sport; });",
  `    var leagueIds = sel.country ? window.leaguesOfCountry(sel.country)
                                : Object.keys(window.LEAGUES).filter(function(id){
                                    var lg = window.LEAGUES[id];
                                    if(lg.sport !== sel.sport) return false;
                                    // PROTO: sin país pero CON región, solo las ligas de esa región.
                                    return !sel.region || window.regionOfCountry(lg.country) === sel.region;
                                  });`,
  'columna Liga filtrada por región');

// (f) La columna EQUIPO ya no repite "N ejercicios · Liga" abajo del nombre (punto 13
//     de Guido: la fila quedaba muy alta). Los ejercicios están adentro del dropdown
//     de la misma fila, y la liga es la columna de al lado. En los RESULTADOS DE
//     BÚSQUEDA el subtítulo se queda: ahí no hay columnas que den ese contexto.
parcharSelector(
  "    fill('selColClub', list.map(function(id){ return clubRow(id, clubSubtitle(id)); }));",
  "    fill('selColClub', list.map(function(id){ return clubRow(id, null); }));",
  'columna Equipo sin subtítulo');

// (g) La portada muestra 3 clubes de acceso rápido, no 8 (punto 7 de Guido). Con el
//     selector desplegado arriba, esa fila dejó de ser la forma principal de elegir.
parcharSelector('    quickPicks(8).forEach(function(id){', '    quickPicks(3).forEach(function(id){', 'cantidad de clubes destacados');

fs.writeFileSync(OUT_SEL, selJs);

// ---------------------------------------------------------------------------
// 8. La portada carga la copia parcheada en vez de js/selector.js.
// ---------------------------------------------------------------------------
const TAG_SELECTOR = html.match(/<script src="js\/selector\.js\?v=[^"]*"><\/script>/);
if(!TAG_SELECTOR) throw new Error('no se encontró el <script> de js/selector.js en index.html');
replaceOnce(TAG_SELECTOR[0],
  '<!-- PROTO: la copia PARCHEADA de js/selector.js (la genera\n' +
  '     tools/build-prototipo-inicio.js; el sitio sigue cargando js/selector.js). -->\n' +
  '<script src="prototipo-inicio-selector.js"></script>',
  'script de js/selector.js');

fs.writeFileSync(OUT, html);
console.log('escrito: ' + path.relative(ROOT, OUT) + ' (' + Math.round(html.length / 1024) + ' KB)');
console.log('escrito: ' + path.relative(ROOT, OUT_SEL) + ' (copia parcheada de js/selector.js)');

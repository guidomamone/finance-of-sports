#!/usr/bin/env node
/**
 * build-prototipo-inicio.js — genera `prototipo-inicio-selector.html`.
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

const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'index.html');
const OUT = path.join(ROOT, 'prototipo-inicio-selector.html');
// El prototipo son 3 archivos, no 1: la portada, la copia PARCHEADA de js/selector.js
// (el `<select>` de ejercicio por club) y la tabla de ejercicios que ese select necesita.
const OUT_SEL = path.join(ROOT, 'prototipo-inicio-selector.js');
const OUT_YEARS = path.join(ROOT, 'prototipo-inicio-ejercicios.js');

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
  '  Prototipo del Inicio en frío con el selector abierto en la portada.',
  '  GENERADO por `node tools/build-prototipo-inicio.js` a partir de index.html.',
  '  NO editar a mano: se sobrescribe. Los cambios van en el generador.',
  '  Todo lo que agrega el prototipo está marcado con PROTO en el HTML, el CSS y el JS.',
  '  Los datos, los clubes y el motor del selector son los REALES (mismos js/ y data/).',
  '  =============================================================================',
  '-->',
  '<html lang="es">'
].join('\n'), 'apertura <html>');

replaceOnce('<title data-i18n="site.title">El deporte en Números | Datos para votar informado</title>',
  '<title>PROTOTIPO · Inicio con el selector en la portada</title>', 'title');

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

  /* La portada deja de ser un card de marketing con un buscador chico y pasa a ser
     el selector en persona. El copy de antes y el de después quedan, porque son los
     que explican qué es esto y qué pasa cuando elegís. */
  .hero-sel{margin:6px 0 0;}
  .hero-sel-bar{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:9px;}
  .hs-title{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#8fa3c4;font-weight:800;}
  .hs-hint{font-size:12.5px;color:#a8b8d4;flex:1;min-width:180px;}
  .hs-toggle{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.28);color:#fff;border-radius:8px;
             padding:6px 12px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;}
  .hs-toggle:hover{background:rgba(242,183,5,.22);border-color:var(--oro);}

  /* El panel es EL MISMO nodo que el modal (js/selector.js lo sigue manejando por id):
     el prototipo lo MUDA acá adentro cuando no hay club elegido, y lo devuelve al
     <body> cuando sí. Por eso esto solo apaga el posicionamiento fijo. */
  /* Más alto que las 520px de la primera versión: con la barra de acciones, cada fila
     de club pasó de ~40px a ~70px, y a 520 entraban 4 clubes. */
  .sel-panel.embedded{position:static;transform:none;width:auto;max-height:none;height:min(620px,70vh);
                      box-shadow:0 10px 30px rgba(7,29,63,.22);display:flex !important;}
  /* Adentro de la portada no hay a dónde "cerrar": la salida es Minimizar, arriba. */
  .sel-panel.embedded .sel-close,
  .sel-panel.embedded .foot-close,
  .sel-panel.embedded .kbd{display:none;}
  .hero.min .sel-panel.embedded{display:none !important;}

  /* Minimizado: vuelve el buscador de una línea, para que el estado chico siga
     sirviendo para algo y no sea solo un título. Escribir ahí reabre el selector. */
  .hero .hero-search{display:none;}
  .hero.min .hero-search{display:flex;}
  .hero.min .hero-sel-bar{margin-bottom:0;}
  .hero.min .hero-search{margin-top:10px;}

  /* La barra de acciones de la fila de club: [ejercicio] [Ver] [Ver y elegir otro].
     Va en su propio renglón, alineada bajo el nombre. En línea con el nombre, los 3
     controles le dejaban ~110px al nombre del club y lo partían. */
  .sel-row:has(.r-acts){flex-wrap:wrap;align-items:flex-start;padding-bottom:8px;}
  .r-acts{flex-basis:calc(100% - 34px);margin:6px 0 0 34px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;}
  .r-acts .r-years{font-family:inherit;font-size:11.5px;color:var(--text);background:#fff;
                   border:1px solid var(--border);border-radius:6px;padding:4px 5px;cursor:pointer;
                   max-width:210px;flex:0 1 auto;}
  .r-acts .r-years:hover{border-color:var(--azul);}
  /* "Ver" es la acción principal de la fila y se ve como tal; "Ver y elegir otro" es
     la secundaria, con el mismo peso tipográfico pero sin relleno. */
  .r-go{font-family:inherit;font-size:11.5px;font-weight:700;border-radius:6px;cursor:pointer;
        padding:4px 10px;background:var(--azul);color:#fff;border:1px solid var(--azul);white-space:nowrap;}
  .r-go:hover{background:var(--azul-dark);border-color:var(--azul-dark);}
  .r-go.alt{background:#fff;color:var(--azul);border-color:var(--border);}
  .r-go.alt:hover{border-color:var(--azul);background:#eef2f9;}
  /* Fila seleccionada (fondo azul): los controles se dan vuelta para seguir leyéndose. */
  .sel-row.sel .r-acts .r-years{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.45);color:#fff;}
  .sel-row.sel .r-go{background:var(--oro);color:var(--azul-dark);border-color:var(--oro);}
  .sel-row.sel .r-go.alt{background:transparent;color:#fff;border-color:rgba(255,255,255,.5);}
  @media (max-width:900px){
    /* En un teléfono los 2 botones se reparten el ancho y el select va arriba solo:
       blancos de toque grandes, que es lo que falta cuando todo entra pero apretado. */
    .r-acts{margin-left:30px;}
    .r-acts .r-years{flex-basis:100%;max-width:none;padding:6px;font-size:12px;}
    .r-go{flex:1 1 0;padding:7px 8px;font-size:12px;}
  }

  /* Punto 3 de Guido: la bajada cortaba a los 600px (la regla .hero p de index.html)
     y metía un salto de línea en la mitad de una frase, con medio card vacío al lado.
     820px la deja en una sola línea en desktop sin volverse un renglón interminable. */
  .hero p{max-width:820px;}

  /* Copy de después del selector. */
  /* Con el selector en la portada, el botón de club del header sobra: repite la
     misma acción a 2 cm de distancia, y "Cambiar" cuando todavía no elegiste nada
     no significa nada. Vuelve apenas hay club, que es cuando pasa a ser la única
     forma de cambiarlo. Lo mismo con el cartelito que lo señala. */
  body.proto-cold .cb-wrap{display:none;}

  .hero-after{color:#bfcde6;font-size:13.5px;line-height:1.6;max-width:640px;margin:20px 0 0;}
  .hero-after b{color:#fff;font-weight:700;}
  .proto-hidden{display:none !important;}
</style>
`;
replaceOnce('</style>\n', '</style>\n' + PROTO_CSS, 'cierre del <style> del sitio');

// ---------------------------------------------------------------------------
// 3. La franja de prototipo, apenas abre el <body>.
// ---------------------------------------------------------------------------
// PROTO (punto 4 de Guido): los ejemplos del buscador iban en minúscula ("boca",
// "laliga", "japón") como si fueran cómo hay que escribirlos. La búsqueda ignora
// mayúsculas y acentos, así que escribirlos bien no le cuesta nada al usuario y el
// sitio deja de mostrar mal los nombres propios. Mismo arreglo pendiente en la clave
// `selector.search.ph` de data/lang/en.js ("boca", "laliga", "japan").
replaceOnce(
  'placeholder="Buscá un club, una liga o un país…  (ej. &quot;boca&quot;, &quot;laliga&quot;, &quot;japón&quot;)"',
  'placeholder="Buscá un club, una liga o un país…  (ej. &quot;Boca&quot;, &quot;LaLiga&quot;, &quot;Japón&quot;)"',
  'placeholder del buscador del panel');

replaceOnce('<body>\n', '<body>\n<div class="proto-flag">PROTOTIPO · Inicio con el selector en la portada <span>— no es el sitio publicado</span></div>\n', '<body>');

// ---------------------------------------------------------------------------
// 4. El corazón del prototipo: la portada nueva.
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
    <!-- PROTO: COPY DE ANTES. Se queda tal cual (mismas claves de i18n): dice qué es
         el sitio y de dónde salen los números, que es lo que hace falta leer ANTES
         de ponerse a elegir. -->
    <h1 data-i18n="hero.title">Los números reales de tu club</h1>
    <!-- PROTO (punto 3 de Guido): sale "y mercado de pases", que el sitio todavía no
         tiene cargado. Si esto se aprueba, el mismo cambio va en la clave hero.sub
         de data/lang/en.js, que hoy dice "and transfers". -->
    <p data-i18n="hero.sub">Ingresos, gastos y deuda, sacados del balance oficial de cada club, con la fuente de cada cifra a la vista.</p>

    <!-- PROTO: EL SELECTOR, ACÁ MISMO. Antes vivía atrás de un click en el header y
         la portada tenía un buscador propio; ahora es lo que ves. El panel no está
         duplicado: es el mismo nodo #clubPanel, mudado acá por el script de abajo. -->
    <div class="hero-sel" id="heroSel">
      <div class="hero-sel-bar">
        <span class="hs-title">Elegí tu club</span>
        <span class="hs-hint" id="hsHint">Escribí el nombre, o bajá por deporte, región, país y liga.</span>
        <button class="hs-toggle" id="hsToggle" type="button" aria-expanded="true" aria-controls="heroSelSlot">Minimizar</button>
      </div>
      <div class="hero-sel-slot" id="heroSelSlot"></div>
      <!-- Visible SOLO minimizado: el estado chico tiene que seguir siendo usable.
           Es el mismo buscador de la portada de hoy, y delega en el panel. -->
      <div class="hero-search">
        <input id="heroQ" type="text" autocomplete="off" data-i18n-placeholder="hero.search.ph" placeholder="Buscá tu club…  ej. Boca, Racing, Barcelona, Kashima">
        <button id="heroGo" data-i18n="hero.search.go">Buscar</button>
      </div>
    </div>

    <!-- PROTO: COPY DE DESPUÉS. Tres cosas, en este orden: un atajo para el que no
         quiere explorar, qué pasa cuando elegís, y cuánto hay cargado. -->
    <div class="hero-quick">
      <div class="hq-label" data-i18n="hero.quick.clubs">O empezá por uno de estos</div>
      <div class="hq-row" id="heroClubs"></div>
    </div>
    <p class="hero-after">
      Elegí uno y vas a ver sus <b>ingresos, gastos, deuda y resultados, año por año</b>,
      con el balance o el presupuesto que respalda cada cifra a un click de distancia.
      Después podés cambiar de club cuando quieras, desde el botón del header.
    </p>
    <p class="hero-foot" id="heroFoot"></p>
    <p class="hero-error" id="clubLoadError" hidden></p>
    <!-- Las ligas ya están como columna adentro del selector: acá serían una tercera
         forma de decir lo mismo. El nodo queda porque renderHero() le escribe. -->
    <div class="hero-quick proto-hidden">
      <div class="hq-label" data-i18n="hero.quick.leagues">O mirá qué hay cargado de cada liga</div>
      <div class="hq-row" id="heroLeagues"></div>
    </div>
`;
html = html.slice(0, iniHero) + HERO_NUEVO + html.slice(finHero);

// ---------------------------------------------------------------------------
// 5. El JS del prototipo, al final del <body>: mudar el panel + minimizar.
// ---------------------------------------------------------------------------
const PROTO_JS = `
<!-- ======================== PROTO: comportamiento nuevo ========================
     Dos cosas, y nada más: mudar el panel del selector adentro de la portada
     mientras no haya club elegido, y poder minimizarlo.

     NO toca js/selector.js ni el <script> principal de index.html a propósito: la
     idea es ver si el layout convence ANTES de meterle mano al motor. Si se aprueba,
     la implementación real no va a ser este script — va a ser mover el markup y que
     applyClubMode() haga la mudanza, con los textos nuevos pasando por t() como pide
     CONVENCIONES.md (acá están en castellano a mano, el prototipo no se traduce).
-->
<script>
(function(){
  var hero = document.getElementById('coldHero');
  var panel = document.getElementById('clubPanel');
  var backdrop = document.getElementById('clubBackdrop');
  var slot = document.getElementById('heroSelSlot');
  var toggle = document.getElementById('hsToggle');
  var hint = document.getElementById('hsHint');
  var LS_MIN = 'fos_proto_selector_min';

  // El panel vive en el <body> como modal. Con la portada a la vista lo mudamos
  // adentro; cuando hay club elegido vuelve, y sigue abriéndose desde el header
  // exactamente como hoy. Un solo nodo, dos lugares: duplicarlo sería tener dos
  // árboles que se pueden desincronizar.
  function sync(){
    var cold = !hero.hidden;
    document.body.classList.toggle('proto-cold', cold);
    if(cold && panel.parentNode !== slot){
      slot.appendChild(panel);
      panel.classList.add('embedded');
      backdrop.classList.remove('open');
    } else if(!cold && panel.classList.contains('embedded')){
      panel.classList.remove('embedded', 'open');
      document.body.appendChild(panel);
    }
  }
  // applyClubMode() (index.html) es quien muestra y esconde la portada. En vez de
  // parchearlo, el prototipo escucha el atributo que ya cambia.
  new MutationObserver(sync).observe(hero, { attributes:true, attributeFilter:['hidden'] });

  function setMin(min){
    hero.classList.toggle('min', min);
    toggle.textContent = min ? 'Abrir el selector' : 'Minimizar';
    toggle.setAttribute('aria-expanded', String(!min));
    hint.textContent = min
      ? 'Buscalo por nombre, o abrí el selector para explorar por liga y país.'
      : 'Escribí el nombre, o bajá por deporte, región, país y liga.';
    try { localStorage.setItem(LS_MIN, min ? '1' : '0'); } catch(e){}
  }
  toggle.addEventListener('click', function(){
    var min = !hero.classList.contains('min');
    setMin(min);
    if(!min){ var q = document.getElementById('selQ'); if(q) q.focus(); }
  });
  // Buscar desde el estado minimizado reabre el selector: el resultado de la
  // búsqueda se dibuja adentro del panel, así que esconderlo dejaría la búsqueda
  // sin lugar donde pasar nada.
  document.getElementById('heroGo').addEventListener('click', function(){ setMin(false); });
  document.getElementById('heroQ').addEventListener('keydown', function(e){ if(e.key === 'Enter') setMin(false); });

  var guardado = null;
  try { guardado = localStorage.getItem(LS_MIN); } catch(e){}
  setMin(guardado === '1');
  sync();
})();
</script>
`;
replaceOnce('\n</body>', PROTO_JS + '\n</body>', 'cierre del <body>');

// ---------------------------------------------------------------------------
// 6. LA TABLA DE EJERCICIOS POR CLUB (`prototipo-inicio-ejercicios.js`).
//
//    El `<select>` de la columna EQUIPO tiene que poder decir "Balance 2024/2025"
//    y "Presupuesto 2026/2027" SIN bajar el `data/<club>-data.js` de cada club: el
//    panel dibuja 41 clubes y hoy baja 0 archivos de datos, y romper eso para
//    poner un dropdown sería cambiar un click por 873 KB.
//
//    Hoy el índice liviano (`data/club-index.js`) trae el CONTEO de ejercicios
//    (`y`) y el último (`last`), no la lista. Así que el prototipo genera su
//    propia tabla, con la misma forma que tendría que ganar `club-index.js` si
//    esto se aprueba: por club, la lista de [año, reportType], del más reciente al
//    más viejo. Sale de los mismos `fiscalYearMeta` que lee el sitio, con el mismo
//    truco de `vm` que usa tools/generate-club-index.js (los data files están
//    escritos para el navegador, no son módulos de Node).
// ---------------------------------------------------------------------------
function cargarDatosDeClubes(){
  const sandbox = { console, window: {} };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js',
    ...fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('-data.js')).sort().map(f => 'data/' + f)];
  for(const rel of files){
    vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
  }
  return vm.runInContext('({ clubs: typeof clubs !== "undefined" ? clubs : null, generic: (window.CLUB_GENERIC_DATA || {}) })', ctx, { filename: 'read-globals' });
}

const { clubs, generic } = cargarDatosDeClubes();
const yearsPorClub = {};
let totalEjercicios = 0;
Object.keys(generic).sort().forEach(function(clubId){
  if(!clubs[clubId]) return;
  const meta = generic[clubId].fiscalYearMeta || {};
  const filas = Object.keys(meta).map(Number)
    // Un ejercicio placeholder o esperando al club no es una opción de ejercicio:
    // es el mismo criterio con el que `goToFinanzasYear()` se niega a navegar a uno.
    .filter(function(y){ const rt = meta[y].reportType; return rt !== 'placeholder' && rt !== 'pending_official'; })
    .sort(function(a, b){ return b - a; })   // el más reciente primero
    .map(function(y){ return [y, meta[y].reportType]; });
  if(!filas.length) return;
  yearsPorClub[clubId] = filas;
  totalEjercicios += filas.length;
});

fs.writeFileSync(OUT_YEARS, [
  '// GENERADO por tools/build-prototipo-inicio.js — NO editar a mano.',
  '// Los ejercicios de cada club, del más reciente al más viejo: [año, reportType].',
  '// Es lo que le falta a data/club-index.js para que el selector pueda ofrecer el',
  '// ejercicio sin bajar el data file del club. Solo lo usa el prototipo.',
  'window.PROTO_YEARS = ' + JSON.stringify(yearsPorClub, null, 0).replace(/\],"/g, '],\n  "').replace(/^\{/, '{\n  ').replace(/\}$/, '\n};'),
  ''
].join('\n'));

// ---------------------------------------------------------------------------
// 7. LA COPIA PARCHEADA DE js/selector.js (`prototipo-inicio-selector.js`).
//
//    3 cambios, y este diff ES la propuesta de implementación: si Guido aprueba,
//    esto mismo va a js/selector.js (con los textos pasando por `t()`).
// ---------------------------------------------------------------------------
let selJs = fs.readFileSync(path.join(ROOT, 'js/selector.js'), 'utf8');

function parcharSelector(needle, replacement, what){
  const i = selJs.indexOf(needle);
  if(i < 0) throw new Error('ancla no encontrada en js/selector.js (' + what + '): actualizá tools/build-prototipo-inicio.js');
  if(selJs.indexOf(needle, i + 1) >= 0) throw new Error('ancla ambigua en js/selector.js (' + what + ')');
  selJs = selJs.slice(0, i) + replacement + selJs.slice(i + needle.length);
}

// (a) La fila de club le pasa a mkRow sus ejercicios y sus dos acciones. Y deja de
//     pedir el "+" de comparación: lo reemplaza el botón "Ver y elegir otro", que
//     dice con palabras lo mismo que el "+" decía con un símbolo.
parcharSelector(
  '      crest: initials(nameOf(id)), name: nameOf(id), sub: sub, meta: meta,',
  '      crest: initials(nameOf(id)), name: nameOf(id), sub: sub, meta: meta,\n' +
  '      // PROTO: el dropdown de ejercicio y los 2 botones de la columna EQUIPO.\n' +
  '      years: (window.PROTO_YEARS || {})[id], yearsClubId: id,\n' +
  '      onSee: function(y){ pick(id, y); },\n' +
  '      onSeeAndMore: function(y){ pickAndStay(id, y); },',
  'clubRow -> mkRow');
parcharSelector(
  '      addable: !!cmp && !!api.getClub(),\n',
  '      addable: false,   // PROTO: lo reemplazan los 2 botones de la fila\n',
  'clubRow -> addable');

// (b) `pick` acepta un ejercicio opcional. Sin año se comporta igual que hoy (cae en
//     Inicio, que muestra todos los ejercicios); con año va derecho a la ficha de
//     Finanzas de ESE ejercicio, reusando `goToFinanzasYear()`, que ya existe para el
//     click en una barra de los gráficos de Inicio: un solo camino a "club + año".
parcharSelector(
  '    Promise.resolve(api.pickClub(id)).then(function(){ renderButton(); renderRecents(); });\n  }',
  `    Promise.resolve(api.pickClub(id)).then(function(){
      renderButton(); renderRecents();
      if(year && window.goToFinanzasYear) window.goToFinanzasYear(id, Number(year));
    });
  }

  // PROTO: "Ver y elegir otro". La otra mitad de la respuesta a Guido ("permanecer en
  // el selector y elegir un segundo equipo, liga, o inclusive más de un equipo"): el
  // club se muestra igual que con "Ver", pero el panel NO se cierra y queda en modo
  // comparar, así el siguiente que toques se suma en vez de reemplazar.
  //
  // POR QUÉ EL PRIMERO TIENE QUE PASAR A SER EL CLUB ACTIVO: el modelo de la
  // comparación (js/comparar-clubes.js) tiene al club activo como sujeto 0 y a los
  // demás como rivales. No hay "comparación sin club activo", así que el primer
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
      // Reabre el panel en modo comparar (el club recién elegido esconde la portada, y
      // con ella el panel embebido). openForCompare() no está exportado, pero el botón
      // Comparar del header es exactamente ese camino.
      document.getElementById('compareBtn').click();
      render();
    });
  }`,
  'pick -> goToFinanzasYear + pickAndStay');
parcharSelector('  function pick(id){', '  function pick(id, year){', 'firma de pick');

// (c) mkRow dibuja la SEGUNDA LÍNEA de la fila de club: el <select> de ejercicio y los
//     dos botones. Van en su propio renglón y no al lado del nombre porque con los 3
//     controles en línea el nombre del club se parte hasta en desktop.
parcharSelector(
  '    // El "+" de comparación. Vive en la fila del panel (clubes y ligas) y agrega ese',
  `    // PROTO: la barra de acciones de la fila de club. Tres controles, en este orden:
    // qué ejercicio, verlo, y verlo sin salir del selector.
    //
    // El <select> de ejercicio (pedido de Guido) evita entrar al club y recién ahí
    // buscar el dropdown de Finanzas. Su opción 0 NO es un año: es "el club entero",
    // que sigue siendo el camino por default.
    //
    // Los 2 botones son la otra mitad: "Ver" sale del selector, "Ver y elegir otro" se
    // queda adentro para sumar un segundo club (o una liga, con el + de su fila).
    // Reemplazan al "+" de comparación de la fila de club: un símbolo que había que
    // descubrir pasa a ser dos botones que dicen lo que hacen.
    if(o.years && o.years.length){
      var acts = document.createElement('span');
      acts.className = 'r-acts';

      var ys = document.createElement('select');
      ys.className = 'r-years';
      var op0 = document.createElement('option');
      op0.value = '';
      op0.textContent = o.years.length === 1 ? 'Todo el club' : 'Todos sus ejercicios';
      ys.appendChild(op0);
      o.years.forEach(function(par){
        var op = document.createElement('option');
        op.value = String(par[0]);
        // Mismo label que usa el sitio adentro (ejercicioLabel, js/finanzas-calc.js):
        // "Balance 2024/2025", "Presupuesto 2026/2027", y año suelto para los clubes
        // de ejercicio calendario. No se inventa un formato nuevo para el selector.
        op.textContent = window.ejercicioLabel
          ? window.ejercicioLabel(par[0], par[1], o.yearsClubId)
          : String(par[0]);
        ys.appendChild(op);
      });
      ys.title = 'Elegí un ejercicio, o dejá "todos" para ver el club entero';
      // Los 3: sin mousedown el <button> de la fila se "arma" y en algunos navegadores
      // se queda con el click; sin click el dropdown elige el club al abrirse.
      ys.addEventListener('mousedown', function(ev){ ev.stopPropagation(); });
      ys.addEventListener('click', function(ev){ ev.stopPropagation(); });
      ys.addEventListener('change', function(ev){ ev.stopPropagation(); });
      acts.appendChild(ys);

      [{ cls:'r-go', txt:'Ver', fn:o.onSee, ttl:'Ver este club y salir del selector' },
       { cls:'r-go alt', txt:'Ver y elegir otro', fn:o.onSeeAndMore, ttl:'Verlo y quedarte acá para sumar otro club o una liga' }
      ].forEach(function(def){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = def.cls;
        btn.textContent = def.txt;
        btn.title = def.ttl;
        btn.addEventListener('mousedown', function(ev){ ev.stopPropagation(); });
        btn.addEventListener('click', function(ev){
          ev.stopPropagation();
          if(def.fn) def.fn(ys.value);
        });
        acts.appendChild(btn);
      });
      b.appendChild(acts);
    }

    // El "+" de comparación. Vive en la fila del panel (clubes y ligas) y agrega ese`,
  'mkRow -> barra de acciones');

// (d) BUG REAL, y está en el sitio publicado, no solo acá (lo encontró Guido): al
//     elegir una región, la columna LIGA seguía mostrando las ligas de TODOS los
//     países, así que después de cambiar de región quedaban a la vista las ligas de la
//     región anterior. La selección sí se limpiaba (`sel.league = null`); lo que no se
//     filtraba era la LISTA. Con país elegido siempre estuvo bien.
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

// (e) La portada muestra 3 clubes de acceso rápido, no 8 (pedido de Guido). Con el
//     selector desplegado arriba, esa fila dejó de ser la forma principal de elegir.
parcharSelector('    quickPicks(8).forEach(function(id){', '    quickPicks(3).forEach(function(id){', 'cantidad de clubes destacados');

fs.writeFileSync(OUT_SEL, selJs);

// ---------------------------------------------------------------------------
// 8. La portada carga la copia parcheada en vez de js/selector.js.
// ---------------------------------------------------------------------------
const TAG_SELECTOR = html.match(/<script src="js\/selector\.js\?v=[^"]*"><\/script>/);
if(!TAG_SELECTOR) throw new Error('no se encontró el <script> de js/selector.js en index.html');
replaceOnce(TAG_SELECTOR[0],
  '<!-- PROTO: la tabla de ejercicios por club, y la copia PARCHEADA de js/selector.js\n' +
  '     (el <select> de ejercicio en la columna EQUIPO). Las dos las genera\n' +
  '     tools/build-prototipo-inicio.js; el sitio sigue cargando js/selector.js. -->\n' +
  '<script src="prototipo-inicio-ejercicios.js"></script>\n' +
  '<script src="prototipo-inicio-selector.js"></script>',
  'script de js/selector.js');

fs.writeFileSync(OUT, html);
console.log('escrito: ' + path.relative(ROOT, OUT) + ' (' + Math.round(html.length / 1024) + ' KB)');
console.log('escrito: ' + path.relative(ROOT, OUT_SEL) + ' (copia parcheada de js/selector.js)');
console.log('escrito: ' + path.relative(ROOT, OUT_YEARS) + ' (' + Object.keys(yearsPorClub).length + ' clubes, ' + totalEjercicios + ' ejercicios)');

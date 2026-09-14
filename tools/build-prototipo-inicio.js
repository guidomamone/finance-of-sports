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
  .sel-panel.embedded{position:static;transform:none;width:auto;max-height:none;height:min(520px,62vh);
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

  /* El <select> de ejercicio de la columna EQUIPO. Tiene que leerse como un control
     secundario: la acción principal de la fila sigue siendo elegir el club. Por eso
     va chico, en gris, y recién al hover toma el azul del sitio. */
  .sel-row .r-years{margin-left:auto;flex:0 0 auto;max-width:44%;font-family:inherit;font-size:11px;
                    color:var(--muted);background:#fff;border:1px solid var(--border);border-radius:6px;
                    padding:3px 4px;cursor:pointer;max-height:24px;}
  .sel-row .r-years:hover{border-color:var(--azul);color:var(--azul);}
  .sel-row.sel .r-years{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.45);color:#fff;}
  /* En una fila con dropdown, el "+" de comparar deja de empujar el layout. */
  .sel-row .r-years + .add-btn{margin-left:6px;}
  /* En móvil el dropdown al lado del nombre le come 128px de 312px y parte el nombre
     ("Argentinos Juni…", medido a 390px), así que se baja a su propio renglón,
     alineado con el nombre. Más alto por fila, pero el nombre del club entero y un
     blanco de toque más grande, que en un teléfono valen más. */
  @media (max-width:900px){
    .sel-row:has(.r-years){flex-wrap:wrap;}
    .sel-row .r-years{flex-basis:calc(100% - 34px);max-width:none;margin:5px 0 1px 34px;padding:5px 6px;font-size:12px;max-height:none;}
  }

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
    <p data-i18n="hero.sub">Ingresos, gastos, deuda y mercado de pases, sacados del balance oficial de cada club, con la fuente de cada cifra a la vista.</p>

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

// (a) La fila de club le pasa a mkRow sus ejercicios y qué hacer cuando se elige uno.
parcharSelector(
  '      crest: initials(nameOf(id)), name: nameOf(id), sub: sub, meta: meta,',
  '      crest: initials(nameOf(id)), name: nameOf(id), sub: sub, meta: meta,\n' +
  '      // PROTO: el dropdown de ejercicio de la columna EQUIPO.\n' +
  '      years: (window.PROTO_YEARS || {})[id], yearsClubId: id,\n' +
  '      onYear: function(y){ pick(id, y); },',
  'clubRow -> mkRow');

// (b) `pick` acepta un ejercicio opcional. Sin año se comporta igual que hoy (cae en
//     Inicio, que muestra todos los ejercicios); con año va derecho a la ficha de
//     Finanzas de ESE ejercicio, reusando `goToFinanzasYear()`, que ya existe para el
//     click en una barra de los gráficos de Inicio: un solo camino a "club + año".
parcharSelector(
  '    Promise.resolve(api.pickClub(id)).then(function(){ renderButton(); renderRecents(); });',
  '    Promise.resolve(api.pickClub(id)).then(function(){\n' +
  '      renderButton(); renderRecents();\n' +
  '      if(year && window.goToFinanzasYear) window.goToFinanzasYear(id, Number(year));\n' +
  '    });',
  'pick -> goToFinanzasYear');
parcharSelector('  function pick(id){', '  function pick(id, year){', 'firma de pick');

// (c) mkRow dibuja el <select>. Va ANTES del "+" de comparación, así el orden de la
//     fila es: nombre › ejercicio › comparar. El `stopPropagation` es obligatorio:
//     la fila entera es un <button>, y sin eso abrir el dropdown elegiría el club.
parcharSelector(
  '    // El "+" de comparación. Vive en la fila del panel (clubes y ligas) y agrega ese',
  `    // PROTO: el <select> de ejercicio. Pedido de Guido: poder elegir el AÑO desde la
    // misma fila, sin entrar al club primero y buscar el dropdown de Finanzas después.
    // La opción 0 no es un año: es "el club entero", que es adónde lleva clickear la
    // fila, y tiene que seguir siendo el camino por default (el 90% quiere el club,
    // no un ejercicio puntual).
    if(o.years && o.years.length){
      var ys = document.createElement('select');
      ys.className = 'r-years';
      var op0 = document.createElement('option');
      op0.value = '';
      op0.textContent = o.years.length === 1 ? 'Ver el ejercicio' : 'Ver un ejercicio';
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
      ys.title = 'Ir directo a un ejercicio de este club';
      // Los 3: sin mousedown el <button> de la fila se "arma" y en algunos navegadores
      // se queda con el click; sin click el dropdown elige el club al abrirse.
      ys.addEventListener('mousedown', function(ev){ ev.stopPropagation(); });
      ys.addEventListener('click', function(ev){ ev.stopPropagation(); });
      ys.addEventListener('change', function(ev){
        ev.stopPropagation();
        if(this.value && o.onYear) o.onYear(this.value);
      });
      b.appendChild(ys);
    }

    // El "+" de comparación. Vive en la fila del panel (clubes y ligas) y agrega ese`,
  'mkRow -> <select> de ejercicio');

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

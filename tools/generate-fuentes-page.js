#!/usr/bin/env node
// ============================================================================
// tools/generate-fuentes-page.js, genera `fuentes.html`, el listado COMPLETO
// de documentos fuente del sitio, desde los propios datos.
//
// EL PROBLEMA QUE RESUELVE (el tercer riesgo de escala del mapa de procesos):
// la pestaña Fuentes mostraba una tabla de 6 filas escrita a mano (IGJ, INDEC,
// actas de asamblea de Boca) más un párrafo de ~450 palabras que nombraba club
// por club y se había quedado en 12 clubes argentinos. Con 41 clubes de 6
// países eso ya era falso: un japonés o un español no estaba cubierto por
// ninguna de las 6 filas. Y no es un costo de tiempo sino de credibilidad: un
// sitio cuya promesa es "todo dato cita su origen" mostraba una lista de
// orígenes que no correspondía a sus datos.
//
// POR QUÉ UNA PÁGINA PROPIA Y NO LA PESTAÑA (decisión de Guido): una URL propia
// es rankeable y el crawler no depende de JS para verla, y `index.html` no
// crece una fila por documento a medida que el sitio escala a cientos de
// clubes. La pestaña Fuentes muestra el club que el visitante está mirando y
// linkea acá para el listado completo.
//
// QUÉ SE MUESTRA Y QUÉ NO (Versión 127, después de que Guido revisara la
// primera versión): una tabla de País, Equipo, Fuente y Notas. En Notas va
// `publicNote` (escrita para un lector) más las salvedades que `sourceCaveats()`
// deriva de los datos. NUNCA va `note`, que es la nota interna que una sesión le
// deja a la siguiente: en la Versión 126 se publicaba tal cual y el visitante
// terminaba leyendo rutas del disco de Guido. Ver `data/sources-view.js`.
//
// Las etiquetas de tipo y nivel tampoco viven acá: salen del mismo
// `data/sources-view.js` que usa el sitio, para que la página y las fichas de
// Finanzas no puedan decir cosas distintas del mismo documento.
//
// USO:
//   node tools/generate-fuentes-page.js           reescribe fuentes.html
//   node tools/generate-fuentes-page.js --check   no escribe; sale con código 1
//                                                 si la página quedó vieja
// ============================================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SALIDA_INDICE = path.join(ROOT, 'fuentes.html');
// Las páginas por club viven en `fuentes/`, al lado de las notas internas de sourcing, que
// están un nivel más abajo (`fuentes/<País>/<Club>.md`). No pueden colisionar: acá se escribe
// `fuentes/<clubId>.html` y esos son siempre archivos, nunca carpetas de país.
const DIR_CLUBES = path.join(ROOT, 'fuentes');
const SALIDA_SITEMAP = path.join(ROOT, 'sitemap.xml');
const BASE_URL = 'https://financeofsports.com';
const CHECK = process.argv.includes('--check');

// Mismo criterio de carga que tools/audit.js: el objeto global del contexto es
// su propio `window`, para que los data files que escriben `window.X = ...`
// creen también el global suelto que el resto del código lee sin prefijo.
function cargar() {
  const sandbox = { console };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  const files = [
    'data/clubs.js', 'data/category-map.js', 'data/currency-map.js',
    'data/sources-view.js', 'data/site-labels.js',
    ...fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('-data.js')).sort().map(f => 'data/' + f),
  ];
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
  return vm.runInContext(`({
    clubs, sources, generic: window.CLUB_GENERIC_DATA || {},
    fxMetaFor, sourceCaveats, sourceTypeLabel, sourceLevel,
  })`, ctx);
}

const PAIS = {
  AR: 'Argentina', BR: 'Brasil', CL: 'Chile', CO: 'Colombia', EC: 'Ecuador',
  ES: 'España', JP: 'Japón', MX: 'México', PE: 'Perú', UY: 'Uruguay',
};

// Cuántos caracteres de nota se muestran antes de plegar el resto en "Ver más".
const CORTE_NOTA = 150;

const fmtFx = fx => fx.toLocaleString('es-AR', {
  minimumFractionDigits: fx < 10 ? 4 : 2, maximumFractionDigits: fx < 10 ? 4 : 2,
});

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// El ejercicio se nombra como en el resto del sitio: año suelto si el club
// cierra en diciembre, rango si es temporada.
function etiquetaEjercicio(year, club) {
  return (club && club.fiscalYearStart === '01-01') ? String(year) : `${year - 1}/${year}`;
}

// Nota corta con "Ver más": se corta en el primer punto que caiga después de
// CORTE_NOTA para no partir una oración al medio, y el resto queda en un
// <details>. Sin JavaScript, así que funciona igual para un crawler.
function notaPlegable(texto) {
  if (texto.length <= CORTE_NOTA) return esc(texto);
  let corte = texto.indexOf('. ', CORTE_NOTA);
  corte = corte === -1 ? CORTE_NOTA : corte + 1;
  if (corte >= texto.length - 20) return esc(texto);
  return `${esc(texto.slice(0, corte))}
        <details><summary>Ver más</summary>${esc(texto.slice(corte).trim())}</details>`;
}
// ============================================================================
// DE UNA PÁGINA A N+1 (Versión 162, punto 2 del plan de escala).
// Hasta acá esto generaba UN `fuentes.html` con la fila de todos los documentos de
// todos los clubes: 86 KB con ~90 documentos, y crecía con cada balance nuevo.
// Ahora genera:
//   - `fuentes/<clubId>.html`, una por club, con SOLO sus documentos.
//   - `fuentes.html`, que pasa a ser el ÍNDICE: nombre de cada club, cuántos
//     documentos tiene y el link a su página. Sin contenido de fuentes adentro.
//   - `sitemap.xml`, para que un buscador llegue a las páginas nuevas sin depender
//     de que rastree el índice.
// La ganancia principal es la misma razón por la que `fuentes.html` existe (ver la
// cabecera de este archivo): una URL propia es rankeable. Hasta acá los 41 clubes
// compartían una sola, así que ninguno podía rankear por su nombre.
//
// QUÉ NO SE TOCÓ, A PROPÓSITO: el criterio de qué se muestra y qué queda interno.
// `publicNote` + `sourceCaveats()` de `data/sources-view.js`, igual que antes y
// igual que la ficha de Finanzas. `note` sigue sin aparecer en ningún lado.
// ============================================================================

const CSS = `
  :root{--azul:#0a2b5c;--oro:#f2b705;--bg:#f7f7f5;--card:#fff;--text:#1c1c1c;--muted:#6b6b6b;--border:#e3e3e0;}
  *{box-sizing:border-box;}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.5;}
  header{background:var(--azul);color:#fff;padding:12px 14px;}
  .header-inner{max-width:1600px;margin:0 auto;display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;}
  .dot{width:10px;height:10px;background:var(--oro);border-radius:50%;}
  header a{color:#fff;text-decoration:none;}
  main{max-width:1600px;margin:0 auto;padding:26px 20px 60px;}
  h1{font-size:26px;margin:0 0 8px;}
  .sub{color:var(--muted);font-size:15px;margin:0 0 8px;max-width:100ch;}
  .volver{font-size:14px;margin:16px 0 22px;}
  .tabla-wrap{background:var(--card);border:1px solid var(--border);border-radius:10px;overflow-x:auto;}
  table{width:100%;border-collapse:collapse;font-size:14px;}
  th{
    text-align:left;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);
    font-weight:600;padding:12px 14px;border-bottom:2px solid var(--border);white-space:nowrap;background:var(--card);
    position:sticky;top:0;z-index:1;
  }
  td{padding:11px 14px;border-bottom:1px solid var(--border);vertical-align:top;}
  tr.sep td{border-top:1px solid var(--border);}
  td.pais{font-weight:600;white-space:nowrap;width:1%;}
  td.equipo{font-weight:600;white-space:nowrap;width:1%;}
  td.fuente{width:44%;}
  td.notas{color:var(--muted);font-size:13.5px;}
  td.docs{white-space:nowrap;width:1%;color:var(--muted);}
  .titulo{display:block;font-weight:500;}
  .meta{display:block;color:var(--muted);font-size:12.5px;margin-top:3px;}
  .vacio{color:#a9a9a4;}
  details{margin-top:4px;}
  summary{cursor:pointer;color:var(--azul);font-weight:600;}
  a{color:var(--azul);}
  footer{max-width:1600px;margin:0 auto;padding:18px 20px 40px;color:var(--muted);font-size:13px;}
  @media (max-width:820px){
    td.fuente{width:auto;}
    th,td{padding:9px 10px;}
  }
`;

// El esqueleto que comparten el índice y las N páginas de club. `prefijo` es lo que
// hay que anteponer para salir de `fuentes/` y llegar a la raíz: '' en el índice,
// '../' en una página de club. Sin esto, una página de club pediría
// `fuentes/data/lang/langs.js`, que no existe, y se quedaría sin traducir.
function pagina({ title, desc, canonical, cuerpo, assetV, hoy, prefijo }) {
  return `<!DOCTYPE html>
<!--
  GENERADO AUTOMÁTICAMENTE por tools/generate-fuentes-page.js. NO EDITAR A MANO.
  Todo lo que se ve acá sale de sources{} y de los fiscalYearMeta de cada
  data/<club>-data.js, o sea de los mismos campos con los que el sitio renderiza
  los números. Para corregir algo de esta página, corregí el archivo del club y
  volvé a correr el generador.
-->
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${title}
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<style>${CSS}</style>
</head>
<body>
<header><div class="header-inner"><span class="dot"></span><a href="${prefijo}index.html" data-i18n="site.name">El deporte en Números</a></div></header>
<main>
${cuerpo}
</main>
<footer><span data-i18n="fuentes.page.footer">Generado desde los datos del sitio el</span> ${hoy}. <span data-i18n="fuentes.page.footer2">Para corregir algo, se corrige el archivo del club y se vuelve a generar esta página.</span></footer>
<!-- i18n (Versión 138): la página se traduce sola, con el mismo motor y el mismo
     diccionario que el sitio, y respeta el idioma que el visitante ya eligió (I18N lo
     guarda en localStorage). Se decidió esto y NO generar un fuentes-en.html aparte:
     dos archivos por idioma se multiplican por cada idioma nuevo.
     OJO: el TÍTULO de cada documento NO se traduce, sale textual de la fuente. Lo que se
     traduce es el chrome y las etiquetas de tipo/nivel, que son nuestras. -->
<script src="${prefijo}data/lang/langs.js?v=${assetV}"></script>
<script src="${prefijo}js/i18n.js?v=${assetV}"></script>
<script>window.ASSET_V = '${assetV}'; window.I18N_BASE = '${prefijo}'; I18N.init();</script>
</body>
</html>
`;
}

function construir(api) {
  const { clubs, sources, generic } = api;

  // Qué ejercicios respalda cada documento, con qué tipo de cambio se
  // convirtieron y cuál es su meta. Sale de fiscalYearMeta, o sea del mismo
  // campo con el que el motor renderiza: no hay una segunda lista que se pueda
  // desincronizar.
  const usos = {};
  for (const clubId of Object.keys(generic)) {
    const meta = generic[clubId].fiscalYearMeta || {};
    for (const year of Object.keys(meta).map(Number).sort((a, b) => a - b)) {
      const ym = meta[year];
      if (!ym.sourceId) continue;
      const f = api.fxMetaFor(ym);
      (usos[ym.sourceId] = usos[ym.sourceId] || []).push({
        year, ym, etiqueta: etiquetaEjercicio(year, clubs[clubId]),
        fx: f.fx, moneda: ym.currency, fxLabel: f.label, fxSource: f.source,
      });
    }
  }

  // Una fila por documento, ordenadas por país y después por club.
  const filas = [];
  for (const id of Object.keys(sources)) {
    const s = sources[id];
    const club = clubs[s.clubId];
    if (!club) continue;
    filas.push({ id, s, club, pais: PAIS[club.country] || club.country, u: usos[id] || [] });
  }
  filas.sort((a, b) =>
    a.pais.localeCompare(b.pais, 'es') ||
    (a.club.displayName || a.club.name).localeCompare(b.club.displayName || b.club.name, 'es') ||
    a.s.title.localeCompare(b.s.title, 'es'));

  const totalDocs = filas.length;
  const totalClubes = new Set(filas.map(f => f.s.clubId)).size;
  const totalPaises = new Set(filas.map(f => f.pais)).size;
  const conLink = filas.filter(f => f.s.url).length;

  // LA FECHA DEL PIE ES LOCAL, NO UTC (Versión 178). Acá decía
  // `new Date().toISOString().slice(0, 10)`, y `toISOString()` es SIEMPRE UTC: generar
  // estas páginas a las 20:24 de un 21 en EDT (o a las 21:24 en Argentina) escribía
  // "Generado desde los datos del sitio el 2026-09-22", un día que todavía no pasó para
  // quien la lee. Le pasaba a cualquier corrida nocturna, o sea a buena parte de las
  // sesiones de este proyecto, y el síntoma es especialmente feo acá: es la página cuyo
  // argumento entero es que sus datos son verificables.
  // NO es el mismo bug que el del `--check` (commit 411beaf, y ver `sinFecha` más abajo):
  // aquel era un falso positivo de la comparación, este es un día equivocado impreso en
  // la página. `sinFecha` ignora el pie al comparar, así que este error no se delataba
  // solo: se veía únicamente leyendo el HTML generado.
  // Se arma de los getters LOCALES en vez de `toISOString()` porque no hay forma de
  // pedirle a `toISOString()` la fecha local sin sumarle el offset a mano, que es más
  // fácil de escribir al revés que esto.
  const _d = new Date();
  const hoy = _d.getFullYear() + '-' +
    String(_d.getMonth() + 1).padStart(2, '0') + '-' +
    String(_d.getDate()).padStart(2, '0');
  // El ASSET_V sale de index.html, no se escribe a mano acá: si esta página pidiera una
  // versión distinta de js/i18n.js que el sitio, un visitante podría recibir el motor
  // viejo de su caché en una página y el nuevo en la otra. Ver la regla de ASSET_V en
  // CONVENCIONES.md.
  const mAsset = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/window\.ASSET_V\s*=\s*'([^']+)'/);
  const assetV = mAsset ? mAsset[1] : '1';

  // Las 2 celdas que describen un documento. Son las mismas en el índice viejo y en la
  // página de club: se extrajeron a una función justo para que no puedan divergir.
  function celdaFuente(f) {
    const nivel = api.sourceLevel(f.s.reliability);
    const ejercicios = f.u.map(x => x.etiqueta).join(', ');
    // La procedencia del tipo de cambio es una etiqueta NUESTRA, no texto del documento:
    // se traduce, con la misma clave `fx.source.<origen>` que usa la ficha de Finanzas.
    // OJO: estas cadenas ya traen markup (`<span data-i18n>`), así que se interpolan SIN
    // `esc()`. Lo que sí se escapa es el contenido variable de adentro (`esc(x.fxLabel)`);
    // el número y la moneda los arma este archivo.
    const fxs = [...new Set(f.u.filter(x => x.fx != null && x.moneda !== 'USD')
      .map(x => `1 USD = ${fmtFx(x.fx)} ${x.moneda} (<span data-i18n="fx.source.${x.fxSource}">${esc(x.fxLabel)}</span>)`))];
    return `<td class="fuente">
          <span class="titulo">${f.s.url
            ? `<a href="${esc(f.s.url)}" target="_blank" rel="noopener">${esc(f.s.title)}</a>`
            : esc(f.s.title)}</span>
          <span class="meta"><span data-i18n="fuentes.tipo.${f.s.type}">${esc(api.sourceTypeLabel(f.s.type))}</span> · <b style="color:${nivel.color}" data-i18n="fuentes.nivel.${f.s.reliability}">${esc(nivel.label)}</b>${
            ejercicios ? ` · <span data-i18n="${f.u.length === 1 ? 'fuentes.ejercicio' : 'fuentes.ejercicios'}">${f.u.length === 1 ? 'Ejercicio' : 'Ejercicios'}</span> ${esc(ejercicios)}` : ''}${
            f.s.url ? '' : ' · <span data-i18n="fuentes.sinurl">sin URL pública</span>'}</span>${
            fxs.length ? `\n          <span class="meta">${fxs.join(' · ')}</span>` : ''}
        </td>`;
  }

  function celdaNotas(f) {
    const notas = [];
    if (f.s.publicNote) notas.push(f.s.publicNote);
    notas.push(...api.sourceCaveats(f.s, f.u.map(x => x.ym)));
    return `<td class="notas">${notas.length ? notaPlegable(notas.join(' ')) : '<span class="vacio">Sin salvedades</span>'}</td>`;
  }

  // --- las N páginas de club ---
  const porClub = {};
  const porClubFilas = {};
  for (const f of filas) (porClubFilas[f.s.clubId] = porClubFilas[f.s.clubId] || []).push(f);

  for (const clubId of Object.keys(porClubFilas).sort()) {
    const fs_ = porClubFilas[clubId];
    const club = fs_[0].club;
    const nombre = club.displayName || club.name;
    const pais = fs_[0].pais;
    const tr = fs_.map(f => `      <tr class="sep">
        ${celdaFuente(f)}
        ${celdaNotas(f)}
      </tr>`);

    porClub[clubId] = pagina({
      prefijo: '../', assetV, hoy,
      // OJO, ESTE <title> NO SE TRADUCE, y es la única concesión del split. `<title>` no
      // admite markup adentro (un <span data-i18n> se vería literal en la pestaña), y el
      // motor de i18n no interpola valores dentro de una clave, así que no hay forma de
      // armar "Fuentes de <club>" traducible sin agregarle interpolación a js/i18n.js.
      // El nombre del club, que es lo que importa para buscar y para rankear, sale igual
      // en los dos idiomas porque es nombre propio y no se traduce nunca.
      title: `<title>${esc(nombre)} · Fuentes | El deporte en Números</title>`,
      desc: esc(`Los ${fs_.length} documentos oficiales que respaldan los números de ${nombre} en financeofsports.com: balances, presupuestos y estados contables, con su tipo de cambio y sus salvedades.`),
      canonical: `${BASE_URL}/fuentes/${clubId}.html`,
      cuerpo: `  <h1><span data-i18n="fuentes.club.title">Documentos de</span> ${esc(nombre)}</h1>
  <p class="sub">${fs_.length} <span data-i18n="fuentes.page.intro1b">documentos de</span> ${esc(nombre)} (${esc(pais)}). <span data-i18n="fuentes.club.intro">Todo número de este club en el sitio sale de uno de estos documentos.</span></p>
  <p class="volver"><a href="../fuentes.html" data-i18n="fuentes.card.others">Ver fuentes de otros equipos</a> · <a href="../index.html" data-i18n="fuentes.page.volver">Volver al sitio</a></p>

  <div class="tabla-wrap">
    <table>
      <thead><tr><th data-i18n="th.source">Fuente</th><th data-i18n="th.notes">Notas</th></tr></thead>
      <tbody>
${tr.join('\n')}
      </tbody>
    </table>
  </div>`,
    });
  }

  // --- el índice ---
  // Una fila por club, con su conteo y el link a su página. NADA del contenido de las
  // fuentes: ese es el punto del split, que esta página deje de crecer por documento.
  const idx = [];
  let paisPrev = null;
  // Se recorre `filas` (ya ordenada por país y club) y no las claves de porClubFilas,
  // para que el índice respete ese mismo orden sin tener que re-ordenar nada.
  const vistos = new Set();
  for (const f of filas) {
    if (vistos.has(f.s.clubId)) continue;
    vistos.add(f.s.clubId);
    const nombre = f.club.displayName || f.club.name;
    const n = porClubFilas[f.s.clubId].length;
    const nuevoPais = f.pais !== paisPrev;
    paisPrev = f.pais;
    idx.push(`      <tr${nuevoPais ? ' class="sep"' : ''}>
        <td class="pais">${nuevoPais ? esc(f.pais) : ''}</td>
        <td class="equipo"><a href="fuentes/${esc(f.s.clubId)}.html">${esc(nombre)}</a></td>
        <td class="docs">${n} <span data-i18n="${n === 1 ? 'fuentes.doc' : 'fuentes.docs'}">${n === 1 ? 'documento' : 'documentos'}</span></td>
      </tr>`);
  }

  const indice = pagina({
    prefijo: '', assetV, hoy,
    title: `<title data-i18n="fuentes.page.title">Fuentes | El deporte en Números</title>`,
    desc: `Todos los documentos oficiales que respaldan los números de financeofsports.com: ${totalDocs} balances, presupuestos y estados contables de ${totalClubes} clubes de ${totalPaises} países, con su tipo de cambio y sus salvedades.`,
    canonical: `${BASE_URL}/fuentes.html`,
    cuerpo: `  <h1 data-i18n="nav.fuentes">Fuentes</h1>
  <p class="sub"><span data-i18n="fuentes.page.intro1a">Todo número del sitio sale de un documento público de su club, y acá está la lista completa:</span> ${totalDocs} <span data-i18n="fuentes.page.intro1b">documentos de</span> ${totalClubes} <span data-i18n="fuentes.page.intro1c">clubes de</span> ${totalPaises} <span data-i18n="fuentes.page.intro1d">países,</span> ${conLink} <span data-i18n="fuentes.page.intro1e">de ellos con link directo al original. De cada uno se indica qué tipo de documento es, qué ejercicios respalda, con qué tipo de cambio se convirtió a dólares y qué salvedades tiene.</span></p>
  <p class="sub" data-i18n="fuentes.page.intro3">Cada club tiene su propia página con sus documentos y sus salvedades. Entrá al que te interese.</p>
  <p class="sub" data-i18n="fuentes.page.intro2">Cuando un documento no declara su propio tipo de cambio se usa la cotización oficial de su fecha de cierre, y eso se dice acá en vez de dejarlo implícito. Un presupuesto declara un tipo de cambio supuesto, que puede terminar siendo distinto del que ocurra: también se aclara.</p>
  <p class="volver"><a href="index.html" data-i18n="fuentes.page.volver">Volver al sitio</a></p>

  <div class="tabla-wrap">
    <table>
      <thead><tr><th data-i18n="th.country">País</th><th data-i18n="th.team">Equipo</th><th data-i18n="th.docs">Documentos</th></tr></thead>
      <tbody>
${idx.join('\n')}
      </tbody>
    </table>
  </div>`,
  });

  // --- sitemap ---
  // SIN `<lastmod>` a propósito: una fecha que cambia todos los días haría que `--check`
  // reporte "desactualizado" cada día aunque no cambie ningún dato, que es exactamente el
  // bug que ya tuvo el footer de esta página (commit 411beaf). Un sitemap sin lastmod es
  // válido: le dice al buscador qué URLs existen, que es lo que hace falta acá.
  const urls = ['index.html', 'fuentes.html', ...Object.keys(porClub).sort().map(id => `fuentes/${id}.html`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERADO por tools/generate-fuentes-page.js. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${BASE_URL}/${u}</loc></url>`).join('\n')}
</urlset>
`;

  return { indice, porClub, sitemap };
}

// La fecha del footer cambia todos los días: comparar sin ella, si no `--check` daría
// "desactualizado" cada día aunque no haya cambiado un dato. El `</span>` del medio es
// parte del markup del footer: sin él, el regex no matchea nunca y `--check` falla todos
// los días aunque no cambie ningún dato (bug real, commit 411beaf).
const sinFecha = s => String(s).replace(/Generado desde los datos del sitio el<\/span>\s*\d{4}-\d{2}-\d{2}/, '');

function main() {
  const api = cargar();
  const { indice, porClub, sitemap } = construir(api);

  if (!fs.existsSync(DIR_CLUBES)) fs.mkdirSync(DIR_CLUBES, { recursive: true });

  // Qué `.html` hay hoy en fuentes/ (solo el nivel de arriba: las subcarpetas son las
  // notas de sourcing por país y no se tocan nunca).
  const enDisco = fs.readdirSync(DIR_CLUBES, { withFileTypes: true })
    .filter(d => d.isFile() && d.name.endsWith('.html'))
    .map(d => d.name);
  // Una página que quedó de un club que ya no existe (o que cambió de clubId) la sigue
  // sirviendo Netlify con datos fantasma, porque se publica la raíz del repo entera.
  // Por eso se barren, no alcanza con reescribir las que corresponden.
  const huerfanas = enDisco.filter(n => !Object.prototype.hasOwnProperty.call(porClub, n.replace(/\.html$/, '')));

  const objetivos = [
    { abs: SALIDA_INDICE, rel: 'fuentes.html', nuevo: indice },
    { abs: SALIDA_SITEMAP, rel: 'sitemap.xml', nuevo: sitemap },
    ...Object.keys(porClub).sort().map(id => ({
      abs: path.join(DIR_CLUBES, `${id}.html`), rel: `fuentes/${id}.html`, nuevo: porClub[id],
    })),
  ];

  const desactualizados = objetivos.filter(o => {
    const viejo = fs.existsSync(o.abs) ? fs.readFileSync(o.abs, 'utf8') : null;
    return viejo == null || sinFecha(viejo) !== sinFecha(o.nuevo);
  });

  if (!desactualizados.length && !huerfanas.length) {
    console.log(`fuentes.html, sus ${Object.keys(porClub).length} páginas de club y sitemap.xml ya están al día.`);
    return;
  }

  if (CHECK) {
    const detalle = [
      ...desactualizados.map(o => `  ${fs.existsSync(o.abs) ? 'desactualizado' : 'falta'}: ${o.rel}`),
      ...huerfanas.map(n => `  sobra (ningún club lo reclama): fuentes/${n}`),
    ];
    console.error(`La página de fuentes quedó DESACTUALIZADA respecto de los datos:\n${detalle.join('\n')}\nCorré: node tools/generate-fuentes-page.js`);
    process.exit(1);
  }

  for (const o of desactualizados) fs.writeFileSync(o.abs, o.nuevo, 'utf8');
  for (const n of huerfanas) fs.unlinkSync(path.join(DIR_CLUBES, n));
  console.log(`Generado: fuentes.html (índice), ${Object.keys(porClub).length} páginas de club, sitemap.xml. ${Object.keys(api.sources).length} documentos en total.${huerfanas.length ? ` Borradas ${huerfanas.length} páginas huérfanas.` : ''}`);
}

main();

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
const SALIDA = path.join(ROOT, 'fuentes.html');
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
        fx: f.fx, moneda: ym.currency, fxLabel: f.label,
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

  // País y equipo se escriben una sola vez por grupo, como en una planilla.
  const tr = [];
  let paisPrev = null, clubPrev = null;
  for (const f of filas) {
    const nivel = api.sourceLevel(f.s.reliability);
    const ejercicios = f.u.map(x => x.etiqueta).join(', ');
    const fxs = [...new Set(f.u.filter(x => x.fx != null && x.moneda !== 'USD')
      .map(x => `1 USD = ${fmtFx(x.fx)} ${x.moneda} (${x.fxLabel})`))];
    const notas = [];
    if (f.s.publicNote) notas.push(f.s.publicNote);
    notas.push(...api.sourceCaveats(f.s, f.u.map(x => x.ym)));

    const nuevoPais = f.pais !== paisPrev;
    const nuevoClub = nuevoPais || f.s.clubId !== clubPrev;
    paisPrev = f.pais; clubPrev = f.s.clubId;

    tr.push(`      <tr${nuevoClub ? ' class="sep"' : ''}>
        <td class="pais">${nuevoPais ? esc(f.pais) : ''}</td>
        <td class="equipo">${nuevoClub ? esc(f.club.displayName || f.club.name) : ''}</td>
        <td class="fuente">
          <span class="titulo">${f.s.url
            ? `<a href="${esc(f.s.url)}" target="_blank" rel="noopener">${esc(f.s.title)}</a>`
            : esc(f.s.title)}</span>
          <span class="meta">${esc(api.sourceTypeLabel(f.s.type))} · <b style="color:${nivel.color}">${esc(nivel.label)}</b>${
            ejercicios ? ` · ${f.u.length === 1 ? 'Ejercicio' : 'Ejercicios'} ${esc(ejercicios)}` : ''}${
            f.s.url ? '' : ' · sin URL pública'}</span>${
            fxs.length ? `\n          <span class="meta">${esc(fxs.join(' · '))}</span>` : ''}
        </td>
        <td class="notas">${notas.length ? notaPlegable(notas.join(' ')) : '<span class="vacio">Sin salvedades</span>'}</td>
      </tr>`);
  }

  const hoy = new Date().toISOString().slice(0, 10);
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
<title>Fuentes | El deporte en Números</title>
<meta name="description" content="Todos los documentos oficiales que respaldan los números de financeofsports.com: ${totalDocs} balances, presupuestos y estados contables de ${totalClubes} clubes de ${totalPaises} países, con su tipo de cambio y sus salvedades.">
<link rel="canonical" href="https://financeofsports.com/fuentes.html">
<style>
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
</style>
</head>
<body>
<header><div class="header-inner"><span class="dot"></span><a href="index.html">El deporte en Números</a></div></header>
<main>
  <h1>Fuentes</h1>
  <p class="sub">Todo número del sitio sale de un documento público de su club, y acá está la lista completa: ${totalDocs} documentos de ${totalClubes} clubes de ${totalPaises} países, ${conLink} de ellos con link directo al original. De cada uno se indica qué tipo de documento es, qué ejercicios respalda, con qué tipo de cambio se convirtió a dólares y qué salvedades tiene.</p>
  <p class="sub">Cuando un documento no declara su propio tipo de cambio se usa la cotización oficial de su fecha de cierre, y eso se dice acá en vez de dejarlo implícito. Un presupuesto declara un tipo de cambio supuesto, que puede terminar siendo distinto del que ocurra: también se aclara.</p>
  <p class="volver"><a href="index.html">Volver al sitio</a></p>

  <div class="tabla-wrap">
    <table>
      <thead><tr><th>País</th><th>Equipo</th><th>Fuente</th><th>Notas</th></tr></thead>
      <tbody>
${tr.join('\n')}
      </tbody>
    </table>
  </div>
</main>
<footer>Generado desde los datos del sitio el ${hoy}. Para corregir algo, se corrige el archivo del club y se vuelve a generar esta página.</footer>
</body>
</html>
`;
}

function main() {
  const api = cargar();
  const nuevo = construir(api);
  const viejo = fs.existsSync(SALIDA) ? fs.readFileSync(SALIDA, 'utf8') : null;

  // La fecha del footer cambia todos los días: comparar sin ella, si no
  // `--check` daría "desactualizado" cada día aunque no haya cambiado un dato.
  const sinFecha = s => String(s).replace(/Generado desde los datos del sitio el \d{4}-\d{2}-\d{2}/, '');

  if (viejo != null && sinFecha(viejo) === sinFecha(nuevo)) {
    console.log('fuentes.html ya está al día.');
    return;
  }
  if (CHECK) {
    console.error('fuentes.html quedó DESACTUALIZADO respecto de los datos. Corré: node tools/generate-fuentes-page.js');
    process.exit(1);
  }
  fs.writeFileSync(SALIDA, nuevo, 'utf8');
  console.log(`fuentes.html generado: ${Object.keys(api.sources).length} documentos.`);
}

main();

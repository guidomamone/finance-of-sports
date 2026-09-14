#!/usr/bin/env node
// ============================================================================
// tools/generate-fuentes-page.js — genera `fuentes.html`, el listado COMPLETO
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
// Mientras tanto `sources{}` tenía 91 entradas reales con 61 URLs, y se
// consumía en UN solo lugar del sitio. Esta página las publica todas.
//
// POR QUÉ UNA PÁGINA PROPIA Y NO LA PESTAÑA (decisión de Guido): una URL propia
// es rankeable y el crawler no depende de JS para verla, y `index.html` no
// crece una fila por documento a medida que el sitio escala a cientos de
// clubes. La pestaña Fuentes muestra el club que el visitante está mirando y
// linkea acá para el listado completo.
//
// QUÉ NO HACE, A PROPÓSITO: no inventa una fuente para un club que no la tiene
// cargada, y no resume las salvedades de cada documento — las imprime tal cual
// las escribió la sesión que cargó el club, en `sources[].note`.
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
    'data/clubs.js', 'data/category-map.js', 'data/currency-map.js', 'data/site-labels.js',
    ...fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('-data.js')).sort().map(f => 'data/' + f),
  ];
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
  return vm.runInContext('({ clubs, sources, generic: window.CLUB_GENERIC_DATA || {}, fxMetaFor, FX_SOURCE })', ctx);
}

const PAIS = {
  AR: 'Argentina', BR: 'Brasil', CL: 'Chile', CO: 'Colombia', EC: 'Ecuador',
  ES: 'España', JP: 'Japón', MX: 'México', PE: 'Perú', UY: 'Uruguay',
};

const TIPO = {
  official_balance_sheet: 'Balance auditado',
  official_budget: 'Presupuesto oficial',
  official_budget_and_balance: 'Presupuesto y balance',
  unofficial_mirror: 'Balance auditado, copia no oficial',
  press_coverage_of_assembly: 'Cobertura de prensa de la asamblea',
  estimate_placeholder: 'Placeholder, no es un documento',
};

const NIVEL = {
  primary: ['Fuente primaria', '#1b7a3d'],
  secondary_mirror: ['Réplica no oficial', '#9a6b00'],
  secondary_press: ['Prensa', '#9a6b00'],
  placeholder: ['Sin fuente', '#b5372b'],
};

// Mismo formato que la ficha de Fuentes del sitio: coma decimal, y 4 decimales
// para las monedas cuyo valor por dólar es chico (EUR), 2 para el resto.
const fmtFx = fx => fx.toLocaleString('es-AR', {
  minimumFractionDigits: fx < 10 ? 4 : 2, maximumFractionDigits: fx < 10 ? 4 : 2,
});

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// El ejercicio se nombra como en el resto del sitio: año suelto si el club
// cierra en diciembre, rango si es temporada.
function etiquetaEjercicio(year, club) {
  return (club && club.fiscalYearStart === '01-01') ? String(year) : `${year - 1}/${year}`;
}

function construir(api) {
  const { clubs, sources, generic } = api;

  // Qué ejercicios respalda cada documento, y con qué tipo de cambio se
  // convirtieron. Sale de fiscalYearMeta, o sea del mismo campo que usa el
  // motor para renderizar: no hay una segunda lista que se pueda desincronizar.
  const usos = {};
  for (const clubId of Object.keys(generic)) {
    const meta = generic[clubId].fiscalYearMeta || {};
    for (const year of Object.keys(meta).map(Number).sort((a, b) => a - b)) {
      const ym = meta[year];
      if (!ym.sourceId) continue;
      const f = api.fxMetaFor(ym);
      (usos[ym.sourceId] = usos[ym.sourceId] || []).push({
        year,
        etiqueta: etiquetaEjercicio(year, clubs[clubId]),
        fx: f.fx, moneda: ym.currency, fxSource: f.source, fxLabel: f.label,
      });
    }
  }

  const porPais = {};
  for (const id of Object.keys(sources)) {
    const s = sources[id];
    const club = clubs[s.clubId];
    if (!club) continue;
    const pais = PAIS[club.country] || club.country;
    ((porPais[pais] = porPais[pais] || {})[s.clubId] = porPais[pais][s.clubId] || []).push({ id, ...s });
  }

  const partes = [];
  let totalDocs = 0, totalClubes = 0, conLink = 0;

  for (const pais of Object.keys(porPais).sort((a, b) => a.localeCompare(b, 'es'))) {
    const clubIds = Object.keys(porPais[pais]).sort((a, b) =>
      (clubs[a].displayName || clubs[a].name).localeCompare(clubs[b].displayName || clubs[b].name, 'es'));
    totalClubes += clubIds.length;
    partes.push(`<h2 id="${esc(pais.toLowerCase().replace(/[^a-z]/g, ''))}">${esc(pais)} <span class="conteo">${clubIds.length} ${clubIds.length === 1 ? 'club' : 'clubes'}</span></h2>`);

    for (const clubId of clubIds) {
      const club = clubs[clubId];
      const docs = porPais[pais][clubId].sort((a, b) => a.title.localeCompare(b.title, 'es'));
      totalDocs += docs.length;
      partes.push(`<section class="club">
  <h3>${esc(club.displayName || club.name)}<span class="legal">${esc(club.name)}</span></h3>`);

      for (const d of docs) {
        if (d.url) conLink++;
        const [nivelLabel, nivelColor] = NIVEL[d.reliability] || [d.reliability || '—', '#6b6b6b'];
        const u = usos[d.id] || [];
        // El tipo de cambio se imprime una vez por documento cuando es el mismo
        // para todos sus ejercicios, que es el caso normal.
        const fxs = [...new Set(u.filter(x => x.fx != null && x.moneda !== 'USD')
          .map(x => `1 USD = ${fmtFx(x.fx)} ${x.moneda} — ${x.fxLabel}`))];
        partes.push(`  <article class="doc">
    <p class="titulo">${d.url ? `<a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.title)}</a>` : esc(d.title)}</p>
    <p class="meta"><span class="tipo">${esc(TIPO[d.type] || d.type)}</span> · <span style="color:${nivelColor};font-weight:600;">${esc(nivelLabel)}</span>${
      u.length ? ` · ${u.length === 1 ? 'Ejercicio' : 'Ejercicios'} ${u.map(x => esc(x.etiqueta)).join(', ')}` : ''
    }${d.url ? '' : ' · <span class="sinlink">sin URL pública</span>'}</p>${
      fxs.length ? `\n    <p class="fx">Tipo de cambio: ${fxs.map(esc).join(' · ')}</p>` : ''
    }${d.note ? `\n    <p class="nota">${esc(d.note)}</p>` : ''}
  </article>`);
      }
      partes.push('</section>');
    }
  }

  const hoy = new Date().toISOString().slice(0, 10);
  return `<!DOCTYPE html>
<!--
  GENERADO AUTOMÁTICAMENTE por tools/generate-fuentes-page.js — NO EDITAR A MANO.
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
<meta name="description" content="Todos los documentos oficiales que respaldan los números de financeofsports.com: ${totalDocs} balances, presupuestos y estados contables de ${totalClubes} clubes, con su tipo de cambio y sus salvedades.">
<link rel="canonical" href="https://financeofsports.com/fuentes.html">
<style>
  :root{--azul:#0a2b5c;--oro:#f2b705;--bg:#f7f7f5;--card:#fff;--text:#1c1c1c;--muted:#6b6b6b;--border:#e3e3e0;}
  *{box-sizing:border-box;}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.55;}
  header{background:var(--azul);color:#fff;padding:12px 14px;}
  .header-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;}
  .dot{width:10px;height:10px;background:var(--oro);border-radius:50%;}
  header a{color:#fff;text-decoration:none;}
  main{max-width:900px;margin:0 auto;padding:26px 14px 60px;}
  h1{font-size:26px;margin:0 0 8px;}
  .sub{color:var(--muted);font-size:15px;margin:0 0 8px;max-width:70ch;}
  .volver{font-size:14px;margin:18px 0 0;}
  h2{font-size:19px;margin:34px 0 4px;padding-bottom:6px;border-bottom:2px solid var(--azul);}
  .conteo{font-size:13px;font-weight:400;color:var(--muted);}
  .club{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px 16px;margin:14px 0;}
  .club h3{font-size:16px;margin:0 0 4px;}
  .legal{display:block;font-size:12.5px;font-weight:400;color:var(--muted);margin-top:2px;}
  .doc{border-top:1px solid var(--border);padding:11px 0 3px;margin:8px 0 0;}
  .titulo{margin:0;font-size:14.5px;font-weight:600;}
  .meta{margin:3px 0 0;font-size:13px;color:var(--muted);}
  .tipo{color:var(--text);}
  .sinlink{font-style:italic;}
  .fx{margin:3px 0 0;font-size:13px;color:var(--muted);}
  .nota{margin:5px 0 0;font-size:13px;color:var(--muted);}
  a{color:var(--azul);}
  footer{max-width:900px;margin:0 auto;padding:0 14px 40px;color:var(--muted);font-size:13px;}
</style>
</head>
<body>
<header><div class="header-inner"><span class="dot"></span><a href="index.html">El deporte en Números</a></div></header>
<main>
  <h1>Fuentes</h1>
  <p class="sub">Todo número del sitio sale de un documento público de su club, y acá está la lista completa: ${totalDocs} documentos de ${totalClubes} clubes, ${conLink} de ellos con link directo al original. De cada uno se indica qué tipo de documento es, qué ejercicios respalda, con qué tipo de cambio se convirtió a dólares, y qué salvedades tiene.</p>
  <p class="sub">Cuando un documento no declara su propio tipo de cambio se usa la cotización oficial de la fecha de cierre, y eso se dice acá en vez de dejarlo implícito. Un presupuesto declara un tipo de cambio <em>supuesto</em>, que puede terminar siendo distinto del que termine ocurriendo: también se aclara.</p>
  <p class="volver"><a href="index.html">← Volver al sitio</a></p>
${partes.join('\n')}
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

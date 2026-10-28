#!/usr/bin/env node
// ============================================================================
// tools/generate-club-pages.js — UN LINK PROPIO POR CLUB Y POR LIGA, con título, descripción y tarjeta al compartir.
//
// POR QUÉ. `index.html` no tiene etiquetas Open Graph y su <title> es el genérico; el club y la liga se eligen con JS. WhatsApp, Telegram y
// Google leen el HTML sin ejecutar JS: todo link mostraba la misma tarjeta. El plan, con el mockup y las decisiones de Guido
// (/club/<id> y /liga/<id> con páginas ya armadas, @resvg/resvg-js para la imagen, solo castellano): Admin/mediciones/241-plan.md.
//
// QUÉ GENERA (todo se commitea, como fuentes/; Netlify no corre Node):
//   club/<clubId>.html   una por club con algún ejercicio cargado.
//   liga/<ligaId>.html   una por liga con ranking (data/rankings/).
//   og/club/<id>.png y og/liga/<id>.png   la imagen de la tarjeta (1200x630, menos de 300 KB): un SVG que arma este generador y @resvg/resvg-js
//                        lo convierte (JS puro, sin servicio; dependencia de desarrollo en tools/package.json: `cd tools && npm install`).
//                        og/_hashes.json guarda el hash del SVG de cada imagen: solo se vuelve a renderizar la que cambió, y el hash va en el
//                        og:image (?v=<hash>) para saltar el caché de WhatsApp. La tipografía es Inter (tools/fonts/, licencia OFL).
//   sitemap.xml          lo escribe SOLO este generador (antes lo escribía generate-fuentes-page.js; dos escritores se pisan).
// Cada página sale de `index.html` como plantilla (así ASSET_V y los <script> quedan al día solos) con tres cambios:
//   1. <head>: <base href="/">, <title>, description, canonical, Open Graph, Twitter y JSON-LD.
//   2. un <script> con la ruta: window.FOS_RUTA = {tab:'finanzas', club:'boca-ar'} o {tab:'liga', liga:'ar-primera'} (lo lee js/principal.js).
//   3. un bloque de texto visible sin JS (#pagina-estatica: h1 y tabla por ejercicio, en USD) que se oculta cuando la app arranca.
// Los números salen del MISMO motor que el sitio (computeYearGeneric y toDisplayValue de js/finanzas-calc.js) y de data/rankings/.
//
// USO:
//   node tools/generate-club-pages.js                reescribe todo
//   node tools/generate-club-pages.js --check        no escribe; sale con 1 si algo quedó viejo, falta, sobra, o no cumple los topes de largo
//   node tools/generate-club-pages.js --muestra       solo el 10% de los clubes (uno de cada diez, por id) y las ligas de la muestra; no barre
//                                                    huérfanas ni toca el sitemap: es para revisar a ojo antes de generar todo
// ============================================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { archivosData } = require('./data-clubes.js');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://financeofsports.com';
const SITIO = 'El deporte en Números';
const CHECK = process.argv.includes('--check');
const MUESTRA = process.argv.includes('--muestra');
const DIR_CLUB = path.join(ROOT, 'club');
const DIR_LIGA = path.join(ROOT, 'liga');
const MAX_TITULO = 60;
const MAX_DESC = 155;
const MAX_PNG = 300 * 1024; // el límite de WhatsApp
const DIR_OG = path.join(ROOT, 'og');
const crypto = require('crypto');

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = (v) => Math.abs(v).toLocaleString('es-AR', { minimumFractionDigits: Math.abs(v) < 1 ? 2 : 1, maximumFractionDigits: Math.abs(v) < 1 ? 2 : 1 });
const usd = (v) => `${v < 0 ? '−' : ''}US$ ${fmt(v)} M`;
// Recorta a `max` caracteres sin partir una palabra; el recorte lleva "…".
const recorta = (s, max) => (s.length <= max ? s : `${s.slice(0, max - 1).replace(/[\s,;:·(-]+\S*$/, '').replace(/[\s,;:·(-]+$/, '')}…`);

// ---- motor ---------------------------------------------------------------------------------------------------------------------------
function cargar() {
  const sandbox = { console };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  vm.runInContext('var FX_RATE = 1450; var currentCurrency = "USD"; var simplifyFormat = true;', ctx);
  const files = [
    'data/clubs.js', 'data/category-map.js', 'data/currency-map.js', 'data/sources-view.js', 'data/site-labels.js', 'data/leagues.js',
    'data/club-leagues.js', ...fs.readdirSync(path.join(ROOT, 'data/club-leagues')).filter((f) => f.endsWith('.js')).sort().map((f) => 'data/club-leagues/' + f),
    ...archivosData(), 'js/finanzas-calc.js',
  ];
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
  const api = vm.runInContext('({ computeYearGeneric, toDisplayValue, yearMetaFor, clubs, LEAGUES, COUNTRIES, nationOf, generic: window.CLUB_GENERIC_DATA || {} })', ctx);
  // data/rankings/<liga>.js (los escribe generate-rankings.js, que corre antes)
  const rk = { window: {} };
  for (const f of fs.readdirSync(path.join(ROOT, 'data/rankings')).filter((f) => !f.startsWith('_') && f.endsWith('.js'))) vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data/rankings', f), 'utf8'), rk);
  api.rankings = rk.window.RANKINGS || {};
  return api;
}

// ---- datos de cada club y de cada liga -----------------------------------------------------------------------------------------------
const esBudget = (rt) => rt === 'official_budget';
function datosClub(api, id) {
  const gd = api.generic[id];
  const anios = Object.keys((gd && gd.fiscalYearMeta) || {}).map(Number).sort((a, b) => b - a);
  const filas = [];
  for (const y of anios) {
    const c = api.computeYearGeneric(id, y); const meta = api.yearMetaFor(id, y);
    if (!c || !meta) continue;
    const ingresos = api.toDisplayValue(c.revenue, meta, 'USD');
    if (!ingresos) continue;
    filas.push({ anio: y, etiqueta: c.yearLabel, presupuesto: esBudget(c.meta.reportType), margen: !!(gd.fiscalYearMeta[y] && gd.fiscalYearMeta[y].baseIngreso === 'gross_margin'), ingresos, resultado: api.toDisplayValue(c.pat, meta, 'USD') });
  }
  return filas;
}
const ejercicioDe = (f) => f.etiqueta.replace(/^\S+\s/, '');

function ligaDeClub(api, id) { // la liga del último año en que el club figura en un ranking
  let mejor = null;
  for (const [liga, ys] of Object.entries(api.rankings)) for (const [y, r] of Object.entries(ys)) if (r.clubs.some((c) => c.id === id) && (!mejor || +y > mejor.y)) mejor = { liga, y: +y };
  return mejor && mejor.liga;
}

function textosClub(api, id, nombre, filas) {
  const reales = filas.filter((f) => !f.presupuesto);
  const u = reales[0] || filas[0];
  const ej = ejercicioDe(u);
  const base = u.presupuesto ? `Presupuesto ${ej}` : u.margen ? `Margen bruto ${ej}` : `Ingresos ${ej}`; // un ejercicio de margen bruto no trae ingresos: su cifra es el margen y se llama así
  const titulo = recorta(`${nombre} · ${base}: ${usd(u.ingresos)}`, MAX_TITULO);
  const cuando = u.presupuesto ? `En su presupuesto ${ej}` : `En ${ej}`;
  const queTuvo = u.margen ? `informó un margen bruto de ${usd(u.ingresos)} (sin ingresos)` : `tuvo ingresos por ${usd(u.ingresos)}`;
  const desc = recorta(`${cuando}, ${nombre} ${queTuvo} y un resultado neto de ${usd(u.resultado)}. Cada número, con su ${u.margen ? 'fuente' : 'documento fuente'}.`, MAX_DESC);
  return { titulo, desc, ultimo: u };
}

function datosLiga(api, ligaId) {
  const ys = api.rankings[ligaId];
  const anios = Object.keys(ys).map(Number).sort((a, b) => (ys[b].clubs.length - ys[a].clubs.length) || (b - a));
  const y = anios[0]; const r = ys[y];
  return { anio: y, clubs: r.clubs, tamano: r.leagueSize, total: r.clubs.reduce((s, c) => s + c.revenue, 0) };
}
function textosLiga(api, ligaId, d) {
  const L = api.LEAGUES[ligaId];
  const nombre = L.full || L.name;
  // el nombre completo si entra en el tope; si no, el corto; si tampoco, sin "en N clubes"
  const cand = [`${nombre} ${d.anio}: ${usd(d.total)} en ${d.clubs.length} clubes`, `${L.name} ${d.anio}: ${usd(d.total)} en ${d.clubs.length} clubes`, `${L.name} ${d.anio}: ${usd(d.total)}`];
  const titulo = cand.find((c) => c.length <= MAX_TITULO) || recorta(cand[2], MAX_TITULO);
  const cuantos = d.tamano ? `${d.clubs.length} de los ${d.tamano} clubes` : `${d.clubs.length} clubes`;
  const primero = d.clubs[0];
  const desc = recorta(`${nombre} ${d.anio}: ingresos de ${cuantos}, con el balance de cada uno${primero ? `. El mayor, ${(api.clubs[primero.id] || {}).displayName || primero.id}: ${usd(primero.revenue)}` : ''}.`, MAX_DESC);
  return { titulo, desc, nombre };
}

// ---- las páginas ---------------------------------------------------------------------------------------------------------------------
const CSS = `#pagina-estatica{max-width:900px;margin:24px auto;padding:0 16px;font:16px/1.5 system-ui,sans-serif}#pagina-estatica table{border-collapse:collapse;width:100%}#pagina-estatica th,#pagina-estatica td{border-bottom:1px solid #8884;padding:6px 8px;text-align:left}#pagina-estatica td.n,#pagina-estatica th.n{text-align:right}.js #pagina-estatica{display:none}`;

function pagina(plantilla, { ruta, titulo, desc, canonical, ogImagen, jsonld, cuerpo }) {
  const head = [
    '<base href="/">',
    `<title>${esc(titulo)} | ${SITIO}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="website">`, `<meta property="og:site_name" content="${SITIO}">`, `<meta property="og:locale" content="es_AR">`,
    `<meta property="og:title" content="${esc(titulo)}">`, `<meta property="og:description" content="${esc(desc)}">`, `<meta property="og:url" content="${canonical}">`,
    ...(ogImagen ? [`<meta property="og:image" content="${ogImagen}">`, `<meta property="og:image:width" content="1200">`, `<meta property="og:image:height" content="630">`, `<meta name="twitter:image" content="${ogImagen}">`] : []),
    `<meta name="twitter:card" content="${ogImagen ? 'summary_large_image' : 'summary'}">`, `<meta name="twitter:title" content="${esc(titulo)}">`, `<meta name="twitter:description" content="${esc(desc)}">`,
    `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>`,
    `<style>${CSS}</style>`,
    `<script>window.FOS_RUTA = ${JSON.stringify(ruta)}; document.documentElement.classList.add('js');</script>`,
  ].join('\n');
  let h = plantilla;
  const antes = h;
  h = h.replace(/<title[^>]*>[\s\S]*?<\/title>\n?/, '');
  // Después del <meta viewport>: el charset tiene que quedar dentro de los primeros 1024 bytes, y <base> antes de cualquier ruta relativa.
  h = h.replace(/(<meta name="viewport"[^>]*>\n?)/, `$1<!-- GENERADO por tools/generate-club-pages.js: no editar a mano (to-do 241). -->\n${head}\n`);
  h = h.replace(/<body>\s*<body>/, '<body>'); // la plantilla trae <body> doble; el generador deja uno
  h = h.replace('<body>', `<body>\n<main id="pagina-estatica">\n${cuerpo}\n</main>`);
  if (h === antes || !h.includes('id="pagina-estatica"') || !h.includes('<base href="/">')) throw new Error('la plantilla index.html cambió: el generador no encuentra dónde meter el <head> o el <body>');
  return h;
}

function construir(api, plantilla) {
  const out = { club: {}, liga: {}, urls: [] };
  const ids = Object.keys(api.clubs).sort();
  const datos = {};
  for (const id of ids) { const f = datosClub(api, id); if (f.length) datos[id] = f; }
  let conPagina = Object.keys(datos);
  let ligas = Object.keys(api.rankings).filter((l) => api.LEAGUES[l] && api.rankings[l] && Object.keys(api.rankings[l]).length).sort();
  const todosClubs = conPagina; // el sitemap y los links de ligas hablan de todos, aunque la muestra escriba menos
  if (MUESTRA) {
    conPagina = conPagina.filter((_, i) => i % 10 === 0);
    ligas = [...new Set(conPagina.map((id) => ligaDeClub(api, id)).filter(Boolean))].sort();
  }
  const clubUrl = (id) => `${BASE_URL}/club/${id}`;
  for (const id of conPagina) {
    const club = api.clubs[id]; const nombre = club.displayName || club.name;
    const filas = datos[id]; const t = textosClub(api, id, nombre, filas);
    const liga = ligaDeClub(api, id); const L = liga && api.LEAGUES[liga];
    const pais = (api.COUNTRIES[api.nationOf(id)] || {}).name || club.country;
    const conMargen = filas.some((f) => f.margen); // solo un club con un ejercicio de margen bruto suma la columna; en ese ejercicio Ingresos queda en «—»
    const tr = filas.map((f) => `<tr><td>${esc(f.etiqueta)}</td><td class="n">${f.margen ? '—' : fmt(f.ingresos)}</td>${conMargen ? `<td class="n">${f.margen ? fmt(f.ingresos) : '—'}</td>` : ''}<td class="n">${f.resultado < 0 ? '−' : ''}${fmt(f.resultado)}</td></tr>`).join('\n');
    const antes = [...new Set((club.names || []).map((x) => x.name).filter((x) => x !== nombre))]; // los nombres que el club tuvo y ya no usa (data/clubs.js, `names`)
    const cuerpo = `<h1>${esc(nombre)}: ingresos y resultado por ejercicio</h1>
<p>${esc(nombre)} (${esc(pais)}${L ? `, ${esc(L.full || L.name)}` : ''}). ${esc(t.desc)}${antes.length ? ` También conocido como ${esc(antes.join(', '))}.` : ''}</p>
<table><thead><tr><th>Ejercicio</th><th class="n">Ingresos (US$ M)</th>${conMargen ? '<th class="n">Margen bruto (US$ M)</th>' : ''}<th class="n">Resultado neto (US$ M)</th></tr></thead><tbody>
${tr}
</tbody></table>
<p>Cifras en millones de dólares con el tipo de cambio de cierre de cada documento. <a href="/fuentes/${esc(id)}.html">Documentos fuente de ${esc(nombre)}</a>${liga ? ` · <a href="/liga/${esc(liga)}">${esc(L.full || L.name)}</a>` : ''}</p>`;
    out.club[id] = pagina(plantilla, {
      ruta: { tab: 'finanzas', club: id }, titulo: t.titulo, desc: t.desc, canonical: clubUrl(id), ogImagen: ogDe('club', id, svgClub(nombre, t.ultimo, filas)),
      jsonld: { '@context': 'https://schema.org', '@type': 'SportsTeam', name: nombre, ...(antes.length ? { alternateName: antes } : {}), sport: 'Soccer', url: clubUrl(id), ...(pais ? { location: { '@type': 'Country', name: pais } } : {}), ...(L ? { memberOf: { '@type': 'SportsOrganization', name: L.full || L.name } } : {}) },
      cuerpo,
    });
  }
  for (const ligaId of ligas) {
    const d = datosLiga(api, ligaId); const t = textosLiga(api, ligaId, d);
    const L = api.LEAGUES[ligaId];
    const pais = (api.COUNTRIES[L.country] || {}).name || L.country;
    const tr = d.clubs.map((c, i) => { const cl = api.clubs[c.id] || {}; const n = cl.displayName || cl.name || c.id; return `<tr><td>${i + 1}</td><td><a href="/club/${esc(c.id)}">${esc(n)}</a></td><td class="n">${fmt(c.revenue)}</td></tr>`; }).join('\n');
    const cuerpo = `<h1>${esc(t.nombre)} ${d.anio}: ingresos de los clubes cargados</h1>
<p>${esc(t.desc)}</p>
<table><thead><tr><th>#</th><th>Club</th><th class="n">Ingresos (US$ M)</th></tr></thead><tbody>
${tr}
</tbody></table>
<p>Solo figuran los clubes cuyo balance está cargado en el sitio${d.tamano ? `; la liga tiene ${d.tamano}` : ''}. País: ${esc(pais)}.</p>`;
    out.liga[ligaId] = pagina(plantilla, {
      ruta: { tab: 'liga', liga: ligaId }, titulo: t.titulo, desc: t.desc, canonical: `${BASE_URL}/liga/${ligaId}`, ogImagen: ogDe('liga', ligaId, svgLiga(t.nombre, d, api)),
      jsonld: { '@context': 'https://schema.org', '@type': 'SportsOrganization', name: t.nombre, sport: 'Soccer', url: `${BASE_URL}/liga/${ligaId}`, location: { '@type': 'Country', name: pais } },
      cuerpo,
    });
  }
  // sitemap: lo que ya publicaba generate-fuentes-page.js + las páginas de club y de liga. Sin <lastmod> (una fecha que cambia a diario
  // rompería --check, ver el comentario de generate-fuentes-page.js).
  const fuentes = fs.existsSync(path.join(ROOT, 'fuentes')) ? fs.readdirSync(path.join(ROOT, 'fuentes')).filter((f) => f.endsWith('.html')).sort() : [];
  const todasLigas = Object.keys(api.rankings).filter((l) => api.LEAGUES[l]).sort();
  out.urls = ['index.html', 'fuentes.html', 'metodologia.html', 'correcciones.html', 'ultimas-cargas.html', ...fuentes.map((f) => `fuentes/${f}`), ...todosClubs.map((id) => `club/${id}`), ...todasLigas.map((l) => `liga/${l}`)];
  out.sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERADO por tools/generate-club-pages.js. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${out.urls.map((u) => `  <url><loc>${BASE_URL}/${u}</loc></url>`).join('\n')}
</urlset>
`;
  return out;
}

// ---- la imagen de la tarjeta ---------------------------------------------------------------------------------------------------------
const OGS = new Map(); // 'club/<id>' -> { svg, hash }
function ogDe(tipo, id, svg) {
  const hash = crypto.createHash('sha1').update(svg).digest('hex').slice(0, 10);
  OGS.set(`${tipo}/${id}`, { svg, hash });
  return `${BASE_URL}/og/${tipo}/${id}.png?v=${hash}`;
}
const AZUL = '#0a2b5c', ORO = '#f2b705', CLARO = '#b9c8e6';
const ancho = (txt, px) => txt.length * px * 0.58; // Inter Bold, aproximado
// El título en una o dos líneas, con el cuerpo más grande que entre en 1040 px.
function lineasTitulo(txt) {
  if (ancho(txt, 72) <= 1040) return { px: 72, ls: [txt] };
  let mejor = null;
  const p = txt.split(' ');
  for (let i = 1; i < p.length; i++) { const a = p.slice(0, i).join(' '), b = p.slice(i).join(' '); const w = Math.max(a.length, b.length); if (!mejor || w < mejor.w) mejor = { w, ls: [a, b] }; }
  if (!mejor) return { px: Math.max(30, Math.floor(1040 / (txt.length * 0.58))), ls: [txt] };
  return { px: Math.min(64, Math.max(30, Math.floor(1040 / (mejor.w * 0.58)))), ls: mejor.ls };
}
function marco(titulo, subtitulo, grande, derecha) {
  const { px, ls } = lineasTitulo(titulo);
  const tit = ls.map((l, i) => `<text x="80" y="${170 + i * (px + 8)}" font-size="${px}" font-weight="700" fill="#fff">${esc(l)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Inter">
<rect width="1200" height="630" fill="${AZUL}"/>
<rect x="0" y="0" width="14" height="630" fill="${ORO}"/>
<text x="80" y="82" font-size="28" fill="${CLARO}">${SITIO}</text>
${tit}
<text x="80" y="420" font-size="34" fill="${CLARO}">${esc(subtitulo)}</text>
<text x="80" y="520" font-size="${Math.min(108, Math.floor(540 / (grande.length * 0.58)))}" font-weight="700" fill="${ORO}">${esc(grande)}</text>
<text x="80" y="590" font-size="26" fill="${CLARO}">financeofsports.com</text>
${derecha}
</svg>`;
}
function svgClub(nombre, u, filas) {
  const ult = filas.filter((f) => f.margen === u.margen).slice(0, 6).reverse(); // cronológico; no se mezclan barras de margen con barras de ingresos
  const max = Math.max(...ult.map((f) => Math.max(f.ingresos, 0)), 1e-9);
  const bw = 84, gap = 22, x0 = 1140 - (ult.length * bw + (ult.length - 1) * gap);
  const barras = ult.map((f, i) => {
    const h = Math.max(4, Math.round((Math.max(f.ingresos, 0) / max) * 200)); const x = x0 + i * (bw + gap); const y = 520 - h;
    const rect = f.presupuesto ? `<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="none" stroke="${ORO}" stroke-width="3" stroke-dasharray="8 6"/>` : `<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="${ORO}"/>`;
    return `${rect}<text x="${x + bw / 2}" y="552" font-size="20" text-anchor="middle" fill="${CLARO}">${ejercicioDe(f).slice(-4)}</text>`;
  }).join('');
  return marco(nombre, `${u.presupuesto ? 'Presupuesto' : u.margen ? 'Margen bruto' : 'Ingresos'} ${ejercicioDe(u)}`, usd(u.ingresos), barras);
}
function svgLiga(nombre, d, api) {
  const top = d.clubs.slice(0, 6); const max = Math.max(...top.map((c) => c.revenue), 1e-9);
  const filas = top.map((c, i) => {
    const cl = api.clubs[c.id] || {}; const n = recorta(cl.displayName || cl.name || c.id, 15); const y = 300 + i * 48; const w = Math.max(6, Math.round((c.revenue / max) * 260));
    return `<text x="700" y="${y + 24}" font-size="22" fill="#fff">${esc(n)}</text><rect x="880" y="${y}" width="${w}" height="30" fill="${ORO}"/>`;
  }).join('');
  const cuantos = d.tamano ? `${d.clubs.length} de ${d.tamano} clubes` : `${d.clubs.length} clubes`;
  return marco(`${nombre} ${d.anio}`, `Ingresos de ${cuantos}`, usd(d.total), filas);
}

function main() {
  const api = cargar();
  const plantilla = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const out = construir(api, plantilla);
  const objetivos = [
    ...Object.entries(out.club).map(([id, nuevo]) => ({ abs: path.join(DIR_CLUB, `${id}.html`), rel: `club/${id}.html`, nuevo })),
    ...Object.entries(out.liga).map(([id, nuevo]) => ({ abs: path.join(DIR_LIGA, `${id}.html`), rel: `liga/${id}.html`, nuevo })),
    ...(MUESTRA ? [] : [{ abs: path.join(ROOT, 'sitemap.xml'), rel: 'sitemap.xml', nuevo: out.sitemap }]),
  ];
  const huerfanas = [];
  if (!MUESTRA) for (const [dir, tipo] of [[DIR_CLUB, 'club'], [DIR_LIGA, 'liga']]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.html'))) if (!out[tipo][f.replace(/\.html$/, '')]) huerfanas.push(`${tipo}/${f}`);
  }
  // imágenes: og/_hashes.json (hash del SVG de cada una) y los PNG
  const hashes = Object.fromEntries([...OGS].sort(([a], [b]) => (a < b ? -1 : 1)).map(([k, v]) => [k, v.hash]));
  const rutaHashes = path.join(DIR_OG, '_hashes.json');
  const hashesViejos = fs.existsSync(rutaHashes) ? JSON.parse(fs.readFileSync(rutaHashes, 'utf8')) : {};
  const sinImagen = [...OGS.keys()].filter((k) => !fs.existsSync(path.join(DIR_OG, `${k}.png`)) || hashesViejos[k] !== hashes[k]);
  const huerfanasOg = [];
  if (!MUESTRA) for (const tipo of ['club', 'liga']) { const d = path.join(DIR_OG, tipo); if (fs.existsSync(d)) for (const f of fs.readdirSync(d).filter((n) => n.endsWith('.png'))) if (!OGS.has(`${tipo}/${f.replace(/\.png$/, '')}`)) huerfanasOg.push(`og/${tipo}/${f}`); }
  const viejos = objetivos.filter((o) => !fs.existsSync(o.abs) || fs.readFileSync(o.abs, 'utf8') !== o.nuevo);
  // topes de largo (el plan: título ≤ 60 y descripción ≤ 155) y metadatos obligatorios
  const mal = [];
  for (const o of objetivos.filter((o) => o.rel.endsWith('.html'))) {
    const t = (o.nuevo.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || ''; const d = (o.nuevo.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    const dec = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    if (!t || dec(t).length > MAX_TITULO) mal.push(`${o.rel}: título de ${dec(t).length} caracteres (tope ${MAX_TITULO})`);
    if (!d || dec(d).length > MAX_DESC) mal.push(`${o.rel}: descripción de ${dec(d).length} caracteres (tope ${MAX_DESC})`);
    if (!/<meta property="og:image" content="https:\/\/financeofsports\.com\/og\/(club|liga)\/[^"?]+\.png\?v=[0-9a-f]{10}">/.test(o.nuevo)) mal.push(`${o.rel}: sin og:image`);
    if (!/<link rel="canonical" href="https:\/\/financeofsports\.com\/(club|liga)\/[^"]+">/.test(o.nuevo)) mal.push(`${o.rel}: sin canonical`);
  }
  if (CHECK) {
    for (const k of OGS.keys()) { const f = path.join(DIR_OG, `${k}.png`); if (fs.existsSync(f) && fs.statSync(f).size > MAX_PNG) mal.push(`og/${k}.png: pesa ${Math.round(fs.statSync(f).size / 1024)} KB (tope ${MAX_PNG / 1024})`); }
    if (sinImagen.length) mal.push(`${sinImagen.length} imágenes de og/ viejas o faltantes (${sinImagen.slice(0, 3).join(', ')}${sinImagen.length > 3 ? '…' : ''})`);
    if (huerfanasOg.length) mal.push(`${huerfanasOg.length} imágenes de og/ que ningún club ni liga reclama`);
    if (viejos.length || huerfanas.length || mal.length) {
      console.error(`Las páginas de club y liga quedaron DESACTUALIZADAS o fuera de tope:\n${[...viejos.map((o) => `  ${fs.existsSync(o.abs) ? 'desactualizado' : 'falta'}: ${o.rel}`), ...huerfanas.map((n) => `  sobra (ningún club ni liga la reclama): ${n}`), ...mal.map((m) => `  ${m}`)].join('\n')}\nCorré: node tools/generate-club-pages.js`);
      process.exit(1);
    }
    console.log(`club/ (${Object.keys(out.club).length}), liga/ (${Object.keys(out.liga).length}) y sitemap.xml al día.`);
    return;
  }
  if (mal.length) { console.error(`No se escribe: ${mal.join('; ')}`); process.exit(1); }
  for (const dir of [DIR_CLUB, DIR_LIGA, path.join(DIR_OG, 'club'), path.join(DIR_OG, 'liga')]) fs.mkdirSync(dir, { recursive: true });
  let renderizadas = 0;
  if (sinImagen.length) {
    let Resvg; try { ({ Resvg } = require('@resvg/resvg-js')); } catch { console.error(`Hay ${sinImagen.length} imágenes de og/ para renderizar y falta @resvg/resvg-js: corré  cd tools && npm install  (una vez por carpeta; un worktree lo enlaza de la principal)`); process.exit(1); }
    const fontFiles = ['Inter_400Regular.ttf', 'Inter_700Bold.ttf'].map((f) => path.join(__dirname, 'fonts', f));
    for (const k of sinImagen) {
      const png = new Resvg(OGS.get(k).svg, { font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' }, fitTo: { mode: 'width', value: 1200 } }).render().asPng();
      if (png.length > MAX_PNG) { console.error(`og/${k}.png pesa ${Math.round(png.length / 1024)} KB: no entra en WhatsApp (tope ${MAX_PNG / 1024} KB)`); process.exit(1); }
      fs.writeFileSync(path.join(DIR_OG, `${k}.png`), png); renderizadas++;
    }
  }
  for (const n of huerfanasOg) fs.unlinkSync(path.join(ROOT, n));
  fs.writeFileSync(rutaHashes, JSON.stringify(MUESTRA ? { ...hashesViejos, ...hashes } : hashes, null, 1) + '\n');
  for (const o of viejos) fs.writeFileSync(o.abs, o.nuevo, 'utf8');
  for (const n of huerfanas) fs.unlinkSync(path.join(ROOT, n));
  console.log(`Generado: ${Object.keys(out.club).length} páginas de club, ${Object.keys(out.liga).length} de liga${MUESTRA ? ' (muestra del 10%)' : ' y sitemap.xml'}. ${viejos.length} escritas, ${renderizadas} imágenes${huerfanas.length ? `, ${huerfanas.length} huérfanas borradas` : ''}.`);
}

main();

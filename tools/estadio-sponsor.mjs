#!/usr/bin/env node
// ============================================================================
// tools/estadio-sponsor.mjs — ESTADIO Y SPONSOR DE CADA EJERCICIO CARGADO (to-do 273).
//
// QUÉ. Para cada ejercicio cargado del sitio (data/club-index.js), su liga (data/club-leagues/) y la página de temporada de Wikipedia que
// ya usa la lista de equipos (tools/club-league-reference/<iso>.json): de esa página, la fila del club en la tabla de estadios ("Stadiums
// and locations": estadio y capacidad) y en la de kits ("Personnel and kits": marca técnica y sponsor de camiseta del frente). Campos que
// decidió Guido (2026-10-18): estadio, capacidad, sponsor del frente, marca técnica; sin monto. La fuente es la revisión exacta de la página
// (permalink con oldid), no el título: la página cambia.
//
// TRAMPA. Muchas tablas de kits son "solo la actual" (comentario <!--ONLY CURRENT-->): en una temporada vieja pueden traer el sponsor de
// hoy. Se marca `kitsSoloActual` y se cuenta aparte.
//
// USO:
//   node tools/estadio-sponsor.mjs --ensayo            mide la cobertura (no escribe nada)
//   node tools/estadio-sponsor.mjs --ensayo --detalle  además, una línea por ejercicio
//   node tools/estadio-sponsor.mjs --escribir          escribe data/contexto/<iso>.js; lo ya guardado no se vuelve a bajar (--refrescar sí)
//   node tools/estadio-sponsor.mjs --escribir --club <id> [--anio <año>]
//                                                      COMPUERTA del pipeline: guarda ese club y sale con 1 si a un ejercicio le falta
//                                                      estadio o sponsor (se completa en tools/contexto-manual.json, con fuente);
//                                                      para un año que todavía no está cargado: --liga <ligaId> --cierre <MM-DD>
//   node tools/estadio-sponsor.mjs --ensayo --todas    llena la caché por liga-año con TODAS las ligas de las listas (para el índice
//                                                      de sponsors: tools/generate-sponsors.js)
//   node tools/estadio-sponsor.mjs --ensayo --actuales la temporada en curso de cada liga (los sponsors de hoy), a la misma caché
//   ... --liga <ligaId>                                  solo esa liga (para probar)
// ============================================================================
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const { cierreDelClub } = createRequire(import.meta.url)('./cierre-ejercicio.js');

// mismo emparejamiento de nombres que tools/listas-lote.mjs
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['fc', 'cf', 'sc', 'ac', 'afc', 'cd', 'ca', 'club', 'de', 'del', 'the', 'and', 'sad', 'cp', 'fk', 'sk', 'nk', 'sv', 'vfl', 'vfb', 'tsg', 'rcd', 'ud', 'sd', 'rc']);
const corto = (s) => norm(s).split(' ').filter((w) => !STOP.has(w)).join(' ');
const pega = (a, b) => { const x = corto(a), y = corto(b); if (!x || !y) return false; if (x === y) return true; const [c, l] = x.length < y.length ? [x, y] : [y, x]; return l.startsWith(c + ' ') || l.includes(' ' + c + ' ') || l.endsWith(' ' + c); };

function cargar() {
  const ci = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-index.js'), 'utf8'), ci);
  const cl = { window: {} }; for (const f of readdirSync(resolve(ROOT, 'data', 'club-leagues'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-leagues', f), 'utf8'), cl);
  const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
  const cache = {}; for (const f of readdirSync(REF).filter((f) => /^[a-z]{2}\.json$/.test(f))) cache[f.slice(0, 2)] = JSON.parse(readFileSync(resolve(REF, f), 'utf8'));
  const alias = JSON.parse(readFileSync(resolve(REF, 'alias.json'), 'utf8'));
  return { CI: ci.window.CLUB_INDEX, CL: cl.window.CLUB_LEAGUE_BY_YEAR, CLUBS: vm.runInContext('clubs', ctx), cache, alias };
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
async function pagina(title, lang) {
  for (let i = 0; i < 4; i++) {
    await dormir(1500 * (i ? 4 * i : 1));
    try {
      const r = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|revid&format=json&redirects=1`, { headers: { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' } });
      const j = JSON.parse(await r.text()); if (j.error) return null;
      return { wikitext: j.parse.wikitext['*'], revid: j.parse.revid, titulo: j.parse.title };
    } catch { /* corte por exceso: reintenta */ }
  }
  return null;
}

// ---- tablas wikitable a grilla, con rowspan ----
const sinRefs = (s) => s.replace(/<ref[^>]*\/>/g, '').replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '').replace(/<!--[\s\S]*?-->/g, '');
function celdasDeLinea(l, marca) { // "| a || b" o "! a !! b"
  return l.replace(/^\s*[|!]/, '').split(marca === '!' ? /!!|\|\|/ : /\|\|/);
}
function atributos(c) { // "rowspan=2 style=... | texto" -> { rowspan, texto }
  const m = c.match(/^\s*((?:\s*(?:rowspan|colspan|style|align|class|scope|data-sort-value|bgcolor|width)\s*=\s*(?:"[^"]*"|[^\s|]*))+)\s*\|(?!\|)([\s\S]*)$/i);
  if (!m || /\[\[|\{\{/.test(m[1])) return { rowspan: 1, colspan: 1, texto: c };
  return { rowspan: Number((m[1].match(/rowspan\s*=\s*"?(\d+)/i) || [])[1] || 1), colspan: Number((m[1].match(/colspan\s*=\s*"?(\d+)/i) || [])[1] || 1), texto: m[2] };
}
function tablas(wikitext) {
  const out = []; let from = 0;
  while (true) {
    const ini = wikitext.indexOf('{|', from); if (ini === -1) break;
    const fin = wikitext.indexOf('\n|}', ini); if (fin === -1) break;
    out.push({ texto: wikitext.slice(ini, fin), antes: wikitext.slice(Math.max(0, ini - 300), ini) }); from = fin + 3;
  }
  return out.map(({ texto, antes }) => {
    // el primer trozo también cuenta: muchas tablas ponen el encabezado pegado a "{|", sin "|-" antes ("2022–23 Serie A", kits)
    const filas = texto.split(/\n\|-[^\n]*/);
    let encabezado = null; const grilla = []; const pendiente = {}; // columna -> { texto, quedan }
    for (const f of filas) {
      const lineas = f.split('\n').filter((l) => /^\s*[|!]/.test(l) && !/^\s*\|[}+]/.test(l));
      const celdas = lineas.flatMap((l) => celdasDeLinea(l, l.trim()[0]).map((c) => ({ c, h: l.trim()[0] === '!' })));
      if (!celdas.length) continue;
      // encabezado: la primera fila de "!", con colspan repetido ("Shirt sponsor(s)" sobre "Main | Other": el índice de "Main"); una
      // segunda fila de "!" antes de los datos se saltea
      if (celdas.every((x) => x.h) && !grilla.length) {
        if (!encabezado) encabezado = celdas.flatMap((x) => { const a = atributos(x.c); return Array(a.colspan).fill(cleanTexto(a.texto)); });
        continue;
      }
      const fila = []; let k = 0;
      const ocupar = () => { while (pendiente[fila.length]) { const p = pendiente[fila.length]; fila.push(p.texto); if (--p.quedan === 0) delete pendiente[fila.length - 1]; } };
      for (const x of celdas) {
        ocupar(); const a = atributos(x.c);
        for (let j = 0; j < a.colspan; j++) { if (a.rowspan > 1) pendiente[fila.length] = { texto: a.texto, quedan: a.rowspan - 1 }; fila.push(a.texto); }
        k++;
      }
      ocupar(); grilla.push(fila);
    }
    return { encabezado: encabezado || [], grilla, soloActual: /ONLY CURRENT|current season only/i.test(antes + texto.slice(0, 400)) };
  });
}
function cleanTexto(c) {
  // un <br> separa dos nombres ("Palácio<br>do Gelo"): espacio, no nada; un enlace externo "[https://... Efapel]" vale su texto
  let s = sinRefs(String(c || '')).replace(/<br\s*\/?>/gi, ' ').replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]/g, '$1').replace(/^\s*\|/, '');
  s = s.replace(/\{\{\s*sort\s*\|[^|}]*\|([^}]*)\}\}/gi, '$1');
  // {{nowrap|Almería}} envuelve el nombre entero (kits de LaLiga): se desenvuelve; {{flagicon|...}} y {{ref|...}} se van abajo
  for (let k = 0; k < 3; k++) s = s.replace(/\{\{\s*(?:nowrap|nobreak|center|small|nobr|nowrap begin)\s*\|((?:[^{}]|\{\{[^{}]*\}\}|\[\[[^\]]*\]\])*)\}\}/gi, '$1');
  s = s.replace(/\{\{\s*(?:flagicon|flag icon|flagdeco|ref|efn|refn|#invoke:flag)[^{}]*\}\}/gi, '');
  const m = s.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
  if (m && !/^(File|Image|Archivo):/i.test(m[1])) return (m[2] || m[1]).replace(/&nbsp;/g, ' ').replace(/^[\s/,;|–-]+|[\s/,;|–-]+$/g, '').trim();
  return s.replace(/\[\[(?:File|Image|Archivo):[^\]]*\]\]/gi, '').replace(/\{\{[^{}]*\}\}/g, '').replace(/'''?/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').replace(/^[\s/,;|–-]+|[\s/,;|–-]+$/g, '').trim(); // "Fastweb/" (un segundo sponsor que no se leyó)
}
function capacidad(c) {
  const s = sinRefs(String(c || '')).replace(/\{\{\s*(?:nts|formatnum|nowrap)\s*:?\|?\s*([^}|]*)[^}]*\}\}/gi, '$1');
  const m = s.match(/\d{1,3}(?:[.,\s ]\d{3})+|\d{3,6}/); return m ? Number(m[0].replace(/\D/g, '')) : null;
}
const col = (enc, re, no) => enc.findIndex((h) => re.test(h) && !(no && no.test(h)));

// las filas de TODOS los equipos de la página, ya limpias: una lista por tabla (estadios: club, estadio, capacidad; kits: club, sponsor,
// marca), para guardarlas en la caché por liga-año y sacar de ahí cada club del sitio y el índice de sponsors (equipos de toda la liga)
function leerPagina(wikitext) {
  const estadios = [], kits = [];
  for (const t of tablas(wikitext)) {
    const e = t.encabezado; const iClub = col(e, /^(club|team|clubs|teams|equipo|squadra)\b/i);
    if (iClub < 0) continue;
    const iEst = col(e, /stadium|venue|ground|stadio|estadio|arena|home/i, /capacity|location|city/i), iCap = col(e, /capacity|capacidad|capienza/i);
    const iKit = col(e, /kit|manufacturer|outfitter|supplier/i), iSp = col(e, /sponsor/i, /back|sleeve|short|secondary/i);
    const filas = (f) => t.grilla.map(f).filter((x) => x.club);
    if (iEst >= 0 && iCap >= 0) estadios.push(filas((f) => ({ club: cleanTexto(f[iClub]), estadio: cleanTexto(f[iEst]) || null, capacidad: capacidad(f[iCap]) })));
    if (iKit >= 0 || iSp >= 0) kits.push({ soloActual: t.soloActual, filas: filas((f) => ({ club: cleanTexto(f[iClub]), sponsor: iSp >= 0 ? cleanTexto(f[iSp]) || null : null, marca: iKit >= 0 ? cleanTexto(f[iKit]) || null : null })) });
  }
  return { estadios, kits };
}

function temporadaDe(club, y, ci, cache, liga) {
  const iso = liga.slice(0, 2); const ls = cache[iso]?.leagues?.[liga] || {};
  const mes = Number((ci || cierreDelClub(club, y).slice(5)).slice(0, 2));
  const partida = (a) => ls[a] && /[–-]\d{2,4}\b/.test(ls[a].wikipediaPage);
  if (mes >= 9 && partida(y + 1)) return y + 1;
  return ls[y] ? y : null;
}

// lo que la página dice de UN club: { estadio, capacidad, sponsor, marca, soloActual } (null en lo que no encuentra)
function delClub(p, nombres) {
  // gana el nombre exacto; uno parcial vale solo si es el único ("Milan" pega con "Inter Milan", "Club Brugge" con "Cercle Brugge")
  const fila = (filas) => {
    const nota = (f) => nombres.some((nm) => corto(nm) === corto(f.club)) ? 2 : nombres.some((nm) => pega(nm, f.club)) ? 1 : 0;
    const ex = filas.filter((f) => nota(f) === 2); if (ex.length) return ex[0];
    const pa = filas.filter((f) => nota(f) === 1); return pa.length === 1 ? pa[0] : null;
  };
  const r = { estadio: null, capacidad: null, sponsor: null, marca: null, soloActual: false };
  for (const t of p.estadios) { const f = fila(t); if (f) { r.estadio = f.estadio; r.capacidad = f.capacidad; break; } }
  for (const t of p.kits) { const f = fila(t.filas); if (f) { r.sponsor = f.sponsor; r.marca = f.marca; r.soloActual = t.soloActual; break; } }
  return r;
}

// CACHÉ POR LIGA-AÑO: tools/club-league-reference/contexto/<iso>.json, { liga: { año: { pagina, lang, revid, estadios, kits } } }. Una página
// se baja una vez; lo que se lee de ella para cada club y para el índice de sponsors sale de acá (--refrescar la vuelve a bajar).
const CTX_DIR = resolve(REF, 'contexto');
function cacheCtx(iso) { const f = resolve(CTX_DIR, `${iso}.json`); return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {}; }
function guardarCtx(iso, j) { mkdirSync(CTX_DIR, { recursive: true }); writeFileSync(resolve(CTX_DIR, `${iso}.json`), JSON.stringify(j, null, 1) + '\n', 'utf8'); }

const OUT = resolve(ROOT, 'data', 'contexto');
const MANUAL = resolve(ROOT, 'tools', 'contexto-manual.json');
// lo ya guardado, por país: { iso: { clubId: { año: {...} } } }
function guardado() {
  const out = {};
  if (existsSync(OUT)) for (const f of readdirSync(OUT).filter((f) => /^[a-z]{2}\.js$/.test(f))) {
    const g = { window: {} }; vm.runInNewContext(readFileSync(resolve(OUT, f), 'utf8'), g); out[f.slice(0, 2)] = g.window.CLUB_CONTEXT || {};
  }
  return out;
}
function escribirPais(iso, clubes) {
  mkdirSync(OUT, { recursive: true });
  const orden = Object.keys(clubes).sort().map((id) => `  '${id}': {\n${Object.keys(clubes[id]).sort().map((y) => `    ${y}: ${JSON.stringify(clubes[id][y])},`).join('\n')}\n  },`).join('\n');
  writeFileSync(resolve(OUT, `${iso}.js`), `// GENERADO por tools/estadio-sponsor.mjs --escribir: estadio, capacidad, sponsor de camiseta (frente) y marca técnica de cada
// club y ejercicio, con su fuente (la revisión exacta de la página de temporada de Wikipedia, o la de tools/contexto-manual.json, que gana).
// No editar a mano: lo que falta o está mal va a tools/contexto-manual.json.
window.CLUB_CONTEXT = window.CLUB_CONTEXT || {};
Object.assign(window.CLUB_CONTEXT, {
${orden}
});
`, 'utf8');
}

async function main() {
  const { CI, CL, CLUBS, cache, alias } = cargar();
  const args = process.argv; const detalle = args.includes('--detalle'); const escribir = args.includes('--escribir');
  const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
  const soloLiga = arg('--liga'), soloClub = arg('--club'), soloAnio = arg('--anio');
  const refrescar = args.includes('--refrescar');
  if (!escribir && !args.includes('--ensayo')) { console.error('Uso: --ensayo | --escribir [--club <id> [--anio <año>]] [--refrescar] [--liga <ligaId>] [--detalle]'); process.exit(1); }
  const manual = existsSync(MANUAL) ? JSON.parse(readFileSync(MANUAL, 'utf8')) : {};
  const previoPais = guardado(); const previo = Object.assign({}, ...Object.values(previoPais));

  const ejercicios = []; let sinLiga = 0, sinLista = 0;
  // los ejercicios cargados; con --club y --anio, también uno que todavía no está en el sitio (la compuerta de cargar.mjs corre ANTES de
  // escribirlo): su liga sale de --liga (la que propone cargar.mjs) y su cierre de --cierre (MM-DD)
  const pares = Object.entries(CI).flatMap(([id, c]) => (c.yrs || []).map(([y]) => [id, +y, c.ci?.[y], CL[id]?.[y]]));
  if (soloClub && soloAnio && !pares.some(([id, y]) => id === soloClub && y === +soloAnio)) pares.push([soloClub, +soloAnio, arg('--cierre'), soloLiga || CL[soloClub]?.[soloAnio]]);
  for (const [id, y, ciY, ligaY] of pares) {
    if (soloClub && id !== soloClub) continue; if (soloAnio && String(y) !== String(soloAnio)) continue;
    const e = { id, y: +y, iso: (CLUBS[id]?.country || id.split('-').pop()).toLowerCase().slice(0, 2) };
    const liga = ligaY; if (soloLiga && liga !== soloLiga) continue;
    if (!liga) { sinLiga++; ejercicios.push(e); continue; }
    e.liga = liga; e.iso = liga.slice(0, 2);
    const s = temporadaDe(CLUBS[id], +y, ciY, cache, liga); if (s == null) { sinLista++; ejercicios.push(e); continue; }
    const r = cache[e.iso].leagues[liga][s];
    // "solo la actual" vale solo en la última temporada que la caché tiene de esa liga
    Object.assign(e, { s, page: r.wikipediaPage, lang: r.lang || 'en', ultima: s === Math.max(...Object.keys(cache[e.iso].leagues[liga]).map(Number)) });
    ejercicios.push(e);
  }
  // con --escribir, un club-año ya guardado no se vuelve a leer (salvo --refrescar); las páginas salen de la caché por liga-año
  const yaEsta = (e) => !refrescar && previo[e.id]?.[e.y]?.fuente;
  const necesarias = new Map(); // "liga|año" -> { iso, liga, s, page, lang }
  for (const e of ejercicios) if (e.page && !(escribir && yaEsta(e))) necesarias.set(`${e.liga}|${e.s}`, { iso: e.iso, liga: e.liga, s: e.s, page: e.page, lang: e.lang });
  // --todas: todas las liga-años de la caché de listas, aunque el sitio no tenga ningún club cargado ahí (el índice de sponsors cuenta los
  // equipos de toda la liga)
  if (args.includes('--todas')) for (const [iso, j] of Object.entries(cache)) for (const [liga, ys] of Object.entries(j.leagues)) for (const [y, r] of Object.entries(ys)) necesarias.set(`${liga}|${y}`, { iso, liga, s: +y, page: r.wikipediaPage, lang: r.lang || 'en' });
  // --actuales: la temporada EN CURSO de cada liga de las listas (para "los equipos que sponsorea hoy"), aunque nadie la haya cargado. El
  // título sale del de la última página guardada cambiando la temporada: "2024–25 La Liga" -> "2026–27 La Liga" (desde julio la temporada
  // partida del año); "2025 Chilean Primera División" -> "2026 ...". Si la página no existe, no hay nada que guardar.
  if (args.includes('--actuales')) {
    const hoy = new Date(); const Y = hoy.getFullYear(); const desdeJulio = hoy.getMonth() >= 6;
    for (const [iso, j] of Object.entries(cache)) for (const [liga, ys] of Object.entries(j.leagues)) {
      const ult = Object.keys(ys).map(Number).sort((a, b) => b - a)[0]; const r = ys[ult]; const t = r.wikipediaPage;
      let titulo = null, anio = null;
      const mp = t.match(/(\d{4})([–-])(\d{2,4})/);
      if (mp) { const ini = desdeJulio ? Y : Y - 1; anio = ini + 1; titulo = t.replace(mp[0], `${ini}${mp[2]}${mp[3].length === 4 ? anio : String(anio).slice(2)}`); }
      else if (/\b\d{4}\b/.test(t)) { anio = Y; titulo = t.replace(/\b\d{4}\b/, String(Y)); }
      if (titulo && anio > ult) necesarias.set(`${liga}|${anio}`, { iso, liga, s: anio, page: titulo, lang: r.lang || 'en' });
    }
  }
  const ctx = {}; const tocados = new Set(); const faltaBajar = [];
  for (const [k, x] of necesarias) { const c = (ctx[x.iso] ??= cacheCtx(x.iso)); if (refrescar || !c[x.liga]?.[x.s] || c[x.liga][x.s].pagina === undefined) faltaBajar.push(x); }
  console.log(`${ejercicios.length} ejercicios (${sinLiga} sin liga en club-leagues, ${sinLista} sin lista); ${necesarias.size} liga-años, ${faltaBajar.length} páginas para bajar`);
  for (const [i, x] of faltaBajar.entries()) {
    const p = await pagina(x.page, x.lang);
    // una página que no existe (la temporada en curso de una liga sin página todavía) queda anotada para no pedirla en cada corrida
    (ctx[x.iso][x.liga] ??= {})[x.s] = p ? { pagina: p.titulo, lang: x.lang, revid: p.revid, ...leerPagina(p.wikitext) } : { pagina: null, pedida: x.page, estadios: [], kits: [] };
    tocados.add(x.iso);
    if ((i + 1) % 25 === 0) { console.error(`  ${i + 1}/${faltaBajar.length} páginas`); if (escribir || args.includes('--todas')) for (const iso of tocados) guardarCtx(iso, ctx[iso]); }
  }
  // la caché se guarda también en --ensayo: es lo bajado de Wikipedia, no un dato del sitio
  for (const iso of tocados) guardarCtx(iso, ctx[iso]);
  const leida = (e) => ctx[e.iso]?.[e.liga]?.[e.s] || null;

  const n = { est: 0, cap: 0, sp: 0, kit: 0, soloActualViejo: 0 }; const porLiga = {}; const salida = {}; const faltan = [];
  for (const e of ejercicios) {
    const L = (porLiga[e.liga || '(sin liga)'] ??= { n: 0, est: 0, sp: 0 }); L.n++;
    let d = null;
    if (escribir && yaEsta(e)) d = { ...previo[e.id][e.y] };
    else if (e.page && leida(e)) {
      const p = leida(e);
      const nombres = [CI[e.id]?.n, CLUBS[e.id]?.displayName, CLUBS[e.id]?.name, ...Object.entries(alias[e.iso] || {}).filter(([, a]) => a.clubId === e.id).map(([x]) => x)].filter(Boolean);
      const r = delClub(p, nombres);
      if (r.soloActual && !e.ultima && (r.sponsor || r.marca)) { n.soloActualViejo++; r.sponsor = null; r.marca = null; }
      d = { estadio: r.estadio, capacidad: r.capacidad, sponsor: r.sponsor, marca: r.marca, temporada: p.pagina, fuente: `https://${p.lang}.wikipedia.org/w/index.php?oldid=${p.revid}` };
    }
    // lo manual gana, campo por campo; sin fuente no vale
    const m = manual[e.id]?.[e.y];
    if (m) {
      if (!m.fuente) { console.error(`contexto-manual.json: ${e.id} ${e.y} sin "fuente": no se usa`); }
      else { d = { ...(d || {}), ...m, fuenteManual: m.fuente }; if (d.fuente === m.fuente) delete d.fuenteManual; }
    }
    const tiene = (k) => d && d[k] != null && d[k] !== '';
    if (tiene('estadio')) { n.est++; L.est++; } if (tiene('capacidad')) n.cap++; if (tiene('sponsor')) { n.sp++; L.sp++; } if (tiene('marca')) n.kit++;
    if (!tiene('estadio') || !tiene('sponsor')) faltan.push(`${e.id} ${e.y}${e.liga ? ` (${e.liga}${e.s ? ' ' + e.s : ', sin lista'})` : ' (sin liga en club-leagues)'}: falta ${[!tiene('estadio') && 'estadio', !tiene('sponsor') && 'sponsor'].filter(Boolean).join(' y ')}`);
    if (d) { const limpio = Object.fromEntries(Object.entries(d).filter(([, v]) => v != null && v !== '')); if (Object.keys(limpio).length > 1) ((salida[e.iso] ??= {})[e.id] ??= {})[e.y] = limpio; }
    if (detalle) console.log(`${e.id} ${e.y} (${e.liga || '-'} ${e.s || '-'}): estadio ${d?.estadio || '-'} | cap ${d?.capacidad || '-'} | sponsor ${d?.sponsor || '-'} | marca ${d?.marca || '-'}`);
  }

  if (escribir) {
    // un país se reescribe con lo guardado más lo de esta corrida (una corrida de un club no borra a los demás)
    const isos = Object.keys(salida);
    for (const iso of isos) {
      const base = Object.fromEntries(Object.entries(previoPais[iso] || {}).map(([id, ys]) => [id, { ...ys }]));
      for (const [id, ys] of Object.entries(salida[iso])) base[id] = { ...(base[id] || {}), ...ys };
      escribirPais(iso, base);
    }
    console.log(`escrito: ${[...isos].map((i) => `data/contexto/${i}.js`).join(', ') || 'nada'}`);
  }
  const tot = ejercicios.length || 1; const pc = (x) => `${x} (${Math.round((100 * x) / tot)}%)`;
  console.log(`\nde ${ejercicios.length} ejercicios: estadio ${pc(n.est)} · capacidad ${pc(n.cap)} · sponsor ${pc(n.sp)} · marca ${pc(n.kit)}`);
  if (n.soloActualViejo) console.log(`descartados por tabla de kits "solo la actual" en una temporada vieja: ${n.soloActualViejo}`);
  if (!soloClub) {
    console.log('\npor liga (ejercicios · con estadio · con sponsor):');
    for (const [l, x] of Object.entries(porLiga).sort((a, b) => b[1].n - a[1].n)) console.log(`  ${l.padEnd(22)} ${x.n} · ${x.est} · ${x.sp}`);
  }
  // COMPUERTA (to-do 273): con --club, sale con 1 si a algún ejercicio le falta estadio o sponsor; lo usa el pipeline antes de cargar
  if (faltan.length) {
    console.log(`\n${faltan.length} ejercicios sin estadio o sin sponsor${soloClub ? '' : ' (los primeros 40)'}:`);
    for (const f of faltan.slice(0, soloClub ? Infinity : 40)) console.log(`  ${f}`);
    if (faltan.some((f) => f.includes('sin lista'))) console.log('Un ejercicio "sin lista": primero la lista de equipos de esa liga-año (node tools/listas-lote.mjs), y se vuelve a probar.');
    console.log('Se completan a mano en tools/contexto-manual.json: { "<clubId>": { "<año>": { "estadio": "...", "capacidad": 0, "sponsor": "...", "marca": "...", "fuente": "<url>" } } }');
    if (soloClub) process.exit(1);
  }
}
main().catch((e) => { console.error(e.message); process.exit(1); });

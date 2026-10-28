#!/usr/bin/env node
// ============================================================================
// tools/estadio-sponsor.mjs — ESTADIO Y SPONSOR DE CADA EJERCICIO CARGADO.
//
// QUÉ. Para cada ejercicio cargado del sitio (data/club-index.js), su liga (data/club-leagues/) y la página de temporada de Wikipedia que
// ya usa la lista de equipos (tools/club-league-reference/<iso>.json): de esa página, la fila del club en la tabla de estadios ("Stadiums
// and locations": estadio y capacidad) y en la de kits ("Personnel and kits": marca técnica y sponsor de camiseta del frente). Campos que
// decidió Guido: estadio, capacidad, sponsor del frente, marca técnica; sin monto. La fuente es la revisión exacta de la página
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
//   ... --local                                        además, la Wikipedia del país para los huecos (con compuerta; queda en la caché)
//   ... --liga <ligaId>                                  solo esa liga (para probar)
// ============================================================================
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { parseAnios, tablaAnios } from './estadio-sponsor-anios.mjs';
import { pega, cargar, pagina, leerPagina, temporadaDe, delClub, LOCAL, paginaLocal, LANG_PAIS, fichaDe, api, enlaceDelClub, camisetasDePagina, valorDelEjercicio, CTX_DIR } from './estadio-sponsor-wikipedia.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
export const { cierreDelClub } = createRequire(import.meta.url)('./cierre-ejercicio.js');
const SPONSOR = createRequire(import.meta.url)('./sponsor-busqueda.js'); // el registro de búsqueda del sponsor

// mismo emparejamiento de nombres que tools/listas-lote.mjs
const _ctx = new Map();
function cacheCtx(iso) { if (!_ctx.has(iso)) { const f = resolve(CTX_DIR, `${iso}.json`); _ctx.set(iso, existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {}); } return _ctx.get(iso); }
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
  // --anios 2016-2022 (con --ensayo y --club): una fila por año con los cuatro porcentajes; cada fila es la llamada suelta de ese año (--anio), así que es igual a las siete llamadas del brief
  if (process.argv.includes('--anios')) {
    const i = process.argv.indexOf('--anios'); const resto = process.argv.slice(2).filter((a, k, v) => a !== '--anios' && v[k - 1] !== '--anios');
    if (!process.argv.includes('--ensayo') || !process.argv.includes('--club')) { console.error('Uso: node tools/estadio-sponsor.mjs --ensayo --club <id> --anios AAAA-AAAA [--liga <ligaId>] [--cierre MM-DD]'); process.exit(1); }
    const anios = parseAnios(process.argv[i + 1]);
    for (const l of tablaAnios(anios, (a) => { try { return execFileSync('node', [process.argv[1], ...resto, '--anio', String(a)], { encoding: 'utf8', maxBuffer: 1 << 26 }); } catch (e) { return String(e.stdout || ''); } })) console.log(l);
    return;
  }
  const { CI, CL, CLUBS, LEAGUES, cache, alias } = cargar();
  // LIGA AMATEUR: un año en una liga amateur (la del catálogo nombra "amateur": las tres divisiones
  // amateur belgas) pasa la compuerta sin sponsor, con el estadio cargado; en esas ligas no hay fuente que diga el sponsor por temporada
  // (decisión de Guido: "En la Eerste Divisie alcanza el estadio, como en las ligas amateur") la
  // Eerste Divisie neerlandesa tampoco tiene fuente del sponsor por temporada: sus páginas de en.wikipedia no traen la tabla de camisetas
  // (frenaban 11 altas del lote 93: ADO Den Haag, De Graafschap, FC Den Bosch, FC Dordrecht, FC Eindhoven, FC Volendam...).
  // (decisión de Guido: lo mismo para la 1. divisjon noruega: Fredrikstad 2013-2017.)
  // (votación de Patro Eisden 2015, opción C, ok de Guido) la segunda división belga (be-challengerproleague, también cuando se llamaba
  // Second Division) tampoco tiene fuente del sponsor por temporada: alcanza el estadio.
  const SOLO_ESTADIO = new Set(['nl-eerstedivisie', 'no-1divisjon', 'no-2divisjon', 'be-challengerproleague']);
  const amateur = (liga) => !!liga && (SOLO_ESTADIO.has(liga) || /amateur/i.test(`${LEAGUES[liga]?.name || ''} ${LEAGUES[liga]?.full || ''}`));
  const args = process.argv; const detalle = args.includes('--detalle'); const escribir = args.includes('--escribir');
  const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
  const soloLiga = arg('--liga'), soloClub = arg('--club'), soloAnio = arg('--anio');
  const refrescar = args.includes('--refrescar');
  if (!escribir && !args.includes('--ensayo')) { console.error('Uso: --ensayo | --escribir [--club <id> [--anio <año>]] [--refrescar] [--liga <ligaId>] [--detalle]'); process.exit(1); }
  const manual = existsSync(MANUAL) ? JSON.parse(readFileSync(MANUAL, 'utf8')) : {};
  const ALIAS_EST = resolve(ROOT, 'tools', 'estadio-alias.json'); const aliasEst = existsSync(ALIAS_EST) ? JSON.parse(readFileSync(ALIAS_EST, 'utf8')) : {};
  const previoPais = guardado(); const previo = Object.assign({}, ...Object.values(previoPais));

  const ejercicios = []; let sinLiga = 0, sinLista = 0;
  // los ejercicios cargados; con --club y --anio, también uno que todavía no está en el sitio (la compuerta de cargar.mjs corre ANTES de
  // escribirlo): su liga sale de --liga (la que propone cargar.mjs) y su cierre de --cierre (MM-DD)
  const pares = Object.entries(CI).flatMap(([id, c]) => (c.yrs || []).map(([y]) => [id, +y, c.ci?.[y], CL[id]?.[y]]));
  if (soloClub && soloAnio && !pares.some(([id, y]) => id === soloClub && y === +soloAnio)) pares.push([soloClub, +soloAnio, arg('--cierre'), soloLiga || CL[soloClub]?.[soloAnio]]);
  for (const [id, y, ciY, ligaY] of pares) {
    if (soloClub && id !== soloClub) continue; if (soloAnio && String(y) !== String(soloAnio)) continue;
    const e = { id, y: +y, ci: ciY, iso: (CLUBS[id]?.country || id.split('-').pop()).toLowerCase().slice(0, 2) };
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
  // lo ya guardado se usa solo si la caché por liga-año no tiene la página (todo sale de la caché: --escribir no baja lo que ya está)
  const yaEsta = (e) => !refrescar && previo[e.id]?.[e.y]?.fuente && !cacheCtx(e.iso)[e.liga]?.[e.s]?.revid;
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
  const nombresDe = (e) => [CI[e.id]?.n, CLUBS[e.id]?.displayName, CLUBS[e.id]?.name, ...Object.entries(alias[e.iso] || {}).filter(([, a]) => a.clubId === e.id).map(([x]) => x)].filter(Boolean);

  // --local: la Wikipedia del país para las liga-años donde a algún ejercicio le falta estadio o sponsor (queda en la misma caché, clave
  // `local`; null = se buscó y no hubo página que pase la compuerta)
  if (args.includes('--local')) {
    const pedir = new Map();
    for (const e of ejercicios) {
      const p = leida(e); if (!p || !LOCAL[e.iso]?.ligas[e.liga]) continue;
      const r = delClub(p, nombresDe(e)); if (r.estadio && r.sponsor) continue;
      if (!refrescar && p.local !== undefined) continue;
      pedir.set(`${e.iso}|${e.liga}|${e.s}`, e);
    }
    console.log(`Wikipedia del país: ${pedir.size} liga-años para buscar`);
    let i = 0;
    for (const e of pedir.values()) {
      const lst = cache[e.iso]?.leagues?.[e.liga]?.[e.s]; const partida = /[–-]\d{2,4}\b/.test(lst?.wikipediaPage || '');
      ctx[e.iso][e.liga][e.s].local = await paginaLocal(e.iso, e.liga, e.s, partida, lst?.clubs || []); tocados.add(e.iso);
      if (++i % 20 === 0) { console.error(`  ${i}/${pedir.size}`); for (const iso of tocados) guardarCtx(iso, ctx[iso]); }
    }
    for (const iso of tocados) guardarCtx(iso, ctx[iso]);
  }

  // --camisetas: la tabla de historia de camisetas de la página del club, para los clubes con algún ejercicio sin sponsor o sin marca
  // (caché: tools/club-league-reference/contexto/_clubes.json, { clubId: { enlace, en, local } }; null = se buscó y no hubo)
  const CLUBES_F = resolve(CTX_DIR, '_clubes.json');
  const clubesCache = existsSync(CLUBES_F) ? JSON.parse(readFileSync(CLUBES_F, 'utf8')) : {};
  if (args.includes('--camisetas')) {
    const faltaKit = (e) => { const p = leida(e); if (!p) return true; const r = delClub(p, nombresDe(e)); if (r.soloActual && !e.ultima) return true; return !r.sponsor || !r.marca; };
    const pedir = [...new Set(ejercicios.filter((e) => e.page && faltaKit(e)).map((e) => e.id))].filter((id) => refrescar || !clubesCache[id]);
    console.log(`páginas de club: ${pedir.length} clubes para buscar`);
    const temporadas = new Map(); // "lang|título" -> wikitext
    for (const [i, id] of pedir.entries()) {
      const r = { enlace: null, en: null, local: null };
      // el enlace, desde la página de temporada de alguno de sus ejercicios (la más nueva primero)
      for (const e of ejercicios.filter((x) => x.id === id && leida(x)?.pagina).sort((a, b) => b.y - a.y)) {
        const p = leida(e); const k = `${p.lang}|${p.pagina}`;
        if (!temporadas.has(k)) temporadas.set(k, (await pagina(p.pagina, p.lang))?.wikitext || '');
        const dest = enlaceDelClub(temporadas.get(k), nombresDe(e));
        if (dest) { r.enlace = { lang: p.lang, titulo: dest }; break; }
      }
      if (r.enlace) {
        const q = await api(r.enlace.lang, `action=query&titles=${encodeURIComponent(r.enlace.titulo)}&redirects=1&prop=langlinks&lllimit=500`);
        const pg = Object.values(q?.query?.pages || {})[0];
        if (pg && !('missing' in pg)) {
          const titulos = { [r.enlace.lang]: pg.title }; for (const l of pg.langlinks || []) titulos[l.lang] = l['*'];
          const local = LANG_PAIS[ejercicios.find((x) => x.id === id).iso];
          for (const [clave, lang] of [['en', 'en'], ['local', local]]) {
            if (!lang || !titulos[lang] || (clave === 'local' && lang === 'en')) continue;
            const art = await pagina(titulos[lang], lang);
            if (!art || !fichaDe(id).test(art.wikitext)) { r[clave] = { pagina: titulos[lang], lang, sinFicha: true }; continue; }
            r[clave] = { pagina: art.titulo, lang, revid: art.revid, ...camisetasDePagina(art.wikitext) };
          }
        }
      }
      clubesCache[id] = r;
      if ((i + 1) % 10 === 0) { console.error(`  ${i + 1}/${pedir.length}`); writeFileSync(CLUBES_F, JSON.stringify(clubesCache, null, 1) + '\n', 'utf8'); }
    }
    mkdirSync(CTX_DIR, { recursive: true }); writeFileSync(CLUBES_F, JSON.stringify(clubesCache, null, 1) + '\n', 'utf8');
  }
  // lo que la página del club da para un ejercicio: { sponsor, marca, fuente, motivo } (motivo: por qué no dio, para el ensayo)
  const deClub = (e) => {
    const c = clubesCache[e.id]; if (!c) return null;
    const mes = Number((e.ci || cierreDelClub(CLUBS[e.id], e.y).slice(5)).slice(0, 2)); const calendario = mes === 12;
    const out = { motivo: {} };
    for (const campo of ['sponsor', 'marca']) {
      const vals = ['en', 'local'].map((k) => c[k]?.[campo]?.length ? { k, ...valorDelEjercicio(c[k][campo], e.y, calendario) } : null).filter(Boolean);
      const con = vals.filter((x) => x.v);
      if (con.length === 2 && !pega(con[0].v, con[1].v) && con[0].v !== con[1].v) { out.motivo[campo] = `en y del país distintos (${con[0].v} | ${con[1].v})`; continue; }
      if (con.length) { const pg = c[con[0].k]; out[campo] = con[0].v; (out.url ??= {})[campo] = `https://${pg.lang}.wikipedia.org/w/index.php?oldid=${pg.revid}`; }
      else out.motivo[campo] = !c.enlace ? 'sin enlace al club' : !vals.length ? (c.en?.sinFicha || c.local?.sinFicha ? 'página sin ficha de club' : 'sin tabla de camisetas') : vals.map((x) => `${x.k}: ${x.por}`).join('; ');
    }
    return out;
  };

  const n = { est: 0, cap: 0, sp: 0, kit: 0, soloActualViejo: 0, club: 0 }; const muestraClub = []; const motivosClub = {}; const porLiga = {}; const salida = {}; const faltan = [];
  for (const e of ejercicios) {
    const L = (porLiga[e.liga || '(sin liga)'] ??= { n: 0, est: 0, sp: 0 }); L.n++;
    let d = null;
    if (escribir && yaEsta(e)) d = { ...previo[e.id][e.y] };
    else if (e.page && leida(e)) {
      const p = leida(e);
      const nombres = nombresDe(e);
      const r = delClub(p, nombres);
      if (r.soloActual && !e.ultima && (r.sponsor || r.marca)) { n.soloActualViejo++; r.sponsor = null; r.marca = null; }
      d = { estadio: r.estadio, capacidad: r.capacidad, sponsor: r.sponsor, marca: r.marca, temporada: p.pagina, fuente: `https://${p.lang}.wikipedia.org/w/index.php?oldid=${p.revid}` };
      // lo que la inglesa no dio, de la Wikipedia del país (si se bajó con --local)
      if (p.local) {
        const rl = delClub(p.local, nombres); if (rl.soloActual && !e.ultima) { rl.sponsor = null; rl.marca = null; }
        // SOLO estadio y capacidad. MEDIDO: en "Liga1 2022 (Perú)" la tabla de kits tiene las columnas corridas (ADT con
        // sponsor "Huancayo", la ciudad; Alianza Lima con "Nike", la marca); los estadios de las páginas locales salieron bien en la muestra
        const puso = ['estadio', 'capacidad'].filter((k) => d[k] == null && rl[k] != null);
        for (const k of puso) d[k] = rl[k];
        if (puso.length) Object.assign(d, { fuenteLocal: `https://${p.local.lang}.wikipedia.org/w/index.php?oldid=${p.local.revid}`, local: puso });
      }
    }
    // lo que todavía falta de sponsor y marca, de la tabla de camisetas de la página del club (si se bajó con --camisetas); la fuente de
    // cada campo, en `club` ({ campo: permalink })
    const dc = deClub(e);
    if (dc) {
      const puso = ['sponsor', 'marca'].filter((k) => d?.[k] == null && dc[k]);
      if (puso.length) { d ??= {}; for (const k of puso) d[k] = dc[k]; d.club = Object.fromEntries(puso.map((k) => [k, dc.url[k]])); n.club++; muestraClub.push(`${e.id} ${e.y}: ${puso.map((k) => `${k} ${dc[k]}`).join(', ')} (${puso.map((k) => dc.url[k]).join(' ')})`); }
      for (const k of ['sponsor', 'marca']) if (d?.[k] == null && dc.motivo[k]) { const m = dc.motivo[k].replace(/\(.*\)/, '(...)'); motivosClub[`${k}: ${m}`] = (motivosClub[`${k}: ${m}`] || 0) + 1; if (detalle) console.log(`  club ${e.id} ${e.y} ${k}: ${dc.motivo[k]}`); }
    }
    // el mismo estadio escrito de dos formas se unifica por club (tools/estadio-alias.json; un cambio de nombre real no está ahí)
    if (d?.estadio && aliasEst[e.id]?.[d.estadio]) d.estadio = aliasEst[e.id][d.estadio];
    // lo manual gana, campo por campo; sin fuente no vale
    const m = manual[e.id]?.[e.y];
    // (REGLA de CONVENCIONES-DATOS "un dato de contexto sin fuente pública queda en null", ok de Guido) `"sin-fuente": { "<campo>": "dónde se buscó" }`
    // en contexto-manual.json: el campo (estadio, capacidad, sponsor o marca) queda en null y cuenta como RESUELTO para la compuerta (no frena). Vale solo con el texto de dónde
    // se buscó; un campo que sí tiene valor no se pisa.
    // El SPONSOR no se resuelve con un texto: hace falta el registro de búsqueda ({ buscado, por, intentos }, tres clases sin contar Wikipedia) o, para los
    // años que ya tenían un texto libre, { legacy: true, texto } con el club y el año en tools/sponsor-legacy.json (tools/sponsor-busqueda.js). Estadio, capacidad y marca siguen con el texto.
    const sf = {}; const sfMotivo = {};
    if (m && m['sin-fuente'] && typeof m['sin-fuente'] === 'object') for (const [k, v] of Object.entries(m['sin-fuente'])) {
      if (k === 'sponsor') { const r = SPONSOR.validar(v, e.id, e.y); if (r.ok) sf[k] = r.legacy ? r.texto : v; else sfMotivo[k] = r.motivo; }
      else if (['estadio', 'capacidad', 'marca'].includes(k) && typeof v === 'string' && v.trim()) sf[k] = v;
    }
    if (m && m['sin-fuente'] && !Object.keys(sf).length) console.error(`contexto-manual.json: ${e.id} ${e.y} "sin-fuente" sin campo válido o sin el texto de dónde se buscó${sfMotivo.sponsor ? ` (sponsor: ${sfMotivo.sponsor})` : ''}: no se usa`);
    if (m) {
      if (!m.fuente) { if (Object.keys(m).some((k) => k !== 'sin-fuente')) console.error(`contexto-manual.json: ${e.id} ${e.y} sin "fuente": no se usa`); }
      // la fuente de Wikipedia queda en `fuente` (vale para los campos que no vinieron a mano); lo manual va en `fuenteManual` con la
      // lista de campos que puso (`manual`). Sin página de Wikipedia, la manual es la única fuente. Un campo con fuente propia (`fuentes`:
      // { campo: url }, cuando el estadio y el sponsor salen de páginas distintas) la lleva en `fuentesManual`.
      else {
        const { fuente: fm, fuentes, 'sin-fuente': _sf, ...campos } = m;
        const extra = { fuenteManual: fm, manual: Object.keys(campos), ...(fuentes ? { fuentesManual: fuentes } : {}) };
        d = d?.fuente ? { ...d, ...campos, ...extra } : { ...(d || {}), ...campos, fuente: fm, ...extra };
      }
    }
    const tiene = (k) => d && d[k] != null && d[k] !== '';
    const resuelto = (k) => tiene(k) || !!sf[k]; // con valor, o en null con la marca `sin-fuente`
    for (const k of Object.keys(sf)) if (!tiene(k)) { d ??= {}; (d.sinFuente ??= {})[k] = sf[k]; }
    if (tiene('estadio')) { n.est++; L.est++; } if (tiene('capacidad')) n.cap++; if (tiene('sponsor')) { n.sp++; L.sp++; } if (tiene('marca')) n.kit++;
    if (!resuelto('estadio') || (!resuelto('sponsor') && !amateur(e.liga))) faltan.push(`${e.id} ${e.y}${e.liga ? ` (${e.liga}${e.s ? ' ' + e.s : ', sin lista'})` : ' (sin liga en club-leagues)'}: falta ${[!resuelto('estadio') && 'estadio', !resuelto('sponsor') && 'sponsor'].filter(Boolean).join(' y ')}${!resuelto('sponsor') && sfMotivo.sponsor ? ` (${e.id} ${e.y} sin-fuente.sponsor no vale: ${sfMotivo.sponsor})` : ''}`);
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
  if (n.club) { console.log(`completados con la página del club: ${n.club} ejercicios`); for (const x of muestraClub) console.log(`  ${x}`); }
  if (Object.keys(motivosClub).length) { console.log('página del club, lo que no dio:'); for (const [m, k] of Object.entries(motivosClub).sort((a, b) => b[1] - a[1])) console.log(`  ${k} · ${m}`); }
  if (n.soloActualViejo) console.log(`descartados por tabla de kits "solo la actual" en una temporada vieja: ${n.soloActualViejo}`);
  if (!soloClub) {
    console.log('\npor liga (ejercicios · con estadio · con sponsor):');
    for (const [l, x] of Object.entries(porLiga).sort((a, b) => b[1].n - a[1].n)) console.log(`  ${l.padEnd(22)} ${x.n} · ${x.est} · ${x.sp}`);
  }
  // COMPUERTA: con --club, sale con 1 si a algún ejercicio le falta estadio o sponsor; lo usa el pipeline antes de cargar
  if (faltan.length) {
    console.log(`\n${faltan.length} ejercicios sin estadio o sin sponsor${soloClub ? '' : ' (los primeros 40)'}:`);
    for (const f of faltan.slice(0, soloClub ? Infinity : 40)) console.log(`  ${f}`);
    if (faltan.some((f) => f.includes('sin lista'))) console.log('Un ejercicio "sin lista": primero la lista de equipos de esa liga-año (node tools/listas-lote.mjs), y se vuelve a probar.');
    // Wikidata como CANDIDATO (no se escribe solo): coincide con el valor revisado a mano en ~43 % de los casos, difiere de nombre en ~17 % (nombres por época) y no tiene dato en el resto
    // (Admin/HALLAZGOS-pipeline.md). Un candidato con su cita ahorra la búsqueda web, que es lo que cuesta tokens y a veces sale mal.
    // MEDIDO (tools/medir-segunda-fuente.mjs, Admin/HALLAZGOS-pipeline.md): aun «confirmado» por el artículo del club, el estadio de Wikidata coincide con el manual en 70 % de los
    // casos; el resto es el MISMO estadio con otro nombre (Wikidata da el actual: SMH Group Stadium era Proact; Swissporarena era thermoplan arena). Por eso NO se escribe solo: el candidato dice
    // qué estadio es y la sesión (o el agente de `dato-publico.mjs --prompt estadio`) verifica el nombre que tenía ESE año.
    if (soloClub && faltan.some((f) => /falta[^:]*estadio|falta estadio/i.test(f))) {
      try {
        const { datoPublico } = await import('./dato-publico.mjs'); const C = cargar().CLUBS[soloClub];
        for (const f of faltan.filter((x) => /estadio/.test(x.split('falta')[1] || '')).slice(0, 8)) {
          const y = Number((f.match(/^\S+ (\d{4})/) || [])[1]); if (!y || !C) continue;
          const r = await datoPublico([C.displayName, C.name].filter(Boolean), { pais: C.country, anio: y });
          const da = r.delAnio;
          console.log(r.error ? `  Wikidata ${y}: ${r.error}` : `  Wikidata ${y}: ${da?.error || `${da.estadio}, capacidad ${da.capacidadDecidida?.valor ? `${da.capacidadDecidida.valor} (${da.capacidadDecidida.regla})` : `sin decidir (${da.capacidadDecidida?.motivo || 'sin dato'}; dato-publico.mjs --prompt capacidad)`}`} · fuente ${da?.fuenteEstadio || r.fuente} · ${da?.confirmadoPorWikipedia ? `la ficha del club lo nombra (${da.confirmadoPorWikipedia}); verificar el NOMBRE que tenía en ${y} (Wikidata da el actual)` : 'SOLO Wikidata: buscar una segunda fuente (la página del club) antes de pegarlo'}`);
        }
        console.log(`Sin candidato o con duda: node tools/dato-publico.mjs --club ${soloClub} --anio <año> --prompt estadio  (prompt fijo para un agente Sonnet)`);
      } catch (e) { /* sin red o sin entidad: queda el paso a mano */ }
    }
    console.log('Se completan a mano en tools/contexto-manual.json: { "<clubId>": { "<año>": { "estadio": "...", "capacidad": 0, "sponsor": "...", "marca": "...", "fuente": "<url>" } } }');
    if (soloClub) process.exit(1);
  }
}
main().catch((e) => { console.error(e.message); process.exit(1); });

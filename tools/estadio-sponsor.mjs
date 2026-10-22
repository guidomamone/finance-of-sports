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
//   ... --local                                        además, la Wikipedia del país para los huecos (con compuerta; queda en la caché)
//   ... --liga <ligaId>                                  solo esa liga (para probar)
// ============================================================================
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { deporteDeClub } from './deporte-club.mjs';
import { serializar } from './contexto-manual-escribir.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const { cierreDelClub } = createRequire(import.meta.url)('./cierre-ejercicio.js');
const SPONSOR = createRequire(import.meta.url)('./sponsor-busqueda.js'); // (to-do 343) el registro de búsqueda del sponsor

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
  const lg = vm.createContext({ window: {} }); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8'), lg);
  return { CI: ci.window.CLUB_INDEX, CL: cl.window.CLUB_LEAGUE_BY_YEAR, CLUBS: vm.runInContext('clubs', ctx), LEAGUES: vm.runInContext('LEAGUES', lg), cache, alias };
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
  // "nowrap" va suelto o como nowrap="" ("nowrap data-sort-value=\"Monchengladbach\" | Borussia Mönchengladbach", kits de la Bundesliga)
  const m = c.match(/^\s*((?:\s*(?:(?:rowspan|colspan|style|align|valign|class|scope|data-sort-value|bgcolor|width|nowrap)\s*=\s*(?:"[^"]*"|[^\s|]*)|nowrap))+)\s*\|(?!\|)([\s\S]*)$/i);
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
const ENTIDADES = { '&ndash;': '–', '&mdash;': '—', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ' };
function cleanTexto(c) {
  c = atributos(String(c || '')).texto.replace(/&(ndash|mdash|amp|quot|#39|apos|nbsp);/g, (m) => ENTIDADES[m]); // un atributo de celda que llegó hasta acá no es parte del nombre
  // un <br> separa dos nombres ("Palácio<br>do Gelo"): espacio, no nada; un enlace externo "[https://... Efapel]" vale su texto
  let s = sinRefs(String(c || '')).replace(/<br\s*\/?>/gi, ' ').replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]/g, '$1').replace(/^\s*\|/, '');
  s = s.replace(/\{\{\s*sort\s*\|[^|}]*\|([^}]*)\}\}/gi, '$1');
  // {{Futebol Benfica}} (pt.wikipedia): la plantilla del club es el nombre
  s = s.replace(/\{\{\s*(?:Futebol|Fútbol|Calcio)\s+([^|{}]+)[^{}]*\}\}/gi, '$1');
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
  const m = s.match(/\d{1,3}(?:[.,\s ]\d{3})+|\d{3,6}/); const n = m ? Number(m[0].replace(/\D/g, '')) : null;
  return n && n >= 100 ? n : null; // "0" o un número de dos cifras no es una capacidad
}
const col = (enc, re, no) => enc.findIndex((h) => re.test(h) && !(no && no.test(h)));

// GALERÍA DE ESTADIOS (Rusia: sección "Venues"). No es una tabla por club sino bloques de fichas: una fila "! [[Club]]" por club, abajo
// una fila con el estadio de cada uno y otra con "Capacity: '''67,800'''". Se lee por bloques y se acepta uno solo si las tres filas tienen
// la misma cantidad de celdas (una celda con colspan/rowspan, el mapa, desarma el bloque y se descarta).
function galeriaEstadios(wikitext) {
  const ini = wikitext.search(/^===?\s*(Venues|Stadiums)\s*===?\s*$/mi); if (ini < 0) return [];
  const sec = wikitext.slice(ini).split('\n').slice(1); const out = [];
  let clubes = [], estadios = [], caps = [], fase = 'clubes';
  const cerrar = () => { if (clubes.length && clubes.length === estadios.length && estadios.length === caps.length) clubes.forEach((c, i) => out.push({ club: c, estadio: estadios[i], capacidad: caps[i] })); clubes = []; estadios = []; caps = []; fase = 'clubes'; };
  for (const l of sec) {
    if (/^==[^=]/.test(l) || /^\|\}/.test(l)) { cerrar(); if (/^==[^=]/.test(l)) break; continue; }
    // "!colspan=3| [[Club]]" (2024-25): el colspan de una ficha no desarma nada; un rowspan o una celda vacía (el mapa) sí
    if (/^\s*!/.test(l)) { if (fase !== 'clubes') cerrar(); clubes.push(cleanTexto(atributos(l.replace(/^\s*!/, '')).texto)); continue; }
    if (/^\|-/.test(l) || !/^\s*\|/.test(l)) continue;
    const a = atributos(l.replace(/^\s*\|/, '')); const c = a.texto;
    if (a.rowspan > 1 || !c.trim() || /Location map/i.test(c)) { cerrar(); continue; }
    if (/\[\[(File|Image):/i.test(c)) continue;
    if (/Capacity:/i.test(c)) { fase = 'caps'; caps.push(capacidad(c.replace(/'''/g, ''))); continue; }
    if (clubes.length) { fase = 'estadios'; estadios.push(cleanTexto(c) || null); }
  }
  cerrar();
  return out.filter((x) => x.club && x.estadio);
}

// las filas de TODOS los equipos de la página, ya limpias: una lista por tabla (estadios: club, estadio, capacidad; kits: club, sponsor,
// marca), para guardarlas en la caché por liga-año y sacar de ahí cada club del sitio y el índice de sponsors (equipos de toda la liga)
function leerPagina(wikitext) {
  const estadios = [], kits = [];
  for (const t of tablas(wikitext)) {
    // encabezados en inglés y en las Wikipedias del país (pt, es, it, ru): "Clube | Estádio | Capacidade", "Equipo | Estadio | Capacidad",
    // "Squadra | Stadio | Capienza", "Клуб | Стадион | Вместимость"; marca: "Fornecedor / Material esportivo / Indumentaria / Fornitore
    // tecnico / Производитель"; sponsor: "Patrocinador / Patrocínio / Sponsor (no el 'tecnico') / Спонсор"
    const e = t.encabezado; const iClub = col(e, /^(club|team|clubs|teams|equipo|equipos|equipa|equipas|squadra|squadre|clube|clubes|time|equipe|клуб|команда)\b/i);
    if (iClub < 0) continue;
    // "Estádio, Cidade" (pt-PT): una columna que EMPIEZA con estadio vale aunque nombre la ciudad; si no, sin ciudad ni capacidad
    let iEst = col(e, /^(stadium|venue|ground|stadio|estadio|estádio|arena|стадион)/i);
    if (iEst < 0) iEst = col(e, /stadium|venue|ground|stadio|estadio|estádio|arena|home|стадион/i, /capacity|capacidad|capacidade|capienza|location|city|ciudad|cidade|città|localidad|город|вместим/i);
    const iCap = col(e, /capacity|capacidad|capacidade|capienza|вместим/i);
    const iKit = col(e, /kit|manufacturer|outfitter|supplier|fornecedor|material|indumentaria|fornitore|sponsor tecnico|marca deportiva|производител|экипиров/i);
    const iSp = col(e, /sponsor|patrocin|спонсор/i, /back|sleeve|short|secondary|tecnic|técnic|costas|manga|espalda/i);
    const filas = (f) => t.grilla.map(f).filter((x) => x.club);
    if (iEst >= 0) estadios.push(filas((f) => ({ club: cleanTexto(f[iClub]), estadio: cleanTexto(f[iEst]) || null, capacidad: iCap >= 0 ? capacidad(f[iCap]) : null })));
    if (iKit >= 0 || iSp >= 0) kits.push({ soloActual: t.soloActual, filas: filas((f) => ({ club: cleanTexto(f[iClub]), sponsor: iSp >= 0 ? cleanTexto(f[iSp]) || null : null, marca: iKit >= 0 ? cleanTexto(f[iKit]) || null : null })) });
  }
  // sin tabla de estadios, la galería ("Venues" de las páginas rusas)
  if (!estadios.length) { const g = galeriaEstadios(wikitext); if (g.length) estadios.push(g); }
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
  // una entidad HTML guardada en la caché antes de que el lector las decodificara ("José Alvalade &ndash; Século XXI")
  // "TBA", "TBD", "N/A", "None", "—": la tabla dice que no se sabe; no es un nombre (Akhmat Grozny 2023: sponsor "TBA")
  const dec = (v) => { if (typeof v !== 'string') return v; const x = v.replace(/&(ndash|mdash|amp|quot|#39|apos|nbsp);/g, (m) => ENTIDADES[m]).trim(); return /^(tba|tbd|tbc|n\/?a|none|no|nil|–|—|-|\?)$/i.test(x) || !/\p{L}/u.test(x) ? null : x; };
  for (const t of p.estadios) { const f = fila(t); if (f) { r.estadio = dec(f.estadio); r.capacidad = f.capacidad >= 100 ? f.capacidad : null; break; } }
  for (const t of p.kits) { const f = fila(t.filas); if (f) { r.sponsor = dec(f.sponsor); r.marca = dec(f.marca); r.soloActual = t.soloActual; break; } }
  return r;
}

// SEGUNDA FUENTE: LA WIKIPEDIA DEL PAÍS (ok de Guido, "fuente en lote" para los huecos). La página de la misma temporada en la Wikipedia
// local trae tablas que la inglesa no tiene (temporadas viejas, ligas de ascenso, "Indumentaria y patrocinio"). Se busca con la API de
// búsqueda (nombre de la liga + temporada); COMPUERTA: el título trae la temporada y la página nombra al menos el 60% de los equipos de la
// lista en inglés de esa temporada. Solo completa campos que la inglesa no dio, con su propia fuente (`fuenteLocal`, campos en `local`).
const LOCAL = {
  pt: { lang: 'pt', ligas: { 'pt-primeiraliga': 'Primeira Liga', 'pt-ligaportugal2': 'Segunda Liga', 'pt-liga3': 'Liga 3 Portugal' } },
  br: { lang: 'pt', ligas: { 'br-serieA': 'Campeonato Brasileiro de Futebol Série A', 'br-serieB': 'Campeonato Brasileiro de Futebol Série B', 'br-serieC': 'Campeonato Brasileiro de Futebol Série C', 'br-serieD': 'Campeonato Brasileiro de Futebol Série D', 'br-paulistaA1': 'Campeonato Paulista de Futebol', 'br-paulistaA2': 'Campeonato Paulista de Futebol Série A2', 'br-paulistaA3': 'Campeonato Paulista de Futebol Série A3' } },
  it: { lang: 'it', ligas: { 'it-seriea': 'Serie A', 'it-serieb': 'Serie B', 'it-seriec': 'Serie C', 'it-seried': 'Serie D' } },
  ar: { lang: 'es', ligas: { 'ar-primera': 'Primera División de Argentina', 'ar-primeranacional': 'Primera Nacional', 'ar-primerab': 'Primera B Metropolitana' } },
  co: { lang: 'es', ligas: { 'co-primeraA': 'Liga Colombiana Primera A', 'co-primeraB': 'Torneo Primera B Colombia' } },
  pe: { lang: 'es', ligas: { 'pe-liga1': 'Liga 1 Perú' } },
  cl: { lang: 'es', ligas: { 'cl-primera': 'Primera División de Chile' } },
  ru: { lang: 'ru', ligas: { 'ru-premierliga': 'Чемпионат России по футболу', 'ru-pervayaliga': 'Первая лига России по футболу' } },
};
async function buscarLocal(lang, q) {
  for (let i = 0; i < 3; i++) {
    await dormir(1500 * (i ? 4 * i : 1));
    try { const r = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=6`, { headers: { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' } }); return (JSON.parse(await r.text()).query?.search || []).map((x) => x.title); } catch { /* reintenta */ }
  }
  return [];
}
// formas de escribir la temporada en un título: "2004–05", "2004-05", "2004-2005", "2004/05", "2004/2005"; o "2021"
function formasTemporada(anio, partida) {
  const a = anio - 1, yy = String(anio).slice(2);
  return partida ? [`${a}–${yy}`, `${a}-${yy}`, `${a}–${anio}`, `${a}-${anio}`, `${a}/${yy}`, `${a}/${anio}`] : [String(anio)];
}
async function paginaLocal(iso, liga, anio, partida, equiposEn) {
  const cfg = LOCAL[iso]; const nombre = cfg?.ligas[liga]; if (!nombre) return null;
  const formas = formasTemporada(anio, partida);
  const titulos = await buscarLocal(cfg.lang, `${nombre} ${formas[partida ? 0 : 0]}`);
  for (const t of titulos.filter((t) => formas.some((f) => t.includes(f)) && !(partida ? false : new RegExp(`${anio}[–/-]|[–/-]${anio}`).test(t)))) {
    const p = await pagina(t, cfg.lang); if (!p) continue;
    const r = leerPagina(p.wikitext);
    const nombresPag = [...r.estadios.flat(), ...r.kits.flatMap((k) => k.filas)].map((x) => x.club);
    const cubre = equiposEn.filter((eq) => nombresPag.some((n) => pega(n, eq))).length;
    if (equiposEn.length && cubre / equiposEn.length >= 0.6) return { pagina: p.titulo, lang: cfg.lang, revid: p.revid, ...r };
  }
  return null;
}

// TERCERA FUENTE: LA TABLA DE HISTORIA DE CAMISETAS DE LA PÁGINA DEL CLUB (diseño aprobado por Guido, 2026-10-18). Para los ejercicios a
// los que las páginas de temporada no les dieron sponsor o marca (ligas de ascenso, años viejos): la página del club trae una tabla
// "Período | Marca | Sponsor" ("Kit manufacturers and shirt sponsors", "Material e patrocinadores", "Indumentaria y patrocinador").
// QUÉ PÁGINA: la que la página de temporada enlaza en la fila del club (no una búsqueda por nombre: "Racing" o "Nacional" serían de otro
// club), y desde ella la de la Wikipedia del país por el enlace entre idiomas; además tiene que tener la ficha de club de fútbol.
// COMPUERTA DEL RANGO: el ejercicio toma el valor de las filas cuyo período lo contiene, y vale solo si todas las lecturas posibles del
// período dan el mismo valor (ver `filasDelEjercicio`); una celda vacía o dos valores distintos: nada. "Ninguno" no completa (no es un nombre).
// Si la inglesa y la del país dan valores distintos, tampoco. Solo completa sponsor y marca que falten, con su fuente (`fuenteClub`,
// campos en `club`).
const LANG_PAIS = { pt: 'pt', br: 'pt', ar: 'es', co: 'es', pe: 'es', cl: 'es', uy: 'es', mx: 'es', es: 'es', it: 'it', ru: 'ru', gr: 'el', ee: 'et', be: 'nl', nl: 'nl', de: 'de', dk: 'da', tr: 'tr', fr: 'fr', ch: 'de' };
const FICHA_CLUB = /\{\{\s*(Infobox football club|Info\/Futebol|Info\/Clube de futebol|Info\/Clube|Ficha de club|Ficha de equipo de fútbol|Squadra di calcio|Sportverein|Футбольный клуб|Карточка футбольного клуба|Κουτί πληροφοριών ποδοσφαιρικής ομάδας|Infobox voetbalclub|Infobox Fußballverein|Jalgpalliklubi)/i;
// (to-do 341, #11) La ficha de un club de RUGBY (Bath Rugby: «Infobox rugby team»). Cada deporte usa SU ficha: un club de fútbol sigue pasando solo por FICHA_CLUB (su
// resultado no cambia) y uno de rugby, solo por esta. La página de TEMPORADA de una liga de rugby (estadio, capacidad y «Kit supplier») ya la lee leerPagina sin cambios.
// Un deporte sin ficha acá (o un club sin deporte en data/clubs.js) usa la de fútbol, como hasta ahora.
const FICHA_RUGBY = /\{\{\s*Infobox rugby (?:team|union club|league club)/i;
const fichaDe = (clubId) => (deporteDeClub(clubId) === 'rugby' ? FICHA_RUGBY : FICHA_CLUB);
async function api(lang, q) {
  for (let i = 0; i < 3; i++) {
    await dormir(1500 * (i ? 4 * i : 1));
    try { const r = await fetch(`https://${lang}.wikipedia.org/w/api.php?${q}&format=json`, { headers: { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' } }); return JSON.parse(await r.text()); } catch { /* reintenta */ }
  }
  return null;
}
// el artículo que la página de temporada enlaza para el club: el destino de los [[Destino|Texto]] cuyo texto o destino es el club (gana
// el nombre exacto; uno parcial, solo si hay un único destino)
function enlaceDelClub(wikitext, nombres) {
  const ex = new Set(), pa = new Set();
  for (const m of sinRefs(wikitext).matchAll(/\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g)) {
    const dest = m[1].trim(); if (/^(File|Image|Archivo|Arquivo|Category|Categoria|Categoría)\s*:/i.test(dest) || /^\d{4}/.test(dest)) continue;
    const textos = [m[2] || dest, dest];
    if (textos.some((x) => nombres.some((nm) => corto(nm) === corto(x)))) ex.add(dest);
    else if (textos.some((x) => nombres.some((nm) => pega(nm, x)))) pa.add(dest);
  }
  if (ex.size === 1) return [...ex][0];
  if (!ex.size && pa.size === 1) return [...pa][0];
  return null; // ninguno o varios: no se adivina
}
// solo las tablas que no tienen otra adentro (Almagro pone la tabla de marcas dentro de una tabla de maquetación)
function tablasInternas(wikitext) {
  const out = []; let from = 0;
  while (true) {
    const ini = wikitext.indexOf('{|', from); if (ini === -1) break;
    const fin = wikitext.indexOf('\n|}', ini); if (fin === -1) break;
    const otra = wikitext.indexOf('{|', ini + 2);
    if (otra !== -1 && otra < fin) { from = otra; continue; }
    out.push(...tablas(wikitext.slice(ini, fin) + '\n|}')); from = fin + 3;
  }
  return out;
}
// "1977/78" o "2008/09–2011/12" (temporadas: por el año en que terminan), "1904–1970", "1995", "2010–present" (años)
const HOY = new Date().getFullYear();
function periodo(c) {
  const s = cleanTexto(c).replace(/present[e]?|actualidad|atualidade|atual|actual|hoy|oggi|heden|heute|настоящее время|σήμερα|today/gi, String(HOY));
  const temp = [...s.matchAll(/(\d{4})\s*\/\s*(\d{2}|\d{4})(?!\d)|(\d{4})\s*[–-]\s*(\d{2})(?!\d)/g)].map((m) => {
    const a = +(m[1] || m[3]), b = m[2] || m[4]; const fin = b.length === 4 ? +b : Math.floor(a / 100) * 100 + +b + (+b < a % 100 ? 100 : 0);
    return fin === a + 1 ? fin : null;
  });
  if (temp.length && temp.every((x) => x)) return { tipo: 'temporadas', a: Math.min(...temp), b: Math.max(...temp) };
  if (temp.length) return null;
  const anios = [...s.matchAll(/(?<!\d)(1[89]\d{2}|20\d{2})(?!\d)/g)].map((m) => +m[1]);
  if (!anios.length) return null;
  const abierto = /\d{4}\s*[–-]\s*$/.test(s); // "2010–"
  return { tipo: 'anios', a: Math.min(...anios), b: abierto ? HOY : Math.max(...anios) };
}
const NINGUNO = /^(none|no|nenhum|nenhuma|ninguno|ninguna|nessuno|нет|καμία|geen|keiner|kein|–|—|-)$|^(no|sin|sem|без|senza)\s+(shirt\s+)?(sponsors?|patrocin\w*|спонсора?|sponsor)$/i;
// un valor de la tabla ya limpio: un enlace que quedó ("{{bandera}} [[Archivo:...]] [[Kimo (marca)|Kimo]]": cleanTexto toma el primer
// enlace y si es un archivo devuelve el resto sin desenlazar) vale su texto; "Ninguno", "No sponsors"... es '∅'. Se aplica también al
// leer la caché, así un ajuste acá no obliga a volver a bajar las páginas.
const valorLimpio = (v) => { const x = String(v || '').replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, '$1').replace(/\s+/g, ' ').trim(); return !x ? '' : x === '∅' || NINGUNO.test(x) ? '∅' : x; };
// las tablas de camisetas de una página: { marca: [{ p, v }], sponsor: [{ p, v }] } (p = período; v = nombre, '∅' = ninguno, '' = vacío)
function camisetasDePagina(wikitext) {
  const out = { marca: [], sponsor: [] };
  for (const t of tablasInternas(wikitext)) {
    const e = t.encabezado;
    const iP = col(e, /^(period|período|periodo|years?|año|años|ano|anos|temporada|temporadas|season|seasons|época|stagione|anni|сезон|годы|период|περίοδος|έτος|seizoen|jaar|zeitraum|saison)\b/i);
    if (iP < 0) continue;
    const iKit = col(e, /kit|manufacturer|outfitter|supplier|fornecedor|material|indumentaria|proveedor|fabricante|marca|fornitore|ausrüster|производител|экипиров|προμηθευτ|kledingsponsor|leverancier/i, /sponsor(?!.*kit)|patrocin|logo/i);
    const iSp = col(e, /sponsor|patrocin|спонсор|χορηγ/i, /back|sleeve|short|secondary|tecnic|técnic|costas|manga|espalda|kit|kleding|logo/i);
    if (iKit < 0 && iSp < 0) continue;
    for (const f of t.grilla) {
      const p = periodo(f[iP]); if (!p) continue;
      const val = (x) => valorLimpio(cleanTexto(x));
      if (iKit >= 0) out.marca.push({ p, v: val(f[iKit]) });
      if (iSp >= 0) out.sponsor.push({ p, v: val(f[iSp]) });
    }
  }
  return out;
}
// las filas cuyo período contiene el ejercicio. Club con ejercicio de año calendario (cierre en diciembre): el año. Club con cierre a mitad
// de año: la temporada que termina ese año. Una fila de temporadas ("2008/09") se lee sin dudas. Una fila de años ("2009–2012") tiene dos
// lecturas en un club de temporada partida: hasta la temporada que TERMINA en 2012, o hasta la que EMPIEZA en 2012. Si la tabla encadena
// sus filas con el mismo año en el borde (1987–1990, 1990–1994...), es la primera (la otra se pisaría); si no, valen las dos y el
// ejercicio toma TODAS las filas que alguna lectura le da (si dan valores distintos, nada).
function filasDelEjercicio(filas, y, calendario) {
  const anios = filas.filter((f) => f.p.tipo === 'anios').sort((a, b) => a.p.a - b.p.a);
  const encadena = anios.length > 1 && anios.every((f, i) => i === 0 || f.p.a >= anios[i - 1].p.b) && anios.some((f, i) => i > 0 && f.p.a === anios[i - 1].p.b);
  return filas.filter(({ p }) => {
    if (p.tipo === 'temporadas') return calendario ? p.a - 1 <= y && y <= p.b : p.a <= y && y <= p.b;
    if (calendario) return p.a <= y && y <= p.b;
    if (p.a === p.b) return y === p.a || y === p.a + 1;
    return encadena ? p.a + 1 <= y && y <= p.b : p.a + 1 <= y && y <= p.b + 1;
  });
}
function valorDelEjercicio(filas, y, calendario) {
  const fs = filasDelEjercicio(filas, y, calendario); if (!fs.length) return { v: null, por: 'sin fila' };
  const vs = [...new Set(fs.map((f) => valorLimpio(f.v)))];
  if (vs.includes('')) return { v: null, por: 'celda vacía' };
  if (vs.length > 1 && !vs.every((v) => pega(v, vs[0]))) return { v: null, por: `ambiguo (${vs.join(' | ')})` };
  if (vs[0] === '∅') return { v: null, por: 'la tabla dice ninguno' };
  return { v: vs[0], por: null };
}

// CACHÉ POR LIGA-AÑO: tools/club-league-reference/contexto/<iso>.json, { liga: { año: { pagina, lang, revid, estadios, kits } } }. Una página
// se baja una vez; lo que se lee de ella para cada club y para el índice de sponsors sale de acá (--refrescar la vuelve a bajar).
const CTX_DIR = resolve(REF, 'contexto');
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
  const { CI, CL, CLUBS, LEAGUES, cache, alias } = cargar();
  // LIGA AMATEUR (decisión de Guido, 2026-10-18): un año en una liga amateur (la del catálogo nombra "amateur": las tres divisiones
  // amateur belgas) pasa la compuerta sin sponsor, con el estadio cargado; en esas ligas no hay fuente que diga el sponsor por temporada
  // (decisión de Guido, 2026-10-19, traída por Onboarding 2: "En la Eerste Divisie alcanza el estadio, como en las ligas amateur") la
  // Eerste Divisie neerlandesa tampoco tiene fuente del sponsor por temporada: sus páginas de en.wikipedia no traen la tabla de camisetas
  // (frenaban 11 altas del lote 93: ADO Den Haag, De Graafschap, FC Den Bosch, FC Dordrecht, FC Eindhoven, FC Volendam...).
  // (decisión de Guido, 2026-10-19: lo mismo para la 1. divisjon noruega: Fredrikstad 2013-2017.)
  // (to-do 298 b3, votación de Patro Eisden 2015, opción C, ok de Guido 2026-10-20) la segunda división belga (be-challengerproleague, también cuando se llamaba
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
        // SOLO estadio y capacidad. MEDIDO (2026-10-18): en "Liga1 2022 (Perú)" la tabla de kits tiene las columnas corridas (ADT con
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
    // (to-do 298 b3, REGLA de CONVENCIONES-DATOS "un dato de contexto sin fuente pública queda en null", ok de Guido 2026-10-20) `"sin-fuente": { "<campo>": "dónde se buscó" }`
    // en contexto-manual.json: el campo (estadio, capacidad, sponsor o marca) queda en null y cuenta como RESUELTO para la compuerta (no frena). Vale solo con el texto de dónde
    // se buscó; un campo que sí tiene valor no se pisa.
    // (to-do 343, skill club-sourcing 0.5) El SPONSOR no se resuelve con un texto: hace falta el registro de búsqueda ({ buscado, por, intentos }, tres clases sin contar Wikipedia) o, para los
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
  // COMPUERTA (to-do 273): con --club, sale con 1 si a algún ejercicio le falta estadio o sponsor; lo usa el pipeline antes de cargar
  if (faltan.length) {
    console.log(`\n${faltan.length} ejercicios sin estadio o sin sponsor${soloClub ? '' : ' (los primeros 40)'}:`);
    for (const f of faltan.slice(0, soloClub ? Infinity : 40)) console.log(`  ${f}`);
    if (faltan.some((f) => f.includes('sin lista'))) console.log('Un ejercicio "sin lista": primero la lista de equipos de esa liga-año (node tools/listas-lote.mjs), y se vuelve a probar.');
    // Wikidata como CANDIDATO (no se escribe solo): coincide con el valor revisado a mano en ~43 % de los casos, difiere de nombre en ~17 % (nombres por época) y no tiene dato en el resto
    // (Admin/HALLAZGOS-pipeline.md). Un candidato con su cita ahorra la búsqueda web, que es lo que cuesta tokens y a veces sale mal.
    // (TODO 366 e) Si Wikidata Y el artículo de Wikipedia del club nombran el mismo estadio, ese estadio se escribe solo en contexto-manual.json (con las dos citas) y la
    // compuerta se vuelve a correr una vez; si no coinciden, solo se imprime. La CAPACIDAD no se escribe sola: sin cruzar coincide el 42 % (la regla de tolerancia es el TODO 367).
    if (soloClub && faltan.some((f) => /falta[^:]*estadio|falta estadio/i.test(f))) {
      try {
        const { datoPublico } = await import('./dato-publico.mjs'); const C = cargar().CLUBS[soloClub];
        const confirmados = [];
        for (const f of faltan.filter((x) => /estadio/.test(x.split('falta')[1] || '')).slice(0, 8)) {
          const y = Number((f.match(/^\S+ (\d{4})/) || [])[1]); if (!y || !C) continue;
          const r = await datoPublico([C.displayName, C.name].filter(Boolean), { pais: C.country, anio: y });
          const da = r.delAnio;
          console.log(r.error ? `  Wikidata ${y}: ${r.error}` : `  Wikidata ${y}: ${da?.error || `${da.estadio}, capacidad ${da.capacidad ?? '(sin dato)'}`} · fuente ${da?.fuenteEstadio || r.fuente} · ${da?.confirmadoPorWikipedia ? `confirmado por ${da.confirmadoPorWikipedia}` : 'SOLO Wikidata: buscar una segunda fuente (la página del club) antes de pegarlo'}`);
          if (!r.error && da?.estadio && da.confirmadoPorWikipedia) confirmados.push({ y, estadio: da.estadio, citas: `${da.fuenteEstadio} y ${da.confirmadoPorWikipedia}` });
        }
        if (confirmados.length && escribir && !process.env.ESTADIO_AUTO) {
          const man = existsSync(MANUAL) ? JSON.parse(readFileSync(MANUAL, 'utf8')) : {};
          for (const c of confirmados) {
            const e = ((man[soloClub] ??= {})[c.y] ??= {});
            if (e.estadio) continue; // lo manual no se pisa
            e.estadio = c.estadio; (e.fuentes ??= {}).estadio = `${c.citas} (dato-publico.mjs: Wikidata y Wikipedia coinciden)`;
            e.fuente ??= e.fuentes.estadio;
          }
          writeFileSync(MANUAL, serializar(man));
          console.log(`escrito en tools/contexto-manual.json: estadio de ${soloClub} ${confirmados.map((c) => `${c.y} ${c.estadio}`).join(', ')} (dos fuentes). Se vuelve a correr la compuerta.`);
          const { spawnSync } = await import('node:child_process');
          const re = spawnSync(process.execPath, [import.meta.filename, ...process.argv.slice(2)], { stdio: 'inherit', env: { ...process.env, ESTADIO_AUTO: '1' } });
          process.exit(re.status ?? 1);
        }
      } catch (e) { /* sin red o sin entidad: queda el paso a mano */ }
    }
    console.log('Se completan a mano en tools/contexto-manual.json: { "<clubId>": { "<año>": { "estadio": "...", "capacidad": 0, "sponsor": "...", "marca": "...", "fuente": "<url>" } } }');
    if (soloClub) process.exit(1);
  }
}
main().catch((e) => { console.error(e.message); process.exit(1); });

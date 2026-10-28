// ============================================================================
// tools/estadio-sponsor-wikipedia.mjs — leer Wikipedia: la ficha del club, la galería de estadios y la tabla de camisetas por temporada
// Mudado de tools/estadio-sponsor.mjs sin cambiar una línea (salvo `export`); tools/estadio-sponsor.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { deporteDeClub } from './deporte-club.mjs';
import { cierreDelClub } from './estadio-sponsor.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');

const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['fc', 'cf', 'sc', 'ac', 'afc', 'cd', 'ca', 'club', 'de', 'del', 'the', 'and', 'sad', 'cp', 'fk', 'sk', 'nk', 'sv', 'vfl', 'vfb', 'tsg', 'rcd', 'ud', 'sd', 'rc']);
const corto = (s) => norm(s).split(' ').filter((w) => !STOP.has(w)).join(' ');
export const pega = (a, b) => { const x = corto(a), y = corto(b); if (!x || !y) return false; if (x === y) return true; const [c, l] = x.length < y.length ? [x, y] : [y, x]; return l.startsWith(c + ' ') || l.includes(' ' + c + ' ') || l.endsWith(' ' + c); };

export function cargar() {
  const ci = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-index.js'), 'utf8'), ci);
  const cl = { window: {} }; for (const f of readdirSync(resolve(ROOT, 'data', 'club-leagues'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-leagues', f), 'utf8'), cl);
  const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
  const cache = {}; for (const f of readdirSync(REF).filter((f) => /^[a-z]{2}\.json$/.test(f))) cache[f.slice(0, 2)] = JSON.parse(readFileSync(resolve(REF, f), 'utf8'));
  const alias = JSON.parse(readFileSync(resolve(REF, 'alias.json'), 'utf8'));
  const lg = vm.createContext({ window: {} }); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8'), lg);
  return { CI: ci.window.CLUB_INDEX, CL: cl.window.CLUB_LEAGUE_BY_YEAR, CLUBS: vm.runInContext('clubs', ctx), LEAGUES: vm.runInContext('LEAGUES', lg), cache, alias };
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
// pagina() y entradaDeCache() viven en wikipedia-pagina.mjs (sin imports: se prueban sin red ni el ciclo con estadio-sponsor.mjs); acá se re-exportan para los llamadores de siempre.
export { pagina, entradaDeCache } from './wikipedia-pagina.mjs';
import { pagina } from './wikipedia-pagina.mjs';

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
export function capacidad(c) {
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
export function leerPagina(wikitext) {
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

export function temporadaDe(club, y, ci, cache, liga) {
  const iso = liga.slice(0, 2); const ls = cache[iso]?.leagues?.[liga] || {};
  const mes = Number((ci || cierreDelClub(club, y).slice(5)).slice(0, 2));
  const partida = (a) => ls[a] && /[–-]\d{2,4}\b/.test(ls[a].wikipediaPage);
  if (mes >= 9 && partida(y + 1)) return y + 1;
  return ls[y] ? y : null;
}

// lo que la página dice de UN club: { estadio, capacidad, sponsor, marca, soloActual } (null en lo que no encuentra)
export function delClub(p, nombres) {
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
export const LOCAL = {
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
export async function paginaLocal(iso, liga, anio, partida, equiposEn) {
  const cfg = LOCAL[iso]; const nombre = cfg?.ligas[liga]; if (!nombre) return null;
  const formas = formasTemporada(anio, partida);
  const titulos = await buscarLocal(cfg.lang, `${nombre} ${formas[partida ? 0 : 0]}`);
  for (const t of titulos.filter((t) => formas.some((f) => t.includes(f)) && !(partida ? false : new RegExp(`${anio}[–/-]|[–/-]${anio}`).test(t)))) {
    const p = await pagina(t, cfg.lang); if (!p || p.falloRed) continue;
    const r = leerPagina(p.wikitext);
    const nombresPag = [...r.estadios.flat(), ...r.kits.flatMap((k) => k.filas)].map((x) => x.club);
    const cubre = equiposEn.filter((eq) => nombresPag.some((n) => pega(n, eq))).length;
    if (equiposEn.length && cubre / equiposEn.length >= 0.6) return { pagina: p.titulo, lang: cfg.lang, revid: p.revid, ...r };
  }
  return null;
}

// TERCERA FUENTE: LA TABLA DE HISTORIA DE CAMISETAS DE LA PÁGINA DEL CLUB. Para los ejercicios a
// los que las páginas de temporada no les dieron sponsor o marca (ligas de ascenso, años viejos): la página del club trae una tabla
// "Período | Marca | Sponsor" ("Kit manufacturers and shirt sponsors", "Material e patrocinadores", "Indumentaria y patrocinador").
// QUÉ PÁGINA: la que la página de temporada enlaza en la fila del club (no una búsqueda por nombre: "Racing" o "Nacional" serían de otro
// club), y desde ella la de la Wikipedia del país por el enlace entre idiomas; además tiene que tener la ficha de club de fútbol.
// COMPUERTA DEL RANGO: el ejercicio toma el valor de las filas cuyo período lo contiene, y vale solo si todas las lecturas posibles del
// período dan el mismo valor (ver `filasDelEjercicio`); una celda vacía o dos valores distintos: nada. "Ninguno" no completa (no es un nombre).
// Si la inglesa y la del país dan valores distintos, tampoco. Solo completa sponsor y marca que falten, con su fuente (`fuenteClub`,
// campos en `club`).
export const LANG_PAIS = { pt: 'pt', br: 'pt', ar: 'es', co: 'es', pe: 'es', cl: 'es', uy: 'es', mx: 'es', es: 'es', it: 'it', ru: 'ru', gr: 'el', ee: 'et', be: 'nl', nl: 'nl', de: 'de', dk: 'da', tr: 'tr', fr: 'fr', ch: 'de' };
const FICHA_CLUB = /\{\{\s*(Infobox football club|Info\/Futebol|Info\/Clube de futebol|Info\/Clube|Ficha de club|Ficha de equipo de fútbol|Squadra di calcio|Sportverein|Футбольный клуб|Карточка футбольного клуба|Κουτί πληροφοριών ποδοσφαιρικής ομάδας|Infobox voetbalclub|Infobox Fußballverein|Jalgpalliklubi)/i;
// La ficha de un club de RUGBY (Bath Rugby: «Infobox rugby team»). Cada deporte usa SU ficha: un club de fútbol sigue pasando solo por FICHA_CLUB (su
// resultado no cambia) y uno de rugby, solo por esta. La página de TEMPORADA de una liga de rugby (estadio, capacidad y «Kit supplier») ya la lee leerPagina sin cambios.
// Un deporte sin ficha acá (o un club sin deporte en data/clubs.js) usa la de fútbol, como hasta ahora.
const FICHA_RUGBY = /\{\{\s*Infobox rugby (?:team|union club|league club)/i;
export const fichaDe = (clubId) => (deporteDeClub(clubId) === 'rugby' ? FICHA_RUGBY : FICHA_CLUB);
export async function api(lang, q) {
  for (let i = 0; i < 3; i++) {
    await dormir(1500 * (i ? 4 * i : 1));
    try { const r = await fetch(`https://${lang}.wikipedia.org/w/api.php?${q}&format=json`, { headers: { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' } }); return JSON.parse(await r.text()); } catch { /* reintenta */ }
  }
  return null;
}
// el artículo que la página de temporada enlaza para el club: el destino de los [[Destino|Texto]] cuyo texto o destino es el club (gana
// el nombre exacto; uno parcial, solo si hay un único destino)
export function enlaceDelClub(wikitext, nombres) {
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
export function camisetasDePagina(wikitext) {
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
export function valorDelEjercicio(filas, y, calendario) {
  const fs = filasDelEjercicio(filas, y, calendario); if (!fs.length) return { v: null, por: 'sin fila' };
  const vs = [...new Set(fs.map((f) => valorLimpio(f.v)))];
  if (vs.includes('')) return { v: null, por: 'celda vacía' };
  if (vs.length > 1 && !vs.every((v) => pega(v, vs[0]))) return { v: null, por: `ambiguo (${vs.join(' | ')})` };
  if (vs[0] === '∅') return { v: null, por: 'la tabla dice ninguno' };
  return { v: vs[0], por: null };
}

// CACHÉ POR LIGA-AÑO: tools/club-league-reference/contexto/<iso>.json, { liga: { año: { pagina, lang, revid, estadios, kits } } }. Una página
// se baja una vez; lo que se lee de ella para cada club y para el índice de sponsors sale de acá (--refrescar la vuelve a bajar).
export const CTX_DIR = resolve(REF, 'contexto');

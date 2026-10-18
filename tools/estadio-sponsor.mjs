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
//   ... --liga <ligaId>                                  solo esa liga (para probar)
// ============================================================================
import { readFileSync, readdirSync } from 'node:fs';
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
  let s = sinRefs(String(c || ''));
  s = s.replace(/\{\{\s*sort\s*\|[^|}]*\|([^}]*)\}\}/gi, '$1');
  // {{nowrap|Almería}} envuelve el nombre entero (kits de LaLiga): se desenvuelve; {{flagicon|...}} y {{ref|...}} se van abajo
  for (let k = 0; k < 3; k++) s = s.replace(/\{\{\s*(?:nowrap|nobreak|center|small|nobr|nowrap begin)\s*\|((?:[^{}]|\{\{[^{}]*\}\}|\[\[[^\]]*\]\])*)\}\}/gi, '$1');
  s = s.replace(/\{\{\s*(?:flagicon|flag icon|flagdeco|ref|efn|refn|#invoke:flag)[^{}]*\}\}/gi, '');
  const m = s.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
  if (m && !/^(File|Image|Archivo):/i.test(m[1])) return (m[2] || m[1]).replace(/&nbsp;/g, ' ').trim();
  return s.replace(/\[\[(?:File|Image|Archivo):[^\]]*\]\]/gi, '').replace(/\{\{[^{}]*\}\}/g, '').replace(/'''?/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
}
function capacidad(c) {
  const s = sinRefs(String(c || '')).replace(/\{\{\s*(?:nts|formatnum|nowrap)\s*:?\|?\s*([^}|]*)[^}]*\}\}/gi, '$1');
  const m = s.match(/\d{1,3}(?:[.,\s ]\d{3})+|\d{3,6}/); return m ? Number(m[0].replace(/\D/g, '')) : null;
}
const col = (enc, re, no) => enc.findIndex((h) => re.test(h) && !(no && no.test(h)));

function leerPagina(wikitext) {
  const ts = tablas(wikitext);
  const estadios = [], kits = [];
  for (const t of ts) {
    const e = t.encabezado; const iClub = col(e, /^(club|team|clubs|teams|equipo|squadra)\b/i);
    if (iClub < 0) continue;
    const iEst = col(e, /stadium|venue|ground|stadio|estadio|arena|home/i, /capacity|location|city/i), iCap = col(e, /capacity|capacidad|capienza/i);
    const iKit = col(e, /kit|manufacturer|outfitter|supplier/i), iSp = col(e, /sponsor/i, /back|sleeve|short|secondary/i);
    if (iEst >= 0 && iCap >= 0) estadios.push({ t, iClub, iEst, iCap });
    if (iKit >= 0 || iSp >= 0) kits.push({ t, iClub, iKit, iSp });
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

async function main() {
  const { CI, CL, CLUBS, cache, alias } = cargar();
  const detalle = process.argv.includes('--detalle');
  const iL = process.argv.indexOf('--liga'); const soloLiga = iL >= 0 ? process.argv[iL + 1] : null; // para probar en una liga
  const ejercicios = []; let sinLiga = 0, sinLista = 0;
  for (const [id, c] of Object.entries(CI)) for (const [y] of c.yrs || []) {
    const liga = CL[id]?.[y]; if (!liga) { sinLiga++; continue; } if (soloLiga && liga !== soloLiga) continue;
    const s = temporadaDe(CLUBS[id], +y, c.ci?.[y], cache, liga); if (s == null) { sinLista++; continue; }
    const r = cache[liga.slice(0, 2)].leagues[liga][s];
    ejercicios.push({ id, y: +y, liga, s, page: r.wikipediaPage, lang: r.lang || 'en', iso: liga.slice(0, 2) });
  }
  const paginas = [...new Set(ejercicios.map((e) => `${e.lang}|${e.page}`))];
  console.log(`${ejercicios.length} ejercicios con lista de equipos (${sinLiga} sin liga en club-leagues, ${sinLista} sin lista); ${paginas.length} páginas para bajar`);
  const leidas = {};
  for (const [i, k] of paginas.entries()) {
    const [lang, page] = k.split('|'); const p = await pagina(page, lang);
    leidas[k] = p ? { ...p, ...leerPagina(p.wikitext) } : null;
    if ((i + 1) % 25 === 0) console.error(`  ${i + 1}/${paginas.length} páginas`);
  }
  const n = { est: 0, cap: 0, sp: 0, kit: 0, soloActual: 0, sinPagina: 0 }; const porLiga = {};
  for (const e of ejercicios) {
    const p = leidas[`${e.lang}|${e.page}`]; const L = (porLiga[e.liga] ??= { n: 0, est: 0, sp: 0 }); L.n++;
    if (!p) { n.sinPagina++; continue; }
    const nombres = [CI[e.id]?.n, CLUBS[e.id]?.displayName, CLUBS[e.id]?.name, ...Object.entries(alias[e.iso] || {}).filter(([, a]) => a.clubId === e.id).map(([x]) => x)].filter(Boolean);
    // gana el nombre exacto; uno parcial vale solo si es el único ("Milan" pega con "Inter Milan", "Club Brugge" con "Cercle Brugge")
    const fila = (x) => {
      const nota = (f) => { const t = cleanTexto(f[x.iClub]); return nombres.some((nm) => corto(nm) === corto(t)) ? 2 : nombres.some((nm) => pega(nm, t)) ? 1 : 0; };
      const ex = x.t.grilla.filter((f) => nota(f) === 2); if (ex.length) return ex[0];
      const pa = x.t.grilla.filter((f) => nota(f) === 1); return pa.length === 1 ? pa[0] : null;
    };
    let est = null, cap = null, sp = null, kit = null, soloActual = false;
    for (const x of p.estadios) { const f = fila(x); if (f) { est = cleanTexto(f[x.iEst]) || null; cap = capacidad(f[x.iCap]); break; } }
    for (const x of p.kits) { const f = fila(x); if (f) { if (x.iSp >= 0) sp = cleanTexto(f[x.iSp]) || null; if (x.iKit >= 0) kit = cleanTexto(f[x.iKit]) || null; soloActual = x.t.soloActual; break; } }
    if (est) { n.est++; L.est++; } if (cap) n.cap++; if (sp) { n.sp++; L.sp++; } if (kit) n.kit++; if ((sp || kit) && soloActual) n.soloActual++;
    if (detalle) console.log(`${e.id} ${e.y} (${e.liga} ${e.s}): estadio ${est || '-'} | cap ${cap || '-'} | sponsor ${sp || '-'} | marca ${kit || '-'}${soloActual ? ' | KITS SOLO ACTUAL' : ''}`);
  }
  const pc = (x) => `${x} (${Math.round((100 * x) / ejercicios.length)}%)`;
  console.log(`\nde ${ejercicios.length} ejercicios: estadio ${pc(n.est)} · capacidad ${pc(n.cap)} · sponsor ${pc(n.sp)} · marca ${pc(n.kit)} · página que no bajó ${n.sinPagina}`);
  console.log(`kits de una tabla "solo la actual": ${n.soloActual}`);
  console.log('\npor liga (ejercicios · con estadio · con sponsor):');
  for (const [l, x] of Object.entries(porLiga).sort((a, b) => b[1].n - a[1].n)) console.log(`  ${l.padEnd(22)} ${x.n} · ${x.est} · ${x.sp}`);
}
main().catch((e) => { console.error(e.message); process.exit(1); });

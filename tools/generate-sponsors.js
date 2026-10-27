#!/usr/bin/env node
// ============================================================================
// tools/generate-sponsors.js — EL ÍNDICE DE SPONSORS Y MARCAS TÉCNICAS (pedido de Guido: cada sponsor con su página, su
// histórico y los equipos que sponsorea hoy; las marcas técnicas también; los equipos de toda la liga, los que el sitio no tiene en gris).
//
// DE DÓNDE. La caché por liga-año de tools/estadio-sponsor.mjs (tools/club-league-reference/contexto/<iso>.json: las tablas de kits de cada
// página de temporada de Wikipedia, con TODOS los equipos). Un equipo se une a un club del sitio por nombre (el exacto gana; uno parcial
// solo si es el único del país); si no, va sin clubId. Además, lo de cada club del sitio que NO salió de la página de temporada (cargado a
// mano en tools/contexto-manual.json o leído de la página del club): sale de data/contexto/<iso>.js (campos listados en `manual` o en
// `club`), va en la liga y temporada de ese ejercicio (data/club-leagues/) con su fuente como 6º elemento, y reemplaza lo que la tabla de
// la temporada decía de ese club en ese rol (una corrección a mano gana).
//
// NOMBRES. Una celda con varios sponsors se separa por coma, punto y coma o barra; lo que va entre paréntesis se saca ("(in cup matches)").
// Dos nombres son el mismo sponsor SOLO si tools/sponsor-alias.json lo dice (a mano): "Fly Emirates" y "Emirates" no se unen solos. Con
// --candidatos imprime los grupos que se parecen, para decidir.
//
// "HOY". La última temporada que la caché tiene de cada liga, si su año es el actual o posterior: `actuales[liga]`. La pantalla marca "hoy"
// las entradas de esa temporada. Una tabla de kits "solo la actual" vale solo en esa temporada.
//
// SALIDA: data/sponsors.js (y data/sponsors-indice.js: [[id, nombre, roles]], chico, para el buscador)
//   window.SPONSORS = { actuales: { liga: año }, fuentes: { "liga|año": url }, lista: { id: { n, roles, e: [[liga, año, equipo, clubId|null, rol, fuente?]] } } }
//   fuente: solo en una entrada que no salió de la página de temporada (la de esa temporada está en `fuentes`).
//   rol: "c" camiseta (frente), "m" marca técnica.
//
// USO:
//   node tools/generate-sponsors.js               escribe data/sponsors.js
//   node tools/generate-sponsors.js --check       sale con 1 si quedó viejo
//   node tools/generate-sponsors.js --candidatos  nombres parecidos que tools/sponsor-alias.json todavía no une
// ============================================================================
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { cierreDelClub } = require('./cierre-ejercicio.js');

const ROOT = path.resolve(__dirname, '..');
const REF = path.join(ROOT, 'tools', 'club-league-reference');
const CTX = path.join(REF, 'contexto');
const OUT = path.join(ROOT, 'data', 'sponsors.js');
const OUT_INDICE = path.join(ROOT, 'data', 'sponsors-indice.js'); // chico, para el buscador (lo pidió fos-pantallas): se carga de entrada
const ALIAS = path.join(ROOT, 'tools', 'sponsor-alias.json');

const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['fc', 'cf', 'sc', 'ac', 'afc', 'cd', 'ca', 'club', 'de', 'del', 'the', 'and', 'sad', 'cp', 'fk', 'sk', 'nk', 'sv', 'vfl', 'vfb', 'tsg', 'rcd', 'ud', 'sd', 'rc']);
const corto = (s) => norm(s).split(' ').filter((w) => !STOP.has(w)).join(' ');
const pega = (a, b) => { const x = corto(a), y = corto(b); if (!x || !y) return false; if (x === y) return true; const [c, l] = x.length < y.length ? [x, y] : [y, x]; return l.startsWith(c + ' ') || l.includes(' ' + c + ' ') || l.endsWith(' ' + c); };
const slug = (s) => norm(s).replace(/ /g, '-');

function sitio() {
  const ci = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data', 'club-index.js'), 'utf8'), ci);
  const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
  const alias = JSON.parse(fs.readFileSync(path.join(REF, 'alias.json'), 'utf8'));
  const listas = {}; for (const f of fs.readdirSync(REF).filter((f) => /^[a-z]{2}\.json$/.test(f))) listas[f.slice(0, 2)] = JSON.parse(fs.readFileSync(path.join(REF, f), 'utf8'));
  const cl = { window: {} }; for (const f of fs.readdirSync(path.join(ROOT, 'data', 'club-leagues'))) vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data', 'club-leagues', f), 'utf8'), cl);
  const cx = { window: {} }; const dirCtx = path.join(ROOT, 'data', 'contexto');
  if (fs.existsSync(dirCtx)) for (const f of fs.readdirSync(dirCtx).filter((f) => /^[a-z]{2}\.js$/.test(f))) vm.runInNewContext(fs.readFileSync(path.join(dirCtx, f), 'utf8'), cx);
  return { CI: ci.window.CLUB_INDEX, CLUBS: vm.runInContext('clubs', ctx), alias, listas, CL: cl.window.CLUB_LEAGUE_BY_YEAR, CONTEXTO: cx.window.CLUB_CONTEXT || {} };
}

// "Fly Emirates/Etihad (in cup matches)" -> ["Fly Emirates", "Etihad"]
const partes = (txt) => String(txt || '').replace(/\([^)]*\)/g, ' ').split(/\s*[,;/]\s*/).map((x) => x.replace(/\s+/g, ' ').trim()).filter((x) => x && x !== '-' && !/^(none|no sponsor|sin sponsor|tba|tbd|tbc|n\/?a|nil|—|–|\?)$/i.test(x) && /\p{L}/u.test(x)); // sin letras ("0", "22") no es un nombre

function construir() {
  const { CI, CLUBS, alias, listas, CL, CONTEXTO } = sitio();
  const aliasSp = fs.existsSync(ALIAS) ? JSON.parse(fs.readFileSync(ALIAS, 'utf8')) : {};
  const canon = (n) => (aliasSp[n] && typeof aliasSp[n] === 'string' ? aliasSp[n] : n);
  const anioActual = new Date().getFullYear();

  // clubes del sitio por país, con sus nombres (para unir un equipo de la tabla a un clubId)
  const porPais = {};
  for (const [id, c] of Object.entries(CI)) {
    const iso = String(c.c || CLUBS[id]?.country || '').toLowerCase(); if (!iso) continue;
    (porPais[iso] ??= []).push({ id, nombres: [c.n, CLUBS[id]?.displayName, CLUBS[id]?.name, ...Object.entries(alias[iso] || {}).filter(([, a]) => a.clubId === id).map(([x]) => x)].filter(Boolean) });
  }
  // un filial ("Sporting CP B", "Juventus Next Gen", "Atalanta U23") no se une por parecido al primer equipo: solo con su nombre exacto
  const filial = (n) => /\b(B|II|U-?2[13]|U-?19|Next Gen|Primavera|Reserves?|Juniors?|Sub-?2[03])$/i.test(String(n).trim());
  const equiposPorPais = {}; // los nombres (cortos) de todos los equipos de las tablas de cada país: se llena antes de unir nada
  const unir = (iso, equipo) => {
    const cs = porPais[iso] || [];
    if (filial(equipo)) { const ex = cs.filter((c) => c.nombres.some((n) => norm(n) === norm(equipo))); return ex.length === 1 ? ex[0].id : null; }
    const ex = cs.filter((c) => c.nombres.some((n) => corto(n) === corto(equipo))); if (ex.length === 1) return ex[0].id;
    if (ex.length) return null;
    // Un nombre del sitio que es prefijo de varios equipos del país («Atlético FC» y «Atlético Huila», «Atlético Nacional», «Atlético La Sabana») no se une a ninguno por prefijo: solo por nombre exacto.
    const compartido = (n, e) => { const x = corto(n), y = corto(e); return x !== y && y.startsWith(x + ' ') && [...(equiposPorPais[iso] || [])].filter((o) => o.startsWith(x + ' ')).length >= 2; };
    const pa = cs.filter((c) => c.nombres.some((n) => pega(n, equipo)));
    if (pa.some((c) => c.nombres.some((n) => pega(n, equipo) && compartido(n, equipo)))) return null; // un candidato era un prefijo compartido: el equipo queda sin unir, no se elige el que sobra
    return pa.length === 1 ? pa[0].id : null;
  };

  const actuales = {}, fuentes = {}, lista = {}; const filas = [];
  const agregar = (nombre, rol, entrada, fuente) => {
    const n = canon(nombre); const id = slug(n); if (!id) return;
    const s = (lista[id] ??= { n, roles: [], e: [] });
    if (!s.roles.includes(rol)) s.roles.push(rol);
    s.e.push(fuente ? [...entrada, rol, fuente] : [...entrada, rol]);
  };
  const isos = fs.existsSync(CTX) ? fs.readdirSync(CTX).filter((f) => /^[a-z]{2}\.json$/.test(f)).map((f) => f.slice(0, 2)).sort() : [];
  for (const iso of isos) {
    const jj = JSON.parse(fs.readFileSync(path.join(CTX, `${iso}.json`), 'utf8'));
    for (const lg of Object.values(jj)) for (const pg of Object.values(lg)) for (const k of (pg && pg.kits) || []) for (const f of k.filas || []) (equiposPorPais[iso] ??= new Set()).add(corto(f.club));
  }
  for (const iso of isos) {
    const j = JSON.parse(fs.readFileSync(path.join(CTX, `${iso}.json`), 'utf8'));
    for (const liga of Object.keys(j).sort()) {
      // la última temporada con página (la de la caché de listas o una en curso bajada con estadio-sponsor.mjs --actuales)
      const anios = [...Object.keys(listas[iso]?.leagues?.[liga] || {}), ...Object.keys(j[liga]).filter((y) => j[liga][y]?.revid)].map(Number);
      const ultima = Math.max(...anios);
      if (ultima >= anioActual) actuales[liga] = ultima;
      for (const y of Object.keys(j[liga]).map(Number).sort((a, b) => a - b)) {
        const p = j[liga][y]; if (!p || !p.revid) continue;
        fuentes[`${liga}|${y}`] = `https://${p.lang || 'en'}.wikipedia.org/w/index.php?oldid=${p.revid}`;
        const t = (p.kits || []).find((k) => !k.soloActual || y === ultima); if (!t) continue;
        for (const f of t.filas) filas.push({ iso, liga, y, f, clubId: unir(iso, f.club) });
      }
    }
  }
  // lo que no salió de la página de temporada (a mano o de la página del club), por ejercicio de un club del sitio. La temporada, como en
  // tools/estadio-sponsor.mjs (temporadaDe): un club que cierra de septiembre en adelante en una liga de temporada partida juega la que
  // termina el año siguiente
  const extra = [];
  for (const [id, ys] of Object.entries(CONTEXTO)) for (const [y, d] of Object.entries(ys)) {
    const liga = CL[id]?.[y]; if (!liga) continue;
    const iso = liga.slice(0, 2); const ls = listas[iso]?.leagues?.[liga] || {};
    const mes = Number((CI[id]?.ci?.[y] || cierreDelClub(CLUBS[id], +y).slice(5)).slice(0, 2));
    const partida = (a) => ls[a] && /[–-]\d{2,4}\b/.test(ls[a].wikipediaPage);
    const temp = mes >= 9 && partida(+y + 1) ? +y + 1 : +y;
    for (const [campo, rol] of [['sponsor', 'c'], ['marca', 'm']]) {
      const fuente = (d.manual || []).includes(campo) ? d.fuentesManual?.[campo] || d.fuenteManual || d.fuente : d.club?.[campo];
      if (fuente && d[campo]) extra.push({ iso, liga, y: temp, clubId: id, equipo: CI[id]?.n || CLUBS[id]?.displayName || id, campo, rol, valor: d[campo], fuente });
    }
  }
  const tapa = new Set(extra.map((x) => `${x.liga}|${x.y}|${x.clubId}|${x.campo}`));
  // un equipo que el sitio no tiene puede venir con dos nombres ("AC Sparta Prague" en 2027, "Sparta Prague" en 2025): por país y nombre
  // normalizado (sin "FC", "AC"...), vale el de la temporada más nueva. Uno del sitio lo agrupa la pantalla por clubId.
  const canonEq = {};
  for (const r of [...filas].sort((a, b) => b.y - a.y)) { const k = `${r.iso}|${corto(r.f.club)}`; if (!canonEq[k]) canonEq[k] = r.f.club; }
  for (const r of filas) {
    const equipo = r.clubId ? r.f.club : canonEq[`${r.iso}|${corto(r.f.club)}`] || r.f.club;
    const tapado = (campo) => r.clubId && tapa.has(`${r.liga}|${r.y}|${r.clubId}|${campo}`);
    if (!tapado('sponsor')) for (const sp of partes(r.f.sponsor)) agregar(sp, 'c', [r.liga, r.y, equipo, r.clubId]);
    if (!tapado('marca')) for (const mk of partes(r.f.marca)) agregar(mk, 'm', [r.liga, r.y, equipo, r.clubId]);
  }
  for (const x of extra) for (const v of partes(x.valor)) agregar(v, x.rol, [x.liga, x.y, x.equipo, x.clubId], x.fuente);
  const ordenado = {};
  for (const id of Object.keys(lista).sort()) { const s = lista[id]; s.roles.sort(); s.e.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]) || a[2].localeCompare(b[2])); ordenado[id] = s; }
  return { actuales, fuentes, lista: ordenado };
}

function texto(d) {
  const ids = Object.keys(d.lista);
  return `// GENERADO por tools/generate-sponsors.js: los sponsors de camiseta (frente) y las marcas técnicas de los equipos de cada liga y temporada,
// desde las páginas de temporada de Wikipedia (fuentes: la revisión exacta de cada página). No editar a mano.
// rol: "c" camiseta, "m" marca técnica. Una entrada: [liga, temporada, equipo, clubId o null (el sitio no lo tiene), rol].
window.SPONSORS = {
  actuales: ${JSON.stringify(d.actuales)},
  fuentes: ${JSON.stringify(d.fuentes)},
  lista: {
${ids.map((id) => `    ${JSON.stringify(id)}: ${JSON.stringify(d.lista[id])},`).join('\n')}
  },
};
`;
}

function textoIndice(d) {
  const filas = Object.keys(d.lista).map((id) => [id, d.lista[id].n, d.lista[id].roles]);
  return `// GENERADO por tools/generate-sponsors.js: el índice de sponsors y marcas técnicas para el buscador ([id, nombre, roles]; rol "c" camiseta,
// "m" marca técnica). El detalle de cada uno está en data/sponsors.js. No editar a mano.
window.SPONSORS_INDICE = [
${filas.map((f) => `  ${JSON.stringify(f)},`).join('\n')}
];
`;
}

function candidatos(d) {
  // claves "parecidas": sin acentos ni signos, sin ".com", sin "fly " adelante
  const clave = (n) => norm(n).replace(/\b(com|bet|ltd|sa|spa|group)\b/g, '').replace(/^fly /, '').replace(/ /g, '');
  const g = {}; for (const s of Object.values(d.lista)) (g[clave(s.n)] ??= new Set()).add(s.n);
  const pares = Object.values(g).filter((x) => x.size > 1).map((x) => [...x].sort());
  console.log(`${pares.length} grupos de nombres parecidos (se unen solo si tools/sponsor-alias.json lo dice: { "Fly Emirates": "Emirates" }):`);
  for (const p of pares) console.log(`  ${p.join('  |  ')}`);
}

const d = construir();
if (process.argv.includes('--candidatos')) { candidatos(d); process.exit(0); }
const t = texto(d); const ti = textoIndice(d);
if (process.argv.includes('--check')) {
  const viejo = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''; const viejoI = fs.existsSync(OUT_INDICE) ? fs.readFileSync(OUT_INDICE, 'utf8') : '';
  if (viejo !== t || viejoI !== ti) { console.log('data/sponsors.js o data/sponsors-indice.js quedó viejo: node tools/generate-sponsors.js'); process.exit(1); }
  console.log('data/sponsors.js y data/sponsors-indice.js al día.'); process.exit(0);
}
fs.writeFileSync(OUT, t, 'utf8'); fs.writeFileSync(OUT_INDICE, ti, 'utf8');
const conClub = Object.values(d.lista).filter((s) => s.e.some((e) => e[3])).length;
console.log(`data/sponsors.js: ${Object.keys(d.lista).length} sponsors y marcas (${conClub} con algún club del sitio), ${Object.keys(d.fuentes).length} liga-años, ${Object.keys(d.actuales).length} ligas con temporada actual; ${(t.length / 1024).toFixed(0)} KB`);

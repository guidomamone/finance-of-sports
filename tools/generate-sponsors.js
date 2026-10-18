#!/usr/bin/env node
// ============================================================================
// tools/generate-sponsors.js — EL ÍNDICE DE SPONSORS Y MARCAS TÉCNICAS (to-do 273, pedido de Guido: cada sponsor con su página, su
// histórico y los equipos que sponsorea hoy; las marcas técnicas también; los equipos de toda la liga, los que el sitio no tiene en gris).
//
// DE DÓNDE. La caché por liga-año de tools/estadio-sponsor.mjs (tools/club-league-reference/contexto/<iso>.json: las tablas de kits de cada
// página de temporada de Wikipedia, con TODOS los equipos). Lo cargado a mano en tools/contexto-manual.json todavía NO entra (está por año
// de ejercicio, no por liga-temporada: pendiente). Un equipo se une a un club del sitio por nombre (el exacto gana; uno parcial solo si es el único del país); si no, va sin clubId.
//
// NOMBRES. Una celda con varios sponsors se separa por coma, punto y coma o barra; lo que va entre paréntesis se saca ("(in cup matches)").
// Dos nombres son el mismo sponsor SOLO si tools/sponsor-alias.json lo dice (a mano): "Fly Emirates" y "Emirates" no se unen solos. Con
// --candidatos imprime los grupos que se parecen, para decidir.
//
// "HOY". La última temporada que la caché tiene de cada liga, si su año es el actual o posterior: `actuales[liga]`. La pantalla marca "hoy"
// las entradas de esa temporada. Una tabla de kits "solo la actual" vale solo en esa temporada.
//
// SALIDA: data/sponsors.js
//   window.SPONSORS = { actuales: { liga: año }, fuentes: { "liga|año": url }, lista: { id: { n, roles, e: [[liga, año, equipo, clubId|null, rol]] } } }
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

const ROOT = path.resolve(__dirname, '..');
const REF = path.join(ROOT, 'tools', 'club-league-reference');
const CTX = path.join(REF, 'contexto');
const OUT = path.join(ROOT, 'data', 'sponsors.js');
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
  return { CI: ci.window.CLUB_INDEX, CLUBS: vm.runInContext('clubs', ctx), alias, listas };
}

// "Fly Emirates/Etihad (in cup matches)" -> ["Fly Emirates", "Etihad"]
const partes = (txt) => String(txt || '').replace(/\([^)]*\)/g, ' ').split(/\s*[,;/]\s*/).map((x) => x.replace(/\s+/g, ' ').trim()).filter((x) => x && x !== '-' && !/^(none|no sponsor|sin sponsor|—|–)$/i.test(x));

function construir() {
  const { CI, CLUBS, alias, listas } = sitio();
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
  const unir = (iso, equipo) => {
    const cs = porPais[iso] || [];
    if (filial(equipo)) { const ex = cs.filter((c) => c.nombres.some((n) => norm(n) === norm(equipo))); return ex.length === 1 ? ex[0].id : null; }
    const ex = cs.filter((c) => c.nombres.some((n) => corto(n) === corto(equipo))); if (ex.length === 1) return ex[0].id;
    if (ex.length) return null;
    const pa = cs.filter((c) => c.nombres.some((n) => pega(n, equipo))); return pa.length === 1 ? pa[0].id : null;
  };

  const actuales = {}, fuentes = {}, lista = {};
  const agregar = (nombre, rol, entrada) => {
    const n = canon(nombre); const id = slug(n); if (!id) return;
    const s = (lista[id] ??= { n, roles: [], e: [] });
    if (!s.roles.includes(rol)) s.roles.push(rol);
    s.e.push([...entrada, rol]);
  };
  const isos = fs.existsSync(CTX) ? fs.readdirSync(CTX).filter((f) => /^[a-z]{2}\.json$/.test(f)).map((f) => f.slice(0, 2)).sort() : [];
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
        for (const f of t.filas) {
          const clubId = unir(iso, f.club);
          for (const sp of partes(f.sponsor)) agregar(sp, 'c', [liga, y, f.club, clubId]);
          for (const mk of partes(f.marca)) agregar(mk, 'm', [liga, y, f.club, clubId]);
        }
      }
    }
  }
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
const t = texto(d);
if (process.argv.includes('--check')) {
  const viejo = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (viejo !== t) { console.log('data/sponsors.js quedó viejo: node tools/generate-sponsors.js'); process.exit(1); }
  console.log('data/sponsors.js al día.'); process.exit(0);
}
fs.writeFileSync(OUT, t, 'utf8');
const conClub = Object.values(d.lista).filter((s) => s.e.some((e) => e[3])).length;
console.log(`data/sponsors.js: ${Object.keys(d.lista).length} sponsors y marcas (${conClub} con algún club del sitio), ${Object.keys(d.fuentes).length} liga-años, ${Object.keys(d.actuales).length} ligas con temporada actual; ${(t.length / 1024).toFixed(0)} KB`);

#!/usr/bin/env node
// ============================================================================
// tools/faltantes-liga.mjs — QUÉ CLUBES LE FALTAN A CADA LIGA POR AÑO, Y LA LISTA DE PENDIENTES DE SOURCING.
//
// POR QUÉ. data/club-leagues/ dice en qué liga jugó cada club NUESTRO; no dice quién falta. El universo de
// cada liga-año sale de la tabla de equipos de Wikipedia ya bajada en tools/club-league-reference/<iso2>.json. Cruzado con lo
// cargado (data/club-index.js), los PDF en mano (Clubes/, vía quien.mjs) y lo ya buscado (Admin/sourcing/<País>/<Club>.md), cada
// club-año que jugó la liga queda en UN estado:
//   cargado     el año está en el sitio.
//   en-mano     hay un PDF de ese año en Clubes/ sin cargar (ni descartado ni parcial): es trabajo de onboarding, no de sourcing.
//   cerrado     su archivo de sourcing dice CERRADO / bloqueo estructural (skill club-sourcing, 0.3): no vuelve a la lista.
//   buscado     tiene archivo de sourcing con un chequeo de hace menos de REBUSCAR_MESES: no se repite.
//   rebuscar    tiene archivo de sourcing, pero el último chequeo es más viejo: vuelve a la lista.
//   sin-buscar  ningún archivo de sourcing: es el pendiente de sourcing.
// Un año cuyo cierre (30/6 si la temporada cruza dos años, 31/12 si es de un año) es de hace menos de RECIENTE_MESES se marca `reciente`:
// el balance todavía no salió y sus clubes no cuentan como pendientes.
//
// NOMBRES. Wikipedia nombra distinto que el sitio y que las carpetas. Se une por nombre normalizado IGUAL dentro del país (club del sitio,
// carpeta de Clubes/, archivo de sourcing); si no, por prefijo de palabras solo si es único de los dos lados; si no, por
// tools/club-league-reference/alias.json (a mano, confirmado). Lo que no se une sale en --print como "sin unir": no se adivina.
//
// SALIDAS (las dos generadas; --check avisa si quedaron viejas):
//   data/faltantes/<liga>.js        window.LEAGUE_GAPS[liga][año] = { size, cargados, reciente?, faltan: [{ n, id?, e }] }  (para Ligas)
//   Admin/sourcing/pendientes.md    por país y club, los años sin-buscar / rebuscar, liga más alta y año más reciente primero.
//
// USO:
//   node tools/faltantes-liga.mjs            escribe las dos salidas
//   node tools/faltantes-liga.mjs --check    sale con 1 si alguna quedó vieja (no escribe)
//   node tools/faltantes-liga.mjs --print    la medición: conteo por estado y por liga, y los nombres sin unir
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, statSync, unlinkSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { todasLasCarpetas } from './carpetas-clubes.mjs';
import { quien } from './quien.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const RECIENTE_MESES = 9;   // Guido
const REBUSCAR_MESES = 12;  // Guido
// A medianoche UTC del día: el archivo generado guarda esa fecha en su cabecera y `--check` recalcula con ELLA (no con la de hoy), así el calendario solo no lo deja viejo.
let HOY = new Date(process.env.FOS_HOY || new Date().toISOString().slice(0, 10)); // FOS_HOY: solo para probar el cambio de día

// País (carpeta de Clubes/ y de Admin/sourcing/) de cada iso2 de las listas. Inglaterra trae clubes galeses en sus ligas.
const PAISES = {
  ar: ['Argentina'], at: ['Austria'], be: ['Bélgica'], br: ['Brasil'], ch: ['Suiza'], cl: ['Chile'], cn: ['China'], co: ['Colombia'],
  cz: ['República Checa'], de: ['Alemania'], dk: ['Dinamarca'], ec: ['Ecuador'], ee: ['Estonia'], es: ['España'], gb: ['Inglaterra', 'Gales'],
  gr: ['Grecia'], hr: ['Croacia'], it: ['Italia'], jp: ['Japón'], kr: ['Corea del Sur'], mx: ['México'], nl: ['Países Bajos'],
  no: ['Noruega'], pe: ['Perú'], pt: ['Portugal'], ru: ['Rusia'], tr: ['Turquía'],
};

const STOP = new Set(['fc', 'cf', 'sc', 'ac', 'afc', 'cd', 'ca', 'sd', 'ud', 'fk', 'sk', 'as', 'ss', 'us', 'sv', 'ec', 'se', 'club', 'futebol',
  'clube', 'football', 'calcio', 'de', 'do', 'da', 'del', 'the', 'and', 'cp', 'sad', 'pfc', 'nk', 'if', 'bk', 'jk', 'ssc', 'acf', 'cfc']);
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
  .split(' ').filter((w) => w && !STOP.has(w)).join(' ');

// ---------------------------------------------------------------------------- entradas
function clubIndex() {
  const c = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-index.js'), 'utf8'), c); return c.window.CLUB_INDEX;
}
function listas() {
  const out = []; // { iso, liga, anio, clubs, pagina }
  for (const f of readdirSync(REF).filter((f) => /^[a-z]{2}\.json$/.test(f))) {
    const j = JSON.parse(readFileSync(resolve(REF, f), 'utf8'));
    for (const [liga, ys] of Object.entries(j.leagues || {})) for (const [y, r] of Object.entries(ys)) out.push({ iso: f.slice(0, 2), liga, anio: +y, clubs: r.clubs, posiciones: r.posiciones || null, pagina: r.wikipediaPage || '' });
  }
  return out.sort((a, b) => a.liga.localeCompare(b.liga) || a.anio - b.anio);
}
// ¿El club tiene cargado el ejercicio de la temporada que termina en `anio`? En una liga de temporada partida (2024-25), un ejercicio que
// cierra entre septiembre y diciembre del año y (Sassuolo, los rusos: 31/12) es de la temporada que termina en y+1 (la categoría al cierre,
// como data/club-leagues/); uno que cierra entre enero y agosto, de la que termina en y. En una liga de un año, ejercicio y = temporada y.
const require_ = (await import('node:module')).createRequire(import.meta.url);
function clubsJs() { const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx); return vm.runInContext('clubs', ctx); }
export const { temporada } = require_('./temporada.js'); // la misma función que usa audit.js (ejercicio-sin-rastro)
// Un ejercicio de margen bruto (`gm` del índice) no cubre: el club no tiene el ingreso de ese año (tools/estimar.mjs le da un estimado).
const cubre = (CI, CLUBS, id, anio, partida) => (CI[id]?.yrs || []).some(([y]) => !(CI[id].gm || []).includes(y) && temporada(CLUBS[id], y, partida, CI[id].ci?.[y]) === anio);
const alias = () => { const p = resolve(REF, 'alias.json'); return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {}; };
const lineasArchivo = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.split(' # ')[0].trim()) : []);

// Fecha del último chequeo y si está cerrado, de Admin/sourcing/<País>/<Club>.md (línea **Ángulos**, si no la del índice, si no la más nueva).
function sourcing(pais) {
  const dir = resolve(ROOT, 'Admin', 'sourcing', pais); const out = {};
  if (!existsSync(dir)) return out;
  const indice = existsSync(resolve(ROOT, 'Admin', 'sourcing', '_indice', `${pais}.md`)) ? readFileSync(resolve(ROOT, 'Admin', 'sourcing', '_indice', `${pais}.md`), 'utf8') : '';
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'))) {
    const nombre = f.slice(0, -3); const t = readFileSync(resolve(dir, f), 'utf8');
    const ang = t.split('\n').slice(0, 12).find((l) => l.startsWith('**Ángulos**')) || '';
    const lineaIdx = indice.split('\n').find((l) => l.includes(`/${pais}/${f}`) || l.includes(`/${pais}/${encodeURI(f)}`)) || '';
    let fecha = (ang.match(/(\d{4}-\d{2}-\d{2})\s*$/) || [])[1] || (lineaIdx.match(/Último chequeo:\s*(\d{4}-\d{2}-\d{2})/) || [])[1];
    if (!fecha) fecha = [...t.matchAll(/(20\d{2}-\d{2}-\d{2})/g)].map((m) => m[1]).sort().pop() || null;
    const cerrado = /\bCERRADO\b|bloqueo estructural/i.test(ang + ' ' + lineaIdx);
    out[nombre] = { archivo: `Admin/sourcing/${pais}/${f}`, fecha, cerrado };
  }
  return out;
}

// Años con PDF en mano (sin cargar, ni descartado ni parcial) por carpeta "<País>/<Club>".
function pdfsEnMano(carpetas) {
  const fuera = new Set([...lineasArchivo(resolve(ROOT, 'Admin', 'registros', 'documentos-descartados.txt')), ...lineasArchivo(resolve(ROOT, 'Admin', 'registros', 'documentos-parciales.txt'))]);
  const out = {};
  const walk = (d, acc) => { for (const e of readdirSync(d)) { const p = resolve(d, e); if (statSync(p).isDirectory()) walk(p, acc); else if (/\.pdf$/i.test(e)) acc.push(p); } return acc; };
  for (const c of carpetas) {
    const dir = resolve(ROOT, 'Clubes', c.pais, c.carpeta); const anios = new Set();
    for (const p of walk(dir, [])) { if (fuera.has(relative(ROOT, p))) continue; const r = quien(p); if (r.year) anios.add(r.year); }
    out[`${c.pais}/${c.carpeta}`] = anios;
  }
  return out;
}

// ---------------------------------------------------------------------------- cálculo
export function calcular() {
  const CI = clubIndex(); const CLUBS = clubsJs(); const AL = alias(); const carpetas = todasLasCarpetas(); const ls = listas();
  const isos = [...new Set(ls.map((l) => l.iso))];
  const enMano = pdfsEnMano(carpetas.filter((c) => isos.some((i) => (PAISES[i] || []).includes(c.pais))));
  // candidatos por iso: { clave normalizada -> { clubId?, carpeta?, sourcing? } }
  const cand = {};
  for (const iso of isos) {
    // `carpetas` es una lista: un club puede tener más de una carpeta (Clubes/Inglaterra/Cardiff City y Clubes/Gales/Cardiff City)
    const m = new Map(); const add = (n, k, v) => { const key = norm(n); if (!key) return; const o = m.get(key) || {};
      if (k === 'carpetas') o.carpetas = [...new Set([...(o.carpetas || []), v])]; else { if (o[k] && o[k] !== v) o.ambiguo = true; o[k] = v; } m.set(key, o); };
    for (const [id, c] of Object.entries(CI)) if (c.c.toLowerCase() === iso) add(c.n, 'clubId', id);
    for (const pais of PAISES[iso] || []) {
      for (const c of carpetas.filter((x) => x.pais === pais)) { add(c.carpeta, 'carpetas', `${pais}/${c.carpeta}`); if (c.clubId) add(c.carpeta, 'clubId', c.clubId); }
      for (const [nombre, s] of Object.entries(sourcing(pais))) add(nombre, 'sourcing', s);
    }
    // un club del sitio arrastra su carpeta (por la cita) aunque el nombre sea otro
    const carpetaDe = {}; for (const c of carpetas) if (c.clubId) (carpetaDe[c.clubId] ??= []).push(`${c.pais}/${c.carpeta}`);
    for (const o of m.values()) if (o.clubId && carpetaDe[o.clubId]) o.carpetas = [...new Set([...(o.carpetas || []), ...carpetaDe[o.clubId]])];
    cand[iso] = m;
  }
  const nombresIso = {}; for (const l of ls) for (const n of l.clubs) (nombresIso[l.iso] ??= new Set()).add(n);
  const aliasRotos = new Set();
  // Un mismo nombre de lista puede ser dos clubes en épocas distintas (Lierse Kempenzonen: la vzw hasta 2021 y la NV desde 2022). La entrada
  // "Nombre (2019-2021)" de alias.json vale solo para listas de esos años y gana sobre la del nombre solo; las demás herramientas no la ven
  // (ninguna lista se llama así).
  const aliasDe = (iso, nombre, anio) => {
    const q = Object.entries(AL[iso] || {}).find(([k]) => { const m = k.match(/^(.*) \((\d{4})-(\d{4})\)$/); return m && m[1] === nombre && anio >= +m[2] && anio <= +m[3]; });
    return q ? q[1] : AL[iso]?.[nombre];
  };
  const unir = (iso, nombre, anio) => {
    const a = aliasDe(iso, nombre, anio); const m = cand[iso];
    if (a) { // { clubId } o { carpeta: "País/Club" } o { sourcing: "País/Club" }: toma el resto de lo que ya se sabe de ese club
      const base = [...m.values()].find((o) => (a.clubId && o.clubId === a.clubId) || (a.carpeta && o.carpetas?.includes(a.carpeta))
        || (a.sourcing && o.sourcing?.archivo === `Admin/sourcing/${a.sourcing}.md`)) || {};
      if (!Object.keys(base).length && !a.clubId) aliasRotos.add(`${iso} "${nombre}" -> ${a.carpeta || a.sourcing} (no existe)`);
      return { ...base, ...(a.clubId ? { clubId: a.clubId } : {}), via: 'alias' };
    }
    const k = norm(nombre); const exacto = m.get(k);
    // prefijo de palabras, único de los dos lados
    const FILIAL = /^(b|c|ii|2|sub|u\d{2}|sub \d{2}|\d{2})( |$)/; // "Benfica B", "Jong Ajax"/"II": un filial no es su club
    const pref = (x, y) => { if (!x || !y) return false; if (x === y) return true; const [c, l] = x.length < y.length ? [x, y] : [y, x];
      return l.startsWith(c + ' ') && !FILIAL.test(l.slice(c.length + 1)); };
    // Prefijo de palabras: suma los candidatos que pegan con este nombre y con NINGÚN otro nombre de las listas del país ("Rubin" pega
    // con el club del sitio "Rubin Kazan"; "Benfica" no toma "Benfica B", que es otro nombre de la lista). Si dos se contradicen, no se une.
    const familia = (n) => pref(norm(n), k); // nombres de las listas que son este mismo club ("Rubin" y "Rubin Kazan")
    const unicos = [...m.entries()].filter(([key, o]) => !o.ambiguo && key !== k && pref(key, k) && [...nombresIso[iso]].every((n) => !pref(norm(n), key) || familia(n)));
    const f = exacto && !exacto.ambiguo ? { ...exacto } : {};
    if (exacto?.ambiguo) return null;
    for (const [, o] of unicos) for (const [kk, v] of Object.entries(o)) {
      if (kk === 'carpetas') { f.carpetas = [...new Set([...(f.carpetas || []), ...v])]; continue; }
      if (f[kk] && f[kk] !== v) return exacto ? { ...exacto, via: 'nombre' } : null; f[kk] = v;
    }
    if (!Object.keys(f).length) return null;
    return { ...f, via: exacto ? (unicos.length ? 'nombre+prefijo' : 'nombre') : 'prefijo' };
  };
  const resultado = {}; const sinUnir = {}; const pendientes = {}; // pendientes[pais][club] = { años: [{anio, liga, e}] }
  const unidos = new Set(); // "liga|año|clubId" que la lista reconoció como cargados
  const posiciones = {}; // "liga|temporada|clubId" -> { pos, de, partida }
  for (const l of ls) {
    const partida = /[–-]\d{2,4}\b/.test(l.pagina); // "2024–25 ..." = temporada que cruza años
    const cierre = new Date(Date.UTC(l.anio, partida ? 5 : 11, partida ? 30 : 31));
    const reciente = (HOY - cierre) / (1000 * 60 * 60 * 24 * 30.44) < RECIENTE_MESES;
    const faltan = []; let cargados = 0;
    for (const n of l.clubs) {
      const u = unir(l.iso, n, l.anio);
      // posición final: el nombre de la lista de equipos en la tabla de posiciones de la misma página (mismo nombre, o la
      // misma familia de nombres si es uno solo). Un club que no está en el sitio va por su nombre ("#Las Palmas"): lo usa el estimado de
      // club nuevo.
      if (l.posiciones) {
        let i = l.posiciones.indexOf(n);
        if (i < 0) { const c = l.posiciones.map((x, k) => [x, k]).filter(([x]) => norm(x) && (norm(x) === norm(n) || norm(x).startsWith(norm(n) + ' ') || norm(n).startsWith(norm(x) + ' '))); if (c.length === 1) i = c[0][1]; }
        if (i >= 0) posiciones[`${l.liga}|${l.anio}|${u?.clubId || '#' + n}`] = { pos: i + 1, de: l.posiciones.length, partida };
      }
      if (!u) (sinUnir[l.iso] ??= new Set()).add(n);
      let e;
      if (u?.clubId && cubre(CI, CLUBS, u.clubId, l.anio, partida)) { cargados++; unidos.add(`${l.liga}|${l.anio}|${u.clubId}`); continue; }
      else if ((u?.carpetas || []).some((c) => [...(enMano[c] || [])].some((y) => temporada(CLUBS[u.clubId], y, partida) === l.anio))) e = 'en-mano';
      else if (u?.sourcing?.cerrado) e = 'cerrado';
      else if (u?.sourcing) e = u.sourcing.fecha && (HOY - new Date(u.sourcing.fecha)) / (1000 * 60 * 60 * 24 * 30.44) < REBUSCAR_MESES ? 'buscado' : 'rebuscar';
      else e = 'sin-buscar';
      faltan.push({ n, ...(u?.clubId ? { id: u.clubId } : {}), e });
      if (!reciente && (e === 'sin-buscar' || e === 'rebuscar')) {
        const pais = (u?.carpetas?.[0] || u?.sourcing?.archivo?.split('/')[2] || '').split('/')[0] || PAISES[l.iso]?.[0] || l.iso;
        const p = ((pendientes[pais] ??= {})[n] ??= { e, sourcing: u?.sourcing?.archivo, fecha: u?.sourcing?.fecha, anios: [] });
        p.anios.push({ anio: l.anio, liga: l.liga });
      }
    }
    ((resultado[l.liga] ??= {})[l.anio] = { size: l.clubs.length, cargados, ...(reciente ? { reciente: true } : {}), faltan });
  }
  // Control de la unión: un club con el año cargado que data/club-leagues/ pone en una liga-año con lista, y que la lista no reconoció,
  // es un alias que falta (y la tool lo estaría contando como faltante).
  const cl = { window: {} };
  for (const f of readdirSync(resolve(ROOT, 'data', 'club-leagues'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-leagues', f), 'utf8'), cl);
  const aliasFaltan = [];
  for (const [id, ys] of Object.entries(cl.window.CLUB_LEAGUE_BY_YEAR || {})) for (const [y, liga] of Object.entries(ys)) {
    if (!CI[id]?.yrs.some(([a]) => a === +y)) continue;
    // "temporada partida" es de CADA liga-año (Argentina pasó de 2008-09 a temporadas de un año): se prueba la lista de la temporada
    // siguiente (si es partida) y la del mismo año
    const partidaDe = (a) => { const p = ls.find((l) => l.liga === liga && l.anio === a); return p ? /[–-]\d{2,4}\b/.test(p.pagina) : null; };
    const s = partidaDe(+y + 1) && temporada(CLUBS[id], +y, true, CI[id].ci?.[y]) === +y + 1 ? +y + 1 : temporada(CLUBS[id], +y, partidaDe(+y) === true, CI[id].ci?.[y]);
    if (resultado[liga]?.[s] && !unidos.has(`${liga}|${s}|${id}`)) aliasFaltan.push(`${liga} ${s} ${id} (${CI[id].n})`);
  }
  // --sugerir: nombres sin unir que comparten una palabra de 4+ letras con un candidato del país (posible alias, para confirmar a mano)
  const sugerencias = [];
  for (const [iso, set] of Object.entries(sinUnir)) for (const n of set) {
    const ws = norm(n).split(' ').filter((w) => w.length >= 4);
    const c = [...cand[iso].entries()].filter(([key]) => key.split(' ').some((w) => ws.includes(w))).map(([key, o]) => o.clubId || o.carpetas?.join(' + ') || o.sourcing?.archivo || key);
    if (c.length) sugerencias.push(`${iso} "${n}" -> ${[...new Set(c)].join(' | ')}`);
  }
  return { resultado, sinUnir, pendientes, ls, aliasFaltan, sugerencias, aliasRotos: [...aliasRotos], posiciones };
}

// ---------------------------------------------------------------------------- salidas
const CABECERA = () => `// GENERADO por tools/faltantes-liga.mjs: no editar a mano (el formato, en la cabecera de la tool).\nwindow.LEAGUE_GAPS_CALCULADO = '${HOY.toISOString().slice(0, 10)}';\n`; // la fecha va como DATO (un comentario con fecha cuenta como historia interna publicada)
function salidas({ resultado, pendientes }) {
  const files = {};
  for (const [liga, ys] of Object.entries(resultado)) {
    const cuerpo = Object.entries(ys).map(([y, v]) => `  ${y}: ${JSON.stringify(v)},`).join('\n');
    files[`data/faltantes/${liga}.js`] = `${CABECERA()}window.LEAGUE_GAPS = window.LEAGUE_GAPS || {};\nwindow.LEAGUE_GAPS[${JSON.stringify(liga)}] = {\n${cuerpo}\n};\n`;
  }
  const tier = (liga) => (/2|segunda|serieb|championship|1lig|1division|pervaya|fnl|eerste|primerab|league1|kleague2|superleague2/i.test(liga) ? 2 : /3|seriec|leagueone|liga3/i.test(liga) ? 3 : /seried|leaguetwo/i.test(liga) ? 4 : 1);
  let md = `# Pendientes de sourcing por liga\n\nGENERADO por \`node tools/faltantes-liga.mjs\` (calculado: ${HOY.toISOString().slice(0, 10)}): no editar a mano. Club-años que jugaron una liga con lista de equipos en\n\`tools/club-league-reference/\`, sin cargar, sin PDF en mano y sin búsqueda de los últimos ${REBUSCAR_MESES} meses (\`sin-buscar\`: nunca se buscó;\n\`rebuscar\`: el último chequeo es más viejo). Excluye los años cerrados hace menos de ${RECIENTE_MESES} meses. Orden: liga más alta, año más reciente.\n`;
  for (const pais of Object.keys(pendientes).sort()) {
    const clubes = Object.entries(pendientes[pais]).map(([n, p]) => ({ n, ...p, tier: Math.min(...p.anios.map((a) => tier(a.liga))), ult: Math.max(...p.anios.map((a) => a.anio)) }))
      .sort((a, b) => a.tier - b.tier || b.ult - a.ult || a.n.localeCompare(b.n));
    md += `\n## ${pais} (${clubes.length} clubes, ${clubes.reduce((s, c) => s + c.anios.length, 0)} club-años)\n\n`;
    for (const c of clubes) {
      const anios = c.anios.sort((a, b) => b.anio - a.anio).map((a) => `${a.anio} (${a.liga})`).join(', ');
      md += `- ${c.n} — ${c.e}${c.sourcing ? ` (último chequeo ${c.fecha || '?'}, \`${c.sourcing}\`)` : ''}: ${anios}\n`;
    }
  }
  files['Admin/sourcing/pendientes.md'] = md;
  return files;
}

function imprimir({ resultado, sinUnir, pendientes, aliasFaltan, aliasRotos }) {
  const tot = {}; let clubAnios = 0;
  for (const [liga, ys] of Object.entries(resultado)) {
    const t = {}; let size = 0, carg = 0;
    for (const v of Object.values(ys)) { if (v.reciente) { t.reciente = (t.reciente || 0) + v.size; continue; } size += v.size; carg += v.cargados; for (const f of v.faltan) t[f.e] = (t[f.e] || 0) + 1; }
    t.cargado = carg; for (const [k, n] of Object.entries(t)) tot[k] = (tot[k] || 0) + n; clubAnios += size;
    console.log(`${liga.padEnd(22)} ${Object.keys(ys).length} años · ${size} club-años · cargado ${carg} · ${Object.entries(t).filter(([k]) => k !== 'cargado').map(([k, n]) => `${k} ${n}`).join(' · ')}`);
  }
  console.log(`\nTOTAL (sin años recientes): ${clubAnios} club-años · ${Object.entries(tot).map(([k, n]) => `${k} ${n}`).join(' · ')}`);
  console.log(`Pendientes de sourcing: ${Object.values(pendientes).reduce((s, p) => s + Object.keys(p).length, 0)} clubes`);
  const su = Object.entries(sinUnir).map(([iso, s]) => `${iso} ${s.size}`).join(' · ');
  console.log(`Nombres sin unir a nada (pueden ser clubes de verdad sin buscar, o un alias que falta): ${su}`);
  console.log(`Alias rotos en tools/club-league-reference/alias.json: ${aliasRotos.length}`); for (const a of aliasRotos) console.log(`  ${a}`);
  console.log(`Clubes del sitio que club-leagues pone en una liga-año y la lista no reconoce (alias que faltan): ${aliasFaltan.length}`);
  for (const a of aliasFaltan) console.log(`  ${a}`);
  if (process.argv.includes('--sin-unir')) for (const [iso, s] of Object.entries(sinUnir)) console.log(`  ${iso}: ${[...s].sort().join(' | ')}`);
}

// La fecha con la que se calcularon los archivos que hay (la cabecera de data/faltantes/). Sin ella (archivos de antes de este cambio), se regenera una vez.
function fechaGuardada() {
  const dir = resolve(ROOT, 'data', 'faltantes'); if (!existsSync(dir)) return null;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.js'))) { const m = readFileSync(resolve(dir, f), 'utf8').match(/^window\.LEAGUE_GAPS_CALCULADO = '(\d{4}-\d{2}-\d{2})';$/m); if (m) return m[1]; }
  return null;
}
// ¿Este worktree no tiene los enlaces a algún PDF que la carpeta principal ya tiene? Lo que sale de pdfsEnMano() depende de los PDF (no se trackean), así que un worktree sin
// `preparar` ve otros "en-mano" que la principal y el archivo parece viejo sin que haya cambiado ninguna entrada.
function faltaPreparar() {
  let main; try { main = resolve(execFileSync('git', ['rev-parse', '--path-format=absolute', '--git-common-dir'], { cwd: ROOT, encoding: 'utf8' }).trim(), '..'); } catch { return false; }
  if (main === ROOT || !existsSync(resolve(main, 'Clubes'))) return false;
  const falta = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) { if (falta(p)) return true; } else if (/\.pdf$/i.test(e.name) && !existsSync(resolve(ROOT, relative(main, p)))) return true; } return false; };
  return falta(resolve(main, 'Clubes'));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const guardada = process.argv.includes('--check') ? fechaGuardada() : null;
  if (guardada) HOY = new Date(guardada); // --check recalcula con la fecha de los archivos: solo queda viejo si cambiaron las entradas, no por el calendario
  const r = calcular(); const files = salidas(r);
  if (process.argv.includes('--sugerir')) console.log(r.sugerencias.join('\n'));
  else if (process.argv.includes('--print') || process.argv.includes('--sin-unir')) imprimir(r);
  else if (process.argv.includes('--check')) {
    const viejos = Object.entries(files).filter(([p, t]) => !existsSync(resolve(ROOT, p)) || readFileSync(resolve(ROOT, p), 'utf8') !== t).map(([p]) => p);
    const sobran = existsSync(resolve(ROOT, 'data', 'faltantes')) ? readdirSync(resolve(ROOT, 'data', 'faltantes')).map((f) => `data/faltantes/${f}`).filter((p) => !files[p]) : [];
    if (viejos.length || sobran.length) {
      const lista = [...viejos, ...sobran].slice(0, 5).join(', ');
      // código 3 (audit.js: P3): solo faltan los enlaces a PDF de la principal en este worktree; código 1 (P1): cambiaron las entradas (o los archivos no traen fecha)
      if (guardada && faltaPreparar()) { console.log(`faltantes-liga: ${viejos.length + sobran.length} archivos distintos (${lista}) y a este worktree le faltan enlaces a PDF de la principal (los "en-mano" dependen de ellos): corré node tools/worktree.mjs preparar . y volvé a chequear`); process.exit(3); }
      console.log(`faltantes-liga: ${viejos.length + sobran.length} archivos viejos (${lista}): node tools/faltantes-liga.mjs`); process.exit(1);
    }
    const dias = guardada ? Math.floor((new Date(new Date().toISOString().slice(0, 10)) - HOY) / 86400000) : 0;
    // código 2 (audit.js: P3): las entradas no cambiaron, pero hace más de 30 días que se calculó: los años recientes ya pasaron el corte
    if (dias > 30) { console.log(`faltantes-liga: calculado hace ${dias} días (${guardada}); las entradas no cambiaron, pero regenerá: los años recientes ya pasaron el corte (node tools/faltantes-liga.mjs)`); process.exit(2); }
    console.log('faltantes-liga: al día');
  } else {
    // Un cambio de día sin un dato nuevo no reescribe nada: las 66 cabeceras cambiarían solo por la fecha y moverían ASSET_V (asset-v-sin-subir). Se comparan sin la fecha.
    const sinFecha = (t) => t.replace(/^window\.LEAGUE_GAPS_CALCULADO = '[\d-]+';$/m, '').replace(/\(calculado: [\d-]+\)/, '');
    const dir = resolve(ROOT, 'data', 'faltantes');
    const igual = (p, t) => existsSync(resolve(ROOT, p)) && sinFecha(readFileSync(resolve(ROOT, p), 'utf8')) === sinFecha(t);
    const sobran = existsSync(dir) ? readdirSync(dir).filter((f) => !files[`data/faltantes/${f}`]) : [];
    if (Object.entries(files).every(([p, t]) => igual(p, t)) && !sobran.length) { console.log('faltantes-liga: sin cambios (solo cambió la fecha), no se escribe nada'); process.exit(0); }
    mkdirSync(resolve(ROOT, 'data', 'faltantes'), { recursive: true });
    for (const [p, t] of Object.entries(files)) writeFileSync(resolve(ROOT, p), t);
    // una liga que ya no tiene lista no deja su archivo viejo publicado
    for (const f of readdirSync(resolve(ROOT, 'data', 'faltantes'))) if (!files[`data/faltantes/${f}`]) unlinkSync(resolve(ROOT, 'data', 'faltantes', f));
    console.log(`faltantes-liga: ${Object.keys(files).length} archivos escritos`);
  }
}

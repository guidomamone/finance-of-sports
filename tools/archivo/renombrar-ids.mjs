#!/usr/bin/env node
// ============================================================================
// tools/renombrar-ids.mjs — to-do 246: pasa los ids de club sin país (boca, realmadrid…) a `<slug>-<iso2>` (boca-ar, realmadrid-es).
// Diseño y razones: Admin/mediciones/246-ids.md. Se archiva en tools/archivo/ al cerrar el to-do.
//
// USO
//   node tools/renombrar-ids.mjs              ENSAYO: no escribe nada. Informe en Admin/mediciones/246-ensayo.txt
//   node tools/renombrar-ids.mjs --aplicar    git mv de los archivos con el id, reescritura por contexto, data/club-aliases.js y el bloque de
//                                             redirects de netlify.toml. Exige árbol limpio. Después: regenerar y la prueba cruzada (diseño, 5).
//   node tools/renombrar-ids.mjs --verificar  solo lectura: ¿queda algún id viejo en un contexto reconocido? ¿cada alias apunta a un club vivo?
//
// El mapa se deriva de data/clubs.js (id que no termina en -<iso2> de su country); no hay lista a mano.
// Se reescribe SOLO en contextos (comillas, clave de objeto, ruta, ?club=, sourceId, prefijo de variables del data file): palabras como
// river, union o racing en prosa no se tocan. Lo que queda en prosa se lista como "dudoso" en el informe.
// ============================================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const A = process.argv.slice(2);
const APLICAR = A.includes('--aplicar'), VERIFICAR = A.includes('--verificar');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });

// ---- 1. El mapa, derivado de clubs.js, con las tres reglas del diseño --------------------------------------------------------------------
function derivarMapa() {
  const s = readFileSync(resolve(ROOT, 'data/clubs.js'), 'utf8');
  const clubes = [...s.matchAll(/\bid:\s*'([a-z0-9-]+)'[^\n]*?\bcountry:\s*'([A-Z]{2})'/g)].map((m) => [m[1], m[2].toLowerCase()]);
  const ids = new Set(clubes.map((c) => c[0]));
  const mapa = {};
  for (const [id, iso] of clubes) if (!id.endsWith('-' + iso)) mapa[id] = `${id}-${iso}`;
  const errores = [];
  for (const [v, n] of Object.entries(mapa)) {
    if (ids.has(n)) errores.push(`colisión: ${n} ya existe`);
    for (const o of ids) if (o !== v && o.startsWith(v + '-') && !Object.values(mapa).includes(o)) errores.push(`el id vivo ${o} empieza con ${v}-`);
  }
  return { mapa, errores };
}
// Con el 246 aplicado el mapa vive en data/club-aliases.js (los ids viejos ya no están en clubs.js).
function leerAliases() {
  const f = resolve(ROOT, 'data/club-aliases.js');
  if (!existsSync(f)) return null;
  return JSON.parse(readFileSync(f, 'utf8').match(/CLUB_ALIASES\s*=\s*(\{[\s\S]*?\});/)[1]);
}

const EXT = /\.(js|mjs|cjs|json|jsonl|md|html|txt|toml|xml|tsv|csv|log)$/;
// Historia y logs: no se reescriben (diseño, 3). Las skills tampoco: sus cambios de texto se muestran antes de aplicarlos.
const EXCLUIDOS = [
  /^Clubes\//, /^Admin\/Archive\//, /^auditorias\//, /^Prototyping\//, /^\.claude\//, /^Admin\/sesiones\//, /^Admin\/mediciones\//,
  /^Admin\/CHANGELOG\.md$/, /^Admin\/finance-of-sports-project\.md$/, /^Admin\/TODO\.md$/, /^Admin\/ESTADO\.md$/,
  /^Admin\/registros\/api\//, /^Admin\/registros\/transcripciones-/, /^Admin\/registros\/caja-deuda-resto\.log$/,
  /^tools\/renombrar-ids\.mjs$/, /^data\/club-aliases\.js$/, /^netlify\.toml$/, /^tools\/reddit-archive-search\.mjs$/, /^tools\/audit\.js$/, /^js\/selector\.js$/, /^package(-lock)?\.json$/,
];
const SOLO_CLUB_BRIEFING = /^Generados\/.*\.briefing\.json$/;
const esJsLike = (f) => /\.(js|mjs|cjs|json)$/.test(f);

function reglas(mapa, S = [], sourceIdNuevo = {}) {
  const alt = Object.keys(mapa).sort((a, b) => b.length - a.length).join('|');
  const nuevo = (m) => mapa[m];
  return {
    alt,
    // [nombre, regex, reemplazo, soloJsLike]
    lista: [
      ['comillas', new RegExp(`(['"\`])(${alt})\\1`, 'g'), (_, q, id) => q + nuevo(id) + q, false],
      ['clave', new RegExp(`(?<![\\w.$'"\`-])(${alt})(\\s*:)(?!:)`, 'g'), (_, id, c) => `'${nuevo(id)}'` + c, true],
      ['sourceId', S.length ? new RegExp(`(?<![\\w-])(${S.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\w-])`, 'g') : /(?!)/g,
        (m) => sourceIdNuevo[m], false],
      ['archivo-data', new RegExp(`(?<![\\w-])(${alt})(-data\\.js)`, 'g'), (_, id, s) => nuevo(id) + s, false],
      ['ruta-club', new RegExp(`((?:fuentes|carga-clubes)/)(${alt})(\\.html|\\.md|(?![\\w-]))`, 'g'), (_, p, id, e) => p + nuevo(id) + e, false],
      ['club=', new RegExp(`(club=)(${alt})(?![\\w-])`, 'g'), (_, p, id) => p + nuevo(id), false],
      ['audit-ignore', new RegExp(`("match":\\s*")(${alt})( )`, 'g'), (_, p, id, e) => p + nuevo(id) + e, true],
      ['clave-cola', new RegExp(`(\\|)(${alt})(?=["|])`, 'g'), (_, p, id) => p + nuevo(id), false, /\.jsonl$/],
      ['propiedad-registro', new RegExp(`(gestionesByClub|memberCountByClub)\\.(${alt})(?![\\w-])`, 'g'), (_, p, id) => `${p}['${nuevo(id)}']`, true],
      ['generic-data', new RegExp(`(CLUB_GENERIC_DATA)\\.(${alt})(?![\\w-])`, 'g'), (_, p, id) => `${p}['${nuevo(id)}']`, true],
    ],
  };
}
// El prefijo de las variables de un data file es el id sin guiones: bocaRevenueLinesByYear -> bocaarRevenueLinesByYear.
function reescribirVariables(texto, id, nuevoId) {
  return texto.replace(new RegExp(`(?<![\\w$])${id}(?=[A-Z][A-Za-z]+\\b)`, 'g'), nuevoId.replace(/-/g, ''));
}

function reescribir(f, texto, R, mapa) {
  const cambios = {};
  const cuenta = (n, k = 1) => (cambios[n] = (cambios[n] || 0) + k);
  if (SOLO_CLUB_BRIEFING.test(f)) {
    const t = texto.replace(new RegExp(`("club":\\s*")(${R.alt})(")`, 'g'), (_, a, id, c) => (cuenta('briefing'), a + mapa[id] + c));
    return { texto: t, cambios };
  }
  let t = texto;
  for (const [n, re, fn, soloJs, soloEn] of R.lista) {
    if (soloJs && !esJsLike(f)) continue;
    if (soloEn && !soloEn.test(f)) continue;
    t = t.replace(re, (...m) => (cuenta(n), fn(...m)));
  }
  const m = f.match(/^data\/[a-z]{2}\/(.+)-data\.js$/);
  if (m && mapa[m[1]]) {
    const t2 = reescribirVariables(t, m[1], mapa[m[1]]);
    if (t2 !== t) cuenta('variables', (t.match(new RegExp(`(?<![\\w$])${m[1]}(?=[A-Z][A-Za-z]+\\b)`, 'g')) || []).length);
    t = t2;
  }
  return { texto: t, cambios };
}

function archivosEnAlcance() {
  return git('ls-files', '-z').split('\0').filter(Boolean)
    .filter((f) => (EXT.test(f) || SOLO_CLUB_BRIEFING.test(f)) && (SOLO_CLUB_BRIEFING.test(f) || (!/^Generados\//.test(f) && !EXCLUIDOS.some((r) => r.test(f)))));
}

// ---- 2. Dudosos: apariciones del id viejo que ningún contexto reconoció (prosa) ----------------------------------------------------------
function dudosos(f, texto, R) {
  const out = [];
  const re = new RegExp(`(?<![\\w.@/-])(${R.alt})(?![\\w]|-[a-z]{2}\\b)`, 'g');
  const lineas = texto.split('\n');
  for (let i = 0; i < lineas.length; i++) {
    re.lastIndex = 0;
    if (re.test(lineas[i])) out.push(`${f}:${i + 1}: ${lineas[i].trim().slice(0, 150)}`);
  }
  return out;
}

// ---- 3. Rutas a mover -------------------------------------------------------------------------------------------------------------------
function movimientos(mapa) {
  const mv = [];
  const tracked = new Set(git('ls-files', '-z').split('\0'));
  for (const [v, n] of Object.entries(mapa)) {
    const iso = n.slice(-2);
    for (const [de, a] of [[`data/${iso}/${v}-data.js`, `data/${iso}/${n}-data.js`], [`fuentes/${v}.html`, `fuentes/${n}.html`], [`Admin/carga-clubes/${v}.md`, `Admin/carga-clubes/${n}.md`]])
      if (tracked.has(de)) mv.push([de, a]);
  }
  return mv;
}

// ---- 4. Alias y redirects ---------------------------------------------------------------------------------------------------------------
const HELPERS = `
// resolverClubId('boca') -> 'boca-ar'; un id que no es alias vuelve igual. resolverClubIds(x) lo aplica a cada texto de un objeto o lista
// (el estado de una búsqueda guardada lleva ids de club a varias alturas). Sin dependencias: lo usan la URL, el selector y Mi cuenta.
window.resolverClubId = function (id) { return Object.prototype.hasOwnProperty.call(window.CLUB_ALIASES, id) ? window.CLUB_ALIASES[id] : id; };
window.resolverClubIds = function (v) {
  if (typeof v === 'string') return window.resolverClubId(v);
  if (Array.isArray(v)) return v.map(window.resolverClubIds);
  if (v && typeof v === 'object') { var o = {}; Object.keys(v).forEach(function (k) { o[k] = window.resolverClubIds(v[k]); }); return o; }
  return v;
};
`;
function textoAliases(mapa) {
  const filas = Object.entries(mapa).sort(([a], [b]) => (a < b ? -1 : 1)).map(([v, n]) => `  ${JSON.stringify(v)}: ${JSON.stringify(n)}`);
  return `// Los ids viejos de club (sin país) y a qué id apuntan hoy (to-do 246). NO se borra ninguna entrada: un link compartido o una búsqueda guardada\n`
    + `// con el id viejo tiene que seguir abriendo. Lo escribe tools/renombrar-ids.mjs; un alias nuevo se agrega a mano y \`audit.js\` lo chequea\n`
    + `// (alias-roto). Las páginas fuentes/<id>.html viejas redirigen desde netlify.toml.\nwindow.CLUB_ALIASES = {\n${filas.join(',\n')}\n};\n${HELPERS}`;
}
const MARCA_I = '# ids-alias:inicio (lo escribe tools/renombrar-ids.mjs; no editar a mano)', MARCA_F = '# ids-alias:fin';
function bloqueRedirects(mapa) {
  const r = [];
  for (const [v, n] of Object.entries(mapa).sort(([a], [b]) => (a < b ? -1 : 1)))
    for (const ext of ['.html', '']) {
      r.push(`[[redirects]]\n  from = "/fuentes/${v}${ext}"\n  to = "/fuentes/${n}.html"\n  status = 301\n  force = true\n`);
      r.push(`[[redirects]]\n  from = "/club/${v}${ext}"\n  to = "/club/${n}"\n  status = 301\n  force = true\n`); // to-do 241: el link propio del club (/club/<id>)
    }
  return `${MARCA_I}\n${r.join('\n')}${MARCA_F}\n`;
}

// ---- main -------------------------------------------------------------------------------------------------------------------------------
const { mapa: mapaClubs, errores } = derivarMapa();
const aliasesGuardados = leerAliases();
const mapa = Object.keys(mapaClubs).length ? mapaClubs : (aliasesGuardados || {});
if (errores.length) { console.error('El mapa no cumple las reglas del diseño:\n' + errores.join('\n')); process.exit(2); }
// Los sourceIds de cada club: los tokens `<id>-…` que usa su propio data file (leído ANTES de mover). Tokens parecidos fuera de ahí (entidades
// como botafogo-saf, slugs de sponsors, ejemplos en documentos) no son sourceIds y no se tocan.
const S = []; const sourceIdNuevo = {};
if (!VERIFICAR) for (const [v, n] of Object.entries(mapa)) {
  const f = resolve(ROOT, `data/${n.slice(-2)}/${v}-data.js`);
  if (!existsSync(f)) continue;
  for (const m of new Set(readFileSync(f, 'utf8').match(new RegExp(`(?<![\\w-])${v}-[a-z0-9][a-z0-9-]*`, 'g')) || [])) {
    if (mapa[m] || m.startsWith(v + '-data')) continue;
    S.push(m); sourceIdNuevo[m] = n + m.slice(v.length);
  }
}
const R = reglas(mapa, S, sourceIdNuevo);

if (VERIFICAR) {
  let malos = 0; const dud = [];
  const al = aliasesGuardados;
  if (!al) { console.log('Todavía no hay data/club-aliases.js (el 246 no se aplicó).'); process.exit(1); }
  const vivos = new Set([...readFileSync(resolve(ROOT, 'data/clubs.js'), 'utf8').matchAll(/\bid:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]));
  for (const [v, n] of Object.entries(al)) { if (!vivos.has(n) || vivos.has(v) || al[n]) { console.log(`alias roto: ${v} -> ${n}`); malos++; } }
  const RA = reglas(al);
  for (const f of archivosEnAlcance()) {
    let t = readFileSync(resolve(ROOT, f), 'utf8');
    // CLAUDE.md nombra un id viejo (`boca`) a propósito, como ejemplo de lo que resuelven los alias: esa línea no cuenta.
    if (f === 'CLAUDE.md') t = t.split('\n').filter((l) => !l.includes('uno viejo (`boca`) sigue andando por')).join('\n');
    const { cambios } = reescribir(f, t, RA, al);
    const n = Object.values(cambios).reduce((a, b) => a + b, 0);
    if (n) { console.log(`id viejo en contexto reconocido: ${f} (${JSON.stringify(cambios)})`); malos++; }
    if (!SOLO_CLUB_BRIEFING.test(f)) dud.push(...dudosos(f, t, RA));
  }
  for (const id of vivos) {
    const iso = id.slice(-2);
    if (!existsSync(resolve(ROOT, `data/${iso}/${id}-data.js`))) { /* clubs.js puede tener clubes sin data file propio: no es error */ }
  }
  console.log(`\n${malos} problema(s). ${dud.length} aparición(es) en prosa (informativo).`);
  process.exit(malos ? 1 : 0);
}

const informe = [];
const salida = (s = '') => { informe.push(s); console.log(s); };
salida(`# 246 — ${APLICAR ? 'APLICADO' : 'ENSAYO'} de renombrar-ids (${Object.keys(mapa).length} ids)\n`);
const mv = movimientos(mapa);
salida(`## Archivos a mover (${mv.length})`);
for (const [d, a] of mv.slice(0, 6)) salida(`  ${d} -> ${a}`);
salida(`  … ${mv.length} en total (data ${mv.filter((x) => x[0].startsWith('data/')).length}, fuentes ${mv.filter((x) => x[0].startsWith('fuentes/')).length}, carga-clubes ${mv.filter((x) => x[0].startsWith('Admin/')).length})\n`);

if (APLICAR) {
  if (git('status', '--porcelain').trim()) { console.error('El árbol no está limpio: commiteá o descartá antes de aplicar.'); process.exit(2); }
  for (const [d, a] of mv) git('mv', d, a);
}

const porArchivo = []; const totalPorRegla = {}; const dud = []; const escritos = [];
for (const f of archivosEnAlcance()) {
  // En --aplicar los archivos ya se movieron: se lee por el nombre nuevo.
  const ruta = mv.find((x) => x[0] === f)?.[1] || f;
  if (!existsSync(resolve(ROOT, ruta))) continue;
  let t; try { t = readFileSync(resolve(ROOT, ruta), 'utf8'); } catch { continue; }
  const { texto, cambios } = reescribir(ruta, t, R, mapa);
  const n = Object.values(cambios).reduce((a, b) => a + b, 0);
  if (n) { porArchivo.push([ruta, n, cambios]); for (const [k, v] of Object.entries(cambios)) totalPorRegla[k] = (totalPorRegla[k] || 0) + v; }
  if (!SOLO_CLUB_BRIEFING.test(f)) dud.push(...dudosos(ruta, texto, R));
  if (APLICAR && texto !== t) { writeFileSync(resolve(ROOT, ruta), texto); escritos.push(ruta); }
}
salida(`## Cambios por regla`); for (const [k, v] of Object.entries(totalPorRegla)) salida(`  ${k}: ${v}`);
const porDir = {}; for (const [f, n] of porArchivo) { const d = f.split('/').slice(0, f.startsWith('Generados') ? 1 : 2).join('/'); porDir[d] = (porDir[d] || [0, 0]); porDir[d][0]++; porDir[d][1] += n; }
salida(`\n## Archivos tocados por carpeta (${porArchivo.length} archivos)`); for (const [d, [a, b]] of Object.entries(porDir).sort()) salida(`  ${d}: ${a} archivos, ${b} cambios`);
salida(`\n## Dudosos: aparece el id viejo y ningún contexto lo reconoció (prosa; quedan como están) — ${dud.length}`);
for (const d of dud.slice(0, 400)) salida('  ' + d);

if (APLICAR) {
  writeFileSync(resolve(ROOT, 'data/club-aliases.js'), textoAliases(mapa));
  const nt = resolve(ROOT, 'netlify.toml'); let toml = readFileSync(nt, 'utf8');
  const bloque = bloqueRedirects(mapa);
  toml = toml.includes(MARCA_I) ? toml.replace(new RegExp(`${MARCA_I.replace(/[()]/g, '\\$&')}[\\s\\S]*?${MARCA_F}\\n`), bloque) : toml.trimEnd() + '\n\n' + bloque;
  writeFileSync(nt, toml);
  salida(`\nEscribí ${escritos.length} archivos, data/club-aliases.js y ${Object.keys(mapa).length * 2} redirects en netlify.toml.`);
} else {
  writeFileSync(resolve(ROOT, 'Admin/mediciones/246-ensayo.txt'), informe.join('\n') + '\n');
  console.log('\n(ensayo: no se escribió nada salvo el informe Admin/mediciones/246-ensayo.txt)');
}

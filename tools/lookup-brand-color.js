#!/usr/bin/env node
// ============================================================================
// tools/lookup-brand-color.js — busca LOCAL, contra las tablas de
// tools/brand-color-reference/, los swatches que footylogos publica para un
// club. Reemplaza el fetch puntual por club cuando la liga ya está
// cacheada (`tools/fetch-brand-color-reference.mjs`).
//
// ESTO NO DECIDE `brandColor` — solo evita volver a pedirle la página a
// footylogos. Seguí el proceso completo de `club-or-year-onboarding/club-nuevo.md`
// antes de aceptar un hex: identidad primero (¿de qué
// color es la CAMISETA, según Wikipedia/la liga?), el hex solo si cae en esa
// familia, y las 4 trampas ya documentadas ahí (bicolor en partes iguales,
// agregador ordenado por el escudo no la camiseta, blanco con acento,
// slugs inestables) siguen aplicando igual.
//
// USO:
//   node tools/lookup-brand-color.js "Boca Juniors"        busca en todas las ligas cacheadas
//   node tools/lookup-brand-color.js "Once Caldas" --liga colombia
//   node tools/lookup-brand-color.js --list-ligas          qué ligas hay cacheadas
//   node tools/lookup-brand-color.js "River" --json
//   node tools/lookup-brand-color.js "Real Santander" --pais CO   el país del club (si el nombre o el clubId está en data/clubs.js, sale de ahí)
//
// Si la liga que hace falta todavía no está cacheada, bajarla primero:
//   node tools/fetch-brand-color-reference.mjs <slug-liga-footylogos> <nombre-local>
//
// Sin coincidencias (o liga no cacheada) queda anotado en
// tools/brand-color-reference/misses.jsonl (`--misses` lo resume), para
// decidir de vez en cuando qué liga nueva vale la pena cachear, en vez de que
// cada sesión se tope con el mismo hueco sin dejar rastro. No frena el alta.
//
// SIN COINCIDENCIAS EN FOOTYLOGOS: los candidatos de la Wikipedia en
// castellano. Con el país del club, los artículos de OTRO país van al final
// («Real Santander» devolvía primero el «Real Santander Foot-ball Club» de
// Cantabria, España, en vez del de Floridablanca, Colombia). El país del
// artículo: la desambiguación del título («(Colombia)») o el país más nombrado
// en el infobox y la entrada. El elegido pasa a tools/color-candidatos.mjs
// (--pagina). Si su infobox no trae colores (Jaguares de Córdoba), se leen los
// hex de la plantilla de camiseta LOCAL del kit 1 (body1, leftarm1,
// rightarm1, shorts1, socks1): Jaguares, #38B8F5.
// ============================================================================

import { readFileSync, readdirSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { NOMBRE_PAIS_ES } from './alta-club-tablas.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const refDir = resolve(projectRoot, 'tools', 'brand-color-reference');
const missesPath = resolve(refDir, 'misses.jsonl');
// lo que la sesión puede hacer con una falta (antes decía «avisale a Guido para que lo prepopule»: la sesión no tiene a quién avisar)
const QUE_HACER_MISS = '(quedó anotado en tools/brand-color-reference/misses.jsonl; `node tools/lookup-brand-color.js --misses` los resume. Para sumar la liga a la caché: node tools/fetch-brand-color-reference.mjs <slug-liga-footylogos> <nombre-local>. Esto no frena el alta.)';

function logMiss(reason, query, liga) {
  mkdirSync(refDir, { recursive: true });
  appendFileSync(missesPath, JSON.stringify({ ts: new Date().toISOString(), query, liga: liga ?? null, reason }) + '\n', 'utf8');
}

function printMisses() {
  if (!existsSync(missesPath)) { console.log('Sin misses registrados todavía.'); return; }
  const lines = readFileSync(missesPath, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const seen = new Map();
  for (const l of lines) seen.set(`${l.query}${l.liga ? ' --liga ' + l.liga : ''}`, l);
  console.log(`${seen.size} búsqueda(s) distintas sin resultado (${lines.length} intentos en total):\n`);
  for (const [key, l] of seen) console.log(`  "${key}" -- ${l.reason} (última vez: ${l.ts.slice(0, 10)})`);
}

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function listLigas() {
  if (!existsSync(refDir)) return [];
  return readdirSync(refDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

function loadLiga(nombre) {
  return JSON.parse(readFileSync(resolve(refDir, `${nombre}.json`), 'utf8'));
}

// PAÍSES: nombre en castellano (sin tildes) → ISO2, de tools/paises-referencia.json y NOMBRE_PAIS_ES de tools/alta-club-tablas.mjs.
function paisesPorNombre() {
  const m = new Map(Object.entries(NOMBRE_PAIS_ES).map(([iso, n]) => [normalize(n), iso]));
  try { for (const [n, p] of Object.entries(JSON.parse(readFileSync(resolve(projectRoot, 'tools', 'paises-referencia.json'), 'utf8')).paises || {})) if (p.iso2 && !m.has(normalize(n))) m.set(normalize(n), p.iso2); } catch { /* sin la tabla, solo NOMBRE_PAIS_ES */ }
  return m;
}
const nombrePais = (iso) => {
  if (NOMBRE_PAIS_ES[iso]) return NOMBRE_PAIS_ES[iso];
  try { const e = Object.entries(JSON.parse(readFileSync(resolve(projectRoot, 'tools', 'paises-referencia.json'), 'utf8')).paises || {}).find(([, p]) => p.iso2 === iso); if (e) return e[0]; } catch { /* sin la tabla */ }
  return iso;
};

// El club en data/clubs.js por clubId, displayName o name: { id, displayName, country } o null.
function clubDelSitio(query) {
  let txt = ''; try { txt = readFileSync(resolve(projectRoot, 'data', 'clubs.js'), 'utf8'); } catch { return null; }
  const q = normalize(query);
  for (const l of txt.split('\n')) {
    const id = l.match(/^\s*'([^']+)':\s*\{/); if (!id) continue;
    const dn = (l.match(/displayName:'((?:[^'\\]|\\.)*)'/) || [])[1]; const nm = (l.match(/\bname:'((?:[^'\\]|\\.)*)'/) || [])[1];
    if (id[1] === query || (dn && normalize(dn) === q) || (nm && normalize(nm) === q)) return { id: id[1], displayName: dn || query, country: (l.match(/country:'([A-Z]{2})'/) || [])[1] || null };
  }
  return null;
}

// País de un artículo de la Wikipedia: la desambiguación del título («Real Santander (Colombia)») o, si no, el país más nombrado en el infobox y
// la entrada (los primeros 5000 caracteres sin <ref>). null si no nombra ninguno.
function paisDelArticulo(titulo, wikitexto, paises) {
  const par = (titulo.match(/\(([^)]+)\)\s*$/) || [])[1]; if (par && paises.has(normalize(par))) return paises.get(normalize(par));
  const t = ` ${normalize(wikitexto.replace(/<ref[^>]*\/>|<ref[^>]*>[\s\S]*?<\/ref>/g, ' ').slice(0, 5000))} `;
  const cuenta = {};
  for (const [n, iso] of paises) { const k = t.split(` ${n} `).length - 1; if (k) cuenta[iso] = (cuenta[iso] || 0) + k; }
  const top = Object.entries(cuenta).sort((a, b) => b[1] - a[1])[0]; return top ? top[0] : null;
}

// Los hex de la plantilla de camiseta LOCAL (kit 1) del infobox: [{ hex, partes: [...] }], el de body1 primero. Las pattern_* (el diseño, una imagen)
// no se leen: el hex es el color de fondo de cada parte.
function camisetaLocal(wikitexto) {
  const por = new Map();
  for (const parte of ['body1', 'leftarm1', 'rightarm1', 'shorts1', 'socks1']) {
    const m = wikitexto.match(new RegExp(`^\\s*\\|?\\s*${parte}\\s*=\\s*#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\\b`, 'm')); if (!m) continue;
    const hex = `#${m[1].toUpperCase()}`; if (!por.has(hex)) por.set(hex, []); por.get(hex).push(parte);
  }
  return [...por].map(([hex, partes]) => ({ hex, partes }));
}

// SIN COINCIDENCIAS EN FOOTYLOGOS: los artículos candidatos de es.wikipedia, con su país; los del país del club primero, los de otro país al final.
async function candidatosWikipedia(nombre, iso2) {
  const UA = { 'user-agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' };
  const api = async (p) => (await fetch(`https://es.wikipedia.org/w/api.php?format=json&${new URLSearchParams(p)}`, { headers: UA })).json();
  const titulos = [];
  for (const q of [`${nombre} club de fútbol`, ...(iso2 ? [`${nombre} ${nombrePais(iso2)}`] : [])]) {
    const s = await api({ action: 'query', list: 'search', srsearch: q, srlimit: '5' });
    for (const x of s.query?.search || []) if (!titulos.includes(x.title)) titulos.push(x.title);
  }
  if (!titulos.length) return [];
  const j = await api({ action: 'query', prop: 'revisions', rvprop: 'content', rvslots: 'main', redirects: '1', titles: titulos.join('|') });
  const paginas = Object.values(j.query?.pages || {}); const paises = paisesPorNombre();
  const arts = titulos.map((t, i) => {
    const p = paginas.find((x) => x.title === t) || paginas.find((x) => normalize(x.title) === normalize(t)); const w = p?.revisions?.[0]?.slots?.main?.['*'] || '';
    return { titulo: p?.title || t, orden: i, wikitexto: w, pais: paisDelArticulo(p?.title || t, w, paises) };
  });
  // primero los artículos de un CLUB (con la ficha de equipo o de club): la búsqueda «<club> <país>» también trae jugadores («Racing Santander»
  // --pais CO daba primero a Johan Carbonero); después, el país
  const esClub = (a) => /\{\{\s*Ficha de (equipo|club)/i.test(a.wikitexto);
  const rango = (a) => (esClub(a) ? 0 : 3) + (!iso2 || a.pais === iso2 ? 0 : a.pais ? 2 : 1);
  return arts.sort((a, b) => rango(a) - rango(b) || a.orden - b.orden);
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const ligaFlag = args.indexOf('--liga');
  const soloLiga = ligaFlag >= 0 ? args[ligaFlag + 1] : null;
  const paisFlag = args.indexOf('--pais');
  const arg = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--liga' && args[i - 1] !== '--pais');
  // el país del club: --pais, o el de data/clubs.js si el nombre o el clubId está ahí (un clubId se busca por su displayName)
  const club = arg ? clubDelSitio(arg) : null;
  const query = club && club.id === arg ? club.displayName : arg;
  const pais = (paisFlag >= 0 ? String(args[paisFlag + 1] || '').toUpperCase() : null) || club?.country || null;

  if (args.includes('--misses')) return printMisses();

  if (args.includes('--list-ligas')) {
    const ligas = listLigas();
    if (!ligas.length) console.log('Sin ligas cacheadas todavía. Correr tools/fetch-brand-color-reference.mjs primero.');
    else ligas.forEach((l) => {
      const d = loadLiga(l);
      console.log(`${l}: ${d.clubs.length} clubes (fuente: ${d.source}, bajado ${d.fetchedAt.slice(0, 10)})`);
    });
    return;
  }

  if (!query) {
    console.error('Uso: node tools/lookup-brand-color.js "<nombre del club o clubId>" [--liga <nombre>] [--pais <ISO2>] [--json]\n   o: node tools/lookup-brand-color.js --list-ligas\n   o: node tools/lookup-brand-color.js --misses');
    process.exit(1);
  }

  const ligas = soloLiga ? [soloLiga] : listLigas();
  if (!ligas.length) {
    console.error('Sin ligas cacheadas -- correr tools/fetch-brand-color-reference.mjs primero.');
    logMiss('sin ninguna liga cacheada todavía', query, soloLiga);
    console.error(QUE_HACER_MISS);
    process.exit(1);
  }

  const q = normalize(query);
  const matches = [];
  let ligaFaltante = false;
  for (const liga of ligas) {
    const path = resolve(refDir, `${liga}.json`);
    if (!existsSync(path)) {
      console.error(`Liga '${liga}' no está cacheada (no existe ${path.replace(projectRoot + '/', '')}).`);
      ligaFaltante = true;
      continue;
    }
    const data = loadLiga(liga);
    for (const club of data.clubs) {
      const hay = normalize(club.name).includes(q) || normalize(club.slug.replace(/-/g, ' ')).includes(q);
      if (hay) matches.push({ liga, ...club });
    }
  }
  if (ligaFaltante && soloLiga) {
    logMiss(`liga '${soloLiga}' pedida explícitamente pero no está cacheada`, query, soloLiga);
    console.error(QUE_HACER_MISS);
  }

  if (json) {
    console.log(JSON.stringify(matches, null, 2));
    return;
  }
  // con el país del club, una coincidencia en la liga de OTRO país no cuenta como encontrada: se muestra marcada y se sigue a la Wikipedia
  const paises = paisesPorNombre(); const isoLiga = (l) => paises.get(normalize(l)) || null;
  const delPais = pais ? matches.filter((m) => !isoLiga(m.liga) || isoLiga(m.liga) === pais) : matches;
  if (pais && delPais.length < matches.length) for (const m of matches.filter((x) => !delPais.includes(x))) console.log(`OJO: footylogos tiene «${m.name}» en la liga '${m.liga}' (${nombrePais(isoLiga(m.liga))}), de otro país que el club (${nombrePais(pais)}): no se toma.`);
  if (!delPais.length) {
    console.log(`Sin coincidencias para "${query}"${pais ? ` (${nombrePais(pais)})` : ''} en: ${ligas.join(', ')}. Puede que la liga del club todavía no esté cacheada, o que el club no esté en footylogos.`);
    if (!ligaFaltante) {
      logMiss('sin coincidencias en ninguna liga cacheada', query, soloLiga);
      console.log(QUE_HACER_MISS);
    }
    // el club no está en footylogos: la capa 1 de club-nuevo.md por programa (infobox y camiseta de la Wikipedia del país, gratis; con --gemini, la camiseta local con fuentes, unos US$ 0,02)
    const arts = await candidatosWikipedia(query, pais);
    console.log(`\nArtículos de es.wikipedia${pais ? ` (club de ${nombrePais(pais)}${paisFlag >= 0 ? ', por --pais' : club ? `, de data/clubs.js (${club.id})` : ''}; los de otro país, al final)` : ' (sin país del club: pasá --pais <ISO2> para no tomar uno de otro país)'}:`);
    arts.forEach((a, i) => console.log(`  ${i + 1}. ${a.titulo}  [${a.pais ? nombrePais(a.pais) : 'país no identificado'}]${pais && a.pais && a.pais !== pais ? '  <- otro país' : ''}`));
    const elegido = arts[0];
    if (!elegido) { console.log('  (ninguno)'); return; }
    if (pais && elegido.pais && elegido.pais !== pais) console.log(`OJO: artículo de otro país (${nombrePais(elegido.pais)}); el club es de ${nombrePais(pais)}. Buscá el artículo a mano y pasalo con: node tools/color-candidatos.mjs "${query}" --pagina "<título>"`);
    console.log(`\nCandidatos de la Wikipedia (node tools/fos.mjs color-club "<club>" --gemini suma la camiseta local con fuentes):`);
    spawnSync('node', [resolve(projectRoot, 'tools', 'color-candidatos.mjs'), query, '--pagina', elegido.titulo], { stdio: 'inherit' });
    // el infobox sin colores (Jaguares de Córdoba): los hex de la plantilla de camiseta local del mismo wikitexto (el de action=raw)
    const conColores = /^\|\s*(colores|colours?|colors?|cores)\s*=\s*\S/im.test(elegido.wikitexto);
    if (!conColores) {
      const kit = camisetaLocal(elegido.wikitexto);
      console.log(kit.length ? `\nPlantilla de camiseta local («${elegido.titulo}»): ${kit.map((k) => `${k.hex} (${k.partes.join(', ')})`).join('; ')}. Es el color de fondo de cada parte; el diseño (pattern_*) no se lee. Sigue sin decidir el brandColor.` : `\nPlantilla de camiseta local («${elegido.titulo}»): sin hex en body1/leftarm1/rightarm1/shorts1/socks1.`);
    }
    return;
  }
  for (const m of delPais) {
    console.log(`[${m.liga}] ${m.name} (footylogos.com/color-codes/${m.slug})`);
    m.swatches.forEach((s, i) => console.log(`  ${i + 1}. ${s.hex}  ${s.label}`));
  }
  console.log('\nOJO: el orden de arriba es el de footylogos (por el escudo), NO asumir que el #1 es la camiseta. Confirmar contra Wikipedia/la liga antes de elegir (club-or-year-onboarding/club-nuevo.md).');
}

await main();

#!/usr/bin/env node
// ============================================================================
// tools/segunda-fuente-liga.mjs — la SEGUNDA FUENTE de la lista de equipos de una liga-temporada (regla «la liga de un año necesita dos fuentes
// independientes», Admin/CONVENCIONES-DATOS.md; diseño aprobado por la Auditora 5, sección 7).
//
// POR QUÉ. La lista de equipos de cada liga-temporada (tools/club-league-reference/<iso>.json) sale de una sola página de Wikipedia, y Wikipedia se
// equivocó o confundió más de una vez: RAAL La Louvière 2021 contra «La Louvière Centre» (otro club), la tabla de estadios de la segunda chipriota
// 2023-24 sin uno de sus 16 equipos, Omonia 29M 4.º en la fase regular y 2.º en la ronda final. Esta tool baja la tabla de posiciones de OTRA
// fuente, sin IA, y la guarda al lado de la de Wikipedia, en `fuentes` de esa liga-temporada. No asigna ni corrige ninguna liga: nunca toca
// data/club-leagues/. Lo que se compara (el club está en las dos listas o no) lo dice audit.js (`liga-una-fuente`, `liga-fuentes-no-coinciden`).
//
// FUENTES QUE SE LEEN. RSSSF (rsssf.org, HTML estático con las tablas en texto). worldfootball.net responde 403 a una lectura mecánica y queda
// descartado; cualquier otro sitio que responda 403, 429 o pida un desafío también se descarta: esta tool NO esquiva ningún bloqueo.
// Buenas maneras: un User-Agent que dice quién es, al menos un segundo entre pedidos, y lo bajado queda en Generados/fuentes-liga/ (no se
// publica ni se trackea) para no pedirlo dos veces.
//
// CÓMO LEE LA TABLA (RSSSF). La sección de la división se elige por su NOMBRE (--tabla, «Liga Portugal 2»): el enlace del índice de la página con
// ese texto exacto, o la única línea suelta que lo contiene; si no la identifica, frena (ver tablaRsssf). De esa sección, la primera tabla de
// posiciones: filas seguidas «N.Equipo   PJ G E P …». La tabla termina en la primera línea no vacía que no es una fila ni un separador de guiones,
// o en la sección siguiente. COMPUERTA: si no encuentra la tabla o da MENOS equipos que la lista de Wikipedia de esa liga-temporada, no escribe nada y lo dice.
//
// USO:
//   node tools/segunda-fuente-liga.mjs "<url>" <leagueId> <año> --pais <iso2> --tabla "<título de la tabla>"           ensayo: dice qué leyó
//   node tools/segunda-fuente-liga.mjs ... --escribir                                                                   y lo guarda en la caché
//   Ej.: node tools/segunda-fuente-liga.mjs "https://www.rsssf.org/tablesc/cyp2024.html" cy-seconddivision 2024 --pais cy --tabla "2023/24 Cypriot Second Division"
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const DESCARGAS = resolve(ROOT, 'Generados', 'fuentes-liga');
const UA = 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)';
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

// Lo bajado, con caché en disco y un segundo entre pedidos (la marca del último pedido queda al lado de las descargas)
async function bajar(url) {
  const u = new URL(url); const archivo = resolve(DESCARGAS, u.hostname, `${u.pathname.replace(/^\/+/, '').replace(/[^a-zA-Z0-9._-]+/g, '_') || 'index'}${u.search ? `_${u.search.replace(/[^a-zA-Z0-9]+/g, '_')}` : ''}`);
  if (existsSync(archivo)) return { texto: decodificar(readFileSync(archivo)), deCache: true, archivo };
  const marca = resolve(DESCARGAS, '.ultimo-pedido'); const ultimo = existsSync(marca) ? Number(readFileSync(marca, 'utf8')) || 0 : 0;
  const espera = ultimo + 1000 - Date.now(); if (espera > 0) await new Promise((r) => setTimeout(r, espera));
  mkdirSync(dirname(archivo), { recursive: true }); writeFileSync(marca, String(Date.now()));
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) return { error: `${url} respondió ${res.status}: ${res.status === 403 || res.status === 429 ? 'el sitio no deja leer de forma mecánica; se descarta (no se esquiva)' : 'no se pudo leer'}` };
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(archivo, buf); // los bytes como llegaron: decodificar() decide la codificación al leer (antes se guardaba el texto como latin1 y una página utf-8 perdía letras)
  return { texto: decodificar(buf), deCache: false, archivo };
}

// LA PÁGINA, DECODIFICADA (frenados-por-script, Onboarding 9): RSSSF sirve iso-8859-1, algunas páginas declaran utf-8 y otras vienen en UTF-16 con BOM
// (grk2021, rus2022, rus2023: leídas como latin1 dejaban un NUL entre cada letra y el título no aparecía). La caché guarda los bytes tal cual llegaron.
export function decodificar(buf) {
  if (buf[0] === 0xff && buf[1] === 0xfe) return buf.subarray(2).toString('utf16le');
  if (buf[0] === 0xfe && buf[1] === 0xff) { const b = Buffer.from(buf.subarray(2)); b.swap16(); return b.toString('utf16le'); }
  return /charset=["']?utf-8/i.test(buf.subarray(0, 2048).toString('latin1')) ? buf.toString('utf8') : buf.toString('latin1');
}

// QUÉ SECCIÓN ES LA DE LA LIGA (frenados-por-script, Onboarding 9). Una página de RSSSF trae varias divisiones y arriba un ÍNDICE de enlaces
// <a href="#x">División</a> a sus secciones <a name="x">. Antes se tomaba la primera aparición del título, que es la del índice, y la primera tabla
// que seguía, que es la de la PRIMERA división: frenaban todas las segundas (Challenger Pro League, Liga Portugal 2, Super League 2, Championship,
// Eerste Divisie) y, con el mismo número de equipos, la compuerta dejaba pasar la tabla equivocada. Ahora se elige por el NOMBRE, nunca por la posición:
//   1. un enlace del índice (los <a href="#…"> antes de la primera sección) cuyo texto es EXACTAMENTE el título (sin acentos ni puntuación): su sección;
//      «Liga Portugal» no es «Liga Portugal 2»;
//   2. si el índice no lo nombra: la ÚNICA línea fuera de un enlace del índice que contiene el título como palabra entera (un encabezado
//      suelto, Chipre 2023-24; «Liga Portugal» no coincide con «Liga Portugal 2»);
//   3. si no hay ninguna o hay más de una: frena («no identifico la sección»), no adivina.
// La tabla es la primera de la sección y tiene que empezar antes de la sección siguiente del índice (las sub-anclas de adentro, «Periode 1»,
// «Group Stage», no cortan). Solo la primera: en la sección de la Liga Portugal 2 hay un playoff con equipos de la Liga 3.
const limpiar = (l) => l.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
// Una fila: «N.Equipo   PJ G E P …» con dos espacios o más antes de los partidos; si no, con UNO solo pero seguido de PJ G E P y los goles
// («7.Grasshopper-Club Zürich 36 10 11 15  45-54», Suiza 2011-12): sin los goles, «Schalke 04 34 …» cortaría el nombre en «Schalke».
// La posición «-.» es un equipo que se retiró a mitad de temporada y sigue en la tabla («-.Neuchâtel Xamax  18 …  Withdrew», Suiza 2011-12).
const FILA = /^\s*(\d{1,2}|-)\.\s*(.+?)\s{2,}\d+\s/;
const FILA_UN_ESPACIO = /^\s*(\d{1,2}|-)\.\s*(.+?)\s\d+\s+\d+\s+\d+\s+\d+\s+\d+\s*-\s*\d+/;
// Sin el punto de la posición (las amateurs belgas: « 1  Nombre del club   30  22  5  3  71  69- 20»): solo con PJ G E P, puntos y goles a favor y en contra, para no cortar «1860 München».
const FILA_SIN_PUNTO = /^\s*(\d{1,2})\s{1,3}(\S.*?)\s{1,}\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s*-\s*\d+/;
export function tablaRsssf(html, titulo) {
  const crudas = html.split(/\r?\n/); const lineas = crudas.map(limpiar); const t = norm(titulo);
  const iSecciones = crudas.findIndex((l) => /<a\s+name=/i.test(l)); const finIndice = iSecciones < 0 ? crudas.length : iSecciones;
  const indice = []; // [{ nombre del ancla, texto }]
  for (let i = 0; i < finIndice; i++) for (const m of crudas[i].matchAll(/<a\s+href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) indice.push({ ancla: m[1], texto: norm(limpiar(m[2])) });
  const anclaDe = (n) => crudas.findIndex((l, i) => i >= finIndice && new RegExp(`<a\\s+name="${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i').test(l));
  let i0 = -1; let como = '';
  const exactos = indice.filter((x) => x.texto === t);
  if (exactos.length === 1) { i0 = anclaDe(exactos[0].ancla); como = `índice → sección «${exactos[0].ancla}»`; if (i0 < 0) return { error: `el índice nombra «${titulo}» (#${exactos[0].ancla}) pero la página no tiene esa sección` }; }
  else if (exactos.length > 1) return { error: `el índice nombra «${titulo}» ${exactos.length} veces: no identifico la sección` };
  else {
    // el título ENTERO (Auditora 6): «Liga Portugal» no está en «Liga Portugal 2». Se compara sobre la línea sin acentos pero CON su puntuación
    // (norm() la vuelve espacios y «Liga Portugal 2» dejaría un espacio después del título): antes, el comienzo o algo que no es letra ni dígito;
    // después, el fin de la línea o un signo de puntuación (con espacios o sin), nunca otra palabra ni un número.
    const plano = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
    const entero = new RegExp(`(^|[^\\p{L}\\p{N}])${plano(titulo).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=\\s*$|\\s*[^\\p{L}\\p{N}\\s])`, 'u');
    const sueltas = lineas.map((l, i) => i).filter((i) => !/<a\s+href="#/i.test(crudas[i]) && entero.test(plano(lineas[i])));
    if (sueltas.length !== 1) return { error: sueltas.length ? `«${titulo}» aparece en ${sueltas.length} líneas (L${sueltas.slice(0, 4).map((i) => i + 1).join(', L')}) y ninguna es del índice: no identifico la sección` : `no encuentro «${titulo}» en la página` };
    i0 = sueltas[0]; como = 'línea suelta';
  }
  const anclasIndice = new Set(indice.map((x) => x.ancla));
  let fin = crudas.length;
  for (let i = i0 + 1; i < crudas.length; i++) { const m = crudas[i].match(/<a\s+name="([^"]+)"/i); if (m && anclasIndice.has(m[1])) { fin = i; break; } }
  const equipos = []; let empezo = false;
  for (let i = i0 + 1; i < fin; i++) {
    const m = FILA.exec(lineas[i]) || FILA_UN_ESPACIO.exec(lineas[i]) || FILA_SIN_PUNTO.exec(lineas[i]);
    if (m) { empezo = true; equipos.push({ pos: m[1] === '-' ? null : Number(m[1]), nombre: m[2].trim(), linea: i + 1 }); continue; }
    if (/^[\s\-=_.]+$/.test(lineas[i])) continue; // «- - - - -» entre la zona de ascenso y la de descenso (Chipre 2023-24, L677)
    if (empezo && lineas[i].trim()) break;
  }
  if (!equipos.length) return { error: `en la sección de «${titulo}» (L${i0 + 1}, ${como}) no hay una tabla de posiciones (filas «N.Equipo  PJ G E P …») antes de la sección siguiente` };
  return { equipos, lineaTitulo: i0 + 1, como };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
  // --pendientes: toma de `audit.js --json` las ligas-año que tienen UNA sola fuente (`liga-una-fuente`) e intenta la segunda con --auto en cada una. Nunca frena: lo que no sale lo dice y queda para la sesión.
  if (A.includes('--pendientes')) {
    const { spawnSync } = await import('node:child_process'); const { readdirSync } = await import('node:fs');
    const au = spawnSync('node', [resolve(ROOT, 'tools', 'audit.js'), '--json'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
    let hallazgos = []; try { hallazgos = JSON.parse(au.stdout).findings.filter((f) => f.code === 'liga-una-fuente'); } catch { /* sin auditoría: nada */ }
    const isos = readdirSync(REF).filter((f) => /^[a-z]{2}\.json$/.test(f)).map((f) => f.slice(0, 2));
    let hechas = 0;
    for (const h of hallazgos) {
      const liga = h.msg.split(':')[0]; const anios = [...new Set([...h.msg.matchAll(/\b[a-z0-9]+-[a-z]{2} (\d{4})\b/g)].map((m) => m[1]))];
      const iso = isos.find((i) => { try { return JSON.parse(readFileSync(resolve(REF, `${i}.json`), 'utf8')).leagues?.[liga]; } catch { return false; } });
      for (const y of anios) {
        if (!iso) { console.log(`  ${liga} ${y}: ninguna caché tiene esta liga`); continue; }
        const r = spawnSync('node', [import.meta.filename, '--auto', liga, y, '--pais', iso, ...(A.includes('--escribir') ? ['--escribir'] : [])], { cwd: ROOT, encoding: 'utf8' });
        const ult = (r.stderr || r.stdout || '').trim().split('\n').filter(Boolean).pop() || '';
        console.log(`  ${liga} ${y}: ${r.status === 0 ? `segunda fuente ${A.includes('--escribir') ? 'guardada' : 'leída (ensayo)'}` : ult.slice(0, 200)}`);
        if (r.status === 0) hechas++;
      }
    }
    console.log(`segunda fuente de liga: ${hechas} guardada(s) de ${hallazgos.length} liga(s) con una sola fuente`);
    process.exit(0);
  }
  let [url, leagueId, anio] = A.filter((a, i) => !a.startsWith('--') && !['--pais', '--tabla'].includes(A[i - 1]));
  const pais = flag('--pais'); let titulo = flag('--tabla'); const ESCRIBIR = A.includes('--escribir');
  // --auto <ligaId> <año> --pais <iso2>: la url y el título de la tabla salen de otro año de la MISMA liga que ya tiene su segunda fuente en la caché (la url cambia el año; el título, la temporada).
  if (A.includes('--auto')) {
    [leagueId, anio] = A.filter((a, i) => !a.startsWith('--') && !['--pais', '--tabla'].includes(A[i - 1]));
    const c = existsSync(resolve(REF, `${pais}.json`)) ? JSON.parse(readFileSync(resolve(REF, `${pais}.json`), 'utf8')) : null;
    const ys = c?.leagues?.[leagueId] || {}; const y = Number(anio);
    const ref = Object.entries(ys).filter(([k, e]) => Number(k) !== y && (e.fuentes || []).some((f) => f.tipo === 'rsssf')).sort((a, b) => Math.abs(a[0] - y) - Math.abs(b[0] - y))[0];
    if (!ref) { console.error(`NO SE ESCRIBE: ${leagueId} no tiene otro año con segunda fuente de RSSSF de donde sacar la url y el título (se da a mano: url, liga, año, --pais, --tabla)`); process.exit(2); }
    const ry = Number(ref[0]); const f = ref[1].fuentes.find((x) => x.tipo === 'rsssf');
    const m = /^(.*?)(\d{4}|\d{2})(\.html?)$/.exec(f.url); if (!m) { console.error(`NO SE ESCRIBE: la url de referencia ${f.url} no termina en un año`); process.exit(2); }
    const nuevo = m[2].length === 4 ? String(y + (Number(m[2]) - ry)) : String((y + (Number(m[2]) - (ry % 100))) % 100).padStart(2, '0');
    url = `${m[1]}${nuevo}${m[3]}`;
    const temporadas = (a) => [`${a - 1}/${String(a).slice(2)}`, `${a - 1}-${String(a).slice(2)}`, `${a - 1}/${a}`, `${a - 1}-${a}`, `${a}`];
    titulo = f.tabla; for (const [k, s] of temporadas(ry).entries()) if (titulo.includes(s)) { titulo = titulo.replace(s, temporadas(y)[k]); break; }
  }
  if (!url || !leagueId || !anio || !pais || !titulo) { console.error('Uso: node tools/segunda-fuente-liga.mjs "<url>" <leagueId> <año> --pais <iso2> --tabla "<título>" [--escribir]   |   --auto <ligaId> <año> --pais <iso2> [--escribir]   |   --pendientes [--escribir]'); process.exit(1); }
  const cachePath = resolve(REF, `${pais}.json`);
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf8')) : null;
  const entrada = cache?.leagues?.[leagueId]?.[anio];
  if (!entrada) { console.error(`NO SE ESCRIBE: ${leagueId} ${anio} no tiene la lista de Wikipedia en tools/club-league-reference/${pais}.json (primero fetch-club-league-reference.mjs)`); process.exit(1); }
  const b = await bajar(url);
  if (b.error) { console.error(`NO SE ESCRIBE: ${b.error}`); process.exit(1); }
  const t = tablaRsssf(b.texto, titulo);
  if (t.error) { console.error(`NO SE ESCRIBE: ${t.error}`); process.exit(1); }
  const wiki = entrada.clubs || [];
  console.log(`${url}${b.deCache ? ' (de la caché local)' : ''}: «${titulo}» en la L${t.lineaTitulo} (${t.como}), ${t.equipos.length} equipos; Wikipedia (${entrada.wikipediaPage}): ${wiki.length}`);
  for (const e of t.equipos) console.log(`  ${String(e.pos ?? '-').padStart(2)}. ${e.nombre}  (L${e.linea})${wiki.some((w) => norm(w) === norm(e.nombre)) ? '' : '  · el nombre no está igual en Wikipedia'}`);
  if (t.equipos.length < wiki.length) { console.error(`NO SE ESCRIBE: la tabla da ${t.equipos.length} equipos y Wikipedia ${wiki.length}`); process.exit(1); }
  if (!ESCRIBIR) { console.log('Ensayo: no se escribió nada (--escribir para guardarlo en la caché).'); process.exit(0); }
  const host = new URL(url).hostname.replace(/^www\./, '');
  const tipo = /rsssf/.test(host) ? 'rsssf' : host;
  const wikiFuente = { tipo: 'wikipedia', url: `https://${entrada.lang || 'en'}.wikipedia.org/wiki/${encodeURIComponent(String(entrada.wikipediaPage).replace(/ /g, '_'))}` };
  const otras = (entrada.fuentes || []).filter((f) => f.tipo !== 'wikipedia' && f.tipo !== tipo);
  entrada.fuentes = [wikiFuente, ...otras, { tipo, url, tabla: titulo, fetchedAt: new Date().toISOString(), equipos: t.equipos.map((e) => e.nombre) }];
  writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n', 'utf8');
  console.log(`Guardado en tools/club-league-reference/${pais}.json -- leagues.${leagueId}.${anio}.fuentes (${entrada.fuentes.length} fuentes)`);
}

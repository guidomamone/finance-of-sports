#!/usr/bin/env node
// ============================================================================
// tools/listas-lote.mjs — BAJA EN LOTE LAS LISTAS DE EQUIPOS QUE FALTAN, CON UNA COMPUERTA.
//
// POR QUÉ. tools/faltantes-liga.mjs necesita la lista completa de cada liga-año, y tools/fetch-club-league-reference.mjs la baja de a una
// con un título de Wikipedia que alguien confirma a mano (resolve-wikipedia-season-page.mjs imprime candidatos). Para decenas de
// liga-años eso es tiempo de sesión. Acá la confirmación es una COMPUERTA: una página se acepta solo si su lista contiene a TODOS los
// clubes del sitio que data/club-leagues/ pone en esa liga-año (y tiene entre 8 y 40 equipos). Si ningún título la pasa, no se escribe nada.
//
// QUÉ BAJA. Cada liga-año donde el sitio tiene algún club (data/club-leagues/, el año del club llevado a la temporada por su fecha de
// cierre, como en faltantes-liga.mjs) y no hay lista en la caché. Títulos que prueba, en orden: los de NOMBRES (la API sigue las
// redirecciones: "2023 Argentine Primera División" -> "2023 AFA Liga Profesional de Fútbol"), en formato "2023–24 X" y "2024 X";
// después los primeros 5 resultados de la búsqueda de Wikipedia.
//
// USO:
//   node tools/listas-lote.mjs                 baja y guarda lo que pasa la compuerta; imprime lo que no
//   node tools/listas-lote.mjs --ensayo        lo mismo sin escribir la caché
//   node tools/listas-lote.mjs --revalidar     vuelve a bajar TODA la caché con --comparar: qué lista cambiaría con las reglas de hoy
// ============================================================================
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { lineasResumen } from './listas-lote-resumen.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const FETCH = resolve(ROOT, 'tools', 'fetch-club-league-reference.mjs');
const { cierreDelClub } = createRequire(import.meta.url)('./cierre-ejercicio.js');

// Nombre de la liga en la Wikipedia en inglés, y si la temporada cruza dos años.
const NOMBRES = {
  'ar-primera': ['Argentine Primera División', null], 'ar-primeranacional': ['Primera Nacional', null], 'ar-primerab': ['Primera B Metropolitana', null],
  'be-proleague': ['Belgian Pro League', true], 'be-challengerproleague': ['Challenger Pro League', true], 'be-div1amateur': ['Belgian National Division 1', true],
  'be-div2amateur': ['Belgian Division 2', true], 'cl-primera': ['Chilean Primera División', false], 'de-bundesliga': ['Bundesliga', true],
  'de-2bundesliga': ['2. Bundesliga', true], 'dk-superliga': ['Danish Superliga', true], 'es-laliga': ['La Liga', true],
  'es-segunda': ['Segunda División', true], 'hr-hnl': ['Croatian Football League', true], 'it-seriec': ['Serie C', true],
  'jp-j1': ['J1 League', false], 'mx-ligamx': ['Liga MX', true], 'pe-liga1': ['Liga 1 (Peru)', false], 'ru-pervayaliga': ['Russian First League', true],
};

// Ligas sin página en la Wikipedia en inglés: el título en otro idioma, en las dos formas ("2019-20" y "2021"), y la sección de
// equipos. Se prueban solo si ningún título en inglés pasó la compuerta, con la misma compuerta (tamaño y todos los clubes del sitio).
const OTRO_IDIOMA = {
  'ar-primerab': { lang: 'es', titulos: (a) => [`Campeonato de Primera B ${a - 1}-${String(a).slice(2)} (Argentina)`, `Campeonato de Primera B ${a} (Argentina)`], seccion: 'Equipos participantes' },
};

// nombres viejos de la liga en los títulos de Wikipedia ("2016–17 Primera B Nacional")
const OTROS_NOMBRES = {
  'ar-primeranacional': ['Primera B Nacional'],
  // Bélgica: la liga de cada escalón de la pirámide con sus nombres de antes y después de la reforma
  // de 2016 (antes, Second / Third / Fourth Division; 2016-17 a 2019-20, First Division A y B y First / Second Amateur Division)
  'be-proleague': ['Belgian First Division A'], 'be-challengerproleague': ['Belgian First Division B', 'Belgian Second Division'],
  'be-div1amateur': ['Belgian First Amateur Division', 'Belgian Third Division'], 'be-div2amateur': ['Belgian Second Amateur Division', 'Belgian Fourth Division'],
};
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
  return { CI: ci.window.CLUB_INDEX, CL: cl.window.CLUB_LEAGUE_BY_YEAR, SIZE: cl.window.LEAGUE_SIZE_BY_YEAR || {}, CLUBS: vm.runInContext('clubs', ctx), cache, alias };
}

// Wikipedia corta con "You are making too many requests": una pausa entre pedidos y, si igual corta, reintentos con espera creciente.
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const PAUSA = 1500;
async function wiki(args) {
  for (let i = 0; i < 4; i++) {
    await dormir(PAUSA * (i ? 4 * i : 1));
    try { const out = execFileSync('node', [FETCH, ...args], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); return JSON.parse(out.trim().split('\n').pop()); }
    catch (e) { if (!/too many requests|not valid JSON|Unexpected token/i.test(String(e.stderr || '') + e.message)) return null; }
  }
  return null;
}
async function buscar(q) {
  for (let i = 0; i < 4; i++) {
    await dormir(PAUSA * (i ? 4 * i : 1));
    const r = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=5`, { headers: { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' } });
    const t = await r.text(); try { return (JSON.parse(t).query?.search || []).map((x) => x.title); } catch { /* corte por exceso: reintenta */ }
  }
  return [];
}

async function main() {
  const { CI, CL, CLUBS, cache, alias, SIZE } = cargar();
  if (process.argv.includes('--posiciones')) {
    // a cada liga-año guardada sin `posiciones` le suma el orden final de la tabla, sin tocar `clubs`. Escribe cada país
    // apenas termina (un corte a la mitad no pierde lo hecho).
    const { writeFileSync } = await import('node:fs'); let con = 0, sin = 0;
    for (const [iso, j] of Object.entries(cache)) {
      for (const [liga, ys] of Object.entries(j.leagues)) for (const [y, r] of Object.entries(ys)) {
        if (r.posiciones) continue;
        const x = await wiki([r.wikipediaPage, liga, y, '--pais', iso, '--lang', r.lang || 'en', '--json']);
        if (x?.posiciones && x.posiciones.length >= 0.8 * r.clubs.length) { r.posiciones = x.posiciones; con++; } else sin++;
      }
      writeFileSync(resolve(REF, `${iso}.json`), JSON.stringify(j, null, 2) + '\n', 'utf8');
      console.log(`${iso}: listo (${con} con posiciones hasta acá, ${sin} sin)`);
    }
    console.log(`posiciones: ${con} liga-años con tabla final, ${sin} sin`); return;
  }
  if (process.argv.includes('--contra-cache')) {
    // --revalidar compara la regla vieja con la nueva EN LA MISMA corrida: un cambio que afecta a las dos (el filtro de estadios de
    // cleanWikilinkCell) no se ve. Esto compara lo que baja hoy con lo GUARDADO. Primero sin --aplicar, leyendo cada diferencia;
    // después `--aplicar liga:año,liga:año` guarda SOLO esas.
    // MEDIDO: una regla automática ("aplicar si solo saca nombres") sacaba clubes reales (Huila y Quindío en Colombia 2021).
    // Por eso --aplicar recibe la lista EXPLÍCITA de liga:año a guardar, decidida leyendo la corrida sin --aplicar.
    const { writeFileSync } = await import('node:fs'); const iA = process.argv.indexOf('--aplicar');
    const aplicarSet = iA >= 0 ? new Set((process.argv[iA + 1] || '').split(',').filter(Boolean)) : null; let n = 0, dif = 0, hechos = 0;
    for (const [iso, j] of Object.entries(cache)) {
      let tocado = false;
      for (const [liga, ys] of Object.entries(j.leagues)) for (const [y, r] of Object.entries(ys)) {
        if (aplicarSet && !aplicarSet.has(`${liga}:${y}`)) continue;
        n++; const x = await wiki([r.wikipediaPage, liga, y, '--pais', iso, '--lang', r.lang || 'en', '--json']); if (!x) continue;
        const sale = r.clubs.filter((c) => !x.teams.includes(c)), entra = x.teams.filter((c) => !r.clubs.includes(c));
        if (!sale.length && !entra.length) continue;
        dif++; console.log(`DIFIERE ${liga} ${y}: sale ${sale.join(', ') || '-'} | entra ${entra.join(', ') || '-'}`);
        if (aplicarSet) { r.clubs = x.teams; if (x.posiciones) r.posiciones = x.posiciones; else delete r.posiciones; r.fetchedAt = new Date().toISOString(); tocado = true; hechos++; }
      }
      if (tocado) writeFileSync(resolve(REF, `${iso}.json`), JSON.stringify(j, null, 2) + '\n', 'utf8');
    }
    console.log(`contra-cache: ${n} listas, ${dif} difieren${aplicarSet ? `, ${hechos} actualizadas` : ''}`); return;
  }
  if (process.argv.includes('--revalidar')) {
    let n = 0, cambian = 0;
    for (const [iso, j] of Object.entries(cache)) for (const [liga, ys] of Object.entries(j.leagues)) for (const [y, r] of Object.entries(ys)) {
      n++; const c = await wiki([r.wikipediaPage, liga, y, '--pais', iso, '--lang', r.lang || 'en', '--comparar']);
      if (c && !c.igual && !c.sinTablas) { cambian++; console.log(`CAMBIA ${liga} ${y} (${r.wikipediaPage}): sale ${c.vieja.filter((x) => !c.nueva.includes(x)).join(', ') || '-'} | entra ${c.nueva.filter((x) => !c.vieja.includes(x)).join(', ') || '-'}`); }
    }
    console.log(`revalidar: ${n} listas, ${cambian} cambiarían`); return;
  }
  // liga-años objetivo: { liga, anio, ids }
  const obj = {};
  // --lote <lista>: además, los liga-años de los ejercicios de la lista que todavía no están cargados
  // (un año nuevo no tiene fila en data/club-leagues, así que el modo de siempre no los ve): para el año de cada documento (su fecha de
  // cierre en el registro), cada liga del país con nombre en NOMBRES. La compuerta de la lista es la de siempre (tamaño y todos los clubes
  // del sitio de esa liga-año); la liga del club la decide después la carga (alta-club.mjs: el club en UNA sola lista, nombre o alias).
  const iLote = process.argv.indexOf('--lote');
  if (iLote >= 0) {
    const { clubDeRuta } = await import('./carpetas-clubes.mjs');
    const cierre = new Map(); for (const l of readFileSync(resolve(ROOT, 'Admin/registros/transcripciones-estado.jsonl'), 'utf8').split('\n')) { try { const e = JSON.parse(l); if (e.pdf && e.periodo?.cierre) cierre.set(e.pdf, e.periodo.cierre); } catch { /* línea vacía */ } }
    for (const pdf of readFileSync(resolve(ROOT, process.argv[iLote + 1]), 'utf8').split('\n').map((x) => x.trim()).filter((x) => x && !x.startsWith('#'))) {
      const { clubId } = clubDeRuta(pdf); const c = cierre.get(pdf);
      if (!clubId || !c) continue;
      const iso = clubId.slice(-2); const y = Number(c.slice(0, 4)); const mes = Number(c.slice(5, 7));
      for (const liga of Object.keys(NOMBRES).filter((l) => l.startsWith(`${iso}-`))) {
        const anio = NOMBRES[liga][1] && mes >= 9 ? y + 1 : y;
        if (cache[iso]?.leagues?.[liga]?.[anio]) continue;
        obj[`${liga}|${anio}`] ??= { liga, anio, iso, ids: new Set(), delLote: true }; // (delLote: viene de un documento de la lista; el resumen cuenta solo estos)
      }
    }
  }
  for (const [id, ys] of Object.entries(CL)) for (const [y, liga] of Object.entries(ys)) {
    if (!NOMBRES[liga]) continue;
    // el cierre de ESE ejercicio (club-index `ci`), como faltantes-liga.mjs: Parma cerró el 30/6 de 2016 a 2019 aunque su regla sea el
    // 31/12, y con la regla su 2017 (Serie C 2016-17) caía en la temporada 2017-18
    const mes = Number((CI[id]?.ci?.[y] || cierreDelClub(CLUBS[id], +y).slice(5)).slice(0, 2)); const partida = NOMBRES[liga][1];
    const anio = partida && mes >= 9 ? +y + 1 : +y;
    const iso = liga.slice(0, 2); if (cache[iso]?.leagues?.[liga]?.[anio]) continue;
    (obj[`${liga}|${anio}`] ??= { liga, anio, iso, ids: new Set() }).ids.add(id);
  }
  const ensayo = process.argv.includes('--ensayo'); const ok = []; const fallan = [];
  for (const o of Object.values(obj).sort((a, b) => a.liga.localeCompare(b.liga) || a.anio - b.anio)) {
    const [nombre, partida] = NOMBRES[o.liga];
    const yy = (n) => String(n).slice(2);
    // con --lote, también los nombres viejos de la liga, antes de la búsqueda
    const titulos = [nombre, ...(iLote >= 0 ? OTROS_NOMBRES[o.liga] || [] : [])].flatMap((n) => [...(partida !== false ? [`${o.anio - 1}–${yy(o.anio)} ${n}`] : []), ...(partida !== true ? [`${o.anio} ${n}`] : [])]);
    // COMPUERTA: (1) el título pedido trae la temporada ("2023–24" o "2024", no "2024–25") y el nombre de la liga: una búsqueda trae
    // páginas de otro año ("2026 Primera Nacional" para 2021) o de otra liga, y nuestros clubes también están ahí; (2) si club-leagues
    // sabe cuántos equipos jugó la liga ese año, coincide; si no, entre 8 y 40; (3) están TODOS los clubes del sitio de esa liga-año.
    const temporadaOk = (t) => t.includes(`${o.anio - 1}–${yy(o.anio)}`) || new RegExp(`(^|\\D)${o.anio}(?![–\\d-])`).test(t);
    const ligaOk = (t) => [nombre, ...(OTROS_NOMBRES[o.liga] || [])].some((x) => norm(t).includes(norm(x)));
    const tam = SIZE[o.liga]?.[o.anio];
    let hecho = null; const probados = new Set(); let mejor = null;
    const nombresDe = (id) => [CI[id]?.n, CLUBS[id]?.displayName, CLUBS[id]?.name, ...Object.entries(alias[o.iso] || {}).filter(([, a]) => a.clubId === id).map(([n]) => n)].filter(Boolean);
    // una liga por grupos (Serie C: 3 de 20) puede pasar los 40: el tope es 40 por grupo
    const prueba = (t, r, extra) => {
      const faltan = [...o.ids].filter((id) => !r.teams.some((tm) => nombresDe(id).some((n) => pega(n, tm))));
      const tamOk = tam ? r.teams.length === tam : r.teams.length >= 8 && r.teams.length <= 40 * (r.grupos || 1);
      if (tamOk && !faltan.length) { hecho = { t, r, extra }; return true; }
      if (!mejor || faltan.length < mejor.faltan.length) mejor = { t, n: r.teams.length, faltan, teams: r.teams };
      return false;
    };
    for (const t of [...titulos, ...(await buscar(`${titulos[0]}`))]) {
      if (probados.has(t) || probados.size >= 7) continue; probados.add(t);
      if (!temporadaOk(t) || !ligaOk(t)) continue;
      const r = await wiki([t, o.liga, String(o.anio), '--pais', o.iso, '--json']); if (!r) continue;
      if (prueba(t, r, [])) break;
    }
    const otro = OTRO_IDIOMA[o.liga];
    if (!hecho && otro) for (const t of otro.titulos(o.anio)) {
      const extra = ['--lang', otro.lang, '--section', otro.seccion]; probados.add(`${t} (${otro.lang})`);
      const r = await wiki([t, o.liga, String(o.anio), '--pais', o.iso, ...extra, '--json']); if (!r) continue;
      if (prueba(t, r, extra)) break;
    }
    if (!hecho) {
      fallan.push({ delLote: !!o.delLote, txt: `${o.liga} ${o.anio}${tam ? ` (tamaño conocido ${tam})` : ''}: ${mejor ? `mejor "${mejor.t}" con ${mejor.n} equipos, no encuentra ${mejor.faltan.join(', ') || '(están todos: falla el tamaño)'}${process.argv.includes('--detalle') ? ` | lista: ${mejor.teams.join(', ')}` : ''}` : `ningún título con la temporada y la liga (probados: ${[...probados].join(' / ')})`}` });
      continue;
    }
    ok.push({ delLote: !!o.delLote }); console.log(`OK ${o.liga} ${o.anio}: "${hecho.t}" -> ${hecho.r.teams.length} equipos (${hecho.r.seccion})`);
    if (!ensayo) execFileSync('node', [FETCH, hecho.t, o.liga, String(o.anio), '--pais', o.iso, ...hecho.extra], { cwd: ROOT, stdio: 'ignore' });
  }
  for (const l of lineasResumen({ esLote: iLote >= 0, ok, fallan, ensayo })) console.log(l);
}
main().catch((e) => { console.error(e.message); process.exit(1); });

#!/usr/bin/env node
// ============================================================================
// tools/ligas-sin-verificar.mjs — LA LIGA DE LOS EJERCICIOS CARGADOS QUE data/club-leagues/ TIENE EN null (pedido de Guido:
// "completa"; sin liga no hay página de temporada de dónde leer estadio y sponsor, y el ejercicio no entra en Ligas).
//
// CÓMO. Para cada ejercicio cargado con la liga en null, sin fila o "liga-no-catalogada": las ligas CANDIDATAS son las que data/club-leagues/
// le da al club en otros años. Para cada candidata, la lista de equipos de esa temporada (la caché de tools/club-league-reference/; si no
// está, se baja con tools/fetch-club-league-reference.mjs, con el título de otra temporada guardada de la misma liga cambiando el año).
// COMPUERTA: el club está en UNA sola candidata, con su nombre exacto (sin "FC", "CD"...) o un alias confirmado de alias.json. Si está
// en ninguna o en dos, no se decide. También son candidatas las demás ligas del país con listas.
//
// NO TOCA: los países que está cargando otra sesión (SALTEAR), ni un ejercicio que todavía no cerró (un presupuesto).
//
// USO:
//   node tools/ligas-sin-verificar.mjs              ensayo: qué liga encuentra para cada uno (baja las listas que falten, sin guardarlas)
//   node tools/ligas-sin-verificar.mjs --escribir   guarda las listas, la liga en data/club-leagues/<iso>.js y la evidencia en
//                                                   Admin/carga-clubes/<clubId>.md (sección Liga del año)
// Después de --escribir hay que correr los generadores (los corre esta tool) y tools/estadio-sponsor.mjs --escribir.
// ============================================================================
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const FETCH = resolve(ROOT, 'tools', 'fetch-club-league-reference.mjs');
const { cierreDelClub } = createRequire(import.meta.url)('./cierre-ejercicio.js');
const EV = await import('./evidencia-club.mjs');
const ESCRIBIR = process.argv.includes('--escribir');
const DETALLE = process.argv.includes('--detalle'); // por cada candidata: qué página probó, cuántos equipos, si el club está
const SOLO = process.argv.includes('--club') ? process.argv[process.argv.indexOf('--club') + 1] : null;
// países que carga fos-onboarding en paralelo (Estonia, Bélgica, Suiza, Países Bajos, Colombia, Noruega): no se tocan sus registros
const SALTEAR = new Set(['ee', 'be', 'ch', 'nl', 'co', 'no']);
const HOY = new Date().toISOString().slice(0, 10);

const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['fc', 'cf', 'sc', 'ac', 'afc', 'cd', 'ca', 'club', 'de', 'del', 'the', 'and', 'sad', 'cp', 'fk', 'sk', 'nk', 'sv', 'vfl', 'vfb', 'tsg', 'rcd', 'ud', 'sd', 'rc']);
const corto = (s) => norm(s).split(' ').filter((w) => !STOP.has(w)).join(' ');

function cargar() {
  const ci = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-index.js'), 'utf8'), ci);
  const cl = { window: {} }; for (const f of readdirSync(resolve(ROOT, 'data', 'club-leagues'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-leagues', f), 'utf8'), cl);
  const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
  const cache = {}; for (const f of readdirSync(REF).filter((f) => /^[a-z]{2}\.json$/.test(f))) cache[f.slice(0, 2)] = JSON.parse(readFileSync(resolve(REF, f), 'utf8'));
  return { CI: ci.window.CLUB_INDEX, CL: cl.window.CLUB_LEAGUE_BY_YEAR, CLUBS: vm.runInContext('clubs', ctx), cache, alias: JSON.parse(readFileSync(resolve(REF, 'alias.json'), 'utf8')) };
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
// título de la temporada `anio` a partir de otra página guardada de la misma liga: "2022 Chilean Primera División" -> "2014 ..."
// títulos de la temporada `anio` a partir de otra página guardada de la misma liga, con su idioma y su sección: "2022 Chilean Primera
// División" -> "2014 ..." y también la forma partida "2013–14 ..." (Chile jugó 2013-14 a 2016-17 con calendario europeo), y al revés
// nombres de la temporada que no salen de cambiar el año de otra página: Chile 2011-2017 es "Campeonato Nacional Primera División"
// (y 2013-14 a 2016-17 con calendario europeo); se prueban el año solo y las dos temporadas partidas que lo tocan
const NOMBRES_EXTRA = { 'cl-primera': ['Campeonato Nacional Primera División'] };
function titulosPara(ys, anio, liga) {
  const extra = (NOMBRES_EXTRA[liga] || []).flatMap((n) => [`${anio} ${n}`, `${anio - 1}–${String(anio).slice(2)} ${n}`, `${anio}–${String(anio + 1).slice(2)} ${n}`].map((t) => ({ t, lang: 'en', section: null })));
  return [...titulosBase(ys, anio), ...extra];
}
function titulosBase(ys, anio) {
  const [, r] = Object.entries(ys).sort((x, y) => Math.abs(x[0] - anio) - Math.abs(y[0] - anio))[0] || [];
  if (!r) return []; const t = r.wikipediaPage; const base = { lang: r.lang || 'en', section: r.section && !/escalón|grupos/.test(r.section) ? r.section : null };
  const yy = String(anio).slice(2), partida = `${anio - 1}–${yy}`;
  const mp = t.match(/(\d{4})([–-])(\d{2,4})/);
  if (mp) return [{ ...base, t: t.replace(mp[0], `${anio - 1}${mp[2]}${mp[3].length === 4 ? anio : yy}`) }, { ...base, t: t.replace(mp[0], String(anio)) }];
  if (/\b\d{4}\b/.test(t)) return [{ ...base, t: t.replace(/\b\d{4}\b/, String(anio)) }, { ...base, t: t.replace(/\b\d{4}\b/, partida) }];
  return [];
}
// la lista de una temporada: la guardada, o bajada (fresca = volver a bajar la guardada: a una lista vieja le puede faltar un grupo)
async function lista(liga, anio, iso, ys, fresca = false) {
  if (ys?.[anio] && !fresca) return { teams: ys[anio].clubs, pagina: ys[anio].wikipediaPage, guardada: true };
  const g = ys?.[anio];
  const titulos = g ? [{ t: g.wikipediaPage, lang: g.lang || 'en', section: g.section && !/escalón|grupos/.test(g.section) ? g.section : null }] : titulosPara(ys || {}, anio, liga);
  for (const tt of titulos) {
    await dormir(2500);
    const extra = ['--lang', tt.lang, ...(tt.section ? ['--section', tt.section] : [])];
    try {
      const out = execFileSync('node', [FETCH, tt.t, liga, String(anio), '--pais', iso, ...extra, '--json'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      const j = JSON.parse(out.trim().split('\n').pop()); return { teams: j.teams, pagina: tt.t, lang: tt.lang, extra, guardada: false };
    } catch { /* siguiente título */ }
  }
  return null;
}

async function main() {
  const { CI, CL, CLUBS, cache, alias } = cargar();
  const decididos = [], sinDecidir = [];
  for (const [id, c] of Object.entries(CI)) for (const [y] of c.yrs || []) {
    if (SOLO && id !== SOLO) continue;
    const actual = CL[id]?.[y]; if (actual && actual !== 'liga-no-catalogada') continue;
    const iso = String(c.c || '').toLowerCase(); if (SALTEAR.has(iso)) continue;
    const cierre = c.ci?.[y] ? `${y}-${c.ci[y]}` : cierreDelClub(CLUBS[id], +y);
    if (cierre > HOY) continue; // un ejercicio que no cerró: presupuesto
    const mes = Number(cierre.slice(5, 7));
    // las del club en otros años y las demás del país que tienen listas (un ascenso o un descenso a una liga que el club no jugó otro año)
    const candidatas = [...new Set([...Object.values(CL[id] || {}), ...Object.keys(cache[iso]?.leagues || {})].filter((l) => l && l !== 'liga-no-catalogada'))];
    const nombres = [c.n, CLUBS[id]?.displayName, CLUBS[id]?.name, ...Object.entries(alias[iso] || {}).filter(([, a]) => a.clubId === id).map(([x]) => x)].filter(Boolean);
    const esta = [];
    for (const liga of candidatas) {
      const ys = cache[iso]?.leagues?.[liga];
      // temporada: la misma regla que faltantes-liga (cierre entre septiembre y diciembre en una liga partida -> la que termina en y+1)
      const partida = ys ? /[–-]\d{2,4}\b/.test(Object.values(ys)[0].wikipediaPage) : false;
      const anio = partida && mes >= 9 ? +y + 1 : +y;
      let l = await lista(liga, anio, iso, ys);
      const estaEn = (x) => x?.teams.some((t) => nombres.some((n) => corto(n) === corto(t)));
      // la lista guardada no lo tiene: se vuelve a bajar (le puede faltar un grupo, Super League 2 griega); vale solo si contiene a toda
      // la guardada (es la misma liga, más completa)
      if (l?.guardada && !estaEn(l)) { const f = await lista(liga, anio, iso, ys, true); if (f && estaEn(f) && l.teams.every((t) => f.teams.includes(t))) l = f; }
      // SOLO el nombre exacto (o un alias de tools/club-league-reference/alias.json). MEDIDO: un parcial "único en la lista" daba
      // Novorizontino en la Série A 2010 como "Grêmio" y Dynamo Makhachkala en la Premier rusa 2021-22 como "Dynamo" (el de Moscú)
      if (DETALLE) console.log(`  ${id} ${y} · ${liga} ${anio}: ${l ? `"${l.pagina}" ${l.teams.length} equipos${l.teams.some((t) => nombres.some((n) => corto(n) === corto(t))) ? ' — ESTÁ' : ''}${l.teams.some((t) => nombres.some((n) => corto(t).includes(corto(n).split(' ')[0]))) && !l.teams.some((t) => nombres.some((n) => corto(n) === corto(t))) ? ` (parecido: ${l.teams.filter((t) => nombres.some((n) => corto(t).includes(corto(n).split(' ')[0]))).join(', ')})` : ''}` : 'sin lista (no se pudo bajar)'}`);
      if (l?.teams.some((t) => nombres.some((n) => corto(n) === corto(t)))) esta.push({ liga, anio, ...l });
    }
    if (esta.length === 1) decididos.push({ id, y: +y, iso, actual: actual ?? null, ...esta[0] });
    else sinDecidir.push(`${id} ${y}: ${esta.length ? `en ${esta.length} listas (${esta.map((e) => e.liga).join(', ')})` : `en ninguna lista de ${candidatas.join(', ') || '(sin ligas en otros años)'}`}`);
  }
  for (const d of decididos) console.log(`${d.id} ${d.y}: ${d.liga} (lista "${d.pagina}"${d.guardada ? '' : ', nueva'})`);
  console.log(`\n${decididos.length} decididos, ${sinDecidir.length} sin decidir:`);
  for (const s of sinDecidir) console.log(`  ${s}`);
  if (!ESCRIBIR) { console.log('\nEnsayo: no se escribió nada (--escribir).'); return; }

  for (const d of decididos) {
    if (!d.guardada) execFileSync('node', [FETCH, d.pagina, d.liga, String(d.anio), '--pais', d.iso, ...(d.extra || ['--lang', d.lang || 'en'])], { cwd: ROOT, stdio: 'ignore' });
    const f = resolve(ROOT, 'data', 'club-leagues', `${d.iso}.js`); let src = readFileSync(f, 'utf8');
    const linea = src.split('\n').find((l) => new RegExp(`^\\s*'?${d.id}'?:\\s*\\{`).test(l)); // con espacios de alineación ("'fredericia-dk':     {") o sin comillas ("racing: {")
    if (!linea) { console.error(`  ${d.id}: sin fila en ${d.iso}.js, no se toca`); continue; }
    const nueva = new RegExp(`\\b${d.y}: (null|'liga-no-catalogada')`).test(linea) ? linea.replace(new RegExp(`\\b${d.y}: (null|'liga-no-catalogada')`), `${d.y}: '${d.liga}'`) : linea.replace(/ \},?\s*$/, (m) => `, ${d.y}: '${d.liga}'${m}`);
    src = src.replace(linea, nueva); writeFileSync(f, src, 'utf8');
    const ev = EV.agregarTexto(EV.leer(d.id), d.y, 'Liga', [`tools/ligas-sin-verificar.mjs (${HOY}): ${d.liga}, verificado contra la lista de equipos de "${d.pagina}" (Wikipedia; tools/club-league-reference/${d.iso}.json, ${d.liga} ${d.anio}). Antes: ${d.actual ?? 'sin fila'}.`]);
    EV.guardar(d.id, ev);
  }
  for (const g of ['tools/generate-club-index.js', 'tools/generate-fuentes-page.js', 'tools/generate-rankings.js', 'tools/faltantes-liga.mjs', 'tools/estimar.mjs', 'tools/generate-sponsors.js']) execFileSync('node', [resolve(ROOT, g)], { cwd: ROOT, stdio: 'ignore' });
  console.log(`\nEscrito: ${decididos.length} ligas en data/club-leagues/ y su evidencia; generadores corridos. Falta: tools/estadio-sponsor.mjs --escribir.`);
}
main().catch((e) => { console.error(e.message); process.exit(1); });

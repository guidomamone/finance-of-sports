#!/usr/bin/env node
// ============================================================================
// tools/medir-segunda-fuente.mjs — MIDE la segunda fuente de estadio y capacidad sobre los club-años que hoy están en tools/contexto-manual.json (revisados a mano, con fuente).
//
// QUÉ MIDE. Para cada club-año con estadio y capacidad manual (la verdad de referencia): (1) lo que da Wikidata + el cruce con el artículo de Wikipedia (tools/dato-publico.mjs);
// (2) lo que da OpenStreetMap (Nominatim, `extratags.capacity`) buscando el estadio que propone Wikidata, SIN la cita de Wikidata: es una base independiente de Wikipedia.
// Con eso calcula, para cada tolerancia X de capacidad, cuántos casos acepta la regla «si Wikidata y OSM difieren menos de X %, se toma el de Wikidata» y cuántos de esos aciertan
// (dentro de 3 % de lo manual). Los umbrales de la regla salen de esta tabla (Admin/HALLAZGOS-pipeline.md), no de una suposición.
//
// USO: node tools/medir-segunda-fuente.mjs            baja lo que falta (1 pedido por segundo a OSM, ~250 ms a Wikidata), guarda la caché en Generados/367-medicion.json e imprime la tabla
//      node tools/medir-segunda-fuente.mjs --tabla    solo imprime la tabla con la caché
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import vm from 'node:vm';
import { datoPublico } from './dato-publico.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const CACHE = resolve(ROOT, 'Generados', '367-medicion.json');
const UA = { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; datos publicos de clubes, pocas consultas)' };
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const sinAcentos = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const mismoNombre = (a, b) => { const x = sinAcentos(a), y = sinAcentos(b); return !!x && !!y && (x === y || x.includes(y) || y.includes(x)); };
const TOL_VERDAD = 0.03; // dos capacidades «coinciden» si difieren menos de 3 %

export async function capacidadOSM(nombreEstadio, iso2) {
  const u = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(nombreEstadio)}&format=json&extratags=1&limit=6${iso2 ? `&countrycodes=${iso2.toLowerCase()}` : ''}`;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(20000) });
      if (r.status === 429 || r.status >= 500) { await dormir(3000 * (i + 1)); continue; }
      if (!r.ok) return null;
      const j = await r.json();
      const estadios = j.filter((x) => ['stadium', 'sports_centre', 'pitch'].includes(x.type) || x.extratags?.capacity);
      const el = estadios.find((x) => mismoNombre(x.name || x.display_name?.split(',')[0], nombreEstadio) && x.extratags?.capacity);
      const sinCap = estadios.find((x) => mismoNombre(x.name || x.display_name?.split(',')[0], nombreEstadio));
      const cap = el ? Number(String(el.extratags.capacity).replace(/[^\d]/g, '')) : null;
      return { encontrado: !!(el || sinCap), nombre: (el || sinCap)?.name || null, capacidad: cap > 0 ? cap : null, osm: (el || sinCap) ? `https://www.openstreetmap.org/${(el || sinCap).osm_type}/${(el || sinCap).osm_id}` : null };
    } catch { await dormir(2000); }
  }
  return null;
}

function clubs() {
  const ctx = vm.createContext({ window: {} }); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
  return vm.runInContext('clubs', ctx);
}

async function bajar() {
  const manual = JSON.parse(readFileSync(resolve(ROOT, 'tools', 'contexto-manual.json'), 'utf8')); const C = clubs();
  const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};
  const filas = [];
  for (const [id, anios] of Object.entries(manual)) {
    if (id.startsWith('_') || !C[id]) continue;
    for (const [y, d] of Object.entries(anios)) if (d.estadio && d.capacidad && typeof d.capacidad === 'number') filas.push({ id, y: Number(y), verdad: { estadio: d.estadio, capacidad: d.capacidad } });
  }
  console.log(`${filas.length} club-años con estadio y capacidad manual`);
  let n = 0;
  for (const f of filas) {
    const k = `${f.id}|${f.y}`; if (cache[k] && 'wp' in cache[k]) continue;
    const c = C[f.id]; const fila = { ...f };
    try {
      const r = await datoPublico([c.displayName, c.name].filter(Boolean), { pais: c.country, anio: f.y });
      if (r.error || !r.delAnio || r.delAnio.error) fila.wikidata = { error: r.error || r.delAnio?.error || 'sin dato' };
      else {
        fila.wikidata = { estadio: r.delAnio.estadio, capacidad: r.delAnio.capacidad, confirmadoPorWikipedia: !!r.delAnio.confirmadoPorWikipedia };
        fila.wp = r.delAnio.capacidadWikipedia ?? null; // la capacidad del artículo del estadio en Wikipedia
        // OpenStreetMap quedó medido y descartado como segunda fuente de capacidad (la da en 5 % de los casos): capacidadOSM() se conserva solo para repetir esa medición
      }
    } catch (e) { fila.wikidata = { error: e.message }; }
    cache[k] = fila; n++;
    if (n % 10 === 0) { mkdirSync(dirname(CACHE), { recursive: true }); writeFileSync(CACHE, JSON.stringify(cache)); console.log(`  ${n} bajados`); }
  }
  mkdirSync(dirname(CACHE), { recursive: true }); writeFileSync(CACHE, JSON.stringify(cache));
  return cache;
}

function tabla(cache) {
  const filas = Object.values(cache); const N = filas.length;
  const pc = (a, b) => (b ? `${Math.round((100 * a) / b)} %` : '-');
  const cerca = (a, b, tol = TOL_VERDAD) => a > 0 && b > 0 && Math.abs(a - b) / b <= tol;
  const conWd = filas.filter((f) => f.wikidata && !f.wikidata.error);
  const estOk = (f) => mismoNombre(f.wikidata.estadio, f.verdad.estadio);
  console.log(`\nclub-años con referencia manual: ${N} · con candidato de Wikidata: ${conWd.length} (${pc(conWd.length, N)})`);
  const conf = conWd.filter((f) => f.wikidata.confirmadoPorWikipedia); const noConf = conWd.filter((f) => !f.wikidata.confirmadoPorWikipedia);
  console.log(`\nESTADIO (nombre igual al manual, sin acentos, uno contiene al otro)`);
  console.log(`  confirmado por Wikipedia: ${conf.length} casos, acierta ${conf.filter(estOk).length} (${pc(conf.filter(estOk).length, conf.length)})`);
  console.log(`  solo Wikidata: ${noConf.length} casos, acierta ${noConf.filter(estOk).length} (${pc(noConf.filter(estOk).length, noConf.length)})`);
  const wdCap = conWd.filter((f) => f.wikidata.capacidad);
  console.log(`\nCAPACIDAD (acierta = dentro de ${TOL_VERDAD * 100} % de lo manual; «a 10 %» = dentro de 10 %)`);
  const aciertaWd = wdCap.filter((f) => cerca(f.wikidata.capacidad, f.verdad.capacidad)).length;
  console.log(`  Wikidata da capacidad: ${wdCap.length} (${pc(wdCap.length, N)}), acierta ${aciertaWd} (${pc(aciertaWd, wdCap.length)}), a 10 %: ${wdCap.filter((f) => cerca(f.wikidata.capacidad, f.verdad.capacidad, 0.1)).length}`);
  const conWp = conWd.filter((f) => f.wp);
  console.log(`  el artículo del estadio en Wikipedia da capacidad: ${conWp.length}, acierta ${conWp.filter((f) => cerca(f.wp, f.verdad.capacidad)).length}, a 10 %: ${conWp.filter((f) => cerca(f.wp, f.verdad.capacidad, 0.1)).length}`);
  const ambas = conWd.filter((f) => f.wikidata.capacidad && f.wp);
  console.log(`  las dos dan capacidad: ${ambas.length}`);
  console.log(`\n  REGLA «si Wikidata y el artículo del estadio difieren menos de X %, se toma el del artículo; si no, agente»:`);
  console.log(`  X       acepta   acierta 3 %   acierta 10 %   rechaza   (de lo rechazado, el artículo acertaba a 10 %)`);
  for (const X of [0.01, 0.02, 0.05, 0.1, 0.15, 0.25]) {
    const acep = ambas.filter((f) => Math.abs(f.wikidata.capacidad - f.wp) / Math.max(f.wikidata.capacidad, f.wp) <= X);
    const rech = ambas.filter((f) => !acep.includes(f));
    const ac = (a, t) => a.filter((f) => cerca(f.wp, f.verdad.capacidad, t)).length;
    console.log(`  ${String(Math.round(X * 100)).padStart(2)} %    ${String(acep.length).padStart(4)}      ${String(ac(acep, 0.03)).padStart(4)} (${pc(ac(acep, 0.03), acep.length)})   ${String(ac(acep, 0.1)).padStart(4)} (${pc(ac(acep, 0.1), acep.length)})     ${String(rech.length).padStart(4)}      ${ac(rech, 0.1)}`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const cache = process.argv.includes('--tabla') ? JSON.parse(readFileSync(CACHE, 'utf8')) : await bajar();
  tabla(cache);
}

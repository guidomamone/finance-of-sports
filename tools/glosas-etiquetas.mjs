#!/usr/bin/env node
// ============================================================================
// tools/glosas-etiquetas.mjs — `fos glosas-etiquetas`: LAS ETIQUETAS DE LAS FILAS EN EL IDIOMA DEL VISITANTE (punto 451)
//
// POR QUÉ. Las filas de «Formato del club» salen textuales del balance («Andre finansielle indtægter», «Løn og gager»): es la evidencia de lo que dice la fuente y el JSON del club la conserva
// tal cual (`label`). Pero el visitante lee en español o en inglés (selector de idioma). Este comando arma, por club, una tabla `{etiqueta original -> {es, en}}` en
// `data/<país>/<clubId>-glosas.js` que la pantalla usa para mostrar la glosa en el idioma del visitante con el original en el `title`. El JSON del club no cambia (no es un cambio de contrato).
//
// DE DÓNDE SALE CADA GLOSA. `es`: la `glosa` que glosar-rubros.mjs ya escribió en los Generados/**/*.rubros.json al cargar el documento (gratis). Lo que falta (`es` de un club inglés, `en` de todos
// los que no están en inglés) se pide con `--completar` a Gemini en lotes de 120 etiquetas (centavos; necesita Admin/api-keys/gemini.env). Una glosa ya escrita no se pide de nuevo.
// Se omite la glosa de un idioma si la etiqueta ya está en ese idioma (países de habla hispana para `es`, de habla inglesa para `en`): ahí se muestra el original.
//
// USO (node tools/fos.mjs glosas-etiquetas …)
//   (sin flags)                  ensayo: por país, cuántas etiquetas hay y cuántas glosas faltan (es / en)
//   --escribir                   escribe data/<país>/<clubId>-glosas.js (con las glosas que ya hay) y data/glosas-indice.js (qué clubes tienen); sin tocar la red
//   --completar [--pais xx]      pide a Gemini las glosas que faltan (de ese país o de todos) y escribe; con --max N, solo los primeros N lotes
//   --faltan                     JSON {pais: {es: n, en: n}} (lo lee audit.js)
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
export const HISPANOS = new Set(['ar', 'es', 'cl', 'co', 'mx', 'pe', 'uy', 'py', 'ec', 'bo', 've', 'cr', 'gt', 'pa', 'do']);
export const INGLESES = new Set(['gb', 'ie', 'us', 'au', 'nz', 'ca']);
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^\p{L}\p{N}]+/g, ' ').trim();

// ---- las etiquetas de cada club (líneas, sub-ítems y filas extra) -------------------------------------------------------------
export function etiquetasPorClub() {
  const out = {};
  const dataDir = join(ROOT, 'data');
  for (const iso of readdirSync(dataDir, { withFileTypes: true }).filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name)).map((d) => d.name)) {
    for (const f of readdirSync(join(dataDir, iso)).filter((x) => x.endsWith('.json'))) {
      let j; try { j = JSON.parse(readFileSync(join(dataDir, iso, f), 'utf8')); } catch { continue; }
      const id = f.replace(/\.json$/, ''); const set = new Set();
      for (const y of j.years || []) {
        for (const l of [...(y.revenue || []), ...(y.expenses || [])]) { if (l.label) set.add(l.label); for (const it of l.items || []) if (it[0]) set.add(it[0]); }
        for (const e of y.adjustments?.extra_rows || []) if (e.label) set.add(e.label);
      }
      if (set.size) out[id] = { iso, labels: [...set].sort() };
    }
  }
  return out;
}

// ---- las glosas es de los Generados (por club) --------------------------------------------------------------------------------
function glosasEsDeGenerados() {
  const porClub = {}; const dir = join(ROOT, 'Generados');
  if (!existsSync(dir)) return porClub;
  const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.rubros.json') ? [join(d, e.name)] : []));
  for (const f of walk(dir)) {
    let rj; try { rj = JSON.parse(readFileSync(f, 'utf8')); } catch { continue; }
    if (!rj.club) continue;
    const m = (porClub[rj.club] ||= {});
    for (const r of rj.rubros || []) if (r.label && r.glosa && !(r.label in m)) m[r.label] = r.glosa;
  }
  return porClub;
}

function leerTabla(iso, id) {
  const f = join(ROOT, 'data', iso, `${id}-glosas.js`);
  if (!existsSync(f)) return {};
  const w = { window: {} }; try { vm.runInNewContext(readFileSync(f, 'utf8'), w); } catch { return {}; }
  return w.window.GLOSAS_ETIQUETAS || {};
}

// Qué idiomas necesita una etiqueta de un club de ese país: la glosa en el idioma en que la etiqueta NO está.
const necesita = (iso) => ({ es: !HISPANOS.has(iso), en: !INGLESES.has(iso) });

export function estadoActual() {
  const clubes = etiquetasPorClub(); const gen = glosasEsDeGenerados(); const res = {};
  for (const [id, c] of Object.entries(clubes)) {
    const tabla = leerTabla(c.iso, id); const nec = necesita(c.iso); const cl = (res[id] = { iso: c.iso, labels: c.labels, tabla: {}, faltan: { es: [], en: [] } });
    for (const l of c.labels) {
      const prev = tabla[l] || {}; const esGen = gen[id]?.[l];
      const e = {};
      const es = prev.es || (nec.es && esGen && norm(esGen) !== norm(l) ? esGen : null);
      if (nec.es) { if (es) e.es = es; else cl.faltan.es.push(l); }
      if (nec.en) { if (prev.en) e.en = prev.en; else cl.faltan.en.push(l); }
      if (e.es || e.en) cl.tabla[l] = e;
    }
  }
  return res;
}

function escribirClub(id, c) {
  const f = join(ROOT, 'data', c.iso, `${id}-glosas.js`);
  const orden = Object.keys(c.tabla).sort();
  const cuerpo = orden.map((l) => `${JSON.stringify(l)}:${JSON.stringify(c.tabla[l])}`).join(',\n');
  writeFileSync(f, `window.GLOSAS_ETIQUETAS = Object.assign(window.GLOSAS_ETIQUETAS || {}, {\n${cuerpo}\n});\n`);
}
function escribirIndice(est) {
  const ids = Object.entries(est).filter(([, c]) => Object.keys(c.tabla).length).map(([id]) => id).sort();
  writeFileSync(join(ROOT, 'data', 'glosas-indice.js'), `window.GLOSAS_CLUBES = {${ids.map((i) => `${JSON.stringify(i)}:1`).join(',')}};\n`);
}

const key = () => readFileSync(resolve(ROOT, 'Admin', 'api-keys', 'gemini.env'), 'utf8').split('\n').find((l) => l.startsWith('GEMINI_API_KEY=')).slice(15).trim();
const MODEL = 'gemini-3.8-flash'; // el mismo de glosar-rubros.mjs
async function traducir(labels, idioma) {
  const nombre = idioma === 'es' ? 'ESPAÑOL' : 'INGLÉS';
  const prompt = `Estas son etiquetas de filas de estados financieros de clubes deportivos, cada una en el idioma de su documento. Devolvé un arreglo JSON con la traducción contable al ${nombre} de cada una, en el mismo orden y con la misma cantidad de elementos, breve y en el vocabulario de un estado de resultados o balance (sin explicaciones). Si la etiqueta ya está en ${nombre}, devolvela igual.\n\n${JSON.stringify(labels)}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key()}`;
  for (let a = 0; a < 4; a++) {
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0 } }) });
      if (r.ok) { const t = (await r.json()).candidates?.[0]?.content?.parts?.[0]?.text; const arr = JSON.parse(t); if (Array.isArray(arr) && arr.length === labels.length) return arr.map(String); }
      else if (r.status !== 429 && r.status < 500) return null;
    } catch { /* reintenta */ }
    await new Promise((z) => setTimeout(z, 2500 * (a + 1)));
  }
  return null;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let est = estadoActual();
  if (A.includes('--faltan')) { const p = {}; for (const c of Object.values(est)) { const x = (p[c.iso] ||= { es: 0, en: 0, etiquetas: 0 }); x.es += c.faltan.es.length; x.en += c.faltan.en.length; x.etiquetas += c.labels.length; } console.log(JSON.stringify(p)); process.exit(0); }
  if (A.includes('--completar')) {
    const pais = flag('--pais'); const max = Number(flag('--max')) || Infinity;
    // las etiquetas distintas que faltan, por idioma (una etiqueta repetida en varios clubes se pide una vez)
    const pedir = { es: new Set(), en: new Set() };
    for (const c of Object.values(est)) { if (pais && c.iso !== pais) continue; for (const i of ['es', 'en']) for (const l of c.faltan[i]) pedir[i].add(l); }
    const nuevas = { es: new Map(), en: new Map() }; let lotes = 0;
    for (const i of ['es', 'en']) {
      const todas = [...pedir[i]];
      for (let k = 0; k < todas.length && lotes < max; k += 120, lotes++) {
        const parte = todas.slice(k, k + 120); const g = await traducir(parte, i);
        if (!g) { console.error(`Gemini no devolvió una traducción válida (${i}, lote desde ${k}); lo que ya llegó se escribe igual.`); break; }
        parte.forEach((l, n) => nuevas[i].set(l, g[n]));
        console.log(`  ${i}: ${Math.min(k + 120, todas.length)} de ${todas.length}`);
      }
    }
    for (const c of Object.values(est)) for (const i of ['es', 'en']) for (const l of c.faltan[i].slice()) if (nuevas[i].has(l) && (!pais || c.iso === pais)) { (c.tabla[l] ||= {})[i] = nuevas[i].get(l); c.faltan[i].splice(c.faltan[i].indexOf(l), 1); }
    for (const [id, c] of Object.entries(est)) if (Object.keys(c.tabla).length) escribirClub(id, c);
    escribirIndice(est);
    console.log('Escrito.'); process.exit(0);
  }
  if (A.includes('--escribir')) {
    for (const [id, c] of Object.entries(est)) if (Object.keys(c.tabla).length) escribirClub(id, c);
    escribirIndice(est); console.log(`Escritos ${Object.values(est).filter((c) => Object.keys(c.tabla).length).length} clubes.`); process.exit(0);
  }
  const p = {}; for (const c of Object.values(est)) { const x = (p[c.iso] ||= { clubes: 0, etiquetas: 0, faltaEs: 0, faltaEn: 0 }); x.clubes++; x.etiquetas += c.labels.length; x.faltaEs += c.faltan.es.length; x.faltaEn += c.faltan.en.length; }
  console.log('país  clubes  etiquetas  faltan es  faltan en');
  for (const [iso, x] of Object.entries(p).sort((a, b) => b[1].etiquetas - a[1].etiquetas)) console.log(`${iso.padEnd(5)} ${String(x.clubes).padStart(6)} ${String(x.etiquetas).padStart(10)} ${String(x.faltaEs).padStart(10)} ${String(x.faltaEn).padStart(10)}`);
  const tot = Object.values(p).reduce((a, x) => ({ es: a.es + x.faltaEs, en: a.en + x.faltaEn }), { es: 0, en: 0 });
  console.log(`\nFaltan ${tot.es} glosas es y ${tot.en} en (por club-etiqueta; las repetidas entre clubes se piden una vez con --completar).`);
}

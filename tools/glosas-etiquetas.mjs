#!/usr/bin/env node
// ============================================================================
// tools/glosas-etiquetas.mjs — `fos glosas-etiquetas`: LAS ETIQUETAS DE LAS FILAS EN EL IDIOMA DEL VISITANTE (punto 451)
//
// POR QUÉ. Las filas de «Formato del club» salen textuales del balance («Andre finansielle indtægter», «Løn og gager»): es la evidencia de lo que dice la fuente y el JSON del club la conserva
// tal cual (`label`). Pero el visitante lee en español o en inglés (selector de idioma). Este comando arma, por club, una tabla `{etiqueta original -> {es, en}}` en
// `data/<país>/<clubId>-glosas.js` que la pantalla usa para mostrar la glosa en el idioma del visitante con el original en el `title`. El JSON del club no cambia (no es un cambio de contrato).
//
// DE DÓNDE SALE CADA GLOSA. Una etiqueta que ya tiene glosa en otro club se reutiliza; `es`, la `glosa` que glosar-rubros.mjs escribió en los Generados/**/*.rubros.json al cargar el documento; lo que falta se
// traduce con Claude (claude-sonnet-5-5, tools/claude-llamada.mjs, lotes de 100 etiquetas, registrado en Admin/registros/api/claude-api.jsonl con tarea `glosas`).
// Se omite la glosa de un idioma si la etiqueta ya está en ese idioma (países de habla hispana para `es`, de habla inglesa para `en`): ahí se muestra el original.
// ES AUTOMÁTICO: el generador tools/generate-glosas.mjs (en la lista de tools/generadores.mjs, o sea, al escribir cada año) corre `completar` con un tope por corrida; no depende de que una sesión se acuerde.
//
// USO (node tools/fos.mjs glosas-etiquetas …)
//   (sin flags)                  ensayo: por país, cuántas etiquetas hay y cuántas glosas faltan (es / en)
//   --escribir                   escribe data/<país>/<clubId>-glosas.js y data/glosas-indice.js con lo que ya hay; sin red
//   --completar [--pais xx] [--max-etiquetas N]   traduce con Claude las glosas que faltan (de ese país o de todos; N tope de etiquetas distintas) y escribe. FOS_SIN_API=1 la desactiva
//   --faltan                     JSON {pais: {es, en, etiquetas}} (lo lee audit.js)
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
const LOTE = 100;

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

// `nuevas`: { etiqueta: {es?, en?} } traducido en esta corrida (se reutiliza para cualquier club que tenga la misma etiqueta).
export function estadoActual(nuevas = {}) {
  const clubes = etiquetasPorClub(); const gen = glosasEsDeGenerados(); const res = {};
  // lo que ya se sabe de una etiqueta, venga de donde venga (otro club, otra corrida): se reutiliza
  const conocidas = {};
  for (const [id, c] of Object.entries(clubes)) { for (const [l, g] of Object.entries(leerTabla(c.iso, id))) { const k = (conocidas[l] ||= {}); if (g.es && !k.es) k.es = g.es; if (g.en && !k.en) k.en = g.en; } }
  for (const [l, g] of Object.entries(nuevas)) { const k = (conocidas[l] ||= {}); if (g.es) k.es = g.es; if (g.en) k.en = g.en; }
  for (const [id, c] of Object.entries(clubes)) {
    const nec = necesita(c.iso); const cl = (res[id] = { iso: c.iso, labels: c.labels, tabla: {}, faltan: { es: [], en: [] } });
    for (const l of c.labels) {
      const e = {}; const k = conocidas[l] || {}; const esGen = gen[id]?.[l];
      if (nec.es) { const es = k.es || (esGen && norm(esGen) !== norm(l) ? esGen : null); if (es) e.es = es; else cl.faltan.es.push(l); }
      if (nec.en) { if (k.en) e.en = k.en; else cl.faltan.en.push(l); }
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
export function escribirTodo(est) {
  let n = 0; for (const [id, c] of Object.entries(est)) if (Object.keys(c.tabla).length) { escribirClub(id, c); n++; }
  escribirIndice(est); return n;
}

// ---- traducir con Claude ------------------------------------------------------------------------------------------------------
const SYSTEM = 'Traducís etiquetas de filas de estados financieros (balances y estados de resultados) de clubes deportivos. Cada etiqueta viene en el idioma del documento del club (el país va como pista). Para cada una devolvé su traducción contable al ESPAÑOL (es) y al INGLÉS (en): breve, en el vocabulario habitual de un estado de resultados o balance, sin explicaciones ni agregados. Si la etiqueta ya está en ese idioma, devolvela igual. Mismo orden y misma cantidad que el pedido.';
const ESQUEMA = { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { es: { type: 'string' }, en: { type: 'string' } }, required: ['es', 'en'], additionalProperties: false } } }, required: ['items'], additionalProperties: false };
export const MODELO_GLOSAS = 'claude-sonnet-5-5';

async function traducirLote(lote) {
  const { llamarClaude } = await import('./claude-llamada.mjs');
  const r = await llamarClaude({ system: SYSTEM, user: JSON.stringify(lote.map((x) => ({ etiqueta: x.l, pais: x.iso }))), schema: ESQUEMA, tarea: 'glosas', modelo: MODELO_GLOSAS, esfuerzo: 'low', maxTokens: 8000 });
  if (r.error || !r.datos?.items || r.datos.items.length !== lote.length) return { error: r.error || `se pidieron ${lote.length} y volvieron ${r.datos?.items?.length ?? 0}`, costo: r.costo || 0 };
  return { items: r.datos.items, costo: r.costo || 0 };
}

// Traduce lo que falta (todas las etiquetas distintas, o solo las de un país) con un tope de etiquetas por corrida y 4 lotes en paralelo; devuelve { pedidas, traducidas, usd, errores }.
export async function completar({ pais = null, maxEtiquetas = Infinity, log = console.log } = {}) {
  if (process.env.FOS_SIN_API === '1') return { pedidas: 0, traducidas: 0, usd: 0, errores: ['FOS_SIN_API=1'] };
  const est = estadoActual();
  const pedir = new Map(); // etiqueta -> { l, iso }
  for (const c of Object.values(est)) { if (pais && c.iso !== pais) continue; for (const l of new Set([...c.faltan.es, ...c.faltan.en])) if (!pedir.has(l)) pedir.set(l, { l, iso: c.iso }); }
  const todas = [...pedir.values()].slice(0, maxEtiquetas); const lotes = [];
  for (let k = 0; k < todas.length; k += LOTE) lotes.push(todas.slice(k, k + LOTE));
  const nuevas = {}; let usd = 0; const errores = []; let hechos = 0;
  const cola = lotes.slice();
  const trabajador = async () => {
    while (cola.length) {
      const lote = cola.shift(); const r = await traducirLote(lote); usd += r.costo || 0;
      if (r.error) { errores.push(r.error); continue; }
      lote.forEach((x, i) => { nuevas[x.l] = { es: r.items[i].es, en: r.items[i].en }; });
      hechos++; log(`  lote ${hechos} de ${lotes.length}`);
    }
  };
  await Promise.all([trabajador(), trabajador(), trabajador(), trabajador()]);
  const traducidas = Object.keys(nuevas).length;
  if (traducidas) escribirTodo(estadoActual(nuevas));
  return { pedidas: todas.length, traducidas, usd: Number(usd.toFixed(4)), errores };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const est = estadoActual();
  if (A.includes('--faltan')) { const p = {}; for (const c of Object.values(est)) { const x = (p[c.iso] ||= { es: 0, en: 0, etiquetas: 0 }); x.es += c.faltan.es.length; x.en += c.faltan.en.length; x.etiquetas += c.labels.length; } console.log(JSON.stringify(p)); process.exit(0); }
  if (A.includes('--completar')) {
    const r = await completar({ pais: flag('--pais'), maxEtiquetas: Number(flag('--max-etiquetas')) || Infinity });
    console.log(`Pedidas ${r.pedidas}, traducidas ${r.traducidas}, costo US$ ${r.usd}${r.errores.length ? `; errores: ${[...new Set(r.errores)].slice(0, 3).join(' | ')}` : ''}.`);
    process.exit(r.errores.length && !r.traducidas ? 1 : 0);
  }
  if (A.includes('--escribir')) { console.log(`Escritos ${escribirTodo(est)} clubes.`); process.exit(0); }
  const p = {}; for (const c of Object.values(est)) { const x = (p[c.iso] ||= { clubes: 0, etiquetas: 0, faltaEs: 0, faltaEn: 0 }); x.clubes++; x.etiquetas += c.labels.length; x.faltaEs += c.faltan.es.length; x.faltaEn += c.faltan.en.length; }
  console.log('país  clubes  etiquetas  faltan es  faltan en');
  for (const [iso, x] of Object.entries(p).sort((a, b) => b[1].etiquetas - a[1].etiquetas)) console.log(`${iso.padEnd(5)} ${String(x.clubes).padStart(6)} ${String(x.etiquetas).padStart(10)} ${String(x.faltaEs).padStart(10)} ${String(x.faltaEn).padStart(10)}`);
  const tot = Object.values(p).reduce((a, x) => ({ es: a.es + x.faltaEs, en: a.en + x.faltaEn }), { es: 0, en: 0 });
  const distintas = new Set(Object.values(est).flatMap((c) => [...c.faltan.es, ...c.faltan.en])).size;
  console.log(`\nFaltan ${tot.es} glosas es y ${tot.en} en (club por club); ${distintas} etiquetas distintas por traducir (una etiqueta repetida se traduce una vez).`);
}

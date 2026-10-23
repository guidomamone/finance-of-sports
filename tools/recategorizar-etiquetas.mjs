#!/usr/bin/env node
// ============================================================================
// tools/recategorizar-etiquetas.mjs — el proceso para pasar lo ya cargado a una categoría nueva POR ETIQUETA, sin que Guido lea cada una.
//
// POR QUÉ. Una categoría nueva (hoy `grants_donations`: subsidios, donaciones y aportes) se alimenta de líneas que estaban en otra (`other_income`). Una
// expresión regular ve la palabra, no el concepto: «Tartu linnavalitsus» (el ayuntamiento) o «Sihtfinantseerimine tegevuskuludeks» (financiación dirigida)
// son subsidios sin decirlo. El proceso es de CUATRO escalones y cada decisión queda con quién la tomó (tools/subsidios-etiquetas.json o tools/etiquetas/<cat>.json):
//   1. reglas objetivas (tools/etiquetas-reglas.mjs): lo claro se decide solo (mezclado, solidaridad de la federación o la liga, subvención de capital, impuestos);
//   2. Jev a TODAS las etiquetas de la categoría de origen, con el criterio de la REGLA (`CATEGORÍA (prompt)` de Admin/CONVENCIONES-DATOS.md): confianza ≥ 0,90 pasa sola;
//   3. entre 0,50 y 0,90, un agente con prompt fijo (--prompt) que devuelve si es, el motivo y una CITA textual del documento (--respuestas la verifica contra el .md);
//   4. sin cita verificable, o en conflicto con una regla objetiva: a Guido, en UNA lista corta (--guido).
//
// USO (siempre --categoria <id>):
//   --listar [--todas]          las etiquetas que PUEDEN serlo (expresión amplia) con su estado; --todas incluye las aprobadas
//   --proponer                  escalón 1 sobre las sin decidir de la expresión amplia
//   --jev [--limit N] [--dry-run]  escalón 2 sobre todas las sin decidir (Jev cuesta centavos; el resultado va a Admin/registros/etiquetas-jev.jsonl y no se vuelve a preguntar)
//   --prompt                    el prompt fijo del escalón 3 con las etiquetas en `revisar`
//   --respuestas <json>         el JSON que devolvió el agente (ver --prompt)
//   --guido                     la lista corta; se decide con --decidir "<etiqueta>" aprobada|excluida --motivo "…"
//   --backtest                  Jev contra lo ya decidido: cuántas reproduce y qué errores de confianza alta hay
//   --ensayo | --escribir       qué líneas pasa a la categoría (JSON de cada club + su -data.js); después: node tools/publicar.mjs y un commit con «Corrige:»
// ============================================================================
import { readdirSync, readFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { leerJsonClub, modificarClub } from './club-json.mjs';
import { leerReglasCategoria } from './reglas-categoria.mjs';
import { REGLAS, norm, motivoExcluye, leerDecisiones, escribirDecisiones, decidida } from './etiquetas-reglas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i < 0 ? null : (A[i + 1] ?? null); };
const CAT = flag('--categoria');
const REGISTRO = resolve(ROOT, 'Admin', 'registros', 'etiquetas-jev.jsonl');
const AUTO = 0.9; const PISO = 0.5;
const CARPETA = 'Clubes'; // donde están las transcripciones (.md) de cada club
const ESPERA_MS = 2e3; // entre reintentos a Jev

if (!CAT || !REGLAS[CAT]) { console.error(`Uso: node tools/recategorizar-etiquetas.mjs --categoria <${Object.keys(REGLAS).join('|')}> <modo> (ver la cabecera)`); process.exit(1); }
const R = REGLAS[CAT];
const D = leerDecisiones(CAT);
const guardar = () => escribirDecisiones(CAT, D);
// lo decidido antes de que se registrara quién: fue la expresión regular
for (const k of [...D.aprobadas, ...Object.keys(D.excluidas)]) D.quien[k] ??= 'regla';

function clubes() {
  const out = [];
  for (const d of readdirSync(resolve(ROOT, 'data')).filter((x) => /^[a-z]{2}$/.test(x))) for (const f of readdirSync(resolve(ROOT, 'data', d)).filter((x) => x.endsWith('.json'))) out.push(f.replace(/\.json$/, ''));
  return out.sort();
}
// las líneas de la categoría de origen, agrupadas por etiqueta normalizada
function etiquetas(cats = [R.desde]) {
  const por = new Map();
  for (const id of clubes()) {
    let j; try { j = leerJsonClub(id); } catch { continue; }
    const anios = Array.isArray(j.years) ? j.years : Object.values(j.years || {});
    for (const y of anios) for (const l of y[R.lado] || []) {
      if (!cats.includes(l.subcategory) || !l.label) continue;
      const k = norm(l.label); const e = por.get(k) || { etiqueta: l.label, n: 0, clubes: new Set(), ejemplos: [], total: 0 };
      e.n++; e.clubes.add(id); e.total += Math.abs(l.amount || 0); if (e.ejemplos.length < 3) e.ejemplos.push(`${id} ${y.fiscal_year}`);
      por.set(k, e);
    }
  }
  return por;
}
const estado = (k, e) => decidida(D, e.etiqueta) || (D.revisar[k] ? 'en revisión (agente)' : D.guido[k] ? 'PARA GUIDO' : R.noEntra.test(e.etiqueta) ? 'excluida por la REGLA (revisar)' : 'sin decidir');

// ---- Jev --------------------------------------------------------------------------------------------------------------------------------
const regla = () => { const it = leerReglasCategoria().flatMap((r) => r.promptItems).find((x) => x.texto.includes(CAT)); if (!it) throw new Error(`Admin/CONVENCIONES-DATOS.md no tiene una línea «CATEGORÍA (prompt)» que nombre ${CAT}`); return it.texto; };
const clave = () => {
  const f = resolve(ROOT, 'Admin', 'api-keys', 'jev.env');
  if (!existsSync(f)) throw new Error(`Falta ${f} con JEV_API_KEY=...`);
  const l = readFileSync(f, 'utf8').split('\n').find((x) => x.startsWith('JEV_API_KEY=')); if (!l) throw new Error('jev.env sin JEV_API_KEY');
  return l.slice('JEV_API_KEY='.length).trim();
};
function respuestasJev() {
  const m = new Map();
  if (existsSync(REGISTRO)) for (const l of readFileSync(REGISTRO, 'utf8').split('\n')) { if (!l.trim()) continue; try { const r = JSON.parse(l); if (r.categoria === CAT) m.set(r.k, r); } catch { /* línea rota */ } }
  return m;
}
let parar = null;
async function preguntar(key, e, club, criterio) {
  const state = [`Línea de ingresos de un estado financiero de un club de fútbol (${club}).`, `Texto de la línea, tal cual figura en el documento: "${e.etiqueta}"`, `Criterio: ${criterio}`].join('\n');
  const body = { state, model: 'jev-latest', questions: { respuesta: { type: 'choice', instructions: `¿Esta línea es ${R.nombre} según el criterio? Respondé «si» solo si la línea, por sí sola, es ese concepto; si está mezclada con otros conceptos o es dudosa, «no».`, criteria: { si: `Sí: es ${R.nombre}.`, no: `No: es otra cosa, o está mezclada con otras.` } } } };
  for (let intento = 0; intento < 5; intento++) {
    if (parar) return { error: parar };
    let res;
    try { res = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(body) }); }
    catch { await new Promise((r) => setTimeout(r, ESPERA_MS * (intento + 1))); continue; }
    if (res.ok) { const j = await res.json(); const a = j.answers?.respuesta; return a ? { choice: a.choice, confidence: a.confidence } : { error: 'respuesta sin answers.respuesta' }; }
    const txt = (await res.text()).slice(0, 200);
    if ([401, 402, 403].includes(res.status)) { parar = `Jev respondió ${res.status} (clave o crédito): ${txt}`; return { error: parar }; }
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, ESPERA_MS * 1.5 * (intento + 1))); continue; }
    return { error: `HTTP ${res.status}: ${txt}` };
  }
  return { error: 'reintentos agotados' };
}
async function preguntarTodas(lista, tope) {
  const ya = respuestasJev(); const pendientes = lista.filter(([k]) => !ya.has(k)).slice(0, tope || undefined);
  console.log(`${lista.length} etiquetas, ${ya.size} ya preguntadas antes, ${pendientes.length} a preguntar${A.includes('--dry-run') ? ' (--dry-run: no llamo a Jev)' : ''}.`);
  if (A.includes('--dry-run') || !pendientes.length) return respuestasJev();
  const key = clave(); const criterio = regla(); let i = 0; let hechas = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (i < pendientes.length && !parar) {
      const [k, e] = pendientes[i++]; const r = await preguntar(key, e, e.ejemplos[0].split(' ')[0], criterio);
      if (r.error) continue;
      appendFileSync(REGISTRO, JSON.stringify({ ts: new Date().toISOString(), categoria: CAT, k, etiqueta: e.etiqueta, ...r }) + '\n');
      if (++hechas % 25 === 0) process.stdout.write(`  ${hechas}/${pendientes.length}\r`);
    }
  }));
  if (parar) console.log(`\nDETENIDO: ${parar}`);
  return respuestasJev();
}

// ---- modos ------------------------------------------------------------------------------------------------------------------------------
const todas = etiquetas();
const amplias = [...todas].filter(([, e]) => R.amplia.test(e.etiqueta));

if (A.includes('--listar')) {
  let sin = 0;
  for (const [k, e] of amplias.sort((a, b) => b[1].n - a[1].n)) {
    const est = estado(k, e); if (est === 'sin decidir' || est.startsWith('excluida por la REGLA')) sin++;
    if (!A.includes('--todas') && est === 'aprobada') continue;
    console.log(`${String(e.n).padStart(4)} líneas · ${String(e.clubes.size).padStart(3)} clubes · ${est.padEnd(22)} · «${String(e.etiqueta).slice(0, 90)}» (${e.ejemplos.slice(0, 2).join('; ')})`);
  }
  console.log(`\n${amplias.length} etiquetas de la expresión amplia en ${R.desde}, ${sin} sin decidir. De ${CAT} ya aprobadas: ${D.aprobadas.length}; excluidas: ${Object.keys(D.excluidas).length}.`);
} else if (A.includes('--proponer')) {
  let ap = 0; let ex = 0;
  for (const [k, e] of amplias) {
    if (decidida(D, e.etiqueta)) continue;
    const m = motivoExcluye(CAT, e.etiqueta);
    if (m) { D.excluidas[k] = m; D.quien[k] = 'regla'; ex++; } else if (R.incluye.test(e.etiqueta)) { D.aprobadas.push(k); D.quien[k] = 'regla'; ap++; }
  }
  guardar(); console.log(`escalón 1 (reglas): ${ap} aprobadas, ${ex} excluidas. Lo que ni la regla ni la palabra deciden queda para Jev (--jev).`);
} else if (A.includes('--jev')) {
  const sinDecidir = [...todas].filter(([k, e]) => !decidida(D, e.etiqueta) && !D.guido[k]).sort((a, b) => b[1].total - a[1].total);
  const resp = await preguntarTodas(sinDecidir, Number(flag('--limit')) || 0);
  // sí con confianza ≥ AUTO: aprobada (salvo que una regla objetiva la excluya: a Guido). Una etiqueta de la expresión amplia (dice la palabra) con un no ≥ AUTO queda excluida;
  // el resto de lo dudoso (sí entre PISO y AUTO, o la expresión amplia con un no sin confianza) va al agente. Una etiqueta sin la palabra y con un no no se registra: son miles.
  let auto = 0; let rev = 0; let conf = 0; let exc = 0;
  for (const [k, e] of sinDecidir) {
    const r = resp.get(k); if (!r) continue;
    const m = motivoExcluye(CAT, e.etiqueta); const dice = R.amplia.test(e.etiqueta);
    if (r.choice === 'si' && r.confidence >= AUTO) {
      if (m) { D.guido[k] = { etiqueta: e.etiqueta, motivo: `Jev dice sí (${r.confidence.toFixed(2)}) pero la regla objetiva excluye: ${m}` }; conf++; } else { D.aprobadas.push(k); D.quien[k] = 'jev'; delete D.revisar[k]; auto++; }
    } else if (r.choice === 'no' && r.confidence >= AUTO && dice) { D.excluidas[k] = `Jev: no es ${R.nombre} (confianza ${r.confidence.toFixed(2)})`; D.quien[k] = 'jev'; delete D.revisar[k]; exc++; }
    else if (((r.choice === 'si' && r.confidence >= PISO) || dice) && !D.revisar[k]) { D.revisar[k] = { etiqueta: e.etiqueta, confianza: r.confidence }; rev++; }
  }
  guardar(); console.log(`escalón 2 (Jev): ${auto} aprobadas solas (≥ ${AUTO}), ${exc} excluidas (no ≥ ${AUTO} sobre una etiqueta que dice la palabra), ${rev} a revisión del agente, ${conf} en conflicto con una regla (a Guido).`);
} else if (A.includes('--prompt')) {
  const k0 = Object.keys(D.revisar);
  if (!k0.length) { console.error('Nada en revisión: corré --jev antes.'); process.exit(1); }
  console.log(`Decidí, para cada etiqueta de la lista, si es ${R.nombre} (categoría ${CAT}) según este criterio:\n\n${regla()}\n`);
  console.log(`Para cada una: leé la línea en la transcripción del club (${CARPETA}/<País>/<Club>/*.md; buscá el texto de la etiqueta y mirá la nota que la explica) y decidí con lo que el DOCUMENTO dice, no con lo que el nombre sugiere.`);
  console.log(`Devolvé SOLO un JSON, una entrada por etiqueta, tal como figura abajo:\n[{ "etiqueta": "<tal cual>", "es": true | false | null, "motivo": "<una frase>", "cita": { "archivo": "${CARPETA}/<País>/<Club>/<archivo>.md", "texto": "<frase TEXTUAL del documento que lo prueba, hasta 200 caracteres>" } }]`);
  console.log('Sin una cita textual que lo pruebe, `es` es null (no se sabe) y la etiqueta va a Guido. No inventes la cita.\n\nEtiquetas:');
  for (const k of k0) { const e = todas.get(k); console.log(`- «${D.revisar[k].etiqueta}» (${e ? e.ejemplos.join('; ') : 's/d'})`); }
} else if (A.includes('--respuestas')) {
  const arch = flag('--respuestas'); const J = JSON.parse(readFileSync(resolve(arch), 'utf8')); const mdN = new Map();
  const citaOk = (c) => { if (!c || !c.archivo || !c.texto || !/^Clubes\/.+\.md$/.test(c.archivo)) return false; const f = resolve(ROOT, c.archivo); if (!existsSync(f)) return false; if (!mdN.has(f)) mdN.set(f, norm(readFileSync(f, 'utf8'))); return mdN.get(f).includes(norm(c.texto)); };
  let ap = 0; let ex = 0; let gu = 0;
  for (const r of J) {
    const k = norm(r.etiqueta); if (!D.revisar[k]) { console.log(`  (ignorada: «${r.etiqueta}» no está en revisión)`); continue; }
    const m = motivoExcluye(CAT, r.etiqueta);
    if (r.es === null || r.es === undefined || !citaOk(r.cita)) { D.guido[k] = { etiqueta: D.revisar[k].etiqueta, motivo: `el agente no pudo probarlo con una cita verificable${r.motivo ? ` (${r.motivo})` : ''}` }; gu++; }
    else if (r.es && m) { D.guido[k] = { etiqueta: D.revisar[k].etiqueta, motivo: `el agente dice que sí (${r.motivo}) pero la regla objetiva excluye: ${m}` }; gu++; }
    else if (r.es) { D.aprobadas.push(k); D.quien[k] = 'agente'; ap++; }
    else { D.excluidas[k] = `agente: ${r.motivo || 'no es'} [${r.cita.archivo}]`; D.quien[k] = 'agente'; ex++; }
    delete D.revisar[k];
  }
  guardar(); console.log(`escalón 3 (agente): ${ap} aprobadas, ${ex} excluidas, ${gu} a Guido (sin cita verificable o en conflicto con una regla).`);
} else if (A.includes('--guido')) {
  const g = Object.entries(D.guido);
  if (!g.length) console.log('Nada para Guido.');
  for (const [k, v] of g) console.log(`- «${v.etiqueta}»: ${v.motivo}\n    node tools/recategorizar-etiquetas.mjs --categoria ${CAT} --decidir "${v.etiqueta}" aprobada|excluida --motivo "…"`);
} else if (A.includes('--decidir')) {
  const et = flag('--decidir'); const como = A[A.indexOf('--decidir') + 2]; const k = norm(et);
  if (!et || !['aprobada', 'excluida'].includes(como)) { console.error('Uso: --decidir "<etiqueta>" aprobada|excluida --motivo "…"'); process.exit(1); }
  D.aprobadas = D.aprobadas.filter((x) => x !== k); delete D.excluidas[k];
  if (como === 'aprobada') D.aprobadas.push(k); else D.excluidas[k] = flag('--motivo') || 'decisión de Guido';
  D.quien[k] = 'guido'; delete D.guido[k]; delete D.revisar[k]; guardar(); console.log(`«${et}»: ${como} (guido).`);
} else if (A.includes('--backtest')) {
  // lo aprobado ya se movió: sus líneas están en la categoría nueva, no en la de origen
  const decididas = [...etiquetas([R.desde, CAT])].filter(([, e]) => decidida(D, e.etiqueta));
  const resp = await preguntarTodas(decididas, Number(flag('--limit')) || 0);
  const cuenta = { apSi: 0, apDuda: 0, apNo: 0, exNo: 0, exDuda: 0, exSi: 0, sin: 0 }; const graves = [];
  for (const [k, e] of decididas) {
    const r = resp.get(k); if (!r) { cuenta.sin++; continue; }
    const si = r.choice === 'si'; const alta = r.confidence >= AUTO;
    if (decidida(D, e.etiqueta) === 'aprobada') { if (si && alta) cuenta.apSi++; else if (si || r.confidence < AUTO) cuenta.apDuda++; else { cuenta.apNo++; graves.push(`aprobada y Jev dice NO con ${r.confidence.toFixed(2)}: «${e.etiqueta}»`); } }
    else { if (!si && alta) cuenta.exNo++; else if (!si || r.confidence < AUTO) cuenta.exDuda++; else { cuenta.exSi++; graves.push(`excluida (${D.excluidas[k]}) y Jev dice SÍ con ${r.confidence.toFixed(2)}: «${e.etiqueta}»`); } }
  }
  console.log(`\nAprobadas (${D.aprobadas.length}): Jev las reproduce solo (sí ≥ ${AUTO}) ${cuenta.apSi} · dudosas ${cuenta.apDuda} · las contradice con confianza alta ${cuenta.apNo}`);
  console.log(`Excluidas (${Object.keys(D.excluidas).length}): Jev las reproduce solo (no ≥ ${AUTO}) ${cuenta.exNo} · dudosas ${cuenta.exDuda} · las contradice con confianza alta ${cuenta.exSi} · sin respuesta ${cuenta.sin}`);
  for (const g of graves) console.log(`  ${g}`);
} else if (A.includes('--ensayo') || A.includes('--escribir')) {
  const escribir = A.includes('--escribir'); let n = 0; let monto = 0; const porClub = {};
  for (const id of clubes()) {
    let j; try { j = leerJsonClub(id); } catch { continue; }
    const anios = Array.isArray(j.years) ? j.years : Object.values(j.years || {});
    const mover = []; for (const y of anios) for (const l of y[R.lado] || []) if (l.subcategory === R.desde && D.aprobadas.includes(norm(l.label))) mover.push([y.fiscal_year, l.label, l.amount]);
    if (!mover.length) continue;
    porClub[id] = mover.length; n += mover.length; monto += mover.reduce((s, m) => s + Math.abs(m[2] || 0), 0);
    if (!escribir) { for (const m of mover.slice(0, 3)) console.log(`  ${id} ${m[0]} «${String(m[1]).slice(0, 60)}» ${m[2]}`); continue; }
    modificarClub(id, (c) => { for (const lines of Object.values(c.datos[R.lado === 'revenue' ? 'revenueLinesByYear' : 'expenseLinesByYear'] || {})) for (const l of lines) if (l.normalizedCategory === R.desde && D.aprobadas.includes(norm(l.rawLabel))) l.normalizedCategory = CAT; });
  }
  console.log(`${escribir ? 'movidas' : 'se moverían'}: ${n} líneas en ${Object.keys(porClub).length} clubes (suma de montos absolutos ${monto.toFixed(1)} M, en su moneda)`);
} else { console.error('Falta el modo (ver la cabecera).'); process.exit(1); }

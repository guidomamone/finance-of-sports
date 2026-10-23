#!/usr/bin/env node
// ============================================================================
// tools/cola-historial.mjs — `fos cola-historial`: LAS CIFRAS DE LA COLA, REPETIBLES (411)
//
// POR QUÉ. Las cifras del 407 (380 «sin desglose», 64 % aceptar, ≈240 con amortización) salieron de scripts sueltos con una definición que no estaba escrita; al volver a medir salieron
// otros recortes. Acá cada cifra imprime su definición, y cualquier sesión la repite sobre Admin/registros/cola-revision.jsonl (gratis, solo lee).
//
// USO (node tools/fos.mjs cola-historial <qué>)
//   tipos         casos y respuestas por (etapa, motivo): cuántos, qué se respondió, cuántos terminaron `obsoleto`, y cuánto tardó en cerrarse solo
//   categoria     preguntas de categoría con respuesta: % en que la sesión dejó la categoría propuesta, por confianza; precedente unánime (club / país / todo) y cuántas veces la respuesta fue distinta
//   materialidad  de las preguntas de categoría, cuántas se contestarían solas con un umbral por pregunta y el error acumulado por documento (monto contra el total de su lado, por `sources[].document`)
//   reaparece     dudas de localizar/extraer con la misma clave estable (documento, etiquetas, bloques) y más de un id: cuántas se crearon DESPUÉS de una respuesta real
// ============================================================================
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const REAL = ['aceptar', 'corregir', 'descartar', 'preguntar-club'];
function leer() {
  const L = readFileSync(resolve(ROOT, 'Admin/registros/cola-revision.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const casos = new Map(); const resp = new Map(); const ultimo = new Map();
  for (const r of L) { if (r.tipo === 'caso') casos.set(r.id, r); else if (r.tipo === 'respuesta') { ultimo.set(r.id, r); if (REAL.includes(r.decision)) resp.set(r.id, r); } }
  return { casos, resp, ultimo };
}
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : '-');
const q = (a, p) => { a = [...a].sort((x, y) => x - y); return a.length ? a[Math.min(a.length - 1, Math.floor(p * a.length))] : null; };
const pais = (c) => c.pdf.split('/')[1]; const club = (c) => c.pdf.split('/')[2];
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const catFinal = (c, r) => (r.decision === 'aceptar' ? c.categoriaPropuesta : r.valor);

function tipos({ casos, resp, ultimo }) {
  console.log('DEFINICIÓN: un caso es una pregunta (tipo «caso»); «respondidos» = tiene una respuesta aceptar/corregir/descartar/preguntar-club; «obsoleto» = la etapa dejó de levantarlo y se cerró solo (minutos hasta cerrarse: mediana).\n');
  const g = {};
  for (const c of casos.values()) {
    const k = `${c.etapa}|${c.motivo}`; const t = g[k] ||= { n: 0, resp: 0, ac: 0, obs: [], dec: {} }; t.n++;
    const r = resp.get(c.id); const u = ultimo.get(c.id);
    if (r) { t.resp++; if (r.decision === 'aceptar') t.ac++; t.dec[r.decision] = (t.dec[r.decision] || 0) + 1; }
    else if (u?.decision === 'obsoleto') t.obs.push((Date.parse(u.ts) - Date.parse(c.ts)) / 60000);
  }
  console.log('etapa|motivo'.padEnd(36), 'casos', 'resp.', 'aceptar', 'obsol.', 'min hasta obsoleto (mediana)');
  for (const [k, t] of Object.entries(g).sort((a, b) => b[1].n - a[1].n)) console.log(k.padEnd(36), String(t.n).padStart(5), String(t.resp).padStart(5), pct(t.ac, t.resp).padStart(7), String(t.obs.length).padStart(6), t.obs.length ? Math.round(q(t.obs, 0.5)) : '-');
}

function categoria({ casos, resp }) {
  console.log('DEFINICIÓN: preguntas cargar|categoria con respuesta (sin descartar). «Propuesta acertada» = la categoría final (aceptar → la propuesta, corregir → el valor) es la propuesta. Precedente = respuestas anteriores (por fecha de respuesta) a la misma etiqueta normalizada, por club / país / todo; «unánime» = todas dieron la misma categoría.\n');
  const cat = [...casos.values()].filter((c) => c.etapa === 'cargar' && c.motivo === 'categoria' && resp.get(c.id) && resp.get(c.id).decision !== 'descartar').sort((a, b) => resp.get(a.id).ts.localeCompare(resp.get(b.id).ts));
  console.log(`preguntas: ${cat.length}; propuesta acertada: ${pct(cat.filter((c) => catFinal(c, resp.get(c.id)) === c.categoriaPropuesta).length, cat.length)}`);
  const porConf = {}; for (const c of cat) { const m = c.que.match(/dio ([\d.]+) de confianza/); const v = m ? +m[1] : null; const k = v == null ? 'sin dato' : v < 0.5 ? '<0,5' : v < 0.7 ? '0,5-0,7' : '≥0,7'; const t = porConf[k] ||= [0, 0]; t[0]++; if (catFinal(c, resp.get(c.id)) === c.categoriaPropuesta) t[1]++; }
  console.log('por confianza:', Object.entries(porConf).map(([k, [n, a]]) => `${k}: ${n} (${pct(a, n)} acertada)`).join(' · '));
  const H = { club: new Map(), pais: new Map(), todo: new Map() }; const R = { club: [0, 0, 0], pais: [0, 0, 0], todo: [0, 0, 0] };
  for (const c of cat) {
    const f = catFinal(c, resp.get(c.id)); const e = norm(String(c.detalle).split('|')[0]);
    for (const [n, k] of [['club', `${club(c)}|${e}`], ['pais', `${pais(c)}|${e}`], ['todo', e]]) {
      const h = H[n].get(k) || [];
      if (h.length && h.every((x) => x === h[0])) { R[n][0]++; if (h[0] === f) R[n][1]++; else R[n][2]++; }
      H[n].set(k, [...h, f]);
    }
  }
  for (const n of ['club', 'pais', 'todo']) console.log(`precedente unánime en ${n}: ${R[n][0]} preguntas; la respuesta coincidió ${R[n][1]}, fue DISTINTA ${R[n][2]}`);
}

function materialidad({ casos, resp }) {
  console.log('DEFINICIÓN: monto = «(X en millones…)» de la pregunta; total = suma de |importes| del lado del ejercicio en el JSON del club, ubicado por sources[].document = pdf del caso. Umbral por pregunta (% del total de su lado); «error acumulado» = suma de los % de las preguntas que la sesión HABRÍA cambiado, por documento.\n');
  const idx = new Map();
  for (const p of readdirSync(resolve(ROOT, 'data'))) { let fs; try { fs = readdirSync(resolve(ROOT, 'data', p)); } catch { continue; } for (const f of fs) if (/-[a-z]{2}\.json$/.test(f)) { let j; try { j = JSON.parse(readFileSync(resolve(ROOT, 'data', p, f), 'utf8')); } catch { continue; } for (const y of j.years || []) { const d = (j.sources || []).find((s) => s.id === y.source_id)?.document; if (d) idx.set(d.normalize('NFC'), { r: (y.revenue || []).reduce((a, x) => a + Math.abs(x.amount || 0), 0), e: (y.expenses || []).reduce((a, x) => a + Math.abs(x.amount || 0), 0) }); } } }
  const REV = new Set(['member_dues', 'season_tickets', 'matchday_competition', 'stadium_other', 'broadcasting', 'competition_bonus', 'sponsorship_commercial', 'player_sales', 'other_sports', 'youth_football', 'womens_football', 'education', 'grants_donations', 'other_income', 'lump_football_operations']);
  const filas = [];
  for (const c of casos.values()) {
    const r = resp.get(c.id); if (c.etapa !== 'cargar' || c.motivo !== 'categoria' || !r || r.decision === 'descartar') continue;
    const m = c.que.match(/\(([\d.,]+) en millones/); const y = idx.get(c.pdf.normalize('NFC')); if (!m || !y) continue;
    const tot = REV.has(c.categoriaPropuesta) ? y.r : y.e; if (!tot) continue;
    filas.push({ pdf: c.pdf, pct: (100 * Math.abs(parseFloat(m[1]))) / tot, cambio: catFinal(c, r) !== c.categoriaPropuesta });
  }
  const total = [...casos.values()].filter((c) => c.etapa === 'cargar' && c.motivo === 'categoria' && resp.get(c.id) && resp.get(c.id).decision !== 'descartar').length;
  console.log(`medibles: ${filas.length} de ${total} preguntas de categoría con respuesta`);
  for (const u of [0.25, 0.5, 1, 2]) {
    const baj = filas.filter((x) => x.pct <= u); const mal = baj.filter((x) => x.cambio); const por = {}; for (const x of mal) por[x.pdf] = (por[x.pdf] || 0) + x.pct; const ac = Object.values(por);
    console.log(`umbral ${u}%: se contestan solas ${baj.length} (${pct(baj.length, filas.length)}); la sesión habría cambiado ${mal.length} (${pct(mal.length, baj.length)}); error acumulado por documento: mediana ${(q(ac, 0.5) ?? 0).toFixed(2)}% · p90 ${(q(ac, 0.9) ?? 0).toFixed(2)}% · máx ${(q(ac, 1) ?? 0).toFixed(2)}%`);
  }
}

function reaparece({ casos, resp }) {
  console.log('DEFINICIÓN: dudas verificar|duda-de-localizar/extraer; clave estable = documento + etiquetas entre comillas de la pregunta + bloques bNN (la que usa cola.mjs claveEstable). «Reaparece» = un caso con la misma clave nacido DESPUÉS de la primera respuesta real.\n');
  const { claveEstable } = globalThis.__cola;
  const g = new Map();
  for (const c of casos.values()) { const k = claveEstable(c); if (!k) continue; if (!g.has(k)) g.set(k, []); g.get(k).push(c); }
  let multi = 0, conReal = 0, reap = 0, iguales = 0;
  for (const a of g.values()) {
    if (a.length < 2) continue; multi++; a.sort((x, y) => x.ts.localeCompare(y.ts));
    const reales = a.map((c) => ({ c, r: resp.get(c.id) })).filter((x) => x.r); if (!reales.length) continue; conReal++;
    if (new Set(reales.map((x) => `${x.r.decision}:${x.r.valor ?? ''}`)).size === 1) iguales++;
    if (a.some((c) => c.ts > reales[0].r.ts && c.id !== reales[0].c.id)) reap++;
  }
  console.log(`claves con clave estable: ${g.size}; con más de un id: ${multi}; con alguna respuesta real: ${conReal} (todas iguales: ${iguales}); con un caso nacido después de una respuesta: ${reap}`);
}

const que = process.argv[2]; const datos = leer();
if (que === 'tipos') tipos(datos);
else if (que === 'categoria') categoria(datos);
else if (que === 'materialidad') materialidad(datos);
else if (que === 'reaparece') { globalThis.__cola = await import('./cola.mjs'); reaparece(datos); }
else { console.error('Uso: node tools/fos.mjs cola-historial tipos | categoria | materialidad | reaparece'); process.exit(1); }

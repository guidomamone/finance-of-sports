#!/usr/bin/env node
// ============================================================================
// tools/cargas-manuales.mjs — AÑOS CARGADOS A MANO SIN RASTRO (409, opción C de Guido)
//
// POR QUÉ. Los lotes de prueba incorporan los casos raros leyendo tres registros (ajustes manuales, frenos de scripts, respuestas de la cola). Un año que alguien cargó a mano (editó el JSON
// del club, sin pasar por tools/cargar.mjs) y no dejó ningún ajuste ni freno es justo un documento que tuvo problemas y que ningún registro delata: no entra a la rápida. Esta tool lo
// encuentra. UNA CARGA A MANO = la fuente del año (sources[].document, el PDF de origen) tiene su sección en Admin/carga-clubes/<club>.md SIN la nota «Cargado por tools/cargar.mjs».
// TIENE RASTRO si el documento figura en alguno de los tres registros de intervención. Sin `document` no hay con qué medirlo (no puede estar en un lote) y no se cuenta.
//
// USO: node tools/fos.mjs cargas-manuales            lista los años cargados a mano sin rastro (y cuántos tienen rastro)
//      node tools/fos.mjs cargas-manuales check      sale con 1 si hay alguno nuevo (audit.js: carga-manual-sin-rastro, P3); la lista aceptada va en tools/cargas-manuales-aceptadas.json
// Se acepta uno con su motivo en tools/cargas-manuales-aceptadas.json: [{ "document": "Clubes/…pdf", "motivo": "…" }]
// ============================================================================
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const norm = (s) => String(s).normalize('NFC');
const jsonl = (ruta) => { try { return readFileSync(resolve(ROOT, ruta), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean); } catch { return []; } };

export function cargasManuales() {
  const conRastro = new Set([...jsonl('Admin/registros/ajustes-manuales.jsonl').filter((a) => !a.anulado).map((a) => a.pdf), ...jsonl('Admin/registros/frenados-por-script.jsonl').map((f) => f.pdf)].filter(Boolean).map(norm));
  const casos = new Map(); for (const r of jsonl('Admin/registros/cola-revision.jsonl')) { if (r.tipo === 'caso') casos.set(r.id, r); else if (r.tipo === 'respuesta' && ['corregir', 'descartar', 'preguntar-club'].includes(r.decision) && casos.get(r.id)?.pdf) conRastro.add(norm(casos.get(r.id).pdf)); }
  const aceptadas = new Map(); try { for (const a of JSON.parse(readFileSync(process.env.CARGAS_MANUALES_ACEPTADAS || resolve(ROOT, 'tools/cargas-manuales-aceptadas.json'), 'utf8'))) aceptadas.set(norm(a.document), a.motivo); } catch { /* sin lista */ }
  const out = { manualesSinRastro: [], manuales: [], manualesConRastro: 0, pipeline: 0, sinDocumento: 0, aceptadas: 0 };
  for (const p of readdirSync(resolve(ROOT, 'data'))) {
    let fs; try { fs = readdirSync(resolve(ROOT, 'data', p)); } catch { continue; }
    for (const f of fs) {
      const m = f.match(/^(.+-[a-z]{2})\.json$/); if (!m) continue; const id = m[1]; let j; try { j = JSON.parse(readFileSync(resolve(ROOT, 'data', p, f), 'utf8')); } catch { continue; }
      const evRuta = resolve(ROOT, 'Admin/carga-clubes', `${id}.md`); const ev = existsSync(evRuta) ? readFileSync(evRuta, 'utf8') : '';
      for (const y of j.years || []) {
        const s = (j.sources || []).find((x) => x.id === y.source_id); if (!s || y.report_type === 'official_budget') continue;
        if (!s.document) { out.sinDocumento++; continue; }
        const i = ev.indexOf(`### ${s.id}\n`); const seccion = i >= 0 ? ev.slice(i, ev.indexOf('\n### ', i + 5) < 0 ? undefined : ev.indexOf('\n### ', i + 5)) : '';
        if (/Cargado por tools\/cargar\.mjs/.test(seccion)) { out.pipeline++; continue; }
        const doc = norm(s.document); out.manuales.push(doc);
        if (conRastro.has(doc)) { out.manualesConRastro++; continue; }
        if (aceptadas.has(doc)) { out.aceptadas++; continue; }
        out.manualesSinRastro.push({ club: id, anio: y.fiscal_year, document: s.document });
      }
    }
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const r = cargasManuales(); const A = process.argv.slice(2);
  if (A[0] === 'check') {
    if (r.manualesSinRastro.length) { console.log(`carga-manual-sin-rastro: ${r.manualesSinRastro.length} año(s) cargado(s) a mano, con documento, sin ningún ajuste, freno ni respuesta de la cola: no entran a los lotes de prueba (${r.manualesSinRastro.slice(0, 4).map((x) => `${x.club} ${x.anio}`).join(', ')}${r.manualesSinRastro.length > 4 ? ', …' : ''}). Lista: node tools/fos.mjs cargas-manuales`); process.exit(1); }
    process.exit(0);
  }
  console.log(`Años con documento: por el pipeline ${r.pipeline} · a mano con rastro ${r.manualesConRastro} · a mano aceptados ${r.aceptadas} · A MANO SIN RASTRO ${r.manualesSinRastro.length} · (sin document, no medibles: ${r.sinDocumento})`);
  for (const x of r.manualesSinRastro.slice(0, A.includes('--todas') ? 9999 : 40)) console.log(`  ${x.club} ${x.anio}  ${x.document}`);
  if (r.manualesSinRastro.length > 40 && !A.includes('--todas')) console.log(`  … y ${r.manualesSinRastro.length - 40} más (--todas)`);
}

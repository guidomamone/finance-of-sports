// tools/duraciones-lib.mjs — los segundos que tardó cada medidor de `medir-pipeline` por nivel de lote, de las mediciones ya anotadas (solo lee). Lo usan `duraciones-mediciones.mjs` (la tabla) y `medir-pipeline.mjs --ensayo` (el tiempo estimado).
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

// { 'medidor · nivel': { n, max, mediana } } de más lento a más rápido por mediana; `solo` filtra por medidor
export function duraciones(solo = null) {
  const reg = resolve(ROOT, 'Admin/registros/mediciones-pipeline.jsonl');
  if (!existsSync(reg)) return null;
  const por = {};
  for (const l of readFileSync(reg, 'utf8').split('\n').filter(Boolean)) {
    let j; try { j = JSON.parse(l); } catch { continue; }
    for (const m of j.medidores || []) {
      if (solo && m.medidor !== solo) continue;
      for (const lado of ['antes', 'despues']) {
        const d = m[lado]; if (!d) continue;
        const f = resolve(ROOT, String(d).replace(/\/salida$/, ''), 'listo'); if (!existsSync(f)) continue;
        let s; try { s = JSON.parse(readFileSync(f, 'utf8')).segundos; } catch { continue; }
        if (typeof s === 'number') (por[`${m.medidor} · ${m.nivel}`] ||= []).push(s);
      }
    }
  }
  return Object.entries(por).map(([k, v]) => { v.sort((a, b) => a - b); return { k, n: v.length, max: v[v.length - 1], mediana: v[Math.floor(v.length / 2)] }; }).sort((a, b) => b.mediana - a.mediana);
}

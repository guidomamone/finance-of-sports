#!/usr/bin/env node
// ============================================================================
// tools/uso-categorias.mjs — `fos categorias`: la MEDICIÓN con la que se abre o se cierra una categoría de la taxonomía (Admin/propuestas/350-revision-categorias.md, §3).
//
// POR QUÉ. Una categoría se abre, se cierra o se deja con una medición, no con una opinión. Esto da, por lado, deporte, categoría y subcategoría: los club-años, clubes y países que la
// usan, el peso mediano y máximo (la parte de esa línea sobre la suma de su lado en el club-año, sin presupuestos) y los club-años con peso de 5 % o más; y, para el catch-all
// (other_income / other_expenses), sus etiquetas más repetidas, con el umbral de abrir una categoría: 20 club-años o más, 5 clubes o más y 3 países o más.
// USO:  node tools/uso-categorias.mjs [--etiquetas] [--min-clubes N] [--json]     (solo lee data/; la decisión de abrir o cerrar es de la Auditora y, si cambia la lista de filas, de Guido)
// ============================================================================
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const MIN = { clubAnios: 20, clubes: Number(A.includes('--min-clubes') ? A[A.indexOf('--min-clubes') + 1] : 5), paises: 3 };
const filas = {}; const etiquetas = {}; let clubes = 0; let anios = 0; const porDeporte = {};
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
for (const p of readdirSync(join(ROOT, 'data')).filter((x) => /^[a-z]{2}$/.test(x))) {
  for (const f of readdirSync(join(ROOT, 'data', p)).filter((x) => x.endsWith('.json') && !x.includes('-data'))) {
    let d; try { d = JSON.parse(readFileSync(join(ROOT, 'data', p, f), 'utf8')); } catch { continue; }
    if (!d.years || !d.club) continue;
    clubes++; const dep = d.club.sport || 'football'; porDeporte[dep] = (porDeporte[dep] || 0) + 1;
    for (const y of d.years) {
      if (y.report_type === 'official_budget') continue;
      anios++;
      for (const lado of ['revenue', 'expenses']) {
        const ls = y[lado] || []; const tot = ls.reduce((s, l) => s + Math.abs(l.amount || 0), 0); if (!tot) continue;
        const vistos = {}; const etqVistas = new Set();
        for (const l of ls) {
          const k = `${lado}|${dep}|${l.category}|${l.subcategory}`;
          vistos[k] = (vistos[k] || 0) + Math.abs(l.amount || 0) / tot;
          const r = (filas[k] = filas[k] || { lineas: 0, clubAnio: 0, clubs: new Set(), paises: new Set(), shares: [], ejemplos: [] }); r.lineas++;
          if (['other_income', 'other_expenses'].includes(l.subcategory) && l.label) {
            const ek = `${lado}|${norm(l.label)}`; if (etqVistas.has(ek)) continue; etqVistas.add(ek);
            const e = (etiquetas[ek] = etiquetas[ek] || { etiqueta: l.label, lado, clubAnios: 0, clubs: new Set(), paises: new Set(), subcategoria: l.subcategory });
            e.clubAnios++; e.clubs.add(d.club.id); e.paises.add(d.club.country);
          }
        }
        for (const [k, sh] of Object.entries(vistos)) {
          const r = filas[k]; r.clubAnio++; r.clubs.add(d.club.id); r.paises.add(d.club.country); r.shares.push(sh);
          if (r.ejemplos.length < 3 && sh > 0.05) r.ejemplos.push(`${d.club.id}-${y.fiscal_year}:${(sh * 100).toFixed(0)}%`);
        }
      }
    }
  }
}
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const tabla = Object.entries(filas).map(([k, r]) => ({ k, clubAnios: r.clubAnio, clubes: r.clubs.size, paises: r.paises.size, lineas: r.lineas, mediana: med(r.shares), max: Math.max(...r.shares), conPeso5: r.shares.filter((s) => s >= 0.05).length, ejemplos: r.ejemplos })).sort((a, b) => a.k.localeCompare(b.k));
const candidatas = Object.values(etiquetas).filter((e) => e.clubAnios >= MIN.clubAnios && e.clubs.size >= MIN.clubes && e.paises.size >= MIN.paises).map((e) => ({ lado: e.lado, etiqueta: e.etiqueta, clubAnios: e.clubAnios, clubes: e.clubs.size, paises: e.paises.size })).sort((a, b) => b.clubAnios - a.clubAnios);
if (A.includes('--json')) { console.log(JSON.stringify({ clubes, anios, porDeporte, tabla, candidatas })); process.exit(0); }
console.log(`clubes ${clubes} · club-años (sin presupuestos) ${anios} · ${JSON.stringify(porDeporte)}\n`);
if (!A.includes('--etiquetas')) for (const o of tabla) console.log([o.k, 'club-años', o.clubAnios, 'clubes', o.clubes, 'países', o.paises, 'líneas', o.lineas, 'mediana', (o.mediana * 100).toFixed(1) + '%', 'máx', (o.max * 100).toFixed(0) + '%', 'con 5 % o más', o.conPeso5, o.ejemplos.join(' ')].join(' · '));
console.log(`\nEtiquetas del catch-all que repiten ${MIN.clubAnios} club-años, ${MIN.clubes} clubes y ${MIN.paises} países o más (candidatas a una categoría; se vota con votacion-de-criterios): ${candidatas.length}`);
for (const c of candidatas) console.log(`  ${c.lado} · «${c.etiqueta}» · ${c.clubAnios} club-años · ${c.clubes} clubes · ${c.paises} países`);

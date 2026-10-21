import fs from 'fs';
const filas = {}; // clave lado|categoria|subcategoria
let clubes = 0, anios = 0;
const porDeporte = {};
for (const p of fs.readdirSync('data')) {
  let fl; try { fl = fs.readdirSync('data/' + p); } catch (e) { continue; }
  for (const f of fl.filter((x) => x.endsWith('.json') && !x.startsWith('club') && !x.includes('-data'))) {
    let d; try { d = JSON.parse(fs.readFileSync(`data/${p}/${f}`, 'utf8')); } catch (e) { continue; }
    if (!d.years || !d.club) continue;
    clubes++;
    const dep = d.club.sport || 'football';
    porDeporte[dep] = (porDeporte[dep] || 0) + 1;
    for (const y of d.years) {
      if (y.report_type === 'official_budget') continue;
      anios++;
      for (const lado of ['revenue', 'expenses']) {
        const ls = y[lado] || [];
        const tot = ls.reduce((s, l) => s + Math.abs(l.amount || 0), 0);
        if (!tot) continue;
        const vistos = {};
        for (const l of ls) {
          const k = `${lado}|${dep}|${l.category}|${l.subcategory}`;
          vistos[k] = (vistos[k] || 0) + Math.abs(l.amount || 0) / tot;
          const r = filas[k] = filas[k] || { lineas: 0, clubAnio: 0, clubs: new Set(), paises: new Set(), shares: [], ejemplos: [] };
          r.lineas++;
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
const out = Object.entries(filas).map(([k, r]) => ({ k, clubAnio: r.clubAnio, clubs: r.clubs.size, paises: r.paises.size, lineas: r.lineas, med: med(r.shares), max: Math.max(...r.shares), ej: r.ejemplos }));
out.sort((a, b) => a.k.localeCompare(b.k));
console.log('clubes', clubes, 'club-años (sin presupuestos)', anios, JSON.stringify(porDeporte));
for (const o of out) console.log([o.k, 'cA', o.clubAnio, 'clubs', o.clubs, 'países', o.paises, 'líneas', o.lineas, 'mediana', (o.med * 100).toFixed(1) + '%', 'máx', (o.max * 100).toFixed(0) + '%', o.ej.join(' ')].join(' | '));

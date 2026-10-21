import fs from 'fs';
const RE = /subs[ií]d|subven|subsid|\bgrants?\b|donat|donaci|doa[cç]|aporte|aportes|aportaci|contribut|annetus|toetus|επιχορηγ|δωρε|субсид|взнос|пожертв|bidrag|tilskud|støtte|sovvenz|dotac|spende|zuschuss|zuwendung|subvention|hibe|bağış|destek|stipend|\bgift/i;
const porCat = {}; const porPais = {}; const cyears = new Set(); const clubs = new Set(); const etiquetas = {};
const aEducacion = [];
let total = 0;
for (const p of fs.readdirSync('data')) {
  let fl; try { fl = fs.readdirSync('data/' + p); } catch (e) { continue; }
  for (const f of fl.filter((x) => x.endsWith('.json') && !x.startsWith('club') && !x.includes('-data'))) {
    let d; try { d = JSON.parse(fs.readFileSync(`data/${p}/${f}`, 'utf8')); } catch (e) { continue; }
    if (!d.years) continue;
    for (const y of d.years) {
      if (y.report_type === 'official_budget') continue;
      const ls = y.revenue || [];
      const tot = ls.reduce((s, l) => s + Math.abs(l.amount || 0), 0);
      if (!tot) continue;
      let shareClubAnio = 0;
      for (const l of ls) {
        if (!RE.test(l.label) || !(l.amount > 0)) continue;
        total++;
        const k = l.category + '|' + l.subcategory;
        const c = porCat[k] = porCat[k] || { n: 0, sh: 0 }; c.n++; c.sh += l.amount / tot;
        const pa = porPais[d.club.country] = porPais[d.club.country] || { n: 0, clubs: new Set(), sh: [] }; pa.n++; pa.clubs.add(d.club.id);
        shareClubAnio += l.amount / tot; cyears.add(d.club.id + y.fiscal_year); clubs.add(d.club.id);
        if (l.category === 'other_revenue') etiquetas[l.label.slice(0, 40)] = (etiquetas[l.label.slice(0, 40)] || 0) + 1;
      }
      if (shareClubAnio > 0) { (porPais[d.club.country].sh).push(shareClubAnio); }
    }
  }
}
const todos=Object.values(porPais).flatMap(v=>v.sh);console.log('club-años con parte>=5%:',todos.filter(x=>x>=0.05).length,'>=25%:',todos.filter(x=>x>=0.25).length,'>=50%:',todos.filter(x=>x>=0.5).length,'de',todos.length);console.log('líneas de ingreso con palabra de subsidio/donación/aporte:', total, 'club-años', cyears.size, 'clubes', clubs.size);
console.log('por categoría vigente:', Object.entries(porCat).sort((a, b) => b[1].n - a[1].n).map(([k, v]) => `${k}=${v.n}`).join(' · '));
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
console.log('por país (líneas · clubes · mediana de la parte del ingreso del club-año):');
console.log(Object.entries(porPais).sort((a, b) => b[1].n - a[1].n).map(([k, v]) => `${k} ${v.n}·${v.clubs.size}·${(med(v.sh) * 100).toFixed(0)}%`).join(' | '));
console.log('etiquetas más repetidas en other_revenue:');
console.log(Object.entries(etiquetas).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => `${v}× ${k}`).join('\n'));

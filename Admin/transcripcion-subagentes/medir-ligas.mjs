import { readFileSync, readdirSync, appendFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const [ROOT, OUT] = process.argv.slice(2);
const d = `${ROOT}/tools/club-league-reference`;
writeFileSync(OUT, '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let n = 0, dif = 0, err = 0, salt = 0;
for (const f of readdirSync(d).filter((x) => x.endsWith('.json'))) {
  const pais = f.replace('.json', '');
  const j = JSON.parse(readFileSync(`${d}/${f}`, 'utf8'));
  for (const [lg, ss] of Object.entries(j.leagues || {})) for (const [y, s] of Object.entries(ss)) {
    if (!s.wikipediaPage) continue;
    if (/^plantilla/.test(s.section || '')) { salt++; continue; }
    const sec = /^Teams >/.test(s.section || '') ? 'Teams' : (s.section || 'Teams');
    let r; let intento = 0;
    do { r = spawnSync('node', ['tools/fetch-club-league-reference.mjs', s.wikipediaPage, lg, y, '--pais', pais, '--lang', s.lang || 'en', '--section', sec, '--comparar'], { cwd: ROOT, encoding: 'utf8' }); intento++; if (/rate|too many|You are ma/i.test(r.stderr + r.stdout)) await sleep(30000 * intento); else break; } while (intento < 6);
    const line = (r.stdout || '').trim().split('\n').pop();
    let o = null; try { o = JSON.parse(line); } catch {}
    n++;
    if (!o) { err++; appendFileSync(OUT, `ERROR ${pais} ${lg} ${y}: ${(r.stderr || r.stdout).slice(0, 200).replace(/\n/g, ' ')}\n`); }
    else if (!o.igual) { dif++; appendFileSync(OUT, `CAMBIA ${pais} ${lg} ${y}: vieja ${o.vieja.length} -> nueva ${o.nueva.length}; sale ${JSON.stringify(o.vieja.filter((x) => !o.nueva.includes(x)))}; entra ${JSON.stringify(o.nueva.filter((x) => !o.vieja.includes(x)))}\n`); }
    await sleep(3000);
  }
}
appendFileSync(OUT, `FIN: ${n} temporadas comparadas, ${dif} cambian, ${err} errores, ${salt} salteadas (plantilla sports table, sin tablas que elegir)\n`);

// scratch: por par de años, qué rubros de SIIS difieren entre el corte de Y y el corteAnterior de Y+1 (miles de pesos)
import { readFileSync, existsSync } from 'node:fs';
const club = process.argv[2];
const R = '/Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports/Clubes/Colombia/' + club + '/';
const leer = (y) => { const f = R + `siis-estado-${y}.json`; return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')).siis_resultadointegral?.resultado?.registros || JSON.parse(readFileSync(f, 'utf8')).resultado?.registros : null; };
const raw = (y) => { const f = R + `siis-estado-${y}.json`; return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null; };
for (let y = Number(process.argv[3]); y < Number(process.argv[4]); y++) {
  const a = raw(y), b = raw(y + 1); if (!a || !b) continue;
  const ra = (a.siis_resultadointegral || a).resultado?.registros, rb = (b.siis_resultadointegral || b).resultado?.registros; if (!ra || !rb) { console.log(y, 'sin registros', Object.keys(a)); continue; }
  const difs = [];
  for (const k of Object.keys(ra)) { const x = Number(ra[k]?.corte), z = Number(rb[k]?.corteAnterior); if (Number.isFinite(x) && Number.isFinite(z) && x !== z) difs.push(`${k} ${x}→${z} (${z - x})`); }
  console.log(`${y}/${y + 1}: ${difs.length ? difs.join(' · ') : 'sin diferencias'}`);
}

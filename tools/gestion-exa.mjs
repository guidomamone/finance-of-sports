// tools/gestion-exa.mjs — las gestiones (presidentes) que le faltan a un club, buscadas en prensa fechada con Exa.
// POR QUÉ. Una gestión sin fuente fechada no se muestra (`confirmada:false`) y la cola pregunta «¿quién condujo el club en AAAA?» por cada ejercicio sin cobertura. El subagente de gestiones buscaba a mano, con navegador, y las fuentes
// débiles (Wikipedia sin fecha) quedaban sin confirmar. Exa trae la nota de prensa con su fecha de publicación (renuncias y nombramientos), así que cada hueco sale con candidatos citables.
// QUÉ HACE. Lee data/gestiones/<iso>.js y los ejercicios del club (data/<iso>/<clubId>.json, o --anios AAAA-AAAA si todavía no está cargado), marca los cierres que ninguna gestión CONFIRMADA cubre y, por cada año con hueco, trae de Exa
// las notas de prensa de nombramiento y de renuncia (fecha, URL, título y un extracto), más la lista de presidentes de Wikipedia como pista. NO escribe data/gestiones: la sesión o el subagente elige la fuente y la carga con su fecha.
// Costo: ~US$ 0,007 por consulta (dos por año con hueco, más una); cada una queda en Admin/registros/api/exa.jsonl.
// USO: node tools/fos.mjs gestion-exa <clubId> [--nombre "Club"] [--anios 2016-2025 | "2016, 2017, 2019"] [--anio AAAA]
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const v = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
const clubId = A.find((a, i) => !a.startsWith('--') && !['--nombre', '--anios', '--anio'].includes(A[i - 1]));
if (!clubId || !/-[a-z]{2}$/.test(clubId)) { console.error('Uso: node tools/fos.mjs gestion-exa <clubId> [--nombre "Club"] [--anios 2016-2025] [--anio AAAA]'); process.exit(1); }
const iso = clubId.split('-').pop();

// las gestiones del club: el archivo es un script de navegador (window.CLUB_GESTIONES)
const archivo = join(ROOT, 'data', 'gestiones', `${iso}.js`); const win = {};
if (existsSync(archivo)) vm.runInNewContext(readFileSync(archivo, 'utf8'), { window: win });
const gestiones = (win.CLUB_GESTIONES || {})[clubId] || [];

// los cierres de ejercicio: los del JSON del club o un rango de años (cierre supuesto al 31-12)
const rutaJson = join(ROOT, 'data', iso, `${clubId}.json`); let cierres = [];
if (v('--anios')) { // un rango «2016-2025» o una lista «2016, 2017, 2019»
  const lista = v('--anios').split(/[,\s]+/).filter(Boolean); const [a, b] = lista.length === 1 ? lista[0].split('-').map(Number) : [null, null];
  for (const y of a ? Array.from({ length: (b || a) - a + 1 }, (_, i) => a + i) : lista.map(Number)) cierres.push({ anio: y, cierre: `${y}-12-31` });
}
else if (existsSync(rutaJson)) cierres = (JSON.parse(readFileSync(rutaJson, 'utf8')).years || []).map((y) => ({ anio: y.fiscal_year, cierre: y.period_end || `${y.fiscal_year}-12-31` }));
else { console.error(`No existe ${rutaJson.slice(ROOT.length + 1)}: pasá --anios AAAA-AAAA.`); process.exit(1); }
if (v('--anio')) cierres = cierres.filter((c) => String(c.anio) === v('--anio'));

const cubre = (g, f) => g.desde <= f && (!g.hasta || f <= g.hasta);
const estado = (c) => (gestiones.some((g) => g.confirmada && cubre(g, c.cierre)) ? 'confirmada' : gestiones.some((g) => cubre(g, c.cierre)) ? 'sin confirmar' : 'sin gestión');
console.log(`${clubId}: ${gestiones.length} gestión(es) en data/gestiones/${iso}.js`);
for (const g of gestiones) console.log(`  ${g.desde} a ${g.hasta || 'hoy'}  ${g.nombre}  ${g.confirmada ? 'confirmada' : 'SIN CONFIRMAR'}`);
const huecos = cierres.filter((c) => estado(c) !== 'confirmada');
console.log(`Cierres: ${cierres.map((c) => `${c.anio} ${estado(c)}`).join(' · ')}`);
if (!huecos.length) { console.log('Ningún cierre sin cobertura confirmada: nada que buscar.'); process.exit(0); }

const clave = readFileSync(join(ROOT, 'Admin/api-keys/exa.env'), 'utf8').split('\n').find((l) => l.startsWith('EXA_API_KEY='))?.slice(12).trim();
if (!clave) { console.error('Falta EXA_API_KEY en Admin/api-keys/exa.env'); process.exit(1); }
const nombre = v('--nombre') || clubId.replace(/-[a-z]{2}$/, '');
async function buscar(query, anio) {
  const res = await fetch('https://api.exa.ai/search', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': clave }, body: JSON.stringify({ query, type: 'auto', numResults: 6, contents: { text: { maxCharacters: 400 } } }) });
  if (!res.ok) { console.log(`  Exa devolvió ${res.status} para «${query}»`); return []; }
  const j = await res.json(); appendFileSync(join(ROOT, 'Admin/registros/api/exa.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tool: 'gestion-exa', clubId, anio, costUsd: j.costDollars?.total ?? null }) + '\n');
  return j.results || [];
}
const linea = (r) => `  - ${(r.publishedDate || 's/f').slice(0, 10)} · ${r.url}\n      ${String(r.title || '').slice(0, 110)} :: ${String(r.text || '').replace(/\s+/g, ' ').slice(0, 200)}`;
console.log(`\nLISTA DE PRESIDENTES (pista, sin fecha de publicación):`);
for (const r of (await buscar(`Anexo presidentes del ${nombre}`, null)).filter((x) => /wikipedia/.test(x.url)).slice(0, 2)) console.log(linea(r));
for (const c of huecos) {
  console.log(`\n=== ${c.anio} (cierre ${c.cierre}): ${estado(c)} ===`);
  for (const q of [`${nombre} nuevo presidente ${c.anio}`, `${nombre} presidente renunció ${c.anio}`]) {
    const rs = (await buscar(q, c.anio)).filter((r) => r.publishedDate && Math.abs(Number(r.publishedDate.slice(0, 4)) - c.anio) <= 1);
    console.log(` «${q}»${rs.length ? '' : ': nada con fecha de ese año'}`); for (const r of rs) console.log(linea(r));
  }
}
console.log('\nLa sesión elige la nota que dice CUÁNDO asumió o dejó el cargo y la carga en data/gestiones/' + iso + '.js con confirmada:true y esa URL; lo que ninguna nota fecha queda confirmada:false.');

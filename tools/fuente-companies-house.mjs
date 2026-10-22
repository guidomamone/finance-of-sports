#!/usr/bin/env node
// ============================================================================
// tools/fuente-companies-house.mjs — la url de Companies House para las fuentes británicas que salieron de un informe XHTML (iXBRL) y no la tienen
// (`fuente-xhtml-sin-url` de audit.js).
//
// POR QUÉ. Un club británico cargado desde el XHTML queda con una fuente sin url; el informe está en el registro (find-and-update.company-information.service.gov.uk), en
// la lista de presentaciones de la empresa (filing-history), con una id por presentación. Dar con la id a mano son siete pasos por club.
//
// QUÉ HACE, por cada fuente sin url de <clubId> cuyo id termina en `-ixbrl`:
//   1. el número de empresa: del `.md` del informe («registration number») o, si no, de la nota de sourcing (`Admin/sourcing/<País>/<Club>.md`, «Companies House n° …»);
//   2. el cierre del ejercicio (`period_end` del año de la fuente) -> la presentación de accounts «made up to <esa fecha>» en la lista del registro;
//   3. COMPUERTA: baja el XHTML de esa presentación y lo compara con el archivo local por los hechos etiquetados (ix:nonFraction, valor por valor); si no coinciden, no escribe. Si hay
//      dos presentaciones del mismo cierre (una enmendada), la que coincide con el archivo local.
//
// USO:
//   node tools/fuente-companies-house.mjs <clubId>              ensayo: dice qué url pondría y si el informe coincide
//   node tools/fuente-companies-house.mjs <clubId> --escribir   la escribe con `tools/fuente.mjs` (después: node tools/publicar.mjs)
// ============================================================================
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join, basename, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const HOST = 'https://find-and-update.company-information.service.gov.uk';
const UA = { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' };
const MESES = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
const A = process.argv.slice(2);
const clubId = A.find((a) => !a.startsWith('--'));
if (!clubId) { console.error('uso: node tools/fuente-companies-house.mjs <clubId> [--escribir]'); process.exit(1); }
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

const hechos = (buf) => (buf.toString('utf8').match(/<ix:nonFraction[^>]*>[^<]*<\/ix:nonFraction>/g) || []).map((x) => x.replace(/<[^>]+>/g, '').trim()).join('|');
const buscar = (dir, nombre) => { for (const e of readdirSync(dir)) { const f = join(dir, e); if (statSync(f).isDirectory()) { const r = buscar(f, nombre); if (r) return r; } else if (e === nombre) return f; } return null; };

const jsonRuta = readdirSync(join(ROOT, 'data')).map((d) => join(ROOT, 'data', d, `${clubId}.json`)).find(existsSync);
if (!jsonRuta) { console.error(`No hay data/*/${clubId}.json`); process.exit(1); }
const j = JSON.parse(readFileSync(jsonRuta, 'utf8'));
const pendientes = (j.sources || []).filter((s) => !s.url && /-ixbrl$/.test(s.id));
if (!pendientes.length) { console.log('Ninguna fuente -ixbrl sin url.'); process.exit(0); }

for (const s of pendientes) {
  const base = s.id.slice(clubId.length + 1);
  const xhtml = buscar(join(ROOT, 'Clubes'), `${base}.xhtml`);
  if (!xhtml) { console.log(`${s.id}: no encuentro ${base}.xhtml en Clubes/`); continue; }
  const carpeta = basename(dirname(xhtml)); const pais = basename(dirname(dirname(xhtml)));
  const md = xhtml.replace(/\.xhtml$/, '.md');
  const nota = join(ROOT, 'Admin', 'sourcing', pais, `${carpeta}.md`);
  const delMd = existsSync(md) ? (readFileSync(md, 'utf8').match(/registration (?:number|no\.?)\s*[:\-]?\s*([A-Z]{0,2}\d{6,8})/i) || [])[1] : null;
  const delaNota = existsSync(nota) ? (readFileSync(nota, 'utf8').match(/Companies House n[°º.]*\s*\**\s*([A-Z]{0,2}\d{6,8})/) || [])[1] : null;
  const num = delMd || delaNota;
  const anio = (s.title.match(/ejercicio (\d{4})/) || [])[1];
  const y = (j.years || []).find((a) => String(a.year ?? a.fiscal_year) === anio);
  const fin = y?.period_end || y?.meta?.period_end;
  if (!num || !fin) { console.log(`${s.id}: falta ${!num ? 'el número de empresa (md o nota de sourcing)' : 'el cierre del ejercicio'}`); continue; }
  const local = readFileSync(xhtml); const hl = hechos(local);
  let elegida = null; const candidatas = [];
  for (let p = 1; p < 8 && !elegida; p++) {
    const r = await fetch(`${HOST}/company/${num}/filing-history?page=${p}`, { headers: UA });
    if (!r.ok) { console.log(`${s.id}: el registro respondió ${r.status}`); break; }
    for (const tr of (await r.text()).match(/<tr[\s\S]*?<\/tr>/g) || []) {
      const href = tr.match(/href="\/company\/[^"]*\/filing-history\/([^"/]+)\/document\?format=pdf/);
      const m = tr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').match(/accounts.*? made up to (\d{1,2}) (\w+) (\d{4})/i);
      if (!href || !m) continue;
      if (`${m[3]}-${String(MESES[m[2]]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}` === fin) candidatas.push(href[1]);
    }
    await dormir(500);
  }
  for (const id of candidatas) {
    const url = `${HOST}/company/${num}/filing-history/${id}/document?format=xhtml&download=0`;
    const r = await fetch(url, { headers: UA }); await dormir(600);
    if (!r.ok) { console.log(`   ${id}: ${r.status} (no hay XHTML de esa presentación)`); continue; }
    if (hechos(Buffer.from(await r.arrayBuffer())) === hl && hl) { elegida = url; break; }
    console.log(`   ${id}: otro informe (los hechos etiquetados no coinciden con el archivo local)`);
  }
  if (!elegida) { console.log(`${s.id}: empresa ${num}, cierre ${fin}: ${candidatas.length ? 'ninguna presentación coincide con el archivo local' : 'no hay presentación de ese cierre'}; no se escribe`); continue; }
  console.log(`${s.id}: empresa ${num}, cierre ${fin} -> ${elegida} (mismos hechos etiquetados que el archivo local)`);
  if (A.includes('--escribir')) execFileSync('node', ['tools/fuente.mjs', clubId, s.id, '--url', elegida, '--nota', 'Informe oficial en formato XHTML (iXBRL)', '--escribir'], { cwd: ROOT, stdio: 'inherit' });
}

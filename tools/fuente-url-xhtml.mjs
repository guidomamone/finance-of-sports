#!/usr/bin/env node
// ============================================================================
// tools/fuente-url-xhtml.mjs — pone la url del registro oficial a las fuentes que salieron de un informe XHTML (iXBRL) y no la tienen (`fuente-xhtml-sin-url` de audit.js).
//
// POR QUÉ. Un club cargado desde el XHTML queda con una fuente sin url; el informe está en el registro del país, en la lista de presentaciones de la empresa. Dar con la url a mano es una
// búsqueda por club. Esta tool la hace sola, y `publicarCambios()` de `cargar.mjs` (el paso que cierra toda carga, alta o caja y deuda) la corre al terminar con `--todos --escribir`:
// nadie tiene que acordarse de usarla.
//
// PROVEEDORES (por la carpeta de país del informe en Clubes/):
//   Reino Unido (Inglaterra, Escocia, Gales, Irlanda del Norte): Companies House. Número de empresa: «registration number» del `.md` del informe o «Companies House n° …» de la nota de sourcing
//     (`Admin/sourcing/<País>/<Club>.md`); la presentación de accounts «made up to <cierre>» en filing-history; url = .../document?format=xhtml&download=0.
//   Dinamarca: Virk (distribution.virk.dk). CVR de la nota de sourcing; el informe anual (AARSRAPPORT) del ejercicio que cierra ese día; url = la del depósito (regnskaber.virk.dk, .xhtml).
//   El número que aparece en una url de regnskaber.virk.dk NO es el CVR: no se usa.
//
// COMPUERTA. Baja el XHTML de la url candidata y lo compara con el archivo local por los hechos etiquetados (ix:nonFraction, valor por valor, y en el mismo orden); si no coinciden, o no hay
// candidata, no escribe nada y lo dice (el aviso de audit.js queda). Si el cierre tiene dos presentaciones (una enmendada), vale la que coincide con el archivo local.
//
// USO:
//   node tools/fuente-url-xhtml.mjs <clubId>                   ensayo: dice qué url pondría y si el informe coincide
//   node tools/fuente-url-xhtml.mjs <clubId> --escribir        la escribe con tools/fuente.mjs (después: node tools/publicar.mjs)
//   node tools/fuente-url-xhtml.mjs --todos [--escribir]       lo mismo para todos los clubes con fuentes -ixbrl sin url (silencioso si no hay)
// ============================================================================
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join, basename, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const TODOS = A.includes('--todos'); const ESCRIBIR = A.includes('--escribir'); const CON_URL = A.includes('--incluir-con-url'); // CON_URL: solo ensayo, para probar la tool con una fuente que ya la tiene
const esXhtml = (clubId, s) => { const x = xhtmlDe(clubId, s.id.slice(clubId.length + 1)); if (!x) return false; const md = x.replace(/\.xhtml$/, '.md'); return existsSync(md) && /xhtml-aarsrapport\.mjs/.test(readFileSync(md, 'utf8').slice(0, 400)); };
const pendiente = (clubId) => (s) => (CON_URL || !s.url) && s.id.startsWith(clubId + '-') && esXhtml(clubId, s);
const clubArg = A.find((a) => !a.startsWith('--'));
if (!clubArg && !TODOS) { console.error('uso: node tools/fuente-url-xhtml.mjs <clubId> [--escribir] | --todos [--escribir]'); process.exit(1); }

const UA = { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' };
const CH = 'https://find-and-update.company-information.service.gov.uk';
const MESES = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
const PAIS_UK = new Set(['Inglaterra', 'Escocia', 'Gales', 'Irlanda del Norte']);
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const hechos = (buf) => (buf.toString('utf8').match(/<ix:nonFraction[^>]*>[^<]*<\/ix:nonFraction>/g) || []).map((x) => x.replace(/<[^>]+>/g, '').trim()).join('|');
const slug = (x) => String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// los .xhtml de Clubes/ por slug de su nombre (el id de una fuente es <clubId>-<slug del archivo>); se recorre una sola vez. Muchos clubes tienen el mismo nombre de archivo
//: de varios candidatos vale el que cita la evidencia de carga del club (Admin/carga-clubes/<clubId>.md); si ninguno la cita, es ambiguo y no se elige.
let INDICE_XHTML = null;
function xhtmlDe(clubId, base) {
  if (!INDICE_XHTML) {
    INDICE_XHTML = new Map();
    (function walk(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.xhtml')) { const k = slug(e.name.slice(0, -6)); INDICE_XHTML.set(k, [...(INDICE_XHTML.get(k) || []), f]); } } })(join(ROOT, 'Clubes'));
  }
  const cand = INDICE_XHTML.get(base) || [];
  if (!cand.length) return null;
  const evidencia = leerArchivo(join(ROOT, 'Admin', 'carga-clubes', `${clubId}.md`));
  const citados = cand.filter((f) => evidencia.includes(f.slice(ROOT.length + 1).replace(/\.xhtml$/, '')));
  return citados.length === 1 ? citados[0] : null;
}
const leer = (f) => (f && existsSync(f) ? readFileSync(f, 'utf8') : '');
function leerArchivo(f) { return leer(f); }

// ---- proveedores: devuelven la lista de urls candidatas del informe que cierra en `fin`
async function candidatasUK(num, fin) {
  const urls = [];
  for (let p = 1; p < 8; p++) {
    const r = await fetch(`${CH}/company/${num}/filing-history?page=${p}`, { headers: UA });
    if (!r.ok) break;
    for (const tr of (await r.text()).match(/<tr[\s\S]*?<\/tr>/g) || []) {
      const href = tr.match(/href="\/company\/[^"]*\/filing-history\/([^"/]+)\/document\?format=pdf/);
      const m = tr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').match(/accounts.*? made up to (\d{1,2}) (\w+) (\d{4})/i);
      if (href && m && `${m[3]}-${String(MESES[m[2]]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}` === fin) urls.push(`${CH}/company/${num}/filing-history/${href[1]}/document?format=xhtml&download=0`);
    }
    await dormir(500);
  }
  return urls;
}
async function candidatasDK(cvr, fin) {
  const r = await fetch(`http://distribution.virk.dk/offentliggoerelser/_search?q=cvrNummer:${cvr}&size=50&sort=regnskab.regnskabsperiode.slutDato:desc`, { headers: UA });
  if (!r.ok) return [];
  const hits = (await r.json()).hits?.hits || [];
  return hits.filter((h) => h._source?.regnskab?.regnskabsperiode?.slutDato === fin)
    .flatMap((h) => (h._source.dokumenter || []).filter((d) => d.dokumentType === 'AARSRAPPORT' && /xhtml/.test(d.dokumentMimeType)).map((d) => d.dokumentUrl));
}

async function resolver(clubId, j, s) {
  const base = s.id.slice(clubId.length + 1);
  const xhtml = xhtmlDe(clubId, base);
  if (!xhtml) return { s, error: `no encuentro ${base}.xhtml en Clubes/` };
  const carpeta = basename(dirname(xhtml)); const pais = basename(dirname(dirname(xhtml)));
  const nota = leer(join(ROOT, 'Admin', 'sourcing', pais, `${carpeta}.md`));
  const anio = (s.title.match(/ejercicio (\d{4})/) || [])[1];
  const y = (j.years || []).find((a) => String(a.year ?? a.fiscal_year) === anio);
  const fin = y?.period_end || y?.meta?.period_end;
  if (!fin) return { s, error: 'falta el cierre del ejercicio en el JSON' };
  let candidatas;
  if (PAIS_UK.has(pais)) {
    const num = (leer(xhtml.replace(/\.xhtml$/, '.md')).match(/registration (?:number|no\.?)\s*[:\-]?\s*([A-Z]{0,2}\d{6,8})/i) || [])[1] || (nota.match(/Companies House n[°º.]*\s*\**\s*([A-Z]{0,2}\d{6,8})/) || [])[1];
    if (!num) return { s, error: 'falta el número de empresa (el .md del informe o la nota de sourcing)' };
    candidatas = await candidatasUK(num, fin);
  } else if (pais === 'Dinamarca') {
    const cvr = (nota.match(/CVR[^0-9\n]{0,15}((?:\d\s?){8})/) || [])[1]?.replace(/\s/g, '');
    if (!cvr) return { s, error: 'falta el CVR en la nota de sourcing' };
    candidatas = await candidatasDK(cvr, fin);
  } else return { s, error: `el país ${pais} no tiene proveedor en esta tool` };
  if (!candidatas.length) return { s, error: `no hay presentación que cierre el ${fin}` };
  const hl = hechos(readFileSync(xhtml));
  for (const url of candidatas) {
    const r = await fetch(url, { headers: UA }); await dormir(600);
    if (!r.ok) continue;
    if (hl && hechos(Buffer.from(await r.arrayBuffer())) === hl) return { s, url };
  }
  return { s, error: `ninguna de las ${candidatas.length} presentaciones del ${fin} coincide con el archivo local (hechos etiquetados distintos o sin XHTML)` };
}

// ---- qué clubes
const clubes = [];
if (TODOS) {
  for (const d of readdirSync(join(ROOT, 'data'))) {
    const dir = join(ROOT, 'data', d);
    if (!statSync(dir).isDirectory()) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
      let j; try { j = JSON.parse(readFileSync(join(dir, f), 'utf8')); } catch { continue; }
      if (j.club?.id && (j.sources || []).some(pendiente(j.club.id))) clubes.push(j);
    }
  }
} else {
  const ruta = readdirSync(join(ROOT, 'data')).map((d) => join(ROOT, 'data', d, `${clubArg}.json`)).find(existsSync);
  if (!ruta) { console.error(`No hay data/*/${clubArg}.json`); process.exit(1); }
  clubes.push(JSON.parse(readFileSync(ruta, 'utf8')));
}
let escritas = 0;
for (const j of clubes) {
  const clubId = j.club.id;
  for (const s of (j.sources || []).filter(pendiente(clubId))) {
    const r = await resolver(clubId, j, s);
    if (r.error) { console.log(`${s.id}: ${r.error}; no se escribe`); continue; }
    console.log(`${s.id}: ${r.url} (mismos hechos etiquetados que el archivo local)`);
    if (ESCRIBIR) { execFileSync('node', ['tools/fuente.mjs', clubId, s.id, '--url', r.url, '--nota', 'Informe oficial en formato XHTML (iXBRL)', '--escribir'], { cwd: ROOT, stdio: 'ignore' }); escritas++; }
  }
}
if (!clubes.length && !TODOS) console.log('Ninguna fuente -ixbrl sin url.');
if (ESCRIBIR && escritas) console.log(`${escritas} url escritas (después: node tools/publicar.mjs)`);

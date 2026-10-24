#!/usr/bin/env node
// ============================================================================
// tools/fuente-documento.mjs — completa `document` (la ruta del PDF de origen) en las fuentes de los clubes ya cargados.
//
// POR QUÉ. Una fuente (sources[]) solo traía un id y un título genérico; para saber de qué PDF salió un ejercicio había que adivinar por el
// nombre. cargar.mjs ya escribe `document` en las fuentes nuevas; esto lo completa en las viejas SIN adivinar: el título genérico que escribió
// cargar.mjs («<club> — <nombre del pdf> (ejercicio <año>)») trae el nombre del archivo, y se busca en Clubes/<país>/ el .pdf o el .md con
// ese nombre. Solo se escribe si hay UN archivo candidato en todo Clubes/; si hay 0 o varios, se lista y no se toca.
//
// USO: node tools/fuente-documento.mjs [<clubId> …]            ensayo (cuenta y lista lo que no pudo)
//      node tools/fuente-documento.mjs [<clubId> …] --escribir  escribe (después: node tools/publicar.mjs)
// ============================================================================
import { readdirSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { leerJsonClub, modificarClub } from './club-json.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const escribir = A.includes('--escribir'); const pedidos = A.filter((a) => !a.startsWith('--'));

// nombre sin extensión -> rutas relativas de .pdf y .md bajo Clubes/ (los PDFs no se trackean: la transcripción prueba que el documento existió)
const porNombre = new Map();
(function recorrer(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) recorrer(p); else if (/\.(pdf|md)$/i.test(e.name)) { const k = e.name.replace(/\.(pdf|md)$/i, ''); if (!porNombre.has(k)) porNombre.set(k, new Set()); porNombre.get(k).add(relative(ROOT, p).replace(/\.md$/i, '.pdf')); } } })(join(ROOT, 'Clubes'));

const carpetasDeClubes = [...new Set([...porNombre.values()].flatMap((v) => [...v].map((r) => r.split('/').slice(0, 3).join('/'))))];
const plano = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const ids = [];
for (const p of readdirSync(join(ROOT, 'data'))) { try { for (const f of readdirSync(join(ROOT, 'data', p))) { const m = f.match(/^(.+-[a-z]{2})\.json$/); if (m) ids.push(m[1]); } } catch { /* no es carpeta de país */ } }
const clubes = pedidos.length ? pedidos : ids.sort();

let completas = 0, yaTenian = 0; const sinCandidato = [], ambiguas = [], sinNombre = [];
for (const id of clubes) {
  let j; try { j = leerJsonClub(id); } catch { continue; }
  const cambios = []; const pendientes = [];
  const slugClub = plano(id.replace(/-[a-z]{2}$/, ''));
  // pasada 1: el nombre del archivo está en el título genérico; si varios clubes lo llaman igual, el de la carpeta que se llama como el club
  for (const s of j.sources || []) {
    if (s.document) { yaTenian++; continue; }
    const m = String(s.title || '').match(/ — (.+) \(ejercicio \d{4}\)$/);
    let cand = m ? [...(porNombre.get(m[1]) || [])] : [];
    if (cand.length > 1) { const propios = cand.filter((c) => plano(c.split('/')[2].replace(/\s*\(.*$/, '')) === slugClub); if (propios.length) cand = propios; }
    if (cand.length === 1) cambios.push([s.id, cand[0]]); else pendientes.push([s, m, cand]);
  }
  // pasada 2: la carpeta del club es la que ya salió en la pasada 1 (si salió una sola); ahí se busca por el nombre del título o, sin él, por el id
  // de la fuente (<clubId>-<nombre del archivo>)
  const carpetas = new Set(cambios.map(([, r]) => r.split('/').slice(0, 3).join('/')));
  if (carpetas.size === 0) { const c = carpetasDeClubes.filter((f) => { const p = plano(f.split('/')[2].replace(/\s*\(.*$/, '')); return p.length >= 4 && (p.includes(slugClub) || slugClub.includes(p)); }); if (c.length === 1) carpetas.add(c[0]); }
  for (const [s, m, cand] of pendientes) {
    const dentro = carpetas.size === 1 ? [...carpetas][0] : null;
    let hallado = null;
    if (dentro) {
      const nombre = m ? m[1] : s.id.startsWith(id + '-') ? s.id.slice(id.length + 1) : null;
      const enCarpeta = nombre ? [...porNombre.entries()].filter(([k, v]) => (k === nombre || plano(k) === plano(nombre)) && [...v].some((r) => r.startsWith(dentro + '/'))) : [];
      const rutas = enCarpeta.flatMap(([, v]) => [...v].filter((r) => r.startsWith(dentro + '/')));
      if (rutas.length === 1) hallado = rutas[0];
    }
    // sin carpeta conocida (o sin hallazgo en ella): el nombre sale del título o del id de la fuente, y el archivo es el ÚNICO de ese nombre cuya carpeta se parece al club
    if (!hallado) {
      const nombre = m ? m[1] : s.id.startsWith(id + '-') ? s.id.slice(id.length + 1) : null;
      if (nombre) {
        const rutas = [...porNombre.entries()].filter(([k]) => k === nombre || plano(k) === plano(nombre)).flatMap(([, v]) => [...v])
          .filter((r) => { const p = plano(r.split('/')[2].replace(/\s*\(.*$/, '')); return p.length >= 4 && (p.includes(slugClub.slice(0, 5)) || slugClub.includes(p.slice(0, 5))); });
        if (new Set(rutas).size === 1) hallado = rutas[0];
      }
    }
    if (hallado) cambios.push([s.id, hallado]);
    else if (cand.length) ambiguas.push(`${id} ${s.id}: ${cand.length} archivos`);
    else if (m) sinCandidato.push(`${id} ${s.id} («${m[1]}»)`);
    else sinNombre.push(`${id} ${s.id}`);
  }
  if (!cambios.length) continue;
  completas += cambios.length;
  if (escribir) modificarClub(id, (c) => { for (const [sid, ruta] of cambios) if (c.sources[sid]) c.sources[sid].documento = ruta; });
}
console.log(`${escribir ? 'ESCRITO' : 'ENSAYO'}: ${completas} fuentes completadas; ya tenían ${yaTenian}; sin archivo ${sinCandidato.length}; ambiguas ${ambiguas.length}; sin nombre en el título ${sinNombre.length}`);
for (const [t, l] of [['SIN ARCHIVO', sinCandidato], ['AMBIGUAS', ambiguas], ['SIN NOMBRE', sinNombre]]) if (l.length) console.log(`\n${t} (primeras 15):\n  ${l.slice(0, 15).join('\n  ')}`);

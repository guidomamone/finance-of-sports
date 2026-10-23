#!/usr/bin/env node
// ============================================================================
// medir-cargar.mjs — mide un cambio de tools/cargar.mjs ANTES y DESPUÉS en todos los documentos
// ============================================================================
//
// POR QUÉ: los lotes de prueba (`lote.mjs --lista Admin/lotes/prueba-*.txt`) en ensayo cubren localizar y extraer, no la carga: un cambio en
// la escalera de categorías de cargar.mjs no se ve ahí. Esto corre el ensayo de cargar.mjs (--desde-verificacion --reemplazar, no escribe
// nada en el sitio) en CADA PDF que tiene un .categorias.json en Generados/ y guarda, por documento, los frenos y cada fila (etiqueta,
// renglón, categoría, destino, si va a la cola y con qué clave, importe). Dos corridas se comparan con --comparar.
//
// La cola va a una COPIA (COLA_ARCHIVO = <salida>.cola.jsonl): el ensayo agrega casos y no tienen que quedar en la cola real.
// Ojo: el ensayo agrega líneas a Admin/registros/categorias-aprendidas.jsonl (respuestas de la cola ya aplicadas); después de medir,
// `git checkout -- Admin/registros/categorias-aprendidas.jsonl`.
//
// USO (desde la raíz; ~6 min para ~570 documentos):
//   node tools/medir-cargar.mjs --salida /tmp/antes.jsonl          # antes del cambio (--trabajadores N, --lista <archivo>, --dir <carpeta>)
//   node tools/medir-cargar.mjs --salida /tmp/despues.jsonl        # después
//   node tools/medir-cargar.mjs --comparar /tmp/antes.jsonl /tmp/despues.jsonl
//   node tools/medir-cargar.mjs --contra-sitio /tmp/despues.jsonl  # ¿el ensayo reproduce lo publicado?
//
// --contra-sitio: por documento cuyo año está publicado CON ESE MISMO documento (mismo sourceId), la suma por categoría del ensayo contra
// la de data/ (diferencia de más de 0,001 M); y los que el ensayo frena aunque estén publicados. Un año publicado con otra fuente, a mano
// o desde otro documento, no se compara.
//
// Lo que se espera de un cambio que entra: lo cargado idéntico; las diferencias, solo filas que pasan a la cola (explicadas una por una).
// Medido así: el escalón de la categoría del renglón: 25 preguntas nuevas en 11 de 570 documentos.
// ============================================================================

import { readdirSync, statSync, existsSync, readFileSync, appendFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { loadSite } from './datos-sitio.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };

// EN PARALELO Y ACOTABLE: un pool de procesos (--trabajadores N, default 8; 1 = en serie como antes). Los documentos de un
// mismo club van al MISMO trabajador y en orden (cargar.mjs aplica respuestas de la cola a otros años del club), cada trabajador con su
// copia de la cola, y la salida se escribe al final ordenada por pdf: --comparar entre una corrida en serie y una en paralelo da idéntico.
// --lista <archivo> o --dir <carpeta> miden solo esos documentos (los que tienen .categorias.json).
async function medir(salida) {
  const { execFile } = await import('node:child_process'); const { promisify } = await import('node:util'); const run = promisify(execFile);
  const N = Math.max(1, Number(flag('--trabajadores') || 8));
  let docs = [];
  const walk = (d) => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n.endsWith('.categorias.json')) docs.push(p); } };
  walk(resolve(ROOT, 'Generados'));
  const pdfDe = (c) => c.slice(ROOT.length + 1).replace(/^Generados\//, 'Clubes/').replace(/\.categorias\.json$/, '.pdf');
  if (flag('--lista')) { const set = new Set(readFileSync(resolve(ROOT, flag('--lista')), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))); docs = docs.filter((c) => set.has(pdfDe(c))); }
  if (flag('--dir')) { const dir = flag('--dir').replace(/\/$/, '') + '/'; docs = docs.filter((c) => pdfDe(c).startsWith(dir)); }
  const porClub = new Map(); for (const c of docs.sort()) { const pdf = pdfDe(c); const club = pdf.split('/').slice(0, 3).join('/'); if (!porClub.has(club)) porClub.set(club, []); porClub.get(club).push(pdf); }
  const colas = [...porClub.values()].sort((a, b) => b.length - a.length); const carga = Array.from({ length: N }, () => []); const peso = new Array(N).fill(0);
  for (const g of colas) { const k = peso.indexOf(Math.min(...peso)); carga[k].push(...g); peso[k] += g.length; } // reparto por club, balanceado
  const res = []; let hechos = 0;
  await Promise.all(carga.map(async (lista, k) => {
    const cola = `${salida}.cola${k}.jsonl`; copyFileSync(resolve(ROOT, 'Admin/registros/cola-revision.jsonl'), cola);
    for (const pdf of lista) {
      if (!existsSync(resolve(ROOT, pdf))) { res.push({ pdf, error: 'sin pdf' }); continue; }
      let out = '';
      try { out = (await run('node', ['tools/cargar.mjs', pdf, '--desde-verificacion', '--reemplazar'], { cwd: ROOT, env: { ...process.env, COLA_ARCHIVO: cola }, encoding: 'utf8', maxBuffer: 1 << 28 })).stdout; }
      catch (e) { out = String(e.stdout || ''); }
      let j; try { j = JSON.parse(out.slice(out.indexOf('{'))); } catch { res.push({ pdf, error: 'sin json' }); continue; }
      res.push({ pdf, clubId: j.clubId ?? null, year: j.year ?? null, sourceId: j.procedencia?.sourceId?.valor ?? null,
        cacheViejo: (j.avisos || []).some((a) => /^caché viejo:/.test(a)), frena: (j.frena || []).map((f) => f.etapa), frenaMotivos: (j.frena || []).map((f) => `${f.etapa}: ${String(f.motivo).slice(0, 160)}`), carga: j.resumen?.carga,
        filas: (j.filas || []).map((f) => [f.label, f.origen, f.cat, f.destino, !!f.enCola, f.casoCola?.detalle || null, f.amountNative]) });
      if (++hechos % 50 === 0) console.log(hechos, '/', docs.length);
    }
  }));
  writeFileSync(salida, res.sort((a, b) => (a.pdf < b.pdf ? -1 : a.pdf > b.pdf ? 1 : 0)).map((o) => JSON.stringify(o)).join('\n') + '\n');
  console.log(`listo: ${docs.length} documentos en ${salida} (${N} trabajador(es))`);
}

function comparar(fa, fb) {
  const leer = (f) => new Map(readFileSync(f, 'utf8').trim().split('\n').map((l) => JSON.parse(l)).map((o) => [o.pdf, o]));
  const [a0, b0] = [leer(fa), leer(fb)]; let docs = 0, colaNuevas = 0, catCambia = 0;
  for (const [pdf, a] of a0) {
    const b = b0.get(pdf); if (!b) { console.log('FALTA', pdf); continue; }
    const lin = []; const n = Math.max(a.filas?.length || 0, b.filas?.length || 0);
    for (let k = 0; k < n; k++) {
      const x = a.filas?.[k] || [], y = b.filas?.[k] || [];
      if (JSON.stringify(x) === JSON.stringify(y)) continue;
      lin.push(`   ${x[0]} [${String(x[1] || '').slice(0, 70)}] ${x[2]}${x[4] ? '(cola)' : ''} -> ${y[2]}${y[4] ? `(cola ${y[5]})` : ''} ${y[6]}`);
      if (y[4] && !x[4]) colaNuevas++;
      if (x[2] !== y[2] || x[3] !== y[3]) catCambia++;
    }
    if (lin.length || JSON.stringify(a.frena) !== JSON.stringify(b.frena)) { docs++; console.log(pdf, 'frena', JSON.stringify(a.frena), '->', JSON.stringify(b.frena), 'carga', a.carga, '->', b.carga); lin.forEach((l) => console.log(l)); }
  }
  console.log(`\ndocumentos distintos: ${docs} · filas que pasan a la cola: ${colaNuevas} · filas con categoría o destino distinto: ${catCambia}`);
}

const club_pub = (generic, d) => { const ym = generic[d.clubId]?.fiscalYearMeta?.[d.year]; return !!(ym && d.sourceId && ym.sourceId === d.sourceId); };
function contraSitio(f) {
  const { generic } = loadSite();
  const docs = readFileSync(f, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  let comparados = 0, iguales = 0; const distintos = [], frenados = [];
  for (const d of docs) {
    const club = generic[d.clubId]; const ym = club?.fiscalYearMeta?.[d.year];
    if (!ym || !d.sourceId || ym.sourceId !== d.sourceId) continue; // no publicado, o publicado con otra fuente
    if ((d.frena || []).length) { frenados.push(`${d.pdf} (${d.clubId} ${d.year}): ${d.frenaMotivos.join(' | ')}`); continue; }
    comparados++;
    const pub = {}; for (const l of [...(club.revenueLinesByYear?.[d.year] || []), ...(club.expenseLinesByYear?.[d.year] || [])]) pub[l.normalizedCategory] = (pub[l.normalizedCategory] || 0) + l.amountNative;
    const ens = {}; for (const x of d.filas || []) if (x[3] === 'revenue' || x[3] === 'expense') ens[x[2]] = (ens[x[2]] || 0) + (x[6] || 0);
    const difs = [...new Set([...Object.keys(pub), ...Object.keys(ens)])].filter((k) => Math.abs((pub[k] || 0) - (ens[k] || 0)) > 0.001).map((k) => `${k} ${(pub[k] || 0).toFixed(6)} -> ${(ens[k] || 0).toFixed(6)}`);
    if (difs.length) distintos.push(`${d.pdf} (${d.clubId} ${d.year}): ${difs.join('; ')}`); else iguales++;
  }
  const viejos = docs.filter((d) => d.cacheViejo);
  console.log(`publicados con el mismo documento: ${comparados + frenados.length} · el ensayo reproduce lo publicado: ${iguales} · distinto: ${distintos.length} · el ensayo frena: ${frenados.length}`);
  if (distintos.length) console.log('\nDISTINTO (publicado -> ensayo, por categoría):\n' + distintos.join('\n'));
  if (frenados.length) console.log('\nFRENA:\n' + frenados.join('\n'));
  if (viejos.length) console.log(`\nCACHÉ VIEJO (el .verificacion.json es de otra versión de verificar.mjs; to-do 298 a3), ${viejos.length}:\n` + viejos.map((d) => `${d.pdf}${club_pub(generic, d) ? ' (PUBLICADO)' : ''}`).join('\n'));
}

if (flag('--salida')) medir(resolve(flag('--salida')));
else if (flag('--contra-sitio')) contraSitio(resolve(flag('--contra-sitio')));
else if (A.includes('--comparar')) { const i = A.indexOf('--comparar'); comparar(A[i + 1], A[i + 2]); }
else { console.error('Uso: node tools/medir-cargar.mjs --salida <archivo.jsonl> | --comparar <antes.jsonl> <despues.jsonl> | --contra-sitio <archivo.jsonl>'); process.exit(1); }

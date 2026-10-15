#!/usr/bin/env node
// ============================================================================
// medir-cargar.mjs — mide un cambio de tools/cargar.mjs ANTES y DESPUÉS en todos los documentos (to-do 234, 2026-10-15)
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
//   node tools/medir-cargar.mjs --salida /tmp/antes.jsonl          # antes del cambio
//   node tools/medir-cargar.mjs --salida /tmp/despues.jsonl        # después
//   node tools/medir-cargar.mjs --comparar /tmp/antes.jsonl /tmp/despues.jsonl
//   node tools/medir-cargar.mjs --contra-sitio /tmp/despues.jsonl  # ¿el ensayo reproduce lo publicado? (to-do 236)
//
// --contra-sitio: por documento cuyo año está publicado CON ESE MISMO documento (mismo sourceId), la suma por categoría del ensayo contra
// la de data/ (diferencia de más de 0,001 M); y los que el ensayo frena aunque estén publicados. Un año publicado con otra fuente, a mano
// o desde otro documento, no se compara.
//
// Lo que se espera de un cambio que entra: lo cargado idéntico; las diferencias, solo filas que pasan a la cola (explicadas una por una).
// Medido así: el escalón de la categoría del renglón (to-do 234): 25 preguntas nuevas en 11 de 570 documentos.
// ============================================================================

import { readdirSync, statSync, existsSync, readFileSync, appendFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { loadSite } from './datos-sitio.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };

function medir(salida) {
  writeFileSync(salida, '');
  const cola = `${salida}.cola.jsonl`; copyFileSync(resolve(ROOT, 'Admin/registros/cola-revision.jsonl'), cola);
  const docs = [];
  const walk = (d) => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n.endsWith('.categorias.json')) docs.push(p); } };
  walk(resolve(ROOT, 'Generados'));
  let i = 0;
  for (const c of docs.sort()) {
    const pdf = c.slice(ROOT.length + 1).replace(/^Generados\//, 'Clubes/').replace(/\.categorias\.json$/, '.pdf');
    if (!existsSync(resolve(ROOT, pdf))) { appendFileSync(salida, JSON.stringify({ pdf, error: 'sin pdf' }) + '\n'); continue; }
    let out = '';
    try { out = execFileSync('node', ['tools/cargar.mjs', pdf, '--desde-verificacion', '--reemplazar'], { cwd: ROOT, env: { ...process.env, COLA_ARCHIVO: cola }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 28 }); }
    catch (e) { out = String(e.stdout || ''); }
    let j; try { j = JSON.parse(out.slice(out.indexOf('{'))); } catch { appendFileSync(salida, JSON.stringify({ pdf, error: 'sin json' }) + '\n'); continue; }
    appendFileSync(salida, JSON.stringify({ pdf, clubId: j.clubId ?? null, year: j.year ?? null, sourceId: j.procedencia?.sourceId?.valor ?? null,
      frena: (j.frena || []).map((f) => f.etapa), frenaMotivos: (j.frena || []).map((f) => `${f.etapa}: ${String(f.motivo).slice(0, 160)}`), carga: j.resumen?.carga,
      filas: (j.filas || []).map((f) => [f.label, f.origen, f.cat, f.destino, !!f.enCola, f.casoCola?.detalle || null, f.amountNative]) }) + '\n');
    if (++i % 50 === 0) console.log(i, '/', docs.length);
  }
  console.log(`listo: ${docs.length} documentos en ${salida}`);
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

function contraSitio(f) {
  const { generic } = loadSite();
  const docs = readFileSync(f, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  let comparados = 0, iguales = 0; const distintos = [], frenados = [];
  for (const d of docs) {
    const club = generic[d.clubId]; const ym = club?.fiscalYearMeta?.[d.year];
    if (!ym || !d.sourceId || ym.sourceId !== d.sourceId) continue; // no publicado, o publicado con otra fuente
    if ((d.frena || []).length) { frenados.push(`${d.pdf} (${d.clubId} ${d.year}): ${d.frenaMotivos.join(' | ')}`); continue; }
    comparados++;
    const pub = {}; for (const l of [...(club.revenueLines?.[d.year] || []), ...(club.expenseLines?.[d.year] || [])]) pub[l.normalizedCategory] = (pub[l.normalizedCategory] || 0) + l.amountNative;
    const ens = {}; for (const x of d.filas || []) if (x[3] === 'revenue' || x[3] === 'expense') ens[x[2]] = (ens[x[2]] || 0) + (x[6] || 0);
    const difs = [...new Set([...Object.keys(pub), ...Object.keys(ens)])].filter((k) => Math.abs((pub[k] || 0) - (ens[k] || 0)) > 0.001).map((k) => `${k} ${(pub[k] || 0).toFixed(6)} -> ${(ens[k] || 0).toFixed(6)}`);
    if (difs.length) distintos.push(`${d.pdf} (${d.clubId} ${d.year}): ${difs.join('; ')}`); else iguales++;
  }
  console.log(`publicados con el mismo documento: ${comparados + frenados.length} · el ensayo reproduce lo publicado: ${iguales} · distinto: ${distintos.length} · el ensayo frena: ${frenados.length}`);
  if (distintos.length) console.log('\nDISTINTO (publicado -> ensayo, por categoría):\n' + distintos.join('\n'));
  if (frenados.length) console.log('\nFRENA:\n' + frenados.join('\n'));
}

if (flag('--salida')) medir(resolve(flag('--salida')));
else if (flag('--contra-sitio')) contraSitio(resolve(flag('--contra-sitio')));
else if (A.includes('--comparar')) { const i = A.indexOf('--comparar'); comparar(A[i + 1], A[i + 2]); }
else { console.error('Uso: node tools/medir-cargar.mjs --salida <archivo.jsonl> | --comparar <antes.jsonl> <despues.jsonl> | --contra-sitio <archivo.jsonl>'); process.exit(1); }

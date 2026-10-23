#!/usr/bin/env node
// ============================================================================
// tools/que-pide.mjs — qué va a pedir el commit de lo que cambiaste, ANTES de commitear. Los hooks de commit piden, según el archivo:
// la clasificación de una tool nueva, la medición de una tool del pipeline o de un módulo que ellas usan, el veredicto de un cambio de código,
// el commit aparte de una skill. Esto lo dice por adelantado, con el comando, en una línea por archivo.
//
//   node tools/que-pide.mjs [archivo …]      (default: lo cambiado contra HEAD, más lo staged y lo nuevo)
//   --staged                                 mira lo que entra al commit (el índice) en vez del árbol de trabajo
// Sale con 1 si algo falta (✗). Lo nombran los mensajes de rechazo de tools/hooks/pre-tool.mjs y `fos cerrar`.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { clasificar } from './clasificar-tools.mjs';
import { cambioDeCodigo } from './patron.mjs';
import { perdidos } from './limpiar-comentarios.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const git = (...a) => { try { return execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };
const leerJsonl = (ruta) => (existsSync(ruta) ? readFileSync(ruta, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);

export function quePide(archivos, { staged = false } = {}) {
  const C = clasificar(ROOT);
  const T = JSON.parse(readFileSync(join(ROOT, 'tools', 'pipeline-tools.json'), 'utf8'));
  const mediciones = leerJsonl(join(ROOT, 'Admin', 'registros', 'mediciones-pipeline.jsonl'));
  const veredictos = leerJsonl(join(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl'));
  const BUENO = /^(idéntico|\d+ diferencias, todas explicadas)$/;
  const huella = (n) => git(...(staged ? ['rev-parse', `:tools/${n}`] : ['hash-object', `tools/${n}`])).trim();
  const filas = [];
  // una mudanza (un bloque que pasa de una tool a otra) se juzga con todas las tools cambiadas juntas, como hace el hook de commit
  const conjunto = archivos.map((f) => f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter((n) => n && existsSync(join(ROOT, 'tools', n)) && ['tools', 'modulo'].includes(C.clase(n)));
  const difConjunto = conjunto.length ? cambioDeCodigo(conjunto, { destino: staged ? 'indice' : null }) : null;
  for (const f of archivos) {
    const tool = f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1];
    if (tool && existsSync(join(ROOT, f))) {
      const clase = C.clase(tool);
      if (clase === 'sin_clasificar') { filas.push({ f, ok: false, texto: `sin clasificar: sumala a «tools» o «no_pipeline» de tools/pipeline-tools.json (node tools/clasificar-tools.mjs ${tool})` }); continue; }
      if (!['tools', 'modulo'].includes(clase)) { filas.push({ f, ok: true, texto: `${clase === 'no_pipeline' ? 'no es del pipeline' : clase}: no pide medición ni veredicto` }); continue; }
      const medidores = T.tools[tool]?.medidores || C.modulos.get(tool)?.medidores || [];
      const dif = difConjunto || cambioDeCodigo([tool], { destino: staged ? 'indice' : null });
      const solo = !dif.agregado.length && !dif.quitado.length;
      const h = huella(tool);
      const medida = mediciones.some((l) => BUENO.test(l.resultado || '') && l.tools?.[tool]?.despues === h);
      const conVeredicto = veredictos.some((l) => /^GENERAL/.test(l.veredicto || '') && l.tools?.[tool] === h);
      const piezas = [];
      const igual = git('rev-parse', `HEAD:tools/${tool}`).trim() === h;
      if (igual) piezas.push('sin cambios contra HEAD');
      else if (!dif.hayCodigo && !solo) piezas.push('mudanza de código');
      else if (solo) piezas.push('solo comentarios');
      if (solo && !igual) { const p = perdidos([tool], {}); if (p.length) piezas.push(`${p.length} línea(s) de comentario con contenido que ya no está (node tools/fos.mjs limpiar-comentarios --perdidos)`); }
      piezas.push(medida ? 'medida ✓' : `falta medir: node tools/fos.mjs medir pipeline (${solo ? 'la comparación sin comentarios, sin lote' : `medidores ${medidores.join(', ') || '—'}`})`);
      if (dif.hayCodigo) piezas.push(conVeredicto ? 'veredicto GENERAL ✓' : 'falta el veredicto: node tools/fos.mjs patron --cambio "…" --patron "…" --escribir');
      filas.push({ f, ok: medida && (!dif.hayCodigo || conVeredicto), texto: `${clase === 'modulo' ? 'módulo de una tool del pipeline' : 'tool del pipeline'}: ${piezas.join('; ')}` });
    } else if (/^\.claude\/skills\//.test(f)) filas.push({ f, ok: true, texto: 'skill: commit aparte, y mostrale el diff a Guido con show_pane' });
    else if (/^(data|js|css)\/|^index\.html$/.test(f)) filas.push({ f, ok: true, texto: 'publicable: el hook corre audit.js (P0 y P1 en 0)' });
  }
  return filas;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const staged = A.includes('--staged');
  let archivos = A.filter((a) => !a.startsWith('--'));
  if (!archivos.length) archivos = [...new Set([...git('diff', '--name-only', 'HEAD').split('\n'), ...git('diff', '--name-only', '--cached').split('\n'), ...git('ls-files', '--others', '--exclude-standard').split('\n')].filter(Boolean))];
  const filas = quePide(archivos, { staged });
  for (const x of filas) console.log(`${x.ok ? '✓' : '✗'} ${x.f}: ${x.texto}`);
  if (!filas.length) console.log('Nada de lo cambiado pide medición, veredicto ni clasificación.');
  process.exit(filas.some((x) => !x.ok) ? 1 : 0);
}

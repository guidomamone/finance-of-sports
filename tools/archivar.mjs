#!/usr/bin/env node
// ============================================================================
// tools/archivar.mjs — archiva un documento cerrado en Admin/Archive/ (CLAUDE.md: «lo que está cerrado no se borra ni se apila: se archiva») y deja el índice al día.
//
// USO: node tools/archivar.mjs <ruta> [--en <subcarpeta de Admin/Archive>] [--ensayo]
//   1. mueve el archivo (git mv si está trackeado) a Admin/Archive/[<subcarpeta>/]<nombre>;
//   2. lista quién lo cita todavía (esas citas hay que cambiarlas o borrarlas: el archivo ya no se lee);
//   3. corre `node tools/indice-md.mjs --escribir` y dice si algún documento vivo quedó huérfano por esto.
//   Antes de archivar: lo que todavía sirve se lleva a donde se lee (una regla a CONVENCIONES / PANTALLA / la skill; un pendiente a TODO). La tool no puede juzgar eso.
// ============================================================================
import { existsSync, mkdirSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, basename, dirname, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const en = A.includes('--en') ? A[A.indexOf('--en') + 1] : '';
const ensayo = A.includes('--ensayo');
const ruta = A.find((a, i) => !a.startsWith('--') && A[i - 1] !== '--en');
if (!ruta) { console.error('uso: node tools/archivar.mjs <ruta> [--en <subcarpeta>] [--ensayo]'); process.exit(1); }
const origen = resolve(ROOT, ruta); const rel = relative(ROOT, origen);
if (!existsSync(origen)) { console.error(`No existe ${rel}`); process.exit(1); }
if (rel.startsWith('Admin/Archive/')) { console.error(`${rel} ya está archivado.`); process.exit(1); }
if (rel.startsWith('Clubes/')) { console.error('Nada de Clubes/ se archiva con esta tool: son los PDF y sus transcripciones.'); process.exit(1); }
const destino = resolve(ROOT, 'Admin', 'Archive', en, basename(origen));
if (existsSync(destino)) { console.error(`Ya existe ${relative(ROOT, destino)}: elegí otra subcarpeta con --en.`); process.exit(1); }

const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
// quién lo cita (por el nombre del archivo), antes de moverlo
let citas = [];
try { citas = git(['grep', '-l', '-F', basename(origen), '--', 'Admin', 'CLAUDE.md', '.claude', 'tools', ':!Admin/Archive', ':!Admin/INDICE-md.md', ':!Admin/CHANGELOG.md', ':!Admin/registros']).split('\n').filter((f) => f && f !== rel); } catch { /* nadie */ }

console.log(`${ensayo ? '[ensayo] ' : ''}${rel} → ${relative(ROOT, destino)}`);
if (!ensayo) {
  mkdirSync(dirname(destino), { recursive: true });
  let trackeado = true; try { git(['ls-files', '--error-unmatch', rel]); } catch { trackeado = false; }
  if (trackeado) git(['mv', rel, relative(ROOT, destino)]); else renameSync(origen, destino);
}
if (citas.length) console.log(`Lo siguen citando (cambiar o borrar la cita):\n${citas.map((c) => `  ${c}`).join('\n')}`);
else console.log('Nadie lo cita.');
if (!ensayo) {
  const out = execFileSync('node', [resolve(ROOT, 'tools', 'indice-md.mjs'), '--escribir'], { cwd: ROOT, encoding: 'utf8' });
  const huerfanos = out.split('\n').filter((l) => /^Huérfanos|^\s+Admin\/|^\s+\.claude\//.test(l));
  console.log(`índice al día.\n${huerfanos.join('\n')}`);
}

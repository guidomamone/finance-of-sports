#!/usr/bin/env node
// ============================================================================
// tools/prueba-escribir.mjs — PRUEBA DE REGRESIÓN DE LA ESCRITURA DE cargar.mjs: un ensayo que pasa y una escritura que revierte no tienen que volver a separarse.
//
// POR QUÉ. El ensayo de cargar.mjs (sin --escribir) no ejecuta `escribir(P)`: un identificador que no existe ahí (la nota «Informe oficial en formato XHTML» usaba `e.md` y `e` no existe en escribir(P)) pasaba todos
// los ensayos y rompía toda carga real con «REVERTIDO: e is not defined» (Goiás 2018, RAAL 2020). Esta prueba ESCRIBE de verdad, pero en un git worktree descartable en la carpeta temporal (nunca en el repo ni en
// Clubes/ reales), y falla si la escritura se revierte.
//
// QUÉ HACE. 1) crea un worktree descartable en HEAD y le copia las tools de este árbol (con lo que tengas sin commitear); 2) usa el año SønderjyskE 2024 (viene de un XHTML: la rama de la nota XHTML de la fuente):
// saca ese año del JSON del club y lo marca sin cargar en el registro de la copia, así la carga crea la fuente nueva; 3) corre `cargar.mjs <pdf> --desde-verificacion --escribir` y exige «Escrito» y la nota pública
// «Informe oficial en formato XHTML (iXBRL)» en la fuente; 4) borra el worktree. Gratis, sin API.
//
// USO:  node tools/prueba-escribir.mjs        (sale con 0 si la escritura anduvo; con 1 y el motivo si no)
// ============================================================================
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, realpathSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const git = (args, cwd = ROOT) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 1 << 28 });
const principal = resolve(git(['rev-parse', '--path-format=absolute', '--git-common-dir']).trim(), '..');
const W = join(realpathSync(tmpdir()), `prueba-escribir-${process.pid}`); // la ruta REAL: con /var → /private/var el `import.meta.url === file://argv[1]` de cargar.mjs no se cumple y sale en silencio con 0
const PDF = 'Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.pdf';
const ID_FUENTE = 'sonderjyske-dk-aarsrapport-2024-09-30';
let ok = false;
try {
  git(['worktree', 'add', '--detach', W, 'HEAD']);
  for (const f of readdirSync(join(ROOT, 'tools'))) if (/\.(mjs|js|json)$/.test(f)) copyFileSync(join(ROOT, 'tools', f), join(W, 'tools', f));
  mkdirSync(join(W, 'Admin', 'registros'), { recursive: true });
  const regOrigen = [join(ROOT, 'Admin/registros/transcripciones-estado.jsonl'), join(principal, 'Admin/registros/transcripciones-estado.jsonl')].find(existsSync);
  const reg = readFileSync(regOrigen, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const e = reg.find((x) => x.pdf === PDF); if (!e) throw new Error(`el registro no tiene ${PDF}`);
  e.cargado = false; if (e.estado === 'cargado') e.estado = 'extraido'; delete e.cargadoEn;
  writeFileSync(join(W, 'Admin/registros/transcripciones-estado.jsonl'), reg.map((x) => JSON.stringify(x)).join('\n') + '\n');
  const jf = join(W, 'data/dk/sonderjyske-dk.json'); const j = JSON.parse(readFileSync(jf, 'utf8'));
  j.years = j.years.filter((y) => y.fiscal_year !== 2024); j.sources = (j.sources || []).filter((s) => s.id !== ID_FUENTE);
  writeFileSync(jf, JSON.stringify(j, null, 2) + '\n');
  execFileSync('node', [join(W, 'tools/generar-data.mjs')], { cwd: W, encoding: 'utf8' });
  const r = spawnSync('node', [join(W, 'tools/cargar.mjs'), PDF, '--desde-verificacion', '--escribir'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 });
  const salida = r.stdout + r.stderr; const rev = salida.match(/REVERTIDO[^\n]*/);
  if (r.status !== 0 || rev) throw new Error(rev ? rev[0] : `cargar.mjs salió con ${r.status}: ${salida.trim().split('\n').slice(-3).join(' | ')}`);
  const fuentes = JSON.parse(readFileSync(jf, 'utf8')).sources || []; const fuente = fuentes.find((s) => s.id === ID_FUENTE);
  if (!fuente) throw new Error(`la carga no creó la fuente ${ID_FUENTE} (fuentes: ${fuentes.map((s) => s.id).join(', ')}; exit ${r.status}; salida: ${JSON.stringify(salida.slice(0, 600))})`);
  if (fuente.public_note !== 'Informe oficial en formato XHTML (iXBRL)') throw new Error(`la fuente nueva no trae la nota XHTML (public_note: ${fuente.public_note})`);
  ok = true; console.log('prueba-escribir: la escritura de cargar.mjs anduvo (fuente nueva con su nota XHTML) en un worktree descartable.');
} catch (err) {
  console.error(`prueba-escribir: FALLÓ: ${err.message}`);
} finally {
  try { git(['worktree', 'remove', '--force', W]); } catch { rmSync(W, { recursive: true, force: true }); }
}
process.exit(ok ? 0 : 1);

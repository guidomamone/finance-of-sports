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
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { conWorktree } from './con-worktree.mjs'; // el worktree descartable con las tools de este árbol (una prueba nueva es solo el escenario)

const PDF = 'Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.pdf';
const ID_FUENTE = 'sonderjyske-dk-aarsrapport-2024-09-30';
let ok = false;
try {
  await conWorktree(async ({ W, ROOT, principal }) => {
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
  // LAS DEMÁS TOOLS QUE ESCRIBEN, en el mismo worktree y sobre los datos de HEAD (idempotentes: no cambian lo cargado). Un ensayo no pasa por los imports dinámicos ni por snapshot/revertir/publicarCambios, que
  // son lo que se rompió cuando se partió cargar.mjs. Cada una tiene que salir con 0 y sin un error de código en la salida; qué se escribe lo mira la prueba de cada tool.
  const ESCRIBEN = [
    ['caja-deuda --personal --escribir', ['tools/caja-deuda.mjs', '--personal', '--club', 'brighton-gb', '--escribir']],
    ['caja-deuda --personal --partir --escribir', ['tools/caja-deuda.mjs', '--personal', '--club', 'newcastle-gb', '--partir', '--escribir']],
    ['recategorizar-etiquetas --escribir', ['tools/recategorizar-etiquetas.mjs', '--categoria', 'grants_donations', '--escribir']],
    ['generar-correcciones', ['tools/generar-correcciones.mjs']],
    ['ajustes --agregar', ['tools/ajustes.mjs', '--agregar', PDF, 'sin-dudas', '--motivo', 'prueba-escribir (worktree descartable)', '--autor', 'prueba']],
    ['publicar', ['tools/publicar.mjs']],
  ];
  writeFileSync(join(W, PDF), ''); // los PDF no se trackean: ajustes.mjs pide que el documento exista
  const ERROR_DE_CODIGO =/is not a function|is not defined|Cannot find (module|package)|SyntaxError|does not provide an export|REVERTIDO|TypeError|ReferenceError/;
  const antes = execFileSync('git', ['status', '--porcelain', '--', 'data'], { cwd: W, encoding: 'utf8' });
  for (const [i, [nombre, args]] of ESCRIBEN.entries()) {
    const s = spawnSync('node', [join(W, args[0]), ...args.slice(1)], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 });
    const out = (s.stdout || '') + (s.stderr || '');
    if (s.status !== 0 || ERROR_DE_CODIGO.test(out)) throw new Error(`${nombre} salió con ${s.status}: ${(out.match(ERROR_DE_CODIGO) ? out.slice(Math.max(0, out.search(ERROR_DE_CODIGO) - 120), out.search(ERROR_DE_CODIGO) + 200) : out.trim().split('\n').slice(-3).join(' | ')).replace(/\n/g, ' | ')}`);
    // las tres primeras son idempotentes sobre los datos de HEAD: no pueden dejar ningún JSON de club distinto de como estaba tras la carga de arriba
    if (i < 3) { const ahora = execFileSync('git', ['status', '--porcelain', '--', 'data'], { cwd: W, encoding: 'utf8' }); if (ahora !== antes) throw new Error(`${nombre} cambió datos que no tenía que cambiar:\n${ahora}`); }
    console.log(`  ok ${nombre}`);
  }
  ok = true; console.log(`prueba-escribir: la escritura de cargar.mjs anduvo (fuente nueva con su nota XHTML) y la de ${ESCRIBEN.length} tools más, en un worktree descartable.`);
  }, 'prueba-escribir');
} catch (err) {
  console.error(`prueba-escribir: FALLÓ: ${err.message}`);
}
process.exit(ok ? 0 : 1);

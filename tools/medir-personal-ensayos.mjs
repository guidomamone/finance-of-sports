#!/usr/bin/env node
// ============================================================================
// tools/medir-personal-ensayos.mjs — MEDIDOR de lo que `--medir` de caja-deuda.mjs no ejercita: las opciones --personal con un club
// ============================================================================
// `caja-deuda.mjs --personal --medir` solo recorre los clubes de personal-verdad.tsv y no llega a partirFilaGlobal, completarPersonal ni --ver-candidatos. Este corre, en ENSAYO
// (sin --ejecutar ni --escribir: no llama a ninguna API ni escribe nada), esas opciones y junta las salidas para compararlas antes y después:
// `--personal` y `--personal --partir` en TODOS los clubes británicos (-gb) y en los de Grecia con verdad conocida, y `--ver-candidatos` en los de la lista corta.
// USO: node tools/medir-personal-ensayos.mjs     (imprime las salidas; lo usa tools/medir-pipeline.mjs)
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { loadSite } from './datos-sitio.mjs';
const ROOT = resolve(import.meta.dirname, '..');
const CORTA = ['newcastle-gb', 'westham-gb', 'brighton-gb', 'fulham-gb', 'celtic-gb', 'astonvilla-gb', 'volosnfc-gr', 'panetolikos-gr'];
const todos = [...new Set([...Object.keys(loadSite().generic).filter((id) => id.endsWith('-gb')).sort(), ...CORTA])];
const corre = (args) => {
  const r = spawnSync('node', ['tools/caja-deuda.mjs', ...args], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
  console.log(`$ caja-deuda ${args.join(' ')}  (salió con ${r.status})\n${(r.stdout || '').trimEnd()}${r.stderr ? `\n[stderr] ${r.stderr.trimEnd().slice(0, 400)}` : ''}\n`);
};
for (const club of todos) {
  corre(['--personal', '--club', club]);
  corre(['--personal', '--club', club, '--partir']);
  if (CORTA.includes(club)) for (const anio of ['2022', '2023']) corre(['--personal', '--ver-candidatos', '--club', club, '--anio', anio]);
}

#!/usr/bin/env node
// ============================================================================
// tools/medir-personal-ensayos.mjs — MEDIDOR de lo que `--medir` de caja-deuda.mjs no ejercita: las opciones --personal con un club
// ============================================================================
// `caja-deuda.mjs --personal --medir` solo recorre los clubes de personal-verdad.tsv y no llega a partirFilaGlobal, completarPersonal ni --ver-candidatos. Este corre, en ENSAYO
// (sin --escribir: no escribe datos), esas opciones y junta las salidas para compararlas antes y después. Con --ejecutar: la pregunta a Jev que NO está en la caché se hace de verdad
// (centavos, y queda en la caché). Sin eso, un cambio que modifica la lista de filas candidatas cambia la clave de cada pregunta y el ensayo mostraba como «PIERDE» valores que con Jev real vuelven iguales:
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
  corre(['--personal', '--club', club, '--ejecutar']);
  corre(['--personal', '--club', club, '--partir', '--ejecutar']);
  if (CORTA.includes(club)) for (const anio of ['2022', '2023']) corre(['--personal', '--ver-candidatos', '--club', club, '--anio', anio]);
}

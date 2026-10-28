#!/usr/bin/env node
// tools/probar-club-siis.mjs — la prueba de los avisos y pasos de club-siis.mjs que salieron del punto 478 (cada ítem suma sus casos). Corre en una copia descartable (con-worktree.mjs): nunca toca los datos reales.
//   5. el paso «Liga de cada año» dice que después va publicar.mjs y commitear en OTRA llamada
// Uso: node tools/probar-club-siis.mjs    (~30 s por el worktree; sale con 1 si algún caso falla)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { conWorktree } from './con-worktree.mjs';

process.env.FOS_MIDIENDO = '1'; // en la copia, las tools no se niegan por tools sin medir
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

await conWorktree(async ({ W }) => {
  const correr = (...args) => { const r = spawnSync('node', [join(W, 'tools/club-siis.mjs'), ...args], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 26 }); return `${r.stdout}${r.stderr}`; };
  // 5. a Envigado le sacamos la línea de liga: el paso «Liga de cada año» tiene que decir qué sigue
  const f = join(W, 'data/club-leagues/co.js');
  writeFileSync(f, readFileSync(f, 'utf8').split('\n').filter((l) => !l.includes("'envigado-co'")).join('\n'));
  const out = correr('Envigado');
  const paso = out.split('\n').filter((l, i, a) => a.slice(Math.max(0, i - 3), i + 1).some((x) => /Liga de cada año/.test(x))).join('\n');
  caso('5. el paso «Liga de cada año» manda a publicar.mjs y a commitear en OTRA llamada', /node tools\/publicar\.mjs/.test(paso) && /OTRA llamada/.test(paso), paso.slice(0, 400) || out.slice(0, 300));
}, 'prueba-club-siis');

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

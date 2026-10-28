#!/usr/bin/env node
// tools/probar-club-siis.mjs — la prueba de los avisos y pasos de club-siis.mjs que salieron del punto 478 (cada ítem suma sus casos). Corre en una copia descartable (con-worktree.mjs): nunca toca los datos reales.
//   5. el paso «Liga de cada año» dice que después va publicar.mjs y commitear en OTRA llamada
//   8. --avanzar sin --escribir es un ensayo (el árbol queda igual) y --ejecutar sin --escribir se niega
//   6. --liga: decidirLigas escribe solo si todos los años tienen liga exacta; y en una copia sin las líneas de Envigado y Nacional las vuelve a escribir con el mismo contenido que HEAD (la posición en el archivo cambia: va al final)
// Uso: node tools/probar-club-siis.mjs    (~30 s por el worktree; sale con 1 si algún caso falla)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { conWorktree } from './con-worktree.mjs';
import { decidirLigas } from './liga-decidir.mjs';
import vm from 'node:vm';

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
  // 6. --liga
  const ligas = (texto) => { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(texto, ctx); return ctx.window.CLUB_LEAGUE_BY_YEAR; };
  const original = spawnSync('git', ['show', 'HEAD:data/club-leagues/co.js'], { cwd: W, encoding: 'utf8' }).stdout;
  writeFileSync(f, original.split('\n').filter((l) => !/'(envigado|atlnacional)-co'/.test(l)).join('\n'));
  for (const club of ['Envigado', 'Atletico Nacional']) correr(club, '--liga');
  const nuevo = ligas(readFileSync(f, 'utf8')), head = ligas(original);
  for (const id of ['envigado-co', 'atlnacional-co']) caso(`6. --liga reescribe ${id} con el mismo contenido que HEAD`, JSON.stringify(nuevo[id]) === JSON.stringify(head[id]), `${JSON.stringify(nuevo[id])} contra ${JSON.stringify(head[id])}`);
  const intacto = Object.keys(head).every((id) => ['envigado-co', 'atlnacional-co'].includes(id) || JSON.stringify(nuevo[id]) === JSON.stringify(head[id])) && Object.keys(nuevo).length === Object.keys(head).length;
  caso('6. --liga no toca las líneas de los otros clubes', intacto);
  const antes = readFileSync(f, 'utf8'); correr('Envigado', '--liga');
  caso('6. --liga de un club que ya tiene liga no escribe nada', readFileSync(f, 'utf8') === antes);
  // 8. --avanzar sin --escribir es un ensayo: el árbol queda igual; --ejecutar sin --escribir se niega
  const git = (...a) => spawnSync('git', a, { cwd: W, encoding: 'utf8' }).stdout;
  spawnSync('git', ['checkout', '--', 'Admin', 'data', 'Generados', 'Clubes'], { cwd: W }); // (las tools copiadas de este árbol no se tocan)
  const estadoAntes = git('status', '--porcelain', '--', 'Admin', 'data', 'Generados', 'Clubes');
  const av = correr('Atletico Nacional', '--avanzar');
  caso('8. --avanzar sin --escribir dice que es un ensayo y no cambia el árbol', /ENSAYO/.test(av) && git('status', '--porcelain', '--', 'Admin', 'data', 'Generados', 'Clubes') === estadoAntes, av.slice(0, 300));
  const ej = spawnSync('node', [join(W, 'tools/club-siis.mjs'), 'Atletico Nacional', '--avanzar', '--ejecutar'], { cwd: W, encoding: 'utf8' });
  caso('8. --avanzar --ejecutar sin --escribir se niega (sale con 1)', ej.status === 1 && /--escribir/.test(ej.stderr), `${ej.status} ${ej.stderr}`);
}, 'prueba-club-siis');

const D = decidirLigas(['2016', '2017'], { 2016: 'co-primeraA', 2017: 'co-primeraA' });
caso('6. decidirLigas: todos exactos, escribe', D.escribir && D.mapa[2017] === 'co-primeraA');
const D2 = decidirLigas(['2016', '2017'], { 2016: 'co-primeraA' });
caso('6. decidirLigas: un año dudoso, no escribe ninguno y dice cuál', !D2.escribir && D2.sin.join() === '2017' && Object.keys(D2.mapa).length === 0 && /2017/.test(D2.motivo));
caso('6. decidirLigas: sin años por completar no escribe', !decidirLigas([], {}).escribir);

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

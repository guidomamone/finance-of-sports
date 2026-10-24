#!/usr/bin/env node
// ============================================================================
// tools/cierre-sin-fecha.mjs — `fos cierre-sin-fecha`: los documentos anuales con .md que no tienen fecha de cierre en el registro, y cuáles de verdad frenan una carga
//
// POR QUÉ. El P3 `cierre-sin-fecha` de audit.js contaba todo documento sin `periodo.cierre` de un club ya cargado, pero la carga deduce el cierre de los documentos
// vecinos (cierre-vecinos.mjs: año anterior y siguiente con el mismo día y mes; 98,2 % de aciertos medido dejando afuera cada anual con cierre) y esos NO frenan. Esta tool
// separa los que resuelve esa regla de los que quedan sin ninguna (los que frenan o piden un ajuste `cierre`).
//
// USO:
//   node tools/cierre-sin-fecha.mjs            resumen: sin cierre, resueltos por los vecinos, los que frenan, y los que frenan por país
//   node tools/cierre-sin-fecha.mjs --lista    cada documento que frena (de los clubes ya cargados), con su carpeta
//   node tools/cierre-sin-fecha.mjs --json     { sinCierre, porVecinos, frenan, clubes } (lo lee audit.js)
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { cierrePorVecinos } from './cierre-vecinos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const reg = readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l)).filter((x) => x.tieneMd && x.periodo);
const cargadas = new Set(reg.filter((x) => x.cargado).map((x) => dirname(x.pdf)));
const sin = reg.filter((x) => !x.periodo.cierre && x.periodo.tipo === 'anual');
const deClubesCargados = sin.filter((x) => cargadas.has(dirname(x.pdf)));
const porVecinos = deClubesCargados.filter((x) => cierrePorVecinos(x.pdf, reg));
const frenan = deClubesCargados.filter((x) => !cierrePorVecinos(x.pdf, reg));
const clubes = new Set(frenan.map((x) => dirname(x.pdf)));
const resumen = { sinCierre: deClubesCargados.length, porVecinos: porVecinos.length, frenan: frenan.length, clubes: clubes.size, ejemplos: frenan.slice(0, 3).map((x) => basename(x.pdf)), sinCierreEnTodoElRegistro: sin.length };

if (A.includes('--json')) console.log(JSON.stringify(resumen));
else if (A.includes('--lista')) for (const x of frenan.sort((a, b) => a.pdf.localeCompare(b.pdf))) console.log(x.pdf);
else {
  console.log(`Anuales con .md y sin fecha de cierre en el registro: ${sin.length} en total; ${deClubesCargados.length} de clubes que ya tienen algo cargado.`);
  console.log(`De esos, los resuelve la regla de los vecinos al cargar: ${porVecinos.length}. Frenan o piden un ajuste \`cierre\`: ${frenan.length} (en ${clubes.size} carpetas).`);
  const pais = {}; for (const x of frenan) { const p = x.pdf.split('/')[1]; pais[p] = (pais[p] || 0) + 1; }
  console.log(`Los que frenan por país: ${Object.entries(pais).sort((a, b) => b[1] - a[1]).map(([p, n]) => `${p} ${n}`).join(' · ')}`);
}

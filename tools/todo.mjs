#!/usr/bin/env node
// ============================================================================
// tools/todo.mjs — leer y cerrar los puntos de Admin/TODO.md sin leer el archivo entero.
//
// POR QUÉ. TODO.md pesa ~25 KB y una sesión lo leía entero para saber qué sigue o cómo es un solo punto. Cada punto es un título
// `### <orden>. <id> · <qué>` con su cuerpo debajo (formato en la cabecera del propio TODO.md), así que esta tool lo parte por títulos.
//
// USO:
//   node tools/todo.mjs                 la lista: orden, id y título, agrupada como el TODO (gratis, ~3 KB)
//   node tools/todo.mjs 355             el cuerpo del punto con ese id
//   node tools/todo.mjs --cerrar 355    borra el punto y renumera el orden de los de abajo (el historial va al CHANGELOG, a mano)
// No toca nada más que Admin/TODO.md.
// ============================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const RUTA = resolve(import.meta.dirname, '..', 'Admin', 'TODO.md');
const A = process.argv.slice(2);
const L = readFileSync(RUTA, 'utf8').split('\n');
const TITULO = /^### (\d+)\. (\d{3}) · (.*)$/;

// índices de los títulos de punto y fin de cada cuerpo (el siguiente título de punto o de grupo)
const puntos = [];
for (let i = 0; i < L.length; i++) {
  const m = TITULO.exec(L[i]);
  if (m) puntos.push({ i, orden: Number(m[1]), id: m[2], titulo: m[3] });
}
for (const p of puntos) {
  let f = p.i + 1;
  while (f < L.length && !/^##+ /.test(L[f])) f++;
  p.fin = f;
}

if (!A.length) {
  let grupo = '';
  for (const l of L) { if (/^## [A-Z]\. /.test(l) && l !== grupo) { grupo = l; console.log(`\n${l.slice(3)}`); } const m = TITULO.exec(l); if (m) console.log(`${m[1].padStart(2)}. ${m[2]} · ${m[3].slice(0, 150)}`); }
  process.exit(0);
}

const cerrar = A[0] === '--cerrar';
const id = cerrar ? A[1] : A[0];
const p = puntos.find((x) => x.id === id);
if (!p) { console.error(`No hay un punto con id ${id}. Los ids: ${puntos.map((x) => x.id).join(', ')}`); process.exit(1); }

if (!cerrar) { console.log(L.slice(p.i, p.fin).join('\n').trimEnd()); process.exit(0); }

L.splice(p.i, p.fin - p.i);
let n = 0;
for (let i = 0; i < L.length; i++) {
  const m = TITULO.exec(L[i]);
  if (m) L[i] = `### ${++n}. ${m[2]} · ${m[3]}`;
}
writeFileSync(RUTA, L.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
console.log(`Cerrado ${id}. Quedan ${n} puntos. Falta la entrada en Admin/CHANGELOG.md.`);

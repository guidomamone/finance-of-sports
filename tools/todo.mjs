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
//   node tools/todo.mjs --verificar [id]   comprueba la línea «Verificar:» de cada punto (o de uno) con una máquina: cumple / falta / manual (corre audit.js, unos segundos)
//   node tools/todo.mjs --cerrar 355    borra el punto y renumera el orden de los de abajo (el historial va al CHANGELOG, a mano). Se NIEGA si el punto tiene una condición
//                                       «Verificar:» comprobable y no se cumple; --forzar lo cierra igual (para un punto descartado, no cumplido)
//   node tools/todo.mjs --nuevo --pos <n> --rol "Orden, prioridad alta" --titulo "…"   un punto nuevo con el id siguiente al más alto, en el lugar <n> (1..último+1);
//                                       renumera los de abajo y deja «Terminado cuando:» y «Verificar: manual» para completar. Rechaza una posición fuera de rango; avisa de un título repetido
// Las condiciones y cómo se escriben: tools/todo-verificar.js. No toca nada más que Admin/TODO.md.
// ============================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const T = createRequire(import.meta.url)('./todo-verificar.js');
const ROOT = resolve(import.meta.dirname, '..');

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

// los hallazgos de audit.js (sin silenciar), para las condiciones «audit <código> ...»
function hallazgos() {
  let out; try { out = execFileSync('node', ['tools/audit.js', '--json'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 }); } catch (e) { out = e.stdout; }
  return JSON.parse(out).findings;
}
const condiciones = (p) => T.puntos(L.join('\n')).find((x) => x.id === p.id)?.verificar || [];
function estadoDe(p, hs) {
  const rs = condiciones(p).map((e) => T.evaluar(e, hs, ROOT));
  const auto = rs.filter((r) => r.ok !== null);
  return { rs, cumple: rs.length > 0 && rs.every((r) => r.ok === true), manual: rs.length > 0 && rs.every((r) => r.ok === null), falta: auto.some((r) => r.ok === false), sinCondicion: rs.length === 0 };
}
if (A[0] === '--verificar') {
  const hs = hallazgos(); const solo = A[1];
  for (const p of puntos.filter((x) => !solo || x.id === solo)) {
    const e = estadoDe(p, hs);
    const marca = e.sinCondicion ? '? sin «Verificar:»' : e.cumple ? '✓ CUMPLE: cerrarlo' : e.manual ? '· manual' : e.falta ? '✗ falta' : '· manual';
    console.log(`${String(p.orden).padStart(2)}. ${p.id} · ${marca}${e.rs.filter((r) => r.ok !== null).map((r) => `\n      ${r.ok ? '✓' : '✗'} ${r.detalle}`).join('')}`);
  }
  process.exit(0);
}

if (A[0] === '--nuevo') {
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  const pos = Number(v('--pos')), rol = v('--rol'), titulo = v('--titulo');
  if (!rol || !titulo || !Number.isInteger(pos)) { console.error('Uso: --nuevo --pos <n> --rol "…" --titulo "…"'); process.exit(1); }
  if (pos < 1 || pos > puntos.length + 1) { console.error(`--pos ${pos} fuera de rango: va de 1 a ${puntos.length + 1}.`); process.exit(1); }
  const igual = puntos.find((x) => x.titulo.toLowerCase().includes(titulo.toLowerCase()));
  if (igual) console.error(`Aviso: ya hay un punto con ese título (${igual.id}).`);
  const id = String(Math.max(...puntos.map((x) => Number(x.id))) + 1);
  const bloque = [`### ${pos}. ${id} · (${rol}): ${titulo}`, '', '…', 'Terminado cuando: …', '', 'Verificar: manual', ''];
  // antes del punto que hoy ocupa ese lugar; al final, después del cuerpo del último
  let en = pos <= puntos.length ? puntos[pos - 1].i : puntos[puntos.length - 1].fin;
  while (en > 0 && L[en - 1].trim() === '' && pos > puntos.length) en--;
  if (pos > puntos.length) bloque.unshift('');
  L.splice(en, 0, ...bloque);
  let n = 0;
  for (let i = 0; i < L.length; i++) { const m = TITULO.exec(L[i]); if (m) L[i] = `### ${++n}. ${m[2]} · ${m[3]}`; }
  writeFileSync(RUTA, L.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
  console.log(`Punto ${id} creado en el lugar ${pos}. Completá el cuerpo, «Terminado cuando:» y «Verificar:».`);
  process.exit(0);
}

const cerrar = A[0] === '--cerrar';
const id = cerrar ? A[1] : A[0];
const p = puntos.find((x) => x.id === id);
if (!p) { console.error(`No hay un punto con id ${id}. Los ids: ${puntos.map((x) => x.id).join(', ')}`); process.exit(1); }

if (!cerrar) { console.log(L.slice(p.i, p.fin).join('\n').trimEnd()); process.exit(0); }

if (!A.includes('--forzar')) {
  const e = estadoDe(p, hallazgos());
  if (e.falta) { console.error(`No se cierra ${id}: su «Verificar:» no se cumple.\n${e.rs.filter((r) => r.ok === false).map((r) => `  ✗ ${r.detalle}`).join('\n')}\n(--forzar lo cierra igual, si el punto se descartó en vez de cumplirse)`); process.exit(1); }
  if (e.manual) console.log('Su «Verificar:» es manual: confirmá contra «Terminado cuando:» del punto que está hecho.');
}
L.splice(p.i, p.fin - p.i);
let n = 0;
for (let i = 0; i < L.length; i++) {
  const m = TITULO.exec(L[i]);
  if (m) L[i] = `### ${++n}. ${m[2]} · ${m[3]}`;
}
writeFileSync(RUTA, L.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
console.log(`Cerrado ${id}. Quedan ${n} puntos. Falta la entrada en Admin/CHANGELOG.md.`);

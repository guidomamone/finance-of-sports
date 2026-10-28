#!/usr/bin/env node
// tools/probar-patrones-tools.mjs — la prueba de patrones-tools.mjs y de su chequeo (ítem 20 del punto 478): ninguna tool del pipeline queda sin entrada en tools/patrones-tools.json, y el chequeo avisa cuando se suma una sin ella.
//   1. patronDe con un patrón, con sinDocumentos, con porCambio (lee documentos: el patrón va con cada cambio) y sin entrada · 2. sinEntrada sobre una tabla de juguete · 3. sobre TODAS las tools de pipeline-tools.json: ninguna sin entrada
//   4. clasificar-tools.mjs --check lo avisa (con una tabla de juguete) · 5. el mensaje de cerrar-tool distingue «sin entrada» de «leen documentos»
// Uso: node tools/probar-patrones-tools.mjs    (menos de 1 segundo; solo lee; sale con 1 si algún caso falla)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { patronDe, sinEntrada } from './patrones-tools.mjs';

const ROOT = resolve(import.meta.dirname, '..');
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const tabla = { a: { patron: 'Total' }, b: { sinDocumentos: 'lee una API' }, c: { porCambio: 'lee documentos' } };

caso('1. con patrón: lo devuelve', patronDe(['a'], tabla).patron === 'Total');
caso('1b. con sinDocumentos: el motivo', patronDe(['b'], tabla).sinDocumentos === 'lee una API');
const c = patronDe(['c'], tabla);
caso('1c. porCambio: falta el patrón (se pasa con --patron) pero NO es una tool sin entrada', c.falta?.join() === 'c' && c.sinEntrada.length === 0, JSON.stringify(c));
caso('1d. una tool sin entrada: falta y sinEntrada', patronDe(['z'], tabla).sinEntrada.join() === 'z');
caso('2. sinEntrada sobre una tabla de juguete lista las que no están', sinEntrada(['a', 'b', 'c', 'x', 'y'], tabla).join() === 'x,y');
const pt = JSON.parse(readFileSync(resolve(ROOT, 'tools/pipeline-tools.json'), 'utf8'));
const todas = Object.keys(pt.tools);
caso('3. ninguna tool del pipeline queda sin entrada en patrones-tools.json', sinEntrada(todas).length === 0, sinEntrada(todas).join(' '));
const src = readFileSync(resolve(ROOT, 'tools/clasificar-tools.mjs'), 'utf8');
caso('4. clasificar-tools.mjs --check (el de audit.js) usa sinEntrada', /sinEntrada\(/.test(src));
const ct = readFileSync(resolve(ROOT, 'tools/cerrar-tool.mjs'), 'utf8');
caso('5. cerrar-tool distingue «sin entrada» de «leen documentos»', /p\.sinEntrada/.test(ct));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

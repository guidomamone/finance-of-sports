// Medición del TODO 373: cuántos bytes lee una sesión que toma el MISMO punto de Pipeline, antes y después del mapa de código y del contrato entre etapas.
// El punto: «extraer el bloque del costo de personal de caja-deuda.mjs (líneas ~1246 a 1441) a su módulo, sin cambios» (primer paso del 368). Para hacerlo bien la sesión tiene
// que entender el bloque y lo que le pasa alrededor: quién lo llama, qué ajustes escribe y qué hace el resto de la cadena (verificar → categorizar → cargar).
// ANTES: lo que se hacía sin mapa, leer entero el archivo que se toca y los dos que la cadena toca (verificar.mjs, cargar.mjs) más la etapa del PIPELINE.md.
// DESPUÉS: el mapa de cada archivo + solo los tramos que el mapa señala + la página de contrato.
// USO: node Admin/mediciones/373-bytes-leidos.mjs     (gratis; no escribe nada)
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const bytes = (f) => Buffer.byteLength(readFileSync(resolve(ROOT, f), 'utf8'));
const tramo = (f, d, h) => Buffer.byteLength(readFileSync(resolve(ROOT, f), 'utf8').split('\n').slice(d - 1, h).join('\n') + '\n');
const mapa = (f, ...extra) => Buffer.byteLength(execFileSync('node', ['tools/mapa-codigo.mjs', f, ...extra], { cwd: ROOT, encoding: 'utf8' }));
const seccion = (f, desde, hasta) => { const L = readFileSync(resolve(ROOT, f), 'utf8').split('\n'); const i = L.findIndex((l) => l.startsWith(desde)); const j = L.findIndex((l, k) => k > i && l.startsWith(hasta)); return Buffer.byteLength(L.slice(i, j).join('\n')); };

const antes = [
  ['tools/caja-deuda.mjs entero', bytes('tools/caja-deuda.mjs')],
  ['tools/verificar.mjs entero', bytes('tools/verificar.mjs')],
  ['tools/cargar.mjs entero', bytes('tools/cargar.mjs')],
  ['Admin/PIPELINE.md, sección «Caja y deuda»', seccion('Admin/PIPELINE.md', '## Caja y deuda', '## Un deporte nuevo')],
];
const despues = [
  ['mapa de caja-deuda.mjs', mapa('tools/caja-deuda.mjs')],
  ['caja-deuda.mjs, el bloque de personal y su arranque (líneas 1245 a 1442)', tramo('tools/caja-deuda.mjs', 1245, 1442)],
  ['caja-deuda.mjs, el despachador de opciones (líneas 1457 a 1473)', tramo('tools/caja-deuda.mjs', 1457, 1473)],
  ['mapa de verificar.mjs, buscando «ajustes»', mapa('tools/verificar.mjs', '--buscar', 'ajustes')],
  ['verificar.mjs, el escalón de ajustes de filas (líneas 789 a 833)', tramo('tools/verificar.mjs', 789, 833)],
  ['mapa de cargar.mjs, buscando «categor»', mapa('tools/cargar.mjs', '--buscar', 'categor')],
  ['cargar.mjs, las compuertas de categorías (líneas 379 a 385)', tramo('tools/cargar.mjs', 379, 385)],
  ['Admin/CONTRATO-ETAPAS.md', bytes('Admin/CONTRATO-ETAPAS.md')],
];
const suma = (a) => a.reduce((s, [, b]) => s + b, 0);
const kb = (n) => (n / 1024).toFixed(1).padStart(7);
console.log('ANTES (sin mapa ni contrato)');
for (const [n, b] of antes) console.log(`  ${kb(b)} KB  ${n}`);
console.log(`  ${kb(suma(antes))} KB  TOTAL\n\nDESPUÉS (mapa + tramos + contrato)`);
for (const [n, b] of despues) console.log(`  ${kb(b)} KB  ${n}`);
console.log(`  ${kb(suma(despues))} KB  TOTAL\n\nLeído después / antes: ${(100 * suma(despues) / suma(antes)).toFixed(0)} %  (≈ ${(suma(antes) / 4 / 1000).toFixed(0)} mil tokens contra ≈ ${(suma(despues) / 4 / 1000).toFixed(0)} mil, a 4 bytes por token)`);

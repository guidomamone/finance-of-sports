#!/usr/bin/env node
// tools/lote-nuevo.mjs — crea la próxima lista de lote sin pisar una que existe.
// USO: node tools/lote-nuevo.mjs [motivo…]      (`--numero` solo imprime el número libre, sin crear nada)
// El número es el más alto de Admin/lotes/lote-NN*.txt y de Admin/Archive/lotes/ (trackeados o no) más uno; el archivo se crea con su
// encabezado «# Lote N: <motivo>» y nunca sobre uno que existe. Después se agregan las rutas de los PDF, una por línea.
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const CARPETAS = ['Admin/lotes', 'Admin/Archive/lotes'];
const A = process.argv.slice(2);
const soloNumero = A.includes('--numero');
const motivo = A.filter((a) => !a.startsWith('--')).join(' ').trim();

let max = 0;
for (const c of CARPETAS) {
  const dir = resolve(ROOT, c);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    const m = /^lote-(\d+)/.exec(f);
    if (m) max = Math.max(max, Number(m[1]));
  }
}
const n = max + 1;
if (soloNumero) { console.log(n); process.exit(0); }

const ruta = `Admin/lotes/lote-${n}.txt`;
try {
  writeFileSync(resolve(ROOT, ruta), `# Lote ${n}${motivo ? `: ${motivo}` : ''}\n`, { flag: 'wx' });
} catch (e) {
  console.error(`No se creó ${ruta}: ${e.code === 'EEXIST' ? 'ya existe' : e.message}`);
  process.exit(1);
}
console.log(`${ruta} creado. Agregá las rutas de los PDF, una por línea.`);

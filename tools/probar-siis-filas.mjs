#!/usr/bin/env node
// tools/probar-siis-filas.mjs — la prueba de siis-filas.mjs (ítem 1 del punto 478): un año de SIIS sin filas se avisa y no se paga.
//   1. el resumen sin años sin filas es el de siempre (código 0) · 2. con años sin filas los lista y sale con 1 · 3. en ensayo no hay código distinto de 0
//   4. un siis-estado-AAAA.pdf sin .filas.json da el comando que las arma · 5. con el .filas.json no da nada · 6. un documento que no es de SIIS no se toca
//   7. el lote (lote-leer.mjs) llama a faltaFilasSiis antes de localizar
// Uso: node tools/probar-siis-filas.mjs    (menos de 1 segundo; sale con 1 si algún caso falla; no toca nada fuera de su carpeta temporal)
import { mkdirSync, writeFileSync, rmSync, readFileSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { resumenSiis, faltaFilasSiis } from './siis-filas.mjs';

const T = join(realpathSync(tmpdir()), `probar-siis-filas-${process.pid}`);
rmSync(T, { recursive: true, force: true });
mkdirSync(join(T, 'Generados/Colombia/Club X'), { recursive: true });
writeFileSync(join(T, 'Generados/Colombia/Club X/siis-estado-2017.filas.json'), '{}\n');

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

const normal = resumenSiis({ escribir: true, escritos: 3, frenados: 0, sinFilas: [] });
caso('sin años sin filas: «Escritos 3 año(s).» y código 0', normal.texto === 'Escritos 3 año(s).' && normal.codigo === 0, JSON.stringify(normal));
const malo = resumenSiis({ escribir: true, escritos: 11, frenados: 0, sinFilas: ['2016', '2018'] });
caso('con años sin filas: los lista, dice «sin filas» y sale con 1', malo.codigo === 1 && /11 año\(s\)/.test(malo.texto) && /2 sin filas \(2016, 2018\)/.test(malo.texto) && /9 con filas/.test(malo.texto), JSON.stringify(malo));
const ensayo = resumenSiis({ escribir: false, escritos: 0, frenados: 1, sinFilas: [] });
caso('el ensayo sigue diciendo que no escribió y sale con 0', ensayo.codigo === 0 && /^Ensayo: no se escribió nada/.test(ensayo.texto) && /1 año\(s\) frenado/.test(ensayo.texto), JSON.stringify(ensayo));

const f = faltaFilasSiis('Clubes/Colombia/Club X/siis-estado-2016.pdf', T);
caso('un siis-estado sin .filas.json da el comando que las arma, sin pagar nada', !!f && f.anio === '2016' && /^falta el \.filas\.json: node tools\/siis-estado\.mjs --club "Club X" --anio 2016 --rehacer --escribir/.test(f.aviso), JSON.stringify(f));
caso('con el .filas.json no da nada', faltaFilasSiis('Clubes/Colombia/Club X/siis-estado-2017.pdf', T) === null);
caso('un documento que no es de SIIS no se toca', faltaFilasSiis('Clubes/Colombia/Club X/estados-financieros-2016.pdf', T) === null);
caso('el lote llama a faltaFilasSiis antes de localizar', (() => { const t = readFileSync(resolve(import.meta.dirname, 'lote-leer.mjs'), 'utf8'); const a = t.indexOf('faltaFilasSiis('); return a > 0 && a < t.indexOf('await localizar('); })());

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

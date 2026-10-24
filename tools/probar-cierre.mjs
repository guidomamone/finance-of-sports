#!/usr/bin/env node
// tools/probar-cierre.mjs — la prueba de cierre-propuestas.mjs (la pregunta de cola con el cierre del país como propuesta) y de cierre-sin-fecha.mjs.
// Usa una cola de juguete (COLA_ARCHIVO) en Admin/mediciones/pipeline/_prueba-cierre/; no toca la cola real. Uso: node tools/probar-cierre.mjs (sale con 1 si un caso falla)
import { mkdirSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const T = join(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-cierre');
rmSync(T, { recursive: true, force: true }); mkdirSync(T, { recursive: true });
const { anioDelNombre, propuestas } = await import('./cierre-propuestas.mjs');
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

caso('el año del nombre: un año', anioDelNombre('demonstracoes-financeiras-2023.pdf') === 2023);
caso('el año del nombre: temporada abreviada «2023-24» cuenta por su cierre', anioDelNombre('cuentas-anuales-2023-24.pdf') === 2024);
caso('el año del nombre: dos años de cuatro cifras, el último', anioDelNombre('informe-2022-2023.pdf') === 2023);
caso('el año del nombre: sin año, null', anioDelNombre('balance-final.pdf') === null);

const lista = propuestas();
caso('hay propuestas y todas son de un país de tools/cierre-por-defecto.json', lista.length > 0 && lista.every((p) => ['Brasil', 'Rusia', 'Noruega', 'Ucrania', 'España', 'Países Bajos', 'Francia'].includes(p.pais)));
caso('el cierre propuesto es AAAA-MM-DD del día del país', lista.every((p) => /^\d{4}-(12-31|06-30)$/.test(p.cierre)));
caso('los de cierre 30-06 llevan el año de cierre de la temporada (el del nombre, no el anterior)', lista.filter((p) => p.cierre.endsWith('06-30')).every((p) => p.cierre.slice(0, 4) >= anioDelNombre(p.pdf.split('/').pop()) - 0));

const cola = join(T, 'cola.jsonl');
const correr = (...a) => { const r = spawnSync('node', ['tools/cierre-propuestas.mjs', ...a], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, COLA_ARCHIVO: cola } }); return (r.stdout || '') + (r.stderr || ''); };
let out = correr();
caso('el ensayo no escribe la cola', !existsSync(cola) && /ensayo/.test(out), out.slice(0, 200));
out = correr('--escribir');
const casos = existsSync(cola) ? readFileSync(cola, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [];
caso('--escribir abre una pregunta por documento (motivo cierre-por-pais, con cierrePropuesto y propuesta)', casos.length === lista.length && casos.every((c) => c.motivo === 'cierre-por-pais' && /^\d{4}-\d{2}-\d{2}$/.test(c.cierrePropuesto) && /aceptar/.test(c.propuesta)), `${casos.length} vs ${lista.length}`);
out = correr('--escribir');
const casos2 = readFileSync(cola, 'utf8').trim().split('\n').filter(Boolean).length;
caso('repetir --escribir no duplica las preguntas', casos2 === casos.length, `${casos2} vs ${casos.length}`);
const s = spawnSync('node', ['tools/cierre-sin-fecha.mjs', '--json'], { cwd: ROOT, encoding: 'utf8' });
const js = JSON.parse(s.stdout);
caso('cierre-sin-fecha --json separa los que deducen los vecinos de los que frenan', js.sinCierre === js.porVecinos + js.porCola + js.yaCargados + js.frenan, s.stdout);
rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

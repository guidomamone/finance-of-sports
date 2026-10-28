#!/usr/bin/env node
// ============================================================================
// tools/cerrar-tool.mjs — LOS PASOS PARA CERRAR UN CAMBIO A UNA TOOL DEL PIPELINE, EN ORDEN, EN UN SOLO COMANDO: chequeo en seco, medición, veredicto y lo que falta para el commit.
// POR QUÉ: la regla (medir antes y después, veredicto general, entrada de CHANGELOG) estaba repartida entre medir-pipeline.mjs, patron.mjs y el hook de commit, y una sesión la cumplía
// de memoria: un paso fuera de orden costaba una medición de varios minutos. Acá el orden lo impone el código; cada paso es la tool de siempre.
// USO (la medición tarda: correrlo en segundo plano):
//   node tools/cerrar-tool.mjs --cambio "<qué hace>" [--patron "<regex sobre los .md>" | --sin-documentos "<por qué no lee documentos>"] [--explicacion "<diferencias esperadas>"] [--tools a.mjs,b.mjs]
// PASOS: 1 `medir-pipeline.mjs --ensayo` (nombres, clasificación, plan: frena en segundos) · 2 las pruebas de lo que cambió (`pruebas-de-tool.mjs` las elige, `probar-todas.mjs --solo` las corre y las anota; una que falla frena antes de medir; si no cambió ninguna tool del pipeline y pasan, termina acá) · 3 `medir-pipeline.mjs` (con --explicacion si la pasaste) · 4 `patron.mjs --escribir` · 5 la lista de lo que falta.
// Los datos y registros se commitean ANTES (un commit de solo datos pasa el hook aunque haya tools sin medir, con `git add <rutas>`, sin -A ni .). No commitea nada.
// ============================================================================
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { patronDe } from './patrones-tools.mjs';
import { pruebasDe } from './pruebas-de-tool.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const v = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
let [cambio, patron, sinDoc, explicacion, tools] = ['--cambio', '--patron', '--sin-documentos', '--explicacion', '--tools'].map(v);
// --tools nombra tools para el veredicto: una sin cambios contra HEAD no tiene nada que medir ni que juzgar y hacía fallar el veredicto («falta la medición con la huella actual»); se ignora y se dice
if (tools) {
  const git = (...a) => spawnSync('git', a, { cwd: ROOT, encoding: 'utf8' }).stdout || '';
  const cambiadasAhora = new Set(`${git('diff', '--name-only', 'HEAD', '--', 'tools')}\n${git('ls-files', '--others', '--exclude-standard', 'tools')}`.split('\n').filter(Boolean));
  const pedidas = tools.split(',').map((s) => s.trim()).filter(Boolean); const sinCambio = pedidas.filter((n) => !cambiadasAhora.has(`tools/${n}`));
  if (sinCambio.length) console.log(`(se ignoran las tools sin cambios contra HEAD: ${sinCambio.join(', ')})`);
  tools = pedidas.filter((n) => !sinCambio.includes(n)).join(',') || null;
}
if (!cambio) { console.error('Uso: node tools/cerrar-tool.mjs --cambio "<qué hace>" [--patron "<regex>" | --sin-documentos "<motivo>"] [--explicacion "…"] [--tools a.mjs,b.mjs]  (sin patrón ni motivo, sale de tools/patrones-tools.json)'); process.exit(1); }

const correr = (args, capturar = false) => spawnSync('node', args, { cwd: ROOT, encoding: 'utf8', stdio: capturar ? ['ignore', 'pipe', 'pipe'] : 'inherit' });
const parar = (m) => { console.error(`\nFRENADO: ${m}`); process.exit(1); };

console.log('== 1/5 Chequeo en seco (nombres, clasificación, plan)');
const seco = correr(['tools/medir-pipeline.mjs', '--ensayo'], true); process.stdout.write(seco.stdout || ''); process.stderr.write(seco.stderr || '');
if (seco.status !== 0) parar('arreglá lo de arriba y volvé a correr; no se midió nada.');
const sinMedir = /nada que medir/.test(seco.stdout || '');
// archivos de tools/ y tools/hooks/ distintos de HEAD (con los nuevos sin trackear): lo que tocó la sesión, para elegir sus pruebas
const gitL = (...a) => spawnSync('git', a, { cwd: ROOT, encoding: 'utf8' }).stdout || '';
const tocados = [...new Set(`${gitL('diff', '--name-only', 'HEAD', '--', 'tools')}\n${gitL('ls-files', '--others', '--exclude-standard', 'tools')}`.split('\n').map((f) => f.match(/^tools\/(?:hooks\/)?([^/]+\.(?:mjs|js))$/)?.[1]).filter(Boolean))];
const pruebas = pruebasDe(tocados);
if (sinMedir && !pruebas.length) parar('ninguna tool del pipeline cambió: no hay nada que medir ni que juzgar (¿ya estaba medido, o solo cambiaron comentarios? `node tools/medir-pipeline.mjs` lo dice).');

if (!sinMedir && !patron && !sinDoc) { // sin --patron ni --sin-documentos: el de la lista corta, y se frena ahora (en segundos, antes de las pruebas y de la medición) si a una tool le falta
  const nombres = tools ? tools.split(',') : ((seco.stdout || '').match(/^Tools: (.+)$/m)?.[1] || '').split(', ').filter(Boolean);
  const p = patronDe(nombres);
  if (p.falta) parar(`sin --patron ni --sin-documentos para: ${p.falta.join(', ')}. ${p.sinEntrada.length ? `Sin entrada en tools/patrones-tools.json: ${p.sinEntrada.join(', ')} (sumala: patron, sinDocumentos o porCambio). ` : ''}Pasá --patron "<regex sobre los .md>" (lo que el cambio deja ver en los documentos) o --sin-documentos "<motivo>" si este cambio no los lee.`);
  patron = p.patron; sinDoc = p.sinDocumentos; console.log(`\nVeredicto con ${patron ? `el patrón /${patron}/` : `«${sinDoc}»`} (tools/patrones-tools.json).`);
}

// Antes de medir (minutos): las pruebas de lo que cambió, porque una prueba rota por este cambio no puede esperar a que `audit.js` la pida a los 14 días. Pasa o falla; no se compara con un "antes".
console.log('\n== 2/5 Pruebas de lo que cambió');
if (!pruebas.length) console.log('  ninguna prueba nombra lo que cambió (tools/pruebas-de-tool.mjs).');
else {
  for (const p of pruebas) console.log(`  ${p.ruta}  (por ${p.por})`);
  const pr = correr(['tools/probar-todas.mjs', '--solo', pruebas.map((p) => p.ruta.split('/').pop()).join(',')]); // anota cuándo pasó cada una en Admin/registros/pruebas-corridas.json
  if (pr.status !== 0) parar('una prueba de lo que cambió falla (arriba): arreglá el cambio, o la prueba si el comportamiento nuevo es a propósito, y volvé a correr; no se midió nada.');
}
if (sinMedir) { console.log('\nNada que medir (ninguna tool del pipeline cambió) y las pruebas de lo que cambió pasan: no hay más pasos.'); process.exit(0); }

console.log('\n== 3/5 Medición (antes y después; tarda varios minutos)');
const registro = resolve(ROOT, 'Admin/registros/mediciones-pipeline.jsonl');
const antes = existsSync(registro) ? readFileSync(registro, 'utf8').split('\n').filter(Boolean).length : 0;
const med = correr(['tools/medir-pipeline.mjs', ...(explicacion ? ['--explicacion', explicacion] : [])]);
if (med.status !== 0) parar('la medición no terminó bien (mirá el mensaje de arriba).');
const lineas = readFileSync(registro, 'utf8').split('\n').filter(Boolean);
const ultima = lineas.length > antes ? JSON.parse(lineas.at(-1)) : null;
if (!ultima) parar('la medición no anotó ninguna línea (¿pidió datos commiteados antes?).');
if (!/^(idéntico|\d+ diferencias, todas explicadas)$/.test(ultima.resultado || '')) parar(`resultado «${ultima.resultado}»: explicá las diferencias esperadas y volvé a correr con --explicacion "…", o arreglá el cambio.`);

console.log('\n== 4/5 Veredicto (fos patron)');
const pat = correr(['tools/patron.mjs', '--cambio', cambio, ...(patron ? ['--patron', patron] : ['--sin-documentos', sinDoc]), ...(tools ? ['--tools', tools] : []), '--escribir']);
if (pat.status !== 0) parar('el veredicto no se pudo calcular.');

console.log('\n== 5/5 Lo que falta para commitear');
const cambiadas = [...new Set(`${spawnSync('git', ['diff', '--name-only', 'HEAD', '--', 'tools'], { cwd: ROOT, encoding: 'utf8' }).stdout}\n${spawnSync('git', ['ls-files', '--others', '--exclude-standard', 'tools'], { cwd: ROOT, encoding: 'utf8' }).stdout}`.split('\n').map((f) => f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter(Boolean))];
const changelog = readFileSync(resolve(ROOT, 'Admin/CHANGELOG.md'), 'utf8').slice(0, 12000);
const sinEntrada = cambiadas.filter((n) => !changelog.includes(n));
console.log(sinEntrada.length ? `  - Admin/CHANGELOG.md: ninguna entrada reciente nombra ${sinEntrada.join(', ')}; la entrada lleva las tools en el título y su último bullet empieza con «Medición:».` : '  - Admin/CHANGELOG.md: las tools están nombradas.');
console.log('  - Si el veredicto dijo RECHAZADA o PARCHE, el cambio no va al código (sacá los nombres a un archivo de configuración, o va como ajuste) y se vuelve a empezar.');
console.log('  - Después: `git add` de las tools, el CHANGELOG y el TODO (sin -A de datos que no son del cambio) y `git commit`.');

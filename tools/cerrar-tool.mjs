#!/usr/bin/env node
// ============================================================================
// tools/cerrar-tool.mjs — LOS PASOS PARA CERRAR UN CAMBIO A UNA TOOL DEL PIPELINE, EN ORDEN, EN UN SOLO COMANDO: chequeo en seco, medición, veredicto y lo que falta para el commit.
// POR QUÉ: la regla (medir antes y después, veredicto general, entrada de CHANGELOG) estaba repartida entre medir-pipeline.mjs, patron.mjs y el hook de commit, y una sesión la cumplía
// de memoria: un paso fuera de orden costaba una medición de varios minutos. Acá el orden lo impone el código; cada paso es la tool de siempre.
// USO (la medición tarda: correrlo en segundo plano):
//   node tools/cerrar-tool.mjs --cambio "<qué hace>" [--patron "<regex sobre los .md>" | --sin-documentos "<por qué no lee documentos>"] [--explicacion "<diferencias esperadas>"] [--tools a.mjs,b.mjs]
// PASOS: 1 `medir-pipeline.mjs --ensayo` (nombres, clasificación, plan: frena en segundos) · 2 `medir-pipeline.mjs` (con --explicacion si la pasaste) · 3 `patron.mjs --escribir` · 4 la lista de lo que falta.
// Los datos y registros se commitean ANTES (un commit de solo datos pasa el hook aunque haya tools sin medir, con `git add <rutas>`, sin -A ni .). No commitea nada.
// ============================================================================
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { patronDe } from './patrones-tools.mjs';

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

console.log('== 1/4 Chequeo en seco (nombres, clasificación, plan)');
const seco = correr(['tools/medir-pipeline.mjs', '--ensayo'], true); process.stdout.write(seco.stdout || ''); process.stderr.write(seco.stderr || '');
if (seco.status !== 0) parar('arreglá lo de arriba y volvé a correr; no se midió nada.');
if (/nada que medir/.test(seco.stdout || '')) parar('ninguna tool del pipeline cambió: no hay nada que medir ni que juzgar (¿ya estaba medido, o solo cambiaron comentarios? `node tools/medir-pipeline.mjs` lo dice).');

if (!patron && !sinDoc) { // sin --patron ni --sin-documentos: el de la lista corta, y se frena ahora (en segundos) si a una tool le falta, no después de la medición
  const nombres = tools ? tools.split(',') : ((seco.stdout || '').match(/^Tools: (.+)$/m)?.[1] || '').split(', ').filter(Boolean);
  const p = patronDe(nombres);
  if (p.falta) parar(`sin --patron ni --sin-documentos y sin entrada en tools/patrones-tools.json para: ${p.falta.join(', ')}. Pasá --patron "<regex sobre los .md>" o --sin-documentos "<motivo>", o sumá la tool a esa lista.`);
  patron = p.patron; sinDoc = p.sinDocumentos; console.log(`\nVeredicto con ${patron ? `el patrón /${patron}/` : `«${sinDoc}»`} (tools/patrones-tools.json).`);
}

console.log('\n== 2/4 Medición (antes y después; tarda varios minutos)');
const registro = resolve(ROOT, 'Admin/registros/mediciones-pipeline.jsonl');
const antes = existsSync(registro) ? readFileSync(registro, 'utf8').split('\n').filter(Boolean).length : 0;
const med = correr(['tools/medir-pipeline.mjs', ...(explicacion ? ['--explicacion', explicacion] : [])]);
if (med.status !== 0) parar('la medición no terminó bien (mirá el mensaje de arriba).');
const lineas = readFileSync(registro, 'utf8').split('\n').filter(Boolean);
const ultima = lineas.length > antes ? JSON.parse(lineas.at(-1)) : null;
if (!ultima) parar('la medición no anotó ninguna línea (¿pidió datos commiteados antes?).');
if (!/^(idéntico|\d+ diferencias, todas explicadas)$/.test(ultima.resultado || '')) parar(`resultado «${ultima.resultado}»: explicá las diferencias esperadas y volvé a correr con --explicacion "…", o arreglá el cambio.`);

console.log('\n== 3/4 Veredicto (fos patron)');
const pat = correr(['tools/patron.mjs', '--cambio', cambio, ...(patron ? ['--patron', patron] : ['--sin-documentos', sinDoc]), ...(tools ? ['--tools', tools] : []), '--escribir']);
if (pat.status !== 0) parar('el veredicto no se pudo calcular.');

console.log('\n== 4/4 Lo que falta para commitear');
const cambiadas = [...new Set(`${spawnSync('git', ['diff', '--name-only', 'HEAD', '--', 'tools'], { cwd: ROOT, encoding: 'utf8' }).stdout}\n${spawnSync('git', ['ls-files', '--others', '--exclude-standard', 'tools'], { cwd: ROOT, encoding: 'utf8' }).stdout}`.split('\n').map((f) => f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter(Boolean))];
const changelog = readFileSync(resolve(ROOT, 'Admin/CHANGELOG.md'), 'utf8').slice(0, 12000);
const sinEntrada = cambiadas.filter((n) => !changelog.includes(n));
console.log(sinEntrada.length ? `  - Admin/CHANGELOG.md: ninguna entrada reciente nombra ${sinEntrada.join(', ')}; la entrada lleva las tools en el título y su último bullet empieza con «Medición:».` : '  - Admin/CHANGELOG.md: las tools están nombradas.');
console.log('  - Si el veredicto dijo RECHAZADA o PARCHE, el cambio no va al código (sacá los nombres a un archivo de configuración, o va como ajuste) y se vuelve a empezar.');
console.log('  - Después: `git add` de las tools, el CHANGELOG y el TODO (sin -A de datos que no son del cambio) y `git commit`.');

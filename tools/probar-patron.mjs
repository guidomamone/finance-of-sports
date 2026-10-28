#!/usr/bin/env node
// tools/probar-patron.mjs — la prueba de patron.mjs en un repo de juguete (Admin/mediciones/pipeline/_prueba-patron, gitignoreado): el veredicto de un cambio de infraestructura con
// `--sin-documentos "motivo"` (el cambio no lee documentos, así que no hay patrón que contar). Valen las otras dos condiciones: sin nombres de club/año/ruta, y medición idéntica o explicada.
//   1. sin medición con la huella actual: PENDIENTE, no anota; 2. con medición idéntica: GENERAL y anota (con `sinDocumentos` y sin patrón);
//   3. el código nombra un club o un año: RECHAZADA; 4. un motivo corto o sin --cambio se rechaza; 5. sin --patron ni --sin-documentos sigue PENDIENTE.
// Uso: node tools/probar-patron.mjs   (unos segundos; sale con 1 si algún caso falla; no toca nada fuera de su carpeta de prueba)
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const T = resolve(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-patron');
rmSync(T, { recursive: true, force: true });
for (const d of ['tools', 'data', 'Admin/registros']) mkdirSync(join(T, d), { recursive: true });
for (const f of ['patron.mjs', 'clasificar-tools.mjs', 'registro-esquema.js', 'esquemas-registros.json', 'patrones-tools.mjs', 'patrones-tools.json']) copyFileSync(join(ROOT, 'tools', f), join(T, 'tools', f));
const w = (rel, txt) => writeFileSync(join(T, rel), txt);
const leer = (rel) => readFileSync(join(T, rel), 'utf8');
w('tools/pipeline-tools.json', JSON.stringify({
  lotes: { chico: 'a', mediano: 'b', completo: 'c' }, medidores: { salida: { que: 'prueba', usaLista: false, correr: ['tools/x.mjs'], comparar: 'texto' } },
  tools: { 'fake-tool.mjs': { alcance: 'etapa', medidores: ['salida'] } }, no_pipeline: { 'patron.mjs': 'prueba', 'clasificar-tools.mjs': 'prueba', 'registro-esquema.js': 'prueba' },
}, null, 1));
w('data/clubs.js', "const clubs = {\n  'boca-ar': { name:'Boca Juniors', displayName:'Boca Juniors' },\n};\n");
w('tools/fake-tool.mjs', 'export const VALOR = 1;\n');
w('Admin/registros/.gitkeep', '');
const g = (...a) => spawnSync('git', ['-c', 'user.email=prueba@prueba', '-c', 'user.name=prueba', ...a], { cwd: T, encoding: 'utf8' });
g('init', '-q'); g('add', '-A'); g('commit', '-q', '-m', 'base');
const patron = (...args) => { const r = spawnSync('node', ['tools/patron.mjs', ...args], { cwd: T, encoding: 'utf8' }); return { status: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
const registro = () => (existsSync(join(T, 'Admin/registros/auditoria-proceso.jsonl')) ? leer('Admin/registros/auditoria-proceso.jsonl').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);
const medido = (resultado) => w('Admin/registros/mediciones-pipeline.jsonl', JSON.stringify({ fecha: '2026-10-24', tools: { 'fake-tool.mjs': { antes: 'x', despues: g('hash-object', 'tools/fake-tool.mjs').stdout.trim() } }, lote: { nivel: 'chico' }, resultado }) + '\n');
const MOTIVO = 'cambia cuándo se reescribe un archivo generado';
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

w('tools/fake-tool.mjs', 'export const VALOR = 1;\nexport const OTRO = 2;\n');
let r = patron('--cambio', 'otro valor', '--sin-documentos', MOTIVO, '--escribir');
caso('sin medición con la huella actual: PENDIENTE y no anota', /PENDIENTE/.test(r.out) && !registro().length, r.out.slice(-300));
medido('idéntico');
r = patron('--cambio', 'otro valor', '--sin-documentos', MOTIVO, '--escribir');
const l = registro().at(-1);
caso('con medición idéntica: GENERAL, anotado con el motivo y sin patrón', /Veredicto: GENERAL/.test(r.out) && /^GENERAL/.test(l?.veredicto || '') && l?.sinDocumentos === MOTIVO && l?.patron === null && typeof l?.tools?.['fake-tool.mjs'] === 'string', r.out.slice(-300) + JSON.stringify(l));
medido('3 diferencias sin explicar');
r = patron('--cambio', 'otro valor', '--sin-documentos', MOTIVO);
caso('con una medición sin explicar sigue PENDIENTE', /PENDIENTE/.test(r.out), r.out.slice(-200));
medido('idéntico');
w('tools/fake-tool.mjs', "export const VALOR = 1;\nexport const CLUB = 'Boca Juniors';\n");
medido('idéntico');
r = patron('--cambio', 'otro valor', '--sin-documentos', MOTIVO);
caso('si el código nombra un club: RECHAZADA, aunque no lea documentos', /RECHAZADA/.test(r.out) && /nombra un club/.test(r.out), r.out.slice(-300));
w('tools/fake-tool.mjs', 'export const VALOR = 1;\nexport const ANIO = 2021;\n');
medido('idéntico');
r = patron('--cambio', 'otro valor', '--sin-documentos', MOTIVO);
caso('si el código lleva un año literal: RECHAZADA', /RECHAZADA/.test(r.out) && /año literal/.test(r.out), r.out.slice(-300));
r = patron('--cambio', 'otro valor', '--sin-documentos', 'corto');
caso('un motivo corto se rechaza con código 1', r.status === 1 && /pide el motivo/.test(r.out), r.out);
r = patron('--sin-documentos', MOTIVO);
caso('sin --cambio se rechaza con código 1', r.status === 1 && /pide el motivo/.test(r.out), r.out);
w('tools/fake-tool.mjs', 'export const VALOR = 1;\nexport const OTRO = 2;\n');
medido('idéntico');
r = patron('--cambio', 'otro valor');
caso('sin --patron ni --sin-documentos, una tool que no está en patrones-tools.json frena con código 1 y la nombra', r.status === 1 && /Sin entrada en tools\/patrones-tools\.json: fake-tool\.mjs/.test(r.out), r.out.slice(-300));

// --en-xhtml: el patrón se cuenta sobre los .xhtml (caso del 413: top/left en em), no sobre los .md
const doc = (rel, txt) => { mkdirSync(join(T, rel, '..'), { recursive: true }); w(rel, txt); };
for (const [club, n] of [['AGF', 2], ['AaB', 1], ['SonderjyskE', 1]]) for (let i = 0; i < n; i++) doc(`Clubes/Dinamarca/${club}/aarsrapport-${i}.xhtml`, '<div style="top:12.5em;left:3em">1.000</div>');
doc('Clubes/Dinamarca/AGF/otro.xhtml', '<div style="top:12px">sin em</div>');
doc('Clubes/Portugal/Benfica/relatorio.md', 'top:12.5em en un .md no cuenta');
doc('Clubes/Portugal/Benfica/relatorio.xhtml', '<p>sin el patrón</p>');
r = patron('--cambio', 'el lector de XHTML lee top en em', '--en-xhtml', 'top:[\\d.]+em', '--escribir');
caso('--en-xhtml cuenta sobre los .xhtml (4 documentos de 3 clubes, sin el .md) y da GENERAL', /sobre los \.xhtml: 4 documentos de 3 clubes/.test(r.out) && /Veredicto: GENERAL/.test(r.out), r.out.slice(-500));
caso('el registro anota el comando con --en-xhtml', registro().at(-1)?.comando?.startsWith('node tools/patron.mjs --en-xhtml') && registro().at(-1)?.documentos === 4, JSON.stringify(registro().at(-1)));
r = patron('--cambio', 'solo un documento', '--en-xhtml', 'top:12px');
caso('--en-xhtml bajo el umbral con código cambiado: RECHAZADA (va como ajuste)', /RECHAZADA/.test(r.out) && /1 documentos de 1 clubes/.test(r.out), r.out.slice(-400));
r = patron('--cambio', 'sin regex', '--en-xhtml');
caso('--en-xhtml sin regex se rechaza con código 1', r.status === 1 && /pide la regex/.test(r.out), r.out);

// --revision propia|auditora queda en el registro, y revisionesPendientes (el P4 de audit.js) lista las propias que una auditora posterior no cubre
caso('la línea anotada lleva esquema y cumple tools/esquemas-registros.json', registro().at(-1)?.esquema === 1 && registro().at(-1)?.tipo === 'veredicto-patron' && createRequire(import.meta.url)('./registro-esquema.js').validar('auditoria-proceso', registro().at(-1)).length === 0, JSON.stringify(registro().at(-1)).slice(0, 300));
r = patron('--cambio', 'otro valor', '--sin-documentos', MOTIVO, '--revision', 'propia', '--escribir');
caso('--revision propia queda en el registro', /Anotado/.test(r.out) && registro().at(-1)?.revision === 'propia', r.out.slice(-300));
r = patron('--cambio', 'otro valor', '--sin-documentos', MOTIVO, '--revision', 'nadie');
caso('--revision con otro valor se rechaza con código 1', r.status === 1 && /propia/.test(r.out), r.out);
const { revisionesPendientes } = (await import('node:module')).createRequire(import.meta.url)('./audit-chequeos-5.js');
const reg = [{ revision: 'propia', tools: { 'a.mjs': 'h1' }, cambio: 'uno' }, { revision: 'propia', tools: { 'b.mjs': 'h2' }, cambio: 'dos' }, { cambio: 'sin campo', tools: { 'b.mjs': 'h2' } }, { revision: 'auditora', tools: { 'a.mjs': 'h3' }, cambio: 'rev' }, { revision: 'propia', tools: { 'a.mjs': 'h4' }, cambio: 'tres' }];
caso('revisionesPendientes: una auditora posterior cubre las mismas tools; las líneas sin campo no cuentan', revisionesPendientes(reg).map((x) => x.cambio).join() === 'dos,tres', JSON.stringify(revisionesPendientes(reg)));

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

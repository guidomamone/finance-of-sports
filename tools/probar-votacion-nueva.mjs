#!/usr/bin/env node
// tools/probar-votacion-nueva.mjs — la prueba de votacion-nueva.mjs: el cuánto mueve, la lista fija de qué abrir, el formato del voto y que no pisa un archivo.
// Uso: node tools/probar-votacion-nueva.mjs (sale con 1 si un caso falla; escribe un caso de prueba en Admin/mediciones/ y lo borra al terminar).
import { existsSync, rmSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SALIDA = resolve(ROOT, 'Admin', 'mediciones', '999-votacion-prueba.md');
if (existsSync(SALIDA)) { console.error(`${SALIDA} ya existe: borralo antes de probar`); process.exit(1); }
const correr = (...a) => { const r = spawnSync('node', ['tools/votacion-nueva.mjs', '--id', '999', '--slug', 'prueba', '--titulo', 'caso de prueba', ...a], { cwd: ROOT, encoding: 'utf8' }); return { status: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

let r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|100,5', '--total', '1000');
caso('el ensayo imprime el caso y no escribe', r.status === 0 && /Votación 999/.test(r.out) && !existsSync(SALIDA), r.out.slice(0, 300));
caso('0,05 % del total: 1 % o menos, no se vota', /0,05 % del total 1000: 1 % o menos/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--total', '1000', '--club', 'sonderjyske-dk', '--palabras', 'Bruttofortjeneste');
caso('20 % del total: votan tres', /20 % del total 1000: más de 1 %, votan tres/.test(r.out), r.out);
caso('la lista fija trae la regla de CONVENCIONES-DATOS.md con su línea y el precedente del club', /CONVENCIONES-DATOS\.md:\d+ — /.test(r.out) && /data\/dk\/sonderjyske-dk\.json/.test(r.out), r.out);
caso('el voto se pide en JSON con criterios 1 a 9 y no_abri', /"criterios"/.test(r.out) && /"no_abri"/.test(r.out) && /Conclusión:/.test(r.out) && /Destino:/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--escribir');
caso('--escribir crea el archivo con la marca de primera línea', r.status === 0 && existsSync(SALIDA) && readFileSync(SALIDA, 'utf8').startsWith('<!-- md:'), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--escribir');
caso('no pisa un archivo que ya existe', r.status === 1 && /no se pisa/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100');
caso('con una sola opción se rechaza', r.status === 1 && /al menos dos/.test(r.out), r.out);
// ---- misma liga, votante único y el formato de la cita
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--total', '1000', '--club', 'sonderjyske-dk');
caso('la lista fija trae los clubes de la misma liga (criterio 2)', /Misma liga \(criterio 2\), dk-superliga: \d+ clubes/.test(r.out), r.out);
caso('el formato del voto pide la cita con ref, texto literal y mismo_hecho', /"mismo_hecho": true/.test(r.out) && /votacion-contar\.mjs/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--total', '1000', '--precedente', 'Admin/PLANTILLA-SESION.md:1|las reglas fijas');
caso('un precedente verificado: vota UN votante', /Votan: UN votante/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--total', '1000', '--precedente', 'Admin/PLANTILLA-SESION.md:1|texto que no esta');
caso('un precedente que no se verifica: votan tres y dice por qué', /Votan: tres votantes \(el precedente .* NO se verificó/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|100,5', '--total', '1000');
caso('1 % o menos: no vota nadie', /Votan: ninguno/.test(r.out), r.out);

// ---- votacion-citas.mjs y votacion-contar.mjs sobre archivos de juguete
const J = resolve(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-votacion'); rmSync(J, { recursive: true, force: true }); mkdirSync(J, { recursive: true });
writeFileSync(resolve(J, 'regla.md'), 'primera línea\nLa REGLA dice que el margen bruto va como una sola línea\ntercera\n');
const R = 'Admin/mediciones/pipeline/_prueba-votacion/regla.md';
const { verificarCita } = await import('./votacion-citas.mjs');
caso('la cita verifica: la línea existe y tiene el texto (sin mayúsculas ni espacios de más)', verificarCita({ ref: `${R}:2`, texto: 'la regla dice   que el margen bruto' }).ok);
caso('la cita no verifica si el texto no está en esa línea', !verificarCita({ ref: `${R}:3`, texto: 'margen bruto' }).ok);
caso('la cita no verifica si la línea no existe', /tiene 3 líneas/.test(verificarCita({ ref: `${R}:9`, texto: 'margen bruto' }).motivo || ''));
caso('la cita no verifica si el archivo no existe o sale del repo', !verificarCita({ ref: 'Admin/no-existe.md:1', texto: 'margen bruto' }).ok && /sale del repo/.test(verificarCita({ ref: '../../etc/hosts:1', texto: 'localhost' }).motivo || ''));
caso('la cita sin texto o con texto corto no verifica', !verificarCita({ ref: `${R}:2` }).ok && !verificarCita({ ref: `${R}:2`, texto: 'la' }).ok);
caso('una cita club-id@año verifica contra el JSON del club', verificarCita({ ref: 'sonderjyske-dk@2024', texto: 'Bruttofortjeneste' }).ok && !verificarCita({ ref: 'sonderjyske-dk@1999', texto: 'Bruttofortjeneste' }).ok);
const { contar } = await import('./votacion-contar.mjs');
const ok = { ref: `${R}:2`, texto: 'margen bruto', mismo_hecho: true }, falsa = { ref: `${R}:3`, texto: 'margen bruto', mismo_hecho: true };
const voto = (opcion, cita, extra = {}) => ({ opcion, criterios: cita ? { 1: { valor: 'a favor', cita } } : {}, anios_que_cambian: [], no_abri: [], ...extra });
caso('3 a 0 decide', contar([voto('A'), voto('A'), voto('A')]).veredicto === 'DECIDIDO');
caso('2 a 1 sin precedente en la minoría decide', contar([voto('A'), voto('A'), voto('B')]).veredicto === 'DECIDIDO');
caso('2 a 1 con un precedente 1 a 3 verificado y del mismo hecho en la minoría va a Guido', contar([voto('A'), voto('A'), voto('B', ok)]).veredicto === 'A GUIDO');
caso('2 a 1 cuyo precedente de la minoría no se verifica decide, y dice cuál no sumó', (() => { const x = contar([voto('A'), voto('A'), voto('B', falsa)]); return x.veredicto === 'DECIDIDO' && x.noSuman.length === 1; })());
caso('un precedente que no dice mismo_hecho no suma', contar([voto('A'), voto('A'), voto('B', { ...ok, mismo_hecho: false })]).veredicto === 'DECIDIDO');
caso('empate y votos sin mayoría van a Guido', contar([voto('A'), voto('B')]).veredicto === 'A GUIDO' && contar([voto('A'), voto('B'), voto('C')]).veredicto === 'A GUIDO');
caso('una opción que cambia más de 10 años va a Guido aunque sea 3 a 0', contar([voto('A', null, { anios_que_cambian: new Array(11).fill('x-1') }), voto('A'), voto('A')]).veredicto === 'A GUIDO');
caso('lo que un votante dijo no haber abierto queda a la vista', contar([voto('A', null, { no_abri: ['Admin/CONVENCIONES-DATOS.md'] }), voto('A'), voto('A')]).sinAbrir.length === 1);
rmSync(J, { recursive: true, force: true });

// ---- las 22 votaciones del registro: cada 3 a 0 que el contador decidiría fue DECIDIDO; ninguna A GUIDO fue unánime
const reg = readFileSync(resolve(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((x) => Array.isArray(x.votos));
const clave = (x) => x.votos.map((v) => (typeof v === 'string' ? v : JSON.stringify(v)));
const unanimes = reg.filter((x) => new Set(clave(x)).size === 1);
caso(`registro: las ${unanimes.length} votaciones unánimes fueron DECIDIDO y el contador también las decide`, unanimes.every((x) => x.veredicto === 'DECIDIDO') && unanimes.every((x) => contar(clave(x).map((o) => voto(o))).veredicto === 'DECIDIDO'));
caso('registro: las votaciones que fueron A GUIDO no eran unánimes', reg.filter((x) => x.veredicto === 'A GUIDO').every((x) => new Set(clave(x)).size > 1));

rmSync(SALIDA, { force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

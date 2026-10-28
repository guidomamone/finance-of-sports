#!/usr/bin/env node
// tools/probar-registros.mjs — la prueba del esquema de los registros de decisión (punto 437): registro-esquema.js (validar), cola-respuesta.mjs (lineaDeRespuesta), cola.mjs --responder,
// decision.mjs y la línea que anota patron.mjs. Lo que escribe va a archivos de juguete en Admin/mediciones/pipeline/_prueba-registros/ (se borran al terminar); no toca los registros.
// Uso: node tools/probar-registros.mjs   (sale con 1 si un caso falla)
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const { validar } = createRequire(import.meta.url)('./registro-esquema.js');
const { lineaDeRespuesta } = await import('./cola-respuesta.mjs');
const T = join(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-registros');
rmSync(T, { recursive: true, force: true }); mkdirSync(T, { recursive: true });
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

// ---- validar: auditoria-proceso
const buena = { esquema: 1, tipo: 'veredicto-patron', veredicto_codigo: 'general', fecha: '2026-10-25', sesion: 'unica', cambio: 'x', veredicto: 'GENERAL: SE COMMITEA', motivo: 'y', commit: 'sin commit', tools: { 'a.mjs': 'abc' } };
caso('una línea sin `esquema` es legado y no se valida', validar('auditoria-proceso', { fecha: '2026-10-01', cambio: 1 }).length === 0);
caso('una línea completa cumple', validar('auditoria-proceso', buena).length === 0, validar('auditoria-proceso', buena).join('; '));
caso('falta un campo obligatorio', validar('auditoria-proceso', { ...buena, motivo: undefined }).some((e) => /falta `motivo`/.test(e)));
caso('un valor fuera de la lista', validar('auditoria-proceso', { ...buena, veredicto_codigo: 'quizas' }).some((e) => /veredicto_codigo/.test(e)));
caso('un tipo de dato equivocado', validar('auditoria-proceso', { ...buena, documentos: 'muchos' }).some((e) => /documentos/.test(e)));
caso('un campo que no está en el esquema', validar('auditoria-proceso', { ...buena, inventado: 1 }).some((e) => /inventado/.test(e)));
caso('`votos` es obligatorio en una votación y no en un veredicto', validar('auditoria-proceso', { ...buena, tipo: 'votacion' }).some((e) => /votos/.test(e)) && !validar('auditoria-proceso', buena).some((e) => /votos/.test(e)));
caso('`revision` es obligatorio en una condición nueva', validar('auditoria-proceso', { ...buena, tipo: 'condicion-nueva' }).some((e) => /revision/.test(e)) && validar('auditoria-proceso', { ...buena, tipo: 'condicion-nueva', revision: 'propia' }).length === 0);

// ---- lineaDeRespuesta / validar cola-respuesta
let r = lineaDeRespuesta({ id: 'a1', decision: 'aceptar' });
caso('sin --evidencia, --seguridad ni --causa no se guarda y dice las tres que faltan', r.linea === null && r.errores.length === 3, JSON.stringify(r));
r = lineaDeRespuesta({ id: 'a1', decision: 'aceptar', evidencia: 'Clubes/X/y.md:10-12', seguridad: 'alta', causa: 'lectura-del-documento' });
caso('con las tres: lleva esquema, la evidencia se parte en md y líneas, y cumple', r.conEsquema && r.errores.length === 0 && r.linea.evidencia.md === 'Clubes/X/y.md' && r.linea.evidencia.lineas.join() === '10,12', JSON.stringify(r));
caso('«ninguna» es evidencia null', lineaDeRespuesta({ id: 'a1', decision: 'aceptar', evidencia: 'ninguna', seguridad: 'baja', causa: 'otra' }).linea.evidencia === null);
caso('una línea sola (:10) es el rango 10-10', lineaDeRespuesta({ id: 'a1', decision: 'aceptar', evidencia: 'a.md:10', seguridad: 'alta', causa: 'otra' }).linea.evidencia.lineas.join() === '10,10');
caso('con --seguridad pero sin --evidencia no se guarda', lineaDeRespuesta({ id: 'a1', decision: 'aceptar', seguridad: 'alta', causa: 'otra' }).errores.length > 0);
caso('una evidencia mal escrita no se guarda', lineaDeRespuesta({ id: 'a1', decision: 'aceptar', evidencia: 'por ahi', seguridad: 'alta', causa: 'otra' }).errores.length > 0);
caso('una seguridad o una causa fuera de la lista no se guarda', lineaDeRespuesta({ id: 'a1', decision: 'aceptar', evidencia: 'a.md:1', seguridad: 'segura', causa: 'otra' }).errores.length > 0 && lineaDeRespuesta({ id: 'a1', decision: 'aceptar', evidencia: 'a.md:1', seguridad: 'alta', causa: 'porque si' }).errores.length > 0);
caso('corregir sin valor no cumple', lineaDeRespuesta({ id: 'a1', decision: 'corregir', evidencia: 'a.md:1', seguridad: 'alta', causa: 'otra' }).errores.some((e) => /valor/.test(e)));
caso('--precedentes se guarda como lista', JSON.stringify(lineaDeRespuesta({ id: 'a1', decision: 'aceptar', evidencia: 'a.md:1', seguridad: 'alta', causa: 'otra', precedentes: 'b2,c3' }).linea.precedentes) === '["b2","c3"]');

// ---- cola.mjs --responder sobre una cola de juguete (COLA_ARCHIVO)
const cola = join(T, 'cola.jsonl');
writeFileSync(cola, JSON.stringify({ tipo: 'caso', id: 'abc', ts: '2026-10-25T00:00:00.000Z', clave: 'k', pdf: 'Clubes/X/y.pdf', md: 'Clubes/X/y.md', etapa: 'verificar', motivo: 'duda-tema', detalle: 'd', que: 'q' }) + '\n');
const responder = (...a) => { const x = spawnSync('node', ['tools/cola.mjs', '--responder', 'abc', ...a], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, COLA_ARCHIVO: cola } }); return { status: x.status, out: (x.stdout || '') + (x.stderr || '') }; };
const ultima = () => JSON.parse(readFileSync(cola, 'utf8').trim().split('\n').at(-1));
let x = responder('aceptar', '--evidencia', 'Clubes/X/y.md:3-9', '--seguridad', 'media', '--causa', 'regla-escrita');
caso('cola --responder con las tres guarda la línea con esquema que cumple', x.status === 0 && ultima().esquema === 1 && validar('cola-respuesta', ultima()).length === 0, x.out);
x = responder('aceptar', '--seguridad', 'alta');
caso('cola --responder con una sola no guarda y dice qué falta', x.status === 1 && /evidencia/.test(x.out) && JSON.parse(readFileSync(cola, 'utf8').trim().split('\n').at(-1)).seguridad === 'media', x.out);
x = responder('aceptar');
caso('cola --responder sin las tres no guarda nada y dice qué falta', x.status === 1 && /evidencia/.test(x.out) && /seguridad/.test(x.out) && /causa/.test(x.out) && ultima().seguridad === 'media', x.out);
x = responder('descartar', '--evidencia', 'ninguna', '--seguridad', 'baja');
caso('cola --responder sin --causa no guarda (ninguna decisión sale del esquema)', x.status === 1 && /causa/.test(x.out) && ultima().seguridad === 'media', x.out);

// ---- cola.mjs --ids: varios casos con una nota, evidencia, seguridad y causa compartidas (ítem 13 del punto 478)
const caso3 = (id) => JSON.stringify({ tipo: 'caso', id, ts: '2026-10-25T00:00:00.000Z', clave: `k-${id}`, pdf: 'Clubes/X/y.pdf', md: 'Clubes/X/y.md', etapa: 'verificar', motivo: 'anio-vecino', detalle: id, que: 'q' });
const cola3 = join(T, 'cola3.jsonl'); writeFileSync(cola3, ['c1', 'c2', 'c3'].map(caso3).join('\n') + '\n');
const lineas3 = () => readFileSync(cola3, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const ids = (...a) => { const x = spawnSync('node', ['tools/cola.mjs', '--ids', ...a], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, COLA_ARCHIVO: cola3 } }); return { status: x.status, out: (x.stdout || '') + (x.stderr || '') }; };
x = ids('c1,c2,c3', 'aceptar', '--nota', 'la misma fila en los tres', '--evidencia', 'Clubes/X/y.md:3-9', '--seguridad', 'alta', '--causa', 'lectura-del-documento');
const resp3 = lineas3().filter((l) => l.tipo === 'respuesta' || l.decision);
caso('cola --ids guarda una respuesta con esquema por caso (3 casos, las mismas opciones)', x.status === 0 && resp3.length === 3 && resp3.every((r) => r.esquema === 1 && r.nota === 'la misma fila en los tres' && validar('cola-respuesta', r).length === 0) && resp3.map((r) => r.id).join() === 'c1,c2,c3', x.out + JSON.stringify(resp3));
writeFileSync(cola3, ['c1', 'c2', 'c3'].map(caso3).join('\n') + '\n');
x = ids('c1,c2', 'aceptar', '--seguridad', 'alta');
caso('cola --ids sin las tres opciones no guarda nada y dice qué falta', x.status === 1 && /evidencia/.test(x.out) && /causa/.test(x.out) && lineas3().length === 3, x.out);
x = ids('c1,zz9', 'aceptar', '--evidencia', 'ninguna', '--seguridad', 'alta', '--causa', 'otra');
caso('cola --ids con un id que no existe no guarda ninguno (todo o nada)', x.status === 1 && /zz9/.test(x.out) && lineas3().length === 3, x.out);

// ---- decision.mjs en un repo de juguete
const D = join(T, 'repo'); mkdirSync(join(D, 'tools'), { recursive: true }); mkdirSync(join(D, 'Admin', 'registros'), { recursive: true });
for (const f of ['decision.mjs', 'registro-esquema.js', 'esquemas-registros.json']) copyFileSync(join(ROOT, 'tools', f), join(D, 'tools', f));
writeFileSync(join(D, 'Admin', 'registros', 'auditoria-proceso.jsonl'), '');
const decidir = (...a) => { const y = spawnSync('node', ['tools/decision.mjs', ...a], { cwd: D, encoding: 'utf8' }); return { status: y.status, out: (y.stdout || '') + (y.stderr || '') }; };
x = decidir('--veredicto', 'APROBADO', '--motivo', 'prueba');
caso('decision.mjs sin --resultado se niega', x.status === 1 && /--resultado/.test(x.out), x.out);
x = decidir('--veredicto', 'APROBADO', '--resultado', 'aprobado', '--motivo', 'prueba');
const lineaD = existsSync(join(D, 'Admin', 'registros', 'auditoria-proceso.jsonl')) ? JSON.parse(readFileSync(join(D, 'Admin', 'registros', 'auditoria-proceso.jsonl'), 'utf8').trim() || 'null') : null;
caso('decision.mjs con --resultado registra una línea que cumple el esquema', x.status === 0 && lineaD && lineaD.esquema === 1 && validar('auditoria-proceso', lineaD).length === 0, x.out + JSON.stringify(lineaD));

// ---- silenciar.mjs en un repo de juguete (con un audit.js falso que devuelve un hallazgo)
const Z = join(T, 'repo-silenciar'); mkdirSync(join(Z, 'tools'), { recursive: true }); mkdirSync(join(Z, 'Admin', 'registros'), { recursive: true });
for (const f of ['silenciar.mjs', 'registro-esquema.js', 'esquemas-registros.json']) copyFileSync(join(ROOT, 'tools', f), join(Z, 'tools', f));
writeFileSync(join(Z, 'tools', 'audit.js'), "console.log(JSON.stringify({ findings: [{ code: 'codigo-de-prueba', msg: 'algo con texto-unico adentro' }] }));\n");
writeFileSync(join(Z, 'tools', 'audit-ignore.json'), '[]\n'); writeFileSync(join(Z, 'Admin', 'registros', 'auditoria-proceso.jsonl'), '');
x = spawnSync('node', ['tools/silenciar.mjs', 'codigo-de-prueba', 'texto-unico', '--verificado', 'se miró el documento X, línea 10, y dice lo que corresponde', '--motivo', 'está bien por la nota'], { cwd: Z, encoding: 'utf8' });
const lineaS = readFileSync(join(Z, 'Admin', 'registros', 'auditoria-proceso.jsonl'), 'utf8').trim();
caso('silenciar.mjs registra una línea con esquema que cumple', x.status === 0 && lineaS && JSON.parse(lineaS).esquema === 1 && JSON.parse(lineaS).tipo === 'silencio-de-audit' && validar('auditoria-proceso', JSON.parse(lineaS)).length === 0, (x.stdout || '') + (x.stderr || '') + lineaS);

x = spawnSync('node', ['tools/silenciar.mjs', 'codigo-de-prueba', 'texto-unico', '--verificado', 'se miró el documento X, línea 10, y dice lo que corresponde', '--motivo', 'el balance todavía no se publicó'], { cwd: Z, encoding: 'utf8' });
caso('silenciar.mjs pide --revisar cuando el motivo es «todavía no publicado»', x.status === 1 && /--revisar/.test((x.stdout || '') + (x.stderr || '')), (x.stdout || '') + (x.stderr || ''));

// ---- el recordatorio de metodología (audit.js, cada 40 commits de reglas)
const { metodologiaAtrasada } = createRequire(import.meta.url)('./audit-chequeos-5.js');
caso('metodologiaAtrasada: con un umbral bajo da los commits y la fecha de la última edición', (() => { const r = metodologiaAtrasada(1); return r && Number.isInteger(r.n) && r.n >= 1 && /^\d{4}-\d{2}-\d{2}$/.test(r.fecha); })());
caso('metodologiaAtrasada: con un umbral imposible no avisa', metodologiaAtrasada(1e9) === null);

// ---- cola --corregir-categoria: la línea de la corrección de Guido cumple el esquema
const lineaG = lineaDeRespuesta({ id: 'g1', decision: 'corregir', valor: 'broadcasting', nota: null, evidencia: 'ninguna', seguridad: 'alta', causa: 'decision-de-guido' });
caso('la corrección de categoría de Guido cumple el esquema (evidencia ninguna, causa decision-de-guido)', lineaG.errores.length === 0 && lineaG.linea.esquema === 1 && lineaG.linea.causa === 'decision-de-guido', JSON.stringify(lineaG));

// ---- ajustes-manuales y mediciones-pipeline: lo que escriben ajustes.mjs y medir-pipeline.mjs cumple su esquema, y una línea mala se rechaza
const ajusteOk = { esquema: 1, pdf: 'Clubes/X/Y/a.pdf', campo: 'cierre', valor: '2024-06-30', linea: null, motivo: 'prueba', evidencia: null, autor: 'Claude', fecha: '2026-10-25' };
caso('una línea de ajuste con esquema cumple', validar('ajustes-manuales', ajusteOk).length === 0, validar('ajustes-manuales', ajusteOk).join('; '));
caso('un ajuste de un campo desconocido, sin motivo o con una causa que no existe se rechaza', validar('ajustes-manuales', { ...ajusteOk, campo: 'inventado' }).length === 1 && validar('ajustes-manuales', { ...ajusteOk, motivo: undefined }).length === 1 && validar('ajustes-manuales', { ...ajusteOk, causa: 'porque-si' }).length === 1);
const medicionOk = { esquema: 1, fecha: '2026-10-25', base: 'abc', tools: {}, lote: { nivel: 'chico' }, medidores: [], resultado: 'idéntico' };
caso('una línea de medición con esquema cumple y sin resultado se rechaza', validar('mediciones-pipeline', medicionOk).length === 0 && validar('mediciones-pipeline', { ...medicionOk, resultado: undefined }).length === 1);

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

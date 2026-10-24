#!/usr/bin/env node
// ============================================================================
// tools/medir-pipeline.mjs — MIDE un cambio a las tools del pipeline ANTES y DESPUÉS y lo anota
// ============================================================================
//
// POR QUÉ: «no podés nunca jamás escribir algo que cambie el pipeline si no medís que no rompa algo anterior». Una regla que
// depende de que una sesión se acuerde se rompe; esto es la máquina que la cumple. El hook de commit (tools/hooks/pre-tool.mjs) rechaza un
// commit de una tool de tools/pipeline-tools.json que no tenga acá su línea.
//
// QUÉ HACE:
//   1. Toma de git qué tools de pipeline-tools.json cambiaron respecto de --base (default HEAD; con cambios sin commitear, o ya commiteados
//      si se pasa --base <commit anterior> para medir retroactivamente).
//   2. Elige los medidores (los de la tabla, por tool) y el lote: CHICO primero (humo, nunca alcanza solo); después el MEDIANO si todas las
//      tools son de alcance «etapa», o el COMPLETO si alguna es «compartida». Si el mediano muestra cualquier diferencia, escala al COMPLETO.
//      Regla de cobertura: al menos 3 documentos de cada familia (país × formato) afectada; si el lote no la cumple, sube al siguiente; si ni
//      el completo la cumple (familia sin documentos con verificación), frena y dice cuál.
//   3. Corre el ANTES con las tools en la versión de --base (se reemplazan en su lugar y se restauran siempre; el respaldo está en
//      Admin/mediciones/pipeline/_respaldo/), el DESPUÉS con lo editado, y compara. El resultado de cada corrida se guarda por una clave
//      (medidor, contenido de la lista, huella de cada tool instalada, commit): el mismo ANTES no se vuelve a correr.
//   4. Anota una línea en Admin/registros/mediciones-pipeline.jsonl: fecha, huellas, lote, medidores, resultado y dónde quedaron antes y después.
//      Una diferencia sin --explicacion «texto» no cierra («sin explicar»): el hook no la acepta. Un medidor que no imprime nada ni escribe un archivo (antes y después)
//      no midió nada: no da «idéntico» sino «vacío», que el hook tampoco acepta; solo --explicacion «por qué» lo deja pasar.
//
// SIN EFECTOS AL COSTADO: exige que data/, Generados/, Clubes/ y Admin/registros/ estén limpios; después de cada corrida revierte lo que el
// medidor haya tocado de lo trackeado (p. ej. categorias-aprendidas.jsonl) y avisa de lo nuevo sin trackear.
//
// USO (desde la raíz; el lote completo tarda unos 6 min por corrida y no llama a ninguna API; correrlo en segundo plano):
//   node tools/medir-pipeline.mjs --ensayo                  qué mediría (tools, medidores, lote, cobertura), sin correr nada
//   node tools/medir-pipeline.mjs                           mide lo editado y anota
//   node tools/medir-pipeline.mjs --explicacion "texto"     las diferencias que salgan quedan explicadas con ese texto
//   node tools/medir-pipeline.mjs --base <commit>           ANTES = las tools como estaban en ese commit (medición retroactiva)
//   node tools/medir-pipeline.mjs --tools a.mjs,b.mjs       solo esas tools (default: las cambiadas)
//   node tools/medir-pipeline.mjs --lote chico|mediano|completo   fuerza un lote (no puede ser menor que el que pide la tabla)
//   node tools/medir-pipeline.mjs --medidor cargar,audit    solo esos medidores
//   node tools/medir-pipeline.mjs --restaurar               devuelve las tools desde el respaldo si una corrida murió a la mitad
// ============================================================================
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync, copyFileSync, unlinkSync, readdirSync, rmSync, statSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { familiaDe } from './familias-docs.mjs';
import { clasificar } from './clasificar-tools.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
const T = JSON.parse(readFileSync(resolve(ROOT, 'tools/pipeline-tools.json'), 'utf8'));
const REGISTRO = resolve(ROOT, 'Admin/registros/mediciones-pipeline.jsonl');
const BASE_DIR = resolve(ROOT, 'Admin/mediciones/pipeline');
const RESPALDO = join(BASE_DIR, '_respaldo');
const NIVELES = ['chico', 'mediano', 'completo'];

const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
const gitOk = (...a) => { try { return git(...a); } catch { return null; } };
const sha1 = (s) => createHash('sha1').update(s).digest('hex');
const huellaArchivo = (rel) => (existsSync(resolve(ROOT, rel)) ? git('hash-object', rel).trim() : null);
const leerLista = (nivel) => readFileSync(resolve(ROOT, T.lotes[nivel]), 'utf8').split('\n').map((l) => l.trim().normalize('NFC')).filter((l) => l && !l.startsWith('#'));

// ---- --restaurar -----------------------------------------------------------
function restaurar() {
  if (!existsSync(RESPALDO)) return 0;
  let n = 0;
  for (const f of readdirSync(RESPALDO)) { copyFileSync(join(RESPALDO, f), resolve(ROOT, 'tools', f)); unlinkSync(join(RESPALDO, f)); n++; }
  return n;
}
if (A.includes('--restaurar')) { console.log(`Restauradas ${restaurar()} tool(s) desde el respaldo.`); process.exit(0); }
if (existsSync(RESPALDO) && readdirSync(RESPALDO).length) {
  console.error(`Quedó un respaldo de una corrida que murió a la mitad (${readdirSync(RESPALDO).join(', ')}): las tools de tools/ pueden estar en la versión vieja. Corré: node tools/medir-pipeline.mjs --restaurar`);
  process.exit(1);
}

// ---- qué cambió ------------------------------------------------------------
const base = flag('--base') || 'HEAD';
const baseRev = git('rev-parse', base).trim();
const cambiadas = flag('--tools') ? flag('--tools').split(',').map((s) => s.trim()) : [...new Set([
  ...git('diff', '--name-only', '--diff-filter=d', base, '--', 'tools').split('\n'), // sin las tools borradas: ya no existen, no hay qué medir ni clasificar
  ...git('ls-files', '--others', '--exclude-standard', '--', 'tools').split('\n'),
].filter((f) => /^tools\/[^/]+$/.test(f)).map((f) => f.slice(6)))];
// una tool de la tabla, o un módulo que una de la tabla usa (sus medidores son los de quienes lo usan): tools/clasificar-tools.mjs
const C = clasificar(ROOT);
const info = (n) => T.tools[n] || { alcance: 'compartida', medidores: C.modulos.get(n)?.medidores || [] };
const sinClasificar = cambiadas.filter((n) => /\.(mjs|js)$/.test(n) && C.clase(n) === 'sin_clasificar');
// los problemas de arranque se juntan y se dicen TODOS juntos (antes cada uno frenaba por separado y costaba un arranque por problema)
const problemas = [];
if (sinClasificar.length) problemas.push(`Tools sin clasificar: ${sinClasificar.join(', ')}. Sumalas a «tools» o a «no_pipeline» de tools/pipeline-tools.json (node tools/clasificar-tools.mjs <archivo>).`);
const sinMedidor = cambiadas.filter((n) => C.clase(n) === 'sin_medidor');
if (sinMedidor.length) console.log(`Del pipeline pero sin medidor que las ejercite (no se pueden medir todavía): ${sinMedidor.join(', ')}`);
const nombres = cambiadas.filter((n) => ['tools', 'modulo'].includes(C.clase(n)));
const modulosCambiados = nombres.filter((n) => !T.tools[n]);
if (modulosCambiados.length) console.log(`Módulos que usan tools del pipeline (se miden con los medidores de quienes los usan): ${modulosCambiados.join(', ')}`);
if (!nombres.length) { console.log('Ninguna tool del pipeline (ni módulo que usen) cambió respecto de ' + base + ': nada que medir.'); process.exit(0); }

// ---- solo comentarios ----------------------------------------------
// Si el código sin comentarios de cada tool es el de la base, no hay nada que ejercitar con un lote: la prueba es la comparación
// (tools/comparar-sin-comentarios.js --tools: mismo código contra HEAD y node --check). Una mudanza de código sí pasa por los lotes.
if (base === 'HEAD' && !A.includes('--ensayo') && !flag('--lote') && !flag('--medidor') && existsSync(resolve(ROOT, 'tools/patron.mjs')) && existsSync(resolve(ROOT, 'tools/comparar-sin-comentarios.js'))) {
  const { cambioDeCodigo } = await import('./patron.mjs');
  const dif = cambioDeCodigo(nombres, { base: baseRev });
  if (!dif.agregado.length && !dif.quitado.length) {
    const r = spawnSync('node', T.solo_comentarios?.correr || ['tools/comparar-sin-comentarios.js', '--tools'],{ cwd: ROOT, encoding: 'utf8' });
    const salida = (r.stdout || '').trim();
    console.log(`Solo comentarios en ${nombres.join(', ')}: ${salida}`);
    if (r.status !== 0) { console.error('La comparación sin comentarios falla: el cambio no es solo de comentarios o no compila.'); process.exit(1); }
    // lo que una limpieza se lleva y tiene contenido se imprime siempre (no frena): nadie tiene que acordarse de pedir `limpiar-comentarios --perdidos`
    let perdidos = '';
    if (existsSync(resolve(ROOT, 'tools/limpiar-comentarios.mjs'))) {
      perdidos = (spawnSync('node', ['tools/limpiar-comentarios.mjs', '--perdidos'], { cwd: ROOT, encoding: 'utf8' }).stdout || '').trim();
      console.log(`Comentarios con contenido que se pierden (mirá si alguno se quiere conservar; no frena):\n${perdidos.split('\n').slice(-9).join('\n')}`);
    }
    const linea = {
      fecha: new Date().toISOString().slice(0, 10), base: baseRev,
      tools: Object.fromEntries(nombres.map((n) => [n, { antes: gitOk('rev-parse', `${baseRev}:tools/${n}`)?.trim() || null, despues: huellaArchivo(`tools/${n}`) }])),
      lote: { nivel: 'solo-comentarios' }, medidores: [{ medidor: 'sin-comentarios', nivel: 'solo-comentarios', diferencias: 0, resumen: [salida, perdidos.split('\n').at(-1)].filter(Boolean) }], resultado: 'idéntico',
    };
    if (!A.includes('--no-anotar')) { appendFileSync(REGISTRO, JSON.stringify(linea) + '\n'); console.log('Resultado: idéntico. Anotado en Admin/registros/mediciones-pipeline.jsonl.'); }
    process.exit(0);
  }
}

// ---- plan ------------------------------------------------------------------
const medidoresDelPlan = [...new Set(nombres.flatMap((n) => info(n).medidores))];
const medidores = medidoresDelPlan.filter((m) => !flag('--medidor') || flag('--medidor').split(',').includes(m));
// --medidor solo ELIGE entre los de las tools cambiadas: uno que no es de ninguna se ignoraba en silencio (se creía medido con ese)
const noAplican = (flag('--medidor') || '').split(',').filter((m) => m && !medidoresDelPlan.includes(m));
if (noAplican.length) console.log(`Aviso: ${noAplican.join(', ')} no es medidor de ${nombres.join(', ')} (sus medidores: ${medidoresDelPlan.join(', ')}); no se corre. Para sumarlo, agregalo a la tool en tools/pipeline-tools.json.`);
const minimo = nombres.some((n) => info(n).alcance === 'compartida') ? 'completo' : 'mediano';
// los medidores que miden todo el sitio (audit, caja-deuda, contexto, xhtml, alta) no usan lista: con solo esos, el lote es «el sitio» y no hay cobertura que exigir
const hayLista = medidores.some((m) => T.medidores[m].usaLista);
let nivelFinal = hayLista ? (flag('--lote') || minimo) : 'chico';
if (hayLista && NIVELES.indexOf(nivelFinal) < NIVELES.indexOf(minimo)) { console.error(`--lote ${nivelFinal} es menor que el que pide la tabla (${minimo}).`); process.exit(1); }

const SOLO_CHICO = A.includes('--solo-chico'); // para probar la máquina: solo el humo, no se anota
// cobertura: familias afectadas y mínimo de documentos por familia
const completa = leerLista('completo');
const porFamilia = (docs) => docs.reduce((m, p) => { const k = familiaDe(p).clave; m.set(k, (m.get(k) || 0) + 1); return m; }, new Map());
const total = porFamilia(completa);
const filtros = nombres.map((n) => info(n).familia).filter(Boolean);
const todasConFiltro = nombres.every((n) => info(n).familia);
const afectadas = [...total.keys()].filter((k) => !todasConFiltro || filtros.some((f) => completa.some((p) => { const fa = familiaDe(p); return fa.clave === k && (!f.pais || f.pais === fa.pais) && (!f.formato || f.formato === fa.formato); })));
if (hayLista && !afectadas.length) { console.error(`Ninguna familia (país × formato) con verificación coincide con ${JSON.stringify(filtros)}: el lote no puede cubrir lo que el cambio toca. Cargá o verificá documentos de esa familia antes de medir.`); process.exit(1); }
const faltan = (nivel) => { const t = porFamilia(leerLista(nivel)); return afectadas.filter((k) => (t.get(k) || 0) < Math.min(3, total.get(k))); };
while (hayLista && faltan(nivelFinal).length && nivelFinal !== 'completo') {
  const sig = NIVELES[NIVELES.indexOf(nivelFinal) + 1];
  console.log(`El lote ${nivelFinal} no cubre (al menos 3 documentos) las familias: ${faltan(nivelFinal).join(', ')}. Sube al ${sig}.`);
  nivelFinal = sig;
}
if (SOLO_CHICO) nivelFinal = 'chico';
console.log(`Tools: ${nombres.join(', ')}\nMedidores: ${medidores.join(', ')}\n` + (hayLista ? `Lote: chico primero, hasta ${nivelFinal} (mínimo por tabla: ${minimo}); ${afectadas.length} familia(s) afectada(s) de ${total.size}.` : 'Lote: ningún medidor usa lista; miden el sitio entero.'));
if (A.includes('--ensayo')) { process.exit(0); }

// ---- candado ------------------------------------------------------
// Mientras mide, deja Admin/mediciones/pipeline/_corriendo con su pid: el hook de pre-tool rechaza editar un archivo trackeado (esta tool lo revierte) hasta que termine.
// Se suelta al salir, también por un error o Ctrl-C; si la corrida muere sin soltarlo, el hook ignora un pid que ya no existe.
const CANDADO = join(BASE_DIR, '_corriendo');
mkdirSync(BASE_DIR, { recursive: true });
writeFileSync(CANDADO, JSON.stringify({ pid: process.pid, desde: new Date().toISOString(), tools: nombres }));
process.on('exit', () => { try { rmSync(CANDADO, { force: true }); } catch { /* ya no está */ } });
for (const s of ['SIGINT', 'SIGTERM']) process.on(s, () => process.exit(130));

// ---- sin efectos al costado ------------------------------------------------
const SENSIBLE = /^(data|Generados|Clubes|js|css|Admin\/registros)\b|^index\.html/;
// lo que esta tool mueve a propósito: sus salidas, el registro y las tools que intercambia (no el resto de tools/: un medidor puede escribir ahí, p. ej. la caché de estadio-sponsor)
const propio = (p) => p.startsWith('Admin/mediciones/pipeline') || p === 'Admin/registros/mediciones-pipeline.jsonl' || nombres.some((n) => p === `tools/${n}`);
const estado = () => git('status', '--porcelain', '-uall').split('\n').filter(Boolean).filter((l) => !propio(l.slice(3).replace(/^"|"$/g, '')));
const sucios = estado().filter((l) => SENSIBLE.test(l.slice(3)));
if (sucios.length) problemas.push(`Hay cambios sin commitear en datos o registros; el antes y el después se miden sobre los mismos datos. Commitealos o descartalos primero:\n  ${sucios.join('\n  ')}`);
if (problemas.length) { console.error(problemas.join('\n\n')); process.exit(1); }
const estadoInicial = new Set(estado());
function limpiarEfectos(med) {
  const nuevos = estado().filter((l) => !estadoInicial.has(l));
  for (const l of nuevos) {
    const p = l.slice(3).replace(/^"|"$/g, '');
    if (l.startsWith('??')) { console.log(`   aviso: el medidor ${med} dejó un archivo nuevo sin trackear: ${p}`); continue; }
    git('checkout', '--', p); console.log(`   revertido lo que el medidor ${med} tocó: ${p}`);
  }
}

// ---- cambiar las tools a la versión de base y volver -------------------------
mkdirSync(RESPALDO, { recursive: true });
const huellasDespues = Object.fromEntries(nombres.map((n) => [n, huellaArchivo(`tools/${n}`)]));
const huellasAntes = Object.fromEntries(nombres.map((n) => [n, gitOk('rev-parse', `${baseRev}:tools/${n}`)?.trim() || null]));
let instaladas = false;
function instalarBase() {
  for (const n of nombres) {
    if (existsSync(resolve(ROOT, 'tools', n))) copyFileSync(resolve(ROOT, 'tools', n), join(RESPALDO, n));
    if (huellasAntes[n]) writeFileSync(resolve(ROOT, 'tools', n), git('show', `${baseRev}:tools/${n}`)); else if (existsSync(resolve(ROOT, 'tools', n))) unlinkSync(resolve(ROOT, 'tools', n));
  }
  instaladas = true;
}
function volver() {
  if (!instaladas) return;
  restaurar(); instaladas = false;
  for (const n of nombres) if (huellaArchivo(`tools/${n}`) !== huellasDespues[n]) { console.error(`¡La huella de tools/${n} no coincide tras restaurar!`); process.exitCode = 1; }
}
for (const s of ['SIGINT', 'SIGTERM']) process.on(s, () => { volver(); process.exit(130); });
process.on('exit', volver);

// ---- correr un medidor -----------------------------------------------------
// la huella de TODO tools/ (no solo las de la tabla): un medidor también lee tablas como audit-acciones.json o las que otra tool llama
const instaladasHuella = () => sha1(readdirSync(resolve(ROOT, 'tools'), { withFileTypes: true }).filter((e) => e.isFile()).map((e) => `${e.name}:${huellaArchivo(`tools/${e.name}`)}`).join(','));
function correr(m, nivel) {
  const med = T.medidores[m];
  const lista = med.usaLista ? T.lotes[nivel] : null;
  const clave = sha1(JSON.stringify([m, med.correr, lista && sha1(readFileSync(resolve(ROOT, lista), 'utf8')), instaladasHuella(), git('rev-parse', 'HEAD').trim()])).slice(0, 12);
  const dir = join(BASE_DIR, clave); const salida = join(dir, 'salida');
  if (existsSync(join(dir, 'listo'))) return { dir, salida, reutilizado: true };
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  const args = med.correr.map((a) => a.replace('{lista}', lista || '').replace('{salida}', salida));
  const t0 = Date.now();
  const r = spawnSync('node', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 30 });
  writeFileSync(join(dir, 'stdout.txt'), r.stdout || ''); writeFileSync(join(dir, 'stderr.txt'), r.stderr || '');
  limpiarEfectos(m);
  if (r.error) { console.error(`   el medidor ${m} no pudo correr: ${r.error.message}`); process.exit(1); }
  writeFileSync(join(dir, 'listo'), JSON.stringify({ estado: r.status, segundos: Math.round((Date.now() - t0) / 1000) }));
  return { dir, salida, reutilizado: false, estado: r.status };
}

// Un medidor que no imprime nada ni escribe un archivo de salida no midió nada: «idéntico» sería falso (el del xhtml midió cero archivos durante semanas con la salida vacía antes y después).
function sinContenido(r) {
  const out = readFileSync(join(r.dir, 'stdout.txt'), 'utf8').trim();
  const archivos = readdirSync(r.dir).filter((f) => !['stdout.txt', 'stderr.txt', 'listo'].includes(f) && !f.startsWith('diferencias-') && statSync(join(r.dir, f)).size > 0);
  const sinDatos = !out || (out.split('\n').length === 1 && /(^|\D)0\s+(archivos|documentos|clubes|años|ejercicios|files)\b|\b(ningún|no hay)\b/i.test(out)); // vacía, o un solo renglón que dice que no encontró nada
  return sinDatos && !archivos.length;
}
const norm = (s) => String(s).split('\n').map((l) => l.replace(/\b\d+([.,]\d+)?\s?(ms|s|seg|min)\b/g, '<t>').trimEnd()).filter(Boolean);
const cuentaLineas = (ls) => ls.reduce((m, l) => m.set(l, (m.get(l) || 0) + 1), new Map());
function difTexto(a, b) {
  const [ma, mb] = [cuentaLineas(a), cuentaLineas(b)]; const out = [];
  for (const [l, n] of ma) if ((mb.get(l) || 0) < n) out.push(`- ${l}`);
  for (const [l, n] of mb) if ((ma.get(l) || 0) < n) out.push(`+ ${l}`);
  return out;
}
function comparar(m, antes, despues) {
  const med = T.medidores[m]; let lineas = []; let n = 0; let textos = null;
  if (Array.isArray(med.comparar)) {
    const args = med.comparar.map((a) => a.replace('{antes}', antes.salida).replace('{despues}', despues.salida));
    const r = spawnSync('node', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 30 });
    const out = (r.stdout || '') + (r.stderr || ''); lineas = out.split('\n');
    const mt = out.match(new RegExp(med.difRegex)); if (!mt) { console.error(`   no pude leer la cantidad de diferencias de ${m} (${med.difRegex}):\n${out.slice(0, 400)}`); process.exit(1); }
    n = Number(mt[1]);
  } else {
    const leer = (d) => readFileSync(join(d.dir, 'stdout.txt'), 'utf8');
    let [a, b] = [leer(antes), leer(despues)];
    const [raw0, raw1] = [a, b];
    if (med.comparar === 'audit-json') {
      const f = (s) => { try { return JSON.parse(s).findings.map((x) => `${x.sev} ${x.code} ${x.msg}`).join('\n'); } catch { return s; } };
      [a, b] = [f(a), f(b)];
    }
    lineas = difTexto(norm(a), norm(b)); n = lineas.length;
    textos = [raw0, raw1];
  }
  return { n, lineas, textos };
}

// ---- resúmenes por medidor ----------------------------------------
// Un medidor con `resumir` en la tabla cuenta qué cambió en vez de volcar cientos de líneas. `atencion` es lo que SÍ pide una razón escrita por la sesión
// (un valor aceptado que cambia o se pierde; un aviso nuevo de la auditoría); lo demás (valores nuevos, avisos que desaparecen, una etiqueta distinta) queda explicado por el resumen.
const RESUMIDORES = {
  // costo de personal: la salida de --personal --medir (club año: valor · verdad …) y la de medir-personal-ensayos ($ caja-deuda --personal --club X … año personal: valor)
  'valores-personal': (lineas, [a, b]) => {
    const leer = (s) => {
      const m = new Map(); let bloque = '';
      for (const l of s.split('\n')) {
        // la línea lleva más banderas entre el club y «(salió» (--ejecutar, --partir): cada combinación es un bloque propio
        const c = l.match(/^\$ caja-deuda --personal --club (\S+)(.*)\(salió/); if (c) { bloque = c[1] + (/--partir/.test(c[2]) ? ' partir' : ''); continue; }
        if (/^\$ /.test(l)) { bloque = ''; continue; }
        let v = l.match(/^\s+(\d{4}) personal: (\S+)/);
        if (v && bloque) { m.set(`${bloque} ${v[1]}`, v[2]); continue; }
        v = l.match(/^\s+(\S+) (\d{4}): (\S+) ·/); if (v) m.set(`${v[1]} ${v[2]}`, v[3] === 'sin' ? 'null' : v[3]);
      }
      return m;
    };
    const [ma, mb] = [leer(a), leer(b)]; let iguales = 0; const cambian = []; const pierden = []; const nuevos = [];
    for (const [k, v] of ma) { const w = mb.get(k); if (v === 'null') { if (w && w !== 'null') nuevos.push(`${k}: ${w}`); } else if (w === v) iguales++; else if (!w || w === 'null') pierden.push(`${k}: ${v} → sin dato`); else cambian.push(`${k}: ${v} → ${w}`); }
    for (const [k, w] of mb) if (!ma.has(k) && w !== 'null') nuevos.push(`${k}: ${w}`);
    return { atencion: cambian.length + pierden.length, lineas: [`valores aceptados idénticos ${iguales} · que CAMBIAN ${cambian.length} · que se PIERDEN ${pierden.length} · nuevos ${nuevos.length}`, ...cambian.map((x) => `CAMBIA ${x}`), ...pierden.map((x) => `PIERDE ${x}`), ...(nuevos.length ? [`nuevos: ${nuevos.join('; ')}`] : [])] };
  },
  // auditoría: avisos por código que aparecen o desaparecen (las líneas de diferencia son «- P3 código …» y «+ P2 código …»)
  'audit-codigos': (lineas) => {
    const por = new Map();
    for (const l of lineas) { const m = l.match(/^([-+]) (P\d) (\S+)/); if (m) { const c = por.get(m[3]) || { mas: 0, menos: 0 }; if (m[1] === '+') c.mas++; else c.menos++; por.set(m[3], c); } }
    let atencion = 0; const out = [];
    // `indice-md-desfasado` no pide razón: el índice cuenta cuántas tools citan cada .md y cualquier tool nueva o mudada lo mueve; se regenera al commitear y audit.js lo avisa si no
    for (const [cod, c] of por) { const neto = c.mas - c.menos; if (neto > 0 && cod !== 'indice-md-desfasado') atencion += neto; out.push(`${cod}: ${c.menos} que se van, ${c.mas} que aparecen${neto > 0 ? ` (${neto} NUEVO${neto > 1 ? 'S' : ''})` : ''}`); }
    return { atencion, lineas: out };
  },
};

// ---- niveles ---------------------------------------------------------------
const explicacion = flag('--explicacion');
const registroMedidores = [];
const niveles = ['chico', ...NIVELES.slice(1, NIVELES.indexOf(nivelFinal) + 1)];
let nivelUsado = 'chico'; let difTotal = 0; let cortado = false; let autoN = 0; let resumenes = []; let vaciosN = 0;
for (let k = 0; k < niveles.length; k++) {
  const nivel = niveles[k]; nivelUsado = nivel; difTotal = 0; autoN = 0; vaciosN = 0; resumenes = []; registroMedidores.length = 0;
  console.log(`\n== Lote ${nivel} (${leerLista(nivel).length} documentos) ==`);
  for (const m of medidores) {
    // un medidor que no usa la lista (todo el sitio) da la misma clave en cada nivel: se reutiliza
    instalarBase(); const antes = correr(m, nivel); volver();
    const despues = correr(m, nivel);
    const { n, lineas, textos } = comparar(m, antes, despues);
    const res = n && T.medidores[m].resumir && RESUMIDORES[T.medidores[m].resumir] ? RESUMIDORES[T.medidores[m].resumir](lineas, textos || []) : null;
    // con resumen, solo lo que pide atención cuenta como diferencia sin explicar; el resto queda explicado por el resumen
    if (res && res.atencion === 0) { autoN += n; resumenes.push(`${m}: ${res.lineas.join(' · ')}`); } else difTotal += n;
    writeFileSync(join(despues.dir, `diferencias-${nivel}.txt`), lineas.join('\n'));
    const vacio = !n && sinContenido(antes) && sinContenido(despues); if (vacio) vaciosN++;
    console.log(`  ${m}: ${n ? `${n} diferencia(s)` : vacio ? 'VACÍO: no imprimió nada ni antes ni después, no midió nada' : 'idéntico'}${antes.reutilizado ? ' (antes reutilizado)' : ''}`);
    if (res) console.log(res.lineas.map((l) => '     ' + l).join('\n') + (res.atencion ? `\n     → ${res.atencion} piden razón escrita (--explicacion)` : '\n     → explicado por el resumen'));
    else if (n) console.log(lineas.slice(0, 25).map((l) => '     ' + l).join('\n'));
    registroMedidores.push({ medidor: m, nivel, diferencias: n, ...(vacio ? { vacio: true } : {}), antes: antes.dir.slice(ROOT.length + 1), despues: despues.dir.slice(ROOT.length + 1), resumen: res ? res.lineas.slice(0, 15) : lineas.filter(Boolean).slice(0, 15) });
  }
  if (nivel === 'chico' && (difTotal || vaciosN) && !explicacion) { console.log(difTotal ? '\nEl lote chico ya muestra diferencias: explicalas (--explicacion "…") o arreglá el cambio antes de seguir con lotes más grandes.' : '\nHay medidores vacíos: no midieron nada. Arreglá el medidor (qué mira, con qué argumentos) o, si de verdad no hay nada que medir, --explicacion "por qué".'); cortado = true; break; }
  if (nivel === 'mediano' && (difTotal || autoN) && !niveles.includes('completo')) { niveles.push('completo'); nivelFinal = 'completo'; console.log('El mediano mostró diferencias: escala al completo.'); }
}
const textoExplicacion = explicacion || (autoN && !difTotal ? `Explicadas por el resumen del medidor: ${resumenes.join(' | ')}` : null);
// un medidor vacío cuenta como una diferencia que pide razón escrita: sin --explicacion el resultado es «vacío» (el hook no lo acepta), con ella «N diferencias, todas explicadas»
const totalDif = difTotal + autoN + vaciosN;
const resultado = vaciosN && !explicacion ? `vacío: ${vaciosN} medidor(es) no imprimieron nada, no midieron nada` : !totalDif ? 'idéntico' : (difTotal || vaciosN ? !!explicacion : true) ? `${totalDif} diferencias, todas explicadas` : `${totalDif} diferencias sin explicar`;
const linea = {
  fecha: new Date().toISOString().slice(0, 10), base: baseRev, tools: Object.fromEntries(nombres.map((n) => [n, { antes: huellasAntes[n], despues: huellasDespues[n] }])),
  lote: { nivel: nivelUsado, lista: T.lotes[nivelUsado], listaSha: sha1(readFileSync(resolve(ROOT, T.lotes[nivelUsado]), 'utf8')).slice(0, 12), documentos: leerLista(nivelUsado).length },
  medidores: registroMedidores, resultado, ...(textoExplicacion ? { explicacion: textoExplicacion } : {}),
};
if (A.includes('--no-anotar') || SOLO_CHICO) console.log(`\nResultado: ${resultado} (no se escribió el registro).`);
else if (!cortado && nivelUsado === nivelFinal) { appendFileSync(REGISTRO, JSON.stringify(linea) + '\n'); console.log(`\nResultado: ${resultado}. Anotado en Admin/registros/mediciones-pipeline.jsonl.`); }
else console.log(`\nResultado parcial (${resultado}) en el lote ${nivelUsado}; no se anotó.`);
process.exitCode = (difTotal || vaciosN) && !explicacion ? 1 : process.exitCode || 0;

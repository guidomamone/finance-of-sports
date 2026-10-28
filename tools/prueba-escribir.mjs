#!/usr/bin/env node
// ============================================================================
// tools/prueba-escribir.mjs — PRUEBA DE REGRESIÓN DE LA ESCRITURA DE cargar.mjs (y de cargar-escribir.mjs, que es lo que cargar.mjs --escribir ejecuta):un ensayo que pasa y una escritura que revierte no tienen que volver a separarse.
//
// POR QUÉ. El ensayo de cargar.mjs (sin --escribir) no ejecuta `escribir(P)`: un identificador que no existe ahí (la nota «Informe oficial en formato XHTML» usaba `e.md` y `e` no existe en escribir(P)) pasaba todos
// los ensayos y rompía toda carga real con «REVERTIDO: e is not defined» (Goiás 2018, RAAL 2020). Esta prueba ESCRIBE de verdad, pero en un git worktree descartable en la carpeta temporal (nunca en el repo ni en
// Clubes/ reales), y falla si la escritura se revierte.
//
// QUÉ HACE. 1) crea un worktree descartable en HEAD y le copia las tools de este árbol (con lo que tengas sin commitear); 2) usa el año SønderjyskE 2024 (viene de un XHTML: la rama de la nota XHTML de la fuente):
// saca ese año del JSON del club y lo marca sin cargar en el registro de la copia, así la carga crea la fuente nueva; 3) corre `cargar.mjs <pdf> --desde-verificacion --escribir` y exige «Escrito» y la nota pública
// «Informe oficial en formato XHTML (iXBRL)» en la fuente; 4) borra el worktree. Gratis, sin API.
//
// USO:  node tools/prueba-escribir.mjs        (sale con 0 si la escritura anduvo; con 1 y el motivo si no)
//       node tools/prueba-escribir.mjs --con-api    suma bfo-rusia-notas, que llama a la API de pago (~US$ 0,12 por corrida)
// ============================================================================
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, readdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { conWorktree } from './con-worktree.mjs'; // el worktree descartable con las tools de este árbol (una prueba nueva es solo el escenario)

// Todo corre en un worktree descartable, nunca sobre datos reales: las tools que se niegan a escribir datos reales con tools sin medir (exigir-medida.mjs) o con una medición en curso (candado-medicion)
// no tienen por qué negarse acá. Sin esto la prueba fallaba apenas había una tool del pipeline cambiada y sin medir, que es justo cuando cerrar-tool la corre (antes de medir).
process.env.FOS_MIDIENDO = '1';
const PDF = 'Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.pdf';
const ID_FUENTE = 'sonderjyske-dk-aarsrapport-2024-09-30';
let ok = false;
try {
  await conWorktree(async ({ W, ROOT, principal }) => {
  mkdirSync(join(W, 'Admin', 'registros'), { recursive: true });
  const regOrigen = [join(ROOT, 'Admin/registros/transcripciones-estado.jsonl'), join(principal, 'Admin/registros/transcripciones-estado.jsonl')].find(existsSync);
  const reg = readFileSync(regOrigen, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const e = reg.find((x) => x.pdf === PDF); if (!e) throw new Error(`el registro no tiene ${PDF}`);
  e.cargado = false; if (e.estado === 'cargado') e.estado = 'extraido'; delete e.cargadoEn;
  writeFileSync(join(W, 'Admin/registros/transcripciones-estado.jsonl'), reg.map((x) => JSON.stringify(x)).join('\n') + '\n');
  const jf = join(W, 'data/dk/sonderjyske-dk.json'); const j = JSON.parse(readFileSync(jf, 'utf8'));
  j.years = j.years.filter((y) => y.fiscal_year !== 2024); j.sources = (j.sources || []).filter((s) => s.id !== ID_FUENTE);
  writeFileSync(jf, JSON.stringify(j, null, 2) + '\n');
  execFileSync('node', [join(W, 'tools/generar-data.mjs')], { cwd: W, encoding: 'utf8' });
  const r = spawnSync('node', [join(W, 'tools/cargar.mjs'), PDF, '--desde-verificacion', '--escribir'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 });
  const salida = r.stdout + r.stderr; const rev = salida.match(/REVERTIDO[^\n]*/);
  if (r.status !== 0 || rev) throw new Error(rev ? salida.slice(salida.indexOf(rev[0])).split('\n').slice(0, 12).join(' | ') :`cargar.mjs salió con ${r.status}: ${salida.trim().split('\n').slice(-3).join(' | ')}`);
  const fuentes = JSON.parse(readFileSync(jf, 'utf8')).sources || []; const fuente = fuentes.find((s) => s.id === ID_FUENTE);
  if (!fuente) throw new Error(`la carga no creó la fuente ${ID_FUENTE} (fuentes: ${fuentes.map((s) => s.id).join(', ')}; exit ${r.status}; salida: ${JSON.stringify(salida.slice(0, 600))})`);
  if (fuente.public_note !== 'Informe oficial en formato XHTML (iXBRL)') throw new Error(`la fuente nueva no trae la nota XHTML (public_note: ${fuente.public_note})`);
  // LAS DEMÁS TOOLS QUE ESCRIBEN, en el mismo worktree y sobre los datos de HEAD (idempotentes: no cambian lo cargado). Un ensayo no pasa por los imports dinámicos ni por snapshot/revertir/publicarCambios, que
  // son lo que se rompió cuando se partió cargar.mjs. Cada una tiene que salir con 0 y sin un error de código en la salida; qué se escribe lo mira la prueba de cada tool.
  // [nombre, argumentos, { idempotente }]: una tool `idempotente` sobre los datos de HEAD no puede dejar ningún JSON de club distinto de como estaba
  const IDEM = { idempotente: true };
  const ESCRIBEN = [
    ['caja-deuda --personal --escribir', ['tools/caja-deuda.mjs', '--personal', '--club', 'brighton-gb', '--escribir'], IDEM],
    ['caja-deuda --personal --partir --escribir', ['tools/caja-deuda.mjs', '--personal', '--club', 'newcastle-gb', '--partir', '--escribir'], IDEM],
    ['recategorizar-etiquetas --escribir', ['tools/recategorizar-etiquetas.mjs', '--categoria', 'grants_donations', '--escribir'], IDEM],
    ['dentro-de-otro --escribir', ['tools/dentro-de-otro.mjs', '--club', 'paok-gr', '--escribir'], IDEM],
    ['gestiones-tanda --armar --escribir', ['tools/gestiones-tanda.mjs', '--armar', '--pais', 'gr', '--escribir'], IDEM],
    ['recategorizar-linea --escribir', ['tools/recategorizar-linea.mjs', '--club', 'benfica-pt', '--anio', '2007', '--etiqueta', 'Ganhos em imobilizações', '--a', 'player_sales', '--cita', 'Clubes/Portugal/Benfica/relatorio-contas-2006-07.md:361', '--regla', 'prueba-escribir (worktree descartable)', '--mirada', '--escribir']],
    // las que salen a internet: sin red no se pueden probar y la prueba lo dice (no falla); con red tienen que salir con 0
    ['segunda-fuente-wikipedia-local --escribir', ['tools/segunda-fuente-wikipedia-local.mjs', 'gr-superleague2', '2025', '--pais', 'gr', '--escribir'], { red: true }],
    ['fetch-fx-reference', ['tools/fetch-fx-reference.mjs', '--currency', 'ARS', '--from', '2026-10-01'], { red: true }],
    ['segunda-fuente-liga --escribir', ['tools/segunda-fuente-liga.mjs', 'https://www.rsssf.org/tablesc/cyp2024.html', 'cy-seconddivision', '2024', '--pais', 'cy', '--tabla', '2023/24 Cypriot Second Division', '--escribir'], { red: true }],
    ['estadio-sponsor --escribir', ['tools/estadio-sponsor.mjs', '--escribir', '--club', 'paok-gr', '--anio', '2025'], { red: true }],
    ['reglas-categoria --escribir', ['tools/reglas-categoria.mjs', '--escribir']],
    ['reglas-pais --escribir', ['tools/reglas-pais.mjs', '--escribir'], IDEM],
    ['glosas-etiquetas --escribir', ['tools/glosas-etiquetas.mjs', '--escribir'], IDEM],
    ['ingreso-base --escribir', ['tools/ingreso-base.mjs', '--escribir'], IDEM],
    ['estimar --escribir', ['tools/estimar.mjs', '--escribir'], IDEM],
    ['imports-sin-export --escribir', ['tools/imports-sin-export.mjs', '--escribir']],
    ['fuente-url-xhtml --escribir', ['tools/fuente-url-xhtml.mjs', '--todos', '--escribir']],
    ['xhtml-aarsrapport --escribir', ['tools/xhtml-aarsrapport.mjs', 'Clubes/Dinamarca/SønderjyskE', '--escribir']],
    ['generar-correcciones', ['tools/generar-correcciones.mjs']],
    ['ajustes --agregar', ['tools/ajustes.mjs', '--agregar', PDF, 'sin-dudas', '--motivo', 'prueba-escribir (worktree descartable)', '--autor', 'prueba']],
    ['publicar', ['tools/publicar.mjs']],
    // al final y sin IDEM: sobre los datos de HEAD todavía completa líneas (no todos los ejercicios cargados tienen su tipo de línea sin desglose); si esos datos se completan, pasa a ser idempotente
    ['sin-desglose-tipo --escribir', ['tools/sin-desglose-tipo.mjs', '--escribir']],
    // el inventario de SIIS (un .md y un .json en Admin/sourcing/Colombia); la bajada de un club (json, md y pdf con Chrome) todavía no tiene escenario
    ['siis-estado --inventario --escribir', ['tools/siis-estado.mjs', '--inventario', '--escribir'], { red: true }],
  ];
  writeFileSync(join(W, PDF), ''); // los PDF no se trackean: ajustes.mjs pide que el documento exista
  const ERROR_DE_CODIGO =/is not a function|is not defined|Cannot find (module|package)|SyntaxError|does not provide an export|unsettled top-level await|REVERTIDO|TypeError|ReferenceError/;
  const antes = execFileSync('git', ['status', '--porcelain', '--', 'data'], { cwd: W, encoding: 'utf8' });
  for (const [nombre, args, opt] of ESCRIBEN) {
    const s = spawnSync('node', [join(W, args[0]), ...args.slice(1)], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 });
    const out = (s.stdout || '') + (s.stderr || '');
    if (opt && opt.red && s.status !== 0 && /fetch failed|ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ETIMEDOUT|respondió (403|429|5\d\d)/i.test(out)) { console.log(`  -- ${nombre}: sin red o la fuente no respondió, no se pudo probar`); continue; }
    if (s.status !== 0 || ERROR_DE_CODIGO.test(out)) throw new Error(`${nombre} salió con ${s.status}: ${(out.match(ERROR_DE_CODIGO) ? out.slice(Math.max(0, out.search(ERROR_DE_CODIGO) - 120), out.search(ERROR_DE_CODIGO) + 200) : out.trim().split('\n').slice(-3).join(' | ')).replace(/\n/g, ' | ')}`);
    // las idempotentes sobre los datos de HEAD no pueden dejar ningún JSON de club distinto de como estaba tras la carga de arriba
    if (opt && opt.idempotente) { const ahora = execFileSync('git', ['status', '--porcelain', '--', 'data'], { cwd: W, encoding: 'utf8' }); if (ahora !== antes) throw new Error(`${nombre} cambió datos que no tenía que cambiar:\n${ahora}`); }
    console.log(`  ok ${nombre}`);
  }
  // para comparar un año con el que HEAD tenía (claves ordenadas) y para commitear en la copia (nunca en el repo)
  const canon = (o) => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b))) : v));
  const gitW = (...a) => execFileSync('git', ['-c', 'user.email=prueba@prueba', '-c', 'user.name=prueba', ...a], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 });
  // caja-deuda --club <id> --escribir: a un año de PAOK se le saca la caja del JSON (la copia está en HEAD) y la tool tiene que volver a escribirla igual por el escalón 0 (el año anterior la valida). Es el camino de
  // `import('./cargar.mjs')` + snapshot + publicarCambios, que solo se recorre cuando hay un dato para completar: un ciclo de imports con `await` lo dejó colgado sin que ninguna prueba lo viera. Tiene tope de tiempo
  // porque lo que rompió se quedaba esperando. Lo esperado es el valor que había: si la escalera da otro, o escribe fuera del JSON de ese club, falla.
  {
    const CLUB = 'paok-gr'; const ANIO = 2025; const jf = join(W, 'data/gr/paok-gr.json'); const df = 'data/gr/paok-gr-data.js';
    const original = readFileSync(jf, 'utf8'); const j = JSON.parse(original); const y = j.years.find((x) => x.fiscal_year === ANIO);
    const esperado = y?.financial?.cash; if (esperado == null) throw new Error(`la prueba de caja-deuda --club espera ${CLUB} ${ANIO} con caja cargada`);
    y.financial.cash = null; writeFileSync(jf, JSON.stringify(j, null, 2) + '\n');
    execFileSync('node', [join(W, 'tools/generar-data.mjs')], { cwd: W, encoding: 'utf8' });
    const r = spawnSync('node', [join(W, 'tools/caja-deuda.mjs'), '--club', CLUB, '--escribir'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 240_000 });
    const out = (r.stdout || '') + (r.stderr || '');
    if (r.status !== 0 || ERROR_DE_CODIGO.test(out) || !/^Escrito:/m.test(out)) throw new Error(`caja-deuda --club ${CLUB} --escribir ${r.status == null ? 'no terminó (se colgó)' : `salió con ${r.status}`} y ${/^Escrito:/m.test(out) ? 'escribió' : 'no escribió'}: ${out.trim().split('\n').slice(-4).join(' | ')}`);
    const ahora = JSON.parse(readFileSync(jf, 'utf8')).years.find((x) => x.fiscal_year === ANIO).financial.cash;
    if (ahora !== esperado) throw new Error(`caja-deuda --club ${CLUB} --escribir escribió caja ${ahora} y se esperaba ${esperado}`);
    const enHead = JSON.parse(execFileSync('git', ['show', `HEAD:data/gr/paok-gr.json`], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 }));
    const sinSello = (o) => JSON.stringify({ ...o, exported_at: null }); // exported_at es la fecha de hoy: la regeneración la sella siempre
    if (sinSello(JSON.parse(readFileSync(jf, 'utf8'))) !== sinSello(enHead)) throw new Error(`caja-deuda --club ${CLUB} --escribir dejó el JSON de ${CLUB} distinto del de HEAD (tocó algo más que la caja)`);
    if (execFileSync('git', ['status', '--porcelain', '--', df], { cwd: W, encoding: 'utf8' }).trim()) throw new Error(`caja-deuda --club ${CLUB} --escribir dejó ${df} distinto del de HEAD`);
    console.log(`  ok caja-deuda --club ${CLUB} --escribir (la caja ${ANIO} vuelve a ser ${esperado}; el resto del JSON, igual)`);
  }
  // cargar-lote --escribir: se saca un año de SønderjyskE (2025, con su fuente) y la tool lo carga de nuevo desde su documento, lo commitea, y el año tiene que quedar IDÉNTICO al que HEAD tenía (el mismo
  // documento por el mismo camino da lo mismo; las notas y la URL que se le agregaron a mano a la fuente no son parte del año). Es la tool que escribe el sitio y hace el commit por año. Exige el árbol limpio:
  // lo que dejaron las pruebas de arriba se commitea en la copia (nunca en el repo) antes de empezar.
  {
    const PDF2 = 'Clubes/Dinamarca/SønderjyskE/aarsrapport-2025-09-30.pdf'; const ANIO2 = 2025;
    const jf = join(W, 'data/dk/sonderjyske-dk.json'); const regf = join(W, 'Admin/registros/transcripciones-estado.jsonl');
    const reg2 = readFileSync(regf, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)); const e2 = reg2.find((x) => x.pdf === PDF2); if (!e2) throw new Error(`el registro no tiene ${PDF2}`);
    e2.cargado = false; if (e2.estado === 'cargado') e2.estado = 'extraido'; delete e2.cargadoEn;
    writeFileSync(regf, reg2.map((x) => JSON.stringify(x)).join('\n') + '\n');
    const j = JSON.parse(readFileSync(jf, 'utf8')); const y = j.years.find((x) => x.fiscal_year === ANIO2); if (!y) throw new Error(`la prueba de cargar-lote espera sonderjyske-dk ${ANIO2} cargado`);
    const esperado = canon(y);
    j.years = j.years.filter((x) => x.fiscal_year !== ANIO2); j.sources = (j.sources || []).filter((s) => s.id !== y.source_id);
    writeFileSync(jf, JSON.stringify(j, null, 2) + '\n');
    execFileSync('node', [join(W, 'tools/generar-data.mjs')], { cwd: W, encoding: 'utf8' });
    writeFileSync(join(W, 'lista-lote.txt'), `${PDF2}\n`);
    gitW('add', '-A'); gitW('commit', '-qm', 'prueba-escribir: base de cargar-lote');
    const r = spawnSync('node', [join(W, 'tools/cargar-lote.mjs'), '--lista', 'lista-lote.txt', '--escribir'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 400_000 });
    const out = (r.stdout || '') + (r.stderr || '');
    if (r.status !== 0 || ERROR_DE_CODIGO.test(out) || !/escrito y commiteado/.test(out)) throw new Error(`cargar-lote --escribir ${r.status == null ? 'no terminó' : `salió con ${r.status}`} y ${/escrito y commiteado/.test(out) ? 'escribió' : 'no escribió'}: ${out.trim().split('\n').slice(-5).join(' | ')}`);
    if (!/SønderjyskE 2025/.test(gitW('log', '-1', '--format=%s'))) throw new Error('cargar-lote --escribir no dejó el commit del año');
    const ahora = JSON.parse(readFileSync(jf, 'utf8')).years.find((x) => x.fiscal_year === ANIO2);
    if (!ahora || canon(ahora) !== esperado) throw new Error(`cargar-lote --escribir cargó SønderjyskE ${ANIO2} distinto del que HEAD tenía (mismo documento, mismo camino):\n  esperado ${esperado.slice(0, 300)}\n  ahora    ${ahora ? canon(ahora).slice(0, 300) : '(sin el año)'}`);
    console.log(`  ok cargar-lote --escribir (SønderjyskE ${ANIO2} vuelve a cargarse, con su commit, idéntico al de HEAD)`);
  }
  // bfo-rusia --escribir: se saca un año de Krasnodar (2025) y la tool lo carga de nuevo desde su formulario 2 del fisco; tiene que quedar IDÉNTICO al de HEAD. Los bfo-*-datos.json no se trackean (Clubes/**/*.json):
  // se copian de la carpeta principal; si no están, la prueba lo dice y sigue. Caso que la hizo falta: el año armado por bfo-rusia no traía `baseIngreso` y la auditoría (ingreso-sin-base, P1) lo revertía.
  {
    const DIR = 'Clubes/Rusia/Krasnodar'; const ANIO3 = 2025; const jf = join(W, 'data/ru/krasnodar-ru.json');
    const origen = [ROOT, principal].find((d) => existsSync(join(d, DIR, `bfo-${ANIO3}-datos.json`)));
    if (!origen) console.log(`  -- bfo-rusia --escribir: sin ${DIR}/bfo-${ANIO3}-datos.json (no se trackea), no se pudo probar`);
    else {
      for (const f of readdirSync(join(origen, DIR)).filter((x) => /^bfo-.*-datos\.(json|md)$/.test(x))) copyFileSync(join(origen, DIR, f), join(W, DIR, f));
      const j = JSON.parse(readFileSync(jf, 'utf8')); const y = j.years.find((x) => x.fiscal_year === ANIO3); if (!y) throw new Error(`la prueba de bfo-rusia espera krasnodar-ru ${ANIO3} cargado`);
      // lo que bfo-rusia deja a propósito para pasos de después: caja y deuda (caja-deuda.mjs las completa) y un included_in vacío (no se escribe)
      const sinPosteriores = (a) => { const c = JSON.parse(JSON.stringify(a)); c.financial.cash = null; c.financial.gross_debt = null; if (c.adjustments && !Object.keys(c.adjustments.included_in || {}).length) delete c.adjustments.included_in; return canon(c); };
      const esperado = sinPosteriores(y);
      j.years = j.years.filter((x) => x.fiscal_year !== ANIO3); j.sources = (j.sources || []).filter((s) => s.id !== y.source_id);
      writeFileSync(jf, JSON.stringify(j, null, 2) + '\n');
      execFileSync('node', [join(W, 'tools/generar-data.mjs')], { cwd: W, encoding: 'utf8' });
      gitW('add', '-A'); gitW('commit', '-qm', 'prueba-escribir: base de bfo-rusia', '--allow-empty');
      const r = spawnSync('node', [join(W, 'tools/bfo-rusia.mjs'), '--club', 'Krasnodar', '--escribir'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 400_000 });
      const out = (r.stdout || '') + (r.stderr || '');
      if (r.status !== 0 || ERROR_DE_CODIGO.test(out) || !/Escritos y commiteados: [1-9]/.test(out)) throw new Error(`bfo-rusia --escribir ${r.status == null ? 'no terminó' : `salió con ${r.status}`} y no escribió el año: ${out.trim().split('\n').filter((l) => /NO escrito|P0|P1|Escritos/.test(l)).slice(-3).join(' | ') || out.trim().split('\n').slice(-3).join(' | ')}`);
      const ahora = JSON.parse(readFileSync(jf, 'utf8')).years.find((x) => x.fiscal_year === ANIO3);
      if (!ahora || sinPosteriores(ahora) !== esperado) throw new Error(`bfo-rusia --escribir cargó Krasnodar ${ANIO3} distinto del que HEAD tenía:\n  esperado ${esperado.slice(0, 300)}\n  ahora    ${ahora ? sinPosteriores(ahora).slice(0, 300) : '(sin el año)'}`);
      console.log(`  ok bfo-rusia --escribir (Krasnodar ${ANIO3} vuelve a cargarse, idéntico al de HEAD)`);
    }
  }
  // bfo-rusia-notas --ejecutar: lee con la API de pago (Claude) las tablas de la nota explicativa y las valida contra el formulario 2 del fisco. Cuesta ~US$ 0,12 por corrida, así que SOLO con `--con-api`
  // (la prueba de siempre, la de `fos probar` y la de cerrar-tool, no gasta). Se rehace la extracción de Krasnodar 2025 y las tablas tienen que pasar la compuerta como las que HEAD ya tiene (misma suma).
  if (!process.argv.includes('--con-api')) console.log('  -- bfo-rusia-notas --ejecutar: gasta ~US$ 0,12 de API; se prueba con `node tools/prueba-escribir.mjs --con-api` (después de tocar bfo-rusia-notas.mjs o claude-llamada.mjs)');
  else {
    const DIR = 'Clubes/Rusia/Krasnodar'; const NOTA = `${DIR}/2025-poyasneniya.md`;
    const clave = [join(ROOT, 'Admin/api-keys/claude-api.env'), join(principal, 'Admin/api-keys/claude-api.env')].find(existsSync);
    const origen = [ROOT, principal].find((d) => existsSync(join(d, DIR, 'bfo-2025-datos.json')));
    if (!clave || !origen) console.log(`  -- bfo-rusia-notas --ejecutar: falta ${!clave ? 'Admin/api-keys/claude-api.env' : `${DIR}/bfo-2025-datos.json`} (no se trackean), no se pudo probar`);
    else {
      for (const f of readdirSync(join(origen, DIR)).filter((x) => /^bfo-.*-datos\.(json|md)$/.test(x))) copyFileSync(join(origen, DIR, f), join(W, DIR, f));
      mkdirSync(join(W, 'Admin/api-keys'), { recursive: true }); copyFileSync(clave, join(W, 'Admin/api-keys/claude-api.env')); // la copia se borra con el worktree
      const { derivado } = await import(join(W, 'tools/rutas.mjs')); const salida = join(W, derivado(NOTA, '.bfo-notas.json'));
      const resumen = (f) => Object.fromEntries((JSON.parse(readFileSync(f, 'utf8')).tablas || []).map((t) => [t.tipo, { pasa: t.pasa, suma: t.columnas.map((_, k) => Math.round(t.filas.reduce((a, x) => a + Math.abs(Number(x.valores?.[k] || 0)), 0))) }]));
      const esperado = resumen(salida);
      const r = spawnSync('node', [join(W, 'tools/bfo-rusia-notas.mjs'), '--club', 'Krasnodar', '--ejecutar', '--rehacer'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 400_000 });
      const out = (r.stdout || '') + (r.stderr || ''); const gasto = Number((out.match(/Gastado: US\$ (\d+(?:\.\d+)?)/) || [])[1]);
      if (r.status !== 0 || ERROR_DE_CODIGO.test(out) || !(gasto > 0)) throw new Error(`bfo-rusia-notas --ejecutar ${r.status == null ? 'no terminó' : `salió con ${r.status}`} y gastó ${gasto || 0}: ${out.trim().split('\n').slice(-4).join(' | ')}`);
      if (gasto > 1) throw new Error(`bfo-rusia-notas --ejecutar gastó US$ ${gasto}: una nota cuesta ~0,12; algo cambió`);
      const ahora = resumen(salida);
      for (const [tipo, e] of Object.entries(esperado)) {
        const a = ahora[tipo]; if (!a) throw new Error(`bfo-rusia-notas --ejecutar ya no trae la tabla ${tipo}`);
        for (const y of Object.keys(e.pasa)) if (e.pasa[y] && (!a.pasa[y] || JSON.stringify(a.suma) !== JSON.stringify(e.suma))) throw new Error(`bfo-rusia-notas --ejecutar: la tabla ${tipo} ${y} ya no pasa la compuerta o cambió de suma (esperado ${JSON.stringify(e)}, ahora ${JSON.stringify(a)})`);
      }
      console.log(`  ok bfo-rusia-notas --ejecutar (Krasnodar 2025: ${Object.keys(ahora).length} tablas, las que pasaban siguen pasando con la misma suma; gastó US$ ${gasto})`);
    }
  }
  // siis-estado --club --escribir: baja de SIIS (red) los estados de un año de Tolima, imprime el PDF con Chrome, escribe el json, el md y las filas (armar-a-mano) y tiene que dar lo mismo que HEAD tiene. Es el motor
  // de siis-api, determinista (y de paso ejercita armar-a-mano.mjs --escribir, que siis-estado llama para armar las filas): solo cambian las fechas de la consulta y el hash del md que las contiene (se normalizan). Sin red o sin que SIIS responda, la prueba lo dice y sigue.
  {
    const CLUB = 'Clubes/Colombia/Deportes Tolima'; const GEN = 'Generados/Colombia/Deportes Tolima';
    const r = spawnSync('node', [join(W, 'tools/siis-estado.mjs'), '--club', 'Deportes Tolima', '--anio', '2025', '--escribir', '--rehacer'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 400_000 });
    const out = (r.stdout || '') + (r.stderr || '');
    if (r.status !== 0 && /fetch failed|ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ETIMEDOUT|respondió (403|429|5\d\d)/i.test(out)) console.log('  -- siis-estado --club --escribir: sin red o SIIS no respondió, no se pudo probar');
    else {
      if (r.status !== 0 || ERROR_DE_CODIGO.test(out) || !/Escritos 1 año/.test(out)) throw new Error(`siis-estado --club --escribir ${r.status == null ? 'no terminó' : `salió con ${r.status}`} y no escribió el año: ${out.trim().split('\n').slice(-4).join(' | ')}`);
      const norm = (txt) => txt.replace(/\d{4}-\d{2}-\d{2}(T[\d:.]+Z)?/g, 'FECHA').replace(/"mdSha1": "[0-9a-f]+"/g, '"mdSha1": "HASH"');
      for (const f of ['siis-estado-2025.json', 'siis-estado-2025.md', 'siis-estado-2025.pdf']) if (!existsSync(join(W, CLUB, f)) || !readFileSync(join(W, CLUB, f)).length) throw new Error(`siis-estado --club --escribir no dejó ${CLUB}/${f}`);
      for (const f of [`${CLUB}/siis-estado-2025.md`, `${GEN}/siis-estado-2025.filas.json`, `${GEN}/siis-estado-2025.ubicacion.json`]) { // los que HEAD trackea
        const enHead = execFileSync('git', ['show', `HEAD:${f}`], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 });
        if (norm(readFileSync(join(W, f), 'utf8')) !== norm(enHead)) throw new Error(`siis-estado --club --escribir dejó ${f} distinto del de HEAD (más que las fechas)`);
      }
      const delJson = [ROOT, principal].map((d) => join(d, CLUB, 'siis-estado-2025.json')).find(existsSync); // el json no se trackea: se compara con el de la carpeta principal si está
      if (delJson && norm(readFileSync(delJson, 'utf8')) !== norm(readFileSync(join(W, CLUB, 'siis-estado-2025.json'), 'utf8'))) throw new Error('siis-estado --club --escribir dejó un siis-estado-2025.json distinto del de la carpeta principal (más que las fechas)');
      console.log('  ok siis-estado --club --escribir (Tolima 2025: json, md, pdf y filas, iguales a los de HEAD salvo la fecha)');
    }
  }
  // texto-propio-a-md --paginas N --escribir: rearma una página del .md con el texto propio del PDF (SønderjyskE 2024 es de texto nativo; los PDF no se trackean: se copia el de la carpeta principal). Reescribe una transcripción
  // ya cargada, así que lo que se comprueba es la red de seguridad: el .md anterior tiene que quedar guardado IDÉNTICO en Generados/…antes-texto-propio.md, y el nuevo no puede quedar vacío ni encogido.
  {
    const PDF3 = 'Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.pdf'; const MD3 = PDF3.replace(/\.pdf$/, '.md'); const BAK = MD3.replace(/^Clubes\//, 'Generados/').replace(/\.md$/, '.antes-texto-propio.md');
    const origen = [ROOT, principal].find((d) => existsSync(join(d, PDF3)));
    if (!origen) console.log(`  -- texto-propio-a-md --escribir: sin ${PDF3} (no se trackea), no se pudo probar`);
    else {
      copyFileSync(join(origen, PDF3), join(W, PDF3));
      const antes = readFileSync(join(W, MD3), 'utf8');
      const r = spawnSync('node', [join(W, 'tools/texto-propio-a-md.mjs'), PDF3, '--paginas', '8', '--escribir'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 200_000 });
      const out = (r.stdout || '') + (r.stderr || '');
      if (r.status !== 0 || ERROR_DE_CODIGO.test(out) || !/págs\. 8 rearmadas/.test(out)) throw new Error(`texto-propio-a-md --escribir ${r.status == null ? 'no terminó' : `salió con ${r.status}`} y no rearmó la página: ${out.trim().split('\n').slice(-3).join(' | ')}`);
      if (!existsSync(join(W, BAK)) || readFileSync(join(W, BAK), 'utf8') !== antes) throw new Error(`texto-propio-a-md --escribir no dejó el .md anterior idéntico en ${BAK} (sin eso no hay vuelta atrás)`);
      const ahora = readFileSync(join(W, MD3), 'utf8');
      if (ahora === antes) throw new Error('texto-propio-a-md --escribir dijo que rearmó la página 8 y el .md quedó igual');
      if (ahora.length < antes.length * 0.8) throw new Error(`texto-propio-a-md --escribir dejó el .md mucho más corto (${antes.length} → ${ahora.length} caracteres)`);
      console.log(`  ok texto-propio-a-md --escribir (la página 8 se rearma, el .md anterior queda guardado idéntico; ${antes.length} → ${ahora.length} caracteres)`);
    }
  }
  // catalogo-liga --escribir: se saca la línea de cy-seconddivision de data/leagues.js de la copia, se agrega en la copia la aprobación de la Auditora que la tool exige (auditoria-proceso.jsonl) y la tool, que lee Wikipedia
  // (red), tiene que volver a escribir EXACTAMENTE la misma línea. Sin red lo dice y sigue.
  {
    const LF = join(W, 'data/leagues.js'); const AF = join(W, 'Admin/registros/auditoria-proceso.jsonl'); const ID = 'cy-seconddivision';
    const txt = readFileSync(LF, 'utf8'); const fila = txt.split('\n').find((l) => l.includes(`'${ID}'`)); if (!fila) throw new Error(`la prueba de catalogo-liga espera ${ID} en data/leagues.js`);
    writeFileSync(LF, txt.split('\n').filter((l) => !l.includes(`'${ID}'`)).join('\n'));
    writeFileSync(AF, readFileSync(AF, 'utf8').replace(/\n*$/, '\n') + JSON.stringify({ sesion: 'auditora-prueba', fecha: '2026-10-27', veredicto: 'APROBADO', cambio: `${ID} (prueba-escribir, worktree descartable)` }) + '\n');
    const ref = readFileSync(AF, 'utf8').split('\n').filter(Boolean).length;
    const lanzar = () => spawnSync('node', [join(W, 'tools/catalogo-liga.mjs'), '--liga', ID, '--pagina', '2023–24 Cypriot Second Division', '--tier', '2', '--pais', 'CY', '--escribir', '--full', 'Second Division de Chipre', '--name', 'Second Division', '--aprobado-ref', String(ref)], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 120_000 });
    let r = lanzar(); for (let intento = 1; intento < 3 && r.status === 1 && /preguntas sin responder|faltan deporte o escalón/.test(`${r.stdout}${r.stderr}`); intento++) r = lanzar(); // la propuesta sale de Wikipedia: si vuelve incompleta se repite (hasta 3 intentos; cuando frena no escribe nada)
    const out = (r.stdout || '') + (r.stderr || '');
    if (r.status !== 0 && /fetch failed|ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ETIMEDOUT|respondió (403|429|5\d\d)/i.test(out)) console.log('  -- catalogo-liga --escribir: sin red o Wikipedia no respondió, no se pudo probar');
    else {
      if (r.status !== 0 || ERROR_DE_CODIGO.test(out) || !/Escrito en data\/leagues\.js/.test(out)) throw new Error(`catalogo-liga --escribir ${r.status == null ? 'no terminó' : `salió con ${r.status}`} y no escribió: ${out.trim().split('\n').slice(-4).join(' | ')}`);
      const ahora = readFileSync(LF, 'utf8').split('\n').find((l) => l.includes(`'${ID}'`));
      if (ahora?.trim() !== fila.trim()) throw new Error(`catalogo-liga --escribir escribió otra línea para ${ID}:\n  esperada ${fila.trim()}\n  ahora    ${ahora?.trim()}`);
      console.log(`  ok catalogo-liga --escribir (la línea de ${ID} vuelve a ser la misma)`);
    }
  }
  // alta-club --escribir: se saca un club chico (Bath Rugby) de data/clubs.js de la copia y la tool lo da de alta otra vez desde su documento; la fila vuelve a estar
  const MD_ALTA = 'Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2020-21.md'; const CLUBS = join(W, 'data/clubs.js');
  const filaDe = (txt) => txt.split('\n').find((l) => l.includes("'bathrugby-gb':"));
  const clubsAntes = readFileSync(CLUBS, 'utf8'); if (!filaDe(clubsAntes)) throw new Error('la prueba de alta-club espera que data/clubs.js tenga bathrugby-gb');
  writeFileSync(CLUBS, clubsAntes.split('\n').filter((l) => !l.includes("'bathrugby-gb':")).join('\n'));
  // «club nuevo» para la regla de existencia (tools/carpetas-clubes.mjs): sin datos del club ni su evidencia
  for (const f of ['data/gb/bathrugby-gb.json', 'data/gb/bathrugby-gb-data.js', 'data/gb/bathrugby-gb-glosas.js', 'Admin/carga-clubes/bathrugby-gb.md']) rmSync(join(W, f), { force: true });
  // las líneas de la auditoría de los balances de ese club (la verificación de después las compara con lo cargado, y no hay nada cargado)
  const AUD = join(W, 'Admin/registros/auditoria.jsonl');
  writeFileSync(AUD, readFileSync(AUD, 'utf8').split('\n').filter((l) => !l.includes('bathrugby-gb')).join('\n'));
  const alta = spawnSync('node', [join(W, 'tools/alta-club.mjs'), MD_ALTA, '--escribir'], { cwd: W, encoding: 'utf8', maxBuffer: 1 << 28 });
  const salidaAlta = (alta.stdout || '') + (alta.stderr || '');
  if (alta.status !== 0 || ERROR_DE_CODIGO.test(salidaAlta)) throw new Error(`alta-club --escribir salió con ${alta.status}: ${(salidaAlta.match(ERROR_DE_CODIGO) ? salidaAlta.slice(Math.max(0, salidaAlta.search(ERROR_DE_CODIGO) - 120), salidaAlta.search(ERROR_DE_CODIGO) + 200) : salidaAlta.trim().split('\n').filter((l) => /error|falta|pendiente|✗|no se escribe/i.test(l)).slice(0, 12).join(' | ')).replace(/\n/g, ' | ')}`);
  if (!filaDe(readFileSync(CLUBS, 'utf8'))) throw new Error(`alta-club --escribir salió con 0 pero no volvió a escribir la fila de bathrugby-gb en data/clubs.js: ${salidaAlta.trim().split('\n').slice(-3).join(' | ')}`);
  console.log('  ok alta-club --escribir (la fila del club vuelve a estar)');
  ok = true; console.log(`prueba-escribir: la escritura de cargar.mjs anduvo (fuente nueva con su nota XHTML) y la de ${ESCRIBEN.length} tools más, en un worktree descartable.`);
  }, 'prueba-escribir');
} catch (err) {
  console.error(`prueba-escribir: FALLÓ: ${err.message}`);
}
process.exit(ok ? 0 : 1);

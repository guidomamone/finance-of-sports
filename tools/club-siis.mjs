#!/usr/bin/env node
// ============================================================================
// tools/club-siis.mjs — el camino de un club colombiano que deposita en SIIS, en orden: qué está hecho de cada año, qué falta, el comando de cada paso y los subagentes que hay que lanzar.
//
// POR QUÉ. Cargar un club desde SIIS eran ~10 pasos a mano en distintas tools (alta, estados de SIIS, lote, cola, liga, contexto, carga, publicar, auditor) y nada decía en cuál se estaba. Esto es como `cerrar-tool`
// para un club: solo LEE (no escribe nada, no llama a ninguna API) y dice el estado y lo que sigue. Los comandos los corre la sesión, uno por vez; los que gastan API dicen cuánto.
//
// USO:
//   node tools/club-siis.mjs "<Club>"                       estado por año, lo que falta en orden, comandos y subagentes
//   node tools/club-siis.mjs "<Club>" --rehacer-anio AAAA   la cadena para rehacer un año YA publicado (el lote lo saltea a propósito); los datos solo se escriben con las tools medidas
//   node tools/club-siis.mjs "<Club>" --crear-lista         además crea la lista de lote (Admin/lotes/lote-NN.txt) con los siis-estado-AAAA.pdf que todavía no están cargados
//   node tools/club-siis.mjs "<Club>" --evaluar            ¿vale la pena? CARGAR / REVISAR / DESCARTAR con el motivo (solo lee). Solo se descarta la sociedad sin actividad (ingresos 0 todos los años); la liga no descarta (se cargan amateurs); ingresos chicos (< 500 M al año) se revisan
//   node tools/club-siis.mjs "<Club>" --avanzar [--ejecutar [--cargar]]   corre los pasos mecánicos en orden (estados de SIIS, alta, dictámenes, «Costo de ventas» > 50 %, lista, inventario) y para en lo que pide juicio; --ejecutar corre el lote (API, ~US$ 0,03 por documento); --cargar además carga y publica si no falta nada de juicio
//   node tools/club-siis.mjs "<Club>" --brief <estadio-sponsor|gestiones|auditor>   el brief de ese subagente con el club y los años ya completos (plantilla: Admin/briefs-subagentes-siis.md)
// LOS SUBAGENTES VAN JUNTOS: estadio-sponsor y gestiones son independientes entre sí y del lote (escriben cada uno un archivo suyo): se lanzan a la vez, en UN solo mensaje con varias llamadas a Agent, apenas están el alta y los estados. El lote
// puede correr en ensayo mientras tanto; su `--cargar` exige `data/` limpio, así que espera a que terminen y se commitee lo suyo. El del auditor va después de la carga.
//   node tools/club-siis.mjs                                 los clubes de tools/siis-clubes.json con lo que les falta, una línea cada uno
// ============================================================================
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pendientes } from './cola.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
const club = A.find((a, i) => !a.startsWith('--') && !['--rehacer-anio', '--brief'].includes(A[i - 1]));
const leer = (rel) => { try { return JSON.parse(readFileSync(join(ROOT, rel), 'utf8')); } catch { return null; } };
const cfg = leer('tools/siis-clubes.json'); const resumen = leer(`Admin/sourcing/${cfg.pais}/siis-resumen.json`);
const iso = 'co';

// ¿Wikipedia ya trae estadio y sponsor de ese año? (el ensayo de estadio-sponsor.mjs, sin escribir): entonces no hace falta el subagente ni una entrada en contexto-manual.json
function wikipediaCubre(clubId, a, liga) {
  if (!liga) return false;
  try { const out = execFileSync('node', [join(ROOT, 'tools/estadio-sponsor.mjs'), '--ensayo', '--club', clubId, '--anio', a, '--liga', liga, '--cierre', '12-31'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); return /estadio \d+ \(100%\)/.test(out) && /sponsor \d+ \(100%\)/.test(out); } catch { return false; }
}
// La liga de cada año, del roster cacheado de Wikipedia (lookup-club-league.js), SOLO donde el nombre de la lista es exactamente el del club: una coincidencia «NO EXACTA» (Fortaleza) puede ser otro club y la confirma una persona.
function ligasExactas(nombre, anios) {
  let out = ''; try { out = execFileSync('node', [join(ROOT, 'tools/lookup-club-league.js'), nombre, '--pais', 'CO'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return {}; }
  const m = {}; for (const l of out.split('\n')) { const x = l.match(/^(co-\w+) (\d{4}): /); if (x && anios.includes(x[2]) && !/NO EXACTA/.test(l)) m[x[2]] = x[1]; }
  return m;
}
// Suma esos años a data/club-leagues/co.js (la entrada del club si existe, o una nueva).
function escribirLigas(clubId, mapa) {
  const ruta = join(ROOT, 'data/club-leagues/co.js'); const t = readFileSync(ruta, 'utf8'); const par = Object.entries(mapa).sort().map(([a, l]) => `${a}: '${l}'`).join(', ');
  const re = new RegExp(`('${clubId}':\\s*\\{\\s*)`);
  writeFileSync(ruta, re.test(t) ? t.replace(re, `$1${par}, `) : t.replace(/\n\}\);\s*$/, `\n  '${clubId}': { ${par} },\n});\n`));
}
function estadoDe(carpeta) {
  const c = cfg.clubes[carpeta]; if (!c) return { error: `«${carpeta}» no está en tools/siis-clubes.json (se suma con su NIT)` };
  const dir = join(ROOT, 'Clubes', cfg.pais, carpeta); const gen = join(ROOT, 'Generados', cfg.pais, carpeta);
  const anios = Object.entries(resumen?.nits?.[c.nit]?.anios || {}).filter(([a, d]) => d.estado && !(c.frenados || []).includes(a)).map(([a]) => a).sort();
  const json = c.clubId ? leer(`data/${iso}/${c.clubId}.json`) : null;
  const cargados = new Set((json?.years || []).map((y) => String(y.fiscal_year)));
  const ligas = c.clubId ? [...(readFileSync(join(ROOT, `data/club-leagues/${iso}.js`), 'utf8').match(new RegExp(`'${c.clubId}':\\s*\\{([^}]*)\\}`)) || [, ''])[1].matchAll(/(\d{4}):/g)].map((m) => m[1]) : [];
  const ligaDe = c.clubId ? Object.fromEntries([...(readFileSync(join(ROOT, `data/club-leagues/${iso}.js`), 'utf8').match(new RegExp(`'${c.clubId}':\\s*\\{([^}]*)\\}`)) || [, ''])[1].matchAll(/(\d{4}):\s*'([^']+)'/g)].map((m) => [m[1], m[2]])) : {};
  const ctx = (c.clubId && leer('tools/contexto-manual.json')?.[c.clubId]) || {};
  const aud = existsSync(join(ROOT, 'Admin/registros/auditoria.jsonl')) && c.clubId ? new Set(readFileSync(join(ROOT, 'Admin/registros/auditoria.jsonl'), 'utf8').split('\n').filter((l) => l.includes(`"${c.clubId}"`)).map((l) => { try { return String(JSON.parse(l).anio); } catch { return null; } })) : new Set();
  const cola = pendientes().filter((p) => p.pdf.startsWith(`Clubes/${cfg.pais}/${carpeta}/`));
  const filas = anios.map((a) => {
    const md = join(dir, `siis-estado-${a}.md`); const ver = leer(`Generados/${cfg.pais}/${carpeta}/siis-estado-${a}.verificacion.json`);
    const texto = existsSync(md) ? readFileSync(md, 'utf8') : '';
    return {
      a, siis: existsSync(md), notas: !existsSync(md) ? '-' : existsSync(join(dir, `estados-financieros-${a}.md`)) ? (/## Detalle de las notas del club/.test(texto) ? 'abre' : 'no abre') : 'sin notas',
      verif: ver?.estado === 'ok' && existsSync(join(gen, `siis-estado-${a}.categorias.json`)), cola: cola.filter((p) => p.pdf.endsWith(`siis-estado-${a}.pdf`)).length,
      liga: ligas.includes(a), ctx: !!ctx[a] || (!cargados.has(a) && ligas.includes(a) && wikipediaCubre(c.clubId, a, ligaDe[a])), cargado: cargados.has(a), aud: aud.has(a), dictamen: existsSync(join(dir, `dictamen-revisor-fiscal-${a}.md`)),
    };
  });
  return { carpeta, c, dir, filas, cola };
}
const cmd = (s) => `    ${s}`;

if (!club) {
  // una línea por club, con el veredicto de --evaluar (solo para los que tienen años por cargar), de menos a más años por cargar: arranca por el que menos le falta
  const filasLista = [];
  for (const k of Object.keys(cfg.clubes)) {
    const e = estadoDe(k); if (e.error || !e.filas.length) continue; const f = e.filas; const hechos = f.filter((x) => x.cargado).length; const faltan = f.length - hechos;
    let ver = '';
    if (faltan) { try { ver = ` · ${(execFileSync('node', [join(ROOT, 'tools/club-siis.mjs'), k, '--evaluar'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).match(/· (CARGAR|REVISAR|DESCARTAR)/) || [, '?'])[1]}`; } catch { ver = ' · ?'; } }
    filasLista.push({ faltan, txt: `${k.padEnd(26)} ${hechos}/${f.length} años cargados${e.c.clubId ? '' : ' · sin alta'}${ver}${f.some((x) => x.cola) ? ` · ${f.reduce((n, x) => n + x.cola, 0)} en la cola` : ''}` });
  }
  for (const l of filasLista.sort((a, b) => (a.faltan === 0) - (b.faltan === 0) || a.faltan - b.faltan)) console.log(l.txt);
  process.exit(0);
}
const e = estadoDe(club); if (e.error) { console.error(e.error); process.exit(1); }
const { c, filas } = e; const q = JSON.stringify(club);

if (flag('--rehacer-anio')) {
  const a = flag('--rehacer-anio'); const pdf = `Clubes/${cfg.pais}/${club}/siis-estado-${a}.pdf`;
  console.log(`Rehacer ${club} ${a} (año ya publicado; el lote lo saltea a propósito). Una lista con ${pdf}, y en este orden:\n  Las tools que escriben (siis-estado y cargar) se niegan si hay tools del pipeline cambiadas sin medir: node tools/fos.mjs que-pide.`);
  [`node tools/siis-estado.mjs --club ${q} --anio ${a} --rehacer --escribir      (estado de SIIS con las notas que abren; gratis)`,
    `node tools/verificar.mjs --lista <lista> --rubros                            (gratis)`, `node tools/jev-categorizar.mjs --listos --lista <lista>                    (centavos)`, `node tools/categorizar-claude.mjs --listos --lista <lista>                (centavos)`,
    `node tools/cola.mjs                                                          (contestar lo que quede: regla de Colombia en CONVENCIONES-DATOS.md)`, `node tools/cargar.mjs "${pdf}" --desde-verificacion --reemplazar --escribir`, `node tools/publicar.mjs   y un commit con el trailer «Corrige:»`].forEach((s, i) => console.log(`${i + 1}. ${s}`));
  process.exit(0);
}

const primerMd = filas.find((f) => f.siis); const sociedad = (primerMd ? (readFileSync(join(e.dir, `siis-estado-${primerMd.a}.md`), 'utf8').match(/^# (.+?) — NIT/m) || [, club])[1] : club);
const conGestion = !!c.clubId && new RegExp(`'${c.clubId}'\\s*:`).test(readFileSync(join(ROOT, `data/gestiones/${iso}.js`), 'utf8'));
const sinAnioCtx = filas.filter((f) => !f.ctx && !f.cargado).map((f) => f.a);
const dictSinMd = readdirSync(e.dir).filter((x) => /^dictamen-revisor-fiscal-\d{4}\.pdf$/.test(x) && !existsSync(join(e.dir, x.replace(/\.pdf$/, '.md')))).map((x) => x.match(/\d{4}/)[0]);
const BRIEFS = { 'estadio-sponsor': { anios: sinAnioCtx, hace: 'estadio y sponsor' }, gestiones: { anios: filas.map((f) => f.a), hace: 'quién condujo el club' }, auditor: { anios: filas.filter((f) => f.cargado && !f.aud && f.dictamen).map((f) => f.a), hace: 'la línea del auditor' } };
if (flag('--brief')) {
  const k = flag('--brief'); const b = BRIEFS[k]; if (!b) { console.error(`--brief: ${Object.keys(BRIEFS).join(' | ')}`); process.exit(1); }
  const plantilla = readFileSync(join(ROOT, 'Admin/briefs-subagentes-siis.md'), 'utf8'); const i = plantilla.indexOf(`## BRIEF ${k}`);
  if (i < 0) { console.error(`Sin plantilla «${k}» en Admin/briefs-subagentes-siis.md`); process.exit(1); }
  const resto = plantilla.slice(i).split('\n').slice(1).join('\n'); const cuerpo = resto.split(/\n## BRIEF /)[0].trim();
  console.log(cuerpo.replaceAll('{{CLUB}}', club).replaceAll('{{CLUBID}}', c.clubId || '<clubId>').replaceAll('{{SOCIEDAD}}', sociedad).replaceAll('{{CARPETA}}', `Clubes/${cfg.pais}/${club}`).replaceAll('{{ANIOS}}', b.anios.join(', ')));
  process.exit(0);
}

// ---- ¿vale la pena? (--evaluar y el primer paso de --avanzar): solo lee Admin/sourcing/<País>/siis-resumen.json y los siis-estado-AAAA.md que ya haya; sin red.
// Criterio (Guido, 2026-10-26): NO se descarta por no estar en una liga profesional (se cargan clubes amateurs, como los de Bélgica); solo una sociedad sin actividad (ingresos 0 en todos los años).
const UMBRAL_CHICO = 500000; // miles de pesos por año = 500 M: por debajo en todos los años, el club se revisa antes de cargar
const miles = (n) => `${Math.round(n / 1000).toLocaleString('es-AR')} M`;
function evaluar() {
  const r = resumen?.nits?.[c.nit]?.anios || {}; const anios = Object.entries(r).filter(([, d]) => d.estado).map(([a, d]) => ({ a, ing: d.ingresos || 0, ut: d.utilidades || 0 })).sort((x, y) => x.a - y.a);
  const motivos = []; let veredicto = 'CARGAR';
  const max = Math.max(0, ...anios.map((x) => x.ing)); const sinIng = anios.filter((x) => !x.ing).map((x) => x.a);
  if (!anios.length) { veredicto = 'DESCARTAR'; motivos.push('SIIS no tiene estado de resultados de ningún año'); }
  else if (!max) { veredicto = 'DESCARTAR'; motivos.push('ingresos 0 en todos los años: sociedad sin actividad (Real Sincelejo 2017)'); }
  else if (max < UMBRAL_CHICO) { veredicto = 'REVISAR'; motivos.push(`ingresos chicos todos los años (el máximo, ${miles(max)}; el umbral, ${miles(UMBRAL_CHICO)}): ¿es un club o una sociedad con otra actividad? Si es de otro deporte, punto 464`); }
  if (sinIng.length && max) motivos.push(`años con ingresos 0 (${sinIng.join(', ')}): se cargan igual, mirar si es inactividad`);
  let ligas = []; try { ligas = [...execFileSync('node', [join(ROOT, 'tools/lookup-club-league.js'), club, '--pais', 'CO'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).matchAll(/^(co-\w+) (\d{4}):/gm)].map((x) => `${x[2]} ${x[1]}`); } catch { /* sin caché */ }
  const pesos = filas.filter((f) => f.siis).map((f) => ({ a: f.a, ...pesoCosto(f.a) })).filter((p) => p.pct);
  return { anios, veredicto, motivos, ligas, pesos };
}
function pesoCosto(a) { // peso de «Costo de ventas» en los gastos del año, del siis-estado-AAAA.md ya bajado
  const md = join(e.dir, `siis-estado-${a}.md`); if (!existsSync(md)) return {};
  const n = (s) => Number(s.trim().replace(/\./g, '').replace('(', '-').replace(')', '')); const v = {};
  for (const l of readFileSync(md, 'utf8').split('\n')) { const x = l.match(/^\| (Costo de ventas|Gastos de ventas|Gastos de administración|Otros gastos) \| ([^|]+) \|/); if (x) v[x[1]] = n(x[2]); }
  const tot = Object.values(v).reduce((s, y) => s + y, 0); return tot && v['Costo de ventas'] != null ? { pct: Math.round(100 * v['Costo de ventas'] / tot) } : {};
}
if (A.includes('--evaluar')) {
  const ev = evaluar();
  console.log(`${club} · NIT ${c.nit} · ${ev.veredicto}\n`);
  console.log('año   ingresos        resultado'); for (const x of ev.anios) console.log(`${x.a}  ${miles(x.ing).padStart(10)}  ${miles(x.ut).padStart(10)}${x.ing ? '' : '   ← sin ingresos'}`);
  ev.motivos.forEach((t) => console.log(`\n· ${t}`));
  console.log(`\nLiga (rosters cacheados de Wikipedia, solo informativo; no descarta): ${ev.ligas.length ? ev.ligas.join(' · ') : 'ninguna encontrada: se carga igual con la liga en null (P3 liga-sin-verificar) o se confirma a mano si es amateur'}`);
  if (ev.pesos.length) { console.log(`\nPeso de «Costo de ventas» en los gastos: ${ev.pesos.map((p) => `${p.a} ${p.pct} %`).join(' · ')}`); const g = ev.pesos.filter((p) => p.pct > 50); if (g.length) console.log(`  >50 % en ${g.map((p) => p.a).join(', ')}: es la actividad deportiva y va a lump_football_operations_expense (regla de Colombia, CONVENCIONES-DATOS.md; --avanzar lo corrige solo con cola.mjs --corregir-categoria)`); }
  else console.log('\n(el peso de «Costo de ventas» aparece cuando están bajados los estados: --avanzar los baja)');
  process.exit(0);
}

// ---- --avanzar: corre en orden los pasos MECÁNICOS (sin juicio) y para en el primero que lo necesita; después imprime lo que falta.
// Sin --ejecutar no gasta API (el lote de categorización, ~US$ 0,03 por documento, se imprime y no se corre); con --ejecutar lo corre; con --cargar además carga y publica, solo si no falta nada de juicio.
// Lo que queda a mano: el nombre legal y el color de marca tras el alta, la liga de cada año, los subagentes (estadio y sponsor, gestiones, auditor), la cola y el commit de cada paso.
if (A.includes('--avanzar')) {
  const EJECUTAR = A.includes('--ejecutar'), CARGAR = A.includes('--cargar');
  const ev = evaluar(); console.log(`=== --avanzar ${club} · ${ev.veredicto} ===`);
  if (ev.veredicto === 'DESCARTAR') { console.log(`${ev.motivos.join('; ')}. No se avanza (node tools/club-siis.mjs ${q} --evaluar).`); process.exit(0); }
  if (ev.veredicto === 'REVISAR') console.log(`REVISAR: ${ev.motivos[0]}\n(se sigue; si no es un club, frená acá)`);
  const run = (args) => { console.log(`\n$ node ${args.join(' ')}`); try { const out = execFileSync('node', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'pipe'] }); console.log(out.trim().split('\n').slice(-6).join('\n')); return out; } catch (err) { console.log(`${String(err.stdout || '').trim().split('\n').slice(-8).join('\n')}\n${String(err.stderr || '').trim()}`); console.log(`\nSE FRENÓ en: node ${args.join(' ')}`);
    const casos = pendientes().filter((p) => p.pdf.startsWith(`Clubes/${cfg.pais}/${club}`)); // el alta frena con una pregunta del nombre legal (SIIS a veces lo imprime con errores): va a la cola
    if (casos.length) console.log(`\nPregunta(s) en la cola del club: ${casos.map((p) => p.id).join(', ')}. Contestala con el nombre bien escrito y volvé a correr --avanzar:\n  node tools/cola.mjs --responder <id> corregir --valor "<nombre legal>" --nota "…" --evidencia "Clubes/${cfg.pais}/${club}/siis-estado-AAAA.md:3" --seguridad alta --causa lectura-del-documento`);
    process.exit(1); } };
  // Reexpresión de comparativo de SIIS: el estado de un año imprime el año anterior con otra cifra (un renglón reclasificado). Las preguntas de verificación (anio-vecino y no-cierra) se contestan solas SOLO si el resultado
  // neto de ese año es idéntico en su propio estado y en el comparativo del siguiente (se movió plata entre renglones, no cambió el resultado); cada año se carga como lo imprimió su propio estado (regla de Colombia).
  // Si el resultado cambia es una reexpresión de verdad y la contesta una persona. Solo para los estados de SIIS (siis-estado-AAAA.md).
  const contestarReexpresiones = () => {
    const gan = (a, col) => { const md = join(ROOT, 'Clubes', cfg.pais, club, `siis-estado-${a}.md`); if (!existsSync(md)) return null; const L = readFileSync(md, 'utf8').split('\n'); const i = L.findIndex((l) => /^\| Ganancia \(pérdida\) \|/.test(l)); if (i < 0) return null; const v = L[i].split('|')[col].trim(); return { v, md: `Clubes/${cfg.pais}/${club}/siis-estado-${a}.md`, linea: i + 1 }; };
    let n = 0; const aparte = [];
    for (const p of pendientes().filter((x) => x.etapa === 'verificar' && ['anio-vecino', 'no-cierra'].includes(x.motivo) && x.pdf.startsWith(`Clubes/${cfg.pais}/${club}/siis-estado-`))) {
      const y = (String(p.que).match(/ingresos de (\d{4})/) || [])[1]; const anios = new Set([...String(p.que).matchAll(/siis-estado-(\d{4})\.pdf/g)].map((m) => m[1]).concat((p.pdf.match(/siis-estado-(\d{4})\.pdf/) || [])[1], (String(p.que).match(/documento del año (\d{4})/) || [])[1]).filter(Boolean));
      if (!y || anios.size !== 2 || !anios.has(y) || !anios.has(String(Number(y) + 1))) { aparte.push(`${p.id} (no es un par de años consecutivos)`); continue; }
      const propio = gan(y, 2), comparativo = gan(String(Number(y) + 1), 3);
      if (!propio || !comparativo || propio.v !== comparativo.v) { aparte.push(`${p.id} (el resultado de ${y} cambia: ${propio?.v} en su estado, ${comparativo?.v} en el de ${Number(y) + 1}: reexpresión de verdad, la contesta una persona)`); continue; }
      run(['tools/cola.mjs', '--responder', p.id, 'aceptar', '--nota', `Reclasificación del comparativo de SIIS: el resultado de ${y} es idéntico (${propio.v}) en el estado de ${y} y en el comparativo de ${Number(y) + 1}; cada año se carga como lo imprimió su propio estado.`, '--evidencia', `${comparativo.md}:${comparativo.linea}`, '--seguridad', 'alta', '--causa', 'regla-escrita']); n++;
    }
    if (aparte.length) console.log(`\nReexpresiones que NO se contestan solas: ${aparte.join('; ')}`);
    return n;
  };
  let s = estadoDe(club);
  // cuánto va a tardar (medianas de `fos duraciones` y de las cargas de SIIS: ~1 min por año el lote, otro tanto la carga, ~25 s publicar, ~10 s bajar un estado): una Bash en primer plano se corta a los 10 minutos y deja la sesión colgada
  { const porCargar = s.filas.filter((f) => !f.cargado).length; const sinBajar = s.filas.filter((f) => !f.siis && !f.cargado).length;
    const seg = sinBajar * 10 + (EJECUTAR ? porCargar * 60 + (CARGAR ? porCargar * 60 + 25 : 0) : 0); const min = Math.max(1, Math.round(seg / 60));
    console.log(`Tiempo estimado: ~${min} min (${porCargar} año(s) por cargar${EJECUTAR ? '' : '; sin --ejecutar no corre el lote'}).`);
    if (seg > 8 * 60 && !A.includes('--en-segundo-plano')) { console.log(`Pasa de 8 minutos: en primer plano la sesión se corta a los 10. Corrélo en segundo plano (run_in_background) y agregá --en-segundo-plano:\n  node tools/club-siis.mjs ${q} ${A.filter((x) => x !== club && !x.startsWith('"')).join(' ')} --en-segundo-plano\nNo se corrió nada.`); process.exit(0); } }
  // solo los años que todavía no están cargados: uno ya cargado desde su PDF no necesita el estado de SIIS (lo controla `siis-control`)
  const sinEstado = s.filas.filter((f) => !f.siis && !f.cargado).map((f) => f.a);
  if (sinEstado.length) { for (const a of sinEstado) run(['tools/siis-estado.mjs', '--club', club, '--anio', a, '--escribir']); s = estadoDe(club); }
  if (!s.c.clubId) {
    const ultimo = s.filas.filter((f) => f.siis).map((f) => f.a).pop();
    const out = run(['tools/alta-club.mjs', `Clubes/${cfg.pais}/${club}/siis-estado-${ultimo}.pdf`, '--escribir']); const id = (out.match(/data\/co\/([\w-]+)\.json/) || [])[1];
    if (!id) { console.log('No pude leer el clubId del alta: sumalo a tools/siis-clubes.json a mano.'); process.exit(1); }
    const { writeFileSync } = await import('node:fs'); const ruta = join(ROOT, 'tools/siis-clubes.json'); const t = readFileSync(ruta, 'utf8');
    const t2 = t.replace(new RegExp(`("${club.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*\\{[^}]*?)(\\s*\\})`), `$1, "clubId": "${id}"$2`); if (t2 === t) { console.log(`No pude sumar el clubId ${id} a siis-clubes.json: hacelo a mano.`); process.exit(1); }
    writeFileSync(ruta, t2); console.log(`clubId ${id} sumado a tools/siis-clubes.json.\nA MANO, ahora: mirar el nombre legal en data/clubs.js (en SIIS la sociedad figura como «${(readFileSync(join(s.dir, `siis-estado-${ultimo}.md`), 'utf8').match(/^# (.+?) — NIT/m) || [, club])[1]}») y poner el color de marca; commitear el alta (git add data index.html club fuentes liga …) antes del lote con --cargar.`); s.c.clubId = id;
  }
  { // la liga de los años que no la tienen, donde el roster de Wikipedia la da con el nombre exacto; el resto queda a mano
    const sinLigaAnios = estadoDe(club).filas.filter((f) => !f.liga && !f.cargado).map((f) => f.a);
    if (s.c.clubId && sinLigaAnios.length) {
      const m = ligasExactas(club, sinLigaAnios); const sin = sinLigaAnios.filter((a) => !m[a]);
      if (Object.keys(m).length) { escribirLigas(s.c.clubId, m); console.log(`\nLiga escrita en data/club-leagues/co.js (roster de Wikipedia, nombre exacto): ${Object.entries(m).map(([a, l]) => `${a} ${l}`).join(', ')}.`); }
      if (sin.length) console.log(`Liga a mano (sin coincidencia exacta en el roster): ${sin.join(', ')}.`);
    }
  }
  if (readdirSync(s.dir).some((x) => /^dictamen-revisor-fiscal-\d{4}\.pdf$/.test(x) && !existsSync(join(s.dir, x.replace(/\.pdf$/, '.md'))))) run(['tools/dictamenes-md.mjs', club, '--escribir']);
  for (const p of evaluar().pesos.filter((p) => p.pct > 50 && !s.filas.find((f) => f.a === p.a)?.cargado)) run(['tools/cola.mjs', '--corregir-categoria', `Clubes/${cfg.pais}/${club}/siis-estado-${p.a}.pdf`, 'Costo de ventas', 'lump_football_operations_expense', '--nota', `Costo de ventas es ${p.pct}% de los gastos: actividad deportiva (excepción por contenido de la regla de Colombia)`]);
  const sinCargar = s.filas.filter((f) => f.siis && !f.cargado).map((f) => f.a);
  if (sinCargar.length) {
    const { readdirSync: ls } = await import('node:fs'); const listas = ls(join(ROOT, 'Admin/lotes')).filter((x) => /^lote-\d+\.txt$/.test(x)).sort(); const marca = `Clubes/${cfg.pais}/${club}/siis-estado-`;
    let lista = listas.reverse().find((x) => readFileSync(join(ROOT, 'Admin/lotes', x), 'utf8').includes(marca)); lista = lista && `Admin/lotes/${lista}`;
    if (!lista) { const salida = execFileSync('node', [join(ROOT, 'tools', 'lote-nuevo.mjs'), `${club} SIIS`], { cwd: ROOT, encoding: 'utf8' }); lista = (salida.match(/Admin\/lotes\/[\w.-]+\.txt/) || [])[0]; const { appendFileSync } = await import('node:fs'); appendFileSync(join(ROOT, lista), sinCargar.map((a) => `${marca}${a}.pdf`).join('\n') + '\n'); console.log(`\nLista creada: ${lista}`); } else console.log(`\nLista: ${lista}`);
    run(['tools/inventario-transcripciones.mjs', '--solo', `Clubes/${cfg.pais}/${club}`]);
    const g = !!s.c.clubId && new RegExp(`'${s.c.clubId}'\\s*:`).test(readFileSync(join(ROOT, `data/gestiones/${iso}.js`), 'utf8'));
    const juicioFaltante = () => { // lo que todavía pide a una persona o a un subagente, con el estado de ahora
      const f = []; const f2 = estadoDe(club);
      if (f2.filas.some((x) => !x.liga)) f.push('liga de cada año'); if (f2.filas.some((x) => !x.ctx && !x.cargado)) f.push('estadio y sponsor (subagente)'); if (!g) f.push('gestiones (subagente)');
      const colaVigente = f2.cola.filter((p) => !(g && p.motivo === 'gestion')); // con la gestión ya cargada, las preguntas de gestión viejas no frenan: la corrida de carga las cierra como obsoletas
      if (colaVigente.length) f.push(`${colaVigente.length} preguntas de la cola`);
      return f;
    };
    const lote = ['tools/lote.mjs', '--lista', lista, '--ejecutar'];
    contestarReexpresiones();
    if (!EJECUTAR) console.log(`\nNo se gastó API. El lote de categorización (unos US$ 0,03 por documento): node ${lote.join(' ')}   (--avanzar --ejecutar lo corre)`);
    else {
      run(lote); if (contestarReexpresiones()) run(lote); // las preguntas de verificación nacen en el lote: se contestan y se repite para que el año no quede frenado
      const faltaJuicio = juicioFaltante();
      if (CARGAR && faltaJuicio.length) console.log(`\nNo se carga: falta ${faltaJuicio.join(', ')}.`);
      else if (CARGAR) { run([...lote, '--cargar']); run(['tools/publicar.mjs']); }
    }
  }
  // las preguntas de gestión que quedaron de antes de cargar la gestión del club ya no tienen objeto: se contestan solas (la gestión está en data/gestiones y la corrida de carga la tomó)
  if (s.c.clubId && new RegExp(`'${s.c.clubId}'\\s*:`).test(readFileSync(join(ROOT, `data/gestiones/${iso}.js`), 'utf8'))) {
    for (const p of estadoDe(club).cola.filter((x) => x.motivo === 'gestion')) run(['tools/cola.mjs', '--responder', p.id, 'aceptar', '--nota', 'La gestión del club ya está cargada en data/gestiones/co.js; la pregunta es de antes de cargarla.', '--evidencia', 'ninguna', '--seguridad', 'alta', '--causa', 'regla-escrita']);
  }
  contestarReexpresiones();
  console.log('\n=== lo que falta ==='); process.stdout.write(execFileSync('node', [join(ROOT, 'tools/club-siis.mjs'), club], { cwd: ROOT, encoding: 'utf8' }));
  // lo que quedó sin commitear: los comandos, cada uno en su llamada de Bash (el hook de commit audita antes de ejecutar el comando entero: publicar y commitear juntos fallan por asset-v-sin-subir)
  if (execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' }).trim()) console.log(`\n=== para commitear (una llamada de Bash cada uno) ===\n1. node tools/publicar.mjs\n2. git add -A club fuentes liga data fuentes.html index.html tools/contexto-manual.json Admin "Clubes/${cfg.pais}/${club}" "Generados/${cfg.pais}/${club}"\n3. git commit -m "${club}: <años> desde SIIS (463)"`);
  process.exit(0);
}

const m = (b) => (b ? '✔' : '·');
console.log(`${club} · NIT ${c.nit} · ${c.clubId || 'sin alta en el sitio'}\n`);
console.log('año   siis  verif cola liga ctx  cargado auditor notas');
for (const f of filas) console.log(`${f.a}   ${m(f.siis)}     ${m(f.verif)}     ${f.cola || '·'}    ${m(f.liga)}    ${m(f.ctx)}    ${m(f.cargado)}       ${m(f.aud)}${f.aud ? '' : f.dictamen ? '' : '(sin dictamen)'}      ${f.notas}`);
const sinSiis = filas.filter((f) => !f.siis && !f.cargado).map((f) => f.a); const sinVerif = filas.filter((f) => f.siis && !f.verif && !f.cargado).map((f) => f.a);
const colaN = e.cola; const sinLiga = filas.filter((f) => !f.liga).map((f) => f.a); const sinCtx = filas.filter((f) => !f.ctx && !f.cargado).map((f) => f.a);
const sinCarga = filas.filter((f) => f.siis && !f.cargado).map((f) => f.a); const sinAud = filas.filter((f) => f.cargado && !f.aud && f.dictamen).map((f) => f.a); const sinDict = filas.filter((f) => !f.dictamen).map((f) => f.a);
console.log('\nFalta, en este orden (cada paso commiteado antes del siguiente; los SUBAGENTES de abajo van todos juntos):');
let n = 0; const paso = (t, ...l) => { console.log(`${++n}. ${t}`); l.forEach((x) => console.log(cmd(x))); };
const subagentes = [];
if (!c.clubId) paso('Alta del club (necesita el estado de SIIS del último año: el paso siguiente si todavía no está)', `node tools/siis-estado.mjs --club ${q} --todos --escribir     (el estado de SIIS de cada año; gratis, con las notas que abren si el club las tiene)`, `node tools/alta-club.mjs "Clubes/${cfg.pais}/${club}/siis-estado-<último año>.pdf" --escribir     (después, su clubId en tools/siis-clubes.json y la sociedad como «name» en data/clubs.js y el JSON del club)`, `Color de marca: node tools/lookup-brand-color.js ${q}, la camiseta en es.wikipedia (lista ordenada: gana el primero) y brandColor en data/clubs.js; la nota «Color de marca: …» en Admin/sourcing/${cfg.pais}/${club}.md (club-or-year-onboarding/club-nuevo.md)`);
else if (sinSiis.length) paso(`Bajar los estados de SIIS (${sinSiis.join(', ')}; gratis, con las notas que abren si el club las tiene)`, `node tools/siis-estado.mjs --club ${q} --todos --escribir`);
if (c.clubId && sinLiga.length) paso(`Liga de cada año (${sinLiga.join(', ')}): data/club-leagues/${iso}.js (el roster cacheado: node tools/lookup-club-league.js "<club>" --pais CO)`, `'${c.clubId}': { ${sinLiga[0]}: 'co-primeraA', … }`);
if (c.clubId && sinAnioCtx.length) subagentes.push(`estadio-sponsor (${sinAnioCtx.join(', ')}; escribe tools/contexto-manual.json)`);
if (c.clubId && !conGestion) subagentes.push('gestiones (escribe data/gestiones/co.js; sin ella la cola pregunta quién presidió en cada año)');
if (dictSinMd.length) paso(`Transcribir los dictámenes del revisor fiscal (${dictSinMd.join(', ')}; es mecánico, gratis; los escaneos van por Mistral)`, `node tools/dictamenes-md.mjs ${q} --escribir`);
if (subagentes.length) { console.log(`   >> LANZÁ JUNTOS, en UN solo mensaje con una llamada a Agent cada uno (modelo sonnet; el brief: node tools/club-siis.mjs ${q} --brief <nombre>): ${subagentes.map((s) => s.split(' ')[0]).join(' · ')}.\n      ${subagentes.join('\n      ')}\n      Mientras corren, el lote en ensayo (sin --cargar); el --cargar espera a que terminen y a commitear lo suyo (exige data/ limpio).`); }
if (sinVerif.length) paso(`Lote de categorización de ${sinVerif.join(', ')} (unos US$ 0,03 por documento; localizar y extraer cuestan 0)`, `node tools/club-siis.mjs ${q} --crear-lista   (crea la lista del lote con los siis-estado-AAAA.pdf)`, `node tools/inventario-transcripciones.mjs --solo "Clubes/${cfg.pais}/${club}"   (sin esto el lote dice «sin .md»)`, `node tools/lote.mjs --lista <lista> --ejecutar`);
if (colaN.length) paso(`Contestar la cola (${colaN.length} casos): con la regla de Colombia (Admin/CONVENCIONES-DATOS.md); lo de perfil (socios, otros deportes) se contesta mirando la nota de ingresos; --responder pide --evidencia «ruta.md:línea» o «ninguna», --seguridad y --causa. «Costo de ventas» que pesa más de la mitad de los gastos: cola.mjs --corregir-categoria "<pdf>" "Costo de ventas" lump_football_operations_expense`, 'node tools/cola.mjs');
if (sinCarga.length) paso(`Cargar ${sinCarga.join(', ')} (un commit por año; antes, lo de los subagentes commiteado)`, 'node tools/lote.mjs --lista <lista> --ejecutar --cargar', 'node tools/publicar.mjs');
if (sinDict.length && !dictSinMd.length) console.log(`   (sin dictamen del revisor fiscal: ${sinDict.join(', ')}; es de sourcing, Admin/sourcing/${cfg.pais}/_notas-generales.md)`);
if (sinAud.length) paso(`Líneas del auditor de ${sinAud.join(', ')} (con la carga hecha y los dictámenes en git)`, `SUBAGENTE auditor (brief: node tools/club-siis.mjs ${q} --brief auditor; escribe Admin/registros/auditoria.jsonl)`, 'node tools/auditoria.mjs');
if (!n && !subagentes.length) console.log('Nada falta: todos los años están cargados y con sus pasos al día.');
console.log('\nUn año ya publicado que hay que rehacer: node tools/club-siis.mjs ' + q + ' --rehacer-anio AAAA');

if (A.includes('--crear-lista') && sinCarga.length) {
  const salida = execFileSync('node', [join(ROOT, 'tools', 'lote-nuevo.mjs'), `${club} SIIS`], { cwd: ROOT, encoding: 'utf8' }).trim(); const ruta = (salida.match(/Admin\/lotes\/[\w.-]+\.txt/) || [])[0];
  if (ruta) { const { appendFileSync } = await import('node:fs'); appendFileSync(join(ROOT, ruta), sinCarga.map((a) => `Clubes/${cfg.pais}/${club}/siis-estado-${a}.pdf`).join('\n') + '\n'); console.log(`\nLista creada: ${ruta}`); }
}

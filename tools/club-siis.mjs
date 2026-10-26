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
//   node tools/club-siis.mjs "<Club>" --brief <estadio-sponsor|gestiones|auditor>   el brief de ese subagente con el club y los años ya completos (plantilla: Admin/briefs-subagentes-siis.md)
// LOS SUBAGENTES VAN JUNTOS: estadio-sponsor y gestiones son independientes entre sí y del lote (escriben cada uno un archivo suyo): se lanzan a la vez, en UN solo mensaje con varias llamadas a Agent, apenas están el alta y los estados. El lote
// puede correr en ensayo mientras tanto; su `--cargar` exige `data/` limpio, así que espera a que terminen y se commitee lo suyo. El del auditor va después de la carga.
//   node tools/club-siis.mjs                                 los clubes de tools/siis-clubes.json con lo que les falta, una línea cada uno
// ============================================================================
import { readFileSync, existsSync, readdirSync } from 'node:fs';
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

function estadoDe(carpeta) {
  const c = cfg.clubes[carpeta]; if (!c) return { error: `«${carpeta}» no está en tools/siis-clubes.json (se suma con su NIT)` };
  const dir = join(ROOT, 'Clubes', cfg.pais, carpeta); const gen = join(ROOT, 'Generados', cfg.pais, carpeta);
  const anios = Object.entries(resumen?.nits?.[c.nit]?.anios || {}).filter(([a, d]) => d.estado && !(c.frenados || []).includes(a)).map(([a]) => a).sort();
  const json = c.clubId ? leer(`data/${iso}/${c.clubId}.json`) : null;
  const cargados = new Set((json?.years || []).map((y) => String(y.fiscal_year)));
  const ligas = c.clubId ? [...(readFileSync(join(ROOT, `data/club-leagues/${iso}.js`), 'utf8').match(new RegExp(`'${c.clubId}':\\s*\\{([^}]*)\\}`)) || [, ''])[1].matchAll(/(\d{4}):/g)].map((m) => m[1]) : [];
  const ctx = (c.clubId && leer('tools/contexto-manual.json')?.[c.clubId]) || {};
  const aud = existsSync(join(ROOT, 'Admin/registros/auditoria.jsonl')) && c.clubId ? new Set(readFileSync(join(ROOT, 'Admin/registros/auditoria.jsonl'), 'utf8').split('\n').filter((l) => l.includes(`"${c.clubId}"`)).map((l) => { try { return String(JSON.parse(l).anio); } catch { return null; } })) : new Set();
  const cola = pendientes().filter((p) => p.pdf.startsWith(`Clubes/${cfg.pais}/${carpeta}/`));
  const filas = anios.map((a) => {
    const md = join(dir, `siis-estado-${a}.md`); const ver = leer(`Generados/${cfg.pais}/${carpeta}/siis-estado-${a}.verificacion.json`);
    const texto = existsSync(md) ? readFileSync(md, 'utf8') : '';
    return {
      a, siis: existsSync(md), notas: !existsSync(md) ? '-' : existsSync(join(dir, `estados-financieros-${a}.md`)) ? (/## Detalle de las notas del club/.test(texto) ? 'abre' : 'no abre') : 'sin notas',
      verif: ver?.estado === 'ok' && existsSync(join(gen, `siis-estado-${a}.categorias.json`)), cola: cola.filter((p) => p.pdf.endsWith(`siis-estado-${a}.pdf`)).length,
      liga: ligas.includes(a), ctx: !!ctx[a], cargado: cargados.has(a), aud: aud.has(a), dictamen: existsSync(join(dir, `dictamen-revisor-fiscal-${a}.md`)),
    };
  });
  return { carpeta, c, dir, filas, cola };
}
const cmd = (s) => `    ${s}`;

if (!club) {
  for (const k of Object.keys(cfg.clubes)) { const e = estadoDe(k); if (e.error || !e.filas.length) continue; const f = e.filas; const hechos = f.filter((x) => x.cargado).length; console.log(`${k.padEnd(26)} ${hechos}/${f.length} años cargados${e.c.clubId ? '' : ' · sin alta'}${f.some((x) => x.cola) ? ` · ${f.reduce((n, x) => n + x.cola, 0)} en la cola` : ''}`); }
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

const m = (b) => (b ? '✔' : '·');
console.log(`${club} · NIT ${c.nit} · ${c.clubId || 'sin alta en el sitio'}\n`);
console.log('año   siis  verif cola liga ctx  cargado auditor notas');
for (const f of filas) console.log(`${f.a}   ${m(f.siis)}     ${m(f.verif)}     ${f.cola || '·'}    ${m(f.liga)}    ${m(f.ctx)}    ${m(f.cargado)}       ${m(f.aud)}${f.aud ? '' : f.dictamen ? '' : '(sin dictamen)'}      ${f.notas}`);
const sinSiis = filas.filter((f) => !f.siis).map((f) => f.a); const sinVerif = filas.filter((f) => f.siis && !f.verif && !f.cargado).map((f) => f.a);
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

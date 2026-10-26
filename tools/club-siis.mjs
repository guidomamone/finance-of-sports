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
//   node tools/club-siis.mjs                                 los clubes de tools/siis-clubes.json con lo que les falta, una línea cada uno
// ============================================================================
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pendientes } from './cola.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
const club = A.find((a, i) => !a.startsWith('--') && !['--rehacer-anio'].includes(A[i - 1]));
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

const m = (b) => (b ? '✔' : '·');
console.log(`${club} · NIT ${c.nit} · ${c.clubId || 'sin alta en el sitio'}\n`);
console.log('año   siis  verif cola liga ctx  cargado auditor notas');
for (const f of filas) console.log(`${f.a}   ${m(f.siis)}     ${m(f.verif)}     ${f.cola || '·'}    ${m(f.liga)}    ${m(f.ctx)}    ${m(f.cargado)}       ${m(f.aud)}${f.aud ? '' : f.dictamen ? '' : '(sin dictamen)'}      ${f.notas}`);
const sinSiis = filas.filter((f) => !f.siis).map((f) => f.a); const sinVerif = filas.filter((f) => f.siis && !f.verif && !f.cargado).map((f) => f.a);
const colaN = e.cola; const sinLiga = filas.filter((f) => !f.liga).map((f) => f.a); const sinCtx = filas.filter((f) => !f.ctx && !f.cargado).map((f) => f.a);
const sinCarga = filas.filter((f) => f.siis && !f.cargado).map((f) => f.a); const sinAud = filas.filter((f) => f.cargado && !f.aud && f.dictamen).map((f) => f.a); const sinDict = filas.filter((f) => !f.dictamen).map((f) => f.a);
console.log('\nFalta, en este orden (un paso por vez; el siguiente cuando el anterior está commiteado):');
let n = 0; const paso = (t, ...l) => { console.log(`${++n}. ${t}`); l.forEach((x) => console.log(cmd(x))); };
if (!c.clubId) paso('Alta del club', `node tools/alta-club.mjs "Clubes/${cfg.pais}/${club}/siis-estado-<último año>.pdf" --escribir     (después, su clubId en tools/siis-clubes.json)`);
if (sinSiis.length) paso(`Bajar los estados de SIIS (${sinSiis.join(', ')}; gratis, con las notas que abren si el club las tiene)`, `node tools/siis-estado.mjs --club ${q} --todos --escribir`);
if (sinVerif.length) paso(`Lote de categorización de ${sinVerif.join(', ')} (unos US$ 0,03 por documento; localizar y extraer cuestan 0)`, `node tools/fos.mjs lote-nuevo "${club} SIIS"   (o --crear-lista) y las rutas siis-estado-AAAA.pdf`, `node tools/lote.mjs --lista <lista> --ejecutar`);
if (colaN.length) paso(`Contestar la cola (${colaN.length} casos): SUBAGENTE Sonnet con la regla de Colombia (Admin/CONVENCIONES-DATOS.md) y cada caso; lo de perfil (socios, otros deportes) se contesta mirando la nota de ingresos`, 'node tools/cola.mjs');
if (sinLiga.length) paso(`Liga de cada año (${sinLiga.join(', ')}): data/club-leagues/${iso}.js`, `'${c.clubId || '<clubId>'}': { ${sinLiga[0]}: 'co-primeraA', … }`);
if (sinCtx.length) paso(`Estadio y sponsor de ${sinCtx.join(', ')} (lo que Wikipedia no trae): SUBAGENTE Sonnet con el brief de club-sourcing 0.5 (liga-y-sponsor.md); el resultado va a tools/contexto-manual.json con su fuente o su «sin-fuente»`);
if (sinCarga.length) paso(`Cargar ${sinCarga.join(', ')} (un commit por año)`, 'node tools/lote.mjs --lista <lista> --ejecutar --cargar', 'node tools/publicar.mjs');
if (sinDict.length) console.log(`   (sin dictamen del revisor fiscal: ${sinDict.join(', ')}; es de sourcing, Admin/sourcing/${cfg.pais}/_notas-generales.md)`);
if (sinAud.length) paso(`Líneas del auditor de ${sinAud.join(', ')}: SUBAGENTE con el extracto de cada dictamen`, 'node tools/auditoria.mjs --extractos --solo ' + sinAud.map((a) => `${c.clubId}:${a}`).join(','), 'node tools/auditoria.mjs --check');
if (!n) console.log('Nada falta: todos los años están cargados y con sus pasos al día.');
console.log('\nUn año ya publicado que hay que rehacer: node tools/club-siis.mjs ' + q + ' --rehacer-anio AAAA');

if (A.includes('--crear-lista') && sinCarga.length) {
  const salida = execFileSync('node', [join(ROOT, 'tools', 'lote-nuevo.mjs'), `${club} SIIS`], { cwd: ROOT, encoding: 'utf8' }).trim(); const ruta = (salida.match(/Admin\/lotes\/[\w.-]+\.txt/) || [])[0];
  if (ruta) { const { appendFileSync } = await import('node:fs'); appendFileSync(join(ROOT, ruta), sinCarga.map((a) => `Clubes/${cfg.pais}/${club}/siis-estado-${a}.pdf`).join('\n') + '\n'); console.log(`\nLista creada: ${ruta}`); }
}

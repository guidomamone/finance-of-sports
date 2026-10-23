#!/usr/bin/env node
// ============================================================================
// tools/changelog.mjs — EL CHANGELOG POR TOOL (408, propuesta Admin/propuestas/408-changelog-por-tool.md)
//
// POR QUÉ. Si mañana una tool falla, la sesión tiene que saber en una línea qué entradas la tocaron y qué leer, sin abrir un CHANGELOG de 240 KB. El título de cada entrada lleva
// `[ids · tools · clubes]`; las tools por su nombre de archivo (`cola.mjs`), derivadas de git al cerrar (`fos cerrar`), no de memoria. Una tool nombrada en una entrada vieja solo
// porque el texto la menciona lleva `~` (`~cola.mjs`): aproximada, no derivada.
//
// USO (node tools/fos.mjs changelog …)
//   historial <tool>            las entradas que la nombran (CHANGELOG y archivos), su línea «Medición», los commits que la tocaron, los hallazgos y las mediciones que la citan
//   tools-sin-entrada           las tools de tools/ cambiadas desde la última entrada que ninguna entrada nueva nombra, y el corchete que las nombraría (lo usa `fos cerrar`)
//   migrar [--escribir]         suma `~tool` a los títulos que no nombran ninguna (ensayo si no se pasa --escribir)
//   archivar [--mantener N] [--escribir]   mueve las entradas más viejas (deja las N más nuevas, 40 por defecto) a Admin/Archive/CHANGELOG-v<a>-v<b>.md
//   check                       entradas de más de 1.500 caracteres desde la 996 y CHANGELOG de más de 120 KB (lo usa audit.js: changelog-entrada-larga, changelog-grande)
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const CL = resolve(ROOT, 'Admin', 'CHANGELOG.md');
const ARCH = resolve(ROOT, 'Admin', 'Archive');
export const TOPE_ENTRADA = 1500;
export const DESDE_VERSION_CON_TOOLS = 996;
const TOOL_RE = /\b([a-z0-9][a-z0-9-]*\.(?:mjs|js))\b/g;
const git = (...a) => { try { return execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };

// {cabecera: líneas antes de la primera entrada, entradas: [{version, titulo, linea, corchete, tools, texto}]}; las entradas conservan su texto exacto
export function leer(ruta = CL) {
  const L = readFileSync(ruta, 'utf8').split('\n'); const idx = [];
  L.forEach((l, i) => { if (/^## Versión \d+/.test(l)) idx.push(i); });
  const cabecera = L.slice(0, idx.length ? idx[0] : L.length);
  const entradas = idx.map((i, k) => {
    const fin = k + 1 < idx.length ? idx[k + 1] : L.length; const titulo = L[i]; const m = titulo.match(/^## Versión (\d+)/);
    const cor = titulo.match(/\[([^\]]*)\]\s*$/);
    return { version: Number(m[1]), titulo, linea: i + 1, corchete: cor ? cor[1] : null, tools: herramientasDelTitulo(titulo), texto: L.slice(i, fin).join('\n') };
  });
  return { cabecera, entradas };
}
// las tools nombradas en el corchete del título (con o sin `~`)
export function herramientasDelTitulo(titulo) {
  const cor = titulo.match(/\[([^\]]*)\]\s*$/); if (!cor) return [];
  return [...cor[1].matchAll(/~?([a-z0-9][a-z0-9-]*\.(?:mjs|js))\b/g)].map((m) => m[1]);
}
const archivosChangelog = () => [CL, ...(existsSync(ARCH) ? readdirSync(ARCH).filter((f) => /^CHANGELOG-.*\.md$/.test(f)).map((f) => join(ARCH, f)) : [])];

// tools que existen (para no tomar por tool cualquier «algo.js» del texto)
const toolsExistentes = () => new Set([...readdirSync(resolve(ROOT, 'tools')).filter((f) => /\.(mjs|js)$/.test(f)), ...(existsSync(resolve(ROOT, 'tools/archivo')) ? readdirSync(resolve(ROOT, 'tools/archivo')).filter((f) => /\.(mjs|js)$/.test(f)) : [])]);
export function toolsMencionadas(texto, existen = toolsExistentes()) { return [...new Set([...texto.matchAll(TOOL_RE)].map((m) => m[1]).filter((n) => existen.has(n)))]; }

// ---- historial
function historial(tool) {
  const t = tool.replace(/^tools\//, ''); const out = [];
  for (const f of archivosChangelog()) {
    for (const e of leer(f).entradas) {
      const exacta = e.tools.includes(t); const menciona = !exacta && new RegExp(`\\b${t.replace(/\./g, '\\.')}\\b`).test(e.texto);
      if (!exacta && !menciona) continue;
      const med = e.texto.split('\n').find((l) => /Medici[óo]n|Medido|medido/.test(l));
      out.push({ e, exacta, med, archivo: f === CL ? 'CHANGELOG' : f.split('/').pop().replace('.md', '') });
    }
  }
  out.sort((a, b) => b.e.version - a.e.version);
  console.log(`## ${t}: ${out.filter((x) => x.exacta).length} entradas que la nombran en el título, ${out.filter((x) => !x.exacta).length} que la mencionan\n`);
  for (const x of out.slice(0, 12)) console.log(`${x.exacta ? '●' : '○'} v${x.e.version} (${x.archivo}) ${x.e.titulo.replace(/^## Versión \d+ — /, '').slice(0, 150)}${x.med ? `\n     ${x.med.trim().slice(0, 170)}` : ''}`);
  if (out.length > 12) console.log(`… y ${out.length - 12} más (grep "${t}" Admin/CHANGELOG.md Admin/Archive/CHANGELOG*.md)`);
  const commits = git('log', '--oneline', '-n', '8', '--', `tools/${t}`).trim();
  console.log(`\nCommits que la tocaron:\n${commits ? commits.split('\n').map((l) => `  ${l.slice(0, 150)}`).join('\n') : '  (ninguno: no existe o está en tools/archivo)'}`);
  const hall = existsSync(resolve(ROOT, 'Admin/HALLAZGOS-pipeline.md')) ? readFileSync(resolve(ROOT, 'Admin/HALLAZGOS-pipeline.md'), 'utf8').split('\n') : [];
  const h = hall.map((l, i) => [i + 1, l]).filter(([, l]) => l.includes(t)); let titulo = ''; const secciones = [];
  hall.forEach((l, i) => { if (/^## /.test(l)) titulo = l; if (l.includes(t)) secciones.push(`${titulo.slice(0, 110)} (L${i + 1})`); });
  console.log(`\nHallazgos (Admin/HALLAZGOS-pipeline.md) que la citan: ${h.length ? '' : 'ninguno'}`); for (const s of [...new Set(secciones)].slice(0, 6)) console.log(`  ${s}`);
  const med = existsSync(resolve(ROOT, 'Admin/registros/mediciones-pipeline.jsonl')) ? readFileSync(resolve(ROOT, 'Admin/registros/mediciones-pipeline.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter((x) => x && x.tools && x.tools[t]) : [];
  console.log(`\nMediciones registradas de esta tool: ${med.length}${med.length ? ` (la última, ${med[med.length - 1].fecha}, lote ${med[med.length - 1].lote?.nivel}, ${(med[med.length - 1].medidores || []).reduce((s, m) => s + (m.diferencias || 0), 0)} diferencias)` : ''}`);
}

// ---- tools cambiadas desde la última entrada
export function toolsSinEntrada() {
  const ultimo = git('log', '-1', '--format=%H', '--', 'Admin/CHANGELOG.md').trim();
  // lo cambiado DESPUÉS del commit de la última entrada (lo del propio commit de esa entrada ya lo nombra); más lo que está sin commitear
  const rango = ultimo ? [ultimo, 'HEAD'] : ['HEAD', 'HEAD'];
  const archivos = new Set([...git('diff', '--name-only', ...rango, '--', 'tools').split('\n'), ...git('diff', '--name-only', 'HEAD', '--', 'tools').split('\n'), ...git('ls-files', '--others', '--exclude-standard', '--', 'tools').split('\n')]);
  const cambiadas = [...archivos].filter((f) => /^tools\/[^/]+\.(mjs|js)$/.test(f)).map((f) => f.slice(6)).filter((n) => existsSync(resolve(ROOT, 'tools', n)));
  const viejo = git('show', 'HEAD:Admin/CHANGELOG.md'); const titulosViejos = new Set(viejo.split('\n').filter((l) => /^## Versión/.test(l)));
  const nuevas = leer().entradas.filter((e) => !titulosViejos.has(e.titulo));
  const entradas = nuevas.length ? nuevas : leer().entradas.slice(0, 3);
  const nombradas = new Set(entradas.flatMap((e) => e.tools));
  const faltan = cambiadas.filter((n) => !nombradas.has(n));
  return { cambiadas, faltan, entradas: entradas.map((e) => e.version) };
}

// ---- chequeos
export function check() {
  const { entradas } = leer(); const problemas = [];
  const largas = entradas.filter((e) => e.version >= DESDE_VERSION_CON_TOOLS && e.texto.length > TOPE_ENTRADA);
  if (largas.length) problemas.push({ code: 'changelog-entrada-larga', msg: `${largas.length} entrada(s) del CHANGELOG pasan de ${TOPE_ENTRADA} caracteres (${largas.slice(0, 4).map((e) => `v${e.version} ${e.texto.length}`).join(', ')}): lo que no entra va a HALLAZGOS-pipeline.md o finance-of-sports-project.md` });
  // el CHANGELOG pasado de tamaño (el archivado es `changelog archivar`)
  const kb = readFileSync(CL, 'utf8').length / 1024;
  if (kb > 120) problemas.push({ code: 'changelog-grande', msg: `Admin/CHANGELOG.md pesa ${Math.round(kb)} KB (más de 120): node tools/fos.mjs changelog archivar` });
  return problemas;
}

// ---- migración: ~tool en los títulos que no nombran ninguna
function migrar(escribir) {
  const existen = toolsExistentes(); const resumen = [];
  for (const f of archivosChangelog()) {
    const { entradas } = leer(f); let L = readFileSync(f, 'utf8').split('\n'); let n = 0;
    for (const e of entradas) {
      if (e.tools.length) continue;
      const m = toolsMencionadas(e.texto, existen); if (!m.length) continue;
      const lista = m.slice(0, 5).map((x) => `~${x}`).join(', ') + (m.length > 5 ? `, +${m.length - 5}` : '');
      const i = e.linea - 1; const cor = L[i].match(/\[([^\]]*)\]\s*$/);
      if (cor) { const partes = cor[1].split(' · '); const ids = partes.filter((p) => /^\d/.test(p.trim())); const resto = partes.filter((p) => !/^\d/.test(p.trim())); L[i] = L[i].replace(/\[[^\]]*\]\s*$/, `[${[...ids, lista, ...resto].join(' · ')}]`); }
      else L[i] = `${L[i]} [${lista}]`;
      n++;
    }
    resumen.push(`${f.split('/').pop()}: ${n} títulos`);
    if (escribir && n) writeFileSync(f, L.join('\n'), 'utf8');
  }
  console.log(`${escribir ? 'ESCRITO' : 'ENSAYO'}: ${resumen.join(' · ')}`);
}

// ---- archivado por cantidad (las entradas no llevan fecha en el título): las más viejas a Admin/Archive/CHANGELOG-v<a>-v<b>.md
function archivar(mantener, escribir) {
  const { cabecera, entradas } = leer(); const quedan = entradas.slice(0, mantener); const van = entradas.slice(mantener);
  if (!van.length) { console.log(`Nada que archivar: hay ${entradas.length} entradas (se mantienen ${mantener}).`); return; }
  const a = van[van.length - 1].version, b = van[0].version; const destino = join(ARCH, `CHANGELOG-v${a}-v${b}.md`);
  console.log(`${escribir ? 'ESCRITO' : 'ENSAYO'}: ${van.length} entradas (v${a} a v${b}, ${Math.round(van.reduce((s, e) => s + e.texto.length, 0) / 1024)} KB) → ${destino.replace(ROOT + '/', '')}; quedan ${quedan.length}.`);
  if (!escribir) return;
  writeFileSync(destino, `<!-- md: CHANGELOG archivado, versiones ${a} a ${b} | leer: solo por grep de una palabra o de una tool (fos changelog historial <tool>) -->\n# Changelog archivado, versiones ${a} a ${b}\n\nSalieron de \`Admin/CHANGELOG.md\` con \`node tools/fos.mjs changelog archivar\`. Las rutas son las de su época.\n\n---\n\n${van.map((e) => e.texto.replace(/\n+$/, '')).join('\n\n')}\n`, 'utf8');
  writeFileSync(CL, `${cabecera.join('\n').replace(/\s+$/, '')}\n\n${quedan.map((e) => e.texto.replace(/\n+$/, '')).join('\n\n')}\n`, 'utf8');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const A = process.argv.slice(2); const cmd = A[0];
  const flag = (n, d) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : d; };
  if (cmd === 'historial' && A[1]) historial(A[1]);
  else if (cmd === 'tools-sin-entrada') { const s = toolsSinEntrada(); console.log(JSON.stringify(s)); process.exit(s.faltan.length ? 1 : 0); }
  else if (cmd === 'migrar') migrar(A.includes('--escribir'));
  else if (cmd === 'archivar') archivar(Number(flag('--mantener', 40)), A.includes('--escribir'));
  else if (cmd === 'check') { const p = check(); for (const x of p) console.log(`${x.code}: ${x.msg}`); process.exit(p.length ? 1 : 0); }
  else { console.error('Uso: node tools/fos.mjs changelog historial <tool> | tools-sin-entrada | migrar [--escribir] | archivar [--mantener N] [--escribir] | check'); process.exit(1); }
}

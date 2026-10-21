#!/usr/bin/env node
// ============================================================================
// tools/worktree.mjs — SESIONES EN PARALELO: cada una en su copia del repo (git worktree) y su rama; la principal mergea (to-do 251).
//
// POR QUÉ (ok de Guido, 2026-10-17). Con dos sesiones en la misma carpeta cada una tenía que cuidarse de no commitear lo de la otra, y
// los worktrees probados antes terminaban en conflictos. Dos causas: (1) todas editaban TODO, CHANGELOG y ESTADO; (2) cada carga regenera
// lo mismo (ASSET_V de index.html, las páginas de fuentes/, ESTADO-clubes, club-index, rankings, sitemap). La (1) la resuelve una regla
// (solo la principal escribe esos tres; ver la skill de arranque, worktree.md); la (2), `mergear`. Además, una copia nueva no tiene lo que
// git ignora (los PDFs de Clubes/, las claves de Admin/api-keys/, las cachés de Generados/): sin eso no corre nada; lo resuelve `preparar`.
//
// USO:
//   node tools/worktree.mjs preparar <carpeta del worktree>   en la copia, un enlace a cada archivo que git ignora en la carpeta principal
//                                                             (la lista sale de git, no de carpetas fijas). Los enlaces no ocupan lugar y
//                                                             las cachés quedan compartidas: lo que paga una sesión le sirve a la otra.
//   node tools/worktree.mjs mergear <rama>                    en la principal, sobre main: mergea la rama; los conflictos en lo generado se
//                                                             resuelven con lo de main y se regenera (ASSET_V una vez + los 4 generadores
//                                                             + audit.js, como al final de cargar.mjs). Frena si la rama tocó TODO /
//                                                             CHANGELOG / ESTADO o si hay un conflicto real (data/ de un club, una tool).
// ============================================================================
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, symlinkSync, readFileSync, writeFileSync, lstatSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const git = (args, cwd = ROOT) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
const principal = () => resolve(git(['rev-parse', '--path-format=absolute', '--git-common-dir']).trim(), '..');

// Lo que regenera cada carga: en un conflicto, gana main y después se regenera.
const GENERADO = (f) => f === 'index.html' || f === 'fuentes.html' || f === 'sitemap.xml' || f.startsWith('fuentes/') || f === 'Admin/ESTADO-clubes.md'
  || f === 'data/club-index.js' || f.startsWith('data/rankings/') || f.startsWith('data/faltantes/') || f === 'Admin/sourcing/pendientes.md' || f.startsWith('data/estimados/')
  || /^data\/[a-z]{2}\/[a-z0-9-]+-data\.js$/.test(f); // el -data.js se genera de su JSON (to-do 245): un conflicto ahí se resuelve con el JSON mergeado y generar-data
const DOCS_PRINCIPAL = ['Admin/TODO.md', 'Admin/CHANGELOG.md', 'Admin/ESTADO.md'];
// Lo que escribe cada corrida de lote.mjs o pipeline.mjs para sus propias etapas: cada carpeta tiene el suyo. Enlazado a la principal, dos
// lotes que corrían a la vez en worktrees distintos se pisaban la lista de la etapa 7 (2026-10-19: el lote 103 categorizó dos años de Basel y
// la carga de Basel se quedó sin categorizar).
const ESTADO_DE_CORRIDA = ['Admin/registros/.lote-lista-actual.txt', 'Admin/registros/.lote-primer-anio.txt',
  'Admin/registros/.pipeline-lista-actual.txt', 'Admin/registros/.pipeline-lista-jev.txt', 'Admin/registros/.candado.lock'];

function preparar(destino) {
  const main = principal(); const wt = resolve(destino);
  if (!existsSync(join(wt, '.git'))) throw new Error(`${wt} no es un worktree (no tiene .git)`);
  if (wt === main) throw new Error('esa es la carpeta principal');
  const lista = git(['ls-files', '--others', '--ignored', '--exclude-standard', '-z'], main).split('\0').filter(Boolean)
    // Ni una carpeta con su propio .git (git la lista entera, con / al final) ni lo de .claude/worktrees/ (los otros worktrees, que en la
    // principal figuran como ignorados): enlazarlos hacía fallar el comando.
    .filter((f) => !/(^|\/)\.DS_Store$/.test(f) && !f.endsWith('/') && !f.startsWith('.claude/worktrees/') && !ESTADO_DE_CORRIDA.includes(f));
  let hechos = 0, ya = 0;
  for (const f of lista) {
    const dst = join(wt, f); let existe = false; try { lstatSync(dst); existe = true; } catch {}
    if (existe) { ya++; continue; }
    mkdirSync(dirname(dst), { recursive: true }); symlinkSync(join(main, f), dst); hechos++;
  }
  console.log(`preparar ${wt}: ${hechos} enlaces nuevos a la carpeta principal, ${ya} ya estaban (${lista.length} archivos que git ignora).`);
}

async function mergear(rama) {
  if (principal() !== ROOT) throw new Error('mergear se corre en la carpeta principal');
  if (git(['rev-parse', '--abbrev-ref', 'HEAD']).trim() !== 'main') throw new Error('mergear se corre sobre main');
  const sucio = git(['status', '--porcelain', '--untracked-files=no']).trim(); if (sucio) throw new Error(`hay cambios sin commitear en main:\n${sucio}`);
  const base = git(['merge-base', 'main', rama]).trim();
  const tocados = git(['diff', '--name-only', base, rama, '--']).split('\n').filter(Boolean);
  const docs = tocados.filter((f) => DOCS_PRINCIPAL.includes(f));
  if (docs.length) throw new Error(`la rama ${rama} editó ${docs.join(', ')}: esos los escribe solo la sesión principal (su cierre va en Admin/sesiones/<nombre>.md)`);
  try { git(['merge', '--no-ff', '--no-commit', rama]); } catch { /* con conflictos sale con error: se miran abajo */ }
  const conflictos = git(['diff', '--name-only', '--diff-filter=U']).split('\n').filter(Boolean);
  const reales = conflictos.filter((f) => !GENERADO(f));
  if (reales.length) { git(['merge', '--abort']); throw new Error(`conflicto real (no se mergeó nada): ${reales.join(', ')}`); }
  // index.html no se regenera entero: se queda con lo de main SOLO en los bloques en conflicto, y solo si los dos lados son iguales salvo
  // el número de versión (la constante ASSET_V y cada ?v=); el resto del archivo conserva lo que mergeó git (un cambio de código de la rama no se pierde).
  for (const f of conflictos) {
    if (f !== 'index.html') { git(['checkout', '--ours', '--', f]); continue; }
    const t = readFileSync(resolve(ROOT, f), 'utf8'); let malo = false;
    const limpio = t.replace(/^<<<<<<< [^\n]*\n([\s\S]*?)^=======\n([\s\S]*?)^>>>>>>> [^\n]*\n/gm, (m, ours, theirs) => {
      const sinVersion = (s) => s.replace(/\?v=[\w.-]+/g, '?v=X').replace(/ASSET_V = '[^']*'/g, "ASSET_V = 'X'");
      if (sinVersion(ours) !== sinVersion(theirs)) malo = true; return ours;
    });
    if (malo) { git(['merge', '--abort']); throw new Error('conflicto real en index.html (no es solo ASSET_V): no se mergeó nada'); }
    writeFileSync(resolve(ROOT, f), limpio);
  }
  if (conflictos.length) git(['add', '--', ...conflictos]);
  // Los -data.js en conflicto (o que la rama tocó) se regeneran del JSON ya mergeado: el JSON es la fuente; si el JSON conflictuó, ya abortó arriba como conflicto real.
  const dataJs = [...new Set([...conflictos, ...tocados])].filter((f) => /^data\/[a-z]{2}\/[a-z0-9-]+-data\.js$/.test(f));
  if (dataJs.length) { execFileSync('node', ['tools/generar-data.mjs'], { cwd: ROOT, encoding: 'utf8' }); git(['add', '--', ...dataJs.filter((f) => existsSync(resolve(ROOT, f)))]); }
  // ASSET_V una vez + generadores + auditoría: lo mismo que el final de cargar.mjs (si audit.js da P0/P1, se aborta el merge).
  const { publicarCambios, snapshot } = await import('./cargar.mjs');
  const r = publicarCambios(snapshot([]), [], []);
  if (!r.ok) { git(['merge', '--abort']); throw new Error(`audit.js dio P0/P1 después del merge; no se mergeó nada. ${r.motivo}`); }
  git(['add', '-A', '--', 'index.html', 'fuentes.html', 'fuentes', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'data/club-index.js', 'data/rankings', 'data/faltantes', 'Admin/sourcing/pendientes.md', ...(existsSync(resolve(ROOT, 'data', 'estimados')) ? ['data/estimados'] : [])]);
  const cierres = tocados.filter((f) => f.startsWith('Admin/sesiones/'));
  git(['commit', '-q', '-m', `Merge de ${rama}${conflictos.length ? ` (${conflictos.length} generados resueltos con main y regenerados)` : ''}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`]);
  console.log(`mergeado ${rama}: ${tocados.length} archivos de la rama, ${conflictos.length} conflictos en lo generado (resueltos), auditoría ${r.audit}.`);
  if (cierres.length) console.log(`Cierre de la sesión para pasar a TODO / CHANGELOG / ESTADO: ${cierres.join(', ')}`);
}

const [cmd, arg] = process.argv.slice(2);
try {
  if (cmd === 'preparar' && arg) preparar(arg);
  else if (cmd === 'mergear' && arg) await mergear(arg);
  else { console.log('Uso: node tools/worktree.mjs preparar <carpeta> | mergear <rama>'); process.exit(1); }
} catch (e) { console.error(`worktree.mjs: ${e.message}`); process.exit(1); }

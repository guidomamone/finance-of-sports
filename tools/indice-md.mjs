#!/usr/bin/env node
// ============================================================================
// tools/indice-md.mjs — el ÍNDICE de los documentos .md del proyecto, armado por una tool (no a mano) para no olvidarse de leer algo y para ver cuáles
// no los lee ni los cita nadie.
//
// POR QUÉ. Los documentos se parten, se archivan y se agregan; pedirle a una sesión «leé todo y relacioná» siempre deja algo afuera. Acá cada documento
// vivo declara en su primera línea qué es y cuándo se lee (`<!-- md: qué es | leer: cuándo -->`; una skill usa su `description`; los archivos que salen de
// partir una skill, su línea «*Se abre ...*»), y la tool cuenta quién lo cita: otro documento vivo, una skill o una tool.
//
// QUÉ SE INDEXA (documentos vivos): CLAUDE.md, Admin/*.md, Admin/propuestas, Admin/transcripcion-subagentes, Admin/outreach, Admin/difusion y
// .claude/skills/**. Admin/mediciones, Admin/Archive, las notas por club o país (sourcing, carga-clubes, gestiones-por-pais, ligas-por-pais) y Clubes/ se
// cuentan por carpeta. CHANGELOG, el diario del proyecto y Archive no cuentan como quien «cita»: son historia.
//
// QUÉ DICE: huérfano = ningún documento vivo ni tool lo nombra (candidato a archivar, o a enlazar desde donde se debería leer); sin marca = no declara
// qué es ni cuándo se lee. «sigue a» = a qué otros documentos vivos manda ese (el orden de lectura).
//
// USO:
//   node tools/indice-md.mjs                imprime solo los problemas (huérfanos y sin marca) y los totales
//   node tools/indice-md.mjs --escribir     escribe Admin/INDICE-md.md (el índice entero, generado: no se edita a mano)
//   node tools/indice-md.mjs --check        sale con 1 si Admin/INDICE-md.md quedó viejo
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative, basename, dirname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SALIDA = resolve(ROOT, 'Admin', 'INDICE-md.md');
const A = process.argv.slice(2);

const lista = (dir, filtro, recursivo = false) => {
  const out = [];
  const p = resolve(ROOT, dir);
  if (!existsSync(p)) return out;
  for (const e of readdirSync(p, { withFileTypes: true })) {
    const f = join(p, e.name);
    if (e.isDirectory()) { if (recursivo) out.push(...lista(join(dir, e.name), filtro, true)); } else if (filtro(e.name)) out.push(relative(ROOT, f));
  }
  return out;
};
const md = (n) => n.endsWith('.md');

// documentos vivos
const vivos = [
  'CLAUDE.md',
  ...lista('Admin', md),
  ...lista('Admin/propuestas', md),
  ...lista('Admin/transcripcion-subagentes', md),
  ...lista('Admin/outreach', md),
  ...lista('Admin/difusion', md),
  ...lista('.claude/skills', md, true),
].filter((f) => existsSync(resolve(ROOT, f)) && f !== 'Admin/INDICE-md.md'); // el índice no se lista a sí mismo (su tamaño cambiaría el índice)

// carpetas que se cuentan sin listar cada archivo
const CARPETAS = ['Admin/mediciones', 'Admin/Archive', 'Admin/carga-clubes', 'Admin/sourcing', 'Admin/gestiones-por-pais', 'Admin/ligas-por-pais', 'Admin/registros', 'Admin/lotes'];
const cuentaCarpeta = (d) => lista(d, (n) => /\.(md|txt|jsonl|json|csv|tsv)$/.test(n), true).length;

// generados: sin marca propia porque la tool que los escribe los pisa
const GENERADOS = {
  'Admin/ESTADO-clubes.md': ['qué hay cargado de cada club (generado)', 'si hace falta el detalle club por club', 'node tools/generate-club-index.js'],
  'Admin/INDICE-md.md': ['este índice (generado)', 'para saber qué documento leer y cuáles no los cita nadie', 'node tools/indice-md.mjs --escribir'],
  'Admin/sourcing/pendientes.md': ['pendientes de sourcing por liga (generado)', 'al arrancar una sesión de sourcing', 'node tools/faltantes-liga.mjs'],
};

const kb = (f) => (statSync(resolve(ROOT, f)).size / 1024).toFixed(1);
const primeras = (f, n = 12) => readFileSync(resolve(ROOT, f), 'utf8').split('\n').slice(0, n);

// la marca de cada documento
function marca(f) {
  if (GENERADOS[f]) return { que: GENERADOS[f][0], leer: GENERADOS[f][1], generador: GENERADOS[f][2] };
  const L = primeras(f);
  const m = L.join('\n').match(/<!--\s*md:\s*([^|]+?)\s*\|\s*leer:\s*([^>]+?)\s*-->/);
  if (m) return { que: m[1], leer: m[2] };
  if (/^---\n/.test(L.join('\n')) && /SKILL\.md$/.test(f)) {
    const d = readFileSync(resolve(ROOT, f), 'utf8').match(/^description:\s*(.+)$/m);
    if (d) return { que: d[1].replace(/\s+/g, ' ').slice(0, 150), leer: 'la skill se carga sola cuando la tarea es la suya' };
  }
  const s = L.join('\n').match(/\*Se abre ([^*]+?)\.\s/);
  if (s) return { que: (L.find((l) => l.startsWith('# ')) || '').replace(/^# /, ''), leer: s[1] };
  if (f === 'CLAUDE.md') return { que: 'instrucciones permanentes del proyecto (se carga sola)', leer: 'siempre' };
  const pais = f.match(/^\.claude\/skills\/club-sourcing\/paises\/(.+)\.md$/);
  if (pais) return { que: `regulador y gotchas de ${pais[1].replace(/-/g, ' ')}`, leer: 'al buscar documentos de ese país (solo el tuyo)', derivada: true };
  // un archivo que cuelga de una skill o de un README de su carpeta: lo dice quien lo cita; acá se toma su título
  const titulo = (L.find((l) => l.startsWith('# ')) || '').replace(/^# /, '');
  const cuelga = !/\/SKILL\.md$/.test(f) && (f.startsWith('.claude/skills/') || /^Admin\/transcripcion-subagentes\//.test(f));
  if (titulo && cuelga) return { que: titulo, leer: 'cuando lo manda su SKILL.md o el README de su carpeta', derivada: true };
  return null;
}

// quién cita a quién
const SOLO_HISTORIA = /^(Admin\/CHANGELOG\.md|Admin\/finance-of-sports-project\.md|Admin\/INDICE-md\.md)$/;
const fuentes = [...vivos.filter((f) => !SOLO_HISTORIA.test(f)), ...lista('tools', (n) => /\.(mjs|js)$/.test(n), true).filter((f) => !f.startsWith('tools/archivo')), 'netlify.toml']
  .filter((f) => existsSync(resolve(ROOT, f)));
const texto = Object.fromEntries(fuentes.map((f) => [f, readFileSync(resolve(ROOT, f), 'utf8')]));
const nombres = {}; for (const f of vivos) (nombres[basename(f)] ??= []).push(f);

function citas(f) {
  const b = basename(f); const unico = nombres[b].length === 1; const dir = dirname(f);
  const quien = [];
  for (const [g, t] of Object.entries(texto)) {
    if (g === f) continue;
    const porRuta = t.includes(f);
    // un nombre único se nombra suelto; uno repetido (README.md, reglas.md) solo por ruta o desde su propia carpeta
    const porNombre = t.includes(b) && (unico || dirname(g) === dir || (f.startsWith('.claude/skills/') && g.startsWith(dir)));
    if (porRuta || porNombre) quien.push(g);
  }
  return quien;
}
function sigueA(f) {
  const t = texto[f] ?? readFileSync(resolve(ROOT, f), 'utf8');
  return vivos.filter((g) => g !== f && (t.includes(g) || (nombres[basename(g)].length === 1 && t.includes(basename(g))))).filter((g) => !SOLO_HISTORIA.test(g));
}

const filas = vivos.map((f) => {
  const m = marca(f); const quien = citas(f);
  return { f, kb: kb(f), m, quien, sigue: sigueA(f) };
});
const EXENTOS_HUERFANO = (f) => f === 'CLAUDE.md' || /\/SKILL\.md$/.test(f); // se cargan solos
const huerfanos = filas.filter((x) => !x.quien.length && !EXENTOS_HUERFANO(x.f));
const sinMarca = filas.filter((x) => !x.m && !/^Admin\/propuestas\//.test(x.f));

function imprimirProblemas() {
  console.log(`Documentos vivos: ${filas.length} (${filas.reduce((s, x) => s + +x.kb, 0).toFixed(0)} KB) · carpetas aparte: ${CARPETAS.map((d) => `${d.replace('Admin/', '')} ${cuentaCarpeta(d)}`).join(', ')}`);
  console.log(`\nHuérfanos (${huerfanos.length}): ningún documento vivo ni tool los nombra`);
  for (const x of huerfanos) console.log(`  ${x.kb.padStart(6)} KB  ${x.f}${x.m ? '' : '  (sin marca)'}`);
  console.log(`\nSin marca (${sinMarca.length}): no dicen qué son ni cuándo se leen (primera línea: <!-- md: qué es | leer: cuándo -->)`);
  for (const x of sinMarca) console.log(`  ${x.f}`);
}

function indice() {
  const L = ['# Índice de documentos (generado)', '',
    '<!-- md: este índice (generado) | leer: para saber qué documento leer y cuáles no los cita nadie -->',
    '', 'Lo escribe `node tools/indice-md.mjs --escribir`; no se edita a mano. Cada fila: ruta · KB · qué es · cuándo se lee · cuántos documentos o tools lo citan (←) · a qué otros documentos vivos manda (→).',
    'Huérfano = nadie lo cita; sin marca = no declara qué es ni cuándo se lee (primera línea `<!-- md: qué es | leer: cuándo -->`).', ''];
  L.push(`Carpetas que se cuentan sin listar: ${CARPETAS.map((d) => `\`${d}\` ${cuentaCarpeta(d)}`).join(', ')}.`, '');
  const grupos = [['CLAUDE.md y Admin', (f) => f === 'CLAUDE.md' || /^Admin\/[^/]+\.md$/.test(f)], ['Admin/propuestas', (f) => /^Admin\/propuestas\//.test(f)],
    ['Admin: otras carpetas vivas', (f) => /^Admin\/(transcripcion-subagentes|outreach|difusion)\//.test(f)], ['Skills', (f) => f.startsWith('.claude/skills/')]];
  for (const [t, ok] of grupos) {
    L.push(`## ${t}`, '');
    for (const x of filas.filter((y) => ok(y.f))) {
      const marca_ = x.m ? `${x.m.que} · **leer:** ${x.m.leer}` : '(sin marca)';
      L.push(`- \`${x.f}\` · ${x.kb} KB · ${marca_} · ←${x.quien.length}${x.quien.length ? '' : ' huérfano'}${x.sigue.length ? ` · →${x.sigue.map((s) => s.replace(/^Admin\//, '').replace(/^\.claude\/skills\//, '')).slice(0, 6).join(', ')}` : ''}`);
    }
    L.push('');
  }
  return L.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

if (A.includes('--escribir')) { writeFileSync(SALIDA, indice(), 'utf8'); console.log(`escrito ${relative(ROOT, SALIDA)} (${filas.length} documentos)`); imprimirProblemas(); }
else if (A.includes('--check')) {
  const hay = existsSync(SALIDA) ? readFileSync(SALIDA, 'utf8') : '';
  if (hay !== indice()) { console.error('Admin/INDICE-md.md quedó viejo: node tools/indice-md.mjs --escribir'); process.exit(1); }
  console.log('indice-md: al día');
} else imprimirProblemas();

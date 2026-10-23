#!/usr/bin/env node
// ============================================================================
// tools/muestra.mjs — una muestra repartida de las líneas que cumplen un patrón, para ver cómo se ve antes de decidir una regla.
//
//   node tools/muestra.mjs "<regex>" [--en tools|Clubes|Admin|<carpeta>] [--n 30] [--ext .mjs,.js]
//
// Junta TODAS las líneas que cumplen la regex (JS, sin distinguir mayúsculas) y imprime n repartidas a intervalo fijo (una de cada k, la
// primera y la última incluidas), con archivo:línea y un recorte de ~200 caracteres alrededor de la coincidencia. Default: en tools/, 30 líneas,
// .mjs y .js (en Clubes/ y Admin/, .md). Es solo lectura; la cuenta de documentos y clubes de un patrón es `fos patron`.
// ============================================================================
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

export function recorrer(dir, exts, salida = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.git')) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) recorrer(p, exts, salida); else if (exts.some((x) => e.name.endsWith(x))) salida.push(p);
  }
  return salida;
}

export function repartir(lista, n) {
  if (lista.length <= n) return lista;
  return Array.from({ length: n }, (_, i) => lista[Math.round((i * (lista.length - 1)) / (n - 1 || 1))]);
}

export function muestra(patron, { en = 'tools', n = 30, exts } = {}) {
  const re = new RegExp(patron, 'i');
  const extensiones = exts || (['Clubes', 'Admin'].includes(en) ? ['.md'] : ['.mjs', '.js']);
  const hallazgos = [];
  for (const f of recorrer(join(ROOT, en), extensiones).sort()) {
    readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
      const m = re.exec(l);
      if (m) hallazgos.push(`${relative(ROOT, f)}:${i + 1}: ${l.slice(Math.max(0, m.index - 80), m.index + m[0].length + 120).trim()}`);
    });
  }
  return { total: hallazgos.length, lineas: repartir(hallazgos, n) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  const patron = A.find((a, i) => !a.startsWith('--') && !['--en', '--n', '--ext'].includes(A[i - 1]));
  if (!patron) { console.error('Uso: node tools/muestra.mjs "<regex>" [--en tools|Clubes|Admin] [--n 30] [--ext .mjs,.js]'); process.exit(1); }
  const r = muestra(patron, { en: v('--en') || 'tools', n: Number(v('--n')) || 30, exts: v('--ext')?.split(',') });
  console.log(r.lineas.join('\n'));
  console.log(`\n${r.lineas.length} de ${r.total} líneas que cumplen /${patron}/i`);
}

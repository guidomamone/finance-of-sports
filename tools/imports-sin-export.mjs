#!/usr/bin/env node
// tools/imports-sin-export.mjs — los nombres que una tool pide a otra ('./x.mjs') y la otra no exporta. Pasa al partir un módulo (`fos mover`) si
// un importador usaba un nombre que el original re-exportaba; un import dinámico (`const { a } = await import('./x.mjs')`) solo falla al correr
// esa rama (--escribir, un ensayo no la toca). Lee los fuentes como texto, no ejecuta nada. Lo usa audit.js (P1 `import-sin-export`).
// Uso: node tools/imports-sin-export.mjs (sale con 1 si hay alguno). Los módulos CommonJS (module.exports) se saltean.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const TOOLS = resolve(import.meta.dirname);

export function importsSinExport(dir = TOOLS) {
  const src = (f) => readFileSync(join(dir, f), 'utf8');
  const cache = new Map();
  const exportsDe = (f, vistos = new Set()) => {
    if (cache.has(f)) return cache.get(f);
    if (vistos.has(f)) return new Set();
    vistos.add(f);
    const s = src(f); const out = new Set();
    for (const m of s.matchAll(/^export\s+(?:async\s+)?(?:function\*?|const|let|var|class)\s+([A-Za-z0-9_$]+)/gm)) out.add(m[1]);
    for (const m of s.matchAll(/^export\s+(?:const|let|var)\s+\{([^}]*)\}/gm)) for (const n of m[1].split(',')) { const x = n.trim().split(':').pop().trim().split('=')[0].trim(); if (x) out.add(x); }
    for (const m of s.matchAll(/^export\s*\{([^}]*)\}/gm)) for (const n of m[1].split(',')) { const p = n.trim().split(/\s+as\s+/); const x = (p[1] || p[0]).trim(); if (x) out.add(x); }
    for (const m of s.matchAll(/^export\s*\*\s*from\s*'\.\/([^']+)'/gm)) for (const n of exportsDe(m[1], vistos)) out.add(n);
    if (/^export default/m.test(s)) out.add('default');
    cache.set(f, out); return out;
  };
  const esEsm = (f) => /^export\s/m.test(src(f));
  const faltan = [];
  for (const f of readdirSync(dir).filter((x) => /\.(mjs|js)$/.test(x))) {
    const s = src(f); const pares = [];
    for (const m of s.matchAll(/import\s*\{([^}]*)\}\s*from\s*'\.\/([^']+)'/g)) pares.push([m[2], m[1]]);
    for (const m of s.matchAll(/\{([^{}]*)\}\s*\)?\s*=\s*await\s+import\(\s*'\.\/([^']+)'\s*\)/g)) pares.push([m[2], m[1]]);
    for (const [mod, nombres] of pares) {
      if (!/\.(mjs|js)$/.test(mod) || !existsSync(join(dir, mod)) || !esEsm(mod)) continue;
      const ex = exportsDe(mod);
      for (const n of nombres.split(',')) {
        const x = n.trim().split(/\s+as\s+|:/)[0].trim().split('=')[0].trim();
        if (x && !ex.has(x)) faltan.push({ archivo: f, nombre: x, modulo: mod });
      }
    }
  }
  return faltan;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const f = importsSinExport();
  for (const x of f) console.log(`${x.archivo}: pide «${x.nombre}» de ${x.modulo} y no lo exporta`);
  console.log(f.length ? `${f.length} faltante(s)` : 'ningún faltante');
  process.exit(f.length ? 1 : 0);
}

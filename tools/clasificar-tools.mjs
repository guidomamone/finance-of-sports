#!/usr/bin/env node
// ============================================================================
// tools/clasificar-tools.mjs — ¿cada .js y .mjs de tools/ está clasificado respecto del pipeline? (TODO 376)
//
// POR QUÉ: el hook de commit (tools/hooks/pre-tool.mjs) exige una medición para las tools de tools/pipeline-tools.json. Una tool nueva que nadie
// clasifica se commitea sin medir, y un módulo compartido (vocabulario, ajustes, rutas…) que una tool del pipeline importa cambia lo que esa tool da
// sin estar en la tabla. Cada archivo de tools/ (solo el primer nivel; tools/hooks, tools/archivo y las carpetas de datos no cuentan) cae en UNA clase:
//   tools         está en `tools` de pipeline-tools.json (con medidores y alcance escritos a mano)
//   módulo        no está en la tabla pero una tool de la tabla lo importa (o lo llama como comando) directa o indirectamente: se calcula solo, y sus medidores son
//                 los de las tools que lo usan. Cambiarlo exige la misma medición.
//   no_pipeline   declarado de afuera en `no_pipeline` de pipeline-tools.json, con el motivo (sesión, sourcing, informe, medidor…)
//   sin_medidor   del pipeline pero sin medidor que lo ejercite todavía (`sin_medidor`, con el motivo): la deuda queda a la vista
//   sin clasificar  ninguna de las anteriores: `tool-sin-clasificar` en audit.js (P1). Se arregla sumándolo a `tools` o a `no_pipeline`.
// Una tool declarada `no_pipeline` que una tool de la tabla importa es una contradicción y también se avisa.
//
// USO:  node tools/clasificar-tools.mjs              resumen y problemas
//       node tools/clasificar-tools.mjs --check      sale con 1 si hay algún problema (lo corre audit.js)
//       node tools/clasificar-tools.mjs <archivo>    en qué clase está ese archivo y de quién depende
// ============================================================================
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const RAIZ = resolve(import.meta.dirname, '..');

export function clasificar(raiz = RAIZ) {
  const dir = resolve(raiz, 'tools');
  const T = JSON.parse(readFileSync(resolve(dir, 'pipeline-tools.json'), 'utf8'));
  const archivos = readdirSync(dir).filter((f) => /\.(mjs|js)$/.test(f));
  const imp = {};
  for (const f of archivos) {
    const txt = readFileSync(resolve(dir, f), 'utf8');
    const s = new Set();
    for (const m of txt.matchAll(/(?:from\s+|import\(\s*|require\(\s*)['"]\.\/([\w.-]+\.(?:mjs|js))['"]/g)) s.add(m[1]);
    for (const m of txt.matchAll(/['"`]tools\/([\w.-]+\.(?:mjs|js))['"`]/g)) s.add(m[1]);
    for (const m of txt.matchAll(/['"`]tools['"`]\s*,\s*['"`]([\w.-]+\.(?:mjs|js))['"`]/g)) s.add(m[1]); // resolve(ROOT, 'tools', 'x.mjs')
    s.delete(f);
    imp[f] = [...s].filter((x) => archivos.includes(x));
  }
  const enTabla = Object.keys(T.tools || {});
  const modulos = new Map(); // archivo -> { usadoPor: [tools de la tabla], medidores: [...] }
  for (const r of enTabla) {
    const visto = new Set(); const pila = [...(imp[r] || [])];
    while (pila.length) {
      const g = pila.pop();
      if (visto.has(g) || enTabla.includes(g)) continue;
      visto.add(g); pila.push(...(imp[g] || []));
      if (!modulos.has(g)) modulos.set(g, { usadoPor: [], medidores: [] });
      const m = modulos.get(g); m.usadoPor.push(r);
      for (const x of T.tools[r].medidores) if (!m.medidores.includes(x)) m.medidores.push(x);
    }
  }
  const noPipeline = T.no_pipeline || {}; const sinMedidor = T.sin_medidor || {};
  const clase = (f) => (enTabla.includes(f) ? 'tools' : modulos.has(f) ? 'modulo' : f in noPipeline ? 'no_pipeline' : f in sinMedidor ? 'sin_medidor' : 'sin_clasificar');
  const problemas = [];
  const sinClasificar = archivos.filter((f) => clase(f) === 'sin_clasificar');
  if (sinClasificar.length) problemas.push(`sin clasificar (sumarlas a «tools» o a «no_pipeline» de tools/pipeline-tools.json): ${sinClasificar.join(', ')}`);
  const inexistentes = [...enTabla, ...Object.keys(noPipeline), ...Object.keys(sinMedidor)].filter((f) => !existsSync(resolve(dir, f)));
  if (inexistentes.length) problemas.push(`nombradas en pipeline-tools.json pero no existen: ${inexistentes.join(', ')}`);
  const contradichas = Object.keys(noPipeline).filter((f) => modulos.has(f) || enTabla.includes(f));
  if (contradichas.length) problemas.push(`declaradas de afuera del pipeline pero las usa una tool de la tabla (${contradichas.map((f) => `${f} <- ${modulos.get(f)?.usadoPor[0] || 'la tabla'}`).join(', ')}): sacarlas de «no_pipeline»`);
  return { archivos, clase, modulos, imp, problemas, tabla: T };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const A = process.argv.slice(2);
  const C = clasificar();
  if (A.includes('--check')) {
    if (C.problemas.length) { console.error(C.problemas.join('\n')); process.exit(1); }
    console.log(`tools/ clasificadas (${C.archivos.length} archivos)`); process.exit(0);
  }
  const f = A.find((a) => !a.startsWith('--'))?.replace(/^tools\//, '');
  if (f) {
    const k = C.clase(f); const m = C.modulos.get(f);
    console.log(`${f}: ${k}${m ? ` — lo usa ${m.usadoPor.join(', ')}; medidores ${m.medidores.join(', ')}` : ''}${C.tabla.no_pipeline?.[f] ? ` — ${C.tabla.no_pipeline[f]}` : ''}${C.tabla.sin_medidor?.[f] ? ` — ${C.tabla.sin_medidor[f]}` : ''}`);
    process.exit(0);
  }
  const cuenta = {}; for (const a of C.archivos) cuenta[C.clase(a)] = (cuenta[C.clase(a)] || 0) + 1;
  console.log(`${C.archivos.length} archivos en tools/: ${JSON.stringify(cuenta)}`);
  if (C.problemas.length) console.log('\nPROBLEMAS:\n' + C.problemas.join('\n'));
}

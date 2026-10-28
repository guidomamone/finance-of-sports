#!/usr/bin/env node
// tools/probar-lookup-club-league.mjs — la prueba de lookup-club-league.mjs (ítem 10 del punto 478): sin el aviso MODULE_TYPELESS_PACKAGE_JSON y con todos sus llamadores apuntando al archivo que existe.
//   1. la salida de Envigado (--sin-anotar, no escribe) trae sus ligas y NO trae el aviso · 2. ninguna tool, config ni documento vivo nombra el viejo lookup-club-league.js
// Uso: node tools/probar-lookup-club-league.mjs    (~1 s; sale con 1 si algún caso falla)
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

const r = spawnSync('node', [join(ROOT, 'tools/lookup-club-league.mjs'), 'Envigado', '--pais', 'CO', '--sin-anotar'], { cwd: ROOT, encoding: 'utf8' });
caso('1. la salida trae las ligas de Envigado', r.status === 0 && /co-primeraA 2016: /.test(r.stdout), `${r.status} ${r.stdout.slice(0, 120)} ${r.stderr.slice(0, 200)}`);
caso('1. sin el aviso MODULE_TYPELESS_PACKAGE_JSON', !/MODULE_TYPELESS|Reparsing as ES module/.test(r.stdout + r.stderr), r.stderr.slice(0, 200));

const vivos = []; // dónde se nombra el archivo viejo: tools/ (sin el archivo de la historia), Admin/*.md vivos, skills y CLAUDE.md
const mirar = (dir, re) => { for (const f of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, f.name); if (f.isDirectory()) { if (!/^(Archive|mediciones|registros|archivo|node_modules)$/.test(f.name)) mirar(p, re); } else if (re.test(f.name) && f.name !== 'probar-lookup-club-league.mjs' && /lookup-club-league\.js/.test(readFileSync(p, 'utf8'))) vivos.push(p.slice(ROOT.length + 1)); } };
mirar(join(ROOT, 'tools'), /\.(mjs|js|json|md)$/); mirar(join(ROOT, '.claude'), /\.md$/);
for (const f of readdirSync(join(ROOT, 'Admin'))) if (/\.md$/.test(f) && f !== 'CHANGELOG.md' && /lookup-club-league\.js/.test(readFileSync(join(ROOT, 'Admin', f), 'utf8'))) vivos.push(`Admin/${f}`);
caso('2. nada vivo nombra lookup-club-league.js', vivos.length === 0 && !existsSync(join(ROOT, 'tools/lookup-club-league.js')), vivos.join(', '));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);

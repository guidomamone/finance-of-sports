#!/usr/bin/env node
// ============================================================================
// tools/hooks/session-start.mjs — HOOK SessionStart de Claude Code (TODO 389). Lo llama .claude/settings.json al abrir (o retomar) una sesión.
//
// Lo que imprime entra al contexto de cada sesión, así que son pocas líneas (10 como máximo) y solo lo que cambia o lo que una sesión
// tardaría una vuelta en averiguar: el modo, el árbol sin commitear, una medición muerta que dejó tools/ en la versión vieja y los tres
// primeros puntos del TODO. Una línea fija con los comandos de arranque. Nada de lo que ya dice CLAUDE.md.
// Entrada: el JSON del hook por stdin (cwd). Salida: texto. Prueba: node tools/hooks/probar-session-start.mjs
// ============================================================================
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

let entrada = {};
try { entrada = JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { /* sin entrada */ }
const raiz = entrada.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
const leer = (ruta) => { try { return readFileSync(join(raiz, ruta), 'utf8'); } catch { return ''; } };
const git = (...a) => { try { return execFileSync('git', a, { cwd: raiz, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };
if (!existsSync(join(raiz, 'Admin', 'TODO.md'))) process.exit(0); // otro repo

const L = [];
let modo = 'una-sesion'; try { modo = JSON.parse(leer('.claude/modo.json')).modo || modo; } catch { /* default */ }
L.push(`Modo: ${modo}.`);
const sucios = git('status', '--porcelain').split('\n').filter(Boolean);
if (sucios.length) {
  const c = {}; for (const l of sucios) { const d = l.slice(3).replace(/^"/, '').split('/')[0]; c[d] = (c[d] || 0) + 1; }
  L.push(`Árbol: ${sucios.length} archivos sin commitear (${Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([d, n]) => `${d} ${n}`).join(', ')}).`);
}
const respaldo = join(raiz, 'Admin', 'mediciones', 'pipeline', '_respaldo');
if (existsSync(respaldo) && readdirSync(respaldo).length) L.push(`¡Una medición murió a la mitad y tools/ puede estar en la versión vieja (${readdirSync(respaldo).slice(0, 3).join(', ')}…)! Corré: node tools/medir-pipeline.mjs --restaurar`);
if (existsSync(join(raiz, 'tools', 'todo-verificar.js'))) {
  const P = createRequire(import.meta.url)(join(raiz, 'tools', 'todo-verificar.js')).puntos(leer('Admin/TODO.md')).slice(0, 3);
  if (P.length) L.push(`Sigue: ${P.map((p) => `${p.id} ${p.titulo.replace(/^\([^)]*\):?\s*/, '').slice(0, 70)}`).join(' · ')}.`);
}
L.push('Arranque: fos mapa <tool> · fos medir pipeline · fos patron · fos causas · fos cerrar <id> (node tools/fos.mjs).');
process.stdout.write(`${L.slice(0, 10).join('\n')}\n`);

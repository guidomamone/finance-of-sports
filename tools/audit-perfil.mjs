// tools/audit-perfil.mjs — cuánto tarda cada chequeo de `audit.js` (solo mide; no cambia ningún chequeo ni su mensaje).
// Corre `node --cpu-prof tools/audit.js --quiet` en una carpeta temporal y suma el tiempo de cada función `check*`/`prueba*` (con lo que llama adentro).
// USO: node tools/audit-perfil.mjs [N]   los N chequeos más lentos (default 12), de más a menos, y el total de la corrida.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const top = Number(process.argv[2]) || 12;
const dir = mkdtempSync(join(tmpdir(), 'audit-perfil-'));
try {
  try { execFileSync('node', ['--cpu-prof', '--cpu-prof-dir', dir, join(ROOT, 'tools/audit.js'), '--quiet'], { cwd: ROOT, stdio: 'ignore', maxBuffer: 1e8 }); } catch { /* audit.js sale con 1 si hay P0/P1: el perfil se escribe igual */ }
  const f = readdirSync(dir).find((x) => x.endsWith('.cpuprofile'));
  if (!f) { console.error('No salió el perfil de CPU.'); process.exit(1); }
  const p = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  const porId = new Map(p.nodes.map((n) => [n.id, n])); const padre = new Map();
  for (const n of p.nodes) for (const c of n.children || []) padre.set(c, n.id);
  const propio = new Map(); p.samples.forEach((id, i) => propio.set(id, (propio.get(id) || 0) + (p.timeDeltas[i] || 0)));
  const por = new Map(); let total = 0;
  for (const [id, us] of propio) {
    total += us;
    let cur = id; let chequeo = null; // el chequeo MÁS externo de la cadena de llamadas: su tiempo incluye lo que llama
    while (cur != null) { const nombre = porId.get(cur).callFrame.functionName; if (/^(check|prueba)[A-Z]/.test(nombre)) chequeo = nombre; cur = padre.get(cur); }
    const k = chequeo || '(carga de módulos y el resto)'; por.set(k, (por.get(k) || 0) + us);
  }
  console.log(`audit.js completo: ${(total / 1e6).toFixed(1)} s de CPU\n`);
  for (const [k, us] of [...por].sort((a, b) => b[1] - a[1]).slice(0, top)) console.log(`${(us / 1e6).toFixed(2).padStart(6)} s  ${k}`);
} finally { rmSync(dir, { recursive: true, force: true }); }

// tools/con-worktree.mjs — `conWorktree(fn)`: prepara un git worktree descartable en HEAD con las tools de ESTE árbol (lo que tengas sin commitear), corre fn({ W, ROOT, principal }) y lo borra.
// POR QUÉ. Probar que una tool ESCRIBE de verdad (TODO 401) pide un árbol entero que se pueda ensuciar sin riesgo; cada prueba armaba el suyo. Con esto una prueba nueva es solo el
// escenario. La ruta es la REAL de la carpeta temporal (con /var → /private/var el `import.meta.url === file://argv[1]` de las tools no se cumple y salen en silencio con 0).
import { execFileSync } from 'node:child_process';
import { copyFileSync, readdirSync, realpathSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const git = (args, cwd = ROOT) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 1 << 28 });
export const principal = resolve(git(['rev-parse', '--path-format=absolute', '--git-common-dir']).trim(), '..');

export async function conWorktree(fn, nombre = 'prueba') {
  const W = join(realpathSync(tmpdir()), `${nombre}-${process.pid}`);
  git(['worktree', 'add', '--detach', W, 'HEAD']);
  try {
    for (const f of readdirSync(join(ROOT, 'tools'))) if (/\.(mjs|js|json)$/.test(f)) copyFileSync(join(ROOT, 'tools', f), join(W, 'tools', f));
    return await fn({ W, ROOT, principal });
  } finally {
    try { git(['worktree', 'remove', '--force', W]); } catch { /* ya no estaba */ }
  }
}

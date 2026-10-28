// tools/codigo-cambiado.mjs — ¿hay cambios sin commitear en el CÓDIGO que versiona ASSET_V (js/ y css/)? Los de data/ no cuentan: llevan su versión en data/manifiesto.js.
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

export function codigoCambiado(root = resolve(import.meta.dirname, '..')) {
  try { return execFileSync('git', ['status', '--porcelain', '--', 'js', 'css'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() !== ''; }
  catch { return true; } // sin git no se sabe: se sube, como antes
}

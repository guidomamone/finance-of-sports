// tools/prueba-fallo.mjs — qué imprime probar-todas.mjs cuando una prueba falla: las líneas «MAL» de siempre y, si no hay, la cola de lo que dijo la prueba (stdout y stderr), el motivo (código, tiempo agotado) y dónde queda la salida completa.
// POR QUÉ: probar-todas solo mostraba las líneas que empiezan con «MAL» (la convención de las probar-*.mjs); prueba-escribir.mjs termina con «prueba-escribir: FALLÓ: …» y cerrar-tool solo decía «1 prueba(s) fallan»: hubo que correr la prueba aparte para ver por qué.
// ENTRADA: { status, stdout, stderr, error } de un spawnSync. SALIDA: las líneas a imprimir (sin ruido de git worktree ni líneas vacías). USO: import { resumenFallo } from './prueba-fallo.mjs'.  Prueba: node tools/probar-prueba-fallo.mjs
const RUIDO = /^(Updating files:|Preparing worktree|HEAD is now at|Note: switching|\s*$)/;
export function resumenFallo({ status, stdout = '', stderr = '', error = null }, { max = 8 } = {}) {
  const lineas = (t) => String(t || '').split('\n').filter((l) => !RUIDO.test(l));
  const mal = lineas(stdout).filter((l) => /^MAL/.test(l)).slice(0, 3);
  const out = [...mal];
  if (!mal.length) { const cola = [...lineas(stdout), ...lineas(stderr)].slice(-max); out.push(...cola.map((l) => `  | ${l.slice(0, 400)}`)); }
  if (status == null) out.push(error?.code === 'ETIMEDOUT' || /ETIMEDOUT|timed out/i.test(String(error?.message || '')) ? '(no terminó: tiempo agotado)' : `(no terminó: ${String(error?.message || 'sin código de salida').slice(0, 120)})`);
  else out.push(`(salió con código ${status})`);
  return out;
}

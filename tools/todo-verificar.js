// ============================================================================
// tools/todo-verificar.js — LA VERIFICACIÓN DE CADA PUNTO DE Admin/TODO.md, para que un punto ya cumplido (o uno cerrado de más) lo vea una máquina y no la memoria de una sesión.
//
// POR QUÉ. Un punto del TODO se quedaba abierto después de hecho (el 347 y el 359 llegaron a una sesión con la mitad ya resuelta) o se cerraba sin cumplirse. Cada punto declara en su cuerpo una o
// más líneas `Verificar: <condición>` que esta función evalúa:
//
//   Verificar: audit <código> [«texto»] <op> <n>       cuántos hallazgos de audit.js (sin silenciar) tienen ese código, y el texto en el mensaje si se da; op: = < <= > >=
//   Verificar: existe <ruta>                           el archivo o la carpeta existe (desde la raíz del repo)
//   Verificar: no-existe <ruta>
//   Verificar: contiene <ruta> | <texto>               el archivo tiene ese texto
//   Verificar: no-contiene <ruta> | <texto>
//   Verificar: manual                                  no se puede comprobar con una máquina (queda a la vista, pero no se cierra solo)
//
// Si todas las líneas de un punto se cumplen, `audit.js` avisa `todo-cumplido` (P3: hay que cerrarlo con `node tools/todo.mjs --cerrar <id>`); un punto sin ninguna línea Verificar da
// `todo-sin-verificar`. Lo usan `tools/audit.js` (los avisos), `tools/todo.mjs` (`--verificar`, y `--cerrar` se niega si el punto no cumple) y nadie más.
// ============================================================================
const fs = require('fs');
const path = require('path');

// -> [{ orden, id, titulo, verificar: [condición] }] a partir del texto de Admin/TODO.md
function puntos(texto) {
  const L = String(texto).split('\n'); const out = [];
  for (let i = 0; i < L.length; i++) {
    const m = /^### (\d+)\. (\d{3}) · (.*)$/.exec(L[i]); if (!m) continue;
    const p = { orden: Number(m[1]), id: m[2], titulo: m[3], verificar: [] };
    for (let j = i + 1; j < L.length && !/^##+ /.test(L[j]); j++) { const v = /^Verificar:\s*(.+?)\s*$/.exec(L[j]); if (v) p.verificar.push(v[1]); }
    out.push(p);
  }
  return out;
}

const COMPARA = { '=': (a, b) => a === b, '<': (a, b) => a < b, '<=': (a, b) => a <= b, '>': (a, b) => a > b, '>=': (a, b) => a >= b };

// -> { ok: true | false | null, detalle } ; null = manual (no se puede decidir) o condición mal escrita (el detalle lo dice)
function evaluar(expr, findings, root) {
  const e = String(expr).trim();
  if (/^manual\b/i.test(e)) return { ok: null, detalle: 'manual' };
  let m;
  if ((m = /^audit\s+(\S+)(?:\s+"([^"]*)")?\s*(<=|>=|=|<|>)\s*(\d+)$/.exec(e))) {
    const n = (findings || []).filter((f) => f.code === m[1] && (!m[2] || String(f.msg).includes(m[2]))).length;
    return { ok: COMPARA[m[3]](n, Number(m[4])), detalle: `${m[1]}${m[2] ? ` «${m[2]}»` : ''}: hay ${n}, se pide ${m[3]} ${m[4]}` };
  }
  if ((m = /^(existe|no-existe)\s+(.+)$/.exec(e))) {
    const hay = fs.existsSync(path.join(root, m[2].trim()));
    return { ok: m[1] === 'existe' ? hay : !hay, detalle: `${m[2].trim()} ${hay ? 'existe' : 'no existe'}` };
  }
  if ((m = /^(contiene|no-contiene)\s+(.+?)\s*\|\s*(.+)$/.exec(e))) {
    let t = ''; try { t = fs.readFileSync(path.join(root, m[2].trim()), 'utf8'); } catch { /* sin archivo: no contiene */ }
    const hay = t.includes(m[3].trim());
    return { ok: m[1] === 'contiene' ? hay : !hay, detalle: `${m[2].trim()} ${hay ? 'tiene' : 'no tiene'} «${m[3].trim()}»` };
  }
  return { ok: null, detalle: `condición que no entiendo: «${e}»` };
}

module.exports = { puntos, evaluar };

// tools/sello-audit.js — el SELLO de la última auditoría que dio P0 0 y P1 0, para que el hook de commit no repita una auditoría idéntica.
// POR QUÉ. Cargar un año audita dos veces lo mismo: `cargar --escribir` corre `audit.js --quiet` (y revierte si da P0/P1) y, enseguida, el hook de `git commit` vuelve a correrlo sobre el
// MISMO árbol (~12 s cada una). El sello dice «esta auditoría pasó sobre este estado exacto»; el hook lo reconoce y no la repite. No saca ni afloja ningún chequeo: ante la menor diferencia el hook audita como siempre.
// EL ESTADO que se sella (sha1): el commit HEAD, el día (hay chequeos con fecha), y, de cada archivo que `git status` lista (modificado, borrado o sin trackear, sin mirar si está en el índice), su tamaño y su mtime en
// milisegundos. Lo que no está en esa lista es idéntico a HEAD, y HEAD está en el estado. Cualquier edición, archivo nuevo, commit o `git add` que cambie el árbol cambia el estado y el sello deja de valer.
// EL SELLO vive en `.git/fos-audit-sello.json` (nunca se trackea ni aparece en `git status`). `audit.js` lo escribe al terminar sin P0 ni P1; el hook de pre-tool lo consulta.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const git = (raiz, a) => execFileSync('git', a, { cwd: raiz, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] });

function estadoDelArbol(raiz) {
  const h = crypto.createHash('sha1');
  h.update(`${git(raiz, ['rev-parse', 'HEAD']).trim()}|${new Date().toISOString().slice(0, 10)}\n`);
  const rutas = new Set(git(raiz, ['status', '--porcelain=v1', '-z', '-uall']).split('\0').filter(Boolean).map((e) => e.slice(3)));
  for (const r of [...rutas].sort()) {
    let s = null; try { s = fs.statSync(path.join(raiz, r)); } catch { /* borrado */ }
    h.update(`${r}|${s ? `${s.size}|${s.mtimeMs}` : 'x'}\n`);
  }
  return h.digest('hex');
}
const archivo = (raiz) => path.join(raiz, '.git', 'fos-audit-sello.json');

// `estado`: el que tenía el árbol cuando ARRANCÓ la auditoría (audit.js lo toma al empezar): si algo cambió mientras corría, el sello no coincide con el árbol de ahora y el hook audita.
function escribirSello(raiz, estado) {
  try { fs.writeFileSync(archivo(raiz), JSON.stringify({ estado, ts: new Date().toISOString() })); } catch { /* sin sello: el hook audita */ }
}
function selloVale(raiz) {
  try { return JSON.parse(fs.readFileSync(archivo(raiz), 'utf8')).estado === estadoDelArbol(raiz); } catch { return false; }
}
function borrarSello(raiz) { try { fs.rmSync(archivo(raiz), { force: true }); } catch { /* nada */ } }

module.exports = { estadoDelArbol, escribirSello, selloVale, borrarSello };

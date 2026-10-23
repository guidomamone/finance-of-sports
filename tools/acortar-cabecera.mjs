#!/usr/bin/env node
// ============================================================================
// tools/acortar-cabecera.mjs — acorta la cabecera de una tool sin perder nada: deja el principio (el porqué y qué hace) y el USO, y el resto va TAL CUAL a
// Admin/NOTAS-DE-TOOLS.md, en una sección con el nombre de la tool, con una línea que la cita. Solo toca comentarios.
//
//   node tools/acortar-cabecera.mjs <tool.mjs …> | --todas [--cabeza 22] [--uso 12] [--escribir]
//
// Una cabecera de CABECERA_MAX líneas o menos no se toca. Ensayo por defecto: dice cuántas líneas quedarían y cuántas van a las notas. Con --escribir
// reescribe la tool y la sección de las notas; después `node tools/comparar-sin-comentarios.js --tools` prueba que el código no cambió (esta tool lo corre sola).
// Corta el principio en un renglón vacío o una raya de sección (no a la mitad de un párrafo) y conserva las primeras --uso líneas del bloque «USO».
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const { CABECERA_MAX } = createRequire(import.meta.url)('./comparar-sin-comentarios.js');
const NOTAS = join(ROOT, 'Admin', 'NOTAS-DE-TOOLS.md');
const esRaya = (l) => /^\/\/\s*(?:-{10,}|={10,})\s*$/.test(l);
const vacio = (l) => /^\/\/\s*$/.test(l);

// { fin: cuántas líneas tiene la cabecera, cabeza, medio[], uso[] } para una tool; null si no hace falta acortarla
export function partir(src, { cabeza = 22, uso = 12 } = {}) {
  const L = src.split('\n');
  let fin = 0;
  while (fin < L.length && (L[fin].startsWith('//') || L[fin].startsWith('#!') || L[fin].trim() === '')) fin++;
  const finBruto = fin; // el aviso de audit.js cuenta también los renglones vacíos del final
  while (fin > 0 && L[fin - 1].trim() === '') fin--;
  if (finBruto <= CABECERA_MAX) return null;
  const cierre = esRaya(L[fin - 1]) && /=/.test(L[fin - 1]) ? 1 : 0; // la raya final se conserva
  const cuerpoFin = fin - cierre;
  // dónde empieza el bloque USO (con su raya de arriba, si la hay)
  let u = -1;
  for (let i = Math.min(cabeza, cuerpoFin); i < cuerpoFin; i++) if (/^\/\/\s*USO\b/i.test(L[i])) { u = i; break; }
  if (u > 0 && esRaya(L[u - 1])) u--;
  const finCuerpoCabeza = u >= 0 ? u : cuerpoFin;
  // corte de la cabeza: el último renglón vacío o raya a la altura de `cabeza` o antes
  const buena = (i) => vacio(L[i]) || esRaya(L[i]);
  let p = Math.min(cabeza, finCuerpoCabeza), q = p;
  while (q > Math.max(3, p - 14) && !buena(q)) q--; // el renglón vacío o la raya más cercana hacia arriba (hasta 14 líneas)…
  if (!buena(q)) { q = p; while (q < Math.min(finCuerpoCabeza, p + 10) && !buena(q)) q++; } // …o hacia abajo (hasta 10)
  if (buena(q)) p = q;
  // un título huérfano (rayas y un párrafo de hasta 3 líneas justo antes del corte) no se deja sin su cuerpo: se va con él
  let k = p;
  while (k > 6) {
    while (k > 6 && buena(k - 1)) k--;
    let j = k; while (j > 6 && !buena(j - 1)) j--;
    if (k - j <= 3 && j > 6) k = j; else break;
  }
  if (k > 6) p = k;
  const medio = L.slice(p, finCuerpoCabeza);
  const bloqueUso = u >= 0 ? L.slice(u, cuerpoFin) : [];
  const usoCorto = bloqueUso.slice(0, uso);
  const usoResto = bloqueUso.slice(uso);
  return { L, fin, p, cabeza: L.slice(0, p), medio, usoCorto, usoResto, cierre: cierre ? [L[fin - 1]] : [] };
}

export function acortar(nombre, src, opts) {
  const r = partir(src, opts);
  if (!r) return null;
  const puntero = `// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «${nombre}».`;
  const nuevo = [...r.cabeza.filter((l, i) => i < r.p), ...(vacio(r.cabeza.at(-1) ?? '') ? [] : ['//']), puntero, ...(r.usoCorto.length ? ['//', ...r.usoCorto] : []), ...r.cierre, ...r.L.slice(r.fin)];
  const movido = [...r.medio, ...(r.usoResto.length ? ['// (sigue el USO)', ...r.usoResto] : [])];
  return { src: nuevo.join('\n'), movido, antes: r.fin, despues: nuevo.findIndex((l, i) => i > 0 && !(l.startsWith('//') || l.startsWith('#!') || l.trim() === '')) };
}

function escribirNotas(nombre, movido) {
  const cuerpo = movido.map((l) => l.replace(/^\/\/ ?/, '')).join('\n').replace(/^\n+|\n+$/g, '');
  const seccion = `## ${nombre}\n\n\`\`\`text\n${cuerpo}\n\`\`\`\n`;
  let t = existsSync(NOTAS) ? readFileSync(NOTAS, 'utf8') : '<!-- md: lo que las cabeceras de las tools tenían de más (campos, casos, medidas), tal cual, una sección por tool | leer: al tocar una tool cuya cabecera apunta acá -->\n# Notas de las tools\n\nLo que se sacó de la cabecera de una tool para que no se lea en cada sesión que la abre. Lo escribe `node tools/acortar-cabecera.mjs`; el texto es el original, sin cambios.\n';
  const re = new RegExp(`\\n## ${nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n[\\s\\S]*?(?=\\n## |$)`);
  t = re.test(t) ? t.replace(re, `\n${seccion}`) : `${t.replace(/\n*$/, '\n')}\n${seccion}`;
  writeFileSync(NOTAS, t);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  const escribir = A.includes('--escribir');
  const opts = { cabeza: Number(v('--cabeza')) || 22, uso: Number(v('--uso')) || 12 };
  const dados = A.filter((a, k) => !a.startsWith('--') && !['--cabeza', '--uso'].includes(A[k - 1]));
  const nombres = A.includes('--todas') ? readdirSync(join(ROOT, 'tools')).filter((f) => /\.(mjs|js)$/.test(f)).sort() : dados.map((d) => d.replace(/^tools\//, ''));
  if (!nombres.length) { console.error('Uso: node tools/acortar-cabecera.mjs <tool.mjs …> | --todas [--cabeza 22] [--uso 12] [--escribir]'); process.exit(1); }
  if (escribir) {
    const sucias = execFileSync('git', ['status', '--porcelain', '--', ...nombres.map((n) => `tools/${n}`)], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
    if (sucias.length && !A.includes('--forzar')) { console.error(`No se escribe: ${sucias.map((l) => l.slice(3)).join(', ')} tiene cambios sin commitear. Commitealos primero (--forzar lo salta).`); process.exit(1); }
  }
  let tocadas = 0, movidas = 0;
  for (const n of nombres) {
    const ruta = join(ROOT, 'tools', n);
    const src = readFileSync(ruta, 'utf8');
    const r = acortar(n, src, opts);
    if (!r) continue;
    tocadas++; movidas += r.movido.length;
    console.log(`  ${n.padEnd(36)} cabecera ${r.antes} → ${r.despues} líneas; ${r.movido.length} a las notas`);
    if (escribir) { escribirNotas(n, r.movido); writeFileSync(ruta, r.src); }
  }
  console.log(`${escribir ? 'Acortadas' : 'Acortaría'} ${tocadas} cabecera(s); ${movidas} líneas ${escribir ? 'pasaron' : 'pasarían'} a Admin/NOTAS-DE-TOOLS.md.`);
  if (escribir && tocadas) {
    try { console.log(execFileSync('node', ['tools/comparar-sin-comentarios.js', '--tools'], { cwd: ROOT, encoding: 'utf8' }).trim().split('\n').pop()); }
    catch (e) { console.error(`¡La comparación sin comentarios falla!\n${e.stdout || ''}`); process.exit(1); }
  }
}

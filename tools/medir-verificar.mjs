#!/usr/bin/env node
// ============================================================================
// medir-verificar.mjs — mide un cambio de tools/verificar.mjs ANTES y DESPUÉS sobre una lista de prueba
// ============================================================================
//
// POR QUÉ: `lote.mjs --lista Admin/lotes/prueba-*.txt` saltea desde la etapa 3 los documentos cuyo año ya está en el sitio, así que su
// ensayo ya no mide la verificación de lo cargado (que es justamente lo que un cambio no tiene que romper). Esto corre verificar.mjs
// (--rubros, como el lote) sobre la lista y guarda, por documento, el estado (OK / COLA / ...), los totales y cada línea que suma
// (etiqueta, lado, importe, origen), más el financiero, el impuesto y los totales (con el resultado que se carga). Dos corridas se comparan con --comparar.
//
// SIN EFECTOS AL COSTADO: verificar.mjs agrega casos a la cola, cierra obsoletos y reescribe los derivados de Generados/. Antes de correr se
// copian Admin/registros/ y los derivados de cada documento de la lista; al terminar se restauran (y se borra lo que no existía). La cola
// de la corrida va además a una copia (COLA_ARCHIVO), como en medir-cargar.mjs. No correr con un lote corriendo.
//
// Lo que se espera de un cambio que entra: los documentos que ya cerraban, idénticos (lo cargado sale de su .verificacion.json); las
// diferencias, solo en los documentos que el cambio quiere destrabar, explicadas una por una.
//
// USO (desde la raíz; ~1 s por documento):
//   node tools/medir-verificar.mjs --lista Admin/lotes/prueba-mediana.txt --salida /tmp/antes.jsonl
//   node tools/medir-verificar.mjs --lista Admin/lotes/prueba-mediana.txt --salida /tmp/despues.jsonl
//   node tools/medir-verificar.mjs --comparar /tmp/antes.jsonl /tmp/despues.jsonl
//
// --pasadas N (default 1): corre verificar.mjs N veces antes de restaurar. Con 2, cada documento ve la verificación NUEVA de su vecino
// (el chequeo del año vecino lee del .verificacion.json del otro con qué lectura y escalón cerró): hace falta para un cambio que cambia
// cómo cierra un documento. Antes y después, con el mismo N.
// --script <tools/archivo.mjs> (default tools/verificar.mjs): para medir el ANTES con una copia de la versión vieja dentro de tools/.
// --filas <modelo>: verificar.mjs lee, en lugar del .filas.json de cada documento, el .filas.<modelo>.json de extraer.mjs --modelo
// (sin ese archivo, el documento queda sin filas y sale como error). El .filas.json original se restaura al final con el resto.
// ============================================================================

import { readdirSync, existsSync, readFileSync, writeFileSync, copyFileSync, mkdirSync, rmSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
const r6 = (x) => (typeof x === 'number' ? Math.round(x * 1e6) / 1e6 : x);

const FILAS = flag('--filas');
const baseDe = (pdf) => join(ROOT, 'Generados', pdf.replace(/^Clubes\//, '').replace(/\.pdf$/i, ''));
const derivados = (pdf) => { // Clubes/<País>/<Club>/<doc>.pdf -> Generados/<País>/<Club>/<doc>.<ext>
  return ['.verificacion.json', '.rubros.json', ...(FILAS ? ['.filas.json'] : [])].map((e) => baseDe(pdf) + e);
};

function medir(lista, salida, pasadas = 1, script = 'tools/verificar.mjs') {
  const docs = readFileSync(resolve(ROOT, lista), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  const copia = mkdtempSync(join(tmpdir(), 'medir-verificar-'));
  // 1. copia de seguridad: los registros enteros y los derivados de la lista
  const reg = join(ROOT, 'Admin/registros');
  const archivosReg = readdirSync(reg).filter((f) => !f.startsWith('.') && /\.(jsonl|txt|json)$/.test(f));
  for (const f of archivosReg) copyFileSync(join(reg, f), join(copia, f));
  const previos = new Map(); // derivado -> ruta de su copia (o null si no existía)
  docs.forEach((pdf, i) => derivados(pdf).forEach((d, j) => { if (existsSync(d)) { const c = join(copia, `d${i}-${j}`); copyFileSync(d, c); previos.set(d, c); } else previos.set(d, null); }));
  // --filas: las filas del modelo en lugar de las de la carga (la copia de seguridad ya está hecha arriba)
  if (FILAS) for (const pdf of docs) { const alt = `${baseDe(pdf)}.filas.${FILAS}.json`; const f = `${baseDe(pdf)}.filas.json`; if (existsSync(alt)) copyFileSync(alt, f); else if (existsSync(f)) rmSync(f); }
  const cola = `${salida}.cola.jsonl`; copyFileSync(join(reg, 'cola-revision.jsonl'), cola);
  let out = '';
  try {
    for (let p = 0; p < pasadas; p++) out = execFileSync('node', [script, '--lista', lista, '--rubros'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28, env: { ...process.env, COLA_ARCHIVO: cola }, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) { out = String(e.stdout || ''); console.error('verificar.mjs terminó con error:', String(e.stderr || e.message).slice(0, 500)); }
  // 2. lo que dejó cada documento
  const estadoDe = new Map();
  for (const m of out.matchAll(/^## (.+?\.pdf): (\S+)(.*)$/gm)) estadoDe.set(m[1], `${m[2]}${m[3]}`.trim());
  const filas = docs.map((pdf) => {
    const [pv] = derivados(pdf);
    let v = null; try { v = JSON.parse(readFileSync(pv, 'utf8')); } catch { /* sin verificación */ }
    const lin = (arr) => (arr || []).map((f) => [f.lado, f.etiqueta, r6(f.M), f.linea ?? null, f.origen || '']);
    return { pdf, estado: estadoDe.get(pdf) || '(sin salida)', lineas: v ? lin(v.lineas) : null, financiero: v ? lin(v.financiero) : null, impuesto: v ? lin(v.impuesto) : null, totales: v ? v.totales || null : null };
  });
  writeFileSync(salida, filas.map((f) => JSON.stringify(f)).join('\n') + '\n');
  // 3. restaurar
  for (const f of archivosReg) copyFileSync(join(copia, f), join(reg, f));
  for (const [d, c] of previos) { if (c) { mkdirSync(dirname(d), { recursive: true }); copyFileSync(c, d); } else if (existsSync(d)) rmSync(d); }
  rmSync(copia, { recursive: true, force: true });
  const n = (re) => filas.filter((f) => re.test(f.estado)).length;
  console.log(`${filas.length} documentos medidos -> ${salida} (OK ${n(/^OK/)}, COLA ${n(/^COLA/)}, otros ${filas.length - n(/^OK/) - n(/^COLA/)}). Registros y derivados restaurados.`);
}

function comparar(a, b) {
  const leer = (p) => new Map(readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { const o = JSON.parse(l); return [o.pdf, o]; }));
  const A1 = leer(a); const B1 = leer(b);
  let iguales = 0; const cambios = [];
  for (const [pdf, x] of A1) {
    const y = B1.get(pdf);
    if (!y) { cambios.push(`${pdf}: falta en ${b}`); continue; }
    const mismo = (k) => JSON.stringify(x[k]) === JSON.stringify(y[k]);
    if (mismo('estado') && mismo('lineas') && mismo('financiero') && mismo('impuesto') && mismo('totales')) { iguales++; continue; }
    const det = [];
    if (!mismo('estado')) det.push(`  estado: ${x.estado}\n       -> ${y.estado}`);
    if (!mismo('totales')) det.push(`  totales: ${JSON.stringify(x.totales)}\n       -> ${JSON.stringify(y.totales)}`);
    for (const k of ['lineas', 'financiero', 'impuesto']) {
      if (mismo(k)) continue;
      const s = (arr) => new Set((arr || []).map((r) => JSON.stringify(r)));
      const sa = s(x[k]); const sb = s(y[k]);
      for (const r of sa) if (!sb.has(r)) det.push(`  ${k} sale:  ${r}`);
      for (const r of sb) if (!sa.has(r)) det.push(`  ${k} entra: ${r}`);
    }
    cambios.push(`${pdf}\n${det.join('\n')}`);
  }
  for (const pdf of B1.keys()) if (!A1.has(pdf)) cambios.push(`${pdf}: solo en ${b}`);
  console.log(`${iguales} documentos idénticos, ${cambios.length} con diferencias.`);
  if (cambios.length) console.log('\n' + cambios.join('\n\n'));
}

if (flag('--comparar')) comparar(flag('--comparar'), A[A.indexOf('--comparar') + 2]);
else if (flag('--lista') && flag('--salida')) medir(flag('--lista'), resolve(flag('--salida')), Number(flag('--pasadas') || 1), flag('--script') || 'tools/verificar.mjs');
else { console.error('Uso: node tools/medir-verificar.mjs --lista <lista> --salida <archivo.jsonl>  |  --comparar <antes.jsonl> <despues.jsonl>'); process.exit(1); }

// tools/comparar-carga.mjs — el ensayo de `cargar` de un documento contra lo que el año tiene cargado en data/<país>/<clubId>.json: qué frena, los totales de ingresos y gastos y, línea por línea, cuáles cambian de categoría.
// POR QUÉ. Antes de recargar un año (`cargar --reemplazar --escribir`) hay que ver qué cambia y que los totales den lo mismo; el ensayo imprime 85 KB de JSON y se armaba un script suelto en el scratchpad cada vez; esto lo reemplaza.
// No escribe nada: el ensayo de cargar deja líneas en Admin/registros (api/jev.jsonl, tipos-sin-desglose.jsonl, categorias-aprendidas.jsonl); las que estaban limpias antes se restauran con `git checkout` al terminar.
// USO: node tools/fos.mjs comparar-carga "<ruta del pdf>" [--sin-reemplazar]    (por defecto el ensayo es `--desde-verificacion --reemplazar`, el que precede a la recarga de un año ya cargado)
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2); const pdf = args.find((a) => !a.startsWith('--'));
if (!pdf) { console.error('Uso: node tools/fos.mjs comparar-carga "<ruta del pdf>" [--sin-reemplazar]'); process.exit(1); }
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1e8 });
const sucios = () => new Set(git('status', '--porcelain', '--', 'Admin/registros').split('\n').filter(Boolean).map((l) => l.slice(3)));
const antes = sucios();
let salida;
try { salida = execFileSync('node', ['tools/cargar.mjs', pdf, '--desde-verificacion', ...(args.includes('--sin-reemplazar') ? [] : ['--reemplazar'])], { cwd: ROOT, maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); }
finally { const tocados = [...sucios()].filter((f) => !antes.has(f)); if (tocados.length) git('checkout', '--', ...tocados); }
const r = JSON.parse(salida.slice(salida.indexOf('{')));
const { clubId, year } = r.ejercicio; const ruta = resolve(ROOT, 'data', clubId.split('-').pop(), `${clubId}.json`);
const y = existsSync(ruta) ? (JSON.parse(readFileSync(ruta, 'utf8')).years || []).find((x) => String(x.fiscal_year) === String(year)) : null;
console.log(`${clubId} ${year} · frena: ${r.frena.length ? r.frena.map((f) => `${f.etapa}: ${String(f.motivo).slice(0, 160)}`).join(' | ') : 'no'}`);
for (const a of (r.avisos || []).filter((x) => /esperan|no cierra|ningún total|colapsa/i.test(x))) console.log(`  aviso: ${a.slice(0, 200)}`);
if (!y) { console.log('El año no está cargado: no hay con qué comparar.'); process.exit(0); }
const suma = (a) => a.reduce((s, x) => s + (x.amt || 0), 0).toFixed(3);
let cambian = 0;
for (const [lado, nk, vk] of [['ingresos', 'revenueLines', 'revenue'], ['gastos', 'expenseLines', 'expenses']]) {
  const nuevas = (r.ejercicio[nk] || []).map((l) => ({ label: l.rawLabel, cat: l.normalizedCategory, amt: l.amountNative }));
  const viejas = (y[vk] || []).map((l) => ({ label: l.label, cat: l.subcategory, amt: l.amount_native ?? l.amount }));
  console.log(`${lado}: recarga ${nuevas.length} líneas (suma ${suma(nuevas)}) · cargadas ${viejas.length} (suma ${suma(viejas)})${suma(nuevas) === suma(viejas) ? '' : '  ← LA SUMA CAMBIA'}`);
  const usada = new Set();
  for (const n of nuevas) {
    const i = viejas.findIndex((v, k) => !usada.has(k) && v.label === n.label && Math.abs(Math.abs(v.amt) - Math.abs(n.amt)) < 1e-6);
    if (i < 0) { console.log(`  SOLO EN LA RECARGA  ${n.label} ${n.cat} ${n.amt}`); cambian++; continue; }
    usada.add(i); if (viejas[i].cat !== n.cat) { console.log(`  CAMBIA  ${n.label} ${n.amt}: ${viejas[i].cat} -> ${n.cat}`); cambian++; }
  }
  viejas.forEach((v, k) => { if (!usada.has(k)) { console.log(`  SOLO EN LO CARGADO  ${v.label} ${v.cat} ${v.amt}`); cambian++; } });
}
console.log(cambian ? `${cambian} línea(s) cambian.` : 'La recarga da lo mismo que lo cargado.');

// tools/probar-cache-audit.mjs — `fos probar-cache-audit`: la auditoría con la caja de tools/audit-cache.js da EXACTAMENTE los mismos hallazgos que sin ella (`--sin-cache`).
// QUÉ COMPRUEBA, en orden (cada paso compara el JSON completo de hallazgos y silenciados de las dos corridas):
//   1. el árbol tal cual: sin caja, con la caja en frío (la llena) y con la caja caliente;
//   2. un error plantado en cada chequeo con caja: una coma comida en un .md de Clubes/, un «PDF» que es HTML y un nombre sin definir en tools/: la caja tiene que mostrarlo, y mostrar que desapareció cuando se arregla (la clave cambia);
//   3. que `--sin-cache` no toque la caja.
// Los archivos de prueba (Clubes/_prueba-cache-audit/, tools/_prueba-cache-audit.mjs) se crean y se borran acá, aunque la prueba falle. Tarda ~3 minutos (14 corridas de la auditoría). Sale con 1 si algo difiere.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const CAJA = join(ROOT, '.git', 'fos-audit-cache.json');
const DIR = join(ROOT, 'Clubes', '_prueba-cache-audit'); const MD = join(DIR, 'tabla.md'); const PDF = join(DIR, 'falso.pdf'); const TOOL = join(ROOT, 'tools', '_prueba-cache-audit.mjs');

function auditar(sinCache) {
  let out; try { out = execFileSync('node', [join(ROOT, 'tools', 'audit.js'), '--json', ...(sinCache ? ['--sin-cache'] : [])], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }); } catch (e) { out = e.stdout; } // P0 o P1 da salida distinta de cero: igual se compara
  const j = JSON.parse(out); return { findings: j.findings, silenciados: j.silenciados };
}
const texto = (r) => JSON.stringify(r);
const con = (r, code, trozo) => r.findings.some((f) => f.code === code && f.msg.includes(trozo));
let fallos = 0; const t0 = Date.now();
const ok = (c, m) => { console.log(`  ${c ? 'ok ' : 'MAL'} ${m}`); if (!c) fallos++; };
const igual = (nombre, a, b) => ok(texto(a) === texto(b), `${nombre}: ${a.findings.length} hallazgos y ${a.silenciados.length} silenciados, idénticos con y sin caja`);
const limpiar = () => { rmSync(DIR, { recursive: true, force: true }); rmSync(TOOL, { force: true }); };

try {
  limpiar(); rmSync(CAJA, { force: true });
  console.log('1. el árbol tal cual');
  const A = auditar(true); ok(!existsSync(CAJA), '--sin-cache no escribe la caja');
  const B = auditar(false); ok(existsSync(CAJA), 'la corrida en frío llena la caja'); igual('en frío', A, B);
  const C = auditar(false); igual('caliente', A, C);

  console.log('2. errores plantados');
  mkdirSync(DIR, { recursive: true });
  writeFileSync(MD, '| Concepto | 2024 | 2023 | Var |\n| --- | ---: | ---: | ---: |\n| Central income | 5.3 | 74 | (2.1) |\n');
  writeFileSync(PDF, '<!DOCTYPE html><html><body>página de error</body></html>');
  writeFileSync(TOOL, "console.log(variableQueNadieDefinio);\n");
  const D1 = auditar(false), D0 = auditar(true); igual('con los tres errores', D0, D1);
  ok(con(D1, 'coma-comida', '_prueba-cache-audit/tabla.md'), 'la caja muestra la coma comida');
  ok(con(D1, 'archivo-no-es-lo-que-dice', '_prueba-cache-audit/falso.pdf'), 'la caja muestra el PDF que es HTML');
  ok(con(D1, 'nombre-sin-definir', '_prueba-cache-audit.mjs'), 'la caja muestra el nombre sin definir');
  const D2 = auditar(false); igual('con los tres errores, caliente', D0, D2);

  console.log('3. los errores se arreglan');
  writeFileSync(MD, '| Concepto | 2024 | 2023 | Var |\n| --- | ---: | ---: | ---: |\n| Central income | 5.3 | 7.4 | (2.1) |\n');
  writeFileSync(PDF, '%PDF-1.4\n');
  rmSync(TOOL, { force: true });
  const E1 = auditar(false), E0 = auditar(true); igual('arreglados', E0, E1);
  ok(!con(E1, 'coma-comida', '_prueba-cache-audit/tabla.md'), 'la caja ya no muestra la coma comida');
  ok(!con(E1, 'archivo-no-es-lo-que-dice', '_prueba-cache-audit/falso.pdf'), 'la caja ya no muestra el PDF falso');
  ok(!con(E1, 'nombre-sin-definir', '_prueba-cache-audit.mjs'), 'la caja ya no muestra el nombre sin definir');
  console.log('4. sin los archivos de prueba');
  limpiar(); const F = auditar(false); igual('sin los archivos de prueba, contra el árbol original', A, F);
} finally { limpiar(); }
console.log(`${fallos ? `FALLÓ: ${fallos} diferencia(s)` : 'prueba-cache-audit: la caja da los mismos hallazgos que la auditoría completa'} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
process.exit(fallos ? 1 : 0);

#!/usr/bin/env node
// ============================================================================
// tools/probar-todas.mjs — corre TODAS las pruebas (`tools/probar-*.mjs`, `tools/hooks/probar-*.mjs` y `tools/prueba-escribir.mjs`, la de las escrituras, que dura unos minutos) y anota cuándo pasó cada una en Admin/registros/pruebas-corridas.json.
// POR QUÉ. Una prueba que ningún chequeo corre se rompe sin que nadie lo vea: `probar-medir-pipeline.mjs` llevaba rota (19 casos MAL) desde que `medir-pipeline` sumó imports que su repo de juguete no copiaba.
// `audit.js` lee el registro (`prueba-sin-correr`, P3: una prueba que falló, o que no corrió en 14 días, o que no figura) y dice este comando. El audit no las corre (algunas tardan minutos).
// USO: node tools/probar-todas.mjs [--solo a.mjs,b.mjs]     (en segundo plano: unos 5 a 10 minutos; sale con 1 si alguna falla)
// ============================================================================
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { resumenFallo } from './prueba-fallo.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REGISTRO = join(ROOT, 'Admin', 'registros', 'pruebas-corridas.json');
const A = process.argv.slice(2); const solo = A.includes('--solo') ? A[A.indexOf('--solo') + 1].split(',') : null;
const pruebas = ['tools', 'tools/hooks'].flatMap((d) => readdirSync(join(ROOT, d)).filter((f) => /^(probar-.*|prueba-escribir)\.mjs$/.test(f) && f !== 'probar-todas.mjs').map((f) => `${d}/${f}`)).filter((p) => !solo || solo.includes(p.split('/').pop()));
const reg = existsSync(REGISTRO) ? JSON.parse(readFileSync(REGISTRO, 'utf8')) : {};
let mal = 0;
for (const p of pruebas) {
  const t0 = Date.now(); const r = spawnSync('node', [p], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 27, timeout: 600_000 });
  const ok = r.status === 0; if (!ok) mal++;
  reg[p] = { fecha: new Date().toISOString().slice(0, 10), ok, segundos: Math.round((Date.now() - t0) / 1000) };
  console.log(`${ok ? 'ok ' : 'MAL'} ${p} (${reg[p].segundos} s)${ok ? '' : `\n${resumenFallo(r, { max: 12 }).join('\n')}`}`); // qué dijo la prueba al fallar (no solo las líneas «MAL»)
  writeFileSync(REGISTRO, `${JSON.stringify(Object.fromEntries(Object.entries(reg).sort()), null, 1)}\n`);
}
console.log(mal ? `\n${mal} prueba(s) fallan` : `\n${pruebas.length} pruebas, todas ok`);
process.exit(mal ? 1 : 0);

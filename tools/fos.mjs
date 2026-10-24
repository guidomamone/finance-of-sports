#!/usr/bin/env node
// ============================================================================
// tools/fos.mjs — la PUERTA ÚNICA de las tools que una sesión corre a mano (lista en tools/fos-comandos.json).
//
// USO: node tools/fos.mjs                       lista los comandos con una línea cada uno
//      node tools/fos.mjs <comando> [args...]   corre el comando con sus argumentos (un comando puede ser de dos palabras: «medir cargar», «buscar exa»)
//      node tools/fos.mjs medir | buscar        lista el grupo
//      node tools/fos.mjs --check               qué falta: scripts de la lista que no existen y tools sueltas (ni listadas ni llamadas por otra tool)
// Los scripts siguen funcionando directo (node tools/<script>); esto es la lista y el atajo, no un reemplazo.
// ============================================================================
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const TOOLS = import.meta.dirname;
const { comandos } = JSON.parse(readFileSync(resolve(TOOLS, 'fos-comandos.json'), 'utf8'));
const A = process.argv.slice(2);

function listar(filtro) {
  const sel = filtro ? comandos.filter((c) => c.cmd.startsWith(`${filtro} `)) : comandos;
  const ancho = Math.max(...sel.map((c) => c.cmd.length));
  for (const c of sel) console.log(`${c.cmd.padEnd(ancho)}  ${c.que}  [${c.cuando}]`);
}

if (!A.length) { listar(); process.exit(0); }

if (A[0] === '--check') {
  let mal = 0;
  for (const c of comandos) if (!existsSync(resolve(TOOLS, c.script))) { console.log(`falta el script de «${c.cmd}»: tools/${c.script}`); mal++; }
  const listados = new Set(comandos.map((c) => c.script));
  const fuentes = readdirSync(TOOLS).filter((f) => /\.(mjs|js|sh)$/.test(f));
  const textos = fuentes.map((f) => [f, readFileSync(resolve(TOOLS, f), 'utf8')]);
  const sueltas = fuentes.filter((f) => !listados.has(f) && !textos.some(([g, t]) => g !== f && t.includes(f.replace(/\.[^.]+$/, ''))));
  if (sueltas.length) console.log(`Tools que no están en la lista ni las llama otra tool (¿se corren a mano? agregalas a tools/fos-comandos.json, o son candidatas a borrar):\n  ${sueltas.join('\n  ')}`);
  // el candado de la medición (tools/candado-medicion.mjs): las tools de CON_CANDADO siguen llamándolo; las demás que escriben en Admin/registros se listan (informativo: la mayoría son etapas que corre lote.mjs, que sí lo llama)
  const { CON_CANDADO } = await import('./candado-medicion.mjs');
  const texto = new Map(textos);
  for (const t of Object.keys(CON_CANDADO)) if (!/negarSiSeMide\(/.test(texto.get(t) || '')) { console.log(`«${t}» figura en candado-medicion.mjs (CON_CANDADO) y ya no llama a negarSiSeMide: una medición en curso no la frena`); mal++; }
  const escriben = textos.filter(([f, t]) => !CON_CANDADO[f] && !/^(probar-|prueba-|medir-|candado)/.test(f) && /writeFileSync|appendFileSync/.test(t) && /Admin.{0,6}registros|'registros'/.test(t) && !/negarSiSeMide\(/.test(t)).map(([f]) => f);
  if (escriben.length) console.log(`Escriben en Admin/registros y no chequean el candado de la medición (${escriben.length}, informativo; las etapas del lote quedan cubiertas por lote.mjs --ejecutar):\n  ${escriben.join(' ')}`);
  console.log(mal ? `\n${mal} script(s) faltan` : '\nla lista está al día');
  process.exit(mal ? 1 : 0);
}

// el comando es la primera palabra, o las dos primeras si existe un «grupo sub»
const dos = `${A[0]} ${A[1] || ''}`.trim();
const c = comandos.find((x) => x.cmd === dos) || comandos.find((x) => x.cmd === A[0]);
if (!c) {
  if (comandos.some((x) => x.cmd.startsWith(`${A[0]} `))) { listar(A[0]); process.exit(0); }
  console.error(`No hay un comando «${A[0]}». Los que hay:`); listar(); process.exit(1);
}
const args = A.slice(c.cmd.split(' ').length);
const bin = c.script.endsWith('.sh') ? 'bash' : 'node';
const r = spawnSync(bin, [resolve(TOOLS, c.script), ...args], { stdio: 'inherit' });
process.exit(r.status ?? 1);

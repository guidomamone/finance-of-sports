#!/usr/bin/env node
// tools/modo.mjs — el modo de trabajo del proyecto, en un solo archivo (.claude/modo.json).
// USO: node tools/modo.mjs                  dice el modo y qué reglas del hook aplican
//      node tools/modo.mjs una-sesion       una sola sesión en la carpeta principal, sin worktrees
//      node tools/modo.mjs varias-sesiones  una principal y worktrees (reglas: Admin/Archive/modo-varias-sesiones.md)
// tools/hooks/pre-tool.mjs lee el archivo y aplica solo las reglas del modo. CLAUDE.md (bloque «Modo de trabajo») dice cómo trabajar en cada uno.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const RUTA = resolve(import.meta.dirname, '..', '.claude', 'modo.json');
const MODOS = ['una-sesion', 'varias-sesiones'];
const j = JSON.parse(readFileSync(RUTA, 'utf8'));
const pedido = process.argv[2];
if (pedido) {
  if (!MODOS.includes(pedido)) { console.error(`modo desconocido «${pedido}»; los modos son ${MODOS.join(' y ')}`); process.exit(1); }
  j.modo = pedido;
  writeFileSync(RUTA, JSON.stringify(j, null, 1) + '\n');
}
console.log(`modo: ${j.modo}`);
console.log(j.modo === 'una-sesion'
  ? 'Una sola sesión: sin worktrees. El hook NO aplica el candado de skills, archivar, Opus, permission_mode, docs de la principal, merge, plan ni rsync.\nCLAUDE.md, «Modo de trabajo: una sola sesión», dice cómo trabajar.'
  : 'Varias sesiones: el hook aplica el candado de skills (texto en Admin/propuestas/), archivar, Opus, permission_mode, docs de la principal, merge, plan y rsync.\nCómo trabajar: Admin/Archive/modo-varias-sesiones.md. CLAUDE.md, «Modo de trabajo», describe el modo de una sola sesión y hay que reemplazarlo por ese.');

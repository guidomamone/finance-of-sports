#!/usr/bin/env node
// ============================================================================
// tools/arranque.mjs — `fos arranque <rol>`: LAS SECCIONES DE Admin/ESTADO.md QUE LE TOCAN A UN ROL
//
// POR QUÉ. ESTADO.md (17 KB) es el snapshot de todo el proyecto y se leía entero en cada arranque; una tarea de Pipeline usa 2 de sus 11 secciones. Cada sección lleva bajo su título una marca
// `<!-- roles: pipeline, onboarding -->` (o `*` si es para todos). Sin marca, la sección se imprime siempre (lo seguro). El documento sigue siendo el snapshot completo: esto solo elige.
//
// USO: node tools/fos.mjs arranque <rol>     imprime las secciones de ese rol y, al final, los títulos de las que se salteó con su tamaño
//      node tools/fos.mjs arranque           lista los títulos con su marca y su tamaño
// Roles: pipeline, onboarding, auditora, orden, sourcing, pantallas, contenido, deploy.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const ROLES = ['pipeline', 'onboarding', 'auditora', 'orden', 'sourcing', 'pantallas', 'contenido', 'deploy'];
const rol = (process.argv[2] || '').toLowerCase();
const L = readFileSync(resolve(ROOT, 'Admin', 'ESTADO.md'), 'utf8').split('\n');

// secciones: lo anterior al primer título es la portada (siempre se imprime recortada a su primera línea); cada «## » o «### » abre una
const secciones = []; let actual = { titulo: '(portada)', roles: ['*'], lineas: [] };
for (const l of L) {
  if (/^#{2,3} /.test(l)) { secciones.push(actual); actual = { titulo: l, roles: null, lineas: [l] }; continue; }
  const m = l.match(/^<!--\s*roles:\s*(.+?)\s*-->$/);
  if (m && actual.roles === null) { actual.roles = m[1].split(',').map((x) => x.trim().toLowerCase()); actual.lineas.push(l); continue; }
  actual.lineas.push(l);
}
secciones.push(actual);
for (const s of secciones) { if (s.roles === null) s.roles = ['*']; s.kb = s.lineas.join('\n').length / 1024; }

if (!rol) {
  console.log('Secciones de Admin/ESTADO.md (marca roles: y tamaño):');
  for (const s of secciones.slice(1)) console.log(`  ${s.roles.join(', ').padEnd(46)} ${s.kb.toFixed(1).padStart(5)} KB  ${s.titulo}`);
  console.log(`\nUso: node tools/fos.mjs arranque <${ROLES.join('|')}>`); process.exit(0);
}
if (!ROLES.includes(rol)) { console.error(`Rol desconocido «${rol}». Roles: ${ROLES.join(', ')}.`); process.exit(1); }

const leidas = secciones.filter((s) => s.titulo !== '(portada)' && (s.roles.includes('*') || s.roles.includes(rol)));
const salteadas = secciones.filter((s) => s.titulo !== '(portada)' && !leidas.includes(s));
console.log(`Admin/ESTADO.md para el rol «${rol}»: ${leidas.length} de ${leidas.length + salteadas.length} secciones (${leidas.reduce((a, s) => a + s.kb, 0).toFixed(1)} KB de ${secciones.reduce((a, s) => a + s.kb, 0).toFixed(1)} KB)\n`);
for (const s of leidas) console.log(s.lineas.filter((l) => !/^<!--\s*roles:/.test(l)).join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');
if (salteadas.length) console.log(`--- Salteadas para este rol (grep o \`node tools/fos.mjs arranque <otro rol>\`): ${salteadas.map((s) => `${s.titulo.replace(/^#+ /, '')} (${s.kb.toFixed(1)} KB)`).join(' · ')}`);

#!/usr/bin/env node
// ============================================================================
// tools/existe.mjs — `fos existe <palabras>`: ¿YA HAY una regla, una tool o una decisión sobre esto? (411)
//
// POR QUÉ. Antes de diseñar algo hay que saber si ya está hecho o decidido. El «escalón de materialidad» de Guido (1 %, confianza 0,6) ya estaba en cargar.mjs, y se encontró leyendo
// el tramo, no buscando. Esto busca las palabras (sin tildes ni mayúsculas) en una pasada en: las cabeceras y los comentarios de tools/, Admin/CONVENCIONES*.md, Admin/HALLAZGOS-pipeline.md,
// los títulos del CHANGELOG y su archivo, Admin/PIPELINE.md y Admin/TODO.md; imprime hasta 10 líneas con archivo y número (las que tienen TODAS las palabras; si no hay, las que tienen la mitad).
// USO: node tools/fos.mjs existe materialidad confianza     [--todas: más de 10 líneas]
// ============================================================================
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const todas = A.includes('--todas');
const palabras = A.filter((a) => !a.startsWith('--')).map((p) => plano(p)).filter((p) => p.length >= 3);
function plano(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
if (!palabras.length) { console.error('Uso: node tools/fos.mjs existe <palabra> [<palabra> …]   (busca en tools/, CONVENCIONES, HALLAZGOS, PIPELINE, TODO y CHANGELOG)'); process.exit(1); }

const archivos = [];
const lista = (dir, re) => { try { for (const f of readdirSync(join(ROOT, dir))) if (re.test(f)) archivos.push({ ruta: `${dir}/${f}`, tipo: dir.startsWith('tools') ? 'tool' : 'doc' }); } catch { /* sin carpeta */ } };
lista('tools', /\.(mjs|js)$/); lista('tools/hooks', /\.mjs$/);
for (const f of ['Admin/CONVENCIONES.md', 'Admin/CONVENCIONES-DATOS.md', 'Admin/HALLAZGOS-pipeline.md', 'Admin/PIPELINE.md', 'Admin/TODO.md', 'Admin/CHANGELOG.md']) if (existsSync(join(ROOT, f))) archivos.push({ ruta: f, tipo: 'doc' });
lista('Admin/Archive', /^CHANGELOG-.*\.md$/);

const hallazgos = [];
for (const { ruta, tipo } of archivos) {
  const L = readFileSync(join(ROOT, ruta), 'utf8').split('\n');
  if (ruta === 'tools/existe.mjs') continue;
  const esChangelog = /CHANGELOG/.test(ruta);
  // una VENTANA de 4 líneas seguidas: la regla casi nunca tiene todas las palabras en la misma línea
  const util = (l) => !(tipo === 'tool' && !/^\s*(\/\/|\*|#|\/\*)/.test(l)) && !(esChangelog && !/^## /.test(l)); // en las tools solo los comentarios; en el CHANGELOG solo los títulos
  for (let i = 0; i < L.length; i++) {
    if (!util(L[i])) continue;
    const ventana = esChangelog ? L[i] : L.slice(i, i + 4).filter(util).join(' ');
    const t = plano(ventana); const n = palabras.filter((p) => t.includes(p)).length;
    if (!n || !palabras.some((p) => plano(L[i]).includes(p))) continue;
    hallazgos.push({ ruta, linea: i + 1, texto: L[i].trim().slice(0, 170), n, completo: n === palabras.length });
    if (n === palabras.length) i += 3; // la misma regla no se cuenta cuatro veces
  }
}
const completos = hallazgos.filter((h) => h.completo);
const elegidos = (completos.length ? completos : hallazgos.filter((h) => h.n >= Math.ceil(palabras.length / 2)))
  .sort((a, b) => b.n - a.n || (/^tools/.test(a.ruta) ? 1 : 0) - (/^tools/.test(b.ruta) ? 1 : 0));
console.log(`«${A.filter((a) => !a.startsWith('--')).join(' ')}»: ${completos.length ? `${completos.length} línea(s) con todas las palabras` : `ninguna línea con todas; ${elegidos.length} con al menos la mitad`}\n`);
for (const h of (todas ? elegidos : elegidos.slice(0, 10))) console.log(`${h.ruta}:${h.linea}  ${h.texto}`);
if (!todas && elegidos.length > 10) console.log(`… y ${elegidos.length - 10} más (--todas)`);
if (!elegidos.length) console.log('Nada: no hay una regla ni un comentario que lo diga. Probá con otra palabra (un sinónimo) antes de darlo por nuevo.');

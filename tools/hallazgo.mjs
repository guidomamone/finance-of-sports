#!/usr/bin/env node
// ============================================================================
// tools/hallazgo.mjs — `fos hallazgo`: ESCRIBE UN HALLAZGO EN SU FORMATO
//
// POR QUÉ. Admin/HALLAZGOS-pipeline.md guarda lo que se midió y no entró, para que el próximo que piense lo mismo no lo repita. En prosa suelta solo se encuentra si la sesión se acuerda de buscar
// con la palabra justa. Cada hallazgo nuevo es UNA viñeta que empieza con sus etiquetas: `- [tema: identidad del cuadro · tools: cola.mjs, verificar.mjs · AAAA-MM-DD] Qué se midió y por qué no entró.`
// `fos existe` y `fos changelog historial <tool>` la encuentran por tema o por tool; un aviso suave (hook) la nombra la primera vez que una sesión edita una de esas tools.
//
// USO: node tools/fos.mjs hallazgo "<tema>" --tools a.mjs,b.mjs --texto "qué se midió y por qué no entró"    agrega la viñeta en la sección «## <fecha>, hallazgos» (la crea si no está)
//      node tools/fos.mjs hallazgo check                                                                      las viñetas nuevas (de las secciones con fecha desde la constante DESDE) sin etiquetas (audit.js: hallazgo-sin-etiquetas)
// ============================================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const ARCHIVO = process.env.HALLAZGOS_ARCHIVO || resolve(ROOT, 'Admin', 'HALLAZGOS-pipeline.md'); // HALLAZGOS_ARCHIVO: otro archivo, para probar sin ensuciar el real
const DESDE = '2026-10-24'; // las secciones «## AAAA-MM-DD, hallazgos» desde esta fecha tienen que usar el formato
const ETIQUETA_RE = /^- \[tema: [^\]·]+ · tools: [^\]]+ · \d{4}-\d{2}-\d{2}\] \S/;
const hoy = () => new Date().toISOString().slice(0, 10);

export function problemas() {
  if (!existsSync(ARCHIVO)) return [];
  const L = readFileSync(ARCHIVO, 'utf8').split('\n'); const mal = []; let fecha = null;
  L.forEach((l, i) => {
    const h = l.match(/^## (\d{4}-\d{2}-\d{2}), hallazgos\s*$/); if (h) { fecha = h[1]; return; }
    if (/^## /.test(l)) { fecha = null; return; }
    if (fecha && fecha >= DESDE && /^- /.test(l) && !ETIQUETA_RE.test(l)) mal.push(`L${i + 1}`);
  });
  return mal;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (A[0] === 'check') {
    const m = problemas();
    if (m.length) { console.log(`hallazgo-sin-etiquetas: ${m.length} viñeta(s) de HALLAZGOS-pipeline.md sin «[tema: … · tools: … · fecha]» al principio (${m.slice(0, 5).join(', ')}): usá node tools/fos.mjs hallazgo`); process.exit(1); }
    process.exit(0);
  }
  const tema = A.find((a, i) => !a.startsWith('--') && !['--tools', '--texto'].includes(A[i - 1]));
  const tools = (flag('--tools') || '').split(',').map((s) => s.trim()).filter(Boolean); const texto = flag('--texto');
  if (!tema || !texto || !tools.length) { console.error('Uso: node tools/fos.mjs hallazgo "<tema>" --tools a.mjs,b.mjs --texto "qué se midió y por qué no entró"   |   hallazgo check'); process.exit(1); }
  if (tools.some((t) => !/^[a-z0-9][a-z0-9-]*\.(mjs|js)$/.test(t) || !existsSync(resolve(ROOT, 'tools', t)))) { console.error(`Alguna tool de --tools no existe en tools/: ${tools.join(', ')}`); process.exit(1); }
  const vineta = `- [tema: ${tema} · tools: ${tools.join(', ')} · ${hoy()}] ${texto.replace(/\s*\n\s*/g, ' ').trim()}`;
  const L = readFileSync(ARCHIVO, 'utf8').replace(/\s+$/, '').split('\n'); const titulo = `## ${hoy()}, hallazgos`; const i = L.indexOf(titulo);
  if (i < 0) L.push('', titulo, '', vineta);
  else { let fin = i + 1; while (fin < L.length && !/^## /.test(L[fin])) fin++; while (fin > i + 1 && L[fin - 1].trim() === '') fin--; L.splice(fin, 0, vineta); } // al final de la sección de hoy, no del archivo
  writeFileSync(ARCHIVO, `${L.join('\n')}\n`, 'utf8');
  console.log(`Agregado a Admin/HALLAZGOS-pipeline.md:\n  ${vineta.slice(0, 200)}`);
}

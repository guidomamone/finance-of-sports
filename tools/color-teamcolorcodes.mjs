#!/usr/bin/env node
// ============================================================================
// tools/color-teamcolorcodes.mjs — los colores CANDIDATOS de un club de un deporte que footylogos no cubre (rugby), desde teamcolorcodes.com.
//
// POR QUÉ. tools/lookup-brand-color.js y fetch-brand-color-reference.mjs resuelven los candidatos desde footylogos, que es solo de fútbol. Para un club de rugby
// (Bath Rugby) no hay tabla. teamcolorcodes.com publica una página por club con sus colores (nombre y hex, en orden) y su Pantone; es un agregador, igual que
// footylogos: NO decide el `brandColor`. El proceso de `club-or-year-onboarding/club-nuevo.md` sigue igual: identidad primero (¿de qué color es la camiseta?,
// Wikipedia o la liga), el hex solo si cae en esa familia, y las trampas del agregador (el orden no es el de la camiseta).
//
// USO:
//   node tools/color-teamcolorcodes.mjs "Bath Rugby"                     candidatos (la página es <nombre-en-minúsculas-con-guiones>-color-codes)
//   node tools/color-teamcolorcodes.mjs "Bath Rugby" --slug bath-rugby    si el nombre de la página no es el del club
// ============================================================================
const UA = 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)';
const A = process.argv.slice(2);
const nombre = A.find((a, i) => !a.startsWith('--') && A[i - 1] !== '--slug');
if (!nombre) { console.error('Uso: node tools/color-teamcolorcodes.mjs "<club>" [--slug <slug>]'); process.exit(1); }
const slug = (A.includes('--slug') ? A[A.indexOf('--slug') + 1] : nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
const url = `https://teamcolorcodes.com/${slug}-color-codes/`;
const res = await fetch(url, { headers: { 'User-Agent': UA } });
if (!res.ok) { console.error(`${url} respondió ${res.status}: no hay página con ese nombre (probá --slug).`); process.exit(1); }
const html = await res.text();
// los bloques `colorblock` con su nombre (los de «PMS …» son Pantone y se descartan); cada color sale una vez, en el orden de la página
const vistos = new Set(); const colores = [];
for (const m of html.matchAll(/class="colorblock"\s+style="background-color:\s*(#[0-9A-Fa-f]{6});[^"]*">\s*([A-Za-z][A-Za-z ]{1,30}?)\s*</g)) {
  if (/^PMS\b/i.test(m[2]) || vistos.has(m[1].toUpperCase())) continue;
  vistos.add(m[1].toUpperCase()); colores.push({ nombre: m[2].trim(), hex: m[1].toUpperCase() });
}
if (!colores.length) { console.error(`${url}: no encontré bloques de color (¿cambió la página?).`); process.exit(1); }
console.log(`${nombre}: ${url}`);
for (const c of colores) console.log(`  ${c.hex}  ${c.nombre}`);
console.log('Son candidatos, no una decisión: confirmá primero de qué color es la camiseta (Wikipedia o la liga).');

#!/usr/bin/env node
// ============================================================================
// tools/fetch-brand-color-reference.mjs — baja UNA VEZ la tabla de colores de
// una liga completa desde footylogos.com y la guarda local, para que
// `tools/lookup-brand-color.js` resuelva los colores CANDIDATOS de un club sin
// salir a buscar uno por uno (to-do 91, 2026-09-27).
//
// OJO, ESTO NO DECIDE el `brandColor` de un club — solo cachea los swatches que
// footylogos publica para esa liga, en el mismo orden en que la fuente los
// lista. Seguí el proceso de `club-or-year-onboarding/SKILL.md` sección 3
// punto 1b igual que siempre: identidad primero (Wikipedia/liga: ¿de qué color
// es la CAMISETA?), recién después el hex, y el hex se acepta SOLO si cae en
// la familia que confirmó el paso 1. Este archivo evita el fetch repetido,
// nada más — las trampas ya documentadas ahí (bicolor en partes iguales,
// agregador ordenado por el ESCUDO no la camiseta, camiseta blanca con acento)
// siguen aplicando igual sobre estos datos cacheados.
//
// FUENTE: footylogos.com/color-codes/<liga>, una página por liga con una
// card por club (nombre, slug, y sus swatches en orden). Verificado 2026-09-27
// contra la Liga Profesional Argentina: 31 clubes, colores consistentes con
// los ya cargados a mano en data/clubs.js (ej. Boca #182A4E/#F9BB31, San
// Lorenzo #00325A ya confirmado en clubs.js).
//
// ARQUITECTURA (ver to-do 91): igual que tools/fx-reference/, este archivo
// NUNCA se referencia desde `data/` ni se sirve al visitante — es insumo de
// onboarding en `tools/brand-color-reference/`, no dato de producción.
//
// USO:
//   node tools/fetch-brand-color-reference.mjs liga-profesional-argentina argentina
//   node tools/fetch-brand-color-reference.mjs categoria-primera-a colombia
//   node tools/fetch-brand-color-reference.mjs brasileirao-a brasil
//
// El primer argumento es el slug de footylogos (mirar footylogos.com/color-codes
// para encontrar el de la liga que haga falta); el segundo es el nombre de
// archivo local (sin .json). No necesita API key, es una página pública.
// ============================================================================

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outDir = resolve(projectRoot, 'tools', 'brand-color-reference');

function parseCards(html) {
  const cardRe = /<a class="color-code-card" href="\/color-codes\/([a-z0-9-]+)"[^>]*data-name="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const swatchRe = /--swatch:(#[0-9A-Fa-f]{6})" title="([^"]+)"/g;
  const clubs = [];
  let m;
  while ((m = cardRe.exec(html))) {
    const [, slug, name, body] = m;
    const swatches = [];
    let sm;
    swatchRe.lastIndex = 0;
    while ((sm = swatchRe.exec(body))) swatches.push({ hex: sm[1].toUpperCase(), label: sm[2] });
    if (swatches.length) clubs.push({ slug, name, swatches });
  }
  return clubs;
}

async function main() {
  const [ligaSlug, outName] = process.argv.slice(2);
  if (!ligaSlug || !outName) {
    console.error('Uso: node tools/fetch-brand-color-reference.mjs <slug-liga-footylogos> <nombre-archivo-local>');
    console.error('Ej:  node tools/fetch-brand-color-reference.mjs liga-profesional-argentina argentina');
    process.exit(1);
  }
  const url = `https://www.footylogos.com/color-codes/${ligaSlug}`;
  console.log(`Bajando ${url} ...`);
  const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!resp.ok) {
    console.error(`HTTP ${resp.status} -- revisar que el slug de liga sea correcto (footylogos.com/color-codes lista todas).`);
    process.exit(1);
  }
  const html = await resp.text();
  const clubs = parseCards(html);
  if (!clubs.length) {
    console.error('No se encontró ninguna card de club en la página -- footylogos puede haber cambiado de formato, revisar el regex de este script.');
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const out = {
    liga: ligaSlug,
    source: url,
    fetchedAt: new Date().toISOString(),
    note: 'Swatches en el mismo orden que la fuente -- NO asumir que el primero es el color de marca (footylogos ordena por el escudo, no la camiseta). Ver club-or-year-onboarding/SKILL.md sección 3 punto 1b para el proceso de decisión.',
    clubs,
  };
  const outPath = resolve(outDir, `${outName}.json`);
  writeFileSync(outPath, JSON.stringify(out, null, 1), 'utf8');
  console.log(`Listo: ${clubs.length} clubes -> ${outPath.replace(projectRoot + '/', '')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

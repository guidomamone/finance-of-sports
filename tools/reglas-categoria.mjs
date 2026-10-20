#!/usr/bin/env node
// ============================================================================
// tools/reglas-categoria.mjs — to-do 329. Las REGLAS DE CATEGORÍA que salen de una votación o de una decisión de Guido (`## REGLA:` de
// Admin/CONVENCIONES-DATOS.md) tienen que llegarles a Jev y a Claude, que solo veían ejemplos ya cargados y categorias-aprendidas.jsonl.
//
// LA CONVENCIÓN (dos líneas dentro de la sección `## REGLA:` de la regla, al final, una por cada cosa que la regla decide):
//   CATEGORÍA (prompt): <una frase: qué rubros y a qué categoría>       va al prompt de categorizar-claude.mjs (b)
//   EJEMPLO-CATEGORÍA: <club-id> | revenue|expense | <etiqueta tal cual> | <categoría>     un caso real; se registra como ejemplo (a)
// (a) `--escribir` agrega cada EJEMPLO a Admin/registros/categorias-aprendidas.jsonl (confianza 1, modelo `guido`, motivo con el título de la regla), una
// sola vez. Lo aprendido se usa como precedente de ESE club y como ejemplo para Jev y Claude de los demás; lo cargado en el sitio gana sobre lo aprendido
// (lineasAprendidas), así que ningún año cargado cambia.
// (b) categorizar-claude.mjs lee las líneas `CATEGORÍA (prompt)` con `reglasParaPrompt()` y las pone en el prompt del sistema.
//
// USO:   node tools/reglas-categoria.mjs              valida (club del sitio, categoría, lado) y dice qué falta registrar; código 1 si hay errores
//        node tools/reglas-categoria.mjs --escribir   registra los ejemplos que faltan en categorias-aprendidas.jsonl
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DOC = resolve(ROOT, 'Admin', 'CONVENCIONES-DATOS.md');
const APRENDIDAS = resolve(ROOT, 'Admin', 'registros', 'categorias-aprendidas.jsonl');

export function leerReglasCategoria() {
  const reglas = []; let actual = null;
  for (const [i, linea] of readFileSync(DOC, 'utf8').split('\n').entries()) {
    const h = linea.match(/^##\s+REGLA:\s*(.+)$/);
    if (h) { actual = { titulo: h[1].trim(), prompt: [], ejemplos: [] }; reglas.push(actual); continue; }
    if (/^##\s/.test(linea)) { actual = null; continue; }
    if (!actual) continue;
    const p = linea.match(/^CATEGOR[ÍI]A \(prompt\):\s*(.+)$/);
    if (p) { actual.prompt.push(p[1].trim()); continue; }
    const e = linea.match(/^EJEMPLO-CATEGOR[ÍI]A:\s*(.+)$/);
    if (e) { const [club, lado, etiqueta, categoria] = e[1].split('|').map((x) => x.trim()); actual.ejemplos.push({ club, lado, etiqueta, categoria, linea: i + 1 }); }
  }
  return reglas;
}

// Las frases para el prompt de categorizar-claude.mjs (solo texto: no importa nada del categorizador, que importa esto).
export function reglasParaPrompt() {
  return leerReglasCategoria().flatMap((r) => r.prompt.map((t) => `- ${t} (${r.titulo.replace(/\s*\(.*$/, '')})`));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const reglas = leerReglasCategoria(); const errores = [];
  // las categorías de data/category-map.js (no se importa categorizar-claude.mjs: él importa este archivo)
  const src = readFileSync(resolve(ROOT, 'data', 'category-map.js'), 'utf8');
  const nombres = (arr) => { const a = src.indexOf(`const ${arr} = [`); return new Set([...src.slice(a, src.indexOf('];', a)).matchAll(/^\s*'([a-z_]+)',?/gm)].map((m) => m[1])); };
  const CATS = { revenue: nombres('REVENUE_CATEGORIES'), expense: nombres('EXPENSE_CATEGORIES') }; const clubs = readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8');
  const ladoDe = (c) => (CATS.revenue.has(c) ? 'revenue' : CATS.expense.has(c) ? 'expense' : null);
  const ya = existsSync(APRENDIDAS) ? readFileSync(APRENDIDAS, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const faltan = [];
  for (const r of reglas) for (const e of r.ejemplos) {
    const q = `L${e.linea} (${r.titulo.slice(0, 50)})`;
    if (!e.club || !e.lado || !e.etiqueta || !e.categoria) { errores.push(`${q}: el ejemplo necesita club | lado | etiqueta | categoría`); continue; }
    if (!clubs.includes(`id:'${e.club}'`)) errores.push(`${q}: el club «${e.club}» no está en data/clubs.js`);
    if (!['revenue', 'expense'].includes(e.lado)) errores.push(`${q}: lado «${e.lado}» (revenue | expense)`);
    if (!ladoDe(e.categoria)) errores.push(`${q}: la categoría «${e.categoria}» no existe en category-map.js`);
    else if (ladoDe(e.categoria) !== e.lado) errores.push(`${q}: «${e.categoria}» es de ${ladoDe(e.categoria)} y el ejemplo dice ${e.lado}`);
    if (!ya.some((x) => x.club === e.club && x.lado === e.lado && x.label === e.etiqueta && x.categoria === e.categoria && /^regla de votación/.test(x.motivo || ''))) faltan.push({ r, e });
  }
  console.log(`${reglas.length} reglas en CONVENCIONES-DATOS.md; ${reglas.filter((r) => r.prompt.length).length} con frase para el prompt; ${reglas.reduce((a, r) => a + r.ejemplos.length, 0)} ejemplos; ${faltan.length} sin registrar en categorias-aprendidas.jsonl.`);
  for (const m of errores) console.log(`  ERROR ${m}`);
  if (errores.length) process.exit(1);
  if (process.argv.includes('--escribir') && faltan.length) {
    appendFileSync(APRENDIDAS, faltan.map(({ r, e }) => JSON.stringify({ ts: new Date().toISOString(), club: e.club, year: null, lado: e.lado, label: e.etiqueta, padre: null, glosa: null, categoria: e.categoria, confianza: 1, motivo: `regla de votación: ${r.titulo} (Admin/CONVENCIONES-DATOS.md)`, jevDecia: null, jevConf: null, modelo: 'guido', md: null })).join('\n') + '\n');
    console.log(`registrados ${faltan.length} ejemplos.`);
  } else for (const { r, e } of faltan) console.log(`  falta registrar: ${e.club} · ${e.lado} · «${e.etiqueta}» -> ${e.categoria}`);
}

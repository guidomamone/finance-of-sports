#!/usr/bin/env node
// ============================================================================
// tools/test-motores.mjs — test de los 3 motores de transcripción (Mistral, Gemini, Claude por API)
// sobre los MISMOS PDFs, comparando cada uno contra el .md que ya existe al lado del PDF.
//
// Para qué: decidir con datos si (a) Gemini se puede sacar, (b) Mistral se puede sacar, o (c) conviene
// siempre 2 motores (sobre todo en escaneos). Ver Admin/TODO.md y la sesión del 2026-09-29.
//
// Cómo funciona, por cada PDF de la lista:
//   1. Corre cada motor con --out-suffix .t-<motor>, así que escribe <nombre>.t-mistral.md,
//      <nombre>.t-gemini.md, <nombre>.t-claude.md AL LADO del original, SIN PISARLO. Estos archivos
//      están en .gitignore. Si el archivo ya existe, no se vuelve a llamar a la API (se puede cortar
//      con Ctrl+C y volver a correr: sigue donde quedó).
//   2. Compara cada uno contra el .md canónico con tools/compare-transcripts.mjs (rubro por rubro:
//      mismo texto de rubro, ¿mismo número?).
//   3. Junta el costo real que cada tool ya anota en Admin/<motor>/resultados.jsonl.
//   4. Escribe el resumen en Admin/test-motores-resultados.md y el detalle en
//      Admin/test-motores-resultados.jsonl.
//
// El .md canónico es el que ya estaba: para los documentos "gold" (ejercicio ya cargado al sitio y
// verificado a mano contra el PDF) es la mejor verdad que tenemos. Para los que la lista marca como
// "sin-gold" el canónico es solo la transcripción de otro motor, así que ahí el resultado dice
// "coincide con X", no "es correcto".
//
// USO (desde la raíz del proyecto):
//   node tools/test-motores.mjs --list Admin/test-motores-lista.txt --dry-run   # no gasta nada
//   node tools/test-motores.mjs --list Admin/test-motores-lista.txt             # corre de verdad
//   node tools/test-motores.mjs --list Admin/test-motores-lista.txt --engines claude   # solo uno
//   node tools/test-motores.mjs --report-only --list Admin/test-motores-lista.txt      # solo re-armar el informe
//
// Formato de la lista: una ruta de PDF por línea. Las líneas que empiezan con # son comentarios.
// Una línea puede terminar con "  | sin-gold" para marcar que el .md canónico NO está verificado.
// ============================================================================

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve, dirname, basename, extname } from 'node:path';
import { derivado } from './rutas.mjs';
import { execFileSync, spawnSync } from 'node:child_process';

const projectRoot = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flag = (n) => args.indexOf(n);
const listFlag = flag('--list');
const dryRun = args.includes('--dry-run');
const reportOnly = args.includes('--report-only');
const engFlag = flag('--engines');
const ENGINES = (engFlag >= 0 ? args[engFlag + 1] : 'mistral,gemini,claude').split(',');

if (listFlag < 0) {
  console.error('Uso: node tools/test-motores.mjs --list Admin/test-motores-lista.txt [--dry-run] [--engines mistral,gemini,claude] [--report-only]');
  process.exit(1);
}

const TOOLS = {
  mistral: 'tools/mistral-ocr-transcribe.mjs',
  gemini: 'tools/gemini-transcribe.mjs',
  claude: 'tools/claude-api-transcribe.mjs',
};
// Solo para la estimación del --dry-run. Son números gruesos, el costo real sale de los logs.
const EST_USD_PER_PAGE = { mistral: 0.004, gemini: 0.002, claude: 0.02 };

function readList(path) {
  return readFileSync(resolve(projectRoot, path), 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const [pdf, tag] = l.split('|').map((s) => s.trim());
      return { pdf, gold: tag !== 'sin-gold' };
    });
}

function pageCount(pdfAbs) {
  try {
    const out = execFileSync('pdfinfo', [pdfAbs], { encoding: 'utf8' });
    const m = out.match(/^Pages:\s+(\d+)/m);
    return m ? Number(m[1]) : null;
  } catch {
    return null;
  }
}

function suffixPath(pdfAbs, engine) {
  return derivado(pdfAbs, `.t-${engine}.md`, { crear: false });
}

function readJsonl(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
}

// El costo real de cada corrida: la última línea del log de ese motor cuyo "md" es el archivo de test.
function costOf(engine, pdfRel) {
  const rel = derivado(pdfRel, `.t-${engine}.md`, { crear: false });
  const rows = readJsonl(resolve(projectRoot, 'Admin', engine === 'claude' ? 'claude-api' : engine, 'resultados.jsonl'))
    .filter((r) => r.md === rel);
  return rows.length ? rows[rows.length - 1].costUsd : null;
}

function runEngine(engine, pdfRel) {
  const pdfAbs = resolve(projectRoot, pdfRel);
  const out = suffixPath(pdfAbs, engine);
  if (existsSync(out)) return { ran: false, ok: true, note: 'ya existía' };
  const t0 = Date.now();
  const r = spawnSync('node', [resolve(projectRoot, TOOLS[engine]), pdfRel, '--out-suffix', `.t-${engine}`], {
    cwd: projectRoot, encoding: 'utf8', timeout: 600_000,
  });
  const ok = existsSync(out);
  const tail = ((r.stdout || '') + (r.stderr || '')).trim().split('\n').slice(-3).join(' | ').slice(0, 300);
  return { ran: true, ok, seconds: Math.round((Date.now() - t0) / 1000), note: ok ? '' : tail };
}

function compare(canonAbs, otherAbs) {
  const r = spawnSync('node', [resolve(projectRoot, 'tools/compare-transcripts.mjs'), canonAbs, otherAbs, '--json'], {
    cwd: projectRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  try {
    const j = JSON.parse(r.stdout);
    return { match: j.match, mismatches: j.mismatches.length, onlyInCanon: j.onlyInA.length, onlyInEngine: j.onlyInB.length, detail: j.mismatches.slice(0, 5) };
  } catch {
    return { error: (r.stderr || r.stdout || 'sin salida').slice(0, 200) };
  }
}

const items = readList(args[listFlag + 1]);
console.log(`${items.length} PDFs, motores: ${ENGINES.join(', ')}${dryRun ? ' (DRY-RUN, no llamo a ninguna API)' : ''}\n`);

if (dryRun) {
  let totalPages = 0;
  const est = { mistral: 0, gemini: 0, claude: 0 };
  for (const it of items) {
    const pages = pageCount(resolve(projectRoot, it.pdf)) ?? 0;
    totalPages += pages;
    for (const e of ENGINES) est[e] += pages * EST_USD_PER_PAGE[e];
    const canon = existsSync(resolve(projectRoot, it.pdf.replace(/\.pdf$/i, '.md')));
    console.log(`${String(pages).padStart(4)} pág  ${canon ? 'md-canónico OK' : 'SIN .md canónico'}  ${it.gold ? 'gold    ' : 'sin-gold'}  ${it.pdf}`);
  }
  console.log(`\nTotal: ${totalPages} páginas.`);
  for (const e of ENGINES) console.log(`Costo estimado ${e}: ~$${est[e].toFixed(2)}`);
  console.log(`Costo estimado TOTAL: ~$${Object.values(est).reduce((a, b) => a + b, 0).toFixed(2)} (gruesa; el real queda en Admin/<motor>/resultados.jsonl)`);
  process.exit(0);
}

const detailPath = resolve(projectRoot, 'Admin', 'test-motores-resultados.jsonl');
const rows = [];
for (const it of items) {
  const pdfAbs = resolve(projectRoot, it.pdf);
  const canon = pdfAbs.replace(/\.pdf$/i, '.md');
  console.log(`=== ${it.pdf}`);
  if (!existsSync(canon)) { console.log('  SIN .md canónico, lo salto.'); continue; }
  const row = { pdf: it.pdf, gold: it.gold, pages: pageCount(pdfAbs), engines: {} };
  for (const e of ENGINES) {
    let run = { ran: false, ok: existsSync(suffixPath(pdfAbs, e)), note: 'report-only' };
    if (!reportOnly) {
      process.stdout.write(`  ${e}... `);
      run = runEngine(e, it.pdf);
      console.log(run.ok ? `ok${run.ran ? ` (${run.seconds}s)` : ' (ya existía)'}` : `FALLÓ: ${run.note}`);
    }
    const cmp = run.ok ? compare(canon, suffixPath(pdfAbs, e)) : null;
    row.engines[e] = { ok: run.ok, note: run.ok ? '' : run.note, costUsd: costOf(e, it.pdf), compare: cmp };
    if (cmp && !cmp.error) console.log(`    vs canónico: ${cmp.match ? 'COINCIDE' : `${cmp.mismatches} discrepancia(s)`} (rubros solo en uno: ${cmp.onlyInCanon}/${cmp.onlyInEngine})`);
  }
  rows.push(row);
  appendFileSync(detailPath, JSON.stringify({ ts: new Date().toISOString(), ...row }) + '\n');
}

// Resumen
const lines = [];
lines.push('# Test de los 3 motores de transcripción');
lines.push('');
lines.push(`Generado por \`tools/test-motores.mjs\` el ${new Date().toISOString().slice(0, 10)}. Cada motor se compara contra el \`.md\` que ya existía al lado del PDF.`);
lines.push('"Coincide" = todos los rubros que aparecen una sola vez en cada archivo tienen el mismo número. No significa que las dos estén bien si el canónico no es gold.');
lines.push('');
lines.push('| PDF | pág | canónico | ' + ENGINES.map((e) => `${e} (USD)`).join(' | ') + ' |');
lines.push('|---|---|---|' + ENGINES.map(() => '---').join('|') + '|');
const totals = Object.fromEntries(ENGINES.map((e) => [e, { ok: 0, match: 0, cost: 0, n: 0 }]));
for (const r of rows) {
  const cells = ENGINES.map((e) => {
    const x = r.engines[e];
    if (!x.ok) return 'FALLÓ';
    const c = x.compare;
    const cost = x.costUsd != null ? ` $${x.costUsd.toFixed(3)}` : '';
    totals[e].ok++; totals[e].n++;
    if (x.costUsd != null) totals[e].cost += x.costUsd;
    if (!c || c.error) return `? ${cost}`;
    if (c.match) totals[e].match++;
    return (c.match ? 'coincide' : `${c.mismatches} disc.`) + cost;
  });
  lines.push(`| ${r.pdf.replace(/^Clubes\//, '')} | ${r.pages ?? '?'} | ${r.gold ? 'gold' : 'sin-gold'} | ${cells.join(' | ')} |`);
}
lines.push('');
lines.push('| Motor | Generó .md | Coincide con el canónico | Costo real total |');
lines.push('|---|---|---|---|');
for (const e of ENGINES) lines.push(`| ${e} | ${totals[e].ok}/${rows.length} | ${totals[e].match}/${totals[e].ok} | $${totals[e].cost.toFixed(2)} |`);
lines.push('');
lines.push('Las discrepancias concretas (rubro, valor del canónico, valor del motor) están en `Admin/test-motores-resultados.jsonl`.');
writeFileSync(resolve(projectRoot, 'Admin', 'test-motores-resultados.md'), lines.join('\n') + '\n');
console.log('\nListo. Resumen en Admin/test-motores-resultados.md');
for (const e of ENGINES) console.log(`${e}: generó ${totals[e].ok}/${rows.length}, coincide ${totals[e].match}/${totals[e].ok}, costo $${totals[e].cost.toFixed(2)}`);

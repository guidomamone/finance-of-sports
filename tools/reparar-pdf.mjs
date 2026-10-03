#!/usr/bin/env node
// ============================================================================
// tools/reparar-pdf.mjs — diagnostica y ARREGLA PDFs que un motor de transcripción no puede leer, para que el pipeline no se frene ni
// dependa de que alguien adivine qué pasó (pedido de Guido 2026-09-30, tras PEC Zwolle y Thun). Sin API, sin internet, sin tokens.
//
// Lo usan los motores (hoy tools/mistral-ocr-transcribe.mjs) y el resolver; también anda solo:
//   node tools/reparar-pdf.mjs <pdf>            diagnostica e imprime el veredicto (no escribe nada)
//   node tools/reparar-pdf.mjs <pdf> --reparar  además deja una copia usable en $TMPDIR y la imprime
//
// Veredictos (campo `estado`):
//   sano           pdfinfo lo lee y no tiene imágenes que un motor rechace.
//   reparado       estaba dañado pero `qpdf` reconstruyó la tabla de referencias: `usable` apunta a la copia arreglada.
//   imagen-grande  tiene una imagen con una dimensión > LIMITE_PX (Thun: 128 x 105.696 px; Mistral responde 400 "image_too_large").
//                  Arreglo: las páginas con esas imágenes se rasterizan (pdftoppm) y se reemplazan por su foto en una copia
//                  (`usable`); el resto del documento queda igual (texto y numeración intactos).
//   truncado       el archivo se cortó (sin startxref/trailer y sin páginas recuperables: descarga incompleta, PEC Zwolle).
//                  NO se puede arreglar desde acá: el veredicto trae `motivo` y `fuente` (el link de fuentes/<País>/<Club>.md) para volver a bajarlo.
//   no-es-pdf      la cabecera no es %PDF (un HTML de error guardado como .pdf).
// ============================================================================

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, rmSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const LIMITE_PX = 8000; // por encima de esto, en cualquier dimensión, Mistral OCR rechaza la imagen (Thun, 105.696 px, fue rechazada)

const sh = (cmd, a, opt = {}) => execFileSync(cmd, a, { maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'], ...opt }).toString('latin1');
const paginas = (pdf) => Number((sh('pdfinfo', [pdf]).match(/^Pages:\s+(\d+)/m) || [])[1]) || 0;
function qpdfOk(cmdArgs) { // qpdf devuelve 3 = éxito con advertencias; 2 = error
  try { execFileSync('qpdf', cmdArgs, { stdio: 'ignore' }); return true; } catch (e) { return e.status === 3; }
}

// El link de donde se bajó el documento, si fuentes/<País>/<Club>.md lo tiene (para el veredicto `truncado`).
function fuenteDe(pdf) {
  const rel = pdf.replace(root + '/', '').split('/'); // Clubes/<País>/<Club>/<archivo>.pdf
  if (rel[0] !== 'Clubes' || rel.length < 4) return null;
  const f = join(root, 'fuentes', rel[1], `${rel[2]}.md`);
  return existsSync(f) ? `fuentes/${rel[1]}/${rel[2]}.md (buscá el link de "${basename(pdf)}")` : null;
}

export function diagnosticar(pdfArg, { reparar = false } = {}) {
  const pdf = resolve(pdfArg);
  const head = readFileSync(pdf).subarray(0, 8).toString('latin1');
  if (!head.startsWith('%PDF')) return { estado: 'no-es-pdf', motivo: 'la cabecera no es %PDF (probablemente una página HTML guardada como .pdf)' };

  let n = 0; let usable = pdf; let reparado = false;
  try { n = paginas(pdf); } catch { n = 0; }
  if (!n) { // dañado: probar la reconstrucción de qpdf
    const tmp = join(mkdtempDir(), 'reconstruido.pdf');
    if (qpdfOk([pdf, tmp]) && existsSync(tmp)) { try { n = paginas(tmp); } catch { n = 0; } if (n) { usable = tmp; reparado = true; } }
    if (!n) return { estado: 'truncado', motivo: `no tiene tabla de referencias ni páginas recuperables (tamaño ${statSync(pdf).size} bytes): descarga cortada o archivo roto`, fuente: fuenteDe(pdf) };
  }

  // Imágenes que un motor rechaza por tamaño.
  const malas = new Set();
  try {
    for (const l of sh('pdfimages', ['-list', usable]).split('\n').slice(2)) {
      const c = l.trim().split(/\s+/); const pag = Number(c[0]); const w = Number(c[3]); const h = Number(c[4]);
      if (pag && (w > LIMITE_PX || h > LIMITE_PX)) malas.add(pag);
    }
  } catch { /* pdfimages puede fallar en PDFs raros: se sigue sin esa revisión */ }

  if (!malas.size) return { estado: reparado ? 'reparado' : 'sano', paginas: n, usable };
  const v = { estado: 'imagen-grande', paginas: n, paginasMalas: [...malas].sort((a, b) => a - b), motivo: `imagen de más de ${LIMITE_PX}px en las páginas ${[...malas].join(', ')}` };
  if (reparar) v.usable = rasterizarPaginas(usable, v.paginasMalas, n);
  else v.usable = null;
  return v;
}

function mkdtempDir() { const d = join(tmpdir(), `reparar-pdf-${process.pid}-${Date.now()}`); mkdirSync(d, { recursive: true }); return d; }

// Copia del PDF con las páginas `malas` reemplazadas por su foto (150 dpi). El resto de las páginas no se toca.
function rasterizarPaginas(pdf, malas, n) {
  const d = mkdtempDir(); const partes = [];
  for (const p of malas) {
    execFileSync('pdftoppm', ['-r', '150', '-png', '-f', String(p), '-l', String(p), '-singlefile', pdf, join(d, `p${p}`)], { stdio: 'ignore' });
    const py = `from PIL import Image; import sys; Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], "PDF", resolution=150)`;
    execFileSync('python3', ['-c', py, join(d, `p${p}.png`), join(d, `p${p}.pdf`)]);
  }
  // Se arma con qpdf: tramos del original entre las páginas malas y, en su lugar, la foto de cada una.
  const args = ['--empty', '--pages']; let desde = 1;
  for (const p of malas) { if (p > desde) args.push(pdf, `${desde}-${p - 1}`); args.push(join(d, `p${p}.pdf`), '1'); desde = p + 1; }
  if (desde <= n) args.push(pdf, `${desde}-${n}`);
  const out = join(d, 'sin-imagenes-grandes.pdf'); args.push('--', out);
  if (!qpdfOk(args)) throw new Error('qpdf no pudo armar la copia con las páginas rasterizadas');
  return out;
}

export function limpiar(usable, original) { if (usable && resolve(usable) !== resolve(original)) try { rmSync(dirname(usable), { recursive: true, force: true }); } catch { /* nada */ } }

if (import.meta.url === `file://${process.argv[1]}`) {
  const pdf = process.argv[2];
  if (!pdf) { console.error('Uso: node tools/reparar-pdf.mjs <pdf> [--reparar]'); process.exit(1); }
  console.log(JSON.stringify(diagnosticar(pdf, { reparar: process.argv.includes('--reparar') }), null, 1));
}

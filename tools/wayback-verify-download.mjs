#!/usr/bin/env node
// Descarga + chequeo de integridad para capturas de Wayback Machine — to-do 79 (Admin/TODO.md).
//
// El gotcha (encontrado en la sesión del 2026-09-26, ver .claude/skills/club-sourcing/SKILL.md
// sección 0.1, familia 3): una captura de Wayback puede truncarse a EXACTAMENTE 1.048.576 bytes
// (1 MiB) de forma permanente, con el header `warning: 299 wayback content truncated by "length"` —
// y esto NO tiene relación con el campo `length` que la propia CDX API reporta para ese snapshot
// (por eso no sirve comparar contra ese número: hay que chequear el ARCHIVO que llegó, no lo que la
// API dijo que iba a llegar). Un PDF truncado a mitad de archivo puede abrir "vacío" o fallar en
// silencio, dando la falsa impresión de que el club no tiene nada archivado (pasó con Almagro: se
// cerró como "0 PDFs" y en realidad tenía 6 balances reales).
//
// Este script reemplaza el chequeo manual (`pdfinfo`/buscar `%%EOF` a mano, que depende de que la
// sesión se acuerde de hacerlo) por uno automático que corre en cada descarga:
//   1. Descarga la URL de Wayback (tiene que incluir el modificador `id_` o `if_` para pedir el
//      archivo crudo, sin el toolbar de Wayback inyectado).
//   2. Si el tamaño descargado es EXACTAMENTE 1.048.576 bytes → señal fuerte de truncamiento
//      conocido.
//   3. Corre `pdfinfo` sobre el archivo (si es un PDF) y confirma que reporta `Pages:` sin error.
//      (Se lee el stdout de pdfinfo como string de Node, no se pipea a `grep` — evita el gotcha de
//      CLAUDE.md donde bytes NUL en la metadata hacen que `grep` deje de hacer matching línea por
//      línea.)
//   4. Confirma que el archivo termina en `%%EOF` (los últimos bytes, allowing whitespace/EOL).
//   Si CUALQUIER chequeo falla, el script NUNCA deja el archivo corrupto en su lugar final en
//   silencio: lo guarda al lado con un sufijo `.SOSPECHOSO-truncado` y termina con exit code 1 y un
//   mensaage explícito. Si todo pasa, mueve el archivo a la ruta final y termina con exit code 0.
//
// Uso:
//   node tools/wayback-verify-download.mjs "<url-de-wayback-con-id_-o-if_>" "<ruta-final.pdf>"
//
// Ejemplo:
//   node tools/wayback-verify-download.mjs \
//     "https://web.archive.org/web/20220630000000id_/https://bocajuniors.com.ar/balance.pdf" \
//     "Clubes/Argentina/Boca/balance-ejercicio-118.pdf"

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile, rename, unlink, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const execFileAsync = promisify(execFile);

const KNOWN_TRUNCATION_SIZE = 1048576; // 1 MiB — el tamaño exacto al que Wayback trunca en silencio
const REQUEST_TIMEOUT_MS = 120000;

function isProbablyPdf(path, bytes) {
  return path.toLowerCase().endsWith('.pdf') || (bytes.length >= 5 && bytes.subarray(0, 5).toString('latin1') === '%PDF-');
}

async function checkPdfinfo(path) {
  try {
    const { stdout } = await execFileAsync('pdfinfo', [path], { timeout: 30000 });
    if (!stdout.includes('Pages:')) {
      return { ok: false, reason: 'pdfinfo corrió pero no reportó "Pages:" en su salida' };
    }
    return { ok: true };
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {
        ok: false,
        reason: 'pdfinfo no está instalado (brew install tesseract poppler ya lo trae, o `brew install poppler` solo)',
        fatal: true,
      };
    }
    return { ok: false, reason: `pdfinfo falló: ${err.stderr?.trim() || err.message}` };
  }
}

function checkEof(bytes) {
  // %%EOF puede tener espacio/salto de línea/comentarios después; alcanza con buscarlo cerca del final.
  const tail = bytes.subarray(Math.max(0, bytes.length - 2048)).toString('latin1');
  if (!tail.includes('%%EOF')) {
    return { ok: false, reason: 'no se encontró "%%EOF" en los últimos bytes del archivo' };
  }
  return { ok: true };
}

async function main() {
  const [sourceUrl, finalPath] = process.argv.slice(2);
  if (!sourceUrl || !finalPath) {
    console.error(
      'Uso: node tools/wayback-verify-download.mjs "<url-de-wayback-con-id_-o-if_>" "<ruta-final.pdf>"'
    );
    process.exit(1);
  }
  if (!/\/(id_|if_)\//.test(sourceUrl)) {
    console.error(
      `AVISO: la URL no tiene el modificador id_/if_ (${sourceUrl}) — sin él, Wayback devuelve la ` +
        'página con su toolbar inyectado, no el archivo crudo. Revisá la URL antes de seguir.'
    );
  }

  console.error(`Descargando: ${sourceUrl}`);
  const res = await fetch(sourceUrl, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) {
    console.error(`ERROR: la descarga devolvió HTTP ${res.status} — no se guardó nada.`);
    process.exit(1);
  }
  const truncatedHeader = res.headers.get('x-archive-orig-warning') || '';
  const bytes = Buffer.from(await res.arrayBuffer());

  const problems = [];
  if (bytes.length === KNOWN_TRUNCATION_SIZE) {
    problems.push(
      `el archivo mide EXACTAMENTE ${KNOWN_TRUNCATION_SIZE} bytes — es la firma conocida de una ` +
        'captura de Wayback truncada en silencio (ver club-sourcing/SKILL.md 0.1). Probar otro ' +
        'timestamp de la misma URL en la CDX API antes de asumir que este es el contenido real.'
    );
  }
  if (/truncated/i.test(truncatedHeader)) {
    problems.push(`el propio Wayback avisó truncamiento en sus headers: "${truncatedHeader}"`);
  }

  if (isProbablyPdf(finalPath, bytes)) {
    const eof = checkEof(bytes);
    if (!eof.ok) problems.push(eof.reason);
  }

  await mkdir(dirname(finalPath), { recursive: true });

  if (isProbablyPdf(finalPath, bytes)) {
    const tmpPath = `${finalPath}.verificando-tmp`;
    await writeFile(tmpPath, bytes);
    const pdfCheck = await checkPdfinfo(tmpPath);
    if (!pdfCheck.ok) problems.push(pdfCheck.reason);

    if (problems.length > 0) {
      const suspectPath = `${finalPath}.SOSPECHOSO-truncado`;
      await rename(tmpPath, suspectPath);
      console.error(`\nERROR — archivo sospechoso de truncamiento, NO se guardó como "${finalPath}":`);
      for (const p of problems) console.error(`  - ${p}`);
      console.error(`\nSe guardó igual en "${suspectPath}" para inspección manual, pero no lo uses`);
      console.error('como si fuera el documento completo. Reintentar con otro timestamp de la CDX API.');
      process.exit(1);
    }

    await rename(tmpPath, finalPath);
  } else {
    // No es PDF (u otro tipo de documento archivado): solo aplican los chequeos de tamaño/headers.
    if (problems.length > 0) {
      const suspectPath = `${finalPath}.SOSPECHOSO-truncado`;
      await writeFile(suspectPath, bytes);
      console.error(`\nERROR — archivo sospechoso de truncamiento, NO se guardó como "${finalPath}":`);
      for (const p of problems) console.error(`  - ${p}`);
      console.error(`\nSe guardó igual en "${suspectPath}" para inspección manual.`);
      process.exit(1);
    }
    await writeFile(finalPath, bytes);
  }

  console.log(`OK — ${bytes.length} bytes, integridad verificada. Guardado en: ${finalPath}`);
}

main().catch((err) => {
  console.error(`\nERROR inesperado: ${err.message}\n`);
  process.exit(1);
});

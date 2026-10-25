#!/usr/bin/env node
// ============================================================================
// tools/informe-en-pdf.mjs — `fos informe-en-pdf`: ¿EL PDF TRAE EL INFORME DEL AUDITOR QUE FALTA EN SU TRANSCRIPCIÓN?
//
// POR QUÉ. Un balance cargado con `falta_transcripcion` (Admin/registros/auditoria.jsonl) muestra que el informe existe pero el .md no lo trae. Antes de pagar
// una re-transcripción (Mistral), esto mira gratis con `pdftotext` si el PDF dice algo más que el .md: si las dos menciones del informe (opinión, firma, «informe del
// auditor» en el idioma del documento) son las mismas, el PDF tampoco lo trae y re-transcribir no ayuda: hay que conseguir otro documento. Un PDF escaneado
// (casi sin texto) no se puede juzgar así: se mira con la transcripción por imagen, solo de las páginas del informe.
//
// USO:   node tools/informe-en-pdf.mjs "Clubes/<País>/<Club>/<archivo>.pdf" ["otro.pdf" …]   (también acepta la ruta del .md)
//        node tools/informe-en-pdf.mjs --lista <archivo con una ruta por línea>
// SALIDA: una línea por documento: páginas, caracteres de texto del PDF y del .md, menciones del informe en cada uno y el veredicto
//   (el PDF no trae más · el PDF trae más: re-transcribir · escaneado: mirar las páginas). No escribe nada ni llama a ninguna API.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const RE = /Best[äa]tigungsvermerk|Revisionsbericht|Bericht der Revisionsstelle|controleverklaring|accountantsverklaring|verslag van de commissaris|commissarisverslag|independent auditor|auditor.s report|revisjonsberetning|relat[óo]rio do auditor|relazione della societ|parecer do auditor|dictamen del revisor|informe del auditor/gi;
const menciones = (t) => (t.match(RE) || []).length;

const A = process.argv.slice(2);
let rutas = A.filter((x) => !x.startsWith('--'));
const li = A.indexOf('--lista');
if (li >= 0 && A[li + 1]) rutas = readFileSync(resolve(ROOT, A[li + 1]), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
if (!rutas.length) { console.error('Uso: node tools/informe-en-pdf.mjs "<ruta>.pdf" … | --lista <archivo>'); process.exit(1); }

for (const r of rutas) {
  const pdf = r.replace(/\.md$/i, '.pdf'); const md = r.replace(/\.pdf$/i, '.md');
  if (!existsSync(resolve(ROOT, pdf))) { console.log(`${pdf}: no existe el PDF`); continue; }
  let texto = '';
  try { texto = execFileSync('pdftotext', ['-layout', resolve(ROOT, pdf), '-'], { maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); }
  catch { console.log(`${pdf}: pdftotext no pudo leerlo`); continue; }
  let paginas = '?';
  try { paginas = (execFileSync('pdfinfo', [resolve(ROOT, pdf)], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().match(/Pages:\s+(\d+)/) || [])[1] || '?'; } catch { /* sin pdfinfo */ }
  const mdt = existsSync(resolve(ROOT, md)) ? readFileSync(resolve(ROOT, md), 'utf8') : '';
  const escaneado = texto.replace(/\s/g, '').length < 100 * (Number(paginas) || 1);
  const nP = menciones(texto), nM = menciones(mdt);
  const veredicto = escaneado ? 'escaneado: el PDF casi no tiene texto, mirar las páginas del informe por imagen'
    : nP > nM ? 'el PDF trae más menciones que el .md: re-transcribir las páginas del informe'
    : 'el PDF no trae más que el .md: re-transcribir no ayuda, hay que conseguir otro documento';
  console.log(`${pdf}: ${paginas} págs., texto del PDF ${texto.length} car. (md ${mdt.length}), menciones del informe PDF ${nP} / md ${nM} → ${veredicto}`);
}

#!/usr/bin/env node
// ============================================================================
// tools/dictamenes-md.mjs — los dictámenes del revisor fiscal de un club, de PDF a .md, y lo que hay que mirar antes de que el auditor los lea.
//
// POR QUÉ. En la carpeta de un club colombiano hay un `dictamen-revisor-fiscal-AAAA.pdf` por año y ningún `.md`; la línea del auditor (`Admin/registros/auditoria.jsonl`) exige citar el `.md`
// del MISMO ejercicio. Esto hace lo mecánico: marca los PDF idénticos entre sí (un año rotulado con el documento de otro, como Tolima 2024 y 2025), transcribe con `pdftotext -layout` los de texto nativo y
// dice cuáles son escaneos (hay que pasarlos por Mistral) y cuáles tienen un `.md` al que le falta el bloque de firma (la firma suele ser una imagen que `pdftotext` no extrae).
//
// USO:
//   node tools/dictamenes-md.mjs "<Club>"              ensayo: una línea por año (huella, duplicado, texto nativo o escaneo, .md, firma)
//   node tools/dictamenes-md.mjs "<Club>" --escribir   además escribe los .md de texto nativo que no existen (nunca pisa uno existente)
//   node tools/dictamenes-md.mjs --firma <archivo.md>  solo el escalón de firma de UN .md (1 ok, 2 firma-imagen que falta, 3 otro formato)
//   Carpeta: Clubes/<País>/<Club>/ con el país de tools/siis-clubes.json (Colombia).
// No llama a ninguna API. Escaneo: node tools/mistral-ocr-transcribe.mjs "<pdf>" (unos US$ 0,004 por página).
// ============================================================================
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const club = A.find((a) => !a.startsWith('--'));
const ESCRIBIR = A.includes('--escribir');
// La firma, en escalones (de lo seguro a lo dudoso). El dictamen termina con la fecha y el bloque del revisor (nombre, «Revisor Fiscal», T.P., «Designado por …»); en muchos PDF ese bloque es una imagen y no sale en el .md.
//  escalón 1: la ÚLTIMA fecha de dictamen del .md tiene un indicio de firma a menos de 8 líneas (o el .md ya trae el aviso «Bloque de firma» a mano): silencioso.
//  escalón 2: hay fecha pero sin indicio de firma cerca: casi seguro una firma-imagen que falta; dice la línea y qué hacer.
//  escalón 3: ni fecha ni indicio en todo el .md (otro formato): mirar el PDF a mano.
const FECHA = /^\s*[^\n,]{2,40},?\s+(?:\d{1,2}\s+de\s+[a-zñáéíóú]+\s+de\s+\d{4}|[a-zñáéíóú]+\s+\d{1,2}\s+de\s+\d{4})\.?\s*$/i;
const INDICIO = /(Revisor[a]?\s+Fiscal|T\.?\s?P\.?\s*N?[o°.]?\s*[\d.]+|Tarjeta\s+Profesional|Designad[oa]\s+por|Contador\s+P[úu]blico|Bloque de firma)/i;
function firma(md) {
  const L = md.split('\n'); let ultima = -1;
  L.forEach((l, i) => { if (FECHA.test(l)) ultima = i; });
  if (ultima < 0) return { escalon: INDICIO.test(md) ? 1 : 3 };
  const cerca = L.slice(Math.max(0, ultima - 8), ultima + 9).join('\n');
  const final = L.filter((l) => l.trim()).slice(-15).join('\n'); // la fecha puede estar arriba (carta) y el bloque del revisor al final
  return INDICIO.test(cerca) || INDICIO.test(final) ? { escalon: 1 } : { escalon: 2, linea: ultima + 1, texto: L[ultima].trim() };
}
if (A[0] === '--firma') { const f = firma(readFileSync(resolve(A[1]), 'utf8')); console.log(`escalón ${f.escalon}${f.linea ? ` (línea ${f.linea}: ${f.texto})` : ''}`); process.exit(0); } // prueba de la heurística sobre UN .md
if (!club) { console.error('Uso: node tools/dictamenes-md.mjs "<Club>" [--escribir]   |   --firma <archivo.md>'); process.exit(1); }
const cfg = JSON.parse(readFileSync(join(ROOT, 'tools/siis-clubes.json'), 'utf8'));
const dir = join(ROOT, 'Clubes', cfg.pais, club);
if (!existsSync(dir)) { console.error(`No existe ${dir}`); process.exit(1); }

const texto = (pdf) => { try { return execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8', maxBuffer: 1e8 }); } catch { return ''; } };
const vistos = new Map();
const pdfs = readdirSync(dir).filter((f) => /^dictamen-revisor-fiscal-\d{4}\.pdf$/.test(f)).sort();
if (!pdfs.length) console.log(`${club}: sin dictamen-revisor-fiscal-AAAA.pdf en la carpeta (hueco de sourcing: Admin/sourcing/${cfg.pais}/_notas-generales.md).`);
const escaneos = [];
for (const f of pdfs) {
  const a = f.match(/(\d{4})/)[1]; const ruta = join(dir, f); const md = ruta.replace(/\.pdf$/, '.md');
  const huella = createHash('sha1').update(readFileSync(ruta)).digest('hex').slice(0, 8);
  const dup = vistos.get(huella); vistos.set(huella, dup || a);
  const t = texto(ruta); const paginas = t.split('\f').filter((p) => p.trim());
  const anioTexto = [...new Set((t.match(/(?:31 de diciembre de|Estados Financieros de|ejercicio[^\n]{0,30})\s*(20\d\d)/gi) || []).map((s) => s.match(/20\d\d/)[0]))];
  const notas = [];
  if (dup) notas.push(`IDÉNTICO al de ${dup}: uno de los dos años está rotulado con el documento del otro (mirá de qué año habla y volvé a buscar el que falta)`);
  if (anioTexto.length && !anioTexto.includes(a)) notas.push(`el texto habla de ${anioTexto.join(', ')}, no de ${a}`);
  if (!paginas.length && !existsSync(md)) { notas.push(`ESCANEO: node tools/mistral-ocr-transcribe.mjs "Clubes/${cfg.pais}/${club}/${f}"`); escaneos.push(a); }
  let estado = existsSync(md) ? 'md ya existe' : paginas.length ? (dup ? 'no se escribe (duplicado)' : ESCRIBIR ? 'escrito' : 'se escribiría') : 'sin texto nativo';
  if (paginas.length && !existsSync(md) && !dup && ESCRIBIR) {
    const cuerpo = paginas.map((p, i) => `--- pág. ${i + 1} ---\n\n${p.replace(/\s+$/, '')}\n`).join('\n');
    writeFileSync(md, `# ${club} — Dictamen del revisor fiscal, ejercicio ${a}\n\nTranscripción completa de \`${f}\` (texto nativo, extraído con \`pdftotext -layout\`). Fiel al original, sin redondear ni reclasificar — ver CLAUDE.md.\n\n${cuerpo}`);
  }
  const mdTexto = existsSync(md) ? readFileSync(md, 'utf8') : '';
  const fi = mdTexto ? firma(mdTexto) : null;
  if (fi && fi.escalon > 1) notas.push(fi.escalon === 2
    ? `firma, escalón 2: la fecha del dictamen (línea ${fi.linea}, «${fi.texto}») no tiene nombre ni T.P. del revisor a su lado: la firma suele ser una imagen que pdftotext no extrae; leé la última página del PDF (Read con pages) y agregá el bloque al .md marcado «[Bloque de firma impreso como imagen en el PDF (pág. N), transcripto a mano:]» antes de la fecha`
    : 'firma, escalón 3: el .md no trae ninguna fecha de dictamen ni nombre de revisor: otro formato, mirar el PDF a mano');
  if (paginas.length && paginas.length <= 4 && !/opini[oó]n/i.test(t)) notas.push('sin palabra «opinión»: puede ser solo el informe legal o de control interno; si no trae la opinión sobre los estados, el año es `falta_transcripcion`');
  console.log(`${a}  ${huella}  ${paginas.length ? `${paginas.length} pág. de texto` : 'sin texto'}  ${estado}${notas.length ? '\n      · ' + notas.join('\n      · ') : ''}`);
}
if (escaneos.length) console.log(`\nEscaneos (${escaneos.join(', ')}): pasalos por Mistral y volvé a correr esto para ver la firma.`);
if (!ESCRIBIR && pdfs.length) console.log('\nEnsayo: no se escribió nada (--escribir).');

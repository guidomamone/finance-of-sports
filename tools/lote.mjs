#!/usr/bin/env node
// ============================================================================
// tools/lote.mjs — EL PROCESO NUEVO de punta a punta sobre un LOTE CHICO (5 PDFs), para ir refinando y viendo dónde hace falta la cola humana.
//
// POR QUÉ (Versión 324; pedido de Guido el 2026-10-01: "la idea es hacer 5 PDFs juntos e ir refinando y viendo dónde se necesita cola humana;
// vos me podés decir 'revisar tal cosa en el PDF y tal otra en el md' y yo abro el PDF por mi cuenta o la transcripción; arrancar por los
// clubes para los cuales ya tenemos transcripción pero no están cargados"). El proceso entero, con riesgos y mitigaciones etapa por etapa,
// está en Admin/HANDOFF-pipeline.md, "El proceso nuevo".
//
// LAS ETAPAS QUE CORRE (las 1 conseguir y 2 transcribir ya están hechas para los documentos del lote: se eligen PDFs con .md):
//   3  localizar.mjs        qué bloques son el estado de resultados y sus notas                      IA, ~US$ 0,05
//   4  validar-bloques.mjs  cada número de esos bloques contra el PDF (texto propio o Gemini)         gratis / ~US$ 0,003 por página escaneada
//   5  extraer.mjs          las filas tal cual, con escala por bloque y la columna del año anterior   IA, ~US$ 0,05-0,10
//   6  verificar.mjs        chequeos gratis; lo que no cierra va a la cola; deja el .rubros.json     gratis
//   7  categorización de siempre: glosar-rubros.mjs, jev-categorizar.mjs, categorizar-claude.mjs (con precedente, familia y memoria)  ~US$ 0,03
//   8  cargar.mjs --desde-verificacion   PROPUESTA (no escribe el sitio): qué cargaría y por qué frena                gratis
// Un documento que va a la cola en la 6 sigue igual hasta la 8 (para ver todo lo que le falta de una vez), pero la 8 lo frena.
//
// POR DEFECTO ES UN ENSAYO: no llama a ninguna API, dice qué haría y cuánto costaría. --ejecutar lo corre. Cada etapa guarda su resultado en
// Generados/ y no se repite (--rehacer para forzar las de IA): cortar con Control+C y volver a correr sigue donde quedó.
//
// AL TERMINAR: un resumen por documento (en qué etapa quedó y por qué) y la cola humana con qué mirar en el PDF y en el .md
// (node tools/cola.mjs). Las respuestas de Guido se toman en la próxima corrida del mismo lote.
//
// USO:
//   node tools/lote.mjs --lista Admin/lote-01.txt                 ensayo con costo
//   caffeinate -i node tools/lote.mjs --lista Admin/lote-01.txt --ejecutar
//   En la lista, "testigo <pdf>" = documento que solo sirve para verificar a otro (ver TESTIGOS abajo).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { localizar } from './localizar.mjs';
import { validar } from './validar-bloques.mjs';
import { extraer } from './extraer.mjs';
import { pendientes } from './cola.mjs';
import { derivado } from './rutas.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { verificar } = await import('./verificar.mjs');
const { loadSite } = await import('./proponer-carga.mjs');
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const LISTA = flag('--lista'); const EJECUTAR = ARGS.includes('--ejecutar'); const REHACER = ARGS.includes('--rehacer');
// --reintentar (Versión 336, CAMINO DE ERROR: decisión de Guido, las reglas extra son "para cuando haya errores"): solo los documentos cuya
// última verificación marcó desgloses que no suman (verificacion.reintentar) vuelven a localizar con el índice ampliado (filas que terminan
// en "-") y a extraer con la lista de lo que no sumó. Una sola vez por documento (después queda `reintentado`). El resto del lote no se toca.
const REINTENTAR = ARGS.includes('--reintentar');
const leerDerivado = (e, suf) => { try { const p = resolve(ROOT, derivado(e.md, suf, { crear: false })); return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null; } catch { return null; } };
// Lo que hay que reintentar: desgloses que no suman (verificar.mjs) y categorías en 0 que deberían tener número (cargar.mjs, Versión 340).
const verifDe = (e) => { const v = leerDerivado(e, '.verificacion.json') || {}; const c = leerDerivado(e, '.carga.json') || {}; const r = [...(v.reintentar || []), ...(c.reintentar || [])]; return { ...v, reintentar: r.length ? r : null }; };
if (!LISTA) { console.error('Uso: node tools/lote.mjs --lista <archivo> [--ejecutar] [--rehacer]'); process.exit(1); }
// TESTIGOS (Versión 334, ok de Guido): una línea "testigo <pdf>" es un documento que entra SOLO para verificar a otro (su columna "año
// anterior" contra el año actual del otro: chequeo de año vecino de verificar.mjs). Pasa por localizar, validar y extraer, y nada más: no se
// verifica, no se categoriza ni se propone cargar (UC 2022 en el lote 03: ya cargado, llenaba la terminal con 7 frenos esperables).
const lineas = readFileSync(resolve(ROOT, LISTA), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const testigos = new Set(lineas.filter((l) => /^testigo\s+/i.test(l)).map((l) => l.replace(/^testigo\s+/i, '')));
// DESCARTADOS (Versión 344): Admin/documentos-descartados.txt lista los documentos que Guido descartó como fuente; el lote los saltea.
const descartados = new Set((existsSync(resolve(ROOT, 'Admin', 'documentos-descartados.txt')) ? readFileSync(resolve(ROOT, 'Admin', 'documentos-descartados.txt'), 'utf8') : '').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')));
const docs = lineas.map((l) => l.replace(/^testigo\s+/i, '')).filter((d) => { if (descartados.has(d)) { console.log(`  ${d}: descartado (Admin/documentos-descartados.txt)`); return false; } return true; });
if (docs.length > 10) console.log(`OJO: ${docs.length} documentos. El proceso nuevo se refina de a 5 (pedido de Guido).`);
const leerRegistro = () => readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
let registro = leerRegistro();
// silencioso: para las tools que se llaman solo por su efecto y imprimen un resumen de TODO el proyecto (inventario-transcripciones.mjs
// imprimía ~150 líneas del registro entero en medio de la etapa 7; Versión 327). Si fallan, se muestra su salida igual.
const node = (tool, argv, { silencioso = false } = {}) => {
  const r = spawnSync('node', [resolve(ROOT, tool), ...argv], { cwd: ROOT, stdio: silencioso ? 'pipe' : 'inherit', encoding: 'utf8' });
  if (silencioso && r.status !== 0) process.stdout.write(`${r.stdout || ''}${r.stderr || ''}`);
  return r;
};

let usd = 0; const estado = {}; const aRetranscribir = [];
// Páginas interiores (sin las 2 primeras ni la última) con menos de 200 caracteres de texto propio: son imágenes.
const paginasEnImagen = (pdf) => {
  const n = Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0); const out = [];
  for (let i = 3; i < n; i++) { const t = spawnSync('pdftotext', ['-f', String(i), '-l', String(i), resolve(ROOT, pdf), '-'], { encoding: 'utf8' }).stdout || ''; if (t.replace(/\s/g, '').length < 200) out.push(i); }
  return out;
};
console.log(`\n=== Etapas 3-5: localizar, validar, extraer (${EJECUTAR ? 'DE VERDAD' : 'ENSAYO, sin API'}) ===`);
for (const pdf of docs) {
  const e = registro.find((x) => x.pdf === pdf);
  if (!e?.md) { estado[pdf] = 'sin transcripción (etapa 2)'; console.log(`  ${pdf}: sin .md`); continue; }
  const reintento = REINTENTAR ? verifDe(e)?.reintentar || null : null;
  const sinEstadoAntes = !!leerDerivado(e, '.ubicacion.json')?.sin_estado; // candidato al escalón 1 de la etapa 2 (re-transcribir)
  if (REINTENTAR && !reintento && !sinEstadoAntes) { estado[pdf] = 'sin reintento pendiente'; console.log(`  ${pdf}: sin desgloses que reintentar`); continue; }
  const L = await localizar(pdf, { registro, ejecutar: EJECUTAR, rehacer: REHACER || !!reintento, ampliado: !!reintento, reintento });
  if (L.ensayo) { usd += L.usd + 0.07; console.log(`  ${pdf}: localizar ~US$ ${L.usd.toFixed(3)} + extraer ~US$ 0,07 (estimado)`); continue; }
  if (L.error) { estado[pdf] = `localizar: ${L.error}`; continue; }
  usd += L.costo;
  if (L.datos.sin_estado) {
    // ETAPA 2, ESCALÓN 1 (Versión 343, escalera aprobada por Guido): "no hay estado de resultados" puede ser culpa de la TRANSCRIPCIÓN. Caso
    // real, UC 2015: PDF híbrido, las páginas 4-9 (los estados) son imágenes; la transcripción vieja salió del texto propio del PDF y no las
    // tiene. Si la transcripción no la hizo Mistral y el PDF tiene páginas interiores casi sin texto, se marca para re-transcribir con Mistral
    // (que lee las imágenes); con --reintentar se hace y se vuelve a localizar. Si no, queda como fuente (como siempre).
    const enImagen = paginasEnImagen(pdf);
    const candidato = !String(e.motor || '').includes('mistral') && enImagen.length >= 2;
    if (candidato && REINTENTAR && EJECUTAR && !e.retranscritoPorLote) {
      // La transcripción vieja se MUEVE a Generados/ (mistral-ocr-transcribe.mjs no pisa un .md existente: "Ya existe el .md -- no lo piso",
      // UC 2015 en la primera corrida). Si Mistral falla, se restaura.
      const mdAbs = resolve(ROOT, e.md); const previo = resolve(ROOT, derivado(e.md, `.previo-${new Date().toISOString().slice(0, 10)}.md`));
      copyFileSync(mdAbs, previo); unlinkSync(mdAbs);
      console.log(`  ${pdf}: re-transcribiendo con Mistral (páginas en imagen: ${enImagen.join(', ')})...`);
      const r = node('tools/mistral-ocr-transcribe.mjs', [pdf]);
      if (r.status !== 0 || !existsSync(mdAbs)) { if (!existsSync(mdAbs)) copyFileSync(previo, mdAbs); estado[pdf] = 'escalón 1 de la etapa 2: Mistral falló (se restauró la transcripción anterior)'; continue; }
      node('tools/inventario-transcripciones.mjs', [], { silencioso: true }); registro = leerRegistro();
      const L2 = await localizar(pdf, { registro, ejecutar: true, rehacer: true }); usd += L2.costo || 0;
      if (L2.error || L2.datos?.sin_estado) { estado[pdf] = 'sin estado de resultados aun re-transcripto (queda como fuente)'; continue; }
      const V2 = await validar(pdf, { registro, ejecutar: true, rehacer: true }); usd += V2.costo || 0;
      const X2 = await extraer(pdf, { registro, ejecutar: true, rehacer: true }); usd += X2.costo || 0;
      if (X2.error) { estado[pdf] = `extraer: ${X2.error}`; continue; }
      estado[pdf] = 'extraído (re-transcripto con Mistral)'; console.log(`  ${pdf}: re-transcripto y extraído · ${X2.datos.filas.length} filas`);
      continue;
    }
    if (candidato) aRetranscribir.push({ pdf, paginas: enImagen });
    estado[pdf] = candidato ? `sin estado en la transcripción; ${enImagen.length} páginas en imagen: re-transcribir (--reintentar)` : 'sin estado de resultados (queda como fuente)';
    console.log(`  ${pdf}: ${estado[pdf]}${candidato && REINTENTAR && !EJECUTAR ? ` · Mistral ~US$ ${(0.004 * Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0)).toFixed(2)} + localizar y extraer ~US$ 0,15` : ''}`);
    continue;
  }
  // En el ensayo, validar y extraer TAMBIÉN van en ensayo (hasta la Versión 326 iban con ejecutar: true fijo: con localizar ya hecho, el
  // ensayo llamaba a extraer de verdad y gastaba). validar en un PDF digital es gratis y corre igual; en un escaneo estima.
  const V = await validar(pdf, { registro, ejecutar: EJECUTAR, rehacer: REHACER || !!reintento }); usd += V.costo || V.usd || 0;
  const X = await extraer(pdf, { registro, ejecutar: EJECUTAR, rehacer: REHACER || !!reintento, reintento });
  if (X.ensayo) { usd += X.usd; console.log(`  ${pdf}: localizar ya hecho · extraer ~US$ ${X.usd.toFixed(3)} (estimado)`); continue; }
  usd += X.costo || 0;
  if (X.error) { estado[pdf] = `extraer: ${X.error}`; continue; }
  estado[pdf] = testigos.has(pdf) ? 'testigo (solo hasta extraer)' : 'extraído';
  console.log(`  ${pdf}: estado ${L.datos.estado.join(',')} · ${V.datos?.modo || '?'} · ${X.datos.filas.length} filas · US$ ${usd.toFixed(2)} acumulado`);
}
if (!EJECUTAR) { console.log(`\nENSAYO: ~US$ ${usd.toFixed(2)} para localizar y extraer ${docs.length} documento(s), más ~US$ 0,03 c/u de categorización y la validación de páginas escaneadas (~US$ 0,003 por página). Agregá --ejecutar.`); process.exit(0); }

console.log('\n=== Etapa 6: verificar (gratis) ===');
const sitio = loadSite();
for (const pdf of docs.filter((d) => estado[d] === 'extraído')) {
  const r = verificar(pdf, { registro, sitio, escribirRubros: true });
  estado[pdf] = r.error ? `verificar: ${r.error}` : r.estado === 'ok' ? 'verificado' : `verificado con ${r.cola.length} caso(s) en la cola`;
  if (!r.error) for (const c of r.chequeos) console.log(`  ${pdf.split('/').slice(2).join('/')}: ${c.ok === true ? 'ok' : c.ok === false ? 'NO' : '-'} ${c.nombre}: ${c.detalle}`);
}

console.log('\n=== Etapa 7: categorizar (Jev y Claude, con precedente y memoria) ===');
const conRubros = docs.filter((d) => String(estado[d]).startsWith('verificado'));
if (conRubros.length) {
  writeFileSync(resolve(ROOT, 'Admin', '.lote-lista-actual.txt'), conRubros.join('\n') + '\n');
  node('tools/inventario-transcripciones.mjs', [], { silencioso: true }); registro = leerRegistro();
  node('tools/glosar-rubros.mjs', ['--listos', '--lista', 'Admin/.lote-lista-actual.txt']);
  node('tools/jev-categorizar.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/.lote-lista-actual.txt']);
  node('tools/categorizar-claude.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/.lote-lista-actual.txt']);
  console.log('\n=== Etapa 8: cargar (PROPUESTA, no escribe el sitio) ===');
  node('tools/cargar.mjs', ['--lista', 'Admin/.lote-lista-actual.txt', '--desde-verificacion']);
}

console.log('\n=== RESUMEN DEL LOTE ===');
for (const pdf of docs) console.log(`  ${String(estado[pdf] || '?').padEnd(42)} ${pdf}`);
const cola = pendientes().filter((c) => docs.includes(c.pdf));
if (aRetranscribir.length) {
  console.log(`\nTRANSCRIPCIONES SIN LAS PÁGINAS EN IMAGEN (etapa 2, escalón 1):`);
  for (const x of aRetranscribir) console.log(`  ${x.pdf.split('/').slice(2).join('/')}: páginas ${x.paginas.join(', ')}`);
  console.log(`  Re-transcribir con Mistral y volver a localizar (~US$ 0,004 por página + localizar y extraer): caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar`);
}
// Camino de error: qué documentos quedaron con desgloses que no suman y todavía no se reintentaron.
const aReintentar = docs.filter((d) => { const e = registro.find((x) => x.pdf === d); return e?.md && verifDe(e)?.reintentar; });
if (aReintentar.length) {
  console.log(`\nREINTENTOS PENDIENTES (camino de error, una vez por documento: desgloses que no suman o categorías en 0 que deberían tener número):`);
  for (const d of aReintentar) console.log(`  ${d.split('/').slice(2).join('/')}: ${verifDe(registro.find((x) => x.pdf === d)).reintentar.map((x) => (x.categoria ? `"${x.categoria}" en 0` : `"${x.renglon}" ${x.suma} contra ${x.objetivo}`)).join('; ')}`);
  console.log(`  Reintento con índice ampliado (~US$ 0,30 por documento): caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar`);
}
console.log(`\nGastado: US$ ${usd.toFixed(2)} (más la categorización: node tools/gasto.mjs). Cola humana de este lote: ${cola.length} caso(s) -> node tools/cola.mjs`);

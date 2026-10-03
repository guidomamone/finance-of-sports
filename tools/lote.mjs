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

import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { localizar } from './localizar.mjs';
import { validar } from './validar-bloques.mjs';
import { extraer } from './extraer.mjs';
import { pendientes } from './cola.mjs';
import { derivado } from './rutas.mjs';
import { paginasARearmar, rearmar } from './texto-propio-a-md.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { verificarLista } = await import('./verificar.mjs');
const { ajusteDe } = await import('./ajustes.mjs');
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

let usd = 0; const estado = {}; const aRetranscribir = []; const aTextoPropio = [];
// Páginas interiores (sin las 2 primeras ni la última) con menos de 200 caracteres de texto propio: son imágenes.
const paginasEnImagen = (pdf) => {
  const n = Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0); const out = [];
  for (let i = 3; i < n; i++) { const t = spawnSync('pdftotext', ['-f', String(i), '-l', String(i), resolve(ROOT, pdf), '-'], { encoding: 'utf8' }).stdout || ''; if (t.replace(/\s/g, '').length < 200) out.push(i); }
  return out;
};
console.log(`\n=== Etapas 3-5: localizar, validar, extraer (${EJECUTAR ? 'DE VERDAD' : 'ENSAYO, sin API'}) ===`);
for (const pdf of docs) {
  const e = registro.find((x) => x.pdf === pdf);
  // (Versión 407) el registro puede tener la ruta del .md sin el archivo en disco (tieneMd: false, "PAGADO SIN .md": Novorizontino 2022);
  // antes pasaba a localizar.mjs y el lote entero se caía con ENOENT.
  if (!e?.md || !existsSync(resolve(ROOT, e.md))) { estado[pdf] = 'sin transcripción (etapa 2)'; console.log(`  ${pdf}: sin .md`); continue; }
  // AÑO YA CARGADO (Versión 406, auditoría del pipeline): con --reintentar, un documento cuyo año ya está en el sitio NO se reintenta por
  // "desglose que no suma" (se cargó con el renglón sin abrir, a propósito; en Fortaleza 2018-2020 esas marcas eran ruido: 5.867,807 contra
  // 5.867,804). Solo por "categoría en 0" de su propuesta de carga, y solo si esa propuesta es posterior al último ajuste manual (si no, es
  // vieja: Goiás 2025 y 2017 se reprocesaron por una propuesta anterior a sus ajustes cero-real, US$ 0,45). Caso que sí: Fortaleza 2017,
  // sueldos en 0 (Admin/lote-08b.txt).
  const cargaFresca = (() => { try { const pc = resolve(ROOT, derivado(e.md, '.carga.json', { crear: false })); const pa = resolve(ROOT, 'Admin', 'ajustes-manuales.jsonl'); return existsSync(pc) && (!existsSync(pa) || statSync(pc).mtimeMs >= statSync(pa).mtimeMs); } catch { return false; } })();
  const reintento = !REINTENTAR ? null : e.cargado ? ((cargaFresca && (leerDerivado(e, '.carga.json')?.reintentar || []).filter((x) => x.categoria)) || []).length ? leerDerivado(e, '.carga.json').reintentar.filter((x) => x.categoria) : null : verifDe(e)?.reintentar || null;
  if (REINTENTAR && e.cargado && !reintento) { estado[pdf] = 'ya cargado, sin categorías en 0 que reintentar'; console.log(`  ${pdf}: ya cargado (no se reintenta por desgloses)`); continue; }
  const sinEstadoAntes = !!leerDerivado(e, '.ubicacion.json')?.sin_estado; // candidato al escalón 1 de la etapa 2 (re-transcribir)
  // ETAPA 3, ESCALÓN 2 (Versión 360, aprobado por Guido): "las notas hacen de estado". Solo con --reintentar, una vez por documento, si la
  // localización anterior no encontró estado (sin_estado, o la lista del estado vacía) pero sí notas de ingresos Y de gastos, y la transcripción
  // no es candidata al escalón 1 de la etapa 2 (re-transcribir: no es de Mistral y tiene páginas en imagen; ese va primero). Caso real: Fortaleza
  // CEIF, Colombia (solo notas; 2022 con transcripción vieja, sin páginas en imagen).
  const ubAntes = leerDerivado(e, '.ubicacion.json');
  const candidatoNotas = REINTENTAR && ubAntes && !ubAntes.intentoNotasComoEstado && (ubAntes.sin_estado || !(ubAntes.estado || []).length)
    && (ubAntes.notas_ingresos || []).length && (ubAntes.notas_gastos || []).length && (String(e.motor || '').includes('mistral') || e.retranscritoPorLote || paginasEnImagen(pdf).length < 2);
  // CON AJUSTE MANUAL (Versión 370, idea de Guido: "el camino de error es ¿tiene un ajuste manual? si está, aplicarlo; si no, seguir la
  // escalera"): un documento que quedó como fuente y tiene un ajuste `resultado-final` con línea repite UNA vez las notas como estado, con el
  // dato del ajuste como pista para localizar. Casos: Fortaleza CEIF 2018 y 2019.
  const ajRes = ajusteDe(pdf, 'resultado-final');
  const candidatoAjuste = REINTENTAR && ubAntes && !ubAntes.intentoNotasConAjuste && (ubAntes.sin_estado || !(ubAntes.estado || []).length) && ajRes?.linea;
  if (candidatoNotas || candidatoAjuste) {
    const L3 = await localizar(pdf, { registro, ejecutar: EJECUTAR, rehacer: true, notasComoEstado: true, pistaResultado: candidatoAjuste ? { valor: ajRes.valor, linea: ajRes.linea } : null });
    if (L3.ensayo) { usd += L3.usd + 0.07; console.log(`  ${pdf}: sin estado, con notas: las notas hacen de estado (etapa 3, escalón 2${candidatoAjuste ? ', con la pista del ajuste manual' : ''}) · localizar ~US$ ${L3.usd.toFixed(3)} + extraer ~US$ 0,07`); continue; }
    if (L3.error) { estado[pdf] = `localizar (notas como estado): ${L3.error}`; continue; }
    usd += L3.costo || 0;
    if (L3.datos.sin_estado) { estado[pdf] = 'sin estado de resultados ni notas con resultado impreso (queda como fuente)'; console.log(`  ${pdf}: ${estado[pdf]}`); continue; }
    const V3 = await validar(pdf, { registro, ejecutar: true, rehacer: true }); usd += V3.costo || V3.usd || 0;
    const X3 = await extraer(pdf, { registro, ejecutar: true, rehacer: true }); usd += X3.costo || 0;
    if (X3.error) { estado[pdf] = `extraer: ${X3.error}`; continue; }
    estado[pdf] = 'extraído (las notas hacen de estado)'; console.log(`  ${pdf}: las notas hacen de estado · ${X3.datos.filas.length} filas · US$ ${usd.toFixed(2)} acumulado`);
    continue;
  }
  // ETAPA 2, ESCALÓN 1 (Versión 395, escalera aprobada por Guido el 2026-10-02): la etapa 4 de una corrida anterior dijo que el .md NO
  // coincide con el texto propio del PDF (cifras con un dígito distinto, o casi nada en común) y el PDF sí tiene texto propio: esas páginas
  // se rearman con él (tools/texto-propio-a-md.mjs, gratis) y el documento vuelve a localizar, validar y extraer. Una vez por documento
  // (el .md queda marcado). Compuerta: la etapa 4 sobre el .md nuevo y, después, la etapa 6. Caso: Goiás 2008-2016 (balances de diario).
  // (Versión 397) el rearmado tiene su propia escalera: método "columnas" primero; "regiones" solo si con "columnas" la etapa 6 no cerró.
  const TP = paginasARearmar(pdf, e.md, e); const pagsTP = TP?.paginas;
  if (pagsTP) {
    if (!(REINTENTAR && EJECUTAR)) { aTextoPropio.push({ pdf, paginas: pagsTP }); console.log(`  ${pdf}: ${TP.metodo === 'regiones' ? 'rearmada con el texto propio (columnas) y sigue sin cerrar' : 'la transcripción no coincide con el texto propio del PDF'} (págs. ${pagsTP.join(', ')}): rearmar (método ${TP.metodo}, --reintentar, gratis) + localizar y extraer ~US$ 0,12`); if (!EJECUTAR) usd += 0.12; continue; }
    rearmar(pdf, pagsTP, TP.metodo);
    console.log(`  ${pdf}: págs. ${pagsTP.join(', ')} rearmadas con el texto propio del PDF (etapa 2, escalón 1, método ${TP.metodo})`);
    const L4 = await localizar(pdf, { registro, ejecutar: true, rehacer: true }); usd += L4.costo || 0;
    if (L4.error || L4.datos?.sin_estado) { estado[pdf] = L4.error ? `localizar: ${L4.error}` : 'sin estado de resultados aun con el texto propio (queda como fuente)'; continue; }
    const V4 = await validar(pdf, { registro, ejecutar: true, rehacer: true }); usd += V4.costo || V4.usd || 0;
    const X4 = await extraer(pdf, { registro, ejecutar: true, rehacer: true }); usd += X4.costo || 0;
    if (X4.error) { estado[pdf] = `extraer: ${X4.error}`; continue; }
    estado[pdf] = 'extraído (texto propio del PDF)'; console.log(`  ${pdf}: estado ${L4.datos.estado.join(',')} · ${V4.datos?.modo || '?'} · ${X4.datos.filas.length} filas · US$ ${usd.toFixed(2)} acumulado`);
    continue;
  }
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
// startsWith (Versión 347): el escalón 1 de la etapa 2 deja 'extraído (re-transcripto con Mistral)'; con la igualdad exacta ese documento no
// pasaba a verificar en la misma corrida (UC 2015, lote 06: re-transcripto y extraído, y la etapa 6 lo salteaba).
// verificarLista (Versión 362): repite la pasada si un documento tomó la escala del año vecino (la cadena de escala depende del orden).
for (const [pdf, r] of verificarLista(docs.filter((d) => String(estado[d]).startsWith('extraído')), { registro, sitio, escribirRubros: true })) {
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
// TROUBLESHOOTING (Versión 346): desgloses que siguen sin sumar DESPUÉS del reintento -> diagnóstico (¿índice o transcripción?).
const sinArreglo = docs.filter((d) => { const e = registro.find((x) => x.pdf === d); const v = e?.md ? leerDerivado(e, '.verificacion.json') : null; return v?.reintentado && v?.faltasDesglose; });
if (sinArreglo.length) {
  console.log(`\nDESGLOSES QUE SIGUEN SIN SUMAR DESPUÉS DEL REINTENTO (se cargan con el renglón sin abrir; diagnóstico gratis):`);
  for (const d of sinArreglo) console.log(`  node tools/diagnostico-desglose.mjs "${d}"`);
}
if (aTextoPropio.length && !REINTENTAR) {
  console.log(`\nTRANSCRIPCIONES QUE NO COINCIDEN CON EL TEXTO PROPIO DEL PDF (etapa 2, escalón 1: se rearman gratis con él y se vuelve a localizar y extraer):`);
  for (const d of aTextoPropio) console.log(`  ${d.pdf.split('/').slice(2).join('/')}: págs. ${d.paginas.join(', ')}`);
  console.log(`  caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar`);
}
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

// RESULTADO (Versión 351, pedido de Guido: "que al final de la corrida diga 'Frenados X' 'Listo para cargar Y'"). Lee la última propuesta de
// carga (<doc>.carga.json) de CADA documento de la lista, no solo de los que pasaron por la etapa 8 en esta corrida (en un --reintentar la
// etapa 8 corre solo sobre los reintentados). "Ya en el sitio" va aparte: un año ya cargado frena por diseño (cargar.mjs no pisa un
// ejercicio), y contarlo como frenado escondería los frenados de verdad.
const resultado = { listo: [], frenado: [], yaCargado: [], sinPropuesta: [] };
for (const pdf of docs.filter((d) => !testigos.has(d))) {
  const e = registro.find((x) => x.pdf === pdf); const c = e?.md ? leerDerivado(e, '.carga.json') : null;
  const anio = c?.year || (pdf.match(/(\d{4})(?!.*\d{4})/) || [])[1] || pdf;
  if (!c) resultado.sinPropuesta.push({ anio, motivo: estado[pdf] || 'sin propuesta de carga' });
  else if (!(c.frena || []).length) resultado.listo.push({ anio });
  else if ((c.frena || []).some((f) => f.etapa === 'año' && /ya tiene el ejercicio/.test(f.motivo))) resultado.yaCargado.push({ anio });
  else resultado.frenado.push({ anio, motivo: `[${c.frena[0].etapa}] ${String(c.frena[0].motivo).slice(0, 110)}` });
}
const anios = (xs) => xs.map((x) => x.anio).sort().join(', ');
console.log('\n=== RESULTADO ===');
console.log(`Listo para cargar ${resultado.listo.length}${resultado.listo.length ? `   (${anios(resultado.listo)})` : ''}`);
console.log(`Frenados ${resultado.frenado.length}`);
for (const x of resultado.frenado.sort((a, b) => String(a.anio).localeCompare(String(b.anio)))) console.log(`   ${x.anio}: ${x.motivo}`);
if (resultado.yaCargado.length) console.log(`Ya en el sitio ${resultado.yaCargado.length}   (${anios(resultado.yaCargado)})`);
if (resultado.sinPropuesta.length) { console.log(`Sin propuesta de carga ${resultado.sinPropuesta.length}`); for (const x of resultado.sinPropuesta) console.log(`   ${x.anio}: ${x.motivo}`); }

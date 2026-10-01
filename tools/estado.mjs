#!/usr/bin/env node
// ============================================================================
// tools/estado.mjs — EL tablero del inventario: dónde está cada PDF, qué le falta, con qué comando se avanza y cuánto cuesta. Gratis.
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30: "tenemos demasiados estados abiertos y me marea. Pasame un código para que la terminal
// pueda hacer esa consulta siempre que quiera"). Los estados vienen de Admin/transcripciones-estado.jsonl (lo escribe
// tools/inventario-transcripciones.mjs) y de los archivos derivados de Generados/ (huellas de la categorización, tools/huellas.mjs).
//
// USO:
//   node tools/estado.mjs                 lee el registro tal como está (instantáneo) y dice de cuándo es
//   node tools/estado.mjs --actualizar    regenera el registro antes (~1 minuto, sin API)
//   node tools/estado.mjs --dir Clubes/Brasil    solo una carpeta
//   node tools/estado.mjs --logica [grupo]       qué tiene de PROPIO cada grupo de países en cada etapa (tools/grupos-pais.mjs), con el
//                                                ejemplo real donde se vio; sin grupo, todos. Grupos: argentina, brasil, latam, iberica,
//                                                britanica, germanica, benelux, nordica, este, mediterranea, asia, otros.
// DESGLOSE POR GRUPO DE PAÍSES (pedido de Guido, 2026-09-30: "para los pasos relevantes, breakdown de los números parciales según el cluster de
// país"): debajo de cada estado con PDFs, una línea con cuántos son de cada grupo (siglas: ARG, BRA, LAT, IBE, GBR, GER, BNL, NOR, EST, MED,
// ASI, OTR; `node tools/grupos-pais.mjs` dice qué países tiene cada uno).
// ============================================================================

import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { jevAlDia, categoriasAlDia } from './huellas.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { GRUPOS, GRUPO, grupoDe } from './grupos-pais.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const dir = flagVal('--dir');
const regPath = resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl');

if (args.includes('--actualizar') || !existsSync(regPath)) {
  process.stdout.write('Regenerando el registro (sin API)... ');
  spawnSync('node', [resolve(ROOT, 'tools/inventario-transcripciones.mjs')], { cwd: ROOT, stdio: 'ignore' });
  console.log('listo.');
}
// --logica: solo imprime la lógica por grupo y sale (no necesita el registro).
if (args.includes('--logica')) {
  const pedido = flagVal('--logica'); const lista = pedido && !pedido.startsWith('--') ? GRUPOS.filter((g) => g.id === pedido) : GRUPOS;
  if (!lista.length) { console.error(`Grupo desconocido: ${pedido}. Grupos: ${GRUPOS.map((g) => g.id).join(', ')}`); process.exit(1); }
  const ETAPA = { 2: '2. Transcribir', 3: '3. Validar', 4: '4. Preparar (qué filas, qué escala)', 5: '5. Categorizar', 6: '6. Cargar' };
  for (const g of lista) {
    console.log(`\n${g.corto} ${g.nombre.toUpperCase()}  (${g.paises.join(', ') || 'el resto'})\n  ${g.marco}`);
    for (const k of [2, 3, 4, 5, 6]) {
      const items = (g.logica || {})[k];
      console.log(`  ${ETAPA[k]}: ${items && items.length ? '' : 'nada propio conocido (igual que el resto)'}`);
      for (const x of items || []) console.log(`     - ${x}`);
    }
  }
  console.log('\n(Es conocimiento medido, cada punto con el documento donde se vio. Fuente: tools/grupos-pais.mjs.)\n');
  process.exit(0);
}
const R = readFileSync(regPath, 'utf8').trim().split('\n').map((l) => JSON.parse(l)).filter((e) => !dir || e.pdf.startsWith(dir.replace(/\/$/, '') + '/'));
const edad = Math.round((Date.now() - statSync(regPath).mtimeMs) / 60000);

// ETAPAS del proyecto, EN ORDEN (pedido de Guido, 2026-09-30: "que me dé una imagen comprehensive, ordenada según la secuencia del
// proyecto, con las categorías en 0 también; no es un waterfall, así que en distintas tablas según el proceso"). Cada fila: clave del
// registro, qué significa, qué le falta, con qué se avanza, US$ por PDF (medido en los pilotos C y D, 2026-09-30).
const ETAPAS = [
  ['1. CONSEGUIR EL PDF (el sourcing no pasa por este registro: acá solo aparecen los PDFs que llegaron rotos)', [
    ['no-es-pdf', 'El archivo no es un PDF o está cortado', 'Volver a bajarlo (el link está en fuentes/<País>/<Club>.md).', 'a mano', 0],
  ]],
  ['2. TRANSCRIBIR', [
    ['sin-md', 'Solo PDF, sin transcripción', 'Transcribir (Mistral) y validar.', 'pipeline.mjs --ejecutar', 0.20],
    ['sin-tablas', 'Transcripción vieja sin tablas', 'Rehacer con Mistral (una vez).', 'pipeline.mjs --ejecutar', 0.10],
  ]],
  ['3. VALIDAR LOS NÚMEROS', [
    ['sin-verificar', 'El .md cambió después de validarse', 'Revalidar (gratis si no aparecen dudas).', 'inventario-transcripciones.mjs --verificar --estado sin-verificar', 0],
    ['pendiente-segunda-voz', 'Escaneo sin validar (no hay texto del PDF para comparar gratis)', 'Segunda voz (Gemini; Claude donde difieran) solo en páginas con números.', 'pipeline.mjs --ejecutar', 0.15],
    ['revisar', 'El chequeo gratis encontró cifras distintas del texto del PDF', 'Resolver: Claude solo en las páginas dudosas.', 'pipeline.mjs --ejecutar', 0.10],
    ['reintentar', 'Un motor falló por crédito, red o límite', 'Volver a correr (lo retoma solo).', 'pipeline.mjs --ejecutar', 0.10],
  ]],
  ['4. PREPARAR (lista de rubros)', [
    ['listo', 'Validado, sin preparar', 'Sacar la lista de rubros (gratis).', 'pipeline.mjs --ejecutar --solo-preparar --max-paginas 0', 0],
    ['sin-rubros', 'Validado, sin estado de resultados (memoria, acta, auditor, solo notas)', 'Nada: queda como fuente.', '—', 0],
  ]],
  ['5. CATEGORIZAR (Jev y Claude)', [
    ['cat-falta', 'Con rubros, sin categorizar o con la categorización desactualizada', 'Jev y Claude por API.', 'pipeline.mjs --ejecutar', 0.04],
    ['cat-solo-jev', 'Con rubros, solo Jev (falta Claude)', 'Claude por API en lo que Jev dejó < 0,90.', 'pipeline.mjs --ejecutar', 0.03],
    ['cat-ok', 'Con rubros y categorización al día', 'Cargar (etapa 6).', 'node tools/cargar.mjs <pdf> (propuesta; --escribir)', 0],
  ]],
  ['7. EN EL SITIO', [
    ['cargado', 'Ejercicio cargado', 'Nada.', '—', 0],
  ]],
];
// QUÉ TOOLS HACEN CADA ETAPA (pedido de Guido, 2026-09-30: "agregame para el paso 2, 3 y 4 las tools que se usan"). En orden de uso; la
// primera es la que orquesta. El detalle de cada una está en su cabecera y en Admin/MAPA-DE-TOOLS.md. Si una tool entra o sale de una
// etapa, actualizar esta lista (no se deduce sola del código).
const TOOLS = {
  '2': [
    ['resolver-inventario.mjs', 'orquesta las etapas 2 y 3 (la llama pipeline.mjs)'],
    ['reparar-pdf.mjs', 'PDF dañado o con imágenes gigantes, antes de mandarlo'],
    ['mistral-ocr-transcribe.mjs', 'transcribe el documento entero a .md (API Mistral)'],
    ['check-transcripcion-fidelidad.js', 'bloques resumidos o páginas faltantes (gratis)'],
  ],
  '3': [
    ['paginas-con-numeros.mjs', 'qué páginas tienen cifras (la prosa no se valida)'],
    ['verify-numbers.mjs', 'números del .md contra el texto del PDF (gratis)'],
    ['chequeos-gratis.mjs', 'sumas, año anterior cargado y balance, por página (gratis)'],
    ['gemini-transcribe.mjs', 'segunda voz en las páginas dudosas de escaneos (API Gemini)'],
    ['claude-api-transcribe.mjs', 'desempate en las páginas dudosas (API Claude)'],
    ['revisar-reservas.mjs', 'decide con sumas las páginas "con reserva"'],
    ['inventario-transcripciones.mjs', 'el registro de estados (Admin/transcripciones-estado.jsonl)'],
  ],
  '4': [
    ['pipeline.mjs', 'etapa 3 del pipeline: arma <md>.rubros.json'],
    ['prepare-onboarding.mjs', 'tablas y sumas del .md -> <md>.briefing.json'],
    ['extract-table-rows.mjs', 'saca las tablas y marca las relevantes'],
    ['sum-check.mjs', 'chequea sumas contra los totales impresos'],
    ['proponer-carga.mjs', 'seleccionarFilas(): las filas que va a cargar la etapa 6 (Versión 321)'],
    ['filas-rubro.mjs', 'descarta lo que no es rubro y deduce el lado (lista vieja)'],
    ['vocabulario.mjs', 'palabras contables en 29 idiomas'],
  ],
};
const clave = (e) => {
  if (e.cargado) return 'cargado';
  if (e.jev === 'sin-rubros') return 'sin-rubros';
  if (e.jev === 'listo-para-jev') { const md = resolve(ROOT, e.md); return categoriasAlDia(md) ? 'cat-ok' : jevAlDia(md) ? 'cat-solo-jev' : 'cat-falta'; }
  return e.estado;
};
const cuenta = {}; for (const e of R) cuenta[clave(e)] = (cuenta[clave(e)] || 0) + 1;
const porGrupo = {}; for (const e of R) { const k = clave(e); const g = grupoDe(e.pdf); (porGrupo[k] ||= {})[g] = (porGrupo[k][g] || 0) + 1; }
// "ARG 22 · BRA 79 · ..." en el orden de GRUPOS, solo los que tienen alguno.
const desglose = (m) => GRUPOS.filter((g) => m && m[g.id]).map((g) => `${g.corto} ${m[g.id]}`).join(' · ');

console.log(`\nINVENTARIO${dir ? ` (${dir})` : ''}: ${R.length} PDFs · registro de hace ${edad} min${edad > 60 ? ' (node tools/estado.mjs --actualizar para rehacerlo)' : ''}`);
console.log('(Si hay un proceso del pipeline corriendo, esto es una foto a mitad de camino.)');
let total = 0;
const w = Math.max(...ETAPAS.flatMap(([, f]) => f.map((x) => x[1].length)));
const conocidas = new Set(ETAPAS.flatMap(([, f]) => f.map((x) => x[0])));
const imprimirEtapa = ([etapa, filas]) => {
  const sub = filas.reduce((a, x) => a + (cuenta[x[0]] || 0), 0);
  console.log(`\n${etapa}  (${sub} PDFs)`);
  const tools = TOOLS[etapa[0]];
  if (tools) { const wt = Math.max(...tools.map((t) => t[0].length)); console.log(`  tools: ${tools.map(([n, q], i) => `${i ? '         ' : ''}${n.padEnd(wt)}  ${q}`).join('\n')}`); }
  for (const [k, nombre, falta, cmd, usd] of filas) {
    const n = cuenta[k] || 0;
    const costo = n && usd ? `~US$ ${Math.round(n * usd)}` : n && !usd && !['cargado', 'sin-rubros', 'cat-ok'].includes(k) ? 'gratis' : '';
    if (n && usd) total += n * usd;
    console.log(`  ${String(n).padStart(5)}  ${nombre.padEnd(w)}  ${costo.padEnd(10)}${n ? `  falta: ${falta}${cmd !== '—' ? `  [${cmd}]` : ''}` : ''}`);
    if (n) console.log(`         ${desglose(porGrupo[k])}`);
  }
};
// PDFs ROTOS (pedido de Guido, 2026-10-01: "cuando se descarga un PDF que no es, en fuentes se lo da por caso cerrado pero en realidad debe
// volver"): el registro los marca `no-es-pdf`, pero el sourcing del club (fuentes/<País>/<Club>.md) puede seguir diciendo "encontrado". Se
// listan con el archivo de fuentes que hay que reabrir, para que vuelvan a la etapa 1.
const rotos = R.filter((e) => e.estado === 'no-es-pdf');
const reabrir = () => { if (!rotos.length) return; console.log('     Reabrir el sourcing (el archivo de fuentes todavía puede darlo por conseguido):'); for (const e of rotos.slice(0, 10)) { const [, pais, club] = e.pdf.split('/'); console.log(`       ${e.pdf}  ->  fuentes/${pais}/${club}.md`); } };
// La etapa 7 (en el sitio) se imprime al final, después de la 6 (cargar), que no es una lista de estados sino lo que les falta.
ETAPAS.filter(([e]) => !e.startsWith('7')).forEach((et) => { imprimirEtapa(et); if (et[0].startsWith('1.')) reabrir(); });
for (const k of Object.keys(cuenta).filter((k) => !conocidas.has(k))) console.log(`  ${String(cuenta[k]).padStart(5)}  (estado sin describir: ${k})`);
console.log(`\n  Costo estimado para llevar todo hasta "categorizado": ~US$ ${Math.round(total)} (API; sesión de Claude: 0 tokens)`);

// Detalle de los que tienen rubros: qué les falta para poder cargarse.
const L = R.filter((e) => !e.cargado && e.jev === 'listo-para-jev');
if (L.length) {
  const f = { cat: 0, jev: 0, enSitio: 0, nuevo: 0, noAnual: 0, nombre: 0, reserva: 0 }; const enSitioG = {}; const nuevoG = {};
  for (const e of L) {
    const g = grupoDe(e.pdf); if (clubDeRuta(e.pdf).clubId) enSitioG[g] = (enSitioG[g] || 0) + 1; else nuevoG[g] = (nuevoG[g] || 0) + 1;
    const md = resolve(ROOT, e.md);
    if (categoriasAlDia(md)) f.cat++; else if (jevAlDia(md)) f.jev++;
    clubDeRuta(e.pdf).clubId ? f.enSitio++ : f.nuevo++;
    if (e.periodo && e.periodo.tipo !== 'anual') f.noAnual++;
    if (e.periodo?.nombreNoCoincide) f.nombre++;
    if ((e.reserva || []).length) f.reserva++;
  }
  console.log(`\n6. CARGAR (etapa 6) — qué les falta a los ${L.length} con rubros:`);
  console.log(`  club ya en el sitio: ${f.enSitio}   (${desglose(enSitioG)})`);
  console.log(`  club nuevo (necesita alta): ${f.nuevo}   (${desglose(nuevoG)})`);
  console.log(`  no anuales (trimestral, semestral...; no se cargan como ejercicio): ${f.noAnual} · nombre del archivo con otra fecha que el contenido: ${f.nombre}`);
  console.log(`  con páginas "con reserva" (cerrar con sumas al cargar): ${f.reserva}`);
}
// Altas de clubes nuevos.
const altas = resolve(ROOT, 'Admin', 'altas-club.jsonl');
if (existsSync(altas)) {
  const A = readFileSync(altas, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const c = {}; for (const a of A) c[a.estado] = (c[a.estado] || 0) + 1;
  console.log(`\n6b. ALTA DE CLUBES NUEVOS (Admin/altas-club.jsonl): ${Object.entries(c).map(([k, v]) => `${k} ${v}`).join(' · ')}   [node tools/alta-club.mjs --todos]`);
}
// ÚLTIMA CORRIDA DE LA ETAPA 6 (Admin/cargar-ultimo.jsonl, lo escribe `cargar.mjs --lista`): cuántos cargarían y por qué frenan los demás, por
// grupo de países. Un documento puede frenar por varios motivos: cada columna cuenta los documentos que tienen ese motivo.
const ultimo = resolve(ROOT, 'Admin', 'cargar-ultimo.jsonl');
if (existsSync(ultimo)) {
  const U = readFileSync(ultimo, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const NOMBRE = { 'tie-out': 'no cierra', 'tie-out-resultado': 'resultado', categorizacion: 'categoría', fx: 'tipo cambio', alta: 'alta', periodo: 'período', año: 'año', filas: 'filas', moneda: 'moneda', fuente: 'fuente', registro: 'registro', club: 'club', error: 'error' };
  const motivos = Object.keys(NOMBRE).filter((m) => U.some((x) => x.motivos.includes(m)));
  console.log(`\n6c. ÚLTIMA CORRIDA DE LA ETAPA 6 (${U[0]?.lista}, ${String(U[0]?.ts).slice(0, 16).replace('T', ' ')}): ${U.filter((x) => x.carga).length} de ${U.length} cargarían`);
  console.log(`  ${'grupo'.padEnd(6)}${'docs'.padStart(5)}${'carga'.padStart(6)}${motivos.map((m) => NOMBRE[m].padStart(12)).join('')}`);
  for (const g of GRUPOS) {
    const X = U.filter((x) => grupoDe(x.pdf) === g.id); if (!X.length) continue;
    console.log(`  ${g.corto.padEnd(6)}${String(X.length).padStart(5)}${String(X.filter((x) => x.carga).length).padStart(6)}${motivos.map((m) => String(X.filter((x) => x.motivos.includes(m)).length || '').padStart(12)).join('')}`);
  }
  console.log('  ("no cierra": las filas no suman ningún total impreso; "resultado": tampoco el resultado del ejercicio. Detalle por documento: Admin/cargar-ultimo.jsonl)');
}
console.log('  La etapa 6 (tools/cargar.mjs) existe pero frena casi todo por problemas de etapas anteriores: ver Admin/HANDOFF-pipeline.md, Qué falta 1.');
console.log('  PROCESO NUEVO (localizar, validar, extraer, verificar, con cola humana; Admin/HANDOFF-pipeline.md "El proceso nuevo"): node tools/lote.mjs --lista Admin/lote-01.txt  ·  cola: node tools/cola.mjs');
ETAPAS.filter(([e]) => e.startsWith('7')).forEach(imprimirEtapa);
console.log(`\n  Grupos de países: ${GRUPOS.map((g) => `${g.corto} ${g.nombre}`).join(' · ')}.\n  Qué tiene de propio cada grupo en cada etapa: node tools/estado.mjs --logica [grupo]`);
console.log('');

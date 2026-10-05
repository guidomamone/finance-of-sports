#!/usr/bin/env node
// ============================================================================
// tools/estado.mjs — EL tablero del inventario: dónde está cada PDF, qué le falta, con qué comando se avanza y cuánto cuesta. Gratis.
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30: "tenemos demasiados estados abiertos y me marea. Pasame un código para que la terminal
// pueda hacer esa consulta siempre que quiera"). Los estados vienen de Admin/transcripciones-estado.jsonl (lo escribe
// tools/inventario-transcripciones.mjs) y de lo que las etapas 3-8 dejaron en Generados/ (tools/etapa-doc.mjs, Versión 448: las etapas del
// proceso nuevo, las mismas que muestra el inventario).
//
// USO:
//   node tools/estado.mjs                 lee el registro tal como está (instantáneo) y dice de cuándo es
//   node tools/estado.mjs --actualizar    regenera el registro antes (~1 minuto, sin API)
//   node tools/estado.mjs --dir Clubes/Brasil    solo una carpeta
//   node tools/estado.mjs --escalones            en qué escalón salió cada dato de las etapas 4 y 8 (tools/escalones.mjs)
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
import { etapaDe, rubrosViejo } from './etapa-doc.mjs';
import { estimarExtraerSinBloques } from './extraer.mjs';
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
// --escalones (Versión 525, to-do 140(h)): en qué escalón salió cada dato de las etapas 4 y 8 (tools/escalones.mjs).
if (args.includes('--escalones')) { await import('./escalones.mjs'); process.exit(0); }
if (args.includes('--logica')) {
  const pedido = flagVal('--logica'); const lista = pedido && !pedido.startsWith('--') ? GRUPOS.filter((g) => g.id === pedido) : GRUPOS;
  if (!lista.length) { console.error(`Grupo desconocido: ${pedido}. Grupos: ${GRUPOS.map((g) => g.id).join(', ')}`); process.exit(1); }
  // Las etapas del proceso nuevo (Admin/PIPELINE.md); hasta la Versión 466 eran las del viejo (2-6, con "4. Preparar").
  const ETAPA = { 2: '2. Transcribir', 3: '3. Localizar (qué bloques, escala, perímetro)', 4: '4. Validar', 5: '5. Extraer', 6: '6. Verificar', 7: '7. Categorizar', 8: '8. Cargar' };
  for (const g of lista) {
    console.log(`\n${g.corto} ${g.nombre.toUpperCase()}  (${g.paises.join(', ') || 'el resto'})\n  ${g.marco}`);
    for (const k of [2, 3, 4, 5, 6, 7, 8]) {
      const items = (g.logica || {})[k];
      console.log(`  ${ETAPA[k]}: ${items && items.length ? '' : 'nada propio conocido (igual que el resto)'}`);
      for (const x of items || []) console.log(`     - ${x}`);
    }
  }
  console.log('\n(Es conocimiento medido, cada punto con el documento donde se vio, visto con el proceso viejo (2026-09-30) y pasado a las\n etapas nuevas. Fuente: tools/grupos-pais.mjs.)\n');
  process.exit(0);
}
const R = readFileSync(regPath, 'utf8').trim().split('\n').map((l) => JSON.parse(l)).filter((e) => !dir || e.pdf.startsWith(dir.replace(/\/$/, '') + '/'));
const edad = Math.round((Date.now() - statSync(regPath).mtimeMs) / 60000);

// ETAPAS DEL PROCESO NUEVO, EN ORDEN (Versión 448, aprobado por Guido el 2026-10-04: el tablero con las etapas de Admin/PIPELINE.md,
// "El proceso nuevo"; hasta acá usaba las secciones del proceso viejo, "4. Preparar lista de rubros", y contaba distinto que el inventario).
// En qué etapa está cada documento lo decide tools/etapa-doc.mjs, la MISMA función que usa el resumen del inventario. Cada fila: clave de
// etapa-doc, qué significa, qué le falta, con qué se avanza, US$ por PDF (número, o función del PDF: localizar + extraer estimado, V446).
const usdLocalizarYExtraer = (pdf) => 0.05 + estimarExtraerSinBloques(pdf).usd;
// ETAPA 2 SIN .md, POR PÁGINAS (Versión 488, to-do 140m): con un costo fijo de US$ 0,20 por PDF el tablero subestimaba los PDFs largos (Lazio,
// 19 PDFs de 151-208 páginas: ~US$ 4 acá contra US$ 25,60 del ensayo de pipeline.mjs). Ahora usa la MISMA cuenta que ese ensayo
// (tools/resolver-inventario.mjs, dryRunDoc, caso "sin .md"): Mistral en todas las páginas + segunda voz en el 58% que tiene números
// = 0,004 + 0,58 × (0,002 + 0,6 × 0,25 × 0,02 + 0,15 × 0,02) ≈ US$ 0,0086 por página. Las páginas salen de la caché que mantiene
// pipeline.mjs (Admin/.paginas-cache.json, sin pdfinfo: el tablero tiene que seguir siendo instantáneo); un PDF que no está en la caché
// sigue con los US$ 0,20 de antes. Es una estimación (pedido de Guido: no hace falta que sea perfecta); el gasto real lo da tools/gasto.mjs.
const USD_POR_PAGINA_SIN_MD = 0.004 + 0.58 * (0.002 + 0.6 * 0.25 * 0.02 + 0.15 * 0.02);
const PAGINAS = (() => { try { return JSON.parse(readFileSync(resolve(ROOT, 'Admin', '.paginas-cache.json'), 'utf8')); } catch { return {}; } })();
const usdTranscribir = (pdf) => (PAGINAS[pdf]?.n ? PAGINAS[pdf].n * USD_POR_PAGINA_SIN_MD : 0.20);
const ETAPAS = [
  ['1. CONSEGUIR EL PDF (el sourcing no pasa por este registro: acá solo aparecen los PDFs que llegaron rotos)', [
    ['e1-roto', 'El archivo no es un PDF o está cortado', 'Volver a bajarlo (el link está en fuentes/<País>/<Club>.md).', 'a mano', 0],
  ]],
  ['2. TRANSCRIBIR Y VALIDAR LA TRANSCRIPCIÓN', [
    ['e2-sin-md', 'Solo PDF, sin transcripción (escalón 0)', 'Transcribir (Mistral) y validar.', 'pipeline.mjs --ejecutar', usdTranscribir],
    ['e2-sin-tablas', 'Transcripción vieja sin tablas (escalón 0)', 'Rehacer con Mistral (una vez).', 'pipeline.mjs --ejecutar', 0.10],
    ['e2-sin-verificar', 'El .md cambió después de validarse', 'Revalidar (gratis si no aparecen dudas; solo las páginas cambiadas, V443).', 'inventario-transcripciones.mjs', 0],
    ['e2-revisar', 'Escalón 1a: cifras distintas del texto del PDF', 'Resolver: Claude solo en las páginas dudosas.', 'resolver-inventario.mjs --ejecutar (lo corre lote.mjs)', 0.10],
    ['e2-segunda-voz', 'Escalón 1a: escaneo sin validar', 'Segunda voz (Gemini; Claude donde difieran) solo en páginas con números.', 'pipeline.mjs --ejecutar', 0.15],
    ['e2-reintentar', 'Escalón 1a cortado por crédito, red o límite', 'Volver a correr (lo retoma solo).', 'pipeline.mjs --ejecutar', 0.10],
  ]],
  ['3. LOCALIZAR (qué bloques son el estado de resultados y sus notas)', [
    ['e3-localizar', 'Transcripción validada, sin localizar', 'Localizar y extraer (antes, la compuerta de perímetro y cierre, V441).', 'lote.mjs --lista <lista> (ensayo primero)', usdLocalizarYExtraer],
    ['e3-fuente', 'Sin estado de resultados (memoria, dictamen, balance solo)', 'Nada: queda como fuente.', '—', 0],
  ]],
  ['4-5. VALIDAR Y EXTRAER', [
    ['e5-extraer', 'Localizado, sin extraer', 'Extraer (validar es gratis en PDF digital).', 'lote.mjs --lista <lista>', (pdf) => estimarExtraerSinBloques(pdf).usd],
  ]],
  ['6. VERIFICAR (sumas, resultado, año anterior y vecino)', [
    ['e6-verificar', 'Extraído, sin verificar', 'Verificar (gratis).', 'lote.mjs --lista <lista>', 0],
    ['e6-no-cerro', 'No cerró', 'La cola humana o el reintento.', 'cola.mjs  ·  lote.mjs --reintentar', 0],
  ]],
  ['7. CATEGORIZAR (precedente, Jev, Claude)', [
    ['e7-categorizar', 'Verificado, sin propuesta de carga', 'Categorizar y proponer la carga.', 'lote.mjs --lista <lista>', 0.03],
  ]],
  ['8. CARGAR', [
    ['e8-lista', 'Propuesta lista', 'Escribir el año en el sitio.', 'cargar.mjs "<pdf>" --desde-verificacion --escribir', 0],
    ['e8-frenado', 'Propuesta frenada', 'Ver el motivo (abajo) y la cola.', 'cola.mjs', 0],
  ]],
  ['9. EN EL SITIO', [
    ['e9-cargado', 'Ejercicio cargado', 'Nada (caja y deuda: caja-deuda.mjs --club <id>).', '—', 0],
  ]],
];
// QUÉ TOOLS HACEN CADA ETAPA (pedido de Guido, 2026-09-30). En orden de uso; el detalle de cada una está en su cabecera. Si una tool entra o
// sale de una etapa, actualizar esta lista (no se deduce sola del código).
const TOOLS = {
  '2': [
    ['mistral-ocr-transcribe.mjs', 'transcribe el documento entero a .md (API Mistral)'],
    ['inventario-transcripciones.mjs', 'el registro de estados y la validación gratis (números del .md contra el texto del PDF)'],
    ['resolver-inventario.mjs', 'escalón 1a: Claude/Gemini solo en las páginas dudosas; reusa las que no cambiaron (V443)'],
    ['texto-propio-a-md.mjs', 'escalón 1b: rearma páginas con el texto propio del PDF (gratis)'],
    ['check-transcripcion-fidelidad.js', 'bloques resumidos o páginas faltantes (gratis)'],
  ],
  '3': [
    ['antes-de-localizar.mjs', 'compuerta antes de pagar: perímetro y cierre fijados (V441)'],
    ['indice-bloques.mjs', 'ficha de cada tabla o bloque con cifras (gratis)'],
    ['localizar.mjs', 'elige los bloques del estado y de las notas (IA)'],
  ],
  '4': [
    ['validar-bloques.mjs', 'cada número de los bloques contra el PDF (texto propio o Gemini)'],
    ['extraer.mjs', 'las filas tal cual (IA)'],
    ['cache-al-dia.mjs', '¿el caché sigue sirviendo para el .md de hoy? (V445)'],
  ],
  '6': [['verificar.mjs', 'chequeos gratis; lo que no cierra va a la cola']],
  '7': [['glosar-rubros.mjs, jev-categorizar.mjs, categorizar-claude.mjs', 'precedente, Jev y Claude']],
  '8': [['cargar.mjs', 'propuesta y escritura del año'], ['alta-club.mjs', 'club nuevo'], ['caja-deuda.mjs', 'caja y deuda, con el club ya publicado']],
};
const ETAPA_R = new Map(R.map((e) => [e.pdf, etapaDe(e)]));
const clave = (e) => ETAPA_R.get(e.pdf).clave;
const cuenta = {}; for (const e of R) cuenta[clave(e)] = (cuenta[clave(e)] || 0) + 1;
const porGrupo = {}; for (const e of R) { const k = clave(e); const g = grupoDe(e.pdf); (porGrupo[k] ||= {})[g] = (porGrupo[k][g] || 0) + 1; }
// "ARG 22 · BRA 79 · ..." en el orden de GRUPOS, solo los que tienen alguno.
const desglose = (m) => GRUPOS.filter((g) => m && m[g.id]).map((g) => `${g.corto} ${m[g.id]}`).join(' · ');

console.log(`\nINVENTARIO${dir ? ` (${dir})` : ''}: ${R.length} PDFs · registro de hace ${edad} min${edad > 60 ? ' (node tools/estado.mjs --actualizar para rehacerlo)' : ''}`);
console.log('(Si hay un proceso del pipeline corriendo, esto es una foto a mitad de camino. Etapas: Admin/PIPELINE.md.)');
let total = 0;
const w = Math.max(...ETAPAS.flatMap(([, f]) => f.map((x) => x[1].length)));
const conocidas = new Set(ETAPAS.flatMap(([, f]) => f.map((x) => x[0])));
const imprimirEtapa = ([etapa, filas]) => {
  const sub = filas.reduce((a, x) => a + (cuenta[x[0]] || 0), 0);
  console.log(`\n${etapa}  (${sub} PDFs)`);
  const tools = TOOLS[etapa[0]];
  if (tools) { const wt = Math.max(...tools.map((t) => t[0].length)); console.log(`  tools: ${tools.map(([n, q], i) => `${i ? '         ' : ''}${n.padEnd(wt)}  ${q}`).join('\n')}`); }
  for (const [k, nombre, falta, cmd, usd] of filas) {
    const docs = R.filter((e) => clave(e) === k); const n = docs.length;
    const u = typeof usd === 'function' ? docs.reduce((a, e) => a + usd(e.pdf), 0) : n * usd;
    const costo = n && u ? `~US$ ${Math.round(u)}` : n && !u && !['e9-cargado', 'e3-fuente', 'e8-lista', 'e8-frenado', 'e6-no-cerro'].includes(k) ? 'gratis' : '';
    if (n && u) total += u;
    console.log(`  ${String(n).padStart(5)}  ${nombre.padEnd(w)}  ${costo.padEnd(10)}${n ? `  falta: ${falta}${cmd !== '—' ? `  [${cmd}]` : ''}` : ''}`);
    if (n) console.log(`         ${desglose(porGrupo[k])}`);
    if (k === 'e8-frenado' && n) { const m = {}; for (const e of docs) { const x = ETAPA_R.get(e.pdf).motivo; m[x] = (m[x] || 0) + 1; } console.log(`         motivos: ${Object.entries(m).map(([a, b]) => `${a} ${b}`).join(' · ')}`); }
  }
};
// PDFs ROTOS (pedido de Guido, 2026-10-01: "cuando se descarga un PDF que no es, en fuentes se lo da por caso cerrado pero en realidad debe
// volver"): se listan con el archivo de fuentes que hay que reabrir, para que vuelvan a la etapa 1.
const rotos = R.filter((e) => clave(e) === 'e1-roto');
const reabrir = () => { if (!rotos.length) return; console.log('     Reabrir el sourcing (el archivo de fuentes todavía puede darlo por conseguido):'); for (const e of rotos.slice(0, 10)) { const [, pais, club] = e.pdf.split('/'); console.log(`       ${e.pdf}  ->  fuentes/${pais}/${club}.md`); } };
ETAPAS.forEach((et) => { imprimirEtapa(et); if (et[0].startsWith('1.')) reabrir(); });
for (const k of Object.keys(cuenta).filter((k) => !conocidas.has(k))) console.log(`  ${String(cuenta[k]).padStart(5)}  ${k === 'descartado' ? 'descartados como fuente (Admin/documentos-descartados.txt; el lote los saltea)' : `(estado sin describir: ${k})`}`);
console.log(`\n  Costo estimado para llevar todo hasta "propuesta de carga": ~US$ ${Math.round(total)} (API; sesión de Claude: 0 tokens)`);
// PROCESO VIEJO, solo como referencia (Versión 448, decisión de Guido): los .rubros.json que armó pipeline.mjs (sin `origen`) no cuentan
// como avance del proceso nuevo. Retirar el proceso viejo es el to-do 142c de Admin/TODO.md.
const viejos = R.filter((e) => !e.cargado && e.md && rubrosViejo(e)).length;
if (viejos) console.log(`  Referencia, proceso viejo: ${viejos} documentos sin cargar tienen lista de rubros de pipeline.mjs (no cuenta como avance acá).`);
// ÚLTIMA PROPUESTA DE CARGA (Admin/cargar-ultimo.jsonl, lo escribe `cargar.mjs --lista`, también desde lote.mjs).
const ultimo = resolve(ROOT, 'Admin', 'cargar-ultimo.jsonl');
if (existsSync(ultimo)) {
  const U = readFileSync(ultimo, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  console.log(`  Última propuesta de carga (${U[0]?.lista}, ${String(U[0]?.ts).slice(0, 16).replace('T', ' ')}): ${U.filter((x) => x.carga).length} de ${U.length} cargarían. Detalle: Admin/cargar-ultimo.jsonl`);
}
console.log('  Cola humana: node tools/cola.mjs  ·  un lote: node tools/lote.mjs --lista Admin/lote-NN.txt');
console.log(`\n  Grupos de países: ${GRUPOS.map((g) => `${g.corto} ${g.nombre}`).join(' · ')}.\n  Qué tiene de propio cada grupo en cada etapa: node tools/estado.mjs --logica [grupo]`);
console.log('');

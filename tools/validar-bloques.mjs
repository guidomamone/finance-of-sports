#!/usr/bin/env node
// ============================================================================
// tools/validar-bloques.mjs — ETAPA 4 del proceso nuevo: cada número de los bloques que eligió localizar.mjs se confirma contra una FUENTE
// INDEPENDIENTE DE MISTRAL. Gratis en PDFs digitales; ~US$ 0,003 por página en escaneos (Gemini).
//
// POR QUÉ (Versión 324; Admin/PIPELINE.md, etapa 4). Mistral puede INVENTAR un número en un escaneo con la misma
// seguridad que uno bien leído (CLAUDE.md, test de costo de transcripción). El chequeo "el importe está tal cual en la página" del test
// localizar-extraer compara contra la TRANSCRIPCIÓN, así que un número inventado por Mistral pasaba igual (lo vio Guido el 2026-10-01). Y hoy
// la etapa 3 del pipeline valida el documento ENTERO (~US$ 140 pendientes) cuando solo importan las tablas que se cargan. Acá se valida solo
// eso, y contra el PDF:
//   a) PDF DIGITAL (texto propio usable, según verifyNumbers() de tools/verify-numbers.mjs): cada número del bloque tiene que estar en el texto
//      interno de SU página (`pdftotext -f N -l N`). Gratis.
//   b) PDF ESCANEADO o con TEXTO ROTO (mojibake: verifyNumbers() lo detecta cuando el texto del PDF casi no coincide con el .md, menos de 25%
//      de cobertura): Gemini lee LA IMAGEN de esa página (tools/gemini-transcribe.mjs sobre un PDF de una sola página), independiente de
//      Mistral. Si Gemini la rechaza (RECITATION, falso positivo de copyright), Claude (tools/claude-api-transcribe.mjs).
//   Lo que NO se confirma queda en la lista `noConfirmados`, con la línea del .md y, si la segunda lectura tiene un número parecido (un dígito
//   distinto), cuál leyó. NO decide quién tiene razón: eso lo hace verificar.mjs con la aritmética (gana la lectura con la que la tabla suma)
//   y, si ninguna suma, la cola humana (tools/cola.mjs).
//
// QUÉ PUEDE SALIR MAL: (i) Mistral y Gemini se equivocan igual (dígito borroso) -> lo frena la suma; (ii) Gemini y Claude rechazan la página ->
// queda sin segunda fuente y verificar.mjs la manda a la cola; (iii) en un digital, el número está en la página pero en otra columna (el
// año anterior): este chequeo lo da por bueno; lo ataja el chequeo contra el año anterior cargado de verificar.mjs.
//
// USO:
//   node tools/validar-bloques.mjs "<pdf>" [...]          ENSAYO: dice si es digital o escaneo, cuántas páginas y cuánto costaría
//   node tools/validar-bloques.mjs "<pdf>" --ejecutar     (gratis si es digital)
//   node tools/validar-bloques.mjs --lista <archivo> [--ejecutar]
// ============================================================================

import { readFileSync, writeFileSync, existsSync, mkdtempSync, copyFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { derivado } from './rutas.mjs';
import { shaMd } from './cache-al-dia.mjs'; // (Versión 445) huella del .md con el que se hizo el caché
import { verifyNumbers, extractNumbers, norm as normNum, NUM_RE } from './verify-numbers.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const USD_PAGINA_GEMINI = 0.003;
const MIN_TEXTO = 50; // caracteres de texto propio (sin espacios) por debajo de los cuales una página de un PDF digital es una imagen

const textoPagina = (pdf, n) => execFileSync('pdftotext', ['-layout', '-f', String(n), '-l', String(n), pdf, '-'], { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString('utf8');
const unDigito = (a, b) => a.length === b.length && [...a].filter((c, i) => c !== b[i]).length === 1;

// Segunda lectura de UNA página escaneada: PDF de esa página sola (qpdf) -> motor -> texto. Se guarda en Generados/ para no pagarla dos veces.
function segundaLectura(pdfAbs, md, n) {
  const guardada = resolve(ROOT, derivado(md, `.pag${n}.segunda.md`));
  if (existsSync(guardada)) return { texto: readFileSync(guardada, 'utf8'), motor: 'guardada' };
  const tmp = mkdtempSync(join(tmpdir(), 'validar-')); const una = join(tmp, `pag${n}.pdf`);
  if (spawnSync('qpdf', [pdfAbs, '--pages', '.', String(n), '--', una], { stdio: 'ignore' }).status > 3) return { error: 'qpdf no pudo separar la página' };
  for (const [motor, tool] of [['gemini', 'tools/gemini-transcribe.mjs'], ['claude', 'tools/claude-api-transcribe.mjs']]) {
    spawnSync('node', [resolve(ROOT, tool), una, '--out-suffix', '.segunda'], { cwd: ROOT, stdio: 'ignore', timeout: 300000 });
    const salida = join(tmp, `pag${n}.segunda.md`);
    if (existsSync(salida)) { copyFileSync(salida, guardada); return { texto: readFileSync(salida, 'utf8'), motor }; }
  }
  return { error: 'Gemini y Claude no devolvieron la página' };
}

export async function validar(pdf, { registro, ejecutar = false, rehacer = false } = {}) {
  const e = registro.find((x) => x.pdf === pdf) || {}; const md = e.md || pdf.replace(/\.pdf$/, '.md');
  const pUb = resolve(ROOT, derivado(md, '.ubicacion.json', { crear: false }));
  if (!existsSync(pUb)) return { error: 'falta el .ubicacion.json (localizar.mjs)' };
  const ub = JSON.parse(readFileSync(pUb, 'utf8')); if (ub.sin_estado) return { sinEstado: true };
  const out = resolve(ROOT, derivado(md, '.validacion.json'));
  if (!rehacer && existsSync(out)) return { hecho: true, datos: JSON.parse(readFileSync(out, 'utf8')), costo: 0 };
  const pdfAbs = resolve(ROOT, pdf); const mdAbs = resolve(ROOT, md);
  const v = verifyNumbers(pdfAbs, mdAbs); const modo = v.applicable ? 'digital' : 'escaneo';
  const L = readFileSync(mdAbs, 'utf8').split('\n');
  const ids = [...new Set([...ub.estado, ...ub.notas_ingresos, ...ub.notas_gastos])].filter((id) => ub.bloques[id]);
  const paginas = [...new Set(ids.map((id) => ub.bloques[id].pagina))].sort((a, b) => a - b);
  // PDF HÍBRIDO (to-do 160 parte 2, excepción pedida por Guido aunque sea un solo caso): en un PDF digital, una página SIN texto propio (menos
  // de MIN_TEXTO caracteres) es una imagen, y comparar contra su texto vacío deja todos sus números "sin confirmar". Esa página se valida
  // como en un escaneo: Gemini lee la imagen y, si la rechaza (RECITATION: el falso positivo de copyright con documentos financieros),
  // Claude (segundaLectura). Si ninguno la lee, sus números quedan con sinSegunda y decide la etapa 6 (verificar.mjs, avisarRegistro).
  // Caso: Como 2025, pág. 9 del visor (sin número impreso), el pro-forma firmado por el presidente, escaneado entero (JPEG 1646x2331 a
  // 200 dpi) dentro de un PDF de Acrobat; los 120 números de la tabla quedaban sin confirmar. Medido: 1 de 632 páginas de 99 PDFs digitales.
  const textos = new Map(); const hibridas = [];
  if (modo === 'digital') for (const n of paginas) { try { const tx = textoPagina(pdfAbs, n); textos.set(n, tx); if (tx.replace(/\s/g, '').length < MIN_TEXTO) hibridas.push(n); } catch { textos.set(n, null); } }
  const aPagar = (ps) => ps.filter((n) => !existsSync(resolve(ROOT, derivado(md, `.pag${n}.segunda.md`, { crear: false })))).length * USD_PAGINA_GEMINI;
  if (!ejecutar) return { ensayo: true, modo, motivoModo: v.reason || null, paginas, hibridas, usd: modo === 'digital' ? aPagar(hibridas) : paginas.length * USD_PAGINA_GEMINI };
  const fuentes = {}; const segundas = new Map();
  for (const n of paginas) {
    if (modo === 'digital' && !hibridas.includes(n)) { const tx = textos.get(n); if (tx == null) fuentes[n] = null; else { segundas.set(n, extractNumbers(tx)); fuentes[n] = 'pdftotext'; } continue; }
    const r = segundaLectura(pdfAbs, md, n);
    if (r.error) { fuentes[n] = null; continue; }
    segundas.set(n, extractNumbers(r.texto)); fuentes[n] = r.motor;
  }
  const noConfirmados = []; let confirmados = 0;
  for (const id of ids) {
    const b = ub.bloques[id]; const segunda = segundas.get(b.pagina);
    for (let k = b.lineas[0]; k <= b.lineas[1]; k++) {
      for (const m of String(L[k - 1] || '').matchAll(NUM_RE)) {
        const num = normNum(m[0]); if (num.length < 4) continue; // números chicos no se validan acá (lo cubre la suma); los años SÍ (4 cifras)
        if (segunda && segunda.has(num)) { confirmados++; continue; }
        const parecido = segunda ? [...segunda].find((x) => unDigito(x, num)) : null;
        // ESCALÓN 2b (to-do 160 parte 1, ok de Guido; Admin/PIPELINE.md, etapa 4): un 1900-2099 escrito tal cual en la FILA DE ENCABEZADO de una tabla (la línea siguiente
        // es el separador "| --- |") es un año de columna, no un importe. NO se confirma ni se saca de la lista: solo se marca `propuesta`. La
        // compuerta está en avisarRegistro() de verificar.mjs (la línea no es la de ninguna fila que se carga). Caso: Napoli 2024, L276
        // "| C PROVENTI ED ONERI FINANZIARI | al 30.06.2024 | al 30.06.2023 |": Gemini dejó el encabezado vacío y "2023" era el único de 567
        // números sin confirmar; frenaba la categorización con la etapa 6 cerrada al centavo. Un año dentro de un párrafo (Juventus 2021-22,
        // L6470, "2019") o un 2.023 en una fila de importes NO se marcan.
        const anioEncabezado = /^(19|20)\d\d$/.test(String(m[0]).trim()) && /^\|\s*:?-{3,}/.test(L[k] || '');
        noConfirmados.push({ bloque: id, pagina: b.pagina, linea: k, numero: m[0], segundaLeyo: parecido || null, sinSegunda: !segunda, texto: String(L[k - 1]).slice(0, 160), ...(anioEncabezado ? { propuesta: 'anio-encabezado' } : {}) });
      }
    }
  }
  const datos = { pdf, md, mdSha1: shaMd(md), modo, motivoModo: v.reason || null, generado: new Date().toISOString(), fuentes, ...(hibridas.length ? { hibridas } : {}), confirmados, noConfirmados };
  writeFileSync(out, JSON.stringify(datos, null, 1));
  return { hecho: true, datos, costo: Object.values(fuentes).filter((f) => f && !['guardada', 'pdftotext'].includes(f)).length * USD_PAGINA_GEMINI };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const docs = flag('--lista') ? readFileSync(resolve(ROOT, flag('--lista')), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : ARGS.filter((a) => !a.startsWith('--'));
  if (!docs.length) { console.error('Uso: node tools/validar-bloques.mjs "<pdf>" [--ejecutar] [--rehacer]  |  --lista <archivo>'); process.exit(1); }
  const registro = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  let usd = 0;
  for (const pdf of docs) {
    const r = await validar(pdf, { registro, ejecutar: ARGS.includes('--ejecutar'), rehacer: ARGS.includes('--rehacer') });
    if (r.ensayo) { usd += r.usd; console.log(`  ensayo ${pdf}: ${r.modo}${r.motivoModo ? ` (${r.motivoModo})` : ''}, páginas ${r.paginas.join(',')}${r.hibridas?.length ? ` (en imagen dentro del PDF digital, van a Gemini: ${r.hibridas.join(',')})` : ''}, ~US$ ${r.usd.toFixed(3)}`); }
    else if (r.sinEstado) console.log(`  ${pdf}: sin estado de resultados`);
    else if (r.error) console.log(`  ${pdf}: ${r.error}`);
    else { usd += r.costo; console.log(`  ${pdf}: ${r.datos.modo}, ${r.datos.confirmados} números confirmados, ${r.datos.noConfirmados.length} sin confirmar`); }
  }
  console.log(`\n${ARGS.includes('--ejecutar') ? 'Gastado' : 'Costo estimado'}: US$ ${usd.toFixed(2)}`);
}

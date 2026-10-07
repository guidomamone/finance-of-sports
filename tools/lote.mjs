#!/usr/bin/env node
// ============================================================================
// tools/lote.mjs — EL PROCESO NUEVO de punta a punta sobre un LOTE CHICO (5 PDFs), para ir refinando y viendo dónde hace falta la cola humana.
//
// POR QUÉ (Versión 324; pedido de Guido el 2026-10-01: "la idea es hacer 5 PDFs juntos e ir refinando y viendo dónde se necesita cola humana;
// vos me podés decir 'revisar tal cosa en el PDF y tal otra en el md' y yo abro el PDF por mi cuenta o la transcripción; arrancar por los
// clubes para los cuales ya tenemos transcripción pero no están cargados"). El proceso entero, con riesgos y mitigaciones etapa por etapa,
// está en Admin/PIPELINE.md.
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
//   node tools/lote.mjs --lista Admin/lote-NN.txt                 ensayo con costo
//   caffeinate -i node tools/lote.mjs --lista Admin/lote-NN.txt --ejecutar
//   En la lista, "testigo <pdf>" = documento que solo sirve para verificar a otro (ver TESTIGOS abajo).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { localizar } from './localizar.mjs';
import { validar } from './validar-bloques.mjs';
import { extraer, estimarExtraerSinBloques } from './extraer.mjs';
import { pendientes } from './cola.mjs';
import { derivado } from './rutas.mjs';
import { paginasARearmar, rearmar } from './texto-propio-a-md.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { verificarLista } = await import('./verificar.mjs');
const { ajusteDe, ajustePerimetroDe } = await import('./ajustes.mjs');
const { loadSite } = await import('./proponer-carga.mjs');
const { faltaAntesDeLocalizar } = await import('./antes-de-localizar.mjs');
const { cacheAlDia } = await import('./cache-al-dia.mjs');
const { gastoPorDocumento, lineasGasto } = await import('./gasto-doc.mjs');
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const LISTA = flag('--lista'); const EJECUTAR = ARGS.includes('--ejecutar'); const REHACER = ARGS.includes('--rehacer');
// --reintentar (Versión 336, CAMINO DE ERROR: decisión de Guido, las reglas extra son "para cuando haya errores"): solo los documentos cuya
// última verificación marcó desgloses que no suman (verificacion.reintentar) vuelven a localizar con el índice ampliado (filas que terminan
// en "-") y a extraer con la lista de lo que no sumó. Una sola vez por documento (después queda `reintentado`). El resto del lote no se toca.
const REINTENTAR = ARGS.includes('--reintentar');
// --detalle (Versión 442, punto 1b.ii del HANDOFF, aprobado por Guido el 2026-10-04): QUIÉN ENTRA al escalón 1 de la etapa 3 (el reintento).
// Un desglose que no suma en un documento cuya etapa 6 CERRÓ (verificación "ok") no bloquea la carga: el año se carga igual, con el renglón
// sin abrir. Ese reintento es DETALLE OPCIONAL y solo entra con --reintentar --detalle. Sin --detalle entran los que destraban la carga:
// categoría en 0, o desglose que no suma con la etapa 6 sin cerrar. Caso: un --reintentar del 2026-10-04 sobre Juventus 2022-2024 volvió a
// localizar y extraer 2022-23 y 2023-24, que verificaban ok (US$ 0,79 de más). Sirve igual para UC 2013 (el caso del índice ampliado),
// cuya etapa 6 no cerraba.
const DETALLE = ARGS.includes('--detalle');
const leerDerivado = (e, suf) => { try { const p = resolve(ROOT, derivado(e.md, suf, { crear: false })); return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null; } catch { return null; } };
// Lo que hay que reintentar: desgloses que no suman (verificar.mjs) y categorías en 0 que deberían tener número (cargar.mjs, Versión 340).
// (Versión 442) `detalle`: los desgloses que no suman de un documento cuya etapa 6 cerró (opcionales, ver --detalle); `reintentar`: lo que
// destraba la carga, más el detalle si se pidió --detalle.
// (Versión 460) UNA VEZ POR DOCUMENTO también para "categoría en 0": el intento queda en <doc>.reintento-categorias.json (lo escribe el lote al
// reintentar); con esa marca, las categorías en 0 de la propuesta de carga ya no piden otro reintento. Caso: Fortaleza 2017, el lote volvía a
// ofrecer el mismo reintento después de intentarlo (y se pagaba cada vez).
const categoriasPendientes = (e) => (leerDerivado(e, '.reintento-categorias.json') ? [] : ((leerDerivado(e, '.carga.json') || {}).reintentar || []).filter((x) => x.categoria));
const verifDe = (e, { detalle = DETALLE } = {}) => {
  const v = leerDerivado(e, '.verificacion.json') || {};
  const desgl = v.reintentar || []; const opcional = v.estado === 'ok' ? desgl : [];
  const r = [...(v.estado === 'ok' && !detalle ? [] : desgl), ...categoriasPendientes(e)];
  return { ...v, reintentar: r.length ? r : null, detalle: opcional.length ? opcional : null };
};
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
const ajustesTodos = (() => { let cache = null; return () => (cache ??= (existsSync(resolve(ROOT, 'Admin', 'ajustes-manuales.jsonl')) ? readFileSync(resolve(ROOT, 'Admin', 'ajustes-manuales.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return {}; } }) : [])); })();
const leerRegistro = () => readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
let registro = leerRegistro();
// (Versión 521, to-do 140(c)) DUPLICADOS: el mismo PDF que otro (misma huella, inventario-transcripciones.mjs) no se procesa: se procesa el otro.
for (let i = docs.length - 1; i >= 0; i--) { const e = registro.find((x) => x.pdf === docs[i]); if (e && e.estado === 'duplicado') { console.log(`  ${docs[i]}: duplicado de ${e.duplicadoDe} (misma huella): se saltea`); docs.splice(i, 1); } }
// silencioso: para las tools que se llaman solo por su efecto y imprimen un resumen de TODO el proyecto (inventario-transcripciones.mjs
// imprimía ~150 líneas del registro entero en medio de la etapa 7; Versión 327). Si fallan, se muestra su salida igual.
const node = (tool, argv, { silencioso = false } = {}) => {
  const r = spawnSync('node', [resolve(ROOT, tool), ...argv], { cwd: ROOT, stdio: silencioso ? 'pipe' : 'inherit', encoding: 'utf8' });
  if (silencioso && r.status !== 0) process.stdout.write(`${r.stdout || ''}${r.stderr || ''}`);
  return r;
};

const INICIO = new Date().toISOString(); // (Versión 449) desde cuándo cuenta el gasto por documento
const gastoValidar = {}; // (Versión 449) lo que costó validar escaneos (Gemini con rutas temporales: no queda en ningún log con el PDF)
const anotarValidar = (pdf, V) => { const c = V?.costo || 0; if (c) gastoValidar[pdf] = { validar: (gastoValidar[pdf]?.validar || 0) + c }; return c; };
const sitio = loadSite(); // (Versión 442) antes del loop: "año ya cargado" mira también el sitio
let usd = 0; const estado = {}; const aRetranscribir = []; const aTextoPropio = []; const aFijar = [];
// Páginas interiores (sin las 2 primeras ni la última) con menos de 200 caracteres de texto propio: son imágenes.
const paginasEnImagen = (pdf) => {
  const n = Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0); const out = [];
  for (let i = 3; i < n; i++) { const t = spawnSync('pdftotext', ['-f', String(i), '-l', String(i), resolve(ROOT, pdf), '-'], { encoding: 'utf8' }).stdout || ''; if (t.replace(/\s/g, '').length < 200) out.push(i); }
  return out;
};
console.log(`\n=== Etapas 3-5: localizar, validar, extraer (${EJECUTAR ? 'DE VERDAD' : 'ENSAYO, sin API'}) ===`);
// ETAPA 3, ANTES DE LA COMPUERTA: EL PERÍMETRO DEL CLUB POR SEÑALES (tools/perimetro-senales.mjs, aprobado por Guido el 2026-10-06). Para cada
// club de la lista que frenaría por perímetro, mira todos sus .md y, si coinciden (tablas de cada perímetro y el voto de 3 criterios, uno de
// Jev), fija el ajuste del club; si no, la compuerta frena como siempre y Guido decide. En el ensayo no pregunta a Jev ni escribe: dice qué
// fijaría. Caso: lote 14, 12 clubes italianos nuevos, 29 documentos frenados por perímetro.
const { fijarPerimetroDeClubes } = await import('./perimetro-senales.mjs');
const PS = await fijarPerimetroDeClubes(docs, { registro, ejecutar: EJECUTAR, descartados, faltaPerimetro: (p) => faltaAntesDeLocalizar(p, { registro })?.falta === 'perimetro' });
const previstoPerimetro = EJECUTAR ? null : new Map(PS.filter((x) => x.valor || x.pendienteJev).map((x) => [x.carpeta, x.valor || '?']));
for (const x of PS) console.log(`  perímetro ${x.carpeta}: ${x.valor ? `${x.escrito ? 'fijado' : 'se fija al ejecutar'}: ${x.valor} (${x.detalle})` : x.pendienteJev ? `lo decide Jev al ejecutar (${x.detalle})` : `no se fija solo: ${x.detalle}`}`);
for (const pdf of docs) {
  let e = registro.find((x) => x.pdf === pdf);
  // (Versión 407) el registro puede tener la ruta del .md sin el archivo en disco (tieneMd: false, "PAGADO SIN .md": Novorizontino 2022);
  // antes pasaba a localizar.mjs y el lote entero se caía con ENOENT.
  if (!e?.md || !existsSync(resolve(ROOT, e.md))) { estado[pdf] = 'sin transcripción (etapa 2)'; console.log(`  ${pdf}: sin .md`); continue; }
  // ETAPA 2, ESCALÓN 1a (Versión 433, cambio E, aprobado por Guido el 2026-10-03): si el inventario dice "revisar", primero las VOCES
  // (tools/resolver-inventario.mjs, la herramienta que ya existía en el proceso viejo): compara cada página del .md con el texto del PDF,
  // ignora las dudas en prosa y manda a Claude solo las páginas con cifras que no coinciden. COMPUERTA: se regenera el inventario y el
  // documento queda "listo" -> sigue. Si no, el escalón 1b de abajo (rearmar con el texto propio) como antes. Hasta acá el lote iba directo
  // al rearmado, que con la marca "dígito distinto" reescribía TODAS las páginas por un código postal (Juventus 2017-18: "10121 Torino"
  // contra "10151 Turin"; 1 página con cifras dudosas de 117). Se llama como comando aparte: una sola versión de la lógica.
  // ETAPA 2, ESCALÓN 1a, "SIN VERIFICAR" (Versión 463, grupo C de los defectos chicos, aprobado por Guido el 2026-10-04): el .md cambió
  // después de su última validación (desde la V443, el registro dice qué páginas). Antes de localizar (que se paga) va la validación GRATIS
  // del inventario (números del .md contra el texto del PDF), solo para la carpeta del club: si queda "listo", sigue; si queda "revisar",
  // el resolver de abajo (que paga solo las páginas cambiadas). Corre también en el ensayo: es gratis. Hasta acá un "sin verificar" iba
  // directo a localizar sobre una transcripción sin validar. Caso: Juventus 2021-22 quedó así al rearmar 3 páginas.
  if (e.estado === 'sin-verificar' && !e.cargado) {
    const carpeta = pdf.split('/').slice(0, 3).join('/');
    node('tools/inventario-transcripciones.mjs', ['--verificar', '--estado', 'sin-verificar', '--dir', carpeta], { silencioso: true });
    registro = leerRegistro(); e = registro.find((x) => x.pdf === pdf) || e;
    console.log(`  ${pdf}: "sin verificar" -> validación gratis del inventario (etapa 2, escalón 1a): ahora "${e.estado}"`);
  }
  let resolverEnsayo = false;
  if (e.estado === 'revisar' && !e.cargado) {
    const R = node('tools/resolver-inventario.mjs', ['--pdf', pdf, ...(EJECUTAR ? ['--ejecutar'] : [])], { silencioso: true });
    const sal = `${R.stdout || ''}`;
    if (!EJECUTAR) {
      const l = sal.split('\n').find((x) => x.includes(pdf)) || '';
      usd += Number((l.match(/~\$([\d.]+)/) || [])[1] || 0);
      console.log(`  ${pdf}: el inventario dice "revisar" -> resolver-inventario (etapa 2, escalón 1a): ${l.replace(pdf, '').replace(/\s+/g, ' ').trim()}`);
      resolverEnsayo = true;
    } else {
      node('tools/inventario-transcripciones.mjs', [], { silencioso: true }); registro = leerRegistro();
      e = registro.find((x) => x.pdf === pdf) || e;
      console.log(`  ${pdf}: resolver-inventario (etapa 2, escalón 1a): el inventario ahora dice "${e.estado}"${e.estado === 'listo' ? '' : ` (${String(e.detalle || '').slice(0, 120)}): sigue el escalón 1b`}`);
    }
  }
  // AÑO YA CARGADO (Versión 406, auditoría del pipeline): con --reintentar, un documento cuyo año ya está en el sitio NO se reintenta por
  // "desglose que no suma" (se cargó con el renglón sin abrir, a propósito; en Fortaleza 2018-2020 esas marcas eran ruido: 5.867,807 contra
  // 5.867,804). Solo por "categoría en 0" de su propuesta de carga, y solo si esa propuesta es posterior al último ajuste manual (si no, es
  // vieja: Goiás 2025 y 2017 se reprocesaron por una propuesta anterior a sus ajustes cero-real, US$ 0,45). Caso que sí: Fortaleza 2017,
  // sueldos en 0 (Admin/Archive/lotes/lote-08b.txt).
  // (Versión 461, grupo A de los defectos chicos, aprobado por Guido el 2026-10-04) AL DÍA POR DOCUMENTO: la propuesta es vieja solo si hay un
  // ajuste manual del MISMO documento o de su CLUB con fecha igual o posterior al día de la propuesta (mismo día = vieja, igual de prudente
  // que antes). Hasta acá se comparaba con la fecha del archivo de ajustes ENTERO: un ajuste de Novorizontino dejaba "vieja" la propuesta
  // de Fortaleza 2017 y su reintento no corría (86 de 87 propuestas de prueba-completa contaban como viejas; por documento y club, 58).
  const cargaFresca = (() => { try { const c = leerDerivado(e, '.carga.json'); if (!c?.generado) return false; const dia = String(c.generado).slice(0, 10); const carpeta = pdf.split('/').slice(0, 3).join('/') + '/'; return !ajustesTodos().some((a) => (a.pdf === pdf || a.pdf === carpeta) && String(a.fecha || '') >= dia); } catch { return false; } })();
  // AÑO YA CARGADO SEGÚN EL SITIO (Versión 442): el registro se queda viejo si no se regenera después de cargar (Juventus 2021-22: en
  // data/juventus-it-data.js y `cargado: false` en el registro; un --reintentar lo volvía a pagar). Se mira también el sitio, por el clubId y
  // el año de la última propuesta de carga del documento.
  const cargado = e.cargado || (() => { const c = leerDerivado(e, '.carga.json'); return !!(c?.clubId && c?.year && sitio.generic?.[c.clubId]?.fiscalYearMeta?.[c.year]); })();
  const reintento = !REINTENTAR ? null : cargado ? (cargaFresca && categoriasPendientes(e).length ? categoriasPendientes(e) : null) : verifDe(e)?.reintentar || null;
  if (REINTENTAR && cargado && !reintento) { estado[pdf] = 'ya cargado, sin categorías en 0 que reintentar'; console.log(`  ${pdf}: ya cargado (no se reintenta por desgloses)`); continue; }
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
  // PERÍMETRO, ESCALÓN 0 EN LA ETAPA 3 (Versión 436, cambio H, aprobado por Guido el 2026-10-03): el ajuste manual `perimetro` (del documento
  // o del club) se le pasa a localizar, que hasta acá elegía el consolidado por defecto y el ajuste recién lo leía cargar (etapa 8). Caso:
  // Juventus 2020-21, localizar eligió el consolidado (b15, pág. 32) con el individual al lado (b87, pág. 69) y el ajuste del club en
  // "individual"; no cerraba ninguna lectura. Sin ajuste, localizar elige como antes.
  const perimetroClub = ajustePerimetroDe(pdf)?.valor || null;
  const ajRes = ajusteDe(pdf, 'resultado-final');
  const candidatoAjuste = REINTENTAR && ubAntes && !ubAntes.intentoNotasConAjuste && (ubAntes.sin_estado || !(ubAntes.estado || []).length) && ajRes?.linea;
  if (candidatoNotas || candidatoAjuste) {
    const L3 = await localizar(pdf, { registro, perimetroClub, ejecutar: EJECUTAR, rehacer: true, notasComoEstado: true, pistaResultado: candidatoAjuste ? { valor: ajRes.valor, linea: ajRes.linea } : null });
    if (L3.ensayo) { const EX = estimarExtraerSinBloques(pdf); usd += L3.usd + EX.usd; console.log(`  ${pdf}: sin estado, con notas: las notas hacen de estado (etapa 3, escalón 2${candidatoAjuste ? ', con la pista del ajuste manual' : ''}) · localizar ~US$ ${L3.usd.toFixed(3)} + extraer ${EX.texto}`); continue; }
    if (L3.error) { estado[pdf] = `localizar (notas como estado): ${L3.error}`; continue; }
    usd += L3.costo || 0;
    if (L3.datos.sin_estado) { estado[pdf] = 'sin estado de resultados ni notas con resultado impreso (queda como fuente)'; console.log(`  ${pdf}: ${estado[pdf]}`); continue; }
    const V3 = await validar(pdf, { registro, ejecutar: true, rehacer: true }); usd += anotarValidar(pdf, V3) || V3.usd || 0;
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
  const TP = resolverEnsayo ? null : paginasARearmar(pdf, e.md, e); const pagsTP = TP?.paginas; // (Versión 433) en el ensayo, el 1a va primero
  if (pagsTP) {
    if (!(REINTENTAR && EJECUTAR)) { aTextoPropio.push({ pdf, paginas: pagsTP }); console.log(`  ${pdf}: ${TP.metodo === 'regiones' ? 'rearmada con el texto propio (columnas) y sigue sin cerrar' : 'la transcripción no coincide con el texto propio del PDF'} (págs. ${pagsTP.join(', ')}): rearmar (método ${TP.metodo}, --reintentar, gratis) + localizar ~US$ 0,05 + extraer ${estimarExtraerSinBloques(pdf).texto}`); if (!EJECUTAR) usd += 0.05 + estimarExtraerSinBloques(pdf).usd; continue; }
    const RA = rearmar(pdf, pagsTP, TP.metodo);
    console.log(`  ${pdf}: págs. ${RA.paginas.join(', ') || 'ninguna'} rearmadas con el texto propio del PDF (etapa 2, escalón 1, método ${TP.metodo})${RA.rechazadas.length ? `; págs. ${RA.rechazadas.join(', ')} NO (la compuerta del rearmado: perdían filas de tabla, queda la transcripción anterior)` : ''}`);
    const L4 = await localizar(pdf, { registro, perimetroClub, ejecutar: true, rehacer: true }); usd += L4.costo || 0;
    if (L4.error || L4.datos?.sin_estado) { estado[pdf] = L4.error ? `localizar: ${L4.error}` : 'sin estado de resultados aun con el texto propio (queda como fuente)'; continue; }
    const V4 = await validar(pdf, { registro, ejecutar: true, rehacer: true }); usd += anotarValidar(pdf, V4) || V4.usd || 0;
    const X4 = await extraer(pdf, { registro, ejecutar: true, rehacer: true }); usd += X4.costo || 0;
    if (X4.error) { estado[pdf] = `extraer: ${X4.error}`; continue; }
    estado[pdf] = 'extraído (texto propio del PDF)'; console.log(`  ${pdf}: estado ${L4.datos.estado.join(',')} · ${V4.datos?.modo || '?'} · ${X4.datos.filas.length} filas · US$ ${usd.toFixed(2)} acumulado`);
    continue;
  }
  if (REINTENTAR && !reintento && !sinEstadoAntes) { const op = !DETALLE && verifDe(e).detalle; estado[pdf] = op ? 'cierra; detalle opcional (--detalle)' : 'sin reintento pendiente'; console.log(`  ${pdf}: ${op ? `cierra; desgloses que no suman como detalle opcional (--detalle): ${op.map((x) => `"${x.renglon}"`).join(', ')}` : 'sin desgloses que reintentar'}`); continue; }
  // ETAPA 3, COMPUERTA ANTES DE PAGAR (Versión 441, punto 1b.i del HANDOFF, aprobado por Guido el 2026-10-04): si el documento todavía no
  // se localizó y le falta fijar el CIERRE o el PERÍMETRO (trae consolidado e individual y no hay ajuste ni año cargado de dónde heredarlo),
  // no se localiza: se imprime el ajuste que falta y el resto del lote sigue. Caso: Juventus, lote 13, localizó 2020-21 a 2024-25 con el
  // consolidado y hubo que pagar localizar y extraer otra vez (~US$ 2,8). La escalera está en tools/antes-de-localizar.mjs.
  const FP = faltaAntesDeLocalizar(pdf, { registro, previsto: previstoPerimetro });
  if (FP?.aviso) console.log(`  ${pdf}: compuerta antes de localizar: ${FP.aviso}`);
  else if (FP) { aFijar.push({ pdf, ...FP }); estado[pdf] = `falta fijar el ${FP.falta} antes de localizar`; console.log(`  ${pdf}: FALTA FIJAR EL ${FP.falta.toUpperCase()} antes de localizar (no se paga): ${FP.detalle}`); continue; }
  // ETAPAS 3-5, ¿EL CACHÉ SIGUE SIRVIENDO? (Versión 445, punto 1.iv del HANDOFF, aprobado por Guido el 2026-10-04): si el .md cambió
  // desde extraer y las filas ya no están en su línea (tools/cache-al-dia.mjs), un año sin cargar se rehace (localizar, validar y extraer;
  // el ensayo dice el costo) y un año cargado solo avisa (no se paga nada). Caso: Juventus 2021-22, 148 de 149 filas corridas.
  const CA = REHACER || reintento ? null : cacheAlDia(e.md);
  const cacheViejo = CA && !CA.alDia && !cargado;
  if (CA && !CA.alDia) console.log(`  ${pdf}: ${CA.detalle}${cargado ? ' (año cargado: solo aviso, no se rehace)' : ': se rehace localizar, validar y extraer'}`);
  // (Versión 460, punto del reintento, aprobado por Guido el 2026-10-04) EL REINTENTO EN EL MISMO MODO: si la localización vigente es "las notas
  // hacen de estado" (etapa 3, escalón 2), el reintento relocaliza en ese modo (con el índice ampliado y la lista de lo que faltó). Caso:
  // Fortaleza 2017 (solo notas) relocalizó en el modo normal, dio "sin estado" y pisó la localización buena.
  const enModoNotas = !!reintento && !!ubAntes?.estadoDesdeNotas;
  const L = await localizar(pdf, { registro, perimetroClub, ejecutar: EJECUTAR, rehacer: REHACER || !!reintento || cacheViejo, ampliado: !!reintento, reintento, notasComoEstado: enModoNotas });
  if (!L.ensayo && !L.error && reintento && reintento.some((x) => x.categoria)) { try { writeFileSync(resolve(ROOT, derivado(e.md, '.reintento-categorias.json')), JSON.stringify({ fecha: new Date().toISOString(), categorias: reintento.filter((x) => x.categoria).map((x) => x.categoria), modoNotas: enModoNotas }, null, 1)); } catch { /* sin marca: como antes */ } }
  // (Versión 460) COMPUERTA: un reintento que da "sin estado" cuando la localización anterior sí tenía estado NO la pisa (sin estado nunca se
  // puede cargar): el intento queda en <doc>.ubicacion-reintento.json y vuelve la anterior.
  if (!L.ensayo && !L.error && reintento && L.datos?.sin_estado && ubAntes && !ubAntes.sin_estado && (ubAntes.estado || []).length) {
    writeFileSync(resolve(ROOT, derivado(e.md, '.ubicacion-reintento.json')), JSON.stringify(L.datos, null, 1));
    writeFileSync(resolve(ROOT, derivado(e.md, '.ubicacion.json')), JSON.stringify(ubAntes, null, 1));
    usd += L.costo || 0; estado[pdf] = 'reintento sin estado: queda la localización anterior'; console.log(`  ${pdf}: el reintento no encontró estado; queda la localización anterior (el intento, en .ubicacion-reintento.json)`);
    continue;
  }
  if (L.ensayo) { const EX = estimarExtraerSinBloques(pdf); usd += L.usd + EX.usd; console.log(`  ${pdf}: ${enModoNotas ? 'reintento con las notas como estado: ' : ''}localizar ~US$ ${L.usd.toFixed(3)} + extraer ${EX.texto}`); continue; }
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
      const L2 = await localizar(pdf, { registro, perimetroClub, ejecutar: true, rehacer: true }); usd += L2.costo || 0;
      if (L2.error || L2.datos?.sin_estado) { estado[pdf] = 'sin estado de resultados aun re-transcripto (queda como fuente)'; continue; }
      const V2 = await validar(pdf, { registro, ejecutar: true, rehacer: true }); usd += anotarValidar(pdf, V2);
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
  const V = await validar(pdf, { registro, ejecutar: EJECUTAR, rehacer: REHACER || !!reintento || cacheViejo }); usd += (EJECUTAR ? anotarValidar(pdf, V) : V.costo) || V.usd || 0;
  const X = await extraer(pdf, { registro, ejecutar: EJECUTAR, rehacer: REHACER || !!reintento || cacheViejo, reintento });
  if (X.ensayo) { usd += X.usd; console.log(`  ${pdf}: localizar ya hecho · extraer ~US$ ${X.usd.toFixed(3)} (estimado)`); continue; }
  usd += X.costo || 0;
  if (X.error) { estado[pdf] = `extraer: ${X.error}`; continue; }
  estado[pdf] = testigos.has(pdf) ? 'testigo (solo hasta extraer)' : 'extraído';
  console.log(`  ${pdf}: estado ${L.datos.estado.join(',')} · ${V.datos?.modo || '?'} · ${X.datos.filas.length} filas · US$ ${usd.toFixed(2)} acumulado`);
}
// Lo que falta fijar antes de localizar (Versión 441): un comando por club (perímetro) o por documento (cierre), sin repetir.
const imprimirAFijar = () => {
  if (!aFijar.length) return;
  console.log(`\nFALTA FIJAR ANTES DE LOCALIZAR (etapa 3; ${aFijar.length} documento(s) sin pagar hasta que esté fijado; gratis):`);
  for (const c of [...new Set(aFijar.map((x) => x.comando))]) console.log(`  ${c}`);
};
if (!EJECUTAR) imprimirAFijar();
if (!EJECUTAR) { console.log(`\nENSAYO: ~US$ ${usd.toFixed(2)} para localizar y extraer ${docs.length} documento(s), más ~US$ 0,03 c/u de categorización y la validación de páginas escaneadas (~US$ 0,003 por página). Agregá --ejecutar.`); process.exit(0); }

console.log('\n=== Etapa 6: verificar (gratis) ===');
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
// Camino de error: qué documentos quedaron para reintentar (Versión 442: en dos bloques, lo que destraba la carga y el detalle opcional).
const yaEnSitio = (e) => e.cargado || (() => { const c = leerDerivado(e, '.carga.json'); return !!(c?.clubId && c?.year && sitio.generic?.[c.clubId]?.fiscalYearMeta?.[c.year]); })();
const motivos = (xs) => xs.map((x) => (x.categoria ? `"${x.categoria}" en 0` : `"${x.renglon}" ${x.suma} contra ${x.objetivo}`)).join('; ');
const aReintentar = []; const aDetalle = [];
for (const d of docs) {
  const e = registro.find((x) => x.pdf === d); if (!e?.md) continue;
  const v = verifDe(e, { detalle: false }); const enSitio = yaEnSitio(e);
  const destraba = enSitio ? (v.reintentar || []).filter((x) => x.categoria) : v.reintentar || [];
  if (destraba.length) aReintentar.push({ d, m: destraba }); else if (!enSitio && v.detalle) aDetalle.push({ d, m: v.detalle });
}
if (aReintentar.length) {
  console.log(`\nREINTENTOS QUE DESTRABAN LA CARGA (camino de error, una vez por documento: categorías en 0, o desgloses que no suman con la etapa 6 sin cerrar):`);
  for (const x of aReintentar) console.log(`  ${x.d.split('/').slice(2).join('/')}: ${motivos(x.m)}`);
  console.log(`  Reintento con índice ampliado (~US$ 0,50 por documento): caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar`);
}
if (aDetalle.length) {
  console.log(`\nDETALLE OPCIONAL (el año se carga igual, con el renglón sin abrir; desgloses que no suman con la etapa 6 cerrada):`);
  for (const x of aDetalle) console.log(`  ${x.d.split('/').slice(2).join('/')}: ${motivos(x.m)}`);
  console.log(`  Solo si hace falta el detalle (~US$ 0,50 por documento): caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar --detalle`);
}
imprimirAFijar();
// GASTO POR DOCUMENTO (Versión 449, punto 1.vi del HANDOFF, aprobado por Guido el 2026-10-04): lo gastado en esta corrida en cada documento,
// por tarea, y "N.ª vez" si esa tarea ya se había pagado antes para el mismo PDF (tools/gasto-doc.mjs; solo información, no frena).
const GD = gastoPorDocumento(docs, { desde: INICIO, registro, extra: gastoValidar });
if (GD.length) { console.log('\nGASTO POR DOCUMENTO (esta corrida; "N.ª vez" = esa tarea ya se había pagado antes para el mismo PDF):'); for (const l of lineasGasto(GD)) console.log(l); }
console.log(`\nGastado: US$ ${usd.toFixed(2)} (más la categorización: node tools/gasto.mjs). Cola humana de este lote: ${cola.length} caso(s) -> node tools/cola.mjs`);

// RESULTADO (Versión 351, pedido de Guido: "que al final de la corrida diga 'Frenados X' 'Listo para cargar Y'"). Lee la última propuesta de
// carga (<doc>.carga.json) de CADA documento de la lista, no solo de los que pasaron por la etapa 8 en esta corrida (en un --reintentar la
// etapa 8 corre solo sobre los reintentados). "Ya en el sitio" va aparte: un año ya cargado frena por diseño (cargar.mjs no pisa un
// ejercicio), y contarlo como frenado escondería los frenados de verdad.
const resultado = { listo: [], frenado: [], yaCargado: [], sinPropuesta: [] };
for (const pdf of docs.filter((d) => !testigos.has(d))) {
  const e = registro.find((x) => x.pdf === pdf); const c = e?.md ? leerDerivado(e, '.carga.json') : null;
  // (Versión 562) el club adelante del año: con varios clubes en un lote, "2021" solo no dice cuál (lote 14, 12 clubes italianos).
  const anio = `${pdf.split('/')[2] || ''} ${c?.year || (pdf.match(/(\d{4})(?!.*\d{4})/) || [])[1] || pdf}`.trim();
  // (Versión 461) un año que ya está en el sitio va a "Ya en el sitio" aunque su última propuesta sea vieja (Novorizontino 2018-2021 y
  // 2024, Juventus 2012: propuestas de antes del alta del club decían "el club no existe en el sitio").
  if (e?.md && yaEnSitio(e)) resultado.yaCargado.push({ anio });
  else if (!c) resultado.sinPropuesta.push({ anio, motivo: estado[pdf] || 'sin propuesta de carga' });
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

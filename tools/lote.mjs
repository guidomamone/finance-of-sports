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
//   5  extraer.mjs          las filas tal cual, con escala por bloque y la columna del año anterior   IA, ~US$ 0,20 (mediana de lo gastado; hasta ~0,35 en documentos largos)
//   6  verificar.mjs        chequeos gratis; lo que no cierra va a la cola; deja el .rubros.json     gratis
//      + primer-anio-ia.mjs el primer año de un club cuando solo coincide el resultado: Claude revisa las filas  ~US$ 0,02
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
//   node tools/lote.mjs --lista Admin/lotes/lote-NN.txt                 ensayo con costo
//   caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar
//   En la lista, "testigo <pdf>" = documento que solo sirve para verificar a otro (ver TESTIGOS abajo).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync, statSync, readdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { localizar } from './localizar.mjs';
import { validar } from './validar-bloques.mjs';
import { extraer, estimarExtraerSinBloques } from './extraer.mjs';
import { pendientes, respuestaPosterior } from './cola.mjs';
import { derivado } from './rutas.mjs';
import { etapaDe } from './etapa-doc.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { resolverDeporte, olvidarDeportes } from './deporte-club.mjs'; // el deporte de cada documento antes de Jev y Claude
import { paginasARearmar, rearmar } from './texto-propio-a-md.mjs';
import { tomarCandado, soltarCandado } from './candado.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { verificarLista } = await import('./verificar.mjs');
const { ajusteDe, ajustePerimetroDe } = await import('./ajustes.mjs');
const { loadSite } = await import('./datos-sitio.mjs');
const { faltaAntesDeLocalizar } = await import('./antes-de-localizar.mjs');
const { cacheAlDia, validacionAlDia, ubicacionAlDia } = await import('./cache-al-dia.mjs');
const { gastoPorDocumento, lineasGasto } = await import('./gasto-doc.mjs');
const { categoriasAlDia, jevAlDia } = await import('./huellas.mjs');
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const LISTA = flag('--lista'); const EJECUTAR = ARGS.includes('--ejecutar'); const REHACER = ARGS.includes('--rehacer');
// --sin-api: con --ejecutar, corre todo lo gratis y FRENA, documento por documento, donde hoy llamaría a una API (localizar, extraer, validar un escaneo,
// resolver el inventario, el perímetro por Jev, el primer año, Jev, Claude). Lo que ya está hecho (caché al día, categorías al día, o escrito por la sesión con
// armar-a-mano.mjs y --desde-sesion) sigue de largo. `API` = puede llamar a una API: es EJECUTAR salvo con --sin-api.
const SIN_API = ARGS.includes('--sin-api'); const API = EJECUTAR && !SIN_API;
const CARGAR = ARGS.includes('--cargar');
let frenaSinApi = () => {}; // se define abajo, cuando existe `estado` // al final, tools/cargar-lote.mjs: altas, cargas y un commit por año (ensayo sin --ejecutar)
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
// `detalle`: los desgloses que no suman de un documento cuya etapa 6 cerró (opcionales, ver --detalle); `reintentar`: lo que
// destraba la carga, más el detalle si se pidió --detalle.
// UNA VEZ POR DOCUMENTO también para "categoría en 0": el intento queda en <doc>.reintento-categorias.json (lo escribe el lote al
// reintentar); con esa marca, las categorías en 0 de la propuesta de carga ya no piden otro reintento. Caso: Fortaleza 2017, el lote volvía a
// ofrecer el mismo reintento después de intentarlo (y se pagaba cada vez).
const categoriasPendientes = (e) => (leerDerivado(e, '.reintento-categorias.json') ? [] : ((leerDerivado(e, '.carga.json') || {}).reintentar || []).filter((x) => x.categoria));
const verifDe = (e, { detalle = DETALLE } = {}) => {
  const v = leerDerivado(e, '.verificacion.json') || {};
  const desgl = v.reintentar || []; const opcional = v.estado === 'ok' ? desgl : [];
  const r = [...(v.estado === 'ok' && !detalle ? [] : desgl), ...categoriasPendientes(e)];
  return { ...v, reintentar: r.length ? r : null, detalle: opcional.length ? opcional : null };
};
if (!LISTA) { console.error('Uso: node tools/lote.mjs --lista <archivo> [--ejecutar] [--rehacer] [--cargar]'); process.exit(1); }
// CANDADO: un solo proceso a la vez escribiendo el registro, también en el ensayo (to-dos 162 y 164; el porqué y el cómo, en
// tools/candado.mjs). Lo comparten lote.mjs, pipeline.mjs y cargar.mjs --escribir.
tomarCandado('lote.mjs', { lista: LISTA, modo: EJECUTAR ? '--ejecutar' : 'ensayo' });
// TESTIGOS (Versión 334, ok de Guido): una línea "testigo <pdf>" es un documento que entra SOLO para verificar a otro (su columna "año
// anterior" contra el año actual del otro: chequeo de año vecino de verificar.mjs). Pasa por localizar, validar y extraer, y nada más: no se
// verifica, no se categoriza ni se propone cargar (UC 2022 en el lote 03: ya cargado, llenaba la terminal con 7 frenos esperables).
const lineas = readFileSync(resolve(ROOT, LISTA), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const testigos = new Set(lineas.filter((l) => /^testigo\s+/i.test(l)).map((l) => l.replace(/^testigo\s+/i, '')));
// DESCARTADOS: Admin/registros/documentos-descartados.txt lista los documentos que Guido descartó como fuente; el lote los saltea.
const descartados = new Set((existsSync(resolve(ROOT, 'Admin', 'registros', 'documentos-descartados.txt')) ? readFileSync(resolve(ROOT, 'Admin', 'registros', 'documentos-descartados.txt'), 'utf8') : '').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')));
// PARCIALES: los balances de menos de 12 meses (Admin/registros/documentos-parciales.txt) tampoco entran: falta el otro tramo.
const parciales = new Set((existsSync(resolve(ROOT, 'Admin', 'registros', 'documentos-parciales.txt')) ? readFileSync(resolve(ROOT, 'Admin', 'registros', 'documentos-parciales.txt'), 'utf8') : '').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')));
const docs0 = lineas.map((l) => l.replace(/^testigo\s+/i, '')).filter((d) => { if (descartados.has(d)) { console.log(`  ${d}: descartado (Admin/registros/documentos-descartados.txt)`); return false; } if (parciales.has(d)) { console.log(`  ${d}: parcial, menos de 12 meses (Admin/registros/documentos-parciales.txt)`); return false; } return true; });
// LA VERSIÓN CORREGIDA REEMPLAZA AL ORIGINAL (to-do 298 o, ok de Guido 2026-10-18). El registro belga publica a veces el balance del mismo
// año otra vez, corregido ("verbeterde neerlegging"): quedan "<doc>.pdf" y "<doc>-correction.pdf" en la carpeta y entraban los dos al lote
// (se pagaban dos veces y la cola preguntaba lo mismo dos veces). UNA compuerta: los dos están en la lista (misma carpeta, mismo nombre más
// "-correction") y la corrección tiene su .md. Entonces entra solo la corrección; el original se saltea en esta corrida y queda como
// propuesta para Admin/registros/documentos-descartados.txt (entra ahí solo con el ok de Guido). Un original solo, sin su corrección en la
// lista, entra como siempre. Casos: Union Saint-Gilloise 2023, Club Brugge 2013 y 2020, Mechelen 2021, Beerschot 2019, Lommel SK 2021.
const correccionDe = (d) => d.replace(/\.pdf$/i, '-correction.pdf');
const reemplazadosPorCorreccion = docs0.filter((d) => !testigos.has(d) && !/-correction\.pdf$/i.test(d) && docs0.includes(correccionDe(d)) && existsSync(resolve(ROOT, correccionDe(d).replace(/\.pdf$/i, '.md'))));
for (const d of reemplazadosPorCorreccion) console.log(`  ${d}: salteado, la versión corregida (${correccionDe(d).split('/').pop()}) lo reemplaza`);
const docs = docs0.filter((d) => !reemplazadosPorCorreccion.includes(d));
const avisoCorrecciones = () => { if (reemplazadosPorCorreccion.length) console.log(`\nREEMPLAZADOS POR SU VERSIÓN CORREGIDA (no entraron; propuesta para Admin/registros/documentos-descartados.txt, con el ok de Guido):\n${reemplazadosPorCorreccion.map((d) => `  ${d}`).join('\n')}`); };
// EN OTRA LISTA ACTIVA (to-do 232 g). lote-71.txt siguió listando los 10 documentos de Olympiacos después de pasarlos al lote 74 y la
// segunda corrida del 71 los pagó de nuevo. Aviso (no frena: a veces se repite a propósito): un documento de esta lista que también está
// en otra Admin/lotes/lote-*.txt. Las prueba-*.txt repiten documentos por diseño y no cuentan; los testigos tampoco, de ningún lado.
{
  const sinTestigo = (f) => readFileSync(f, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && !/^testigo\s+/i.test(l));
  const propia = resolve(ROOT, LISTA); const mios = new Set(docs.filter((d) => !testigos.has(d)));
  for (const f of readdirSync(resolve(ROOT, 'Admin', 'lotes')).filter((f) => /^lote-.*\.txt$/.test(f)).sort()) {
    const otra = resolve(ROOT, 'Admin', 'lotes', f); if (otra === propia) continue;
    const comunes = sinTestigo(otra).filter((d) => mios.has(d));
    if (comunes.length) console.log(`Aviso (no frena): ${comunes.slice(0, 3).map((d) => d.split('/').pop()).join(', ')}${comunes.length > 3 ? ` y ${comunes.length - 3} más` : ''} también ${comunes.length > 1 ? 'están' : 'está'} en la lista ${f.replace(/\.txt$/, '')}, que sigue activa. Decíselo a Claude para que archive la que ya terminó.`);
  }
}
const ajustesTodos = (() => { let cache = null; return () => (cache ??= (existsSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl')) ? readFileSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return {}; } }) : [])); })();
const leerRegistro = () => readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
let registro = leerRegistro();
// UN AÑO DEL CLUB QUE QUEDA AFUERA (to-do 232 q). Aris 2022 (Aris_FS_audited_art47_2022-06-30) quedó fuera de lote-71.txt, con los
// demás años de Aris adentro, y nada lo avisó. Aviso (no frena), de la etapa de etapa-doc.mjs (la misma que muestra estado.mjs): un
// documento de un club de la lista, fuera de la lista y "sin localizar" (e3-localizar). UNA compuerta: su ejercicio (periodo.cierre del
// registro) está identificado y no es el de ningún documento de la lista ni de uno ya cargado del club. Sin ella avisaba 24 en el
// lote 71 (informes del auditor y del directorio de años que la lista ya cubre); con ella, 2. Un documento sin cierre identificado no
// avisa (Atromitos_audit_2016-17: Admin/HALLAZGOS-pipeline.md).
{
  const club = (p) => p.split('/').slice(0, 3).join('/');
  const enLista = new Set(docs); const clubes = new Set(docs.map(club));
  const cubiertos = new Set(registro.filter((e) => clubes.has(club(e.pdf)) && (enLista.has(e.pdf) || e.cargado || e.estado === 'cargado') && e.periodo?.cierre).map((e) => `${club(e.pdf)}|${e.periodo.cierre}`));
  for (const e of registro) {
    if (!clubes.has(club(e.pdf)) || enLista.has(e.pdf) || !e.periodo?.cierre || cubiertos.has(`${club(e.pdf)}|${e.periodo.cierre}`)) continue;
    if (etapaDe(e).clave === 'e3-localizar') console.log(`Aviso (no frena): ${e.pdf} está transcripto y nadie lo localizó, y su año (cierre ${e.periodo.cierre}) no está en esta lista. Decíselo a Claude: lo suma a un lote o lo descarta.`);
  }
}
// (Versión 521, to-do 140(c)) DUPLICADOS: el mismo PDF que otro (misma huella, inventario-transcripciones.mjs) no se procesa: se procesa el otro.
for (let i = docs.length - 1; i >= 0; i--) { const e = registro.find((x) => x.pdf === docs[i]); if (e && e.estado === 'duplicado') { console.log(`  ${docs[i]}: duplicado de ${e.duplicadoDe} (misma huella): se saltea`); docs.splice(i, 1); } }
// AVISO: UN ALTA ENTRA CON UN SOLO EJERCICIO (skill club-or-year-onboarding, 3a.2; pedido de Onboarding 9). Un club que todavía no está en el sitio
// (quien.mjs: `clubDeCarpeta`) va con el ejercicio más reciente que traiga el estado de resultados completo; el resto de sus años, en el lote siguiente,
// con las respuestas del primero como precedente. El lote 133 traía tres años por alta y nadie lo cortó antes del ensayo. Solo avisa: no saca nada de la lista.
{
  const { quien } = await import('./quien.mjs'); const porClub = new Map();
  for (const d of docs) { const q = quien(resolve(ROOT, d)); if (q.clubDeCarpeta) porClub.set(dirname(d), [...(porClub.get(dirname(d)) || []), d]); }
  const varios = [...porClub].filter(([, ds]) => ds.length > 1);
  if (varios.length) {
    console.log(`\nAVISO (alta con más de un año): ${varios.length} club(es) nuevo(s) con más de un ejercicio en la lista. Un alta entra con UNO solo (el más reciente con estado de resultados completo); los demás, en el lote siguiente:`);
    for (const [c, ds] of varios) console.log(`  ${c}: ${ds.length} ejercicios (${ds.map((d) => d.split('/').pop()).join(', ')})`);
  }
}
// FRENO DE IA SOBRE UN DOCUMENTO DETERMINISTA (Auditora 5, to-do 356; regla de Guido: lo que ya viene estructurado no se paga con IA, Admin/propuestas/estructurado-sin-ia.md). Un .md que escribió
// tools/xhtml-aarsrapport.mjs (primera línea: «motor: xhtml-ixbrl (determinista)») trae sus cifras etiquetadas; localizar y extraer con IA es plata tirada si el escalón que lee las etiquetas puede
// cerrarlo. Mientras ese escalón no exista, --ejecutar NO paga IA sobre esos documentos salvo con --pagar-ia-xhtml "<motivo>" (la bandera es el apagado: queda en
// Admin/registros/pagar-ia-xhtml.jsonl con el motivo y los documentos, y audit.js da P1 si gasto.mjs registra una llamada paga sin ella). El ensayo dice, por documento, que hoy iría por IA.
const esXhtml = (d) => { const x = registro.find((y) => y.pdf === d); try { return /motor: xhtml-ixbrl/.test(readFileSync(resolve(ROOT, x?.md || d.replace(/\.pdf$/i, '.md')), 'utf8').slice(0, 400)); } catch { return false; } };
const docsXhtml = docs.filter(esXhtml); const PAGAR_XHTML = flag('--pagar-ia-xhtml');
// Cada línea de costo del ensayo lo dice al lado del documento: sin la bandera, «se frenaría (determinista)»; con ella, que va por IA y por qué.
// Y el total final separa lo que corre de lo que se frena (antes el aviso salía una vez arriba y cada línea seguía diciendo «localizar ~US$ … + extraer …»).
const DET = new Set(docsXhtml); const PAGA_XHTML = !!PAGAR_XHTML && !PAGAR_XHTML.startsWith('--');
const frenaria = (pdf) => (DET.has(pdf) ? (PAGA_XHTML ? ' · determinista: va por IA (--pagar-ia-xhtml)' : ' · se frenaría (determinista)') : '');
if (docsXhtml.length) {
  console.log(`\nDETERMINISTAS (motor xhtml-ixbrl): ${docsXhtml.length} de ${docs.length} documentos. Sus cifras ya vienen etiquetadas; el escalón que las lee todavía no existe, así que hoy irían por IA (localizar y extraer): determinista, ¿va por etiquetas? NO (sin escalón). Cada uno dice «se frenaría (determinista)» al lado de su costo, y el total final separa lo que corre de lo que se frena.`);
  if (API) {
    if (!PAGA_XHTML) { console.error(`\nFRENADO: ${docsXhtml.length} documentos de motor xhtml-ixbrl (determinista) pagarían IA (localizar y extraer) y ya traen sus cifras etiquetadas. No se escribió nada. Si igual hay que pagarlo, con el motivo: --pagar-ia-xhtml "<motivo>". Primero: node tools/lote.mjs --lista ${LISTA} (ensayo, dice el costo).`); process.exit(1); }
    appendFileSync(resolve(ROOT, 'Admin', 'registros', 'pagar-ia-xhtml.jsonl'), JSON.stringify({ ts: new Date().toISOString(), lista: LISTA, motivo: PAGAR_XHTML, docs: docsXhtml }) + '\n');
    console.log(`  --pagar-ia-xhtml: queda registrado (Admin/registros/pagar-ia-xhtml.jsonl): ${PAGAR_XHTML}`);
  }
}
// silencioso: para las tools que se llaman solo por su efecto y imprimen un resumen de TODO el proyecto (inventario-transcripciones.mjs
// imprimía ~150 líneas del registro entero en medio de la etapa 7; Versión 327). Si fallan, se muestra su salida igual.
const node = (tool, argv, { silencioso = false } = {}) => {
  const r = spawnSync('node', [resolve(ROOT, tool), ...argv], { cwd: ROOT, stdio: silencioso ? 'pipe' : 'inherit', encoding: 'utf8' });
  if (silencioso && r.status !== 0) process.stdout.write(`${r.stdout || ''}${r.stderr || ''}`);
  return r;
};

const INICIO = new Date().toISOString(); // desde cuándo cuenta el gasto por documento
const gastoValidar = {}; // lo que costó validar escaneos (Gemini con rutas temporales: no queda en ningún log con el PDF)
const anotarValidar = (pdf, V) => { const c = V?.costo || 0; if (c) gastoValidar[pdf] = { validar: (gastoValidar[pdf]?.validar || 0) + c }; return c; };
const sitio = loadSite(); // antes del loop: "año ya cargado" mira también el sitio
// ¿el año de la última propuesta de carga (<doc>.carga.json) ya está en el sitio? El año sale del ajuste `anio` si el documento
// lo tiene: la propuesta puede ser de antes del ajuste. Caso: Sporting 2001 (relatorio-contas-2000.pdf), la propuesta vieja decía 2000 (el
// nombre del archivo), 2000 está cargado y el lote lo salteaba como "ya en el sitio".
const propuestaEnSitio = (e) => { const c = leerDerivado(e, '.carga.json'); const anio = ajusteDe(e.pdf, 'anio')?.valor ?? c?.year; return !!(c?.clubId && anio && sitio.generic?.[c.clubId]?.fiscalYearMeta?.[anio]); };
// (to-do 298 q) `cotizados`: los que el ensayo cotiza para localizar o extraer; también van a categorizar
let usd = 0; const estado = {}; const cotizados = new Set(); const aRetranscribir = []; const aTextoPropio = []; const aFijar = [];
frenaSinApi = (pdf, etapa, costo) => { if (SIN_API) estado[pdf] = `frena (--sin-api): ${etapa} llamaría a la API${costo ? ` (~US$ ${Number(costo).toFixed(3)})` : ''}`; };
// Páginas interiores (sin las 2 primeras ni la última) con menos de 200 caracteres de texto propio: son imágenes.
const paginasEnImagen = (pdf) => {
  const n = Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0); const out = [];
  for (let i = 3; i < n; i++) { const t = spawnSync('pdftotext', ['-f', String(i), '-l', String(i), resolve(ROOT, pdf), '-'], { encoding: 'utf8' }).stdout || ''; if (t.replace(/\s/g, '').length < 200) out.push(i); }
  return out;
};
console.log(`\n=== 1/5 · Leer el documento (etapas 3-5: localizar, validar, extraer)${API ? '' : SIN_API ? ' — SIN API: frena donde llamaría a una' : ' — ENSAYO: no llama a ninguna API'} ===`);
// ETAPA 3, ANTES DE LA COMPUERTA: EL PERÍMETRO DEL CLUB POR SEÑALES (tools/perimetro-senales.mjs, aprobado por Guido el 2026-10-06). Para cada
// club de la lista que frenaría por perímetro, mira todos sus .md y, si coinciden (tablas de cada perímetro y el voto de 3 criterios, uno de
// Jev), fija el ajuste del club; si no, la compuerta frena como siempre y Guido decide. En el ensayo no pregunta a Jev ni escribe: dice qué
// fijaría. Caso: lote 14, 12 clubes italianos nuevos, 29 documentos frenados por perímetro.
const { fijarPerimetroDeClubes } = await import('./perimetro-senales.mjs');
const PS = await fijarPerimetroDeClubes(docs, { registro, ejecutar: API, descartados, faltaPerimetro: (p) => faltaAntesDeLocalizar(p, { registro })?.falta === 'perimetro' });
const previstoPerimetro = API ? null : new Map([...PS.filter((x) => x.valor || x.pendienteJev).map((x) => [x.carpeta, x.valor || '?']), ...PS.flatMap((x) => x.porDocumento.map((d) => [d.pdf, d.valor]))]);
for (const x of PS) console.log(`  perímetro ${x.carpeta}: ${x.valor || x.porDocumento.length ? `${x.escrito ? 'fijado' : 'se fija al ejecutar'}: ${x.valor || 'sin perímetro del club, uno por documento'} (${x.detalle})` : x.pendienteJev ? `se decide al ejecutar, con Jev o Claude (${x.detalle})` : `no se fija solo: ${x.detalle}`}`);
// PROPUESTAS FRESCAS ANTES DE REINTENTAR (Versión 643, to-do 196, ok de Guido el 2026-10-09). Qué reintentar por "categoría en 0" sale de la
// propuesta guardada (<doc>.carga.json), que solo se escribe cuando corre el lote. Si después el club se dio de alta fuera del lote, la propuesta
// guardada sigue diciendo "el club no existe" y no menciona los ceros: --reintentar decía "sin desgloses que reintentar" (Vila Nova 2021-2024 y
// Avaí 2021, lote 62). Escalón 0 del camino de error: se vuelve a proponer la carga de los documentos que no están en el sitio (gratis: cargar.mjs
// sin --escribir) y recién ahí se decide. Los ya cargados no se tocan: su propuesta fresca podría pedir un reintento pago que nadie pidió.
if (REINTENTAR) {
  const sinCargar = docs.filter((d) => !testigos.has(d) && !registro.find((x) => x.pdf === d)?.cargado);
  if (sinCargar.length) {
    const tmp = resolve(tmpdir(), `lote-propuestas-${process.pid}.txt`);
    writeFileSync(tmp, sinCargar.join('\n') + '\n');
    node('tools/cargar.mjs', ['--lista', tmp, '--desde-verificacion'], { silencioso: true });
    try { unlinkSync(tmp); } catch { /* ya no está */ }
  }
}
// EL DEPORTE ANTES DE LEER. Localizar, extraer, caja-deuda y perimetro-senales dicen en su prompt el deporte del club (deporteDePdf); un club nuevo todavía no tiene ficha, así que el alta
// (gratis, recalcula solo si cambió la huella) corre sobre las carpetas sin deporte ANTES de la primera lectura. Si no, los clubes nuevos de fútbol leerían con otro prompt (y otra clave de caché).
const sinDeporte = [...new Set(docs.filter((d) => !resolverDeporte({ club: clubDeRuta(d).clubId, pdf: d })).map((d) => d.split('/').slice(1, 3).join('/')))];
for (const solo of sinDeporte) { console.log(`  alta-club (gratis) sobre ${solo}: el club no tiene deporte todavía`); node('tools/alta-club.mjs', ['--todos', '--solo', solo], { silencioso: true }); }
if (sinDeporte.length) olvidarDeportes();
const inicioUsd = {};
for (const pdf of docs) {
  inicioUsd[pdf] = usd;
  let e = registro.find((x) => x.pdf === pdf);
  // el registro puede tener la ruta del .md sin el archivo en disco (tieneMd: false, "PAGADO SIN .md": Novorizontino 2022);
  // antes pasaba a localizar.mjs y el lote entero se caía con ENOENT.
  if (!e?.md || !existsSync(resolve(ROOT, e.md))) { estado[pdf] = 'sin transcripción (etapa 2)'; console.log(`  ${pdf}: sin .md`); continue; }
  // AÑO YA EN EL SITIO (to-do 237 ag, ok de Guido el 2026-10-15): un documento cuyo año ya está cargado no pasa por ninguna etapa más (ni
  // verificar, ni categorizar, ni la propuesta de carga): cargar-lote.mjs no lo iba a tocar igual, y la tabla final lo cuenta en "ya estaba en
  // el sitio" por su cuenta (yaEnSitio, abajo). Misma compuerta que "año ya cargado según el sitio": el registro o el sitio por
  // el clubId y el año de la última propuesta. Caso: lote 80, quinta corrida, 52 documentos verificados, glosados y categorizados para que 44
  // terminaran en "ya en el sitio: no se tocan". Con --reintentar sigue el camino de siempre (reintenta categorías en 0 de un año cargado).
  // Los testigos tampoco se saltean: entran solo para que otro documento compare su año anterior.
  if (!REINTENTAR && !testigos.has(pdf) && (e.cargado || propuestaEnSitio(e))) {
    estado[pdf] = 'ya en el sitio'; console.log(`  ${pdf}: ya en el sitio (no se verifica, categoriza ni propone de nuevo)`); continue;
  }
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
    node('tools/inventario-transcripciones.mjs', ['--verificar', '--estado', 'sin-verificar', '--dir', carpeta, '--solo', carpeta], { silencioso: true });
    registro = leerRegistro(); e = registro.find((x) => x.pdf === pdf) || e;
    console.log(`  ${pdf}: "sin verificar" -> validación gratis del inventario (etapa 2, escalón 1a): ahora "${e.estado}"`);
  }
  let resolverEnsayo = false;
  if (e.estado === 'revisar' && !e.cargado) {
    if (SIN_API) { estado[pdf] = 'frena (--sin-api): el inventario dice "revisar" y resolver-inventario pagaría las páginas dudosas'; console.log(`  ${pdf}: ${estado[pdf]}`); continue; }
    const R = node('tools/resolver-inventario.mjs', ['--pdf', pdf, ...(EJECUTAR ? ['--ejecutar'] : [])], { silencioso: true });
    const sal = `${R.stdout || ''}`;
    if (!EJECUTAR) {
      const l = sal.split('\n').find((x) => x.includes(pdf)) || '';
      usd += Number((l.match(/~\$([\d.]+)/) || [])[1] || 0);
      console.log(`  ${pdf}: el inventario dice "revisar" -> resolver-inventario (etapa 2, escalón 1a): ${l.replace(pdf, '').replace(/\s+/g, ' ').trim()}`);
      resolverEnsayo = true;
    } else {
      node('tools/inventario-transcripciones.mjs', ['--solo', LISTA], { silencioso: true }); registro = leerRegistro(); // --solo: solo la lista del lote
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
  // AÑO YA CARGADO SEGÚN EL SITIO: el registro se queda viejo si no se regenera después de cargar (Juventus 2021-22: en
  // data/it/juventus-it-data.js y `cargado: false` en el registro; un --reintentar lo volvía a pagar). Se mira también el sitio, por el clubId y
  // el año de la última propuesta de carga del documento.
  const cargado = e.cargado || propuestaEnSitio(e);
  // (to-do 237 af y s) RESPUESTA POSTERIOR A LA VERIFICACIÓN: si la cola tiene respuestas a casos de la etapa 6 de este documento más nuevas
  // que su .verificacion.json, se vuelve a verificar (gratis) ANTES de decidir el reintento y el rearmado, que se deciden con esa verificación.
  // Sin esto, un documento con la cola ya contestada seguía con la verificación vieja: no pasaba a "extraído", pedía rearmar con el texto
  // propio (paginasARearmar) o un --reintentar pagaba localizar y extraer de nuevo y abría preguntas nuevas (lote 80: Sporting 2007-08 y
  // Benfica 2019-20; lote 79). Compuerta: solo si la respuesta es posterior; después de verificar, ya no lo es (no se repite).
  if (!cargado && e.md && respuestaPosterior(pdf, 'verificar', leerDerivado(e, '.verificacion.json')?.generado || null) && leerDerivado(e, '.verificacion.json') && leerDerivado(e, '.filas.json')) {
    const [[, VQ]] = verificarLista([pdf], { registro, sitio });
    console.log(`  ${pdf}: la cola tiene respuestas posteriores a su verificación: etapa 6 de nuevo, gratis -> ${VQ?.estado || VQ?.error || '?'}`);
  }
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
    const L3 = await localizar(pdf, { registro, perimetroClub, ejecutar: API, rehacer: true, notasComoEstado: true, pistaResultado: candidatoAjuste ? { valor: ajRes.valor, linea: ajRes.linea } : null });
    if (L3.ensayo) { frenaSinApi(pdf, 'localizar (las notas hacen de estado)', L3.usd); cotizados.add(pdf); const EX = estimarExtraerSinBloques(pdf); usd += L3.usd + EX.usd; console.log(`  ${pdf}: sin estado, con notas: las notas hacen de estado (etapa 3, escalón 2${candidatoAjuste ? ', con la pista del ajuste manual' : ''}) · localizar ~US$ ${L3.usd.toFixed(3)} + extraer ${EX.texto}${frenaria(pdf)}`); continue; }
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
  // el rearmado tiene su propia escalera: método "columnas" primero; "regiones" solo si con "columnas" la etapa 6 no cerró.
  // LOTE CORTADO: LA ETAPA 6 ANTES DEL REARMADO (to-do 162, ok de Guido). Un lote que se corta (lote 14: se reinició la terminal) deja
  // documentos con la etapa 4 hecha (.validacion.json) y la 6 sin hacer (sin .verificacion.json). paginasARearmar() decide con los "no
  // confirmados" de la etapa 4 y, sin verificación, rearma; pero esos números casi siempre son falsos (medido en los lotes 14 y 19: 193 de
  // 193 en páginas que validó la etapa 2) y el rearmado con el texto propio puede EMPEORAR la página. Caso: AC Milan 2022-23, pág. 84,
  // "42 | 2.456" bien en el .md y partido en el texto propio. La etapa 6 es gratis: corre primero, también en el ensayo (como la validación
  // del inventario de arriba), y el rearmado decide con ella.
  if (!resolverEnsayo && e.md && !e.cargado && leerDerivado(e, '.validacion.json') && leerDerivado(e, '.filas.json') && !leerDerivado(e, '.verificacion.json')) {
    const [[, VR]] = verificarLista([pdf], { registro, sitio });
    console.log(`  ${pdf}: tenía la etapa 4 sin la 6 (un lote cortado): etapa 6 primero, gratis -> ${VR?.estado || VR?.error || '?'}`);
  }
  const TP = resolverEnsayo ? null : paginasARearmar(pdf, e.md, e); const pagsTP = TP?.paginas; // en el ensayo, el 1a va primero
  if (pagsTP) {
    if (!(REINTENTAR && API)) { aTextoPropio.push({ pdf, paginas: pagsTP }); console.log(`  ${pdf}: ${TP.metodo === 'regiones' ? 'rearmada con el texto propio (columnas) y sigue sin cerrar' : 'la transcripción no coincide con el texto propio del PDF'} (págs. ${pagsTP.join(', ')}): rearmar (método ${TP.metodo}, --reintentar, gratis) + localizar ~US$ 0,05 + extraer ${estimarExtraerSinBloques(pdf).texto}${frenaria(pdf)}`); if (!EJECUTAR) usd += 0.05 + estimarExtraerSinBloques(pdf).usd; continue; }
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
  const L = await localizar(pdf, { registro, perimetroClub, ejecutar: API, rehacer: REHACER || !!reintento || cacheViejo, ampliado: !!reintento, reintento, notasComoEstado: enModoNotas });
  // MODO BATCH (tools/lote-batch.mjs, Batch API): la respuesta de localizar llega en la ola siguiente; el documento se corta acá.
  if (L.pendiente) { estado[pdf] = 'esperando la Batch API (localizar)'; console.log(`  ${pdf}: localizar pendiente de la Batch API`); continue; }
  if (!L.ensayo && !L.error && reintento && reintento.some((x) => x.categoria)) { try { writeFileSync(resolve(ROOT, derivado(e.md, '.reintento-categorias.json')), JSON.stringify({ fecha: new Date().toISOString(), categorias: reintento.filter((x) => x.categoria).map((x) => x.categoria), modoNotas: enModoNotas }, null, 1)); } catch { /* sin marca: como antes */ } }
  // COMPUERTA: un reintento que da "sin estado" cuando la localización anterior sí tenía estado NO la pisa (sin estado nunca se
  // puede cargar): el intento queda en <doc>.ubicacion-reintento.json y vuelve la anterior.
  if (!L.ensayo && !L.error && reintento && L.datos?.sin_estado && ubAntes && !ubAntes.sin_estado && (ubAntes.estado || []).length) {
    writeFileSync(resolve(ROOT, derivado(e.md, '.ubicacion-reintento.json')), JSON.stringify(L.datos, null, 1));
    writeFileSync(resolve(ROOT, derivado(e.md, '.ubicacion.json')), JSON.stringify(ubAntes, null, 1));
    usd += L.costo || 0; estado[pdf] = 'reintento sin estado: queda la localización anterior'; console.log(`  ${pdf}: el reintento no encontró estado; queda la localización anterior (el intento, en .ubicacion-reintento.json)`);
    continue;
  }
  if (L.ensayo) { frenaSinApi(pdf, 'localizar', L.usd); cotizados.add(pdf); const EX = estimarExtraerSinBloques(pdf); usd += L.usd + EX.usd; console.log(`  ${pdf}: ${enModoNotas ? 'reintento con las notas como estado: ' : ''}localizar ~US$ ${L.usd.toFixed(3)} + extraer ${EX.texto}${frenaria(pdf)}`); continue; }
  if (L.error) { estado[pdf] = `localizar: ${L.error}`; continue; }
  usd += L.costo;
  if (L.datos.sin_estado) {
    // ETAPA 2, ESCALÓN 1 (Versión 343, escalera aprobada por Guido): "no hay estado de resultados" puede ser culpa de la TRANSCRIPCIÓN. Caso
    // real, UC 2015: PDF híbrido, las páginas 4-9 (los estados) son imágenes; la transcripción vieja salió del texto propio del PDF y no las
    // tiene. Si la transcripción no la hizo Mistral y el PDF tiene páginas interiores casi sin texto, se marca para re-transcribir con Mistral
    // (que lee las imágenes); con --reintentar se hace y se vuelve a localizar. Si no, queda como fuente (como siempre).
    const enImagen = paginasEnImagen(pdf);
    const candidato = !String(e.motor || '').includes('mistral') && enImagen.length >= 2;
    if (candidato && REINTENTAR && API && !e.retranscritoPorLote) {
      // La transcripción vieja se MUEVE a Generados/ (mistral-ocr-transcribe.mjs no pisa un .md existente: "Ya existe el .md -- no lo piso",
      // UC 2015 en la primera corrida). Si Mistral falla, se restaura.
      const mdAbs = resolve(ROOT, e.md); const previo = resolve(ROOT, derivado(e.md, `.previo-${new Date().toISOString().slice(0, 10)}.md`));
      copyFileSync(mdAbs, previo); unlinkSync(mdAbs);
      console.log(`  ${pdf}: re-transcribiendo con Mistral (páginas en imagen: ${enImagen.join(', ')})...`);
      const r = node('tools/mistral-ocr-transcribe.mjs', [pdf]);
      if (r.status !== 0 || !existsSync(mdAbs)) { if (!existsSync(mdAbs)) copyFileSync(previo, mdAbs); estado[pdf] = 'escalón 1 de la etapa 2: Mistral falló (se restauró la transcripción anterior)'; continue; }
      node('tools/inventario-transcripciones.mjs', ['--solo', LISTA], { silencioso: true }); registro = leerRegistro(); // --solo: solo la lista del lote
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
    // (to-do 323 a, ok de Guido 2026-10-19) el costo que se imprime por documento (Mistral + localizar y extraer) también entra en el total del ensayo: antes el total daba
    // "~US$ 0,00" aunque cada línea decía ~0,13 + 0,15 (Fulham 2021-22: 29 páginas en imagen).
    const costoMistral = candidato && REINTENTAR && !EJECUTAR ? 0.004 * Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0) : 0;
    if (costoMistral) usd += costoMistral + 0.15;
    console.log(`  ${pdf}: ${estado[pdf]}${costoMistral ? ` · Mistral ~US$ ${costoMistral.toFixed(2)} + localizar y extraer ~US$ 0,15` : ''}`);
    continue;
  }
  // En el ensayo, validar y extraer TAMBIÉN van en ensayo (hasta la Versión 326 iban con ejecutar: true fijo: con localizar ya hecho, el
  // ensayo llamaba a extraer de verdad y gastaba). validar en un PDF digital es gratis y corre igual; en un escaneo estima.
  // (to-do 237 ai y ak) Las filas se rehacen si son de otra localización (relocalizar cambió columna, bloques o escala) y la validación si es
  // de otra versión del .md (una cifra corregida a mano). Un año cargado no se toca. Lo mismo deciden cargar.mjs (validación) y extraer (huella).
  const ubVieja = !cargado && !REHACER && !reintento && !cacheViejo && !ubicacionAlDia(e.md);
  const valVieja = !cargado && !REHACER && !reintento && !cacheViejo && !validacionAlDia(e.md);
  if (ubVieja) console.log(`  ${pdf}: las filas son de otra localización: se rehacen validar y extraer`);
  else if (valVieja) console.log(`  ${pdf}: la validación es de otra versión del .md: se rehace validar (no localizar ni extraer)`);
  const rehacerVal = REHACER || !!reintento || cacheViejo || ubVieja || valVieja;
  let V = await validar(pdf, { registro, ejecutar: API, rehacer: rehacerVal });
  // (to-do 339, frenado de Bath) --sin-api no validaba nunca, ni siquiera un PDF digital (gratis), y el documento frenaba más adelante con «faltan las categorías». Ahora: la validación
  // gratis corre igual (no usa API) y la que llamaría a Gemini frena AHÍ, diciendo que falta validar-bloques y cuánto cuesta.
  if (SIN_API && EJECUTAR && V.ensayo) {
    if (!V.usd) V = await validar(pdf, { registro, ejecutar: true, rehacer: rehacerVal });
    else { estado[pdf] = `frena (--sin-api): falta validar-bloques (llamaría a la API, ~US$ ${Number(V.usd).toFixed(3)}): node tools/validar-bloques.mjs "${pdf}" --ejecutar`; console.log(`  ${pdf}: ${estado[pdf]}`); usd += V.usd; continue; }
  }
  usd += (API ? anotarValidar(pdf, V) : V.costo) || V.usd || 0;
  const X = await extraer(pdf, { registro, ejecutar: API, rehacer: REHACER || !!reintento || cacheViejo || ubVieja, reintento });
  if (X.ensayo) { frenaSinApi(pdf, 'extraer', X.usd); cotizados.add(pdf); usd += X.usd; console.log(`  ${pdf}: localizar ya hecho · extraer ~US$ ${X.usd.toFixed(3)} (estimado)${frenaria(pdf)}`); continue; }
  if (X.pendiente) { estado[pdf] = 'esperando la Batch API (extraer)'; console.log(`  ${pdf}: extraer pendiente de la Batch API`); continue; }
  usd += X.costo || 0;
  if (X.error) { estado[pdf] = `extraer: ${X.error}`; continue; }
  estado[pdf] = testigos.has(pdf) ? 'testigo (solo hasta extraer)' : 'extraído';
  console.log(`  ${pdf}: estado ${L.datos.estado.join(',')} · ${V.datos?.modo || '?'} · ${X.datos.filas.length} filas · US$ ${usd.toFixed(2)} acumulado`);
}
// Lo que falta fijar antes de localizar: un comando por club (perímetro) o por documento (cierre), sin repetir.
const imprimirAFijar = () => {
  if (!aFijar.length) return;
  console.log(`\nFALTA FIJAR ANTES DE LOCALIZAR (etapa 3; ${aFijar.length} documento(s) sin pagar hasta que esté fijado; gratis):`);
  for (const c of [...new Set(aFijar.map((x) => x.comando))]) console.log(`  ${c}`);
};
if (!API) imprimirAFijar();
avisoCorrecciones();
// (to-do 298 q, ok de Guido 2026-10-19) LA CATEGORIZACIÓN DEL ENSAYO cuenta solo los documentos que van a llegar a categorizar (quedaron
// "extraído" o el ensayo los cotiza para localizar o extraer; no testigos) y cuyo .categorias.json no está al día (huellas, tools/huellas.mjs: categoriasAlDia, la misma compuerta de
// cargar.mjs). Antes cobraba US$ 0,03 por cada documento de la lista: los ya en el sitio, los sin .md y los que frenan antes de localizar.
// Caso: lote 91, 26 años en el sitio y el resto ya categorizado, estimaba US$ 1,62.
const aCategorizar = docs.filter((d) => (cotizados.has(d) || String(estado[d] || '').startsWith('extraído')) && !testigos.has(d) && !(() => { const e = registro.find((x) => x.pdf === d); try { return e?.md && categoriasAlDia(resolve(ROOT, e.md)); } catch { return false; } })());
// Lo que cuesta cada documento en esta corrida (el ensayo estima; con --ejecutar, lo gastado): la diferencia del acumulado entre su inicio y el del siguiente.
const costoDe = (d) => { const i = docs.indexOf(d); return (i + 1 < docs.length ? inicioUsd[docs[i + 1]] : usd) - inicioUsd[d]; };
const costoDet = docsXhtml.reduce((a, d) => a + costoDe(d), 0);
if (!EJECUTAR) {
  const coma = (x) => x.toFixed(2).replace('.', ',');
  const total = `Correrlo cuesta ~US$ ${coma(usd + 0.03 * aCategorizar.length)} (localizar y extraer US$ ${coma(usd)} + categorización ~US$ 0,03 por documento en ${aCategorizar.length} de ${docs.length}: los demás ya están en el sitio, categorizados al día o frenan antes + páginas escaneadas ~US$ 0,003 cada una)`;
  if (!docsXhtml.length) { console.log(`\nEnsayo terminado, no se gastó nada. ${total}. Para correrlo: agregá --ejecutar.`); process.exit(0); }
  // Con deterministas en la lista, el total se parte en dos: lo que corre (los demás) y lo que se frena (los de motor xhtml-ixbrl). El freno de --ejecutar es del lote
  // entero (sale antes de escribir nada), así que «corre» es lo que costaría la lista sin ellos.
  const catDet = aCategorizar.filter((d) => DET.has(d)).length; const catResto = aCategorizar.length - catDet;
  const conCosto = (ds) => ds.filter((d) => costoDe(d) > 0 || aCategorizar.includes(d)).length;
  const resto = docs.filter((d) => !DET.has(d)); const usdResto = usd - costoDet;
  const corre = `corre ~US$ ${coma(usdResto + 0.03 * catResto)} (${resto.length} documentos no deterministas, ${conCosto(resto)} con costo: localizar y extraer US$ ${coma(usdResto)} + categorización en ${catResto})`;
  const frena = `${PAGA_XHTML ? 'va por IA con --pagar-ia-xhtml' : 'se frena'} ~US$ ${coma(costoDet + 0.03 * catDet)} (${docsXhtml.length} deterministas de motor xhtml-ixbrl, ${conCosto(docsXhtml)} con costo: localizar y extraer US$ ${coma(costoDet)} + categorización en ${catDet})`;
  console.log(`\nEnsayo terminado, no se gastó nada. ${total}.\n  Separado: ${corre} · ${frena}.`);
  console.log(PAGA_XHTML ? '  Para correrlo: agregá --ejecutar (con la misma --pagar-ia-xhtml).' : `  --ejecutar frena el lote ENTERO mientras la lista tenga deterministas: sacalos de la lista para correr el resto (US$ 0 en ellos), o pasá --pagar-ia-xhtml "<motivo>" para pagarlos igual.`);
  process.exit(0);
}

if (docsXhtml.length) { // costo de los deterministas (con --ejecutar, lo gastado)
  const costo = costoDet;
  console.log(`\nDETERMINISTAS (xhtml-ixbrl): ${docsXhtml.length} documentos, ${EJECUTAR ? 'gastado' : 'costo estimado en juego si van por IA'}: ~US$ ${costo.toFixed(2).replace('.', ',')}${EJECUTAR ? '' : ` (--ejecutar los frena salvo con --pagar-ia-xhtml "<motivo>")`}`);
  if (EJECUTAR && PAGAR_XHTML) appendFileSync(resolve(ROOT, 'Admin', 'registros', 'pagar-ia-xhtml.jsonl'), JSON.stringify({ ts: new Date().toISOString(), lista: LISTA, cierre: true, docs: docsXhtml.length, costoUsd: +costo.toFixed(4) }) + '\n');
}
console.log('\n=== 2/5 · Sumar y cruzar con lo impreso (etapa 6, gratis) ===');
// startsWith: el escalón 1 de la etapa 2 deja 'extraído (re-transcripto con Mistral)'; con la igualdad exacta ese documento no
// pasaba a verificar en la misma corrida (UC 2015, lote 06: re-transcripto y extraído, y la etapa 6 lo salteaba).
// verificarLista: repite la pasada si un documento tomó la escala del año vecino (la cadena de escala depende del orden).
for (const [pdf, r] of verificarLista(docs.filter((d) => String(estado[d]).startsWith('extraído')), { registro, sitio, escribirRubros: true })) {
  estado[pdf] = r.error ? `verificar: ${r.error}` : r.estado === 'ok' ? 'verificado' : `verificado con ${r.cola.length} caso(s) en la cola`;
  if (!r.error) for (const c of r.chequeos) console.log(`  ${pdf.split('/').slice(2).join('/')}: ${c.ok === true ? 'ok' : c.ok === false ? 'NO' : '-'} ${c.nombre}: ${c.detalle}`);
}

// (to-do 214, escalón 3 del primer año) los documentos que verificar dejó con el pedido a Claude pendiente: se pregunta y se vuelven a
// verificar, para que la respuesta confirme el año (o deje el caso con la cita) en esta misma corrida.
{
  const pend214 = docs.filter((d) => String(estado[d]).startsWith('verificado') && leerDerivado(registro.find((x) => x.pdf === d) || { md: d.replace(/\.pdf$/i, '.md') }, '.verificacion.json')?.primerAnio?.estado === 'pendiente');
  if (pend214.length) {
    console.log(`\n=== Etapa 6, primer año (escalón 3): ${pend214.length} documento(s) ===`);
    writeFileSync(resolve(ROOT, 'Admin', 'registros', '.lote-primer-anio.txt'), pend214.join('\n') + '\n');
    if (SIN_API) { for (const d of pend214) estado[d] = 'frena (--sin-api): el primer año llamaría a Claude (primer-anio-ia.mjs --exportar, que contesta la sesión, y --importar)'; console.log(`  --sin-api: ${pend214.length} documento(s) quedan para primer-anio-ia.mjs --exportar/--importar`); }
    else node('tools/primer-anio-ia.mjs', ['--lista', 'Admin/registros/.lote-primer-anio.txt', '--ejecutar']);
    if (!SIN_API) for (const [pdf, r] of verificarLista(pend214, { registro, sitio, escribirRubros: true })) {
      estado[pdf] = r.error ? `verificar: ${r.error}` : r.estado === 'ok' ? 'verificado' : `verificado con ${r.cola.length} caso(s) en la cola`;
      if (!r.error) for (const c of r.chequeos.filter((x) => x.nombre === 'primer año')) console.log(`  ${pdf.split('/').slice(2).join('/')}: ok primer año: ${c.detalle}`);
    }
  }
}

console.log('\n=== 3/5 · Categorizar las filas (etapa 7) ===');
let conRubros = docs.filter((d) => String(estado[d]).startsWith('verificado'));
// Jev y Claude necesitan el deporte de cada documento; el alta que lo calcula corre más arriba, antes de la primera lectura.
if (SIN_API) {
  // Sin API: solo siguen los documentos con Jev y las categorías al día (los dejó la sesión con --desde-sesion o ya estaban); el resto frena.
  const alDia = (d) => { const e = registro.find((x) => x.pdf === d); try { return !!e?.md && jevAlDia(resolve(ROOT, e.md)) && categoriasAlDia(resolve(ROOT, e.md)); } catch { return false; } };
  for (const d of conRubros.filter((x) => !alDia(x))) { estado[d] = 'frena (--sin-api): faltan las categorías (jev-categorizar.mjs y categorizar-claude.mjs con --desde-sesion <json>)'; console.log(`  ${d}: ${estado[d]}`); }
  conRubros = conRubros.filter(alDia);
}
if (conRubros.length) {
  writeFileSync(resolve(ROOT, 'Admin', 'registros', '.lote-lista-actual.txt'), conRubros.join('\n') + '\n');
  node('tools/inventario-transcripciones.mjs', ['--solo', LISTA], { silencioso: true }); registro = leerRegistro(); // --solo: solo la lista del lote
  if (!SIN_API) {
    node('tools/glosar-rubros.mjs', ['--listos', '--lista', 'Admin/registros/.lote-lista-actual.txt']);
    node('tools/jev-categorizar.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/registros/.lote-lista-actual.txt']);
    node('tools/categorizar-claude.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/registros/.lote-lista-actual.txt']);
  }
  console.log('\n=== 4/5 · Proponer la carga (etapa 8, todavía no escribe el sitio) ===');
  node('tools/cargar.mjs', ['--lista', 'Admin/registros/.lote-lista-actual.txt', '--desde-verificacion']);
}

console.log('\n=== Resumen: en qué quedó cada documento ===');
for (const pdf of docs) console.log(`  ${String(estado[pdf] || 'sin novedad en esta corrida').padEnd(42)} ${pdf}`);
const cola = pendientes().filter((c) => docs.includes(c.pdf));
// TROUBLESHOOTING: desgloses que siguen sin sumar DESPUÉS del reintento -> diagnóstico (¿índice o transcripción?).
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
const yaEnSitio = (e) => e.cargado || propuestaEnSitio(e);
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
avisoCorrecciones();
console.log(`\nGastado: US$ ${usd.toFixed(2).replace('.', ',')} en localizar y extraer (la categorización: node tools/gasto.mjs).${cola.length ? ` ${cola.length === 1 ? 'Quedó 1 pregunta' : `Quedaron ${cola.length} preguntas`} en la cola: no tenés que hacer nada, ${cola.length === 1 ? 'la contesta' : 'las contesta'} Claude.` : ''}`);

// RESULTADO (Versión 351, pedido de Guido: "que al final de la corrida diga 'Frenados X' 'Listo para cargar Y'"). Lee la última propuesta de
// carga (<doc>.carga.json) de CADA documento de la lista, no solo de los que pasaron por la etapa 8 en esta corrida (en un --reintentar la
// etapa 8 corre solo sobre los reintentados). "Ya en el sitio" va aparte: un año ya cargado frena por diseño (cargar.mjs no pisa un
// ejercicio), y contarlo como frenado escondería los frenados de verdad.
// La etapa de un documento frenado, para la tabla final: la MÁS TEMPRANA de sus frenos (lo que hay que destrabar primero). `registro`
// dice en el motivo qué etapa no cerró (6, o 4 si quedaron números sin confirmar). `club` solo no frena de verdad con --cargar (el alta la
// hace cargar-lote.mjs), por eso va después de las demás.
function etapaDeFrenos(frenos) {
  const de = (f) => {
    const e = String(f.etapa || ''); const m = String(f.motivo || '');
    if (e === 'registro') { const n = (m.match(/la etapa (\d)/) || [])[1]; return n ? `${n} ${n === '4' ? 'validar (números sin confirmar)' : n === '6' ? 'verificar (sumas)' : 'pipeline'}` : '6 verificar (sumas)'; }
    if (e === 'filas') return '6 verificar (casos en la cola)';
    if (['categorizacion', 'categoria-en-cola', 'perfil-en-cola'].includes(e)) return '7 categorizar (cola de categorías y perfil)';
    if (['tie-out', 'tie-out-resultado', 'reintento'].includes(e)) return '8 cargar: no cierra o pide reintento';
    if (e === 'club' || e === 'alta') return '8 alta del club nuevo';
    return `8 cargar: ${e || 'otro'}`;
  };
  return frenos.map(de).sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))[0] || '8 cargar: otro';
}
const resultado = { listo: [], frenado: [], yaCargado: [], sinPropuesta: [] };
for (const pdf of docs.filter((d) => !testigos.has(d))) {
  const e = registro.find((x) => x.pdf === pdf); const c = e?.md ? leerDerivado(e, '.carga.json') : null;
  // el club adelante del año: con varios clubes en un lote, "2021" solo no dice cuál (lote 14, 12 clubes italianos).
  const anio = `${pdf.split('/')[2] || ''} ${c?.year || (pdf.match(/(\d{4})(?!.*\d{4})/) || [])[1] || pdf}`.trim();
  // un año que ya está en el sitio va a "Ya en el sitio" aunque su última propuesta sea vieja (Novorizontino 2018-2021 y
  // 2024, Juventus 2012: propuestas de antes del alta del club decían "el club no existe en el sitio").
  if (e?.md && yaEnSitio(e)) resultado.yaCargado.push({ anio });
  else if (!c) resultado.sinPropuesta.push({ anio, motivo: estado[pdf] || 'sin propuesta de carga' });
  else if (!(c.frena || []).length) resultado.listo.push({ anio });
  else if ((c.frena || []).some((f) => f.etapa === 'año' && /ya tiene el ejercicio/.test(f.motivo))) resultado.yaCargado.push({ anio });
  // (to-do 159, ok de Guido) TODOS los motivos, uno por línea (antes solo c.frena[0]: Sampdoria 2021 frenaba por 4 y mostraba solo el
  // primero, y el del período quedaba escondido), y si cargar.mjs cortó el análisis en un freno (`cortadoEn`), el aviso de que después de
  // resolverlo pueden aparecer más (lote 15: las 5 altas escondían 64 preguntas de categoría, socios y gestión que todavía no se calculaban).
  else resultado.frenado.push({ anio, motivos: c.frena.map((f) => `[${f.etapa}] ${String(f.motivo).slice(0, 160)}`), cortadoEn: c.cortadoEn || null, etapaFreno: etapaDeFrenos(c.frena) });
}
const anios = (xs) => xs.map((x) => x.anio).sort().join(', ');
// (pedido de Guido, 2026-10-15) El título dice qué es: la propuesta de carga de la etapa 7, antes de escribir; lo escrito de verdad lo
// cuenta la etapa 8 y la tabla final "Dónde quedó cada PDF de la lista".
console.log('\n=== Propuesta de carga (etapa 8): qué se escribiría ===');
console.log(`Listo para cargar ${resultado.listo.length}${resultado.listo.length ? `   (${anios(resultado.listo)})` : ''}`);
console.log(`Frenados ${resultado.frenado.length}`);
for (const x of resultado.frenado.sort((a, b) => String(a.anio).localeCompare(String(b.anio)))) {
  const n = x.motivos.length;
  console.log(`   ${x.anio}: frena por ${n} motivo${n === 1 ? '' : 's'}${x.cortadoEn ? ` (el análisis se cortó en "${x.cortadoEn}": después de resolverlo pueden aparecer más)` : ''}`);
  for (const m of x.motivos) console.log(`      ${m}`);
}
if (resultado.yaCargado.length) console.log(`Ya en el sitio ${resultado.yaCargado.length}   (${anios(resultado.yaCargado)})`);
if (resultado.sinPropuesta.length) { console.log(`Sin propuesta de carga ${resultado.sinPropuesta.length}`); for (const x of resultado.sinPropuesta) console.log(`   ${x.anio}: ${x.motivo}`); }

// ETAPA 8 ESCRITA EN EL SITIO (Versión 642, ok de Guido el 2026-10-09): con --cargar, lo que quedó "listo para cargar" se escribe en el sitio con
// tools/cargar-lote.mjs (alta del club nuevo con su color, cargar.mjs --escribir con su auditoría, un commit por año; sin push). Sin
// --ejecutar es su ensayo. El candado del lote se suelta antes: cargar.mjs --escribir toma el suyo.
let escritos = 0;
if (CARGAR) {
  soltarCandado();
  // (to-do 298 u, ok de Guido 2026-10-18) antes de cargar, las listas de equipos que faltan para los años de la lista (gratis: Wikipedia),
  // para que la carga de un año nuevo encuentre su liga (alta-club.mjs, el club en UNA sola lista) y la compuerta de estadio y sponsor
  // tenga su página. Sin --ejecutar es el ensayo de listas-lote (no guarda nada). Lo que guarda queda en tools/club-league-reference/.
  const rl = spawnSync('node', [resolve(ROOT, 'tools/listas-lote.mjs'), '--lote', LISTA, ...(EJECUTAR ? [] : ['--ensayo'])], { cwd: ROOT, stdio: ['inherit', 'pipe', 'inherit'], encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  const resumenListas = String(rl.stdout || '').split('\n').filter((l) => /^listas-lote:|^ {2}NO:/.test(l));
  if (resumenListas.length) console.log(`\nListas de equipos para la liga de los años nuevos (tools/listas-lote.mjs --lote):\n${resumenListas.join('\n')}${EJECUTAR ? '\n(lo guardado en tools/club-league-reference/ se commitea aparte)' : ''}`);
  // La salida de cargar-lote.mjs se muestra igual que antes; se lee además para contar los años escritos en la tabla final.
  const r = spawnSync('node', [resolve(ROOT, 'tools/cargar-lote.mjs'), '--lista', LISTA, ...(EJECUTAR ? ['--escribir'] : [])], { cwd: ROOT, stdio: ['inherit', 'pipe', 'inherit'], encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.stdout) process.stdout.write(r.stdout);
  escritos = (String(r.stdout || '').match(/: escrito y commiteado/g) || []).length;
}

// TABLA FINAL "Dónde quedó cada PDF de la lista" (pedido de Guido, 2026-10-15; título del to-do 237 r): cada documento de la lista una sola vez, en la etapa más temprana donde frenó.
// Solo lee lo que ya se calculó arriba (la propuesta de carga de cada documento) y lo escrito por la etapa 8: no cambia nada.
{
  const filas = new Map(); const sumar = (k, n = 1) => filas.set(k, (filas.get(k) || 0) + n);
  sumar('3-5 sin propuesta de carga (localizar, validar, extraer)', resultado.sinPropuesta.length);
  for (const x of resultado.frenado) sumar(x.etapaFreno);
  const listosSinEscribir = Math.max(0, resultado.listo.length - escritos);
  if (CARGAR && EJECUTAR) { sumar('8 escrito en esta corrida', escritos); sumar('8 listo pero no se escribió (ver la etapa 8 arriba)', listosSinEscribir); }
  else sumar('8 listo para cargar (falta --cargar --ejecutar)', resultado.listo.length);
  sumar('ya estaba en el sitio', resultado.yaCargado.length);
  const orden = [...filas].filter(([, n]) => n > 0).sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true }));
  const ancho = Math.max(5, ...orden.map(([k]) => k.length));
  console.log('\n=== Dónde quedó cada PDF de la lista ===');
  console.log(`${'ETAPA'.padEnd(ancho)}   #`);
  for (const [k, n] of orden) console.log(`${k.padEnd(ancho)}  ${String(n).padStart(2)}`);
  console.log(`${'TOTAL'.padEnd(ancho)}  ${String(orden.reduce((s, [, n]) => s + n, 0)).padStart(2)}`);
}

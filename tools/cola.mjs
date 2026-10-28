#!/usr/bin/env node
// ============================================================================
// tools/cola.mjs — LA COLA DE REVISIÓN HUMANA del proceso nuevo: todo lo que una etapa no puede resolver sola va acá, con instrucciones para
// que Guido lo mire en el PDF o en la transcripción, y su respuesta se guarda y se REUSA. Gratis.
//
// POR QUÉ. Hasta acá, lo que no
// cerraba quedaba "frenado" y nadie lo miraba hasta que una sesión lo encontraba. Los que hacen esto a escala (Moody's CreditLens, nCino,
// Ocrolus) tienen la revisión humana como una ETAPA NORMAL, ruteada por confianza, y las correcciones vuelven al sistema. Guido lo pidió así:
// "vos me podés decir 'revisar tal cosa en el PDF y tal otra en el md' y yo abro el PDF por mi cuenta o la transcripción".
//
// EL ARCHIVO: Admin/registros/cola-revision.jsonl (trackeado en git: son decisiones de Guido, conocimiento del proyecto). Solo se le AGREGAN líneas:
//   {tipo:'caso', id, ts, pdf, md, etapa, motivo, que, pagina, lineas:[desde,hasta], propuesta, clave}   (pagina = la del visor; al mostrarla
//                                                                                                     se agrega el número impreso, ver LAS DOS PÁGINAS)
//   {tipo:'respuesta', id, ts, decision, valor, nota}
// Al leer, la última respuesta de cada caso gana. Un caso con la misma `clave` (pdf | etapa | motivo | detalle) no se agrega dos veces.
//
// (decision 'obsoleto' la escribe sola una etapa cuando su última corrida ya no levanta el caso: ver cerrarObsoletos; y este mismo
// comando, al listar, para los casos de años que ya están cargados en el sitio: ver cerrarCargados)
// QUÉ PUEDE CONTESTAR GUIDO (decision):
//   aceptar          la propuesta del sistema está bien (o el número del .md está bien): se usa
//   corregir         el valor correcto es `--valor` (un importe, una categoría, un perímetro...): se usa ese
//   descartar        el documento (o esa fila) no se carga
//                    (en un caso de categoría NO se acepta: ver --responder; para sacar la fila, corregir --valor no_es_rubro)
//   preguntar-club   no se puede saber del documento: queda anotado acá; una sesión lo pasa a Admin/dudas-por-club.md (outreach)
// Las tools que mandaron el caso leen la respuesta con `respuestaDe(clave)` y la aplican la próxima vez que corren (verificar.mjs ya lo
// hace). QUE UNA RESPUESTA SE VUELVA REGLA: una categoría ya se vuelve precedente del club sola (cargar.mjs la copia a
// Admin/registros/categorias-aprendidas.jsonl); una convención de un grupo de países (tools/grupos-pais.mjs) la pasa a regla una sesión.
//
// USO:
//   node tools/cola.mjs                                  los pendientes por documento, con qué abrir y qué mirar
//   node tools/cola.mjs --todas                          también los respondidos
//   node tools/cola.mjs --lista Admin/lotes/lote-NN.txt  solo los de ese lote; también --dir "Clubes/<País>/<Club>" y --tipo gestion|categoria
//   node tools/cola.mjs --responder <id> aceptar|corregir|preguntar-club [--valor "1.234.567"] [--nota "…"] --evidencia "ruta.md:12-30"|ninguna --seguridad alta|media|baja --causa lectura-del-documento|regla-escrita|otra|…
//   node tools/cola.mjs --ids a,b,c aceptar|corregir|… [--valor …] [--nota …] --evidencia … --seguridad … --causa …   la MISMA respuesta a varios casos (todo o nada: valida los ids y las tres opciones antes de guardar; cada caso pasa por sus compuertas de --responder)
//     (las tres últimas son obligatorias, sin ellas no se guarda; --evidencia es de un .md del club, «ninguna» si la fuente es una web u otro archivo; todas las causas: cola-respuesta.mjs)
//   node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta>" <categoría> --nota "..."   (fija la categoría de una fila, ver abajo)
//   node tools/cola.mjs --historial <texto> [motivo]     la historia de un club: cada caso y cada respuesta, en orden
//   import { agregarCaso, respuestaDe, pendientes } from './cola.mjs';
// ============================================================================

import { readFileSync, appendFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { derivado } from './rutas.mjs';
import { lineaDeRespuesta, CAUSAS } from './cola-respuesta.mjs';
import { negarSiSeMide } from './candado-medicion.mjs';
import { rarezasEnRango, describir } from './rarezas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
// COLA_ARCHIVO (variable de entorno) apunta a otro archivo: para probar las tools sin ensuciar la cola real.
export const ARCHIVO = process.env.COLA_ARCHIVO || resolve(ROOT, 'Admin', 'registros', 'cola-revision.jsonl');
const DECISIONES = ['aceptar', 'corregir', 'descartar', 'preguntar-club'];

// RESPUESTAS Y ESTADOS. `resp` tiene SOLO las respuestas de Guido (DECISIONES: aceptar, corregir, descartar,
// preguntar-club); la última gana. 'obsoleto' (la etapa ya no levanta el caso) y 'reabierto' (la etapa lo volvió a levantar) son ESTADOS, no
// respuestas: van a `cerrado` (true si el último de los dos es 'obsoleto'). Antes 'obsoleto' se guardaba como una respuesta
// más, y un caso cerrado que volvía a aparecer quedaba "contestado" sin que nadie lo contestara: cargar.mjs frenaba por un caso que la cola
// no mostraba (UC 2013, "Otras ganancias (pérdidas)", ni siquiera buscaba la respuesta de 2014), y verificar.mjs lo daba por respondido y no
// lo mandaba a la cola (un "no cierra" o un "año vecino distinto" pasaba sin que nadie lo viera).
// UNA LECTURA POR PROCESO: leer() se llama en cada respuestaDe/casoYRespuesta (miles de veces en un verificar --lista) y
// releía y parseaba el archivo entero cada vez: 14 de los 36 s de `verificar.mjs --lista` sobre 237 documentos. Ahora guarda lo leído y
// vuelve a leer solo si el archivo cambió (tamaño o fecha de modificación): una escritura de esta misma corrida (agregarCaso, responder)
// lo cambia y la consulta siguiente la ve. Lo devuelto no se modifica en ningún llamador.
// ¿Sacar la fila de este caso de categoría (no_es_rubro), junto con las otras no_es_rubro ya contestadas del documento, deja
// sin filas al renglón que su nota abría? Devuelve { padre, hermanas, lado } o null. Lee las líneas del .verificacion.json del documento.
const normFila = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\(\s*[\d.,]+\s*\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
function padreSinFilas(caso, { casos, resp }) {
  const md = caso.md || caso.pdf.replace(/\.pdf$/i, '.md');
  let L; try { L = JSON.parse(readFileSync(resolve(ROOT, derivado(md, '.verificacion.json', { crear: false })), 'utf8')).lineas || []; } catch { return null; }
  const padreDe = (x) => { const q = [...String(x.origen || '').matchAll(/(?:nota que desglosa|desglose de) "([^"]+)"/g)]; return q.length ? q[q.length - 1][1] : null; };
  const sacadas = new Set([normFila(String(caso.detalle).split('|')[0])]);
  for (const c of casos.values()) { const r = resp.get(c.id); if (c.pdf === caso.pdf && c.motivo === 'categoria' && r?.decision === 'corregir' && r.valor === 'no_es_rubro') sacadas.add(normFila(String(c.detalle).split('|')[0])); }
  const l = L.find((x) => normFila(x.etiqueta) === normFila(String(caso.detalle).split('|')[0]));
  const padre = l && padreDe(l); if (!padre) return null;
  const hermanas = L.filter((x) => padreDe(x) === padre);
  return hermanas.some((x) => !sacadas.has(normFila(x.etiqueta))) ? null : { padre, hermanas: hermanas.length, lado: l.lado === 'gasto' ? 'gasto' : 'ingreso' };
}

let cacheLeer = null;
function leer() {
  let firma = null; try { const st = statSync(ARCHIVO); firma = `${st.size}|${st.mtimeMs}`; } catch { /* no existe */ }
  if (cacheLeer && cacheLeer.firma === firma) return cacheLeer.datos;
  const datos = leerArchivo(); cacheLeer = { firma, datos }; return datos;
}
function leerArchivo() {
  const casos = new Map(); const resp = new Map(); const cerrado = new Map();
  if (!existsSync(ARCHIVO)) return { casos, resp, cerrado };
  for (const l of readFileSync(ARCHIVO, 'utf8').split('\n')) {
    if (!l.trim()) continue; let x; try { x = JSON.parse(l); } catch { continue; }
    if (x.tipo === 'caso') casos.set(x.id, x);
    else if (x.tipo === 'respuesta' && DECISIONES.includes(x.decision)) resp.set(x.id, x);
    else if (x.tipo === 'respuesta' && (x.decision === 'obsoleto' || x.decision === 'reabierto')) cerrado.set(x.id, x.decision === 'obsoleto');
  }
  return { casos, resp, cerrado };
}
const pendiente = (c, { resp, cerrado }) => !resp.has(c.id) && !cerrado.get(c.id);

// Agrega un caso (si su clave ya existe, devuelve el id existente sin duplicar). `caso`: { pdf, md, etapa, motivo, que, pagina, lineas,
// propuesta, detalle }. `que` es la frase que lee Guido: qué mirar y por qué (ej. "Mistral leyó 1.284.567 y Gemini 1.234.567 en
// 'Cuotas sociales'; la tabla suma con 1.234.567").
// LA MISMA PREGUNTA CON OTRO TEXTO. En las dudas de localizar y extraer el `detalle` (y por eso el id) sale del texto que redacta la IA: la misma
// pregunta, reformulada en otra corrida, nacía como un caso nuevo y volvía a la cola aunque ya estuviera contestada. La clave estable es lo que no
// depende de la redacción: documento, etapa, motivo, las etiquetas entre comillas de la pregunta y los bloques (bNN) que nombra. Sin etiqueta citada no hay
// clave (la pregunta sigue como siempre). Medido sobre el registro: con etiquetas y bloques, 34 de 37 grupos con respuesta real coinciden (los otros 3 son una respuesta
// corregida después: vale la última).
const normClave = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
export function claveEstable(caso) {
  if (caso.etapa !== 'verificar' || !/^duda-de-(localizar|extraer)$/.test(caso.motivo || '') || !caso.que) return null;
  const q = String(caso.que).split('(por qué')[0];
  const etiquetas = [...new Set([...q.matchAll(/'([^']{3,80})'|«([^»]{3,80})»|"([^"]{3,80})"/g)].map((m) => normClave(m[1] || m[2] || m[3])))].sort();
  if (!etiquetas.length) return null;
  const bloques = [...new Set([...q.matchAll(/\bb(\d{1,4})\b/g)].map((m) => `b${m[1]}`))].sort();
  return `${caso.pdf}|${caso.etapa}|${caso.motivo}|${etiquetas.join('+')}|${bloques.join(',')}`;
}
export function agregarCaso(caso) {
  const clave = `${caso.pdf}|${caso.etapa}|${caso.motivo}|${caso.detalle || ''}`;
  const id = createHash('sha1').update(clave).digest('hex').slice(0, 7);
  const { casos, resp, cerrado } = leer();
  const estable = claveEstable(caso);
  if (estable && !casos.has(id)) {
    // si una pregunta con la misma clave estable ya tiene respuesta real, la nueva nace contestada igual (con la última respuesta), y dice de dónde salió
    let previa = null;
    for (const c of casos.values()) if (c.claveEstable === estable && resp.has(c.id) && (!previa || resp.get(c.id).ts > resp.get(previa.id).ts)) previa = c;
    if (!previa) for (const c of casos.values()) if (!c.claveEstable && resp.has(c.id) && claveEstable(c) === estable && (!previa || resp.get(c.id).ts > resp.get(previa.id).ts)) previa = c;
    if (previa) {
      const r = resp.get(previa.id);
      appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'caso', id, ts: new Date().toISOString(), clave, claveEstable: estable, ...caso }) + '\n');
      appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id, ts: new Date().toISOString(), decision: r.decision, valor: r.valor ?? null, nota: `misma pregunta que ${previa.id} (otra redacción): ${r.nota || ''}`.trim() }) + '\n');
      return id;
    }
  }
  if (casos.has(id)) {
    // Un caso cerrado como obsoleto que la etapa vuelve a levantar se REABRE: vuelve a la cola, no queda escondido.
    if (cerrado.get(id) && !resp.has(id)) appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id, ts: new Date().toISOString(), decision: 'reabierto', nota: 'la etapa volvió a levantar este caso' }) + '\n');
    return id;
  }
  const extra = [aclaracionDeSigno(caso), historialParecidos(caso, { casos, resp })].filter(Boolean).join('  ');
  appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'caso', id, ts: new Date().toISOString(), clave, ...(estable ? { claveEstable: estable } : {}), ...caso, ...(extra ? { que: `${caso.que}  ${extra}` } : {}) }) + '\n');
  return id;
}
// EL SIGNO CON ACLARACIÓN (407): si la línea que cita una duda de signo (o 3 arriba y abajo) trae la aclaración del rótulo —«(- = Steuerertrag)», «(+/-)»— se copia a la pregunta. Solo informa.
const ACLARACION_RE = /\(\s*[-−–+]\s*\)?\s*=\s*[^)\n]{2,60}\)?/;
export function aclaracionDeSigno(caso) {
  if (caso.etapa !== 'verificar' || caso.motivo !== 'duda-de-extraer' || !/signo|negativ|positiv|paréntesis|restar/i.test(caso.que || '') || !caso.md) return null;
  const m = String(caso.que).match(/\bL(\d{2,5})\b/); if (!m) return null;
  try {
    const L = readFileSync(resolve(ROOT, caso.md), 'utf8').split('\n'); const i = Number(m[1]) - 1;
    for (let k = Math.max(0, i - 3); k <= Math.min(L.length - 1, i + 3); k++) { const a = L[k].match(ACLARACION_RE); if (a) return `Dato: la línea L${k + 1} trae la aclaración de signo «${a[0].trim()}».`; }
  } catch { /* sin .md */ }
  return null;
}
// EL HISTORIAL DE CASOS PARECIDOS (407): qué se les contestó a las dudas de verificar anteriores de la misma etapa, motivo y país («de 40 parecidas, 31 se aceptaron»). Solo informa; el país
// discrimina la tasa de «aceptar» (36 a 95 %) y con menos de 10 respuestas no se dice nada.
export function historialParecidos(caso, { casos, resp }) {
  if (caso.etapa !== 'verificar' || !/^duda-/.test(caso.motivo || '') || !caso.pdf) return null;
  const pais = String(caso.pdf).split('/')[1]; let n = 0, ac = 0, no = 0;
  for (const c of casos.values()) {
    if (c.etapa !== caso.etapa || c.motivo !== caso.motivo || String(c.pdf).split('/')[1] !== pais) continue;
    const r = resp.get(c.id); if (!r || (r.decision !== 'aceptar' && r.decision !== 'corregir')) continue;
    n++; if (r.decision === 'aceptar') ac++; else if (/^no/i.test(String(r.valor || ''))) no++;
  }
  return n >= 10 ? `Historial de casos parecidos (${caso.motivo}, ${pais}): ${n} respondidos, ${ac} aceptados (${Math.round((100 * ac) / n)}%), ${no} corregidos a «no».` : null;
}
export function respuestaDe(pdf, etapa, motivo, detalle = '') {
  const id = createHash('sha1').update(`${pdf}|${etapa}|${motivo}|${detalle}`).digest('hex').slice(0, 7);
  return leer().resp.get(id) || null;
}
// LAS DOS PÁGINAS. `pagina` en un caso es la de la marca "--- pág. N ---" del .md, que es la
// página del PDF COMO LA CUENTA EL VISOR. El número impreso al pie de la hoja casi nunca coincide: la portada no se numera, y en Bahia 2021
// el estado de resultados está en la página 8 del visor con un "7" impreso (en el documento de 2022, página 7 del visor e impreso "6").
// Guido abrió la hoja con el "6" impreso buscando "pág. 8" y no lo encontró. Ahora la cola dice las dos. El número impreso se busca en el
// último renglón no vacío de esa página en el .md (las transcripciones con pdftotext -layout lo traen) y, si no está, en el texto propio del
// PDF (pdftotext -f N -l N). Solo se acepta un número suelto de 1-4 dígitos (o "- 7 -", "Página 7", "7 / 48"); si no hay, se dice que no
// se encontró, nunca se adivina.
const NUM_PIE_RE = /^(?:p[áa]g(?:ina)?\.?\s*|page\s*|seite\s*|-\s*)?(\d{1,4})(?:\s*-|\s*(?:\/|de|of|von)\s*\d{1,4})?$/i;
function numeroImpreso(c) {
  const desdeTexto = (txt) => { const ls = String(txt).split('\n').map((l) => l.trim()).filter(Boolean); const m = ls.length ? ls[ls.length - 1].match(NUM_PIE_RE) : null; return m ? m[1] : null; };
  try {
    if (c.md && existsSync(resolve(ROOT, c.md))) {
      const L = readFileSync(resolve(ROOT, c.md), 'utf8').split('\n'); const re = /^---\s*pág\.\s*(\d+)\s*---/i;
      const i = L.findIndex((l) => (l.match(re) || [])[1] === String(c.pagina));
      if (i >= 0) { let j = i + 1; while (j < L.length && !re.test(L[j])) j++; const n = desdeTexto(L.slice(i + 1, j).join('\n')); if (n) return n; }
    }
    if (c.pdf && existsSync(resolve(ROOT, c.pdf))) {
      const r = spawnSync('pdftotext', ['-layout', '-f', String(c.pagina), '-l', String(c.pagina), resolve(ROOT, c.pdf), '-'], { encoding: 'utf8' });
      if (r.status === 0) return desdeTexto(r.stdout);
    }
  } catch { /* sin número impreso */ }
  return null;
}
export function textoPagina(c) {
  const n = numeroImpreso(c);
  return `Abrí el PDF en la página ${c.pagina} del visor (${n ? `la hoja tiene impreso "${n}" al pie` : 'no encontré número impreso al pie'}).`;
}

// El caso y su respuesta (la última), por la misma clave que agregarCaso: lo usa la etapa que necesita lo que el caso PROPONÍA (cargar.mjs:
// la categoría propuesta de una fila, para aplicarla si Guido contestó "aceptar").
export function casoYRespuesta(pdf, etapa, motivo, detalle = '') {
  const id = createHash('sha1').update(`${pdf}|${etapa}|${motivo}|${detalle}`).digest('hex').slice(0, 7);
  const { casos, resp } = leer();
  return { caso: casos.get(id) || null, resp: resp.get(id) || null };
}

// La respuesta a una duda POR TEMA de un club: busca en TODOS los documentos un caso con ese motivo y ese detalle
// ("club|tema|renglón") que Guido ya contestó. Así una duda contestada para un año del club vale para todos sus años, aunque la IA la redacte
// distinto (pasó tres veces con "¿se usa el cuadro por segmento para abrir 'Ingresos Comerciales'?" de UC 2018-2025).
// El filtro recibe el caso y su respuesta (cargar.mjs mira si la respuesta es un `aceptar`).
export function respuestaPorDetalle(etapa, motivo, detalle, filtro = () => true) {
  const { casos, resp } = leer(); let mejor = null;
  for (const c of casos.values()) if (c.etapa === etapa && c.motivo === motivo && c.detalle === detalle && resp.has(c.id) && filtro(c, resp.get(c.id))) { const r = resp.get(c.id); if (!mejor || r.ts > mejor.resp.ts) mejor = { caso: c, resp: r }; }
  return mejor;
}

// Todas las respuestas reales (aceptar, corregir, descartar, preguntar-club; nunca 'obsoleto') de una etapa y motivo cuyos casos cumplen el
// filtro, con su caso. La usa cargar.mjs para buscar respuestas de categoría por FAMILIA de etiqueta, no solo por el detalle exacto.
export function respuestasDonde(etapa, motivo, filtro = () => true) {
  const { casos, resp } = leer(); const out = [];
  for (const c of casos.values()) if (c.etapa === etapa && c.motivo === motivo && resp.has(c.id) && filtro(c)) out.push({ caso: c, resp: resp.get(c.id) });
  return out;
}

// ¿Tiene este documento alguna respuesta (de Guido o de un subagente) a un caso de la etapa `etapa` posterior a `desde` (ISO)?
// La usa lote.mjs para volver a verificar un documento cuya verificación guardada es anterior a las respuestas de su cola.
export function respuestaPosterior(pdf, etapa, desde) {
  const L = leer(); const t = Date.parse(desde || 0) || 0;
  for (const [id, r] of L.resp) { const c = L.casos.get(id); if (c && c.pdf === pdf && c.etapa === etapa && (Date.parse(r.ts || 0) || 0) > t) return true; }
  return false;
}
export function pendientes() { const L = leer(); return [...L.casos.values()].filter((c) => pendiente(c, L)); }
// OBSOLETOS. Un caso que la última corrida de su etapa YA NO levanta (la duda desapareció porque extraer se rehízo, la nota
// ahora cierra, el total ahora cuadra) se cierra solo con decision 'obsoleto', para que la cola muestre únicamente lo vigente. Lo llama la
// etapa al terminar un documento con las claves que levantó (respondidas o no). No toca casos ya respondidos por Guido.
export function cerrarObsoletos(pdf, etapa, clavesVigentes) {
  const { casos, resp, cerrado } = leer(); const vig = new Set(clavesVigentes); let n = 0;
  for (const c of casos.values()) {
    if (c.pdf !== pdf || c.etapa !== etapa || resp.has(c.id) || cerrado.get(c.id) || vig.has(c.clave)) continue;
    appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id: c.id, ts: new Date().toISOString(), decision: 'obsoleto', nota: 'la última corrida de la etapa ya no levanta este caso' }) + '\n'); n++;
  }
  return n;
}

// CASOS DE AÑOS YA CARGADOS. La cola mostraba casos que no esperaban nada: el año del documento
// ya estaba en el sitio (Juventus 2003, 2004, 2016, 2017, 2019 y 2020: 11 casos). Cerrarlos a mano no servía: 'descartar' quiere decir "este
// documento no se carga" y 'aceptar' se vuelve regla del club, y las dos tienen efecto en las corridas siguientes. Se cierran con el ESTADO
// 'obsoleto' (no es una respuesta: respuestaDe() y casoYRespuesta() no lo ven, así que ninguna tool cambia lo que hace), y si una etapa vuelve
// a levantar el caso, agregarCaso() lo reabre ('reabierto'). Un caso REABIERTO no se vuelve a cerrar acá: si una etapa lo levantó de nuevo es
// porque alguien está re-procesando ese año, y Guido tiene que verlo.
// QUÉ SE CIERRA: solo los casos de 'verificar' (deciden si un año se carga; si ya se cargó, no frenan nada) y los de 'cargar · perimetro' (si
// el año se cargó, el perímetro ya se decidió). NUNCA 'cargar · categoria' (puede ser una categoría dudosa de un dato ya publicado: contestarla
// puede cambiar lo que se ve) ni 'cargar · perfil' (es sobre el club, no sobre ese año, y sirve para los años que vienen).
// "AÑO CARGADO", igual que lote.mjs: el registro (`cargado` en Admin/registros/transcripciones-estado.jsonl) o, si el registro quedó
// viejo, el sitio: el club y el año de la última propuesta de carga del documento (`.carga.json`) están en su fiscalYearMeta.
const cierraSiCargado = (c) => c.etapa === 'verificar' || (c.etapa === 'cargar' && c.motivo === 'perimetro');
export async function cerrarCargados() {
  const L = leer(); const cand = [...L.casos.values()].filter((c) => pendiente(c, L) && cierraSiCargado(c) && !L.cerrado.has(c.id));
  if (!cand.length) return [];
  const reg = new Map();
  try { for (const l of readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').split('\n')) { if (!l.trim()) continue; const e = JSON.parse(l); reg.set(e.pdf, e); } } catch { /* sin registro: solo el sitio */ }
  let sitio = null; const cerrados = [];
  for (const c of cand) {
    const e = reg.get(c.pdf); let donde = e?.cargado ? 'según el registro' : null;
    if (!donde) {
      try {
        const md = c.md || e?.md; const p = md ? resolve(ROOT, derivado(md, '.carga.json', { crear: false })) : null;
        const k = p && existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
        if (k?.clubId && k?.year) { sitio ??= (await import('./datos-sitio.mjs')).loadSite(); if (sitio.generic?.[k.clubId]?.fiscalYearMeta?.[k.year]) donde = `${k.clubId} ${k.year}`; }
      } catch { /* sin propuesta de carga legible: no se cierra */ }
    }
    if (!donde) continue;
    appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id: c.id, ts: new Date().toISOString(), decision: 'obsoleto', nota: `el año ya está cargado en el sitio (${donde}); la pregunta no frena nada` }) + '\n');
    cerrados.push(c);
  }
  return cerrados;
}

// RESUELTO POR UNA RESPUESTA DEL CLUB. Una etapa aplicó a ESTE documento la respuesta que Guido dio en OTRO documento del
// mismo club (cargar.mjs, categoría por etiqueta: "Otras ganancias (pérdidas)" de UC contestada en 2014). Si este documento tiene su propio
// caso pendiente con la misma clave, ya no hace falta: se cierra con decision 'obsoleto' y la nota dice qué respuesta lo resolvió. Solo toca
// un caso pendiente (nunca uno que Guido contestó) y solo el de esa clave exacta.
export function cerrarResueltoPorClub(pdf, etapa, motivo, detalle, casoOrigen) {
  const id = createHash('sha1').update(`${pdf}|${etapa}|${motivo}|${detalle}`).digest('hex').slice(0, 7);
  const { casos, resp, cerrado } = leer();
  if (!casos.has(id) || resp.has(id) || cerrado.get(id) || !casoOrigen || casoOrigen.id === id) return false;
  const anio = (String(casoOrigen.pdf).match(/(\d{4})(?!.*\d{4})/) || [])[1] || '?';
  appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id, ts: new Date().toISOString(), decision: 'obsoleto', nota: `resuelto por la respuesta ${casoOrigen.id} (${anio}), que vale para todo el club` }) + '\n');
  return true;
}

// PERFIL YA SABIDO: cuando el perfil de un club se decide sin una respuesta de la cola (por la forma jurídica, con su cita), los
// casos de perfil pendientes de ese club y campo se cierran con decision 'obsoleto' y la nota dice de dónde salió. Solo casos pendientes.
export function cerrarPerfilSabido(detalle, nota) {
  const { casos, resp, cerrado } = leer(); let n = 0;
  for (const c of casos.values()) {
    if (c.motivo !== 'perfil' || c.detalle !== detalle || resp.has(c.id) || cerrado.get(c.id)) continue;
    appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id: c.id, ts: new Date().toISOString(), decision: 'obsoleto', nota }) + '\n'); n++;
  }
  return n;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (A.includes('--historial')) process.exit(spawnSync('node', [resolve(ROOT, 'tools/cola-historial.mjs'), 'club', flag('--historial') || '', ...A.slice(A.indexOf('--historial') + 2, A.indexOf('--historial') + 3)], { stdio: 'inherit' }).status ?? 1); // la historia de un club la imprime cola-historial.mjs
  negarSiSeMide('cola.mjs', { si: A.includes('--responder') || A.includes('--corregir-categoria') }); // escriben la cola: no mientras medir pipeline mide
  // --corregir-categoria: fija la categoría de UNA fila de un documento (cola-corregir-categoria.mjs)
  if (A.includes('--corregir-categoria')) { const { corregirCategoria } = await import('./cola-corregir-categoria.mjs'); await corregirCategoria({ A, flag, ARCHIVO, agregarCaso }); process.exit(0); }
  // --ids a,b,c <decisión> …: la misma respuesta (nota, evidencia, seguridad y causa) a VARIOS casos, uno por uno con --responder (cada uno con sus propias compuertas). Todo o nada: se valida ANTES de escribir
  // que cada id exista y que las tres opciones estén; con una sola que falle no se guarda ninguna. (Contestar 14 casos de Nacional eran 14 comandos con las mismas tres opciones.)
  if (A.includes('--ids')) {
    const lista = String(flag('--ids') || '').split(',').map((x) => x.trim()).filter(Boolean); const decision = A[A.indexOf('--ids') + 2];
    const { casos } = leer(); const faltan = lista.filter((x) => !casos.has(x));
    if (!lista.length) { console.error('--ids pide los ids separados por coma: --ids a,b,c aceptar --nota "…" --evidencia … --seguridad … --causa …'); process.exit(1); }
    if (faltan.length) { console.error(`No hay ningún caso ${faltan.join(', ')} (node tools/cola.mjs para verlos). No se guardó ninguna respuesta.`); process.exit(1); }
    if (!DECISIONES.includes(decision)) { console.error(`La decisión tiene que ser una de: ${DECISIONES.join(', ')}`); process.exit(1); }
    const prueba = lineaDeRespuesta({ id: lista[0], decision, valor: flag('--valor'), nota: flag('--nota'), evidencia: flag('--evidencia'), seguridad: flag('--seguridad'), causa: flag('--causa'), precedentes: flag('--precedentes') });
    if (prueba.errores.length) { console.error(`No guardé ninguna respuesta: ${prueba.errores.join('; ')}. --causa: ${CAUSAS.join('|')}`); process.exit(1); }
    const opciones = ['--valor', '--nota', '--evidencia', '--seguridad', '--causa', '--precedentes'].flatMap((k) => (flag(k) != null ? [k, flag(k)] : [])).concat(A.includes('--igual') ? ['--igual'] : []);
    let mal = 0;
    for (const id of lista) {
      const r = spawnSync('node', [process.argv[1], '--responder', id, decision, ...opciones], { cwd: ROOT, encoding: 'utf8', env: process.env, maxBuffer: 1 << 26 });
      console.log(`${id}: ${r.status === 0 ? String(r.stdout).trim().split('\n')[0] : `NO se guardó: ${String(r.stderr || r.stdout).trim().split('\n')[0]}`}`); if (r.status !== 0) mal++;
    }
    console.log(`${lista.length - mal} de ${lista.length} respuesta(s) guardada(s).`); process.exit(mal ? 1 : 0);
  }
  if (A.includes('--responder')) {
    const id = flag('--responder'); const decision = A[A.indexOf('--responder') + 2];
    const { casos } = leer();
    if (!casos.has(id)) { console.error(`No hay ningún caso ${id} (node tools/cola.mjs para verlos).`); process.exit(1); }
    if (!DECISIONES.includes(decision)) { console.error(`La decisión tiene que ser una de: ${DECISIONES.join(', ')}`); process.exit(1); }
    if (decision === 'corregir' && !flag('--valor')) { console.error('Para corregir hace falta --valor "..."'); process.exit(1); }
    // `descartar` EN UN CASO DE CATEGORÍA: ahí parece "descarto la pregunta", pero cargar.mjs saca la FILA de la carga (Vila Nova
    // 2025 "Adesão ao condomínio LFU", corregido a tiempo; Novorizontino 2020/2021/2024, diez respuestas "obsoleto: año ya cargado" que sacaban
    // "Com pessoal" de 2022, 2023 y 2025). Sacar una fila es una decisión con nombre propio: corregir --valor no_es_rubro (cargar.mjs la
    // excluye). Un caso de categoría de un año ya cargado NO se cierra solo (cerrarCargados() no los toca: pueden tocar un dato publicado): se
    // contesta con la categoría con la que está publicado (aceptar si es la propuesta, corregir si no).
    if (decision === 'descartar' && casos.get(id).motivo === 'categoria') {
      console.error('En un caso de categoría, "descartar" sacaría la FILA de la carga (no la pregunta). Usá:\n  aceptar                              la categoría propuesta está bien\n  corregir --valor <categoría>         va en otra categoría\n  corregir --valor no_es_rubro         la fila no se carga (no es un renglón del estado, es un subtotal, etc.)\nSi el año ya está cargado: contestá con la categoría con la que está publicado (aceptar si es la propuesta, corregir si no).');
      process.exit(1);
    }
    // UN no_es_rubro QUE DEJA UN RENGLÓN SIN FILAS NO SE GUARDA (salvo --igual). Si la fila vino de una
    // nota que abre un renglón del estado (su origen en el .verificacion.json: "nota que desglosa X" o "desglose de X"; vale el padre más
    // cercano) y con esta respuesta y las otras no_es_rubro del documento a X no le queda ninguna fila, el renglón se pierde entero. Caso:
    // Narva Trans 2025, las dos filas "sh" (del cual) 42.848 + 109.938 eran todo "Riigi ja KOV toetused" 152.786 (.md L572, 579-580); la
    // propuesta frenó por 152.786 de menos y hubo que recategorizarlas. Medido sobre las 7 respuestas no_es_rubro de la cola: frena esas 2 y
    // ninguna otra. No cambia nada de lo que se carga: solo ataja la respuesta.
    if (decision === 'corregir' && flag('--valor') === 'no_es_rubro' && casos.get(id).motivo === 'categoria' && !A.includes('--igual')) {
      const sin = padreSinFilas(casos.get(id), leer());
      if (sin) {
        console.error(`No guardé la respuesta: con no_es_rubro, el renglón "${sin.padre}" se queda sin filas (sus ${sin.hermanas} fila(s) de la nota salen todas) y se pierde entero del ${sin.lado}.\nSi estas filas son el desglose del renglón, contestá con su categoría (corregir --valor <categoría>). Si de verdad no va ninguna, agregá --igual.`);
        process.exit(1);
      }
    }
    const respuesta = lineaDeRespuesta({ id, decision, valor: flag('--valor'), nota: flag('--nota'), evidencia: flag('--evidencia'), seguridad: flag('--seguridad'), causa: flag('--causa'), precedentes: flag('--precedentes') });
    if (respuesta.errores.length) { console.error(`No guardé la respuesta: ${respuesta.errores.join('; ')}. --causa: ${CAUSAS.join('|')}`); process.exit(1); }
    appendFileSync(ARCHIVO, JSON.stringify(respuesta.linea) + '\n');
    console.log(`Respuesta guardada para ${id}: ${decision}${flag('--valor') ? ` (${flag('--valor')})` : ''}. La toma la próxima corrida de la etapa que mandó el caso.`);
    // PERFIL: UNA RESPUESTA VALE PARA TODO EL CLUB. El perfil (socios, otros deportes) es del club, pero la respuesta llegaba
    // al perfil recién cuando cargar.mjs volvía a correr ESE documento, y los casos de los otros años seguían abiertos (Olympiacos: 10+10
    // contestados de a uno; OFI Crete: 5+5 pendientes). Al contestar `corregir --valor sí|no`, se guarda en el perfil en el momento (la misma
    // lectura de sí/no que cargar.mjs) y la compuerta cierra como `obsoleto` SOLO los otros casos pendientes con el mismo motivo y el mismo
    // detalle (`<clubId>:<campo>`), con cerrarResueltoPorClub(). Con el perfil ya sabido, cargar.mjs no los vuelve a levantar.
    // CATEGORÍA: UNA RESPUESTA CIERRA LOS OTROS AÑOS PENDIENTES DEL CLUB. Un lote levanta los
    // casos de todos los años antes de que nadie conteste (PAOK: 70 casos para 13 etiquetas), y la respuesta de otro documento del club ya la
    // toma cargar.mjs (respuestaCat, Versiones 344 y 403, con la compuerta de la MISMA NOTA). Al contestar uno, la compuerta cierra como
    // `obsoleto` solo los pendientes de la MISMA carpeta y el MISMO detalle (etiqueta, o etiqueta|lado). La nota no se mira acá: si en un año
    // la fila está en otra nota, cargar.mjs no aplica la respuesta, vuelve a levantar el caso y agregarCaso() lo reabre. Medido en la cola: de
    // 264 grupos club+etiqueta con 2+ respuestas, 260 dieron la misma categoría. `no_es_rubro` vale solo para su documento: no cierra otros.
    // Un `aceptar` cierra solo los casos con la MISMA categoriaPropuesta: aceptar la propuesta de un año no dice nada de otra
    // propuesta en otro año (cargar.mjs tampoco la aplica allá). `corregir` nombra la categoría y cierra todos, como antes.
    if (casos.get(id).etapa === 'cargar' && casos.get(id).motivo === 'categoria' && (decision === 'aceptar' || (decision === 'corregir' && flag('--valor') !== 'no_es_rubro'))) {
      const o = casos.get(id); const carpeta = o.pdf.split('/').slice(0, -1).join('/'); let n = 0;
      for (const c of casos.values()) if (c.id !== id && c.etapa === 'cargar' && c.motivo === 'categoria' && c.detalle === o.detalle && c.pdf.split('/').slice(0, -1).join('/') === carpeta && (decision !== 'aceptar' || c.categoriaPropuesta === o.categoriaPropuesta) && cerrarResueltoPorClub(c.pdf, c.etapa, c.motivo, c.detalle, o)) n++;
      if (n) console.log(`Cerré ${n} caso(s) de la misma etiqueta en otros años del club (cargar.mjs los reabre si en ese año la fila está en otra nota).`);
    }
    // GESTIÓN: «descartar» (la sociedad no tiene presidente persona, o ninguna fuente pública lo nombra) vale para todo el club. Un lote levanta el caso de cada año antes de
    // que nadie conteste (92 repeticiones medidas, todas descartar tras descartar, entre el 10 y el 20 de octubre; la regla de cargar.mjs solo mira respuestas ya dadas), así que al
    // contestar uno se cierran como `obsoleto` los otros pendientes del club. Un `aceptar` no: cada año se cubre con sus fechas.
    if (casos.get(id).etapa === 'cargar' && casos.get(id).motivo === 'gestion' && decision === 'descartar') {
      const club = String(casos.get(id).detalle).split(':')[0]; let n = 0;
      for (const c of casos.values()) if (c.id !== id && c.etapa === 'cargar' && c.motivo === 'gestion' && String(c.detalle).split(':')[0] === club && cerrarResueltoPorClub(c.pdf, c.etapa, c.motivo, c.detalle, casos.get(id))) n++;
      if (n) console.log(`Cerré ${n} caso(s) de gestión de otros años del mismo club (descartar vale para todo el club).`);
    }
    const c0 = casos.get(id); const v = decision === 'corregir' ? (/^s[ií]/i.test(flag('--valor')) ? true : /^no/i.test(flag('--valor')) ? false : undefined) : undefined;
    if (c0.motivo === 'perfil' && v !== undefined) {
      const [clubId, campo] = String(c0.detalle).split(':');
      // el chequeo lleva su año y vale para los años a menos de VENTANA_PERFIL; cierra solo las preguntas iguales de esa ventana,
      // y si contradice al chequeo más cercano abre la revisión de los años entre los dos (perfil-cambio).
      const { guardarPerfil, perfilCercano, anioDeDoc, VENTANA_PERFIL } = await import('./perfil-clubes.mjs');
      const anioCh = c0.anio ?? anioDeDoc(c0.pdf);
      const ant = anioCh ? perfilCercano(clubId, campo, anioCh, { excepto: anioCh }) : null;
      guardarPerfil(clubId, campo, v, `respuesta ${id} en la cola (${flag('--nota') || 'sin nota'})`, 'guido-cola', anioCh);
      if (ant && ant.valor !== v) agregarCaso({ pdf: c0.pdf, md: c0.md, etapa: 'cargar', motivo: 'perfil-cambio', detalle: `${clubId}:${campo}:${anioCh}`, anio: anioCh, que: `El perfil de ${clubId} cambió: ${campo === 'socios' ? 'socios' : 'otros deportes'} = ${ant.valor ? 'sí' : 'no'} en ${ant.anio} y ${v ? 'sí' : 'no'} en ${anioCh}. Revisar los años cargados entre los dos.`, propuesta: 'aceptar si esos años están bien; si no, corregir --valor "<año desde el que cambió>"' });
      let n = 0; for (const c of casos.values()) if (c.motivo === 'perfil' && c.detalle === c0.detalle && c.id !== id && (!anioCh || Math.abs((c.anio ?? anioDeDoc(c.pdf) ?? 0) - anioCh) < VENTANA_PERFIL) && cerrarResueltoPorClub(c.pdf, c.etapa, c.motivo, c.detalle, c0)) n++;
      console.log(`Perfil de ${clubId}: ${campo} = ${v ? 'sí' : 'no'} desde el chequeo de ${anioCh ?? '?'} (vale ±${VENTANA_PERFIL - 1} años; Admin/registros/perfil-clubes.jsonl).${n ? ` Cerré ${n} caso(s) iguales de esa ventana.` : ''}${ant && ant.valor !== v ? ` Contradice el chequeo de ${ant.anio}: abrí una revisión (perfil-cambio).` : ''}`);
    }
    process.exit(0);
  }
  const cerradosPorCarga = await cerrarCargados();
  if (cerradosPorCarga.length) console.log(`Cerré ${cerradosPorCarga.length} caso(s) de años que ya están en el sitio (no esperaban nada; si una etapa los vuelve a levantar, se reabren solos).\n`);
  const L = leer(); const { casos, resp, cerrado } = L;
  // FILTRO POR LOTE O CARPETA, solo para el listado: `--lista <lote.txt>` deja los casos de los documentos de
  // esa lista (un caso de alta apunta a una carpeta: entra si algún documento de la lista está adentro) y `--dir <carpeta>` los de esa carpeta.
  // No cambia ninguna respuesta ni ninguna etapa.
  const docsLista = flag('--lista') ? readFileSync(resolve(ROOT, flag('--lista')), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : null;
  const dirFiltro = flag('--dir') ? flag('--dir').replace(/\/+$/, '') + '/' : null;
  const delFiltro = (c) => {
    const p = c.pdf || '';
    if (docsLista && !(docsLista.includes(p) || (p.endsWith('/') && docsLista.some((d) => d.startsWith(p))))) return false;
    if (dirFiltro && !(p.startsWith(dirFiltro) || (p.endsWith('/') && dirFiltro.startsWith(p)))) return false;
    if (flag('--tipo') && c.motivo !== flag('--tipo')) return false; // --tipo: el motivo (gestion, categoria…)
    return true;
  };
  const lista = [...casos.values()].filter((c) => (A.includes('--todas') || pendiente(c, L)) && delFiltro(c));
  if (!lista.length) { console.log(docsLista || dirFiltro ? 'No hay casos en la cola para ese lote o carpeta.' : 'La cola está vacía.'); process.exit(0); }
  const porDoc = new Map(); for (const c of lista) { if (!porDoc.has(c.pdf)) porDoc.set(c.pdf, []); porDoc.get(c.pdf).push(c); }
  console.log(`COLA DE REVISIÓN: ${lista.length} caso(s) en ${porDoc.size} documento(s)${A.includes('--todas') ? '' : ' pendientes'}: ${Object.entries(lista.reduce((n, c) => ({ ...n, [c.motivo]: (n[c.motivo] || 0) + 1 }), {})).map(([m, n]) => `${n} ${m}`).join(' · ')}\n`);
  for (const [pdf, cs] of porDoc) {
    console.log(`## ${pdf}`);
    for (const c of cs) {
      const r = resp.get(c.id);
      console.log(`  [${c.id}] etapa ${c.etapa} · ${c.motivo}${r ? `   -> RESPONDIDO: ${r.decision}${r.valor ? ` ${r.valor}` : ''}` : cerrado.get(c.id) ? '   -> CERRADO: obsoleto' : ''}`);
      console.log(`      ${(c.motivo.startsWith('duda-') || c.motivo === 'categoria' || c.motivo === 'perimetro' || c.motivo === 'perfil') && c.propuesta ? 'Pregunta' : 'Qué mirar'}: ${c.que}`);
      // "¿Se carga X?" (sí = se carga) o "¿Se deja afuera X?" (sí = queda afuera) con la misma propuesta «sí»: solo se aclara en el listado; lo guardado no cambia (verificar.mjs lee las dos formas).
      if (/^¿\s*Se\s+dejan?\s+afuera\b/i.test(String(c.que || ''))) console.log('      (en esta pregunta «sí» = queda AFUERA de la carga; «no» = se carga)');
      if (c.pagina) console.log(`      ${textoPagina(c)}`);
      if (c.lineas) console.log(`      En la transcripción (${c.md}), líneas ${c.lineas[0]}-${c.lineas[1]}.`);
      // una errata de esas líneas que alguien ya revisó (tools/rarezas.mjs): se dice al lado del caso, que igual pide su decisión (el valor a cargar)
      if (c.lineas && c.md) for (const r of rarezasEnRango(c.md, c.lineas[0], c.lineas[1])) console.log(`      Rareza ya revisada: ${describir(r)}`);
      if (c.propuesta) console.log(`      Propuesta del sistema: ${c.propuesta}`);
    }
    console.log('');
  }
  console.log('Responder: node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club   [--nota "..."] --evidencia "ruta.md:12-30"|ninguna --seguridad alta|media|baja --causa <causa> (los tres, obligatorios)');
}

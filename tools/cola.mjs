#!/usr/bin/env node
// ============================================================================
// tools/cola.mjs — LA COLA DE REVISIÓN HUMANA del proceso nuevo: todo lo que una etapa no puede resolver sola va acá, con instrucciones para
// que Guido lo mire en el PDF o en la transcripción, y su respuesta se guarda y se REUSA. Gratis.
//
// POR QUÉ (Versión 324, diseño acordado con Guido el 2026-10-01; ver Admin/PIPELINE.md). Hasta acá, lo que no
// cerraba quedaba "frenado" y nadie lo miraba hasta que una sesión lo encontraba. Los que hacen esto a escala (Moody's CreditLens, nCino,
// Ocrolus) tienen la revisión humana como una ETAPA NORMAL, ruteada por confianza, y las correcciones vuelven al sistema. Guido lo pidió así:
// "vos me podés decir 'revisar tal cosa en el PDF y tal otra en el md' y yo abro el PDF por mi cuenta o la transcripción".
//
// EL ARCHIVO: Admin/cola-revision.jsonl (trackeado en git: son decisiones de Guido, conocimiento del proyecto). Solo se le AGREGAN líneas:
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
//   preguntar-club   no se puede saber del documento: pasa a Admin/dudas-por-club.md para escribirle al club (outreach)
// Las tools que mandaron el caso leen la respuesta con `respuestaDe(clave)` y la aplican la próxima vez que corren (verificar.mjs ya lo
// hace). QUE UNA RESPUESTA SE VUELVA REGLA (una convención de un grupo de países en tools/grupos-pais.mjs, una categoría como precedente del
// club) es el paso siguiente: hoy queda escrita acá y una sesión la pasa a regla (pendiente: to-do 141c de Admin/TODO.md).
//
// USO:
//   node tools/cola.mjs                                  los casos pendientes, agrupados por documento, con qué abrir y qué mirar
//   node tools/cola.mjs --todas                          también los respondidos
//   node tools/cola.mjs --responder <id> aceptar
//   node tools/cola.mjs --responder <id> corregir --valor "1.234.567" --nota "en el PDF dice 1.234.567, Mistral leyó 1.284.567"
//   node tools/cola.mjs --responder <id> preguntar-club --nota "¿el ingreso por transferencias es bruto o neto?"
//   node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta>" <categoría> --nota "..."   (fija la categoría de una fila, ver abajo)
//   import { agregarCaso, respuestaDe, pendientes } from './cola.mjs';
// ============================================================================

import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
// COLA_ARCHIVO (variable de entorno) apunta a otro archivo: para probar las tools sin ensuciar la cola real.
export const ARCHIVO = process.env.COLA_ARCHIVO || resolve(ROOT, 'Admin', 'cola-revision.jsonl');
const DECISIONES = ['aceptar', 'corregir', 'descartar', 'preguntar-club'];

// RESPUESTAS Y ESTADOS (Versión 350). `resp` tiene SOLO las respuestas de Guido (DECISIONES: aceptar, corregir, descartar,
// preguntar-club); la última gana. 'obsoleto' (la etapa ya no levanta el caso) y 'reabierto' (la etapa lo volvió a levantar) son ESTADOS, no
// respuestas: van a `cerrado` (true si el último de los dos es 'obsoleto'). Hasta la Versión 349 'obsoleto' se guardaba como una respuesta
// más, y un caso cerrado que volvía a aparecer quedaba "contestado" sin que nadie lo contestara: cargar.mjs frenaba por un caso que la cola
// no mostraba (UC 2013, "Otras ganancias (pérdidas)", ni siquiera buscaba la respuesta de 2014), y verificar.mjs lo daba por respondido y no
// lo mandaba a la cola (un "no cierra" o un "año vecino distinto" pasaba sin que nadie lo viera).
function leer() {
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
export function agregarCaso(caso) {
  const clave = `${caso.pdf}|${caso.etapa}|${caso.motivo}|${caso.detalle || ''}`;
  const id = createHash('sha1').update(clave).digest('hex').slice(0, 7);
  const { casos, resp, cerrado } = leer();
  if (casos.has(id)) {
    // Un caso cerrado como obsoleto que la etapa vuelve a levantar se REABRE (Versión 350): vuelve a la cola, no queda escondido.
    if (cerrado.get(id) && !resp.has(id)) appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id, ts: new Date().toISOString(), decision: 'reabierto', nota: 'la etapa volvió a levantar este caso' }) + '\n');
    return id;
  }
  appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'caso', id, ts: new Date().toISOString(), clave, ...caso }) + '\n');
  return id;
}
export function respuestaDe(pdf, etapa, motivo, detalle = '') {
  const id = createHash('sha1').update(`${pdf}|${etapa}|${motivo}|${detalle}`).digest('hex').slice(0, 7);
  return leer().resp.get(id) || null;
}
// LAS DOS PÁGINAS (Versión 326, pedido de Guido el 2026-10-01). `pagina` en un caso es la de la marca "--- pág. N ---" del .md, que es la
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

// La respuesta a una duda POR TEMA de un club (Versión 341): busca en TODOS los documentos un caso con ese motivo y ese detalle
// ("club|tema|renglón") que Guido ya contestó. Así una duda contestada para un año del club vale para todos sus años, aunque la IA la redacte
// distinto (pasó tres veces con "¿se usa el cuadro por segmento para abrir 'Ingresos Comerciales'?" de UC 2018-2025).
export function respuestaPorDetalle(etapa, motivo, detalle, filtro = () => true) {
  const { casos, resp } = leer(); let mejor = null;
  for (const c of casos.values()) if (c.etapa === etapa && c.motivo === motivo && c.detalle === detalle && filtro(c) && resp.has(c.id)) { const r = resp.get(c.id); if (!mejor || r.ts > mejor.resp.ts) mejor = { caso: c, resp: r }; }
  return mejor;
}

export function pendientes() { const L = leer(); return [...L.casos.values()].filter((c) => pendiente(c, L)); }
// OBSOLETOS (Versión 327). Un caso que la última corrida de su etapa YA NO levanta (la duda desapareció porque extraer se rehízo, la nota
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

// CASOS DE AÑOS YA CARGADOS (Versión 487, to-do 141a, pedido de Guido). La cola mostraba casos que no esperaban nada: el año del documento
// ya estaba en el sitio (Juventus 2003, 2004, 2016, 2017, 2019 y 2020: 11 casos). Cerrarlos a mano no servía: 'descartar' quiere decir "este
// documento no se carga" y 'aceptar' se vuelve regla del club, y las dos tienen efecto en las corridas siguientes. Se cierran con el ESTADO
// 'obsoleto' (no es una respuesta: respuestaDe() y casoYRespuesta() no lo ven, así que ninguna tool cambia lo que hace), y si una etapa vuelve
// a levantar el caso, agregarCaso() lo reabre ('reabierto'). Un caso REABIERTO no se vuelve a cerrar acá: si una etapa lo levantó de nuevo es
// porque alguien está re-procesando ese año, y Guido tiene que verlo.
// QUÉ SE CIERRA: solo los casos de 'verificar' (deciden si un año se carga; si ya se cargó, no frenan nada) y los de 'cargar · perimetro' (si
// el año se cargó, el perímetro ya se decidió). NUNCA 'cargar · categoria' (puede ser una categoría dudosa de un dato ya publicado: contestarla
// puede cambiar lo que se ve) ni 'cargar · perfil' (es sobre el club, no sobre ese año, y sirve para los años que vienen).
// "AÑO CARGADO", igual que lote.mjs (Versión 442): el registro (`cargado` en Admin/transcripciones-estado.jsonl) o, si el registro quedó
// viejo, el sitio: el club y el año de la última propuesta de carga del documento (`.carga.json`) están en su fiscalYearMeta.
const cierraSiCargado = (c) => c.etapa === 'verificar' || (c.etapa === 'cargar' && c.motivo === 'perimetro');
export async function cerrarCargados() {
  const L = leer(); const cand = [...L.casos.values()].filter((c) => pendiente(c, L) && cierraSiCargado(c) && !L.cerrado.has(c.id));
  if (!cand.length) return [];
  const reg = new Map();
  try { for (const l of readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').split('\n')) { if (!l.trim()) continue; const e = JSON.parse(l); reg.set(e.pdf, e); } } catch { /* sin registro: solo el sitio */ }
  let sitio = null; const cerrados = [];
  for (const c of cand) {
    const e = reg.get(c.pdf); let donde = e?.cargado ? 'según el registro' : null;
    if (!donde) {
      try {
        const md = c.md || e?.md; const p = md ? resolve(ROOT, derivado(md, '.carga.json', { crear: false })) : null;
        const k = p && existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
        if (k?.clubId && k?.year) { sitio ??= (await import('./proponer-carga.mjs')).loadSite(); if (sitio.generic?.[k.clubId]?.fiscalYearMeta?.[k.year]) donde = `${k.clubId} ${k.year}`; }
      } catch { /* sin propuesta de carga legible: no se cierra */ }
    }
    if (!donde) continue;
    appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id: c.id, ts: new Date().toISOString(), decision: 'obsoleto', nota: `el año ya está cargado en el sitio (${donde}); la pregunta no frena nada` }) + '\n');
    cerrados.push(c);
  }
  return cerrados;
}

// RESUELTO POR UNA RESPUESTA DEL CLUB (Versión 348). Una etapa aplicó a ESTE documento la respuesta que Guido dio en OTRO documento del
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

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  // --corregir-categoria (Versión 332): Guido fija la categoría de UNA fila de un documento aunque la categorización no haya tenido dudas (UC
  // 2025: "Costo de ventas" sin desglose -> "sin desglosar por la fuente", no "Otros gastos"). Crea el caso y su respuesta de una vez; la toma
  // cargar.mjs en la próxima corrida (respuestaCat) y queda como precedente del club. La etiqueta se escribe como en el documento.
  if (A.includes('--corregir-categoria')) {
    const i = A.indexOf('--corregir-categoria'); const [pdf, etiqueta, categoria] = A.slice(i + 1, i + 4);
    if (!pdf || !etiqueta || !categoria) { console.error('Uso: node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta tal cual>" <categoría> [--nota "..."]'); process.exit(1); }
    const mapa = readFileSync(resolve(ROOT, 'data', 'category-map.js'), 'utf8');
    if (!new RegExp(`^\\s*${categoria}: '`, 'm').test(mapa)) { console.error(`"${categoria}" no es una categoría de data/category-map.js`); process.exit(1); }
    const { normalizar } = await import('./vocabulario.mjs');
    const id = agregarCaso({ pdf, md: pdf.replace(/\.pdf$/i, '.md'), etapa: 'cargar', motivo: 'categoria', detalle: normalizar(etiqueta), categoriaPropuesta: categoria, que: `Corrección de Guido: "${etiqueta}" va como ${categoria}.` });
    // 'corregir' con la categoría, no 'aceptar' (Versión 408): agregarCaso devuelve el caso YA ABIERTO de esa fila si existe, con SU
    // categoriaPropuesta; 'aceptar' aceptaba esa propuesta vieja y no la corrección. Caso: Novorizontino 2021, "Repasse da federação" seguía
    // como competition_bonus después de fijarlo como broadcasting.
    appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id, ts: new Date().toISOString(), decision: 'corregir', valor: categoria, nota: flag('--nota') }) + '\n');
    console.log(`Categoría fijada (${id}): "${etiqueta}" -> ${categoria}. La toma cargar.mjs en la próxima corrida.`);
    process.exit(0);
  }
  if (A.includes('--responder')) {
    const id = flag('--responder'); const decision = A[A.indexOf('--responder') + 2];
    const { casos } = leer();
    if (!casos.has(id)) { console.error(`No hay ningún caso ${id} (node tools/cola.mjs para verlos).`); process.exit(1); }
    if (!DECISIONES.includes(decision)) { console.error(`La decisión tiene que ser una de: ${DECISIONES.join(', ')}`); process.exit(1); }
    if (decision === 'corregir' && !flag('--valor')) { console.error('Para corregir hace falta --valor "..."'); process.exit(1); }
    appendFileSync(ARCHIVO, JSON.stringify({ tipo: 'respuesta', id, ts: new Date().toISOString(), decision, valor: flag('--valor'), nota: flag('--nota') }) + '\n');
    console.log(`Respuesta guardada para ${id}: ${decision}${flag('--valor') ? ` (${flag('--valor')})` : ''}. La toma la próxima corrida de la etapa que mandó el caso.`);
    process.exit(0);
  }
  const cerradosPorCarga = await cerrarCargados();
  if (cerradosPorCarga.length) console.log(`Cerré ${cerradosPorCarga.length} caso(s) de años que ya están en el sitio (no esperaban nada; si una etapa los vuelve a levantar, se reabren solos).\n`);
  const L = leer(); const { casos, resp, cerrado } = L;
  const lista = [...casos.values()].filter((c) => A.includes('--todas') || pendiente(c, L));
  if (!lista.length) { console.log('La cola está vacía.'); process.exit(0); }
  const porDoc = new Map(); for (const c of lista) { if (!porDoc.has(c.pdf)) porDoc.set(c.pdf, []); porDoc.get(c.pdf).push(c); }
  console.log(`COLA DE REVISIÓN: ${lista.length} caso(s) en ${porDoc.size} documento(s)${A.includes('--todas') ? '' : ' pendientes'}\n`);
  for (const [pdf, cs] of porDoc) {
    console.log(`## ${pdf}`);
    for (const c of cs) {
      const r = resp.get(c.id);
      console.log(`  [${c.id}] etapa ${c.etapa} · ${c.motivo}${r ? `   -> RESPONDIDO: ${r.decision}${r.valor ? ` ${r.valor}` : ''}` : cerrado.get(c.id) ? '   -> CERRADO: obsoleto' : ''}`);
      console.log(`      ${(c.motivo.startsWith('duda-') || c.motivo === 'categoria' || c.motivo === 'perimetro' || c.motivo === 'perfil') && c.propuesta ? 'Pregunta' : 'Qué mirar'}: ${c.que}`);
      if (c.pagina) console.log(`      ${textoPagina(c)}`);
      if (c.lineas) console.log(`      En la transcripción (${c.md}), líneas ${c.lineas[0]}-${c.lineas[1]}.`);
      if (c.propuesta) console.log(`      Propuesta del sistema: ${c.propuesta}`);
    }
    console.log('');
  }
  console.log('Responder: node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club   [--nota "..."]');
}

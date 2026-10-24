// ============================================================================
// tools/perimetro-senales-a3.mjs — el paso A3 del perímetro y proponer()
// Mudado de tools/perimetro-senales.mjs sin cambiar una línea (salvo `export`); tools/perimetro-senales.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { deporteDePdf, deporteEnFrase } from './deporte-club.mjs';
import { MODELOS_A2, SOLO_CACHE, UMBRAL_C1, UMBRAL_C2, tablasDeIngresos, totalDe, aEscala, textoControladas, preguntarJev, UMBRAL_A2_CONS, UMBRAL_A2_IND, pasoA2 } from './perimetro-senales.mjs';

const ROOT = resolve(import.meta.dirname, '..');
// Regla de perímetro 1 (Admin/CONVENCIONES-DATOS.md): la madre que no presenta su propio estado de resultados (Companies Act 2006, s408) deja como único estado el del grupo. El texto de la exención
// y el nombre del estado tienen que estar juntos (300 caracteres): «section 408 … has not presented its own profit and loss account».
const S408_RX = /\bsection\s*408\b|\bs\.?\s?408\b/gi;
const ESTADO_RX = /profit and loss|statement of comprehensive income|income statement|statement of income/i;
const NO_PRESENTA_RX = /not\s+(?:been\s+)?presented|not\s+(?:to\s+)?present|exempt|from\s+(?:presenting|disclosing)|not\s+(?:to\s+)?(?:include|publish)/i;
const exencionS408 = (md) => { for (const m of md.matchAll(S408_RX)) { const v = md.slice(Math.max(0, m.index - 300), m.index + 300); if (ESTADO_RX.test(v) && NO_PRESENTA_RX.test(v)) return md.slice(0, m.index).split('\n').length; } return null; };
const CONTROL_A3_RX = /controlad|dependiente|filial|subsidi|controllat|consolidament|dochter|groepsmaatschappij|deelneming|consolidatie|tochtergesellschaft|konsolidierungskreis|beteiligung|datterselskap|dattervirksomhed|dotterbolag|konsern|koncern|group compan|consolidation|périmètre|participa/i;

function textoA3(lineas) {
  const usadas = new Set(); const partes = []; let largo = 0;
  for (let i = 0; i < lineas.length && largo < 9000; i++) {
    if (!CONTROL_A3_RX.test(lineas[i])) continue;
    for (let j = i; j < Math.min(lineas.length, i + 4); j++) {
      const t = lineas[j].replace(/\s+/g, ' ').trim();
      if (!t || usadas.has(j + 1)) continue;
      usadas.add(j + 1); const p = `L${j + 1}: ${t.slice(0, 300)}`; partes.push(p); largo += p.length;
    }
  }
  return { texto: partes.join('\n'), lineas: usadas };
}
export const ESQUEMA_A3 = {
  type: 'object', additionalProperties: false, required: ['perimetro', 'linea', 'controlada', 'motivo'],
  properties: { perimetro: { type: 'string', enum: ['consolidado', 'individual', 'no_se'] }, linea: { type: ['integer', 'null'] }, controlada: { type: ['string', 'null'] }, motivo: { type: 'string' } },
};
export const sistemaA3 = (deporte) => `Recibís líneas numeradas ("L123: ...") de la memoria de un club de ${deporteEnFrase(deporte)} que publica DOS estados de resultados: el de la sociedad sola y el del grupo (la sociedad y sus controladas). Son las líneas que hablan de controladas, participaciones o consolidación, en cualquier idioma.
La regla para elegir qué estado se carga: si al menos una controlada que entra en el consolidado hace el negocio del fútbol del club (el club profesional, el primer equipo, la academia o el fútbol base del club, el estadio o el centro deportivo del club, sponsors, derechos de TV, merchandising, entradas, hospitality o catering del estadio), "consolidado". Si ninguna lo hace (inmobiliarias sin el estadio, financieras, negocios de otra actividad, sociedades inactivas o en liquidación), "individual". Si la sociedad que presenta es una holding sin operación propia y el fútbol está en una controlada, "consolidado".
Devolvé: perimetro; linea: la línea que nombra a la controlada que decide (si es "consolidado", una que hace el negocio del fútbol; si es "individual", la que muestra qué hace la controlada principal); controlada: su nombre tal como aparece en esa línea; motivo: una oración. Si las líneas no alcanzan para saber qué hacen las controladas, "no_se" con linea y controlada en null.`;
const CACHE_A3 = resolve(ROOT, 'Generados', '_cache', 'claude-perimetro-a3.jsonl');
let cacheA3 = null;
const leerCacheA3 = () => { if (!cacheA3) { cacheA3 = new Map(); if (existsSync(CACHE_A3)) for (const l of readFileSync(CACHE_A3, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); cacheA3.set(j.clave, j); } catch { /* línea rota */ } } } return cacheA3; };
export const pedidoA3 = (lineas, deporte) => { const { texto, lineas: mandadas } = textoA3(lineas); return texto ? { user: texto, mandadas, clave: createHash('sha1').update(JSON.stringify([sistemaA3(deporte), texto])).digest('hex') } : null; };
const sinAcentos = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
export function compuertaA3(datos, mandadas, lineas) {
  if (!datos || datos.perimetro === 'no_se') return { motivo: 'Claude no sabe qué hacen las controladas' };
  if (!mandadas.has(datos.linea)) return { motivo: `L${datos.linea} no está entre las líneas mandadas` };
  const nombre = sinAcentos(datos.controlada);
  if (nombre.length < 4 || !sinAcentos(lineas[datos.linea - 1]).includes(nombre)) return { motivo: `L${datos.linea} no nombra a "${datos.controlada}"` };
  // SOLO "consolidado" decide: nombrar una controlada que hace fútbol, con su línea, se comprueba; "ninguna lo hace"
  // no se prueba con fragmentos. Medido con un subagente Sonnet sobre los 10 casos de los lotes 93-94: 6 consolidado bien; el único
  // individual, mal (PEC Zwolle: la Stichting Regio Zwolle United trabaja para el club, L778). Un "individual" frena como antes.
  if (datos.perimetro !== 'consolidado') return { motivo: `A3 dice ${datos.perimetro} ("${datos.controlada}" L${datos.linea}): solo "consolidado" decide` };
  return { perimetro: datos.perimetro, linea: datos.linea, controlada: datos.controlada, motivo: datos.motivo };
}
async function pasoA3(mdRel, lineas, { soloCache = false } = {}) {
  const pdfA3 = mdRel.replace(/\.md$/, '.pdf'); const p = pedidoA3(lineas, deporteDePdf(pdfA3));
  if (!p) return { motivo: 'el documento no habla de controladas' };
  let datos = leerCacheA3().get(p.clave)?.datos;
  if (!datos && (SOLO_CACHE || soloCache)) return { pendiente: true };
  if (!datos) {
    const { llamarClaude } = await import('./claude-llamada.mjs');
    const r = await llamarClaude({ system: sistemaA3(deporteDePdf(pdfA3)), user: p.user, schema: ESQUEMA_A3, tarea: 'perimetro-a3', pdf: pdfA3, maxTokens: 1000, modelo: MODELOS_A2.sonnet });
    if (r.pendiente) return { pendiente: true };
    if (r.error) return { error: r.error };
    datos = r.datos;
    mkdirSync(dirname(CACHE_A3), { recursive: true }); appendFileSync(CACHE_A3, JSON.stringify({ clave: p.clave, md: mdRel, datos }) + '\n'); cacheA3.set(p.clave, { datos });
  }
  return compuertaA3(datos, p.mandadas, lineas);
}

// ---------------------------------------------------------------- la propuesta de un documento
export async function proponer(mdRel, { jev = false, soloCache = false } = {}) {
  const md = readFileSync(resolve(ROOT, mdRel), 'utf8');
  const { tablas, titulos } = tablasDeIngresos(md);
  const cons = tablas.filter((t) => t.per === 'consolidado');
  const ind = tablas.filter((t) => t.per !== 'consolidado'); // sin etiqueta cuenta como individual (el estado de una sola entidad)
  const r = { md: mdRel, tablas, titulos, pasoA: null, c1: null, c2: null, c3: null, propuesta: null, motivo: '' };
  if (!tablas.length) {
    r.pasoA = 'sin-tablas'; r.motivo = 'no encontré ninguna tabla con el total de ingresos';
    // PASO A2 (Claude; pago, así que solo al ejecutar: en el ensayo queda pendiente).
    // `soloCache`: el ensayo usa la respuesta GUARDADA de A2 si la hay (gratis) y dice lo
    // que va a pasar; sin respuesta guardada queda pendiente. Antes el ensayo daba siempre "se decide al ejecutar" y el lote frenaba igual
    // cuando A2 veía los dos estados sin totales para votar (lotes 93 y 94: 10 documentos).
    if (!jev && !soloCache) { r.a2 = { pendiente: true }; return r; }
    const a = await pasoA2(mdRel, md.split('\n'), { soloCache: !jev }); r.a2 = a;
    if (a.pendiente) { r.motivo += '; A2 pendiente de la Batch API'; return r; }
    if (a.error) { r.motivo += `; A2 falló (${a.error})`; return r; }
    if (a.estado == null) { r.motivo += `; A2: ${a.motivo}`; return r; }
    const v = Object.entries(a.votos).map(([k, x]) => `${k} ${x.si ? `sí L${x.linea}` : x.rechazado ? `rechazado L${x.linea}` : 'no'}`).join(', ');
    if (a.otro != null || a.columnasDeLosDos) {
      r.pasoA = 'a2-los-dos'; r.motivo = `A2 (Claude): estado L${a.estado} ${a.otro != null ? `y otro de distinto perímetro L${a.otro}` : 'con columnas de los dos perímetros'}, sin totales reconocidos para votar`;
      // PASO A3: sin totales para votar, qué hacen las controladas. Decide como un voto del paso B.
      const a3 = await pasoA3(mdRel, md.split('\n'), { soloCache: !jev }); r.a3 = a3;
      if (a3.perimetro) { r.propuesta = a3.perimetro; r.motivo += `; A3 (Claude): ${a3.perimetro}, "${a3.controlada}" L${a3.linea} (${a3.motivo})`; }
      else r.motivo += a3.pendiente ? '; A3 pendiente (se pregunta al ejecutar)' : `; A3: ${a3.error || a3.motivo}`;
      return r;
    }
    const base = `A2 (Claude) estado L${a.estado}, ${a.puntos} de 10 puntos (${v})`;
    if (a.puntos >= UMBRAL_A2_CONS) { r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = base; }
    else if (a.puntos <= UMBRAL_A2_IND) { r.pasoA = 'solo-individual'; r.propuesta = 'individual'; r.motivo = base; }
    else r.motivo = `${base}: a la cola`;
    return r;
  }
  if (cons.length && !ind.length) {
    if (titulos.individual) { r.pasoA = 'dudoso'; r.motivo = `solo tablas consolidadas, pero hay ${titulos.individual} título(s) de estado individual sin tabla reconocida`; return r; }
    r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = `solo tablas consolidadas (${cons.length})`; return r;
  }
  if (!cons.length) {
    // el único estado de resultados es el del grupo: la sociedad madre no presenta el suyo (s408) y ninguna tabla dice «individual»
    const l408 = ind.every((t) => t.per !== 'individual') ? exencionS408(md) : null;
    if (l408) { r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = `la madre no presenta su propio estado de resultados (s408, L${l408}): el único es el del grupo`; return r; }
    if (titulos.consolidado) { r.pasoA = 'dudoso'; r.motivo = `solo tablas individuales, pero hay ${titulos.consolidado} título(s) de estado consolidado sin tabla reconocida`; return r; }
    if (/consolidat/i.test(mdRel.split('/').pop())) { r.pasoA = 'dudoso'; r.motivo = 'solo tablas individuales o sin perímetro, pero el nombre del archivo dice consolidado'; return r; }
    r.pasoA = 'solo-individual'; r.propuesta = 'individual'; r.motivo = `solo tablas individuales o sin perímetro (${ind.length}); ningún título de estado consolidado`;
    r.sinTituloDePerimetro = !ind.some((t) => t.per === 'individual'); // ninguna tabla dice "individual": el "individual" es por descarte, no una señal
    return r;
  }
  r.pasoA = 'los-dos';
  const tc = totalDe(cons); const ti = totalDe(ind.filter((t) => t.per === 'individual').length ? ind.filter((t) => t.per === 'individual') : ind);
  const iAct = aEscala(tc.actual, ti.actual); const iAnt = tc.anterior != null && ti.anterior != null ? aEscala(tc.anterior, ti.anterior) : null;
  const dif = (c, i) => (c != null && i ? c / i - 1 : null);
  const d1 = dif(tc.actual, iAct); const d0 = dif(tc.anterior, iAnt);
  // Los mismos números en el año y en el anterior = el mismo estado, visto dos veces (Atalanta y Bologna, que solo publican el consolidado:
  // el resumen de la relazione quedó sin perímetro). Se trata como "solo consolidado", que carga exactamente esos números.
  if (d1 != null && d0 != null && Math.abs(d1) < 0.0001 && Math.abs(d0) < 0.0001) {
    r.pasoA = 'solo-consolidado'; r.propuesta = 'consolidado'; r.motivo = 'las tablas "individuales" tienen los mismos totales que las consolidadas (año y anterior): es el mismo estado';
    return r;
  }
  r.totales = { consolidado: { linea: tc.linea, actual: tc.actual, anterior: tc.anterior }, individual: { linea: ti.linea, actual: ti.actual, anterior: ti.anterior } };
  r.c1 = { voto: [d1, d0].some((d) => d != null && d >= UMBRAL_C1), dif: d1, difAnterior: d0 };
  const crec = (a, b) => (a != null && b ? a / b - 1 : null);
  const gc = crec(tc.actual, tc.anterior); const gi = crec(ti.actual, ti.anterior);
  r.c2 = { voto: gc != null && gi != null && Math.abs(gi - gc) >= UMBRAL_C2, crecConsolidado: gc, crecIndividual: gi };
  if (jev) {
    const { texto, total } = textoControladas(md);
    if (total > texto.length) r.recorte = `Jev (c3) recibió ${texto.length} de ${total} caracteres sobre controladas; el resto no se miró`;
    // Sin texto sobre controladas no hay a quién preguntarle: el voto queda sin respuesta (cola), no cuenta como "no".
    if (!texto) r.c3 = { voto: null, motivo: 'el documento no habla de controladas' };
    else { const a = await preguntarJev(texto, deporteDePdf(mdRel.replace(/\.md$/, '.pdf'))); r.c3 = a.error ? { voto: null, error: a.error } : { voto: a.choice === 'si', choice: a.choice, confianza: a.confidence, cache: !!a.cache }; }
  } else r.c3 = { voto: null, motivo: 'sin --jev' };
  const votos = [r.c1.voto, r.c2.voto, r.c3.voto];
  const si = votos.filter((v) => v === true).length; const nulos = votos.filter((v) => v === null).length;
  // Un voto sin respuesta (sin --jev, o Jev falló) puede ser un sí: solo se decide si el resultado no depende de él.
  if (si >= 2) { r.propuesta = 'consolidado'; r.motivo = `${si} de 3 criterios`; }
  else if (nulos) { r.motivo = `${si} de 3 criterios y ${nulos} sin respuesta: no alcanza para decidir`; }
  else if (si === 0) { r.propuesta = 'individual'; r.motivo = '0 de 3 criterios'; }
  else { r.motivo = '1 de 3 criterios: a la cola'; }
  if (r.recorte) r.motivo += `; AVISO (recorte): ${r.recorte}`;
  return r;
}

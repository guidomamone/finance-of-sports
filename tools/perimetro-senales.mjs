// ============================================================================
// tools/perimetro-senales.mjs — PROPUESTA DE PERÍMETRO (individual o consolidado) para un documento, con señales y voto.
//
// POR QUÉ (lote 14, los 12 clubes italianos nuevos). tools/antes-de-localizar.mjs frena todo documento que trae estados
// consolidados y cuyo club no tiene años cargados, y pide un ajuste `perimetro` sin decir cuál. El detector de alta-club.mjs CUENTA
// MENCIONES de "consolidato": 5 de 12 clubes frenaron por un falso positivo (Torino, Sassuolo, Monza, Napoli, Sampdoria: las menciones
// son del grupo dueño del club, no un estado del club). Y donde el documento trae los dos, nadie le dice a Guido cuál conviene.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «perimetro-senales.mjs».
//
// USO:
//   node tools/perimetro-senales.mjs --verdad Admin/mediciones/perimetro-verdad.tsv          # ensayo: pasos A y B sin Jev (C3 = "?")
//   node tools/perimetro-senales.mjs --verdad Admin/mediciones/perimetro-verdad.tsv --jev    # con Jev (~US$ 0,0001 por documento)
//   node tools/perimetro-senales.mjs --lista Admin/lotes/lote-NN.txt [--jev]                  # sin verdad: solo la propuesta
//   node tools/perimetro-senales.mjs --lista Admin/mediciones/perimetro-a2-lista.txt --jev   # medición del paso A2 (clubes con ajuste, otro idioma)
//   node tools/perimetro-senales.mjs --verdad Admin/mediciones/perimetro-a2-verdad-ajustes.tsv --jev [--modelo sonnet]   # A2 contra
//        el ajuste `perimetro` de cada documento; --modelo opus|sonnet: el paso A2 con ese modelo (Sonnet con su propia clave de caché, no pisa las de Opus)
//   node tools/perimetro-senales.mjs --md "Clubes/Italia/AC Milan/x.md" --detalle      # un documento, con cada tabla encontrada
//   node tools/perimetro-senales.mjs --md "Clubes/Grecia/Aris/x.md" --ver-a2           # el texto que recibiría Claude en A2 (gratis)
//   node tools/perimetro-senales.mjs --decidir-clubes <lista de carpetas> --solo-cache   # ensayo de la decisión de perímetro de cada club (gratis)
//   node tools/perimetro-senales.mjs --lista <txt> --exportar-a2 <carpeta>             # los pedidos de A2 sin caché, para contestarlos sin API
//   node tools/perimetro-senales.mjs --auditar-a2 <carpeta>                             # auditoría a posteriori: lo que decidió A2 en corridas reales
// ============================================================================
import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { deporteDePdf, deporteEnFrase } from './deporte-club.mjs'; // «club de fútbol» de los prompts de lectura es el deporte del club

const ROOT = resolve(import.meta.dirname, '..');
import { ESQUEMA_A3, sistemaA3, pedidoA3, compuertaA3, proponer } from './perimetro-senales-a3.mjs';
import { args, flagVal, carpetaDeTrabajo, USE_JEV, MODELOS_A2, MODELO_A2, DETALLE, SOLO_CACHE, esTitulo, limpiar, filasConNumeros, tablasDeIngresos, PESOS_A2 } from './perimetro-senales-base.mjs';
export { MODELOS_A2, SOLO_CACHE, UMBRAL_C1, UMBRAL_C2, numeroCelda, tablasDeIngresos, totalDe, aEscala, textoControladas, preguntarJev, PESOS_A2, UMBRAL_A2_CONS, UMBRAL_A2_IND } from './perimetro-senales-base.mjs';
export { sistemaA3, compuertaA3, proponer } from './perimetro-senales-a3.mjs';
const CACHE_A2 = resolve(ROOT, 'Generados', '_cache', 'claude-perimetro.jsonl');
let cacheA2 = null;
function titulosDelDocumento(lineas) {
  const out = [];
  lineas.forEach((l, k) => {
    if (!esTitulo(l, lineas[k - 1], lineas[k + 1]) || l.trim().startsWith('|')) return; // "--- pág. N ---" cuenta: Novorizontino 2017 cuelga su tabla de ahí
    const filas = filasConNumeros(lineas, k);
    const tabla = filas.length >= 5
      ? filas.slice(0, 4).map((j) => limpiar(lineas[j].split('|').slice(1, -1).find((c) => /\p{L}{3}/u.test(c)) || '').slice(0, 60)).filter(Boolean)
      : null;
    // El texto debajo del título (tres líneas como máximo, sin imágenes, hasta la tabla o el título siguiente): Rapid 2019-20 dice el perímetro en la
    // introducción de la sección ("Bei allen Finanzdaten handelt es sich ... um die konsolidierte Betrachtung") y el auditor en un párrafo.
    const texto = [];
    for (let j = k + 1; j < Math.min(lineas.length, tabla ? filas[0] : k + 40) && texto.length < 3; j++) {
      if (!lineas[j].trim().startsWith('|') && esTitulo(lineas[j], lineas[j - 1], lineas[j + 1])) break;
      const x = limpiar(lineas[j]); if (x && !lineas[j].trim().startsWith('|') && !/^-+\s*pág/i.test(x) && !/^!\[/.test(x)) texto.push({ linea: j + 1, texto: x.slice(0, 200) });
    }
    out.push({ linea: k + 1, titulo: limpiar(l).slice(0, 100), tabla, texto, inicioTabla: tabla ? filas[0] + 1 : null });
  });
  return out;
}
function portadaDelDocumento(lineas) {
  const out = [];
  for (let k = 0; k < lineas.length && out.length < 15; k++) { const x = limpiar(lineas[k]); if (x && !lineas[k].trim().startsWith('|') && !/^-+\s*pág/i.test(x) && !/^!\[/.test(x)) out.push({ linea: k + 1, texto: x.slice(0, 150) }); }
  return out;
}
const textoA2 = (tit, portada) => `PORTADA (primeras líneas):\n${portada.map((p) => `L${p.linea}: ${p.texto}`).join('\n')}\n\nTÍTULOS:\n`
  + tit.slice(0, 400).map((t) => `L${t.linea}: ${t.titulo}${t.tabla ? `  [tabla: ${t.tabla.join(' / ')}]` : ''}${t.texto.length ? `\n    texto${t.tabla ? ' antes de la tabla' : ''}: ${t.texto.map((x) => `L${x.linea}: ${x.texto}`).join(' | ')}` : ''}`).join('\n');
const CRITERIO = { type: 'object', additionalProperties: false, required: ['si', 'linea'], properties: { si: { type: 'boolean' }, linea: { type: ['integer', 'null'] } } };
const ESQUEMA_A2 = {
  type: 'object', additionalProperties: false, required: ['linea_estado', 'linea_otro_estado', 'columnas_de_los_dos', 'criterios'],
  properties: {
    linea_estado: { type: ['integer', 'null'] }, linea_otro_estado: { type: ['integer', 'null'] }, columnas_de_los_dos: { type: 'boolean' },
    criterios: { type: 'object', additionalProperties: false, required: Object.keys(PESOS_A2), properties: Object.fromEntries(Object.keys(PESOS_A2).map((k) => [k, CRITERIO])) },
  },
};
const sistemaA2 = (deporte) => `Recibís la portada (primeras líneas) y los títulos de un documento contable de un club de ${deporteEnFrase(deporte)} (transcripción a Markdown), en orden, con su número de línea. Debajo de cada título va su primer texto; a los títulos que tienen una tabla con números debajo se les agregan los primeros renglones de esa tabla (y el texto es el que hay entre el título y la tabla).
1. linea_estado: la línea del título del ESTADO DE RESULTADOS (cuenta de pérdidas y ganancias, income statement) del ejercicio; tiene que ser un título con tabla. null si no hay ninguno. No cuentes notas, resúmenes ni tablas de la memoria.
2. linea_otro_estado: si el documento trae además OTRO estado de resultados de distinto perímetro (uno del grupo y otro de la sociedad sola), la línea de su título; si no, null.
3. columnas_de_los_dos: true si la tabla del estado de linea_estado trae columnas de los dos perímetros a la vez (por ejemplo "grupo" y "sociedad", "Koncern" y "Moderselskab", "consolidado" e "individual"); si no, false.
4. criterios: para cada uno, si=true solo si esa parte del documento dice que el estado de linea_estado es CONSOLIDADO (incluye a la sociedad y a sus controladas: el grupo), con la línea exacta que lo dice; si=false (y linea null) si no lo dice o no existe.
   - titulo: el título del estado, o el título o el texto de introducción de su sección (más arriba), dice consolidado / del grupo.
   - texto: el texto entre el título del estado y su tabla, o el texto que explica cómo se presentan las cifras de ese estado, dice consolidado / del grupo.
   - auditor: el informe del auditor (un título o un texto suyo) dice que auditó estados consolidados.
   - grupo: hay una sección sobre la estructura del grupo o las controladas que entran en la consolidación de ESTA sociedad (no la del grupo dueño del que la sociedad es filial).
   - portada: la portada o el encabezado dice consolidado.
   La palabra "consolidado" sola en un membrete de una sola sociedad (un sistema contable que junta sus centros de costo) no prueba un estado consolidado: contala solo en portada.`;
export async function pasoA2(mdRel, lineas, { soloCache = false } = {}) {
  const tit = titulosDelDocumento(lineas);
  if (!tit.some((t) => t.tabla)) return { motivo: 'ningún título con tabla' };
  const portada = portadaDelDocumento(lineas);
  const user = textoA2(tit, portada); const SISTEMA_A2 = sistemaA2(deporteDePdf(mdRel.replace(/\.md$/, '.pdf')));
  const clave = createHash('sha1').update(JSON.stringify(MODELO_A2 && MODELO_A2 !== 'opus' ? [SISTEMA_A2, user, MODELOS_A2[MODELO_A2]] : [SISTEMA_A2, user])).digest('hex');
  if (!cacheA2) { cacheA2 = new Map(); if (existsSync(CACHE_A2)) for (const l of readFileSync(CACHE_A2, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); cacheA2.set(j.clave, j); } catch { /* línea rota */ } } }
  let datos = cacheA2.get(clave)?.datos;
  if (!datos && (SOLO_CACHE || soloCache)) return { pendiente: true };
  if (!datos) {
    const { llamarClaude } = await import('./claude-llamada.mjs');
    const r = await llamarClaude({ system: SISTEMA_A2, user, schema: ESQUEMA_A2, tarea: MODELO_A2 && MODELO_A2 !== 'opus' ? `perimetro-a2-medir-${MODELO_A2}` : 'perimetro-a2', pdf: mdRel.replace(/\.md$/, '.pdf'), maxTokens: 2000, ...(MODELO_A2 ? { modelo: MODELOS_A2[MODELO_A2] } : {}) });
    if (r.pendiente) return { pendiente: true }; // modo batch: la respuesta llega en la ola siguiente
    if (r.error) return { error: r.error };
    datos = r.datos;
    mkdirSync(dirname(CACHE_A2), { recursive: true }); appendFileSync(CACHE_A2, JSON.stringify({ clave, md: mdRel, ...(MODELO_A2 && MODELO_A2 !== 'opus' ? { modelo: MODELOS_A2[MODELO_A2] } : {}), datos }) + '\n'); cacheA2.set(clave, { datos });
  }
  // La compuerta.
  const est = tit.find((t) => t.tabla && t.linea === datos.linea_estado);
  if (!est) return { motivo: datos.linea_estado == null ? 'Claude no encontró ningún estado de resultados' : `L${datos.linea_estado} no es un título con tabla` };
  // El otro estado cuenta aunque su tabla no se haya reconocido (FC Groningen 2024-25: el individual de la Beheer B.V. sin tabla marcada).
  const otro = tit.find((t) => t.linea === datos.linea_otro_estado && t.linea !== est.linea);
  const titulosArriba = new Set(tit.filter((t) => t.linea <= est.linea).flatMap((t) => [t.linea, ...(t.linea < est.linea ? t.texto.map((x) => x.linea) : [])]));
  const enviadas = new Set([...tit.map((t) => t.linea), ...tit.flatMap((t) => t.texto.map((x) => x.linea)), ...portada.map((p) => p.linea)]);
  const textos = new Set(tit.flatMap((t) => t.texto.map((x) => x.linea)));
  const valida = { titulo: (l) => titulosArriba.has(l), texto: (l) => textos.has(l), auditor: (l) => enviadas.has(l), grupo: (l) => enviadas.has(l), portada: (l) => portada.some((p) => p.linea === l) };
  const votos = {}; let puntos = 0;
  for (const [k, peso] of Object.entries(PESOS_A2)) {
    const c = datos.criterios?.[k] || {};
    const si = !!c.si && c.linea != null && valida[k](c.linea);
    votos[k] = { si, linea: c.linea ?? null, rechazado: !!c.si && !si };
    if (si) puntos += peso;
  }
  return { estado: est.linea, otro: otro?.linea ?? null, columnasDeLosDos: !!datos.columnas_de_los_dos, votos, puntos };
}

// ---------------------------------------------------------------- PASO A3: qué hacen las controladas
// POR QUÉ: cuando A2 ve los DOS estados (el de la sociedad y el del grupo) pero no hay totales reconocidos para el
// voto del paso B, el club quedaba sin decidir y el lote frenaba. Lotes 93 y 94: 10 documentos; los 8 que se decidieron a mano se
// decidieron con la pregunta de la regla (Admin/CONVENCIONES-DATOS.md, "qué perímetro se carga"): ¿las controladas hacen el negocio del
// fútbol del club? Sí -> consolidado (Viking: Viking Stadion AS, el estadio); no -> individual (Sarpsborg 08: Prozo AS, un comercio aparte).
// A3 le hace a Claude ESA pregunta con las líneas del documento que hablan de controladas (en cualquier idioma, tablas incluidas).
// COMPUERTA: la línea citada está entre las mandadas y nombra a la controlada que da Claude. Si no, o si dice "no_se", no decide (frena
// como antes). Sonnet; caché Generados/_cache/claude-perimetro-a3.jsonl. --exportar-a3 / --evaluar-a3: medir sin API (ver el CLI).
const CONTROL_A3_RX = /controlad|dependiente|filial|subsidi|controllat|consolidament|dochter|groepsmaatschappij|deelneming|consolidatie|tochtergesellschaft|konsolidierungskreis|beteiligung|datterselskap|dattervirksomhed|dotterbolag|konsern|koncern|group compan|consolidation|périmètre|participa/i;

// ---------------------------------------------------------------- LA REGLA DEL CLUB (lo que usa el pipeline)
// La propuesta es por documento; el ajuste `perimetro` (Admin/registros/ajustes-manuales.jsonl) puede ser del CLUB (la carpeta) o de UN documento.
// Se miran TODOS los .md del club (no solo los de la lista), agrupados por ejercicio (cierre del registro):
//   - de cada ejercicio, qué perímetros HAY: "solo uno" (paso A o A2) o los dos (dos documentos del mismo cierre, o uno con los dos);
//   - los votos: lo que eligió el paso B en los documentos que traen los dos.
// LA REGLA (Admin/CONVENCIONES-DATOS.md, "Perímetro"; es la que Guido aplicó caso por caso: Parma, Fiorentina 2019, Lazio en liras):
//   1. Un ejercicio que se publicó con UN solo perímetro se carga con ese: no hay otro. Si no es el del club, ajuste de cada documento de
//      ese ejercicio (Parma, individual, con 2022 y 2025 solo consolidados).
//   2. El perímetro del CLUB es el de los votos (los ejercicios que traen los dos). Sin votos, el único perímetro de todos los ejercicios.
//   3. Sin votos y con ejercicios de los dos perímetros (Aris: individual en 2019 y 2021, solo consolidado en 2023-2025), no hay perímetro
//      del club: cada documento lleva el suyo.
//   Frena (decide Guido) solo si los votos no coinciden entre sí. Un documento que no decide (cola) no cuenta, y si su ejercicio no tiene
//   otro documento que decida, sigue frenando en la compuerta.
//   ejecutar = true: pregunta a Jev y a Claude lo que haga falta y ESCRIBE los ajustes (autor "perimetro-senales").
//   ejecutar = false (ensayo): sin API ni escritura; dice qué fijaría, o que se decide al ejecutar.
// faltaPerimetro(pdf): la compuerta (antes-de-localizar.mjs) dice que ese documento frena por perímetro; solo se miran esos clubes.
// Devuelve, por club: { carpeta, valor (del club o null), porDocumento: [{ pdf, valor }], escrito, pendienteJev, detalle }.
// LOS AÑOS YA CARGADOS TAMBIÉN SON EVIDENCIA. Burnley (lote 97): 2024 y 2025 están cargados como consolidado (Burnley FC Holdings) y el
// documento 2022-23 trae una sola tabla de ingresos SIN título de perímetro; el paso A la daba por "individual" (por descarte) y fijó `individual` para todo el club. Ahora, si los
// años cargados del club son consolidado (la heurística de perimetroHeredado(): al menos uno, y ninguno individual), un documento cuyo "solo individual" es por descarte (ninguna tabla lo dice) no vota,
// Si hay un título que dice "individual", el documento vota individual como siempre.
let _cargados = null;
async function perimetroCargadoDe(carpeta) {
  try {
    const { clubDeCarpeta } = await import('./carpetas-clubes.mjs'); const { perimetroHeredado, cargarSitio } = await import('./cargar.mjs');
    const [, pais, club] = carpeta.split('/'); const id = clubDeCarpeta(pais, club).clubId; if (!id) return null;
    const sitio = (_cargados ??= cargarSitio()); if (!sitio.generic?.[id]) return null;
    const her = perimetroHeredado(sitio, id); const anios = Object.entries(her.porAnio);
    return anios.some(([, v]) => v === 'consolidado') && anios.every(([, v]) => v === 'consolidado' || v === '?') ? { perimetro: 'consolidado', anios: anios.map(([y]) => y) } : null; // algún año consolidado y ninguno individual ("?" = la nota nombra los dos: Burnley 2024)
  } catch { return null; }
}
export async function fijarPerimetroDeClubes(pdfs, { registro, ejecutar = false, faltaPerimetro, descartados = new Set(), jev = ejecutar }) {
  const { ajustePerimetroDe, agregarAjuste } = await import('./ajustes.mjs');
  const carpeta = (pdf) => pdf.split('/').slice(0, 3).join('/') + '/';
  const clubes = [...new Set(pdfs.filter((p) => !ajustePerimetroDe(p) && faltaPerimetro(p)).map(carpeta))];
  const out = [];
  for (const c of clubes) {
    const docs = registro.filter((e) => e.pdf.startsWith(c) && e.estado !== 'duplicado' && !descartados.has(e.pdf) && e.md && existsSync(resolve(ROOT, e.md)));
    const props = [];
    for (const e of docs) props.push({ e, r: await proponer(e.md, { jev, soloCache: !ejecutar }) });
    // Modo batch (claude-llamada.mjs): si a algún documento del club le falta la respuesta de A2, no se decide el club con los demás (sin
    // batch habrían estado todas): se espera a la ola siguiente.
    if (ejecutar && props.some(({ r }) => r.a2?.pendiente || r.a3?.pendiente)) { out.push({ carpeta: c, valor: null, porDocumento: [], pendienteJev: true, detalle: 'A2 o A3 pendiente de la Batch API: se decide en la ola siguiente' }); continue; }
    const porCierre = new Map(); const votos = new Map(); let pendJev = 0;
    const cargado = await perimetroCargadoDe(c);
    for (const { e, r } of props) {
      const k = e.periodo?.cierre || e.md;
      const set = porCierre.get(k) || new Set();
      if (r.pasoA === 'solo-individual' && r.sinTituloDePerimetro && cargado) { /* sin título de perímetro y la serie cargada es consolidado: no vota (298 o2) */ }
      else if (r.pasoA === 'solo-individual') set.add('individual');
      else if (r.pasoA === 'solo-consolidado') set.add('consolidado');
      else if (r.pasoA === 'los-dos' || r.pasoA === 'a2-los-dos') { set.add('individual'); set.add('consolidado'); if (r.propuesta) votos.set(e.md, r.propuesta); else if (r.c3?.voto === null) pendJev++; } // A3 sin respuesta guardada no cuenta: el ensayo lo da como frenado (conservador)
      else if (r.a2?.pendiente) pendJev++;
      porCierre.set(k, set);
    }
    const valoresVoto = [...new Set(votos.values())];
    const unicos = [...porCierre.entries()].filter(([, s]) => s.size === 1).map(([k, s]) => [k, [...s][0]]);
    const valoresUnicos = [...new Set(unicos.map(([, v]) => v))];
    const evidencia = `${votos.size} documento(s) con los dos estados votan ${valoresVoto.join('/') || '—'}; ${unicos.length} ejercicio(s) con un solo perímetro (${valoresUnicos.join('/') || '—'}); ${props.length} documento(s) mirados`;
    if (valoresVoto.length > 1) { out.push({ carpeta: c, valor: null, porDocumento: [], detalle: `los documentos que traen los dos estados no eligen lo mismo (${[...votos].map(([m, v]) => `${m.split('/').pop()}: ${v}`).join('; ')})` }); continue; }
    // 2. El perímetro del club.
    // el punto 2 de la regla dice "sin ningún ejercicio con los dos": si algún ejercicio trae los dos
    // estados y no votó (Estonia: A2 ve los dos, pero sin total de ingresos reconocido no hay paso B), el perímetro del club NO sale de los
    // ejercicios de un solo estado; queda sin decidir (frena) y esos ejercicios reciben su ajuste propio (punto 1). Antes, Kuressaare,
    // Tallinna Kalev, Narva Trans y FCI Levadia quedaban "individual" por 2019-2020 y hubo que corregirlos a "consolidado" y repagar
    // localizar. Medido con --decidir-clubes --solo-cache: 42 carpetas con ajuste de club idénticas; cambian solo los estonios.
    const conLosDos = [...porCierre.values()].some((x) => x.size === 2);
    const valor = valoresVoto[0] || (!conLosDos && valoresUnicos.length === 1 ? valoresUnicos[0] : null);
    // 1 y 3. Los ejercicios con un solo perímetro distinto del club (o todos, si no hay perímetro del club): ajuste de cada documento.
    const porDocumento = [];
    // Solo los documentos que propusieron ese perímetro: uno del mismo ejercicio que no decidió (Parma 2023 consolidato, sin tablas reconocidas)
    // no recibe un ajuste que no le corresponde; sigue frenando en la compuerta.
    for (const [k, v] of unicos) if (v !== valor) for (const { e } of props.filter(({ e, r }) => (e.periodo?.cierre || e.md) === k && r.propuesta === v)) porDocumento.push({ pdf: e.pdf, valor: v, cierre: k });
    if (!valor && !porDocumento.length && pendJev && !ejecutar) { out.push({ carpeta: c, valor: null, porDocumento, pendienteJev: true, detalle: `${evidencia}; ${pendJev} documento(s) sin respuesta guardada de Claude (A2) o de Jev: se deciden al ejecutar solo si A2 ve un único estado o el voto alcanza; si no, el lote frena` }); continue; }
    if (!valor && !porDocumento.length) { out.push({ carpeta: c, valor: null, porDocumento, detalle: 'ningún documento del club decide' }); continue; }
    // los documentos que decidió el paso A2 (Claude) quedan en la `evidencia` del ajuste ("A2 (Claude): <md>; <md>"), para la
    // auditoría a posteriori (--auditar-a2).
    const a2 = props.filter(({ r }) => r.propuesta && /^A2 \(Claude\)/.test(r.motivo || '')).map(({ e }) => e.md);
    const evA2 = (mds) => (mds.length ? `A2 (Claude): ${mds.join('; ')}` : null);
    if (ejecutar) {
      if (valor) agregarAjuste({ pdf: c, campo: 'perimetro', valor, motivo: `perimetro-senales.mjs: ${evidencia}`, evidencia: evA2(a2.filter((m) => !porDocumento.some((d) => m === d.pdf.replace(/\.pdf$/i, '.md')))), autor: 'perimetro-senales' });
      for (const d of porDocumento) agregarAjuste({ pdf: d.pdf, campo: 'perimetro', valor: d.valor, motivo: `perimetro-senales.mjs: el ejercicio ${d.cierre} se publicó solo ${d.valor}${valor ? ` (el club es ${valor})` : ' (el club no tiene un perímetro único)'}; ${evidencia}`, evidencia: evA2(a2.filter((m) => m === d.pdf.replace(/\.pdf$/i, '.md'))), autor: 'perimetro-senales' });
    }
    out.push({ carpeta: c, valor, porDocumento, escrito: ejecutar, detalle: `${evidencia}${porDocumento.length ? `; por documento: ${porDocumento.map((d) => `${d.pdf.split('/').pop()} ${d.valor}`).join(', ')}` : ''}` });
  }
  return out;
}

// ---------------------------------------------------------------- CLI
const pct = (x) => (x == null ? '—' : `${x >= 0 ? '+' : ''}${(x * 100).toFixed(1)}%`);
export function linea(r) {
  const b = r.pasoA === 'los-dos'
    ? ` · C1 ${r.c1.voto ? 'sí' : 'no'} (${pct(r.c1.dif)} / ant ${pct(r.c1.difAnterior)}) · C2 ${r.c2.voto ? 'sí' : 'no'} (ind ${pct(r.c2.crecIndividual)} vs cons ${pct(r.c2.crecConsolidado)}) · C3 ${r.c3.voto === null ? '?' : r.c3.voto ? 'sí' : 'no'}${r.c3.confianza != null ? ` (${r.c3.confianza.toFixed(2)})` : ''}${r.c3.error ? ` ERROR ${r.c3.error}` : ''}`
    : '';
  return `${(r.propuesta || 'COLA').padEnd(11)} [${r.pasoA}] ${r.motivo}${b}`;
}

async function main() {
  // --auditar-a2 <carpeta>: la auditoría a posteriori del paso A2. Junta los documentos que decidió A2 en una corrida real (los
  // que nombra la `evidencia` de un ajuste `perimetro` firmado por perimetro-senales) y deja un pedido por documento para un subagente de la
  // sesión, que abre el .md y dice, con cita, si el estado de resultados es del grupo o de la sociedad sola (instruccion.txt). Un error se
  // corrige con un ajuste del documento, y sube el umbral, cambia un peso o agrega un criterio; después se mide otra vez con
  // Admin/mediciones/perimetro-a2-medicion.txt.
  const auditarF = flagVal('--auditar-a2');
  if (auditarF) {
    const { writeFileSync } = await import('node:fs');
    const aj = readFileSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
      .filter((a) => a.campo === 'perimetro' && a.autor === 'perimetro-senales' && !a.anulado && /^A2 \(Claude\): /.test(a.evidencia || ''));
    const pedidos = []; const vistos = new Set();
    for (const a of aj) for (const md of a.evidencia.replace(/^A2 \(Claude\): /, '').split('; ')) {
      if (vistos.has(md) || !existsSync(resolve(ROOT, md))) continue; vistos.add(md);
      pedidos.push({ n: pedidos.length + 1, md, decidido: a.valor, ajuste: a.pdf, fecha: a.fecha });
    }
    const dir = carpetaDeTrabajo('--auditar-a2', auditarF); mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'instruccion.txt'), `Para cada pedido de pedidos.jsonl: abrí el .md (md) con grep/sed por partes, ubicá el estado de resultados del ejercicio y decidí si es CONSOLIDADO (incluye a la sociedad y a sus controladas) o INDIVIDUAL (la sociedad sola). El pipeline decidió "decidido". Escribí <n>.json con {"perimetro": "consolidado"|"individual"|"no sé", "coincide": true|false, "cita": "línea del .md y qué dice", "explicacion": "una o dos oraciones"}. No edites nada del repositorio.`);
    writeFileSync(resolve(dir, 'pedidos.jsonl'), pedidos.map((p) => JSON.stringify(p)).join('\n') + (pedidos.length ? '\n' : ''));
    console.log(`${pedidos.length} documento(s) decididos por A2 para auditar en ${auditarF}${pedidos.length ? ' (instruccion.txt + pedidos.jsonl)' : ''}.`); return;
  }
  // --decidir-clubes <lista de carpetas> [--solo-cache]: ENSAYO de la decisión de perímetro de cada club (la misma de lote.mjs),
  // sin escribir ajustes; con --solo-cache, A2 solo usa respuestas guardadas (lo que falta queda pendiente, no se paga).
  const decidirF = flagVal('--decidir-clubes');
  if (decidirF) {
    const registro = readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
    const carpetas = readFileSync(resolve(ROOT, decidirF), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    const { ajustePerimetroDe } = await import('./ajustes.mjs');
    for (const c of carpetas) {
      const pdfs = registro.filter((x) => x.pdf.startsWith(c)).map((x) => x.pdf);
      const [r] = await fijarPerimetroDeClubes(pdfs, { registro, ejecutar: false, jev: true, faltaPerimetro: () => true });
      const ajuste = ajustePerimetroDe(c)?.valor || '—';
      console.log(`${c.padEnd(48)} club: ${String(r?.valor ?? 'sin decidir').padEnd(12)} ajuste actual: ${String(ajuste).padEnd(12)} por documento: ${(r?.porDocumento || []).map((d) => `${d.pdf.split('/').pop()} ${d.valor}`).join(', ') || '—'}${r?.pendienteJev ? ' (A2 sin caché)' : ''}`);
    }
    return;
  }
  const evaluarA3 = flagVal('--evaluar-a3');
  if (evaluarA3) {
    const dir = resolve(ROOT, evaluarA3); const { ajustePerimetroDe } = await import('./ajustes.mjs');
    const cuenta = { bien: 0, mal: 0, noDecide: 0, sinVerdad: 0 };
    for (const l of readFileSync(resolve(dir, 'pedidos.jsonl'), 'utf8').split('\n')) {
      if (!l.trim()) continue; const p = JSON.parse(l);
      const lineas = readFileSync(resolve(ROOT, p.md), 'utf8').split('\n'); const ped = pedidoA3(lineas, deporteDePdf(p.md.replace(/\.md$/, '.pdf')));
      const f = resolve(dir, `${p.n}.json`); const datos = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
      const c = compuertaA3(datos, ped.mandadas, lineas); const verdad = ajustePerimetroDe(p.md.replace(/\.md$/, '.pdf'))?.valor || null;
      const marca = !c.perimetro ? 'no decide' : !verdad ? 'sin verdad' : c.perimetro === verdad ? 'ok' : 'MAL';
      cuenta[{ 'no decide': 'noDecide', 'sin verdad': 'sinVerdad', ok: 'bien', MAL: 'mal' }[marca]]++;
      console.log(`${marca.padEnd(10)} ${p.md.replace(/^Clubes\//, '').padEnd(64)} A3: ${c.perimetro || '—'}${c.perimetro ? ` ("${c.controlada}" L${c.linea})` : ` (${c.motivo})`} · fijado: ${verdad || '—'}`);
    }
    console.log(`\nA3: ${cuenta.bien} bien, ${cuenta.mal} mal, ${cuenta.noDecide} no decide, ${cuenta.sinVerdad} sin perímetro fijado para comparar`); return;
  }
  const verdadF = flagVal('--verdad'); const listaF = flagVal('--lista'); const mdF = flagVal('--md');
  let items = [];
  if (verdadF) items = readFileSync(resolve(ROOT, verdadF), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => { const [md, per] = l.split('\t'); return { md, verdad: per }; });
  else if (listaF) items = readFileSync(resolve(ROOT, listaF), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((p) => ({ md: p.replace(/\.pdf$/i, '.md') }));
  else if (mdF && args.includes('--ver-a2')) { const L = readFileSync(resolve(ROOT, mdF), 'utf8').split('\n'); console.log(textoA2(titulosDelDocumento(L), portadaDelDocumento(L))); return; } // lo que recibiría Claude en A2, sin llamarlo
  else if (mdF) items = [{ md: mdF }];
  else { console.error('Uso: --verdad <tsv> | --lista <txt> | --md <archivo.md>  [--jev] [--detalle]  (ver la cabecera)'); process.exit(1); }

  // --exportar-a2 <carpeta>: para medir A2 sin API. Por cada documento que pasaría por A2 y no está en caché, escribe <n>.txt con el texto
  // que recibiría Claude y pedidos.jsonl con { n, md, clave }. Las respuestas ({ clave, md, datos } por línea) se agregan a
  // Generados/_cache/claude-perimetro.jsonl y la corrida con --jev las toma de ahí. La instrucción (SISTEMA_A2) va en sistema.txt.
  const exportarF = flagVal('--exportar-a2');
  if (exportarF) {
    const dir = carpetaDeTrabajo('--exportar-a2', exportarF); mkdirSync(dir, { recursive: true });
    const { writeFileSync } = await import('node:fs');
    // los pedidos de un club de otro deporte llevan su propia instrucción: sistema-<deporte>.txt (sistema.txt es la de fútbol, como siempre)
    writeFileSync(resolve(dir, 'sistema.txt'), sistemaA2('futbol'));
    if (!cacheA2) { cacheA2 = new Map(); if (existsSync(CACHE_A2)) for (const l of readFileSync(CACHE_A2, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); cacheA2.set(j.clave, j); } catch { /* línea rota */ } } }
    const pedidos = []; let n = 0;
    for (const it of items) {
      if (!existsSync(resolve(ROOT, it.md))) continue;
      const md = readFileSync(resolve(ROOT, it.md), 'utf8');
      if (tablasDeIngresos(md).tablas.length) continue; // el paso A decide: no pasa por A2
      const L = md.split('\n'); const tit = titulosDelDocumento(L);
      if (!tit.some((t) => t.tabla)) continue;
      const user = textoA2(tit, portadaDelDocumento(L)); const dep = deporteDePdf(it.md.replace(/\.md$/, '.pdf')); const clave = createHash('sha1').update(JSON.stringify([sistemaA2(dep), user])).digest('hex');
      if (cacheA2.has(clave)) continue;
      if (dep !== 'futbol') writeFileSync(resolve(dir, `sistema-${dep || 'sin-deporte'}.txt`), sistemaA2(dep));
      n++; writeFileSync(resolve(dir, `${n}.txt`), user); pedidos.push({ n, md: it.md, clave });
    }
    writeFileSync(resolve(dir, 'pedidos.jsonl'), pedidos.map((x) => JSON.stringify(x)).join('\n') + '\n');
    console.log(`${pedidos.length} pedido(s) en ${exportarF}`); return;
  }
  // --exportar-a3 <carpeta>: los pedidos de A3 de los documentos de la lista donde A2 (guardado) ve los dos
  // estados: <n>.txt con el texto que recibiría Claude, sistema.txt, esquema.json y pedidos.jsonl { n, md, clave }. Las respuestas van en
  // <n>.json (las escribe un subagente). --evaluar-a3 <carpeta>: aplica la compuerta a cada <n>.json y lo compara con el ajuste `perimetro`
  // ya fijado (del documento o del club). No escribe en la caché: es una medición.
  const exportarA3 = flagVal('--exportar-a3');
  if (exportarA3) {
    const dir = carpetaDeTrabajo('--exportar-a3', exportarA3); mkdirSync(dir, { recursive: true });
    const { writeFileSync } = await import('node:fs');
    writeFileSync(resolve(dir, 'sistema.txt'), sistemaA3('futbol')); writeFileSync(resolve(dir, 'esquema.json'), JSON.stringify(ESQUEMA_A3, null, 1));
    const pedidos = [];
    for (const it of items) {
      if (!existsSync(resolve(ROOT, it.md))) continue;
      const r = await proponer(it.md, { soloCache: true });
      if (r.pasoA !== 'a2-los-dos') continue;
      const depA3 = deporteDePdf(it.md.replace(/\.md$/, '.pdf')); const p = pedidoA3(readFileSync(resolve(ROOT, it.md), 'utf8').split('\n'), depA3); if (!p) continue;
      if (depA3 !== 'futbol') writeFileSync(resolve(dir, `sistema-${depA3 || 'sin-deporte'}.txt`), sistemaA3(depA3));
      const n = pedidos.length + 1; writeFileSync(resolve(dir, `${n}.txt`), p.user); pedidos.push({ n, md: it.md, clave: p.clave });
    }
    writeFileSync(resolve(dir, 'pedidos.jsonl'), pedidos.map((x) => JSON.stringify(x)).join('\n') + '\n');
    console.log(`${pedidos.length} pedido(s) de A3 en ${exportarA3}`); return;
  }
  const res = { bien: 0, mal: 0, cola: 0 }; const malos = [];
  for (const it of items) {
    if (!existsSync(resolve(ROOT, it.md))) { console.log(`FALTA .md    ${it.md}`); res.cola++; continue; }
    const r = await proponer(it.md, { jev: USE_JEV });
    let marca = '';
    if (it.verdad) {
      if (!r.propuesta) { res.cola++; marca = 'cola'; }
      else if (r.propuesta === it.verdad) { res.bien++; marca = 'ok  '; }
      else { res.mal++; marca = 'MAL '; malos.push(`${it.md}: propuso ${r.propuesta}, verdad ${it.verdad}`); }
    }
    console.log(`${marca ? marca + ' ' : ''}${it.md.replace(/^Clubes\//, '').padEnd(70)} ${linea(r)}`);
    if (DETALLE) for (const t of r.tablas) console.log(`      L${t.linea} ${String(t.per).padEnd(11)} r${t.rango} ${t.etiqueta.padEnd(40)} ${t.actual} | ${t.anterior}   ← ${t.titulo || '(sin título con perímetro)'}`);
  }
  if (items.some((i) => i.verdad)) {
    console.log(`\nRESULTADO: ${res.bien} bien · ${res.mal} MAL · ${res.cola} a la cola  (de ${items.length})`);
    for (const m of malos) console.log('  MAL ' + m);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) main();

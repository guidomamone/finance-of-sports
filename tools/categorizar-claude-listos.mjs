// ============================================================================
// tools/categorizar-claude-listos.mjs — los documentos LISTOS (producción): el .jev.json y el .rubros.json pasan a .categorias.json con el escalón 2 cuando hace falta
// Mudado de tools/categorizar-claude.mjs sin cambiar una línea (salvo `export`); tools/categorizar-claude.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { resolverDeporte, MENSAJE_SIN_DEPORTE } from './deporte-club.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { huellaRubros, huellaJev, categoriasAlDia, leerLista } from './huellas.mjs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { registrarAprendidas, lineasAprendidas, MIN_PRECEDENTE, padreDe } from './memoria-categorias.mjs';
import { abrirCache } from './respuestas-cache.mjs';
import { reglaDeNota } from './reglas-categoria.mjs';
import { readJsonl } from './categorizar-claude-backtest.mjs';
import { catsDe, norm, allLines, precedenteFamilia, makeRetriever, readKey, categorizarConClaude } from './categorizar-claude.mjs';

const root = resolve(import.meta.dirname, '..');
const NOT_A_LINE = 'no_es_rubro';

// ---------------------------------------------------------------------------------------------------------
// LISTOS (producción): <md>.jev.json + <md>.rubros.json -> <md>.categorias.json con el escalón que decidió cada rubro.
export async function listos(opt) {
  const ledgerPath = resolve(root, 'Admin', 'registros', 'transcripciones-estado.jsonl');
  const ledger = readJsonl(ledgerPath);
  // Trabajo = documentos con .rubros.json y .jev.json cuyo .categorias.json falta o se hizo sobre otra lista de rubros u otro .jev.json
  // (huellas, ver tools/huellas.mjs). Y si el .jev.json mismo está desactualizado respecto de la lista de rubros, NO se manda a Claude:
  // primero tiene que rehacerlo Jev (bug real: 44 documentos, US$ 1,90, categorizados con un .jev.json de la lista vieja).
  // `--lista <archivo>`: solo esos PDFs (lo pasa pipeline.mjs, así la etapa 5b toca SOLO los documentos de la corrida).
  const lista = opt.lista ? leerLista(resolve(root, opt.lista)) : null;
  const rubrosDe = (md) => { try { return JSON.parse(readFileSync(resolve(root, derivado(md, '.rubros.json')), 'utf8')); } catch { return null; } };
  const jevDe = (md) => { try { return JSON.parse(readFileSync(resolve(root, derivado(md, '.jev.json')), 'utf8')); } catch { return null; } };
  let docs = ledger.filter((e) => e.md && e.jev === 'listo-para-jev' && (!lista || lista.has(e.pdf)) && !categoriasAlDia(resolve(root, e.md)));
  const jevViejo = docs.filter((e) => { const rj = rubrosDe(e.md); const jj = jevDe(e.md); return !rj || !jj || jj.rubrosHuella !== huellaRubros(rj); });
  docs = docs.filter((e) => !jevViejo.includes(e));
  if (jevViejo.length) console.log(`${jevViejo.length} documento(s) sin .jev.json al día con su lista de rubros: no se mandan a Claude (primero Jev).`);
  const sesion = opt.desdeSesion ? JSON.parse(readFileSync(resolve(root, opt.desdeSesion), 'utf8')) : null;
  if (sesion) docs = docs.filter((e) => e.pdf === sesion.pdf);
  if (sesion) opt.modelo = 'sesión (Claude Code)';
  docs = [...new Map(docs.map((e) => [e.md, e])).values()];
  if (opt.limit > 0) docs = docs.slice(0, opt.limit);
  console.log(`${docs.length} documento(s) con Jev hecho y sin categorías finales.${opt.dry ? ' (dry-run)' : ''}`);
  // además de lo cargado en el sitio, lo que Claude ya resolvió antes (tools/memoria-categorias.mjs, Admin/registros/categorias-aprendidas.jsonl,
  // confianza >= 0,80): entra como contexto del club y como ejemplos de otros clubes; producción siempre gana sobre lo aprendido.
  const prod = allLines(); const aprendidas = lineasAprendidas({ produccion: prod });
  const lines = [...prod, ...aprendidas]; const retriever = makeRetriever(lines); const apiKey = opt.dry || sesion ? null : readKey(); let cost = 0;
  const aprendidasFirmes = aprendidas.filter((l) => l.conf >= MIN_PRECEDENTE);
  if (aprendidas.length) console.log(`Memoria de categorías: ${aprendidas.length} rubros aprendidos de Claude (${aprendidasFirmes.length} usables como precedente del mismo club).`);
  // Memoria de respuestas: lo que Claude ya contestó para este club y lado no se vuelve a mandar.
  // `--sin-cache` pregunta todo de nuevo.
  const cacheClaude = abrirCache('claude'); let nDesdeCache = 0;
  for (const e of docs) {
    const rj = JSON.parse(readFileSync(resolve(root, derivado(e.md, '.rubros.json')), 'utf8'));
    const depDoc = resolverDeporte({ club: rj.club, pdf: e.pdf });
    if (!depDoc) { console.log(`  ${e.md}: NO SE CATEGORIZA: ${MENSAJE_SIN_DEPORTE(rj.club)}`); continue; }
    const carpetaClub = (String(e.md).match(/Clubes\/([^/]+\/[^/]+)\//) || [])[1] || rj.club;
    const jj = JSON.parse(readFileSync(resolve(root, derivado(e.md, '.jev.json')), 'utf8'));
    const jevBy = new Map(jj.rubros.map((r) => [norm(r.label), r]));
    const seen = new Set(); const rubros = [];
    for (const r of rj.rubros) {
      if (seen.has(norm(r.label))) continue; seen.add(norm(r.label));
      const j = jevBy.get(norm(r.label));
      // Escalón 0: precedente de lo CARGADO en el sitio; si no hay, de lo que Claude ya resolvió para este club con >= 0,90 (memoria).
      const ey = { excludeYear: rj.year != null ? String(rj.year) : null };
      // con familia de etiquetas y también para filas sin lado (precedenteFamilia(), arriba).
      const padreFila = padreDe(r.section);
      const precProd = precedenteFamilia(prod, rj.club, r.lado || null, r.label, { ...ey, padre: padreFila });
      // El escalón con contexto va primero: una respuesta de la misma etiqueta Y del mismo renglón que desglosa gana sobre el precedente sin
      // contexto. Con lo cargado Y lo aprendido: lo cargado ahora también sabe su nota (padres-filas.mjs).
      const conCtx = precedenteFamilia([...prod, ...aprendidasFirmes], rj.club, r.lado || null, r.label, { ...ey, padre: padreFila });
      const prec = conCtx?.via === 'exacto-con-contexto' ? conCtx : (precProd || precedenteFamilia(aprendidasFirmes, rj.club, r.lado || null, r.label, { ...ey, padre: padreFila }));
      const base = { label: r.label, lado: r.lado || null, section: r.section, glosa: r.glosa, page: r.page };
      // ESCALÓN 5a: "¿Claude ya respondió esto?" con clave carpeta del club + lado + etiqueta + NOTA. La carpeta y no
      // el id del club: Goiás tenía 'goias' (antes del alta) y 'goias-br' (después) con respuestas distintas para la misma etiqueta.
      const guardada = opt.sinCache ? null : cacheClaude.get(carpetaClub, r.lado, r.label, padreFila);
      // La REGLA ESCRITA por nota (CONVENCIONES-DATOS, NOTA-CATEGORÍA) gana sobre el precedente y sobre Jev: ellos repetían el error de un año a los otros.
      const regla = reglaDeNota({ clubId: rj.club, lado: r.lado, label: r.label, padre: padreFila });
      if (regla) rubros.push({ ...base, pendiente: false, ya: regla.cat, escalon: 0, precedenteDe: `regla:${regla.nota || 'cualquiera'}/${regla.concepto}` });
      else if (prec) rubros.push({ ...base, pendiente: false, ya: prec.cat, escalon: 0, precedenteDe: `${precProd ? 'sitio' : 'memoria-claude'}:${prec.via}` });
      else if (j && j.confidence >= opt.umbral) rubros.push({ ...base, pendiente: false, ya: j.choice, escalon: 1, jevConf: j.confidence });
      // Ya preguntado a Claude antes para este club y lado (tools/respuestas-cache.mjs): misma respuesta, sin pagar. Queda como escalón 2.
      else if (guardada) { rubros.push({ ...base, pendiente: false, ya: guardada.categoria, escalon: 2, confCache: guardada.confianza, motivo: guardada.motivo, jev: j?.choice, jevConf: j?.confidence, desdeCache: true }); nDesdeCache++; }
      else rubros.push({ ...base, pendiente: true, jev: j?.choice, jevConf: j?.confidence });
    }
    // --desde-sesion: el mismo resultado que devolvería categorizarConClaude, con las respuestas del archivo (sin API, costo 0).
    const deSesion = (pend) => {
      const porLabel = new Map((sesion.respuestas || []).map((x) => [norm(x.label), x]));
      const faltan = []; const malas = []; const resultados = [];
      pend.forEach((x, i) => { if (!x.pendiente) return; const s = porLabel.get(norm(x.label)); if (!s) faltan.push(x.label); else if (!(catsDe(depDoc)?.todas || []).includes(s.categoria) && s.categoria !== NOT_A_LINE) malas.push(`${x.label} -> ${s.categoria}`); else resultados.push({ idx: i, categoria: s.categoria, confianza: s.confianza ?? null, motivo: s.motivo || null }); });
      if (faltan.length || malas.length) return { error: `NO SE ESCRIBE: ${faltan.length ? `faltan ${faltan.length} rubro(s) (${faltan.slice(0, 5).join(' | ')})` : ''}${malas.length ? ` · categoría inexistente: ${malas.slice(0, 5).join(' | ')}` : ''}`, sinEscribir: true };
      return { resultados, costUsd: 0 };
    };
    const r = sesion && !opt.dry ? deSesion(rubros) : await categorizarConClaude({ club: rj.club, deporte: depDoc, year: rj.year, rubros, modelo: opt.modelo, esfuerzo: opt.esfuerzo, contextoClub: !opt.sinClub, lines, retriever, apiKey, dryRun: opt.dry });
    if (r.pendiente) { console.log(`  ${e.md}: pendiente de la Batch API (ola siguiente)`); continue; }
    if (r.sinEscribir) { console.log(`  ${e.md}: ${r.error}`); continue; }
    if (opt.dry) { console.log(`  ${e.md}: ${rubros.length} rubros (${rubros.filter((x) => x.escalon === 0).length} por precedente, ${rubros.filter((x) => x.escalon === 1).length} por Jev, ${rubros.filter((x) => x.pendiente).length} a Claude; ~${Math.round(r.promptChars / 4 || 0)} tokens)`); continue; }
    cost += r.costUsd || 0;
    const byIdx = new Map((r.resultados || []).map((x) => [x.idx, x]));
    const out = rubros.map((x, i) => (x.pendiente ? { ...x, escalon: 2, categoria: byIdx.get(i)?.categoria ?? null, confianza: byIdx.get(i)?.confianza ?? null, motivo: byIdx.get(i)?.motivo ?? r.error ?? null } : { ...x, categoria: x.ya, confianza: x.escalon === 0 ? 1 : x.escalon === 2 ? x.confCache : x.jevConf }));
    if (!r.error) for (const x of out) if (x.escalon === 2 && !x.desdeCache && x.categoria) cacheClaude.set(carpetaClub, x.lado, x.label, { categoria: x.categoria, confianza: x.confianza ?? null, motivo: x.motivo || null, modelo: opt.modelo }, padreDe(x.section));
    writeFileSync(resolve(root, derivado(e.md, '.categorias.json')), JSON.stringify({ md: e.md, club: rj.club, year: rj.year, generatedAt: new Date().toISOString(), rubrosHuella: huellaRubros(rj), jevHuella: huellaJev(jj), modelo: opt.modelo, costUsd: r.costUsd, error: r.error, rubros: out }, null, 1));
    // Lo que Claude resolvió con confianza >= 0,80 queda en la memoria para la próxima vez (pedido de Guido).
    const aprendidos = r.error ? 0 : registrarAprendidas({ club: rj.club, year: rj.year, md: e.md, modelo: opt.modelo, rubros: out });
    console.log(`  ${e.md}: ${out.length} rubros; Claude ${out.filter((x) => x.escalon === 2).length} ($${(r.costUsd || 0).toFixed(4)})${aprendidos ? `; ${aprendidos} a la memoria` : ''}${r.error ? ` ERROR ${r.error.slice(0, 120)}` : ''}`);
  }
  if (!opt.dry) console.log(`Costo total: $${cost.toFixed(3)}${nDesdeCache ? ` (${nDesdeCache} rubros sin preguntar: ya estaban en Generados/_cache/claude.jsonl)` : ''}`);
}

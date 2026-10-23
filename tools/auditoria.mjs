#!/usr/bin/env node
// ============================================================================
// tools/auditoria.mjs — QUIÉN AUDITA CADA BALANCE Y QUÉ DICE EL INFORME.
//
// DE DÓNDE SALE. De un registro, `Admin/registros/auditoria.jsonl`, una línea por club y ejercicio con balance, escrita por subagentes
// que leen el informe del auditor (no hay regex que clasifique un dictamen en veinte idiomas: "continuidad" aparece en las notas de casi
// todos los balances). Este script arma lo que el subagente lee, verifica lo que escribió y genera lo que lee el sitio.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «auditoria.mjs».
//
// USO:
//   node tools/auditoria.mjs                         verifica y escribe data/auditoria/
//   node tools/auditoria.mjs --check                 verifica y compara sin escribir (lo corre audit.js)
//   node tools/auditoria.mjs --pendientes            lista los club-años con balance y sin línea, con sus .md
//   node tools/auditoria.mjs --extractos [--solo id:anio,id:anio] [--max N]
//                                                    escribe en Generados/auditoria/<clubId>-<anio>.txt las partes de sus .md que
//                                                    importan (informe del auditor, opinión, firma), con número de línea, para el
//                                                    subagente, y al final sus rarezas ya revisadas (tools/rarezas.mjs); y Generados/auditoria/_lista.txt
//
// QUÉ GENERA: data/auditoria/<país>.js (window.CLUB_AUDITORIA[clubId][anio] = { auditor, dictamen, continuidad, alcance?, fuente:{md,linea} })
// y data/auditoria/_paises.js (window.AUDITORIA_PAISES, los países con archivo).
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execSync } from 'node:child_process';
import { loadSite } from './datos-sitio.mjs';
import { quien } from './quien.mjs';
import { rarezasDe, describir } from './rarezas.mjs';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const REGISTRO = 'Admin/registros/auditoria.jsonl';
const OUT = join(ROOT, 'data/auditoria');
const GEN = join(ROOT, 'Generados/auditoria');
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const CHECK = args.includes('--check');

const DICTAMENES = new Set(['sin_salvedades', 'con_salvedades', 'adverso', 'abstencion', 'sin_informe', 'falta_transcripcion']);
const TIPOS = new Set(['firma', 'persona', 'organismo']);
const ALCANCES = new Set(['revision_limitada', 'procedimientos_acordados', 'proposito_especial', 'grupo', 'federacion']);
// El nombre corto de cada red, para que "Deloitte & Touche SpA" y "Deloitte LLP" sean el mismo auditor en el sitio.
const REDES = [[/deloitte/i, 'Deloitte'], [/pricewaterhouse|\bpwc\b/i, 'PwC'], [/\bkpmg\b/i, 'KPMG'], [/ernst\s*&\s*young|\bey\b/i, 'EY'],
  [/\bbdo\b/i, 'BDO'], [/grant\s*thornton/i, 'Grant Thornton'], [/mazars/i, 'Forvis Mazars'], [/\brsm\b/i, 'RSM'], [/baker\s*tilly/i, 'Baker Tilly'],
  [/\bcrowe\b/i, 'Crowe']];

const { generic, clubs } = loadSite();
const errores = [];
const err = (n, m) => errores.push(`${REGISTRO}:${n}: ${m}`);

// --- los .md de cada club-año con balance ---------------------------------------------------------------------------------------------
const desc = new Set(readFileSync(join(ROOT, 'Admin/registros/documentos-descartados.txt'), 'utf8').split('\n')
  .filter(l => l.startsWith('Clubes/')).map(l => l.split(' # ')[0].trim().normalize('NFC')));
const parciales = readFileSync(join(ROOT, 'Admin/registros/documentos-parciales.txt'), 'utf8').normalize('NFC');
const tracked = execSync('git -c core.quotepath=off ls-files -z "Clubes/*.md"', { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 })
  .split('\0').filter(f => f && !/\/(_|README)/.test(f));
const trackedSet = new Set([...tracked, ...execSync('git -c core.quotepath=off ls-files -z "Ligas/*.md"', { cwd: ROOT, encoding: 'utf8' }).split('\0').filter(Boolean)].map(f => f.normalize('NFC'))); // Ligas/: balances de la entidad que organiza una liga
const conBalance = (id, y) => /balance/.test(generic[id]?.fiscalYearMeta?.[y]?.reportType || '');
// Un documento parcial (documentos-parciales.txt) cuenta solo si el sitio igual publica ese año desde él: su informe opina sobre lo que se
// muestra. Caso: Atalanta 2022. El sourceId es el clubId más el nombre del archivo, a veces sin su primera palabra
// (el club): "atalanta-it-bilancio-consolidato-2022" de "Atalanta-bilancio-consolidato-2022.pdf".
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esFuenteDe = (pdf, id, y) => {
  const sid = String(generic[id]?.fiscalYearMeta?.[y]?.sourceId || ''), b = slug(pdf.split('/').pop().replace(/\.pdf$/, ''));
  return !!sid && (sid.endsWith(b) || sid === `${id}-${b.split('-').slice(1).join('-')}`);
};
const mdsDe = {};
for (const md of tracked) {
  const pdf = md.replace(/\.md$/, '.pdf');
  if (desc.has(pdf.normalize('NFC'))) continue;
  const parcial = parciales.includes(pdf.normalize('NFC'));
  const q = quien(join(ROOT, pdf));
  if (q.error || q.clubDeCarpeta || !conBalance(q.clubId, q.year)) continue;
  if (parcial && !esFuenteDe(pdf, q.clubId, q.year)) continue;
  (mdsDe[`${q.clubId}|${q.year}`] ||= []).push(md);
}

// --- leer y verificar el registro -------------------------------------------------------------------------------------------------------
const norm = (s) => String(s).replace(/[‘’´`]/g, "'").replace(/[“”«»]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
const cache = new Map();
function chequearCita(n, c, clubId, anio, que, sinAnio = false) {
  if (!c || !c.md || !Number.isInteger(c.linea) || !c.texto) return err(n, `cita de ${que} incompleta (md, linea, texto)`);
  if (!trackedSet.has(c.md.normalize('NFC'))) return err(n, `cita de ${que}: ${c.md} no está trackeado`);
  if (!cache.has(c.md)) cache.set(c.md, readFileSync(join(ROOT, c.md), 'utf8').split('\n'));
  const ls = cache.get(c.md);
  if (!norm(ls.slice(Math.max(0, c.linea - 4), c.linea + 3).join(' ')).includes(norm(c.texto))) err(n, `cita de ${que}: el texto no está en ${c.md}:${c.linea} (±3)`);
  if (sinAnio) return;
  const q = quien(join(ROOT, c.md.replace(/\.md$/, '.pdf')), clubId);
  if (q.error || q.year !== anio) err(n, `cita de ${que}: ${c.md} es del ejercicio ${q.year ?? '?'}, no del ${anio}`);
}
const lineas = existsSync(join(ROOT, REGISTRO)) ? readFileSync(join(ROOT, REGISTRO), 'utf8').split('\n') : [];
// Las ligas del sitio, para las líneas de la entidad que organiza una liga (`ligaId` en vez de `clubId`).
const ligas = (() => { const ctx = vm.createContext({ window: {} }); vm.runInContext(readFileSync(join(ROOT, 'data/leagues.js'), 'utf8') + ';window.L=LEAGUES;', ctx); return ctx.window.L || {}; })();
const registro = new Map(), registroLigas = new Map();
lineas.forEach((l, i) => {
  const n = i + 1;
  if (!l.trim()) return;
  let o; try { o = JSON.parse(l); } catch (e) { return err(n, `JSON inválido (${e.message})`); }
  const esLiga = !!o.ligaId;
  const k = esLiga ? `liga:${o.ligaId}|${o.anio}` : `${o.clubId}|${o.anio}`;
  if (registro.has(k) || registroLigas.has(k)) return err(n, `${k} repetido`);
  if (esLiga) {
    if (!ligas[o.ligaId]) err(n, `ligaId "${o.ligaId}" no está en data/leagues.js`);
    if (!o.entidad || !o.entidad.nombre) err(n, 'una línea de liga lleva entidad.nombre (quién organiza la liga: AFA, LFP)');
  } else if (!conBalance(o.clubId, o.anio)) err(n, `${k}: no hay un balance cargado de ese ejercicio`);
  if (!DICTAMENES.has(o.dictamen)) err(n, `dictamen desconocido "${o.dictamen}"`);
  if (typeof o.continuidad !== 'boolean') err(n, 'continuidad tiene que ser true o false');
  const c = o.citas || {};
  if (o.dictamen === 'sin_informe' || o.dictamen === 'falta_transcripcion') {
    if (o.auditor) err(n, `${o.dictamen} no lleva auditor`);
    if (o.dictamen === 'falta_transcripcion' && !o.nota) err(n, 'falta_transcripcion lleva una nota que diga qué falta');
  } else {
    if (!o.auditor || !TIPOS.has(o.auditor.tipo) || !('nombre' in o.auditor)) err(n, 'auditor sin tipo conocido o sin el campo nombre');
    if (o.auditor && o.auditor.nombre === null && !o.nota) err(n, 'auditor con nombre null: la nota dice por qué no consta');
    chequearCita(n, c.auditor, o.clubId, o.anio, 'auditor', esLiga);
    chequearCita(n, c.dictamen, o.clubId, o.anio, 'dictamen', esLiga);
  }
  if (o.continuidad) chequearCita(n, c.continuidad, o.clubId, o.anio, 'continuidad', esLiga);
  if ('alcance' in o) {
    if (!ALCANCES.has(o.alcance)) err(n, `alcance desconocido "${o.alcance}"`);
    if (!o.auditor) err(n, 'alcance va solo con un informe que tiene auditor');
    if (!o.nota) err(n, 'alcance lleva una nota que diga qué dice el informe');
  }
  (esLiga ? registroLigas : registro).set(k, o);
});

// --- extractos para el subagente -------------------------------------------------------------------------------------------------------
// Encabezados y frases del informe del auditor en los idiomas de los documentos del sitio, más los nombres de las redes grandes.
const ANCLA = new RegExp([
  'informe de(l)? auditor', 'auditor(es)? independiente', 'dictamen', 'opini[oó]n', 'salvedad', 'revisor fiscal', 'empresa en funcionamiento',
  'certifica[çc][ãa]o legal', 'relat[óo]rio de auditoria', 'revisor oficial', 'reserva', 'continuidade',
  'relazione della societ[àa] di revisione', 'giudizio', 'rilievi', 'continuit[àa] aziendale',
  "independent auditor", 'auditors.? report', 'opinion', 'going concern', 'material uncertainty', 'qualified', 'emphasis of matter',
  'bestätigungsvermerk', 'revisionsstelle', 'prüfungsurteil', 'bericht der revisionsstelle', 'eingeschränkt',
  'controleverklaring', 'oordeel', 'continuïteit', 'revisors beretning', 'uavhengig revisor', 'fortsatt drift', 'konklusion',
  'έκθεση ελέγχου', 'γνώμη', 'ορκωτ', 'аудиторское заключение', 'мнение', '監査報告', '意見',
  // estonio, del criterio de Finanzas (Generados/auditoria/_criterio-ee.md): "SÕLTUMATU VANDEAUDIITORI
  // ARUANNE", la opinión, con salvedades, adverso, abstención, continuidad y énfasis. Medido: 43 de 66 .md estonios con extracto (antes 0),
  // los 43 con línea "sin_salvedades"; los 23 sin ninguna mención de auditoría siguen "sin frases" (los "sin_informe").
  'vandeaudiitor', 'meie arvates', 'märkusega arvamus', 'vastupidine arvamus', 'arvamuse avaldamisest loobumine', 'tegevuse jätkuvus', 'asjaolu rõhutamine',
].join('|') + '|' + REDES.map(([re]) => re.source).join('|'), 'i');
function extracto(mds) {
  const partes = [];
  for (const md of mds) {
    const ls = readFileSync(join(ROOT, md), 'utf8').split('\n');
    const marcas = new Set();
    ls.forEach((l, i) => { if (ANCLA.test(l)) for (let j = Math.max(0, i - 6); j <= Math.min(ls.length - 1, i + 12); j++) marcas.add(j); });
    if (!marcas.size) { partes.push(`=== ${md} (${ls.length} líneas): sin frases de un informe del auditor ===`); continue; }
    partes.push(`=== ${md} (${ls.length} líneas) ===`);
    let ant = -2;
    for (const j of [...marcas].sort((a, b) => a - b)) { if (j !== ant + 1) partes.push('…'); partes.push(`${j + 1}: ${ls[j]}`); ant = j; }
  }
  // Las erratas de estos documentos que alguien ya revisó (tools/rarezas.mjs): el subagente no las vuelve a reportar (Goiás 2018, la fecha del pie).
  const rs = mds.flatMap((md) => rarezasDe(md));
  if (rs.length) partes.push('', '=== Rarezas ya revisadas de estos documentos (no volver a reportarlas) ===', ...rs.map(describir));
  return partes.join('\n');
}

const pendientes = [];
for (const [id, c] of Object.entries(generic)) for (const y of Object.keys(c.fiscalYearMeta || {}).map(Number))
  if (conBalance(id, y) && !registro.has(`${id}|${y}`)) pendientes.push({ id, y, mds: mdsDe[`${id}|${y}`] || [] });
const faltan = [...registro.values()].filter(o => o.dictamen === 'falta_transcripcion');

if (args.includes('--pendientes')) {
  for (const p of pendientes) console.log(`${p.id}:${p.y}\t${p.mds.length ? p.mds.join(' | ') : '(sin .md)'}`);
  for (const o of faltan) console.log(`${o.clubId}:${o.anio}\tFALTA EN LA TRANSCRIPCIÓN: ${o.nota}`);
  for (const o of registroLigas.values()) if (o.dictamen === 'falta_transcripcion') console.log(`liga ${o.ligaId}:${o.anio}\tFALTA EN LA TRANSCRIPCIÓN: ${o.nota}`);
  console.error(`${pendientes.length} balances sin línea en ${REGISTRO}.`);
  process.exit(0);
}
if (args.includes('--extractos')) {
  const solo = flag('--solo') ? new Set(flag('--solo').split(',')) : null;
  const lista = pendientes.filter(p => p.mds.length && (!solo || solo.has(`${p.id}:${p.y}`))).slice(0, Number(flag('--max')) || Infinity);
  mkdirSync(GEN, { recursive: true });
  for (const p of lista) writeFileSync(join(GEN, `${p.id}-${p.y}.txt`), `${p.id} ${p.y} (${clubs[p.id]?.name || p.id})\n\n${extracto(p.mds)}\n`);
  writeFileSync(join(GEN, '_lista.txt'), lista.map(p => `${p.id}:${p.y}\tGenerados/auditoria/${p.id}-${p.y}.txt`).join('\n') + '\n');
  console.log(`${lista.length} extractos en Generados/auditoria/ (lista: Generados/auditoria/_lista.txt).`);
  process.exit(0);
}

if (errores.length) { console.error(errores.join('\n') + `\n\n${errores.length} error(es): no se escribe nada.`); process.exit(1); }

// --- generar ------------------------------------------------------------------------------------------------------------------------------
const corto = (a) => { if (!a || a.tipo !== 'firma' || !a.nombre) return a; const r = REDES.find(([re]) => re.test(a.nombre)); return r ? { ...a, nombre: r[1], legal: a.nombre } : a; };
const porPais = {};
for (const o of [...registro.values()].filter(o => o.dictamen !== 'falta_transcripcion').sort((a, b) => a.clubId.localeCompare(b.clubId) || a.anio - b.anio)) {
  const pais = clubs[o.clubId].country.toLowerCase();
  const c = o.citas || {};
  const fuente = c.dictamen ? { md: c.dictamen.md, linea: c.dictamen.linea } : null;
  ((porPais[pais] ||= {})[o.clubId] ||= {})[o.anio] = { auditor: corto(o.auditor) || null, dictamen: o.dictamen, continuidad: o.continuidad,
    ...(o.alcance ? { alcance: o.alcance } : {}), fuente };
}
const CAB = '// Generado por tools/auditoria.mjs desde Admin/registros/auditoria.jsonl. No editar a mano.\n';
const archivos = {};
for (const [p, d] of Object.entries(porPais))
  archivos[`${p}.js`] = `${CAB}window.CLUB_AUDITORIA = window.CLUB_AUDITORIA || {};\nObject.assign(window.CLUB_AUDITORIA, ${JSON.stringify(d, null, 1)});\n`;
const porLiga = {};
// Una liga con `falta_transcripcion` tampoco se publica (la tarjeta mostraría el código crudo y diría que no trae informe, cosa que no es cierta): queda como pendiente.
for (const o of [...registroLigas.values()].filter(o => o.dictamen !== 'falta_transcripcion')) { const c = o.citas || {};
  (porLiga[o.ligaId] ||= {})[o.anio] = { entidad: o.entidad, auditor: corto(o.auditor) || null, dictamen: o.dictamen, continuidad: o.continuidad,
    ...(o.alcance ? { alcance: o.alcance } : {}), fuente: c.dictamen ? { md: c.dictamen.md, linea: c.dictamen.linea } : null }; }
archivos['_ligas.js'] = `${CAB}window.LIGA_AUDITORIA = ${JSON.stringify(porLiga, null, 1)};\n`;
archivos['_paises.js'] = `${CAB}window.AUDITORIA_PAISES = ${JSON.stringify(Object.keys(porPais).sort())};\n`;

if (pendientes.length || faltan.length) console.error(`Aviso: ${pendientes.length} balances sin línea y ${faltan.length} con el informe sin transcribir (node tools/auditoria.mjs --pendientes).`);
const actuales = existsSync(OUT) ? readdirSync(OUT).filter(f => f.endsWith('.js')) : [];
if (CHECK) {
  const viejos = [...Object.keys(archivos).filter(f => !existsSync(join(OUT, f)) || readFileSync(join(OUT, f), 'utf8') !== archivos[f]), ...actuales.filter(f => !archivos[f])];
  if (viejos.length) { console.error(`data/auditoria/ desactualizado: ${viejos.join(', ')}`); process.exit(1); }
  console.log(`data/auditoria/ al día (${registro.size} balances).`);
} else {
  mkdirSync(OUT, { recursive: true });
  for (const f of actuales) if (!archivos[f]) rmSync(join(OUT, f));
  for (const [f, s] of Object.entries(archivos)) writeFileSync(join(OUT, f), s);
  console.log(`data/auditoria/: ${Object.keys(archivos).length} archivos, ${registro.size} balances.`);
}

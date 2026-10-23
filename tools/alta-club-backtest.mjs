// ============================================================================
// tools/alta-club-backtest.mjs — el backtest de las preguntas del alta contra clubes ya cargados y el --deshacer de un alta escrita
// Mudado de tools/alta-club.mjs sin cambiar una línea (salvo `export`); tools/alta-club.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync, mkdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import * as EV from './evidencia-club.mjs';
import { preguntarAClaude, paginas as paginasDe } from './alta-claude.mjs';
import { archivosData } from './data-clubes.js';
import { anioDelNombre } from './alta-club-lectura.mjs';
import { escribir } from './alta-club-escribir.mjs';
import { flagVal, MODELO, LIMITE, TOPE_USD, norm, ultimoDia, pad2, sha1, estadoTranscripciones } from './alta-club.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// ============================================================================
// BACKTEST: las mismas preguntas a clubes que YA están en el sitio, contra lo cargado
// ============================================================================
function cargarDatosSitio() {
  const sandbox = { console: { log() {}, warn() {}, error() {} } }; sandbox.window = sandbox; sandbox.globalThis = sandbox;
  sandbox.document = { createElement() { return {}; }, head: { appendChild() {} } };
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/club-leagues.js', ...archivosData()];
  for (const f of files) { try { vm.runInContext(readFileSync(resolve(ROOT, f), 'utf8'), ctx, { filename: f }); } catch { /* un archivo roto no frena el backtest */ } }
  return vm.runInContext('({ clubs, sources, generic: window.CLUB_GENERIC_DATA || {} })', ctx);
}

// Perímetro "verdadero" de lo cargado: no hay un campo, está en la nota de la fuente o en la cabecera
// del data file. Heurística por palabras; lo que no se puede decidir queda "?" y no cuenta para el acierto.
function perimetroCargado(nota) {
  const t = norm(nota || '');
  const cons = /consolidad|consolidated|koncern|konzern|konsern|grupo consolidado|group accounts|\bgrupo\b/.test(t);
  const ind = /individual|moderselskab|morselskap|no el grupo|no del grupo|no consolidad|separate|company only|sociedad (anonima )?deportiva sola|la sociedad|einzelabschluss|enkelvoudig/.test(t);
  if (cons && !/no del koncern|no el koncern|no el consolidado|no del consolidado|no del grupo|no el grupo/.test(t) && !ind) return 'consolidado';
  if (ind && !cons) return 'individual';
  if (/no del koncern|no el koncern|no el consolidado|no del consolidado|no del grupo|no el grupo/.test(t)) return 'individual';
  if (cons && ind) return '?';
  return 'individual?'; // sin mención: casi siempre un club-asociación sin grupo (una sola entidad)
}

// Perímetro revisado A MANO donde la heurística de palabras de perimetroCargado() se equivoca (leyendo la
// cabecera del data file y la nota de la fuente):
//   fckobenhavn-dk 2024: la nota dice "distinta de la holding consolidada PARKEN (no cargada)": se cargó la
//     entidad de fútbol sola, que NO consolida ("der ikke udarbejdet koncernregnskab") -> individual.
//   osijek-hr 2025: se cargó el informe COMBINADO (NK Osijek s.d.d. + FM 20 d.o.o. + la escuela) -> grupo.
const VERDAD_MANUAL = { 'fckobenhavn-dk|2024': { perimetro: 'individual' }, 'osijek-hr|2025': { perimetro: 'consolidado' } };
// la nota interna de la fuente vive en la evidencia del club, "## Fuentes" / "### <sourceId>"; `src.note` solo si quedara alguna vieja
const notaFuente = (src) => `${src.title || ''} ${src.label || ''} ${src.note || (src.clubId && src.id ? EV.textoDeFuente(EV.leer(src.clubId), src.id) : '')}`;
// Lo cargado en el sitio para ese club-año, en el mismo formato que las respuestas de Claude.
function verdadCargada(club, meta, y, nota) {
  const [mm] = String(club.fiscalYearStart || '07-01').split('-').map(Number);
  const mesCierre = mm === 1 ? 12 : mm - 1; // convención del sitio: el año del ejercicio es el de CIERRE
  return {
    perimetro: perimetroCargado(nota), reportType: meta.reportType,
    cierre: `${y}-${pad2(mesCierre)}-${pad2(ultimoDia(y, mesCierre))}`,
    moneda: meta.currency || club.reportingCurrency, name: club.name,
  };
}
// Nombre: sin mayúsculas, acentos, espacios ni puntuación ("Cruzados SADP" = "Cruzados S.A.D.P."), y vale
// que uno contenga al otro ("Club Atlético Vélez Sarsfield Asociación Civil" contiene al del sitio).
// Perímetro: "individual?" (la fuente no dice nada: club de una sola entidad) cuenta como individual; "?" no cuenta.
function aciertoBacktest(tipo, valor, v) {
  if (tipo === 'name') { const a = norm(valor).replace(/[^a-z0-9]+/g, ''); const b = norm(v).replace(/[^a-z0-9]+/g, ''); return !!a && (a === b || a.includes(b) || b.includes(a)); }
  if (tipo === 'perimetro') return v === '?' ? null : valor === v.replace('?', '');
  return valor === v;
}

// Recalcula el acierto de todo Admin/mediciones/backtests/altas-claude/backtest.jsonl con la verdad ACTUAL (gratis, sin API):
// así un arreglo de la heurística de la verdad no obliga a volver a pagar las llamadas.
export function modoInformeBacktest() {
  const datos = cargarDatosSitio();
  const p = resolve(ROOT, 'Admin/mediciones/backtests/altas-claude/backtest.jsonl');
  const filas = readFileSync(p, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const vistos = new Map(); for (const f of filas) vistos.set(`${f.md}|${f.modelo}`, f); // la última corrida de cada documento
  const por = {}; let citas = 0; let citasOk = 0; let costo = 0; const malas = [];
  for (const f of vistos.values()) {
    costo += f.costUsd || 0;
    const meta = datos.generic[f.clubId]?.fiscalYearMeta?.[f.anio];
    if (!meta) { console.log(`Aviso: ${f.clubId} ${f.anio} ya no está en el sitio (renombrado o quitado): se salta esa fila del backtest.`); continue; }
    const club = datos.clubs[f.clubId];
    const v = { ...verdadCargada(club, meta, f.anio, notaFuente((datos.sources || {})[meta.sourceId] || {})), ...(VERDAD_MANUAL[`${f.clubId}|${f.anio}`] || {}) };
    for (const x of f.filas) {
      const a = aciertoBacktest(x.tipo, x.valor, v[x.tipo]);
      const t = (por[x.tipo] ??= { n: 0, resueltas: 0, resueltasBien: 0, resueltasSinVerdad: 0, abiertas: 0, abiertasBien: 0 });
      t.n++;
      if (x.resuelta) { t.resueltas++; if (a === true) t.resueltasBien++; else if (a === null) t.resueltasSinVerdad++; else malas.push(`${f.clubId} ${f.anio} ${x.tipo}: claude=${JSON.stringify(x.valor)} cargado=${JSON.stringify(v[x.tipo])}`); }
      else { t.abiertas++; if (a) t.abiertasBien++; }
      for (const c of x.citas || []) { citas++; if (c.ok) citasOk++; }
    }
  }
  console.log(`Backtest: ${vistos.size} club-años, US$ ${costo.toFixed(3)} (US$ ${(costo / vistos.size).toFixed(4)} por club-año). Citas verificadas: ${citasOk}/${citas}.`);
  let R = 0; let RB = 0; let N = 0;
  for (const [k, t] of Object.entries(por)) {
    R += t.resueltas; RB += t.resueltasBien; N += t.n;
    console.log(`  ${k.padEnd(11)} resueltas ${t.resueltas}/${t.n}; de esas bien ${t.resueltasBien}/${t.resueltas - t.resueltasSinVerdad}${t.resueltasSinVerdad ? ` (+${t.resueltasSinVerdad} sin verdad)` : ''}; abiertas ${t.abiertas} (${t.abiertasBien} habrían estado bien)`);
  }
  console.log(`  TOTAL      resueltas ${R}/${N}; bien ${RB}`);
  if (malas.length) { console.log('Resueltas que NO coinciden con lo cargado (revisar a mano: puede estar mal Claude o la vara):'); for (const m of malas) console.log('  ' + m); }
}

export async function modoBacktest() {
  const datos = cargarDatosSitio();
  const est = estadoTranscripciones();
  const { clubDeRuta } = await import('./carpetas-clubes.mjs');
  const cand = [];
  for (const [md, estado] of est) {
    if (estado !== 'cargado') continue;
    const abs = resolve(ROOT, md); if (!existsSync(abs)) continue;
    const cr = clubDeRuta(md); if (!cr.clubId) continue;
    const club = datos.clubs[cr.clubId]; const g = datos.generic[cr.clubId]; if (!club || !g) continue;
    const y = anioDelNombre(basename(md)); const meta = y && g.fiscalYearMeta && g.fiscalYearMeta[y]; if (!meta || !meta.reportType) continue;
    const tam = statSync(abs).size; if (tam < 8000 || tam > 600000) continue;
    const txt = readFileSync(abs, 'utf8'); if (paginasDe(txt).length < 3) continue;
    const src = (datos.sources || {})[meta.sourceId] || {};
    // Qué documentos cita la fuente de ese año: el .md tiene que ser ESE (no otro documento del mismo año).
    const citaDoc = JSON.stringify(src).includes(basename(md, '.md')) || JSON.stringify(src).includes(basename(md).replace(/\.md$/, '.pdf'));
    cand.push({ md, clubId: cr.clubId, country: club.country, y, meta, club, nota: notaFuente(src), citaDoc, tam });
  }
  // Uno por país (el de sourceId que cita el documento, si hay), orden estable por sha1 para no elegir a mano.
  const porPais = new Map();
  for (const c of cand.sort((a, b) => (b.citaDoc - a.citaDoc) || sha1(a.md).localeCompare(sha1(b.md)))) if (!porPais.has(c.country)) porPais.set(c.country, c);
  const saltear = Number(flagVal('--saltear') || 0);
  const sel = [...porPais.values()].sort((a, b) => sha1(a.md).localeCompare(sha1(b.md))).slice(saltear, saltear + (LIMITE ?? 5));
  const outDir = resolve(ROOT, 'Admin/mediciones/backtests/altas-claude'); mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'backtest.jsonl');
  let costo = 0;
  for (const c of sel) {
    if (costo >= TOPE_USD) { console.error(`Tope de gasto alcanzado (US$ ${TOPE_USD}).`); break; }
    const verdad = verdadCargada(c.club, c.meta, c.y, c.nota);
    const pregs = [
      { id: 'perimetro', tipo: 'perimetro', texto: '¿Qué estados carga el sitio como "el club": los individuales o los consolidados?' },
      { id: 'reportType', tipo: 'reportType', texto: '¿Qué tipo de documento es?' },
      { id: 'cierre', tipo: 'cierre', texto: '¿Cuál es la fecha de cierre del ejercicio que presenta el documento?' },
      { id: 'moneda', tipo: 'moneda', texto: '¿En qué moneda están expresados los importes?' },
      { id: 'name', tipo: 'name', texto: '¿Cuál es el nombre legal completo de la entidad que emite los estados?' },
    ];
    const res = await preguntarAClaude({ md: readFileSync(resolve(ROOT, c.md), 'utf8'), preguntas: pregs, modelo: MODELO, tarea: 'alta-club-backtest', ctx: { carpeta: dirname(c.md).replace(/^Clubes\//, ''), documento: basename(c.md), pais: c.country } });
    costo += res.costUsd || 0;
    const filas = res.respuestas.map((x) => {
      const v = verdad[x.tipo];
      const acierto = aciertoBacktest(x.tipo, x.valor, v);
      return { tipo: x.tipo, valor: x.valor, verdad: v, acierto, resuelta: x.resuelta, confianza: x.confianza, motivoNoResuelta: x.motivoNoResuelta, citas: x.citas.map((q) => ({ pagina: q.pagina, ok: q.ok, motivo: q.motivo, texto: q.texto.slice(0, 160) })) };
    });
    appendFileSync(outPath, JSON.stringify({ ts: new Date().toISOString(), md: c.md, clubId: c.clubId, anio: c.y, modelo: res.model || MODELO, costUsd: res.costUsd, paginasEnviadas: res.paginasEnviadas, entero: res.entero, error: res.error, filas }) + '\n');
    console.log(`${c.clubId} ${c.y} (${c.md}) $${(res.costUsd || 0).toFixed(4)}${res.error ? ' ERROR ' + res.error : ''}`);
    for (const f of filas) console.log(`   ${f.tipo.padEnd(10)} ${f.resuelta ? 'RESUELTA ' : 'abierta  '} ${f.acierto === null ? '  ?' : f.acierto ? ' ok' : 'MAL'}  claude=${JSON.stringify(f.valor)} cargado=${JSON.stringify(f.verdad)}${f.resuelta ? '' : '  (' + f.motivoNoResuelta + ')'}`);
  }
  console.log(`\nCosto de esta corrida: US$ ${costo.toFixed(3)}. Detalle en Admin/mediciones/backtests/altas-claude/backtest.jsonl (se agrega, no se pisa).`);
}

// ============================================================================
// --deshacer <clubId> [--escribir] — deshace un alta ESCRITA y no commiteada. Una carga a mano que fallaba (cargar.mjs se revertía solo, el alta no) dejaba
// el alta en el árbol y había que revertirla a mano con git checkout y borrando los archivos nuevos, tres veces. Sin --escribir es un ENSAYO que dice qué haría.
//   - SOLO si el alta no está commiteada (el id no está en data/clubs.js de HEAD): lo commiteado se revierte con git.
//   - Lo que escribió el alta Y SE EDITA A MANO se deshace por líneas, sin pisar el resto del archivo: la entrada del club en data/clubs.js y sus líneas en data/club-leagues/*.js.
//   - Lo propio del club (data/<país>/<id>*, fuentes/<id>.html, la evidencia Admin/carga-clubes/<id>.md, sus páginas club/ y og/) se borra si no está commiteado.
//   - Lo puramente GENERADO (fuentes.html, y index.html solo si su diff son líneas de ASSET_V, sitemap.xml, club/, liga/, og/, rankings, club-index, ESTADO-clubes...) vuelve a HEAD con git checkout: se regenera.
//   - Cualquier OTRO archivo modificado (data/leagues.js, data/currency-map.js, idiomas, un país nuevo...) NO se toca y se lista como «revisar a mano»: puede traer ediciones a mano.
// ============================================================================
export function deshacerAlta(clubId, { escribir }) {
  const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
  const clubsPath = resolve(ROOT, 'data/clubs.js'); const clubsTxt = readFileSync(clubsPath, 'utf8');
  const lineaClub = new RegExp(`^\\s*['"]?${clubId}['"]?\\s*:\\s*\\{[^\\n]*\\},?[ \\t]*\\n`, 'm');
  if (!lineaClub.test(clubsTxt)) { console.error(`${clubId}: no está en data/clubs.js`); process.exit(1); }
  let enHead = ''; try { enHead = git(['show', 'HEAD:data/clubs.js']); } catch { /* sin HEAD */ }
  if (new RegExp(`['"]?${clubId}['"]?\\s*:\\s*\\{\\s*id:`).test(enHead)) { console.error(`${clubId} ya está commiteado en data/clubs.js: se revierte con git, no con --deshacer`); process.exit(1); }
  const acciones = []; const aMano = [];
  acciones.push({ txt: 'quitar su entrada de data/clubs.js', f: () => writeFileSync(clubsPath, clubsTxt.replace(lineaClub, '')) });
  // sus líneas en data/club-leagues/*.js
  for (const f of readdirSync(resolve(ROOT, 'data/club-leagues')).filter((x) => x.endsWith('.js'))) {
    const abs = resolve(ROOT, 'data/club-leagues', f); const t = readFileSync(abs, 'utf8'); const re = new RegExp(`^\\s*['"]?${clubId}['"]?\\s*:\\s*\\{[^\\n]*\\},?[ \\t]*\\n`, 'gm');
    if (re.test(t)) acciones.push({ txt: `quitar sus líneas de data/club-leagues/${f}`, f: () => writeFileSync(abs, t.replace(new RegExp(re.source, 'gm'), '')) });
  }
  // el estado del árbol en el sitio y lo generado
  const porc = git(['status', '--porcelain', '-uall', '--', 'data', 'index.html', 'fuentes', 'club', 'liga', 'og', 'fuentes.html', 'sitemap.xml', 'Admin/carga-clubes', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', 'Admin/sourcing']).split('\n').filter(Boolean).map((l) => ({ est: l.slice(0, 2), f: l.slice(3).replace(/^"|"$/g, '') }));
  const GENERADO = (f) => ['fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', 'data/club-index.js', 'data/sponsors.js', 'Admin/sourcing/pendientes.md'].includes(f)
    || /^(club|liga|og)\//.test(f) || /^fuentes\//.test(f) || /^data\/(rankings|faltantes|estimados|entidades)\//.test(f);
  const propio = (f) => f.includes(`/${clubId}.`) || f.includes(`/${clubId}-`) || f.includes(`/${clubId}/`) || f.endsWith(`/${clubId}`);
  const borrar = []; const restaurar = [];
  for (const { est, f } of porc) {
    if (f === 'data/clubs.js' || /^data\/club-leagues\//.test(f)) continue; // ya van por líneas
    if (f === 'Admin/registros/altas-club.jsonl') continue; // el registro de altas lo recalcula alta-club --todos --solo (se dice abajo)
    if (est === '??' && propio(f)) { borrar.push(f); continue; }
    if (est === '??' && GENERADO(f)) { borrar.push(f); continue; } // una página nueva generada (de otro club también: se regenera)
    // index.html NO es solo generado: lleva el código de la pantalla, que se edita a mano. Vuelve a HEAD solo si su diff son únicamente líneas de ASSET_V (la constante y los ?v=).
    if (f === 'index.html') {
      const lineas = git(['diff', '-U0', '--', 'index.html']).split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
      if (lineas.every((l) => /ASSET_V|\?v=/.test(l))) restaurar.push(f); else aMano.push('M index.html (trae más que ASSET_V: ediciones de pantalla; restaurá a mano solo las líneas de ASSET_V)');
      continue;
    }
    if (est !== '??' && GENERADO(f)) { restaurar.push(f); continue; }
    if (est !== '??' && propio(f)) { restaurar.push(f); continue; }
    aMano.push(`${est.trim() || '??'} ${f}`);
  }
  if (borrar.length) acciones.push({ txt: `borrar ${borrar.length} archivo(s) nuevos (del club o generados)`, f: () => { for (const f of borrar) { try { unlinkSync(resolve(ROOT, f)); } catch { /* ya no está */ } } } });
  if (restaurar.length) acciones.push({ txt: `volver a HEAD ${restaurar.length} archivo(s) generados o del club`, f: () => git(['checkout', '-q', '--', ...restaurar]) });
  console.log(`${escribir ? 'DESHACER' : 'ENSAYO de deshacer'} el alta de ${clubId}:`);
  for (const a of acciones) console.log(`  - ${a.txt}`);
  if (borrar.length) console.log(`    nuevos: ${borrar.slice(0, 12).join(', ')}${borrar.length > 12 ? `, … (+${borrar.length - 12})` : ''}`);
  if (restaurar.length) console.log(`    a HEAD: ${restaurar.slice(0, 12).join(', ')}${restaurar.length > 12 ? `, … (+${restaurar.length - 12})` : ''}`);
  if (aMano.length) console.log(`  REVISAR A MANO (no se tocan; pueden traer ediciones a mano): ${aMano.join(' | ')}`);
  console.log('  Después: node tools/alta-club.mjs --todos --solo "<país>/<club>" recalcula su línea del registro de altas (Admin/registros/altas-club.jsonl).');
  if (!escribir) { console.log('  Agregá --escribir para hacerlo.'); return; }
  for (const a of acciones) a.f();
  console.log('Hecho.' + (aMano.length ? ' Quedan los archivos de «revisar a mano».' : ''));
}


// ============================================================================
// tools/cargar-escribir.mjs — escribir un año en el sitio (edición de los data files, publicar, revertir, backtest y git): lo que hace cargar.mjs --escribir
// Mudado de tools/cargar.mjs sin cambiar una línea (salvo `export`); tools/cargar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync, appendFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { rutaData } from './data-clubes.js';
import { modificarClub, rutaJson } from './club-json.mjs';
import { TOCA_UNA_CARGA } from './rutas.mjs';
import { GENERADORES, queFalla } from './generadores.mjs';
import { derivado, marcarClub, HOY, norm, r6, cargarSitio } from './cargar.mjs';

const EV = await import('./evidencia-club.mjs'); // la evidencia de carga va a Admin/carga-clubes/<clubId>.md, no a data/
const ROOT = resolve(import.meta.dirname, '..');

// EDICIÓN DE ARCHIVOS JS: se busca el bloque por su apertura y se cierra por conteo de llaves (saltando strings y comentarios), nunca con
// una regex sobre el archivo entero (los data files viejos tenían comentarios con llaves; hay strings con comillas escapadas).
// ============================================================================
function cierreDe(src, abre) {
  let d = 0;
  for (let i = abre; i < src.length; i++) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) return -1; continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 1; if (i <= 0) return -1; continue; }
    if (c === "'" || c === '"' || c === '`') { for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++; continue; }
    if (c === '{' || c === '[') d++;
    else if (c === '}' || c === ']') { d--; if (d === 0) return i; }
  }
  return -1;
}
// LA LIGA DE UN AÑO EN data/club-leagues/<iso>.js, como texto (función pura: la prueba la corre
// sola). Si el club ya tiene ese año: en null se reemplaza; con la misma liga no se toca; con OTRA liga gana la que estaba y vuelve un aviso.
// Antes, un año con liga se agregaba OTRA VEZ dentro del objeto del club cuando quien llamaba no avisaba que "existe": bfo-rusia.mjs arma la
// liga con estado "pendiente", y las reescrituras de los años rusos dejaron 58 claves repetidas en ru.js (limpiadas a mano).
function ligaEnTexto(lt, id, y, val, archivo) {
  const clave = new RegExp(`(^|\\n)\\s*['"]?${id.replace(/[-]/g, '\\-')}['"]?\\s*:\\s*\\{`);
  const mm = lt.match(clave);
  if (!mm) return { texto: insertarEnObjeto(lt, 'Object.assign(window.CLUB_LEAGUE_BY_YEAR, {', `  ${js(id)}: { ${y}: ${val} },\n`, archivo) };
  const abre = lt.indexOf('{', mm.index + mm[0].length - 1); const cierra = cierreDe(lt, abre);
  const dentro = lt.slice(abre + 1, cierra).replace(/\s+$/, '');
  const yaEsta = new RegExp(`(^|[,{\\s])${y}\\s*:\\s*(null|'[^']*'|"[^"]*")`); const m = dentro.match(yaEsta);
  if (m && m[2] === 'null') return { texto: lt.slice(0, abre + 1) + dentro.replace(yaEsta, `$1${y}: ${val}`) + ' ' + lt.slice(cierra) };
  if (m) return { texto: lt, aviso: m[2] === val || val === 'null' ? null : `liga de ${id} ${y}: queda la que ya estaba en ${archivo} (${m[2]}); la carga proponía ${val}` };
  return { texto: lt.slice(0, abre + 1) + dentro + `${dentro.trim() && !dentro.trim().endsWith(',') ? ',' : ''} ${y}: ${val} ` + lt.slice(cierra) };
}
function insertarEnObjeto(src, apertura, texto, archivo) {
  // la apertura se busca al PRINCIPIO de una línea: el esqueleto de alta-club.mjs tenía un comentario que nombraba
  // "Object.assign(sources, {" y la búsqueda caía ahí (caso: Goiás 2021, "no pude cerrar el bloque"). Todas las aperturas son sentencias de primer nivel.
  const a = src.search(new RegExp('^' + apertura.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'm')); if (a < 0) throw new Error(`${archivo}: no encontré "${apertura}"`);
  const abre = src.indexOf('{', a + apertura.length - 1); const cierra = cierreDe(src, abre);
  if (cierra < 0) throw new Error(`${archivo}: no pude cerrar el bloque "${apertura}"`);
  let antes = src.slice(0, cierra); const tras = src.slice(cierra);
  const ult = antes.replace(/\s+$/, '');
  const sinComa = !/[,{]$/.test(ult.replace(/\/\/[^\n]*$/, '').replace(/\s+$/, ''));
  if (sinComa) { const k = ult.replace(/\/\/[^\n]*$/, '').replace(/\s+$/, '').length; antes = antes.slice(0, k) + ',' + antes.slice(k); }
  if (!/\n$/.test(antes)) antes += '\n';
  return antes + texto + tras;
}
const js = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')}'`;
const num = (x) => (x === null || x === undefined ? 'null' : String(r6(x)));

function snapshot(extra = []) {
  const archivos = new Map();
  const add = (p) => { if (existsSync(p) && statSync(p).isFile()) archivos.set(p, readFileSync(p)); };
  (function walk(d) { for (const e of readdirSync(d)) { const f = join(d, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, 'data'));
  for (const e of readdirSync(resolve(ROOT, 'fuentes'))) if (e.endsWith('.html')) add(resolve(ROOT, 'fuentes', e));
  for (const d of ['club', 'liga', 'og']) if (existsSync(resolve(ROOT, d))) (function walk(x) { for (const e of readdirSync(x)) { const f = join(x, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, d)); // las páginas de club y de liga y sus imágenes
  for (const f of ['index.html', 'fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', ...extra]) add(resolve(ROOT, f));
  return archivos;
}
function revertir(snap, extra) {
  const actual = snapshot(extra); let restaurados = 0; let borrados = 0;
  for (const [p, buf] of snap) if (!actual.has(p) || !actual.get(p).equals(buf)) { writeFileSync(p, buf); restaurados++; }
  for (const p of actual.keys()) if (!snap.has(p)) { unlinkSync(p); borrados++; }
  return { restaurados, borrados };
}
function runNode(script, args) {
  try { return { code: 0, out: execFileSync('node', [resolve(ROOT, script), ...args], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'] }) }; }
  catch (e) { return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') }; }
}

// PUBLICAR (sacado de escribir() sin cambios para que lo reuse tools/caja-deuda.mjs): sube ASSET_V, corre los generadores y la
// auditoría; si audit.js da P0/P1, revierte todo lo que cambió desde `snap`. Lanza si un generador falla (quien llama revierte).
export function publicarCambios(snap, extra, escritos) {
  // ASSET_V (mismo criterio que alta-club.mjs: la constante Y cada ?v= literal, salvo que ya esté subido respecto de HEAD)
  const idxPath = resolve(ROOT, 'index.html'); const idx = readFileSync(idxPath, 'utf8');
  const actual = (idx.match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1];
  let enHead = null;
  try { enHead = (execFileSync('git', ['show', 'HEAD:index.html'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1]; } catch { enHead = null; }
  if (actual && (enHead === null || enHead === actual)) {
    const nuevo = /^\d+$/.test(actual) ? String(Number(actual) + 1) : `${actual}a`;
    const esc = actual.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    writeFileSync(idxPath, idx.replace(`window.ASSET_V = '${actual}'`, `window.ASSET_V = '${nuevo}'`).replace(new RegExp(`\\?v=${esc}(?=["'])`, 'g'), `?v=${nuevo}`));
    escritos.push(`index.html (ASSET_V ${actual} -> ${nuevo})`);
  }
  // la url del registro oficial de los informes XHTML que quedaron sin ella (Companies House, Virk): sola, para que nadie tenga que acordarse. No frena: si no la
  // encuentra o el informe no coincide con el archivo local, no escribe nada y el aviso `fuente-xhtml-sin-url` de audit.js queda.
  const urlXhtml = runNode('tools/fuente-url-xhtml.mjs', ['--todos', '--escribir']);
  if (/url escritas/.test(urlXhtml.out)) escritos.push('urls del registro oficial en fuentes XHTML (tools/fuente-url-xhtml.mjs)');
  // la segunda fuente de la liga de lo recién cargado (regla «la liga de un año necesita dos fuentes»): sola, con la url y el título de otro año de la misma liga. No frena: una liga en grupos
  // o sin año de referencia se queda con el aviso `liga-una-fuente` de audit.js y la resuelve una sesión (tools/segunda-fuente-liga.mjs).
  const segFuente = runNode('tools/segunda-fuente-liga.mjs', ['--pendientes', '--escribir']);
  const segN = (segFuente.out.match(/(\d+) guardada\(s\)/) || [])[1];
  if (segN && Number(segN) > 0) escritos.push(`segunda fuente de ${segN} liga(s) (tools/segunda-fuente-liga.mjs --pendientes)`);
  // generadores + auditoría
  for (const g of GENERADORES.filter((g) => existsSync(resolve(ROOT, g)))) { // la lista compartida con alta-club.mjs
    const r = runNode(g, []); if (r.code !== 0) throw new Error(`${g} falló (código ${r.code}): ${r.out.slice(-500)}`);
  }
  const audit = runNode('tools/audit.js', ['--quiet']);
  const linea0 = (audit.out.match(/P0 \d+ · P1 \d+[^\n]*/) || [''])[0];
  if (audit.code !== 0) { const rv = revertir(snap, extra); const falla = queFalla(audit.out); return { ok: false, motivo: `node tools/audit.js dio P0/P1 (${linea0}${falla.length ? `: ${falla.join(', ')}` : ''}); se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, audit: audit.out.slice(-2500), escritos }; }
  return { ok: true, escritos, audit: linea0 };
}
export { snapshot, revertir, runNode };

// COMPUERTA DE ESTADIO Y SPONSOR: un ejercicio nuevo no se escribe sin el estadio y el sponsor de camiseta de
// ese club y año. tools/estadio-sponsor.mjs los lee de la página de temporada de Wikipedia (gratis), los guarda en data/contexto/<iso>.js
// y sale con 1 si falta alguno; lo que falta se completa en tools/contexto-manual.json, con fuente. Función aparte, llamada en un solo
// punto antes de escribir (la compuerta del auditor va al lado).
export function compuertaContexto(P) {
  const E = P.ejercicio; const meta = E?.fiscalYearMeta || {};
  const cierre = meta.cierre || String(meta.fxRef || '').split('@')[1] || null;
  const args = ['--escribir', '--local', '--club', E.clubId, '--anio', String(E.year)]; // --local: la Wikipedia del país también (regla de Guido, Admin/PIPELINE.md, «Datos públicos de un club»)
  if (P.liga?.valor) args.push('--liga', P.liga.valor);
  if (cierre && /^\d{4}-\d{2}-\d{2}$/.test(cierre)) args.push('--cierre', cierre.slice(5));
  try { execFileSync('node', [resolve(ROOT, 'tools', 'estadio-sponsor.mjs'), ...args], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); return true; }
  catch (e) {
    console.error(`\nNo se escribe nada: falta el estadio o el sponsor de ${E.clubId} ${E.year} (compuerta del to-do 273).\n${String(e.stdout || '').split('\n').filter((l) => /falta|contexto-manual|sin liga|sin lista/.test(l)).join('\n') || e.message}`);
    return false;
  }
}

export function escribir(P) {
  const E = P.ejercicio; const id = E.clubId; const y = E.year;
  const dataRel = rutaData(id);
  const [paisCarpeta, clubCarpeta] = P.pdf.split('/').slice(1, 3);
  const fuentesMd = `Admin/sourcing/${paisCarpeta}/${clubCarpeta}.md`;
  const extra = existsSync(resolve(ROOT, fuentesMd)) ? [fuentesMd] : [];
  // la evidencia de carga (cabecera del año, nota de cada fila, ajustes, liga) va a Admin/carga-clubes/<clubId>.md: entra en
  // el snapshot para que un P0/P1 de la auditoría también lo revierta (y lo borre si lo creó esta carga).
  const evRel = EV.rutaRel(id);
  const extraRev = [...extra, evRel];
  const snap = snapshot(extraRev); const escritos = [];
  try {
    let ev = EV.leer(id);
    const lineaJ = (l) => ({ rawLabel: l.rawLabel, normalizedCategory: l.normalizedCategory, amountNative: r6(l.amountNative),
      ...(l.disclosureLevel !== undefined ? { disclosureLevel: l.disclosureLevel } : {}), ...(l.items ? { items: l.items.map((it) => [it[0], r6(it[1])]) } : {}) });
    // la nota de cada fila (página y escalón de su categoría) va a la tabla del año en la evidencia, con su número de fila
    const notaFila = (l) => `pág. ${l._pag ?? '?'}, ${['precedente', 'Jev', 'Claude'][l._escalon] ?? '?'}${l._conf != null && l._escalon ? ` ${l._conf}` : ''}`;
    const tabla = (ls) => ls.map((l, i) => ({ fila: i + 1, rawLabel: l.rawLabel, nota: notaFila(l) }));
    // quien arma la propuesta puede decir de dónde salen las filas: `P.herramienta` y `P.origenFilas` (tools/bfo-rusia.mjs: el JSON
    // del fisco ruso, sin proponer-carga ni categorías.json). Sin eso, el texto de siempre.
    const origenFilas = P.origenFilas || `Filas: proponer-carga.mjs (ancla-listas); categorías:\n${derivado(P.md, '.categorias.json', { crear: false })} (escalón de cada fila en la tabla).`;
    const cab = `${y}: cargado por ${P.herramienta || 'tools/cargar.mjs'} (${HOY}) desde ${P.md}. ${origenFilas} Tie-out contra lo impreso: ${P.totales.revImpreso ? `ingresos "${String(P.totales.revImpreso.label).slice(0, 60)}" pág. ${P.totales.revImpreso.pag}` : '-'}${P.totales.expImpreso ? `; gastos "${String(P.totales.expImpreso.label).slice(0, 60)}" pág. ${P.totales.expImpreso.pag}` : ''}${P.totales.patImpreso ? `; resultado "${String(P.totales.patImpreso.label).slice(0, 60)}"` : ''}.`.split('\n');
    // --reemplazar: lo que se conserva del año cargado, y se borran sus bloques (revenue, expense, meta) antes de insertar los nuevos.
    if (P.reemplaza) {
      const viejo = cargarSitio().generic[id] || {};
      const vm0 = (viejo.fiscalYearMeta || {})[y] || {};
      const conItems = [...(viejo.revenueLinesByYear?.[y] || []), ...(viejo.expenseLinesByYear?.[y] || [])].filter((l) => l.items);
      for (const l of [...E.revenueLines, ...E.expenseLines]) { const o = conItems.find((x) => norm(x.rawLabel) === norm(l.rawLabel)); if (o) l.items = o.items; }
      const M0 = E.fiscalYearMeta;
      if (M0.grossDebt == null && vm0.grossDebt != null) M0.grossDebt = vm0.grossDebt;
      if (M0.cash == null && vm0.cash != null) M0.cash = vm0.cash;
      // staffCost, el costo de personal que completa caja-deuda.mjs --personal: también se conserva (se perdía al rehacer
      // Panetolikos 2021-2025 con los sueldos separados).
      if (M0.staffCost == null && vm0.staffCost != null) M0.staffCost = vm0.staffCost;
      if (M0.gestionId == null && vm0.gestionId != null) M0.gestionId = vm0.gestionId;









      // también la evidencia que este script escribió para el año que se reemplaza (su cabecera "cargado por", sus
      // AJUSTE MANUAL, sus notas de meta y liga, y las tablas de filas): se vuelve a escribir abajo con lo de ahora, sin apilarse. Lo que
      // se escribió a mano en ese año no se toca.
      ev = EV.quitarLineas(ev, y, 'Ingresos', [new RegExp(`^${y}: cargado por `), /\.categorias\.json \(escalón (por línea al lado|de cada fila en la tabla)\)/]);
      ev = EV.quitarLineas(ev, y, 'Gastos', [/^tools\/cargar\.mjs \(\d{4}-\d{2}-\d{2}\)$/]);
      ev = EV.quitarLineas(ev, y, 'Meta', [new RegExp(`^${y}: AJUSTE MANUAL \\(`), /^tools\/cargar\.mjs \(\d{4}-\d{2}-\d{2}\)\. grossDebt\/cash/,
        /^incluidoEn: ajuste manual `incluye`/, /^ajuste manual `incluye`: el documento junta/, /^sinDesglose: líneas que el documento no desglosa/]);
      ev = EV.quitarLineas(ev, y, 'Liga', [/^tools\/cargar\.mjs \(\d{4}-\d{2}-\d{2}\): /]);
    }


    ev = EV.agregarTexto(ev, y, 'Ingresos', cab);
    ev = EV.ponerTabla(ev, y, 'Ingresos', tabla(E.revenueLines));
    ev = EV.ponerTabla(ev, y, 'Gastos', tabla(E.expenseLines));
    const M = E.fiscalYearMeta;
    // AJUSTES MANUALES: lo que Guido forzó para este documento queda a la vista en la evidencia del club, en la meta del año.
    const ajTxt = (P.ajustes || []).map((a) => `${y}: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, ${a.autor} ${a.fecha}): ${a.campo}${a.valor ? ` = ${a.valor}` : ''}. ${String(a.motivo).replace(/\n/g, ' ')}`);
    ev = EV.agregarTexto(ev, y, 'Meta', [...ajTxt, `tools/cargar.mjs (${HOY}). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.`,
      ...(M.incluidoEn ? ['incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.'] : []),
      ...(M.sinDesglose ? ['sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».'] : [])]);
    const metaJ = {
      // tramo corto de transición (menos de 12 meses, ver «TRAMO CORTO» en proponer): sus meses, para sacarlo del ranking, la mediana y los Δ
      ...(P.transicion && P.transicion.meses < 12 ? { periodMonths: P.transicion.meses } : {}),
      currency: M.currency, ...(M.fxRef ? { fxRef: M.fxRef } : M.fx != null ? { fx: r6(M.fx), fxSource: M.fxSource } : {}),
      sourceId: M.sourceId, reportType: M.reportType, gestionId: M.gestionId != null ? M.gestionId : null,
      profitOnPlayerSales: r6(M.profitOnPlayerSales || 0), assetSales: 0, netInterest: r6(M.netInterest ?? null), tax: r6(M.tax ?? null),
      ...(M.extraRows ? { extraRows: M.extraRows.map((x) => ({ label: x.label, value: r6(x.value ?? null) })) } : {}),
      ...(M.incluidoEn ? { incluidoEn: M.incluidoEn } : {}),
      ...(M.sinDesglose ? { sinDesglose: M.sinDesglose.map((x) => ({ renglon: x.renglon, lado: x.lado, importe: r6(x.importe), motivo: x.motivo, ...(x.tipo ? { tipo: x.tipo } : {}) })) } : {}),
      // la base del ingreso del año y, si el documento no lo imprime y se reconstruyó, su derivación (tools/ingreso-derivado.js; punto 455): sin esto el año queda sin marca y audit.js frena
      ...(M.baseIngreso ? { baseIngreso: M.baseIngreso } : {}), ...(M.derivacionIngreso ? { derivacionIngreso: M.derivacionIngreso } : {}),
      grossDebt: r6(M.grossDebt ?? null), cash: r6(M.cash ?? null), ...(M.staffCost != null ? { staffCost: r6(M.staffCost) } : {}),
      officialTotalRevenue: r6(M.officialTotalRevenue ?? null), officialTotalExpenses: r6(M.officialTotalExpenses ?? null), officialPAT: r6(M.officialPAT ?? null),
    };

    const S = E.source;
    // la nota INTERNA de la fuente va a la evidencia del club, no a un campo `note` de sources{}
    let fuenteNueva = null; let notaASumar = null;
    const dmy = (f) => f.split('-').reverse().join('/');
    const fuenteExistente = P.reemplaza ? cargarSitio().sources?.[S.id] : null;
    {
      const notaPrimero = P.primerEjercicio ? `Primer ejercicio de la sociedad: ${P.primerEjercicio.inicio && P.primerEjercicio.cierre ? `del ${dmy(P.primerEjercicio.inicio)} al ${dmy(P.primerEjercicio.cierre)} ` : ''}(${P.primerEjercicio.meses} meses).`
        : P.transicion && P.transicion.meses < 12 && P.transicion.inicio ? `Ejercicio de transición de ${P.transicion.meses} meses por cambio de la fecha de cierre: del ${dmy(P.transicion.inicio)} al ${dmy(P.transicion.cierre)}. No es comparable con un año de 12 meses.`
        : P.transicion ? `Ejercicio de transición por cambio de fecha de cierre: ${P.transicion.inicio ? `del ${dmy(P.transicion.inicio)} ` : ''}al ${dmy(P.transicion.cierre)} (${P.transicion.meses} meses).` : null;
      // el año salió de un informe XHTML (iXBRL): lo dice el encabezado del .md que escribe xhtml-aarsrapport.mjs. La fuente nace sin url, así que la página de fuentes lo dice con esta frase
      // (el PDF de ancla es la impresión de Chrome, no se publica como si fuera el original; la url del depósito oficial la pone fuente.mjs).
      // (`e` no existe en escribir(P): el .md de la propuesta es P.md; sin él, o ilegible, no hay nota)
      const notaXhtml = (() => { try { return P.md && /xhtml-aarsrapport\.mjs/.test(readFileSync(resolve(ROOT, P.md), 'utf8').slice(0, 400)) ? 'Informe oficial en formato XHTML (iXBRL)' : null; } catch { return null; } })();
      const notaPublica = [notaPrimero, P.suma?.nota, notaXhtml].filter(Boolean).join(' ');
      if (!fuenteExistente) {
        fuenteNueva = { id: S.id, clubId: S.clubId, title: S.title, type: S.type, reliability: S.reliability, ...(S.documento ? { documento: S.documento } : {}), ...(notaPublica ? { publicNote: notaPublica } : {}) };
        if (S.note) ev = EV.agregarFuente(ev, S.id, [S.note], 'note (cargar.mjs)');
      // Al recargar con --reemplazar un año cuya fuente ya existe, la fuente se conserva; pero si el año es un primer ejercicio o un tramo de
      // transición y su nota no está, se agrega al final de la nota pública que tenga (sin pisarla). Caso: Atalanta 2022, recargada como tramo
      // de 6 meses, quedaba sin la nota de transición y Onboarding la puso a mano con fuente.mjs --nota.
      } else if (notaPrimero && !String(fuenteExistente.publicNote || '').includes(notaPrimero)) notaASumar = notaPrimero;
    }
    // el club se escribe en su JSON (la fuente) y de ahí se regenera el data file: se convierte a los nombres de siempre, se
    // cambia el año y se valida contra el esquema antes de escribir nada.
    const [rj, rd] = modificarClub(id, (c) => {
      c.datos.revenueLinesByYear[y] = E.revenueLines.map(lineaJ);
      c.datos.expenseLinesByYear[y] = E.expenseLines.map(lineaJ);
      c.datos.fiscalYearMeta[y] = metaJ;
      if (fuenteNueva) c.sources[S.id] = fuenteNueva;
      if (notaASumar && c.sources[S.id]) c.sources[S.id].publicNote = [c.sources[S.id].publicNote, notaASumar].filter(Boolean).join(' ');
    });
    escritos.push(rj, rd);

    // liga
    const iso = String((cargarSitio().clubs[id] || {}).country || '').toLowerCase();
    const ligaPath = resolve(ROOT, 'data/club-leagues', `${iso}.js`);
    if (P.liga.estado !== 'existe') {
      if (!existsSync(ligaPath)) throw new Error(`no existe data/club-leagues/${iso}.js`);
      const r = ligaEnTexto(readFileSync(ligaPath, 'utf8'), id, y, P.liga.valor ? js(P.liga.valor) : 'null', `data/club-leagues/${iso}.js`);
      let lt = r.texto; if (r.aviso) P.avisos.push(r.aviso);
      // de dónde salió la liga: a la evidencia del club, no a data/club-leagues/
      ev = EV.agregarTexto(ev, y, 'Liga', [`tools/cargar.mjs (${HOY}): ${P.liga.valor || 'null'}, ${P.liga.valor ? `verificado contra ${P.liga.fuente}` : `SIN VERIFICAR (${P.liga.fuente})`}.`]);
      writeFileSync(ligaPath, lt); escritos.push(`data/club-leagues/${iso}.js`);
    }
    // cotización de mercado nueva
    if (P.fxCloseNuevo) {
      const cmPath = resolve(ROOT, 'data/currency-map.js'); const cm = readFileSync(cmPath, 'utf8');
      if (!cm.includes(`'${P.fxCloseNuevo.key}':`)) {
        // sin comentario: el `label` ya dice de dónde sale la cotización
        writeFileSync(cmPath, insertarEnObjeto(cm, 'const FX_CLOSE = {', `  '${P.fxCloseNuevo.key}': { fx: ${P.fxCloseNuevo.fx}, source: 'market_close', label: ${js(P.fxCloseNuevo.label)} },\n`, 'data/currency-map.js'));
        escritos.push('data/currency-map.js');
      }
    }
    escritos.push(EV.guardar(id, ev));
    // Admin/sourcing/<País>/<Club>.md (interno, no se publica)
    if (extra.length) { appendFileSync(resolve(ROOT, fuentesMd), `\n- Cargado en el sitio por tools/cargar.mjs (${HOY}): ejercicio ${y} desde \`${P.pdf}\` (sourceId \`${E.source.id}\`).\n`); escritos.push(fuentesMd); }
    // "POSIBLEMENTE DENTRO DE OTRO RUBRO": la misma escalera de tools/dentro-de-otro.mjs, sobre el club
    // entero y con el año recién escrito: el año nuevo nace con sus marcas y un año viejo gana o pierde las suyas si este año le cambia el
    // precedente. Antes de publicar, así un P0/P1 lo revierte todo junto.
    const marcas = marcarClub(id);
    if (marcas.cambio) for (const r of [rutaJson(id), dataRel]) if (!escritos.includes(r)) escritos.push(r);
    if (marcas.antes || marcas.despues) console.log(`"Posiblemente dentro de otro rubro" (tools/dentro-de-otro.mjs): marcas del club ${marcas.antes} → ${marcas.despues}${marcas.lineas.length ? `\n  ${marcas.lineas.join('\n  ')}` : ''}`);
    return publicarCambios(snap, extraRev, escritos);
  } catch (err) {
    const rv = revertir(snap, extraRev);
    return { ok: false, motivo: `${err.message} — se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, escritos };
  }
}

// ============================================================================
// BACKTEST (--comparar <raíz de otro checkout>): la propuesta contra el mismo ejercicio en producción
// ============================================================================
export function comparar(P, prod) {
  const cd = prod.generic[P.clubId]; const y = P.year;
  if (!cd || !(cd.fiscalYearMeta || {})[y]) return { sinProduccion: true };
  const pm = cd.fiscalYearMeta[y]; const E = P.ejercicio || { revenueLines: [], expenseLines: [], fiscalYearMeta: {} };
  const porCat = (ls) => { const o = {}; for (const l of ls || []) o[l.normalizedCategory] = (o[l.normalizedCategory] || 0) + Math.abs(l.amountNative); return o; };
  const bien = (prodL, propL) => { const Pc = porCat(prodL); const Q = porCat(propL); const tot = Object.values(Pc).reduce((a, x) => a + x, 0); if (!tot) return null; let m = 0; for (const [c, v] of Object.entries(Pc)) m += Math.min(v, Q[c] || 0); return r6(m / tot); };
  const deMas = (prodL, propL) => { const Pc = porCat(prodL); const Q = porCat(propL); const tot = Object.values(Pc).reduce((a, x) => a + x, 0); if (!tot) return null; let m = 0; for (const [c, v] of Object.entries(Q)) m += Math.max(0, v - (Pc[c] || 0)); return r6(m / tot); };
  const sum = (ls) => (ls || []).reduce((a, l) => a + l.amountNative, 0);
  const cerca = (a, b) => (a == null || b == null ? null : Math.abs(Math.abs(a) - Math.abs(b)) <= Math.max(0.01, 0.005 * Math.abs(b)));
  const prodRev = cd.revenueLinesByYear[y] || []; const prodExp = cd.expenseLinesByYear[y] || [];
  const ligaProd = ((prod.CLUB_LEAGUE_BY_YEAR || {})[P.clubId] || {})[y];
  return {
    prod: { revenue: r6(sum(prodRev)), expenses: r6(sum(prodExp)), officialTotalRevenue: pm.officialTotalRevenue, officialTotalExpenses: pm.officialTotalExpenses, officialPAT: pm.officialPAT, fx: pm.fx ?? null, fxRef: pm.fxRef ?? null, fxSource: pm.fxSource ?? null, netInterest: pm.netInterest, tax: pm.tax, liga: ligaProd ?? null },
    prop: { revenue: r6(sum(E.revenueLines)), expenses: r6(sum(E.expenseLines)), officialTotalRevenue: E.fiscalYearMeta.officialTotalRevenue, officialTotalExpenses: E.fiscalYearMeta.officialTotalExpenses, officialPAT: E.fiscalYearMeta.officialPAT, fx: E.fiscalYearMeta.fx ?? null, fxRef: E.fiscalYearMeta.fxRef ?? null, netInterest: E.fiscalYearMeta.netInterest, tax: E.fiscalYearMeta.tax, liga: P.liga?.valor ?? null },
    ingresosIgual: cerca(sum(E.revenueLines), sum(prodRev)), gastosIgual: cerca(sum(E.expenseLines), sum(prodExp)),
    patIgual: cerca(E.fiscalYearMeta.officialPAT, pm.officialPAT),
    dineroIngresosBien: bien(prodRev, E.revenueLines), dineroGastosBien: bien(prodExp, E.expenseLines),
    dineroIngresosDeMas: deMas(prodRev, E.revenueLines), dineroGastosDeMas: deMas(prodExp, E.expenseLines),
    fxIgual: pm.fxRef ? pm.fxRef === E.fiscalYearMeta.fxRef : pm.fx != null ? (E.fiscalYearMeta.fx != null ? Math.abs(E.fiscalYearMeta.fx / pm.fx - 1) < 0.005 : false) : null,
    ligaIgual: ligaProd === undefined ? null : ligaProd === (P.liga?.valor ?? null),
  };
}

// ΠΑΕ EN LA PORTADA: la primera línea, hasta la pág. 3 del visor, con la forma jurídica griega de sociedad de fútbol.
const PAE_RE = /(?<![\p{L}])(?:Π\.\s?Α\.\s?Ε\.?|ΠΑΕ|ΠΟΔΟΣΦΑΙΡΙΚ\p{L}*\s+ΑΝΩΝΥΜ\p{L}*\s+ΕΤΑΙΡ\p{L}*|Ποδοσφαιρικ\p{L}*\s+Ανώνυμ\p{L}*\s+Εταιρ\p{L}*)(?![\p{L}])/u;
function citaEnPortada(md, re) {
  const L = md.split('\n'); let fin = L.findIndex((l) => /^---\s*p[aá]g\.\s*4\s*---/i.test(l)); if (fin < 0) fin = Math.min(L.length, 200);
  for (let i = 0; i < fin; i++) if (re.test(L[i])) return { linea: i + 1, texto: L[i].replace(/[*#|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) };
  return null;
}
export const citaPAE = (md) => citaEnPortada(md, PAE_RE);
// SAD O SDUQ PORTUGUESA EN LA PORTADA: la sociedad desportiva (SAD, SDUQ) que presenta el documento
// participa solo en el fútbol profesional; las cuotas de socios y las otras modalidades son del club, que es otra entidad. A diferencia de
// la ΠΑΕ NO se guarda en el perfil del club: Porto publica años del club (2016-2023, con socios y modalidades) y años de la SAD (2024-2025),
// así que la cita vale para ESE documento ("el 0 es real acá") y un documento del club sigue preguntando. Solo Portugal. Medido sobre los
// 186 .md portugueses: 158 la tienen en la portada; los 28 que no son del club o la asociación (Porto 2016-2023, Rio Ave 2014-15, Feirense,
// Gil Vicente consolidado, Tondela y Vitória del club...) o SAD sin la forma en la portada (Santa Clara, Sporting 1999 y 2009-10), que siguen
// a la cola. Coincide con las 36 respuestas de perfil de Portugal (las 17 "no" son SAD/SDUQ; Porto "sí" por los años del club).
const SAD_PT_RE = /(?<![\p{L}])(?:S\.\s?A\.\s?D\.|SAD|SDUQ|Sociedade\s+An[óo]nima\s+Desportiva|Sociedade\s+Desportiva\s+Unipessoal\s+por\s+Quotas)(?![\p{L}])/u;
export const citaSADpt = (md) => citaEnPortada(md, SAD_PT_RE);

// QUÉ TOCÓ UNA CARGA A MANO. AEK 2024 se cargó con `--escribir` y su `Admin/sourcing/Grecia/AEK Athens.md` quedó fuera de
// los commits de esa sesión: la línea "Escrito (...)" lo nombraba, pero sale debajo del JSON entero, separada por comas y sin lo que tocan
// los generadores (fuentes/*.html, ESTADO-clubes.md...) ni los registros (cola, categorías aprendidas). Al final se imprime un `git add`
// listo para pegar con lo que CAMBIÓ en esta corrida dentro de lo que commitea cargar-lote.mjs (TOCA_UNA_CARGA de tools/rutas.mjs): se
// compara `git status` + contenido antes y después, así un archivo que ya estaba modificado antes no entra si la carga no lo tocó. Una
// carpeta con más de 10 archivos cambiados (fuentes/: se regeneran todas las páginas) va como carpeta. Por stderr: cargar-lote.mjs lee el
// JSON de stdout.
export function cambiadosEnGit() {
  const { SITIO, ADMIN } = TOCA_UNA_CARGA;
  let out = '';
  try { out = execFileSync('git', ['status', '--porcelain', '-z', '--untracked-files=all', '--', ...SITIO, ...ADMIN], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); } catch { return new Map(); }
  const m = new Map();
  for (const e of out.split('\0').filter(Boolean)) {
    const f = e.slice(3); const p = resolve(ROOT, f);
    m.set(f, existsSync(p) ? createHash('sha1').update(readFileSync(p)).digest('hex') : 'borrado');
  }
  return m;
}
export function lineaGitAdd(antes, despues) {
  const tocados = [...despues].filter(([f, h]) => antes.get(f) !== h).map(([f]) => f).sort();
  if (!tocados.length) return 'Archivos que tocó esta carga: ninguno según git.';
  const porCarpeta = new Map();
  for (const f of tocados) { const d = dirname(f); porCarpeta.set(d, [...(porCarpeta.get(d) || []), f]); }
  const rutas = [...porCarpeta].flatMap(([d, fs]) => (fs.length > 10 && d !== '.' ? [`${d}/`] : fs));
  return `\nArchivos que tocó esta carga (${tocados.length}), para el commit:\ngit add -- ${rutas.map((f) => `"${f}"`).join(' ')}`;
}

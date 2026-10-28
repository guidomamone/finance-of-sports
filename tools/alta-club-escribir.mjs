// ============================================================================
// tools/alta-club-escribir.mjs — el tipo de cambio y la liga que se proponen, y la escritura del alta (--escribir) con su reversión
// Mudado de tools/alta-club.mjs sin cambiar una línea (salvo `export`); tools/alta-club.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import * as EV from './evidencia-club.mjs';
import { rutaData } from './data-clubes.js';
import { crearClub } from './club-json.mjs';
import { GENERADORES, queFalla } from './generadores.mjs';
import { fxDeclarado, fechaDeColumna, fechaDeBloque, FUENTE_SERIE, fxDeSerie } from './alta-club-lectura.mjs';
import { NOMBRE_PAIS_ES, MONEDAS, MONEDAS_A_LA_PAR } from './alta-club-tablas.mjs';
import { ANOTAR_MISSES, norm, campo, runNode } from './alta-club.mjs';

const ROOT = resolve(import.meta.dirname, '..');

export function candidatosColor(displayName) {
  const dir = resolve(ROOT, 'tools/brand-color-reference');
  if (!existsSync(dir)) return [];
  const q = norm(displayName).replace(/[^a-z0-9]+/g, ' ').trim();
  const out = [];
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const c of d.clubs || []) {
      const n = norm(c.name).replace(/[^a-z0-9]+/g, ' ').trim();
      if (n.includes(q) || norm(c.slug.replace(/-/g, ' ')).includes(q)) out.push({ liga: f.replace('.json', ''), ...c });
    }
  }
  if (ANOTAR_MISSES) runNode('tools/lookup-brand-color.js', [displayName, '--json']);
  return out;
}

export function proponerFx(md, moneda, cierre, estadoMoneda, reportType, sitio, ovFx = null, ajFx = null) {
  const out = [];
  // ESCALÓN 0: ajuste manual de Guido (tools/ajustes.mjs, campo `fx`, en moneda por 1 USD).
  if (ajFx && isFinite(Number(String(ajFx.valor).replace(',', '.')))) {
    out.push(campo('fx', Number(String(ajFx.valor).replace(',', '.')), `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${ajFx.autor} ${ajFx.fecha}): ${ajFx.motivo}`, 'ok', { fxSource: 'manual' }));
    return out;
  }
  if (ovFx && moneda && moneda !== 'USD' && estadoMoneda !== 'pregunta' && reportType !== 'official_budget') {
    out.push(campo('fx', Number(ovFx.valor), `declarado por el documento (regla #0), leído por claude-api con cita verificada: ${ovFx.fuente}`, 'ok', { fxSource: 'document_close' }));
    return out;
  }
  if (!moneda || estadoMoneda === 'pregunta') {
    out.push(campo('fx', null, 'depende de la moneda del ejercicio, que es una pregunta abierta', 'pendiente'));
    return out;
  }
  if (moneda === 'USD') {
    out.push(campo('fx', null, 'el ejercicio está en USD: no hay nada que convertir (fx-ausente para USD es P2, ver audit.js)', 'ok'));
    return out;
  }
  if (!cierre) { out.push(campo('fx', null, 'sin fecha de cierre no hay tipo de cambio de cierre', 'pendiente')); return out; }
  const serie = fxDeSerie(moneda, cierre);
  const mercado = serie.fx || (sitio.FX_CLOSE[`${moneda}@${cierre}`] || {}).fx || null;
  const dec = fxDeclarado(md, moneda, mercado, cierre);
  if (reportType === 'official_budget') {
    out.push(campo('fx', dec.grupos && dec.grupos.length ? dec.grupos.map((g) => g.valor) : null, 'presupuesto: el tipo de cambio es la PREMISA que declara el propio documento (fxSource document_assumption)', 'pregunta', { pregunta: 'Presupuesto: ¿qué tipo de cambio asume el documento? (si declara dos puntos, se promedian — club-data-mapping/referencia/fx.md, regla 3)' }));
    return out;
  }
  if (dec.grupos && dec.grupos.length) {
    const grupos = dec.grupos;
    const deCierre = grupos.filter((g) => g.items.some((i) => i.cierre));
    // VARIOS VALORES EN UNA TABLA: gana la columna con la fecha MÁS NUEVA. Caso real, UC 2025, línea 797:
    // "Dólar Estadounidense 907,13 996,48" debajo de "Conversiones a pesos chilenos 31-12-2025 31-12-2024": gana 907,13. Solo se usa si hay
    // más de un valor (con uno solo no cambia nada) y solo si la fila y el encabezado se corresponden uno a uno (ver fechaDeColumna); si no,
    // sigue como antes y termina en la pregunta (cola). Ver la medición en Admin/CHANGELOG.md.
    const conFecha = grupos.length > 1 ? grupos.flatMap((g) => g.items.map((i) => ({ g, f: fechaDeColumna(md, i) || fechaDeBloque(md, i) }))).filter((x) => x.f) : [];
    const fechas = [...new Set(conFecha.map((x) => x.f))].sort();
    const masNueva = fechas.length >= 2 ? conFecha.filter((x) => x.f === fechas[fechas.length - 1]) : [];
    const porFecha = masNueva.length && new Set(masNueva.map((x) => x.g)).size === 1 ? masNueva[0] : null;
    const elegido = grupos.length === 1 ? grupos[0] : porFecha ? porFecha.g : (deCierre.length === 1 ? deCierre[0] : null);
    const detalle = grupos.map((g) => `${g.valor} (línea ${g.items[0].linea}: "${g.items[0].texto}")`).join(' | ');
    if (elegido && !MONEDAS_A_LA_PAR.has(moneda)) {
      out.push(campo('fx', elegido.valor, `declarado por el documento, línea ${elegido.items[0].linea}: "${elegido.items[0].texto}"${grupos.length > 1 ? ` (elegido entre ${grupos.length} valores ${porFecha ? `por ser el de la fecha más nueva de la tabla, ${porFecha.f}` : 'por ser el de cierre'})` : ''}`, 'ok', { fxSource: 'document_close', nota: mercado ? `mercado ese día: ${mercado}` : undefined }));
    } else {
      out.push(campo('fx', grupos.map((g) => g.valor), `el documento declara ${grupos.length === 1 ? 'un tipo de cambio' : grupos.length + ' valores de tipo de cambio'} a USD: ${detalle}`, 'pregunta', {
        pregunta: MONEDAS_A_LA_PAR.has(moneda)
          ? `El documento declara un tipo de cambio con el dólar (${detalle}). En ${moneda} el número solo no dice el sentido: el sitio guarda "${moneda} por 1 USD" (~${MONEDAS[moneda].rango.join('-')}); si el documento escribió "USD por 1 ${moneda}" hay que invertirlo. ¿Cuál es el de CIERRE y en qué sentido está?`
          : `El documento declara varios tipos de cambio a USD (${detalle}). Regla #0: gana el de CIERRE que declara el documento. ¿Cuál es?`,
      }));
    }
    return out;
  }
  if (dec.lineasConMencion > 0) {
    // Menciona tipo de cambio y dólar con números, pero ninguno plausible (casi siempre un cuadro
    // de sensibilidad o de exposición en moneda extranjera, sin la cotización). No es un criterio:
    // es un dato a confirmar en el documento antes de la carga. Se propone igual la cotización de
    // mercado (abajo), marcada como provisoria.
    out.push(campo('fx', null, `el .md menciona tipo de cambio y dólar con números en ${dec.lineasConMencion} línea(s), pero ninguno es una cotización plausible${dec.descartadas?.length ? ` (descartadas por traer en su frase otra fecha que la del cierre: ${dec.descartadas.map((d) => `${d.valor}, línea ${d.linea}, ${d.fechas.join('/')}`).join('; ')})` : ''}`, 'pendiente', { nota: 'Regla #0: antes de cargar, confirmar en el documento que NO declara su propio tipo de cambio de cierre; si lo declara, gana ese sobre el de mercado de abajo' }));
  }
  const key = `${moneda}@${cierre}`;
  if (sitio.FX_CLOSE[key]) {
    out.push(campo('fxRef', key, `el documento no declara tipo de cambio; FX_CLOSE ya tiene ${key} = ${sitio.FX_CLOSE[key].fx} (${sitio.FX_CLOSE[key].label})`));
    return out;
  }
  if (serie.fx) {
    const label = serie.exacto ? `${FUENTE_SERIE[moneda]} al ${serie.fecha}` : `${FUENTE_SERIE[moneda]}, última rueda hábil antes del cierre (${serie.fecha}, ${cierre} no es día hábil)`;
    out.push(campo('fxRef', key, `el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): ${serie.fx}. --escribir agrega '${key}' a FX_CLOSE`, 'ok', { fxClose: { fx: serie.fx, source: 'market_close', label } }));
    if (ANOTAR_MISSES) runNode('tools/lookup-fx-close.js', [cierre, '--currency', moneda, '--json']);
    return out;
  }
  if (ANOTAR_MISSES) runNode('tools/lookup-fx-close.js', [cierre, '--currency', moneda, '--json']);
  out.push(campo('fxRef', key, `el documento no declara tipo de cambio y no hay cotización cacheada (${serie.error})`, 'pendiente', { nota: `falta el dato de mercado, no un criterio: correr node tools/fetch-fx-reference.mjs para ${moneda} (o cargar ${key} en FX_CLOSE con su fuente oficial) antes de la etapa de carga` }));
  return out;
}

// Palabras genéricas de nombre de club que no identifican al club (pedido de Guido: "AC Milan y Milan son lo mismo, ídem
// OFI Crete y OFI"): se sacan de los dos lados antes de comparar por palabras.
const GENERICAS = new Set(['fc', 'ac', 'sc', 'cf', 'afc', 'cfc', 'sk', 'fk', 'nk', 'hnk', 'gnk', 'pfc', 'nfc', 'bk', 'if', 'il', 'ik', 'ssc', 'us', 'as', 'ss', 'cd', 'ud', 'sd', 'ca', 'club', 'calcio', 'fotball', 'fotbal', 'futebol', 'football', 'fussball', 'tj', 'jk', 'spor', 'kulubu', 'sv', 'vfb', 'vfl', 'tsv', 'fsv', 'rsc', 'kv', 'kaa', 'kvc', 'krc', 'sport', 'de', 'the', 'and', 'a', 's', 'as']);
// Los nombres de lista de Wikipedia que alias.json da como el MISMO club (normalizados como en proponerLiga)
let ALIAS = null;
const aliasDe = (iso, clubId) => {
  if (!clubId) return [];
  if (!ALIAS) { try { ALIAS = JSON.parse(readFileSync(resolve(ROOT, 'tools/club-league-reference/alias.json'), 'utf8')); } catch { ALIAS = {}; } }
  return Object.entries(ALIAS[iso] || {}).filter(([, a]) => a && a.clubId === clubId).map(([x]) => norm(x).replace(/[^a-z0-9]+/g, ' ').trim());
};
export function proponerLiga(clubId, nombre, pais, anio, sitio, cierre = null) {
  if (!pais || !pais.iso2 || !anio) return campo('liga', null, 'sin país o sin año', 'pendiente');
  const fila = (sitio.CLUB_LEAGUE_BY_YEAR[clubId] || {})[anio];
  if (fila !== undefined && fila !== null) return campo('liga', fila, `data/club-leagues/${pais.iso2.toLowerCase()}.js ya tiene la fila`);
  const iso = pais.iso2.toLowerCase();
  const cachePath = resolve(ROOT, 'tools/club-league-reference', `${iso}.json`);
  if (ANOTAR_MISSES) runNode('tools/lookup-club-league.mjs', [nombre, '--pais', iso, '--anio', String(anio), '--json']);
  if (!existsSync(cachePath)) return campo('liga', null, `sin caché de rosters para ${iso} (tools/club-league-reference/${iso}.json)`, 'pendiente', { nota: 'la fila se escribe en null (= nadie lo verificó, P3 liga-sin-verificar); para resolverla: resolve-wikipedia-season-page.mjs + fetch-club-league-reference.mjs (club-or-year-onboarding/club-nuevo.md (liga))' });
  const data = JSON.parse(readFileSync(cachePath, 'utf8'));
  const q = norm(nombre).replace(/[^a-z0-9]+/g, ' ').trim();
  const exactos = []; const parciales = [];
  // QUÉ TEMPORADA: la caché guarda una temporada partida ("2020–21") bajo el año en que TERMINA. La regla del sitio es "la
  // categoría al CIERRE del ejercicio": un ejercicio que cierra entre septiembre y
  // diciembre en una liga partida está jugando la temporada que empezó ese año -> clave anio + 1. Era "entre julio y diciembre": julio y agosto
  // son el FIN de la temporada (Burnley cierra el 31/7), como en faltantes-liga, estadio-sponsor, listas-lote y ligas-sin-verificar (mes >= 9). Con >= 7 la liga salía de la temporada
  // siguiente y estadio-sponsor la usaba con la anterior (Burnley 2022 "2021–22 EFL Championship", 2023 "2022–23 Premier League"). Medido: las 8 filas cargadas que cierran en jul-ago coinciden con >= 9. Antes se buscaba siempre `anio` y a un
  // club que cierra en diciembre (Atalanta 2020, Sassuolo 2021, Genoa 2022, Thun 2019, los rusos) le tocaba la temporada ANTERIOR.
  const mesCierre = cierre ? Number(String(cierre).slice(5, 7)) : null;
  const temporadaDe = (years) => {
    const partida = Object.values(years).some((e) => /\d{4}\s*[–\-\/]\s*\d{2,4}/.test(String(e.wikipediaPage || '')));
    return partida && mesCierre && mesCierre >= 9 ? String(Number(anio) + 1) : String(anio);
  };
  const sinGen = (x) => x.split(' ').filter((t) => t && !GENERICAS.has(t));
  for (const [leagueId, years] of Object.entries(data.leagues || {})) {
    const e = years[temporadaDe(years)];
    if (!e) continue;
    for (const c of e.clubs) {
      const n = norm(c).replace(/[^a-z0-9]+/g, ' ').trim();
      // Por PALABRAS, no por substring: "ael larissa" contiene "aris" como texto (bug real de la
      // primera versión, proponía a AEL Larissa como Aris).
      const tn = sinGen(n); const tq = sinGen(q);
      if (!tn.length || !tq.length) continue;
      // un alias confirmado del club en tools/club-league-reference/alias.json vale como el nombre
      // exacto: "Oud-Heverlee Leuven" = OH Leuven, "RWDM47" = RWDM (los mismos alias que ya usan faltantes-liga y ligas-sin-verificar)
      if (n === q || aliasDe(iso, clubId).includes(n)) exactos.push({ leagueId, club: c, page: e.wikipediaPage });
      else if (tn.every((t) => tq.includes(t)) || tq.every((t) => tn.includes(t))) parciales.push({ leagueId, club: c, page: e.wikipediaPage });
    }
  }
  const enCatalogo = (id) => Object.keys(sitio.LEAGUES).find((k) => k.toLowerCase() === id.toLowerCase());
  if (exactos.length === 1) {
    const cat = enCatalogo(exactos[0].leagueId);
    if (cat) return campo('liga', cat, `roster cacheado de "${exactos[0].page}" (tools/club-league-reference/${iso}.json), coincidencia exacta "${exactos[0].club}"`);
    // `pendiente`, no `pregunta`: agregar una liga al catálogo es UNA decisión de
    // Guido por liga, no por club, y no cambia si el alta es correcta. Con la caché de rosters creciendo
    // (it, kr...), dejarlo como `pregunta` hacía que MÁS datos dieran MENOS clubes listos (21 carpetas
    // frenadas solo por esto). La fila se escribe en `null` (= "nadie lo verificó", P3) y la pregunta
    // queda en `nota` para cuando se decida el catálogo.
    return campo('liga', null, `el roster "${exactos[0].page}" lo ubica en '${exactos[0].leagueId}', que NO está en el catálogo de data/leagues.js`, 'pendiente', { nota: `fila en null hasta decidir: el club jugó ${anio} en '${exactos[0].leagueId}' (${exactos[0].page}), liga que no está en el catálogo. Propuesta de la entrada del catálogo: node tools/catalogo-liga.mjs --liga ${exactos[0].leagueId} (la liga de un deporte activo la aprueba la Auditora; activar un deporte, Guido)` });
  }
  // Una coincidencia parcial ÚNICA en toda la temporada del país ("AC Milan" / "Milan", "OFI Crete" / "OFI") vale como exacta
  // (confirmado por Guido para esos casos). Si hay más de una, sigue pendiente de confirmación.
  // AVISO (Auditora 5): el resultado no cambia, pero la fuente empieza con «NO EXACTA»: una coincidencia por palabras puede ser otro club con un
  // nombre parecido (RAAL La Louvière / «La Louvière Centre», otra sociedad; Lierse SK / Lierse Kempenzonen). Medido sobre las altas de hoy: 63
  // asignaciones salieron por acá sin ser exactas ni alias; casi todas son el mismo club con otro largo de nombre (Roma / AS Roma).
  if (!exactos.length && parciales.length === 1) {
    const p1 = parciales[0]; const cat = enCatalogo(p1.leagueId);
    if (cat) return campo('liga', cat, `NO EXACTA, confirmar en la página del club: roster cacheado de "${p1.page}" (tools/club-league-reference/${iso}.json), coincidencia única por palabras "${p1.club}" = "${nombre}" (si es el mismo club, agregarlo a alias.json)`);
  }
  if (exactos.length + parciales.length > 0) {
    const todos = [...exactos, ...parciales];
    // Mismo criterio: `pendiente` con la fila en null. El script no confirma homónimos por su cuenta
    // ("OFI Crete" contra "OFI"), pero tampoco hace falta frenar el alta por eso: null es la verdad.
    return campo('liga', null, `coincidencia NO exacta en los rosters cacheados: ${todos.map((t) => `"${t.club}" en ${t.page}`).join(' | ')}`, 'pendiente', { nota: `fila en null hasta confirmar: ¿"${nombre}" es ${todos.map((t) => `"${t.club}" (${t.leagueId}, ${t.page})`).join(' o ')}?` });
  }
  const cacheados = Object.entries(data.leagues || {}).filter(([, y]) => y[String(anio)]).map(([l]) => l);
  return campo('liga', null, cacheados.length ? `no aparece en los rosters cacheados de ${anio} (${cacheados.join(', ')}): puede haber jugado otra división` : `no hay ninguna liga-temporada de ${iso} ${anio} cacheada`, 'pendiente', { nota: 'la fila se escribe en null (= nadie lo verificó); bajar el roster con fetch-club-league-reference.mjs (club-or-year-onboarding/club-nuevo.md (liga))' });
}

// ============================================================================
// ESCRITURA (--escribir)
// ============================================================================
// `extra`: archivos de fuera de data/ que también se revierten (la evidencia del club, Admin/carga-clubes/<id>.md; si no existía, se borra).
function snapshot(extra = []) {
  const archivos = new Map();
  const add = (p) => { if (existsSync(p) && statSync(p).isFile()) archivos.set(p, readFileSync(p)); };
  (function walk(d) { for (const e of readdirSync(d)) { const f = join(d, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, 'data'));
  for (const e of readdirSync(resolve(ROOT, 'fuentes'))) if (e.endsWith('.html')) add(resolve(ROOT, 'fuentes', e));
  for (const d of ['club', 'liga', 'og']) if (existsSync(resolve(ROOT, d))) (function walk(x) { for (const e of readdirSync(x)) { const f = join(x, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, d)); // las páginas de club y de liga y sus imágenes
  for (const f of ['index.html', 'fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', ...extra]) add(resolve(ROOT, f));
  return archivos;
}
function revertir(snap, extra = []) {
  const actual = snapshot(extra);
  let restaurados = 0; let borrados = 0;
  for (const [p, buf] of snap) if (!actual.has(p) || !actual.get(p).equals(buf)) { writeFileSync(p, buf); restaurados++; }
  for (const p of actual.keys()) if (!snap.has(p)) { unlinkSync(p); borrados++; }
  return { restaurados, borrados };
}

// Inserta `texto` antes del primer `cierre` (regex de línea) que sigue a `apertura`.
function insertarAntes(contenido, apertura, cierre, texto, archivo) {
  const i = contenido.indexOf(apertura);
  if (i < 0) throw new Error(`${archivo}: no encontré "${apertura}"`);
  const resto = contenido.slice(i);
  const m = resto.match(cierre);
  if (!m) throw new Error(`${archivo}: no encontré el cierre del bloque "${apertura}"`);
  const pos = i + m.index;
  return contenido.slice(0, pos) + texto + contenido.slice(pos);
}

function jsStr(s) { return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`; }

export function escribir(r) {
  const val = (n) => (r.campos.find((c) => c.campo === n) || {}).valor;
  if (!val('sport')) throw new Error('el alta no tiene deporte (sport): no se supone fútbol, se pregunta (to-do 339)');
  const eVal = (n) => (r.ejercicio.campos.find((c) => c.campo === n) || {});
  const id = val('id');
  const hoy = new Date().toISOString().slice(0, 10);
  const escritos = [];
  // data/ se publica y no lleva comentarios: lo que el alta dice de dónde salió cada cosa va a la evidencia del club
  const evExtra = [EV.rutaRel(id)];
  const snap = snapshot(evExtra);
  let ev = EV.leer(id);
  try {
    // 1. data/clubs.js
    const clubsPath = resolve(ROOT, 'data/clubs.js');
    let clubsJs = readFileSync(clubsPath, 'utf8');
    if (new RegExp(`['"]?${id}['"]?\\s*:\\s*\\{\\s*id:`).test(clubsJs)) throw new Error(`data/clubs.js ya tiene '${id}'`);
    const campos = [`id:${jsStr(id)}`, `name:${jsStr(val('name'))}`, `displayName:${jsStr(val('displayName'))}`, `country:${jsStr(val('country'))}`, `reportingCurrency:${jsStr(val('reportingCurrency'))}`, `fiscalYearStart:${jsStr(val('fiscalYearStart'))}`, `sport:${jsStr(val('sport'))}`];
    const linea = `  ${jsStr(id)}: { ${campos.join(', ')} },\n`;
    ev = EV.agregarCabecera(ev, [`${val('displayName')}: alta por tools/alta-club.mjs (${hoy}) desde ${r.documento}. brandColor AUSENTE a propósito`,
      '(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).']);
    clubsJs = insertarAntes(clubsJs, 'const clubs = {', /^\};$/m, linea, 'data/clubs.js');
    writeFileSync(clubsPath, clubsJs); escritos.push('data/clubs.js');

    // 2. data/<país>/<id>-data.js (esqueleto)
    const v = id.replace(/[^a-z0-9]/g, '');
    const dataPath = resolve(ROOT, rutaData(id, { pais: val('country') }));
    if (existsSync(dataPath)) throw new Error(`ya existe ${rutaData(id, { pais: val('country') })}`);
    const metaProp = {};
    for (const c of r.ejercicio.campos) {
      if (c.campo === 'currency') metaProp.currency = c.valor;
      if (c.campo === 'fx' && c.valor != null && c.fxSource) { metaProp.fx = c.valor; metaProp.fxSource = c.fxSource; }
      if (c.campo === 'fxRef') metaProp.fxRef = c.valor;
      if (c.campo === 'sourceId') metaProp.sourceId = c.valor;
      if (c.campo === 'reportType') metaProp.reportType = c.valor;
    }
    const fuentesCampo = [...r.campos, ...r.ejercicio.campos].map((c) => `  ${c.campo.padEnd(18)} ${c.estado.padEnd(9)} ${c.valor === undefined ? '(ausente)' : JSON.stringify(c.valor)} — ${String(c.fuente || '').slice(0, 150)}`);
    ev = EV.agregarCabecera(ev, [
      `${rutaData(id, { pais: val('country') })} — ${val('name')} (${NOMBRE_PAIS_ES[val('country')] || val('country')}).`,
      `ALTA POR SCRIPT (tools/alta-club.mjs, ${hoy}), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file`,
      'nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.',
      '',
      `Documento que originó el alta: ${r.documento}`,
      '',
      'De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):',
      ...fuentesCampo,
      '',
      `FISCAL YEAR META PROPUESTO para ${r.ejercicio.anio} (NO registrado: un ejercicio con meta y`,
      'sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):',
      `  ${r.ejercicio.anio}: ${JSON.stringify(metaProp)}`]);
    // el esqueleto es el JSON del club (la fuente) y de ahí sale su data file
    const ficha = { id, name: val('name'), displayName: val('displayName'), country: val('country'), reportingCurrency: val('reportingCurrency'), fiscalYearStart: val('fiscalYearStart'), sport: val('sport') };
    escritos.push(...crearClub(id, ficha, { pais: val('country') }));

    // 3. data/club-leagues/<iso2>.js
    const iso = val('country').toLowerCase();
    const liga = eVal('liga');
    const anio = r.ejercicio.anio;
    const ligaPath = resolve(ROOT, 'data/club-leagues', `${iso}.js`);
    const filaLiga = `  ${jsStr(id)}: { ${anio}: ${liga.valor ? jsStr(liga.valor) : 'null'} },\n`;
    ev = EV.agregarTexto(ev, anio, 'Liga', [`alta-club.mjs (${hoy}): ${liga.valor || 'null'}, ${liga.valor ? `verificado contra ${liga.fuente}` : `SIN VERIFICAR (${liga.fuente})`}.`]);
    if (existsSync(ligaPath)) {
      const txt = readFileSync(ligaPath, 'utf8');
      // Si el club YA tiene su línea (a mano, con otros años), el año se agrega a ESA línea o, si ya está, no se escribe nada: una segunda línea del mismo id pisa la primera
      // entera (Object.assign) y el club queda con un solo año. Caso: bathrugby-gb, la línea 2021 a 2025 quedó pisada por una de solo 2021.
      const enLinea = new RegExp(`^(\\s*(?:'${id}'|"${id}"|${id})\\s*:\\s*\\{)([^}]*)(\\},?)\\s*$`, 'm');
      const ya = txt.match(enLinea);
      if (ya) {
        if (new RegExp(`\\b${anio}\\s*:`).test(ya[2])) { /* el año ya está en la línea: no se toca */ }
        else writeFileSync(ligaPath, txt.replace(enLinea, `$1${ya[2].replace(/\s+$/, '')}, ${anio}: ${liga.valor ? jsStr(liga.valor) : 'null'} $3`));
      } else writeFileSync(ligaPath, insertarAntes(txt, 'Object.assign(window.CLUB_LEAGUE_BY_YEAR, {', /^\}\);$/m, filaLiga, `data/club-leagues/${iso}.js`));
    } else {
      // sin cabecera de comentario; las reglas de estos archivos están en data/club-leagues.js
      writeFileSync(ligaPath, `window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
${filaLiga}});
`);
    }
    escritos.push(`data/club-leagues/${iso}.js`);

    // 4. País nuevo
    if (r.contexto.paisNuevo) {
      const p = r.contexto.paisNuevo;
      const lp = resolve(ROOT, 'data/leagues.js');
      const lj = readFileSync(lp, 'utf8');
      const pad = `${p.iso2}: `;
      writeFileSync(lp, insertarAntes(lj, 'const COUNTRIES = {', /^\};$/m, `  ${pad}{ name:${jsStr(p.name)}, key:'country.${p.iso2}', flag:'${p.flag}', region:'${p.region}' },\n`, 'data/leagues.js'));
      escritos.push('data/leagues.js');
      const ep = resolve(ROOT, 'data/lang/en.js');
      const ej = readFileSync(ep, 'utf8');
      const ancla = ej.match(/^\s*"country\.[A-Z]{2}": "[^"]*",\n/m);
      if (ancla && !ej.includes(`"country.${p.iso2}"`)) {
        const pos = ej.indexOf(ancla[0]) + ancla[0].length;
        writeFileSync(ep, ej.slice(0, pos) + `  "country.${p.iso2}": ${JSON.stringify(p.en)},\n` + ej.slice(pos));
        escritos.push('data/lang/en.js');
      }
    }
    // 5. Moneda nueva
    const cmPath = resolve(ROOT, 'data/currency-map.js');
    let cm = readFileSync(cmPath, 'utf8'); let cmTocado = false;
    if (r.contexto.monedaNueva) {
      const m = r.contexto.monedaNueva;
      cm = insertarAntes(cm, 'const CURRENCY_META = {', /^\};$/m, `  ${m.codigo}: { scale: ${m.scale}, unitSuffix: '${m.scale === 1000 ? 'mil M' : 'M'}' },\n`, 'data/currency-map.js');
      cm = insertarAntes(cm, 'const FX_PLAUSIBLE_RANGE = {', /^\};$/m, `  ${m.codigo}: [${m.rango.join(', ')}],\n`, 'data/currency-map.js');
      cmTocado = true;
    }
    // 6. FX de mercado nuevo
    const fxc = r.ejercicio.campos.find((c) => c.campo === 'fxRef' && c.fxClose && c.estado === 'ok');
    if (fxc && !cm.includes(`'${fxc.valor}':`)) {
      cm = insertarAntes(cm, 'const FX_CLOSE = {', /^\};$/m, `  '${fxc.valor}': { fx: ${fxc.fxClose.fx}, source: 'market_close', label: ${jsStr(fxc.fxClose.label)} },\n`, 'data/currency-map.js');
      cmTocado = true;
    }
    if (cmTocado) { writeFileSync(cmPath, cm); escritos.push('data/currency-map.js'); }
    escritos.push(EV.guardar(id, ev));

    // 7. ASSET_V (CLAUDE.md, "Gotchas de tooling"; audit.js lo exige como P1 `asset-v-sin-subir`
    // apenas cambia algo de data/): se sube la constante Y cada `?v=` literal de index.html, las
    // dos cosas juntas (subir una sola es peor que ninguna). Si index.html ya tiene un ASSET_V
    // distinto al del último commit (otra alta u otro cambio sin commitear ya lo subió), no se toca.
    const idxPath = resolve(ROOT, 'index.html');
    const idx = readFileSync(idxPath, 'utf8');
    const actual = (idx.match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1];
    let enHead = null;
    try { enHead = (execFileSync('git', ['show', 'HEAD:index.html'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1]; } catch { enHead = null; }
    if (actual && (enHead === null || enHead === actual)) {
      const nuevo = /^\d+$/.test(actual) ? String(Number(actual) + 1) : `${actual}a`;
      const esc = actual.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const idxNuevo = idx.replace(`window.ASSET_V = '${actual}'`, `window.ASSET_V = '${nuevo}'`).replace(new RegExp(`\\?v=${esc}(?=["'])`, 'g'), `?v=${nuevo}`);
      writeFileSync(idxPath, idxNuevo); escritos.push(`index.html (ASSET_V ${actual} -> ${nuevo})`);
    }

    // 8. Generadores + auditoría
    // la misma lista que cargar.mjs (tools/generadores.mjs): sin faltantes-liga y estimar, toda alta se revertía por 2 P1
    const gens = GENERADORES.filter((g) => existsSync(resolve(ROOT, g)));
    const salidaGen = [];
    for (const g of gens) {
      const res = runNode(g, []);
      salidaGen.push({ generador: g, codigo: res.code });
      if (res.code !== 0) throw new Error(`${g} falló (código ${res.code}): ${res.out.slice(-600)}`);
    }
    const audit = runNode('tools/audit.js', ['--quiet']);
    const linea0 = (audit.out.match(/P0 \d+ · P1 \d+[^\n]*/) || [''])[0];
    if (audit.code !== 0) {
      const rv = revertir(snap, evExtra);
      const falla = queFalla(audit.out);
      return { ok: false, motivo: `node tools/audit.js dio P0/P1 (${linea0}${falla.length ? `: ${falla.join(', ')}` : ''}); se revirtió todo (${rv.restaurados} archivos restaurados, ${rv.borrados} borrados)`, audit: audit.out.slice(-3000), escritos };
    }
    return { ok: true, escritos, generadores: salidaGen, audit: linea0 };
  } catch (e) {
    const rv = revertir(snap, evExtra);
    return { ok: false, motivo: `${e.message} — se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, escritos };
  }
}

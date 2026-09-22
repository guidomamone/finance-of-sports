#!/usr/bin/env node
// ============================================================================
// tools/generate-club-index.js — genera, desde los propios datos, la sección
// "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" de `ESTADO.md`.
//
// EL PROBLEMA QUE RESUELVE (la "fuga 1" del mapa de procesos): esa sección se
// escribía a mano, un párrafo por club, y decía lo mismo que el comentario de
// cabecera de cada `data/<club>-data.js` ya decía. Dos copias de la misma
// información, y la escrita a mano es la que se desactualiza, porque el
// `data/<club>-data.js` es el único archivo que SÍ o SÍ se toca al cargar un
// club. Con 41 clubes ya eran 18 párrafos desparejos (los primeros clubes con
// 20 líneas cada uno, los últimos 10 clubes compartiendo un bullet); al objetivo
// de ~1000 clubes es inmantenible.
//
// CÓMO LO RESUELVE: la sección deja de ser prosa paralela y pasa a ser una VISTA
// de los datos. Todo lo que imprime sale de `data/clubs.js` y de los
// `fiscalYearMeta` de cada club — o sea, de los mismos campos que el sitio usa
// para renderizar. No puede desincronizarse, porque no hay nada que sincronizar.
//
// QUÉ NO HACE, A PROPÓSITO: no intenta resumir el "por qué" de cada club (qué
// supuesto se tomó, qué salvedad tiene una cifra, qué quedó sin cargar). Eso NO
// es derivable de los datos y sigue viviendo donde siempre debió: el comentario
// de cabecera del `data/<club>-data.js`, que es lo que el índice linkea. El
// índice contesta "qué hay"; el archivo del club contesta "por qué".
//
// USO:
//   node tools/generate-club-index.js           reescribe la sección en ESTADO.md
//   node tools/generate-club-index.js --check   no escribe; sale con código 1 si
//                                               la sección quedó desactualizada
//                                               (sirve para chequear antes de un push)
// ============================================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
// Versión 138: el destino es ESTADO.md. Hasta la 137 esta sección vivía dentro del
// comentario HTML de index.html; se movió junto con el resto del estado y la to-do list.
const ESTADO = path.join(ROOT, 'ESTADO.md');
const CLUB_INDEX_FILE = path.join(ROOT, 'data/club-index.js');
// Los marcadores se mantuvieron como texto plano al mudar la sección a ESTADO.md, aunque
// ahí un comentario HTML ya no rompería nada: cambiarlos habría obligado a tocar el
// archivo a mano justo en la migración, que es cuando más fácil se rompe algo.
const START = '===== CLUB-INDEX:START (generado por tools/generate-club-index.js, no editar a mano) =====';
const END = '===== CLUB-INDEX:END =====';

// ---------------------------------------------------------------------------
// Cargar los data/*.js en un contexto compartido. Se usa `vm` y no `require`
// porque estos archivos están escritos para el navegador: declaran `const clubs`
// en el tope del script, no `module.exports`. En un contexto de vm compartido,
// esas declaraciones quedan visibles para los archivos que se cargan después,
// igual que pasa con varios `<script src>` en la página.
// ---------------------------------------------------------------------------
function loadData() {
  const sandbox = { console, window: {} };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);

  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js',
    ...fs.readdirSync(path.join(ROOT, 'data'))
    .filter(f => f.endsWith('-data.js'))
    .sort()
    .map(f => 'data/' + f)];

  for (const rel of files) {
    const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    try {
      vm.runInContext(code, ctx, { filename: rel });
    } catch (e) {
      throw new Error(`No se pudo cargar ${rel}: ${e.message}`);
    }
  }
  // `const clubs = {...}` en el tope de un script de vm queda en el scope léxico
  // global del contexto (compartido entre scripts, por eso los data files se
  // cargan bien) pero NO como propiedad de globalThis, así que `ctx.clubs` da
  // undefined. Se leen evaluando una expresión en el mismo contexto.
  return vm.runInContext(
    '({ clubs: typeof clubs !== "undefined" ? clubs : null,' +
    '   sources: typeof sources !== "undefined" ? sources : null,' +
    '   clubQuality: typeof clubQuality !== "undefined" ? clubQuality : null,' +
    '   generic: (window.CLUB_GENERIC_DATA || {}) })',
    ctx, { filename: 'read-globals' });
}

// ---------------------------------------------------------------------------
// Cómo se nombra cada tipo de reporte en el índice. Si aparece un reportType
// nuevo en un data file, agregarlo acá (y el script avisa si no lo conoce).
// ---------------------------------------------------------------------------
const REPORT_LABEL = {
  official_balance_sheet: 'balance',
  official_budget: 'presupuesto',
  official_budget_and_balance: 'presupuesto y balance',
  pending_official: 'sin datos, esperando al club',
  press_estimate: 'cifras de prensa',
  placeholder: 'PLACEHOLDER',
  unofficial_mirror: 'balance de réplica no oficial',
};

const COUNTRY_NAME = {
  AR: 'Argentina', BR: 'Brasil', CL: 'Chile', CO: 'Colombia', EC: 'Ecuador',
  ES: 'España', JP: 'Japón', MX: 'México', PE: 'Perú', UY: 'Uruguay',
};

function fmtYears(years, clubEntry) {
  // Un club de año calendario muestra el año suelto ("2024"); uno de temporada,
  // el rango ("2023/2024"). Mismo criterio que `ejercicioLabel()` en el sitio.
  const calendar = clubEntry && clubEntry.fiscalYearStart === '01-01';
  const label = y => (calendar ? String(y) : `${y - 1}/${y}`);
  if (years.length === 1) return label(years[0]);
  // rango contiguo -> "2015/2016 a 2019/2020"; con huecos -> lista
  const contiguous = years.every((y, i) => i === 0 || y === years[i - 1] + 1);
  return contiguous ? `${label(years[0])} a ${label(years[years.length - 1])}` : years.map(label).join(', ');
}

function buildIndex({ clubs, sources, generic }) {
  const unknownReportTypes = new Set();
  const byCountry = {};

  for (const clubId of Object.keys(generic)) {
    const entry = clubs[clubId];
    if (!entry) continue; // club con data file pero sin entrada en clubs.js: lo reporta el resumen
    const meta = generic[clubId].fiscalYearMeta || {};
    const years = Object.keys(meta).map(Number).sort((a, b) => a - b);
    if (!years.length) continue;

    const kinds = [...new Set(years.map(y => {
      const rt = meta[y].reportType;
      if (!REPORT_LABEL[rt]) unknownReportTypes.add(rt);
      return REPORT_LABEL[rt] || rt;
    }))];

    const currencies = [...new Set(years.map(y => meta[y].currency))];
    const hasDebt = years.some(y => meta[y].grossDebt || meta[y].cash);

    (byCountry[entry.country] = byCountry[entry.country] || []).push({
      clubId,
      name: entry.displayName || entry.name,
      years,
      line: `${years.length} ejercicio${years.length > 1 ? 's' : ''} (${fmtYears(years, entry)}), ` +
            `${kinds.join(' + ')}, ${currencies.join('/')}${hasDebt ? '' : ', sin deuda/caja'}`,
    });
  }

  const lines = [];
  lines.push('QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB');
  lines.push('GENERADO AUTOMÁTICAMENTE — no editar a mano. Se regenera con:');
  lines.push('    node tools/generate-club-index.js');
  lines.push('');
  lines.push('Esta lista contesta QUÉ hay cargado de cada club. El POR QUÉ (qué supuesto se tomó,');
  lines.push('qué salvedad tiene una cifra, qué quedó sin cargar y por qué) NO está acá y no puede');
  lines.push('estarlo: vive en el comentario de cabecera de cada `data/<club>-data.js`, que es el');
  lines.push('archivo que sí o sí se toca al cargar un club y por lo tanto el único que no se puede');
  lines.push('desincronizar. Si querés entender un club, abrí SU archivo.');
  lines.push('');
  lines.push('Todo ejercicio listado acá es REAL (sale de un documento oficial del club) y cierra');
  lines.push('contra el total impreso de su propio documento — eso lo garantiza `auditAll()`, no');
  lines.push('esta lista. Un club sin datos reales no aparece.');
  lines.push('');

  const totalClubs = Object.values(byCountry).reduce((a, l) => a + l.length, 0);
  const totalYears = Object.values(byCountry).reduce((a, l) => a + l.reduce((b, c) => b + c.years.length, 0), 0);
  lines.push(`TOTAL: ${totalClubs} clubes, ${totalYears} ejercicios, ${Object.keys(byCountry).length} países.`);
  lines.push('');

  for (const country of Object.keys(byCountry).sort()) {
    const list = byCountry[country].sort((a, b) => a.name.localeCompare(b.name, 'es'));
    lines.push(`${(COUNTRY_NAME[country] || country).toUpperCase()} (${list.length})`);
    const pad = Math.max(...list.map(c => c.name.length));
    for (const c of list) {
      lines.push(`  ${c.name.padEnd(pad)}  ${c.line}`);
    }
    lines.push('');
  }

  if (unknownReportTypes.size) {
    lines.push(`OJO: reportType sin etiqueta conocida, agregalo a REPORT_LABEL en el script: ${[...unknownReportTypes].join(', ')}`);
    lines.push('');
  }

  return lines.join('\n').replace(/\n+$/, '\n');
}

// ---------------------------------------------------------------------------
// SEGUNDO ARTEFACTO (Versión 129): `data/club-index.js`, el índice LIVIANO que
// el sitio carga en cada visita.
//
// EL PROBLEMA QUE RESUELVE, encontrado auditando el plan del selector jerárquico
// ANTES de escribirlo: ese panel tiene que mostrar, al lado de cada club y sin
// entrar a ninguno, su punto de calidad de dato y cuántos ejercicios tiene. Las
// dos cosas viven adentro de `data/<club>-data.js`, que es justamente lo que el
// panel NO puede cargar (son 41 archivos hoy, 1000 mañana). Verificado en el
// navegador con la página recién abierta: `clubs{}` tiene 41 entradas y
// `sources{}` tiene 3, todas de Boca.
//
// La salida fácil habría sido tipear la calidad a mano en `clubs.js`, y sería un
// campo más que se desincroniza del dato real la primera vez que alguien carga
// un balance nuevo. Acá se CALCULA, con la misma `clubQuality()` que usa el
// sitio (`data/sources-view.js`).
//
// Formato: claves cortas a propósito, porque esto viaja en cada pageview.
//   n: displayName · c: país ISO-2 · q: calidad (ver CLUB_QUALITY)
//   y: cuántos ejercicios cargados · last: el ejercicio más reciente
//   yrs: [[año, reportType], ...] del más reciente al más viejo (Versión 146)
// Son ~60 bytes por club contra los ~366 de `clubs.js`, o sea ~60 KB contra
// ~366 KB proyectados a 1000 clubes.
function buildClubIndex({ clubs, sources, generic, clubQuality }) {
  const idx = {};
  for (const id of Object.keys(clubs).sort()) {
    const meta = (generic[id] || {}).fiscalYearMeta || {};
    const years = Object.keys(meta).map(Number).sort((a, b) => a - b);
    idx[id] = {
      n: clubs[id].displayName || clubs[id].name,
      c: clubs[id].country,
      q: clubQuality(sources, id),
      y: years.length,
      last: years.length ? years[years.length - 1] : null,
      // `yrs` (Versión 146): la LISTA de ejercicios, no solo el conteo, del más
      // reciente al más viejo, cada uno con su reportType. Lo pidió el selector:
      // para ofrecer "Balance 2024/2025" o "Presupuesto 2026/2027" al lado de cada
      // club hace falta saber qué años tiene y de qué tipo es cada uno, y eso vivía
      // solo adentro del `data/<club>-data.js` que el panel justamente no puede
      // cargar (41 archivos hoy, 1000 mañana). Con el conteo (`y`) no alcanzaba.
      //
      // Se listan TODOS los ejercicios de `fiscalYearMeta`, incluidos los
      // placeholder, para que `y === yrs.length` siempre y el índice sea un espejo
      // fiel del dato. Filtrar los que no se pueden mostrar es decisión de quien
      // consume (el selector ya sabe que 'placeholder' y 'pending_official' no son
      // navegables, mismo criterio que usaba `goToFinanzasYear()`, borrada en la Versión 184).
      //
      // SOBRE EL PESO, que es la objeción obvia a meter esto en un archivo que se
      // baja en cada visita: son ~30 bytes por ejercicio, o sea ~2,5 KB para los 85
      // de hoy y ~90 KB proyectados a 1000 clubes. Se guarda el reportType COMPLETO
      // y no un código de una letra a propósito: son 7 strings que se repiten miles
      // de veces, o sea justo lo que gzip aplasta a casi nada, y un código propio
      // costaría una tabla de traducción y un archivo ilegible para ahorrar bytes
      // que el transporte ya ahorra.
      yrs: years.slice().reverse().map(y => [y, meta[y].reportType]),
    };
  }
  const filas = Object.keys(idx).map(id => `  ${JSON.stringify(id)}: ${JSON.stringify(idx[id])},`);
  return `// ============================================================================
// data/club-index.js — GENERADO AUTOMÁTICAMENTE por tools/generate-club-index.js.
// NO EDITAR A MANO: se sobrescribe.
//
// El índice liviano de todos los clubes, para lo que necesita mostrarse ANTES de
// cargar ninguno (el selector de club, y cualquier vista que liste clubes sin
// entrar a sus datos). Todo lo de acá sale de \`clubs.js\` y de los
// \`fiscalYearMeta\`/\`sources\` de cada club, así que no puede desincronizarse.
//
//   n: nombre corto · c: país ISO-2 · q: calidad del dato (ver clubQuality() en
//   data/sources-view.js) · y: ejercicios cargados · last: el más reciente ·
//   yrs: los ejercicios, del más reciente al más viejo, como [año, reportType]
// ============================================================================

window.CLUB_INDEX = {
${filas.join('\n')}
};
`;
}

function main() {
  const check = process.argv.includes('--check');
  const data = loadData();

  // Un club con data file pero sin entrada en clubs.js no se renderiza en el
  // sitio: es un error real y conviene gritarlo acá, que es donde se mira.
  const huerfanos = Object.keys(data.generic).filter(id => !data.clubs[id]);
  if (huerfanos.length) {
    console.error(`ERROR: estos clubes tienen data/<club>-data.js pero no están en data/clubs.js, así que el sitio nunca los muestra: ${huerfanos.join(', ')}`);
    process.exit(1);
  }

  const generated = buildIndex(data);
  const html = fs.readFileSync(ESTADO, 'utf8');
  const i = html.indexOf(START), j = html.indexOf(END);
  if (i === -1 || j === -1) {
    console.error(`ERROR: no encontré los marcadores en ESTADO.md.\n  ${START}\n  ${END}`);
    process.exit(1);
  }

  const current = html.slice(i + START.length, j);
  const next = '\n' + generated + '\n';

  if (current === next) {
    console.log(`ESTADO.md ya está al día (${Object.keys(data.generic).length} clubes).`);
    generarClubIndex(data, check);
    return;
  }
  if (check) {
    console.error('ESTADO.md quedó DESACTUALIZADO respecto de los datos. Corré: node tools/generate-club-index.js');
    process.exit(1);
  }

  fs.writeFileSync(ESTADO, html.slice(0, i + START.length) + next + html.slice(j), 'utf8');
  console.log(`ESTADO.md actualizado: ${Object.keys(data.generic).length} clubes.`);
  generarClubIndex(data, check);
}

function generarClubIndex(data, check) {
  const nuevo = buildClubIndex(data);
  const viejo = fs.existsSync(CLUB_INDEX_FILE) ? fs.readFileSync(CLUB_INDEX_FILE, 'utf8') : null;
  if (viejo === nuevo) {
    console.log(`data/club-index.js ya está al día (${Object.keys(data.clubs).length} clubes).`);
    return;
  }
  if (check) {
    console.error('data/club-index.js quedó DESACTUALIZADO respecto de los datos. Corré: node tools/generate-club-index.js');
    process.exit(1);
  }
  fs.writeFileSync(CLUB_INDEX_FILE, nuevo, 'utf8');
  console.log(`data/club-index.js actualizado: ${Object.keys(data.clubs).length} clubes, ${nuevo.length} bytes.`);
}

main();

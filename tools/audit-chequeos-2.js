// tools/audit-chequeos-2.js — checkLigasPorEjercicio, checkDeployInterno, checkIndexFileRoto, checkSponsorBusqueda, checkComentariosPublicados, checkParrafoNetlifyDuplicado, checkRutasMuertas, checkComentarioHistoricoEnTools, checkCabeceraLargaEnTools, checkToolGrande, checkHistoriaEnDocs, checkParrafosRepetidos, checkRayaLarga, checkGenerados. Mudados de tools/audit.js sin cambiar una línea; lo compartido (add, ROOT, fs, path…) está en tools/audit-base.js.

const { REPORT_TYPES_REALES, ROOT, add, clubYears, execFileSync, execSync, fs, mdsDeSkills, path, ref } = require('./audit-base.js');

function checkLigasPorEjercicio(api) {
  const cob = api.clubLeagueCoverage ? api.clubLeagueCoverage() : null;
  if (!cob) return;

  const sinFila = [];
  for (const { clubId, year, ym } of clubYears(api)) {
    if (!REPORT_TYPES_REALES.includes(ym.reportType)) continue;
    const delClub = api.CLUB_LEAGUE_BY_YEAR[clubId];
    if (!delClub || !(year in delClub)) sinFila.push(ref(clubId, year));
  }
  if (sinFila.length) {
    add('P2', 'liga-sin-fila', `${sinFila.length} ejercicios reales sin fila en data/club-leagues.js (${sinFila.slice(0, 6).join(', ')}${sinFila.length > 6 ? '…' : ''}): al cargar un ejercicio hay que agregarle su fila, si no el selector no sabe en qué categoría se jugó`);
  }
  if (cob.faltan) {
    add('P3', 'liga-sin-verificar', `${cob.faltan} de ${cob.total} filas de data/club-leagues/<iso2>.js siguen en null, o sea sin verificar contra fuente`);
  }
}

// --- D16: los KB que la guía de arranque promete --------------
// POR QUÉ ESTO ES UN CHEQUEO Y NO UN DETALLE COSMÉTICO. La tabla de
// `.claude/skills/start-session-finance-of-sports-project/SKILL.md` §1 existe
// para una sola cosa: que una sesión decida QUÉ ABRIR y qué no, antes de
// gastar el token de abrirlo. Un número 3 veces más chico que el archivo real
// hace exactamente lo contrario de lo que la tabla promete. Medido en la
// una auditoría de docs: `club-sourcing` decía 33 KB y pesaba 91, y
// `Admin/CHANGELOG.md` decía 68 y pesaba 189 — los dos archivos que más conviene NO
// abrir de corrido, anunciados como si fueran livianos.
// Es P3 porque no rompe nada y no publica un número malo; sale igual en cada
// corrida porque el desfasaje vuelve solo (los docs crecen todas las sesiones).
// checkPesoDocs() se borró: chequeaba los KB que la guía de arranque anotaba de cada
// documento, y Guido decidió sacar esos números de la guía para no tener que actualizarlos nunca más.

// --- D17: documentos internos que netlify.toml NO saca del deploy (V176) ----
// POR QUÉ ESTO ES UN CHEQUEO Y NO ALGO QUE SE MIRA A OJO. netlify.toml (Versión
// 173) explica su propia razón de ser con un caso real: `financeofsports.com/
// CLAUDE.md` devolvía 200 hasta que se armó el `rm` que lo saca del artefacto de
// deploy. Después hubo DOS casos más del mismo problema: uno encontró
// `PROMPT-generador-indice-fuentes.md` (creado en la misma sesión que escribió la
// advertencia, nunca sumado a la lista), y la reorganización de los documentos internos
// encontró `COMO-CORRE-EL-PROYECTO.html` SERVIDO EN PRODUCCIÓN — un documento
// escrito para Guido, que este mismo chequeo no veía porque solo miraba `.md`.
// O sea: "acordate de agregarlo" ya falló tres veces.
//
// QUÉ VERIFICA HOY: cambió la forma de excluir. Ya no hay una
// lista de nombres sueltos que mantener: los documentos internos viven todos en
// `Admin/` y sale una sola línea (`rm -rf Admin`). Así que son dos invariantes:
//   1. `Admin/` TIENE que estar cubierto por un `rm -rf` de netlify.toml. Si no,
//      se publica el proyecto entero por dentro. Eso es P1, no P2: no es un
//      archivo suelto que se escapa, son todos juntos.
//   2. Ningún documento suelto de la raíz (`.md` o `.html`) fuera de las páginas
//      del sitio. Su lugar es `Admin/`; la alternativa (sumarlo al `rm -f`) existe
//      pero es la que ya falló tres veces, así que el hallazgo empuja a mudarlo.
// El `.html` del punto 2 es la lección de `COMO-CORRE-EL-PROYECTO.html`: la
// extensión no dice nada sobre si un documento es para el visitante.
function checkDeployInterno() {
  const netlifyPath = path.join(ROOT, 'netlify.toml');
  if (!fs.existsSync(netlifyPath)) return;
  const toml = fs.readFileSync(netlifyPath, 'utf8');

  const excluidos = new Set();
  for (const m of toml.matchAll(/rm -f ([^\n|]+?)\s*\|\|\s*true/g)) {
    m[1].trim().split(/\s+/).forEach(f => excluidos.add(f));
  }
  const carpetasBorradas = new Set();
  for (const m of toml.matchAll(/rm -rf ([^\n|]+?)\s*\|\|\s*true/g)) {
    m[1].trim().split(/\s+/).forEach(d => carpetasBorradas.add(d.replace(/\/$/, '')));
  }

  // 1. La carpeta de documentos internos, entera.
  if (fs.existsSync(path.join(ROOT, 'Admin')) && !carpetasBorradas.has('Admin')) {
    add('P1', 'admin-no-excluido',
      'Admin/ existe pero netlify.toml no la saca del deploy: TODOS los documentos internos del proyecto quedarían servidos en financeofsports.com/Admin/... Sumá `rm -rf Admin || true` al command de netlify.toml');
  }

  // 2. Documentos sueltos en la raíz. Estas dos son las páginas del sitio, no
  //    documentación: son lo único que legítimamente vive acá con esta extensión.
  const PAGINAS_DEL_SITIO = new Set(['index.html', 'fuentes.html']);
  const sueltos = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isFile() && (d.name.endsWith('.md') || d.name.endsWith('.html')))
    .map(d => d.name).sort();

  for (const f of sueltos) {
    if (PAGINAS_DEL_SITIO.has(f) || excluidos.has(f)) continue;
    add('P2', 'doc-interno-no-excluido',
      `${f}: documento suelto en la raíz que netlify.toml no saca del deploy. Si es interno, movelo a Admin/ (no hay que tocar netlify.toml); si el contenido es para el visitante, dejá una entrada en tools/audit-ignore.json con el motivo`);
  }
}

// --- Las páginas de la raíz tienen que abrir como archivo (P1 index-file-roto) --------------------------------------------------------
// Un <base href="/"> en index.html rompió abrir el sitio suelto (file://): sin estilos ni scripts, y nadie lo vio. Las rutas las arma fosUrl() de js/i18n.js
// (Admin/PANTALLA.md, «Verificar en el browser de verdad»). En index.html y en cada .html suelto de la raíz: ninguna etiqueta <base> (ni escrita con document.write)
// y ningún src/href propio que empiece con «/» (los «//» externos y las #anclas valen). club/ y liga/ quedan fuera: se sirven solo detrás de Netlify.
function checkIndexFileRoto() {
  const htmls = fs.readdirSync(ROOT, { withFileTypes: true }).filter(d => d.isFile() && d.name.endsWith('.html')).map(d => d.name).sort();
  for (const f of htmls) {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));
    const lineaDe = (i) => html.slice(0, i).split('\n').length;
    const base = html.match(/<base[\s>/]/i);
    if (base) add('P1', 'index-file-roto', `${f} (línea ${lineaDe(base.index)}): tiene una etiqueta <base> (o la escribe con document.write); rompe abrir el sitio como archivo (file://). Armá las rutas con fosUrl() de js/i18n.js`);
    const propios = [...html.replace(/<base\b[^>]*>/gi, m => ' '.repeat(m.length)).matchAll(/\b(?:src|href)\s*=\s*["']\/(?!\/)[^"']*/gi)];
    if (propios.length) add('P1', 'index-file-roto', `${f} (línea ${lineaDe(propios[0].index)}): ${propios.length} src/href propio(s) que empiezan con «/» (el primero: ${propios[0][0].replace(/\s+/g, '')}); no cargan al abrir el sitio como archivo (file://). Usá una ruta relativa o fosUrl()`);
  }
}

// --- El sponsor sin fuente lleva el registro de búsqueda -----------------------------------------------
// tools/contexto-manual.json: `sin-fuente.sponsor` solo vale como registro { buscado, por, intentos } con tres clases sin contar Wikipedia, o como { legacy: true, texto } de un club y
// año que están en tools/sponsor-legacy.json (la lista no crece). La compuerta de estadio-sponsor.mjs lo comprueba al cargar; esto no depende de que alguien la corra.
function checkSponsorBusqueda() {
  const f = path.join(ROOT, 'tools', 'contexto-manual.json');
  if (!fs.existsSync(f)) return;
  const { validar, listaLegacy } = require('./sponsor-busqueda.js');
  const manual = JSON.parse(fs.readFileSync(f, 'utf8')); const lista = listaLegacy();
  const malos = []; const fuera = []; let legacy = 0;
  for (const [club, anios] of Object.entries(manual)) {
    if (club.startsWith('_')) continue;
    for (const [anio, d] of Object.entries(anios)) {
      const v = d && d['sin-fuente'] && d['sin-fuente'].sponsor; if (v === undefined) continue;
      const r = validar(v, club, anio, lista);
      if (r.ok) { if (r.legacy) legacy++; } else if (v && v.legacy === true) fuera.push(`${club} ${anio}`); else malos.push(`${club} ${anio}: ${r.motivo}`);
    }
  }
  if (malos.length) add('P1', 'sponsor-sin-busqueda', `${malos.length} año(s) con sin-fuente.sponsor sin registro de búsqueda válido (skill club-sourcing 0.5): ${malos.slice(0, 3).join(' · ')}${malos.length > 3 ? ' · …' : ''}`);
  if (fuera.length) add('P1', 'sponsor-legacy-fuera-de-lista', `${fuera.length} año(s) con «legacy» que no están en tools/sponsor-legacy.json (la lista no crece; hay que hacer la búsqueda de la skill club-sourcing 0.5): ${fuera.slice(0, 5).join(', ')}`);
  if (legacy) add('P3', 'sponsor-sin-registro', `${legacy} año(s) con el sponsor sin fuente como texto libre de antes (tools/sponsor-legacy.json): completar con el registro de búsqueda cuando alguien toque el club`);
}

// --- Comentarios internos en lo que se publica -------------
// Todo comentario de index.html, js/ y data/ viaja al visitante. La regla (Admin/PANTALLA.md, "Comentarios en lo que se publica") deja
// solo el porqué técnico: nada de nombres, "Versión N", "to-do N", fechas ni contadores de clubes. Un hallazgo por archivo, con el total y
// el primer caso; la lista completa sale con --json. Además, un data/<país>/<club>-data.js no lleva NINGÚN comentario (Admin/CONVENCIONES-DATOS.md):
// la evidencia de cada carga va a Admin/carga-clubes/<club>.md, y una nota de evidencia puede no tener nada que la regex reconozca.
const COMENTARIO_INTERNO = /\bGuido\b|\bVersi[oó]n(es)? \d+|\bto-do \d+|(?<!@)\b20\d\d-\d\d-\d\d\b|\b\d{2,} clubes\b/i;
function checkComentariosPublicados() {
  const { comentarios, publicados } = require('./comparar-sin-comentarios.js');
  const jsDe = dir => fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(e => e.isDirectory() ? jsDe(dir + '/' + e.name) : e.name.endsWith('.js') ? [dir + '/' + e.name] : []);
  for (const rel of [...publicados(), ...jsDe('data')]) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    // La cabecera fija que pone tools/generar-data.mjs ("GENERADO desde … no editar a mano") es el único comentario que un data file lleva.
    const todos = comentarios(rel, src).filter(c => !/^GENERADO desde data\/[a-z]{2}\/[a-z0-9-]+\.json por tools\/generar-data\.mjs/.test(String(c.text).trim().replace(/^\/\/\s*/, '')));
    if (/^data\/(?:[a-z]{2}\/)?[^/]+-data\.js$/.test(rel) && todos.length) {
      add('P2', 'comentario-en-data-club',
        `${rel}: ${todos.length} comentarios (el primero en la línea ${todos[0].line}). Un data/<país>/<club>-data.js no lleva comentarios: la nota va a Admin/carga-clubes/<club>.md (regla: Admin/CONVENCIONES-DATOS.md)`);
    }
    const malos = todos.filter(c => COMENTARIO_INTERNO.test(c.text));
    if (!malos.length) continue;
    const primero = malos[0].text.match(COMENTARIO_INTERNO)[0];
    add('P2', 'comentario-interno-publicado',
      `${rel}: ${malos.length} comentarios con historia interna que ve el visitante (el primero en la línea ${malos[0].line}: «${primero}»). Regla: Admin/PANTALLA.md, "Comentarios en lo que se publica"; limpiar con node tools/comparar-sin-comentarios.js`);
  }
}

// --- D17b: el párrafo que explica netlify.toml, copiado en 3 archivos, con -
//     números que se desincronizan ----------
// POR QUÉ. `CLAUDE.md`, `Admin/ESTADO.md` y `Admin/CONVENCIONES.md` explican los
// tres la misma mecánica de netlify.toml ("YA NO ES CIERTO:
// AHORA SÍ HAY netlify.toml...") con el mismo párrafo copiado a mano, y cada uno
// nombra cuántas páginas `fuentes/<clubId>.html` se publican y cuántas notas
// `fuentes/**/*.md` quedan afuera del deploy. Un crecimiento de clubes actualiza
// esos números en UN archivo (el que tocó la sesión que cargó el club) y dos
// quedan atrás — encontrado de verdad: `CONVENCIONES.md` seguía
// diciendo "41 páginas" / "613 notas" mientras `CLAUDE.md` ya decía 161/655.
// QUÉ VERIFICA: en cada archivo que tenga el párrafo, que sus dos números
// coincidan con el conteo real de `fuentes/*.html` y `fuentes/**/*.md`.
function checkParrafoNetlifyDuplicado() {
  const ARCHIVOS = ['CLAUDE.md', 'Admin/ESTADO.md', 'Admin/CONVENCIONES.md'];
  const ANCLA = 'AHORA SÍ HAY `netlify.toml`';
  let realPaginas = 0, realNotas = 0;
  try {
    realPaginas = fs.readdirSync(path.join(ROOT, 'fuentes')).filter(f => f.endsWith('.html')).length;
  } catch (e) { return; }
  const contarMd = (dir) => {
    let n = 0;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) n += contarMd(path.join(dir, e.name));
      else if (e.name.endsWith('.md')) n++;
    }
    return n;
  };
  try { realNotas = contarMd(path.join(ROOT, 'fuentes')); } catch (e) { /* sin fuentes/, no aplica */ }

  for (const rel of ARCHIVOS) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const texto = fs.readFileSync(abs, 'utf8');
    const idx = texto.indexOf(ANCLA);
    if (idx === -1) continue; // este archivo no (más) tiene el párrafo — no es un error
    const parrafo = texto.slice(idx, idx + 600);
    const mPaginas = parrafo.match(/Las (\d+) páginas/);
    const mNotas = parrafo.match(/las (\d+) notas/);
    if (mPaginas && Number(mPaginas[1]) !== realPaginas) {
      add('P2', 'doc-parrafo-netlify-desfasado',
        `${rel}: el párrafo de netlify.toml dice "${mPaginas[1]} páginas fuentes/<clubId>.html" pero hoy hay ${realPaginas} — mismo párrafo copiado en ${ARCHIVOS.join(', ')}, actualizalo en los 3`);
    }
    if (mNotas && Number(mNotas[1]) !== realNotas) {
      add('P2', 'doc-parrafo-netlify-desfasado',
        `${rel}: el párrafo de netlify.toml dice "${mNotas[1]} notas de fuentes/**/*.md" pero hoy hay ${realNotas} — mismo párrafo copiado en ${ARCHIVOS.join(', ')}, actualizalo en los 3`);
    }
  }
}

// --- D18: rutas de archivo que ya no existen --------
// POR QUÉ. La reorganización de los documentos internos movió 11 documentos y actualizó 203
// referencias en 31 archivos. Esa verificación se hizo con un script de una sola
// corrida, y una sola referencia olvidada manda a una sesión futura a un archivo que
// no está, sin que nada se queje. No es hipotético: este chequeo, la primera vez que
// corrió, encontró 44 archivos (`Admin/sourcing/_indice/<País>.md`, uno por país) que
// seguían linkeando el viejo fuentes-por-club.md, renombrado a `Admin/sourcing/README.md` dos
// versiones antes. El barrido a mano no los había mirado.
//
// QUÉ MIRA. Solo archivos VIVOS: los que una sesión lee para saber qué hacer. Quedan
// afuera a propósito `Admin/CHANGELOG.md`, `Admin/finance-of-sports-project.md`,
// `Admin/Archive/`, `auditorias/` y `Prototyping/`, que son HISTORIA: una entrada de
// septiembre que nombra `ESTADO.md` era verdad el día que se escribió, y "corregirla"
// sería falsear el registro.
//
// DOS FORMAS DE NOMBRAR UN ARCHIVO, y las dos se chequean: la ruta entre backticks
// (`data/clubs.js`) y el destino de un link Markdown, que se resuelve relativo a su
// propio archivo — que es justo como estaban escritos los 44 de arriba.
//
// LO QUE NO PUEDE DISTINGUIR SOLO, y por eso hay entradas en audit-ignore.json: este
// proyecto documenta lo que BORRÓ tanto como lo que tiene ("comparar-clubes.js ya no
// existe", "no hay un archivo de idioma para el castellano porque es el idioma fuente").
// Una ruta nombrada para decir que NO está se ve igual que un puntero roto. Se probó
// detectar la negación por contexto y cubría 5 de 7 casos: un chequeo que acierta a
// veces es peor que uno estricto, porque no sabés en cuál de los dos estás parado. La
// decisión va a mano, con el motivo escrito, como el resto de audit-ignore.json.
const RUTA_EN_TEXTO = /^[A-Za-z0-9_][A-Za-z0-9_./-]*\.(md|js|html|json|toml|xml)$/;

function archivosVivos() {
  const hay = rel => fs.existsSync(path.join(ROOT, rel));
  const dir = (d, filtro) => {
    try {
      return fs.readdirSync(path.join(ROOT, d)).filter(filtro).map(n => `${d}/${n}`);
    } catch { return []; }
  };
  const js = n => n.endsWith('.js');
  return [
    'CLAUDE.md', 'index.html', 'netlify.toml', 'Admin/sourcing/README.md',
    ...dir('js', js), ...dir('tools', n => js(n) || n.endsWith('.json')),
    ...dir('data', js), ...dir('data/lang', js),
    ...dir('data/club-leagues', js), ...dir('data/rankings', js),
    // Todos los .md de las skills: paises/, referencia/, worktree.md… no solo cada SKILL.md.
    ...mdsDeSkills(),
    // Admin/ menos los dos históricos. Archive/ no entra: es una subcarpeta.
    ...dir('Admin', n => n.endsWith('.md') || n.endsWith('.html'))
      .filter(f => !/CHANGELOG\.md$|finance-of-sports-project\.md$/.test(f)),
    ...dir('Admin/sourcing/_indice', n => n.endsWith('.md')),
  ].filter(hay);
}

// Todo path real del repo, y todos sus sufijos: una mención abreviada como
// `club-data-mapping/SKILL.md` (sin el `.claude/skills/` adelante) es legítima y no
// tiene que dar hallazgo.
function sufijosDelRepo() {
  const todos = [];
  (function walk(d) {
    let entradas;
    try { entradas = fs.readdirSync(path.join(ROOT, d || '.'), { withFileTypes: true }); }
    catch { return; }
    for (const e of entradas) {
      const rel = d ? `${d}/${e.name}` : e.name;
      if (e.name === '.git' || e.name === 'node_modules') continue;
      if (e.isDirectory()) walk(rel); else todos.push(rel);
    }
  })('');
  const sufijos = new Set();
  for (const p of todos) {
    const partes = p.split('/');
    for (let i = 0; i < partes.length; i++) sufijos.add(partes.slice(i).join('/'));
  }
  return sufijos;
}

function checkRutasMuertas() {
  const sufijos = sufijosDelRepo();
  const porRuta = new Map();
  const anotar = (ruta, archivo) => {
    if (!porRuta.has(ruta)) porRuta.set(ruta, new Set());
    porRuta.get(ruta).add(archivo);
  };

  for (const f of archivosVivos()) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');

    for (const m of src.matchAll(/`([^`\n]{1,120})`/g)) {
      const t = m[1].trim();
      if (!RUTA_EN_TEXTO.test(t)) continue;          // deja afuera prosa, globs, <placeholders>, ${interpolaciones}
      const primero = t.split('/')[0];
      if (t.includes('/') && primero.includes('.') && !primero.startsWith('.')) continue;  // financeofsports.com/algo: es una URL
      if (!sufijos.has(t)) anotar(t, f);
    }

    // Links Markdown con destino relativo. Se resuelven desde la carpeta del archivo
    // que los contiene, no desde la raíz.
    if (!f.endsWith('.md')) continue;
    for (const m of src.matchAll(/\]\(([^)\s]+)\)/g)) {
      const destino = m[1].split('#')[0];
      if (!destino || /^(https?:|mailto:|#|\/)/.test(destino)) continue;
      if (!RUTA_EN_TEXTO.test(destino.replace(/^(\.\.?\/)+/, ''))) continue;
      const abs = path.resolve(path.dirname(path.join(ROOT, f)), destino);
      if (!fs.existsSync(abs)) anotar(`${destino} (link)`, f);
    }
  }

  // UNA RUTA GITIGNOREADA NO CUENTA. Su presencia no es una propiedad
  // del repo sino de ESTE checkout: `Clubes/Argentina/River/estados-contables-leads/`
  // (la fuente no oficial, que se guarda y no se trackea) está en el árbol principal y
  // NO en un worktree recién creado, así que el data file de River citándola daba
  // hallazgo en un lado y no en el otro. Peor que ruidoso: empujaba a "arreglar" el
  // comentario de un archivo de club que estaba bien. Lo destapó el worktree de
  // sourcing, que nace sin ninguno de los 2881 PDFs ni de los archivos ignorados.
  const candidatas = [...porRuta.keys()].filter(r => !r.endsWith(' (link)'));
  if (candidatas.length) {
    try {
      const salida = execFileSync('git', ['check-ignore', '--', ...candidatas],
        { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      for (const linea of salida.split('\n')) if (linea.trim()) porRuta.delete(linea.trim());
    } catch (e) {
      // exit 1 = ninguna está ignorada, que es el caso normal. Cualquier otro error
      // (sin git, sin repo) deja el chequeo como estaba: estricto.
    }
  }

  for (const [ruta, archivos] of [...porRuta].sort((a, b) => b[1].size - a[1].size)) {
    const lista = [...archivos].sort();
    const muestra = lista.slice(0, 3).join(', ') + (lista.length > 3 ? `, +${lista.length - 3} más` : '');
    add('P2', 'ruta-muerta',
      `\`${ruta}\`: no existe, y lo nombran ${lista.length} archivo(s) vivo(s) (${muestra}). Si se renombró, actualizá la referencia; si se nombra para decir que NO existe, dejá una entrada en tools/audit-ignore.json con el motivo`);
  }
}

// --- HISTORIA EN LOS DOCUMENTOS DE CRITERIO -----------------
// Las skills, CLAUDE.md y los documentos de criterio dicen cómo se trabaja y qué hay HOY: sin «Versión N», sin fechas de decisión y
// sin «to-do N» (eso va a Admin/CHANGELOG.md y Admin/TODO.md; ver CLAUDE.md, «Al empezar»). P3: es la lista de limpieza, no una alarma.
// No mira contadores fijos («58 clubes»): el patrón da falsos positivos y no se midió su precisión.
const DOCS_DE_CRITERIO = ['CLAUDE.md', 'Admin/ESTADO.md', 'Admin/PIPELINE.md', 'Admin/CONVENCIONES.md', 'Admin/CONVENCIONES-DATOS.md', 'Admin/PANTALLA.md'];
const HISTORIA_EN_DOCS = [
  ['version', /\bVersi[óo]n \d+/g, '«Versión N»'],
  ['fecha', /\b20\d\d-\d\d-\d\d\b/g, 'fechas AAAA-MM-DD'],
  ['todo', /\bto-dos? (?:n[°º] ?)?\d{2,3}\b|\btodo (?:n[°º] ?)?\d{2,3}\b/gi, '«to-do N»'], // «todos» seguido de un código de respuesta HTTP no es un número de tarea
];

// Una fecha que es un dato del mundo y no la historia de una decisión: el último chequeo de un país, el nombre de un archivo con fecha, una referencia de tipo de cambio, el cierre de un ejercicio.
const FECHA_QUE_ES_DATO_RE = /[úu]ltimo chequeo|chequeo[: ]+20\d\d|confirmado|probado el|barrido:|\w[\w/-]*20\d\d-\d\d-\d\d[\w-]*\.md|fxRef|desde el 20\d\d|period_end|cierre|ejercicio|fiscal|"buscado"/i;

// Los comentarios de tools/ llevan el porqué, la invariante y las trampas; la historia («Versión N», «to-do N», fechas) va a Admin/CHANGELOG.md. P3: la lista de limpieza.
// Cuenta por tool; tools/archivo/ no entra. Cómo se limpia y la prueba de que no cambió el código: Admin/CONVENCIONES.md, «Comentarios en tools/».
function checkComentarioHistoricoEnTools() {
  const { herramientas, medirTool } = require('./comparar-sin-comentarios.js');
  const filas = herramientas().map(medirTool).filter(r => r.historia.length);
  if (!filas.length) return;
  const total = filas.reduce((a, r) => a + r.historia.length, 0);
  const top = filas.sort((a, b) => b.historia.length - a.historia.length).slice(0, 5).map(r => `${r.f}:${r.historia[0].line} (${r.historia.length})`).join(', ');
  add('P3', 'comentario-historico-en-tools', `${total} referencias a «Versión N», «to-do N» o fechas en comentarios de ${filas.length} tools; las que más (archivo:primera línea): ${top}. Un comentario dice el porqué y la invariante, no cuándo se decidió`);
}

// Una cabecera de más de CABECERA_MAX líneas se lee en cada sesión que abre la tool: el porqué, el uso y las trampas en pocas líneas; lo demás está en Admin/PIPELINE.md. P3: la lista de limpieza.
// Una excepción se escribe con su motivo en tools/cabeceras-aceptadas.json ({ "<tool>": "motivo" }).
function checkCabeceraLargaEnTools() {
  const { herramientas, medirTool, CABECERA_MAX } = require('./comparar-sin-comentarios.js');
  let aceptadas = {}; try { aceptadas = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'cabeceras-aceptadas.json'), 'utf8')); } catch (e) { /* sin excepciones */ }
  const largas = herramientas().map(medirTool).filter(r => r.cabecera > CABECERA_MAX && !aceptadas[r.f]).sort((a, b) => b.cabecera - a.cabecera);
  if (!largas.length) return;
  add('P3', 'cabecera-larga-en-tools', `${largas.length} tools con una cabecera de más de ${CABECERA_MAX} líneas; las más largas: ${largas.slice(0, 5).map(r => `${r.f} (${r.cabecera})`).join(', ')}. Dejá el porqué, el uso y las trampas; el resto está en Admin/PIPELINE.md`);
}

// Una tool de más de TOOL_MAX_KB no se lee entera (CLAUDE.md): se parte en módulos (`node tools/fos.mjs mover`) o queda con su motivo en tools/tamanos-aceptados.json ({ "<tool>": "motivo" }). P3.
const TOOL_MAX_KB = 40;
function checkToolGrande() {
  let aceptadas = {}; try { aceptadas = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'tamanos-aceptados.json'), 'utf8')); } catch (e) { /* sin excepciones */ }
  const grandes = fs.readdirSync(path.join(ROOT, 'tools')).filter(f => /\.(mjs|js)$/.test(f)).map(f => ({ f, kb: fs.statSync(path.join(ROOT, 'tools', f)).size / 1024 })).filter(x => x.kb > TOOL_MAX_KB && !aceptadas[x.f]).sort((a, b) => b.kb - a.kb);
  if (!grandes.length) return;
  add('P3', 'tool-grande', `${grandes.length} tools de más de ${TOOL_MAX_KB} KB sin motivo escrito: ${grandes.slice(0, 5).map(x => `${x.f} (${Math.round(x.kb)} KB)`).join(', ')}. Partila con node tools/fos.mjs mover (rango de fos mapa) o escribí el motivo en tools/tamanos-aceptados.json`);
}

function checkHistoriaEnDocs() {
  const archivos = [...DOCS_DE_CRITERIO, ...mdsDeSkills()].filter(f => fs.existsSync(path.join(ROOT, f)));
  for (const [clave, re, nombre] of HISTORIA_EN_DOCS) {
    const porArchivo = new Map();
    const primera = new Map();   // la primera línea con el patrón: dónde empezar a limpiar
    for (const f of archivos) {
      let texto = fs.readFileSync(path.join(ROOT, f), 'utf8');
      // la línea o la anterior (la frase sigue en la línea de abajo: «Último chequeo» y debajo la fecha); el número de línea no cambia
      if (clave === 'fecha') texto = texto.split('\n').map((l, i, ls) => (FECHA_QUE_ES_DATO_RE.test(l) || (i > 0 && FECHA_QUE_ES_DATO_RE.test(ls[i - 1])) ? '' : l)).join('\n');
      const n = (texto.match(re) || []).length;
      if (!n) continue;
      porArchivo.set(f, n);
      primera.set(f, texto.slice(0, texto.search(re)).split('\n').length);
    }
    if (!porArchivo.size) continue;
    const total = [...porArchivo.values()].reduce((a, b) => a + b, 0);
    const top = [...porArchivo].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([f, n]) => `${f}:${primera.get(f)} (${n})`).join(', ');
    add('P3', 'historia-en-doc-de-criterio', `${nombre}: ${total} en ${porArchivo.size} documentos de criterio (skills, CLAUDE.md, ESTADO, PIPELINE, CONVENCIONES*, PANTALLA); los que más (archivo:primera línea): ${top}. Esos documentos dicen qué hay HOY: la historia va a Admin/CHANGELOG.md y los pendientes a Admin/TODO.md`);
  }
}

// --- PÁRRAFOS REPETIDOS ENTRE DOCUMENTOS VIVOS -------------
// Una regla escrita en dos lugares se desincroniza: es lo que ensució las skills antes de la consolidación del 255. Compara párrafos de
// 200 caracteres o más (normalizados) entre CLAUDE.md, las skills y los Admin/*.md de primer nivel. Las subcarpetas de Admin/ (plantillas
// por país o por club, instrucciones de tandas, archivo) repiten texto a propósito y quedan afuera. P3.
const PARRAFO_MIN = 200;
const PARRAFO_SIMILITUD = 0.8;   // de las ventanas de 6 palabras del párrafo más corto, la fracción que está en el otro

function checkParrafosRepetidos() {
  const archivos = ['CLAUDE.md', ...mdsDeSkills(),
    ...fs.readdirSync(path.join(ROOT, 'Admin')).filter(f => f.endsWith('.md') && !/^(CHANGELOG|TODO|ESTADO-clubes)\.md$/.test(f)).sort().map(f => `Admin/${f}`)]
    .filter(f => fs.existsSync(path.join(ROOT, f)));
  const norm = s => s.toLowerCase().replace(/[`*_>#|-]/g, ' ').replace(/\s+/g, ' ').trim();
  const parrafos = [];
  for (const f of archivos) {
    for (const p of fs.readFileSync(path.join(ROOT, f), 'utf8').split(/\n\s*\n/)) {
      const n = norm(p);
      if (n.length < PARRAFO_MIN) continue;
      const w = n.split(' ');
      const ventanas = new Set();
      for (let i = 0; i + 6 <= w.length; i++) ventanas.add(w.slice(i, i + 6).join(' '));
      parrafos.push({ f, n, ventanas });
    }
  }
  const pares = [];
  for (let i = 0; i < parrafos.length; i++) {
    for (let j = i + 1; j < parrafos.length; j++) {
      const a = parrafos[i], b = parrafos[j];
      if (a.f === b.f) continue;
      const [chico, grande] = a.ventanas.size <= b.ventanas.size ? [a, b] : [b, a];
      let comunes = 0;
      for (const v of chico.ventanas) if (grande.ventanas.has(v)) comunes++;
      if (chico.ventanas.size && comunes / chico.ventanas.size >= PARRAFO_SIMILITUD) pares.push(`${a.f} ~ ${b.f}: «${a.n.slice(0, 60)}…»`);
    }
  }
  for (const par of pares) {
    add('P3', 'parrafo-repetido', `${par}. El mismo texto (≥${PARRAFO_MIN} caracteres) en dos documentos vivos: dejalo en uno y en el otro poné un puntero`);
  }
}

// --- RAYA LARGA EN EL TEXTO VISIBLE -------------------------
// Regla de estilo de Admin/CONVENCIONES.md: ni un em dash (—, U+2014) en el texto que ve el visitante. Mira data/lang/, js/, las páginas
// .html de la raíz y las generadas (club/, liga/). Sin comentarios (JS y HTML) ni <script>/<style>. Permitido: «—» como símbolo de
// «sin dato» (solo entre comillas, solo en una celda `>—<` o como leyenda `— = …`). No mira data/<país>/*.js: ahí un «—» es el texto
// literal de un rubro del documento (rawLabel) y no se reescribe.
// P2 y no P3: el visitante lo lee.
function rayasLargasVisibles() {
  const lista = (d, ext) => { const out = []; (function walk(r) {
    let es; try { es = fs.readdirSync(path.join(ROOT, r), { withFileTypes: true }); } catch { return; }
    for (const e of es) { const rel = `${r}/${e.name}`; if (e.isDirectory()) walk(rel); else if (rel.endsWith(ext)) out.push(rel); }
  })(d); return out; };
  const archivos = [...lista('data/lang', '.js'), ...lista('js', '.js'), ...lista('club', '.html'), ...lista('liga', '.html'),
    ...fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))];
  const SIMBOLO = /(["'`“”‘’])—\1|[“"'`]—[”"'`]|>\s*—\s*<|["'`“>]\s*—\s*=/g;
  const hallazgos = [];
  for (const f of archivos) {
    const vacia = m => m.replace(/[^\n]/g, '');
    let s = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (f.endsWith('.html')) s = s.replace(/<!--[\s\S]*?-->/g, vacia).replace(/<script[\s\S]*?<\/script>/g, vacia).replace(/<style[\s\S]*?<\/style>/g, vacia);
    else s = s.replace(/\/\*[\s\S]*?\*\//g, vacia).split('\n').map(l => l.replace(/(^|\s)\/\/.*$/, '$1')).join('\n');
    s.replace(SIMBOLO, '').split('\n').forEach((l, i) => { if (l.includes('—')) hallazgos.push(`${f}:${i + 1}`); });
  }
  return hallazgos;
}

function checkRayaLarga() {
  const hallazgos = rayasLargasVisibles();
  if (!hallazgos.length) return;
  add('P2', 'raya-larga-visible', `${hallazgos.length} línea(s) del texto visible del sitio con raya larga (—): ${hallazgos.slice(0, 8).join(', ')}${hallazgos.length > 8 ? ', …' : ''}. Regla de estilo de Admin/CONVENCIONES.md: punto, coma, dos puntos o paréntesis. Solo se permite «—» entre comillas como símbolo de «sin dato»`);
}

// --- D19: TODO LO GENERADO, AL DÍA ---------------------------
// El proyecto tiene 6 generadores (estos 5 tienen --check; el sexto es generate-como-corre-stats.js) y dependen de que alguien se acuerde de
// correrlos. "Acordate" ya falló antes acá (ver `checkDeployInterno`), y esta
// sesión encontró el caso más silencioso de todos: `generate-fuentes-page.js`
// LEE `ASSET_V` de index.html y lo escribe en las 42 páginas de fuentes, así que
// cualquier subida de ASSET_V las desactualiza a todas — sin tocar un solo dato,
// sin que nada se vea roto, y dejando al visitante con el JS nuevo en el sitio y
// el viejo de su caché en la página de fuentes, que es EXACTAMENTE el estado en
// el que una vez tiró `ReferenceError` en toda la página.
//
// Cuesta 0,2s para los 4 (cada uno levanta su propio proceso). Medido.
//
// P1 y no P2: lo que queda desfasado está PUBLICADO. Un `data/rankings/` viejo
// publica el ingreso de un club con el balance del año pasado; una página de
// fuentes vieja pide un asset que ya no existe; un Admin/ESTADO-clubes.md
// viejo le miente a la próxima sesión sobre qué hay cargado.
const GENERADORES = [
  ['generate-rankings.js',      'data/rankings/',                      'rankings-desfasado'],
  ['generate-fuentes-page.js',  'fuentes.html y sus páginas de club', 'fuentes-desfasada'],
  ['generate-club-pages.js',    'club/, liga/ y sitemap.xml (links propios con tarjeta, to-do 241)', 'club-pages-desfasado'],
  ['generate-club-index.js',    'Admin/ESTADO-clubes.md (generado)',         'club-index-desfasado'],
  ['generate-fuentes-index.js', 'el índice de Admin/sourcing/README.md',    'fuentes-indice-desfasado'],
  ['faltantes-liga.mjs',        'data/faltantes/ y Admin/sourcing/pendientes.md', 'faltantes-desfasado'], // cambia con cada carga y cada sourcing
  ['auditoria.mjs',             'data/auditoria/ (quién audita cada balance, to-do 282)', 'auditoria-desfasado'],
  ['entidades.mjs',             'data/entidades/ (estructura de cada club, to-do 280)', 'entidades-desfasado'],
  ['estimar.mjs',               'data/estimados/ (y ningún estimado al lado de un año real)', 'estimados-desfasado'], // sin la carpeta, no chequea
  ['generate-sponsors.js',      'data/sponsors.js (sponsors y marcas de cada liga)', 'sponsors-desfasado'], // une equipos a clubes del sitio
  ['generar-data.mjs',          'los data/<país>/<id>-data.js (se generan de su JSON: nunca a mano)', 'json-js-desfasado'], // el JSON es la fuente
  ['validar-esquema-json.mjs',  'el JSON de algún club (no valida contra data/schema/club-v2.json)', 'json-no-valida'],
  ['generar-correcciones.mjs',  'data/correcciones/ (el registro público de correcciones, to-do 247)', 'correcciones-desfasado'],
];
function checkGenerados() {
  for (const [script, que, code] of GENERADORES) {
    if (!fs.existsSync(path.join(ROOT, 'tools', script))) continue;
    try {
      execSync(`node tools/${script} --check`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      const detalle = String(e.stderr || e.stdout || '').trim().replace(/\s*\n\s*/g, ' ').slice(0, 220);
      // faltantes-liga.mjs --check (Auditora 5): 2 = las entradas no cambiaron pero se calculó hace más de 30 días; 3 = solo faltan en este worktree los enlaces a PDF (corré preparar). Ninguno de los dos
      // es un dato roto que el visitante vea: P3, para que ni el calendario ni un worktree sin preparar frenen commits ajenos. Con 1 (cambiaron las entradas) sigue siendo P1.
      if (script === 'faltantes-liga.mjs' && (e.status === 2 || e.status === 3)) add('P3', code, `${que}: ${detalle || (e.status === 3 ? 'corré node tools/worktree.mjs preparar .' : 'regenerá: node tools/faltantes-liga.mjs')}`);
      else add('P1', code, `${que} quedó desactualizado. Corré: node tools/${script}${detalle ? ' — ' + detalle : ''}`);
    }
  }
  // LA LISTA QUE CORRE Y LA QUE SE VERIFICA TIENEN QUE SER LA MISMA: un generador que audit.js verifica como P1 y que `publicarCambios()` (tools/generadores.mjs) no corre deja desfasada su salida
  // en cada carga, y la carga se revierte entera (caso FC Volendam, faltantes-liga y estimar). generar-data lo corre publicar.mjs aparte y validar-esquema-json no genera nada.
  try {
    const corre = [...fs.readFileSync(path.join(ROOT, 'tools/generadores.mjs'), 'utf8').matchAll(/'tools\/([^']+)'/g)].map((m) => m[1]);
    const sinCorrer = GENERADORES.map((g) => g[0]).filter((s) => !corre.includes(s) && !['generar-data.mjs', 'validar-esquema-json.mjs'].includes(s));
    if (sinCorrer.length) add('P2', 'generador-sin-correr', `audit.js verifica ${sinCorrer.join(', ')} pero tools/generadores.mjs no lo corre al cerrar una carga: una carga que lo deje viejo se revierte. Sumalo a la lista de tools/generadores.mjs`);
  } catch { /* sin generadores.mjs: otro chequeo lo dice */ }
  // cada .js y .mjs de tools/ está clasificado respecto del pipeline: una tool nueva sin clasificar se commitea sin medir
  if (fs.existsSync(path.join(ROOT, 'tools/clasificar-tools.mjs'))) {
    try { execSync('node tools/clasificar-tools.mjs --check', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
    catch (e) { add('P1', 'tool-sin-clasificar', String(e.stderr || e.stdout || '').trim().replace(/\s*\n\s*/g, ' ').slice(0, 300)); }
  }
  // los lotes de prueba: una familia cargada sin documentos en la mediana, o un club cuyo último año con verificación no está en ella, y una medición no lo vería
  if (fs.existsSync(path.join(ROOT, 'tools/lotes-prueba.mjs'))) {
    try { execSync('node tools/lotes-prueba.mjs --check', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
    catch (e) { add('P2', 'lote-prueba-desfasado', `los lotes de prueba no cubren lo cargado: ${String(e.stderr || e.stdout || '').trim().replace(/\s*\n\s*/g, ' ').slice(0, 260)}`); }
  }
  // el índice de documentos (Admin/INDICE-md.md) no frena un commit: P3
  try { execSync('node tools/indice-md.mjs --check', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { add('P3', 'indice-md-desfasado', 'Admin/INDICE-md.md quedó desactualizado (se creó, movió o borró un .md). Corré: node tools/indice-md.mjs'); }
  // el CHANGELOG: una entrada de más de 1.500 caracteres o el archivo de más de 120 KB (tools/changelog.mjs check; P3)
  try { execSync('node tools/changelog.mjs check', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { for (const l of String(e.stdout || '').split('\n').filter(Boolean)) { const m = l.match(/^(changelog-[a-z-]+): (.*)$/); if (m) add('P3', m[1], m[2]); } }
  // un año cargado a mano (sin tools/cargar.mjs) con documento y sin ajuste, freno ni respuesta de la cola no entra a los lotes de prueba (tools/cargas-manuales.mjs; P3, solo los nuevos)
  try { execSync('node tools/cargas-manuales.mjs check', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { const m = String(e.stdout || '').match(/^(carga-manual-[a-z-]+): (.*)$/m); if (m) add('P3', m[1], m[2]); }
  // los hallazgos nuevos de HALLAZGOS-pipeline.md van con sus etiquetas (tools/hallazgo.mjs check; P3)
  try { execSync('node tools/hallazgo.mjs check', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { const m = String(e.stdout || '').match(/^(hallazgo-[a-z-]+): (.*)$/m); if (m) add('P3', m[1], m[2]); }
}


// LIGAS QUE EL SITIO NO TIENE: un club-año en `liga-no-catalogada` (data/club-leagues/) dice en Admin/registros/ligas-no-catalogadas.jsonl qué liga es (id y nombre). Cuando 3 o más club-años
// son de la misma liga que no está en data/leagues.js, esa liga se abre (skill auditoria-finance-of-sports, sección 9): P3 `liga-por-abrir`, con el comando. Una fila sin registro: P3 `liga-no-catalogada-sin-registro`.
const UMBRAL_LIGA_POR_ABRIR = 3;
function checkLigasNoCatalogadas(api) {
  const f = path.join(ROOT, 'Admin', 'registros', 'ligas-no-catalogadas.jsonl');
  const reg = fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const registrados = new Set(reg.map((r) => `${r.club}|${r.anio}`));
  const sinRegistro = [];
  for (const [club, ys] of Object.entries(api.CLUB_LEAGUE_BY_YEAR || {})) for (const [y, liga] of Object.entries(ys)) if (liga === 'liga-no-catalogada' && !registrados.has(`${club}|${y}`)) sinRegistro.push(`${club} ${y}`);
  if (sinRegistro.length) add('P3', 'liga-no-catalogada-sin-registro', `${sinRegistro.length} club-año(s) en liga-no-catalogada sin decir qué liga es (${sinRegistro.slice(0, 5).join(', ')}): una línea por club-año en Admin/registros/ligas-no-catalogadas.jsonl, con el id y el nombre de la liga y su fuente`);
  let catalogo = ''; try { catalogo = fs.readFileSync(path.join(ROOT, 'data', 'leagues.js'), 'utf8'); } catch { /* sin catálogo: no se cuenta */ }
  const porLiga = {};
  for (const r of reg) if (r.liga && !new RegExp(`['"]${r.liga}['"]\\s*:`).test(catalogo)) (porLiga[r.liga] = porLiga[r.liga] || []).push(`${r.club} ${r.anio}`);
  for (const [liga, cs] of Object.entries(porLiga)) if (cs.length >= UMBRAL_LIGA_POR_ABRIR) add('P3', 'liga-por-abrir', `${liga}: ${cs.length} club-años en una liga que el sitio no tiene (${cs.slice(0, 5).join(', ')}): abrirla con node tools/catalogo-liga.mjs --liga ${liga} y asignarles la liga`);
}

// UN CLUB-AÑO, UNA ESTIMACIÓN: data/estimados/<liga>.js no repite un club en el mismo año de una liga. Es independiente de estimar.mjs: si la tool misma repite (una lista con el nombre
// dos veces, dos temporadas que caen en el mismo ejercicio), su --check regenera igual y no lo ve. P1: Ligas mostraría al club dos veces y la liga sumaría de más.
function checkEstimadoRepetido() {
  const dir = path.join(ROOT, 'data', 'estimados');
  if (!fs.existsSync(dir)) return;
  const repetidos = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
    for (const ln of fs.readFileSync(path.join(dir, f), 'utf8').split('\n')) {
      const m = ln.match(/^\s*(\d{4}):\s*(\[.*\]),?\s*$/);
      if (!m) continue;
      let filas; try { filas = JSON.parse(m[2]); } catch { continue; }
      const vistos = new Map();
      for (const r of filas) { const k = r.id || r.n; vistos.set(k, (vistos.get(k) || 0) + 1); }
      for (const [k, n] of vistos) if (n > 1) repetidos.push(`${f.replace(/\.js$/, '')} ${m[1]} ${k} (${n} veces)`);
    }
  }
  if (repetidos.length) add('P1', 'estimado-repetido', `un club con más de una estimación en la misma liga-año: ${repetidos.slice(0, 8).join('; ')}${repetidos.length > 8 ? ` y ${repetidos.length - 8} más` : ''}`);
}

module.exports = { checkLigasNoCatalogadas, checkEstimadoRepetido, checkLigasPorEjercicio, checkDeployInterno, checkIndexFileRoto, checkSponsorBusqueda, checkComentariosPublicados, checkParrafoNetlifyDuplicado, checkRutasMuertas, checkComentarioHistoricoEnTools, checkCabeceraLargaEnTools, checkToolGrande, checkHistoriaEnDocs, checkParrafosRepetidos, checkRayaLarga, checkGenerados };

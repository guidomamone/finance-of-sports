// tools/audit-chequeos-3.js — checkCorreccionesSinMotivo, checkRankings, checkClubIds, checkReferenciaAClub, checkColisionSourcing, checkCarpetasClubes, checkArchivoNoEsLoQueDice, checkFuentesPublicas. Mudados de tools/audit.js sin cambiar una línea; lo compartido (add, ROOT, fs, path…) está en tools/audit-base.js.

const { ROOT, add, archivosData, execFileSync, execSync, fs, idDeArchivo, path, vm } = require('./audit-base.js');

// un commit que corrige un dato publicado (importe, categoría, filas, totales, caja/deuda, moneda, fuente, perímetro) lleva el trailer
// `Corrige: <motivo en una frase>` (o una línea en Admin/registros/correcciones.jsonl). Sin eso el registro público dice «Motivo no registrado».
function checkCorreccionesSinMotivo() {
  if (!fs.existsSync(path.join(ROOT, 'tools/generar-correcciones.mjs'))) return;
  try {
    const lista = JSON.parse(execSync('node tools/generar-correcciones.mjs --sin-motivo', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 26 }).toString());
    for (const { commit, clubs } of lista) add('P2', 'correccion-sin-motivo', `el commit ${commit} corrige datos publicados (${clubs.slice(0, 4).join(', ')}${clubs.length > 4 ? `, +${clubs.length - 4} más` : ''}) sin trailer \`Corrige:\` ni línea en Admin/registros/correcciones.jsonl: el registro público dirá «Motivo no registrado»`);
  } catch (e) { /* si el generador falla, lo dice correcciones-desfasado */ }
}

// --- D18: los rankings precalculados ------
// POR QUÉ ESTE CHEQUEO ES LA CONDICIÓN PARA QUE `data/rankings/` PUEDA EXISTIR.
// Ese directorio es lo único del proyecto que guarda NÚMEROS DE PLATA copiados
// de otro lado: `data/club-index.js` también es generado, pero copia metadatos
// (cuántos ejercicios, cuál es el más nuevo), y un metadato desactualizado se
// nota. Un INGRESO desactualizado no se nota: se publica, en la portada, con
// pinta de verificado. O sea que `data/rankings/` es una segunda verdad sobre
// exactamente lo que el sitio existe para no equivocar.
//
// El seguro es que no se pueda pushear con el archivo viejo. Por eso es P1 y no
// P2, y por eso `audit.js` no reimplementa la comparación: le PREGUNTA AL
// GENERADOR (`--check`), que es el único que sabe qué debería decir cada
// archivo. Dos implementaciones de la misma cuenta serían el problema otra vez,
// un escalón más arriba.
//
// Cuesta ~1s más que el resto de la auditoría porque el generador vuelve a
// levantar el motor en su propio proceso. Es barato al lado de publicar el
// ingreso de un club con el balance del año pasado.
function checkRankings(api) {
  const dir = path.join(ROOT, 'data/rankings');
  if (!fs.existsSync(dir)) {
    add('P1', 'rankings-sin-generar',
      'data/rankings/ no existe: la pestaña Ligas y los rankings de Inicio no tienen de dónde leer. Corré: node tools/generate-rankings.js');
    return;
  }


  // LA LISTA CURADA DE INICIO (`data/destacados.js`). Es el único archivo de
  // esta feature que se edita a mano, así que es el único que puede apuntar a
  // algo que ya no existe: se borra un club, cambia una membresía, y el bloque
  // de la portada queda vacío o con un ranking de uno. El archivo no puede
  // chequearse solo, así que lo chequea esto.
  const destacadosPath = path.join(ROOT, 'data/destacados.js');
  if (!fs.existsSync(destacadosPath)) {
    add('P1', 'destacados-sin-archivo',
      'Falta data/destacados.js: Inicio no sabe qué rankings mostrar');
    return;
  }

  const sandbox = { console };
  sandbox.window = sandbox;
  const ctx = vm.createContext(sandbox);
  try {
    vm.runInContext(fs.readFileSync(destacadosPath, 'utf8'), ctx, { filename: 'data/destacados.js' });
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
      vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: 'data/rankings/' + f });
    }
  } catch (e) {
    add('P1', 'rankings-no-cargan', `data/destacados.js o data/rankings/*.js no se pueden evaluar: ${e.message}`);
    return;
  }

  const destacados = sandbox.DESTACADOS || [];
  const rankings = sandbox.RANKINGS || {};

  // "Hasta 10" es decisión de Guido, y es editorial: una
  // portada con 20 rankings deja de ser una vidriera. P2 porque nada está MAL,
  // simplemente dejó de cumplirse el criterio con el que se diseñó la pantalla.
  if (destacados.length > 10) {
    add('P2', 'destacados-de-mas',
      `data/destacados.js tiene ${destacados.length} entradas y el criterio es hasta 10: Inicio se vuelve una lista en vez de una vidriera`);
  }

  const vistos = new Set();
  for (const d of destacados) {
    const clave = `${d.league} ${d.year}`;
    if (vistos.has(clave)) {
      add('P2', 'destacado-repetido', `data/destacados.js repite ${clave}: Inicio dibujaría el mismo ranking dos veces`);
      continue;
    }
    vistos.add(clave);

    const nombre = (api.LEAGUES && api.LEAGUES[d.league] ? api.LEAGUES[d.league].name : d.league);
    const r = (rankings[d.league] || {})[d.year];
    if (!r) {
      add('P1', 'destacado-sin-ranking',
        `data/destacados.js pide ${nombre} ${d.year} pero no hay ranking precalculado para esa liga-ejercicio: ese bloque de Inicio queda vacío`);
      continue;
    }
    // Un "ranking" de un club es una barra sola, y en la portada se lee como si
    // esa fuera la liga. No se prohíbe (la lista es discrecional), se avisa.
    if (r.clubs.length < 2) {
      add('P2', 'destacado-de-un-club',
        `data/destacados.js pone ${nombre} ${d.year} en la portada con ${r.clubs.length} club cargado: una barra sola no se lee como un ranking`);
    }
  }
}

// --- D14: el espacio de nombres de clubId ---------------------------------
// `clubId` nombra el archivo de datos (`data/<país>/<clubId>-data.js`, por convención de loadClubData()) y prefija cada sourceId.
// Formato: `<slug>-<iso2>`, con el `country` de clubs.js (Admin/CONVENCIONES-DATOS.md, "Identidad del club"). Los ids que no lo cumplían
// se renombraron; los viejos viven en `data/club-aliases.js` para siempre, y `alias-roto` vigila ese mapa.
function checkClubIds(api) {
  for (const id of Object.keys(api.clubs)) {
    const iso = (api.clubs[id].country || 'xx').toLowerCase();
    if (!id.endsWith('-' + iso)) {
      add('P1', 'clubid-sin-pais', `el club '${id}' tiene un id que no termina en su país (esperado '${id.replace(/-[a-z]{2}$/, '')}-${iso}'): la convención de ids es <slug>-<iso2>, ver Admin/CONVENCIONES-DATOS.md`);
    }
  }
  let aliases = {};
  try {
    const txt = fs.readFileSync(path.join(ROOT, 'data/club-aliases.js'), 'utf8');
    aliases = JSON.parse(txt.match(/CLUB_ALIASES\s*=\s*(\{[\s\S]*?\});/)[1]);
  } catch (e) {
    add('P1', 'alias-roto', `no se pudo leer data/club-aliases.js: ${e.message}`);
    return;
  }
  for (const [viejo, nuevo] of Object.entries(aliases)) {
    if (!api.clubs[nuevo]) add('P1', 'alias-roto', `el alias '${viejo}' apunta a '${nuevo}', que no es un club del sitio`);
    else if (api.clubs[viejo]) add('P1', 'alias-roto', `el alias '${viejo}' es también un id vivo de club: un alias nunca se reutiliza`);
    else if (aliases[nuevo]) add('P1', 'alias-roto', `el alias '${viejo}' apunta a '${nuevo}', que a su vez es un alias (sin cadenas)`);
  }
  checkReferenciaAClub(api, aliases);
}

// REFERENCIA A UN CLUB QUE NO EXISTE (regla de CONVENCIONES-DATOS: el id lo pone alta-club.mjs, y una referencia a un club va en el commit del alta
// o después; aprobado por la Auditora 5, sección 7). P1 por cada alias de tools/club-league-reference/alias.json con `clubId` y cada fila de
// data/club-leagues/ que apunta a un id que no está en data/clubs.js. Un id viejo que data/club-aliases.js resuelve a un club que sí está (`boca`,
// o el de una unión de fichas) no cuenta: si no, una migración de ids con el alias puesto dejaría en P1 las filas viejas hasta migrarlas.
// Caso: «Omonia 29M» = omonia29maiou-cy en alias.json antes del alta (7a3e3aa363, sacado). Los alias de `carpeta`/`sourcing` los vigila faltantes-liga.
function checkReferenciaAClub(api, aliasesDeIds) {
  const existe = (id) => !!api.clubs[id] || (!!aliasesDeIds[id] && !!api.clubs[aliasesDeIds[id]]);
  let alias = {}; try { alias = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'club-league-reference', 'alias.json'), 'utf8')); } catch { /* sin alias.json: nada que mirar */ }
  for (const [iso, m] of Object.entries(alias)) {
    if (!m || typeof m !== 'object') continue;
    for (const [nombre, a] of Object.entries(m)) if (a && a.clubId && !existe(a.clubId)) add('P1', 'referencia-a-club-inexistente', `tools/club-league-reference/alias.json (${iso}) «${nombre}» apunta a '${a.clubId}', que no está en data/clubs.js: la referencia va en el commit del alta o después (Admin/CONVENCIONES-DATOS.md)`);
  }
  for (const id of Object.keys(api.CLUB_LEAGUE_BY_YEAR || {}).sort()) {
    if (existe(id)) continue;
    const iso = (id.match(/-([a-z]{2})$/) || [])[1];
    add('P1', 'referencia-a-club-inexistente', `${iso ? `data/club-leagues/${iso}.js` : 'data/club-leagues/'}: la fila de '${id}' apunta a un club que no está en data/clubs.js: la referencia va en el commit del alta o después (Admin/CONVENCIONES-DATOS.md)`);
  }
}

// --- D12c: colisión de clubId adelantada al SOURCING ----------
// checkClubIds() avisa cuando un id heredado sin país deja de ser inequívoco, pero recién
// cuando el club que colisiona YA ESTÁ CARGADO en clubs{}. Para entonces renombrar el
// viejo cuesta tres cosas (el archivo data/<país>/<id>-data.js, el clubId y el prefijo de cada
// sourceId) y encima ya se transcribió el documento del club nuevo. Esto mira el escalón
// anterior: los clubes que alguien está SOURCEANDO, que viven en Admin/sourcing/_indice/<País>.md
// y avisa el día que uno de ellos empieza a amenazar a un id pelado.
//
// QUÉ SE REPORTA Y QUÉ NO, que es la parte que se midió antes de escribirlo:
//   - Comparación EXACTA del nombre normalizado, nunca difusa. Medido sobre los 530 clubes
//     trackeados: exacta da 3 pares entre países (Everton, Nacional, Olimpia); por primera
//     palabra da 119 clubes en 23 grupos, casi todos "Deportivo", "Atlético", "FC" y
//     "Unión". O sea que el ruido que preocupaba no se resuelve con una lista de
//     excepciones, se resuelve no haciendo matching difuso. Por eso no hay lista.
//   - El P3 que importa es el club trackeado que volvería AMBIGUO un id pelado ya cargado:
//     ese es el que obliga a una migración. Hoy son 0 y el chequeo calla, que es lo
//     correcto.
//   - Los pares entre dos clubes trackeados (ninguno cargado) van en UNA línea agregada,
//     no una por par: no obligan a nada hoy, y un club nuevo ya nace
//     con el país en el id.
const INDICE_FUENTES = path.join(ROOT, 'Admin/sourcing/_indice');

// `clubs{}` guarda el país como código ISO ('AR'), y `Admin/sourcing/_indice/` lo nombra completo
// ('Argentina.md'), así que hay que traducir para poder compararlos. Es el mismo mapa que
// tiene tools/generate-fuentes-page.js. Si un club tiene un código que no está acá, se usa
// el código tal cual: no va a coincidir con ningún índice, o sea que el chequeo se calla en
// vez de inventar un choque.
const PAIS_CLUB = {
  AR: 'Argentina', BR: 'Brasil', CL: 'Chile', CO: 'Colombia', EC: 'Ecuador',
  ES: 'España', JP: 'Japón', MX: 'México', PE: 'Perú', UY: 'Uruguay',
};

function checkColisionSourcing(api) {
  if (!fs.existsSync(INDICE_FUENTES)) return;

  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');

  // Una línea de club del índice es `- [Nombre](../<País>/<Club>.md) — estado — fecha`.
  // OJO: el mismo patrón matchea `- [Notas generales de X](../X/_notas-generales.md)`, que
  // hay una por país. Sin excluirlas el conteo da 569 en vez de los 530 clubes reales y
  // aparece un choque fantasma de "Notas" en 39 países. Se excluyen por el DESTINO del
  // link, que empieza con `_`, no por el texto, que cambia de país a país.
  const trackeados = [];
  for (const f of fs.readdirSync(INDICE_FUENTES).filter(f => f.endsWith('.md')).sort()) {
    const pais = f.replace(/\.md$/, '');
    for (const line of fs.readFileSync(path.join(INDICE_FUENTES, f), 'utf8').split('\n')) {
      const m = line.match(/^- \[([^\]]+)\]\(<?([^)>]+)>?\)/);
      if (!m) continue;
      if (path.basename(m[2]).startsWith('_')) continue;
      trackeados.push({ pais, nombre: m[1], n: norm(m[1]) });
    }
  }
  if (!trackeados.length) return;

  // Los 41 ids heredados son los únicos que una colisión obliga a migrar: un id que ya
  // termina en país no se vuelve ambiguo nunca.
  const pelados = Object.keys(api.clubs).filter(id => !/-[a-z]{2}$/.test(id));
  const yaReportados = new Set();
  for (const id of pelados) {
    const c = api.clubs[id];
    const paisClub = PAIS_CLUB[c.country] || c.country;
    const nombre = c.displayName || c.name || '';
    for (const t of trackeados) {
      if (t.pais === paisClub || t.n !== norm(nombre)) continue;
      yaReportados.add(t.n);
      add('P3', 'clubid-amenazado-por-sourcing', `se está sourceando "${t.nombre}" (${t.pais}) y coincide con '${id}' (${paisClub}), que tiene id heredado sin país. Si ese club se llega a cargar, hay que renombrar '${id}' a '${id}-${(c.country || 'xx').toLowerCase()}' primero: el id nombra data/${id}-data.js y prefija cada uno de sus sourceId. Conviene decidirlo ANTES de transcribir nada`);
    }
  }

  // Pares entre clubes que todavía no está cargado ninguno de los dos.
  const porNombre = {};
  for (const t of trackeados) (porNombre[t.n] = porNombre[t.n] || []).push(t);
  const pares = [];
  for (const k of Object.keys(porNombre).sort()) {
    // Un nombre que ya salió en el P3 de arriba NO se repite acá: ese caso sí tiene un club
    // cargado detrás, así que la frase "ninguno está cargado" sería falsa justo para él.
    if (yaReportados.has(k)) continue;
    const paises = [...new Set(porNombre[k].map(t => t.pais))];
    if (paises.length < 2) continue;
    pares.push(`${porNombre[k][0].nombre} (${paises.join(' / ')})`);
  }
  if (pares.length) {
    add('P3', 'nombres-repetidos-sourcing', `${pares.length} ${pares.length === 1 ? 'nombre de club trackeado se repite' : 'nombres de club trackeados se repiten'} en países distintos: ${pares.join(', ')}. No obliga a nada hoy (ninguno está cargado, y desde la Versión 129 un club nuevo ya nace con el país en el id): es para que el día que se carguen no se elija un id pelado`);
  }
}

// --- D12b: carpetas de Clubes/<País>/<Club>/ ------------------
// OJO CON QUÉ PUEDE Y QUÉ NO PUEDE DETECTAR ESTO, porque el punto del plan de escala que lo
// pidió lo planteaba de otra manera. La idea original era "avisar si dos clubes del mismo país
// comparten nombre corto y sus carpetas chocan". Eso NO es detectable por construcción: un
// filesystem no admite dos carpetas con el mismo nombre en el mismo directorio, así que el
// segundo club cae ADENTRO de la carpeta del primero, en silencio, y después no queda ningún
// estado que distinga "dos clubes compartiendo carpeta" de "un club con muchos documentos".
// Por eso NO es el equivalente de checkClubIds() para carpetas: ese sí avisa antes del daño,
// porque dos ids conviven sin problema en un objeto JS y dos nombres de carpeta no.
//
// Lo que SÍ se puede detectar, y es el error más probable de los dos, es la casi-colisión: dos
// carpetas del mismo país cuyos nombres normalizan igual. O sea el mismo club transcripto dos
// veces con dos grafías ("Atlético Goianiense" y "Atletico Goianiense"), con sus documentos
// partidos entre las dos carpetas y ninguna señal de que pasó.
//
// ALCANCE: escanea TODO Clubes/ en disco, no solo los clubes que ya están en clubs{}. Son 336
// carpetas contra 41 (12%), y sobre todo la duplicación nace al SOURCEAR, mucho antes de que el
// club entre al sitio. El costo es que el árbol en disco no es el mismo en toda máquina (de las
// 336 carpetas, 129 tienen algún archivo trackeado en git; el resto son transcripciones que
// todavía no existen y PDFs, que están en .gitignore), así que en un clone limpio esto revisa
// menos carpetas. Degrada bien: menos carpetas escaneadas es menos cobertura, nunca un hallazgo
// falso.
const CLUBES_DIR = path.join(ROOT, 'Clubes');

function checkCarpetasClubes() {
  // Sin Clubes/ no hay nada que chequear y eso NO es un defecto del proyecto (pasa en cualquier
  // clone sin las transcripciones locales). Se sale callado a propósito: un hallazgo de "no se
  // pudo chequear" en cada corrida es ruido que entrena a ignorar la lista.
  if (!fs.existsSync(CLUBES_DIR)) return;

  const subdirs = dir => fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => d.name).sort();

  // Sin acentos, en minúscula y sin separadores: es lo que hace que "Atlético Goianiense" y
  // "Atletico Goianiense" colapsen al mismo string, que es justo el par que buscamos.
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');

  const paises = subdirs(CLUBES_DIR);

  for (const pais of paises) {
    const porNombre = {};
    for (const club of subdirs(path.join(CLUBES_DIR, pais))) {
      (porNombre[norm(club)] = porNombre[norm(club)] || []).push(club);
    }
    for (const k of Object.keys(porNombre).sort()) {
      if (porNombre[k].length < 2) continue;
      add('P2', 'carpeta-club-duplicada', `Clubes/${pais}/: ${porNombre[k].map(c => `"${c}"`).join(' y ')} son carpetas distintas que normalizan al mismo nombre. O es el mismo club transcripto dos veces con dos grafías, y sus documentos quedaron partidos entre las dos, o son dos clubes distintos que hay que desambiguar en el nombre de la carpeta (REGLA 3 de Admin/sourcing/README.md)`);
    }
  }

  // Dos carpetas de club de un mismo país con PDFs de la MISMA huella: el club quedó con dos carpetas por una grafía distinta
  // (la que no atrapa 'carpeta-club-duplicada', que solo mira nombres). Se compara por tamaño y solo si coincide se calcula el sha1.
  // Sigue los symlinks (en un worktree, `worktree.mjs preparar` enlaza Clubes/ a la carpeta principal); las carpetas de agregado ("_...") alimentan varios clubes y quedan afuera.
  for (const pais of paises) {
    const porTam = {};
    for (const club of subdirs(path.join(CLUBES_DIR, pais))) {
      if (club.startsWith('_')) continue;
      const base = path.join(CLUBES_DIR, pais, club);
      const rec = d => fs.readdirSync(d).flatMap(n => { const p = path.join(d, n); let st; try { st = fs.statSync(p); } catch { return []; } return st.isDirectory() ? rec(p) : (st.isFile() && /\.pdf$/i.test(n) ? [p] : []); });
      for (const f of rec(base)) (porTam[fs.statSync(f).size] = porTam[fs.statSync(f).size] || []).push({ club, f });
    }
    const porHuella = {};
    for (const grupo of Object.values(porTam)) {
      if (new Set(grupo.map(g => g.club)).size < 2) continue;
      for (const g of grupo) {
        const h = require('crypto').createHash('sha1').update(fs.readFileSync(g.f)).digest('hex');
        (porHuella[h] = porHuella[h] || []).push(g);
      }
    }
    for (const g of Object.values(porHuella)) {
      const clubes = [...new Set(g.map(x => x.club))];
      if (clubes.length < 2) continue;
      add('P2', 'carpeta-doble', `Clubes/${pais}/: ${clubes.map(c => `"${c}"`).join(' y ')} tienen un PDF idéntico (${path.basename(g[0].f)}). O es el mismo club con dos carpetas (unirlas en la que ya resuelve a un club, tools/carpetas-clubes.mjs, y no abrir una segunda), o un documento que pertenece a uno solo y quedó guardado en el otro, o uno compartido a propósito (un informe de liga): ese se silencia en tools/audit-ignore.json`);
    }
  }

  // CLAUDE.md prohíbe una carpeta de club colgando directo de Clubes/, sin país en el medio.
  // Se detecta por el contenido y no por el nombre: una carpeta de PAÍS tiene subcarpetas de
  // club adentro, una de CLUB tiene los documentos sueltos.
  for (const pais of paises) {
    const docs = fs.readdirSync(path.join(CLUBES_DIR, pais), { withFileTypes: true })
      .filter(d => d.isFile() && /\.(md|pdf)$/i.test(d.name))
      .map(d => d.name).sort();
    if (!docs.length) continue;
    add('P2', 'carpeta-sin-pais', `Clubes/${pais}/ tiene ${docs.length} documento(s) sueltos (${docs.slice(0, 3).join(', ')}${docs.length > 3 ? ', ...' : ''}) en vez de subcarpetas de club. Si es un club, le falta la carpeta de país en el medio: la convención es Clubes/<País>/<Club>/, nunca una carpeta de club al nivel de arriba (ver CLAUDE.md)`);
  }

  // ¿cada carpeta de club resuelve a UN club sin ambigüedad? La regla vive en tools/carpetas-clubes.mjs (cita en
  // data/<país>/<id>-data.js, y si no, nombre IGUAL dentro del mismo país) y la usan onboard.mjs, el registro de transcripciones y el pipeline.
  // Con la regla vieja (substring, sin país) 17 clubes del sitio no se reconocían y 11 carpetas caían en un club EQUIVOCADO (Porto ->
  // Grêmio, Inter -> Internacional): el registro marcaba "ya cargado" PDFs que no lo estaban, y al revés. Si una carpeta vuelve a ser
  // ambigua (la citan dos clubes, o su nombre es igual a dos clubes del país), es P1: el pipeline no puede saber de quién es.
  // Las carpetas de agregado ("_J.League", "_DFL-Finanzkennzahlen") alimentan varios clubes a propósito y no cuentan.
  let carpetas = [];
  try { carpetas = JSON.parse(execFileSync('node', [path.join(ROOT, 'tools', 'carpetas-clubes.mjs'), '--json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })); }
  catch (e) { add('P1', 'carpetas-clubes-fallo', `tools/carpetas-clubes.mjs falló: ${String(e.message).slice(0, 200)}. Sin esa regla el registro de transcripciones no sabe qué PDF es de qué club`); return; }
  for (const c of carpetas) {
    if (c.via === 'ambigua' && !c.carpeta.startsWith('_')) add('P1', 'carpeta-club-ambigua', `Clubes/${c.pais}/${c.carpeta}/ no resuelve a un solo club (${c.fuente}). Que la cite UN solo data/<país>/<id>-data.js (o renombrar la carpeta): mientras tanto el pipeline y el registro no saben de quién son sus PDFs`);
  }
  // Y al revés: un club del sitio cuyos PDFs ninguna carpeta identifica (no cita su carpeta ni se llama igual). Sus PDFs figurarían como
  // de un club nuevo y el pipeline los procesaría aunque el ejercicio ya esté cargado.
  const resueltos = new Set(carpetas.filter(c => c.clubId).map(c => c.clubId));
  for (const f of archivosData()) {
    const id = idDeArchivo(f);
    if (resueltos.has(id)) continue;
    // la cita de la carpeta puede estar en la evidencia del club y no en data/: se leen los dos, como carpetas-clubes.mjs
    const ev = path.join(ROOT, 'Admin', 'carga-clubes', `${id}.md`);
    const txt = fs.readFileSync(path.join(ROOT, f), 'utf8') + (fs.existsSync(ev) ? `\n${fs.readFileSync(ev, 'utf8')}` : '');
    if (/Clubes\/[^/\n`'"]+\/_/.test(txt)) continue; // se alimenta de una carpeta de agregado (J.League)
    if (!/Clubes\//.test(txt)) continue; // club cargado solo de fuentes externas (prensa): no tiene PDFs en Clubes/
    add('P2', 'club-sin-carpeta', `${f} cita Clubes/ pero ninguna carpeta de Clubes/ resuelve a '${id}' (tools/carpetas-clubes.mjs): sus PDFs se tratarían como de un club nuevo`);
  }
}

// Un archivo bajado que no es lo que dice su extensión (Admin/propuestas/archivo-no-es-lo-que-dice.md, ok de Guido). Caso: Brøndby 2025,
// aarsrapport-AAAA-MM-DD.xhtml venía comprimido con gzip (el depósito lo sirvió así) y ninguna tool lo leía; nadie lo vio hasta medir los XHTML.
// Un .pdf, .xhtml o .xml de Clubes/ cuyos primeros bytes son gzip (1f 8b) o Zip (PK\3\4), o un .pdf que es una página HTML (de error o de login),
// salvo que al lado exista <base>-descomprimido.<ext> (la copia que se lee; el original queda). Solo esas tres firmas: un PDF con basura antes
// de %PDF lo lee poppler igual y no es este caso. Lee 64 bytes por archivo (sigue los enlaces de un worktree preparado).
// Un .xhtml en gzip NO es hallazgo (Auditora 5): xhtml-aarsrapport.mjs e ixbrl-resultado.mjs lo descomprimen en memoria (`leerXhtmlTexto`) y la copia
// no hace falta; si esas tools dejaran de leerlo, vuelve a serlo. Un .xhtml en Zip sí: ninguna tool lo abre.
function checkArchivoNoEsLoQueDice() {
  if (!fs.existsSync(CLUBES_DIR)) return;
  const buf = Buffer.alloc(64);
  (function walk(d) {
    let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    const nombres = new Set(es.map(e => e.name));
    for (const e of es) {
      const p = path.join(d, e.name);
      if (e.isDirectory() || (e.isSymbolicLink() && (() => { try { return fs.statSync(p).isDirectory(); } catch { return false; } })())) { walk(p); continue; }
      const m = /^(.*)\.(pdf|xhtml|xml)$/i.exec(e.name); if (!m) continue;
      if (nombres.has(`${m[1]}-descomprimido.${m[2]}`)) continue;
      let n = 0; try { const fd = fs.openSync(p, 'r'); try { n = fs.readSync(fd, buf, 0, 64, 0); } finally { fs.closeSync(fd); } } catch { continue; }
      const cab = buf.subarray(0, n);
      const real = cab[0] === 0x1f && cab[1] === 0x8b ? (m[2].toLowerCase() === 'xhtml' ? null : 'gzip') : (cab[0] === 0x50 && cab[1] === 0x4b && cab[2] === 0x03 && cab[3] === 0x04) ? 'Zip'
        : (m[2].toLowerCase() === 'pdf' && /^(\xEF\xBB\xBF)?\s*<(!doctype html|html)/i.test(cab.toString('latin1'))) ? 'HTML' : null;
      if (!real) continue;
      const rel = path.relative(ROOT, p);
      add('P2', 'archivo-no-es-lo-que-dice', `${rel} es ${real}, no ${m[2].toLowerCase()}: ${real === 'HTML' ? 'es una página de error o de login, no el documento; se vuelve a bajar' : `el depósito lo sirvió comprimido; se descomprime a ${m[1]}-descomprimido.${m[2]} al lado y el original queda`} (skill club-sourcing, «Gotchas de tooling»)`);
    }
  })(CLUBES_DIR);
}

// --- D13: qué de las fuentes se le muestra al visitante -------
// `sources[].note` es una nota INTERNA: una sesión se la escribe a la siguiente, con
// rutas del repo, cómo se leyó el PDF y qué quedó pendiente. Una vez se
// publicó tal cual, y el visitante terminó leyendo "PDF subido directamente por Guido"
// y rutas de su disco. Esto vigila las dos mitades de ese arreglo: que lo público no
// filtre nada interno, y que nadie vuelva a renderizar `note` sin darse cuenta.
// cambio-de-formato-sin-nota: un año cuyo balance pasó de resumido a completo (o al revés) respecto del año anterior cargado, y cuya fuente no tiene publicNote
// que lo explique (tools/cambio-formato.js; cargar.mjs avisa al proponer). Sin la nota, el salto de formato se lee como un salto de actividad.
function checkCambioDeFormatoSinNota(api) {
  const { cambioDeFormato, anioAnterior } = require('./cambio-formato.js');
  const sin = [];
  for (const [clubId, g] of Object.entries(api.generic)) {
    const por = g.revenueLinesByYear || {};
    for (const y of Object.keys(por).sort()) {
      const ant = anioAnterior(por, y); if (ant == null) continue;
      const cambio = cambioDeFormato(por[ant], por[y]); if (!cambio) continue;
      const s = api.sources[(g.fiscalYearMeta?.[y] || {}).sourceId] || {};
      if (!s.publicNote) sin.push(`${clubId} ${y}`);
    }
  }
  if (sin.length) add('P3', 'cambio-de-formato-sin-nota', `${sin.length} año(s) con cambio de formato del balance (resumido a completo o al revés) y sin publicNote en su fuente: ${sin.slice(0, 6).join(', ')}${sin.length > 6 ? ', …' : ''}. Agregá la nota con node tools/fuente.mjs <clubId> <sourceId> --nota "…" --escribir`);
}

function checkFuentesPublicas(api) {
  const INTERNO = /\bGuido\b|Clubes\/|\.pdf\b|\.md\b|pdftotext|pdftoppm|Tesseract|\bOCR\b|transcripci[oó]n|transcript/i;
  let sinNota = 0;

  for (const id of Object.keys(api.sources)) {
    const s = api.sources[id];
    if (s.publicNote && INTERNO.test(s.publicNote)) {
      add('P1', 'nota-publica-con-interno', `sources['${id}'].publicNote menciona algo interno (nombre propio, ruta del repo o detalle de transcripción): "${s.publicNote.match(INTERNO)[0]}". Esa nota la lee el visitante`);
    }
    if (s.reliability !== 'primary' && !s.publicNote) sinNota++;
  }
  // la nota INTERNA de una fuente ya no vive en data/ (que se publica entero): va a "## Fuentes" del
  // Admin/carga-clubes/<club>.md (tools/evidencia-club.mjs, agregarFuente). Un `note` que vuelva a aparecer en sources{} viaja al visitante.
  const conNote = Object.keys(api.sources).filter((id) => 'note' in api.sources[id]);
  if (conNote.length) add('P2', 'note-interna-en-data', `${conNote.length} fuentes con \`note\` en data/ (ej. ${conNote.slice(0, 3).join(', ')}): la nota interna va a "## Fuentes" de Admin/carga-clubes/<club>.md, no a sources{}`);
  if (sinNota) {
    add('P3', 'fuente-no-primaria-sin-nota', `${sinNota} documentos que no son fuente primaria y no tienen publicNote. El nivel solo dice "réplica" o "prensa": conviene una frase que diga por qué`);
  }

  // UNA FUENTE QUE SALIÓ DE UN INFORME XHTML (iXBRL) Y NO TIENE LA URL DEL DEPÓSITO OFICIAL (Virk o el club). Se la reconoce por el mismo cruce que
  // `fuente.mjs --propuesta`: el id de la fuente es <clubId>-<nombre del .md sin el club>, y el encabezado del .md dice que lo escribió xhtml-aarsrapport.mjs. La url nunca puede ser
  // nuestro PDF de ancla (la impresión de Chrome, no el original): P1 si termina en .pdf o empieza con Clubes/. Sin url: P3.
  const slugN = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const mdsXhtml = [];
  (function walk(d) { let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; } if (es.some((e) => e.name.endsWith('.xhtml'))) for (const e of es) if (e.name.endsWith('.md') && es.some((x) => x.name === e.name.replace(/\.md$/, '.xhtml'))) mdsXhtml.push({ dir: path.basename(d), slug: slugN(e.name.replace(/\.md$/, '')), abs: path.join(d, e.name) }); for (const e of es) if (e.isDirectory()) walk(path.join(d, e.name)); })(path.join(ROOT, 'Clubes'));
  for (const id of Object.keys(api.sources)) {
    const s = api.sources[id]; const url = s.url || '';
    const cand = mdsXhtml.filter((m) => id.endsWith('-' + m.slug) && String(s.clubId || '').startsWith(slugN(m.dir).split('-')[0]));
    const md = cand.find((m) => /xhtml-aarsrapport\.mjs/.test(fs.readFileSync(m.abs, 'utf8').slice(0, 400)));
    if (!md) continue;
    if (/\.pdf(\?|#|$)/i.test(url) || url.startsWith('Clubes/')) add('P1', 'fuente-xhtml-sin-url', `sources['${id}'].url apunta a ${url}: el PDF de ancla es la impresión de Chrome de un XHTML, no el documento oficial; la url tiene que ser la del depósito oficial (Virk o el club)`);
    else if (!url) add('P3', 'fuente-xhtml-sin-url', `sources['${id}'] salió de un informe XHTML (iXBRL) y no tiene la url del depósito oficial. Reino Unido y Dinamarca: node tools/fuente-url-xhtml.mjs ${s.clubId} --escribir (la busca en Companies House o Virk y comprueba que sea el mismo informe; cargar.mjs la corre sola al terminar una carga). Otro país: node tools/fuente.mjs ${s.clubId} ${id} --url "…" --nota "Informe oficial en formato XHTML (iXBRL)" --escribir`);
  }

  // El guardarraíl del bug de la 126: `note` no se renderiza en ningún lado.
  for (const rel of ['js/finanzas-render.js', 'tools/generate-fuentes-page.js']) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const usos = [...src.matchAll(/\$\{[^}]*\b[a-z]\.note\b/gi)];
    if (usos.length) {
      add('P1', 'note-interna-renderizada', `${rel} interpola \`.note\` dentro de HTML (${usos.length} ${usos.length === 1 ? 'vez' : 'veces'}): esa es la nota interna, la que ve el visitante es publicNote`);
    }
  }
}


module.exports = { checkCorreccionesSinMotivo, checkRankings, checkClubIds, checkReferenciaAClub, checkColisionSourcing, checkCarpetasClubes, checkArchivoNoEsLoQueDice, checkFuentesPublicas, checkCambioDeFormatoSinNota };

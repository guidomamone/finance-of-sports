// tools/audit-chequeos-5.js — checkHigiene, checkDatosJson, checkReglasCategoria, checkDeportes, checkComaComida, checkRarezas, checkEjercicioSinRastro, checkDudasResueltas, checkRegistrosSinLector, checkMedicionesSinDestino. Mudados de tools/audit.js sin cambiar una línea; lo compartido (add, ROOT, fs, path…) está en tools/audit-base.js.

const { ROOT, add, archivosData, execSync, fs, idDeArchivo, mdsDeSkills, path, vm } = require('./audit-base.js');

function checkHigiene(api) {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  // ASSET_V: si hay cambios sin commitear en js/ o data/ y index.html no se tocó,
  // el `?v=` quedó viejo y un visitante que ya entró antes se queda con el JS viejo.
  try {
    // stdio: la stderr se descarta a propósito — fuera de un repo git esto tira
    // "fatal: not a git repository" y ese ruido no es un hallazgo de auditoría.
    const st = execSync('git status --porcelain', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().split('\n').filter(Boolean)
      .map(l => l.slice(3).trim());
    // data/schema/ (el JSON Schema del 245) no lo carga ninguna página: no hay caché del navegador que invalidar
    const tocaCodigo = st.some(f => f.startsWith('js/') || (f.startsWith('data/') && !f.startsWith('data/schema/')));
    const tocaIndex = st.some(f => f === 'index.html');
    if (tocaCodigo && !tocaIndex) {
      add('P1', 'asset-v-sin-subir', `Hay cambios sin commitear en js/ o data/ pero index.html no se tocó: ASSET_V quedó igual y el visitante recurrente se queda con el archivo viejo cacheado`);
    }
  } catch { /* sin git, no es un error de datos */ }

  // ASSET_V, la otra mitad: los `?v=` de los <script src> estáticos
  // son LITERALES, no salen de la constante, subir `window.ASSET_V` y olvidarse
  // de los tags deja al navegador sirviendo los archivos viejos de su caché, con
  // el HTML nuevo. Pasó de verdad al migrar los fx: `currency-map.js` llegó
  // cacheado sin `fxMetaFor()` mientras `finanzas-calc.js` ya lo llamaba, y la
  // página entera tiró ReferenceError. Es invisible salvo que se compare.
  try {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const declarada = (html.match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1];
    const enTags = [...new Set([...html.matchAll(/<script src="(?:js|data)\/[^"]*\?v=([^"]+)"/g)].map(m => m[1]))];
    const desfasados = enTags.filter(v => v !== declarada);
    if (declarada && desfasados.length) {
      add('P1', 'asset-v-desfasado', `index.html declara ASSET_V '${declarada}' pero sus <script src> piden ?v=${desfasados.join(', ?v=')}, el visitante recibe el HTML nuevo con los js/data viejos de su caché`);
    }
  } catch { /* sin index.html legible no hay nada que comparar */ }

  // i18n: una clave usada y no definida degrada al castellano en silencio.
  const usadas = new Set();
  for (const m of html.matchAll(/data-i18n(?:-title)?="([^"]+)"/g)) usadas.add(m[1]);
  // `tools/generate-fuentes-page.js` también EMITE atributos data-i18n, para
  // `fuentes.html` y para las N páginas por club. No estaba en ningún escaneo, así que una
  // clave nueva de esas páginas quedaba invisible: el chequeo pasaba en verde mientras el
  // visitante de habla inglesa las leía en castellano. Es la misma regla que ya existía para
  // los archivos de `js/` que llaman a `t()`, extendida a quien genera HTML.
  // Se saltean las claves interpoladas (`data-i18n="${...}"`): el valor real se arma en
  // runtime, igual que las que terminan en "." más abajo.
  {
    const gen = fs.readFileSync(path.join(ROOT, 'tools/generate-fuentes-page.js'), 'utf8');
    for (const m of gen.matchAll(/data-i18n(?:-title)?="([^"$]+)"/g)) usadas.add(m[1]);
  }
  // se suma js/selector.js (js/comparar-clubes.js estuvo en esta lista
  // hasta que ese archivo se borró). Sin esto el chequeo
  // miraba 3 archivos fijos y las claves nuevas del selector y de la comparación no
  // se contaban, o sea que el chequeo pasaba mientras el visitante veía castellano.
  // Hoy se leen TODOS los `js/*.js` más index.html, así un archivo nuevo de js/ (js/principal.js, js/cuenta.js) no queda afuera. Salvo
  // js/i18n.js: es el motor de t() y sus `t('clave', ...)` son ejemplos de su cabecera, no claves del sitio.
  for (const rel of [...fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js') && f !== 'i18n.js').sort().map(f => 'js/' + f), 'index.html']) { // + js/liga.js, que llamaba a t() y no estaba; + los dos archivos
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    // Una clave que termina en "." no es una clave sino un PREFIJO de clave dinámica
    // (`t('fx.source.' + meta.fxSource, ...)`): el valor real se arma en runtime y no se
    // puede resolver leyendo el código. Se saltea en vez de reportarla como sin traducir.
    for (const m of src.matchAll(/\bt\(\s*'([a-z0-9_.]+)'/gi)) { if (!m[1].endsWith('.')) usadas.add(m[1]); }
  }
  for (const f of fs.readdirSync(path.join(ROOT, 'data/lang')).filter(f => f.endsWith('.js') && f !== 'langs.js')) {
    const src = fs.readFileSync(path.join(ROOT, 'data/lang', f), 'utf8');
    // Comillas simples O dobles: el regex solo aceptaba
    // simples y `data/lang/en.js` escribe sus 134 claves con dobles, así que `definidas`
    // quedaba VACÍO y el chequeo reportaba como "sin traducir" absolutamente todas las
    // claves usadas, de ahí las "88 claves" de la primera corrida, que no era el número real.
    // Una clave abre la línea o sigue a una coma: en.js escribe varias por línea, y solo la primera de cada una se contaba.
    const definidas = new Set([...src.matchAll(/(?:^\s*|,\s*)['"]([^'"]+)['"]\s*:/gm)].map(m => m[1]));
    const faltan = [...usadas].filter(k => !definidas.has(k)).sort();
    if (faltan.length) {
      add('P3', 'i18n-incompleto', `data/lang/${f}: ${faltan.length} claves usadas en el sitio sin traducción (el visitante las ve en castellano): ${faltan.slice(0, 6).join(', ')}${faltan.length > 6 ? '…' : ''}`);
    }
  }

  // Chart.js: un chart que se recrea sin destruir el anterior es la fuga clásica.
  const render = fs.readFileSync(path.join(ROOT, 'js/finanzas-render.js'), 'utf8');
  const news = (render.match(/new Chart\(/g) || []).length;
  const destroys = (render.match(/\.destroy\(\)/g) || []).length;
  if (news > destroys) {
    add('P2', 'chart-sin-destroy', `js/finanzas-render.js: ${news} \`new Chart(\` contra ${destroys} \`.destroy()\` — revisar que todo re-render destruya la instancia anterior`);
  }
}

// ---------------------------------------------------------------------------
// DATOS COMO JSON CON ESQUEMA: el JSON de cada club (data/<país>/<id>.json) es la FUENTE. Que valide contra el esquema (`json-no-valida`)
// y que el data file generado coincida con él (`json-js-desfasado`) lo chequean, como P1, los generadores de checkGenerados() (validar-esquema-json.mjs y
// generar-data.mjs --check). Acá van solo los AVISOS del validador (el JSON valida pero tiene algo raro: una fuente o una gestión que vive fuera del archivo),
// P2 que no frenan.
// ---------------------------------------------------------------------------
function checkDatosJson() {
  let J;
  try { J = require('./json-datos.mjs'); } catch (e) { add('P2', 'json-aviso', `no se pudo cargar tools/json-datos.mjs: ${e.message}`); return; }
  const categorias = J.categoriasDelSitio(); const externos = J.referenciasExternas();
  for (const rel of archivosData()) {
    const id = idDeArchivo(rel); const rj = rel.replace(/-data\.js$/, '.json');
    if (!fs.existsSync(path.join(ROOT, rj))) { add('P1', 'json-no-valida', `${id}: no tiene su JSON fuente (${rj}); el data file se genera de ahí`); continue; }
    let j; try { j = JSON.parse(fs.readFileSync(path.join(ROOT, rj), 'utf8')); } catch (e) { continue; }
    const r = J.validar(j, { categorias, externos });
    for (const m of r.avisos.slice(0, 3)) add('P2', 'json-aviso', `${id}: ${m}`);
  }
}

// Las reglas de categoría de Admin/CONVENCIONES-DATOS.md (líneas «CATEGORÍA (prompt)» y «EJEMPLO-CATEGORÍA») tienen que ser válidas y sus ejemplos tienen que estar
// registrados en categorias-aprendidas.jsonl (tools/reglas-categoria.mjs --escribir). Aviso, no frena.
function checkReglasCategoria() {
  let out = ''; let fallo = false;
  try { out = execSync('node tools/reglas-categoria.mjs', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString(); }
  catch (e) { out = String(e.stdout || e.stderr || ''); fallo = true; }
  const lineas = out.split('\n').map((l) => l.trim()).filter(Boolean);
  if (fallo) add('P2', 'regla-categoria-invalida', lineas.filter((l) => l.startsWith('ERROR')).slice(0, 3).join(' | ') || lineas.slice(-1)[0] || 'tools/reglas-categoria.mjs falló');
  else if (lineas.filter((l) => l.startsWith('falta registrar')).length) add('P2', 'regla-categoria-sin-registrar', `${lineas.filter((l) => l.startsWith('falta registrar')).length} ejemplo(s) de reglas de categoría sin registrar: node tools/reglas-categoria.mjs --escribir`);
}

// Cada deporte activo (o con taxonomía) tiene su tabla de «ceros que no pueden ser cero» en tools/deporte-club.mjs (CEROS_POR_DEPORTE; [] si la vacía es a propósito) y su taxonomía.
function checkDeportes() {
  let out = ''; let fallo = false;
  try { out = execSync('node tools/deporte-club.mjs', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString(); }
  catch (e) { out = String(e.stdout || e.stderr || ''); fallo = true; }
  const lineas = out.split('\n').map((l) => l.trim()).filter(Boolean);
  if (fallo) add('P2', 'deporte-sin-tabla', lineas.filter((l) => l.startsWith('ERROR')).slice(0, 3).join(' | ') || lineas.slice(-1)[0] || 'tools/deporte-club.mjs falló');
}

// LA COMA DECIMAL QUE EL OCR SE COME. Una tabla en £m / M con un decimal sale de la transcripción con «Central income 5.3 74 (2.1)» por 7.4 (Bath 2023-24 L162).
// Regla: una fila de tres cifras A B C con al menos una con decimal, donde C NO es la diferencia de A y B, pero SÍ lo es si un entero sin coma (A o B) se divide por 10.
// Aviso P2, no frena nada: Admin/mediciones/339-condicion-coma.md (medida: 4 marcadas en 3.677 .md, 0 falsas). Se silencia con tools/audit-ignore.json (code coma-comida) tras mirar la fuente.
// Una cifra registrada en Admin/registros/rarezas.jsonl (tools/rarezas.mjs: ya se miró y es así en el documento) no se marca; otra cifra de la misma tabla, sí.
function checkComaComida() {
  const R = path.join(ROOT, 'Clubes'); const R_ = require('./rarezas.mjs');
  const num = (t) => { const neg = /^\(.*\)$/.test(t) || t.startsWith('-'); const v = parseFloat(t.replace(/[()\-,]/g, '')); return neg ? -v : v; };
  const TOK = '(\\(?-?\\d+\\.\\d\\)?|\\(?-?\\d+\\)?)';
  const re = new RegExp('^[|\\s]*([A-Za-z][^|\\d]{2,60}?)[|\\s]+' + TOK + '[|\\s]+' + TOK + '[|\\s]+' + TOK + '[|\\s]*$');
  const cierra = (a, b, c) => Math.abs(a - b - c) <= 0.051 || Math.abs(b - a - c) <= 0.051;
  const walk = (d) => { for (const e of fs.readdirSync(d)) { const f = path.join(d, e); const st = fs.statSync(f, { throwIfNoEntry: false }); if (!st) continue; /* un enlace a un PDF que ya no está (worktree) */ if (st.isDirectory()) walk(f); else if (f.endsWith('.md')) leer(f); } };
  const leer = (f) => {
    fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
      const m = l.match(re); if (!m) return;
      const t = [m[2], m[3], m[4]]; if (!t.some((x) => x.includes('.'))) return;
      const [a, b, c] = t.map(num); if (cierra(a, b, c)) return;
      for (const k of [0, 1]) {
        const v = [a, b]; v[k] = v[k] / 10;
        if (!t[k].includes('.') && cierra(v[0], v[1], c) && !R_.rarezaEn(path.relative(ROOT, f), i + 1, t[k])) { add('P2', 'coma-comida', `${path.relative(ROOT, f)} L${i + 1}: «${l.trim().slice(0, 80)}» — la cifra ${k + 1} (${t[k]}) parece haber perdido la coma decimal (con ÷10 la fila cierra); corregir el .md o silenciar tras mirar el documento`); break; }
      }
    });
  };
  if (fs.existsSync(R)) walk(R);
}

// LAS RAREZAS QUE PERDIERON SU TEXTO (tools/rarezas.mjs, regla de CONVENCIONES «UNA RAREZA DEL DOCUMENTO YA REVISADA…»). Una rareza cubre un hallazgo
// solo si su texto sigue en su línea ±3; si una re-transcripción lo movió, ya no cubre nada (no tapa, pero la revisión se pierde): hay que moverla.
function checkRarezas() {
  const R_ = require('./rarezas.mjs');
  for (const r of R_.sinSuTexto()) add('P3', 'rareza-sin-su-texto', `Admin/registros/rarezas.jsonl: ${r.md}:${r.linea} «${r.texto}» ya no está en esa línea ±3 (¿se re-transcribió?). Buscá el texto en el .md y registrala de nuevo con tools/rarezas.mjs, o sacala`);
}

// (aprobado por la Auditora) EJERCICIO SIN RASTRO. Un club-año entre el primer ejercicio cargado de un club y el más reciente cargado de su país que ni está
// cargado ni figura en data/faltantes/ con ningún estado (buscado, en-mano, sin-buscar: esos ya tienen su lugar). Cubre el hueco entre dos ejercicios y la cola hasta el último año del país.
// P3 por club, con la lista de años. Se silencia por club en tools/audit-ignore.json, con motivo, después de mirarlo. Medido al nacer: 84 club-años en 51 clubes (24 de hueco y 60 de cola).
const { temporada: temporadaDe } = require('./temporada.js'); // la misma que usa tools/faltantes-liga.mjs
function checkEjercicioSinRastro() {
  const RECIENTE_MESES = 9; // el mismo de tools/faltantes-liga.mjs: si cambia allá, cambia acá (el .mjs corre su main al importarlo)
  const dirFal = path.join(ROOT, 'data/faltantes');
  if (!fs.existsSync(dirFal)) return;
  const enFaltantes = {}; // clubId -> Set de años, con cualquier estado
  for (const f of fs.readdirSync(dirFal).filter((x) => x.endsWith('.js'))) {
    const w = { window: {} };
    try { vm.runInNewContext(fs.readFileSync(path.join(dirFal, f), 'utf8'), w); } catch (e) { continue; }
    for (const liga of Object.values(w.window.LEAGUE_GAPS || {})) {
      for (const [y, o] of Object.entries(liga)) for (const x of (o.faltan || [])) if (x.id) (enFaltantes[x.id] = enFaltantes[x.id] || new Set()).add(Number(y));
    }
  }
  const clubes = []; const maxPais = {};
  for (const rel of archivosData()) {
    const rj = path.join(ROOT, rel.replace(/-data\.js$/, '.json'));
    let j; try { j = JSON.parse(fs.readFileSync(rj, 'utf8')); } catch (e) { continue; }
    const anios = (j.years || []).map((y) => y.fiscal_year).filter((y) => Number.isFinite(y));
    if (!anios.length) continue;
    const iso = path.basename(path.dirname(rj));
    clubes.push({ id: j.club.id, iso, anios, cruza: j.club.fiscal_year_start !== '01-01', fys: j.club.fiscal_year_start });
    // El máximo del país no cuenta presupuestos puros (official_budget): un presupuesto no es un balance cargado (Auditora 4: 51 -> 38 clubes).
    const reales = (j.years || []).filter((y) => y.report_type !== 'official_budget').map((y) => y.fiscal_year).filter((y) => Number.isFinite(y));
    maxPais[iso] = Math.max(maxPais[iso] || 0, ...reales);
  }
  for (const c of clubes.sort((a, b) => a.id.localeCompare(b.id))) {
    const tiene = new Set(c.anios); const fal = enFaltantes[c.id] || new Set();
    // data/faltantes/ está por TEMPORADA (la que termina en el año de la lista); el ejercicio, por fiscal_year. La misma función que faltantes-liga.mjs (tools/temporada.js) los traduce: un ejercicio que cierra
    // entre septiembre y diciembre de y (FCK, 31/12) es de la temporada y+1 en una liga de temporada partida (Auditora 5). Se busca en data/faltantes/ con la clave del año y con la de la temporada.
    const enFal = (y) => fal.has(y) || fal.has(temporadaDe({ fiscalYearStart: c.fys }, y, true));
    const ultimo = Math.max(...c.anios); const hueco = []; const cola = [];
    for (let y = Math.min(...c.anios); y <= maxPais[c.iso]; y++) {
      if (tiene.has(y) || enFal(y)) continue;
      // Un año cerrado hace menos de RECIENTE_MESES todavía no lo publicó nadie: no es una falta (misma cuenta que tools/faltantes-liga.mjs). La salida depende de la fecha de hoy.
      const cierre = new Date(Date.UTC(y, c.cruza ? 5 : 11, c.cruza ? 30 : 31));
      if ((new Date() - cierre) / (1000 * 60 * 60 * 24 * 30.44) < RECIENTE_MESES) continue;
      (y < ultimo ? hueco : cola).push(y);
    }
    if (!hueco.length && !cola.length) continue;
    const partes = [];
    if (hueco.length) partes.push(`hueco ${hueco.join(', ')}`);
    if (cola.length) partes.push(`sin cargar después de ${ultimo}: ${cola.join(', ')}`);
    add('P3', 'ejercicio-sin-rastro', `${c.id}: ${partes.join('; ')}. Ni cargado ni en data/faltantes/ (buscado, en-mano o sin-buscar). Si no hay documento publicado, silenciarlo en tools/audit-ignore.json con el motivo`);
  }
}

// --- DÓNDE QUEDA LO QUE SE DECIDE O SE DESCUBRE (Admin/propuestas/330-donde-se-pierde.md; los tres, P3) ----------------------------------
// duda-resuelta-en-dudas: una pregunta resuelta se mueve a la evidencia del club (Admin/carga-clubes/<id>.md) y se borra de dudas-por-club.md;
// la lista es lo que Guido usa para escribirle a los clubes, y una respuesta escrita adentro de la pregunta la esconde entre las abiertas.
function checkDudasResueltas() {
  const f = path.join(ROOT, 'Admin', 'dudas-por-club.md');
  if (!fs.existsSync(f)) return;
  const lineas = fs.readFileSync(f, 'utf8').split('\n');
  const hits = [];
  lineas.forEach((l, i) => { if (/\bRESUELT[OA]\b|Sin preguntas pendientes/.test(l)) hits.push(i + 1); });
  if (hits.length) add('P3', 'duda-resuelta-en-dudas', `Admin/dudas-por-club.md: ${hits.length} línea(s) con una pregunta ya resuelta (${hits.slice(0, 8).join(', ')}${hits.length > 8 ? ', …' : ''}). Pasá la respuesta a Admin/carga-clubes/<clubId>.md (y el criterio, si sirve a otros clubes, a CONVENCIONES-DATOS.md) y borrá la pregunta de la lista`);
}

// Quién "lee" un archivo: una tool (tools/, js/), una skill o un documento de criterio. ESTADO, TODO y CHANGELOG no cuentan: nombrar no es leer.
const LECTORES_DOCS = ['PIPELINE', 'CONVENCIONES', 'CONVENCIONES-DATOS', 'ARQUITECTURA', 'PANTALLA', 'HALLAZGOS-pipeline'];
function textoDeLectores() {
  const partes = [];
  const leerCarpeta = (rel, ext) => {
    let es; try { es = fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true }); } catch { return; }
    for (const e of es) {
      const r = `${rel}/${e.name}`;
      if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== 'archivo') leerCarpeta(r, ext); }
      else if (ext.test(e.name)) { try { partes.push(fs.readFileSync(path.join(ROOT, r), 'utf8')); } catch { /* enlace roto */ } }
    }
  };
  leerCarpeta('tools', /\.(mjs|js|json)$/);
  leerCarpeta('js', /\.js$/);
  for (const f of mdsDeSkills()) partes.push(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  for (const d of LECTORES_DOCS) { try { partes.push(fs.readFileSync(path.join(ROOT, 'Admin', `${d}.md`), 'utf8')); } catch { /* falta */ } }
  return partes.join('\n');
}

// registro-sin-lector: cada archivo de Admin/registros/ lo escribe y lo lee alguien. Uno que ninguna tool, skill ni documento de criterio nombra es un
// registro que se llena sin que nadie lo vea. Los que empiezan con punto son listas de corrida de lote.mjs y quedan afuera.
function checkRegistrosSinLector() {
  const dir = path.join(ROOT, 'Admin', 'registros');
  if (!fs.existsSync(dir)) return;
  const texto = textoDeLectores();
  const sin = fs.readdirSync(dir).filter(n => !n.startsWith('.') && !texto.includes(n)).sort();
  for (const n of sin) add('P3', 'registro-sin-lector', `Admin/registros/${n}: ninguna tool, skill ni documento de criterio lo nombra. Si alguien lo lee, que lo diga (una línea en PIPELINE.md); si no, archivalo`);
}

// medicion-sin-destino: cada archivo de Admin/mediciones/ lo cita una tool, una skill o un documento de criterio (HALLAZGOS, PIPELINE,
// CONVENCIONES*, ARQUITECTURA, PANTALLA), o está listado con su destino en Admin/mediciones/README.md. Una medición que no cambió nada y no
// dejó una línea en HALLAZGOS se paga otra vez en la próxima sesión.
function checkMedicionesSinDestino() {
  const dir = path.join(ROOT, 'Admin', 'mediciones');
  if (!fs.existsSync(dir)) return;
  const texto = textoDeLectores();
  let indice = ''; try { indice = fs.readFileSync(path.join(dir, 'README.md'), 'utf8'); } catch { /* sin índice */ }
  const sin = fs.readdirSync(dir).filter(n => n !== 'README.md' && !n.startsWith('.') && !texto.includes(n) && !indice.includes(n)).sort();
  if (sin.length) add('P3', 'medicion-sin-destino', `Admin/mediciones/: ${sin.length} archivo(s) sin destino: ${sin.slice(0, 6).join(', ')}${sin.length > 6 ? ', …' : ''}. Cada medición queda citada por HALLAZGOS-pipeline.md, PIPELINE.md o una regla, o listada con su destino en Admin/mediciones/README.md`);
}


// Un nombre que se usa y nadie definió (eslint no-undef, `node tools/fos.mjs indefinidos`): rompe al correr una rama que ningún ensayo recorre (`--escribir`, `--ejecutar`). P3. Sin eslint instalado (cd tools && npm install) no avisa.
function checkNombresSinDefinir() {
  if (!fs.existsSync(path.join(ROOT, 'tools', 'node_modules', '.bin', 'eslint'))) return;
  let h; try { h = JSON.parse(execSync('node tools/indefinidos.mjs --json', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); } catch (e) { try { h = JSON.parse(e.stdout); } catch (e2) { return; } }
  if (!h.length) return;
  add('P3', 'nombre-sin-definir', `${h.length} nombre(s) usados sin definir en tools/: ${h.slice(0, 4).map(x => `${x.archivo}:${x.linea} ${x.nombre}`).join(', ')}. Corré: node tools/fos.mjs indefinidos`);
}

// cierre-sin-fecha: documentos con .md, de carpetas de clubes que ya tienen un ejercicio cargado, cuyo período en el registro no trae fecha de cierre. Sin ella,
// cargar-inicio.mjs no encuentra el cierre del año anterior y frena (SønderjyskE 2023). Se arregla con periodo.mjs (el cierre del nombre del archivo, con compuerta) o con un ajuste `cierre`.
function checkCierreSinFecha() {
  let e; try { e = fs.readFileSync(path.join(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)); } catch { return; }
  const carpeta = x => x.pdf.split('/').slice(0, 3).join('/');
  const cargadas = new Set(e.filter(x => x.cargado).map(carpeta));
  const sin = e.filter(x => x.tieneMd && x.periodo && !x.periodo.cierre && cargadas.has(carpeta(x)));
  if (!sin.length) return;
  const clubes = new Set(sin.map(carpeta));
  add('P3', 'cierre-sin-fecha', `${sin.length} documento(s) con .md de ${clubes.size} club(es) ya cargados no tienen fecha de cierre en el registro (ej. ${sin.slice(0, 3).map(x => path.basename(x.pdf)).join(', ')}). Corré node tools/inventario-transcripciones.mjs para refrescar el período y revisá los que sigan sin cierre`);
}

// revision-propia-pendiente: los cambios con `revision: propia` en Admin/registros/auditoria-proceso.jsonl (los revisó la sesión que los hizo) que ninguna línea
// posterior con `revision: auditora` cubre (mismas tools). P3 de acción «nada» (sale como P4): la pregunta «¿qué falta revisar?» se contesta con node tools/audit.js --json.
const revisionesPendientes = (lineas) => lineas.filter((l, i) => l.revision === 'propia' && l.tools && !lineas.slice(i + 1).some(r => r.revision === 'auditora' && r.tools && Object.keys(l.tools).every(n => n in r.tools)));
function checkRevisionPropiaPendiente() {
  let lineas; try { lineas = fs.readFileSync(path.join(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)); } catch { return; }
  const pendientes = revisionesPendientes(lineas);
  if (pendientes.length) add('P3', 'revision-propia-pendiente', `${pendientes.length} cambio(s) revisados solo por la sesión que los hizo, sin la revisión de la Auditora:${pendientes.slice(-3).map(l => `${l.fecha} ${String(l.cambio).slice(0, 50)}`).join(' · ')}. La Auditora los revisa y anota patron --revision auditora`);
}

module.exports = { checkCierreSinFecha, revisionesPendientes, checkRevisionPropiaPendiente, checkHigiene, checkDatosJson, checkReglasCategoria, checkDeportes, checkComaComida, checkRarezas, checkEjercicioSinRastro, checkDudasResueltas, checkRegistrosSinLector, checkMedicionesSinDestino, checkNombresSinDefinir };

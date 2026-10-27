// tools/audit-chequeos-4.js — checkTodo, checkFxProcedencia, checkEtiquetaSinRevisar, checkRevisionTaxonomia, checkImportsSinExport, checkCategorizacion, checkEscala, checkLigaDosFuentes, checkPagoSobreDeterminista, checkGestiones. Mudados de tools/audit.js sin cambiar una línea; lo compartido (add, ROOT, fs, path…) está en tools/audit-base.js.

const { REPORT_TYPES_REALES, ROOT, add, archivosData, clubYears, findings, fs, path, ref, sum, vm } = require('./audit-base.js');

// --- LOS PUNTOS DEL TODO: ¿ya se cumplieron? ¿declaran cómo se comprueba? ---------
// Cada punto de Admin/TODO.md lleva líneas `Verificar: ...` (formato en tools/todo-verificar.js). Corre AL FINAL, con todos los hallazgos ya calculados, porque una condición puede ser
// «audit <código> = 0». P3: un punto cumplido hay que cerrarlo (`node tools/todo.mjs --cerrar <id>`) y uno sin condición hay que completarlo (o `Verificar: manual`).
function checkTodo() {
  let T; try { T = require('./todo-verificar.js'); } catch { return; }
  let texto; try { texto = fs.readFileSync(path.join(ROOT, 'Admin/TODO.md'), 'utf8'); } catch { return; }
  const hasta = findings.slice();
  for (const p of T.puntos(texto)) {
    if (!p.verificar.length) { add('P3', 'todo-sin-verificar', `Admin/TODO.md, punto ${p.id}: sin línea «Verificar:». Agregá una condición que una máquina compruebe (audit <código> = 0, existe <ruta>, contiene <ruta> | <texto>) o «Verificar: manual»`); continue; }
    const rs = p.verificar.map((e) => T.evaluar(e, hasta, ROOT));
    const mal = rs.filter((r) => r.ok === null && !/^manual$/.test(r.detalle));
    if (mal.length) add('P3', 'todo-verificar-ilegible', `Admin/TODO.md, punto ${p.id}: ${mal[0].detalle}`);
    else if (rs.every((r) => r.ok === true)) add('P3', 'todo-cumplido', `Admin/TODO.md, punto ${p.id} («${p.titulo.slice(0, 60)}»): cumple su Verificar (${rs.map((r) => r.detalle).join('; ')}). Cerralo: node tools/todo.mjs --cerrar ${p.id}`);
  }
}

// --- D12: procedencia del tipo de cambio ---------------------
// `checkMoneda()` revisa que el fx EXISTA y sea plausible. Esto revisa de DÓNDE
// SALIÓ: si lo declara el documento, si es una cotización de mercado, o si nadie
// lo sabe. Antes eso vivía en prosa y no se podía chequear.
function checkFxProcedencia(api) {
  const fueraDeTabla = [];
  let sinProcedencia = 0;

  // Las entradas de FX_CLOSE, indexadas por moneda+año, para comparar contra
  // ellas cualquier cotización de mercado que un club haya cargado por su cuenta.
  const tabla = {};
  for (const [key, entry] of Object.entries(api.FX_CLOSE || {})) {
    const [moneda, fecha] = key.split('@');
    (tabla[`${moneda}|${fecha.slice(0, 4)}`] = tabla[`${moneda}|${fecha.slice(0, 4)}`] || []).push({ key, ...entry });
  }

  for (const { clubId, year, ym } of clubYears(api)) {
    const real = REPORT_TYPES_REALES.includes(ym.reportType);
    const f = api.fxMetaFor(ym);

    // Una referencia rota es grave: el ejercicio se queda sin tipo de cambio y se
    // convierte con el placeholder global, en silencio.
    if (ym.fxRef && !(api.FX_CLOSE || {})[ym.fxRef]) {
      add('P1', 'fx-ref-rota', `${ref(clubId, year)}: fxRef '${ym.fxRef}' no existe en FX_CLOSE (data/currency-map.js)`);
      continue;
    }
    if (!real || f.fx == null) continue;

    if (f.source === 'unknown') {
      sinProcedencia++;
      add('P2', 'fx-sin-procedencia', `${ref(clubId, year)}: fx ${f.fx} sin procedencia declarada (fxSource), no se sabe si lo declara el documento o si es una cotización externa`);
    }

    // Una cotización de mercado cargada a mano en el archivo de un club, en vez
    // de salir de FX_CLOSE. Si además difiere de la que la tabla declara para esa
    // moneda y ese año, hay una contradicción publicada: dos clubes convirtiendo
    // el mismo cierre con números distintos.
    if ((f.source === 'market_close' || f.source === 'market_approx') && !f.ref) {
      const enTabla = tabla[`${ym.currency}|${year}`] || [];
      const choque = enTabla.find(e => Math.abs(f.fx - e.fx) / e.fx > 0.02);
      if (choque) {
        add('P2', 'fx-mercado-discrepante', `${ref(clubId, year)}: usa ${f.fx} ${ym.currency}/USD como cotización de mercado, pero FX_CLOSE declara ${choque.fx} para esa fecha (${choque.key}, ${choque.label}), ${((Math.abs(f.fx - choque.fx) / choque.fx) * 100).toFixed(1)}% de diferencia`);
      } else if (f.source === 'market_close') {
        fueraDeTabla.push(`${clubId} ${year} (${f.fx} ${ym.currency})`);
      }
    }
  }

  if (fueraDeTabla.length) {
    add('P3', 'fx-mercado-fuera-de-tabla', `${fueraDeTabla.length} cotizaciones de mercado escritas en el archivo de un club en vez de FX_CLOSE: ${fueraDeTabla.join(', ')}. Mientras las use un solo club no duplica nada, pero es el estado del que nace la duplicación, mover a la tabla al confirmar su fecha exacta de cierre.`);
  }
  if (sinProcedencia) {
    add('P3', 'fx-procedencia-pendiente', `${sinProcedencia} ejercicios reales con fx sin procedencia verificada. Es la lista de to-dos que dejó la migración de la Versión 125, no un error de carga: cada uno se resuelve mirando el Anexo de moneda extranjera de su propio documento.`);
  }
}

// Una línea cuya etiqueta puede ser de una categoría con regla (la expresión amplia de tools/etiquetas-reglas.mjs) y está en la categoría de origen sin
// una decisión (aprobada o excluida) en las decisiones de esa categoría: el proceso de `recategorizar-etiquetas.mjs` no la vio. P3.
function checkEtiquetaSinRevisar(api) {
  let E; try { E = require('./etiquetas-reglas.mjs'); } catch (e) { add('P2', 'json-aviso', `no se pudo cargar tools/etiquetas-reglas.mjs: ${e.message}`); return; }
  for (const [cat, R] of Object.entries(E.REGLAS)) {
    const D = E.leerDecisiones(cat); const sin = new Map();
    for (const { clubId, year, rev, exp } of clubYears(api)) for (const l of (R.lado === 'revenue' ? rev : exp)) {
      if (l.normalizedCategory !== R.desde || !R.amplia.test(String(l.rawLabel)) || E.decidida(D, l.rawLabel)) continue;
      const k = E.norm(l.rawLabel); if (!sin.has(k)) sin.set(k, `«${String(l.rawLabel).slice(0, 50)}» (${clubId} ${year})`);
    }
    if (sin.size) add('P3', 'etiqueta-sin-revisar', `${sin.size} etiqueta(s) de ${R.desde} que pueden ser ${cat} y no tienen decisión: ${[...sin.values()].slice(0, 5).join('; ')}${sin.size > 5 ? '; …' : ''}`);
  }
}

// La taxonomía se revisa con una medición (tools/uso-categorias.mjs) cada 6 meses o cada 100 clubes cargados: la última línea de auditoria-proceso.jsonl cuyo `cambio` empieza con «taxonomía:».
// Los clubes de esa revisión salen de «(N clubes» en el texto. Sin ninguna, avisa. P3.
function checkRevisionTaxonomia(api) {
  let ultima = null;
  try { for (const l of fs.readFileSync(path.join(ROOT, 'Admin/registros/auditoria-proceso.jsonl'), 'utf8').split('\n')) { if (!l.trim()) continue; try { const r = JSON.parse(l); if (/^taxonom[ií]a:/i.test(r.cambio || '')) ultima = r; } catch { /* línea rota */ } } } catch { /* sin registro */ }
  const hoy = Object.keys(api.generic).length;
  if (!ultima) { add('P3', 'revision-taxonomia-vencida', 'la taxonomía nunca se revisó con una medición (node tools/uso-categorias.mjs; el resultado se anota con node tools/decision.mjs, «cambio» que empieza con «taxonomía:»)'); return; }
  const dias = (Date.now() - new Date(ultima.fecha).getTime()) / 864e5; const antes = Number((String(ultima.cambio).match(/\((\d+) clubes/) || [])[1]) || 0;
  if (dias > 183 || (antes && hoy - antes >= 100)) add('P3', 'revision-taxonomia-vencida', `la última revisión de la taxonomía fue el ${ultima.fecha} (${Math.round(dias)} días, ${antes} clubes; hoy ${hoy}): pasaron más de 6 meses o 100 clubes. node tools/uso-categorias.mjs y anotarlo con node tools/decision.mjs`);
}

// Un nombre que una tool importa de otra y la otra no exporta (tras partir un módulo): un import dinámico solo falla al correr esa rama. P1.
function checkImportsSinExport() {
  try {
    for (const x of require('./imports-sin-export.mjs').importsSinExport()) add('P1', 'import-sin-export', `tools/${x.archivo} pide «${x.nombre}» de ${x.modulo} y ese módulo no lo exporta`);
  } catch (e) { add('P2', 'json-aviso', `no se pudo correr tools/imports-sin-export.mjs: ${e.message}`); }
}

// Una etiqueta que ya dice «otros» en el idioma del documento (la raíz, sin acentos ni mayúsculas, al principio o tras un no-letra).
const ETIQUETA_OTROS_RE = new RegExp('(?:^|[^\\p{L}])(?:' + [
  'otros?', 'otras?', 'varios', 'diversos?', 'resto', 'other', 'others', 'miscellaneous', 'sundry', 'various', 'outros?', 'outras?', 'altri', 'altre', 'altro', 'autres?', 'divers',
  'diversas?', 'andere', 'διάφορ\\p{L}*', 'net operating expenses', 'operating expenses',
  'sonstige\\p{L}*', 'overig\\p{L}*', 'diverse','annen', 'annet', 'andre', 'övriga', 'muut', 'muud', 'muu', 'prochi\\p{L}*', 'прочи\\p{L}*', 'иные', 'λοιπ\\p{L}*', 'άλλ\\p{L}*', 'inne',
].join('|') + ')(?![\\p{L}])', 'iu');

// SIIS SIN GASTOS DE VENTAS: el estado de resultados de SIIS de ese año (Clubes/<país>/<carpeta>/siis-estado-AAAA.md) no trae «Gastos de ventas» (o lo trae en 0) y pone los gastos en
// «Gastos de administración»: la regla de Colombia manda el rubro tal cual y no hay nómina del plantel que separar (Alianza 2017 y 2018, Fortaleza 2016). `sin-salarios` no aplica.
function siisSinGastosDeVentas(clubId, year) {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/siis-clubes.json'), 'utf8')); const carpeta = Object.entries(cfg.clubes).find(([, v]) => v.clubId === clubId)?.[0]; if (!carpeta) return false;
    const L = fs.readFileSync(path.join(ROOT, 'Clubes', cfg.pais, carpeta, `siis-estado-${year}.md`), 'utf8').split('\n').filter((l) => l.trim().startsWith('|'));
    const celdas = (l) => l.split('|').slice(1, -1).map((x) => x.replace(/\*/g, '').trim()); const col = celdas(L.find((l) => celdas(l)[0] === 'Concepto') || '').indexOf(String(year)); if (col < 1) return false;
    const valor = (rotulo) => { const f = L.find((l) => celdas(l)[0].toLowerCase() === rotulo); return f ? Number((celdas(f)[col] || '0').replace(/\./g, '').replace(/[()]/g, '')) || 0 : null; };
    const ventas = valor('gastos de ventas'); const admin = valor('gastos de administración');
    return (ventas === null || ventas === 0) && admin > 0;
  } catch { return false; }
}

function checkCategorizacion(api) {
  for (const { clubId, year, ym, rev, exp } of clubYears(api)) {
    if (!exp.length && !rev.length) continue;
    const cat = c => exp.filter(l => l.normalizedCategory === c).reduce((s, l) => s + l.amountNative, 0);
    // los sueldos del primer equipo y el bolsón sin desglosar son los de la taxonomía del deporte del club (wages_squad / lump_football_operations_expense en fútbol)
    const tx = api.SPORT_TAXONOMIES[(api.clubs[clubId] || {}).sport || 'futbol'] || api.SPORT_TAXONOMIES.futbol;
    const SUELDOS = Object.keys(tx.expense).find(k => tx.expense[k] === 'first_team_staff'); const BOLSON = (tx.lump || {}).expense;
    // Un ejercicio placeholder tiene sus líneas en cero: no es que falten los sueldos,
    // es que no hay datos todavía. Solo se mira donde hay plata cargada.
    // Los sueldos marcados «incluidos en» otra fila (`incluye`, el documento no permite separarlos) están resueltos: el sitio lo dice en la fila.
    if (SUELDOS && sum(exp) !== 0 && cat(SUELDOS) === 0 && (!BOLSON || cat(BOLSON) === 0) && !(ym && ym.incluidoEn && ym.incluidoEn[SUELDOS]) && !siisSinGastosDeVentas(clubId, year)) {
      add('P2', 'sin-salarios', `${ref(clubId, year)}: no hay ni una línea en '${SUELDOS}' ni un bolsón sin desglosar — todo club paga sueldos, probablemente quedaron enterrados en otra categoría`);
    }
    // SUELDOS POSIBLEMENTE ESCONDIDOS: con el costo de personal del ejercicio ya leído de su nota (fiscalYearMeta.staffCost,
    // caja-deuda.mjs --personal), las líneas wages_squad suman menos de la mitad. Caso que lo motivó: PAOK, 42 M en "Αμοιβές τρίτων" del
    // cuadro de fútbol contra 9,2 M de costo de personal en la nota 17; un subagente lo notó leyendo, esto lo hace aparecer solo.
    // también acá la marca `incluye` es lo resuelto: el costo de personal se leyó y el documento no deja separarlo
    if (SUELDOS && ym.staffCost > 0 && Math.abs(cat(SUELDOS)) < ym.staffCost / 2 && !(ym.incluidoEn && ym.incluidoEn[SUELDOS])) {
      add('P2', 'sueldos-escondidos', `${ref(clubId, year)}: el costo de personal de la nota es ${ym.staffCost} y '${SUELDOS}' suma ${Math.abs(cat(SUELDOS))}: los sueldos pueden estar dentro de otra línea (caja-deuda.mjs --personal --partir, o la cola por renglón)`);
    }
    for (const [sec, lines, buckets, catchAll] of [
      ['Ingresos', rev, api.REVENUE_BUCKETS, 'Otros ingresos'],
      ['Gastos', exp, api.EXPENSE_BUCKETS, 'Otros gastos'],
    ]) {
      if (!lines.length) continue;
      const total = Math.abs(sum(lines));
      if (!total) continue;
      const rows = api.bucketize(lines, buckets, catchAll, null, (api.clubs[clubId] || {}).sport);
      const resto = Math.abs((rows.find(r => r.label === catchAll) || {}).value || 0);
      const pct = resto / total;
      // P3, no P2 (Auditora 4, 2ª corrida de P2 y P3): un catch-all grande es un dato para mirar, no un error de carga; el total cierra y la
      // línea figura tal cual la fuente. Y no se cuenta cuando en esa fila caen una o dos líneas: ahí no hay nada que desglosar (una sola
      // línea del documento, como "Otros ingresos" o "Otros gastos", ES el catch-all).
      const lineasEnLaFila = ((rows.find(r => r.label === catchAll) || {}).items || []).length;
      if (pct > 0.4 && lineasEnLaFila > 2) {
        // La línea más grande del catch-all: si es ella misma un «otros» del documento, es el límite de la fuente y no hay nada que recategorizar
        // (`catchall-limite-fuente`, informativo); si tiene nombre propio, queda `catchall-dominante` con la etiqueta a la vista.
        const mayor = (rows.find(r => r.label === catchAll).items || []).reduce((a, it) => (Math.abs(it[1]) > Math.abs(a[1]) ? it : a));
        const esOtros = ETIQUETA_OTROS_RE.test(String(mayor[0]));
        add('P3', esOtros ? 'catchall-limite-fuente' : 'catchall-dominante', `${ref(clubId, year)} ${sec}: el catch-all "${catchAll}" se lleva ${(pct * 100).toFixed(0)}% del total, la línea más grande es «${String(mayor[0]).slice(0, 70)}» (${(Math.abs(mayor[1]) / total * 100).toFixed(0)}%) — Formato simplificado no dice casi nada para este ejercicio`);
      }
    }
  }
}

// --- S: escalabilidad -------------------------------------------------------
function checkEscala(api) {
  // El invariante del proyecto es que NO hay ramas por club
  // en el código. Un `clubId` literal en index.html o en js/ es la primera grieta.
  const archivos = ['index.html', ...fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).map(f => 'js/' + f)];
  const ids = Object.keys(api.clubs);
  const hits = [];
  for (const rel of archivos) {
    // Los comentarios HTML se blanquean ANTES de buscar (falso positivo
    // real): el comentario de cabecera de index.html eran 50 KB de prosa donde nombrar
    // `racing` o `boca` es lo normal, y cada mención se reportaba como si fuera una
    // rama por club en el código. Se reemplaza por líneas vacías, no se borra, para
    // que los números de línea que se reportan sigan siendo los del archivo.
    const crudo = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const limpio = crudo.replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));
    limpio.split('\n').forEach((linea, i) => {
      const t = linea.trim();
      if (!t) return;
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('-')) return;
      for (const id of ids) {
        // Comillas simples o dobles, NO backticks: en prosa un `id` entre backticks es
        // markdown, no código, y era la otra mitad del mismo falso positivo.
        if (new RegExp(`['"]${id}['"]`).test(linea)) {
          hits.push({ rel, line: i + 1, id, texto: crudo.split('\n')[i].trim().slice(0, 110) });
        }
      }
    });
  }
  for (const h of hits) {
    add('P2', 'clubid-hardcodeado', `${h.rel}:${h.line}: literal '${h.id}' en código — revisar que no sea una rama por club (${h.texto})`);
  }

  const bytesData = archivosData()
    .reduce((s, f) => s + fs.statSync(path.join(ROOT, f)).size, 0);
  const n = Object.keys(api.generic).length;
  const porClub = Math.round(bytesData / n);
  add('P3', 'proyeccion', `data/*.js: ${(bytesData / 1024).toFixed(0)} KB en ${n} clubes (~${(porClub / 1024).toFixed(1)} KB/club). A 1000 clubes: ~${(porClub * 1000 / 1024 / 1024).toFixed(1)} MB en disco; el que se baja por visita sigue siendo 1 (lazy load), pero clubs.js se carga entero SIEMPRE (hoy ${(fs.statSync(path.join(ROOT, 'data/clubs.js')).size / 1024).toFixed(0)} KB).`);

  // UMBRALES POR CÓMO SE LEE EL ARCHIVO, no por tamaño a secas (decisión de
  // Guido después de plantearle el trade-off). Un archivo que se lee ENTERO paga su tamaño
  // en cada lectura: `index.html` lo baja cada visitante en cada pageview, y `Admin/ESTADO.md` y
  // `Admin/TODO.md` los lee entera cada sesión que arranca acá. Esos tienen umbral apretado.
  // `Admin/CHANGELOG.md` y `Admin/finance-of-sports-project.md` son de CONSULTA PUNTUAL: se entra con un
  // grep, se lee un bloque y se sale, y para ese uso 459 KB en un archivo cuestan lo mismo
  // que 459 KB repartidos en cinco. Partirlos tendría un costo real y concreto: hoy "¿dónde
  // está la historia?" tiene una respuesta de una palabra, y con CHANGELOG-2026/2027/... cada
  // búsqueda arranca eligiendo archivo y cada tanto alguien escribe en el viejo. Sus umbrales
  // son deliberadamente altos y solo existen para avisar si algún día se van de escala.
  // EL DÍA QUE SÍ HAYA QUE PARTIRLOS no va a ser por el tamaño: va a ser cuando un grep
  // devuelva decenas de bloques irrelevantes, y eso se arregla con un índice, no partiendo.
  // `Admin/CHANGELOG.md` llegó a 724 KB con dos mitades en orden contrario y se partió UNA vez, por
  // ÉPOCA y no por tamaño ni por año: las Versiones 10 a 299 (sourcing y onboarding manual, antes del pipeline) viven en
  // `Admin/Archive/CHANGELOG-v010-v299.md`, de la más nueva a la más vieja; el CHANGELOG sigue desde la 300 y su cabecera dice dónde está lo anterior.
  // No se parte en rangos: una búsqueda tiene que elegir entre dos archivos como mucho.
  for (const [f, limite] of [['Admin/CHANGELOG.md', 400], ['Admin/finance-of-sports-project.md', 1200], ['index.html', 150], ['Admin/ESTADO.md', 60], ['Admin/TODO.md', 60],
    // el resto de Admin/*.md con un umbral común: avisa si alguno se va de escala.
    ...fs.readdirSync(path.join(ROOT, 'Admin')).filter(n => /\.md$/.test(n) && !/^(CHANGELOG|finance-of-sports-project|ESTADO|TODO)\.md$/.test(n)).map(n => ['Admin/' + n, 250])]) {
    const kb = fs.statSync(path.join(ROOT, f)).size / 1024;
    if (kb > limite) add('P3', 'archivo-pesado', `${f}: ${kb.toFixed(0)} KB (umbral ${limite} KB) — candidato a partir`);
  }
}

// --- H: higiene de runtime que sí se puede ver desde Node -------------------
// GESTIONES: data/gestiones/<país>.js. Lo que el sitio muestra como botón y como
// franja tiene que ser verificable: una gestión confirmada sin fuente es un dato sin respaldo (P1);
// una fecha mal escrita, un "hasta" antes del "desde" o dos gestiones del mismo club que se pisan
// asignan mal los ejercicios en silencio (P1); un club que no existe es una gestión que nunca se ve
// (P2). Y la lista PAISES de js/finanzas-anios.js tiene que nombrar exactamente los archivos que hay:
// un archivo que no está en la lista nunca se carga (P1).
// LA LIGA DE UN AÑO NECESITA DOS FUENTES (regla de Guido en Admin/CONVENCIONES-DATOS.md; diseño aprobado por la Auditora 5, sección 7). La lista de
// equipos de cada liga-temporada (tools/club-league-reference/<iso>.json) es una fuente (Wikipedia); `fuentes` suma las otras (tools/segunda-fuente-liga.mjs).
// ALCANCE (cambio 1 de la Auditora): no los 1.300 club-años cargados (un P3 permanente que nadie baja), solo las asignaciones del alta que (a) son
// desde LIGA_DOS_FUENTES_DESDE o (b) salieron de una coincidencia NO exacta (ni el nombre igual ni un alias de alias.json). El rastro es el de
// alta-club.mjs en Admin/carga-clubes/<id>.md («roster cacheado de "<página>" (…/<iso>.json), coincidencia exacta "X"» o «… única por palabras "X" =
// "Y"», con la fecha si la línea la trae). Cuenta solo si la fila de data/club-leagues/ de ese año (o del anterior) sigue siendo esa liga.
//   liga-una-fuente (P3, UNA línea por liga): club-años de ese alcance cuya liga-temporada tiene una sola fuente.
//   liga-fuentes-no-coinciden (P2, por club-año): hay dos fuentes y el club (por el nombre de la lista, el de su carpeta o un alias, nunca por
//   parecido) no está en la otra. Lo decide la Auditora o se vota; no se corrige solo.
const LIGA_DOS_FUENTES_DESDE = '2026-10-22';
function checkLigaDosFuentes(api) {
  const dirEv = path.join(ROOT, 'Admin', 'carga-clubes'); const dirRef = path.join(ROOT, 'tools', 'club-league-reference');
  if (!fs.existsSync(dirEv) || !fs.existsSync(dirRef)) return;
  const n = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  let alias = {}; try { alias = JSON.parse(fs.readFileSync(path.join(dirRef, 'alias.json'), 'utf8')); } catch { /* sin alias: solo el nombre */ }
  const caches = {}; const cache = (iso) => { if (!(iso in caches)) { try { caches[iso] = JSON.parse(fs.readFileSync(path.join(dirRef, `${iso}.json`), 'utf8')); } catch { caches[iso] = null; } } return caches[iso]; };
  const RE = /roster cacheado de "([^"]+)" \(tools\/club-league-reference\/([a-z]{2})\.json\), coincidencia (exacta "([^"]+)"|única por palabras "([^"]+)" = "([^"]+)")/;
  const casos = new Map();
  for (const f of fs.readdirSync(dirEv).filter((x) => x.endsWith('.md')).sort()) {
    const clubId = f.replace(/\.md$/, '');
    for (const l of fs.readFileSync(path.join(dirEv, f), 'utf8').split('\n')) {
      const m = RE.exec(l); if (!m) continue;
      const [, pagina, iso, , exacta, lista2, carpeta] = m; const lista = exacta || lista2;
      const fecha = (/alta-club\.mjs, (\d{4}-\d{2}-\d{2})/.exec(l) || [])[1] || null;
      const k = `${clubId}|${pagina}`; const prev = casos.get(k) || {};
      casos.set(k, { clubId, pagina, iso, lista, carpeta: carpeta || prev.carpeta || null, exacta: !!exacta, fecha: fecha || prev.fecha || null });
    }
  }
  const unaFuente = {};
  for (const c of casos.values()) {
    const aliasDelClub = Object.entries(alias[c.iso] || {}).filter(([, a]) => a && a.clubId === c.clubId).map(([x]) => n(x));
    const noExacta = !c.exacta && n(c.lista) !== n(c.carpeta) && !aliasDelClub.includes(n(c.lista));
    if (!noExacta && !(c.fecha && c.fecha >= LIGA_DOS_FUENTES_DESDE)) continue;
    const C = cache(c.iso); let liga = null; let anio = null; let entrada = null;
    for (const [lid, ys] of Object.entries(C?.leagues || {})) for (const [y, e] of Object.entries(ys)) if (e.wikipediaPage === c.pagina) { liga = lid; anio = Number(y); entrada = e; }
    if (!entrada) continue;
    const filas = api.CLUB_LEAGUE_BY_YEAR[c.clubId] || {};
    if (![anio, anio - 1].some((y) => String(filas[y] || '').toLowerCase() === liga.toLowerCase())) continue; // la fila ya no es esa liga (corregida)
    const fuentes = entrada.fuentes && entrada.fuentes.length ? entrada.fuentes : [{ tipo: 'wikipedia' }];
    const otras = fuentes.filter((x) => x.tipo !== 'wikipedia' && Array.isArray(x.equipos));
    if (!otras.length) { (unaFuente[liga] = unaFuente[liga] || []).push(`${c.clubId} ${anio}`); continue; }
    const nombres = new Set([n(c.lista), n(c.carpeta), ...aliasDelClub].filter(Boolean));
    for (const o of otras) if (!o.equipos.some((e) => nombres.has(n(e)))) add('P2', 'liga-fuentes-no-coinciden', `${c.clubId} ${anio} en ${liga}: está en la lista de Wikipedia («${c.lista}», ${c.pagina}) y no en la de ${o.tipo} (${o.url}) por su nombre ni por un alias de alias.json. Si es el mismo club con otro nombre, va a alias.json; si no, lo decide la Auditora o se vota (no se corrige solo)`);
  }
  for (const [liga, cs] of Object.entries(unaFuente).sort()) add('P3', 'liga-una-fuente', `${liga}: ${cs.length} club-año(s) con la liga de una sola fuente (Wikipedia) que salieron de una coincidencia no exacta o son nuevos: ${cs.slice(0, 6).join(', ')}${cs.length > 6 ? ', …' : ''}. La segunda: node tools/segunda-fuente-liga.mjs`);
}

// (regla de Guido: lo que ya viene estructurado no se paga con IA) PAGO DE IA SOBRE UN DOCUMENTO DETERMINISTA. Un .md que escribió tools/xhtml-aarsrapport.mjs (primera línea: «motor: xhtml-ixbrl»)
// trae sus cifras etiquetadas. P1 si un log de API (los que lee tools/gasto.mjs) registra, desde FRENO_DESDE, una llamada de localizar o extraer sobre uno de esos documentos sin que Admin/registros/pagar-ia-xhtml.jsonl
// tenga antes la bandera `--pagar-ia-xhtml "<motivo>"` de lote.mjs para ese documento. Cuando exista el escalón que lee las etiquetas, el «sin la bandera» pasa a ser «sin haber corrido el escalón».
const FRENO_DESDE = '2026-10-22T00:00:00Z';
function checkPagoSobreDeterminista() {
  const dir = path.join(ROOT, 'Admin', 'registros');
  const autorizados = []; // { pdf, ts }
  try { for (const l of fs.readFileSync(path.join(dir, 'pagar-ia-xhtml.jsonl'), 'utf8').split('\n').filter(Boolean)) { const o = JSON.parse(l); if (!o.cierre) for (const d of o.docs || []) autorizados.push({ pdf: d, ts: o.ts }); } } catch (e) { /* sin bandera usada */ }
  const esDet = {}; const det = (pdf) => (pdf in esDet ? esDet[pdf] : (esDet[pdf] = (() => { try { return /motor: xhtml-ixbrl/.test(fs.readFileSync(path.join(ROOT, pdf.replace(/\.pdf$/i, '.md')), 'utf8').slice(0, 400)); } catch (e) { return false; } })()));
  const malos = new Set();
  for (const log of ['claude-api.jsonl', 'gemini.jsonl', 'mistral.jsonl']) {
    let t; try { t = fs.readFileSync(path.join(dir, 'api', log), 'utf8'); } catch (e) { continue; }
    for (const l of t.split('\n')) {
      if (!l.includes('"pdf"')) continue;
      let o; try { o = JSON.parse(l); } catch (e) { continue; }
      if (!o.pdf || !o.ts || o.ts < FRENO_DESDE || !o.costUsd || o.pdf.startsWith('/') || !det(o.pdf)) continue;
      if (!autorizados.some((a) => a.pdf === o.pdf && a.ts <= o.ts)) malos.add(o.pdf);
    }
  }
  if (malos.size) add('P1', 'pago-ia-sobre-determinista', `${malos.size} documento(s) de motor xhtml-ixbrl (determinista) con una llamada paga de IA (${log0(malos)}) sin --pagar-ia-xhtml "<motivo>" registrado antes en Admin/registros/pagar-ia-xhtml.jsonl: sus cifras ya vienen etiquetadas y no se pagan con IA`);
}
const log0 = (set) => [...set].slice(0, 3).map((p) => p.split('/').pop()).join(', ') + (set.size > 3 ? `, +${set.size - 3} más` : '');
function checkGestiones(api) {
  const dir = path.join(ROOT, 'data', 'gestiones');
  if (!fs.existsSync(dir)) return;
  const archivos = fs.readdirSync(dir).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, '')).sort();
  const anios = fs.readFileSync(path.join(ROOT, 'js', 'finanzas-anios.js'), 'utf8');
  const m = anios.match(/const PAISES = \[([^\]]*)\]/);
  const lista = m ? [...m[1].matchAll(/'([a-z]+)'/g)].map(x => x[1]).sort() : [];
  for (const f of archivos) if (!lista.includes(f)) add('P1', 'gestiones-sin-cargar', `data/gestiones/${f}.js existe pero '${f}' no está en PAISES de js/finanzas-anios.js: el sitio nunca lo carga`);
  for (const f of lista) if (!archivos.includes(f)) add('P2', 'gestiones-pais-sin-archivo', `PAISES de js/finanzas-anios.js nombra '${f}' y no existe data/gestiones/${f}.js (404 al elegir un club de ese país)`);
  const sandbox = { window: {} };
  for (const f of archivos) {
    try { vm.runInNewContext(fs.readFileSync(path.join(dir, f + '.js'), 'utf8'), sandbox, { filename: `data/gestiones/${f}.js` }); }
    catch (e) { add('P1', 'gestiones-no-carga', `data/gestiones/${f}.js no carga: ${e.message}`); }
  }
  const fecha = /^\d{4}-\d{2}-\d{2}$/;
  const sinBalance = [];
  for (const [club, gs] of Object.entries(sandbox.window.CLUB_GESTIONES || {})) {
    // P3: las gestiones se cargan por país antes que los balances; un club sin balance todavía es esperable, no un riesgo.
    // Una línea por país en vez de una por club (Auditora 5): son 26 avisos del mismo hecho. Y un id sin balance que se parece a uno cargado
    // (mismo país y mismos cinco primeros caracteres del slug) sí puede ser un id mal escrito: ese es P1 (`gestion-id-sospechoso`).
    if (!api.clubs[club]) sinBalance.push(club);
    const orden = gs.slice().sort((a, b) => a.desde < b.desde ? -1 : 1);
    orden.forEach((g, i) => {
      const quien = `${club} · ${g.nombre || '?'}`;
      if (!g.nombre || !g.corto || !g.cargo) add('P1', 'gestion-incompleta', `${quien}: falta nombre, corto o cargo`);
      if (!fecha.test(g.desde || '') || (g.hasta != null && !fecha.test(g.hasta))) add('P1', 'gestion-fecha', `${quien}: desde/hasta tienen que ser AAAA-MM-DD (hasta puede ser null)`);
      else if (g.hasta != null && g.hasta <= g.desde) add('P1', 'gestion-fecha', `${quien}: "hasta" (${g.hasta}) no es posterior a "desde" (${g.desde})`);
      if (g.confirmada && !g.fuente) add('P1', 'gestion-sin-fuente', `${quien}: confirmada sin fuente; o se le pone la fuente o confirmada:false`);
      const sig = orden[i + 1];
      if (sig && (g.hasta == null || g.hasta > sig.desde)) add('P1', 'gestiones-superpuestas', `${club}: ${g.nombre} (hasta ${g.hasta || 'hoy'}) se pisa con ${sig.nombre} (desde ${sig.desde})`);
    });
  }
  const partes = (id) => { const i = id.lastIndexOf('-'); return { slug: id.slice(0, i), pais: id.slice(i + 1) }; };
  const porPais = {};
  for (const id of sinBalance) (porPais[partes(id).pais] = porPais[partes(id).pais] || []).push(id);
  for (const [pais, ids] of Object.entries(porPais)) {
    add('P3', 'gestion-club-inexistente', `${ids.length} clubes con gestión y sin balance (${pais}): ${ids.join(', ')} — las gestiones se cargan por país antes que los balances`);
    for (const id of ids) {
      const { slug } = partes(id);
      // «se parece» = mismo país, mismos cinco primeros caracteres del slug (Auditora 5) Y a lo sumo 2 letras de distancia: sin lo segundo,
      // «deportestolima» y «deportivopereira» (dos clubes distintos de Colombia) comparten «depor» y darían un P1 falso, que frena los commits.
      const dist = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };
      const parecido = Object.keys(api.clubs).find((c) => { const p = partes(c); return p.pais === pais && p.slug.slice(0, 5) === slug.slice(0, 5) && dist(p.slug, slug) <= 2; });
      if (parecido) add('P1', 'gestion-id-sospechoso', `data/gestiones: '${id}' no está en data/clubs.js pero se parece a '${parecido}' (mismo país y mismos cinco primeros caracteres): ¿id mal escrito?`);
    }
  }
}


module.exports = { checkTodo, checkFxProcedencia, checkEtiquetaSinRevisar, checkRevisionTaxonomia, checkImportsSinExport, checkCategorizacion, checkEscala, checkLigaDosFuentes, checkPagoSobreDeterminista, checkGestiones };

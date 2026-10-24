// ============================================================================
// tools/cargar-inicio.mjs — las primeras fases de proponer(): el documento en el registro, su período, el club y el año, y las filas de la verificación
// Mudado de tools/cargar.mjs sin cambiar una línea (salvo `export`); tools/cargar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve, basename, dirname } from 'node:path';
import { rutaData } from './data-clubes.js';
import { parseNumber } from './datos-sitio.mjs';
import { COBERTURA_PERDIDAS_RE } from './vocabulario.mjs';
import { combinar as combinarEntidades } from './suma-entidades.mjs';
import { analizar, categoriasAlDia, huellaVerificar, clubDeRuta, derivado, agregarCaso, casoYRespuesta, ajusteDe, ajustePerimetroDe, cierrePorVecinos, periodoDe, xhtmlHermano, categoriasDeDeporte, cerosDeDeporte, ESCRIBIR, REEMPLAZAR, HOY, quien, perimetroHeredado, perimetroCercano, porQueNoListo } from './cargar.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// 1. El documento en el registro, su período (primer ejercicio, transición, tramo corto) y su .md / .categorias.json.
export function faseRegistro(ctx) {
  const { registro, pdf, corta, P, frena, sitio } = ctx;
  const e = registro.find((x) => x.pdf === pdf);
  if (!e) { return corta('registro', 'el PDF no está en Admin/registros/transcripciones-estado.jsonl (correr tools/inventario-transcripciones.mjs)'); }
  P.md = e.md;
  const reemplaza = REEMPLAZAR && e.cargado;
  if (e.cargado && !REEMPLAZAR) frena('registro', 'el registro dice que el ejercicio ya está cargado en el sitio');
  if (reemplaza) P.avisos.push('--reemplazar: rehace un ejercicio ya cargado');
  // Los frenos que dependen de "no es un reemplazo" quedan marcados: si más abajo data/ dice que el año ya está cargado (escalón 1 de
  // --reemplazar, ver "¿ESTÁ CARGADO?"), se sacan.
  const frenosSinReemplazo = [];
  if (e.jev !== 'listo-para-jev' && !reemplaza) { frena('registro', `todavía no se puede categorizar: ${porQueNoListo(e)}`); frenosSinReemplazo.push(P.frena.at(-1)); }
  P.reemplaza = reemplaza;
  // El período se recalcula con tools/periodo.mjs sobre el .md actual: el del registro puede ser de una versión anterior de periodo.mjs
  // (el arreglo de las temporadas "2009-10" cambió 165 marcas `nombreNoCoincide`). Si difiere del registro, se avisa.
  let per = e.periodo || null;
  // con ajuste manual `cierre`, el período del registro ya es el del ajuste (inventario-transcripciones.mjs): no se recalcula.
  if (!ajusteDe(pdf, 'cierre')) try { const mdT = readFileSync(resolve(ROOT, e.md), 'utf8'); const vivo = periodoDe(mdT, basename(pdf), { xhtml: xhtmlHermano(resolve(ROOT, e.md), mdT) }); if (per && (vivo.tipo !== per.tipo || !!vivo.nombreNoCoincide !== !!per.nombreNoCoincide)) P.avisos.push(`el período del registro (${per.tipo}${per.nombreNoCoincide ? ', nombre no coincide' : ''}) está desactualizado: tools/periodo.mjs hoy dice ${vivo.tipo}${vivo.nombreNoCoincide ? ', nombre no coincide' : ''} (regenerar el registro)`); per = vivo; } catch { /* sin .md: frena abajo */ }
  // Sin fecha de cierre: se deduce de los documentos vecinos del club, con aviso. Si no se puede, sigue
  // como antes (frena más abajo por período o por año).
  if (per && !per.cierre) { const cv = cierrePorVecinos(pdf, registro); if (cv) { per = { ...per, cierre: cv.cierre, cierreDeducido: true }; P.avisos.push(`fecha de cierre ${cv.cierre} ${cv.evidencia}`); }
    else { // sin vecinos: la fecha que un revisor confirmó en la cola (pregunta cierre-por-pais de tools/cierre-propuestas.mjs: aceptar = la propuesta del país, corregir = su valor)
      const { caso: cc, resp: rc } = casoYRespuesta(pdf, 'cargar', 'cierre-por-pais', 'cierre');
      const fecha = rc && (rc.decision === 'aceptar' ? cc?.cierrePropuesto : rc.decision === 'corregir' && /^\d{4}-\d{2}-\d{2}$/.test(rc.valor || '') ? rc.valor : null);
      if (fecha) { per = { ...per, cierre: fecha, cierreDeducido: true }; P.avisos.push(`fecha de cierre ${fecha} confirmada en la cola (cierre-por-pais)`); } } }
  P.periodo = per;
  if (!per) frena('periodo', 'el registro no tiene `periodo` (tools/periodo.mjs) para este documento');
  else {
    // PRIMER EJERCICIO DE UNA SOCIEDAD NUEVA (decisión de Guido; Admin/CONVENCIONES-DATOS.md, "Balances parciales"). Un período
    // de menos de 12 meses es parcial (falta el otro tramo) SALVO que no haya otro tramo: la sociedad no existía antes, y como la liga no se
    // juega todos los meses, el período contiene la temporada entera. UNA compuerta, del propio documento: la columna del año anterior no tiene
    // ningún importe distinto de cero (o no existe) en las filas extraídas. Casos: Kifisia 2022 (09/08/2021 – 30/06/2022, sin columna) y Volos
    // 2019 (24/07/2018 – 30/06/2019, plantilla griega con la columna 2017-2018 toda en 0,00) se cargan; Atalanta 2022 (semestral, 147 importes
    // del año anterior) sigue parcial. Se carga con una publicNote en la fuente.
    // (decisión de Guido: "cargarlo como el año del cierre, con su nota") también MÁS de 12 meses: el primer ejercicio
    // de una sociedad constituida antes de la temporada (Anderlecht 2011, 24-02-2010 a 30-06-2011, 16 meses; RAAL La Louvière 2018, 14;
    // Sint-Truiden 2013, 15; Zulte Waregem 2012, 17). Misma compuerta: sin importes del año anterior. Los importes van tal cual (sin
    // prorratear: el fútbol arranca con la temporada; Anderlecht 2011 vendió 39,1 M y 2012, de 12 meses, 67,9 M).
    let primero = null;
    // también de 12 meses redondeados cuando el período no es anual (Lierse SK 2019: 09-07-2018 a 30-06-2019, 11,7 meses): la
    // compuerta es la misma (sin importes del año anterior); un período 'anual' no entra acá.
    if (per.tipo !== 'anual' && per.meses && e.md) {
      const fp = resolve(ROOT, derivado(e.md, '.filas.json', { crear: false }));
      const fs = existsSync(fp) ? (JSON.parse(readFileSync(fp, 'utf8')).filas || []) : [];
      if (fs.length && fs.every((x) => x.anterior == null || String(x.anterior).trim() === '' || parseNumber(x.anterior) === 0)) primero = { meses: per.meses, inicio: per.inicio || null, cierre: per.cierre || null };
    }
    // EJERCICIO DE TRANSICIÓN POR CAMBIO DE CIERRE. Cuando el club
    // pasa el cierre de julio a junio, el ejercicio de 11 meses contiene la temporada entera y no hay otro tramo que buscar. UNA compuerta, la
    // "cadena de cierres" con los otros documentos del club (registro): el cierre anterior + los meses del período = este cierre, Y el
    // siguiente cierra 12 meses después (se comparan año y mes). Benfica 2007-08: 2007-07-31 + 11 = 2008-06; el siguiente, 2009-06. Un
    // semestral no pasa (el siguiente cierra 6 meses después) y un tramo suelto tampoco (no encadena). Se carga con nota pública, como el
    // primer ejercicio.
    let transicion = null;
    // (votación 2 a 1: Admin/CONVENCIONES-DATOS.md) También el ejercicio de MÁS de 12 meses por cambio de cierre, que trae
    // importes del año anterior (no es un primer ejercicio): se carga como el año del cierre, sin tope de meses. UNA compuerta, la contigüidad
    // con el anterior: el cierre anterior + los meses del período = este cierre. El "siguiente cierra 12 meses después" es solo para los de
    // menos de 12 (descarta el semestral); un período largo no tiene ese riesgo. Casos: Westerlo 2015 (18 meses), Aston Villa 2023-24 (13).
    if (!primero && per.tipo !== 'anual' && per.meses && per.meses !== 12 && per.cierre) {
      const ym = (f, d) => { const [y, m] = String(f).split('-').map(Number); const t = y * 12 + (m - 1) + d; return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, '0')}`; };
      const cierres = registro.filter((x) => x.pdf !== pdf && dirname(x.pdf) === dirname(pdf) && x.periodo?.tipo === 'anual' && x.periodo?.cierre).map((x) => ({ pdf: x.pdf, ym: String(x.periodo.cierre).slice(0, 7), cierre: x.periodo.cierre }));
      const ant = cierres.find((c) => c.ym === ym(per.cierre, -per.meses)); const sig = cierres.find((c) => c.ym === ym(per.cierre, 12));
      const diaDespues = (f) => { const d = new Date(`${f}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); };
      // TRAMO CORTO DE TRANSICIÓN SIN HUECO (votación 2 a 1 y Guido: C, Admin/CONVENCIONES-DATOS.md). Para uno de menos de 12 meses, además de
      // (a) el anterior termina donde empieza el tramo y (b) el siguiente cierra 12 meses después, (c) ningún anual conocido lo contiene: un cierre
      // anual estrictamente entre el del anterior y el del siguiente se superpone con el tramo (un semestral dentro de un ejercicio cuyo anual
      // existe: Juve Stabia, Estrela da Amadora). Pasa: se carga como el año del cierre con `periodMonths` y su nota. No pasa: es parcial y se
      // registra solo en documentos-parciales.txt con lo que falta (abajo), sin caso en la cola. Casos: Fiorentina 2020 y Genoa 2024 (pasan), Parma 2020 (falla a).
      // (otro documento del MISMO cierre, una memoria o el consolidado del mismo ejercicio, no cuenta: es este ejercicio, no uno que lo contenga)
      const contiene = per.meses < 12 ? cierres.filter((c) => c.ym > ym(per.cierre, -per.meses) && c.ym < ym(per.cierre, 12) && c.ym !== String(per.cierre).slice(0, 7)) : [];
      if (ant && (sig || per.meses > 12) && !contiene.length) transicion = { meses: per.meses, inicio: per.inicio || diaDespues(ant.cierre), cierre: per.cierre, anterior: ant.cierre, siguiente: sig?.cierre || null };
      else if (per.meses < 12) P.tramoFalta = [!ant && `el ejercicio anterior, con cierre en ${ym(per.cierre, -per.meses)}`, !sig && `el siguiente, con cierre en ${ym(per.cierre, 12)}`, contiene.length && `que ningún anual lo contenga (lo contiene ${contiene.map((c) => basename(c.pdf)).join(', ')})`].filter(Boolean);
    }
    if (transicion) { P.transicion = transicion; P.avisos.push(`ejercicio de transición por cambio de cierre (${per.meses} meses al ${per.cierre}): encadena con el cierre anterior ${transicion.anterior}${transicion.siguiente ? ` y el siguiente ${transicion.siguiente}` : ''}; se carga como el año, con nota pública (to-do 237 ab)`); }
    else if (primero) { P.primerEjercicio = primero; P.avisos.push(`primer ejercicio de la sociedad (${per.meses} meses${per.inicio ? `, desde ${per.inicio}` : ''}): la columna del año anterior no tiene importes; se carga como el año, con nota pública`); }
    else if (P.tramoFalta) {
      const linea = `${pdf} # cubre ${per.inicio || '?'} a ${per.cierre} (${per.meses} meses) # falta: ${P.tramoFalta.join('; ')} # cargar.mjs, ${HOY}; tramo corto que no encadena (CONVENCIONES-DATOS, tramo corto)`;
      const fp = resolve(ROOT, 'Admin', 'registros', 'documentos-parciales.txt');
      const ya = existsSync(fp) && readFileSync(fp, 'utf8').split('\n').some((l) => l.replace(/\s+#.*$/, '').trim() === pdf);
      // también en el ensayo (sin --escribir): cargar-lote.mjs ensaya primero y un documento frenado no llega a --escribir. Es idempotente (una línea por documento).
      if (!ya) appendFileSync(fp, linea + '\n');
      frena('periodo', `tramo corto de ${per.meses} meses al ${per.cierre} que no encadena sin hueco: falta ${P.tramoFalta.join('; ')}. Es parcial: ${ya ? 'ya estaba' : 'quedó registrado'} en Admin/registros/documentos-parciales.txt (sin caso en la cola)`);
    }
    else if (per.tipo !== 'anual') frena('periodo',`el documento cubre un período ${per.tipo}${per.meses ? ` de ${per.meses} meses` : ''}${per.cierre ? ` al ${per.cierre}` : ''}: no se carga como ejercicio (juntarlo con los otros períodos: node tools/periodo.mjs --grupos)`);
    if (per.nombreNoCoincide) frena('periodo', `el nombre del archivo dice otro cierre que el contenido (${per.cierre || '?'}): confirmar qué ejercicio es antes de cargarlo`);
  }
  if (!e.md || !existsSync(resolve(ROOT, e.md))) { return corta('registro', 'no hay .md en disco'); }
  const mdAbs = resolve(ROOT, e.md);
  const catPath = resolve(ROOT, derivado(e.md, '.categorias.json', { crear: false }));
  const AVISO_SIN_CAT = 'sin .categorias.json (año cargado a mano): cada fila sale de la escalera de categorías; una fila sin categoría frena igual';
  if (!existsSync(catPath)) { if (P.reemplaza) P.avisos.push(AVISO_SIN_CAT); else { frena('categorizacion', 'no hay .categorias.json (etapa 5 del pipeline: jev-categorizar.mjs + categorizar-claude.mjs --listos)'); frenosSinReemplazo.push(P.frena.at(-1)); } }
  else if (!categoriasAlDia(mdAbs)) frena('categorizacion', 'el .categorias.json NO está al día con su .rubros.json / .jev.json (huellas, tools/huellas.mjs): hay que volver a correr la etapa 5');
  return { e, reemplaza, frenosSinReemplazo, per, mdAbs, catPath, AVISO_SIN_CAT };
}

// 2. Club (o club provisional del alta), deporte, año, perímetro y moneda; los frenos que salen del alta.
export function faseClubYAnio(ctx) {
  const { pdf, sitio, e, corta, frena, P, per, registro, frenosSinReemplazo, catPath, AVISO_SIN_CAT, reemplaza, agregarCaso } = ctx;
  const cr = clubDeRuta(pdf);
  const MSG_ALTA = 'el club no existe en el sitio: es un alta (tools/alta-club.mjs), fuera del alcance de esta etapa';
  // CLUB NUEVO EN EL ENSAYO: antes se cortaba acá y el ensayo de cargar-lote.mjs contaba el año como "se escribiría con alta"
  // sin haber mirado ningún freno de abajo (categorías en la cola, perfil, tie-outs, fx, fuente). Caso: lote 67 (Grecia), el ensayo prometía
  // 21 años y --escribir no escribió ninguno (alta hecha y revertida 5 veces). Ahora, SOLO sin --escribir y con la ficha del alta completa
  // (id, país, moneda e inicio del ejercicio sin preguntas, de analizar()), se anota el freno `club` y se sigue con un CLUB PROVISIONAL
  // armado de esa ficha, sin ejercicios cargados: los frenos de abajo se evalúan igual que para un club existente. Con --escribir nunca se
  // usa (sigue cortando): lo que se escribe no cambia. Una carpeta ambigua o una ficha con preguntas cortan como siempre.
  let provisional = null;
  if (!cr.clubId) {
    if (cr.via === 'ambigua') return corta('club', `la carpeta es ambigua (${cr.fuente})`);
    if (ESCRIBIR) return corta('club', MSG_ALTA);
    const a0 = analizar(pdf, sitio);
    const v = (n) => a0.campos.find((c) => c.campo === n) || {};
    const faltan = ['id', 'country', 'reportingCurrency', 'fiscalYearStart', 'sport'].filter((n) => v(n).estado === 'pregunta' || v(n).valor == null);
    if (a0.error || faltan.length) return corta('club', `${MSG_ALTA}${a0.error ? ` (${a0.error})` : `; la ficha del alta tiene preguntas en ${faltan.join(', ')}`}`);
    frena('club', `${MSG_ALTA}; el resto se evaluó con un club provisional armado de la ficha del alta (${v('id').valor})`);
    provisional = {
      id: v('id').valor,
      club: { id: v('id').valor, name: v('name').valor, displayName: v('displayName').valor, country: v('country').valor,
        reportingCurrency: v('reportingCurrency').valor, fiscalYearStart: v('fiscalYearStart').valor, sport: v('sport').valor },
      cd: { fiscalYearMeta: {}, revenueLinesByYear: {}, expenseLinesByYear: {} },
    };
  }
  const clubId = cr.clubId || provisional.id; P.clubId = clubId;
  const club = provisional ? provisional.club : sitio.clubs[clubId]; const cd = provisional ? provisional.cd : sitio.generic[clubId];
  if (!club || !cd) { return corta('club', `${clubId} no tiene ${rutaData(clubId)} registrado en CLUB_GENERIC_DATA`); }
  // las categorías válidas son las del deporte del club (SPORT_TAXONOMIES de data/category-map.js); sin deporte o sin taxonomía no se categoriza
  const TX = club.sport ? categoriasDeDeporte(club.sport) : null;
  if (!TX) { return corta('deporte', club.sport ? `el deporte «${club.sport}» de ${clubId} no tiene taxonomía en data/category-map.js (SPORT_TAXONOMIES)` : `${clubId} no declara deporte (sport en data/clubs.js)`); }
  const ladoDeCat = (c) => (TX.revenue.has(c) ? 'revenue' : TX.expense.has(c) ? 'expense' : null);
  // lo que no debería dar 0, y las preguntas de perfil, son los del deporte del club (CEROS_POR_DEPORTE: una sola tabla; [] = ninguno, a propósito)
  const CEROS = cerosDeDeporte(club.sport);
  if (!CEROS) { return corta('deporte', `el deporte «${club.sport}» no tiene clave en CEROS_POR_DEPORTE (tools/deporte-club.mjs): una tabla vacía ([]) o con lo que no puede dar 0`); }
  const alta = analizar(pdf, sitio);
  if (alta.error) { return corta('alta', alta.error); }
  const campo = (n) => alta.ejercicio.campos.find((c) => c.campo === n) || {};
  if (!alta.ejercicio.cierre && per?.cierreDeducido) alta.ejercicio.cierre = per.cierre; // fecha deducida de los vecinos (arriba)
  const year = alta.ejercicio.anio ?? (per?.cierreDeducido ? Number(per.cierre.slice(0, 4)) : null); P.year = year;
  const q = quien(pdf);
  if (q.year && Number(q.year) !== Number(year)) frena('año', `alta-club.mjs dice ejercicio ${year} y quien.mjs --quien (el que usa el registro) dice ${q.year}`);
  if (q.clubId && !q.clubDeCarpeta && q.clubId !== clubId) frena('club', // clubDeCarpeta: sin cita, el id de quien es el nombre de la carpeta
    `carpetas-clubes.mjs dice ${clubId} y quien.mjs --quien dice ${q.clubId}`);
  if (!year) { return corta('año', 'no se pudo determinar el año del ejercicio'); }
  // ¿ESTÁ CARGADO? Escalón 0: el registro (`cargado` de transcripciones-estado.jsonl). Escalón 1:
  // data/ (el repo local, no el sitio deployado) ya tiene el año. El registro queda viejo después de cargar hasta que alguien corre el
  // inventario: con --reemplazar frenaban 21 años griegos ya publicados ("ya tiene el ejercicio cargado").
  if ((cd.fiscalYearMeta || {})[year] && REEMPLAZAR && !P.reemplaza) {
    P.reemplaza = true; P.frena = P.frena.filter((f) => !frenosSinReemplazo.includes(f));
    P.avisos.push('--reemplazar: el registro no lo daba por cargado, pero data/ tiene el año (registro desactualizado: tools/inventario-transcripciones.mjs)');
    if (!existsSync(catPath)) P.avisos.push(AVISO_SIN_CAT);
  }
  if ((cd.fiscalYearMeta || {})[year]) { if (P.reemplaza) P.avisos.push(`${clubId} ${year} ya cargado: se reemplaza`); else frena('año', `${clubId} ya tiene el ejercicio ${year} cargado`); }
  // ajuste manual `no-recargar`: lo publicado de ese año no lo reproduce una corrida nueva y es mejor que ella (Lazio 2012-13, Roma 2021: el
  // desglose de las notas en miles, que el script no abre). `--reemplazar` frena; para recargar de verdad hay que anular el ajuste a conciencia.
  { const nr = ajusteDe(pdf, 'no-recargar'); if (nr && (cd.fiscalYearMeta || {})[year]) frena('no-recargar', `ajuste manual no-recargar (${nr.fecha}): ${nr.motivo}`); }
  for (const n of ['anio', 'cierre', 'currency', 'reportType', 'fx']) { const c = campo(n); if (c.estado === 'pregunta') frena(`alta:${n}`, c.pregunta); }
  if (campo('reportType').valor && campo('reportType').valor !== 'official_balance_sheet') frena('alta:reportType', `reportType ${campo('reportType').valor}: esta etapa solo carga balances anuales`);
  // perímetro
  const perC = campo('perimetro'); const her = perimetroHeredado(sitio, clubId);
  let perimetro = perC.valor;
  const ajPer = ajustePerimetroDe(pdf); // escalón 0: ajuste manual del documento o del club
  if (ajPer) { perimetro = ajPer.valor; P.avisos.push(`perímetro: ${perimetro} (ajuste manual ${ajPer.pdf.endsWith('/') ? 'del club' : 'del documento'}, ${ajPer.fecha}: ${ajPer.motivo})`); }
  else if (perC.estado === 'pregunta') {
    // Qué dice el documento, según la pregunta del alta: solo el grupo consolidado, consolidado + individual, o dos entidades en la carpeta.
    const docTipo = perC.dosEntidades ? 'dos-entidades' : /solo del GRUPO/.test(perC.pregunta || '') ? 'consolidado' : /CONSOLIDADOS y también individuales/.test(perC.pregunta || '') ? 'ambos' : '?';
    const listaAnios = Object.entries(her.porAnio).map(([y, v]) => `${y} ${v}`).join(', ') || 'ninguno';
    // Se hereda SOLO el consolidado: si el club siempre se cargó consolidado y el documento trae el consolidado (solo o junto al
    // individual), es el mismo perímetro. Heredar "individual" de un documento que trae los dos no alcanza: la selección de filas no sabe
    // elegir las columnas individuales (Bayern cargaba las dos, ver Admin/mediciones/test-eleccion-tabla.md).
    const cerc = perimetroCercano(her, year);
    if (cerc?.perimetro === 'consolidado' && (docTipo === 'consolidado' || docTipo === 'ambos')) { perimetro = 'consolidado'; P.avisos.push(`perímetro heredado del año cargado más cercano (${cerc.anio}, consolidado); el documento trae el consolidado${docTipo === 'ambos' ? ' (y también el individual: revisar que no se hayan cargado filas de los dos)' : ''}. Años cargados: ${listaAnios}`); }
    else {
      // No se puede heredar: a la cola como pregunta de sí o no (antes frenaba sin pasar por la cola). La respuesta de Guido gana.
      const prop = cerc?.perimetro && cerc.perimetro !== '' ? cerc.perimetro : 'consolidado';
      const { caso: cq, resp } = casoYRespuesta(pdf, 'cargar', 'perimetro', String(year));
      if (resp && cq && (resp.decision === 'aceptar' || (resp.decision === 'corregir' && resp.valor))) { perimetro = resp.decision === 'aceptar' ? cq.perimetroPropuesto : String(resp.valor).trim(); P.avisos.push(`perímetro: ${perimetro} (respuesta de Guido en la cola)`); }
      else {
        agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'perimetro', detalle: String(year), perimetroPropuesto: prop,
          que: `¿${year} se carga ${prop.toUpperCase()}${cerc ? `, como ${cerc.anio} (el año cargado más cercano)` : ''}?  (por qué: ${perC.pregunta?.slice(0, 220)} Documento: ${docTipo}; años cargados: ${listaAnios})`,
          propuesta: `sí (responder aceptar; si no, corregir --valor individual|consolidado)` });
        frena('perimetro-en-cola', `el perímetro espera respuesta en la cola humana (node tools/cola.mjs); propuesta: ${prop}`);
      }
    }
  }
  if (club.fiscalYearStart && alta.ejercicio.cierre) {
    const mm = Number(alta.ejercicio.cierre.slice(5, 7)); const fys = `${String(mm === 12 ? 1 : mm + 1).padStart(2, '0')}-01`;
    if (fys !== club.fiscalYearStart) P.avisos.push(`el documento cierra ${alta.ejercicio.cierre} (ejercicio desde el ${fys}) y data/clubs.js dice fiscalYearStart ${club.fiscalYearStart}: ¿cambió el cierre del club?`);
  }
  const moneda = campo('currency').valor;
  if (moneda && club.reportingCurrency && moneda !== club.reportingCurrency && ajusteDe(pdf, 'moneda')?.valor !== moneda) frena('moneda', `el ejercicio saldría en ${moneda} y el club reporta en ${club.reportingCurrency}`);
  const prevMonedas = new Set(Object.values(cd.fiscalYearMeta || {}).map((m) => m.currency).filter(Boolean));
  if (moneda && prevMonedas.size && !prevMonedas.has(moneda)) P.avisos.push(`los años cargados del club están en ${[...prevMonedas].join('/')} y este en ${moneda}`);
  return { clubId, club, cd, ladoDeCat, CEROS, alta, campo, year, perimetro, ajPer, moneda };
}

// 3. Las filas y los montos que dejó la verificación (con la suma de dos entidades si hay ajuste).
export function faseFilas(ctx) {
  const { e, corta, pdf, P } = ctx;
  let sf; let notasVerif = []; let ingresosVerif = null; // lo que la verificación dice del estado, para el paso 6b
  {
    const pv = resolve(ROOT, derivado(e.md, '.verificacion.json', { crear: false }));
    if (!existsSync(pv)) { return corta('filas', 'no hay .verificacion.json (correr tools/lote.mjs o verificar.mjs)'); }
    let VV = JSON.parse(readFileSync(pv, 'utf8'));
    // UN EJERCICIO QUE SUMA DOS ENTIDADES: el ajuste `suma-con` junta este documento con el de la otra entidad (tools/suma-entidades.mjs).
    const ajSuma = ajusteDe(pdf, 'suma-con');
    if (ajSuma && VV.estado === 'ok') {
      const S = combinarEntidades(pdf, VV, ajSuma);
      if (S.error) return corta('filas', S.error);
      VV = S.V; P.suma = { nota: S.nota, otra: S.otra.pdf, transferencia: S.T, categorias: S.otra.categorias }; P.avisos.push(`suma de dos entidades: ${S.otra.pdf.split('/').pop()} se suma a este documento; transferencia ${S.T} fuera de ingresos y gastos`);
    }
    notasVerif = VV.notas || []; ingresosVerif = VV.totales?.ingresos ?? null;
    // AVISO, no freno: el caché lo hizo otra versión de verificar.mjs (o de sus reglas). Correr tools/verificar.mjs sobre este PDF (gratis) antes de cargar.
    if (VV.scriptHuella && VV.scriptHuella !== huellaVerificar()) P.avisos.push(`caché viejo: el .verificacion.json es de otra versión de verificar.mjs (sello ${VV.scriptHuella}, hoy ${huellaVerificar()}); correr node tools/verificar.mjs "${pdf}" --rubros (gratis) por si hoy da otra cosa (to-do 298 a3)`);
    if (VV.estado !== 'ok') { return corta('filas', `la verificación tiene ${VV.cola.length} caso(s) pendientes en la cola humana (node tools/cola.mjs)`); }
    P.ajustes = VV.ajustes || null; // ajustes manuales que aplicó verificar.mjs: se escriben como comentario en la meta del año
    // Formato de cada fila: {label, page, section, native, tside, origen}. Ingresos y gastos en positivo (los signos los decide
    // el paso 5 de abajo); financiero e impuesto con su signo impreso y su destino ya decidido por extraer.mjs (no por palabras).
    const raw = [
      // signoFijo: el signo que ya decidió verificar.mjs (positivo = suma a su lado; negativo = lo reduce, como "Feriado Legal
      // −15.597" de UC 2020, una reversión de la provisión de vacaciones dentro de los gastos de administración). El paso 5 lo usa tal cual en
      // vez de adivinarlo por tabla: hasta la 337 se perdía y la fila quedaba sumando gasto (UC 2020 frenaba con 31.194 de diferencia).
      ...VV.lineas.map((l) => ({ label: l.etiqueta, page: l.pagina, section: l.origen, native: Math.abs(l.M), signoFijo: l.M, tside: l.lado === 'ingreso' ? 'revenue' : 'expense', origen: `verificacion (${l.origen})`, ...(l.categoria ? { catAjuste: l.categoria } : {}) })),
      // la cobertura de pérdidas del holding no es interés neto: va como una ganancia dentro de los gastos, categoría exceptional_items (fuera del total de gastos
      // que se compara con el impreso, dentro del resultado), igual que la venta del 20% de Goiás 2023. signoFijo negativo = reduce el gasto.
      // (Auditora 5, Girona 2021-23) un ajuste `fila` del lado financiero con destino profit_on_player_sales («Resultados por enajenaciones», rubro 13 del PGC
      // español) va a profitOnPlayerSales: cuenta en el resultado como el financiero, pero no es interés neto ni una línea de ingreso o de gasto.
      ...VV.financiero.filter((l) => !COBERTURA_PERDIDAS_RE.test(String(l.etiqueta || ''))).map((l) => ({ label: l.etiqueta, page: null, section: 'financiero', native: l.M, tside: null, origen: 'verificacion', destinoForzado: l.destino === 'profit_on_player_sales' ? 'profitOnPlayerSales' : 'netInterest' })),
      ...VV.financiero.filter((l) => COBERTURA_PERDIDAS_RE.test(String(l.etiqueta || ''))).map((l) => ({ label: l.etiqueta, page: null, section: 'financiero', native: Math.abs(l.M), signoFijo: -l.M, tside: 'expense', origen: 'verificacion (cobertura de pérdidas)', catAjuste: 'exceptional_items' })),
      ...VV.impuesto.map((l) => ({ label: l.etiqueta, page: null, section: 'impuesto', native: l.M, tside: null, origen: 'verificacion', destinoForzado: 'tax' })),
    ];
    const totalCands = [VV.totales.ingresos ? { label: 'total de ingresos (verificado)', M: VV.totales.ingresos, page: null, how: 'etiqueta' } : null, VV.totales.gastos ? { label: 'total de gastos (verificado)', M: VV.totales.gastos, page: null, how: 'etiqueta' } : null].filter(Boolean);
    sf = { ok: true, raw, totalCands, docResult: VV.totales.resultadoParaCargar ?? VV.totales.resultadoImpreso, pts: null, extra: { notasUsadas: [] }, refM: null };
  }
  if (!sf.ok) { return corta('filas', sf.motivo); }
  P.seleccion = { filas: sf.raw.length, notasUsadas: sf.extra?.notasUsadas || [], refM: sf.refM };
  return { sf, notasVerif, ingresosVerif };
}

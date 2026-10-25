// ============================================================================
// tools/alta-club-analisis.mjs — los tramos de analizar(): año y cierre, moneda, deporte, campos del club, tipo de documento, perímetro, contexto y avisos
// Mudado de tools/alta-club.mjs sin cambiar una línea (salvo `export`); tools/alta-club.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, basename, extname, join } from 'node:path';
import { ajusteDe } from './ajustes.mjs';
import { derivado } from './rutas.mjs';
import { fechasFinDeMes, cierreDelTexto, cierreDelNombre, anioDelNombre, contar, menciones, decidirNombre } from './alta-club-lectura.mjs';
import { NOMBRE_PAIS_ES, MONEDAS, DEPORTES_OTROS, FUTBOL_RE, NO_BALANCE, INTERMEDIO_RE } from './alta-club-tablas.mjs';
import { candidatosColor } from './alta-club-escribir.mjs';
import { ANIO_FORZADO, norm, slug, rel, ultimoDia, pad2, bandera, campo } from './alta-club.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// Año y cierre del ejercicio (nombre del archivo, fechas del .md, los demás .md del club, patrón del país, respuesta de Claude por API).
export function cierreYAnio({ abs, r, md, mdPath, paisCarpeta, clubCarpeta, pais, sitio, ov }) {
  const nombreArchivo = basename(abs);
  // ESCALÓN 0: ajuste manual de Guido (tools/ajustes.mjs, campo `anio`) cuando el nombre del archivo dice mal el año.
  const ajAnio = r.pdf ? ajusteDe(r.pdf, 'anio') : null;
  const anioForzado = ANIO_FORZADO || (ajAnio ? Number(ajAnio.valor) : null);
  const anioNombre = anioForzado || anioDelNombre(nombreArchivo);
  const cierreTxt = cierreDelTexto(md);
  const cierreNom = cierreDelNombre(basename(abs, extname(abs)));
  let mesCierre = null; let fuenteCierre = null; let estadoCierre = 'ok'; let preguntaCierre = null;
  // Un estado INTERMEDIO (semestral al 30/6 de un club que cierra el 31/12: Palestino 2018) no dice
  // nada del cierre del ejercicio: en ese caso el mes sale de los demás documentos o del país.
  const nIntermedio = contar(norm(md.slice(0, 20000)), INTERMEDIO_RE);
  const esIntermedio = nIntermedio >= 2 || /semi-annual|semiannual|interim|intermedi|trimestr|quarter|ene-jun/.test(norm(nombreArchivo));
  if (esIntermedio) r.avisos.push(`El documento parece un estado INTERMEDIO (${nIntermedio} señales en el texto): su fecha no se usa para decidir el cierre del ejercicio del club.`);
  if (esIntermedio) { /* se decide abajo, con los demás .md del club o el patrón del país */ }
  else if (cierreNom && cierreTxt && cierreTxt.mes === cierreNom.mes) { mesCierre = cierreNom.mes; fuenteCierre = `nombre del archivo (${cierreNom.fecha}) y contenido del .md (${cierreTxt.n} de ${cierreTxt.total} fechas de fin de mes)`; }
  else if (cierreNom && (!cierreTxt || cierreTxt.share < 0.6)) { mesCierre = cierreNom.mes; fuenteCierre = `nombre del archivo (${cierreNom.fecha})`; }
  else if (cierreTxt && ((cierreTxt.n >= 3 && cierreTxt.share >= 0.6) || (cierreTxt.n >= 2 && cierreTxt.share === 1))) { mesCierre = cierreTxt.mes; fuenteCierre = `contenido del .md (${cierreTxt.n} de ${cierreTxt.total} fechas de fin de mes caen en el mes ${cierreTxt.mes})`; if (cierreNom && cierreNom.mes !== cierreTxt.mes) { estadoCierre = 'pregunta'; preguntaCierre = `El nombre del archivo dice cierre ${cierreNom.fecha}, pero el contenido cierra en el mes ${cierreTxt.mes}. ¿Cuál es el cierre de este ejercicio?`; } }

  // El resto de los .md del club, para ver si el cierre cambió en el tiempo.
  // Sin los documentos que están en documentos-descartados.txt o documentos-parciales.txt (la misma lista que saltea
  // lote.mjs y que `--todos` usa para `faltan-datos`): un documento descartado no es un hermano. Caso: Tondela 2021, el relatório del
  // Clube Desportivo de Tondela (asociación, descartado con ok de Guido) hacía preguntar "dos entidades" aunque el perímetro estuviera fijado.
  const dirClub = resolve(ROOT, 'Clubes', paisCarpeta, clubCarpeta);
  const fueraDeCargaHermanos = new Set(['Admin/registros/documentos-descartados.txt', 'Admin/registros/documentos-parciales.txt']
    .flatMap((f) => (existsSync(resolve(ROOT, f)) ? readFileSync(resolve(ROOT, f), 'utf8').split('\n') : []))
    .map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')).map((d) => d.replace(/\.(pdf|md)$/i, '')));
  const hermanos = [];
  (function walk(d) {
    for (const e of readdirSync(d)) {
      const f = join(d, e);
      if (statSync(f).isDirectory()) { walk(f); continue; }
      if (!/\.md$/i.test(e) || /\.(previo-[a-z]+|gemini-check|claude-check|mistral-redo|t-[a-z]+)\.md$/i.test(e) || /^readme/i.test(e)) continue;
      if (fueraDeCargaHermanos.has(rel(f).replace(/\.md$/i, ''))) continue;
      hermanos.push(f);
    }
  })(dirClub);
  r.mdsCarpeta = hermanos.map(rel).sort();
  const cierresClub = [];
  for (const h of hermanos) {
    if (NO_BALANCE.test(norm(basename(h)))) continue;
    const t = h === mdPath ? md : readFileSync(h, 'utf8');
    if (contar(norm(t.slice(0, 20000)), INTERMEDIO_RE) >= 2) continue;
    const c = cierreDelTexto(t); const cn = cierreDelNombre(basename(h, '.md'));
    const mes = cn ? cn.mes : (c && c.n >= 3 && c.share >= 0.6 ? c.mes : null);
    const anio = anioDelNombre(basename(h)) || (c && c.anio);
    if (mes && anio) cierresClub.push({ archivo: basename(h), mes, anio });
  }
  if (!mesCierre) {
    const porMes = {};
    for (const c of cierresClub) porMes[c.mes] = (porMes[c.mes] || 0) + 1;
    const orden = Object.entries(porMes).sort((a, b) => b[1] - a[1]);
    if (orden.length === 1 || (orden.length && orden[0][1] >= 0.8 * cierresClub.length && cierresClub.length >= 2)) {
      mesCierre = +orden[0][0]; fuenteCierre = `los demás .md del club (${orden[0][1]} de ${cierresClub.length} documentos cierran en el mes ${orden[0][0]}); este documento no alcanza solo`;
    }
  }
  let fuentePatronPais = null;
  if (!mesCierre && pais && pais.iso2) {
    const delPais = Object.values(sitio.clubs).filter((c) => c.country === pais.iso2).map((c) => c.fiscalYearStart);
    const unicos = [...new Set(delPais)];
    if (delPais.length >= 2 && unicos.length === 1) {
      const [mm] = unicos[0].split('-').map(Number);
      mesCierre = mm === 1 ? 12 : mm - 1;
      fuentePatronPais = `patrón del país: los ${delPais.length} clubes de ${pais.iso2} ya cargados arrancan el ${unicos[0]} (el documento no trae fechas de cierre legibles)`;
      fuenteCierre = fuentePatronPais;
    }
  }
  // El año de cierre del contenido, para confirmar el del nombre.
  let anio = anioNombre;
  let estadoAnio = 'ok'; let fuenteAnio = ANIO_FORZADO ? '--anio' : ajAnio ? `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${ajAnio.autor} ${ajAnio.fecha}): ${ajAnio.motivo}` : 'nombre del archivo (misma regla que onboard.mjs --quien)';
  let preguntaAnio = null;
  // Solo se contradice al nombre del archivo con evidencia FUERTE del contenido (3+ fechas de
  // cierre, 60%+ en el mismo mes): un balance que dice una sola vez "31 de dezembro de 2023 e
  // 2024" no alcanza para decir que el archivo está mal nombrado.
  const contenidoFuerte = cierreTxt && cierreTxt.n >= 3 && cierreTxt.share >= 0.6;
  if (cierreTxt && mesCierre && cierreTxt.mes === mesCierre && (contenidoFuerte || !anio)) {
    if (!anio) { anio = cierreTxt.anio; fuenteAnio = 'contenido del .md (año más nuevo con fecha de cierre)'; }
    else if (cierreTxt.anio === anio) fuenteAnio += ', confirmado por las fechas de cierre del .md';
    else if (!anioForzado) {
      const aniosTxt = Object.keys(cierreTxt.porMes).length ? fechasFinDeMes(md).filter((f) => f.mes === mesCierre).map((f) => f.anio) : [];
      // NOMBRE CON DOS AÑOS SEGUIDOS QUE BAJAN ("2017-2016"): es ambiguo.
      // En Goiás es "ejercicio 2017 con su comparativo 2016" (la regla del nombre da 2016, mal: 10 ajustes `anio`); en Suduva
      // "up2021-2020.12.31" es "subido en 2021, ejercicio 2020" (da 2020, bien). Decide el contenido: si el año de las fechas de cierre del
      // .md (con la misma evidencia fuerte de arriba) es uno de los dos del nombre, gana ese. Sin esa evidencia, la regla de siempre. Medido:
      // Goiás 11 de 11 (los 10 del ajuste más balanco-publicado-2024-2023); los demás PDFs no tienen ese patrón y no cambian.
      const par = nombreArchivo.match(/(?<!\d)((?:19|20)\d{2})[-_]((?:19|20)\d{2})(?!\d)/);
      if (par && +par[2] === +par[1] - 1 && [+par[1], +par[2]].includes(anio) && [+par[1], +par[2]].includes(cierreTxt.anio)) { anio = cierreTxt.anio; fuenteAnio = `contenido del .md (el nombre "${par[0]}" es ambiguo; las fechas de cierre del documento son de ${cierreTxt.anio}, ${cierreTxt.n} de ${cierreTxt.total})`; }
      else if (aniosTxt.includes(anio)) fuenteAnio += `, presente en el .md (el año más citado con fecha de cierre es ${cierreTxt.anio})`;
      else { estadoAnio = 'pregunta'; preguntaAnio = `El nombre del archivo sugiere el ejercicio ${anio}, pero las fechas de cierre del documento son de ${cierreTxt.anio}. ¿Qué ejercicio es?`; }
    }
  }
  if (!anio) { estadoAnio = 'pregunta'; preguntaAnio = 'No se pudo determinar el año del ejercicio (ni por el nombre del archivo ni por el contenido). Pasar --anio.'; }
  if (ov.cierre) {
    // Claude leyó la fecha de cierre en el documento y el script verificó la cita: gana sobre el nombre
    // del archivo y sobre el conteo de fechas (que es justo lo que no alcanzó).
    const [yy, mm] = ov.cierre.valor.split('-').map(Number);
    anio = yy; mesCierre = mm; estadoAnio = 'ok'; preguntaAnio = null; estadoCierre = 'ok'; preguntaCierre = null;
    fuenteAnio = fuenteCierre = `${ov.cierre.manual ? '' : 'claude-api con cita verificada: '}${ov.cierre.fuente}`; fuentePatronPais = null;
  }
  const cierre = anio && mesCierre ? `${anio}-${pad2(mesCierre)}-${pad2(ultimoDia(anio, mesCierre))}` : null;
  const fiscalYearStart = mesCierre ? `${pad2(mesCierre === 12 ? 1 : mesCierre + 1)}-01` : null;
  return { nombreArchivo, cierreTxt, nIntermedio, esIntermedio, hermanos, cierresClub, fuentePatronPais, mesCierre, anio, estadoAnio, fuenteAnio, preguntaAnio, cierre, fiscalYearStart, estadoCierre, preguntaCierre, fuenteCierre };
}

// Moneda del ejercicio: la del país, o la pregunta si el documento dice otra o es anterior al cambio de moneda.
export function monedaDelEjercicio({ r, pais, paisCarpeta, anio, mdNorm }) {
  let moneda = pais ? pais.moneda : null;
  let legado = false; let estadoMoneda = 'ok'; let fuenteMoneda = pais ? `moneda de curso legal de ${paisCarpeta} (${pais.referencia ? 'tabla de referencia ISO, tools/paises-referencia.json' : 'tabla PAISES de alta-club.mjs'})` : null; let preguntaMoneda = null;
  if (!pais) { estadoMoneda = 'pregunta'; preguntaMoneda = `País "${paisCarpeta}" sin entrada en la tabla PAISES de tools/alta-club.mjs: ¿qué ISO2 y qué moneda?`; }
  else if (pais.preguntaMoneda) { estadoMoneda = 'pregunta'; preguntaMoneda = pais.preguntaMoneda; }
  else if (pais.legado && anio && anio < pais.legado.desde) {
    const nLeg = pais.legado.tokens.reduce((s, t) => s + contar(mdNorm, new RegExp(`(?<![a-z])${t.replace(/\./g, '\\.')}(?![a-z])`, 'g')), 0);
    const nAct = menciones(mdNorm, pais.moneda);
    if (nAct >= 5 && nAct > 3 * nLeg) { fuenteMoneda += `; ejercicio ${anio} anterior a ${pais.legado.desde}, pero el documento ya habla en ${pais.moneda} (${nAct} menciones contra ${nLeg} de ${pais.legado.codigo})`; }
    // DECISIÓN DE GUIDO: un ejercicio anterior al cambio de moneda, cuyo documento habla sobre todo en la moneda vieja, se carga en ella (el sitio la
    // convierte a USD con el tipo de cambio de su cierre y muestra USD por defecto); no se convierte a la moneda nueva ni se pregunta.
    else if (nLeg >= 5 && nLeg > nAct) { moneda = pais.legado.codigo; legado = true; fuenteMoneda = `moneda legado de ${paisCarpeta}: ejercicio ${anio} anterior a ${pais.legado.desde} y el documento habla en ${pais.legado.codigo} (${nLeg} menciones contra ${nAct} de ${pais.moneda}); se carga en ${pais.legado.codigo} con su tipo de cambio a USD del cierre (decisión de Guido)`; }
    else { estadoMoneda = 'pregunta'; moneda = pais.legado.codigo; preguntaMoneda = `El ejercicio ${anio} es anterior a ${pais.legado.desde}: el documento puede estar en ${pais.legado.codigo} (${nLeg} menciones de la moneda vieja, ${nAct} de ${pais.moneda}). El sitio no tiene ninguna moneda "legado" cargada: ¿se carga en ${pais.legado.codigo} (con su fx a USD de ese cierre) o se convierte a ${pais.moneda} a la paridad fija?`; }
  } else if (moneda && moneda !== 'USD') {
    const nPropia = menciones(mdNorm, moneda);
    const otras = Object.keys(MONEDAS).filter((c) => c !== moneda && c !== 'USD' && !MONEDAS[c].tokens.includes('\\$')).map((c) => [c, menciones(mdNorm, c)]).sort((a, b) => b[1] - a[1]);
    if (nPropia === 0 && otras[0] && otras[0][1] >= 10) { estadoMoneda = 'pregunta'; preguntaMoneda = `El documento no nombra nunca ${moneda} y nombra ${otras[0][0]} ${otras[0][1]} veces: ¿en qué moneda está?`; }
    else if (nPropia === 0) r.avisos.push(`El documento no nombra la moneda (${moneda}) en ningún lado reconocible: se asume la del país.`);
  }
  return { moneda, estadoMoneda, fuenteMoneda, preguntaMoneda, legado };
}

// Deporte según cuántas veces nombra el .md cada uno.
export function deporteDelTexto({ mdNorm, clubCarpeta, ov }) {
  // "football" en inglés también es el de la NFL ("National Football League"), y "cricket" aparece
  // en el nombre legal del Genoa ("Genoa Cricket and Football Club"): esas frases no cuentan para
  // ningún lado.
  // Tampoco cuenta "Football Club": los clubes de rugby ingleses se llaman así ("Harlequin Football
  // Club Limited", "Leicester Football Club plc") — bug real de la primera versión.
  const nAmbiguo = contar(mdNorm, /national football league|american football|football club/g);
  const nGenoa = contar(mdNorm, /cricket\s*(and|&|e)\s*football/g);
  const nFutbol = contar(mdNorm, FUTBOL_RE) - nAmbiguo - nGenoa + contar(norm(clubCarpeta), FUTBOL_RE);
  const otros = Object.entries(DEPORTES_OTROS).map(([k, re]) => [k, contar(mdNorm, re) - (k === 'cricket' ? nGenoa : 0) + 3 * contar(norm(clubCarpeta), re)]).sort((a, b) => b[1] - a[1]);
  let deporte = otros[0][1] >= 3 && otros[0][1] >= nFutbol ? otros[0][0] : 'futbol';
  const fuenteDeporteClaude = ov.sport && ov.sport.valor === 'futbol' && deporte !== 'futbol' ? `claude-api con cita verificada: ${ov.sport.fuente}` : null;
  if (fuenteDeporteClaude) deporte = 'futbol';
  return { nFutbol, otros, deporte, fuenteDeporteClaude };
}

// Los campos de un club NUEVO (id, nombre, país, moneda, inicio del ejercicio, deporte, color); los agrega a r.campos.
export function camposDelClub({ r, md, pais, paisCarpeta, clubCarpeta, sitio, ov, cierresClub, fiscalYearStart, estadoCierre, preguntaCierre, fuenteCierre, fuentePatronPais, cierreTxt, deporte, nFutbol, otros, fuenteDeporteClaude }) {
  if (!r.club.existe) {
    const displayName = clubCarpeta.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
    if (displayName !== clubCarpeta) r.avisos.push(`La carpeta "${clubCarpeta}" tiene un paréntesis: se usó "${displayName}" como nombre corto.`);
    // id
    const base = slug(displayName);
    const iso = pais && pais.iso2 ? pais.iso2.toLowerCase() : 'xx';
    const id = `${base}-${iso}`;
    if (!pais || !pais.iso2) r.campos.push(campo('id', id, 'slug del nombre de la carpeta + país', 'pregunta', { pregunta: pais && pais.pregunta ? pais.pregunta : `País "${paisCarpeta}" sin ISO2: ¿qué sufijo lleva el id?` }));
    else if (sitio.clubs[id]) r.campos.push(campo('id', id, 'slug del nombre de la carpeta + país', 'pregunta', { pregunta: `El id '${id}' ya existe en data/clubs.js (${sitio.clubs[id].name}) y ninguna señal dice que sea este club. ¿Es el mismo club (y la carpeta se llama distinto) o hace falta otro id?` }));
    else r.campos.push(campo('id', id, `slug de "${displayName}" + '-${iso}' (convención de clubId, Admin/CONVENCIONES.md Versión 129)`));
    // name
    r.campos.push(decidirNombre(md, displayName, r.carpeta, r.pdf, { ov }));
    r.campos.push(campo('displayName', displayName, 'nombre de la carpeta del club en Clubes/'));
    r.campos.push(campo('country', pais ? pais.iso2 : null, pais ? `carpeta de país "${paisCarpeta}" (${pais.referencia ? 'tabla de referencia ISO, tools/paises-referencia.json' : 'tabla PAISES'})` : null, pais && pais.iso2 ? 'ok' : 'pregunta', pais && pais.iso2 ? {} : { pregunta: pais && pais.pregunta ? pais.pregunta : `País "${paisCarpeta}" sin entrada en la tabla PAISES.` }));
    // reportingCurrency: la de HOY del país (el ejercicio puede tener otra, ver ejercicio.currency)
    const repCur = pais ? pais.moneda : null;
    r.campos.push(campo('reportingCurrency', repCur, pais ? `moneda de curso legal de ${paisCarpeta}` : null, repCur ? 'ok' : 'pregunta', repCur ? {} : { pregunta: (pais && pais.preguntaMoneda) || `¿En qué moneda reporta el club?` }));
    // fiscalYearStart
    const cambios = [...new Set(cierresClub.map((c) => c.mes))];
    if (fiscalYearStart) {
      let valor = fiscalYearStart; let fuente = `cierre del ejercicio: ${fuenteCierre}`; let estado = estadoCierre === 'pregunta' ? 'pregunta' : 'ok'; const extra = {};
      if (estadoCierre === 'pregunta') extra.pregunta = preguntaCierre;
      if (cambios.length > 1) {
        const masReciente = cierresClub.slice().sort((a, b) => b.anio - a.anio)[0];
        const detalle = cambios.map((m) => `mes ${m}: ${cierresClub.filter((c) => c.mes === m).map((c) => c.anio).sort().join(',')}`).join(' / ');
        valor = `${pad2(masReciente.mes === 12 ? 1 : masReciente.mes + 1)}-01`;
        fuente = `el documento más reciente del club (${masReciente.archivo}, cierre mes ${masReciente.mes}): el cierre CAMBIÓ en el tiempo (${detalle}); clubs.js lleva el vigente, criterio de Racing (31/8 hasta 2021, 30/6 después)`;
        r.avisos.push(`El cierre del ejercicio cambió en el tiempo (${detalle}). Los ejercicios con el cierre viejo necesitan su propio fx a SU fecha de cierre.`);
      }
      if (fuentePatronPais && estado === 'ok') extra.nota = 'sale del patrón del país, no del documento';
      r.campos.push(campo('fiscalYearStart', valor, fuente, estado, extra));
    } else {
      r.campos.push(campo('fiscalYearStart', null, 'ni el documento, ni los demás .md del club, ni el patrón del país alcanzan', 'pregunta', { pregunta: `¿En qué fecha cierra el ejercicio de ${displayName}? El .md no trae fechas de cierre suficientes${cierreTxt ? ` (${cierreTxt.total} fecha(s) de fin de mes en todo el texto; la más frecuente, mes ${cierreTxt.mes}, ${cierreTxt.n} vez/veces)` : ' (ninguna fecha de fin de mes reconocible)'}, los demás documentos del club tampoco, y no hay clubes del país ya cargados de los que tomar el patrón.` }));
    }
    // sport
    if (deporte === 'futbol') r.campos.push(campo('sport', 'futbol', fuenteDeporteClaude || `el .md nombra el fútbol ${nFutbol} veces y ningún otro deporte más que eso`));
    else r.campos.push(campo('sport', deporte, `el .md nombra "${deporte}" ${otros[0][1]} veces y el fútbol ${nFutbol}`, 'pregunta', { pregunta: `El documento parece de ${deporte}, no de fútbol. El catálogo de data/leagues.js tiene ese deporte inactivo (o no lo tiene). ¿Se da de alta igual (y con qué liga), o queda fuera del sitio por ahora?` }));
    // brandColor: nunca lo decide el script
    const candidatos = candidatosColor(displayName);
    r.campos.push(campo('brandColor', undefined, candidatos.length ? `tools/brand-color-reference/ (footylogos): ${candidatos.map((c) => `[${c.liga}] ${c.name}: ${c.swatches.slice(0, 4).map((s) => s.hex + ' ' + s.label.replace(/ #.*/, '')).join(', ')}`).join(' | ')}` : 'la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)', 'pendiente', { nota: 'el campo queda AUSENTE (= nadie lo chequeó, P3 club-sin-color-ni-null). La decisión es identidad primero (¿de qué color es la camiseta?, Wikipedia del país) y hex después, club-or-year-onboarding/club-nuevo.md: no la toma un script. NUNCA escribir null sin haberlo mirado.' }));
  }
}

// Tipo de documento (estado contable, presupuesto, intermedio, informe sin tablas); agrega el campo reportType a E.
export function tipoDeDocumento({ r, md, mdNorm, nombreArchivo, esIntermedio, nIntermedio, ov, E }) {
  const nomNorm = norm(nombreArchivo);
  const STATEMENT = /resultado|recursos y gastos|income statement|profit and loss|profit or loss|comprehensive income|statement of operations|statement of financial position|conto economico|resultatregnskap|resultatopgorelse|resultatenrekening|winst-en-verliesrekening|compte de resultat|gewinn- ?und verlust|erfolgsrechnung|racun dobiti|dobiti i gubitka|demonstrac(ao|oes) d[oe]s? result|demonstracoes (financeiras|contabeis)|balanc[oe]s? patrimon|αποτελεσματ|gelir tablosu|kar veya zarar|finansal durum|vykaz zisku|vysledovka|rozvaha|финансовых результат|бухгалтерск\S* баланс|фінансові результати|фінансовии результат|фінансовии стан|сукупнии дохід|손익계산서|재무상태표|利润表|资产负债表|損益計算書|balance sheet|estado de situacion|estados? de resultados|stato patrimoniale|jahresabschluss|jaarrekening|jaarcijfers|aarsregnskap|arsregnskap|arsrapport|aarsrapport|bilancio|bilanco|financijsko izvjesce|financni izkaz/;
  const esPresupuesto = /presupuesto|orcamento|budget|previsional/.test(nomNorm);
  // Un informe de auditoría o una memoria NOMBRAN los estados contables sin traerlos: además de la
  // palabra, hacen falta filas con números: filas de tabla Markdown con 2+ celdas numéricas, o
  // (transcripciones viejas, sin tablas Markdown) líneas con 2+ montos con separador de miles.
  const lineasMd = md.split('\n');
  const filasPipe = lineasMd.filter((l) => l.trim().startsWith('|') && (l.match(/\|\s*\(?-?\s*\d[\d.,\s]*\)?\s*(?=\|)/g) || []).length >= 2).length;
  const filasMontos = lineasMd.filter((l) => (l.match(/(?<![\d.,])\(?-?\d{1,3}(?:[.,   ]\d{3})+(?:[.,]\d{1,2})?\)?(?![\d])/g) || []).length >= 2).length;
  const filasNumericas = Math.max(filasPipe, filasMontos);
  // ESCALÓN 1 del estado contable: un estado de resultados CORTO de una sola columna (un monto por fila) no llega a las 10 filas
  // con 2+ montos. Vale si la PRIMERA PÁGINA trae el título de un estado de resultados y un PERÍODO impreso de 12 meses ("01/01/2019 a
  // 31/12/2019"), con al menos 5 filas con un monto. Un informe del auditor nombra el estado pero no imprime ese encabezado de período.
  // Casos: Remo dre-2019/2023/2024 y Ferroviária 2013-b a 2018 (DRE del sistema contable), que preguntaban reportType y se fijaban a mano.
  const estadoCorto = (() => {
    if (filasNumericas >= 10) return false;
    const pag1 = md.split(/^--- pág\. 2 ---$/m)[0].replace(/<br\s*\/?>/gi, ' ');
    if (!/demonstra[cç][aã]o\s+d[oe]s?\s+resultados?|estado\s+de\s+resultados|income\s+statement|profit\s+and\s+loss|conto\s+economico/i.test(pag1)) return false;
    // el ejercicio anual: un período impreso de 12 meses, o el nombre del estado anual en portugués ("... do Exercício", Remo 2023 y 2024:
    // "Demonstração do Resultado do Exercício / Em 31 de Dezembro de 2023", sin período "de-a")
    const per = pag1.match(/(\d{2})\/(\d{2})\/(\d{4})\s*(?:a|até|al|to|-)\s*(\d{2})\/(\d{2})\/(\d{4})/i);
    const anual = (per && (Number(per[6]) - Number(per[3])) * 12 + Number(per[5]) - Number(per[2]) + 1 === 12) || /demonstra[cç][aã]o\s+do\s+resultado\s+do\s+exerc[ií]cio/i.test(pag1);
    const conMonto = lineasMd.filter((l) => /(?<![\d.,])\(?-?\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?\)?(?![\d])/.test(l)).length;
    return anual && conMonto >= 5;
  })();
  const tieneEstado = (STATEMENT.test(mdNorm) || STATEMENT.test(nomNorm)) && (filasNumericas >= 10 || estadoCorto);
  let reportType = 'official_balance_sheet'; let estadoRT = 'ok'; let fuenteRT = estadoCorto ? 'escalón 1: estado de resultados corto de una columna, con título y período de 12 meses en la primera página' : 'el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo'; let preguntaRT = null;
  if (esPresupuesto) { reportType = 'official_budget'; estadoRT = 'pregunta'; fuenteRT = 'nombre del archivo'; preguntaRT = 'El documento parece un PRESUPUESTO: se carga como official_budget y el tipo de cambio es la premisa del propio presupuesto (document_assumption), no un cierre. ¿Confirmar que es un presupuesto y cuál es su premisa de tipo de cambio?'; }
  else if (esIntermedio) { estadoRT = 'pregunta'; fuenteRT = `el documento parece un estado intermedio (${nIntermedio} señales en el texto: semestral, seis meses, interim...)`; preguntaRT = 'El documento parece un estado financiero INTERMEDIO, no el anual: el sitio carga ejercicios completos. ¿Es así (y hay que buscar el anual), o es el anual de un ejercicio corto?'; }
  else if (NO_BALANCE.test(nomNorm)) { estadoRT = 'pregunta'; fuenteRT = 'nombre del archivo'; preguntaRT = `El nombre del archivo ("${nombreArchivo}") sugiere que no es un estado contable anual (acta, informe intermedio, memoria, dictamen...). ¿Trae un estado de resultados anual cargable, o es un documento de contexto?`; }
  else if (!tieneEstado) { estadoRT = 'pregunta'; fuenteRT = filasNumericas < 10 ? `el .md casi no tiene tablas con números (${filasNumericas} filas numéricas): parece un informe/dictamen que nombra los estados sin traerlos` : 'el .md no tiene ninguna palabra de estado contable reconocible'; preguntaRT = '¿El documento trae un estado de resultados (o de recursos y gastos) anual cargable, o hay que buscar los estados en otro documento del club?'; }
  // ESCALÓN 2: la pregunta "¿trae un estado de resultados?" (no hay palabras de estado que reconozca
  // STATEMENT, o casi no hay tablas) la contesta la VERIFICACIÓN del propio documento: si cerró con el resultado impreso (etapa 6), el
  // documento trae un estado de resultados anual. Solo esa pregunta: presupuesto, intermedio y nombre de archivo siguen preguntando (un
  // intermedio también cierra). Casos: 59 ajustes `reportType` estonios (majandusaasta aruanne con tulemiaruanne, palabras que STATEMENT no
  // conoce), Go Ahead Eagles (Países Bajos).
  if (estadoRT === 'pregunta' && !esPresupuesto && !esIntermedio && !NO_BALANCE.test(nomNorm) && !tieneEstado && r.md) {
    const pv = resolve(ROOT, derivado(r.md, '.verificacion.json', { crear: false }));
    const V = existsSync(pv) ? (() => { try { return JSON.parse(readFileSync(pv, 'utf8')); } catch { return null; } })() : null;
    const res = (V?.chequeos || []).find((c) => c.nombre === 'resultado del ejercicio');
    if (res?.ok === true) { estadoRT = 'ok'; preguntaRT = null; fuenteRT = `escalón 2: la verificación del documento cerró con el resultado impreso (${String(res.detalle || '').slice(0, 120)})`; }
  }
  if (ov.reportType) { reportType = ov.reportType.valor; estadoRT = 'ok'; preguntaRT = null; fuenteRT = `${ov.reportType.manual ? '' : 'claude-api con cita verificada: '}${ov.reportType.fuente}`; }
  E.push(campo('reportType', reportType, fuenteRT, estadoRT, preguntaRT ? { pregunta: preguntaRT } : {}));
  return { reportType, nomNorm };
}

// Perímetro: qué entidad es «el club» (individual, consolidado, dos entidades en la carpeta); agrega el campo perimetro a E.
export function perimetroDelDocumento({ r, mdNorm, mdPath, hermanos, anio, nomNorm, nombreArchivo, ov, E }) {
  const CONSOL = /consolidad|consolidated|consolidato|geconsolideerd|konsolid|konzern|konsern|koncern|консолид|консолідов|ενοποιημεν|연결재무|合并|group accounts|consolide/g;
  const INDIV = /individual|separate financial statements|company only|standalone|stand-alone|enkelvoudig|selskapsregnskap|morselskap|einzelabschluss|η εταιρεια|bireysel|individuais|separado|별도재무|отдельн|bilancio d.esercizio|jahresabschluss der/g;
  const nCons = contar(mdNorm, CONSOL); const nInd = contar(mdNorm, INDIV);
  // Dos entidades distintas en la carpeta para el mismo año (por los nombres de archivo)
  const ENTIDAD_TOK = new Set(['fli', 'as', 'asa', 'invest', 'fotballinvest', 'holding', 'group', 'groupe', 'plc', 'saf', 'associacao', 'clube', 'sad', 'spa', 'idrettslag', 'fotballklubb', 'consolidato', 'consolidado', 'consolidated', 'individual', 'konzern', 'club']);
  const toks = (f) => new Set(norm(basename(f, '.md')).split(/[^a-z0-9]+/).filter((t) => t && !/^\d+$/.test(t)));
  const esteToks = toks(mdPath);
  const mismoAnio = hermanos.filter((h) => h !== mdPath && anioDelNombre(basename(h)) === anio);
  const otraEntidad = mismoAnio.find((h) => { const t = toks(h); const dif = [...t].filter((x) => !esteToks.has(x)).concat([...esteToks].filter((x) => !t.has(x))); return dif.some((x) => ENTIDAD_TOK.has(x)); });
  let estadoPer = 'ok'; let valorPer = 'individual'; let fuentePer = `el .md no presenta estados consolidados (${nCons} menciones de "consolidado")`; let preguntaPer = null;
  const sugerencia = 'Criterio usado hasta ahora (Boca, Racing, Panathinaikos): la entidad INDIVIDUAL del club, no el grupo, porque el consolidado puede sumar negocio de subsidiarias no futbolístico — pero hay excepciones (el fútbol en una subsidiaria, una SAD/SAF que es la que juega).';
  if (otraEntidad) {
    estadoPer = 'pregunta'; valorPer = null; fuentePer = `la carpeta tiene otro documento del mismo ejercicio de otra entidad: ${basename(otraEntidad)}`;
    preguntaPer = `En ${r.carpeta} hay documentos del ejercicio ${anio} de dos entidades distintas ("${basename(mdPath)}" y "${basename(otraEntidad)}"). ¿Cuál es "el club" para el sitio (asociación vs sociedad anónima, individual vs consolidado)? ${sugerencia}`;
  } else if (/individual|enkelvoudig|separate|individuais|einzel|standalone|company-only/.test(nomNorm)) {
    fuentePer = `el nombre del archivo dice que son los estados individuales ("${nombreArchivo}"), y no hay un consolidado del mismo ejercicio en la carpeta${nCons ? ` (el .md menciona el consolidado ${nCons} veces, como referencia)` : ''}`;
  } else if (nCons >= 3) {
    estadoPer = 'pregunta'; valorPer = null;
    fuentePer = `el .md menciona estados consolidados ${nCons} veces${nInd ? ` y los individuales ${nInd}` : ''}`;
    preguntaPer = nInd >= 2
      ? `El documento trae estados CONSOLIDADOS y también individuales/de la sociedad (${nCons} vs ${nInd} menciones). ¿Qué columna se carga? ${sugerencia}`
      : `El documento parece ser solo del GRUPO consolidado (${nCons} menciones, ninguna de estados individuales). ¿El grupo es "el club", o hay que buscar los estados individuales de la sociedad que juega? ${sugerencia}`;
  }
  // Con dos entidades en la carpeta el perímetro solo no alcanza (hay que elegir cuál es el club), salvo que el ajuste sea manual y el NOMBRE
  // de este documento diga ese mismo perímetro (Parma 2023: ajuste individual y "...-individual.pdf"; el "...-consolidato.pdf" del mismo
  // año sigue preguntando).
  const perDelNombre = /consolidat/.test(nomNorm) ? 'consolidado' : /individual|separat|einzel|enkelvoudig/.test(nomNorm) ? 'individual' : null;
  const ajusteCoincide = ov.perimetro?.manual && otraEntidad && perDelNombre === ov.perimetro.valor;
  if (ov.perimetro && (!otraEntidad || ajusteCoincide)) { valorPer = ov.perimetro.valor; estadoPer = 'ok'; preguntaPer = null; fuentePer = ov.perimetro.manual ? ov.perimetro.fuente : `claude-api con cita verificada: ${ov.perimetro.fuente}`; }
  E.push(campo('perimetro', valorPer, fuentePer, estadoPer, { ...(preguntaPer ? { pregunta: preguntaPer } : {}), ...(otraEntidad ? { dosEntidades: basename(otraEntidad) } : {}) }));
}

// Lo que el alta escribe aparte (país y moneda nuevos) y los cruces que no bloquean pero conviene ver.
export function contextoYAvisos({ r, E, pais, paisCarpeta, sitio, clubId, mesCierre, fuentePatronPais }) {
  // Contexto que el alta necesita escribir aparte (país/moneda nuevos)
  r.contexto = {
    paisNuevo: pais && pais.iso2 && !sitio.COUNTRIES[pais.iso2] ? { iso2: pais.iso2, name: NOMBRE_PAIS_ES[pais.iso2] || paisCarpeta, en: pais.en, flag: bandera(pais.iso2), region: pais.region } : null,
    monedaNueva: pais && pais.moneda && !sitio.CURRENCY_META[pais.moneda] && MONEDAS[pais.moneda] ? { codigo: pais.moneda, scale: MONEDAS[pais.moneda].scale, rango: MONEDAS[pais.moneda].rango } : null,
  };
  if (r.contexto.paisNuevo) r.avisos.push(`País nuevo para el sitio (${pais.iso2}): --escribir agrega su entrada en COUNTRIES (data/leagues.js) y su nombre en data/lang/en.js.`);
  if (r.contexto.monedaNueva) r.avisos.push(`Moneda nueva para el sitio (${pais.moneda}): --escribir agrega CURRENCY_META (scale ${MONEDAS[pais.moneda].scale}) y FX_PLAUSIBLE_RANGE [${MONEDAS[pais.moneda].rango.join(', ')}] en data/currency-map.js.`);

  // Cruces que no bloquean pero conviene ver.
  const perCampo = E.find((c) => c.campo === 'perimetro');
  const nameCampo = r.campos.find((c) => c.campo === 'name');
  if (perCampo && perCampo.estado === 'pregunta' && nameCampo) nameCampo.nota = `${nameCampo.nota ? nameCampo.nota + '. ' : ''}OJO: depende de la respuesta de perímetro (qué entidad es el club)`;
  if (mesCierre && pais && pais.iso2) {
    const fysPropio = `${pad2(mesCierre === 12 ? 1 : mesCierre + 1)}-01`;
    if (r.club.existe && sitio.clubs[clubId] && sitio.clubs[clubId].fiscalYearStart !== fysPropio) {
      r.avisos.push(`El documento cierra en el mes ${mesCierre} (ejercicio desde el ${fysPropio}) pero data/clubs.js dice fiscalYearStart '${sitio.clubs[clubId].fiscalYearStart}' para ${clubId}: o el cierre del club cambió (como Racing) o el documento no es lo que parece.`);
    }
    const delPais = [...new Set(Object.values(sitio.clubs).filter((c) => c.country === pais.iso2).map((c) => c.fiscalYearStart))];
    if (!r.club.existe && delPais.length === 1 && delPais[0] !== fysPropio && !fuentePatronPais) {
      r.avisos.push(`Todos los clubes de ${pais.iso2} ya cargados arrancan el ejercicio el ${delPais[0]} y este documento dice ${fysPropio}: no es un error necesariamente (Almagro, FC Midtjylland), pero vale mirarlo.`);
    }
  }
}

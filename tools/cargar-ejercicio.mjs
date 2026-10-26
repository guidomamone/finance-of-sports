// ============================================================================
// tools/cargar-ejercicio.mjs — las últimas fases de proponer(): totales y tie-out, la segunda lectura iXBRL, tipo de cambio, liga y el ejercicio que se escribiría
// Mudado de tools/cargar.mjs sin cambiar una línea (salvo `export`); tools/cargar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve, basename, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { cambioDeFormato, anioAnterior, textoSugerido } from './cambio-formato.js';
import { tipoSinDesglose, tipoConocido, aprender } from './tipo-sin-desglose.js';
import { leerEstadoNBB } from './nbb.mjs';
import { baseDeIngreso } from './ingreso-derivado.js';
import { leerResultadoIxbrl, chequearIxbrl, xhtmlDelMismoEmisor } from './ixbrl-resultado.mjs';
import { respuestaPorDetalle, respuestasDonde, ajusteDe, bolsonDeDeporte, TOTAL_RE, TOTAL_INGRESOS_RE, RESULTADO_EJERCICIO_RE, FINANCIERO_RE, HOY, norm, r6 } from './cargar.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const UMBRAL_JEV_TIPO = 0.8; // confianza mínima de Jev (la menor de 3 respuestas que coinciden) para clasificar solo el rótulo de una línea única: medido con rótulos de los tres tipos, los claros dan 0,85 o más y los ambiguos 0,4 a 0,79 (van a la cola)
const TOL = 0.01; // la de audit.js checkTieOuts(): |calculado - oficial| >= 0,01 es P0 `no-cierra`
const ANTES_IMPUESTOS_RE = /(before tax|before taxation|vor steuern|antes de(l)? impuesto|antes do imposto|antes dos impostos|antes de impuestos|for skat|foer skat|fore skatt|voor belasting|ante imposte|avant impot|до налогообложения|prije oporezivanja|pred zdanenim|vergi oncesi)/;
const PERDIDA_RE = /(loss|verlust|fehlbetrag|perdida|prejuizo|deficit|underskud|tap\b|verlies|perdita|gubitak|ztrata|убыток|збиток|zarar)/;

// 6a y 6b. El resultado impreso, los totales de ingresos y gastos y la fila de redondeo.
export function faseTotales(ctx) {
  const { rev, sf, suma, contra, club, filas, lecturasGasto, lecturasMeta, exp, metaFilas, ventaJugadoresFilas, P, frena, sitio, notasVerif, ingresosVerif, aceptable } = ctx;
  const revSum = rev.reduce((a, f) => a + f.amountNative, 0);
  const impresos = [];
  // Solo cuentan como "total impreso" los importes de tablas de ESTADO (título o lado de estado de resultados) y de las notas que abrió el
  // ancla: una coincidencia con un número de un cuadro de bienes de uso o del flujo de fondos sería casualidad, no un tie-out.
  const notasUsadas = new Set((sf.extra?.notasUsadas || []).map(String));
  for (const t of sf.pts || []) for (const r of t.nums || []) if (r.M !== null && r.M !== undefined && !t.noPL && (t.isStatement || t.primary || notasUsadas.has(String(t.idx)))) impresos.push({ label: r.label, M: r.M, page: t.page, tabla: t.idx, esSuma: t.sums?.has(r.i), esTotal: TOTAL_RE.test(norm(r.label)) });
  for (const c of sf.totalCands || []) impresos.push({ label: c.label, M: c.M, page: c.page, tabla: c.how, esSuma: c.how === 'suma', esTotal: true });
  const esTotalDe = (x) => x.esSuma || x.esTotal || TOTAL_INGRESOS_RE.test(norm(x.label));
  const unidadMax = Math.max(0, ...(sf.pts || []).map((t) => t.unit || 0));
  const buscar = (objetivo, n, filtro = esTotalDe) => {
    const cands = impresos.filter(filtro).map((x) => ({ ...x, d: Math.abs(Math.abs(x.M) - Math.abs(objetivo)) })).sort((a, b) => a.d - b.d);
    const exacto = cands.find((x) => x.d < TOL);
    const redondeo = !exacto ? cands.find((x) => x.d < Math.max(TOL, 0.0006 * Math.abs(objetivo), 0.5 * n * unidadMax)) : null;
    return { exacto, redondeo };
  };
  // 6a. RESULTADO DEL EJERCICIO primero: ingresos + gastos + netInterest + tax contra el resultado impreso. Es el chequeo más fuerte (un solo
  // número, club-data-mapping §6.2) y el que permite dar por verificado un total de ingresos o de gastos que el documento no imprime.
  const patImpresos = impresos.filter((x) => RESULTADO_EJERCICIO_RE.test(norm(x.label).replace(/^\**\s*(\(?[0-9]{1,2}[a-z]?[.)]|[a-z][.)]|[ivxl]{1,5}[.)]?\s*[-–.])\s*/, '')) && !ANTES_IMPUESTOS_RE.test(norm(x.label)));
  if (sf.docResult !== null && sf.docResult !== undefined) patImpresos.push({ label: 'resultado detectado por proponer-carga', M: sf.docResult, page: null });
  // `extra`: la suma de las filas de redondeo (decisión 3 de Guido, ver lado() más abajo); 0 en la primera búsqueda. `soloG`: fija la lectura
  // de signos de los gastos (la segunda búsqueda no puede cambiarla: las filas de redondeo se calcularon con la primera).
  const buscarPat = (extra = 0, soloG = null) => {
    let meta = null; let cierraPat = null; let lecturaGasto = soloG || lecturasGasto[0];
    busqueda: for (const G of soloG ? [soloG] : lecturasGasto) for (const L of lecturasMeta) {
      const expTodoG = exp.filter((f) => f.origen !== 'redondeo').reduce((a, f) => a + G.v(f), 0);
      const ni = metaFilas.filter((f) => f.destino === 'netInterest').reduce((a, f) => a + L.v(f), 0);
      const tx = metaFilas.filter((f) => f.destino === 'tax').reduce((a, f) => a + L.v(f), 0);
      const ps = ventaJugadoresFilas.reduce((a, f) => a + f.native, 0); // tal cual impreso, con su signo (+8,50 / −0,297)
      const pat = revSum + expTodoG + ni + tx + ps + extra;
      if (!meta) meta = { netInterest: r6(ni), tax: r6(tx), profitOnPlayerSales: r6(ps), pat: r6(pat) };
      for (const x of patImpresos) {
        const impreso = Math.abs(x.M - pat) < TOL ? x.M : (PERDIDA_RE.test(norm(x.label)) && x.M > 0 && Math.abs(-x.M - pat) < TOL) ? -x.M : null;
        if (impreso !== null) { meta = { netInterest: r6(ni), tax: r6(tx), profitOnPlayerSales: r6(ps), pat: r6(pat) }; cierraPat = { lectura: `${G.nombre}; ${L.nombre}`, impreso: x, valor: impreso, L }; lecturaGasto = G; break busqueda; }
      }
    }
    return { meta, cierraPat, lecturaGasto };
  };
  let { meta, cierraPat, lecturaGasto } = buscarPat();
  // ESCALÓN p2: un rótulo financiero ("Intereses") contestado no_es_rubro en la cola con el lado del documento a la vista, que
  // no es una línea de ingreso ni de gasto (club-data-mapping §2: los intereses van al resultado financiero) y que el resultado impreso
  // necesita: si ninguna lectura cerró, las filas así pasan a netInterest con su signo y se vuelve a buscar. Compuerta: cierra el resultado
  // impreso; si no cierra, vuelven a excluidas. Caso: Boyacá Chicó 2025 (Intereses L839 de ingreso y L999 de gasto, mismo rótulo).
  if (!cierraPat && patImpresos.length) {
    const candFin = filas.filter((f) => f.destino === 'excluida' && f.cat === 'no_es_rubro' && f.ladoDoc && FINANCIERO_RE.test(norm(f.label)));
    if (candFin.length) {
      for (const f of candFin) f.destino = 'netInterest';
      metaFilas.push(...candFin);
      const b2 = buscarPat();
      if (b2.cierraPat) { ({ meta, cierraPat, lecturaGasto } = b2); P.avisos.push(`resultado financiero: ${candFin.map((f) => `"${f.label}" ${f.native} (${f.ladoDoc === 'revenue' ? 'ingreso' : 'gasto'})`).join('; ')} contestado no_es_rubro en la cola pasa al resultado financiero: con eso cierra el resultado impreso (to-do 298 p2)`); }
      else { for (const f of candFin) f.destino = 'excluida'; metaFilas.length -= candFin.length; }
    }
  }
  for (const f of exp) f.amountNative = r6(lecturaGasto.v(f));
  P.signos.elegida = cierraPat ? cierraPat.lectura : `${lecturaGasto.nombre} (ninguna lectura cerró el resultado)`;
  const expSinExc = exp.filter((f) => f.cat !== 'exceptional_items').reduce((a, f) => a + f.amountNative, 0);
  const expTodo = exp.reduce((a, f) => a + f.amountNative, 0);
  const T = { revSum: r6(revSum), expSum: r6(expSinExc), officialTotalRevenue: null, officialTotalExpenses: null, officialPAT: null, verificacion: {} };
  if (!meta) meta = { netInterest: 0, tax: 0, profitOnPlayerSales: 0 };
  if (cierraPat) { T.officialPAT = r6(cierraPat.valor); T.patImpreso = { label: cierraPat.impreso.label, pag: cierraPat.impreso.page, M: cierraPat.impreso.M, signos: cierraPat.lectura }; T.verificacion.pat = 'impreso'; }
  else if (patImpresos.length && rev.length) frena('tie-out-resultado', `resultado: ingresos ${r6(revSum)} + gastos ${r6(expTodo)} + netInterest ${meta.netInterest} + tax ${meta.tax}${meta.profitOnPlayerSales ? ` + profitOnPlayerSales ${meta.profitOnPlayerSales}` : ''} = ${r6(revSum + expTodo + meta.netInterest + meta.tax + (meta.profitOnPlayerSales || 0))} no coincide con ningún resultado impreso (${patImpresos.slice(0, 4).map((x) => `"${String(x.label).slice(0, 40)}" ${x.M}`).join('; ')})`);
  else P.avisos.push('no se encontró el resultado del ejercicio impreso: officialPAT queda null (audit.js P2 balance-sin-pat)');
  // 6b. total de ingresos y de gastos: un total IMPRESO igual a la suma de las líneas; si el documento no lo imprime pero el resultado cerró,
  // se usa la suma de las líneas y se marca `por-resultado` (verificado por el resultado, no por un total propio).
  // FILA DE REDONDEO: si la suma de las líneas y el total impreso difieren SOLO por redondeo, se agrega una
  // línea explícita "Diferencia de redondeo" por la diferencia (other_income en ingresos, other_expenses en gastos) y el total oficial es el
  // IMPRESO: el total cierra exacto contra el documento (audit.js exige < 0,01) y la diferencia queda a la vista en vez de escondida. "Solo por
  // redondeo" es estricto: menos de MEDIA UNIDAD de lo impreso por cada fila sumada (n filas en miles -> hasta n x 0,0005 millones). NO la
  // tolerancia de buscar() (que además acepta 0,06% del total): Real Madrid 2005-06 difiere 0,12 millones con filas en miles, y eso no es
  // redondeo (con ~15 filas daría 0,0075), es una fila de más o de menos o un error de lectura: sigue frenando.
  // Se usa solo cuando el resultado del ejercicio NO cerró con la suma: si cerró, la suma ya está verificada (`por-resultado`) y una fila de
  // redondeo lo descuadraría. Después de agregarla se vuelve a buscar el resultado impreso con la diferencia sumada.
  let ajusteRedondeo = 0;
  const lado = (nombre, arr, objetivo, clave, filtro) => {
    if (!arr.length) {
      if (nombre === 'gastos') P.avisos.push('ninguna fila de gastos: officialTotalExpenses queda null (el sitio muestra "sin dato")');
      // INGRESOS 0 DE UN ESTADO BELGA ABREVIADO: el escalón de los códigos NBB leyó el estado (esquema
      // abreviado, la Brutomarge 9900 negativa va como gasto), todos sus totales impresos cierran exacto, no hay ninguna fila de ingresos y el
      // resultado del ejercicio cierra. Entonces el documento no informa ingresos: el total es 0. Caso: Lierse SK 2019-2021 (Omzet 70 vacío,
      // Brutomarge −1.372 / −1.475 / −1.436) y Patro Eisden 2021 (Brutomarge −140.857).
      else if (cierraPat && /escalón "códigos NBB"/.test(notasVerif.join(' ')) && Math.abs(objetivo) < 1e-9 && ingresosVerif != null && Math.abs(Number(ingresosVerif)) < 1e-9) {
        T[clave] = 0; T.verificacion.ingresos = 'por-resultado';
        P.avisos.push('ingresos: el documento (esquema abreviado, códigos NBB) no informa ingresos: el resultado cierra con la Brutomarge negativa como gasto; officialTotalRevenue 0');
      } else frena('tie-out', 'ninguna fila de ingresos con categoría aceptable');
      return;
    }
    const b = buscar(objetivo, arr.length, filtro);
    const soloRedondeo = b.redondeo && Math.abs(Math.abs(b.redondeo.M) - Math.abs(objetivo)) <= Math.max(TOL, 0.5 * arr.length * unidadMax);
    if (!b.exacto && !cierraPat && soloRedondeo) {
      const signo = nombre === 'ingresos' ? 1 : -1; const d = r6(signo * Math.abs(b.redondeo.M) - objetivo);
      arr.push({ label: 'Diferencia de redondeo', cat: nombre === 'ingresos' ? 'other_income' : 'other_expenses', amountNative: d, native: d, destino: nombre === 'ingresos' ? 'revenue' : 'expense', page: b.redondeo.page, origen: 'redondeo', escalon: null, conf: null });
      ajusteRedondeo += d;
      T[clave] = r6(Math.abs(b.redondeo.M)); T[nombre === 'ingresos' ? 'revImpreso' : 'expImpreso'] = { label: b.redondeo.label, pag: b.redondeo.page, M: b.redondeo.M }; T.verificacion[nombre] = 'impreso-con-redondeo';
      P.avisos.push(`${nombre}: las filas suman ${r6(objetivo)} y el total impreso "${String(b.redondeo.label).slice(0, 40)}" (pág. ${b.redondeo.page}) dice ${b.redondeo.M}: se agrega la línea "Diferencia de redondeo" por ${d} (menos de media unidad impresa por fila, ${arr.length - 1} filas)`);
      return;
    }
    if (b.exacto) { T[clave] = r6(Math.abs(b.exacto.M)); T[nombre === 'ingresos' ? 'revImpreso' : 'expImpreso'] = { label: b.exacto.label, pag: b.exacto.page, M: b.exacto.M }; T.verificacion[nombre] = 'impreso'; }
    else if (cierraPat) { T[clave] = r6(Math.abs(objetivo)); T.verificacion[nombre] = 'por-resultado'; P.avisos.push(`${nombre}: ningún total impreso igual a la suma de las líneas (${r6(objetivo)}); queda la suma, verificada por el resultado del ejercicio${b.redondeo ? ` (el impreso "${String(b.redondeo.label).slice(0, 40)}" ${b.redondeo.M} difiere en ${r6(Math.abs(b.redondeo.M) - Math.abs(objetivo))}: redondeo)` : ''}`); }
    else if (b.redondeo) frena('tie-out', `${nombre}: las filas suman ${r6(objetivo)} y el total impreso "${b.redondeo.label}" (pág. ${b.redondeo.page}) dice ${b.redondeo.M}: la diferencia (${r6(Math.abs(b.redondeo.M) - Math.abs(objetivo))}) es mayor que media unidad impresa por fila (${r6(0.5 * arr.length * unidadMax)}), así que no es redondeo: revisar filas y lectura`);
    else frena('tie-out', `${nombre}: las filas suman ${r6(objetivo)} y ningún total impreso del documento coincide (y el resultado del ejercicio tampoco cerró)`);
  };
  // Una sola línea de ingresos "cierra" contra sí misma: solo vale como total si está etiquetada como total.
  lado('ingresos', rev, revSum, 'officialTotalRevenue', (x) => esTotalDe(x) && !(rev.length === 1 && norm(x.label) === norm(rev[0].label) && !x.esTotal));
  lado('gastos', exp, expSinExc, 'officialTotalExpenses', (x) => esTotalDe(x) && !(exp.length === 1 && norm(x.label) === norm(exp[0].label) && !x.esTotal));
  // Con filas de redondeo, el resultado impreso se vuelve a buscar con la diferencia sumada (misma lectura de signos de los gastos).
  if (ajusteRedondeo && !cierraPat && patImpresos.length) {
    const r2 = buscarPat(ajusteRedondeo, lecturaGasto);
    if (r2.cierraPat) {
      cierraPat = r2.cierraPat; meta = r2.meta;
      T.officialPAT = r6(cierraPat.valor); T.patImpreso = { label: cierraPat.impreso.label, pag: cierraPat.impreso.page, M: cierraPat.impreso.M, signos: cierraPat.lectura }; T.verificacion.pat = 'impreso';
      P.frena = P.frena.filter((x) => x.etapa !== 'tie-out-resultado');
      P.avisos.push(`resultado: cierra contra "${String(cierraPat.impreso.label).slice(0, 40)}" contando la(s) fila(s) de redondeo (${r6(ajusteRedondeo)})`);
    }
  }
  P.totales = T;
  return { meta, cierraPat, T, lado };
}

// 6c. La segunda lectura del resultado, desde el XHTML etiquetado.
export function faseIxbrl(ctx) {
  const { frena, club, per, mdAbs, alta, e, pdf, perimetro, T, P, agregarCaso, year } = ctx;
  // 6c. SEGUNDA LECTURA del resultado, independiente del texto: el `ProfitLoss` etiquetado en el XHTML del que salió este .md (solo el hermano del mismo cierre).
  // Perímetro INDIVIDUAL: si no coincide, FRENA (medido: 9 clubes, 0 falsos frenos). CONSOLIDADO: sigue siendo AVISO y una fila en la cola, hasta que
  // `node tools/medir-ixbrl-consolidado.mjs` diga que se puede decidir (dos años consolidados de clubes distintos, uno con minoritarios). Un hecho ambiguo, de la matriz o que no está nunca frena. Se apaga con el ajuste `ixbrl-omitir`, con su motivo.
  try {
    // el XHTML de donde salió este .md (su hermano, con el encabezado de xhtml-aarsrapport.mjs) o, si el año salió de un PDF, un XHTML de la carpeta del club del MISMO emisor (su identificador está en el .md)
    // y del mismo cierre (lo exige el contexto del hecho): una segunda lectura independiente del PDF (Auditora 5). El perímetro es el de esta carga: sin él, no compara.
    const mdTxt = readFileSync(mdAbs, 'utf8'); const cierreIx = (per && per.cierre) || (alta.ejercicio && alta.ejercicio.cierre);
    const hermano = resolve(ROOT, e.md.replace(/\.md$/, '.xhtml'));
    const xh = existsSync(hermano) && /xhtml-aarsrapport\.mjs/.test(mdTxt.slice(0, 400)) ? hermano : (cierreIx ? xhtmlDelMismoEmisor(dirname(mdAbs), mdTxt) : null);
    if (cierreIx && xh && !ajusteDe(pdf, 'ixbrl-omitir')) {
      const ch = chequearIxbrl(leerResultadoIxbrl(xh, cierreIx, perimetro), { resultadoM: T.officialPAT, ingresosM: T.revSum, perimetro });
      for (const a of ch.avisos) P.avisos.push(`iXBRL: ${a}`);
      if (ch.frena) frena('ixbrl-resultado', `el resultado etiquetado en el XHTML (iXBRL, perímetro individual) no coincide con el cargado: ${ch.caso}. Revisá el signo y la escala del resultado en el .md (${e.md}); si el hecho no es el resultado del ejercicio, ajuste \`ixbrl-omitir\` (\`node tools/ajustes.mjs\`) con su motivo.`);
      else if (ch.caso) agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'ixbrl-resultado', detalle: String(year), que: `El resultado etiquetado en el XHTML (iXBRL) no coincide con el cargado: ${ch.caso}. Mirá la fila del estado de resultados en el .md; si el hecho no es el resultado del ejercicio (perímetro, minoritarios), ajuste \`ixbrl-omitir\` con su motivo.`, propuesta: 'revisar el signo y la escala del resultado en el .md; si el hecho es de otro perímetro, ixbrl-omitir' });
    }
  } catch (err) { P.avisos.push(`iXBRL: no se pudo comparar con el informe XHTML (${err.message})`); }
}

// 7. Tipo de cambio, fuente y liga.
export function faseFxYLiga(ctx) {
  const { campo, moneda, P, frena, sitio, clubId, year, reemplaza, club } = ctx;
  const fxC = campo('fx'); const fxRefC = campo('fxRef');
  const m = { currency: moneda };
  if (fxC.valor != null && fxC.estado === 'ok' && fxC.fxSource) { m.fx = fxC.valor; m.fxSource = fxC.fxSource; }
  else if (fxRefC.valor && fxRefC.estado === 'ok') { m.fxRef = fxRefC.valor; if (fxRefC.fxClose) P.fxCloseNuevo = { key: fxRefC.valor, ...fxRefC.fxClose }; }
  else if (moneda === 'USD') { /* nada que convertir */ }
  else frena('fx', `sin tipo de cambio: ${fxRefC.fuente || fxC.fuente || 'analizar() no devolvió ninguno'}${fxRefC.nota ? ` (${fxRefC.nota})` : ''}`);
  if (fxC.estado === 'pendiente' && fxC.nota) P.avisos.push(`fx: ${fxC.nota}`);
  const sourceId = campo('sourceId').valor;
  if (!sourceId) frena('fuente', 'sin sourceId');
  else if (sitio.sources[sourceId]) { if (P.reemplaza) P.avisos.push(`sources['${sourceId}'] ya existe: se conserva`); else frena('fuente', `sources['${sourceId}'] ya existe`); }
  const ligaC = campo('liga');
  let ligaExistente = ((sitio.CLUB_LEAGUE_BY_YEAR || {})[clubId] || {})[year];
  // una fila existente en null ("nadie lo verificó") no frena una liga verificada nueva: se reemplaza. Caso: Goiás 2009-2011
  // y 2013, cargados con liga null antes de que el roster estuviera en la caché.
  if (ligaExistente === null && ligaC.valor) ligaExistente = undefined;
  P.liga = { valor: ligaExistente !== undefined ? ligaExistente : (ligaC.valor ?? null), fuente: ligaExistente !== undefined ? 'la fila ya existe en data/club-leagues' : ligaC.fuente, estado: ligaExistente !== undefined ? 'existe' : ligaC.estado, nota: ligaC.nota };
  return { m, sourceId };
}

// 8. El ejercicio que se escribiría (fiscalYearMeta, líneas, fuente) y la pregunta por el presidente.
export function faseEjercicio(ctx) {
  const { club, m, campo, cierraPat, metaFilas, lado, alta, per, moneda, registro, P, ajPer, perimetro, clubId, year, rev, exp, sourceId, meta, incluidoEn, T, pdf, e, cj, sitio, agregarCaso, frena } = ctx;
  // rawLabel: tal cual el documento (nunca se traduce ni se "prolija", club-data-mapping §0), salvo la referencia a nota del final
  // ("Otros ingresos (Nota 15)", "Renteresultaat (21)"), que en producción no se copia.
  const limpiar = (l) => String(l).replace(/\s*\((nota|notas|note|notes|anexo|annex|nr\.?)?\s*[\d.,\s]+\)\s*$/i, '').replace(/^\**\s*|\s*\**$/g, '').trim();
  for (const f of [...rev, ...exp]) f.label = limpiar(f.label);
  // extraRows: con más de una fila de resultado financiero / impuesto, cada una va como fila propia del "Formato del club" (mismo campo que
  // Alianza Lima 2023, cargada a mano: "Ingresos y gastos financieros, neto" y "Diferencia de cambio, neta" por separado).
  const extraRows = cierraPat && metaFilas.length >= 2 ? metaFilas.map((f) => ({ label: limpiar(f.label), value: r6(cierraPat.L.v(f)) })) : null;
  const disclosure = (f) => (/^nota|lista|cierre|precedente/.test(f.origen || '') ? 'detailed' : 'aggregated');
  // SIN DESGLOSE (pedido de Guido para UC 2025: "la página tiene que decir No declarado sin romper las sumas"). Una línea que va
  // a la categoría "sin desglosar por la fuente" (lump_football_operations / _expense) queda además anotada en fiscalYearMeta.sinDesglose, con
  // el motivo (la nota de Guido en la cola, si la hay). Hoy la página no lee este campo: es la marca para que otra sesión muestre "No
  // declarado" en las categorías que esa línea esconde (UC 2025: los sueldos del plantel están adentro del costo de ventas). Las sumas no
  // cambian: el importe está una sola vez, en la línea.
  const sinDesglose = [...rev, ...exp].filter((f) => { const b = bolsonDeDeporte(club.sport); return b && (f.cat === b.revenue || f.cat === b.expense); }).map((f) => ({ renglon: f.label, lado: f.destino, importe: r6(Math.abs(f.amountNative ?? f.native ?? 0)), motivo: f.notaGuido || 'el documento no desglosa este renglón', tipo: tipoSinDesglose(f.label, /gasto|expense/.test(f.destino || '') ? 'expenses' : 'revenue') }));
  // DE DÓNDE SALIÓ CADA DATO DE LAS ESCALERAS CHICAS: el texto que ya arma
  // alta-club.mjs para cada campo (año, cierre, perímetro, moneda, tipo de cambio, liga), más lo que cargar.mjs decidió encima (perímetro
  // por ajuste, heredado o por la cola). Solo registro: no cambia ninguna decisión. Lo junta `node tools/estado.mjs --escalones`.
  P.procedencia = Object.fromEntries(alta.ejercicio.campos.map((c) => [c.campo, { valor: c.valor ?? null, fuente: c.fuente || null, estado: c.estado || null }]));
  { const avPer = P.avisos.find((x) => /^perímetro(:| heredado)/.test(x));
    if (ajPer) P.procedencia.perimetro = { valor: perimetro, fuente: `ajuste manual (${ajPer.fecha})`, estado: 'ok' };
    else if (avPer) P.procedencia.perimetro = { valor: perimetro, fuente: /heredado/.test(avPer) ? 'heredado del año cargado más cercano' : 'respuesta de Guido en la cola', estado: 'ok' }; }
  // QUÉ SON LOS INGRESOS DEL AÑO (`baseIngreso`: completo, ventas totales o margen bruto) y, si el documento no los imprime y se reconstruyeron con margen + compras y
  // servicios, `derivacionIngreso` (tools/ingreso-derivado.js, la misma regla que `fos ingreso-base`). Un año de margen bruto sin reconstrucción posible avisa: el ingreso
  // real no se conoce y Ligas lo trata como hueco (punto 455).
  // UNA LÍNEA ÚNICA DE INGRESOS CUYO RÓTULO NADIE RECONOCE (ni lo aprendido ni las palabras de tipo-sin-desglose.js): primero contesta Jev (tools/jev-tipo-linea.mjs) y, con poca confianza, va a la cola
  // («¿margen bruto, ventas totales u otra?»); la respuesta se aprende (Admin/registros/tipos-sin-desglose.jsonl) y no se vuelve a preguntar. Mientras no se contesta queda `other` y la carga sigue.
  for (const s of sinDesglose) {
    if (!/^(revenue|ingreso)$/.test(s.lado) || tipoConocido(s.renglon, 'revenue')) continue;
    const det = `${clubId}|${s.renglon}`; const r = respuestaPorDetalle('cargar', 'tipo-linea', det)?.resp;
    const valor = r?.decision === 'corregir' ? r.valor : r?.decision === 'aceptar' ? 'other' : null;
    if (['gross_margin', 'net_sales', 'other'].includes(valor)) { s.tipo = valor; aprender(s.renglon, 'revenue', valor, `cola (${clubId} ${year})`); continue; }
    // JEV CONTESTA PRIMERO (centavos de API, aprobado por Guido): con confianza suficiente el tipo se aprende y no se pregunta; con menos, o sin clave o sin red, va a la cola como antes.
    let jev = null; try { jev = JSON.parse(execFileSync('node', [resolve(ROOT, 'tools', 'jev-tipo-linea.mjs'), '--rotulo', s.renglon, '--club', clubId, '--importe', String(s.importe)], { encoding: 'utf8', timeout: 45000 })); } catch { /* sin Jev: la cola */ }
    if (jev && ['gross_margin', 'net_sales', 'other'].includes(jev.tipo) && jev.confianza >= UMBRAL_JEV_TIPO) { s.tipo = jev.tipo; aprender(s.renglon, 'revenue', jev.tipo, `Jev ${jev.confianza} (${clubId} ${year})`); P.avisos.push(`ingresos: el rótulo «${s.renglon}» no lo reconocía ninguna regla; Jev lo clasificó como ${jev.tipo} (confianza ${jev.confianza}) y queda aprendido`); }
    else {
      agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'tipo-linea', detalle: det, que: `El documento trae los ingresos de ${year} en una sola línea, «${s.renglon}» (${s.importe} millones de la moneda del documento), y ninguna regla reconoce ese rótulo. ¿Es el margen bruto (ya neto de costos, no un ingreso), las ventas totales o otra cosa? Mirá el estado de resultados en el .md (${e.md}). Responder: node tools/cola.mjs --responder <id> corregir --valor gross_margin | net_sales | other (aceptar = other).`, propuesta: 'other' });
      P.avisos.push(`ingresos: el rótulo «${s.renglon}» no se reconoce; pregunta en la cola (tipo-linea, no frena): queda como other hasta que se conteste`);
    }
  }
  // INGRESO REAL DEL AÑO ANTERIOR: si el año anterior cargado es de margen bruto y este documento (esquema belga) imprime el ingreso de ese año en su columna anterior, se guarda como
  // ancla (Admin/registros/ingresos-ancla.jsonl; la usa Ligas, tools/estimar.mjs) y no reescribe el año publicado.
  P.ancla = null;
  try {
    const g = (sitio.generic || {})[clubId] || {}; const ant = anioAnterior(g.revenueLinesByYear, year);
    if (ant != null && (g.fiscalYearMeta || {})[ant]?.baseIngreso === 'gross_margin' && e.md) {
      const N = leerEstadoNBB(readFileSync(resolve(ROOT, e.md), 'utf8'));
      if (N && N.anterior.cierra && N.anterior.ingresos > 0) P.ancla = { club: clubId, anio: ant, ingreso: r6(N.anterior.ingresos / 1e6), moneda: m.currency, fuente: `${pdf}: columna del ejercicio anterior del estado de resultados`, nota: 'el informe del año anterior imprime solo el margen bruto; este trae el ingreso completo de ese ejercicio' };
    }
  } catch { /* sin estado NBB: no hay ancla */ }
  const bi = baseDeIngreso({ lineas: rev.map((f) => ({ rawLabel: f.label, normalizedCategory: f.cat, amountNative: f.amountNative })), sinDesglose, documento: pdf, totalRevenue: T.officialTotalRevenue, sourceId });
  if (bi && bi.base === 'gross_margin') P.avisos.push('ingresos: el documento imprime solo el margen bruto (ya neto de costos), no los ingresos; se marca gross_margin. Si el documento imprime también compras y servicios (60, 61 o 60/61), el ingreso se reconstruye como margen + compras y servicios');
  P.ejercicio = {
    clubId, year, cierre: alta.ejercicio.cierre, perimetro,
    revenueLines: rev.map((f) => ({ rawLabel: f.label, normalizedCategory: f.cat, amountNative: f.amountNative, disclosureLevel: disclosure(f), _pag: f.page, _escalon: f.escalon, _conf: f.conf, _fuenteCat: f.fuenteCat || null })),
    expenseLines: exp.map((f) => ({ rawLabel: f.label, normalizedCategory: f.cat, amountNative: f.amountNative, disclosureLevel: disclosure(f), _pag: f.page, _escalon: f.escalon, _conf: f.conf, _fuenteCat: f.fuenteCat || null })),
    fiscalYearMeta: { ...m, sourceId, reportType: campo('reportType').valor || 'official_balance_sheet', gestionId: null, profitOnPlayerSales: meta.profitOnPlayerSales || 0, assetSales: 0, netInterest: meta.netInterest, tax: meta.tax, ...(extraRows ? { extraRows } : {}), ...(Object.keys(incluidoEn).length ? { incluidoEn } : {}), ...(sinDesglose.length ? { sinDesglose } : {}), ...(bi ? { baseIngreso: bi.base, ...(bi.derivacion ? { derivacionIngreso: bi.derivacion } : {}) } : {}), grossDebt: null, cash: null, officialTotalRevenue: T.officialTotalRevenue, officialTotalExpenses: T.officialTotalExpenses, officialPAT: T.officialPAT },
    source: sourceId ? { id: sourceId, clubId, title: `${club.name || club.displayName} — ${basename(pdf, '.pdf')} (ejercicio ${year})`, type: campo('reportType').valor || 'official_balance_sheet', reliability: 'primary', documento: pdf, note: `Cargado por tools/cargar.mjs (${HOY}) desde la transcripción ${e.md}; categorías del pipeline (${cj.modelo || 'Jev/Claude'}). Perímetro: ${perimetro || '?'}.` } : null,
  };
  // CAMBIO DE FORMATO del balance (resumido: ingresos en una sola línea sin desglosar; completo: desglosados) contra el año anterior cargado: la nota pública
  // que lo explica al visitante no se olvida. Solo avisa; audit.js (`cambio-de-formato-sin-nota`) marca el año que quedó sin publicNote.
  { const por = ((sitio.generic || {})[clubId] || {}).revenueLinesByYear; const ant = anioAnterior(por, year);
    const cambio = ant != null ? cambioDeFormato(por[ant], P.ejercicio.revenueLines) : null;
    if (cambio) P.avisos.push(`cambio de formato del balance (${ant} → ${year}, ${cambio.replace('-a-', ' a ')}): agregá una publicNote a la fuente del año (node tools/fuente.mjs <clubId> <sourceId> --nota "…" --escribir). Texto sugerido: «${textoSugerido(cambio)}»`); }
  // PRESIDENTES (decisión de Guido: "cuando se hace el alta se pregunta si hay socios, consolidado,
  // etc.; acá debería agregarse lo de presidentes"). Si ninguna gestión confirmada de data/gestiones/<país>.js cubre el cierre de este año,
  // va un caso a la cola (lo contesta el subagente de Guido, como las preguntas de perfil). NO FRENA: el año se carga igual, sin presidente.
  // Un club ya contestado "descartar" (sociedad sin dueño persona) no se vuelve a preguntar; uno contestado "aceptar" que igual quedó sin
  // cubrir este año abre un caso nuevo para el año. La pista: los renglones de la transcripción donde aparece el cargo (el firmante).
  {
    const cierreY = alta.ejercicio.cierre; const gs = (sitio.gestiones || {})[clubId] || [];
    const cubre = gs.some((g) => g.confirmada && ((g.desde && g.desde <= cierreY && (!g.hasta || g.hasta >= cierreY)) || (g.firmo || []).includes(year)));
    const previa = respuestaPorDetalle('cargar', 'gestion', clubId);
    // Este documento ya tuvo una pregunta de gestión contestada «aceptar» (con la gestión sin confirmar o sin fuente que cubra el año): la persona ya miró este año, así que no se le vuelve a preguntar
    // en cada corrida con otro detalle. Una gestión que después cubre el año cierra la duda sola (`cubre`); un año de OTRO documento sí abre su pregunta.
    const yaContestada = respuestasDonde('cargar', 'gestion', (c) => c.pdf === pdf).some((x) => x.resp.decision === 'aceptar');
    if (cierreY && !cubre && previa?.resp?.decision !== 'descartar' && !yaContestada) {
      const iso = String(club.country || '').toLowerCase();
      let pistas = [];
      // El nombre del firmante suele ir en el renglón de ARRIBA del cargo ("Paulo Rogério de Carvalho Pinheiro" / "Presidente Executivo",
      // Goiás 2021 L1315-1316); se trae ese renglón y el del cargo, nunca el de abajo (ahí va el número de documento de la persona).
      const limpio = (l) => l.replace(/[|*#]/g, ' ').replace(/\s+/g, ' ').trim();
      try { const L = readFileSync(resolve(ROOT, e.md), 'utf8').split('\n');
        pistas = L.map((l, i) => i).filter((i) => /\b(presidente|presidenta|president|chairman|chairwoman|vorstandsvorsitzende|vorsitzende|voorzitter|formand|predsjednik|πρόεδρος)\b/i.test(L[i]) && L[i].length < 220).slice(-4)
          .map((i) => { const j = [i - 1, i - 2].find((k) => k >= 0 && limpio(L[k])); const arriba = j != null && limpio(L[j]).length <= 80 && !/\d{3}/.test(L[j]) ? `${limpio(L[j])} / ` : ''; return `L${i + 1}: ${arriba}${limpio(L[i]).slice(0, 120)}`; }); } catch { /* sin .md */ }
      agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'gestion', detalle: previa ? `${clubId}:${year}` : clubId,
        que: `¿Quién condujo ${club.name || clubId} en el ejercicio ${year} (cierre ${cierreY})? Ninguna gestión confirmada de data/gestiones/${iso}.js lo cubre. Completar las gestiones del club en ese archivo (formato y regla: Admin/ARQUITECTURA.md, "Gestiones"; el porqué de cada fecha va a Admin/carga-clubes/<club>.md, no al archivo): nombre, corto, cargo 'Presidente' (en una sociedad, el dueño solo si es una persona con nombre), desde (fecha en que ASUMIÓ), hasta (o null), fuente (URL), confirmada:true. Si el país no tiene archivo, crearlo y sumar '${iso}' a PAISES de js/finanzas-anios.js. Una SAF o sociedad anónima sin dueño persona no tiene gestión: responder descartar. Firmantes en la transcripción: ${pistas.length ? pistas.join(' | ') : 'no se encontraron'}. Después: node tools/cola.mjs --responder <id> aceptar.`,
        propuesta: 'completar data/gestiones y responder aceptar (o descartar si el club no tiene presidente persona)' });
      P.avisos.push(`gestión: ningún presidente confirmado cubre ${year} (cierre ${cierreY}); pregunta en la cola (no frena)`);
    }
  }
}

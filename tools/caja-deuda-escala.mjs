// ============================================================================
// tools/caja-deuda-escala.mjs — el sitio, la escala, las lecturas por IA, la medición y los balances NBB y rusos de caja y deuda
// Mudado de tools/caja-deuda.mjs sin cambiar una línea (salvo `export`); tools/caja-deuda.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { derivado } from './rutas.mjs';
import * as EV from './evidencia-club.mjs';
import { ajusteDelAnio, ajusteClubODoc, ajustePerimetroDe } from './ajustes.mjs';
import { archivosData } from './data-clubes.js';
import { deporteDePdf, deporteEnFrase } from './deporte-club.mjs';
import { parseNumber, filasDelMd, r6 } from './caja-deuda-md.mjs';
import { avisarRecorte, jevDe } from './caja-deuda-propuestas.mjs';
import { FACTORES, TOL, escalera } from './caja-deuda.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// ---------------------------------------------------------------- el sitio y los documentos de cada año cargado
export function sitio() {
  const sb = { console, window: {} }; sb.window.window = sb.window; const ctx = vm.createContext(sb);
  for (const f of ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...archivosData()]) vm.runInContext(readFileSync(resolve(ROOT, f), 'utf8'), ctx);
  return { G: vm.runInContext('window.CLUB_GENERIC_DATA', ctx), S: vm.runInContext('typeof sources !== "undefined" ? sources : {}', ctx) };
}
// El .md de un año cargado: la ruta que nombra su fuente (220 de los 284 años con deuda/caja la tienen).
// la ruta de la transcripción está en la nota de la fuente, que vive en la evidencia del club (textoFuenteCompleto)
const mdDeFuente = (S, sourceId) => { const m = EV.textoFuenteCompleto(S[sourceId]).match(/Clubes\/[^"`\n]+?\.md/); return m && existsSync(resolve(ROOT, m[0])) ? m[0] : null; };

// Factor del estado de resultados de un documento contra lo cargado (para el escalón 1 en la medición): la escala con la que más rubros de
// ingresos cargados aparecen tal cual entre las cifras del documento.
export function factorPorIngresos(filas, lineas, md = null) { // `md` sin uso (lo pasan los llamados; probado y no adoptado)
  let mejor = null;
  for (const fac of FACTORES) {
    const n = (lineas || []).filter((l) => l.amountNative && filas.some((f) => f.cifras.some((c) => Math.abs(Math.abs(c) * fac - Math.abs(l.amountNative)) <= TOL(l.amountNative)))).length;
    if (n && (!mejor || n > mejor.n)) mejor = { fac, n };
  }
  return mejor?.fac || null;
}

// LA ESCALA DEL AÑO. Escalera de UN dato, la escala con la que se leen las cifras de un año en su documento:
//   ESCALÓN 0  ajuste manual `escala` (tools/ajustes.mjs: unidades | miles | millones, por PDF y año como `caja` y `deuda`), la escala que el
//              documento imprime para ese año. Es una decisión con cita: no pasa por compuerta.
//   ESCALÓN 1  factorPorIngresos, como antes.
//   nada ──► null ("sin escala del documento").
// La usan todos los lugares de contexto() que antes llamaban a factorPorIngresos (el año, sus precedentes, el año anterior y el siguiente) y
// --medir --escalas. Casos: RB Leipzig 2024, comparativo del jahresabschluss-2024-25 impreso en TEUR ("30.06.2024 TEUR") con el 2025 en EUR:
// factorPorIngresos daba unidades y un ajuste de caja "783" daba 0,000783 M. RB Leipzig 2023 y HSV 2024: transcripciones viejas sin tablas,
// factorPorIngresos no encuentra escala y ningún ajuste de caja o deuda entraba (completarClub pide la escala).
export function escalaDe(md, anio, filas, lineas, anios) {
  const aj = ajusteDelAnio(md.replace(/\.md$/i, '.pdf'), 'escala', anio, anios.filter((x) => x.md === md).length === 1);
  if (aj && FACTOR_ESCALA[aj.valor]) return FACTOR_ESCALA[aj.valor];
  const f = factorPorIngresos(filas, lineas, md);
  // ESCALÓN 1b: la escala 1 (millones) inferida de las líneas cargadas la contradice la escala del ESTADO DE RESULTADOS que registró verificar.mjs
  // (.verificacion.json, escala 'unidades' o 'miles'). Bath 2022 a 2025: el estado está en £ y las líneas cargadas salen del Strategic Report en £m con un decimal (4,8; 5,2...), que
  // coinciden con esa tabla del propio documento a escala 1: la caja de 49.093 £ se leía 49.093 M y se rechazaba por los ingresos. Solo contradice a la escala 1; nunca cambia otra
  // (medido en todos los clubes: solo cambia Bath).
  if (f === 1) {
    try {
      const v = JSON.parse(readFileSync(resolve(ROOT, derivado(md, '.verificacion.json', { crear: false })), 'utf8'));
      const esc = v?.escala?.valor; if (esc && esc !== 'millones' && FACTOR_ESCALA[esc]) return FACTOR_ESCALA[esc];
    } catch { /* sin verificación: como antes */ }
  }
  return f;
}

// ---------------------------------------------------------------- ESCALÓN 2: IA
const FACTOR_ESCALA = { unidades: 1e-6, miles: 1e-3, millones: 1 };
const SCHEMA_IA = {
  type: 'object', additionalProperties: false, required: ['escala', 'escala_evidencia', 'caja', 'deuda', 'observaciones'],
  properties: {
    escala: { type: 'string', enum: ['unidades', 'miles', 'millones'] }, escala_evidencia: { type: 'string' },
    caja: { type: 'object', additionalProperties: false, required: ['lineas', 'ninguna'], properties: { lineas: { type: 'array', items: { type: 'integer' } }, ninguna: { type: 'boolean' } } },
    deuda: { type: 'object', additionalProperties: false, required: ['lineas', 'ninguna'], properties: { lineas: { type: 'array', items: { type: 'integer' } }, ninguna: { type: 'boolean' } } },
    observaciones: { type: 'string' },
  },
};
const sistemaIA = (deporte) => `Sos analista de estados financieros de clubes de ${deporteEnFrase(deporte)}. Te paso las páginas del BALANCE (estado de situación patrimonial / financiera) de un documento, con cada línea numerada ("L123: ..."), en cualquier idioma.

Elegí, para la columna del ejercicio pedido (la del cierre más reciente):
- caja.lineas: la o las líneas del EFECTIVO Y EQUIVALENTES (caja y bancos, disponibilidades, caixa e equivalentes, cash and cash equivalents...). Normalmente una sola; nunca un total del activo.
- deuda.lineas: las líneas de DEUDA FINANCIERA según el criterio que te indico abajo. Corriente Y no corriente si aparecen por separado. Nunca un total del pasivo, ni subtotales que ya incluyen otra línea elegida.
- Si el balance está completo y no hay ninguna línea de deuda financiera, deuda.ninguna = true (lo mismo para caja).
- escala del balance (unidades, miles o millones) y en escala_evidencia la frase EXACTA del documento que lo dice ("Miles de pesos", "en miles de reales", "€'000"...), copiada tal cual.
- observaciones: una frase si algo es dudoso. No inventes líneas: si no está, dejá la lista vacía.`;

// Pide a la IA las líneas (una llamada por documento). ejecutar=false: ensayo (tokens y costo estimados).
// `modelo` (opus | sonnet), solo desde --medir --modelo: la respuesta va a su propio archivo y no se mezcla con la guardada.
export const MODELOS_IA = { opus: 'claude-opus-5-5', sonnet: 'claude-sonnet-5-5' };
// EL MODELO DEL ESCALÓN 2 ES SONNET. Medido en los 606 documentos de los años cargados (--medir --ia
// --modelo sonnet, US$ 12,37): deuda 210 iguales / 14 distintos contra 211 / 18 de Opus, caja 421 / 7 contra 417 / 7; ningún distinto que
// Opus no tuviera (dejan de decidir mal Dortmund 2025, Levadiakos 2025, Monza 2024 y Novorizontino 2017). Cuesta la mitad. Las respuestas
// de Opus ya guardadas (.caja-deuda-ia.json) se siguen usando; sin ellas, la de Sonnet de la medición (.caja-deuda-ia.sonnet.json), y si
// tampoco hay, se le pregunta a Sonnet.
const MODELO_TAREA = 'sonnet';
export async function porIA({ md, mdText, filas, criterioDeuda, ejecutar = false, rehacer = false, modelo = null }) {
  const out = resolve(ROOT, derivado(md, modelo ? `.caja-deuda-ia.${modelo}.json` : '.caja-deuda-ia.json'));
  if (!rehacer && existsSync(out)) return { datos: JSON.parse(readFileSync(out, 'utf8')), costo: 0, guardado: true };
  const deLaMedicion = resolve(ROOT, derivado(md, `.caja-deuda-ia.${MODELO_TAREA}.json`));
  if (!modelo && !rehacer && existsSync(deLaMedicion)) return { datos: JSON.parse(readFileSync(deLaMedicion, 'utf8')), costo: 0, guardado: true };
  const idModelo = MODELOS_IA[modelo || MODELO_TAREA];
  const paginas = [...new Set(filas.filter((f) => f.balance).map((f) => f.pagina))];
  if (!paginas.length) return { error: 'sin páginas de balance' };
  const L = mdText.split('\n'); const PAG = /^---\s*pág\.\s*(\d+)\s*---/i; let pag = 1; const lineas = [];
  for (let i = 0; i < L.length; i++) { const m = L[i].match(PAG); if (m) { pag = Number(m[1]); continue; } if (paginas.includes(pag) && L[i].trim()) lineas.push(`L${i + 1}: ${L[i].slice(0, 220)}`); }
  const todo = lineas.join('\n'); const texto = todo.slice(0, 60000); avisarRecorte(md, 'IA (caja y deuda), caracteres de las páginas del balance', texto.length, todo.length);
  const user = `Documento: ${md.split('/').slice(1).join(' / ')}.\nCriterio de deuda de este club: ${criterioDeuda}\n\nPÁGINAS DEL BALANCE (${paginas.join(', ')} del visor):\n${texto}`;
  const { llamarClaude, tokensDe, usdEstimado } = await import('./claude-llamada.mjs'); const SYSTEM_IA = sistemaIA(deporteDePdf(md));
  if (!ejecutar) return { ensayo: true, usd: usdEstimado(tokensDe(SYSTEM_IA + user), 400, idModelo) };
  const r = await llamarClaude({ system: SYSTEM_IA, user, schema: SCHEMA_IA, tarea: modelo ? `caja-deuda-medir-${modelo}` : 'caja-deuda', pdf: md.replace(/\.md$/, '.pdf'), maxTokens: 2000, modelo: idModelo });
  if (r.error) return { error: r.error, costo: r.costo || 0 };
  writeFileSync(out, JSON.stringify({ md, generado: new Date().toISOString(), modelo: idModelo, criterioDeuda, ...r.datos }, null, 1));
  return { datos: r.datos, costo: r.costo || 0 };
}

// De la respuesta de la IA a un dato: las cifras salen de las filas del .md (no de la IA), con chequeos y confirmación por año vecino.
// El criterio de deuda que se le pasa a la IA: el del club si hay precedente aprendido, si no el por defecto (club-data-mapping/referencia/formato-simplificado.md, "grossDebt").
export function criterioDeudaDe(familias) {
  return familias.length ? `el que el club usa en otros años: la suma de las líneas "${familias.join('" + "')}" (o sus equivalentes en este documento).`
    : 'DEUDA FINANCIERA: préstamos y obligaciones bancarias o financieras, corriente + no corriente (no el total del pasivo, no las cuentas por pagar comerciales).';
}

// El contexto de un año para la escalera: sus filas, su escala, los precedentes del club (con la escala de cada uno), el año anterior cargado
// y las filas del documento siguiente. `conocidos[cual][anio]` = el valor cargado en el sitio.
export function contexto({ d, anios, a, cual, filasDe, conocidos }) {
  const filas = filasDe(a.md);
  const factor = escalaDe(a.md, a.anio, filas, d.revenueLinesByYear?.[a.anio], anios);
  const precedentes = Object.entries(conocidos[cual]).filter(([y]) => y !== a.anio).sort(([x], [y]) => Math.abs(x - a.anio) - Math.abs(y - a.anio)).slice(0, 3)
    .map(([y, v]) => { const o = anios.find((z) => z.anio === y && z.md); return o ? { anio: y, valor: v, filas: filasDe(o.md), factor: escalaDe(o.md, y, filasDe(o.md), d.revenueLinesByYear?.[y], anios) } : null; }).filter(Boolean);
  const sig = anios.find((o) => Number(o.anio) === Number(a.anio) + 1 && o.md);
  const ant = anios.find((o) => Number(o.anio) === Number(a.anio) - 1 && o.md);
  return { filas, factor, precedentes, anterior: conocidos[cual][String(Number(a.anio) - 1)] ?? null, siguiente: sig ? filasDe(sig.md) : null,
    anteriorDoc: ant ? filasDe(ant.md) : null, factorAnterior: ant ? escalaDe(ant.md, ant.anio, filasDe(ant.md), d.revenueLinesByYear?.[ant.anio], anios) : null,
    factorSiguiente: sig ? escalaDe(sig.md, sig.anio, filasDe(sig.md), d.revenueLinesByYear?.[sig.anio], anios) : null,
    extraDeuda: String(ajusteClubODoc(a.md.replace(/\.md$/i, '.pdf'), 'deuda-incluye')?.valor || '').split(';').map((t) => t.trim()).filter(Boolean),
    ingresos: (d.revenueLinesByYear?.[a.anio] || []).reduce((s, l) => s + (l.amountNative || 0), 0) || null }; // para el techo de la compuerta
}
export const aniosDe = (d, S) => Object.entries(d.fiscalYearMeta || {}).map(([y, m]) => ({ anio: y, m, md: mdDeFuente(S, m.sourceId) })).sort((a, b) => Number(a.anio) - Number(b.anio));
// con ajuste `perimetro` (del documento o del club) y páginas de balance de ese perímetro en el .md, las filas del balance del
// OTRO perímetro dejan de contar como balance (para todos los escalones y para los precedentes). Sin ajuste, o si el .md no marca ese
// perímetro en ninguna página, como antes.
const conPerimetro = (filas0, md) => {
  const aj = ajustePerimetroDe(md.replace(/\.md$/i, '.pdf'))?.valor;
  // una fila con las cifras de los dos perímetros en columnas: se queda con las del perímetro del club (sin la lectura B, que
  // era sobre la fila entera).
  const filas = aj ? filas0.map((f) => (f.porPerimetro?.[aj] ? { ...f, valor: f.porPerimetro[aj][0], cifras: f.porPerimetro[aj], lecturaB: undefined, perimetroColumna: aj } : f)) : filas0;
  if (!aj || !filas.some((f) => f.balance && f.perimetro === aj)) return filas;
  // Si el .md trae LOS DOS perímetros, solo cuentan las páginas MARCADAS con el del ajuste: las de balance sin marca (resúmenes del balance
  // dentro del informe de gestión, Juventus 2021-22 págs. 19-20 y 36-37, con las cifras consolidadas) también quedan afuera; si no, la
  // compuerta tomaba la primera de esas. Si trae uno solo, solo sale el otro (no hay): las páginas sin encabezado siguen contando (medido:
  // sacarlas en los documentos de un solo perímetro hacía perder Juventus caja 2008 y metía una suma casual en deuda 2015).
  const dos = filas.some((f) => f.balance && f.perimetro && f.perimetro !== aj);
  return filas.map((f) => (f.balance && (dos ? f.perimetro !== aj : f.perimetro && f.perimetro !== aj) ? { ...f, balance: false } : f));
};
export const filasCache = () => { const c = new Map(); return (md) => { if (!c.has(md)) c.set(md, conPerimetro(filasDelMd(readFileSync(resolve(ROOT, md), 'utf8')), md)); return c.get(md); }; };

// La IA de un documento (guardada o, con ejecutar, pedida). Devuelve { datos } | { ensayo, usd } | { error }.
export async function iaDe(md, filas, club) {
  return porIA({ md, mdText: readFileSync(resolve(ROOT, md), 'utf8'), filas, criterioDeuda: criterioDeudaDe(club?.familias || []), ejecutar: iaDe.ejecutar, modelo: iaDe.modelo || null });
}

export async function medir({ club = null, detalle = false, ia = false, jev = false, ejecutar = false, escalas = false, modelo = null } = {}) {
  const { G, S } = sitio(); iaDe.ejecutar = ejecutar; iaDe.modelo = modelo;
  const casos = [];
  for (const [clubId, d] of Object.entries(G)) {
    if (club && clubId !== club) continue;
    const anios = aniosDe(d, S).filter((x) => x.md); const filasDe = filasCache();
    // --escalas: la escala que eligió factorPorIngresos para cada año (para medir cambios de la escala).
    if (escalas) for (const a of anios) console.log(`  escala ${clubId} ${a.anio}: ${a.md ? escalaDe(a.md, a.anio, filasDe(a.md), d.revenueLinesByYear?.[a.anio], anios) : null}`);
    // Cada año se lee como nuevo: los conocidos son lo cargado en el sitio, SIN el propio año (no se aprende la respuesta).
    for (const a of anios) for (const cual of ['grossDebt', 'cash']) {
      const real = a.m[cual]; if (real == null) continue;
      const conocidos = { [cual]: Object.fromEntries(anios.filter((o) => o.anio !== a.anio && o.m[cual] != null).map((o) => [o.anio, o.m[cual]])) };
      const ctx = contexto({ d, anios, a, cual, filasDe, conocidos });
      casos.push({ clubId, anio: a.anio, cual, real, ctx, md: a.md, ...escalera(ctx.filas, cual === 'cash' ? 'cash' : 'deuda', ctx) });
    }
  }
  // Escalón 1b (Jev): solo para lo que quedó null, una llamada (o la respuesta guardada) por documento, de a 6.
  if (jev) {
    const porMd = new Map(); for (const c of casos.filter((x) => x.valor == null)) porMd.set(c.md, [...(porMd.get(c.md) || []), c]);
    let usd = 0; let ensayos = 0; let errores = 0;
    const uno = async ([md, cs]) => {
      const r = await jevDe(cs[0].ctx.filas, ejecutar, deporteDePdf(md), md);
      if (r.ensayo) { usd += r.usd; ensayos++; return; }
      if (r.error) { errores++; return; }
      usd += r.costo || 0;
      for (const c of cs) { c.ctx = { ...c.ctx, jev: r.datos }; Object.assign(c, escalera(c.ctx.filas, c.cual === 'cash' ? 'cash' : 'deuda', c.ctx)); }
    };
    const cola = [...porMd]; await Promise.all(Array.from({ length: 6 }, async () => { while (cola.length) await uno(cola.shift()); }));
    console.log(ensayos ? `\nJEV (ENSAYO): ${ensayos} documentos sin respuesta guardada, ~US$ ${usd.toFixed(3)} (cota alta). Agregá --ejecutar (lo corre Guido).` : `\nJEV: US$ ${usd.toFixed(4)}${errores ? `, ${errores} error(es)` : ''} (las respuestas guardadas no se vuelven a pagar)`);
  }
  // Escalón 2: solo para lo que quedó null, una llamada (o la respuesta guardada) por documento, de a 6.
  if (ia) {
    const porMd = new Map(); for (const c of casos.filter((x) => x.valor == null)) porMd.set(c.md, [...(porMd.get(c.md) || []), c]);
    let usd = 0; let ensayos = 0; let hechos = 0;
    const uno = async ([md, cs]) => {
      const r = await iaDe(md, cs[0].ctx.filas, cs.find((c) => c.cual === 'grossDebt')?.club);
      if (ejecutar && ++hechos % 10 === 0) process.stderr.write(`  IA: ${hechos}/${porMd.size}\n`);
      if (r.ensayo) { usd += r.usd; ensayos++; return; }
      usd += r.costo || 0; if (r.error) return;
      for (const c of cs) Object.assign(c, escalera(c.ctx.filas, c.cual === 'cash' ? 'cash' : 'deuda', { ...c.ctx, ia: r.datos }));
    };
    const cola = [...porMd]; await Promise.all(Array.from({ length: 6 }, async () => { while (cola.length) await uno(cola.shift()); }));
    console.log(ensayos ? `\nIA (ENSAYO): ${ensayos} documentos sin respuesta guardada, ~US$ ${usd.toFixed(2)}. Agregá --ejecutar (lo corre Guido).` : `\nIA: US$ ${usd.toFixed(2)} (las respuestas guardadas no se vuelven a pagar)`);
  }
  for (const c of casos) c.ok = c.valor != null && Math.abs(c.valor - c.real) <= TOL(c.real);
  const res = (xs) => ({ total: xs.length, iguales: xs.filter((x) => x.ok).length, distintos: xs.filter((x) => x.valor != null && !x.ok).length, sinDato: xs.filter((x) => x.valor == null).length });
  for (const cual of ['grossDebt', 'cash']) {
    const xs = casos.filter((c) => c.cual === cual);
    console.log(`\n## ${cual === 'cash' ? 'CAJA' : 'DEUDA'}: ${JSON.stringify(res(xs))}`);
    for (const e of [0, 1, '1b', 2]) console.log(`   escalón ${e}: ${JSON.stringify(res(xs.filter((x) => x.escalon === e)))}`);
    for (const v of ['año anterior', 'documento siguiente', 'documento anterior']) console.log(`   pasó la compuerta por ${v}: ${JSON.stringify(res(xs.filter((x) => x.validacion === v)))}`);
    const mal = xs.filter((x) => x.valor != null && !x.ok);
    if (mal.length) { console.log(`   DISTINTOS de lo cargado (${mal.length}):`); for (const x of mal) console.log(`     ${x.clubId} ${x.anio}: script ${x.valor} (escalón ${x.escalon}, ${x.validacion}, ${x.como}) · sitio ${x.real} · filas: ${x.filas.map((f) => `"${String(f.etiqueta).slice(0, 40)}" ${f.importe} (pág. ${f.pagina}, L${f.linea})`).join(' + ') || '(ninguna)'}`); }
    if (detalle) for (const x of xs.filter((y) => y.valor == null)) console.log(`     sin dato: ${x.clubId} ${x.anio} (sitio ${x.real}): ${x.como}`);
  }
  return casos;
}

// ---------------------------------------------------------------- COMPLETAR UN CLUB PUBLICADO (--club)
function cierreDe(txt, abre) { let n = 0; for (let i = abre; i < txt.length; i++) { if (txt[i] === '{') n++; else if (txt[i] === '}') { n--; if (!n) return i; } } return -1; }
export const HOY = new Date().toISOString().slice(0, 10);

// RUSIA: el balance del fisco (GIR BO, `bfo-AAAA-datos.json`, el mismo que lee bfo-rusia.mjs) trae renglones de
// código fijo, en miles de rublos: caja = 1250 (Денежные средства и денежные эквиваленты), deuda = 1410 + 1510 (заемные средства de largo y
// de corto plazo). No hay filas que elegir ni escala que adivinar. Compuerta: el balance cuadra (1600 = 1700) y un JSON vecino dice lo mismo
// (el del año siguiente en su columna "previous", o el del año anterior en "current" contra la "previous" de este); ninguno contradice. Un
// 1410 / 1510 vacío es 0 solo con el balance completo (1700 impreso). Caso: Akhmat 2021, caja 411.028 miles; sin 1410 ni 1510, deuda 0.
const CODIGOS_RU = { cash: [1250], grossDebt: [1410, 1510] };
// La caja del esquema NBB belga: la celda que sigue al código 54/58 (la columna del ejercicio), si el balance cuadra (20/58 =
// 10/49, a 1 unidad). Una celda vacía en 54/58 es 0 (el balance está completo). Devuelve { caja, linea, total } o null.
export function cajaNBB(mdText) {
  const L = mdText.split('\n'); const v = {};
  for (let i = 0; i < L.length; i++) {
    if (!L[i].trim().startsWith('|')) continue;
    const c = L[i].trim().replace(/^\||\|$/g, '').split('|').map((x) => x.replace(/\*\*/g, '').trim());
    const k = c.findIndex((x) => x === '54/58' || x === '20/58' || x === '10/49');
    if (k < 1 || v[c[k]]) continue;
    // la columna del ejercicio es la celda que sigue al código (la siguiente es el año anterior): vacía = 0, con texto que no es un número = no sé
    const celda = c[k + 1] ?? ''; const n = parseNumber(celda);
    v[c[k]] = { valor: n ?? (celda ? null : 0), linea: i + 1 };
  }
  if (!v['54/58'] || !v['20/58'] || !v['10/49'] || v['54/58'].valor == null || !v['20/58'].valor) return null;
  if (Math.abs(v['20/58'].valor - v['10/49'].valor) > 1) return null;
  return { caja: Math.abs(v['54/58'].valor), linea: v['54/58'].linea, total: v['20/58'].valor };
}
export function rusiaDeCodigos(clubId, a) {
  const m = /-bfo-(\d{4})-datos$/.exec(a.m.sourceId || ''); if (!m) return null;
  let ev = ''; try { ev = readFileSync(resolve(ROOT, `Admin/carga-clubes/${clubId}.md`), 'utf8'); } catch { return null; }
  const carpeta = (ev.match(/Clubes\/Rusia\/[^\n]+?(?=\/bfo-\d{4}-datos\.md)/) || [])[0]; if (!carpeta) return null;
  const json = (y) => { const f = resolve(ROOT, `${carpeta}/bfo-${y}-datos.json`); try { return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')).balance || null : null; } catch { return null; } };
  const anio = Number(m[1]); const b = json(anio); if (!b) return null;
  const v = (bal, c, col) => (bal?.[`${col}${c}`] == null ? null : Number(bal[`${col}${c}`]));
  const dato = (bal, cual, col) => { if (v(bal, 1700, col) == null) return null; const xs = CODIGOS_RU[cual].map((c) => v(bal, c, col)); if (cual === 'cash') return xs[0]; return xs.reduce((t, x) => t + (x || 0), 0); };
  const out = {};
  for (const cual of ['grossDebt', 'cash']) {
    const cods = CODIGOS_RU[cual].join(' + '); const base = { escalon: 'R', filas: [] };
    if (v(b, 1600, 'current') == null || v(b, 1600, 'current') !== v(b, 1700, 'current')) { out[cual] = { ...base, valor: null, como: `Rusia: el balance no cuadra (1600 ≠ 1700)` }; continue; }
    const x = dato(b, cual, 'current'); if (x == null) { out[cual] = { ...base, valor: null, como: `Rusia: sin ${cods}` }; continue; }
    const chequeos = [];
    const sig = json(anio + 1); const xs = sig ? dato(sig, cual, 'previous') : null; if (xs != null) chequeos.push(['JSON del año siguiente', xs === x, xs]);
    const ant = json(anio - 1); const xa = ant ? dato(ant, cual, 'current') : null; const xp = dato(b, cual, 'previous'); if (xa != null && xp != null) chequeos.push(['JSON del año anterior', xa === xp, xa]);
    const malos = chequeos.filter((c) => !c[1]);
    if (malos.length) { out[cual] = { ...base, valor: null, como: `Rusia, ${cods}: ${x} no coincide con ${malos.map((c) => `${c[0]} (${c[2]})`).join(' ni ')}` }; continue; }
    if (!chequeos.length) { out[cual] = { ...base, valor: null, como: `Rusia, ${cods}: ${x}, ningún JSON vecino para comparar` }; continue; }
    out[cual] = { ...base, valor: r6(x / 1000), validacion: chequeos[0][0], como: `Rusia, balance del fisco: código ${cods} = ${x} miles de RUB (bfo-${anio}-datos.json)` };
  }
  return out;
}

// ============================================================================
// tools/caja-deuda-propuestas.mjs — las propuestas de caja y deuda de la escalera (precedente, vocabulario, IA y Jev): una función por escalón
// Mudado de tools/caja-deuda.mjs sin cambiar una línea (salvo `export`); tools/caja-deuda.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { normalizar, CAJA_RE, DEUDA_FINANCIERA_RE, TOTAL_PASIVO_RE, esTotal } from './vocabulario.mjs';
import { deporteEnFrase } from './deporte-club.mjs';
import { esTotalBalance, tablasResumen, soloTablaDelBalance, totalDelBalance, dedupe, filtroDe } from './caja-deuda-md.mjs';
import { TOL, parCorrienteYNoCorriente } from './caja-deuda.mjs';

const ROOT = resolve(import.meta.dirname, '..');

export const TOTAL_PASIVO_PLURAL_RE = /^[\s*]*total (?:de |del )?pasivos?\b/u;

// ================================================================ LA ESCALERA (ver cabecera)

// Qué filas (1 a `max`) del balance de un año del club, con la escala de ESE documento, suman lo cargado. Las familias si hay UNA sola
// combinación (la más chica); si hay varias, ninguna (ambiguo).
export function aprender(filas, valorSitio, factor, { max = 3, filtro = () => true } = {}) {
  if (!factor) return null;
  const cand = dedupe(filas.filter((f) => f.balance && !esTotal(f.etiqueta) && f.valor > 0 && filtro(f))).slice(0, 80);
  for (let k = 1; k <= max; k++) {
    if (k === 3 && cand.length > 45) continue; // combinatoria: con muchas filas, solo 1 y 2
    const hallados = new Map();
    const rec = (desde, elegidas, suma) => {
      if (elegidas.length === k) { if (Math.abs(suma * factor - valorSitio) <= TOL(valorSitio)) { const fams = [...new Set(elegidas.map((f) => f.familia))].sort(); if (fams.length === k) hallados.set(fams.join(' + '), fams); } return; }
      for (let j = desde; j < cand.length; j++) rec(j + 1, [...elegidas, cand[j]], suma + cand[j].valor);
    };
    rec(0, [], 0);
    if (hallados.size === 1) return [...hallados.values()][0];
    if (hallados.size > 1) return null;
  }
  return null;
}
// Las familias que usa el club: las del primer precedente (el año cargado más cercano) que se puede aprender.
// PRECEDENTE CONTRADICHO: aprender() encuentra a veces filas que suman lo cargado por
// casualidad, y la compuerta no lo ataja (el documento vecino tiene las mismas filas y "confirma"). Por eso las familias aprendidas se
// prueban en los OTROS precedentes del club (las mismas filas de propuestaPrecedente, con el par corriente + no corriente): si en alguno
// dan lo cargado, sirven; si en todos los que tienen esas filas dan otra cosa, se descarta y se prueba el precedente siguiente; sin otro
// año donde probarlas, como antes. Caso: Porto 2019, caja 7.392.033 = "Responsabilidades por benefícios pós-emprego" + "Resultado líquido
// do exercício" (en 2016-2018 esas filas dan 51,6 / 35,6 / 31,3 M contra 7,4 / 14,7 / 29,0 M cargados); proponía la caja de 2022 y 2023.
// Benfica 2022, deuda = "Ativos tangíveis" + "Fornecimentos e serviços externos"; proponía la deuda de 2023, 2025 y 2026.
function contradicho(familias, p, precedentes, cual) {
  const da = (q) => { const pr = propuestaPrecedente(q.filas, { familias, anio: p.anio }, cual); return pr ? pr.filas.reduce((s, f) => s + f.valor, 0) * q.factor : null; };
  const probados = precedentes.filter((q) => q !== p && q.valor && q.factor).map((q) => ({ q, v: da(q) })).filter((x) => x.v != null);
  return probados.length > 0 && !probados.some(({ q, v }) => Math.abs(v - q.valor) <= TOL(q.valor));
}
export function familiasDelClub(precedentes, cual) {
  for (const p of precedentes) {
    if (!p.valor) continue;
    const familias = aprender(p.filas, p.valor, p.factor, { max: cual === 'cash' ? 2 : 3, filtro: filtroDe(cual) });
    if (familias && !contradicho(familias, p, precedentes, cual)) return { familias, anio: p.anio };
  }
  return null;
}

// ESCALÓN 0: las filas de este documento con las familias del club.
export function propuestaPrecedente(filas, club, cual = null) {
  if (!club) return null;
  // EN DEUDA, EL PAR DE LA FAMILIA: si en este documento la familia del precedente está partida en no corriente + corriente
  // (parCorrienteYNoCorriente, la misma regla del escalón 1), se proponen las dos filas, y en el documento vecino se busca el mismo par.
  // Caso: Rio Ave 2024 y 2025, precedente 2023 "Financiamentos obtidos" (ese año solo corriente); 2025 tiene no corriente 424.305,56 (L333)
  // y corriente 5.087.499,71 (L343), y se proponía solo la primera.
  const filasDe = (doc) => { const out = []; for (const fam of club.familias) { const par = cual === 'deuda' ? parCorrienteYNoCorriente(doc, fam) : null; if (par) { out.push(...par); continue; } const f = doc.find((x) => x.balance && x.familia === fam); if (!f) return null; out.push(f); } return out; };
  const elegidas = filasDe(filas); if (!elegidas) return null;
  const conPar = cual === 'deuda' && club.familias.some((fam) => parCorrienteYNoCorriente(filas, fam));
  return { escalon: 0, filas: elegidas, como: `precedente del club (${club.anio}: ${club.familias.join(' + ')})${conPar ? ', con corriente + no corriente' : ''}`, ...(conPar ? { enOtroDoc: (doc) => filasDe(doc) } : {}) };
}
// En OTRO documento del club, el total de su nota de efectivo (la tabla con una fila de caja que termina en un total que suma sus filas):
// lo usa la compuerta para la propuesta "partes de la nota", porque las filas cambian de nombre entre años (Fortaleza 2025:
// "Bancos nacionales" / "Bancos en el exterior"), y el total no. Devuelve [fila del total] o null.
function totalDeNotaDeCaja(filas) {
  for (const f of filas.filter((x) => x.balance && CAJA_RE.test(x.norm) && !esTotal(x.etiqueta))) {
    const i = filas.indexOf(f); let a = i; while (a > 0 && filas[a - 1].linea === filas[a].linea - 1) a--;
    let b = i; while (b < filas.length - 1 && filas[b + 1].linea === filas[b].linea + 1) b++;
    const tabla = filas.slice(a, b + 1); const tot = tabla.find((x) => x.linea > f.linea && esTotal(x.etiqueta));
    const partes = tot ? tabla.filter((x) => x.linea < tot.linea && !esTotal(x.etiqueta)) : [];
    if (tot && !totalDelBalance(tot) && partes.length > 1 && Math.abs(partes.reduce((s, x) => s + x.valor, 0) - tot.valor) <= 1) return [tot];
  }
  return null;
}
// ESCALÓN 1: las filas del balance con nombre de caja / deuda financiera (una por familia), o "ninguna fila" de deuda (= 0).
export function propuestaVocabulario(filas, cual, club, extraDeuda = []) {
  // ESCALÓN 0 del diccionario: términos de deuda propios del club (ajuste manual `deuda-incluye`), al principio de la etiqueta.
  const extra = cual === 'deuda' ? extraDeuda.map((t) => normalizar(t)).filter(Boolean) : [];
  const re = { test: (n) => (cual === 'cash' ? CAJA_RE : DEUDA_FINANCIERA_RE).test(n) || extra.some((t) => n.startsWith(t)) };
  // JERARQUÍA Y LADO, para un balancete por cuenta: (a) una fila hija de otra que también coincide sale (la de arriba ya la
  // suma): hija = su código de cuenta empieza con el de la otra, o, sin códigos, viene pegada abajo (hasta 2 líneas) con el mismo importe;
  // (b) en deuda, una fila con marca D (deudora: activo) no es deuda. Caso: Novorizontino 2016, "2.2.01 EMPRESTIMOS E FINANCIAMENTOS" y
  // "2.2.01.01 EMPRESTIMOS E MUTUOS" (15.965.049 cada una) se sumaban, más "1.2.02.05 CONTRATOS DE MUTUOS 4.000 D" (un préstamo dado).
  const resumen = tablasResumen(filas, cual); // las filas de una tabla resumen de varios años no cuentan
  const cand = filas.filter((f) => f.balance && re.test(f.norm) && !esTotal(f.etiqueta) && !(cual === 'deuda' && f.cd === 'D') && !resumen.has(f.tabla));
  const hija = (f) => cand.some((g) => g !== f && ((g.codigo && f.codigo && f.codigo.length > g.codigo.length && f.codigo.startsWith(g.codigo))
    || (!f.codigo && g.linea < f.linea && f.linea - g.linea <= 2 && g.valor === f.valor)));
  const m = dedupe(soloTablaDelBalance(cand.filter((f) => !hija(f)), filas, cual)); // (deuda, mejora 1)
  // EL TOTAL DE LA NOTA DE DEUDA: si no hay filas de deuda pero sí el TOTAL de una nota de deuda financiera, se propone ese
  // total (misma compuerta). Antes caía en "ninguna fila = 0". Caso: Fortaleza 2018 y 2019, cuya nota es solo "Total Prestamos y Sobregiros
  // Bancarios 4,398 / 794" (2018 L396, 2019 L582): se escribía deuda 0, y la compuerta lo dejaba pasar porque 2017 también es 0.
  if (!m.length && cual === 'deuda') {
    // En cualquier página (no solo las del balance): Fortaleza trae solo notas, y la nota 12 de 2018 no está en una página "de balance".
    const tots = dedupe(filas.filter((f) => esTotal(f.etiqueta) && re.test(f.norm.replace(/^[\s*]*total(es)?\s+(de\s+|del\s+)?/u, ''))));
    if (tots.length === 1) return { escalon: 1, filas: tots, como: `vocabulario: el total de la nota de deuda ("${tots[0].etiqueta}")` };
    if (tots.length > 1) return null;
  }
  if (!m.length) {
    const conTotalPasivo = filas.some((f) => f.balance && esTotalBalance(f.norm) && (TOTAL_PASIVO_RE.test(f.norm) || TOTAL_PASIVO_PLURAL_RE.test(f.norm)));
    if (cual === 'deuda' && conTotalPasivo && club && club.familias.every((fam) => DEUDA_FINANCIERA_RE.test(fam))) return { escalon: 1, ninguna: true, familias: club.familias, filas: [], como: 'vocabulario: ninguna fila de deuda financiera (balance completo) = 0' };
    return null;
  }
  const porFam = new Map(); for (const f of m) porFam.set(f.familia, [...(porFam.get(f.familia) || []), f]);
  // CORRIENTE + NO CORRIENTE DE LA MISMA ETIQUETA: en deuda, una familia
  // con EXACTAMENTE dos filas, una a cada lado del total del pasivo no corriente del mismo balance (a menos de 40 líneas), es la deuda partida
  // en sus dos plazos: se propone la suma. Más de dos (consolidado + separado en el mismo .md) sigue sin decidir. En el documento siguiente la
  // compuerta busca el mismo par (enOtroDoc), no la primera fila de la familia. Caso: Juventus 2006-07, "Loans and other financial liabilities"
  // 17.194.480 (L1656, no corriente) + 1.517.777 (L1663, corriente) = 18.712.257.
  const repetidas = [...porFam.entries()].filter(([, xs]) => xs.length > 1);
  if (repetidas.length) {
    if (cual !== 'deuda') return null; // una familia con dos importes: no hay UNA propuesta
    const pares = repetidas.map(([fam]) => [fam, parCorrienteYNoCorriente(filas, fam)]);
    if (pares.some(([, p]) => !p)) return null;
    let unicas = m.filter((f) => !repetidas.some(([fam]) => fam === f.familia));
    // LA TABLA DEL PAR: si los pares están todos en UNA tabla, las demás familias cuentan solo
    // si están en esa misma tabla (las de una tabla resumen que la regla de abajo mezclaba quedan afuera). Casos (ensayo, gratis): Braga
    // 2016 "Financiamentos obtidos" 101.544 + 3.104.023 (pág. 44, L1105 y L1111); Famalicão 2021, Gil Vicente 2023-2024, Leixões 2023-2024,
    // Académico de Viseu 2022, Benfica 2008.
    const tablasPar = new Set(pares.flatMap(([, p]) => p).map((f) => f.tabla ?? 'texto'));
    if (tablasPar.size === 1) unicas = unicas.filter((f) => tablasPar.has(f.tabla ?? 'texto'));
    const elegidas = [...unicas, ...pares.flatMap(([, p]) => p)];
    // (deuda, mejora 2) TODAS EN LA MISMA TABLA: el par y las otras familias tienen que estar en una sola tabla del balance. Benfica 2023
    // sumaba el par "Empréstimos obtidos" del balance (pág. 109) con "Empréstimos bancários" y "Empréstimos obrigacionistas" de la tabla
    // resumen de la pág. 37, que son su desglose. Mezcladas, no decide.
    if (new Set(elegidas.map((f) => f.tabla ?? 'texto')).size > 1) return null;
    return { escalon: 1, filas: elegidas, como: `vocabulario: ${pares.map(([fam]) => `"${fam}" corriente + no corriente`).join(', ')}`,
      enOtroDoc: (sig) => { const out = []; for (const f of unicas) { const x = sig.find((y) => y.balance && y.familia === f.familia && y.cifras.length > 1); if (!x) return null; out.push(x); } for (const [fam] of pares) { const p = parCorrienteYNoCorriente(sig, fam); if (!p || !p.every((y) => y.cifras.length > 1)) return null; out.push(...p); } return out; } };
  }
  if (cual === 'cash' && m.length > 1) return null;
  // UNA PARTE DE LA NOTA DE EFECTIVO: si la fila de caja está en una tabla que termina en un
  // total y las filas de esa tabla suman ese total, se PROPONEN todas esas filas (la caja es una parte, el efectivo es el total). Pasa por la
  // misma compuerta (cada fila conserva su familia, así se busca igual en el documento vecino). Caso: Fortaleza 2024, nota 6: "Bancos 97.365 /
  // Caja 430 / TOTAL 97.795" (L520-522); se proponía "Caja 430" y la compuerta lo dejaba pasar porque el documento 2025 repite la misma fila.
  if (cual === 'cash') {
    const f = m[0]; const i = filas.indexOf(f);
    let a = i; while (a > 0 && filas[a - 1].linea === filas[a].linea - 1) a--;
    let b = i; while (b < filas.length - 1 && filas[b + 1].linea === filas[b].linea + 1) b++;
    const tabla = filas.slice(a, b + 1); const tot = tabla.find((x) => x.linea > f.linea && esTotal(x.etiqueta));
    const partes = tot ? tabla.filter((x) => x.linea < tot.linea && !esTotal(x.etiqueta)) : [];
    // el total NO puede ser un total del balance ("Total dos Ativos Correntes"): ahí la tabla es el balance, no la nota de
    // efectivo. Caso: Famalicão 2022-23, la caja salía 10,68 M (todo el activo corriente) en vez de 1.159.543,44 (L404).
    if (tot && !totalDelBalance(tot) && partes.length > 1 && Math.abs(partes.reduce((s, x) => s + x.valor, 0) - tot.valor) <= 1) return { escalon: 1, filas: partes, enOtroDoc: totalDeNotaDeCaja, como: `vocabulario: "${f.etiqueta}" es una parte de la nota; se proponen sus filas, que suman "${tot.etiqueta}" ${tot.valor}` };
  }
  return { escalon: 1, filas: m, como: 'vocabulario' };
}
// ESCALÓN 2: las líneas que eligió la IA (tienen que ser filas del balance).
export function propuestaIA(filas, ia, cual) {
  const lineas = (cual === 'cash' ? ia?.caja : ia?.deuda)?.lineas || []; if (!lineas.length) return null;
  const elegidas = lineas.map((n) => filas.find((f) => f.linea === n && f.balance)); if (elegidas.some((f) => !f)) return null;
  return { escalon: 2, filas: elegidas, como: 'IA' };
}

// ESCALÓN 1b: JEV, la IA barata (typesafe.ai, ~US$ 42 por mil millones de tokens), antes
// de la IA cara y sin reglas por idioma (los griegos del lote 71 no tenían vocabulario: todo caía en Claude). Una llamada por documento: la caja
// es una pregunta de opción cerrada entre las filas del balance ("L430: Ταμειακά διαθέσιμα και ισοδύναμα | 6320395 | 7725899", o "ninguna"); la
// deuda, una pregunta sí/no por fila. Como la IA de hoy, solo PROPONE filas (ni importes ni escala) y decide la MISMA compuerta. Sin total del
// balance (esTotal) en la deuda: el vocabulario tampoco los toma.
export function propuestaJev(filas, jev, cual) {
  const porLinea = (n) => filas.find((f) => f.linea === n && f.balance);
  if (cual === 'cash') { const n = Number(String(jev.caja || '').replace(/^L/, '')); const f = n ? porLinea(n) : null; return f ? { escalon: '1b', filas: [f], como: `Jev (confianza ${jev.cajaConf ?? '?'})` } : null; }
  const fs = (jev.deuda || []).map(porLinea).filter((f) => f && !esTotal(f.etiqueta));
  return fs.length ? { escalon: '1b', filas: dedupe(fs), como: `Jev (${fs.length} fila(s) de deuda)` } : null;
}
const CACHE_JEV = resolve(ROOT, 'Generados', '_cache', 'jev-caja-deuda.jsonl');
let claveJev = null;
// LO QUE SE LE MANDA A JEV O A LA IA TIENE TOPE (120 filas del balance, 60.000 caracteres de sus páginas, 150 filas de total): si el documento trae
// más, se dice (regla de Admin/PIPELINE.md «Una tool que decide no lee solo una parte del documento»), para que un «no encontrado» no pase por
// un dato que no se miró. El tope no cambia: lo que se pide (y su caché) queda igual.
export const avisarRecorte = (md, que, usadas, total) => { if (total > usadas) console.log(`  AVISO (recorte): ${md}: ${que}: se mandaron ${usadas} de ${total}; el resto no se miró`); };
export async function jevDe(filas, ejecutar, deporte, md = '') {
  const todas = dedupe(filas.filter((f) => f.balance)).filter((f, i, xs) => xs.findIndex((g) => g.linea === f.linea) === i);
  const bal = todas.slice(0, 120); avisarRecorte(md, 'Jev (caja y deuda), filas del balance', bal.length, todas.length);
  if (!bal.length) return { error: 'sin filas del balance' };
  const texto = (f) => `${String(f.etiqueta).slice(0, 120)} | ${f.cifras.join(' | ')}`;
  const state = `Filas del balance (estado de situación financiera) de un club de ${deporteEnFrase(deporte)}, tal cual las leyó el sistema (etiqueta | cifras del año | del año anterior):\n${bal.map((f) => `L${f.linea}: ${texto(f)}`).join('\n')}`;
  const questions = {
    caja: { type: 'choice', instructions: '¿Cuál de estas filas es el EFECTIVO Y EQUIVALENTES (caja y bancos, disponibilidades)? Si ninguna, elegí "ninguna".', criteria: { ...Object.fromEntries(bal.map((f) => [`L${f.linea}`, texto(f)])), ninguna: 'Ninguna fila es efectivo y equivalentes' } },
    ...Object.fromEntries(bal.map((f) => [`d${f.linea}`, { type: 'choice', instructions: `¿La fila L${f.linea} ("${String(f.etiqueta).slice(0, 120)}") es DEUDA FINANCIERA: préstamos, créditos bancarios, bonos u obligaciones financieras (corrientes o no corrientes)? No lo son: proveedores, impuestos, sueldos, ingresos diferidos, provisiones, arrendamientos, totales.`, criteria: { si: 'Es deuda financiera', no: 'No es deuda financiera' } }])),
  };
  const body = { state, model: 'jev-latest', questions };
  return pedirJev(body, CACHE_JEV, ejecutar, (a) => (a.caja?.choice ? { caja: a.caja.choice, cajaConf: a.caja.confidence, deuda: bal.filter((f) => a[`d${f.linea}`]?.choice === 'si').map((f) => f.linea) } : null));
}
// UNA LLAMADA A JEV con caché por (cuerpo del pedido) en `archivo`: { datos } | { ensayo, usd } | { error }. `extraer(answers)` arma los datos
// (null = respuesta inválida, no se guarda). Costo estimado del ensayo: el estado una vez por pregunta (cota alta).
const cachesJev = new Map();
export async function pedirJev(body, archivo, ejecutar, extraer) {
  const { createHash } = await import('node:crypto');
  const clave = createHash('sha1').update(JSON.stringify(body)).digest('hex');
  if (!cachesJev.has(archivo)) { const m = new Map(); if (existsSync(archivo)) for (const l of readFileSync(archivo, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); m.set(j.clave, j); } catch { /* línea rota */ } } cachesJev.set(archivo, m); }
  const cache = cachesJev.get(archivo);
  if (cache.has(clave)) return { datos: cache.get(clave).datos, cache: true };
  const tokens = Math.ceil(JSON.stringify(body).length / 4) * (1 + Object.keys(body.questions).length);
  if (!ejecutar) return { ensayo: true, usd: tokens * 42e-9 };
  if (!claveJev) { const env = resolve(ROOT, 'Admin', 'api-keys', 'jev.env'); const line = existsSync(env) ? readFileSync(env, 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')) : null; if (!line) return { error: `falta ${env} con JEV_API_KEY=...` }; claveJev = line.slice(12).trim(); }
  for (let intento = 0; intento < 4; intento++) {
    let res;
    try { res = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${claveJev}` }, body: JSON.stringify(body) }); }
    catch { await new Promise((r) => setTimeout(r, 2000 * (intento + 1))); continue; }
    if (res.ok) {
      const j = await res.json(); const datos = extraer(j.answers || {});
      if (!datos) return { error: `Jev sin respuesta: ${JSON.stringify(j).slice(0, 160)}` };
      const usd = (j.usage?.input_tokens ?? tokens) * 42e-9;
      const { mkdirSync, appendFileSync } = await import('node:fs');
      mkdirSync(resolve(ROOT, 'Generados', '_cache'), { recursive: true }); appendFileSync(archivo, JSON.stringify({ clave, datos, usd }) + '\n'); cache.set(clave, { datos });
      return { datos, costo: usd };
    }
    const txt = (await res.text()).slice(0, 160);
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 3000 * (intento + 1))); continue; }
    return { error: `Jev HTTP ${res.status}: ${txt}` };
  }
  return { error: 'Jev: reintentos agotados' };
}

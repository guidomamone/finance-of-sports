#!/usr/bin/env node
// ============================================================================
// tools/caja-deuda.mjs — CAJA y DEUDA del balance (fiscalYearMeta.cash y .grossDebt), con el club ya publicado (no va en el lote). Gratis
// salvo los escalones 1b (Jev, centavos por club) y 2 (IA). NUNCA FRENA.
//
// POR QUÉ (plan aprobado por Guido: "enrich the process para tener caja y debt, pero que no tenerlo NO FRENE").
// cargar.mjs escribía grossDebt y cash en null ("sin dato no es cero"), así que todo año cargado por el script quedaba sin el cuadro "Deuda
// bruta / Caja / Deuda neta" del sitio (UC 2018-2021 y 2025), mientras 289 de los 310 años cargados a mano los tienen.
//
// QUÉ ES CADA COSA (club-data-mapping/referencia/formato-simplificado.md, "grossDebt"). El criterio de "deuda" es POR CLUB: Boca usa "Deudas", River "Préstamos", UC "Otros pasivos
// financieros" (corriente + no corriente), Racing el TOTAL del pasivo. Por eso el primer escalón aprende del propio club; para un club sin
// precedente, el criterio por defecto es DEUDA FINANCIERA (préstamos y obligaciones bancarias/financieras, corriente + no corriente), nunca el
// total del pasivo. Caja: efectivo y equivalentes / caja y bancos / disponibilidades.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «caja-deuda.mjs».
//
// USO:
//   node tools/caja-deuda.mjs --medir [--club <clubId>] [--detalle] [--escalas]                         MEDICIÓN sobre los años ya cargados (ver abajo)
//   node tools/caja-deuda.mjs --medir --ia [--ejecutar]                                       ...con el escalón 2 (sin --ejecutar: ensayo; con: API)
//   node tools/caja-deuda.mjs --medir --ia --modelo opus|sonnet [--ejecutar]                  ...el escalón 2 con ESE modelo, para comparar:
//        respuestas aparte (.caja-deuda-ia.<modelo>.json), que no pisan ni usan las guardadas; solo medición, no escribe nada más.
//   node tools/caja-deuda.mjs --medir --jev [--ejecutar]                                      ...con el escalón 1b, Jev (sin --ejecutar: ensayo con cota alta)
//   node tools/caja-deuda.mjs --personal --medir [--ejecutar]                                 el dato "personal" (staffCost) contra Admin/mediciones/personal-verdad.tsv
//   node tools/caja-deuda.mjs --personal --club <id> [--ejecutar] [--escribir]                completarlo en un club publicado
//   node tools/caja-deuda.mjs --personal --ver-candidatos --club <id> --anio <AAAA>           las filas de total que recibiría Jev (gratis)
//   node tools/caja-deuda.mjs --personal --club <id> --partir [--escribir]                    (229) ajustes que separan staffCost de la fila global
//        de gasto; después verificar.mjs + cargar.mjs --reemplazar --escribir por año
//   node tools/caja-deuda.mjs --club <clubId> [--ejecutar] [--escribir]                       COMPLETAR un club ya publicado (ver abajo)
// ============================================================================

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { readdirSync } from 'node:fs';
import { derivado } from './rutas.mjs';
import * as EV from './evidencia-club.mjs';
import { ajusteDe, ajusteDelAnio, ajusteClubODoc, ajustePerimetroDe } from './ajustes.mjs';
import { normalizar, claveFamilia, CAJA_RE, DEUDA_FINANCIERA_RE, TITULO_BALANCE_RE, TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE, FLUJO_O_PATRIMONIO_RE, esTotal } from './vocabulario.mjs';
import { archivosData, rutaData } from './data-clubes.js';
import { modificarClub } from './club-json.mjs'; // el JSON es la fuente de cada club
import { candidatosPersonal, cierreDeMd, registroDocs, medirPersonal, completarPersonal } from './costo-personal.mjs'; // el costo de personal, mudado tal cual
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { categoriaDeSueldos, deporteDeClub, deporteDePdf, deporteEnFrase } from './deporte-club.mjs'; // la categoría de sueldos es la del deporte del club
import { formaImposible } from './verify-numbers.mjs';
import { coincide, parseNumber, filasDelMd, esTotalBalance, tablasResumen, soloTablaDelBalance, totalDelBalance, dedupe, r6, cita, filtroDe } from './caja-deuda-md.mjs';
export { coincide, parseNumber, filasDelMd, r6 } from './caja-deuda-md.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const PAG_RE = /^---\s*pág\.\s*(\d+)\s*---/i;
const IMPORTE_RE = /\(?-?\d{1,3}(?:[.,' ]\d{3})+(?:[.,]\d{1,2})?\)?|\(?-?\d+[.,]\d{1,2}\)?|\(?-?\b\d{1,}\b\)?/g;
const FACTORES = [1e-6, 1e-3, 1];
export const TOL = (v) => Math.max(0.0015, Math.abs(v) * 1e-4);
// Dos números por debajo del piso de la tolerancia (0,0015 millones = 1.500 unidades) coinciden solo si son el mismo número: con
// el piso, 6,80 (una nota leída como importe, AEK 2020) "coincidía" con 31,92 (un porcentaje de la fila de ratios del documento siguiente).
const TOTAL_PASIVO_PLURAL_RE = /^[\s*]*total (?:de |del )?pasivos?\b/u;

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
function propuestaPrecedente(filas, club, cual = null) {
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
function propuestaVocabulario(filas, cual, club, extraDeuda = []) {
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
function propuestaIA(filas, ia, cual) {
  const lineas = (cual === 'cash' ? ia?.caja : ia?.deuda)?.lineas || []; if (!lineas.length) return null;
  const elegidas = lineas.map((n) => filas.find((f) => f.linea === n && f.balance)); if (elegidas.some((f) => !f)) return null;
  return { escalon: 2, filas: elegidas, como: 'IA' };
}

// ESCALÓN 1b: JEV, la IA barata (typesafe.ai, ~US$ 42 por mil millones de tokens), antes
// de la IA cara y sin reglas por idioma (los griegos del lote 71 no tenían vocabulario: todo caía en Claude). Una llamada por documento: la caja
// es una pregunta de opción cerrada entre las filas del balance ("L430: Ταμειακά διαθέσιμα και ισοδύναμα | 6320395 | 7725899", o "ninguna"); la
// deuda, una pregunta sí/no por fila. Como la IA de hoy, solo PROPONE filas (ni importes ni escala) y decide la MISMA compuerta. Sin total del
// balance (esTotal) en la deuda: el vocabulario tampoco los toma.
function propuestaJev(filas, jev, cual) {
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
async function jevDe(filas, ejecutar, deporte, md = '') {
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

// LA COMPUERTA, la misma para los tres escalones.
// las cifras del documento SIGUIENTE se pasan a millones con la escala de ESE documento (factorSiguiente), no con la de este;
// si no se conoce (su año no está cargado), la de este, como antes. Caso: Novorizontino 2021 (en miles): caja 0,952 contra 951.927 del 2022
// (en reales), el mismo número.
// Las dos filas de una familia de deuda, una a cada lado del total del pasivo no corriente del mismo balance; si no son
// exactamente dos así, null.
// (deuda, mejora 2) también el portugués de Portugal: "Total do passivo não corrente" (Porto 2016-17 L867) y "Total - Passivo não corrente"
// (AVS 2023-24 L506).
const TOTAL_NO_CORRIENTE_RE = /^[\s*]*total\s*(-\s*)?(de\s+|del\s+|do\s+)?(non[\s-]?current\s+liabilities|pasivos?\s+no\s+corrientes?|passivos?\s+nao\s+(circulante|corrente)s?|exigivel\s+a\s+longo\s+prazo)/u;
// (caja y deuda, mejora 2) Títulos de sección del pasivo, sobre la etiqueta normalizada y sin ":"; y lo que cierra la sección.
// y los del formato POC portugués: "Dívidas de Terceiros - m/longo prazo", "Dívidas a Terceiros – médio e longo prazo",
// "Dívidas a Terceiros - curto prazo" (Sporting 2003-04 L536 y L540).
const SECCION_PNC_RE = /^(passivo|pasivo)s?\s+(nao\s+corrente|no\s+corriente|nao\s+circulante)s?$|^non[\s-]?current\s+liabilities$|^dividas?\s+(a|de)\s+terceiros\s*[-–]\s*(m\s*\/\s*l(ongo)?|medio\s+e\s+longo|longo)\s+prazo$/u;
const SECCION_PC_RE = /^(passivo|pasivo)s?\s+(corrente|corriente|circulante)s?$|^current\s+liabilities$|^dividas?\s+(a|de)\s+terceiros\s*[-–]\s*curto\s+prazo$/u;
const SECCION_FIN_RE = /^(ativo|activo|assets|capital|patrimonio|equity|fundos proprios)\b/u;
const TOTAL_PASIVO_FIN_RE = /^total\s+(do\s+|del\s+|de\s+)?(passivo|pasivo|liabilities)s?$|^total\s+(do\s+)?capital\s+proprio\s+e\s+(do\s+)?passivo/u;
function parCorrienteYNoCorriente(filas, fam) {
  const xs = dedupe(soloTablaDelBalance(filas.filter((f) => f.balance && f.familia === fam && !esTotal(f.etiqueta) && f.cd !== 'D'), filas, 'deuda')); // (deuda, mejora 1)
  if (xs.length !== 2 || xs[1].linea - xs[0].linea > 40) return null;
  const entre = filas.some((f) => f.linea > xs[0].linea && f.linea < xs[1].linea && TOTAL_NO_CORRIENTE_RE.test(f.norm));
  if (entre) return xs;
  // (caja y deuda, mejora 2) sin total con nombre entre las dos: el divisor son los títulos de sección (Portugal: el subtotal del no corriente
  // es una fila sin etiqueta y la tabla dice "Passivo não corrente:" y "Passivo corrente:"; 154 de 186 documentos). Una fila en cada sección.
  // Caso: Arouca 2021-22, "Financiamentos obtidos" 31.725,00 (no corriente, L295) + 3.525,00 (corriente, L302).
  const secs = new Set(xs.map((f) => f.seccion));
  return secs.has('no-corriente') && secs.has('corriente') ? xs : null;
}
// LA ESCALA EN LA COMPUERTA. La escala de un documento es una sola (la
// del estado de resultados), pero hay documentos con dos (Juventus 2002-06: posición financiera en €000 y estado en euros; Novorizontino
// balanco-2016: resumen en milhares y balancete en reais). Escalera:
//   ESCALÓN 0  la escala del documento: si la compuerta pasa Y el valor es PLAUSIBLE (entre 1/100 y 100 veces el año cargado más cercano
//              del mismo dato, si lo hay) ──► dato (como antes)
//   ESCALÓN 1  si no pasa o no es plausible: las otras escalas, aplicadas a las filas de la propuesta (y, en el documento siguiente, a sus
//              cifras también); se acepta solo si UNA da ok y plausible
//   nada ──► lo de la escala del documento (como antes)
// Caso: Juventus 2005, "4) Due to banks" 24,973,807: con la escala del documento (miles) daba 24.973,8 millones y el documento siguiente
// (también en miles) lo confirmaba; ahora no es plausible contra 2006 (14,93) y en unidades da 24,973807, el cargado. Medido en los 519
// años de todos los clubes: +5 iguales (Juventus deuda 2005 y 2006, Fluminense 2025 caja y deuda, Mönchengladbach 2024 caja), 0 empeoran.
// TECHO POR PROPORCIÓN CON LOS INGRESOS DEL AÑO, el mismo de audit.js (caja-deuda-desproporcionada): caja hasta 3
// veces los ingresos, deuda hasta 20. Medido en lo cargado: máximo real 2,53 (caja, Atlético Mineiro 2023) y 13,7 (deuda, Novorizontino
// 2015). Un valor por encima no es plausible: se prueban las otras escalas como con la referencia; si ninguna cae debajo del techo, NO PASA
// (con la referencia, en cambio, queda el valor de la escala del documento, como antes). Casos: Hellas Verona 2024
// deuda 1,8e16, Milan 2009 deuda 163.739 M, Inter 2021 caja 97.884 M, Lazio 2008-2019.
// PISO DE CAJA, el espejo del techo y el mismo de audit.js: caja por debajo de 7e-5 veces los
// ingresos es una tabla resumen en miles leída en unidades (el documento vecino tiene la misma tabla y la confirma). Casos: Porto 2016 0,0074
// M con 154 M (4,8e-5, ya corregido con ajustes); Milan 2008 0,0048 M con 237,9 M ("Prospetto settoriale (in migliaia di Euro)", L3109);
// Lazio 2001 0,51 M ITL con 334.514 M (L809). Las cajas chicas de verdad quedan arriba: Nottingham Forest 2024 1,0e-4, Casa Pia 2025
// 1,5e-4. Solo caja: una deuda puede ser casi 0. Medido: --medir idéntico; en el ensayo de todos los clubes cambian solo Milan 2008 y Lazio
// 2001 (quedan sin dato: con la otra escala tampoco pasan).
const TECHO = { cash: 3, deuda: 20 };
const PISO = { cash: 7e-5 };
export function compuerta(prop, ctx) {
  const { factor, referencia = null, ingresos = null, cual = null } = ctx;
  const techo = TECHO[cual] ?? null; const piso = PISO[cual] ?? null;
  const sobrePiso = (r) => !(piso && ingresos > 0 && r.valor > 0) || r.valor >= piso * ingresos;
  const bajoTecho = (r) => (!(techo && ingresos > 0 && r.valor > 0) || r.valor <= techo * ingresos) && sobrePiso(r);
  const plausible = (r) => bajoTecho(r) && (!(referencia > 0) || !(r.valor > 0) || (r.valor / referencia <= 100 && r.valor / referencia >= 0.01));
  const base = evaluar(prop, ctx, null);
  if (base.ok && plausible(base)) return base;
  const alts = FACTORES.filter((x) => x !== factor).map((x) => [x, evaluar(prop, ctx, x)]).filter(([, r]) => r.ok && plausible(r));
  if (alts.length === 1) return { ...alts[0][1], escalaAlternativa: alts[0][0] };
  if (base.ok && !sobrePiso(base)) return { ...base, ok: false, motivo: `${base.valor} es ${(base.valor / ingresos).toExponential(1)} veces los ingresos del año (piso ${piso}) y ninguna otra escala cae entre el piso y el techo` };
  if (base.ok && !bajoTecho(base)) return { ...base, ok: false, motivo: `${base.valor} es ${(base.valor / ingresos).toFixed(1)} veces los ingresos del año (techo ${techo}) y ninguna otra escala cae debajo` };
  return base;
}
// La compuerta con UNA escala: la del documento (over null) o una forzada para las filas de la propuesta (over).
function evaluar(prop, { factor, anterior = null, siguiente = null, factorSiguiente = null, cual = null, anteriorDoc = null, factorAnterior = null }, over) {
  if (over == null && !factor) return { ok: false, valor: null, motivo: 'sin escala del documento' };
  const esc = over ?? factor;
  // LA FAMILIA DE LA FILA: deuda nunca con una fila de caja, caja nunca con una fila de deuda financiera (el mismo filtro que
  // los escalones 0 y 1 aplican al buscar, ahora también para la propuesta de la IA). La comparación con el vecino no lo atrapa: si el error
  // se repite en los dos años, coincide. Caso: Novorizontino 2024 y 2025, la IA propuso "Caixa e equivalentes de caixa" como deuda.
  const otraFamilia = (prop.filas || []).find((f) => (cual === 'deuda' ? CAJA_RE : cual === 'cash' ? DEUDA_FINANCIERA_RE : null)?.test(f.norm || ''));
  if (otraFamilia) return { ok: false, valor: null, motivo: `la fila "${otraFamilia.etiqueta}" es de ${cual === 'deuda' ? 'caja' : 'deuda'}, no de ${cual === 'deuda' ? 'deuda' : 'caja'}` };
  const valor = prop.ninguna ? 0 : r6(prop.filas.reduce((a, f) => a + f.valor, 0) * esc);
  // LA TRAMPA DEL CERO: filas propuestas que suman 0 no prueban nada, porque el vecino también da 0 y
  // "coincide". Casos (medición de Jev en todos los clubes): Köln 2024, Jev propuso una sola fila de deuda en 0 (sitio 37,86 M); Panetolikos
  // 2022, la IA propuso "Δάνεια" + "Τραπεζικά δάνεια" en 0 y se publicó deuda 0, mientras su cuadro de vencimientos (L180) imprime "Δανεισμός
  // 675.223,80". Para todos los escalones: no pasa y la propuesta baja al siguiente. Un 0 de verdad sale solo por "ninguna fila de deuda"
  // (prop.ninguna, escalón 1: balance completo con su total del pasivo y el club sin otras filas de deuda).
  if (!prop.ninguna && valor === 0) return { ok: false, valor, motivo: 'las filas propuestas suman 0 (un cero sale solo por "ninguna fila")' };
  const chequeos = []; // [nombre, coincide, detalle]
  if (anterior != null) {
    if (prop.ninguna) chequeos.push(['año anterior', Math.abs(anterior) <= TOL(0), `cargado ${anterior}`]);
    else if (prop.filas.every((f) => f.cifras.length > 1)) { const prev = r6(prop.filas.reduce((a, f) => a + f.cifras[1], 0) * esc); chequeos.push(['año anterior', coincide(prev, anterior), `${prev} contra ${anterior} cargado`]); }
  }
  // una fila que no está en las páginas del balance (una nota) se busca también en las notas del documento vecino.
  if (siguiente) {
    if (prop.ninguna) { const fs = siguiente.filter((x) => x.balance && prop.familias.includes(x.familia) && x.cifras.length > 1); chequeos.push(['documento siguiente', fs.every((x) => x.cifras[1] === 0), fs.length ? `${fs.map((x) => x.cifras[1]).join(' + ')} en el siguiente` : 'el siguiente tampoco tiene esas filas']); }
    else { const fs = prop.enOtroDoc ? (prop.enOtroDoc(siguiente) || [null]) : prop.filas.map((f) => siguiente.find((x) => (x.balance || !f.balance) && x.familia === f.familia && x.cifras.length > 1)); if (fs.every(Boolean)) { const prev = r6(fs.reduce((a, x) => a + x.cifras[1], 0) * (factorSiguiente ?? factor)); let okS = coincide(prev, valor); if (!okS && over != null) { const p2 = r6(fs.reduce((a, x) => a + x.cifras[1], 0) * over); okS = coincide(p2, valor); } /* con una escala forzada, el siguiente también puede ir en esa escala */ chequeos.push(['documento siguiente', okS, `${prev} en el siguiente`]); } }
  }
  // DOCUMENTO ANTERIOR: la cifra del año anterior de la fila, contra la del año en el documento anterior (la
  // misma fila, la misma lectura). Es el chequeo del documento siguiente, hacia atrás. AEK 2019 leído con la nota ("6.8"): su "año anterior"
  // es 7.935.425 y el documento de 2018 tiene 1.650.370; sin la nota, 1.650.370 contra 1.650.370.
  if (anteriorDoc && !prop.ninguna && prop.filas.every((f) => f.cifras.length > 1)) {
    const fs = prop.enOtroDoc ? (prop.enOtroDoc(anteriorDoc) || [null]) : prop.filas.map((f) => anteriorDoc.find((x) => (x.balance || !f.balance) && x.familia === f.familia));
    if (fs.every(Boolean)) {
      const esteAnt = r6(prop.filas.reduce((a, f) => a + f.cifras[1], 0) * esc); const delAnt = r6(fs.reduce((a, x) => a + x.valor, 0) * (over ?? factorAnterior ?? factor));
      // Solo suma a favor: en contra frenaba valores bien cargados (medido: Novorizontino 2023 reexpresó el año anterior, Tottenham 2025 y
      // Fluminense 2025 cambian de escala entre documentos, Ceará 2025 y Católica 2016 encuentran otra fila).
      if (coincide(esteAnt, delAnt)) chequeos.push(['documento anterior', true, `${esteAnt} en el anterior`]);
    }
  }
  const malos = chequeos.filter((c) => !c[1]); const buenos = chequeos.filter((c) => c[1]);
  if (malos.length) return { ok: false, valor, motivo: `no coincide con ${malos.map((c) => `${c[0]} (${c[2]})`).join(' ni ')}` };
  if (!buenos.length) return { ok: false, valor, motivo: 'ningún año vecino para comparar' };
  return { ok: true, valor, validacion: buenos[0][0] };
}

// La escalera para un dato: cada escalón propone, la compuerta decide, y si no pasa se baja. `ia`: la respuesta de la IA (o null).
// La propuesta "la nota de la fila": una fila sintética con la suma de los totales de la nota (año y anterior). Solo si la nota
// muestra que la fila es una parte: la fila es uno de sus totales, o la diferencia está impresa en la nota. En el documento vecino se arma
// igual desde la fila de la misma familia que tenga nota.
function propuestaNota(f) {
  const n = f.nota; const v = f.valor;
  if (!n || !(n.valor > v + 1)) return null;
  const parte = n.totales.some((t) => Math.abs(t - v) <= 1) || [...n.numeros].some((x) => Math.abs(x - (n.valor - v)) <= 1);
  if (!parte) return null;
  const sintetica = (x) => ({ ...x, etiqueta: `${x.etiqueta} (nota L${x.nota.linea})`, linea: x.nota.linea, valor: x.nota.valor, cifras: [x.nota.valor, x.nota.anterior], lecturaB: null });
  return { escalon: f.escalon, filas: [sintetica(f)], como: `la nota de la fila "${f.etiqueta}" (L${n.linea}): suma de sus totales ${n.totales.join(' + ')}`,
    enOtroDoc: (doc) => { const x = doc.find((y) => y.balance && y.familia === f.familia && y.nota); return x ? [sintetica(x)] : null; } };
}
// COMPUERTA DE PRIMER AÑO PARA LA CAJA: un año sin vecino (ni año anterior, ni siguiente, ni documento
// vecino) no tiene con qué compararse. Se acepta la caja que propuso la escalera si TRES cosas están de acuerdo (votos, ok de Guido):
//   1. el balance cuadra: la fila está en una tabla del balance cuyo total del activo es igual (a 1 unidad) a un total del pasivo, y la caja no
//      supera ese activo;
//   2. esa tabla es la del mayor activo del documento: el balance principal, no el de una entidad chica ni un resumen. Caso: Udinese 2021-22 trae
//      en la pág. 32 el balance de una entidad de activo 17,2 M donde "Disponibilità liquide" es 165.648; la caja real es 44,18 M;
//   3. otra fila del documento, fuera de la propuesta, trae la misma cifra (el estado de flujos de caja repite el saldo final). Udinese: la mala
//      aparece una vez, la real ocho.
// Solo caja: "el balance cuadra" no prueba que una fila sea deuda (medido: de 6 deudas sin vecino, 5 distintas de lo cargado). La caja belga
// usa su código fijo (cajaNBB, más abajo). Medido con `--medir`: sola la 1 deja 8 distintos (Udinese 2022); con las tres, 7, los de siempre.
export function cajaSinVecinoAceptable(filas, propuestas) {
  if (!propuestas?.length || propuestas.some((f) => f?.tabla == null || !f.balance || !f.cifras?.length || !Number.isFinite(f.valor))) return false;
  const suma = propuestas.reduce((a, f) => a + f.valor, 0);
  const tot = filas.filter((f) => f.balance && f.cifras?.length && esTotalBalance(f.norm));
  const activos = tot.filter((f) => TOTAL_ACTIVO_RE.test(f.norm));
  const pasivos = tot.filter((f) => TOTAL_PASIVO_RE.test(f.norm) || TOTAL_PASIVO_PLURAL_RE.test(f.norm));
  const mayor = Math.max(...activos.map((f) => f.cifras[0]));
  const cuadra = (f) => activos.some((a) => a.tabla === f.tabla && a.cifras[0] > 0 && Math.abs(suma) <= a.cifras[0] + 1 && pasivos.some((q) => Math.abs(a.cifras[0] - q.cifras[0]) <= 1));
  const principal = (f) => activos.some((a) => a.tabla === f.tabla && a.cifras[0] === mayor);
  const repetida = filas.some((f) => !propuestas.includes(f) && f.cifras?.some((x) => Math.abs(Math.abs(x) - Math.abs(suma)) <= 1));
  return propuestas.every(cuadra) && propuestas.every(principal) && repetida;
}
const conLecturaB = (f) => (f.lecturaB ? { ...f, valor: f.lecturaB.valor, cifras: f.lecturaB.cifras, lecturaB: null } : f);
export function escalera(filas, cual, { precedentes = [], factor = null, anterior = null, siguiente = null, factorSiguiente = null, ia = null, jev = null, extraDeuda = [], anteriorDoc = null, factorAnterior = null, ingresos = null } = {}) {
  const club = familiasDelClub(precedentes, cual);
  // escalón 1b, Jev, entre el vocabulario y la IA cara: solo si se le pasó su respuesta (--jev).
  const ESC = [0, 1, '1b', 2];
  const propuestas = [propuestaPrecedente(filas, club, cual), propuestaVocabulario(filas, cual, club, extraDeuda), jev ? propuestaJev(filas, jev, cual) : null, ia ? propuestaIA(filas, ia, cual) : null];
  const intentos = [];
  for (let i = 0; i < propuestas.length; i++) {
    const e = ESC[i]; const p = propuestas[i];
    if (!p) { if (i < 2 || (e === '1b' && jev) || (e === 2 && ia)) intentos.push(`escalón ${e}: sin propuesta`); continue; }
    const ctxC = { factor, anterior, siguiente, factorSiguiente, cual, referencia: precedentes[0]?.valor ?? null, anteriorDoc, factorAnterior, ingresos}; // el año cargado más cercano, para la plausibilidad
    let c = compuerta(p, ctxC);
    // caja de un año sin vecino: la compuerta del propio balance del documento (cajaSinVecinoAceptable)
    if (!c.ok && cual === 'cash' && c.motivo === 'ningún año vecino para comparar' && !p.ninguna && cajaSinVecinoAceptable(filas, p.filas))
      c = { ...c, ok: true, validacion: 'balance del documento' };
    // (A/B medido contra una compuerta con votos, descartada: ver Admin/HALLAZGOS-pipeline.md) DOS LECTURAS: si alguna fila de la propuesta o de los documentos vecinos tiene lectura B (sin la celda con
    // forma de nota), la propuesta se evalúa también con todos los documentos leídos así (AEK 2018: su fila ya sale bien, la del documento
    // siguiente trae la nota). La misma compuerta decide: pasa una sola → esa; las dos con valores distintos → no decide.
    const hayB = (xs) => (xs || []).some((f) => f.lecturaB);
    let elegida = c.ok ? { p, c, ctx: ctxC } : null; let lecturaSinNota = null;
    if (!p.ninguna && (hayB(p.filas) || hayB(siguiente) || hayB(anteriorDoc))) {
      const pB = { ...p, filas: p.filas.map(conLecturaB), como: `${p.como} (sin la celda con forma de nota)` };
      const ctxB = { ...ctxC, siguiente: siguiente && siguiente.map(conLecturaB), anteriorDoc: anteriorDoc && anteriorDoc.map(conLecturaB) };
      if (hayB(p.filas)) lecturaSinNota = { p: pB, ctx: ctxB };
      const cB = compuerta(pB, ctxB);
      if (c.ok && cB.ok && !coincide(c.valor, cB.valor)) { intentos.push(`escalón ${e}: pasan las dos lecturas (${c.valor} y ${cB.valor})`); continue; }
      if (!c.ok && cB.ok) elegida = { p: pB, c: cB, ctx: ctxB };
    }
    // LA NOTA DE LA FILA, en deuda: si la propuesta (la lectura que pasó, o la de siempre si no
    // pasó ninguna) es UNA fila del balance con su nota, y la nota muestra que la fila es solo una parte (la fila es uno de los totales de la
    // nota, o la diferencia con la suma de los totales está impresa en la nota), se propone la suma de los totales de la nota y pasa por la
    // misma compuerta (en el documento vecino, la misma cuenta con su columna del año anterior). Pasa una sola → esa; pasan las dos con
    // valores distintos → no decide (un vacío es mejor que una deuda corta). Caso: AEK 2021, "Μακροπρόθεσμες Δανειακές Υποχρεώσεις"
    // 5.029.327 es solo el largo plazo; la nota 6.15 da 6.038.235 (la parte a menos de un año, 1.008.907, va dentro de "Μακροπρόθεσμες
    // Υποχρεώσεις πληρωτέες στην Επόμενη Χρήση").
    // Sin ninguna lectura que pase, la base es la fila sin la celda de la nota si la tiene (la de siempre leería la nota "6.15" como importe).
    const base = elegida || lecturaSinNota || { p, c, ctx: ctxC };
    if (cual === 'deuda' && !base.p.ninguna && base.p.filas.length === 1 && base.p.filas[0].nota) {
      const pN = propuestaNota(base.p.filas[0]);
      if (pN) {
        const cN = compuerta(pN, base.ctx);
        if (elegida && cN.ok && !coincide(elegida.c.valor, cN.valor)) return { valor: null, escalon: null, como: intentos.concat(`escalón ${e}: la fila "${base.p.filas[0].etiqueta}" (${elegida.c.valor}) y su nota (${cN.valor}) pasan las dos: la nota dice que la fila es solo una parte; no decide`).join('; '), club };
        if (!elegida && cN.ok) elegida = { p: pN, c: cN, ctx: base.ctx };
      }
    }
    if (elegida) return { valor: elegida.c.valor, escalon: e, validacion: elegida.c.validacion, como: elegida.p.como, filas: elegida.p.filas.map(cita), club };
    intentos.push(`escalón ${e} (${c.valor}): ${c.motivo}`);
  }
  return { valor: null, escalon: null, como: intentos.join('; '), club };
}

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
const MODELOS_IA = { opus: 'claude-opus-5-5', sonnet: 'claude-sonnet-5-5' };
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
function contexto({ d, anios, a, cual, filasDe, conocidos }) {
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
async function iaDe(md, filas, club) {
  return porIA({ md, mdText: readFileSync(resolve(ROOT, md), 'utf8'), filas, criterioDeuda: criterioDeudaDe(club?.familias || []), ejecutar: iaDe.ejecutar, modelo: iaDe.modelo || null });
}

async function medir({ club = null, detalle = false, ia = false, jev = false, ejecutar = false, escalas = false, modelo = null } = {}) {
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
function rusiaDeCodigos(clubId, a) {
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
export async function completarClub(clubId, { ejecutar = false, escribir = false } = {}) {
  const { G, S } = sitio(); const d = G[clubId]; iaDe.ejecutar = ejecutar;
  if (!d) return { error: `no existe ${clubId} en el sitio` };
  const anios = aniosDe(d, S); const filasDe = filasCache();
  const conocidos = { grossDebt: {}, cash: {} };
  for (const a of anios) for (const k of ['grossDebt', 'cash']) if (a.m[k] != null) conocidos[k][a.anio] = a.m[k];
  const propuestas = []; let usd = 0;
  for (const a of anios) {
    const faltan = ['grossDebt', 'cash'].filter((k) => a.m[k] == null); if (!faltan.length) continue;
    const ru = rusiaDeCodigos(clubId, a); // (to-do: Rusia) antes de todo: el balance del fisco trae los códigos, no hay filas que elegir
    if (ru) { for (const k of faltan) propuestas.push({ anio: a.anio, cual: k, ...ru[k] }); continue; }
    if (!a.md) { for (const k of faltan) propuestas.push({ anio: a.anio, cual: k, valor: null, como: 'la fuente no nombra la transcripción' }); continue; }
    const res = {};
    for (const k of faltan) {
      const ctx = contexto({ d, anios, a, cual: k, filasDe, conocidos });
      // ESCALÓN 0 DE TODO: ajuste manual `caja` (tools/ajustes.mjs), el número TAL CUAL impreso en el documento del año; se pasa
      // a millones con la escala del documento. Gana sobre la escalera y no pasa por la compuerta (es una decisión de Guido). Caso:
      // Novorizontino 2022, el documento dice 721.730 (con aplicaciones de proyectos incentivados) y el 2023 lo reclasificó a 146.924.
      // lo mismo para la deuda: ajuste manual `deuda`. Caso: Fortaleza CEIF 2021 (295.846, cuadro de instrumentos financieros).
      // por PDF Y AÑO: si el PDF alimenta dos años del club (el año y su comparativo), solo vale el ajuste con `anio` de ese año
      // (ajusteDelAnio en ajustes.mjs). Caso: Dortmund 2024 y 2025, los dos desde geschaeftsbericht-2024-25.
      const aj = ajusteDelAnio(a.md.replace(/\.md$/i, '.pdf'), k === 'cash' ? 'caja' : 'deuda', a.anio, anios.filter((x) => x.md === a.md).length === 1);
      if (aj && ctx.factor) { res[k] = { ctx, valor: r6(Math.abs(parseNumber(aj.valor)) * ctx.factor), escalon: 0, validacion: 'ajuste manual', como: `ajuste manual (${aj.fecha}): ${aj.motivo}`, filas: [] }; continue; }
      res[k] = { ctx, ...escalera(ctx.filas, k === 'cash' ? 'cash' : 'deuda', ctx) };
    }
    // LA CAJA POR SU CÓDIGO NBB, para un año SIN VECINO (ni año anterior ni siguiente
    // cargado, ni documento vecino): la escalera nunca lo decide porque su compuerta pide un vecino. En el esquema NBB belga la caja es siempre
    // el código 54/58 ("Liquide middelen" / "Valeurs disponibles"). Compuerta, la del propio documento: el balance cuadra (TOTAAL VAN DE ACTIVA
    // 20/58 = TOTAAL VAN DE PASSIVA 10/49, la misma columna). Se pasa a millones con la escala del documento. La deuda no: los códigos
    // financieros (170/4, 42, 43) no coinciden con el criterio con que se cargó Bélgica (Union SG: 31,66 M en el sitio, 7,62 M por códigos).
    // Caso: Lierse SK 2025, 54/58 = 2.984 (L169), 20/58 = 10/49 = 4.833.368 (L171, L242).
    if (res.cash && res.cash.valor == null && res.cash.ctx.factor && res.cash.ctx.anterior == null && !res.cash.ctx.siguiente && !res.cash.ctx.anteriorDoc) {
      const nbb = cajaNBB(readFileSync(resolve(ROOT, a.md), 'utf8'));
      if (nbb) res.cash = { ctx: res.cash.ctx, valor: r6(nbb.caja * res.cash.ctx.factor), escalon: 1, validacion: 'balance del documento (NBB)', como: `código NBB 54/58 = ${nbb.caja} (L${nbb.linea}); el balance cuadra: 20/58 = 10/49 = ${nbb.total} (año sin vecino)`, filas: [] };
    }
    // ESCALÓN 1b, Jev (entró tras medirlo en todos los clubes: caja 9 de 9 iguales, deuda 5 de 7 y los 2
    // distintos eran errores del sitio, PAOK 2021 y Panetolikos 2022; US$ 0,11 en total). Antes de la IA cara; sin --ejecutar, ensayo.
    let sinDato = faltan.filter((k) => res[k].valor == null);
    if (sinDato.length) {
      const j = await jevDe(filasDe(a.md), ejecutar, deporteDePdf(a.md), a.md);
      if (j.ensayo) { usd += j.usd; for (const k of sinDato) res[k].como += ` · escalón 1b: ensayo (~US$ ${j.usd.toFixed(4)})`; }
      else if (j.error) { for (const k of sinDato) res[k].como += ` · escalón 1b: ${j.error}`; }
      else { usd += j.costo || 0; for (const k of sinDato) { const ctx = { ...res[k].ctx, jev: j.datos }; res[k] = { ctx, ...escalera(ctx.filas, k === 'cash' ? 'cash' : 'deuda', ctx) }; } }
      sinDato = faltan.filter((k) => res[k].valor == null);
    }
    if (sinDato.length) {
      const r = await iaDe(a.md, filasDe(a.md), res.grossDebt?.club);
      if (r.ensayo) { usd += r.usd; for (const k of sinDato) res[k].como += ` · escalón 2: ensayo (~US$ ${r.usd.toFixed(3)})`; }
      else if (r.error) { for (const k of sinDato) res[k].como += ` · escalón 2: ${r.error}`; }
      else { usd += r.costo || 0; for (const k of sinDato) res[k] = { ctx: res[k].ctx, ...escalera(res[k].ctx.filas, k === 'cash' ? 'cash' : 'deuda', { ...res[k].ctx, ia: r.datos }) }; } // ctx ya trae jev
    }
    // un valor completado en esta corrida YA NO cuenta como cargado para el año siguiente: un
    // vecino es lo cargado en el sitio o el documento vecino, nunca una propuesta que nadie confirmó (si no, un error se encadena: Fortaleza
    // 2020-2022, la caja chica de 2020 validaba la de 2021 y esa la de 2022). Antes sí contaba.
    for (const k of faltan) { const { ctx, ...x } = res[k]; propuestas.push({ anio: a.anio, cual: k, ...x }); }
  }
  for (const p of propuestas) console.log(`  ${p.anio} ${p.cual === 'cash' ? 'caja ' : 'deuda'}: ${p.valor ?? 'null'}  (${p.escalon != null ? `escalón ${p.escalon}, compuerta: ${p.validacion}; ` : ''}${p.como})${(p.filas || []).map((f) => `\n        "${String(f.etiqueta).slice(0, 60)}" ${f.importe} · pág. ${f.pagina} del visor · L${f.linea}`).join('')}`);
  const conValor = propuestas.filter((p) => p.valor != null);
  console.log(`\n${clubId}: ${conValor.length} dato(s) para completar de ${propuestas.length} vacío(s).${!ejecutar && usd ? ` Escalón 2 (IA) en ensayo: ~US$ ${usd.toFixed(2)}; agregá --ejecutar.` : ejecutar ? ` IA: US$ ${usd.toFixed(3)}.` : ''}`);
  if (!escribir || !conValor.length) return { propuestas };
  // ESCRIBIR: solo reemplaza `grossDebt:null` / `cash:null` adentro del bloque del año en <club>FiscalYearMeta; la nota de la fuente va a la
  // evidencia del club (Admin/carga-clubes/<club>.md), que entra en el snapshot para revertirse con el resto.
  const { snapshot, revertir, publicarCambios } = await import('./cargar.mjs');
  const evExtra = [EV.rutaRel(clubId)];
  const snap = snapshot(evExtra); const escritos = [EV.rutaRel(clubId)];
  try {
    let ev = EV.leer(clubId);
    // caja y deuda se completan en el JSON del club (financial.cash / gross_debt del año) y se regenera el data file
    const [rj, rd] = modificarClub(clubId, (c) => {
      for (const anio of [...new Set(conValor.map((p) => p.anio))]) {
        const m = c.datos.fiscalYearMeta[anio]; if (!m) throw new Error(`no encontré el año ${anio}`);
        const notas = [];
        for (const p of conValor.filter((x) => x.anio === anio)) {
          if (m[p.cual] !== null) throw new Error(`${anio}: no encontré ${p.cual}:null (¿ya tiene valor?)`);
          m[p.cual] = r6(p.valor);
          notas.push(`${p.cual} escalón ${p.escalon} (compuerta: ${p.validacion}): ${p.filas.length ? p.filas.map((f) => `"${String(f.etiqueta).slice(0, 50)}" pág. ${f.pagina}`).join(' + ') : p.como}`);
        }
        ev = EV.agregarTexto(ev, anio, 'Meta', [`tools/caja-deuda.mjs (${HOY}): ${notas.join('; ').replace(/\n/g, ' ')}`]);
      }
    });
    escritos.push(rj, rd);
    EV.guardar(clubId, ev);
    const r = publicarCambios(snap, evExtra, escritos);
    console.log(r.ok ? `Escrito: ${r.escritos.join(', ')} · ${r.audit}` : `NO se escribió: ${r.motivo}`);
    return { propuestas, escrito: r };
  } catch (err) { const rv = revertir(snap, evExtra); console.log(`NO se escribió: ${err.message} (se revirtió: ${rv.restaurados} restaurados)`); return { propuestas, error: err.message }; }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (A.includes('--personal') && A.includes('--ver-candidatos')) { // lo que recibiría Jev para un año, sin llamarlo
    const { G, S } = sitio(); const reg = registroDocs(); const a = aniosDe(G[flag('--club')], S).find((x) => x.anio === flag('--anio'));
    const cierre = cierreDeMd(a.md, reg); const car = a.md.split('/').slice(0, 3).join('/') + '/';
    const mds = [a.md, ...[...reg.values()].filter((e) => e.md && e.md !== a.md && e.pdf.startsWith(car) && cierre && cierreDeMd(e.md, reg) === cierre && existsSync(resolve(ROOT, e.md))).map((e) => e.md)];
    for (const c of mds.flatMap(candidatosPersonal)) console.log(`${c.md.split('/').pop()} L${c.linea}: ${String(c.etiqueta).slice(0, 60)} | ${c.cifras.slice(0, 2).join(' | ')}  (${c.contexto.slice(0, 120)})`);
    process.exit(0);
  }
  if (A.includes('--personal')) { if (A.includes('--medir')) await medirPersonal({ ejecutar: A.includes('--ejecutar'), club: flag('--club') }); else if (flag('--club')) await completarPersonal(flag('--club'), { ejecutar: A.includes('--ejecutar'), escribir: A.includes('--escribir'), partir: A.includes('--partir'), anios: flag('--anios') ? flag('--anios').split(',') : null }); process.exit(0); }
  if (flag('--modelo') != null && (!A.includes('--medir') || !A.includes('--ia') || !MODELOS_IA[flag('--modelo')])) { console.error('--modelo opus|sonnet va solo con --medir --ia'); process.exit(1); }
  if (A.includes('--medir')) { await medir({ club: flag('--club'), detalle: A.includes('--detalle'), ia: A.includes('--ia'), jev: A.includes('--jev'), escalas: A.includes('--escalas'), ejecutar: A.includes('--ejecutar'), modelo: flag('--modelo') }); process.exit(0); }
  if (flag('--club')) { const r = await completarClub(flag('--club'), { ejecutar: A.includes('--ejecutar'), escribir: A.includes('--escribir') }); process.exit(r.error ? 1 : 0); }
  console.error('Uso: node tools/caja-deuda.mjs --club <clubId> [--ejecutar] [--escribir]  |  --medir [--club x] [--ia [--ejecutar]] [--detalle]'); process.exit(1);
}

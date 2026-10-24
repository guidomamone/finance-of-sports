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

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import * as EV from './evidencia-club.mjs';
import { ajusteDelAnio } from './ajustes.mjs';
import { CAJA_RE, DEUDA_FINANCIERA_RE, TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE, esTotal } from './vocabulario.mjs';
import { modificarClub } from './club-json.mjs'; // el JSON es la fuente de cada club
import { candidatosPersonal, cierreDeMd, registroDocs, medirPersonal, completarPersonal } from './costo-personal.mjs'; // el costo de personal, mudado tal cual
import { deporteDePdf } from './deporte-club.mjs'; // la categoría de sueldos es la del deporte del club
import { coincide, parseNumber, esTotalBalance, soloTablaDelBalance, dedupe, r6, cita } from './caja-deuda-md.mjs';
import { TOTAL_PASIVO_PLURAL_RE, familiasDelClub, propuestaPrecedente, propuestaVocabulario, propuestaIA, propuestaJev, jevDe } from './caja-deuda-propuestas.mjs';
import { sitio, MODELOS_IA, contexto, aniosDe, filasCache, iaDe, medir, HOY, cajaNBB, rusiaDeCodigos } from './caja-deuda-escala.mjs';
export { sitio, factorPorIngresos, escalaDe, porIA, criterioDeudaDe, aniosDe, filasCache, HOY, cajaNBB } from './caja-deuda-escala.mjs';
export { aprender, familiasDelClub, avisarRecorte, pedirJev } from './caja-deuda-propuestas.mjs';
export { coincide, parseNumber, filasDelMd, r6 } from './caja-deuda-md.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const PAG_RE = /^---\s*pág\.\s*(\d+)\s*---/i;
const IMPORTE_RE = /\(?-?\d{1,3}(?:[.,' ]\d{3})+(?:[.,]\d{1,2})?\)?|\(?-?\d+[.,]\d{1,2}\)?|\(?-?\b\d{1,}\b\)?/g;
export const FACTORES = [1e-6, 1e-3, 1];
export const TOL = (v) => Math.max(0.0015, Math.abs(v) * 1e-4);
// Dos números por debajo del piso de la tolerancia (0,0015 millones = 1.500 unidades) coinciden solo si son el mismo número: con
// el piso, 6,80 (una nota leída como importe, AEK 2020) "coincidía" con 31,92 (un porcentaje de la fila de ratios del documento siguiente).

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
export function parCorrienteYNoCorriente(filas, fam) {
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

#!/usr/bin/env node
// ============================================================================
// tools/nbb.mjs — el estado de resultados belga LEÍDO POR SUS CÓDIGOS (ok de Guido: "escalón, no manta corta").
//
// POR QUÉ. El esquema de la NBB (Banco Nacional de Bélgica: VOL/VKT/micro, sociedades y vzw, antes y después de la reforma de 2016) trae al
// lado de cada renglón un CÓDIGO LEGAL FIJO: 70 Omzet, 60/66A total de gastos, 9901 resultado operativo, 9904 resultado del ejercicio. La
// escalera de verificar.mjs adivinaba por el rótulo y el signo qué era total y qué renglón, y salían siete errores que la mejora b no cubrió
// (Admin/Archive/sesion-onboarding-2026-10-18-5.md, letra t): 1. el 60/66A y el 600/8 + 609 sumados además de sus renglones (Beerschot 2021:
// gastos 30,7 M en vez de 15,1 M); 2. el "waarvan" del 76A sumado aparte (Lommel SK 2023, en el año vecino); 3. la Brutomarge 9900 negativa
// perdida o como ingreso (Lierse SK 2019 y 2020, Patro Eisden 2021); 4. el residuo implícito de la Brutomarge (Patro Eisden 2022: 768.543);
// 5. el financiero abreviado con el mismo signo (Lokeren-Temse 2021-2023); 6. las reversiones (+)/(-) en positivo (631/4, 635/8, 609, el 77);
// 7. OH Leuven 2021 tomaba el resumen del jaarverslag y no el estado de la pág. 8 del visor.
//
// LA ESCALERA (en verificar.mjs, al leer el .filas.json):
//   ESCALÓN NBB  el .md trae el estado con códigos (de 70/76A, 70/74 o 9900 hasta 9904) ── leerEstadoNBB(): los renglones que se cargan son
//                las HOJAS del esquema legal, cada una con el signo que le da su código ── COMPUERTA: cierran EXACTO (media unidad por fila
//                sumada) TODOS los totales impresos de la columna del año: 70/76A, 70/74, 60/66A, 60, 9900, 9901, 75/76B, 65/66B, 9902, 9903,
//                67/77, 9904 ── cierra → esas filas son el estado (reemplazan las del estado que extrajo la IA; las notas siguen abriendo sus
//                renglones como siempre, solo si suman) ── no cierra → la escalera de siempre, sin cambios
// Los escalones solo proponen: si el documento tiene un ajuste `fila` que suma una fila (no la reemplaza), el ajuste manda y este escalón no
// corre (el ajuste se puso a mano para algo que este lector ya hace: se anula con `tools/ajustes.mjs --anular` cuando se mide que da igual).
//
// QUÉ ES CADA CÓDIGO (hojas que se cargan; los totales solo son compuerta):
//   ingreso   70, 71, 72, 73 (vzw), 74, 76A (y el 76 "uitzonderlijke opbrengsten" del esquema anterior a 2016)
//   gasto     60 (o 600/8 + 609 si el 60 no está), 61, 60/61 (abreviado), 62, 630, 631/4, 635/8 (635/9 en vzw), 640/8, 649 (resta), 66A
//             (y el 66 "uitzonderlijke kosten" del esquema anterior)
//   financiero +75 (o 750, 751, 752/9) +76B, −65 (o 650, 651, 652/9) −66B
//   impuesto  −670/3, +77, +780, −680 (o −67/77 si no está el detalle)
//   Signo: el impreso. Un renglón "(+)/(-)" negativo resta en su lado (reversiones: 631/4, 635/8, 609; un 71 negativo).
// ESQUEMA ABREVIADO (VKT, micro): la Brutomarge 9900 = 70 + 71 + 72 + 73 + 74 + 76A − 60/61.
//   a) con Omzet (70, 73 o 70/74) o 60/61 impresos: se abre en esos renglones + el residuo implícito ("Overige bedrijfsopbrengsten (implícito
//      en la Brutomarge)", como el ajuste de Lokeren-Temse 2025 y Dender EH) + el 60/61 como gasto, SOLO si el residuo no es negativo;
//   b) si no (o el residuo es negativo: el desglose no cierra con la Brutomarge impresa, Patro Eisden 2020 -correction, decisión de Guido):
//      la Brutomarge sin abrir; positiva, ingreso; negativa, GASTO por su valor absoluto. El "waarvan" 76A
//      no se suma aparte (está adentro).
// FORMATO DEL .md: tabla con una celda de código (cualquier columna) o texto suelto "70/76A 11.399.352 7.628.061" (OH Leuven 2019 y 2021).
// En texto, una línea con UN solo importe no dice de qué año es ("67/77 610"): se prueban las dos columnas y gana la ÚNICA asignación con
// la que la columna del año cierra (compuerta de arriba).
//
// USO (ensayo, gratis): node tools/nbb.mjs "<archivo.md>" [...]   imprime las hojas, los totales y si cierra
// ============================================================================

import { readFileSync } from 'node:fs';

const T_INGRESO = ['70', '71', '72', '73', '74', '76A', '76'];
const T_GASTO_OP = ['62', '630', '631/4', '635/8', '635/9', '640/8', '649', '66A', '66'];
const PL = new Set(['70/76A', '70/74', '70', '71', '72', '73', '74', '76A', '76', '9900', '60/61', '60/66A', '60/64', '60', '600/8', '609', '61', '62', '630', '631/4',
  '635/8', '635/9', '640/8', '649', '66A', '66', '9901', '75/76B', '75', '750', '751', '752/9', '76B', '65/66B', '65', '650', '651', '652/9', '66B', '9902', '9903',
  '780', '680', '67/77', '670/3', '77', '9904', '789', '689', '9905']);
// Rótulos del esquema, para el formato de texto (el .md no los trae en la misma línea que el código)
const ROTULO = {
  '70': 'Omzet', '71': 'Voorraad goederen in bewerking en gereed product en bestellingen in uitvoering: toename (afname) (+)/(-)', '72': 'Geproduceerde vaste activa',
  '73': 'Lidgeld, schenkingen, legaten en subsidies', '74': 'Andere bedrijfsopbrengsten', '76A': 'Niet-recurrente bedrijfsopbrengsten', '76': 'Uitzonderlijke opbrengsten',
  '9900': 'Brutomarge (+)/(-)', '70/74': 'Bedrijfsopbrengsten', '60': 'Handelsgoederen, grond- en hulpstoffen', '600/8': 'Aankopen', '609': 'Voorraad: afname (toename) (+)/(-)',
  '61': 'Diensten en diverse goederen', '60/61': 'Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen', '62': 'Bezoldigingen, sociale lasten en pensioenen (+)/(-)',
  '630': 'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa',
  '631/4': 'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)',
  '635/8': "Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-)", '635/9': "Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-)",
  '640/8': 'Andere bedrijfskosten', '649': 'Als herstructureringskosten geactiveerde bedrijfskosten (-)', '66A': 'Niet-recurrente bedrijfskosten', '66': 'Uitzonderlijke kosten',
  '75': 'Recurrente financiële opbrengsten', '750': 'Opbrengsten uit financiële vaste activa', '751': 'Opbrengsten uit vlottende activa', '752/9': 'Andere financiële opbrengsten',
  '76B': 'Niet-recurrente financiële opbrengsten', '65': 'Recurrente financiële kosten', '650': 'Kosten van schulden',
  '651': 'Waardeverminderingen op vlottende activa andere dan voorraden, bestellingen in uitvoering en handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)',
  '652/9': 'Andere financiële kosten', '66B': 'Niet-recurrente financiële kosten', '670/3': 'Belastingen', '77': 'Regularisering van belastingen en terugneming van voorzieningen voor belastingen',
  '780': 'Onttrekking aan de uitgestelde belastingen', '680': 'Overboeking naar de uitgestelde belastingen', '67/77': 'Belastingen op het resultaat (+)/(-)',
  '9901': 'Bedrijfswinst (Bedrijfsverlies) (+)/(-)', '9902': 'Winst (Verlies) uit de gewone bedrijfsuitoefening (+)/(-)', '9903': 'Winst (Verlies) van het boekjaar vóór belasting (+)/(-)',
  '9904': 'Winst (Verlies) van het boekjaar (+)/(-)',
};
export const ETIQUETA_RESIDUO = 'Overige bedrijfsopbrengsten (implícito en la Brutomarge)';

const num = (s) => {
  s = String(s ?? '').replace(/\*|\s/g, '');
  if (!s || /^[-–—]$/.test(s)) return null;
  const neg = /^\(.*\)$/.test(s) || /^[-−]/.test(s);
  s = s.replace(/[()\-−+]/g, '').replace(/\./g, '').replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(s)) return null;
  return (neg ? -1 : 1) * Number(s);
};
const CODIGO = (x) => { const c = String(x || '').replace(/[*()\s]/g, ''); return PL.has(c) ? c : null; };

// Las filas con código del estado de resultados: la PRIMERA región que va de 70/76A (70/74, 9900) a 9904. Devuelve, por código, la línea
// del .md (1-based), el rótulo, los importes (actual, anterior) y si es una línea de texto con un solo importe (ambigua).
function region(md) {
  const L = md.split('\n'); let cur = null;
  for (let i = 0; i < L.length; i++) {
    const s = L[i].trim(); let code = null; let vals = []; let et = null; let texto = false;
    if (s.startsWith('|')) {
      const c = s.split('|').slice(1, -1).map((x) => x.replace(/\*/g, '').trim());
      const ic = c.findIndex((x) => CODIGO(x));
      if (ic >= 0) { code = CODIGO(c[ic]); vals = c.slice(ic + 1); et = c.slice(0, ic).find((x) => x && !/^\(?[+\-/()]+\)?$/.test(x) && !/^\d+(\.\d+)*$/.test(x)) || null; }
    } else {
      const m = s.replace(/\*/g, '').match(/^(\d{2,4}[AB]?(?:\/\d{1,2}[AB]?)?)((?:\s+[-−]?\(?[\d.]+(?:,\d+)?\)?)*)\s*$/);
      if (m && PL.has(m[1])) { code = m[1]; vals = m[2].trim() ? m[2].trim().split(/\s+/) : []; texto = true; }
    }
    if (!code) continue;
    if (!cur && ['70/76A', '70/74', '9900'].includes(code)) cur = { desde: i + 1, filas: {} };
    if (!cur) continue;
    if (i + 1 - cur.desde > 400) { cur = null; continue; }
    if (cur.filas[code]) continue; // la primera aparición
    const v = vals.map(num);
    cur.filas[code] = { codigo: code, linea: i + 1, etiqueta: et || ROTULO[code] || code, actual: v[0] ?? null, anterior: v[1] ?? null, ambiguo: texto && vals.filter((x) => num(x) != null).length === 1 };
    if (code === '9904') { cur.hasta = i + 1; return cur; }
  }
  return null;
}

// Las hojas y la compuerta de UNA columna ('actual' | 'anterior'), con las filas como las dejó region().
function columna(R, col) {
  const has = (k) => R[k] && R[k][col] != null;
  const g = (k) => (has(k) ? R[k][col] : 0);
  const hojas = []; const problemas = [];
  const hoja = (k, lado, signo = 1, extra = {}) => { if (has(k) && g(k) !== 0) hojas.push({ codigo: k, lado, valor: signo * g(k), linea: R[k].linea, etiqueta: R[k].etiqueta, ...extra }); };
  // un renglón con detalle impreso: se cargan las hojas del detalle si suman el renglón (o si el renglón no está); si no, el renglón. Así
  // nunca se cuentan los dos (Beerschot 2021: 60 = 600/8 + 609) y se conserva el detalle que la carga ya usaba (Aankopen, Kosten van schulden).
  const detalle = (padre, hijos, lado, signo = 1) => {
    const hs = hijos.filter(has); const s = hs.reduce((a, k) => a + g(k), 0);
    if (hs.length && (!has(padre) || Math.abs(s - g(padre)) <= Math.max(1, 0.5 * (hs.length + 1)))) { for (const k of hs) hoja(k, lado, signo); return s; }
    if (hs.length) problemas.push(`${padre}: ${s} contra ${g(padre)} impreso`);
    hoja(padre, lado, signo); return g(padre);
  };
  const chk = (k, calc, n) => { if (!has(k)) return; if (Math.abs(calc - g(k)) > Math.max(1, 0.5 * n)) problemas.push(`${k}: ${calc} contra ${g(k)} impreso`); };
  const abreviado = has('9900') || (R['9900'] && !R['70/76A'] && !R['60/66A']);
  let ingOp = 0; let gasOp = 0; let nOp = 0;
  if (abreviado) {
    const comps = T_INGRESO.filter((k) => k !== '76' && has(k));
    const conOmzet = has('70') || has('73') || has('70/74') || has('60/61');
    const ingComp = comps.length ? comps.reduce((a, k) => a + g(k), 0) : g('70/74');
    const residuo = g('9900') + g('60/61') - ingComp;
    if (conOmzet && residuo >= -0.5) {
      if (comps.length) for (const k of comps) hoja(k, 'ingreso'); else hoja('70/74', 'ingreso');
      if (Math.abs(residuo) > 0.5) hojas.push({ codigo: '9900', lado: 'ingreso', valor: residuo, linea: R['9900'].linea, etiqueta: ETIQUETA_RESIDUO, residuo: true });
      hoja('60/61', 'gasto');
      ingOp = ingComp + residuo; gasOp = g('60/61'); nOp = comps.length + 2;
    } else if (has('9900')) {
      if (g('9900') >= 0) { hoja('9900', 'ingreso'); ingOp = g('9900'); } else { hoja('9900', 'gasto', -1); gasOp = -g('9900'); }
      nOp = 1;
    }
  } else {
    const ings = T_INGRESO.filter((k) => k !== '76' && has(k));
    for (const k of ings) hoja(k, 'ingreso');
    ingOp = ings.reduce((a, k) => a + g(k), 0); nOp += ings.length;
    chk('70/76A', ingOp, ings.length + 1); chk('70/74', ingOp - g('76A'), ings.length + 1);
    let g60;
    g60 = detalle('60', ['600/8', '609'], 'gasto');
    hoja('61', 'gasto'); gasOp = g60 + g('61'); nOp += 3;
  }
  for (const k of T_GASTO_OP.filter((x) => x !== '66')) { if (k === '649') { if (has(k) && g(k) !== 0) { hojas.push({ codigo: k, lado: 'gasto', valor: -Math.abs(g(k)), linea: R[k].linea, etiqueta: R[k].etiqueta }); gasOp -= Math.abs(g(k)); } continue; } hoja(k, 'gasto'); gasOp += g(k); nOp++; }
  if (!abreviado) chk('60/66A', gasOp, nOp);
  const r9901 = ingOp - gasOp; chk('9901', r9901, nOp + 1);
  // financiero: las hojas de 75 y 65 si están; si no, su detalle; si no, el total 75/76B o 65/66B
  const D75 = ['750', '751', '752/9']; const D65 = ['650', '651', '652/9'];
  const fi = (has('75') || has('76B') || D75.some(has)) ? detalle('75', D75, 'financiero') + (hoja('76B', 'financiero'), g('76B')) : (hoja('75/76B', 'financiero'), g('75/76B'));
  const fc = (has('65') || has('66B') || D65.some(has)) ? detalle('65', D65, 'financiero', -1) + (hoja('66B', 'financiero', -1), g('66B')) : (hoja('65/66B', 'financiero', -1), g('65/66B'));
  chk('75/76B', fi, 3); chk('65/66B', fc, 3);
  const r9902 = (has('9901') ? g('9901') : r9901) + fi - fc; chk('9902', r9902, 3);
  // esquema anterior a 2016: los extraordinarios 76 / 66, entre el 9902 y el 9903
  hoja('76', 'ingreso'); hoja('66', 'gasto');
  const r9903 = (has('9902') ? g('9902') : r9902) + g('76') - g('66'); chk('9903', r9903, 3);
  let tax;
  if (has('670/3') || has('77')) { hoja('670/3', 'impuesto', -1); hoja('77', 'impuesto'); tax = g('670/3') - g('77'); chk('67/77', tax, 3); } else { hoja('67/77', 'impuesto', -1); tax = g('67/77'); }
  hoja('780', 'impuesto'); hoja('680', 'impuesto', -1);
  const r9904 = (has('9903') ? g('9903') : r9903) + g('780') - g('680') - tax;
  if (!has('9904')) problemas.push('sin 9904 en esta columna'); else chk('9904', r9904, 3);
  const ing = hojas.filter((h) => h.lado === 'ingreso').reduce((a, h) => a + h.valor, 0);
  const gas = hojas.filter((h) => h.lado === 'gasto').reduce((a, h) => a + h.valor, 0);
  return { hojas, problemas, cierra: problemas.length === 0, abreviado: !!abreviado, ingresos: ing, gastos: gas, resultado: has('9904') ? g('9904') : null };
}

// leerEstadoNBB(md): null si el .md no trae el estado NBB con códigos; si no, { desde, hasta, filas (por código), actual, anterior, ambiguas }.
// actual / anterior: columna() de cada año. Las líneas ambiguas de texto (un solo importe) se asignan a la ÚNICA combinación con la que la
// columna del año cierra; si hay más de una o ninguna, se dejan en la columna del año y la compuerta decide (no cierra -> no se usa).
export function leerEstadoNBB(md) {
  const r = region(md);
  if (!r) return null;
  const amb = Object.values(r.filas).filter((f) => f.ambiguo);
  let elegido = null; let resueltas = 0;
  if (amb.length && amb.length <= 12) {
    const sirven = [];
    for (let m = 0; m < (1 << amb.length); m++) {
      const F = Object.fromEntries(Object.entries(r.filas).map(([k, f]) => [k, { ...f }]));
      amb.forEach((f, b) => { if (m & (1 << b)) { F[f.codigo].anterior = F[f.codigo].actual; F[f.codigo].actual = null; } });
      const a = columna(F, 'actual'); const p = columna(F, 'anterior');
      if (a.cierra && (p.cierra || F['9904'].anterior == null)) sirven.push({ F, m });
    }
    if (sirven.length === 1) { elegido = sirven[0].F; resueltas = amb.filter((_, b) => sirven[0].m & (1 << b)).length; }
  }
  const filas = elegido || r.filas;
  return { desde: r.desde, hasta: r.hasta, filas, actual: columna(filas, 'actual'), anterior: columna(filas, 'anterior'), ambiguas: amb.length, aLaAnterior: resueltas };
}

// EL 630 POR LA NOTA DE ACTIVOS FIJOS. El 630 (amortizaciones) junta los pases de jugadores y los
// bienes de uso, y la cola da una sola categoría por fila: en los años cargados se partía a mano con ajustes `fila` (Lommel SK 2025: pases
// 5.674.313 + materiales 590.106). La nota del esquema NBB trae lo amortizado en el año ("Geboekt" / "Actées") con códigos fijos: 8072
// concesiones y derechos (en un club, los pases; 8079 en el abreviado), 8073 goodwill, 8271 a 8276 materiales (8279 en el abreviado).
// COMPUERTA: suman EXACTO el 630 (media unidad por fila); si no (Beerschot 2021: parte de lo amortizado está en el 66A), el 630 queda
// entero. Rótulos: los de los ajustes ya cargados, para que la categorización use los mismos precedentes (pases -> player_amortisation,
// goodwill -> other_amortisation, materiales -> depreciation). Medido: 33 de 191 documentos belgas con 630 lo parten exacto.
const GRUPOS_630 = [
  { etiqueta: 'Afschrijvingen immateriële vaste activa (spelers)', codigos: ['8072', '8079'] },
  { etiqueta: 'Afschrijvingen goodwill', codigos: ['8073'] },
  { etiqueta: 'Afschrijvingen materiële vaste activa', codigos: ['8271', '8272', '8273', '8274', '8275', '8276', '8279'] },
];
export function partir630(md, valor630) {
  const todos = GRUPOS_630.flatMap((g) => g.codigos); const v = {};
  const L = md.split('\n');
  for (let i = 0; i < L.length; i++) {
    if (!L[i].startsWith('|')) continue;
    const cs = L[i].split('|').slice(1, -1).map((x) => x.replace(/\*/g, '').trim());
    const k = cs.findIndex((x) => /^\d{4}$/.test(x));
    if (k < 1 || !todos.includes(cs[k]) || v[cs[k]]) continue;
    if (!/geboekt|actees|actées/i.test(cs.slice(0, k).filter(Boolean).pop() || '')) continue; // el rótulo: la última celda con texto antes del código
    const n = num(cs[k + 1]); if (n != null && n !== 0) v[cs[k]] = { valor: n, linea: i + 1 };
  }
  const partes = GRUPOS_630.map((g) => { const hs = g.codigos.filter((c) => v[c]); return hs.length ? { etiqueta: g.etiqueta, codigos: hs, valor: hs.reduce((a, c) => a + v[c].valor, 0), linea: v[hs[0]].linea } : null; }).filter(Boolean);
  const n = Object.keys(v).length; const suma = partes.reduce((a, p) => a + p.valor, 0);
  // con una sola parte también: el 630 entero es de pases o de bienes de uso y su rótulo lo dice (Lokeren-Temse 2021, solo materiales)
  if (!partes.length || Math.abs(suma - valor630) > Math.max(1, 0.5 * n)) return null;
  // el redondeo de la nota (un euro: Lommel SK 2025) va a la parte más grande, para que el 630 cierre igual
  const dif = valor630 - suma; if (dif) partes.sort((a, b) => b.valor - a.valor)[0].valor += dif;
  return partes;
}

const fmt = (v) => (v == null ? null : `${v < 0 ? '-' : ''}${Math.round(Math.abs(v)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);

// filasNBB(F, md): el .filas.json con el estado reemplazado por las hojas NBB, o null si el escalón no corre (no hay estado con códigos o
// la columna del año no cierra). Las filas del estado que extrajo la IA (bloques de F.ubicacion.estado, sin detalla_a) salen; las de notas
// (detalla_a) quedan y abren sus renglones por la etiqueta, como siempre. Bloque nuevo 'nbb', en unidades (euros).
export function filasNBB(F, md, { partir630: partir = true } = {}) {
  const N = leerEstadoNBB(md);
  if (!N || !N.actual.cierra) return null;
  const est = new Set(F.ubicacion?.estado || []);
  const otras = (F.filas || []).filter((f) => !(est.has(f.bloque) && !f.detalla_a));
  // rótulo: el de la fila que extrajo la IA en esa línea (así las notas que dicen abrirla la encuentran); si no, el del .md
  const deLinea = new Map((F.filas || []).filter((f) => est.has(f.bloque) && !f.detalla_a).map((f) => [Number(f.linea), f.etiqueta]));
  const clave = (h) => `${h.codigo}|${h.residuo ? 'r' : ''}`;
  const ant = new Map(N.anterior.hojas.map((h) => [clave(h), h]));
  const nuevas = N.actual.hojas.map((h) => {
    const a = ant.get(clave(h));
    return { bloque: 'nbb', linea: h.linea, etiqueta: h.residuo ? h.etiqueta : (deLinea.get(h.linea) || h.etiqueta), actual: fmt(h.valor), anterior: a ? fmt(a.lado === h.lado ? a.valor : -a.valor) : (N.filas[h.codigo]?.anterior != null && !h.residuo ? '0' : null), tipo: 'renglon', lado: h.lado, detalla_a: null, codigoNBB: h.codigo };
  });
  // Una hoja que solo tiene importe en la columna del año anterior NO entra: sería una fila en 0 que la categorización no conoce (RAAL La
  // Louvière 2024-25, 635/8 y 649). El chequeo del año vecino compara por los códigos impresos (verificar.mjs, escalón "códigos NBB").
  const res = N.filas['9904'];
  nuevas.push({ bloque: 'nbb', linea: res.linea, etiqueta: deLinea.get(res.linea) || res.etiqueta, actual: fmt(res.actual), anterior: fmt(res.anterior), tipo: 'resultado', lado: 'resultado', detalla_a: null, codigoNBB: '9904' });
  // el 630 partido por la nota de activos fijos, si sus códigos lo suman exacto (ver partir630). No en un año ya publicado
  // (`partir630: false`, lo decide verificar.mjs): sus filas son las que se categorizaron y publicaron (Lommel SK 2018, RWDM 2020).
  const i630 = nuevas.findIndex((x) => x.codigoNBB === '630');
  const p630 = i630 >= 0 && partir ? partir630(md, N.actual.hojas.find((h) => h.codigo === '630').valor) : null;
  if (p630) nuevas.splice(i630, 1, ...p630.map((x) => ({ bloque: 'nbb', linea: x.linea, etiqueta: x.etiqueta, actual: fmt(x.valor), anterior: null, tipo: 'renglon', lado: 'gasto', detalla_a: null, codigoNBB: x.codigos.join('+') })));
  nuevas.sort((a, b) => a.linea - b.linea);
  const tot = (k) => (N.filas[k] && N.filas[k].actual != null ? { actual: fmt(N.filas[k].actual), linea: N.filas[k].linea } : null);
  const totIng = N.actual.abreviado ? null : tot('70/76A') || tot('70/74');
  const totGas = N.actual.abreviado ? null : tot('60/66A');
  return {
    F: { ...F, filas: [...otras, ...nuevas], escalas: [...(F.escalas || []).filter((x) => x.bloque !== 'nbb'), { bloque: 'nbb', escala: 'unidades' }], ubicacion: { ...(F.ubicacion || {}), estado: ['nbb'] }, total_ingresos: totIng, total_gastos: totGas, resultado: { actual: fmt(res.actual), linea: res.linea } },
    bloque: { lineas: [N.desde, N.hasta] },
    N,
  };
}

// Ensayo: node tools/nbb.mjs "<archivo.md>" [...]
if (import.meta.url === `file://${process.argv[1]}`) {
  for (const p of process.argv.slice(2)) {
    const N = leerEstadoNBB(readFileSync(p, 'utf8'));
    if (!N) { console.log(`${p}: sin estado NBB con códigos`); continue; }
    console.log(`${p}: L${N.desde}-L${N.hasta}, ${N.actual.abreviado ? 'abreviado' : 'completo'}; año ${N.actual.cierra ? 'CIERRA' : 'no cierra'}, anterior ${N.anterior.cierra ? 'cierra' : 'no cierra'}${N.ambiguas ? `; ${N.ambiguas} línea(s) de un solo importe, ${N.aLaAnterior} a la columna anterior` : ''}`);
    for (const h of N.actual.hojas) console.log(`  ${h.lado.padEnd(10)} ${String(h.codigo).padEnd(6)} ${fmt(h.valor).padStart(14)}  L${h.linea} ${h.etiqueta.slice(0, 70)}`);
    console.log(`  ingresos ${fmt(N.actual.ingresos)}  gastos ${fmt(N.actual.gastos)}  resultado ${fmt(N.actual.resultado)}`);
    for (const x of N.actual.problemas) console.log(`  NO CIERRA: ${x}`);
  }
}

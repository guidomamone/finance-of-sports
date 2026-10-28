// ============================================================================
// tools/verificar-cierre.mjs — las fases de cierre de verificar(): los ajustes manuales, el resultado forzado, el año anterior y los vecinos
// Mudado de tools/verificar.mjs sin cambiar una línea (salvo `export`); tools/verificar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync } from 'node:fs';
import { pedidoPrimerAnio, respuestaGuardada, compuertaPrimerAnio } from './primer-anio-ia.mjs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { norm as normNum } from './verify-numbers.mjs';
import { ajusteDe, ajustesDe, ajustePerimetroDe } from './ajustes.mjs';
import { parseNumber, EURO_FIJO, r6, cerca } from './verificar.mjs';
import { filaQueExplica } from './diferencia-de-fila.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// Los ajustes manuales de cada escalera, el resultado forzado y los casos que quedan sin confirmar.
export function faseCierre(ctx) {
  const { pdf, mult, filaAntes, estado, suma, conSigno, fin, imp, chequeos, notas, V, lectura, siSegun, finSegun, confirmadosPorSumas, caso, cd, year, otros, gastosNeg, ingresosConLectura, lineasDeLado, ingresosConAjustes, colConFilas } = ctx;
  // AJUSTES MANUALES: el escalón 0 de cada escalera. Una decisión de Guido
  // atada al documento y al campo, no al texto de una pregunta de la cola.
  // resultado-final: el resultado del ejercicio impreso que fijó Guido. El IMPUESTO pasa a ser la diferencia con el resultado antes de
  // impuestos (el impreso si la lectura 1 cerró; si no, el de las filas: ingresos − gastos ± financiero como impreso), con la convención
  // del escalón "restado" (Fortaleza 2024-2025). Los chequeos de resultado que no cerraban quedan aceptados por el ajuste, con su detalle.
  // Casos: Fortaleza CEIF 2023 (el impuesto contable no es el "a cargo") y 2017 (el documento no imprime el impuesto).
  const ajustes = ajustesDe(pdf);
  const ajRes = ajusteDe(pdf, 'resultado-final');
  ctx.forzado = null;
  if (ajRes && isFinite(parseNumber(ajRes.valor))) {
    const finalM = parseNumber(ajRes.valor) * mult(filaAntes?.bloque ?? estado[0]?.bloque);
    const cerroAntes = ctx.E.cierra && ctx.E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok);
    const antes = cerroAntes ? ctx.E.objetivo : suma(ctx.ing) - suma(ctx.gas) + conSigno(fin);
    const impImpreso = conSigno(imp);
    imp.splice(0, imp.length, { ...(imp[0] || {}), etiqueta: `${imp[0]?.etiqueta || 'Impuesto'} (deducido: antes de impuestos − resultado final, por ajuste manual)`, M: antes - finalM, lado: 'impuesto', tipo: 'renglon' });
    for (const c of chequeos) if (/^resultado|^número impreso/.test(c.nombre) && c.ok === false) { c.ok = true; c.detalle += ` → aceptado por ajuste manual (resultado final ${ajRes.valor})`; }
    ctx.okRes = true;
    ctx.forzado = { final: finalM, antes, impImpreso };
    chequeos.push({ nombre: 'resultado final', ok: true, detalle: `${r6(finalM)} por ajuste manual (${ajRes.valor}: ${ajRes.motivo}); impuesto deducido ${r6(antes - finalM)} (antes de impuestos ${r6(antes)}; el documento imprimía ${r6(impImpreso)})` });
    notas.push(`ajuste manual: resultado final ${ajRes.valor} (${ajRes.fecha}, ${ajRes.motivo})`);
  }

  // 1. números no confirmados contra el PDF: la aritmética los confirma si todo cerró; si no, se prueba con lo que leyó la segunda fuente
  const cerro = ctx.okRes === true || chequeos.filter((c) => c.nombre.startsWith('total')).some((c) => c.ok === true);
  const usadas = [...ctx.ing, ...ctx.gas, ...fin, ...imp];
  const confirmadosAManoZ = ajustesDe(pdf).filter((a) => a.campo === 'confirmado');
  for (const nc of V?.noConfirmados || []) {
    // un número confirmado a mano (ajuste `confirmado`, misma línea y mismo valor: la compuerta de avisarRegistro) no vuelve a
    // la cola como "número no confirmado" (Santa Clara 2024-25, L1542 "40 646").
    if (confirmadosAManoZ.some((a) => Number(a.linea) === Number(nc.linea) && String(a.valor).trim() === String(nc.numero).trim())) continue;
    const fila = usadas.find((f) => f.linea === nc.linea && normNum(String(f.actual || '')).includes(normNum(nc.numero)));
    if (!fila) continue; // número de otra columna o de una fila que no se usa
    // con la etapa 6 cerrada, LAS SUMAS ELIGEN ENTRE LAS DOS LECTURAS: el número de
    // una fila que se carga queda confirmado si el resultado cierra con él y deja de cerrar con el de la segunda lectura (misma compuerta del
    // resultado: exacta si la lectura cerró exacto, la tolerancia de siempre si no). Sin segunda lectura con un número parecido, solo un cierre
    // EXACTO lo confirma. Si las dos lecturas cierran (o no hay con qué distinguir), va a la cola como pregunta en vez de frenar en silencio.
    // Caso: Torino 2023, L493 "e) proventi da cessione diritti audiovisivi": transcripción 52.376.963 (resultado a 684 EUR del impreso),
    // segunda lectura 52.176.963 (a 200 mil): las sumas eligen la transcripción.
    if (cerro) {
      const alt = nc.segundaLeyo != null ? parseNumber(String(nc.segundaLeyo)) : null; const actualN = parseNumber(String(nc.numero));
      let confirma = false; let porque = '';
      const objetivo = ctx.E.objetivo; const conImpR = !chequeos.some((c) => c.nombre === 'resultado antes de impuestos');
      if (objetivo != null && isFinite(objetivo) && alt != null && isFinite(alt) && isFinite(actualN) && alt !== actualN) {
        const sf = /por rótulo/.test(String(lectura)) ? 1 : (/financiero e impuesto invertidos|financiero invertido/.test(String(lectura)) ? -1 : 1); const si = siSegun(lectura);
        const pat = suma(ctx.ing) - suma(ctx.gas) + finSegun(lectura, fin) + (conImpR ? si * conSigno(imp) : 0);
        const dM = Math.sign(fila.M || 1) * (Math.abs(alt) - Math.abs(actualN)) * mult(fila.bloque);
        const efecto = ctx.ing.includes(fila) ? dM : ctx.gas.includes(fila) ? -dM : fin.includes(fila) ? sf * dM : imp.includes(fila) && conImpR ? si * dM : 0;
        const tolR = Math.max(1e-6, 0.5 * [...ctx.ing, ...ctx.gas, ...fin].reduce((a, f) => a + (f.u || 0), 0));
        const cierraCon = (x) => (objetivo < 0 ? (ctx.E.exacto ? Math.abs(x - objetivo) <= tolR : cerca(x, objetivo)) : (ctx.E.exacto ? Math.abs(Math.abs(x) - Math.abs(objetivo)) <= tolR : cerca(Math.abs(x), Math.abs(objetivo)))); // como cierraRes
        if (efecto && cierraCon(pat) && !cierraCon(pat + efecto)) { confirma = true; porque = `con la segunda lectura (${nc.segundaLeyo}) el resultado daría ${r6(pat + efecto)} y no cierra`; }
      } else if (alt == null && ctx.E.exacto) { confirma = true; porque = 'sin segunda lectura parecida, y el resultado cierra exacto con él'; }
      if (confirma) { confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero }); notas.push(`línea ${nc.linea}: ${nc.numero} no está en el ${V.modo === 'digital' ? 'texto del PDF' : 'segunda lectura'}; las sumas lo confirman (${porque})`); continue; }
      const r2 = caso('numero-no-confirmado', `${nc.linea}:${nc.numero}`, `En "${fila.etiqueta}" la transcripción dice ${nc.numero}${nc.segundaLeyo ? ` y la segunda lectura del PDF dice ${nc.segundaLeyo}` : ' y no se pudo confirmar contra el PDF'}. Las sumas cierran, pero no alcanzan para elegir: ${nc.segundaLeyo ? 'con los dos números el resultado cierra' : 'no hay otra lectura y el cierre no es exacto'}. ¿El PDF dice ${nc.numero}?`, { pagina: nc.pagina, lineas: [nc.linea, nc.linea], propuesta: 'sí' });
      if (r2?.decision === 'aceptar') confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero });
      else if (r2?.decision === 'corregir' && r2.valor) { fila.M = (parseNumber(r2.valor) ?? fila.M / mult(fila.bloque)) * mult(fila.bloque); confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero }); notas.push(`línea ${nc.linea}: valor corregido por Guido (${r2.valor})`); }
      continue;
    }
    const r = caso('numero-no-confirmado', `${nc.linea}:${nc.numero}`, `En "${fila.etiqueta}" la transcripción dice ${nc.numero}${nc.segundaLeyo ? ` y la segunda lectura del PDF dice ${nc.segundaLeyo}` : ` y no se pudo confirmar contra el PDF${nc.sinSegunda ? ' (sin segunda lectura de esa página)' : ''}`}. Las sumas no cierran.`, { pagina: nc.pagina, lineas: [nc.linea, nc.linea], propuesta: nc.segundaLeyo ? `usar ${nc.segundaLeyo}` : null });
    // (frenado de Molde FLI 2016 y 2024) un número cuya pregunta se contestó con un valor (`corregir`) quedó confirmado contra el PDF igual que con `aceptar`: sin esto
    // avisarRegistro() lo seguía contando como sin confirmar y el registro no pasaba a listo-para-jev.
    if (r?.decision === 'corregir' && r.valor) { fila.M = (parseNumber(r.valor) ?? fila.M / mult(fila.bloque)) * mult(fila.bloque); confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero }); notas.push(`línea ${nc.linea}: valor corregido por Guido (${r.valor})`); }
  }

  // 4. año anterior: la columna comparativa contra lo ya cargado
  const prev = cd && year ? year - 1 : null; const metaPrev = prev ? cd.fiscalYearMeta?.[prev] : null;
  if (metaPrev) {
    // la columna del año anterior se lee con LA MISMA LECTURA con la que cerró este año: si cerró con la lectura 3, los
    // renglones sin lado entran por su signo (y los subtotales se leen con ellos). Caso: Goiás 2024, la columna 2023 sumaba 89.972.753
    // (sin "Outras Receitas e Despesas" 140.214.785) y el sitio tiene 230.187.538 (cargado con la lectura 3): falsa alarma.
    const otrosA = ctx.E.nivel >= 3 ? otros.filter((f) => isFinite(f.A) && f.A && (ctx.escalonOtrosRes ? f.A > 0 : gastosNeg ? f.A > 0 : f.A < 0)).map((f) => ({ ...f, A: Math.abs(f.A) })) : [];
    const ingA = ctx.E.nivel >= 5 ? ingresosConLectura({ estado, lineasDeLado }, 'A', ctx.E.nivel, false, ctx.escalonVentanaOtros) : ctx.E.nivel >= 3 ? [...lineasDeLado('ingreso', 'A', true, ctx.E.nivel >= 4, (ctx.escalonSubRep || ctx.escalonAcum) && ctx.E.nivel === 4, false, ctx.escalonAcum && ctx.E.nivel === 4), ...(ctx.escalonAcum === 'sin-otros' && ctx.E.nivel === 4 ? [] : otrosA)] : lineasDeLado('ingreso', 'A'); let sA = suma(ingA, 'A'); // la lectura 5 también acá
    const prodI = (cd.revenueLinesByYear?.[prev] || []).reduce((a, l) => a + l.amountNative, 0);
    // Una GANANCIA extraordinaria que un ajuste `categoria` sacó de los ingresos del año anterior (exceptional_items en positivo) también
    // cuenta: el documento la sigue sumando como ingreso. Caso: Goiás 2024 contra 2023 (venta del 20% de la Liga Forte União, 140.214.785).
    const extraPrev = (cd.expenseLinesByYear?.[prev] || []).filter((l) => l.normalizedCategory === 'exceptional_items' && l.amountNative > 0).reduce((a, l) => a + l.amountNative, 0);
    // COMPUERTA (la misma del año vecino): si ninguna fila trae la columna del año anterior, no se puede comparar. Caso:
    // Novorizontino 2023 (su extracción no trajo la columna 2022): sumaba 0 contra los 30.003.234 de 2022 ya cargados.
    const sinColA = !estado.some((f) => f.lado === 'ingreso' && f.A != null && isFinite(f.A) && f.A);
    let okA = sinColA ? null : prodI ? (cerca(sA, prodI, 0.02) || (extraPrev > 0 && cerca(sA, prodI + extraPrev, 0.02))) : null;
    // escalón 1: si la columna cruda no coincide, con los ajustes `fila` que solo sacan una fila (la columna anterior no tiene otros).
    if (okA === false) { const sA1 = suma(ingresosConAjustes({ estado, mult }, pdf, ingA, 'A'), 'A'); if (cerca(sA1, prodI, 0.02) || (extraPrev > 0 && cerca(sA1, prodI + extraPrev, 0.02))) { okA = true; sA = sA1; } }
    // escalón 2: la columna anterior con las mismas filas que cerraron la actual (ver colConFilas)
    if (okA === false) { const sA2 = colConFilas(ctx.E.ing, (f) => f); if (sA2 != null && (cerca(sA2, prodI, 0.02) || (extraPrev > 0 && cerca(sA2, prodI + extraPrev, 0.02)))) { okA = true; sA = sA2; } }
    chequeos.push({ nombre: 'año anterior cargado', ok: okA, detalle: sinColA ? `no se puede comparar: este documento no trae la columna ${prev}` : prodI ? `la columna ${prev} de este documento suma ingresos ${r6(sA)}; el sitio tiene ${r6(prodI)}` : `el sitio tiene ${prev} sin líneas de ingresos` });
    if (okA === false) caso('anio-anterior', String(prev), `La columna del año anterior (${prev}) de este documento suma ingresos ${r6(sA)} y el sitio tiene ${r6(prodI)} para ese año. Puede ser: otra tabla u otro perímetro (revisar el documento), otra escala, o un error del año ya cargado (revisar producción).`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  }
  return { ajustes, prev, metaPrev };
}

// El año anterior cargado, los vecinos y el caso «primer año».
export function faseAnioAnterior(ctx) {
  const { vecinosDoc, compararVecino, chequeos, year, md, e, pdf, caso, estado, filas, metaPrev, prev, suma, nbbV } = ctx;
  // 4b. AÑO VECINO EN OTRO DOCUMENTO (agregado al medir: de los 159 años nuevos de clubes existentes solo 2 tienen el año
  // anterior cargado, porque casi todos son años VIEJOS que completan la serie hacia atrás; pero 101 tienen, en la misma carpeta y ya
  // transcripto, el documento del AÑO SIGUIENTE, cuya columna "año anterior" es este año). Si ese documento (o el del año anterior) ya pasó
  // por extraer.mjs, sus columnas se comparan con las de este. Por eso conviene procesar años CONSECUTIVOS del mismo club en el mismo lote.
  const vecinos = [];
  // (el documento vecino y su escala: vecinoDe(), arriba, junto a la escalera de escala)
  for (const [dy, v] of vecinosDoc) {
    const { otro } = v;
    const { mio, suyo, ok, sinColumna, otroRegimen, paridad, codigosNBB } = compararVecino(dy, v, ctx.kEsc, ctx.E.nivel, ctx.escalonSubRep, ctx.escalonVentanaOtros, ctx.E.ing, ctx.escalonAcum || (ctx.escalonOtrosRes ? 'otros-resultado' : false));
    vecinos.push(ok);
    if (otroRegimen) { chequeos.push({ nombre: `documento del año ${year + dy}`, ok: null, detalle: `no se puede comparar: uno de los dos cuenta la gestión de jugadores neta como ingreso y el otro no` }); continue; }
    if (sinColumna) { chequeos.push({ nombre: `documento del año ${year + dy}`, ok: null, detalle: `no se puede comparar: ${dy === 1 ? otro.pdf.split('/').pop() : 'este documento'} no trae la columna del año anterior` }); continue; }
    if (codigosNBB) { chequeos.push({ nombre: `documento del año ${year + dy}`, ok, detalle: `códigos NBB del año ${dy === 1 ? year : year - 1} iguales en este documento y en ${otro.pdf.split('/').pop()} (${codigosNBB.join(', ')}); los ingresos se presentan distinto (${r6(dy === 1 ? mio : suyo)} y ${r6(dy === 1 ? suyo : mio)})` }); continue; }
    chequeos.push({ nombre: `documento del año ${year + dy}`, ok, detalle: `${paridad ? `en euros, con la paridad fija de ${paridad} (1 EUR = ${EURO_FIJO[paridad]}): ` : ''}ingresos de ${dy === 1 ? year : year - 1}: ${r6(dy === 1 ? mio : suyo)} en ${dy === 1 ? 'este documento' : otro.pdf.split('/').pop()} y ${r6(dy === 1 ? suyo : mio)} en ${dy === 1 ? otro.pdf.split('/').pop() : 'este documento'} (columna del año anterior)` });
    // (diferencia-de-fila.mjs decide: una fila de gasto de cualquiera de los dos, o una fila de lado `otro` con el mismo importe en los dos: Atlético Nacional, «Otras ganancias (pérdidas)».)
    // PRESENTACIÓN DISTINTA: la diferencia es exactamente UNA fila de GASTO (no un total) de
    // uno de los dos documentos: uno la presenta y el otro la netea. Casos: Olympiacos 2020 (82,46 M bruto) contra la columna anterior de 2021
    // (74,81 M neto): "Δαπάνες πώλησης/λύσεις συμβολαίων ποδοσφαιριστών" 7.645.064,67; Cuiabá 2022 y 2023, "(-) Deduções das receitas" (bruto
    // contra neto). Medido sobre los 112 casos de año vecino de la cola: 5 aciertos, 0 errores; con "una fila cualquiera" entraban 3 descartados
    // (UC 2009, Juventus 2005 x2) por coincidir con una fila de TOTAL. Se lee como en la medición: las cifras tal cual de los dos .filas.json, en
    // unidades, miles o millones.
    if (ok === false) {
      const dif = Math.abs(mio - suyo);
      const filasDoc = (m) => { try { return JSON.parse(readFileSync(resolve(ROOT, derivado(m, '.filas.json', { crear: false })), 'utf8')).filas || []; } catch { return []; } };
      // la columna de cada documento que trae el año comparado: el de este año tiene `actual` si el vecino es el siguiente (dy 1), `anterior` si es el anterior
      const neteada = dif > 0 ? filaQueExplica({ dif, filasA: filasDoc(md), filasB: filasDoc(otro.md), colA: dy === 1 ? 'actual' : 'anterior', colB: dy === 1 ? 'anterior' : 'actual', parse: parseNumber }) : null;
      if (neteada) { chequeos[chequeos.length - 1] = { ...chequeos[chequeos.length - 1], ok: null, detalle: `presentación distinta: ingresos de ${dy === 1 ? year : year - 1} ${r6(mio)} y ${r6(suyo)}; la diferencia es exactamente "${neteada.f.etiqueta}" (${neteada.f.lado}, ${neteada.f.actual}), que ${neteada.otroLado ? 'una comparación cuenta como ingreso y la otra no' : 'uno de los dos documentos netea'}` }; vecinos[vecinos.length - 1] = null; continue; }
    }
    // PERÍMETROS DISTINTOS: si no coinciden y los dos documentos tienen perímetro fijado (ajuste del
    // documento o del club) distinto, la columna del año anterior es de otro perímetro: no se puede comparar (como `otroRegimen`). Solo
    // baja una comparación que FALLA; una que coincide sigue valiendo (Roma 2005, Benfica 2005-06). Casos: FCI Levadia 2020 (la MTÜ sola,
    // 786.551) contra la columna del consolidado 2021 (1.073.554), 15 casos estonios todos aceptados; Benfica 2018-19 y Aris 2021.
    if (ok === false) {
      const perMio = ajustePerimetroDe(pdf)?.valor; const perOtro = ajustePerimetroDe(otro.pdf)?.valor;
      if (perMio && perOtro && perMio !== perOtro) { chequeos[chequeos.length - 1] = { ...chequeos[chequeos.length - 1], ok: null, detalle: `no se puede comparar: perímetros distintos (este documento ${perMio}, ${otro.pdf.split('/').pop()} ${perOtro}); ingresos ${r6(mio)} y ${r6(suyo)}` }; vecinos[vecinos.length - 1] = null; continue; }
    }
    if (ok === false) caso('anio-vecino', String(year + dy), `Los ingresos de ${dy === 1 ? year : year - 1} no coinciden entre este documento y ${otro.pdf.split('/').pop()} (${r6(mio)} contra ${r6(suyo)}). Puede ser una reexpresión del año en el documento siguiente (pasa), otra tabla u otro perímetro.`, { pagina: estado[0]?.pagina });
  }
  ctx.primerAnio = null; // el pedido a Claude y su estado, para tools/primer-anio-ia.mjs
  ctx.primerAnio214 = null; // hace falta el caso "primer año" salvo que lo confirme el escalón 3 (se decide abajo)
  // El escalón 3 del primer año: arma el pedido con las líneas del estado y lo que se carga, y aplica la compuerta si la respuesta está guardada.
  // `filas`: lo que se carga, con los signos de la carga (financiero e impuesto como su efecto en el resultado): se arma abajo, junto al
  // .verificacion.json, porque esos signos salen de la lectura que cerró el resultado.
  const escalon3_214 = (filas) => {
    const ped = pedidoPrimerAnio(readFileSync(resolve(ROOT, md), 'utf8'), estado, filas);
    if (!ped) return null;
    const datos = respuestaGuardada(md, ped.clave); const g = datos ? compuertaPrimerAnio(datos, ped) : null;
    ctx.primerAnio = { escalon: 3, estado: !datos ? 'pendiente' : g.ok ? 'confirmado' : 'alarma', clave: ped.clave, rango: ped.rango, lineasCargadas: ped.lineasCargadas, user: ped.user, ...(g && !g.ok ? { problemas: g.problemas } : {}) };
    return g;
  };
  if (!metaPrev) {
    chequeos.push({ nombre: 'año anterior cargado', ok: null, detalle: prev ? `el sitio no tiene ${prev}: este chequeo no se puede hacer` : 'club nuevo' });
    // (escalón 1, aprobado por Guido: "no quiero revisar yo el primer año del club") Lo que pedía el caso es mirar
    // que ingresos, gastos y resultado coincidan con lo impreso. Si el documento imprime los TRES y lo que se carga (las filas finales,
    // después de los ajustes) da cada uno a 0,01% o menos (los redondeos de las notas en miles; la tolerancia de siempre, `cerca`, deja pasar
    // hasta 1% en un club chico: Novorizontino 2010, gastos 163.946 contra 165.637), el caso no hace falta. Si falta alguno impreso o uno no
    // da, a la cola como antes. Medido sobre los 115 "primer-anio" que pasaron por la cola: ninguno terminó en una corrección; cierra 24 de
    // los 77 aceptados (Parma 2018: ingresos 11.457.715 contra 11.457.714, gastos 33.744.261 contra 33.744.262) y ninguno de los 2 descartados.
    const REL214 = 1e-4;
    const tot214 = (n, final) => { const c = chequeos.find((x) => x.nombre === `total de ${n}`); return c?.ok === true && c.impreso != null && Math.abs(final - c.impreso) <= REL214 * Math.abs(c.impreso) ? c.impreso : null; };
    const ti214 = tot214('ingresos', suma(ctx.ing)); const tg214 = tot214('gastos', suma(ctx.gas));
    const res214 = chequeos.find((x) => x.nombre === 'resultado del ejercicio');
    const resOk214 = (base) => res214?.ok === true && res214.dif != null && res214.dif <= REL214 * Math.abs(base);
    const imprime3 = ti214 != null && tg214 != null && resOk214(ti214);
    // imprime UN total y el resultado, los dos a 0,01%, y el otro total NO está
    // impreso: ese otro queda determinado por la cuenta. Solo la suma directa (`suma`/`impreso`), no las variantes interpretadas (un renglón
    // como total, deducciones aparte). Medido: 7 más de los 77 aceptados (Volos 2024: ingresos 5.872.569 = impreso, sin total de gastos,
    // resultado 383.182,45 exacto), ninguno de los 2 descartados.
    const sinImp214 = (n) => { const c = chequeos.find((x) => x.nombre === `total de ${n}`); return c?.ok === null && /no lo imprime/.test(c.detalle || ''); };
    const imprime1 = !imprime3 && ((ti214 != null && sinImp214('gastos') && resOk214(ti214)) || (tg214 != null && sinImp214('ingresos') && resOk214(tg214)));
    if (imprime3) chequeos.push({ nombre: 'primer año', ok: true, detalle: 'ingresos, gastos y resultado coinciden con lo impreso a 0,01% o menos: no hace falta la revisión del primer año (to-do 214)' });
    if (imprime1) chequeos.push({ nombre: 'primer año', ok: true, detalle: `${ti214 != null ? 'ingresos' : 'gastos'} y resultado coinciden con lo impreso a 0,01% o menos y el otro total no está impreso (queda determinado): no hace falta la revisión del primer año (to-do 214, escalón 2)` });
    // SOLO EL RESULTADO coincide a 0,01% (de los ingresos): con el resultado exacto,
    // lo único que se escapa es un error que se compensa (la misma cifra en los dos lados, una fila que falta de un lado y sobra del otro).
    // Se le pregunta a Claude con las líneas del estado y lo que se carga (tools/primer-anio-ia.mjs): sin ninguna fila marcada, no hace
    // falta el caso; con alguna, el caso lleva la cita. Sin respuesta guardada, el caso queda como antes y el pedido queda "pendiente".
    // El escalón 3 y el caso "primer año" se resuelven abajo, con los signos de la carga (ver escalon3_214).
    // el estado salió de sus códigos NBB y cerró exacto: cada código tiene UN lado y todos los totales impresos cierran, así
    // que el error que se compensa que busca esta revisión no puede pasar (una fila del lado equivocado rompe el 9901 o el 70/76A y 60/66A).
    const porNBB = !!(nbbV && ctx.E?.exacto && ctx.E?.okRes && !imprime3 && !imprime1);
    if (porNBB) chequeos.push({ nombre: 'primer año', ok: true, detalle: 'el estado salió de sus códigos NBB y todos sus totales impresos cierran exacto: no hace falta la revisión del primer año (to-do 298 t)' });
    if (!(vecinos.includes(true) || imprime3 || imprime1 || porNBB)) ctx.primerAnio214 = { escalon3: resOk214(suma(ctx.ing)) };
  }
  // un total o el resultado que no cierran -> cola (salvo que Guido ya lo haya aceptado)
  for (const c of chequeos.filter((x) => x.ok === false && x.nombre !== 'año anterior cargado')) caso('no-cierra', c.nombre, `${c.nombre}: ${c.detalle}. Revisar si falta o sobra alguna fila, o si hay un renglón del lado equivocado.`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  return { vecinos, escalon3_214 };
}

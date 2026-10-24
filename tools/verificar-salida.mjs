// ============================================================================
// tools/verificar-salida.mjs — las fases finales de verificar(): el resultado final para la carga y el archivo .verificacion.json
// Mudado de tools/verificar.mjs sin cambiar una línea (salvo `export`); tools/verificar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { huellaVerificar } from './huellas.mjs';
import { cerrarObsoletos } from './cola.mjs';
import { VERSION_AMPLIADO } from './indice-bloques.mjs';
import { normalizar } from './vocabulario.mjs';
import { parseNumber, MULT, r6, avisarRegistro } from './verificar.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const TOL = 0.01; // millones: la de audit.js

// El resultado final para la carga y su signo, y el de financiero e impuesto.
export function faseResultadoFinal(ctx) {
  const { res, conSigno, imp, mult, filaAntes, estado, vecinosDoc, md, chequeos, caso, year, pdf, pagDe, suma, finSegun, lectura, fin, siSegun, F, notas } = ctx;
  // ESCALERA DEL RESULTADO FINAL. Si se cerró contra "resultado antes de impuestos"
  // (lectura 1), el resultado final es antes ± impuesto, y el signo con que el documento imprime el impuesto no lo dice: antes
  // se SUMABA el impuesto tal como está impreso (UC 2013: 57.521 + 163.095 = 220.616), y en Fortaleza CEIF 2025 eso daba 685.847 + 372.407 =
  // 1.058.254 cuando la nota de patrimonio imprime "Resultados del ejercicio 313.440" (= 685.847 − 372.407, .md L1047).
  //   candidatos: antes + impuesto, antes − impuesto
  //   ESCALÓN 0  el candidato que está IMPRESO en el .md de este documento (cualquier número, a media unidad impresa de redondeo)
  //   ESCALÓN 1  el que imprime el documento del año SIGUIENTE en una columna que no es la primera (la del año anterior)
  //   COMPUERTA  un solo candidato coincide. Ninguno o los dos -> cola (Fortaleza 2023: impreso 1.021.768, ninguno de los dos).
  ctx.resParaCargar = res; ctx.resultadoFinal = null;
  if (ctx.forzado) { ctx.resParaCargar = ctx.forzado.final; ctx.resultadoFinal = { valor: r6(ctx.forzado.final), impuesto: 'deducido', escalon: 'ajuste manual', donde: 'Admin/registros/ajustes-manuales.jsonl', impuestoImpreso: r6(ctx.forzado.impImpreso), impuestoDeducido: r6(ctx.forzado.antes - ctx.forzado.final) }; }
  else if (ctx.E.cierra && ctx.E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok) && Math.abs(conSigno(imp)) > TOL) {
    const NUM_RE = /\(?-?\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?\)?|\d{4,}/g;
    const cands = [res + conSigno(imp), res - conSigno(imp)];
    // ¿el candidato (millones) aparece impreso en el .md, a escala m (millones por unidad impresa)? soloNoPrimera: en una fila de tabla, no
    // en la primera columna con cifras (la del año actual), para leer la columna del año anterior del documento siguiente.
    const impreso = (mdRel, m, cand, soloNoPrimera) => {
      let L; try { L = readFileSync(resolve(ROOT, mdRel), 'utf8').split('\n'); } catch { return null; }
      const objetivo = Math.abs(cand / m);
      for (const [i, l] of L.entries()) {
        let nums = [];
        if (soloNoPrimera) { if (!l.trim().startsWith('|')) continue; nums = l.split('|').map((c) => c.trim()).map((c) => c.match(NUM_RE) || []).filter((m) => m.length).slice(1).flat(); }
        else nums = l.match(NUM_RE) || [];
        if (nums.some((t) => Math.abs(Math.abs(parseNumber(t) ?? NaN) - objetivo) <= 0.5)) return i + 1;
      }
      return null;
    };
    const mImp = mult(filaAntes?.bloque ?? estado[0]?.bloque);
    const sig = vecinosDoc.find(([dy]) => dy === 1)?.[1];
    const mSig = sig ? (MULT[sig.U2.escala] ?? 1e-6) * sig.k2 : null;
    const pruebas = [
      ['escalón 0', 'este documento', (c) => impreso(md, mImp, c, false)],
      ['escalón 1', sig ? sig.otro.pdf.split('/').pop() : null, (c) => (sig ? impreso(sig.otro.md, mSig, c, true) : null)],
    ];
    for (const [escalon, donde, buscar] of pruebas) {
      if (!donde) continue;
      const hits = cands.map((c) => buscar(c));
      if (hits.filter((h) => h != null).length !== 1) continue;
      const i = hits.findIndex((h) => h != null);
      ctx.resParaCargar = cands[i]; ctx.resultadoFinal = { valor: r6(cands[i]), impuesto: i === 0 ? 'sumado' : 'restado', escalon, donde, linea: hits[i] };
      break;
    }
    if (ctx.resultadoFinal) chequeos.push({ nombre: 'resultado final', ok: true, detalle: `antes de impuestos ${r6(res)} con el impuesto ${ctx.resultadoFinal.impuesto} = ${ctx.resultadoFinal.valor}, impreso en ${ctx.resultadoFinal.donde} (L${ctx.resultadoFinal.linea}; ${ctx.resultadoFinal.escalon})` });
    else {
      const enMd = Math.abs(cands[1] / mImp).toLocaleString('es-AR', { maximumFractionDigits: 2 });
      // detalle con "ajuste": la respuesta va en tools/ajustes.mjs, no en la cola (una respuesta de la cola a este caso lo
      // silenciaría con el resultado en null); el detalle nuevo hace que las respuestas viejas no apliquen.
      caso('resultado-final', `${year}|ajuste`, `¿Ninguno de los dos es el resultado del ejercicio? El resultado antes de impuestos (${r6(res)}) cierra, pero ni ${r6(cands[1])} (restando el impuesto ${r6(Math.abs(conSigno(imp)))}; impreso sería ${enMd}) ni ${r6(cands[0])} (sumándolo) aparecen impresos${sig ? ` (tampoco en ${sig.otro.pdf.split('/').pop()}, columna del año anterior)` : ''}. Buscá en el .md el resultado del ejercicio impreso (nota de patrimonio, "Resultados del ejercicio"): si está, node tools/ajustes.mjs --agregar "${pdf}" resultado-final --valor "<el número tal cual>" --motivo "..." (el impuesto se deduce solo); si no, descartar.`, { pagina: pagDe(filaAntes?.bloque) });
      ctx.resParaCargar = null; chequeos.push({ nombre: 'resultado final', ok: false, detalle: `ni ${r6(cands[1])} (antes − impuesto) ni ${r6(cands[0])} (antes + impuesto) están impresos de una sola forma en este documento${sig ? ' ni en el del año siguiente' : ''}` });
    }
  } else if (ctx.E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok)) ctx.resParaCargar = res + conSigno(imp);

  // SIGNO DEL RESULTADO IMPRESO. La compuerta del resultado (evaluar) compara valores ABSOLUTOS, así que un resultado impreso sin
  // el signo de la pérdida cierra igual, pero se le pasaba a la carga positivo y cargar.mjs frenaba por tie-out hasta un ajuste
  // `resultado-final` a mano. Casos: Ferroviária 2013-b, 2014-b y 2017 ("= Prejuízo 1.222.442,07 D"), Novorizontino 2014-b ("PREJUIZO
  // 3.108.722,71"), Paysandu 2025 (DRE entero con signos de balancete: receitas "- 69.580.477,67", déficit "2.175.575,20").
  //   ESCALÓN 0  ajuste manual resultado-final (forzado, arriba)
  //   ESCALÓN 1  el resultado impreso tal cual
  //   ESCALÓN 2  el signo de las filas, SOLO si: (compuerta) el resultado del ejercicio cerró EXACTO en valor absoluto con el signo opuesto,
  //              y (señal) el documento dice que el impreso es una pérdida sin signo: la etiqueta es de pérdida y no de las dos cosas
  //              ("Prejuízo", sí; "Superávit/Déficit", no), o el importe lleva la marca D de balancete, o los ingresos vienen impresos en
  //              negativo (más de la mitad del dinero de los renglones de ingreso). Sin señal no decide: frena como antes (un lado mal
  //              extraído no se arregla dando vuelta el resultado).
  if (!ctx.forzado && !ctx.resultadoFinal && ctx.resParaCargar != null && res && ctx.E.cierra && ctx.E.exacto && ctx.E.ch.some((c) => c.nombre === 'resultado del ejercicio' && c.ok)) {
    const pat = suma(ctx.E.ing) - suma(ctx.E.gas) + finSegun(lectura, fin) + siSegun(lectura) * conSigno(imp);
    if (Math.sign(pat) === -Math.sign(res)) {
      let etRes = ''; try { etRes = readFileSync(resolve(ROOT, md), 'utf8').split('\n')[(F.resultado?.linea ?? 0) - 1] || ''; } catch {}
      etRes = etRes.split('|').filter((c) => /[a-zà-ú]/i.test(c)).slice(0, 1).join(' ');
      const PERDIDA = /preju[ií]zo|d[ée]ficit|\bperdas?\b|p[ée]rdidas?|perdita|\bloss\b/i; const GANANCIA = /super[aá]vit|lucro|ganancia|utilidad|utile|profit|gain/i;
      const ingImpresos = (F.filas || []).filter((f) => f.lado === 'ingreso' && f.tipo === 'renglon');
      const dinero = (xs) => xs.reduce((a, f) => a + Math.abs(parseNumber(String(f.actual)) || 0), 0);
      const senales = [];
      if (res > 0 && PERDIDA.test(etRes) && !GANANCIA.test(etRes)) senales.push(`la etiqueta "${etRes.trim().replace(/\*/g, '')}" es de pérdida`);
      if (res > 0 && /\bD\s*$/.test(String(F.resultado?.actual || ''))) senales.push(`el importe impreso "${F.resultado.actual}" lleva la marca D`);
      if (ingImpresos.length && dinero(ingImpresos.filter((f) => /^\s*[-(−]/.test(String(f.actual)))) > dinero(ingImpresos) / 2) senales.push('los ingresos vienen impresos en negativo (signos de balancete)');
      // señales nuevas: el signo VA AL FINAL del importe impreso ("3 041 302,19 € -", AVS 2023-24), o el MISMO resultado
      // (misma etiqueta, mismo importe) está impreso en otra línea del documento con signo negativo explícito (el estado, el resumen o el
      // patrimonio: AVS L229/L513, Portimonense L1036). Misma compuerta de arriba: el resultado cerró EXACTO con el signo opuesto.
      if (res > 0 && /\d[\s€*]*[-−]\s*\**\s*$/.test(String(F.resultado?.actual || ''))) senales.push(`el importe impreso "${F.resultado.actual}" lleva el signo menos al final`);
      if (res > 0 && !senales.length && etRes.trim()) {
        try {
          const abs0 = Math.abs(parseNumber(String(F.resultado?.actual)) ?? NaN); const et0 = normalizar(etRes);
          const otra = readFileSync(resolve(ROOT, md), 'utf8').split('\n').map((t, i) => [t, i + 1]).find(([t, n]) => n !== F.resultado?.linea && t.includes('|') && normalizar(t.split('|').filter((c) => /[a-zà-ú]/i.test(c))[0] || '') === et0
            && t.split('|').slice(1).some((c) => { const v = parseNumber(c); return v != null && v < 0 && Math.abs(Math.abs(v) - abs0) < 0.005 + 1e-9; }));
          if (otra) senales.push(`la misma etiqueta imprime el importe en negativo en L${otra[1]}`);
        } catch {}
      }
      if (senales.length) {
        ctx.resParaCargar = -res;
        chequeos.push({ nombre: 'signo del resultado', ok: true, detalle: `escalón 2: las filas dan ${r6(pat)} y el impreso es ${r6(res)}; se carga ${r6(-res)} porque ${senales.join('; ')}` });
        notas.push(`resultado impreso sin el signo de la pérdida: se carga ${r6(-res)} (${senales.join('; ')})`);
      }
    }
  }

}

// El archivo .verificacion.json y los rubros.
export function faseSalida(ctx) {
  const { lectura, signoRotulo, chequeos, metaPrev, suma, fin, imp, escalon3_214, caso, year, clubId, estado, pdf, vigentes, notas, U, md, cola, ajustes, reintentos, conSigno, res, notaSubtotalLados, confirmadosPorSumas, escribirRubros, registro } = ctx;
  // SIGNOS DE FINANCIERO E IMPUESTO PARA LA CARGA (escalón de la etapa 8 aprobado por Guido: "lo que cerró en la
  // etapa 6 no se vuelve a decidir en la 8"). Hasta la 374 se escribían TAL COMO ESTÁN IMPRESOS y cargar.mjs los sumaba: si el resultado
  // cerró invirtiendo un signo (lectura "financiero e impuesto invertidos", escalón "impuesto restado", ajuste con impuesto deducido), la
  // carga sumaba al revés. Caso: Fortaleza 2025, impuesto 372.407 restado para llegar a 313.440; la carga lo sumaba y daba 1.054.344.
  // Ahora se escriben como su EFECTO EN EL RESULTADO (final = ingresos − gastos + financiero + impuesto). Si cerró "como impresos", no
  // cambia nada (UC).
  const lect = String(lectura || '');
  const sfCarga = ctx.forzado ? 1 : /financiero e impuesto invertidos|financiero invertido/.test(lect) ? -1 : 1;
  // "financiero por rótulo": cada fila con el signo de su rótulo (las que no dicen nada, como están impresas)
  const porRotulo = !ctx.forzado && /por rótulo/.test(lect);
  const finCarga = (f) => (porRotulo ? (signoRotulo(f) ? signoRotulo(f) * (/con signo/.test(lect) ? (f.M || 0) : Math.abs(f.M || 0)) : f.M) : sfCarga * f.M);
  const siCarga = ctx.forzado || ctx.resultadoFinal?.impuesto === 'restado' ? -1 : ctx.resultadoFinal?.impuesto === 'sumado' ? 1 : /financiero e impuesto invertidos|impuesto invertido/.test(lect) ? -1 : 1;

  // SOLO EL RESULTADO coincide a 0,01% (de los ingresos): con el resultado exacto,
  // lo único que se escapa es un error que se compensa (la misma cifra en los dos lados, una fila que falta de un lado y sobra del otro).
  // Se le pregunta a Claude con las líneas del estado y lo que se carga (tools/primer-anio-ia.mjs), con los signos de la carga: sin ninguna
  // fila marcada, no hace falta el caso; con alguna, el caso lleva la cita. Sin respuesta guardada, el caso queda como antes y el pedido queda
  // "pendiente". MEDICIÓN (PRIMER_ANIO_SIMULAR=1): un año con el anterior ya cargado arma igual el pedido (no abre casos ni cambia chequeos).
  const r214 = chequeos.find((x) => x.nombre === 'resultado del ejercicio');
  const simular214 = metaPrev && process.env.PRIMER_ANIO_SIMULAR === '1' && r214?.ok === true && r214.dif != null && r214.dif <= 1e-4 * Math.abs(suma(ctx.ing));
  if (ctx.primerAnio214 || simular214) {
    let alarma214 = null;
    if (ctx.primerAnio214?.escalon3 || simular214) {
      const num = (v) => (Number.isFinite(v) ? r6(v) : 0);
      const filas214 = [...ctx.ing.map((f) => ({ f, lado: 'ingreso' })), ...ctx.gas.map((f) => ({ f, lado: 'gasto' }))].map(({ f, lado }) => { const vuelta = f.lado && f.lado !== lado && f.M < 0; return { lado: vuelta ? f.lado : lado, etiqueta: f.etiqueta, M: num(vuelta ? -f.M : f.M), linea: f.linea ?? null }; }) // como en `lineas` del .verificacion.json: una deducción en su lado y en positivo
        .concat(fin.map((f) => ({ lado: 'financiero', etiqueta: f.etiqueta, M: num(finCarga(f)), linea: f.linea ?? null })), imp.map((f) => ({ lado: 'impuesto', etiqueta: f.etiqueta, M: num(siCarga * f.M), linea: f.linea ?? null })));
      const g = escalon3_214(filas214);
      if (g?.ok && !simular214) chequeos.push({ nombre: 'primer año', ok: true, detalle: 'solo el resultado coincide con lo impreso, y Claude no encontró ninguna fila del estado que falte, sobre, se repita o esté del lado equivocado (to-do 214, escalón 3)' });
      if (g && !g.ok) alarma214 = g.detalle;
    }
    if (ctx.primerAnio214 && ctx.primerAnio?.estado !== 'confirmado')
    caso('primer-anio', String(year), `Primer año automático de este club${clubId ? '' : ' (club nuevo)'}: no hay año anterior cargado para comparar. Revisar que los ingresos (${r6(suma(ctx.ing))}), los gastos (${r6(suma(ctx.gas))}) y el resultado coincidan con el estado de resultados impreso.${alarma214 ? ` Claude (escalón 3) marcó: ${alarma214}` : ''}`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  }
  const obsoletos = cerrarObsoletos(pdf, 'verificar', vigentes);
  if (obsoletos) notas.push(`${obsoletos} caso(s) viejos de la cola se cerraron como obsoletos (esta corrida ya no los levanta)`);
  const yaReintentado = Number(U.indiceAmpliado === true ? 1 : U.indiceAmpliado || 0) >= VERSION_AMPLIADO; // reintentado con el índice ampliado vigente
  const out = { pdf, md, generado: new Date().toISOString(), scriptHuella: huellaVerificar(), estado: cola.length ? 'cola' : 'ok', clubId, year, escala: ctx.escala, ajustes: ajustes.length ? ajustes : null, cola, chequeos, notas,
    reintentar: reintentos.length && !yaReintentado ? reintentos : null, reintentado: yaReintentado, faltasDesglose: reintentos.length ? reintentos : null, // faltasDesglose: siempre, para tools/diagnostico-desglose.mjs
    // resultadoParaCargar (sale de la escalera del resultado final y un ajuste manual gana): si cerró contra "resultado antes de impuestos",
    // el resultado del ejercicio es ese ± el impuesto, el que esté impreso; null si no se pudo confirmar (va a la cola). cargar.mjs hace su
    // tie-out contra este número.
    totales: { ingresos: r6(suma(ctx.ing)), gastos: r6(suma(ctx.gas)), financiero: r6(conSigno(fin)), impuesto: r6(conSigno(imp)), resultadoImpreso: r6(res), resultadoParaCargar: r6(ctx.resParaCargar), resultadoFinal: ctx.resultadoFinal, lecturaSignos: lectura },
    // una hoja de nota de un lado que quedó RESTANDO dentro del otro (Goiás 2025: "Outras Receitas (b)" 1.439.848, ingreso,
    // dentro de "Outras Receitas e Despesas", renglón de gastos) se escribe en SU lado y en positivo: es lo mismo que cerró, sin decidir
    // nada nuevo. Hasta la 391 salía como ingreso negativo y la carga no cerraba.
    lineas: [...ctx.ing.map((f) => [f, 'ingreso']), ...ctx.gas.map((f) => [f, 'gasto'])].map(([f0, lista]) => { const opuesto = lista === 'ingreso' ? 'gasto' : 'ingreso'; const f1 = f0.lado === opuesto && f0.M < 0 ? { ...f0, M: -f0.M } : f0; return f1.lado === 'financiero' ? { ...f1, lado: lista } : f1; /* una fila del financiero que suma dentro de los ingresos o de los gastos (una nota de Outros rendimentos que trae 'Juros') se escribe con el lado de esa lista: cargar.mjs manda a gasto todo lo que no es 'ingreso' (Marítimo 2023-24, Paços 2021-22, Santa Clara) */ }).map((f) => ({ etiqueta: f.etiqueta, lado: f.lado, M: r6(f.M), pagina: f.pagina, linea: f.linea ?? null, origen: f.origen || 'estado', ...(f.catAjuste ? { categoria: f.catAjuste } : {}) })),
    // financiero / impuesto: su efecto en el resultado (ver SIGNOS ... PARA LA CARGA arriba); `signosCarga` dice qué se invirtió.
    signosCarga: { financiero: porRotulo ? 'rótulo' : sfCarga, impuesto: siCarga },
    // `destino` (ajuste `fila` del lado financiero con --destino profit_on_player_sales, Auditora 5): cargar.mjs la manda a profitOnPlayerSales y no a netInterest
    financiero: fin.map((f) => ({ etiqueta: f.etiqueta, M: r6(finCarga(f)), linea: f.linea, ...(f.destino ? { destino: f.destino } : {}) })), impuesto: imp.map((f) => ({ etiqueta: f.etiqueta, M: r6(siCarga * f.M), linea: f.linea })) };
  if (ctx.primerAnio) out.primerAnio = ctx.primerAnio; // lo lee tools/primer-anio-ia.mjs
  if (notaSubtotalLados.size) out.notaSubtotal = [...notaSubtotalLados]; // la señal que se queda prendida, ver ladosCero
  if (confirmadosPorSumas.length) out.confirmadosPorSumas = confirmadosPorSumas; // los lee avisarRegistro()
  writeFileSync(resolve(ROOT, derivado(md, '.verificacion.json')), JSON.stringify(out, null, 1));
  // --rubros: la lista de rubros para la categorización de siempre (etapa 7), con las líneas verificadas. Club: el id del sitio o, si es nuevo,
  // el slug de la carpeta (el mismo id provisorio que usa el pipeline).
  if (escribirRubros) {
    const club = clubId || pdf.split('/')[2].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const rubros = out.lineas.filter((l) => l.origen !== 'redondeo').map((l) => ({ label: l.etiqueta, lado: l.lado === 'ingreso' ? 'revenue' : 'expense', page: l.pagina, section: l.origen, values: [l.M] }));
    // Si el .rubros.json que ya está tiene EXACTAMENTE lo mismo (md, pdf, club, año y cada rubro) salvo la fecha y las glosas,
    // no se reescribe: reescribirlo borraba las glosas y glosar-rubros.mjs volvía a pagar a Gemini por cada documento de cada corrida del lote
    // (~19 s por documento), aunque no hubiera cambiado nada. Jev y Claude ya no se rehacían (huellas.mjs excluye la glosa y la fecha).
    const pR = resolve(ROOT, derivado(md, '.rubros.json'));
    const sinGlosa = (arr) => JSON.stringify((arr || []).map(({ glosa, ...r }) => r));
    let igual = false; try { const v = JSON.parse(readFileSync(pR, 'utf8')); igual = v.md === md && v.pdf === pdf && v.club === club && v.year === year && sinGlosa(v.rubros) === sinGlosa(rubros); } catch { /* no hay */ }
    if (!igual) writeFileSync(pR, JSON.stringify({ md, pdf, club, year, generatedAt: new Date().toISOString(), origen: 'verificar.mjs (proceso nuevo, Versión 324)', rubros }, null, 1));
    if (out.estado === 'ok') avisarRegistro(md, rubros.length, registro, out);
  }
  return { out };
}

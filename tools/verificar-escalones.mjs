// ============================================================================
// tools/verificar-escalones.mjs — los escalones de cierre de verificar() cuando la lectura simple no cierra
// Mudado de tools/verificar.mjs sin cambiar una línea (salvo `export`); tools/verificar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ajustesDe } from './ajustes.mjs';
import { DE_LOS_CUALES_RE, normalizar } from './vocabulario.mjs';
import { r6, cerrarNota } from './verificar.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// Los escalones de cierre cuando la lectura simple no cierra (de los cuales, 17 resta).
export function faseEscalones(ctx) {
  const { nbbV, e, evaluar, hayRepetido, ing4r, gas4r, cambiaSigno4e, ing4e, gas4e, notas, md, ing4, gas4, ing5, gas5, fin5Todos, fin5, estado, conSigno } = ctx;
  ctx.E = null; ctx.E0 = null;
  let algunaCierraRes = false; ctx.escalonAjFin = false;
  ctx.escalonSubRep = false; ctx.escalonSignoDoc = false;
  // con las filas NBB, primero la lectura 4 (signo impreso: una reversión "(+)/(-)" negativa resta en su lado). La 0 lee en
  // valor absoluto y, con la tolerancia, podía dar por bueno un estado con una reversión sumada (Patro Eisden 2025 cerraba así).
  for (const n of nbbV ? [4, 0, 1, 2, 3, 5, 6] : [0, 1, 2, 3, 4, 5, 6]) {
    const e = evaluar(n); if (!ctx.E0) ctx.E0 = e; if (e.okRes) algunaCierraRes = true; if (e.cierra) { ctx.E = e; break; }
    // después de la lectura 4 y antes de la 5: la 4 sin los subtotales que repiten el renglón de arriba. Misma
    // compuerta que la 4 (totales impresos y resultado). Solo si la base cambia (hay un subtotal repetido).
    if (n === 4 && hayRepetido) { const er = evaluar(4, false, null, { ing: ing4r, gas: gas4r }); if (er.okRes) algunaCierraRes = true; if (er.cierra) { ctx.E = er; ctx.escalonSubRep = true; break; } }
    if (n === 4 && cambiaSigno4e) { const es = evaluar(4, false, null, { ing: ing4e, gas: gas4e }); if (es.okRes) algunaCierraRes = true; if (es.cierra) { ctx.E = es; ctx.escalonSignoDoc = true; notas.push('escalón "signo del documento": los ajustes `fila` con el signo contrario al de su lado en el estado restan; cerró la lectura 4'); break; } }
  }
  // ESCALÓN "de los cuales". Una fila que empieza con "Waarvan:" / "dont" / "davon" / "of which" /
  // "de los cuales" (vocabulario.mjs DE_LOS_CUALES) es una PARTE de la de arriba: sumada aparte, cuenta dos veces. No se saca siempre (manta
  // corta): solo si NINGUNA lectura cerró, se prueban las lecturas 4 y 5 sin esas filas. Compuerta: cierra EXACTO. Caso: Lierse SK 2025 (L255-256),
  // Brutomarge 2.706.155 y debajo "Waarvan: niet-recurrente bedrijfsopbrengsten" 82.200; Patro Eisden 2025 (1.810). Antes, un ajuste `fila` en 0.
  let escalonDeLosCuales = false;
  // También una fila que el .md imprime debajo de un encabezado "Analysed as" (hasta 3 líneas antes, en la misma tabla): el
  // desglose del renglón de arriba ("Exceptional items" ya dentro de "Administrative expenses", West Ham 2020-21 a 2023-24). Misma compuerta.
  const lineasMdAs = (() => { try { return readFileSync(resolve(ROOT, md), 'utf8').split('\n'); } catch { return []; } })();
  const bajoAnalysedAs = (f) => { for (let i = f.linea - 2; i >= Math.max(0, f.linea - 4); i--) { const t = lineasMdAs[i] || ''; if (!t.startsWith('|')) return false; if (/^\|\s*[*_]*\s*analysed as\b/i.test(t)) return true; } return false; };
  const esDeLosCuales = (f) => f.tipo === 'renglon' && (DE_LOS_CUALES_RE.test(normalizar(f.etiqueta || '')) || (f.linea && bajoAnalysedAs(f)));
  if (!ctx.E && [...ing4, ...gas4, ...ing5, ...gas5].some(esDeLosCuales)) {
    for (const [n, i0, g0] of [[4, ing4, gas4], [5, ing5, gas5]]) {
      const e = evaluar(n, false, null, { ing: i0.filter((f) => !esDeLosCuales(f)), gas: g0.filter((f) => !esDeLosCuales(f)) });
      if (e.cierra && e.exacto) { ctx.E = e; escalonDeLosCuales = true; break; }
    }
    if (escalonDeLosCuales) notas.push(`escalón "de los cuales": cerró la lectura ${ctx.E.nivel} sin las filas ${[...ing4, ...gas4, ...ing5, ...gas5].filter(esDeLosCuales).map((f) => `"${String(f.etiqueta).slice(0, 50)}" L${f.linea}`).filter((x, i, a) => a.indexOf(x) === i).join(', ')} (una parte de la fila de arriba)`);
  }
  if (!ctx.E && !algunaCierraRes && fin5Todos.length > fin5.length) { const e = evaluar(5, true); if (e.cierra) { ctx.E = e; ctx.escalonAjFin = true; } }
  // ESCALÓN "17) resta". El formato del Codice Civile imprime el renglón 17)
  // "interessi e altri oneri finanziari" en positivo y lo resta por POSICIÓN ("TOTALE (C) (15+16-17)"); el financiero se lee con el signo
  // impreso y lo suma. Solo corre si el resultado no cerró EXACTO en ninguna lectura. Propone: el 17) y lo que cuelga de él (hasta el 17-bis o
  // el total de C) como −|valor|; 16) y 17-bis con su signo. Compuerta ÚNICA: la suma da EXACTO el total de C impreso (el último subtotal del
  // financiero antes de que la extracción salga de la sección). Si pasa, las lecturas 0-6 otra vez con ese financiero, y gana la primera que
  // cierra el resultado exacto. Caso: Torino 2024 (.md L515-520), 16) 438.730, 17) 3.226.978, TOTALE (C) (2.788.248): 438.730 − 3.226.978 =
  // −2.788.248; resultado 19.682.867 − 2.788.248 − 6.496.317 = 10.398.302. No corre donde el 17) ya viene entre paréntesis y cierra
  // (Atalanta, Sassuolo, Monza, Lazio, Roma 2022). No mira la etiqueta del renglón ("oneri"), solo la numeración del formato; el nombre fijo del 17) en las filas vale solo si el .md no
  // trae el 17).
  ctx.escalon17 = false; ctx.fin17 = null; ctx.nota17bis = null; ctx.nota17D = null;
  const finEst = estado.filter((f) => f.lado === 'financiero');
  // El encabezado del 17) se busca en el .md, no en las filas: la extracción a veces no lo trae (Cremonese 2025: "17) interessi e altri oneri
  // finanziari" sin importe, L189) o lo trae sin el número (Torino 2018, L568). Se reconoce por la numeración del formato o por su nombre fijo
  // (art. 2425 del Codice Civile; "17) INTEREST AND OTHER FINANCIAL EXPENSES" en los de Juventus en inglés).
  const RX17 = /(^|\|)\s*(\*\*)?\s*17\s*\)|interessi\s+e(d)?\s+altri\s+oneri\s+finanziari|interest\s+and\s+other\s+financial\s+(expenses|charges)/i;
  const RX17NOMBRE = /interessi\s+e(d)?\s+altri\s+oneri\s+finanziari|interest\s+and\s+other\s+financial\s+(expenses|charges)/i;
  const RX17BIS = /17\s*[-\s]?\s*bis|utili\s+e\s+(\()?perdite\)?\s+su\s+cambi|exchange\s+(gains|differences)/i;
  const lineasMd = (() => { try { return readFileSync(resolve(ROOT, md), 'utf8').split('\n'); } catch { return []; } })();
  const iniC = finEst.length ? Math.min(...finEst.map((f) => f.linea || Infinity)) : null;
  let cab17 = null;
  if (iniC != null && isFinite(iniC)) for (let i = iniC - 1; i < Math.min(lineasMd.length, iniC + 80); i++) if (RX17.test(lineasMd[i] || '')) { cab17 = { linea: i + 1, etiqueta: lineasMd[i].trim().slice(0, 60) }; break; }
  // Si el .md no trae el 17) a la altura de la tabla (Torino 2019: la transcripción dejó las etiquetas como texto arriba,
  // L600-612, y los importes en una tabla sin nombres, L644-650), vale el nombre fijo del renglón que le puso la extracción a la fila del
  // financiero ("Interessi e altri oneri finanziari", L646). Misma compuerta de abajo.
  if (!cab17) { const h = finEst.filter((f) => isFinite(f.linea) && RX17NOMBRE.test(String(f.etiqueta))).sort((a, b) => a.linea - b.linea)[0]; if (h) cab17 = { linea: h.linea, etiqueta: String(h.etiqueta).slice(0, 60), deFilas: true }; }
  if (cab17 && (!ctx.E || !ctx.E.exacto)) {
    // fin de la sección C: el primer encabezado de D (rettifiche), del 18), del E) del formato viejo o el resultado antes de impuestos en el
    // .md; si no hay, la primera fila de otro lado. El total de C es el último subtotal del financiero antes de ese fin (Torino 2018: la D
    // vino como financiero, L571-572, y su total 0 no es el de C, L570).
    const RXFINC = /rettifiche\s+di\s+valor|(^|\|)\s*(\*\*)?\s*18\s*\)|risultato\s+prima\s+delle\s+imposte|adjustments\s+to\s+(the\s+)?(value|financial)|extraordinary|before\s+tax/i;
    const RXDE = /(^|\|)\s*(\*\*)?\s*[DE]\s*\)/; // D) / E) en mayúscula: "d) oneri diversi" es un renglón del 17)
    let finC = null; for (let i = cab17.linea; i < Math.min(lineasMd.length, cab17.linea + 80); i++) if (RXFINC.test(lineasMd[i] || '') || RXDE.test(lineasMd[i] || '')) { finC = i + 1; break; }
    const finSeccion = finC ?? estado.find((f) => f.linea > cab17.linea && f.lado !== 'financiero')?.linea;
    // El total de C es el último subtotal antes del fin de la sección; si con él la compuerta no cierra, se prueban los
    // anteriores, del último al primero, y vale el primero que cierra. Hace falta cuando el .md no tiene etiquetas y no se sabe dónde termina C
    // (Torino 2019: el último es el 0 de la D, L650; el de C es (108.044), L648). La compuerta es la misma: el total impreso, exacto.
    const candTotC = finEst.filter((f) => f.tipo !== 'renglon' && isFinite(f.M) && f.linea > cab17.linea && (!finSeccion || f.linea < finSeccion)).sort((a, b) => b.linea - a.linea);
    for (const totC of candTotC) {
    let bis = null; for (let i = cab17.linea; i < totC.linea - 1; i++) if (RX17BIS.test(lineasMd[i] || '')) { bis = i + 1; break; }
    {
      const hasta = bis || totC.linea;
      let prop = fin5Todos.map((f) => (f.origen !== 'ajuste manual' && f.linea >= cab17.linea && f.linea < hasta ? { ...f, M: -Math.abs(f.M), origen: 'estado (escalón 17) resta)' } : f));
      const tolC = Math.max(1e-6, 0.5 * [...prop, totC].reduce((a, f) => a + (f.u || 0), 0));
      // si no da el total de C, LAS SUMAS ELIGEN EL SIGNO de las filas del 17-bis (utili suma, perdite resta, pero impreso
      // las dos en positivo; o el 17-bis metido dentro del total del 17): se prueban las combinaciones de signo de esas filas (hasta 4) y se
      // usa la ÚNICA que da exacto el total de C impreso. Casos: Napoli 2024 (L287 a) utili 30, L288 b) perdite 4.559, 17bis impreso (4.529));
      // Atalanta 2019 (L429 "17-bis" 923 dentro de "Totale 17)" 1.027.884). Sin combinación única, como antes.
      // la compuerta de C mira solo las filas de C: si la extracción dejó filas de la D en el financiero (Bologna 2023-24,
      // L1279), quedan después del total de C y no entran en esta suma.
      const sumaC = () => conSigno(prop.filter((f) => !(f.linea > totC.linea)));
      if (bis && Math.abs(sumaC() - totC.M) > tolC) {
        const amb = prop.filter((f) => f.origen !== 'ajuste manual' && f.linea >= bis && f.linea < totC.linea && isFinite(f.M) && f.M);
        if (amb.length >= 1 && amb.length <= 4) {
          const resto = sumaC() - conSigno(amb); const sirven = [];
          for (let m = 0; m < 1 << amb.length; m++) { const v = amb.reduce((a, f, i) => a + ((m >> i) & 1 ? -1 : 1) * Math.abs(f.M), 0); if (Math.abs(resto + v - totC.M) <= tolC) sirven.push(m); }
          if (sirven.length === 1) { const m = sirven[0]; const ids = new Map(amb.map((f, i) => [f, (m >> i) & 1 ? -1 : 1])); prop = prop.map((f) => (ids.has(f) ? { ...f, M: ids.get(f) * Math.abs(f.M), origen: 'estado (escalón 17) resta, 17-bis por las sumas)' } : f)); ctx.nota17bis = (`escalón "17) resta": el signo del 17-bis lo eligen las sumas (${amb.map((f) => `L${f.linea} ${ids.get(f) < 0 ? 'resta' : 'suma'}`).join(', ')}): única combinación que da el total de C impreso`); }
        }
      }
      // La D que la extracción dejó en el FINANCIERO (Bologna 2023-24 y 2024-25: "19) svalutazioni, a) di partecipazioni
      // 259.314" impreso en positivo y restado por posición: "Totale delle rettifiche (18-19) (259.314)"). Después del total de C, una fila que cuelga
      // de un 19) resta y una de un 18) suma (el encabezado se busca en el .md, hacia arriba hasta el total de C). COMPUERTA: la suma de esas filas
      // con ese signo da EXACTO el total de D impreso (el último subtotal del financiero antes de salir de la sección). Si no cierra, la D queda como estaba.
      { const dFin = prop.filter((f) => f.origen !== 'ajuste manual' && f.linea > totC.linea && isFinite(f.M) && f.M);
        const salida = estado.find((f) => f.linea > totC.linea && f.lado !== 'financiero')?.linea;
        const dTot = dFin.length ? finEst.filter((f) => f.tipo !== 'renglon' && isFinite(f.M) && f.linea > totC.linea && (!salida || f.linea < salida)).sort((a, b) => a.linea - b.linea).pop() : null;
        if (dTot) {
          const sg = (f) => { for (let i = f.linea - 1; i > totC.linea; i--) { const t = lineasMd[i - 1] || ''; if (/(^|\|)\s*#*\s*(\*\*)?\s*E\s*\)\s*(\*\*)?\s*(PROVENTI E ONERI STRAORDINARI|Proventi e oneri straordinari)/.test(t)) return 0; if (/(^|\|)\s*(\*\*)?\s*19\s*\)?\s+(svalutaz|write)|svalutazion|write-?downs?|impairment/i.test(t)) return -1; if (/(^|\|)\s*(\*\*)?\s*18\s*\)?\s+(rivalutaz|revaluat)|rivalutazion|revaluation/i.test(t)) return 1; } return 0; };
          const ORD = 'estado (escalón 17) resta, D por posición)';
          const conD = prop.map((f) => (dFin.includes(f) ? { ...f, M: sg(f) ? sg(f) * Math.abs(f.M) : f.M, origen: ORD } : f));
          if (Math.abs(conSigno(conD.filter((f) => f.origen === ORD)) - dTot.M) <= Math.max(1e-6, 0.5 * [...dFin, dTot].reduce((a, f) => a + (f.u || 0), 0))) { prop = conD; ctx.nota17D = `escalón "17) resta": la D que quedó en el financiero va con el signo de su encabezado (${dFin.map((f) => `L${f.linea} ${sg(f) < 0 ? 'resta' : sg(f) > 0 ? 'suma' : 'como impresa'}`).join(', ')}): su suma da el total de D impreso (L${dTot.linea})`; }
        } }
      // Compuerta: toda la propuesta da el total de C (como siempre) o, si hay filas de D en el financiero, la parte de C lo da y el escalón cambió algo.
      if (Math.abs(conSigno(prop) - totC.M) <= tolC || (Math.abs(sumaC() - totC.M) <= tolC && prop.some((f, i) => f.M !== fin5Todos[i].M))) {
        ctx.fin17 = prop;
        for (const n of [0, 1, 2, 3, 4, 5, 6]) {
          const e = evaluar(n, false, ctx.fin17); if (e.cierra && e.exacto) { ctx.E = e; ctx.escalon17 = true; ctx.escalonSubRep = false; break; }
          // la escalera completa también acá: después de la 4, la base del escalón "subtotal repetido" (Parma 2018, 2024 y 2025 necesitan los dos)
          if (n === 4 && hayRepetido) { const er = evaluar(4, false, ctx.fin17, { ing: ing4r, gas: gas4r }); if (er.cierra && er.exacto) { ctx.E = er; ctx.escalon17 = true; ctx.escalonSubRep = true; break; } }
        }
        break; // la compuerta cerró con este total de C: no se prueban los anteriores
      }
    }
    }
  }
  return { lineasMd };
}

// Los escalones de cierre que siguen (sección D, ventana de otros, renglón grande, financiero en bloque, acumulados, otros con el signo).
export function faseEscalonesD(ctx) {
  const { estado, lineasMd, pdf, otros, conSigno, fin, e, evaluar, hayRepetido, ing4r, gas4r, notas, ANTES_RE, ladosCero, lineasDeLado, aplicarAjustesFila, notaSubtotalLados, notasNotaSub, finBloque, ing4c, gas4c, finAcum, ing4a, gas4a, ing4, gas4, filaAntes, chequeos, filas, notasSubRep, notasFinBloque, notasAcum, fin5Todos, fin5, resFinal, NOMBRES_LECTURA } = ctx;
  // ESCALÓN "sección D". Las rettifiche di valore di attività finanziarie (D del Codice
  // Civile: 18) rivalutazioni suma, 19) svalutazioni resta) llegan de la extracción sin lado y la lectura 3 las suma como ingreso o gasto
  // por su signo, o la tolerancia las tapa. Solo corre si el resultado no cerró EXACTO. Propone: las filas sin lado entre la última fila del
  // financiero y "Risultato prima delle imposte" van al financiero; las que cuelgan de un 18) (encabezado buscado en el .md) suman |valor|,
  // las de un 19) restan |valor|, las demás con su signo impreso; salen de los renglones sin lado (no se cuentan dos veces). Compuerta: si el
  // documento imprime el total de D, la suma da exacto ese total; después las lecturas 0-6 con ese financiero (y el del escalón "17) resta"
  // si pasó su compuerta) y gana la primera que cierra EXACTO. Casos: Bologna 2019-20 (L958 "a) di partecipazioni" 1.868.716 bajo "19)
  // svalutazioni", total D (1.868.716) L960), Inter 2024-25 (L976 780.928 bajo "18)"), AC Milan 2017-18 y 2021-22, Como 2024 (L530 (8.695)).
  let escalonD = false; let finD = null;
  // Gatillo: hay filas sin lado en la posición de la D (entre la última fila del financiero y el primer resultado de abajo) y la lectura que
  // ganó no las tiene en el financiero. No alcanza con "no cerró exacto": con las notas en miles la tolerancia exacta (media unidad por
  // fila) tapa una D chica (Como 2024: 8.695 dentro de ~20 mil).
  const finLinD = estado.filter((f) => f.lado === 'financiero' && isFinite(f.linea)).map((f) => f.linea);
  const ultFin = finLinD.length ? Math.max(...finLinD) : null;
  const resD = ultFin ? estado.filter((f) => f.tipo === 'resultado' && f.linea > ultFin).sort((a, b) => a.linea - b.linea)[0] : null;
  // Solo con una sección D del Codice Civile impresa (su encabezado en el .md entre el financiero y el resultado): los IFRS en inglés
  // (Juventus 2015-16 a 2024-25) traen filas sin lado en esa zona que no son la D. Y no si ya hay un ajuste `fila` del financiero en esa zona
  // (la D ya está resuelta a mano: Como 2024 la contaba dos veces).
  // (Chievo 2014-16 e Inter 2023-24) El encabezado también vale con la "D)" y el título en celdas separadas de la tabla (Inter 2023:
  // "| **D)** | **VALUE ADJUSTMENTS ...") y con el "E) Proventi e oneri straordinari" (Chievo: sin D impresa); en la zona, un "21) oneri" resta.
  const RXDHEAD = /(^|\|)\s*#*\s*(\*\*)?\s*D\s*\)\s*(\*\*)?\s*\|?\s*(\*\*)?\s*(RETTIFICHE|Rettifiche|VALUE ADJUSTMENTS|Value adjustments|VALUATION ADJUSTMENTS|Valuation adjustments)|rettifiche\s+di\s+valore|(^|\|)\s*#*\s*(\*\*)?\s*E\s*\)\s*(\*\*)?\s*(PROVENTI E ONERI STRAORDINARI|Proventi e oneri straordinari)/;
  const conSeccionD = resD && lineasMd.slice(ultFin, resD.linea - 1).some((t) => RXDHEAD.test(t || ''));
  const ajusteEnD = resD && ajustesDe(pdf).some((a) => a.campo === 'fila' && a.lado === 'financiero' && [a.linea, a.reemplazaLinea].some((l) => l != null && Number(l) > ultFin && Number(l) <= resD.linea));
  if (resD && conSeccionD && !ajusteEnD) {
    const dRows = otros.filter((f) => f.linea > ultFin && f.linea < resD.linea);
    if (dRows.length) {
      // con una sección E (proventi e oneri straordinari) a continuación de la D, el total a igualar es la SUMA de los totales de D y de E
      // ("TOTALE ... (D)" y "TOTALE ... (E)"); sin E, el último subtotal como siempre. Caso: AC Milan 2008 a 2013 (D y E al final de cada estado).
      const totalesZona = estado.filter((f) => f.lado === 'otro' && f.tipo !== 'renglon' && isFinite(f.M) && f.M && f.linea > ultFin && f.linea < resD.linea).sort((a, b) => a.linea - b.linea);
      const totDE = totalesZona.filter((f) => /\(\s*[DE]\s*\)\s*$/i.test(String(f.etiqueta).trim()));
      const dTot = totDE.length >= 2 ? { ...totDE[totDE.length - 1], M: totDE.reduce((a, f) => a + f.M, 0), combinadoDE: totDE.map((f) => f.linea) } : totalesZona.pop();
      const RX18 = /(^|\|)\s*(\*\*)?\s*18\s*\)?\s+(rivalutaz|revaluat)|rivalutazion|revaluation/i;
      const RX19 = /(^|\|)\s*(\*\*)?\s*19\s*\)?\s+(svalutaz|write)|svalutazion|write-?downs?|impairment/i;
      // la búsqueda hacia arriba se corta en el encabezado de la sección E (proventi e oneri straordinari): sus filas llevan el signo impreso, no el
      // del 19) de la D que queda más arriba. Caso: AC Milan 2008 a 2013 (plusvalenze +40 contadas como −40).
      const RXE = /(^|\|)\s*#*\s*(\*\*)?\s*E\s*\)\s*(\*\*)?\s*(PROVENTI E ONERI STRAORDINARI|Proventi e oneri straordinari)/;
      const RX21 = /(^|\|)\s*#*\s*(\*\*)?\s*21\s*\)\s*(\*\*)?\s*oneri/i; const signoD = (f) => { for (let i = f.linea - 1; i > ultFin; i--) { const t = lineasMd[i - 1] || ''; if (RX21.test(t)) return -1; if (RXE.test(t)) return 0; if (RX19.test(t)) return -1; if (RX18.test(t)) return 1; } return 0; };
      const prop = dRows.map((f) => { const sg = signoD(f); return { ...f, lado: 'financiero', M: sg ? sg * Math.abs(f.M) : f.M, origen: 'estado (escalón sección D)' }; });
      const tolD = Math.max(1e-6, 0.5 * [...prop, ...(dTot ? [dTot] : [])].reduce((a, f) => a + (f.u || 0), 0));
      if (!dTot || Math.abs(conSigno(prop) - dTot.M) <= tolD) {
        finD = [...(ctx.fin17 || fin), ...prop]; const excl = new Set(dRows);
        for (const n of [0, 1, 2, 3, 4, 5, 6]) {
          const e = evaluar(n, false, finD, null, excl); if (e.cierra && e.exacto) { ctx.E = e; escalonD = true; ctx.escalonSubRep = false; break; }
          if (n === 4 && hayRepetido) { const er = evaluar(4, false, finD, { ing: ing4r, gas: gas4r }, excl); if (er.cierra && er.exacto) { ctx.E = er; escalonD = true; ctx.escalonSubRep = true; break; } }
        }
        if (escalonD) { notas.push(`escalón "sección D": ${prop.length} fila(s) de rettifiche${dTot?.combinadoDE ? ' y straordinari' : ''} (L${prop.map((f) => f.linea).join(', L')}) al financiero${dTot ? `; su suma da el total impreso (${r6(dTot.M)}, L${dTot.combinadoDE ? dTot.combinadoDE.join(' + L') : dTot.linea})` : ''}${ctx.fin17 ? ', con el 17) restando' : ''}; cerró la lectura ${ctx.E.nivel}`); ctx.escalon17 = false; }
      }
    }
  }
  // ESCALÓN "gestión de jugadores neta". En la tabla reclasificada de la relación de gestión
  // (AS Roma 2012-2017) la compraventa de jugadores sale NETA en una fila sin lado ("Gestione operativa netta calciatori") entre el total de
  // costos y el EBITDA, y debajo del resultado vienen otras filas sin lado ("Risultato di terzi", "Utili/perdite attuariali", otro resultado
  // integral) que la lectura 6 también suma. Solo corre si ninguna lectura cerró. Propone: de las filas sin lado, SOLO las que están entre el
  // total de costos y el "resultado antes de impuestos" (ese es el lugar de la gestión de jugadores); las demás salen. Compuerta: las lecturas
  // 0-6 con esa selección y gana la primera que cierra el resultado EXACTO. Un valor positivo entra como ingreso y uno negativo como gasto
  // (la misma convención de signos de la lectura 6). Caso: Roma 2015 (.md L1932-L1957): 180.626 + 27.651 − 196.660 − 40.215 − 820 − 7.800
  // − 3.846 = −41.064 exacto; sumando también el "Risultato di terzi" (+102) y las "perdite attuariali" (−147) no cierra.
  ctx.escalonVentanaOtros = false;
  if (!ctx.E) {
    const totCostos = estado.filter((f) => f.tipo === 'total' && f.lado === 'gasto' && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0];
    const antesFila = estado.filter((f) => f.tipo === 'resultado' && ANTES_RE.test(f.etiqueta) && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0];
    if (totCostos && antesFila && antesFila.linea > totCostos.linea) {
      const dentro = otros.filter((f) => f.linea > totCostos.linea && f.linea < antesFila.linea);
      const fuera = otros.filter((f) => !dentro.includes(f));
      if (dentro.length && fuera.length) {
        const excl = new Set(fuera);
        for (const n of [0, 1, 2, 3, 4, 5, 6]) {
          const e = evaluar(n, false, null, null, excl); if (e.cierra && e.exacto) { ctx.E = e; ctx.escalonVentanaOtros = true; ctx.escalonSubRep = false; break; }
        }
        if (ctx.escalonVentanaOtros) notas.push(`escalón "gestión de jugadores neta": de las filas sin lado, solo las de L${dentro.map((f) => f.linea).join(', L')} (entre el total de costos L${totCostos.linea} y "${antesFila.etiqueta.trim().slice(0, 40)}" L${antesFila.linea}); las ${fuera.length} de abajo salen; cerró la lectura ${ctx.E.nivel}`);
      }
    }
  }
  // ESCALÓN "renglón grande sin abrir". La nota del subtotal solo
  // corría en el camino de error (la propuesta de carga marcó una categoría en 0), y un lump_* apaga esa marca: un renglón agregado del
  // modelo italiano ("altri" 42,8 M, el 74% de los ingresos de Cremonese 2024) quedaba entero aunque el documento traiga su desglose.
  // Solo corre si la lectura que ganó deja un renglón de ingresos del estado de 20% o más del total. Propone: la MISMA lectura con la nota
  // del subtotal abierta del lado de los ingresos. Compuerta: esa lectura cierra igual (exacto si antes era exacto) y el renglón grande se
  // abrió. No depende de la categorización. Casos: Cremonese 2022 y 2024 (hoy abiertas por el camino de error), Sassuolo 2021 y 2024,
  // Sampdoria 2018 (abiertos por el reintento pago). No toca Atalanta 2024 ni Parma 2023: su estado ya viene desglosado (ningún renglón
  // llega al 20%) o su nota no suma el subtotal.
  let escalonGrande = false;
  if (ctx.E && ctx.E.cierra && ctx.E.nivel <= 4 && !ctx.escalonFinBloque && !ladosCero.has('ingreso')) {
    const totIng = ctx.E.ing.reduce((a, f) => a + Math.abs(f.M || 0), 0);
    const grande = totIng ? ctx.E.ing.find((f) => String(f.origen || '').startsWith('estado') && Math.abs(f.M || 0) >= 0.2 * totIng) : null;
    if (grande) {
      ctx.forzarNotaSub = true; ctx.totIngForz = totIng; let ingF; let gasF;
      try {
        if (ctx.E.nivel >= 4) { ingF = lineasDeLado('ingreso', 'M', true, true, ctx.escalonSubRep); gasF = lineasDeLado('gasto', 'M', true, true, ctx.escalonSubRep); aplicarAjustesFila(ingF, gasF, false, ctx.escalonSignoDoc ? 'estado' : true); }
        else if (ctx.E.nivel === 3 && otros.length) { ingF = lineasDeLado('ingreso', 'M', true); gasF = lineasDeLado('gasto', 'M', true); aplicarAjustesFila(ingF, gasF, false); }
        else { ingF = lineasDeLado('ingreso'); gasF = lineasDeLado('gasto'); aplicarAjustesFila(ingF, gasF, false); }
      } finally { ctx.forzarNotaSub = false; }
      const abrio = !ingF.some((f) => f.linea === grande.linea && String(f.origen || '').startsWith('estado'));
      if (abrio) {
        const e = evaluar(ctx.E.nivel, false, escalonD ? finD : ctx.escalon17 ? ctx.fin17 : null, { ing: ingF, gas: gasF }, escalonD ? new Set(finD.filter((f) => f.origen === 'estado (escalón sección D)').map((f) => otros.find((o) => o.linea === f.linea)).filter(Boolean)) : null);
        if (e.cierra && (e.exacto || !ctx.E.exacto)) { ctx.E = e; escalonGrande = true; notaSubtotalLados.add('ingreso'); notas.push(...notasNotaSub, `escalón "renglón grande sin abrir": "${grande.etiqueta}" (L${grande.linea}) era el ${Math.round(100 * Math.abs(grande.M) / totIng)}% de los ingresos; la misma lectura cierra con la nota del subtotal abierta`); }
      }
    }
  }
  // ESCALÓN "FINANCIERO DENTRO DE UN SUBTOTAL" (patrón C; el último: solo si ninguna lectura ni ningún escalón cerró). Un subtotal de
  // ingresos o de gastos que es la suma de los renglones de abajo con una fila del financiero adentro no se cuenta (cada parte está en su
  // lado), esa fila del financiero toma el signo de su bloque, y como los totales impresos mezclan lados, la compuerta es el resultado impreso
  // EXACTO (como en la lectura 5). Caso: Avaí 2021 sin sus ajustes a mano: cierra exacto con lo mismo que dejaron los ajustes. Más arriba en
  // la escalera (dentro del "subtotal repetido") le ganaba a la lectura 5 en Ferroviária 2012 y le cambiaba el signo del financiero.
  if (!ctx.E && finBloque) { const ec = evaluar(4, false, finBloque, { ing: ing4c, gas: gas4c, sinTotales: true }); if (ec.cierra && ec.exacto) { ctx.E = ec; ctx.escalonFinBloque = true; } }
  // ESCALÓN "ACUMULADOS" (el último: solo si nada cerró). Los totales (A)-(G) del POC no se cuentan y el financiero toma el
  // signo de su lado (ver lineasDeLado). Como los totales impresos acumulan lados, la compuerta es el resultado impreso EXACTO.
  if (!ctx.E && finAcum) { let ea = evaluar(4, false, finAcum, { ing: ing4a, gas: gas4a, sinTotales: true }); let sinOtros = false; if (!(ea.cierra && ea.exacto) && otros.length) { ea = evaluar(4, false, finAcum, { ing: ing4a, gas: gas4a, sinTotales: true }, new Set(otros)); sinOtros = true; } if (ea.cierra && ea.exacto) { ctx.E = ea; ctx.escalonAcum = sinOtros ? 'sin-otros' : true; } }
  // ESCALÓN "OTROS CON EL SIGNO DEL RESULTADO" (después de "acumulados"): una fila sin lado cuyo rótulo es neto, "(Custos)/Proveitos
  // com transacções de passes de jogadores", se imprime con el signo del RESULTADO (negativo = costo) y no con el de los gastos; y el total
  // de costos impreso excluye la amortización de pases, así que no es compuerta. Compuerta: resultado impreso EXACTO.
  ctx.escalonOtrosRes = false;
  if (!ctx.E && otros.length) { const eo = evaluar(4, false, null, { ing: ing4, gas: gas4, sinTotales: true, otrosResultado: true }); if (eo.cierra && eo.exacto) { ctx.E = eo; ctx.escalonOtrosRes = true; } }
  const sinNumero = !ctx.E && ctx.E0.ch.every((c) => c.ok === null) && !filaAntes;
  if (!ctx.E) ctx.E = ctx.E0;
  ctx.ing = ctx.E.ing; ctx.gas = ctx.E.gas; chequeos.push(...ctx.E.ch);
  // LA NOTA EXACTA TAMBIÉN EN LAS LECTURAS 5 Y 6. Esas lecturas (pensadas para los
  // balancetes) leen solo los renglones del estado y nunca abren notas. Si cerraron el resultado, un renglón se reemplaza igual por las filas
  // de la nota que extraer.mjs marcó como su desglose (detalla_a) cuando esas filas suman el renglón AL CENTAVO (cerrarNota() y además
  // diferencia cero: con la media unidad por fila de cerrarNota, el redondeo corría los totales de 42 documentos). Totales y resultado no
  // cambian; solo el detalle. Medido: 22 documentos ganan detalle (Roma 2006-2022, AC Milan, Avaí, Ferroviária, Remo, Vila Nova, AEK
  // 2022-2025), 0 con totales distintos; los ya cargados no cambian hasta que se recarguen. Caso:
  // AEK 2023, "Αμοιβές ποδοσφαιρικού και λοιπές δαπάνες" 25.364.542 (L481) = Μισθοδοσία 10.744.231 + Αποσβέσεις συμβολαίων ποδοσφαιριστών
  // 14.620.311 (nota 6.19, L1462-1463): la nómina y la amortización de pases dejan de cargarse juntas como salarios, como en 2016-2021.
  if (ctx.E.cierra && ctx.E.nivel >= 5) {
    const abrirExacta = (arr) => arr.flatMap((f) => {
      const hijas = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === String(f.etiqueta).trim());
      const c = hijas.length >= 2 ? cerrarNota(Math.abs(f.M || 0), hijas, 'M', f.u || 0) : null;
      if (!c) return [f];
      // al centavo; o a UNA unidad impresa como máximo, con la diferencia como fila
      // "Diferencia de redondeo" para que los totales no cambien. Caso: AEK 2024, 16.703.249 + 19.075.580 = 35.778.829 contra 35.778.830.
      const dif = Math.abs(f.M || 0) - c.hojas.reduce((t, h) => t + h.valorNota, 0);
      if (Math.abs(dif) > 1e-9 && Math.abs(dif) > (f.u || 0) + 1e-12) return [f];
      if (Math.abs(dif) > 1e-9) c.hojas.push({ etiqueta: 'Diferencia de redondeo', lado: f.lado, valorNota: dif, linea: f.linea, bloque: f.bloque, tipo: 'renglon', origen: 'redondeo' });
      notas.push(`escalón "nota exacta en la lectura ${ctx.E.nivel}": "${f.etiqueta}" (L${f.linea}) se abre en las ${c.hojas.length} filas de su nota, que suman exacto el renglón`);
      return c.hojas.map((h) => ({ ...h, M: h.valorNota * (f.M < 0 ? -1 : 1), lado: f.lado, origen: `nota que desglosa "${f.etiqueta}"` }));
    });
    ctx.ing = abrirExacta(ctx.ing); ctx.gas = abrirExacta(ctx.gas);
  }
  if (ctx.resCerca) notas.push(`resultado impreso fuera de los bloques (escalón 2): "${ctx.resCerca.texto}" (L${ctx.resCerca.linea}); ${ctx.E.okRes ? 'cierra exacto' : 'no cierra exacto: no se usa para confirmar'}`);
  if (ctx.escalonSubRep) notas.push(...notasSubRep, 'escalón "subtotal repetido": cerró la lectura 4 sin contar dos veces el subtotal que repite el renglón de arriba');
  if (escalonD) fin.splice(0, fin.length, ...finD);
  if (ctx.escalonFinBloque) { fin.splice(0, fin.length, ...finBloque); notas.push(...notasFinBloque, 'escalón "financiero dentro de un subtotal": cerró el resultado exacto (los totales impresos mezclan lados)'); }
  if (ctx.escalonOtrosRes) notas.push('escalón "otros con el signo del resultado": las filas sin lado (rótulo neto "(Custos)/Proveitos ...") se leen con el signo del resultado (negativo = costo) y el total de costos impreso no es compuerta; cerró el resultado impreso exacto (to-do 237 q)');
  if (ctx.escalonAcum) { fin.splice(0, fin.length, ...finAcum); notas.push(...notasAcum, `escalón "acumulados": cerró el resultado exacto sin contar los totales que acumulan el anterior${ctx.escalonAcum === 'sin-otros' ? ' ni las filas sin lado (sin-otros)' : ''} (to-do 237 q)`); }
  if ((ctx.escalon17 || escalonD) && ctx.nota17bis) notas.push(ctx.nota17bis);
  if (ctx.escalon17 && ctx.nota17D) notas.push(ctx.nota17D);
  if (ctx.escalon17) { fin.splice(0, fin.length, ...ctx.fin17); notas.push(`escalón "17) resta": el financiero con el 17) restando da el total de C impreso; cerró la lectura ${ctx.E.nivel}`); }
  else if (ctx.E.cierra && ctx.E.nivel >= 5) fin.splice(0, fin.length, ...(ctx.escalonAjFin ? fin5Todos : fin5));
  if (ctx.escalonAjFin) notas.push('escalón "ajustes del financiero sin reemplaza": ninguna lectura cerraba el resultado; cerró la lectura 5 con todos los ajustes del financiero'); // lectura 5: el financiero también con el signo C/D
  ctx.okRes = ctx.E.okRes; let lectura = ctx.E.lect; const res = ctx.E.objetivo ?? resFinal;
  if (ctx.E.cierra && ctx.E.nivel > 0) { chequeos.push({ nombre: 'lectura', ok: true, detalle: `cerró con la lectura ${ctx.E.nivel} (${NOMBRES_LECTURA.slice(1, ctx.E.nivel + 1).join(' + ')})` }); notas.push(`la lectura base no cerraba; cerró con la lectura ${ctx.E.nivel}`); }
  if (sinNumero) chequeos.push({ nombre: 'número impreso para cerrar', ok: false, detalle: 'el documento no imprime totales ni resultado en los bloques elegidos: no hay cómo confirmar las sumas' });

  return { lectura, res };
}

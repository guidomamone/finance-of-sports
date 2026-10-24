// ============================================================================
// tools/verificar-dudas.mjs — las fases de dudas de verificar(): las de localizar y extraer, y la respuesta a una contesta la otra
// Mudado de tools/verificar.mjs sin cambiar una línea (salvo `export`); tools/verificar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename, join } from 'node:path';
import { respuestaDe, respuestaPorDetalle } from './cola.mjs';
import { ajusteDe } from './ajustes.mjs';
import { normalizar } from './vocabulario.mjs';
import { parseNumber, normalizarRenglon, paginaDeLinea } from './verificar.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// Las dudas de localizar y de extraer: cuadros por naturaleza y de inventario, y cuáles van a la cola.
export function faseDudas(ctx) {
  const { estado, md, res, U, F, otros, fin, pdf, notas, clubId, registro, e, vigentes, mult, vecinos } = ctx;
  // DUDAS de localizar.mjs y de extraer.mjs. Hasta la 326 solo llegaban a la cola las de extraer, y todas con la página del
  // estado de resultados aunque hablaran de una nota de otra página; las de localizar quedaban en el .ubicacion.json sin que nadie las viera.
  // Caso real, UC 2025: localizar avisó que las notas 20 (pág. 75 del visor) y 21 (pág. 76) tenían la misma tabla —el club imprimió la de
  // gastos de administración bajo el título de costo de ventas— y la duda no llegó a Guido. Ahora:
  //   - llegan las dos, cada una con la página y las líneas del primer bloque que nombra (o de la línea "L4157" que cite el texto);
  //   - solo las que la IA marcó `afecta_carga` (puede cambiar qué filas o qué importe se carga, más que el redondeo); el resto queda en las
  //     notas del .verificacion.json. Caso real del otro lado, también UC 2025: "Remuneración 1.790.062 en una tabla y 1.790.063 en la otra"
  //     llegó a la cola y es un peso sobre 1,8 millones (pedido de Guido: una diferencia de esa magnitud no va a la cola).
  //   - las dudas en el formato viejo (texto suelto, archivos viejos) se tratan como afecta_carga = true.
  const dudaComoObjeto = (d) => (typeof d === 'string' ? { texto: d, bloques: [...new Set(d.match(/\bb\d+\b/g) || [])], afecta_carga: true } : d);
  // CITA DE MONEDA EN OTRO DOCUMENTO DEL CLUB: un importe del estado (6 cifras o más, mismos dígitos y decimales) impreso en otro
  // .md de la misma carpeta pegado a un símbolo o código de moneda, en una línea que no habla de miles. Prueba literal de que ese número está
  // en UNIDADES. Caso: OFI 2018, el estado dice Κύκλος εργασιών 527.892,56 y OFI_board_report_2018 L20 "…ανήλθε στο ποσό των 527.892,56€".
  ctx.citaMonedaMemo = undefined;
  const citaMoneda = () => {
    if (ctx.citaMonedaMemo !== undefined) return ctx.citaMonedaMemo;
    ctx.citaMonedaMemo = null;
    const nums = [...new Set(estado.map((f) => String(f.actual ?? '').replace(/[()\s−-]/g, '')).filter((t) => (t.match(/\d/g) || []).length >= 6))];
    if (!nums.length) return null;
    const dir = dirname(resolve(ROOT, md)); const propio = basename(md);
    const MON = '€|eur\\b|euros?\\b|ευρω|ευρώ|r\\$|us\\$|usd\\b|£|gbp\\b|kč|czk\\b|kr\\.?(?![\\p{L}])|dkk\\b|nok\\b|sek\\b|chf\\b|₽|руб|rub\\b|¥|円|\\$';
    const MILES = /miles|\bmil\b|thousand|χιλ|tausend|tsd|teur|migliaia|milhares|tusind|tusen|тыс|k€|€k|'000/;
    const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let hermanos = [];
    try { hermanos = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== propio && !/\.(t-[a-z]+|previo-[^.]*|mistral-redo|gemini-check|claude-check|antes-sumas)\.md$/.test(f)); } catch { return null; }
    const res = nums.map((n) => new RegExp(`(?<![\\d.,])${esc(n)}(?!\\d|[.,]\\d)\\s?(?:${MON})|(?:${MON})\\s?${esc(n)}(?!\\d|[.,]\\d)`, 'iu'));
    for (const h of hermanos.sort()) {
      let L; try { L = readFileSync(join(dir, h), 'utf8').split('\n'); } catch { continue; }
      for (let i = 0; i < L.length; i++) {
        if (MILES.test(normalizar(L[i]))) continue;
        const k = res.findIndex((re) => re.test(L[i]));
        if (k >= 0) { ctx.citaMonedaMemo = { doc: h, linea: i + 1, numero: nums[k] }; return ctx.citaMonedaMemo; }
      }
    }
    return null;
  };
  // CUADRO POR NATURALEZA: "¿Se carga <cuadro> como desglose conjunto / por naturaleza /
  // transversal…?" lo decide una cuenta, no una persona. Hasta acá siempre se contestó así a mano (Asteras 2020-2025, OFI 2020 y 2025, Levadiakos
  // 2020). El cuadro es el PRIMER bloque de la duda (no del estado); su total es su fila de total o subtotal de un lado (si hay varias, todas con
  // el mismo importe: Asteras imprime "Σύνολο" bajo el cuadro y bajo su "Κατανομή ανά κατηγορία"); a ese total se le restan sus filas de otro
  // lado. Se prueban TODAS las combinaciones de renglones del estado de ese lado, más las filas del financiero del mismo signo (AEL 2023: el
  // cuadro 2.745.139,63 = costo de ventas + administración + comercialización + intereses 7.608,42). COMPUERTA, exacto a media unidad por fila:
  //   - UNA sola combinación da el total y la propuesta de la IA es "sí": sí (Asteras 2020: 4.444.615,37 = L862 + L866 + L867);
  //   - NINGUNA da y la carga no usa filas de ese cuadro: no (OFI 2020 gastos: 5.716.721,43 sin los intereses; ninguna combinación);
  //   - si no, a la cola. Solo esa forma de pregunta: "¿Se carga la nota 30 solo como detalle alternativo, sin reemplazar…?" (Cuiabá 2022) es
  //     otra pregunta, donde "sí" quiere decir que NO entra.
  // Medido en las 17 dudas de esta forma de Generados/: decide 14; las 7 contestadas, con la misma respuesta; 0 distintas.
  const cuadroNaturaleza = (d) => {
    if (!/^¿\s*Se\s+cargan?\b[^?]*\bcomo\s+(?:un\s+)?(?:desglose|detalle)\s+(?:conjunto|por\s+naturaleza|transversal)/i.test(d.pregunta || '')) return null;
    const C = (d.bloques || [])[0]; const est = new Set(U.estado || []); if (!C || est.has(C)) return null;
    const num = (f) => Math.abs(parseNumber(f.actual) ?? NaN); const sg = (f) => Math.sign(parseNumber(f.actual) || 0);
    const filasC = (F.filas || []).filter((f) => f.bloque === C);
    const tots = filasC.filter((f) => (f.tipo === 'total' || f.tipo === 'subtotal') && (f.lado === 'ingreso' || f.lado === 'gasto'));
    if (!tots.length) return null;
    const lado = tots[0].lado; const T = num(tots[0]);
    if (!isFinite(T) || tots.some((f) => f.lado !== lado || Math.abs(num(f) - T) > 0.01)) return null;
    const otros = filasC.filter((f) => f.tipo === 'renglon' && f.lado !== lado && isFinite(num(f)));
    const P = T - otros.reduce((a, f) => a + num(f), 0);
    const cand = (F.filas || []).filter((f) => est.has(f.bloque) && f.tipo === 'renglon' && (f.lado === lado || (f.lado === 'financiero' && sg(f) === (lado === 'gasto' ? -1 : 1)))).map((f) => ({ f, v: num(f) })).filter((x) => isFinite(x.v) && x.v > 0);
    if (!cand.length || cand.length > 14) return null;
    const dec = (String(tots[0].actual).split(/[.,]/).pop() || '').length; const u = dec > 0 && dec <= 2 ? 10 ** -dec : 1;
    const dan = [];
    for (let m = 1; m < (1 << cand.length); m++) { let s = 0; let k = 0; for (let i = 0; i < cand.length; i++) if ((m >> i) & 1) { s += cand[i].v; k++; } if (Math.abs(s - P) <= 0.5 * u * (k + 1 + otros.length)) dan.push(m); }
    if (dan.length === 1 && d.propuesta === 'sí') return { decision: 'sí', porque: `el cuadro ${C} (${String(tots[0].actual)}) es la suma de ${cand.filter((x, i) => (dan[0] >> i) & 1).map((x) => `L${x.f.linea}`).join(' + ')}` };
    if (!dan.length && ![...ctx.ing, ...ctx.gas].some((f) => f.bloque === C)) return { decision: 'no', porque: `el cuadro ${C} (${String(tots[0].actual)}) no es la suma de ningún grupo de renglones del estado, y la carga no usa sus filas` };
    return null;
  };
  // EL CUADRO DE INVENTARIOS. "Apuramento do custo das mercadorias vendidas" (inicial + compras ± regularizações − final = costo)
  // no es un desglose aditivo y abría 2 dudas por club con la misma respuesta (Porto b102, Santa Clara b20, Braga b38; 31 en la cola). La
  // respuesta es siempre la misma, aunque la pregunta venga redactada al revés ("¿se cargan…?" / "¿se dejan afuera…?"): el cuadro queda afuera
  // y se carga el renglón del estado. COMPUERTA, una sola: el bloque de la duda tiene UNA fila de inventario inicial, UNA de final, compras y
  // UNA de costo, la identidad da exacta (media unidad por fila), el estado tiene un renglón con ese costo y la carga no usa ninguna fila del
  // cuadro. Entonces la duda no cambia nada de lo que se carga: se cierra con nota. Si algo no se cumple, sigue a la cola como siempre.
  const cuadroInventario = (d) => {
    const est = new Set(U.estado || []); const num = (f) => Math.abs(parseNumber(f.actual) ?? NaN);
    for (const C of (d.bloques || []).slice(0, 1)) { // el cuadro es el PRIMER bloque de la duda (como en cuadroNaturaleza): una duda de escala de "todos los bloques" no es sobre el cuadro
      if (est.has(C)) continue;
      const filasC = (F.filas || []).filter((f) => f.bloque === C && isFinite(parseNumber(f.actual) ?? NaN));
      const nl = (f) => normalizar(String(f.etiqueta ?? f.label ?? ''));
      const ini = filasC.filter((f) => /inicia|no inicio|saldo inicial|existencias? inicia/.test(nl(f)));
      const fin = filasC.filter((f) => /\bfina(l|is)\b|no fim|fim do periodo|saldo final/.test(nl(f)));
      const comp = filasC.filter((f) => /\bcompras?\b|purchases/.test(nl(f)) && !ini.includes(f) && !fin.includes(f));
      const reg = filasC.filter((f) => /regulariza|reclassifica/.test(nl(f)) && !ini.includes(f) && !fin.includes(f));
      const cmv = filasC.filter((f) => /custo|c\.?m\.?v|mercadorias vendidas|consumid|cost of (goods|sales)/.test(nl(f)) && ![...ini, ...fin, ...comp, ...reg].includes(f));
      if (ini.length !== 1 || fin.length !== 1 || cmv.length !== 1 || comp.length < 1) continue;
      const dec = (String(cmv[0].actual).split(/[.,]/).pop() || '').length; const u = dec > 0 && dec <= 2 ? 10 ** -dec : 1;
      const calc = num(ini[0]) + comp.reduce((a, f) => a + num(f), 0) + reg.reduce((a, f) => a + (parseNumber(f.actual) || 0), 0) - num(fin[0]);
      const n = 3 + comp.length + reg.length;
      if (Math.abs(calc - num(cmv[0])) > 0.5 * u * n) continue;
      if (!(F.filas || []).some((f) => est.has(f.bloque) && f.tipo === 'renglon' && Math.abs(num(f) - num(cmv[0])) <= 0.5 * u)) continue;
      if ([...ctx.ing, ...ctx.gas].some((f) => f.bloque === C)) continue;
      return `el bloque ${C} es el cuadro de inventarios: inicial ${ini[0].actual} + compras ${comp.map((f) => f.actual).join(' + ')}${reg.length ? ` ± regularizações ${reg.map((f) => f.actual).join(', ')}` : ''} − final ${fin[0].actual} = costo ${cmv[0].actual} (L${cmv[0].linea}), el renglón del estado; la carga no usa sus filas`;
    }
    return null;
  };
  const pendientes = []; const contestadas = []; // las dudas que irían a la cola se juntan por cuadro antes de escribirlas (abajo)
  for (const [origen, lista] of [['localizar', U.dudas || []], ['extraer', F.dudas || []]]) {
    for (const d of lista.map(dudaComoObjeto)) {
      // ajuste manual sin-dudas: Guido cerró el documento; sus dudas quedan como nota y no van a la cola (las viejas se cierran
      // como obsoletas porque esta corrida ya no las levanta).
      if (ajusteDe(pdf, 'sin-dudas')) { notas.push(`duda de ${origen} cerrada por ajuste manual (sin-dudas): ${d.pregunta || d.texto}`); continue; }
      if (!d.afecta_carga) { notas.push(`duda de ${origen} que no afecta la carga: ${d.texto}`); continue; }
      // la nota de la duda la abrió el escalón 1 de las notas (grupo de renglones, cerrarNota la confirmó): se cierra con nota
      // (solo si la lectura que ganó usó esa nota: AEL 2019 cerró con la lectura 5, que lee las hojas del estado y no abre notas)
      if (ctx.gas.some((f) => (d.bloques || []).includes(f.bloque) && String(f.origen || '').includes('escalón 1: grupo'))) { notas.push(`duda de ${origen} resuelta por el escalón 1 de las notas (la nota suma el grupo): ${d.pregunta || d.texto}`); continue; }
      const b = (d.bloques || []).map((id) => U.bloques?.[id]).find(Boolean);
      const ls = (d.texto.match(/\bL(\d+)\b/g) || []).map((x) => Number(x.slice(1)));
      const lineas = ls.length ? [Math.min(...ls), Math.max(...ls)] : b ? b.lineas : null;
      const pagina = ls.length ? paginaDeLinea(md, ls[0]) ?? b?.pagina : b?.pagina ?? estado[0]?.pagina;
      // PREGUNTA DE SÍ O NO (pedido de Guido: "necesito que me hagas la pregunta concreta, no exploratoria"). Desde este cambio
      // localizar y extraer escriben cada duda como una pregunta que se contesta sí o no, con su propuesta; la cola muestra eso. Las dudas en
      // formato viejo (sin `pregunta`) se muestran con su texto, como antes.
      const que = d.pregunta ? `${d.pregunta}  (por qué: ${d.texto})` : `La IA de ${origen === 'localizar' ? 'localizar (qué bloques son el estado y sus notas)' : 'extraer (las filas)'} dejó esta duda: ${d.texto}`;
      // POR TEMA: si la IA clasificó la duda en un tema de la lista fija (no 'otro'), se reconoce por
      // club + tema + renglón, no por el texto. Si Guido ya la contestó en CUALQUIER año del club, se aplica sola y no vuelve a la cola.
      const propuesta = d.propuesta ? `${d.propuesta} (responder aceptar si estás de acuerdo; corregir --valor "${d.propuesta === 'sí' ? 'no' : 'sí'}" si no)` : null;
      if (d.tema && d.tema !== 'otro') {
        const club = clubId || pdf.split('/')[2];
        const det = `${club}|${d.tema}|${normalizarRenglon(d.renglon)}`;
        // UN SOLO ESTADO DE RESULTADOS: la IA de localizar vio un único perímetro en el documento (perimetro individual o consolidado, no "ambos") y
        // pregunta, sin nombrar un renglón, si se carga aunque los años ya cargados sean del otro. La regla 1 de perímetro (CONVENCIONES-DATOS) ya lo decide: un ejercicio publicado con un solo
        // perímetro se carga con ese. Medido sobre 3.702 documentos: cierra 17 dudas, todas las que tenían respuesta guardada (7) eran "aceptar"; ningún caso contestado "no" (AS Roma 2005 y 2011 separato, Juventus 2022-23, Narva Trans, Kuressaare) se cierra. COMPUERTA: ningún otro documento de la carpeta del club cierra el mismo día (AS Roma 2011: el separato se descartó porque existe el consolidado del mismo ejercicio). La pregunta del perímetro DEL CLUB sigue en la etapa de cargar.
        if (origen === 'localizar' && d.tema === 'perimetro' && !String(d.renglon || '').trim() && d.propuesta === 'sí' && ['individual', 'consolidado'].includes(U.perimetro) && !registro.some((x) => x.pdf !== pdf && x.pdf.split('/').slice(0, 3).join('/') === pdf.split('/').slice(0, 3).join('/') && x.estado !== 'duplicado' && x.md && (e.periodo?.cierre ? x.periodo?.cierre === e.periodo.cierre : false))) { notas.push(`duda de localizar cerrada por la regla 1 de perímetro (el documento trae un solo estado, ${U.perimetro}): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        // ESCALÓN 1: la respuesta dada ANTES DEL ALTA del club. Sin alta, la clave lleva el nombre de la carpeta
        // ("Hellas Verona|escala|"); con alta, el id del sitio ("hellasverona-it|escala|"), y la respuesta vieja no se encontraba: la pregunta
        // volvía con otro id (56 repetidas en Goiás, Lazio, Hellas Verona...). Compuerta: el caso respondido es de la MISMA carpeta de club
        // (un "Nacional" de otro país no cuenta). Solo decisiones de verdad: una respuesta automática 'obsoleto' no contesta nada.
        const mismaCarpeta = (c) => c.pdf.split('/').slice(0, 3).join('/') === pdf.split('/').slice(0, 3).join('/');
        const antesDelAlta = clubId && clubId !== pdf.split('/')[2] ? respuestaPorDetalle('verificar', 'duda-tema', `${pdf.split('/')[2]}|${d.tema}|${normalizarRenglon(d.renglon)}`, mismaCarpeta) : null;
        const ya = respuestaPorDetalle('verificar', 'duda-tema', det) || (antesDelAlta && antesDelAlta.resp.decision !== 'obsoleto' ? antesDelAlta : null);
        if (ya) { notas.push(`duda de ${origen} ya contestada para el club${ya === antesDelAlta ? ' (antes de su alta)' : ''} (${d.tema}, "${d.renglon || '-'}"): ${ya.resp.decision}${ya.resp.valor ? ` ${ya.resp.valor}` : ''}, en ${ya.caso.pdf.split('/').pop()}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); contestadas.push({ origen, bloques: d.bloques || [], lineas, tema: d.tema, resp: ya.resp, que: ya.caso.que, propuesta: ya.caso.propuesta }); continue; }
        // DUDA DE ESCALA QUE OTRO DOCUMENTO DEL CLUB RESPONDE: si la carga usó UNIDADES para
        // el estado y otro .md de la carpeta imprime uno de sus importes con su moneda (citaMoneda, arriba), la duda se cierra con la cita. Si la
        // carga usó miles o no hay cita, sigue a la cola como siempre. Sin vigentes.push: un caso viejo abierto se cierra como obsoleto.
        if (d.tema === 'escala' && Math.abs(mult(estado[0]?.bloque) - 1e-6) < 1e-12) {
          const c = citaMoneda();
          if (c) { notas.push(`duda de ${origen} de escala confirmada por otro documento del club (to-do 213): ${c.doc} L${c.linea} imprime ${c.numero} con su moneda; la carga usó unidades`); continue; }
        }
        // ESCALÓN 2 DE LAS DUDAS: la aritmética la confirma. Si la escalera de lecturas cerró con un
        // número impreso, ningún año vecino da distinto, el tema es de los que las sumas pueden confirmar y la propuesta de la IA es "sí" (lo que
        // extraer ya aplicó), se acepta sola. Perímetro, cuadro de otro año, fila ilegible y "otro" nunca: un perímetro equivocado cierra igual.
        // Caso real: de las 5 preguntas de UC 2010-2014 que Guido contestó "sí" en un minuto, 4 eran de este tipo.
        // TEMA "ESCALA" (parte B sacada por decisión de Guido: era un desvío entre escaleras, no un escalón): las sumas
        // NO confirman una escala (cerrar es invariante a la escala del documento entero; Fortaleza CEIF 2023 tenía aceptadas a la vez "¿están
        // en miles?" y "¿están en unidades y no en miles?"), así que el tema 'escala' no está en la lista de abajo y va a la cola (o a un ajuste).
        { const inv = cuadroInventario(d); if (inv) { notas.push(`duda de ${origen} decidida por la identidad de inventarios (to-do 237 v): ${inv}. "${d.pregunta}"`); continue; } }
        if (ctx.E.cierra && !vecinos.includes(false) && ['usar-cuadro-por-segmento', 'cuadro-duplicado', 'columna'].includes(d.tema) && d.propuesta === 'sí') { notas.push(`duda de ${origen} confirmada por las sumas (${d.tema}, "${d.renglon || '-'}"): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        // ESCALÓN 2b: lo mismo cuando lo ÚNICO que frenó al escalón 2 es un año vecino que da distinto.
        // En estos 3 temas la duda es qué cuadro o qué columna del MISMO documento se usa, y eso lo confirma la suma del propio documento; el
        // vecino falla por reexpresiones o columnas perdidas (Juventus 2005-06, Inter 2019-21, Roma 2012 y 2018, Lazio 2006-07). Compuerta: la del
        // escalón 2 sin la condición del vecino (la escalera de lecturas cerró el resultado). Medido contra las respuestas de Guido en los 242 documentos
        // con verificación: 21 dudas de este grupo, 21 aceptadas tal cual (Roma 2011 separato se descartó por el documento entero, no por la duda).
        if (ctx.E.cierra && vecinos.includes(false) && ['usar-cuadro-por-segmento', 'cuadro-duplicado', 'columna'].includes(d.tema) && d.propuesta === 'sí') { notas.push(`duda de ${origen} confirmada por las sumas aunque un año vecino da distinto (escalón 2b; ${d.tema}, "${d.renglon || '-'}"): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        pendientes.push({ origen, motivo: 'duda-tema', detalle: det, que, pregunta: d.pregunta || d.texto, bloques: d.bloques || [], extra: { pagina, lineas, propuesta } });
        continue;
      }
      const inv = cuadroInventario(d);
      if (inv) { notas.push(`duda de ${origen} decidida por la identidad de inventarios (to-do 237 v): ${inv}. "${d.pregunta}"`); continue; }
      const cn = cuadroNaturaleza(d);
      if (cn) { notas.push(`duda de ${origen} decidida por las sumas (to-do 222): ${cn.decision}, ${cn.porque}. "${d.pregunta}"`); continue; }
      pendientes.push({ origen, motivo: `duda-de-${origen}`, detalle: (d.pregunta || d.texto).slice(0, 80), que, pregunta: d.pregunta || d.texto, bloques: d.bloques || [], extra: { pagina, lineas, propuesta } });
    }
  }
  return { pendientes, contestadas };
}

// Una respuesta a una duda contesta la otra del mismo cuadro; lo que queda pendiente va a la cola.
export function faseRespuestas(ctx) {
  const { F, contestadas, pendientes, pdf, notas, caso } = ctx;
  // MISMO CUADRO: LA RESPUESTA A UNA DUDA CONTESTA LA OTRA. localizar y extraer preguntan
  // por separado sobre el mismo cuadro: AEK 2016-17, cuadro 6.23 'Παροχές στο προσωπικό' (L1612-1618), "¿se carga como desglose?" y "¿se deja
  // afuera?". Las dos siguen yendo a la cola; este escalón solo CIERRA una cuando Guido ya contestó la otra y esa respuesta la contesta.
  //   - Mismo cuadro = mismo PRIMER bloque de las dos dudas (los demás son contexto), y que no sea un bloque del estado de resultados (casi
  //     todas lo nombran: Volos 2019-2022 juntaba "¿unidades?" con "¿se carga el interés de L21?"). Solo entre orígenes distintos.
  //   - COMPUERTA: las dos preguntas son sobre la MISMA decisión, si el cuadro entra o no a la carga: una "¿Se carga…?" con una "¿Se deja
  //     afuera…?" (respuestas opuestas) o dos "¿Se deja afuera…?" (la misma). Dos "¿Se carga…?" pueden ser maneras distintas de cargar el
  //     mismo cuadro (Levadiakos 2019: "¿solo?" -> no; "¿junto con su continuación de la pág. 16?" -> sí): no se cierra ninguna.
  //   - Medido en la cola de Grecia (59 dudas de verificar, todas contestadas): cierra 9, las 9 con la respuesta que Guido había dado; 0 perdidas.
  //   - Contestar una duda no cambia lo que se carga (solo libera el caso), así que este escalón no cambia ningún dato.
  // MEDIDO Y DESCARTADO (HALLAZGOS-pipeline.md): JUNTAR las dos en un caso escondía una pregunta genuina (Levadiakos), y cerrar sola la duda
  // sobre un cuadro que la carga no usa se equivocaba en 6 de 26 (Asteras 2020-2023: la nota suma un GRUPO de renglones).
  const estadoB = new Set(F.ubicacion?.estado || []);
  const cuadroDe = (x) => { const b = (x.bloques || [])[0]; return b && !estadoB.has(b) ? b : null; };
  const mismoCuadro = (x, y) => { const c = cuadroDe(x); return !!c && c === cuadroDe(y); };
  const tipoDecision = (q) => (/^¿\s*Se\s+cargan?\b/i.test(q) ? 'carga' : /^¿\s*Se\s+dejan?\s+afuera\b/i.test(q) ? 'afuera' : null);
  const propDe = (txt) => (/^\s*no(?=[\s(.,]|$)/i.test(String(txt || '')) ? 'no' : /^\s*s[ií](?=[\s(.,]|$)/i.test(String(txt || '')) ? 'sí' : null); // sin \b: en JS la í no cuenta como letra
  // ¿entra el cuadro a la carga, según la respuesta de Guido a esa pregunta? null si no se puede saber
  const entra = (pregunta, resp, propuesta) => {
    const t = tipoDecision(pregunta); if (!t || !resp) return null;
    const v = resp.decision === 'aceptar' ? propDe(propuesta) : resp.decision === 'corregir' ? propDe(resp.valor) : null;
    if (!v) return null;
    return t === 'carga' ? v === 'sí' : v === 'no';
  };
  const respondidas = [
    ...contestadas.map((c) => ({ origen: c.origen, bloques: c.bloques, pregunta: c.que, entra: entra(c.que, c.resp, c.propuesta) })),
    ...pendientes.map((a) => { const r = respuestaDe(pdf, 'verificar', a.motivo, a.detalle); return r ? { origen: a.origen, bloques: a.bloques, pregunta: a.que, entra: entra(a.que, r, a.extra.propuesta) } : null; }).filter(Boolean),
  ];
  for (const a of pendientes) {
    const ta = tipoDecision(a.que);
    const otra = ta && !respuestaDe(pdf, 'verificar', a.motivo, a.detalle)
      ? respondidas.find((x) => x.origen !== a.origen && mismoCuadro(x, a) && x.entra !== null && (ta === 'afuera' || tipoDecision(x.pregunta) === 'afuera'))
      : null;
    if (otra) { notas.push(`duda de ${a.origen} contestada por la respuesta de Guido sobre el mismo cuadro (${cuadroDe(a)}, to-do 211): el cuadro ${otra.entra ? 'entra' : 'queda afuera'}. "${a.pregunta}" | respondida: "${otra.pregunta.split('  (por qué')[0]}"`); continue; }
    caso(a.motivo, a.detalle, a.que, a.extra);
  }

}

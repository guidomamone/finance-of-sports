// ============================================================================
// tools/verificar-lecturas.mjs — las lecturas candidatas de verificar() y evaluar(): qué lectura cierra los totales y el resultado
// Mudado de tools/verificar.mjs sin cambiar una línea (salvo `export`); tools/verificar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ajustesDe } from './ajustes.mjs';
import { FIN_INGRESO_RE, FIN_GASTO_RE, INGRESOS_RE, GASTOS_RE, normalizar } from './vocabulario.mjs';
import { parseNumber, MULT, r6, cerca, unidad, paginaDeLinea, repiteResultado } from './verificar.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const TOL = 0.01; // millones: la de audit.js

// La escala, el estado armado, los totales y el resultado impresos y las lecturas candidatas (1 a 5) con sus ajustes.
export function faseLecturas(ctx) {
  const { U, vecinosDoc, compararVecino, notas, F, armar, md, pdf, saleDelAjuste, signoNormalDe, signoFinBloque, notasAcum, signoAcum, notasSubRep, cd } = ctx;
  // ESCALERA DE ESCALA. Caso que la originó: Fortaleza CEIF 2023 y 2024 dicen
  // "Expresados en pesos colombianos" (.md 2024 L1125) y las cifras son miles; extraer/localizar dejaron "no se sabe" y se leían en unidades
  // (ingresos 2024 = 12,2 millones). El documento de 2025 declara miles (L1149) y repite 2024 como 12.206 millones. Peligro: 2023 y 2024
  // coinciden ENTRE SÍ en la escala equivocada; por eso solo propone un vecino ANCLADO (la declara o ya la resolvió acá), y la cadena se arma
  // procesando los años desde el que declara (2025 -> 2024 -> 2023, el orden de la lista del lote).
  //   ESCALÓN 0  la declarada: la de cada bloque (extraer.mjs); si "no se sabe", la del documento (localizar.mjs). Si el documento la
  //              declara, manda: el escalón 1 nunca la pisa.
  //   ESCALÓN 1  solo si el documento dice "no se sabe": PROPONE la del año vecino anclado, si sus importes dan exactamente x1.000 o
  //              x1.000.000 (todo el documento por ese factor).
  //   COMPUERTA  la misma del chequeo 4b: con la escala propuesta, la columna del año vecino coincide (ingresos ±2%). El resultado no
  //              cambia de veredicto (cerrar es invariante a la escala del documento entero). Pasa -> se adopta; no -> unidades, como antes.
  // Queda escrito en el .verificacion.json: escala { valor, escalon, factor, de }.
  ctx.kEsc = 1; ctx.escala = { valor: MULT[U.escala] ? U.escala : 'no se sabe', escalon: 0, factor: 1, de: null };
  if (!MULT[U.escala]) {
    for (const [dy, v] of vecinosDoc.filter(([, v]) => v.anclado)) {
      const base = compararVecino(dy, v, 1);
      if (base.ok !== false || !base.mio) continue;
      const k = [1000, 1e6].find((x) => cerca(base.mio * x, base.suyo, 0.02));
      if (!k) continue;
      if (compararVecino(dy, v, k).ok !== true) continue; // la compuerta
      ctx.kEsc = k; ctx.escala = { valor: k === 1000 ? 'miles' : 'millones', escalon: 1, factor: k, de: v.otro.pdf.split('/').pop() };
      notas.push(`escala: el documento no la declara; se tomó ${ctx.escala.valor} del año vecino (${ctx.escala.de}), con el que coincide x${k} (escalón 1)`);
      break;
    }
  }
  // escala de cada bloque para los totales impresos (la misma de armar)
  const escalaDe = new Map((F.escalas || []).map((x) => [x.bloque, x.escala]));
  const mult = (b) => (MULT[escalaDe.get(b)] ?? MULT[U.escala] ?? 1e-6) * ctx.kEsc;
  if (ctx.escala.escalon === 0 && [...escalaDe.values()].includes('no se sabe') && !MULT[U.escala]) notas.push('escala desconocida en algún bloque: se asumió unidades (lo confirma el chequeo del año anterior)');

  const { filas, estado, lineasDeLado } = armar(F, U, true, ctx.kEsc);
  // financiero e impuesto: sus renglones; SI NO HAY NINGUNO, su subtotal/total impreso si es UNO solo. Caso: Goiás 2023, el
  // estado trae solo "Resultado financeiro líquido (1.425.102)" (pág. 7 del visor, .md L221), sin receitas/despesas financeiras: el
  // financiero se tomaba como 0 y el resultado no cerraba. Si hay renglones, el subtotal no se usa (no se cuenta dos veces).
  const renglonesOTotal = (lado) => { const r = estado.filter((f) => f.lado === lado && f.tipo === 'renglon'); if (r.length) return r; const t = estado.filter((f) => f.lado === lado && ['subtotal', 'total'].includes(f.tipo) && isFinite(f.M)); return t.length === 1 ? t : []; };
  const fin = renglonesOTotal('financiero'); const imp = renglonesOTotal('impuesto');
  const suma = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);
  const conSigno = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);
  // SIGNO DE UNA FILA DEL FINANCIERO POR SU RÓTULO: +1 si dice ingreso financiero (intereses cobrados, receitas financeiras,
  // finance income...), -1 si dice gasto financiero, 0 si no dice o dice las dos cosas ("Ingresos y gastos financieros", "Oneri e proventi
  // finanziari": queda con su signo impreso). Las listas están en tools/vocabulario.mjs (FIN_INGRESO / FIN_GASTO).
  const signoRotulo = (f) => {
    const t = normalizar(f.etiqueta || '');
    const ing = FIN_INGRESO_RE.test(t) && !GASTOS_RE.test(t); const gas = FIN_GASTO_RE.test(t) && !INGRESOS_RE.test(t);
    return ing && !gas ? 1 : gas && !ing ? -1 : 0;
  };
  const conSignoRotulo = (arr, conSig = false) => arr.reduce((a, f) => { const sg = signoRotulo(f); return a + (sg ? sg * (conSig ? (f.M || 0) : Math.abs(f.M || 0)) : (f.M || 0)); }, 0);
  // el efecto del financiero y el signo del impuesto según la lectura que cerró (los mismos nombres que COMBOS, más "financiero por rótulo")
  const finSegun = (lect, arr) => (/por rótulo/.test(String(lect)) ? conSignoRotulo(arr, /con signo/.test(String(lect))) : (/financiero e impuesto invertidos|financiero invertido/.test(String(lect)) ? -1 : 1) * conSigno(arr));
  const siSegun = (lect) => (/financiero e impuesto invertidos|impuesto invertido/.test(String(lect)) ? -1 : 1);

  // 3. totales y resultado: LA ESCALERA DE LECTURAS. Se prueba una lectura; si no cierra
  // con un número impreso (resultado o totales), la siguiente, que agrega una interpretación más a la anterior. Gana la primera que cierra y
  // queda escrito cuál fue. El camino limpio es la lectura 0: si cierra, ningún escalón se usa. Ningún escalón se acepta si no cierra.
  //   0  las filas tal cual las extrajo la IA
  //   1  + si no hay resultado final, "resultado antes de impuestos" (sin el impuesto). UC 2011-2013: el estado elegido termina en el impuesto.
  //   2  + el total impreso puede ser un RENGLÓN más del estado (las otras líneas se suman aparte). UC 2012: "total de ingresos" era
  //        "Ingresos de actividades ordinarias 7.450.809" y aparte estaba "Otros ingresos por función 30.426".
  //   3  + los renglones del estado sin lado (lado 'otro') entran según su signo, con la misma convención de signos que los gastos del estado.
  //        UC 2010-2014: "Otras ganancias (pérdidas) (288.444)" quedaba afuera y el resultado no cerraba por exactamente ese importe.
  //   4  + signos impresos: un renglón negativo dentro de su lado resta, y los subtotales se reconocen por la suma con signo.
  //        Goiás 2008-2011: "(-) Dedução da receita" sumaba en vez de restar y el subtotal se contaba dos veces.
  // Si ninguna cierra: queda la lectura 0 con sus chequeos fallidos (camino de error: reintento, después cola). Si el documento no tiene NINGÚN
  // número impreso para cerrar (ni totales, ni resultado, ni antes de impuestos), eso también es un fallo: antes pasaba como OK sin chequeo.
  const tI = F.total_ingresos ? Math.abs(parseNumber(F.total_ingresos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const tG = F.total_gastos ? Math.abs(parseNumber(F.total_gastos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const ANTES_RE = /antes\s+de(l)?\s+impuesto|before\s+(income\s+)?tax|vor\s+(ertrag)?steuern|antes\s+dos\s+impostos|avant\s+imp[oô]t|voor\s+belasting|ante\s+imposte|prima\s+delle\s+imposte|p[řr]ed\s+zdan[ěe]n[íi]m|προ\s+φ[οό]ρων(?![\s,]*(και\s+)?(τόκων|τοκων|χρηματοδοτ))/i;
  // Checo "před zdaněním" (Výsledek hospodaření před zdaněním) y griego "προ φόρων" (Αποτέλεσμα / Κέρδη προ φόρων): antes de los
  // lotes 64 y 65. El griego excluye "προ φόρων, χρηματοδοτικών..." y "προ φόρων και τόκων" (resultado operativo / EBIT, no el resultado antes
  // de impuestos), igual que "antes de impuestos" no toma "antes de intereses e impuestos". Mayúsculas griegas sin acento: φ[οό]ρων.
  // EL RESULTADO IMPRESO SE LEE POR SU ETIQUETA: si la línea que extraer marcó como "resultado del ejercicio" dice "antes de
  // impuestos", es el resultado ANTES de impuestos (lectura 1), no el final. Caso real: Fortaleza CEIF 2023-2025 (las notas hacen de estado):
  // F.resultado apuntaba a L719 "Utilidad contable antes de impuesto" 1.609.817 y se le restaba el impuesto; sin restarlo cierra exacto.
  const filaDeRes = F.resultado ? estado.find((f) => f.linea === F.resultado.linea && f.tipo === 'resultado') : null;
  const resEsAntes = !!(filaDeRes && ANTES_RE.test(filaDeRes.etiqueta));
  // RESULTADO IMPRESO, ESCALÓN 2: si extraer no encontró el resultado en los bloques (ni el
  // de antes de impuestos), una línea PREJUÍZO / SUPERÁVIT / DÉFICIT / LUCRO con un número, pegada al último bloque del estado (hasta 4
  // líneas después), PROPONE el resultado. COMPUERTA: alguna lectura tiene que cerrar con él EXACTO (a media unidad por fila, como la
  // lectura 5), no con la tolerancia de siempre. Casos: Novorizontino 2015 ("PREJUIZO: 5.598.142,50", L158; el bloque termina en L156) y
  // 2013 ("PREJUÍZO 728.230,75", L225; el bloque termina en L223).
  ctx.resCerca = null;
  if (!F.resultado && !estado.some((f) => f.tipo === 'resultado' && ANTES_RE.test(f.etiqueta) && isFinite(f.M))) { // (sin resultado antes de impuestos, como filaAntes más abajo)
    const finEstado = Math.max(...(F.ubicacion?.estado || []).map((b) => U.bloques?.[b]?.lineas?.[1] ?? -1), -1);
    if (finEstado > 0) {
      const L = (() => { try { return readFileSync(resolve(ROOT, md), 'utf8').split('\n'); } catch { return []; } })();
      for (let i = finEstado; i < Math.min(finEstado + 4, L.length); i++) { // L[i] es la línea i+1 del .md
        const m = L[i].match(/(PREJU[IÍ]ZO|D[EÉ]FICIT|SUPER[AÁ]VIT|LUCRO)[^0-9(]{0,40}(\(?-?\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?\)?)/i);
        // italiano: "UTILE (PERDITA) DELL'ESERCIZIO" trae las dos palabras, así que el signo lo da el importe impreso (entre paréntesis o con
        // menos = pérdida). Caso: Napoli 2021 (L299, tabla de una fila pegada al bloque b13) y 2022 (L309).
        const mi = m ? null : L[i].match(/UTILE\s*\(\s*PERDITA\s*\)\s*DELL.\s*ESERCIZIO[^0-9(\-]{0,20}(\(?-?\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?\)?)/i);
        if (!m && !mi) continue;
        const k = mult((F.ubicacion?.estado || []).slice(-1)[0]);
        const v = mi ? (parseNumber(mi[1]) ?? NaN) * k : Math.abs(parseNumber(m[2]) ?? NaN) * k;
        if (isFinite(v) && v) { ctx.resCerca = { M: mi ? v : /PREJU|D[EÉ]FICIT/i.test(m[1]) ? -v : v, linea: i + 1, texto: L[i].trim().slice(0, 80) }; break; }
      }
    }
  }
  // El importe de `F.resultado` lo escribió la IA de extraer y puede no ser el de su línea (tomó la cifra de otra tabla); la FILA de esa misma línea sí viene validada contra el PDF: si las dos difieren, vale la fila.
  const resExtraido = F.resultado ? (parseNumber(F.resultado.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const resDeFila = filaDeRes && isFinite(filaDeRes.M) ? filaDeRes.M : null;
  // Solo vale la fila si el importe extraído no es el de NINGUNA fila de resultado del estado (si otra fila de resultado lo trae, el importe es de esa y no está inventado).
  const resEnEstado = estado.some((f) => f.tipo === 'resultado' && isFinite(f.M) && Math.abs(f.M - resExtraido) < 1e-6);
  // y solo si la diferencia es de verdad otra cifra (más de 1 %): una diferencia de redondeo entre dos tablas del mismo documento no es un importe inventado.
  const resFila = resDeFila != null && !resEnEstado && Math.abs(resDeFila - resExtraido) > 0.01 * Math.abs(resDeFila);
  const resFinal = F.resultado && !resEsAntes ? (resFila ? resDeFila : resExtraido) : ctx.resCerca ? ctx.resCerca.M : null;
  const filaAntes = estado.find((f) => f.tipo === 'resultado' && ANTES_RE.test(f.etiqueta) && isFinite(f.M));
  const gastosNeg = (() => { const g = estado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f.M) && f.M); return g.length ? g.filter((f) => f.M < 0).length >= g.length / 2 : true; })();
  const otros = estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f.M) && f.M && !repiteResultado(estado, f, 'M'));
  const ing0 = lineasDeLado('ingreso'); const gas0 = lineasDeLado('gasto');
  // AJUSTES MANUALES DE FILAS: escalón 0, antes de la escalera de lecturas. Agrega la fila
  // que la extracción no trajo, o reemplaza la que trajo mal (`reemplaza`), en la escala del documento; los chequeos corren igual sobre el
  // resultado. Caso: Fortaleza CEIF 2017 (nota 23 "Otros gastos" 41.780 perdida en un salto de página; costos financieros rotulados
  // "Total Otros Ingresos" en el PDF).
  // la misma pasada se aplica también a la base de la lectura 3 (ing3/gas3); ahí solo ingresos y gastos, sin repetir notas.
  // `firmado` = la base de la lectura 4: ahí el ajuste lleva su signo impreso relativo al signo
  // normal de los AJUSTES de su lado (la mayoría), igual que un renglón respecto de su lado en lineasDeLado(firmado): un ingreso impreso en
  // negativo entre ingresos positivos resta. El signo normal sale de los ajustes y no del estado porque vienen de otra tabla (una nota que
  // imprime los gastos entre paréntesis bajo un estado que los imprime en positivo). En las demás lecturas sigue el valor absoluto. No es una
  // regla nueva: la escalera de lecturas prueba las dos formas y gana la que cierra. Caso: Goiás 2016, "(-) Deduções das receitas"
  // (7.401.426,19) entre las partes de la nota 17 (lectura 1: ingresos 97,8 M contra 83,0 M impresos; lectura 4: cierra).
  const aplicarAjustesFila = (ingB, gasB, primera, firmado = false) => { for (const a of ajustesDe(pdf).filter((x) => x.campo === 'fila' && isFinite(parseNumber(x.valor)))) {
    const destino = { ingreso: ingB, gasto: gasB, financiero: primera ? fin : null, impuesto: primera ? imp : null }[a.lado];
    if (!destino) continue;
    // sale la fila con esa etiqueta Y, si estaba abierta en su nota, las filas de la nota (si no, se contaría dos veces)
    // `reemplazaLinea`: sale SOLO la fila de esa línea del .md (o las hojas de su nota, si estaba abierta). `reemplaza` por etiqueta
    // saca todas las homónimas: en el formato italiano "altri" es a la vez ingreso (5), financiero + (16) y financiero − (17) (Bologna 2020-21,
    // L833, L871 y L875).
    const sale = (f) => saleDelAjuste(a, f);
    if (a.reemplaza || a.reemplazaLinea != null) for (const arr of [ingB, gasB, fin, imp]) for (let i = arr.length - 1; i >= 0; i--) if (sale(arr[i])) arr.splice(i, 1);
    const m = mult(estado[0]?.bloque); const v = parseNumber(a.valor) * m;
    // con valor 0 y `reemplaza`, el ajuste SOLO saca la fila: no agrega una línea en cero (Juventus 2018-19, la fila
    // de la ganancia por acción "(0,040)", .md L1160, no es un importe del estado)
    if (v === 0 && (a.reemplaza || a.reemplazaLinea != null)) { if (primera) notas.push(`ajuste manual: sale la fila "${a.reemplaza ?? `L${a.reemplazaLinea}`}" (${a.fecha}, ${a.motivo})`); continue; }
    destino.push({ etiqueta: a.etiqueta, lado: a.lado, tipo: 'renglon', M: ['ingreso', 'gasto'].includes(a.lado) ? (firmado === 'estado' ? v * signoDelEstado(a.lado) : firmado ? v * signoNormalDe(a.lado) : Math.abs(v)) : v, u: unidad(a.valor, m), linea: a.linea ?? null, pagina: a.linea ? paginaDeLinea(md, a.linea) : null, origen: 'ajuste manual', ...(a.destino ? { destino: a.destino } : {}) });
    if (primera) notas.push(`ajuste manual: fila "${a.etiqueta}" (${a.lado}) ${a.valor}${a.reemplaza ? `, en lugar de "${a.reemplaza}"` : ''}${a.reemplazaLinea != null ? `, en lugar de la fila de L${a.reemplazaLinea}` : ''} (${a.fecha}, ${a.motivo})`);
  } };
  aplicarAjustesFila(ing0, gas0, true);
  // base de la lectura 3: los subtotales se leen con los renglones sin lado como componentes (lineasDeLado, conOtros)
  const ing3 = otros.length ? lineasDeLado('ingreso', 'M', true) : ing0; const gas3 = otros.length ? lineasDeLado('gasto', 'M', true) : gas0;
  if (otros.length) aplicarAjustesFila(ing3, gas3, false);
  // base de la lectura 4: signos impresos (lineasDeLado, firmado), con los renglones sin lado como en la lectura 3
  const ing4 = lineasDeLado('ingreso', 'M', true, true); const gas4 = lineasDeLado('gasto', 'M', true, true);
  // base del escalón "subtotal repetido": la lectura 4 con los subtotales que repiten el renglón de arriba sin contar
  const ing4r = lineasDeLado('ingreso', 'M', true, true, true); const gas4r = lineasDeLado('gasto', 'M', true, true, true);
  aplicarAjustesFila(ing4, gas4, false, true);
  aplicarAjustesFila(ing4r, gas4r, false, true);
  // base del escalón "financiero dentro de un subtotal" (el último de la escalera) y el financiero con el signo de su bloque
  const ing4c = lineasDeLado('ingreso', 'M', true, true, true, true); const gas4c = lineasDeLado('gasto', 'M', true, true, true, true);
  aplicarAjustesFila(ing4c, gas4c, false, true);
  const finBloque = signoFinBloque.size ? fin.map((f) => (signoFinBloque.has(f.linea) ? { ...f, M: signoFinBloque.get(f.linea) * Math.abs(f.M), origen: `${f.origen || 'estado'} (signo de su bloque)` } : f)) : null;
  // base del escalón "acumulados" (el último de la escalera, después del patrón C) y el financiero con el signo de su lado
  const ing4a = lineasDeLado('ingreso', 'M', true, true, true, false, true); const gas4a = lineasDeLado('gasto', 'M', true, true, true, false, true);
  aplicarAjustesFila(ing4a, gas4a, false, true);
  const finAcum = notasAcum.length ? fin.map((f) => (signoAcum.has(f.linea) ? { ...f, M: signoAcum.get(f.linea) * Math.abs(f.M), origen: `${f.origen || 'estado'} (signo de su lado, escalón acumulados)` } : f)) : null;
  // ESCALÓN "signo del documento" en los ajustes `fila`, después de la lectura 4 (y de su escalón del subtotal repetido) y antes
  // de la 5. La 4 compara el signo de cada ajuste con la MAYORÍA DE LOS AJUSTES de su lado (signoNormalDe): con un solo ajuste en el lado,
  // ese ajuste es la mayoría y nunca resta. Este escalón lo compara con cómo IMPRIME EL ESTADO ese lado (la mayoría de sus renglones): un
  // ajuste con el valor tal cual impreso y el signo contrario al de su lado resta. Misma compuerta que la 4 (totales impresos y resultado).
  // Solo se prueba si cambia algún signo. Caso: Criciúma 2022 (.md L241-248), gastos impresos entre paréntesis y "Outras receitas
  // Operacionais" 32.222 sin paréntesis dentro de CUSTOS E DESPESAS OPERACIONAIS (23.790.402 = 23.822.624 − 32.222).
  const signoDelEstado = (lado) => (lado === 'gasto' ? (gastosNeg ? -1 : 1) : (() => { const r = estado.filter((f) => f.lado === 'ingreso' && f.tipo === 'renglon' && isFinite(f.M) && f.M); return r.length && r.filter((f) => f.M < 0).length > r.length / 2 ? -1 : 1; })());
  const ing4e = lineasDeLado('ingreso', 'M', true, true); const gas4e = lineasDeLado('gasto', 'M', true, true);
  aplicarAjustesFila(ing4e, gas4e, false, 'estado');
  const cambiaSigno4e = ajustesDe(pdf).some((a) => a.campo === 'fila' && ['ingreso', 'gasto'].includes(a.lado) && parseNumber(a.valor) && signoDelEstado(a.lado) !== signoNormalDe(a.lado));
  const hayRepetido = notasSubRep.length > 0;
  const NOMBRES_LECTURA = ['las filas tal cual', 'resultado antes de impuestos si no hay resultado final', 'el total impreso puede ser un renglón', 'renglones sin lado según su signo', 'signos impresos (un renglón negativo resta en su lado)', 'solo las hojas con su signo (C/D del balancete), sin subtotales ni totales', 'la 5 más los renglones sin lado según su signo'];
  // LECTURA 5: SOLO LAS HOJAS del estado (renglones), ningún subtotal ni total, cada
  // una con su signo: la marca C/D de un balancete si la trae (D en ingresos resta, C en gastos resta, financiero C suma y D resta) y si no,
  // el signo impreso como en la lectura 4. No adivina qué subtotal suma qué: los ignora a todos. Tampoco usa los totales como chequeo (en un
  // balancete jerárquico mezclan lados): su ÚNICA compuerta es el resultado impreso, EXACTO (a media unidad por fila). Casos (diagnóstico
  // de Novorizontino 2013-2017): grupos de un solo renglón repetidos como subtotal y total (2017: 8.019.563,48 contado 3 veces), subtotales
  // que mezclan lados (2017: "(-) DESPESAS OPERACIONAIS" incluye el financiero y la recuperação), marcas C/D descartadas (2014: "DEV. DE
  // CONVÊNIO" 14.754,86 D sumaba dentro de ingresos).
  const cdDe = (f) => { const m = String(f.actual ?? '').trim().match(/\s([CD])$/i); return m ? m[1].toUpperCase() : null; };
  // el ajuste manual `fila` (escalón 0) actúa también en las lecturas 5 y 6: la
  // fila que nombra `reemplaza` sale de las hojas (y de los renglones sin lado de la 6) y, si el ajuste trae un valor, entra la suya.
  const reemplazadas = new Set(ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.reemplaza).map((x) => String(x.reemplaza).trim()));
  const lineasReemplazadas = new Set(ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.reemplazaLinea != null).map((x) => Number(x.reemplazaLinea)));
  const reemplazada = (f) => reemplazadas.has(String(f.etiqueta).trim()) || lineasReemplazadas.has(Number(f.linea));
  const hojas5 = (lado) => estado.filter((f) => f.lado === lado && f.tipo === 'renglon' && isFinite(f.M) && f.M && !reemplazada(f));
  const conSigno5 = (lado, cdResta) => { const r = hojas5(lado); const normal = r.filter((f) => f.M < 0).length > r.length / 2 ? -1 : 1;
    return r.map((f) => { const cd = cdDe(f); return { ...f, M: cd ? (cd === cdResta ? -Math.abs(f.M) : Math.abs(f.M)) : f.M * normal, origen: `estado (lectura 5: hoja${cd ? ` con ${cd}` : ''})` }; }); };
  const ing5 = conSigno5('ingreso', 'D'); const gas5 = conSigno5('gasto', 'C');
  if (reemplazadas.size || lineasReemplazadas.size) aplicarAjustesFila(ing5, gas5, false);
  // ESCALÓN "financiero sin hojas": si el estado trae el financiero como UNA fila impresa como subtotal ("Oneri
  // finanziari netti e differenze cambio (1.866.421)") y no hay hojas debajo, las lecturas 5 y 6 (solo hojas) lo dejaban en 0 y el resultado
  // no cerraba. Una sola compuerta: sin hojas de financiero, se usan los renglones o el total único de `fin` (el resultado impreso sigue siendo
  // la compuerta de la lectura).
  const fin5 = (hojas5('financiero').length ? hojas5('financiero') : fin.filter((f) => isFinite(f.M) && f.M && !reemplazada(f))).map((f) => { const cd = cdDe(f); return { ...f, M: cd ? (cd === 'D' ? -Math.abs(f.M) : Math.abs(f.M)) : f.M }; });
  // un ajuste `fila` del lado financiero con `reemplaza` también ENTRA en la lectura 5/6 (antes solo salía la
  // fila vieja). Caso: Juventus 2003-2006, gastos financieros impresos en positivo bajo "17) INTEREST AND OTHER FINANCIAL EXPENSES".
  for (const a of ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.lado === 'financiero' && (x.reemplaza || x.reemplazaLinea != null) && isFinite(parseNumber(x.valor)) && parseNumber(x.valor) !== 0)) {
    const m = mult(estado[0]?.bloque); fin5.push({ etiqueta: a.etiqueta, lado: 'financiero', tipo: 'renglon', M: parseNumber(a.valor) * m, u: unidad(a.valor, m), linea: a.linea ?? null, pagina: a.linea ? paginaDeLinea(md, a.linea) : null, origen: 'ajuste manual', ...(a.destino ? { destino: a.destino } : {}) });
  }
  // ESCALÓN "ajustes del financiero sin reemplaza": la lectura 5 de arriba solo suma los ajustes del
  // financiero que reemplazan una fila. fin5Todos les suma también los que no reemplazan nada (una fila que la extracción no trajo). No es
  // una regla de la lectura 5 (así rompía Roma 2018, que cierra el resultado desde la lectura 0 y falla solo por los totales): es un
  // escalón aparte, que corre SOLO si ninguna lectura 0-6 cerró el RESULTADO (lo único que el financiero puede arreglar). Compuerta: la
  // de la lectura 5, el resultado impreso exacto. Caso: Inter 2024-25, "rivalutazioni di partecipazioni (18)" +780.928 (.md L976):
  // 567.012.038 − 482.024.122 − 35.879.464 + 780.928 − 14.491.102 = 35.398.278 (L986).
  const fin5Todos = [...fin5];
  for (const a of ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.lado === 'financiero' && !(x.reemplaza || x.reemplazaLinea != null) && isFinite(parseNumber(x.valor)) && parseNumber(x.valor) !== 0)) {
    const m = mult(estado[0]?.bloque); fin5Todos.push({ etiqueta: a.etiqueta, lado: 'financiero', tipo: 'renglon', M: parseNumber(a.valor) * m, u: unidad(a.valor, m), linea: a.linea ?? null, pagina: a.linea ? paginaDeLinea(md, a.linea) : null, origen: 'ajuste manual', ...(a.destino ? { destino: a.destino } : {}) });
  }
  return { mult, filas, estado, lineasDeLado, fin, imp, suma, conSigno, signoRotulo, conSignoRotulo, finSegun, siSegun, tI, tG, ANTES_RE, resFinal, filaAntes, gastosNeg, otros, ing0, gas0, aplicarAjustesFila, ing3, gas3, ing4, gas4, ing4r, gas4r, ing4c, gas4c, finBloque, ing4a, gas4a, finAcum, ing4e, gas4e, cambiaSigno4e, hayRepetido, NOMBRES_LECTURA, reemplazada, ing5, gas5, fin5, fin5Todos };
}

// evaluar(): qué lectura cierra los totales y el resultado.
export function faseEvaluar(ctx) {
  const { ing5, ing4, ing3, ing0, gas5, gas4, gas3, gas0, fin5Todos, fin5, fin, otros, reemplazada, gastosNeg, suma, estado, partesSubRep, U, tI, F, tG, resFinal, filaAntes, conSigno, imp, signoRotulo, conSignoRotulo } = ctx;
  const evaluar = (nivel, conAjustesFin = false, finForzado = null, bases = null, excluirOtros = null) => {
    const ch = []; let ing = [...(bases ? bases.ing : nivel >= 5 ? ing5 : nivel >= 4 ? ing4 : nivel >= 3 ? ing3 : ing0)]; let gas = [...(bases ? bases.gas : nivel >= 5 ? gas5 : nivel >= 4 ? gas4 : nivel >= 3 ? gas3 : gas0)];
    const finL = finForzado || (nivel >= 5 ? (conAjustesFin ? fin5Todos : fin5) : fin);
    // LECTURA 6: la 5 (solo hojas, sin totales, resultado impreso EXACTO) + los
    // renglones sin lado según su signo, como la lectura 3. Caso: Juventus 2015-16 a 2019-20, "Other non-recurring revenues and costs"
    // (+10.638.769, 2015-16 .md L1880) y "Group's share of results of associates" (−661.133, L1884) quedan sin lado; las lecturas 3-4 los
    // suman pero fallan por el total impreso de ingresos, y la 5 no los suma. Solo se llega acá si fallaron la 0 a la 5.
    // un ajuste `fila` que saca un renglón sin lado se respeta también en las lecturas 3 y 4
    // (antes, solo en la 6): la fila volvía a entrar por su signo. Caso: St. Gallen 2024-25, la compensación entre sociedades "Entschädigung"
    // +11.500 / −11.500 (L268-269), sacada con ajustes: entraba igual como ingreso y como gasto e inflaba los dos lados.
    if ((nivel >= 3 && nivel < 5) || nivel >= 6) for (const f of otros) { if (excluirOtros && excluirOtros.has(f)) continue; if (reemplazada(f)) continue; const esGasto = bases?.otrosResultado ? f.M < 0 : gastosNeg ? f.M < 0 : f.M > 0; (esGasto ? gas : ing).push({ ...f, lado: esGasto ? 'gasto' : 'ingreso', M: Math.abs(f.M), origen: `estado (sin lado en el documento: entra como ${esGasto ? 'gasto' : 'ingreso'} por su signo, impreso ${f.M < 0 ? 'en negativo' : 'en positivo'}; lectura ${nivel >= 6 ? 6 : 3})` }); } // el origen le llega a Jev y a Claude como sección
    const ajuste = (arr, total, nombre, lineaTotal) => {
      if (total == null || !isFinite(total)) { ch.push({ nombre: `total de ${nombre}`, ok: null, detalle: 'el documento no lo imprime' }); return arr; }
      const sm = suma(arr); const tolRed = Math.max(TOL, 0.5 * arr.reduce((a, f) => a + (f.u || 0), 0));
      if (cerca(sm, total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(sm)} = ${r6(total)}`, suma: sm, impreso: total }); return arr; } // suma/impreso: los usa el escalón del primer año
      // Un total que es UNA fila (un total de verdad, o desde la lectura 2 también un renglón: la fila de la línea que extraer marcó como total),
      // con otras líneas del mismo lado fuera de ese total. Nottingham Forest: "Turnover" + "Profit on disposal" aparte.
      const filaTotal = estado.find((f) => f.tipo !== 'renglon' && cerca(Math.abs(f.M || 0), total)) || (nivel >= 2 ? estado.find((f) => (lineaTotal != null && f.linea === lineaTotal) || (f.tipo === 'renglon' && cerca(Math.abs(f.M || 0), total))) : null);
      if (filaTotal) {
        // si el escalón "subtotal repetido" (patrón B) salteó ese total por ser la suma de
        // las filas de arriba, el total cierra con lo que salió de ESAS filas (ellas mismas o las hojas de su nota). Caso: St. Gallen 2024-25,
        // "Erträge netto" 45.057 (L261) = "Erträge brutto" (abierto en su nota) + "Ertragsminderungen"; "Ausserordentlicher Ertrag" queda afuera.
        const partes = (!arr.some((f) => f.etiqueta === filaTotal.etiqueta) && partesSubRep.get(filaTotal.linea)) || [filaTotal.etiqueta];
        const deEsa = arr.filter((f) => partes.some((p) => f.etiqueta === p || String(f.origen || '').startsWith(`nota que desglosa "${p}"`)));
        // El total impreso y su único renglón son la MISMA cifra («Driftsinntekter» 41.591.465 y «Sum driftsinntekter» 41.591.465): las otras líneas del lado ya suman el total, o sea son sus
        // componentes y no un ingreso aparte. Se saca la fila del total y queda el renglón; contar las dos duplicaba el lado.
        if (deEsa.length && deEsa.every((f) => f.tipo === 'total') && arr.length === deEsa.length + 1 && cerca(sm - suma(deEsa), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `"${filaTotal.etiqueta}" ${r6(total)} cierra con los renglones del lado (${arr.length - deEsa.length} línea(s)): la fila del total no se suma aparte` }); return arr.filter((f) => !deEsa.includes(f)); }
        if (deEsa.length && cerca(suma(deEsa), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `"${filaTotal.etiqueta}" ${r6(total)} cierra; además se suman ${arr.length - deEsa.length} línea(s) fuera de ese total (${r6(sm - total)})` }); return arr; }
      }
      // (cambio C, aprobado por Guido; desde la lectura 2) el total impreso puede ser el TOTAL DE UNA NOTA que
      // abrió el escalón 1 de las notas (grupo de renglones): las filas de esa nota suman el total y el resto del lado queda afuera, como el
      // renglón de arriba. La compuerta sigue siendo el resultado impreso. Caso: AEL Larissa 2019, extraer tomó como "total de gastos" el
      // total de la nota 15 (3.534.818,85, .md L432 = costo de ventas + administración + comercialización); "Λοιπά έξοδα" (21.600, L83) va
      // afuera. Antes no cerraba ninguna lectura que abre notas y ganaba la lectura 5 (gasto por función).
      if (nivel >= 2) {
        const porBloque = new Map();
        for (const f of arr) if (String(f.origen || '').includes('escalón 1: grupo')) { if (!porBloque.has(f.bloque)) porBloque.set(f.bloque, []); porBloque.get(f.bloque).push(f); }
        for (const [b, filasNota] of porBloque) {
          const lin = U.bloques?.[b]?.lineas;
          if (lineaTotal != null && lin && (lineaTotal < lin[0] || lineaTotal > lin[1])) continue; // el total impreso tiene que ser de esa nota
          if (cerca(suma(filasNota), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `el total de la nota ${b} (${r6(total)}) cierra con sus filas; además se suman ${arr.length - filasNota.length} línea(s) fuera de esa nota (${r6(sm - total)})` }); return arr; }
        }
      }
      if (Math.abs(sm - total) <= tolRed) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(sm)} contra ${r6(total)}: fila "Diferencia de redondeo" de ${r6(total - sm)}` }); return [...arr, { etiqueta: 'Diferencia de redondeo', lado: nombre === 'ingresos' ? 'ingreso' : 'gasto', M: total - sm, origen: 'redondeo' }]; }
      // (solo en la lectura 4) el total impreso puede ser el BRUTO: los renglones con el signo normal del lado suman el total y
      // los negativos (deducciones) restan aparte. La compuerta sigue siendo el resultado impreso (sin él la lectura no cierra). Caso:
      // Novorizontino 2024, "Receita bruta" 40.157.783 y debajo "Impostos incidentes sobre a receita" (1.303.783).
      if (nivel >= 4) {
        const pos = arr.filter((f) => (f.M || 0) > 0); const neg = arr.filter((f) => (f.M || 0) < 0);
        if (neg.length && cerca(suma(pos), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `total bruto ${r6(total)} cierra con los renglones de signo normal; ${neg.length} deducción(es) restan aparte (${r6(suma(neg))})` }); return arr; }
      }
      ch.push({ nombre: `total de ${nombre}`, ok: false, detalle: `las líneas suman ${r6(sm)} y el total impreso dice ${r6(total)}` });
      return arr;
    };
    if (nivel >= 5) for (const nm of ['ingresos', 'gastos']) ch.push({ nombre: `total de ${nm}`, ok: null, detalle: 'la lectura 5 no usa totales (en un balancete mezclan lados): la compuerta es el resultado impreso' });
    // con filas del financiero adentro de los subtotales, los totales impresos también mezclan lados: como en la lectura 5,
    // no son compuerta y el resultado tiene que cerrar EXACTO
    else if (bases?.sinTotales) for (const nm of ['ingresos', 'gastos']) ch.push({ nombre: `total de ${nm}`, ok: null, detalle: 'el total impreso incluye filas del financiero (escalón "subtotal repetido"): la compuerta es el resultado impreso exacto' });
    else if (!bases?.sinTotales) { ing = ajuste(ing, tI, 'ingresos', F.total_ingresos?.linea); gas = ajuste(gas, tG, 'gastos', F.total_gastos?.linea); }
    // resultado: ingresos - gastos + financiero + impuesto, probando los signos de financiero e impuesto (cada documento los imprime a su manera)
    let objetivo = resFinal; let conImp = true; let nombreRes = 'resultado del ejercicio';
    if ((objetivo == null || !isFinite(objetivo)) && nivel >= 1 && filaAntes) { objetivo = filaAntes.M; conImp = false; nombreRes = 'resultado antes de impuestos'; }
    let okRes = null; let lect = null; let exactoRes = false; let difRes = null; // difRes: lo usa el escalón del primer año
    if (objetivo != null && isFinite(objetivo)) {
      // ESCALERA DE LA COMPUERTA DEL RESULTADO: primero las 4 combinaciones de signo
      // pidiendo el resultado EXACTO (media unidad impresa por fila, como la lectura 5); solo si ninguna es exacta, la tolerancia de siempre
      // (cerca). Antes ganaba la primera que entraba en la tolerancia aunque otra fuera exacta. Caso: Cremonese 2025 (.md L183-198),
      // ingresos − gastos −8.054.278; "financiero e impuesto invertidos" daba −6.976.885 (8.522 EUR de diferencia, dentro de la tolerancia) y
      // ganaba, con el financiero cargado +4.261 contra (4.261) impreso; "impuesto invertido" da −6.985.407, el impreso exacto.
      // UN RESULTADO IMPRESO NEGATIVO TRAE SU SIGNO: tiene que cerrar con signo. La comparación en valor
      // absoluto queda para el impreso positivo o sin signo (la pérdida impresa sin signo, escalera más abajo). Antes una lectura con
      // las filas dadas vuelta cerraba contra un negativo impreso. Caso: Lierse Kempenzonen 2022, impreso −4.591; Brutomarge −2.369 leída como
      // ingreso +2.369 y el financiero invertido daban +4.590 y "cierra (financiero invertido)". Medido: 376 documentos idénticos (prueba-completa,
      // Bélgica y Estonia); comparar siempre con signo cambiaba Novorizontino 2014-b, AVS 2023-24 y Portimonense 2022-23 (pérdidas sin signo).
      const cierraRes = (x, exacto, tol) => (objetivo < 0 ? (exacto ? Math.abs(x - objetivo) <= tol : cerca(x, objetivo)) : (exacto ? Math.abs(Math.abs(x) - Math.abs(objetivo)) <= tol : cerca(Math.abs(x), Math.abs(objetivo))));
      const COMBOS = [[1, 1, 'como impresos'], [-1, -1, 'financiero e impuesto invertidos'], [1, -1, 'impuesto invertido'], [-1, 1, 'financiero invertido']];
      const tol5 = Math.max(1e-6, 0.5 * [...ing, ...gas, ...finL].reduce((a, f) => a + (f.u || 0), 0)); // exacto, a media unidad por fila
      const patDe = (sf, si) => suma(ing) - suma(gas) + sf * conSigno(finL) + (conImp ? si * conSigno(imp) : 0);
      for (const exacto of nivel >= 5 || ctx.resCerca || bases?.sinTotales ? [true] : [true, false]) {
        for (const [sf, si, nm] of COMBOS) {
          if (!conImp && si === -1) continue;
          const pat = patDe(sf, si);
          if (cierraRes(pat, exacto, tol5)) { okRes = true; difRes = Math.abs(Math.abs(pat) - Math.abs(objetivo)); lect = nm; exactoRes = exacto; break; }
        }
        if (okRes) break;
        // EL SIGNO DE CADA FILA DEL FINANCIERO POR SU RÓTULO, entre los signos en
        // bloque exactos (arriba) y la tolerancia (la vuelta siguiente). Volos 2023-24 imprime "Πιστωτικοί τόκοι" 5.104,81 y "Χρεωστικοί
        // τόκοι" 5.967,01, los dos en positivo: en bloque daba 482.369,93 o 504.513,57 contra 492.579,55 impreso; por rótulo, 493.441,75 +
        // 5.104,81 − 5.967,01 = 492.579,55 exacto. Y en Volos 2020-21 "los dos como gasto" entraba en la tolerancia (125,6 = 2 × 62,83 de
        // diferencia) y se cargaba mal. Misma compuerta: resultado EXACTO. Solo si algún rótulo cambia algo respecto de lo impreso.
        if (exacto && finL.some((f) => signoRotulo(f)) && Math.abs(conSignoRotulo(finL) - conSigno(finL)) > 1e-9) {
          for (const si of conImp ? [1, -1] : [1]) {
            const pat = suma(ing) - suma(gas) + conSignoRotulo(finL) + (conImp ? si * conSigno(imp) : 0);
            if (cierraRes(pat, true, tol5)) { okRes = true; difRes = Math.abs(Math.abs(pat) - Math.abs(objetivo)); lect = si === 1 ? 'financiero por rótulo' : 'financiero por rótulo, impuesto invertido'; exactoRes = true; break; }
          }
          if (okRes) break;
        }
        // EL SIGNO POR RÓTULO, CON EL VALOR IMPRESO CON SU SIGNO: el escalón de arriba toma el valor absoluto
        // de cada fila, y una reversión negativa dentro de los costos ("Annen finanskostnad" −136.202, dentro de "Sum finanskostnader" 1.313.085)
        // debe restar de verdad, no sumar. Mismo orden y misma compuerta (resultado EXACTO), antes de la tolerancia. Caso: Sarpsborg 08 2023,
        // netInterest 2,63 M en vez de 8.446 (L136-145 del .md; 0,1809 + 1,1406 − 1,4493 + 0,1362). Medido: 722 documentos, 721 idénticos.
        if (exacto && finL.some((f) => signoRotulo(f)) && Math.abs(conSignoRotulo(finL, true) - conSignoRotulo(finL)) > 1e-9) {
          for (const si of conImp ? [1, -1] : [1]) {
            const pat = suma(ing) - suma(gas) + conSignoRotulo(finL, true) + (conImp ? si * conSigno(imp) : 0);
            if (cierraRes(pat, true, tol5)) { okRes = true; difRes = Math.abs(Math.abs(pat) - Math.abs(objetivo)); lect = si === 1 ? 'financiero por rótulo con signo' : 'financiero por rótulo con signo, impuesto invertido'; exactoRes = true; break; }
          }
          if (okRes) break;
        }
      }
      if (!okRes) okRes = false;
      ch.push({ nombre: nombreRes, ok: okRes, detalle: okRes ? `cierra (${lect})` : `ingresos ${r6(suma(ing))} - gastos ${r6(suma(gas))} ± financiero ${r6(conSigno(fin))}${conImp ? ` ± impuesto ${r6(conSigno(imp))}` : ''} no da el impreso ${r6(objetivo)}`, dif: difRes });
    } else ch.push({ nombre: 'resultado del ejercicio', ok: null, detalle: 'extraer.mjs no encontró el resultado impreso' });
    const okTot = ch.filter((c) => c.nombre.startsWith('total')).map((c) => c.ok);
    const cierra = okRes === true ? !okTot.includes(false) : okRes === null && okTot.includes(true) && !okTot.includes(false);
    return { ing, gas, ch, okRes, lect, cierra, nivel, objetivo, exacto: exactoRes };
  };
  return { evaluar };
}

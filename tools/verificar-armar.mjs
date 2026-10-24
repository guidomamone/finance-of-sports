// ============================================================================
// tools/verificar-armar.mjs — armar(): las filas del estado con su lado, tipo y escala, y cómo se agrupan las notas, para verificar()
// Mudado de tools/verificar.mjs sin cambiar una línea (salvo `export`); tools/verificar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { ajustesDe } from './ajustes.mjs';
import { COBERTURA_PERDIDAS_RE, normalizar } from './vocabulario.mjs';
import { parseNumber, MULT, r6, cerca, unidad, cerrarNota } from './verificar.mjs';

const TOL = 0.01; // millones: la de audit.js

// armar(): las filas del estado ya con su lado, tipo y escala, y cómo se agrupan las notas.
export function faseArmar(ctx) {
  const { F, U, pagDe, notas, pdf, reintentos, gruposAbiertos, notasSubRep, partesSubRep, signoFinBloque, notasFinBloque, signoAcum, notasAcum, ladosCero, notaSubtotalLados, notasNotaSub } = ctx;
  // filas con su valor en millones (año actual y anterior). armar() se usa también para el documento vecino (chequeo 4b). `k` es el factor
  // de la escalera de escala (abajo): multiplica TODO el documento, así que las diferencias entre bloques (1. FC Köln) se conservan.
  function armar(F, U, conNotas = false, k = 1) {
  const escalaDe = new Map((F.escalas || []).map((x) => [x.bloque, x.escala]));
  const mult = (b) => (MULT[escalaDe.get(b)] ?? MULT[U.escala] ?? 1e-6) * k;
  const pagDe = (bloque) => U.bloques?.[bloque]?.pagina ?? null;
  const filas = (F.filas || []).map((f) => ({ ...f, pagina: pagDe(f.bloque), M: (parseNumber(f.actual) ?? NaN) * mult(f.bloque), A: f.anterior != null ? (parseNumber(f.anterior) ?? NaN) * mult(f.bloque) : null, u: unidad(f.actual, mult(f.bloque)) }));
  const estado = filas.filter((f) => !f.detalla_a && (F.ubicacion?.estado || []).includes(f.bloque));
  // COBERTURA DE PÉRDIDAS DE UN SOCIO O DEL HOLDING: no es un ingreso operativo. Una fila SIN LADO cuyo rótulo dice "cobertura de pérdidas"
  // ("Verlustabdeckung FC Basel Marketing AG" +470.000 entre el "Ergebnis vor Verlustabdeckung" y el "Ergebnis vor Steuern") entraba como ingreso por su signo (lectura 3) y
  // los ingresos no daban el "Total Ertrag" impreso. Ahora cuenta en el resultado, como el financiero, y queda afuera de los ingresos y de los gastos.
  // También si el año actual es 0 y solo el anterior tiene importe (Basel 2020: "Defizitgarantie FC Basel Holding AG" 0,00 | 18,7 M): la columna del año anterior
  // que se compara con el documento vecino la contaba como ingreso.
  for (const f of estado) if (f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f.M) && (f.M || f.A) && COBERTURA_PERDIDAS_RE.test(String(f.etiqueta || ''))) { f.lado = 'financiero'; notas.push(`"${f.etiqueta}" (L${f.linea}) es una cobertura de pérdidas del socio o del holding, no un ingreso operativo: cuenta en el resultado, fuera de los ingresos y de los gastos`); }

  // (perímetro consolidado AG + Event AG decidido por Guido: "elegilo vos") COMPENSACIÓN INTRAGRUPO EN UN ESTADO DE VARIAS SOCIEDADES. FC St. Gallen AG + FC St. Gallen
  // Event AG: "Entschädigung von FCSG Event AG" (+9.800, columna AG) y "Entschädigung an FCSG AG" (-9.800, columna Event AG) suman cero en el total del grupo y el total impreso de ingresos
  // ("Erträge netto") no la incluye, pero la carga la contaba como ingreso y como gasto. COMPUERTA: dos renglones del mismo bloque, uno de ingreso y otro de gasto, con el mismo importe en
  // el año y en el anterior, y la primera palabra de su rótulo igual: se eliminan (lado 'intragrupo'), como en una consolidación.
  { const norm1 = (t) => normalizar(String(t || '')).split(/\s+/)[0] || '';
    const cand = estado.filter((f) => f.tipo === 'renglon' && ['ingreso', 'gasto', 'otro'].includes(f.lado) && isFinite(f.M) && f.M && f.A != null && isFinite(f.A));
    const igual = (x, y, f) => Math.abs(Math.abs(x) - Math.abs(y)) <= 0.5 * Math.max(f.u || 0, 0) + 1e-12;
    for (const a of cand) { if (a.lado === 'intragrupo' || a.M < 0) continue;
      const b = cand.find((x) => x !== a && x.lado !== 'intragrupo' && x.M < 0 && x.bloque === a.bloque && Math.abs(x.M + a.M) <= 0.5 * Math.max(a.u || 0, x.u || 0) + 1e-12 && Math.abs(x.A + a.A) <= 0.5 * Math.max(a.u || 0, x.u || 0) + 1e-12 && norm1(x.etiqueta).length >= 6 && norm1(x.etiqueta) === norm1(a.etiqueta));
      if (b) { a.lado = 'intragrupo'; b.lado = 'intragrupo'; notas.push(`"${a.etiqueta}" (L${a.linea}) y "${b.etiqueta}" (L${b.linea}) son una compensación intragrupo del mismo importe en el año y en el anterior, de signo opuesto: se eliminan, como en una consolidación`); } } }
  // 2. notas: renglón del estado reemplazado por su desglose si cierra (escala deducida del cierre)
  // DESGLOSES ANIDADOS: una hoja de una nota puede, a su vez, estar desglosada por otro cuadro (filas
  // con detalla_a = la etiqueta de esa hoja). Se reemplaza con la MISMA regla (cerrarNota: tiene que sumar), hasta 3 niveles. Caso real, UC
  // 2021-2025: "Ingresos Comerciales" de la nota 19 se abre con la columna "Comerciales" de la nota de segmentos. Si no suma, queda la hoja.
  // AJUSTE MANUAL `desglose`: escalón 0 del cierre de una nota (se prueba ANTES de cerrarNota(): una nota que cierra solo por
  // redondeo dentro de la tolerancia reemplazaba el renglón y la diferencia que Guido había dicho se perdía; Bath 2022-23, 44.435 £). Si el desglose de un renglón no suma por un
  // error del PROPIO documento, Guido dice cuánto es la diferencia impresa; la nota se abre igual, con una fila más ("Diferencia en el
  // documento") por esa diferencia. COMPUERTA: la diferencia entre el renglón y la suma de sus filas es la que dijo Guido (media unidad
  // impresa de tolerancia); si no, queda el renglón como siempre. Solo la columna del año. Caso: Fortaleza 2022, "Patrocinios (1)" 2.334.630
  // (L1219) y su detalle suma 2.280.630 (L1229-1240): sin abrirlo, la televisión (1.208.394) quedaba escondida adentro.
  const cerrarConAjuste = (h, sub, campo) => {
    if (campo !== 'M') return null;
    const aj = ajustesDe(pdf).find((x) => x.campo === 'desglose' && String(x.etiqueta).trim() === String(h.etiqueta).trim());
    if (!aj || !isFinite(parseNumber(aj.valor))) return null;
    const hojasNota = sub.filter((x) => x.tipo === 'renglon' && isFinite(x.M) && x.M);
    const dif = Math.abs(h.M || 0) - hojasNota.reduce((a, x) => a + Math.abs(x.M), 0);
    const m = mult(h.bloque);
    if (Math.abs(Math.abs(dif) - Math.abs(parseNumber(aj.valor) * m)) > 0.5 * m + 1e-9) return null;
    if (conNotas && !notas.some((n) => n.startsWith(`ajuste manual: el desglose de "${h.etiqueta}"`))) notas.push(`ajuste manual: el desglose de "${h.etiqueta}" se abre con una fila "${aj.etiquetaDiferencia || 'Diferencia en el documento'}" de ${aj.valor} (${aj.fecha}, ${aj.motivo})`);
    return { hojas: [...hojasNota.map((x) => ({ ...x, valorNota: Math.abs(x.M) })), { etiqueta: aj.etiquetaDiferencia || 'Diferencia en el documento', lado: h.lado, tipo: 'renglon', valorNota: dif, pagina: h.pagina, linea: aj.linea ?? h.linea, bloque: h.bloque, u: h.u, catAjuste: aj.categoria || null }] };
  };
  // DESGLOSE TRIVIAL: una nota con UNA sola fila con importe (o ninguna) que da
  // exacto su renglón no es un desglose que falló: cerrarNota() pide 2 hojas y la rechaza, queda el renglón (mismo importe) y antes se marcaba
  // el documento para reintento (~US$ 0,30 para nada). Ahora deja una nota y no marca reintento. Solo toca el aviso: lo cargado no cambia.
  // Casos: AEL Larissa 2022 "Κύκλος εργασιών" (venta de mercadería 0,00 + servicios 2.068.146,00 = total, .md L566-570); 2023 "Λοιπά
  // έξοδα" 0 con su nota en 0.
  const desgloseTrivial = (r, hijas) => {
    const conImporte = hijas.filter((x) => x.tipo === 'renglon' && isFinite(x.M) && x.M);
    if (conImporte.length > 1) return false;
    const s = conImporte.reduce((a, x) => a + Math.abs(x.M), 0);
    if (Math.abs(s - Math.abs(r.M || 0)) > 1e-9 + 0.5 * ((r.u || 0) + conImporte.reduce((a, x) => a + (x.u || 0), 0))) return false;
    const n = `la nota de "${r.etiqueta}" tiene ${conImporte.length ? 'una sola fila con importe' : 'todas sus filas en 0'} y da el renglón: queda el renglón, sin reintento`;
    if (!notas.includes(n)) notas.push(n);
    return true;
  };
  const abrirAnidadas = (hojas, campo, nivel) => {
    if (nivel > 3) return hojas;
    const usadas = new Set(hojas);
    return hojas.flatMap((h) => {
      const sub = filas.filter((x) => x.detalla_a && x !== h && !usadas.has(x) && x.detalla_a.trim() === String(h.etiqueta).trim());
      const c = sub.length >= 2 ? (cerrarConAjuste(h, sub, campo) || cerrarNota(Math.abs(h[campo] || 0), sub, campo, h.u || 0)) : null;
      if (!c) { if (conNotas && sub.length >= 2 && campo === 'M' && !desgloseTrivial(h, sub)) { if (!reintentos.some((x) => x.renglon === h.etiqueta)) notas.push(`el desglose de "${h.etiqueta}" (${sub.length} filas) no suma la fila: quedó la fila`); if (!reintentos.some((x) => x.renglon === h.etiqueta)) reintentos.push({ renglon: h.etiqueta, suma: r6(sub.filter((x) => x.tipo === 'renglon').reduce((a, x) => a + Math.abs(x.M || 0), 0)), objetivo: r6(Math.abs(h.M || 0)) }); } return [h]; }
      return abrirAnidadas(c.hojas.map((x) => ({ ...x, [campo]: x.valorNota * Math.sign(h[campo] || 1), origen: `${h.origen} > desglose de "${h.etiqueta}"` })), campo, nivel + 1);
    });
  };
  // conOtros (lectura 3 de la escalera de lecturas): los renglones SIN LADO (lado 'otro') cuentan como componentes al decidir
  // si un subtotal es la suma de los renglones de arriba o de abajo, con su signo impreso o en valor absoluto. Caso real, Goiás 2022-2024:
  // "Despesas (34.610.029)" está impreso ARRIBA de administrativas (27.382.857) + tributárias (323.384) + "Outras Receitas e Despesas"
  // (6.903.788, sin lado); sin esa fila los de abajo no sumaban el subtotal, y se contaba el subtotal y además sus componentes. En 2022 y
  // 2023 "Outras" es positivo (8.918.100, 140.214.785) y el subtotal solo cierra con la suma con signo. Los renglones sin lado los ubica
  // después la propia lectura 3, por su signo.
  // firmado (LECTURA 4 de la escalera de lecturas): los renglones del estado conservan su SIGNO IMPRESO respecto del signo
  // normal de su lado (un renglón negativo dentro de los ingresos resta: "(-) Dedução da receita (1.290.613)"), y los subtotales se
  // reconocen por la suma con signo. Caso: Goiás 2008, los renglones de "Futebol profissional e de base" con la deducción restando dan
  // 19.389.721 (el subtotal impreso); en valor absoluto daban 21.970.947, el subtotal no se reconocía y se contaba además de sus renglones.
  // ESCALÓN 1 DE LAS NOTAS: una nota que no dice qué renglón abre (ninguna fila con
  // detalla_a) puede desglosar un GRUPO de renglones del estado. Caso real, AEL Larissa (Grecia) 2019-2025: el estado presenta el gasto por
  // función (costo de ventas, administración, comercialización) y la nota "Έξοδα" lo abre por naturaleza (personal, terceros, amortizaciones)
  // con un total igual a la suma de los TRES renglones (2022: 1.221.827,55 + 505.583,81 + 379.187,86 = 2.106.599,22, .md L236-245 y
  // L584-590). Sin esto la nota quedaba afuera y los salarios en 0.
  //   ESCALÓN 0  la nota dice su renglón (detalla_a) ── propone ese renglón (lineasDeLado, abajo)
  //   ESCALÓN 1  la nota no dice ninguno ── propone el ÚNICO conjunto de 2+ renglones de GASTO del estado (sin nota propia) cuya suma da el
  //              total impreso de la nota; si hay dos conjuntos posibles o ninguno, no propone nada
  //   COMPUERTA  la misma de siempre, cerrarNota(): las filas de la nota tienen que sumar el grupo ── pasa → la nota reemplaza el grupo
  //   nada → quedan los renglones del estado (como antes) y la duda de extraer va a la cola
  // Solo gasto y solo renglones del estado sin nota propia. AEL 2023 no pasa a propósito: su nota suma los tres renglones MÁS los intereses
  // (lado financiero), así que no hay conjunto de gasto que dé el total.
  const notaDeGrupo = (delLado, campo) => {
    const bloquesEstado = new Set(F.ubicacion?.estado || []);
    const conNotaPropia = (f) => filas.some((h) => h.detalla_a && h.detalla_a.trim() === String(f.etiqueta).trim());
    const cands = delLado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] && !conNotaPropia(f));
    if (cands.length < 2 || cands.length > 14) return null;
    const porBloque = new Map();
    for (const h of filas) { if (bloquesEstado.has(h.bloque)) continue; if (!porBloque.has(h.bloque)) porBloque.set(h.bloque, []); porBloque.get(h.bloque).push(h); }
    for (const [bloque, rows] of porBloque) {
      if (rows.some((h) => h.detalla_a) || !rows.every((h) => h.lado === 'gasto')) continue;
      if (rows.filter((h) => h.tipo === 'renglon').length < 2) continue;
      const tot = [...rows].reverse().find((h) => h.tipo !== 'renglon' && isFinite(h[campo]) && h[campo]);
      if (!tot) continue;
      const T = Math.abs(tot[campo]);
      const conjuntos = [];
      for (let mask = 1; mask < (1 << cands.length) && conjuntos.length < 2; mask++) {
        const sel = cands.filter((_, i) => mask & (1 << i));
        if (sel.length < 2) continue;
        const s = sel.reduce((a, f) => a + Math.abs(f[campo]), 0);
        if (Math.abs(s - T) <= 1e-9 + 0.5 * (sel.reduce((a, f) => a + (f.u || 0), 0) + (tot.u || 0))) conjuntos.push(sel);
      }
      if (conjuntos.length !== 1) continue;
      const grupo = conjuntos[0];
      const c = cerrarNota(grupo.reduce((a, f) => a + Math.abs(f[campo]), 0), rows, campo, grupo.reduce((a, f) => a + (f.u || 0), 0));
      if (c) return { bloque, renglones: grupo, hojas: c.hojas };
    }
    return null;
  };
  // cada hoja de una nota abierta recuerda de qué línea(s) del .md venía su renglón del estado, para que un ajuste
  // `fila` con `reemplazaLinea` saque las hojas si el renglón estaba abierto. Propiedad NO enumerable: no se escribe en el .verificacion.json
  // ni cambia nada de lo que se carga (se pierde en un {...spread}, y no hace falta después de aplicarAjustesFila).
  const conLineas = (hojas, renglones) => { const ls = renglones.map((x) => Number(x.linea)).filter(Number.isFinite); for (const h of hojas) Object.defineProperty(h, 'desdeLineas', { value: ls, enumerable: false, configurable: true }); return hojas; };
  const lineasDeLado = (lado, campo = 'M', conOtros = false, firmado = false, subRepetido = false, finEnBloque = false, acumulados = false) => {
    const out = [];
    const delLado = estado.filter((f) => f.lado === lado || (conOtros && f.lado === 'otro' && f.tipo === 'renglon'));
    const grupo = lado === 'gasto' ? notaDeGrupo(delLado, campo) : null;
    if (grupo && conNotas && campo === 'M' && !gruposAbiertos.has(grupo.bloque)) {
      gruposAbiertos.add(grupo.bloque);
      notas.push(`escalón 1 de las notas: la nota ${grupo.bloque} (sin renglón) suma el grupo "${grupo.renglones.map((r) => r.etiqueta).join('" + "')}" (${r6(grupo.renglones.reduce((a, r) => a + Math.abs(r.M), 0))}); se usa si la lectura que gana abre notas`);
    }
    const rengs = delLado.filter((f) => f.lado === lado && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo]);
    const signoNormal = rengs.filter((f) => f[campo] < 0).length > rengs.length / 2 ? -1 : 1;
    const salidaDe = new Map(); // renglón del estado -> lo que dejó en `out` (él mismo, o las hojas de su nota)
    const saltar = new Set(); // renglones de ABAJO de un subtotal cuya nota ya los reemplazó (subtotal impreso arriba)
    for (const [k, f] of delLado.entries()) {
      if (saltar.has(f)) continue;
      const antes = out.length;
      if (f.lado === 'otro') continue; // (conOtros) solo cuenta como componente; lo ubica la lectura 3
      // escalón 1 de las notas: el grupo entero se reemplaza por las filas de la nota en el lugar de su primer renglón
      if (grupo && grupo.renglones.includes(f)) {
        if (f === grupo.renglones[0]) out.push(...conLineas(abrirAnidadas(grupo.hojas.map((h) => ({ ...h, [campo]: h.valorNota, origen: `nota que desglosa "${grupo.renglones.map((r) => r.etiqueta).join('" + "')}" (escalón 1: grupo de renglones)` })), campo, 1), grupo.renglones));
        continue;
      }
      // un total/subtotal cuenta como línea solo si NO es la suma de renglones de arriba del mismo lado (Forest: "Turnover" total + venta de jugadores)
      // (y tampoco la suma de los renglones que tiene ABAJO: el estilo "Ingresos 500" y debajo sus componentes)
      if (f.tipo !== 'renglon') {
        if (f.tipo === 'resultado') continue;
        // ESCALÓN "columna anterior con signo" (Lazio 2016-17 y Milan 2018-19): en la columna del año anterior (`campo` 'A') un total también es la suma
        // de sus renglones si cierra CON SU SIGNO impreso (como la lectura 4 para la actual): una "Variazione delle rimanenze (608.641)" negativa suma en valor
        // absoluto 95,04 M contra el total impreso de 93,82 M, y el total se contaba además de sus renglones (188,86 M). La compuerta es la misma suma exacta.
        const esSumaDe = (lista) => { let acc = 0; let accF = 0; for (let j = 0; j < lista.length; j++) { acc += Math.abs(lista[j][campo] || 0); accF += lista[j][campo] || 0; if (j >= 1 && (cerca(acc, Math.abs(f[campo] || 0)) || ((conOtros || firmado || campo === 'A') && cerca(Math.abs(accF), Math.abs(f[campo] || 0))))) return true; } return false; };
        // UN SUBTOTAL CON SUS HIJOS ES UN COMPONENTE DEL TOTAL: "Matcheinnahmen" 16,13 M (Basel 2005) es un subtotal con 4 filas
        // debajo (aus Meisterschaft…, que detallan_a Matcheinnahmen) que suman exacto su importe; el "Total Ertrag" 38,22 M suma ese subtotal y 7 renglones más. Las filas
        // hijas no están en `delLado`, así que con solo renglones daba 22,09 y el total se contaba además de sus componentes (ingresos 76,43 M). Cuenta como
        // componente un subtotal de arriba con 2 hijas o más que suman su importe (así no entra un subtotal que suma renglones de arriba).
        const esCompuesto = (x) => { if (x.tipo !== 'subtotal') return false; const hs = filas.filter((h) => h.detalla_a && String(h.detalla_a).trim() === String(x.etiqueta).trim() && h.lado === x.lado); return hs.length >= 2 && cerca(hs.reduce((a, h) => a + Math.abs(h[campo] || 0), 0), Math.abs(x[campo] || 0)); };
        const arriba = delLado.slice(0, k).filter((x) => x.tipo === 'renglon').reverse(); const abajo = delLado.slice(k + 1).filter((x) => x.tipo === 'renglon');
        const arribaConCompuestos = delLado.slice(0, k).filter((x) => x.tipo === 'renglon' || esCompuesto(x)).reverse(); // solo para la decisión final de abajo, no para los escalones previos
        // ESCALÓN "SUBTOTAL REPETIDO" (escalón 1, aprobado por Guido; solo con `subRepetido`, que se prueba después
        // de que falla la lectura 4). Un subtotal con el MISMO importe que el renglón INMEDIATO de arriba (del mismo lado) es ese renglón
        // repetido, no una línea más (esSumaDe pide dos renglones y la lectura 4 junta todos los de arriba hasta un encabezado, que a veces no
        // se extrae). Si el renglón ya se abrió con su propia nota, el subtotal se saltea; si no, el subtotal ocupa su lugar (y se abre con SU
        // nota si la tiene, o entra entero: el mismo importe). Casos: Parma 2025 (.md L525 "altri" 118.887.215, L526 "Totale altri ricavi e
        // proventi" 118.887.215; "altri" abierto con la nota b31) y Parma 2024 (la nota b46, L1527-L1534, cuelga del subtotal): sin esto los
        // ingresos daban el doble, ninguna lectura 0-4 cerraba y ganaba la 5, que no abre notas (Televisión en 0).
        // Y una fila que no es renglón con el MISMO importe que la fila INMEDIATA DE ABAJO del estado (mismo lado, nada
        // en el medio: ni otra fila de otro lado) es el mismo número impreso dos veces: no se cuenta y queda la de abajo (la más detallada, o el
        // total). Casos: Remo 2023 y 2024 ("Receita Operacional Bruta" 33.831.604 y "Receita Operacional Líquida" 33.831.604, sin deducciones,
        // L10 y L12); Remo 2020 (total "(+) Receita Bruta Operacional" 12.351.668,08, L191, y su único renglón con el mismo importe, L192).
        // esSumaDe pide dos renglones, así que un subtotal de un solo renglón o repetido por el total se contaba además.
        // Y una fila que no es renglón y es la suma CON SIGNO de las filas de arriba de su lado CONTANDO LOS SUBTOTALES
        // (esSumaDe(arriba) mira solo renglones): "RECEITA LÍQUIDA" = "RECEITA OPERACIONAL BRUTA" (subtotal, abierto con su nota) − "Deduções".
        // No se cuenta: sus partes ya están. Caso: Ferroviária 2016 (.md L113-115: 9.221.750 − 10.553 = 9.211.197), se sumaba además de la nota.
        if (subRepetido && !esSumaDe(arriba) && !esSumaDe(abajo) && esSumaDe(delLado.slice(0, k).filter((x) => x.tipo !== 'resultado' && x.lado === lado).reverse())) {
          if (campo === 'M') { const n = `escalón "subtotal repetido": "${f.etiqueta}" (L${f.linea}) es la suma de las filas de arriba (con su subtotal); se saltea`; if (!notasSubRep.includes(n)) notasSubRep.push(n); }
          if (campo === 'M') partesSubRep.set(f.linea, delLado.slice(0, k).filter((x) => x.tipo !== 'resultado' && x.lado === lado).map((x) => x.etiqueta));
          continue;
        }
        // Y una fila que no es renglón y es la suma de los RENGLONES DE ABAJO DE CUALQUIER LADO, cuando esa suma incluye
        // una fila del financiero distinta de cero (esSumaDe(abajo) mira solo su lado): un subtotal de ingresos o de gastos que tiene adentro
        // una fila del financiero. No se cuenta (cada parte está en su lado) y esa fila del financiero toma el signo de su bloque: suma dentro
        // de los ingresos, resta dentro de los gastos (impresas las dos en positivo). Caso: Avaí 2021 (.md L121-148): "Receitas do Futebol
        // Profissional" 25.303.151 = ingresos + "Receita Financeira" 27.397; "Custos Futebol Profissional total" 41.707.360 incluye
        // "Despesas financeiras deságio" 3.995.456; "Despesas Operacionais" 15.142.893 incluye "Despesas Financeiras" 2.690.087.
        if (finEnBloque && campo === 'M' && (lado === 'ingreso' || lado === 'gasto') && !esSumaDe(arriba) && !esSumaDe(abajo)) {
          const abajoTodo = estado.slice(estado.indexOf(f) + 1).filter((x) => x.tipo === 'renglon' && x.lado !== 'resultado');
          let acc = 0; let n = -1; const obj = Math.abs(f.M || 0); const tolS = Math.max(TOL, 0.5 * (f.u || 0));
          for (let j = 0; j < abajoTodo.length; j++) { acc += Math.abs(abajoTodo[j].M || 0) * (abajoTodo[j].lado === lado || abajoTodo[j].lado === 'financiero' ? Math.sign(abajoTodo[j].M || 0) || 1 : 1); if (j >= 1 && Math.abs(Math.abs(acc) - obj) <= tolS + 0.5 * abajoTodo.slice(0, j + 1).reduce((a, x) => a + (x.u || 0), 0)) { n = j; break; } }
          const tramo = n >= 0 ? abajoTodo.slice(0, n + 1) : [];
          const finAdentro = tramo.filter((x) => x.lado === 'financiero' && Math.abs(x.M || 0) > 0);
          if (finAdentro.length) {
            for (const x of finAdentro) signoFinBloque.set(x.linea, lado === 'ingreso' ? 1 : -1);
            const n2 = `escalón "financiero dentro de un subtotal": "${f.etiqueta}" (L${f.linea}) es la suma de los renglones de abajo con ${finAdentro.length} fila(s) del financiero adentro; no se cuenta y esas filas del financiero ${lado === 'ingreso' ? 'suman' : 'restan'}`;
            if (!notasFinBloque.includes(n2)) notasFinBloque.push(n2);
            continue;
          }
        }
        // ESCALÓN "ACUMULADOS": el estado del POC portugués (antes de 2010) imprime totales que ACUMULAN: (C) = (A) + juros,
        // (E) = (C) + extraordinarios, (G) = (E) + imposto; (D) = (B) + juros obtidos, (F) = (D) + extraordinarios. Ninguno es la suma de
        // renglones de su lado (esSumaDe), así que se contaban como filas. Un subtotal/total que es EXACTO el subtotal/total anterior de su
        // lado + los renglones de su lado que hay entre los dos + algunas filas del financiero o del impuesto de ese tramo no se cuenta; esas
        // filas del financiero toman el signo de su lado (las dos columnas imprimen los juros en positivo: los de "Custos" restan, los de
        // "Proveitos" suman). Se miran solo las filas de su lado, del financiero y del impuesto porque el estado en dos columnas intercala
        // los lados por línea (Sporting 2004-05, L402-L423). Compuerta: el resultado impreso EXACTO, al final de la escalera (como el
        // patrón C). Casos: Benfica 2005-06 y 2006-07 (L902-941), Sporting 1999 a 2006-07.
        if (acumulados && (lado === 'ingreso' || lado === 'gasto') && !esSumaDe(arriba) && !esSumaDe(abajo)) { // también en la columna anterior (chequeos del año vecino y anterior)
          const iF = estado.indexOf(f);
          let iX = -1; for (let i = iF - 1; i >= 0; i--) { const x = estado[i]; if (x.lado === lado && x.tipo !== 'renglon' && x.tipo !== 'resultado' && isFinite(x[campo])) { iX = i; break; } }
          if (iX >= 0) {
            const X = estado[iX]; const entre = estado.slice(iX + 1, iF).filter((x) => x.tipo === 'renglon' && isFinite(x[campo]));
            const propios = entre.filter((x) => x.lado === lado); const sueltas = entre.filter((x) => (x.lado === 'financiero' || x.lado === 'impuesto') && Math.abs(x[campo] || 0) > 0);
            const abs = (arr) => arr.reduce((a, x) => a + Math.abs(x[campo] || 0), 0); const uDe = (arr) => arr.reduce((a, x) => a + (x.u || 0), 0);
            const obj = Math.abs(f[campo] || 0); const base = Math.abs(X[campo] || 0) + abs(propios);
            let elegido = null; let ambiguo = false;
            if (sueltas.length <= 4) for (let m = 0; m < (1 << sueltas.length); m++) {
              const sub = sueltas.filter((_, b) => m & (1 << b));
              if (Math.abs(base + abs(sub) - obj) <= Math.max(TOL, 0.5 * (f.u || 0)) + 0.5 * uDe([X, ...propios, ...sub])) { if (elegido) { ambiguo = true; break; } elegido = sub; }
            }
            if (elegido && !ambiguo) {
              if (campo === 'M' && conNotas) { // solo la lectura del documento propio anota (armar() también lee el documento vecino)
              for (const x of elegido) if (x.lado === 'financiero') signoAcum.set(x.linea, lado === 'ingreso' ? 1 : -1);
              const n3 = `escalón "acumulados": "${f.etiqueta}" (L${f.linea}) es "${X.etiqueta}" (L${X.linea})${propios.length ? ` + ${propios.length} renglón(es) de su lado` : ''}${elegido.length ? ` + ${elegido.map((x) => `"${x.etiqueta}" (L${x.linea})`).join(' + ')}` : ''}; no se cuenta`;
              if (!notasAcum.includes(n3)) notasAcum.push(n3);
              }
              continue;
            }
          }
        }
        const sigEst = subRepetido ? estado[estado.indexOf(f) + 1] : null;
        if (sigEst && sigEst.lado === lado && sigEst.tipo !== 'resultado' && Math.abs(f[campo] || 0) > 0 && cerca(Math.abs(sigEst[campo] || 0), Math.abs(f[campo] || 0)) && !esSumaDe(arriba) && !esSumaDe(abajo)) {
          if (campo === 'M') { const n = `escalón "subtotal repetido": "${f.etiqueta}" (L${f.linea}) repite la fila de abajo "${sigEst.etiqueta}" (L${sigEst.linea}); se saltea`; if (!notasSubRep.includes(n)) notasSubRep.push(n); }
          continue;
        }
        const previo = subRepetido && k > 0 ? delLado[k - 1] : null;
        if (previo && previo.tipo === 'renglon' && previo.lado === lado && !esSumaDe(arriba) && !esSumaDe(abajo) && cerca(Math.abs(previo[campo] || 0), Math.abs(f[campo] || 0))) {
          const salio = salidaDe.get(previo) || [];
          const abierto = salio.length !== 1 || !String(salio[0].origen || '').startsWith('estado');
          if (campo === 'M') { const n = `escalón "subtotal repetido": "${f.etiqueta}" (L${f.linea}) repite "${previo.etiqueta}" (L${previo.linea})${abierto ? '; se saltea' : '; ocupa su lugar'}`; if (!notasSubRep.includes(n)) notasSubRep.push(n); }
          if (abierto) continue;
          const quitar = new Set(salio); for (let i = out.length - 1; i >= 0; i--) if (quitar.has(out[i])) out.splice(i, 1);
        } else if (esSumaDe(arriba) || esSumaDe(abajo) || esSumaDe(arribaConCompuestos)) {
          // ESCALÓN: LA NOTA DEL SUBTOTAL. La extracción puede asignar las filas de una nota
          // al SUBTOTAL del grupo ("Totale altri ricavi e proventi") y no a un renglón: la nota reparte el grupo distinto que el estado
          // (Sassuolo 2025: a) 50,29 M y f) 15,41 M en el estado; sponsors, TV, Lega... en la nota) y no cierra ningún renglón. Hasta acá el
          // subtotal se salteaba (es la suma de los de arriba) y su nota no se usaba nunca: TV y sponsors quedaban en "otros ingresos". Si 2+
          // filas de la nota, del mismo lado, suman el subtotal IMPRESO (cerrarNota, la compuerta de siempre) y los renglones que lo componen
          // no se abrieron con una nota propia, esos renglones se reemplazan por las filas de la nota. Casos: Bologna 2019-20 y 2021-22,
          // Sassuolo 2025, Udinese 2021-22. SOLO EN EL CAMINO DE ERROR (`ladosCero`, decisión de Guido) y del lado de la categoría en 0: donde el estado ya viene desglosado
          // la nota repartía distinto (Atalanta 2024) o repetía lo mismo con otro nombre (Parma 2023).
          const hijasSub = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === String(f.etiqueta).trim() && h.lado === lado);
          const componentes = (lista) => { let acc = 0; for (let j = 0; j < lista.length; j++) { acc += Math.abs(lista[j][campo] || 0); if (j >= 1 && cerca(acc, Math.abs(f[campo] || 0))) return lista.slice(0, j + 1); } return null; };
          // componentes ARRIBA (Bologna: renglones y después "Totale altri ricavi e proventi") o, si no, ABAJO (Sassuolo 2025: "5) Altri ricavi
          // e proventi: 68.086.429" impreso arriba de a), b) y f)). Los de abajo todavía no pasaron: se exige que ninguno tenga nota propia.
          let comp = componentes(arriba); const deAbajo = !comp && (comp = componentes(abajo));
          const sueltos = comp && (deAbajo ? comp.every((x) => !filas.some((h) => h.detalla_a && h.detalla_a.trim() === String(x.etiqueta).trim())) : comp.every((x) => (salidaDe.get(x) || []).length === 1 && String(salidaDe.get(x)[0].origen || '').startsWith('estado')));
          // en la primera pasada, solo un grupo que el estado NO desglosa: 3 renglones o menos y uno de ellos de 20% o
          // más de los ingresos (Cremonese 2024: "altri" 42,8 + contributi 13,1; Sassuolo: a), b), f)). Un grupo ya desglosado en el estado
          // (Atalanta 2022/2024 y Genoa 2022: ~9 renglones) no se toca: su nota reparte distinto (Atalanta 2024: la TV 107,5 -> 101,8 M).
          const forzOk = ctx.forzarNotaSub && lado === 'ingreso' && comp && comp.length <= 3 && comp.some((x) => Math.abs(x[campo] || 0) >= 0.2 * ctx.totIngForz);
          let cn = (ladosCero.has(lado) || forzOk) && hijasSub.length >= 2 && sueltos ? cerrarNota(Math.abs(f[campo] || 0), hijasSub, campo, f.u || 0) : null;
          // GANA EL ESTADO SI ABRE MÁS: la nota reemplaza a los renglones del estado solo si trae al menos
          // tantas filas como las que reemplaza. Si trae menos es más gruesa que el estado y pierde el desglose. Caso: Sarpsborg 08 2024, la Note 1
          // trae 2 áreas (Arrangement 69,1 M y Salg/utleie spillere 134,6 M) para los 8 renglones de ingresos del estado (L116-124).
          if (cn && comp && cn.hojas.length < comp.length) cn = null;
          if (cn) {
            if (deAbajo) for (const x of comp) saltar.add(x);
            const quitar = new Set(deAbajo ? [] : comp.flatMap((x) => salidaDe.get(x))); const pos = deAbajo ? out.length : Math.min(...[...quitar].map((x) => out.indexOf(x)));
            for (let i = out.length - 1; i >= 0; i--) if (quitar.has(out[i])) out.splice(i, 1);
            out.splice(pos, 0, ...conLineas(abrirAnidadas(cn.hojas.map((h) => ({ ...h, [campo]: h.valorNota, origen: `nota que desglosa "${f.etiqueta}" (escalón: la nota del subtotal)` })), campo, 1), comp));
            if (campo === 'M' && !(ctx.forzarNotaSub && !ladosCero.has(lado))) notaSubtotalLados.add(lado);
            const n = `la nota del subtotal "${f.etiqueta}" suma el subtotal impreso (${r6(Math.abs(f[campo] || 0))}): reemplaza a "${comp.map((x) => x.etiqueta).join('" + "')}"`;
            const destinoN = ctx.forzarNotaSub && !ladosCero.has(lado) ? notasNotaSub : notas; if (campo === 'M' && !destinoN.includes(n)) destinoN.push(n);
          }
          continue;
        }
        // (solo en la lectura 4) un subtotal igual al ÚNICO renglón que tiene arriba desde el total/subtotal anterior del mismo
        // lado es ese renglón repetido, no una fila más (esSumaDe pide dos o más). Caso: Novorizontino 2024, "Impostos incidentes sobre a
        // receita" (1.303.783) y debajo "(-) Deduções da receita bruta" (1.303.783): se restaba una vez y se sumaba otra.
        if (firmado) {
          let i = k - 1; const solos = [];
          while (i >= 0 && delLado[i].tipo === 'renglon') { if (delLado[i].lado === lado) solos.push(delLado[i]); i--; }
          if (solos.length === 1 && cerca(Math.abs(solos[0][campo] || 0), Math.abs(f[campo] || 0))) continue;
        }
      }
      // Todas las filas de nota que dicen desglosar este renglón (renglones Y subtotales/totales: la estructura impresa hace falta para
      // saber qué suma qué; ver cerrarNota()).
      const hijas = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === f.etiqueta.trim());
      const obj = Math.abs(f[campo] || 0);
      let c = hijas.length >= 2 ? (cerrarConAjuste(f, hijas, campo) || cerrarNota(obj, hijas, campo, f.u || 0)) : null;
      // (frenado de Beşiktaş 2018) NOTA CON UN SUBTOTAL QUE TIENE FILAS PROPIAS: si las filas que dicen abrir este renglón no lo cierran y alguna
      // es un subtotal que a su vez tiene filas propias (detalla_a = ese subtotal), se prueba otra vez con esas filas también, en el orden del documento
      // (hasta 3 niveles). Misma compuerta (cerrarNota). Caso: Beşiktaş 2018, nota 18: "Satışların maliyeti" = mercaderías 68,3 + "Satılan hizmet maliyeti"
      // 552,1 (subtotal con 11 filas: salarios 393,9...) = 620,3; con las hijas directas sumaba 68,3 y quedaba el total como una línea. (La nota de ese año no suma por un error del documento, 98.157: se abre con el ajuste `desglose`.)
      if (!c && hijas.some((h) => h.tipo !== 'renglon')) {
        const conjunto = new Set(hijas); let frontera = hijas.filter((h) => h.tipo !== 'renglon');
        for (let nivel = 0; nivel < 3 && frontera.length; nivel++) {
          const nuevas = filas.filter((h) => !conjunto.has(h) && h.detalla_a && frontera.some((s) => s.etiqueta.trim() === h.detalla_a.trim()));
          nuevas.forEach((h) => conjunto.add(h)); frontera = nuevas.filter((h) => h.tipo !== 'renglon');
        }
        if (conjunto.size > hijas.length) { const ampliadas = filas.filter((h) => conjunto.has(h)); c = cerrarConAjuste(f, ampliadas, campo) || cerrarNota(obj, ampliadas, campo, f.u || 0); }
      }
      // ESCALÓN DEL LADO: si las filas que dicen abrir este renglón no lo cierran, se prueba SOLO con las
      // del mismo lado que el renglón. Nombres repetidos: en el formato italiano "altri" es el renglón de ingresos 5), el 16) y el 17), y las
      // notas de intereses (lado financiero) también dicen abrir "altri" (Bologna 2020-21: 9 filas de ingresos 79.927.218 + 8 de intereses =
      // 81.433.661 contra 79.927.219). Escalón y no regla: probado como regla, rompía Goiás 2025 (cargado), cuya nota "Outras Receitas e
      // Despesas" mezcla un gasto y un ingreso que juntos dan el renglón neto. La compuerta es la de siempre: cerrarNota().
      if (!c && hijas.length >= 2) {
        const ladoOk = (h) => !h.lado || !f.lado || h.lado === f.lado || h.lado === 'otro' || f.lado === 'otro';
        const mismas = hijas.filter(ladoOk);
        if (mismas.length >= 2 && mismas.length < hijas.length) { c = cerrarConAjuste(f, mismas, campo) || cerrarNota(obj, mismas, campo, f.u || 0); if (c) { const n = `la nota de "${f.etiqueta}" cierra solo con sus filas del lado ${f.lado} (${hijas.length - mismas.length} filas de otro lado dicen abrir un renglón con el mismo nombre)`; if (!notas.includes(n)) notas.push(n); } }
      }
      // en la lectura 4 (signos impresos) un renglón que RESTA en su lado le pasa ese signo
      // a las filas de su nota: cerrarNota() las devuelve relativas al renglón en valor absoluto, y sin esto la nota de una deducción sumaba.
      // Caso: St. Gallen 2024-25, "Ertragsminderungen" −463 (L260) abierto en +21 (L330) y −484 (L403): se leían −21 y +484.
      if (c) { const sg = firmado && f.tipo === 'renglon' && (f[campo] || 0) * signoNormal < 0 ? -1 : 1; out.push(...conLineas(abrirAnidadas(c.hojas.map((h) => ({ ...h, [campo]: h.valorNota * sg, origen: `nota que desglosa "${f.etiqueta}"` })), campo, 1), [f])); }
      else { out.push({ ...f, [campo]: firmado && f.tipo === 'renglon' ? (f[campo] || 0) * signoNormal : Math.abs(f[campo] || 0), origen: firmado && f.tipo === 'renglon' && (f[campo] || 0) * signoNormal < 0 ? 'estado (lectura 4: signo impreso, resta en su lado)' : 'estado' }); if (conNotas && hijas.length >= 2 && campo === 'M' && !desgloseTrivial(f, hijas)) { const sr = r6(hijas.filter((h) => h.tipo === 'renglon').reduce((a, h) => a + Math.abs(h.M || 0), 0)); if (!reintentos.some((x) => x.renglon === f.etiqueta)) notas.push(`la nota de "${f.etiqueta}" no suma el renglón (${sr} contra ${r6(obj)}, sumando sus renglones): quedó el renglón del estado`); if (!reintentos.some((x) => x.renglon === f.etiqueta)) reintentos.push({ renglon: f.etiqueta, suma: sr, objetivo: r6(obj) }); } }
      if (f.tipo === 'renglon') salidaDe.set(f, out.slice(antes));
    }
    return out;
  };
  return { filas, estado, lineasDeLado, mult };
  }

  return { armar };
}

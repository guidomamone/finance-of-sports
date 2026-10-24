// ============================================================================
// tools/verificar-vecinos.mjs — el documento vecino del club y sus chequeos, para verificar()
// Mudado de tools/verificar.mjs sin cambiar una línea (salvo `export`); tools/verificar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { ajusteDe, ajustesDe } from './ajustes.mjs';
import { DESCARTADOS, PARCIALES } from './etapa-doc.mjs';
import { parseNumber, EURO_FIJO, MULT, cerca, unidad, nbbDe, codigosNBBde, repiteResultado } from './verificar.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// El documento vecino del club (año siguiente o anterior) y sus chequeos, más las funciones de lectura.
export function faseVecinos(ctx) {
  const { year, pdf, registro, armar, e, F, U, nbbPropio } = ctx;
  // EL DOCUMENTO VECINO DEL CLUB (año siguiente dy=1 o anterior dy=-1), si ya pasó por extraer.mjs: lo usan la escalera de escala y el
  // chequeo 4b. Su factor es el que resolvió SU propia escalera (queda en su .verificacion.json); `anclado` = su escala es conocida (la
  // declara, escalón 0, o la resolvió por el escalón 1). Uno que dice "no se sabe" y no la resolvió no puede proponerle escala a otro.
  const vecinoDe = (dy) => {
    if (!year) return null;
    const carpeta = pdf.split('/').slice(0, 3).join('/');
    // el año del otro documento: su fecha de cierre o, si no la tiene, la deducida de sus vecinos
    const anioDe = (x) => (x.periodo?.cierre ? Number(x.periodo.cierre.slice(0, 4)) : cierrePorVecinos(x.pdf, registro)?.anio ?? null);
    // De los documentos del club con ese año, el que pasó por extraer. Antes se tomaba el PRIMERO del año y, si no tenía
    // .filas.json, no había chequeo: Fortaleza CEIF 2023 nunca se comparó con 2024 porque el primero de 2024 es certificacion-ef-2024.pdf.
    const filasDe = (x) => resolve(ROOT, derivado(x.md, '.filas.json', { crear: false }));
    // un documento descartado o parcial no es vecino: no es del club o no cubre el año (Rio Ave 2014-15, de la asociación).
    // en una carpeta con dos entidades que se suman (ajuste `suma-con`: Vålerenga AS y Elite) el vecino es de la MISMA entidad: el documento que es la
    // "otra entidad" de una suma solo se compara con otros de su rol, y los demás no se comparan con él.
    const esOtra = (p) => registro.some((r) => r.pdf.startsWith(carpeta + '/') && ajusteDe(r.pdf, 'suma-con')?.valor === p);
    const miRol = esOtra(pdf);
    const otro = registro.find((x) => x.pdf !== pdf && x.pdf.startsWith(carpeta + '/') && !DESCARTADOS.has(x.pdf) && !PARCIALES.has(x.pdf) && x.md && existsSync(filasDe(x)) && anioDe(x) === year + dy && esOtra(x.pdf) === miRol);
    if (!otro) return null;
    const pF2 = filasDe(otro);
    // el vecino también por sus códigos NBB (si los trae y cierran)
    const F2 = JSON.parse(readFileSync(pF2, 'utf8')); const n2 = nbbDe(F2, otro.md, otro.pdf);
    const pU2 = resolve(ROOT, derivado(otro.md, '.ubicacion.json', { crear: false })); const U2 = existsSync(pU2) ? JSON.parse(readFileSync(pU2, 'utf8')) : {};
    if (n2) U2.bloques = { ...(U2.bloques || {}), nbb: n2.bloque };
    const pV2 = resolve(ROOT, derivado(otro.md, '.verificacion.json', { crear: false })); const esc2 = existsSync(pV2) ? JSON.parse(readFileSync(pV2, 'utf8')).escala : null;
    const k2 = !MULT[U2.escala] && esc2?.escalon === 1 ? esc2.factor : 1;
    // la lectura con la que cerró el vecino: su columna se lee igual que se leyó la suya
    const lect2 = existsSync(pV2) ? Number(((JSON.parse(readFileSync(pV2, 'utf8')).chequeos || []).find((c) => c.nombre === 'lectura')?.detalle?.match(/lectura (\d)/) || [])[1] || 0) : 0;
    const subRep2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).some((n) => String(n).startsWith('escalón "subtotal repetido"')) : false;
    const ventana2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).some((n) => String(n).startsWith('escalón "gestión de jugadores neta"')) : false;
    const acumNotas2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).filter((n) => String(n).startsWith('escalón "acumulados"')) : []; const otrosRes2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).some((n) => String(n).startsWith('escalón "otros con el signo del resultado"')) : false; const acum2 = acumNotas2.length ? (acumNotas2.some((n) => n.includes('(sin-otros)')) ? 'sin-otros' : true) : otrosRes2 ? 'otros-resultado' : false;
    return { otro, U2, k2, lect2, subRep2, ventana2, acum2, anclado: !!MULT[U2.escala] || esc2?.escalon === 1, nbb2: n2 ? n2.N : codigosNBBde(otro.md), A2: armar(n2 ? n2.F : F2, U2, false, k2) };
  };
  // Los ingresos de un documento leídos con UNA lectura de la escalera: 3 suma los renglones sin lado por su signo (y lee los
  // subtotales con ellos), 4 además conserva los signos impresos. Lo usa el chequeo del año vecino: hasta la 397 leía los dos documentos con
  // la lectura 0 aunque hubieran cerrado con otra. Caso: Goiás 2011 cerró con la lectura 4 (ingresos 17.096.667, igual al total impreso y a
  // la columna 2011 del documento 2012), y el chequeo comparaba 52.419.680 (lectura 0) contra 17.096.667.
  // VENTANA de las filas sin lado: las que están entre el total de costos y el "resultado antes de impuestos" del estado de A. La usa el
  // escalón "gestión de jugadores neta" de la lectura 6, en la columna actual y en la del año anterior (y la del documento vecino).
  const enVentanaOtros = (A) => { const e = A.estado; const tc = e.filter((f) => f.tipo === 'total' && f.lado === 'gasto' && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0]; const an = e.filter((f) => f.tipo === 'resultado' && /antes\s+de(l)?\s+impuesto|before\s+(income\s+)?tax|vor\s+(ertrag)?steuern|antes\s+dos\s+impostos|avant\s+imp[oô]t|voor\s+belasting|ante\s+imposte|prima\s+delle\s+imposte/i.test(f.etiqueta) && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0]; return (f) => !!(tc && an && f.linea > tc.linea && f.linea < an.linea); };
  const ingresosConLectura = (A, campo, nivel, subRep = false, ventana = false, acum = false) => { // acum: cerró con el escalón "acumulados" // subRep: la lectura 4 cerró con el escalón "subtotal repetido"
    if (nivel < 3) return A.lineasDeLado('ingreso', campo);
    if (nivel >= 5) { // las mismas hojas con signo C/D de la lectura 5, en la columna pedida (actual o año anterior)
      const r = A.estado.filter((f) => f.lado === 'ingreso' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo]); const normal = r.filter((f) => f[campo] < 0).length > r.length / 2 ? -1 : 1;
      const hojas = r.map((f) => { const m = String((campo === 'A' ? f.anterior : f.actual) ?? '').trim().match(/\s([CD])$/i); return { ...f, [campo]: m ? (m[1].toUpperCase() === 'D' ? -Math.abs(f[campo]) : Math.abs(f[campo])) : f[campo] * normal }; });
      if (nivel < 6) return hojas;
      const g6 = A.estado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f.M) && f.M); const neg6 = g6.length ? g6.filter((f) => f.M < 0).length >= g6.length / 2 : true;
      const enV = ventana ? enVentanaOtros(A) : () => true;
      return [...hojas, ...A.estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] && enV(f) && !repiteResultado(A.estado, f, campo) && (neg6 ? f[campo] > 0 : f[campo] < 0)).map((f) => ({ ...f, [campo]: Math.abs(f[campo]) }))]; // lectura 6
    }
    const g = A.estado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f.M) && f.M); const neg = g.length ? g.filter((f) => f.M < 0).length >= g.length / 2 : true;
    const otrosI = A.estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] && !repiteResultado(A.estado, f, campo) && (neg ? f[campo] > 0 : f[campo] < 0)).map((f) => ({ ...f, [campo]: Math.abs(f[campo]) }));
    const acumB = acum === true || acum === 'sin-otros'; // 'sin-otros': el escalón "acumulados" cerró sin las filas sin lado; 'otros-resultado': cerró con ellas al signo del resultado
    const otrosV = nivel !== 4 ? otrosI : acum === 'sin-otros' ? [] : acum === 'otros-resultado' ? A.estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] > 0 && !repiteResultado(A.estado, f, campo)).map((f) => ({ ...f, [campo]: Math.abs(f[campo]) })) : otrosI;
    return [...A.lineasDeLado('ingreso', campo, true, nivel >= 4, (subRep || acumB) && nivel === 4, false, acumB && nivel === 4), ...otrosV];
  };
  // compara los ingresos del año en común (mi columna actual con la "año anterior" del siguiente, o al revés) con mi documento a escala k
  const saleDelAjuste = (a, f) => (a.reemplaza ? String(f.etiqueta).trim() === a.reemplaza.trim() || String(f.origen || '').includes(`desglosa "${a.reemplaza.trim()}"`) : false)
    || (a.reemplazaLinea != null && (Number(f.linea) === Number(a.reemplazaLinea) || (f.desdeLineas || []).includes(Number(a.reemplazaLinea))));
  const signoNormalDe = (lado, pdfDoc = pdf) => { const r = ajustesDe(pdfDoc).filter((x) => x.campo === 'fila' && x.lado === lado && isFinite(parseNumber(x.valor)) && parseNumber(x.valor)); return r.filter((x) => parseNumber(x.valor) < 0).length > r.length / 2 ? -1 : 1; };
  // (ESCALÓN 1 de los chequeos del año vecino y del año anterior cargado; aprobado por Guido) Los ingresos de una columna con los
  // ajustes `fila` del documento al que pertenece. COLUMNA ACTUAL ('M'): los que reemplazan y los que agregan, a la escala de ese documento (A.mult).
  // COLUMNA ANTERIOR ('A'): un ajuste `fila` solo trae la actual, así que acá solo cuenta el que SOLO saca una fila (valor 0 con reemplaza: una fila
  // repetida lo está en las dos columnas). El escalón 0 (las columnas crudas) corre siempre primero: este solo se prueba si el 0 falla, con la misma
  // compuerta (2%). Caso: Roma 2007 contra 2008, crudo 157.589 contra 162.017 (2,7%); con el ajuste de gestión de jugadores de 2007, 162.255 (0,15%).
  const ingresosConAjustes = (A, pdfDoc, lineas, campo, firmado = false) => {
    const m = A.mult(A.estado[0]?.bloque); let out = [...lineas];
    for (const a of ajustesDe(pdfDoc).filter((x) => x.campo === 'fila' && isFinite(parseNumber(x.valor)))) {
      const v = parseNumber(a.valor) * m; const saca = a.reemplaza || a.reemplazaLinea != null;
      if (saca && (campo === 'M' || v === 0)) out = out.filter((f) => !saleDelAjuste(a, f));
      if (campo !== 'M' || (v === 0 && saca)) continue;
      if (a.lado === 'ingreso') out.push({ etiqueta: a.etiqueta, lado: 'ingreso', tipo: 'renglon', M: firmado ? v * signoNormalDe(a.lado, pdfDoc) : Math.abs(v), u: unidad(a.valor, m), linea: a.linea ?? null, origen: 'ajuste manual' });
    }
    return out;
  };
  // ESCALÓN 2 de los chequeos del año en común: la columna del año en común leída con LAS MISMAS FILAS que cerraron la columna
  // que se carga (las líneas finales, con el signo con que contaron), en vez de volver a armarla con la lectura. Hace falta cuando esa columna
  // no suma su propio total (la reconstrucción no reconoce los subtotales y los cuenta además). Caso: Ferroviária 2024, la columna 2023 de
  // sus renglones da 38.582.080 contra el total impreso 39.134.471; la reconstrucción contaba total y "Receita líquida" (114,4 M); con las
  // filas que cerraron 2024 (renglones − "Impostos incidentes") da 37.009.979 contra 37.562.370 cargados (1,5%). Misma compuerta (2%).
  // Una fila sin esa columna (un ajuste `fila`) cuenta 0; si ninguna la trae, no decide.
  const colConFilas = (lineas, buscar) => { let s = 0; let alguna = false; for (const l of lineas) { const f = buscar(l); const a = f?.A; if (a == null || !isFinite(a)) continue; alguna = true; s += (l.M < 0 ? -1 : 1) * Math.abs(a); } return alguna ? s : null; };
  const compararVecino = (dy, V2, k, nivelMio = 0, subRepMio = false, ventanaMio = false, lineasMio = null, acumMio = false) => {
    const [campoMio, campoSuyo] = dy === 1 ? ['M', 'A'] : ['A', 'M'];
    const sumaDe = (arr, c) => arr.reduce((a, f) => a + (f[c] || 0), 0);
    const Amio = armar(F, U, false, k);
    const linMio = ingresosConLectura(Amio, campoMio, nivelMio, subRepMio, ventanaMio, acumMio); const linSuyo = ingresosConLectura(V2.A2, campoSuyo, V2.lect2 || 0, V2.subRep2, V2.ventana2, V2.acum2);
    let mio = sumaDe(linMio, campoMio); let suyo = sumaDe(linSuyo, campoSuyo);
    // escalón 1: solo si las columnas crudas no coinciden, cada una con los ajustes `fila` de su documento.
    if (!(suyo && cerca(mio, suyo, 0.02))) {
      const m1 = sumaDe(ingresosConAjustes(Amio, pdf, linMio, campoMio, nivelMio === 4), campoMio); const s1 = sumaDe(ingresosConAjustes(V2.A2, V2.otro.pdf, linSuyo, campoSuyo, V2.lect2 === 4), campoSuyo);
      if (s1 && cerca(m1, s1, 0.02)) { mio = m1; suyo = s1; }
    }
    // escalón 2: con las filas que cerraron cada columna que se carga (la mía, `lineasMio`; la del vecino, su .verificacion.json)
    if (lineasMio && !(suyo && cerca(mio, suyo, 0.02))) {
      let V2v = null; try { V2v = JSON.parse(readFileSync(resolve(ROOT, derivado(V2.otro.md, '.verificacion.json', { crear: false })), 'utf8')); } catch {}
      const lin2 = (V2v?.lineas || []).filter((l) => l.lado === 'ingreso');
      const m2 = campoMio === 'M' ? lineasMio.reduce((a, f) => a + (f.M || 0), 0) : colConFilas(lineasMio, (f) => f);
      const s2 = campoSuyo === 'M' ? (V2v?.totales?.ingresos ?? null) : colConFilas(lin2, (l) => V2.A2.estado.find((f) => f.linea === l.linea));
      if (m2 != null && s2 && cerca(m2, s2, 0.02)) { mio = m2; suyo = s2; }
    }
    // COMPUERTA DEL ESCALÓN 0: la columna del año en común ("año anterior", la mía o
    // la del siguiente) tiene que existir: alguna fila del estado la trae leída. Si no, "no se puede comparar" (null), como sin vecino. Caso:
    // Novorizontino 2014 y 2015, balancetes de una sola columna: se comparaba 0 contra 1.060.016 y mandaba un falso "no coincide" a la cola.
    // ESCALÓN 3: UN DOCUMENTO EN MONEDA LEGADO Y EL OTRO EN EUROS. Sporting 2001 (miles de escudos, ajuste `moneda`
    // PTE) contra la columna 2001 del documento 2002 (euros): 6.419,453 M PTE contra 32,02 M EUR; con la paridad fija, 6.419,453 / 200,482 =
    // 32,02. COMPUERTA: solo uno de los dos tiene ajuste `moneda` y esa moneda tiene `euroFijo` en data/currency-map.js; con la conversión,
    // la misma del escalón 0 (2%). Dos documentos en la misma moneda nunca pasan por acá.
    // ESCALÓN "códigos NBB": si los dos documentos traen el estado NBB con códigos, la columna del año en común se compara por
    // sus resultados impresos, el 9904 (del ejercicio) y el 9901 (operativo), no por los ingresos: el esquema abreviado abre o no la
    // Brutomarge según lo que imprima cada año y un documento puede reclasificar el año anterior entre la Brutomarge y otros gastos con el
    // mismo 9901 (Patro Eisden 2023: 9900 −246.781, y −232.016 en la columna 2023 de 2024); el año siguiente puede pasar del esquema
    // abreviado al completo (RWDM 2024 y 2025). Compuerta: 9904 y 9901 impresos en las dos columnas e iguales a una unidad. Solo si las
    // columnas no coinciden con los escalones de arriba; vale también para un documento con ajustes (compara lo impreso, no lo que se carga).
    if (!(suyo && cerca(mio, suyo, 0.02)) && nbbPropio && V2.nbb2) {
      const cM = campoMio === 'M' ? 'actual' : 'anterior'; const cS = campoSuyo === 'M' ? 'actual' : 'anterior';
      const iguales = ['9904', '9901'].every((c) => nbbPropio.filas[c]?.[cM] != null && V2.nbb2.filas[c]?.[cS] != null && Math.abs(nbbPropio.filas[c][cM] - V2.nbb2.filas[c][cS]) <= 1);
      if (iguales) return { mio, suyo, ok: true, codigosNBB: ['9904', '9901'] };
    }
    let paridad = null;
    if (!(suyo && cerca(mio, suyo, 0.02))) {
      const mA = ajusteDe(pdf, 'moneda')?.valor || null; const mB = ajusteDe(V2.otro.pdf, 'moneda')?.valor || null;
      const fA = mA && !mB ? EURO_FIJO[mA] : null; const fB = mB && !mA ? EURO_FIJO[mB] : null;
      if (fA || fB) { const m3 = fA ? mio / fA : mio; const s3 = fB ? suyo / fB : suyo; if (s3 && cerca(m3, s3, 0.02)) { mio = m3; suyo = s3; paridad = mA || mB; } }
    }
    const conAnterior = (A) => A.estado.some((f) => f.lado === 'ingreso' && f.A != null && isFinite(f.A) && f.A);
    if (!conAnterior(campoMio === 'A' ? Amio : V2.A2)) return { mio, suyo, ok: null, sinColumna: true };
    // uno de los dos documentos cuenta la gestión de jugadores NETA como ingreso (escalón "gestión de jugadores neta") y el otro no: no
    // definen "ingresos" igual, no se pueden comparar. Caso: Roma 2017 (254.076 con la neta) contra la columna 2017 del documento 2018 (175.000, sin ella).
    if (!!ventanaMio !== !!V2.ventana2) return { mio, suyo, ok: null, otroRegimen: true };
    return { mio, suyo, ok: suyo ? cerca(mio, suyo, 0.02) : null, paridad };
  };
  const vecinosDoc = [[1, vecinoDe(1)], [-1, vecinoDe(-1)]].filter(([, v]) => v);

  return { ingresosConLectura, saleDelAjuste, signoNormalDe, ingresosConAjustes, colConFilas, compararVecino, vecinosDoc };
}

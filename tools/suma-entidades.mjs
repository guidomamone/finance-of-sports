// ============================================================================
// tools/suma-entidades.mjs — UN EJERCICIO QUE SUMA DOS ENTIDADES. Lo usa cargar.mjs cuando el documento tiene el ajuste manual `suma-con`.
//
// POR QUÉ: Vålerenga y Ålesund no consolidan. El AS (Vålerenga Fotball AS) tiene los ingresos comerciales; el FLI/Elite (Vålerenga Fotball Elite) los sueldos y
// los jugadores, y el AS le transfiere el dinero para pagarlos: el Elite lo imprime como ingreso («Overføring fra samarbeidsselskap», 87,5 M en 2023) y el
// AS lo tiene adentro de «Annen driftskostnad» sin imprimirlo como renglón (el texto solo dice que cubre los gastos del Elite, AS 2023 L265). Sumar los dos
// documentos tal cual cuenta la transferencia dos veces, en los ingresos y en los gastos.
//
// EL AJUSTE (tools/ajustes.mjs, campo `suma-con`, sobre el PDF del AS):
//   valor           el PDF de la otra entidad, del mismo año
//   etiqueta        el renglón de GASTO del documento propio del que se resta la transferencia («Annen driftskostnad»)
//   etiqueta-otra   el renglón de INGRESO del otro documento que es la transferencia («Overføring fra samarbeidsselskap»); se saca entero
//   evidencia       las dos líneas (la del otro documento y la del propio o la cláusula que la explica): obligatoria
//
// QUÉ HACE combinar(): junta las filas verificadas de los dos documentos, saca el ingreso espejo del otro y resta ese importe del gasto propio. Los
// totales de ingresos y de gastos son la suma menos la transferencia; el resultado a cargar es la SUMA de los dos resultados impresos (la
// transferencia se cancela). Devuelve el mismo objeto que lee cargar.mjs de un .verificacion.json, así el resto del camino (categorías, tie-out,
// escritura) no cambia.
//
// COMPUERTAS (si una falla, no se carga: devuelve { error }): los dos documentos verificados en `ok`; mismo club, año, escala y moneda; el renglón
// espejo está una sola vez y es de ingreso; el renglón propio está una sola vez, es de gasto y su importe es mayor o igual que la transferencia; y los
// totales combinados cierran con la suma de los dos resultados impresos.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const leer = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
const r6 = (x) => Number(Number(x).toFixed(6));

// El .md de la otra entidad y sus derivados.
export function archivosDeOtra(pdfOtra) {
  const md = pdfOtra.replace(/\.pdf$/i, '.md');
  return { md, verificacion: resolve(ROOT, derivado(md, '.verificacion.json', { crear: false })), categorias: resolve(ROOT, derivado(md, '.categorias.json', { crear: false })), ubicacion: resolve(ROOT, derivado(md, '.ubicacion.json', { crear: false })) };
}

// El nombre corto de cada entidad sale de los nombres de los dos PDFs del ajuste: se sacan el año y los tramos que comparten
// («aarsregnskap-valerenga-fotball-as-2022» y «...-elite-2022» dan «AS» y «Elite»). Hasta 3 letras va en mayúsculas; el resto, capitalizado.
export function nombresCortos(pdfPropio, pdfOtra) {
  const toks = (p) => p.split('/').pop().replace(/\.pdf$/i, '').replace(/-?(19|20)\d\d(-\d+)?$/, '').split('-');
  const a = toks(pdfPropio); const b = toks(pdfOtra);
  let i = 0; while (i < a.length - 1 && i < b.length - 1 && a[i] === b[i]) i++;
  const fmt = (t) => t.slice(i).map((x) => (x.length <= 3 ? x.toUpperCase() : x[0].toUpperCase() + x.slice(1))).join(' ');
  return { propio: fmt(a), otra: fmt(b) };
}

export function combinar(pdf, V1, aj) {
  const err = (m) => ({ error: `suma de dos entidades (ajuste suma-con): ${m}` });
  if (!aj.valor || !aj.etiqueta || !aj.etiquetaOtra) return err('el ajuste necesita el PDF de la otra entidad (valor), el renglón de gasto propio (etiqueta) y el ingreso espejo del otro documento (etiqueta-otra)');
  if (!String(aj.evidencia || '').trim()) return err('el ajuste necesita su evidencia: las dos líneas (la del otro documento y la del propio o la cláusula que la explica)');
  const A = archivosDeOtra(aj.valor);
  if (!existsSync(A.verificacion)) return err(`la otra entidad (${aj.valor}) no tiene .verificacion.json: armarla y verificarla primero`);
  const V2 = leer(A.verificacion);
  if (!V2 || V2.estado !== 'ok') return err(`la verificación de ${aj.valor} no está en ok`);
  if (V1.estado !== 'ok') return err('la verificación del documento propio no está en ok');
  if (V1.clubId !== V2.clubId || String(V1.year) !== String(V2.year)) return err(`los dos documentos tienen que ser del mismo club y año (${V1.clubId} ${V1.year} contra ${V2.clubId} ${V2.year})`);
  if (String(V1.escala?.valor) !== String(V2.escala?.valor)) return err(`la escala difiere (${V1.escala?.valor} contra ${V2.escala?.valor})`);
  const u1 = leer(resolve(ROOT, derivado(V1.md, '.ubicacion.json', { crear: false }))); const u2 = leer(A.ubicacion);
  if (u1?.moneda && u2?.moneda && u1.moneda !== u2.moneda) return err(`la moneda difiere (${u1.moneda} contra ${u2.moneda})`);
  const espejo = V2.lineas.filter((l) => norm(l.etiqueta) === norm(aj.etiquetaOtra) && l.lado === 'ingreso');
  if (espejo.length !== 1) return err(`el ingreso espejo «${aj.etiquetaOtra}» tiene que estar una sola vez como ingreso en el otro documento (está ${espejo.length})`);
  const propio = V1.lineas.filter((l) => norm(l.etiqueta) === norm(aj.etiqueta) && l.lado === 'gasto');
  if (propio.length !== 1) return err(`el renglón de gasto «${aj.etiqueta}» tiene que estar una sola vez en el documento propio (está ${propio.length})`);
  const T = Math.abs(espejo[0].M);
  if (Math.abs(propio[0].M) + 1e-9 < T) return err(`el renglón propio «${aj.etiqueta}» (${r6(propio[0].M)}) es menor que la transferencia (${r6(T)}): no se resta`);
  const sinEspejo = V2.lineas.filter((l) => l !== espejo[0]);
  const nom = nombresCortos(pdf, aj.valor);
  const pref = (l, n) => ({ ...l, etiqueta: `${n} · ${l.etiqueta}` });
  const lineas1 = V1.lineas.map((l) => (l === propio[0] ? { ...l, M: r6(Math.sign(l.M) * (Math.abs(l.M) - T)), origen: `${l.origen}; menos la transferencia al otro documento (${r6(T)}, ajuste suma-con)` } : l)).filter((l) => l.M !== 0).map((l) => pref(l, nom.propio));
  const marca = (l, doc) => ({ ...l, origen: `${l.origen} [${doc}]` });
  const V = {
    ...V1,
    lineas: [...lineas1, ...sinEspejo.map((l) => pref(marca(l, 'otra entidad'), nom.otra))],
    financiero: [...V1.financiero.map((l) => pref(l, nom.propio)), ...V2.financiero.map((l) => pref(marca({ ...l, origen: l.origen || 'financiero' }, 'otra entidad'), nom.otra))], // el impuesto no lleva prefijo: así está publicado
    impuesto: [...V1.impuesto, ...V2.impuesto.map((l) => marca({ ...l, origen: l.origen || 'impuesto' }, 'otra entidad'))],
    totales: {
      ...V1.totales,
      ingresos: r6(V1.totales.ingresos + V2.totales.ingresos - T), gastos: r6(V1.totales.gastos + V2.totales.gastos - T),
      financiero: r6((V1.totales.financiero || 0) + (V2.totales.financiero || 0)), impuesto: r6((V1.totales.impuesto || 0) + (V2.totales.impuesto || 0)),
      resultadoImpreso: r6(V1.totales.resultadoImpreso + V2.totales.resultadoImpreso),
      resultadoParaCargar: r6((V1.totales.resultadoParaCargar ?? V1.totales.resultadoImpreso) + (V2.totales.resultadoParaCargar ?? V2.totales.resultadoImpreso)),
      resultadoFinal: null,
    },
    notas: [...(V1.notas || []), `suma de dos entidades: ${V2.md} se suma a este documento; la transferencia «${aj.etiquetaOtra}» (${r6(T)}) se saca de los ingresos y se resta de «${aj.etiqueta}»`],
  };
  // El financiero y el impuesto salen de los renglones con su signo (totales.financiero depende de la lectura de signos de cada documento).
  const F = V.financiero.reduce((t, l) => t + l.M, 0); const X = V.impuesto.reduce((t, l) => t + l.M, 0);
  const cierra = [X, -X].map((x) => V.totales.ingresos - V.totales.gastos + F + x);
  if (!cierra.some((c) => Math.abs(c - V.totales.resultadoParaCargar) <= 1e-5)) return err(`los totales combinados no cierran con la suma de los dos resultados impresos (${r6(cierra[0])} contra ${r6(V.totales.resultadoParaCargar)})`);
  const nota = `Suma de dos entidades que no consolidan: ${V1.md.split('/').pop().replace(/\.md$/, '')} y ${V2.md.split('/').pop().replace(/\.md$/, '')}. La primera no imprime la transferencia a la segunda como renglón: el importe (${String(r6(T)).replace('.', ',')} millones) sale del ingreso «${aj.etiquetaOtra}» de la segunda y se resta de «${aj.etiqueta}» de la primera (evidencia: ${String(aj.evidencia).trim()}); el resultado es la suma de los dos resultados impresos.`;
  return { V, T, nota, otra: { pdf: aj.valor, md: V2.md, categorias: A.categorias, verificacion: V2 } };
}

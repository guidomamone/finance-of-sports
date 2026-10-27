// tools/siis-caja-deuda.mjs — caja y deuda de un club colombiano desde el balance de SIIS (siis-estado-AAAA.json, bloque siis_sitfinan). Lo llama caja-deuda.mjs (completarClub) antes de leer ningún documento.
// POR QUÉ. El balance de SIIS es el estado primario oficial de un club colombiano (Admin/paises/co.md) y trae el efectivo y los pasivos financieros ya separados: no hay filas que elegir ni escala que adivinar
// (mismo lugar que `rusiaDeCodigos`: el balance del fisco con sus códigos). Cargar un club desde SIIS dejaba caja y deuda en null en casi todos los años.
// CRITERIO (precedente: América de Cali 2025 y Unión Magdalena 2018, cargados desde las notas, dan exactamente esto). Caja = «Efectivo y equivalentes al efectivo». Deuda = «Otros pasivos financieros»
// corrientes + no corrientes: «Préstamos corrientes» y «Parte corriente de préstamos no corrientes» son partes de los corrientes y NO se suman (América de Cali 2025: 71,2 + 4.684,6 = 4.755,8). Valores en miles de pesos.
// COMPUERTA. El balance cuadra (activo total = pasivo total + patrimonio total, a 1 mil). Con el año siguiente de SIIS a mano, su columna «corteAnterior» tiene que repetir el «corte» de este año: si no, hubo
// reexpresión y no decide. Un rubro vacío NO es 0: sin efectivo o sin ningún pasivo financiero reportado queda null («sin dato no es cero»). Deuda dudosa (préstamos con «Otros pasivos financieros corrientes» vacío) no decide.
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const r6 = (x) => Math.round(x * 1e6) / 1e6;
const num = (o, k) => (o?.[k] != null && Number.isFinite(Number(o[k])) ? Number(o[k]) : null);
const cfg = () => JSON.parse(readFileSync(resolve(ROOT, 'tools/siis-clubes.json'), 'utf8'));

function balance(carpeta, anio) {
  const f = resolve(ROOT, 'Clubes', cfg().pais, carpeta, `siis-estado-${anio}.json`);
  if (!existsSync(f)) return null;
  try { return JSON.parse(readFileSync(f, 'utf8')).siis_sitfinan?.resultado || null; } catch { return null; }
}
// lo que el balance dice de un cierre: col 'Corte' (el año) o 'Anterior' (la comparativa)
function lecturas(b, col) {
  const k = col === 'Corte' ? 'corte' : 'corteAnterior'; const t = col === 'Corte' ? 'valorCorte' : 'valorAnterior';
  const pc = b.pasivos?.Corrientes?.registros || {}; const pn = b.pasivos?.noCorrientes?.registros || {};
  return {
    activo: num(b.activos?.activoTotal, t), pasivo: num(b.pasivos?.pasivoTotal, t), patrimonio: num(b.patrimonio?.patrimonioTotal, t),
    caja: num(b.activos?.corrientes?.registros?.efectivoEquivalentes, k),
    ofc: num(pc.otrosPasivosFinancierosCorrientes, k), ofn: num(pn.otrosPasivosFinancierosNoCorrientes, k),
    prestamos: [num(pc.prestamosCorrientes, k), num(pc.ptCorrientePrestamoNoCorriente, k)].some((x) => x != null),
  };
}

// Devuelve { grossDebt, cash } con la forma de rusiaDeCodigos ({ valor, escalon, validacion, como, filas }), o null si el club no es de SIIS o el año no tiene balance de SIIS.
export function siisDeBalance(clubId, a) {
  const c = cfg(); const carpeta = Object.keys(c.clubes).find((k) => c.clubes[k].clubId === clubId); if (!carpeta) return null;
  const b = balance(carpeta, a.anio); if (!b) return null;
  const x = lecturas(b, 'Corte'); const base = { escalon: 'S', filas: [] }; const out = {};
  const cuadra = x.activo != null && x.pasivo != null && x.patrimonio != null && Math.abs(x.activo - x.pasivo - x.patrimonio) <= 1;
  const no = (cual, como) => { out[cual] = { ...base, valor: null, como: `SIIS: ${como}` }; };
  if (!cuadra) { no('cash', 'el balance no cuadra (activo ≠ pasivo + patrimonio)'); no('grossDebt', 'el balance no cuadra (activo ≠ pasivo + patrimonio)'); return out; }
  // el año siguiente de SIIS: su comparativa repite el cierre de este (si difiere, el siguiente lo reexpresó y no se sabe cuál vale)
  const sig = balance(carpeta, a.anio + 1); const s = sig ? lecturas(sig, 'Anterior') : null;
  const contradice = (cual) => (s && s[cual] != null && x[cual] != null && Math.abs(s[cual] - x[cual]) > Math.max(1, 0.001 * Math.abs(x[cual])));
  const val = s ? 'balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide' : 'balance de SIIS cuadra';
  const cita = (txt) => `balance de SIIS (siis-estado-${a.anio}.json, miles de COP): ${txt}`;
  if (x.caja == null) no('cash', 'sin «Efectivo y equivalentes al efectivo» (vacío no es 0)');
  else if (contradice('caja')) no('cash', `la comparativa del año siguiente de SIIS (${s.caja}) no repite este efectivo (${x.caja}): reexpresión`);
  else out.cash = { ...base, valor: r6(x.caja / 1000), validacion: val, como: cita(`efectivo y equivalentes = ${x.caja}`) };
  if (x.ofc == null && x.ofn == null) no('grossDebt', x.prestamos ? 'préstamos sin «Otros pasivos financieros» (criterio dudoso)' : 'ningún pasivo financiero reportado (vacío no es 0)');
  else if (x.ofc == null && x.prestamos) no('grossDebt', 'préstamos corrientes sin «Otros pasivos financieros corrientes» (criterio dudoso)');
  else if (contradice('ofc') || contradice('ofn')) no('grossDebt', 'la comparativa del año siguiente de SIIS no repite estos pasivos financieros: reexpresión');
  else out.grossDebt = { ...base, valor: r6(((x.ofc || 0) + (x.ofn || 0)) / 1000), validacion: val, como: cita(`otros pasivos financieros corrientes ${x.ofc ?? 'vacío'} + no corrientes ${x.ofn ?? 'vacío'}`) };
  return out;
}

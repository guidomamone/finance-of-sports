#!/usr/bin/env node
// ============================================================================
// tools/extraer-etiquetas.mjs — ESCALÓN 0 DE EXTRAER: las cifras que ya vienen etiquetadas en el informe XHTML (iXBRL) no se pagan con IA (to-do 356; regla de Guido: lo estructurado no se paga con IA;
// diseño aprobado por la Auditora 5 con tres condiciones). HOY ES SOLO ENSAYO/BACKTEST: no está enganchado a localizar.mjs ni a extraer.mjs (ver «Qué queda» en Admin/Archive/sesion-pipeline-2026-10-21.md).
//
// QUÉ HACE. Para un ejercicio (cierre + perímetro cargado), toma los hechos iXBRL del periodo (sin ejes si el perímetro es individual; con el único eje de grupo consolidado si es consolidado: la regla de
// tools/ixbrl-resultado.mjs) cuyo concepto es del estado de resultados (no flujo de caja, balance ni patrimonio) y los ofrece como filas {concepto, importe}. Una cifra se LIGA por etiqueta solo si UN solo concepto
// tiene ese importe en el periodo; con dos conceptos distintos con el mismo importe (pasa con los repetidos y los ceros) NO se liga: va a la IA como residuo (condición (b) de la Auditora). La regla de suma
// (una cifra sin etiqueta que es la suma de las de su bloque es un subtotal y no necesita IA) solo clasifica un subtotal: no crea líneas.
//
// BACKTEST (condición (a) de la Auditora): con --backtest, para los 6 años cargados que tienen XHTML del mismo cierre, cada línea CARGADA (revenue / expenses del JSON del club) se busca entre los hechos del
// periodo por importe; si se liga por etiqueta se compara el LADO (el concepto dice ingreso o gasto) y el signo cargado (ingreso +, gasto −) contra lo cargado. Una diferencia = el escalón NO entra (hay que
// mandarla a la Auditora con la línea). Las líneas sin hecho son residuo de IA, no diferencias.
//
// USO:  node tools/extraer-etiquetas.mjs --backtest
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { hechos, sinEjes, grupo, leerXhtmlTexto } from './ixbrl-resultado.mjs';

const ROOT = resolve(import.meta.dirname, '..');
// Conceptos que NO son del estado de resultados (un importe igual por casualidad no es la misma cifra: Silkeborg, un flujo de caja contra un ingreso de 5,8 M)
const NO_RESULTADO = /CashFlow|Equity|Assets?\b|Liabilit|Creditors|Debtors|Reserve|Provision|Borrowings|Receivable|Payable(?!.*Interest)|Shares|Dividends?Paid|Inventor|Goodwill|PropertyPlantEquipment(?!.*Depreciation)|IntangibleAssets(?!.*Amortisation)|Increase|Decrease|Additions|Disposals|Cost(?:Gross|Valuation)|NetBookValue|AccumulatedDepreciation/i;
const INGRESO = /Revenue|Turnover|Income|Gain|Grants?|Receipts|Sales(?!.*Cost)|Fees?Received/i;
// lado que dice el CONCEPTO (null = no lo dice: subtotal, resultado o ambiguo)
export function ladoDelConcepto(n) {
  if (/^(ProfitLoss|GrossProfitLoss|OperatingProfitLoss|ProfitLossBeforeTax|ProfitLossOnOrdinaryActivitiesBeforeTax|ProfitLossFromOrdinaryActivities|ComprehensiveIncomeExpense|ProfitLossBeforeTaxation)/.test(n) || /ProfitLoss|Profit(?!able)|ComprehensiveIncome/.test(n)) return null;
  if (INGRESO.test(n) && !/Expense|Cost|Loss/.test(n)) return 'ingreso';
  if (/Expense|Cost|Wages|Salar|Staff|Depreciation|Amortisation|Impairment|Remuneration|Pension|SocialSecurity|Rent|Interest.*Payable|Tax/i.test(n)) return 'gasto';
  return null;
}
export function hechosDeResultado(src, cierre, perimetro) {
  const per = String(perimetro || '').toLowerCase(); if (per !== 'consolidado' && per !== 'individual') return { error: `perímetro desconocido (${perimetro || 'sin dato'})`, hechos: [] };
  const hs = hechos(src, null, cierre, per === 'consolidado' ? grupo : sinEjes).filter((h) => !h.ilegible && h.n && !NO_RESULTADO.test(h.n) && Number.isFinite(h.valor) && h.valor !== 0);
  return { hechos: hs };
}
// ¿hay UN solo concepto con este importe (en unidades de la moneda)? -> { estado: 'ligada', concepto } | { estado: 'residuo', porque: 'sin-hecho' | 'varios-conceptos' }
export function ligar(hs, importeAbs, tol = 0.5) {
  const c = hs.filter((h) => Math.abs(Math.abs(h.valor) - importeAbs) <= tol); const conceptos = [...new Set(c.map((h) => h.n))];
  if (!c.length) return { estado: 'residuo', porque: 'sin-hecho' };
  if (conceptos.length > 1) return { estado: 'residuo', porque: 'varios-conceptos', conceptos };
  return { estado: 'ligada', concepto: conceptos[0] };
}

if (import.meta.url === `file://${process.argv[1]}` && process.argv.includes('--backtest')) {
  const MAIN = resolve(ROOT, '..', 'finance-of-sports'); const base = (p) => (existsSync(resolve(ROOT, p)) ? resolve(ROOT, p) : resolve(MAIN, p));
  const casos = [
    ['data/dk/sonderjyske-dk.json', 2024, 'Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.xhtml', '2024-09-30', 'individual'],
    ['data/dk/viborg-dk.json', 2025, 'Clubes/Dinamarca/Viborg FF/aarsrapport-2025-06-30.xhtml', '2025-06-30', 'individual'],
    ['data/dk/silkeborg-dk.json', 2025, 'Clubes/Dinamarca/Silkeborg IF/aarsrapport-2025-12-31.xhtml', '2025-12-31', 'individual'],
    ['data/gb/nottinghamforest-gb.json', 2025, 'Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.xhtml', '2025-06-30', 'individual'],
    ['data/gb/burnley-gb.json', 2025, 'Clubes/Inglaterra/Burnley/burnley-fc-holdings-group-accounts-2024-25.xhtml', '2025-07-31', 'consolidado'],
    ['data/gb/bathrugby-gb.json', 2025, 'Clubes/Inglaterra/Bath Rugby/bath-rugby-medium-company-accounts-2024-25.xhtml', '2025-06-30', 'individual'],
  ];
  let ligadas = 0, residuo = 0, dif = 0, total = 0;
  for (const [json, anio, xh, cierre, perimetro] of casos) {
    const j = JSON.parse(readFileSync(resolve(ROOT, json), 'utf8')); const y = (j.years || []).find((q) => q.fiscal_year === anio); const escala = (j.unit && j.unit.scale) || 1e6;
    if (!y) { console.log(`${json} ${anio}: no está cargado`); continue; }
    const { hechos: hs, error } = hechosDeResultado(leerXhtmlTexto(base(xh)), cierre, perimetro); if (error) { console.log(`${json}: ${error}`); continue; }
    let l = 0, r = 0, d = 0; const notas = [];
    for (const [lado, ln] of [...(y.revenue || []).map((x) => ['ingreso', x]), ...(y.expenses || []).map((x) => ['gasto', x])]) {
      total++; const g = ligar(hs, Math.abs(ln.amount) * escala);
      if (g.estado === 'residuo') { r++; residuo++; continue; }
      l++; ligadas++; const ladoC = ladoDelConcepto(g.concepto); const signoOk = lado === 'ingreso' ? ln.amount > 0 : ln.amount < 0;
      if ((ladoC && ladoC !== lado) || !signoOk) { d++; dif++; notas.push(`${ln.label.slice(0, 40)} ${ln.amount} (${lado}) ↔ ${g.concepto} (${ladoC || 'sin lado'})`); }
    }
    console.log(`${json.split('/').pop()} ${anio}: líneas cargadas ${l + r} · ligadas por etiqueta ${l} · a IA (residuo) ${r} · DIFERENCIAS de lado o signo ${d}${notas.length ? ' → ' + notas.join(' | ') : ''}`);
  }
  console.log(`\nTOTAL: ${total} líneas cargadas · ligadas ${ligadas} · residuo de IA ${residuo} · diferencias ${dif}${dif ? ' (EL ESCALÓN NO ENTRA: mandarlas a la Auditora con la línea)' : ' (condición (a): 0 diferencias)'}`);
}

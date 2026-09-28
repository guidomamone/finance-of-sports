#!/usr/bin/env node
// ============================================================================
// tools/sum-check.mjs — pedido de Guido (2026-09-28, mismo espíritu del to-do
// 98): la ARITMÉTICA de verificar que un grupo de rubros suma el total
// impreso de un documento es mecánica, no juicio — sacarla de Claude, que
// haga la suma un script en vez de sumar a mano en el razonamiento. Lo que
// SIGUE siendo de Claude: decidir QUÉ filas entran en la suma (cuáles son
// subtotales de otras, cuáles son hojas) — eso no es mecanizable, el bold de
// Mistral para marcar subtotales salió inconsistente en la práctica (Once
// Caldas 2024: a veces bold en la columna 2023, no en la 2024, sin patrón
// fijo), así que un script no puede inferirlo solo con confianza.
//
// Acepta números con separador de miles "," o "." (mismo criterio de
// auto-detección que tools/extract-table-rows.mjs) y negativos entre
// paréntesis "(1.234)" o con signo "-1234".
//
// USO:
//   node tools/sum-check.mjs 12037298 9214593 2822704
//   node tools/sum-check.mjs "12,037,298" "9,214,593" --target "26,814,332"
//   echo "12037298
//   9214593" | node tools/sum-check.mjs --stdin --target 26814332
// ============================================================================

import { readFileSync } from 'node:fs';

function parseNumber(raw) {
  let s = String(raw).trim();
  let negative = false;
  if (/^\(.*\)$/.test(s)) { negative = true; s = s.slice(1, -1); }
  if (s.startsWith('-')) { negative = true; s = s.slice(1); }
  // Si tiene los 2 separadores, el ÚLTIMO que aparece es el decimal.
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma !== -1 && lastDot !== -1) {
    if (lastComma > lastDot) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
  } else if (lastComma !== -1) {
    // Solo coma: miles si hay 3 dígitos después de la ÚLTIMA coma Y más de un grupo, si no, decimal.
    s = /,\d{3}$/.test(s) && (s.match(/,/g) || []).length > 0 && s.replace(/,/g, '').length - s.replace(/[,.]/g, '').length >= 0 && /,\d{3}(,|$)/.test(s.slice(s.indexOf(',')))
      ? s.replace(/,/g, '')
      : s.replace(',', '.');
    // Heurística simple y explícita: 1 sola coma seguida de exactamente 3 dígitos al final -> miles.
    if (/,\d{3}$/.test(String(raw).trim().replace(/^\(|\)$/g, '').replace(/^-/, ''))) {
      s = String(raw).trim().replace(/^\(|\)$/g, '').replace(/^-/, '').replace(/,/g, '');
    }
  } else if (lastDot !== -1) {
    if (/\.\d{3}$/.test(s) && (s.match(/\./g) || []).length >= 1 && s.replace(/\./g, '').length > 3) {
      s = s.replace(/\./g, '');
    }
  }
  const n = parseFloat(s);
  if (Number.isNaN(n)) throw new Error(`No pude parsear "${raw}" como número.`);
  return negative ? -n : n;
}

function main() {
  const args = process.argv.slice(2);
  const targetFlag = args.indexOf('--target');
  const target = targetFlag >= 0 ? parseNumber(args[targetFlag + 1]) : null;
  const useStdin = args.includes('--stdin');

  let values = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--target');
  if (useStdin) {
    const stdin = readFileSync(0, 'utf8');
    values = values.concat(stdin.split(/\r?\n/).map((l) => l.trim()).filter(Boolean));
  }

  if (!values.length) {
    console.error('Uso: node tools/sum-check.mjs <num1> <num2> ... [--target <total>] [--stdin]');
    process.exit(1);
  }

  const parsed = values.map((v) => ({ raw: v, value: parseNumber(v) }));
  const sum = parsed.reduce((acc, p) => acc + p.value, 0);

  parsed.forEach((p) => console.log(`  ${p.raw.padStart(18)} = ${p.value}`));
  console.log(`\nSuma de ${parsed.length} valores: ${sum}`);

  if (target !== null) {
    const diff = sum - target;
    const pct = target !== 0 ? Math.abs(diff / target) * 100 : 0;
    if (Math.abs(diff) < 0.005) {
      console.log(`Target: ${target} -- CIERRA EXACTO.`);
    } else {
      console.log(`Target: ${target} -- NO CIERRA. Diferencia: ${diff} (${pct.toFixed(4)}%)`);
    }
  }
}

main();

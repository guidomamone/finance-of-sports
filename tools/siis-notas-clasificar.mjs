// tools/siis-notas-clasificar.mjs — de cada club-año de SIIS, qué rubros abren las notas del club y, de los que no, por qué (punto 465 (5), el 3.0b del 463). Gratis, sin red, solo lee.
// Lee el `siis-estado-AAAA.json` ya bajado y el `estados-financieros-AAAA.md` de la misma carpeta y corre `abrirConNotas` de siis-notas.mjs (la misma que usa siis-estado.mjs).
// Cada rubro que no abre cae en una de cuatro causas:
//   sin nota            el club no trae `estados-financieros-AAAA.md` de ese año, o sus notas no tienen una sola tabla con cifras
//   casi suma           hay una tabla que se queda a menos de 0,1 % del rubro pero no suma (se dice en cuánto difiere, en miles de pesos)
//   ninguna se acerca   hay notas con tablas y ninguna suma ni se acerca (o el club no abre ese rubro)
//   estructura          dos tablas suman, rótulos de ventas y administración intercambiados, o la tabla ya abre otro rubro
// USO: node tools/siis-notas-clasificar.mjs ["<Club>"]   sin nombre, todos los de tools/siis-clubes.json
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { abrirConNotas, tablasDe, numeroDeNota } from './siis-notas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const cfg = JSON.parse(readFileSync(join(ROOT, 'tools/siis-clubes.json'), 'utf8'));
const num = (v) => (typeof v === 'number' ? v : null);
const causaDe = (motivo) => /la más cercana/.test(motivo) ? `casi suma (difiere ${Number(motivo.match(/difiere en ([\d.]+)/)?.[1]).toLocaleString('es-AR')} miles de pesos)` : /^ninguna tabla/.test(motivo) ? 'ninguna se acerca' : 'estructura';
const club = process.argv.slice(2).find((a) => !a.startsWith('--'));
const porCausa = {}; let abren = 0;
for (const k of Object.keys(cfg.clubes).filter((c) => !club || c === club)) {
  const dir = join(ROOT, 'Clubes', cfg.pais, k); const filas = [];
  for (let a = 2016; a <= 2025; a++) {
    const js = join(dir, `siis-estado-${a}.json`); if (!existsSync(js)) continue;
    const res = JSON.parse(readFileSync(js, 'utf8')).siis_resultadointegral; if (!res) continue;
    const notas = join(dir, `estados-financieros-${a}.md`); const md = existsSync(notas) ? readFileSync(notas, 'utf8') : null;
    const conTablas = md && tablasDe(md).some((t) => t.filas.filter((f) => f.celdas.some((c) => numeroDeNota(c) != null)).length >= 2);
    const valores = Object.fromEntries(Object.entries(res.resultado.registros).map(([c, v]) => [c, { corte: num(v?.corte), anterior: num(v?.corteAnterior) }]));
    const { abiertos, sinAbrir } = md ? abrirConNotas({ notasMd: md, valores }) : { abiertos: [], sinAbrir: Object.entries(valores).filter(([, v]) => v.corte).map(([c]) => ({ clave: c })).filter((x) => ['ingresosActividadesOrdinarias', 'costoVentas', 'gastosVentas', 'gastosAdministracion', 'otrosIngresos', 'otrosGastos'].includes(x.clave)) };
    const sin = sinAbrir.map((s) => ({ clave: s.clave, causa: !md || !conTablas ? 'sin nota' : causaDe(s.motivo) }));
    abren += abiertos.length; for (const s of sin) { const g = s.causa.replace(/ \(.*/, ''); porCausa[g] = (porCausa[g] || 0) + 1; }
    filas.push(`  ${a}  abre: ${abiertos.map((x) => x.clave).join(', ') || '-'}${sin.length ? `  · no abre: ${sin.map((s) => `${s.clave} [${s.causa}]`).join('; ')}` : ''}`);
  }
  if (filas.length) console.log(`${k}\n${filas.join('\n')}`);
}
console.log(`\nrubros que abren: ${abren} · no abren: ${Object.entries(porCausa).map(([c, n]) => `${c} ${n}`).join(' · ') || 0}`);

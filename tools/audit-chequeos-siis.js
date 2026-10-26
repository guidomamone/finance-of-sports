// tools/audit-chequeos-siis.js — checkSiisControl, checkSiisFaltante: lo cargado de un país con SIIS (Supersociedades) contra SIIS, y los años de SIIS que todavía no se bajaron (punto 463).
// Sin red: leen el resumen que genera `node tools/siis-estado.mjs --inventario --escribir` (Admin/sourcing/<País>/siis-resumen.json) y tools/siis-clubes.json. Avisos P3: no frenan nada.

const { ROOT, add, fs, path } = require('./audit-base.js');

const leer = (rel) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')); } catch { return null; } };
function contexto() {
  const cfg = leer('tools/siis-clubes.json'); if (!cfg) return null;
  const resumen = leer(`Admin/sourcing/${cfg.pais}/siis-resumen.json`); if (!resumen) return null;
  return { cfg, resumen };
}
const mill = (pesos) => `${(pesos / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 })} M`;

// siis-control: el resultado y los ingresos cargados contra los de SIIS en cada año. El resultado tiene que coincidir (tolerancia de redondeo); los ingresos cargados no pueden ser MENOS que
// los ingresos ordinarios de SIIS (pueden ser más: el total cargado suma otros ingresos que SIIS cuenta aparte). Un caso ya revisado se silencia con tools/silenciar.mjs.
function checkSiisControl() {
  const c = contexto(); if (!c) return;
  let comparados = 0;
  for (const e of Object.values(c.cfg.clubes)) {
    if (!e.clubId) continue;
    const j = leer(`data/${e.clubId.split('-').pop()}/${e.clubId}.json`);
    if (!j || j.club?.reporting_currency !== c.cfg.moneda) continue;
    const escala = j.unit?.scale || 1;
    for (const y of j.years || []) {
      const t = y.official_totals; const s = c.resumen.nits[e.nit]?.anios?.[String(y.fiscal_year)];
      if (!t || !s) continue;
      comparados++;
      if (t.net_result != null && s.utilidades != null) {
        const cargado = t.net_result * escala, siis = s.utilidades * 1000;
        if (Math.abs(cargado - siis) > Math.max(2e3, 0.0005 * Math.abs(siis))) add('P3', 'siis-control', `${e.clubId} ${y.fiscal_year}: resultado cargado ${mill(cargado)} contra ${mill(siis)} en SIIS (${c.cfg.moneda}); mirar el documento y, si SIIS está bien, corregir con un ajuste`);
      }
      if (t.revenue != null && s.ingresos != null && t.revenue * escala < s.ingresos * 1000 * 0.999) add('P3', 'siis-control', `${e.clubId} ${y.fiscal_year}: ingresos cargados ${mill(t.revenue * escala)} son menos que los ingresos ordinarios de SIIS (${mill(s.ingresos * 1000)}); falta algún ingreso`);
    }
  }
  if (!comparados) add('P3', 'siis-control', 'no se pudo comparar ningún club-año con SIIS: revisá tools/siis-clubes.json (clubId) y Admin/sourcing/<País>/siis-resumen.json');
}

// siis-faltante: años que SIIS tiene (con estado de resultados) y la carpeta del club no tiene como siis-estado-AAAA.md, sin contar los frenados (tools/siis-clubes.json). Un solo aviso con el total:
// el detalle por club está en Admin/sourcing/<País>/siis-inventario.md. Y si el resumen tiene más de 120 días, hay que volver a generarlo (SIIS publica cada año).
function checkSiisFaltante() {
  const c = contexto(); if (!c) return;
  const porClub = [];
  for (const [carpeta, e] of Object.entries(c.cfg.clubes)) {
    const frenados = new Set(e.frenados || []);
    const dir = path.join(ROOT, 'Clubes', c.cfg.pais, carpeta);
    const faltan = Object.entries(c.resumen.nits[e.nit]?.anios || {}).filter(([a, d]) => d.estado && !frenados.has(a) && !fs.existsSync(path.join(dir, `siis-estado-${a}.md`))).map(([a]) => a);
    if (faltan.length) porClub.push([carpeta, faltan]);
  }
  const total = porClub.reduce((n, [, f]) => n + f.length, 0);
  if (total) add('P3', 'siis-faltante', `${total} club-año(s) de ${c.cfg.pais} que SIIS tiene y no están bajados, en ${porClub.length} club(es) (Admin/sourcing/${c.cfg.pais}/siis-inventario.md): ${porClub.slice(0, 4).map(([k, f]) => `${k} ${f.length}`).join(', ')}…`);
  const dias = (Date.now() - new Date(c.resumen.generado).getTime()) / 86400000;
  if (dias > 120) add('P3', 'siis-resumen-viejo', `el resumen de SIIS es del ${c.resumen.generado} (${Math.round(dias)} días): volvé a generarlo con node tools/siis-estado.mjs --inventario --escribir`);
}

module.exports = { checkSiisControl, checkSiisFaltante };

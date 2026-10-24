// tools/audit-base.js — lo que comparten los chequeos de tools/audit.js (los requires, la raíz, `add` y los hallazgos, las constantes y los ayudantes). Mudado de audit.js sin cambiar una línea;
// audit.js y audit-chequeos-N.js lo requieren (Node lo evalúa una sola vez: `findings` y `silenciados` son los mismos para todos).

const fs = require('fs');
const path = require('path');
const { archivosData, idDeArchivo, rutaData } = require('./data-clubes.js');
const { execFileSync } = require('child_process');
const vm = require('vm');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ARGS = process.argv.slice(2);
const JSON_OUT = ARGS.includes('--json');
const QUIET = ARGS.includes('--quiet');

const IGNORE_FILE = path.join(ROOT, 'tools/audit-ignore.json');
const IGNORADOS = fs.existsSync(IGNORE_FILE) ? JSON.parse(fs.readFileSync(IGNORE_FILE, 'utf8')) : [];

// ---------------------------------------------------------------------------
// 2. HALLAZGOS
// ---------------------------------------------------------------------------
const findings = [];
const silenciados = [];
const reglasUsadas = new Set();
const add = (sev, code, msg) => {
  const regla = IGNORADOS.find(i => i.code === code && msg.includes(i.match));
  if (regla) reglasUsadas.add(regla);
  (regla ? silenciados : findings).push({ sev, code, msg, ...(regla ? { motivo: regla.motivo } : {}) });
};

const REPORT_TYPES_REALES = ['official_balance_sheet', 'official_budget', 'official_budget_and_balance', 'unofficial_mirror'];
function* clubYears(api) {
  for (const clubId of Object.keys(api.generic).sort()) {
    const g = api.generic[clubId];
    const meta = g.fiscalYearMeta || {};
    for (const year of Object.keys(meta).map(Number).sort((a, b) => a - b)) {
      yield {
        clubId, year, ym: meta[year],
        rev: (g.revenueLinesByYear || {})[year] || [],
        exp: (g.expenseLinesByYear || {})[year] || [],
      };
    }
  }
}

const ref = (clubId, year) => `${clubId} ${year}`;
const sum = lines => lines.reduce((s, l) => s + (l.amountNative || 0), 0);

// ---------------------------------------------------------------------------
// 3. CHEQUEOS
// ---------------------------------------------------------------------------

// Los .md de .claude/skills/, a cualquier profundidad, con su ruta relativa a la raíz.
function mdsDeSkills() {
  const out = [];
  (function walk(d) {
    let entradas;
    try { entradas = fs.readdirSync(path.join(ROOT, d), { withFileTypes: true }); } catch { return; }
    for (const e of entradas) {
      const rel = `${d}/${e.name}`;
      if (e.isDirectory()) walk(rel); else if (e.name.endsWith('.md')) out.push(rel);
    }
  })('.claude/skills');
  return out.sort();
}

// PRUEBA DE DEPORTE: por cada deporte con taxonomía distinto del fútbol se arma EN MEMORIA un club de muestra (una línea por subcategoría de ingreso y de gasto) y se
// corren con él TODOS los chequeos. Nada de lo que la muestra provoque como P0 o P1 puede ser por el deporte: si pasa, es un chequeo con una lista o un id del fútbol fijo y sale como
// P1 `deporte-muestra`. Los P2 y P3 de la muestra (sin fuente, sin total oficial...) son ruido de ser sintético y no se publican. Cuando se cargue un club real de ese deporte
// (Bath Rugby), el mismo `node tools/audit.js` lo audita con la misma exigencia.
const MUESTRAS = [];

module.exports = { fs, path, archivosData, idDeArchivo, rutaData, execFileSync, vm, execSync, ROOT, ARGS, JSON_OUT, QUIET, IGNORE_FILE, IGNORADOS, findings, silenciados, reglasUsadas, add, REPORT_TYPES_REALES, clubYears, ref, sum, mdsDeSkills, MUESTRAS };

// tools/audit-chequeos-6.js — checkLigasNoCatalogadas, checkJsonClavesRepetidas, checkEstimadoRepetido: chequeos de datos de configuración y de estimados (partidos de audit-chequeos-2.js, que pasó los 40 KB)

const { ROOT, add, fs, path } = require('./audit-base.js');

// LIGAS QUE EL SITIO NO TIENE: un club-año en `liga-no-catalogada` (data/club-leagues/) dice en Admin/registros/ligas-no-catalogadas.jsonl qué liga es (id y nombre). Cuando 3 o más club-años
// son de la misma liga que no está en data/leagues.js, esa liga se abre (skill auditoria-finance-of-sports, sección 9): P3 `liga-por-abrir`, con el comando. Una fila sin registro: P3 `liga-no-catalogada-sin-registro`.
// `sin-competencia` (el club no jugó ninguna competencia oficial de mayores ese ejercicio, p. ej. su año de fundación) pide el mismo registro, pero no es una liga: nunca se «abre».
const UMBRAL_LIGA_POR_ABRIR = 3;
const SIN_COMPETENCIA = 'sin-competencia';
function checkLigasNoCatalogadas(api) {
  const f = path.join(ROOT, 'Admin', 'registros', 'ligas-no-catalogadas.jsonl');
  const reg = fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const registrados = new Set(reg.map((r) => `${r.club}|${r.anio}`));
  const sinRegistro = [];
  for (const [club, ys] of Object.entries(api.CLUB_LEAGUE_BY_YEAR || {})) for (const [y, liga] of Object.entries(ys)) if ((liga === 'liga-no-catalogada' || liga === SIN_COMPETENCIA) && !registrados.has(`${club}|${y}`)) sinRegistro.push(`${club} ${y}`);
  if (sinRegistro.length) add('P3', 'liga-no-catalogada-sin-registro', `${sinRegistro.length} club-año(s) en liga-no-catalogada o sin-competencia sin decir qué liga es o por qué no compitió (${sinRegistro.slice(0, 5).join(', ')}): una línea por club-año en Admin/registros/ligas-no-catalogadas.jsonl, con el id y el nombre de la liga (o «sin-competencia») y su fuente`);
  let catalogo = ''; try { catalogo = fs.readFileSync(path.join(ROOT, 'data', 'leagues.js'), 'utf8'); } catch { /* sin catálogo: no se cuenta */ }
  const porLiga = {};
  for (const r of reg) if (r.liga && r.liga !== SIN_COMPETENCIA && !new RegExp(`['"]${r.liga}['"]\\s*:`).test(catalogo)) (porLiga[r.liga] = porLiga[r.liga] || []).push(`${r.club} ${r.anio}`);
  for (const [liga, cs] of Object.entries(porLiga)) if (cs.length >= UMBRAL_LIGA_POR_ABRIR) add('P3', 'liga-por-abrir', `${liga}: ${cs.length} club-años en una liga que el sitio no tiene (${cs.slice(0, 5).join(', ')}): abrirla con node tools/catalogo-liga.mjs --liga ${liga} y asignarles la liga`);
}

// CLAVES REPETIDAS EN UN JSON DE CONFIGURACIÓN: JSON.parse se queda con la ÚLTIMA y la anterior se pierde sin aviso (un club cargado dos veces en tools/contexto-manual.json dejó sin efecto la entrada nueva). P2
// `json-clave-duplicada`, con la clave y la línea. Se miran los .json de tools/ y de tools/club-league-reference/ (los que se editan a mano; los de cada club los escribe una tool).
function clavesRepetidas(txt) {
  const dup = []; const pila = []; const n = txt.length; let i = 0; let linea = 1;
  while (i < n) {
    const c = txt[i];
    if (c === '\n') { linea++; i++; continue; }
    if (c === '"') {
      let j = i + 1; let s = '';
      while (j < n && txt[j] !== '"') { if (txt[j] === '\\') { s += txt[j] + txt[j + 1]; j += 2; } else { if (txt[j] === '\n') linea++; s += txt[j++]; } }
      i = j + 1;
      const top = pila[pila.length - 1];
      if (top && top.tipo === 'o' && top.esperaClave) { if (top.claves.has(s)) dup.push({ clave: s, linea }); top.claves.add(s); top.esperaClave = false; }
      continue;
    }
    if (c === '{') pila.push({ tipo: 'o', claves: new Set(), esperaClave: true });
    else if (c === '[') pila.push({ tipo: 'a' });
    else if (c === '}' || c === ']') pila.pop();
    else if (c === ',') { const top = pila[pila.length - 1]; if (top && top.tipo === 'o') top.esperaClave = true; }
    i++;
  }
  return dup;
}
function checkJsonClavesRepetidas() {
  const dirs = [path.join(ROOT, 'tools'), path.join(ROOT, 'tools', 'club-league-reference')];
  const hallados = [];
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json'))) {
      for (const r of clavesRepetidas(fs.readFileSync(path.join(d, f), 'utf8'))) hallados.push(`${path.relative(ROOT, path.join(d, f))} línea ${r.linea}: «${r.clave.slice(0, 40)}»`);
    }
  }
  if (hallados.length) add('P2', 'json-clave-duplicada', `${hallados.length} clave(s) repetida(s) en un mismo objeto (JSON.parse se queda con la última y pierde la anterior): ${hallados.slice(0, 5).join('; ')}${hallados.length > 5 ? ` y ${hallados.length - 5} más` : ''}`);
}

// UN CLUB-AÑO, UNA ESTIMACIÓN: data/estimados/<liga>.js no repite un club en el mismo año de una liga. Es independiente de estimar.mjs: si la tool misma repite (una lista con el nombre
// dos veces, dos temporadas que caen en el mismo ejercicio), su --check regenera igual y no lo ve. P1: Ligas mostraría al club dos veces y la liga sumaría de más.
function checkEstimadoRepetido() {
  const dir = path.join(ROOT, 'data', 'estimados');
  if (!fs.existsSync(dir)) return;
  const repetidos = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
    for (const ln of fs.readFileSync(path.join(dir, f), 'utf8').split('\n')) {
      const m = ln.match(/^\s*(\d{4}):\s*(\[.*\]),?\s*$/);
      if (!m) continue;
      let filas; try { filas = JSON.parse(m[2]); } catch { continue; }
      const vistos = new Map();
      for (const r of filas) { const k = r.id || r.n; vistos.set(k, (vistos.get(k) || 0) + 1); }
      for (const [k, n] of vistos) if (n > 1) repetidos.push(`${f.replace(/\.js$/, '')} ${m[1]} ${k} (${n} veces)`);
    }
  }
  if (repetidos.length) add('P1', 'estimado-repetido', `un club con más de una estimación en la misma liga-año: ${repetidos.slice(0, 8).join('; ')}${repetidos.length > 8 ? ` y ${repetidos.length - 8} más` : ''}`);
}

// GANANCIA EN INMOVILIZADO SIN MIRAR: una línea de «Otros ingresos» con rótulo de venta o ganancia de activos (Ganhos em imobilizações, Profit on disposal of fixed assets, Κέρδη … διάθεση μη
// κυκλοφορούντων…) que pesa el 5 % o más de los ingresos del ejercicio puede ser la venta de jugadores o de una filial (REGLA de Admin/CONVENCIONES-DATOS.md, «una ganancia en inmovilizado…»):
// se decide por el documento de cada año. P3 `ganancia-inmovilizado-sin-mirar` hasta que `node tools/recategorizar-linea.mjs` la mueva o la anote como `--mirada` en
// Admin/registros/recategorizaciones-linea.jsonl. El aviso general `catchall-dominante` solo salta desde el 40 %.
const RE_GANANCIA_ACTIVOS = /imobiliz|inmoviliz|immobili[sz]|disposal of (fixed|tangible|non|property|assets)|διάθεση μη κυκλοφορ|aliena[cç][aã]o de ativos|abgang von anlage|mais.?valia|plusvalen|gains? on (sale|disposal)/i;
const RE_GANANCIA_NO = /subven|subsid|incrementi|inventar|investimento|investment|perd[aã]o|descuento|imputaci/i;
const UMBRAL_GANANCIA_ACTIVOS = 0.05;
function checkGananciaInmovilizadoSinMirar() {
  const f = path.join(ROOT, 'Admin', 'registros', 'recategorizaciones-linea.jsonl');
  const vistas = new Set(fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => { try { const r = JSON.parse(l); return `${r.club}|${r.anio}|${r.etiqueta}`; } catch { return null; } }) : []);
  const pendientes = [];
  const dataDir = path.join(ROOT, 'data');
  for (const pais of fs.readdirSync(dataDir)) {
    const dir = path.join(dataDir, pais);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const fn of fs.readdirSync(dir).filter((x) => x.endsWith('.json') && !x.includes('glosas'))) {
      let j; try { j = JSON.parse(fs.readFileSync(path.join(dir, fn), 'utf8')); } catch { continue; }
      const id = j.club && j.club.id; if (!id || !Array.isArray(j.years)) continue;
      for (const y of j.years) {
        const rev = y.revenue || []; const tot = (y.official_totals && y.official_totals.revenue) || rev.reduce((s, l) => s + (l.amount || 0), 0);
        if (!(tot > 0)) continue;
        for (const l of rev) {
          if (l.subcategory !== 'other_income' || !l.label || !RE_GANANCIA_ACTIVOS.test(l.label) || RE_GANANCIA_NO.test(l.label)) continue;
          if (l.amount / tot < UMBRAL_GANANCIA_ACTIVOS || vistas.has(`${id}|${y.fiscal_year}|${l.label}`)) continue;
          pendientes.push(`${id} ${y.fiscal_year} «${l.label.slice(0, 40)}» ${Math.round(100 * l.amount / tot)} %`);
        }
      }
    }
  }
  if (pendientes.length) add('P3', 'ganancia-inmovilizado-sin-mirar', `${pendientes.length} línea(s) de «Otros ingresos» con rótulo de ganancia de activos y el 5 % o más de los ingresos, sin decidir si son venta de jugadores, de una filial o nada de eso (${pendientes.slice(0, 6).join('; ')}${pendientes.length > 6 ? ` y ${pendientes.length - 6} más` : ''})`);
}

// LOS NIVELES P0 A P4 DICEN LO MISMO EN EL CÓDIGO Y EN LA SKILL: la tabla de la sección 2 de la skill auditoria-finance-of-sports repite la frase de SEV_TITULO (audit.js).
// `severidades-desfasadas` (P3) salta si falta un nivel o si una frase cambió en un lado y no en el otro.
function checkSeveridadesDesfasadas(sevTitulo) {
  const f = path.join(ROOT, '.claude', 'skills', 'auditoria-finance-of-sports', 'SKILL.md');
  if (!fs.existsSync(f)) return;
  const enSkill = {};
  for (const ln of fs.readFileSync(f, 'utf8').split('\n')) { const m = /^\|\s*\*\*(P\d)\*\*\s*\|\s*([^|]+?)\s*\|/.exec(ln); if (m) enSkill[m[1]] = m[2]; }
  const difieren = Object.entries(sevTitulo).filter(([n, t]) => enSkill[n] !== t.replace(/^P\d — /, '')).map(([n]) => n);
  if (difieren.length) add('P3', 'severidades-desfasadas', `la tabla de severidades de la skill auditoria-finance-of-sports (sección 2) no dice lo mismo que SEV_TITULO de tools/audit.js en ${difieren.join(', ')}`);
}

module.exports = { checkLigasNoCatalogadas, checkJsonClavesRepetidas, checkEstimadoRepetido, checkSeveridadesDesfasadas, checkGananciaInmovilizadoSinMirar };

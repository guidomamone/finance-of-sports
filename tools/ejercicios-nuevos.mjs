#!/usr/bin/env node
// ============================================================================
// tools/ejercicios-nuevos.mjs — LA REVISIÓN MENSUAL DE EJERCICIOS NUEVOS (to-do 252; pedido de Guido: mensual, que baje el PDF a Clubes/).
//
// POR QUÉ. Los clubes publican una vez por año, casi todos entre septiembre y diciembre. Esto mira, para cada club cargado, si ya salió el
// ejercicio que sigue al último cargado, y si salió baja el PDF a su carpeta de Clubes/ y deja el link en Admin/sourcing/README.md (sección
// "Ejercicios nuevos (tarea mensual)"), que es donde Guido deja los documentos que todavía no se cargaron.
//
// CÓMO, para cada club cargado:
//   1. el ejercicio que sigue al último real cargado (sin presupuestos) y si ya debería estar publicado: su cierre + MESES_PUBLICACION;
//   2. la carpeta de Clubes/ sale de la evidencia de carga (Admin/carga-clubes/<clubId>.md, "desde Clubes/<País>/<Club>/") y la nota de
//      sourcing es Admin/sourcing/<País>/<Club>.md; de la nota salen las URLs del canal (completas o `dominio/ruta`);
//   3. baja cada página y busca links a PDF que nombran la temporada esperada ("2025-26", "2025/26", "2025_26", "2026" si el club cierra
//      en diciembre). Un PDF que ya está en la carpeta (mismo nombre) no se vuelve a bajar.
// Una página que no se pudo leer (captcha, se arma con JavaScript, sin URL en la nota, error) va a una lista aparte: la revisa la tarea
// programada con el navegador.
//
// REGISTRO: Admin/registros/ejercicios-nuevos.json { clubId: { anio, pdfs: [url], revisado } }: un PDF ya avisado no se vuelve a avisar.
//
// USO:
//   node tools/ejercicios-nuevos.mjs                 ensayo: qué encontraría (no baja ni escribe nada)
//   node tools/ejercicios-nuevos.mjs --escribir      baja los PDFs a Clubes/, escribe el README y el registro
//   ... --club <clubId>                              un solo club
//   ... --json                                       al final, el resultado en una línea (para la tarea programada)
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const { cierreDelClub } = createRequire(import.meta.url)('./cierre-ejercicio.js');
const ARGS = process.argv.slice(2);
const ESCRIBIR = ARGS.includes('--escribir');
const SOLO = ARGS.includes('--club') ? ARGS[ARGS.indexOf('--club') + 1] : null;
const MESES_PUBLICACION = 4; // casi todos publican entre 3 y 6 meses después del cierre
const REGISTRO = resolve(ROOT, 'Admin', 'registros', 'ejercicios-nuevos.json');
const README = resolve(ROOT, 'Admin', 'sourcing', 'README.md');
const HOY = new Date().toISOString().slice(0, 10);
const UA = { 'User-Agent': 'Mozilla/5.0 (finance-of-sports; revisión mensual de estados financieros publicados)' };

function cargar() {
  const ci = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-index.js'), 'utf8'), ci);
  const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
  return { CI: ci.window.CLUB_INDEX, CLUBS: vm.runInContext('clubs', ctx) };
}

// la carpeta de Clubes/ del club, según su evidencia de carga (la carpeta más citada)
function carpetaDe(id) {
  const f = resolve(ROOT, 'Admin', 'carga-clubes', `${id}.md`); if (!existsSync(f)) return null;
  const n = {}; for (const m of readFileSync(f, 'utf8').matchAll(/Clubes\/([^/\n]+)\/([^/\n]+)\//g)) n[`${m[1]}/${m[2]}`] = (n[`${m[1]}/${m[2]}`] || 0) + 1;
  return Object.entries(n).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}
// las URLs de la nota de sourcing: completas y `dominio/ruta`; primero las de una línea "Canal"
function urlsDe(carpeta) {
  const f = resolve(ROOT, 'Admin', 'sourcing', `${carpeta}.md`); if (!existsSync(f)) return [];
  const txt = readFileSync(f, 'utf8'); const out = [];
  const de = (t) => [...t.matchAll(/https?:\/\/[^\s)<>`'"\]]+/g)].map((m) => m[0]).concat([...t.matchAll(/`((?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+\/[^`\s]*)`/gi)].map((m) => `https://${m[1]}`));
  for (const l of txt.split('\n').filter((l) => /canal|fuente|investor|relaç|contas|bilanci|financ|memoria|estados|cuentas|regulador/i.test(l))) out.push(...de(l));
  out.push(...de(txt));
  // fuera: archivos, buscadores y agregadores que no son del club
  return [...new Set(out.map((u) => u.replace(/[.,;:]+$/, '')))].filter((u) => !/\.(pdf|xlsx?|zip)(\?|$)/i.test(u) && !/google\.|wikipedia\.|web\.archive|transfermarkt|worldfootball|bing\./i.test(u)).slice(0, 4);
}
// cómo puede aparecer la temporada esperada en un link
function formas(anio, calendario) {
  const a = anio - 1, yy = String(anio).slice(2), aa = String(a).slice(2);
  return calendario ? [String(anio)] : [`${a}-${yy}`, `${a}/${yy}`, `${a}_${yy}`, `${a}-${anio}`, `${a}/${anio}`, `${a}_${anio}`, `${aa}-${yy}`, `${aa}${yy}`, `${a}${yy}`];
}

async function bajar(url, binario = false) {
  try {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 30000);
    const r = await fetch(url, { headers: UA, redirect: 'follow', signal: ctrl.signal }); clearTimeout(t);
    if (!r.ok) return { error: `HTTP ${r.status}` };
    if (binario) return { buf: Buffer.from(await r.arrayBuffer()), tipo: r.headers.get('content-type') || '' };
    const html = await r.text(); return { html, final: r.url };
  } catch (e) { return { error: e.name === 'AbortError' ? 'tardó más de 30 s' : e.message }; }
}
function linksPdf(html, base) {
  const out = new Set();
  for (const m of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
    const h = m[1].replace(/&amp;/g, '&'); if (!/\.pdf(\?|#|$)/i.test(h) && !/download|descarg|document/i.test(h)) continue;
    try { out.add(new URL(h, base).href); } catch { /* href roto */ }
  }
  return [...out];
}
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
// "report" o "relatório" solos son demasiado amplios (São Paulo: "report-fidc", "relatorio-de-justificativa"): van con "contas" o "annual"
const FINANCIERO = /balan|demonstra|financ|contas|bilanci|estados|cuentas|memoria|annual|izvje|account|jahresab|jaarversl|regnskab|årsrap|arsrap|bokslut|tilinp|relazione|r[ae]latori[oa]?[-_ ]?(e|de)?[-_ ]?contas/i;
const NO_FINANCIERO = /parecer|\bato\b|ato-administrativo|edital|convoca|\bata\b|regulamento|estatuto|presupuesto|orçamento|orcamento|budget|preventivo/i;

async function main() {
  const { CI, CLUBS } = cargar();
  const registro = existsSync(REGISTRO) ? JSON.parse(readFileSync(REGISTRO, 'utf8')) : {};
  const encontrados = [], aMano = [], esperando = [], yaBajado = [];
  for (const [id, c] of Object.entries(CI)) {
    if (SOLO && id !== SOLO) continue;
    const reales = (c.yrs || []).filter(([, t]) => t !== 'official_budget').map(([y]) => +y); if (!reales.length) continue;
    const ultimo = Math.max(...reales); const anio = ultimo + 1;
    const mmdd = c.ci?.[ultimo] || cierreDelClub(CLUBS[id], anio).slice(5);
    const cierre = new Date(`${anio}-${mmdd}T00:00:00Z`); const debe = new Date(cierre); debe.setUTCMonth(debe.getUTCMonth() + MESES_PUBLICACION);
    if (debe > new Date()) { esperando.push(id); continue; }
    const carpeta = carpetaDe(id); const urls = carpeta ? urlsDe(carpeta) : [];
    const nombre = c.n || CLUBS[id]?.displayName || id;
    if (!carpeta || !urls.length) { aMano.push({ id, nombre, anio, motivo: carpeta ? `sin URL en Admin/sourcing/${carpeta}.md` : 'sin carpeta en la evidencia de carga', urls: [] }); continue; }
    const fs = formas(anio, mmdd.startsWith('12'));
    const yaAvisados = new Set(registro[id]?.anio === anio ? registro[id].pdfs : []);
    const enCarpeta = new Set(existsSync(resolve(ROOT, 'Clubes', carpeta)) ? readdirSync(resolve(ROOT, 'Clubes', carpeta)).map((f) => f.toLowerCase()) : []);
    // si la carpeta ya tiene un documento de esa temporada (con cualquier nombre: Chapecoense "demonstracoes-contabeis-2022.pdf"), no es
    // nuevo: está bajado y falta cargarlo, que es otro trabajo (node tools/estado.mjs)
    if ([...enCarpeta].some((f) => /\.pdf$/.test(f) && fs.some((x) => f.includes(x.toLowerCase())))) { yaBajado.push(id); continue; }
    const fallas = []; const nuevos = [];
    for (const u of urls) {
      await dormir(1000);
      const p = await bajar(u);
      if (p.error) { fallas.push(`${u} (${p.error})`); continue; }
      if (/captcha|cf-challenge|are you a robot|smartcaptcha/i.test(p.html) || p.html.length < 2000) { fallas.push(`${u} (captcha o página vacía: se arma con JavaScript)`); continue; }
      for (const l of linksPdf(p.html, p.final)) {
        const txt = decodeURIComponent(l); if (!fs.some((f) => txt.includes(f))) continue;
        // que el archivo nombre los estados financieros, y no un acta, un dictamen o un edicto (São Paulo: "ato administrativo";
        // Chapecoense: "Parecer Conselho Fiscal")
        const arch = basename(new URL(l).pathname);
        // un nombre sin palabras ("2-2023_2024.pdf", Estrela da Amadora) vale: solo dice la temporada
        const sinPalabras = !/\p{L}{3,}/u.test(decodeURIComponent(arch).replace(/\.pdf$/i, ''));
        if ((!FINANCIERO.test(decodeURIComponent(arch)) && !sinPalabras) || NO_FINANCIERO.test(decodeURIComponent(arch))) continue;
        if (yaAvisados.has(l) || enCarpeta.has(basename(new URL(l).pathname).toLowerCase())) continue;
        nuevos.push(l);
      }
    }
    if (nuevos.length) encontrados.push({ id, nombre, anio, carpeta, pdfs: [...new Set(nuevos)].slice(0, 5) });
    else if (fallas.length === urls.length) aMano.push({ id, nombre, anio, motivo: 'ninguna página se pudo leer', urls: fallas });
  }

  for (const e of encontrados) console.log(`NUEVO ${e.nombre} (${e.id}) ejercicio ${e.anio}: ${e.pdfs.join(' | ')}`);
  console.log(`\n${encontrados.length} clubes con un PDF nuevo; ${aMano.length} para revisar con el navegador; ${esperando.length} todavía en plazo (cierre + ${MESES_PUBLICACION} meses); ${yaBajado.length} ya tienen el PDF en su carpeta (falta cargarlo).`);
  for (const a of aMano) console.log(`  A MANO ${a.nombre} (${a.id}) ejercicio ${a.anio}: ${a.motivo}${a.urls.length ? ` — ${a.urls.join(' ; ')}` : ''}`);

  if (ESCRIBIR) {
    const lineas = [];
    for (const e of encontrados) {
      const dir = resolve(ROOT, 'Clubes', e.carpeta); mkdirSync(dir, { recursive: true }); const bajados = [];
      for (const u of e.pdfs) {
        const r = await bajar(u, true);
        if (r.error || !r.buf || (!/pdf/i.test(r.tipo) && r.buf.subarray(0, 4).toString() !== '%PDF')) continue;
        // nombre en ASCII y minúscula, como el resto de Clubes/ ("Demonstrações Contábeis 2025 FAF(1).pdf" -> "demonstracoes-contabeis-2025-faf-1.pdf")
        let nom = basename(decodeURIComponent(new URL(u).pathname)).replace(/\.pdf$/i, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '.pdf';
        if (existsSync(resolve(dir, nom))) continue; // nunca se pisa un PDF (no hay git para recuperarlo)
        writeFileSync(resolve(dir, nom), r.buf); bajados.push(`Clubes/${e.carpeta}/${nom}`);
      }
      lineas.push(`- Ejercicio ${e.anio} de ${e.nombre} — ${e.pdfs[0]} — encontrado por la tarea mensual el ${HOY}${bajados.length ? `; bajado a ${bajados.join(', ')}` : ' (no se pudo bajar: revisar el link)'}`);
      registro[e.id] = { anio: e.anio, pdfs: [...new Set([...(registro[e.id]?.anio === e.anio ? registro[e.id].pdfs : []), ...e.pdfs])], revisado: HOY };
    }
    for (const a of aMano) lineas.push(`- A revisar con el navegador: ${a.nombre}, ejercicio ${a.anio} — ${a.motivo}${a.urls.length ? ` (${a.urls.join(' ; ')})` : ''}`);
    escribirReadme(lineas);
    // un PDF nuevo en Clubes/ cambia data/faltantes/ (cuenta lo que está "en mano"): se regenera, sube ASSET_V (un archivo de data/
    // cambió) y se regenera fuentes/ (lee ASSET_V); así la auditoría queda en P0 0 / P1 0 después de la tarea mensual
    if (encontrados.length) {
      const { execFileSync } = await import('node:child_process');
      execFileSync('node', [resolve(ROOT, 'tools', 'faltantes-liga.mjs')], { cwd: ROOT, stdio: 'ignore' });
      const idx = resolve(ROOT, 'index.html'); const html = readFileSync(idx, 'utf8'); const v = (html.match(/window\.ASSET_V = '(\d+)'/) || [])[1];
      if (v) { const n = String(+v + 1); writeFileSync(idx, html.replace(`window.ASSET_V = '${v}'`, `window.ASSET_V = '${n}'`).replaceAll(`?v=${v}`, `?v=${n}`), 'utf8'); }
      execFileSync('node', [resolve(ROOT, 'tools', 'generate-fuentes-page.js')], { cwd: ROOT, stdio: 'ignore' });
    }
    mkdirSync(resolve(ROOT, 'Admin', 'registros'), { recursive: true }); writeFileSync(REGISTRO, JSON.stringify(registro, null, 1) + '\n', 'utf8');
    console.log(`\nEscrito: ${encontrados.length} hallazgos y ${aMano.length} para revisar en Admin/sourcing/README.md; registro en Admin/registros/ejercicios-nuevos.json.`);
  }
  if (ARGS.includes('--json')) console.log(JSON.stringify({ encontrados, aMano }));
}

// la sección propia del README, antes del "---" que abre "## Índice de países" (esa sección la escribe generate-fuentes-index.js)
function escribirReadme(lineas) {
  let md = readFileSync(README, 'utf8');
  const TIT = '## Ejercicios nuevos (tarea mensual)';
  const bloque = `### ${HOY}\n\n${lineas.length ? lineas.join('\n') : '- Nada nuevo.'}\n`;
  if (!md.includes(TIT)) {
    const i = md.indexOf('\n---\n\n## Índice de países'); if (i < 0) throw new Error('no encontré el "---" antes de "## Índice de países" en Admin/sourcing/README.md');
    md = md.slice(0, i) + `\n\n${TIT}\n\nLo escribe tools/ejercicios-nuevos.mjs una vez por mes (to-do 252): el ejercicio que sigue al último cargado de cada club, si ya\nsalió. Lo nuevo va arriba. Un PDF bajado queda en su carpeta de Clubes/ y espera el onboarding.\n\n${bloque}` + md.slice(i);
  } else {
    const i = md.indexOf(TIT); const j = md.indexOf('\n### ', i); const k = md.indexOf('\n---\n', i);
    const pos = j >= 0 && j < k ? j + 1 : k + 1;
    md = md.slice(0, pos) + bloque + '\n' + md.slice(pos);
  }
  writeFileSync(README, md, 'utf8');
}

main().catch((e) => { console.error(e.message); process.exit(1); });

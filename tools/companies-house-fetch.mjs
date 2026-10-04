#!/usr/bin/env node
// Lista y baja las cuentas anuales de una sociedad de Companies House (Reino Unido).
// Canal documentado en .claude/skills/club-sourcing/paises/Reino-Unido.md. Sin API key, sin login.
//
//   node tools/companies-house-fetch.mjs <company-number> --list
//   node tools/companies-house-fetch.mjs <company-number> --club "Brentford" --slug brentford --want 5
//
// --want N  : baja los ejercicios más recientes que falten hasta que la carpeta tenga N (por año de cierre).
// --all     : baja todos los que falten (ignora --want).
// --years Y1,Y2 : baja solo los ejercicios que cierran en esos años (sirve con --include-small para probar si traen P&L).
// Lee la carpeta Clubes/Inglaterra/<club>/ para saber qué años ya hay (por el nombre del archivo).
import fs from 'node:fs';
import path from 'node:path';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const HOST = 'https://find-and-update.company-information.service.gov.uk';
const MONTHS = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };

const args = process.argv.slice(2);
const num = args[0];
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const club = flag('--club'), slug = flag('--slug');
const want = parseInt(flag('--want') || '5', 10);
const root = flag('--root') || 'Clubes/Inglaterra';
const listOnly = args.includes('--list'), all = args.includes('--all');
if (!num) { console.error('uso: companies-house-fetch.mjs <número> [--list | --club X --slug y --want N]'); process.exit(1); }

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function get(url, bin) {
  for (let i = 0; i < 4; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
    if (r.status === 429) { await sleep(5000 * (i + 1)); continue; }
    if (!r.ok) throw new Error(url + ' -> ' + r.status);
    return bin ? Buffer.from(await r.arrayBuffer()) : await r.text();
  }
  throw new Error('429 persistente ' + url);
}

if (!/^[A-Z]{0,2}\d+$/i.test(num)) {   // búsqueda por nombre: lista candidatos con estado y dirección
  const html = await get(`${HOST}/search/companies?q=${encodeURIComponent(num)}`);
  for (const li of (html.match(/<li class="type-company"[\s\S]*?<\/li>/g) || []).slice(0, 8))
    console.log(li.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220));
  process.exit(0);
}
const rows = [];
for (let p = 1; p < 40; p++) {
  const html = await get(`${HOST}/company/${num}/filing-history?page=${p}`);
  const trs = html.match(/<tr[\s\S]*?<\/tr>/g) || [];
  let n = 0;
  for (const tr of trs) {
    const href = tr.match(/href="(\/company\/[^"]*\/filing-history\/[^"]*\/document\?format=pdf[^"]*)"/);
    if (!href) continue;
    n++;
    const text = tr.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
    const m = text.match(/(.*?accounts.*?) made up to (\d{1,2}) (\w+) (\d{4})/i);
    if (!m) continue;
    const kind = m[1].toLowerCase();
    // "total exemption"/"small"/"micro": a veces traen cuenta de resultados y a veces no (hay que abrir y chequear): se saltean salvo --include-small
    if (/dormant/.test(kind) || (!args.includes('--include-small') && /micro|total exemption|small/.test(kind))) continue;
    const date = `${m[4]}-${String(MONTHS[m[3]]).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
    const type = /group/.test(kind) ? 'group' : /full/.test(kind) ? 'full' : /medium/.test(kind) ? 'medium' : 'other';
    const pages = (text.match(/\((\d+) pages?\)/) || [])[1];
    rows.push({ date, type, pages, desc: m[1], url: HOST + href[1].replace(/&amp;/g, '&') });
  }
  if (!n) break;
  if (trs.length < 5) break;
  await sleep(400);
}
// una por fecha de cierre; prioridad group > full > medium > other
const rank = { group: 0, full: 1, medium: 2, other: 3 };
const byDate = new Map();
for (const r of rows) { const c = byDate.get(r.date); if (!c || rank[r.type] < rank[c.type]) byDate.set(r.date, r); }
const nowIso = new Date().toISOString().slice(0, 10);   // fechas de 2 dígitos mal parseadas por Companies House (1974 -> 2074)
const series = [...byDate.values()].filter(s => s.date <= nowIso).sort((a, b) => b.date.localeCompare(a.date));

if (listOnly || !club) {
  for (const s of series) console.log(`${s.date}\t${s.type}\t${s.pages || '?'}p\t${s.desc}`);
  console.log(`# ${series.length} ejercicios`);
  process.exit(0);
}

const dir = path.join(root, club);
fs.mkdirSync(dir, { recursive: true });
const have = new Set();
for (const f of fs.readdirSync(dir)) {
  if (!/\.pdf$/i.test(f)) continue;
  const m = f.match(/(\d{4})-(\d{2})(?!\d)/);
  const y = f.match(/(\d{4})/);
  if (m) have.add(+m[1] + 1);
  else if (y) have.add(+y[1]);
}
let todo = series.filter(s => !have.has(+s.date.slice(0, 4)));
const only = flag('--years');   // ej. --years 2018,2019: baja solo esos años de cierre (para probar ejercicios viejos de sociedades chicas)
if (only) todo = series.filter(s => only.split(',').includes(s.date.slice(0, 4)) && !have.has(+s.date.slice(0, 4)));
else if (!all) todo = todo.slice(0, Math.max(0, want - have.size));
console.log(`${club}: ya hay ${have.size} (${[...have].sort().join(',')}); disponibles ${series.length}; a bajar ${todo.length}`);
for (const s of todo) {
  const y = +s.date.slice(0, 4), mo = s.date.slice(5, 7);
  const label = mo === '12' ? `${y}` : `${y - 1}-${String(y).slice(2)}`;
  const file = path.join(dir, `${slug}-${s.type}-accounts-${label}.pdf`);
  if (fs.existsSync(file)) continue;
  const buf = await get(s.url, true);
  if (buf.slice(0, 4).toString() !== '%PDF') { console.log(`  !! ${s.date} no es PDF`); continue; }
  fs.writeFileSync(file, buf);
  console.log(`  ok ${s.date} ${s.type} ${s.pages || '?'}p ${(buf.length / 1e6).toFixed(1)}MB -> ${path.basename(file)}`);
  await sleep(600);
}

#!/usr/bin/env node
// Lista y baja las "Annual Return and Accounts" de una registered society del Mutuals Public Register de la FCA
// (condados de cricket y similares). Canal: .claude/skills/club-sourcing/paises/Reino-Unido.md.
//
//   node tools/fca-mutuals-fetch.mjs <societyId> --list
//   node tools/fca-mutuals-fetch.mjs <societyId> --club "Surrey CCC" --slug surrey-ccc --want 5
import fs from 'node:fs';
import path from 'node:path';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';
const args = process.argv.slice(2);
const id = args[0];
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const club = flag('--club'), slug = flag('--slug');
const want = parseInt(flag('--want') || '5', 10);
const root = flag('--root') || 'Clubes/Inglaterra';
if (!id) { console.error('uso: fca-mutuals-fetch.mjs <societyId> [--list | --club X --slug y --want N]'); process.exit(1); }

const j = await (await fetch(`https://mutuals.fca.org.uk/Documents/GetSocietiesDocument?societyId=${id}`, { headers: { 'User-Agent': UA } })).json();
const rows = Array.isArray(j) ? j : j.aaData || [];   // el endpoint devuelve las dos formas
const accs = rows.filter(r => /Annual Return/i.test(r[1]) || /Annual Returns and Accounts/i.test(r[2]))
  .map(r => { const [d, m, y] = r[0].split('/'); return { date: `${y}-${m}-${d}`, docId: r[4] }; })
  .sort((a, b) => b.date.localeCompare(a.date) || b.docId - a.docId)
  .filter((a, i, all) => i === 0 || a.date !== all[i - 1].date);   // dos docs con la misma fecha (reenvío): queda el más nuevo
if (!club) { accs.forEach(a => console.log(a.date, a.docId)); console.log('#', accs.length); process.exit(0); }

const dir = path.join(root, club);
fs.mkdirSync(dir, { recursive: true });
const have = new Set(fs.readdirSync(dir).filter(f => /\.pdf$/i.test(f)).map(f => (f.match(/(\d{4})\.pdf$/) || [])[1]).filter(Boolean));
const todo = accs.filter(a => !have.has(a.date.slice(0, 4))).slice(0, Math.max(0, want - have.size));
console.log(`${club}: ya hay ${have.size} (${[...have].sort()}); disponibles ${accs.length}; a bajar ${todo.length}`);
for (const a of todo) {
  const buf = Buffer.from(await (await fetch(`https://mutuals.fca.org.uk/Documents/Download/${a.docId}`, { headers: { 'User-Agent': UA } })).arrayBuffer());
  if (buf.slice(0, 4).toString() !== '%PDF') { console.log(`  !! ${a.date} no es PDF`); continue; }
  const f = path.join(dir, `${slug}-annual-return-and-accounts-${a.date.slice(0, 4)}.pdf`);
  fs.writeFileSync(f, buf);
  console.log(`  ok ${a.date} ${(buf.length / 1e6).toFixed(1)}MB -> ${path.basename(f)}`);
  await new Promise(r => setTimeout(r, 600));
}

// Uso: node comparar-numeros.mjs <pdf> <md>. Por página: números del .md (3+ dígitos) que no están en el texto del PDF de esa página.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const [pdf, md] = process.argv.slice(2);
const norm = (s) => s.replace(/[\s .,]/g, '');
const nums = (t) => (t.match(/\(?-?\d{1,3}(?:[  .,]\d{3})+(?:[.,]\d+)?\)?|\d{3,}/g) || []).map((x) => norm(x.replace(/[()-]/g, ''))).filter((x) => x.length >= 3);
const paginas = readFileSync(md, 'utf8').split(/^--- pág\. (\d+) ---$/m);
let tot = 0, falta = 0;
for (let i = 1; i < paginas.length; i += 2) {
  const n = +paginas[i]; const txt = paginas[i + 1];
  const pdfTxt = norm(execFileSync('pdftotext', ['-f', String(n), '-l', String(n), '-layout', pdf, '-']).toString());
  const ns = nums(txt); const malos = ns.filter((x) => !pdfTxt.includes(x));
  tot += ns.length; falta += malos.length;
  if (malos.length) console.log(`pág. ${n}: ${malos.length} de ${ns.length} no están en el PDF: ${malos.slice(0, 8).join(' ')}`);
}
console.log(`TOTAL: ${tot - falta} de ${tot} números del .md están en el texto del PDF (${falta} no)`);

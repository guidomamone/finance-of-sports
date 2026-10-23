// Lista qué ejercicios publica el Regnskapsregisteret (Noruega) para unas entidades, SIN bajar nada:
// un HEAD por <orgnr>/<año> a la URL de "kopi" (200 = hay PDF, 404 = no hay).
// Uso: node tools/listar-brreg.mjs [desde] [hasta]   (default 2008 2025). Salida: Markdown a stdout.
const ENTIDADES = [
  ['Molde', 'Molde Fotballklubb FLI', '942562241'],
  ['Fredrikstad', 'Fredrikstad Fotballinvest AS', '979111576'],
  ['Aalesund', 'Ålesund Fotball AS', '970976787'],
  ['Sarpsborg 08', 'Sarpsborg 08 Fotballforening FLI', '986400362'],
  ['Vålerenga', 'Vålerenga Fotball Elite FLI', '914175232'],
  ['Viking', 'Viking Fotball AS', '918087834'],
];
const desde = Number(process.argv[2] || 2008);
const hasta = Number(process.argv[3] || 2025);
const base = 'https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi';

const t0 = Date.now();
const filas = [];
let pedidos = 0;
for (const [club, entidad, orgnr] of ENTIDADES) {
  const anios = [];
  for (let y = desde; y <= hasta; y++) {
    const r = await fetch(`${base}/${orgnr}/${y}`, { method: 'HEAD' });
    pedidos++;
    if (r.status === 200) anios.push(y);
    else if (r.status !== 404) throw new Error(`${orgnr}/${y}: HTTP ${r.status}`);
  }
  filas.push({ club, entidad, orgnr, anios });
}
console.log('| Club | Entidad | Orgnr | Ejercicios en el portal |');
console.log('|---|---|---|---|');
for (const f of filas) console.log(`| ${f.club} | ${f.entidad} | ${f.orgnr} | ${f.anios.join(', ')} |`);
console.error(`${pedidos} pedidos HEAD en ${((Date.now() - t0) / 1000).toFixed(1)} s`);

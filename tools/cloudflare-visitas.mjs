// Visitas de financeofsports.com desde Cloudflare Web Analytics (la API GraphQL de Cloudflare), para el dashboard de usuarios y
// visitas. Solo lee. Necesita Admin/api-keys/cloudflare.env (gitignoreado) con:
//   CLOUDFLARE_API_TOKEN=<token con el permiso "Account Analytics: Read">
//   CLOUDFLARE_ACCOUNT_ID=<el Account ID del panel de Cloudflare>
//
//   node tools/cloudflare-visitas.mjs                  resumen en la terminal
//   node tools/cloudflare-visitas.mjs --json <archivo> además escribe por día y por país en <archivo>

import { readFileSync, writeFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../Admin/api-keys/cloudflare.env', import.meta.url), 'utf8')
    .split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]),
);
const iJson = process.argv.indexOf('--json');
const salidaJson = iJson > 0 ? process.argv[iJson + 1] : null;
const HOST = 'financeofsports.com';
const DIAS = 180;

async function gql(query, variables) {
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(30000),
  });
  const j = await res.json();
  if (!res.ok || j.errors?.length) throw new Error(`${res.status} ${JSON.stringify(j.errors || j).slice(0, 300)}`);
  return j.data.viewer.accounts[0];
}

const iso = (d) => d.toISOString().slice(0, 10);
const hoy = new Date();

// La API limita el rango de cada consulta: se pide de a 30 días.
const porDia = [];
for (let k = 0; k < DIAS / 30; k++) {
  const fin = new Date(hoy.getTime() - k * 30 * 864e5);
  const ini = new Date(fin.getTime() - 29 * 864e5);
  const a = await gql(`query($acct: String!, $from: Date!, $to: Date!, $host: String!) { viewer { accounts(filter: {accountTag: $acct}) {
      rumPageloadEventsAdaptiveGroups(limit: 100, filter: {date_geq: $from, date_leq: $to, requestHost: $host}, orderBy: [date_ASC]) {
        count sum { visits } dimensions { date } } } } }`,
  { acct: env.CLOUDFLARE_ACCOUNT_ID, from: iso(ini), to: iso(fin), host: HOST });
  for (const g of a.rumPageloadEventsAdaptiveGroups) porDia.push({ dia: g.dimensions.date, visitas: g.sum.visits, paginas_vistas: g.count });
}
// Los días sin visitas no vienen en la respuesta: van con 0, para que el gráfico muestre los huecos.
const vistos = new Map(porDia.map((d) => [d.dia, d]));
porDia.length = 0;
for (let k = DIAS - 1; k >= 0; k--) { const dia = iso(new Date(hoy.getTime() - k * 864e5)); porDia.push(vistos.get(dia) || { dia, visitas: 0, paginas_vistas: 0 }); }

const desde30 = iso(new Date(hoy.getTime() - 29 * 864e5));
const p = await gql(`query($acct: String!, $from: Date!, $to: Date!, $host: String!) { viewer { accounts(filter: {accountTag: $acct}) {
    rumPageloadEventsAdaptiveGroups(limit: 15, filter: {date_geq: $from, date_leq: $to, requestHost: $host}, orderBy: [sum_visits_DESC]) {
      sum { visits } dimensions { countryName } } } } }`,
{ acct: env.CLOUDFLARE_ACCOUNT_ID, from: desde30, to: iso(hoy), host: HOST });
const porPais = p.rumPageloadEventsAdaptiveGroups.map((g) => ({ pais: g.dimensions.countryName, visitas: g.sum.visits }));

const suma = (xs, k) => xs.reduce((t, x) => t + x[k], 0);
const ult30 = porDia.filter((d) => d.dia >= desde30);
console.log(`\nVISITAS (Cloudflare Web Analytics, ${HOST})`);
console.log(`  últimos 30 días: ${suma(ult30, 'visitas')} visitas, ${suma(ult30, 'paginas_vistas')} páginas vistas`);
console.log(`  últimos ${DIAS} días: ${suma(porDia, 'visitas')} visitas · países (30 días): ${porPais.slice(0, 5).map((x) => `${x.pais} ${x.visitas}`).join(', ')}\n`);
if (salidaJson) writeFileSync(salidaJson, JSON.stringify({ leido: new Date().toISOString(), por_dia: porDia, por_pais: porPais }, null, 1));

// Experimento 317 (descartable). Exporta los ejercicios de data/<país>/*.json (o de todos, con "todos") a un .sql de Postgres.
// Uso: node Admin/mediciones/317-supabase/exportar.mjs <iso2|todos> <salida.sql>
import fs from 'node:fs';

const [, , pais, salida] = process.argv;
const q = (s) => (s == null ? 'null' : "'" + String(s).replace(/'/g, "''") + "'");
const n = (v) => (typeof v === 'number' && isFinite(v) ? String(v) : 'null');

const isos = pais === 'todos'
  ? fs.readdirSync('data').filter((d) => /^[a-z]{2}$/.test(d) && d !== 'correcciones')
  : [pais];

const out = [];
out.push(`drop table if exists lines, club_years, clubs cascade;
create table clubs (id text primary key, name text, country text, currency text, sport text);
create table club_years (
  club_id text references clubs(id), fiscal_year int, currency text, report_type text, source_id text,
  fx_ref text, fx_rate numeric,
  off_revenue numeric, off_expenses numeric, off_net numeric,
  profit_on_player_sales numeric, asset_sales numeric, net_interest numeric, tax numeric, gross_debt numeric, cash numeric,
  primary key (club_id, fiscal_year));
create table lines (
  club_id text, fiscal_year int, side text, label text, category text, subcategory text, amount numeric,
  foreign key (club_id, fiscal_year) references club_years(club_id, fiscal_year));
`);
let nClubs = 0, nYears = 0, nLines = 0;
for (const iso of isos) {
  for (const f of fs.readdirSync('data/' + iso).filter((x) => x.endsWith('.json'))) {
    const j = JSON.parse(fs.readFileSync(`data/${iso}/${f}`, 'utf8'));
    const c = j.club; nClubs++;
    out.push(`insert into clubs values (${q(c.id)},${q(c.display_name || c.name)},${q(c.country)},${q(c.reporting_currency)},${q(c.sport)});`);
    for (const y of j.years || []) {
      nYears++;
      const fin = y.financial || {}, ot = y.official_totals || {};
      out.push(`insert into club_years values (${q(c.id)},${y.fiscal_year},${q(y.currency)},${q(y.report_type)},${q(y.source_id)},${q(y.fx && y.fx.ref)},${n(y.fx && y.fx.rate)},${n(ot.revenue)},${n(ot.expenses)},${n(ot.net_result)},${n(fin.profit_on_player_sales)},${n(fin.asset_sales)},${n(fin.net_interest)},${n(fin.tax)},${n(fin.gross_debt)},${n(fin.cash)});`);
      for (const [side, arr] of [['revenue', y.revenue], ['expense', y.expenses]]) {
        for (const l of arr || []) {
          nLines++;
          out.push(`insert into lines values (${q(c.id)},${y.fiscal_year},${q(side)},${q(l.label)},${q(l.category)},${q(l.subcategory)},${n(l.amount)});`);
        }
      }
    }
  }
}
fs.writeFileSync(salida, out.join('\n') + '\n');
console.log(JSON.stringify({ pais, clubes: nClubs, ejercicios: nYears, lineas: nLines, bytes: fs.statSync(salida).size }));

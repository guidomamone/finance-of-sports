-- Experimento 317: las tres auditorías en SQL sobre el espejo (tablas clubs, club_years, lines).

\echo '== A. Rubros que no suman (ingresos y gastos contra el total oficial; tolerancia 0,5 % para no depender de la unidad impresa) =='
select y.club_id, y.fiscal_year, l.side,
       round(abs(sum(l.amount)),3) as suma_lineas,
       case l.side when 'revenue' then y.off_revenue else y.off_expenses end as oficial,
       round(abs(sum(l.amount)) - case l.side when 'revenue' then y.off_revenue else y.off_expenses end, 3) as dif
from club_years y join lines l using (club_id, fiscal_year)
group by y.club_id, y.fiscal_year, l.side, y.off_revenue, y.off_expenses
having abs(abs(sum(l.amount)) - case l.side when 'revenue' then y.off_revenue else y.off_expenses end)
       > 0.005 * abs(case l.side when 'revenue' then y.off_revenue else y.off_expenses end)
order by 1,2,3;

\echo '== A2. Ejercicios sin líneas de un lado =='
select y.club_id, y.fiscal_year, s.side
from club_years y cross join (values ('revenue'),('expense')) s(side)
where not exists (select 1 from lines l where l.club_id=y.club_id and l.fiscal_year=y.fiscal_year and l.side=s.side);

\echo '== B. Años faltantes (huecos entre el primer y el último ejercicio de cada club) =='
select c.id, g.y as falta
from clubs c
join lateral (select min(fiscal_year) a, max(fiscal_year) b from club_years where club_id=c.id) r on true
cross join lateral generate_series(r.a, r.b) g(y)
where not exists (select 1 from club_years where club_id=c.id and fiscal_year=g.y)
order by 1,2;

\echo '== B2. Último ejercicio de cada club (atraso contra el más reciente del país) =='
select club_id, max(fiscal_year) ultimo, (select max(fiscal_year) from club_years) - max(fiscal_year) as atraso
from club_years group by club_id order by atraso desc, club_id limit 8;

\echo '== C. Outliers entre clubes: ingresos oficiales por ejercicio, z-score > 2,5 dentro del mismo año y moneda =='
with t as (
  select club_id, fiscal_year, currency, off_revenue,
         avg(ln(nullif(off_revenue,0))) over (partition by fiscal_year, currency) m,
         stddev_samp(ln(nullif(off_revenue,0))) over (partition by fiscal_year, currency) s,
         count(*) over (partition by fiscal_year, currency) n
  from club_years where off_revenue > 0)
select club_id, fiscal_year, currency, off_revenue, round(((ln(off_revenue)-m)/s)::numeric,2) z, n
from t where n >= 5 and s > 0 and abs((ln(off_revenue)-m)/s) > 2.5 order by abs((ln(off_revenue)-m)/s) desc;

\echo '== C2. Outliers dentro de un club: salto de ingresos de un año al siguiente > 5x o < 1/5 (misma moneda) =='
select club_id, fiscal_year, currency, off_revenue, lag_rev, round((off_revenue/lag_rev)::numeric,2) ratio
from (select club_id, fiscal_year, currency, off_revenue,
             lag(off_revenue) over w lag_rev, lag(currency) over w lag_cur
      from club_years window w as (partition by club_id order by fiscal_year)) x
where lag_rev > 0 and lag_cur = currency and (off_revenue/lag_rev > 5 or off_revenue/lag_rev < 0.2)
order by club_id, fiscal_year;

\echo '== C3. Líneas con peso extremo: una línea > 90 % de su lado (catch-all) =='
select l.club_id, l.fiscal_year, l.side, l.label, round((100*l.amount/nullif(t.tot,0))::numeric,1) pct
from lines l join (select club_id, fiscal_year, side, sum(amount) tot from lines group by 1,2,3) t using (club_id, fiscal_year, side)
where l.amount/nullif(t.tot,0) > 0.9 and (select count(*) from lines z where z.club_id=l.club_id and z.fiscal_year=l.fiscal_year and z.side=l.side) > 1
order by pct desc limit 10;

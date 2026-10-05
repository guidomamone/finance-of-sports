# Auditoría de los 6 clubes cargados por el pipeline nuevo (2026-10-04)

Clubes: Universidad Católica (UC), Fortaleza CEIF, Goiás, Novorizontino, AEL Larissa, Juventus. Categorías dudosas y datos raros
en lo ya publicado. La hizo un subagente Sonnet (solo lectura); los marcados ✔ los verificó la sesión contra el .md y el `data/*.js`.
Ordenados por impacto en lo que ve un visitante. "M" = millones de la moneda del club. Pendiente: to-do 138 de `Admin/TODO.md`.

## Hallazgos

(Resueltos el 2026-10-05: hallazgos 1 a 4 (Versión 492), 5 (499), 8 (498), 9 (496), 10 (497) y la deuda de Fortaleza 2021 del 7 y el b) de caja y deuda (495). Los de la Versión 492: datos corregidos y ajustes manuales en `Admin/ajustes-manuales.jsonl`.
Desde la Versión 493 los ajustes de los cuatro casos se reproducen con `verificar.mjs`.)

6. **Fortaleza: "Gastos Laborales" de la nota de gastos administrativos en `wages_squad`** (2025: 2.234,9; 2024: 996,7). Es decisión de
   Guido en la cola (`categorias-aprendidas.jsonl`), distinta del criterio de UC y Goiás (nómina administrativa en
   `admin_general_expense`). Confirmar criterio.
7. **Caja y deuda con huecos.** Novorizontino `grossDebt` null en 2018 y 2020-2022 (deuda con partes relacionadas en el documento: 27,5;
   39,98; 51,8; 70,3). Fortaleza: `cash` null 2019-2022; `grossDebt` null 2022 (238,1, L642) y 2023 (110,0). Va con "Caja y deuda" del HANDOFF.
11. **Goiás 2008-2017: "(-) Dedução da receita" entera en `other_income`**, que queda negativo en 2008, 2009, 2010, 2012 y 2017. Desde
    2021 cada deducción va a su línea. Documentar o ajuste `fila`.
12. **Fortaleza: "Auxilio de arbitraje / transporte / hotelero" cambian de categoría entre años** (`competition_bonus` / `other_income`;
    ~0,3-0,4 M COP por año). Impacto chico. Cosmético: etiquetas que son frases del documento en 2022-2024.
13. **Fortaleza: "Aporte SENA" y "Sena" de otros años están en `admin_general_expense`** (2017 quedó en `wages_squad`, como Pensiones,
    Salud y Cajas); unificar si se recargan esos años. (Venía del HANDOFF; pasó acá en la Versión 470.)

## Otros clubes ya publicados (fuera de los 6)

Datos ya publicados con categorías dudosas, anotados en el HANDOFF y pasados acá en la Versión 470. Sin verificar todavía contra el .md.

- Almagro tiene "Sede Social - Medrano 522" como cuotas sociales.
- Grêmio, "Receitas Patrimoniais" como cuotas sociales.
- Vitória, Bahia y América Mineiro tienen socios en sus documentos y no en el sitio.

## Caja y deuda (`tools/caja-deuda.mjs`), lo que queda

Medido el 2026-10-04 con `caja-deuda.mjs --club <id>` (gratis, no escribe). Los casos a) a c) son nuevos de esta auditoría (amplían el
hallazgo 7); d) es lo que estaba en el HANDOFF hasta la Versión 468.

a) **Hay propuesta y la compuerta no tiene contra qué comparar** ("ningún año vecino para comparar"): Novorizontino deuda 2018 (27,51),
   2020 (40,05) y 2022 (70,28); Fortaleza deuda 2023 (110). Coinciden con el documento. El año anterior está vacío y la columna "año
   anterior" del documento siguiente no se lee (Novorizontino 2019 tiene la deuda cargada, 32,3, y su documento debería traer 2018).
   Propuesta: investigar por qué (subagente, gratis) y diseñar un escalón con su compuerta. 4 datos de una vez.
c) **Fortaleza caja 2019-2022 sin propuesta en ningún escalón.** El efectivo está en el cuadro de instrumentos financieros (2021: 20,036;
   2020: 151,365, L504), que no es una página del balance: probablemente por eso queda afuera.
d) Antes (sin arreglo limpio medido; no insistir sin un caso nuevo). `--medir` en todos los clubes: 146 iguales, 10 distintos, 363 sin
   dato; Juventus caja 17 de 23 y deuda 14 de 21. Juventus caja 2004 (51,104 contra 51,101966: el resumen en €000 contra el estado en
   euros) y 2005 (lee "Bank and post-office deposits" del cuadro de posición financiera neta, L1523); deuda 2018 (suma casual del
   precedente: dos activos); deuda 2007-2009 y caja 2006-2007 sin propuesta. Escalón 3 (media móvil) aprobado y en pausa. Ideas a medir
   con un club real: precedente que sume lo cargado en DOS años; el número del año en un escaneo necesita una segunda lectura (Gemini).

## Para documentar (sin arreglo)

- Novorizontino: "Premiações" de gastos en `other_expenses` (2024-25) y en `wages_squad` (2015), las dos por decisión de Guido.
- Préstamos de jugadores: UC los mapea a `player_amortisation`; Juventus "Expenses from players' registration rights" a `other_expenses`.
- UC 2011-12: `cash` no cuenta "Otros activos financieros corrientes" (1.525 y 1.066).

## Revisado y sin problema

- UC: saltos de 2025 (Libertadores, `stadium_other`) explicados; caja y deuda 2022-2025 = balance; FX coherente.
- Fortaleza: ascenso 2024 (`matchday_competition` 400 → 4.464); 2025 `player_sales` 11.570 real; caja 2023-25 = balance.
- Goiás: `exceptional_items` 2023 +140,21 (venta del 20% de la LFU, ajuste de Guido); caída de TV 2024 real.
- Novorizontino: 2025 `broadcasting` 36,98 y caja 2022 bien.
- AEL Larissa: pico 2021 de `other_income` (subsidios); fx en rango.
- Juventus: totales contra los oficiales; caja y deuda del balance separado; caídas 2021 (COVID) y 2024 (sin Champions).

## Propuesta de nota visible del quiebre de serie de Juventus (`publicNote`, pendiente del ok de Guido)

- 2005-06 (año 2006): "Último ejercicio con normas contables italianas: separa ingresos y gastos extraordinarios, y sus otros ingresos
  incluyen 43,75 M€ por única vez por derechos de TV y de archivo cedidos a Mediaset y a la RAI. Con las normas internacionales (IFRS)
  que el club adoptó desde 2006/07, este mismo ejercicio da una pérdida de 45,99 M€ en lugar de 36,48 M€, así que 2006 y 2007 no son
  del todo comparables."
- 2006-07 (año 2007): "Primer ejercicio con normas internacionales (IFRS); los años anteriores siguen las normas italianas y no son del
  todo comparables. Es además la temporada en Serie B, tras el descenso por el fallo deportivo de 2006."

# Auditoría de los 6 clubes cargados por el pipeline nuevo (2026-10-04)

Clubes: Universidad Católica (UC), Fortaleza CEIF, Goiás, Novorizontino, AEL Larissa, Juventus. Categorías dudosas y datos raros
en lo ya publicado. La hizo un subagente Sonnet (solo lectura); los marcados ✔ los verificó la sesión contra el .md y el `data/*.js`.
Ordenados por impacto en lo que ve un visitante. "M" = millones de la moneda del club. Pendiente: to-do 138 de `Admin/TODO.md`.

## Hallazgos

(Resueltos el 2026-10-05: hallazgos 1 a 4 (Versión 492), 5 (499), 6 (500), 7 (495, 503 y 504), 8 (498), 11 y 13 (505), 12 (506), 9 (496), 10 (497) y la deuda de Fortaleza 2021 del 7 y el b) de caja y deuda (495). Los de la Versión 492: datos corregidos y ajustes manuales en `Admin/ajustes-manuales.jsonl`.
Desde la Versión 493 los ajustes de los cuatro casos se reproducen con `verificar.mjs`.)

## Otros clubes ya publicados (fuera de los 6)

Datos ya publicados con categorías dudosas, anotados en el HANDOFF y pasados acá en la Versión 470. Sin verificar todavía contra el .md.

- Almagro tiene "Sede Social - Medrano 522" como cuotas sociales.
- Grêmio, "Receitas Patrimoniais" como cuotas sociales.
- Vitória, Bahia y América Mineiro tienen socios en sus documentos y no en el sitio.

## Caja y deuda (`tools/caja-deuda.mjs`), lo que queda

Medido el 2026-10-04 con `caja-deuda.mjs --club <id>` (gratis, no escribe). Los casos a) a c) son nuevos de esta auditoría (amplían el
hallazgo 7); d) es lo que estaba en el HANDOFF hasta la Versión 468.

a) a c) resueltos el 2026-10-05 (Versiones 495, 503 y 504): Novorizontino deuda 2018 y 2020-2022 y Fortaleza caja 2019-2022 y deuda 2021-2023,
   leídos en el documento y cargados con ajustes `deuda` / `caja`. Lo que se probó en la herramienta y no entró está en `Admin/HALLAZGOS-pipeline.md`;
   lo que entró, en la Versión 502 (un valor aceptado en la misma corrida ya no sirve de vecino).
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

## Nota visible del quiebre de serie de Juventus

Publicada el 2026-10-05 (Versión 501), como `publicNote` de las fuentes 2005-06 y 2006-07.

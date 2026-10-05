# Auditoría de los 6 clubes cargados por el pipeline nuevo (2026-10-04)

Clubes: Universidad Católica (UC), Fortaleza CEIF, Goiás, Novorizontino, AEL Larissa, Juventus. Categorías dudosas y datos raros
en lo ya publicado. La hizo un subagente Sonnet (solo lectura); los marcados ✔ los verificó la sesión contra el .md y el `data/*.js`.
Ordenados por impacto en lo que ve un visitante. "M" = millones de la moneda del club. Pendiente: to-do 138 de `Admin/TODO.md`.

## Hallazgos

(Hallazgos 1 a 4 resueltos el 2026-10-05, Versión 492: datos corregidos y ajustes manuales en `Admin/ajustes-manuales.jsonl`.
Desde la Versión 493 los ajustes de los cuatro casos se reproducen con `verificar.mjs`.)

5. **Goiás 2012-2013: `wages_squad` en 0, gastos de fútbol en bolsón (35,8 y 44,6).** La nota 18 de 2013-2012 (L806-820) es un cuadro por
   segmento (profesional / base / social) con "Despesas com pessoal" 31,85 y 25,45 (profesional). Verificado 2013: profesional + base
   = 44,91 contra 44,65 del estado: no cierra exacto. Investigar antes de proponer.
6. **Fortaleza: "Gastos Laborales" de la nota de gastos administrativos en `wages_squad`** (2025: 2.234,9; 2024: 996,7). Es decisión de
   Guido en la cola (`categorias-aprendidas.jsonl`), distinta del criterio de UC y Goiás (nómina administrativa en
   `admin_general_expense`). Confirmar criterio.
7. **Caja y deuda con huecos.** Novorizontino `grossDebt` null en 2018 y 2020-2022 (deuda con partes relacionadas en el documento: 27,5;
   39,98; 51,8; 70,3). Fortaleza: `cash` null 2019-2022; `grossDebt` null 2022 (238,1, L642) y 2023 (110,0); 2021 cargado 102,5 = solo
   corto plazo (el balance dice 295,8, L506): dato mal cargado, no un hueco. Va con "Caja y deuda" del HANDOFF.
8. **AEL Larissa 2023: `wages_squad` en 0** con la nota de gastos por naturaleza disponible (`AEL_FS_2023-06-30_a.md` L593, pág. 19:
   Αμοιβές και έξοδα προσωπικού 2,06). Cargado como bolsón funcional (Κόστος πωλήσεων 1,59). Arreglo: recarga con la nota 16.
   2025: entradas, patrocinio y TV solo en el informe de gestión, no cierran exacto con el bolsón 2,30: documentar.
9. **AEL Larissa 2024: "Λοιπά έξοδα και ζημιές" 1,632 (46% del gasto) en `other_expenses`**; son extraordinarios
   (`AEL_FS_ELP_2024-06-30.md` L646-650). Igual en 2022 (0,28) y 2025 (0,216). Propuesta: `exceptional_items`.
10. **Goiás 2025: "Despesas com Earn In" 7,98 en `other_expenses` y "Outras Receitas (b)" 1,44 en `other_income`** (L1295-1300); en 2024
    el mismo rubro ("Outras Receitas e Despesas" -6,90) está en `exceptional_items`. Propuesta: unificar en `exceptional_items`.
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
b) **Fortaleza 2021, deuda mal cargada:** el sitio tiene 102,513 (escalón 2, "Total Prestamos y Sobregiros Bancarios", nota 12, pág. 20
   del visor), que es solo "Obligaciones al corto plazo" (tarjetas 2,513 + préstamos 100,000); la pág. 21 del visor arranca con una imagen
   sin transcribir. El cuadro de instrumentos financieros (`estados-financieros-2021.md` L506) dice 295,846. `caja-deuda.mjs` nunca pisa
   un valor cargado: hace falta diseñar cómo corregir uno (p. ej. ajuste `caja` con "reemplaza" como escalón 0).
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

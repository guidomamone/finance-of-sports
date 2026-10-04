# Auditoría de los 6 clubes cargados por el pipeline nuevo (2026-10-04)

Clubes: Universidad Católica (UC), Fortaleza CEIF, Goiás, Novorizontino, AEL Larissa, Juventus. Categorías dudosas y datos raros
en lo ya publicado. La hizo un subagente Sonnet (solo lectura); los marcados ✔ los verificó la sesión contra el .md y el `data/*.js`.
Ordenados por impacto en lo que ve un visitante. "M" = millones de la moneda del club. Pendiente: to-do 138 de `Admin/TODO.md`.

## Hallazgos

1. ✔ **Goiás 2016: ingresos y gastos de fútbol en bolsón con desglose en el documento.** Cargado: "RECEITA LÍQUIDA DAS ATIVIDADES"
   83,0 en `lump_football_operations` y "Despesas com futebol profissional e amador" 38,2 en `lump_football_operations_expense`; la
   meta dice en `sinDesglose` "el documento no desglosa este renglón", y no es cierto. Notas 17 y 18 (`demonstracoes-contabeis-2016-2015.md`
   L885-945, pág. 3 del visor): TV 53,95, transação de atletas 24,13, bilheterias 1,69, premiação 0,48, patrocínio 3,23, mensalidades
   3,22, lotéricos 2,07, deduções -7,40; gastos: pessoal 30,09, direito de imagem 2,02, cessão de direitos 3,69, etc. Texto en dos columnas
   mezcladas: por eso el índice no lo vio como tabla. Hoy el sitio muestra TV, ventas de jugadores y sueldos en 0.
   Arreglo: ajustes `fila` con las partes de las notas (reemplaza los dos renglones) + recarga, como Fortaleza 2017 (Versión 464).
2. ✔ **Fortaleza 2025: "Legales" 3.500,1 (admin) es casi todo "Derechos Deportivos" 3.483,2** (`estados-financieros-2025.md` L1169-1171,
   nota (7) L1232: intermediación y pagos a clubes por transferencias). Precedente de Guido (2020, 2023): Derechos Deportivos →
   `player_amortisation`. "Arrendamientos" 1.655,1 incluye "Alquiler Terrenos" 1.278,8 (L1156; precedente `match_organisation_expense`).
   2024: "Legales" 163,6 con Derechos Deportivos 67,0 adentro. Causa: 2025 se cargó con el padre, 2024 con parte de las subfilas.
   Arreglo: ajustes `fila` (partir el padre) + recarga 2024 y 2025.
3. ✔ **Juventus 2006: "e) Other revenues and income" 51,0 M€ en `other_income`** incluye 30,0 de opciones de derechos de TV a RTI/Mediaset
   (temporadas 2007/08 y 2008/09) y 13,75 del archivo de imágenes vendido a la RAI (`Juventus-annual-financial-report-2005-06.md`,
   pág. 111 del visor). Los 30,0 son el mismo importe que la conciliación IFRS posterga (informe 2006-07, pág. 125 del visor, impreso 123).
   Arreglo propuesto: ajuste `fila`, RTI 30,0 → `broadcasting`; RAI 13,75 queda en `other_income`.
   Otros quiebres 2006 → 2007 explicables por el formato (solo documentar): la Champions va en `competition_bonus` hasta 2006 y dentro de
   `broadcasting` desde 2007; `other_expenses` 43,9 → 13,0 (en 2006 incluye 15,9 de TV a equipos visitantes y 12,72 de "Other risks").
4. ✔ **UC 2016: "Remuneraciones" 447,5 M CLP de la nota de Gastos de Administración (pág. 60) en `wages_squad`.** Entró por el precedente
   exacto ("Remuneraciones", plural, siempre fue plantel en UC; la de administración se llama "Remuneración"). No se arregla con
   `cola.mjs --corregir-categoria` (va por etiqueta y movería también los 5.167,6 del plantel del mismo año): hace falta un cambio de tool
   (corregir por etiqueta + renglón).
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

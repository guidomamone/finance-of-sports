# Eintracht Frankfurt

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: Eintracht Frankfurt Fußball Aktiengesellschaft (HRB 49421, Amtsgericht
  Frankfurt am Main), fundada 04/05/2000. Confirmado real filer (no exento) — tiene varias
  subsidiarias pequeñas (Eintracht Frankfurt NLZ GmbH, Eintracht Frankfurt Service GmbH,
  EintrachtTech GmbH, Eintracht Frankfurt Event GmbH, studio fiftynine GmbH) exentas bajo su propia
  garantía como matriz (§264 Abs.3/264b HGB), mismo patrón que Werder Bremen.
- **Canal**: `unternehmensregister.de`.

## Qué se bajó (sesión 2026-09-16/17)

**2 ejercicios**, `Clubes/Alemania/Eintracht Frankfurt/`, ambos Konzernabschluss (consolidado):

- `konzernabschluss-2024-25.pdf` — cerrado 30/6/2025, 34 páginas.
- `konzernabschluss-2023-24.pdf` — cerrado 30/6/2024, 34 páginas.

## Serie disponible sin bajar

Unternehmensregister muestra 8 páginas de resultados para esta entidad — hay ejercicios anteriores a
2023/24 sin confirmar en detalle ni descargar, por priorización de tiempo. Mismo procedimiento que
los 2 ya bajados: buscar "Eintracht Frankfurt Fußball Aktiengesellschaft" en
`unternehmensregister.de`.

## CARGADO al sitio (sesión 2026-09-22)

**Estado: CARGADO (Ejercicios 2024, 2025).** Último chequeo: 2026-09-22.

`clubId`: `eintrachtfrankfurt-de`. `data/eintrachtfrankfurt-de-data.js` (motor genérico), 2 ejercicios
desde los 2 Konzernabschluss ya bajados (`konzernabschluss-2023-24.md` -> año 2024,
`konzernabschluss-2024-25.md` -> año 2025). `fiscalYearStart:'07-01'` confirmado en el propio
documento ("Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024" / "...01.07.2024 bis zum 30.06.2025").
Moneda EUR, `fxRef` a `EUR@2024-06-30`/`EUR@2025-06-30` (ya existían en `FX_CLOSE`, el documento no
declara tipo de cambio propio). 2024/25 es el primer ejercicio con pérdida (Konzernjahresfehlbetrag)
desde que se carga este club.

Tie-out: 2024 revenue líneas 390,505068 M vs. impreso 390,504820 M (dif. €248); expenses 353,647496 M
vs. impreso 353,647338 M (dif. €158); PAT calculado 26,857879 M vs. impreso 26,857789 M (dif. €90).
2025 revenue líneas 389,131701 M vs. impreso 389,131471 M (dif. €230); expenses 392,088520 M vs.
impreso 392,089555 M (dif. €1.035); PAT calculado -8,455301 M vs. impreso -8,456566 M (dif. €1.265).
Todas las diferencias son redondeo acumulado de convertir filas dadas "in TEURO" (miles de €) —
`officialPAT`/`officialTotalRevenue`/`officialTotalExpenses` en el archivo usan las cifras EXACTAS
impresas en la Konzern-GuV, no la suma de las líneas redondeadas. Detalle completo de categorización
y el despeje del campo `tax` (que en el extracto del Unternehmensregister salta de numeración entre
"Ergebnis nach Steuern" y "Konzernjahresüberschuss/-fehlbetrag vor nicht beherrschenden Anteilen",
sin una fila "Sonstige Steuern" impresa con nombre) en el comentario de cabecera de
`data/eintrachtfrankfurt-de-data.js`.

`brandColor`: `#E1000F` (Pantone PMS 2347 C) — sourced de teamcolorcodes.com/footylogos.com (fan
sites, no hay hex oficial publicado), cruzado contra de.wikipedia.org/wiki/Eintracht_Frankfurt cuyo
infobox confirma "Rot-Schwarz-Weiß" (rojo-negro-blanco) como colores del club, no ambiguo. Verificado
2026-09-22. NO se escribió en `data/clubs.js` (fuera de alcance de esta tarea).

Bundesliga confirmado para los 2 años (1ª división, no hubo descenso ni ascenso): 2023/24 terminó 6°
(el propio Lagebericht dice "Tabellenplatz 6", corroborado por Wikipedia/tribuna.com); 2024/25
terminó 3° con 60 puntos, clasificando a UEFA Champions League 2025/26 (el propio Lagebericht dice
"Tabellenplatz 3" con 60 puntos, corroborado por Wikipedia/goal.com).

Dudas genuinas encontradas al categorizar (no resueltas unilateralmente, candidatas a
`Admin/dudas-por-club.md`): (1) la línea de ingresos "Frauen und Jugendfußball" mezcla fútbol
femenino + juvenil sin que el documento la separe — se cargó como `other_income` en vez de forzar
`womens_football` o `youth_football` solos. (2) la línea de gasto "Transfer" (comisiones de agentes +
cargos de transferencia/préstamo) mezcla costos de compra Y venta de jugadores según la propia
narrativa del documento, sin categoría específica en la taxonomía del sitio — se cargó como
`other_expenses` en vez de `player_amortisation` (que Racing sí usa, pero para costo de ADQUISICIÓN
específicamente, no para comisiones de transacción).

# kashimaantlers — evidencia de carga

Lo que había como comentario en `data/kashimaantlers-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/kashimaantlers-data.js — Kashima Antlers (鹿島アントラーズ), primer club de
Japón cargado al sitio (sesión 2026-09-13, junto con otros 9 clubes de
J.League: ver fuentes/Japón/_notas-generales.md para la metodología
completa y el gotcha de fondo, resumido acá).

FUENTE: "クラブ経営情報開示資料" (Club Management Information Disclosure
Material), el documento anual que la J.League publica cubriendo TODOS los
clubes de J1/J2/J3 (58-60 clubes), como parte de su Club Licensing System.
Edición 2025 (`Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf`,
"2026年5月26日（7月24日更新）"). Kashima aparece abreviado "鹿島" en las
tablas.

ALCANCE REAL DEL DOCUMENTO — CORRECCIÓN a lo que asumían las notas de
sourcing iniciales (fuentes/Japón/_notas-generales.md decía "ingreso por 7-8
categorías por club"; verificado en esta sesión de mapeo que NO es así para
la edición 2025 ni para ediciones anteriores revisadas como muestra —
2018): el documento SOLO desglosa 3 cifras por club, cada una para 3
ejercicios consecutivos (2023/2024/2025): 売上高 (ingreso TOTAL), スポンサー
収入 (sponsors) e 入場料収入 (entradas/gate). El resto de categorías de
ingreso (物販収入/merchandising, Ｊリーグ配分金/distribución de liga,
移籍補償金等収入/transferencias, アカデミー関連収入/academia,
女子チーム関連収入/equipo femenino, その他収入/otros) y TODOS los costos
(トップチーム人件費, 試合関連経費, etc.) SOLO se publican como total/promedio
de división (J1/J2/J3 combinado), nunca desglosados por club individual —
confirmado con grep de texto extraído sobre las ediciones 2025 y 2018
(ninguna fila con esas categorías aparece en las tablas "por club", solo en
el Apéndice de totales/promedios de J1/J2/J3). Esto es MÁS restrictivo que
lo que decía la nota de sourcing original (que hablaba de un desglose de 7-8
categorías por club) — corregido en fuentes/Japón/_notas-generales.md en
esta misma sesión.

Consecuencia para la carga de datos: revenueLines tiene 3 líneas reales
(Sponsor, Gate, y un residual "Otros ingresos" = Total − Sponsor − Gate, que
agrupa TODO lo demás sin poder separarlo — no se inventa ninguna división
interna de ese residual, ya que el documento no la da por club). Suma exacta
al Ingreso Total impreso (8.173 M JPY), por construcción.
expenseLinesByYear queda VACÍO (no hay una sola cifra de costo real
desglosada por club en esta fuente, ni siquiera un "total costos" — se
consideró usar el promedio/total de J1 como proxy, mismo criterio explícito
del pedido original, pero se descartó: sería atribuirle a Kashima un número
que en realidad es un promedio de 18 clubes, no un dato real de Kashima,
justo lo que "Precisión antes que velocidad" prohíbe). officialTotalExpenses
y officialPAT quedan `null` — verifyTieOuts() solo corre el check de
Revenue para este club/ejercicio, honesto con lo que la fuente permite.

Moneda: JPY nativo (el documento reporta en 百万円 = millones de yenes,
ver CURRENCY_META.JPY en data/currency-map.js, scale:1). fx:150 (JPY por
USD) es un PLACEHOLDER de referencia, NO declarado por el documento (un
reporte de gestión deportiva, no un balance con anexo de moneda
extranjera) — el yen rondó ¥145-155/USD durante el año calendario 2025,
150 es un punto medio razonable para poder mostrar el toggle en USD, no
una cotización de cierre exacta.
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025 (año calendario ene-dic 2025, el fiscal year
estándar de J.League — Kashima no está en la lista de 7 clubes con cierre
marzo/junio). Página 8 (Ingreso Total) y página 9 (Sponsor) del
club_doc-2025.pdf: 鹿島 2025年度 = 8.173 (+973 vs. 2024); スポンサー収入 2025 =
3.324; página 10 (Gate) 入場料収入 2025 = 1.458.
```

## Otros

### Gastos (kashimaantlersExpenseLinesByYear), en general

```text
Sin desglose de costos por club en esta fuente (ver comentario de cabecera) — deliberadamente
vacío, no se inventa ni se usa el promedio divisional como si fuera de Kashima.
```

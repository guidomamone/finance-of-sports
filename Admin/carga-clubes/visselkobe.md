# visselkobe — evidencia de carga

Lo que había como comentario en `data/jp/visselkobe-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/jp/visselkobe-data.js — Vissel Kobe (ヴィッセル神戸). Mismo lote de carga y
misma fuente que Kashima Antlers (data/jp/kashimaantlers-data.js) — ver ESE
archivo para la metodología completa. Acá solo el detalle específico de
Vissel Kobe.

Abreviado "神戸" en las tablas del club_doc-2025.pdf.
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: 神戸 2025年度 = 8.711 (+644 vs. 2024).
Página 9 (Sponsor): 3.025. Página 10 (Gate): 1.441.
```

## Fuentes

### visselkobe-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Vissel Kobe directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/jp/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

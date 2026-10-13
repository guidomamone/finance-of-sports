# sanfreccehiroshima — evidencia de carga

Lo que había como comentario en `data/jp/sanfreccehiroshima-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/jp/sanfreccehiroshima-data.js — Sanfrecce Hiroshima (サンフレッチェ広島). Mismo
lote de carga y misma fuente que Kashima Antlers (data/jp/kashimaantlers-data.js)
— ver ESE archivo para la metodología completa. Acá solo el detalle
específico de Sanfrecce Hiroshima.

Abreviado "広島" en las tablas del club_doc-2025.pdf.
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: 広島 2025年度 = 8.348 (+313 vs. 2024,
un salto grande desde 4.198 en 2023 — el propio documento no aclara el motivo puntual,
no se especula acá). Página 9 (Sponsor): 2.792. Página 10 (Gate): 2.166.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Masayoshi Kubo (2025-01-01 a hoy): Comunicado oficial (2024-12-09): por resolución del directorio extraordinario, asume 代表取締役社長 el 2025-01-01, de vicepresidente; Shingo Senda (presidente desde 2020) sigue en el club. Aún presidente en dic. 2025 (visita al gobernador). Hijo del presidente del directorio/dueño Masataka Kubo, pero la figura de 社長 es la firmante.
```

## Fuentes

### sanfreccehiroshima-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Sanfrecce Hiroshima directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/jp/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

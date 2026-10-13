# cerezoosaka — evidencia de carga

Lo que había como comentario en `data/jp/cerezoosaka-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/jp/cerezoosaka-data.js — Cerezo Osaka (セレッソ大阪). Mismo lote de carga y
misma fuente que Kashima Antlers (data/jp/kashimaantlers-data.js) — ver ESE
archivo para la metodología completa. Acá solo el detalle específico de
Cerezo Osaka.

Abreviado "Ｃ大阪" en las tablas del club_doc-2025.pdf.
============================================================================
```

_de data/club-leagues/jp.js:_

```text
Verificado el 13/9/2026 contra "2025 J1 League" (Wikipedia): los 10 clubes cargados
jugaron J1 en 2025.
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: Ｃ大阪 2025年度 = 5.720 (+319 vs. 2024).
Página 9 (Sponsor): 2.758. Página 10 (Gate): 1.164.
```

## Fuentes

### cerezoosaka-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Cerezo Osaka directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/jp/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

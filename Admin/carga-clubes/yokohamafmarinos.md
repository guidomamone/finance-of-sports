# yokohamafmarinos — evidencia de carga

Lo que había como comentario en `data/yokohamafmarinos-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/yokohamafmarinos-data.js — Yokohama F. Marinos (横浜Ｆ・マリノス). Mismo
lote de carga y misma fuente que Kashima Antlers (data/kashimaantlers-data.js)
— ver ESE archivo para la metodología completa. Acá solo el detalle
específico de Yokohama FM.

Abreviado "横浜FM" en las tablas del club_doc-2025.pdf.
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: 横浜FM 2025年度 = 7.751 (+418 vs. 2024).
Página 9 (Sponsor): 2.871. Página 10 (Gate): 1.530.
```

## Fuentes

### yokohamafmarinos-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Yokohama FM directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

# yokohamafmarinos — evidencia de carga

Lo que había como comentario en `data/jp/yokohamafmarinos-jp-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/jp/yokohamafmarinos-jp-data.js — Yokohama F. Marinos (横浜Ｆ・マリノス). Mismo
lote de carga y misma fuente que Kashima Antlers (data/jp/kashimaantlers-jp-data.js)
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

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Akihiro Nakayama (2022-12-01 a 2026-07-01): Comunicado oficial del club (2022-11-06): Kurosawa deja el 2022-11-30 y Nakayama (hasta entonces vicepresidente) asume el 2022-12-01; figuraba como 内定/予定, y J.League y prensa lo muestran como 社長 desde entonces. Sale por fin de mandato; el relevo (Shunsuke Ashizawa) asume el 2026-07-01 (comunicado 10137 del club), por eso hasta=2026-07-01, no la fecha exacta de salida de Nakayama (probablemente 2026-06-30). Dueño: Nissan (empresa).
```

## Fuentes

### yokohamafmarinos-jp-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Yokohama FM directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/jp/kashimaantlers-jp-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

2026-10-15 (to-do 232 ab): 2025 (deuda y caja): de 0 a null. Estaban en 0 por la convención vieja ("0 = no se cargó"); sin dato no es cero. Los completa tools/caja-deuda.mjs si el documento los trae.

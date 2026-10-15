# nagoyagrampus — evidencia de carga

Lo que había como comentario en `data/jp/nagoyagrampus-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/jp/nagoyagrampus-data.js — Nagoya Grampus (名古屋グランパス). Mismo lote de
carga y misma fuente que Kashima Antlers (data/jp/kashimaantlers-data.js) —
ver ESE archivo para la metodología completa. Acá solo el detalle
específico de Nagoya Grampus.

Abreviado "名古屋" en las tablas del club_doc-2025.pdf.
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: 名古屋 2025年度 = 6.463 (▲411 vs. 2024,
el único de los 10 clubes objetivo con ingreso en BAJA este ejercicio).
Página 9 (Sponsor): 2.988. Página 10 (Gate): 1.360.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Katsuhiro Shimizu (2025-04-26 a hoy): Asumió el 2025-04-26 tras la asamblea ordinaria de accionistas y directorio ese día (nota de Akasha Shinpo del mismo día; comunicado oficial 0426post-2478 del club, que dio 403 al leerlo). Había sido anunciado como 内定 el 2025-01-11. Sale Kouki Konishi (presidente desde 2017) como Executive Adviser. Dueño: Toyota y grupo (empresa).
Duda: Konishi estuvo hasta 2025-04-26; ejercicios anteriores a esa fecha no se cargaron (solo cierre 2025).
```

## Fuentes

### nagoyagrampus-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Nagoya Grampus directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/jp/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

2026-10-15 (to-do 232 ab): 2025 (deuda y caja): de 0 a null. Estaban en 0 por la convención vieja ("0 = no se cargó"); sin dato no es cero. Los completa tools/caja-deuda.mjs si el documento los trae.

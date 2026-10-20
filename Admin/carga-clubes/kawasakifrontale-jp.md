# kawasakifrontale — evidencia de carga

Lo que había como comentario en `data/jp/kawasakifrontale-jp-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/jp/kawasakifrontale-jp-data.js — Kawasaki Frontale (川崎フロンターレ). Mismo lote
de carga y misma fuente que Kashima Antlers (data/jp/kashimaantlers-jp-data.js) —
ver ESE archivo para la metodología completa. Acá solo el detalle
específico de Kawasaki Frontale.

Abreviado "川崎Ｆ" en las tablas del club_doc-2025.pdf. Junto con Urawa, el
primer club en superar los ¥10.000M de ingreso (¥10.069M en 2025).
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: 川崎Ｆ 2025年度 = 10.069 (+1.666 vs. 2024).
Página 9 (Sponsor): 3.765. Página 10 (Gate): 1.469.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Akihiro Yoshida (2022-04-08 a hoy): Comunicado oficial: decidido en la asamblea de accionistas y directorio del 2022-04-08, de vicepresidente a 代表取締役社長, reemplazando a Yoshihiro Warashina. Aún presidente en oct. 2024 (sitio del club). No se verificó que siga en 2026 pero cubre el cierre 2025 sin cambios reportados. Dueño: Fujitsu (empresa).
Duda: No se buscó confirmación expresa de que Yoshida siga hoy (hasta=null por falta de noticia de cambio). La búsqueda no devolvió ningún cambio de presidente en 2025.
```

## Fuentes

### kawasakifrontale-jp-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Kawasaki Frontale directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/jp/kashimaantlers-jp-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

2026-10-15 (to-do 232 ab): 2025 (deuda y caja): de 0 a null. Estaban en 0 por la convención vieja ("0 = no se cargó"); sin dato no es cero. Los completa tools/caja-deuda.mjs si el documento los trae.

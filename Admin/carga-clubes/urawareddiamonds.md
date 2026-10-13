# urawareddiamonds — evidencia de carga

Lo que había como comentario en `data/jp/urawareddiamonds-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/jp/urawareddiamonds-data.js — Urawa Red Diamonds (浦和レッズ). Mismo lote de
carga y misma fuente que Kashima Antlers (data/jp/kashimaantlers-data.js) —
ver ESE archivo para la metodología completa (qué desglosa el documento por
club vs. solo por división, por qué expenseLinesByYear queda vacío, y el fx
placeholder). Acá solo el detalle específico de Urawa.

Urawa abreviado "浦和" en las tablas del club_doc-2025.pdf. Es el club de
MAYOR ingreso de la liga en 2025 (113 億円/¥11.310M, el primero en superar
los ¥10.000M junto con Kawasaki Frontale — ver Admin/sourcing/Japón/Urawa Red
Diamonds.md).
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: 浦和 2025年度 = 11.310 (+1.099 vs. 2024).
Página 9 (Sponsor): 4.195. Página 10 (Gate): 2.214.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Makoto Taguchi (2023-02-01 a 2026-07-01): La fuente (nota de 2022-12-20 sobre el anuncio del club) dice que asume el 2023-02-01 en lugar de Yoichi Tachibana. Fecha anunciada como prevista; no se vio el comunicado posterior de efectivización, pero la prensa y el club lo tratan como presidente desde 2023 (visita al gobernador 2023-03-24). Deja el cargo el 2026-07-01 (anuncio del club 2026-06-12; lo reemplaza Minoru Shimizu). Dueño: Mitsubishi Motors/grupo, empresa, por eso se carga al 代表取締役社長.
```

## Fuentes

### urawareddiamonds-jleague-doc-2025

_note (data/):_

```text
Documento publicado por la propia J.League (no por Urawa directamente), como parte de su Club Licensing System — cubre los 60 clubes de J1/J2/J3. Copia local en Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.pdf (carpeta compartida por los 10 clubes de Japón cargados). Ingreso Total/Sponsor/Gate son cifras reales por club (págs. 8-10); el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división J1/J2/J3, no por club individual (ver comentario completo en data/jp/kashimaantlers-data.js). fx:150 JPY/USD es placeholder de referencia, no declarado por el documento.
```

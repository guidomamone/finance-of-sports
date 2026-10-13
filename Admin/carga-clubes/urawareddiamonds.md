# urawareddiamonds — evidencia de carga

Lo que había como comentario en `data/urawareddiamonds-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/urawareddiamonds-data.js — Urawa Red Diamonds (浦和レッズ). Mismo lote de
carga y misma fuente que Kashima Antlers (data/kashimaantlers-data.js) —
ver ESE archivo para la metodología completa (qué desglosa el documento por
club vs. solo por división, por qué expenseLinesByYear queda vacío, y el fx
placeholder). Acá solo el detalle específico de Urawa.

Urawa abreviado "浦和" en las tablas del club_doc-2025.pdf. Es el club de
MAYOR ingreso de la liga en 2025 (113 億円/¥11.310M, el primero en superar
los ¥10.000M junto con Kawasaki Frontale — ver fuentes/Japón/Urawa Red
Diamonds.md).
============================================================================
```

## 2025

### Ingresos

```text
Millones de JPY, Ejercicio 2025. Página 8: 浦和 2025年度 = 11.310 (+1.099 vs. 2024).
Página 9 (Sponsor): 4.195. Página 10 (Gate): 2.214.
```

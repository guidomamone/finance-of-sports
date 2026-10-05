# HALLAZGOS del pipeline: lo que se midió y no entró

Ideas que se probaron con casos reales y se descartaron, con el porqué, para no volver a probarlas. Una línea por hallazgo; el
detalle de cada medición está en `Admin/CHANGELOG.md`. El proceso vigente está en `Admin/PIPELINE.md`.

- **Elegir filas por palabras clave** (la etapa vieja): reproduce los ingresos ya cargados en 7-11% de los años. Por eso existe el proceso nuevo.
- **Localizar por páginas enteras:** descartado; un estado puede empezar a mitad de página.
- **Una sola escala por documento:** descartado; la nota puede estar en miles y el estado en unidades (1. FC Köln).
- **Escala por "plausibilidad" contra otros años del club:** inútil con inflación y años en otra moneda (Racing).
- **Heurística de encabezados para el tipo de cambio:** 4 errores en 17 documentos. Se saca.
- **"Las notas por segmento nunca se eligen":** descartada. En UC el desglose de "Ingresos Comerciales" solo está en la nota de segmentos.
  Reemplazo: un cuadro por segmento se usa si la columna de un segmento desglosa un renglón (y tiene que sumar).
- **Cierre de notas sumando todo** (la versión vieja de `verificar.mjs`): contaba dos veces los cuadros de detalle (UC, Betis, Athletic) y
  aceptaba notas que no cerraban por la tolerancia de 0,5% (Chapecoense).
- **Caja y deuda, escalón "cada guion como 0 en su columna"** (`caja-deuda.mjs`, 2026-10-05): `--medir` idéntico en todos los clubes y ningún dato nuevo. Donde el guion daba con qué comparar, la compuerta rechazó con razón: la deuda cambió de renglón entre años (Novorizontino 2020: la fila de 2020 tiene "-" en 2019, que tiene 32,32 cargado; Fortaleza 2023: "-" en el documento 2024). El guion no era lo que frenaba.

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
- **Caja y deuda, "vecino por importe"** (`caja-deuda.mjs`, 2026-10-05): si ningún vecino tiene la misma familia, buscar el importe exacto (tolerancia del redondeo impreso) en el balance del documento anterior o siguiente. `--medir`: 5 datos nuevos en años cargados, 2 iguales y 3 distintos (Elche 2024 deuda 10,40 contra 13,13; São Paulo 2023 9,83 contra 217,53; Palmeiras 2024 caja 1,33 contra 38,36); además, Novorizontino 2018 deuda = 2 (es 27,51). Emparejar por etiqueta también controla que sea la misma fila; por importe solo controla la lectura, y una fila mal elegida pasa igual.
- **Caja en las notas** (`caja-deuda.mjs`, 2026-10-05): si el balance no tiene fila de caja, proponer la única fila de caja de las notas. En su propio caso (Fortaleza 2020-2022) propuso 2.483 / 5.073 / 2.152: la fila "Caja" de la nota de efectivo (caja chica, una parte del efectivo; el efectivo es "Efectivo" 20.036 en 2021) y con la escala corrida. Pasó la compuerta porque cada año se comparó contra el anterior que la misma corrida acababa de aceptar.

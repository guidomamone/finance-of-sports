# Mejorar un script del pipeline (secciones 3b y 5)

*Se abre al arreglar o sumar una tool del pipeline y medir el cambio. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

### b) Mejorar un script

1. Mirar 2-3 casos reales antes de afirmar la causa.
2. El diseño no se le muestra a Guido: lo decide el lote. Un cambio es un escalón que se suma delante o al lado del camino que ya existe (el viejo queda de respaldo), no una regla que lo reemplaza. El veredicto de la sección 8 de `auditoria-finance-of-sports` dice si es general o un parche: si el patrón está en 1 o 2 documentos, en un solo club o en un solo año, no se toca el código y va como ajuste a `Admin/registros/ajustes-manuales.jsonl`. Se commitea cuando el lote da idéntico o cada diferencia está explicada; si da mal, se revierte. Un valor aceptado antes que cambia o se pierde pide una razón escrita. Una condición nueva (un frenazo, aviso, filtro o pregunta en una tool, o un cambio en lo
   que asume) también va a la Auditora, que la decide con la sección 7 de `auditoria-finance-of-sports`; a Guido va solo lo que la
   Auditora manda a votación o lo que cambia ese criterio (`Admin/CONVENCIONES.md`).
3. Medir antes y después con los lotes de prueba (sección 5).
4. Un commit por cambio. La tool lleva cabecera y comentarios largos; `Admin/PIPELINE.md` queda al día.

## 5. Lotes de prueba (medir CUALQUIER cambio de script antes y después)

**No hay excepción: sin medición no se commitea un cambio a una tool del pipeline** (un hook rechaza el commit; `[sin-medicion]` solo con el ok de Guido). Se mide con `node tools/fos.mjs medir pipeline` (en segundo plano): toma de git las tools editadas, elige medidor y lote por `tools/pipeline-tools.json` y anota `Admin/registros/mediciones-pipeline.jsonl`; una diferencia se explica con `--explicacion "…"`; una tool nueva del pipeline se suma a esa tabla. Qué lote (lo aplica la tool; esto es el criterio): el CHICO (`prueba-rapida.txt`) siempre primero; el MEDIANO si el cambio está acotado a una etapa o a una familia de formato y el chico dio idéntico; el COMPLETO si toca lógica compartida (categorías, perímetro, escala o tipo de cambio, signos, parser común de tablas, `publicarCambios()`), si el mediano mostró cualquier diferencia o antes de cerrar un punto del TODO. Si el cambio apunta a un país o formato, además todos los documentos de esa familia (al menos 3). El resultado, «idéntico» o cada diferencia explicada, va a la entrada de CHANGELOG.

Lo cargado tiene que dar idéntico. Tres listas, sin repetidos: `Admin/lotes/prueba-rapida.txt` (a mano: los casos que ya rompieron
algo una vez, cada uno con su motivo en un comentario), `Admin/lotes/prueba-mediana.txt` (la rápida + 3 documentos por club: el más viejo,
el del medio y el más nuevo) y `Admin/lotes/prueba-completa.txt` (todos los documentos con verificación). Las tres las
regenera solo `tools/lotes-prueba.mjs` al cerrar cada carga, estratificadas por familia (país × formato × época × moneda × deporte): la rápida suma a lo
que está a mano un documento de cada familia (un caso nuevo que rompió algo va a la mano, con su motivo). La regla de cobertura (3 documentos de cada familia
afectada) la aplica `medir-pipeline`; `audit.js` avisa `lote-prueba-desfasado` si las listas dejan de cubrir lo cargado.

Además, según lo que toque, en la tabla hay otros medidores (`caja-deuda --medir` y `--personal --medir` en TODOS los clubes, `audit.js` sobre el sitio, el ensayo del
conversor XHTML, el de altas). Lo que no se puede ejercitar con lo cargado se simula en el scratchpad con copia de seguridad de `Admin/` y se restaura. Una medición
retroactiva de lo ya commiteado: `--base <commit anterior>`.

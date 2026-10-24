<!-- md: el brief con el que un subagente Sonnet contesta, en JSON y con cita, las preguntas de la cola de revisión de UN documento | leer: al lanzar revisores de la cola (node tools/cola.mjs), antes de armar el prompt del subagente -->
# Brief del revisor de la cola (un subagente por documento)

Probado en `Admin/mediciones/449-revisores-agrupados.md`: un revisor con todas las preguntas de UN documento cuesta unos 10 mil tokens por pregunta y tarda de 20 a 35 segundos; uno por pregunta cuesta unos 72 mil. Cómo se usa:

1. Armar el archivo de preguntas del documento: una lista JSON con `id`, `md`, `pagina`, `lineas`, `motivo`, `detalle`, `pregunta` y `propuesta_del_sistema` de cada caso pendiente (`node tools/cola.mjs --lista Admin/lotes/lote-NN.txt` los lista).
2. Lanzar un subagente Sonnet por documento (no más de 8 a 10 preguntas cada uno) con este brief, la ruta del archivo de preguntas y la ruta donde escribe sus respuestas (Write). El prompt lleva la regla de comandos: «Leé con Read y escribí con Write. Bash solo para comandos simples con la ruta completa entre comillas, sin variables, sin cd, sin ; ni &&.»
3. Contestar en la cola con `node tools/cola.mjs --responder <id> <decisión> [--valor "…"] --evidencia "<md>:<desde>-<hasta>" --seguridad <alta|media|baja> --causa <…>` (esquema de `tools/esquemas-registros.json`). Las respuestas con `seguridad: baja`, y las que corrigen lo que el sistema proponía, se miran antes de contestarlas.

---

Sos un revisor de un proyecto que carga los balances de clubes de fútbol a un sitio público. Un sistema automático leyó la transcripción (un `.md`) de un balance y dejó DUDAS. Tu trabajo: contestar cada pregunta que te toque mirando el documento, con una cita.

## Qué te toca
Un archivo JSON con una lista de preguntas. Cada una trae: `id`, `md` (la transcripción), `pagina`, `lineas` ([desde, hasta] del `.md` donde está la duda), `motivo`, `detalle`, `pregunta` y `propuesta_del_sistema` (lo que el sistema propone, normalmente «sí»).

## Qué abrir (y nada más, salvo que lo necesites para decidir)
1. El `.md` de cada pregunta, en las líneas indicadas y 40 líneas antes y después (Read con `offset` y `limit`; los `.md` son enormes: no los leas enteros).
2. El estado de resultados del mismo documento si la pregunta habla de ingresos o gastos (buscalo con Grep por palabras como «Revenue», «Turnover», «Ricavi», «Profit and loss»).
3. Para criterios, `Admin/CONVENCIONES-DATOS.md`: Grep por una o dos palabras de la pregunta y leé solo los renglones que salgan.

## Cómo se decide
- Las preguntas del tipo «¿Se carga/incluye/deja afuera X?» con propuesta «sí»: respondé `aceptar` si el sistema tiene razón, `corregir` con `valor: "no"` si no la tiene (o `valor` con lo que corresponda si la pregunta pide otra cosa).
- Una lista «stated after charging/(crediting)» o una nota informativa que no suma el total NO es un desglose del total; un cuadro que sí suma exacto el total SÍ lo es.
- Si de verdad no podés decidir con el documento, respondé `aceptar` con `seguridad: "baja"` y explicá en `nota` qué falta.
- No inventes: si citás una línea, tiene que existir en el `.md` y decir lo que decís.

## Cómo devolver la respuesta
Escribí con Write UN archivo JSON (la ruta te la dan) con una lista, una entrada por pregunta, exactamente así:

```json
[ { "id": "<el id>", "decision": "aceptar | corregir", "valor": null,
    "evidencia": { "md": "<ruta del .md>", "lineas": [desde, hasta] },
    "seguridad": "alta | media | baja",
    "causa": "lectura-del-documento | regla-escrita | precedente-del-club | otra",
    "nota": "una frase: qué viste" } ]
```
`valor` es `null` si aceptás y el texto de la corrección si corregís.

Al terminar, contestá solo con: cuántas preguntas respondiste y la ruta del archivo.

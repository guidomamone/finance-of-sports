# Cargar con tokens de sesión

**Cuándo.** Guido lo pide («con tokens», presupuesto de API en cero), o una etapa paga falló en un documento y rehacerla no vale. Reemplaza localizar, extraer, Jev,
Claude de la etapa 7 y `primer-anio-ia`. No reemplaza transcribir, validar, verificar, cargar ni la cola. Se lee el `.md` (la transcripción), nunca el PDF. Si un
número no se lee con seguridad, no se inventa: se deja afuera y va a `dudas` de la especificación, con su línea.

**Antes.** El `.md` está transcripto y validado (`node tools/estado.mjs`). El club tiene los ajustes que el lote exige antes de localizar: `cierre` del documento y
`perimetro` si trae consolidado e individual (`node tools/antes-de-localizar.mjs --lista <lista>` lo dice, gratis). La lista es `Admin/lotes/lote-NN.txt`, con el
número que da la principal.

**1. Los bloques.** `node tools/indice-bloques.mjs "<pdf>" --json` (gratis) da cada tabla con su id (`b3`), página y líneas. Leé con `Read` (offset y límite) las líneas
del estado de resultados y de las notas que desglosan ingresos y gastos. Elegí qué bloques son el `estado`, las `notas_ingresos` y las `notas_gastos`. Qué elegir y qué
no: las reglas de `SYSTEM` en `tools/localizar.mjs` (no el balance, ni el flujo, ni presupuestos, ni conciliaciones de impuestos, ni cuadros por jugador; un cuadro por
segmento solo si la columna de un segmento abre un renglón que nadie más abre).

**2. La especificación y los dos archivos.** Escribí la especificación en un JSON del scratchpad de la sesión (ruta entera, nunca `/tmp`). Los campos están en la
cabecera de `tools/armar-a-mano.mjs`: ids de bloques, escala de cada bloque con la frase impresa, moneda, columnas, perímetro, y las filas (`bloque`, `linea`,
`etiqueta`, `actual`, `anterior`, `tipo`, `lado`, `detalla_a`) con los importes TAL CUAL impresos, más los totales y el resultado impresos. No se suma, no se convierte, no
se categoriza; todas las filas con importe, en orden. Después:
```
node tools/armar-a-mano.mjs <especificacion.json>              ensayo: valida cada fila contra el .md y dice qué escribiría
node tools/armar-a-mano.mjs <especificacion.json> --escribir   escribe .ubicacion.json y .filas.json (con sus huellas) y el ajuste filas-a-mano
```
El ensayo frena con la lista de problemas (fila fuera de su línea, bloque no elegido, `detalla_a` que no es etiqueta de otra fila, falta una escala); se corrige la
especificación y se repite. No se escriben los `.json` a mano.

**3. Verificar (gratis).** `node tools/verificar.mjs "<pdf>" --rubros`. Tiene que cerrar: los renglones suman el resultado impreso, el año anterior coincide con el
cargado, los desgloses suman. Si no, se corrige la especificación y se vuelve a armar, o se resuelve con un ajuste (`fila`, `desglose`, `resultado-final`, `escala`,
`categoria`, `incluye`) o con la cola. Deja el `.verificacion.json` y el `.rubros.json` (rubro, lado, página, sección): la lista que se categoriza.

**4. Jev, desde la sesión.** `node tools/jev-categorizar.mjs --listos --desde-sesion <jev.json> --lista <lista>`, con
`{"pdf":"<pdf>","respuestas":[{"label":"<etiqueta del .rubros.json>","choice":"<categoría>","confidence":0.5}]}`: UNA respuesta por cada rubro único del `.rubros.json` (si
falta uno o una categoría no existe, no escribe nada y dice cuáles). Se contesta con confianza **0,5**, por debajo del 0,90 con que se acepta a Jev: así la decisión de
cada rubro la toma el paso 5, donde se mira el `.md` y queda registrada.

**5. Claude, desde la sesión.** Primero `node tools/categorizar-claude.mjs --listos --dry-run --lista <lista>`: dice cuántos rubros van a «Claude» (el resto lo decide el
precedente del club, gratis). Esos se contestan con **el `.md` a la vista**, uno por uno, con la skill `club-data-mapping` (muchos: un subagente Sonnet por club, sin
Bash, con las líneas del `.md` y el `.rubros.json`). Después:
`node tools/categorizar-claude.mjs --listos --desde-sesion <claude.json>` con
`{"pdf":"<pdf>","respuestas":[{"label":"<etiqueta>","categoria":"<categoría>","confianza":0.9,"motivo":"<una frase>"}]}`. Si falta un rubro que quedaba para Claude, no
escribe nada y dice cuáles. **La confianza es real:** lo que se conteste con 0,80 o más entra a `Admin/registros/categorias-aprendidas.jsonl` y es precedente del club
para todos sus años (con 0,90 o más decide solo); lo dudoso se contesta por debajo de 0,80, y va a la cola. Una fila que no es un rubro se resuelve en la cola
(`cola.mjs --corregir-categoria … no_es_rubro`), no acá.

**6. El lote, sin API.** Ensayo: `node tools/lote.mjs --lista Admin/lotes/lote-NN.txt` (gratis). Después, en segundo plano:
`caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar --sin-api` (con `--cargar` si todo queda listo). `--sin-api` corre todo lo gratis y frena,
documento por documento, donde llamaría a una API: lo ya escrito por la sesión sigue de largo. Dos frenos se resuelven acá: **el primer año de un club**
(`node tools/primer-anio-ia.mjs --lista <lista> --exportar <carpeta del scratchpad>`, lo contesta un subagente, y `--importar <carpeta>`) y las **categorías que
faltan** (volver al paso 4 o 5). La cola la contesta un subagente, como siempre.

**7. Antes de dar el año por bueno.** La propuesta de `cargar.mjs` sin motivos de freno; ingresos, gastos y resultado contra lo impreso; `?audit=1` en el sitio;
`node tools/audit.js --quiet` en 0 P0 y 0 P1. **En el primer uso de `--sin-api`, mirar a mano la etapa 7 y el primer año** (qué decidió el precedente, qué se contestó
con qué confianza, qué quedó en la cola).

**Qué queda registrado:** el ajuste `filas-a-mano`, los dos `.json`, las líneas nuevas de `categorias-aprendidas.jsonl`, las respuestas de la cola, la evidencia
`Admin/carga-clubes/<club>.md` (la escribe `cargar.mjs`) y el mensaje del commit, que dice «con tokens de sesión».

**Si algo no se puede sin tocar `tools/`:** una línea en `Admin/registros/frenados-por-script.jsonl` y se sigue con el resto.

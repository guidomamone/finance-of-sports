# Correr clubes con el pipeline (sección 3a)

*Se abre al correr un lote, cargar un año o dar de alta un club. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

### a) Correr clubes

1. La etapa 2 (transcribir con Mistral y validar el inventario: primero la validación gratis, y solo las páginas dudosas se pagan) la hace `tools/pipeline.mjs`, no el lote: `lote.mjs` saltea los PDFs sin `.md` y
   arranca en la etapa 3. Ensayo: `node tools/pipeline.mjs --dir "Clubes/<País>/<Club>" --max-paginas 0 --limit 0`; la sesión
   corre lo mismo con `caffeinate -i` y `--ejecutar`, dentro de su presupuesto (`Admin/CONVENCIONES.md`). `--max-paginas 0` incluye los PDFs de más de 100 páginas (sin él quedan para el
   final). El costo es el del ensayo (cuenta páginas); el de `estado.mjs` es fijo por documento y subestima los PDFs largos.
2. Armar la lista (`Admin/lotes/lote-NN.txt`). Club nuevo (alta): un solo ejercicio en el lote, el más reciente que traiga estado de resultados completo. Cuando el alta esté hecha y la cola de ese año contestada, el resto de los años va en el lote siguiente, donde las respuestas del primero ya sirven de precedente y no se repiten las preguntas. Club que ya está en el sitio: todos los años de la etapa más baja juntos. Un documento sin
   estado de resultados (informe del auditor, memoria sola) no va a la lista: se le propone a Guido para `Admin/registros/documentos-descartados.txt`
   (el lote los saltea) y entra ahí solo con su ok. Un balance de menos de 12 meses (le falta el otro tramo del ejercicio) tampoco va a
   la lista: va a `Admin/registros/documentos-parciales.txt` con lo que cubre y lo que falta, también con su ok. Antes de crear la lista, `ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -3` y tomar el
   número siguiente; nunca reusar uno. Al cerrar un lote, su lista va a `Admin/Archive/lotes/`.
3. Club nuevo: el lote fija el perímetro solo (`perimetro-senales.mjs`, con la regla de `Admin/CONVENCIONES-DATOS.md`) y deduce el
   cierre de los documentos vecinos. `node tools/antes-de-localizar.mjs --lista <lista>` dice qué falta (gratis). Un ajuste a mano
   (`node tools/ajustes.mjs`) solo para lo que el lote frena e imprime, antes de localizar, para no pagar dos veces la localización.
4. Ensayo: `node tools/lote.mjs --lista Admin/lotes/lote-NN.txt` (gratis). Decirle a la principal qué etapa toca, para qué sirve y cuánto cuesta.
5. La sesión corre `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar` en segundo plano, y con `--cargar` si lo que quede listo se
   escribe en esa misma corrida (`tools/cargar-lote.mjs`: alta del club, un commit por año; si ningún año entra, revierte el alta). Si el
   final del lote pide `--reintentar`, va con una lista que tenga SOLO los documentos que lo necesitan, y se lo digo.
6. Leer el resultado: la salida del lote (no la terminal entera), `Generados/`, `estado.mjs` y `cola.mjs`. Mostrarlo en un solo mensaje,
   con una tabla etapa · ejercicios · qué significa la etapa · qué falta (solo lo pendiente: los cargados y descartados van en una línea
   aparte), y las decisiones numeradas con la recomendación al lado.
7. Lo que frena se resuelve en este orden: un ajuste manual (gratis, sin preguntar); la cola, que contesta un subagente (ver "La cola" en la sección 4); si es
   un defecto de un script, se anota en `Admin/registros/frenados-por-script.jsonl` (pdf, defecto, detalle, sesión, fecha; lo que una tool ya registra sola con su causa, como el costo de personal, se ve con `node tools/fos.mjs causas`), se deja ese
   documento y se sigue con el resto. Lo arregla la sesión de pipeline, la única que edita `tools/` (`Admin/CONVENCIONES.md`, "ONBOARDING
   CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA"). Si un año sigue frenado por datos (no cierra, casos de la cola sin precedente, o iría a
   `Admin/dudas-por-club.md`), antes de dejarlo el caso va a la Auditora, que lo clasifica: (a) ajuste con precedente, que Onboarding carga;
   (b) criterio nuevo, a votación; (c) recién ahí, al club (`Admin/CONVENCIONES.md`, «Antes de frenar un año, la Auditora»). En un caso de categoría de la cola, `descartar` se rechaza: para sacar la fila es
   `corregir --valor no_es_rubro`, y vale solo para ese documento. Un ajuste manual lo firma quien corre `tools/ajustes.mjs` (Claude si lo
   corre Claude Code, Guido si no; `--autor` lo fuerza).
8. Escribir: lo que el lote dejó listo entra con `--cargar`. Lo que no, a mano: `node tools/cargar.mjs "<pdf>" --desde-verificacion --escribir`, un commit por año (club nuevo: `alta-club.mjs` en el mismo
   commit que su primer año). Después caja y deuda: `node tools/caja-deuda.mjs --club <id>` (ensayo); `--ejecutar --escribir` lo corre
   la sesión si el ensayo gratis entra en el presupuesto; si no, se frena y se avisa a la principal.
   Club nuevo: antes de cargar su primer año, un subagente Sonnet revisa contra el documento lo que propuso el alta (nombre legal, tipo
   de documento y fecha de cierre); lo que esté mal se corrige con un ajuste (`name`, `reportType`, `cierre`). Si el nombre legal quedó
   como pregunta en la cola (la portada y lo más frecuente no coinciden), el subagente propone la respuesta con cita del documento. Se
   commitean todos los archivos que lista "Alta escrita (...)", también `data/currency-map.js`.

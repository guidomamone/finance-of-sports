# Reglas para transcribir UN PDF digital a Markdown (finance-of-sports)

Proyecto en /Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports. Hay procesos del pipeline corriendo: NO corras pipeline.mjs,
lote.mjs ni inventario-transcripciones.mjs, y no toques Admin/ ni ningún otro archivo que no sea tu .md.

- Salida: el mismo nombre del PDF con .md, al lado del PDF (archivo nuevo).
- Fuente: `pdftotext -f N -l N -layout "<pdf>" -` página por página (N = 1..páginas). Si una página no trae texto (es una imagen),
  renderizala con `pdftoppm -r 150 -f N -l N -png "<pdf>" <scratchpad>/<nombre>-pN`, leé la imagen con la herramienta Read y transcribila igual
  (con sus totales confirmados); "[página sin texto]" solo si la página está realmente en blanco.
- TODO el documento en orden, sin resumir ni saltear (también prosa, firmas, notas). Antes de cada página, `--- pág. N ---` en su propia
  línea, con una línea en blanco antes y después (N = página del visor).
- Tablas (balance, estado de resultados, flujo de caja, cambios en el patrimonio, notas) como tablas Markdown `| a | b |` con la fila
  `| --- | --- |`, con TODAS sus columnas en el orden impreso (años, número de nota). Títulos como `#`/`##`.
- Cada número en la COLUMNA que le corresponde según el layout (año actual / anterior / nota): no conviertas las tablas con un script
  automático; si una etiqueta ocupa varias líneas en el PDF, va completa en la primera celda de su fila. Revisá fila por fila los estados
  principales (balance, resultados, flujo, patrimonio) contra el layout antes de terminar.
- Números EXACTAMENTE como impresos: mismo separador de miles, misma coma o punto decimal, mismo signo ("-" o paréntesis), sin redondear
  ni convertir. Ilegible o glifo roto: `[ilegible]`. Nunca inventes ni completes.
- Si pdftotext parte una cifra en pedazos ("6443 8", "-1 13 6 2 8") o la corta en dos líneas, escribila ENTERA como está impresa
  (64 438, -113 628), confirmada con la suma o el total de su tabla; si no se puede confirmar, dejala partida con [verificar]. Decí en
  tu respuesta cuáles uniste (el comparador las va a marcar como faltantes).
- No traduzcas ni normalices: el texto va en el idioma original y con los caracteres tal como los da pdftotext (no cambies ō por õ, etc.).
- Al terminar corré estos dos chequeos y corregí hasta que den bien:
  1. `node tools/check-transcripcion-fidelidad.js "<md>"` (0 P1 y 0 P2; un P3 de páginas cortas está bien).
  2. `node Admin/transcripcion-subagentes/comparar-numeros.mjs "<pdf>" "<md>"` — tiene que dar "0 no". Si una página tiene números que no están en el PDF, releé esa
     página y corregilos.
- Devolvé en 3 líneas: páginas escritas, resultado de los dos chequeos, dudas.

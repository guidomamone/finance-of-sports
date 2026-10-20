# Boceto to-do 316: vigilar un portal una vez por mes (Noruega)

Solo un boceto, sin programar ni armar la tarea. Se apoya en `tools/listar-brreg.mjs` (to-do 315, ver
`crawl4ai-noruega-lista.md`).

**Idea.** Una vez por mes corre el script sobre las entidades de Noruega que ya están en el proyecto. El script pide por `HEAD` los
años que publica el portal (2008 hasta el año en curso), compara contra una lista de "ya vistos" y escribe solo lo nuevo.

**Pasos.**
1. Entrada: la lista de entidades (club, orgnr) sale de `Admin/sourcing/Noruega/*.md` o de un JSON chico al lado del script. Hoy
   está fijada adentro del script.
2. El script pide `HEAD` por cada `<orgnr>/<año>`; con 5 pedidos en paralelo tardaría menos de un minuto por club.
3. Lo compara con `Admin/sourcing/Noruega/vistos.json` (entidad y años ya vistos en el portal) y se queda con las diferencias:
   un año que antes daba 404 y ahora 200.
4. Si hay diferencias, agrega una línea por candidato a `Admin/sourcing/README.md` ("Noruega, <club>, <año>, link `kopi/...`"),
   que es donde Guido ya deja los links, y actualiza `vistos.json`. Si no hay nada, no escribe nada.
5. Recién ahí, una sesión normal baja el PDF y sigue el pipeline. El vigilante NO baja ni carga.

**Cuándo mirar.** Un portal que publica un ejercicio por año no necesita más que un chequeo mensual (la fecha exacta en que
Noruega deposita no se verificó).

**Qué no resuelve.** Detecta ejercicios nuevos de entidades que ya conocemos, no clubes nuevos. Y como ya hay PDFs bajados que no
están cargados (63 en estas 6 entidades), hoy el cuello es cargar, no encontrar; vigilar rinde después de ponerse al día.

**Dónde corre.** Una tarea programada con `tools/ejercicios-nuevos.mjs` en el mismo lugar (to-do 252). Un portal que necesite
navegador (donde Crawl4AI sí cuenta) pediría otro script de lista, no cambiaría el resto.

**Cuándo no vale.** Si Guido prefiere seguir pasando links a mano, esto no agrega nada; es solo para portales con URL predecible.

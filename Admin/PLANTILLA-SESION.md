<!-- md: las reglas fijas con las que se arranca una sesión de trabajo (comandos de Bash, medir y commitear): lo que antes se pegaba en cada prompt | leer: al empezar una sesión de trabajo y cuando el hook rechaza un comando -->
# Reglas fijas de una sesión

El prompt de cada sesión trae solo la lista de puntos, las restricciones de esa sesión (sin push, sin API paga, qué puntos no tocar) y, si quiere otro, el cierre (el de siempre está al final de este archivo). Lo de abajo no se repite en el prompt: está acá y lo aplica `tools/hooks/pre-tool.mjs`.

## Comandos de Bash

- Nada de `cd … &&` ni `cd …;`: se escribe la ruta completa; `git` y `node` corren directo desde la carpeta de la sesión.
- Nada de `$VAR`, `${…}` ni `$(…)` en un comando (salvo el heredoc de `git commit`). Un texto que lleva `${…}` no va por la línea de comandos: se escribe con Edit o Write.
- Nada de `/tmp`: para un archivo temporal, la carpeta de scratchpad que da el sistema.
- Nada de `node -e`, `node -p` ni `python -c`: un script de una sola vez se escribe con Write en el scratchpad y se corre con `node <ruta completa>` (`python3 -I <ruta completa>`).
- Editar un archivo: Edit o Write; `fos reemplazar` para el mismo cambio en varios archivos limpios. Antes de crear un archivo, mirar si existe (una lista de lote nueva: `node tools/fos.mjs lote-nuevo`).

## Medir y commitear un cambio a una tool del pipeline

00. **El orden de un cambio de tool, siempre el mismo:** (1) ensayo gratis (sin `--escribir`) sobre TODOS los datos reales que la tool usa, no sobre un año; (2) arreglar y repetir el ensayo hasta que no haya sorpresas; (3) medir UNA vez (`cerrar-tool`); (4) recién ahora escribir datos reales. Una tool que escribe datos (`cargar.mjs`, `siis-estado.mjs`) se niega a escribir si hay tools del pipeline cambiadas sin medir (`tools/exigir-medida.mjs`; `fos que-pide` dice cuáles): no se la saltea, se mide. Un arreglo de la tool después de medir obliga a medir de nuevo, así que no se commitea ni se mide una versión a medias.
0. Los pasos 1 y 2, en orden y en un solo comando (en segundo plano): `node tools/fos.mjs cerrar-tool --cambio "…" (--patron "…" | --sin-documentos "…") [--explicacion "…"]`; no commitea nada. Antes: los datos y registros commiteados, con `git add <rutas>` y `git commit` (sin `-A` ni `.`: el hook mira solo lo que va en el commit, así que un commit de datos pasa aunque haya tools sin medir). Si `publicar.mjs` regeneró el sitio, esos archivos también van en un commit de datos antes de medir.
1. Se mide antes y después con `node tools/fos.mjs medir pipeline` (en segundo plano; con `Admin/registros` y `Generados` commiteados antes de medir). El chequeo de nombres del veredicto corre antes y frena en segundos. Mientras mide no se edita nada trackeado ni se corren tools que escriben registros (`estado.mjs`, `inventario-transcripciones.mjs`, `publicar.mjs`, `cola --responder`, `ajustes --agregar`, `lote --ejecutar`): se niegan solas.
2. El veredicto: `node tools/fos.mjs patron --cambio "…" --patron "<regex sobre los .md>" --escribir` (o `--en-xhtml "<regex>"` si el patrón se ve en el `.xhtml`, o `--sin-documentos "por qué no lee documentos"` si el cambio no lee documentos). Una condición nueva que la sesión revisó sola: `--revision propia`.
3. Una tool nueva se registra en `tools/fos-comandos.json` si una sesión la corre a mano, y se clasifica en `tools/pipeline-tools.json`.
4. Antes de commitear: `node tools/indice-md.mjs --escribir` y `node tools/audit.js` en P0 0 y P1 0. Si cambia un dato publicado: `node tools/publicar.mjs` antes del commit y el trailer `Corrige:`.
5. Cada commit con cambios de tools lleva su entrada en `Admin/CHANGELOG.md` con las tools en el título; el último bullet empieza con `Medición:` (máximo 1500 caracteres).
6. Las skills y `CLAUDE.md` van en un commit aparte; cuando el hook dice que un commit cambia texto que Guido lee, se abre el diff con `show_pane` (pane diff, el SHA) antes de seguir.
7. Cerrar el punto: `node tools/fos.mjs cerrar <id>` solo revisa; `--cerrar --verificado "qué se miró y dónde quedó"` lo cierra cuando se cumple. Un punto que quedó a medias NO se cierra: se escribe HECHO y QUEDA en su cuerpo.

## Cierre de cada turno

Cada turno de trabajo cierra con un resumen corto y estos encabezados, SIEMPRE, en este orden y con estas palabras exactas:

1. **Lo que leí en vano y era evitable con un mejor proceso:**
2. **¿Algo que la tool pudo haber impreso que te habría ayudado?** (sin cosas muy de nicho ni que puedan confundir si el caso es otro)
3. **Te toca a vos:** numerado y con tu recomendación, o «nada».
4. **To dos que podría abrir a partir de cosas que vi mientras trabajaba:** mejoras de proceso para evitar trabajo duplicado; nunca para sacar un hook.
5. **En curso:** rol, punto del TODO, lote.

Lo que se repite se vuelve una tool, un aviso de `audit.js` o un hook, y entra a `tools/fos-comandos.json`: no depende de acordarse.

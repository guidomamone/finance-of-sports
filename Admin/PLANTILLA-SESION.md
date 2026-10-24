<!-- md: las reglas fijas con las que se arranca una sesión de trabajo (comandos de Bash, medir y commitear): lo que antes se pegaba en cada prompt | leer: al empezar una sesión de trabajo y cuando el hook rechaza un comando -->
# Reglas fijas de una sesión

El prompt de cada sesión trae solo la lista de puntos, las restricciones de esa sesión (sin push, sin API paga, qué puntos no tocar) y el cierre que Guido pide. Lo de abajo no se repite en el prompt: está acá y lo aplica `tools/hooks/pre-tool.mjs`.

## Comandos de Bash

- Nada de `cd … &&` ni `cd …;`: se escribe la ruta completa; `git` y `node` corren directo desde la carpeta de la sesión.
- Nada de `$VAR`, `${…}` ni `$(…)` en un comando (salvo el heredoc de `git commit`). Un texto que lleva `${…}` no va por la línea de comandos: se escribe con Edit o Write.
- Nada de `/tmp`: para un archivo temporal, la carpeta de scratchpad que da el sistema.
- Nada de `node -e`, `node -p` ni `python -c`: un script de una sola vez se escribe con Write en el scratchpad y se corre con `node <ruta completa>` (`python3 -I <ruta completa>`).
- Editar un archivo: Edit o Write; `fos reemplazar` para el mismo cambio en varios archivos limpios. Antes de crear un archivo, mirar si existe (una lista de lote nueva: `node tools/fos.mjs lote-nuevo`).

## Medir y commitear un cambio a una tool del pipeline

1. Se mide antes y después con `node tools/fos.mjs medir pipeline` (en segundo plano; con `Admin/registros` y `Generados` commiteados antes de medir). Mientras mide no se edita nada trackeado ni se corren tools que escriben registros (`estado.mjs`, `inventario-transcripciones.mjs`, `publicar.mjs`, `cola --responder`, `ajustes --agregar`, `lote --ejecutar`): se niegan solas.
2. El veredicto: `node tools/fos.mjs patron --cambio "…" --patron "<regex sobre los .md>" --escribir` (o `--en-xhtml "<regex>"` si el patrón se ve en el `.xhtml`, o `--sin-documentos "por qué no lee documentos"` si el cambio no lee documentos). Una condición nueva que la sesión revisó sola: `--revision propia`.
3. Una tool nueva se registra en `tools/fos-comandos.json` si una sesión la corre a mano, y se clasifica en `tools/pipeline-tools.json`.
4. Antes de commitear: `node tools/indice-md.mjs --escribir` y `node tools/audit.js` en P0 0 y P1 0. Si cambia un dato publicado: `node tools/publicar.mjs` antes del commit y el trailer `Corrige:`.
5. Cada commit con cambios de tools lleva su entrada en `Admin/CHANGELOG.md` con las tools en el título; el último bullet empieza con `Medición:` (máximo 1500 caracteres).
6. Las skills y `CLAUDE.md` van en un commit aparte; cuando el hook dice que un commit cambia texto que Guido lee, se abre el diff con `show_pane` (pane diff, el SHA) antes de seguir.
7. Cerrar el punto: `node tools/fos.mjs cerrar <id>` solo revisa; `--cerrar --verificado "qué se miró y dónde quedó"` lo cierra cuando se cumple. Un punto que quedó a medias NO se cierra: se escribe HECHO y QUEDA en su cuerpo.

<!-- md: el cierre obligatorio que se pega al final del brief de todo subagente que edita archivos de tools/ | leer: al armar un brief para un subagente que toca tools/ (lo imprime `node tools/fos.mjs brief-tool`) -->
# Brief de un subagente que edita tools: el cierre obligatorio

Lo que un subagente deja sin hacer vuelve a la sesión como retrabajo. En la tanda del 463 (seis subagentes, 28-10-2026) la sesión tuvo que arreglar lo mismo cuatro veces
porque el brief no lo pedía. Este cierre se pega entero al final del brief, después de lo que el subagente tiene que cambiar. Lo imprime `node tools/fos.mjs brief-tool`.

## El cierre (copiar tal cual)

ANTES DE RESPONDER, dejá listo todo esto (no lo devuelvas como «queda pendiente»):

1. **Chequeo del código general.** Corré `node tools/medir-pipeline.mjs --ensayo` (tarda segundos, no mide ni escribe). Si dice «el código agregado nombra cosas que una tool general no puede nombrar», arreglalo vos: un club (`deportestolima-co`), un año literal (`2024`) o una ruta de `Clubes/` escritos en el código, incluso dentro de un mensaje o de un texto de ayuda, se sacan a una constante, a un parámetro o a un ejemplo sin nombre (`<slug>-<iso2>`, «número de cuatro cifras»). Repetí el ensayo hasta que no marque nada de lo tuyo.
2. **Tool nueva.** Un archivo nuevo de `tools/` se registra en `tools/pipeline-tools.json` (`tools` si toca el pipeline y se mide, `no_pipeline` si solo lee) con una línea `"<archivo>":"<orden|…>: qué hace"` al lado de una parecida, y, si se corre a mano, en `tools/fos-comandos.json`. Después `node tools/audit.js`: tiene que dar P0 y P1 en 0 por lo tuyo, y `node tools/fos.mjs --check` tiene que decir «la lista está al día».
3. **Lo que tu prueba ensució.** Un registro que tu prueba haya tocado (`Admin/registros/*.jsonl`, `tools/brand-color-reference/misses.jsonl`, `Admin/registros/altas-club.jsonl`, `cola-revision.jsonl`) y que no sea el resultado buscado se revierte con `git checkout -- <ruta>`. Las pruebas que escriben van sobre una copia en el scratchpad de la sesión, con `--archivo` si la tool lo admite. Los registros de gasto de API (`Admin/registros/api/*.jsonl`) los commitea la sesión antes de medir: listalos en tu respuesta.
4. **Pruebas de la tool.** Corré `node tools/fos.mjs probar <tool>` o el `probar-<tool>.mjs` que exista (`ls tools/probar-*`), y pegá su resultado. Si cambiaste una salida que una prueba compara, actualizá la prueba en el mismo cambio.
5. **Documentación mínima.** La cabecera de la tool describe cada salida o flag nuevo; si cambió lo que la tool imprime en un paso del pipeline, la línea de `Admin/PIPELINE.md` de esa etapa (sin historia, sin contadores). No escribas en `Admin/CHANGELOG.md` ni en `Admin/TODO.md`: los escribe la sesión.
6. **Informe corto al final de tu respuesta:** archivos tocados (y cuáles estaban fuera de tu lista, con el motivo); qué probaste y qué NO pudiste probar con una corrida real; los registros que quedaron sucios o gastaron API; y, si encontraste algo que no se arregla sin tocar otra tool, decilo en vez de tocarla.

No corras `node tools/fos.mjs cerrar-tool` (mide todo el pipeline y revierte ediciones de otros agentes) ni commitees: eso es de la sesión, que lo hace una vez, al final, con todos los cambios juntos.

## Por qué cada punto

- (1) `cerrar-tool` frena en su primer paso por esto, sin medir nada; lo vio la sesión recién al lanzarlo, 20 minutos después de que el subagente «terminó».
- (2) Una tool nueva sin clasificar es un P1 que frena el commit (`tool-sin-clasificar`).
- (3) Las pruebas de los subagentes dejaron `altas-club.jsonl` y `misses.jsonl` con líneas de prueba; y `cerrar-tool` se niega a medir con registros sin commitear.
- (4) Las pruebas de la sesión de cierre las corre `cerrar-tool` igual, pero un subagente que no las corrió entrega un cambio que se descubre roto recién ahí.

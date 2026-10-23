<!-- md: propuesta del punto 411, las fricciones que costaron tiempo en una sesión de Pipeline y cómo evitarlas con tools | leer: antes de tocar fos cerrar, el hook pre-tool o las tools de consulta de historial -->
# 411 — Fricciones de sesión: que lo que costó tiempo no cueste dos veces

Cada una pasó de verdad en la sesión del 2026-10-23; ninguna se arregla con «tener más cuidado».

## 1. `fos cerrar <id>` cierra de verdad por defecto

Se corrió para ver el chequeo y borró el punto 407 del TODO con trabajo pendiente (se restauró desde git). `--ensayo` existía, pero la línea de uso no dice que sin él se borra.
**Propuesta:** invertir el default: `fos cerrar <id>` hace el chequeo (lo que hoy es `--ensayo`) y `fos cerrar <id> --cerrar` cierra el punto. La línea de uso lo dice. Pro: el error caro (perder un punto) requiere pedirlo. Contra: un comando más largo para el caso normal y hay que actualizar lo que cite el comando viejo (`grep "cerrar <id>"` en docs y skills).

## 2. Escribir fuera del scratchpad

Un `Write` creó un archivo en `/private/tmp/…/` fuera de la carpeta de la sesión; el hook solo mira `Bash`.
**Propuesta:** que `tools/hooks/pre-tool.mjs` rechace `Write`/`Edit` a rutas de `/tmp` o `/private/tmp` que no estén bajo el scratchpad de la sesión, con el mensaje «usá la carpeta scratchpad». Pro: cierra el hueco que ya cerraron para Bash. Contra: una regla más del hook (se prueba con su batería).

## 3. Rechazos del hook por hábito (`cd … &&`, `$(…)`, `node -e`)

Tres veces en una sesión. El mensaje del hook ya dice qué hacer; lo que falta es que la alternativa esté a mano.
**Propuesta:** el mensaje de `node -e`/`python` dice el recorrido completo («escribí `scratchpad/x.mjs` con Write y corré `node <ruta completa>`»), y `CLAUDE.md` lo lleva en una línea. Pro: cero código nuevo en la tool. Contra: no evita el primer intento.

## 4. Construir una regla que ya existía

El «escalón de materialidad» de Guido (1 %, confianza 0,6) ya estaba en `cargar.mjs`; se encontró leyendo el tramo, no buscando antes. El riesgo era duplicar o contradecir una decisión.
**Propuesta:** `node tools/fos.mjs existe <palabras>` busca en una pasada las cabeceras de `tools/`, `Admin/CONVENCIONES*.md`, `HALLAZGOS-pipeline.md` y los títulos del CHANGELOG, y devuelve hasta 10 líneas con archivo y número. Es el mismo problema que resuelve el 408 para el CHANGELOG, para «¿ya hay una regla?». Pro: barato, evita rediseñar lo decidido. Contra: una búsqueda por palabras puede no encontrar el sinónimo (se mitiga con el índice de los `.md`, que ya existe).

## 5. Números de una medición que no se pueden repetir

El cuerpo del 407 daba 380, 117 y ≈240 con una definición que no estaba escrita; al volver a medir salieron otros recortes. Los scripts de la medición quedaron en el scratchpad de la sesión.
**Propuesta:** una tool `fos cola-historial [tipos|categoria|materialidad|reaparece]` con las mediciones de esta sesión (respuestas por tipo, precedente unánime, umbral de materialidad, preguntas reformuladas), con la definición de cada cifra impresa. Pro: cualquier sesión repite la medición y compara. Contra: hay que mantenerla si cambia el formato de la cola.

## Orden

1 y 2 primero (evitan pérdidas), después 4 y 5, y 3 al final (es texto). Ninguna toca el pipeline de carga: se prueban con `fos probar` y una corrida de ejemplo.

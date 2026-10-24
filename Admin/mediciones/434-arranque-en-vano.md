<!-- md: qué se lee al arrancar una sesión (KB por rol y por tipo de sesión), qué se usó y qué se saca o queda a demanda (punto 434) | leer: al tocar los arranques por rol, `fos arranque` o la skill de arranque -->
# 434 · Qué se lee en vano al arrancar una sesión

Conclusión: el arranque fijo de una sesión de Orden pesaba unos 36 KB antes de la primera tarea (CLAUDE.md 13 KB, PLANTILLA 3 KB, `fos arranque orden` 9,9 KB, la lista de `todo.mjs` 3,4 KB, las secciones de la skill de arranque cuando se cargan, 7,5 KB) y casi nada de `arranque orden` se usó: de sus 6 secciones, solo «Dónde vive cada cosa» y la de Pipeline sirvieron a alguna tarea (cola, imports, esquemas, audit). Se sacó `orden` de las 3 secciones que ese rol no usa (Objetivo, Techo del modelo, Sitio/analytics: 5,5 KB): `arranque orden` pasa de 9,9 a 4,5 KB. No hace falta un tipo de sesión más; sí que la salida de `arranque` no repita los títulos salteados cuando el rol es chico (queda como idea, abajo).
Destino: `Admin/ESTADO.md` (marcas `roles:`, ya hecho); lo que cambia texto de skills o de CLAUDE.md va a Guido (sección «Para Guido»).

## Qué se midió

Bytes que devuelve cada arranque (`node tools/fos.mjs arranque <rol>`):

| rol | KB |
|---|---|
| pantallas | 11,5 |
| orden (antes) | 9,9 |
| auditora | 9,2 |
| deploy | 8,9 |
| contenido | 8,3 |
| onboarding | 6,7 |
| sourcing | 6,2 |
| pipeline | 4,9 |
| orden (ahora) | 4,5 |

Fijos de toda sesión: `CLAUDE.md` 13,1 KB (se carga solo), `Admin/PLANTILLA-SESION.md` 3,0 KB, `node tools/todo.mjs` 3,4 KB, `ESTADO.md` entero 18 KB (ya no se lee entero), skill de arranque 7,5 KB (la tabla de qué leer), skill de onboarding 3,8 KB.

Primeras 25 llamadas de las 4 sesiones largas más recientes (transcripciones en `~/.claude/projects/…`; bytes de resultados): 75 KB, 72 KB, 48 KB y 64 KB. Lo grande que se repite en todas: `arranque orden` (9,7 a 10 KB, siempre el primero), un Read de un archivo de `tools/` de 8 a 9 KB (en una: `todo.mjs` entero) y un `sed` de `pipeline-tools.json` de 6 KB. Las sesiones cortas (6 y 8 llamadas) no arrancan con nada de esto.

## Qué se usó y qué no (esta sesión, Orden)

- Usado: `PLANTILLA-SESION.md` (las reglas de Bash y de medir: se aplicaron todo el tiempo), la lista de `todo.mjs`, `todo.mjs <id>` por punto, la sección «Dónde vive cada cosa» de ESTADO.
- No usado: «Objetivo del proyecto» (licencia y nombres: 1,0 KB), «Techo del modelo» (0,3 KB), «Sitio, publicación y analytics» (analytics, Supabase, dashboard: 4,2 KB). Ninguna tarea de Orden de esta sesión (cola, imports, esquemas, audit, arranque) los necesitó.
- `fos cerrar <id>` repite en cada punto el mismo bloque de chequeos (índice, auditoría, CHANGELOG, ESTADO); es corto (unas 12 líneas) y sirve de lista: no se toca.

## Qué se saca, qué queda a demanda

1. Hecho: `orden` fuera de las marcas de «Objetivo», «Techo del modelo» y «Sitio, publicación y analytics» de `ESTADO.md`. Quien arranca Orden para deploy o analytics usa `arranque deploy`.
2. A demanda (ya lo es): ESTADO entero, `ESTADO-pipeline.md`, `ESTADO-clubes.md`, `INDICE-md.md`, los archivos de `tools/` de más de 40 KB (`fos mapa`).
3. Idea sin hacer: que `arranque <rol>` no imprima la línea final de «Salteadas para este rol» cuando el rol ya sabe cuáles son (ahorra 0,3 KB; no vale el cambio).
4. Tipos de sesión: no hace falta un rol «puntos chicos de tools»: con el cambio 1, Orden ya arranca con 4,5 KB, menos que Auditora o Pantallas. Lo que sí cuesta es leer un archivo de `tools/` entero (8 a 9 KB cada vez): la regla de `fos mapa` ya existe en CLAUDE.md; no se agrega otra.

## Para Guido (texto de skills y de CLAUDE.md, no tocado)

- La skill `start-session-finance-of-sports-project` (7,5 KB) se carga entera casi siempre y su tabla de «qué leer según la tarea» es lo único que se usa: se podría partir en la tabla (1,5 KB) y el resto a demanda. Propuesta, no hecha.
- `CLAUDE.md` (13 KB, se carga solo en cada sesión) repite en «Al empezar» lo que dicen la skill de arranque y la PLANTILLA; recortarlo ahorraría unos 3 KB por sesión. Propuesta, no hecha.

<!-- md: propuesta del punto 407, qué datos suma la cola a cada tipo de pregunta en vez de una respuesta por defecto | leer: antes de tocar la propuesta de la cola (cargar.mjs, cola.mjs, verificar) -->
# 407 — La cola con datos, no con «sí» por defecto

Medido el 2026-10-23 sobre `Admin/registros/cola-revision.jsonl` (respuestas reales, sin `obsoleto`/`descartar`). Los números son para
decidir el diseño, no para fijar reglas: cada paso de abajo se vuelve a medir antes de dejarlo activo.

## Lo que dicen los datos

| Tipo (casos con respuesta) | Propuesta de hoy | Qué respondió la sesión | Lo que separa un caso de otro |
|---|---|---|---|
| Categoría (3.154) | «sí» | aceptó 82 % | la confianza: ≥0,7 acertó 93 %, 0,5–0,7 82 %, **<0,5 solo 58 %**. Con precedente del club para la misma etiqueta (34 % de los casos): unánime en 796, coincide 770, **distinta 26**. Unánime con 3+ respuestas del club: 173, distinta 4 |
| Localizar/extraer (722) | «sí» | aceptó 72 %, «no» 26 % | la pregunta que menciona «no suma / no cierra / difiere»: **45 % «no»**; «se usa el cuadro o nota como desglose»: 38 %; «stated after charging / informativo»: 37 %; «se deja afuera»: 2 % «no»; «sin desglose, no trae»: 12 % |
| Signo (58) | «sí» | aceptó 83 % | con la aclaración en el rótulo: 6 de 6 aceptados (muestra chica) |
| Perfil (517) | ninguna | «no» 89 % | **mismo club y mismo tema, respuesta anterior igual: 201 de 201** (y las 26 que antes fueron «sí» siguieron «sí») |
| Duda-tema (574) | «sí» | aceptó 94 % menos Italia/Noruega/Suiza (71–84 %) | el país |

Lo que dicen las notas de los 184 «no» de localizar/extraer: en 86 el cuadro existe y la sesión lo miró; en 48 es informativo o ya
está incluido; en 43 el cuadro no suma el renglón del estado; en 12 es de otra sociedad o perímetro. **La identidad (¿la tabla suma el
renglón?) es el discriminador que la sesión usa a mano y que la tool puede calcular.**

## Propuesta: qué agrega cada pregunta (lo que el sistema decide queda igual; solo se suma información al `que` del caso)

Un bloque «Datos» de 2–4 líneas al final del caso, calculado al levantarlo y guardado en el caso (campo `datos`), que `cola.mjs` imprime.
La línea «Propuesta del sistema: sí» se saca de todos los tipos: queda **«Sin propuesta; los datos de abajo»**, salvo cuando la tool
sabe algo concreto (la línea de amortización junta ya dice qué hacer).

1. **Categoría** (`cargar.mjs`, donde se arma el caso): lo que se le respondió a la misma etiqueta normalizada, en este club / este
   país / todo (cuenta por categoría, ej. «club: depreciation 4 de 5 años»); confianza de Jev y de Claude por separado (hoy solo la
   combinada); si la etiqueta cae en el catch-all (`other_*`) en otros clubes; para amortización: cuántas veces la línea terminó
   partida por notas.
2. **Localizar/extraer** (`verificar`): la identidad: suma del cuadro que la pregunta nombra contra el renglón del estado
   («cuadro 4.558.673; renglón 4.558.673: cierra» / «difiere en 11.576.970»); si el cuadro repite otro ya cargado; si los años
   vecinos del club se abrieron con ese mismo cuadro (cuántos y cuáles); si el índice de bloques tiene otra nota de ingresos con otro
   título.
3. **Signo**: si el rótulo trae la aclaración; el resultado impreso contra cada interpretación (la que cierra, y si cierra solo una).
4. **Perfil**: lo contestado por el club en otros años (año y valor) y la distribución del país. Con la medición de arriba se
   propone **cerrar solo** el perfil si el club ya lo contestó en cualquier año (hoy la ventana es de ±4): 201 de 201 coincidieron.
5. **En todos**: «casos parecidos» = misma etapa + motivo + país: «de 38, 31 aceptados». Solo informa.

## Qué se contesta solo, y cuándo

Regla de oro del punto: una pregunta se contesta sola solo si **ninguna respuesta histórica distinta** habría quedado contestada.
Con lo medido:

- **Perfil con respuesta previa del club**: candidato (cero excepciones). Se mide con el lote completo.
- **Categoría con precedente unánime**: NO (26 distintas de 796; con 3+ del club aún 4 distintas). Queda en cola, con el dato.
- **Localizar/extraer**: solo si, con la identidad calculada, ninguna de las 184 respuestas «no» pasa el filtro. Se mide antes de
  decidir; si no hay un filtro limpio, queda escrito en `Admin/HALLAZGOS-pipeline.md` y no se automatiza.
- **Signo**: se mide con la aclaración sola; la muestra (6) es chica, probablemente no alcance.

## Orden (un tipo por vez, cada uno medido con `fos medir pipeline` y `fos patron`)

1. Los dos defectos: el caso descartado que reaparece (la respuesta se ata a documento + etiqueta normalizada, no al hash del texto)
   y `fos causas` que lista casos ya resueltos.
2. Perfil (el más seguro; solo `cargar.mjs` y `cola.mjs`).
3. Categoría (solo datos en el caso; no cambia qué se carga).
4. Localizar/extraer con la identidad (el que más baja la investigación).
5. Signo.

## Qué no se sabe todavía

- Cuántos de los 722 de localizar/extraer tienen un cuadro nombrado con líneas que se puedan sumar sin leerlos a mano. Se mide en el paso 4 antes de escribir código.
- Si Jev y Claude por separado discriminan mejor que la confianza combinada (el registro de Jev está en `etiquetas-jev.jsonl`).

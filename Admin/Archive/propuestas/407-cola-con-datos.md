> **ARCHIVADO el 2026-10-23** al cerrar el punto 407: lo que servía quedó en `Admin/PIPELINE.md`, `Admin/HALLAZGOS-pipeline.md` o el CHANGELOG. Las rutas y números son los de ese día.

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

## Bajar la cola (medido el 2026-10-23, 6.941 casos)

La cola no es mala; es mala cuando pregunta por todo. Por tipo: categoría 47 %, duda-tema 8, duda-de-extraer 8, perfil 7, no-cierra 7, gestión 7,
primer-año 4, localizar 4, año-vecino 3. Una mediana de 4 preguntas reales por documento (p90 13, máximo 52).

**A. Materialidad en categoría.** Contestar sola con la propuesta si el monto es chico respecto del total de su lado del ejercicio.
Medido sobre 1.870 preguntas (las que se pudieron cruzar con su ejercicio), contra lo que la sesión respondió:

| Umbral por pregunta | Se contestan solas | La sesión las habría cambiado | Cruzan ingreso/gasto | Error acumulado por documento (mediana · p90 · máx) |
|---|---|---|---|---|
| 0,25 % | 29 % | 19 % | 6 | 0,08 · 0,34 · 0,70 % |
| **0,5 %** | **38 %** | 17 % | 7 | 0,14 · 0,51 · **0,93 %** |
| 1 % | 49 % | 19 % | 11 | 0,50 · 1,47 · 2,82 % |
| 2 % | 63 % | 19 % | 13 | 1,02 · 2,54 · 7,11 % |

Recomendación: 0,5 % por pregunta **más un tope acumulado de 1 % por documento y lado** (si lo auto-contestado lo pasa, vuelven a la cola las mayores)
y piso de confianza 0,5 (con 1 % y confianza ≥0,5 las cambiadas bajan de 19 % a 16 %). Cada una queda anotada en la evidencia del club («auto por
materialidad: monto, % del lado, propuesta») para que sea reversible y auditable. Se mide con el lote completo y se rehace la medición con el campo `document`
de las fuentes (ya firme), sin el cruce por nombre. La decisión de 0,5 % o 1 % es de Guido.

**B. No abrir el caso hasta que el lote esté estable.** Casos que se abrieron y se cerraron solos como `obsoleto`: numero-no-confirmado 78 %, no-cierra 65 %,
primer-año 60 %, año-vecino 47 % (690 de 1.134). Propuesta: estos motivos quedan provisorios y solo pasan a la cola si siguen levantados en la corrida
que carga. Se mide que ningún caso que la sesión respondió de verdad (no obsoleto) deje de abrirse.

**C. Preguntar por club, no por año.** Perfil (201 de 201 iguales) y gestión (141 de 402 respuestas reales fueron `descartar` por la regla de gestión
sin fuente de `CONVENCIONES-DATOS`): aplicar esa regla en la tool y cerrar el caso con su cita. Falta medir cuántos de los 141 la regla habría
resuelto sola.

**D. Datos en el caso** (secciones de arriba): lo que queda en la cola llega con el precedente, la identidad y el historial.

## Resultado (2026-10-23)

Implementado: clave estable, perfil por club, tope de materialidad con datos, `fos causas` y el cierre de gestión por club. Medido y descartado (ver `HALLAZGOS-pipeline.md`):
la identidad del cuadro no discrimina en localizar/extraer (queda el historial por país como dato) y los casos provisorios solo ahorran en `primer-anio`, que ya se
resuelve en el lote. El signo con aclaración aparece en 1 de 50 preguntas (la cifra de «6 de 6» de más arriba era de otro recorte): va como dato. La medición del tope con
`document` dio lo mismo (37 % con 0,5 %, error máximo 0,93 %).

## Qué no se sabía (cerrado)

- Cuántos de los 722 de localizar/extraer tienen un cuadro nombrado con líneas que se puedan sumar sin leerlos a mano. Se mide en el paso 4 antes de escribir código.
- Si Jev y Claude por separado discriminan mejor que la confianza combinada (el registro de Jev está en `etiquetas-jev.jsonl`).

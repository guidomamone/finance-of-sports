---
name: votacion-de-criterios
description: Decidir un criterio de datos de finance-of-sports con una votación de tres votantes independientes, en vez de que lo decida quien lo mire ese día. Usar cuando aparece una pregunta de criterio que no está resuelta en Admin/CONVENCIONES-DATOS.md ni en las skills (cómo partir o no una fila mixta, un perímetro, un período raro, el tratamiento de una partida), cuando la auditora clasifica un cambio como "A GUIDO" por criterio, o cuando Guido pide "votemos". La corre la sesión auditora.
---

# Votación de criterios

El sitio es una base de datos pública: el mismo hecho tiene que cargarse igual en todos los clubes y todos los años. Un criterio no se
decide por gusto de la sesión: se busca primero si ya está decidido, y si no, votan tres votantes con la misma escala.

## 1. Antes de votar: ¿ya está decidido?

Buscar, en este orden, y si aparece, se aplica y NO se vota:
1. `Admin/CONVENCIONES-DATOS.md` (las REGLAS) y la skill `club-data-mapping` con su `referencia/`.
2. Un ajuste manual o una marca ya cargada que resuelva el mismo caso (`Admin/registros/ajustes-manuales.jsonl`, `incluidoEn` en
   `data/**`, `Admin/carga-clubes/<club>.md`).
3. `Admin/registros/auditoria-proceso.jsonl` (una votación anterior).

Si aparece una regla, el resultado es "ya decidido por <regla>", con la cita, y cómo se aplica al caso. Fin.

### Si la pregunta es sobre una FILA o una categoría (abrirla, cerrarla, fusionarla, renombrarla)

Se mide ANTES de votar, y la medición es la evidencia de los tres votantes; sin ella no se vota:
1. `node tools/fos.mjs filas` (regenera `Admin/mediciones/filas-formato-simplificado.md`): por fila, cuántos clubes la tienen alguna vez, cuánto pesa cuando la tienen y en qué países y deportes está.
2. Para una fila que todavía no existe: `node tools/fos.mjs filas --etiqueta "<regex de las etiquetas>" [--lado gastos]` (el concepto hoy cae en «Otros ingresos» o «Otros gastos»); se miran la versión estricta y la amplia, y se revisa a mano una muestra de las líneas que matchean antes de creer el número.
3. Los números se pegan en el caso que reciben los votantes, junto al umbral que usa el proceso de revisión de categorías (`Admin/propuestas/350-revision-categorias.md`). Una fila que solo existe en un par de países o en un par de clubes no abre; una que está en muchos países sí, aunque pese poco.
4. Si se abre o se fusiona una fila, la aplicación incluye recategorizar lo ya cargado (los años que cambian se cuentan en la sección 4) y volver a correr `node tools/fos.mjs filas` para ver el resultado.

## 2. La escala (en este orden de peso)

1. **Precedente del mismo club** (otros años del club, ya cargados).
2. **Precedente de la misma liga.**
3. **Precedente del mismo país.**
4. **Precedente del mismo deporte.**

   Un precedente (1 a 4) cuenta solo si es **el mismo hecho económico**, no el mismo nombre de renglón: los dos son una venta, o los dos son
   una revaluación, y el votante cita la nota del documento de cada uno que lo muestra. Sin esa cita, el precedente no suma.
5. **Fidelidad al documento:** no inventar un desglose que el documento no da; lo impreso manda.
6. **Realizado o no realizado:** una ganancia o un gasto sin contraparte que pagó o va a pagar (una revaluación, una estimación, un ajuste a
   valor razonable) nunca va a un rubro que el lector entiende como plata que entró o salió, como `player_sales`. Va a `other_income`,
   `other_expenses` o `exceptional_items`, según el lado.
7. **Lo que entiende el lector:** si un periodista ve ese número en ese rubro del sitio, ¿entiende lo que pasó de verdad? La opción que lo
   haría entender otra cosa pierde.
8. **Preservar las sumas:** el total y el resultado siguen cerrando con lo impreso.
9. **Comparabilidad:** el mismo rubro significa lo mismo en todos los clubes (taxonomía de `club-data-mapping`).

Un criterio de más arriba pesa más que todos los de abajo juntos.

## 3. Cómo se vota

- Tres subagentes Sonnet, independientes: ninguno ve el voto de los otros. Solo Read, Grep y Write; se les pasan las rutas.
- A cada uno: el caso (documento, línea del `.md`, qué está en duda, las opciones), esta escala y las rutas de la sección 1.
- Cada uno devuelve: la opción elegida; para cada criterio de la escala, a favor, en contra o no aplica, con la cita (archivo y línea, o
  club-año); y en una línea, qué años ya cargados cambiarían.

## 4. Cómo se cuenta

- **Antes de contar: ¿cuánto mueve?** Para cada opción, medí cuánto cambia el dato frente a la otra: la diferencia, sobre el total de
  ingresos o de gastos del año. Si es 1% o menos y no le cambia el signo al resultado, no se vota: se elige la opción más fiel al documento
  (criterio 5), se anota con la medida y se carga. Si es más, votan tres, para que siempre haya desempate.
- **Decidido:** 3 a 0, o 2 a 1 si el voto en minoría no tiene ningún precedente 1 a 3 que sea el mismo hecho a su favor.
- **A Guido:** empate, un 2 a 1 con un precedente 1 a 3 que sea el mismo hecho en minoría, o una opción que cambia más de 10 años ya cargados. Se le manda a la
  principal en un solo mensaje: el caso, las opciones, los tres votos con sus citas y la recomendación.

## 5. Dónde queda

- Una línea en `Admin/registros/auditoria-proceso.jsonl`: `{"fecha","sesion","cambio":"votación: <caso>","veredicto":"DECIDIDO|A GUIDO",
  "motivo","votos":[...]}`.
- Si se decidió una regla nueva, una REGLA en `Admin/CONVENCIONES-DATOS.md` con el caso que la originó y "(votación, fecha)". Así la
  próxima vez es precedente y no se vota.
- Si la regla es de categoría, lleva dos líneas más: `CATEGORÍA (prompt)` (una frase para el categorizador) y `EJEMPLO-CATEGORÍA` (un caso
  real con club, lado, etiqueta y categoría). Después se corre `node tools/reglas-categoria.mjs --escribir`, que la registra para Jev y Claude.
- Si la regla cambia años cargados, la aplicación va a Onboarding (los datos) o a Pipeline (si hace falta un escalón de script), por la
  principal.

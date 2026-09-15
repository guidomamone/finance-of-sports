# Prototyping — los prototipos del selector

**Nada de esta carpeta es el sitio.** Ningún archivo de acá se linkea desde
`index.html` ni se sirve como parte de la experiencia real: son maquetas para
decidir cómo se elige un club antes de tocar el código de producción.

Se mudó todo acá el 2026-09-14, a pedido de Guido, para que no se mezcle con el
modelo real. Antes vivían en la raíz del repo y sus generadores en `tools/`.

---

## Los cuatro prototipos

Los cuatro corren con los **datos y el motor reales** del sitio (mismos `js/`,
`data/`, mismo `computeYearGeneric()`), y los cuatro exponen la misma API pública
que `js/selector.js`, así que `index.html` no se entera de cuál está cargado.

| | Archivo | Idea | Estado |
|---|---|---|---|
| **1** | `prototipo-inicio-selector.html` | El selector de columnas de hoy (Deporte › Región › País › Liga › Equipo), metido en la portada en vez de atrás de un click. Se queda en la página con el club elegido y se minimiza. | Congelado |
| **2** | `prototipo-pasos.html` | Un card por paso, apilados, una decisión por vez. 7 pasos, multi-selección, grupos (sumar clubes y ligas y medirlos contra otro grupo). | Congelado a pedido de Guido, con pendientes anotados abajo |
| **3** | `prototipo-duelo.html` | Dos columnas, **Equipo A contra Equipo B**, con un toggle arriba para el que solo quiere ver uno. Cada columna tiene el árbol completo (Deporte › Región › País › Liga › Equipo, un nivel por vez) y puede terminar en un club, una liga, un país o una región entera (promedio o total). | El más nuevo, el menos probado |
| **4** | `prototipo-cards.html` | Los dos cards del 3, pero **vacíos**: apretar uno abre un **modal con los pasos del 2**, sin el paso "contra qué comparar". El 3 por fuera, el 2 por dentro. | El más nuevo |

**El 3 nace de una crítica al 2** (Guido): comparar obligaba a pasar por el
selector dos veces, y eso generaba casuística que nadie quería contestar (¿el
paso 7 vuelve a aparecer?, ¿en qué momento se cierra un lado?). Con las dos
columnas a la vista, comparar deja de ser un estado en el que entrás y salís.

**El 4 nace de una crítica al 3** (Guido: "no me gusta el prototipo 3"): meterle
el árbol entero a cada columna entra, pero la portada abre con dos árboles de
cinco niveles a la vez, que es el mismo exceso de información que el 2 vino a
corregir, ahora duplicado. Con los cards vacíos, la portada abre con UNA pregunta
("¿qué querés ver?", dos veces) y el trabajo de elegir pasa al modal. Y el paso 7
del 2 se va porque ya no hay nada que preguntar: el card B es el rival.

**El árbol del 3** (Versión 155) es el mismo de `js/selector.js`, pero servido de
a un nivel por vez en vez de en 5 columnas: media pantalla no da para 5 columnas,
y son dos árboles, uno por lado. El breadcrumb de arriba hace el trabajo que allá
hacían las columnas de la izquierda (ver dónde estás, y volver), y el buscador
queda POR ENCIMA del árbol, transversal: escribir "boca" o "japon" sigue llegando
en un paso desde cualquier nivel. Lo que el árbol del sitio no tiene: acá cada
fila de conjunto lleva un ⊕ que lo toma ENTERO como lado, así que un país o una
región son sujetos tan válidos como un club o una liga.

---

## Cómo se abren

El sitio se sirve desde la RAÍZ del repo (`.claude/launch.json`, puerto 8971), no
desde esta carpeta:

```
http://localhost:8971/Prototyping/prototipo-cards.html
http://localhost:8971/Prototyping/prototipo-duelo.html
http://localhost:8971/Prototyping/prototipo-pasos.html
http://localhost:8971/Prototyping/prototipo-inicio-selector.html
```

Cada `.html` lleva `<base href="../">` para que TODA ruta relativa (los `<script
src>` de `js/` y `data/`, y también las que arma el JS en tiempo de ejecución:
`loadClubData()` e `I18N.load()`) siga resolviendo contra la raíz.

## Cómo se regeneran

Los `.html` están **generados**: no se editan a mano, se sobrescriben. Cada uno
sale de `index.html` más un puñado de reemplazos con ancla, y si un ancla no
aparece el generador FALLA en vez de escribir un archivo a medias.

```bash
node Prototyping/build-prototipo-inicio.js
node Prototyping/build-prototipo-pasos.js
node Prototyping/build-prototipo-duelo.js
node Prototyping/build-prototipo-cards.js
```

La lógica de los prototipos 2, 3 y 4 NO se genera: vive en
`prototipo-pasos-selector.js`, `prototipo-duelo-selector.js` y
`prototipo-cards-selector.js`, escritos a mano.
La del 1 sí: es una copia parcheada de `js/selector.js`, y el diff entre las dos
ES la propuesta de implementación.

---

## ⚠️ Los datos inventados

`prototipo-pasos-datos-inventados.js` rellena de mentira los ejercicios 2016-2025
de los 18 clubes de Argentina y Brasil, con ascensos y descensos inventados, para
poder probar la interfaz sin que la falta de datos reales limite el diseño.

**Lo cargan los prototipos 2, 3 y 4. El 1 no, y el sitio tampoco.**

Las 5 condiciones que lo mantienen contenido están escritas en `CONVENCIONES.md`
y la más importante es la última: **estos números no se copian a `data/` nunca**.
El día que uno de esos clubes publique su balance real, se carga leyendo el
documento. Mientras el archivo exista, cualquier captura de los prototipos 2, 3 y
4 tiene números falsos — por eso su franja de arriba es roja y lo dice.

---

## Qué quedó pendiente

De la última sesión de pruebas de Guido sobre el prototipo 2, sin implementar
porque pidió congelarlo y pasar al 3:

1. **Promedio y sumatoria con elección de años.** Hoy el promedio toma TODOS los
   ejercicios del club; Guido quiere elegir cuáles.
2. **"Otra cosa" en el paso 7.** El botón "Compararlo contra un grupo que arme
   yo" debería llamarse así y decir que te lleva arriba a elegir.
3. **El paso 7 reaparece después de armar el rival** y se lee como un loop.
4. **Promedio y sumatoria también en el paso 6**, para el que no quiere comparar
   sino ver ese dato directamente.

El prototipo 3 evita (2) y (3) por diseño, no los resuelve: son problemas del
modelo de "pasar dos veces por el selector".

La decisión de fondo —cuál de los cuatro va al sitio, o qué partes de cada uno—
es el **punto 28 de `TODO.md`**, y el día que se resuelva hay que borrar los
datos inventados (**punto 30**).

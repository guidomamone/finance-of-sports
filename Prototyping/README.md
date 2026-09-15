# Prototyping — los prototipos del selector

**Nada de esta carpeta es el sitio.** Ningún archivo de acá se linkea desde
`index.html` ni se sirve como parte de la experiencia real: son maquetas para
decidir cómo se elige un club antes de tocar el código de producción.

Se mudó todo acá el 2026-09-14, a pedido de Guido, para que no se mezcle con el
modelo real. Antes vivían en la raíz del repo y sus generadores en `tools/`.

---

## Ya hay un ganador: el prototipo 4

El 2026-09-15 se cerró la decisión (era el **punto 28** de `TODO.md`, ahora
resuelto). Gana el **prototipo 4**, y lo que falta es llevarlo a producción, que es
un merge grande.

```
Selector/
  MERGE-A-PRODUCCION.md   ← EMPEZÁ POR ACÁ si venís a hacer el merge
  prototipo-cards.html    ← el ganador, generado
  build-prototipo-cards.js
  prototipo-cards-selector.js
  prototipo-pasos-datos-inventados.js   ⚠️ datos falsos, ver abajo
  Archive/                ← los tres que perdieron
```

**`Selector/MERGE-A-PRODUCCION.md` es el documento que importa.** Explica el
prototipo entero, qué cambia respecto del sitio publicado archivo por archivo, un
plan de merge por etapas, las decisiones abiertas y los gotchas. Está escrito para
una sesión que no vivió ninguna de estas.

```
http://localhost:8971/Prototyping/Selector/prototipo-cards.html
```

---

## Los cuatro prototipos, y por qué ganó el 4

Los cuatro corren con los **datos y el motor reales** del sitio (mismos `js/`,
`data/`, mismo `computeYearGeneric()`), y los cuatro exponen la misma API pública
que `js/selector.js`, así que `index.html` no se entera de cuál está cargado.

| | Archivo | Idea | Por qué no |
|---|---|---|---|
| **1** | `Archive/prototipo-inicio-selector.html` | El selector de columnas de hoy (Deporte › Región › País › Liga › Equipo), metido en la portada en vez de atrás de un click. | ~67 opciones y 5 decisiones simultáneas en la primera pantalla. |
| **2** | `Archive/prototipo-pasos.html` | Un card por paso, apilados, una decisión por vez. 7 pasos, multi-selección, grupos. | Comparar obligaba a pasar por el selector dos veces, y de ahí salía una casuística que nadie quería contestar. |
| **3** | `Archive/prototipo-duelo.html` | Dos columnas, Equipo A contra Equipo B, cada una con el árbol entero adentro. | La portada abría con dos árboles de cinco niveles a la vez: el mismo exceso de información que el 2 vino a corregir, duplicado. |
| **4** | `Selector/prototipo-cards.html` | **GANADOR.** Inicio pregunta ("ver un club" o "comparar dos"); los dos cards viven en una pestaña Comparar y se llenan desde un modal con los pasos del 2. Un lado es una suma de bloques, cada uno con su año y su agregador. | — |

El 4 se quedó con lo mejor de los otros tres: la forma de dos cards del 3, los pasos
del 2 y el árbol del 1 comprimido en esos pasos. Y sacó lo que sobraba: el paso
"contra qué comparar" del 2 (lo contesta el otro card) y la pantalla partida al
medio para el que viene por un club solo.

## Cómo se regeneran

Los `.html` están **generados**: no se editan a mano, se sobrescriben. Cada uno sale
de `index.html` más un puñado de reemplazos con ancla, y si un ancla no aparece el
generador FALLA en vez de escribir un archivo a medias.

```bash
node Prototyping/Selector/build-prototipo-cards.js
node Prototyping/Selector/Archive/build-prototipo-inicio.js
node Prototyping/Selector/Archive/build-prototipo-pasos.js
node Prototyping/Selector/Archive/build-prototipo-duelo.js
```

Cada `.html` lleva un `<base href>` que apunta a la RAÍZ del repo, para que TODA
ruta relativa (los `<script src>` de `js/` y `data/`, y también las que arma el JS en
tiempo de ejecución: `loadClubData()` e `I18N.load()`) siga resolviendo bien. Los de
`Selector/` llevan `../../` y los de `Archive/`, `../../../`.

La lógica de los prototipos 2, 3 y 4 NO se genera: vive en
`Archive/prototipo-pasos-selector.js`, `Archive/prototipo-duelo-selector.js` y
`Selector/prototipo-cards-selector.js`, escritos a mano. La del 1 sí: es una copia
parcheada de `js/selector.js`, y el diff entre las dos ES su propuesta.

---

## ⚠️ Los datos inventados

`Selector/prototipo-pasos-datos-inventados.js` rellena de mentira los ejercicios
2016-2025 de los 18 clubes de Argentina y Brasil, con ascensos y descensos
inventados, para poder probar la interfaz sin que la falta de datos reales limite el
diseño.

**Lo cargan los prototipos 2, 3 y 4. El 1 no, y el sitio tampoco.**

Las 5 condiciones que lo mantienen contenido están escritas en `CONVENCIONES.md` y
la más importante es la última: **estos números no se copian a `data/` nunca**. El
día que uno de esos clubes publique su balance real, se carga leyendo el documento.
Mientras el archivo exista, cualquier captura de los prototipos 2, 3 y 4 tiene
números falsos — por eso su franja de arriba es roja y lo dice.

Se borra cuando el merge termine (**punto 30 de `TODO.md`**).

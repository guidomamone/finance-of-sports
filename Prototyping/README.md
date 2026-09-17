# Prototyping — por qué el selector es como es

**Acá no queda ningún prototipo.** Quedan dos documentos, y este archivo explica
qué fueron y por qué se conservan.

Entre el 2026-09-14 y el 2026-09-15 se probaron **cuatro** formas distintas de
resolver la misma pantalla: cómo elige un club el que llega al sitio. Los cuatro
corrían con los datos y el motor reales. Ganó el 4, y entre el 2026-09-15 y el
2026-09-17 se llevó a producción en seis etapas (Versiones 143 a 155). Terminado
el merge, los archivos se borraron: **la historia vive en git**, y lo que sigue
acá es lo único que hace falta leer sin desenterrarla.

```
Prototyping/
  README.md                      ← esto: por qué perdieron los otros tres
  Selector/MERGE-A-PRODUCCION.md ← qué es el prototipo 4 y cómo se merged
```

---

## Los cuatro, y por qué perdió cada uno

**Esta tabla es el motivo por el que esta carpeta sigue existiendo.** Sin ella,
dentro de seis meses alguien propone "y si el selector fuera dos columnas con el
árbol adentro de cada una" sin saber que ya se probó, se miró y se descartó.

| | Idea | Por qué no |
|---|---|---|
| **1** | El selector de columnas (Deporte › Región › País › Liga › Equipo) metido en la portada en vez de atrás de un click. | ~67 opciones y 5 decisiones simultáneas en la primera pantalla. |
| **2** | Un card por paso, apilados, una decisión por vez. 7 pasos, multi-selección, grupos. | Comparar obligaba a pasar por el selector dos veces, y de ahí salía una casuística que nadie quería contestar. |
| **3** | Dos columnas, Equipo A contra Equipo B, cada una con el árbol entero adentro. | La portada abría con dos árboles de cinco niveles a la vez: el mismo exceso de información que el 2 vino a corregir, duplicado. |
| **4** | **GANADOR.** Inicio pregunta ("ver un club" o "comparar dos"); los dos cards viven en una pestaña Comparar y se llenan desde un modal con los pasos del 2. Un lado es una suma de bloques, cada uno con su año y su agregador. | — |

El 4 se quedó con lo mejor de los otros tres: la forma de dos cards del 3, los
pasos del 2 y el árbol del 1 comprimido en esos pasos. Y sacó lo que sobraba: el
paso "contra qué comparar" del 2 (lo contesta el otro card) y la pantalla partida
al medio para el que viene por un club solo.

## Qué se borró, y dónde está

Los cuatro `.html` eran **generados** desde `index.html` por cuatro scripts con
reemplazos por ancla. Cuando el merge borró el `#coldHero` y el panel de columnas
de `index.html`, los cuatro generadores empezaron a fallar — por diseño: fallan en
vez de escribir un archivo a medias. O sea que los `.html` quedaron congelados y
sin forma de regenerarse: 572 KB que ya no describían ni el sitio ni una propuesta
viva.

Para verlos andando otra vez hay que volver a un commit anterior al borrado:

```bash
git log --oneline -- Prototyping/
git show <commit>:Prototyping/Selector/prototipo-cards.html > /tmp/proto.html
```

## ⚠️ Y los datos inventados, que se fueron con ellos

`prototipo-pasos-datos-inventados.js` rellenaba de mentira los ejercicios
2016-2025 de los 18 clubes de Argentina y Brasil, con ascensos y descensos
inventados, para poder probar la interfaz sin que la falta de datos reales
limitara el diseño. Lo cargaban los prototipos 2, 3 y 4.

Se borró con ellos (era el **punto 30** de `TODO.md`), y con un motivo extra al de
la limpieza: **esta carpeta se deploya**. No hay `netlify.toml` ni `_redirects`, y
Netlify publica la raíz del repo, así que `financeofsports.com/Prototyping/...`
servía esos números inventados a cualquiera que tuviera la URL. Tenían su franja
roja y nadie estaba linkeado a ellos, pero un sitio cuyo argumento entero es que
sus números son verificables no puede servir números falsos desde su dominio.

**La regla que los contenía sigue valiendo para cualquier relleno futuro, y está
en `CONVENCIONES.md`: esos números no se copian a `data/` nunca.** Si mañana uno
de esos clubes publica su balance de 2019, se carga leyendo el documento.

# `referencia/ux.md`: los casos «hoy» que el 360 resolvió (propuesta de texto, sin aplicar)

El 360 arregló tres de los casos que `ux.md` cita como «hoy» (el sitio no lo cumplía). Si siguen diciendo «hoy», la próxima sesión los lee como
pendientes. Propuesta: el mismo caso, en pasado, como ejemplo de qué se arregla y dónde. Solo cambian estas cuatro líneas; el resto del archivo queda igual.

---

En «3. Foco y teclado», el caso del foco al cambiar de vista. Reemplaza `*Caso:* hoy, elegir una liga con Enter borra la fila que tenía el foco y el foco cae en `body`; el Tab siguiente arranca desde el principio de la página.`:

```markdown
  *Caso:* elegir una liga con Enter borraba la fila que tenía el foco y el foco caía en `body`; ahora `focoDeVista()` (`js/principal.js`) lo lleva al título.
```

En «3. Foco y teclado», el caso del selector. Reemplaza `*Caso:* el selector de club abre con el foco en su buscador y cierra con Escape, pero `close()` no devuelve el foco: hay que probar dónde queda.`:

```markdown
  *Caso:* el selector de club abre con el foco en su buscador, cierra con Escape y devuelve el foco al botón que lo abrió (salvo al buscador de Inicio, que lo reabriría).
```

En «4. Toques en el celular», el caso del área mínima. Reemplaza `*Caso:* hoy, en la página de una liga, el nombre de cada club del ranking (`.lg-club`) mide 17 px de alto y «← Todas las ligas» 36 px.`:

```markdown
  *Caso:* en la página de una liga, el nombre de cada club medía 17 px de alto; ahora la fila mide 44 y el botón la cubre entera. Hoy todavía quedan chicos
  en Inicio (atajos, filas de los rankings, «Ver la liga»), Finanzas («Elegí un club») y Mi Cuenta («Entrar con Google»).
```

En «6. Lo elegido se mantiene al volver», el caso. Reemplaza desde `*Caso:* los filtros de la lista de Ligas` hasta `cae más arriba de donde estaba.`:

```markdown
  *Caso:* los filtros de la lista de Ligas (deporte, región, agrupar, orden, informes) viajan en la URL y vuelven; los países que se abrieron a mano se
  plegaban al volver y la altura guardada caía más arriba: ahora se guardan en memoria (`frio.pais`, `js/liga.js`).
```

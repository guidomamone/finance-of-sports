# `referencia/ux.md`: excepción de 44 px para los links en texto corrido (propuesta de texto, sin aplicar)

Al hacer el 361 (áreas de toque fuera de Ligas), la prueba de la sección 4 de `ux.md` quedó vacía en Inicio, Finanzas, Comparar y Mi Cuenta. Un link
dentro de un párrafo se agranda a 44 px sin mover el texto (padding y margen negativo). Pero cuando un párrafo tiene dos links en renglones seguidos, sus
áreas de 44 se pisan, y tocar el texto del primero abre el segundo. Caso real: en la página de una liga, «La lista de los 20 clubes de la temporada sale
de Wikipedia: 2024–25 Serie A, leída el …, con licencia CC BY-SA 4.0», donde «2024–25 Serie A» y «CC BY-SA 4.0» caen uno debajo del otro a 375 px.
Llegar a 44 ahí obliga a agrandar el interlineado del párrafo. WCAG 2.5.8 exceptúa estos links (inline).

Hoy esos párrafos quedan fuera de la expansión (`main p:not(:has(a ~ a)) a` en `css/styles.css`) y la prueba los marca. Propuesta: sumarlos como
excepción decidida, justo debajo de la de las etiquetas de estado, en «4. Toques en el celular»:

```markdown
  *Excepción, ya decidida (no es un pendiente):* un link dentro de un párrafo con más de un link (texto corrido: una atribución, una cita con su
  licencia). Sus áreas de 44 px se pisarían de un renglón al otro y el toque abriría el link equivocado; agrandar el interlineado cambia la lectura.
  Un link solo en su párrafo sí llega a 44, sin mover el texto. Una auditoría `ux` no los marca.
```

Cómo quedan las dos excepciones juntas, la de las etiquetas (ya aplicada) y esta debajo (el mismo texto, nada más):

```markdown
  información de más. Una auditoría `ux` no las marca.
  *Excepción, ya decidida (no es un pendiente):* un link dentro de un párrafo con más de un link (texto corrido: una atribución, una cita con su
  licencia). Sus áreas de 44 px se pisarían de un renglón al otro y el toque abriría el link equivocado; agrandar el interlineado cambia la lectura.
  Un link solo en su párrafo sí llega a 44, sin mover el texto. Una auditoría `ux` no los marca.
```

Con el ok (Guido: «si, excepcion»), el caso del área mínima cambia su segunda frase («Hoy todavía quedan chicos en Inicio…», que el 361 resolvió) por
el caso de los links en texto corrido. Reemplaza las dos líneas que empiezan en `*Caso:* en la página de una liga, el nombre de cada club medía 17 px`:

```markdown
  *Caso:* en la página de una liga, el nombre de cada club medía 17 px de alto; ahora la fila mide 44 y el botón la cubre entera. Los atajos y las filas
  de los rankings de Inicio, «Elegí un club» y «Entrar con Google» medían entre 32 y 38 y ahora miden 44. Los dos links de la atribución de Wikipedia de
  una liga («2024–25 Serie A» y «CC BY-SA 4.0», en renglones seguidos) quedan en su tamaño: son texto corrido (excepción de abajo).
```

Si Guido prefiere lo contrario (que también lleguen a 44), la alternativa es subir el interlineado de esos párrafos en el teléfono a unos 44 px por
renglón, solo cuando tienen más de un link.

# UX: las etiquetas de estado son una excepción al área de 44 px (ok de Guido)

Guido: «ok, pero anotado en algún lado para que luego no me lo repita auditoría como un to-do». Caso: la etiqueta COVID (y la de PRESUPUESTO) mide unos 16 px de alto; agrandarla taparía el toque del chip o de la pastilla de al lado.

## Texto exacto: `producto-y-pantalla-finance-of-sports/referencia/ux.md`, sección 4, debajo del caso del punto de 44 px (con el caso como ancla)

  *Caso:* hoy, en la página de una liga, el nombre de cada club del ranking (`.lg-club`) mide 17 px de alto y «← Todas las ligas» 36 px.
  *Excepción, ya decidida (no es un pendiente):* las etiquetas de estado (`.stat-tag`: COVID, PRESUPUESTO y las que sigan el mismo patrón)
  miden unos 16 px de alto. Agrandarlas taparía el toque del elemento de al lado, su texto también está en el `aria-label` y lo que abren es
  información de más. Una auditoría `ux` no las marca.

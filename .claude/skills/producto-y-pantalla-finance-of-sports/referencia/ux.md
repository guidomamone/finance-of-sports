# UX del sitio: lista de chequeo

Se lee antes de dibujar un mockup, junto con `marca.md`, y se recorre entera antes de pedir el merge de un cambio visible. Cada punto trae su prueba: se
hace en el preview servido, a escritorio y a 375 px (`resize_window` preset `mobile`), con toques reales (`computer`) y no solo con `element.click()`.
Un punto que no aplica, o que no se pudo probar, se dice en la nota de la sesión.

## 1. Navegación y scroll

- [ ] **Otra vista arranca arriba; el ancla, en el ancla.** Otra pestaña, club, liga, grupo o sponsor abre con `scrollY === 0`. Si la URL trae `#<id>`,
  ese elemento queda arriba, debajo del header. Cambiar el año, la moneda o un filtro no mueve la página.
  *Prueba:* scrollear la vista de origen hasta la mitad, entrar a la nueva y leer `scrollY`; con ancla, abrir la URL con `#<id>` y leer
  `getBoundingClientRect().top` del elemento.
  *Caso:* en Ligas, elegir una liga con la lista scrolleada la abría a esa misma altura.
- [ ] **Toda navegación pasa por `escribirURL()`.** Ahí viven el scroll (`scrollDeVista()`), la URL y el historial. Una vista que cambia sola, con un
  `window.scrollTo(0, 0)` propio, se salta las tres cosas.
  *Prueba:* `grep -n "scrollTo" js/` no suma llamadas nuevas.
  *Caso:* el bug de Ligas pasaba porque la lista dibujaba la liga sin cambiar de pestaña, y el `scrollTo` estaba solo en el cambio de pestaña.

## 2. La URL y el botón atrás

- [ ] **Un link copiado abre lo mismo.** Misma pestaña, club, años, liga, ejercicio y filtros, servido y como archivo.
  *Prueba:* copiar `location.href`, abrirlo en una pestaña nueva y comparar; como archivo, con Chrome sin ventana (`navegador-de-preview.md`).
  *Caso:* `?tab=liga&agrupar=nivel&region=europa` abre la lista agrupada por nivel y filtrada.
- [ ] **Atrás y adelante hacen lo que haría un navegador.** Una vista nueva suma una entrada al historial; el año o un filtro la reemplazan. Atrás vuelve a la
  vista anterior y a la altura en que se dejó; adelante, igual.
  *Prueba:* lista → liga → club → atrás → atrás → adelante, leyendo `location.pathname` y `scrollY` en cada paso.
  *Caso:* la lista de Ligas a 1500 px → Serie A → Inter → atrás dos veces vuelve a la lista a 1500.
- [ ] **Nada se pide con una ruta relativa a la barra.** Toda carga dinámica pasa por `fosUrl()`: en `/liga/<id>` y `/club/<id>`, `data/…` apunta a `/liga/data/…`.
  *Prueba:* después de navegar dentro del sitio a una liga y a un club, `performance.getEntriesByType('resource').filter(e => e.responseStatus === 404)` da vacío.
  *Caso:* `data/club-leagues.js` pedía `data/club-leagues/<iso2>.js` sin `fosUrl()`: después de entrar a una liga desde la lista, las tablas de ligas por
  club daban 404 y el selector quedaba sin ligas, en silencio salvo por la consola.
- [ ] **Un id viejo o mal escrito no rompe.** Un club, una liga o un sponsor que no existen se ignoran o se dicen, sin error en la consola.
  *Prueba:* abrir `?tab=liga&liga=no-existe` y `?tab=sponsor&sponsor=no-existe`.
  *Caso:* «No encontramos ese sponsor».

## 3. Foco y teclado

- [ ] **Todo lo que se toca se alcanza con Tab**, en el orden de lectura, con el foco visible (el contorno dorado), y se activa con Enter o espacio. Lo clickeable es
  un `button` o un `a`, nunca un `div` con `onclick`.
  *Prueba:* recorrer la vista solo con el teclado.
  *Caso:* la marca COVID se abre con Enter o espacio y se cierra con Escape.
- [ ] **Al cambiar de vista, el foco va al título de la vista nueva** (con `tabindex="-1"`), no queda en un elemento que se borró.
  *Prueba:* entrar con Enter y leer `document.activeElement`: no puede ser `body`.
  *Caso:* elegir una liga con Enter borraba la fila que tenía el foco y el foco caía en `body`; ahora `focoDeVista()` (`js/principal.js`) lo lleva al título.
- [ ] **Un panel o un modal:** al abrir, el foco entra; Escape lo cierra; al cerrar, el foco vuelve al botón que lo abrió.
  *Prueba:* abrirlo con el teclado, Escape, y leer `document.activeElement`.
  *Caso:* el selector de club abre con el foco en su buscador, cierra con Escape y devuelve el foco al botón que lo abrió (salvo al buscador de Inicio, que lo reabriría).

## 4. Toques en el celular

- [ ] **Área mínima de 44 × 44 px** para todo lo que se toca. El texto puede ser chico; el área no (`padding` o `min-height`).
  *Prueba:* a 375 px, en la consola:
  `[...document.querySelectorAll('main button, main a, header button')].filter(e => e.offsetParent).filter(e => { const r = e.getBoundingClientRect(); return r.height < 44 || r.width < 44; })`
  y revisar cada uno.
  *Caso:* en la página de una liga, el nombre de cada club medía 17 px de alto; ahora la fila mide 44 y el botón la cubre entera. Los atajos y las filas
  de los rankings de Inicio, «Elegí un club» y «Entrar con Google» medían entre 32 y 38 y ahora miden 44. Los dos links de la atribución de Wikipedia de
  una liga («2024–25 Serie A» y «CC BY-SA 4.0», en renglones seguidos) quedan en su tamaño: son texto corrido (excepción de abajo).
  *Excepción, ya decidida (no es un pendiente):* las etiquetas de estado (`.stat-tag`: COVID, PRESUPUESTO y las que sigan el mismo patrón)
  miden unos 16 px de alto. Agrandarlas taparía el toque del elemento de al lado, su texto también está en el `aria-label` y lo que abren es
  información de más. Una auditoría `ux` no las marca.
  *Excepción, ya decidida (no es un pendiente):* un link dentro de un párrafo con más de un link (texto corrido: una atribución, una cita con su
  licencia). Sus áreas de 44 px se pisarían de un renglón al otro y el toque abriría el link equivocado; agrandar el interlineado cambia la lectura.
  Un link solo en su párrafo sí llega a 44, sin mover el texto. Una auditoría `ux` no los marca.
- [ ] **Sin scroll horizontal de la página.** Una tabla ancha scrollea adentro de su caja.
  *Prueba:* `document.documentElement.scrollWidth <= innerWidth`.
  *Caso:* la matriz por nivel de la lista de Ligas scrollea en su caja.
- [ ] **Nada depende del hover.** Lo que en escritorio dice un `title` o un hover, en el teléfono se abre con un toque.
  *Prueba:* a 375 px, tocar cada ícono o etiqueta que tenga explicación.
  *Caso:* el globo de «Posiblemente dentro de otro rubro» (`js/info-tip.js`).

## 5. Carga, vacío y error

- [ ] **Mientras carga, se dice dónde va a ir el dato.** Ni una pantalla en blanco ni el dato del club anterior.
  *Prueba:* en el preview, `read_network_requests` muestra la carga; durante ella, mirar la pantalla (un club que no se abrió antes).
  *Caso:* el puesto de la liga simulada en Finanzas muestra «…» hasta que baja el ranking.
- [ ] **Vacío dice por qué.** Un dato que no está es «—», nunca 0; una lista sin resultados lo dice en una línea.
  *Prueba:* un club sin deuda o caja cargadas, y un filtro de Ligas sin ligas.
  *Caso:* deuda y caja sin dato se muestran «—» y sin las dos no hay deuda neta.
- [ ] **Un error tapa solo lo que rompió** y no queda pegado al dato bueno siguiente. Sin `alert()` ni `confirm()`.
  *Prueba:* renombrar un momento `data/<país>/<id>-data.js` en el worktree, abrir ese club (aparece el aviso), devolver el nombre y abrir otro club (el aviso
  se fue). `read_console_messages` sin errores nuevos.
  *Caso:* `#clubLoadError` se apaga al cargar otro club, porque un error viejo quedaba al lado de los datos que sí cargaron.

## 6. Lo elegido se mantiene al volver

- [ ] **Un filtro, una pestaña interna, un toggle o un grupo abierto sigue igual** al volver con atrás o desde el menú. Lo que tiene que sobrevivir a un link
  copiado va a la URL; lo demás, en memoria mientras dura la visita.
  *Prueba:* cambiar cada control, ir a otra vista, volver con atrás y comparar.
  *Caso:* los filtros de la lista de Ligas (deporte, región, agrupar, orden, informes) viajan en la URL y vuelven; los países que se abrieron a mano se
  plegaban al volver y la altura guardada caía más arriba: ahora se guardan en memoria (`frio.pais`, `js/liga.js`).

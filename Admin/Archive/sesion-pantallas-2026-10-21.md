# Sesión pantallas (Pantallas 7): cierre, excepción de texto corrido en ux.md

## Qué cambió (para CHANGELOG)
- Con el ok de Guido («si, excepcion»), `referencia/ux.md` sección 4 suma la excepción de 44 px para los links en texto corrido (debajo de la de las
  etiquetas de estado), y el caso del área mínima cambia «Hoy todavía quedan chicos…» (lo resolvió el 361) por el caso de la atribución de Wikipedia de una
  liga. El texto, primero en `Admin/propuestas/ux-excepcion-texto-corrido.md` (28f9799cf4 y 6f1a89b9c1, por el candado); aplicado en a599f62147 (el
  caso; el mensaje del commit nombra también la excepción, que el candado frenó ahí) y d555a982cc (la excepción).
- Cada punto de «Qué queda» de esta nota lleva su flecha.

## Qué queda (para TODO)
- Nada de esto. → descartado: no queda nada.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): 361, áreas de toque de 44 px fuera de Ligas

## Qué cambió (para CHANGELOG)
- Bloque «ÁREAS DE TOQUE EN EL TELÉFONO» en `css/styles.css` (hasta 700 px): los controles de Inicio, Finanzas (con club y sin club) y Mi Cuenta crecen a
  44 px; los links en un texto o en una celda agrandan su área sin mover nada; los dos links de «Fuentes» de Finanzas (`.fin-fuentes-link`, nueva clase en
  `js/finanzas-render.js`) ocupan los 44 de verdad porque estaban a 22 px y se pisaban. En la página de una liga, el botón de cada club también mide 44.
  Regla en `Admin/PANTALLA.md`. ASSET_V 1713.
- Verificado a 375 px con la prueba de `ux.md` sección 4, tal cual: vacía en Inicio, Finanzas con Juventus, Finanzas sin club, Comparar y Mi Cuenta. Además,
  ningún link agrandado tapa a otro (el centro de cada uno toca ese link). Sin scroll horizontal. Como archivo a 1280, sin errores; en escritorio no cambia
  nada (todo está dentro del `@media`). `node tools/audit.js`: 0 P0, 0 P1.
- Recorrido de `referencia/ux.md`: es el punto 4; 1, 2, 3, 5 y 6 no cambian (sin navegación, URL, foco ni carga nueva; los controles siguen siendo los
  mismos botones y links).

## Qué queda (para TODO)
- La prueba todavía marca en Ligas los dos links del párrafo de atribución de Wikipedia («2024–25 Serie A» y «CC BY-SA 4.0»): están en renglones seguidos y
  con 44 px cada uno el segundo taparía el texto del primero. Propuesta de excepción (texto corrido, como WCAG 2.5.8) o de interlineado:
  `Admin/propuestas/ux-excepcion-texto-corrido.md`; la decide Guido. → regla: Guido eligió la excepción («si, excepcion»), aplicada en `ux.md` (d555a982cc).
- A 375 px los controles de Finanzas (presets, gestiones, segmentados) quedan un poco más altos: es el costo visible del 361. → descartado: costo aceptado
  con el «Terminado cuando:» del 361, nada que hacer.

## Qué deja de ser cierto en ESTADO
- Nada que no esté en `Admin/PANTALLA.md`.

---

# Sesión pantallas (Pantallas 7): 360, el ejercicio elegido a la vista en la fila de chips

## Qué cambió (para CHANGELOG)
- A 375 px la fila de chips de ejercicio de Comparar (y la de Finanzas, que tenía la misma línea) arrancaba siempre en lo más nuevo, y un ejercicio elegido
  viejo (Juventus 19/20 en Comparar, `?anios=2019,2020` en Finanzas) quedaba fuera de vista. `mostrarElegidosEnFila()` nuevo en `js/finanzas-calc.js`:
  arranca en lo más nuevo salvo que así no se vea ningún elegido; ahí, con el más viejo de los elegidos contra el borde izquierdo. Lo usan
  `js/selector.js` y `js/finanzas-anios.js`. Regla en `Admin/PANTALLA.md`. ASSET_V 1704.
- Verificado a 375 px: Comparar Juventus 19/20 contra 23/24 (lado A: 19/20, 20/21, 21/22; lado B: 22/23, 23/24, 24/25, como antes), Finanzas con los
  ejercicios de siempre (22/23, 23/24, 24/25, como antes) y con `?anios=2019,2020` (18/19, 19/20, 20/21). Como archivo a 1280, sin errores. Escritorio: las
  filas entran enteras, no cambia nada. `node tools/audit.js`: 0 P0, 0 P1.
- Recorrido de `referencia/ux.md`: es el punto 6 (lo elegido a la vista); 1 a 5 no cambian (sin navegación, URL, foco ni carga nueva; sin scroll
  horizontal de la página a 375).

## Qué queda (para TODO)
- Nada de esto. Al tocar un chip la fila se redibuja con la misma regla: si el visitante había corrido la fila, vuelve a lo más nuevo o al elegido más viejo.
  → regla: es el comportamiento elegido, escrito en `Admin/PANTALLA.md` («LA FILA DE CHIPS DE EJERCICIO EN EL TELÉFONO»).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): 360, lo que el sitio no cumplía de la guía de UX

## Qué cambió (para CHANGELOG)
- (a) Foco: al cambiar de vista, `focoDeVista()` (`js/principal.js`, desde `scrollDeVista()`) lleva el foco al primer título visible de la sección nueva
  (`tabindex="-1"`, `.foco-vista` sin contorno); al abrir la página no se mueve. El selector de club devuelve el foco a quien lo abrió (`quienAbrio` en
  `js/selector.js`), salvo al buscador de Inicio.
- (b) 44 px en Ligas, en el teléfono: fila del ranking de 44 px con el botón del club cubriéndola (`::after`), pastillas de ejercicio, «← Todas las ligas»,
  «Ver el informe original», «Abrir todos / Cerrar todos», cada país, el buscador de la lista y el plegable «ligas sin datos» (este sin cambiar cómo se
  ve). La lupa del header vuelve a 44 de ancho a menos de 380 px (estaba en 40).
- (c) La lista de Ligas guarda en memoria los países abiertos o cerrados a mano y el plegable de las ligas sin datos (`frio.pais`, `frio.sinDatos`);
  `setFiltros()` ya no resetea lo abierto si los filtros no cambiaron (que es lo que pasa con atrás).
- Regla en `Admin/PANTALLA.md` («EL ESTADO EN LA URL» y dos puntos nuevos). Propuesta `Admin/propuestas/ux-casos-360.md`: los casos «hoy» de `ux.md`
  que esto resolvió, en pasado (sin aplicar: es una skill). ASSET_V 1703.
- Verificado servido a 375 px con toques reales: abrir Italia en la lista, tocar Serie B (abre arriba, foco en «Serie B»), atrás (Italia abierta, misma
  altura 1321); en la Serie A, tocar la cifra de Juventus abre Juventus arriba con el foco en su título; el barrido de 44 px en la página de una liga y en la
  lista da cero (salvo links dentro de un párrafo y la etiqueta COVID). Escritorio: el selector abierto con el teclado desde la lupa vuelve a la lupa con
  Escape. Como archivo a 1280: lista → liga → club → atrás → atrás, sin errores. `node tools/audit.js`: 0 P0, 0 P1.

## Recorrido de `referencia/ux.md`
- 1: el scroll no cambia; ningún `scrollTo` nuevo. 2: sin cambios en la URL ni cargas nuevas. 3: es lo que arregla (a). 4: es lo que arregla (b), en
  Ligas. 5: no aplica. 6: es lo que arregla (c).

## Qué queda (para TODO)
- Del barrido de 44 px a 375, fuera de Ligas (no lo toqué: agrandarlos cambia esas pantallas, sobre todo las 40 filas de Inicio): Inicio, los atajos de
  club (32 px), las filas de los rankings (`.vid-fila`, 37) y «Ver la liga» / «Todas las ligas» (`.vid-link`, 32); Finanzas sin club, «Elegí un club»
  (38); Mi Cuenta, «Entrar con Google» (34); el input del buscador de Inicio (22, dentro de una caja más grande); y la etiqueta COVID (16) en todas.
  → descartado: hecho en el 361 (03eab69f20); la etiqueta COVID es una excepción decidida (`ux.md`).
- Aplicar `Admin/propuestas/ux-casos-360.md` con el ok de Guido. → descartado: aplicado (8cd88a0976).

## Qué deja de ser cierto en ESTADO
- Nada que no esté en `Admin/PANTALLA.md`.

---

# Sesión pantallas (Pantallas 7): marca COVID en Comparar, Ligas y el selector

## Qué cambió (para CHANGELOG)
- Con el ok de Guido al mockup («ok a pantallas»), la etiqueta COVID va también en Comparar (chips de ejercicio de los dos lados y cabecera de la tabla),
  en la página de una liga (debajo de la pastilla de cada temporada de la pandemia y en la línea «Suma de los N clubes con balance AAAA») y en el paso
  «Elegí el ejercicio» del selector («2020/2021 · COVID» en la opción y la etiqueta al lado del desplegable). `esCovidPares()` nuevo en
  `js/finanzas-calc.js` (todos los pares club-ejercicio en la ventana); `js/selector.js`, `js/liga.js`, `css/styles.css`; regla en `Admin/PANTALLA.md`
  («Marca COVID»). ASSET_V 1699.
- Verificado servido a escritorio: Comparar Juventus 19/20 contra 23/24 (19/20 y 20/21 con la etiqueta en los dos lados, la cabecera solo en A; tocar la
  etiqueta abre el globo y no cambia el ejercicio), Serie A 2021 y Brasileirão 2021 (pastillas 2020 y 2021 y la línea), el selector con Juventus (opciones
  «2020/2021 · COVID» y «2019/2020 · COVID», etiqueta al elegir). A 375 px: Comparar y Serie A sin scroll horizontal, y un toque real en la etiqueta de 2020
  abre el globo sin cambiar el año. Como archivo a 1280 (Chrome sin ventana): Serie A y Comparar con las mismas marcas, sin errores. `node tools/audit.js`:
  0 P0, 0 P1.

## Recorrido de `referencia/ux.md`
- 1 Navegación y scroll: no hay navegación nueva; ningún `scrollTo` nuevo; tocar la etiqueta o cambiar de temporada no mueve la página.
- 2 URL y atrás: no cambia lo que va en la URL; ninguna carga nueva (la marca se deriva de lo cargado). Ids viejos: no aplica.
- 3 Foco y teclado: las etiquetas fuera de un botón (pastilla de liga, línea, cabecera de Comparar, selector) reciben foco con Tab, abren con Enter y
  cierran con Escape (probado en la pastilla y la línea); dentro de un chip no suman un segundo elemento enfocable. El foco al cambiar de vista sigue en el 360.
- 4 Toques: **no cumple el área de 44 px**: la etiqueta mide unos 16 px de alto, igual que la de Finanzas ya aprobada; agrandarla taparía el toque del chip
  o de la pastilla de al lado. Sin scroll horizontal a 375. No depende del hover (se abre con un toque).
- 5 Carga, vacío y error: no aplica (sin carga propia; sin ranking cargado, la temporada no lleva marca).
- 6 Lo elegido al volver: tocar la etiqueta no cambia el ejercicio elegido.

## Qué queda (para TODO)
- La etiqueta COVID mide menos de 44 px de alto en todas las pantallas (ux.md, punto 4): decidir si se acepta como excepción o si se le da más área sin
  pisar el chip o la pastilla vecinos. → regla: Guido la aceptó como excepción, escrita en `ux.md` (96929f621b).
- Antes de este cambio, y sin relación con él: a 375 px la fila de ejercicios de Comparar arranca mostrando el más nuevo, así que el ejercicio elegido de
  un lado (19/20) queda fuera de vista. → descartado: hecho (a994ea6c9d, `mostrarElegidosEnFila()`).

## Qué deja de ser cierto en ESTADO
- «Finanzas multi-año» / marca COVID: ya no es solo de Finanzas; también Comparar, Ligas y el selector.

---

# Sesión pantallas (Pantallas 7): mockup de la marca COVID en Comparar, Ligas y el selector (sin código)

## Qué cambió (para CHANGELOG)
- `Prototyping/Covid/mockup-2.html`: dónde va la etiqueta COVID ya aprobada en Comparar (debajo del ejercicio elegido de cada lado y arriba del nombre
  en la cabecera de la tabla), en la página de una liga (debajo de la pastilla de cada temporada de la pandemia y al lado de la línea del ejercicio) y en
  el paso de ejercicio del selector (la opción dice «2021 · COVID» en texto, y la etiqueta aparece al lado del desplegable después de elegir). Usa números
  reales del 2026-10-21: Juventus 19/20 contra 23/24, la Serie A 2021 y Flamengo. Lo miré a escritorio y a 375 px, sin desborde. No se tocó `index.html`,
  `js/` ni `css/`.
- Hallazgo para la regla de Ligas: en las 65 temporadas de liga afectadas, todos los clubes del ranking caen dentro de la pandemia; no hay ninguna mixta.

## Qué queda (para TODO)
- El ok de Guido a las tres ubicaciones; después, el código, recorriendo `referencia/ux.md` antes de pedir el merge. → descartado: aprobado («ok a
  pantallas») y construido (f144a3c50d).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): guía de UX aplicada

## Qué cambió (para CHANGELOG)
- Con el ok de Guido («ok a la guia de ux»): `referencia/ux.md` nuevo en la skill `producto-y-pantalla-finance-of-sports`, idéntico al bloque de
  `Admin/propuestas/ux-del-sitio.md`, y sus dos líneas en el `SKILL.md`: leerla antes del mockup (paso 2) y recorrerla antes de pedir el merge (paso 4).
  Para que el candado de skills lo aceptara, la propuesta suma cómo quedan los pasos 2 y 4 enteros (el mismo texto).

## Qué queda (para TODO)
- Los tres pendientes de la sección 3 de la propuesta: el foco al cambiar de vista y al cerrar el selector, las áreas de toque chicas en la página de una
  liga y los países de Ligas que se pliegan al volver. → descartado: hechos en el 360 (9e2a0c7ae6).
- Archivar `Admin/propuestas/ux-del-sitio.md` en `Admin/Archive/` (ya está aplicada). → descartado: no es trabajo de Pantallas; las tres
  propuestas ya aplicadas (`ux-del-sitio.md`, `ux-casos-360.md`, `ux-excepcion-texto-corrido.md`) las archiva la principal con esta nota (el README
  anota la Versión, y `Admin/PANTALLA.md` cita la última por su ruta).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): las tablas de ligas por club con fosUrl()

## Qué cambió (para CHANGELOG)
- `data/club-leagues.js` pedía `data/club-leagues/<iso2>.js` con una ruta relativa: después de navegar dentro del sitio a `/liga/<id>` o `/club/<id>`, las
  23 tablas daban 404 y el selector quedaba sin ligas. Ahora pasa por `fosUrl()`. Revisadas las demás cargas de `js/` y `data/`: todas usaban `fosUrl()`;
  los dos `href="fuentes/…"` que arma el JS los cubre `absolutizarLink()`. ASSET_V 1689.
- Verificado servido: de la lista de Ligas a una liga (23 tablas con 200, 320 clubes con liga); entrada directa a `/liga/it-seriea.html` → Inter, con el selector
  abierto y las ligas listadas; entrada directa a `/club/boca-ar.html`: sin ningún 404. Como archivo a 1280 (Chrome sin ventana): de la lista a una liga, las
  tablas cargan y no hay errores en la consola. `node tools/audit.js`: 0 P0, 0 P1.
- La propuesta de UX usa este caso como ejemplo, en pasado, y lo saca de sus pendientes.

## Qué queda (para TODO)
- Nada de esto. → descartado: no queda nada.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): propuesta de guía de UX (sin aplicar)

## Qué cambió (para CHANGELOG)
- `Admin/propuestas/ux-del-sitio.md`: el texto exacto de `referencia/ux.md` para la skill `producto-y-pantalla-finance-of-sports` (lista de chequeo:
  navegación y scroll, URL y atrás, foco y teclado, toques de 44 px, carga y estados, lo elegido al volver; cada punto con prueba y caso real) y las dos
  líneas para su `SKILL.md`. No se aplicó.

## Qué queda (para TODO)
- El ok de Guido al texto; después, aplicarlo tal cual. → descartado: aprobado y aplicado (123121a963).
- Si lo aprueba, los tres pendientes de la sección 3 de la propuesta (foco al cambiar de vista y al cerrar el selector, áreas
  de toque chicas en la página de una liga, países de Ligas que se pliegan al volver). → descartado: hechos en el 360 (9e2a0c7ae6).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): scroll al cambiar de vista

## Qué cambió (para CHANGELOG)
- Bug de Guido: en Ligas, elegir una liga después de scrollear la lista abría la liga a la misma altura. Arreglado en un solo lugar para toda navegación:
  `scrollDeVista()` en `js/principal.js`, que corre en cada `escribirURL()`. Otra vista (pestaña, club, liga, grupo, sponsor) arranca arriba, o en el
  ancla si la URL trae una; el año, la moneda o un filtro no mueven nada. Atrás, adelante y recargar vuelven a la altura de esa entrada
  (`history.scrollRestoration = 'manual'`, una clave `k` por entrada, la altura se anota antes de cada click, al apretar atrás y cuando el scroll se
  detiene). Se sacaron los `scrollTo(0, 0)` de `irASeccion()`, `GRUPO_VIEW.abrir()` y `SPONSOR_VIEW.abrir()`; los del selector quedan. Regla en
  `Admin/PANTALLA.md` («EL ESTADO EN LA URL»). ASSET_V 1688.
- Verificado servido a 1024 px: lista (1500) → liga (0) → club (0) → atrás (liga a 1300) → atrás (lista a 1500) → adelante (1300) → adelante (900);
  cambiar el año de la liga no mueve; pestaña del nav arriba; recarga vuelve a la altura; `#finTrendCard` en la URL cae en el card. A 375 px con
  toques reales: liga arriba y atrás vuelve a la lista. Como archivo a 1280 (Chrome sin ventana por CDP): lista → liga → club → atrás → atrás, igual.
  `node tools/audit.js`: 0 P0, 0 P1.

## Qué queda (para TODO)
- A 375 px los países de la lista de Ligas están plegados y al volver con atrás se vuelven a plegar: la altura se restaura hasta donde da la lista
  plegada. Lo que se abrió debería mantenerse al volver (va de ejemplo en la guía de UX). → descartado: hecho en el 360 (`frio.pais`).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): marca COVID, a la espera del ok a las guías y a la etiqueta

## Qué queda (para TODO)
- La rama trae el estallido (`9eeca96600`) y NO se mergea: se reemplaza por la etiqueta de estado (artifact versión 3, `Prototyping/Covid/mockup-covid.html`) cuando Guido apruebe las guías
  (`Admin/propuestas/marca-del-sitio.md`) y la etiqueta; después, un solo merge. → descartado: la etiqueta reemplazó al estallido y ya está en main.
- → regla (para `referencia/navegador-de-preview.md`, con el ok de Guido): el Chrome sin ventana (`--headless=new --window-size=375,…`) no baja de unos 500 px de layout, así que la captura a 375 px
  sale recortada a la derecha y no sirve para juzgar el teléfono; el 375 se mira en el Browser pane con `resize_window` (preset `mobile`) sobre el sitio servido, y el `file://` se mira a 1280.

---

# Sesión pantallas (Pantallas 6): marca COVID implementada

## Qué cambió (para CHANGELOG)
- Marca COVID (aprobada por Guido, versión sobria): un recuadro con borde de estallido, azul del sitio con COVID en blanco, en los ejercicios con cierre entre 2020-03-31 y 2021-12-31 (se deriva de
  `cierreEjercicio()`, sin campo). Va en el card de cada ejercicio, la cabecera de la tabla multi-año y el número «Ingresos» de arriba. `role="img"` + `aria-label`, globo con `js/info-tip.js`
  (tocarla en un card no elige el año), Tab/Enter/Escape; claves `covid.aria` y `covid.tip` en `en.js`. `js/finanzas-calc.js` (`esCovid`, `marcaCovidHtml`; el `keydown` se guarda con `typeof document`
  porque `tools/generate-club-pages.js` carga ese archivo sin navegador), `js/finanzas-anios.js`, `js/finanzas-multi.js`, `css/styles.css`, regla en `Admin/PANTALLA.md`. Verificado servido con Juventus (cards
  19/20 y 20/21, 2 cabeceras, KPI), a 375 px (sin desborde, la marca no se corta) y en inglés. ASSET_V 1657; regeneradas `fuentes/`, `club/` y `liga/`. `node tools/audit.js`: 0 P0, 0 P1.
- NO probado: `file://` en un navegador, ni el modo oscuro del sitio real (el sitio no tiene modo oscuro: el del mockup era solo del mockup).

## Qué queda (para TODO)
- Comparar, Ligas y el selector de ejercicio no llevan la marca todavía. → descartado: hecho (f144a3c50d).

## Qué deja de ser cierto en ESTADO
- «Finanzas multi-año»: los ejercicios con cierre en la ventana de la pandemia llevan la marca COVID (card, cabecera de tabla y número de ingresos).

---

# Sesión pantallas (Pantallas 6): mockup de la marca COVID (sin código)

## Qué cambió (para CHANGELOG)
- Mockup de la marca COVID (un estallido de historieta con la palabra) en `Prototyping/Covid/mockup-covid.html`, con números reales de Juventus y Atalanta: la marca en tres tamaños, dónde va (card de
  ejercicio, cabecera de la tabla multi-año y número grande de arriba), el teléfono a 375 px, modo oscuro, texto alternativo, globo y teclado. La ventana se deriva de `cierreEjercicio()` (cierre entre
  2020-03-31 y 2021-12-31), sin campo nuevo. No se tocó `index.html`, `js/` ni `css/`.

## Qué queda (para TODO)
- El ok de Guido al mockup; después, el código (helper compartido, `t()` en español e inglés, claves en `en.js`, `Admin/PANTALLA.md`) y verificar servido y como archivo.
  → descartado: aprobado y hecho (Pantallas 6).
- Comparar, Ligas y el selector de ejercicio quedan para después de aprobar. → descartado: hecho (f144a3c50d).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): Inicio sin conteos de lo cargado

## Qué cambió (para CHANGELOG)
- Inicio ya no muestra cuánto hay cargado: se sacó la línea «320 clubes · 23 países · 1301 ejercicios» (el elemento `#iniConteo`, `pintarConteoInicio()` y las claves `ini.clubs`, `ini.countries` e
  `ini.years` de `en.js`; el estilo `.ini-eyebrow`). Las tarjetas de «Los que más facturan» dicen solo «Ejercicio AAAA» (no «262 clubes con balance»). El ranking con los US$ de cada club QUEDA
  (se había sacado en la tanda anterior por la lectura de «(c)»; se restauró según la aclaración: es contenido, como el ranking de una liga). Sigue fuera el aviso de «% sin desglosar» de las
  tarjetas de liga de Inicio. Verificado servido: sin conteos y con los 40 valores en US$. ASSET_V 1593.

## Qué queda (para TODO)
- `file://`: no pude verlo en Brave. Dos `open -a "Brave Browser" file:///…/fos-pantallas/index.html` no abrieron una ventana nueva visible para `app_list_windows`; la ventana que se ve es la de la
  principal, con `finance-of-sports/index.html` (la carpeta principal, no la mía). Falta que alguien lo mire con esta rama mergeada.
  → descartado: el `file://` se mira con Chrome sin ventana (`referencia/navegador-de-preview.md`); Pantallas 7 lo hizo en cada tanda.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): 344 implementado, números fuera de Ligas e Inicio, Escocia separada

## Qué cambió (para CHANGELOG)
- 344: la lista de la pestaña Ligas pasa a ser la del mockup aprobado: filtros de deporte (solo si hay más de uno con datos), región y «Con informes»; agrupar por país (plegable), deporte o
  nivel (matriz país × nivel de un deporte); ordenar A–Z o por cantidad de ligas; deporte, región, agrupación, orden e informes en la URL (`?tab=liga&agrupar=nivel`). Sin conteos de clubes
  ni plata en la lista. `js/liga.js` (`estadoFrio()` y vistas), `js/principal.js` (la URL), `css/styles.css` (`.lg-ffila`, `.lg-pais2`, `.lg-lrow`, `.lg-mat`…), claves `liga.f.*` en `data/lang/en.js`
  (y se borraron las huérfanas).
- Por pedido de Guido se sacan los números: el encabezado de una liga ya no dice «N de M con ejercicio AAAA» ni cuántos clubes trae cada ejercicio (ahora país · división · deporte y el año), y las tarjetas
  de ranking de Inicio ya no llevan «N de M cargados», «+ N clubes más», el aviso de «% sin desglosar» ni US$ por club. El ranking de una liga y «La liga en total» quedan.
- Escocia separada de Inglaterra: `COUNTRIES.SCT` (Escocia), la Premiership escocesa con `country:'SCT'`, `CLUB_NATION` y `nationOf(clubId)` en `data/leagues.js` (Celtic → `SCT`; los ids y la carpeta
  `data/gb/` no cambian), `countryOf()` del selector y las banderas de `js/liga.js` usan `nationOf`, y `tools/generate-club-pages.js` también. La bandera de Inglaterra es la propia. Gales: el mecanismo
  está y la regla en `Admin/CONVENCIONES-DATOS.md`; no hay clubes ni ligas galeses cargados todavía. Los estaduales de Brasil quedan como están, sin nivel.
- Verificado servido a escritorio y 375 px: la lista por país, por deporte y por nivel (sin desborde de la página), el filtro de rugby, Premiership bajo Escocia, Celtic bajo Escocia en Finanzas y en
  el selector, el encabezado y Inicio sin números. `node tools/audit.js`: 0 P0, 0 P1. ASSET_V 1580; regenerados `fuentes/`, `club/` y `liga/`. NO se probó `file://` en un navegador (el panel lo abre como captura
  sin estilos y Claude in Chrome no conecta): no cambió nada de `index.html` salvo la versión.
- En el worktree: `preparar` dejó 28 enlaces a PDFs que ya no existen en la carpeta principal; los borré (solo enlaces rotos, ningún archivo) porque hacían fallar dos chequeos de `audit.js`.

## Qué queda (para TODO)
- Si se carga un club o una liga galesa: `WAL` en `COUNTRIES`, la Cymru Premier con `country:'WAL'` y los clubes galeses (Cardiff, Swansea) en `CLUB_NATION`.
  → regla: está en `Admin/CONVENCIONES-DATOS.md`.
- `leagueAt()` devuelve null hasta que se abre el selector (las tablas de `data/club-leagues/` son lazy): el subtítulo de Finanzas no dice la liga al entrar directo a un club. Es de antes de esta tanda.
  → descartado: ya no pasa (2026-10-21, `/club/juventus-it.html` directo dice «Serie A · Italy»).
- Texto de Inicio «Revenue in dollars for every club loaded…» (`vid.sub`) sigue hablando de los clubes cargados, sin números. → descartado: el texto
  de hoy es «one financial year per league», ya no habla de lo cargado.

## Qué deja de ser cierto en ESTADO
- «Inicio, Ligas y navegación»: Ligas es una lista con filtros de deporte, región e informes, agrupada por país, deporte o nivel, con el estado en la URL; Inglaterra y Escocia son países distintos.

---

# Sesión pantallas (Pantallas 6): 344, el mockup sin conteos ni plata

## Qué cambió (para CHANGELOG)
- 344: por pedido de Guido el mockup de Ligas ya no muestra cuántos clubes hay cargados ni plata en las filas, los países ni las matrices: queda el nombre, el país, el deporte, el nivel, «Con datos / Sin datos
  todavía» y los informes propios. El orden «Más clubes cargados» y «Mayor ingreso» se cambió por «Más ligas». Se republicó en el mismo artifact (versión 2).

## Qué queda (para TODO)
- La pestaña Ligas del sitio de hoy: la lista inicial ya muestra solo el nombre de cada liga, pero hay números en el encabezado de una liga (país · división · «N de M con ejercicio AAAA» y las pastillas de ejercicio),
  en el ranking y el total «La liga en total» (que son el contenido de la pantalla) y en las tarjetas de Inicio («N de M cargados» y US$ por club). Esperan la confirmación de Guido de si el pedido vale para el sitio.
  → descartado: Guido confirmó y se sacaron (tanda «344 implementado»).
- Los estaduales de Brasil (Paulista A1, A2, A3) no tienen nivel en los datos (`tier` ausente): decidir dónde van en la lista. → descartado: decidido
  en el 344, quedan sin nivel (`tier:null`, `scope:'estadual'`).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 258, índice partido por país o liga

## Qué cambió (para CHANGELOG)
- 258: se miró con la skill `escala-finance-of-sports` (sección B, payload eager) y todavía no llegó el momento: no se implementó nada. Medido el 2026-10-21 con 320 clubes: `data/clubs.js` 66,9 KB
  (11,2 KB comprimido) y `data/club-index.js` 69,6 KB (6,5 KB comprimido), o sea unos 55 bytes comprimidos por club; el payload eager completo (los `<script src="data/…">` de `index.html`) es
  250 KB crudo y 46,5 KB comprimido, y lo que escala por club es solo esos dos archivos (17,7 KB comprimidos).

## Qué queda (para TODO)
- 258 se cierra con su disparador, que la skill ya fija como «problema observable del payload eager comprimido»: a 55 bytes comprimidos por club, el payload eager comprimido llega a ~100 KB con ~1.300 clubes
  cargados y a ~200 KB con ~3.000 (a 1.000 clubes: ~84 KB; a 10.000: ~0,6 MB). Propuesta de umbral para reabrirlo: payload eager comprimido > 150 KB (~2.200 clubes) o `clubs.js` + `club-index.js` crudos > 1 MB.
  Medirlo con `grep -o 'src="data/[^"?]*' index.html | sed 's/src="//' | xargs cat | gzip -9c | wc -c`. Cuando se reabra: la premisa de la skill (el destino de `fiscalYearStart` es `club-index.js`, no el archivo del club)
  y partir por país no compra lazy-load si el selector necesita la tabla entera para dibujarse; lo que sirvió con `club-leagues.js` fue sacarlo del camino eager detrás de una frontera async.
  → TODO 258 (ya con el umbral de 150 KB).
- Si se quiere, agregar ese umbral como chequeo a `checkEscala()` de `tools/audit.js` (P3 `payload-eager`), que hoy proyecta bytes crudos y no comprimidos (lo pide Pipeline).
  → TODO 258 (parte del mismo disparador).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 344, mockup de Ligas con muchos países y deportes

## Qué cambió (para CHANGELOG)
- 344: mockup de la pestaña Ligas con ligas de distintos países y deportes: `Prototyping/Ligas/mockup-344.html` y artifact https://claude.ai/artifact/CzmEuNtdt7i2yHNrDDi2Aa.
  Con los datos reales de las ligas (`LEAGUES`, `RANKINGS_INDICE`, ingresos de cada ranking, informes de `data/informes.js`). Muestra el estado de hoy, una versión interactiva
  (filtros de deporte y región; agrupar por país, deporte o nivel; ordenar A–Z, por clubes cargados o por ingreso; «Con informes»; buscador), una tabla de cómo se comporta con
  66, 150 y 400 ligas, y la página de una liga con el bloque Informes (Premier, Bundesliga, Premiership Rugby sin informes y Primera de Argentina). No se implementó nada.
  Verificado a escritorio y a 375 px (sin desborde de la página; la matriz por nivel scrollea dentro de su caja).

## Qué queda (para TODO)
- Esperar el ok de Guido a las decisiones del mockup: agrupar por país por default; niveles solo dentro de país y deporte; países plegados; filtro «Con informes» con los informes propios
  de la liga (el de la UEFA cubre toda Europa y no distingue). → descartado: aprobado e implementado (tanda «344 implementado»).
- Hallazgo de datos: el país `GB` se llama «Inglaterra» y hoy agrupa también la Premiership escocesa de fútbol. Con más ligas conviene separar Escocia, Gales e Irlanda del Norte o llamar
  al grupo «Reino Unido» (`COUNTRIES` en `data/leagues.js`). Es de datos, lo decide la principal o Guido. → descartado: Escocia separada en el 344;
  Gales tiene su regla.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 340 reabierto, index.html sin base ni rutas con «/»

## Qué cambió (para CHANGELOG)
- `index.html` va sin `<base>` y sin script que lo escriba. `js/i18n.js` calcula `FOS_RAIZ` desde la URL de su propio script (`<raíz>/js/i18n.js`) y expone `fosUrl(ruta)`;
  lo usan todas las cargas dinámicas (club, ranking, estimados, idioma, contexto, auditoría, entidades, gestiones, grupo, sponsors, correcciones). Los links relativos
  (`fuentes.html`, `fuentes/<id>.html`, `correcciones.html`) se reescriben a absolutos al cargar (`absolutizarLink()` en `js/principal.js`) y, los que arma el JS después,
  justo antes de usarlos (pointerdown, click, contextmenu, focusin). Las páginas generadas siguen con su `<base>` estático (lo escribe el generador). Anda servido (también en
  `/club/<id>` y `/liga/<id>`) y abierto como archivo, porque la raíz sale de la URL del script y no de la barra. Verificado servido: portada → liga → Burnley, atrás y adelante,
  `/liga/gb-premierleague.html` directo a escritorio y 375 px (Brighton), y un link `fuentes/<id>.html` armado por JS da 200 tras el pointerdown. `node tools/audit.js`: 0 P0, 0 P1. ASSET_V 1564.
- Sin probar: abrir `index.html` por `file://` en un navegador (el panel lo abre como captura sin estilos y Claude in Chrome no conectaba). Por construcción no hay ruta con `/` ni base:
  `FOS_RAIZ` sale de `file:///…/js/i18n.js`. Conviene que Guido lo abra una vez.

## Qué queda (para TODO)
- Que Guido confirme `file://`. → descartado: verificado con Chrome sin ventana (Pantallas 7, en cada tanda).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 342, título de la pestaña y <base> doble

## Qué cambió (para CHANGELOG)
- 342: el `<title>` de la pestaña sigue a la ruta (`tituloDe()` en `js/principal.js`, desde `escribirURL()`): club o liga con el nombre del sitio, y la portada con el título
  del sitio (en el idioma elegido). En la ruta por la que se entró queda el título de la página generada. Y `tools/generate-club-pages.js` ya no escribe su `<base href="/">`
  (lo trae la plantilla `index.html`): una sola base por página. `--check` al día. Verificado en el preview: liga directa → club → atrás → Inicio. ASSET_V 1562.

## Qué queda (para TODO)
- Nada. → descartado: no queda nada.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 340, rutas relativas en /club/<id> y /liga/<id>

## Qué cambió (para CHANGELOG)
- 340: `index.html` lleva `<base href="/">` (la app corre también en `/club/<id>` y `/liga/<id>`). Sin eso toda ruta relativa apuntaba a `/liga/data/…`: elegir un
  club no cargado desde una liga fallaba con «No se pudieron cargar los datos», y lo mismo los links `fuentes.html`, `fuentes/<id>.html` y `correcciones.html`. Elegí la
  base y no rutas absolutas en cada carga porque cubre scripts, `fetch`, `I18N_BASE` y los `href` a la vez. Los links `#ancla` que cambian con una base
  (irían a `/#…`) ya hacen `preventDefault` (índice de Finanzas, sponsors). Verificado en el preview: portada → liga → Burnley (carga y la URL pasa a `/club/burnley-gb`),
  atrás y adelante, `/club/boca-ar.html` y `/liga/gb-premierleague.html` directos, y 375 px (Brighton, sin desborde). ASSET_V 1561; regeneradas `fuentes/`, `club/` y `liga/`.

## Qué queda (para TODO)
- El generador (`tools/generate-club-pages.js`) ya mete su propio `<base href="/">`: ahora la página tiene dos (el primero manda, inofensivo). Pipeline puede sacar el suyo.
  → descartado: hecho en el 342 (el generador ya no escribe su base).
- El `<title>` y la descripción de la página generada no cambian cuando el visitante navega dentro de la app (queda el del club o la liga de entrada); solo lo ven la pestaña
  del navegador y el historial. Si molesta, hay que actualizar `document.title` en `escribirURL()`. → descartado: hecho en el 342 (`tituloDe()`).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): to-do 247, registro público de correcciones

## Qué cambió (para CHANGELOG)
- **Registro público de correcciones**, con las 4 decisiones de Guido: se muestra también lo anterior al registro (marcado «anterior al registro»; la vista
  filtra «desde el registro» por defecto), el motivo en español (el inglés es opcional), sha corto sin link, trailer `Corrige:`.
- `tools/generar-correcciones.mjs` (hecho acá, no por Pipeline, porque no había otra sesión de Pipeline): lee el historial de git de los `-data.js`
  (un solo `git log --raw -M`, caché por blob en `Generados/.cache-correcciones.json`, gitignoreada), compara versiones consecutivas y escribe
  `data/correcciones/correcciones.json`, `<iso2>.json` por país (existe aunque esté vacío) y `correcciones.csv`. `--check` y `--sin-motivo` (para audit).
  Hoy: 236 eventos en 56 clubes, 14 desde el registro (20/10/2026), ninguno con motivo todavía.
- `tools/audit.js`: `correcciones-desfasado` (P2) y `correccion-sin-motivo` (P2; obliga desde 2026-10-21, `OBLIGA_DESDE` en el generador).
  P2 y no P1: el commit que corrige un dato deja el registro un commit atrás hasta el próximo regenerado. `tools/generadores.mjs`: sumado a GENERADORES.
- `tools/generate-club-pages.js`: `correcciones.html` en `sitemap.xml`. `.gitignore`: la caché.
- Pantalla: `correcciones.html` (página propia con filtros), `js/correcciones.js` (compartido), bloque «Correcciones a estos números» en Finanzas debajo de
  «Quién auditó» (+ link en el índice de la ficha), punto dorado en la tarjeta de un ejercicio con correcciones, link «Correcciones» en el pie, sección en
  `metodologia.html`, claves `corr.*` en `data/lang/en.js`, sección en `Admin/PANTALLA.md`. `ASSET_V` 1537.
- Verificado en preview a escritorio y a 375 px (sin scroll horizontal): la página, el bloque en Finanzas con club con y sin correcciones. audit P0/P1 en 0.

## Regla de proceso nueva para `Admin/CONVENCIONES.md` (la pasa la principal)
**Un commit que corrige un dato publicado lleva el trailer `Corrige: <motivo en una frase, en español, sin números de to-do>`** (opcional `Corrige-en:` con la
versión en inglés). «Corrige un dato publicado» = cambia un importe, una categoría, las filas, un total, la caja o la deuda, la moneda, el tipo de cambio, la
fuente o el perímetro de un ejercicio que ya estaba en el sitio (no un año o club nuevo). Alternativa: una línea en `Admin/registros/correcciones.jsonl`
`{"commit":"<sha>","club":"<id>","anio":2024,"motivo_es":"…","motivo_en":"…","fuente":"…"}`. El motivo es público: se escribe para un hincha o un periodista, nunca
jerga interna. `node tools/audit.js` da `correccion-sin-motivo` (P2) si falta, desde el 2026-10-21.

## Queda pendiente (para TODO)
- Curar los motivos de los eventos con más impacto (valor, retiros, recargas) en `Admin/registros/correcciones.jsonl` (paso 2 del plan, con subagentes que lean el
  cuerpo del commit y `Admin/registros/ajustes-manuales.jsonl`). Hoy todo dice «Motivo no registrado». → TODO 364: «el
  registro de correcciones, curado», con este punto, el inglés del motivo, el Data Package y la revisión de «total» y «otro» (los de abajo). Al
  2026-10-21 `Admin/registros/correcciones.jsonl` todavía no existe.
- El inglés del motivo: no hay traducción automática al generar; sin `motivo_en`/`Corrige-en:` la página en inglés muestra el español. Decidir si se traduce al curar.
  → TODO 364.
- `tools/worktree.mjs mergear` debería regenerar `data/correcciones/` (como los otros generados) y `tools/exportar-paquete.mjs` sumar el registro al Data Package.
  → descartado lo de `mergear`: ya lo regenera (`OTROS_GENERADOS`); el Data Package → TODO 364.
- Los shas del registro son los de la rama: un squash o rebase al mergear los cambia; con merge normal o fast-forward quedan. → descartado: la principal
  mergea con `worktree.mjs mergear` (merge normal), no con squash.
- El punto de la tarjeta de ejercicio no lleva link (la tarjeta es un botón): el detalle está en el bloque de abajo. → descartado: decisión de diseño, el
  detalle está en el bloque.
- Revisar que los tipos «total» y «otro» de los eventos de hoy (246, 245) no tengan ruido de renombres; los 0→null de caja y deuda ya se filtran.
  → TODO 364.

## Qué deja de ser cierto en ESTADO
- Agregar: el registro de correcciones (`correcciones.html`, `data/correcciones/`, `tools/generar-correcciones.mjs`, bloque en Finanzas) y que `data/` y el
  mapa «Dónde vive cada cosa» lo incluyen; `correcciones.html` entra a la lista de páginas de la raíz.

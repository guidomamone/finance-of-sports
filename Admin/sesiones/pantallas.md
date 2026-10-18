# Cierre del worktree pantallas (rama `pantallas`)

Lo completa la sesión del worktree mientras trabaja; la principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- To-do 293: en el estado frío de Ligas cada liga muestra solo su nombre (`botonLiga()` en `js/liga.js`), sin "N clubes · año", que se
  leía como que la liga tenía un solo ejercicio. Botón de 44 px de alto (`.lg-liga` en `css/styles.css`). Mockup aprobado: tableros
  "Ligas · solo el nombre" de "Pantallas FoS". ASSET_V 1254.
- Estimado de club nuevo PRENDIDO (decisión de Guido, 2026-10-18: en Ligas todo club sin balance figura como estimado, aunque tenga 50%
  de error). `tools/estimar.mjs`: todo club de la lista de la liga sin balance ese año (que nunca cargamos, o cargado pero a más de 2 años
  de un real) lleva `caso: "nuevo"`, la regresión sin historia (mediana de la liga-año, división, posición en la tabla); error y rango
  del 80% de una validación por club en 10 grupos (50%, x0,34 a x3,00, igual que `--medir`). Un club que no está en el sitio va por
  nombre (`n`, sin `id`) y su ejercicio es la temporada. `tools/faltantes-liga.mjs` guarda la posición de todos los clubes de la tabla
  (`#<nombre>` si no está en el sitio). De 439 a 4750 club-años estimados en 34 ligas. `--check` sigue en 0,5 s.
- To-do 275: los estimados van en la tabla de ingresos de Ligas, en su puesto por plata, con "(estimado)*", barra rayada y "≈"; el
  rango y el error en el título del monto. Pie de nota dentro del card. El total es "Total de la liga (N con balance + E estimados*)"
  cuando más de la mitad de la liga de ese año tiene balance real; si no, el total de los cargados como antes. La composición ("De dónde
  sale la plata") y el simulador siguen solo con lo real. Mockup: "Ligas · estimados en la tabla" de "Pantallas FoS". ASSET_V 1258.
- To-do 274: card "La liga en total, por categoría" arriba de la tabla de Ligas (`consolidado()` en `js/liga.js`): la suma por categoría de
  los clubes con balance del ejercicio, en dólares, "Suma de los N de M clubes con balance", con una barra apilada y la lista con monto y %.
  Cuando el total de la tabla suma estimados, una franja rayada "Estimados, sin categoría*" hace que los dos totales coincidan; si no,
  solo lo real. Nota de los clubes sin desglosar. Colores: los de "De dónde sale la plata" (`paletaMix()`). Mockup: "Ligas · consolidado
  de la liga" de "Pantallas FoS". ASSET_V 1260.
- To-do 272: borrado el cartel de primera visita "Elegí tu club acá" (colgaba del botón del club, que ya no está en el header): HTML en
  `index.html`, `hideCoach` / `maybeCoach` y `LS_COACH` en `js/selector.js`, `.coach` en `css/styles.css` y `selector.coach` en
  `data/lang/en.js`. La puerta del visitante nuevo es el buscador de Inicio. ASSET_V 1261.

## Qué queda (para TODO)

- Borrar el 293, el 275, el 274 y el 272.
- La parte de "faltantes" del 275 (la lista de quiénes faltan y por qué) se descartó en el diseño: Guido quiere que todo club sin balance
  figure como estimado, sin motivos. `data/faltantes/` sigue alimentando a `estimar.mjs`.
- 270, club nuevo: quedó prendido con 50% de error; volver a medir (`node tools/estimar.mjs --medir`) cuando haya más clubes cargados.

## Qué deja de ser cierto en ESTADO

- "Estimaciones publicadas aparte de lo real ... club que nunca cargamos, apagado (to-do 270). Todavía no se muestran en el sitio (to-do
  275)": ya no. Se muestran en Ligas, dentro de la tabla, con "(estimado)*"; el club nuevo está prendido (regresión, 50% de error).

## Acordado con fos-finanzas (grupo multiclub, to-do 280 c)

- URL `?tab=grupo&grupo=<grupoId>`: finanzas pone la sección `data-section="grupo"` (botón de #mainNav con `hidden`) y
  `window.GRUPO_VIEW = { show(id), current() }` en `js/grupo.js`; pantallas suma 'grupo' a `URL_CLAVES`, `estadoActual()` y `aplicarURL()`
  (`js/principal.js`), después de mergear lo de finanzas.
- Buscador: `window.GRUPOS_INDICE = [{id, nombre, alias, clubIds}]` en `data/entidades/_grupos.js` (eager); pantallas suma el resultado
  "Grupo" en `js/selector.js`, que llama a `GRUPO_VIEW.show(id)`.
- Aviso de finanzas (rama finanzas, commit b334aef): `data/entidades/_grupos.js` ya lo carga eager `index.html`, en el bloque de finanzas
  (después de `js/finanzas-multi.js`): no sumar otro script. Trae `window.GRUPOS_INDICE = [{ id, nombre, alias, clubIds, clubes:[{clubId|null,
  nombre, control, desde, hasta}] }]` y `window.ENTIDADES_PAISES`. Finanzas también tocó una línea de `js/principal.js`, en
  `refreshFinanzas()` (`FIN_ESTRUCTURA.render`), fuera del bloque de la URL.
- La página del grupo está lista en la rama finanzas (commit 376b6b3): `section#grupo`, botón `#mainNav button[data-section="grupo"]` con
  `hidden` (el CSS lo saca del menú) y `window.GRUPO_VIEW = { show(id) -> Promise, abrir(id), current() -> {grupo}, refresh() }`. Lo que
  falta de pantallas, después de mergear finanzas: (1) 'grupo' en `URL_CLAVES` / `estadoActual()` / `aplicarURL()`; (2) 'grupo' en
  `TABS_SIN_CLUB` de `js/principal.js` (si no, abrir un grupo sin club elegido rebota a Inicio); (3) el resultado "Grupo" del buscador
  con `GRUPOS_INDICE`, que llama a `GRUPO_VIEW.abrir(id)`. Al cambiar el idioma, `GRUPO_VIEW.refresh()` redibuja.

## Después del merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- Grupo multiclub enganchado (contrato con finanzas): `?tab=grupo&grupo=<id>` en la URL (`URL_CLAVES`, `estadoActual()` y
  `aplicarURL()` de `js/principal.js`; un grupo que no está en `GRUPOS_INDICE` se ignora), 'grupo' en `TABS_SIN_CLUB` (sin club ya no
  rebota a Inicio) y el resultado "Grupos multiclub" del buscador (`renderBusqueda()` en `js/selector.js`, por nombre o alias; no aparece
  en Comparar), que cierra el panel y llama a `GRUPO_VIEW.abrir(id)`. Probado: el link abre BlueCo sin club, el buscador lo encuentra
  con "blue", y "atrás" vuelve. ASSET_V 1263.

### Qué queda (para TODO)

- To-do 273 (aviso de fos-datos, 2026-10-18): el estadio y el sponsor de cada club y ejercicio tienen que verse en Finanzas (Guido: "tiene
  que estar en finanzas"; link de salto, bloque o fila de la ficha, a decidir con él). Datos por club y temporada: estadio, capacidad,
  sponsor de camiseta (frente) y marca técnica, con el link a la versión exacta de la página de Wikipedia de la temporada; sin monto. Los
  junta fos-datos y todavía no existen: no armar la pantalla hasta que fos-datos avise el formato y el archivo.

### Qué cambió, 271 (para CHANGELOG)

- To-do 271: un link copiado abre lo mismo que se estaba viendo. Se suman a la URL, solo cuando no son los de siempre: `moneda` (la del
  club, si no es USD), `real=1` (ajustado por inflación, en Finanzas y en Comparar) y `formato=club` (Finanzas); y los dos lados de
  Comparar, `a` y `b` (`ladoAURL()` / `ladoDeURL()` en `js/principal.js`): `c.boca:2024,river` (clubes; sin año = el más reciente),
  `l.es-laliga.2025` (liga), bloques separados por `~`, `.s` / `.p` solo si el agregado no es el de siempre. Un club, liga o moneda
  que el sitio no tiene se ignora. Sin la clave, el valor de siempre ("atrás" desde un link en pesos vuelve a USD). `js/selector.js`
  expone `lados()`, `real()`, `setLados()` y avisa cada cambio por `onCambio` (`CLUB_SELECTOR.init`). Mi Cuenta sigue guardando su
  propio formato. Probado: Boca en ARS y formato del club, `real=1`, Boca vs River 2024 con inflación, LaLiga vs dos clubes, ida y
  vuelta, y links con datos inexistentes. ASSET_V 1264.
- Borrar el 271.

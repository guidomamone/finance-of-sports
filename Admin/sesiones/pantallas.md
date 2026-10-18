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

## Qué queda (para TODO)

- Borrar el 293 y el 275.
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

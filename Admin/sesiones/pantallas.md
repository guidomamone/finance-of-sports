# Cierre del worktree pantallas (rama `pantallas`)

Lo completa la sesión del worktree mientras trabaja; la principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- To-do 293: en el estado frío de Ligas cada liga muestra solo su nombre (`botonLiga()` en `js/liga.js`), sin "N clubes · año", que se
  leía como que la liga tenía un solo ejercicio. Botón de 44 px de alto (`.lg-liga` en `css/styles.css`). Mockup aprobado: tableros
  "Ligas · solo el nombre" de "Pantallas FoS". ASSET_V 1254.

## Qué queda (para TODO)

- Borrar el 293.

## Qué deja de ser cierto en ESTADO

- Nada: ESTADO no describía el dato de las tarjetas de Ligas.

## Acordado con fos-finanzas (grupo multiclub, to-do 280 c)

- URL `?tab=grupo&grupo=<grupoId>`: finanzas pone la sección `data-section="grupo"` (botón de #mainNav con `hidden`) y
  `window.GRUPO_VIEW = { show(id), current() }` en `js/grupo.js`; pantallas suma 'grupo' a `URL_CLAVES`, `estadoActual()` y `aplicarURL()`
  (`js/principal.js`), después de mergear lo de finanzas.
- Buscador: `window.GRUPOS_INDICE = [{id, nombre, alias, clubIds}]` en `data/entidades/_grupos.js` (eager); pantallas suma el resultado
  "Grupo" en `js/selector.js`, que llama a `GRUPO_VIEW.show(id)`.

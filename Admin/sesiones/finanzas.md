# Sesión `finanzas` (worktree fos-finanzas): cierre para la principal

## Qué cambió (para CHANGELOG)

- To-do 280 a, el dato de la estructura de cada club: registro `Admin/registros/entidades.jsonl` (entidades, relaciones y cargas, cada
  línea con una cita del `.md` o, si el balance no lo dice, una cita externa con url y fecha) y `tools/entidades.mjs`, que verifica las
  citas, que cada carga sea del documento de ese club y año (`quien.mjs`), los ids y los ciclos de control, y genera `data/entidades/<país>.js`
  y `data/entidades/_grupos.js`. `audit.js` lo corre como generador (`entidades-desfasado`, P1). Primeros casos: Chelsea 2025 (cadena hasta
  Blues Investment Holdings Parent, L.P.; grupo BlueCo con Strasbourg y Chelsea Women) e Inter 2025 (Oaktree, Grand Tower; M-I Stadio al 50 %
  fuera del consolidado).
- To-do 280 b: Finanzas tiene la tarjeta "De quién son estos números" (`js/finanzas-estructura.js`, `#finEstructura`, link "Estructura"
  en el índice de la página, entre "En otra liga" y "Fuentes"). Muestra, del ejercicio elegido más nuevo con estructura cargada: la
  entidad y su perímetro, la cadena de dueños hasta el último, las controladas dentro de los números, las relacionadas y los clubes del
  mismo grupo fuera, y la nota para periodistas; "El dueño, ejercicio por ejercicio" cuando hay estructura de más de un año. Sin datos
  del club, la tarjeta y el link se esconden. Mockup aprobado: artboards "Finanzas · estructura del club" de "Pantallas FoS".
  `index.html` carga eager `data/entidades/_grupos.js` (`GRUPOS_INDICE`, `ENTIDADES_PAISES`); `js/principal.js` suma una línea en
  `refreshFinanzas()` (no toca el bloque de la URL).
- To-do 280 c: página del grupo multiclub (`js/grupo.js`, sección `#grupo`, `window.GRUPO_VIEW = { show, abrir, current, refresh }`).
  Arriba, el grupo, su país y su dueño último, con su link al balance; tabla de clubes controlados (link a los del sitio, "sin balance"
  los demás, liga del sitio o país, desde qué ejercicio, ingresos del último año, de dónde sale); participaciones de 50 % o menos
  aparte; gráfico de barras apiladas por año (M USD, formato simplificado), cuántos clubes con balance de cuántos por año, y el aviso de
  que no es un consolidado. Los ingresos los copia `tools/entidades.mjs` de `data/rankings/` a `_grupos-detalle.js` (se baja al abrir un
  grupo), sin recalcular. Se llega desde la tarjeta Estructura (nombre del grupo, en la frase y en su caja). ASSET_V 1257.

## Decisiones de Guido (2026-10-18), para CONVENCIONES-DATOS

- El total de un grupo multiclub suma solo los clubes que el grupo controla (más del 50 %); las participaciones menores se listan aparte.
- La pertenencia de un club a un grupo puede citarse con una fuente externa (url y fecha) cuando el balance no lo dice.
- Un dueño persona (Marinakis, Friedkin) cuenta como grupo, igual que una empresa, con el nombre que imprimen los documentos.

## Qué queda (para TODO)

- 280: el registro tiene 2 clubes (ya es el to-do 294 en main, commit 275d3ec7a). Faltan los otros ejercicios de Chelsea e Inter (Suning antes de 2024), Portugal (los avisos de
  `node tools/entidades.mjs`), los casos de `cola-borradores/altas-2026-10-17.md` cuando esos clubes estén publicados, y los grupos con dos o
  más clubes cargados (City Football Group, Marinakis, Friedkin, 777 Partners, Eagle Football).
- CONTRATO CON fos-pantallas (acordado 2026-10-18; lo engancha pantallas después de mergear esta rama):
  - URL `?tab=grupo&grupo=<grupoId>` (p. ej. `blueco`). El lector de URL ("EL ESTADO EN LA URL" de `js/principal.js`: `URL_CLAVES`,
    `estadoActual()`, `aplicarURL()`) lo toca solo pantallas (to-do 271): finanzas no lo edita.
  - HECHO por finanzas: la sección `#grupo` y su botón en `#mainNav` (`hidden`, y el CSS lo saca del menú aunque `applyClubMode()` le
    saque el `hidden`), y `js/grupo.js` con `window.GRUPO_VIEW = { show(grupoId) -> Promise, current() -> { grupo } }`.
  - FALTA de pantallas: `grupo` en `URL_CLAVES`/`estadoActual()`/`aplicarURL()` (hoy la URL queda `?tab=grupo` sin el id) y `grupo` en
    `TABS_SIN_CLUB` de `js/principal.js` (sin eso, abrir un grupo sin club elegido, desde el buscador, rebota a Inicio).
  - Buscador: `data/entidades/_grupos.js` es `window.GRUPOS_INDICE = [{ id, nombre, alias, clubIds }]`, chico y eager (ya lo genera
    `tools/entidades.mjs`; el detalle va aparte en `_grupos-detalle.js`). Pantallas suma el resultado "Grupo" en `js/selector.js`, que llama a
    `GRUPO_VIEW.show(id)`.
- 281, 282, 242 sin empezar.

## Para PANTALLA (excepción aprobada por Guido, 2026-10-18)

- Excepción a "la fuente NUNCA va adentro de un card": la tarjeta Estructura (y la página del grupo) lleva, en cada entidad, un link
  "ver en el balance" (o "ver en <dominio>" para una cita externa) a la transcripción, sin la palabra "Fuente:". La cita por entidad es
  el dato que pide el periodista.

## Qué deja de ser cierto en ESTADO

- "Finanzas multi-año": suma la tarjeta Estructura (de quién son los números, dueños y grupo), desde `data/entidades/`.

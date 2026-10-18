# Sesión `finanzas` (worktree fos-finanzas): cierre para la principal

## Qué cambió (para CHANGELOG)

- To-do 280 a, el dato de la estructura de cada club: registro `Admin/registros/entidades.jsonl` (entidades, relaciones y cargas, cada
  línea con una cita del `.md` o, si el balance no lo dice, una cita externa con url y fecha) y `tools/entidades.mjs`, que verifica las
  citas, que cada carga sea del documento de ese club y año (`quien.mjs`), los ids y los ciclos de control, y genera `data/entidades/<país>.js`
  y `data/entidades/_grupos.js`. `audit.js` lo corre como generador (`entidades-desfasado`, P1). Primeros casos: Chelsea 2025 (cadena hasta
  Blues Investment Holdings Parent, L.P.; grupo BlueCo con Strasbourg y Chelsea Women) e Inter 2025 (Oaktree, Grand Tower; M-I Stadio al 50 %
  fuera del consolidado). El sitio todavía no lo lee.

## Decisiones de Guido (2026-10-18), para CONVENCIONES-DATOS

- El total de un grupo multiclub suma solo los clubes que el grupo controla (más del 50 %); las participaciones menores se listan aparte.
- La pertenencia de un club a un grupo puede citarse con una fuente externa (url y fecha) cuando el balance no lo dice.
- Un dueño persona (Marinakis, Friedkin) cuenta como grupo, igual que una empresa, con el nombre que imprimen los documentos.

## Qué queda (para TODO)

- 280: el registro tiene 2 clubes. Faltan los otros ejercicios de Chelsea e Inter (Suning antes de 2024), Portugal (los avisos de
  `node tools/entidades.mjs`), los casos de `cola-borradores/altas-2026-10-17.md` cuando esos clubes estén publicados, y los grupos con dos o
  más clubes cargados (City Football Group, Marinakis, Friedkin, 777 Partners, Eagle Football).
- 280 b (Finanzas) y 280 c (página del grupo y su total), con mockup antes. Contrato propuesto a fos-pantallas: `?tab=grupo&grupo=<id>` y
  el buscador lee `data/entidades/_grupos.js`; la página la hace `js/grupo.js`.
- 281, 282, 242 sin empezar.

## Qué deja de ser cierto en ESTADO

- Nada todavía (el sitio no muestra entidades).

# La liga de un año no sale de una sola fuente (para el ok de Guido)

Guido: «sigo pensando que Wikipedia trae muchos líos como para tomarla como single source of truth». Casos de hoy: RAAL La Louvière 2021 (la caché de listas lo confundía con «La Louvière Centre», otro club de la ciudad), la tabla de equipos de la segunda chipriota 2023-24 (le falta un club de los 16), Alianza FC 2023 contra «Alianza Petrolera».

## Texto exacto: `Admin/CONVENCIONES-DATOS.md`, regla nueva

**La liga de un año necesita dos fuentes independientes.** La página de la temporada en Wikipedia cuenta como una sola fuente. La otra sale de esta lista, en este orden: el sitio oficial de la liga o de la federación; RSSSF; un sitio de resultados (worldfootball.net, Soccerway, Transfermarkt). Si las dos coinciden, la liga se asigna. Si no coinciden, se vota (skill `auditoria-finance-of-sports`, sección 9). Con una sola fuente, la liga queda asignada con el aviso `liga-una-fuente` hasta tener la segunda. El club se identifica por su nombre exacto o un alias de `tools/club-league-reference/alias.json`, nunca por parecido: otro club de la misma ciudad puede tener un nombre casi igual.

## Lo que codea Pipeline (la Auditora lo aprueba por la sección 7)

1. `tools/club-league-reference/`: cada liga-temporada guarda sus fuentes (`fuentes: [{tipo, url}]`), y `lookup-club-league.js` dice cuántas tiene.
2. `audit.js`, `liga-una-fuente`, P3: un club-año con liga asignada y una sola fuente. Hoy marcaría casi todos los años cargados, porque las listas salen de Wikipedia. Por eso es P3 y no frena nada: se va completando liga por liga, empezando por las que tienen más clubes cargados.
3. La segunda fuente se baja de forma mecánica, como hoy las páginas de Wikipedia (sin IA), donde el sitio lo permita.

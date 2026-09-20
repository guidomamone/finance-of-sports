# Plan de remediación de escala — cómo usar este archivo

Este archivo es el mapa de ejecución de los hallazgos de `auditorias/2026-09-17-escala.md` /
`.claude/skills/escala-finance-of-sports/SKILL.md` que todavía están abiertos. Es DISTINTO de
`TODO.md` (que sigue siendo la única lista oficial de qué está pendiente) y de la skill (que es el
mapa de puntos calientes en general, no un plan de ejecución paso a paso). Este archivo es el "cómo"
de una parte de esos dos: el prompt operativo completo para cada punto, en el orden en que conviene
hacerlos, con espacio para que cada sesión deje sus notas de ejecución antes de pasarle la posta a la
siguiente.

**Punto 1 (partir `fuentes-por-club.md`) ya está hecho** — se resolvió en paralelo en `main`
(commit `a211594`, Versión 158) mientras se escribía este plan. No tiene sección propia acá.

## Regla de oro: actualizá este archivo ANTES de cerrar la sesión

Cuando termines un punto (lo hayas aprobado y ejecutado, o decidido posponerlo), **antes de cerrar la
sesión**:

1. Marcá la fila correspondiente en la tabla de abajo como Hecho (o Pospuesto, con el motivo).
2. Completá la sección "Notas de ejecución" de ESE punto: qué se hizo en la práctica (puede diferir
   del plan escrito acá — normal, es un plan, no una receta), qué archivos se tocaron de verdad, qué
   comando de verificación corriste y qué dio, y el número de Versión de `CHANGELOG.md` que le
   corresponde.
3. **Revisá los prompts de los puntos que siguen** (los que dicen "Pendiente" más abajo en el orden)
   por si algo de lo que acabás de hacer cambia sus supuestos — un nombre de función que renombraste,
   una convención de archivo distinta a la que el prompt asumía, una línea de código que ya no está
   donde el prompt dice. Editá ESE prompt ahí mismo si hace falta, y dejá una nota de una línea de qué
   ajustaste y por qué (así la próxima sesión no se pregunta si fue un error tuyo o algo real).
4. Si encontraste algo que no estaba anotado en ningún lado (un archivo nuevo con el mismo problema,
   una dependencia que no se había visto), agregalo a la sección "Hallazgos inesperados" al final —
   no lo borres del historial de este archivo aunque ya lo hayas resuelto.
5. Esto NO reemplaza el cierre de sesión normal del proyecto: seguí igual la skill
   `start-session-finance-of-sports-project` (`ESTADO.md`/`TODO.md`/`CHANGELOG.md`).
6. Antes de empezar CUALQUIER punto, chequeá que no se haya resuelto ya por otro lado (mismo susto que
   pasó con el punto 1: dos sesiones en paralelo, una en `main` y otra en un worktree, resolvieron lo
   mismo el mismo día sin saberlo). Un `grep` rápido en `TODO.md`/`CHANGELOG.md` por el archivo que
   vas a tocar alcanza.

Puntos 7 y 8 (colisión de `clubId` y de carpetas `Clubes/<País>/<Club>/`) **todavía no son un to-do
formal en `TODO.md`** — solo se discutieron por chat con Guido. Este archivo es hoy su único registro
escrito. Si te toca ejecutar alguno de los dos, agregalo a `TODO.md` como parte del cierre de sesión
(el próximo número libre), no lo dejes solo acá.

---

## Orden de ejecución

| Orden | Punto | Qué | Estado |
|---|---|---|---|
| 1 | 1 | Partir `fuentes-por-club.md` por país | ✅ Hecho (commit `a211594` de `main`) |
| 2 | 5 | Paralelizar `auditAll()` | ✅ Hecho (Versión 160, sesión 2026-09-20) |
| 3 | 8 | Chequeo automático de colisión en `Clubes/<País>/<Club>/` | ✅ Hecho (Versión 161, sesión 2026-09-20) |
| 4 | 2 | `fuentes.html` con página propia por club | ✅ Hecho (Versión 162, sesión 2026-09-20) |
| 5 | 7 | Reforzar la alarma de colisión de `clubId` al momento de sourcing | ✅ Hecho (Versión 163, sesión 2026-09-20) |
| 6 | 9 | Partir `data/club-leagues.js` (por país o liga) | ✅ Hecho (Versión 164, sesión 2026-09-20) |
| 7 | 3 | Adelgazar el payload eager (`clubs.js`/`club-index.js`, sobre la base del punto 9) | ⏸️ Pospuesto (2026-09-20): medido, paga 3 KB comprimidos |
| 8 | 4 | Debounce + límite de resultados en el buscador del selector | ✅ Hecho (Versión 165, sesión 2026-09-20) |

**Por qué este orden** (razonamiento completo en el chat con Guido del 2026-09-18, resumen acá): 5 y
8 son baratos y aislados, entran primero. 2 es independiente de todo el resto (usa `sources{}`, no
`fuentes-por-club.md`), se aprovecha el hueco. 7 se hace antes de 3 porque si en algún momento se
decide renombrar algún `clubId`, mejor hacerlo ANTES de reestructurar `clubs.js`, no después. 9 y 3
tocan el mismo archivo raíz del problema (`club-leagues.js`) y van pegados, 9 primero porque el split
por país/liga es la base que 3 necesita para el lazy-load. 4 va último porque el buscador lee los
datos que 3 reordena — hacerlo antes significa tocar `js/selector.js` dos veces.

---

## Punto 5 (orden 2) — Paralelizar `auditAll()`

**Problema:** `auditAll()` en `index.html` (función `async function auditAll(){...}`, cerca de la
línea 1849 al momento de escribir esto — confirmá la línea real, puede haber cambiado) carga los
clubes en SERIE (`for (const id of ids) { await loadClubData(id); }`). Con 41 clubes, 114 ms. A 1000
clubes con latencia real de red, ~30 segundos — y es el chequeo obligatorio antes de cada push que
toque datos.

**Archivos:** solo `index.html` (la función `auditAll()` y nada más).

**Dependencias:** ninguna. Es el punto más aislado de todo el plan.

**Pros:** cambio acotado a una función, bajo riesgo (nadie del público la usa). Cuando lleguemos a
los puntos 9 y 3 (reestructurar datos), vas a querer re-auditar todo rápido después de cada cambio —
conviene tener esto ya resuelto para entonces.

**Contras:** con 41 clubes no se nota ninguna mejora todavía (pura inversión a futuro). Si algún club
individual tira un error real, con tandas paralelas es un poco más difícil leer en la consola CUÁL
club fue (los mensajes se entremezclan) — mitigar prefijando cada log con el id del club.

**Prompt operativo** (pegar en una sesión nueva, abierta en `finance-of-sports/`):

```
Contexto: en finance-of-sports, auditAll() (index.html, buscá "async function auditAll") carga
TODOS los clubes en serie antes de correr verifyTieOuts()/checkFxSanity() sobre cada uno: `for
(const id of ids) { await loadClubData(id); }`. Es el chequeo que hay que correr (?audit=1, o
auditAll() en la consola) antes de cualquier push que toque datos. Con 41 clubes tarda ~114ms; a
1000+ clubes con latencia real de red tardaría decenas de segundos. Ver
auditorias/2026-09-17-escala.md hallazgo 5 y .claude/skills/escala-finance-of-sports/SKILL.md
sección D para el contexto completo.

TU TAREA (dos fases, no ejecutes la fase 2 sin aprobación explícita de Guido):

FASE 1 — Proponé, no ejecutes. Diseñá el cambio: cargar los clubes en tandas paralelas
(Promise.all sobre chunks de ~20-30 ids) en vez de uno por uno. Restricciones:
- Los mensajes de consola de cada club tienen que seguir siendo atribuibles a ESE club aunque se
  carguen en paralelo (agregá el id del club al prefijo de cada log si no lo tiene ya).
- El conteo final (ok/fallidos/warnings) tiene que dar EXACTAMENTE los mismos números que hoy, con
  los mismos 41 clubes — es una verificación mecánica: correr auditAll() antes y después del cambio
  y comparar el resumen.
- No cambies nada de qué verifica auditAll(), solo CÓMO carga los clubes antes de verificar.
Entregame el plan (tamaño de tanda propuesto, cómo se atribuye cada log) antes de tocar código.

FASE 2 — Con aprobación explícita: implementalo, correlo en el navegador (?audit=1) y confirmá que
el resumen (clubes, ejercicios, ok, fallidos, warnings) es idéntico al de antes del cambio. Cerrá la
sesión con ESTADO.md/TODO.md/CHANGELOG.md (start-session-finance-of-sports-project) y ANTES de
terminar, actualizá PLAN-REMEDIACION-ESCALA.md: marcá este punto como Hecho en la tabla de orden y
completá su "Notas de ejecución" (abajo).
```

**Notas de ejecución** (sesión 2026-09-20, Versión 160 de `CHANGELOG.md`):

- **Qué se hizo**, y coincide con el plan: tandas de **25** con `Promise.allSettled` en lugar del
  `for` con `await`. Único archivo tocado: `index.html`, solo la función `auditAll()`.
- **`allSettled` y no `Promise.all`**, que es lo que decía el prompt: con `all`, el primer club que
  falla aborta la tanda entera y se pierde el resultado de los otros 24. `allSettled` reporta club
  por club, que es exactamente lo que hacía el `try/catch` por iteración de la versión en serie, y
  además mantiene `failedToLoad` en el mismo orden determinista.
- **Por qué 25 y no los 41 de una**: el navegador ya limita a ~6 conexiones simultáneas por origen,
  así que una tanda más grande no compra más paralelismo de red. El número es un TECHO para no
  inyectar miles de `<script>` de golpe cuando el proyecto tenga ese volumen, no un objetivo.
- **La restricción de atribución de logs del prompt resultó no aplicar**, y conviene saber por qué
  antes de tocar esto de nuevo. `grep -l "console\." data/*.js` da UN archivo, `currency-map.js`,
  que no es de club: ningún `data/<club>-data.js` loguea nada al ejecutarse. Y las dos
  verificaciones (`verifyTieOuts()`/`checkFxSanity()`) corren DESPUÉS de que terminó toda la carga,
  no intercaladas con ella. O sea que el único log de la fase de carga es la línea de error, que ya
  llevaba el id. No hizo falta agregar ningún prefijo. Las dos propiedades quedaron escritas como
  comentario en `index.html` y en el punto D del skill de escala, porque un `data/*.js` que
  empiece a loguear las rompe.
- **Verificación**, la mecánica que pedía el prompt: `auditAll()` corrido en el navegador ANTES del
  cambio y DESPUÉS, con los mismos 41 clubes. Idéntico en las dos: `{clubes:41, noCargaron:[],
  checksOK:222, noCierran:0, warningsFx:0}`. Tiempo: 78 ms en serie contra 38 ms en frío en tandas
  (sobre localhost, o sea sin latencia real: la mejora que importa es la de 1000 clubes, no esta).
  `?audit=1` imprime la misma línea de resumen que antes.
- **Verificación EXTRA, no pedida por el prompt y que conviene repetir si esto se toca**: el camino
  de error nunca se ejercita en una corrida normal (los 41 clubes cargan bien), así que se probó
  aparte inyectando dos clubes falsos en `clubs{}` desde la consola, solo en memoria, cuyos data
  files dan 404. Resultado: los dos quedan atribuidos a su propio id en `clubesQueNoCargaron` y en
  su `console.error`, y los otros 41 siguen dando sus 222 checks. Es la parte que `allSettled`
  cambia de verdad, y sin esto quedaba sin probar.
- **`node tools/audit.js`**: 0 P0, 0 P1 (44 P2, 8 P3), igual que antes del cambio.
- **Cierre**: to-do 22(f) borrado de `TODO.md`; punto D del skill `escala-finance-of-sports`
  marcado como resuelto; `ESTADO.md` actualizado.

---

## Punto 8 (orden 3) — Colisión de carpetas `Clubes/<País>/<Club>/`

**Problema:** hoy no hay ningún caso real, pero si dos clubes del MISMO país (en ligas o deportes
distintos) tuvieran el mismo nombre corto, sus carpetas de transcripción colisionarían. Existe una
regla ESCRITA para desambiguar cuando pase (en `fuentes-por-club.md`/`CLAUDE.md`), pero no hay
ninguna alarma automática — a diferencia de `clubId` (punto 7), que sí la tiene (`checkClubIds()` en
`tools/audit.js`).

**Archivos:** `tools/audit.js` (agregar una función nueva, mismo estilo que `checkClubIds()`), y
mencionarlo en `CONVENCIONES.md` si la regla cambia de "reactiva" a "con chequeo automático".

**Dependencias:** ninguna.

**Pros:** mismo patrón ya probado (copiar `checkClubIds()`), bajo esfuerzo, cierra la asimetría con
el punto 7.

**Contras:** pura prevención, no hay ningún caso real hoy. `Clubes/` tiene carpetas de países/clubes
que todavía NO están cargados al sitio (solo sourced) — hay que decidir si el chequeo escanea TODO el
disco (más completo, pero depende de que la carpeta exista en la máquina, no está en git) o solo los
clubes ya en `clubs{}` (más simple, menos cobertura).

**Prompt operativo:**

```
Contexto: en finance-of-sports, cada club tiene una carpeta Clubes/<País>/<Club>/ con sus PDFs y
transcripciones. Hoy no hay colisiones, pero si dos clubes del MISMO país (ligas o deportes
distintos) compartieran nombre corto, sus carpetas chocarían. Ya existe un chequeo automático
parecido para clubId (checkClubIds() en tools/audit.js, sección checkEscala/checkClubIds) que avisa
cuando un club nuevo colisiona con uno de otro país — este punto es el mismo tipo de alarma, pero
para las carpetas de Clubes/ en vez de para el clubId. Ver
.claude/skills/escala-finance-of-sports/SKILL.md sección E para el contexto completo.

TU TAREA (dos fases, no ejecutes la fase 2 sin aprobación explícita de Guido):

FASE 1 — Proponé, no ejecutes. Diseñá una función nueva para tools/audit.js (mismo archivo, cerca
de checkClubIds()) que:
- Escanee Clubes/<País>/* en disco (fs.readdirSync).
- Agrupe por país, y dentro de cada país detecte nombres de carpeta de club duplicados.
- Reporte un P2 (mismo criterio de severidad que el resto de tools/audit.js) si encuentra alguno.
Decidí y proponeme: ¿el chequeo corre sobre TODO Clubes/ (incluye clubes sourced sin cargar aún) o
solo sobre los clubes que ya están en clubs{}? Justificá la elección. Fijate también si hace falta
manejar el caso de que Clubes/ no exista en la máquina donde corre (por ejemplo, si algún día esto
se corriera en un entorno sin los PDFs descargados) sin que el script rompa.

Entregame el plan (dónde va la función, qué reporta, la decisión de alcance) antes de tocar código.

AJUSTE 2026-09-20 (al ejecutarlo): dos cosas que este prompt decía mal. (1) `checkClubIds()` es una
función de primer nivel de `tools/audit.js`, no está adentro de `checkEscala`. (2) La regla de
desambiguación NO está en `CONVENCIONES.md`: vive en la REGLA 3 de `fuentes-por-club.md` y en la
sección E del skill de escala, que son las dos que hay que tocar.

FASE 2 — Con aprobación explícita: implementalo, correlo (node tools/audit.js) y confirmá que sigue
en 0 P0/P1 (no debería agregar ninguno, solo P2 si encuentra algo, y hoy no debería encontrar nada).
AJUSTE 2026-09-20 (punto 5): la línea de base real de `node tools/audit.js` hoy es 0 P0, 0 P1, 44
P2, 8 P3. Si leíste 52/7 o 58/9 en algún lado, era un conteo viejo, ya corregido.
Si la regla de CONVENCIONES.md sobre este tema pasa de "reactiva" a "con chequeo automático",
actualizá esa línea. Cerrá la sesión con ESTADO.md/TODO.md/CHANGELOG.md
(start-session-finance-of-sports-project) — agregá esto como to-do formal si no lo hacés en la misma
sesión que lo resuelve. ANTES de terminar, actualizá PLAN-REMEDIACION-ESCALA.md: marcá este punto
como Hecho y completá sus "Notas de ejecución".
```

**Notas de ejecución** (sesión 2026-09-20, Versión 161 de `CHANGELOG.md`):

- **LO PRIMERO, porque cambia qué es este punto**: la colisión que el prompt pedía detectar NO es
  detectable por construcción. Un filesystem no admite dos carpetas con el mismo nombre en el mismo
  directorio, así que el segundo club cae ADENTRO de la carpeta del primero, en silencio, y después
  no queda ningún estado que distinga "dos clubes compartiendo carpeta" de "un club con muchos
  documentos". Por eso esto NO cierra la asimetría con el punto 7 como decía el plan:
  `checkClubIds()` sí puede avisar antes del daño, porque dos ids conviven sin problema en un objeto
  JS y dos nombres de carpeta no. Contra la colisión exacta la única defensa sigue siendo la REGLA 3
  de `fuentes-por-club.md`, aplicada a mano al crear la carpeta.
- **Qué se hizo entonces**: `checkCarpetasClubes()` en `tools/audit.js` (después de `checkClubIds()`,
  registrada en `main()` entre ese y `checkLigasPorEjercicio`) detecta la CASI-colisión, que además
  es el error más probable de los dos: dos carpetas del mismo país que normalizan al mismo nombre
  (sin acentos, minúsculas, sin separadores), o sea el mismo club transcripto dos veces con dos
  grafías y sus documentos partidos entre las dos. P2, code `carpeta-club-duplicada`.
- **Extra aprobado por Guido, del mismo pase de lectura**: P2 `carpeta-sin-pais` si una carpeta de
  club cuelga directo de `Clubes/` sin país en el medio, que `CLAUDE.md` prohíbe explícitamente y
  que no vigilaba nadie. Se detecta por contenido y no por nombre: una carpeta de PAÍS tiene
  subcarpetas adentro, una de CLUB tiene los documentos sueltos.
- **La decisión de alcance que el prompt pedía decidir: TODO `Clubes/` en disco, no solo `clubs{}`.**
  Son 336 carpetas contra 41 (12%), y sobre todo la duplicación nace al SOURCEAR, mucho antes de que
  el club entre a `clubs{}`. El costo, medido: de las 336 carpetas solo **129 tienen algún archivo
  trackeado en git**, las otras 207 existen solo en la máquina de Guido (son las que todavía no
  tienen transcripción `.md`, y los PDFs están en `.gitignore`), así que en un clone limpio el
  chequeo ve menos. No alcanza para achicar el alcance: degrada bien (menos cobertura, nunca un
  hallazgo falso).
- **`Clubes/` ausente**: `return` silencioso, sin hallazgo. Que no estén las transcripciones no es un
  defecto del proyecto, y un "no se pudo chequear" en cada corrida es ruido que entrena a ignorar la
  lista, que ya tiene 8 P3 permanentes.
- **Verificación**. Línea de base: 0 hallazgos, y `node tools/audit.js` queda en 0 P0, 0 P1, 44 P2,
  8 P3, idéntico a antes. Como un chequeo que no encuentra nada no prueba nada (misma lección que el
  punto 5), se ejercitó a propósito creando dos carpetas temporales: `Clubes/Argentina/Atlético
  Tucumán` (contra la real `Atletico Tucuman`) y `Clubes/ZZ-Prueba/balance-2024.md`. Los dos avisos
  salieron con el texto correcto, y las carpetas se borraron (`git status` limpio). El camino de
  "`Clubes/` no existe" se probó aparte, copiando el repo sin esa carpeta al scratchpad: corre sin
  romper y da los mismos 0 P0 / 0 P1.
- **Docs**: REGLA 3 de `fuentes-por-club.md` y sección E del skill `escala-finance-of-sports`
  actualizadas, las dos diciendo explícitamente qué cubre el chequeo y qué no.
  NO se tocó `CONVENCIONES.md`, contra lo que decía el prompt: la regla no vive ahí (ver el ajuste
  anotado en el prompt de este punto). Duplicarla habría creado la segunda verdad que el proyecto
  evita en todos lados.
- **No se agregó to-do a `TODO.md`**: el prompt lo pedía solo si el punto no se resolvía en la misma
  sesión, y se resolvió.

---

## Punto 2 (orden 4) — `fuentes.html` con página propia por club

**Problema:** `fuentes.html` (generado por `tools/generate-fuentes-page.js`) es una sola página con
la fila de TODOS los documentos de TODOS los clubes — hoy ~86 KB, ~90 documentos, crece con cada
balance nuevo. Idea de Guido: la ficha de Finanzas de un club linkea a una página PROPIA de ESE club
con sus fuentes, y aparte hay un índice ("Ver fuentes de otros equipos") con solo links a esas
páginas, sin contenido.

**Archivos:** `tools/generate-fuentes-page.js`, `index.html`/`js/finanzas-render.js` (el link de
"Fuentes" de la ficha de un club), `data/sources-view.js` (NO cambiar el criterio de qué se muestra,
solo reusarlo).

**Dependencias:** ninguna — usa `sources{}` de cada `data/<club>-data.js`, no `fuentes-por-club.md`.

**Ojo, contexto reciente:** en la sesión del 2026-09-20 que partió `fuentes-por-club.md` se corrigió
además un bug de `tools/generate-fuentes-page.js --check` (falso positivo por un regex que no
contemplaba un `</span>` en el footer, commit `411beaf` de `main`) — confirmá que ese fix sigue
vigente antes de extender el generador, para no reintroducirlo.

**Pros/contras:** ver la respuesta completa que le di a Guido por chat el 2026-09-18 (mejora SEO —
cada club indexable por separado; riesgo de que la generación de N páginas en vez de 1 sea más
compleja de mantener que el generador actual).

**Prompt operativo:**

```
Contexto: en finance-of-sports, fuentes.html es una página pública única (generada por
tools/generate-fuentes-page.js desde los sources{} de cada data/<club>-data.js) con una fila por
cada documento fuente de CADA club — hoy ~90 documentos en una sola tabla, crece con cada balance
nuevo. La pestaña "Fuentes" de la ficha de un club en Finanzas hoy linkea a esta misma página
gigante. Ver auditorias/2026-09-17-escala.md hallazgo 2 y
.claude/skills/escala-finance-of-sports/SKILL.md sección A para el contexto completo.

Guido tiene una idea concreta, que es tu tarea diseñar e implementar (dos fases, no ejecutes la fase
2 sin aprobación explícita):
- Cuando el visitante ve un club en Finanzas y clickea "Ver fuentes", va a una página PROPIA de ESE
  club, con solo sus documentos.
- Si quiere ver fuentes de otros equipos, un link "Ver fuentes de otros equipos" lleva a un ÍNDICE
  con SOLO links a las páginas individuales, no el contenido de las fuentes.

OJO antes de arrancar: en la sesión del 2026-09-20 (commit 411beaf de main) se corrigió un falso
positivo de tools/generate-fuentes-page.js --check (un regex del footer que no contemplaba un
</span>). Confirmá que ese fix sigue vigente al extender el generador, no lo reintroduzcas.

FASE 1 — Proponé, no ejecutes. Diseñá el plan:
- Convención de URLs/paths para las páginas por club (ej. fuentes/<clubId>.html — mirá cómo está
  organizado el resto del repo estático antes de decidir).
- Qué contenido va en la página de un club (el mismo detalle que hoy tiene su fila en fuentes.html:
  link al documento, tipo y nivel de fuente, salvedades — ver data/sources-view.js y
  sourceCaveats(), NO cambiar ese criterio de qué se muestra vs. qué queda interno).
- Cómo se genera: extender tools/generate-fuentes-page.js (con su --check) para que genere N
  páginas de club + 1 índice, en vez de 1 página única. Nada se edita a mano.
- Qué cambia en index.html/js/finanzas-render.js para que el link de "Fuentes" de la ficha de un
  club apunte a SU página, y dónde agregar "Ver fuentes de otros equipos".
- Mencioná si esto mejora el SEO de cada club (páginas propias indexables) — es parte del objetivo
  original de fuentes.html.

Entregame el plan en texto antes de tocar nada.

FASE 2 — Con aprobación explícita: implementar, correr tools/generate-fuentes-page.js --check,
verificar en el navegador (preview_start) que los links de la ficha de un club llevan a su página y
que el índice funciona, cerrar la sesión (ESTADO.md/TODO.md/CHANGELOG.md,
start-session-finance-of-sports-project). ANTES de terminar, actualizá PLAN-REMEDIACION-ESCALA.md:
marcá este punto como Hecho y completá sus "Notas de ejecución".
```

**Notas de ejecución** (sesión 2026-09-20, Versión 162 de `CHANGELOG.md`):

- **Se partió por CLUB, no por país**, que es lo que pedía el to-do 22(c) viejo. El club es la
  unidad que el visitante busca y la única que puede rankear sola en un buscador: partir por país
  dejaba 6 páginas grandes y ningún club con URL propia, que era el objetivo entero.
- **Archivos generados**: `fuentes/<clubId>.html` (41), `fuentes.html` como índice (una fila por
  club con su conteo y el link, sin contenido de fuentes) y `sitemap.xml`. El índice bajó de 86,5 KB
  a 14,5 KB; cada página de club pesa ~6,5 KB y el visitante se baja una sola.
- **El path**: `fuentes/`, la misma carpeta donde ya viven las notas de sourcing. No colisionan
  porque las notas están siempre un nivel más abajo (`fuentes/<País>/<Club>.md`) y las páginas son
  archivos en el nivel de arriba. El generador solo mira `.html` del nivel de arriba, nunca entra a
  las subcarpetas de país.
- **DOS COSAS QUE EL PROMPT NO CONTEMPLABA y hubo que agregar**. (1) Borrar las páginas huérfanas:
  con N archivos, un club que se saca o que cambia de `clubId` deja su `.html` ahí y Netlify lo
  sigue sirviendo con datos fantasma, porque publica la raíz del repo entera. (2) `--check` tiene
  que comparar los 43 archivos y distinguir falta / quedó viejo / sobra, no uno solo.
- **`sitemap.xml` sin `<lastmod>`**, a propósito: una fecha que cambia todos los días haría que
  `--check` diga "desactualizado" cada día sin que cambie un dato, que es exactamente el bug del
  footer que arregló el commit `411beaf`. El fix de ese commit se confirmó vigente antes de empezar,
  como pedía el prompt, y sigue ahí.
- **BUG REAL ENCONTRADO EN LA VERIFICACIÓN, y es el motivo por el que no alcanzaba con correr el
  generador**: `I18N.load()` arma el src del diccionario como `data/lang/<code>.js`, relativo al
  DOCUMENTO. Desde `fuentes/boca.html` eso pedía `fuentes/data/lang/en.js`, 404, y la página se
  quedaba en castellano con el sitio en inglés. No se veía rota porque el `onerror` de `I18N.load()`
  degrada a castellano a propósito: se veía en el idioma equivocado. Se agregó `window.I18N_BASE`
  ('' en la raíz, '../' en `fuentes/`), con la regla escrita en `CONVENCIONES.md`. **Estas son las
  primeras páginas del proyecto que no viven en la raíz**, por eso nunca había aparecido.
- **Punto ciego de i18n cerrado**: el chequeo `i18n-incompleto` de `tools/audit.js` escaneaba
  `index.html` y una lista fija de `js/`, pero no `tools/generate-fuentes-page.js`, que también
  emite `data-i18n`. Una clave nueva de estas páginas era invisible al chequeo. Ya está en la lista,
  y la regla de `CONVENCIONES.md` se amplió de "todo archivo de `js/` que llame a `t()`" a todo
  archivo que emita claves, incluido el que genera HTML.
- **SEO** (el prompt pedía decir si mejora): sí, y era el objetivo original de `fuentes.html` según
  su propia cabecera ("una URL propia es rankeable y el crawler no depende de JS"). Hasta acá los 41
  clubes compartían una sola URL, así que ninguno podía rankear por su nombre. Se sumó `sitemap.xml`
  (aprobado por Guido) porque el repo no tiene ni sitemap ni `robots.txt`: sin él, el índice era el
  único camino del crawler a las 41 páginas nuevas.
- **Verificación**: `--check` limpio; `node tools/audit.js` en 0 P0 / 0 P1 (44 P2, 8 P3, igual que
  antes); `auditAll()` en 41 clubes / 222 checks / 0 que no cierran; índice y páginas de club
  abiertas en el navegador, traduciendo bien al inglés; los links de la ficha de Finanzas apuntando
  a `fuentes/boca.html` y a `fuentes.html`; 0 recursos fallidos en la carga del sitio; y el barrido
  de huérfanas probado a mano creando una página falsa (`--check` la reporta como "sobra" y sale con
  1, el generador la borra).
- **`ASSET_V` de 155 a 162**, la constante y los 13 tags juntos. Durante la sesión se subió a `162a`
  para esquivar la caché del entorno (el fix de `i18n.js` llegó después de que el navegador ya
  hubiera cacheado `js/i18n.js?v=162`, que es el gotcha de `CLAUDE.md` en vivo) y se dejó en `162`
  al terminar.

---

## Punto 7 (orden 5) — Reforzar la alarma de colisión de `clubId` al momento de sourcing

**Problema:** hoy `checkClubIds()` en `tools/audit.js` avisa cuando un club YA CARGADO colisiona con
otro de distinto país. Sería mejor avisar en el momento de SOURCING (antes de transcribir nada), leyendo
`fuentes/_indice/<País>.md` — que ahora existe gracias al punto 1 — en vez de solo `clubs{}`.

**Archivos:** `tools/audit.js` (nueva función o extensión de `checkClubIds()`).

**Dependencias:** depende del punto 1 (ya hecho) — sin el split de `fuentes-por-club.md`, no
existía un archivo por país fácil de escanear para esto. No bloquea ni es bloqueado por ningún otro
punto de este plan.

**Pros/contras:** ver la respuesta completa del 2026-09-18 (cero riesgo, no toca datos existentes;
contra: pura prevención, no hay colisiones reales hoy, y agrega una segunda alarma parecida a la que
ya existe para mantener).

**Prompt operativo:**

```
Contexto: en finance-of-sports, checkClubIds() en tools/audit.js avisa cuando un club YA CARGADO
(en clubs{}) colisiona con otro de distinto país que comparte nombre base (ej. "racing" existe en
Argentina y en España). Es un chequeo bueno pero tardío: solo se dispara cuando el club ya se cargó
al sitio, no cuando alguien empieza a sourcearlo. Desde la Versión 158 de main existe
fuentes/_indice/<País>.md (una línea por club trackeado, con o sin documento encontrado, cargado o
no) — un archivo por país, fácil de escanear para adelantar esta alarma. Ver
.claude/skills/escala-finance-of-sports/SKILL.md sección E para el contexto completo.

TU TAREA (dos fases, no ejecutes la fase 2 sin aprobación explícita de Guido):

FASE 1 — Proponé, no ejecutes. Diseñá una función nueva para tools/audit.js que:
- Lea todos los fuentes/_indice/<País>.md.
- Extraiga el nombre de cada club (mismo regex que usa PROMPT-generador-indice-fuentes.md para
  detectar líneas de club, si ese generador ya existe consultalo para no duplicar criterio).
- Detecte nombres de club iguales o muy parecidos (normalizados: sin acentos, minúsculas) en países
  DISTINTOS, y reporte un P3 informativo (no P2 — todavía no está cargado al sitio, es solo un aviso
  temprano) sugiriendo qué id con país convendría usar si algún día se carga.
Pensá si conviene una lista de excepciones (nombres genéricos que van a colisionar siempre y no
vale la pena avisar cada vez, ej. "Unión", "Deportivo") — proponelo, no lo asumas.

Entregame el plan antes de tocar código.

FASE 2 — Con aprobación explícita: implementalo, correlo (node tools/audit.js) y revisá a mano los
P3 que reporte — ¿tienen sentido, o son puro ruido de nombres genéricos que hay que excluir? Ajustá
la lista de excepciones según lo que encuentres. Cerrá la sesión (ESTADO.md/TODO.md/CHANGELOG.md,
start-session-finance-of-sports-project) — agregá esto como to-do formal en TODO.md si todavía no
existe uno (hoy este punto solo está documentado en PLAN-REMEDIACION-ESCALA.md, no en TODO.md).
ANTES de terminar, actualizá PLAN-REMEDIACION-ESCALA.md: marcá este punto como Hecho y completá sus
"Notas de ejecución".
```

**Notas de ejecución** (sesión 2026-09-20, Versión 163 de `CHANGELOG.md`):

- **Se midió ANTES de diseñar, y el número cambió el diseño.** Sobre los 530 clubes trackeados:
  comparación EXACTA de nombres, 3 pares entre países (Everton Chile/Inglaterra, Nacional
  Portugal/Uruguay, Olimpia Honduras/Paraguay). Por primera palabra ("muy parecidos", como sugería
  el prompt), 119 clubes en 23 grupos, dominados por "Deportivo" (10), "FC" (17), "Atlético" (6),
  "Independiente" (4), "Unión" (4).
- **Respuesta a la pregunta del prompt sobre la lista de excepciones: NO hace falta, y el motivo es
  que la comparación exacta ya evita el problema.** El ruido de los nombres genéricos aparece solo
  si se hace matching difuso; la salida correcta es no hacerlo, no mantener una lista para tolerarlo.
- **REFRAMEADO, y es lo importante de este punto.** El chequeo tal como estaba especificado (P3 por
  cada par de nombres iguales entre países) habría sido 3 líneas permanentes sobre clubes que no
  están cargados y que quizá nunca lo estén, y encima casi redundantes: desde la Versión 129 un club
  NUEVO ya nace con el país en el id, así que un "Everton" que entrara mañana sería `everton-cl` sin
  que nadie avise nada. Lo que sí vale es el caso accionable: **un club trackeado que vuelve ambiguo
  uno de los 41 `clubId` heredados SIN país**, porque ese es el que obliga a una migración de tres
  frentes (archivo, id, prefijo de cada sourceId) y conviene decidirlo antes de transcribir. Ese
  conjunto hoy es 0, medido, no asumido.
- **Qué quedó**: `checkColisionSourcing()` en `tools/audit.js`, con dos salidas. P3
  `clubid-amenazado-por-sourcing`, uno por caso accionable (hoy ninguno). P3
  `nombres-repetidos-sourcing`, UNA línea agregada con los pares entre clubes de los que no está
  cargado ninguno (hoy los 3). Un nombre que salió en el primero se excluye del segundo, porque la
  frase "ninguno está cargado" sería falsa justo para él.
- **GOTCHA DE PARSEO, que es lo que más fácil se vuelve a pisar**: el patrón de línea de club
  (`^- \[([^\]]+)\]`) matchea también `- [Notas generales de X](../X/_notas-generales.md)`, que hay
  una por país. Sin excluirlas, el conteo da **569 clubes en vez de 530** y aparece un choque
  fantasma de "Notas" en 39 países, que fue el grupo más grande de la primera corrida del análisis.
  Se excluyen por el DESTINO del link (empieza con `_`), no por el texto, que cambia de país a país.
  La confirmación de que el criterio es el correcto es que el conteo da exactamente los 530 de
  `ESTADO.md`.
- **Verificación**: `node tools/audit.js` en 0 P0, 0 P1, 44 P2, 9 P3 (uno más que antes, la línea
  agregada). Como el P3 accionable nace en cero, se ejercitó a mano agregando `- [Racing Club]` al
  índice de España: disparó con el mensaje correcto ("renombrar 'racing' a 'racing-ar' primero") y
  Racing desapareció de la línea agregada, que es el comportamiento buscado. El índice se restauró
  (`git status` limpio).
- **No se agregó to-do a `TODO.md`**: el prompt lo pedía solo si el punto no se resolvía en la misma
  sesión.

---

## Punto 9 (orden 6) — Partir `data/club-leagues.js`

**Problema:** archivo único (241 líneas hoy) con una sección por club, TODOS sus años inline,
mantenido a mano "una vez por temporada" según su propio comentario de cabecera. Mismo patrón que
tenía `fuentes-por-club.md` antes de partirse (punto 1), un escalón más adelante en el tiempo. Además
es el archivo eager que más rápido crece (por EJERCICIO, no por club — ver punto 3).

**Archivos:** `data/club-leagues.js`, quien lo lee (`js/selector.js`: `clubsOfLeagueYear()`,
`leaguesOfClub()`, y los helpers de navegación; buscá todas las referencias a `LEAGUES`/funciones
de `club-leagues.js`), `tools/audit.js` (`checkLigasPorEjercicio()`, que cuenta filas en `null`).

**Dependencias:** ES LA BASE del punto 3 (adelgazar el payload eager) — hacelo ANTES de ese punto,
no en paralelo, porque el punto 3 asume que el detalle completo de `club-leagues.js` ya está
partido por país/liga para poder cargarlo lazy.

**Pros/contras:** ver la respuesta completa del 2026-09-18 (resuelve DOS problemas con un cambio —
peso eager y proceso de revisión anual; contra: hoy no rinde nada todavía, 85 ejercicios se repasan
en minutos, y hay que decidir bien el criterio de partición para que un club que cambia de
confederación no quede en el archivo de país "equivocado").

**Prompt operativo:**

```
Contexto: en finance-of-sports, data/club-leagues.js dice en qué liga jugó cada club cada año
(necesario porque un club puede subir o bajar de categoría). Hoy es un archivo único, un objeto por
club con TODOS sus años adentro, 241 líneas, mantenido a mano "una vez por temporada" según su
propio comentario. Es el mismo patrón que tenía fuentes-por-club.md antes de partirse por país
(commit a211594 de main, Versión 158) — y es además el archivo que index.html carga eager (siempre,
antes de elegir club) que crece más rápido con el volumen: crece por EJERCICIO, no por club. Ver
auditorias/2026-09-17-escala.md hallazgo 3 y .claude/skills/escala-finance-of-sports/SKILL.md
secciones B y F para el contexto completo.

Este punto es la BASE del siguiente (adelgazar el payload eager, PLAN-REMEDIACION-ESCALA.md más
abajo) — lo que decidas acá sobre cómo particionar condiciona ese trabajo.

TU TAREA (dos fases, no ejecutes la fase 2 sin aprobación explícita de Guido):

FASE 1 — Proponé, no ejecutes. Diseñá el split: ¿por país o por liga? (país es más simple y ya
coincide con cómo se repasan ascensos/descensos; liga podría ser más preciso pero un club puede
pertenecer a ligas de países distintos en su historia — pensalo con casos reales del archivo actual,
ej. Mirassol que subió y bajó de división). Diseñá:
- Convención de archivos (ej. data/club-leagues/<país>.js, o similar — mirá cómo se hizo con
  fuentes/_indice/ para inspirarte pero no copies ciego, esto es código que se ejecuta en el
  navegador, no un .md).
- Qué queda en el archivo LIVIANO que sigue siendo eager (probablemente: qué ligas/temporadas
  existen y cuántos clubes tiene cada una, sin el detalle club-por-club) vs. qué se mueve al detalle
  partido.
- Cómo se cargan lazy los detalles cuando el selector los necesita (mismo mecanismo que
  loadClubData(), revisalo antes de inventar uno nuevo).
- Qué cambia en js/selector.js (clubsOfLeagueYear, leaguesOfClub, y cualquier otro consumidor —
  buscalos todos con grep antes de tocar nada) y en tools/audit.js (checkLigasPorEjercicio).
Entregame el plan (estructura de archivos, qué es eager vs. lazy, qué se toca en selector.js) antes
de escribir código.

FASE 2 — Con aprobación explícita: implementar. Verificación obligatoria: el selector jerárquico
tiene que seguir funcionando IGUAL para el usuario (mismos países, ligas, temporadas, conteos) —
probalo en el navegador (preview_start) recorriendo el modal paso a paso, y correé node
tools/audit.js (0 P0/P1 esperado, igual que antes). Cerrá la sesión (ESTADO.md/TODO.md/CHANGELOG.md,
start-session-finance-of-sports-project). ANTES de terminar, actualizá PLAN-REMEDIACION-ESCALA.md:
marcá este punto como Hecho, completá sus "Notas de ejecución", y — importante — revisá el prompt
del punto 3 (el siguiente en la tabla de orden) para que la convención de archivos que elegiste acá
esté reflejada ahí antes de que alguien lo ejecute.
```

**Notas de ejecución** (sesión 2026-09-20, Versión 164 de `CHANGELOG.md`):

- **LA CONVENCIÓN DE ARCHIVOS, que es lo que el punto 3 necesita de acá**:
  `data/club-leagues/<iso2>.js`, uno por país, en minúscula, con el mismo código de 2 letras que usa
  `clubs[].country`. Cada uno hace `window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};`
  y después `Object.assign(window.CLUB_LEAGUE_BY_YEAR, { ... })`. No redeclaran nada y el orden de
  carga no importa. Es el patrón que `sources{}` y `gestionesByClub{}` ya usaban desde la Versión
  101, documentado en la cabecera de `data/clubs.js`.
  **EL CARGADOR ES `window.loadClubLeagues()`**, en `data/club-leagues.js`: cachea su promesa, saca
  la lista de países de `clubs{}` (nada que mantener a mano) y usa `allSettled`, así que un país sin
  archivo avisa por consola y el resto sigue.
- **POR PAÍS Y NO POR LIGA**, con el invariante verificado en vez de asumido: sobre los 41 clubes,
  CERO juegan una liga de otro país. Eso es lo que hace que la partición por país sirva para los 6
  helpers a la vez, tanto "las ligas de este club" como "los clubes de esta liga".
- **EL EJE QUE IMPORTABA NO ERA "CÓMO PARTIRLO" SINO "CUÁNDO SE CARGA", y esto vale para el punto 3.**
  Partir por país NO compra lazy-load: el selector necesita la tabla ENTERA para dibujarse
  (`ligasConClubes()`, `js/selector.js:867`, recorre TODAS las ligas y para cada una pregunta quiénes
  la integran), así que un cargador "por país elegido" terminaría bajando los mismos 6 archivos. Lo
  que sirvió fue medir QUIÉN usa la tabla: solo `js/selector.js`, en 4 llamadas, y recién cuando se
  abre el modal. `init()` solo engancha listeners. O sea que alcanzó con UNA frontera async en
  `abrirModal()`, y los 6 helpers siguieron síncronos.
- **TRES NÚMEROS DEL PLAN Y DE LA AUDITORÍA QUE RESULTARON FALSOS**, medidos acá:
  1. `club-leagues.js` era **65% comentarios**. Las filas de datos son **28 B/ejercicio**, no 164.
     La proyección de ~800 KB a 5000 ejercicios es en realidad ~137 KB de datos. El problema existía,
     pero era 5x más chico.
  2. **CORRECCIÓN, del mismo día**: dije que el "~38 KB" de esos tres documentos era falso, y no lo
     era. Es la suma de los TRES archivos eager que escalan (37,3 KB), que es exactamente lo que
     dice el skill de escala. Lo que pasa es que hay TRES números y hay que decir cuál se usa: 37,3
     KB los tres que escalan, **79,7 KB** el payload eager completo (8 archivos) sin comprimir, y
     **29,3 KB** como viaja de verdad, porque Netlify sirve comprimido.
  3. El ahorro de HOY es **1,2 KB**, no 13,6: el archivo de helpers se quedó con la prosa de las
     reglas. Lo que cambió es que pasó a ser de tamaño FIJO en vez de crecer por ejercicio.
- **BUG REAL EN EL CAMINO**: el cargador leía `window.clubs`, que es `undefined`, porque
  `data/clubs.js` declara `const clubs`, o sea un global LÉXICO y no una propiedad de `window`. La
  lista de países salía vacía y no se pedía ni un archivo, en silencio, con el modal abriendo igual
  (sin ligas). Es exactamente el bug de la Versión 96 ya documentado en `CONVENCIONES.md`, con otro
  identificador. **Si el punto 3 mueve campos entre archivos de `data/`, va a pisar esto de nuevo.**
- **Verificación**: snapshot de los 6 helpers ANTES del cambio (corrido en Node contra el archivo de
  `git HEAD`) y DESPUÉS (corrido en el navegador): idénticos, incluido el mismo hash SHA-1 de
  `leaguesOfClub` para los 41 clubes. Antes de abrir el modal, la tabla tiene 0 clubes y no se bajó
  ningún archivo de país; al abrirlo se bajan los 6 y quedan los 41, con 8 ligas con clubes, igual
  que antes. Modal recorrido paso a paso: 2 regiones, países con sus conteos (Argentina 11, Brasil 7,
  Colombia 2, España 10) y el paso de clubes con los 21 de Argentina + España. 0 recursos fallidos,
  `auditAll()` en 41 clubes / 222 checks / 0 que no cierran, `node tools/audit.js` en 0 P0 / 0 P1.
- **`ASSET_V` a 164**, constante y los 13 tags. Durante la sesión se usó `164a` para esquivar la
  caché del entorno.
- **Ojo, el audit atajó un olvido**: `asset-v-sin-subir` (P1) saltó cuando había cambios en `js/` y
  `data/` sin tocar `index.html`. Funcionó exactamente como tenía que funcionar.

---

## Punto 3 (orden 7) — Adelgazar el payload eager (`clubs.js`/`club-index.js`, sobre la base del punto 9)

**Problema:** `index.html` carga eager 8 archivos de `data/` antes de elegir club. De esos, 3 crecen
con el volumen: `clubs.js` (405 B/club → ~395 KB a 1000 clubes), `club-index.js` (173 B/club → ~168
KB), y `club-leagues.js` (ya partido por el punto 9, pero puede quedar un índice liviano que también
pese algo). Suma proyectada sin intervenir: ~1,4 MB, contra ~38 KB hoy.

**Archivos:** `data/clubs.js` (sacar `reportingCurrency`/`fiscalYearStart` a cada
`data/<club>-data.js`), `data/club-index.js`, el índice liviano de ligas que dejó el punto 9,
`tools/generate-club-index.js`, `js/finanzas-calc.js` (quien lee `reportingCurrency`/
`fiscalYearStart` de `clubs{}` hoy), `js/selector.js`, `index.html` (script tags).

**Dependencias:** depende del punto 9 (tiene que estar hecho antes — este punto asume que
`club-leagues.js` ya quedó partido y solo falta terminar `clubs.js`/`club-index.js`). Si se decidió
migrar algún `clubId` en el punto 7, mejor que ya esté hecho también, para no tocar los mismos
archivos dos veces.

**Riesgo:** MEDIO-ALTO — a diferencia de los puntos anteriores, este toca el selector de club para
TODOS los visitantes. Probar bien en preview antes de aprobar.

**Prompt operativo:**

```
Contexto: en finance-of-sports, index.html carga eager (siempre, antes de elegir club) 8 archivos
de data/: clubs.js, club-index.js, leagues.js, club-leagues.js, category-map.js, site-labels.js,
currency-map.js, sources-view.js. De esos, clubs.js y club-index.js crecen linealmente con la
cantidad de clubes. club-leagues.js ya se partió en el punto anterior de este plan.

AJUSTE 2026-09-20, con lo que de verdad quedó del punto 9 (leé igual sus Notas de ejecución
completas):
- La convención es `data/club-leagues/<iso2>.js`, uno por país, cada uno con
  `window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {}` + `Object.assign(...)`. NO quedó
  ningún "índice liviano" de ligas, que es lo que este prompt asumía: no hizo falta.
- El cargador es `window.loadClubLeagues()` (en `data/club-leagues.js`), que cachea su promesa y
  saca la lista de países de `clubs{}`. Si adelgazás `clubs.js`, NO le saques `country`: este
  cargador lo lee.
- La frontera async está en `abrirModal()` de `js/selector.js`, y es UNA sola. Si este punto agrega
  otra carga lazy que el selector necesite, sumala AHÍ en vez de volver async un helper.
- OJO CON `window.X` CONTRA `X` PELADO: `data/clubs.js` declara `const clubs`, o sea un global
  léxico que NO es propiedad de `window`. `window.clubs` da `undefined`. Ya costó un bug en el punto
  9 y este punto mueve campos justamente entre esos archivos.
- TRES NÚMEROS DE PAYLOAD EAGER, no uno: 37,3 KB los tres archivos que escalan (de ahí el "~38 KB"
  del skill, que está bien), 78,5 KB los 8 archivos eager sin comprimir, y 29,3 KB como viajan de
  verdad. **Proyectá siempre sobre el comprimido**: estos archivos son filas casi idénticas, que es
  justo lo que gzip aplasta, así que una proyección sobre bytes crudos exagera por 3x o más. Ver auditorias/2026-09-17-escala.md hallazgo 3 y
.claude/skills/escala-finance-of-sports/SKILL.md sección B para el contexto completo.

TU TAREA (dos fases, no ejecutes la fase 2 sin aprobación explícita de Guido):

FASE 1 — Proponé, no ejecutes. Diseñá:
- Adelgazar clubs.js: sacar reportingCurrency/fiscalYearStart (solo hacen falta con el club YA
  cargado) al data/<club>-data.js de cada uno. Buscá TODOS los lugares que leen esos dos campos de
  clubs{} (grep, no asumas) antes de decidir cómo migran.
- Revisar club-index.js: ¿sigue siendo el tamaño correcto después de que club-leagues.js se partió,
  o hay algo de ahí que también se puede mover a lazy?
- Actualizar tools/generate-club-index.js para que siga generando todo esto correctamente.
- Actualizar index.html: los <script src> que ya no correspondan si algo pasó a lazy-load.
Entregame el plan (qué campo va a qué archivo, qué código lector cambia) antes de tocar nada.

FASE 2 — Con aprobación explícita: implementar. Verificación OBLIGATORIA, más estricta que en los
puntos anteriores porque esto toca el selector para todos los visitantes: preview_start, abrir el
selector jerárquico, recorrer los 4-5 pasos con al menos 3 clubes de países distintos, confirmar
consola limpia (read_console_messages) y que ningún dato del club (moneda, año fiscal) cambió de
valor. Correr node tools/audit.js (0 P0/P1) y ?audit=1 en el navegador (222 checks, 0 mismatches,
mismo resultado que antes del cambio). Cerrá la sesión (ESTADO.md/TODO.md/CHANGELOG.md,
start-session-finance-of-sports-project). ANTES de terminar, actualizá PLAN-REMEDIACION-ESCALA.md:
marcá este punto como Hecho, completá sus "Notas de ejecución", y revisá el prompt del punto 4 (el
siguiente) por si algo de esto cambia qué datos lee js/selector.js en su buscador.
```

**Notas de ejecución** (sesión 2026-09-20): **POSPUESTO, decisión de Guido sobre estas mediciones.**

- **NO SE IMPLEMENTÓ NADA.** El punto cuesta un refactor que este mismo plan marca MEDIO-ALTO (toca
  el selector para todos los visitantes) y paga, medido, **3,0 KB comprimidos a 1000 clubes**.
- **LA MEDICIÓN, para que nadie la tenga que rehacer** (todo gzip -9, que es como Netlify sirve):

  | | sin comprimir | en el cable |
  |---|---|---|
  | Acortar `reportType` en `club-index.js` | −1,8 KB | **−60 B (4%)** |
  | Sacar `reportingCurrency` + `fiscalYearStart` de `clubs.js`, a 1000 clubes | −48 KB | **−3,0 KB (10%)** |

  Los 3,0 KB salen de simular 1000 clubes con nombres, países y monedas VARIADOS (28,0 a 25,0 KB
  comprimidos), no de duplicar las 41 filas de hoy, que comprimen a nada y darían un número falso.
- **LA PREMISA DEL PROMPT ERA INCORRECTA EN SU MITAD**: dice que los dos campos "solo hacen falta con
  el club YA cargado". `fiscalYearStart` NO: `js/selector.js:212` lo lee para decidir si un ejercicio
  se etiqueta "2024" o "2023/2024", en el paso en que el visitante elige el año, ANTES de bajar
  ningún archivo de club. Moverlo al `data/<club>-data.js` obligaría al selector a bajar los 41
  archivos para escribir una etiqueta, que es justo lo que el selector existe para evitar. Si alguna
  vez se retoma, el destino correcto de ese campo es `club-index.js` (generado), no el archivo del
  club.
- **UNA PROPUESTA QUE SE CAYÓ SOLA, y la lección que dejó**: esta sesión propuso acortar los
  `reportType` de `club-index.js` a códigos de una letra como "el ahorro grande". El comentario de
  `tools/generate-club-index.js` (línea ~233) ya argumentaba en contra, con razón: "son 7 strings
  que se repiten miles de veces, o sea justo lo que gzip aplasta a casi nada". **Leé los comentarios
  del archivo que vas a cambiar antes de proponer revertir lo que dicen.**
- **REGLA QUE QUEDÓ ESCRITA** en `.claude/skills/escala-finance-of-sports/SKILL.md`: proyectá sobre
  el COMPRIMIDO, no sobre bytes crudos. Estos archivos son filas casi idénticas y una proyección
  cruda exagera por 3x o más. El to-do 22(d) se cerró con este mismo criterio.
- **QUÉ HARÍA FALTA PARA REABRIRLO**: que el payload eager comprimido pase a ser un problema
  observable (hoy son 29,3 KB los 8 archivos juntos), o que aparezca un campo eager que NO comprima
  bien, o sea que varíe de verdad club por club.

---

## Punto 4 (orden 8) — Debounce + límite de resultados en el buscador del selector

**Problema:** el buscador del selector (`js/selector.js`, `renderBusqueda()`, disparado por
`addEventListener('input', renderBusqueda)`) filtra `Object.keys(CLUB_INDEX)` completo en cada
tecla, sin debounce, y reconstruye el DOM de resultados sin límite de cantidad.

**Archivos:** solo `js/selector.js`.

**Dependencias:** depende del punto 3 (que puede haber cambiado la forma de `CLUB_INDEX` o de cómo
se filtra) — hacerlo antes significaría tocar `js/selector.js` dos veces con cambios distintos.

**Pros/contras:** ver la respuesta completa del 2026-09-18 (cambio chico y aislado, bajo riesgo;
contra: agrega un retraso mínimo perceptible y hay que elegir bien el número de resultados a
mostrar).

**Prompt operativo:**

```
Contexto: en finance-of-sports, el buscador del selector jerárquico (js/selector.js, función
renderBusqueda(), disparada por $('modalQ').addEventListener('input', renderBusqueda)) filtra
Object.keys(window.CLUB_INDEX) completo en CADA tecla que se escribe, sin debounce, y reconstruye
el DOM de resultados (un botón por match, con su propio listener) sin límite de cantidad mostrada.
A 41 clubes es instantáneo; a 1000-3000, cada tecla puede reconstruir cientos de nodos. Ver
auditorias/2026-09-17-escala.md hallazgo 4 y .claude/skills/escala-finance-of-sports/SKILL.md
sección C para el contexto completo. Si el punto 3 de PLAN-REMEDIACION-ESCALA.md ya se hizo, revisá
sus Notas de ejecución antes de arrancar — puede haber cambiado la forma de CLUB_INDEX.

TU TAREA (dos fases, no ejecutes la fase 2 sin aprobación explícita de Guido):

FASE 1 — Proponé, no ejecutes. Diseñá:
- Debounce de ~150-200ms en el input antes de disparar renderBusqueda.
- Límite de resultados mostrados (proponé un número, con el motivo) + mecanismo de "mostrar más".
- Mismo tratamiento para el grid de "todos los clubes de un país" en el constructor de mezcla
  (buscá el otro lugar de js/selector.js que arma un grid completo de CLUB_INDEX sin buscador de
  por medio).
Entregame el plan (número de debounce, número de resultados, dónde aplica cada uno) antes de tocar
código.

FASE 2 — Con aprobación explícita: implementar, probar en el navegador escribiendo en el buscador
(computer/form_input) y confirmar que sigue encontrando clubes correctamente y que "mostrar más"
funciona. Cerrá la sesión (ESTADO.md/TODO.md/CHANGELOG.md, start-session-finance-of-sports-project).
ANTES de terminar, actualizá PLAN-REMEDIACION-ESCALA.md: marcá este punto como Hecho y completá sus
"Notas de ejecución". Con esto se cierran los 8 puntos de este plan — si es así, decíselo a Guido
explícitamente en el resumen de cierre, no asumas que lo va a notar solo.
```

**Notas de ejecución** (sesión 2026-09-20, Versión 165 de `CHANGELOG.md`):

- **EL DEBOUNCE VA EN EL LISTENER, NO EN LA FUNCIÓN**, y esto el prompt no lo contemplaba.
  `renderBusqueda()` se llama desde TRES lugares: el `input` y dos veces desde adentro de sí misma,
  al elegir un club o una liga, justo después de hacer `$('modalQ').value = ''`. Esas dos tienen que
  correr en el mismo tick: si se debouncea la función, los resultados viejos quedan en pantalla
  mientras `confirmar()` cambia de club. 160 ms.
- **Tope de 30** con "Mostrar más" y el conteo real al lado ("30/34"): esconder sin decir cuántos
  hay se lee como "no está". Se resetea en cada consulta nueva Y en cada apertura del modal (lo
  segundo se agregó al probar: el flag es de módulo y se arrastraba de una sesión del modal a la
  siguiente).
- **Caché del texto buscable**, que no estaba en el prompt y era el costo real: el filtro llamaba a
  `ligasDe(id)` para CADA club en CADA tecla, y esa función ordena las ligas del club cada vez. A
  3000 clubes eso pesa más que el DOM. Se invalida cuando resuelve `loadClubLeagues()` (punto 9),
  porque antes de eso el texto quedaría sin las ligas adentro.
- **La grilla del constructor de mezcla** lleva el mismo tope, pero con los marcados SIEMPRE
  primero y visibles: ahí el visitante está seleccionando, y esconderle algo que marcó se lee como
  que se le borró. El botón "Mostrar más" repinta con `renderModal()` y no con `renderBusqueda()`,
  por eso `grillaConTope()` recibe qué repintar.
- **LO QUE NO RESUELVE, y quedó como to-do 38**: esa grilla a 1000 clubes va a seguir sin servir
  aunque no haga jank, porque es una lista para elegir a ojo. Necesita su propio buscador, que es
  una feature y no una optimización.
- **Verificación en el navegador**: 0 resultados en el tick del tecleo y 30 tras el debounce;
  "Mostrar más" revela los 34 y el botón desaparece; una consulta nueva vuelve al tope (22 hits, sin
  botón); elegir un club desde el buscador limpia los resultados en el mismo tick, vacía el input y
  deja el club activo; la grilla de mezcla muestra 30/41 y un club marcado que estaba en la posición
  40 pasa a la 0. `node tools/audit.js` en 0 P0 / 0 P1, los dos generadores con `--check` limpio, 0
  recursos fallidos.

---

## Hallazgos inesperados

_(agregar acá cualquier cosa que aparezca durante la ejecución de algún punto que no estaba prevista
en este plan ni en la auditoría original — no borrar entradas viejas, solo agregar)_

- **2026-09-20, ejecutando el punto 5: tres conteos de `tools/audit.js` desactualizados en la
  documentación.** `ESTADO.md` decía "58 P2, 9 P3" y el skill de arranque "52 P2, 7 P3"; los reales
  son 44 y 8. Ninguno de los dos era el resultado de una corrida reciente: quedaron de sesiones
  distintas y nadie los volvió a mirar. Corregidos los dos. LO QUE IMPORTA PARA EL RESTO DEL PLAN:
  cualquier punto que diga "confirmá que el audit sigue igual" tiene que sacar su línea de base
  CORRIENDO el comando al empezar, no leyéndola de un archivo de documentación. Es el mismo tipo
  de dato que el plan ya pide confirmar para los números de línea de `index.html`.
- **2026-09-20, ejecutando el punto 3: proyectar sobre bytes crudos exagera por 3x o más, y esta
  sesión se comió el error.** Todos los archivos de `data/` son filas casi idénticas, o sea justo lo
  que gzip aplasta, y Netlify sirve comprimido. Dos "ahorros" se cayeron al medirlos en el cable:
  acortar los `reportType` de `club-index.js` ahorra 60 bytes (4%), no 91 KB, y sacar
  `reportingCurrency`/`fiscalYearStart` de `clubs.js` ahorra 3,0 KB a 1000 clubes, no 49. Peor: el
  comentario de `tools/generate-club-index.js` YA decía esto ("son 7 strings que se repiten miles de
  veces, o sea justo lo que gzip aplasta a casi nada") y la sesión propuso revertirlo sin haberlo
  leído. **Leé los comentarios del archivo que vas a cambiar antes de proponer lo contrario de lo
  que dicen, y medí comprimido.** La regla quedó escrita en el skill de escala.
- **2026-09-20, ejecutando el punto 2: las 613 notas internas de `fuentes/` están publicadas.**
  Están trackeadas en git y el repo se deploya entero, así que se leen en
  `financeofsports.com/fuentes/<País>/<Club>.md`; 37 de ellas mencionan a Guido por nombre o
  contexto de trabajo interno. Es el mismo problema de `note` contra `publicNote` de la Versión 127,
  pero a nivel archivo, y la misma lección que `CLAUDE.md` ya escribió sobre `Prototyping/`. Se
  volvió más urgente con este punto, porque las páginas públicas por club ahora viven en esa misma
  carpeta y `sitemap.xml` la linkea, o sea que un crawler tiene motivo para entrar. Quedó como to-do
  37 en `TODO.md`, con las tres salidas posibles. NO se resolvió acá: es decisión de Guido.
- **2026-09-20, ejecutando el punto 2: una página fuera de la raíz rompe supuestos que nadie sabía
  que existían.** El proyecto nunca había tenido una página que no viviera en la raíz, así que
  `I18N.load()` podía armar paths relativos al documento sin que nadie lo notara. Si algún punto que
  sigue agrega archivos fuera de la raíz (el punto 9 va a crear `data/club-leagues/<país>.js`),
  revisá TODO cargador dinámico antes de darlo por bueno: `loadClubData()` e `I18N.load()` son los
  dos que arman src a mano. Un `<script src>` estático no alcanza como prueba, porque ese lleva su
  `../` escrito y carga bien mientras el inyectado en runtime falla.
- **2026-09-20, ejecutando el punto 8: un chequeo nuevo que da 0 hallazgos no prueba que funcione.**
  Mismo problema que la rama de error del punto 5, un escalón peor: un chequeo preventivo nace dando
  cero por definición, así que "corrí el audit y sigue igual" es compatible con haber escrito una
  función que no detecta nada. La vuelta barata: crear a mano el caso que tiene que encontrar
  (carpetas temporales, con `trap` para borrarlas pase lo que pase), confirmar que el aviso sale con
  el texto correcto, y recién ahí confiar en el cero. **Vale para el punto 7, que es otro chequeo
  preventivo que va a nacer en cero.**
- **2026-09-20, ejecutando el punto 5: el camino de error de `auditAll()` no lo ejercita ninguna
  corrida normal.** Con los 41 clubes cargando bien, la rama del `catch` (ahora la de
  `status === 'rejected'`) nunca corre, así que "el resumen da igual que antes" NO prueba que el
  manejo de fallos siga funcionando. Se probó inyectando clubes falsos desde la consola, en
  memoria. Vale el mismo criterio para cualquier punto de este plan que cambie una rama de error
  sin cambiar el camino feliz.

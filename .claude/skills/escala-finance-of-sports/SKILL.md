---
name: escala-finance-of-sports
description: Mapa de puntos calientes de escala de finance-of-sports — qué archivo, estructura de datos o proceso funciona bien con 50 clubes (el volumen de hoy) y se rompe entre 200 y 3000 clubes cargados (~5 ejercicios cada uno), con el número aproximado en el que aparece cada uno y cómo particionarlo/indexarlo. Es UN eje entre los cinco de `auditoria-finance-of-sports` (`escala`), separado en su propia skill porque el mapa es grande y evoluciona con cada sesión de sourcing/onboarding, y bloquearía la skill genérica de auditoría si viviera adentro. Usar cuando Guido pida explícitamente un chequeo de escala/capacidad, antes de un cambio grande de arquitectura, o como el contenido del eje `escala` al correr `auditoria-finance-of-sports`.
---

# Escala de finance-of-sports: qué se rompe entre 50 y 3000 clubes

## 0. Por qué existe esta skill y no vive adentro de `auditoria-finance-of-sports`

`auditoria-finance-of-sports` es el PROCEDIMIENTO (3 capas, severidades, formato de reporte) para
CUALQUIERA de sus cinco ejes (`datos`, `escala`, `codigo`, `docs`, `tokens`). Su propia sección "Cómo
mantener este skill" dice la regla que se aplicó acá: *"si el archivo crece tanto que no se lee en
dos minutos, es señal de que algo debería vivir en otro lado"*. El mapa de escala ya no entra en dos
minutos — cada sesión de sourcing agrega países, cada onboarding agrega ejercicios, y el mapa tiene
que actualizar proyecciones y agregar hallazgos nuevos con cada uno. Meterlo adentro de la skill
genérica la volvería un archivo sobre UN eje disfrazado de skill sobre cinco.

Además, a diferencia de los otros cuatro ejes (que se corren dentro de una auditoría de rutina
periódica), Guido ya pidió este eje dos veces fuera de esa cadencia, explícitamente, "porque viene un
cambio grande" — es un chequeo que se invoca solo, no necesariamente empaquetado con los otros
cuatro. Mismo criterio que separó `club-sourcing` de `club-data-mapping` de
`club-or-year-onboarding`: temas relacionados, invocación independiente.

**Esta skill NO reemplaza el procedimiento de `auditoria-finance-of-sports`.** Cuando el eje de una
auditoría de rutina sea `escala`, el reporte se sigue escribiendo con el formato de esa skill
(`auditorias/<fecha>.md`, severidades P0-P3, diff contra el anterior); esta skill es el contenido de
ese eje, no un procedimiento alternativo.

**Tampoco reemplaza `checkEscala()` de `tools/audit.js`.** Ese chequeo automático (clubId hardcodeado
en código, proyección de `data/*.js`, umbrales de archivos pesados) es determinista y barato — corré
`node tools/audit.js` primero, siempre. Esta skill es el juicio que el script no puede automatizar:
qué archivo o proceso, aunque hoy no dispare ningún umbral, va a romperse antes de llegar a 1000
clubes y por qué.

---

## 1. El criterio general, antes del mapa puntual

Tres preguntas para encontrar un cuello de escala que el mapa de abajo todavía no liste (el proyecto
va a seguir cambiando; este criterio es lo que no cambia):

1. **¿Este archivo/estructura se LEE, CARGA o ITERA ENTERO, o solo la porción que hace falta?**
   `index.html`/`Admin/ESTADO.md`/`Admin/TODO.md` se leen enteros cada sesión — su tamaño importa. `Admin/CHANGELOG.md`
   se consulta con grep — su tamaño casi no importa. Un `data/<club>-data.js` se carga bajo demanda,
   uno por visita — no importa cuántos existan, importa cuánto pesa CADA UNO. La misma pregunta
   aplica en el navegador: `clubs.js`/`club-index.js`/`club-leagues.js` se bajan SIEMPRE, antes de
   elegir club; el resto de `data/` es lazy.
2. **¿Su unidad de crecimiento es el CLUB, o algo que crece más rápido que el club?** Un archivo que
   crece por (club, ejercicio) — como `club-leagues.js` — crece ~5x más rápido que uno que crece por
   club a secas, con el promedio de ejercicios/club de hoy. Uno que crece por (club, país, división)
   crece más rápido todavía. Mirá la unidad real, no solo "cuántos clubes hay".
3. **¿Es un archivo único con "una sección por club", mantenido a mano?** Es el patrón que ya rompió
   una vez (`fuentes/README.md` antes de la Versión 137) y el que hay que buscar en cualquier lado
   nuevo: si hace falta scrollear o repasar entero para actualizar UN club, no escala aunque hoy
   pese poco. El síntoma no es el tamaño en KB, es el proceso de mantenerlo.

Y una anti-pregunta, para no gastar tiempo donde no hace falta: **¿esto vive en disco pero se sirve
de a uno por visita/sesión?** (`data/<club>-data.js`, `Clubes/<País>/<Club>/`, el detalle de
`fuentes/<País>/<Club>.md`). Si la respuesta es sí, el peso TOTAL en disco no es un cuello aunque sea
grande — un directorio de 1000 carpetas no es más lento de abrir que uno de 41, y el sitio nunca baja
más de un archivo de club por visita.

---

## 2. El mapa de puntos calientes (actualizado 2026-09-17, ver `auditorias/2026-09-17-escala.md`)

Formato de cada fila: **qué**, **a qué volumen se rompe** (con el número, no "no escala"), **estado**.

### A. Documentos que se leen/cargan ENTEROS

| Qué | Hoy | Se rompe en | Estado |
|---|---|---|---|
| `fuentes/README.md` (índice de sourcing) | Resuelto (Versión 158 de `main`, 2026-09-20): ahora es un índice de PAÍSES (132 líneas, 10 KB), y el detalle línea-por-club vive en `fuentes/_indice/<País>.md` (44 archivos) | — | **Resuelto**, mismo patrón recomendado acá (partir en `fuentes/_indice/<País>.md` + índice de países), ejecutado en paralelo por otra sesión el mismo día que este mapa se escribió (ver la posdata de la Versión 159 en `Admin/finance-of-sports-project.md` para la anécdota de la colisión de números de versión) |
| `fuentes.html` | 14,5 KB (índice) + 41 páginas de ~6,5 KB | ya no crece por documento: el índice crece por CLUB (una fila) y cada página por los documentos de SU club | **RESUELTO (Versión 162).** Se partió por CLUB y no por país: `fuentes/<clubId>.html` una por club, `fuentes.html` como índice de links, más `sitemap.xml`. Se eligió por club en vez de por país porque es la unidad que el visitante busca y la que puede rankear sola en un buscador |
| `Admin/ESTADO.md`, bloque CLUB-INDEX generado | 4,07 KB / 41 clubes (99 B/club) | ~600 clubes cruza el umbral de 60 KB que `tools/audit.js` ya usa para TODO `Admin/ESTADO.md` (que además tiene contenido fijo que sí hay que leer siempre) | **Nuevo.** Mover el bloque generado a un archivo separado (referenciado con puntero), mismo mecanismo que liberó a `index.html` de su comentario en la Versión 138 |
| `index.html` | 128 KB | Umbral propio 150 KB, sin crecimiento por club desde la Versión 138 | Resuelto, monitoreado por `tools/audit.js` |
| `CLAUDE.md`, `Admin/TODO.md` | 25-27 KB | No crecen por club (prosa de proceso) | Sano |
| `Admin/CHANGELOG.md` / `Admin/finance-of-sports-project.md` | 167 KB / 482 KB | Umbrales generosos a propósito (consulta puntual, no lectura entera); el sourcing por lote (país entero en una entrada) amortigua el crecimiento por club | Sano MIENTRAS se mantenga el patrón de "una entrada por lote", no por club individual — vigilar si cambia |

### B. Payload eager del navegador (`index.html` carga 8 archivos de `data/` ANTES de elegir club)

| Archivo | Hoy | Unidad | Proyección |
|---|---|---|---|
| `data/clubs.js` | 405 B/club | club | ~395 KB a 1000 clubes |
| `data/club-index.js` | 173 B/club | club | ~168 KB a 1000 clubes |
| `data/club-leagues.js` | **ya no crece: es tamaño fijo** (Versión 164) | ninguno | las filas se fueron a `data/club-leagues/<iso2>.js`, que se cargan al abrir el selector y no en la primera visita |
| `data/currency-map.js` | 18 KB hoy | combinación moneda×fecha, compartida entre clubes | sub-lineal, no es cuello proporcional |
| `data/leagues.js`, `category-map.js`, `site-labels.js`, `sources-view.js` | fijos | catálogo/taxonomía | no crecen con clubes |

TRES NÚMEROS DISTINTOS, y una sesión se confundió entre ellos el 2026-09-20: los **~38 KB** de acá
arriba son la suma de los TRES archivos que escalan, que es lo que dice esta línea y está bien. El
payload eager COMPLETO son 8 archivos, **79,7 KB sin comprimir**. Y como viaja de verdad son **29,3
KB**, porque Netlify sirve comprimido. Al citar uno, decí cuál.

**REGLA QUE SALIÓ DE EQUIVOCARSE (2026-09-20): proyectá sobre el COMPRIMIDO, no sobre bytes crudos.**
Todos estos archivos son filas casi idénticas, que es exactamente lo que gzip aplasta. Dos
propuestas de "ahorro" de esa sesión se cayeron al medirlas comprimidas: acortar los `reportType`
de `club-index.js` a códigos de una letra ahorra **60 bytes** (4%), no los 91 KB que sugería el
cálculo crudo, y sacar `reportingCurrency`/`fiscalYearStart` de `clubs.js` ahorra **3,0 KB a 1000
clubes**, no 49. El comentario de `tools/generate-club-index.js` que ya decía esto ("son 7 strings
que se repiten miles de veces, o sea justo lo que gzip aplasta a casi nada") tenía razón, y la
sesión lo iba a revertir sin haberlo leído.

**Estado: `club-leagues.js` RESUELTO (Versión 164). Los otros dos están POSPUESTOS, no pendientes**
(decisión de Guido del 2026-09-20, sobre las mediciones de arriba: 3,0 KB comprimidos a 1000 clubes
contra un refactor que toca el selector para TODOS los visitantes). Lo que haría falta para
reabrirlo: que el payload eager comprimido pase a ser un problema observable —hoy son 29,3 KB los 8
archivos juntos—, o que aparezca un campo eager que NO comprima bien, o sea que varíe de verdad club
por club.

**Y SI SE REABRE, LA PREMISA OBVIA ES FALSA EN SU MITAD** (medido el 2026-09-20; esto es lo único
que había que rescatar del plan de remediación antes de archivarlo, y se pierde fácil porque suena
razonable). `reportingCurrency` y `fiscalYearStart` NO son los dos "campos que solo hacen falta con
el club ya cargado": **`js/selector.js` lee `fiscalYearStart` ANTES de bajar ningún archivo de
club**, para decidir si un ejercicio se etiqueta "2024" o "2023/2024" en el paso en que el visitante
elige el año. Moverlo al `data/<club>-data.js` obligaría al selector a bajar los 41 archivos para
escribir una etiqueta — justo lo que el selector existe para evitar. Si alguna vez se retoma, el
destino correcto de ese campo es `club-index.js` (que es generado), no el archivo del club.

El plan de ejecución que tenía estos puntos (`PLAN-REMEDIACION-ESCALA.md`) se archivó en la Versión
196, con sus 8 puntos cerrados: está en `Admin/Archive/` si hace falta el detalle histórico.

LO QUE SE APRENDIÓ RESOLVIENDO `club-leagues.js`, y que conviene aplicar a los otros dos:
  1. **La proyección estaba inflada 5x por los comentarios.** El archivo era 65% comentarios: las
     filas de datos son 28 B/ejercicio, no 164. A 5000 ejercicios son ~137 KB de datos, no ~800 KB.
     Antes de dimensionar un cuello por regla de tres, medí cuánto de ese archivo son datos.
  2. **El eje que importaba no era "cómo partirlo" sino "cuándo se carga".** Partir por país no
     compraba lazy-load, porque el selector necesita la tabla entera para dibujarse
     (`ligasConClubes()` recorre todas las ligas). Lo que sirvió fue sacarlo del camino eager
     entero, detrás de UNA frontera async en `abrirModal()`.
  3. **El ahorro de HOY es 1,2 KB, no 13,6.** El archivo de helpers se quedó con la prosa que
     explica las reglas. Lo que cambió no es el tamaño de hoy: es que ese archivo pasó a ser de
     tamaño FIJO en vez de crecer por ejercicio.

### C. Runtime del navegador, sin límite

- **Buscador del selector (`js/selector.js:1982`, `renderBusqueda`)**: sin debounce, filtra
  `Object.keys(CLUB_INDEX)` completo en cada tecla, sin límite de resultados mostrados. A 41 clubes
  invisible; a 1000-3000, cada tecla puede reconstruir cientos de nodos DOM con listener propio.
  **Vigente, nuevo** (el selector jerárquico no existía en la auditoría de escala anterior).
  Recomendación: debounce ~150-200ms + top-N con "mostrar más".
- **Grid de clubes de un país en el constructor de mezcla (línea ~899)**: mismo patrón, sin
  buscador de por medio — todo el país se renderiza de una.

### D. Scripts de `tools/` — confirmado que escalan bien (no gastar tiempo acá)

- `tools/audit.js`: 0,28 s con 41 clubes → ~5-7 s proyectado a 1000. Un solo pase in-memory con el
  motor real (`vm`), sin operación cuadrática.
- `tools/generate-club-index.js`, `tools/generate-fuentes-page.js`: mismo patrón, un pase sobre los
  archivos de club. Sano.
- **`auditAll()` (en el navegador, NO en `tools/`)**: **RESUELTO en la Versión 160**, después de
  estar vigente dos auditorías seguidas. Cargaba los clubes en serie (`for` con `await` adentro):
  114 ms con 41 clubes, ~30 s proyectado a 1000 con latencia real de red, y es el chequeo
  obligatorio antes de cada push de datos. Ahora carga en tandas de 25 con `Promise.allSettled`
  (78 ms → 38 ms en frío con los 41 de hoy, sobre localhost). El tamaño de tanda es un TECHO, no un
  objetivo: el navegador ya limita a ~6 conexiones simultáneas por origen, así que 25 no compra más
  paralelismo de red que 6, sirve para no inyectar miles de `<script>` de una sola vez.
  LO QUE HAY QUE CUIDAR SI ESTO SE TOCA DE NUEVO: cargar en paralelo no entremezcla los mensajes de
  consola de dos clubes por dos razones, y las dos hay que preservarlas. Una, ningún
  `data/<club>-data.js` loguea nada al ejecutarse (el único `console.` de `data/` está en
  `currency-map.js`, que no es de club). Dos, `verifyTieOuts()`/`checkFxSanity()` corren DESPUÉS de
  que terminó toda la carga, no intercaladas.

### E. Namespacing / IDs

- **`clubId` sin país**: resuelto como MECANISMO, no como migración completa. `checkClubIds()` en
  `tools/audit.js` detecta el momento exacto en que un id heredado deja de ser inequívoco (P2) y
  marca cualquier club nuevo sin país (P2). No requiere más trabajo salvo mantenerlo — es el modelo a
  copiar para el resto de esta lista: un chequeo automático que avisa en el momento en que migrar
  deja de ser prematuro, en vez de migrar todo por las dudas.
  **ADELANTADO AL SOURCING EN LA VERSIÓN 163**: `checkColisionSourcing()` lee los 44
  `fuentes/_indice/<País>.md` y avisa (P3) cuando un club que alguien está SOURCEANDO coincide con
  un id pelado ya cargado, o sea antes de transcribir nada. Hoy da 0 y calla.
  LO QUE SE MIDIÓ Y CONVIENE NO REDESCUBRIR: sobre los 530 clubes trackeados, la comparación EXACTA
  de nombres da 3 pares entre países (Everton, Nacional, Olimpia); por primera palabra da 119 clubes
  en 23 grupos, casi todos "Deportivo", "Atlético", "FC" y "Unión". O sea que el ruido de los
  nombres genéricos NO se arregla con una lista de excepciones, se arregla no haciendo matching
  difuso. Y el conjunto accionable (un trackeado que amenaza un id pelado) es 0, no 3: los 3 pares
  son entre clubes que no está cargado ninguno.
  GOTCHA DE PARSEO: el regex de línea de club matchea también `- [Notas generales de X](../X/
  _notas-generales.md)`, una por país. Sin excluirlas el conteo da 569 en vez de 530 y aparece un
  choque fantasma de "Notas" en 39 países. Se excluyen por el destino del link (empieza con `_`).
- **Carpetas `Clubes/<País>/<Club>/`**: namespaced por país, sin colisión hoy (verificado sobre las
  336 carpetas en disco: 0 duplicados normalizados dentro de un país, y 0 nombres repetidos ni
  siquiera entre países, porque las carpetas usan el nombre largo, "Racing Club" contra "Racing
  Santander"). **Parcialmente cubierto desde la Versión 161** por `checkCarpetasClubes()` en
  `tools/audit.js`.
  LO QUE HAY QUE ENTENDER ANTES DE PEDIR MÁS COBERTURA ACÁ, porque este mapa lo planteaba mal: la
  colisión exacta NO es detectable por construcción. Un filesystem no admite dos carpetas con el
  mismo nombre en el mismo directorio, así que el segundo club cae ADENTRO de la carpeta del primero
  y no queda estado que distinga eso de un club con muchos documentos. O sea que esto NO es el
  equivalente de `checkClubIds()` para carpetas: ese sí avisa antes del daño, porque dos ids
  conviven en un objeto JS. Lo que el chequeo nuevo sí detecta es la casi-colisión, que es el error
  más probable de los dos: dos carpetas del mismo país que normalizan igual ("Atlético Goianiense" y
  "Atletico Goianiense"), o sea un club transcripto dos veces con sus documentos partidos al medio.
  De yapa detecta una carpeta de club colgando directo de `Clubes/` sin país en el medio, que
  `CLAUDE.md` prohíbe y que no vigilaba nadie.
  ALCANCE: escanea el disco entero y no solo `clubs{}`, porque la duplicación nace al sourcear, no
  al cargar el club al sitio (336 carpetas contra 41). Contra: de esas 336, solo 129 tienen algún
  archivo trackeado en git, así que en un clone limpio revisa menos. Degrada bien, nunca da un
  hallazgo falso, y si `Clubes/` no existe se sale callado.

### F. Documentación "una sección por club" en archivo único, más allá de `fuentes/README.md`

- **`data/club-leagues.js`**: **RESUELTO (Versión 164)**. Se partió en `data/club-leagues/<iso2>.js`,
  uno por país, cada uno autoregistrándose con `Object.assign` en la misma tabla (el patrón de
  `sources{}`/`gestionesByClub{}` de la Versión 101). El repaso anual de ascensos y descensos pasa a
  ser el de UN país. El archivo original quedó con las reglas y los 6 helpers, sin un dato.
  SE ELIGIÓ POR PAÍS Y NO POR LIGA, y se verificó el invariante que lo permite: sobre los 41 clubes,
  CERO juegan una liga de otro país, así que la carpeta de un país tiene todo lo que hace falta para
  contestar tanto "las ligas de este club" como "los clubes de esta liga".
- `Admin/dudas-por-club.md` (537 líneas): mismo patrón, hoy chico, sin cruzar ningún umbral. Vigilar.
- Cabeceras de `data/<club>-data.js`: NO es un caso de este problema — ya es 1 archivo por club.

### G. Proceso, no código

- **Backlog de transcripción (`Clubes/`)**: 1234 archivos `.md` en 18 países, para 41 clubes
  efectivamente cargados — Bélgica sola tiene 315. No es un cuello de arquitectura (un directorio
  por club no colisiona ni pesa como problema), es un aviso de ritmo: la fase de
  sourcing+transcripción ya corre ~8x más rápido que la carga real al sitio. El cuello real para
  llegar a 1000-3000 clubes no va a ser ningún archivo de este repo — va a ser el trabajo de sesión
  de mapear y verificar cada balance uno por uno (ver `club-data-mapping`).

### H. Techo del modelo (no es un cuello de volumen, es de alcance)

La taxonomía (`player_sales`, `wages_squad`, `youth_football`) y las pestañas Mercado de
Pases/Resultados/Títulos asumen fútbol; `gestionesByClub` asume un club de socios con presidente
electo. Un club de otro deporte entra hoy con media taxonomía vacía. No se rompe con el VOLUMEN de
clubes, se rompe con la VARIEDAD — mencionado acá porque es la otra dimensión de "escala" que este
mapa no cubre (cantidad, no diversidad), y conviene no confundir las dos.

### I. El negocio no-futbolístico DENTRO de un club de fútbol (Versión 189/190, to-do 20(b))

Emparentado con H pero distinto: no es un club de OTRO deporte, es un club de fútbol con un colegio,
un polideportivo o una tienda — el modelo de club social argentino. Hoy se resuelve sumando una fila
más a Formato simplificado por cada negocio nuevo que aparece (`education`, Versión 189), la misma
lista para los 41 clubes. Eso escala mal por VARIEDAD de rubros, no por cantidad de clubes: cada fila
nueva aparece en $0 para todos los que no la tienen. **Decisión de Guido (2026-09-22): no decidir
ahora, mirarlo evolucionar a medida que se cargan más clubes y deportes.** Medido en el relevamiento
de la Versión 189 (`auditorias/2026-09-22-catchall-no-futbol.md`): 4 de 41 clubes muestran el patrón
hoy (Vélez, Instituto, Unión, Estudiantes). Si esto crece bastante más — la sesión de la 189 tiró
~30 como orden de magnitud para volver a mirarlo, sin que sea un número decidido — es el momento de
evaluar un eje separado ("Otros negocios del club", con filas propias por club en vez de una lista
fija para los 41) en vez de seguir sumando filas a Formato simplificado.

---

## 3. Cómo correr este chequeo de nuevo

1. `node tools/audit.js` primero, siempre — leé el grupo `escala` (P3 `proyeccion`, P3
   `archivo-pesado`) antes de razonar nada a mano, es determinista y gratis.
2. Repasá la sección 2 de esta skill fila por fila: ¿algo que decía "vigente" se resolvió? ¿algo
   "sano" se acercó a su umbral? Los números concretos (bytes/club, líneas, KB) están ahí para
   volver a calcularlos con `wc -c`/`wc -l`, no para creerlos de memoria — actualizá los que hayan
   cambiado.
3. Aplicá el criterio de la sección 1 a cualquier archivo/estructura NUEVO desde la última corrida
   (una skill nueva, un `data/*.js` nuevo, una vista nueva del selector): ¿se lee/carga entero?
   ¿su unidad crece más rápido que "por club"? ¿es una sección por club en un archivo único?
4. Si el eje de una auditoría de rutina (`auditoria-finance-of-sports`) es `escala`, el reporte sigue
   el formato de esa skill; el contenido de la sección "Eje de juicio: escala" es esta sección 2,
   actualizada.
5. Guardá el reporte en `auditorias/<fecha>-escala.md` (con el sufijo `-escala`, porque puede
   coincidir con otra auditoría del mismo día) y actualizá esta skill con lo que cambió — ver abajo.

---

## Cómo mantener este skill

- **Cuando un hallazgo de esta lista se resuelve**, no se borra la fila: se marca "Resuelto (Versión
  X)" con una línea, igual que hacen `Admin/ESTADO.md`/`Admin/TODO.md` con los suyos. Si se acumulan muchas filas
  resueltas y el archivo deja de leerse en dos minutos, ESE es el momento de recortar las más viejas
  a una sola línea en la sección de diff del reporte correspondiente y sacarlas de acá.
- **Cuando aparece un cuello nuevo**, agregalo a la categoría que corresponda (A-H) con los tres
  datos mínimos: qué es, a qué volumen se rompe (el número), y la recomendación. Si no encaja en
  ninguna categoría existente, es señal de que el criterio de la sección 1 tiene un hueco — ampliá
  ese criterio, no solo la lista.
- **Cuando un hallazgo de acá se vuelve chequeable en código**, movelo a `checkEscala()` en
  `tools/audit.js` y sacalo de esta lista (o dejalo con una línea "automatizado, ver audit.js"). Un
  cuello que un script detecta solo no necesita vivir en juicio humano.
- Esta skill asume que `auditoria-finance-of-sports` existe y sigue siendo el procedimiento
  compartido de los cinco ejes. Si ese procedimiento cambia (formato de reporte, severidades), esta
  skill no necesita cambiar salvo que el eje `escala` en particular deje de encajar en él.

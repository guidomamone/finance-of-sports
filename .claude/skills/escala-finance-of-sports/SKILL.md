---
name: escala-finance-of-sports
description: Mapa de puntos calientes de escala de finance-of-sports. Qué archivo, estructura de datos o proceso funciona hoy y se rompe cuando el proyecto crezca a cientos o miles de clubes cargados (~5 ejercicios cada uno), a qué volumen aparece cada uno y cómo particionarlo o indexarlo. Es UN eje entre los cinco de `auditoria-finance-of-sports` (`escala`), separado en su propia skill porque el mapa es grande y cambia con cada sesión de sourcing y onboarding. Usar cuando Guido pida explícitamente un chequeo de escala o capacidad, antes de un cambio grande de arquitectura, o como el contenido del eje `escala` al correr `auditoria-finance-of-sports`.
---

# Escala de finance-of-sports: qué se rompe al crecer

## 0. Qué es esta skill y qué NO reemplaza

`auditoria-finance-of-sports` es el PROCEDIMIENTO (3 capas, severidades, formato de reporte) para
cualquiera de sus cinco ejes (`datos`, `escala`, `codigo`, `docs`, `tokens`). El mapa de escala vive
acá y no adentro de esa skill porque es grande y cambia con cada sesión de sourcing y onboarding, y
porque este eje se invoca solo, fuera de la cadencia de la auditoría de rutina, cuando viene un
cambio grande. Mismo criterio que separa `club-sourcing`, `club-data-mapping` y
`club-or-year-onboarding`: temas relacionados, invocación independiente.

**No reemplaza el procedimiento de `auditoria-finance-of-sports`.** Cuando el eje de una auditoría de
rutina es `escala`, el reporte se escribe con el formato de esa skill (`auditorias/<fecha>-escala.md`,
severidades P0 a P3, diff contra el anterior); esta skill es el contenido de ese eje.

**Tampoco reemplaza `checkEscala()` de `tools/audit.js`.** Ese chequeo automático (clubId hardcodeado
en código, proyección de `data/*.js`, umbrales de archivos pesados) es determinista y barato: corré
`node tools/audit.js` primero, siempre. Esta skill es el juicio que el script no puede automatizar:
qué archivo o proceso, aunque hoy no dispare ningún umbral, se va a romper antes de llegar a 1000
clubes, y por qué.

---

## 1. El criterio general, antes del mapa puntual

Tres preguntas para encontrar un cuello de escala que el mapa de abajo todavía no liste (el proyecto
cambia; este criterio es lo que no cambia):

1. **¿Este archivo o estructura se LEE, CARGA o ITERA ENTERO, o solo la porción que hace falta?**
   `index.html`, `Admin/ESTADO.md` y `Admin/TODO.md` se leen enteros: su tamaño importa.
   `Admin/CHANGELOG.md` se consulta con grep: su tamaño casi no importa. Un `data/<club>-data.js` se
   carga bajo demanda, uno por visita: no importa cuántos existan, importa cuánto pesa CADA UNO. La
   misma pregunta aplica en el navegador: los archivos de `data/` que `index.html` incluye con
   `<script src>` se bajan SIEMPRE, antes de elegir club; el resto es lazy.
2. **¿Su unidad de crecimiento es el CLUB, o algo que crece más rápido que el club?** Un archivo que
   crece por (club, ejercicio) crece varias veces más rápido que uno que crece por club a secas, con
   el promedio de ejercicios por club. Uno que crece por (club, país, división) crece más rápido
   todavía. Mirá la unidad real, no solo "cuántos clubes hay".
3. **¿Es un archivo único con "una sección por club", mantenido a mano?** Es el patrón que hay que
   buscar en cualquier lado nuevo: si hace falta scrollear o repasar entero para actualizar UN club,
   no escala aunque hoy pese poco. El síntoma no es el tamaño en KB, es el proceso de mantenerlo.
   Ejemplo: el índice de sourcing es un índice de países (`fuentes/README.md`) con el detalle de cada
   club en `fuentes/_indice/<País>.md`, justamente por esto.

Y una anti-pregunta, para no gastar tiempo donde no hace falta: **¿esto vive en disco pero se sirve
de a uno por visita o por sesión?** (`data/<club>-data.js`, `Clubes/<País>/<Club>/`, el detalle de
`fuentes/<País>/<Club>.md`). Si la respuesta es sí, el peso TOTAL en disco no es un cuello aunque sea
grande: un directorio de mil carpetas no es más lento de abrir que uno de cuarenta, y el sitio nunca
baja más de un archivo de club por visita.

---

## 2. El mapa de puntos calientes

Cada fila dice **qué es**, **cómo se mide** (el comando, para no creerle a un número viejo) y **qué
hacer o cuándo se rompe**. Los números no viven en esta skill: se miden cada vez.

Medidas de base que se reusan abajo:

```bash
ls data/*-data.js | wc -l                      # clubes cargados
node tools/audit.js                            # grupo `escala`: proyeccion y archivo-pesado
```

### A. Documentos que se leen o cargan ENTEROS

| Qué | Cómo se mide | Estado y regla |
|---|---|---|
| `fuentes/README.md` (índice de sourcing) | `wc -c fuentes/README.md`; `ls fuentes/_indice \| wc -l` | Es un índice de PAÍSES. El detalle línea por club vive en `fuentes/_indice/<País>.md`. Es el patrón a copiar para cualquier documento "una sección por club": partir por país y dejar un índice |
| `fuentes.html` y `fuentes/<clubId>.html` | `wc -c fuentes.html`; `ls fuentes/*.html \| wc -l` | `fuentes.html` es un índice de links (una fila por club) y cada página de club crece solo con los documentos de SU club; `sitemap.xml` las lista. Se partió por CLUB y no por país porque es la unidad que el visitante busca y la que puede rankear sola en un buscador |
| `Admin/ESTADO.md` y `Admin/ESTADO-clubes.md` | `wc -c Admin/ESTADO.md Admin/ESTADO-clubes.md` | El bloque `CLUB-INDEX`, que crece por club, es generado y vive en su propio archivo; `Admin/ESTADO.md` es el snapshot en prosa y no crece por club. El umbral de `checkEscala()` aplica a cada uno por separado. Mismo mecanismo que sacó el comentario interno de `index.html`: bloque generado a archivo propio, puntero de una línea donde vivía |
| `index.html` | `wc -c index.html`, contra el umbral de `checkEscala()` | Sin crecimiento por club: crece por FEATURES (selector, i18n, mezcla). No hay número de clubes que lo dispare. Vigilar el umbral, pero anotarlo para el eje `codigo`, no para este mapa |
| `CLAUDE.md`, `Admin/TODO.md` | `wc -c CLAUDE.md Admin/TODO.md` | No crecen por club (prosa de proceso). Sanos |
| `Admin/CHANGELOG.md`, `Admin/finance-of-sports-project.md` | `wc -c Admin/CHANGELOG.md Admin/finance-of-sports-project.md` | Umbrales generosos a propósito (consulta puntual por grep, no lectura entera). Sanos MIENTRAS se mantenga una entrada por lote y no por club individual. Si alguna vez hay que partirlos, no es por tamaño sino porque un grep devuelve decenas de bloques irrelevantes, y eso se arregla primero con un índice. El CHANGELOG ya está partido por época (lo anterior vive en `Admin/Archive/CHANGELOG-v010-v299.md`); no se parte en rangos, una búsqueda tiene que elegir entre dos archivos como mucho |

### B. Payload eager del navegador

`index.html` carga varios archivos de `data/` ANTES de que el visitante elija club. La lista exacta
son los `<script src="data/...">` de `index.html`:

```bash
grep -o 'src="data/[^"?]*' index.html                                        # qué archivos son
cat $(grep -o 'src="data/[^"?]*' index.html | sed 's/src="//') | wc -c       # bytes sin comprimir
cat $(grep -o 'src="data/[^"?]*' index.html | sed 's/src="//') | gzip -9c | wc -c   # comprimido
```

| Archivo | Unidad de crecimiento | Cómo se mide por club | Qué hacer |
|---|---|---|---|
| `data/clubs.js` | club | `wc -c data/clubs.js` dividido los clubes; `gzip -9c data/clubs.js \| wc -c` | Escala por club. Proyectar sobre el comprimido (ver abajo) |
| `data/club-index.js` | club | ídem con `data/club-index.js` | Escala por club. Es generado por `tools/generate-club-index.js` |
| `data/club-leagues.js` | ninguna: es de tamaño fijo | n/a | Reglas y helpers, sin datos. Las filas viven en `data/club-leagues/<iso2>.js` (ver F), que se cargan al abrir el selector y no en la primera visita |
| `data/currency-map.js` | combinación moneda por fecha, compartida entre clubes | `wc -c data/currency-map.js` | Hasta ahora crece sub-linealmente respecto de los clubes. Es el tercer archivo eager en peso: verificar en cada corrida que no pase a crecer proporcional |
| `data/leagues.js` | catálogo de ligas | `wc -c data/leagues.js` | Crece con países y divisiones, no con clubes |
| `data/category-map.js`, `data/site-labels.js`, `data/sources-view.js`, `data/lang/langs.js`, `data/destacados.js`, `data/deflactores.js` | catálogo, taxonomía, idiomas, curaduría editorial (con tope), series de referencia | n/a | No crecen con clubes. Contarlos igual al sumar el total del payload |

TRES NÚMEROS DISTINTOS, y una sesión ya se confundió entre ellos: los bytes por club de `clubs.js` y
`club-index.js` (los dos archivos que escalan por club) no son el payload eager COMPLETO. Al citar un
número, decí cuál de los tres es.

El comprimido total es la métrica de este mapa que más rápido se mueve. Medirlo en CADA corrida de
este eje, sin esperar a llegar a mil clubes. Proyección a mil clubes: (comprimido de `clubs.js` más
comprimido de `club-index.js`) dividido los clubes, por mil, más el resto del payload, que no escala
por club.

**REGLA: proyectá sobre el COMPRIMIDO, no sobre bytes crudos.** Todos estos archivos son filas casi
idénticas, que es exactamente lo que gzip aplasta. Dos propuestas de "ahorro" se cayeron al medirlas
comprimidas: acortar los `reportType` de `club-index.js` a códigos de una letra ahorra del orden de
60 bytes (4%), no los ~90 KB que sugería el cálculo crudo; y sacar `reportingCurrency` y
`fiscalYearStart` de `clubs.js` ahorra del orden de 3 KB a mil clubes, no ~50. El comentario de
`tools/generate-club-index.js` que dice esto ("son 7 strings que se repiten miles de veces, o sea
justo lo que gzip aplasta a casi nada") tiene razón: leerlo antes de proponer recortes de bytes.

**Estado: `club-leagues.js` está resuelto. Optimizar `clubs.js` y `club-index.js` está POSPUESTO, no
pendiente** (decisión de Guido: unos pocos KB comprimidos a mil clubes no justifican un refactor que
toca el selector para TODOS los visitantes). Se reabre si el payload eager comprimido pasa a ser un
problema observable, o si aparece un campo eager que NO comprime bien, o sea que varía de verdad club
por club.

**Y SI SE REABRE, LA PREMISA OBVIA ES FALSA EN SU MITAD.** `reportingCurrency` y `fiscalYearStart` NO
son dos "campos que solo hacen falta con el club ya cargado": `fiscalYearStart` se lee ANTES de bajar
ningún archivo de club, para decidir si un ejercicio se etiqueta "2024" o "2023/2024" (el selector y
`js/liga.js` llaman a `esEjercicioCalendario()` / `ejercicioLabel()` de `js/finanzas-calc.js`, que
leen `clubs[id].fiscalYearStart`). Moverlo al `data/<club>-data.js` obligaría a bajar todos los
archivos de club para escribir una etiqueta, justo lo que el selector existe para evitar. Si se
retoma, el destino correcto de ese campo es `club-index.js` (que es generado), no el archivo del club.

Lo que enseñó resolver `club-leagues.js`, para aplicarlo a los otros dos:

1. **Antes de dimensionar un cuello por regla de tres, medí cuánto del archivo son DATOS.** Ese
   archivo era mayormente comentarios: las filas de datos pesaban una fracción de lo que sugería el
   tamaño total.
2. **El eje que importaba no era "cómo partirlo" sino "cuándo se carga".** Partir por país no compraba
   lazy-load, porque el selector necesita la tabla entera para dibujarse (`ligasConClubes()` recorre
   todas las ligas). Lo que sirvió fue sacarlo del camino eager entero, detrás de UNA frontera async
   en `abrirModal()`.
3. **El ahorro de tamaño de hoy puede ser mínimo y aun así valer la pena.** Lo que cambia es que el
   archivo pasa a ser de tamaño FIJO en vez de crecer por ejercicio.

### C. Runtime del navegador, sin límite

- **Buscador del selector y grid de país del constructor de mezcla**: resuelto. `js/selector.js` tiene
  un solo helper, `grillaConTope(...)`, reusado por el buscador (`renderBusqueda`) y por la grilla de
  país del constructor de mezcla. Tope de resultados (`TOPE_RESULTADOS`) con expansión "Mostrar más"
  bajo demanda, debounce en el listener del input, y el texto normalizado para buscar se cachea una
  sola vez por sesión de modal (`indiceBusqueda()` / `indiceClubPais()`) en vez de recalcularse en
  cada tecla. Los comentarios del código razonan en términos de "a 3000 clubes". Cualquier lista nueva
  que renderice un nodo por club necesita el mismo tope.

### D. Scripts y chequeos: confirmado que escalan bien (no gastar tiempo acá)

- `tools/audit.js`: un solo pase in-memory con el motor real (`vm`), sin operación cuadrática. Se
  mide con `time node tools/audit.js` y debe crecer sub-linealmente respecto de los clubes.
- `tools/generate-club-index.js`, `tools/generate-fuentes-page.js`: mismo patrón, un pase sobre los
  archivos de club. Sanos.
- **`auditAll()` (en el navegador, NO en `tools/`)**: carga los clubes en tandas de 25 con
  `Promise.allSettled`, no de a uno, porque es el chequeo obligatorio antes de cada push de datos y
  una carga en serie con latencia real de red tardaría decenas de segundos a mil clubes. El tamaño
  de tanda es un TECHO, no un objetivo: el navegador limita a ~6 conexiones simultáneas por origen,
  así que 25 no compra más paralelismo de red que 6, sirve para no inyectar miles de `<script>` de una
  sola vez. LO QUE HAY QUE CUIDAR SI SE TOCA: cargar en paralelo no entremezcla los mensajes de
  consola de dos clubes por dos razones, y las dos hay que preservarlas. Una, ningún
  `data/<club>-data.js` loguea nada al ejecutarse. Dos, `verifyTieOuts()` y `checkFxSanity()` corren
  DESPUÉS de que terminó toda la carga, no intercaladas.

### E. Namespacing e IDs

- **`clubId` sin país**: resuelto como MECANISMO, no como migración completa. Los clubes con id
  heredado (sin sufijo de país) se cuentan con
  `ls data/*-data.js | sed 's|data/||;s|-data.js||' | grep -v -- '-[a-z][a-z]$' | wc -l`.
  `checkClubIds()` en `tools/audit.js` detecta el momento exacto en que un id heredado deja de ser
  inequívoco (P2) y marca cualquier club nuevo sin país (P2). No requiere más trabajo salvo
  mantenerlo. Es el modelo a copiar para el resto de esta lista: un chequeo automático que avisa en
  el momento en que migrar deja de ser prematuro, en vez de migrar todo por las dudas.
  `checkColisionSourcing()` lo adelanta al sourcing: lee los `fuentes/_indice/<País>.md` y avisa (P3)
  cuando un club que alguien está SOURCEANDO coincide con un id pelado ya cargado, o sea antes de
  transcribir nada.
  LO QUE SE MIDIÓ Y CONVIENE NO REDESCUBRIR: la comparación EXACTA de nombres entre países da muy
  pocos pares (Everton, Nacional, Olimpia); por primera palabra da grupos enormes, casi todos
  "Deportivo", "Atlético", "FC" y "Unión". O sea que el ruido de los nombres genéricos NO se arregla
  con una lista de excepciones, se arregla no haciendo matching difuso. Y el conjunto accionable (un
  club trackeado que amenaza un id pelado) es mucho más chico que el de pares exactos, porque los
  pares son entre clubes de los que no hay ninguno cargado.
  GOTCHA DE PARSEO: el regex de línea de club matchea también `- [Notas generales de X](../X/
  _notas-generales.md)`, una por país. Sin excluirlas aparece un choque fantasma de "Notas" en casi
  todos los países. Se excluyen por el destino del link (empieza con `_`), no por el texto.
- **Carpetas `Clubes/<País>/<Club>/`**: namespaced por país, y las carpetas usan el nombre largo
  ("Racing Club" contra "Racing Santander"), así que no colisionan ni siquiera entre países.
  Cubierto parcialmente por `checkCarpetasClubes()` en `tools/audit.js`.
  LO QUE HAY QUE ENTENDER ANTES DE PEDIR MÁS COBERTURA: la colisión exacta NO es detectable por
  construcción. Un filesystem no admite dos carpetas con el mismo nombre en el mismo directorio, así
  que el segundo club cae ADENTRO de la carpeta del primero y no queda estado que distinga eso de un
  club con muchos documentos. O sea que esto NO es el equivalente de `checkClubIds()` para carpetas:
  ese sí avisa antes del daño, porque dos ids conviven en un objeto JS. Lo que el chequeo sí detecta
  es la casi-colisión, que es el error más probable: dos carpetas del mismo país que normalizan igual
  ("Atlético Goianiense" y "Atletico Goianiense"), o sea un club transcripto dos veces con sus
  documentos partidos al medio. También detecta una carpeta de club colgando directo de `Clubes/` sin
  país en el medio.
  ALCANCE: escanea el disco entero y no solo `clubs{}`, porque la duplicación nace al sourcear, no al
  cargar el club al sitio. Contra: solo ve las carpetas que tienen algún archivo trackeado en git, así
  que en un clone limpio revisa menos. Degrada bien, nunca da un hallazgo falso, y si `Clubes/` no
  existe se sale callado.

### F. Documentación "una sección por club" en archivo único

- **`data/club-leagues.js`**: partido en `data/club-leagues/<iso2>.js`, uno por país, cada uno
  autoregistrándose con `Object.assign` en la misma tabla (el patrón de `sources{}` y
  `gestionesByClub{}`). El repaso anual de ascensos y descensos es el de UN país. El archivo original
  tiene las reglas y los helpers, sin un dato. Los huecos que aparezcan (ligas en `null` sin
  verificar, ejercicios sin fila) son huecos de DATO (`liga-sin-verificar` y `liga-sin-fila` en
  `tools/audit.js`), no señal de que el split esté forzando.
  SE ELIGIÓ POR PAÍS Y NO POR LIGA, por un invariante que hay que re-verificar si se duda: ningún club
  juega una liga de otro país, así que la carpeta de un país tiene todo lo que hace falta para
  contestar tanto "las ligas de este club" como "los clubes de esta liga".
- `Admin/dudas-por-club.md`: mismo patrón (`wc -l Admin/dudas-por-club.md`). Vigilar.
- Cabeceras de `data/<club>-data.js`: NO es un caso de este problema, ya es 1 archivo por club.

### G. Proceso, no código

- **Backlog de transcripción (`Clubes/`)**: es un aviso de RITMO, no de arquitectura. Se mide
  comparando lo sourceado contra lo cargado:
  `find Clubes -mindepth 2 -maxdepth 2 -type d | wc -l` (carpetas de club),
  `find Clubes -name '*.md' | wc -l` (transcripciones) y `ls data/*-data.js | wc -l` (clubes
  cargados). Si la brecha se agranda, el sourcing le gana a la carga; si se achica, al revés. Un
  directorio por club no colisiona ni pesa como problema. El cuello para llegar a miles de clubes
  cargados es el trabajo de cargar y verificar cada balance (ver `Admin/PIPELINE.md`), no la falta de
  material ya sourceado.

### H. Techo del modelo (no es un cuello de volumen, es de alcance)

La taxonomía (`player_sales`, `wages_squad`, `youth_football`) y las pestañas Mercado de
Pases/Resultados/Títulos asumen fútbol; `gestionesByClub` asume un club de socios con presidente
electo. Un club de otro deporte entra con media taxonomía vacía. No se rompe con el VOLUMEN de
clubes, se rompe con la VARIEDAD. Está acá porque es la otra dimensión de "escala" (diversidad, no
cantidad) y conviene no confundirlas.

### I. El negocio no-futbolístico DENTRO de un club de fútbol

Emparentado con H pero distinto: no es un club de OTRO deporte, es un club de fútbol con un colegio,
un polideportivo o una tienda (el modelo de club social argentino). Se resuelve sumando una fila más
a Formato simplificado por cada negocio nuevo que aparece (por ejemplo `education`), la misma lista
para todos los clubes cargados. Eso escala mal por VARIEDAD de rubros, no por cantidad de clubes:
cada fila nueva aparece en $0 para todos los que no la tienen. **Decisión de Guido: no decidir ahora,
mirarlo evolucionar a medida que se cargan más clubes y deportes.** La proporción de clubes con el
patrón se mide con el método de `auditorias/2026-09-22-catchall-no-futbol.md` y viene siendo de
alrededor de 1 de cada 10, sin acelerarse. Como orden de magnitud (no número decidido), cuando la
cantidad de clubes cargados ronde los 300 es el momento de evaluar un eje separado ("Otros negocios
del club", con filas propias por club en vez de una lista fija) en vez de seguir sumando filas a
Formato simplificado.

---

## 3. Cómo correr este chequeo

1. `node tools/audit.js` primero, siempre: leé el grupo `escala` (P3 `proyeccion`, P3
   `archivo-pesado`) antes de razonar nada a mano, es determinista y gratis.
2. Repasá la sección 2 fila por fila corriendo los comandos de la columna "cómo se mide": ¿algo
   "sano" se acercó a su umbral? ¿algo "pospuesto" cumplió su condición de reapertura? Ningún número
   está escrito en esta skill a propósito: se miden de nuevo.
3. Aplicá el criterio de la sección 1 a cualquier archivo o estructura NUEVO desde la última corrida
   (una skill nueva, un `data/*.js` nuevo, una vista nueva del selector): ¿se lee o carga entero?
   ¿su unidad crece más rápido que "por club"? ¿es una sección por club en un archivo único?
4. Si el eje de una auditoría de rutina (`auditoria-finance-of-sports`) es `escala`, el reporte sigue
   el formato de esa skill; el contenido de su sección "Eje de juicio: escala" es esta sección 2.
5. Guardá el reporte en `auditorias/<fecha>-escala.md` (con el sufijo `-escala`, porque puede
   coincidir con otra auditoría del mismo día) y actualizá esta skill con lo que cambió en las reglas
   (no con los números ni con la historia: eso va al reporte y a `Admin/CHANGELOG.md`).

---

## Cómo mantener esta skill

- **Esta skill dice cómo se hace hoy, no cómo se llegó.** Un hallazgo resuelto no queda como fila con
  su fecha o su versión: se borra, o queda como la regla vigente en una línea (por ejemplo "el
  buscador tiene tope de resultados") si evita que alguien reintroduzca el problema. Los números se
  miden con el comando de la fila, no se escriben.
- **Cuando aparece un cuello nuevo**, agregalo a la categoría que corresponda (A a I) con tres datos
  mínimos: qué es, cómo se mide (el comando) y a qué volumen se rompe o qué hacer. Si no encaja en
  ninguna categoría, es señal de que el criterio de la sección 1 tiene un hueco: ampliá el criterio,
  no solo la lista.
- **Cuando un hallazgo de acá se vuelve chequeable en código**, movelo a `checkEscala()` en
  `tools/audit.js` y sacalo de esta lista (o dejalo con una línea "automatizado, ver audit.js"). Un
  cuello que un script detecta solo no necesita vivir en juicio humano.
- Esta skill asume que `auditoria-finance-of-sports` existe y es el procedimiento compartido de los
  cinco ejes. Si ese procedimiento cambia (formato de reporte, severidades), esta skill no necesita
  cambiar salvo que el eje `escala` deje de encajar en él.

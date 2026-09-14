# ESTADO — finance-of-sports

**Qué hay armado hoy.** Este archivo es el snapshot del proyecto: qué existe, cómo
está organizado, y qué hay cargado de cada club. No es un log: si algo que dice acá
deja de ser cierto, se reemplaza, no se apila una línea nueva al lado de la vieja.

**Lo que NO está acá:**

- **Qué falta hacer** -> `TODO.md`.
- **Qué cambió y cuándo** -> `CHANGELOG.md`.
- **Por qué se decidió algo** -> `finance-of-sports-project.md`.
- **Reglas vigentes y trampas ya encontradas** -> `CONVENCIONES.md`. Leelo siempre.
- **Cómo funciona cada archivo del motor** -> `ARQUITECTURA.md`.

**Por qué es un archivo y ya no el comentario de `index.html`** (sesión 2026-09-14,
Versión 138, pedido explícito de Guido: *"Index NO es el archivo para tener to do.
Eso era al inicio"*): hasta acá el estado y la to-do list vivían adentro de un
comentario HTML al principio de `index.html`, que llegó a pesar 80 KB de los 183 KB
del archivo. Eso tenía dos costos. Uno para el visitante, que se bajaba los 80 KB en
cada pageview sin verlos nunca. Y otro peor para el proyecto: un `index.html` de
6.000 líneas donde las primeras 830 no son el sitio hace que cualquier búsqueda de
código tenga que saltearlas, y hacía que la to-do list y el HTML se editaran en el
mismo archivo, con conflictos entre sesiones que no tenían nada que ver entre sí.

---

## Objetivo del proyecto

Arrancó como un sitio solo para hinchas de Boca antes de una elección de
presidente. Ahora es más ambicioso: un sitio de finanzas de clubes de fútbol
en general (multi-club), pensado para periodistas y creadores de contenido.
**Todo el sitio es gratis, y por ahora se queda así** (decisión de Guido,
2026-09-14: no hay corte free/paid que definir ni paywall que construir; los
dos puntos que había en la to-do se sacaron). La idea de un plan pago
(analítica avanzada + tweets pre-armados, suscripciones vía dLocal Go) queda
como posibilidad, no como trabajo pendiente. Presupuesto casi cero,
sigue siendo un proyecto hobby de Guido, no gastar en infraestructura que
no haga falta todavía. Nombre del sitio: "El deporte en Números" en castellano y
"Finance of Sports" en inglés (clave `site.name`, ver data/lang/en.js). Historia
del nombre: "Boca en Números" -> "Tu club en números" (Versión 12) -> "El deporte
en Números" (Versión 117, pedido de Guido). Cada rename fue solo de branding: el
<title>, el logo del header y el asunto del mail de contacto. DESDE 2026-09-13 el
dominio es **financeofsports.com** y la carpeta/repo se llama
`finance-of-sports`.

---

## Estado actual

Esto es el ESTADO, no el historial. Si buscás "¿cuándo se hizo tal cosa?" o "¿por
qué se decidió tal cosa?", NO está acá: está en `CHANGELOG.md` (resumen por
versión, 96 versiones) y en `finance-of-sports-project.md` (narrativa completa). Este bloque
se reescribe, no se acumula.

- SITIO: estático puro (HTML + CSS + JS, Chart.js por CDN), sin backend, sin
  build step, servido desde la raíz. Deploy continuo en Netlify al pushear a
  `main` del repo de GitHub. Dominio propio desde 2026-09-13:
  **financeofsports.com** (ver to-do 7: falta renombrar el repo en GitHub y
  re-linkearlo en Netlify, eso lo tiene que hacer Guido).
- YA NO HAY EJERCICIOS PLACEHOLDER (Versión 138, pedido de Guido: "quita los
  ejercicios que sean placeholder, antes tenían sentido, hoy no"). Se borraron los 9
  que quedaban, todos de Boca (7) y River (2): cinco eran placeholder puro con rubros
  inventados, de cuando el sitio era un MVP y necesitaba algo que dibujar, y cuatro
  eran ejercicios reales sin publicar todavía, cargados en cero. Los dos de River
  existían solo para que "Comparar Gestiones" tuviera dos períodos que comparar. TODO
  ejercicio que muestra el sitio tiene ahora un documento detrás. Consecuencia: 85
  ejercicios en vez de 94, Boca pasó de calidad "mixta" a "oficial" en el selector, y
  los gráficos de Inicio dejaron de tener columnas vacías. `reportType:'placeholder'`
  y `'pending_official'` siguen existiendo en el código, con su rama en
  `yearKindForClub()`/`anioDropdownSuffix()`: son estados válidos, simplemente hoy no
  los usa ningún club.
- DATOS: 41 clubes cargados con al menos un ejercicio REAL (balance o presupuesto
  oficial), de 6 países: Argentina 11, Japón 10, España 10, Brasil 7, Colombia 2,
  México 1. Un solo motor genérico calcula Finanzas para todos (ver
  `ARQUITECTURA.md`); no queda ningún club con motor propio desde la Versión 102.
  El detalle club por club (qué ejercicio, qué fuente, qué es real y qué no) está
  más abajo en "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB", y con más detalle
  todavía en el comentario de cabecera de cada `data/<club>-data.js`.
- PRESUPUESTOS, POR CLUB (Versión 135): los 3 cards que solo aparecen para un
  ejercicio con presupuesto (Supuestos, Presupuesto Financiero, Presupuesto de
  Inversiones) sacan sus datos de `presupuestoSupuestosByYear` /
  `presupuestoFinancieroByYear` / `presupuestoInversionesByYear`, adentro del
  `data/<club>-data.js` de cada club. Antes vivían en 3 registros por club dentro
  de `js/finanzas-render.js`, y el contenido de Boca era HTML escrito a mano en
  ESTE archivo. Onboardear un presupuesto ya no toca ni el motor ni el HTML.
- CONVENCIÓN DE ARCHIVOS: un club = un `data/<clubId>-data.js`, cargado bajo
  demanda por `loadClubData(clubId)` armando el path por convención. Onboardear un
  club NO requiere tocar `index.html`: alcanza con el `data/*.js` nuevo y su
  entrada en `data/clubs.js`, más correr `node tools/generate-club-index.js`.
  DESDE LA VERSIÓN 129, el `clubId` de un club NUEVO lleva el país al final
  (`nacional-uy`), porque el id nombra el archivo y prefija cada `sourceId`. Los
  41 de antes quedan como están hasta que alguno se vuelva ambiguo, y
  `tools/audit.js` avisa justo ese día. Ver `CONVENCIONES.md`.
- TAXONOMÍA DEL SELECTOR (Versión 137): `data/leagues.js` es el CATÁLOGO
  (6 deportes, 6 regiones, 6 países, 8 ligas con su escalón). NO tiene membresía
  a propósito, y esa es la regla de arquitectura más importante que salió de esta
  versión: NO EXISTE NINGUNA ARISTA CLUB -> LIGA SIN AÑO. La membresía vive solo
  en `data/club-leagues.js`, y sus 6 helpers nuevos son el único camino para
  preguntarla: `clubsOfLeagueYear()` para TODO agregado de liga, `leaguesOfClub()`
  para el árbol, más los de navegación. Un campo `clubs[id].league` con "la liga de
  hoy" habría sido una segunda verdad sobre el mismo hecho, y encima inútil para
  "cuánto generaba esta liga en 2022", que necesita saber quiénes la integraban ESE
  año (lo levantó Guido). En el árbol, un club aparece bajo CADA liga en la que
  tiene un ejercicio cargado: nada que actualizar por temporada, ningún campo que
  pueda mentir. `clubs{}` gana `sport`, que sí es intrínseco del club.
- LIGA POR EJERCICIO (Versión 132): `data/club-leagues.js` dice en qué categoría
  jugó cada club en cada ejercicio, que es distinto de en cuál juega hoy
  (Mirassol 2024 es Série B y Mirassol 2025 Série A). Es un archivo aparte y no
  un campo adentro de cada club, decisión de Guido: junto se actualiza una vez
  por temporada mirando ascensos y descensos, repartido hay que acordarse de 41
  lugares. `null` significa "nadie lo verificó todavía", así que el archivo no
  puede afirmar una liga que nadie chequeó, y `node tools/audit.js` cuenta las
  que faltan. HOY: 82 de 85 verificadas, con la fuente anotada por bloque; las 3
  que faltan son presupuestos (Boca 2027, Racing 2026 y 2027). CRITERIO cuando un
  ejercicio cruza dos torneos (decidido por Guido): vale la categoría al cierre,
  la misma regla que ya se usa para atribuir la gestión presidencial. Los ids del
  primer y segundo escalón argentino son `ar-primera` y `ar-primeranacional`, y
  NO el `ar-lpf` del prompt del selector: esa categoría cambió de organizador
  tres veces en el período cargado, y el id nombra el escalón, que no cambia.
- ÍNDICE LIVIANO DE CLUBES (Versión 129, ampliado en la 146): `data/club-index.js`,
  GENERADO, con lo que hay que mostrar de un club ANTES de entrar a él (nombre,
  país, calidad del dato, cuántos ejercicios, el más reciente, y desde la Versión
  146 `yrs`: la LISTA de ejercicios con el reportType de cada uno). Existe porque
  eso vive adentro de `data/<club>-data.js`, que es justamente lo que no se carga
  hasta que el visitante elige ese club: con la página recién abierta, `clubs{}`
  tiene 41 entradas y `sources{}` tiene 3, todas de Boca. Son 7 KB para los 41
  clubes contra los ~366 bytes POR CLUB de `clubs.js`. Su consumidor es el
  selector jerárquico, que desde la Versión 137 EXISTE: es de acá que salen el
  punto de calidad y el conteo de ejercicios de cada fila del panel, sin bajar un
  solo archivo de club. `yrs` se agregó para que el selector pueda además ofrecer
  un ejercicio puntual ("Balance 2024/2025") sin bajar nada.
- VERIFICACIÓN AUTOMÁTICA: `verifyTieOuts()` exige que cada ejercicio con total
  oficial conocido cierre contra el documento impreso, y `checkFxSanity()` que
  cada `fx` caiga en un rango plausible para su moneda. Hoy son 222 checks, 0
  mismatches, 0 warnings.
  COMPLEMENTO, DESDE LA VERSIÓN 122: `node tools/audit.js` audita en Node lo que un
  total correcto NO delata (ejercicios que no tienen ningún total contra qué
  compararse, categorías con typo o prestadas de la otra taxonomía, errores de
  escala, desgloses que no cierran contra su propia fila, catch-all dominante,
  ramas por club en el código). Carga `js/finanzas-calc.js` en un contexto de `vm`
  y llama al motor REAL, nunca reimplementa la cascada. Hoy: 0 P0, 0 P1, 58 P2,
  9 P3 (ver to-do 20). Desde la Versión 125 audita además la PROCEDENCIA de cada
  tipo de cambio, no solo que exista y sea plausible, y `node tools/audit.js --fx`
  imprime los 89 tipos de cambio con su origen, agrupados por moneda.
  OJO CON LA COBERTURA: los clubes se cargan por demanda, y estas 2 funciones
  solo pueden revisar lo que está en memoria, así que una carga normal de la
  página audita SOLO Boca (6 de los 222 checks). Para auditar TODO hay que
  forzar la carga de los 41 clubes: abrí `?audit=1` o corré `auditAll()` en la
  consola. CORRELO ANTES DE CADA PUSH QUE TOQUE DATOS, es lo único que revisa
  los clubes que nadie está mirando.
- FUENTES (Versión 126, revisada en la 127): cada número cita su documento. Al
  final de Finanzas hay una ficha con el documento del ejercicio que se está
  mirando (link incluido), su tipo y nivel de fuente, el tipo de cambio usado CON
  su procedencia, y las salvedades; la pestaña Fuentes lista los documentos del
  club seleccionado; y `fuentes.html` es el listado completo del sitio, una tabla
  de País, Equipo, Fuente y Notas (89 documentos, 41 clubes), página
  propia y estática para prensa y buscadores, que GENERA
  `node tools/generate-fuentes-page.js`: no se edita a mano.
  OJO CON QUÉ SE MUESTRA: `note` es INTERNA y no se renderiza nunca; lo que ve el
  visitante es `publicNote` (17 de 89 documentos) más las salvedades que
  `sourceCaveats()` deriva de los datos. Ver `CONVENCIONES.md` y
  `data/sources-view.js`, que además es donde viven las etiquetas de tipo y nivel
  compartidas entre el sitio y el generador. Antes de esto había
  una tabla de 6 filas y un párrafo escritos a mano que se habían quedado en los
  primeros clubes argentinos, y los 88 ejercicios REALES no mostraban su fuente
  en ningún lado (el único consumidor de `sources{}` era el banner de
  advertencia, que no aparece cuando el dato es oficial).
- PESTAÑAS: Finanzas es la única con datos reales y es donde está todo el
  trabajo. Mercado de Pases / Resultados Deportivos / Títulos están vacías o con
  placeholder según el club. "Mi Cuenta" es un stub sin
  funcionalidad: es la única parte del sitio que todavía le anuncia al visitante
  un plan pago ("próximamente"), y con la decisión de ir todo gratis ya no está
  esperando nada. Pendiente de decidir con Guido si se saca la pestaña o se
  reescribe el texto.
- UI: SELECTOR JERÁRQUICO DE CLUB en el header (Versión 137, reemplaza al
  `<select>` plano de 41 opciones): un botón con el club activo que abre un panel
  Deporte > Región > País > Liga > Equipo, con búsqueda por texto arriba, punto de
  calidad del dato por club, recientes, y dos salidas visibles. Se abre con
  Ctrl/Cmd+K. Vive en `js/selector.js` y se alimenta de `clubs.js` +
  `club-index.js` + `leagues.js` + `club-leagues.js`, sin bajar ningún archivo de
  club. `populateClubSelect()` ya no existe.
- COLD START (Versión 137): el sitio YA NO abre en Boca. Sin club elegido muestra
  una portada (`#coldHero`) con el buscador grande, los 8 clubes con más
  ejercicios cargados y un chip por liga; el nav y las secciones quedan
  escondidos. Elegido un club queda en `localStorage` y las visitas siguientes
  entran derecho a él, por el mismo camino que un click en el selector. Se vuelve
  a la portada con "Ver la portada" arriba del panel. Consecuencia: `boca-data.js`
  ya no se carga eager (son 78 KB menos en la primera carga) y no queda ningún
  club por default en el código.
- COMPARACIÓN ENTRE CLUBES (Versión 137, `js/comparar-clubes.js`, no confundir con
  "Comparar Gestiones", que compara 2 presidencias del mismo club): la unidad
  comparable es (CLUB, EJERCICIO), así que cada barra lleva su año y "River 20/21
  vs. River 24/25" son dos sujetos, no una feature aparte. Un solo modelo cubre
  1 vs 1, N clubes y club contra el promedio de su liga; el modo se deduce de la
  lista. Vista por default: barras horizontales, un bloque por indicador, escala
  POR indicador, más "Composición de ingresos" al 100%; la tabla queda detrás de
  un toggle. Fuerza USD y Formato simplificado, y lo dice en pantalla. Muestra
  "sin dato" (no 0) cuando la fuente no informa deuda, masa salarial o socios.
  4 avisos: sesgo del benchmark, ejercicios de años distintos, divisiones
  distintas, y presupuesto contra balance.
- Toggle de moneda nativa/USD y toggle "Formato del club"/"Formato simplificado"
  (este último es el default). El toggle "Año a año"/"Por gestión" está OCULTO
  desde la Versión 112 (pedido de Guido), código y datos intactos.
- IDIOMAS: el sitio tiene selector de idioma (globo, arriba a la derecha) desde
  la Versión 115. Castellano (idioma fuente, ES EL HTML mismo, sin archivo de
  diccionario) e inglés (`data/lang/en.js`, ~105 claves). Detecta el idioma del
  navegador en la primera visita y recuerda la elección en localStorage.
  AGREGAR UN IDIOMA = crear `data/lang/<code>.js` + una línea en
  `data/lang/langs.js`. Nada más: ni el HTML ni `js/i18n.js` se tocan.
  TRADUCCIÓN COMPLETA desde la Versión 138: las 204 claves que el sitio usa están
  las 204 en `en.js`, y `fuentes.html` también se traduce sola, con el mismo motor
  y el mismo diccionario (no se genera un archivo por idioma). Lo que NO se traduce
  es a propósito y ahora es una regla escrita en `CONVENCIONES.md`: los rubros de
  "Formato del club", el título de cada documento, y los nombres de club, de liga y
  de gestión, que salen textuales de la fuente o son nombres propios.
- CACHE DE ASSETS: todos los `<script src>` propios llevan `?v=`. SUBIR ESE
  NÚMERO al cambiar cualquier archivo de `js/` o `data/`, si no un visitante que
  ya entró antes se puede quedar con el JS viejo cacheado y el HTML nuevo.
  OJO, SE SUBE EN DOS LUGARES (corregido en la Versión 125, hasta acá este
  párrafo decía algo que no era cierto): `window.ASSET_V` es una constante
  inline, pero los `?v=` de los `<script src>` estáticos son LITERALES y no salen
  de ella, solo los 2 cargadores dinámicos (`loadClubData()`, `I18N.load()`) la
  leen. Hay que cambiar la constante Y los tags. Subir uno solo es peor que no
  subir ninguno: mezcla archivos nuevos con archivos viejos de la caché, que es
  el estado en el que el sitio tira `ReferenceError`. Lo chequea
  `node tools/audit.js` (`asset-v-desfasado`, P1).
- PROCEDENCIA DEL TIPO DE CAMBIO (Versión 125): cada ejercicio declara de dónde
  salió su `fx`, `fxSource` con uno de los 6 valores de `FX_SOURCE`
  (`data/currency-map.js`), o `fxRef` apuntando a `FX_CLOSE`, la tabla de
  cotizaciones de mercado por moneda y fecha de cierre. La regla: lo que declara
  el documento va literal en el archivo del club; lo que es cotización pública se
  dice una vez en la tabla y se referencia. Antes esto vivía en prosa, con 10
  redacciones distintas, y 18 de los 89 valores no decían nada. Ver
  `CONVENCIONES.md` y `club-data-mapping/SKILL.md` sección 5.
- BRANDING: RESUELTO en la Versión 117 (decisión de Guido). La marca es distinta
  por idioma, a propósito: "El deporte en Números" en castellano, "Finance of
  Sports" en inglés (clave `site.name`, `data/lang/en.js`), que es además el
  dominio. Antes decía "Tu club en números", que ya no era cierto: el sitio dejó
  de ser solo de fútbol de clubes argentinos hace rato. QUEDA ABIERTO solo el mail
  del formulario de contacto, todavía el placeholder
  `contacto@bocaennumeros.example`, que además referencia una marca ya abandonada
  dos renames atrás. Ver to-do 8.

---

## Dónde está cada cosa

- `js/i18n.js` + `data/lang/`: el motor de traducción y los diccionarios. Leé
  el comentario de cabecera de `js/i18n.js` antes de agregar un idioma o de
  meter un string nuevo en una vista.
- `.claude/skills/start-session-finance-of-sports-project/SKILL.md`: el checklist de arranque y de cierre de
  CUALQUIER sesión acá. Qué leer y en qué orden, qué NO leer, cómo verificar,
  qué documentar antes de terminar, y la regla de git. Empezá por ahí.
- `.claude/skills/auditoria-finance-of-sports/SKILL.md` + `auditorias/`: la auditoría de rutina
  (transversal y periódica, distinta de la verificación de onboarding y de `auditAll()`). El skill
  es el procedimiento; `auditorias/<fecha>.md` es el reporte de cada corrida, y cada uno diffea
  contra el anterior para no repetir la misma lista hasta que nadie la lea.
- `tools/audit.js`: auditoría determinista del proyecto entero (datos, escala,
  código, docs), agrupada en P0/P1/P2/P3. `--json` para la lista completa,
  `--quiet` para usarlo como gate antes de un push. `tools/audit-ignore.json`
  silencia lo YA verificado a mano contra el documento — nunca lo no verificado.
- `tools/generate-club-index.js`: regenera la sección "QUÉ ES REAL POR CLUB" desde
  los propios datos. Corrélo después de onboardear un club, NO edites esa sección
  a mano. `--check` avisa si quedó desactualizada.
- `tools/build-prototipo-inicio.js` + los 3 `prototipo-inicio-*` (Versiones 143-147):
  prototipo de un Inicio en frío con el selector jerárquico desplegado EN la portada
  (hoy vive atrás de un click) y que SE QUEDA ahí con el club ya elegido, encima
  de sus datos y minimizable. Cada fila de club tiene un dropdown "Ver" que junta
  el ejercicio ("Balance 2024/2025") con las dos acciones ("El club entero" y
  "Ver y elegir otro", que deja el selector abierto para sumar un segundo club). NO se deploya y no lo linkea
  ninguna página: se abre a mano, al lado de `index.html`. Los 3 archivos están
  GENERADOS (la portada desde `index.html`, `prototipo-inicio-selector.js` como copia
  parcheada de `js/selector.js`, y `prototipo-inicio-ejercicios.js` desde los
  `fiscalYearMeta`), no se editan a mano: los cambios van en el generador. Está a la
  espera de la decisión de Guido, to-do 28. La franja roja de arriba trae un botón
  "Volver a la primera visita" que borra lo que el sitio guarda en el navegador
  (club elegido, recientes, cartelito, estado minimizado) y recarga: sirve para
  probar el arranque en frío sin abrir las herramientas del navegador.
- `CONVENCIONES.md`: reglas permanentes de UI/datos y gotchas ya encontrados.
  LEELO antes de tocar el sitio: son criterios vigentes, varios pedidos
  explícitos de Guido que no se negocian sin preguntarle.
- `ARQUITECTURA.md`: qué hace cada archivo del proyecto y cómo funciona el motor
  genérico de Finanzas. Leelo cuando toques el motor o agregues un club.
- `CHANGELOG.md`: qué cambió en cada versión, condensado.
- `finance-of-sports-project.md`: la narrativa completa, con el razonamiento de cada
  decisión. Solo hace falta para entender el "por qué" de algo viejo.
- `CLAUDE.md`: instrucciones permanentes del proyecto (dónde guardar PDFs, qué
  skill leer antes de qué tarea, qué preguntarle a Guido antes de asumir).
- `.claude/skills/`: 3 skills propios (club-sourcing, club-data-mapping,
  club-or-year-onboarding). NO se autodescubren (repo anidado), hay que leerlos a
  mano; ver CLAUDE.md.
- `fuentes-por-club.md` + `fuentes/<País>/<Club>.md`: qué se buscó, qué se
  encontró y qué se descartó por club. Mirá ACÁ antes de salir a buscar un PDF.
- `dudas-por-club.md`: preguntas genuinamente abiertas, sin criterio asumido.

---

===== CLUB-INDEX:START (generado por tools/generate-club-index.js, no editar a mano) =====
QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB
GENERADO AUTOMÁTICAMENTE — no editar a mano. Se regenera con:
    node tools/generate-club-index.js

Esta lista contesta QUÉ hay cargado de cada club. El POR QUÉ (qué supuesto se tomó,
qué salvedad tiene una cifra, qué quedó sin cargar y por qué) NO está acá y no puede
estarlo: vive en el comentario de cabecera de cada `data/<club>-data.js`, que es el
archivo que sí o sí se toca al cargar un club y por lo tanto el único que no se puede
desincronizar. Si querés entender un club, abrí SU archivo.

Todo ejercicio listado acá es REAL (sale de un documento oficial del club) y cierra
contra el total impreso de su propio documento — eso lo garantiza `auditAll()`, no
esta lista. Un club sin datos reales no aparece.

TOTAL: 41 clubes, 85 ejercicios, 6 países.

ARGENTINA (11)
  Argentinos Juniors       5 ejercicios (2014/2015 a 2018/2019), balance, ARS
  Boca Juniors             2 ejercicios (2024/2025, 2026/2027), balance + presupuesto, ARS
  Estudiantes de La Plata  4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Independiente            1 ejercicio (2023/2024), balance, ARS
  Instituto ACC            1 ejercicio (2023/2024), balance, ARS
  Racing Club              17 ejercicios (2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2023/2024, 2024/2025, 2025/2026, 2026/2027), balance + presupuesto y balance + presupuesto, USD/ARS
  River Plate              1 ejercicio (2023/2024), balance de réplica no oficial, ARS
  Rosario Central          1 ejercicio (2022/2023), balance, ARS
  San Lorenzo              8 ejercicios (2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2023/2024), balance + presupuesto, ARS
  Unión                    4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Vélez Sarsfield          11 ejercicios (2014/2015 a 2024/2025), balance, ARS

BRASIL (7)
  Atlético Goianiense  1 ejercicio (2025), balance, BRL
  Botafogo             1 ejercicio (2024), balance, BRL
  Coritiba             1 ejercicio (2024), balance, BRL
  Cruzeiro             1 ejercicio (2025), balance, BRL
  Grêmio               1 ejercicio (2024), balance, BRL
  Ituano               1 ejercicio (2024), balance, BRL
  Mirassol             1 ejercicio (2024), balance, BRL, sin deuda/caja

COLOMBIA (2)
  Envigado FC  1 ejercicio (2025), balance, COP
  Once Caldas  1 ejercicio (2025), balance, COP, sin deuda/caja

ESPAÑA (10)
  Athletic Club       1 ejercicio (2024/2025), balance, EUR
  Atlético de Madrid  1 ejercicio (2024/2025), balance, EUR
  Celta de Vigo       1 ejercicio (2024/2025), balance, EUR
  Deportivo Alavés    1 ejercicio (2024/2025), balance, EUR
  FC Barcelona        1 ejercicio (2024/2025), balance, EUR
  Real Betis          1 ejercicio (2024/2025), balance, EUR
  Real Madrid         1 ejercicio (2024/2025), balance, EUR
  Sevilla FC          1 ejercicio (2024/2025), balance, EUR
  Valencia CF         1 ejercicio (2024/2025), balance, EUR
  Villarreal CF       1 ejercicio (2023/2024), balance, EUR

JAPÓN (10)
  Cerezo Osaka         1 ejercicio (2025), balance, JPY, sin deuda/caja
  FC Tokyo             1 ejercicio (2025), balance, JPY, sin deuda/caja
  Gamba Osaka          1 ejercicio (2025), balance, JPY, sin deuda/caja
  Kashima Antlers      1 ejercicio (2025), balance, JPY, sin deuda/caja
  Kawasaki Frontale    1 ejercicio (2025), balance, JPY, sin deuda/caja
  Nagoya Grampus       1 ejercicio (2025), balance, JPY, sin deuda/caja
  Sanfrecce Hiroshima  1 ejercicio (2025), balance, JPY, sin deuda/caja
  Urawa Red Diamonds   1 ejercicio (2025), balance, JPY, sin deuda/caja
  Vissel Kobe          1 ejercicio (2025), balance, JPY, sin deuda/caja
  Yokohama F. Marinos  1 ejercicio (2025), balance, JPY, sin deuda/caja

MÉXICO (1)
  Club América  1 ejercicio (2025), balance, MXN, sin deuda/caja

===== CLUB-INDEX:END =====

---

## Si algo no cierra (números, totales)

Antes de tocar nada, correr una verificación aritmética simple (sumar las
categorías de Revenue del club/ejercicio en cuestión y comparar contra el
total oficial o de prensa conocido) antes de dar por buena una edición. Ya
pasó una vez (con Boca) que un redondeo de conversión de moneda hizo que el
total no cerrara; Guido lo notó enseguida. verifyTieOuts() automatiza esto
para los club-ejercicios que tienen un total conocido, mirá la consola del
navegador al cargar el sitio. Este archivo es para uso público de hinchas y
periodistas reales: la precisión importa más que la velocidad acá.

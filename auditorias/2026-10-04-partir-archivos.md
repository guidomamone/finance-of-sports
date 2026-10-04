# Partir archivos de documentación: qué se lee en cada sesión y qué no hace falta (2026-10-04)

Estudio de solo lectura, pedido por Guido con este principio: *"cosas que no hacen falta que sean en
cada sesión, no tienen que leerse"*. No se movió, editó ni borró ningún archivo; esto es la propuesta.

Fuera del estudio, porque se están reorganizando en otra sesión: el skill `club-or-year-onboarding`,
`Admin/HANDOFF-pipeline.md`, `Admin/PIPELINE.md`, `Admin/HALLAZGOS-pipeline.md`,
`Admin/PANTALLA-FINANZAS.md` y `Admin/ARQUITECTURA.md`. Tampoco se propone partir `Admin/CHANGELOG.md`
ni `Admin/finance-of-sports-project.md` (se consultan con grep, no se leen enteros).

Pesos medidos con `wc -c` el 2026-10-04. Para pasar de KB a tokens: en castellano, 1 KB son unos
280-300 tokens.

---

## 1. Lo que se lee hoy en CADA sesión

| Archivo | Cómo llega | Peso hoy |
|---|---|---|
| `CLAUDE.md` | se carga solo, siempre, **también en cada subagente** | 29,6 KB |
| skill `start-session-finance-of-sports-project` | se invoca al arrancar | 13,8 KB |
| `Admin/ESTADO.md` | el skill de arranque dice "siempre" | 50,2 KB |
| `Admin/CONVENCIONES.md` | el skill de arranque dice "siempre" | 54,7 KB |
| `Admin/TODO.md` | el skill de arranque dice "siempre" | 76,8 KB |
| **Total** | | **≈ 225 KB (≈ 65.000 tokens)** |

Antes de tocar una sola línea, una sesión ya leyó unos 65.000 tokens. Con las 4 particiones de abajo
queda en **≈ 85-90 KB (≈ 25.000 tokens)**: unos 40.000 tokens menos por sesión.

Dos datos de `node tools/audit.js` que ya apuntan a lo mismo:
- `archivo-pesado`: `Admin/TODO.md` pesa 75 KB y su umbral es 60 KB (P3, sale en cada corrida).
- La tabla de pesos del skill de arranque está atrasada (dice ESTADO 44, CONVENCIONES 53, TODO 72)
  pero todavía dentro del 25 % de margen, así que `doc-peso-desfasado` no se queja aún.

---

## 2. Qué hay adentro de cada uno, según CUÁNDO hace falta

### 2.1 `Admin/CONVENCIONES.md` (54,7 KB): casi todo es por tipo de tarea

Es una sola lista de 48 reglas, sin subtítulos. Clasificadas una por una:

| Grupo | KB | Reglas (por línea y versión) | Cuándo hace falta |
|---|---|---|---|
| Proceso y documentos | ≈ 8 | L18 dos sesiones/worktree (V200), L43 dónde va un documento (V196), L62 archivar (V196), L160 premisa vencida en la to-do, L431 nada de em dashes (V42), intro | **cada sesión** |
| Datos de un club | ≈ 23 | L70 dato inventado (V152), L104 club→liga sin año (V137), L122 "sin dato no es cero", L149 ingreso extraordinario, L173 "reporta cero" ≠ "no desglosa" (V172), L215 liga del cierre (V132), L223 `clubId` con país (V129), L239 `note`/`publicNote` (V127), L252 procedencia del `fx` (V125), L277 presupuestos en caja (V97), L323 y L345 filas nuevas (V189), L470 categorización (V38), L490 homologar (V34-35), L513 nunca cargar sin verificar (V30), L521 ejercicio 2027 | solo al cargar o tocar datos |
| Pantalla y código del sitio | ≈ 21 | L94 qué se traduce, L188 nada de `alert()`, L194 `I18N_BASE`, L203 `t()` en audit.js, L268 ASSET_V en dos lugares, L293 dropdown (V96), L313 (V50), L381-L452 formato simplificado / selects / layout (V39-V48), L482-L485, L531-L607 los "OJO" de Chart.js, acordeón, stats, color de club (V178), estado de `selector.js` | solo al tocar `js/`, `index.html`, CSS |
| Historia que ya no manda | ≈ 2 | L369 "REGLA HISTÓRICA (Versión 49 ... vigente hasta la 189)", L615 el párrafo de `netlify.toml` (copia del de `CLAUDE.md`) | nunca |

Además, 4 de las ~17 reglas de datos ya están también en el skill `club-data-mapping` (V38, V46, V125,
V189). Ese skill se carga justo cuando se tocan datos, así que esas cuatro hoy se leen dos veces.

### 2.2 `Admin/TODO.md` (76,8 KB): un tercio es sourcing por país

| Grupo | KB | Puntos | Cuándo hace falta |
|---|---|---|---|
| Pipeline y escala | ≈ 34 | 108, 112, 138-142, 97, 99, 89, 85, 101, **98 (11,1 KB)**, **105 (5,6 KB)** | cada sesión (es lo que está en curso) |
| **Sourcing por país** (lo que quedó de cada barrido) | **≈ 23** | 50, 59, 82, 93, 100, 113-136 (Canadá, EE.UU./México, Sudamérica, Italia, España/Francia, Oceanía, África, Centroamérica, Europa del Este) | solo en una sesión de sourcing de ESE país |
| Pantalla del sitio | ≈ 10 | 23, 34, 95, 96, 102 | solo al tocar la pantalla |
| Mails a clubes | ≈ 3 | 51 | solo con `club-outreach` |
| Lista de "sacados el 2026-09-14" | 2,6 | encabezado | nunca (es historia) |

El precedente ya existe en el propio archivo: el 2026-09-14 Guido sacó "los 6 puntos de sourcing y
onboarding por país" con este argumento, que está escrito ahí: *buscar y cargar documentos es el trabajo
del proyecto, no una lista de pendientes; qué falta de cada club vive en `fuentes/<País>/<Club>.md`*.
Los puntos 113-136 volvieron a crecer en el mismo lugar con el mismo tipo de contenido.

Los puntos 98 y 105 (16,7 KB entre los dos) son planes del 2026-09-28, escritos antes del proceso
nuevo del pipeline (Versión 346 en adelante). Hay que confirmar con Guido cuánto de eso sigue vigente
después de `Admin/PIPELINE.md`; lo que ya quedó superado es historia.

### 2.3 `Admin/ESTADO.md` (50,2 KB): la mitad describe la pantalla, no el estado

El subtítulo "Inventario de transcripciones y pipeline PDF -> Jev" (L59) en realidad abarca 34 KB y
contiene el inventario entero de funcionalidades del sitio:

| Grupo | KB | Ejemplos | Cuándo hace falta |
|---|---|---|---|
| Estado del proyecto | ≈ 6 | objetivo (L27), pipeline nuevo (L50), inventario en números (L61-L77), sitio/analytics | **cada sesión** |
| Cómo funciona cada pantalla | **≈ 21** | selector modal (L360, 3,7 KB), liga por ejercicio (L195), pestaña Ligas (L325), simular clubes en otra liga (L347), portada (L406), Comparar (L422), idiomas (L445), índice liviano (L233), taxonomía del selector (L180), fuentes (L291), pestañas (L316), caché de assets (L457), procedencia del fx (L468) | solo al tocar la pantalla o el motor |
| Historia dentro de DATOS | ≈ 4 | el bullet DATOS (L106, 5 KB) narra las tandas de la V226 y la V227 club por club; eso ya está en el CHANGELOG | nunca |
| Verificación automática (L246) | 3,7 | repite lo que ya explica el skill de arranque §4 | ya se lee en el skill |
| "Dónde está cada cosa" (L486-L630) | 10,7 | mapa de archivos y skills; parte repite `CLAUDE.md` y las descripciones de los skills | a demanda; alcanza una versión de ~4 KB |
| Historia del archivo y `netlify.toml` | 1,4 | "Por qué es un archivo y ya no el comentario de `index.html`" (L15), párrafo de netlify (L620, tercera copia) | nunca |

Choque con la mudanza en curso: ESTADO L50-L57 dice que el estado del pipeline vive en
`Admin/HANDOFF-pipeline.md` ("Dónde estamos"). Cuando termine la mudanza, ese puntero va a quedar viejo.

### 2.4 `CLAUDE.md` (29,6 KB): se paga en cada sesión y en cada subagente

Es el único archivo que entra solo, sin que nadie lo pida, y entra también en cada subagente (este
estudio lo recibió entero). En una sesión de sourcing con 5 agentes en paralelo se lee 6 veces.

| Sección | KB | Cuándo hace falta |
|---|---|---|
| Separación del sitio profesional, regla de `Admin/`, archivar (L1-L33) | 3,2 | cada sesión, pero la historia de la mudanza de carpetas del 2026-09-15 y la copia del párrafo de netlify (≈ 2 KB) no |
| Al empezar: qué leer (L35-L117) | ≈ 3 | cada sesión, pero repite el skill de arranque |
| Los 3 niveles del sourcing (dentro de "Al empezar") | ≈ 1,8 | solo sourcing (ya está en `club-sourcing` y en `fuentes/README.md`) |
| Lista de los 7 skills con "obligatorio" | ≈ 2,3 | las descripciones de los skills ya están siempre en contexto; alcanza 1 línea |
| "Cómo llegar a ellos" / sesión abierta en `Website propio/` (L118-L130) | 0,9 | **ya no es cierto**: desde el 2026-09-15 la carpeta no está anidada; además dice "los 6" cuando son 7 |
| Antes de terminar (L132-L166) | 2,1 | cada sesión, pero repite el skill de arranque §5 |
| Estructura `Clubes/<País>/<Club>/` (L167-L207) | 2,6 | solo al bajar o transcribir PDFs |
| Cada PDF nuevo: transcribir antes (L208-L287) | 5,7 | solo al transcribir; ya lo cubre `Admin/PIPELINE.md` §2 |
| Precisión antes que velocidad (L288) | 0,4 | cada sesión |
| Gotchas del navegador de preview: caché, `alert()`, screenshot en blanco (L304-L372) | 5,2 | solo al usar el preview |
| Gotchas de PDF y grep: `grep -oP` con acentos, `pdfinfo` con NUL, `pdftotext` mojibake (L373-L410) | 2,5 | solo al transcribir o leer PDFs |
| Agentes en paralelo comparten el Browser (L396) | 0,6 | solo sourcing con agentes |

Ojo: los gotchas del navegador se mudaron a `CLAUDE.md` a propósito ("son igual de relevantes para una
sesión que solo toca CSS"). Sacarlos revierte esa decisión, así que necesita el ok de Guido. El
argumento a favor: hoy la mayoría de las sesiones son de pipeline o sourcing y no abren el preview.

### 2.5 Lo que NO conviene partir (ya se lee solo cuando hace falta)

- `Admin/ESTADO-clubes.md` (14 KB, generado, a demanda), `fuentes/README.md` (14 KB, solo sourcing), los
  27 archivos de `club-sourcing/paises/` (102 KB en total, se lee uno solo).
- `escala-finance-of-sports` (26 KB), `auditoria-finance-of-sports` (12 KB), `club-outreach` (15 KB):
  cada uno se carga solo para su tarea y casi todo su contenido es de esa tarea.
- `Admin/dudas-por-club.md` (152 KB): no se lee de rutina, se busca un club puntual. Tiene un problema
  de orden (está agrupado por sesión, ej. "Tanda de 20 transcripts al azar" de 10 KB, y no por club),
  pero partirlo no ahorra nada en cada sesión y lo citan 250 archivos (casi todos `data/*.js` y
  `fuentes/`). Si algún día se parte, que sea por país, como `fuentes/`, y que el archivo actual quede
  como índice con el mismo nombre para no romper ninguna cita.
- Los `.md` sueltos de `Admin/` (`inventario-pendiente`, `test-barridos`, `prompt*-sourcing-*`,
  `propuestas-skills-sudamerica`, `test-costo-transcripcion`): ninguno se lee de rutina. De paso: 
  `Admin/prompt-sourcing-italia.md` parece cerrado (Italia se barrió el 2026-10-03) y es candidato a
  `Admin/Archive/`; `Admin/auditoria-pipeline-2026-10-02.md` es una auditoría y por convención iría en
  `auditorias/`.

---

## 3. Las particiones recomendadas, ordenadas por ahorro en cada sesión

### 1) Partir `Admin/CONVENCIONES.md` en tres: ahorra ≈ 44 KB por sesión

- Queda `Admin/CONVENCIONES.md` (≈ 10 KB, se sigue leyendo siempre): las reglas de proceso y documentos,
  más un **índice de 1 línea por regla mudada** ("SIN DATO NO ES CERO (V137/152) → CONVENCIONES-DATOS").
- Nuevo `Admin/CONVENCIONES-DATOS.md` (≈ 23 KB): se lee al cargar o tocar datos. Lo manda a leer
  `club-data-mapping` (y `Admin/PIPELINE.md` cuando termine la mudanza). Al mover, sacar las 4 reglas que
  ya están en `club-data-mapping` y dejar el puntero.
- Nuevo `Admin/CONVENCIONES-UI.md` (≈ 21 KB): se lee al tocar `js/`, `index.html` o CSS. Es también el
  destino natural de los gotchas del navegador de `CLAUDE.md` (ver la recomendación 4).
- La "REGLA HISTÓRICA (V49)" va a `Admin/Archive/`; el párrafo de netlify se borra (queda el de
  `CLAUDE.md`).

Riesgo: **34 archivos vivos** nombran `CONVENCIONES.md` (3 skills, 16 `data/*.js`, `js/liga.js`,
`js/selector.js`, `index.html`, tools). Casi todos citan "ver `Admin/CONVENCIONES.md` Versión N" sin
nombrar la regla, así que el índice de 1 línea por regla alcanza para que un grep de la versión siga
llegando. Hay que actualizar la fila 2 de la tabla del skill de arranque y agregar dos filas nuevas
(con su peso: lo chequea `doc-peso-desfasado`).

### 2) Sacar de `Admin/TODO.md` lo que no es de todas las sesiones: ahorra ≈ 40 KB

- Los puntos de sourcing por país (≈ 23 KB, 50, 59, 82, 93, 100, 113-136) van a la nota de cada país,
  `fuentes/<País>/_notas-generales.md` (o al `fuentes/<País>/<Club>.md` cuando es de un club). Es
  exactamente el criterio que Guido ya aplicó el 2026-09-14. Las gestiones que le tocan a Guido (118,
  120, 122, 129, 133) y los candidatos a mail (123, 135) quedan en el TODO en **un solo punto corto**
  que lista país + qué gestión + dónde está el detalle, para que no se pierdan de vista.
- Los puntos 98 y 105 (16,7 KB): con Guido, ver qué sigue vigente después del pipeline nuevo. Lo vigente
  queda en 5-10 líneas; el texto completo va a `Admin/Archive/` (o a un informe en `auditorias/`).
- La lista de "sacados el 2026-09-14" (2,6 KB) va a `Admin/Archive/`.

Resultado: TODO ≈ 35 KB, debajo del umbral de 60 KB, y `archivo-pesado` deja de salir en `audit.js`.

Riesgo: **bajo**. Ningún archivo fuera del TODO cita los números 113-136 ni 50/59/82/93/100 (verificado
con `git grep`). "to-do 98" lo citan 10 archivos (`club-data-mapping`, `dudas-por-club`, 3 `data/*.js`, 3
tools) y "to-do 105" 2 (`.gitignore`, `tools/prepare-onboarding.mjs`): por eso esos dos puntos se
achican pero NO se borran, conservan su número.

### 3) Sacar de `Admin/ESTADO.md` la descripción de la pantalla: ahorra ≈ 35 KB

- Las ≈ 21 KB de "cómo funciona cada pantalla" van a un archivo que se lee solo al tocar la pantalla.
  Lo más prolijo sería sumarlas a `Admin/PANTALLA-FINANZAS.md` / `Admin/ARQUITECTURA.md`, **pero esos
  están en la mudanza en curso**: conviene hacer este paso cuando esa mudanza cierre, para no pisarse.
  Si no se quiere esperar, un `Admin/FUNCIONALIDADES.md` nuevo.
- El bullet DATOS queda con los números (clubes por país) y sin la narrativa de las tandas V226/V227
  (≈ 4 KB, ya en el CHANGELOG).
- "Verificación automática" (3,7 KB) queda en un puntero al skill de arranque §4.
- "Dónde está cada cosa" baja de 10,7 a ≈ 4 KB (sacar lo que ya dicen `CLAUDE.md` y las descripciones
  de los skills).
- Se borran el párrafo de netlify (tercera copia) y el "por qué es un archivo" (historia).
- Se renombra el subtítulo de L59: hoy dice "Inventario de transcripciones" y abarca todo el sitio.

Resultado: ESTADO ≈ 15 KB.

Riesgo: **bajo**. 15 archivos vivos nombran `ESTADO.md`, pero ninguno cita una sección de pantalla:
citan el archivo entero (`index.html` L13, `ARQUITECTURA.md` L10) o la sección generada que ya se mudó
a `ESTADO-clubes.md`. Hay que actualizar el peso en la tabla del skill de arranque y el puntero al
HANDOFF (L50-L57) cuando cierre la mudanza.

### 4) Adelgazar `CLAUDE.md` de 29,6 a ≈ 10 KB: ahorra ≈ 20 KB, multiplicado por cada subagente

En KB por sesión es el que menos ahorra de los cuatro, pero es el único que se paga **sin que nadie lo
pida y una vez más por cada subagente**. En una sesión con 5 agentes son ≈ 120 KB.

- "Cada PDF nuevo" (5,7 KB) + la estructura de `Clubes/` (2,6 KB) + los gotchas de PDF y grep (2,5 KB)
  → `Admin/PIPELINE.md` §1-§2 (cuando cierre la mudanza) o, para el camino de Tesseract, la sección 15
  de `club-data-mapping`. En `CLAUDE.md` quedan 3 líneas: "ningún PDF se usa sin transcribirlo; el PDF y
  su `.md` van juntos en `Clubes/<País>/<Club>/`; las fuentes no oficiales se guardan pero no se
  trackean; el cómo, en PIPELINE §2".
- Los gotchas del navegador (5,2 KB) + el de agentes en paralelo (0,6 KB) → `Admin/CONVENCIONES-UI.md`
  (y el de agentes a `club-sourcing`). **Revierte una decisión explícita**: pedir el ok de Guido.
- La lista de skills con "obligatorio" (2,3 KB) → 1 línea: "leé el skill que corresponde a la tarea, y
  empezá siempre por `start-session-finance-of-sports-project`".
- "Cómo llegar a ellos" (0,9 KB): borrar, ya no es cierto (la carpeta no está anidada desde el
  2026-09-15).
- "Antes de terminar" (2,1 KB) → 2 líneas que manden al skill de arranque §5.
- La historia de la mudanza de carpetas y la línea vieja del `.gitignore` → `Admin/Archive/` o se borra
  (ya está en el CHANGELOG).

Riesgo: **bajo-medio**. "Cada PDF nuevo" lo citan 9 archivos vivos (5 tools en sus comentarios,
`ARQUITECTURA.md`, `TODO.md`, 2 tests); "Gotchas de tooling" lo citan 3 tools; "Estructura de carpetas
de documentos fuente" solo `ARQUITECTURA.md`. Son 13 citas en total, todas en comentarios: se pueden
actualizar en el mismo commit. `tools/audit.js` (`checkParrafoNetlifyDuplicado`, línea ~583) lee el
párrafo de netlify en `CLAUDE.md`, `ESTADO.md` y `CONVENCIONES.md`; dejarlo solo en `CLAUDE.md` no lo
rompe (el chequeo solo mira los archivos que tienen el párrafo).

### 5) Skills, solo dentro de su tarea (no ahorran en cada sesión; requieren el ok de Guido)

Las memorias del proyecto dicen que un skill no se edita sin proponer el texto y esperar el ok. Por eso
esto queda como propuesta, en segundo plano:

- `club-data-mapping` (83 KB): las secciones 9 y 15 (13 KB) son sobre leer PDFs con OCR y Tesseract, que
  hoy es el tercer escalón (después de Mistral y Gemini). Pasarlas a un archivo aparte dentro del skill
  (`club-data-mapping/ocr.md`) que se abre solo en ese caso. Las secciones 19 (Perú) y 20 (Dinamarca),
  5,5 KB, son de un país puntual: van a `club-data-mapping/paises/`, igual que hace `club-sourcing`.
  Ahorro: ≈ 18 KB en cada sesión que toca datos.
- `club-sourcing` (38 KB): la sección 0.1b (4,3 KB) es en buena parte el resultado del A/B test; el
  detalle ya vive en `Admin/test-barridos.md`. Ahorro chico.

---

## 4. Resumen

| # | Partición | Ahorro por sesión | Citas a actualizar | Depende de |
|---|---|---|---|---|
| 1 | CONVENCIONES en general / datos / UI | ≈ 44 KB | 34 archivos citan el archivo; alcanza un índice por regla | — |
| 2 | TODO sin sourcing por país, 98 y 105 achicados | ≈ 40 KB | 0 para los de sourcing; 12 para 98/105 (se conservan) | ok de Guido sobre 98/105 |
| 3 | ESTADO sin la descripción de la pantalla | ≈ 35 KB | 0 a nivel sección | que cierre la mudanza (destino) |
| 4 | CLAUDE.md a ≈ 10 KB | ≈ 20 KB × (1 + cada subagente) | 13 en comentarios | cierre de la mudanza (PIPELINE §2) + ok de Guido sobre los gotchas del navegador |
| 5 | Skills de datos/sourcing | 0 por sesión; ≈ 18 KB en sesiones de datos | — | ok de Guido (regla de skills) |

De ≈ 225 KB a ≈ 85-90 KB en lo que se lee siempre.

Para que no vuelva a crecer: sumar `CLAUDE.md` (umbral sugerido 15 KB) y `Admin/CONVENCIONES.md`
(15 KB) a la lista de "UMBRALES POR CÓMO SE LEE EL ARCHIVO" de `tools/audit.js` (línea ~1272), que hoy
solo vigila `ESTADO.md` y `TODO.md` entre los de lectura diaria. Y bajar el de `TODO.md` y `ESTADO.md`
a 40 y 25 KB después de partir, para que el aviso salga antes de que vuelvan a pesar lo que pesan hoy.

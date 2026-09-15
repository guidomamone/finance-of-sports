# Prototipo 4 — el selector que va a producción

**Este archivo existe para una sesión futura que no vivió ninguna de las sesiones
anteriores.** Lo que sigue es todo lo que hace falta para entender qué es el
prototipo 4, en qué se diferencia del sitio publicado, y cómo planear el merge.
El merge es grande: toca la portada, la navegación, el selector de club y el
comparador. No es un copy-paste.

Se escribió el 2026-09-15, al final de la sesión que lo terminó (Versiones 156, 157
y 158 del `CHANGELOG.md`).

---

## 0. En una línea

El sitio publicado abre en una portada con un buscador y un selector jerárquico de
5 columnas. El prototipo 4 abre preguntando **qué querés hacer** (ver un club, o
comparar dos), y mueve toda la elección a un **modal paso a paso**, donde cada lado
de una comparación se arma como una **suma de bloques** con su propio agregador.

```
Inicio  ──"ver un club"────►  modal de pasos  ──►  Finanzas (con selector arriba)
        └─"comparar dos"──►  pestaña Comparar ──►  card A [+] VS card B [+]
                                                    └ cada card abre el mismo modal
```

## 1. Cómo verlo andando

El sitio se sirve desde la RAÍZ del repo (`.claude/launch.json`, puerto 8971):

```
http://localhost:8971/Prototyping/Selector/prototipo-cards.html
```

El `.html` está **generado**. No se edita a mano: se sobrescribe.

```bash
node Prototyping/Selector/build-prototipo-cards.js
```

El botón rojo "Volver a la primera visita" de la franja de arriba borra el club
guardado de `localStorage` y recarga: es la forma de ver la primera pantalla.

## 2. Los cuatro archivos

| Archivo | Qué es |
|---|---|
| `prototipo-cards.html` | **GENERADO.** `index.html` + un puñado de reemplazos con ancla. Si un ancla no aparece, el generador FALLA en vez de escribir a medias. |
| `build-prototipo-cards.js` | El generador: el markup nuevo, el CSS nuevo y los parches a `index.html`. **Acá está el 100% del HTML y del CSS de la propuesta.** |
| `prototipo-cards-selector.js` | La lógica, escrita a mano. Expone la MISMA API pública que `js/selector.js`, así que `index.html` no se entera de cuál está cargado. |
| `prototipo-pasos-datos-inventados.js` | ⚠️ **DATOS FALSOS.** Ver la sección 8. |

`Archive/` tiene los prototipos 1, 2 y 3, que perdieron. Están ahí para poder mirar
por qué se descartó cada camino; el `README.md` de `Prototyping/` los resume.

## 3. El modelo, que es lo único que hay que entender de verdad

### 3.1 La bifurcación de Inicio

La portada dejó de ser una pantalla de trabajo. Tiene un título y dos botones
grandes. Nada más. **El que viene por un club nunca ve una pantalla partida al
medio**, que era la queja contra los prototipos anteriores.

### 3.2 Un LADO es una suma de bloques

Esto reemplaza al modelo de `js/comparar-clubes.js`, donde un sujeto es un club o
el promedio de una liga, y punto.

```
LADO = bloque + bloque + …
       cada bloque = (qué cosas) × (qué año) × (cómo se agrega)

{ kind:'liga',   league:'ar-primera', years:[2025],              agg:'promedio'|'suma' }
{ kind:'clubes', pares:[['boca',2025], ['river',null]],          agg:'promedio'|'suma' }
```

`año === null` significa "el ejercicio más reciente de ESE club" (los clubes no
cierran todos el mismo día: uno argentino cierra en junio y uno japonés en
diciembre). En un bloque de liga el año NO puede ser null: define **quiénes la
integraban ese año**.

Es la estructura de una tabla dinámica, y de ahí salió. El caso que la motivó, de
Guido: *"promedio de clubes colombianos + sumatoria de 6 clubes brasileros"* contra
Real Madrid.

**Consecuencia**: el agregador no es del lado, es de cada bloque. Por eso el card no
tiene un toggle Promedio/Sumatoria: muestra la **fórmula** (`promedio(Primera A
2025) + suma(6 clubes)`).

### 3.3 El paso 4 bifurca, y la mezcla es el caso general

```
1 Deporte → 2 Región → 3 País → 4 ¿QUÉ TIPO? → 5 cuál(es) → 6 qué año(s) y cómo se agrega
                                     │
            ┌────────────────────────┼────────────────────────┐
        🏆 Ligas                 👕 Clubes                🧩 Mezcla
   5 qué ligas                5 qué clubes           5 el constructor
   6 temporada de cada una    6 ejercicio de cada    (cada bloque trae
     + agregador                club + agregador      lo suyo adentro)
```

"Ligas" y "Clubes" son **atajos que producen un lado de un solo bloque**. La mezcla
es el modelo completo. Un motor, tres puertas de entrada: al planear el merge, no
implementar tres cosas.

Los pasos 1-3 filtran y se pueden saltear todos ("Elegir más tarde" está en los
tres, y esa es una regla del prototipo 2 que se conservó: por eso ninguno dice
"opcional", porque todos lo son).

### 3.4 Dos reglas de copy que valen más de lo que parecen

- **Un ejercicio nunca aparece suelto.** En el paso 6 cuelga siempre de su club
  ("Boca Juniors: [Balance 2024/2025 ▾]") o de su liga. Venía de una queja concreta
  de Guido: *"si no, el usuario pierde noción de quién son los balances"*.
- **Cada temporada de liga dice cuántos equipos tenía ESE año.** Primera División
  2025 son 10 equipos y 2024 son 11. Sin ese dato, "la liga creció" mezcla plata con
  aritmética.

## 4. Qué cambia respecto del sitio publicado, archivo por archivo

Esto es el mapa del merge. La columna de la derecha es el tamaño del problema, no
una estimación de tiempo.

| Archivo de producción | Qué le pasa | Riesgo |
|---|---|---|
| `index.html` (markup) | **Inicio** pasa a ser la bifurcación; nace la sección `#vs` ("Comparar") con los dos cards; el nav gana una pestaña; **Finanzas** gana el card del selector arriba; el `#coldHero` de la Versión 137 desaparece. | Alto: es markup nuevo en 4 lugares. |
| `index.html` (`applyClubMode`) | Deja de esconder el nav y las secciones cuando no hay club: la portada ahora ES una sección. | Medio. Ver 8.2. |
| `js/selector.js` | **Se reemplaza entero.** El panel de 5 columnas no sobrevive; el árbol pasa a ser el modal de pasos. Misma API pública (`init/open/close/refresh/renderButton/goHome/savedClub`), así que los llamadores no cambian. | Alto, pero acotado: es un archivo. |
| `js/comparar-clubes.js` | **Es la decisión de fondo del merge.** El prototipo lo reemplaza funcionalmente: los dos cards SON la comparación. Hoy `index.html` lo llama en 6 lugares (`init`, `clear`, `draw`, `onActiveChanged`, `openPanel`, `closePanel`) y su bandeja de chips es otra forma de armar lo mismo. Conviven mal. | Alto. Ver 6. |
| `data/lang/en.js` | Todos los textos nuevos del prototipo están en castellano a mano. Producción los quiere en `t()` con su clave. | Medio, mecánico. |
| `data/club-leagues.js` | No cambia, pero **empieza a importar de verdad**: `clubsOfLeagueYear()` y `leagueYears()` pasan a ser el corazón del selector de temporadas. Sus 3 filas en `null` (Boca 2027, Racing 2026 y 2027) se vuelven visibles. | Bajo, pero mirar antes. |
| `index.html` (`ASSET_V`) | Subir en los dos lugares. Ver 8.1. | Bajo, pero se olvida siempre. |

## 5. Lo que el prototipo NO hace, y hay que decidir

1. **Un bloque de clubes en la MEZCLA tiene un solo año para todo el bloque** ("el
   más reciente de cada uno", o un cierre puntual). El detalle ejercicio-por-club
   solo existe en la rama Clubes. Se hizo así para que cada fila de la tabla no se
   volviera un formulario; si hace falta, es donde crece.
2. **No hay grupos guardados.** Armar "mis 6 brasileños" se pierde al cerrar. El
   prototipo 2 tampoco los tenía.
3. **La tabla de resultados es la del prototipo 3**, simple a propósito (4
   indicadores y barras). El sitio tiene una vista de comparación más rica en
   `js/comparar-clubes.js`; hay que decidir cuál sobrevive (ver 6).
4. **Móvil no se diseñó.** Las reglas que tiene son las heredadas del sitio más un
   `@media (max-width:900px)` que apila los cards. Decisión de Guido: primero
   desktop. En un teléfono el modal ocupa la pantalla y funciona, pero nadie lo
   pensó.
5. **El aporte de cada bloque no se muestra en el constructor.** Dice "6
   ejercicios", no "489 M". Es a propósito: el aporte en plata obliga a bajar el
   `data/<club>-data.js` de cada club MIENTRAS elegís, que es justo lo que el
   selector evita (son 41 archivos y el sitio los carga por demanda). Si se quiere
   el número, hay que decidir cuándo se paga esa carga.
6. **Un lado puede sumar un promedio con una sumatoria.** Se avisa en pantalla, no
   se prohíbe. Decisión explícita de Guido: *"suma peras con manzanas pero no es mi
   tema, yo tengo que dar la funcionalidad"*.

## 6. La decisión grande: qué pasa con `js/comparar-clubes.js`

El prototipo y ese archivo contestan la misma pregunta de dos maneras. Antes de
escribir una línea de merge, hay que resolver esto, porque cambia todo lo demás:

- **(a) El prototipo lo reemplaza.** Los dos cards son la única forma de comparar.
  Se borra la bandeja de chips, los 3 puntos de entrada de la Versión 137 (el botón
  del header, el CTA de Inicio, el "+" de las filas del panel) y sus claves de
  i18n. Es lo más limpio y lo más destructivo.
- **(b) Conviven**: los cards arman el lado y el comparador viejo dibuja el
  resultado. Hay que mapear un lado-de-bloques a los sujetos que ese archivo sabe
  dibujar, y ahí se pierde justamente lo nuevo (un lado que suma partes no es un
  sujeto).
- **(c) El prototipo entra solo para el camino "un club"** (Inicio → Finanzas) y la
  comparación se deja como está. Es el merge más chico y el que menos aporta.

La recomendación de esta sesión es **(a)**, y hacerlo por etapas (sección 7).

## 7. Plan de merge sugerido, por etapas

Cada etapa es commiteable y verificable sola. El orden importa: las primeras dos no
tocan el modelo de datos.

1. **Finanzas con selector arriba.** Es independiente de todo lo demás y mejora el
   sitio de hoy: sin club, Finanzas muestra el card del selector en vez de tablas
   vacías. No toca `js/selector.js`.
2. **La bifurcación de Inicio + la pestaña Comparar vacía.** Markup y navegación,
   sin lógica nueva: la pestaña puede abrir el selector de hoy.
3. **El modal de pasos** reemplazando al panel de columnas (`js/selector.js`), con
   el modelo de bloques adentro pero con un solo bloque (las ramas Ligas y Clubes).
   Acá entra el grueso de `prototipo-cards-selector.js`.
4. **La mezcla** (la tercera opción del paso 4 y el constructor).
5. **La tabla de resultados** y el retiro de `js/comparar-clubes.js`, según lo que
   se haya decidido en 6.
6. **i18n**: todas las claves nuevas a `data/lang/en.js`.
7. **Borrar los datos inventados** (to-do 30) y sacar el prototipo de `Prototyping/`
   cuando ya no haga falta.

## 8. Gotchas que van a costar tiempo si no se leen

### 8.1 `ASSET_V` se sube en DOS lugares
La constante `window.ASSET_V` de `index.html` y **los `?v=` literales de cada
`<script src>`**, que NO salen de ella. Cambiar uno solo es peor que no cambiar
ninguno: el navegador mezcla archivos nuevos con viejos de su caché. Lo chequea
`node tools/audit.js` (`asset-v-desfasado`, P1).

### 8.2 `applyClubMode()` es el único lugar que decide portada vs. club
El prototipo lo parchea para que no esconda nada. En producción hay que pensar qué
significa "sin club" ahora que Inicio y Comparar funcionan sin club, y Finanzas es
la única pantalla que necesita uno.

### 8.3 `clubs` y compañía NO son propiedades de `window`
Se declaran con `const` en sus data files. `window.clubs` es `undefined` y rompe
todo. Se referencian pelados. Esta trampa ya costó media hora dos veces en este
repo; `window.CLUB_INDEX`, `window.SPORTS`, `window.LEAGUES` y las funciones
sueltas de `leagues.js`/`club-leagues.js` sí están en window.

### 8.4 El markup del modal va ANTES del `<footer>`
El `<script>` principal de `index.html` está al final del body y es el que llama a
`CLUB_SELECTOR.init()`. Con el modal después de ese script, `init()` corre con el
markup inexistente, `$('modalX')` da null y los dos cards quedan muertos. Pasó.

### 8.5 Los 10 clubes japoneses no informan gastos
`expenseLines: []` y `officialTotalExpenses: null`: la J.League publica el ingreso
de cada club, no su estructura de costos. El prototipo manda gastos y resultado a
"sin dato" (`numerosDe()`); **el sitio publicado todavía muestra "Gastos 0,0 M USD"
y un resultado igual a los ingresos**, que es un número falso. Está anotado como
**to-do 31** y el arreglo ya está escrito acá.

### 8.6 La caché de este entorno de preview es agresiva
Si después de editar un `.js` el navegador sigue mostrando lo viejo, no es un bug
del código: cambiar la URL exacta (el `?v=`) es lo único que funciona. Reload,
Cmd+Shift+R, pestaña nueva y cambiar de puerto NO alcanzan. Y el historial de
consola de una pestaña reusada sigue mostrando errores ya arreglados: verificar el
estado real antes de perseguir un fantasma.

### 8.7 Ningún camino de error usa `alert()`
Un diálogo nativo abierto congela también las herramientas de debug. Es una regla
escrita en `CONVENCIONES.md`.

## 9. ⚠️ Los datos inventados

`prototipo-pasos-datos-inventados.js` rellena de mentira los ejercicios 2016-2025 de
los 18 clubes de Argentina y Brasil, con ascensos y descensos inventados, para poder
probar la interfaz sin que la falta de datos reales limite el diseño.

**NINGÚN número que salga de ahí es real.** No vive en `data/`, ninguna auditoría lo
ve, cada ejercicio inventado se anuncia en pantalla y la franja de arriba del
prototipo es roja por eso. Las 5 condiciones que lo contienen están en
`CONVENCIONES.md`, y la más importante es la última: **estos números no se copian a
`data/` nunca.** Si mañana uno de esos clubes publica su balance de 2019, se carga
leyendo el documento.

El día que el merge termine, este archivo y su `<script>` se borran en el mismo
movimiento (**to-do 30**).

## 10. Verificación mínima antes de dar por bueno el merge

```bash
node tools/audit.js          # 0 P0, 0 P1
node tools/generate-club-index.js --check
node tools/generate-fuentes-page.js --check
```

Y en el navegador, `?audit=1` (o `auditAll()` en la consola): fuerza la carga de los
41 clubes y corre `verifyTieOuts()` + `checkFxSanity()`. Hoy: **41 clubes, 222
checks, 0 mismatches, 0 warnings.** Una carga normal de la página audita SOLO el
club activo, así que sin esto un error en un club que nadie está mirando es
invisible.

De la interfaz, los cinco caminos que hay que probar a mano:

1. Inicio → "ver un club" → buscar "boca" → tiene que aterrizar en Finanzas con sus números.
2. Inicio → "comparar dos" → card A con una liga entera → card B con un club → comparar.
3. Rama Ligas con DOS temporadas de la misma liga → el card final ofrece partirlas en los dos cards.
4. Rama Clubes con dos clubes → el paso 6 muestra un desplegable por club, y "+ Otro ejercicio" agrega uno sin repetir el mismo año.
5. Rama Mezcla → una liga en promedio + varios clubes en sumatoria → la fórmula y el aviso aparecen.

---

## Anexo: el mapa de `prototipo-cards-selector.js`

1.700 líneas, en este orden:

| Sección | Qué hay |
|---|---|
| Cabecera | Las tres vueltas de diseño y por qué de cada una. **Leerla antes que el código.** |
| Estado | `lado[2]`, `origen` ('vs' o 'finanzas'), `st` (los pasos), `bloques` (lo que se está armando). |
| Helpers de datos | Todo sale de los 4 archivos livianos: `clubs`, `CLUB_INDEX`, `leagues.js`, `club-leagues.js`. Ninguno puede necesitar un `data/<club>-data.js`. |
| `clubsQueQuedan()` | El filtro único del que salen TODOS los conteos. Si un paso cuenta distinto que el siguiente, se nota enseguida. |
| Los pasos | `PASOS_FILTRO` + `PASO_TIPO` + las ramas, ensamblados por `pasosActivos()`. |
| Cuerpos propios | `cuerpoLigaAnio()`, `cuerpoClubAnio()`, `cuerpoMezcla()` + `panelAgregar()`. |
| Cálculo | `paresDeBloque()` → `totalesDeBloque()` (aplica el agregador) → `totalesDe()` (suma bloques). Los números salen de `computeYearGeneric()`, el motor REAL. Nunca se reimplementa la cascada. |
| Portada | `render()`, `card()`, `cuerpoVacio()`, `cuerpoLleno()`, `renderResultado()`. |
| API pública | La misma que `js/selector.js`. |

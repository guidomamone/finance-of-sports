# PROMPT para Claude Code — Selector jerárquico + Comparación multi-sujeto

> **Cómo usar este archivo:** pegalo entero como primer mensaje de una sesión nueva de
> Claude Code en `finance-of-sports/`. Está escrito para que se lea solo, sin contexto previo
> de la conversación en la que se diseñó.
>
> El prototipo navegable de referencia está en `prototipo-selector.html`, misma carpeta.
> **Abrilo antes de escribir código** — define la UX acordada. Sus números son inventados
> y su taxonomía está embebida a mano; nada de eso se copia al sitio, solo la interacción.

---

## 0. Antes de tocar nada

Seguí el arranque normal del proyecto: `.claude/skills/start-session-finance-of-sports-project/SKILL.md`,
el comentario de `index.html`, y `CONVENCIONES.md`. Esta tarea NO toca datos financieros
de ningún club, así que no hacen falta los skills de `club-data-mapping` / `club-sourcing`.

Esta tarea SÍ toca el motor y el HTML principal, así que aplican los gotchas de tooling de
`CLAUDE.md` (caché de assets: subí `ASSET_V`; screenshot en blanco con scroll > 0).

---

## 1. Qué hay que construir, y por qué

Hoy el club se elige con un `<select id="clubSelect">` plano en el header
(`populateClubSelect()`, `index.html`). Con 41 clubes ya es incómodo; el objetivo declarado
del proyecto es 1000, y a esa escala un `<select>` alfabético es inusable: no se puede
buscar, no agrupa, y no dice nada de qué vas a encontrar adentro.

Lo reemplaza un **panel de selección jerárquico** Deporte › Región › País › Liga › Equipo,
con búsqueda por texto encima de la jerarquía. Y al lado, una **bandeja de comparación**
que cubre tres casos con un solo modelo: 1 vs 1, N clubes, y club vs. benchmark de liga.

**Dos principios que no se negocian, porque son los que separan esto de un selector genérico:**

1. **La jerarquía es opcional, no obligatoria.** El 90% de las visitas quieren un club que
   ya tienen en la cabeza. Escribir "boca" en la búsqueda tiene que llegar en un paso.
   La jerarquía es para explorar, no un peaje de 5 clicks para todos.
2. **El selector muestra la calidad del dato ANTES de entrar.** Cada club lleva su punto
   de color (balance oficial / mixto / placeholder / sin datos) y cuántos ejercicios tiene.
   Esto es coherente con la cultura de precisión del proyecto (`sources{}.reliability` ya
   existe en `data/clubs.js`): que el usuario no descubra recién adentro que el club que
   eligió es placeholder.

---

## 2. Cambios en el modelo de datos

Hoy `clubs{}` en `data/clubs.js` tiene 5 campos: `id`, `name`, `displayName`, `country`
(ISO-2), `reportingCurrency`, `fiscalYearStart`. **No hay deporte, región, liga ni división.**

### 2.1 Campos nuevos por club, en `clubs{}`

```js
boca: { id:'boca', name:'…', displayName:'Boca Juniors',
        country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01',
        sport:'futbol',        // NUEVO
        league:'ar-lpf' },     // NUEVO — la región sale del país, la división sale de la liga
```

**No agregues `region` ni `tier` al club.** Son derivables y duplicarlos es garantía de que
se desincronicen: la región sale del país (`COUNTRIES[country].region`) y la división sale
de la liga (`LEAGUES[league].tier`). Un solo lugar donde arreglar cada cosa.

`sport:'futbol'` en los 41 es redundante hoy, pero el campo tiene que existir desde ahora:
es lo que permite sumar un club de otro deporte sin volver a migrar los 41.

### 2.2 `data/leagues.js` — archivo nuevo

Mismo criterio que `data/clubs.js`: centralizado y chico, porque hace falta ANTES de que se
lazy-cargue ningún club (el panel arma la jerarquía completa al abrirse).

```js
const SPORTS   = [{id:'futbol', name:'Fútbol', icon:'⚽'}, …];
const REGIONS  = [{id:'sudamerica', name:'Sudamérica'}, {id:'europa', …}, …];
const COUNTRIES= { AR:{name:'Argentina', flag:'🇦🇷', region:'sudamerica'}, … };  // los 6 con datos + los que vengan
const LEAGUES  = { 'ar-lpf':{ name:'Liga Profesional', full:'Liga Profesional de Fútbol',
                              country:'AR', sport:'futbol', tier:1 }, … };
```

Convención de `id` de liga: `<iso2 minúscula>-<slug>` (`ar-lpf`, `es-laliga`, `jp-j1`,
`br-serieA`, `br-serieB`, `co-primeraA`, `mx-ligamx`). Es legible y no choca entre países.

Los nombres de país y de región son strings traducibles: van por `data/lang/` como todo el
chrome del sitio (`js/i18n.js`), NO hardcodeados en el HTML. Los nombres de liga y de club
**no se traducen** (mismo criterio que ya rige para los rubros de "Formato del club").

### 2.3 Las 7 ligas de los 41 clubes de hoy

Argentina (11) → `ar-lpf`. España (10) → `es-laliga`. Japón (10) → `jp-j1`.
México (1) → `mx-ligamx`. Colombia (2) → `co-primeraA`. Brasil (7) → repartidos entre
`br-serieA` y `br-serieB`.

> ⚠️ **PREGUNTALE A GUIDO ANTES DE ASIGNAR DIVISIÓN — no lo asumas.** Hay dos cosas sin
> resolver y ninguna se puede inferir del balance:
>
> **(a) Qué división le corresponde a cada club brasileño y a Envigado.** El prototipo puso
> Grêmio/Botafogo/Cruzeiro/Mirassol en Série A y Coritiba/Ituano/Atlético Goianiense en
> Série B, y Envigado en Primera A — eso es **una suposición sin verificar**, puesta solo
> para que el mock tuviera dos ligas brasileñas que mostrar.
>
> **(b) El problema de fondo: la división no es un atributo del club, cambia cada año.**
> Mirassol jugó la Série B y después la Série A; un club puede estar en dos divisiones
> distintas en dos de los ejercicios que el sitio ya tiene cargados. Meter `league` fijo en
> `clubs{}` es una simplificación consciente. Las opciones, para que Guido elija:
> 1. **`league` = liga actual del club** (simple, el selector agrupa por "dónde juega hoy").
>    Barato. Miente para los ejercicios históricos, pero el selector no promete otra cosa.
> 2. **`league` por ejercicio**, en `<club>FiscalYearMeta[year]`, y `clubs{}` guarda solo la
>    actual como default del selector. Correcto, y habilita a futuro "ingresos de la Série B
>    2024" de verdad. Más trabajo y toca los 41 archivos de datos.
>
> Mi recomendación: **opción 1 ahora**, con el campo pensado para que la 2 sea aditiva
> después (el selector lee `clubs[id].league`; si mañana existe un override por ejercicio,
> lo lee primero y cae al del club). Pero es decisión de Guido — es exactamente el tipo de
> criterio que `CLAUDE.md` pide preguntar en vez de asumir.
>
> Lo que quede sin respuesta, a `dudas-por-club.md`.

### 2.4 Clubes "próximamente"

El prototipo muestra, al final de cada liga, una fila apagada "19 clubes más de esta liga ·
sin balance cargado todavía". Da la escala real sin inventar datos. Para eso alcanza un
número por liga en `LEAGUES` (`totalClubs`), no hace falta listar clubes que no existen en
el sitio. Confirmá el conteo de cada liga contra una fuente antes de publicarlo.

---

## 3. El panel selector

Reemplaza a `#clubSelect`. El header pasa a tener un **botón** con el club activo (escudo +
nombre + liga · país) que abre el panel. `populateClubSelect()` se borra; su reemplazo arma
la jerarquía desde `clubs{}` + `leagues.js`.

**Estructura** (ver `prototipo-selector.html` funcionando):

- **Búsqueda arriba, autofocus.** Filtra clubes, ligas y países a la vez, agrupados por tipo.
  Insensible a acentos y mayúsculas (`norm()` en el prototipo). Elegir una liga desde la
  búsqueda lleva a la jerarquía parada en esa liga, no al primer club.
- **Recientes**, chips, persistidos en `localStorage` (mismo patrón que ya usa el selector de
  idioma de la Versión 115 para recordar la elección).
- **Miller columns** en desktop: las 5 columnas visibles a la vez, cada una con su conteo de
  clubes. Cada nivel tiene una opción "Todas las regiones / Toda la región / Todo el país",
  así se puede saltear niveles y quedarse en un conjunto en vez de bajar hasta un club.
- **Móvil (< 900px): una columna por vez + breadcrumb clickeable arriba.** Ya está resuelto
  en el prototipo con `.active-pane`. Es importante: el nav del header ya se recorta abajo de
  ~850px (to-do 9 de `index.html`), no metas un layout que empeore eso.
- **Footer con la leyenda** de los 4 estados de calidad de dato + el total del sitio.
- Cierra con Esc y con click en el backdrop. Se abre con `⌘K` / `Ctrl+K`.

**Estados de calidad del punto de color**, derivados de lo que ya existe — no un campo nuevo
tipeado a mano, porque un campo a mano se desincroniza del dato real:

| Punto | Significado | Cómo se calcula |
|---|---|---|
| 🟢 verde | Todos los ejercicios salen de documento oficial | todos los `sources` del club con `reliability:'primary'` |
| 🟡 amarillo | Mezcla de oficial y placeholder | hay de los dos (hoy: Boca, River, Club América) |
| ⚪ gris | Solo placeholder | ningún `reliability:'primary'` |
| ○ vacío | Club listado sin datos | no tiene `data/<club>-data.js` |

---

## 4. La bandeja de comparación

Guido pidió los tres modos (1v1, N clubes, y contra benchmark). **No los hagas tres features
distintas con tres UIs.** Un solo modelo los cubre:

`state.compare` es una lista de **sujetos comparables**, y cada uno es una de dos cosas:

```js
{ kind:'club',  id:'river' }
{ kind:'bench', id:'ar-lpf', stat:'avg' }   // o stat:'median'
```

El club activo del header es siempre la primera columna y no se puede sacar. El **modo se
deduce de la lista**, no se elige en un menú: 1 rival → "Duelo"; 2+ → "Múltiple"; solo
benchmarks → "Benchmark"; mezcla → "Mixto". El usuario nunca elige un modo, elige con quién
comparar y la vista se acomoda. Eso es lo que hace que "los tres" no cuesten tres veces.

- Se agrega desde el `+` de cualquier fila del panel (clubes **y ligas** — el `+` de una liga
  agrega su benchmark), o desde "+ Agregar" en la bandeja.
- Tope 4 rivales + el club activo = 5 columnas. Pasado el tope, entra el nuevo y sale el más
  viejo (FIFO), sin cartel de error.
- Click en un chip de benchmark alterna promedio ↔ mediana. **Mostrá cuál de los dos es**,
  siempre: en ligas con 2 clubes cargados (Colombia hoy) la diferencia es enorme y un
  "promedio" sin aclarar es engañoso.
- La bandeja aparece sola cuando hay al menos un rival; con la lista vacía no ocupa lugar.

**Un aviso que hay que poner, no es opcional:** un benchmark de liga calculado sobre los
clubes cargados **no es el promedio de la liga**, es el promedio de *los clubes de esa liga
que este sitio tiene cargados*. Con 10 de 20 clubes de LaLiga, y siendo justo los grandes los
que publican, el sesgo es gigante. Mostrá siempre "promedio de N clubes cargados de M" al
lado del valor. Este sitio es para periodistas; un promedio sesgado sin aclarar es
exactamente el tipo de dato que después se cita mal.

**Comparabilidad entre clubes — el problema que hay que resolver antes de mostrar la tabla:**
comparar dos clubes cruza tres cosas que el sitio hoy resuelve por club, no entre clubes:

1. **Moneda.** La comparación tiene que forzar USD, sin importar el toggle del header. Ya hay
   precedente explícito: "Comparar Gestiones" ignora el toggle de moneda a propósito (ver
   `js/finanzas-calc.js`, `computeGestion`). Seguí ese criterio, no inventes otro.
2. **Categorías.** Solo tiene sentido comparar en **Formato simplificado**
   (`normalizedCategory`), nunca en "Formato del club" — los rubros crudos de un balance
   argentino y uno japonés no son la misma cosa. Forzá simplificado en la vista de
   comparación y decilo en pantalla.
3. **Ejercicio.** Los clubes no cierran el mismo día (`fiscalYearStart` va de `01-01` a
   `09-01`) ni tienen los mismos años cargados. Por defecto: el **último ejercicio real de
   cada uno**, con el año de cada club escrito en el header de su columna para que la
   diferencia se vea. No lo escondas alineando por año calendario.

---

## 5. Qué NO romper

- **`loadClubData(clubId)` y la carga por demanda.** El panel muestra 41+ clubes pero no
  puede cargar ninguno hasta que se elija: se alimenta solo de `clubs{}` + `leagues.js`.
  Una comparación de 5 clubes sí dispara 5 `loadClubData()` — hacelas en paralelo
  (`Promise.all`), no en cascada.
- **`?audit=1` / `auditAll()`** tienen que seguir funcionando igual.
- **i18n**: todo string nuevo del panel va por `data/lang/`, con su clave. El sitio ya tiene
  ES + EN y agregar un idioma no debe tocar este HTML.
- **`ASSET_V`**: subilo. Tocás `js/` y `data/`.
- Al terminar: entrada en `CHANGELOG.md`, actualizar el comentario de `index.html`
  (ESTADO ACTUAL + to-do), y `CONVENCIONES.md` si alguna decisión de acá contradice una regla
  vigente (la de "el dropdown va siempre alfabético A→Z" de la Versión 96 queda obsoleta:
  ya no hay dropdown plano — actualizá esa línea en vez de dejarla mintiendo).

---

## 6. Orden sugerido

1. `data/leagues.js` + los 2 campos nuevos en los 41 clubes de `clubs.js`. **Pará acá y
   preguntá lo de las divisiones (§2.3) antes de seguir.**
2. Helper `clubQuality(clubId)` que deriva el punto de color desde `sources{}`.
3. El panel: botón de header, búsqueda, columnas, móvil. Sin comparación todavía.
4. Borrar `populateClubSelect()` y el `<select id="clubSelect">`.
5. La bandeja de comparación y la tabla multi-columna, con los 3 avisos de §4.
6. Verificar en el navegador (`?audit=1` limpio, tie-outs sin cambios) y spot-check en móvil.

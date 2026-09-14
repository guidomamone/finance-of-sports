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
3. **Las dos funciones tienen que verse solas.** Feedback textual de Guido sobre la primera
   versión del prototipo: *"si yo llego al site en frío, no me termina de quedar claro cómo
   elegir y/o cambiar de equipo. Y la función de comparar clubes no me queda clara."* Un
   control que hay que descubrir es un control que no existe. Ver §3.0 y §4.0: no son
   detalles de pulido, son el problema principal a resolver.

---

## 2. Cambios en el modelo de datos

### 2.0 La decisión que ordena todo lo demás: la unidad comparable es (club, ejercicio)

Guido levantó dos cosas que parecen separadas y son la misma: *"en el comparador falta el
año. Podría ser que alguien quiera comparar River de un año contra otro equipo, otro año"*, y
*"los clubes suben y bajan de categoría, no se account for that."*

Las dos se caen solas si el sujeto del sitio deja de ser **el club** y pasa a ser
**el club en un ejercicio**:

- El comparador necesitaba el año porque un club sin ejercicio no es un dato, es un promedio
  de nada. Con el par, cada columna/barra lleva el suyo.
- **River 2020/21 vs River 2024/25** deja de ser un caso especial: son dos sujetos distintos,
  igual que dos clubes distintos. No hace falta una feature de "comparar contra sí mismo".
- La categoría deja de contradecirse. "Mirassol Série B 2024" y "Mirassol Série A 2025" son
  dos sujetos, cada uno con su liga. La liga es un atributo del **par**, no del club.

Consecuencia directa: **el promedio de liga también es (liga, ejercicio)**, nunca liga sola.
"Promedio Série B" sin año no significa nada si los integrantes cambian todos los años.

Todo lo que sigue en esta sección asume eso.


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

### 2.3b Ascensos y descensos: `league` en dos niveles

`clubs[id].league` es **la liga de HOY**, y sirve para una sola cosa: agrupar en el selector.
La liga que de verdad se usa para leer un dato sale del ejercicio:

```js
// data/<club>-data.js, dentro de <club>FiscalYearMeta[year]
2024: { currency:'BRL', fx:…, league:'br-serieB' },   // override, OPCIONAL
```

```js
// resolución, un solo helper, en js/finanzas-calc.js
const leagueAt = (clubId, year) =>
  (window.CLUB_GENERIC_DATA[clubId]?.fiscalYearMeta?.[year]?.league) || clubs[clubId].league;
```

Es aditivo y barato: **solo los clubes que efectivamente se movieron llevan el override**, el
resto no toca nada. Está implementado en el prototipo (`LG_BY_YEAR`), con Mirassol y Coritiba
cargados a propósito para verlo funcionar: poné Mirassol 2024 al lado de Mirassol 2025 y se
ve el salto de ingresos de Série B a Série A, con el aviso correspondiente.

Dónde tiene que respetarse `leagueAt()`, no `clubs[id].league`:

- el promedio/mediana de liga (quién integra la liga ESE año),
- la etiqueta del sujeto en la comparación, cuando difiere de la categoría actual,
- cualquier ranking de liga de un ejercicio pasado.

> ⚠️ **DOS COSAS PARA PREGUNTARLE A GUIDO ANTES DE CARGAR NADA:**
>
> **(a) Qué división le corresponde a cada club brasileño y a Envigado, año por año.** El
> prototipo puso Grêmio/Botafogo/Cruzeiro/Mirassol en Série A y Coritiba/Ituano/Atlético
> Goianiense en Série B, y Envigado en Primera A: es **una suposición sin verificar**, puesta
> para que el mock tuviera dos ligas brasileñas que mostrar. Verificalo contra fuente antes
> de cargarlo, como cualquier otro dato del sitio.
>
> **(b) Qué liga le corresponde a un ejercicio que cruza dos temporadas.** Para Brasil o Japón
> (ejercicio = año calendario) es directo. Para un club argentino con ejercicio jul-jun que
> ascendió a mitad de camino, el balance mezcla ingresos de dos categorías y hay que decidir
> un criterio: ¿la categoría en la que cerró el ejercicio? ¿la de la temporada que terminó
> adentro? ¿se marca como mixto? No lo inventes. Anotá lo que quede abierto en
> `dudas-por-club.md`, que es la lista con la que Guido les escribe a los clubes.

### 2.4 Clubes "próximamente"

El prototipo muestra, al final de cada liga, una fila apagada "19 clubes más de esta liga ·
sin balance cargado todavía". Da la escala real sin inventar datos. Para eso alcanza un
número por liga en `LEAGUES` (`totalClubs`), no hace falta listar clubes que no existen en
el sitio. Confirmá el conteo de cada liga contra una fuente antes de publicarlo.

---

## 3. El panel selector

### 3.0 Que se entienda que se puede cambiar de club (lo más importante de esta sección)

Hoy el sitio abre en Boca con un `<select>` chico en un header azul. Alguien que llega en
frío no tiene forma de saber que el sitio es multi-club: no hay nada que se lea como
"acá elegís". Tres cambios, los tres necesarios, ninguno alcanza solo:

**(a) Estado inicial sin club elegido.** Si no hay club en `localStorage`, el sitio **no
abre en Boca**: abre en un hero con el buscador grande, 6-8 clubes de acceso rápido con su
escudo, y los chips de las ligas disponibles. Es la única pantalla donde la elección de club
es *la* tarea, y resuelve el cold start de una. Elegido un club, queda guardado y las visitas
siguientes entran derecho a su club. Está armado en el prototipo, botón "↺ Ver como visitante
nuevo" para verlo.

> Decidí con Guido si el hero aparece también para quien ya eligió club alguna vez (ej. un
> link "cambiar de club" que vuelve al hero), o solo la primera vez. El prototipo asume
> solo la primera vez.

**(b) El botón del header tiene que leerse como un control.** Borde dorado (el acento del
sitio), eyebrow "ESTÁS VIENDO" arriba del nombre, y la palabra **"Cambiar ▾"** visible, no un
caret solo. En el prototipo anterior era un pill azul sobre header azul con una flechita: se
leía como un título, no como un botón. El de ahora se lee.

**(c) Coach mark en la primera visita.** Globito dorado abajo del botón: "Elegí tu club acá".
Se va al primer click y no vuelve (flag en `localStorage`). Un solo cartel, sin tour de varios
pasos.

### 3.1 El panel

Reemplaza a `#clubSelect`. El header pasa a tener un **botón** con el club activo (escudo +
nombre + "Cambiar") que abre el panel. `populateClubSelect()` se borra; su reemplazo arma
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
- Se abre con `⌘K` / `Ctrl+K`.

**Salir del panel tiene que ser un botón visible, en los dos modos.** Otro pedido de Guido,
sobre la v3: *"Esc o clickear afuera es LA ÚNICA manera en la que el usuario puede salir de
ese selector. Es mala UX."* Tenía razón, y en móvil es peor: **no hay tecla Esc**, y el panel
ocupa casi toda la pantalla, así que "clickear afuera" es una franja de pocos píxeles. Esc y
el backdrop quedan como atajos para quien los conoce, nunca como el camino principal. Hacen
falta **dos salidas visibles**, y las dos tienen que existir también en el modo de cambiar
club, no solo en el de comparar:

- **Arriba a la derecha**, al lado del buscador: un botón con borde y la palabra *"✕ Cerrar"*.
  No un `×` gris de 20px sin caja, que es lo que había en la v3 y no se lee como botón.
- **Abajo a la derecha**, en la franja del pie: *"Cerrar sin cambiar"*. Es donde cae el pulgar
  en un teléfono, y el texto aclara que salir de ahí no te deja en otro club. En el modo
  comparar ese lugar lo ocupan "Cancelar" y "Ver comparación", que cumplen la misma función.
- En móvil, la franja de abajo se queda **sticky** y el botón principal pasa a ancho completo.
  El conteo de clubes se esconde antes que el botón: si algo tiene que salir por falta de
  espacio, que sea el texto informativo, nunca la salida.

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

### 4.0 Que se entienda qué hace

Mismo problema que §3.0: un botón `⇄` suelto en el header no le dice a nadie qué es. Tres
puntos de entrada, y ninguno es un ícono mudo:

- **Botón con texto en el header: "⇄ Comparar"** (en móvil sí queda solo el ícono, no entra
  el texto).
- **Una tarjeta dentro del contenido**, abajo de los KPIs del club: *"Compará Boca Juniors con
  otro club — poné dos clubes lado a lado, o medilo contra el promedio de su liga"* + botón
  "Elegir con quién comparar". Es el punto de entrada que de verdad se usa, porque aparece
  donde el usuario ya está mirando números y se le ocurre la pregunta. Desaparece cuando ya
  hay una comparación activa.
- **Cuando el panel se abre para comparar, lo dice en un banner arriba**: "Elegí con quién
  comparar a *Boca Juniors*. Tocá un club para sumarlo, o el **+** de una liga para comparar
  contra su promedio. Podés sumar hasta 4." Sin ese banner, el panel abierto desde "Comparar"
  se ve idéntico al panel abierto para cambiar de club, y el usuario cambia de club sin querer.

**Y una barra de confirmación abajo, con un botón explícito.** Pedido de Guido: *"cuando
selecciono un club para comparar, necesito un botón de OK o algo así, no queda obvio cómo
proseguir."* El caso es distinto al de elegir club: elegir club es **una** selección y el
panel se cierra solo, pero comparar es **multi-selección** (hasta 4 + benchmarks), así que el
panel no puede cerrarse al primer click. Y si no se cierra y no hay botón, el usuario agrega
uno y se queda esperando a que pase algo. La barra lleva:

- a la izquierda, **qué llevás elegido**, con escudo y ejercicio de cada uno ("Boca Juniors
  contra: River Plate 2024/25 · Prom. Liga Profesional 2024/25"). Con la lista vacía, dice qué
  hacer en vez de mostrar chips;
- **"Ver comparación (N)"**, dorado, deshabilitado mientras no haya nadie elegido. Cierra el
  panel y sube el scroll a la comparación, que es adonde el usuario quiere llegar;
- **"Cancelar"**, que revuelve el estado al que había al abrir el panel (snapshot en
  `openPanel`), no simplemente cerrar. Cerrar por cualquier otra vía **conserva** lo elegido:
  solo el "Cancelar" explícito descarta.

La barra reemplaza a la leyenda de calidad de dato mientras está visible, para no apilar dos
franjas en el borde de abajo del panel.

### 4.1 El modelo

Guido pidió los tres modos (1v1, N clubes, y contra benchmark). **No los hagas tres features
distintas con tres UIs.** Un solo modelo los cubre:

`state.compare` es una lista de **sujetos comparables**, y cada uno es una de dos cosas.
**Los dos llevan ejercicio** (§2.0):

```js
{ kind:'club',  id:'river',  year:2021 }
{ kind:'bench', id:'ar-lpf', year:2025, stat:'avg' }   // o stat:'median'
```

De ahí sale, sin código extra, el caso que pidió Guido: **el mismo club en dos ejercicios son
dos entradas de la lista**, no una feature aparte. Reglas de la lista:

- **La clave de identidad es `id + year`, no `id`.** River puede estar dos veces con años
  distintos; River dos veces con el mismo año, no: eso no es una comparación, es la misma
  columna dibujada dos veces. **Esto hay que hacerlo cumplir en los 4 lugares donde se puede
  llegar a un duplicado**, no solo al agregar. En la v3 del prototipo faltaba, y se podía
  comparar un club contra sí mismo en el mismo ejercicio (bug real, lo encontró Guido):
  1. el `+` del panel y de los resultados de búsqueda,
  2. el atajo "+ Otro año",
  3. el `<select>` de ejercicio de cada chip (los años ya ocupados van `disabled`),
  4. el `<select>` de ejercicio de la vista del club (el club activo **también ocupa** un
     ejercicio; si no, cambiás el año de arriba y chocás con un chip).
  La forma limpia es un solo helper `usedYears(clubId)` que devuelve los años ocupados
  contando al club activo, y `freeYear(clubId)` que devuelve el primero libre o `null`.
  Todo alta de sujeto pasa por ahí.
- El `+` del panel agrega el club con su **primer ejercicio libre**. Para el club activo eso
  es el anterior al que estás viendo, no el último (comparar algo contra sí mismo en el mismo
  año no dice nada).
- **Si no queda ningún ejercicio libre, el control no se ofrece.** El caso más común no es
  raro, es la mayoría del sitio: 30 de los 41 clubes tienen **un solo ejercicio cargado**, así
  que para casi todos "comparar contra otro año de este club" es imposible. El botón se
  esconde (no se muestra deshabilitado y sin explicación), y el `+` de ese club en el panel va
  deshabilitado con el motivo en el `title`: "Solo tiene 1 ejercicio cargado, y ya lo estás
  viendo". Nunca un botón que al tocarlo no hace nada.
- El ejercicio se cambia después, en un `<select>` dentro del chip. El año es del sujeto, no
  un filtro global: un filtro global haría imposible el caso que Guido pidió.
- Botón aparte **"+ Otro año"** en la bandeja y en la tarjeta CTA, que agrega el club activo
  con el ejercicio siguiente sin usar todavía. Atajo de un click, y sujeto a la regla de
  arriba: si no queda ejercicio libre, no aparece.
- **La vista de un club suelto también necesita el selector de ejercicio** (hoy `#anioSelect`
  ya existe en Finanzas; el punto es que Inicio y la comparación usen el mismo estado, no uno
  propio cada una).

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

### 4.1b Los tres avisos, ninguno opcional

Este sitio lo usan periodistas: una comparación que se ve prolija y es falsa termina citada
en una nota. Los tres se muestran arriba de las barras, cuando aplican (están implementados
en el prototipo):

1. **Sesgo del benchmark.** Un promedio de liga calculado sobre los clubes cargados **no es
   el promedio de la liga**, es el promedio de *los clubes de esa liga que este sitio tiene
   cargados ese año*. Con 10 de 20 de LaLiga, y siendo los grandes los que publican, el sesgo
   es enorme. Texto: "sale de los N de M clubes con ejercicio AAAA cargado".
2. **Ejercicios de años distintos.** Es la trampa más peligrosa de las tres, y aparece
   justamente en el caso que Guido pidió. Cada ejercicio se convierte a USD con el tipo de
   cambio que declara su propio balance, sin ajustar por inflación: la diferencia entre River
   2020/21 y River 2024/25 incluye el paso del tiempo, no solo al club. Decilo.
   > A futuro esto se arregla de verdad con una serie de deflactores, no con un aviso.
   > Preguntale a Guido si quiere abrir eso ahora o dejarlo anotado.
3. **Categorías distintas.** Si algún sujeto jugó ese ejercicio en otra división (`leagueAt`
   ≠ liga de hoy), nombralo explícitamente: "Mirassol jugó ese ejercicio en Brasileirão Série
   B, no en Série A (su categoría de hoy)". Y si hay sujetos de divisiones distintas entre sí,
   avisá que los ingresos por TV y premios no son comparables uno a uno.

### 4.2 Cómo se muestra: BARRAS, no una tabla de columnas

Pedido explícito de Guido, mirando el prototipo que le mandó un amigo: *"de la foto que te
compartí me gustaba lo de las barras comparando, hacetelo en vez de columnas."* La tabla de
números en columnas **no es el default**. La vista principal es:

**(a) Small multiples de barras horizontales, un bloque por indicador.** Dentro de cada
bloque, una barra por sujeto, cada una con el color del club y el valor al final. La escala
es **por indicador**, no global: comparar "Ingresos" contra "Deuda neta" en la misma escala
no significa nada. Grilla que se acomoda sola (`auto-fit, minmax(310px, 1fr)`), 3 columnas
en desktop, 1 en móvil.

- Indicadores que pueden dar negativo (Resultado del ejercicio) van con la **barra centrada
  en cero**, línea de cero visible, y las negativas en rojo hacia la izquierda. Una barra
  desde el borde izquierdo para un número negativo se lee al revés.
- El **benchmark se dibuja distinto**: dorado con trama diagonal y el nombre en itálica, para
  que no se confunda con un club. No es un club, es un agregado.
- Marcá en verde el valor que gana **entre clubes** (el benchmark no compite). Qué es "ganar"
  lo define el indicador: ingresos alto es mejor, deuda y masa salarial bajo es mejor.

**(b) "Composición de ingresos", barras apiladas al 100%, una por club.** Esto es lo que se
ve en la foto de referencia. Al normalizar a 100% se compara *la mezcla* (cuánto depende cada
club de TV vs. socios vs. venta de pases), que es la pregunta interesante, y no queda tapada
por la diferencia de tamaño entre Real Madrid y Unión. El importe total va al costado, en
texto, para no perderlo.

**(c) Toggle "Barras / Tabla".** La tabla sigue existiendo, en segundo plano, para quien
quiere el número exacto y copiarlo — este sitio lo usan periodistas. Pero abre en Barras.

**Comparabilidad entre clubes — el problema que hay que resolver antes de dibujar nada:**
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
   cada uno**, editable por sujeto, con el año escrito al lado de cada barra para que la
   diferencia se vea. No lo escondas alineando por año calendario. La etiqueta del año sigue
   la convención que ya usa el sitio: `isCalendarYearClub()` decide entre "2024" y "2023/2024",
   no lo reimplementes.

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

1. `data/leagues.js` + los 2 campos nuevos en los 41 clubes de `clubs.js` + el helper
   `leagueAt(clubId, year)` (§2.3b). **Pará acá y preguntá lo de las divisiones (§2.3b)
   antes de seguir.**
2. Helper `clubQuality(clubId)` que deriva el punto de color desde `sources{}`.
3. El panel: botón de header (§3.0b), búsqueda, columnas, móvil. Sin comparación todavía.
4. Borrar `populateClubSelect()` y el `<select id="clubSelect">`.
5. Cold start (§3.0a) + coach mark (§3.0c), con sus flags en `localStorage`.
6. La bandeja de comparación con **ejercicio por sujeto** (§4.1), sus 3 puntos de entrada
   (§4.0), la vista de barras (§4.2), y los 3 avisos (§4.1b) + las 3 reglas de
   comparabilidad (moneda, categorías simplificadas, ejercicio).
7. Verificar en el navegador (`?audit=1` limpio, tie-outs sin cambios) y spot-check en móvil,
   que es donde el header se rompe primero.

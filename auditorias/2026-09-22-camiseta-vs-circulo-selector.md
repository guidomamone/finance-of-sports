# Research 2026-09-22 — reemplazar el círculo de iniciales por una ilustración de camiseta

**Qué es esto:** pros/contras y recomendación para el to-do 39 de `TODO.md`, pedido explícito de
Guido: evaluar reemplazar el círculo de iniciales con `brandColor` (Versiones 178-180, 189) por una
ilustración de camiseta por club, como hace soccerassociation — para Vélez, blanca con una V
celeste/azul en el pecho; para Boca, azul con una franja horizontal amarilla al medio. Ilustraciones
planas, bloques de color sólido, sin textura, sin sponsor, sin escudo, sin foto. Acotado a deportes
de equipo, y Guido ya aceptó achicar el alcance a la camiseta sola, sin el pantalón.

**Esto es investigación, no implementación.** No se tocó código ni `TODO.md`. El punto 39 sigue
abierto hasta que Guido lea esto y decida.

---

## 1. Qué hay hoy, en los 4 lugares donde se pinta

El círculo vive en `js/selector.js` (`pintarCrest()` línea 193, `textoSobre()`/`luminancia()`
arriba) y se usa en 4 sitios de `index.html`, con tamaños y densidad de aparición bien distintos:

| Clase / id | Dónde | Tamaño | Cuántos a la vez |
|---|---|---|---|
| `.op-crest` | fila de la grilla de clubes del modal (paso "Elegí uno o más clubes") | 24×24px (`index.html:511`) | hasta 41 filas, lista angosta y scrolleable |
| `.arm-crest` | fila del constructor de Mezcla, rama Clubes | 24×24px (`index.html:547`) | pocas — los clubes que el visitante fue agregando a mano |
| `.cd-crest` | card resumen de un lado, pestaña Comparar | 34×34px (`index.html:649`) | 1 o 2 (un card por lado) |
| `#cbCrest` (`.crest`) | botón de club del header | 26×26px (`index.html:110`, `index.html:813`) | 1, visible en toda página |

Lo que hace bueno al círculo hoy, y que cualquier alternativa tiene que igualar o justificar por
qué no hace falta:

- **Se deriva de UN solo dato** (`clubs[id].brandColor`, ya cargado en `data/clubs.js` para los 41).
  No hay arte nuevo que mantener: el círculo del club #42 sale solo el día que alguien le pone un
  `brandColor`.
- **El contraste está garantizado por fórmula**, no por ojo: `textoSobre()` calcula luminancia WCAG
  y decide blanco o negro, con un piso medido de 4,11:1 sobre los 39 clubes con color (comentario de
  `js/selector.js:184-188`). Nadie tiene que revisar a mano si las iniciales se leen sobre el fondo.
- **`brandColor:null` ya es una salida limpia** para los casos ambiguos (Real Madrid, Once Caldas):
  cae al azul del sitio sin romper nada.

---

## 2. Origen del asset: ¿fórmula o contenido por club?

Esta es la bifurcación central, y las dos ramas tienen naturalezas muy distintas.

### 2a. Generador paramétrico (un SVG por *patrón*, params por club)

La idea: en vez de un solo campo (`brandColor`), cada club declara un patrón (`solido`,
`bandaHorizontal`, `bastonesVerticales`, `sash`/banda diagonal, `v-pecho`, `rayas horizontales`,
…) más los colores que ese patrón necesita, y una función tipo `pintarCamiseta()` dibuja el SVG en
runtime — mismo modelo que `pintarCrest()` hoy, un paso más de datos.

Mirando los 41 clubes con lo que ya sé de sus camisetas históricas (no verificado club por club
todavía — ver §5), el mínimo de patrones para cubrir la mayoría sin mentir demasiado ronda **6**:
sólido (Independiente, la mayoría de los japoneses), bastones verticales finos o gruesos (Racing,
Estudiantes, Barcelona, Athletic Club, Grêmio, Botafogo, Coritiba), banda horizontal (Boca), banda
diagonal/sash (River), V en el pecho (Vélez), rayas horizontales (San Lorenzo). Y ya en ese primer
pase aparecen casos que un patrón genérico solo APROXIMA, no replica: el detalle del escudo-V de
Vélez, el ancho y conteo exacto de bastones de Barcelona (5 franjas, no 2), el filo diagonal negro
de Valencia sobre blanco, el verde+blanco puntual de Coritiba ("Coxa"). Ninguno rompe el sitio, pero
tampoco es gratis fingir que "bastones verticales" es una sola cosa.

**Pros:** escala como `brandColor` — un campo de datos más, no arte nuevo; consistencia visual
garantizada entre los 41 (y los que vengan); el onboarding de un club nuevo sigue siendo "completar
2-3 campos", no "encargar un dibujo".

**Contras:** exige decidir Y VERIFICAR el patrón real de cada club, que es un trabajo de sourcing
nuevo (ver §5) — y un patrón con 6-8 primitivas nunca va a ser fiel al 100%, va a ser "razonablemente
parecido". Para un sitio que se para en "somos verificables" (`Prototyping/README.md`, sobre por qué
se borraron los datos inventados), aproximar el diseño de una camiseta es un estándar más bajo del
que el sitio aplica a los números, y conviene decirlo así de entrada en vez de venderlo como
"preciso".

### 2b. Réplica manual por club (un asset hecho a mano, club por club)

La alternativa: un ilustrador (humano o generado y curado) hace un SVG por club que replica de
verdad su casaca — sin sponsor ni escudo, como pide Guido, pero fiel en patrón y color.

**Pros:** fidelidad real, sin el "más o menos" del generador.

**Contras:** es la rama que este proyecto ya rechazó en otro contexto análogo. El motivo por el que
`brandColor` funciona en 41 países sin volverse una carga es que es UNA fórmula (`pintarCrest()`) más
UN dato por club (`clubs[id].brandColor`); 41 SVGs hechos a mano son 41 piezas de contenido, no una
fórmula, y esa es exactamente la distinción que separó `data/clubs.js` (campo, escala) de "escudo
como imagen" (asset por club, no escala) cuando se descartó el punto 23(e) original
(`CONVENCIONES.md:535`). Además, a diferencia de un balance (que no cambia una vez publicado), una
casaca SÍ cambia — de sponsor todos los años, a veces de diseño — así que un asset a mano necesita
mantenimiento continuo que un `brandColor` (mucho más estable en el tiempo) no pide.

**Conclusión de esta sección:** si se avanza, tiene que ser 2a. 2b repite el error que
`CONVENCIONES.md` ya identificó y corrigió una vez.

---

## 3. Derechos

El precedente directo es el propio to-do 23(e): usar el ESCUDO como imagen se descartó por derechos
y hosting — "el repo se deploya entero, así que la imagen se serviría desde el dominio propio"
(`CONVENCIONES.md:535`). Antes de asumir que una camiseta cae en el mismo lugar, vale la pena mirar
en qué se parece y en qué no:

- **Un escudo es una marca registrada** — un logo discreto, protegible como tal, y clonarlo (aunque
  sea redibujado) es reproducir esa marca.
- **Un patrón de colores de camiseta, dibujado plano, sin sponsor y sin escudo**, es una categoría
  más parecida a lo que YA hace `brandColor`: describir con bloques de color un hecho público sobre
  la identidad del club (river es rojo y blanco, Boca es azul y oro), no reproducir un activo
  registrado. Es también, en los hechos, la misma convención visual que usan a diario Sofascore,
  FotMob, transfermarkt y cualquier gráfico de tabla de posiciones en TV: un ícono de camiseta
  genérico junto al nombre del club.

**Pero "es lo que hace todo el mundo" no es el estándar que este proyecto se puso a sí mismo.** La
nota de `brandColor` en `CONVENCIONES.md` es cuidadosa incluso con un solo hex; acá el diseño
completo de una camiseta (banda, sash, V) es visualmente mucho más distintivo y reconocible que un
color suelto — el caso límite es justo Boca y River, cuyo diseño de camiseta es casi tan identificable
como su escudo. No hay una respuesta clara de "sí, no hay problema" que este research pueda dar sin
asumir de más. **Se deja como pregunta abierta para Guido en §7**, con la misma postura que
`brandColor` usa para sus propios casos ambiguos: no se resuelve adivinando, se pregunta.

---

## 4. Costo de mantenimiento: un segundo dato por club

`brandColor` ya es parte del onboarding de un club nuevo (`club-or-year-onboarding/SKILL.md` §3
punto 1b), y ese mismo documento deja un registro honesto de cuánto costó resolverlo bien: dos capas
de verificación (identidad primero — Wikipedia en el idioma del país o declaración oficial de la
liga — y recién después el hex), 4 trampas ya pagadas (theme-color que no sirve para descubrir,
primer color de un agregador que es el del escudo y no la camiseta, bicolores en partes iguales,
y **6 de los 41 clubes — el 15%, camiseta blanca con acento fuerte, justamente el caso de Vélez que
motiva este pedido — que no se resolvieron buscando más y se mandaron directo a Guido**).

Un patrón de camiseta es un espacio de diseño más rico que un solo hex: no es "¿qué color?" sino
"¿qué color primario, qué color secundario, qué forma tiene el patrón, y sobre qué franja del
torso?". Es razonable esperar una tasa de ambigüedad IGUAL o MAYOR al 15% que ya dejó `brandColor`
— y con un problema nuevo que el hex no tenía: `brandColor` pidió el color "actual *y* si hubo
cambios históricos, en el mismo prompt" porque el color es relativamente estable; el PATRÓN de una
camiseta cambia de diseño con más frecuencia que el color identitario del club, así que "¿cuál es EL
patrón de este club" es una pregunta menos estable en el tiempo que "¿cuál es SU color".

Esto no es un costo de código — el código de `pintarCrest()`/`textoSobre()` ya resuelve el problema
de contraste y reset, y extenderlo a un segundo campo es un cambio chico. El costo real es de
SOURCING: duplicar, para patrón, el mismo trabajo de verificación multi-fuente que `brandColor` ya
demostró que no es gratis, con una tasa de casos-Guido probablemente más alta.

**El argumento real a favor, y no hay que minimizarlo:** el color solo no siempre alcanza para
distinguir. Agrupando los 39 `brandColor` no-nulos de `data/clubs.js` por distancia RGB (una métrica
cruda, no de percepción humana — mezcla el verde de Coritiba con un cluster de azules por error de
la métrica, así que estos números son una cota, no un dato fino), **14 de los 39 caen en un mismo
cluster de "rojo"** (River, Instituto, Independiente, Argentinos, Estudiantes, Unión, Kashima,
Urawa, Nagoya, Ituano, Atlético Goianiense, Atlético Madrid, Athletic Club, Sevilla) y otros **~13 se
reparten en 2-3 clusters de "azul"** (Boca, Rosario Central, San Lorenzo, Vélez, Cruzeiro, Barcelona,
Alavés, Racing, Grêmio, Yokohama Marinos, Gamba Osaka, FC Tokyo, Kawasaki, Celta). Son 27 de 39
clubes — más de dos tercios — compitiendo por dos familias de color en una lista donde hoy se leen
como círculos casi idénticos a 24px. Ahí un patrón (bastones vs. sólido vs. banda) sí distingue lo
que el color no puede.

---

## 5. Alcance por deporte

Guido ya lo acotó a deportes de equipo, y con eso alcanza para este research: hoy los 41 clubes de
`data/clubs.js` son TODOS `sport:'futbol'` (no hay ningún club de otro deporte cargado todavía para
probar el caso límite), así que el fallback para un deporte individual o sin patrón de camiseta claro
no es un problema HOY, es un problema del día que se cargue el primer club de otro deporte — mismo
"techo del modelo, no tarea" que ya tiene anotado el to-do 20 sobre la taxonomía de rubros
(`TODO.md`, sección final de ese punto). La salida es la misma que ya usa `brandColor`: sin patrón
definido, cae al círculo de color (o al azul del sitio si tampoco hay `brandColor`), sin costo extra
de código — `pintarCrest()` ya sabe volver al default.

---

## 6. Costo de implementación real, mirando los 4 call sites

No es parejo entre los 4 lugares, y la diferencia importa para decidir el alcance:

- **`.op-crest` (24px, hasta 41 filas a la vez) y `.arm-crest` (24px)** son los dos contextos donde
  un patrón se lee peor: a ese tamaño, dos iniciales en negrita sobre un fondo sólido funcionan
  porque son formas simples de alto contraste calculadas para leerse — un patrón de bastones finos
  (Estudiantes, Barcelona) o una banda diagonal (River) en 24px, dentro de una lista densa de hasta
  41 filas, corre el riesgo de volverse ruido visual en vez de una marca reconocible. Es justo el
  mismo problema que ya resolvió `textoSobre()` para el contraste de las iniciales, pero un patrón no
  tiene un equivalente tan simple de "garantizar legibilidad por fórmula".
- **`.cd-crest` (34px, 1-2 en pantalla) y `#cbCrest` (26px, 1 instancia, visible en toda página)**
  son los dos contextos donde SÍ hay margen: menos instancias a la vez, más espacio relativo, y en el
  caso del header hasta se podría agrandar sin romper el layout (es un solo nodo).
- El código en sí (un SVG por patrón, reusando el mismo mecanismo de contraste de texto donde haga
  falta) es un costo moderado, comparable al que ya costó agregar `pintarCrest()`. No es ahí donde
  está el riesgo de esta propuesta — está en el sourcing (§4) y en la legibilidad de los dos sitios
  de mayor densidad.

---

## 7. Resumen

| | Círculo de color (hoy) | Camiseta — generador paramétrico | Camiseta — réplica manual |
|---|---|---|---|
| Origen del asset | 1 campo, ya cargado | 1 fórmula + 2-3 campos nuevos por club | contenido por club, no escala |
| Fidelidad | N/A (no pretende representar la casaca) | aproximada — 6-8 patrones para 41+ diseños reales | alta |
| Derechos | sin duda (es solo un color) | probablemente defendible, pero sin precedente claro en el proyecto — **preguntar** | mismo terreno, sin la ventaja de "es solo color" |
| Costo de sourcing | ya pagado (barrida Versión 178) | nuevo, con una ambigüedad esperable ≥15% (el piso que dejó `brandColor`) | nuevo, por club, y se repite cada vez que cambia el diseño |
| Distingue clubes del mismo color | no | sí — el argumento más fuerte a favor | sí |
| Legibilidad a 24px (op-crest, arm-crest) | probada, garantizada por fórmula | riesgo real, sin verificar | riesgo real, sin verificar |
| Escala a club #42 | sola | con el mismo trabajo de sourcing que #1-41 | no escala |

## Recomendación

No es un "no": el argumento de §4 (27 de 39 clubes compitiendo por dos familias de color) es real y
no es un capricho estético. Pero tampoco es un "sí" directo, por tres motivos que conviene resolver
ANTES de tocar `selector.js`, no durante:

1. **Es un generador (2a), nunca réplica manual (2b).** Eso ya lo deja claro §2 — 2b repite un error
   que el proyecto ya identificó y corrigió una vez con los escudos.
2. **La pregunta de derechos de §3 no la puede cerrar esta sesión.** Es distinta de la de un escudo,
   probablemente más defendible, pero no idéntica ni obviamente resuelta — hay que preguntarle a
   Guido antes de invertir en el generador, no después.
3. **Antes de barrer los 41, valdría la pena un piloto acotado**: los clubes del cluster de "rojo" y
   los 2-3 clusters de "azul" de §4 (unos 27 de 39) son exactamente donde el color solo falla hoy, y
   son el subconjunto donde un patrón rinde más por unidad de trabajo. Diseñar ahí primero (menos de
   1 patrón nuevo por 4-5 clubes agrupados) deja probar la legibilidad real a 24px en `.op-crest` con
   SVGs de verdad, antes de comprometerse a sourcear los 41.

## Lo que le queda a Guido para decidir

- **(a)** ¿Avanza con el generador paramétrico (2a)? *(mi lectura: si el punto 3(b) de abajo sale
  bien, sí)*
- **(b)** Derechos: ¿una ilustración plana sin sponsor ni escudo, basada en el patrón de color público
  de la casaca, le parece del mismo terreno que `brandColor`, o quiere tratarla con más cautela?
  *(sin lectura mía — es la pregunta que este research no puede contestar solo)*
- **(c)** Si avanza: ¿todos los 41 de una barrida (como `brandColor` en la Versión 178), o el piloto
  acotado de §"Recomendación" punto 3 primero? *(mi lectura: el piloto primero)*

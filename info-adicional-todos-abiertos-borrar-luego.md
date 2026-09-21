# Info adicional para los to-dos que quedaron abiertos

**ESTE ARCHIVO ES TEMPORAL Y SE BORRA.** Lo pidió Guido el 2026-09-20 para no ensuciar `TODO.md`
con medio kilo de contexto: acá va la información que una sesión futura va a necesitar para cada
punto abierto y que hoy no está escrita en ningún lado. La idea es que Guido lo trabaje, decida, y
lo borre — lo que sobreviva se muda al punto de `TODO.md` que corresponda o a un skill.

**No está publicado**: `netlify.toml` lo saca del deploy, igual que el resto de los documentos
internos.

Los puntos van en el mismo orden que `TODO.md`. **Solo están los que ganan algo con esto**; los que
ya tienen todo lo que hace falta escrito en su propio punto (el 22, que tiene su skill) no aparecen
acá.

---

## 33 y 23(c) — LOS RANKINGS Y LA VISTA DE LIGA

**LA PREMISA DEL PUNTO 33 ESTÁ VENCIDA, Y ES LO MÁS IMPORTANTE DE ESTE ARCHIVO.** Dice que no se
hacen los rankings porque "hace falta masa crítica de datos" y que "un ranking de la Premier no
existe todavía". Medido el 2026-09-20 contra `data/club-leagues/`, **hay tres rankings viables hoy**:

| Liga-temporada | Clubes cargados | Sirve |
|---|---|---|
| **`jp-j1` 2025** | **10** | Sí. Es la mejor: 10 clubes del mismo ejercicio, misma moneda, misma fuente |
| **`es-laliga` 2025** | **9** | Sí. 9 de 20 de LaLiga, todos 2024/25 |
| **`ar-primera` 2024** | **8** | Sí |
| `ar-primera` 2025 | 5 | Justo |
| `ar-primera` 2015, 2016, 2023 | 4 | Flojo |
| `ar-primera` 2017-2019, 2022; `br-serieB` 2024 | 3 | Flojo |
| todo lo demás (12 liga-temporadas) | 1 o 2 | No |

O sea que el bloqueo real no son los datos: es que **`jp-j1` 2025 es un ranking de 10 clubes listo
para dibujar**. Ojo con una ironía: es también la liga cuyos clubes NO publican gastos, así que el
ranking tiene que ser de INGRESOS, que es justo lo que el punto 33 proponía.

**Lo que hay que resolver igual, y no cambió:** un ranking es (liga, EJERCICIO), no (liga). Hay que
elegir el año y decir cuántos de sus integrantes tienen ese ejercicio cargado — "10 de 20", no "los
10 cargados". Eso depende del punto 23(b), abajo.

**La infraestructura ya existe:** `clubsOfLeagueYear()` (`data/club-leagues.js`) contesta quiénes
integraban la liga ese año. Y `data/club-index.js` tiene `yrs` por club, así que se puede saber
quién tiene ese ejercicio SIN bajar ningún `data/<club>-data.js`.

**El costo de carga sigue siendo el problema de fondo**, y la salida ya está identificada en el
propio punto 33: precalcular un `data/rankings.js` con una herramienta de `tools/`, como ya se hace
con `fuentes.html` y con la sección generada de `ESTADO.md`. Con eso el ranking no baja 10 archivos
de club por visita. **Si se hace así, acordarse de sumarlo al checklist de onboarding**, que es
donde se olvidan los generados.

## 23(b) — `totalClubs` POR TEMPORADA

Verificado el 2026-09-20: **las 8 ligas de `data/leagues.js` tienen `totalClubs:null`, las 8.** El
campo existe y no lo llena nadie.

Y el punto ya avisa lo que importa: **no es un número por liga, es un número por liga-temporada.**
La Primera División de Argentina pasó de 20 a 30 equipos en el período cargado. O sea que el dato
tiene la misma forma que la membresía y probablemente el mismo lugar: `data/club-leagues/<iso2>.js`,
no `leagues.js`.

Las 8 ligas y los años que hacen falta salen de la tabla del punto anterior: son 27 pares
liga-temporada en total, pero **los 3 que habilitan un ranking son `jp-j1` 2025, `es-laliga` 2025 y
`ar-primera` 2024**. Con esos 3 alcanza para empezar.

## 23(e) — ESCUDOS

`clubs{}` (`data/clubs.js`) tiene hoy: `id, name, displayName, country, reportingCurrency,
fiscalYearStart, sport`. **No hay ningún campo de color ni de imagen**, así que agregar escudos es
agregar un campo nuevo a los 41.

Dos caminos, con costos muy distintos:
- **Solo color** (`brandColor:'#004b9f'`): 41 datos, sin tema de derechos, y arregla lo que el punto
  dice que importa (que el selector y las barras se lean). Un color equivocado se lee peor que
  ninguno, así que hay que verificarlos uno por uno.
- **Imagen**: hay que resolver derechos y hosting. El repo se deploya entero, así que los archivos
  irían al repo y se servirían desde el dominio propio — que es exactamente lo que un club puede
  objetar.

**Recomendación para la sesión que lo agarre: empezar por el color.** Es el 80% del beneficio visual
con el 5% del riesgo, y no bloquea agregar imágenes después.

## 38 — BUSCADOR EN LA GRILLA DE MEZCLA

Está en `js/selector.js`. El modal ya tiene un buscador que funciona (`#modalQ`, con debounce de
160 ms y tope de 30 desde la Versión 165) — **el trabajo es reusar ese mismo patrón en la grilla de
"elegir clubes" del constructor de mezcla, no escribir uno nuevo.**

Lo que ya tiene la grilla desde la 165: tope de 30 con "Mostrar más" y el conteo real, y los ya
marcados siempre primero. Lo que le falta es el campo de filtro.

**Ojo con lo que NO hay que romper:** los ya marcados tienen que seguir apareciendo aunque no
matcheen el filtro, o el visitante cree que se le borró la selección. Es el mismo problema que la
165 resolvió con el orden.

## 26 — MÓVIL, EL HEADER A 375px

No hace falta volver a medir nada: el punto ya tiene los números (`.header-right` mide 480px en
347px disponibles, `scrollWidth` 494 contra 375) y las dos salidas con su costo. **Está esperando
que Guido elija (a) o (b), nada más.**

Un dato que puede ayudar a decidir y no está en el punto: la opción (a) lleva el header sticky de
138px a 181px, que en un iPhone de 812px de alto es el 22% de la pantalla **fija todo el tiempo**.
La (b) recupera esos 43px a cambio de que el botón de club pierda el "Estás viendo" y el "Cambiar".
Dicho de otra forma: (a) le cuesta pantalla a TODAS las vistas para que el header esté completo;
(b) le cuesta claridad a UN botón.

## 20(b) — EL CATCH-ALL DE VÉLEZ

El desglose ya está medido y escrito en el propio punto de `TODO.md`, no se repite acá. Lo único que
sumo es el contexto que hace que la decisión no sea obvia:

**La mitad del catch-all de Vélez es su COLEGIO** ("Por servicios de enseñanza" + "Subsidios
estatales a la educación": 20,2% de los ingresos en 2016 y 22,5% en 2017). Eso no es un cajón de
sastre mal armado: es una unidad de negocio real que el esquema del sitio no tiene dónde poner,
porque el esquema es de fútbol.

Y eso lo conecta con algo que ya está escrito en `TODO.md` como "TECHO DEL MODELO, no tarea" al
final del punto 23: la taxonomía entera (`player_sales`, `wages_squad`, `youth_football`) es de
fútbol. **Un club con colegio, polideportivo y tienda no es un caso raro de Vélez: es el modelo de
club social argentino**, y Instituto (colegio, básquet, La Agustina, sede, tienda) es el segundo
ejemplo que apareció en esta misma sesión. Vale la pena que la sesión que agarre esto se pregunte si
la respuesta es una fila más o un eje nuevo, antes de agregar una fila.

## 34 — LO QUE DEJÓ ABIERTO EL MERGE DEL SELECTOR

Los 6 subpuntos son decisiones tomadas a propósito, no bugs, y están bien explicados en su punto. Lo
único que agrego es **cuál de los 6 se volvió más urgente con los datos de hoy**: el (f) decía que
"comparar la liga argentina contra la brasilera hoy es 5 clubes contra 1". Con la tabla de arriba se
puede ser preciso — `ar-primera` 2024 tiene 8 clubes y `br-serieA` 2024 tiene 2 (Botafogo y Grêmio).
Sigue siendo una comparación pobre, y sigue siendo el techo real de la feature.

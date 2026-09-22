# Relevamiento 2026-09-22 — el negocio NO futbolístico en los 41 clubes cargados

**Qué es esto:** el paso previo al to-do 20(b) (el catch-all de Vélez), pedido explícito de Guido el
2026-09-21: *"no me hagas tomar decisiones por ahora… necesito saber en qué otros clubes pasaría
algo similar también. no quiero hacer un flujo solo para Instituto y Vélez"*. Antes de discutir qué
fila agregar, hacía falta un relevamiento real y no dos anécdotas.

**Las secciones 1 a 6 son el relevamiento tal como se escribió, ANTES de que Guido decidiera**: no
se había tocado ni un dato ni una línea de código, y las tres decisiones quedaban abiertas. **La
sección 7, al final, es qué decidió y qué se implementó** (Versión 189, el mismo día). Se deja el
documento en ese orden a propósito: la recomendación se lee mejor sabiendo que se escribió sin
conocer la respuesta.

**Cómo se midió (reproducible):** se cargaron los 41 `data/<club>-data.js` en un contexto `vm` de
Node y se recorrieron TODOS los `revenueLines`/`expenseLines` de TODOS los ejercicios — **2.412
líneas, 85 club-ejercicios, 1.109 combinaciones distintas de club × categoría × rótulo**. Cada línea
se midió como % del total de SU sección en SU ejercicio, y las líneas no-futbolísticas se
clasificaron a mano, una por una, por club y rótulo exacto (no por regex: un `Diversos` de Racing y
un `Diversos (alquileres, concesiones, etc.)` de Argentinos no son lo mismo). El script quedó en el
scratchpad de la sesión; se puede rehacer en 5 minutos, y conviene rehacerlo y no confiar en estos
números si pasaron muchos clubes nuevos.

---

## 1. El hallazgo estructural, que es más importante que cualquier fila

**El problema de Vélez no es de Vélez: es que la regla de la Versión 53 se aplicó a la mitad del
modelo.**

Formato simplificado tiene, en Gastos, tres filas que existen justamente para que el catch-all no se
coma la plata que no es del plantel profesional:

- `match_organisation_expense` → **Organización de partidos**
- `youth_other_sports_expense` → **Otras secciones deportivas (juvenil, otros deportes, básquet)**
- `admin_general_expense` → **Administración y gastos generales**

En Ingresos **no hay ninguna equivalente**. Las 7 filas de ingresos son todas de fútbol profesional
(Cuotas Sociales, Comercial/Sponsors, Estadio: recaudación de partidos, Televisión, Premios, Abonos,
Venta de Jugadores) y **las 4 categorías que no son fútbol —`other_income`, `other_sports`,
`youth_football`, `womens_football`— caen enteras al catch-all** "Otras secciones deportivas y otros
ingresos". Lo dice el propio `audit.js` como P3 (`categoria-sin-bucket`) desde la Versión 122; lo que
faltaba era el peso.

**Esto corrige, además, cómo se venía contando el precedente de Instituto.** La Versión 172 NO
recategorizó a "categorías que no tienen fila propia": movió plata a `youth_other_sports_expense`,
que **sí tiene fila**, y por eso su catch-all bajó de 42% a 27%. Y fue del lado de **Gastos**. El
precedente entonces no dice "recategorizá y listo": dice *"del lado de Gastos alcanzó con
recategorizar porque la fila ya existía"*. Del lado de Ingresos ese camino no está disponible —
recategorizar una línea de `other_income` a `other_sports` la deja exactamente en el mismo lugar de
la pantalla.

Los números de hoy confirman la asimetría:

| | Ingresos | Gastos |
|---|---|---|
| club-años con catch-all ≥ 20% | **27 de 85** | 5 de 75 |
| club-años con catch-all ≥ 10% | **48 de 85** | 19 de 75 |
| club-años sobre el umbral P2 de `audit.js` (40%) | 2 (Vélez 2016/2017) | 0 |

(75 y no 85 del lado de Gastos porque **los 10 clubes japoneses no tienen `expenseLines` cargadas**:
el informe de la J.League publica ingresos por club y gastos solo a nivel división.)

---

## 2. El relevamiento: qué clubes tienen negocio no futbolístico

Cinco familias, clasificadas línea por línea. El número es **el peso de esa familia en el mejor
ejercicio del club, como % de sus ingresos totales**; el asterisco indica que hoy esa plata cae en el
catch-all (o sea, invisible en Formato simplificado).

| Club | Educación | Estadio (uso/alquiler) | Tienda | Polideportivo/social | Subsidios | ejerc. |
|---|---|---|---|---|---|---|
| Vélez Sarsfield | **22,6%\*** | **9,0%\*** | — | — | 4,3%\* | 11 |
| Argentinos Juniors | — | **14,2%\*** ⚠ | — | **10,2%\*** | — | 5 |
| Unión de Santa Fe | **13,3%\*** | 0,8%\* | 3,9%\* | 1,8%\* | 0,8%\* | 4 |
| Instituto ACC | 8,2%\* | — | — | 5,4%\* | 0,1%\* | 1 |
| Estudiantes LP | 6,9%\* | 0,1%\* | — | 4,9%\* | 2,7%\* | 4 |
| Independiente | 5,4%\* | 0,2%\* | — | 2,4%\* | — | 1 |
| San Lorenzo | — | 3,8%\* | — | 3,8%\* | — | 8 |
| Envigado | 3,4%\* | 0,6%\* | 2,7% | — | — | 1 |
| Rosario Central | — | 0,7%\* | — | 3,1%\* | — | 1 |
| Racing | 2,6%\* | 1,2%\* | — | 3,0%\* | 0,2%\* | 17 |
| River | 2,0%\* | — | — | 0,7%\* | — | 1 |
| Boca | 0,3%\* | — | — | 1,6%\* | — | 2 |
| Botafogo | — | 2,6%\* | 10,0% | — | — | 1 |
| Grêmio | — | — | 3,0% | — | 0,0%\* | 1 |
| Once Caldas | — | — | 3,8% | — | — | 1 |
| Coritiba | — | — | 1,0% | — | — | 1 |
| Ituano | — | — | — | — | 8,9%\* | 1 |
| Athletic, Atlético Madrid, Celta, Alavés, Real Madrid, Sevilla, Valencia | — | — | — | — | 0,0-1,4%\* | 1 c/u |
| Los otros 17 (10 japoneses, Club América, Mirassol, Villarreal, Cruzeiro, Atlético-GO, Real Betis, FC Barcelona) | *nada identificable en ninguna familia* | | | | | |

⚠ Argentinos Juniors es el único caso donde el número no es limpio: su línea es `Diversos
(alquileres, concesiones, etc.)`, un compuesto que el balance no abre más. Envigado tiene el mismo
problema en menor escala (`Otros ingresos (arrendamientos, comisiones, venta de PP&E…)`). Se
contaron enteros arriba, pero **no se pueden partir sin volver a la fuente**.

**Conteo por familia (sobre 41 clubes):**

| Familia | Clubes con el rubro | …con plata hoy en el catch-all |
|---|---|---|
| Estadio (uso, alquiler, concesiones, estacionamiento — NO recaudación) | 10 | **10** |
| Polideportivo / sede / social / cultural | 10 | **10** |
| Educación (colegio, enseñanza, escuela) | 9 | **9** |
| Tienda / venta de mercadería | 6 | 1 (Unión) — los otros 5 ya están en Comercial/Sponsors |
| Subsidios y donaciones | 14 | **14** |

**Trece clubes tienen negocio no-futbolístico con plata invisible.** No dos.

### El corte no es por país: es por forma jurídica

- **Argentina: 11 de 11 clubes cargados** tienen negocio no futbolístico en Ingresos. Los once. Sin
  excepción.
- **España: 0 de 10.** Japón: 0 de 10. Brasil: 1 de 7 (Botafogo, alquileres; otros 3 tienen tienda
  pero ya visible). Colombia: 1 de 2. México: 0 de 1.

La línea divisoria es *asociación civil multideportiva* (el club social argentino, con colegio,
polideportivo, sede y subcomisiones) contra *sociedad anónima deportiva* (SAD española, KK japonesa,
SA colombiana). **No es un caso raro: es la forma jurídica de un país entero cargado al 100%.**

Dos advertencias sobre esa lectura, las dos apuntan a que el fenómeno está SUBcontado, no sobre:

1. **La plantilla de LaLiga esconde el caso español.** Barcelona y Real Madrid tienen secciones
   profesionales de básquet y balonmano de decenas de millones de euros. No aparecen acá porque las
   cifras cargadas vienen de la cuenta de resultados normalizada, con una sola línea `Otros ingresos
   de explotación`. El patrón existe; la fuente elegida no lo abre.
2. **El pipeline de sourcing tiene mucho club social por delante**: Argentina lleva 66 clubes
   trackeados (15 con documento) contra 11 cargados, y Brasil, Uruguay, Paraguay, Chile, Perú,
   Grecia y Turquía repiten el modelo de asociación multideportiva. De los 530 clubes trackeados hoy,
   la mayoría europea son sociedades; pero el volumen sudamericano por cargar es casi todo social.

---

## 3. Qué NO arregla ninguna fila nueva

Después de sacar las cinco familias, **el 48% de la plata que queda en el catch-all de Ingresos son
líneas genéricas que la propia fuente no abre**: `Otros Ingresos Diversos` de Racing (hasta 19,5% de
sus ingresos), `Diversos (otros recursos)` de San Lorenzo (16,7%), `Otros` de Estudiantes (14,2%),
`Otros ingresos de explotación` de los españoles, `Outras receitas` de los brasileños.

Racing es el caso extremo y conviene decirlo con todas las letras: **su catch-all no mejora casi nada
con ninguna fila nueva** (29,5% → 26,7% en el mejor escenario). Lo suyo no es un problema de modelo,
es que su balance no desglosa. Eso se arregla con mejor fuente (o con `lump_football_operations`,
que al menos lo declara), no con una fila.

Un tercer grupo que tampoco es negocio: deducciones fiscales brasileñas y colombianas (negativas,
hasta -18,5% en Envigado), excesos de provisiones y `Trabajos realizados por la empresa para su
activo` de los españoles. Son ruido contable legítimo dentro del catch-all.

---

## 4. Dos hallazgos laterales, independientes de la decisión

**(i) "Derechos de formación / mecanismo de solidaridad" está en dos lugares distintos según el
club.** Mismo concepto económico, dos destinos:

- En `player_sales` (**fila visible** "Venta de Jugadores"): Argentinos, Boca, Envigado,
  Independiente, Once Caldas, Rosario Central, San Lorenzo.
- En `youth_football` u `other_income` (**catch-all, invisible**): Botafogo, Cruzeiro, Estudiantes,
  Grêmio, Racing, Unión, **Vélez** (7,0% de sus ingresos en 2016).

Esto no depende de ninguna decisión de diseño: es una inconsistencia de categorización que se puede
unificar en cualquier momento, y sola le baja a Vélez unos puntos del catch-all.

**(ii) El propio archivo de Vélez ya duda de "Uso del estadio".** En `dudas-por-club.md` está
anotado que se asumió alquiler del Amalfitani para recitales, pero que podría mezclar recaudación
propia. Si termina siendo lo segundo, parte de esa plata va a `matchday_competition` (una fila que ya
existe) y el caso "fila de estadio" se achica solo. **Vale la pena resolver esa duda ANTES de agregar
una fila diseñada alrededor de ella.**

---

## 5. Las alternativas, con el costo medido

### (a) La fila de estadio: ¿ingresos, gastos, las dos, o ninguna?

**Del lado de INGRESOS** (lo que le pasa a Vélez): 10 clubes tienen línea identificable de uso,
alquiler, concesiones o estacionamiento del estadio/instalaciones, y **en los 10 esa plata está hoy
escondida**. Pesos: Vélez 9,0%, Argentinos 14,2% (compuesto), San Lorenzo 3,8%, Botafogo 2,6%,
Racing 1,2%, Unión 0,8%, Rosario Central 0,7%, Envigado 0,6%, Independiente 0,2%, Estudiantes 0,1%.

**Del lado de GASTOS** (como lo nombró Guido, "Gastos de Estadio"): 9 clubes tienen línea
identificable — Unión (10,5%), San Lorenzo (9,0%), Argentinos (6,4%), Ituano (5,7%), Racing (5,0%),
Independiente (4,7%), Boca (2,7% + 1,3% en dos líneas), Estudiantes (1,3%), Cruzeiro (1,3% de *direito de
arena*). **Pero ninguna de esas líneas está hoy en el catch-all**: están repartidas entre
`match_organisation_expense` (donde arguiblemente ya están bien), `admin_general_expense`,
`youth_other_sports_expense` y hasta `wages_squad` (Boca).

| | Pro | Contra |
|---|---|---|
| **Solo ingresos** | Ataca el problema real: 10 clubes con plata invisible. Es la línea que motivó el to-do. | Deja a "Gastos de Estadio", que es lo que Guido nombró, sin responder. |
| **Solo gastos** | Es lo que Guido pidió textualmente. Da granularidad a un rubro que hoy se mezcla. | **No destapa un solo peso**: mueve plata de una fila visible a otra. Y obliga a redefinir qué queda en "Organización de partidos", que hoy es casi puro estadio. |
| **Las dos** | Simetría: el estadio como unidad de negocio, ingreso y costo. Es el formato que usa la prensa financiera del fútbol. | Dos filas nuevas en los 41 clubes. La de gastos exige recategorizar 9 clubes ya cargados y verificados. |
| **Ninguna** | Costo cero. | 10 clubes siguen con el alquiler del estadio adentro de "otros". |

Un dato que pesa en esta decisión: **"Estadio: recaudación de partidos" ya es una fila**. Una fila
"Estadio: uso y alquiler" al lado no es un concepto nuevo, es partir en dos un negocio que el sitio
ya nombra.

### (b) El colegio y los demás rubros: ¿fila propia, o recategorizar?

**Recategorizar a lo que existe NO funciona del lado de Ingresos**, por lo del punto 1: las cuatro
categorías candidatas van todas al mismo catch-all. La única recategorización útil sería mandar el
colegio a `member_dues` (porque las cuotas del colegio también son cuotas), y eso sería mentir: un
periodista leería "Cuotas Sociales" y estaría viendo aranceles escolares.

Entonces la pregunta real es **cuántas filas**, y el costo de la regla de la Versión 53. Acá está el
número que faltaba para poder pesarlo, y es el que más cambia la conversación:

**Si se agrega UNA fila que junte todo lo no futbolístico (educación + estadio + polideportivo +
tienda), de los 85 club-ejercicios cargados:**

- **60 mostrarían plata real** (71%)
- **13 mostrarían "—"**, no `$0` — son los que tienen bolsón `lump_football_operations`, y la regla
  `unknown` de la Versión 172 ya los cubre: un club japonés diría "no sabemos", que es la verdad
- **solo 12 mostrarían un `$0` literal** (9 españoles y 3 brasileños: Atlético-GO, Cruzeiro,
  Ituano)

**O sea: la premisa "la mayoría de los 41 quedarían en $0", que es lo que frenó esta decisión, es
falsa.** Al nivel de club son 13 con plata, 16 con "—" y 12 en cero; al nivel de club-ejercicio, que
es lo que el visitante mira, es 60 / 13 / 12.

Qué compra cada diseño, medido sobre los 85 club-ejercicios:

| Diseño | Clubes con plata | club-años con catch-all ≥20% | Vélez 2016 |
|---|---|---|---|
| **Hoy** | — | **27** | 48,6% |
| 1 fila: "Otras actividades del club" (edu+estadio+poli+tienda) | 13 | **10** | 24,4% |
| Esa fila + subsidios adentro | 22 | **9** | 24,4% |
| Solo "Educación" | 9 | 15 | 28,4% |
| Solo "Estadio (uso/alquiler)" | 10 | 23 | 44,6% |
| Solo "Otras secciones deportivas y sociales" | 10 | 24 | 48,6% |
| 3 filas separadas (edu + estadio + poli) | 13 | 10 | 24,4% |

Las tres filas separadas y la fila única **destapan exactamente la misma plata**: la diferencia es
cuánta granularidad se le muestra al visitante y cuántas filas vacías carga un club español.

| | Pro | Contra |
|---|---|---|
| **1 fila** ("Otras actividades del club") | Una sola fila nueva en los 41. 71% de los club-años la usan. El acordeón de control ya muestra las líneas reales adentro, así que la granularidad no se pierde, se esconde un nivel. | Junta colegio con estacionamiento. Para Vélez, que tiene 22,6% de colegio, es una fila que dice menos de lo que podría. |
| **3 filas** (Educación / Estadio / Otras secciones) | Dice de verdad qué es cada negocio. Espeja exactamente las filas que Gastos ya tiene. | Tres filas nuevas × 41 clubes. En un club español son 3 ceros seguidos. |
| **Nada** | Costo cero. | 13 clubes —los 11 argentinos entre ellos— siguen con su negocio real adentro de "otros". |

### (c) La pregunta grande: ¿un eje nuevo, o caso por caso?

Los números dicen que **el patrón existe y es estructural, pero que un eje nuevo es más de lo que
hace falta hoy**.

A favor de un eje ("fútbol" vs "resto del club", con su propia cascada de resultado): en un club
social argentino esto no es un rubro suelto, es la mitad del club — Vélez tiene entre 12% y 27% de sus
ingresos en colegio + estadio según el ejercicio (26,9% en 2018) y 38,2% de sus gastos en "Otras
secciones deportivas". El resultado del fútbol y el
resultado del club son dos números distintos, y hoy el sitio solo muestra el segundo llamándolo lo
primero. Los balances argentinos ya vienen con esa apertura por sector (el Anexo III de Vélez trae 6
columnas; el Anexo V de Instituto también), o sea que **la fuente ya tiene el eje, es el modelo el
que lo aplasta**.

En contra: (1) requiere que CADA línea de cada club tenga atribución de sector, y hoy la tienen
Vélez, Instituto, Boca y River — la mayoría de las fuentes trae una sola cifra por rubro; (2) del
lado de Gastos el eje ya está medio implementado con `youth_other_sports_expense` y funciona; (3) es
un cambio de esquema que toca el motor, los 41 archivos de datos, el render y los generadores, contra
tres filas que tocan una constante; (4) los 20 clubes de España y Japón —y casi todo el pipeline
europeo por delante— no lo usarían nunca.

**La lectura honesta: el eje es la respuesta correcta para el club social, y está prematuro.** Lo que
sí conviene es no cerrarle la puerta — si se agregan filas, que sean las mismas del lado de Ingresos
que ya existen del lado de Gastos, porque eso ES el primer escalón del eje, hecho en el lugar más
barato.

---

## 6. Recomendación (no es una decisión: es una opinión con los números al lado)

1. **Agregar las filas del lado de Ingresos, no del lado de Gastos.** El problema medible está en
   Ingresos: 27 club-años con catch-all ≥20% contra 5 del lado de Gastos, y las 3 filas que Gastos
   necesitaba ya se agregaron en la Versión 53. "Gastos de Estadio" es granularidad, no un agujero:
   esa plata ya se ve, bajo "Organización de partidos".
2. **Tres filas, no una**, y con los nombres espejados de las de Gastos: **"Estadio: uso y
   alquiler"** (al lado de la de recaudación, que ya existe), **"Educación"**, **"Otras secciones
   deportivas y sociales"**. Razón: son exactamente el reflejo de `match_organisation` /
   `admin_general` / `youth_other_sports` del lado de Gastos, y dejan el modelo simétrico en vez de
   parchado. El costo es 12 club-ejercicios de 85 mostrando `$0` — no "la mayoría de los 41".
3. **Antes de implementar, dos cosas baratas que se pueden hacer solas**: unificar "derechos de
   formación / mecanismo de solidaridad" (7 clubes lo tienen visible, 7 escondido), y resolver la
   duda de `dudas-por-club.md` sobre si "Uso del estadio" de Vélez mezcla recaudación. Las dos
   cambian los números de arriba.
4. **El eje no-fútbol: no ahora, sí anotado.** Reabrirlo cuando haya ~30 clubes sociales cargados con
   desglose por sector en la fuente. Hoy son 4.

## Las tres decisiones, que son de Guido

- **(a)** Fila de estadio: ¿ingresos, gastos, las dos, o ninguna? *(mi lectura: ingresos)*
- **(b)** ¿Una fila que junte todo lo no futbolístico, tres filas separadas, o nada? *(mi lectura:
  tres)*
- **(c)** ¿Eje nuevo no-fútbol, o filas caso por caso? *(mi lectura: filas ahora, eje anotado para
  los ~30 clubes sociales)*

*(Guido las respondió las tres el mismo día. Ver la sección 7, al final, para qué decidió y qué se implementó — el to-do 20(b) quedó cerrado en la Versión 189.)*

---

## 7. LO QUE GUIDO DECIDIÓ, Y QUÉ SE IMPLEMENTÓ (mismo día, Versión 189)

Este documento nació como relevamiento y recomendación. Guido decidió sobre las tres preguntas en
la misma sesión, así que queda también el registro de qué se hizo, para que nadie lea las
recomendaciones de arriba como si siguieran abiertas.

**(a) La fila de estadio → ingresos, y UNA sola fila.** Guido fue más lejos que la recomendación:
*"en vez de 'Estadio: recaudación de partidos' y 'Estadio: uso y alquiler', tengamos Estadio a
secas, y si se presiona en el acordeón de estadio, sale el desagregado de ambos"*, y después
*"pongamos abonos dentro de Estadio. O sea, el acordeón de estadio tiene 3 cosas y abonos deja de
ser su propia fila"*. Resultado: "Estadio" es una fila con `matchday_competition` +
`season_tickets` + `stadium_other`, el acordeón las separa, y la tabla crece **una sola fila neta**
(−1 Abonos, +2 nuevas) en vez de tres. La fila de GASTOS de estadio no se hizo, por lo del punto 5:
esa plata ya se ve bajo "Organización de partidos".

**(b) Dos filas nuevas, no una.** "Educación" quedó como estaba propuesta. "Otras secciones
deportivas y sociales" no: Guido marcó que chocaba con el catch-all (*"se me hacen muy parecidos
'otros' y 'otras' al lado del otro"*) y eligió, entre 4 opciones, **"Otras secciones deportivas"**
—idéntica carácter por carácter a la fila que ya existe del lado de Gastos, como manda la regla de
la Versión 48— con el catch-all renombrado a **"Otros ingresos"** a secas.

**(c) El eje no-fútbol: no ahora.** Se siguió la recomendación: filas ahora, eje anotado para
cuando haya ~30 clubes sociales con desglose por sector (hoy son 4).

**Y una cosa que Guido pidió y no estaba en ninguna de las tres preguntas**: que la fusión de
abonos se pueda revertir sin un rediseño. Quedó como `ABONOS_DENTRO_DE_ESTADIO` en
`js/finanzas-calc.js` — una palabra, sin tocar ningún archivo de datos, probado en los dos estados.

### Lo que efectivamente se movió

- 97 líneas recategorizadas en 10 clubes, **ningún monto tocado** (`auditAll()`: 41 clubes, 228
  checks, 0 que no cierran, antes y después).
- Catch-all de Ingresos: los club-años con ≥20% pasan de **27 a 10**; los ≥40%, de 2 a 0 (los dos
  hallazgos P2 de `audit.js` se cerraron). Vélez 2016: 48,6% → 24,4%.
- `stadium_other` se aplicó con un criterio más estrecho que el del relevamiento de arriba: **solo
  3 clubes**, no 10. Las líneas de alquiler cuyo rótulo no dice qué propiedad es ("Diversos
  (alquileres, concesiones, etc.)" de Argentinos, 14,2% de sus ingresos; "Recursos por alquiler de
  instalaciones" de Unión; y 4 más) se quedaron en "Otros ingresos" y **la pregunta quedó anotada
  en `dudas-por-club.md`**, en vez de suponer que son el estadio. Es la diferencia entre lo que el
  documento dice y lo que deducimos.
- Los dos hallazgos laterales del punto 4 siguen ABIERTOS: no se unificó "derechos de formación",
  y la duda de "Uso del estadio" de Vélez sigue sin respuesta del club (aunque ahora importa menos:
  las dos categorías candidatas caen en la misma fila).

### Un error viejo que el cambio destapó, y que SÍ se arregló

Al fusionar, **Athletic Club pasó a mostrar "Estadio = 97% de sus ingresos"**. El culpable no era
la fusión: su línea "Ingresos deportivos" (139,5 M€, el 82% del club) estaba categorizada entera
como `matchday_competition` desde que se cargó, y la Nota 21.4 de sus propias cuentas la abre en 5
conceptos de los cuales el mayor son los **72,7 M€ de televisación**. O sea que el sitio venía
diciendo "Televisión 0,0" para un club que cobra 72,7 M€ de derechos de TV. Se abrió en las 5
líneas de la nota, que suman exacto el mismo total.

**La moraleja, que vale para la próxima fusión de categorías**: una fila que agrupa mucho esconde
un error de categorización; una que agrupa más lo vuelve visible. Cuando una fila de Formato
simplificado se lleva un porcentaje absurdo del total, sospechar de la línea más grande que tiene
adentro antes que del bucket.


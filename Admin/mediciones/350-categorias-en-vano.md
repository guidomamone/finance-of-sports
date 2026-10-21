# 350: qué categorías y subcategorías están en vano hoy (relevamiento, 2026-10-21)

Medido sobre los clubes cargados en `data/<iso2>/<club>.json` (318 clubes: 317 de fútbol y Bath de rugby; 1.294 club-años, sin presupuestos). Por cada
lado (ingresos, gastos), categoría y subcategoría: club-años que la usan, clubes, países y el peso (mediana y máximo de la parte de esa línea sobre la
suma de las líneas de su lado en ese club-año). El detalle completo, en `Admin/mediciones/350-uso-categorias.txt`; lo reproduce
`node Admin/mediciones/350-uso-categorias.mjs`. Los subsidios y donaciones, en `350-subsidios-en-otros-ingresos.mjs`.

## Lo que sale

**Fútbol, casi en vano** (pocos club-años y peso chico):

| Subcategoría | Club-años | Clubes | Países | Peso mediano | Máximo |
|---|---|---|---|---|---|
| `womens_football` (ingreso) | 6 | 6 | 5 | 0,8 % | 3 % |
| `other_sports` (ingreso) | 75 | 24 | 4 | 1,4 % | 30 % |
| `education` (ingreso) | 59 | 16 | 4 | 4,1 % | 23 % |
| `education_expense` (gasto) | 28 | 11 | 2 | 3,1 % | 14 % |
| `youth_football` (ingreso) | 158 | 53 | 15 | 1,2 % | 37 % |
| `stadium_other` | 164 | 66 | 14 | 3,1 % | 31 % |

Las tres líneas de otro lado (`admin_general_expense` y `exceptional_items` en ingresos: 2 y 6 club-años, 3 clubes) no son una categoría en vano:
son la regla `cross_side` de la taxonomía (un gasto en una línea de ingreso va a `other_revenue`).

**Se usan mucho y pesan:** `wages_squad` (1.068 club-años, 285 clubes, 21 países, mediana 48 %), `admin_general_expense`, `other_expenses`,
`other_income` (1.174 club-años, 285 clubes), `sponsorship_commercial`, `broadcasting`, `player_sales`, `depreciation`, `player_amortisation`.
`lump_football_operations` y su par de gasto se usan en 118 y 57 clubes con mediana 75 % y 70 %: es un bolsón, no un detalle.

**Rugby:** un solo club (Bath, 5 club-años). Ninguna subcategoría de rugby tiene muestra para decidir si está en vano: se deja.

**La genérica `non_sporting_activities` ("Actividades no deportivas") solo la usa `education`/`education_expense`.** Sin la educación, esa
genérica quedaría vacía; hoy es una categoría de un solo uso.

## Educación

| Dato | Medido |
|---|---|
| Clubes que la usan | 17 de 318 (13 de Argentina y 4 de otros 3 países) |
| De esos, clubes argentinos con un colegio real | 13 (Banfield, Estudiantes LP, Ferro Oeste, Gimnasia y Esgrima, Godoy Cruz, Independiente, Instituto, Los Andes, Newell's, Racing, River, Unión, Vélez) |
| Cuántos de los clubes argentinos cargados | 13 de unos 20 |
| Peso en el ingreso o el gasto del club-año | 2 % a 18 % (Los Andes 18 %, Vélez y Unión 14 %, Ferro Oeste 13 %) |
| Usos que NO son un colegio | Novorizontino («auxilio educación», un beneficio al empleado, 0 %), Fortaleza («enseñanza deportiva»), Tartu Tammeka (subsidio del Ministerio de Educación y Ciencia: un subsidio), Leeds («Educational services», 0 %) |

Lectura: **educación tiene sentido**, pero como categoría del fútbol argentino (13 de unos 20 clubes cargados, con peso real), no como una
categoría del fútbol en general. Los 4 usos fuera de Argentina son líneas mal puestas o de otro tipo (un subsidio, un beneficio), y por la
regla vigente no se recategorizan. Dos consecuencias para decidir:

1. La fila «Educación» del Formato simplificado es de la referencia de Boca y se muestra en cero en los clubes que no tienen colegio
   (301 de 318): es un tema de pantalla, no de datos (¿`hideIfZero`?).
2. La descripción de `education` / `education_expense` en la taxonomía tiene que decir que es un colegio del club, para que los
   próximos clubes no la usen para otra cosa.

## Subsidios, donaciones y aportes

714 líneas de ingreso con palabras de subsidio, donación o aporte, en 471 club-años y 148 de los 318 clubes, en 17 países; 586 en
`other_income`. En 195 club-años pesan 5 % o más del ingreso; en 79, 25 % o más; en 46, 50 % o más. Estonia (mediana 49 %) y Rusia (60 %)
son los dos países donde son el ingreso principal. Es el mismo hecho que marca `catchall-dominante`. El detalle y los falsos positivos de la búsqueda
por palabra: `350-subsidios-en-otros-ingresos.mjs`.

La votación sobre dónde ponerlos está en `Admin/propuestas/350-revision-categorias.md`.

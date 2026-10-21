# To-do 339: el pipeline sabe el deporte. Inventario (paso 1)

Solo lectura: no se codeó ni se gastó nada. Líneas de la rama `onboarding` en el commit de partida; los números de línea se corren, el nombre de la
constante o función es lo estable.

## 0. De dónde sale el deporte, y qué cambia con el 248

- Hoy: `sport:'futbol'` en cada club de `data/clubs.js` (ids de `SPORTS` en `data/leagues.js`: `futbol`, `basquet`, `nfl`, `f1`, `tenis`; solo `futbol` está `active`).
  Adentro del sitio el valor sigue siendo `'futbol'` aunque el JSON diga `football` (plan 248, decisión 5), así que las tools leen **`data/clubs.js`**, no el JSON.
- Con el 248 (`Admin/mediciones/248-plan.md`) `normalizedCategory` pasa a ser la **subcategoría del deporte**, con ids propios por taxonomía (`rugby-1` usa
  `central_income`, `gate_receipts`…). **Las tools que categorizan siguen trabajando con la subcategoría**: por eso el enum global de hoy (`REVENUE_CATEGORIES` /
  `EXPENSE_CATEGORIES` de `data/category-map.js`) deja de servir como «las categorías posibles»: son las del deporte del club.
- Falta una pieza: **`tools/deporte-club.mjs`**, gemela de `tools/pais-club.mjs` (`paisDeClub`, `afinidad`): `deporteDeClub(clubId)` leyendo `sport` de `data/clubs.js`
  igual que `mapa()` lee `country`, y `categoriasDeDeporte(deporte)` leyendo la taxonomía del 248. Todo lo de abajo cuelga de esa pieza. Trabajo: S (la pieza); el
  nombre de la API de taxonomía lo fija Datos 4 al cerrar el 248.

Tres tipos de cambio, que aparecen en la columna «Cómo»:
- **LISTA**: la lista de categorías que ve la tool pasa a ser la del deporte del club.
- **ORDEN**: un desempate (ejemplos del mismo deporte primero), como el país en el 331.
- **TEXTO**: una frase del prompt dice «fútbol» o usa vocabulario del fútbol (plantel, pases, estadio).

Trabajo: S = una línea o una constante; M = una función; L = decisión de contenido (criterios de otro deporte) o varias piezas.

## 1. Jev y la categorización (impacto máximo: es lo que decide qué categoría se carga)

| # | Dónde | Qué asume | Cómo, sabiendo el deporte | Trabajo |
|---|---|---|---|---|
| 1 | `jev-categorizar.mjs` `loadCategories()` L76-89, `CATS` L91, `ALL` L92, `askJev` (`criteria`) | Jev elige entre **todas** las categorías de `category-map.js` (ingreso + gasto), todas de fútbol. Con el 248 elegiría `wages_squad` para un rubro de Bath. | **LISTA**: `ALL` se arma por deporte (`ALL[deporte]`), `askJev` recibe el deporte del club y manda solo esas `criteria`. Es el cambio que más importa: sin él Jev no puede responder bien ni un solo rubro de rugby. | M |
| 2 | `jev-categorizar.mjs` `askJev` L101 (`state`) | Texto fijo «Rubro de un estado financiero de un club de fútbol (club, de País)». | **TEXTO**: «de un club de {deporte} ({club}, de {país})», con `deporteDeClub`. Mismo lugar donde el 331 puso el país. | S |
| 3 | `jev-categorizar.mjs` `makeRetriever` L142-157 y `buildBank` L158+ | Los ejemplos (`K_EXAMPLES`, hasta 8) salen de todos los clubes, ordenados por parecido de palabras y, a igual parecido, `afinidad` país/idioma. Un ejemplo de fútbol llevaría su `truth` (`player_sales`) a una lista que, en rugby, no tiene esa categoría. | **ORDEN + FILTRO**: el ejemplo tiene que tener una `truth` que exista en la lista del deporte del club (condición dura, no desempate; si no, Jev ve un ejemplo cuya respuesta no puede elegir). Entre los válidos: mismo deporte primero, después país, después idioma (`afinidadDeporte` encima de `afinidad`). Con un solo club de rugby casi todo el banco válido será de fútbol: los ejemplos de otro deporte con una subcategoría que existe en las dos taxonomías (ids 1:1, como `broadcasting`) siguen sirviendo. | M |
| 4 | `jev-categorizar.mjs` L253 (`lineasAprendidas`) | Mezcla lo aprendido de todos los clubes en el banco. | Mismo filtro del punto 3. | S |
| 5 | `categorizar-claude.mjs` `loadCategories()` L119-131, `CATS` L133, `ALL_CATS` L135, `systemPrompt()` L255+ | Igual que Jev: el prompt del sistema lista las categorías de `category-map.js`, y abre con «clubes de fútbol». El prompt es fijo y se cachea. | **LISTA + TEXTO**: un prompt de sistema **por deporte** (sigue siendo fijo dentro del deporte, así que el caché se mantiene: un caché por deporte). La corrida agrupa los pendientes por deporte. | M |
| 6 | `categorizar-claude.mjs` `CRITERIOS` L241-249 | Resumen del criterio de `club-data-mapping` escrito en fútbol: `lump_football_operations`, `stadium_other`, pases, `player_sales`, `player_amortisation`, plantel/cuerpo técnico → `wages_squad`, juveniles → `youth_other_sports_expense`, premios por ronda. | **TEXTO por deporte**: el fútbol se queda tal cual; las reglas que son del negocio (pases, plantel, bolsón sin desglosar) son una sección «fútbol» y el resto (cargas sociales con el sueldo del sector, impuestos, amortización de intangibles, `NOT_A_LINE`) es común. Las del rugby las tiene que escribir quien define `rugby-1`, con el criterio de Bath (`club-data-mapping`); no es trabajo de la tool. | L (contenido) |
| 7 | `categorizar-claude.mjs` retriever L205-215 (`makeRetriever`, `afinidad`) y `allLines` | Igual que el punto 3, con `K_EXAMPLES = 6`. `allLines()` no sabe el deporte de la línea. | Igual que el punto 3; `allLines` agrega `deporte` por club. | M |
| 8 | `categorizar-claude.mjs` `precedente`, `precedenteFamilia`, contexto del club (`MAX_CLUB_LINES`) | Precedente = mismo club: no depende del deporte. | Nada. Ya es correcto. | 0 |
| 9 | `categorizar-claude.mjs` `CONVENTION_PAIRS` L489-495 | Pares de categorías vecinas de fútbol para el informe del backtest (`other_income`/`lump_football_operations`, `member_dues`/`season_tickets`…). | **LISTA por deporte** (o vacía para rugby). Solo informe. | S |
| 10 | `reglas-categoria.mjs` L16-17, L53-60 | `CATEGORÍA (prompt)` va al prompt de **todos** (`reglasParaPrompt()`); una regla de fútbol (p. ej. la de pases) se mostraría en el prompt de rugby. Valida que la categoría exista en la unión de `category-map.js`. | **TEXTO**: la línea acepta un deporte opcional (`CATEGORÍA (prompt, futbol): …`; sin deporte = todos) y `reglasParaPrompt(deporte)` filtra. La validación de `EJEMPLO-CATEGORÍA` chequea la categoría contra el deporte **del club del ejemplo**. Es sintaxis nueva en `CONVENCIONES-DATOS.md`. | M |
| 11 | `memoria-categorias.mjs` (`lineasAprendidas`), `Admin/registros/categorias-aprendidas.jsonl` | Las líneas aprendidas guardan `club`, no el deporte; sirven de ejemplo a todos. | Nada que guardar: el deporte se lee por el club (`deporteDeClub`). Solo el filtro del punto 3. | 0 |
| 12 | `cola.mjs` L254-255 (`--corregir-categoria`) | Valida que la categoría exista en `category-map.js` (`^\s*cat: '`). | Validar contra la lista del **deporte del club del caso**. | S |
| 13 | `cargar.mjs` `NOMBRE_CAT` L130, `categoriasDelSitio()` L176-181 | Los nombres en castellano y el set válido de categorías salen del `category-map.js` global; la pregunta de la cola dice «Administración y gastos generales» a partir de ahí. | **LISTA**: nombres y set válido por deporte; la compuerta que rechaza una categoría que no es del lado/lista usa la del deporte. Sin esto, una fila de Bath con `wages_squad` pasa la compuerta. | M |
| 14 | `ajustes.mjs` (ajuste `categoria`, L45) y `suggest-category-precedent.mjs` | `categoria` valida contra `category-map.js`. | Mismo que 12/13. `suggest-category-precedent` solo menciona fútbol en comentarios (Boca «Fútbol femenino»): nada. | S |

## 2. Cargar: chequeos y preguntas de perfil (el pipeline frena o pregunta por fútbol)

| # | Dónde | Qué asume | Cómo | Trabajo |
|---|---|---|---|---|
| 15 | `cargar.mjs` `CATS_CERO` L871 y el chequeo de L798 (`['Salarios del plantel', ['wages_squad']], ['Televisión', ['broadcasting']], ['Estadio', ['matchday_competition','stadium_other','season_tickets']]`) | «Categorías en 0»: el aviso/reintento dice que *salarios del plantel nunca da 0, televisión 2 %, estadio 1 %* (medido en 241 años **de fútbol**). | **LISTA por deporte**: una tabla `CEROS[deporte]` con las categorías que no pueden ser 0 y sus nombres. Para rugby no hay medición: arranca **vacía** (no se frena ni se reintenta por un 0 hasta medir con Bath y más clubes). Hecho así, es una compuerta que se **relaja** para un deporte sin datos, no una condición nueva que endurece: igual se muestra a Guido antes. | M |
| 16 | `cargar.mjs` L826-827 (perfil: `socios` → `member_dues`; `otrosDeportes` → `other_sports`, `youth_football`, `womens_football`, `youth_other_sports_expense`) y la pregunta «¿X tiene socios… / otros deportes (básquet, vóley, futsal…)?» | Las dos preguntas de perfil y sus categorías son las de fútbol. «Otros deportes: básquet, vóley, futsal» no tiene sentido para rugby. | **LISTA + TEXTO por deporte**: categorías de «membresía» y de «otras secciones» desde la taxonomía (la genérica `membership` y `other_sporting_sections` del 248 son justamente eso); el texto nombra el deporte del club. | M |
| 17 | `cargar.mjs` L842-850 y `citaSADpt` L1400-1414 (ΠΑΕ griega, SAD/SDUQ portuguesa: «solo fútbol profesional», sin socios ni otros deportes) | Formas jurídicas de **sociedades de fútbol**. | Son por país+forma jurídica, no por deporte; no se tocan. Sólo hay que cuidar que no se disparen en un club de otro deporte (no pasa: dependen de la portada). | 0 |
| 18 | `cargar.mjs` L396 (`sport: v('sport').valor \|\| 'futbol'`) y L1085-1089 (`sinDesglose` filtra `^lump_football_operations`) | Si el alta no trae deporte, supone fútbol; el bolsón «sin desglosar» se reconoce por el nombre de la categoría de fútbol. | Sin deporte → pregunta, no fútbol por defecto. El bolsón: por la **genérica** `undisclosed` (que el 248 define para eso) en vez del nombre. | S |
| 19 | `cargar.mjs` L609-668, L722 (comentarios y compuertas de padre/nota: «nota de jugadores», «departamento de fútbol», «plantel») | Son casos reales de fútbol (PAOK, Olympiacos, Goiás); el mecanismo (`padres-filas.mjs`) no depende del deporte. | Nada. | 0 |
| 20 | `perfil-clubes.mjs` (L7 comentario; guarda `socios` y `otrosDeportes` por club/año) | El archivo de perfil es por club: ya es independiente. | Nada, salvo la pregunta (punto 16). | 0 |
| 21 | `dentro-de-otro.mjs` L50 `LUMP = {lump_football_operations, …_expense}` y su doc («Salarios del plantel … fila Salarios y primas») | La compuerta «INCLUIDO EN» usa las categorías-bolsón de fútbol. | Bolsón por deporte (en 248, la genérica `undisclosed`). | S |
| 22 | `bfo-rusia.mjs` L57-58, L72, L151-158 y `bfo-rusia-notas.mjs` | Mapa del fisco ruso a `lump_football_operations`. | Es solo fútbol ruso: nada hoy. Si Rusia suma otro deporte, tabla propia. | 0 |
| 23 | `caja-deuda.mjs` L1310-1334 (`--personal --partir`: si no hay `wages_squad`, parte una fila `lump`/`admin_general_expense` y crea `wages_squad`) y L948, L667, L1266-1267 (prompts «club de fútbol», «jugadores») | La partición del costo de personal crea la categoría `wages_squad`. | **TEXTO** en los 3 prompts (S) y **LISTA** para la categoría de destino: el equivalente de `wages_squad` de la taxonomía del deporte (para rugby `first_team_staff` es el bloque, no hay subcategoría hoy: lo decide Datos 4). | M |

## 3. Alta del club, documentos y chequeos de lectura

| # | Dónde | Qué asume | Cómo | Trabajo |
|---|---|---|---|---|
| 24 | `alta-club.mjs` L100-103 (doc), L416-424 `OTROS_DEPORTES`/`FUTBOL_RE`, L1017-1028 `deporte` | **Esto ya sabe el deporte**: cuenta menciones de rugby/cricket/F1/NFL contra fútbol; con ≥3 menciones y más que fútbol propone otro deporte. Pero (a) «Football Club» no cuenta como fútbol (rugby inglés), (b) la respuesta cuando es otro deporte es `pregunta` («parece de rugby, no de fútbol…»), L1065-1067, y (c) L1616: solo se acepta de Claude `sport === 'futbol'`. | Lo que hay alcanza para detectar; falta **aceptar** el deporte detectado cuando `data/leagues.js` lo tiene `active` y que la taxonomía exista (L1067: la pregunta cambia de «¿entra al sitio?» a una compuerta automática). Con el 248 el deporte determina la taxonomía, así que esto es lo que arma `club.sport`/`club.taxonomy`. | M |
| 25 | `alta-club.mjs` L1463 y L1429 (`sport: val('sport') \|\| 'futbol'`, ficha que escribe `data/clubs.js`) | Default fútbol al escribir la ficha. | Sin deporte → frena (igual que 18). | S |
| 26 | `alta-claude.mjs` L36, L95 (`sport:` regex), L152 (`['futbol','rugby','cricket','f1','nfl','basquet','otro']`), L192 | **Ya pregunta el deporte** a Claude, y las opciones no son las `id` de `SPORTS` (`f1` vs `automovilismo`, `basquet` bien, falta `tenis`…). | Alinear la lista con `SPORTS` de `data/leagues.js` (una sola fuente). Cuidar que «rugby» sea `rugby` y no `rugby_union` (el sufijo es del JSON). | S |
| 27 | `extraer.mjs` `SYSTEM` L69-80 y `localizar.mjs` `SYSTEM` L72-83 (+ L25-26 nota de segmentos «escuelas de fútbol», «por jugador») | «Sos analista de estados financieros de clubes de fútbol». Elegir el bloque del estado de resultados no depende del deporte, pero las pistas sí: «cuadros por jugador no se eligen», «Comerciales (socios, escuelas de fútbol…)». | **TEXTO**: el deporte entra en la primera frase. Las pistas de fútbol se quedan para fútbol. Para rugby: la nota por función (Turnover / Cost of sales / Administrative expenses) y el *Strategic Report* de Bath **sin números en tablas** (ingresos solo en prosa/£m con un decimal, plan 248 §5): `localizar`/`extraer` no lo saben leer hoy. | M (prompts) + L (si el Strategic Report hay que leerlo) |
| 28 | `glosar-rubros.mjs` L26, `perimetro-senales.mjs` L27-33, 223-239, 323, 395-397 (cuatro prompts: «negocio del fútbol del club», «el primer equipo, la academia») | Perímetro individual vs consolidado: la pregunta es «¿una controlada hace el negocio **del fútbol** del club?». | **TEXTO**: «del negocio deportivo del club ({deporte})». La regla (perímetro por quién hace el negocio) es la misma. Bath es una sola sociedad: no se ejercita. | S |
| 29 | `verificar.mjs` L193 (`LADO_CERO`: Televisión/Estadio/Salarios del plantel), L372, L580-680, L1158-1180, L1359 («gestión de jugadores neta», AS Roma) | Propuestas viejas con nombres de fútbol; el escalón «gestión de jugadores neta» es un caso de fútbol (pases). | `LADO_CERO` va con el punto 15. El escalón de gestión de jugadores corre solo si hay filas de pases (no se dispara en rugby). Nada que tocar, solo confirmar con una corrida de Bath. | S |
| 30 | `estadio-sponsor.mjs` (66 apariciones: `FICHA_CLUB` busca infoboxes de fútbol —`Infobox football club`, «Ficha de equipo de fútbol»—, páginas de temporada de la **liga** de fútbol en Wikipedia, `SOLO_ESTADIO`) y la compuerta que lo corre `cargar.mjs` L1225-1237 | La compuerta «un ejercicio nuevo no se escribe sin estadio y sponsor» lee Wikipedia de fútbol. Para Bath (rugby) no hay página de temporada con esa tabla ni infobox de fútbol. | La compuerta pasa a leer el deporte: plantillas de infobox por deporte (`Infobox rugby union club`) y listas de temporada propias, o `contexto-manual.json` para el club de prueba (ya soportado, con fuente). La salida corta para el 248: completar Bath a mano. | L (herramienta) / S (Bath a mano) |

## 4. Auditoría, generadores y sitio

| # | Dónde | Qué asume | Cómo | Trabajo |
|---|---|---|---|---|
| 31 | `audit.js` `checkCategorizacion` L1349-1362: `sin-salarios` (P2: «no hay `wages_squad` ni `lump_football_operations_expense`») y `sueldos-escondidos` (P2: `staffCost` vs `wages_squad`) | Chequea categorías de fútbol en **todo** club. Un club de rugby sin `wages_squad` dispararía los dos. | **LISTA por deporte**: la categoría de sueldos y la del bolsón desde la taxonomía del deporte; sin ella, el chequeo se saltea (con el 248 la genérica `first_team_staff` es el candidato). | S |
| 32 | `audit.js` `checkCategorias` L235-290 (`REVENUE_CATEGORIES`, `EXPENSE_CATEGORIES`, sonda de comportamiento, `categoria-huerfana`, `categoria-sin-bucket`) | Un solo enum global. El 248 ya prevé cambiarlo (`taxonomia-incompleta`, `bloque-motor-distinto`). | Ya está en el alcance del 248 (Datos 4); acá solo se avisa para que la sonda corra **por taxonomía**. | M (ya en 248) |
| 33 | `audit.js` L458 (comentario del bug `lump_football_operations`), `perfil-clubes` y `perimetro` | Solo comentarios. | Nada. | 0 |
| 34 | `generate-club-pages.js` L181 y L198: `sport: 'Soccer'` en el JSON-LD (`SportsTeam`, `SportsOrganization` de club y liga) | Todo club y liga se publica como `Soccer` ante Google. Bath saldría mal. | Leer `sport` del club/liga → vocabulario de schema.org (`Soccer`, `Rugby`…). Es publicado: cambia páginas generadas y su `--check`. | S |
| 35 | `generar-data.mjs` L43 y `json-datos.mjs` L53 (`sport`) | Ya lo pasan; el diccionario `futbol`→`football` lo agrega el 248. | Datos 4. | — |
| 36 | `generate-rankings.js`, `generate-fuentes-index.js`, `generate-sponsors.js`, `generate-club-index.js`, `estado.mjs`, `estimar.mjs`, `lote.mjs`, `generadores.mjs` | Sin hallazgos de fútbol en el código (solo nombres de clubes o comentarios). El ranking se arma por liga; el 248 le suma la liga de rugby. | Nada de pipeline. | 0 |
| 37 | `fetch-club-league-reference.mjs`, `lookup-club-league.js`, `listas-lote.mjs`, `faltantes-liga.mjs`, `ligas-sin-verificar.mjs` | Las ligas de referencia (la tabla de páginas de Wikipedia de `listas-lote.mjs`: `Serie C`, `Croatian Football League`…) son de fútbol; el parser de tablas funciona con la plantilla `sports table`, que también la usa el rugby. | Agregar `gb-premiershiprugby` a las páginas de Wikipedia que consultan (Datos 4 ya la define en el 248). | S |
| 38 | `club-sourcing` (SKILL y `paises/*`), `club-data-mapping` (SKILL.md y `referencia/*`), `club-or-year-onboarding`, `escala-finance-of-sports` | Las skills hablan de fútbol en todo (`club-data-mapping` 17 apariciones por archivo, `formato-simplificado.md` 22). No hay que reescribirlas: **una frase** que diga que el criterio vigente es de fútbol y dónde está el de otro deporte. | Mostrar el texto a Guido antes (memoria: no editar skills sin avisar). | S |

## 5. Orden propuesto y lo que necesita ok de Guido antes de codear

Orden por impacto (cada ítem es un cambio, un commit; la escalera: el deporte solo ordena y filtra, nunca decide una categoría):

1. **`deporte-club.mjs`** (pieza base) + Jev (#1-4) + `categorizar-claude.mjs` (#5, #7): lista de categorías y ejemplos por deporte. Es lo que Guido pidió y lo que hace posible Bath. Depende de que Datos 4 deje la taxonomía de rugby leíble por código.
2. **Compuertas de carga que hoy rechazan o frenan por fútbol** (#13, #15, #16, #18, #31): sin esto Bath se frena o pasa con una categoría de fútbol.
3. **Prompts de lectura** (#2, #6 la parte común, #27, #28, #23 texto): de bajo costo, pero para rugby la parte que cuenta es la de #6 (criterios), que es contenido.
4. **Alta** (#24-26): aceptar el deporte detectado; una sola lista.
5. **Estadio/sponsor de rugby** (#30), **reglas con deporte** (#10), **JSON-LD** (#34), **ligas de referencia** (#37), la frase en las skills (#38).

Cosas que **endurecen o agregan una condición** y se muestran a Guido antes de codearlas (regla de las tools):
- **#3/#7 FILTRO**: un ejemplo cuya categoría no existe en la lista del deporte del club no se muestra. Es una condición nueva (hoy no hay ninguna), aunque solo quita ejemplos que no se podrían elegir.
- **#10**: sintaxis nueva `CATEGORÍA (prompt, deporte)` en `CONVENCIONES-DATOS.md`.
- **#15**: tabla de «ceros que no pueden ser cero» por deporte; vacía en rugby hasta medir (relaja, no endurece).
- **#18/#25**: sin deporte no se asume fútbol, se pregunta.

Cosas que **no** se tocan: precedente por club (`precedente`, `precedenteFamilia`), `padres-filas.mjs`, `perfil-clubes.mjs`, la lógica de FX, períodos, caja y deuda, perímetro (salvo el texto), `bfo-rusia`.

Medición cuando se codee: el fútbol tiene que dar **idéntico** (los lotes de prueba de la sección 5 de la skill, `Admin/lotes/prueba-completa.txt`, y `caja-deuda.mjs --medir`); es el criterio de aceptación de cada commit de la lista.

## 6. Dudas para quien define el 248 (Datos 4)

- ¿La API de taxonomía vive en `data/category-map.js` (`SPORT_TAXONOMIES[deporte].revenue/expense`, como dice el plan)? Las tools de arriba la leen con regex (`loadCategories`) y no importan el archivo; si el mapa pasa a ser un objeto anidado, el regex hay que escribirlo de nuevo o el archivo exportarse como módulo para Node.
- El comentario de cada categoría (la «descripción completa» que ven Jev y Claude, `build()`) hoy sale de comentarios del `category-map.js`; para las subcategorías de rugby esas descripciones tienen que existir con el mismo formato, porque el prompt las usa tal cual.
- ¿Habrá una subcategoría de rugby equivalente a `lump_football_operations` (bolsón)? Las compuertas #18/#21/#31 la usan.

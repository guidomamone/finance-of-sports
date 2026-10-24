<!-- md: reglas de datos: categorías, perímetro, períodos, tipos de cambio | leer: al cargar o corregir datos de un club; la sección que toca -->
# Convenciones de datos

Reglas para cargar o corregir datos de un club: qué es un dato, qué se carga y cómo. Se lee cuando la tarea toca datos; las reglas de
proceso están en `Admin/CONVENCIONES.md` y las de pantalla en `Admin/PANTALLA.md`. Venían de `Admin/CONVENCIONES.md`, sin cambios de texto.

---

- **LA FUENTE DE LOS DATOS DE UN CLUB ES SU JSON: `data/<país>/<club>.json`.** El `data/<país>/<club>-data.js` que carga el sitio es GENERADO
  (`node tools/generar-data.mjs`; las tools de carga lo regeneran solas al escribir) y no se edita a mano: `audit.js` avisa si no coincide con
  su JSON (`json-js-desfasado`) o si el JSON no valida contra `data/schema/club-v2.json` (`json-no-valida`). Los dos se publican (el JSON es el
  dato abierto). **Los importes del JSON están en millones de la moneda del club** (`unit.scale = 1000000`, escrito en cada archivo): no se
  pre-convierten, y el gasto va en negativo. Nombres de campo en inglés y snake_case (`label`, `category`, `amount`, `financial.cash`,
  `adjustments.included_in`…); los textos libres, en español. Esquema y diccionario: `Admin/mediciones/245-esquema.md`.
- **CADA LÍNEA TIENE DOS CATEGORÍAS: `subcategory` (la del deporte) y `category` (la genérica). LA GENÉRICA NO SE ELIGE: SE DERIVA.**
  Lo que se decide al cargar es la subcategoría (`normalizedCategory` en el data file: `wages_squad`, `broadcasting`…), con el criterio de
  `club-data-mapping`. La genérica (`first_team_staff`, `media_rights`…, la misma para cualquier deporte) sale del mapa `SPORT_TAXONOMIES` de
  `data/category-map.js` (`genericCategoryOf`); `tools/json-datos.mjs` la escribe sola y no deja escribir un par que no coincida. Una
  subcategoría del otro lado (`exceptional_items` en una línea de ingreso) va a la genérica catch-all de su lado (`other_revenue`,
  `other_operating_expenses`), que es donde ya se ve en pantalla. Una subcategoría nueva necesita su genérica en el mapa en la misma
  sesión (`audit.js`, `taxonomia-incompleta`). Cambiar la genérica de una subcategoría ya cargada sube la versión (`club.taxonomy`) y se
  migra con `tools/migrar-v2.mjs`, sin tocar importes ni subcategorías. El mapa y sus bloques: `Admin/mediciones/248-plan.md`.
- **EL JSON Y EL `-data.js` NO LLEVAN COMENTARIOS.** Se publican enteros: cada comentario lo baja cada visitante, y se lee con
  "ver código fuente" (el JSON ni siquiera los admite; el JS generado trae una sola cabecera fija: "GENERADO desde … no editar"). La evidencia de una carga (de qué documento sale, perímetro, unidades, por qué cada rubro va a su categoría,
  ajustes, contra qué total cierra, de dónde salió la caja y la deuda) va en `Admin/carga-clubes/<clubId>.md`, que no se publica. Un
  título por ejercicio, y adentro ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de fila, porque hay
  nombres de rubro repetidos dentro del mismo año. Lo escriben los scripts del pipeline cuando cargan, y una carga a mano también.
  Cuando termine la mudanza, `node tools/audit.js` va a avisar si aparece un comentario en `data/`.

- **IDENTIDAD DEL CLUB (`data/clubs.js`).** `clubs{}` es central porque hace falta ANTES de elegir ningún club; `sources{}`,
  `gestionesByClub{}` y `memberCountByClub{}` se autoregistran desde el data file de cada club (en el JSON son `sources[]`, `management[]` y `members`; el generador los emite como `Object.assign(sources, …)`, `gestionesByClub[id]` y `memberCountByClub[id]`). Boca sigue la misma estructura que los demás. `name` es el nombre legal
  completo; `displayName`, el corto que muestra el selector. **`brandColor`** (el círculo de iniciales; nunca escudos como imagen, por
  derechos y hosting) es el color VERIFICADO contra la fuente del club (sitio oficial, infobox de Wikipedia del país, la クラブカラー de
  la J.League), nunca deducido de otro club; si la fuente da solo el nombre del color, el hex sale de la paleta publicada del escudo.
  **Puede faltar a propósito**: `brandColor:null` = se miró y no lleva color (ej. los clubes cuyo color es el blanco, que no se ve en el
  modal), y nadie lo completa a ojo después; el campo AUSENTE = nadie lo chequeó (`audit.js`, `club-sin-color-ni-null`). Cómo se
  resuelve el color de un club nuevo: skill `club-or-year-onboarding`, `club-nuevo.md`. De dónde salió el color de cada club: su
  `Admin/carga-clubes/<club>.md`. El color de las iniciales no se guarda: lo decide `textoSobre()` por contraste.

- DÓNDE PUEDE VIVIR UN DATO INVENTADO, Y DÓNDE NO. El proyecto existe porque sus números son verificables, así que un
  archivo de datos de mentira es lo más peligroso que se le puede agregar. **Hoy no hay ninguno.**
  Si vuelve a hacer falta uno para prototipar —el caso real fue Guido pidiendo "el tener datos
  incompletos me limita la creatividad", con la condición que él mismo puso: "documentar bien lo que
  estamos tocando para no arrastrar balances inventados"— se permite UNO, con estas 6 condiciones, y
  el día que se rompa cualquiera hay que borrarlo:
  (1) NO vive en `data/`, y lleva "inventados" en el nombre;
  (2) lo carga SOLO la página que lo necesita, que no está linkeada desde ningún lado, nunca
      `index.html`;
  (3) ninguna herramienta lo ve: `tools/audit.js` y `auditAll()` leen `data/*.js`, así que no puede
      ensuciar una verificación;
  (4) cada ejercicio inventado se declara solo — `inventado:true` en su meta, una entrada en
      `sources{}` con `type:'placeholder'`, cada rubro terminado en "(inventado)" y la marca
      "· INVENTADO" al lado del año en todos lados;
  (5) NO se copia a `data/` jamás: el día que ese club publique su balance real se carga leyendo el
      documento, no promoviendo el relleno;
  (6) **NO QUEDA EN EL REPO MÁS ALLÁ DE LA SESIÓN QUE LO NECESITA**. Netlify publica la raíz, y `netlify.toml` solo borra del deploy lo
      interno (`Admin/`, con las notas de sourcing; `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/` y `Generados/`). Todo lo demás
      que está trackeado es alcanzable por URL en `financeofsports.com`: la raíz, `data/`, `js/`, `fuentes/*.html` y las
      transcripciones de `Clubes/`. El relleno de los prototipos estuvo servido públicamente tres días sin
      que nadie se diera cuenta. Tenía su franja roja y nadie estaba linkeado a él, pero un sitio
      cuyo argumento entero es que sus números son verificables no puede servir números falsos desde
      su dominio. Vale para cualquier cosa que se deje en el repo "por las dudas".
- NO EXISTE NINGUNA ARISTA CLUB -> LIGA SIN AÑO (decisión de arquitectura que salió
  de un pushback de Guido: "si el usuario quiere ver cuánto generaba una liga en 2025 y 2024, 2023,
  2022, tiene que tener en cuenta que los clubes fueron cambiando"). `data/leagues.js` es el
  CATÁLOGO de ligas (nombre, país, deporte, escalón) y no tiene una sola línea de membresía. La
  membresía es (club, ejercicio) -> liga y vive solo en `data/club-leagues.js`. Todo agregado de
  liga (promedio, mediana, ranking, "cuánto generaba la liga en 2022") pasa por
  `clubsOfLeagueYear(liga, ejercicio)`: si una función nueva necesita "los clubes de la liga L" sin
  año, está mal planteada. Para NAVEGAR sí existe `clubsOfLeague(L)` sin año, y su conteo significa
  "clubes con al menos un ejercicio cargado acá", que NO es "los clubes de la liga" y el sitio no
  puede afirmar lo segundo. LA REGLA SUBE UN ESCALÓN: el TAMAÑO de la liga tampoco
  puede ser un número suelto, porque también cambia por temporada, así que `LEAGUES[].totalClubs`
  se eliminó en vez de llenarse y el dato vive en `LEAGUE_SIZE_BY_YEAR` (liga, ejercicio) ->
  cuántos equipos, en los mismos `data/club-leagues/<iso2>.js`, y se lee con `leagueSizeAt(liga,
  año)`. Un "N de M" solo se puede escribir si el M no es null Y el N salió de
  `clubsOfLeagueYear()`, o el N y el M serían de temporadas distintas. Un campo
  `clubs[id].league` con "la liga de hoy" está prohibido: sería una segunda verdad sobre el
  mismo hecho. En el árbol del selector, un club aparece bajo cada liga en
  la que tiene un ejercicio cargado.
- "SIN DATO" NO ES CERO. Un cero se lee como un dato, y este sitio no muestra datos que no tiene. Se muestra
  "sin dato" y no "0,0 M USD" cuando la fuente no informa: deuda (los dos campos en null, o los dos
  en CERO EXACTO, que es como lo escriben los presupuestos), masa salarial que el documento no
  desglosa, un club sin padrón de socios publicado, y GASTOS — los 10 clubes japoneses tienen
  `expenseLines: []` y `officialTotalExpenses: null` porque la J.League publica el ingreso de cada
  club y no su estructura de costos. El resultado del ejercicio cae con los gastos: es el final de
  una cascada que arranca ahí.
  LO QUE COSTÓ ENTENDER: esto no es un
  criterio de UNA vista. Mientras lo aplicó solo la comparación, la ficha de Finanzas de Cerezo
  Osaka decía "Gastos 0,0 M USD" y "Resultado neto +38,1 M USD" en el cuerpo de letra más grande de
  la página — ese club no ganó 38 millones, simplemente no sabemos qué gastó. Y arreglar solo los
  KPIs dejaba la tabla de abajo diciendo "Total Gastos 0,0" en la misma pantalla: media pantalla
  honesta es peor que ninguna, porque el visitante no sabe a cuál creerle. **Si aparece una vista
  nueva que muestre estos indicadores, aplica igual.**
  OJO, esto es un criterio de la VISTA: el dato sigue diciendo 0 en el archivo del club.
  Y LA LECCIÓN DE MECANISMO: **el test de "la fuente no informa esto" va en UNA
  función compartida, no escrito adentro de cada función de render.** Las tres veces la causa fue la
  misma — una vista tenía el test y la de al lado no, así que la misma pantalla se contradecía sola:
  el KPI publicaba "Deuda neta · 0,0 M USD" y tres centímetros abajo el aviso decía que ese cero no
  significa nada. Hoy hay dos helpers y hay que usarlos: `informaDeuda(clubId, year)` para Inicio
  (trabaja sobre `fiscalYearMeta`) y `deudaNoDesglosada(c)` para Finanzas (trabaja sobre el objeto
  ya computado), los dos en `js/finanzas-render.js`. Una vista nueva que muestre deuda llama a uno
  de esos dos; si necesita un test que todavía no existe, se escribe como función aparte y la usan
  todas, nunca en línea.
- INGRESO EXTRAORDINARIO: SE QUEDA EN `exceptional_items` (decisión de Guido). Las 5 líneas de ingreso extraordinario de Racing (2009, 2010, 2012, 2014:
  desafectaciones de previsiones y condonaciones) usan `exceptional_items`, que es una categoría de
  la taxonomía de GASTOS. Se evaluó la alternativa —crear una categoría de ingreso extraordinario
  con fila propia en Formato simplificado, que eran 4 ediciones chicas y no movía ningún número— y
  Guido decidió dejarlo como está.
  LO QUE HAY QUE SABER ANTES DE "ARREGLARLO": la consecuencia está aceptada, no pasada por alto. En
  Formato simplificado esas líneas caen bajo "Otras secciones deportivas y otros ingresos"; el total
  del ejercicio cierra igual (el motor suma por monto, no por bucket) y Formato del club las muestra
  con su `rawLabel` textual, que dice "(extraordinario)". Los 5 hallazgos están silenciados en
  `tools/audit-ignore.json` con este motivo escrito. **No recategorizar sin volver a preguntarle.**
- **No se recategorizan líneas ya cargadas** para unificar criterios entre clubes; solo un error claro (un rubro del lado o la categoría evidentemente equivocados). Una inconsistencia entre clubes no abre un to-do.
- "LA FUENTE REPORTA CERO" NO ES "LA FUENTE NO LO DESGLOSA" (decisión de
  Guido). Es la misma familia que "SIN DATO NO ES CERO" de más arriba, pero un nivel más abajo: no
  en los KPIs, sino en cada fila de Formato simplificado.
  LA REGLA, implementada en `bucketize()` (`js/finanzas-calc.js`): **si una sección tiene un bolsón
  "sin desglosar por la fuente" (`lump_football_operations`/`_expense`) CON PLATA ADENTRO, cualquier
  otra fila que dé cero se muestra "—", no $0.** Esa plata puede estar adentro del bolsón, así que
  el cero es un "no sabemos". Un club que SÍ desglosa todo y no vendió jugadores sigue mostrando
  "Venta de Jugadores $0", porque ahí el cero es real: sin bolsón no hay ambigüedad. El catch-all
  queda afuera de la marca a propósito — que dé cero significa que todas las líneas encontraron su
  fila, que es información buena.
  EL CASO QUE LO MOTIVÓ: Gamba Osaka mostraba "Televisión $0" con 5.074 de sus 8.817 M JPY en el
  bolsón, porque el informe de la J.League publica 3 líneas por club y el desglose existe solo a
  nivel división. Un periodista que comparaba Gamba con Real Madrid leía que un club de primera
  japonesa no cobra derechos de televisación.
  NO MUEVE NINGÚN NÚMERO: las filas marcadas valen 0, los totales son idénticos.
- LA LIGA DE UN EJERCICIO ES LA DEL CIERRE (decidido por Guido). Cuando un ejercicio
  cruza dos torneos (los argentinos cierran el 30/6 y la temporada va de febrero a diciembre), en
  `data/club-leagues.js` se anota la división en la que estaba el club EL DÍA QUE CERRÓ EL BALANCE.
  Es la misma regla que el proyecto ya usa para atribuir la gestión presidencial, y por eso se
  eligió: una regla menos que explicar y que recordar. Ojo con lo que NO dice: no afirma que todos
  los ingresos del ejercicio se hayan generado en esa categoría, y cuando el club ascendió o
  descendió en el medio, la mitad de la plata viene de la otra. Si alguna vez eso importa para una
  comparación, se agrega el matiz en el aviso, no cambiando el criterio.
- EL `clubId` DE UN CLUB NUEVO LLEVA EL PAÍS AL FINAL (decidido antes del selector
  jerárquico). `racingsantander-es`, `nacional-uy`, `independiente-co`. Por qué: el `clubId` no es
  una clave más, nombra el archivo de datos (el JSON `data/<país>/<clubId>.json` y su `<clubId>-data.js` generado, por convención de
  `loadClubData()`) y prefija cada `sourceId` (`racing-ar-balance-2009`), así que una colisión se paga
  en tres lugares. Los nombres se repiten entre países mucho más de lo que parece: Racing
  (Argentina y Santander), Independiente (Argentina, del Valle, Medellín), Unión (Argentina,
  Española, Magdalena), Nacional (Uruguay, Paraguay, Colombia, Ecuador). Ya pasa en `fuentes/`, con
  un Olimpia de Honduras y otro de Paraguay, y ahí no choca solo porque el país es una carpeta.
  OJO CON LA SINTAXIS: un id con guion NO es una clave JS válida sin comillas, así que en
  `data/clubs.js` va `'racing-es': { id:'racing-es', ... }`, con la clave entre comillas. Se
  descubrió rompiendo el archivo al probar el chequeo.
  EL ID DE UN CLUB NUEVO LO PONE `tools/alta-club.mjs`, nadie a mano: slug del nombre de la carpeta más el país. Si la sesión cree que hace
  falta otro, la pregunta va a la Auditora antes del alta: después de publicado, cambiarlo exige un alias para siempre. Una referencia a un club
  (un alias de `tools/club-league-reference/alias.json`, una entrada de `data/club-leagues/`) se agrega en el mismo commit del alta o después,
  nunca antes; `audit.js` lo vigila (`referencia-a-club-inexistente`).
  EL FORMATO ES `<slug>-<iso2>` PARA TODOS, con el `country` de `clubs.js`. Un id nunca se reutiliza ni
  se borra de la historia: si un club cambia de id, el viejo pasa a `data/club-aliases.js` (alias →
  id vivo, sin cadenas, y un alias nunca es también un id vivo) y queda para siempre, porque hay links
  compartidos, búsquedas guardadas y `fuentes/<id>.html` indexadas con el id viejo. Para el redirect de
  `fuentes/` se agregan las dos reglas 301 a `netlify.toml`. `node tools/audit.js` vigila el formato
  (`clubid-sin-pais`, P1) y el mapa (`alias-roto`, P1). Los tools aceptan un id viejo (`normalizarId()`).
- `note` ES INTERNA Y NO SE RENDERIZA NUNCA; LO QUE VE EL VISITANTE ES `publicNote` (después de que Guido revisara la primera versión de la pestaña Fuentes: "veo que en Salvedades a
  veces pones 'descargado por Guido' o direcciones que son de mi computadora. Eso no puede
  aparecerle al usuario"). `sources[].note` es la nota que una sesión le deja a la siguiente: dónde
  quedó la transcripción, cómo se leyó el PDF, qué falta. Las 91 entradas la tienen y 64 mencionan
  el nombre de Guido o rutas del repo. `sources[].publicNote` es la que se muestra: una o dos
  oraciones escritas para un lector, y SOLO donde hay una salvedad que no se puede deducir de los
  datos (hoy 17 de 91). Todo lo demás sale derivado por `sourceCaveats()` (`data/sources-view.js`)
  de los campos que ya existen: que el tipo de cambio sea de referencia, que el documento no publique
  el resultado del ejercicio, que no informe deuda ni caja. Un club nuevo trae esas salvedades bien
  sin que nadie escriba una línea. Lo vigila `node tools/audit.js`: `nota-publica-con-interno` (P1)
  si un `publicNote` menciona un nombre propio, una ruta o un detalle de transcripción, y
  `note-interna-renderizada` (P1) si alguien vuelve a interpolar `.note` dentro de HTML.
- UN EJERCICIO ANTERIOR AL EURO SE CARGA EN SU MONEDA LEGADO (decisión de Guido con Lazio 1998-99 a 2000-01 en liras). Para
  sumar otra moneda (DEM, ESP, FRF, NLG, PTE...): la entrada en CURRENCY_META con `euroFijo` (unidades por 1 EUR, paridad irrevocable del
  31/12/1998), su cotización de cierre en FX_CLOSE (`XXX@AAAA-MM-DD`, en data/currency-map.js) y un ajuste manual `moneda` en cada documento
  (tools/ajustes.mjs). `toDisplayValue` (js/finanzas-calc.js) ya la muestra en EUR por la paridad fija. Los deflactores llegan hasta 1995
  (tools/fetch-fx-reference.mjs --deflactores): un ejercicio anterior necesita bajar ese corte.
- PROCEDENCIA DEL TIPO DE CAMBIO: TODO `fx` DECLARA DE DÓNDE SALIÓ (a pedido de Guido:
  "si yo mañana quiero auditar los tipos de cambio usado para cada club para cada año y entender si
  salieron de internet o del club, ¿puedo hacerlo sin drama?", la respuesta era que no). Cada
  ejercicio lleva `fxSource` con uno de los 7 valores de `FX_SOURCE` (`data/currency-map.js`), o
  `fxRef` apuntando a `FX_CLOSE`. **La regla de cuál de las dos formas usar**: si el tipo de cambio
  lo declara el propio documento, el número va LITERAL en el archivo del club (`fx:909,
  fxSource:'document_close'`), porque es un dato de ESE club y dos clubes pueden declarar valores
  distintos para el mismo día; si el documento no declara nada y se usó una cotización pública, NO
  se escribe el número en el archivo del club, se referencia la entrada de `FX_CLOSE`
  (`fxRef:'EUR@2025-06-30'`), porque es un dato del mercado y antes se copiaba club por club (33
  copias de 9 valores). `document_assumption` (la premisa de un presupuesto) es una categoría
  aparte de `document_close` a propósito: un presupuesto declara un pronóstico que puede terminar
  equivocado, no un cierre ya ocurrido. Detalle completo y tabla de los 7 valores en
  `.claude/skills/club-data-mapping/referencia/fx.md`. Lo chequea `node tools/audit.js`: un `fx`
  sin procedencia sale listado, y una cotización de mercado que contradiga a la tabla para la misma
  fecha también.
- PRESUPUESTOS EN CAJA Y EN AÑO CALENDARIO: un presupuesto de caja con sección "Extraordinaria" se carga SOLO en su parte Ordinaria ("Resultado
  Ordinario" es el PAT del ejercicio): regla completa en `.claude/skills/club-data-mapping/referencia/casos-por-pais-y-formato.md`, "Un presupuesto
  de CAJA...". Un presupuesto en año calendario no se carga con un solo documento: ver al final de este archivo ("ex §15"). Cuando la
  gestión de un ejercicio queda dividida entre dos presidentes, se atribuye la que está a cargo al cierre y la duda va a
  `Admin/dudas-por-club.md`.
- "ESTADIO" EN FORMATO SIMPLIFICADO ES UNA SOLA FILA que junta `matchday_competition`, `season_tickets` y `stadium_other`; el acordeón las
  separa por `rawLabel` de cada club (criterio y filas: `club-data-mapping/referencia/formato-simplificado.md`). **Cómo se revierte, si Guido
  cambia de idea**: `ABONOS_DENTRO_DE_ESTADIO` en `js/finanzas-calc.js` pasa a `false` y vuelve la fila "Abonos" en su posición histórica
  (6ta). No hay que tocar ningún archivo de datos: `season_tickets` es la misma categoría en los dos escenarios, solo cambia en qué fila se
  muestra. Sí hay que correr `node tools/generate-rankings.js` después (los rankings hornean el nombre de cada fila); si te olvidás,
  `node tools/audit.js` lo marca como P1. Los colores y las claves i18n de "Abonos" y de "Estadio: recaudación de partidos" se dejaron
  vivas a propósito para que revertir no obligue a volver a elegirlas.
- INGRESOS TIENE LAS FILAS "Educación" (`education`) y "Otras secciones deportivas" (`other_sports` + `youth_football` + `womens_football`),
  y el catch-all se llama "Otros ingresos" a secas (simétrico con "Otros gastos"). Qué va en cada una, y el criterio conservador para
  `stadium_other`: tabla de `.claude/skills/club-data-mapping/SKILL.md`, sección 1.
- SUB-ÍTEMS EN `items`: solo si son todos la misma categoría que el padre; si cada uno tiene su categoría real distinta, van como líneas de
  PRIMER NIVEL (`items` no lo mira `sumCat()`/`computeYearGeneric()`, así que lo enterrado ahí desaparece de "Formato simplificado"). Regla
  completa: `.claude/skills/club-data-mapping/SKILL.md` sección 1; el ejemplo de Racing: `referencia/casos-por-pais-y-formato.md`, "Ejemplo
  largo"; cómo detectarlo probando en el navegador (mirar CADA bucket, no solo el total): `Admin/PANTALLA.md`, ex §8.
- OJO REGLA REFORZADA: NUNCA cargar datos al sitio
  extrayendo un PDF directo, sin pasar antes por una transcripción completa
  a Markdown (CLAUDE.md ya lo decía, pero se saltó una vez con el
  presupuesto 2026/27 y se perdió detalle real. Guido lo notó comparando
  contra el PDF). Un "resumen para ahorrar tokens" en el momento de
  transcribir casi siempre implica volver a hacerlo dos veces cuando falta
  algo. Verificar SIEMPRE si existe el .md en `Clubes/<País>/<Club>/` antes
  de asumir que un dato no está desglosado en la fuente.
- OJO Ejercicio 2027 tiene categorías EXTRA en el Formato simplificado que
  los demás ejercicios no tienen (Televisión/Premios por competencias en
  Ingresos; Organización de partidos/Otras secciones deportivas/
  Administración y gastos generales en vez de un solo "Otros gastos"),
  es a propósito: ese es el único ejercicio con el
  desglose fino disponible (ver presupuesto-26-27.md), así que se usa donde
  hay dato real en vez de forzar una categoría vacía o aproximada en todos
  los ejercicios por igual. Si se carga un balance nuevo con este mismo
  nivel de detalle, evaluar si amerita el mismo tratamiento especial en el
  Formato simplificado (`js/finanzas-calc.js`).
## REGLA (a pedido de Guido): un presupuesto en año CALENDARIO se reconstruye a temporada, nunca se carga tal cual


Motivo del pedido: Instituto ACC publicó su Presupuesto 2025 (y sus Premisas) en año calendario
(ene-25 a dic-25, con columna por mes), pero el sitio entero modela todo en TEMPORADA/ejercicio
económico (el mismo criterio que ya usa el balance auditado real de ese club, jul-jun) — cargar el
documento tal cual metería un `year` key que no es comparable con ningún otro del mismo club (un
"año" que arranca en enero, al lado de ejercicios que arrancan en julio).

**La regla, para cualquier club futuro que publique un presupuesto en año calendario**: nosotros
mismos reconstruimos la temporada, no lo subimos en año calendario. Si el documento tiene desglose
MENSUAL (columna por mes, no solo un total anual), se puede partir en 2 mitades de 6 meses y sumar
cada mitad con la mitad correspondiente de OTRO presupuesto calendario (el del año anterior o el
siguiente) para reconstruir una temporada completa (ene-jun de un año + jul-dic del año anterior =
temporada jul-jun). Si el documento NO tiene desglose mensual (solo un total del año calendario
entero), no hay forma de reconstruir ninguna temporada con un solo documento — hace falta el
documento del año calendario siguiente/anterior igual, para poder recortar cada uno a su mitad útil
antes de sumarlos.

**Caso real que disparó la regla, Instituto Presupuesto 2025**: SÍ tiene desglose mensual (12
columnas, ene-25 a dic-25 — ver `Clubes/Argentina/Instituto/presupuesto-2025.md`), así que en teoría
se podrían reconstruir 2 mitades de temporada: ene-jun 2025 (2da mitad del Ejercicio 2024/2025) y
jul-dic 2025 (1ra mitad del Ejercicio 2025/2026). Pero Instituto solo tiene ESTE presupuesto
descargado — no hay un Presupuesto 2024 (para completar la mitad jul-dic 2024 del Ejercicio
2024/2025) ni un Presupuesto 2026 (para completar la mitad ene-jun 2026 del Ejercicio 2025/2026) —
así que NINGUNA de las 2 temporadas queda completa con lo que tenemos hoy. Conclusión (regla
explícita de Guido: "para el caso en que tengamos solo la mitad de un año y sea irreconstruible,
mantengamos esa info pero no subamos info incompleta"): **no se cargó nada al sitio** para este
presupuesto — ni el año calendario tal cual (rompería el modelo de datos), ni una mitad de temporada
sola (sería un ejercicio incompleto, y el sitio no tiene forma de marcar "esto es solo 6 meses" sin
que se lea como un ejercicio completo raro). El documento y el hallazgo quedan documentados en
`Admin/sourcing/Argentina/Instituto.md` (ver el índice en `Admin/sourcing/_indice/Argentina.md`) para que si en el
futuro aparece el Presupuesto 2024 o 2026 del mismo club, se pueda completar una de las 2 temporadas
y recién ahí cargarla.

**Balances parciales (de menos de 12 meses).** La misma regla vale para un BALANCE de menos de 12 meses (un cambio de
fecha de cierre, un semestral): no se carga solo. Va a `Admin/registros/documentos-parciales.txt` (no a `documentos-descartados.txt`, que es para lo que no
sirve), con lo que cubre y el tramo que falta; `lote.mjs` lo saltea y `tools/estado.mjs` lo lista en cada corrida con lo que falta, y la ficha del club
en `Admin/sourcing/<País>/<Club>.md` dice qué tramo buscar. CÓMO SE JUNTAN DOS TRAMOS cuando aparece el que falta: (1) tienen que ser el mismo perímetro
(individual o consolidado), la misma moneda y tramos contiguos que sumen exactamente 12 meses del ejercicio que se quiere armar; (2) ingresos y
gastos se suman rubro por rubro en moneda local, y el resultado tiene que dar la suma de los dos resultados impresos; (3) el ejercicio queda con
el cierre del SEGUNDO tramo (su `cierre`/`fxRef`, su caja y su deuda, que son saldos a esa fecha); (4) `publicNote` dice de qué documento sale cada
tramo y sus fechas. Si alguna de esas condiciones no se cumple (perímetro o moneda distintos, tramos que no son contiguos), no se juntan y los dos
quedan como parciales. Si un tramo es parte de un ejercicio cuyo balance anual completo existe (Juve Stabia: semestral al 31/12/2024 del ejercicio
2024-25), lo que se busca es ese balance anual, no el otro semestre.

**Primer ejercicio de una sociedad nueva (decisión de Guido).** Un período de menos de 12 meses SIN otro tramo posible se carga como el
año: es el primer ejercicio de una sociedad que antes no existía (una ΠΑΕ recién constituida) y, como la liga no se juega todos los meses, contiene
la temporada entera del club. La señal sale del propio documento: la columna del año anterior no tiene ningún importe distinto de cero (o no
existe). Casos: Kifisia 2022 (09/08/2021 – 30/06/2022, sin columna) y Volos 2019 (24/07/2018 – 30/06/2019, la plantilla griega imprime la
columna 2017-2018 toda en 0,00). Un cambio de cierre o un semestral siempre tienen importes del año anterior y siguen siendo parciales. La
fuente lleva `publicNote` "Primer ejercicio de la sociedad: del ... al ... (N meses)". Lo aplica `tools/cargar.mjs` (sin cola).
Lo mismo vale para un primer ejercicio de MÁS de 12 meses (decisión de Guido): la sociedad se constituyó antes de la temporada
y su primer cierre llega 14 a 18 meses después. Se carga como el año del cierre, con los importes tal cual (sin prorratear: el fútbol
arranca con la temporada) y la misma nota. Casos: Anderlecht 2011 (24/02/2010 – 30/06/2011, 16 meses; vendió 39,1 M y en 2012, de 12
meses, 67,9 M), RAAL La Louvière 2018, Sint-Truiden 2013 y Zulte Waregem 2012. Un cambio de cierre largo (Westerlo 2015, 01/01/2014 –
30/06/2015) tiene importes del año anterior y no entra por esta regla, sino por la siguiente.

**Ejercicio de transición de más de 12 meses por cambio de cierre (votación, 2 a 1).** Un ejercicio largo que SÍ trae importes del
año anterior, contiguo con el anterior y que contiene la temporada entera, se carga como el año del cierre, con los importes tal cual (sin
prorratear: prorratear inventa un desglose mensual que el documento no trae) y `publicNote` con las fechas y los meses. Sin tope de meses: un
tope contradiría a Anderlecht 2011 (16 meses) ya cargado, y ningún caso conocido pasa de 18. Casos: Westerlo 2015 (01/01/2014 – 30/06/2015,
18 meses), Aston Villa 2023-24 (13 meses) y Wolves 2025 (01/06/2024 – 30/06/2025, 13 meses). Un tramo que deja afuera parte de la temporada
sigue siendo parcial. La comparabilidad con un año de 12 meses la cubre la `publicNote`.

**Tramo corto de transición sin hueco (votación 2 a 1, con el sí de Guido).** Un ejercicio de menos de 12 meses por cambio de la fecha de cierre
se carga como un ejercicio propio (`fiscal_year` = año del cierre, importes tal cual, sin anualizar) si (a) el ejercicio anterior, cargado o con
documento, termina el día anterior al inicio del tramo, (b) el siguiente empieza el día después de su cierre y (c) ningún balance anual cargado o
conocido contiene esas fechas. Lleva `publicNote` «Ejercicio de transición de N meses por cambio de la fecha de cierre: del DD/MM/AAAA al DD/MM/AAAA.
No es comparable con un año de 12 meses.» y no entra al ranking por año, a la mediana de la liga ni a las variaciones interanuales. Si (a), (b) o (c)
falla, es parcial (`documentos-parciales.txt`, con «falta: …»), sin pregunta. Casos: Fiorentina 2020 (enero a junio), Genoa 2024, Atalanta 2022. Un
semestral dentro de un ejercicio cuyo anual existe (Juve Stabia, Estrela da Amadora) falla (c). El detalle de la votación:
`Admin/propuestas/transicion-y-covid.md`.

**Temporadas de la pandemia (votación 3 a 0).** Los ejercicios con `period_end` entre 2020-03-31 y 2021-12-31 se cargan con los importes impresos,
sin ajustar ni anualizar: la realidad fue parcial, no el documento. Dentro de esa ventana la taquilla o el estadio en 0 no piden reintento
(`tools/cargar.mjs`; se apaga por documento con el ajuste `covid-omitir`). `salto-interanual`, `outlier-liga`, el tie-out, el perímetro, la escala y el
signo no se tocan: no disparan por la pandemia y son los que atajan un error de unidad. En pantalla, esos ejercicios llevan la marca «COVID»; no hay
`publicNote`. Casos: AEK 2021 y Asteras 2021 (taquilla en 0 real).

**Ejercicio de 11 meses por cambio de cierre (decisión de Guido).** Cuando un club pasa el cierre de julio a junio, el ejercicio
de transición (1 de agosto a 30 de junio, 11 meses) se carga como el año: contiene la temporada entera y no hay otro tramo que buscar. Casos:
Benfica 2007-08 ("período de 11 meses, que compreende o período de 1 de Agosto de 2007 a 30 de Junho de 2008") y Sporting 2003-04. La
fuente lleva `publicNote` con las fechas y los meses. Un semestral o un tramo que deja afuera parte de la temporada sigue siendo parcial.
`cargar.mjs` lo reconoce por la cadena de cierres con los otros documentos del club: el cierre anterior más los meses del período da este
cierre, y el siguiente cierra 12 meses después.

**Nota aparte encontrada en el mismo documento** (no una regla, un dato suelto para no perder): la
última columna mensual del PDF de Instituto dice "dic-24" en vez de "dic-25" — es un typo del propio
documento (todas las demás 11 columnas van ene-25 a nov-25, y el total anual solo cierra si esa
columna es diciembre del MISMO año 2025), no un error de transcripción.

## REGLA: deducciones de ingresos que el documento no abre por tipo de ingreso

Cuando el documento imprime UNA línea de deducciones ("(-) Deduções da receita", tributos y descuentos sobre el ingreso bruto) sin decir a
qué ingreso corresponde cada parte, va ENTERA a `other_income`, en negativo. No se reparte entre TV, entradas, patrocinio, etc.: repartirla
sería inventar una apertura que la fuente no da. Cuando el documento sí la abre por ingreso (Goiás desde 2021: "(-) INSS Patrocínio",
"(-) IRRF Jogos Lotéricos"...), cada parte va con su ingreso o a `other_income` según su texto. Consecuencia esperable, no un error: en esos
años `other_income` puede quedar negativo (Goiás 2008-2017). Una auditoría que lo vea no lo reabre; si el signo es lo que la alarma, las
líneas verificadas están en `tools/audit-ignore.json`.

## REGLA: una línea que junta dos conceptos se carga entera en una categoría, y el año dice dónde quedó la otra

Cuando el documento junta dos conceptos en UNA línea sin separarlos (Bahia: "Sócios e bilheteria"; Vitória: premios de copa + socio-hincha;
América Mineiro: "atividades sociais", que puede incluir cuotas), la línea va entera a la categoría principal y NO se reparte. En el
`fiscalYearMeta` del año (en el JSON, `adjustments.included_in`) se agrega `incluidoEn: { <categoría que queda en 0>: '<categoría donde está> }'`, por ejemplo
`{ member_dues: 'matchday_competition' }`. La vista simplificada de Finanzas pinta entonces "Dentro de otro rubro" (con el nombre de la fila
en el bocadillo; textos de Guido) en vez de $0, sin tocar
el valor (sigue siendo el número 0, así que los totales no cambian). Una auditoría no lo reabre como "socios en 0".
Si no está confirmado que el concepto esté en esa línea (América Mineiro: "atividades sociais"), la forma es
`{ member_dues: { en: 'other_income', posible: true } }` y el sitio dice "Posiblemente dentro de otro rubro". La decisión se guarda también como
ajuste manual `incluye` (`tools/ajustes.mjs`), para que una recarga con `cargar.mjs` la conserve.
SIN DECISIÓN DE GUIDO, POR PRECEDENTE: si el año tiene un renglón "sin desglosar por la fuente" y una fila en
"—" tiene plata en TODOS los otros balances desglosados del club (al menos 2; presupuestos no cuentan), `tools/dentro-de-otro.mjs` escribe
`{ en:'lump_football_operations(_expense)', posible:true, por:'precedente' }`. Esas marcas (con `por`) son de la tool: cada corrida las
borra y las recalcula; nunca se editan a mano. Para corregir una, un ajuste `cero-real` (el 0 es real) o `incluye` (dónde está), y correr
la tool otra vez.

GESTIÓN DE JUGADORES NETA DE ROMA (decisión de Guido). En Roma 2007, 2009, 2012 y 2013 a 2017 la compraventa de jugadores sale neta en el estado
("Gestione operativa netta calciatori", 4.428 en 2007, 9.060 en 2012) y se carga neta como un ingreso si es positiva (ajuste `fila`, lado ingreso, la línea de esa fila; no la nota con el bruto).
Desde 2018 el estado IFRS la trae bruta ("Ricavi da gestione dei diritti pluriennali" en ingresos) y se carga bruta. Los ingresos de los dos regímenes no son comparables: el chequeo del año
vecino los marca "otro régimen" ("no se puede comparar"), no como error. Con el neto, el ingreso de Roma 2007 (162.017 sin las existencias) coincide con la columna 2007 del documento de 2008.
Sus totales impresos de ingresos y gastos excluyen amortizaciones y provisiones que se imprimen debajo, así que "total de ingresos" y "total de gastos" quedan en rojo aunque el resultado
cierre: se aceptan por la cola, como Roma 2018. Falta, si Guido la quiere, una nota pública en la página del club que lo avise.

UN COMPARATIVO REEXPRESADO NO ES LA TRANSCRIPCIÓN DEL AÑO (Salernitana 2022, decisión de Guido). Si el PDF de un año es un escaneo ilegible, el año se puede cargar con las filas de
primer nivel de la columna de ese año en el documento del año siguiente, sin sub-filas, si cierra con el resultado impreso. Hay que dejar escrito en `.filas.json` (`observaciones`) de dónde sale, y en
`Admin/dudas-por-club.md` la pregunta al club por una copia legible. El comparativo puede estar reclasificado entre rubros de costos (Salernitana: servicios externos y otros gastos, misma suma).


## REGLA: qué perímetro (individual o consolidado) se carga cuando la serie de un club cambia de perímetro

Se decide por ejercicio, sin preguntar, y la aplica `tools/perimetro-senales.mjs` antes de localizar (escribe ajustes `perimetro`):

1. **Un ejercicio que el club publicó con un solo perímetro se carga con ese**, porque no hay otro. Si no es el del club, lleva un ajuste
   de ese documento. Casos: Parma (individual) con 2022 y 2025 solo consolidados; Fiorentina 2019 solo consolidado; Lazio en liras (club
   consolidado) con 1998-99 a 2000-01 solo individuales.
2. **El perímetro del club** sale de los ejercicios que traen los dos estados (el voto de `perimetro-senales.mjs`: si las controladas
   hacen negocio del fútbol del club, consolidado; si no, individual). Sin ningún ejercicio con los dos, es el único perímetro de todos
   los ejercicios, si hay uno solo.
3. **Si ningún ejercicio trae los dos y la serie tiene de los dos perímetros**, no hay perímetro del club: cada documento lleva el suyo.
   Caso: Aris, individual en 2019 y 2021 (ELP de la sociedad, filial de otra) y solo consolidado en 2023 a 2025.

Lo único que frena es que dos ejercicios que traen los dos estados voten distinto. El perímetro de cada ejercicio queda en la evidencia
del club (`Admin/carga-clubes/<clubId>.md`); la página muestra el documento fuente de cada año.

**Dos sociedades del mismo club con cuentas del mismo ejercicio** (el club y su holding, como Aston Villa FC Ltd y NSWE Sports): entra
la sociedad que el sitio ya publica para ese club, por coherencia de la serie, y el documento de la otra va a
`Admin/registros/documentos-descartados.txt` (decisión de Guido, Reino Unido).

**Un consolidado de grupo con negocios ajenos al club** (el holding del dueño que consolida el club y otras empresas) vale como el
documento del club si cumple dos condiciones:
1. **El club está en el grupo el ejercicio entero.** Si se compra o se vende en el año, el consolidado no tiene el año del club y va a
   descartados con la cita.
2. **Lo ajeno pesa como mucho el 10 % del turnover, según lo que imprime el propio documento** (turnover por clase de negocio o por
   segmento). Ajeno es lo que no es el deporte del club ni sus instalaciones y servicios: estadio y su terreno, academia, centro de
   entrenamiento, equipo femenino y otros equipos del club, tienda, catering, conferencias, hotel o estacionamientos en el estadio,
   fundación. Energía, inmobiliaria sin relación con el estadio o cualquier otra empresa del dueño son ajenas.

Si el documento no desglosa lo ajeno, vale, salvo que el informe de gestión o la lista de subsidiarias lo presenten como una
actividad principal del grupo con cifras propias. En ese caso, y cuando lo desglosa y pasa el 10 %, el documento va a descartados y el
club se busca en las cuentas de su propia sociedad. Casos: Fleetwood Town con Jaymel Ltd (energía; fútbol 28 % en 2022-23 y 45 % en
2023-24, vendido en mayo de 2024: descartados) frente a Arsenal (inmobiliaria, menos del 1 %), Chelsea (hotel y estacionamientos en
Stamford Bridge) y Newcastle (productora de cine dentro de Commercial), que se cargan (votación, 3 a 0).

## REGLA: qué entidad se carga cuando el fútbol está en una sociedad aparte (club asociación y SAD/SDUQ/SAF/AS)

Decisión de Guido (Portugal). En muchos países el fútbol profesional está en una sociedad (SAD o SDUQ en Portugal) y el club
asociación es dueño de parte de ella y lleva lo demás. No se generaliza la entidad de hoy al pasado: cada ejercicio se mira solo.

1. **Un solo documento del ejercicio: se carga**, sea del club o de la sociedad. Puede ser que ese año el fútbol estuviera en el club
   (antes de la SAD, o después de un cambio de dueño).
2. **Dos documentos del mismo ejercicio (club y sociedad): se carga el que tiene el fútbol** (la sociedad) y el otro va a
   `Admin/registros/documentos-descartados.txt`. Casos: Tondela 2021, Vitória Guimarães 2022, Marítimo 2021-2025.
3. **Excepción a 1: no distorsionar el poderío económico del club.** Si el único documento es del club y el PROPIO documento dice que ese
   año el fútbol estaba en una sociedad que no consolida (una participada o subsidiaria con cuentas individuales del club), no se carga:
   el sitio mostraría un club grande facturando lo de sus modalidades. Va a descartados con la cita. Casos: Porto 2019-20 (la FC Porto
   SAD es subsidiaria, cuentas individuales del club), Braga 2020-21 (la Braga SAD es "associada", el club no consolida), Rio Ave 2014-15
   (el fútbol pasó a la SDUQ en 2013). Si el documento del club es CONSOLIDADO con la sociedad, trae el fútbol y sí se carga.

## REGLA: dos documentos distintos del mismo club y ejercicio

Decisión de Guido (limpieza de las transcripciones de Países Bajos). Cuando hay dos documentos DISTINTOS del mismo club y
ejercicio (p. ej. el jaarverslag del club y el depósito en la KvK): entra el que trae el estado de resultados completo de la entidad del
club; si los dos lo traen, el más completo (con notas). El otro va a `Admin/registros/documentos-descartados.txt`. Los idénticos byte a
byte no hace falta: el inventario los marca `duplicado`.

## REGLA: la tienda del club va a la categoría de merchandising que ya existe (Guido)

Los ingresos de la tienda del club (Rosario Central, Talleres) van a `sponsorship_commercial`, que ya incluye el merchandising. No se crean
`merchandise_sales` ni `cost_of_goods_sold`. El costo de la mercadería vendida queda donde está cargado.

CATEGORÍA (prompt, futbol): los ingresos de la tienda del club (merchandising, «tienda», «ventas tiendas», «store») van a sponsorship_commercial; no hay categoría propia de merchandising ni de costo de la mercadería, y ese costo queda donde está cargado.
EJEMPLO-CATEGORÍA: rosariocentral-ar | revenue | Ingresos por ventas tiendas | sponsorship_commercial
EJEMPLO-CATEGORÍA: talleres-ar | revenue | Ingresos por tienda netos de costo de venta | sponsorship_commercial

## REGLA: `grossDebt` con leasing IFRS 16 o deuda con partes relacionadas (votación 3 a 0)

Vale para todos los países la regla de `club-data-mapping/referencia/formato-simplificado.md` ("Deuda financiera sin precedente del club"): el
leasing IFRS 16 queda fuera si tiene fila propia (dentro solo si viene mezclado en las deudas financieras sin separar); la deuda con la
controlante, los accionistas o las partes relacionadas cuenta solo si la nota la llama préstamo. Si nada califica, `grossDebt` es 0. Casos:
AGF (solo leasing: 0), Silkeborg (0), SønderjyskE (sin vinculadas), Chelsea (0). Botafogo-SP 2024 y Fulham 2024 dependen de cómo la nota llame
al saldo.

## REGLA: la venta o cesión de un % de derechos de TV o comerciales a un fondo es `other_income`, ingreso único (votación 3 a 0)

Va como `other_income`, no como `broadcasting` ni `exceptional_items`: es una operación patrimonial, no la TV del año. La `publicNote` del año dice
que es única (y, si se recompra, lo que pasa después). Casos: Ceará 2024 ("Venda de direitos de participação", R$60,1 M, 37 % de los ingresos;
la recompra de 2025 va a `other_amortisation`), Coritiba 2023 y América Mineiro (cesión a la Liga Forte União). Un porcentaje así de grande se
silencia en `tools/audit-ignore.json` con el motivo, no se recategoriza.

CATEGORÍA (prompt): la venta o cesión de un porcentaje de derechos de TV o comerciales a un fondo (o a la liga) va a other_income, ingreso único; no a broadcasting ni a exceptional_items.
EJEMPLO-CATEGORÍA: ceara-br | revenue | Venda de direitos de participação (LFF) | other_income

## REGLA: el intangible belga "Concessies, octrooien, licenties…" no es de jugadores sin confirmación del documento (votación 3 a 0)

La amortización de ese intangible va a `depreciation` y el residuo de "Andere bedrijfsopbrengsten" a `other_income`, salvo que el propio
documento (una nota de reglas de evaluación, el Jaarverslag con la cifra) diga que es de jugadores o de transferencias: entonces
`player_amortisation` y `player_sales`. El rótulo cargado no agrega palabras que el documento no imprime ("spelersregistratierechten",
"probablemente…"). Casos: Dender (`depreciation`), Charleroi y Anderlecht (confirmados por texto: `player_amortisation`), Mechelen 2025 (sin
confirmación: pasa a `depreciation` el 1,11 M y a `other_income` el 8,54 M). Westerlo y Antwerp: mirar si tienen la confirmación por texto.

CATEGORÍA (prompt, futbol): en Bélgica, el intangible «Concessies, octrooien, licenties…» y su amortización van a depreciation, y el residuo de «Andere bedrijfsopbrengsten» a other_income, salvo que el documento diga que es de jugadores o de transferencias (entonces player_amortisation y player_sales); no agregues palabras que el documento no imprime.

## REGLA: la ganancia por vender inversiones o filiales (también a la matriz) va a `assetSales`, no a los ingresos (votación 3 a 0)

"Profit on disposal of investments" y parecidos (venta de una filial o de una participación, incluida la deconsolidación intragrupo) se cargan en
el meta `assetSales` del año, no como línea de ingresos: así los ingresos cierran con el turnover impreso y el resultado con el impreso. Casos:
Everton 2025 (£49,2 M, venta de Everton FC Women y Goodison Park Stadium a la matriz Roundhouse), Newcastle 2025 (venta de una filial) y Brentford 2025.

## REGLA: los bonos de fichaje o de trayectoria pagados a jugadores y técnicos por nombre son `wages_squad` (votación 3 a 0)

Un bono pagado a personas, sin contrato de pase con otro club, es remuneración, no `player_amortisation` (que es adquisición de pases a otros clubes).
Caso: Deportivo Pereira 2025, "Trayectoria deportiva" (8,9 % de los gastos).
CATEGORÍA (prompt, futbol): un bono de fichaje o de trayectoria pagado a jugadores y técnicos por nombre, sin contrato de pase con otro club, va a wages_squad, no a player_amortisation.
EJEMPLO-CATEGORÍA: deportivopereira-co | expense | Trayectoria deportiva | wages_squad

## REGLA: `officialPAT` de un consolidado alemán con partner silencioso o minoritarios es el resultado ANTES de esas asignaciones (votación 3 a 0)

Se carga la línea del resultado consolidado total (Konzernjahresüberschuss), no la que queda después de la asignación al partner silencioso o a otros
socios; la asignación no es un impuesto. Criterio de Augsburg y Eintracht Frankfurt. Caso: Hoffenheim 2023/24 y 2024/25 (línea 14: +1,268 M y +1,100 M
en vez de la línea 16: -0,368 M y -0,189 M; `tax` deja de absorber la asignación). Pendiente de revisar: Stuttgart carga el resultado después de
minoritarios y suma el NCI a `tax`, el criterio contrario.

## REGLA: una revaluación de jugadores o una fila de valor de jugadores sin explicar va a `other_income`, nunca a `player_sales` (votación 3 a 0)

`player_sales` es plata que entró por una venta. Una revaluación o un incremento de valor de jugadores (sin cobro en el ejercicio) va a `other_income`;
si el documento no explica la fila, la `publicNote` del año lo dice y no afirma que sea no-cash ni extraordinaria. El porcentaje alto se silencia en
`tools/audit-ignore.json` con el motivo. Casos: Gimnasia LP 2024 y 2025, "Incremento Valor Jugadores FP" (13 % y 6 % de los ingresos; la política
contable valúa a costo, sin nota que la explique): `other_income`. Estudiantes LP 2023 y 2024, "Resultado por revaluación de jugadores" (3,8 % y 8,1 %
de los ingresos; balance con "Jugadores destinados a la venta" y ventas pactadas después del cierre): estaba en `player_sales`, pasa a `other_income`
(2 votos a 1; Onboarding verifica antes la nota del documento y revisa que 2024-25 no vuelva a contar esas ventas).

## REGLA: el ingreso por cesión (préstamo) de jugadores sigue a cómo lo imprime el documento (votación)

Si el documento lo imprime como línea propia ("Cesiones" de Getafe, "Ingresos por cesiones (préstamo de jugadores)" de Osasuna, "Prestamos jugadores" de Boca
y Gimnasia), va a `player_sales`. Si viene dentro de "Otros ingresos" sin desglose (Mallorca 2025, 0,233 M, 0,3 % de los ingresos; Oviedo), queda en
`other_income`: no se inventa un desglose que el documento no da (la diferencia es inmaterial). Votos: C, A, A; los tres coinciden en todo lo material.

## REGLA: el "derecho de tanteo" cobrado va a `other_income`, no a `player_sales` (votación 3 a 0)

Un ingreso por derecho de tanteo que el documento no liga a una transferencia ya hecha ni a "Ingresos venta de jugadores" va a `other_income`: en
`player_sales` el lector entendería que se vendió un jugador. Si el documento lo liga a una venta concreta, vuelve a `player_sales`. Caso: Godoy Cruz 2020,
"Ingreso por Derechos de Tanteo" 38,59 M (6,3 % de los ingresos): pasa a `other_income`; la "Rescisión de Contrato" (2,35 M, 0,4 %) queda en `player_sales`.
CATEGORÍA (prompt, futbol): un ingreso por derecho de tanteo que el documento no liga a una transferencia ya hecha va a other_income, no a player_sales.
EJEMPLO-CATEGORÍA: godoycruz-ar | revenue | Ingreso por Derechos de Tanteo | other_income

## REGLA: entidades del club, grupos multiclub e ingresos de las otras entidades

Decisiones de Guido. El registro es `Admin/registros/entidades.jsonl` (cada línea con su cita) y lo verifica
`tools/entidades.mjs`.

- Ingresos de una entidad que no se carga: todos los renglones de ingresos de su estado de resultados, sin la ganancia por su parte de la
  sociedad que se carga (en Portugal, "Ganhos imputados de subsidiárias"), que se contaría dos veces. Con la misma moneda y el mismo
  cierre que el club, se muestra qué % son de los ingresos del club.
- El total de un grupo multiclub suma solo los clubes que el grupo controla (más del 50 %); las participaciones menores se listan aparte.
- La pertenencia de un club a un grupo puede citarse con una fuente externa (url y fecha) cuando el balance no lo dice.
- Un dueño persona (Marinakis, Friedkin) cuenta como grupo, igual que una empresa, con el nombre que imprimen los documentos.
- Cuando el balance no dice quién es el dueño de una sociedad intermedia, la cita se busca en el registro público (Companies House, PSC)
  antes que deducirla (Guido).
- Un club que no cambia de entidad ni de perímetro lleva UNA línea `carga-club` con un rango de ejercicios y una cita (Guido), en lugar de una línea `carga` por año: cada ejercicio cargado dentro del rango que no tenga su propia línea toma esa entidad.
  Al dar el alta de un club con dueño se agrega una vez; así los años que se cargan después ya muestran su estructura. Una `carga`
  explícita del mismo año gana; dos rangos del mismo club no se pisan. Un rango no sirve para un ejercicio que suma dos entidades.

## REGLA: el dictamen del auditor (registro de auditoría)

Criterio de Guido, también en el encabezado de `tools/auditoria.mjs`. El vocabulario es provisorio y se ajusta con los casos.

- Un párrafo de énfasis sobre la continuidad sin "incertidumbre material" no es duda sobre la continuidad (`continuidad: false`).
- Alcanza el título del párrafo para clasificar; manda el párrafo de opinión sobre el título de la base.
- Una abstención parcial es `abstencion`.
- Un club-año sin línea es "no sabemos", no "sin informe"; un informe que existe pero no está transcripto (`falta_transcripcion`) no se
  publica y cuenta como pendiente. Un auditor persona va con su nombre como lo imprime el documento.

## REGLA: bonos convertibles en la deuda

Decisión de Guido (HSV). Un bono convertible común (Wandelschuldverschreibung dentro de las deudas) es deuda financiera y entra
en `grossDebt` (HSV 2024: 57.848 TEUR con la WSV de 30.000). Un convertible con conversión OBLIGATORIA en acciones, que el documento muestra
como partida especial después del patrimonio (Sonderposten nach dem Eigenkapital), no es deuda (HSV 2025: 22,03 M, sin la WSV).

- INGRESOS DE LA OTRA ENTIDAD (Guido delegó en la principal): se suman todos los renglones de ingresos de su estado de
  resultados, incluidos los "Juros e rendimentos similares obtidos"; solo queda afuera lo que se contaría dos veces (la ganancia por la parte
  de la SAD, "Ganhos imputados de subsidiárias").
- DOS INFORMES DEL AUDITOR EN EL MISMO DOCUMENTO (individual y consolidado): la línea de auditoría usa el del perímetro que publica el sitio
  (Guido: "coherencia de perímetro"). El otro se transcribe pero no se cita.
- ESTADIO Y SPONSOR DE UN AÑO DE LIGA AMATEUR (Guido): la compuerta de la carga lo acepta sin sponsor si tiene el estadio con
  fuente. En las ligas amateur casi nunca hay fuente que nombre el sponsor de camiseta. Lo mismo vale para la Eerste Divisie neerlandesa
  (Guido): sus páginas de temporada en en.wikipedia no traen la tabla de camisetas.

## REGLA: el factoring en la deuda (Guido)

El factoring es vender a una financiera las facturas o cuotas que el club cobrará (por ejemplo, de traspasos) para cobrar antes. Es deuda
financiera solo si el club responde: si el documento lo llama "deuda financiera", "autoliquidante" o dice que el crédito sigue en el activo
(con recurso, "pro solvendo"), entra en `grossDebt`. Si es una cesión sin recurso ("pro soluto") y el crédito sale del activo, no es deuda.
Se lee en la nota de cada documento: la etiqueta ("debiti verso altri finanziatori") no alcanza. Casos: Monza 2024, 13,5 M de Factorit
pro soluto, deuda 0; Genoa 2022, 30,4 M de Banca Sistema que la propia nota llama "debito finanziario autoliquidante", deuda 95,7 M. Por eso
`tools/vocabulario.mjs` no suma "altri finanziatori" por su cuenta: lo decide la lectura del documento (escalón 1b o 2, o un ajuste con cita).

## REGLA: una línea de depreciación y amortización junta se parte con las notas (votación 3 a 0, Silkeborg y Viborg 2025)

Cuando el estado de resultados junta en una línea la amortización de los derechos de jugadores y la depreciación de bienes de uso
("Depreciation, amortisation and impairment") pero las notas las abren, se parte con los importes de las notas: derechos de jugadores a
`player_amortisation`, bienes de uso a `depreciation`. Si las notas no la abren, va entera a `player_amortisation` con `incluidoEn` (la regla
de la línea que junta dos conceptos). Precedente: Silkeborg 2024 y Viborg 2024 ya estaban partidos. Casos: Silkeborg 2025 (12.670 = Note 10
6.502 + Note 11 6.168) y Viborg 2025 (18.375.737 = 15.751.691 + 2.624.046). Registro: `Admin/registros/auditoria-proceso.jsonl`.

CATEGORÍA (prompt, futbol): una línea que junta la amortización de derechos de jugadores y la depreciación de bienes de uso se parte con los importes de las notas (jugadores a player_amortisation, bienes de uso a depreciation); si las notas no la abren, va entera a player_amortisation.

## REGLA: una gestión (presidente) sin fuente pública queda en null (Guido)

Una gestión se busca en la web (búsqueda general, la página del club, Wikipedia y la prensa). Si no aparece una fuente que confirme quién
estaba a cargo al cierre, el año queda sin gestión (`null`) y no se espera la respuesta del club: la pregunta en `Admin/dudas-por-club.md`
puede quedar, pero no frena nada. Para Wikipedia no se abre la página entera (es lo que hace caer a los subagentes): se lee solo la ficha o
la sección que hace falta.

## REGLA: un dato de contexto sin fuente pública queda en null y el año se carga igual (Guido)

Estadio, sponsor, liga, gestión y los demás datos de contexto (lo que no es una cifra del balance) se buscan en la web: la página del
club, Wikipedia (con `tools/wiki-extracto.mjs`, no la página entera), la prensa y la página de la temporada. Si la búsqueda se agota sin
una fuente, el dato queda en `null` con la marca `sin-fuente` (en `tools/contexto-manual.json`, con dónde se buscó) y el año se carga
igual: la falta de un dato de contexto nunca frena una carga ni es una pregunta para Guido. El sponsor de camiseta pide más: el registro de búsqueda de la skill `club-sourcing` 0.5 (tres clases de fuente sin contar Wikipedia), que comprueba la compuerta de `estadio-sponsor.mjs` y `audit.js` (`sponsor-sin-busqueda`). Una liga no se infiere del año vecino
(votación de Patro Eisden 2013): si no hay fuente, queda `null`. Además, en la segunda división belga (`be-challengerproleague`) alcanza
con el estadio, igual que en la Eerste Divisie y las segundas noruegas (`SOLO_ESTADIO`; votación de Patro Eisden 2015, opción C).

## REGLA: en un balance turco, lo que el propio balance pone en las actividades principales va como línea operativa (votación 3 a 0, Beşiktaş)

Las partidas que el balance imprime dentro de las actividades principales (Tecil - faiz, Reeskont, kur farkı, vade farkı) se cargan
como líneas operativas (`other_income` / `other_expenses`), no como `netInterest`. El resultado financiero es el bloque Finansman.

CATEGORÍA (prompt): en un balance turco, las partidas que el propio balance imprime dentro de las actividades principales (Tecil - faiz, Reeskont, kur farkı, vade farkı) van como líneas operativas (other_income / other_expenses), no como interés neto.
EJEMPLO-CATEGORÍA: besiktas-tr | expense | Tecil - faiz giderleri | other_expenses
EJEMPLO-CATEGORÍA: besiktas-tr | revenue | Reeskont gelirleri | other_income

## REGLA: si el documento declara varios tipos de cambio a USD del mismo día de cierre, vale el de caja y bancos (votación 3 a 0, Beşiktaş 2006)

El `fx` es el de caja y bancos (`document_close`). Caso: Beşiktaş 2006, 1,5357 contra el 1,5442 de pasivos.

## REGLA: el anticipo de un fondo (CVC) que el club reconoce en cuotas va a `other_income`, aparte del reparto central de la liga (votación 3 a 0, Bath Rugby 2021 a 2023)

`central_income` (genérica `media_rights`) es el reparto corriente de TV y comercial central de la liga y de la federación (Premiership Rugby y RFU). El
anticipo que cobró la liga de CVC por vender una participación (£12,8 M en 2019, reconocidos en 48 meses dentro de Turnover) va a `other_income`, con la
fila aparte que imprime el documento («CVC income», Strategic Report 2021-22 y 2022-23) y una `publicNote` que dice que es la cuota diferida del anticipo
de 2019. Medido: £3,3 M (28 % de los ingresos de 2021, 17 % de 2022) y £2,4 M en 2023; el porcentaje alto se silencia en `tools/audit-ignore.json` con el motivo.
Bath no lo trata como venta: no sale de la regla de la venta a un fondo (misma dirección, hecho distinto).

CATEGORÍA (prompt): el anticipo de un fondo de inversión (CVC) sobre derechos comerciales de la liga, reconocido en cuotas por el club, va a other_income como fila aparte; no al reparto central de la liga.
EJEMPLO-CATEGORÍA: bathrugby-gb | revenue | CVC income | other_income

## REGLA: una revaluación no realizada de una inversión impresa fuera de los ingresos va a `other_income`, no a `assetSales` (votación 2 a 1, Bath Rugby 2021)

`assetSales` es para ventas realizadas ("Profit on disposal"). «Fair value movements» (+£6,66 M en 2021, la participación en Premiership Rugby, no monetaria en
el flujo de caja) va a `other_income` como el resto de las revaluaciones sin cobro, con `publicNote` que dice que es una revaluación no realizada fuera de
Turnover. Votos: `other_income` ×2, `exceptional_items` ×1 (misma lectura de realizado/no realizado, difiere solo en el rubro). Medido: 57 % del Turnover y
sin ella el resultado operativo pasa de −£0,11 M a −£6,77 M: se silencia en `tools/audit-ignore.json`. Los ingresos del motor (11,6 + 0,15 + 6,66) ya no igualan el
Turnover impreso (11,6): el cierre contra el resultado operativo impreso (−£105.875) sí cierra; el chequeo contra Turnover lo tiene que contemplar Datos 4.

CATEGORÍA (prompt): una revaluación no realizada de una inversión a valor razonable (Fair value movements), sin cobro, va a other_income con nota que lo aclare; nunca a asset_sales ni a una venta.
EJEMPLO-CATEGORÍA: bathrugby-gb | revenue | Fair value movements | other_income

## REGLA: la liberación de un goodwill negativo va a `exceptional_items`, del lado de los ingresos (votación 2 a 1, Falkirk 2024-25)

Un goodwill negativo (bargain purchase: el club compra una sociedad por menos de lo que valen sus activos) que se libera al resultado es
una ganancia contable única, sin caja. Va como ingreso en `exceptional_items`, con línea propia y su etiqueta textual («Release of
negative goodwill»), aunque el estado la imprima entre paréntesis en el bloque de gastos. Nunca va neteado en gastos ni en
`other_amortisation`, porque se leería como un gasto real menor. Lleva `publicNote` que diga que es una ganancia contable sin caja por la compra
de qué sociedad. Si el estado y la nota no coinciden, manda el monto del estado, que es el que cierra con el resultado impreso
(Falkirk: 940.244 en el estado, 940.224 en la nota). Votos: `exceptional_items` ×2, `other_income` ×1 (los dos caen en la misma fila
genérica de ingresos). Leeds 2025 (el reverso neteado dentro de `other_operating_expenses`) es anterior y no se recategoriza.

CATEGORÍA (prompt): la liberación de un goodwill negativo (Release of negative goodwill, bargain purchase) es una ganancia contable única sin caja: va a exceptional_items como ingreso en fila aparte, aunque el estado la imprima en el bloque de gastos; nunca a other_amortisation.

## REGLA: la liga de un año necesita dos fuentes independientes

La página de la temporada en Wikipedia cuenta como una sola fuente. La otra sale de esta lista, en este orden: el sitio oficial de la liga o de la
federación; RSSSF; un sitio de resultados (worldfootball.net, Soccerway, Transfermarkt). Si las dos coinciden, la liga se asigna. Si no coinciden, se
vota (skill `auditoria-finance-of-sports`, sección 9). Con una sola fuente, la liga queda asignada con el aviso `liga-una-fuente` hasta tener la segunda.
El club se identifica por su nombre exacto o un alias de `tools/club-league-reference/alias.json`, nunca por parecido: otro club de la misma ciudad
puede tener un nombre casi igual. Casos: RAAL La Louvière 2021 («La Louvière Centre» es otro club), la segunda chipriota 2023-24 (la tabla de Wikipedia
lista 15 de los 16 equipos).

## REGLA: el país de una liga es el de su federación; el de un club, donde está (`CLUB_NATION`, `data/leagues.js`)

`club.country` es el estado: el sufijo del id y la carpeta `data/<país>/` (Celtic es `celtic-gb` y vive en `data/gb/`). El país que se muestra y con el que se
agrupa es otra cosa: una liga lleva el de su federación (`country:'SCT'` en la Premiership escocesa; la pirámide inglesa sigue en `GB`, que se llama Inglaterra) y un club,
el de `nationOf(clubId)`: la tabla `CLUB_NATION` solo lista a los clubes cuya nación no es la de su `country` (hoy, Celtic → `SCT`), y los ids no cambian. Para Gales: sumar
`WAL` a `COUNTRIES` (con su clave en `data/lang/en.js`), la Cymru Premier con `country:'WAL'` y cada club galés (Cardiff, Swansea) a `CLUB_NATION`, aunque juegue en la pirámide
inglesa: su ficha dice Gales y su liga, la inglesa. Medido al hacerlo: un club afectado (Celtic) y una liga (la Premiership escocesa); cambian las agrupaciones por país de Ligas y
del selector, el subtítulo de Finanzas y la página generada del club. `tools/generate-club-pages.js` usa `nationOf`. No hay condición nueva en `tools/`.

## REGLA: subsidios, donaciones y aportes van a `grants_donations` (votación 3 a 0; fila «Subsidios y donaciones»)

Un ingreso sin contraprestación comercial (subsidio público de explotación, donación, aporte de socios o accionistas impreso como ingreso) va a
`grants_donations`, no a `other_income`. No entran: la subvención de capital imputada al resultado (`other_income`: no es plata del año), los premios y la
solidaridad UEFA o de la liga (`competition_bonus`), el subsidio de la educación (`education`) ni un aporte que el documento lleva al patrimonio neto. Lo ya
cargado se recategoriza por etiqueta con `node tools/fos.mjs etiquetas --categoria grants_donations` (el proceso de `Admin/PIPELINE.md`, «Categoría nueva: recategorizar lo cargado»). Caso: Flora Tallinn
(Lisa 12, «Annetused ja toetused»), Nacional («Subsídios à exploração»), Sarpsborg Fotball Invest 2010 («Bidrag fra aksjonærene»).
CATEGORÍA (prompt): un subsidio público, una donación o un aporte de socios o accionistas impreso como ingreso va a grants_donations; la subvención de capital imputada, los premios y la solidaridad UEFA o de la liga y el subsidio de la educación no.
EJEMPLO-CATEGORÍA: floratallinn-ee | revenue | Riigi ja/või KOV toetus | grants_donations

## REGLA: un club que pasa del balance reducido al completo carga ese año completo y no rehace los anteriores (votación 3 a 0, SønderjyskE 2025)

Un club danés que publica el balance reducido (Årsregnskabsloven § 32: un solo renglón «Bruttofortjeneste», ya neto de costo de mercadería y gastos externos; ver `club-data-mapping/referencia/casos-por-pais-y-formato.md`) y un año pasa al estado completo (Nettoomsætning, Andre driftsindtægter, Vareforbrug, Andre eksterne omkostninger) carga ESE año con el desglose que el documento imprime: la exención solo vale mientras el balance no deja vía para separar el ingreso. Los años anteriores cargados reducidos quedan como el club los publicó: NO se rehacen con la columna comparativa del informe siguiente (es un comparativo, y a veces reexpresado; vale solo si el PDF del año es ilegible, ver «UN COMPARATIVO REEXPRESADO NO ES LA TRANSCRIPCIÓN DEL AÑO»). El año completo lleva `publicNote` que dice que hasta el año anterior el club publicaba el balance resumido y que el salto de ingresos y gastos es de formato, no de actividad. Vale para cualquier país con un cambio igual de un formato resumido a uno completo. Medido en el caso: ingresos 66,40 M completo contra 35,69 M reducido, personal sobre ingresos 70 % contra 130 %, resultado igual (−14,82 M); años ya cargados que cambian: 0. Votos: A (completo, sin tocar lo anterior) ×3; B (reducido, por consistencia de la serie) ×0; C (completo y rehacer el año anterior con el comparativo) ×0. El caso y los votos: `Admin/mediciones/413-votacion-formato-completo-vs-reducido.md` y `Admin/registros/auditoria-proceso.jsonl`.

